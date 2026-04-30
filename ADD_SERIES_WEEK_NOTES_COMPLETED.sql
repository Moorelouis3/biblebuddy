-- Add notes completion tracking to weekly Bible study series progress.
-- Existing fully completed weeks are grandfathered in by marking notes_completed = true.

ALTER TABLE public.series_week_progress
ADD COLUMN IF NOT EXISTS notes_completed boolean DEFAULT false NOT NULL;

UPDATE public.series_week_progress
SET notes_completed = true
WHERE reading_completed = true
  AND trivia_completed = true
  AND reflection_posted = true
  AND notes_completed = false;
