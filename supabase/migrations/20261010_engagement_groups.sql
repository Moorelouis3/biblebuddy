-- Engagement groups: Active, Quiet, Inactive (Louis, 2026-10-10).
--
-- One master list, three frequencies. Somebody who studied this week can take
-- three emails; somebody who has not opened the app since July cannot, and
-- mailing them anyway is how a complaint rate climbs past the 0.1% that gets a
-- sender throttled. So the list splits itself by elapsed time since the person
-- last did something real, and the quieter groups simply receive fewer of the
-- same campaigns rather than different ones.
--
--   active    last qualifying activity (or registration) within 30 days
--   quiet     31-90 days ago            -> max 2 campaigns per rolling 7 days
--   inactive  more than 90 days ago     -> max 1 campaign per rolling 7 days
--
-- Elapsed time, not emails received, deliberately: capping the quiet group at
-- two a week and then measuring them by emails would mean they take half as
-- long to look dead as they really are. The clock runs on activity only.
--
-- EVERYTHING here is defined once, in SQL, because the dashboard and the sender
-- must never disagree about who is in which group. app/api/admin/campaigns
-- reads the same views and calls the same function that lib/email/sendCampaign
-- does; nothing recomputes a group in TypeScript.
--
-- WHAT THIS DOES NOT DO: it never resurrects a suppressed address. Suppression
-- is checked here, again in marketing_recipients(), and again in sesSender
-- before each individual send. App activity cannot undo an unsubscribe.

-- @chunk 1: campaign targeting and the marketing/transactional split
--
-- kind exists so the frequency cap counts marketing only. Welcome emails go
-- through email_funnel_sends and password resets through Supabase Auth, so
-- they are already outside email_campaign_sends - this makes that a rule
-- rather than a coincidence, for whatever gets added later.
alter table public.email_campaigns
  add column if not exists kind text not null default 'marketing',
  add column if not exists target_groups text[] not null default '{active,quiet,inactive}';

alter table public.email_campaigns drop constraint if exists email_campaigns_kind_check;
alter table public.email_campaigns add constraint email_campaigns_kind_check
  check (kind in ('marketing', 'transactional'));

-- Default is all three groups, and the per-group caps do the rest: at three
-- campaigns a week, active receives 3, quiet 2, inactive 1, with no decision
-- to remember. Narrow it per campaign when a particular email is only for the
-- people who are already reading.
alter table public.email_campaigns drop constraint if exists email_campaigns_target_groups_check;
alter table public.email_campaigns add constraint email_campaigns_target_groups_check
  check (
    array_length(target_groups, 1) >= 1
    and target_groups <@ array['active', 'quiet', 'inactive']::text[]
  );

comment on column public.email_campaigns.kind is
  'marketing counts against the engagement frequency caps; transactional never does.';
comment on column public.email_campaigns.target_groups is
  'Which engagement groups may receive this campaign. Caps still apply within each.';

-- @chunk 2: which app actions count as "reading or studying"
--
-- A deny list, not an allow list: master_actions has 107 action types today and
-- grows with every feature, and an allow list silently stops counting the new
-- ones - which would quietly mark active people inactive. What is denied is
-- everything that is not the person choosing to study:
--
--   marketing site visits      anonymous more often than not
--   signup and onboarding      registration date already covers that moment
--   popups and banners         we showed it to them; that is our action
--   billing bookkeeping        some of it fired by Stripe, not by a human
--   louis_daily_message_shown  pushed at them, not opened by them
--
-- user_login and dashboard_viewed DO count. They are not studying, but they
-- are unambiguously a human coming back to Bible Buddy, and a person who opens
-- the app every week is not inactive by any honest reading of the word.
create or replace function public.is_qualifying_app_action(p_action_type text)
returns boolean
language sql
immutable
as $$
  select p_action_type is not null
     and p_action_type not in (
           'landing_page_visited',
           'landing_cta_clicked',
           'user_signup',
           'louis_daily_message_shown',
           'user_upgraded',
           'trial_canceled',
           'referral_signup_reward',
           'profile_creation_popup_completed',
           'dashboard_tour_completed',
           'dashboard_tour_skipped'
         )
     and p_action_type not like 'onboarding_%'
     and p_action_type not like 'install_banner_%'
     and p_action_type not like 'upgrade_popup_%';
$$;

-- @chunk 3: which email events are a human, and which are a machine
--
-- Measured against the first real campaign (2026-10-10), where all 108 opens
-- from 91 addresses were machines: Gmail's image proxy via ggpht.com, a
-- synthetic Chrome/42 + Edge/12 scanner UA out of Google's range, and a bare
-- "Mozilla/5.0" from Fastly. Not one was a person.
--
-- Clicks are the signal we trust, with two exclusions:
--   - the unsubscribe link, which is somebody leaving, not engaging
--   - the proxy and scanner agents above, which follow links as well as pixels
create or replace function public.looks_automated_email_agent(p_user_agent text)
returns boolean
language sql
immutable
as $$
  select p_user_agent is null
      or length(btrim(p_user_agent)) < 20          -- bare "Mozilla/5.0"
      or p_user_agent ~* '(googleimageproxy|ggpht|googleusercontent|yahoomailproxy|proxy)'
      or p_user_agent ~* '(bot|crawl|spider|scanner|preview|curl|wget|python-requests|headless|phantomjs)'
      or p_user_agent ~* '(barracuda|mimecast|proofpoint|symantec|forcepoint|trendmicro)'
      -- the exact synthetic signature in our own data
      or (p_user_agent like '%Chrome/42.0.2311.135%' and p_user_agent like '%Edge/12.246%');
$$;

create or replace function public.is_human_email_click(p_user_agent text, p_link_url text)
returns boolean
language sql
immutable
as $$
  select not public.looks_automated_email_agent(p_user_agent)
     and coalesce(p_link_url, '') not like '%/api/email/unsubscribe%';
$$;

-- Implemented, and currently qualifies nobody - which is the honest state.
-- Apple Mail Privacy Protection pre-fetches the pixel with an ordinary iPhone
-- or Mac user agent, so a "human" open cannot be told from a pre-fetch by
-- agent at all. Opens are therefore REPORTED but never promote anyone to
-- active; see email_engagement, which leaves last_open_at out of the activity
-- calculation on purpose.
create or replace function public.is_human_email_open(p_user_agent text)
returns boolean
language sql
immutable
as $$
  select not public.looks_automated_email_agent(p_user_agent);
$$;

-- @chunk 4: the one view everything reads
--
-- One row per subscriber, with the timestamp the group is decided by and a
-- sentence saying why. The dashboard cards, the drill-down list and the sender
-- all come from here, so a count on screen cannot mean something different
-- from what actually goes out.
--
-- Opens are carried for reporting and are deliberately ABSENT from
-- last_qualifying_activity_at. See is_human_email_open above for why.
create or replace view public.email_engagement as
with accounts as (
  -- auth.users, NOT user_signups.
  --
  -- user_signups looked like the obvious map and is wrong: of the 1,443
  -- people who used the app in the last 30 days it can account for 218.
  -- auth.users has all 1,443. Joining through user_signups silently put a
  -- thousand active readers in the inactive pile, which is exactly the
  -- failure this whole system exists to avoid.
  --
  -- Anonymous accounts are skipped: they have no address, so they can never
  -- be a subscriber. Earliest row per address wins - somebody who signed up
  -- twice registered on the first date.
  select distinct on (lower(email))
         lower(btrim(email)) as email,
         id as user_id,
         created_at
  from auth.users
  where email is not null
    and btrim(email) <> ''
    and coalesce(is_anonymous, false) = false
  order by lower(email), created_at asc
),
app_activity as (
  -- Bounded at 400 days so this stays a small index range forever. Anything
  -- older than that is past the 90-day line regardless, and master_actions
  -- only begins 2026-01-06 in any case.
  select distinct on (user_id) user_id, created_at as last_at, action_type as last_action
  from public.master_actions
  where user_id is not null
    and created_at > now() - interval '400 days'
    and public.is_qualifying_app_action(action_type)
  order by user_id, created_at desc
),
human_clicks as (
  select distinct on (lower(email)) lower(email) as email, occurred_at as last_at
  from public.email_events
  where event_type = 'click'
    and email is not null
    and public.is_human_email_click(user_agent, link_url)
  order by lower(email), occurred_at desc
),
opens as (
  select lower(email) as email,
         max(occurred_at) as last_at,
         count(*) as total,
         count(*) filter (where public.is_human_email_open(user_agent)) as human
  from public.email_events
  where event_type = 'open' and email is not null
  group by lower(email)
),
recent_sends as (
  -- The rolling seven-day window, across EVERY marketing campaign rather than
  -- per campaign. Claimed-but-not-yet-sent counts: erring toward under-sending
  -- keeps the cap a promise instead of an estimate.
  select lower(s.email) as email, count(*)::integer as n
  from public.email_campaign_sends s
  join public.email_campaigns c on c.campaign_id = s.campaign_id
  where c.kind = 'marketing'
    and s.status in ('sent', 'pending')
    and coalesce(s.sent_at, s.created_at) > now() - interval '7 days'
  group by lower(s.email)
),
base as (
  select
    s.email,
    s.first_name,
    s.source,
    acc.user_id,
    -- Never null: email_subscribers.subscribed_at is not null, so there is
    -- always a floor to fall back on.
    coalesce(acc.created_at, ps.registered_at, s.subscribed_at) as registered_at,
    aa.last_at as last_app_activity_at,
    aa.last_action as last_app_action,
    hc.last_at as last_human_click_at,
    op.last_at as last_open_at,
    coalesce(op.total, 0)::integer as opens_total,
    coalesce(op.human, 0)::integer as opens_that_look_human,
    greatest(aa.last_at, hc.last_at) as last_qualifying_activity_at,
    coalesce(rs.n, 0) as marketing_sends_7d,
    (sup.email is not null) as suppressed,
    sup.reason as suppression_reason
  from public.email_subscribers s
  left join accounts acc on acc.email = lower(s.email)
  left join public.profile_stats ps on ps.user_id = acc.user_id
  left join app_activity aa on aa.user_id = acc.user_id
  left join human_clicks hc on hc.email = lower(s.email)
  left join opens op on op.email = lower(s.email)
  left join recent_sends rs on rs.email = lower(s.email)
  left join public.email_suppressions sup on sup.email = s.email
),
scored as (
  -- The single timestamp the group is decided by. greatest() ignores nulls in
  -- Postgres, and registration is included rather than only used as a fallback,
  -- so a brand new account is active on day one whether or not it has done
  -- anything yet - which is the point of the 30-day registration rule.
  select b.*, greatest(b.registered_at, b.last_qualifying_activity_at) as reference_at
  from base b
)
select
  email,
  first_name,
  source,
  user_id,
  registered_at,
  last_app_activity_at,
  last_app_action,
  last_human_click_at,
  last_open_at,
  opens_total,
  opens_that_look_human,
  last_qualifying_activity_at,
  reference_at,
  marketing_sends_7d,
  suppressed,
  suppression_reason,
  (last_qualifying_activity_at is not null) as has_recorded_activity,
  -- Suppressed addresses still get a group computed, they are simply never
  -- eligible. That keeps the three counts summing to the eligible total while
  -- leaving unsubscribes visible and separate.
  (not suppressed) as eligible,
  case
    when reference_at >= now() - interval '30 days' then 'active'
    when reference_at >= now() - interval '90 days' then 'quiet'
    else 'inactive'
  end as engagement_group,
  -- Campaigns per rolling 7 days. Null for active: no cap, they get the usual
  -- cadence.
  case
    when reference_at >= now() - interval '30 days' then null::integer
    when reference_at >= now() - interval '90 days' then 2
    else 1
  end as weekly_cap,
  case
    when last_human_click_at is not null
         and last_human_click_at >= coalesce(last_app_activity_at, '-infinity'::timestamptz)
      then 'email_click'
    when last_app_activity_at is not null then 'app_activity'
    else 'registration'
  end as activity_basis,
  -- Written here rather than in the dashboard so the reason on screen is
  -- produced by the same rule that did the grouping.
  case
    when last_app_activity_at is not null
         and last_app_activity_at >= coalesce(last_human_click_at, '-infinity'::timestamptz)
      then 'Last used the app ' || to_char(last_app_activity_at, 'DD Mon YYYY') || ' (' || last_app_action || ')'
    when last_human_click_at is not null
      then 'Clicked an email ' || to_char(last_human_click_at, 'DD Mon YYYY')
    else 'No activity on record. Registered ' || to_char(registered_at, 'DD Mon YYYY')
         || ' - grouped on that date, not on anything they did or ignored.'
  end as group_reason
from scored;

-- This view lists every subscriber address. Nothing client-side may read it.
revoke all on public.email_engagement from anon, authenticated;

-- @chunk 5: the three numbers on the dashboard
create or replace view public.email_engagement_summary as
select
  count(*) filter (where eligible and engagement_group = 'active')::integer as active,
  count(*) filter (where eligible and engagement_group = 'quiet')::integer as quiet,
  count(*) filter (where eligible and engagement_group = 'inactive')::integer as inactive,
  count(*) filter (where eligible)::integer as eligible_total,
  count(*) filter (where not eligible)::integer as suppressed_total,
  count(*)::integer as subscribers_total,
  count(*) filter (where eligible and not has_recorded_activity)::integer as eligible_without_history
from public.email_engagement;

revoke all on public.email_engagement_summary from anon, authenticated;

-- @chunk 6: the gate - used by the dashboard's count AND by the sender
--
-- This is the whole reason the rules live in SQL. "Eligible recipients" shown
-- before a send and the addresses actually walked by lib/email/sendCampaign
-- are the same query, so the number cannot be a different number.
--
-- Order of exclusion: suppressed, wrong group, over the weekly cap, already
-- sent this campaign. Suppression is first and is absolute.
create or replace function public.marketing_recipients(p_campaign_id text)
returns table (
  email text,
  first_name text,
  engagement_group text,
  weekly_cap integer,
  marketing_sends_7d integer
)
language sql
stable
as $$
  select e.email, e.first_name, e.engagement_group, e.weekly_cap, e.marketing_sends_7d
  from public.email_engagement e
  join public.email_campaigns c on c.campaign_id = p_campaign_id
  where e.eligible
    -- Transactional mail is outside this system entirely: no group, no cap.
    and (
      c.kind = 'transactional'
      or (
        e.engagement_group = any (c.target_groups)
        and e.marketing_sends_7d < coalesce(e.weekly_cap, 2147483647)
      )
    )
    and not exists (
      select 1 from public.email_campaign_sends s
      where s.campaign_id = c.campaign_id and s.email = e.email
    )
  order by e.email;
$$;

-- The same question asked again for one address, immediately before the send.
--
-- A batch takes ten minutes and the window is rolling, so the answer can change
-- underneath a queue that was built at the start of the run.
--
-- It subtracts this campaign's own claim from the seven-day count, so it gives
-- the same answer whether it is asked before or after the row is claimed. Ask
-- it after the claim without that subtraction and a quiet subscriber on their
-- second email of the week refuses their own send.
create or replace function public.can_send_campaign_now(p_campaign_id text, p_email text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.email_engagement e
    join public.email_campaigns c on c.campaign_id = p_campaign_id
    where e.email = p_email
      and e.eligible
      and (
        c.kind = 'transactional'
        or (
          e.engagement_group = any (c.target_groups)
          and (
            e.marketing_sends_7d
            - (
                -- 0 or 1: email_campaign_sends is keyed (campaign_id, email).
                select count(*)
                from public.email_campaign_sends s2
                where s2.campaign_id = p_campaign_id
                  and s2.email = p_email
                  and s2.status in ('sent', 'pending')
                  and coalesce(s2.sent_at, s2.created_at) > now() - interval '7 days'
              )
          ) < coalesce(e.weekly_cap, 2147483647)
        )
      )
  );
$$;

revoke all on function public.marketing_recipients(text) from anon, authenticated;
revoke all on function public.can_send_campaign_now(text, text) from anon, authenticated;

-- @chunk 7: indexes the view needs
--
-- Without the first one, grouping 170k actions by user is a sequential scan on
-- every dashboard load.
create index if not exists master_actions_user_created_idx
  on public.master_actions (user_id, created_at desc);

-- The one that actually matters. app_activity walks 134,000 qualifying rows
-- to find each person's most recent one; carrying action_type in the index
-- keeps that an index-only scan instead of 134,000 heap fetches. Measured on
-- production: the dashboard summary went from 4.0s to 1.0s.
create index if not exists master_actions_engagement_idx
  on public.master_actions (user_id, created_at desc)
  include (action_type)
  where user_id is not null;

create index if not exists email_campaign_sends_email_created_idx
  on public.email_campaign_sends (email, created_at desc);

create index if not exists email_events_type_email_idx
  on public.email_events (event_type, email, occurred_at desc);

-- Dropped: the view reads auth.users, so nothing looks subscribers up by
-- user_signups.email any more.
drop index if exists public.user_signups_email_lower_idx;
