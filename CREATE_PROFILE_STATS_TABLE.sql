-- =====================================================
-- Create profile_stats table with RLS policies
-- =====================================================
--
-- PURPOSE: Fast-loading cached scoreboard for Profile page
-- One row per user, stores latest totals only
-- Updated whenever an action occurs
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.profile_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_actions integer DEFAULT 0,
  chapters_completed_count integer DEFAULT 0,
  notes_created_count integer DEFAULT 0,
  people_learned_count integer DEFAULT 0,
  places_discovered_count integer DEFAULT 0,
  keywords_mastered_count integer DEFAULT 0,
  last_active_date date,
  current_streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint on user_id (one row per user)
CREATE UNIQUE INDEX profile_stats_user_unique
ON public.profile_stats (user_id);

-- Enable RLS
ALTER TABLE public.profile_stats ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own stats)
CREATE POLICY "profile_stats_select_own"
ON public.profile_stats
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (users can only insert their own stats)
CREATE POLICY "profile_stats_insert_own"
ON public.profile_stats
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE policy (users can only update their own stats)
CREATE POLICY "profile_stats_update_own"
ON public.profile_stats
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Verification: Check that policies were created
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'profile_stats'
ORDER BY policyname;

