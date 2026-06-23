alter table public.profile_stats
  add column if not exists bible_year_progress_backfilled_at timestamptz;

create index if not exists profile_stats_bible_year_progress_backfilled_at_idx
  on public.profile_stats (bible_year_progress_backfilled_at);
