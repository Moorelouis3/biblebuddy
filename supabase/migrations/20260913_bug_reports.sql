-- Bug tracker (2026-09-13). Every Report a Problem submission and every
-- app crash lands here. The Bug Fixer routine reads open rows, fixes what it
-- can in code, and writes back a diagnosis, what it changed and a reply for
-- the reporter. Louis sees it all at /admin/bugs.
create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'problem_card',        -- problem_card | crash | dm
  status text not null default 'new',                 -- new | fixing | fixed | needs_louis | not_a_bug | duplicate
  category text,
  area text,
  page text,
  message text not null,
  error_details jsonb,
  fingerprint text,                                   -- crashes: dedupe identical errors
  occurrences integer not null default 1,
  last_seen_at timestamptz not null default now(),
  reporter_user_id uuid,
  reporter_name text,
  conversation_id uuid,
  diagnosis text,
  fix_summary text,
  fix_commit text,
  louis_action text,                                  -- the one thing Louis must do, when needs_louis
  reply_draft text,
  reply_hold boolean not null default false,          -- Louis paused the automatic reply
  reply_sent_at timestamptz,
  resolved_at timestamptz,                            -- when the Bug Fixer finished with it
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bug_reports_status_idx on public.bug_reports (status, created_at desc);
create index if not exists bug_reports_fingerprint_idx on public.bug_reports (fingerprint);

-- Service role only: no client policies.
alter table public.bug_reports enable row level security;
