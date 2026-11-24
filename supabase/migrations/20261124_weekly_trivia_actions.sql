-- Weekly Bible Trivia XP (Louis, 2026-11-24: "I would love for people to get
-- XP points, bonus XP points just for playing"). The server logs
-- weekly_trivia_played once a week for each player and weekly_trivia_won for
-- the week's winner, both labelled with the week (lib/clueGame/weekly.ts);
-- lib/pointsEngine.ts scores each once per label (25 and 100 XP, set in
-- lib/levelSystem.ts).
--
-- Same approach as 20261123_match_board_won_action.sql: read the rule as it is
-- in the database now and add the new values, rather than copy a stale list.
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

  if definition like '%weekly_trivia_played%' then
    raise notice 'weekly trivia actions are already allowed';
    return;
  end if;

  if position('ARRAY[' in definition) = 0 then
    raise exception 'Unexpected action_type check shape: %', definition;
  end if;

  definition := regexp_replace(definition, 'ARRAY\[', 'ARRAY[''weekly_trivia_played''::text, ''weekly_trivia_won''::text, ');
  definition := regexp_replace(definition, '\s+NOT VALID\s*$', '');
  execute format('alter table public.master_actions drop constraint %I', constraint_name);
  execute format('alter table public.master_actions add constraint %I %s not valid', constraint_name, definition);
end $$;
