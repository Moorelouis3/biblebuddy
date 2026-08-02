# Daily Report - 2026-08-02T16:12:00Z

## Latest Conversations
Since the last report (2026-08-02T08:12:00Z):

1. **Louis-authored dev session (~12:58-13:33 CEST):** Registered the Day 4 and Day 8 conditional email cron jobs in `vercel.json` — they were already coded but had never actually been scheduled (`ad7e595`). Then simplified Day 4/Day 8 down to a single universal email instead of per-tier A/B variants, because Systeme.io's 10-tag cap can't support the per-tier design (`cb978ad`). Both deployed with `[deploy]`.
2. **Chapter-notes pipeline** ran hourly through the day and pushed further through the style-redo backlog: Exodus 22 through 29 (8 chapters) regenerated to the new spec (`docs/bible-study-note-style.md`), all logged `status: pass` in `SESSION_LOG.md`. Next up is Exodus 30.
3. **Git-state check (done as part of generating this report):** local `origin/main` tracking ref was stale again (same benign pattern as the last two reports — a fresh clone landing on a detached HEAD one commit ahead of the cached remote ref). Re-fetched and confirmed HEAD, `main`, and `origin/main` are all identical at `3007e23` — nothing unpushed, no data at risk.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. The entry is still sitting in `MARCUS_HANDOFF.md` unchanged, now roughly 2 days old — Life Buddy's auto-clear (checks the file every few minutes per this project's CLAUDE.md) still hasn't picked it up, or it has and chose not to clear the file. Worth Louis confirming directly he didn't send that instruction, and worth checking why the file isn't being drained.

## Missed Things
1. **Live security exposure, still open:** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check since it was disabled in commit `7af73a9` (2026-07-31). Verified again just now by reading the current file. It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. This is the fifth consecutive daily report flagging it unfixed.
2. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, predating the redo cycle. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
None found. Every chapter-notes run since the last report shows `status: pass` in `SESSION_LOG.md`, and both Day 4/8 cron commits deployed cleanly.

## Unfinished Jobs
- Restore (or deliberately re-secure another way) the auth check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a fifth report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file still hasn't been cleared.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Work through the remaining style-redo backlog (68 chapters left: Exodus 30-40, all of Leviticus, all of Numbers 1-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, no update since).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 48/116 done — Genesis 32-50 complete (19/19), Exodus 29/40 done (next up Exodus 30), Leviticus 0/27, Numbers 0/30. 68 chapters remaining.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged from the last report since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot).
