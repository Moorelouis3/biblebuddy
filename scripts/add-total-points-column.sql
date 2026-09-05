-- Points & levels relaunch (2026-09-05): optional cache column.
-- Everything works without it (points are derived from master_actions and
-- current_level is the only required cache), but with this column the
-- computed total is also stored so leaderboards and admin views can read
-- it without recomputing. Paste into the Supabase SQL editor and run once.

alter table public.profile_stats
  add column if not exists total_points integer not null default 0;

comment on column public.profile_stats.total_points is
  'Cache of the derived points total from lib/pointsEngine.ts. Never hand-edited; recomputed from master_actions.';
