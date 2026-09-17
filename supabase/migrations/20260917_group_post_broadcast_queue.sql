-- Louis's group posts timed out (2026-09-17): the AFTER INSERT trigger fanned
-- out one notification per approved member (~6,000) and each notification
-- queued a push job, all inside the post's own statement. PostgREST cuts
-- statements at 8s, the insert rolled back, and Louis had to retry ~7 times.
--
-- Now the trigger only queues the broadcast; process_group_post_broadcast()
-- writes notifications in small batches, driven by the API right after the
-- post and by a cron as a safety net. Buddy-only notifications for normal
-- members are small and stay inline.

create table if not exists public.group_post_broadcast_queue (
  post_id uuid primary key,
  group_id uuid not null,
  created_at timestamptz not null default now(),
  cursor_user_id uuid,
  sent_count integer not null default 0,
  processed_at timestamptz
);
create index if not exists group_post_broadcast_queue_pending_idx
  on public.group_post_broadcast_queue (created_at) where processed_at is null;
alter table public.group_post_broadcast_queue enable row level security;

create or replace function public.notify_group_broadcast_post()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_name text;
  v_group_name text;
  v_route text;
  v_louis_id uuid;
begin
  if new.parent_post_id is not null then
    return new;
  end if;

  select au.id into v_louis_id from auth.users au where lower(au.email) = 'moorelouis3@gmail.com' limit 1;

  -- Louis notifies the whole group: queue it, never do it inline.
  if new.user_id = v_louis_id then
    insert into public.group_post_broadcast_queue (post_id, group_id)
    values (new.id, new.group_id)
    on conflict (post_id) do nothing;
    return new;
  end if;

  -- Everyone else notifies only their buddies in the group: a handful of rows.
  v_actor_name := public.notification_actor_name(new.user_id, coalesce(new.display_name, 'A member'));
  select sg.name into v_group_name from public.study_groups sg where sg.id = new.group_id;
  v_route := '/study-groups/' || new.group_id || '/chat';

  insert into public.notifications (user_id, type, from_user_id, from_user_name, article_slug, post_id, comment_id, message)
  select gm.user_id, 'group_post', new.user_id, v_actor_name, v_route, new.id, null,
         v_actor_name || ' posted in ' || coalesce(v_group_name, 'your group')
  from public.group_members gm
  join public.buddies b
    on b.user_id_1 = least(gm.user_id, new.user_id)
   and b.user_id_2 = greatest(gm.user_id, new.user_id)
  where gm.group_id = new.group_id
    and gm.status = 'approved'
    and gm.user_id <> new.user_id;

  return new;
end;
$$;

-- Sends the next batch for one queued post. Returns how many notifications it
-- wrote; 0 means the broadcast is finished (and it is marked processed).
create or replace function public.process_group_post_broadcast(p_post_id uuid, p_batch integer default 400)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_queue public.group_post_broadcast_queue%rowtype;
  v_post public.group_posts%rowtype;
  v_actor_name text;
  v_group_name text;
  v_route text;
  v_last uuid;
  v_count integer;
begin
  select * into v_queue from public.group_post_broadcast_queue where post_id = p_post_id for update skip locked;
  if not found or v_queue.processed_at is not null then
    return 0;
  end if;

  select * into v_post from public.group_posts where id = p_post_id;
  if not found then
    update public.group_post_broadcast_queue set processed_at = now() where post_id = p_post_id;
    return 0;
  end if;

  v_actor_name := public.notification_actor_name(v_post.user_id, coalesce(v_post.display_name, 'A member'));
  select sg.name into v_group_name from public.study_groups sg where sg.id = v_post.group_id;
  v_route := '/study-groups/' || v_post.group_id || '/chat';

  with batch as (
    select gm.user_id
    from public.group_members gm
    where gm.group_id = v_post.group_id
      and gm.status = 'approved'
      and gm.user_id <> v_post.user_id
      and (v_queue.cursor_user_id is null or gm.user_id > v_queue.cursor_user_id)
    order by gm.user_id
    limit greatest(1, least(p_batch, 1000))
  ), inserted as (
    insert into public.notifications (user_id, type, from_user_id, from_user_name, article_slug, post_id, comment_id, message)
    select b.user_id, 'group_post', v_post.user_id, v_actor_name, v_route, v_post.id, null,
           v_actor_name || ' posted in ' || coalesce(v_group_name, 'your group')
    from batch b
    returning user_id
  )
  select count(*), max(user_id::text)::uuid into v_count, v_last from inserted;

  if v_count = 0 then
    update public.group_post_broadcast_queue set processed_at = now() where post_id = p_post_id;
  else
    update public.group_post_broadcast_queue
    set cursor_user_id = v_last, sent_count = sent_count + v_count
    where post_id = p_post_id;
  end if;

  return v_count;
end;
$$;

revoke all on function public.process_group_post_broadcast(uuid, integer) from public, anon, authenticated;
grant execute on function public.process_group_post_broadcast(uuid, integer) to service_role;
