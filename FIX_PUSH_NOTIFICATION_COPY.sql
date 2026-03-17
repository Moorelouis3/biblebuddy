-- Make push notifications read like "Name from Bible Buddy" with the action below
-- Run once in Supabase SQL Editor

CREATE OR REPLACE FUNCTION public.queue_push_notification_job()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_url text;
  v_actor_name text;
  v_title text;
  v_body text;
BEGIN
  v_url := COALESCE(NEW.article_slug, '/dashboard');
  v_actor_name := NULLIF(NEW.from_user_name, '');

  IF NEW.post_id IS NOT NULL THEN
    IF position('?' in v_url) > 0 THEN
      v_url := v_url || '&post=' || NEW.post_id;
    ELSE
      v_url := v_url || '?post=' || NEW.post_id;
    END IF;
  END IF;

  IF NEW.comment_id IS NOT NULL THEN
    IF position('?' in v_url) > 0 THEN
      v_url := v_url || '&comment=' || NEW.comment_id;
    ELSE
      v_url := v_url || '?comment=' || NEW.comment_id;
    END IF;
  END IF;

  IF v_actor_name IS NOT NULL THEN
    v_title := v_actor_name || ' from Bible Buddy';

    IF NEW.message IS NOT NULL AND position(v_actor_name || ' ' in NEW.message) = 1 THEN
      v_body := substr(NEW.message, char_length(v_actor_name) + 2);
    ELSE
      v_body := COALESCE(NULLIF(NEW.message, ''), 'sent you a new alert');
    END IF;
  ELSE
    v_title := 'Bible Buddy';
    v_body := COALESCE(NULLIF(NEW.message, ''), 'You have a new alert');
  END IF;

  INSERT INTO public.push_notification_jobs (
    notification_id,
    user_id,
    payload
  )
  VALUES (
    NEW.id,
    NEW.user_id,
    jsonb_build_object(
      'title', v_title,
      'body', v_body,
      'url', v_url,
      'type', COALESCE(NEW.type, 'notification'),
      'notificationId', NEW.id
    )
  )
  ON CONFLICT (notification_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$;
