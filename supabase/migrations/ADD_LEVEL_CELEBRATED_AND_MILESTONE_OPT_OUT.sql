-- =====================================================
-- Levels: celebration bookkeeping + milestone opt-out
-- 2026-11-10. Run this BEFORE scripts/recompute-all-levels.ts.
-- =====================================================
--
-- Two nullable columns on profile_stats. No new table, no data rewritten,
-- nothing dropped. Both are additive and safe to run on the live table: an
-- ALTER TABLE ... ADD COLUMN with no DEFAULT and no NOT NULL takes a brief
-- metadata lock and does not rewrite the 6,633 rows.
--
-- Re-runnable: both use IF NOT EXISTS.
-- =====================================================


-- 1. level_celebrated -------------------------------------------------------
--
-- The high-water mark of what the user has actually been SHOWN, as opposed to
-- current_level, which is what they have EARNED. The gap between the two is
-- what is owed.
--
-- Why this exists (defects D1 and D2, docs/LEVELS_PROPOSAL_2026-11-10.md §1.7):
-- /api/points/summary used to bank the new current_level and report the
-- level-up in the same request. If the modal never rendered - the user
-- navigated away, the tab was backgrounded, the app was killed, the fetch
-- resolved after unmount - the level was already saved, so the celebration was
-- lost for good and nothing recorded that it was owed.
--
-- Now a celebration is owed while current_level > coalesce(level_celebrated, 0),
-- which survives reloads, devices, app restarts and server retries. The client
-- clears it through POST /api/points/celebrated, which writes
-- max(level_celebrated, :level) - monotonic, so a retry or two racing tabs
-- cannot double-fire it or move it backwards.

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS level_celebrated integer;

COMMENT ON COLUMN public.profile_stats.level_celebrated IS
'Highest level this user has been shown a celebration for. A level-up is owed while current_level > coalesce(level_celebrated, 0). Written only by POST /api/points/celebrated as a monotonic high-water mark. NULL means never celebrated; the 2026-11-10 backfill sets it to current_level for every existing row so nobody is greeted retroactively.';


-- 2. milestone_posts_enabled ------------------------------------------------
--
-- Opt-out for the automatic community posts in lib/communityMilestones.ts.
--
-- NULL and TRUE both mean enabled, which is why there is no backfill and no
-- DEFAULT: existing behaviour is unchanged for all 6,633 rows, and only a user
-- who actively turns it off gets FALSE. postMilestoneToWall checks
-- `milestone_posts_enabled IS NOT FALSE`.
--
-- This covers level-up announcements and the three existing milestone types
-- together, because somebody who does not want their reading announced does
-- not want their level announced either.

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS milestone_posts_enabled boolean;

COMMENT ON COLUMN public.profile_stats.milestone_posts_enabled IS
'Opt-out for automatic community milestone posts. NULL and TRUE both mean enabled, so no backfill is needed; only FALSE suppresses. Checked by lib/communityMilestones.ts postMilestoneToWall.';


-- Verification: both columns present, both nullable, neither with a default.
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profile_stats'
  AND column_name IN ('level_celebrated', 'milestone_posts_enabled')
ORDER BY column_name;
