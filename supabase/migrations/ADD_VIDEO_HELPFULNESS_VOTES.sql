CREATE TABLE IF NOT EXISTS public.video_helpfulness_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id text NOT NULL,
  video_title text NOT NULL,
  video_url text NOT NULL,
  video_context text NOT NULL CHECK (video_context IN ('bible_year', 'bible_topics')),
  helpful boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, video_id)
);

CREATE INDEX IF NOT EXISTS video_helpfulness_votes_video_idx
  ON public.video_helpfulness_votes (video_id);

CREATE INDEX IF NOT EXISTS video_helpfulness_votes_context_idx
  ON public.video_helpfulness_votes (video_context);

ALTER TABLE public.video_helpfulness_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own video helpfulness votes" ON public.video_helpfulness_votes;
CREATE POLICY "Users can read their own video helpfulness votes"
  ON public.video_helpfulness_votes
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own video helpfulness votes" ON public.video_helpfulness_votes;
CREATE POLICY "Users can insert their own video helpfulness votes"
  ON public.video_helpfulness_votes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own video helpfulness votes" ON public.video_helpfulness_votes;
CREATE POLICY "Users can update their own video helpfulness votes"
  ON public.video_helpfulness_votes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_video_helpfulness_votes_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS video_helpfulness_votes_updated_at ON public.video_helpfulness_votes;
CREATE TRIGGER video_helpfulness_votes_updated_at
BEFORE UPDATE ON public.video_helpfulness_votes
FOR EACH ROW
EXECUTE FUNCTION public.set_video_helpfulness_votes_updated_at();
