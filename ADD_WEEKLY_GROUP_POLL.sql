-- Weekly group poll support
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.weekly_group_polls (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  poll_key text NOT NULL,
  subject_title text NOT NULL,
  question text NOT NULL,
  intro text,
  options jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE TABLE IF NOT EXISTS public.weekly_group_poll_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id uuid NOT NULL REFERENCES public.weekly_group_polls(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  option_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (poll_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_polls_group_created
  ON public.weekly_group_polls (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_group_poll_votes_poll_created
  ON public.weekly_group_poll_votes (poll_id, created_at ASC);

GRANT SELECT ON public.weekly_group_polls TO authenticated;
GRANT SELECT ON public.weekly_group_poll_votes TO authenticated;

ALTER TABLE public.weekly_group_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_group_poll_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_polls_select_authenticated" ON public.weekly_group_polls;
CREATE POLICY "weekly_group_polls_select_authenticated"
  ON public.weekly_group_polls
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_poll_votes_select_authenticated" ON public.weekly_group_poll_votes;
CREATE POLICY "weekly_group_poll_votes_select_authenticated"
  ON public.weekly_group_poll_votes
  FOR SELECT
  TO authenticated
  USING (true);

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('weekly_group_polls', 'weekly_group_poll_votes')
ORDER BY tablename, policyname;
