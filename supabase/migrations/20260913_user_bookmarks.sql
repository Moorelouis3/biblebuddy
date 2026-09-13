-- Generic per-user bookmarks (2026-09-13). Replaces the Daily-Verse-only
-- verse_of_the_day_engagement.bookmarked flag as the single source of truth,
-- so later content (Bible verses, devotionals, notes, posts) can be saved
-- without another bookmark system. content_id is text so any id shape fits.
create table if not exists public.user_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null,          -- 'daily_verse' today
  content_id text not null,            -- verse_of_the_day_entries.id for daily_verse
  created_at timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);

create index if not exists user_bookmarks_user_idx on public.user_bookmarks (user_id, content_type, created_at desc);

alter table public.user_bookmarks enable row level security;

drop policy if exists user_bookmarks_select_own on public.user_bookmarks;
create policy user_bookmarks_select_own on public.user_bookmarks
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists user_bookmarks_insert_own on public.user_bookmarks;
create policy user_bookmarks_insert_own on public.user_bookmarks
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists user_bookmarks_delete_own on public.user_bookmarks;
create policy user_bookmarks_delete_own on public.user_bookmarks
  for delete to authenticated using (auth.uid() = user_id);

-- Carry over every Daily Verse already bookmarked.
insert into public.user_bookmarks (user_id, content_type, content_id, created_at)
select user_id, 'daily_verse', entry_id::text, coalesce(bookmarked_at, updated_at, now())
from public.verse_of_the_day_engagement
where bookmarked = true
on conflict (user_id, content_type, content_id) do nothing;
