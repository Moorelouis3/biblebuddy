# Auto-commenter AI cost audit

Run 2026-11-02. **Audit only** — no production code changed, nothing deployed,
no configuration touched.

---

## The short version

Three things, and the first two change the question:

1. **The social-media commenter does not use AI.** It already is the system
   this brief asks me to build — templates in a config table, no OpenAI
   anywhere. Nothing to save there.
2. **The thing that does call OpenAI is not social media.** It replies to
   study comments inside Bible Buddy. **It has cost about three cents in
   total**, across every reply it has ever sent. A year at current volume is
   about five cents.
3. **It has been dead since 25 October** and 44 comments are waiting.

The hypothesis was that 90–99% of comments could be answered without a new AI
call. Backtested against all 571 real comments: **0.4%**. The reason is in the
data — 567 of 571 are unique, and the median one is an 86-character personal
reflection, not "Amen".

So the honest recommendation is **do not build the response library**. There
is a real problem in this system, but it is not cost: on 17 October it sent
one person **36 replies in a single day**. That is worth fixing.

---

## 1. What the system actually is

### There are two commenters, and only one uses AI

**A. The social commenter — "Closer" — Instagram, Facebook, Threads.**
`lib/closer/`, `app/api/closer/webhook`, `app/api/cron/closer-threads-poll`.

**It calls no AI at all.** It is already a template system, and close to the
one this brief describes:

- Config in `closer_config` (Supabase), editable without a deploy
- Trigger words: `BIBLE`, `APP`, `LINK`, `STUDY`
- Three templates: `dm_template`, `fallback_comment_template`,
  `public_reply_template`
- `hourly_cap` of 100, and **`dry_run` defaults to true** — a failed config
  read fails closed rather than sending live messages with default wording
- Instagram and Facebook arrive by webhook; Threads is polled every 15 minutes
  because Meta's reply-webhook coverage could not be confirmed
- Re-polling is free: a unique index claims each reply, so a second attempt is
  recorded as a duplicate rather than sent again

If the goal is "a cheap, reusable, approvable response library on our existing
infrastructure", **it already exists, on the surface where it makes sense.**

**B. The one that costs money — in-app study comment replies.**
`app/api/cron/auto-comment-replies/route.ts`, every 15 minutes.

It replies to comments people leave on Bible Buddy study articles, posting
from Louis's own account with `is_auto: true` so `/comments-admin` can tell
them apart. Comments live in `article_comments`, keyed by `article_slug`.

### The measured pipeline

| | |
|---|---|
| Model | `gpt-4o-mini`, temperature 0.8 |
| **Calls per reply** | **exactly one** |
| Classification call | none |
| Moderation call | none |
| Retry logic | none — a failure is logged and the loop moves on |
| Caching / templates / dedup / reuse | **none** |
| Kill switch | `AUTO_COMMENT_REPLIES=off` |
| Dry run | `?dryRun=1` |

**Selection rules:** top-level only (`parent_id is null`), not Louis's own, not
deleted, at least 12 characters, at least 60 minutes old, not already answered.
Up to 6 "fresh" (under 7 days) plus 4 backlog per run.

**Context sent** (measured): a 123-token system prompt, a 51-token scaffold,
and up to 700 characters of the comment. Note what is *not* sent — the
"original post content" is a synthetic one-liner, `A Bible Buddy study of
<slug>`. **The model never sees the article or the reflection question the
person was answering.** That is a quality issue, not a cost one, and it is
cheap to fix.

**Two sibling routes:** `app/api/auto-reply` (the original manual Auto Reply
button) and `app/api/groups/[groupId]/auto-reply`, called only from the
study-groups chat page — and groups were closed on 2026-10-18, so that one
looks like dead code worth deleting.

---

## 2. Historical analysis — measured, all of it

Every row in `article_comments`, 21 February to 2 November 2026.

| | |
|---|---|
| Total comments | 1,195 |
| Top-level | 591 |
| Replies | 604 |
| **Auto replies sent (`is_auto`)** | **477** |
| Deleted | 0 |
| **Incoming top-level comments (not Louis)** | **571** |

### Repetition — the number the whole proposal rests on

| | |
|---|---|
| Unique after normalization (case, punctuation, whitespace) | **567 of 571** |
| Normalized texts appearing more than once | **4** |
| Comments those 4 cover | **8 (1.4%)** |
| **Auto replies that repeat verbatim** | **0 of 477** |

The four repeats, in full: *"lust of the eyes"*, *"bible study"*, *"god is
good"*, *"keep thine heart with all deligence"* — two occurrences each.

### Length — these are not reactions

| min | p25 | median | p75 | p90 | max |
|---|---|---|---|---|---|
| 3 | 49 | **86** | 169 | 333 | 1,236 |

Under 12 characters (already skipped today): **15 comments, 2.6%**.

### Volume

| Month | Incoming |
|---|---|
| Feb | 7 |
| Mar | 20 |
| Apr | 31 |
| May | 130 |
| Jun | 50 |
| Jul | 69 |
| Aug | 40 |
| Sep | 63 |
| Oct | 151 |
| Nov (2 days) | 10 |

Mean **62/month**; last 30 days **150**.

**All 477 auto replies were sent in October**, 369 of them on the 17th — the
day the cron shipped and drained a 514-comment backlog. See §7.

---

## 3. Categories, discovered from the data

Deterministic rules applied in priority order to all 571 incoming comments:

| Comments | Share | Median length | Category |
|---|---|---|---|
| 308 | 53.9% | 113 | Scripture reflection |
| 215 | 37.7% | 58 | Other / freeform reflection |
| 18 | 3.2% | 406 | Testimony / personal story |
| 12 | 2.1% | 195 | Thanks / appreciation |
| 9 | 1.6% | 119 | Question |
| 7 | 1.2% | 263 | Praise / agreement |
| **1** | **0.2%** | 3 | **Short agreement** ("Yes") |
| 1 | 0.2% | 140 | Prayer request |
| **0** | **0%** | — | **Emoji-only** |
| 0 | 0% | — | Spam |
| 0 | 0% | — | Disagreement / criticism |

**There is no "Amen / praise God" category.** The seven comments that match
praise keywords have a median length of 263 characters — they are long
reflections that happen to contain the word. One comment in 571 is a bare
agreement. None is emoji-only. None is spam.

Sanitised examples of the actual median comment:

> *"As we draw closer to God, we have more of a heart towards God and the
> things He values become our values…"*

> *"Covenant Love to me means something to be carried out. With Honor and
> Integrity"*

> *"I been trying to pray every night before I start my night shift with my
> daughter…"*

These are people answering a study's reflection question under their own name,
in a Bible study they paid attention to. **A canned reply to a 400-character
testimony about addiction would be worse than no reply at all.**

---

## 4 & 5. The response library and the learning loop

**Recommendation: do not build either.**

Not because the design is wrong — it is a good design, and it is what Closer
already does for social. It is that the input data has none of the properties
the design needs. A library needs recurring inputs; there are four repeats in
eight and a half months. A rotation of approved variations needs categories
with enough volume to rotate within; the largest templatable category has one
member.

The learning loop in §5 of the brief has the same problem: it would mine 477
replies for reusable templates and find that none of them repeats, because
each answers a different person's different thought.

---

## 6. Backtest — the proposed router over all 571 comments

Simulated exactly as specified: Level 1 skip, Level 2 exact/normalized match,
Levels 3–4 rule classification into the template library, Level 5 AI fallback.

| Level | Comments | Share |
|---|---|---|
| L1 — skipped (under 12 chars) | 15 | 2.6% |
| L2 — served from an exact/normalized match | **2** | 0.4% |
| L3/L4 — served from a template library | **0** | 0.0% |
| **L5 — still needs an original AI reply** | **554** | **97.0%** |

**AI calls avoided by the entire proposed system: 2 out of 556 repliable
comments — 0.4%.**

The hypothesis was 90–99%. It is 0.4%, and the gap is not a tuning problem.

---

## 7. Cost — measured

Token profile, measured against the real prompt and the real comment lengths:

| | |
|---|---|
| System prompt | 123 tokens |
| Fixed scaffold | 51 tokens |
| Input per call | avg **210**, max 349 |
| Output per reply | avg **52**, max 91 (measured from the 477 sent) |
| Lifetime input | 100,077 tokens |
| Lifetime output | 24,598 tokens |

At gpt-4o-mini list rates — **confirm these on the OpenAI dashboard; I took
them as $0.15 and $0.60 per million tokens and did not read them from your
billing**:

| Scenario | Calls | Cost |
|---|---|---|
| Mean month | 62 | **$0.004** |
| Busiest month ever (Oct) | 151 | **$0.009** |
| The 17 Oct backlog drain | 369 | **$0.023** |
| **Everything ever sent** | **477** | **$0.030** |
| Twelve months at current volume | 748 | **$0.047** |

**Conservative, realistic and optimistic scenarios all round to zero.** A 99%
reduction would save about five cents a year.

For scale: last week's subscription audit found the expensive resource here is
the Claude Max plan at roughly €100/month, driven by 283 scheduled cloud
sessions a week. **Building and backtesting this library would consume more of
that in one sitting than the feature costs in a decade.**

---

## 8. The real problems, which are not cost

### It has been dead for eight days

Last auto reply: **25 October, 02:15**. Since then, **44 eligible comments**
have gone unanswered (34 from October, 10 from November). Before that date the
queue is clean, so it drained everything and then stopped.

What I checked: the route is deployed and answering — an unauthenticated GET
returns `401`, the same as a known-good cron route — and neither the route nor
its `vercel.json` entry (`*/15 * * * *`) has changed in git since it shipped.

So the cause is one I cannot see from here. In order of likelihood:

1. **`AUTO_COMMENT_REPLIES=off`** set in Vercel's environment variables
2. The cron not firing, or erroring after the auth check
3. An OpenAI key or quota problem

Where to look: Vercel → the project → Settings → Environment Variables for
`AUTO_COMMENT_REPLIES`, then Observability → Crons / Logs for
`/api/cron/auto-comment-replies`.

Worth noticing either way: it has been off for eight days and nothing broke.

### 17 October: one person received 36 replies in one day

This is the spam-bot risk in the brief, and it has already happened.

| | |
|---|---|
| Auto replies that day | **369** |
| Spread | ~16/hour, every hour, for 22 straight hours |
| Distinct articles touched | 160 |
| People who received a reply | 66 |
| **Most replies to one person** | **36** |
| People who got 10 or more | 9 |
| Median age of the comment answered | **77 days** |
| Replies to comments older than 90 days | 149 |
| Oldest comment answered | 158 days |

Sixty-six people each got a burst of replies to comments they wrote up to five
months earlier. One of them got thirty-six.

The per-run caps do not prevent this. `MAX_FRESH_PER_RUN = 6` and
`MAX_BACKLOG_PER_RUN = 4` bound a *run*, and the cron runs 96 times a day — a
ceiling of 960/day. The code comment says the batching exists because "nobody
wants eleven notifications in a minute". It succeeds at that and permits 369
in a day. **There is no per-person cap and no per-day cap.**

### Failures are retried forever

When a reply fails, nothing is written. The comment stays unanswered, so the
next run picks it up again — every 15 minutes, indefinitely. Cheap at these
volumes, but unbounded.

### The model cannot see the study

It receives a title derived from the slug and the synthetic line `A Bible
Buddy study of <slug>`. It never sees the article or the reflection question.
Every reply to a 300-character theological reflection is written from the
comment alone. That is the misinformation and irrelevance risk, and it is the
one quality gap worth closing.

---

## 9. What to do instead

Four small changes, in order of value. All are an hour's work, none needs a
new table, a library, or a classifier.

1. **Decide whether it should be on at all.** It has been silent for eight
   days with 44 comments waiting and nobody noticed. If the answer is yes,
   find out which of the three causes stopped it before anything else.
2. **Cap per person and per day.** A limit of ~2 replies to one person per
   day and ~25 overall would have turned 17 October from a 369-reply burst
   into a fortnight of normal-looking conversation. This is the single change
   that stops the account reading as a bot.
3. **Mark failures** so a permanently failing comment is not retried 96 times
   a day forever.
4. **Send the real study context** — the article's reflection question and a
   short excerpt instead of `A Bible Buddy study of <slug>`. Costs perhaps 150
   more tokens a call (about two cents a year) and is the only change here
   that makes the replies better.

What *not* to do: build a response library, a rule classifier, a template
rotation, an approval queue or a learning loop for this surface. The data does
not support any of them, and the whole feature costs three cents.

If you want the library pattern anyway, **it is already written** — read
`lib/closer/config.ts` and the `closer_config` table. That is the cheap,
approvable, no-AI design, running on social, where comments genuinely do
repeat.

---

## 10. The two closing questions

**Can we realistically handle most of our social-media comments without
generating a new OpenAI response every time?**

For social media: **yes, and you already do** — Closer has never made an AI
call. For in-app study comments: **no.** Measured on all 571, a template
system would handle 0.4% of them. They are unique personal reflections, which
is exactly what makes them worth replying to.

**What is the cheapest, simplest, reliable way to do that with the
infrastructure we already have?**

The cheapest reliable system for study comments is the one already running —
one 260-token `gpt-4o-mini` call per unique reflection, at three cents for
everything ever sent — with a per-person daily cap, failure marking, and the
real study context in the prompt. The cheapest reliable system for social
comments is `closer_config`, which is already there.

The money is not here. It is in the Claude subscription and in Vercel build
CPU, both already documented.

---

### Measured versus estimated

**Measured:** every figure in sections 1, 2, 3, 6 and 8 — comment counts,
uniqueness, lengths, categories, the backtest, the 17 October burst, the
eight-day gap, the token profile, and the code paths (one call per reply, no
classification, no moderation, no retries, no caching).

**Estimated:** the dollar figures in section 7. Token counts are measured; the
per-token rates are gpt-4o-mini list prices I did not read from your billing.
Confirm them on the OpenAI dashboard — but note that an error of 10× still
leaves the annual cost under fifty cents.

**Not verified:** why the cron stopped on 25 October (needs Vercel's
environment variables and cron logs, which I cannot read from here), and
whether `app/api/groups/[groupId]/auto-reply` is truly dead rather than merely
unreachable from the closed groups page.
