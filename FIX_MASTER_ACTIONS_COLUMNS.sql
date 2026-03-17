-- Fix missing master_actions columns used by Buddies Activity
-- Run once in the Supabase SQL Editor

ALTER TABLE public.master_actions
ADD COLUMN IF NOT EXISTS action_label text;

ALTER TABLE public.master_actions
ADD COLUMN IF NOT EXISTS username text;

COMMENT ON COLUMN public.master_actions.action_label IS 'Optional human-readable label for the action, like Genesis 1 or Proverbs 5';
COMMENT ON COLUMN public.master_actions.username IS 'Username snapshot used for analytics and activity displays';

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'master_actions'
  AND column_name IN ('action_label', 'username')
ORDER BY column_name;
