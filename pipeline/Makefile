IMAGE       = linkedin-pipeline
ACCOUNT_ID  = 288761770181
REGION      = eu-west-3
ECR_REGISTRY = $(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
ECR_IMAGE    = $(ECR_REGISTRY)/mguzman-portfolio/pipeline:latest

build:
	docker build -t $(IMAGE) .

run:
	docker run --rm \
		-e AWS_ACCESS_KEY_ID=$$(aws configure get aws_access_key_id) \
		-e AWS_SECRET_ACCESS_KEY=$$(aws configure get aws_secret_access_key) \
		-e AWS_DEFAULT_REGION=$$(aws configure get region) \
		$(IMAGE)

ecr-login:
	aws ecr get-login-password --region $(REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)

push: ecr-login
	docker build -t $(ECR_IMAGE) .
	docker push $(ECR_IMAGE)
