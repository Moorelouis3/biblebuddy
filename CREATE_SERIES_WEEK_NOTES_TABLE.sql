-- Store large study notes outside the client bundle
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.series_week_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  series_key text NOT NULL,
  week_number integer NOT NULL,
  notes_text text,
  notes_html text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (series_key, week_number)
);

ALTER TABLE public.series_week_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "series_week_notes_select_all"
ON public.series_week_notes
FOR SELECT
TO authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.touch_series_week_notes_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_series_week_notes_updated_at ON public.series_week_notes;
CREATE TRIGGER trg_series_week_notes_updated_at
BEFORE UPDATE ON public.series_week_notes
FOR EACH ROW
EXECUTE FUNCTION public.touch_series_week_notes_updated_at();

CREATE INDEX IF NOT EXISTS idx_series_week_notes_series_week
ON public.series_week_notes(series_key, week_number);
