-- The /start chooser offers three ways to read: Bible in One Year, a
-- devotional, and Just the Bible. The original constraint only allowed two of
-- them, so picking "Just the Bible" failed with
--   violates check constraint "profile_stats_preferred_study_mode_check"
-- and the chooser silently fell back to leaving the old mode in place. Every
-- plain-Bible reader was therefore stuck in whatever mode they had before.

alter table public.profile_stats
  drop constraint if exists profile_stats_preferred_study_mode_check;

alter table public.profile_stats
  add constraint profile_stats_preferred_study_mode_check
  check (
    preferred_study_mode is null
    or preferred_study_mode in ('bible_year', 'devotional', 'bible')
  );
