-- One popup system (Louis, 2026-11-13). See docs/POPUP_SYSTEM_PROPOSAL.md.
--
-- Safe to run more than once. Nothing here deletes or rewrites what a person
-- has already seen: every existing user_popups_seen row keeps its popup_id
-- and its seen_at, and only gains columns.

-- 1. What we remember about one person and one popup -------------------------

alter table public.user_popups_seen
  add column if not exists content_version integer not null default 1,
  add column if not exists first_shown_at timestamptz,
  add column if not exists last_shown_at timestamptz,
  add column if not exists display_count integer not null default 1,
  add column if not exists dismissed_at timestamptz,
  add column if not exists dismiss_type text,
  add column if not exists cta_clicked_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists never_again boolean not null default false,
  add column if not exists next_eligible_at timestamptz,
  -- True only for a display the coordinator made. Rows written by the old,
  -- separate popups stay false, so nobody starts out against the weekly limit.
  add column if not exists automatic boolean not null default false;

update public.user_popups_seen
   set first_shown_at = coalesce(first_shown_at, seen_at),
       last_shown_at = coalesce(last_shown_at, seen_at)
 where first_shown_at is null or last_shown_at is null;

create index if not exists user_popups_seen_automatic_idx
  on public.user_popups_seen(user_id, last_shown_at)
  where automatic;

-- 2. The switches -------------------------------------------------------------
-- A popup with no row here is off. Everyone signed in may read the switches;
-- only the service role (the admin page) may change them.

create table if not exists public.popup_settings (
  popup_id text primary key,
  enabled boolean not null default false,
  priority integer,
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.popup_settings enable row level security;

drop policy if exists "Signed-in users can read popup settings" on public.popup_settings;
create policy "Signed-in users can read popup settings"
on public.popup_settings
for select
to authenticated
using (true);

-- 3. The claim ----------------------------------------------------------------
-- The browser decides which popup it would like to show; this decides whether
-- it may. It takes a lock for the person, so two tabs, or a phone and a
-- laptop, asking at the same moment are answered one after the other and only
-- the first is told yes. The limits here are the ones in lib/popups/decide.ts
-- (20 hours apart, three in seven days, two displays per popup); keep the two
-- in step.

create or replace function public.claim_popup(p_popup_id text, p_version integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_row public.user_popups_seen%rowtype;
  v_same_version boolean;
begin
  if v_user is null then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user::text, 0));

  if not exists (
    select 1 from public.popup_settings
     where popup_id = p_popup_id
       and enabled
       and (expires_at is null or expires_at > now())
  ) then
    return false;
  end if;

  if exists (
    select 1 from public.user_popups_seen
     where user_id = v_user and automatic
       and last_shown_at > now() - interval '20 hours'
  ) then
    return false;
  end if;

  if (
    select count(*) from public.user_popups_seen
     where user_id = v_user and automatic
       and last_shown_at > now() - interval '7 days'
  ) >= 3 then
    return false;
  end if;

  select * into v_row from public.user_popups_seen
   where user_id = v_user and popup_id = p_popup_id;

  if found then
    if v_row.never_again or v_row.completed_at is not null then
      return false;
    end if;
    v_same_version := v_row.content_version >= p_version;
    if v_same_version and (
      v_row.cta_clicked_at is not null
      or v_row.display_count >= 2
      or (v_row.next_eligible_at is not null and v_row.next_eligible_at > now())
    ) then
      return false;
    end if;

    update public.user_popups_seen
       set content_version = p_version,
           display_count = case when v_same_version then v_row.display_count + 1 else 1 end,
           last_shown_at = now(),
           automatic = true,
           dismissed_at = null,
           dismiss_type = null,
           cta_clicked_at = case when v_same_version then v_row.cta_clicked_at else null end,
           next_eligible_at = null,
           updated_at = now()
     where id = v_row.id;
  else
    insert into public.user_popups_seen
      (user_id, popup_id, has_seen, seen_at, updated_at,
       content_version, first_shown_at, last_shown_at, display_count, automatic)
    values
      (v_user, p_popup_id, true, now(), now(), p_version, now(), now(), 1, true);
  end if;

  return true;
end;
$$;

revoke all on function public.claim_popup(text, integer) from public, anon;
grant execute on function public.claim_popup(text, integer) to authenticated;
