-- Add trivia_questions_answered column to profile_stats table
-- Run this in Supabase SQL Editor

ALTER TABLE public.profile_stats
ADD COLUMN trivia_questions_answered integer DEFAULT 0;

COMMENT ON COLUMN public.profile_stats.trivia_questions_answered IS 'Total number of trivia questions answered by this user. Derived from master_actions table.';