-- FIX: social notifications pointed at '/bb-feed', which does not exist (404).
-- The feed lives at '/dashboard?view=group'. (2026-09-21)
--
-- Rewrites the LIVE trigger functions in place (only the URL literal changes,
-- whatever else is in them is kept) and fixes existing notification rows.
-- Safe to run more than once.

begin;

do $$
declare
  fn record;
begin
  for fn in
    select p.oid, pg_get_functiondef(p.oid) as def
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosrc like '%''/bb-feed''%'
  loop
    execute replace(fn.def, '''/bb-feed''', '''/dashboard?view=group''');
  end loop;
end $$;

update public.notifications
   set article_slug = '/dashboard?view=group'
 where article_slug = '/bb-feed'
    or article_slug like '/bb-feed/%'
    or article_slug like '/bb-feed?%'
    or article_slug like '/bb-feed#%';

commit;
