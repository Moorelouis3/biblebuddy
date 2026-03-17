-- Group activity alerts
-- Run once in the Supabase SQL Editor

ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS from_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS post_id uuid,
  ADD COLUMN IF NOT EXISTS comment_id uuid,
  ADD COLUMN IF NOT EXISTS article_slug text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS is_read boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_notifications_user_created_at
  ON public.notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_is_read
  ON public.notifications (user_id, is_read, created_at DESC);

CREATE OR REPLACE FUNCTION public.notification_actor_name(
  p_user_id uuid,
  p_fallback text DEFAULT 'Someone'
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_name text;
BEGIN
  SELECT COALESCE(NULLIF(display_name, ''), NULLIF(username, ''), p_fallback)
  INTO v_name
  FROM public.profile_stats
  WHERE user_id = p_user_id;

  RETURN COALESCE(v_name, p_fallback);
END;
$$;

CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_type text,
  p_from_user_id uuid,
  p_from_user_name text,
  p_message text,
  p_article_slug text DEFAULT NULL,
  p_post_id uuid DEFAULT NULL,
  p_comment_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_user_id IS NULL THEN
    RETURN;
  END IF;

  IF p_from_user_id IS NOT NULL AND p_user_id = p_from_user_id THEN
    RETURN;
  END IF;

  INSERT INTO public.notifications (
    user_id,
    type,
    from_user_id,
    from_user_name,
    article_slug,
    post_id,
    comment_id,
    message
  )
  VALUES (
    p_user_id,
    p_type,
    p_from_user_id,
    p_from_user_name,
    p_article_slug,
    p_post_id,
    p_comment_id,
    p_message
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_group_broadcast_post()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_group_name text;
  v_route text;
  v_member record;
BEGIN
  IF NEW.parent_post_id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));
  SELECT name INTO v_group_name FROM public.study_groups WHERE id = NEW.group_id;
  v_route := '/study-groups/' || NEW.group_id || '/chat';

  FOR v_member IN
    SELECT gm.user_id
    FROM public.group_members gm
    WHERE gm.group_id = NEW.group_id
      AND gm.status = 'approved'
  LOOP
    PERFORM public.create_notification(
      v_member.user_id,
      'group_post',
      NEW.user_id,
      v_actor_name,
      v_actor_name || ' posted in ' || COALESCE(v_group_name, 'your group'),
      v_route,
      NEW.id,
      NULL
    );
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_group_post_thread_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_parent public.group_posts%ROWTYPE;
  v_root public.group_posts%ROWTYPE;
  v_route text;
BEGIN
  IF NEW.parent_post_id IS NULL THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));

  SELECT *
  INTO v_parent
  FROM public.group_posts
  WHERE id = NEW.parent_post_id;

  IF NOT FOUND THEN
    RETURN NEW;
  END IF;

  IF v_parent.parent_post_id IS NULL THEN
    v_root := v_parent;
  ELSE
    SELECT *
    INTO v_root
    FROM public.group_posts
    WHERE id = v_parent.parent_post_id;
  END IF;

  v_route := '/study-groups/' || NEW.group_id || '/chat';

  IF v_root.user_id IS NOT NULL AND v_root.user_id <> NEW.user_id THEN
    PERFORM public.create_notification(
      v_root.user_id,
      CASE WHEN v_parent.parent_post_id IS NULL THEN 'group_post_commented' ELSE 'group_post_replied' END,
      NEW.user_id,
      v_actor_name,
      CASE
        WHEN v_parent.parent_post_id IS NULL THEN v_actor_name || ' replied to your post'
        ELSE v_actor_name || ' replied in your post thread'
      END,
      v_route,
      COALESCE(v_root.id, NEW.parent_post_id),
      NEW.id
    );
  END IF;

  IF v_parent.parent_post_id IS NOT NULL
     AND v_parent.user_id IS NOT NULL
     AND v_parent.user_id <> NEW.user_id
     AND v_parent.user_id <> v_root.user_id THEN
    PERFORM public.create_notification(
      v_parent.user_id,
      'group_post_replied',
      NEW.user_id,
      v_actor_name,
      v_actor_name || ' replied to your reply',
      v_route,
      COALESCE(v_root.id, v_parent.id),
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_group_post_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_target public.group_posts%ROWTYPE;
  v_root_id uuid;
  v_route text;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, 'A member');

  SELECT *
  INTO v_target
  FROM public.group_posts
  WHERE id = NEW.post_id;

  IF NOT FOUND OR v_target.user_id IS NULL OR v_target.user_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  v_root_id := COALESCE(v_target.parent_post_id, v_target.id);
  v_route := '/study-groups/' || v_target.group_id || '/chat';

  PERFORM public.create_notification(
    v_target.user_id,
    CASE WHEN v_target.parent_post_id IS NULL THEN 'group_post_liked' ELSE 'group_reply_liked' END,
    NEW.user_id,
    v_actor_name,
    CASE
      WHEN v_target.parent_post_id IS NULL THEN v_actor_name || ' liked your post'
      ELSE v_actor_name || ' liked your reply'
    END,
    v_route,
    v_root_id,
    v_target.id
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_post_published()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_member record;
  v_route text;
BEGIN
  IF TG_OP = 'INSERT' AND NOT NEW.is_published THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND (OLD.is_published = NEW.is_published OR NOT NEW.is_published) THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.created_by, 'A leader');
  v_route := '/study-groups/' || NEW.group_id || '/series';

  FOR v_member IN
    SELECT gm.user_id
    FROM public.group_members gm
    WHERE gm.group_id = NEW.group_id
      AND gm.status = 'approved'
  LOOP
    PERFORM public.create_notification(
      v_member.user_id,
      'group_series_post',
      NEW.created_by,
      v_actor_name,
      v_actor_name || ' published Week ' || NEW.week_number || ': ' || NEW.title,
      v_route,
      NEW.id,
      NULL
    );
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_post_comment_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_post public.group_series_posts%ROWTYPE;
  v_parent public.group_series_post_comments%ROWTYPE;
  v_route text;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));

  SELECT *
  INTO v_post
  FROM public.group_series_posts
  WHERE id = NEW.post_id;

  IF NOT FOUND THEN
    RETURN NEW;
  END IF;

  v_route := '/study-groups/' || NEW.group_id || '/series';

  IF NEW.parent_comment_id IS NULL THEN
    IF v_post.created_by IS NOT NULL AND v_post.created_by <> NEW.user_id THEN
      PERFORM public.create_notification(
        v_post.created_by,
        'group_series_commented',
        NEW.user_id,
        v_actor_name,
        v_actor_name || ' commented on Week ' || v_post.week_number || ': ' || v_post.title,
        v_route,
        NEW.post_id,
        NEW.id
      );
    END IF;

    RETURN NEW;
  END IF;

  SELECT *
  INTO v_parent
  FROM public.group_series_post_comments
  WHERE id = NEW.parent_comment_id;

  IF v_post.created_by IS NOT NULL AND v_post.created_by <> NEW.user_id THEN
    PERFORM public.create_notification(
      v_post.created_by,
      'group_series_replied',
      NEW.user_id,
      v_actor_name,
      v_actor_name || ' replied in your Week ' || v_post.week_number || ' discussion',
      v_route,
      NEW.post_id,
      NEW.id
    );
  END IF;

  IF v_parent.user_id IS NOT NULL
     AND v_parent.user_id <> NEW.user_id
     AND v_parent.user_id <> v_post.created_by THEN
    PERFORM public.create_notification(
      v_parent.user_id,
      'group_series_replied',
      NEW.user_id,
      v_actor_name,
      v_actor_name || ' replied to your comment',
      v_route,
      NEW.post_id,
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_post_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_post public.group_series_posts%ROWTYPE;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, 'A member');

  SELECT *
  INTO v_post
  FROM public.group_series_posts
  WHERE id = NEW.post_id;

  IF NOT FOUND OR v_post.created_by IS NULL OR v_post.created_by = NEW.user_id THEN
    RETURN NEW;
  END IF;

  PERFORM public.create_notification(
    v_post.created_by,
    'group_series_post_liked',
    NEW.user_id,
    v_actor_name,
    v_actor_name || ' liked your study post',
    '/study-groups/' || v_post.group_id || '/series',
    v_post.id,
    NULL
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_comment_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_comment public.group_series_post_comments%ROWTYPE;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, 'A member');

  SELECT *
  INTO v_comment
  FROM public.group_series_post_comments
  WHERE id = NEW.comment_id;

  IF NOT FOUND OR v_comment.user_id IS NULL OR v_comment.user_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  PERFORM public.create_notification(
    v_comment.user_id,
    'group_series_reply_liked',
    NEW.user_id,
    v_actor_name,
    v_actor_name || ' liked your comment',
    '/study-groups/' || v_comment.group_id || '/series',
    v_comment.post_id,
    v_comment.id
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_reflection_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_group_id uuid;
  v_member record;
  v_parent public.series_reflections%ROWTYPE;
  v_root public.series_reflections%ROWTYPE;
  v_route text;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));

  SELECT gs.group_id
  INTO v_group_id
  FROM public.group_series gs
  WHERE gs.id = NEW.series_id;

  IF v_group_id IS NULL THEN
    RETURN NEW;
  END IF;

  v_route := '/study-groups/' || v_group_id || '/series/week/' || NEW.week_number;

  IF NEW.parent_reflection_id IS NULL THEN
    FOR v_member IN
      SELECT gm.user_id
      FROM public.group_members gm
      WHERE gm.group_id = v_group_id
        AND gm.status = 'approved'
    LOOP
      PERFORM public.create_notification(
        v_member.user_id,
        'series_reflection',
        NEW.user_id,
        v_actor_name,
        v_actor_name || ' posted a reflection for Week ' || NEW.week_number,
        v_route,
        NEW.id,
        NEW.id
      );
    END LOOP;

    RETURN NEW;
  END IF;

  SELECT *
  INTO v_parent
  FROM public.series_reflections
  WHERE id = NEW.parent_reflection_id;

  IF NOT FOUND THEN
    RETURN NEW;
  END IF;

  IF v_parent.parent_reflection_id IS NULL THEN
    v_root := v_parent;
  ELSE
    SELECT *
    INTO v_root
    FROM public.series_reflections
    WHERE id = v_parent.parent_reflection_id;
  END IF;

  IF v_root.user_id IS NOT NULL AND v_root.user_id <> NEW.user_id THEN
    PERFORM public.create_notification(
      v_root.user_id,
      'series_reflection_replied',
      NEW.user_id,
      v_actor_name,
      CASE
        WHEN v_parent.parent_reflection_id IS NULL THEN v_actor_name || ' replied to your reflection'
        ELSE v_actor_name || ' replied in your reflection thread'
      END,
      v_route,
      COALESCE(v_root.id, v_parent.id),
      NEW.id
    );
  END IF;

  IF v_parent.parent_reflection_id IS NOT NULL
     AND v_parent.user_id IS NOT NULL
     AND v_parent.user_id <> NEW.user_id
     AND v_parent.user_id <> v_root.user_id THEN
    PERFORM public.create_notification(
      v_parent.user_id,
      'series_reflection_replied',
      NEW.user_id,
      v_actor_name,
      v_actor_name || ' replied to your reply',
      v_route,
      COALESCE(v_root.id, v_parent.id),
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_series_reflection_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_reflection public.series_reflections%ROWTYPE;
  v_group_id uuid;
BEGIN
  v_actor_name := public.notification_actor_name(NEW.user_id, 'A member');

  SELECT *
  INTO v_reflection
  FROM public.series_reflections
  WHERE id = NEW.reflection_id;

  IF NOT FOUND OR v_reflection.user_id IS NULL OR v_reflection.user_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  SELECT gs.group_id
  INTO v_group_id
  FROM public.group_series gs
  WHERE gs.id = v_reflection.series_id;

  PERFORM public.create_notification(
    v_reflection.user_id,
    CASE WHEN v_reflection.parent_reflection_id IS NULL THEN 'series_reflection_liked' ELSE 'series_reflection_reply_liked' END,
    NEW.user_id,
    v_actor_name,
    CASE
      WHEN v_reflection.parent_reflection_id IS NULL THEN v_actor_name || ' liked your reflection'
      ELSE v_actor_name || ' liked your reply'
    END,
    '/study-groups/' || v_group_id || '/series/week/' || v_reflection.week_number,
    v_reflection.id,
    v_reflection.id
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_group_post_insert ON public.group_posts;
DROP TRIGGER IF EXISTS trg_notify_group_broadcast_post ON public.group_posts;
CREATE TRIGGER trg_notify_group_broadcast_post
  AFTER INSERT ON public.group_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_group_broadcast_post();

DROP TRIGGER IF EXISTS trg_notify_group_post_thread_activity ON public.group_posts;
CREATE TRIGGER trg_notify_group_post_thread_activity
  AFTER INSERT ON public.group_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_group_post_thread_activity();

DROP TRIGGER IF EXISTS trg_notify_group_post_like ON public.group_post_likes;
CREATE TRIGGER trg_notify_group_post_like
  AFTER INSERT ON public.group_post_likes
  FOR EACH ROW EXECUTE FUNCTION public.notify_group_post_like();

DROP TRIGGER IF EXISTS trg_notify_series_post_published ON public.group_series_posts;
CREATE TRIGGER trg_notify_series_post_published
  AFTER INSERT OR UPDATE OF is_published ON public.group_series_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_post_published();

DROP TRIGGER IF EXISTS trg_notify_series_post_comment_activity ON public.group_series_post_comments;
CREATE TRIGGER trg_notify_series_post_comment_activity
  AFTER INSERT ON public.group_series_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_post_comment_activity();

DROP TRIGGER IF EXISTS trg_notify_series_post_like ON public.group_series_post_likes;
CREATE TRIGGER trg_notify_series_post_like
  AFTER INSERT ON public.group_series_post_likes
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_post_like();

DROP TRIGGER IF EXISTS trg_notify_series_comment_like ON public.group_series_comment_likes;
CREATE TRIGGER trg_notify_series_comment_like
  AFTER INSERT ON public.group_series_comment_likes
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_comment_like();

DROP TRIGGER IF EXISTS trg_notify_series_reflection_activity ON public.series_reflections;
CREATE TRIGGER trg_notify_series_reflection_activity
  AFTER INSERT ON public.series_reflections
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_reflection_activity();

DROP TRIGGER IF EXISTS trg_notify_series_reflection_like ON public.series_reflection_likes;
CREATE TRIGGER trg_notify_series_reflection_like
  AFTER INSERT ON public.series_reflection_likes
  FOR EACH ROW EXECUTE FUNCTION public.notify_series_reflection_like();
