resource "aws_sns_topic" "pipeline_alerts" {
  name = "${var.project}-pipeline-alerts"

  tags = { project = var.project }
}

# AWS sends a confirmation email on first apply — click the link to activate
resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.pipeline_alerts.arn
  protocol  = "email"
  endpoint  = var.notification_email
}

resource "aws_sns_topic_policy" "allow_eventbridge" {
  arn = aws_sns_topic.pipeline_alerts.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "events.amazonaws.com" }
      Action    = "sns:Publish"
      Resource  = aws_sns_topic.pipeline_alerts.arn
    }]
  })
}

resource "aws_cloudwatch_event_rule" "sfn_state_change" {
  name        = "${var.project}-sfn-state-change"
  description = "Fires when the pipeline Step Functions execution finishes"

  event_pattern = jsonencode({
    source      = ["aws.states"]
    "detail-type" = ["Step Functions Execution Status Change"]
    detail = {
      stateMachineArn = [var.state_machine_arn]
      status          = ["SUCCEEDED", "FAILED", "TIMED_OUT", "ABORTED"]
    }
  })

  tags = { project = var.project }
}

resource "aws_cloudwatch_event_target" "sns" {
  rule      = aws_cloudwatch_event_rule.sfn_state_change.name
  target_id = "pipeline-alerts-sns"
  arn       = aws_sns_topic.pipeline_alerts.arn

  input_transformer {
    input_paths = {
      status    = "$.detail.status"
      execution = "$.detail.name"
      started   = "$.detail.startDate"
      stopped   = "$.detail.stopDate"
    }
    input_template = "\"LinkedIn pipeline execution '<execution>' finished with status: <status>\\nStarted: <started>\\nStopped: <stopped>\""
  }
}
