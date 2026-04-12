create table if not exists public.weekly_bible_report_sent (
  user_id uuid not null,
  week_key text not null,
  sent_at timestamptz not null default now(),
  primary key (user_id, week_key)
);

create index if not exists weekly_bible_report_sent_week_key_idx
  on public.weekly_bible_report_sent (week_key);
