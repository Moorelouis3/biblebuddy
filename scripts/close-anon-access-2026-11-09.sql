-- Closes anonymous access to personal data. Applied to production 9 Nov 2026.
--
-- What was wrong. Six relations in `public` handed their rows to anyone holding
-- the publishable key, which ships inside the website's JavaScript:
--
--   user_signups              5,495 rows — every signup email address
--   study_group_members       7,333 rows — view over group_members
--   weekly_bible_report_sent  5,755 rows
--   reading_sessions              2 rows
--   notes_with_users            134 rows — people's study notes, with names
--   ses_campaign_stats           57 rows — campaign sends, opens, clicks
--
-- Two separate causes. user_signups had row level security ON but a SELECT
-- policy granted to `public` with USING (true). reading_sessions and
-- weekly_bible_report_sent had row level security switched OFF entirely, as did
-- featured_bible_characters, which was empty and so did not show up as a read
-- leak — RLS off plus the default anon grants means readable AND writable.
-- The three views were created the ordinary way, so they ran as their owner and
-- read straight past the policies on the tables beneath them; pg_relation_is_
-- updatable reported 28 for study_group_members (insert, update and delete), so
-- it was an open window onto group_members, whose own four policies it skipped.
--
-- Why this breaks nothing. Every consumer of these relations is a server-side
-- route holding the service-role key, which bypasses RLS: the email-funnel and
-- admin routes for user_signups, lib/accountDeletion.ts (documented
-- "must be called with a SERVICE-ROLE client"), lib/weeklyBibleReport.ts, and
-- app/api/admin/campaigns/route.ts for ses_campaign_stats. notes_with_users is
-- referenced nowhere in the codebase. The one exception is
-- featured_bible_characters, which lib/featuredCharacters.ts reads from the
-- browser, so it keeps a SELECT policy for signed-in readers.
--
-- Verified afterwards with `npm run verify:anon-access` and from the catalog:
-- 0 tables with RLS off, 0 SELECT policies on user_signups, and the only views
-- without security_invoker are email_engagement and email_engagement_summary,
-- which anon has no grants on at all.
--
-- To roll back, re-create the dropped policy and set the tables and views back.
-- Do not, unless something named here turns out to be read from the browser.

begin;

-- 1. user_signups had RLS on but a policy handing every row to anyone.
drop policy if exists user_signups_select_all on public.user_signups;

-- 2. three tables were running with row level security switched off, so the
--    publishable key could read AND write them.
alter table public.reading_sessions          enable row level security;
alter table public.weekly_bible_report_sent  enable row level security;
alter table public.featured_bible_characters enable row level security;

create policy featured_bible_characters_select_authenticated
  on public.featured_bible_characters for select to authenticated using (true);

-- 3. three views ran as their owner and so read past the RLS on the tables
--    beneath them.
alter view public.study_group_members set (security_invoker = true);
alter view public.notes_with_users    set (security_invoker = true);
alter view public.ses_campaign_stats  set (security_invoker = true);

commit;

-- Left for later, deliberately: notes_with_users is now closed but errors for
-- every role, because with security_invoker it needs SELECT on auth.users,
-- which nothing has. Nothing in the codebase reads it. It can simply be
-- dropped; its definition is
--   SELECT n.id, n.user_id, <first/last name from au.raw_user_meta_data>,
--          n.verse_from, n.verse_to, n.passage, n.research, n.created_at
--   FROM notes n LEFT JOIN auth.users au ON n.user_id = au.id;
