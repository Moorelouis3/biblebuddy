-- =====================================================
-- Add 'devotional_day_completed' to master_actions CHECK constraint
-- =====================================================
-- 
-- PURPOSE: Allow devotional_day_completed action type in master_actions table
-- This action type is already being logged in the application code but was
-- being rejected by the CHECK constraint on action_type column.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop the existing CHECK constraint
ALTER TABLE public.master_actions
DROP CONSTRAINT IF EXISTS master_actions_action_type_check;

-- Recreate the constraint with all valid action types including devotional_day_completed
ALTER TABLE public.master_actions
ADD CONSTRAINT master_actions_action_type_check
CHECK (action_type IN (
  'user_login',
  'user_signup',
  'chapter_completed',
  'book_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered',
  'devotional_day_completed'
));

-- Verification: Check that constraint was updated
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

