alter table public.profile_stats
  add column if not exists selected_buddy_avatar text default 'louis';

alter table public.profile_stats
  drop constraint if exists profile_stats_selected_buddy_avatar_check;

update public.profile_stats
set selected_buddy_avatar = 'louis'
where selected_buddy_avatar is null
   or selected_buddy_avatar not in ('louis', 'walter', 'lindsey', 'steve');

alter table public.profile_stats
  add constraint profile_stats_selected_buddy_avatar_check
  check (selected_buddy_avatar in ('louis', 'walter', 'lindsey', 'steve'));
