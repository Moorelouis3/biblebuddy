-- ============================================================
-- STEP A: Add "home" to group_posts.category CHECK constraint
-- Run this in Supabase SQL Editor FIRST before using the Home tab
-- ============================================================

-- Drop the old CHECK constraint
ALTER TABLE public.group_posts
  DROP CONSTRAINT IF EXISTS group_posts_category_check;

-- Add updated constraint that includes "home"
ALTER TABLE public.group_posts
  ADD CONSTRAINT group_posts_category_check
  CHECK (category IN ('home', 'general', 'bible_studies', 'updates', 'prayer', 'qa'));

-- Verify
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.group_posts'::regclass
  AND contype = 'c';
