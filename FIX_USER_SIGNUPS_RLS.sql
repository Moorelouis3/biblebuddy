-- Fix RLS for user_signups table to allow INSERTs during signup
-- This allows authenticated users to insert their own signup record

-- Ensure RLS is enabled
ALTER TABLE public.user_signups ENABLE ROW LEVEL SECURITY;

-- Drop existing SELECT policy if it exists (to recreate it)
DROP POLICY IF EXISTS user_signups_select_all ON public.user_signups;

-- Allow INSERT for authenticated users (they can insert their own signup)
CREATE POLICY user_signups_insert_own
ON public.user_signups
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow SELECT for analytics (all authenticated users can read signup counts)
CREATE POLICY user_signups_select_all
ON public.user_signups
FOR SELECT
USING (true);

