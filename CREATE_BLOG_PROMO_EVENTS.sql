-- Blog promo tracking (MVP promo system).
-- Stores one row per promo impression or click on blog posts, for both
-- logged-out and logged-in readers. Written only by the server (service
-- role) through /api/blog/track-promo, so no public policies are needed.
-- Run this once in the Supabase SQL editor.

create table if not exists public.blog_promo_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in ('impression', 'click')),
  promo text not null,
  post_slug text not null,
  slot_index integer not null default 0,
  session_id text not null,
  user_id uuid null references auth.users (id) on delete set null
);

create index if not exists blog_promo_events_created_at_idx
  on public.blog_promo_events (created_at desc);

create index if not exists blog_promo_events_post_slug_idx
  on public.blog_promo_events (post_slug);

alter table public.blog_promo_events enable row level security;
