alter table public.profile_stats
  add column if not exists active_premium_skin text not null default 'none';

alter table public.profile_stats
  drop constraint if exists profile_stats_active_premium_skin_check;

alter table public.profile_stats
  add constraint profile_stats_active_premium_skin_check
  check (active_premium_skin in ('none', 'blue-storm', 'midnight-garden', 'lavender-prayer', 'ruby-village'));

create index if not exists profile_stats_active_premium_skin_idx
  on public.profile_stats (active_premium_skin);
