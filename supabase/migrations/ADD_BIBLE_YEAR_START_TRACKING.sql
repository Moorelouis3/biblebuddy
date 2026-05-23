alter table public.profile_stats
  add column if not exists bible_year_started_at date,
  add column if not exists bible_year_launch_seen_at timestamptz;

create index if not exists profile_stats_bible_year_started_at_idx
  on public.profile_stats (bible_year_started_at);

create index if not exists profile_stats_bible_year_launch_seen_at_idx
  on public.profile_stats (bible_year_launch_seen_at);
