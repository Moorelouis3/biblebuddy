-- Weekly recurring group post support for Monday, Friday, Saturday, and Sunday
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.weekly_group_series_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  series_key text NOT NULL,
  subject_title text NOT NULL,
  title text NOT NULL,
  description text,
  content_html text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key, series_key)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_series_posts_group_created
  ON public.weekly_group_series_posts (group_id, created_at DESC);

GRANT SELECT ON public.weekly_group_series_posts TO authenticated;

ALTER TABLE public.weekly_group_series_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_series_posts_select_authenticated" ON public.weekly_group_series_posts;
CREATE POLICY "weekly_group_series_posts_select_authenticated"
  ON public.weekly_group_series_posts
  FOR SELECT
  TO authenticated
  USING (true);

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('weekly_group_series_posts')
ORDER BY tablename, policyname;
