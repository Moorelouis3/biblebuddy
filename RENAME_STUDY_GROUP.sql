-- Rename "Bible Buddy Study Group" to "Hope Nation"
UPDATE public.study_groups
SET name = 'Hope Nation'
WHERE name = 'Bible Buddy Study Group';
