from dataclasses import dataclass
from requests import HTTPError
from api.client import get


DETAIL_URL = (
    "https://www.linkedin.com/voyager/api/jobs/jobPostings/{job_id}"
    "?decorationId=com.linkedin.voyager.deco.jobs.web.shared.WebFullJobPosting-65"
    "&topN=1&topNRequestedFlavors=List(TOP_APPLICANT,IN_NETWORK,COMPANY_RECRUIT,"
    "SCHOOL_RECRUIT,HIDDEN_GEM,ACTIVELY_HIRING_COMPANY)"
)

_COMPANY_TYPE = "com.linkedin.voyager.organization.Company"
_FOLLOWING_INFO_TYPE = "com.linkedin.voyager.common.FollowingInfo"
_TITLE_TYPE = "com.linkedin.voyager.jobs.shared.Title"


@dataclass
class JobDetail:
    job_information: dict
    company_information: dict


def _clean_string(value: str | None) -> str:
    if value is None:
        return "No Data Available"
    return value.encode("utf-8", "ignore").decode("utf-8")


def _extract_company(company_data: dict, included: list[dict]) -> dict:
    company = {}
    company["company_id"] = int(company_data.get("entityUrn", "").split(":")[-1])
    company["company_name"] = company_data.get("universalName", "No Data Available")
    company["company_description"] = _clean_string(
        company_data.get("description", "No Data Available")
    )
    company["company_staff_count"] = company_data.get("staffCount", 0)
    company["company_url"] = company_data.get("url", "No Data Available")
    company["company_industries"] = "|".join(company_data.get("industries", []))

    # followingInfo is a reference (*followingInfo) resolved via included
    fi_ref = company_data.get("*followingInfo", "")
    fi_entry = next(
        (i for i in included if i.get("entityUrn") == fi_ref and _FOLLOWING_INFO_TYPE in i.get("$type", "")),
        {},
    )
    company["company_follower_count"] = fi_entry.get("followerCount", 0)

    # Logo: image is a VectorImage-like dict with rootUrl + artifacts
    company["company_image_url"] = "No Data Available"
    image = company_data.get("logo", {}).get("image", {})
    root = image.get("rootUrl", "")
    artifacts = image.get("artifacts", [])
    if root and artifacts:
        segment = artifacts[0].get("fileIdentifyingUrlPathSegment", "")
        if segment:
            company["company_image_url"] = root + segment

    return company


def fetch_job_detail(job_id: int, headers: dict) -> JobDetail:
    """Fetch detail and company info for a single job. Returns empty dicts on 404."""
    url = DETAIL_URL.format(job_id=job_id)
    try:
        response = get(url, headers)
    except HTTPError as e:
        if e.response is not None and e.response.status_code == 404:
            return JobDetail(job_information={}, company_information={})
        raise

    detail = response.get("data", {})
    included = response.get("included", [])

    if not detail:
        return JobDetail(job_information={}, company_information={})

    job = {}
    job["job_id"] = detail.get("jobPostingId", -1)
    job["job_name"] = detail.get("title", "No Data Available")
    title_ref = detail.get("*standardizedTitleResolutionResult")
    title_entry = next(
        (i for i in included if i.get("entityUrn") == title_ref and i.get("$type") == _TITLE_TYPE),
        {},
    )
    job["standardized_name"] = title_entry.get("localizedName", "No Data Available")
    job["job_url"] = detail.get("jobPostingUrl", "No Data Available")
    job["job_description"] = _clean_string(
        detail.get("description", {}).get("text", "No Data Available")
    )
    job["job_type"] = detail.get("formattedEmploymentStatus", "No Data Available")
    job["job_functions"] = "|".join(detail.get("formattedJobFunctions", []))
    job["job_experience_level"] = detail.get("formattedExperienceLevel", "No Data Available")
    job["job_views"] = detail.get("views", -1)

    salary_breakdown = (
        detail.get("salaryInsights", {}).get("compensationBreakdown", [])
    )
    if salary_breakdown:
        job["job_min_salary"] = salary_breakdown[0].get("minSalary", 0)
        job["job_max_salary"] = salary_breakdown[0].get("maxSalary", 0)
        job["job_pay_period"] = salary_breakdown[0].get("payPeriod", "No Data Available")

    company = {}
    company_data = next(
        (i for i in included if i.get("$type") == _COMPANY_TYPE),
        {},
    )
    if company_data:
        company = _extract_company(company_data, included)
        job["company_id"] = company.get("company_id")

    return JobDetail(job_information=job, company_information=company)
