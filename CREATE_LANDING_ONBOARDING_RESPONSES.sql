-- Create dedicated storage for the new landing-page onboarding quiz.
-- Run once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS public.landing_onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  goal text NOT NULL,
  experience text NOT NULL,
  age_range text,
  time_commitment text NOT NULL,
  difficulty text NOT NULL,
  recommended_journey text DEFAULT 'Bible in One Year',
  recommended_days integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS landing_onboarding_responses_goal_idx
  ON public.landing_onboarding_responses (goal);

ALTER TABLE public.landing_onboarding_responses
  ADD COLUMN IF NOT EXISTS age_range text;

CREATE INDEX IF NOT EXISTS landing_onboarding_responses_experience_idx
  ON public.landing_onboarding_responses (experience);

CREATE INDEX IF NOT EXISTS landing_onboarding_responses_age_range_idx
  ON public.landing_onboarding_responses (age_range);

CREATE INDEX IF NOT EXISTS landing_onboarding_responses_time_commitment_idx
  ON public.landing_onboarding_responses (time_commitment);

CREATE INDEX IF NOT EXISTS landing_onboarding_responses_difficulty_idx
  ON public.landing_onboarding_responses (difficulty);

ALTER TABLE public.landing_onboarding_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "landing_onboarding_select_own" ON public.landing_onboarding_responses;
CREATE POLICY "landing_onboarding_select_own"
ON public.landing_onboarding_responses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "landing_onboarding_insert_own" ON public.landing_onboarding_responses;
CREATE POLICY "landing_onboarding_insert_own"
ON public.landing_onboarding_responses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "landing_onboarding_update_own" ON public.landing_onboarding_responses;
CREATE POLICY "landing_onboarding_update_own"
ON public.landing_onboarding_responses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS landing_onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS onboarding_time_commitment text,
  ADD COLUMN IF NOT EXISTS onboarding_difficulty text;

CREATE TABLE IF NOT EXISTS public.landing_page_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  session_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source text DEFAULT 'Direct / Unknown',
  referrer text,
  page_path text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS landing_page_events_event_name_idx
  ON public.landing_page_events (event_name);

CREATE INDEX IF NOT EXISTS landing_page_events_session_id_idx
  ON public.landing_page_events (session_id);

CREATE INDEX IF NOT EXISTS landing_page_events_source_idx
  ON public.landing_page_events (source);

CREATE INDEX IF NOT EXISTS landing_page_events_created_at_idx
  ON public.landing_page_events (created_at);

ALTER TABLE public.landing_page_events ENABLE ROW LEVEL SECURITY;
