-- =====================================================
-- Create bible_people_notes table with RLS policies
-- =====================================================
--
-- PURPOSE: Universal cache for People in the Bible notes
-- Similar to bible_notes, but keyed by person_name instead of book+chapter
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.bible_people_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_name text NOT NULL,
  notes_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint (critical for preventing duplicate generations)
-- Create unique index for case-insensitive matching
CREATE UNIQUE INDEX bible_people_notes_person_unique
ON public.bible_people_notes (lower(person_name));

-- Add unique constraint on person_name for upsert conflict detection
ALTER TABLE public.bible_people_notes
ADD CONSTRAINT bible_people_notes_person_name_unique UNIQUE (person_name);

-- Enable RLS
ALTER TABLE public.bible_people_notes ENABLE ROW LEVEL SECURITY;

-- SELECT policy (public read, like bible_notes)
CREATE POLICY "bible_people_notes_select_all"
ON public.bible_people_notes
FOR SELECT
USING (true);

-- INSERT policy for anon (same as bible_notes)
CREATE POLICY "bible_people_notes_insert_anon"
ON public.bible_people_notes
FOR INSERT
TO anon
WITH CHECK (true);

-- INSERT policy for authenticated (same as bible_notes)
CREATE POLICY "bible_people_notes_insert_authenticated"
ON public.bible_people_notes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE policy for authenticated
CREATE POLICY "bible_people_notes_update_authenticated"
ON public.bible_people_notes
FOR UPDATE
TO authenticated
USING (true);

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
WHERE tablename = 'bible_people_notes'
ORDER BY policyname;
