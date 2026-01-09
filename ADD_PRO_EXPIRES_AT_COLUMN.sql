-- Add pro_expires_at column to profile_stats table
-- This column stores the expiration date for time-limited Pro access (e.g., 30-day trial)
ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS pro_expires_at TIMESTAMPTZ;

-- Add comment to clarify the column purpose
COMMENT ON COLUMN public.profile_stats.pro_expires_at IS 'Expiration timestamp for time-limited Pro access. When this date passes, user should revert to Free. NULL means no expiration (permanent Pro or Free).';

