alter table public.profile_stats
  add column if not exists grace_days_count integer not null default 0,
  add column if not exists last_grace_day_earned_at date,
  add column if not exists grace_days_used_count integer not null default 0;

with earned as (
  select
    user_id,
    least(5, floor(greatest(coalesce(current_streak, 0), 0)::numeric / 7))::int as earned_grace_days
  from public.profile_stats
  where coalesce(current_streak, 0) >= 7
),
updates as (
  select
    ps.user_id,
    greatest(coalesce(ps.grace_days_count, 0), earned.earned_grace_days)::int as next_grace_days
  from public.profile_stats ps
  join earned on earned.user_id = ps.user_id
  where greatest(coalesce(ps.grace_days_count, 0), earned.earned_grace_days) <> coalesce(ps.grace_days_count, 0)
)
update public.profile_stats ps
set
  grace_days_count = updates.next_grace_days,
  last_grace_day_earned_at = timezone('America/New_York', now())::date,
  updated_at = now()
from updates
where ps.user_id = updates.user_id;
