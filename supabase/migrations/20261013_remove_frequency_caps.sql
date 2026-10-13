-- Everyone gets every email (Louis, 2026-10-13).
--
-- The engagement caps were our own invention, written on 2026-10-10 for a
-- three-newsletters-a-week world: active uncapped, quiet 2 per rolling 7 days,
-- inactive 1. Louis has decided twice now that they go. They do not fit the
-- new plan and they were actively getting in the way of it:
--
--   - The Friday teaching series is an ordered course. A cap does not drop a
--     lesson, it postpones it, so a capped subscriber falls one week further
--     behind the rest of the list every single week, forever.
--   - Every new signup starts at lesson 1 and walks the same twelve. That only
--     works if nothing silently holds a lesson back.
--   - It had already bitten: today's newsletter could reach 1,102 of 5,152
--     people, because one send three days earlier had used up the inactive
--     group's single weekly slot for 4,050 of them.
--
-- WHAT IS DELIBERATELY KEPT, because these are real protections rather than
-- rules we made up:
--
--   - unsubscribe: email_suppressions is still checked first and absolutely,
--     in both the queue and the per-address recheck, and app activity still
--     cannot undo an unsubscribe;
--   - bounce and complaint suppression: the SES webhook still writes to that
--     same table, so a hard bounce still stops future mail;
--   - duplicate protection: email_campaign_sends is still keyed
--     (campaign_id, email) and is still consulted, so nobody can receive the
--     same campaign twice however many times a run is retried.
--
-- The three groups themselves stay. They are still worth SEEING - knowing that
-- 4,117 of 5,152 subscribers have shown no sign of life in 90 days is useful,
-- and the 10 Oct send bounced at 3.73% against SES's 5% suspension threshold,
-- which is a number to keep watching. They just no longer decide who gets mail.

-- 1. The per-address recheck, called immediately before every single send.
--    Returning null here means "no cap", and can_send_campaign_now returns
--    true at that point without counting anything.
create or replace function public.weekly_cap_for(p_group text)
returns integer
language sql
immutable
as $$
  -- No group is capped any more. Kept as a function rather than deleted so
  -- can_send_campaign_now and anything else calling it keep working.
  select null::integer;
$$;

comment on function public.weekly_cap_for(text) is
  'Always null since 2026-10-13: frequency caps were removed. Suppression and duplicate protection still apply.';

-- 2. The queue the sender actually walks.
--
--    Only the cap predicate is gone. Suppression (e.eligible), per-campaign
--    targeting, and the duplicate check against email_campaign_sends are all
--    untouched.
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
  join public.email_campaigns c on c.campaign_id = p_campaign_id
  where e.eligible
    -- Transactional mail is outside this system entirely.
    and (
      c.kind = 'transactional'
      or e.engagement_group = any (c.target_groups)
    )
    and not exists (
      select 1 from public.email_campaign_sends s
      where s.campaign_id = c.campaign_id and s.email = e.email
    )
  order by e.email;
$$;

comment on function public.marketing_recipients(text) is
  'Who may receive a campaign: everyone not suppressed, in the target groups, who has not already been sent it. No frequency cap since 2026-10-13.';

-- email_engagement still computes a weekly_cap column. Nothing reads it to
-- make a decision any more - marketing_recipients above ignores it and
-- weekly_cap_for returns null - so it is left in place rather than rewriting a
-- 150-line view for a column that is now only ever displayed. The dashboard
-- labels in lib/email/engagementGroups.ts are updated to match.
