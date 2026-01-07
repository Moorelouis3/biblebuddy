-- =====================================================
-- Update user_feedback table
-- =====================================================
-- Add discovery_source column and fix RLS policies
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add discovery_source column if it doesn't exist
ALTER TABLE public.user_feedback
ADD COLUMN IF NOT EXISTS discovery_source text;

-- Ensure username column exists (it should already exist, but adding IF NOT EXISTS for safety)
ALTER TABLE public.user_feedback
ADD COLUMN IF NOT EXISTS username text;

-- Enable RLS (if not already enabled)
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to recreate them correctly)
DROP POLICY IF EXISTS "user_feedback_insert_own" ON public.user_feedback;
DROP POLICY IF EXISTS "user_feedback_select_own" ON public.user_feedback;
DROP POLICY IF EXISTS "user_feedback_admin_select_all" ON public.user_feedback;
DROP POLICY IF EXISTS "user_feedback_update_own" ON public.user_feedback;

-- INSERT policy (user can insert their own feedback)
CREATE POLICY "user_feedback_insert_own"
ON public.user_feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- SELECT policy (user can read their own feedback)
CREATE POLICY "user_feedback_select_own"
ON public.user_feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- SELECT policy (admin / service role can read all)
CREATE POLICY "user_feedback_admin_select_all"
ON public.user_feedback
FOR SELECT
TO service_role
USING (true);

-- Also allow admin email to read all (for authenticated admin)
CREATE POLICY "user_feedback_admin_select_by_email"
ON public.user_feedback
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

-- Note: UPDATE and DELETE are intentionally NOT allowed
-- Feedback is immutable once submitted

