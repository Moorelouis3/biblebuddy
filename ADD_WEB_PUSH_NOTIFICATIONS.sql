-- Web Push notifications for Bible Buddy
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.push_notification_jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_id uuid NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts int NOT NULL DEFAULT 0,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_push_jobs_notification_user
  ON public.push_notification_jobs (notification_id, user_id);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user
  ON public.push_subscriptions (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_push_jobs_status_created
  ON public.push_notification_jobs (status, created_at ASC);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_notification_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "push_subscriptions_select_own" ON public.push_subscriptions;
CREATE POLICY "push_subscriptions_select_own"
  ON public.push_subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "push_subscriptions_insert_own" ON public.push_subscriptions;
CREATE POLICY "push_subscriptions_insert_own"
  ON public.push_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "push_subscriptions_update_own" ON public.push_subscriptions;
CREATE POLICY "push_subscriptions_update_own"
  ON public.push_subscriptions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "push_subscriptions_delete_own" ON public.push_subscriptions;
CREATE POLICY "push_subscriptions_delete_own"
  ON public.push_subscriptions
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "push_jobs_select_own" ON public.push_notification_jobs;
CREATE POLICY "push_jobs_select_own"
  ON public.push_notification_jobs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.queue_push_notification_job()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_url text;
BEGIN
  v_url := COALESCE(NEW.article_slug, '/dashboard');

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

  INSERT INTO public.push_notification_jobs (
    notification_id,
    user_id,
    payload
  )
  VALUES (
    NEW.id,
    NEW.user_id,
    jsonb_build_object(
      'title', COALESCE(NULLIF(NEW.from_user_name, ''), 'Bible Buddy'),
      'body', COALESCE(NULLIF(NEW.message, ''), 'You have a new alert'),
      'url', v_url,
      'type', COALESCE(NEW.type, 'notification'),
      'notificationId', NEW.id
    )
  )
  ON CONFLICT (notification_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_queue_push_notification_job ON public.notifications;
CREATE TRIGGER trg_queue_push_notification_job
  AFTER INSERT ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_push_notification_job();

SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('push_subscriptions', 'push_notification_jobs')
ORDER BY tablename, policyname;
