alter table public.profile_stats
  add column if not exists grace_days_count integer not null default 0,
  add column if not exists last_grace_day_earned_at date,
  add column if not exists grace_days_used_count integer not null default 0;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profile_stats_grace_days_count_range'
  ) then
    alter table public.profile_stats
      add constraint profile_stats_grace_days_count_range
      check (grace_days_count >= 0 and grace_days_count <= 5)
      not valid;
  end if;
end $$;

alter table public.profile_stats
  validate constraint profile_stats_grace_days_count_range;
