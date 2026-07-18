alter table public.profile_stats
  add column if not exists signup_source text,
  add column if not exists signup_source_detail text,
  add column if not exists signup_referrer_url text,
  add column if not exists signup_landing_session_id text,
  add column if not exists signup_utm_source text,
  add column if not exists signup_utm_medium text,
  add column if not exists signup_utm_campaign text,
  add column if not exists signup_source_recorded_at timestamptz;

create index if not exists profile_stats_signup_source_idx
  on public.profile_stats (signup_source);

create index if not exists profile_stats_signup_source_recorded_at_idx
  on public.profile_stats (signup_source_recorded_at);
