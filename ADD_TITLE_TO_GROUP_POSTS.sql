-- Add post titles to group posts for the Bible Buddy Study Group feed composer
-- Run once in Supabase SQL Editor

ALTER TABLE public.group_posts
ADD COLUMN IF NOT EXISTS title text;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'group_posts'
  AND column_name = 'title';
