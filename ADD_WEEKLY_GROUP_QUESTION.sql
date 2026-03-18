-- Weekly group question support
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.weekly_group_questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  prompt_key text NOT NULL,
  subject_title text NOT NULL,
  prompt text NOT NULL,
  intro text,
  comment_prompt text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_questions_group_created
  ON public.weekly_group_questions (group_id, created_at DESC);

GRANT SELECT ON public.weekly_group_questions TO authenticated;

ALTER TABLE public.weekly_group_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_questions_select_authenticated" ON public.weekly_group_questions;
CREATE POLICY "weekly_group_questions_select_authenticated"
  ON public.weekly_group_questions
  FOR SELECT
  TO authenticated
  USING (true);

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('weekly_group_questions')
ORDER BY tablename, policyname;
