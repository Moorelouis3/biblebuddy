-- =====================================================
-- Add username column to profile_stats table
-- =====================================================
--
-- PURPOSE: Store username for analytics visibility
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add username column to profile_stats
ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS username text;

-- Add comment to document the column
COMMENT ON COLUMN public.profile_stats.username IS 'Username for analytics visibility';

