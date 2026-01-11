-- =====================================================
-- Safely update master_actions CHECK constraint to include devotional_day_completed
-- =====================================================
-- 
-- PURPOSE: Add 'devotional_day_completed' to the existing CHECK constraint
-- This migration safely preserves all existing action types and adds the new one.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: First, check what action_type values currently exist in the table
-- (This helps us understand what the constraint needs to allow)
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

-- Step 3: Drop the existing CHECK constraint (this is safe - it doesn't delete data)
ALTER TABLE public.master_actions
DROP CONSTRAINT IF EXISTS master_actions_action_type_check;

-- Step 4: Recreate the constraint with ALL existing action types PLUS devotional_day_completed
-- This list includes all action types that are used in the application code:
-- - Original: user_login, chapter_completed, note_created, person_learned, place_discovered, keyword_mastered
-- - Added later: user_signup, book_completed
-- - New: devotional_day_completed
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

-- Step 5: Verification - Check that constraint was updated successfully
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

-- Step 6: Verification - Ensure no existing rows violate the new constraint
-- (This should return 0 rows if everything is correct)
SELECT action_type, COUNT(*) as count
FROM public.master_actions
WHERE action_type NOT IN (
  'user_login',
  'user_signup',
  'chapter_completed',
  'book_completed',
  'note_created',
  'person_learned',
  'place_discovered',
  'keyword_mastered',
  'devotional_day_completed'
)
GROUP BY action_type;

