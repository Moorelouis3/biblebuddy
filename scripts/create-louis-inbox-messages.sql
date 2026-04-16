create table if not exists public.louis_inbox_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  title text,
  content text not null,
  action_label text,
  action_href text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  consumed_at timestamptz
);

create index if not exists louis_inbox_messages_user_created_idx
  on public.louis_inbox_messages (user_id, created_at desc);

create index if not exists louis_inbox_messages_user_consumed_idx
  on public.louis_inbox_messages (user_id, consumed_at);

alter table public.louis_inbox_messages enable row level security;

drop policy if exists "Users can read their own Louis inbox messages" on public.louis_inbox_messages;
create policy "Users can read their own Louis inbox messages"
  on public.louis_inbox_messages
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own Louis inbox messages" on public.louis_inbox_messages;
create policy "Users can update their own Louis inbox messages"
  on public.louis_inbox_messages
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
