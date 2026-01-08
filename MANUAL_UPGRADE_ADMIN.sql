-- Manual upgrade script for admin account
-- This upgrades the user with email 'moorelouis3@gmail.com' to Pro status
-- Run this in your Supabase SQL editor if you already paid but account shows 'free'

-- First, find your user_id from auth.users
-- (You can also get this from the profile_stats table if it exists)
-- SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com';

-- Update profile_stats to set membership_status = 'pro'
-- This uses upsert to create the row if it doesn't exist
INSERT INTO public.profile_stats (user_id, membership_status)
SELECT 
  id as user_id,
  'pro' as membership_status
FROM auth.users
WHERE email = 'moorelouis3@gmail.com'
ON CONFLICT (user_id) 
DO UPDATE SET membership_status = 'pro';

-- Verify the update worked
SELECT 
  ps.user_id,
  u.email,
  ps.membership_status,
  ps.created_at,
  ps.updated_at
FROM public.profile_stats ps
JOIN auth.users u ON u.id = ps.user_id
WHERE u.email = 'moorelouis3@gmail.com';

