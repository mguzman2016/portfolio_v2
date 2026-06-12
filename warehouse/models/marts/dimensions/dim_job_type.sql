-- TODO: implement — static lookup table for employment types seen in the data

select *
from (
    values
        (1, 'Full-time'),
        (2, 'Part-time'),
        (3, 'Contract'),
        (4, 'Temporary'),
        (5, 'Internship'),
        (6, 'Volunteer'),
        (-1, 'No Data Available')
) as t(job_type_id, job_type_name)
