resource "aws_cloudwatch_log_group" "sfn" {
  name              = "/aws/states/${var.project}-pipeline"
  retention_in_days = 7

  tags = { project = var.project }
}

locals {
  sfn_definition = jsonencode({
    Comment = "LinkedIn pipeline: scrape jobs → transform in warehouse"
    StartAt = "RunPipeline"
    States = {
      RunPipeline = {
        Type     = "Task"
        Resource = "arn:aws:states:::ecs:runTask.sync"
        Parameters = {
          Cluster        = var.cluster_arn
          TaskDefinition = var.pipeline_task_definition_arn
          # FARGATE_SPOT saves ~70% vs on-demand; SFN retries once on Spot interruption
          CapacityProviderStrategy = [{
            CapacityProvider = "FARGATE_SPOT"
            Weight           = 1
            Base             = 0
          }]
          NetworkConfiguration = {
            AwsvpcConfiguration = {
              Subnets        = var.subnet_ids
              SecurityGroups = [var.security_group_id]
              AssignPublicIp = "ENABLED"
            }
          }
        }
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 60
          MaxAttempts     = 1
          BackoffRate     = 1
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "PipelineFailed"
        }]
        Next = "RunWarehouse"
      }

      RunWarehouse = {
        Type     = "Task"
        Resource = "arn:aws:states:::ecs:runTask.sync"
        Parameters = {
          Cluster        = var.cluster_arn
          TaskDefinition = var.warehouse_task_definition_arn
          CapacityProviderStrategy = [{
            CapacityProvider = "FARGATE_SPOT"
            Weight           = 1
            Base             = 0
          }]
          NetworkConfiguration = {
            AwsvpcConfiguration = {
              Subnets        = var.subnet_ids
              SecurityGroups = [var.security_group_id]
              AssignPublicIp = "ENABLED"
            }
          }
        }
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 60
          MaxAttempts     = 1
          BackoffRate     = 1
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "WarehouseFailed"
        }]
        Next = "Success"
      }

      Success = {
        Type = "Succeed"
      }

      PipelineFailed = {
        Type  = "Fail"
        Error = "PipelineTaskFailed"
        Cause = "The pipeline ECS task failed or was interrupted"
      }

      WarehouseFailed = {
        Type  = "Fail"
        Error = "WarehouseTaskFailed"
        Cause = "The warehouse ECS task failed or was interrupted"
      }
    }
  })
}

resource "aws_sfn_state_machine" "pipeline" {
  name       = "${var.project}-pipeline"
  role_arn   = var.sfn_role_arn
  definition = local.sfn_definition

  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.sfn.arn}:*"
    include_execution_data = true
    level                  = "ERROR"
  }

  tags = { project = var.project }
}

resource "aws_scheduler_schedule" "pipeline" {
  name       = "${var.project}-pipeline"
  group_name = "default"

  flexible_time_window {
    mode = "OFF"
  }

  # Mon/Wed/Fri at 06:00 UTC — catches Monday hiring surge, mid-week posts, and Thursday late posts
  schedule_expression          = var.schedule_expression
  schedule_expression_timezone = "UTC"

  target {
    arn      = aws_sfn_state_machine.pipeline.arn
    role_arn = var.scheduler_role_arn

    retry_policy {
      maximum_retry_attempts = 0
    }
  }
}
