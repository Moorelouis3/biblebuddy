-- Repair the already-posted Weekly Bible Trivia post so it shows under Louis
-- Safe target: the most recent "The Life of David" weekly trivia post in Bible Buddy Study Group

WITH louis_user AS (
  SELECT id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1
),
louis_profile AS (
  SELECT
    user_id,
    COALESCE(NULLIF(display_name, ''), NULLIF(username, ''), 'Louis') AS display_name
  FROM public.profile_stats
  WHERE user_id = (SELECT id FROM louis_user)
  LIMIT 1
),
target_trivia AS (
  SELECT
    wt.id AS trivia_id,
    wt.post_id
  FROM public.weekly_group_trivia_sets wt
  JOIN public.study_groups sg
    ON sg.id = wt.group_id
  WHERE sg.name = 'Bible Buddy Study Group'
    AND wt.subject_title = 'The Life of David'
  ORDER BY wt.created_at DESC
  LIMIT 1
)
UPDATE public.group_posts gp
SET
  user_id = lp.user_id,
  display_name = lp.display_name
FROM louis_profile lp, target_trivia tt
WHERE gp.id = tt.post_id;

WITH louis_user AS (
  SELECT id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1
),
target_trivia AS (
  SELECT
    wt.id AS trivia_id
  FROM public.weekly_group_trivia_sets wt
  JOIN public.study_groups sg
    ON sg.id = wt.group_id
  WHERE sg.name = 'Bible Buddy Study Group'
    AND wt.subject_title = 'The Life of David'
  ORDER BY wt.created_at DESC
  LIMIT 1
)
UPDATE public.weekly_group_trivia_sets wt
SET created_by = lu.id
FROM louis_user lu, target_trivia tt
WHERE wt.id = tt.trivia_id;

SELECT
  gp.id AS post_id,
  gp.display_name,
  gp.user_id,
  wt.subject_title,
  wt.created_by
FROM public.weekly_group_trivia_sets wt
JOIN public.group_posts gp
  ON gp.id = wt.post_id
JOIN public.study_groups sg
  ON sg.id = wt.group_id
WHERE sg.name = 'Bible Buddy Study Group'
  AND wt.subject_title = 'The Life of David'
ORDER BY wt.created_at DESC
LIMIT 1;
