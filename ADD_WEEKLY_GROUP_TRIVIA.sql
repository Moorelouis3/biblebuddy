-- Weekly group trivia support
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.weekly_group_trivia_sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  subject_key text NOT NULL,
  subject_title text NOT NULL,
  intro text,
  questions jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE TABLE IF NOT EXISTS public.weekly_group_trivia_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  trivia_set_id uuid NOT NULL REFERENCES public.weekly_group_trivia_sets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 10,
  completed_at timestamptz DEFAULT now(),
  UNIQUE (trivia_set_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_trivia_sets_group_created
  ON public.weekly_group_trivia_sets (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_group_trivia_scores_set_score
  ON public.weekly_group_trivia_scores (trivia_set_id, score DESC, completed_at ASC);

GRANT SELECT ON public.weekly_group_trivia_sets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_group_trivia_scores TO authenticated;

ALTER TABLE public.weekly_group_trivia_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_group_trivia_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_trivia_sets_select_authenticated" ON public.weekly_group_trivia_sets;
CREATE POLICY "weekly_group_trivia_sets_select_authenticated"
  ON public.weekly_group_trivia_sets
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_trivia_scores_select_authenticated" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_select_authenticated"
  ON public.weekly_group_trivia_scores
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_trivia_scores_insert_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_insert_own"
  ON public.weekly_group_trivia_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "weekly_group_trivia_scores_update_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_update_own"
  ON public.weekly_group_trivia_scores
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "weekly_group_trivia_scores_delete_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_delete_own"
  ON public.weekly_group_trivia_scores
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('weekly_group_trivia_sets', 'weekly_group_trivia_scores')
ORDER BY tablename, policyname;
