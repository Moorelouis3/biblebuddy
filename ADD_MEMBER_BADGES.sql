-- Add member badge support
-- Run once in Supabase SQL Editor

ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS member_badge text;

COMMENT ON COLUMN public.profile_stats.member_badge IS
'Optional custom badge override: moderator, top_buddy, founder_buddy. Pro Buddy stays automatic from is_paid when no custom badge is set.';
