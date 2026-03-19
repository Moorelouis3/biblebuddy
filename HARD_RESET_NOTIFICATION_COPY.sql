-- Hard reset for Bible Buddy notification copy
-- Run this in the Supabase SQL Editor
-- This replaces the push trigger logic and also scrubs existing
-- notification rows and queued push jobs that still have bad copy.

CREATE OR REPLACE FUNCTION public.clean_bible_buddy_notification_body(
  p_actor_name text,
  p_message text
)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_body text;
  v_index integer := 0;
BEGIN
  v_body := COALESCE(NULLIF(p_message, ''), 'sent you a new alert');

  IF p_actor_name IS NOT NULL AND p_message IS NOT NULL AND position(p_actor_name || ' ' in p_message) = 1 THEN
    v_body := substr(p_message, char_length(p_actor_name) + 2);
  END IF;

  -- Run a few passes so repeated bad prefixes get stripped too.
  WHILE v_index < 4 LOOP
    v_body := regexp_replace(v_body, '^\s*from bible buddy[:\s-]*', '', 'i');

    IF p_actor_name IS NOT NULL AND lower(v_body) LIKE lower(p_actor_name) || ' %' THEN
      v_body := substr(v_body, char_length(p_actor_name) + 2);
    END IF;

    v_index := v_index + 1;
  END LOOP;

  RETURN COALESCE(NULLIF(btrim(v_body), ''), 'sent you a new alert');
END;
$$;

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
    v_body := public.clean_bible_buddy_notification_body(v_actor_name, NEW.message);
    v_title := v_actor_name || ' from Bible Buddy';
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

DROP TRIGGER IF EXISTS trg_queue_push_notification_job ON public.notifications;
CREATE TRIGGER trg_queue_push_notification_job
  AFTER INSERT ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_push_notification_job();

-- Clean up already queued push payloads so pending jobs stop sending bad copy.
UPDATE public.push_notification_jobs j
SET payload = jsonb_build_object(
  'title',
    CASE
      WHEN COALESCE(
        NULLIF(n.from_user_name, ''),
        NULLIF(regexp_replace(COALESCE(j.payload->>'title', ''), '\s+from Bible Buddy\s*$', '', 'i'), '')
      ) IS NOT NULL
        THEN COALESCE(
          NULLIF(n.from_user_name, ''),
          NULLIF(regexp_replace(COALESCE(j.payload->>'title', ''), '\s+from Bible Buddy\s*$', '', 'i'), '')
        ) || ' from Bible Buddy'
      ELSE 'Bible Buddy'
    END,
  'body',
    CASE
      WHEN COALESCE(
        NULLIF(n.from_user_name, ''),
        NULLIF(regexp_replace(COALESCE(j.payload->>'title', ''), '\s+from Bible Buddy\s*$', '', 'i'), '')
      ) IS NOT NULL
        THEN public.clean_bible_buddy_notification_body(
          COALESCE(
            NULLIF(n.from_user_name, ''),
            NULLIF(regexp_replace(COALESCE(j.payload->>'title', ''), '\s+from Bible Buddy\s*$', '', 'i'), '')
          ),
          COALESCE(j.payload->>'body', n.message, '')
        )
      ELSE COALESCE(NULLIF(COALESCE(j.payload->>'body', n.message, ''), ''), 'You have a new alert')
    END,
  'url', COALESCE(j.payload->>'url', n.article_slug, '/dashboard'),
  'type', COALESCE(j.payload->>'type', n.type, 'notification'),
  'notificationId', COALESCE(j.payload->>'notificationId', j.notification_id::text)
)
FROM public.notifications n
WHERE n.id = j.notification_id
  AND j.payload IS NOT NULL;

SELECT
  proname,
  pg_get_functiondef(p.oid) AS function_sql
FROM pg_proc p
JOIN pg_namespace n
  ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND proname IN ('clean_bible_buddy_notification_body', 'queue_push_notification_job');
