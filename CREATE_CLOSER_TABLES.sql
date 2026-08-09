-- =====================================================
-- The Closer: comment to DM automation for Instagram, Facebook, Threads
-- =====================================================
-- Run this once in the Supabase SQL Editor.
--
-- Two tables:
--   closer_events  every comment the service has seen and what it did about it
--   closer_config  editable settings (trigger words, message templates, caps)
--
-- Safe to run more than once.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.closer_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'threads')),
  comment_id text NOT NULL,
  post_id text,
  commenter_handle text,
  commenter_id text,
  comment_text text,

  matched_trigger text,
  status text NOT NULL CHECK (status IN (
    -- Written when the comment is claimed, before anything is sent. A row
    -- stuck here means the process died mid send: visible, and deliberately
    -- not retried, because the private reply may already have gone out.
    'processing',
    'dm_sent',
    'dm_failed_fallback_posted',
    'public_reply_sent',
    'skipped_no_trigger',
    'skipped_duplicate',
    'skipped_rate_limited',
    'skipped_dry_run',
    'error'
  )),
  detail text,
  dry_run boolean NOT NULL DEFAULT true,

  created_at timestamptz NOT NULL DEFAULT now()
);

-- The dedupe guarantee. Every delivery path inserts before it sends, so a
-- webhook retry, a redeploy mid send, or two instances racing all collide here
-- instead of double messaging someone. Meta also only permits one private
-- reply per comment ever, so a double send is not just noise, it is a failure.
CREATE UNIQUE INDEX IF NOT EXISTS closer_events_platform_comment_unique
  ON public.closer_events (platform, comment_id);

CREATE INDEX IF NOT EXISTS closer_events_created_at_idx
  ON public.closer_events (created_at DESC);

CREATE INDEX IF NOT EXISTS closer_events_status_idx
  ON public.closer_events (status);

CREATE TABLE IF NOT EXISTS public.closer_config (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),

  dry_run boolean NOT NULL DEFAULT true,
  hourly_cap integer NOT NULL DEFAULT 100,
  trigger_words text[] NOT NULL DEFAULT ARRAY['BIBLE', 'APP', 'LINK', 'STUDY'],
  signup_link text NOT NULL DEFAULT 'https://www.mybiblebuddy.net/signup',

  dm_template text NOT NULL DEFAULT
    'Hey! I saw you commented on my post. So glad you want the Bible study app. Here is your link: {SIGNUP_LINK} see you inside!',

  -- Used when the DM is blocked. No link: the reader cannot be messaged, so
  -- this points them at a route that works.
  fallback_comment_template text NOT NULL DEFAULT
    'Just sent you the link in your DMs! If you do not see it, Instagram may have filtered it because we are not connected yet. Follow me and send me a quick message, or tap the link in my bio, and I will make sure you get it.',

  -- Threads has no DM API, and public replies there and on Facebook may carry
  -- a link, so this one does.
  public_reply_template text NOT NULL DEFAULT
    'So glad you want the Bible study app! Here is your link: {SIGNUP_LINK}',

  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.closer_config (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Both tables are written only by the service using the service role key,
-- which bypasses RLS. Enabling RLS with no policy means nothing reached
-- through the public anon key can read commenter handles or message history.
ALTER TABLE public.closer_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.closer_config ENABLE ROW LEVEL SECURITY;

SELECT 'closer_events' AS table_name, count(*) AS rows FROM public.closer_events
UNION ALL
SELECT 'closer_config', count(*) FROM public.closer_config;
