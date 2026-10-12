# App Store — working plan

Updated 2026-10-12. Replaces the first audit's framing, which wrongly made
Apple Developer enrolment sound like a gate on starting. It isn't. Membership
is paid in the last week of October; all of the unpaid build is already done.

---

## 🟦 50% ready

```
[████████████░░░░░░░░░░░░░]  50 / 100
```

| | |
|---|---|
| **Compliance and legal** | 🟩 done — 17 of 17 points |
| **The app itself** | 🟨 most of the code written — 28 of 48 |
| **Apple account and signing** | ⬜ blocked on the €99 — 0 of 21 |
| **Store listing and submission** | 🟨 5 of 14 |

Weighted by effort, not by counting tasks — see *Scoring* at the bottom, where
every point is listed.

### The ceiling without a Mac or the membership is about 52%

Worth saying plainly rather than letting the number creep. What is left splits
into three piles and two of them cannot be touched yet:

- **~2 points still doable on Windows** — wiring the offline-download button
  into the dashboard, which is a design decision, not a coding one.
- **16 points need a Mac** — `cap add ios`, a build on a real iPhone, device
  testing, and confirming service workers behave in WKWebView. A free Apple
  ID covers all of it; Xcode is the blocker, not the money.
- **21 points need the paid membership** — Sign in with Apple, APNs,
  distribution signing, TestFlight. The code for the first two is written and
  sitting behind environment variables.

So 50% is close to everything that can be done before payday. The next real
jump needs a Mac in front of you.

---

## Start here

**Wait for the membership, then go.** Everything buildable without a paid
Apple account is built, and it compiles: Codemagic build #3 produced an iOS
app on a Mac mini M2 with all four native plugins linked. Nothing is blocked
on Windows any more, and nothing is blocked on owning a Mac.

What is left needs the €99. Louis decided on 2026-10-12 to pay in the **last
week of October** rather than earlier, so the money is only committed once it
is certain it can be spared. Target ~27 Oct; approval is usually 24-48h,
which still leaves Stage 2 its full window.

The one thing that cannot be checked before then: **the app has never run.**
Compiling is not working. Safe areas, the status bar, whether the service
worker behaves inside WKWebView, whether the 08:00 reminder actually fires,
whether audio survives a locked screen - all unknown until TestFlight puts it
on a real iPhone, and TestFlight needs the membership. Expect a list of small
fixes on day one of Stage 2; that is normal, and it is why submission sits on
23 Nov with slack rather than in October.

### Built on 11 Oct

| | |
|---|---|
| Capacitor shell | `capacitor.config.ts`, `appendUserAgent: "BibleBuddyApp"` — wakes every native switch shipped in September |
| Offline reading | the service worker now registers for everyone; it only ever ran for readers who had enabled web push |
| Daily reminder | local notification at 08:00, needs nothing from Apple |
| Share sheet | the real iOS sheet instead of silently copying to the clipboard |
| Haptics | a buzz on finishing a chapter or a plan day |
| Lock-screen audio | title, artwork, pause and scrubber on the lock screen |
| Sign in with Apple | written, behind `NEXT_PUBLIC_APPLE_SIGNIN_ENABLED` |
| Remote push | code and `native_push_tokens`, behind `NEXT_PUBLIC_NATIVE_PUSH_ENABLED` |
| App icon | `native/appstore/app-icon-1024.png` |
| Submission pack | `APP_STORE_LISTING.md` — privacy answers, listing copy, review notes |
| Privacy policy | corrected: it still named Systeme as the email processor |

---

## The three stages

| | When | What it is |
|---|---|---|
| **1. Before the membership** | now → ~27 Oct | Build the app. Everything that doesn't need a paid Apple account. **Done.** |
| **2. After the membership** | ~27 Oct → ~15 Nov | €99 enrolment, then the Apple-gated pieces + TestFlight, and the first run on a real iPhone. |
| **3. Submit** | ~15 Nov → 23 Nov | Store listing, privacy, reviewer access. **Submit 23 Nov, launch 9 Dec.** |

Two and a half weeks between submission and launch is deliberate: first
submissions of app-shaped-websites usually get at least one conversation with
review, and you want room for it rather than a panic in December.

---

## Stage 1 — now, before the membership

**The Mac problem is solved, and it cost nothing.** Xcode only runs on macOS,
which looked like a hard blocker on a third of this work. It was not: CI
builds on someone else's Mac. `codemagic.yaml` runs on a Mac mini M2 (free
individual plan, 500 macOS minutes a month), and
`.github/workflows/ios-build.yml` does the same on GitHub's Macs whenever
that account's billing lock clears. No Mac to buy, borrow or rent.

What CI cannot do is put the app on a phone in Berlin. That gap closes in
Stage 2 through TestFlight, which installs over the air - so even then, still
no physical Mac.

### Can be written on Windows

| Task | Why |
|---|---|
| ~~Capacitor install + `capacitor.config.ts`~~ | ✅ done |
| ~~Offline reading~~ | ✅ done — service worker now registers for everyone, web and app |
| ~~Native share sheet~~ | ✅ done |
| ~~Haptics~~ | ✅ done |
| ~~Local reading reminders~~ | ✅ done — 08:00 daily, no Apple config |
| Background / lock-screen audio | 🟨 lock-screen controls done; background playback needs Info.plist (**Mac**) |
| ~~Sign in with Apple — button and call~~ | ✅ written, behind a flag |
| ~~Remote push — code + token table~~ | ✅ written, behind a flag |
| Demo account for the reviewer, with real data in it | **Apple requires**. Guests are off, so review hits a signup wall |
| ~~Confirm the 13+ claim~~ | ✅ checked — no gate exists, and none is required at 12+ |
| ~~Draft the App Privacy answers~~ | ✅ done → `APP_STORE_LISTING.md` |

### Needs Mac + Xcode

| Task | Notes |
|---|---|
| ~~`npx cap add ios`~~ | ✅ done in CI — Capacitor 8 uses Swift Package Manager, so there are no pods |
| Info.plist: background audio, notification strings | Free account is fine |
| Build and run on your own iPhone | Free account; 7-day profile, reinstall weekly |
| Test offline, audio, share, haptics on a real device | The simulator lies about all four |

**Not possible on a free account at all** — these are Stage 2 by force, not by
choice: Push Notifications, Sign in with Apple, App Groups (so home-screen
widgets wait too), TestFlight.

---

## Stage 2 — after the membership (last week of October)

1. Enrol in the Apple Developer Program, €99/yr. **Do this first** — approval
   can take a few days, and everything below is blocked on it.
2. Sign in with Apple: Services ID, key, Supabase provider, then switch on the
   button written in Stage 1. *(Apple requires — 4.8)*
3. Remote push: APNs key, Push Notifications capability, switch on the
   registration written in Stage 1.
4. Distribution certificate and provisioning profile.
5. TestFlight build to yourself and a few readers. First real multi-device
   test.
6. Home-screen widget — verse of the day. *(Recommended. Needs App Groups,
   which is why it waits. Reviewers notice widgets.)*

---

## Stage 3 — submit

1. App icon 1024×1024, and 6.9" iPhone screenshots.
2. Name, subtitle, keywords, description, "What's New".
3. App Privacy answers entered. Ads stay off in the native build — that keeps
   IDFA, the tracking prompt and the whole "Data Used to Track You" section
   out of it. Protect that.
4. Age rating questionnaire.
5. App Review notes: demo credentials, and how reports are handled within 24
   hours. *(Apple requires — 1.2)*
6. Export compliance: HTTPS only, exempt, but you still answer it.
7. **Submit 23 Nov.** Review is usually 24–48 hours. Budget for one rejection.
8. **Launch 9 Dec.**

iPhone only for the first release. Declaring iPad support means it has to
actually work on iPad, and that is a second round of screenshots and layout
testing for no launch-day benefit.

---

## Technical notes

### What already works

Stage 1 compliance shipped 2026-09-21 (`051080bcb`): in-app account deletion,
report and block across posts/comments/profiles, community guidelines, terms
at signup, AI disclosure on Little Louis, all payment paths removed, and the
native switches in `lib/nativeApp.ts`. That is most of what gets apps rejected
on policy, and it is done.

Ads are already disabled inside the native build
(`components/AdSlot.tsx:106`).

### The one unresolved decision

Capacitor can either load `https://www.mybiblebuddy.net` remotely via
`server.url`, or bundle web assets locally. Remote loading is far simpler for
a server-rendered Next app, and it is also what Guideline 4.2 is written to
catch. The answer is not to avoid remote loading — it is to put enough real
native capability around it that a reviewer cannot call it a repackaged
website. That is why offline, audio, share, haptics and push are on the Stage 1
list rather than treated as nice-to-haves.

### Notifications are a product gap, not just a review one

The native app has no notifications at all today. Web push is deliberately off
there — remote notifications go through APNs, not the Push API — and nothing
has replaced it yet. The service worker *does* now register in the app, so
offline caching works, but a service worker cannot deliver a reminder.
Shipping like this would make the App Store version *worse* than the website,
and daily reminders are the retention loop. Local notifications in Stage 1 cover the daily reading reminder without
any Apple configuration; remote push in Stage 2 covers group activity and
streaks.

### Reports and the 24-hour rule

`/admin/reports` is a manual queue read by one person. Apple expects reports
acted on within 24 hours. Either commit to checking it daily and say so in the
review notes, or put automated filtering in front of posts before submission.

---

## Scoring

Where the percentage at the top comes from. Points are rough effort, so the
number tracks work rather than tick-boxes — writing the listing copy is not
the same size as building push. Update the ticks as things land and the
header number with them.

### Compliance and legal — 17 / 17 🟩

| ✓ | Item | Pts |
|---|---|---|
| ✅ | In-app account deletion | 3 |
| ✅ | Report and block across posts, comments, profiles, members | 5 |
| ✅ | Community guidelines + terms agreement at signup | 2 |
| ✅ | AI disclosure and consent on Little Louis | 2 |
| ✅ | All payment paths removed | 2 |
| ✅ | Ads off in the native build | 1 |
| ✅ | Privacy policy, terms and contact pages | 2 |

### The app itself — 28 / 48 🟨

| ✓ | Item | Pts | Where |
|---|---|---|---|
| ✅ | Capacitor installed and configured | 3 | Windows |
| ✅ | Offline page caching live for every reader | 4 | Windows |
| ✅ | Local reading reminders | 4 | Windows |
| 🟨 | Lock-screen controls ✅ · background playback needs Info.plist | 2/4 | Windows + **Mac** |
| ✅ | Remote push — code + token table, behind a flag | 4 | Windows |
| ✅ | Sign in with Apple — button and call behind a flag | 3 | Windows |
| ✅ | Native share sheet | 2 | Windows |
| ✅ | Haptics | 1 | Windows |
| 🟨 | Offline download — helper written, button not placed yet | 2/3 | Windows |
| ☐ | `cap add ios`, pods, Info.plist | 3 | **Mac** |
| ☐ | Build and run on a real iPhone | 3 | **Mac** |
| ☐ | Device testing: offline, audio, share, haptics | 6 | **Mac** |
| ☐ | Demo account with real data for the reviewer | 1 | Windows |
| ✅ | Checked: no age gate exists, and none is required at 12+ | 1 | Windows |
| ✅ | App Privacy answers drafted → APP_STORE_LISTING.md | 2 | Windows |
| ☐ | Service worker verified working in WKWebView | 4 | **Mac** |

### Apple account and signing — 0 / 21 ⬜ (blocked on the €99)

| ✓ | Item | Pts |
|---|---|---|
| ☐ | Apple Developer Program enrolment | 2 |
| ☐ | Sign in with Apple: Services ID, key, Supabase provider | 3 |
| ☐ | APNs key and Push Notifications capability | 3 |
| ☐ | Distribution certificate and provisioning profile | 3 |
| ☐ | TestFlight round with real testers | 6 |
| ☐ | Home-screen widget (needs App Groups) | 4 |

### Store listing and submission — 5 / 14 🟨

| ✓ | Item | Pts |
|---|---|---|
| ✅ | App icon 1024×1024 → native/appstore/ | 2 |
| ☐ | Screenshots | 5 |
| ✅ | Name, subtitle, keywords, description | 2 |
| ☐ | App Privacy answers entered | 2 |
| ☐ | Age rating questionnaire | 1 |
| 🟨 | Review notes written; demo account still to create | 1 |
| ☐ | Export compliance | 1 |

### Known unknowns

Not scored, because nobody has checked yet and guessing would move the number
dishonestly:

- Whether a Capacitor shell already exists on a Mac somewhere
- Whether service workers behave in WKWebView with `server.url` remote
  loading — scored above as work, but it may turn out to need a different
  offline approach entirely
- Whether an Apple Developer account already exists under another address
