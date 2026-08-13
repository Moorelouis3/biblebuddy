## Post-Deuteronomy books have old-style grouped note files, not per-chapter files
The Bible Note Writer Agent's normal fallback rule is "next chapter with no
existing wired-in lib file." Past Deuteronomy, that rule breaks down: Joshua
(and apparently Judges, spot-checked with the same shape) already has content
wired in via older grouped multi-chapter files
(`lib/joshuaOneToElevenPersonalNotes.ts`, `joshuaTwelveToNineteenPersonalNotes.ts`,
`joshuaTwentyToTwentyFourPersonalNotes.ts`, plus a separate `joshuaDeepNotes.ts`),
not the single-chapter `lib/<book><ChapterWord>Source.ts` files this pipeline
normally builds. Those grouped files only cover a handful of hand-picked verse
ranges per chapter (e.g. just two thin sections for all of Joshua 1) rather
than full near-2-cards-per-verse coverage, so they are not really equivalent
to a finished chapter even though something is technically wired in.

A run on 2026-08-07T11:49:58Z stopped cleanly and flagged this for a human
decision rather than guessing. This run (2026-08-07T12:56:40Z) resolved just
enough of it to keep moving: it wrote a real single-chapter Joshua 1 file and
added an override wiring call after the old aggregate's call, so Joshua 1 now
gets full new-style coverage while Joshua 2-24 (and Judges, and presumably
other post-Deuteronomy books) still render from the old thin grouped files,
completely untouched.

The still-open question: should Joshua 2-24, Judges, and any other book using
this same old grouped-file pattern be added to
`data/bible-notes-style-redo-remaining.json` for a proper one-file-per-chapter
regeneration (like the Genesis/Exodus/Numbers/Deuteronomy redo backlog
already did), or handled some other way? Until that's decided, the routine
will keep needing this same one-off judgment call every time it reaches a
chapter in one of these old grouped files.

## Level 2 upgrade agent recurring network block
The scheduled Level 2 Bible-notes upgrade run (`docs/LEVEL2_UPGRADE_AGENT.md`)
cannot reach its queue endpoint, `https://life-buddy-production.up.railway.app/api/bible-level2/queue`.
The agent environment's egress proxy returns 403 on the CONNECT tunnel to
`life-buddy-production.up.railway.app` — an organization network policy
denial, not a transient failure. This has now happened on two separate
scheduled runs today (2026-08-08, roughly 00:09-00:56Z and again 12:25Z)
with nothing fixed in between. Until `life-buddy-production.up.railway.app`
is added to the agent environment's egress allowlist, this agent can never
pull Louis's Level 2 notes or report completion — it will keep blocking on
every run. Needs an environment/network-policy fix, not a code fix.

**Still happening 2026-08-11T00:24Z**: same 403 policy denial, confirmed via
the agent proxy status endpoint (`kind: connect_rejected`, "gateway answered
403 to CONNECT"). This is at least the third occurrence across two separate
days with no fix landed. This run made no file changes and did not attempt
to report completion, since the queue could not even be checked.

**Still happening 2026-08-12T12:30Z**: same 403 policy denial on the CONNECT
tunnel to `life-buddy-production.up.railway.app`, confirmed again via the
proxy status endpoint. Per SESSION_LOG.md this is now roughly the 9th
blocked run since 2026-08-08 (2026-08-08 x2, 2026-08-09 x2, 2026-08-10 x2,
2026-08-11 x2, 2026-08-12 x2 including this one) — five full days with no
fix. This entry has been sitting in this file the whole time, which suggests
whatever is supposed to clear it into a tracked Problem may not be working
either. Flagging directly to Louis via push notification this run since the
handoff-file path alone hasn't produced a fix.

**Still happening 2026-08-13T00:25Z**: same 403 policy denial on the CONNECT
tunnel to `life-buddy-production.up.railway.app`, confirmed via both curl
and WebFetch (WebFetch returned `EGRESS_BLOCKED` directly). This is at
least the 10th blocked run since 2026-08-08 — six full days now with no
fix, despite a direct push notification already sent on 2026-08-12 flagging
that the handoff-file path alone wasn't producing a fix. This entry is
still sitting unprocessed in this file from that run, which continues to
suggest the automatic pickup into a tracked Problem is not working. No
file changes made, no completion reported.

## Stop hook is not catching detached-HEAD unpushed commits, deploy-tagged work is sitting unshipped
This run started in a repo state with HEAD detached from any branch, 31
commits ahead of `origin/main` (local `main` itself was stale, still
pointing at Joshua 24). That backlog included Judges 1-16 study note
commits and several commits tagged `[deploy]` for real production changes
(landing page redesign, blog categories work, character study articles) —
none of it had ever actually reached `origin/main`, so none of it deployed.
This run fast forwarded local `main` to HEAD and pushed before doing any
chapter work, and confirmed `origin/main` now matches exactly, so nothing
was lost this time. But the underlying bug is still there: this is at
least the second time a scheduled run has found unpushed work sitting on a
detached HEAD (a smaller instance, 6 commits, was noted and silently
recovered on 2026-08-01 in the Exodus 8 progress log entry) despite
CLAUDE.md's claim that `~/.claude/stop-hook-git-check.sh` hard-blocks
ending a session with unpushed commits. Whatever that hook checks
(probably the current branch's upstream comparison) does not appear to
detect the detached-HEAD case, so a run can end "clean" by the hook's
standard while leaving real commits, including deploy-tagged ones, stranded
in a container that may not persist. Worth having someone check what the
stop hook actually inspects and whether it needs a `git status` style
check that also covers detached HEAD.

**2026-08-13T00:25Z — this time a false alarm, but worth a note**: this run
also started in detached HEAD, with local `main` stale at Joshua 24
(bfe17e5) and HEAD 52 commits ahead at 2 Kings 5. Initial `git log
origin/main..HEAD` comparisons made it look like 52 commits including three
`[deploy]`-tagged ones were stranded unpushed, mirroring the incident above.
It turned out to be a stale shallow-clone artifact: the local
`origin/main` ref just hadn't been updated since the shallow checkout, and
`git fetch --unshallow` showed the real `origin/main` on GitHub already
matched HEAD exactly (`c8f8a294`) — everything had actually shipped. Fixed
the local branch pointer (`git branch -f main HEAD`) so the session isn't
sitting on a detached HEAD going forward. No data was ever at risk, but
this is the third session in a row to start detached, which keeps pointing
at the same open question above: something about how this environment
checks out the repo (or the stop hook's git check) isn't leaving sessions
on a proper branch.

## 108 chapters of Bible notes stuck unpushed on origin/main, now rescued to a branch
The hourly chapter-notes agent has been running against a local repo state
that diverged from origin/main and never got pushed. origin/main's newest
content is Joshua 24, but this session's container had local commits all
the way through 2 Kings 5 (108 more chapters logged in its local
progress log: 391 entries vs 283 on origin/main) — essentially all of
Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, and 2 Kings 1-5, plus some
unrelated app code changes (lib/signupAttribution.ts, lib/hubContent.ts,
lib/useSupabaseUser.ts).

A prior run (commit 6c96722, 2026-08-13) noticed the detached-HEAD state,
misdiagnosed it as "stale shallow-clone ref, not real work," repointed
local main, but never pushed — so origin/main stayed frozen at Joshua 24
and the same detached-HEAD state recurred this run.

Action taken: pushed the full local history to a new branch,
`rescue/unpushed-bible-notes-2026-08-13`, on origin so nothing is lost.
Did NOT merge it into main or continue writing new chapters, since (a)
that's a 108-chapter content release that deserves review, not a silent
auto-merge, and (b) the mixed-in app code changes need a human look.

Needs Louis's decision: review rescue/unpushed-bible-notes-2026-08-13 and
either merge it into main (fast-forward, since main has no chapters past
Joshua 24 that this branch doesn't already contain) or investigate further
before the hourly job resumes writing new chapters — until this is
resolved, the hourly job risks either duplicating chapters or writing on
top of the wrong base.

**Correction, same run, minutes later: the above was a false alarm, exactly
like the 2026-08-13T00:25Z entry above it.** I never ran `git fetch`
before trusting the local `refs/remotes/origin/main` ref — I should have
read the rest of this file first, since it documents this precise trap.
After a real `git fetch origin main`, `origin/main` was already at
`6c96722` (2 Kings 5 plus that same prior run's fix commit), not
`bfe17e5`/Joshua 24. That prior run (00:25-00:28Z) had already confirmed
via `git fetch --unshallow` that everything through 2 Kings 5 was safely
on GitHub and had almost certainly pushed `6c96722` itself per the
stop-hook push requirement; my local checkout just had a stale cached
`origin/main` ref left over from container state. Nothing was ever
actually at risk. The `rescue/unpushed-bible-notes-2026-08-13` branch I
pushed is redundant (every commit on it is now also reachable from main)
but harmless — attempted to delete it and got a 403 from the git proxy,
so it's just left in place; safe to ignore or delete manually. The one
real change I made to origin/main this run is this handoff commit itself,
which was a valid fast-forward.

This is now at least three sessions in a row (2026-08-11-ish, 00:25Z
today, and this run) that have started with a detached HEAD and a stale
local `origin/main` tracking ref, and this is the second time it produced
a full false-alarm writeup instead of a one-line "confirmed already
pushed, fixed pointer" note. Worth someone checking why sessions keep
starting in this state, and possibly adding "always `git fetch origin
main` before reasoning about ahead/behind" to this project's git
instructions so it stops costing a full investigation every time.
