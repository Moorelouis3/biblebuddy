-- ============================================================
-- Make Profile Data Publicly Readable
-- Any authenticated user can SELECT any user's profile stats
-- and action log (for public profile pages).
-- Write policies remain locked to own row only.
-- Run this in Supabase SQL Editor.
-- ============================================================

-- ── profile_stats ─────────────────────────────────────────
-- Drop the "own row only" SELECT policy
DROP POLICY IF EXISTS "profile_stats_select_own" ON public.profile_stats;

-- Replace with "any authenticated user can read any row"
CREATE POLICY "profile_stats_select_authenticated"
  ON public.profile_stats FOR SELECT
  TO authenticated
  USING (true);

-- ── master_actions ────────────────────────────────────────
-- Drop the "own row only" SELECT policy
DROP POLICY IF EXISTS "master_actions_select_own" ON public.master_actions;

-- Replace with "any authenticated user can read any row"
CREATE POLICY "master_actions_select_authenticated"
  ON public.master_actions FOR SELECT
  TO authenticated
  USING (true);

-- ── completed_chapters ────────────────────────────────────
-- (profile page reads this to compute books completed + Bible %)
-- Drop existing own-row SELECT policy if it exists
DROP POLICY IF EXISTS "completed_chapters_select_own" ON public.completed_chapters;
DROP POLICY IF EXISTS "Users can view their own completed chapters" ON public.completed_chapters;

-- Allow any authenticated user to read any row
CREATE POLICY "completed_chapters_select_authenticated"
  ON public.completed_chapters FOR SELECT
  TO authenticated
  USING (true);
