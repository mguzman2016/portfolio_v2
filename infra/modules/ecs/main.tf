data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "${var.project}-ecs-tasks"
  description = "Egress-only security group for ECS Fargate tasks"
  vpc_id      = data.aws_vpc.default.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { project = var.project }
}

resource "aws_ecs_cluster" "main" {
  name = var.project

  setting {
    name  = "containerInsights"
    value = "disabled"
  }

  tags = { project = var.project }
}

resource "aws_ecs_cluster_capacity_providers" "main" {
  cluster_name       = aws_ecs_cluster.main.name
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 1
    base              = 1
  }
}

resource "aws_cloudwatch_log_group" "pipeline" {
  name              = "/ecs/${var.project}/pipeline"
  retention_in_days = 7

  tags = { project = var.project }
}

resource "aws_cloudwatch_log_group" "warehouse" {
  name              = "/ecs/${var.project}/warehouse"
  retention_in_days = 7

  tags = { project = var.project }
}

resource "aws_ecs_task_definition" "pipeline" {
  family                   = "${var.project}-pipeline"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions = jsonencode([{
    name      = "pipeline"
    image     = var.pipeline_image
    essential = true

    command = [
      "python", "main.py",
      "--bucket", var.s3_bucket,
      "--secret-name", var.secret_name
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.pipeline.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "pipeline"
      }
    }
  }])

  tags = { project = var.project }
}

resource "aws_ecs_task_definition" "warehouse" {
  family                   = "${var.project}-warehouse"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions = jsonencode([{
    name      = "warehouse"
    image     = var.warehouse_image
    essential = true

    environment = [
      { name = "S3_BUCKET", value = var.s3_bucket },
      { name = "AWS_DEFAULT_REGION", value = var.aws_region }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.warehouse.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "warehouse"
      }
    }
  }])

  tags = { project = var.project }
}
