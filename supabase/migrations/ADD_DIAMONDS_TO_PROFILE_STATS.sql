alter table public.profile_stats
  add column if not exists diamonds_count integer not null default 0,
  add column if not exists total_diamonds_earned integer not null default 0,
  add column if not exists diamonds_backfilled_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profile_stats_diamonds_count_nonnegative'
  ) then
    alter table public.profile_stats
      add constraint profile_stats_diamonds_count_nonnegative
      check (diamonds_count >= 0) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profile_stats_total_diamonds_earned_nonnegative'
  ) then
    alter table public.profile_stats
      add constraint profile_stats_total_diamonds_earned_nonnegative
      check (total_diamonds_earned >= 0) not valid;
  end if;
end $$;

alter table public.profile_stats
  validate constraint profile_stats_diamonds_count_nonnegative;

alter table public.profile_stats
  validate constraint profile_stats_total_diamonds_earned_nonnegative;

with earned_diamonds as (
  select
    ps.user_id,
    (
      greatest(coalesce(ps.current_level, 1) - 1, 0) * 50
      + count(ma.id) filter (where ma.action_type = 'chapter_completed') * 25
      + count(ma.id) filter (where ma.action_type = 'book_completed') * 250
      + count(ma.id) filter (where ma.action_type = 'devotional_reflection_saved') * 5
      + count(ma.id) filter (
          where ma.action_type = 'trivia_chapter_completed'
            and ma.action_label ilike '%5/5%'
        ) * 10
      + count(ma.id) filter (
          where ma.action_type = 'scrambled_chapter_completed'
            and ma.action_label ilike '%5/5%'
        ) * 10
    )::int as diamonds
  from public.profile_stats ps
  left join public.master_actions ma
    on ma.user_id = ps.user_id
  group by ps.user_id, ps.current_level
)
update public.profile_stats ps
set
  diamonds_count = greatest(coalesce(ps.diamonds_count, 0), earned_diamonds.diamonds),
  total_diamonds_earned = greatest(coalesce(ps.total_diamonds_earned, 0), earned_diamonds.diamonds),
  diamonds_backfilled_at = coalesce(ps.diamonds_backfilled_at, now())
from earned_diamonds
where ps.user_id = earned_diamonds.user_id
  and ps.diamonds_backfilled_at is null;
