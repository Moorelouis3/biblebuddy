-- Repair RLS policies for the home feed scheduler queue
-- Run this if saving to group_feed_carousel_queue says:
-- "new row violates row-level security policy"

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
