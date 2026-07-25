## Session Log (for Life Buddy reporting)
This project reports to "Life Buddy" (`C:\Users\Moore\Desktop\second-brain`),
which compiles Louis's daily morning and night reports across all his
projects. Keep entries brief — a few lines each, not a transcript.

**Starting a session (morning):** read this project's PLAN.md (marching
orders) and the most recent night entry below, then append:
```
## <date> (morning)
Marching orders: <what this project's plan says the priority is>
Today: <the concrete plan for this session>
```

**Ending a session (night):** append:
```
## <date> (night)
Time spent: <rough estimate>
Done: <what actually got done/decided>
Still open: <unfinished or blocked items>
Next: <what's planned for next session>
```

Append both to `SESSION_LOG.md` in this project's root (create it if it
doesn't exist).

## Handoff to Marcus (Life Buddy)
If Louis says "tell Marcus" or asks you to flag something for Life Buddy
(a problem, an issue, something that needs tracking outside this
project), append it to `MARCUS_HANDOFF.md` in this project's root
(create it if missing) in this format:
```
## <short title>
<description of the issue/problem in a sentence or two>
```
Life Buddy checks this file automatically every few minutes and turns
each entry into a real tracked Problem, then clears the file. You do not
need to tell Louis it worked — it just gets picked up.


## Ideas from Louis (via Life Buddy)
Louis sometimes captures ideas for this project while away from it (often
by voice, through Life Buddy). If `IDEAS.md` exists in this project's
root and has entries, check it at the START of a session. If there are new
ideas, greet Louis with them and ask whether he wants to discuss, plan, or
schedule each one -- do not just start executing them. Once an idea has
been discussed/actioned, mark it in `IDEAS.md` (e.g. strike it or move it
to a "handled" section) so it is not brought up again next session.


## Responding to a command from Marcus (accountability protocol)
When Marcus sends you an idea/command via `IDEAS.md` that you accept and
start acting on, report back via `MARCUS_HANDOFF.md` with a response that
includes ALL of:
1. Confirmation you understand the plan and accept it
2. A realistic deadline for the work
3. A check-in time/method (when and how you will prove progress is
   actually happening, not just promised)
Example:
```
## Accepted: Title Research Page
Understood the plan, accepted. Deadline: end of day Sunday. Check-in:
will report progress in the Wednesday DAILY_REPORT.md either way.
```
This is not optional politeness -- Louis wants to be able to see, for
every command given to any buddy, whether it was accepted, by when it
will be done, and how progress gets proven along the way.

