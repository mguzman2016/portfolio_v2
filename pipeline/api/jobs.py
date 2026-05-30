from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from loguru import logger
from api.client import get


def _set_pagination(url: str, count: int, start: int) -> str:
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    query["count"] = [str(count)]
    query["start"] = [str(start)]
    return urlunparse(parsed._replace(query=urlencode(query, doseq=True, safe=":,()")))


def fetch_job_ids(url: str, headers: dict) -> list[int]:
    """Paginate through the search endpoint and return all job IDs."""
    all_ids: list[int] = []
    start = 0
    step = 50

    while True:
        paginated_url = _set_pagination(url, count=step, start=start)
        logger.info(f"Fetching job IDs, offset={start}")
        response = get(paginated_url, headers)

        data = response.get("data", {})
        elements = data.get("elements", [])
        if not elements:
            break

        # Job card data lives in `included` — build a lookup by entityUrn
        included = response.get("included", [])
        card_lookup = {
            entry["entityUrn"]: entry
            for entry in included
            if entry.get("$type") == "com.linkedin.voyager.dash.jobs.JobPostingCard"
        }

        for element in elements:
            ref_urn = element.get("jobCardUnion", {}).get("*jobPostingCard", "")
            card = card_lookup.get(ref_urn, {})
            raw_urn = card.get("preDashNormalizedJobPostingUrn", "")
            job_id = raw_urn.split(":")[-1]
            if job_id.isdigit():
                all_ids.append(int(job_id))

        start += step

    return all_ids
