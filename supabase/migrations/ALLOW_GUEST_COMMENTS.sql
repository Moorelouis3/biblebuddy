-- Let guests take part in discussion again.
--
-- REVERSES most of BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql.
--
-- Decision changed 2026-08-16: guests should be able to comment and post,
-- but only after completing a profile (real first and last name + a profile
-- picture). That gate already exists in the app - the "Before you post"
-- modal - and it is a better filter than requiring a full account, because
-- it stops anonymous drive-by posting without forcing a signup on someone
-- who just wants to join a discussion.
--
-- Still blocked, deliberately: direct messages, conversations and buddy
-- requests. Letting anonymous accounts DM real users is a different risk
-- from letting them comment in public where moderation can see it.
--
-- SAFE TO RE-RUN.

DO $$
DECLARE
  t text;
  unblock text[] := ARRAY[
    'group_posts',
    'group_post_likes',
    'group_series_post_comments',
    'group_series_comment_likes',
    'group_series_post_likes',
    'feed_post_comments',
    'feed_posts',
    'feed_post_reactions',
    'article_comments',
    'article_comment_likes',
    'article_likes',
    'blog_article_likes',
    'series_reflections',
    'series_reflection_likes'
  ];
BEGIN
  FOREACH t IN ARRAY unblock LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN CONTINUE; END IF;

    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_no_anonymous_write', t);
    RAISE NOTICE 'Guests can write to % again', t;
  END LOOP;
END $$;

-- What is still guest-blocked after this runs.
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname LIKE '%_no_anonymous_write'
ORDER BY tablename;
