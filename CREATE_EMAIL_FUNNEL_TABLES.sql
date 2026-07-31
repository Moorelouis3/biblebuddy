-- =====================================================
-- 7-Day Email Funnel Tables
-- =====================================================

-- Track when emails are sent to avoid duplicates and monitor funnel progression
CREATE TABLE public.email_funnel_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_day smallint NOT NULL, -- 1-8 for days in the funnel
  template_version text, -- e.g., "day4_version_a", "day4_version_b", "day4_version_c", "day4_version_a_pro"
  sent_at timestamptz DEFAULT now(),
  systeme_io_response jsonb, -- store the full response from systeme.io
  created_at timestamptz DEFAULT now()
);

-- Add index for efficient lookups
CREATE INDEX email_funnel_sends_user_day_idx
ON public.email_funnel_sends (user_id, email_day);

-- Track user tier progression through the funnel
CREATE TABLE public.user_email_funnel_tier (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier text NOT NULL DEFAULT 'unknown', -- 'power_user', 'regular_user', 'ghost', 'unknown'
  determined_at timestamptz, -- when we determined their engagement level
  last_updated_at timestamptz DEFAULT now(),
  logins_in_first_7_days smallint DEFAULT 0,
  deliberate_actions_in_first_7_days smallint DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Track email opens and clicks for analytics
CREATE TABLE public.email_funnel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_day smallint NOT NULL,
  event_type text NOT NULL, -- 'opened', 'clicked', 'bounced', 'unsubscribed'
  event_data jsonb, -- e.g., which link was clicked, timestamp, etc
  created_at timestamptz DEFAULT now()
);

CREATE INDEX email_funnel_events_user_day_idx
ON public.email_funnel_events (user_id, email_day);

-- Store email funnel schedule/state for each user
CREATE TABLE public.email_funnel_state (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  signup_timestamp timestamptz NOT NULL, -- when they signed up
  day1_sent_at timestamptz,
  day2_sent_at timestamptz,
  day3_sent_at timestamptz,
  day4_sent_at timestamptz,
  day4_version text, -- which version was sent (a, a_pro, b, c)
  day5_sent_at timestamptz,
  day6_sent_at timestamptz,
  day7_sent_at timestamptz,
  day8_sent_at timestamptz,
  day8_version text, -- which version was sent (a, a_pro, b, c)
  funnel_completed_at timestamptz, -- when they completed the 8-day sequence
  is_pro boolean DEFAULT false, -- track if user upgraded during funnel
  tier_at_completion text, -- what tier they were in when funnel ended
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX email_funnel_state_signup_idx
ON public.email_funnel_state (signup_timestamp);

-- Enable RLS
ALTER TABLE public.email_funnel_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_email_funnel_tier ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_funnel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_funnel_state ENABLE ROW LEVEL SECURITY;

-- Policies - users can see their own records, admins can see all
CREATE POLICY "email_funnel_sends_select_own"
ON public.email_funnel_sends
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "email_funnel_sends_insert_own"
ON public.email_funnel_sends
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NOT NULL);

CREATE POLICY "user_email_funnel_tier_select_own"
ON public.user_email_funnel_tier
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "email_funnel_events_select_own"
ON public.email_funnel_events
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "email_funnel_state_select_own"
ON public.email_funnel_state
FOR SELECT
USING (auth.uid() = user_id);
