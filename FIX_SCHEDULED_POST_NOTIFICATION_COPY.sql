-- Make scheduled weekly group posts use custom in-app notification copy
-- Run once in the Supabase SQL Editor

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
  v_louis_id uuid;
  v_message text;
BEGIN
  IF NEW.parent_post_id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));
  SELECT name INTO v_group_name
  FROM public.study_groups
  WHERE id = NEW.group_id;

  v_route := '/study-groups/' || NEW.group_id || '/chat';

  SELECT id INTO v_louis_id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1;

  v_message := CASE
    WHEN NEW.category = 'weekly_poll' THEN v_actor_name || ' just posted a new poll'
    WHEN NEW.category = 'weekly_question' THEN v_actor_name || ' just asked a question'
    WHEN NEW.category = 'weekly_trivia' THEN v_actor_name || ' just posted this week''s Bible trivia'
    WHEN NEW.category = 'update_monday' THEN v_actor_name || ' just shared a new Bible Buddy update'
    WHEN NEW.category = 'who_was_this_friday' THEN v_actor_name || ' just shared a new Bible character study'
    WHEN NEW.category = 'bible_study_saturday' THEN v_actor_name || ' just shared this week''s Bible study'
    WHEN NEW.category = 'prayer_request_sunday' THEN v_actor_name || ' just posted a new prayer request thread'
    ELSE v_actor_name || ' posted in ' || COALESCE(v_group_name, 'your group')
  END;

  FOR v_member IN
    SELECT gm.user_id
    FROM public.group_members gm
    WHERE gm.group_id = NEW.group_id
      AND gm.status = 'approved'
      AND gm.user_id <> NEW.user_id
      AND (
        NEW.user_id = v_louis_id
        OR EXISTS (
          SELECT 1
          FROM public.buddies b
          WHERE b.user_id_1 = LEAST(gm.user_id, NEW.user_id)
            AND b.user_id_2 = GREATEST(gm.user_id, NEW.user_id)
        )
      )
  LOOP
    PERFORM public.create_notification(
      v_member.user_id,
      'group_post',
      NEW.user_id,
      v_actor_name,
      v_message,
      v_route,
      NEW.id,
      NULL
    );
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_group_post_insert ON public.group_posts;
DROP TRIGGER IF EXISTS trg_notify_group_broadcast_post ON public.group_posts;
CREATE TRIGGER trg_notify_group_broadcast_post
  AFTER INSERT ON public.group_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_group_broadcast_post();
