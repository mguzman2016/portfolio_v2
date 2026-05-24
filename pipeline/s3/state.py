from dataclasses import dataclass
from datetime import datetime, timezone
from io import BytesIO
import boto3
from botocore.exceptions import ClientError
from loguru import logger


STATE_MAX_DAYS = 15
_CREATED_AT_META_KEY = "created_at"


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
    created_at: datetime | None


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
            return StateResult(processed_ids=set(), stale=False, created_at=None)
        raise

    raw = meta.get("Metadata", {}).get(_CREATED_AT_META_KEY)
    # Fall back to LastModified for state files written before this change
    created_at = datetime.fromisoformat(raw) if raw else meta["LastModified"]

    age_days = (datetime.now(timezone.utc) - created_at).days
    stale = age_days >= STATE_MAX_DAYS
    if stale:
        logger.warning(f"State file is {age_days} days old — will reset after this run")

    obj = s3.get_object(Bucket=params.bucket, Key=key)
    content = obj["Body"].read().decode("utf-8")
    ids = {int(line.strip()) for line in content.splitlines() if line.strip()}
    return StateResult(processed_ids=ids, stale=stale, created_at=created_at)


def save_state(
    params: StateParams,
    final_ids: set[int],
    reset: bool,
    created_at: datetime | None,
) -> None:
    """Write final_ids to S3. On reset, stamps a fresh created_at."""
    s3 = boto3.client("s3", region_name=params.region)
    key = _state_key(params.city, params.search)

    timestamp = datetime.now(timezone.utc) if (reset or created_at is None) else created_at

    content = "\n".join(str(id_) for id_ in sorted(final_ids))
    s3.put_object(
        Bucket=params.bucket,
        Key=key,
        Body=BytesIO(content.encode("utf-8")),
        ContentType="text/plain",
        Metadata={_CREATED_AT_META_KEY: timestamp.isoformat()},
    )
    logger.info(f"State file updated: {len(final_ids)} IDs at s3://{params.bucket}/{key}")
