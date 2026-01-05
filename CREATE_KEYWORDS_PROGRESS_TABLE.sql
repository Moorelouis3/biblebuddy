-- =====================================================
-- Create keywords_progress table with RLS policies
-- =====================================================
--
-- PURPOSE: Track which keywords each user has marked as finished
-- User-specific completion tracking for Keywords in the Bible
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.keywords_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  keyword_name text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint (one completion per user per keyword)
CREATE UNIQUE INDEX keywords_progress_user_keyword_unique
ON public.keywords_progress (user_id, lower(keyword_name));

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.keywords_progress
ADD CONSTRAINT keywords_progress_user_keyword_constraint UNIQUE (user_id, keyword_name);

-- Enable RLS
ALTER TABLE public.keywords_progress ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own progress)
CREATE POLICY "keywords_progress_select_own"
ON public.keywords_progress
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (users can only insert their own progress)
CREATE POLICY "keywords_progress_insert_own"
ON public.keywords_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- DELETE policy (users can only delete their own progress)
CREATE POLICY "keywords_progress_delete_own"
ON public.keywords_progress
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
WHERE tablename = 'keywords_progress'
ORDER BY policyname;

