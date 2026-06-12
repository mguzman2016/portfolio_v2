import boto3
import subprocess
import sys

BUCKET = "mguzman-portfolio"
WAREHOUSE_KEY = "linkedin_warehouse/warehouse.duckdb"
LOCAL_PATH = "data/warehouse.duckdb"


def main():
    s3 = boto3.client("s3")

    try:
        s3.download_file(BUCKET, WAREHOUSE_KEY, LOCAL_PATH)
        print("Downloaded existing warehouse — incremental run")
    except s3.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "404":
            print("No warehouse on S3 — full refresh run")
        else:
            raise

    result = subprocess.run(["dbt", "build", "--target", "prod"])
    if result.returncode != 0:
        print("dbt run failed, skipping upload", file=sys.stderr)
        sys.exit(result.returncode)

    s3.upload_file(LOCAL_PATH, BUCKET, WAREHOUSE_KEY)
    print(f"Warehouse uploaded to s3://{BUCKET}/{WAREHOUSE_KEY}")


if __name__ == "__main__":
    main()
