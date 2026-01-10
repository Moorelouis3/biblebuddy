-- =====================================================
-- Add devotional_days_completed_count column to profile_stats
-- =====================================================
-- 
-- PURPOSE: Track total devotional days completed by user
-- Follows the same pattern as chapters_completed_count, people_learned_count, etc.
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add column with default value 0, non-null
ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS devotional_days_completed_count integer DEFAULT 0 NOT NULL;

-- The existing RLS policies on profile_stats will automatically allow
-- updates to this new column since they use USING (auth.uid() = user_id)
-- which covers all columns in the table.

-- Verification: Check that column was added
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profile_stats'
  AND column_name = 'devotional_days_completed_count';

