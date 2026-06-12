-- Reads all partitions: linkedin_data/city=*/search=*/date=*/*.jsonl
-- Extracts partition values (city, search, date_hour) from the file path using filename()

select
    -- identifiers
    cast(job_id as bigint)                              as job_id,
    cast(company_id as bigint)                          as company_id,

    -- job attributes
    job_name,
    standardized_name,
    job_url,
    job_description,
    job_type,
    job_experience_level,

    -- pipe-separated → arrays (split on '|', filter empty strings)
    string_split(job_functions, '|')                    as job_functions,

    -- salary (nullable)
    cast(nullif(job_min_salary, 0) as double)           as job_min_salary,
    cast(nullif(job_max_salary, 0) as double)           as job_max_salary,
    nullif(job_pay_period, 'No Data Available')         as job_pay_period,

    -- company attributes
    company_name,
    company_description,
    cast(company_staff_count as integer)                as company_staff_count,
    company_url,
    string_split(company_industries, '|')               as company_industries,
    cast(company_follower_count as integer)             as company_follower_count,
    nullif(company_image_url, 'No Data Available')      as company_image_url,

    -- partition columns extracted from file path
    city AS ingested_city,
    search AS ingested_search,
    date AS ingested_at
from {{ source('linkedin_raw', 'job_postings') }}
