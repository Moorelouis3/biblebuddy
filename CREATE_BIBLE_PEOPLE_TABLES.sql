-- =====================================================
-- Create tables for People in the Bible feature
-- =====================================================
-- 
-- This matches the architectural pattern of bible_notes
-- Run this in Supabase SQL Editor
-- =====================================================

-- Table 1: bible_people
-- Stores canonical list of biblical people (names only initially)
CREATE TABLE IF NOT EXISTS public.bible_people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL, -- lowercase, for searching
  testament TEXT, -- 'Old' or 'New' (optional)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for normalized_name (for search)
CREATE INDEX IF NOT EXISTS idx_bible_people_normalized_name ON public.bible_people(normalized_name);

-- Table 2: bible_people_notes
-- Stores generated notes for each person (cached, generated once)
CREATE TABLE IF NOT EXISTS public.bible_people_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES public.bible_people(id) ON DELETE CASCADE,
  notes_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(person_id) -- One set of notes per person
);

-- Enable RLS
ALTER TABLE public.bible_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_people_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bible_people (read-only for all, insert/update for service_role)
CREATE POLICY "bible_people_select_authenticated"
ON public.bible_people
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "bible_people_select_anon"
ON public.bible_people
FOR SELECT
TO anon
USING (true);

CREATE POLICY "bible_people_insert_service_role"
ON public.bible_people
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "bible_people_update_service_role"
ON public.bible_people
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- RLS Policies for bible_people_notes (read for all, insert/update for service_role)
CREATE POLICY "bible_people_notes_select_authenticated"
ON public.bible_people_notes
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "bible_people_notes_select_anon"
ON public.bible_people_notes
FOR SELECT
TO anon
USING (true);

CREATE POLICY "bible_people_notes_insert_service_role"
ON public.bible_people_notes
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "bible_people_notes_update_service_role"
ON public.bible_people_notes
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Verification
SELECT
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('bible_people', 'bible_people_notes')
ORDER BY tablename, policyname;

