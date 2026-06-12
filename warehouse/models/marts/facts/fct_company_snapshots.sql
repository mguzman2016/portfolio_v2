{{
  config(
    unique_key = ['company_key', 'date_key']
  )
}}

{% if is_incremental() %}
with cutoff as (
    select max(snapshot_date) as max_snapshot_date from {{ this }}
)
{% endif %}

select
    {{ dbt_utils.generate_surrogate_key(['company_id']) }}              as company_key,
    cast(strftime(snapshot_date, '%Y%m%d') as integer)                  as date_key,
    company_staff_count,
    company_follower_count,
    snapshot_date
from {{ ref('int_companies') }} ic
{% if is_incremental() %}
where ic.snapshot_date > (select max_snapshot_date from cutoff)
{% endif %}
