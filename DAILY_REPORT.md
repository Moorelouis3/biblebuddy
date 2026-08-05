# Daily Report - 2026-08-05T16:25:00Z

## Latest Conversations
Since the last report (2026-08-05T08:17:00Z):

1. **Chapter-notes redo pipeline** ran hourly all day: regenerated Numbers 20 through 27 (8 chapters) to the new style spec, each with its own commit and progress-log entry. Redo backlog is now down to just **3 chapters left: Numbers 28, 29, 30** (was 11 this morning).
2. No Louis-authored commits since the last report — every commit in this window is an automated chapter-notes or progress-log commit.
3. **This run found a more serious version of the recurring git-state bug.** The container started on a detached HEAD again (same class of issue flagged repeatedly in `MARCUS_HANDOFF.md` since 08-03). This time, after fetching, it turned out the container's local `main` branch ref was frozen since **2026-08-01** (stuck at the old "Genesis 50" commit) while `origin/main` had moved on through today's Numbers 27 commit with **zero shared commit ancestry** between the two (`git merge-base` returns nothing) — local `main` and `origin/main` are literally unrelated git histories, not just behind. Digging further: local `main` itself already contains a merge of two unrelated root histories from a past incident, and `origin/main`'s own history root is an orphan commit mid-project ("Log final commit/push steps for Numbers 8 run") rather than the repo's real initial commit — meaning a previous run's "recovery" surgery rewrote/truncated history rather than doing a clean fast-forward. **No evidence of actual lost content was found** — spot-checked that key files (`lib/genesisFiftySource.ts`, `app/api/stats/second-brain/route.ts`, `app/api/email-funnel/backfill-30days/route.ts`) are all present and correct in the current `origin/main` tree. Reset this container's local `main` ref to match `origin/main` (a local, non-destructive, non-remote-touching operation) so future runs in this container aren't building on the stale Aug 1 pointer. Not written to `MARCUS_HANDOFF.md` per this routine's instructions to touch no file but this report — flagging here for Louis/Marcus to pick up.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. That entry is now 5+ days old and still sitting in `MARCUS_HANDOFF.md` unchanged — Life Buddy's auto-clear still hasn't picked it up (or has processed it without clearing the file).

## Missed Things
1. **Live security exposure, still open (11th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind. It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. **`MARCUS_HANDOFF.md` is still not clearing.** It holds the same four entries as prior reports (prompt-injection suspicion 07-31, stranded-52-commits 08-03, detached-HEAD-recurred 08-04 ~12:47, detached-HEAD-recurred-again 08-04 ~13:47). None removed since at least the last report.
3. **The underlying git-state bug is now confirmed worse than "detached HEAD" alone** (see Latest Conversations #3): this container's `main` branch had genuinely diverged/unrelated history from `origin/main`, and origin's own history shows signs of having been rewritten/orphaned by a past "recovery" attempt. No data was lost this time (verified by spot-checking files), but the practice of past runs doing ad hoc history surgery instead of clean fast-forwards is itself a risk worth someone reviewing directly, not just patching around each time it resurfaces.
4. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure.

## Unfinished Jobs
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for an 11th report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file isn't clearing despite holding four unresolved entries.
- Someone needs to actually investigate the root cause of the recurring git-state bug (see Missed Things #3) — it's now shown to be deeper than a simple detached HEAD, and past ad hoc recoveries have left the repo's history genuinely tangled even though no content appears lost.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Finish the style-redo backlog: 3 chapters left (Numbers 28, 29, 30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, still no update).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, near the end of the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 113/116 done — Genesis 32-50 complete (19/19), Exodus 1-40 complete (40/40), Leviticus 1-27 complete (27/27), Numbers 1-27 complete (27/30). Only 3 chapters remaining, all in Numbers (28-30); next up is Numbers 28.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).

**Deploy note:** the last `[deploy]`-tagged commit was `8c52605` (2026-08-05 10:17 CEST, this morning's report push). Everything since — Numbers 20 through 27 and their progress-log entries, 20 commits — is already pushed to `origin/main` but has not yet reached a production build. This report's push carries `[deploy]` and will publish that backlog.
