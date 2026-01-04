-- =====================================================
-- Fix RLS Policies for bible_chapters table
-- =====================================================
-- 
-- PURPOSE: Allow reads for all users, inserts for authenticated users
-- This table is a shared cache of universal Bible chapter content
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable RLS if not already enabled
ALTER TABLE public.bible_chapters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "bible_chapters_select_all" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_select_authenticated" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_select_anon" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_insert_authenticated" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_insert_service_role" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_update_authenticated" ON public.bible_chapters;
DROP POLICY IF EXISTS "bible_chapters_update_service_role" ON public.bible_chapters;

-- Policy 1: Allow SELECT for all authenticated users
-- This table is a shared, read-only cache - all users should be able to read
CREATE POLICY "bible_chapters_select_authenticated"
ON public.bible_chapters
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Allow SELECT for anon users (shared cache, no authentication required to read)
CREATE POLICY "bible_chapters_select_anon"
ON public.bible_chapters
FOR SELECT
TO anon
USING (true);

-- Policy 3: Allow INSERT for authenticated users
-- Chapters are generated client-side and saved once per (book, chapter)
CREATE POLICY "bible_chapters_insert_authenticated"
ON public.bible_chapters
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 4: Allow INSERT for service_role (backup, for server-side operations)
CREATE POLICY "bible_chapters_insert_service_role"
ON public.bible_chapters
FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy 5: Allow UPDATE for authenticated users
CREATE POLICY "bible_chapters_update_authenticated"
ON public.bible_chapters
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 6: Allow UPDATE for service_role (backup, for server-side operations)
CREATE POLICY "bible_chapters_update_service_role"
ON public.bible_chapters
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

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
WHERE tablename = 'bible_chapters'
ORDER BY policyname;

