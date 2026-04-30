-- Replace this first
-- \set group_id 'YOUR_GROUP_ID_HERE'

with approved_members as (
  select gm.user_id
  from group_members gm
  where gm.group_id = :'group_id'
    and gm.status = 'approved'
),
activity_days as (
  select
    ma.user_id,
    timezone('America/New_York', ma.created_at)::date as active_day
  from master_actions ma
  join approved_members am on am.user_id = ma.user_id
  where ma.action_type in (
    'user_login',
    'chapter_completed',
    'book_completed',
    'bible_in_one_year_day_viewed',
    'devotional_day_completed',
    'devotional_day_started',
    'devotional_day_viewed',
    'person_learned',
    'person_viewed',
    'place_discovered',
    'place_viewed',
    'keyword_mastered',
    'keyword_viewed',
    'note_created',
    'note_started',
    'reading_plan_chapter_completed',
    'scrambled_word_answered',
    'trivia_question_answered',
    'trivia_started',
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
  union
  select
    al.user_id,
    timezone('America/New_York', al.created_at)::date as active_day
  from app_logins al
  join approved_members am on am.user_id = al.user_id
),
distinct_days as (
  select distinct user_id, active_day
  from activity_days
),
anchored as (
  select
    dd.user_id,
    dd.active_day,
    current_date - dd.active_day as day_offset
  from distinct_days dd
  where dd.active_day <= current_date
),
current_streaks as (
  select
    a.user_id,
    count(*)::int as live_current_streak
  from anchored a
  where not exists (
    select 1
    from anchored missing
    where missing.user_id = a.user_id
      and missing.day_offset < a.day_offset
      and missing.day_offset >= 0
      and not exists (
        select 1
        from anchored present
        where present.user_id = a.user_id
          and present.day_offset = missing.day_offset
      )
  )
    and a.day_offset >= 0
  group by a.user_id
)
select
  ps.user_id,
  coalesce(ps.display_name, ps.username, 'Buddy') as name,
  coalesce(cs.live_current_streak, 0) as live_current_streak,
  coalesce(ps.current_streak, 0) as stored_current_streak,
  ps.current_level,
  ps.last_active_date
from approved_members am
left join profile_stats ps on ps.user_id = am.user_id
left join current_streaks cs on cs.user_id = am.user_id
where coalesce(cs.live_current_streak, 0) >= 30
order by coalesce(cs.live_current_streak, 0) desc, name asc;
