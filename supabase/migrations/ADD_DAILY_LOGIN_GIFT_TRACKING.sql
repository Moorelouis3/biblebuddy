alter table public.profile_stats
  add column if not exists daily_login_gift_last_visit_at timestamptz,
  add column if not exists daily_login_gift_last_shown_date text;
