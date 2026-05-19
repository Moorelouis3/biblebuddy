create table if not exists public.deep_study_sessions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  day_key text not null,
  planned_minutes integer not null default 0,
  active_minutes integer not null default 0,
  away_minutes integer not null default 0,
  interruptions integer not null default 0,
  interactions integer not null default 0,
  tasks_completed integer not null default 0,
  task_breakdown jsonb not null default '{}'::jsonb,
  chapters_studied text[] not null default '{}',
  focus_score integer not null default 0,
  multiplier numeric not null default 1,
  deep_study_streak integer not null default 0,
  diamonds_earned integer not null default 0,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists deep_study_sessions_user_day_idx
  on public.deep_study_sessions(user_id, day_key);

create index if not exists deep_study_sessions_user_started_idx
  on public.deep_study_sessions(user_id, started_at desc);

alter table public.deep_study_sessions enable row level security;

drop policy if exists "Users can view their own deep study sessions" on public.deep_study_sessions;
create policy "Users can view their own deep study sessions"
  on public.deep_study_sessions
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own deep study sessions" on public.deep_study_sessions;
create policy "Users can insert their own deep study sessions"
  on public.deep_study_sessions
  for insert
  with check (auth.uid() = user_id);

