-- Bible Buddy's own mailing list (Louis, 2026-10-08).
--
-- Until now the list lived inside Systeme.io, which charges per CONTACT rather
-- than per email and was about to take us from $17 to $47 a month at 5,000
-- contacts. Amazon SES charges ~$0.10 per thousand emails and nothing to store
-- an address, so the list has to live here instead.
--
-- The address is the key, not a user id: people change accounts, sign up twice,
-- or were only ever a newsletter contact. Same reasoning as email_suppressions,
-- which remains the separate "never email this address again" list - a row here
-- means "on the list", a row there always wins.

create table if not exists public.email_subscribers (
  email text primary key,
  first_name text,
  locale text,
  -- where the address came from: systeme_import, signup, event, manual...
  source text not null default 'signup',
  -- tags carried over from Systeme so existing segments still work
  tags text[] not null default '{}',
  systeme_id bigint,
  subscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists email_subscribers_source_idx on public.email_subscribers (source);
create index if not exists email_subscribers_tags_idx on public.email_subscribers using gin (tags);
create index if not exists email_subscribers_subscribed_at_idx on public.email_subscribers (subscribed_at);

-- Service role only. A mailing list is exactly the kind of thing that must not
-- be readable from a browser - see the user_signups policy that let anon read
-- every signup email.
alter table public.email_subscribers enable row level security;

drop policy if exists email_subscribers_service_only on public.email_subscribers;
create policy email_subscribers_service_only
  on public.email_subscribers
  for all
  to service_role
  using (true)
  with check (true);
