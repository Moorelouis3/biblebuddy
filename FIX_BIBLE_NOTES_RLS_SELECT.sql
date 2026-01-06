-- =====================================================
-- Add SELECT Policy for bible_notes table (RLS)
-- =====================================================
-- 
-- PURPOSE: Ensure RLS allows SELECT queries for bible_notes
-- 
-- The bible_notes table is a shared cache - all users should be able to read
-- existing notes. This policy allows public read access.
--
-- =====================================================
-- STEP 1: Ensure RLS is enabled (should already be enabled)
-- =====================================================
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: Drop any existing SELECT policy that might conflict
-- =====================================================
DROP POLICY IF EXISTS "Allow public reads" ON public.bible_notes;
DROP POLICY IF EXISTS "Allow anon reads" ON public.bible_notes;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.bible_notes;
DROP POLICY IF EXISTS "Users can read bible_notes" ON public.bible_notes;

-- =====================================================
-- STEP 3: Create the SELECT policy for public access
-- =====================================================
-- Since bible_notes is a shared cache, allow everyone (anon and authenticated) to read
CREATE POLICY "Allow public reads"
ON public.bible_notes
FOR SELECT
TO public
USING (true);

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This policy allows anyone (anon and authenticated) to SELECT from bible_notes
-- 2. The table is a shared cache - notes are global per (book, chapter), not user-specific
-- 3. Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- 4. After running, SELECT queries should work correctly
-- 5. This works together with the INSERT policy in FIX_BIBLE_NOTES_RLS.sql



