-- CREATE_HIGHLIGHTS_TABLE.sql
-- Migration for verse highlighting system

create table if not exists highlights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  book text not null,
  chapter int not null,
  verse int not null,
  color text not null,
  created_at timestamptz not null default now(),
  constraint highlights_user_book_chapter_verse_unique unique (user_id, book, chapter, verse)
);

-- Enable Row Level Security
alter table highlights enable row level security;

-- RLS: Users can SELECT their own highlights
create policy "Select own highlights" on highlights
  for select using (auth.uid() = user_id);

-- RLS: Users can INSERT their own highlights
create policy "Insert own highlights" on highlights
  for insert with check (auth.uid() = user_id);

-- RLS: Users can UPDATE their own highlights
create policy "Update own highlights" on highlights
  for update using (auth.uid() = user_id);

-- RLS: Users can DELETE their own highlights
create policy "Delete own highlights" on highlights
  for delete using (auth.uid() = user_id);
