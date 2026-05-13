alter table public.profile_stats
  add column if not exists selected_buddy_avatar text default 'louis';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profile_stats_selected_buddy_avatar_check'
  ) then
    alter table public.profile_stats
      add constraint profile_stats_selected_buddy_avatar_check
      check (selected_buddy_avatar in ('louis', 'eli', 'abigail', 'ezra', 'miriam', 'josiah'))
      not valid;
  end if;
end $$;

alter table public.profile_stats
  validate constraint profile_stats_selected_buddy_avatar_check;

update public.profile_stats
set selected_buddy_avatar = 'louis'
where selected_buddy_avatar is null;
