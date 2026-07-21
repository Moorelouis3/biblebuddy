create table if not exists blog_page_views (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null,
  session_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists blog_page_views_article_slug_idx
  on blog_page_views (article_slug);

create index if not exists blog_page_views_created_at_idx
  on blog_page_views (created_at);

create index if not exists blog_page_views_session_id_idx
  on blog_page_views (session_id);

alter table blog_page_views enable row level security;

drop policy if exists "Anyone can record a blog page view" on blog_page_views;
create policy "Anyone can record a blog page view"
  on blog_page_views for insert
  with check (true);
