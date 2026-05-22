do $$
declare
  constraint_name text;
begin
  select con.conname
  into constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  join pg_namespace nsp on nsp.oid = con.connamespace
  where nsp.nspname = 'public'
    and rel.relname = 'master_actions'
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%action_type%';

  if constraint_name is not null then
    execute format('alter table public.master_actions drop constraint %I', constraint_name);
  end if;
end $$;

alter table public.master_actions
add constraint master_actions_action_type_check
check (
  action_type in (
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
    'bible_in_one_year_reading_completed',
    'bible_in_one_year_trivia_completed',
    'bible_in_one_year_reflection_completed',
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
    'trivia_question_correct',
    'trivia_chapter_completed',
    'trivia_started',
    'user_login',
    'user_signup',
    'user_upgraded',
    'chapter_notes_viewed',
    'chapter_notes_reviewed',
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
    'series_week_notes_opened',
    'study_group_feed_viewed',
    'study_group_article_opened',
    'study_group_bible_study_card_opened',
    'bible_buddy_tv_viewed',
    'bible_buddy_tv_title_opened',
    'bible_buddy_tv_video_started',
    'bible_topic_lesson_completed',
    'louis_opened',
    'louis_user_message_sent',
    'louis_ai_message_sent',
    'louis_daily_message_shown',
    'louis_route_handoff_shown',
    'louis_daily_task_bonus',
    'referral_signup_reward',
    'badge_earned'
  )
);
