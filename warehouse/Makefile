IMAGE_NAME := jobs-warehouse

install:
	pip install -r requirements.txt
	dbt deps

run:
	dbt build

docker-build:
	docker build -t $(IMAGE_NAME) .

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
