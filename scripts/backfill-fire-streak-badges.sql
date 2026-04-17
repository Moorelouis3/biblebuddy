with activity_days as (
  select
    ma.user_id,
    timezone('America/New_York', ma.created_at)::date as active_day
  from public.master_actions ma
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
  from public.app_logins al
),
distinct_days as (
  select distinct user_id, active_day
  from activity_days
),
ordered_days as (
  select
    user_id,
    active_day,
    row_number() over (
      partition by user_id
      order by active_day desc
    ) as rn
  from distinct_days
  where active_day <= timezone('America/New_York', now())::date
),
anchors as (
  select
    dd.user_id,
    case
      when exists (
        select 1
        from distinct_days today_days
        where today_days.user_id = dd.user_id
          and today_days.active_day = timezone('America/New_York', now())::date
      ) then timezone('America/New_York', now())::date
      when exists (
        select 1
        from distinct_days yesterday_days
        where yesterday_days.user_id = dd.user_id
          and yesterday_days.active_day = timezone('America/New_York', now())::date - interval '1 day'
      ) then (timezone('America/New_York', now())::date - interval '1 day')::date
      else null
    end as anchor_day
  from distinct_days dd
  group by dd.user_id
),
streak_rows as (
  select
    od.user_id,
    od.active_day,
    od.rn,
    (a.anchor_day - ((od.rn - 1) * interval '1 day'))::date as expected_day
  from ordered_days
  join anchors a on a.user_id = od.user_id
  where a.anchor_day is not null
),
current_streaks as (
  select
    user_id,
    count(*)::int as live_current_streak
  from streak_rows
  where active_day = expected_day
  group by user_id
),
updates as (
  select
    ps.user_id,
    coalesce(cs.live_current_streak, 0) as current_streak,
    (coalesce(cs.live_current_streak, 0) >= 30) as has_fire_streak_badge,
    case
      when coalesce(cs.live_current_streak, 0) >= 30
        then coalesce(ps.fire_streak_awarded_at, now())
      else null
    end as fire_streak_awarded_at,
    now() as fire_streak_last_checked_at,
    now() as updated_at
  from public.profile_stats ps
  left join current_streaks cs on cs.user_id = ps.user_id
)
update public.profile_stats ps
set
  current_streak = updates.current_streak,
  has_fire_streak_badge = updates.has_fire_streak_badge,
  fire_streak_awarded_at = updates.fire_streak_awarded_at,
  fire_streak_last_checked_at = updates.fire_streak_last_checked_at,
  updated_at = updates.updated_at
from updates
where ps.user_id = updates.user_id;
