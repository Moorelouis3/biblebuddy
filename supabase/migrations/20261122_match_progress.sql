-- Bible Buddy Match progress on the server (Louis, 2026-11-22: "I don't see
-- other people on the map... Jessica finished day 2, we are buddies, I
-- should see her"). Until now progress lived only in each phone's
-- localStorage. One row per player; the game keeps it in step and
-- /api/match/progress shows a player their buddies' boards.

create table if not exists public.match_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  unlocked integer not null default 1 check (unlocked between 1 and 500),
  done text[] not null default '{}',
  best jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.match_progress enable row level security;

-- Each player reads and writes only their own row. Buddies' rows are read by
-- the server route with the service key, after it checks the buddies table.
create policy match_progress_select_own on public.match_progress
  for select to authenticated using (auth.uid() = user_id);
create policy match_progress_insert_own on public.match_progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy match_progress_update_own on public.match_progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
