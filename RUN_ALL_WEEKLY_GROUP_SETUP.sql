-- Bible Buddy weekly group system master setup
-- Run this once in the Supabase SQL Editor
-- Safe to re-run because it uses IF NOT EXISTS / CREATE OR REPLACE where possible

-- ---------------------------------------
-- Weekly Trivia
-- ---------------------------------------

CREATE TABLE IF NOT EXISTS public.weekly_group_trivia_sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  subject_key text NOT NULL,
  subject_title text NOT NULL,
  intro text,
  questions jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE TABLE IF NOT EXISTS public.weekly_group_trivia_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  trivia_set_id uuid NOT NULL REFERENCES public.weekly_group_trivia_sets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 10,
  completed_at timestamptz DEFAULT now(),
  UNIQUE (trivia_set_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_trivia_sets_group_created
  ON public.weekly_group_trivia_sets (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_group_trivia_scores_set_score
  ON public.weekly_group_trivia_scores (trivia_set_id, score DESC, completed_at ASC);

GRANT SELECT ON public.weekly_group_trivia_sets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_group_trivia_scores TO authenticated;

ALTER TABLE public.weekly_group_trivia_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_group_trivia_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_trivia_sets_select_authenticated" ON public.weekly_group_trivia_sets;
CREATE POLICY "weekly_group_trivia_sets_select_authenticated"
  ON public.weekly_group_trivia_sets
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_trivia_scores_select_authenticated" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_select_authenticated"
  ON public.weekly_group_trivia_scores
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_trivia_scores_insert_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_insert_own"
  ON public.weekly_group_trivia_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "weekly_group_trivia_scores_update_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_update_own"
  ON public.weekly_group_trivia_scores
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "weekly_group_trivia_scores_delete_own" ON public.weekly_group_trivia_scores;
CREATE POLICY "weekly_group_trivia_scores_delete_own"
  ON public.weekly_group_trivia_scores
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ---------------------------------------
-- Weekly Question
-- ---------------------------------------

CREATE TABLE IF NOT EXISTS public.weekly_group_questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  prompt_key text NOT NULL,
  subject_title text NOT NULL,
  prompt text NOT NULL,
  intro text,
  comment_prompt text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_questions_group_created
  ON public.weekly_group_questions (group_id, created_at DESC);

GRANT SELECT ON public.weekly_group_questions TO authenticated;

ALTER TABLE public.weekly_group_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_questions_select_authenticated" ON public.weekly_group_questions;
CREATE POLICY "weekly_group_questions_select_authenticated"
  ON public.weekly_group_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- ---------------------------------------
-- Weekly Poll
-- ---------------------------------------

CREATE TABLE IF NOT EXISTS public.weekly_group_polls (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  poll_key text NOT NULL,
  subject_title text NOT NULL,
  question text NOT NULL,
  intro text,
  options jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key)
);

CREATE TABLE IF NOT EXISTS public.weekly_group_poll_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id uuid NOT NULL REFERENCES public.weekly_group_polls(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  option_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (poll_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_polls_group_created
  ON public.weekly_group_polls (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_weekly_group_poll_votes_poll_created
  ON public.weekly_group_poll_votes (poll_id, created_at ASC);

GRANT SELECT ON public.weekly_group_polls TO authenticated;
GRANT SELECT ON public.weekly_group_poll_votes TO authenticated;

ALTER TABLE public.weekly_group_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_group_poll_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_polls_select_authenticated" ON public.weekly_group_polls;
CREATE POLICY "weekly_group_polls_select_authenticated"
  ON public.weekly_group_polls
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "weekly_group_poll_votes_select_authenticated" ON public.weekly_group_poll_votes;
CREATE POLICY "weekly_group_poll_votes_select_authenticated"
  ON public.weekly_group_poll_votes
  FOR SELECT
  TO authenticated
  USING (true);

-- ---------------------------------------
-- Weekly Recurring Series Posts
-- ---------------------------------------

CREATE TABLE IF NOT EXISTS public.weekly_group_series_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE UNIQUE,
  week_key text NOT NULL,
  series_key text NOT NULL,
  subject_title text NOT NULL,
  title text NOT NULL,
  description text,
  content_html text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (group_id, week_key, series_key)
);

CREATE INDEX IF NOT EXISTS idx_weekly_group_series_posts_group_created
  ON public.weekly_group_series_posts (group_id, created_at DESC);

GRANT SELECT ON public.weekly_group_series_posts TO authenticated;

ALTER TABLE public.weekly_group_series_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weekly_group_series_posts_select_authenticated" ON public.weekly_group_series_posts;
CREATE POLICY "weekly_group_series_posts_select_authenticated"
  ON public.weekly_group_series_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- ---------------------------------------
-- Group Post Notification Rules
-- ---------------------------------------

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
BEGIN
  IF NEW.parent_post_id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  v_actor_name := public.notification_actor_name(NEW.user_id, COALESCE(NEW.display_name, 'A member'));

  SELECT name
  INTO v_group_name
  FROM public.study_groups
  WHERE id = NEW.group_id;

  v_route := '/study-groups/' || NEW.group_id || '/chat';

  SELECT id
  INTO v_louis_id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1;

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
      v_actor_name || ' posted in ' || COALESCE(v_group_name, 'your group'),
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

WITH louis_user AS (
  SELECT id AS louis_id
  FROM auth.users
  WHERE lower(email) = 'moorelouis3@gmail.com'
  LIMIT 1
)
DELETE FROM public.notifications n
USING public.group_posts gp, louis_user lu
WHERE n.type = 'group_post'
  AND n.post_id = gp.id
  AND gp.parent_post_id IS NULL
  AND n.user_id <> gp.user_id
  AND gp.user_id <> lu.louis_id
  AND NOT EXISTS (
    SELECT 1
    FROM public.buddies b
    WHERE b.user_id_1 = LEAST(n.user_id, gp.user_id)
      AND b.user_id_2 = GREATEST(n.user_id, gp.user_id)
  );

-- ---------------------------------------
-- Push Notification Copy Fix
-- ---------------------------------------

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
    v_title := v_actor_name;

    IF NEW.message IS NOT NULL AND position(v_actor_name || ' ' in NEW.message) = 1 THEN
      v_body := substr(NEW.message, char_length(v_actor_name) + 2);
    ELSE
      v_body := COALESCE(NULLIF(NEW.message, ''), 'sent you a new alert');
    END IF;

    v_body := regexp_replace(v_body, '^\s*from bible buddy[:\s-]*', '', 'i');

    IF lower(v_body) LIKE lower(v_actor_name) || ' %' THEN
      v_body := substr(v_body, char_length(v_actor_name) + 2);
    END IF;

    v_body := COALESCE(NULLIF(btrim(v_body), ''), 'sent you a new alert');
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

-- ---------------------------------------
-- Verification
-- ---------------------------------------

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'weekly_group_trivia_sets',
    'weekly_group_trivia_scores',
    'weekly_group_questions',
    'weekly_group_polls',
    'weekly_group_poll_votes',
    'weekly_group_series_posts'
  )
ORDER BY tablename, policyname;

SELECT COUNT(*) AS remaining_group_post_notifications
FROM public.notifications
WHERE type = 'group_post';
