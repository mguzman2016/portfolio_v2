select
    job_id,
    company_id,
    job_name,
    standardized_name,
    job_url,
    job_description,
    job_type,
    job_experience_level,
    job_functions,
    job_min_salary,
    job_max_salary,
    job_pay_period,
    ingested_city,
    ingested_search,
    strptime(ingested_at, '%Y-%m-%d_%H') as ingested_at
from {{ ref('stg_job_postings') }}
qualify row_number() over (
    partition by job_id
    order by strptime(ingested_at, '%Y-%m-%d_%H') desc
) = 1
