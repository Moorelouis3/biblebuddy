-- can_send_campaign_now was too slow to use (Louis, 2026-10-10, same evening).
--
-- WHAT HAPPENED: the first version answered "may we send to this one address"
-- by selecting from email_engagement with a where on the email. Postgres
-- materialised the whole view - 5,200 subscribers joined against 134,000
-- qualifying actions - and then threw away all but one row. About 1.5 seconds,
-- per recipient, on a sender that calls it before every single send.
--
-- It blew the statement timeout 78 emails into a batch of the live Moses
-- campaign. email-campaign-send caught the error and did exactly what it is
-- written to do with an unexplained failure: paused the campaign. So a
-- performance bug stopped a send to 4,400 people, silently, and the only
-- trace was last_result.
--
-- THE FIX: ask the same question with four indexed single-row lookups instead
-- of building the view. The RULES still live in one place - the 30 and 90 day
-- lines and the caps are now functions that both this and email_engagement
-- can call, rather than a CASE expression copied into two files.

-- The boundaries, named once.
create or replace function public.engagement_group_at(p_reference_at timestamptz)
returns text
language sql
stable
as $$
  select case
    when p_reference_at >= now() - interval '30 days' then 'active'
    when p_reference_at >= now() - interval '90 days' then 'quiet'
    else 'inactive'
  end;
$$;

-- Campaigns per rolling 7 days. Null for active: no cap.
create or replace function public.weekly_cap_for(p_group text)
returns integer
language sql
immutable
as $$
  select case p_group
    when 'active' then null::integer
    when 'quiet'  then 2
    else 1
  end;
$$;

-- SECURITY DEFINER because it reads auth.users, which service_role cannot
-- select from directly. email_engagement gets away with reading it by being a
-- view owned by postgres; a plpgsql function has to say so out loud.
--
-- Safe to elevate: it only reads, it takes an address and returns a boolean,
-- search_path is pinned so nothing can shadow the tables it reads, and it is
-- revoked from anon and authenticated below.
create or replace function public.can_send_campaign_now(p_campaign_id text, p_email text)
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  c record;
  v_user_id uuid;
  v_registered timestamptz;
  v_last_app timestamptz;
  v_last_click timestamptz;
  v_reference timestamptz;
  v_group text;
  v_cap integer;
  v_recent integer;
begin
  select kind, target_groups into c from public.email_campaigns where campaign_id = p_campaign_id;
  if not found then return false; end if;

  -- Suppression first and absolute, exactly as in the view. App activity can
  -- never undo an unsubscribe.
  if exists (select 1 from public.email_suppressions where email = p_email) then return false; end if;
  if not exists (select 1 from public.email_subscribers where email = p_email) then return false; end if;

  -- Transactional mail is outside the groups and the caps entirely.
  if c.kind = 'transactional' then return true; end if;

  select id, created_at into v_user_id, v_registered
  from auth.users
  where lower(btrim(email)) = lower(btrim(p_email))
    and coalesce(is_anonymous, false) = false
  order by created_at asc
  limit 1;

  -- Newsletter-only addresses have no account; subscribed_at is the floor.
  if v_registered is null then
    select subscribed_at into v_registered from public.email_subscribers where email = p_email;
  end if;

  if v_user_id is not null then
    select max(created_at) into v_last_app
    from public.master_actions
    where user_id = v_user_id
      and created_at > now() - interval '400 days'
      and public.is_qualifying_app_action(action_type);
  end if;

  -- Clicks only. Opens never promote anyone; see is_human_email_open.
  select max(occurred_at) into v_last_click
  from public.email_events
  where event_type = 'click'
    and lower(email) = lower(p_email)
    and public.is_human_email_click(user_agent, link_url);

  v_reference := greatest(v_registered, v_last_app, v_last_click);
  v_group := public.engagement_group_at(v_reference);
  if not (v_group = any (c.target_groups)) then return false; end if;

  v_cap := public.weekly_cap_for(v_group);
  if v_cap is null then return true; end if;

  -- This campaign's own claim is excluded, so the answer is the same whether
  -- it is asked before or after the row is claimed.
  select count(*) into v_recent
  from public.email_campaign_sends s
  join public.email_campaigns c2 on c2.campaign_id = s.campaign_id
  where lower(s.email) = lower(p_email)
    and c2.kind = 'marketing'
    and s.campaign_id <> p_campaign_id
    and s.status in ('sent', 'pending')
    and coalesce(s.sent_at, s.created_at) > now() - interval '7 days';

  return v_recent < v_cap;
end;
$$;

revoke all on function public.can_send_campaign_now(text, text) from anon, authenticated;
revoke all on function public.engagement_group_at(timestamptz) from anon, authenticated;
revoke all on function public.weekly_cap_for(text) from anon, authenticated;

-- STILL TO DO: email_engagement carries its own copy of the 30/90-day CASE
-- and the cap CASE. They were left alone here on purpose - replacing a view
-- that marketing_recipients() reads while a campaign was mid-send was not a
-- risk worth taking for a tidy-up. Verified identical on every subscriber at
-- the time of writing:
--
--   select count(*) filter (where engagement_group <> engagement_group_at(reference_at)),
--          count(*) filter (where weekly_cap is distinct from weekly_cap_for(engagement_group))
--   from public.email_engagement;   -- 0, 0 across 5,203
--
-- Swap the view's two CASE expressions for engagement_group_at(reference_at)
-- and weekly_cap_for(...) next time nothing is sending, and the rule exists
-- in exactly one place.
