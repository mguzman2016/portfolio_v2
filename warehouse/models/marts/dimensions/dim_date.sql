-- TODO: implement — generate a date spine covering the ingestion window
-- dbt_utils.date_spine can generate this from the min/max ingested_at in fct_job_postings

{{ config(materialized='table') }}

select
    cast(strftime(d, '%Y%m%d') as integer)   as date_key,
    d::date                                   as date,
    year(d)                                   as year,
    month(d)                                  as month,
    quarter(d)                                as quarter,
    week(d)                                   as week,
    dayofweek(d)                              as day_of_week,
    dayname(d)                                as day_name,
    monthname(d)                              as month_name

from ({{ dbt_utils.date_spine(
    datepart   = "day",
    start_date = "cast('2025-01-01' as date)",
    end_date   = "cast('2030-01-01' as date)"
) }}) spine(d)
