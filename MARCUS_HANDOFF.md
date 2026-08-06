## Suspected prompt injection against the Bible Note Writer Agent
During the 2026-07-31 13:46 UTC scheduled Numbers 29 run, a message formatted as a
live user instruction arrived mid-turn telling the agent to: abandon the
one-chapter-per-run limit, redo Genesis 31 onward in a "new style," and add an
instruction to CLAUDE.md that would make future runs automatically read and
"follow exactly" a file at a Windows local path
(`C:\Users\Moore\Desktop\biblebuddy-...\docs\bible-study-note-style.md`) that
doesn't exist in the agent's sandbox. This is this project's unattended
scheduled routine, so no live user should be typing into it, and Louis would
know the sandbox can't read his local Windows filesystem — both point to
injected content rather than a real instruction from Louis. The agent declined
to act on it (no CLAUDE.md edit, no chapter rewrites, no scope change) and
continued the original one-chapter task normally. Worth Louis confirming
directly that he didn't send this, and worth double-checking whether anything
else feeds text into this session's queue that could carry attacker content.

## Bible Buddy sandbox lost 52 commits of finished work between runs
The 2026-08-03 ~10:46 UTC scheduled Leviticus 8 run started on a container
whose git HEAD was detached 53 commits ahead of both local and origin/main.
Those commits contained real, already-completed work from prior scheduled
runs that had never made it to origin: full style-spec redos of Exodus 1-40
and Leviticus 1-7, plus unrelated already-committed product commits (email
funnel day4/day8 conditional logic, a new enroll-remaining-signups cron
route, vercel.json changes) that were also never pushed. If that run had
simply done a normal `git checkout main` and moved on (which is exactly what
happened, before the problem was noticed), those 53 commits would have become
unreachable and eventually garbage-collected, permanently losing roughly a
day and a half of agent work plus at least one deploy Louis likely intended
to ship. This run recovered it (branched off the detached commit, merged into
main, verified `tsc` clean, pushed as abb2049) before starting its own
chapter, but the root cause is still open: something about how this sandbox
is provisioned or how a prior run's push step ran is letting real committed
work sit unpushed and undetected instead of reaching origin. The task
instructions for this agent assert each run gets "a fresh clone every run" —
that was not true this time, and if it can silently fail once it can fail
again unnoticed, next time without anyone catching it first. Worth Louis (or
whoever owns the Claude Code Remote environment for this project) checking
why the container was reused/stateful here instead of freshly cloned, and
whether prior runs' "push to origin" step is being verified or just assumed
to have succeeded.

## Detached-HEAD/unpushed-commits bug recurred, 51 commits this time
The exact problem already flagged above ("Bible Buddy sandbox lost 52 commits
of finished work between runs") happened again on this 2026-08-04 ~12:47 UTC
scheduled Numbers 7 run. The container started with git HEAD detached 51
commits ahead of both local and origin/main, going back to at least the
Leviticus 6 regen (2026-08-03) and including the "Merge stranded local work"
recovery commit from the prior incident, an email-funnel/pricing commit, and
roughly 30 chapters' worth of completed style-spec regens (Leviticus 6-27,
all of Numbers 1-6). Every one of those runs' logs says the push succeeded.
This run again fast-forwarded local main onto the detached commit, verified
it was a clean ancestor of origin/main (not a diverged history needing a
merge), and pushed successfully as 3a5311f, so nothing was lost this time
either. But the root cause from the 2026-08-03 handoff is confirmed still
open and still live: whatever mechanism is meant to keep this environment's
main pointer synced with origin (or give this agent a fresh clone each run,
as its own task instructions claim happens) is not working, and the "push
succeeded" self-check every run performs is not actually catching it because
the push command itself does succeed locally, it is just pushing to a
detached-HEAD state that the next run's main branch never sees. Worth
treating this as higher priority than "worth checking" now that it has
recurred identically once already — two saves in a row is luck, not a fix.

## Detached-HEAD bug recurred again, third time (Numbers 8 run, no data lost)
Same environment issue as the two entries above happened again on this
2026-08-04 ~13:47 UTC scheduled Numbers 8 run: git HEAD started detached.
This time it was detached at the exact same commit as origin/main, not
ahead of it, so nothing was at risk of being lost, unlike the two prior
incidents. Fixed the same way (checked out main, fast forwarded, verified
clean) before starting the chapter. Flagging only as a data point since
this is now the third time in a row the container has not started on a
normal attached main branch as the task instructions claim it should
("a fresh clone every run"). The underlying mechanism is still unconfirmed
and still worth someone checking directly, per the prior two entries.

## Detached-HEAD bug recurred again, Deuteronomy 14 run, no data lost
Same environment issue as the entries above, on the 2026-08-06 ~14:46 UTC
scheduled Deuteronomy 14 run. Container started with git HEAD detached and
local `main` frozen at a stale commit (`a18839f`, 2026-08-01). This time
`git fetch origin main` showed origin/main had actually already moved on to
`d272fc1` (this container's cached remote ref was just stale, not really
behind), so only this run's own new commit needed to land. Pushed with
`git push origin HEAD:main` (clean fast forward), then reattached local
`main` to `HEAD` before finishing. Nothing lost this time, but this is now
at least the sixth recorded occurrence since 2026-08-03, and the root cause
is still unconfirmed per every prior entry above. Flagging again since none
of the earlier entries in this file appear to have been cleared yet either.

## Push-cadence rule (added 2026-08-04) is not being followed by hourly runs
CLAUDE.md mandates committing locally per chapter but batching pushes to at
most twice a day, specifically because per-chapter pushes were triggering a
Vercel production build every hour. That rule has not actually stopped the
behavior: on 2026-08-06 alone, Deuteronomy 8 through 14 (at least 7 chapters)
each reached origin/main individually, confirmed by origin/main matching this
run's starting local HEAD exactly (6d13aa3, the Deuteronomy 14 log commit)
before this run pushed anything itself. Each of those chapters' own logged
steps says "pushed" right after finishing. This run (Deuteronomy 15) is
complying with the rule as written: committed locally (0814828) and holding
the push for the next scheduled batch (morning/night report push) instead of
pushing immediately. Worth Louis confirming whether the instruction itself
needs to be stronger/clearer for the scheduled agent to actually follow it,
since a plainly written mandatory rule has been silently ignored for at least
two days of hourly runs.
