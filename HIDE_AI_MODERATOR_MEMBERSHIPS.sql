-- Part 2 of hiding the AI moderator accounts (2026-09-21, Louis).
-- HIDE_AI_MODERATOR_ACTIVITY.sql archived their posts/likes/DMs. They also
-- appeared as people in member lists (Wisdom of Proverbs grid + count, group
-- member lists) and buddy connections. Same approach: copy to archived_*,
-- then remove from the live table. Nothing is destroyed.

begin;

create temp table mod_ids(id uuid primary key) on commit drop;
insert into mod_ids values
  ('c36fe21d-cca0-4561-b543-b6dba8290316'), -- Christina
  ('4e1f989d-e0ac-49f4-9649-0e38d022960f'), -- Marcus
  ('e5fa510c-d5bf-4e90-a7a1-1394103a54f8'), -- Mateo
  ('0867f26e-3384-40fe-a782-21a9f0e12c0b'); -- Harold

create table if not exists public.archived_community_event_members (like public.community_event_members including defaults);
create table if not exists public.archived_study_group_members (like public.study_group_members including defaults);
create table if not exists public.archived_group_members (like public.group_members including defaults);
create table if not exists public.archived_buddies (like public.buddies including defaults);
create table if not exists public.archived_buddy_requests (like public.buddy_requests including defaults);
alter table public.archived_community_event_members add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_study_group_members add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_group_members add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_buddies add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_buddy_requests add column if not exists archived_at timestamptz not null default now(), add column if not exists archive_reason text;
alter table public.archived_community_event_members enable row level security;
alter table public.archived_study_group_members enable row level security;
alter table public.archived_group_members enable row level security;
alter table public.archived_buddies enable row level security;
alter table public.archived_buddy_requests enable row level security;

insert into public.archived_community_event_members
select r.*, now(), 'ai_moderator_hidden_2026_09_21' from public.community_event_members r where r.user_id in (select id from mod_ids);
delete from public.community_event_members where user_id in (select id from mod_ids);

insert into public.archived_study_group_members
select r.*, now(), 'ai_moderator_hidden_2026_09_21' from public.study_group_members r where r.user_id in (select id from mod_ids);
delete from public.study_group_members where user_id in (select id from mod_ids);

insert into public.archived_group_members
select r.*, now(), 'ai_moderator_hidden_2026_09_21' from public.group_members r where r.user_id in (select id from mod_ids);
delete from public.group_members where user_id in (select id from mod_ids);

insert into public.archived_buddies
select r.*, now(), 'ai_moderator_hidden_2026_09_21' from public.buddies r
where r.user_id_1 in (select id from mod_ids) or r.user_id_2 in (select id from mod_ids);
delete from public.buddies where user_id_1 in (select id from mod_ids) or user_id_2 in (select id from mod_ids);

insert into public.archived_buddy_requests
select r.*, now(), 'ai_moderator_hidden_2026_09_21' from public.buddy_requests r
where r.sender_id in (select id from mod_ids) or r.receiver_id in (select id from mod_ids);
delete from public.buddy_requests where sender_id in (select id from mod_ids) or receiver_id in (select id from mod_ids);

commit;

select
  (select count(*) from public.archived_community_event_members) event_members_archived,
  (select count(*) from public.archived_study_group_members) study_group_members_archived,
  (select count(*) from public.archived_group_members) group_members_archived,
  (select count(*) from public.archived_buddies) buddies_archived,
  (select count(*) from public.archived_buddy_requests) buddy_requests_archived;
