# Daily Report - 2026-08-04T16:19:00Z

## Latest Conversations
Since the last report (2026-08-04T08:18:00Z):

1. **Chapter-notes redo pipeline** ran hourly through the day: regenerated Numbers 3-10 (8 chapters) to the new style spec, each with its own "commit/push steps" log entry in `SESSION_LOG.md` and `data/bible-notes-progress-log.json`. Redo backlog is now 96/116 done — only Numbers 11-30 (20 chapters) remain, tracked in `data/bible-notes-style-redo-remaining.json`.
2. **Louis-authored commits (2026-08-04 ~15:27-15:49 CEST):** added service-to-service bearer-token auth (reusing the existing `SECOND_BRAIN_STATS_SECRET`) to `/api/admin/analytics-drilldown` and `/api/admin/stripe-revenue`, and extended `/api/stats/second-brain` with app-wide usage aggregates (chapters/notes/devotionals completed, active users, streaks) — so Life Buddy's Marcus can pull real Bible Buddy stats. Tagged `[deploy]` and already pushed/live.
3. **One of the automated runs (2026-08-04 ~13:47 UTC) added a `MARCUS_HANDOFF.md` entry** flagging that this container's git HEAD was again detached with unpushed commits ahead of origin (the same class of bug as the 2026-08-03 incident) — the third occurrence in two days.
4. **This run found a more serious version of that same problem** while preparing this report: this container's local `main` branch and `origin/main` had no common ancestor at all — two completely unrelated commit histories (local `main`'s tip, `a18839f`, dates back to around the Genesis 47-50 regen; `origin/main`, the real deployed history, is 50 commits further with unrelated hashes going back to Leviticus 6). File *content* at both tips matched wherever compared, so nothing appears lost — this looks like an old, stale local branch pointer left over from container reuse, not new data loss. Handled by backing up the stale ref (`main-local-backup-20260804`, kept, not deleted) and rebuilding local `main` from `origin/main` before writing this report. Not written to `MARCUS_HANDOFF.md` per this routine's own instructions to touch no file but this report — flagging here so Louis sees it either way.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. That entry is now 4+ days old and still sitting in `MARCUS_HANDOFF.md` unchanged — Life Buddy's auto-clear still hasn't picked it up (or has processed it without clearing the file). Worth Louis confirming directly he didn't send that instruction, and worth checking why the handoff file isn't clearing.

## Missed Things
1. **Live security exposure, still open (9th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind (re-verified by reading the file just now). It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it. Notable given today's commits added real auth to three *other* admin/stats routes — this one keeps getting skipped.
2. **`MARCUS_HANDOFF.md` is not clearing and is growing.** It now holds four entries (prompt-injection suspicion 07-31, stranded-52-commits 08-03, detached-HEAD-recurred 08-04 ~12:47, detached-HEAD-recurred-again 08-04 ~13:47), none removed. Either Life Buddy isn't picking them up or isn't clearing the file after processing.
3. **The detached-HEAD / unpushed-commits bug (see Latest Conversations #3-4) is not just recurring, it appears to be escalating** — from "stale ref, no risk" to "53 commits ahead" to today's "two completely unrelated histories." Nobody has yet identified why this container's git state doesn't start clean each run despite task instructions asserting a fresh clone every time.
4. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure.

## Unfinished Jobs
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a 9th report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file isn't clearing despite now holding four unresolved entries.
- Someone needs to actually investigate the root cause of the recurring/escalating git-state bug (see Missed Things #3) rather than each run just patching around it.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Finish the style-redo backlog: 20 chapters left, all in Numbers (11-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, still no update).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 96/116 done — Genesis 32-50 complete (19/19), Exodus 1-40 complete (40/40), Leviticus 1-27 complete (27/27), Numbers 1-10 complete (10/30). 20 chapters remaining, all in Numbers (11-30); next up is Numbers 11.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).
