import argparse

from config.loader import load_config, SearchConfig
from api.client import get_secret, build_headers
from api.jobs import fetch_job_ids
from api.details import fetch_job_detail
from filesystem.local import get_tmp_path, append_record, cleanup
from s3.upload import UploadParams, upload_jsonl
from s3.state import StateParams, load_state, save_state


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="LinkedIn job data pipeline")
    parser.add_argument("--secret-name", default="mguzman-portfolio/linkedin-session-cookie")
    parser.add_argument("--bucket", default="mguzman-portfolio")
    parser.add_argument("--prefix", default="linkedin_data")
    parser.add_argument("--config", default="config.yaml")
    return parser.parse_args()


def run_search(search: SearchConfig, headers: dict, args: argparse.Namespace) -> None:
    print(f"\n[{search.city} / {search.search}]")

    state_params = StateParams(bucket=args.bucket, city=search.city, search=search.search)
    upload_params = UploadParams(bucket=args.bucket, prefix=args.prefix, city=search.city, search=search.search)
    tmp_path = get_tmp_path(search.city, search.search)
    cleanup(tmp_path)

    print("  Loading state from S3...")
    state = load_state(state_params)
    print(f"  {len(state.processed_ids)} previously processed IDs loaded")

    print("  Fetching job IDs from search endpoint...")
    all_ids = fetch_job_ids(search.url, headers)
    print(f"  Found {len(all_ids)} total IDs")

    new_ids = [id_ for id_ in all_ids if id_ not in state.processed_ids]
    skipped = len(all_ids) - len(new_ids)
    print(f"  {len(new_ids)} new IDs to process (skipping {skipped} already seen)")

    if not new_ids:
        print("  Nothing to process.")
        save_state(state_params, state.processed_ids, [], reset=state.stale)
        return

    print(f"  Fetching details for {len(new_ids)} jobs...")
    for i, job_id in enumerate(new_ids, 1):
        print(f"    [{i}/{len(new_ids)}] job_id={job_id}")
        detail = fetch_job_detail(job_id, headers)
        if not detail.job_information:
            continue
        record = {**detail.job_information, **detail.company_information}
        append_record(tmp_path, record)

    print("  Uploading JSONL to S3...")
    upload_jsonl(tmp_path, upload_params)
    cleanup(tmp_path)

    save_state(state_params, state.processed_ids, new_ids, reset=state.stale)


def main() -> None:
    args = parse_args()
    config = load_config(args.config)

    print("Fetching AWS secret...")
    secret = get_secret(args.secret_name)
    headers = build_headers(secret)

    for search in config.searches:
        run_search(search, headers, args)

    print("\nPipeline complete.")


if __name__ == "__main__":
    main()
