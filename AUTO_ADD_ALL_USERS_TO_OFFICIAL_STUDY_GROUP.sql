-- ============================================================
-- Make "Bible Buddy Study Group" open to all users automatically
-- Run once in Supabase SQL Editor
--
-- What this does:
-- 1. Finds the official study group by its renamed title
-- 2. Approves any existing member rows stuck in pending/rejected
-- 3. Adds every existing auth user to the group as approved
-- 4. Auto-adds all future auth users to the group as approved
-- 5. Refreshes the group's cached member_count
-- ============================================================

DO $$
DECLARE
  v_group_id uuid;
BEGIN
  SELECT id INTO v_group_id
  FROM public.study_groups
  WHERE name = 'Bible Buddy Study Group'
  LIMIT 1;

  IF v_group_id IS NULL THEN
    RAISE EXCEPTION 'Bible Buddy Study Group not found.';
  END IF;

  -- 1. Approve any existing member rows for the official group.
  UPDATE public.group_members gm
  SET
    status = 'approved',
    joined_at = COALESCE(gm.joined_at, now()),
    display_name = COALESCE(gm.display_name, ps.display_name, ps.username, split_part(u.email, '@', 1), 'Member')
  FROM auth.users u
  LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
  WHERE gm.group_id = v_group_id
    AND gm.user_id = u.id
    AND gm.status <> 'approved';

  -- 2. Insert every missing auth user into the official group.
  INSERT INTO public.group_members (
    group_id,
    user_id,
    display_name,
    role,
    status,
    joined_at
  )
  SELECT
    v_group_id,
    u.id,
    COALESCE(ps.display_name, ps.username, split_part(u.email, '@', 1), 'Member'),
    'member',
    'approved',
    now()
  FROM auth.users u
  LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.group_members gm
    WHERE gm.group_id = v_group_id
      AND gm.user_id = u.id
  )
  ON CONFLICT (group_id, user_id) DO UPDATE
  SET
    status = 'approved',
    joined_at = COALESCE(public.group_members.joined_at, EXCLUDED.joined_at),
    display_name = COALESCE(public.group_members.display_name, EXCLUDED.display_name);

  -- 3. Future signups should be auto-added immediately.
  CREATE OR REPLACE FUNCTION public.auto_join_official_bible_study_group()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $fn$
  DECLARE
    v_group_id_inner uuid;
  BEGIN
    SELECT id INTO v_group_id_inner
    FROM public.study_groups
    WHERE name = 'Bible Buddy Study Group'
    LIMIT 1;

    IF v_group_id_inner IS NOT NULL THEN
      INSERT INTO public.group_members (
        group_id,
        user_id,
        display_name,
        role,
        status,
        joined_at
      )
      VALUES (
        v_group_id_inner,
        NEW.id,
        COALESCE(split_part(NEW.email, '@', 1), 'Member'),
        'member',
        'approved',
        now()
      )
      ON CONFLICT (group_id, user_id) DO UPDATE
      SET
        status = 'approved',
        joined_at = COALESCE(public.group_members.joined_at, EXCLUDED.joined_at),
        display_name = COALESCE(public.group_members.display_name, EXCLUDED.display_name);
    END IF;

    RETURN NEW;
  END;
  $fn$;

  DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON public.profile_stats;
  DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON auth.users;
  DROP TRIGGER IF EXISTS trg_auto_join_official_bible_study_group ON auth.users;

  CREATE TRIGGER trg_auto_join_official_bible_study_group
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_join_official_bible_study_group();

  -- 4. Refresh cached member count from approved members.
  UPDATE public.study_groups sg
  SET member_count = (
    SELECT COUNT(*)
    FROM public.group_members gm
    WHERE gm.group_id = sg.id
      AND gm.status = 'approved'
  )
  WHERE sg.id = v_group_id;
END $$;

-- Verify the official group membership count
SELECT
  sg.id,
  sg.name,
  sg.member_count AS cached_member_count,
  COUNT(gm.id) FILTER (WHERE gm.status = 'approved') AS actual_approved_members
FROM public.study_groups sg
LEFT JOIN public.group_members gm
  ON gm.group_id = sg.id
WHERE sg.name = 'Bible Buddy Study Group'
GROUP BY sg.id, sg.name, sg.member_count;

-- Verify one specific account if needed
SELECT
  u.email,
  gm.group_id,
  gm.role,
  gm.status,
  gm.joined_at
FROM auth.users u
LEFT JOIN public.group_members gm
  ON gm.user_id = u.id
 AND gm.group_id = (
   SELECT id
   FROM public.study_groups
   WHERE name = 'Bible Buddy Study Group'
   LIMIT 1
 )
WHERE lower(u.email) = 'lorenzomoore2012@gmail.com';
