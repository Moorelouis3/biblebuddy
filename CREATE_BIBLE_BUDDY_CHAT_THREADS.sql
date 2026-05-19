create table if not exists public.bible_buddy_chat_threads (
  user_id uuid not null references auth.users(id) on delete cascade,
  buddy_id text not null,
  messages jsonb not null default '[]'::jsonb,
  last_user_message text,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, buddy_id),
  constraint bible_buddy_chat_threads_buddy_id_check
    check (buddy_id in ('louis', 'walter', 'lindsey', 'steve'))
);

alter table public.bible_buddy_chat_threads enable row level security;

drop policy if exists bible_buddy_chat_threads_select_own on public.bible_buddy_chat_threads;
create policy bible_buddy_chat_threads_select_own
on public.bible_buddy_chat_threads
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists bible_buddy_chat_threads_insert_own on public.bible_buddy_chat_threads;
create policy bible_buddy_chat_threads_insert_own
on public.bible_buddy_chat_threads
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists bible_buddy_chat_threads_update_own on public.bible_buddy_chat_threads;
create policy bible_buddy_chat_threads_update_own
on public.bible_buddy_chat_threads
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
