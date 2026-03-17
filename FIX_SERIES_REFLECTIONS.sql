-- Ensure Bible series reflections are fully wired in Supabase
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.series_reflections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  series_id uuid REFERENCES public.group_series(id) ON DELETE CASCADE,
  week_number int NOT NULL,
  content text NOT NULL,
  display_name text,
  profile_image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.series_reflections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sr_select" ON public.series_reflections;
CREATE POLICY "sr_select"
ON public.series_reflections
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "sr_insert" ON public.series_reflections;
CREATE POLICY "sr_insert"
ON public.series_reflections
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "sr_delete_own" ON public.series_reflections;
CREATE POLICY "sr_delete_own"
ON public.series_reflections
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_sr_series_week
ON public.series_reflections (series_id, week_number, created_at DESC);

SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'series_reflections';
