CREATE TABLE IF NOT EXISTS public.bible_year_day_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_number integer NOT NULL CHECK (day_number >= 1 AND day_number <= 365),
  reading_completed boolean NOT NULL DEFAULT false,
  trivia_completed boolean NOT NULL DEFAULT false,
  reflection_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day_number)
);

CREATE INDEX IF NOT EXISTS bible_year_day_progress_user_day_idx
  ON public.bible_year_day_progress (user_id, day_number);

ALTER TABLE public.bible_year_day_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own Bible year progress" ON public.bible_year_day_progress;
CREATE POLICY "Users can read their own Bible year progress"
  ON public.bible_year_day_progress
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own Bible year progress" ON public.bible_year_day_progress;
CREATE POLICY "Users can insert their own Bible year progress"
  ON public.bible_year_day_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own Bible year progress" ON public.bible_year_day_progress;
CREATE POLICY "Users can update their own Bible year progress"
  ON public.bible_year_day_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_bible_year_day_progress_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bible_year_day_progress_updated_at ON public.bible_year_day_progress;
CREATE TRIGGER bible_year_day_progress_updated_at
BEFORE UPDATE ON public.bible_year_day_progress
FOR EACH ROW
EXECUTE FUNCTION public.set_bible_year_day_progress_updated_at();
