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
