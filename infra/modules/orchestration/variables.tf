variable "project" {
  description = "Project name used for naming and tagging resources"
  type        = string
}

variable "aws_region" {
  type = string
}

variable "sfn_role_arn" {
  description = "ARN of the IAM role for the Step Functions state machine"
  type        = string
}

variable "scheduler_role_arn" {
  description = "ARN of the IAM role for the EventBridge Scheduler"
  type        = string
}

variable "cluster_arn" {
  description = "ARN of the ECS cluster"
  type        = string
}

variable "pipeline_task_definition_arn" {
  description = "ARN of the pipeline ECS task definition"
  type        = string
}

variable "warehouse_task_definition_arn" {
  description = "ARN of the warehouse ECS task definition"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for the ECS tasks"
  type        = list(string)
}

variable "security_group_id" {
  description = "Security group ID for the ECS tasks"
  type        = string
}

variable "schedule_expression" {
  description = "EventBridge Scheduler cron expression (UTC)"
  type        = string
  default     = "cron(0 6 ? * MON,WED,FRI *)"
}
