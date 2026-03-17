-- Set Louis to the Teacher badge
-- Run once in Supabase SQL Editor

INSERT INTO public.profile_stats (
  user_id,
  member_badge,
  updated_at
)
SELECT
  u.id,
  'teacher',
  now()
FROM auth.users u
WHERE lower(u.email) = 'moorelouis3@gmail.com'
ON CONFLICT (user_id) DO UPDATE
SET
  member_badge = EXCLUDED.member_badge,
  updated_at = now();

SELECT
  ps.user_id,
  ps.member_badge,
  ps.is_paid
FROM public.profile_stats ps
JOIN auth.users u
  ON u.id = ps.user_id
WHERE lower(u.email) = 'moorelouis3@gmail.com';
