-- Allow scheduled group post categories in public.group_posts
-- Run this once in the Supabase SQL Editor before using scheduled weekly posts

ALTER TABLE public.group_posts
  DROP CONSTRAINT IF EXISTS group_posts_category_check;

ALTER TABLE public.group_posts
  ADD CONSTRAINT group_posts_category_check
  CHECK (
    category IN (
      'home',
      'general',
      'bible_studies',
      'updates',
      'prayer',
      'qa',
      'weekly_trivia',
      'weekly_poll',
      'weekly_question',
      'update_monday',
      'who_was_this_friday',
      'bible_study_saturday',
      'prayer_request_sunday'
    )
  );

SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.group_posts'::regclass
  AND contype = 'c';
