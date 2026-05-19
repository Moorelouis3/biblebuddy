create table if not exists public.moderator_weekly_diamond_payouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  amount integer not null default 1000,
  paid_at timestamptz not null default now(),
  seen_at timestamptz,
  created_at timestamptz not null default now(),
  constraint moderator_weekly_diamond_payouts_amount_positive check (amount > 0),
  constraint moderator_weekly_diamond_payouts_user_week_unique unique (user_id, week_start)
);

create index if not exists moderator_weekly_diamond_payouts_user_id_idx
  on public.moderator_weekly_diamond_payouts(user_id);

create index if not exists moderator_weekly_diamond_payouts_week_start_idx
  on public.moderator_weekly_diamond_payouts(week_start desc);

alter table public.moderator_weekly_diamond_payouts enable row level security;

drop policy if exists "Users can view their own moderator payouts" on public.moderator_weekly_diamond_payouts;
create policy "Users can view their own moderator payouts"
  on public.moderator_weekly_diamond_payouts
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can mark their own moderator payouts seen" on public.moderator_weekly_diamond_payouts;
create policy "Users can mark their own moderator payouts seen"
  on public.moderator_weekly_diamond_payouts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
