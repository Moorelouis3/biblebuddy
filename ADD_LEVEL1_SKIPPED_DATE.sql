-- Add level_1_skipped_date column to profile_stats
-- Tracks the last date the user skipped a Level 1 daily recommendation
-- (devotional or reading plan). While within 3 days of this date,
-- the daily popup shows Level 2 recommendations instead.

ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS level_1_skipped_date date;
