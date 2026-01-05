-- =====================================================
-- Create people_progress table with RLS policies
-- =====================================================
--
-- PURPOSE: Track which people each user has marked as finished
-- User-specific completion tracking for People in the Bible
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.people_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  person_name text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint (one completion per user per person)
CREATE UNIQUE INDEX people_progress_user_person_unique
ON public.people_progress (user_id, lower(person_name));

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.people_progress
ADD CONSTRAINT people_progress_user_person_constraint UNIQUE (user_id, person_name);

-- Enable RLS
ALTER TABLE public.people_progress ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own progress)
CREATE POLICY "people_progress_select_own"
ON public.people_progress
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (users can only insert their own progress)
CREATE POLICY "people_progress_insert_own"
ON public.people_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- DELETE policy (users can only delete their own progress)
CREATE POLICY "people_progress_delete_own"
ON public.people_progress
FOR DELETE
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
WHERE tablename = 'people_progress'
ORDER BY policyname;

