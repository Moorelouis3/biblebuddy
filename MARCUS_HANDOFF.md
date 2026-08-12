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
