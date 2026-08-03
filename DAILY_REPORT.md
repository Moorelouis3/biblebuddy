# Daily Report - 2026-08-03T16:16:00Z

## Latest Conversations
Since the last report (2026-08-03T08:17:00Z):

1. **Chapter-notes redo pipeline** ran hourly through the day: finished Leviticus 6 through 13 (8 chapters) regenerated to the new style spec. Every run logged `status: pass` in `SESSION_LOG.md` and `data/bible-notes-progress-log.json`. Next up: Leviticus 14.
2. **Stranded-work recovery (2026-08-03T10:51 UTC):** this container started with git HEAD detached 53 commits ahead of both local and origin `main`, holding finished-but-never-pushed work (Exodus 1-40 and Leviticus 1-7 style redos, plus unrelated email-funnel/cron commits). Recovered by branching off the detached commit, merging into `main`, verifying `tsc` clean, and pushing as `abb2049`. Flagged to Marcus (see `MARCUS_HANDOFF.md`).
3. **Recurring git-state issue, same day:** at least two more hourly runs (Leviticus 11 and Leviticus 12) independently hit a stale/detached local `main` ref pointing dozens of commits behind `origin/main`, and had to self-recover before writing their chapter. No data was lost either time (origin/main already had everything), but this is now a repeating pattern within a single day, not a one-off.
4. **Louis-authored growth/marketing commit (18:04 CEST):** added tracked UTM links to email-funnel CTAs, fixed a stale $29 lifetime price to the correct $50 on the Day 4/8 upgrade emails, and added Email as a tracked traffic source in analytics (`b9d839a`, deployed).
5. **Git-state check (part of generating this report):** local `origin/main` tracking ref was stale again at session start (same benign pattern as recent reports). Re-fetched and confirmed HEAD, local `main`, and `origin/main` are all identical at `b9d839a` — nothing unpushed, no data at risk right now.

## Unanswered Questions
Carried forward from `MARCUS_HANDOFF.md`: the suspected prompt-injection attempt against the Bible Note Writer Agent during the 2026-07-31 13:46 UTC Numbers 29 run. The entry is still sitting in `MARCUS_HANDOFF.md` unchanged, now about 3.5 days old — Life Buddy's auto-clear still hasn't picked it up, or has and isn't clearing the file. Worth Louis confirming directly he didn't send that instruction.

## Missed Things
1. **Live security exposure, still open (7th consecutive report):** `app/api/email-funnel/backfill-30days/route.ts` still has no authorization check of any kind (re-verified by reading the full file just now — no auth header, secret, or token check anywhere in it, unlike sibling routes such as `app/api/cron/email-funnel-day1/route.ts` which do check one). It's a public POST endpoint that pulls up to 5,000 recent signups and emails them via the Systeme.io API. Anyone who finds the URL can trigger it.
2. **Git-state recovery is happening repeatedly, not just once.** `MARCUS_HANDOFF.md` already flags the 2026-08-03 10:51 UTC recovery of 53 stranded commits as a root-cause issue. Today's `data/bible-notes-progress-log.json` shows the *same* stale/detached-ref problem recurred at least twice more the same day (Leviticus 11 and Leviticus 12 runs), each self-recovered without data loss. The pattern is getting more frequent, not less — worth treating as more urgent than a one-time incident.
3. Root `bible-notes-progress.json` (repo root) remains stale — frozen at 85 entries / Genesis 50 + Exodus 35, last touched 2026-07-27. The canonical, current sources are `data/bible-notes-progress-log.json` and `data/bible-notes-style-redo-remaining.json`.

## Dropped Activities
The **profile_stats upsert audit**, mentioned as "running as a spawned background task" in the 2026-07-31 (night, part 3) session log entry, has not been mentioned again in any session log entry or handoff since. No result, no follow-up, no closure — this thread appears to have been dropped rather than finished.

## Unfinished Jobs
- Restore an authorization check on `app/api/email-funnel/backfill-30days/route.ts` — unfixed for a 7th report cycle. See Missed Things.
- Investigate why the git working state keeps going stale/detached between hourly runs (now observed 3+ times in one day) — see Missed Things.
- Get Louis to confirm whether he sent the 2026-07-31 13:46 UTC instruction referenced in `MARCUS_HANDOFF.md`.
- Follow up on the dropped profile_stats upsert audit (see Dropped Activities) — find out if it ever finished or needs re-running.
- Reconcile or retire the stale root `bible-notes-progress.json`.
- Work through the remaining style-redo backlog (44 chapters left: Leviticus 14-27, Numbers 1-30), tracked in `data/bible-notes-style-redo-remaining.json`.
- Louis to test the install banner on a real iPhone and confirm the Android real-device flow (open since 2026-07-31 night sessions, no update in 3+ days).

## Current Jobs / Current Build
Chapter-notes pipeline is actively running hourly, mid-way through the 116-chapter style-redo backlog.

Per `data/bible-notes-progress-log.json` / `data/bible-notes-style-redo-remaining.json` (canonical, current sources):
- Redo backlog: 72/116 done — Genesis 32-50 complete (19/19), Exodus 1-40 complete (40/40), Leviticus 13/27 done (next up Leviticus 14), Numbers 0/30. 44 chapters remaining.
- Total chapters with notes (any style, forward-progress pass): Genesis 50/50, Exodus 40/40, Leviticus 27/27, Numbers 30/36 (1-30 written; forward progress is paused during the redo, next new chapter beyond it would be Numbers 31).
- Total chapters with notes: 147 / 1,189 (~12.4%) — unchanged since forward progress is paused during the redo.

Per root `bible-notes-progress.json` (stale, do not use): 85 entries logged, stuck at Genesis 50/50 + Exodus 35/40 (pre-redo snapshot, last updated 2026-07-27).
