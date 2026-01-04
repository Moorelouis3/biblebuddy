-- =====================================================
-- Fix RLS Policies for bible_notes table
-- =====================================================
-- 
-- PURPOSE: Allow reads for all users, inserts only via service_role
-- This table is a shared cache of universal Bible study notes
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable RLS if not already enabled
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "bible_notes_select_all" ON public.bible_notes;
DROP POLICY IF EXISTS "bible_notes_insert_service_role" ON public.bible_notes;
DROP POLICY IF EXISTS "bible_notes_upsert_service_role" ON public.bible_notes;

-- Policy 1: Allow SELECT for all authenticated users
-- This table is a shared, read-only cache - all users should be able to read
CREATE POLICY "bible_notes_select_authenticated"
ON public.bible_notes
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Allow SELECT for anon users (shared cache, no authentication required to read)
CREATE POLICY "bible_notes_select_anon"
ON public.bible_notes
FOR SELECT
TO anon
USING (true);

-- Policy 3: Allow INSERT only for service_role
CREATE POLICY "bible_notes_insert_service_role"
ON public.bible_notes
FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy 4: Allow UPDATE only for service_role
CREATE POLICY "bible_notes_update_service_role"
ON public.bible_notes
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
WHERE tablename = 'bible_notes'
ORDER BY policyname;

