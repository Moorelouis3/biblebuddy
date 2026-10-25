# The monthly study club: October results, November launch, twelve-month model

Written 2026-10-25. Every number in Part 1 came out of the production
database today; the sources are listed at the bottom so they can be re-run on
the 1st when October is actually finished.

**Read this first: October is not over.** The Wisdom of Proverbs runs
1–31 October and today is the 25th. Day 25 unlocked this morning. Nobody can
have finished 31 days yet, and the last week of a study is where the
stragglers catch up. Treat these as the standings at day 25, not the final
score.

---

# Part 1 — What actually happened in October

## 1. Signups: 252, not 250

`community_event_members` holds **252 rows for `wisdom-of-proverbs`, one per
person, no duplicates.** The ~250 figure was right.

| | |
|---|---|
| Total joined | **252** |
| Joined in September (before it started) | 148 (59%) |
| Joined in October (after it started) | 104 (41%) |
| Opted into reminders | 104 (41%) |
| First join | 2 September |
| Last join | 25 October (they are still arriving) |

Joining stayed steady all the way through — 13 on 1 October, and 23 in the
last four days. **A dated study keeps recruiting after the start date.** The
"join late, catch up" door is being used, not ignored.

Two separate things fed it:

- **The event page.** 9,233 banner impressions → 461 banner clicks (5.0%) →
  1,368 event-page views → joins. *Caveat: those three numbers are event
  counts, not people — banner and page-view rows carry no user id and no
  usable session id, so they cannot be deduplicated. Only the 252 is a
  person count.*
- **The one-time popup.** 717 impressions → 310 join clicks → **131
  successful joins.** The popup is doing roughly half the recruiting on its
  own, off one impression per person.

## 2. How many actually read: 173 opened a day, 136 completed one

This is where the story turns, and it needs one piece of plumbing explained:
**joining the event and reading the devotional are two different records.**
`devotional_progress` is the reading; `community_event_members` is the
signup. They overlap far less than you would expect.

| | |
|---|---|
| People with any Proverbs reading row | **173** |
| …who had joined the event | 64 |
| …who had **never** joined the event | **109** |
| People who completed at least one day | **136** |
| Event members who opened a day | 64 of 252 = **25.4%** |
| Event members who completed a day | 63 of 252 = **25.0%** |

Read those last two lines twice. **Three out of four people who signed up in
October never opened day one.** And at the same time, 109 people read
Proverbs without ever signing up — they came in through the Library or the
dashboard, not through the event.

Total unique humans who touched Proverbs in any way: **361**.

## 3. Completion: 1, 7, 15, 31 days

Among **all 173 readers** (the honest denominator for "did people read it"):

| Completed at least | People | % of 173 readers | % of 252 signups |
|---|---|---|---|
| 1 day | **136** | 79% | 54% |
| 3 days | 38 | 22% | 15% |
| 7 days | **17** | 10% | 6.7% |
| 10 days | 12 | 7% | 4.8% |
| 15 days | **7** | 4% | 2.8% |
| 20 days | 6 | 3.5% | 2.4% |
| 25 days | 1 | 0.6% | 0.4% |
| 31 days | **0** | — | *not yet possible* |

Among the **252 event members only**: 63 completed at least 1 day, 12 reached
7 days, 5 reached 15 days, 0 reached 25.

466 day-completions were recorded in total.

## 4. Average and median progress

| Denominator | Average days completed | Median |
|---|---|---|
| All 173 readers | 2.69 | **1** |
| Readers with at least one completed day (136) | 3.43 | **1** |
| All 252 signups | 1.19 | **0** |

**The median participant completed one day.** The average is dragged up by a
handful of people doing the whole thing. Whatever story we tell about
October, "the typical person read one day" is the true middle of it.

The day-by-day drop is the sharpest fact in this report — distinct people
completing each day:

```
day  1 ████████████████████████████████████████████████  122
day  2 ██████████████████                                 46
day  3 ██████████████                                     35
day  4 ███████████                                        27
day  5 ██████████                                         25
day  7 ███████                                            17
day 10 ██████                                             15
day 14 █████                                              13
day 17 ████                                                9
day 21 ███                                                 8
day 24 ██                                                  6
```

**62% of everyone who finished day one never finished day two.** After day 7
the line is essentially flat — roughly 13 people, then 8, who were always
going to finish. The entire retention problem for a monthly study lives
between day 1 and day 3.

## 5. Staying active through October

Of the 252 signups, measured against every action they took anywhere in the
app (`master_actions`, 1–25 October):

| | |
|---|---|
| Did anything at all in the app in October | **158 of 252 (63%)** |
| Active 1–7 October | 73 |
| Active 8–14 October | 67 |
| Active 15–21 October | 70 |
| Active 22–25 October | 48 |
| Active in **all four** windows | **19** |
| Active in week 1 **and** still active 22–25 October | 22 of 73 (30%) |

For scale, the whole app had **652 active users** in the same period. So the
Proverbs cohort is about a quarter of the active base, and 19 people are the
hard core who showed up every single week.

Worth noticing: the weekly member count barely moved (73 → 67 → 70 → 48) even
though it is largely *different* people each week. The study is holding a pool
of roughly 70 loosely-attached readers rather than marching a cohort through.

## 6. Did they engage with the community feed? Yes — they are the feed

25 daily discussion posts were published, one per day, on schedule.

| | |
|---|---|
| Replies to daily discussion posts | **182** |
| Distinct people who replied | **38** |
| …who were event members | **37 of 38** |
| Members with any feed / group action in October | 53 |
| **All-app** users with any feed / group action in October | **59** |

**90% of all community activity in Bible Buddy in October came from Proverbs
participants.** The community study is not a feature sitting next to the
feed — right now it *is* the reason the feed has anything in it.

Replies per day follow the same curve as completions: 25 on day 1, 20 on day
5, 6 on day 8, then between 1 and 6 for the rest of the month. Day 19 got a
single reply.

There is a second, quieter version of the same number: 136
`devotional_reflection_saved` actions from 34 people. Reflections written on
the day page post into the daily discussion, which is why the two numbers
agree.

## 7. Amazon clicks: four people. Ever.

Tracking exists and it is good — every book surface reports. The answer is
just very small.

| Event | Clicks | Unique people |
|---|---|---|
| Book banner shown | 471 | 168 |
| Book banner clicked | 25 | 22 (13.1% of viewers) |
| Books page viewed | 71 | 57 (42 of them members) |
| **Paperback → Amazon** | **5** | **3** |
| Hardcover → Amazon | 1 | 1 |
| Journal → Amazon | 4 | 2 |
| **Any Amazon link** | 10 | **4** |

In October specifically: **two Amazon clicks, on 7 and 8 October.** That is
the whole month.

The leak is the books page, not the promotion. 57 people reached it, 4 left
it for Amazon — a **7% click-through**. The banner that sends them there
converts at 13%, which is healthy. We are getting people to the shop window
and losing them at the glass.

## 8. Paperback sales: nothing is attributable, and that is structural

**What we know:** nothing. There is no sales figure anywhere in this project.
No `book_sales` table, no orders table, no KDP export committed, no royalty
numbers in any doc except the pre-publication pricing worksheets.

**What cannot be attributed, and why:**

- Amazon passes no referrer back. A click leaves and the trail ends.
- The links carry no Amazon Associates tag, so there is no affiliate report
  to read either.
- KDP reports units by title and marketplace, never by source. A sale cannot
  be told apart from someone who found the book by searching Amazon.
- Four identified clickers is below any threshold where a conversion rate
  would mean anything. One sale among them would read as 25%.

So: **October's book revenue, whatever it was, cannot honestly be credited to
the app.** If a copy sold, the most we can say is that four people clicked.

The fix for November is one line of work, not a system: put an Amazon
Associates tag on every outbound book link. Then KDP reports units and
Associates reports clicks-to-orders, and the two can be compared. Everything
before that is guessing.

## 9. What worked, what didn't, what changes

**Worked**

1. **The free-study-with-a-dated-start format.** 252 people signed up for a
   Bible study in a month, with no payment and no friction. It is still
   recruiting on day 25.
2. **The popup.** 131 joins from 717 impressions, one per person. The
   cheapest acquisition surface in the product.
3. **Late joining.** 104 of 252 joined after the start. Keep the door open;
   it is being used.
4. **The daily discussion.** It produced 90% of the app's community activity.
   This is the strongest argument for running a study every month.
5. **The reusable engine.** `COMMUNITY_EVENTS` is config, not code. November
   is an entry in a list, which is exactly how it should be.

**Didn't work**

1. **The gap between joining and starting.** 188 of 252 signups never opened
   day one. This is the single biggest loss in the whole funnel and it is
   bigger than every other problem combined.
2. **Day 1 → day 2.** A 62% drop. Nothing in the product currently fights for
   day two specifically.
3. **"Weekly emails."** One Proverbs email went out in 25 days
   (`newsletter-2026-10-13-wisdom`: 5,019 delivered, 83 bounced, 92 unique
   clickers through to `/devotionals/wisdom-of-proverbs`, a 1.8% unique click
   rate). The weekly cadence was a plan, not a thing that happened.
   *(Reminder from the email work: opens here are all bots. 92 clicks is the
   real number.)*
4. **The books page.** 7% click-through to Amazon from people who
   deliberately went there.
5. **Signup ≠ reader as a data model.** 109 people read Proverbs without ever
   appearing in the event. We have been reporting the wrong denominator to
   ourselves in both directions.

**Change for November**

1. **Make joining start the study.** Joining should open day 1 immediately,
   in the same click, and the "you're in" screen should be day 1's first
   paragraph — not a confirmation. 188 people is too many to leave on the
   doorstep.
2. **Fight for day 2, not day 31.** One reminder, the morning after someone
   completes day 1. Nothing else in the funnel is worth as much.
3. **Actually send the weekly email.** Four sends, dated now, Fridays, each
   linking to that week's day. One send produced 92 clickers; four sends is
   the difference between a channel and an anecdote.
4. **Tag the Amazon links.** Associates tag on every outbound book link
   before the 1st.
5. **Count readers, not signups, as the headline.** Report "N people read a
   day" first and "N signed up" second.

---

# Part 2 — November launch checklist: The Beginning of Everything

**Featured study:** The Beginning of Everything — Genesis 1–8, 21 days,
1–21 November.

## What already exists (verified in the database today)

- **The devotional is live and complete.** `devotionals` row
  `486cff66-b50e-488d-9330-3951589e6fa8`, "A 21-Day Study of Genesis 1-8",
  published, `available_from = 2026-11-01`, cover
  `/beginning-of-everything-cover.webp` (the file is present), `sort_order` 5.
- **All 21 days are seeded** with real text (8,900–13,000 characters each), a
  Genesis chapter on each, and a reflection question on every one. Genesis 1
  across days 1–4, through to Genesis 8 on days 18–21.
- **Audio needs no work.** Day pages generate narration on demand through
  `/api/tts/devotional-overview`. Nothing to pre-render, nothing to pay for.
- **Its landing page already exists** (commit `5d6f3f5d`, today), carries the
  start date in one constant and switches its own copy over on the 1st. Its
  buy-the-book section reads `devotionals.paperback_url`, so the paperback
  appears there with no deploy once Amazon issues the ASIN and
  `scripts/link-printed-edition.mjs` sets it.
- Free reading, saved progress, the Library, the Plans card, the study
  switcher, the daily discussion cron, the day popup, the banner, the event
  page and reminder opt-in are all built and all ran in October. **November
  needs no new features.**

## Two things are broken and must be fixed before the 1st

**1. The November event is configured as the wrong study.**
`lib/communityEvents.ts` has `obedience-of-abraham` as the 1–21 November
event. `getActiveCommunityEvent()` picks whichever study is live, so **at
midnight Berlin on 1 November the banner, the home card, the daily popup and
the event page all start advertising Abraham** — a devotional with 15 of its
21 days seeded. The config has to be swapped to The Beginning of Everything
(`devotionalId: "486cff66-b50e-488d-9330-3951589e6fa8"`, 21 days, start
`2026-11-01`), with its own `intro`, `howItWorks`, `joinedLine` and
`dateRangeLabel` — those copy fields exist precisely because the page used to
hard-code Proverbs wording.

**2. The banner art file does not exist.** The Abraham entry points at
`/events/abraham-banner-art.png`, which is not in `public/events/` (only the
four Proverbs files are there). It is used as a CSS background in three
places, so all three would render bare. The new entry needs a real
`/events/beginning-of-everything-banner-art.png` committed alongside it.

Both of these are **step 1 under the deploy test if they are still live on
1 November** — the featured study being wrong for everybody is broken for more
than one person. Fixed and deployed before the 1st, they are step 3 and ride
the normal build.

## Checklist

**Before 1 November, ordered by what blocks what**

- [x] Swap the November entry in `lib/communityEvents.ts` to The Beginning of
      Everything. Slug `beginning-of-everything`, 21 days, start
      `2026-11-01`, `dateRangeLabel` "November 1–21". *(Done 25 Oct.)*
- [x] Commit `/events/beginning-of-everything-banner-art.webp` — a square
      crop of the book cover, so the banner, the Library card and Amazon all
      show the same artwork. *(Done 25 Oct.)*
- [x] Write the copy fields for Genesis, not Abraham. *(Done 25 Oct. Three
      more were added — `countdownSub`, `liveSub`, `evergreenSub` — because
      the banner still had Proverbs wording in its markup and would have read
      "Today: Proverbs 8" over a Genesis study.)*
- [x] Decide what happens to the Abraham entry — removed, because its
      devotional has 15 of its 21 days seeded. **Three people had already
      joined `obedience-of-abraham`; their rows are untouched and they are now
      enrolled in a study with no page. Louis's call what to do with them.**
- [x] Make the join action open day 1 in the same click (the October fix that
      matters most). *(Done 25 Oct, on both join surfaces — the event page and
      the popup that produced 131 of October's 252 joins. During the countdown
      there is no unlocked day, so the welcome card still does that job. The
      jump fires `community_event_day_started` with `source: "join"`, which is
      how November's signup → day 1 rate gets measured.)*
- [ ] Add the Amazon Associates tag to every outbound book link.
- [ ] Set `paperback_url` on the devotional row **if** a Genesis 1–8 paperback
      exists. If it does not, leave it null — the book strip hides itself, and
      a study with no book is still the right study to feature.
- [ ] Queue the four weekly emails now (a launch send on the 1st, then Fridays
      6, 13 and 20 November), each linking to that week's day. Use the Oct 13
      newsletter as the template; it is the only one with real clicks.
- [ ] Build the one-time join popup for the new study, copied from the
      Proverbs one. It produced 131 of 252 joins.
- [ ] Check the daily-discussion cron is pointed at the new event slug.
- [ ] Put the study's landing page link in the Instagram and Facebook bios
      (the page itself is already built).

**On 1 November**

- [ ] Confirm the banner, home card and event page all show Genesis.
- [ ] Confirm day 1 opens and day 2 is locked.
- [ ] Confirm the day-1 discussion post published and did **not** notify all
      ~6,000 group members.
- [ ] Send the launch email.
- [ ] Post to Instagram, Facebook and shorts.

**Weekly through November**

- [ ] Friday email, linking to that week's day.
- [ ] One progress post in the feed ("142 of us are on day 8").
- [ ] Check that the day-N discussion post published.

**Previous studies stay open.** Proverbs goes evergreen automatically on
1 November — `getCommunityEventState` returns `evergreen` and unlocks all 31
days, with the "All 31 days are open, go at your own pace" line. The Library
already lists every published study. New users in November can start
Proverbs, The Tempting of Jesus, 21 Women or Higher Hope on day one of
joining. **No work needed here; it is how the engine already behaves.**

**Promotion, honestly scoped:** Instagram, Facebook and short-form are the
channels named, and nothing in this project measures them except the share
page (95 views, 18 start clicks in October, mostly Instagram, Threads and
Pinterest referrers). Put the share-page link in every post and bio so
November's social traffic is at least countable.

---

# Part 3 — The twelve-month operating model

## The shape

One free featured study a month. Every previous study stays open and free.
Other devotionals may publish whenever, but exactly one is the community
study. Optional Amazon paperback. **No Lulu, no fulfilment, no paid physical
subscription** — that stays off the table, and nothing in this plan needs it.

The October evidence says the model is sound, for a reason that is not about
books: **a dated monthly study is the only thing generating community in this
app.** 90% of October's feed activity came from one devotional. That alone
justifies running one every month, before any revenue argument.

## What the model is good at, and what it isn't

**Good at:** recruiting (252 free signups in a month, still climbing on day
25), creating community (38 people in a daily conversation), and giving the
app a reason to email people something they actually want.

**Bad at, on current evidence:** selling books. Four clicks in two months. A
free study does not convert to a paid paperback at any rate we can measure.
The honest position is that **the book is a by-product of the study, not the
business model yet** — and the first job is to make the number measurable
rather than to assume it is bigger than it looks.

## Measurable goals

Set against verified October numbers, not hopes.

| Metric | Oct (day 25) | Nov target | Month 6 | Month 12 |
|---|---|---|---|---|
| Signups to the featured study | 252 | 275 | 400 | 600 |
| **Readers who open day 1** | 173 | **220** | 320 | 500 |
| **Signup → day 1 conversion** | **25%** | **45%** | 55% | 60% |
| Day 1 → day 2 | 38% | 50% | 55% | 60% |
| Completed 7+ days | 17 | 35 | 70 | 120 |
| Completed the whole study | 0 (of 31) | 12 (of 21) | 30 | 60 |
| Distinct discussion repliers | 38 | 50 | 90 | 150 |
| Weekly emails actually sent | 1 | **4** | 4 | 4 |
| Unique email clickers per send | 92 | 100 | 150 | 250 |
| Amazon outbound clicks | 2 | 25 | 75 | 150 |
| **Attributable orders** | unmeasurable | **first real number** | tracked | tracked |

The two in bold are the ones that matter. Signup → day 1 is where 188 people
were lost in October; fixing it roughly doubles the study without a single new
signup. And until the Associates tag is on, "attributable orders" stays the
word *unmeasurable* — that is the one number nobody is allowed to estimate.

A shorter study helps all of these. 21 days finishes; 31 days is a month-long
commitment that one person out of 252 is on pace for. **Keep the featured
study at 21 days or fewer.**

## Monthly reporting

One file per month, `docs/monthly-studies/YYYY-MM.md`, written on the 1st for
the month just finished, from the same sources as this report. Seven lines:

1. Signups, and how many joined after the start.
2. Readers who opened day 1, and the signup → day 1 rate.
3. Completed 1 / 7 / all days, plus the median.
4. The day-by-day drop-off, as the bar chart above.
5. Discussion repliers, and their share of all app community activity.
6. Emails sent, delivered, unique clickers. Clicks only — opens are bots.
7. Amazon clicks and, once tagged, attributable orders.

Then one paragraph: what to change next month. The queries are already
written; worth promoting them to `scripts/monthly-study-report.mjs` so the 1st
is one command rather than an afternoon.

This also feeds the night entry in `SESSION_LOG.md` on the 1st, so Life Buddy
picks it up without being asked.

## Improving retention without spending money

In order of evidence, best first:

1. **Join = start.** One click, day 1 opens. 188 people were lost here in
   October. Nothing else on this list is worth as much.
2. **The day-2 nudge.** One reminder the morning after day 1 completes. 62%
   of readers are lost at exactly this step, and the push and email
   infrastructure already exists.
3. **Finish the four weekly emails every month.** One send produced 92
   clickers. The infrastructure is built; the cadence simply is not happening.
4. **Name the finishers.** A feed post listing everyone who completed the
   study, and the "finished a devotional" email (that campaign already exists
   and is live). Finishing should be visible, because the 19 hard-core members
   are the people who recruit the next cohort.
5. **Keep studies at 21 days.** A finishable study produces finishers;
   finishers produce the social proof that recruits.
6. **Let late joiners start at day 1, not day N.** 41% joined after the start
   in October. They should not land in the middle of a conversation.
7. **Put the previous month's study in front of new users.** Someone who
   signs up on 15 November has a shelf of four finished studies and no reason
   to know it.

## Improving book sales without fulfilment spend

1. **Tag the links.** Associates tag on every outbound book link. Until this
   exists, every other item here is unmeasurable.
2. **Fix the books page, not the promotion.** 13% of people click the banner;
   7% of the people who arrive click through to Amazon. The page is the leak.
   One product, one price, one button — the current page offers paperback,
   hardcover and journal to someone who has not yet decided to buy anything.
3. **Ask the finishers, not the joiners.** The right moment to mention a
   paperback is the day someone completes the study — 19 people in October,
   all of whom demonstrably liked it. Asking 252 strangers on day 0 produced
   four clicks.
4. **One book per featured study, matched to the month.** The study is the
   advertisement; it only works if the book on offer is the book they just
   read.
5. **Keep it optional and keep it quiet.** The app is free and stays free.
   Nothing in October suggests pushing harder on the book would have sold
   more; it suggests the four people who clicked were the four people who were
   ever going to.

## What this plan deliberately does not do

- No Lulu, no fulfilment, no paid physical subscription, no shipping.
- No subscriptions of any kind.
- No new features for November. The engine from October runs it.
- No sales forecast. There is no attributable sales data to forecast from, and
  inventing one would be the most expensive mistake available here. The first
  honest revenue number arrives the month after the links are tagged.

---

## Appendix — where the numbers came from

All read-only, run 2026-10-25 against production with the service role.

| Question | Source |
|---|---|
| Signups, join dates, reminder opt-in | `community_event_members` where `event_slug = 'wisdom-of-proverbs'` |
| Readers, completions, averages, day funnel | `devotional_progress` where `devotional_id = 'c0ca300a-c0e9-47b8-84c5-99aca743a203'` |
| Active users, action mix, retention windows | `master_actions`, 1–25 October |
| Discussion replies | `community_event_day_posts` joined to `group_posts.parent_post_id` |
| Banner, popup and book funnel | `landing_page_events` |
| Email delivery and clicks | `email_events` by `campaign_id` |
| November content state | `devotionals` and `devotional_days` for `486cff66-b50e-488d-9330-3951589e6fa8` |

**Separation of evidence:** Part 1 is measured. The November checklist is
measured for "what exists" and recommendation for "what to do". Part 3's
targets are recommendations derived from October's verified baselines — they
are goals, not forecasts. No sales figure appears anywhere in this document,
because none exists.
