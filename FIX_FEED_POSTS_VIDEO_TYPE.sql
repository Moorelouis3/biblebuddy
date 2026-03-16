-- ─────────────────────────────────────────────────────────────────────────────
-- Allow 'video' as a valid post_type in feed_posts
-- Run in Supabase SQL editor if video posts are failing to save
-- ─────────────────────────────────────────────────────────────────────────────

-- Check current constraint (run this first to see what's there)
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'feed_posts'::regclass
  AND contype = 'c';

-- Drop the old post_type check constraint (name may vary — use the name from above)
-- Common names: feed_posts_post_type_check, post_type_check
ALTER TABLE feed_posts DROP CONSTRAINT IF EXISTS feed_posts_post_type_check;
ALTER TABLE feed_posts DROP CONSTRAINT IF EXISTS post_type_check;

-- Re-add it with 'video' included
ALTER TABLE feed_posts
  ADD CONSTRAINT feed_posts_post_type_check
  CHECK (post_type IN ('thought', 'verse', 'prayer', 'prayer_request', 'photo', 'link', 'video'));

-- Verify
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'feed_posts'::regclass
  AND contype = 'c';
