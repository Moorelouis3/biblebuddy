-- ─────────────────────────────────────────────────────────────────────────────
-- FIX: social notifications pointed at '/bb-feed', which does not exist (404).
-- The feed now lives at '/dashboard?view=group'. (2026-09-21)
--
-- This re-creates the three trigger functions from ADD_SOCIAL_NOTIFICATIONS.sql
-- with the new URL and rewrites existing notification rows. Triggers themselves
-- are unchanged (they already call these functions by name).
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ─────────────────────────────────────────────────────────────────────────────

BEGIN;

-- Trigger 1: someone liked your post
CREATE OR REPLACE FUNCTION notify_on_feed_post_reaction()
RETURNS TRIGGER AS $$
DECLARE
  post_owner_id uuid;
  liker_name    text;
BEGIN
  SELECT user_id INTO post_owner_id FROM feed_posts WHERE id = NEW.post_id;

  IF post_owner_id IS NULL OR post_owner_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(display_name, username, 'Someone')
    INTO liker_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, message, article_slug)
  VALUES (
    post_owner_id,
    'feed_post_liked',
    NEW.user_id,
    liker_name,
    NEW.post_id,
    liker_name || ' liked your post ❤️',
    '/dashboard?view=group'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger 2: someone commented on / replied to your post or comment
CREATE OR REPLACE FUNCTION notify_on_feed_comment()
RETURNS TRIGGER AS $$
DECLARE
  post_owner_id      uuid;
  parent_owner_id    uuid;
  commenter_name     text;
BEGIN
  SELECT user_id INTO post_owner_id FROM feed_posts WHERE id = NEW.post_id;

  SELECT COALESCE(display_name, username, 'Someone')
    INTO commenter_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  IF post_owner_id IS NOT NULL AND post_owner_id != NEW.user_id THEN
    INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, comment_id, message, article_slug)
    VALUES (
      post_owner_id,
      CASE WHEN NEW.parent_comment_id IS NOT NULL THEN 'feed_post_replied' ELSE 'feed_post_commented' END,
      NEW.user_id,
      commenter_name,
      NEW.post_id,
      NEW.id,
      CASE
        WHEN NEW.parent_comment_id IS NOT NULL THEN commenter_name || ' replied to your post 💬'
        ELSE commenter_name || ' commented on your post 💬'
      END,
      '/dashboard?view=group'
    );
  END IF;

  IF NEW.parent_comment_id IS NOT NULL THEN
    SELECT user_id INTO parent_owner_id
      FROM feed_post_comments WHERE id = NEW.parent_comment_id;

    IF parent_owner_id IS NOT NULL
       AND parent_owner_id != NEW.user_id
       AND parent_owner_id != post_owner_id THEN
      INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, comment_id, message, article_slug)
      VALUES (
        parent_owner_id,
        'feed_post_replied',
        NEW.user_id,
        commenter_name,
        NEW.post_id,
        NEW.id,
        commenter_name || ' replied to your comment 💬',
        '/dashboard?view=group'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger 3: a buddy posted to the feed
CREATE OR REPLACE FUNCTION notify_buddies_on_feed_post()
RETURNS TRIGGER AS $$
DECLARE
  poster_name  text;
  preview      text;
  buddy_record RECORD;
BEGIN
  SELECT COALESCE(display_name, username, 'A Bible Buddy')
    INTO poster_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  preview := CASE
    WHEN NEW.post_type = 'photo'          THEN poster_name || ' shared a photo 📸'
    WHEN NEW.post_type = 'video'          THEN poster_name || ' shared a video 🎬'
    WHEN NEW.post_type = 'prayer'         THEN poster_name || ' shared a prayer 🙏'
    WHEN NEW.post_type = 'prayer_request' THEN poster_name || ' shared a prayer request 🙏'
    ELSE poster_name || ' posted: ' || left(NEW.content, 60)
  END;

  FOR buddy_record IN
    SELECT
      CASE WHEN br.sender_id = NEW.user_id THEN br.receiver_id ELSE br.sender_id END AS buddy_id
    FROM buddy_requests br
    WHERE (br.sender_id = NEW.user_id OR br.receiver_id = NEW.user_id)
      AND br.status = 'accepted'
  LOOP
    INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, message, article_slug)
    VALUES (
      buddy_record.buddy_id,
      'buddy_posted',
      NEW.user_id,
      poster_name,
      NEW.id,
      preview,
      '/dashboard?view=group'
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Existing rows: point old '/bb-feed' links at the feed.
UPDATE notifications
   SET article_slug = '/dashboard?view=group'
 WHERE article_slug = '/bb-feed'
    OR article_slug LIKE '/bb-feed/%'
    OR article_slug LIKE '/bb-feed?%'
    OR article_slug LIKE '/bb-feed#%';

COMMIT;
