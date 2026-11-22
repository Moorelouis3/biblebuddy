-- Bible Clue Game: private rooms and Feed challenges (2026-11-22).
--
-- Everything here is read and written only by the server
-- (app/api/clue-game/*, service role). RLS is on with no policies, so the
-- public key can read nothing: a room's full state holds the answers, and
-- players only ever receive lib/clueGame/engine.ts publicView().

create table if not exists public.clue_rooms (
  code text primary key,
  host_id uuid not null,
  deck_ids text[] not null default '{genesis}',
  status text not null default 'lobby' check (status in ('lobby', 'playing', 'over', 'closed')),
  -- The full engine match (answers included). Null until the host starts.
  state jsonb,
  -- Optimistic concurrency: every write is "update ... where version = $read".
  -- Two guesses racing for one card cannot both win it.
  version integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '6 hours')
);

create table if not exists public.clue_room_players (
  room_code text not null references public.clue_rooms(code) on delete cascade,
  user_id uuid not null,
  display_name text,
  avatar_url text,
  joined_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  primary key (room_code, user_id)
);

create table if not exists public.clue_challenges (
  id text primary key,
  creator_id uuid not null,
  -- The solo round it was made from: tapping Challenge twice reuses it.
  source_round_id text not null unique,
  deck_ids text[] not null default '{genesis}',
  card_ids text[] not null,
  top_clue jsonb not null default '{}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  creator_score integer not null,
  creator_won integer not null,
  feed_post_id text,
  attempts integer not null default 0,
  leader_id uuid,
  leader_name text,
  leader_score integer,
  created_at timestamptz not null default now()
);

create table if not exists public.clue_challenge_attempts (
  id uuid primary key default gen_random_uuid(),
  challenge_id text not null references public.clue_challenges(id) on delete cascade,
  user_id uuid not null,
  display_name text,
  score integer not null,
  won integer not null,
  -- The first completed attempt per person is the ranked one.
  ranked boolean not null default false,
  shared boolean not null default false,
  finished_at timestamptz not null default now()
);

create unique index if not exists clue_challenge_attempts_one_ranked
  on public.clue_challenge_attempts (challenge_id, user_id) where ranked;
create index if not exists clue_challenge_attempts_board
  on public.clue_challenge_attempts (challenge_id, score desc) where ranked;
create index if not exists clue_room_players_user on public.clue_room_players (user_id);

alter table public.clue_rooms enable row level security;
alter table public.clue_room_players enable row level security;
alter table public.clue_challenges enable row level security;
alter table public.clue_challenge_attempts enable row level security;
