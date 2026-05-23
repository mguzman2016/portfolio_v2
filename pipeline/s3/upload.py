from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
import boto3


@dataclass
class UploadParams:
    bucket: str
    prefix: str
    city: str
    search: str
    region: str = "eu-west-3"


def _build_s3_key(prefix: str, city: str, search: str) -> str:
    date_hour = datetime.utcnow().strftime("%Y-%m-%d_%H")
    return f"{prefix}/city={city}/search={search}/date={date_hour}/data.jsonl"


def upload_jsonl(local_path: Path, params: UploadParams) -> str:
    s3 = boto3.client("s3", region_name=params.region)
    key = _build_s3_key(params.prefix, params.city, params.search)
    s3.upload_file(str(local_path), params.bucket, key)
    print(f"  Uploaded to s3://{params.bucket}/{key}")
    return key
