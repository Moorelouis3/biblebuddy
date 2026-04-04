-- Run this in the Supabase SQL editor.
-- It updates the master_actions action_type check constraint
-- so the new navigation tracking rows are accepted by the database.

DO $$
DECLARE
  constraint_name text;
BEGIN
  SELECT con.conname
  INTO constraint_name
  FROM pg_constraint con
  JOIN pg_class rel
    ON rel.oid = con.conrelid
  JOIN pg_namespace nsp
    ON nsp.oid = con.connamespace
  WHERE nsp.nspname = 'public'
    AND rel.relname = 'master_actions'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%action_type%';

  IF constraint_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.master_actions DROP CONSTRAINT %I', constraint_name);
  END IF;
END $$;

ALTER TABLE public.master_actions
ADD CONSTRAINT master_actions_action_type_check
CHECK (
  action_type IN (
    'guided_studies_viewed',
    'guided_study_tool_opened',
    'devotionals_viewed',
    'devotional_opened',
    'devotional_day_opened',
    'devotional_bible_reading_opened',
    'devotional_reflection_saved',
    'reading_plans_viewed',
    'reading_plan_opened',
    'reading_plan_day_opened',
    'reading_plan_chapter_opened',
    'bible_study_games_viewed',
    'bible_game_opened',
    'trivia_hub_viewed',
    'trivia_category_opened',
    'trivia_pack_opened',
    'scrambled_hub_viewed',
    'scrambled_category_opened',
    'scrambled_books_viewed',
    'scrambled_book_opened',
    'scrambled_book_viewed',
    'scrambled_chapter_opened',
    'scrambled_chapter_completed',
    'dashboard_viewed',
    'dashboard_card_opened',
    'invite_buddy_opened',
    'book_completed',
    'bible_in_one_year_day_viewed',
    'bible_reader_viewed',
    'bible_book_opened',
    'bible_book_viewed',
    'bible_chapter_opened',
    'bible_chapter_viewed',
    'chapter_completed',
    'devotional_day_completed',
    'devotional_day_started',
    'devotional_day_viewed',
    'keyword_mastered',
    'keyword_viewed',
    'note_started',
    'note_created',
    'person_viewed',
    'person_learned',
    'place_discovered',
    'place_viewed',
    'reading_plan_chapter_completed',
    'scrambled_word_answered',
    'trivia_question_answered',
    'trivia_started',
    'user_login',
    'user_signup',
    'user_upgraded',
    'chapter_notes_viewed',
    'verse_highlighted',
    'understand_verse_of_the_day',
    'feed_post_thought',
    'feed_post_prayer',
    'feed_post_prayer_request',
    'feed_post_photo',
    'feed_post_video',
    'feed_post_liked',
    'feed_post_commented',
    'feed_post_replied',
    'buddy_added',
    'group_message_sent',
    'series_week_started',
    'study_group_feed_viewed',
    'study_group_article_opened',
    'study_group_bible_study_card_opened'
  )
);
