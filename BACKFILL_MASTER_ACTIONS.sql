-- ─────────────────────────────────────────────────────────────────────────────
-- BACKFILL master_actions from existing feed/social activity
--
-- Safe to run multiple times — uses exact created_at match to deduplicate.
-- Backfilled rows get the source row's created_at so analytics time filters work.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Feed thoughts
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fp.user_id,
  'feed_post_thought',
  left(fp.content, 80),
  COALESCE(ps.display_name, ps.username, 'User'),
  fp.created_at
FROM feed_posts fp
LEFT JOIN profile_stats ps ON ps.user_id = fp.user_id
WHERE fp.post_type = 'thought'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fp.user_id
      AND ma.action_type = 'feed_post_thought'
      AND ma.created_at = fp.created_at
  );

-- 2. Feed prayers
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fp.user_id,
  'feed_post_prayer',
  'Prayer',
  COALESCE(ps.display_name, ps.username, 'User'),
  fp.created_at
FROM feed_posts fp
LEFT JOIN profile_stats ps ON ps.user_id = fp.user_id
WHERE fp.post_type = 'prayer'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fp.user_id
      AND ma.action_type = 'feed_post_prayer'
      AND ma.created_at = fp.created_at
  );

-- 3. Feed prayer requests
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fp.user_id,
  'feed_post_prayer_request',
  'Prayer Request',
  COALESCE(ps.display_name, ps.username, 'User'),
  fp.created_at
FROM feed_posts fp
LEFT JOIN profile_stats ps ON ps.user_id = fp.user_id
WHERE fp.post_type = 'prayer_request'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fp.user_id
      AND ma.action_type = 'feed_post_prayer_request'
      AND ma.created_at = fp.created_at
  );

-- 4. Feed photos
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fp.user_id,
  'feed_post_photo',
  'Photo post',
  COALESCE(ps.display_name, ps.username, 'User'),
  fp.created_at
FROM feed_posts fp
LEFT JOIN profile_stats ps ON ps.user_id = fp.user_id
WHERE fp.post_type = 'photo'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fp.user_id
      AND ma.action_type = 'feed_post_photo'
      AND ma.created_at = fp.created_at
  );

-- 5. Feed videos
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fp.user_id,
  'feed_post_video',
  'Video post',
  COALESCE(ps.display_name, ps.username, 'User'),
  fp.created_at
FROM feed_posts fp
LEFT JOIN profile_stats ps ON ps.user_id = fp.user_id
WHERE fp.post_type = 'video'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fp.user_id
      AND ma.action_type = 'feed_post_video'
      AND ma.created_at = fp.created_at
  );

-- 6. Feed likes (love reactions only)
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fpr.user_id,
  'feed_post_liked',
  'post:' || fpr.post_id,
  COALESCE(ps.display_name, ps.username, 'User'),
  fpr.created_at
FROM feed_post_reactions fpr
LEFT JOIN profile_stats ps ON ps.user_id = fpr.user_id
WHERE fpr.reaction_type = 'love'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fpr.user_id
      AND ma.action_type = 'feed_post_liked'
      AND ma.created_at = fpr.created_at
  );

-- 7. Feed comments (top-level)
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fpc.user_id,
  'feed_post_commented',
  'post:' || fpc.post_id,
  COALESCE(ps.display_name, ps.username, 'User'),
  fpc.created_at
FROM feed_post_comments fpc
LEFT JOIN profile_stats ps ON ps.user_id = fpc.user_id
WHERE fpc.parent_comment_id IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fpc.user_id
      AND ma.action_type = 'feed_post_commented'
      AND ma.created_at = fpc.created_at
  );

-- 8. Feed replies
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  fpc.user_id,
  'feed_post_replied',
  'post:' || fpc.post_id,
  COALESCE(ps.display_name, ps.username, 'User'),
  fpc.created_at
FROM feed_post_comments fpc
LEFT JOIN profile_stats ps ON ps.user_id = fpc.user_id
WHERE fpc.parent_comment_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = fpc.user_id
      AND ma.action_type = 'feed_post_replied'
      AND ma.created_at = fpc.created_at
  );

-- 9. Buddy connections (log from sender's perspective when request was accepted)
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  br.sender_id,
  'buddy_added',
  COALESCE(ps_r.display_name, ps_r.username, 'Bible Buddy'),
  COALESCE(ps_s.display_name, ps_s.username, 'User'),
  br.created_at
FROM buddy_requests br
LEFT JOIN profile_stats ps_s ON ps_s.user_id = br.sender_id
LEFT JOIN profile_stats ps_r ON ps_r.user_id = br.receiver_id
WHERE br.status = 'accepted'
  AND NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = br.sender_id
      AND ma.action_type = 'buddy_added'
      AND ma.created_at = br.created_at
  );

-- 10. Group posts / messages
INSERT INTO master_actions (user_id, action_type, action_label, username, created_at)
SELECT
  gp.user_id,
  'group_message_sent',
  left(COALESCE(gp.content, ''), 80),
  COALESCE(ps.display_name, ps.username, 'User'),
  gp.created_at
FROM group_posts gp
LEFT JOIN profile_stats ps ON ps.user_id = gp.user_id
WHERE NOT EXISTS (
    SELECT 1 FROM master_actions ma
    WHERE ma.user_id = gp.user_id
      AND ma.action_type = 'group_message_sent'
      AND ma.created_at = gp.created_at
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- Done. Check counts:
-- SELECT action_type, count(*) FROM master_actions GROUP BY action_type ORDER BY count DESC;
-- ─────────────────────────────────────────────────────────────────────────────
