-- Addresses Bible Buddy must never email again (Louis, 2026-10-03).
--
-- One row per address, whatever the reason: someone unsubscribed, the mailbox
-- does not exist, or they reported us as spam. lib/email/sesSender.ts checks
-- this before every single send, so a caller cannot forget to.
--
-- It is deliberately not tied to a user id. People change accounts, sign up
-- twice, or were only ever a newsletter contact - the address is the thing
-- that must stay quiet.

create table if not exists public.email_suppressions (
  email text primary key,
  reason text not null check (reason in ('unsubscribe', 'bounce', 'complaint', 'manual')),
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists email_suppressions_reason_idx on public.email_suppressions (reason);

-- Service role only. Nothing in the browser should read who unsubscribed, and
-- nothing in the browser should be able to add an address either.
alter table public.email_suppressions enable row level security;
