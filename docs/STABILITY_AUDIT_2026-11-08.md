# Bible Buddy — Stability Audit

**8 November 2026. Nothing in the app was changed to produce this.**

Louis asked for an audit rather than a fix: find out why pages sometimes do not
load, why buttons sometimes do nothing, and why a post or comment sometimes
vanishes. This is the answer, in plain English, with the evidence.

---

## 1. The short version

Bible Buddy is in better shape than the symptoms suggest. The app does not have
a structural problem — it has **one habit repeated in a lot of places**, and
that habit produces every glitch described.

The habit: when something goes wrong with a request to the database, the code
very often does nothing about it. Not "shows an error" — *nothing*. The screen
stays as it was, the button stays pressed, the box empties as if it worked.

That is why the glitches feel random and unreproducible. They are not random.
They happen exactly when a request fails, which on a phone on mobile data is
often enough to notice and rare enough to never catch in testing.

There is also one piece of genuinely good news worth saying up front: **the
database overload that caused three outages in October is properly fixed.** I
checked. The polling that caused it now runs once a minute instead of every
eight seconds, and stops entirely when the tab is not on screen.

---

## 2. What I actually did

I read the code. I did not guess from symptoms.

- Measured the app: **661 pages, 180 API routes, ~168,000 lines** of our own code.
- Wrote three scanners that walk every file looking for specific broken shapes,
  rather than eyeballing a sample. The counts below come from those.
- Read the signup, login, posting, commenting, reading-progress and blocking
  code line by line.
- Checked what monitoring already exists and what it can and cannot see.

### What I could not check, and you should know it

- **I did not test on a real iPhone or Android phone.** No device, no TestFlight
  build in front of me.
- **I have no production logs or monitoring to read.** There is no error
  monitoring service connected (see section 6), so there is no history of real
  failures to look at. Everything below is read from code, not from logs.
- **I did not measure database speed.** That needs the Supabase dashboard.
- **I did not load-test anything.**
- Of everything below, **one bug I actually reproduced in a browser** (3.3).
  The rest are confirmed by reading code where the logic is not ambiguous. Each
  one is marked.

---

## 3. Confirmed bugs

### 3.1 — A comment can disappear as you post it — CRITICAL

**Where:** `app/bb-feed/page.tsx:871`

**What happens:** You type a comment and tap post. The box empties. The comment
is not there. It was never saved, and nothing told you.

**Why:** The code adds the comment to the screen only when the save succeeded —
but then clears the text box *regardless*, on the next line, outside that check.
When the save fails there is no message, no retry, not even a line in the
console. The emptied box is the only feedback, and it means the opposite of what
it looks like.

    if (!error && data) { ...show the comment... }
    setNewComment("");     <- runs even when the save failed
    setSubmitting(false);

**Status:** CONFIRMED by reading. Not reproduced — it needs a failing request.

**Fix:** Show an error and keep the typed text. Small, maybe 20 minutes.

**Risk:** None. It cannot be worse than silently losing the comment.

---

### 3.2 — The signup button can die mid-signup — CRITICAL

**Where:** `app/signup/page.tsx:247`

**What happens:** Someone fills in the form on a weak connection, taps Create
Account, and the button spins forever. No error. The only way out is to reload
the page and start again. Some of them will not.

**Why:** The signup call handles *rejected* signups well — wrong password, email
already used, all covered. What it does not handle is the request **failing to
complete at all**, which is what happens when the network drops. The code then
stops dead at that line, and the instruction further down that releases the
button is never reached.

**Status:** CONFIRMED by reading.

**Note:** The *login* page already handles this correctly. It is only signup and
password-reset that do not, so this is an oversight rather than a pattern.

**Fix:** Catch any failure, show a message, release the button. Half an hour
including password-reset.

**Risk:** None.

---

### 3.3 — The Library tells people a study does not exist — HIGH

**Where:** `lib/libraryCatalog.ts` — **already fixed earlier today**, listed
here because it explains the whole class of bug.

**What happened:** With the database unreachable, opening a study showed *"That
study is not on the shelf."* The study was on the shelf. The request never
arrived. The Library did the same thing: "Nothing in this category yet."

**Why:** The database library does not raise an alarm when a request fails — it
hands back an empty answer. The code treated "empty" and "failed" as the same
thing, so it stated as fact that content was missing.

**Status:** **REPRODUCED** in a real browser today, then fixed and verified.

**Why it still matters:** the same shape exists in **31 other places across 21
files**. Most are harmless (analytics, email stats). Two are not — 3.4 and 3.5.

---

### 3.4 — Reading progress can appear to be wiped — HIGH

**Where:** `lib/readingProgress.ts:30` and `:67`

**What happens:** If the read of your completed chapters fails, the app is told
you have completed **none**. Chapters you have read show as unread. Progress and
streak look wrong.

**Nothing is actually deleted.** The records are safe and come back on the next
successful load. But for the person holding the phone, their Bible reading
progress just vanished, and that is the single most upsetting thing this app
could do.

**Status:** CONFIRMED by reading. Needs testing to see how it looks on screen.

**Fix:** Distinguish "you have read nothing" from "I could not check". Show the
last known state, or say plainly that it could not load. An hour or two, because
it needs care about what the screen says.

**Risk:** Low, but this one deserves real testing before it ships.

---

### 3.5 — A blocked person can reappear — HIGH

**Where:** `lib/userBlocks.ts:26`

**What happens:** If the block list fails to load, the app is told **nobody is
blocked**, and shows posts and comments from someone the user deliberately
blocked.

This is a trust and safety problem rather than a glitch. Someone who blocked
another member made a decision about their own safety, and a flaky connection
quietly overrides it.

**Status:** CONFIRMED by reading.

**Fix:** When the list cannot be loaded, keep the last known blocks rather than
assuming there are none. An hour.

**Risk:** Low. Worst case somebody stays hidden who should not be, which is the
safer way to be wrong.

---

### 3.6 — Eight screens can stay stuck loading — HIGH

**Found by scanner:** 856 components checked; 50 decide what to show based on a
"still loading" flag; **8 of those can be left loading forever** by a failed
request.

    app/bb-feed/page.tsx                          (comments under a post)
    app/bible-trivia/books/page.tsx
    app/bible-trivia/people/page.tsx
    app/study-groups/[id]/series/page.tsx         } groups are closed —
    app/study-groups/[id]/series/week/[weekNum]/  } dead code, skip
    components/ScrambledUpgradeGate.tsx
    components/TriviaBookClient.tsx
    components/library/BibleYearOverview.tsx

**What happens:** grey placeholder boxes that pulse forever. The app is not
frozen — you can move to another tab and back — but that panel never recovers.

Five more screens had this and were fixed earlier today (the bookshelf, the
Library, a study's page, the feed itself, the Bible reader), so the pattern and
the fix are already established and tested. These eight are the rest of the list.

**Status:** CONFIRMED by scanner, spot-checked by hand.

**Fix:** The same change, eight times. Half a day including the Bible-in-One-Year
overview, which is the one real users will hit most.

**Risk:** Low. It is the fix that already shipped for five sibling screens.

---

### 3.7 — Eighteen files contain a button that can die — MEDIUM

**Found by scanner:** 153 buttons disable themselves while they work, which is
correct and prevents double-posting. **18 files contain at least one that never
re-enables if the request fails.**

The ones that matter, after discounting the closed study-groups pages:

    app/signup/page.tsx                       see 3.2
    app/reset-password/page.tsx               both handlers
    app/bb-feed/page.tsx                      comment, delete post, buddies tab
    components/comments/CommentSection.tsx    comments on studies
    components/VerseHighlighter.tsx           saving a note
    components/ReportBlockMenu.tsx            report, block, unblock
    components/VideoHelpfulPoll.tsx
    components/GroupWeeklyTriviaCard.tsx      saving a trivia score
    app/notes/grow/page.tsx                   saving a note

**What happens:** the button greys out and stays that way. Tapping does nothing.

**Good news:** the main **post composer is not on this list**. It guards against
double-posting *and* handles upload failures properly. Whoever wrote it was
careful. Duplicate posts from repeated tapping should not be happening.

**Status:** CONFIRMED by scanner.

**Fix:** Mechanical and repetitive. A day for all of them.

---

## 4. Things I suspect but have not confirmed

Listed separately on purpose. **I have not reproduced any of these.**

- **Unexpected logouts.** I found nothing in the code that would log anyone out.
  The freeze fix going live today changes session handling, so this is worth
  watching afterwards rather than investigating now.
- **Slow pages and slow queries.** Needs the Supabase dashboard. Not guessed at.
- **Android-specific problems.** Nothing device-specific was examined.
- **The closed study-groups pages** still poll every 800ms and 1000ms. They are
  unreachable today (`/study-groups` redirects to the feed) so this costs
  nothing, but it is live code that would be expensive if a link ever reached it.

---

## 5. What is already solid

Worth saying, because section 3 is one-sided.

- **The October database overload is genuinely fixed.** `components/AppShell.tsx:1529`
  — once a minute, stops when the tab is hidden, cleans up after itself.
- **Crash reporting already exists and is good.** A crash shows a real screen,
  tries to reload itself, and files a report to `bug_reports` that you read at
  `/admin/bugs`. Most apps this size do not have this.
- **The post composer is careful** — double-tap guard, upload failures handled,
  clear messages.
- **The login page handles network failure correctly.**
- **Offline is handled** in the phone apps (`offline.html`).
- **Content filtering runs before anything is stored.**

---

## 6. The monitoring gap, and the cheapest way to close it

This is the most useful paragraph in the document.

**The app tells you when it crashes. It does not tell you when it quietly
fails.** Crash reporting catches a React render crash. It does not catch:

- a request failing inside a button (every bug in section 3)
- a failed promise in a loading screen (3.6)
- a request that times out

There is **no `unhandledrejection` or `window.onerror` listener anywhere in the
app**. I checked. So every failure described above happens completely invisibly.
That is the real reason these glitches feel random: there has never been a
record of one.

**Recommendation — do this before any of the fixes:**

Add a global listener for failed promises and uncaught errors that posts to the
crash endpoint that already exists. It is **about 30 lines**, reuses
`app/api/bug-reports/crash/route.ts` and `/admin/bugs` unchanged, costs
**nothing**, and adds no new service.

Within a day you would know which of these bugs are theoretical and which are
hitting real people every hour — and the repair order would come from evidence
instead of from my judgement.

I would not add Sentry or anything paid yet. The infrastructure is already here.

---

## 7. Suggested order

**Do first — one day, free, no risk**

1. Global error listener (section 6). Then wait a day and read what comes in.

**Priority 1 — critical, about a day**

2. The vanishing comment (3.1)
3. Signup and password-reset buttons (3.2)

**Priority 2 — reliability, two to three days**

4. Reading progress (3.4) — needs the most testing
5. Blocked users (3.5)
6. The eight stuck screens (3.6)

**Priority 3 — tidy-up, about a day**

7. The remaining dead buttons (3.7)
8. Delete the closed study-groups pages

**Total: roughly a week of work.** None of it requires a rewrite. None of it
touches the database schema or existing user data.

---

## 8. Top five, if you only do five

| | Fix | Effort | Risk | Why |
|---|---|---|---|---|
| 1 | Global error listener | 1 hour | None | Turns invisible failures into a list you can read |
| 2 | Vanishing comment | 30 min | None | People think they commented and did not |
| 3 | Signup button | 30 min | None | Lost signups are lost users |
| 4 | Reading progress | 2 hours | Low — test it | Progress appearing wiped is the worst thing this app can do |
| 5 | The eight stuck screens | half a day | Low | The fix already shipped for five sibling screens |

Numbers 1, 2, 3 and 5 are safe and mechanical. **Number 4 is the one that needs
real testing** before it goes live, because it changes what people see about
their own reading history.

---

## 9. One thing to flag about today's freeze fix

The fix going live at 17:05 today stops requests hanging forever — they now give
up after 30 seconds instead.

That is the right change and it fixes the frozen app. But a request that gives
up is a request that **fails**, and failing is exactly what the code in section 3
does not handle. So that fix makes these bugs **easier to reach**, not harder.

It does not create them — they were always there, waiting for a dropped
connection. But it is the honest reason to do section 7 soon rather than
eventually.
