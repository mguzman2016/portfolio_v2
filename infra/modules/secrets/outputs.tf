output "linkedin_cookie_arn" {
  value = aws_secretsmanager_secret.linkedin_cookie.arn
}

output "linkedin_cookie_name" {
  value = aws_secretsmanager_secret.linkedin_cookie.name
}
