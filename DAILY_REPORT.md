# Daily Report - 2026-08-02T08:12:00Z

## Latest Conversations
Since the last report (2026-08-01T16:12:59Z / 18:12 CEST):

1. **Chapter-notes pipeline** ran hourly through the night and worked straight through the style-redo backlog, regenerating Exodus 6 through 21 (16 chapters) to the new spec (`docs/bible-study-note-style.md`). All logged `status: pass` in `SESSION_LOG.md`. Next up per `data/bible-notes-style-redo-remaining.json` is Exodus 22.
2. No other development work landed since the last report — no Louis-authored commits in this window, only the automated hourly pipeline (25 commits total: 16 chapter regenerations + 7 progress-log follow-up commits + the last daily report commit).
3. **Git-state check (done as part of generating this report):** local `main` was 30 commits behind `HEAD`/`origin/main` again (same stale-local-ref pattern as yesterday's report — nothing unpushed, just needed a fast-forward). Fast-forwarded cleanly, no data lost.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. `MARCUS_HANDOFF.md` still has not been cleared — now roughly 43+ hours later, meaning Life Buddy has still not turned it into a tracked Problem (or the auto-clear step isn't working). Worth Louis confirming directly that he didn't send that instruction, and worth checking why Life Buddy hasn't picked this file up yet.

## Missed Things
1. **Live security exposure, still open:** `app/api/email-funnel/backfill-30days/route.ts` has had no authorization check since commit `7af73a9` (2026-07-31 16:55 CEST, "Temporarily disable auth on backfill endpoint"). Verified again just now by reading the current file — still no auth check. It's a public POST endpoint that pulls up to 5,000 recent signups and sends them email via the Systeme.io API. This is the fourth consecutive daily report flagging it unfixed.
2. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, predating the redo cycle entirely. The canonical, current source is `data/bible-notes-progress-log.json`.
3. `MARCUS_HANDOFF.md` still not cleared — see Unanswered Questions.

## Dropped Activities
None found. Every chapter-notes run since the last report shows `status: pass` in `SESSION_LOG.md`.

## Unfinished Jobs
- Restore (or deliberately re-secure another way) the auth check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a fourth report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction, given it's still unresolved in `MARCUS_HANDOFF.md`.
- Reconcile root `bible-notes-progress.json` with the real shipped state in `data/bible-notes-progress-log.json`.
- Work through the remaining style-redo backlog (76 chapters left: Exodus 22-40, all of Leviticus, all of Numbers 1-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since the 2026-07-31 night sessions, no update since).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 40/116 done — Genesis 32-50 complete (19/19), Exodus 21/40 done (next up Exodus 22), Leviticus 0/27, Numbers 0/30. 76 chapters remaining.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged from the last report since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot).
