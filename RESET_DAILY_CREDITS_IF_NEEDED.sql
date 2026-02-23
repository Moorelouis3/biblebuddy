-- Atomic credit reset for free users
-- Usage: select reset_daily_credits_if_needed('user-uuid', 'YYYY-MM-DD');
create or replace function reset_daily_credits_if_needed(p_user_id uuid, p_today text)
returns boolean as $$
begin
  update profile_stats
    set daily_credits = 5,
        last_credit_reset = p_today
    where user_id = p_user_id
      and coalesce(is_paid, false) = false
      and (last_credit_reset is null or last_credit_reset < p_today);

  -- Return true if updated, false if not
  if found then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql security definer;
