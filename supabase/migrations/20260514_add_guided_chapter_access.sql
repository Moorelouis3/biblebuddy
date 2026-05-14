create table if not exists public.guided_chapter_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  devotional_id uuid not null references public.devotionals(id) on delete cascade,
  day_number integer not null check (day_number >= 1),
  bible_reading_book text,
  bible_reading_chapter integer,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  unlocks_at timestamptz,
  status text not null default 'active' check (status in ('active', 'completed_locked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, devotional_id, day_number)
);

create index if not exists guided_chapter_access_user_status_idx
  on public.guided_chapter_access (user_id, status, created_at desc);

alter table public.guided_chapter_access enable row level security;

drop policy if exists "Users can read own guided chapter access" on public.guided_chapter_access;
create policy "Users can read own guided chapter access"
  on public.guided_chapter_access
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own guided chapter access" on public.guided_chapter_access;
create policy "Users can insert own guided chapter access"
  on public.guided_chapter_access
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own guided chapter access" on public.guided_chapter_access;
create policy "Users can update own guided chapter access"
  on public.guided_chapter_access
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
