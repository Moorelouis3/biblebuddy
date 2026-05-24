alter table public.profile_stats
add column if not exists app_theme_selected_at timestamptz;

update public.profile_stats
set app_theme_selected_at = coalesce(updated_at, now())
where app_theme is not null
  and app_theme_selected_at is null;
