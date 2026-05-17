alter table public.profile_stats
drop constraint if exists profile_stats_app_theme_check;

alter table public.profile_stats
add constraint profile_stats_app_theme_check
check (app_theme in ('light', 'dark', 'blue', 'gold', 'purple', 'red', 'green', 'pink', 'orange', 'gray', 'black'));
