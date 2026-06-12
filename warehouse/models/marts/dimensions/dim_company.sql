select
    {{ dbt_utils.generate_surrogate_key(['company_id']) }}    as company_key,
    company_id                                                  as src_id,
    company_name,
    company_description,
    company_url,
    company_industries,
    company_image_url
from {{ ref('int_companies') }}
qualify row_number() over (
    partition by company_id
    order by snapshot_date desc
) = 1
