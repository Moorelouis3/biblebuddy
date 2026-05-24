CREATE TABLE IF NOT EXISTS public.article_comment_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES public.article_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

CREATE INDEX IF NOT EXISTS article_comment_likes_comment_id_idx
  ON public.article_comment_likes (comment_id);

CREATE INDEX IF NOT EXISTS article_comment_likes_user_id_idx
  ON public.article_comment_likes (user_id);

ALTER TABLE public.article_comment_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read article comment likes" ON public.article_comment_likes;
CREATE POLICY "Anyone can read article comment likes"
  ON public.article_comment_likes
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can like article comments" ON public.article_comment_likes;
CREATE POLICY "Users can like article comments"
  ON public.article_comment_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their article comment likes" ON public.article_comment_likes;
CREATE POLICY "Users can remove their article comment likes"
  ON public.article_comment_likes
  FOR DELETE
  USING (auth.uid() = user_id);
