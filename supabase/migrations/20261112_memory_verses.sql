-- Bible Memory (2026-11-12).
--
-- One row per person per verse. The row is both the saved verse and its
-- practice progress: they are one-to-one, so a second table would only add a
-- join. verse_text is the wording at the moment it was saved, so the games
-- never depend on a live Bible source and the words never shift under someone
-- who is half way through learning them.

create table if not exists public.memory_verses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  book text not null,
  chapter integer not null check (chapter >= 1),
  verse integer not null check (verse >= 1),
  -- Only set for a Daily Verse that spans more than one verse.
  verse_end integer check (verse_end is null or verse_end > verse),
  translation text not null default 'KJV',
  verse_text text not null check (length(btrim(verse_text)) > 0),
  -- 0 to 3. Up one after a clean session, down one after a mistake.
  level integer not null default 0 check (level between 0 and 3),
  correct_count integer not null default 0 check (correct_count >= 0),
  mistake_count integer not null default 0 check (mistake_count >= 0),
  last_practised_at timestamptz,
  created_at timestamptz not null default now()
);

-- The same verse in the same translation can only be saved once.
create unique index if not exists memory_verses_one_per_verse
  on public.memory_verses (user_id, book, chapter, verse, coalesce(verse_end, 0), translation);

create index if not exists memory_verses_user_created
  on public.memory_verses (user_id, created_at desc);

alter table public.memory_verses enable row level security;

drop policy if exists "Users can read their own memory verses" on public.memory_verses;
create policy "Users can read their own memory verses"
  on public.memory_verses for select
  using (auth.uid() = user_id);

drop policy if exists "Users can save their own memory verses" on public.memory_verses;
create policy "Users can save their own memory verses"
  on public.memory_verses for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory verses" on public.memory_verses;
create policy "Users can update their own memory verses"
  on public.memory_verses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own memory verses" on public.memory_verses;
create policy "Users can remove their own memory verses"
  on public.memory_verses for delete
  using (auth.uid() = user_id);

revoke all on public.memory_verses from anon;
grant select, insert, update, delete on public.memory_verses to authenticated;

-- Let master_actions accept the one new action, bible_memory_session_completed.
--
-- The allowed list lives in a CHECK constraint that has been rewritten by a
-- dozen migrations, so copying it out of the newest file risks dropping a type
-- that was added by hand since. This reads the constraint as it is in the
-- database right now and adds one value to it. Running it twice does nothing.
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

  if definition like '%bible_memory_session_completed%' then
    raise notice 'bible_memory_session_completed is already allowed';
    return;
  end if;

  if position('ARRAY[' in definition) = 0 then
    raise exception 'Unexpected action_type check shape: %', definition;
  end if;

  definition := regexp_replace(definition, 'ARRAY\[', 'ARRAY[''bible_memory_session_completed''::text, ');

  -- NOT VALID: the rule applies to every new row at once, without re-reading
  -- the whole table under a lock. The existing rows already passed the old
  -- rule, and the new rule only allows more.
  definition := regexp_replace(definition, '\s+NOT VALID\s*$', '');
  execute format('alter table public.master_actions drop constraint %I', constraint_name);
  execute format('alter table public.master_actions add constraint %I %s not valid', constraint_name, definition);
end $$;
