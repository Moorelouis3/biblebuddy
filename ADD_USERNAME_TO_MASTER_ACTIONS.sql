-- =====================================================
-- Add username column to master_actions table
-- =====================================================
--
-- PURPOSE: Store username for analytics visibility in action logs
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add username column to master_actions
ALTER TABLE public.master_actions
ADD COLUMN IF NOT EXISTS username text;

-- Add comment to document the column
COMMENT ON COLUMN public.master_actions.username IS 'Username for analytics visibility';

