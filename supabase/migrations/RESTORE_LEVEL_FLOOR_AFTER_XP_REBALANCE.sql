alter table public.profile_stats
  add column if not exists level_floor_restored_at timestamptz;

-- Founder repair: the XP rebalance briefly pushed Louis from level 12 to level 8.
-- Keep his earned level and let the app display the minimum XP needed for that level.
update public.profile_stats ps
set
  current_level = greatest(coalesce(ps.current_level, 1), 12),
  level_floor_restored_at = coalesce(ps.level_floor_restored_at, now())
from auth.users u
where u.id = ps.user_id
  and lower(u.email) = 'moorelouis3@gmail.com';

-- Safety floor for everyone else: never treat missing/invalid levels as below level 1.
update public.profile_stats
set
  current_level = greatest(coalesce(current_level, 1), 1),
  level_floor_restored_at = coalesce(level_floor_restored_at, now())
where current_level is null or current_level < 1;
