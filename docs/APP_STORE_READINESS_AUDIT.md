# App Store — working plan

Updated 2026-10-11. Replaces the first audit's framing, which wrongly made
Apple Developer enrolment sound like a gate on starting. It isn't. Membership
is paid at the end of October; nearly all of the build happens before then.

---

## Start here

**Add Capacitor to the project and scaffold the iOS app.** Nothing else can be
worked on until the project exists, and it is all Windows work:

```bash
npm i @capacitor/core @capacitor/cli
npx cap init "Bible Buddy" net.mybiblebuddy.app --web-dir=public
```

Then write `capacitor.config.ts` so the shell appends `BibleBuddyApp` to the
user agent — `lib/nativeApp.ts:9` already watches for exactly that string, so
the native switches that shipped in September start working the moment the
shell runs.

No Apple account, no Mac, no money. One sitting.

---

## The three stages

| | When | What it is |
|---|---|---|
| **1. Before payday** | now → 31 Oct | Build the app. Everything that doesn't need a paid Apple account. |
| **2. After payday** | 31 Oct → ~15 Nov | £79 enrolment, then the Apple-gated pieces + TestFlight. |
| **3. Submit** | ~15 Nov → 23 Nov | Store listing, privacy, reviewer access. **Submit 23 Nov, launch 9 Dec.** |

Two and a half weeks between submission and launch is deliberate: first
submissions of app-shaped-websites usually get at least one conversation with
review, and you want room for it rather than a panic in December.

---

## Stage 1 — now, before payday

**A free Apple ID removes the £79, not the Mac.** Xcode only runs on macOS,
and you need it to compile anything. With a free account you can build and run
on your own iPhone, but the profile expires every 7 days and you reinstall.
Sort out Mac access early — buy, borrow, or rent a cloud Mac at roughly
£25/month.

### Can be written on Windows

| Task | Why |
|---|---|
| Capacitor install + `capacitor.config.ts` | **Start here** (above) |
| Offline reading — cache current chapter + today's plan day | Recommended. Biggest 4.2 answer and genuinely useful |
| Native share sheet for verses and insight cards | Recommended |
| Haptics on streak and chapter-complete moments | Recommended |
| **Local** reading reminders (`@capacitor/local-notifications`) | Recommended. Works on a free account — no Apple config at all |
| Background / lock-screen audio controls for chapter + Bible in One Year | Recommended. Webview handles this badly; real improvement |
| Sign in with Apple — button and Supabase call, behind a flag | **Apple requires** (4.8). Code now, configure in Stage 2 |
| Remote push — registration + device-token table, behind a flag | Recommended. Code now, certificates in Stage 2 |
| Demo account for the reviewer, with real data in it | **Apple requires**. Guests are off, so review hits a signup wall |
| Confirm signup actually enforces the 13+ the terms claim | **Apple requires** (age rating) |
| Draft the App Privacy answers | **Apple requires**. Entered in Stage 3, but writing them now is free |

### Needs Mac + Xcode

| Task | Notes |
|---|---|
| `npx cap add ios`, `pod install` | CocoaPods is macOS-only |
| Info.plist: background audio, notification strings | Free account is fine |
| Build and run on your own iPhone | Free account; 7-day profile, reinstall weekly |
| Test offline, audio, share, haptics on a real device | The simulator lies about all four |

**Not possible on a free account at all** — these are Stage 2 by force, not by
choice: Push Notifications, Sign in with Apple, App Groups (so home-screen
widgets wait too), TestFlight.

---

## Stage 2 — after payday

1. Enrol in the Apple Developer Program, £79/yr. **Do this first** — approval
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

`components/AppShell.tsx:1732` disables web push inside the native app and
nothing replaces it today. Shipping without notifications would make the App
Store version *worse* than the website — daily reminders are the retention
loop. Local notifications in Stage 1 cover the daily reading reminder without
any Apple configuration; remote push in Stage 2 covers group activity and
streaks.

### Reports and the 24-hour rule

`/admin/reports` is a manual queue read by one person. Apple expects reports
acted on within 24 hours. Either commit to checking it daily and say so in the
review notes, or put automated filtering in front of posts before submission.
