-- Wisdom of Proverbs daily group posts (2026-09-22).
-- One row per event day: which group post is that day's discussion. The
-- devotional day page shows that post's replies as its discussion, so one
-- comment appears in both places.
--
-- The daily-post cron writes this row FIRST (with a pre-made post id), then
-- inserts the group post. notify_group_broadcast_post() skips any post listed
-- here, so the daily post does NOT notify all ~6,000 group members; the cron
-- notifies the event's members instead.

begin;

create table if not exists public.community_event_day_posts (
  event_slug    text not null,
  day_number    int  not null check (day_number between 1 and 366),
  group_post_id uuid not null unique,
  group_id      uuid not null,
  published_at  timestamptz not null default now(),
  primary key (event_slug, day_number)
);

alter table public.community_event_day_posts enable row level security;
drop policy if exists "community_event_day_posts_read" on public.community_event_day_posts;
create policy "community_event_day_posts_read" on public.community_event_day_posts
  for select to anon, authenticated using (true);

-- Add the skip to the LIVE broadcast trigger function, keeping the rest of it.
do $$
declare
  fn record;
  patched text;
begin
  select p.oid, pg_get_functiondef(p.oid) as def into fn
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'notify_group_broadcast_post';
  if fn.def is null then
    raise exception 'notify_group_broadcast_post not found';
  end if;
  if position('community_event_day_posts' in fn.def) > 0 then
    return; -- already patched
  end if;
  patched := regexp_replace(
    fn.def,
    '(if new\.parent_post_id is not null then\s+return new;\s+end if;)',
    E'\\1\n  -- Community event daily posts notify the event members instead (cron).\n  if exists (select 1 from public.community_event_day_posts d where d.group_post_id = new.id) then\n    return new;\n  end if;',
    'i'
  );
  if patched = fn.def then
    raise exception 'could not find the parent_post_id check to patch';
  end if;
  execute patched;
end $$;

commit;

select
  (select count(*) from public.community_event_day_posts) day_posts,
  (select position('community_event_day_posts' in pg_get_functiondef(p.oid)) > 0
     from pg_proc p where p.proname = 'notify_group_broadcast_post') trigger_patched;
