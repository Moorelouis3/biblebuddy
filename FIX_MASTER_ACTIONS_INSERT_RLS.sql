-- =====================================================
-- Fix master_actions INSERT RLS policy
-- =====================================================
--
-- PROBLEM: Current INSERT policy allows authenticated users to insert
-- rows with user_id IS NOT NULL, but doesn't verify user_id = auth.uid().
-- This may be causing issues with inserts.
--
-- SOLUTION: Update INSERT policy to require auth.uid() = user_id
-- for authenticated users inserting their own actions.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "master_actions_insert_own" ON public.master_actions;

-- Create new INSERT policy that requires auth.uid() = user_id
CREATE POLICY "master_actions_insert_own"
ON public.master_actions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

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