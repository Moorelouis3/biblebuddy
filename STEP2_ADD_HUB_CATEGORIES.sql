-- =============================================
-- STEP 2: Add group_hub_categories table and
-- insert 6 hub category rows for Hope Nation
-- Run this in Supabase SQL editor
-- =============================================

-- 1. Create the group_hub_categories table
CREATE TABLE IF NOT EXISTS group_hub_categories (
  id             uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id       uuid        NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  name           text        NOT NULL,
  emoji          text        NOT NULL,
  color          text        NOT NULL,
  display_order  int         NOT NULL DEFAULT 0,
  created_at     timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE group_hub_categories ENABLE ROW LEVEL SECURITY;

-- 3. RLS: approved members can read hub categories for their group
CREATE POLICY "Members can read hub categories"
  ON group_hub_categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.group_id = group_hub_categories.group_id
        AND gm.user_id = auth.uid()
        AND gm.status = 'approved'
    )
  );

-- 4. RLS: service role has full access (needed for admin operations)
CREATE POLICY "Service role full access on hub categories"
  ON group_hub_categories FOR ALL
  USING (auth.role() = 'service_role');

-- 5. Insert the 6 hub category rows for Hope Nation
--    display_order starts at 6 (after the 5 existing chat tabs)
INSERT INTO group_hub_categories (group_id, name, emoji, color, display_order)
SELECT
  sg.id,
  cats.name_val,
  cats.emoji_val,
  cats.color_val,
  cats.order_val
FROM study_groups sg
CROSS JOIN (VALUES
  ('Bible Insights',        '💡', '#ddeeff', 6),
  ('Bible Study Tips',      '🛠️', '#fef9c3', 7),
  ('Christian Foundations', '⛪', '#ede9fe', 8),
  ('Verse Breakdowns',      '🔍', '#d1fae5', 9),
  ('Character Studies',     '👤', '#dbeafe', 10),
  ('Christian History',     '📜', '#fff7ed', 11)
) AS cats(name_val, emoji_val, color_val, order_val)
WHERE sg.name = 'Hope Nation';

-- 6. Verify: show what was inserted
SELECT
  ghc.id,
  ghc.name,
  ghc.emoji,
  ghc.color,
  ghc.display_order,
  sg.name AS group_name,
  sg.id   AS group_id
FROM group_hub_categories ghc
JOIN study_groups sg ON sg.id = ghc.group_id
WHERE sg.name = 'Hope Nation'
ORDER BY ghc.display_order;
