-- Add likes + replies support for Bible series reflections
-- Run once in Supabase SQL Editor

ALTER TABLE public.series_reflections
ADD COLUMN IF NOT EXISTS parent_reflection_id uuid REFERENCES public.series_reflections(id) ON DELETE CASCADE;

ALTER TABLE public.series_reflections
ADD COLUMN IF NOT EXISTS like_count int NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.series_reflection_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reflection_id uuid REFERENCES public.series_reflections(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(reflection_id, user_id)
);

ALTER TABLE public.series_reflection_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "srl_select" ON public.series_reflection_likes;
CREATE POLICY "srl_select"
ON public.series_reflection_likes
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "srl_insert" ON public.series_reflection_likes;
CREATE POLICY "srl_insert"
ON public.series_reflection_likes
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "srl_delete_own" ON public.series_reflection_likes;
CREATE POLICY "srl_delete_own"
ON public.series_reflection_likes
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_sr_parent
ON public.series_reflections (parent_reflection_id);

CREATE INDEX IF NOT EXISTS idx_srl_reflection
ON public.series_reflection_likes (reflection_id);
