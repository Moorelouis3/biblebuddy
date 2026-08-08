# Daily Report - 2026-08-08T08:12:17Z

## Latest Conversations
Since the last report (2026-08-07T16:19:01Z / 18:19 CEST):

1. **Joshua chapters 5-20 written** (16 chapters), all via the hourly Bible
   Note Writer Agent routine, each with a real single-chapter `lib/joshua*Source.ts`
   file and its own wiring override — no old-style grouped-file shortcuts taken.
   Card counts ranged from 18 (Joshua 16) to 54 (Joshua 10); durations were
   normal (5-14 min) except Joshua 20, which took 53 minutes for a 21-card
   chapter — much slower than its neighbors, cause not logged.
2. **A second Level 2 upgrade agent run was blocked again** (2026-08-08,
   dated entry in SESSION_LOG.md): same failure as 2026-08-07 — network
   egress to `life-buddy-production.up.railway.app` is denied by this
   environment's policy, so the Level 2 queue could not be checked. No
   files touched, no commit/push, no completion POST sent. This is the
   second consecutive blocked run on the same root cause.
3. **The Joshua/Judges grouped-file question is partly resolved by action,
   but the tracking doc wasn't updated.** `MARCUS_HANDOFF.md` still carries
   the 2026-08-07 entry asking whether Joshua 2-24 (and Judges) should go
   into the style-redo backlog. In practice, Joshua 1-20 have since all
   been given real per-chapter files with overrides in
   `lib/bibleReaderStudyNotes.ts` (confirmed by reading the wiring code
   directly) — only Joshua 21-24 and Judges still fall back to the old
   grouped multi-chapter files. The handoff entry is now stale/inaccurate
   as written and should be updated or cleared.
4. No entries were added to `SESSION_LOG.md` under a "night" or "morning"
   heading in this window — all activity was hourly chapter-notes runs
   plus the one blocked Level 2 attempt.

## Unanswered Questions
1. Should Joshua 21-24 and Judges (still on old-style grouped note files)
   be added to the style-redo backlog, now that Joshua 1-20 have already
   been done as real per-chapter files? (Carried over from 2026-08-07,
   still open — see Latest Conversations #3.)
2. Does Louis want network access to `life-buddy-production.up.railway.app`
   fixed at the environment policy level? Confirmed blocked on two separate
   dated runs now (2026-08-07 and 2026-08-08), same error both times.

## Missed Things
1. **Live security exposure, still open (unfixed across multiple
   consecutive reports):** re-read `app/api/email-funnel/backfill-30days/route.ts`
   directly this run — it still has no authorization check of any kind.
   It's a public POST endpoint that pulls up to 5,000 recent signups and
   emails them via the Systeme.io API; anyone who finds the URL can trigger it.
2. Root `bible-notes-progress.json` (repo root) remains stale — still
   frozen at Genesis 50 + Exodus 35, last updated 2026-07-27. The canonical,
   current source is `data/bible-notes-progress-log.json`, which is current
   through Joshua 20. This has now been flagged in three consecutive reports.
3. `MARCUS_HANDOFF.md` entry on the Joshua grouped-file question is stale
   (see Latest Conversations #3) — it doesn't reflect that Joshua 1-20 are
   already resolved.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned
background task" in the 2026-07-31 (night, part 3) session log entry, still
has no follow-up in any session log entry or handoff since — over a week
now with no result, no closure.

## Unfinished Jobs
- Decide the Joshua 21-24 / Judges grouped-file redo question (see
  Unanswered Questions #1).
- Restore an authorization check on
  `app/api/email-funnel/backfill-30days/route.ts` (see Missed Things #1) —
  still unfixed.
- Reconcile or retire the stale root `bible-notes-progress.json` in favor
  of `data/bible-notes-progress-log.json` (see Missed Things #2).
- Clear or update the stale Joshua grouped-file entry in
  `MARCUS_HANDOFF.md` (see Missed Things #3).
- Follow up on the dropped profile_stats upsert audit (see Dropped
  Activities) — find out if it ever finished or needs re-running.
- Louis to test the install banner on a real iPhone and confirm the
  Android real-device flow (open since 2026-07-31 night sessions, still no
  update since).
- Decide whether to fix network access to the Level 2 upgrade queue host
  (see Unanswered Questions #2) — now blocked on two separate dated runs.

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, on genuine forward
progress — the style-redo backlog (`data/bible-notes-style-redo-remaining.json`)
is empty, confirmed again this run.

Per `data/bible-notes-progress-log.json` (canonical, current source):
- **Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 36/36,
  Deuteronomy 34/34 — full Pentateuch complete.**
- **Joshua 20/24** — next up Joshua 21 (per `SESSION_LOG.md`'s last hourly
  run, 2026-08-08T07:54:22Z).
- Total chapters with real notes so far: 207 / 1,189 goal total (~17.4%).

Per root `bible-notes-progress.json` (stale, do not use): still stuck at
Genesis 50/50 + Exodus 35/40, last updated 2026-07-27 (see Missed Things #2).

**Deploy note:** the last `[deploy]`-tagged commit was `55caece` (2026-08-07
16:19 UTC, that day's night-report push). Everything since — Joshua 5-20
(16 chapters, 18 commits total including two log-only commits) — is already
on `origin/main` but has not yet reached a production build. This report's
push carries `[deploy]` and will publish that backlog.
