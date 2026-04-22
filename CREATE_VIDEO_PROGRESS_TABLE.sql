create extension if not exists pgcrypto;

create table if not exists public.video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_id text not null,
  current_time double precision not null default 0,
  duration double precision not null default 0,
  completed boolean not null default false,
  last_event text not null check (last_event in ('play', 'pause', 'progress', 'completed')),
  updated_at timestamptz not null default now(),
  unique (user_id, video_id)
);

create index if not exists video_progress_user_id_idx on public.video_progress (user_id);
create index if not exists video_progress_updated_at_idx on public.video_progress (updated_at desc);
create index if not exists video_progress_completed_idx on public.video_progress (completed);

alter table public.video_progress enable row level security;

drop policy if exists "Users can view their own video progress" on public.video_progress;
create policy "Users can view their own video progress"
on public.video_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own video progress" on public.video_progress;
create policy "Users can insert their own video progress"
on public.video_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own video progress" on public.video_progress;
create policy "Users can update their own video progress"
on public.video_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
