alter table public.profile_stats
  add column if not exists preferred_study_mode text default 'bible_year';

alter table public.profile_stats
  add column if not exists account_type text default 'registered';

alter table public.profile_stats
  add column if not exists guest_started_at timestamptz;

alter table public.profile_stats
  add column if not exists registered_at timestamptz;

alter table public.profile_stats
  add column if not exists converted_from_guest_at timestamptz;

alter table public.profile_stats
  add column if not exists onboarding_study_focus text;

alter table public.landing_onboarding_responses
  add column if not exists study_focus text;

alter table public.profile_stats
  add constraint profile_stats_preferred_study_mode_check
  check (preferred_study_mode in ('bible_year', 'devotional'))
  not valid;

alter table public.profile_stats
  validate constraint profile_stats_preferred_study_mode_check;

alter table public.profile_stats
  add constraint profile_stats_account_type_check
  check (account_type in ('guest', 'registered'))
  not valid;

alter table public.profile_stats
  validate constraint profile_stats_account_type_check;
