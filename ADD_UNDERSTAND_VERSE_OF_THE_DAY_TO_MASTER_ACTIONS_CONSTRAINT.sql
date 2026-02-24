-- =====================================================
-- Add 'understand_verse_of_the_day' to master_actions CHECK constraint
-- =====================================================
-- PURPOSE: Allow logging of 'Understand This Verse' clicks in master_actions
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Drop the existing CHECK constraint
ALTER TABLE public.master_actions
DROP CONSTRAINT IF EXISTS master_actions_action_type_check;

-- Step 2: Recreate the constraint with all action types currently in use
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
  'chapter_notes_viewed',
  'understand_verse_of_the_day',
  -- Add all action types found in your data:
  'devotional_day_viewed',
  'keyword_viewed',
  'note_started',
  'person_viewed',
  'place_viewed',
  'trivia_started',
  'bible_in_one_year_day_viewed'
));

-- Step 3: (Optional) Verify no rows violate the new constraint
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
  'chapter_notes_viewed',
  'understand_verse_of_the_day',
  'devotional_day_viewed',
  'keyword_viewed',
  'note_started',
  'person_viewed',
  'place_viewed',
  'trivia_started',
  'bible_in_one_year_day_viewed'
)
GROUP BY action_type;
