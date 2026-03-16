-- Add likes support for Bible study hub articles/cards
-- Run once in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.article_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(article_slug, user_id)
);

ALTER TABLE public.article_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "article_likes_select_all" ON public.article_likes;
CREATE POLICY "article_likes_select_all"
  ON public.article_likes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "article_likes_insert_own" ON public.article_likes;
CREATE POLICY "article_likes_insert_own"
  ON public.article_likes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "article_likes_delete_own" ON public.article_likes;
CREATE POLICY "article_likes_delete_own"
  ON public.article_likes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_article_likes_slug ON public.article_likes(article_slug);
CREATE INDEX IF NOT EXISTS idx_article_likes_user ON public.article_likes(user_id);

SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'article_likes';
