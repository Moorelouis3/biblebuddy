-- =====================================================
-- Fix RLS INSERT Policy for bible_notes table
-- =====================================================
-- 
-- ISSUE: RLS is enabled but there is NO INSERT policy allowing new rows
-- RESULT: "new row violates row-level security policy for table bible_notes"
--
-- SOLUTION: Add INSERT policy that allows authenticated users to insert
--
-- =====================================================
-- STEP 1: Ensure RLS is enabled (should already be enabled)
-- =====================================================
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: Drop any existing INSERT policy that might conflict
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.bible_notes;
DROP POLICY IF EXISTS "Users can insert their own bible_notes" ON public.bible_notes;

-- =====================================================
-- STEP 3: Create the INSERT policy
-- =====================================================
CREATE POLICY "Allow authenticated inserts"
ON public.bible_notes
FOR INSERT
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This policy allows any authenticated user to insert rows
-- 2. The table does NOT have a user_id column - notes are global per (book, chapter)
-- 3. Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- 4. After running, inserts should work correctly

