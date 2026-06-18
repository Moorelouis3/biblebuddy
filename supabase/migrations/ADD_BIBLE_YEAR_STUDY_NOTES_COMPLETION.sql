ALTER TABLE public.bible_year_day_progress
  ADD COLUMN IF NOT EXISTS study_notes_completed boolean NOT NULL DEFAULT false;
