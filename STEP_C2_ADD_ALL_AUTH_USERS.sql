-- ============================================================
-- STEP C2: Add ALL 1500+ auth.users to Hope Nation
--          Sources from auth.users (not profile_stats)
--          so every account — onboarded or not — is included
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Bulk-insert every auth user as an approved Hope Nation member.
--    Joins profile_stats for a display name when available,
--    falls back to the email prefix if not.
INSERT INTO public.group_members (group_id, user_id, display_name, role, status, joined_at)
SELECT
  (SELECT id FROM public.study_groups WHERE name = 'Hope Nation'),
  u.id,
  COALESCE(ps.display_name, ps.username, split_part(u.email, '@', 1), 'Member'),
  'member',
  'approved',
  now()
FROM auth.users u
LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
WHERE NOT EXISTS (
  SELECT 1 FROM public.group_members gm
  WHERE gm.group_id = (SELECT id FROM public.study_groups WHERE name = 'Hope Nation')
    AND gm.user_id  = u.id
)
ON CONFLICT (group_id, user_id) DO NOTHING;

-- 2. Also update the trigger to use auth.users as the source
--    so future signups are added even before they hit onboarding.
--    We drop the old profile_stats trigger and create one on auth.users.
DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON public.profile_stats;

CREATE OR REPLACE FUNCTION public.auto_join_hope_nation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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
      NEW.id,
      COALESCE(split_part(NEW.email, '@', 1), 'Member'),
      'member',
      'approved',
      now()
    )
    ON CONFLICT (group_id, user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Attach to auth.users so every new signup is caught immediately
DROP TRIGGER IF EXISTS trg_auto_join_hope_nation ON auth.users;
CREATE TRIGGER trg_auto_join_hope_nation
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_join_hope_nation();

-- 3. Verify total
SELECT
  sg.name,
  sg.member_count        AS cached_count,
  COUNT(gm.id)           AS actual_approved_members
FROM public.study_groups sg
LEFT JOIN public.group_members gm
  ON gm.group_id = sg.id AND gm.status = 'approved'
WHERE sg.name = 'Hope Nation'
GROUP BY sg.name, sg.member_count;
