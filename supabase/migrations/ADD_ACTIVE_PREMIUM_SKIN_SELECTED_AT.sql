alter table public.profile_stats
  add column if not exists active_premium_skin_selected_at timestamptz;

update public.profile_stats
set active_premium_skin_selected_at = coalesce(updated_at, now())
where active_premium_skin is not null
  and active_premium_skin <> 'none'
  and active_premium_skin_selected_at is null;

create index if not exists profile_stats_active_premium_skin_selected_at_idx
  on public.profile_stats (active_premium_skin_selected_at);
