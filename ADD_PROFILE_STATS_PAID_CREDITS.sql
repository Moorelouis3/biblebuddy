ALTER TABLE IF EXISTS profile_stats
  ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS daily_credits integer DEFAULT 5,
  ADD COLUMN IF NOT EXISTS last_credit_reset date;
