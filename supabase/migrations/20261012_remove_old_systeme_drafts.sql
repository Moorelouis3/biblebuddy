-- Remove the old Systeme.io draft campaigns (Louis, 2026-10-12).
--
-- These are the 26 campaigns imported from Systeme.io on 2026-10-10 that were
-- never sent and are not part of anything current. They are NOT:
--
--   friday-01 .. friday-12   the 12-week Friday teaching series, paused and
--                            waiting. KEPT.
--   welcome                  transactional, live, sends one at a time. KEPT.
--   systeme-5302997          "Moses thought he was the wrong person", status
--                            done, 5,208 recipients. KEPT - it is the only
--                            record of that send, and email_campaign_sends
--                            rows point at it.
--
-- Backed up in full, bodies included, at:
--   drafts/removed-systeme-drafts-2026-10-12.json
-- Any of them can be recreated from that file.
--
-- The WHERE clause is deliberately narrow: systeme- prefix AND status 'draft'.
-- The done one does not match, the friday ones do not match, welcome does not
-- match.

-- Check first. Expect 26, and expect the second query to return nothing.
select campaign_id, status, subject
from public.email_campaigns
where campaign_id like 'systeme-%' and status = 'draft'
order by campaign_id;

-- Safety: none of these may have ever sent. This must return zero rows.
select s.campaign_id, count(*) as sends
from public.email_campaign_sends s
join public.email_campaigns c on c.campaign_id = s.campaign_id
where c.campaign_id like 'systeme-%' and c.status = 'draft'
group by s.campaign_id;

-- The delete.
delete from public.email_campaigns
where campaign_id like 'systeme-%'
  and status = 'draft';

-- Verify what is left: expect 12 paused friday-*, 1 sending welcome,
-- 1 done systeme-5302997.
select status, count(*)
from public.email_campaigns
group by status
order by status;

select campaign_id, status from public.email_campaigns order by campaign_id;
