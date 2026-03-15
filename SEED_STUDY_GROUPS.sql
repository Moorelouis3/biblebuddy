-- ============================================================
-- Bible Study Groups — Seed Data
-- Run this in Supabase SQL Editor AFTER CREATE_STUDY_GROUPS_TABLES.sql
-- ============================================================

INSERT INTO public.study_groups (
  name,
  description,
  leader_user_id,
  leader_name,
  category,
  status,
  current_weekly_study,
  cover_emoji,
  cover_color,
  max_members
)
VALUES
  (
    'Bible Buddy Study Group',
    'Join owner and Bible teacher Louis Moore as together you break down the Bible — week by week, story by story — discussing, asking questions, and going deeper into God''s Word than you''ve ever gone before.',
    (SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1),
    'Louis Moore',
    'mixed',
    'active',
    'The Life of Joseph — Week 2: The Pit and the Purpose',
    '🤝',
    '#d4ecd4',
    50
  ),
  (
    'Bible Study Women''s Group',
    NULL,
    (SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1),
    'Louis Moore',
    'women',
    'coming_soon',
    NULL,
    '🌸',
    '#fce7f3',
    50
  ),
  (
    'Bible Study Men''s Group',
    NULL,
    (SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1),
    'Louis Moore',
    'men',
    'coming_soon',
    NULL,
    '💪🏾',
    '#ddeeff',
    50
  );

-- Also insert Louis as the leader/approved member of the active group
INSERT INTO public.group_members (
  group_id,
  user_id,
  display_name,
  role,
  status,
  joined_at
)
SELECT
  sg.id,
  (SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1),
  'Louis Moore',
  'leader',
  'approved',
  now()
FROM public.study_groups sg
WHERE sg.name = 'Bible Buddy Study Group';
