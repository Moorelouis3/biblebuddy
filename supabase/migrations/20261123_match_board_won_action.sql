-- Bible Buddy Match: XP for winning a board (Louis, 2026-11-23: "give the user
-- XP points for winning a board"). The game logs one master_actions row,
-- action_type match_board_won, labelled with the board id, the first time a
-- board is won; lib/pointsEngine.ts scores it once per board (10 XP, set in
-- lib/levelSystem.ts).
--
-- Let master_actions accept the one new action. Same approach as
-- 20261113_word_search_progress.sql: read the rule as it is in the database now
-- and add one value, rather than copy a list that may be stale.
do $$
declare
  constraint_name text;
  definition text;
begin
  select conname, pg_get_constraintdef(oid)
    into constraint_name, definition
  from pg_constraint
  where conrelid = 'public.master_actions'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%action_type%'
  limit 1;

  if constraint_name is null then
    raise notice 'master_actions has no action_type check; nothing to change';
    return;
  end if;

  if definition like '%match_board_won%' then
    raise notice 'match_board_won is already allowed';
    return;
  end if;

  if position('ARRAY[' in definition) = 0 then
    raise exception 'Unexpected action_type check shape: %', definition;
  end if;

  definition := regexp_replace(definition, 'ARRAY\[', 'ARRAY[''match_board_won''::text, ');
  definition := regexp_replace(definition, '\s+NOT VALID\s*$', '');
  execute format('alter table public.master_actions drop constraint %I', constraint_name);
  execute format('alter table public.master_actions add constraint %I %s not valid', constraint_name, definition);
end $$;
