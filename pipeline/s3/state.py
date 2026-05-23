from dataclasses import dataclass
from datetime import datetime, timezone
from io import BytesIO
import boto3
from botocore.exceptions import ClientError


STATE_MAX_DAYS = 15


@dataclass
class StateParams:
    bucket: str
    city: str
    search: str
    region: str = "eu-west-3"


@dataclass
class StateResult:
    processed_ids: set[int]
    stale: bool


def _state_key(city: str, search: str) -> str:
    return f"linkedin_state/city={city}/search={search}/processed_ids.txt"


def load_state(params: StateParams) -> StateResult:
    """Download the state file and return IDs + whether a 15-day reset is needed."""
    s3 = boto3.client("s3", region_name=params.region)
    key = _state_key(params.city, params.search)

    try:
        meta = s3.head_object(Bucket=params.bucket, Key=key)
    except ClientError as e:
        if e.response["Error"]["Code"] in ("404", "NoSuchKey"):
            return StateResult(processed_ids=set(), stale=False)
        raise

    age = datetime.now(timezone.utc) - meta["LastModified"]
    if age.days >= STATE_MAX_DAYS:
        print(f"  State file is {age.days} days old — will reset after this run")
        return StateResult(processed_ids=set(), stale=True)

    obj = s3.get_object(Bucket=params.bucket, Key=key)
    content = obj["Body"].read().decode("utf-8")
    ids = {int(line.strip()) for line in content.splitlines() if line.strip()}
    return StateResult(processed_ids=ids, stale=False)


def save_state(params: StateParams, existing_ids: set[int], new_ids: list[int], reset: bool) -> None:
    """Write updated state back to S3.

    If reset is True, only write new_ids (15-day rotation).
    Otherwise write the deduplicated union of existing + new.
    """
    s3 = boto3.client("s3", region_name=params.region)
    key = _state_key(params.city, params.search)

    final_ids = set(new_ids) if reset else (existing_ids | set(new_ids))

    content = "\n".join(str(id_) for id_ in sorted(final_ids))
    s3.put_object(
        Bucket=params.bucket,
        Key=key,
        Body=BytesIO(content.encode("utf-8")),
        ContentType="text/plain",
    )
    print(f"  State file updated: {len(final_ids)} IDs at s3://{params.bucket}/{key}")
