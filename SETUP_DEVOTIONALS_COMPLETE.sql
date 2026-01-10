-- Complete setup for devotionals tables
-- Run this FIRST to create tables and set up RLS policies
-- Then you can run the seed script

-- Main devotionals table
CREATE TABLE IF NOT EXISTS public.devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  total_days integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Devotional days table (content for each day)
CREATE TABLE IF NOT EXISTS public.devotional_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  devotional_id uuid NOT NULL REFERENCES public.devotionals(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  day_title text NOT NULL,
  devotional_text text NOT NULL,
  bible_reading_book text NOT NULL,
  bible_reading_chapter integer NOT NULL,
  reflection_question text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(devotional_id, day_number)
);

-- Devotional progress table (user completion tracking)
-- Note: Using devotional_progress to match existing CREATE_DEVOTIONALS_TABLES.sql
CREATE TABLE IF NOT EXISTS public.devotional_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  devotional_id uuid NOT NULL REFERENCES public.devotionals(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  is_completed boolean DEFAULT false,
  reading_completed boolean DEFAULT false,
  reflection_text text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, devotional_id, day_number)
);

-- Enable RLS
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotional_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotional_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "devotionals_select_authenticated" ON public.devotionals;
DROP POLICY IF EXISTS "devotional_days_select_authenticated" ON public.devotional_days;
DROP POLICY IF EXISTS "devotionals_select_anon" ON public.devotionals;
DROP POLICY IF EXISTS "devotional_days_select_anon" ON public.devotional_days;
DROP POLICY IF EXISTS "devotionals_select_all" ON public.devotionals;
DROP POLICY IF EXISTS "devotional_days_select_all" ON public.devotional_days;

-- Allow authenticated users to read devotionals and days
CREATE POLICY "devotionals_select_authenticated"
ON public.devotionals
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "devotional_days_select_authenticated"
ON public.devotional_days
FOR SELECT
TO authenticated
USING (true);

-- Allow anon/public users to read devotionals and days (so they show up without login)
CREATE POLICY "devotionals_select_anon"
ON public.devotionals
FOR SELECT
TO anon
USING (true);

CREATE POLICY "devotional_days_select_anon"
ON public.devotional_days
FOR SELECT
TO anon
USING (true);

-- RLS Policies for devotional_progress (users can read/write their own progress)
DROP POLICY IF EXISTS "devotional_progress_select_own" ON public.devotional_progress;
DROP POLICY IF EXISTS "devotional_progress_insert_own" ON public.devotional_progress;
DROP POLICY IF EXISTS "devotional_progress_update_own" ON public.devotional_progress;

CREATE POLICY "devotional_progress_select_own"
ON public.devotional_progress
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "devotional_progress_insert_own"
ON public.devotional_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "devotional_progress_update_own"
ON public.devotional_progress
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_devotional_days_devotional_id ON public.devotional_days(devotional_id);
CREATE INDEX IF NOT EXISTS idx_devotional_days_day_number ON public.devotional_days(devotional_id, day_number);
CREATE INDEX IF NOT EXISTS idx_devotional_progress_user_devotional ON public.devotional_progress(user_id, devotional_id);
CREATE INDEX IF NOT EXISTS idx_devotional_progress_user_day ON public.devotional_progress(user_id, devotional_id, day_number);

