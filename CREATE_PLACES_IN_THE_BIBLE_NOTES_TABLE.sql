-- =====================================================
-- Create places_in_the_bible_notes table with RLS policies
-- =====================================================
--
-- PURPOSE: Universal cache for Places in the Bible notes
-- Similar to bible_notes and bible_people_notes, but keyed by normalized_place
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.places_in_the_bible_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place text NOT NULL,
  normalized_place text NOT NULL,
  notes_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint on normalized_place (critical for preventing duplicate generations)
CREATE UNIQUE INDEX places_in_the_bible_notes_normalized_place_unique
ON public.places_in_the_bible_notes (normalized_place);

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.places_in_the_bible_notes
ADD CONSTRAINT places_in_the_bible_notes_normalized_place_constraint UNIQUE (normalized_place);

-- Enable RLS
ALTER TABLE public.places_in_the_bible_notes ENABLE ROW LEVEL SECURITY;

-- SELECT policy (public read, like bible_notes)
CREATE POLICY "places_in_the_bible_notes_select_all"
ON public.places_in_the_bible_notes
FOR SELECT
USING (true);

-- INSERT policy for anon (same as bible_notes)
CREATE POLICY "places_in_the_bible_notes_insert_anon"
ON public.places_in_the_bible_notes
FOR INSERT
TO anon
WITH CHECK (true);

-- INSERT policy for authenticated (same as bible_notes)
CREATE POLICY "places_in_the_bible_notes_insert_authenticated"
ON public.places_in_the_bible_notes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE policy for authenticated
CREATE POLICY "places_in_the_bible_notes_update_authenticated"
ON public.places_in_the_bible_notes
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
WHERE tablename = 'places_in_the_bible_notes'
ORDER BY policyname;

