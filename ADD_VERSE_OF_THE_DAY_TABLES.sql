-- Verse of the Day system (2026-09-02)
-- Run in the Supabase SQL editor.
--
-- Three tables:
--   verse_of_the_day_entries    the scheduled verses + saved breakdowns
--   verse_of_the_day_engagement one row per user per entry (read/bookmark/share)
--   verse_of_the_day_settings   single-row admin knobs (repeat period, alerts)
--
-- Statuses stored are draft / ready_for_review / approved / archived.
-- "Scheduled" and "published" are derived: approved + future date is
-- scheduled, approved + today-or-past date is published. That way nothing
-- has to flip a status at midnight.
--
-- Public read rule: only approved entries whose date has arrived somewhere
-- on Earth (UTC date + 1 covers every timezone ahead of UTC). The client
-- picks the row matching the USER'S local date, so nobody sees tomorrow's
-- verse early; the +1 only lets Kiribati load its today.

CREATE TABLE IF NOT EXISTS verse_of_the_day_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL,
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  verse_start INT NOT NULL,
  verse_end INT,
  translation TEXT NOT NULL DEFAULT 'KJV',
  verse_text TEXT NOT NULL,
  scheduled_date DATE UNIQUE,
  background_theme TEXT CHECK (background_theme IN ('purple-sunrise','blue-sunrise','green-mountains','orange-night')),
  title TEXT NOT NULL,
  author_section TEXT NOT NULL,
  context_section TEXT NOT NULL,
  meaning_section TEXT NOT NULL,
  application_section TEXT NOT NULL,
  takeaway TEXT NOT NULL,
  reflection_question TEXT NOT NULL,
  prayer TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','ready_for_review','approved','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  edited_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_votd_entries_status_date
  ON verse_of_the_day_entries (status, scheduled_date);

ALTER TABLE verse_of_the_day_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS votd_entries_public_read ON verse_of_the_day_entries;
CREATE POLICY votd_entries_public_read ON verse_of_the_day_entries
  FOR SELECT TO anon, authenticated
  USING (
    status = 'approved'
    AND scheduled_date IS NOT NULL
    AND scheduled_date <= ((now() AT TIME ZONE 'utc')::date + 1)
  );

-- No insert/update/delete policies on purpose: all writes go through the
-- service role (seed script and the admin API).

CREATE TABLE IF NOT EXISTS verse_of_the_day_engagement (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_id UUID NOT NULL REFERENCES verse_of_the_day_entries(id) ON DELETE CASCADE,
  opened_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  bookmarked BOOLEAN NOT NULL DEFAULT false,
  bookmarked_at TIMESTAMPTZ,
  shared_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, entry_id)
);

CREATE INDEX IF NOT EXISTS idx_votd_engagement_entry
  ON verse_of_the_day_engagement (entry_id);

ALTER TABLE verse_of_the_day_engagement ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS votd_engagement_select_own ON verse_of_the_day_engagement;
CREATE POLICY votd_engagement_select_own ON verse_of_the_day_engagement
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS votd_engagement_insert_own ON verse_of_the_day_engagement;
CREATE POLICY votd_engagement_insert_own ON verse_of_the_day_engagement
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS votd_engagement_update_own ON verse_of_the_day_engagement;
CREATE POLICY votd_engagement_update_own ON verse_of_the_day_engagement
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS verse_of_the_day_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  repeat_after_days INT NOT NULL DEFAULT 180,
  target_days_ahead INT NOT NULL DEFAULT 30,
  low_queue_thresholds INT[] NOT NULL DEFAULT '{10,5,2,1}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE verse_of_the_day_settings ENABLE ROW LEVEL SECURITY;
-- Service role only; no public policies.

INSERT INTO verse_of_the_day_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'verse_of_the_day tables ready' AS status;
