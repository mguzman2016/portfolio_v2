-- One row per company_id × snapshot_date.
-- Within a day, the latest ingestion wins (a company can appear in multiple city/search runs).
select
    company_id,
    company_name,
    company_description,
    company_url,
    company_industries,
    company_image_url,
    company_staff_count,
    company_follower_count,
    strptime(ingested_at, '%Y-%m-%d_%H')::date as snapshot_date
from {{ ref('stg_job_postings') }}
qualify row_number() over (
    partition by company_id, strptime(ingested_at, '%Y-%m-%d_%H')::date
    order by strptime(ingested_at, '%Y-%m-%d_%H') desc
) = 1