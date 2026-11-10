# Bible Buddy — Stability Verification & Safe Repair Plan

**9 November 2026. Nothing in the app was changed to produce this.**

> **P0-1 was closed on 9 November, a few hours after this was written.** That
> is why the file is now in `docs/`: it was deliberately kept outside the
> repository while the exposure was live, because this repository is public and
> naming an unfixed data-exposure issue in it is a signpost. **Appendix A at the
> end records what was actually found and what was changed** — read it alongside
> P0-1 below, which is left as it was written, before the fix.

Louis asked for the 8 November audit (`STABILITY_AUDIT_2026-11-08.md`) to be
checked rather than acted on: is each finding still true, was the diagnosis
right, and what else is wrong. No fixes have been written, nothing has been
deployed, and no production data was modified.

---

## 1. Executive summary — how stable is Bible Buddy today?

**Stable enough that it is not falling over, with one serious problem that has
nothing to do with stability, and one mechanism that is being misunderstood.**

Three things to take away.

**1. There is a live data-exposure problem, and it is the most urgent item in
this document.** It is not a crash or a glitch — it is personal data that can be
read by anybody, without signing in. It is item **P0-1** in the roadmap. The
detail is deliberately **not written into this file**, because this repository is
public and the problem is not fixed yet. It is written up in full in a private
file outside the repo; the path is in the session where this was produced. It
affects thousands of rows, I reproduced it end to end, and closing it breaks
nothing in the app.

**2. The 8 November audit found the right bugs for the wrong reason, and that
changes the fixes.** Its central claim is that a failed request makes the code
*throw*, which skips the line that releases a button or stops a spinner. I
checked the library rather than assuming: **supabase-js 2.86 does not throw on a
network failure.** It catches the failure and hands back an ordinary result with
`data: null` and an error object. So buttons do *not* die and screens do *not*
pulse forever — I proved both on the live site with the database blocked.

What actually happens is worse and quieter: the screen renders **as if you have
nothing**. Your chapters show unread. Your Bible in One Year position resets to
Day 1. A post's comments show as no comments. Nothing is broken on screen, so
nobody reports it, and nothing is written down anywhere.

So the repair list is nearly the same list, but the fix is "tell the difference
between *empty* and *could not check*", not "add a `finally`", and the
regression tests have to simulate a returned error rather than a throw.

**3. The audit's headline recommendation would not have worked.** It proposed a
global `unhandledrejection` / `window.onerror` listener to make these failures
visible. Since almost none of them throw or reject, that listener would have
caught almost none of them, and a day of waiting would have produced an empty
list and false reassurance. The right instrument is twenty lines in the Supabase
client itself. Section 8.

Also confirmed: **the October database overload is genuinely fixed** and the
7 November auth-lock fix is sound and well-built. But I did find **one live
2-second database poll** of exactly the kind that caused those outages, in a
block of code that cannot do anything any more.

---

## 2. Verifying the original audit

### How to read the status column

- **Reproduced** — I made it happen and watched it.
- **Confirmed by inspection** — the code says so and the logic is not ambiguous.
- **Simulated** — the handler's own control flow was run offline against a stub
  that returns what the real library returns. Not a live test, and labelled as
  such.
- **Misdiagnosed** — the bug is real, the stated cause is not.
- **Already fixed** / **Not a bug** — self-explanatory.

| # | Issue as filed | Where | What I found | Status | Severity |
|---|---|---|---|---|---|
| 3.1 | A comment disappears as you post it | `app/bb-feed/page.tsx:871-901` | Exactly as described. `setNewComment("")` at **L898** sits outside the `if (!error && data)` guard. Nothing is shown, nothing is logged. Ran the handler offline against a stub returning what postgrest returns on a dead connection: comment absent, count unchanged, box emptied, no message, button released. | **Simulated** (live submit not attempted — see §7) | **CRITICAL** |
| 3.2 | The signup button dies mid-signup | `app/signup/page.tsx:262` | **Misdiagnosed.** `supabase.auth.signUp` cannot reject on a network failure: auth-js wraps it as `AuthRetryableFetchError`, which `isAuthError` accepts, so it returns `{ error }`. The `if (error)` branch then releases the button and shows a message. The button does **not** hang. What it shows is `TypeError: Failed to fetch`, which is gibberish to a reader — a wording bug, not a lock-up. | **Misdiagnosed** | was CRITICAL → **LOW** |
| 3.2b | "Only signup and password-reset are affected; login handles it correctly" | `app/login/page.tsx:92` | **Wrong.** Login has the identical unprotected shape, as does the **landing page** signup form at `app/page.tsx:936` — a fourth door the audit missed. All four behave the same way, which (per 3.2) is "shows a raw error", not "hangs". | **Confirmed by inspection** | **LOW** |
| 3.3 | The Library says a study does not exist | `lib/libraryCatalog.ts` | Fixed on 8 Nov in `0fb1c8e1`, and the fix is right: those helpers now **throw** on a failed read so the screen can say "Couldn't load" and offer Try Again. `npm run verify:load-retry` — **20 checks, all pass**. The audit's "31 other places across 21 files" undercounts badly: **396 Supabase reads in 163 files discard the error object entirely.** Most are harmless; the ones that are not are below. | **Already fixed** | — |
| 3.4 | Reading progress can appear wiped | `lib/readingProgress.ts:32,38,69,92,110` | Confirmed, and it is the most important finding in the original audit. Nine separate returns of `[]`, `{}`, `0` or `false` on a failed read. **Nothing is deleted** — I checked every write path, and none of them replaces stored progress with what is in memory. | **Confirmed by inspection** | **HIGH** |
| 3.5 | A blocked person can reappear | `lib/userBlocks.ts:28` | Confirmed, and worse than filed: the empty result is **written into the 60-second cache** at L36-39, so one failed read keeps a blocked person visible for a full minute after the connection recovers. | **Confirmed by inspection** | **HIGH** |
| 3.6 | Eight screens stay stuck loading | 8 files | **Misdiagnosed, and the list is wrong.** They cannot stay stuck: their loads use only auth and postgrest calls, which resolve rather than throw. **Reproduced live**: with the database blocked, `/bible-trivia/books` rendered fully in 8 seconds with zero skeletons and every book showing its *full* question count — i.e. "you have answered nothing". Of the audit's eight, `app/bb-feed` was already fixed in `0fb1c8e1`, two are closed study-group pages, and five are real but with the wrong symptom. I found **two more** with the same shape: `app/devotionals/[id]/day/[dayNumber]/page.tsx` and `components/GroupPostThread.tsx`. | **Misdiagnosed** (symptom), **Confirmed** (7 live screens) | **HIGH** |
| 3.7 | Eighteen files contain a button that can die | 18 files | **Mostly not a bug**, for the same reason. Scanning for handlers that raise a button flag with no error handling at all gives **16 handlers in 12 live files** — but a button only truly dies if the await can throw, and the only ones that can are `supabase.storage.*` and raw `fetch()`. Two of the audit's named files, `components/VerseHighlighter.tsx` and `app/notes/grow/page.tsx`, already had `try/catch/finally` when the audit was written and have not been touched since. | **Misdiagnosed** | was MEDIUM → **LOW**, except §3.3 below |
| §5 | "The October overload is genuinely fixed" | `components/AppShell.tsx:1529-1560` | Confirmed, intact, and well done: 60 s, started only when the tab is visible, stopped on `visibilitychange`, listeners removed on unmount, immediate refresh on focus. | **Confirmed by inspection** | — |
| §5 | "Crash reporting already exists and is good" | `app/api/bug-reports/crash/route.ts` | Confirmed. Field truncation, fingerprint dedupe over a 14-day window, occurrence counting, auto-reopen of a "fixed" bug, platform split between the native shell and the browser, works for signed-out people. | **Confirmed by inspection** | — |
| §5 | "The post composer is careful" | `app/bb-feed/page.tsx:353` | Half right. It handles *refusals* properly and never clears the typed post on failure. But the photo upload at **L366** is `supabase.storage.upload` with no `try`, and storage-js **does** rethrow a network `TypeError`. That one really can leave the composer dead. | **Confirmed by inspection** | **MEDIUM** |
| §6 | "No global error listener anywhere" | — | Confirmed: the only `addEventListener("error")` in the app is in `lib/captcha.ts`. But see §8 — adding one would not reveal these bugs. | **Confirmed**, recommendation **rejected** | — |
| §4 | Closed study-group pages still poll at 800 ms / 1000 ms | `app/study-groups/**` | Confirmed and still unreachable. Dead code. | **Confirmed by inspection** | **LOW** |
| §9 | The 30 s timeout makes these bugs easier to reach | `lib/supabaseAuthLock.ts:38` | Confirmed as a fact, wrong as a worry. `SUPABASE_REQUEST_TIMEOUT_MS = 30_000` does turn a hang into a failure — but the abort lands in the same `.catch` inside postgrest/auth and comes back as an error object. It makes the *silent-empty* bugs easier to reach, not the lock-ups. | **Misdiagnosed** | — |

### The mechanism, settled

This table is the reason half the audit needs re-reading. It is read from the
installed library source, not from memory.

| What the code calls | What happens when the connection drops |
|---|---|
| `supabase.from(…).select/insert/update/delete` | **Resolves** `{ data: null, error: { message: "TypeError: Failed to fetch" }, status: 0 }` — `postgrest-js/dist/cjs/PostgrestBuilder.js:172-207` |
| `supabase.rpc(…)` | the same |
| `supabase.auth.*` — `signUp`, `signInWithPassword`, `getUser`, `getSession`, `resetPasswordForEmail`, `updateUser`, `verifyOtp`, `exchangeCodeForSession` | **Resolves** `{ error }`. A fetch failure becomes `AuthRetryableFetchError`, which extends `AuthError`, and every method returns rather than rethrows those |
| `supabase.storage.*` | **Throws.** A network `TypeError` is not a `StorageError`, so `StorageFileApi.js:96-104` rethrows it |
| plain `await fetch("/api/…")` | **Throws** |
| the 30 s abort timeout | behaves as its transport above: swallowed by postgrest and auth, thrown by storage and raw fetch |

Nothing in the app uses `.throwOnError()`. I checked.

**So:** the only places a dropped connection can leave a button or a spinner
stuck are the ones that touch storage or call `fetch` directly. Everywhere else
the failure is handled — in the sense that execution carries on — and the
*result* is a lie.

---

## 3. New findings

### 3.1 — A Bible in One Year reader can be shown back on Day 1 — HIGH

`components/library/BibleYearOverview.tsx:66-78` → `lib/bibleYearProgress.ts:74-77`

If the progress read fails, `fetchBibleYearPosition` returns `EMPTY_POSITION`.
The overview then opens the "Days 1-30" range and shows nothing completed.

Somebody 280 days into a 365-day plan is told they are on Day 1 and have read
nothing. The audit flagged reading progress generally; this is the specific
screen where it is most likely to be seen and most upsetting. 6,071 rows in
`bible_year_day_progress` say people are using it.

**Status:** Confirmed by inspection. Both calls in the path provably resolve
rather than throw, so this is the certain outcome of a failed read, not a
possibility.

### 3.2 — Highlights and verse notes can vanish from a chapter — HIGH

`lib/verseHighlightingApi.ts:28` and `:44`

`fetchHighlights` and `fetchHighlightRanges` both `return []` when the read
fails. Your highlights and the notes attached to them disappear from the
chapter. This is user-written content, so it reads as loss, not as a glitch.

Two notes. Nothing is actually deleted: every delete is keyed to an explicit tap
on a specific highlight, and none writes the in-memory set back. But
`upsertHighlight` at L48 never looks at its error either, so a highlight can
fail to save with no sign at all.

**Status:** Confirmed by inspection. Same class as 3.4, missed by the audit.

### 3.3 — A post's comments can show as "no comments" — HIGH, reproduced

`components/GroupPostThread.tsx:104-163`, `app/bb-feed/page.tsx` comment loader

`loadThread` makes four or more reads with no error check and `setLoading(false)`
as its last line. On a failed read the thread renders empty.

**Reproduced live.** With Supabase requests rejected in the browser, I opened a
post's comments on the live feed: 2 requests blocked, **zero** skeletons, no
message on screen, nothing in the console. The comments simply were not there.

This one matters more than it looks, because `GroupPostThread` is the discussion
under each day of the community study — the thing the dashboard's "Today's Group
Study" button now opens.

### 3.4 — A live 2-second database poll, for a feature that is switched off — HIGH

`app/people-in-the-bible/page.tsx:531-552`

```
// Listen for credit changes (simulate: poll every 2s for demo, or update after credit use)
```

Every 2 seconds, for as long as the page is open, this calls
`supabase.auth.getUser()` and then selects from `profile_stats`. It is **not**
gated on tab visibility and it keeps running in a background tab. That is
~3,600 requests an hour per open tab — the same shape as the 8-second poll in
`AppShell` that starved the database into three outages in October.

It is gated on `if (!profile || profile.is_paid || profile.ignore_credit_phase1)
return`, and since the app has been free since August nobody is `is_paid`, so it
runs for effectively every reader who opens that page.

And it cannot do anything. The only thing it leads to is
`if (!CORE_STUDY_IS_FREE && prev === 5 && curr === 4) setShowEducationModal(true)`,
and `CORE_STUDY_IS_FREE` (`lib/accessPolicy.ts:16`) is `true` unless
`NEXT_PUBLIC_CORE_STUDY_FREE === "false"`. The condition is dead.

**Status:** Confirmed by inspection. Deleting the whole `useEffect` is the fix.
It is one file and one block, and it is the cheapest win in this document.

### 3.5 — The 1,000-row API cap, and what it silently truncates — MEDIUM, measured

Measured, not guessed: **every PostgREST response on this project is capped at
1,000 rows**, for the publishable key *and* the secret key. I confirmed it by
asking for 5,000 rows of a 5,494-row table and receiving exactly 1,000, with
`content-range: 0-999/5494`.

There are **210 selects in live code with no `.limit()`, `.range()`,
`.single()` or `.maybeSingle()`**, and **39 tables now hold more than 1,000
rows**. Each of those queries sees the first 1,000 rows and believes it has
them all. Two that matter:

- `app/devotionals/[id]/page.tsx:645` reads `master_actions` filtered only by
  action type and a title `ilike`, across all users, to work out community
  progress on a study page. `master_actions` holds **202,834 rows**. That
  community progress is computed from a truncated slice.
- `app/profile/[userId]/page.tsx:771` reads one person's entire
  `master_actions` history unordered-by-limit for the activity log. A heavy
  user's log stops at 1,000 entries, and loading their profile pulls 1,000
  rows every time.

Worth saying clearly: **the places where this would have done real damage have
already been handled.** `app/api/cron/enroll-remaining-signups/route.ts:128-141`
pages properly with `.range(from, from + 1000 - 1)`, and so do the admin
campaign and email-analytics routes. So this is a known trap that was fixed
where it bit, and is still open everywhere else.

### 3.6 — The password-reset page can sit on a spinner — MEDIUM

`app/reset-password/page.tsx:100-174`

The effect that establishes the recovery session has four awaits and no `catch`.
Each branch sets `isValidToken` on both success and refusal, so the usual cases
are covered — but if any of them throws, `isValidToken` stays `null` and the
render at L242 shows a spinner with no way out. `exchangeCodeForSession` and
`setSession` both resolve rather than throw on a network failure, so the
reachable path here is narrow; it is still the only screen in the app with no
exit at all. A ninth stuck screen, not on the audit's list.

### 3.7 — Crash reports can store a live password-reset token — LOW, privacy

`lib/crashRecovery.ts:59`

```
page: window.location.pathname + window.location.search,
```

A crash on `/reset-password?token_hash=…&code=…` writes that query string into
`bug_reports.page`, where it is then readable at `/admin/bugs`. The crash route
strips the query before fingerprinting, but stores `page` whole. Low likelihood,
trivial to fix (`pathname` only), and it needs fixing before any *more* error
reporting is added — see §8.

### 3.8 — The store apps have no offline cache at all — MEDIUM

> **Wrong, corrected 2026-11-10.** This section is the one finding in the
> document that did not hold up. It read the first of *two* service-worker
> effects in `AppShell.tsx` and missed the second.
>
> The effect quoted below handles reload-on-new-worker only. A second effect
> (`AppShell.tsx:1670`, "Register the service worker for everyone, logged in
> or not, web or app", added 2026-10-11 in `93db859ea`) registers with **no
> native guard** — only a localhost skip. So the worker *is* registered in both
> store apps, and offline reading has worked in the Play app since October.
>
> It almost certainly does nothing on **iOS**, but for a different reason than
> this section gives: service workers are disabled in WKWebView unless the
> hosts are listed under `WKAppBoundDomains` in `Info.plist` **and**
> `limitsNavigationsToAppBoundDomains` is `true`. `capacitor.config.ts:80`
> sets it to `false` on purpose and the plist key does not exist. That is
> Apple's rule read, not a device tested — Apple has never documented it
> properly and Code Level Support has said the opposite. Attaching Safari Web
> Inspector to the app's WebView and watching for `[SW] registration failed`
> from `AppShell.tsx:1674` would settle it.
>
> What was true and has been fixed (`86dcb9e2`): `native/www/offline.html`
> told an iOS reader "Anything you've saved for offline reading is still
> available" while the same build hid `SaveForOfflineButton` for want of a
> worker.
>
> So P3-2 was not "should the store apps get a cache". It was "should iOS turn
> app-bound domains on to use the cache it already has" — and the answer,
> decided 2026-11-10, is **no**. The flag also limits the WebView to the
> declared domains, which `capacitor.config.ts:80` turns off on purpose so
> outside links can go through the Browser plugin: constant behaviour traded
> for a cache nobody has reported wanting. The full reasoning and the
> groundwork, should it ever be reopened, are in `NEXT_BUILD.md` under the iOS
> entry. **P3-2 is closed, and with it the roadmap.**


`components/AppShell.tsx:1619-1623` registers the service worker and then:

```
// The native app shell loads the live site itself; no PWA service worker
if (isNativeApp()) return;
```

So the network-first cache and the "save for offline" feature
(`lib/offlineDownload.ts`, which needs an active worker) exist for website and
PWA readers and **not** for anyone who installed from the App Store or Play
Store. Those are the readers most likely to be on mobile data.

The native app is the live site in a webview, so every screen needs the network.
`offline.html` covers a failed *top-level* load; it does nothing for a fetch that
fails inside a page that already loaded. On a phone, that is the common case —
which is why §2's silent-empty bugs matter far more on mobile than on a desktop.

### 3.9 — `GroupPostThread` walks replies one query per depth level — LOW

`components/GroupPostThread.tsx:121-131`: a `while` loop issuing one query per
level of reply nesting, unbounded. Fine at today's depths; it is a slow page
waiting for a long thread.

### 3.10 — `npm run lint` lints other sessions' worktrees — LOW

`eslint` has no ignore for `.claude/worktrees`, so a bare `npx eslint .` walks
every worktree in there, `.next` build output included. It still passes, it just
takes far longer than it should and reports Babel notes about generated
bundles.

---

## 4. Critical user risks

Ordered by what it costs the person holding the phone.

| Risk | How it happens | Real or apparent |
|---|---|---|
| **Anyone can read thousands of people's email addresses and some of their written notes** | P0-1. No sign-in needed. Reproduced. | **Real.** Already exposed. |
| **A reader is shown as having read nothing** — chapters unread, streak wrong, Bible in One Year back on Day 1 | A single failed read, which on mobile data is routine | **Apparent.** Nothing is deleted; it comes back on the next good load. Still the most upsetting thing this app can do. |
| **A comment is typed, the box empties, and it was never saved** | `bb-feed` L898 clears the box outside the success guard | **Real loss** — of what they wrote, not of stored data |
| **Someone a reader deliberately blocked becomes visible again for a minute** | `userBlocks.ts` returns "nobody blocked" on failure and caches it for 60 s | **Real**, and a trust-and-safety matter rather than a glitch |
| **Highlights and verse notes disappear from a chapter** | `verseHighlightingApi.ts` returns `[]` on failure | **Apparent**; the rows are safe |
| **A password-reset token ends up in the bug tracker** | `crashRecovery.ts` sends the query string | **Real**, low likelihood |
| **A photo post leaves the composer dead** | `storage.upload` rethrows; no `try` around it | Real, recoverable by reloading |

Two things that are explicitly **not** risks, contrary to the earlier audit:
signup and login do not lock up on a dropped connection, and no screen in the
list pulses forever. They fail in a quieter and more misleading way.

---

## 5. Database health — what I actually measured

Read-only throughout. No table, policy, index or row was modified. Everything
below is a measurement, not an estimate.

**What I had access to:** the publishable key and the secret key from
`.env.local`, used for `GET` requests against the REST API.

**What I could not see, and you would need the Supabase dashboard for:** query
latency, slow-query logs, index usage and whether any index is missing,
connection-pool usage, cache hit rates, the actual text of any RLS policy, and
the request-volume history that would show whether the October fix held. **None
of that is estimated anywhere in this document.**

### Measured

- **144 tables and views** are exposed through the API.
- **Every response is capped at 1,000 rows**, both keys. Confirmed against a
  5,494-row table.
- **39 tables are now over that cap.** The largest:

  | rows | table |
  |---|---|
  | 202,834 | `master_actions` |
  | 90,811 | `email_events` |
  | 90,246 | `landing_page_events` |
  | 63,081 | `email_campaign_sends` |
  | 34,172 | `notifications` |
  | 34,156 | `push_notification_jobs` |
  | 30,764 | `email_funnel_sends` |
  | 12,718 | `completed_chapters` |
  | 11,414 | `trivia_question_progress` |
  | 8,013 | `messages` |
  | 6,620 | `profile_stats` |
  | 5,494 | `user_signups` |

- **Anonymous read access:** of the 144, **15 return rows to a caller with no
  session**. Ten are content that is meant to be public (Bible chapters, chapter
  notes, devotionals, verse of the day). **Five are not**, and that is P0-1.
- **One live 2-second poll** (§3.4). It is the only database poll in the app
  besides `AppShell`'s, which is correctly bounded. Every other `setInterval` in
  live code is a UI clock or an animation.
- `master_actions` at 202,834 rows is the growth curve to watch: it gains a row
  per tracked action per user, several tables read it unbounded, and it is
  already 2.2× the next largest table.

### Is the October overload resolved?

**In the code, yes** — verified line by line (§2). **In production, unmeasured.**
To close that properly, from the Supabase dashboard: Reports → API requests per
hour over the last 30 days, and Database → Query Performance sorted by total
time. If the October fix held, the hourly request count should have dropped by
roughly 7× on 8 October and stayed down. I cannot see that from here.

---

## 6. Mobile reliability — what was actually tested

**No real device test. No simulator, no emulator, no TestFlight build, no
Android internal build.** Nothing in this section was observed on a phone.

What I did instead: read the native architecture and reasoned from it, and ran
the browser tests in §2 and §3.3 on the live site from a desktop.

What the architecture says:

- `capacitor.config.ts` loads `https://www.mybiblebuddy.net/app` remotely. There
  is no bundled app. Every screen depends on a live connection.
- `errorPath: "offline.html"` catches a failed top-level load only.
- **No service worker in the native app** (§3.8), so no cache and no offline
  download for store users.
- `CapacitorHttp` is not enabled, so the relative-URL hang that bit this project
  before is not in play.
- The 7 November auth-lock fix (`lib/supabaseAuthLock.ts`) addresses the real
  mobile killer — a token refresh suspended by iOS holding the auth lock
  forever — and it does so properly: a 5 s acquire timeout that then runs the
  work anyway, plus a 30 s abort on every request.
  `npm run verify:supabase-auth-lock` — **14 checks, all pass**.

### Device checklist, since I could not run it

Each of these should be done on a real phone on **mobile data**, not Wi-Fi, and
each one tests a finding in this document rather than general poking.

1. Read a chapter, mark it complete, then turn on Airplane Mode and reopen the
   book. Does it show as unread? (§3.1 / 3.4)
2. On the Bible in One Year overview, same: does it jump back to Day 1?
3. Open a feed post's comments with Airplane Mode on. Empty thread, or a
   message? (§3.3 — expect an empty thread)
4. Type a comment with Airplane Mode on and post it. Is the box emptied with no
   warning? (3.1 — the one to film)
5. Block someone, force-quit, reopen on a bad connection. Are their posts back?
6. Highlight a verse, leave, return with Airplane Mode on. Still there?
7. Leave the app open on the dashboard for an hour, lock the phone, come back.
   Does it still respond? (the auth-lock fix — this is the regression watch)
8. Post a photo while switching from Wi-Fi to mobile data mid-upload. Does the
   composer come back?
9. Walk into a lift mid-chapter and out again.
10. Sign in with a deliberately wrong password, then with the right one on a weak
    connection. Does the button come back? What does the message say? (3.2 —
    expect "TypeError: Failed to fetch")

---

## 7. Testing coverage — what passed, failed, could not run

### What exists

**There is no test framework.** No Jest, no Vitest, no Playwright, no Cypress —
nothing in `devDependencies` but `eslint`, `typescript` and `tsx`. CI has one
workflow, `ios-build.yml`. So there are no unit tests, no integration tests and
no end-to-end tests.

What exists instead is better than nothing and worth building on: **ten
`scripts/verify-*.ts` suites** run as `npm run verify:*`. Six need no network
and are genuine regression tests — `verify-load-retry.ts` in particular models
the exact load-catch-retry shape of the four screens fixed on 8 November and
renders the component with `react-dom/server`. That is the right idiom for this
project and the right place to put the tests this document calls for.

### What I ran

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **pass**, exit 0, no errors |
| `npx eslint .` (whole repo) | **pass**, exit 0 |
| `npx eslint app components lib scripts` | **pass**, exit 0 |
| `npm run verify:load-retry` | **pass** — 20/20 |
| `npm run verify:auth-lock` | **pass** — 14/14 |
| `npm run verify:bible-year-overview` | **pass** |
| `npm run verify:comment-replies-no-ai` | **pass** — 0 paid AI calls |
| `npm run verify:store-platform` | **pass** — 21/21 user agents |
| `npm run verify:app-download-links` | **pass** |
| `npm run verify:openai-budget` | **pass** |
| `npm run build` | **not run** — a build is a Vercel bill, and nothing here needs one |
| the four network-dependent `verify:*` scripts | **not run** — they read production |

### What could not be run, and why

- **Submitting the failing comment on the live site.** I had the comment box
  filled and the database blocked, and the tooling correctly refused to click
  Post, because posting content in a live app is not something an agent should do
  unasked. So 3.1 is marked **Simulated**, not Reproduced: I ran the handler's own
  control flow offline against a stub returning what postgrest returns. The typed
  text was cleared, nothing was saved, nothing was shown. Nothing was posted to
  the feed, and the box was emptied afterwards.
- **Any device test** (§6).
- **Whether the exposed tables are also anonymously *writable***. Finding out
  means attempting an insert against production. Check it in the dashboard
  instead; it is the first line of the private note.

### Regression tests the fixes need

One per fix, in the `scripts/verify-*.ts` idiom, written **before** the fix so it
fails first. Each must simulate a **returned error object**, not a throw — that
is the mistake the earlier audit's reasoning would have baked into the tests.

| Test | Asserts |
|---|---|
| `verify-comment-not-lost.ts` | On a failed insert: text kept, message shown, count unchanged |
| `verify-progress-not-wiped.ts` | A failed read is distinguishable from "no chapters read"; the screen says so |
| `verify-blocks-fail-closed.ts` | A failed block read keeps the previous list and does not cache the empty one |
| `verify-anon-access.ts` | The five tables from P0-1 return nothing to the publishable key — asserts closed, so it is safe to commit |
| `verify-no-unbounded-polls.ts` | No `setInterval` in live code calls Supabase faster than once a minute, and all are visibility-gated |
| extend `verify-load-retry.ts` | The two newly found screens and `BibleYearOverview` |

Failure conditions each of these should cover: a rejected request, a timeout
(the 30 s abort), an unauthorised response, an empty response, a duplicate
submit, and the screen unmounting mid-request.

---

## 8. Monitoring — and why the original recommendation would have failed

**Answering Louis's nine questions directly.**

**1. What is captured today.** React render crashes, via `app/error.tsx` and
`app/global-error.tsx` → `lib/crashRecovery.ts` → `/api/bug-reports/crash` →
`bug_reports`, with fingerprint dedupe, occurrence counts, platform, reporter
attribution, and auto-reopen. Plus whatever people type into "Report a Problem".
For a crash, this is genuinely good.

**2. What stays invisible.** Every bug in this document. Not one of them is a
crash, and — the key point — **not one of them throws or rejects**, except the
storage and raw-`fetch` paths.

**3. Would global listeners help?** **Mostly no, and this is the correction that
matters.** `window.onerror` and `unhandledrejection` only fire on an uncaught
throw. postgrest and auth swallow their failures, so a failed read reaches
neither listener. Shipping those thirty lines and waiting a day would have
produced an almost empty list, and the list would have been read as "these bugs
are theoretical".

They are still worth having, for what they *do* catch: null-dereference
`TypeError`s after an unchecked error, chunk-load failures after a deploy,
third-party script errors, and the storage/`fetch` rejections. Just not as the
instrument for §2 and §3.

**The right instrument is the Supabase client itself.** `lib/supabaseAuthLock.ts`
already wraps the client's `fetch` for the 30 s timeout — that wrapper is the
hook. Roughly twenty lines: when a Supabase request fails or returns status 0,
record the table, the operation, the page and the reason, and report it. That
catches every single finding in §2 and §3, by construction, because every one of
them is a failed Supabase request.

**4. Do locally-handled errors still need reporting?** Yes — that is the whole
point here. "Handled" in this codebase usually means "returned `[]`". Those are
exactly the events with no record.

**5. Avoiding duplicates.** Server-side dedupe already exists (fingerprint, 14-day
window, occurrence counter). Add a client-side guard so the network cost is
bounded too: a `Set` of fingerprints already sent this page-load, so one broken
screen retrying ten times posts once.

**6. Keeping personal data out.** Send the table name and the operation, never
the payload or anything the reader typed. Send `pathname` only — **and fix
`lib/crashRecovery.ts:59` first** (§3.7), which sends the query string today and
would otherwise hand a password-reset token to the new reporter as well.
Truncate every field; the endpoint already does this on its side.

**7. Could monitoring itself flood the database?** Yes, and this is the real
constraint. `recordBugReport` is 2-4 round trips per report (select, update,
attach reporter, log event). A reader on a dead connection generates a failed
request every few seconds. Unbounded, this turns a flaky connection into a
write storm — the October failure mode, arriving through the monitoring.

**8. Rate-limiting and grouping.** Three bounds, all client-side, all cheap:
one post per fingerprint per page-load; a hard ceiling of ~10 reports per
page-load; and `navigator.onLine === false` suppresses entirely, because a reader
with no connection is not news and cannot post anyway.

**9. Not becoming a cause of crashes.** Every path in the reporter inside
`try/catch`, fire-and-forget with no `await` in any render or handler path, and
`keepalive: true` on the post so it survives the page unloading.

**Recommendation:** build the Supabase-client instrument, not the global
listeners, and build it as **P1**, not before everything else. Louis's instinct
to add no paid service is right — the infrastructure is already here. But the
original "do this first and wait a day" plan rests on the listener working, and
it would not have.

---

## 9. Repair roadmap

Every fix below is: no schema change, no change to existing user data, and no
rewrite. Database work is confined to P0-1, which is policy, not data.

### P0 — immediate

**P0-1 · Close the anonymous read access**
- *Root cause:* missing or permissive `SELECT` policies on four tables, plus two
  views created without `security_invoker`.
- *Files:* none. Supabase SQL editor only.
- *Effort:* 30 minutes, plus a re-check.
- *Regression risk:* **none measurable.** Every read of those tables in the
  codebase is server-side with the secret key, which ignores RLS. One of them is
  referenced nowhere at all.
- *Tests:* `verify-anon-access.ts`, asserting closed.
- *Rollback:* re-grant the policy. Immediate.
- *Database change:* **yes — policy only.** Needs Louis's explicit approval, per
  his own rule about not changing security policy without it.
- *Deploy:* nothing to deploy. It takes effect the moment the policy changes.
- Details in the private note, not in this public repo.

### P1 — high-priority reliability

Group these: **P1-1 to P1-4 are one change** — teach the data layer to
distinguish "nothing" from "could not check" — and should ship as one commit with
one round of testing, because they share a pattern and a test shape.

**P1-1 · Reading progress** (`lib/readingProgress.ts`, 9 sites)
Return a result that can say "unknown" instead of `[]`/`0`/`false`, and have the
screens show the last known state or say plainly that it could not load.
*2-3 hours. Regression risk: medium — it changes what people are told about their
own history, so it is the one that needs real testing. Rollback: revert the
commit; no data touched.*

**P1-2 · Bible in One Year position** (`lib/bibleYearProgress.ts:74-77`,
`components/library/BibleYearOverview.tsx`)
Same change, and the screen most likely to be seen. *1 hour. Low risk.*

**P1-3 · Highlights and verse notes** (`lib/verseHighlightingApi.ts:28,44`, and
check the error on `upsertHighlight`)
*1 hour. Low risk.*

**P1-4 · Blocked users fail closed** (`lib/userBlocks.ts:28`)
Keep the last known list on failure, and **do not cache an empty result**.
*1 hour. Low risk — the safe way to be wrong is somebody staying hidden.*

**P1-5 · The vanishing comment** (`app/bb-feed/page.tsx:898`)
Move `setNewComment("")` inside the success guard; show a message; keep the text.
*20 minutes. No risk. Ships on its own, because it is the only CRITICAL item in
§2 and should not wait behind P1-1's testing.*

**P1-6 · Delete the 2-second poll** (`app/people-in-the-bible/page.tsx:531-552`)
Delete the `useEffect`. *10 minutes. No risk — the only thing it can trigger is
behind an `if` that is permanently false. Ships with P1-5.*

**P1-7 · The Supabase failure instrument** (§8)
*Half a day including the rate limits. Low risk. Must include the
`crashRecovery.ts` query-string fix (§3.7) in the same commit.*

### P2 — general stability

**P2-1 · The seven silent-empty screens** — `app/bible-trivia/books`,
`app/bible-trivia/people`, `components/ScrambledUpgradeGate`,
`components/TriviaBookClient`, `components/library/BibleYearOverview` (covered by
P1-2), `app/devotionals/[id]/day/[dayNumber]`, `components/GroupPostThread`.
Same `LoadFailedNotice` treatment already shipped for five siblings — but driven
by a checked error, not a `catch`, since nothing throws. *Half a day. Low risk —
the pattern is established and tested.*

**P2-2 · The reset-password spinner** (`app/reset-password/page.tsx:100-174`) —
a `catch` that sets `isValidToken(false)`. *20 minutes. No risk.*

**P2-3 · The photo-upload composer lock** (`app/bb-feed/page.tsx:366`) — a `try`
around the storage call. *20 minutes. No risk.* Genuinely a lock-up; storage
throws.

**P2-4 · The auth-door wording** (`app/signup`, `app/login`, `app/page.tsx`,
`app/reset-password`) — these do not hang, but they show
`TypeError: Failed to fetch`. Map a status-0 error to "Couldn't reach Bible
Buddy. Check your connection and try again." *1 hour across four files. No risk.*

**P2-5 · Bound the unbounded reads that matter** (`app/devotionals/[id]/page.tsx:645`,
`app/profile/[userId]/page.tsx:771`) — an explicit `.limit()` so the truncation
is a decision instead of an accident, and a shared paging helper for anything
that needs all the rows. *2 hours. Low risk.*

### P3 — cleanup

**P3-1 · Delete the closed study-group pages** — removes 46 of the 109 flagged
button handlers, 6 stuck-loading flags, the 800 ms and 1000 ms polls, and 35 of
the error-discarding reads, in one deletion. By far the best ratio in this
document. *Half a day, mostly checking nothing live imports them.
`components/GroupWeeklyTriviaCard.tsx` goes with them.*

**P3-2 · Give the native app a cache** (§3.8) — a product decision, not a bug
fix. Worth its own conversation. **Re-scoped 2026-11-10: see the correction at
§3.8. Android already has the cache; the question is iOS and app-bound
domains.**

**P3-3 · `.claude/worktrees` in `.eslintignore`** — *5 minutes.*

**P3-4 · `GroupPostThread`'s reply walk** (§3.9) — *1 hour.*

### What groups, and what ships alone

| Ship together | Why |
|---|---|
| P1-1 … P1-4 | One pattern, one test shape, one round of testing |
| P1-5 + P1-6 | Both tiny, both zero-risk, both wanted immediately |
| P1-7 + §3.7 | Do not add error reporting while it can store a reset token |
| P2-1 + P2-2 | Same `LoadFailedNotice` component |
| P2-4 alone | Wording only; easy to read in a diff and easy to revert |
| P3-1 alone | A large deletion deserves its own commit to revert cleanly |

P0-1 is not a deploy at all.

---

## 10. Timeline

Realistic, including the testing, not just the typing.

| Phase | Work | Effort |
|---|---|---|
| 0 | P0-1, the policy change plus re-check | **half a day** |
| 1 | P1-5, P1-6 and their two tests | **half a day** |
| 2 | P1-1 … P1-4 and their three tests | **2 days**, of which half is testing P1-1 |
| 3 | P1-7, the instrument | **half a day** |
| — | *wait and read what it reports* | **2-3 days of elapsed time, no work** |
| 4 | P2-1 … P2-5, reordered by what the instrument actually showed | **1.5 days** |
| 5 | P3-1, the deletion | **half a day** |
| | **total** | **about 5.5 days of work over 8-9 elapsed days** |

The waiting in phase 3 is the valuable part, and it is the one piece of the
original audit's plan worth keeping: order phase 4 by evidence rather than by my
judgement. The difference is that the instrument will actually see these
failures, where the global listener would not have.

---

## 11. Approval checklist

**Authorise first, one line each:**

1. **P0-1 — the policy change.** The only item that touches Supabase, the only
   one that cannot wait, and the only one needing a security decision. Read the
   private note first; it is four tables and two views. **Also check in the
   dashboard whether those tables are anonymously *writable*** — I would not test
   that against production.
2. **P1-5 and P1-6 — the vanishing comment and the 2-second poll.** Half a day,
   no risk, both obviously right. By the deploy test in `CLAUDE.md` these are
   step 3 work: they commit untagged and go out on the next scheduled build.
3. **P1-1 to P1-4 — "empty" versus "could not check".** The real repair. Needs
   your sign-off on *wording*, not on code: what a reader should see when their
   progress cannot be loaded. "Couldn't load your progress — pull to refresh"? Or
   the last known numbers with a quiet note? That decision is yours and it blocks
   the work.
4. **P1-7 — the instrument.** Confirm you want the Supabase-client version rather
   than the global listeners the 8 November audit proposed, and that no paid
   service is going in.

**Decide, not urgent:**

5. **P3-1 — delete the closed study-group pages?** Best cleanup ratio in the
   document. It is a deletion, so it wants a yes rather than an assumption.
6. **P3-2 — should the store apps have an offline cache?** Product, not repair.
7. **Device testing.** I cannot do §6. Either you run that ten-item list on your
   phone, or we accept mobile as unverified and say so.
8. **The dashboard numbers.** Two screenshots — API requests per hour for 30 days,
   and Query Performance by total time — would close the last open question in
   §5, which is whether the October fix held in production and not just in the
   code.

**Nothing in this document had been implemented when it was written.** P0-1 was
then approved and closed the same day — see Appendix A. Everything else in the
roadmap is still untouched: no other fix has been written, nothing deployed, and
no production row changed.

---

## Appendix A — P0-1, found and closed, 9 November 2026

Written after the fact, once the exposure was shut and it was safe to describe
in a public repository. The body of this report above was written while it was
still open, which is why it never says what "it" was.

### What was open

Six relations in `public` handed their rows to anyone holding the publishable
key. That key is public by design — it ships inside the website's JavaScript, so
anybody who opens dev tools has it. No sign-in, no session, no cookie.

| Relation | Rows | What was in it |
|---|---|---|
| `user_signups` | 5,495 | `user_id`, **`email`**, `created_at` |
| `study_group_members` (view) | 7,333 | `user_id`, `display_name`, `role`, `status` |
| `weekly_bible_report_sent` | 5,755 | `user_id`, `week_key` |
| `notes_with_users` (view) | 134 | `display_name`, `passage`, **`research`** — the text people wrote, with their names |
| `ses_campaign_stats` (view) | 57 | campaign subjects, sends, opens, clicks, bounces |
| `reading_sessions` | 2 | `user_id`, `session_date` |
| `featured_bible_characters` | 0 | empty, so it never showed up as a read leak |

Reproduced end to end from a plain Node script with nothing but that key: paging
six times through `user_signups` returned all 5,494 email addresses then on
record, across 175 domains. Read-only; nothing was modified.

### Two causes, and a third nobody was looking for

**Permissive policy.** `user_signups` had row level security *on* and a policy
named `user_signups_select_all` — `SELECT`, role `public`, `USING (true)`. RLS
being on is not the same as RLS doing anything.

**Views run as their owner.** A view created the ordinary way reads with the
privileges of whoever created it, so it goes straight past the policies on the
table beneath. `notes` itself was correctly locked and returned nothing
anonymously; `notes_with_users`, sitting on top of it, returned everything.

**And the one that was not in the original report: three tables had row level
security switched off altogether** — `reading_sessions`,
`weekly_bible_report_sent` and `featured_bible_characters`. With the default
anon grants in place, RLS off means readable *and writable*. The scan had not
flagged `featured_bible_characters` because the table is empty, so it looked
closed while being wide open.

That is also the answer to the question the first pass deliberately left alone,
whether any of this was anonymously **writable**. It was, and it is better
answered from the catalogue than by attempting an insert against production.
`pg_relation_is_updatable` reported **28** for `study_group_members` — insert,
update *and* delete. A simple `SELECT ... FROM group_members` view is
auto-updatable, so it was not only a window onto 7,333 membership rows but a
door: an anonymous caller could have deleted or rewritten every one of them,
with the four correct policies on `group_members` never consulted. Nothing
suggests anyone did.

### What changed

`scripts/close-anon-access-2026-11-09.sql`, run once in the Supabase SQL editor:
the permissive policy dropped, row level security enabled on the three tables,
and `security_invoker = true` set on the three views. No code, no deploy, no row
touched. It took effect the moment it ran.

`featured_bible_characters` is the one exception that kept a read policy, for
`authenticated` only, because `lib/featuredCharacters.ts` reads it from the
browser. Everything else here is read exclusively by server-side routes holding
the service-role key, which bypasses RLS — the email-funnel and admin routes,
`lib/accountDeletion.ts`, `lib/weeklyBibleReport.ts`, and the admin campaigns
route. `notes_with_users` is referenced nowhere in the codebase at all.

### Checked afterwards

- `npm run verify:anon-access` — new, and now the guard against this returning.
  All fourteen relations closed; the nine genuinely public content tables (the
  blog, the chapter library, verse of the day) listed beside them for contrast,
  so the difference stays visibly deliberate.
- Service-role reads still return their full counts: `user_signups` 5,495,
  `group_members` 7,333, `ses_campaign_stats` 57. The cron and admin paths are
  unaffected.
- From the catalogue: **0** tables with row level security off, **0** `SELECT`
  policies on `user_signups`. The only two views still without
  `security_invoker` are `email_engagement` and `email_engagement_summary`,
  which `anon` holds no grants on whatsoever.

### Left open on purpose

`notes_with_users` is closed but now errors for every role, including
service-role, because with `security_invoker` it needs `SELECT` on `auth.users`
and nothing has it. Nothing reads the view, so this breaks nothing. It is a
leftover and can simply be dropped; the SQL file carries its definition.
