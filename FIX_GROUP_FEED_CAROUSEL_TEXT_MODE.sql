-- Force-fix the home feed scheduler table for text-only posts
-- Run this if text posts fail to save as draft or scheduled

ALTER TABLE public.group_feed_carousel_queue
  ADD COLUMN IF NOT EXISTS post_style text;

UPDATE public.group_feed_carousel_queue
SET post_style = 'cover'
WHERE post_style IS NULL;

ALTER TABLE public.group_feed_carousel_queue
  ALTER COLUMN post_style SET DEFAULT 'cover';

ALTER TABLE public.group_feed_carousel_queue
  ALTER COLUMN post_style SET NOT NULL;

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

ALTER TABLE public.group_feed_carousel_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "group_feed_carousel_queue_select_own" ON public.group_feed_carousel_queue;
CREATE POLICY "group_feed_carousel_queue_select_own" ON public.group_feed_carousel_queue
  FOR SELECT TO authenticated
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "group_feed_carousel_queue_insert_own" ON public.group_feed_carousel_queue;
CREATE POLICY "group_feed_carousel_queue_insert_own" ON public.group_feed_carousel_queue
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "group_feed_carousel_queue_update_own" ON public.group_feed_carousel_queue;
CREATE POLICY "group_feed_carousel_queue_update_own" ON public.group_feed_carousel_queue
  FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "group_feed_carousel_queue_delete_own" ON public.group_feed_carousel_queue;
CREATE POLICY "group_feed_carousel_queue_delete_own" ON public.group_feed_carousel_queue
  FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

SELECT column_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'group_feed_carousel_queue'
  AND column_name IN ('post_style', 'cover_image_url')
ORDER BY column_name;
