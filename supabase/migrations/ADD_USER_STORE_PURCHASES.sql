create table if not exists public.user_store_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  item_kind text not null,
  item_title text not null,
  price_diamonds integer not null default 0,
  reward_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists user_store_purchases_user_id_idx
  on public.user_store_purchases(user_id);

create index if not exists user_store_purchases_user_item_idx
  on public.user_store_purchases(user_id, item_id);

alter table public.user_store_purchases enable row level security;

drop policy if exists "Users can view their own store purchases" on public.user_store_purchases;
create policy "Users can view their own store purchases"
  on public.user_store_purchases
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own store purchases" on public.user_store_purchases;
create policy "Users can insert their own store purchases"
  on public.user_store_purchases
  for insert
  with check (auth.uid() = user_id);
