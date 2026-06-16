variable "project" {
  description = "Project name used for naming and tagging resources"
  type        = string
}

variable "notification_email" {
  description = "Email address that receives pipeline execution notifications"
  type        = string
}

variable "state_machine_arn" {
  description = "ARN of the Step Functions state machine to monitor"
  type        = string
}
