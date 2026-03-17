-- Send the Bible study group launch message to every user as a normal Louis DM
-- Run once in the Supabase SQL Editor

DO $$
DECLARE
  v_louis_id uuid;
  v_group_id uuid;
  v_group_name text;
  v_message text;
BEGIN
  SELECT id
  INTO v_louis_id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1;

  IF v_louis_id IS NULL THEN
    RAISE EXCEPTION 'Louis account not found.';
  END IF;

  SELECT id, name
  INTO v_group_id, v_group_name
  FROM public.study_groups
  WHERE name IN ('Bible Buddy Study Group', 'Hope Nation')
  ORDER BY CASE WHEN name = 'Bible Buddy Study Group' THEN 0 ELSE 1 END, created_at DESC NULLS LAST
  LIMIT 1;

  IF v_group_id IS NULL THEN
    RAISE EXCEPTION 'Official Bible study group not found.';
  END IF;

  v_message :=
    'Bible Buddy''s Bible Study Group is now live.' || E'\n\n' ||
    'If you''ve been looking for a real place to study the Word with other real people inside the app, this is it.' || E'\n\n' ||
    'Inside the group, you can go through structured Bible study together with notes, assigned readings, trivia, reflection questions, and real discussion with other Buddies who want to grow in God''s Word too.' || E'\n\n' ||
    'It''s not just more content to scroll. It''s a real community where we can study Scripture, learn together, encourage each other, and stay consistent in the Word.' || E'\n\n' ||
    'To celebrate the launch, the first 50 Buddies to post in the Bible Study Group will get 30 days of Bible Buddy Pro free.' || E'\n\n' ||
    'Open Bible Study Group: /study-groups/' || v_group_id || '/chat';

  INSERT INTO public.conversations (
    user_id_1,
    user_id_2
  )
  SELECT
    CASE WHEN v_louis_id < u.id THEN v_louis_id ELSE u.id END,
    CASE WHEN v_louis_id < u.id THEN u.id ELSE v_louis_id END
  FROM auth.users u
  WHERE u.id <> v_louis_id
  ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

  WITH target_conversations AS (
    SELECT
      c.id AS conversation_id,
      c.user_id_1,
      c.user_id_2
    FROM public.conversations c
    WHERE c.user_id_1 = v_louis_id OR c.user_id_2 = v_louis_id
  ),
  inserted_messages AS (
    INSERT INTO public.messages (
      conversation_id,
      sender_id,
      content
    )
    SELECT
      tc.conversation_id,
      v_louis_id,
      v_message
    FROM target_conversations tc
    WHERE NOT EXISTS (
      SELECT 1
      FROM public.messages m
      WHERE m.conversation_id = tc.conversation_id
        AND m.sender_id = v_louis_id
        AND m.content = v_message
    )
    RETURNING conversation_id, content, created_at
  )
  UPDATE public.conversations c
  SET
    last_message_at = im.created_at,
    last_message_preview = 'Bible Study Group is now live. The first 50 Buddies to post get 30 days of Pro free.'
  FROM inserted_messages im
  WHERE c.id = im.conversation_id;
END $$;

SELECT
  COUNT(*) AS louis_launch_messages
FROM public.messages m
JOIN public.conversations c
  ON c.id = m.conversation_id
JOIN auth.users lou
  ON lou.id = m.sender_id
WHERE lower(lou.email) = 'moorelouis3@gmail.com'
  AND m.content ILIKE 'Bible Buddy''s Bible Study Group is now live.%';
