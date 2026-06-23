alter table public.profile_stats
  add column if not exists pro_expires_at timestamptz null;

create index if not exists profile_stats_pro_expires_at_idx
  on public.profile_stats (pro_expires_at);
