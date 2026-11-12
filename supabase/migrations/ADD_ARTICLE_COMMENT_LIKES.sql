-- Likes on study comments (article_comments).
--
-- Run in production on 2026-11-12. Until then this table did not exist: the
-- file had been written but never run, so every like read failed with
-- "Could not find the table 'public.article_comment_likes' in the schema
-- cache" and no like was ever saved.
--
-- This is the only copy. A second, slightly different version used to sit in
-- the repo root; it was removed so there is one source of truth.
--
-- SAFE TO RE-RUN.

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

-- Signed-in accounts only. The public key reads nothing, the same as every
-- other likes table (anonymous access was closed on 2026-11-09).
DROP POLICY IF EXISTS "Anyone can read article comment likes" ON public.article_comment_likes;
DROP POLICY IF EXISTS "article_comment_likes_select_all" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_select_all"
  ON public.article_comment_likes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can like article comments" ON public.article_comment_likes;
DROP POLICY IF EXISTS "article_comment_likes_insert_own" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_insert_own"
  ON public.article_comment_likes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can remove their article comment likes" ON public.article_comment_likes;
DROP POLICY IF EXISTS "article_comment_likes_delete_own" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_delete_own"
  ON public.article_comment_likes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Same guard BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql puts on the other community
-- tables. That file skipped this one because the table was not there.
DROP POLICY IF EXISTS "article_comment_likes_no_anonymous_write" ON public.article_comment_likes;
CREATE POLICY "article_comment_likes_no_anonymous_write"
  ON public.article_comment_likes AS RESTRICTIVE FOR INSERT
  TO authenticated
  WITH CHECK (coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false);

GRANT SELECT, INSERT, DELETE ON public.article_comment_likes TO authenticated;
GRANT ALL ON public.article_comment_likes TO service_role;

NOTIFY pgrst, 'reload schema';
