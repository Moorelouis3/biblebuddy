-- ============================================================
-- STEP D: Add Louis as a Bible Buddy for every user
--         Also creates a conversation with each user
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Insert Louis + every other user into buddies table
--    (user_id_1 must be the lower UUID — enforced by CHECK constraint)
INSERT INTO public.buddies (user_id_1, user_id_2)
SELECT
  CASE WHEN louis.id < u.id THEN louis.id ELSE u.id END AS user_id_1,
  CASE WHEN louis.id < u.id THEN u.id ELSE louis.id END AS user_id_2
FROM auth.users u
CROSS JOIN (
  SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1
) louis
WHERE u.id != louis.id
ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

-- 2. Create a conversation between Louis and every other user
INSERT INTO public.conversations (user_id_1, user_id_2)
SELECT
  CASE WHEN louis.id < u.id THEN louis.id ELSE u.id END AS user_id_1,
  CASE WHEN louis.id < u.id THEN u.id ELSE louis.id END AS user_id_2
FROM auth.users u
CROSS JOIN (
  SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com' LIMIT 1
) louis
WHERE u.id != louis.id
ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

-- 3. Verify — how many buddy relationships does Louis have?
SELECT COUNT(*) AS louis_buddy_count
FROM public.buddies b
JOIN auth.users lou ON lou.email = 'moorelouis3@gmail.com'
WHERE b.user_id_1 = lou.id OR b.user_id_2 = lou.id;
