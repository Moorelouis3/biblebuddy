# Claude subscription and maintenance cost audit

Run 2026-11-02. Audit only — nothing was changed, no subscription touched, no
code modified.

---

## 1. Executive recommendation: **wait, but cut the waste today**

Not because Max is needed. Because the number the decision rests on is being
inflated by a routine that has done nothing 243 times in a row, and
downgrading before switching it off would be downgrading against a false
reading.

Three steps, in order:

1. **Today — turn off the hourly Note Writer routine.** It has produced
   nothing since 19 October and fires 24 times a day. Zero risk, zero loss.
2. **Decide which of the other six routines you still want.** They are
   content marketing, not maintenance. They are what the subscription is
   actually being spent on.
3. **Re-read the weekly usage figure after one clean window** — the current
   window resets Fri 6 Nov 12:00 UTC, so read it on about 13 November — and
   downgrade on that number.

And hold the downgrade until **Google Play is rolling**. That is a live
launch with work still on it, not maintenance.

The good news first: **downgrading cannot break anything for users.** That is
verified below, not assumed.

---

## 2. Verified current usage

Read from the account today at ~12:50 UTC:

| Window | Used | Resets |
|---|---|---|
| Plan | **Max** | — |
| Weekly · all models | **14%** | Fri 6 Nov 12:00 UTC (in 3d 23h) |
| 5-hour | 22% | in 1h 53m |
| Weekly · Fable | 0% | Fri 6 Nov |
| Extra usage | **disabled** — €0.00 spent, €75.00/mo limit configured | — |

**The 14% is not what it looks like.** That window opened on 30 October at
12:00 UTC, so it is **43% elapsed, not 14%**. Fourteen percent in three of
seven days projects to roughly **33% of the Max weekly allowance per week** if
the rate holds. One caveat on that projection: those three days are a Saturday,
a Sunday and a Monday morning, and they include this audit session.

### What I could not verify

`get_usage` reports the current windows and nothing else. I have no access to:

- usage history for the last 7 or 30 days,
- per-session or **per-routine** attribution,
- how often limits have been hit in the past,
- which models or features drove consumption historically.

One partial signal: the run log of a single Note Writer run today contained
**three `rate_limit_event` entries** in seven and a half minutes. I cannot
tell from the log whether those are plan limits or ordinary API retries.

**Where to get what I cannot see:** `claude.ai/settings/usage` for the account
history, and the routine run history at `claude.ai/code/routines`. In an
interactive `claude` terminal, `/usage` prints the same windows this audit
read. If you want a real before/after, screenshot the usage page today and
again on 13 November.

---

## 3. Where the subscription is actually going

This is the finding that matters, and it is not "hours of coding".

**Thirteen cloud routines exist on the account; seven are enabled.** Every one
of them is a full Claude Code session, running on your subscription, whether
or not you open a laptop:

| Routine | Schedule | Runs/day |
|---|---|---|
| **Note Writer** | `45 * * * *` | **24** |
| Chapter Blog Writer | `30 2,4,6,10,13 * * *` | 5 |
| Holiday Blog Writer | `15 1,5,9,15 * * *` | 4 |
| Verse of the Day Writer | `20 7,13,19 * * *` | 3 |
| Bug Fixer | `30 6,14 * * *` | 2 |
| Deploy | `0 8,16 * * *` | 2 |
| Content Buddy Blog Writer | `0 22 * * 1,3,5` | 3/week |

**≈ 40 runs a day. ≈ 283 a week.** That is the floor of your consumption, and
it does not move when you stop developing.

### The Note Writer: 243 consecutive no-op runs

The whole Bible was finished on 2026-10-19 at 21:01 UTC. The routine has kept
firing every hour since. Today's run 243, read from its own log:

- 44 turns, **452 seconds**, model `claude-sonnet-5`
- a full `npm install` — 737 packages, 41 seconds
- a full `npx tsc --noEmit` — over three minutes, which timed out of the
  foreground and had to be backgrounded
- reads a 28 KB skill file, a 93 KB handoff file, a 126 KB progress doc,
  parses a 14,819-line source file
- **result: appended two bookkeeping lines and committed them**

That is roughly **three hours of cloud Claude session a day, producing
nothing**, and **207 of the last 14 days' 694 commits** are its no-op
bookkeeping.

The routine itself has been asking you to decide this since **run 79, on
26 October**, when it sent a direct push notification. Runs 80 through 243
have all repeated the same line: *"awaiting a decision from Louis (leave the
trigger as a no-op, pause it, or give it new scope)."*

### The premise does not yet match the repository

> "I intend to stop intensive development for a while."

That is your intent, and it is reasonable. It is not yet what the account is
doing. Commits per day on `origin/main`:

```
mid-October (peak)   49-79/day
Sat 31 Oct           31
Sun  1 Nov           53
Mon  2 Nov (midday)  45
```

**The output has not dropped at all.** At least 63% of the last fortnight's
694 commits are the content routines. The rest is real post-launch work — the
Play Store bundle, the App Store Connect download API, Vercel cost work, the
landing page. That work is genuine, and some of it is still open.

---

## 4. Maintenance workload: genuinely small

From `bug_reports`, 158 reports since 1 September:

| Week beginning | Reports |
|---|---|
| 5 Oct | 10 |
| 12 Oct | 54 |
| 19 Oct | 12 |
| 26 Oct | **18** |

Sources: 115 crashes, 41 in-app problem cards, 2 DMs.

What happened to all 158:

| Outcome | Count | |
|---|---|---|
| duplicate | 56 | triaged away |
| not a bug | 53 | triaged away |
| **fixed** | **35** | needed a code change |
| closed / needs info / cannot reproduce | 11 | |
| **needs Louis / awaiting approval** | **3** | on you right now |

**69% of reports never needed a code change**, and the Bug Fixer routine does
that triage twice a day. The genuine human workload is roughly **four fixes a
week**, and three items sitting on you today.

That is a maintenance load Pro would cover without noticing. The bugs are not
the constraint. The routines are.

### Still open, and not maintenance

**Google Play is a live launch, not upkeep.** The bundle is a draft release on
the closed-testing track; target SDK 36 accepted. Still to do: sign-in demo
account (yours), target audience decision (yours), content rating, data safety
declaration, store listing copy, a 1024×500 feature graphic, phone
screenshots, and **twelve real testers opted in for fourteen unbroken days**.
That clock has not started.

---

## 5. Production costs are completely separate — verified

**Downgrading your coding plan cannot affect a single thing users see.**

| Check | Result |
|---|---|
| AI calls in `app/api/**` | 9 references, **all `process.env.OPENAI_API_KEY`** |
| Anthropic references in runtime code | **zero** |
| `ANTHROPIC_API_KEY` in `.env.local` or `.env` | **not present in either** |
| Anthropic anywhere in the project | 4 offline scripts only — `build-shorts-*.ts`, `reformat-devotionals.mjs` — not part of the running app, and no key configured to run them |
| Vercel crons running the product | 35, none calling Anthropic |

The seven user-facing AI routes — Lil Louis chat, the auto-reply routes, the
comment-reply cron and the three TTS routes — all read `OPENAI_API_KEY`.

Bible Buddy's live operating costs are billed separately by: **Vercel,
Supabase, OpenAI, AWS SES, Bunny Stream, Stripe, Systeme.** None of them touch
your Claude subscription. (Those bills are their own audit; the Vercel one is
already known to be mostly build CPU.)

**The one thing that does break on a downgrade is the routines** — they run on
the subscription. That is the real trade, and it is a content-production
trade, not a product-availability one.

---

## 6. Pro versus Max against the measured rate

Using your own figure of 5× and the measured ~33% of a Max week:

| | Max (now) | Pro |
|---|---|---|
| Measured weekly run rate | ~33% of allowance | **~165% of allowance** |
| Routines unchanged | comfortable | **exhausted around Thursday, every week** |
| Note Writer off | ~17% (estimated) | ~85% — workable but tight |

**That middle row is the whole decision.** Downgrading today, with 283
scheduled cloud sessions a week still firing, would put you over the Pro
ceiling mid-week — and the week you most need Claude is the week something
breaks.

The "Note Writer off" row is an **estimate, not a measurement**. I cannot
attribute usage per routine. It assumes the Note Writer is roughly half of
total consumption, which is plausible — it is 24 of the ~40 daily fires and
one of the longest-running — but it is inference. Switching it off and reading
one clean week turns it into a fact.

### The four scenarios

| | What it costs | On Pro |
|---|---|---|
| **A — Quiet week** | routines only | fine once the Note Writer is off; **impossible as things stand** |
| **B — Normal maintenance** | ~4 small fixes, one deploy | fine; the bug work is small sessions |
| **C — Difficult week** | hours of investigation | **the 5-hour window is the risk, not the weekly one** — a long debugging session can exhaust it; it resets in under 5 hours |
| **D — Emergency** | extensive work, fast | the real exposure. Extra usage is the escape hatch |

**Extra usage** is already configured on the account at a €75/month cap and is
currently **switched off, €0 spent**. It is worth knowing it exists before you
need it — but also note that if it ran to its cap it would absorb almost the
entire saving. Check on the billing page whether that option carries over to
Pro before relying on it.

---

## 7. Reducing usage — what actually matters

The habits in your list (narrow debugging, smaller context, cheaper models for
simple tasks, batching) are all sound, and next to **283 scheduled cloud
sessions a week** they are rounding errors. In order of real effect:

1. **Switch off the Note Writer.** 24 runs a day, 243 consecutive no-ops. By
   a wide margin the single biggest saving available, and it costs nothing.
2. **Decide what the other six routines are for.** Chapter Blog Writer (5/day)
   and Holiday Blog Writer (4/day) are a content pipeline. If the plan is to
   let Bible Buddy operate rather than grow, they are optional. If the blog is
   still the growth engine, they are the most defensible spend on the account —
   but that is a content decision to make deliberately, not by default.
3. **Keep the Bug Fixer and the Deploy routine.** Two runs a day each, and
   they are exactly the maintenance you said you still want. The Bug Fixer is
   why 69% of bug reports never reach you.
4. Then the prompt-hygiene habits, which are worth having anyway.

---

## 8. Savings

| | Now | After | Saved |
|---|---|---|---|
| Monthly | ~€100 | €20–25 | **€75–80** |
| Annual | ~€1,200 | €240–300 | **€900–960** |

Two conditions on that number being real:

- **Extra usage has to stay off.** Its configured €75/month cap is nearly the
  whole monthly saving.
- Check before downgrading whether re-upgrading mid-month is possible and
  whether it is prorated. I could not verify either from here — it is on the
  billing page, and it matters for the emergency scenario.

---

## 9. Your seven questions, answered directly

**1. Can Pro realistically maintain Bible Buddy?**
Yes — the maintenance itself is small. Not with the routines running as they
are today.

**2. How many maintenance tasks before hitting limits?**
I will not invent a token figure. The measured proxy: ~18 bug reports a week,
of which ~4 need a code change, each a short session. That is not what fills
the allowance; 283 scheduled routine runs are.

**3. What if there were a serious production bug?**
The 5-hour window would bite before the weekly one. It resets in under five
hours, and extra usage exists as a paid escape hatch. Survivable, but it is
the one scenario where the lower plan genuinely costs you something — time,
on the day you have least of it.

**4. Would downgrading affect AI features for customers?**
**No.** Verified: every user-facing AI call reads `OPENAI_API_KEY`, and there
is no Anthropic key anywhere in the app's environment.

**5. Any ongoing commitments that make downgrading premature?**
Yes — Google Play. Draft release on the track, and the 14-day/12-tester clock
has not started.

**6. Downgrade now, wait for Play, or keep Max?**
**Wait — and cut the waste today.** Switch off the Note Writer now, decide on
the content routines, read one clean weekly window, get the Play track
rolling, then downgrade. On the evidence that is a few weeks, not a few months.

**7. Estimated monthly savings?**
€75–80/month, €900–960/year, provided extra usage stays off.

---

## 10. Next steps

1. **Today:** pause the Note Writer routine at `claude.ai/code/routines`. It
   has been asking for this decision since 26 October.
2. **Today:** decide whether the Chapter Blog Writer and Holiday Blog Writer
   are still earning their place. That is a content-strategy call, not a cost
   one, but it is where the money goes.
3. **This week:** screenshot `claude.ai/settings/usage` so there is a
   before-and-after.
4. **13 November:** read the weekly figure after one clean window with the
   routines settled. That number, not today's 14%, is what to decide on.
5. **After Google Play is rolling:** downgrade.
6. **Before downgrading:** confirm on the billing page that extra usage is off
   and that re-upgrading mid-month is possible.

---

### What is measured and what is inferred

**Measured:** the plan windows and percentages; the 13 routines and their
schedules; the Note Writer's 243 consecutive no-ops and one run's full log;
commit counts per day and their routine/non-routine split; all bug-report
figures; every provider and env-key check; the Vercel cron list; the Play
Console state.

**Inferred:** the ~33%-per-week projection (assumes an even rate across the
window); the "~17% with the Note Writer off" row (assumes it is about half of
consumption — unverifiable without per-routine attribution); the Pro
comparison (uses your stated 5× ratio, not a figure I read from the account).

**Not verified at all:** usage history beyond the current windows, and
whether extra usage and mid-month re-upgrades behave the same on Pro.
