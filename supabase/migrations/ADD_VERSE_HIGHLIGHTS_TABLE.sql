CREATE TABLE IF NOT EXISTS public.highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book text NOT NULL,
  chapter integer NOT NULL CHECK (chapter > 0),
  verse integer NOT NULL CHECK (verse > 0),
  color text NOT NULL DEFAULT 'yellow' CHECK (color IN ('yellow', 'green', 'blue', 'purple', 'orange')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book, chapter, verse)
);

CREATE INDEX IF NOT EXISTS highlights_user_reference_idx
  ON public.highlights (user_id, book, chapter, verse);

ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own verse highlights" ON public.highlights;
CREATE POLICY "Users can read their own verse highlights"
  ON public.highlights
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own verse highlights" ON public.highlights;
CREATE POLICY "Users can insert their own verse highlights"
  ON public.highlights
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own verse highlights" ON public.highlights;
CREATE POLICY "Users can update their own verse highlights"
  ON public.highlights
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own verse highlights" ON public.highlights;
CREATE POLICY "Users can delete their own verse highlights"
  ON public.highlights
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_highlights_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.book = lower(trim(NEW.book));
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS highlights_updated_at ON public.highlights;
CREATE TRIGGER highlights_updated_at
BEFORE INSERT OR UPDATE ON public.highlights
FOR EACH ROW
EXECUTE FUNCTION public.set_highlights_updated_at();
