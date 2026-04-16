create table if not exists public.weekly_bible_report_buckets (
  user_id uuid not null primary key,
  bucket_day text not null check (bucket_day in ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
  assigned_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists weekly_bible_report_buckets_bucket_day_idx
  on public.weekly_bible_report_buckets (bucket_day);
