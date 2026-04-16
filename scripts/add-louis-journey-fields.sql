alter table public.profile_stats
  add column if not exists onboarding_goal text,
  add column if not exists louis_journey_stage text,
  add column if not exists louis_last_check_in_at timestamptz,
  add column if not exists louis_last_recommendation_key text,
  add column if not exists louis_last_recommendation_at timestamptz,
  add column if not exists louis_last_conversation_summary text,
  add column if not exists louis_last_conversation_topic text,
  add column if not exists louis_last_conversation_resolved boolean default true,
  add column if not exists louis_primary_devotional_id uuid,
  add column if not exists louis_primary_devotional_day integer default 0,
  add column if not exists louis_last_feature_nudge text,
  add column if not exists louis_feature_rollout jsonb default '{}'::jsonb;

update public.profile_stats
set louis_last_conversation_resolved = true
where louis_last_conversation_resolved is null;

update public.profile_stats
set louis_primary_devotional_day = 0
where louis_primary_devotional_day is null;

update public.profile_stats
set louis_feature_rollout = '{}'::jsonb
where louis_feature_rollout is null;
