-- One row per (campaign, address) actually sent (Louis, 2026-10-08).
--
-- This exists so sending to the list is RESUMABLE. A campaign to 4,500 people
-- takes an hour at SES's rate limits, and anything can interrupt it: a crash, a
-- timeout, a laptop lid. Without a record of who already received it, a retry
-- would email thousands of people twice - which is how a sender gets reported
-- as spam and loses its reputation on the first campaign.
--
-- The sender writes a row BEFORE each send and skips any address already here,
-- so a duplicate is impossible even if the process dies mid-flight. A send that
-- then fails is recorded with its error rather than deleted, so a retry does
-- not silently re-attempt a hard failure forever.

create table if not exists public.email_campaign_sends (
  campaign_id text not null,
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'skipped')),
  detail text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  primary key (campaign_id, email)
);

create index if not exists email_campaign_sends_campaign_idx on public.email_campaign_sends (campaign_id, status);

alter table public.email_campaign_sends enable row level security;

drop policy if exists email_campaign_sends_service_only on public.email_campaign_sends;
create policy email_campaign_sends_service_only
  on public.email_campaign_sends
  for all
  to service_role
  using (true)
  with check (true);
