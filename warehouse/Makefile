IMAGE_NAME   := jobs-warehouse
ACCOUNT_ID   := 288761770181
REGION       := eu-west-3
ECR_REGISTRY := $(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
ECR_IMAGE    := $(ECR_REGISTRY)/mguzman-portfolio/warehouse:latest

install:
	pip install -r requirements.txt
	dbt deps

run:
	dbt build

docker-build:
	docker build -t $(IMAGE_NAME) .

ecr-login:
	aws ecr get-login-password --region $(REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)

push: ecr-login
	docker build -t $(ECR_IMAGE) .
	docker push $(ECR_IMAGE)

download-db:
	aws s3 cp s3://mguzman-portfolio/linkedin_warehouse/warehouse.duckdb data/warehouse.duckdb

docker-run:
	docker run --rm \
		-e AWS_ACCESS_KEY_ID=$$(aws configure get aws_access_key_id) \
		-e AWS_SECRET_ACCESS_KEY=$$(aws configure get aws_secret_access_key) \
		-e AWS_DEFAULT_REGION=$$(aws configure get region) \
		$(IMAGE_NAME)

test:
	dbt test

docs:
	dbt docs generate
	dbt docs serve

lint:
	dbt parse

clean:
	dbt clean
