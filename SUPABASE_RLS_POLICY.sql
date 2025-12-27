-- =====================================================
-- Supabase RLS Policy for bible_notes table
-- =====================================================
-- 
-- ISSUE: RLS is enabled but there is NO INSERT policy allowing new rows
-- FIX: Add INSERT policy for authenticated users
--
-- =====================================================
-- STEP 1: Ensure RLS is enabled (should already be enabled)
-- =====================================================
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: INSERT Policy - Allow authenticated users to insert
-- =====================================================
-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.bible_notes;

-- Create the INSERT policy
-- Note: For INSERT policies, only WITH CHECK is allowed (not USING)
CREATE POLICY "Allow authenticated inserts"
ON public.bible_notes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This policy allows any authenticated user to insert rows
-- 2. The table does NOT have a user_id column - notes are global per (book, chapter)
-- 3. Run this in the Supabase SQL Editor in your project dashboard
-- 4. After running, inserts should work correctly
