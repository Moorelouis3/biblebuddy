-- =====================================================
-- Create places_progress table with RLS policies
-- =====================================================
--
-- PURPOSE: Track which places each user has marked as finished
-- User-specific completion tracking for Places in the Bible
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.places_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_name text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint (one completion per user per place)
CREATE UNIQUE INDEX places_progress_user_place_unique
ON public.places_progress (user_id, lower(place_name));

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.places_progress
ADD CONSTRAINT places_progress_user_place_constraint UNIQUE (user_id, place_name);

-- Enable RLS
ALTER TABLE public.places_progress ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own progress)
CREATE POLICY "places_progress_select_own"
ON public.places_progress
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (users can only insert their own progress)
CREATE POLICY "places_progress_insert_own"
ON public.places_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- DELETE policy (users can only delete their own progress)
CREATE POLICY "places_progress_delete_own"
ON public.places_progress
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
WHERE tablename = 'places_progress'
ORDER BY policyname;

