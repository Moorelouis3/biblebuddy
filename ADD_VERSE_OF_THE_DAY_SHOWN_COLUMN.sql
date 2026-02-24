-- Add a column to track if the verse of the day overlay has been shown for the current day
ALTER TABLE profile_stats
ADD COLUMN verse_of_the_day_shown DATE;

-- Optionally, you could use a boolean and a date, but a date column is simplest for daily tracking.
-- If you want a boolean, you must also track the date to reset it daily.
-- This migration adds only the date column for simplicity.