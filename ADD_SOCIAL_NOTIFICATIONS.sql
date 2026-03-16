-- ─────────────────────────────────────────────────────────────────────────────
-- SOCIAL NOTIFICATIONS — likes, comments, buddy posts, group posts
-- Run in Supabase SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Step 1: Add missing columns to notifications table
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS from_user_id uuid,
  ADD COLUMN IF NOT EXISTS post_id     uuid;

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger 1: Notify post owner when someone likes their post
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_on_feed_post_reaction()
RETURNS TRIGGER AS $$
DECLARE
  post_owner_id uuid;
  liker_name    text;
BEGIN
  -- Look up post owner
  SELECT user_id INTO post_owner_id FROM feed_posts WHERE id = NEW.post_id;

  -- Don't notify if liking your own post or post not found
  IF post_owner_id IS NULL OR post_owner_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  -- Get liker display name
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
    '/bb-feed'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_feed_post_reaction ON feed_post_reactions;
CREATE TRIGGER on_feed_post_reaction
  AFTER INSERT ON feed_post_reactions
  FOR EACH ROW EXECUTE PROCEDURE notify_on_feed_post_reaction();

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger 2: Notify post owner (and parent commenter) when someone comments
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_on_feed_comment()
RETURNS TRIGGER AS $$
DECLARE
  post_owner_id      uuid;
  parent_owner_id    uuid;
  commenter_name     text;
BEGIN
  -- Get post owner
  SELECT user_id INTO post_owner_id FROM feed_posts WHERE id = NEW.post_id;

  -- Get commenter display name
  SELECT COALESCE(display_name, username, 'Someone')
    INTO commenter_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  -- Notify post owner (skip if commenting on own post)
  IF post_owner_id IS NOT NULL AND post_owner_id != NEW.user_id THEN
    INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, message, article_slug)
    VALUES (
      post_owner_id,
      CASE WHEN NEW.parent_comment_id IS NOT NULL THEN 'feed_post_replied' ELSE 'feed_post_commented' END,
      NEW.user_id,
      commenter_name,
      NEW.post_id,
      CASE
        WHEN NEW.parent_comment_id IS NOT NULL THEN commenter_name || ' replied to your post 💬'
        ELSE commenter_name || ' commented on your post 💬'
      END,
      '/bb-feed'
    );
  END IF;

  -- If this is a reply, also notify the parent comment's author (if different from post owner)
  IF NEW.parent_comment_id IS NOT NULL THEN
    SELECT user_id INTO parent_owner_id
      FROM feed_post_comments WHERE id = NEW.parent_comment_id;

    IF parent_owner_id IS NOT NULL
       AND parent_owner_id != NEW.user_id
       AND parent_owner_id != post_owner_id THEN
      INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, message, article_slug)
      VALUES (
        parent_owner_id,
        'feed_post_replied',
        NEW.user_id,
        commenter_name,
        NEW.post_id,
        commenter_name || ' replied to your comment 💬',
        '/bb-feed'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_feed_comment ON feed_post_comments;
CREATE TRIGGER on_feed_comment
  AFTER INSERT ON feed_post_comments
  FOR EACH ROW EXECUTE PROCEDURE notify_on_feed_comment();

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger 3: Notify all accepted buddies when a user posts to the feed
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_buddies_on_feed_post()
RETURNS TRIGGER AS $$
DECLARE
  poster_name  text;
  preview      text;
  buddy_record RECORD;
BEGIN
  -- Get poster display name
  SELECT COALESCE(display_name, username, 'A Bible Buddy')
    INTO poster_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  -- Build notification preview
  preview := CASE
    WHEN NEW.post_type = 'photo'          THEN poster_name || ' shared a photo 📸'
    WHEN NEW.post_type = 'video'          THEN poster_name || ' shared a video 🎬'
    WHEN NEW.post_type = 'prayer'         THEN poster_name || ' shared a prayer 🙏'
    WHEN NEW.post_type = 'prayer_request' THEN poster_name || ' shared a prayer request 🙏'
    ELSE poster_name || ' posted: ' || left(NEW.content, 60)
  END;

  -- Notify each accepted buddy
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
      '/bb-feed'
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_feed_post_insert ON feed_posts;
CREATE TRIGGER on_feed_post_insert
  AFTER INSERT ON feed_posts
  FOR EACH ROW EXECUTE PROCEDURE notify_buddies_on_feed_post();

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger 4: Notify group members when someone posts in their group
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_group_members_on_post()
RETURNS TRIGGER AS $$
DECLARE
  poster_name   text;
  group_name_v  text;
  member_record RECORD;
BEGIN
  -- Get poster display name
  SELECT COALESCE(display_name, username, 'A member')
    INTO poster_name
    FROM profile_stats WHERE user_id = NEW.user_id;

  -- Get group name
  SELECT name INTO group_name_v FROM study_groups WHERE id = NEW.group_id;

  -- Notify all other group members
  FOR member_record IN
    SELECT user_id FROM study_group_members
    WHERE group_id = NEW.group_id AND user_id != NEW.user_id
  LOOP
    INSERT INTO notifications (user_id, type, from_user_id, from_user_name, post_id, message, article_slug)
    VALUES (
      member_record.user_id,
      'group_post',
      NEW.user_id,
      poster_name,
      NEW.id,
      poster_name || ' posted in ' || COALESCE(group_name_v, 'your group') || ' 👥',
      '/study-groups/' || NEW.group_id || '/chat'
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_group_post_insert ON group_posts;
CREATE TRIGGER on_group_post_insert
  AFTER INSERT ON group_posts
  FOR EACH ROW EXECUTE PROCEDURE notify_group_members_on_post();
