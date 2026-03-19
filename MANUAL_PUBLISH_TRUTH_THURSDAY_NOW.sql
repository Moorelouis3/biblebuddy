-- Manually publish this week's Truth Thursday question right now
-- Run once in the Supabase SQL Editor to force the first question post live

DO $$
DECLARE
  v_louis_id uuid;
  v_group_id uuid;
  v_week_start date;
  v_week_key text;
  v_post_id uuid;
  v_content text;
BEGIN
  SELECT id
  INTO v_louis_id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1;

  IF v_louis_id IS NULL THEN
    RAISE EXCEPTION 'Louis account not found.';
  END IF;

  SELECT id
  INTO v_group_id
  FROM public.study_groups
  WHERE name IN ('Bible Buddy Study Group', 'Hope Nation')
  ORDER BY CASE WHEN name = 'Bible Buddy Study Group' THEN 0 ELSE 1 END, created_at DESC NULLS LAST
  LIMIT 1;

  IF v_group_id IS NULL THEN
    RAISE EXCEPTION 'Official Bible study group not found.';
  END IF;

  v_week_start := (timezone('Europe/Berlin', now()))::date
    - ((extract(dow from timezone('Europe/Berlin', now()))::int + 3) % 7);
  v_week_key := to_char(v_week_start, 'YYYY-MM-DD');

  IF EXISTS (
    SELECT 1
    FROM public.weekly_group_questions
    WHERE group_id = v_group_id
      AND week_key = v_week_key
  ) THEN
    RAISE NOTICE 'Truth Thursday already exists for week %.', v_week_key;
    RETURN;
  END IF;

  v_content :=
    '<p>Truth Thursday is about real faith, real people, and real stories of what God has done.</p>' ||
    '<p>Share as much of your story as you feel comfortable sharing in the comments.</p>';

  INSERT INTO public.group_posts (
    group_id,
    user_id,
    display_name,
    title,
    category,
    content
  )
  VALUES (
    v_group_id,
    v_louis_id,
    'Louis',
    'What''s your testimony? How did God begin changing your life?',
    'weekly_question',
    v_content
  )
  RETURNING id INTO v_post_id;

  INSERT INTO public.weekly_group_questions (
    group_id,
    post_id,
    week_key,
    prompt_key,
    subject_title,
    prompt,
    intro,
    comment_prompt,
    created_by
  )
  VALUES (
    v_group_id,
    v_post_id,
    v_week_key,
    'testimony',
    'Your Testimony',
    'What''s your testimony? How did God begin changing your life?',
    'Truth Thursday is about real faith, real people, and real stories of what God has done.',
    'Share as much of your story as you feel comfortable sharing in the comments.',
    v_louis_id
  );
END $$;

SELECT
  q.id,
  q.week_key,
  q.subject_title,
  q.post_id,
  p.title,
  p.created_at
FROM public.weekly_group_questions q
JOIN public.group_posts p
  ON p.id = q.post_id
ORDER BY p.created_at DESC
LIMIT 5;
