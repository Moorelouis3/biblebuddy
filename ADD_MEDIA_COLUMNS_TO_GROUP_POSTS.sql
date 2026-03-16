-- Add media support columns to group_posts if they do not exist yet
-- Run once in Supabase SQL Editor

ALTER TABLE public.group_posts
ADD COLUMN IF NOT EXISTS media_url text;

ALTER TABLE public.group_posts
ADD COLUMN IF NOT EXISTS link_url text;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'group_posts'
  AND column_name IN ('media_url', 'link_url')
ORDER BY column_name;
