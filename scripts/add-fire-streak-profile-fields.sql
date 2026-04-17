alter table public.profile_stats
  add column if not exists has_fire_streak_badge boolean not null default false;

alter table public.profile_stats
  add column if not exists fire_streak_awarded_at timestamptz null;

alter table public.profile_stats
  add column if not exists fire_streak_last_checked_at timestamptz null;

create index if not exists idx_profile_stats_fire_streak_badge
  on public.profile_stats (has_fire_streak_badge, current_streak desc);
