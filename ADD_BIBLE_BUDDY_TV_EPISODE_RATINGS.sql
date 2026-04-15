create table if not exists public.tv_episode_ratings (
  episode_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (episode_id, user_id)
);

alter table public.tv_episode_ratings enable row level security;

create policy "tv episode ratings readable by authenticated users"
on public.tv_episode_ratings
for select
to authenticated
using (true);

create policy "tv episode ratings insert own rating"
on public.tv_episode_ratings
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "tv episode ratings update own rating"
on public.tv_episode_ratings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
