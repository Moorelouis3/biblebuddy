-- =====================================================
-- Update master_actions action_type CHECK constraint
-- =====================================================
--
-- PURPOSE: Add missing action types to the constraint
-- The constraint currently only allows:
--   'user_login', 'chapter_completed', 'note_created',
--   'person_learned', 'place_discovered', 'keyword_mastered'
--
-- We need to add:
--   'user_signup', 'book_completed', 'devotional_day_completed',
--   'reading_plan_chapter_completed'
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop the existing constraint
ALTER TABLE public.master_actions
DROP CONSTRAINT IF EXISTS master_actions_action_type_check;

-- Recreate the constraint with all action types
ALTER TABLE public.master_actions
ADD CONSTRAINT master_actions_action_type_check
CHECK (action_type IN (
  'user_signup',
  'user_login',
  'chapter_completed',
  'book_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered',
  'devotional_day_completed',
  'reading_plan_chapter_completed'
));

-- Verification: Check that constraint was updated
SELECT
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

