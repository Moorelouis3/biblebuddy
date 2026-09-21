-- Hide the AI moderator accounts' past activity (2026-09-21, Louis).
-- Christina, Marcus, Mateo and Harold were AI accounts posting as people. The
-- cron is off; this removes their past activity from what users see WITHOUT
-- destroying it: every row is copied into an archived_* table first (same
-- columns + archived_at + archive_reason), then removed from the live table.
-- Restore = insert the archived rows back (minus the two extra columns).
--
-- What moves to the archive:
--   * every group post by a moderator, plus every reply underneath those
--     posts (including real members' replies to them - a thread started by an
--     AI account is hidden as a whole, but kept)
--   * every like by a moderator, and every like on an archived post
--   * notifications sent from a moderator or pointing at an archived post
--   * every DM conversation with a moderator, with all its messages
-- like_count on real posts is reduced by the moderator likes removed.
-- The moderator accounts themselves are not touched.

begin;

create temp table mod_ids(id uuid primary key) on commit drop;
insert into mod_ids values
  ('c36fe21d-cca0-4561-b543-b6dba8290316'), -- Christina
  ('4e1f989d-e0ac-49f4-9649-0e38d022960f'), -- Marcus
  ('e5fa510c-d5bf-4e90-a7a1-1394103a54f8'), -- Mateo
  ('0867f26e-3384-40fe-a782-21a9f0e12c0b'); -- Harold

create temp table hide_posts(id uuid primary key) on commit drop;
insert into hide_posts
with recursive t as (
  select id from public.group_posts where user_id in (select id from mod_ids)
  union
  select c.id from public.group_posts c join t on c.parent_post_id = t.id
)
select id from t;

-- Safety: stop if any hidden post is used by a weekly post / carousel row.
do $$
declare n int;
begin
  select (select count(*) from public.weekly_group_trivia_sets where post_id in (select id from hide_posts))
       + (select count(*) from public.weekly_group_questions where post_id in (select id from hide_posts))
       + (select count(*) from public.weekly_group_polls where post_id in (select id from hide_posts))
       + (select count(*) from public.weekly_group_series_posts where post_id in (select id from hide_posts))
       + (select count(*) from public.group_feed_carousel_queue where published_post_id in (select id from hide_posts))
    into n;
  if n > 0 then
    raise exception 'Aborting: % weekly/carousel rows point at posts that would be hidden', n;
  end if;
end $$;

create temp table hide_convos(id uuid primary key) on commit drop;
insert into hide_convos
select id from public.conversations
where user_id_1 in (select id from mod_ids) or user_id_2 in (select id from mod_ids);

-- Archive tables (no foreign keys, RLS on with no policies = service role only)
create table if not exists public.archived_group_posts (like public.group_posts including defaults);
create table if not exists public.archived_group_post_likes (like public.group_post_likes including defaults);
create table if not exists public.archived_notifications (like public.notifications including defaults);
create table if not exists public.archived_conversations (like public.conversations including defaults);
create table if not exists public.archived_messages (like public.messages including defaults);
alter table public.archived_group_posts add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_group_post_likes add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_notifications add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_conversations add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_messages add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_group_posts enable row level security;
alter table public.archived_group_post_likes enable row level security;
alter table public.archived_notifications enable row level security;
alter table public.archived_conversations enable row level security;
alter table public.archived_messages enable row level security;

-- 1. Likes: fix like_count on posts that stay, then archive + remove.
update public.group_posts p
set like_count = greatest(0, p.like_count - x.n)
from (
  select post_id, count(*)::int as n
  from public.group_post_likes
  where user_id in (select id from mod_ids)
    and post_id not in (select id from hide_posts)
  group by post_id
) x
where p.id = x.post_id;

insert into public.archived_group_post_likes
select l.*, now(), 'ai_moderator_hidden_2026_09_21'
from public.group_post_likes l
where l.user_id in (select id from mod_ids) or l.post_id in (select id from hide_posts);

delete from public.group_post_likes
where user_id in (select id from mod_ids) or post_id in (select id from hide_posts);

-- 2. Notifications from moderators or about hidden posts.
insert into public.archived_notifications
select n.*, now(), 'ai_moderator_hidden_2026_09_21'
from public.notifications n
where n.from_user_id in (select id from mod_ids) or n.post_id in (select id from hide_posts);

delete from public.notifications
where from_user_id in (select id from mod_ids) or post_id in (select id from hide_posts);

-- 3. Posts and every reply under them.
insert into public.archived_group_posts
select p.*, now(), 'ai_moderator_hidden_2026_09_21'
from public.group_posts p
where p.id in (select id from hide_posts);

delete from public.group_posts where id in (select id from hide_posts);

-- 4. DM conversations with a moderator (messages first, then threads).
insert into public.archived_messages
select m.*, now(), 'ai_moderator_hidden_2026_09_21'
from public.messages m
where m.conversation_id in (select id from hide_convos);

insert into public.archived_conversations
select c.*, now(), 'ai_moderator_hidden_2026_09_21'
from public.conversations c
where c.id in (select id from hide_convos);

delete from public.conversations where id in (select id from hide_convos);

select
  (select count(*) from public.archived_group_posts where archive_reason = 'ai_moderator_hidden_2026_09_21') posts_archived,
  (select count(*) from public.archived_group_post_likes where archive_reason = 'ai_moderator_hidden_2026_09_21') likes_archived,
  (select count(*) from public.archived_notifications where archive_reason = 'ai_moderator_hidden_2026_09_21') notifications_archived,
  (select count(*) from public.archived_conversations where archive_reason = 'ai_moderator_hidden_2026_09_21') conversations_archived,
  (select count(*) from public.archived_messages where archive_reason = 'ai_moderator_hidden_2026_09_21') messages_archived;

commit;
