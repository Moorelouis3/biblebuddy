-- Add text-only queue support to the home feed scheduler
-- Run this once in the Supabase SQL Editor if group_feed_carousel_queue already exists

ALTER TABLE public.group_feed_carousel_queue
  ADD COLUMN IF NOT EXISTS post_style text NOT NULL DEFAULT 'cover';

ALTER TABLE public.group_feed_carousel_queue
  ALTER COLUMN cover_image_url DROP NOT NULL;

ALTER TABLE public.group_feed_carousel_queue
  DROP CONSTRAINT IF EXISTS group_feed_carousel_queue_post_style_check;

ALTER TABLE public.group_feed_carousel_queue
  ADD CONSTRAINT group_feed_carousel_queue_post_style_check
  CHECK (post_style IN ('cover', 'text'));

ALTER TABLE public.group_feed_carousel_queue
  DROP CONSTRAINT IF EXISTS group_feed_carousel_queue_cover_image_required_check;

ALTER TABLE public.group_feed_carousel_queue
  ADD CONSTRAINT group_feed_carousel_queue_cover_image_required_check
  CHECK (
    (post_style = 'cover' AND cover_image_url IS NOT NULL)
    OR (post_style = 'text')
  );

UPDATE public.group_feed_carousel_queue
SET post_style = 'cover'
WHERE post_style IS NULL;

SELECT column_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'group_feed_carousel_queue'
  AND column_name IN ('post_style', 'cover_image_url')
ORDER BY column_name;
