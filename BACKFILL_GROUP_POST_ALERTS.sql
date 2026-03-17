-- Backfill existing group post alerts
-- Run once in the Supabase SQL Editor
-- This creates missing notifications for existing top-level group posts

WITH top_level_posts AS (
  SELECT
    gp.id,
    gp.group_id,
    gp.user_id,
    gp.display_name,
    gp.created_at,
    COALESCE(
      NULLIF(ps.display_name, ''),
      NULLIF(ps.username, ''),
      NULLIF(gp.display_name, ''),
      'A member'
    ) AS actor_name,
    COALESCE(sg.name, 'your group') AS group_name
  FROM public.group_posts gp
  LEFT JOIN public.profile_stats ps
    ON ps.user_id = gp.user_id
  LEFT JOIN public.study_groups sg
    ON sg.id = gp.group_id
  WHERE gp.parent_post_id IS NULL
),
target_rows AS (
  SELECT
    gm.user_id AS notification_user_id,
    tlp.user_id AS actor_user_id,
    tlp.actor_name,
    tlp.group_name,
    tlp.id AS post_id,
    tlp.created_at,
    '/study-groups/' || tlp.group_id || '/chat' AS article_slug
  FROM top_level_posts tlp
  JOIN public.group_members gm
    ON gm.group_id = tlp.group_id
   AND gm.status = 'approved'
)
INSERT INTO public.notifications (
  user_id,
  type,
  from_user_id,
  from_user_name,
  article_slug,
  post_id,
  message,
  created_at
)
SELECT
  tr.notification_user_id,
  'group_post',
  tr.actor_user_id,
  tr.actor_name,
  tr.article_slug,
  tr.post_id,
  tr.actor_name || ' posted in ' || tr.group_name,
  tr.created_at
FROM target_rows tr
WHERE NOT EXISTS (
  SELECT 1
  FROM public.notifications n
  WHERE n.type = 'group_post'
    AND n.user_id = tr.notification_user_id
    AND n.post_id = tr.post_id
);
