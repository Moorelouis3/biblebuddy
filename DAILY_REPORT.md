# Daily Report - 2026-08-07T16:19:01Z

## Latest Conversations
Since the last report (2026-08-07T08:18:57Z / 10:18 CEST):

1. **Deuteronomy finished.** Chapters 32, 33, and 34 were written this window — Deuteronomy 32 (Song of Moses, 13 sections, 115 cards, the largest chapter logged so far) and 33-34 closing out the book with Moses' blessing and death on Nebo. The full Pentateuch (Genesis-Deuteronomy) is now redone to the new style spec.
2. **Moved into Joshua.** Chapters 1-4 written (22, 34, 30, and 47 cards respectively). Joshua 1 required a one-off judgment call: past Deuteronomy, several books (Joshua, and apparently Judges) already have old-style grouped multi-chapter note files wired in instead of the single-chapter files this pipeline normally builds, so the routine's "does a file already exist" fallback rule breaks down. The run resolved it enough to keep moving (wrote a real Joshua 1 file, added an override wiring call) but flagged the larger question — whether Joshua 2-24 and other affected books should go into the style-redo backlog — as still open (see Unanswered Questions).
3. **The deploy-cadence rule was rewritten and appears to have fixed the stop-hook conflict** flagged in the last several reports. `CLAUDE.md` now gates Vercel builds on the `[deploy]` tag rather than push frequency, explicitly acknowledging per-chapter pushes are unavoidable under the stop hook. No forced-push-vs-cadence conflict is logged in any commit this window — first clean window in a while.
4. **`MARCUS_HANDOFF.md` cleared.** The seven entries carried for multiple reports (07-31 prompt-injection suspicion, 08-03 stranded-commits incident, detached-HEAD recurrences, push-cadence non-compliance) are gone — Life Buddy picked them up as designed. One new entry has since been added (the Joshua grouped-files question from item 2).
5. **A Level 2 upgrade agent run was blocked** (2026-08-07T12:31 UTC): it reported `docs/LEVEL2_UPGRADE_AGENT.md` missing, even though that file was actually added ~70 minutes earlier by Louis directly (commit `713a48b7`, 11:19 CEST) — looks like a stale checkout in that run's container, not a real missing file. Separately, that run also hit a real block: network egress to `life-buddy-production.up.railway.app` (the Level 2 queue) is denied by policy from this environment, so the queue couldn't be checked either way.
6. This report's own run started in a detached-HEAD state again, but it was a harmless shallow-clone artifact (local `origin/main` ref was stale) — an unshallow fetch confirmed HEAD and the true `origin/main` were identical (`c5131b1c`). Fixed with `git checkout -B main origin/main` before writing this file; no work was at risk.

## Unanswered Questions
1. **Joshua 2-24 / Judges old-style grouped-file question, still open** (raised this window, see Latest Conversations #2): should these be added to the style-redo backlog for full one-file-per-chapter regeneration, or handled differently? Until decided, the hourly routine will keep needing a one-off judgment call each time it hits a chapter in one of these old grouped files.
2. Whether Louis wants the Level 2 upgrade agent's network access to `life-buddy-production.up.railway.app` fixed at the policy level, given it's now confirmed blocked (see Latest Conversations #5) rather than just a missing-doc issue.

## Missed Things
1. **Live security exposure, still open (unfixed for many consecutive reports):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind — confirmed again this run by reading the file directly. It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. Root `bible-notes-progress.json` (repo root, 85 entries, frozen at Genesis 50 + Exodus 35 since 2026-07-27) remains stale and unreconciled. The canonical, current source is `data/bible-notes-progress-log.json` (263 entries, current through Joshua 4) — this has been flagged in prior reports too.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since — now a week with no result, no follow-up, no closure.

## Unfinished Jobs
- Decide the Joshua/Judges grouped-file redo question (see Unanswered Questions #1) so the hourly routine stops needing manual judgment calls.
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` (see Missed Things #1) — still unfixed.
- Reconcile or retire the stale root `bible-notes-progress.json` in favor of `data/bible-notes-progress-log.json`.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, still no update since).
- Decide whether to fix network access to the Level 2 upgrade queue host from this environment (see Unanswered Questions #2).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, on genuine forward progress — the style-redo backlog (`data/bible-notes-style-redo-remaining.json`) is empty, confirmed again this run.

Per `data/bible-notes-progress-log.json` (canonical, current source — 263 logged entries):
- **Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 36/36, Deuteronomy 34/34 — full Pentateuch complete.**
- **Joshua 4/24** — next up Joshua 5.
- Total chapters with real notes so far: 191 / 1,189 (~16.1%).

Per root `bible-notes-progress.json` (stale, do not use): still stuck at Genesis 50/50 + Exodus 35/40, last updated 2026-07-27 (see Missed Things #2).

**Deploy note:** the last `[deploy]`-tagged commit was `e38898d` (2026-08-07 10:18 CEST, this morning's report push). Everything since — Deuteronomy 32-34 and Joshua 1-4 (18 commits) — is already on `origin/main` but has not yet reached a production build. This report's push carries `[deploy]` and will publish that backlog.
