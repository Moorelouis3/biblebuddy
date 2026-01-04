-- =====================================================
-- Create keywords_in_the_bible table with RLS policies
-- =====================================================
--
-- PURPOSE: Universal cache for Keywords in the Bible notes
-- Similar to bible_notes, bible_people_notes, and places_in_the_bible_notes
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.keywords_in_the_bible (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  notes_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint on keyword (critical for preventing duplicate generations)
CREATE UNIQUE INDEX keywords_in_the_bible_keyword_unique
ON public.keywords_in_the_bible (lower(keyword));

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.keywords_in_the_bible
ADD CONSTRAINT keywords_in_the_bible_keyword_constraint UNIQUE (keyword);

-- Enable RLS
ALTER TABLE public.keywords_in_the_bible ENABLE ROW LEVEL SECURITY;

-- SELECT policy (public read, like bible_notes)
CREATE POLICY "keywords_in_the_bible_select_all"
ON public.keywords_in_the_bible
FOR SELECT
USING (true);

-- INSERT policy for anon (same as bible_notes)
CREATE POLICY "keywords_in_the_bible_insert_anon"
ON public.keywords_in_the_bible
FOR INSERT
TO anon
WITH CHECK (true);

-- INSERT policy for authenticated (same as bible_notes)
CREATE POLICY "keywords_in_the_bible_insert_authenticated"
ON public.keywords_in_the_bible
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE policy for authenticated
CREATE POLICY "keywords_in_the_bible_update_authenticated"
ON public.keywords_in_the_bible
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
WHERE tablename = 'keywords_in_the_bible'
ORDER BY policyname;

