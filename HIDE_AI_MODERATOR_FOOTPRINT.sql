-- Part 3 of hiding the AI moderator accounts (2026-09-22). Parts 1-2 archived
-- their group posts, likes, DMs, memberships and buddies. They still showed up
-- in: chapter comments, the old feed, "Chapter Finishers", leaderboards and
-- buddy lists. Same approach: copy each row to archived_<table>, then remove it
-- from the live table. Nothing is destroyed. master_actions (internal
-- analytics only, never shown) is left alone.

begin;

create temp table mod_ids(id uuid primary key) on commit drop;
insert into mod_ids values
  ('c36fe21d-cca0-4561-b543-b6dba8290316'), -- Christina
  ('4e1f989d-e0ac-49f4-9649-0e38d022960f'), -- Marcus
  ('e5fa510c-d5bf-4e90-a7a1-1394103a54f8'), -- Mateo
  ('0867f26e-3384-40fe-a782-21a9f0e12c0b'); -- Harold

-- archive + delete helper
create or replace function pg_temp.archive_rows(p_table text, p_where text) returns int
language plpgsql as $$
declare n int;
begin
  execute format('create table if not exists public.%I (like public.%I including defaults)', 'archived_' || p_table, p_table);
  execute format('alter table public.%I add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text', 'archived_' || p_table);
  execute format('alter table public.%I enable row level security', 'archived_' || p_table);
  execute format('insert into public.%I select t.*, now(), %L from public.%I t where %s', 'archived_' || p_table, 'ai_moderator_hidden_2026_09_22', p_table, p_where);
  execute format('delete from public.%I t where %s', p_table, p_where);
  get diagnostics n = row_count;
  return n;
end $$;

-- bot chapter comments + every reply under them
create temp table hide_ac(id uuid primary key) on commit drop;
insert into hide_ac
with recursive t as (
  select id from public.article_comments where user_id in (select id from mod_ids)
  union
  select c.id from public.article_comments c join t on c.parent_id = t.id
)
select id from t;

-- bot feed posts; bot feed comments + replies under them
create temp table hide_fp(id uuid primary key) on commit drop;
insert into hide_fp select id from public.feed_posts where user_id in (select id from mod_ids);
create temp table hide_fc(id uuid primary key) on commit drop;
insert into hide_fc
with recursive t as (
  select id from public.feed_post_comments
  where user_id in (select id from mod_ids) or post_id in (select id from hide_fp)
  union
  select c.id from public.feed_post_comments c join t on c.parent_comment_id = t.id
)
select id from t;

create temp table results(tbl text, rows_moved int);
insert into results values ('article_comments', pg_temp.archive_rows('article_comments', 't.id in (select id from hide_ac)'));
insert into results values ('feed_post_reactions', pg_temp.archive_rows('feed_post_reactions', 't.post_id in (select id from hide_fp) or t.user_id in (select id from mod_ids)'));
insert into results values ('feed_post_comments', pg_temp.archive_rows('feed_post_comments', 't.id in (select id from hide_fc)'));
insert into results values ('feed_posts', pg_temp.archive_rows('feed_posts', 't.id in (select id from hide_fp)'));
insert into results values ('devotional_progress', pg_temp.archive_rows('devotional_progress', 't.user_id in (select id from mod_ids)'));
insert into results values ('completed_chapters', pg_temp.archive_rows('completed_chapters', 't.user_id in (select id from mod_ids)'));
insert into results values ('bible_year_day_progress', pg_temp.archive_rows('bible_year_day_progress', 't.user_id in (select id from mod_ids)'));
insert into results values ('trivia_question_progress', pg_temp.archive_rows('trivia_question_progress', 't.user_id in (select id from mod_ids)'));
insert into results values ('verse_of_the_day_engagement', pg_temp.archive_rows('verse_of_the_day_engagement', 't.user_id in (select id from mod_ids)'));
insert into results values ('profile_stats', pg_temp.archive_rows('profile_stats', 't.user_id in (select id from mod_ids)'));

commit;

select string_agg(tbl || '=' || rows_moved, ', ') as archived from results;
