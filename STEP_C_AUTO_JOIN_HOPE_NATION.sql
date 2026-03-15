-- ============================================================
-- STEP C: Add ALL existing users to Hope Nation
--         + auto-join trigger for every future signup
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Bulk-insert every existing user (from profile_stats) as an
--    approved Hope Nation member. Skips anyone already a member.
INSERT INTO public.group_members (group_id, user_id, display_name, role, status, joined_at)
SELECT
  (SELECT id FROM public.study_groups WHERE name = 'Hope Nation'),
  ps.user_id,
  COALESCE(ps.display_name, ps.username, 'Member'),
  'member',
  'approved',
  now()
FROM public.profile_stats ps
WHERE NOT EXISTS (
  SELECT 1 FROM public.group_members gm
  WHERE gm.group_id = (SELECT id FROM public.study_groups WHERE name = 'Hope Nation')
    AND gm.user_id  = ps.user_id
)
ON CONFLICT (group_id, user_id) DO NOTHING;

-- 2. Create the function that fires on every new profile_stats row
--    (profile_stats is created for every user during sign-up/onboarding)
CREATE OR REPLACE FUNCTION public.auto_join_hope_nation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER   -- runs as owner, bypasses RLS
SET search_path = public
AS $$
DECLARE
  v_group_id uuid;
BEGIN
  SELECT id INTO v_group_id
  FROM public.study_groups
  WHERE name = 'Hope Nation'
  LIMIT 1;

  IF v_group_id IS NOT NULL THEN
    INSERT INTO public.group_members (
      group_id, user_id, display_name, role, status, joined_at
    )
    VALUES (
      v_group_id,
      NEW.user_id,
      COALESCE(NEW.display_name, NEW.username, 'Member'),
      'member',
      'approved',
      now()
    )
    ON CONFLICT (group_id, user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- 3. Attach the trigger to profile_stats
DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON public.profile_stats;
CREATE TRIGGER trg_auto_join_hope_nation
  AFTER INSERT ON public.profile_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_join_hope_nation();

-- 4. Verify: show Hope Nation member count
SELECT sg.name, sg.member_count,
       COUNT(gm.id) AS actual_member_rows
FROM public.study_groups sg
LEFT JOIN public.group_members gm
  ON gm.group_id = sg.id AND gm.status = 'approved'
WHERE sg.name = 'Hope Nation'
GROUP BY sg.name, sg.member_count;
