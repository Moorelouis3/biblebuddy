-- Force title/subject to be optional in the home feed scheduler
-- Run this once if drafts fail to save unless a title is filled in

ALTER TABLE public.group_feed_carousel_queue
  ALTER COLUMN title DROP NOT NULL;

ALTER TABLE public.group_feed_carousel_queue
  ALTER COLUMN title DROP DEFAULT;

ALTER TABLE public.group_feed_carousel_queue
  DROP CONSTRAINT IF EXISTS group_feed_carousel_queue_title_required_check;

SELECT column_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'group_feed_carousel_queue'
  AND column_name = 'title';
