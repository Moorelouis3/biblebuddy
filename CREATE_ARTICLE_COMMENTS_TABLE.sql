-- Article Comments Table for Bible Study Hub Articles
create table if not exists article_comments (
  id uuid primary key default uuid_generate_v4(),
  article_slug text not null,
  user_id uuid not null,
  user_name text not null,
  content text not null,
  parent_id uuid null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone null,
  is_deleted boolean default false
);

-- Enable Row Level Security
alter table article_comments enable row level security;

-- Policy: Allow read for authenticated users
create policy "Allow read for authenticated users" on article_comments
  for select using (auth.role() = 'authenticated');

-- Policy: Allow insert where auth.uid() = user_id
create policy "Allow insert for own user_id" on article_comments
  for insert with check (auth.uid() = user_id);

-- Policy: Allow delete where auth.uid() = user_id
create policy "Allow delete for own user_id" on article_comments
  for delete using (auth.uid() = user_id);

-- Policy: Allow update only for own comments
create policy "Allow update for own user_id" on article_comments
  for update using (auth.uid() = user_id);
