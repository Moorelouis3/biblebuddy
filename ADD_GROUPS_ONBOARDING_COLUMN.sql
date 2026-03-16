-- Add groups_onboarding_completed column to profile_stats
-- Run this once in the Supabase SQL editor

ALTER TABLE profile_stats
  ADD COLUMN IF NOT EXISTS groups_onboarding_completed BOOLEAN DEFAULT FALSE;
