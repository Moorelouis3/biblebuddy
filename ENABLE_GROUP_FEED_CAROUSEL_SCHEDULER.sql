-- Louis-only queue for scheduled home-feed carousel posts
-- Run this once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.group_feed_carousel_queue (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id          uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  created_by        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_style        text NOT NULL DEFAULT 'cover',
  title             text,
  caption           text,
  cover_image_url   text,
  scheduled_for     timestamptz,
  status            text NOT NULL DEFAULT 'draft',
  published_post_id uuid REFERENCES public.group_posts(id) ON DELETE SET NULL,
  published_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CHECK (status IN ('draft', 'scheduled', 'published')),
  CHECK (post_style IN ('cover', 'text')),
  CHECK (
    (post_style = 'cover' AND cover_image_url IS NOT NULL)
    OR (post_style = 'text')
  )
);

CREATE INDEX IF NOT EXISTS idx_group_feed_carousel_queue_group_created
  ON public.group_feed_carousel_queue (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_group_feed_carousel_queue_schedule
  ON public.group_feed_carousel_queue (status, scheduled_for);

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

SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'group_feed_carousel_queue'
ORDER BY policyname;
