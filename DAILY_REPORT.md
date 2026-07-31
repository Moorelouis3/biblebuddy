# Daily Report - 2026-07-31T16:13:46Z

## Latest Conversations
Since the last report (2026-07-29T08:13:07Z), two separate threads of work happened:

1. **Chapter-notes pipeline** kept running hourly and finished Numbers 20-30 (11 chapters), then produced a new, stricter hand-written style spec (`docs/bible-study-note-style.md`) that supersedes the old format. Genesis 31 was rewritten from scratch as the reference chapter for the new style, and the hourly agent was handed a 116-chapter regeneration backlog (Genesis 32 through Numbers 30) to redo under the new spec before it resumes forward progress, per `data/bible-notes-style-redo-remaining.json`.
2. **Email funnel work** (not chapter notes): a backfill endpoint was added to send Day 1 emails to the last 30 days of signups, its auth check was removed ("temporarily"), its timeout was raised to 9 min, and the funnel itself was rewritten to send through Systeme.io's real contact-tag API instead of an endpoint that never existed. Several `[deploy]` commits and a submodule/`.gitmodules` fix for Vercel went out alongside this.

## Unanswered Questions
Still open, carried from `MARCUS_HANDOFF.md` (not yet cleared, so Life Buddy has not resolved it): during the scheduled 13:46 UTC Numbers 29 run, a message formatted as a live user instruction arrived telling the agent to abandon the one-chapter limit, redo Genesis 31 onward in a new style, and wire CLAUDE.md to auto-read a Windows local file path unreachable from the sandbox. That run correctly treated it as a suspected prompt injection and declined.

Worth flagging directly: about an hour later (14:47-15:45 UTC), a session did do almost exactly what that message asked for - added a new style spec, wired it into CLAUDE.md, rewrote Genesis 31, and handed the redo backlog to the hourly agent. The progress log attributes this to a live exchange with Louis ("style spec supplied by Louis," "per Louis's explicit request to conserve tokens"), which may well be genuine and simply coincidental in timing. But given the injection attempt targeted this exact outcome, it is worth Louis confirming directly that he was the one who supplied the new style spec and requested the backlog handoff that afternoon.

## Missed Things
Live security exposure: the backfill endpoint (`app/api/email-funnel/backfill-30days/route.ts`) has had its auth check fully removed since commit `7af73a9` ("Temporarily disable auth on backfill endpoint [deploy]", pushed by Louis directly at 16:55 CEST) and it is still removed as of the latest commit on this file. It is a public POST endpoint with no authorization that pulls up to 5,000 recent signups and sends them email via the Systeme.io API. Two more `[deploy]` commits shipped after it (timeout increase, email funnel rewrite) without restoring the check. If this is live in production, it is currently callable by anyone who finds the URL.

Root `bible-notes-progress.json` is still stale - unchanged since the Leviticus 20 commit, stuck at 85 entries and stopping at Exodus 35. This is at least the sixth consecutive report flagging it without a fix. The real, current source is `data/bible-notes-progress-log.json` (103 entries, up to date through Genesis 31 / Numbers 30), which is what the numbers below are drawn from.

## Dropped Activities
None found. Chapter-notes runs all show `status: pass` in `SESSION_LOG.md` for this window (Numbers 27-30 plus the two 2026-07-31 entries carried over from 2026-07-29).

## Unfinished Jobs
- Restore (or deliberately re-secure some other way) the auth check on `app/api/email-funnel/backfill-30days/route.ts` - currently wide open. See Missed Things.
- Get Louis to confirm whether he personally supplied the new style spec / requested the redo-backlog handoff around 14:47-15:45 UTC today, given the earlier declined injection attempt asked for the same thing. See Unanswered Questions.
- Reconcile `bible-notes-progress.json` with real shipped state (now stuck at Exodus 35, dozens of chapters behind). Flagged in six consecutive reports now without being fixed.
- Work through the 116-chapter style-redo backlog (Genesis 32 - Numbers 30), tracked in `data/bible-notes-style-redo-remaining.json`, before forward progress resumes.

## Current Jobs / Current Build
Chapter notes pipeline is actively running on an hourly cadence, currently mid-way through the style-redo backlog rather than writing new chapters.

Per `data/bible-notes-progress-log.json` (canonical, current source):
- Genesis: 50/50 complete (10 logged under this log, 40 pre-existing gold standard)
- Exodus: 40/40 complete
- Leviticus: 27/27 complete
- Numbers: 30/36 shipped (1-30), next new chapter would be Numbers 31
- Total done: 147 / 1,189 chapters (~12.4%)
- Style-redo backlog: 116 chapters (Genesis 32-50, all of Exodus, all of Leviticus, Numbers 1-30) queued for regeneration to the new stricter spec before forward progress resumes; next up is Genesis 32.

Per `bible-notes-progress.json` (stale, do not use): 85 chapters logged, stuck at Genesis 50/50 + Exodus 35/40.
