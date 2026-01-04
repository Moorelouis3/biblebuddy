-- =====================================================
-- ENFORCE UNIQUE CONSTRAINT ON (book, chapter) FOR bible_notes
-- =====================================================
-- 
-- PURPOSE: Guarantee exactly one row per (book, chapter) combination
-- This makes bible_notes a true shared cache of canonical Bible study notes
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Clean up any existing duplicates (keep most recent)
-- Only run this if you have duplicates
DELETE FROM public.bible_notes
WHERE id NOT IN (
  SELECT DISTINCT ON (book, chapter) id
  FROM public.bible_notes
  ORDER BY book, chapter, created_at DESC
);

-- Step 2: Add unique constraint (will fail if duplicates still exist)
ALTER TABLE public.bible_notes
ADD CONSTRAINT bible_notes_book_chapter_unique 
UNIQUE (book, chapter);

-- Verification: Check that constraint was added
SELECT
    conname AS constraint_name,
    contype AS constraint_type
FROM pg_constraint
WHERE conrelid = 'public.bible_notes'::regclass
  AND conname = 'bible_notes_book_chapter_unique';

