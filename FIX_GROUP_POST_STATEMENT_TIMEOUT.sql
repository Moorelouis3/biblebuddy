-- Fix slow group post inserts that time out while sending notifications.
-- Run this in the Supabase SQL editor.

CREATE INDEX IF NOT EXISTS idx_group_members_group_status_user
  ON public.group_members (group_id, status, user_id);

CREATE INDEX IF NOT EXISTS idx_buddies_pair_lookup
  ON public.buddies (user_id_1, user_id_2);

CREATE INDEX IF NOT EXISTS idx_group_posts_group_parent_created
  ON public.group_posts (group_id, parent_post_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.notify_group_broadcast_post()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_actor_name text;
  v_group_name text;
  v_route text;
  v_louis_id uuid;
BEGIN
  IF NEW.parent_post_id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));

  SELECT sg.name
  INTO v_group_name
  FROM public.study_groups sg
  WHERE sg.id = NEW.group_id;

  v_route := '/study-groups/' || NEW.group_id || '/chat';

  SELECT au.id
  INTO v_louis_id
  FROM auth.users au
  WHERE lower(au.email) = 'moorelouis3@gmail.com'
  LIMIT 1;

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
  SELECT
    gm.user_id,
    'group_post',
    NEW.user_id,
    v_actor_name,
    v_route,
    NEW.id,
    NULL,
    v_actor_name || ' posted in ' || COALESCE(v_group_name, 'your group')
  FROM public.group_members gm
  LEFT JOIN public.buddies b
    ON b.user_id_1 = LEAST(gm.user_id, NEW.user_id)
   AND b.user_id_2 = GREATEST(gm.user_id, NEW.user_id)
  WHERE gm.group_id = NEW.group_id
    AND gm.status = 'approved'
    AND gm.user_id <> NEW.user_id
    AND (
      NEW.user_id = v_louis_id
      OR b.user_id_1 IS NOT NULL
    );

  RETURN NEW;
END;
$$;
