ALTER TABLE public.verse_highlight_ranges
  ADD COLUMN IF NOT EXISTS note_text text,
  ADD COLUMN IF NOT EXISTS note_updated_at timestamptz;

CREATE INDEX IF NOT EXISTS verse_highlight_ranges_user_notes_idx
  ON public.verse_highlight_ranges (user_id, updated_at DESC)
  WHERE note_text IS NOT NULL;
