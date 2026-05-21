alter table public.profile_stats
  drop constraint if exists profile_stats_active_premium_skin_check;

alter table public.profile_stats
  add constraint profile_stats_active_premium_skin_check
  check (active_premium_skin in ('none', 'blue-storm', 'midnight-garden', 'lavender-prayer', 'ruby-village', 'slow-mornings', 'morning-mercy', 'carolina-coastline', 'angel-wings', 'winter-cabin', 'mount-sinai', 'desert-dawn'));
