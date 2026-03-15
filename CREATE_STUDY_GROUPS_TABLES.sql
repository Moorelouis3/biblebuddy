-- ============================================================
-- Bible Study Groups — Schema + RLS Policies
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. study_groups
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.study_groups (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 text NOT NULL,
  description          text,
  leader_user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  leader_name          text,
  category             text NOT NULL DEFAULT 'mixed'
                         CHECK (category IN ('mixed', 'women', 'men', 'youth')),
  status               text NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active', 'coming_soon', 'archived')),
  member_count         int NOT NULL DEFAULT 0,
  max_members          int NOT NULL DEFAULT 50,
  current_weekly_study text,
  cover_emoji          text,
  cover_color          text,
  invite_code          text UNIQUE,
  created_at           timestamptz NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- 2. group_members
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_members (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id     uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  role         text NOT NULL DEFAULT 'member'
                 CHECK (role IN ('member', 'moderator', 'leader')),
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at timestamptz NOT NULL DEFAULT now(),
  joined_at    timestamptz,
  UNIQUE (group_id, user_id)
);

-- ────────────────────────────────────────────────────────────
-- 3. group_posts
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_posts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id       uuid NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name   text,
  category       text NOT NULL DEFAULT 'general'
                   CHECK (category IN ('general', 'bible_studies', 'updates', 'prayer', 'qa')),
  content        text NOT NULL,
  like_count     int NOT NULL DEFAULT 0,
  parent_post_id uuid REFERENCES public.group_posts(id) ON DELETE CASCADE,
  is_pinned      boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- 4. group_post_likes
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_post_likes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

-- ────────────────────────────────────────────────────────────
-- 5. Trigger: keep study_groups.member_count in sync
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_group_member_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'approved' THEN
    UPDATE public.study_groups
    SET member_count = member_count + 1
    WHERE id = NEW.group_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'approved' AND NEW.status = 'approved' THEN
      UPDATE public.study_groups
      SET member_count = member_count + 1
      WHERE id = NEW.group_id;
    ELSIF OLD.status = 'approved' AND NEW.status != 'approved' THEN
      UPDATE public.study_groups
      SET member_count = GREATEST(member_count - 1, 0)
      WHERE id = NEW.group_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'approved' THEN
    UPDATE public.study_groups
    SET member_count = GREATEST(member_count - 1, 0)
    WHERE id = OLD.group_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_group_member_count ON public.group_members;
CREATE TRIGGER trg_group_member_count
AFTER INSERT OR UPDATE OF status OR DELETE ON public.group_members
FOR EACH ROW EXECUTE FUNCTION public.update_group_member_count();

-- ────────────────────────────────────────────────────────────
-- 6. Enable RLS on all tables
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.study_groups       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_post_likes   ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 7. RLS Policies — study_groups
-- ────────────────────────────────────────────────────────────
-- Anyone authenticated can read
CREATE POLICY "study_groups_select"
  ON public.study_groups FOR SELECT
  TO authenticated
  USING (true);

-- Only the leader can update their group
CREATE POLICY "study_groups_update_leader"
  ON public.study_groups FOR UPDATE
  TO authenticated
  USING (leader_user_id = auth.uid());

-- Only the leader can delete their group
CREATE POLICY "study_groups_delete_leader"
  ON public.study_groups FOR DELETE
  TO authenticated
  USING (leader_user_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- 8. RLS Policies — group_members
-- ────────────────────────────────────────────────────────────
-- Anyone authenticated can read members
CREATE POLICY "group_members_select"
  ON public.group_members FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own membership request
CREATE POLICY "group_members_insert_own"
  ON public.group_members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Leader of the group can update any member row (approve/reject)
CREATE POLICY "group_members_update_leader"
  ON public.group_members FOR UPDATE
  TO authenticated
  USING (
    group_id IN (
      SELECT id FROM public.study_groups
      WHERE leader_user_id = auth.uid()
    )
  );

-- Users can delete their own membership (leave group)
CREATE POLICY "group_members_delete_own"
  ON public.group_members FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- 9. RLS Policies — group_posts
-- ────────────────────────────────────────────────────────────
-- Anyone authenticated can read posts
CREATE POLICY "group_posts_select"
  ON public.group_posts FOR SELECT
  TO authenticated
  USING (true);

-- Only approved members can insert posts
CREATE POLICY "group_posts_insert_approved"
  ON public.group_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND group_id IN (
      SELECT group_id FROM public.group_members
      WHERE user_id = auth.uid() AND status = 'approved'
    )
  );

-- Users can delete their own posts; leader can delete any post in their group
CREATE POLICY "group_posts_delete"
  ON public.group_posts FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR group_id IN (
      SELECT id FROM public.study_groups
      WHERE leader_user_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 10. RLS Policies — group_post_likes
-- ────────────────────────────────────────────────────────────
-- Anyone authenticated can read likes
CREATE POLICY "group_post_likes_select"
  ON public.group_post_likes FOR SELECT
  TO authenticated
  USING (true);

-- Users can like (insert their own row)
CREATE POLICY "group_post_likes_insert_own"
  ON public.group_post_likes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can unlike (delete their own row)
CREATE POLICY "group_post_likes_delete_own"
  ON public.group_post_likes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
