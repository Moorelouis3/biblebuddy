-- =====================================================
-- Create user_feedback table
-- =====================================================
--
-- Stores user feedback survey responses
-- Tracks dismissals and submissions
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE IF NOT EXISTS public.user_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text,
  submitted_at timestamptz DEFAULT now(),
  last_dismissed_at timestamptz,
  feedback_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint to ensure one submission per user
CREATE UNIQUE INDEX IF NOT EXISTS user_feedback_user_id_unique 
ON public.user_feedback(user_id) 
WHERE submitted_at IS NOT NULL;

-- Enable RLS
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own feedback)
CREATE POLICY "user_feedback_select_own"
ON public.user_feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- INSERT policy (users can insert their own feedback)
CREATE POLICY "user_feedback_insert_own"
ON public.user_feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE policy (users can update their own feedback)
CREATE POLICY "user_feedback_update_own"
ON public.user_feedback
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Admin SELECT policy (admin can see all feedback)
CREATE POLICY "user_feedback_admin_select_all"
ON public.user_feedback
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

