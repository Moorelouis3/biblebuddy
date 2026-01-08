-- Add payments column to profile_stats table
-- This column tracks active Stripe subscriptions (separate from Pro access)
ALTER TABLE public.profile_stats
ADD COLUMN IF NOT EXISTS payments BOOLEAN DEFAULT false;

-- Add comment to clarify the column purpose
COMMENT ON COLUMN public.profile_stats.payments IS 'True when user has an active paying Stripe subscription, false when subscription is canceled/deleted/inactive. Separate from membership_status.';

