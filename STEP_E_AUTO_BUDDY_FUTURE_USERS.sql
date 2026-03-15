-- ============================================================
-- STEP E: Auto-add Louis as Bible Buddy for every FUTURE user
--         Fires on every new auth.users row (new signup)
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Create / replace the trigger function
CREATE OR REPLACE FUNCTION public.auto_buddy_with_louis()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_louis_id uuid;
BEGIN
  -- Get Louis's user ID
  SELECT id INTO v_louis_id
  FROM auth.users
  WHERE email = 'moorelouis3@gmail.com'
  LIMIT 1;

  IF v_louis_id IS NULL OR NEW.id = v_louis_id THEN
    RETURN NEW;
  END IF;

  -- Insert buddy pair (lower UUID first — enforced by CHECK constraint)
  INSERT INTO public.buddies (user_id_1, user_id_2)
  VALUES (
    CASE WHEN v_louis_id < NEW.id THEN v_louis_id ELSE NEW.id END,
    CASE WHEN v_louis_id < NEW.id THEN NEW.id ELSE v_louis_id END
  )
  ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

  -- Create a direct-message conversation between them
  INSERT INTO public.conversations (user_id_1, user_id_2)
  VALUES (
    CASE WHEN v_louis_id < NEW.id THEN v_louis_id ELSE NEW.id END,
    CASE WHEN v_louis_id < NEW.id THEN NEW.id ELSE v_louis_id END
  )
  ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 2. Attach trigger to auth.users (fires after every new signup)
DROP TRIGGER IF EXISTS trg_auto_buddy_with_louis ON auth.users;
CREATE TRIGGER trg_auto_buddy_with_louis
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_buddy_with_louis();

-- 3. Verify: total buddy count for Louis after running
SELECT COUNT(*) AS louis_buddy_count
FROM public.buddies b
JOIN auth.users lou ON lou.email = 'moorelouis3@gmail.com'
WHERE b.user_id_1 = lou.id OR b.user_id_2 = lou.id;
