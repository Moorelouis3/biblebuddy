create table if not exists public.user_badge_popups_seen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  shown_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

alter table public.user_badge_popups_seen enable row level security;

drop policy if exists "Users can read their own badge popup history" on public.user_badge_popups_seen;
create policy "Users can read their own badge popup history"
on public.user_badge_popups_seen
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own badge popup history" on public.user_badge_popups_seen;
create policy "Users can insert their own badge popup history"
on public.user_badge_popups_seen
for insert
with check (auth.uid() = user_id);

create index if not exists user_badge_popups_seen_user_id_idx
on public.user_badge_popups_seen(user_id);
