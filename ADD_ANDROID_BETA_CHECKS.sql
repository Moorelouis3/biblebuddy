-- The Android closed-beta tester count, written down once a day.
--
-- Google requires 12 testers opted in for 14 consecutive days before the Play
-- listing can go public, and gives you NO way to watch that happen: no
-- countdown, no start date, no history, and no API. The Play Console
-- dashboard shows a single live number and nothing else, and the moment the
-- count passes 12 it stops showing even that. There is no Play Developer API
-- method that returns it either (checked 2026-11-04), so the number cannot be
-- fetched - it can only be read off the screen and written down.
--
-- Hence this table. One row per day, and the history is the whole point:
-- Google's rule is about continuity, so what matters is not today's number
-- but whether the number has ever fallen below 12 since the run began. A
-- single reading cannot tell you that; a column of them can.
--
-- Deliberately keyed by date rather than by timestamp. Checking twice in one
-- day should correct that day's reading, not add a second one that makes the
-- history look like a dip.
CREATE TABLE IF NOT EXISTS public.android_beta_checks (
  checked_on    DATE PRIMARY KEY,
  -- What the Play Console dashboard said. The number Google actually judges.
  opted_in      INTEGER NOT NULL CHECK (opted_in >= 0),
  -- Google Group members on the same day, kept beside it because the gap
  -- between the two IS the drop-off: joining the group is step one, opting
  -- in is step two, and people stall between them.
  group_members INTEGER CHECK (group_members >= 0),
  note          TEXT,
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- No policies on purpose. Nothing in the browser reads or writes this - the
-- admin API uses the service role, which bypasses RLS - so enabling it with
-- no policy is the tightest setting available rather than an oversight.
ALTER TABLE public.android_beta_checks ENABLE ROW LEVEL SECURITY;
