variable "project" {
  description = "Project name used for naming and tagging resources"
  type        = string
}

variable "aws_region" {
  type = string
}

variable "pipeline_image" {
  description = "Full ECR image URI for the pipeline container"
  type        = string
}

variable "warehouse_image" {
  description = "Full ECR image URI for the warehouse container"
  type        = string
}

variable "execution_role_arn" {
  description = "ARN of the ECS task execution IAM role"
  type        = string
}

variable "task_role_arn" {
  description = "ARN of the ECS task IAM role (used by container code)"
  type        = string
}

variable "s3_bucket" {
  description = "S3 bucket name passed to pipeline container as argument"
  type        = string
}

variable "secret_name" {
  description = "Secrets Manager secret name passed to pipeline container as argument"
  type        = string
}
