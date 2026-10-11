-- APNs/FCM device tokens for the store apps (Louis, 2026-10-11).
--
-- push_subscriptions holds Web Push endpoints, which is a different thing:
-- an endpoint URL plus p256dh and auth keys, delivered by the browser's push
-- service. A native app has none of that. iOS gives you an opaque device
-- token and you hand it to Apple's APNs; Android gives you one for FCM.
-- Same idea, incompatible shapes, so it gets its own table rather than
-- nullable columns bolted onto that one.
--
-- NOTHING SENDS TO THESE YET. Registration is written and switched off until
-- there is a paid Apple membership and an APNs key (Stage 2). Collecting
-- tokens early would just gather values that expire unused.

create table if not exists public.native_push_tokens (
  -- The token itself is the identity: reinstalling gives a new one, and the
  -- old one simply stops being valid.
  token text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  platform text not null check (platform in ('ios', 'android')),
  -- So a stale token can be aged out rather than retried forever; APNs bills
  -- reputation on repeatedly pushing to dead devices.
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists native_push_tokens_user_idx
  on public.native_push_tokens (user_id);

alter table public.native_push_tokens enable row level security;

-- Service role only, like push_subscriptions. A device token is enough to
-- send someone a notification, so nothing client-side should be able to read
-- the table - only to write its own row through the API.
drop policy if exists native_push_tokens_service_only on public.native_push_tokens;
create policy native_push_tokens_service_only
  on public.native_push_tokens for all to service_role
  using (true) with check (true);

comment on table public.native_push_tokens is
  'APNs/FCM device tokens for the iOS and Android apps. Web Push lives in push_subscriptions.';
