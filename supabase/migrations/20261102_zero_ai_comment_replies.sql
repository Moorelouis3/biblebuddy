-- Zero-AI replies to study comments (2026-11-02).
--
-- /api/cron/auto-comment-replies used to send every comment to gpt-4o-mini and
-- post whatever came back. Louis: "OpenAI is not used by anything but the Louis
-- AI chat bot." These tables are what replaces the model: a library of replies
-- he approves, deterministic rules that decide which library entry fits, and a
-- log of every decision so the thing can be checked and improved.
--
-- What the real data says, measured before this was written (571 incoming
-- top-level comments on 2026-11-02):
--
--   * 567 of the 571 are distinct once normalised. Only 4 phrases ever repeat.
--   * 364 of them are 13 words or longer - people write about their own lives.
--   * Louis hand-wrote 64 replies, 62 of them different, and 3 were "test".
--
-- So this system will answer a SMALL share and skip the rest, by design.
-- Louis's rule: "I prefer an unanswered comment over an inappropriate
-- automated response." A long personal reflection must never be met with
-- "Amen!", so length alone disqualifies a comment from a template reply.
--
-- Safe to run more than once.

-- ---------------------------------------------------------------------------
-- 1. Categories: what kinds of comment exist, and what we do about each
-- ---------------------------------------------------------------------------
create table if not exists public.comment_reply_categories (
  slug        text primary key,
  label       text not null,
  -- reply  = a template may be posted automatically
  -- review = never automatic; it goes on the review list for Louis
  -- skip   = nothing happens, and we do not ask Louis either
  strategy    text not null default 'review' check (strategy in ('reply', 'review', 'skip')),
  -- A comment longer than this never gets an automatic reply in this category,
  -- however well it matches. Short reactions are safe to answer from a library;
  -- a paragraph about someone's marriage is not.
  max_words   integer not null default 8,
  enabled     boolean not null default true,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. Rules: how a comment is matched to a category, with no model involved
-- ---------------------------------------------------------------------------
--   exact  - the whole normalised comment equals the pattern
--   phrase - the pattern appears as a whole word/phrase inside the comment
--   regex  - a JS regular expression, tested against the normalised comment
--
-- `weight` is added up per category; the winner needs to clear the confidence
-- floor in lib/commentReplies/classify.ts. `blocks` marks a rule that DISQUALIFIES
-- a comment outright (grief, crisis, a direct question) no matter what else matched.
create table if not exists public.comment_reply_rules (
  id            uuid primary key default gen_random_uuid(),
  category_slug text not null references public.comment_reply_categories(slug) on delete cascade,
  kind          text not null check (kind in ('exact', 'phrase', 'regex')),
  pattern       text not null,
  weight        numeric not null default 1,
  blocks        boolean not null default false,
  enabled       boolean not null default true,
  notes         text,
  created_at    timestamptz not null default now()
);
create index if not exists comment_reply_rules_category_idx
  on public.comment_reply_rules (category_slug) where enabled;

-- ---------------------------------------------------------------------------
-- 3. The reply library
-- ---------------------------------------------------------------------------
-- Nothing is posted unless `approved` is true. New entries proposed by the
-- pattern finder arrive with approved = false and wait for Louis.
create table if not exists public.comment_reply_templates (
  id            uuid primary key default gen_random_uuid(),
  category_slug text not null references public.comment_reply_categories(slug) on delete cascade,
  body          text not null,
  approved      boolean not null default false,
  enabled       boolean not null default true,
  -- Where it came from: 'seed' (written with Louis's voice in this migration),
  -- 'historical' (lifted from a reply he actually sent), 'proposed' (the
  -- pattern finder suggested it).
  source        text not null default 'seed',
  times_used    integer not null default 0,
  last_used_at  timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists comment_reply_templates_pick_idx
  on public.comment_reply_templates (category_slug, last_used_at) where approved and enabled;

-- ---------------------------------------------------------------------------
-- 4. Every decision, including the ones that did nothing
-- ---------------------------------------------------------------------------
-- This is what makes the system checkable. A skip is as interesting as a reply:
-- it is how we find the categories that are missing.
create table if not exists public.comment_reply_log (
  id            uuid primary key default gen_random_uuid(),
  comment_id    uuid not null,
  article_slug  text,
  fingerprint   text not null,        -- normalised text, so repeats group together
  -- A copy of what the person wrote. The three sources live in three
  -- different tables, so the review list would otherwise need a join per
  -- source, and a deleted comment would leave a blank line with no way to
  -- tell what it had been.
  comment_text  text,
  word_count    integer not null default 0,
  category_slug text,
  rule_id       uuid,
  confidence    numeric not null default 0,
  template_id   uuid,
  action        text not null check (action in ('replied', 'skipped', 'review', 'shadow')),
  reason        text,
  created_at    timestamptz not null default now()
);
-- One decision per comment: the cron must never answer the same comment twice,
-- even if the dedupe above it is changed later.
create unique index if not exists comment_reply_log_comment_idx
  on public.comment_reply_log (comment_id) where action in ('replied', 'review');
create index if not exists comment_reply_log_fingerprint_idx
  on public.comment_reply_log (fingerprint);
create index if not exists comment_reply_log_created_idx
  on public.comment_reply_log (created_at desc);

-- ---------------------------------------------------------------------------
-- 5. What we could not answer, grouped so it can be learned from
-- ---------------------------------------------------------------------------
-- The "learning" is deliberately dumb: count what keeps coming back and has no
-- rule. No embeddings, no model, nothing that costs money per comment.
create table if not exists public.comment_reply_patterns (
  fingerprint  text primary key,
  sample_text  text not null,
  word_count   integer not null default 0,
  seen_count   integer not null default 1,
  first_seen   timestamptz not null default now(),
  last_seen    timestamptz not null default now(),
  -- new -> proposed (a category/template suggestion exists) -> handled | dismissed
  status       text not null default 'new' check (status in ('new', 'proposed', 'handled', 'dismissed')),
  suggested_category text,
  reviewed_at  timestamptz
);
create index if not exists comment_reply_patterns_rank_idx
  on public.comment_reply_patterns (seen_count desc) where status = 'new';

-- ---------------------------------------------------------------------------
-- 6. Seeding
-- ---------------------------------------------------------------------------
-- The categories, rules and reply library are NOT inserted here. They live in
-- lib/commentReplies/seed.ts and are applied with:
--
--     node scripts/seed-comment-replies.mjs
--
-- One source of truth, in a file the backtest and the unit tests import
-- directly - so what gets tested is exactly what runs in production, and a
-- rule can be changed without writing another migration.
