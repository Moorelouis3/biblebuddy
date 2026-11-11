-- Email buckets: the welcome funnel, and who is allowed to get broadcasts.
-- 11 November 2026.
--
-- Three steps, in this order, and the order matters:
--   1. add the two columns
--   2. anchor every EXISTING subscriber to Bucket 2 at the cutoff
--   3. only then teach marketing_recipients to exclude anyone mid-welcome
--
-- Doing 3 before 2 would empty the broadcast audience, because every row would
-- still have a null welcome_completed_at. Running them together in one file is
-- what makes that impossible.


-- 1. The two columns ---------------------------------------------------------
--
-- welcome_step        which of the five emails they have had. null = never
--                     enrolled, which is every existing subscriber.
-- welcome_completed_at when they finished step 5. Non-null is the single
--                     condition for being in Bucket 2.
--
-- Both nullable, no defaults: an ALTER that adds a nullable column with no
-- default takes a brief metadata lock and does not rewrite the 5,584 rows.

alter table public.email_subscribers
  add column if not exists welcome_step smallint;

alter table public.email_subscribers
  add column if not exists welcome_completed_at timestamptz;

comment on column public.email_subscribers.welcome_step is
'Bucket 1 progress: which welcome email (1-5) this subscriber has received. NULL means never enrolled. Written only by the welcome cron.';

comment on column public.email_subscribers.welcome_completed_at is
'When this subscriber finished welcome email 5, which is the single condition for being in Bucket 2. Backdated to the 2026-11-11 cutoff for everyone already on the list at that moment, so they are permanently Bucket 2 and no later recomputation can pull them into the funnel.';


-- 2. Anchor the cohort, once -------------------------------------------------
--
-- Louis's rule: "EXISTING LIST -> BUCKET 2 IMMEDIATELY ... Do not enroll them
-- in, restart, or make them complete the new five-email welcome sequence", and
-- "The cohort classification must be anchored to the Nov 11 cutoff, not
-- recomputed later based only on current list membership."
--
-- Anchoring means writing it down now rather than deriving it later from
-- created_at. A derived rule would silently change meaning the next time
-- anything touched that column - which is exactly what happened to
-- profile_stats.created_at on 10 November.
--
-- The guard is `where welcome_completed_at is null`, so re-running this is
-- harmless and it can never overwrite a real completion.

-- The subscribed_at condition is load-bearing and was missing on the first
-- run. Rule 1 is "already on the mailing list at the cutoff", and rule 2 is
-- "signing up on November 11, 2026 or later begins the five-day welcome
-- funnel" - so the cutoff is a boundary, not just a timestamp to stamp on
-- everybody. Without it, the 10 people who signed up during 11 November were
-- anchored to Bucket 2 and would never have received the welcome sequence.
-- They were moved back into Bucket 1 the same day.

update public.email_subscribers
set
  welcome_completed_at = timestamptz '2026-11-11 00:00:00+01',  -- Europe/Berlin
  welcome_step = 5
where welcome_completed_at is null
  and subscribed_at < timestamptz '2026-11-11 00:00:00+01';


-- 3. Keep Bucket 1 out of broadcasts ------------------------------------------
--
-- One added predicate. Everything else is byte-for-byte the function from
-- 20261013_remove_frequency_caps.sql: suppression is still absolute, campaign
-- targeting is unchanged, and the duplicate check against email_campaign_sends
-- is untouched.
--
-- After step 2 every existing subscriber has a non-null welcome_completed_at,
-- so this changes the audience for nobody today. It starts mattering the moment
-- the first person enters the funnel: they are invisible to every Part 2
-- campaign until they finish step 5, and then they are visible for the NEXT
-- one. Nothing replays - a campaign that already ran is simply not re-run, so
-- "never backfill" needs no code of its own.

create or replace function public.marketing_recipients(p_campaign_id text)
returns table (
  email text,
  first_name text,
  engagement_group text,
  weekly_cap integer,
  marketing_sends_7d integer
)
language sql
stable
as $$
  select e.email, e.first_name, e.engagement_group, e.weekly_cap, e.marketing_sends_7d
  from public.email_engagement e
  join public.email_subscribers s on s.email = e.email
  join public.email_campaigns c on c.campaign_id = p_campaign_id
  where e.eligible
    -- Transactional mail is outside this system entirely. The welcome funnel
    -- is transactional, which is why it still reaches people in Bucket 1.
    and (
      c.kind = 'transactional'
      or (
        e.engagement_group = any (c.target_groups)
        -- Bucket 2 only: nobody mid-welcome receives a broadcast.
        and s.welcome_completed_at is not null
      )
    )
    and not exists (
      select 1 from public.email_campaign_sends s2
      where s2.campaign_id = c.campaign_id and s2.email = e.email
    )
  order by e.email;
$$;

comment on function public.marketing_recipients(text) is
  'Who may receive a campaign: everyone not suppressed, in the target groups, who has finished the welcome funnel (Bucket 2), and who has not already been sent it. No frequency cap since 2026-10-13. Welcome-funnel exclusion added 2026-11-11.';


-- Verification ---------------------------------------------------------------

select
  count(*) filter (where welcome_completed_at is not null) as bucket_2,
  count(*) filter (where welcome_completed_at is null)     as bucket_1_or_new,
  count(*)                                                  as total
from public.email_subscribers;
