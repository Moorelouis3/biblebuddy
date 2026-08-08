# Daily Report - 2026-08-08T16:13:00Z

## Latest Conversations
Since the last report (2026-08-08T08:12:17Z / 10:12 CEST):

1. **Joshua finished — all 24 chapters now have real per-chapter files.**
   Joshua 21, 22, 23, and 24 were written this window (commits `eaaf36d`,
   `dd1b857`, `4b68194`, `bfe17e5`), each with its own `lib/joshua*Source.ts`
   file and wiring override — confirmed by reading `lib/bibleReaderStudyNotes.ts`
   directly, imports exist for `joshuaOneSource` through `joshuaTwentyFourSource`.
   The `bfe17e5` commit message explicitly marks Joshua complete.
2. **Judges started and is 4/21 chapters in.** Judges 1-4 written this
   window (commits `7b15672`, `cf03a14`, `887be94`, `9de21bd`), same
   per-chapter/override pattern as Joshua — no old-style grouped-file
   shortcuts taken.
3. **A live production bug was fixed and shipped directly by Louis**
   (commit `c8f15e8`, tagged `[deploy]`, already live): an infinite
   "Loading Bible Buddy" screen caused by a stuck Supabase auth Web Lock
   (a discarded browser tab could hold an exclusive lock forever and hang
   `getSession()` in every other tab). Fixed with an 8s timeout around the
   blocking auth calls. This was a real user-facing bug on desktop
   (more tabs = more chance of one dying mid-refresh). Note: this session
   has no corresponding entry in `SESSION_LOG.md` — minor process gap, not
   a content issue.
4. **The Level 2 upgrade agent blocked again — third time now, still
   unresolved.** Same root cause as the two 2026-08-08 blocks already in
   the last report: egress proxy returns 403 on the CONNECT tunnel to
   `life-buddy-production.up.railway.app`. This run (12:25:34Z) escalated
   to `MARCUS_HANDOFF.md` since it was the second same-day recurrence at
   the time.
5. All other activity was the normal hourly chapter-notes routine (8
   chapters, Joshua 21-24 + Judges 1-4, all "pass" status, 5-24 min
   durations, nothing anomalous).

## Unanswered Questions
1. Does Louis want network access to `life-buddy-production.up.railway.app`
   fixed at the environment policy level? Now confirmed blocked on three
   separate dated runs (2026-08-07, and twice on 2026-08-08), same error
   every time, escalated to Marcus but not yet resolved as of this report.
2. The Joshua/Judges grouped-file question from prior reports is now
   effectively moot in practice — Joshua 1-24 and Judges 1-4 all have real
   per-chapter files — but `MARCUS_HANDOFF.md` still carries the older,
   now-inaccurate entry (see Missed Things #2). Worth a decision on
   whether to clear it or leave it as historical record.

## Missed Things
1. **Live security exposure, still open (unfixed across at least four
   consecutive reports):** re-checked `app/api/email-funnel/backfill-30days/route.ts`
   directly this run — still no authorization check of any kind. It's a
   public POST endpoint that pulls up to 5,000 recent signups and emails
   them via the Systeme.io API; anyone who finds the URL can trigger it.
2. `MARCUS_HANDOFF.md`'s Joshua grouped-file entry is now doubly stale —
   it still says Joshua 2-24 "fall back to the old grouped files," but all
   24 Joshua chapters (and now Judges 1-4 too) have real dedicated files
   with overrides. Flagged in the last report as stale; still not
   updated/cleared.
3. Root `bible-notes-progress.json` (repo root) remains stale — still
   frozen at Genesis 50 + Exodus 35, last updated 2026-07-27. The
   canonical, current source is `data/bible-notes-progress-log.json`,
   current through Judges 4. Flagged in at least four consecutive reports
   now with no reconciliation.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned
background task" in the 2026-07-31 (night, part 3) session log entry,
still has no follow-up anywhere (SESSION_LOG.md, git log, or
MARCUS_HANDOFF.md) — now over a week with no result or closure.

## Unfinished Jobs
- Restore an authorization check on
  `app/api/email-funnel/backfill-30days/route.ts` (see Missed Things #1) —
  still unfixed.
- Reconcile or retire the stale root `bible-notes-progress.json` in favor
  of `data/bible-notes-progress-log.json` (see Missed Things #3).
- Clear or update the stale Joshua/Judges grouped-file entry in
  `MARCUS_HANDOFF.md` (see Missed Things #2).
- Follow up on the dropped profile_stats upsert audit (see Dropped
  Activities) — find out if it ever finished or needs re-running.
- Louis to test the install banner on a real iPhone and confirm the
  Android real-device flow (open since 2026-07-31 night sessions, still no
  update since).
- Decide whether/how to fix network access to the Level 2 upgrade queue
  host (see Unanswered Questions #1) — now blocked on three separate
  dated runs with no fix in between.

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, on genuine forward
progress — the style-redo backlog (`data/bible-notes-style-redo-remaining.json`)
is empty, confirmed again this run.

Per `data/bible-notes-progress-log.json` (canonical, current source):
- **Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 36/36,
  Deuteronomy 34/34, Joshua 24/24 — Pentateuch + Joshua fully complete.**
- **Judges 4/21** — next up Judges 5 (per `SESSION_LOG.md`'s last hourly
  run, 2026-08-08T15:54:57Z).
- Total real chapters so far: 215 / 1,189 goal total (~18.1%).

Per root `bible-notes-progress.json` (stale, do not use): still stuck at
Genesis 50/50 + Exodus 35/40, last updated 2026-07-27 (see Missed Things #3).

**Deploy note:** the last `[deploy]`-tagged commit was `c8f15e8` (the
Supabase auth Web Lock fix, 2026-08-08 ~11:38 UTC), which also carried
Joshua 21-23 to production. Everything since — Joshua 24 (Joshua complete)
and Judges 1-4 (5 commits total including log-only commits) — is already
on `origin/main` but has not yet reached a production build. This report's
push carries `[deploy]` and will publish that backlog.
