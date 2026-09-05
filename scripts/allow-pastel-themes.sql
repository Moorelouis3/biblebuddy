-- Pastel themes (2026-09-05): profile_stats.app_theme has a CHECK
-- constraint listing the allowed theme ids, so the six new pastel ids are
-- rejected until it is updated. Paste into the Supabase SQL editor and run.

alter table public.profile_stats
  drop constraint if exists profile_stats_app_theme_check;

alter table public.profile_stats
  add constraint profile_stats_app_theme_check check (
    app_theme in (
      'light', 'dark', 'blue', 'gold', 'purple', 'red', 'green', 'pink',
      'orange', 'gray', 'black',
      'pastel-rose', 'pastel-lavender', 'pastel-mint',
      'pastel-sky', 'pastel-peach', 'pastel-butter'
    )
  );
