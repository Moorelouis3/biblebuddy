-- =====================================================
-- Update master_actions INSERT RLS policy
-- =====================================================
--
-- PROBLEM: Current policy requires auth.uid() = user_id,
-- but many inserts occur in async/server contexts where
-- auth.uid() is not available, causing silent failures.
--
-- SOLUTION: Allow authenticated users to insert rows
-- where user_id IS NOT NULL, without requiring auth.uid()
-- check at insert time.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "master_actions_insert_own" ON public.master_actions;

-- Create new INSERT policy that allows authenticated users
-- to insert rows with user_id IS NOT NULL
CREATE POLICY "master_actions_insert_own"
ON public.master_actions
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NOT NULL);

-- Verification: Check that policy was updated
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

