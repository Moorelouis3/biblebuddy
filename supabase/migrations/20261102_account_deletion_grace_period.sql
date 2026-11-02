-- A 30 day grace period on account deletion (2026-11-02).
--
-- Deleting an account used to be instant and total: lib/accountDeletion.ts
-- wipes roughly 60 tables and then the auth user, with no soft delete and no
-- tombstone. Supabase keeps 7 daily backups, so anyone who noticed later than
-- a week had no way back.
--
-- That is not theoretical. Jessica had used Bible Buddy since 2025-12-06,
-- deleted her account somewhere between 10 and 26 October, and signed up again
-- on 1 November with the same email. Eleven months of reading history. Both
-- the oldest backup and the live database were checked: nothing survived, and
-- nothing could be given back.
--
-- So deletion now writes a row here instead of wiping anything. The user is
-- signed out everywhere immediately - the account is unusable the moment they
-- ask - and a cron does the real purge once the grace period expires. Signing
-- in again before then cancels it and everything is simply still there.
--
-- Apple 5.1.1(v) and Google Play both allow a delay like this as long as the
-- person is told, which the confirmation email does.
--
-- Safe to run more than once.

create table if not exists public.account_deletions (
  user_id      uuid primary key,
  -- Kept as plain columns because by the time this matters the auth user may
  -- be gone, and "who was this" still has to be answerable from this row
  -- alone - for support, and for the confirmation email.
  email        text,
  display_name text,

  requested_at timestamptz not null default now(),
  -- When the purge becomes due. A column rather than requested_at + interval
  -- so an individual case can be extended by hand without touching code.
  purge_after  timestamptz not null,

  -- pending   waiting out the grace period, still fully recoverable
  -- cancelled the user came back and signed in
  -- purged    the hard delete has run, nothing left
  -- failed    the purge errored; needs a human, data still present
  status       text not null default 'pending'
                 check (status in ('pending', 'cancelled', 'purged', 'failed')),

  cancelled_at timestamptz,
  purged_at    timestamptz,
  last_error   text,
  attempts     integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- The cron's only query: what is pending and now due.
create index if not exists account_deletions_due_idx
  on public.account_deletions (purge_after)
  where status = 'pending';

-- Support lookup: "this person says they deleted by accident".
create index if not exists account_deletions_email_idx
  on public.account_deletions (lower(email));

-- Only the service role touches this table. The API routes and the cron all
-- use it; nothing client-side has any business reading who has left.
alter table public.account_deletions enable row level security;
