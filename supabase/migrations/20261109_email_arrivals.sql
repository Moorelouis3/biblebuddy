-- Counting email clicks ourselves, after SES stopped counting them for us.
--
-- On 2026-11-09 SES click tracking was turned off on purpose, so that links in
-- emails open the Bible Buddy app instead of Chrome. SES could only count a
-- click by rewriting every href through awstrack.me, and a phone matches the
-- domain the reader actually taps - which was Amazon's, so no universal link
-- could ever fire from an email. See docs/DEEP_LINKS.md for the whole trade.
--
-- The cost was the click number. This is its replacement, and it measures a
-- different thing on purpose: SES counted the LEAVING, this counts the
-- ARRIVING. Every email link already carries ?utm_source=email&utm_campaign=,
-- so when one of those lands on the site we write a row here.
--
-- Arriving is the better number of the two:
--   * a mail scanner fetches a link without running JavaScript, so it never
--     gets counted here - and scanner clicks were a large enough share of the
--     SES figure that lib/productHealth.ts has a SCANNER_UA regex to strip
--     them out after the fact;
--   * the app loads the same web pages, so an arrival inside the iPhone or
--     Android app is counted exactly like one in a browser, which SES could
--     never do;
--   * a signed-in arrival already knows its user_id from the Supabase session,
--     so there is no need to put an address, a hash of one, or any per-person
--     token into a URL.
-- What it cannot see: somebody who taps and never arrives, and who a
-- logged-out reader is. Those are accepted losses.

-- NOT a new event_type on email_events, deliberately.
--
-- That table is "one row per thing SES tells us happened to one message": its
-- primary key is (message_id, event_type, occurred_at) with message_id NOT
-- NULL, and event_type carries a CHECK constraint naming the eight event types
-- SES publishes. An arrival has no SES message id, so putting one there would
-- mean inventing an id that lies about what the row is, and widening a CHECK
-- constraint on a live table the SNS webhook writes to continuously. A new
-- table touches nothing that already works, and the historical click rows stay
-- exactly where they are.
create table if not exists public.email_arrivals (
  id uuid primary key default gen_random_uuid(),

  -- Named to match email_events.occurred_at, because the dashboard reads the
  -- two side by side and one vocabulary is easier to keep straight.
  occurred_at timestamptz not null default now(),

  -- From utm_campaign. Matches email_events.campaign_id, which the SNS webhook
  -- fills from the EmailTags sendCampaign sets, so arrivals and the surviving
  -- delivery and open numbers join on the same key.
  campaign_id text,

  -- Where they landed. Query string deliberately stripped before it gets here.
  page_path text not null,

  -- Null for a logged-out arrival. Resolved server-side from the Supabase
  -- session, never from anything in the URL.
  user_id uuid,

  -- Lets a reload or a second tap be counted once. Reports count DISTINCT
  -- session per campaign, the same way ses_campaign_stats counts unique
  -- recipients rather than raw events.
  session_id text,

  user_agent text,

  -- The Capacitor shell loads this same site, so without this there is no way
  -- to tell an arrival in the app from one in a browser.
  is_native boolean not null default false,

  created_at timestamptz not null default now()
);

create index if not exists email_arrivals_campaign_idx
  on public.email_arrivals (campaign_id, occurred_at desc);
create index if not exists email_arrivals_occurred_idx
  on public.email_arrivals (occurred_at desc);
create index if not exists email_arrivals_user_idx
  on public.email_arrivals (user_id);

-- Service role only, like email_events. Nothing here is readable with the
-- publishable key: page_path plus user_id is a record of what a named person
-- read, and on 2026-11-09 six relations turned out to be readable anonymously,
-- so this one starts closed.
alter table public.email_arrivals enable row level security;

drop policy if exists email_arrivals_service_only on public.email_arrivals;
create policy email_arrivals_service_only
  on public.email_arrivals for all to service_role
  using (true) with check (true);

comment on table public.email_arrivals is
  'One row per visit that arrived from an email link (utm_source=email). Replaces SES click tracking, which was turned off so email links could open the app. See docs/DEEP_LINKS.md.';
