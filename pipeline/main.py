import argparse
import resource
import sys
import time

from loguru import logger

from config.loader import load_config, SearchConfig
from api.client import get_secret, build_headers
from api.jobs import fetch_job_ids
from api.details import fetch_job_detail
from filesystem.local import get_tmp_path, append_record, cleanup
from s3.upload import UploadParams, upload_jsonl
from s3.state import StateParams, load_state, save_state


def _configure_logger() -> None:
    logger.remove()
    logger.add(sys.stdout, format="{time:YYYY-MM-DD HH:mm:ss} | {level:<8} | {message}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="LinkedIn job data pipeline")
    parser.add_argument("--secret-name", default="mguzman-portfolio/linkedin-session-cookie")
    parser.add_argument("--bucket", default="mguzman-portfolio")
    parser.add_argument("--prefix", default="linkedin_data")
    parser.add_argument("--config", default="config.yaml")
    return parser.parse_args()


def run_search(search: SearchConfig, headers: dict, args: argparse.Namespace) -> None:
    t0 = time.perf_counter()
    logger.info(f"[{search.city} / {search.search}]")

    state_params = StateParams(bucket=args.bucket, city=search.city, search=search.search)
    upload_params = UploadParams(bucket=args.bucket, prefix=args.prefix, city=search.city, search=search.search)
    tmp_path = get_tmp_path(search.city, search.search)
    cleanup(tmp_path)

    logger.info("Loading state from S3...")
    state = load_state(state_params)
    logger.info(f"{len(state.processed_ids)} previously processed IDs loaded")

    logger.info("Fetching job IDs from search endpoint...")
    all_ids = fetch_job_ids(search.url, headers)
    logger.info(f"Found {len(all_ids)} total IDs")

    new_ids = [id_ for id_ in all_ids if id_ not in state.processed_ids]
    skipped = len(all_ids) - len(new_ids)
    logger.info(f"{len(new_ids)} new IDs to process (skipping {skipped} already seen)")

    final_ids = set(all_ids) if state.stale else (state.processed_ids | set(new_ids))

    if not new_ids:
        logger.info("Nothing to process.")
        save_state(state_params, final_ids, reset=state.stale, created_at=state.created_at)
        logger.info(f"Search done in {time.perf_counter() - t0:.1f}s")
        return

    logger.info(f"Fetching details for {len(new_ids)} jobs...")
    for i, job_id in enumerate(new_ids, 1):
        logger.info(f"[{i}/{len(new_ids)}] job_id={job_id}")
        detail = fetch_job_detail(job_id, headers)
        if not detail.job_information:
            continue
        record = {**detail.job_information, **detail.company_information}
        append_record(tmp_path, record)

    logger.info("Uploading JSONL to S3...")
    upload_jsonl(tmp_path, upload_params)
    cleanup(tmp_path)

    save_state(state_params, final_ids, reset=state.stale, created_at=state.created_at)
    logger.info(f"Search done in {time.perf_counter() - t0:.1f}s")


def main() -> None:
    _configure_logger()
    args = parse_args()
    config = load_config(args.config)

    pipeline_start = time.perf_counter()

    logger.info("Fetching AWS secret...")
    secret = get_secret(args.secret_name)
    headers = build_headers(secret)

    for search in config.searches:
        run_search(search, headers, args)

    elapsed = time.perf_counter() - pipeline_start
    peak_mb = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024
    logger.info(f"Pipeline complete | elapsed={elapsed:.1f}s | peak_memory={peak_mb:.1f}MB")


if __name__ == "__main__":
    main()
