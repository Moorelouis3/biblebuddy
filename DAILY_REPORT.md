# Daily Report - 2026-08-07T08:18:57Z

## Latest Conversations
Since the last report (2026-08-06T16:30:00Z / 18:30 CEST):

1. **Forward progress continued straight through the rest of Deuteronomy's midsection.** Chapters 16 through 31 (16 chapters) were written this window, one per hour, each passing the style checker, parser check, and `tsc --noEmit` before being committed. Next up is Deuteronomy 32. Deuteronomy 28 was the longest chapter logged so far under this style spec (68 verses, 84 cards, 28-minute run).
2. **The stop-hook-vs-push-cadence conflict (flagged in the last report) kept recurring exactly as described**, chapter after chapter: each run tried to hold its commit for the twice-daily batch per CLAUDE.md, and each time the session's stop hook forced an immediate push anyway (none carried `[deploy]`, so no extra Vercel builds fired). This is now a well-established pattern, not a one-off — every chapter in this window shows the same hold-then-forced-push sequence in its progress-log entry.
3. **Detached-HEAD-at-container-start recurred multiple more times** (Deuteronomy 28, 29, 31 all mention it) but was benign every time — the detached tip was always an exact fast-forward of origin/main, no work at risk. Each run fixed it with `git checkout -B main origin/main` (or equivalent) before starting.
4. All 35 commits since the last report are automated (chapter-notes or progress-log commits) — no Louis-authored commits in this window.
5. This report's own run found the container in the same benign detached-HEAD state on start; fixed it the same way (`git checkout -B main origin/main`) before writing this file. No work was at risk — HEAD matched origin/main exactly.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`, still unresolved: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. That entry is now 7 days old and still sitting in `MARCUS_HANDOFF.md` unchanged.

## Missed Things
1. **Live security exposure, still open (14th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind — confirmed again this run by reading the file directly. It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. **`MARCUS_HANDOFF.md` is still not clearing.** It still holds the same seven entries as the last report (07-31 prompt-injection suspicion, 08-03 stranded-52-commits incident, two 08-04 detached-HEAD recurrences, 08-06 detached-HEAD recurrence, push-cadence non-compliance, and its stop-hook correction). Nothing has been removed.
3. **The stop-hook vs. push-cadence conflict is now confirmed as an ongoing, not one-time, pattern** — it recurred on essentially every chapter in this window (16, 18, 20, 21, 23, 24, 25, 29, 30, 31 all explicitly log the forced push). Still unresolved; still needs Louis to pick a fix (exempt the batch from the hook, or drop the batching policy).
4. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current source is `data/bible-notes-progress-log.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, still has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure.

## Unfinished Jobs
- Louis to decide how to resolve the stop-hook vs. push-cadence-policy conflict (see Latest Conversations #2 / Missed Things #3): either exempt this project's batched pushes from the hook, or drop the twice-daily batching policy as unworkable under it.
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a 14th report cycle. See Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`, and check why that file isn't clearing despite holding seven unresolved entries.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, still no update).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, on genuine forward progress into Deuteronomy (style-redo backlog has been empty since 2026-08-06 morning, confirmed empty again this run via `data/bible-notes-style-redo-remaining.json`).

Per `data/bible-notes-progress-log.json` (canonical, current source):
- Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 36/36, Deuteronomy 31/34 — next up Deuteronomy 32.
- Total chapters with notes: 184 / 1,189 (~15.5%).

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).

**Deploy note:** the last `[deploy]`-tagged commit was `925fc4c` (2026-08-06 18:30 CEST, last night's report push). Everything since — Deuteronomy 16 through 31 and their progress-log entries (35 commits) — is already on `origin/main` but has not yet reached a production build. This report's push carries `[deploy]` and will publish that backlog.
