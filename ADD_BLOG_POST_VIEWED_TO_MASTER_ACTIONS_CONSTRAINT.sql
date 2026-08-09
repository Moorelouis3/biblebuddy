-- =====================================================
-- Add 'blog_post_viewed' to the master_actions CHECK constraint
-- =====================================================
--
-- PURPOSE: let blog post reads appear in the Action Log on the analytics
-- page ("Viewed blog post: Moses"), alongside the rest of a user's activity.
--
-- Unlike the earlier constraint migrations in this repo, this one does NOT
-- re-type the full list of action types. It reads the existing constraint and
-- inserts the new value into it, so there is no risk of silently dropping an
-- action type that was added since the last migration was written.
--
-- Safe to run more than once: it exits quietly if the value is already there.
--
-- Run this in the Supabase SQL Editor.
-- =====================================================

-- Step 1 (optional, for eyeballing): current constraint definition
SELECT
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';

-- Step 2: extend it
DO $$
DECLARE
    existing_def text;
BEGIN
    SELECT pg_get_constraintdef(oid)
      INTO existing_def
      FROM pg_constraint
     WHERE conrelid = 'public.master_actions'::regclass
       AND conname = 'master_actions_action_type_check';

    IF existing_def IS NULL THEN
        RAISE NOTICE 'No master_actions_action_type_check constraint found - nothing to extend.';
        RETURN;
    END IF;

    IF existing_def LIKE '%blog_post_viewed%' THEN
        RAISE NOTICE 'blog_post_viewed is already allowed - no change made.';
        RETURN;
    END IF;

    IF position('ARRAY[' in existing_def) = 0 THEN
        RAISE EXCEPTION 'Constraint is not in the expected ARRAY[...] form, refusing to rewrite it: %', existing_def;
    END IF;

    EXECUTE 'ALTER TABLE public.master_actions DROP CONSTRAINT master_actions_action_type_check';

    EXECUTE 'ALTER TABLE public.master_actions ADD CONSTRAINT master_actions_action_type_check '
            || replace(existing_def, 'ARRAY[', 'ARRAY[''blog_post_viewed''::text, ');

    RAISE NOTICE 'blog_post_viewed added to master_actions_action_type_check.';
END $$;

-- Step 3: confirm
SELECT pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.master_actions'::regclass
  AND conname = 'master_actions_action_type_check';
