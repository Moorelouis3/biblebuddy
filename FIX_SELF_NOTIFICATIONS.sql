-- Stop self-notifications and clean up any old ones
-- Run once in Supabase SQL Editor

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

DELETE FROM public.notifications
WHERE from_user_id IS NOT NULL
  AND user_id = from_user_id;

SELECT COUNT(*) AS remaining_self_notifications
FROM public.notifications
WHERE from_user_id IS NOT NULL
  AND user_id = from_user_id;
