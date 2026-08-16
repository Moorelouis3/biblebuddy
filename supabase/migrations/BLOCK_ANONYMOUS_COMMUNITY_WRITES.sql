-- Block anonymous (guest) users from writing to community tables.
--
-- WHY THIS IS NEEDED
--
-- Supabase anonymous users hold the `authenticated` role, exactly like a
-- registered user. Every community write policy in Bible Buddy is granted
-- `TO authenticated`, so guests can post, comment, like and message.
--
-- That was already true before guest deep links existed (guests could be
-- created from the landing questionnaire), but deep links from blog posts make
-- guest accounts far easier to create, which turns a small gap into a real
-- spam and moderation exposure.
--
-- It also matches the product intent: you do not need an account to LEARN, but
-- you do need one to take part in the community.
--
-- HOW THIS WORKS
--
-- These are RESTRICTIVE policies. Postgres ANDs restrictive policies with the
-- existing permissive ones, so nothing already granted is replaced or dropped.
-- No existing policy is modified. Removing these policies fully reverts the
-- change.
--
-- Guests are entirely unaffected for study: reading Scripture, notes,
-- devotionals, trivia and their own progress all continue to work, because
-- those tables are not touched here.
--
-- SAFE TO RE-RUN.

-- Helper condition: true when the caller is NOT an anonymous guest.
-- `is_anonymous` is a standard Supabase JWT claim. coalesce() covers older
-- tokens issued before the claim existed, which are treated as registered.

DO $$
DECLARE
  t text;
  community_tables text[] := ARRAY[
    'group_posts',
    'group_post_likes',
    'group_series_post_comments',
    'feed_post_comments',
    'article_comments',
    'article_comment_likes',
    'series_reflections',
    'messages',
    'conversations',
    'buddy_requests',
    -- Added 2026-08-16 after checking the live schema. The first run covered
    -- only 9 of 10 names; article_comment_likes does not exist, and these five
    -- like/comment tables were never in the list at all.
    'group_series_post_likes',
    'group_series_comment_likes',
    'article_likes',
    'blog_article_likes',
    'series_reflection_likes'
  ];
BEGIN
  FOREACH t IN ARRAY community_tables LOOP
    -- Skip tables that do not exist in this environment.
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      RAISE NOTICE 'Skipping %, table not found', t;
      CONTINUE;
    END IF;

    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON public.%I',
      t || '_no_anonymous_write', t
    );

    EXECUTE format(
      'CREATE POLICY %I ON public.%I AS RESTRICTIVE FOR INSERT TO authenticated '
      || 'WITH CHECK (coalesce((auth.jwt() ->> ''is_anonymous'')::boolean, false) = false)',
      t || '_no_anonymous_write', t
    );

    RAISE NOTICE 'Anonymous writes blocked on %', t;
  END LOOP;
END $$;

-- Verify: every table above should list a *_no_anonymous_write policy
-- with permissive = 'RESTRICTIVE'.
SELECT tablename, policyname, permissive, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname LIKE '%_no_anonymous_write'
ORDER BY tablename;
