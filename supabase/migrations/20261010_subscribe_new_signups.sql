-- Every new account joins the mailing list (Louis, 2026-10-10).
--
-- Until now the ONLY thing that ever wrote to email_subscribers was the one-off
-- Systeme import script. Nothing added a person when they signed up, so the
-- list quietly fell behind the app: 852 accounts with a real email address were
-- missing, the oldest from 2025-12-05 and the newest from this morning. Every
-- day the gap grew by a day's signups.
--
-- A trigger rather than app code because there is no single signup path to
-- patch: email, Google, and anything added later all land in auth.users, and
-- only the database sees all of them.
--
-- THE EXCEPTION HANDLER IS NOT OPTIONAL. This runs inside the transaction that
-- creates the user, so an error here would fail the whole signup. A mailing
-- list is never worth losing a signup over: if anything goes wrong - the table
-- missing, a constraint changing, a permissions problem - it swallows the error
-- and lets the account through. A missing subscriber can be backfilled; a
-- refused signup is gone.
--
-- Suppression still wins: lib/email/sesSender.ts checks email_suppressions
-- before every send, so someone who unsubscribed and later made a new account
-- is added here but still never mailed.

create or replace function public.add_signup_to_email_subscribers()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Guests have no address, and the app no longer creates them anyway.
  if new.email is null or btrim(new.email) = '' then
    return new;
  end if;
  if coalesce(new.is_anonymous, false) then
    return new;
  end if;

  insert into public.email_subscribers (email, first_name, locale, source, tags, subscribed_at)
  values (
    lower(btrim(new.email)),
    nullif(btrim(coalesce(
      new.raw_user_meta_data ->> 'first_name',
      split_part(coalesce(new.raw_user_meta_data ->> 'full_name', ''), ' ', 1),
      new.raw_user_meta_data ->> 'name',
      ''
    )), ''),
    'en',
    'app_signup',
    -- Deliberately untagged. 'bb-day1-welcome' is the Systeme automation's tag
    -- and adding it here would enrol people in a sequence we are moving off.
    '{}',
    new.created_at
  )
  on conflict (email) do nothing;

  return new;
exception
  when others then
    raise warning 'add_signup_to_email_subscribers failed for %: %', new.id, sqlerrm;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created_add_subscriber on auth.users;
create trigger on_auth_user_created_add_subscriber
  after insert on auth.users
  for each row
  execute function public.add_signup_to_email_subscribers();
