-- Migration: Create get_active_users_count RPC for analytics
create or replace function public.get_active_users_count(start_ts timestamptz, end_ts timestamptz)
returns bigint
language sql
stable
as $$
  select count(distinct user_id)
  from public.master_actions
  where created_at >= start_ts
    and created_at < end_ts;
$$;
