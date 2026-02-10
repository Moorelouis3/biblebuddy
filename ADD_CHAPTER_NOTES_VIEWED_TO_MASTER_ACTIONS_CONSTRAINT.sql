-- =====================================================
-- Safely update master_actions CHECK constraint to include chapter_notes_viewed
-- =====================================================
--
-- PURPOSE: Add 'chapter_notes_viewed' to the existing CHECK constraint
-- This migration preserves existing action types and adds the new one.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Check current action_type values in the table
SELECT DISTINCT action_type
FROM public.master_actions
ORDER BY action_type;

-- Step 2: Check the current constraint definition
SELECT
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

-- Step 3: Drop the existing CHECK constraint (safe - does not delete data)
ALTER TABLE public.master_actions
DROP CONSTRAINT IF EXISTS master_actions_action_type_check;

-- Step 4: Recreate the constraint with ALL known action types plus chapter_notes_viewed
ALTER TABLE public.master_actions
ADD CONSTRAINT master_actions_action_type_check
CHECK (action_type IN (
  'user_login',
  'user_signup',
  'chapter_completed',
  'reading_plan_chapter_completed',
  'book_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered',
  'devotional_day_completed',
  'trivia_question_answered',
  'study_view',
  'chapter_notes_viewed'
));

-- Step 5: Verification - Check that constraint was updated successfully
SELECT
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

-- Step 6: Verification - Ensure no existing rows violate the new constraint
SELECT action_type, COUNT(*) as count
FROM public.master_actions
WHERE action_type NOT IN (
  'user_login',
  'user_signup',
  'chapter_completed',
  'reading_plan_chapter_completed',
  'book_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered',
  'devotional_day_completed',
  'trivia_question_answered',
  'study_view',
  'chapter_notes_viewed'
)
GROUP BY action_type;
