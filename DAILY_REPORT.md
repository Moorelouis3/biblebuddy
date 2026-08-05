# Daily Report - 2026-08-05T08:17:00Z

## Latest Conversations
Since the last report (2026-08-04T16:19:00Z):

1. **Chapter-notes redo pipeline** ran hourly overnight: regenerated Numbers 17, 18, and 19 (3 chapters) to the new style spec, each with its own "commit/push steps" log entry in `SESSION_LOG.md` and `data/bible-notes-progress-log.json`. Redo backlog is now 105/116 done — only Numbers 20-30 (11 chapters) remain, tracked in `data/bible-notes-style-redo-remaining.json`.
2. No Louis-authored commits since the last report — every commit in this window is an automated chapter-notes or progress-log commit.
3. **This run found the container's git HEAD detached again at session start** — the same class of bug flagged four times already in `MARCUS_HANDOFF.md` (07-31 injection note aside; the git-state bug itself is 08-03, 08-04 x2). This time HEAD was detached but, after fetching origin, turned out to point at the exact same commit as `origin/main` — no commits ahead, nothing at risk of loss. Checked out `main`, confirmed it matched `origin/main` exactly, moved on. Not written to `MARCUS_HANDOFF.md` per this routine's own instructions to touch no file but this report — flagging here so Louis sees it. This is now the fourth or fifth time in a row this container has not started on a normal attached `main` branch.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. That entry is now 5 days old and still sitting in `MARCUS_HANDOFF.md` unchanged — Life Buddy's auto-clear still hasn't picked it up (or has processed it without clearing the file).

## Missed Things
1. **Live security exposure, still open (10th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind (re-verified by reading the file just now). It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. **`MARCUS_HANDOFF.md` is still not clearing.** It holds the same four entries as the last report (prompt-injection suspicion 07-31, stranded-52-commits 08-03, detached-HEAD-recurred 08-04 ~12:47, detached-HEAD-recurred-again 08-04 ~13:47). None removed since at least the last report.
3. **The detached-HEAD bug (see Latest Conversations #3) recurred again this run** — no data lost this time, but the underlying cause (this container not starting from a clean, correctly-attached clone as task instructions claim) is still unidentified and unfixed.
4. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure.

## Unfinished Jobs
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a 10th report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file isn't clearing despite holding four unresolved entries.
- Someone needs to actually investigate the root cause of the recurring git-state bug (see Missed Things #3) rather than each run just patching around it.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Finish the style-redo backlog: 11 chapters left, all in Numbers (20-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, still no update).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 105/116 done — Genesis 32-50 complete (19/19), Exodus 1-40 complete (40/40), Leviticus 1-27 complete (27/27), Numbers 1-19 complete (19/30). 11 chapters remaining, all in Numbers (20-30); next up is Numbers 20.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).

**Deploy note:** the last `[deploy]`-tagged commit was `8add96f` (2026-08-04 16:19:58 UTC). Everything since — Numbers 17, 18, 19 and their progress-log entries, roughly 9 commits — is already pushed to `origin/main` but has not yet reached a production build. This report's push carries `[deploy]` and will publish that backlog.
