-- Weekly Bible Report analytics / reset helpers
-- This script helps answer:
-- 1. How many users did at least 1 action in the last 7 days?
-- 2. Which of those users already got this week's weekly Bible report?
-- 3. How can we clear this week's send log so the new version can send again?

-- Current week key (Monday-based, same logic the app uses)
with current_week as (
  select (
    date_trunc('day', now() at time zone 'utc')
    - (((extract(dow from now() at time zone 'utc')::int + 6) % 7) * interval '1 day')
  )::date as week_start
),
active_last_7d as (
  select
    ma.user_id,
    count(*) as actions_last_7d,
    max(ma.created_at) as last_action_at
  from public.master_actions ma
  where ma.created_at >= now() - interval '7 days'
    and ma.user_id is not null
  group by ma.user_id
),
sent_this_week as (
  select
    w.user_id,
    w.sent_at
  from public.weekly_bible_report_sent w
  join current_week cw
    on w.week_key = to_char(cw.week_start, 'YYYY-MM-DD')
)
select
  count(*) as active_users_last_7d,
  count(sent_this_week.user_id) as reports_sent_this_week,
  count(*) - count(sent_this_week.user_id) as active_users_not_sent_yet,
  coalesce(sum(active_last_7d.actions_last_7d), 0) as total_actions_last_7d
from active_last_7d
left join sent_this_week on sent_this_week.user_id = active_last_7d.user_id;


-- Detailed recipient table for this week
with current_week as (
  select (
    date_trunc('day', now() at time zone 'utc')
    - (((extract(dow from now() at time zone 'utc')::int + 6) % 7) * interval '1 day')
  )::date as week_start
),
active_last_7d as (
  select
    ma.user_id,
    count(*) as actions_last_7d,
    max(ma.created_at) as last_action_at
  from public.master_actions ma
  where ma.created_at >= now() - interval '7 days'
    and ma.user_id is not null
  group by ma.user_id
),
sent_this_week as (
  select
    w.user_id,
    w.sent_at
  from public.weekly_bible_report_sent w
  join current_week cw
    on w.week_key = to_char(cw.week_start, 'YYYY-MM-DD')
)
select
  a.user_id,
  coalesce(p.display_name, p.username, 'Unknown User') as display_name,
  p.username,
  p.current_level,
  p.is_paid,
  a.actions_last_7d,
  a.last_action_at,
  s.sent_at,
  case when s.user_id is null then 'not_sent' else 'sent' end as weekly_report_status
from active_last_7d a
left join public.profile_stats p on p.user_id = a.user_id
left join sent_this_week s on s.user_id = a.user_id
order by s.sent_at desc nulls last, a.last_action_at desc;


-- Reset only this week's send-log.
-- Use this if you want the cron/manual route to send the NEW version again.
-- Important: this does NOT delete the old DM from the user's conversation.
with current_week as (
  select (
    date_trunc('day', now() at time zone 'utc')
    - (((extract(dow from now() at time zone 'utc')::int + 6) % 7) * interval '1 day')
  )::date as week_start
)
delete from public.weekly_bible_report_sent
where week_key = (
  select to_char(week_start, 'YYYY-MM-DD')
  from current_week
);


-- Optional harder reset:
-- Delete this week's weekly wrap-up DMs + notifications + send log.
-- Only use this if you truly want to wipe the old weekly report message before resending.
-- Update the sender_id if your Louis account changes.
--
-- with current_week as (
--   select (
--     date_trunc('day', now() at time zone 'utc')
--     - (((extract(dow from now() at time zone 'utc')::int + 6) % 7) * interval '1 day')
--   )::date as week_start
-- ),
-- target_messages as (
--   select m.id, m.conversation_id
--   from public.messages m
--   join current_week cw on true
--   where m.sender_id = '669d4404-5eee-49ee-a112-2ecbd573e22a'
--     and m.created_at >= cw.week_start
--     and m.content ilike '%Here is your personal Bible Buddy wrap-up for this week.%'
-- )
-- delete from public.notifications
-- where type = 'direct_message'
--   and from_user_id = '669d4404-5eee-49ee-a112-2ecbd573e22a'
--   and message ilike '%Bible Buddy wrap-up%';
--
-- delete from public.messages
-- where id in (select id from target_messages);
--
-- with current_week as (
--   select (
--     date_trunc('day', now() at time zone 'utc')
--     - (((extract(dow from now() at time zone 'utc')::int + 6) % 7) * interval '1 day')
--   )::date as week_start
-- )
-- delete from public.weekly_bible_report_sent
-- where week_key = (
--   select to_char(week_start, 'YYYY-MM-DD')
--   from current_week
-- );
