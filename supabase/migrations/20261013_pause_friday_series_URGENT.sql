-- URGENT: stop the Friday series being sent by the WRONG cron (2026-10-13).
--
-- WHAT IS HAPPENING
--
-- The 12 Friday lessons are installed as campaign rows with status 'sending',
-- which is how app/api/cron/friday-teaching knows a lesson is armed. That cron
-- runs Fridays only ("*/15 12-16 * * 5") and picks the right lesson per person.
--
-- But app/api/cron/email-campaign-send also looks for rows with
-- kind = 'marketing' AND status = 'sending', every ten minutes, every day. It
-- knows nothing about the Friday series. It takes the oldest due campaign,
-- blasts it to the whole list, and when that one finishes it starts the next.
--
-- All 12 have scheduled_for = NULL, which means "due now". So the generic
-- sender has started working through the entire 12-week series back to back,
-- on a Tuesday. friday-01 began at 06:20 today and had sent 106 by 17:xx.
-- When it completes, friday-02 starts, then 03, and so on.
--
-- Frequency caps were removed on 2026-10-13, so nothing throttles this.
-- Left alone it is roughly 11 more sends x ~5,100 addresses.
--
-- THE FIX: put them back to 'paused', which is the state the Friday series
-- was installed in and the state its own cron treats as "not armed". The
-- Friday cron will simply report "no lesson is armed" until you arm one.

-- Current state, for the record.
select campaign_id, status, scheduled_for, started_at, last_run_at
from public.email_campaigns
where campaign_id like 'friday-%'
order by campaign_id;

-- How many of each lesson have already gone out.
select campaign_id, count(*) as sent
from public.email_campaign_sends
where campaign_id like 'friday-%'
group by campaign_id
order by campaign_id;

-- THE ONE THAT MATTERS.
update public.email_campaigns
set status = 'paused'
where campaign_id like 'friday-%'
  and status = 'sending';

-- Verify: nothing marketing should be left 'sending' except what you intend.
select campaign_id, status, kind, scheduled_for
from public.email_campaigns
where status = 'sending'
order by campaign_id;

-- TO UNDO (arm one lesson deliberately, the way the series was designed):
-- update public.email_campaigns set status = 'sending'
-- where campaign_id = 'friday-01-understand-the-bible';
--
-- THE UNDERLYING CLASH IS STILL THERE. Arming any lesson for the Friday cron
-- also exposes it to the generic sender. Two ways to settle it properly:
--   a) give the Friday rows kind = 'transactional', which the generic sender
--      skips by design (it filters kind = 'marketing'); or
--   b) teach app/api/cron/email-campaign-send to exclude campaign_id like
--      'friday-%', the way it already excludes the welcome email.
-- (a) is one UPDATE and needs no deploy:
--
-- update public.email_campaigns set kind = 'transactional'
-- where campaign_id like 'friday-%';
