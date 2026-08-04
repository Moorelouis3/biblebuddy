# Daily Report - 2026-08-04T08:18:00Z

## Latest Conversations
Since the last report (2026-08-03T16:16:00Z):

1. **Chapter-notes redo pipeline** ran hourly through the rest of the day and overnight: finished the entire Leviticus redo backlog (Leviticus 14-27, 14 chapters) and started the Numbers redo backlog (Numbers 1-2, 2 chapters). Every run logged `status: pass` in `SESSION_LOG.md` and `data/bible-notes-progress-log.json`. Next up: Numbers 3.
2. **Louis-authored commit (2026-08-04 04:51 CEST):** added a Pinterest domain verification meta tag to `app/layout.tsx`, tagged `[deploy]` and already pushed.
3. **Recurring stale git-ref pattern, checked again this run:** this container's local git state was once more inconsistent at session start — HEAD detached, with the local `main` branch and this container's cached `origin/main` tracking ref both pointing ~50 commits behind the actual detached HEAD. Given the 2026-08-03 incident where this exact pattern once meant 53 real commits were unpushed and at risk (see `MARCUS_HANDOFF.md`), this was treated as a live risk and investigated before writing this report. This time it was benign: `git fetch origin main` showed origin already had every commit (someone/some prior run had already pushed successfully); the local tracking ref was just stale, not the actual remote. Fast-forwarded local `main` to match, confirmed `git push` reports "Everything up-to-date," and verified `npx tsc --noEmit -p .` is clean. No work was at risk this time, but the underlying cause of why this container's local git refs keep going stale between runs (flagged in `MARCUS_HANDOFF.md` on 2026-08-03) is still unexplained and still recurring.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. That entry is now ~4 days old and still sitting in `MARCUS_HANDOFF.md` unchanged — Life Buddy's auto-clear still hasn't picked it up (or has processed it without clearing the file). Worth Louis confirming directly he didn't send that instruction, and worth checking why the handoff file isn't clearing.

## Missed Things
1. **Live security exposure, still open (8th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind (re-verified by reading the file just now). It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. **`MARCUS_HANDOFF.md` is not clearing.** Both entries in the file (prompt-injection suspicion from 2026-07-31, stranded-work incident from 2026-08-03) are still present, unmodified, days after being written. Either Life Buddy isn't picking them up or isn't clearing the file after processing — worth Louis checking on the Life Buddy side.
3. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure.

## Unfinished Jobs
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for an 8th report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file and the 2026-08-03 entry aren't being cleared.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Work through the remaining style-redo backlog (28 chapters left: Numbers 3-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, no update in 4+ days).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 88/116 done — Genesis 32-50 complete (19/19), Exodus 1-40 complete (40/40), Leviticus 1-27 complete (27/27), Numbers 2/30 done (Numbers 1-2; next up Numbers 3). 28 chapters remaining, all in Numbers.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).
