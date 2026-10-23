-- Bug Loop upgrade (2026-10-23).
--
-- The loop already works: reports and crashes land in bug_reports, the Bug
-- Fixer routine works them twice a day, and replies go out after the deploy
-- that carries the fix. This adds the parts that were only ever convention:
--
--   * triage detail the agent can fill in (severity, steps, expected/actual)
--   * an approval gate the SERVER enforces, so a risky area cannot be marked
--     fixed by an agent on its own
--   * a timeline, so "what happened to this bug" is a history and not three
--     fields that get overwritten
--   * every reporter of a deduped bug, instead of only the first
--   * a pause switch for the whole automation
--
-- Safe to run more than once.

-- ---------------------------------------------------------------------------
-- 1. Triage, risk and approval on the report itself
-- ---------------------------------------------------------------------------
alter table public.bug_reports
  add column if not exists severity text,                    -- critical | high | medium | low
  add column if not exists confidence text,                  -- high | medium | low, from the agent
  add column if not exists steps_to_reproduce text,
  add column if not exists steps_source text,                -- 'reporter' | 'ai'
  add column if not exists expected_behavior text,
  add column if not exists actual_behavior text,
  add column if not exists app_version text,
  add column if not exists platform text,                    -- ios | android | web
  add column if not exists risk_areas text[],                -- auth, payments, privacy, native...
  add column if not exists needs_approval boolean not null default false,
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by text,
  add column if not exists rejected_at timestamptz,
  add column if not exists rejection_note text,
  add column if not exists duplicate_of uuid references public.bug_reports(id) on delete set null,
  add column if not exists ack_sent_at timestamptz,          -- the "we got it" message
  add column if not exists info_requested_at timestamptz,    -- the "can you tell us more" message
  add column if not exists attempts integer not null default 0,
  add column if not exists last_error text,
  add column if not exists branch_name text,
  add column if not exists pr_url text,
  add column if not exists tests_result text;

create index if not exists bug_reports_duplicate_of_idx on public.bug_reports(duplicate_of);
create index if not exists bug_reports_needs_approval_idx on public.bug_reports(needs_approval) where needs_approval;

-- ---------------------------------------------------------------------------
-- 2. The timeline - every acknowledgment, status change, fix attempt,
--    escalation, approval and message, in order, kept forever.
-- ---------------------------------------------------------------------------
create table if not exists public.bug_report_events (
  id uuid primary key default gen_random_uuid(),
  bug_id uuid not null references public.bug_reports(id) on delete cascade,
  at timestamptz not null default now(),
  -- who did it: system (the app), agent (the Bug Fixer), louis, reporter
  actor text not null,
  -- what happened: reported, acknowledged, status, triaged, fix_attempted,
  -- tests, escalated, approved, rejected, replied, info_requested, paused...
  kind text not null,
  detail text,
  meta jsonb
);

create index if not exists bug_report_events_bug_idx on public.bug_report_events(bug_id, at desc);

-- ---------------------------------------------------------------------------
-- 3. Every reporter of a deduped bug
--
-- recordBugReport folds a repeat crash into the existing row and bumps
-- occurrences, which is right - but the second person's name and thread used
-- to vanish, so they could never be told it was fixed.
-- ---------------------------------------------------------------------------
create table if not exists public.bug_report_reporters (
  id uuid primary key default gen_random_uuid(),
  bug_id uuid not null references public.bug_reports(id) on delete cascade,
  reporter_user_id uuid,
  reporter_name text,
  conversation_id uuid,
  ack_sent_at timestamptz,
  reply_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists bug_report_reporters_unique
  on public.bug_report_reporters(bug_id, reporter_user_id)
  where reporter_user_id is not null;

-- ---------------------------------------------------------------------------
-- 4. The kill switch
--
-- One row. Paused means the agent endpoint hands out no work at all, so the
-- routine wakes up, finds nothing and goes back to sleep.
-- ---------------------------------------------------------------------------
create table if not exists public.bug_automation (
  id boolean primary key default true check (id),
  paused boolean not null default false,
  paused_at timestamptz,
  paused_by text,
  note text,
  updated_at timestamptz not null default now()
);

insert into public.bug_automation (id, paused) values (true, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 5. Locked down
--
-- Nothing here is ever read by the browser directly: the admin page goes
-- through /api/admin/bugs and the routine through /api/bug-reports/agent,
-- both of which use the service role after checking who is asking. RLS on
-- with no policies is exactly that - service role only.
-- ---------------------------------------------------------------------------
alter table public.bug_report_events enable row level security;
alter table public.bug_report_reporters enable row level security;
alter table public.bug_automation enable row level security;

-- Backfill: give every existing report its first timeline entry, so the page
-- does not look empty for the reports that came in before today.
insert into public.bug_report_events (bug_id, at, actor, kind, detail)
select b.id, b.created_at, 'system', 'reported',
       coalesce(nullif(b.area, ''), 'App') || ' - reported via ' || coalesce(b.source, 'app')
from public.bug_reports b
where not exists (
  select 1 from public.bug_report_events e where e.bug_id = b.id and e.kind = 'reported'
);

-- And record the reporter already on the row, so the two places agree.
insert into public.bug_report_reporters (bug_id, reporter_user_id, reporter_name, conversation_id, reply_sent_at, created_at)
select b.id, b.reporter_user_id, b.reporter_name, b.conversation_id, b.reply_sent_at, b.created_at
from public.bug_reports b
where b.reporter_user_id is not null
on conflict do nothing;
