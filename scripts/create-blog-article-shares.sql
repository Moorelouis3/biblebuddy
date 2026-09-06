-- Durable memory for the nightly blog-post group drip (2026-09-06).
-- One row per article ever shared into the study group; the cron skips
-- any slug with a row, so deleting the group post later never causes a
-- re-share. RLS on with no policies: only the service role touches it.
create table if not exists public.blog_article_shares (
  slug text primary key,
  post_id uuid,
  shared_at timestamptz not null default now()
);
alter table public.blog_article_shares enable row level security;
