-- Fix shared Buddies Activity access
-- Run once in the Supabase SQL Editor
-- This allows authenticated users to read the shared master activity log
-- and public profile rows needed for the Bible study group Buddies Activity popup.

ALTER TABLE public.master_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_stats ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.master_actions TO authenticated;
GRANT SELECT ON public.profile_stats TO authenticated;

DROP POLICY IF EXISTS "master_actions_select_own" ON public.master_actions;
DROP POLICY IF EXISTS "master_actions_select_authenticated" ON public.master_actions;
CREATE POLICY "master_actions_select_authenticated"
  ON public.master_actions
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "profile_stats_select_own" ON public.profile_stats;
DROP POLICY IF EXISTS "profile_stats_select_authenticated" ON public.profile_stats;
CREATE POLICY "profile_stats_select_authenticated"
  ON public.profile_stats
  FOR SELECT
  TO authenticated
  USING (true);

SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('master_actions', 'profile_stats')
ORDER BY tablename, policyname;
