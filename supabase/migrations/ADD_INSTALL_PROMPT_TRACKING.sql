alter table public.profile_stats
  add column if not exists install_prompt_state text default 'pending';

alter table public.profile_stats
  add column if not exists install_prompt_last_shown timestamptz;

alter table public.profile_stats
  add constraint profile_stats_install_prompt_state_check
  check (install_prompt_state in ('pending', 'never', 'installed'))
  not valid;

alter table public.profile_stats
  validate constraint profile_stats_install_prompt_state_check;
