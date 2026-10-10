-- Opens, clicks and scheduling: the parts of Systeme we still needed.
--
-- Louis, 2026-10-10: "make it as close to systeme.. where i can track the
-- opens clicks all that". His newsletters there run 17-20% opens and 0.7-2%
-- clicks on ~4,100 recipients, and moving off a tool that shows you those
-- numbers to one that shows you nothing is not a move worth making.
--
-- The tracking itself is SES's, not ours. Turning on Open and Click tracking
-- on the configuration set makes SES inject the pixel and rewrite links on the
-- way out, then publish an event per open and per click to the same SNS topic
-- the bounces already use. Building our own pixel and redirect would mean
-- another endpoint to secure and another thing to get wrong.

-- A short-lived email_sequence_* pair was created earlier today on a misread
-- of what was wanted, and never referenced by anything. Dropped here rather
-- than left as dead schema.
drop table if exists public.email_sequence_sends;
drop table if exists public.email_sequence_steps;

-- Scheduling. Until now a campaign could only start the moment someone set it
-- to 'sending'; this is what lets one sit and wait for a date, the way the
-- five December newsletters do in Systeme.
alter table public.email_campaigns
  add column if not exists scheduled_for timestamptz;

comment on column public.email_campaigns.scheduled_for is
  'When the cron may start sending. Null means as soon as status is sending.';

-- One row per thing SES tells us happened to one message.
--
-- Kept as raw events rather than counters on the campaign because a counter
-- cannot answer "which links did people click" or "did opens come in over
-- three days or three hours", and because a replayed SNS delivery must not
-- double-count - hence the primary key.
create table if not exists public.email_events (
  -- SES's id for the message. Present on every event type.
  message_id text not null,
  event_type text not null check (event_type in
    ('send', 'delivery', 'open', 'click', 'bounce', 'complaint', 'reject', 'deliverydelay')),
  -- Several opens of the same message are normal and interesting; the
  -- timestamp keeps them distinct.
  occurred_at timestamptz not null,

  -- Which campaign, taken from the EmailTags sendCampaign already sets.
  campaign_id text,
  email text,

  -- Clicks only.
  link_url text,

  user_agent text,
  ip_address text,
  created_at timestamptz not null default now(),

  primary key (message_id, event_type, occurred_at)
);

create index if not exists email_events_campaign_idx on public.email_events (campaign_id, event_type);
create index if not exists email_events_occurred_idx on public.email_events (occurred_at desc);
create index if not exists email_events_email_idx on public.email_events (email);

alter table public.email_events enable row level security;

drop policy if exists email_events_service_only on public.email_events;
create policy email_events_service_only
  on public.email_events for all to service_role
  using (true) with check (true);

-- What the dashboard reads: one row per campaign with the numbers Systeme
-- showed - sent, opens, clicks and the rates - so the screen does not have to
-- count hundreds of thousands of event rows itself.
--
-- Opens and clicks are counted DISTINCT by recipient. Systeme reports unique
-- opens, and counting raw events instead would report 40% for a campaign half
-- the list opened twice.
-- NOT email_campaign_stats: that name is already a table the
-- email-stats-sync cron fills with the Systeme figures.
create or replace view public.ses_campaign_stats as
select
  c.campaign_id,
  c.subject,
  c.status,
  c.scheduled_for,
  c.started_at,
  c.completed_at,
  coalesce(s.sent, 0) as sent,
  coalesce(s.failed, 0) as failed,
  coalesce(e.opens, 0) as opens,
  coalesce(e.clicks, 0) as clicks,
  coalesce(e.bounces, 0) as bounces,
  coalesce(e.complaints, 0) as complaints,
  case when coalesce(s.sent, 0) = 0 then 0
       else round(100.0 * coalesce(e.opens, 0) / s.sent, 2) end as open_rate,
  case when coalesce(s.sent, 0) = 0 then 0
       else round(100.0 * coalesce(e.clicks, 0) / s.sent, 2) end as click_rate
from public.email_campaigns c
left join (
  select campaign_id,
         count(*) filter (where status = 'sent') as sent,
         count(*) filter (where status = 'failed') as failed
  from public.email_campaign_sends
  group by campaign_id
) s on s.campaign_id = c.campaign_id
left join (
  select campaign_id,
         count(distinct email) filter (where event_type = 'open') as opens,
         count(distinct email) filter (where event_type = 'click') as clicks,
         count(distinct email) filter (where event_type = 'bounce') as bounces,
         count(distinct email) filter (where event_type = 'complaint') as complaints
  from public.email_events
  group by campaign_id
) e on e.campaign_id = c.campaign_id;
