variable "project" {
  description = "Project name used for naming and tagging resources"
  type        = string
}

variable "aws_region" {
  type = string
}

variable "account_id" {
  type = string
}

variable "secret_arn" {
  description = "ARN of the LinkedIn session cookie secret"
  type        = string
}

variable "s3_bucket" {
  description = "S3 bucket name used for pipeline state and data"
  type        = string
}
