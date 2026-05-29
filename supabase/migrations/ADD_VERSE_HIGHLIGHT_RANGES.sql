CREATE TABLE IF NOT EXISTS public.verse_highlight_ranges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book text NOT NULL,
  chapter integer NOT NULL CHECK (chapter > 0),
  verse integer NOT NULL CHECK (verse > 0),
  start_offset integer NOT NULL CHECK (start_offset >= 0),
  end_offset integer NOT NULL CHECK (end_offset > start_offset),
  selected_text text NOT NULL,
  color text NOT NULL DEFAULT 'yellow' CHECK (color IN ('yellow', 'green', 'blue', 'purple', 'orange')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS verse_highlight_ranges_user_reference_idx
  ON public.verse_highlight_ranges (user_id, book, chapter, verse, start_offset);

CREATE UNIQUE INDEX IF NOT EXISTS verse_highlight_ranges_unique_range_idx
  ON public.verse_highlight_ranges (user_id, book, chapter, verse, start_offset, end_offset);

ALTER TABLE public.verse_highlight_ranges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own verse highlight ranges" ON public.verse_highlight_ranges;
CREATE POLICY "Users can read their own verse highlight ranges"
  ON public.verse_highlight_ranges
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own verse highlight ranges" ON public.verse_highlight_ranges;
CREATE POLICY "Users can insert their own verse highlight ranges"
  ON public.verse_highlight_ranges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own verse highlight ranges" ON public.verse_highlight_ranges;
CREATE POLICY "Users can update their own verse highlight ranges"
  ON public.verse_highlight_ranges
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own verse highlight ranges" ON public.verse_highlight_ranges;
CREATE POLICY "Users can delete their own verse highlight ranges"
  ON public.verse_highlight_ranges
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_verse_highlight_ranges_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.book = lower(trim(NEW.book));
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS verse_highlight_ranges_updated_at ON public.verse_highlight_ranges;
CREATE TRIGGER verse_highlight_ranges_updated_at
BEFORE INSERT OR UPDATE ON public.verse_highlight_ranges
FOR EACH ROW
EXECUTE FUNCTION public.set_verse_highlight_ranges_updated_at();
