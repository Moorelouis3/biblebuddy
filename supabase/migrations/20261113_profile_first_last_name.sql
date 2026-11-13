-- Structured first and last name on a profile.
--
-- The community feed shows a member's profile name next to their study
-- activity. Until today it showed "Bible Buddy User" for 325 of them, and a
-- single first name for 2,698 more. Louis, 2026-11-13: real identities in the
-- feed, first name and last name.
--
-- display_name stays the field everything reads. It is written as
-- "First Last" whenever both parts are saved, so the feed, comments,
-- notifications, buddies and profile pages need no changes and no published
-- activity shifts. These two columns are the structured copy underneath it,
-- for anything that needs the parts separately later.
--
-- Deliberately nullable with no backfill and no default. 2,698 existing
-- members use a single name, some of them because that is their name, and
-- nothing here guesses a surname or rewrites what anyone chose. They are
-- asked the next time they post; until then their profile is untouched.

ALTER TABLE profile_stats
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name  text;

COMMENT ON COLUMN profile_stats.first_name IS
  'Given name, as the member typed it. Never inferred, never split from display_name by the app.';
COMMENT ON COLUMN profile_stats.last_name IS
  'Family name, as the member typed it. Null for profiles completed before 2026-11-13.';
