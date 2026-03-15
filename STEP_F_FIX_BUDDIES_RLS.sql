-- ============================================================
-- STEP F: Fix RLS on buddies table so users can read their own
--         buddy rows (currently returning 0 rows in the UI)
-- Run in Supabase SQL Editor
-- ============================================================

-- Drop any existing SELECT policies on buddies
DROP POLICY IF EXISTS "Users can view their own buddies" ON public.buddies;
DROP POLICY IF EXISTS "buddies_select" ON public.buddies;
DROP POLICY IF EXISTS "select_own_buddies" ON public.buddies;

-- Allow any authenticated user to read buddies rows
-- where they appear as either user_id_1 or user_id_2
CREATE POLICY "Users can view their own buddies"
ON public.buddies
FOR SELECT
USING (
  auth.uid() = user_id_1
  OR auth.uid() = user_id_2
);

-- Also allow authenticated users to INSERT (so buddy requests can be accepted)
DROP POLICY IF EXISTS "Users can insert buddies" ON public.buddies;
CREATE POLICY "Users can insert buddies"
ON public.buddies
FOR INSERT
WITH CHECK (
  auth.uid() = user_id_1
  OR auth.uid() = user_id_2
);

-- Allow deletion (for removing a buddy)
DROP POLICY IF EXISTS "Users can delete their own buddies" ON public.buddies;
CREATE POLICY "Users can delete their own buddies"
ON public.buddies
FOR DELETE
USING (
  auth.uid() = user_id_1
  OR auth.uid() = user_id_2
);

-- Verify: how many buddies does your account see?
SELECT COUNT(*) AS my_buddy_count
FROM public.buddies
WHERE user_id_1 = auth.uid() OR user_id_2 = auth.uid();
