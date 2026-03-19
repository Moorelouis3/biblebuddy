-- Manually publish this week's Weekly Bible Trivia right now
-- Run once in the Supabase SQL Editor to force the first trivia post live

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
    - ((extract(dow from timezone('Europe/Berlin', now()))::int + 5) % 7);
  v_week_key := to_char(v_week_start, 'YYYY-MM-DD');

  IF EXISTS (
    SELECT 1
    FROM public.weekly_group_trivia_sets
    WHERE group_id = v_group_id
      AND week_key = v_week_key
  ) THEN
    RAISE NOTICE 'Weekly trivia already exists for week %.', v_week_key;
    RETURN;
  END IF;

  v_content :=
    '<p><strong>This week''s trivia is about the 12 disciples.</strong></p>' ||
    '<p>Ten quick questions on the men Jesus called to follow Him closely.</p>' ||
    '<p>Tap into this week''s 10-question Bible trivia, see your score, and compare with the group board below.</p>';

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
    'Weekly Bible Trivia',
    'weekly_trivia',
    v_content
  )
  RETURNING id INTO v_post_id;

  INSERT INTO public.weekly_group_trivia_sets (
    group_id,
    post_id,
    week_key,
    subject_key,
    subject_title,
    intro,
    questions,
    created_by
  )
  VALUES (
    v_group_id,
    v_post_id,
    v_week_key,
    'twelve_disciples',
    'The 12 Disciples',
    'Ten quick questions on the men Jesus called to follow Him closely.',
    jsonb_build_array(
      jsonb_build_object(
        'id', 'disciples-1',
        'question', 'Which disciple was known as a tax collector before following Jesus?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Peter'),
          jsonb_build_object('label', 'B', 'text', 'Matthew'),
          jsonb_build_object('label', 'C', 'text', 'Thomas'),
          jsonb_build_object('label', 'D', 'text', 'Philip')
        ),
        'correctAnswer', 'B',
        'explanation', 'Matthew was a tax collector before Jesus called him.'
      ),
      jsonb_build_object(
        'id', 'disciples-2',
        'question', 'Which two brothers were fishermen when Jesus called them?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Peter and Andrew'),
          jsonb_build_object('label', 'B', 'text', 'Matthew and Thomas'),
          jsonb_build_object('label', 'C', 'text', 'Philip and Bartholomew'),
          jsonb_build_object('label', 'D', 'text', 'Simon and Judas')
        ),
        'correctAnswer', 'A',
        'explanation', 'Peter and Andrew were brothers and fishermen.'
      ),
      jsonb_build_object(
        'id', 'disciples-3',
        'question', 'Which disciple doubted Jesus'' resurrection until he saw Him?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'John'),
          jsonb_build_object('label', 'B', 'text', 'Thomas'),
          jsonb_build_object('label', 'C', 'text', 'James'),
          jsonb_build_object('label', 'D', 'text', 'Andrew')
        ),
        'correctAnswer', 'B',
        'explanation', 'Thomas is remembered for doubting until he saw the risen Jesus.'
      ),
      jsonb_build_object(
        'id', 'disciples-4',
        'question', 'Who betrayed Jesus for thirty pieces of silver?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Judas Iscariot'),
          jsonb_build_object('label', 'B', 'text', 'Peter'),
          jsonb_build_object('label', 'C', 'text', 'Matthew'),
          jsonb_build_object('label', 'D', 'text', 'Thaddaeus')
        ),
        'correctAnswer', 'A',
        'explanation', 'Judas Iscariot betrayed Jesus.'
      ),
      jsonb_build_object(
        'id', 'disciples-5',
        'question', 'Which disciple is often called ''the beloved disciple''?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'James'),
          jsonb_build_object('label', 'B', 'text', 'John'),
          jsonb_build_object('label', 'C', 'text', 'Philip'),
          jsonb_build_object('label', 'D', 'text', 'Bartholomew')
        ),
        'correctAnswer', 'B',
        'explanation', 'John is traditionally identified as the beloved disciple.'
      ),
      jsonb_build_object(
        'id', 'disciples-6',
        'question', 'Who said, "You are the Christ, the Son of the living God"?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Peter'),
          jsonb_build_object('label', 'B', 'text', 'Thomas'),
          jsonb_build_object('label', 'C', 'text', 'Matthew'),
          jsonb_build_object('label', 'D', 'text', 'James son of Alphaeus')
        ),
        'correctAnswer', 'A',
        'explanation', 'Peter made that confession in Matthew 16.'
      ),
      jsonb_build_object(
        'id', 'disciples-7',
        'question', 'Which disciple replaced Judas after the resurrection?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Silas'),
          jsonb_build_object('label', 'B', 'text', 'Matthias'),
          jsonb_build_object('label', 'C', 'text', 'Barnabas'),
          jsonb_build_object('label', 'D', 'text', 'Mark')
        ),
        'correctAnswer', 'B',
        'explanation', 'Matthias was chosen in Acts 1 to replace Judas.'
      ),
      jsonb_build_object(
        'id', 'disciples-8',
        'question', 'Which brothers were nicknamed "sons of thunder"?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Peter and Andrew'),
          jsonb_build_object('label', 'B', 'text', 'James and John'),
          jsonb_build_object('label', 'C', 'text', 'Philip and Bartholomew'),
          jsonb_build_object('label', 'D', 'text', 'Simon and Jude')
        ),
        'correctAnswer', 'B',
        'explanation', 'James and John were called Boanerges, or sons of thunder.'
      ),
      jsonb_build_object(
        'id', 'disciples-9',
        'question', 'Which disciple brought Nathanael to Jesus?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', 'Andrew'),
          jsonb_build_object('label', 'B', 'text', 'Philip'),
          jsonb_build_object('label', 'C', 'text', 'Peter'),
          jsonb_build_object('label', 'D', 'text', 'Matthew')
        ),
        'correctAnswer', 'B',
        'explanation', 'Philip told Nathanael about Jesus in John 1.'
      ),
      jsonb_build_object(
        'id', 'disciples-10',
        'question', 'How many disciples did Jesus appoint as His closest apostles?',
        'options', jsonb_build_array(
          jsonb_build_object('label', 'A', 'text', '7'),
          jsonb_build_object('label', 'B', 'text', '10'),
          jsonb_build_object('label', 'C', 'text', '12'),
          jsonb_build_object('label', 'D', 'text', '70')
        ),
        'correctAnswer', 'C',
        'explanation', 'Jesus appointed 12 apostles.'
      )
    ),
    v_louis_id
  );
END $$;

SELECT
  w.id,
  w.week_key,
  w.subject_title,
  w.post_id,
  p.title,
  p.created_at
FROM public.weekly_group_trivia_sets w
JOIN public.group_posts p
  ON p.id = w.post_id
ORDER BY p.created_at DESC
LIMIT 5;
