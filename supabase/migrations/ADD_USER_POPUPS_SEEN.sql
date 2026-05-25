create table if not exists public.user_popups_seen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  popup_id text not null,
  has_seen boolean not null default true,
  seen_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, popup_id)
);

alter table public.user_popups_seen enable row level security;

drop policy if exists "Users can read their own popup history" on public.user_popups_seen;
create policy "Users can read their own popup history"
on public.user_popups_seen
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own popup history" on public.user_popups_seen;
create policy "Users can insert their own popup history"
on public.user_popups_seen
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own popup history" on public.user_popups_seen;
create policy "Users can update their own popup history"
on public.user_popups_seen
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists user_popups_seen_user_id_idx
on public.user_popups_seen(user_id);

create index if not exists user_popups_seen_popup_id_idx
on public.user_popups_seen(popup_id);
