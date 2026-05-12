-- Add likes support for Bible study reflection/article comments.
-- Run once in Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS public.article_comment_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES public.article_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

ALTER TABLE public.article_comment_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "article_comment_likes_select_all" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_select_all"
  ON public.article_comment_likes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "article_comment_likes_insert_own" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_insert_own"
  ON public.article_comment_likes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "article_comment_likes_delete_own" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_delete_own"
  ON public.article_comment_likes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_article_comment_likes_comment ON public.article_comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_article_comment_likes_user ON public.article_comment_likes(user_id);
