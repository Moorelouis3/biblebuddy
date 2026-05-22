alter table public.profile_stats
  add column if not exists bible_year_plan_reset_at timestamptz;

create index if not exists profile_stats_bible_year_plan_reset_at_idx
  on public.profile_stats (bible_year_plan_reset_at);

drop policy if exists "Users can delete their own Bible year progress" on public.bible_year_day_progress;
create policy "Users can delete their own Bible year progress"
  on public.bible_year_day_progress
  for delete
  using (auth.uid() = user_id);
