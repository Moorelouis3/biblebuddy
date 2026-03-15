-- ============================================================
-- Group Series Tables
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── group_series ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_series (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id      uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  title         text NOT NULL,
  description   text,
  total_weeks   int NOT NULL DEFAULT 1,
  current_week  int NOT NULL DEFAULT 1,
  is_current    boolean NOT NULL DEFAULT false,
  created_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.group_series ENABLE ROW LEVEL SECURITY;

-- Approved members can read series
CREATE POLICY "group_series_select_members" ON public.group_series
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.status = 'approved'
    )
  );

-- Only leader can insert/update/delete
CREATE POLICY "group_series_insert_leader" ON public.group_series
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

CREATE POLICY "group_series_update_leader" ON public.group_series
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

CREATE POLICY "group_series_delete_leader" ON public.group_series
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

-- ── group_series_posts ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_series_posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id     uuid NOT NULL REFERENCES public.group_series(id) ON DELETE CASCADE,
  group_id      uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  week_number   int NOT NULL,
  title         text NOT NULL,
  content       text NOT NULL,
  is_published  boolean NOT NULL DEFAULT false,
  like_count    int NOT NULL DEFAULT 0,
  comment_count int NOT NULL DEFAULT 0,
  created_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  published_at  timestamptz
);

ALTER TABLE public.group_series_posts ENABLE ROW LEVEL SECURITY;

-- Members can read published posts; leaders can read all
CREATE POLICY "group_series_posts_select" ON public.group_series_posts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_posts.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.status = 'approved'
        AND (
          group_members.role = 'leader'
          OR group_series_posts.is_published = true
        )
    )
  );

CREATE POLICY "group_series_posts_insert_leader" ON public.group_series_posts
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_posts.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

CREATE POLICY "group_series_posts_update_leader" ON public.group_series_posts
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_posts.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

CREATE POLICY "group_series_posts_delete_leader" ON public.group_series_posts
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_posts.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.role = 'leader'
        AND group_members.status = 'approved'
    )
  );

-- ── group_series_post_comments ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_series_post_comments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id           uuid NOT NULL REFERENCES public.group_series_posts(id) ON DELETE CASCADE,
  group_id          uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name      text NOT NULL,
  content           text NOT NULL,
  parent_comment_id uuid REFERENCES public.group_series_post_comments(id) ON DELETE CASCADE,
  like_count        int NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.group_series_post_comments ENABLE ROW LEVEL SECURITY;

-- Approved members can read comments
CREATE POLICY "series_comments_select" ON public.group_series_post_comments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_post_comments.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.status = 'approved'
    )
  );

-- Approved members can insert their own comments
CREATE POLICY "series_comments_insert" ON public.group_series_post_comments
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_series_post_comments.group_id
        AND group_members.user_id = auth.uid()
        AND group_members.status = 'approved'
    )
  );

-- Users can delete their own comments
CREATE POLICY "series_comments_delete_own" ON public.group_series_post_comments
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ── group_series_post_likes ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_series_post_likes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid NOT NULL REFERENCES public.group_series_posts(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

ALTER TABLE public.group_series_post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "series_post_likes_select" ON public.group_series_post_likes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "series_post_likes_insert" ON public.group_series_post_likes
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "series_post_likes_delete" ON public.group_series_post_likes
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ── group_series_comment_likes ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_series_comment_likes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES public.group_series_post_comments(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

ALTER TABLE public.group_series_comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "series_comment_likes_select" ON public.group_series_comment_likes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "series_comment_likes_insert" ON public.group_series_comment_likes
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "series_comment_likes_delete" ON public.group_series_comment_likes
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ── Trigger: auto-update comment_count on group_series_posts ─
CREATE OR REPLACE FUNCTION public.update_series_post_comment_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.group_series_posts
    SET comment_count = comment_count + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.group_series_posts
    SET comment_count = GREATEST(0, comment_count - 1)
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_series_comment_count ON public.group_series_post_comments;
CREATE TRIGGER trg_series_comment_count
  AFTER INSERT OR DELETE ON public.group_series_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_series_post_comment_count();
