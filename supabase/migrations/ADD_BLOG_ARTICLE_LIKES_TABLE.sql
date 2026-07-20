create table if not exists blog_article_likes (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (article_slug, user_id)
);

create index if not exists blog_article_likes_article_slug_idx
  on blog_article_likes (article_slug);

alter table blog_article_likes enable row level security;

drop policy if exists "Anyone can read blog article likes" on blog_article_likes;
create policy "Anyone can read blog article likes"
  on blog_article_likes for select
  using (true);

drop policy if exists "Users can like articles as themselves" on blog_article_likes;
create policy "Users can like articles as themselves"
  on blog_article_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own article like" on blog_article_likes;
create policy "Users can remove their own article like"
  on blog_article_likes for delete
  using (auth.uid() = user_id);
