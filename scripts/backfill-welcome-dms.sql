-- Backfill Day 1 welcome DMs for users who signed up in the last 7 days
-- and never received the welcome message.
-- Run this once in the Supabase SQL Editor.

DO $$
DECLARE
  v_louis_id     uuid;
  v_louis_name   text;
  v_user_id      uuid;
  v_uid1         uuid;
  v_uid2         uuid;
  v_convo_id     uuid;
  v_now          timestamptz := now();
  v_msg          text := 'Hey, welcome to Bible Buddy 👋🏾

my name is Louis, I''m the one who built the app

I created Bible Buddy because I used to struggle to actually understand what I was reading in the Bible

I needed multiple things… notebooks, videos, searching stuff up… and I still had questions

so I made something simpler

Bible Buddy is built to help you understand what you''re reading, not just go through it

take a look around and get familiar with everything';
  v_preview      text;
  v_sent         int := 0;
  v_skipped      int := 0;
BEGIN
  -- Resolve Louis's ID
  SELECT id INTO v_louis_id
  FROM auth.users
  WHERE email = 'moorelouis3@gmail.com'
  LIMIT 1;

  IF v_louis_id IS NULL THEN
    RAISE EXCEPTION 'Louis account not found';
  END IF;

  -- Resolve Louis's display name
  SELECT COALESCE(display_name, username, 'Louis') INTO v_louis_name
  FROM profile_stats
  WHERE user_id = v_louis_id
  LIMIT 1;

  IF v_louis_name IS NULL THEN
    v_louis_name := 'Louis';
  END IF;

  v_preview := left(v_msg, 120);

  -- Loop over recent signups who haven't gotten the day 1 message
  FOR v_user_id IN
    SELECT u.id
    FROM auth.users u
    WHERE u.id <> v_louis_id
      AND u.created_at >= now() - interval '7 days'
      AND NOT EXISTS (
        SELECT 1 FROM onboarding_dm_sent
        WHERE user_id = u.id AND day_number = 1
      )
  LOOP
    -- conversations table requires user_id_1 < user_id_2
    IF v_louis_id < v_user_id THEN
      v_uid1 := v_louis_id; v_uid2 := v_user_id;
    ELSE
      v_uid1 := v_user_id; v_uid2 := v_louis_id;
    END IF;

    -- Find or create conversation
    SELECT id INTO v_convo_id
    FROM conversations
    WHERE user_id_1 = v_uid1 AND user_id_2 = v_uid2;

    IF v_convo_id IS NULL THEN
      INSERT INTO conversations (user_id_1, user_id_2)
      VALUES (v_uid1, v_uid2)
      RETURNING id INTO v_convo_id;
    END IF;

    -- Insert the message
    INSERT INTO messages (conversation_id, sender_id, content, action_label, action_href, created_at)
    VALUES (v_convo_id, v_louis_id, v_msg, null, null, v_now);

    -- Update conversation metadata
    UPDATE conversations
    SET last_message_at = v_now, last_message_preview = v_preview
    WHERE id = v_convo_id;

    -- Upsert notification
    IF EXISTS (
      SELECT 1 FROM notifications
      WHERE type = 'direct_message'
        AND article_slug = '/messages/' || v_convo_id::text
        AND user_id = v_user_id
        AND is_read = false
    ) THEN
      UPDATE notifications
      SET from_user_id = v_louis_id,
          from_user_name = v_louis_name,
          message = v_preview,
          created_at = v_now
      WHERE type = 'direct_message'
        AND article_slug = '/messages/' || v_convo_id::text
        AND user_id = v_user_id
        AND is_read = false;
    ELSE
      INSERT INTO notifications (user_id, type, from_user_id, from_user_name, article_slug, message, is_read, created_at)
      VALUES (v_user_id, 'direct_message', v_louis_id, v_louis_name,
              '/messages/' || v_convo_id::text, v_preview, false, v_now);
    END IF;

    -- Mark day 1 sent
    INSERT INTO onboarding_dm_sent (user_id, day_number)
    VALUES (v_user_id, 1);

    v_sent := v_sent + 1;
    RAISE NOTICE 'Sent to user %', v_user_id;
  END LOOP;

  RAISE NOTICE '=============================';
  RAISE NOTICE 'Sent:    %', v_sent;
  RAISE NOTICE 'Skipped: %', v_skipped;
  RAISE NOTICE '=============================';
END $$;
