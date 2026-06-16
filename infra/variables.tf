variable "aws_region" {
  type    = string
  default = "eu-west-3"
}

variable "aws_profile" {
  type    = string
  default = "default"
}

variable "project" {
  type    = string
  default = "mguzman-portfolio"
}

variable "notification_email" {
  description = "Email address that receives pipeline success/failure notifications"
  type        = string
}

variable "schedule_expression" {
  description = "EventBridge Scheduler cron expression (UTC). Default: Mon/Wed/Fri at 06:00 UTC"
  type        = string
  default     = "cron(0 6 ? * MON,WED,FRI *)"
}

