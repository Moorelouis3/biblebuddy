# Email: revised plan after the dedupe check — 11 November 2026

**Nothing has been activated, scheduled, sent, paused or deleted.** This is the
corrected plan for review. Companion: `docs/EMAIL_BUCKETS_AUDIT_2026-11-11.md`.

> **One deadline.** `friday-03-study-guides` is armed for **Friday 13 November
> 13:00** and will send unless it is paused. Nothing else fires before then.

---

## 0. A third email stream nobody has mentioned

Before the calendars, something that changes them.

`/api/cron/weekly-newsletter` runs **every Tuesday at 08:00 UTC** and does not
read from a list of pre-built rows — it **creates and arms a new campaign each
week by itself**, setting `scheduled_for` so it jumps ahead of the queue. Its
own header says so: *"TO STOP IT: pause the row (status 'paused'), or remove the
cron entry."*

It is live and running. `newsletter-2026-11-10` went to 5,063 people yesterday.

So there are **three** streams, not two:

| Stream | How it fires | In the spec? |
|---|---|---|
| Weekly newsletter | self-arms every Tuesday | **No** |
| Friday teaching series | 11 pre-built armed rows | as "legacy" |
| Part 2 Bible Insights | the new calendar | yes |

**This matters twice.** Pausing rows will not stop the newsletter — it builds a
fresh one next Tuesday. And **24 November is a Tuesday**, so the newsletter and
the approved Part 2 email land on the same day.

### How much mail the list is already getting

Twelve campaigns went out between 10 Oct and 10 Nov — **eight of them in the
last fourteen days** (28, 30 Oct; 1, 3, 4, 6, 8, 10 Nov). That is already close
to every other day, before the new three-day calendar is added on top.

Worth saying plainly because of the bounce history: the 9 Nov suppression pass
put the rate at 3.29% against SES's 5% suspension threshold. Adding a stream
without removing one pushes volume the wrong way. **The new calendar is not
safely additive** — something has to stop.

---

## 1. Which existing sends are duplicates

Checked by reading the **delivered body** of every sent campaign, not the id or
subject. All four Genesis emails went to essentially the same audience
(5,218–5,268 recipients), so "already received" means the whole list.

| # | Sent | Recipients | What it actually taught |
|---|---|---|---|
| 01 | 28 Oct | 5,218 | Cain's fear. Gen 4:14 "every one that findeth me", 4:12 fugitive, 5:3–4 Adam's other sons and daughters |
| 02 | 1 Nov | 5,236 | Does Gen 2 contradict Gen 1. Gen 1:27 image of God, 2:7 formed from dust; wide shot vs close-up |
| 03 | 6 Nov | 5,261 | Gopher wood. Gen 6:14 material and pitch, 7:6; ark dimensions |
| 04 | 8 Nov | 5,268 | "Let us make man" — who is "us". Gen 1:26, Gen 11, Matt 3:16–17; study launch |

Against the seven approved November emails:

| Approved | Verdict |
|---|---|
| **Nov 12 — Who Was Cain Afraid Of** | 🔴 **Exact duplicate of #01.** Same question, same passages (Gen 4:12–15, 5:4), same audience, 14 days ago. **Drop.** |
| **Nov 15 — Rivers of Eden** | 🟢 **Clear.** #02 covered Gen 2:7, never the rivers. Pishon, Gihon, Hiddekel, Euphrates have not been sent. Confirmed against all twelve sent campaigns |
| **Nov 18 — Eve** | 🟢 **Clear.** Fruit never named an apple, Adam present, Chavvah, Gen 4:25 — none sent. Faint adjacency only: #02 quoted Gen 1:27 |
| **Nov 21 — 5 Things in Genesis 1** | 🟡 **Partial overlap, needs your call.** Point 1 (Spirit at the beginning, Gen 1:2, John 1) retreads the Trinity beat of **#04**, three weeks earlier. Point 5 (image of God, Gen 1:27) was quoted in **#02**. Points 2, 3 and 4 — light before the sun, order, plants before lights — are new |
| **Nov 24 — Why Did God Choose Noah** | 🟢 **Clear.** #03 was ark *construction*; this is Gen 6:8–9 grace and righteousness. Different question in a shared chapter |
| **Nov 27 — 5 Things About Noah's Ark** | 🟡 **Low overlap.** #03 covered the ark's material and size; this covers animals, duration, raven and dove, God shutting the door, fountains of the deep. Different facts about the same object — but it is the second "ark detail" email to the same people |
| **Nov 30 — First Thing Noah Did** | 🟢 **Clear.** Gen 8:15–22 altar and seasons. Not sent. Deliberately builds on Nov 27's clean animals |

**One duplicate to drop (Nov 12), two to decide on (Nov 21, Nov 27).** My
recommendation: send Nov 21 with points 1 and 5 trimmed to a sentence each, and
send Nov 27 unchanged — its five facts are genuinely new even if the subject
rhymes with #03.

---

## 2. Legacy campaigns: exactly what to disable

Sixteen armed. Proposed treatment, nothing done:

### Disable — 11 rows, the nonholiday Friday series

`friday-02-what-is-the-bible` (19 Feb 27), **`friday-03-study-guides` (13 Nov — the deadline)**,
`friday-04-read-the-context` (27 Nov — collides with approved Noah's Ark),
`friday-05-highlight-with-purpose` (4 Dec), `friday-06-people-and-places` (11 Dec),
`friday-07-take-notes` (8 Jan), `friday-08-review-what-you-read` (15 Jan),
`friday-09-fit-your-life` (22 Jan), `friday-10-study-together` (29 Jan),
`friday-11-ask-your-question` (5 Feb), `friday-12-build-your-routine` (12 Feb).

Method: `status = 'paused'`. **Reversible.** Copy, send history and
`email_campaign_sends` untouched. Note `friday-01-understand-the-bible` already
sent on 30 Oct and stays `done` — history is never rewritten.

### Keep as optional candidates — 3 rows, your instruction

| Row | Date | Note for you |
|---|---|---|
| `friday-themed-thanksgiving-2026` | **20 Nov** | Thanksgiving is **26 Nov**. Six days early. Move, keep, or drop |
| `friday-themed-first-christmas-2026` | 18 Dec | Collides with approved **Dec 18** Sodom email |
| `friday-themed-christmas-day-2026` | 25 Dec | You said Christmas needs no separate email unless we add one |

### Decide separately — 2 rows

- `friday-themed-new-year-2027` (1 Jan 2027) — not Thanksgiving or Christmas, so
  not covered by your "keep as candidates" instruction either way.
- `systeme-5303010` (**18 Apr 2027**) — "Where did the pitchfork come from?", a
  leftover from the Systeme era, armed nearly eighteen months out. Almost
  certainly should be paused, but it is not a Friday row so I have not assumed.

### The newsletter needs a different mechanism

Pausing rows cannot stop it. Options, in order of how reversible they are:
**(a)** leave it and accept Tuesday newsletters alongside Part 2, moving the
24 Nov Part 2 email to the 25th; **(b)** remove the cron entry from
`vercel.json` — a code change, instantly restorable; **(c)** pause each new row
by hand every Tuesday, which will be forgotten. **Recommendation: (a) or (b),
your call on whether the weekly newsletter continues at all.**

---

## 3. The final calendars

### November — six emails, Cain dropped

| Date | Subject | Status |
|---|---|---|
| ~~12 Nov~~ | ~~Who Was Cain Afraid Of~~ | **Dropped — sent 28 Oct** |
| **15 Nov** | The Rivers of the Garden of Eden Explained 🌊 | Approved, clear |
| **18 Nov** | I Bet You Didn't Know This About Eve... 🤯 | Approved, clear |
| **21 Nov** | 5 Things You May Have Missed in Genesis 1 🤯 | Approved; trim points 1 and 5? |
| **24 Nov** | Why Did God Choose Noah? 🤯 | Approved. **Tuesday — newsletter clash** |
| **27 Nov** | 5 Things You Didn't Know About Noah's Ark 🤯 | Approved. Legacy row on same day |
| **30 Nov** | The First Thing Noah Did After the Flood 🤯 | Approved, clear |

Also live in November: Thanksgiving-themed (20th) if kept, newsletters on the
17th and 24th if the cron stays.

### December — ten dates, one body

The study is **The Obedience of Abraham**, Genesis 9 – 25:11. Every topic falls
inside that range, which I checked.

| Date | Subject | Passage | Copy |
|---|---|---|---|
| 3 Dec | They Built UP. God Came DOWN! | Gen 11 | **Approved, in the Notion prompt** |
| 6 Dec | Why Did God Scatter the People at Babel? | Gen 11 | Not written |
| 9 Dec | Who Was Melchizedek? | Gen 14 | Not written |
| 12 Dec | Why Did Sarah Give Hagar to Abraham? | Gen 16 | Not written |
| 15 Dec | Who Was Hagar, and Why Did She Run Away? | Gen 16 | Not written |
| 18 Dec | Why Did God Destroy Sodom and Gomorrah? | Gen 19 | Not written |
| 21 Dec | Why Did Lot's Wife Turn Into Salt? | Gen 19:26 | Not written |
| 24 Dec | Why Did Sarah Laugh When God Promised a Son? | Gen 18 | Not written |
| 27 Dec | Why Did God Tell Abraham to Sacrifice Isaac? | Gen 22 | Not written |
| 30 Dec | Why Did Abraham Send His Servant to Find Isaac a Wife? | Gen 24 | Not written |

**Three things to confirm before any December copy is written:**

1. **Dec 3 and Dec 6 are both Babel (Gen 11).** Building up / God coming down,
   then the scattering. Intended as two halves, or one email?
2. **Dec 12 and Dec 15 are both Hagar (Gen 16).** Sarah giving her, then Hagar
   running. Same question.
3. **Dec 3 touches ground #04 already walked.** The 8 Nov "Let us make man"
   email used **Gen 11:7** — "let us go down" — as its second example of divine
   plural speech. The Babel descent is therefore not entirely new to this list.
   Worth a line acknowledging it rather than presenting it as a fresh discovery.

Only the Dec 3 body exists. I have not drafted or scheduled placeholders.

---

## 4. How the buckets will work

### Bucket 2 — already correct, one line to change

`marketing_recipients(campaign_id)` already does the right thing: eligible
(suppression absolute), in the target groups, and **not already sent this
campaign** — keyed `(campaign_id, email)`. Because a campaign sends to whoever
is eligible *when it fires*, "never backfill" is true by construction: someone
who joins on the 20th simply is not in the 18th's send. Nothing to build.

One line added excludes anyone mid-welcome:

```sql
and e.welcome_completed_at is not null
```

### Bucket 1 — the part that does not exist

Two nullable columns:

```sql
alter table public.email_subscribers
  add column if not exists welcome_step smallint;        -- null = never enrolled
alter table public.email_subscribers
  add column if not exists welcome_completed_at timestamptz;
```

**Anchor the cohort once, at the cutoff.** Every subscriber existing at
**11 November 2026** gets `welcome_step = 5` and
`welcome_completed_at = <cutoff>` — permanently Bucket 2, and no later
recomputation can pull them into the funnel. That is your rule 3 and the spec's
"anchored to the cutoff, not recomputed later".

**Five rows** — `welcome-1` … `welcome-5`, `kind = 'transactional'`, carrying the
approved bodies verbatim with their images and formatting. The existing
`/api/cron/welcome-email` grows a step pointer: send step N+1 only when step N
is recorded and at least ~24h old; after step 5, set `welcome_completed_at`.

**"Never twice" is free.** `email_campaign_sends` is keyed `(campaign_id, email)`,
so a subscriber who unsubscribes and re-subscribes cannot replay the funnel, and
a retried run cannot double-send. No new mechanism.

**The existing single `welcome` row is not reused as Day 1** — your instruction.
It gets paused once `welcome-1` is live, and its 387 historical sends stay.

### Worked example — your 16 → 18 November case

| | |
|---|---|
| Signs up 11 Nov | `welcome_step = 1`, `welcome_completed_at` null → **invisible to Part 2** |
| 12–16 Nov | Welcome 1…5, one per day |
| Welcome 5 recorded 16 Nov | `welcome_completed_at = 16 Nov` |
| 18 Nov campaign fires | **Included**, with everyone else |
| 15 Nov campaign | **Not** sent to them, then or ever — no backfill |

Finishing on the 19th means the next broadcast is the 21st. Finishing after a
day's send has gone means they join the next one, never a catch-up.

---

## 5. What is still missing before launch

| Missing | Blocking | Note |
|---|---|---|
| **Google Play URL** | Day 1 | Not inventing one. Proposed: use **https://www.mybiblebuddy.net** for the Android line until the listing is confirmed, as you directed |
| **Day 2 GIF hosted publicly** | Day 2 | A Drive viewer link is an HTML page, not an image, and will not render. Proposed: **Supabase storage**, which is where the existing email banners live. `/public` 404s until a deploy, so it is the wrong home |
| **Day 3 image hosted publicly** | Day 3 | Same. Also must be **JPEG or PNG, not webp** — Outlook cannot render webp |
| **Six December bodies** | 6–30 Dec | Dec 3 approved; the rest are a calendar only |
| **Dec 3/6 and Dec 12/15 overlaps** | December | §3 |
| **Nov 21 and Nov 27 decisions** | 21, 27 Nov | §1 |
| **Newsletter decision** | 17, 24 Nov | §2 — it self-arms |
| **Thanksgiving / Christmas / New Year / systeme rows** | 20 Nov onward | §2 |

---

## 6. The exact changes I propose — none of them made

In order. Each is reversible and each needs your word.

**Step 1 — before Friday 13 Nov.** Set `status='paused'` on
`friday-03-study-guides`. One field, one row. Buys time for everything else.

**Step 2 — pause the other 10 Friday rows.** Same single field. No copy, send
history, engagement data or subscriber record is touched. Nothing is deleted
anywhere in this plan.

**Step 3 — decide the newsletter**, because pausing cannot stop it.

**Step 4 — add the two nullable columns** and anchor every existing subscriber
to Bucket 2 at the 11 Nov cutoff. Additive; no behaviour changes yet.

**Step 5 — add one line to `marketing_recipients`.** Until step 6 exists, no
subscriber has a null `welcome_completed_at`, so this changes nothing — which is
the point of doing it before the funnel rather than after.

**Step 6 — create `welcome-1`…`welcome-5`** with the approved bodies, and teach
the welcome cron to walk the steps. Blocked on the Play URL and the two images.

**Step 7 — create the six November Part 2 rows**, dated 15, 18, 21, 24, 27, 30,
left `paused` until you say otherwise, so nothing can fire early.

**Step 8 — dry-run everything** before a single row is armed: the 16→18 Nov
case, the no-duplicate check across both buckets on every shared date, and the
unsubscribe-mid-funnel case. All `SELECT`s against `marketing_recipients` with a
frozen date; `sendCampaign` already has a `dryRun` flag.

Nothing in steps 1–8 deletes a send record, an engagement row or a subscriber.
The only destructive-looking operation in the whole plan is `status='paused'`,
which is one reversible field.

---

## 7. DONE on 11 Nov: everything scheduled is paused

Louis: *"pause all old emails that are scheduled we are building a whole new
thing - remove all old emails and welcome emails - we are building it over with
the first 5 welcome funnel first"*.

**17 rows set to `status='paused'`. Verified: 0 marketing campaigns armed
anywhere, and 0 would send on the next tick.** Friday's email is stopped.

### Paused — restore with `status='sending'` on these ids

`friday-03-study-guides`, `friday-themed-thanksgiving-2026`,
`friday-04-read-the-context`, `friday-05-highlight-with-purpose`,
`friday-06-people-and-places`, `friday-themed-first-christmas-2026`,
`friday-themed-christmas-day-2026`, `friday-themed-new-year-2027`,
`friday-07-take-notes`, `friday-08-review-what-you-read`,
`friday-09-fit-your-life`, `friday-10-study-together`,
`friday-11-ask-your-question`, `friday-12-build-your-routine`,
`friday-02-what-is-the-bible`, `systeme-5303010`, `welcome`

`scripts/pause-legacy-email-campaigns.ts --restore` does it, or set the field by
hand. The script also wrote `tmp/paused-campaigns-restore.json`, but that folder
is gitignored, which is why the list is here.

### Paused, not deleted — and why that is not me being cautious for its own sake

`email_campaign_sends` (68,188 rows) is keyed `(campaign_id, email)` and is the
**only** thing stopping a subscriber receiving the same campaign twice —
`marketing_recipients` joins against it on every run. Deleting send history
would not tidy anything up. It would re-arm 68,188 duplicate sends the instant
any paused campaign was resumed, and it is the same table that will make the new
five-step welcome funnel idempotent. It is load-bearing for the thing being
built next.

Intact and verified after the pause: 58 campaigns with their copy and dates,
68,188 send records, 5,584 subscribers, 766 suppressions.

### Still running on purpose — the four per-person app triggers

`study-nudge`, `streak-at-risk`, `finished-devotional`,
`community-start-beginning-of-everything`. These are product behaviour, not the
campaign calendar. Say the word if you want them off too.

### Two consequences to know about

1. **New signups now get no welcome at all** until `welcome-1`…`welcome-5`
   exist. At roughly 20 signups a day that is ~20 people a day receiving
   nothing. Restoring the old one is one field if you would rather it ran during
   the build.
2. **The Tuesday newsletter is not stopped by this.**
   `/api/cron/weekly-newsletter` builds and arms a *fresh* row every Tuesday
   08:00 UTC, so pausing today's rows does not prevent **Tuesday 17 November**.
   Stopping it needs the cron entry removed from `vercel.json` — a code change,
   instantly restorable. That decision is still open.
