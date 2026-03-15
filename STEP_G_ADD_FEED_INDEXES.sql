-- ============================================================
-- STEP G: Performance indexes for feed queries
-- Run in Supabase SQL Editor
-- Safe to re-run — all use CREATE INDEX IF NOT EXISTS
-- ============================================================

-- ── feed_posts ────────────────────────────────────────────────────────────────

-- Community tab: WHERE visibility = 'community' AND created_at >= $date ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_feed_posts_visibility_created
  ON public.feed_posts (visibility, created_at DESC);

-- My Feed / Buddies tab: WHERE user_id = $uid ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_feed_posts_user_created
  ON public.feed_posts (user_id, created_at DESC);

-- ── feed_activity ─────────────────────────────────────────────────────────────

-- Community tab: WHERE is_public = true AND created_at >= $date ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_feed_activity_public_created
  ON public.feed_activity (is_public, created_at DESC);

-- Buddies tab: WHERE user_id IN (...) AND is_public = true ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_feed_activity_user_public_created
  ON public.feed_activity (user_id, is_public, created_at DESC);

-- My Feed tab: WHERE user_id = $uid ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_feed_activity_user_created
  ON public.feed_activity (user_id, created_at DESC);

-- ── feed_post_reactions ───────────────────────────────────────────────────────

-- Load my reactions: WHERE user_id = $uid AND post_id IN (...)
CREATE INDEX IF NOT EXISTS idx_feed_post_reactions_user_post
  ON public.feed_post_reactions (user_id, post_id);

-- Delete reactions on post delete: WHERE post_id = $id
CREATE INDEX IF NOT EXISTS idx_feed_post_reactions_post
  ON public.feed_post_reactions (post_id);

-- ── feed_post_comments ────────────────────────────────────────────────────────

-- Load comments for a post: WHERE post_id = $id ORDER BY created_at ASC
CREATE INDEX IF NOT EXISTS idx_feed_post_comments_post_created
  ON public.feed_post_comments (post_id, created_at ASC);

-- ── group_members ─────────────────────────────────────────────────────────────

-- List members of a group: WHERE group_id = $id
CREATE INDEX IF NOT EXISTS idx_group_members_group
  ON public.group_members (group_id);

-- Check if a user is in a group / load user's groups: WHERE user_id = $uid
CREATE INDEX IF NOT EXISTS idx_group_members_user
  ON public.group_members (user_id);

-- ── buddies ───────────────────────────────────────────────────────────────────

-- Buddy lookups: OR user_id_1 = $uid OR user_id_2 = $uid
CREATE INDEX IF NOT EXISTS idx_buddies_user1
  ON public.buddies (user_id_1);

CREATE INDEX IF NOT EXISTS idx_buddies_user2
  ON public.buddies (user_id_2);

-- ── Verify: list all new indexes ─────────────────────────────────────────────
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;
