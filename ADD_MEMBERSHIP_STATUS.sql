-- Add membership_status column to profile_stats table
ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS membership_status TEXT DEFAULT 'free';

-- Update all existing rows to 'free' if they are NULL
UPDATE public.profile_stats
SET membership_status = 'free'
WHERE membership_status IS NULL;

-- Ensure default is set for future inserts
ALTER TABLE public.profile_stats
ALTER COLUMN membership_status SET DEFAULT 'free';

