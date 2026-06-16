output "cluster_arn" {
  value = aws_ecs_cluster.main.arn
}

output "pipeline_task_definition_arn" {
  value = aws_ecs_task_definition.pipeline.arn
}

output "warehouse_task_definition_arn" {
  value = aws_ecs_task_definition.warehouse.arn
}

output "subnet_ids" {
  value = data.aws_subnets.default.ids
}

output "security_group_id" {
  value = aws_security_group.ecs_tasks.id
}
