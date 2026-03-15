-- =============================================
-- Fix RLS on group_hub_categories so the
-- hub tabs actually load for authenticated users
-- =============================================

-- Drop the old policies (they may be blocking the read)
DROP POLICY IF EXISTS "Members can read hub categories" ON group_hub_categories;
DROP POLICY IF EXISTS "Service role full access on hub categories" ON group_hub_categories;

-- Simple replacement: any authenticated user can read hub categories
-- (Category names/colors are not sensitive data)
CREATE POLICY "Authenticated users can read hub categories"
  ON group_hub_categories FOR SELECT
  TO authenticated
  USING (true);

-- Verify the 6 rows are still there and readable
SELECT id, name, emoji, color, display_order
FROM group_hub_categories
ORDER BY display_order;
