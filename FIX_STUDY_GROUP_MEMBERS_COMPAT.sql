-- Fix old database objects that still reference study_group_members
-- Run once in Supabase SQL Editor

-- 1. Create a compatibility view so old policies/functions stop breaking.
CREATE OR REPLACE VIEW public.study_group_members AS
SELECT *
FROM public.group_members;

-- 2. Recreate the official group posting policy using the real table name.
DROP POLICY IF EXISTS "group_posts_insert_approved" ON public.group_posts;
DROP POLICY IF EXISTS "group_posts_insert_open_official_or_member" ON public.group_posts;

CREATE POLICY "group_posts_insert_open_official_or_member"
  ON public.group_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      group_id IN (
        SELECT gm.group_id
        FROM public.group_members gm
        WHERE gm.user_id = auth.uid()
          AND gm.status = 'approved'
      )
      OR group_id IN (
        SELECT sg.id
        FROM public.study_groups sg
        WHERE sg.name IN ('Bible Buddy Study Group', 'Hope Nation')
      )
    )
  );

-- 3. Verify both names exist now.
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name = 'study_group_members';

SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'group_posts';
