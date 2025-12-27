-- =====================================================
-- Supabase RLS Policy for bible_notes table
-- =====================================================
-- 
-- STEP 1: Ensure bible_notes table has user_id column
-- Run this in Supabase SQL Editor if the column doesn't exist:
-- 
-- ALTER TABLE bible_notes 
-- ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
--
-- =====================================================
-- STEP 2: Enable RLS on bible_notes table (if not already enabled)
-- =====================================================
ALTER TABLE bible_notes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: INSERT Policy - Allow users to insert their own rows
-- =====================================================
CREATE POLICY "Users can insert their own bible_notes"
ON bible_notes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- STEP 4: SELECT Policy - Allow users to read their own notes
-- =====================================================
CREATE POLICY "Users can read their own bible_notes"
ON bible_notes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- =====================================================
-- STEP 5: UPDATE Policy - Allow users to update their own notes
-- =====================================================
CREATE POLICY "Users can update their own bible_notes"
ON bible_notes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- STEP 6: DELETE Policy (optional) - Allow users to delete their own notes
-- =====================================================
CREATE POLICY "Users can delete their own bible_notes"
ON bible_notes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. If policies already exist, you may need to drop them first:
--    DROP POLICY IF EXISTS "Users can insert their own bible_notes" ON bible_notes;
--    DROP POLICY IF EXISTS "Users can read their own bible_notes" ON bible_notes;
--    DROP POLICY IF EXISTS "Users can update their own bible_notes" ON bible_notes;
--    DROP POLICY IF EXISTS "Users can delete their own bible_notes" ON bible_notes;
--
-- 2. The INSERT policy requires that user_id matches auth.uid() at insert time
-- 3. The code now includes user_id in all INSERT operations
-- 4. Make sure to run these in the Supabase SQL Editor in your project dashboard

