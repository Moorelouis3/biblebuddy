-- Remove duplicate onboarding DMs while keeping the earliest copy per user/day.
-- Safe target: only messages sent by Louis that match the 4 onboarding templates.
-- Run this once in the Supabase SQL Editor.

BEGIN;

-- 1. Delete duplicate onboarding messages, keeping the oldest copy for each recipient + onboarding day.
WITH founder AS (
  SELECT id AS louis_id
  FROM auth.users
  WHERE email = 'moorelouis3@gmail.com'
  LIMIT 1
),
classified AS (
  SELECT
    m.id,
    m.conversation_id,
    m.sender_id,
    m.created_at,
    CASE
      WHEN m.content LIKE 'Hey, welcome to Bible Buddy%' THEN 1
      WHEN m.content LIKE 'I see you got your profile set up%' THEN 2
      WHEN m.content LIKE 'Hey %quick reminder to finish setting up your profile%' THEN 2
      WHEN m.content LIKE 'I saw you checked out the Bible Study Group%' THEN 3
      WHEN m.content LIKE 'Hey %the Bible Study Group is where everything comes together%' THEN 3
      WHEN m.content LIKE 'I saw you started the study%' THEN 4
      WHEN m.content LIKE 'Hey %if you''re not sure where to start%' THEN 4
      ELSE NULL
    END AS onboarding_day,
    CASE
      WHEN c.user_id_1 = m.sender_id THEN c.user_id_2
      ELSE c.user_id_1
    END AS recipient_user_id
  FROM public.messages m
  JOIN public.conversations c
    ON c.id = m.conversation_id
  JOIN founder f
    ON f.louis_id = m.sender_id
),
ranked AS (
  SELECT
    id,
    conversation_id,
    recipient_user_id,
    onboarding_day,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY recipient_user_id, onboarding_day
      ORDER BY created_at ASC, id ASC
    ) AS duplicate_rank
  FROM classified
  WHERE onboarding_day IS NOT NULL
),
deleted AS (
  DELETE FROM public.messages m
  USING ranked r
  WHERE m.id = r.id
    AND r.duplicate_rank > 1
  RETURNING m.id, m.conversation_id
)
SELECT COUNT(*) AS deleted_duplicate_onboarding_messages
FROM deleted;

-- 2. Refresh each conversation preview so it points at the latest remaining message.
WITH latest_messages AS (
  SELECT DISTINCT ON (m.conversation_id)
    m.conversation_id,
    m.created_at,
    CASE
      WHEN COALESCE(NULLIF(TRIM(m.content), ''), '') <> '' THEN LEFT(m.content, 120)
      WHEN m.image_url IS NOT NULL THEN '📷 Photo'
      ELSE 'New message'
    END AS preview
  FROM public.messages m
  ORDER BY m.conversation_id, m.created_at DESC, m.id DESC
)
UPDATE public.conversations c
SET
  last_message_at = lm.created_at,
  last_message_preview = lm.preview
FROM latest_messages lm
WHERE c.id = lm.conversation_id;

-- 3. Clean up any duplicate unread direct-message notifications for the same conversation/user.
WITH ranked_notifications AS (
  SELECT
    n.id,
    ROW_NUMBER() OVER (
      PARTITION BY n.user_id, n.article_slug, n.type, n.is_read
      ORDER BY n.created_at DESC, n.id DESC
    ) AS duplicate_rank
  FROM public.notifications n
  WHERE n.type = 'direct_message'
    AND n.article_slug LIKE '/messages/%'
    AND n.is_read = false
),
deleted_notifications AS (
  DELETE FROM public.notifications n
  USING ranked_notifications rn
  WHERE n.id = rn.id
    AND rn.duplicate_rank > 1
  RETURNING n.id
)
SELECT COUNT(*) AS deleted_duplicate_dm_notifications
FROM deleted_notifications;

COMMIT;
