-- =====================================================
-- Add Admin SELECT policy for master_actions
-- =====================================================
--
-- PROBLEM: Current SELECT policy only allows users to see their own actions.
-- Admin analytics page needs to see ALL actions from ALL users.
--
-- SOLUTION: Add a policy that allows the admin email to see all rows.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add admin SELECT policy (admin can see ALL actions)
-- Replace 'moorelouis3@gmail.com' with your admin email if different
CREATE POLICY "master_actions_admin_select_all"
ON public.master_actions
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

-- Verification: Check that policy was created
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

