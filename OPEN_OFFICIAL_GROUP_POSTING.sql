-- Make posting and replying in the official Bible Buddy Study Group open to all signed-in users
-- Run once in Supabase SQL Editor

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

-- Verify the official group can be posted in
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'group_posts';
