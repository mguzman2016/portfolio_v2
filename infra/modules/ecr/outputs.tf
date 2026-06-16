output "pipeline_repo_url" {
  value = aws_ecr_repository.pipeline.repository_url
}

output "warehouse_repo_url" {
  value = aws_ecr_repository.warehouse.repository_url
}
