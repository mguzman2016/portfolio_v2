-- TODO: implement — static lookup table for experience levels seen in the data

select *
from (
    values
        (1, 'Internship'),
        (2, 'Entry level'),
        (3, 'Associate'),
        (4, 'Mid-Senior level'),
        (5, 'Director'),
        (6, 'Executive'),
        (-1, 'No Data Available')
) as t(experience_level_id, experience_level_name)
