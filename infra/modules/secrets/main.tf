resource "aws_secretsmanager_secret" "linkedin_cookie" {
  name        = "${var.project}/linkedin-session-cookie"
  description = "LinkedIn session cookie used for authentication with the Voyager API"

  recovery_window_in_days = 7

  tags = {
    project = var.project
  }
}