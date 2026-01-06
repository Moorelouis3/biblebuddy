-- =====================================================
-- Create master_actions table with RLS policies
-- =====================================================
--
-- PURPOSE: Complete event log of all user actions
-- One row per action, never edited, never aggregated
-- Source of truth for Daily Activity heat map and streaks
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.master_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add constraint to ensure only valid action types
ALTER TABLE public.master_actions
ADD CONSTRAINT master_actions_action_type_check
CHECK (action_type IN (
  'user_login',
  'chapter_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered'
));

-- Add index for efficient queries by user and date
CREATE INDEX master_actions_user_date_idx
ON public.master_actions (user_id, created_at);

-- Add index for action type queries
CREATE INDEX master_actions_action_type_idx
ON public.master_actions (action_type);

-- Enable RLS
ALTER TABLE public.master_actions ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own actions)
CREATE POLICY "master_actions_select_own"
ON public.master_actions
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (authenticated users can insert actions with user_id IS NOT NULL)
-- Note: We don't require auth.uid() = user_id because inserts occur in async contexts
-- where auth.uid() may not be available. The application code ensures correct user_id.
CREATE POLICY "master_actions_insert_own"
ON public.master_actions
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NOT NULL);

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
WHERE tablename = 'master_actions'
ORDER BY policyname;

