-- The campaigns themselves (Louis, 2026-10-09).
--
-- email_campaign_sends already records who received what. This is the other
-- half: what a campaign IS, and whether it should be going out right now.
--
-- It exists because sendCampaign() cannot run in one HTTP request. 4,571
-- subscribers at a safe 10/second is about eight minutes, and a Vercel
-- function is killed long before that. So a cron picks up whatever is marked
-- 'sending', posts a batch, and leaves the rest for the next run - the sender
-- is already resumable, this is what tells it what to resume.
--
-- Nothing here sends on its own. A campaign is created as 'draft' and only
-- moves to 'sending' when someone deliberately starts it.

create table if not exists public.email_campaigns (
  -- Stable, human-written, e.g. "2026-10-13-proverbs-launch". It is what
  -- email_campaign_sends keys against, so it must never be reused.
  campaign_id text primary key,
  subject text not null,
  html text not null,
  text text not null,
  -- Only send to subscribers carrying this tag. Null means the whole list.
  tag text,
  status text not null default 'draft' check (status in ('draft', 'sending', 'paused', 'done')),

  -- Warm-up controls. A brand new SES identity that blasts 4,500 emails on day
  -- one gets throttled back into review no matter what the quota says, so a
  -- campaign starts small and these get raised by hand across a few days.
  rate_per_second numeric not null default 5 check (rate_per_second > 0 and rate_per_second <= 14),
  max_per_run integer not null default 250 check (max_per_run > 0),

  -- Written by the cron so progress is readable without counting rows.
  last_run_at timestamptz,
  last_result jsonb,

  notes text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create index if not exists email_campaigns_status_idx on public.email_campaigns (status, created_at);

alter table public.email_campaigns enable row level security;

-- Service role only. These rows hold the body of an email going to thousands
-- of people; nothing client-side has any business reading or writing them.
drop policy if exists email_campaigns_service_only on public.email_campaigns;
create policy email_campaigns_service_only
  on public.email_campaigns
  for all
  to service_role
  using (true)
  with check (true);
