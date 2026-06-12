{{
  config(
    unique_key = 'job_key'
  )
}}

{% if is_incremental() %}
with cutoff as (
    select max(ingested_at) as max_ingested_at from {{ this }}
)
{% endif %}

select

    -- foreign keys
    {{ dbt_utils.generate_surrogate_key(['j.job_id']) }}              as job_key,
    {{ dbt_utils.generate_surrogate_key(['j.company_id']) }}          as company_key,
    cast(strftime(j.ingested_at, '%Y%m%d') as integer)                as date_key,

    -- degenerate dimensions (context at ingestion time)
    j.ingested_city                                             as city,
    j.ingested_search                                           as search_term,

    -- measures
    -- TODO: fix job views ingestion pipeline to populate this field
    0                                                           as job_views,
    j.job_min_salary,
    j.job_max_salary,
    j.job_pay_period,

    -- metadata
    j.ingested_at

from {{ ref('int_job_postings_deduped') }} j
{% if is_incremental() %}
where j.ingested_at > (select max_ingested_at from cutoff)
{% endif %}
