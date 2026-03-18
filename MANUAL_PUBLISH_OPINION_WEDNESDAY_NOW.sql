-- Manually publish this week's Opinion Wednesday poll right now
-- Run once in the Supabase SQL Editor to force the first poll post live

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
    - ((extract(dow from timezone('Europe/Berlin', now()))::int + 4) % 7);
  v_week_key := to_char(v_week_start, 'YYYY-MM-DD');

  IF EXISTS (
    SELECT 1
    FROM public.weekly_group_polls
    WHERE group_id = v_group_id
      AND week_key = v_week_key
  ) THEN
    RAISE NOTICE 'Opinion Wednesday already exists for week %.', v_week_key;
    RETURN;
  END IF;

  v_content := '';

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
    'How many days a week do you usually read the Bible?',
    'general',
    v_content
  )
  RETURNING id INTO v_post_id;

  INSERT INTO public.weekly_group_polls (
    group_id,
    post_id,
    week_key,
    poll_key,
    subject_title,
    question,
    intro,
    options,
    created_by
  )
  VALUES (
    v_group_id,
    v_post_id,
    v_week_key,
    'reading_frequency',
    'Bible Reading Habits',
    'How many days a week do you usually read the Bible?',
    NULL,
    jsonb_build_array(
      jsonb_build_object('key', 'six_seven', 'text', '6 to 7 days a week'),
      jsonb_build_object('key', 'four_five', 'text', '4 to 5 days a week'),
      jsonb_build_object('key', 'two_three', 'text', '2 to 3 days a week'),
      jsonb_build_object('key', 'once', 'text', 'Maybe once a week')
    ),
    v_louis_id
  );
END $$;

SELECT
  p.id,
  p.week_key,
  p.question,
  p.post_id,
  gp.title,
  gp.created_at
FROM public.weekly_group_polls p
JOIN public.group_posts gp
  ON gp.id = p.post_id
ORDER BY gp.created_at DESC
LIMIT 5;
