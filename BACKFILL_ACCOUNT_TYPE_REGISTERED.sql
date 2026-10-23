-- Backfill account_type for real accounts created after guests were turned off.
--
-- NOT RUN. Louis runs this by hand in the Supabase SQL editor when he wants
-- October to become measurable retroactively. The code fix (app/signup/page.tsx
-- and components/AppShell.tsx, 2026-10-23) only stamps account_type from now
-- on; these are the rows already stranded.
--
-- THE PROBLEM
-- Until anonymous guests were turned off on 2026-10-06, the only things
-- writing profile_stats.account_type were lib/guestSession.ts ("guest") and
-- the guest -> registered conversion in DashboardJourneyExperience
-- ("registered"). A signup that never passed through either wrote nothing.
-- With guests gone, nothing set it at all, so real named accounts land at
-- NULL - 190 of October's 375 profiles on 2026-10-23. Every report filtering
-- account_type = 'registered' therefore reads zero for October, which is why
-- the blog and every other channel looked like it converted nobody.
--
-- WHAT THIS TOUCHES
-- Only rows that are NULL, created on or after the guest cutover, and that
-- carry a username. It never overwrites an existing 'guest' or 'registered'
-- value, so it cannot relabel a real guest account, and re-running it is
-- harmless.
--
-- Run the SELECT first and read the number. Then run the UPDATE.

-- 1. What would change, and what it would be credited to.
select
  count(*) as rows_to_update,
  count(*) filter (where signup_source is not null) as with_a_source,
  count(*) filter (where lower(signup_source) = 'blog') as credited_to_blog,
  min(created_at)::date as earliest,
  max(created_at)::date as latest
from public.profile_stats
where account_type is null
  and created_at >= '2026-10-06'
  and username is not null
  and username <> '';

-- 2. The backfill itself.
update public.profile_stats
set account_type = 'registered'
where account_type is null
  and created_at >= '2026-10-06'
  and username is not null
  and username <> '';

-- 3. Confirm: October should now report registered accounts instead of zero.
select
  to_char(created_at, 'YYYY-MM') as month,
  count(*) filter (where account_type = 'registered') as registered,
  count(*) filter (where account_type = 'guest') as guest,
  count(*) filter (where account_type is null) as still_null
from public.profile_stats
where created_at >= '2026-08-01'
group by 1
order by 1;

-- NOT COVERED, deliberately: profiles created BEFORE 2026-10-06 that are
-- NULL (17 in August, 39 in September). Those sit in the window where guests
-- and real signups were both running, so there is no safe rule to tell them
-- apart. Leave them NULL rather than guess.
