-- Indexes for the newsletter's personalised progress block (Louis, 2026-10-12).
--
-- The block asks two windowed questions per batch of recipients:
--
--   completed_chapters   rows for these users between two timestamps
--   devotional_progress  completed rows for these users
--
-- WHAT WAS CHECKED FIRST. The repo's SQL history has no CREATE INDEX for
-- either table - completed_chapters was created outside the tracked migrations
-- (there is no CREATE TABLE for it here either), so the only indexes it is
-- certain to have are the ones behind its primary key and the
-- (user_id, book, chapter) uniqueness that markChapterDone upserts against.
-- The live index list could not be enumerated from here: PostgREST does not
-- expose pg_indexes and there is no exec_sql function, so this cannot be
-- confirmed without the SQL editor. Every statement below is therefore
-- IF NOT EXISTS and is safe to run whether or not the index already exists.
--
-- Run the verification query at the bottom first if you want to see what is
-- already there.
--
-- IS THIS URGENT? No. Measured against production as it stands - 10,535 rows
-- in completed_chapters, 1,750 in devotional_progress - a full 1,000-recipient
-- batch takes about 1.8 seconds, and the default batch is 250. These exist so
-- that stays true as the tables grow, not to fix a problem today.

-- The window scan. (user_id, completed_at) rather than (completed_at) alone
-- because every query is already narrowed to a chunk of 250 user ids, so the
-- user column leads.
create index if not exists completed_chapters_user_completed_idx
  on public.completed_chapters (user_id, completed_at desc);

-- Study position. Partial on is_completed: the block only ever asks for
-- completed days, and roughly a third of the table is not completed, so the
-- partial index is both smaller and the one the planner wants.
create index if not exists devotional_progress_user_completed_idx
  on public.devotional_progress (user_id, completed_at desc)
  where is_completed = true;

-- bible_year_day_progress is read by user_id only, which its own
-- (user_id, day_number) uniqueness already covers. No index added.

-- Verification: what these two tables actually carry now.
select tablename, indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('completed_chapters', 'devotional_progress', 'bible_year_day_progress')
order by tablename, indexname;
