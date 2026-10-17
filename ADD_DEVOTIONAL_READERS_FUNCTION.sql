-- Who is studying a devotional (Louis, 2026-10-17)
-- Run this entire script in the Supabase SQL Editor.
--
-- The public Proverbs page shows "215 Bible Buddies are studying Proverbs"
-- with their faces, and Louis wants that on every study in the Library, not
-- just the one with a community event. Those numbers come from
-- community_event_members, which only exists for the two community studies, so
-- for everything else the honest source is devotional_progress: the people who
-- have actually opened a day.
--
-- Counting distinct readers from the client would mean paging thousands of
-- day rows, so it happens here. Returns ids only - the route turns those into
-- a first name and an avatar and nothing else, exactly as
-- app/api/community-events/[slug]/members does.
--
-- Read-only. Creates no table, changes no row. Safe to run twice.

CREATE OR REPLACE FUNCTION devotional_readers(p_devotional_id uuid, p_limit int DEFAULT 40)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH firsts AS (
    SELECT user_id, MIN(created_at) AS started_at
    FROM devotional_progress
    WHERE devotional_id = p_devotional_id
      AND user_id IS NOT NULL
    GROUP BY user_id
  ),
  earliest AS (
    SELECT user_id FROM firsts ORDER BY started_at ASC LIMIT p_limit
  )
  SELECT jsonb_build_object(
    'total', (SELECT COUNT(*) FROM firsts),
    -- Oldest first, so the faces are people who have actually been studying
    -- rather than whoever opened day 1 a minute ago.
    'user_ids', COALESCE((SELECT jsonb_agg(user_id) FROM earliest), '[]'::jsonb)
  );
$$;

COMMENT ON FUNCTION devotional_readers(uuid, int) IS
  'Distinct readers of a devotional, from devotional_progress: a total and up to p_limit earliest user ids. Called only by app/api/devotionals/[id]/readers with the service role.';

-- Only the server role calls this; the browser goes through the route.
REVOKE ALL ON FUNCTION devotional_readers(uuid, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION devotional_readers(uuid, int) TO service_role;

-- What it returns for the two studies on the shelf today.
SELECT title, devotional_readers(id, 8) AS readers
FROM devotionals
WHERE is_published = true
ORDER BY sort_order;
