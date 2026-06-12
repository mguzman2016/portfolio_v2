SELECT 
    {{ dbt_utils.generate_surrogate_key(['j.job_id']) }}    as job_key,
    j.job_id                                                as src_id,
    j.job_name,
    j.standardized_name,
    j.job_url,
    j.job_description,
    j.job_type,
    j.job_experience_level,
    j.job_functions
FROM
    {{ ref('int_job_postings_deduped') }} j