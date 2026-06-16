data "aws_caller_identity" "current" {}

module "secrets" {
  source  = "./modules/secrets"
  project = var.project
}

module "ecr" {
  source  = "./modules/ecr"
  project = var.project
}

module "iam" {
  source     = "./modules/iam"
  project    = var.project
  aws_region = var.aws_region
  account_id = data.aws_caller_identity.current.account_id
  secret_arn = module.secrets.linkedin_cookie_arn
  s3_bucket  = var.project
}

module "ecs" {
  source             = "./modules/ecs"
  project            = var.project
  aws_region         = var.aws_region
  pipeline_image     = "${module.ecr.pipeline_repo_url}:latest"
  warehouse_image    = "${module.ecr.warehouse_repo_url}:latest"
  execution_role_arn = module.iam.ecs_execution_role_arn
  task_role_arn      = module.iam.ecs_task_role_arn
  s3_bucket          = var.project
  secret_name        = module.secrets.linkedin_cookie_name
}

module "orchestration" {
  source                        = "./modules/orchestration"
  project                       = var.project
  aws_region                    = var.aws_region
  sfn_role_arn                  = module.iam.step_functions_role_arn
  scheduler_role_arn            = module.iam.scheduler_role_arn
  cluster_arn                   = module.ecs.cluster_arn
  pipeline_task_definition_arn  = module.ecs.pipeline_task_definition_arn
  warehouse_task_definition_arn = module.ecs.warehouse_task_definition_arn
  subnet_ids                    = module.ecs.subnet_ids
  security_group_id             = module.ecs.security_group_id
  schedule_expression           = var.schedule_expression
}

module "notifications" {
  source             = "./modules/notifications"
  project            = var.project
  notification_email = var.notification_email
  state_machine_arn  = module.orchestration.state_machine_arn
}
