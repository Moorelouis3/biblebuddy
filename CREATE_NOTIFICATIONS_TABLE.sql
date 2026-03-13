-- =============================================
-- NOTIFICATIONS TABLE + REPLY TRIGGER
-- Run this in Supabase SQL editor
-- =============================================

-- 0. If table already exists, add comment_id column (safe to run even if it exists)
alter table notifications add column if not exists comment_id uuid;

-- 1. Create notifications table (only runs if it doesn't exist yet)
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  type text not null default 'comment_reply',
  from_user_name text,
  article_slug text,
  comment_id uuid,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table notifications enable row level security;

-- 3. RLS policy: users can only read their own notifications
create policy "Users can read own notifications"
  on notifications for select
  using (auth.uid() = user_id);

-- 4. RLS policy: allow the trigger function (security definer) to insert
create policy "Service can insert notifications"
  on notifications for insert
  with check (true);

-- 5. RLS policy: users can update their own notifications (mark as read)
create policy "Users can update own notifications"
  on notifications for update
  using (auth.uid() = user_id);

-- 6. Trigger function: fires when any reply is posted to article_comments
create or replace function notify_on_reply()
returns trigger as $$
declare
  parent_user_id uuid;
begin
  -- Only fire when a reply is posted (parent_id is not null)
  if NEW.parent_id is not null then
    -- Look up the original commenter's user_id
    select user_id into parent_user_id
    from article_comments
    where id = NEW.parent_id;

    -- Notify the original commenter (including self-replies, so no one misses a response)
    if parent_user_id is not null then
      insert into notifications (user_id, type, from_user_name, article_slug, comment_id, message)
      values (
        parent_user_id,
        'comment_reply',
        NEW.user_name,
        NEW.article_slug,
        NEW.parent_id,
        NEW.user_name || ' replied to your comment'
      );
    end if;
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

-- 7. Attach trigger to article_comments
drop trigger if exists on_comment_reply on article_comments;
create trigger on_comment_reply
  after insert on article_comments
  for each row execute procedure notify_on_reply();
