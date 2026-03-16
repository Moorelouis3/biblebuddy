-- Rename the current official study group from Hope Nation to Bible Buddy Study Group
-- Run once in Supabase SQL Editor

UPDATE public.study_groups
SET
  name = 'Bible Buddy Study Group',
  description = 'The official Bible Buddy study group for the whole app. Join us weekly for guided Bible studies, Scripture discussion, prayer, and community.'
WHERE name = 'Hope Nation';

SELECT id, name, description
FROM public.study_groups
WHERE name IN ('Bible Buddy Study Group', 'Hope Nation');
