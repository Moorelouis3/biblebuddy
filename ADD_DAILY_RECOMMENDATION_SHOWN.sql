-- Add daily_recommendation_shown column to profile_stats
-- Tracks the last date the daily recommendation popup was shown
-- Uses same pattern as verse_of_the_day_shown

ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS daily_recommendation_shown date;
