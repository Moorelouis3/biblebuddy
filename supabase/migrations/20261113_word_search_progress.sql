-- Bible Word Search (2026-11-13).
--
-- One row per person per book. The grid itself is never stored: it is rebuilt
-- from (book, seed) by lib/wordSearchGame.ts, so the row only needs the seed
-- and the words found so far.
--
-- completed_at is the FIRST time the book was finished and is never cleared.
-- "Play again" writes a new seed and empties `found`, and the achievement
-- stays exactly where it was.

create table if not exists public.word_search_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  -- The reader's slug: "genesis", "1-samuel", "song-of-solomon".
  book text not null,
  seed integer not null check (seed >= 1),
  -- Normalised letters of each word found in the current grid.
  found text[] not null default '{}',
  completed_at timestamptz,
  completions integer not null default 0 check (completions >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, book)
);

alter table public.word_search_progress enable row level security;

drop policy if exists "Users can read their own word search progress" on public.word_search_progress;
create policy "Users can read their own word search progress"
  on public.word_search_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can start their own word search progress" on public.word_search_progress;
create policy "Users can start their own word search progress"
  on public.word_search_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own word search progress" on public.word_search_progress;
create policy "Users can update their own word search progress"
  on public.word_search_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

revoke all on public.word_search_progress from anon;
grant select, insert, update on public.word_search_progress to authenticated;

-- Let master_actions accept the one new action, word_search_book_completed.
-- Same approach as 20261112_memory_verses.sql: read the rule as it is in the
-- database now and add one value, rather than copy a list that may be stale.
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

  if definition like '%word_search_book_completed%' then
    raise notice 'word_search_book_completed is already allowed';
    return;
  end if;

  if position('ARRAY[' in definition) = 0 then
    raise exception 'Unexpected action_type check shape: %', definition;
  end if;

  definition := regexp_replace(definition, 'ARRAY\[', 'ARRAY[''word_search_book_completed''::text, ');
  definition := regexp_replace(definition, '\s+NOT VALID\s*$', '');
  execute format('alter table public.master_actions drop constraint %I', constraint_name);
  execute format('alter table public.master_actions add constraint %I %s not valid', constraint_name, definition);
end $$;
