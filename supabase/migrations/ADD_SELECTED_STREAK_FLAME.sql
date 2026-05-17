alter table public.profile_stats
  add column if not exists selected_streak_flame text not null default 'default';
