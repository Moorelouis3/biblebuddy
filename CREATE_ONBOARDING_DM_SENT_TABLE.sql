-- Run this in the Supabase SQL editor ONCE before deploying the onboarding cron.
--
-- Tracks which onboarding DM days have been sent to each user so the cron
-- never sends the same day twice.

CREATE TABLE IF NOT EXISTS onboarding_dm_sent (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_number integer     NOT NULL CHECK (day_number BETWEEN 1 AND 4),
  sent_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, day_number)
);

-- Only the service role needs access (cron runs server-side)
ALTER TABLE onboarding_dm_sent ENABLE ROW LEVEL SECURITY;
-- No user-facing policies needed — accessed only via service role key
