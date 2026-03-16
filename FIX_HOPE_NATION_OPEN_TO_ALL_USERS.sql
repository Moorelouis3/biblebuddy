-- ============================================================
-- FIX: Make Hope Nation open to every Bible Buddy account
-- Run in Supabase SQL Editor
--
-- What this does:
-- 1. Approves any existing Hope Nation memberships stuck in pending/rejected
-- 2. Adds every auth.users account to Hope Nation as approved
-- 3. Forces the specified test account to approved
-- 4. Replaces the auto-join trigger so future signups are auto-approved
-- 5. Refreshes the cached member_count on the study group
-- ============================================================

DO $$
DECLARE
  v_group_id uuid;
BEGIN
  SELECT id INTO v_group_id
  FROM public.study_groups
  WHERE name = 'Hope Nation'
  LIMIT 1;

  IF v_group_id IS NULL THEN
    RAISE EXCEPTION 'Hope Nation group not found.';
  END IF;

  -- 1. Any existing Hope Nation member row should be approved.
  UPDATE public.group_members
  SET
    status = 'approved',
    display_name = COALESCE(group_members.display_name, ps.display_name, ps.username, split_part(u.email, '@', 1), 'Member')
  FROM auth.users u
  LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
  WHERE group_members.group_id = v_group_id
    AND group_members.user_id = u.id
    AND group_members.status <> 'approved';

  -- 2. Add every auth user who is missing from Hope Nation.
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
    display_name = EXCLUDED.display_name;

  -- 3. Extra safety for the specific test account mentioned.
  UPDATE public.group_members gm
  SET status = 'approved'
  FROM auth.users u
  WHERE gm.group_id = v_group_id
    AND gm.user_id = u.id
    AND lower(u.email) = 'lorenzomoore2012@gmail.com';

  -- 4. Future users should be auto-added immediately on signup.
  CREATE OR REPLACE FUNCTION public.auto_join_hope_nation()
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
    WHERE name = 'Hope Nation'
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
        display_name = COALESCE(public.group_members.display_name, EXCLUDED.display_name);
    END IF;

    RETURN NEW;
  END;
  $fn$;

  DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON public.profile_stats;
  DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON auth.users;

  CREATE TRIGGER trg_auto_join_hope_nation
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_join_hope_nation();

  -- 5. Refresh cached member count to match approved rows.
  UPDATE public.study_groups sg
  SET member_count = (
    SELECT COUNT(*)
    FROM public.group_members gm
    WHERE gm.group_id = sg.id
      AND gm.status = 'approved'
  )
  WHERE sg.id = v_group_id;
END $$;

-- Verify Hope Nation + the specific test account
SELECT
  sg.name,
  sg.member_count AS cached_member_count,
  COUNT(gm.id) FILTER (WHERE gm.status = 'approved') AS actual_approved_members
FROM public.study_groups sg
LEFT JOIN public.group_members gm
  ON gm.group_id = sg.id
WHERE sg.name = 'Hope Nation'
GROUP BY sg.name, sg.member_count;

SELECT
  u.email,
  gm.group_id,
  gm.role,
  gm.status,
  gm.joined_at
FROM auth.users u
LEFT JOIN public.group_members gm
  ON gm.user_id = u.id
 AND gm.group_id = (SELECT id FROM public.study_groups WHERE name = 'Hope Nation' LIMIT 1)
WHERE lower(u.email) = 'lorenzomoore2012@gmail.com';
