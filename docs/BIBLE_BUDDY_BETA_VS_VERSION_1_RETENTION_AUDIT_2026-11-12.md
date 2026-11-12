# Bible Buddy: Beta vs Version 1.0 retention audit

> **Official version history (Louis, 12 Nov 2026).** Bible Buddy Beta ended
> 30 September 2026. Bible Buddy Version 1.0 began 1 October 2026 and is the
> performance baseline. An earlier draft of this report called these
> "Version 1" and "Version 2"; only the names changed, no number did.

12 November 2026. Read-only against the production database (Supabase
project behind mybiblebuddy.net), Supabase Auth, the SES send and event
logs, and App Store Connect. Nothing was written, changed, deleted or sent.
Data runs to 12 Nov 2026 09:10 UTC.

---

## 1. Executive summary

**Version 1.0 is better at getting people started and at bringing them back in
their first week. Whether it produces more long-term studiers is not yet
measurable.**

Comparing email accounts with email accounts, and giving both versions the
same amount of time after signup:

| | Beta | Version 1.0 | Change |
|---|---|---|---|
| Did a first study action within 7 days | 14.5% | 24.6% | +10.1 points (+69%) |
| Studied on 2+ separate days in first 7 days | 3.4% | 7.5% | +4.1 points (+121%) |
| Came back and studied again in days 1–7 | 4.1% | 9.9% | +5.9 points (+144%) |
| Day 7 return | 0.7% | 3.7% | +3.0 points (about 5x) |
| Studied in days 8–14 | 2.1% | 3.1% | not a clear difference yet |
| 7+ study days in first 30 days | 1.0% | 0 of 94 | too few to tell |

All four of the top rows are outside the range chance would explain. The
bottom two are not, because only 94 Version 1.0 email accounts are 30 days old.

Four things the data says that differ from the brief's assumptions:

1. **The new welcome email started on 10 October, not 1 October.** And
   Beta was not entirely without one: an eight-email welcome series ran
   in real time from 31 July to 9 September.
2. **There is no evidence that the welcome email itself brings people back.**
   People whose welcome email bounced returned at least as often as people
   who received it. The numbers are small, but they do not point the way one
   would hope.
3. **The broadcast emails to the whole list do appear to bring legacy users
   back.** Returns from people who had been away 30+ days roughly doubled in
   the weeks those emails went out.
4. **The strongest early signal is the app, not email.** People who signed
   up inside the iOS app came back to study in their first week at about
   twice the rate of web signups. That rests on 27 people.

And one thing that supports Louis's point more strongly than he made it:
**1,064 Beta email accounts (22%) never signed in even once.** They
registered and never got through the door. In Version 1.0 that number is 3.

---

## 2. Verified timeline

Every date below was read from production records, not from memory.

| Date (UTC) | What changed | Evidence |
|---|---|---|
| 5 Dec 2025 | First account created | `auth.users` |
| 6 Jan 2026 | Study actions start being logged | first `chapter_completed` in `master_actions` |
| Jan – May 2026 | 1,058 of the 1,064 never-signed-in accounts were created here | `auth.users.last_sign_in_at` is empty |
| 31 Jul 2026 | First welcome email of any kind. Eight-email series, via Systeme.io | first row in `email_funnel_sends` |
| Aug 2026 | The series is back-sent to 4,147 older signups, a median of 118 days after they joined | `email_funnel_sends` vs account creation |
| Mostly Aug – 7 Oct 2026 | Anonymous guest accounts on: 1,924 accounts with no email | `auth.users.is_anonymous` |
| 9 Sep 2026 | Emails 2–8 of the series switched off. Only email 1 continues | last day-2 send |
| **1 Oct 2026** | **Official start of Version 1.0. No system change is recorded on this date itself** | — |
| 6–8 Oct 2026 | Guests switched off; signup with email becomes the only door | last guest account 7 Oct |
| **10 Oct 2026, 19:00** | **New welcome email goes live on SES**, sent about 8 minutes after signup | `email_campaigns.welcome.started_at`, first send 19:45 |
| 10 Oct 2026 | First broadcast to the whole list (5,208 people). About two a week since | `email_campaign_sends` |
| 25 Oct 2026 | Study-nudge and streak-at-risk emails begin (small: 44 and about 80 sends) | `email_campaign_sends` |
| **1 Nov 2026, 21:30** | **iOS app live on the App Store** | App Store Connect; first sales report 2 Nov |
| 3 Nov 2026 | App Store launch email to the list (5,022). Android testers invited | `email_campaign_sends` |
| 11 Nov 2026, 18:30 | Five-email welcome series replaces the single welcome. 13 sent so far | `welcome-1` sends |
| Not yet | Android public launch. One Android device registered, a tester | `native_push_tokens` |

So "Version 1.0" is not one thing. A person who signed up on 3 October got
the old product with guests still on and the old first email. A person who
signed up on 5 November could have had the app, the new welcome and the
broadcasts. Section 7 splits these apart.

---

## 3. Cohorts and definitions

### Who is counted

Account creation is `auth.users.created_at`. Each account sits in one cohort
for good; a legacy user who returns in November stays in Beta.

| | Accounts |
|---|---|
| All accounts in production | 7,374 |
| Excluded (see below) | 17 |
| **Eligible** | **7,357** |
| Beta, all (5 Dec 2025 – 30 Sep 2026) | 6,734 |
| — created before logging began (5 Dec – 5 Jan) | 162 |
| — **Beta, comparable (6 Jan – 30 Sep)** | **6,572** = 4,813 with email + 1,759 guests |
| **Version 1.0 (1 Oct – 12 Nov)** | **623** = 458 with email + 165 guests |
| — October | 460 (295 with email) |
| — November 1–12 | 163 (all with email) |

**Excluded from both periods (17 accounts):** Louis's accounts, the AI
moderator accounts, the human moderators, and test or probe addresses
(`@example.com`, `.test`, `.invalid`, `testing@`, `testerbible2025@` and the
site's own mailbox). No bot filter was needed
beyond that: every action counted here requires a signed-in account.

**The 162 December accounts are left out of the comparison** because no
study actions were logged before 6 January. Their early weeks cannot be
seen, and treating that as inactivity would be wrong.

### Why two versions of every table

Guest accounts were created automatically when someone tapped "start",
with no email and no way to be reminded. 1,759 of Beta's accounts are
guests, nearly all from August and September. Leaving them in makes
Beta look worse than the product was for people who registered. So
each comparison is shown twice: all accounts, as the brief specifies, and
email accounts only, which is the like-for-like one.

### What counts as a study action

From `master_actions`. A study action is something a person finished or
answered, not a screen they opened:

`chapter_completed`, `devotional_day_completed`,
`bible_in_one_year_reading_completed`, `bible_in_one_year_day_completed`,
`bible_in_one_year_trivia_completed`,
`bible_in_one_year_reflection_completed`, `trivia_question_answered`,
`trivia_chapter_completed`, `scrambled_word_answered`,
`scrambled_chapter_completed`, `keyword_mastered`, `person_learned`,
`place_discovered`, `reading_plan_chapter_completed`, `book_completed`,
`note_created`, `devotional_reflection_saved`, `verse_highlighted`,
`chapter_notes_reviewed`, `series_week_notes_opened`.

Section 5 repeats the main results with a broader definition that also
counts opening study notes, chapters and devotional days and asking Lil
Louis a question. The conclusions do not change.

### How time is measured

- All times UTC.
- "First 7 days" means the 168 hours after the account was created.
- "Day N return" means a study action between N×24 and (N+1)×24 hours after
  signup. Nothing else counts.
- "Studied again in days 1–7" means a study action between 24 hours and 8
  days after signup. The first 24 hours do not count.
- "Separate study days" are distinct UTC calendar dates.
- An account is only in a row's denominator if its whole window has passed.
  That is why Version 1.0's denominators shrink down the table.

---

## 4. Main comparison: equal time after signup

"95% range" is the range the true difference plausibly sits in. If it
crosses zero the verdict is "no clear difference". "Too few to tell" means
Version 1.0 has too few accounts old enough for the row to mean anything.

### 4a. Email accounts only (the like-for-like comparison)

| Metric | Beta | Version 1.0 | Difference | Relative | 95% range of difference | Verdict |
|---|---|---|---|---|---|---|
| Signed in at least once (auth record) | 3749 / 4813 (77.9%) | 455 / 458 (99.3%) | +21.5 pts | +28% | 20.1 to 22.8 pts | better |
| Any in-app action logged, first 7 days | 3603 / 4813 (74.9%) | 368 / 374 (98.4%) | +23.5 pts | +31% | 21.8 to 25.3 pts | better |
| 1+ study action, first 24h | 629 / 4813 (13.1%) | 97 / 447 (21.7%) | +8.6 pts | +66% | 4.7 to 12.6 pts | better |
| 1+ study action, first 7 days | 700 / 4813 (14.5%) | 92 / 374 (24.6%) | +10.1 pts | +69% | 5.6 to 14.5 pts | better |
| 3+ study actions, first 7 days | 509 / 4813 (10.6%) | 67 / 374 (17.9%) | +7.3 pts | +69% | 3.4 to 11.3 pts | better |
| 10+ study actions, first 7 days | 192 / 4813 (4.0%) | 45 / 374 (12.0%) | +8.0 pts | +202% | 4.7 to 11.4 pts | better |
| Completed 1+ chapter/devotional/plan day, first 7 days | 502 / 4813 (10.4%) | 69 / 374 (18.4%) | +8.0 pts | +77% | 4.0 to 12.0 pts | better |
| 2+ separate study days, first 7 days | 163 / 4813 (3.4%) | 28 / 374 (7.5%) | +4.1 pts | +121% | 1.4 to 6.8 pts | better |
| 3+ separate study days, first 7 days | 85 / 4813 (1.8%) | 12 / 374 (3.2%) | +1.4 pts | +82% | -0.4 to 3.3 pts | no clear difference |
| 2+ separate study days, first 14 days | 188 / 4813 (3.9%) | 19 / 273 (7.0%) | +3.1 pts | +78% | -0.0 to 6.1 pts | no clear difference |
| 3+ separate study days, first 14 days | 104 / 4813 (2.2%) | 12 / 273 (4.4%) | +2.2 pts | +103% | -0.2 to 4.7 pts | no clear difference |
| 7+ separate study days, first 14 days | 35 / 4813 (0.7%) | 3 / 273 (1.1%) | +0.4 pts | +51% | -0.9 to 1.6 pts | too few to tell |
| 1+ study action, first 30 days | 743 / 4813 (15.4%) | 27 / 94 (28.7%) | +13.3 pts | +86% | 4.1 to 22.5 pts | better |
| 10+ study actions, first 30 days | 228 / 4813 (4.7%) | 13 / 94 (13.8%) | +9.1 pts | +192% | 2.1 to 16.1 pts | better |
| 2+ separate study days, first 30 days | 215 / 4813 (4.5%) | 10 / 94 (10.6%) | +6.2 pts | +138% | -0.1 to 12.4 pts | no clear difference |
| 3+ separate study days, first 30 days | 133 / 4813 (2.8%) | 5 / 94 (5.3%) | +2.6 pts | +92% | -2.0 to 7.1 pts | no clear difference |
| 7+ separate study days, first 30 days | 47 / 4813 (1.0%) | 0 / 94 (0.0%) | -1.0 pts | -100% | -1.3 to -0.7 pts | too few to tell |
| 14+ separate study days, first 30 days | 18 / 4813 (0.4%) | 0 / 94 (0.0%) | -0.4 pts | -100% | -0.5 to -0.2 pts | too few to tell |
| Day 1 return (studied 24-48h after signup) | 84 / 4813 (1.7%) | 21 / 430 (4.9%) | +3.1 pts | +180% | 1.1 to 5.2 pts | better |
| Day 3 return | 58 / 4813 (1.2%) | 9 / 405 (2.2%) | +1.0 pts | +84% | -0.5 to 2.5 pts | no clear difference |
| Day 7 return | 34 / 4813 (0.7%) | 13 / 352 (3.7%) | +3.0 pts | +423% | 1.0 to 5.0 pts | better |
| Day 14 return | 30 / 4813 (0.6%) | 3 / 256 (1.2%) | +0.5 pts | +88% | -0.8 to 1.9 pts | too few to tell |
| Day 30 return | 20 / 4813 (0.4%) | 1 / 85 (1.2%) | +0.8 pts | +183% | -1.5 to 3.1 pts | too few to tell |
| Studied again in days 1-7 | 196 / 4813 (4.1%) | 35 / 352 (9.9%) | +5.9 pts | +144% | 2.7 to 9.0 pts | better |
| Studied in days 8-14 | 103 / 4813 (2.1%) | 8 / 256 (3.1%) | +1.0 pts | +46% | -1.2 to 3.2 pts | no clear difference |
| Studied in days 15-30 | 101 / 4813 (2.1%) | 4 / 85 (4.7%) | +2.6 pts | +124% | -1.9 to 7.1 pts | too few to tell |
| Any in-app activity in days 1-7 | 609 / 4813 (12.7%) | 92 / 352 (26.1%) | +13.5 pts | +107% | 8.8 to 18.2 pts | better |
| Any in-app activity in days 8-14 | 268 / 4813 (5.6%) | 31 / 256 (12.1%) | +6.5 pts | +117% | 2.5 to 10.6 pts | better |
| Any in-app activity in days 15-30 | 288 / 4813 (6.0%) | 13 / 85 (15.3%) | +9.3 pts | +156% | 1.6 to 17.0 pts | better |

### 4b. All eligible accounts, guests included

| Metric | Beta | Version 1.0 | Difference | Relative | 95% range of difference | Verdict |
|---|---|---|---|---|---|---|
| Signed in at least once (auth record) | 5508 / 6572 (83.8%) | 620 / 623 (99.5%) | +15.7 pts | +19% | 14.7 to 16.8 pts | better |
| Any in-app action logged, first 7 days | 5224 / 6572 (79.5%) | 520 / 539 (96.5%) | +17.0 pts | +21% | 15.1 to 18.8 pts | better |
| 1+ study action, first 24h | 814 / 6572 (12.4%) | 115 / 612 (18.8%) | +6.4 pts | +52% | 3.2 to 9.6 pts | better |
| 1+ study action, first 7 days | 896 / 6572 (13.6%) | 111 / 539 (20.6%) | +7.0 pts | +51% | 3.4 to 10.5 pts | better |
| 3+ study actions, first 7 days | 645 / 6572 (9.8%) | 81 / 539 (15.0%) | +5.2 pts | +53% | 2.1 to 8.3 pts | better |
| 10+ study actions, first 7 days | 239 / 6572 (3.6%) | 52 / 539 (9.6%) | +6.0 pts | +165% | 3.5 to 8.5 pts | better |
| Completed 1+ chapter/devotional/plan day, first 7 days | 643 / 6572 (9.8%) | 82 / 539 (15.2%) | +5.4 pts | +55% | 2.3 to 8.5 pts | better |
| 2+ separate study days, first 7 days | 190 / 6572 (2.9%) | 31 / 539 (5.8%) | +2.9 pts | +99% | 0.9 to 4.9 pts | better |
| 3+ separate study days, first 7 days | 99 / 6572 (1.5%) | 13 / 539 (2.4%) | +0.9 pts | +60% | -0.4 to 2.2 pts | no clear difference |
| 2+ separate study days, first 14 days | 220 / 6572 (3.3%) | 22 / 438 (5.0%) | +1.7 pts | +50% | -0.4 to 3.8 pts | no clear difference |
| 3+ separate study days, first 14 days | 122 / 6572 (1.9%) | 14 / 438 (3.2%) | +1.3 pts | +72% | -0.3 to 3.0 pts | no clear difference |
| 7+ separate study days, first 14 days | 41 / 6572 (0.6%) | 3 / 438 (0.7%) | +0.1 pts | +10% | -0.7 to 0.9 pts | too few to tell |
| 1+ study action, first 30 days | 951 / 6572 (14.5%) | 47 / 259 (18.1%) | +3.7 pts | +25% | -1.1 to 8.4 pts | no clear difference |
| 10+ study actions, first 30 days | 284 / 6572 (4.3%) | 21 / 259 (8.1%) | +3.8 pts | +88% | 0.4 to 7.1 pts | better |
| 2+ separate study days, first 30 days | 251 / 6572 (3.8%) | 14 / 259 (5.4%) | +1.6 pts | +42% | -1.2 to 4.4 pts | no clear difference |
| 3+ separate study days, first 30 days | 156 / 6572 (2.4%) | 8 / 259 (3.1%) | +0.7 pts | +30% | -1.4 to 2.9 pts | no clear difference |
| 7+ separate study days, first 30 days | 56 / 6572 (0.9%) | 1 / 259 (0.4%) | -0.5 pts | -55% | -1.3 to 0.3 pts | too few to tell |
| 14+ separate study days, first 30 days | 20 / 6572 (0.3%) | 0 / 259 (0.0%) | -0.3 pts | -100% | -0.4 to -0.2 pts | too few to tell |
| Day 1 return (studied 24-48h after signup) | 106 / 6572 (1.6%) | 22 / 595 (3.7%) | +2.1 pts | +129% | 0.5 to 3.6 pts | better |
| Day 3 return | 72 / 6572 (1.1%) | 10 / 570 (1.8%) | +0.7 pts | +60% | -0.4 to 1.8 pts | no clear difference |
| Day 7 return | 40 / 6572 (0.6%) | 13 / 517 (2.5%) | +1.9 pts | +313% | 0.5 to 3.3 pts | better |
| Day 14 return | 37 / 6572 (0.6%) | 3 / 421 (0.7%) | +0.1 pts | +27% | -0.7 to 1.0 pts | too few to tell |
| Day 30 return | 21 / 6572 (0.3%) | 2 / 250 (0.8%) | +0.5 pts | +150% | -0.6 to 1.6 pts | too few to tell |
| Studied again in days 1-7 | 231 / 6572 (3.5%) | 38 / 517 (7.4%) | +3.8 pts | +109% | 1.5 to 6.1 pts | better |
| Studied in days 8-14 | 126 / 6572 (1.9%) | 10 / 421 (2.4%) | +0.5 pts | +24% | -1.0 to 2.0 pts | no clear difference |
| Studied in days 15-30 | 118 / 6572 (1.8%) | 7 / 250 (2.8%) | +1.0 pts | +56% | -1.1 to 3.1 pts | no clear difference |
| Any in-app activity in days 1-7 | 765 / 6572 (11.6%) | 106 / 517 (20.5%) | +8.9 pts | +76% | 5.3 to 12.4 pts | better |
| Any in-app activity in days 8-14 | 338 / 6572 (5.1%) | 40 / 421 (9.5%) | +4.4 pts | +85% | 1.5 to 7.2 pts | better |
| Any in-app activity in days 15-30 | 367 / 6572 (5.6%) | 21 / 250 (8.4%) | +2.8 pts | +50% | -0.7 to 6.3 pts | no clear difference |

### 4c. What holds and what does not

**Holds, in both tables:** more people sign in, more do a first study
action, more do several, more come back on a second day in week one, and
Day 1 and Day 7 return are both higher.

**Not established:** anything from the second week on. Days 8–14, Day 14,
Day 30 and the 30-day rows all lean Version 1.0's way but none clears chance.

**A caution on Day 7.** "About 5x" is 13 people out of 352 against 34 out
of 4,813. The direction is solid. The size is not: the plausible range is
+1.0 to +5.0 points.

**A caution on the 30-day rows.** They only contain people who signed up on
1–12 October, before the new welcome email and the app existed. They
describe the first twelve days of Version 1.0, not today's product.

### 4d. Among people who actually got in

Because 22% of Beta email accounts never signed in, part of the gap
above is "could not get in" rather than "got in and did not study".
Removing the never-signed-in accounts from Beta:

| | Beta, signed in (3,749) | Version 1.0 | Still better? |
|---|---|---|---|
| First study action within 7 days | 18.7% | 24.6% | Yes, +5.9 points |
| Studied again in days 1–7 | 5.2% | 9.9% | Yes, +4.7 points |
| Day 7 return | 0.9% | 3.7% | Yes, +2.8 points |

So roughly four-tenths of the first-action improvement is the door being
fixed, and the rest is what happens after people are inside.

---

## 5. Sensitivity: a broader definition of study

| Metric | Beta | Version 1.0 | Difference | Relative | 95% range of difference | Verdict |
|---|---|---|---|---|---|---|
| BROAD: 1+ study action, first 7 days | 1540 / 4813 (32.0%) | 195 / 374 (52.1%) | +20.1 pts | +63% | 14.9 to 25.4 pts | better |
| BROAD: 2+ separate days, first 14 days | 330 / 4813 (6.9%) | 35 / 273 (12.8%) | +6.0 pts | +87% | 1.9 to 10.0 pts | better |
| BROAD: 3+ separate days, first 30 days | 213 / 4813 (4.4%) | 10 / 94 (10.6%) | +6.2 pts | +140% | -0.0 to 12.5 pts | no clear difference |
| BROAD: Day 7 return | 53 / 4813 (1.1%) | 18 / 352 (5.1%) | +4.0 pts | +364% | 1.7 to 6.3 pts | better |
| BROAD: active in days 8-14 | 160 / 4813 (3.3%) | 19 / 256 (7.4%) | +4.1 pts | +123% | 0.8 to 7.3 pts | better |

Same direction, same conclusions. The result does not depend on where the
line between "studying" and "browsing" is drawn.

---

## 6. All-time observed activity (unequal observation, secondary)

**Do not use this table to judge the versions.** Beta accounts have
had up to ten months to accumulate days; some Version 1.0 accounts are a day
old. It is here because the brief asked for it and because it shows where
the old lifetime figure came from.

| Metric | Beta all (6572) | Beta email (4813) | v1.0 all (623) | v1.0 email (458) |
|---|---|---|---|---|
| Signed in at least once | 5508 (83.8%) | 3749 (77.9%) | 620 (99.5%) | 455 (99.3%) |
| 1+ study action ever | 1025 (15.6%) | 816 (17.0%) | 143 (23.0%) | 123 (26.9%) |
| 3+ study actions ever | 767 (11.7%) | 621 (12.9%) | 106 (17.0%) | 91 (19.9%) |
| 10+ study actions ever | 350 (5.3%) | 293 (6.1%) | 67 (10.8%) | 59 (12.9%) |
| Completed 1+ chapter/devotional/plan day | 767 (11.7%) | 616 (12.8%) | 107 (17.2%) | 93 (20.3%) |
| 2+ separate study days ever | 328 (5.0%) | 290 (6.0%) | 45 (7.2%) | 41 (9.0%) |
| 3+ separate study days ever | 217 (3.3%) | 193 (4.0%) | 25 (4.0%) | 22 (4.8%) |
| 7+ separate study days ever | 98 (1.5%) | 89 (1.8%) | 8 (1.3%) | 7 (1.5%) |
| 14+ separate study days ever | 47 (0.7%) | 43 (0.9%) | 2 (0.3%) | 2 (0.4%) |
| 30+ separate study days ever | 22 (0.3%) | 21 (0.4%) | 0 (0.0%) | 0 (0.0%) |

Version 1.0 already leads on every measure that can be reached quickly and
trails on the ones that need more calendar time than it has existed for.
Nobody who joined after 1 October can have 30 study days yet.

---

## 7. Inside each version

Beta was not uniform, and neither is Version 1.0.

### 7a. Email accounts only

| Metric | Beta Jan 6-Mar | Beta Apr-Jun | Beta Jul | Beta Aug-Sep | v1.0 Oct 1-31 | v1.0 Nov 1-12 | v1.0 Oct 1-7 guests on | v1.0 Oct 8-Oct 10 19:00 | v1.0 Oct 10 19:00-Nov 1 21:30 new welcome, no app | v1.0 after iOS launch |
|---|---|---|---|---|---|---|---|---|---|---|
| Accounts | 1762 | 1925 | 717 | 409 | 295 | 163 | 41 | 26 | 241 | 150 |
| 1+ study action, first 24h | 208/1762 (11.8%) | 249/1925 (12.9%) | 97/717 (13.5%) | 75/409 (18.3%) | 65/295 (22.0%) | 32/152 (21.1%) | 9/41 (22.0%) | 7/26 (26.9%) | 52/241 (21.6%) | 29/139 (20.9%) |
| 1+ study action, first 7 days | 241/1762 (13.7%) | 262/1925 (13.6%) | 106/717 (14.8%) | 91/409 (22.2%) | 73/295 (24.7%) | 19/79 (24.1%) | 11/41 (26.8%) | 7/26 (26.9%) | 59/241 (24.5%) | 15/66 (22.7%) |
| 3+ study actions, first 7 days | 155/1762 (8.8%) | 178/1925 (9.2%) | 99/717 (13.8%) | 77/409 (18.8%) | 50/295 (16.9%) | 17/79 (21.5%) | 6/41 (14.6%) | 5/26 (19.2%) | 43/241 (17.8%) | 13/66 (19.7%) |
| 2+ separate study days, first 7 days | 72/1762 (4.1%) | 47/1925 (2.4%) | 20/717 (2.8%) | 24/409 (5.9%) | 19/295 (6.4%) | 9/79 (11.4%) | 2/41 (4.9%) | 2/26 (7.7%) | 18/241 (7.5%) | 6/66 (9.1%) |
| 2+ separate study days, first 14 days | 82/1762 (4.7%) | 56/1925 (2.9%) | 22/717 (3.1%) | 28/409 (6.8%) | 19/273 (7.0%) | n=0 | 3/41 (7.3%) | 2/26 (7.7%) | 14/206 (6.8%) | n=0 |
| 3+ separate study days, first 14 days | 51/1762 (2.9%) | 25/1925 (1.3%) | 9/717 (1.3%) | 19/409 (4.6%) | 12/273 (4.4%) | n=0 | 2/41 (4.9%) | 1/26 (3.8%) | 9/206 (4.4%) | n=0 |
| Day 1 return (studied 24-48h after signup) | 42/1762 (2.4%) | 23/1925 (1.2%) | 8/717 (1.1%) | 11/409 (2.7%) | 13/295 (4.4%) | 8/135 (5.9%) | 3/41 (7.3%) | 1/26 (3.8%) | 11/241 (4.6%) | 6/122 (4.9%) |
| Day 3 return | 28/1762 (1.6%) | 15/1925 (0.8%) | 8/717 (1.1%) | 7/409 (1.7%) | 5/295 (1.7%) | 4/110 (3.6%) | 0/41 (0.0%) | 0/26 (0.0%) | 6/241 (2.5%) | 3/97 (3.1%) |
| Day 7 return | 15/1762 (0.9%) | 8/1925 (0.4%) | 6/717 (0.8%) | 5/409 (1.2%) | 8/295 (2.7%) | 5/57 (8.8%) | 1/41 (2.4%) | 0/26 (0.0%) | 8/241 (3.3%) | 4/44 (9.1%) |
| Studied again in days 1-7 | 92/1762 (5.2%) | 51/1925 (2.6%) | 24/717 (3.3%) | 29/409 (7.1%) | 23/295 (7.8%) | 12/57 (21.1%) | 4/41 (9.8%) | 1/26 (3.8%) | 22/241 (9.1%) | 8/44 (18.2%) |
| Studied in days 8-14 | 52/1762 (3.0%) | 27/1925 (1.4%) | 7/717 (1.0%) | 17/409 (4.2%) | 8/256 (3.1%) | n=0 | 1/41 (2.4%) | 1/26 (3.8%) | 6/189 (3.2%) | n=0 |
| 7+ separate study days, first 30 days | 25/1762 (1.4%) | 8/1925 (0.4%) | 3/717 (0.4%) | 11/409 (2.7%) | 0/94 (0.0%) | n=0 | 0/41 (0.0%) | 0/26 (0.0%) | 0/27 (0.0%) | n=0 |
| Studied in days 15-30 | 49/1762 (2.8%) | 25/1925 (1.3%) | 8/717 (1.1%) | 19/409 (4.6%) | 4/85 (4.7%) | n=0 | 0/41 (0.0%) | 2/26 (7.7%) | 2/18 (11.1%) | n=0 |

### 7b. All accounts

| Metric | Beta Jan 6-Mar | Beta Apr-Jun | Beta Jul | Beta Aug-Sep | v1.0 Oct 1-31 | v1.0 Nov 1-12 | v1.0 Oct 1-7 guests on | v1.0 Oct 8-Oct 10 19:00 | v1.0 Oct 10 19:00-Nov 1 21:30 new welcome, no app | v1.0 after iOS launch |
|---|---|---|---|---|---|---|---|---|---|---|
| Accounts | 1762 | 1979 | 717 | 2114 | 460 | 163 | 206 | 26 | 241 | 150 |
| 1+ study action, first 24h | 208/1762 (11.8%) | 267/1979 (13.5%) | 97/717 (13.5%) | 242/2114 (11.4%) | 83/460 (18.0%) | 32/152 (21.1%) | 27/206 (13.1%) | 7/26 (26.9%) | 52/241 (21.6%) | 29/139 (20.9%) |
| 1+ study action, first 7 days | 241/1762 (13.7%) | 280/1979 (14.1%) | 106/717 (14.8%) | 269/2114 (12.7%) | 92/460 (20.0%) | 19/79 (24.1%) | 30/206 (14.6%) | 7/26 (26.9%) | 59/241 (24.5%) | 15/66 (22.7%) |
| 3+ study actions, first 7 days | 155/1762 (8.8%) | 193/1979 (9.8%) | 99/717 (13.8%) | 198/2114 (9.4%) | 64/460 (13.9%) | 17/79 (21.5%) | 20/206 (9.7%) | 5/26 (19.2%) | 43/241 (17.8%) | 13/66 (19.7%) |
| 2+ separate study days, first 7 days | 72/1762 (4.1%) | 50/1979 (2.5%) | 20/717 (2.8%) | 48/2114 (2.3%) | 22/460 (4.8%) | 9/79 (11.4%) | 5/206 (2.4%) | 2/26 (7.7%) | 18/241 (7.5%) | 6/66 (9.1%) |
| 2+ separate study days, first 14 days | 82/1762 (4.7%) | 59/1979 (3.0%) | 22/717 (3.1%) | 57/2114 (2.7%) | 22/438 (5.0%) | n=0 | 6/206 (2.9%) | 2/26 (7.7%) | 14/206 (6.8%) | n=0 |
| 3+ separate study days, first 14 days | 51/1762 (2.9%) | 27/1979 (1.4%) | 9/717 (1.3%) | 35/2114 (1.7%) | 14/438 (3.2%) | n=0 | 4/206 (1.9%) | 1/26 (3.8%) | 9/206 (4.4%) | n=0 |
| Day 1 return (studied 24-48h after signup) | 42/1762 (2.4%) | 25/1979 (1.3%) | 8/717 (1.1%) | 31/2114 (1.5%) | 14/460 (3.0%) | 8/135 (5.9%) | 4/206 (1.9%) | 1/26 (3.8%) | 11/241 (4.6%) | 6/122 (4.9%) |
| Day 3 return | 28/1762 (1.6%) | 17/1979 (0.9%) | 8/717 (1.1%) | 19/2114 (0.9%) | 6/460 (1.3%) | 4/110 (3.6%) | 1/206 (0.5%) | 0/26 (0.0%) | 6/241 (2.5%) | 3/97 (3.1%) |
| Day 7 return | 15/1762 (0.9%) | 9/1979 (0.5%) | 6/717 (0.8%) | 10/2114 (0.5%) | 8/460 (1.7%) | 5/57 (8.8%) | 1/206 (0.5%) | 0/26 (0.0%) | 8/241 (3.3%) | 4/44 (9.1%) |
| Studied again in days 1-7 | 92/1762 (5.2%) | 54/1979 (2.7%) | 24/717 (3.3%) | 61/2114 (2.9%) | 26/460 (5.7%) | 12/57 (21.1%) | 7/206 (3.4%) | 1/26 (3.8%) | 22/241 (9.1%) | 8/44 (18.2%) |
| Studied in days 8-14 | 52/1762 (3.0%) | 28/1979 (1.4%) | 7/717 (1.0%) | 39/2114 (1.8%) | 10/421 (2.4%) | n=0 | 3/206 (1.5%) | 1/26 (3.8%) | 6/189 (3.2%) | n=0 |
| 7+ separate study days, first 30 days | 25/1762 (1.4%) | 9/1979 (0.5%) | 3/717 (0.4%) | 19/2114 (0.9%) | 1/259 (0.4%) | n=0 | 1/206 (0.5%) | 0/26 (0.0%) | 0/27 (0.0%) | n=0 |
| Studied in days 15-30 | 49/1762 (2.8%) | 26/1979 (1.3%) | 8/717 (1.1%) | 35/2114 (1.7%) | 7/250 (2.8%) | n=0 | 3/206 (1.5%) | 2/26 (7.7%) | 2/18 (11.1%) | n=0 |

### What this shows

- **January – March was Beta's best quarter for coming back**, then it
  fell by about half from April to July. Beta was not one flat
  experience either.
- **August – September email accounts already look like October.** First
  study action 22.2% against 24.7%; two or more days in 14, 6.8% against
  7.0%. Two readings fit: the product had already improved by August (the
  real-time welcome series started 31 July), or these 409 people were
  unusually motivated, since they chose to give an email when a guest
  account was the default. The data cannot separate the two.
- **1 October is not where the line falls.** The first week of October,
  with guests still on, looks like September. The step up is at the signup
  wall and the new welcome (8–10 October).
- **November is the standout, on small numbers.** "Studied again in days
  1–7" is 21% for November signups against 8% for October. Only 57
  November accounts are old enough to count.

---

## 8. Did email help people return?

### What existed when

| Signed up | Welcome email at signup | Coverage |
|---|---|---|
| Jan – 30 Jul 2026 | None. Back-sent in August, a median of 118 days later | 30 of 4,404 got one within 48 hours, all of them 30-31 July signups |
| 31 Jul – Aug 2026 | Eight-email series, real time | 254 of 269 |
| Sep 2026 | Series cut to one email on 9 Sep, then patchy | 39 of 140 |
| 1 – 10 Oct 2026 | Old single email | 42 of 67 |
| 10 Oct – 11 Nov 2026 | New welcome, about 8 minutes after signup | 383 of 391 (98%) |
| 11 Nov 2026 on | Five-email series | 13 so far; too new to measure |

Louis's description of Beta is right for January to July: nobody
received anything when they joined.

### The new welcome email, 10 Oct – 12 Nov

| | Accounts |
|---|---|
| Eligible (email accounts created after it went live) | 391 |
| Sent | 383 |
| Delivered | 336 |
| Bounced | 45 |
| Opened (unreliable, see below) | 180 |
| Clicked | 32 (9.5% of delivered) |
| Studied at some point after the email was sent | 73 of 336 delivered |

### Did receiving it make a difference?

The closest thing to a fair test is delivered against bounced: both groups
signed up the same way in the same weeks, and one never got the email.

| | Delivered | Bounced |
|---|---|---|
| Studied in first 7 days | 66 / 274 (24.1%) | 6 / 25 (24.0%) |
| Studied again in days 1–7 | 24 / 258 (9.3%) | 5 / 20 (25.0%) |
| Any activity in days 1–7 | 63 / 258 (24.4%) | 11 / 20 (55.0%) |

**People who never received the welcome email came back at least as
often.** Twenty people is far too few to claim the email hurts, and bounced
addresses may differ in ways that matter. But this is the only comparison
available and it gives no support to the idea that the welcome email is
what brings people back.

### Clickers

| | Clicked (32) | Delivered, did not click (304) |
|---|---|---|
| Studied in first 7 days | 36.7% | 22.5% |
| Studied again in days 1–7 | 17.2% | 8.3% |
| **Had already studied within an hour of signing up** | **26.7%** | **16.0%** |

Clickers return about twice as often, but they were already more engaged
before the email could have had any effect. Nine of the 32 studied after
clicking. This is motivation showing up as a click, not proof the click
caused anything.

### Broadcasts and legacy users

This is where email does show up. Counting Beta accounts that came
back to the app after 30 or more days away:

| Week starting | Returns | Broadcasts that week |
|---|---|---|
| 14 Sep – 5 Oct (four weeks) | 24, 22, 20, 23 | none |
| 12 Oct | **44** | 13 Oct newsletter (15 returns that day alone) |
| 19 Oct | 17 | 18 Oct |
| 26 Oct | **38** | 27 and 28 Oct |
| 2 Nov | **41** | 1, 3 (App Store launch, 12 that day), 6, 8 Nov |

About 20 a week before broadcasts began, about 40 in the weeks they went
out. In total 189 legacy accounts came back after 30+ days away since
1 October, and 40 of them went on to study.

### Limits

- **Opens mean nothing here.** Mail scanners and privacy proxies load the
  tracking image. Only clicks were treated as a signal.
- **Clicks stop on 9 November**, when click tracking was turned off so
  links could open the app. Its replacement has recorded 3 arrivals so far.
- No record exists of what the Systeme.io emails did: 238 open and click
  events survive, all from 31 July – 2 August.
- Returning after an email is not the same as returning because of it.

---

## 9. Did the App Store help?

**Launch:** 1 November 2026, 21:30 UTC. iOS only. Android is in closed
testing and is not counted as launched.

**Downloads:** 194 between 2 and 10 November, about 21 a day, 79% from the
US. Apple reports roughly a day behind.

**Who counts as an app signup:** an account whose signup came through the
app's own welcome screen, or which registered a phone for notifications.
Everyone else after launch is "web or unknown".

| After launch (1 Nov 21:30 on) | App signups | Web or unknown | Web, 10 Oct – 1 Nov (before the app) |
|---|---|---|---|
| Accounts | 100 | 50 | 241 |
| Signed in | 100 / 100 | 47 / 50 | 241 / 241 |
| Study action in first 24h | 21 / 96 (21.9%) | 8 / 43 (18.6%) | 52 / 241 (21.6%) |
| Study action in first 7 days | 10 / 40 (25.0%) | 5 / 26 (19.2%) | 59 / 241 (24.5%) |
| 2+ study days in first 7 days | 5 / 40 (12.5%) | 1 / 26 (3.8%) | 18 / 241 (7.5%) |
| Day 1 return | 6 / 85 (7.1%) | 0 / 37 | 11 / 241 (4.6%) |
| Day 7 return | 3 / 27 (11.1%) | 1 / 17 (5.9%) | 8 / 241 (3.3%) |
| Studied again in days 1–7 | 6 / 27 (22.2%) | 2 / 17 (11.8%) | 22 / 241 (9.1%) |
| **Opened the app again in days 1–7** | **17 / 27 (63.0%)** | 5 / 17 (29.4%) | 53 / 241 (22.0%) |

**What it shows.** App signups start studying at the same rate as web
signups, about one in four. The difference is in coming back: 63% of app
signups were back inside the app in their first week against 22% on the
web before the app existed, and they studied again at about twice the
rate. That is the pattern Louis expected: the app does not make people
more interested, it makes it easier to return.

**Existing users moved too.** 30 accounts created before launch have
installed the app (21 of them Beta), and 17 have studied since.

**What is not established.**
- Every "came back" figure for the app rests on 27 accounts. One good or
  bad week changes it.
- Nobody who signed up in the app is more than 11 days old. Day 14, Day 30
  and anything long-term do not exist yet.
- Where app signups first heard of Bible Buddy is unknown. Some found it in
  the store; some were sent there from social posts or the launch email.
- People who bother to install an app may simply be keener than people who
  use a website. Part of the gap is likely that.

---

## 10. Legacy accounts and the 90-day question

"Studied" uses the definition in section 3. "Any activity" is any signed-in
action, including opening the dashboard.

| | All eligible | Beta (legacy) | Version 1.0 |
|---|---|---|---|
| Accounts | 7,357 | 6,734 | 623 |
| Studied in last 7 days | 86 | 43 | 43 |
| Studied in last 30 days | 193 | 86 | 107 |
| Studied in last 90 days | 499 | 356 | 143 |
| Any activity in last 7 days | 261 | 109 | 152 |
| Any activity in last 30 days | 665 | 271 | 394 |
| Any activity in last 90 days | 2,671 | 2,070 | 601 |
| No study in the last 90 days | 6,858 | 6,378 | 480 |
| Never studied at all | 6,150 | 5,670 | 480 |

- **Legacy accounts that have studied since 1 October: 115.**
- Legacy accounts with any activity since 1 October: 350.
- Accounts that returned to studying after a gap of more than 90 days
  between study days: 35.
- Accounts that came back to the app after more than 90 days of nothing:
  221.
- People studying on 5 or more days in the last 30: 40 (29 legacy, 11
  Version 1.0).

"Any activity in last 90 days" is inflated for Beta by the 1,700
guest accounts created in August and September, each of which logged
something on the day it was created. The study rows are the honest ones.

### Recommended labels

Two separate questions, kept separate:

- **When did they join?** BETA (before 1 Oct 2026) or VERSION 1.0
  (1 Oct 2026 on). Fixed for life. A Beta account that returns stays Beta:
  it counts in current active users, never as a new Version 1.0 signup.
- **Are they here now?** CURRENT (studied in the last 90 days) or DORMANT
  (did not). Recalculated every time the report runs, so a dormant person
  who comes back becomes current the same day with nothing to update.

Today that gives: 356 Beta and current, 6,378 Beta and dormant, 143
Version 1.0 and current, 480 Version 1.0 and dormant. Nothing
about any account changes. These are labels in a report.

---

## 11. Why "7,217 accounts, 146 studied seven days" misleads

The figure is a true count. It is a bad measure of today's product, for
six reasons the data supports.

1. **It mixes people who could not get in with people who chose not to
   stay.** 1,064 early accounts never signed in at all. They are in the
   7,217 and could never have been in the 146.
2. **It counts accounts that were never registrations.** About 1,900 are
   guest accounts made by a single tap, with no email and no way back.
3. **For seven months nobody was told to come back.** No welcome email was
   sent at signup before 31 July 2026. When the first one was sent to the
   earlier signups, the median person had joined 118 days before.
4. **There was no app.** Returning meant remembering a web address. The
   early app numbers suggest this mattered: in-app signups reopen at about
   three times the rate of web signups. That is suggestive, not proven.
5. **It gives everyone a different amount of time.** A January signup had
   ten months to reach seven days. A November signup had under two weeks.
   Section 6 shows what that does to the numbers.
6. **It adds account totals to activity totals.** "7,217" grows forever and
   never shrinks. It says how many people ever tried the door, not how many
   are in the room.

What the data does **not** support is the idea that these barriers explain
all of Beta's inactivity. Among Beta email accounts that did
sign in, 81% still never completed a single study action in their first
week. In Version 1.0 it is 75%. Better, and the same basic shape: most
people who register do not start.

One more correction to the earlier figure. With moderators and test
accounts removed and the stricter definition of study used here, the
lifetime count is **125 of 7,357**, and 171 on the broader definition. The
earlier 146 used a definition in between and included the excluded
accounts. None of the three is the number to steer by.

---

## 12. Data quality and limits

- **No study logging before 6 Jan 2026.** 162 accounts are left out of the
  comparison for that reason.
- **Event types came and went.** Bible in One Year events begin 23 May;
  study-note views begin 25 May; some game events end in May. The strict
  definition was built from events that exist across the period, plus
  features as they launched.
- **Deleted accounts are gone.** Until 3 November deletion wiped every row.
  Anyone who deleted is missing from both cohorts. The number is unknown
  and probably small.
- **Version 1.0 is 43 days old.** 374 email accounts have a full 7 days, 273
  have 14, 94 have 30. Every 30-day figure describes early October only.
- **App identification is partial.** There is no device field on study
  actions. App signups are identified by the signup screen used and by
  notification registration, so a person who signed up on the web and then
  installed the app without allowing notifications counts as web.
- **No login history.** Only the most recent sign-in is stored, so "logged
  in" means "ever", and return visits are measured from logged actions.
- **Email opens are not usable. Email clicks stop on 9 November.**
- **Different people, not just a different product.** Version 1.0's signups
  come from a different mix of sources (the App Store did not exist
  before) and from behind a signup wall that filters out the casual. Some
  of the improvement is who is arriving, not what they find.
- **Time zone.** UTC throughout. Louis reads signups in Berlin time, so
  daily counts here can differ by a few from the admin screens.

---

## 13. Verdict

**A. Are people more likely to perform their first Bible study action
after October 1?**
Yes. 24.6% within seven days against 14.5%, email accounts. Including
guests, 20.6% against 13.6%. Both clear of chance.

**B. Are people more likely to return for a second or third study day?**
A second day: yes. 7.5% against 3.4% within the first week. A third day:
it leans that way (3.2% against 1.8%) but is not yet clear of chance.

**C. Has Day 7 retention improved? By how much?**
Yes. 3.7% against 0.7% for email accounts, 2.5% against 0.6% with guests.
The plausible range is +1.0 to +5.0 points. It is 13 people; quote it as
"clearly higher", not as "five times".

**D. What does the evidence show about email helping people return?**
For the welcome email: nothing in its favour. People whose welcome bounced
came back as often as people who got it, and clickers were already more
engaged before they clicked. For broadcasts to the full list: legacy
returns roughly doubled in the weeks they were sent, and 115 legacy
accounts have studied since 1 October.

**E. What does the evidence show about the app helping people return?**
Early and encouraging. In-app signups came back in their first week at
63% against 22% on the web, and studied again at about twice the rate.
Based on 27 accounts and at most 11 days. Not yet a retention result.

**F. How many users are genuinely active in the last 90 days?**
**499** have studied. 193 in the last 30 days, 86 in the last 7. Forty
people study on five or more days a month.

**G. Does the current Bible Buddy outperform the original beta?**
In the first week, yes, on every measure, by amounts chance does not
explain. Beyond the first week, unknown: the direction is positive and the
sample is too young. The improvement is real, partly because the door now
works, partly because of who is arriving, and it does not begin on
1 October. It begins around the signup wall on 8 October and steps up
again with the app in November.

**H. Which retention figures should the dashboard use?**
Stop showing lifetime accounts against lifetime studiers. Show, for email
accounts, by month of signup:

1. Signed up
2. First study action within 7 days
3. Studied again in days 1–7
4. Studied on 2+ days within 14 days
5. Day 7 and Day 30 return, each only once the month is old enough

And separately, for everyone, recalculated daily:

6. Studied in the last 7, 30 and 90 days
7. People studying 5+ days in the last 30

Each monthly row is filled in only when its window has closed, so no month
is ever compared with one that has had more time.

---

*Tables read: `auth.users`, `profile_stats`, `master_actions`,
`email_funnel_sends`, `email_campaigns`, `email_campaign_sends`,
`email_events`, `email_subscribers`, `native_push_tokens`. App Store
downloads from the Sales and Reports API. Analysis scripts were throwaway
and are not in the repo.*
