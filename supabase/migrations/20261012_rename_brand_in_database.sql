-- "Bible Buddy" -> "My Bible Buddy", the part that lives in the DATABASE
-- (Louis, 2026-10-12).
--
-- The code rename covered 875 strings across 243 files. These rows are the
-- other half: text people read that no code edit can reach, because it is
-- stored, not written. Counted against production on 2026-10-12.
--
-- RUN SECTIONS 1-3. Sections 4 and 5 are deliberately left commented out and
-- explain why. Every statement is scoped with a LIKE so re-running it is safe.

-- @chunk 1: devotional descriptions (19 rows)
--
-- Shown on the devotional cards and the study pages. Pure display text.
update public.devotionals
set description = replace(description, 'Bible Buddy', 'My Bible Buddy')
where description like '%Bible Buddy%'
  and description not like '%My Bible Buddy%';

-- @chunk 2: the study group's description (1 row)
--
-- The NAME is handled in section 4 - only the description is safe on its own.
update public.study_groups
set description = replace(description, 'Bible Buddy', 'My Bible Buddy')
where description like '%Bible Buddy%'
  and description not like '%My Bible Buddy%';

-- @chunk 3: campaign subject lines (3 rows)
--
-- Including the welcome email, which is transactional and still sending, so
-- its subject is live text rather than history:
--   "Welcome to Bible Buddy - Your Bible, with help understanding it."
--   "How Bible Buddy helps you understand the Bible"
--   "Not sure where to start? Try a Bible Buddy study guide."
--
-- Already-sent copies are not rewritten by this; nothing can rewrite those.
-- Note the third one reads awkwardly after the rename ("Try a My Bible Buddy
-- study guide") - see the list in the handover; it may want rewording rather
-- than renaming.
update public.email_campaigns
set subject = replace(subject, 'Bible Buddy', 'My Bible Buddy')
where subject like '%Bible Buddy%'
  and subject not like '%My Bible Buddy%';

-- @chunk 4: the study group's NAME -- NOT RUN HERE, and not safe alone.
--
--   study_groups.name = 'Bible Buddy Study Group'
--
-- About twenty cron routes find this group by that exact string:
--   .eq("name", "Bible Buddy Study Group")
--   .in("name", ["Bible Buddy Study Group", "Hope Nation"])
--
-- in app/api/cron/{update-monday,weekly-group-poll,weekly-group-question,
-- weekly-group-trivia,who-was-this-friday,prayer-request-sunday,
-- publish-group-recurring,blog-group-post}/route.ts, plus
-- app/api/verse-of-the-day/discussion and app/api/biblebuddy-tv/share-to-group.
--
-- Run this on its own and all of them quietly find nothing. No error, no log -
-- the daily post, the Monday update, the weekly poll, the trivia and the
-- prayer thread simply stop appearing. That is why the code rename skipped
-- this string on purpose.
--
-- To actually do it: change those code constants and run the statement below
-- in the SAME deploy, not before it.
--
-- update public.study_groups
-- set name = 'My Bible Buddy Study Group'
-- where name = 'Bible Buddy Study Group';

-- @chunk 5: things deliberately left as they are.
--
-- group_posts.title (10 rows) - dated announcements like "Update: I added
--   Scrambled to Bible Buddy" and "Bible Buddy TV is LIVE". These are posts
--   from a particular day. Editing them rewrites what was said at the time,
--   which is a different thing from renaming a brand.
--
-- profile_stats.display_name (258 rows) - "Bible Buddy Guest #17" and so on,
--   left over from anonymous accounts, which were turned off in October 2026.
--   app/api/landing-onboarding/setup matches them with
--   .ilike("display_name", "Bible Buddy Guest #%"), so renaming them breaks
--   that lookup too, for no one's benefit: these accounts are dormant.
--
-- The push notification title set inside a database function - see
--   ADD_WEB_PUSH_NOTIFICATIONS.sql, which contains `v_title := 'Bible Buddy';`.
--   Editing that .sql file changes nothing, because the function is already
--   installed. If push titles should say "My Bible Buddy", the function has to
--   be recreated. Worth checking what the live definition actually says first:
--
--   select p.proname, pg_get_functiondef(p.oid)
--   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--   where n.nspname = 'public' and pg_get_functiondef(p.oid) like '%Bible Buddy%';

-- Verification: what still mentions the old name.
select 'devotionals.description' as where_, count(*) from public.devotionals where description like '%Bible Buddy%' and description not like '%My Bible Buddy%'
union all select 'study_groups.description', count(*) from public.study_groups where description like '%Bible Buddy%' and description not like '%My Bible Buddy%'
union all select 'study_groups.name', count(*) from public.study_groups where name like '%Bible Buddy%' and name not like '%My Bible Buddy%'
union all select 'email_campaigns.subject', count(*) from public.email_campaigns where subject like '%Bible Buddy%' and subject not like '%My Bible Buddy%'
union all select 'group_posts.title', count(*) from public.group_posts where title like '%Bible Buddy%' and title not like '%My Bible Buddy%'
union all select 'profile_stats.display_name', count(*) from public.profile_stats where display_name like '%Bible Buddy%' and display_name not like '%My Bible Buddy%';
