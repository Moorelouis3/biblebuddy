# App Store readiness audit

Audited 2026-10-10 against the repo as it stands and Apple's App Review
Guidelines. Stage 1 compliance shipped 2026-09-21 (`051080bcb`); this is what
is left.

---

## The headline

**There is no app yet.** Stage 1 was web-side work — it made the *website*
behave correctly when something wraps it. The wrapper itself does not exist on
this machine:

- no `ios/` or `android/` folder in the repo
- no `@capacitor/*` or `cordova` dependency in `package.json`
- no `capacitor.config.*` and no `.xcodeproj` anywhere under `C:\Users\Moore`

`lib/nativeApp.ts` detects a shell by `window.Capacitor` or a `BibleBuddyApp`
user-agent marker. Nothing in this repo produces either. So either the shell
lives on a Mac that isn't here, or it was never built. **Confirm which before
planning anything else** — it changes the size of this list considerably.

**You also need a Mac.** Xcode is macOS-only, and building, signing and
uploading all run through it. Options: a Mac, a rented cloud Mac (MacStadium,
Scaleway ~£25/month), or a CI service that provides macOS runners (Codemagic,
Bitrise, GitHub Actions macOS). Nothing else gets an app into review.

---

## Hard blockers — Apple will reject without these

### 1. Sign in with Apple (Guideline 4.8)

`app/login/page.tsx:120` offers exactly one third-party provider: Google. The
rule is that if you offer any third-party sign-in, you must also offer Sign in
with Apple or an equivalent privacy-preserving option. This is a flat
rejection, every time, and it is the most common one for apps in this shape.

Supabase supports Apple as a provider, so this is mostly configuration plus a
button — but it needs an Apple Developer account first, and the Services ID
and key setup is fiddly.

### 2. Minimum Functionality (Guideline 4.2)

> "Your app should include features, content, and UI that elevate it beyond a
> repackaged website."

A Capacitor shell that loads mybiblebuddy.net and adds a user-agent string is
precisely what 4.2 exists to catch. Today the app uses **zero** Capacitor
plugins — nothing native happens at all.

What would answer it, roughly in order of value:

- **Native push notifications** (see below — also a product gap)
- **Offline reading** — cache the current chapter and the day's plan so it
  works on a plane or the Tube
- **Haptics** on streak/completion moments
- **Share sheet** for verses and insight cards
- **Widgets** — verse of the day on the home screen is a strong native-only
  feature and reviewers notice them
- **Audio in the background / lock-screen controls** — you already have
  chapter audio and Bible in One Year audio; a webview handles this badly and
  natively it is a genuine improvement

You do not need all of these. You need enough that a reviewer opening the app
cannot say "this is the website".

### 3. The app currently has no notifications at all

`components/AppShell.tsx:1732` disables web push inside the native app, and
nothing replaces it. So someone who installs from the App Store gets *fewer*
features than the website: no daily reading reminder, no streak nudge, no
group activity. Daily reminders are the core retention loop — shipping without
them would be worse than not shipping.

This needs `@capacitor/push-notifications`, APNs certificates, and a device-token
table alongside the existing web-push subscriptions.

---

## Review mechanics

### A reviewer must be able to get in

Anonymous accounts were turned off on 2026-10-06, so the app opens on a signup
wall. Apple's reviewer will not create an account with a real address.

- Create a permanent demo account and put the credentials in the **App Review
  Information** notes
- Make sure it has data: a plan in progress, some notes, a group — a reviewer
  who sees an empty app is more likely to invoke 4.2

### User-generated content (Guideline 1.2)

Apple requires four things for apps with UGC. Three are done:

| Requirement | Status |
|---|---|
| A way to report offensive content | Done — posts, comments, replies, profiles, event members |
| A way to block abusive users | Done — including DM unblock |
| Published developer contact | Done — `app/contact` |
| Filter objectionable content before it appears | **Partial** |

The gap is the last one and the response commitment: Apple expects you to act
on reports **within 24 hours**. `/admin/reports` is a manual queue with one
person reading it. Either commit to checking it daily, or put automated
filtering in front of posts. Say which in the review notes.

### App Privacy ("nutrition label")

Not started. You declare, per data type, what you collect and whether it is
linked to identity or used for tracking. From the code you will need to cover
at least: email address, name, user content (posts, notes, prayers), identifiers,
usage data, and diagnostics. Also the third parties in the privacy policy —
OpenAI, Google, Supabase, AWS.

**Ads are already off in the native build** (`components/AdSlot.tsx:106`), which
is worth a lot here: no IDFA, no App Tracking Transparency prompt, no
"Data Used to Track You" section. Keep it that way.

### Age rating

Open DMs, group chat and a public feed. Answer the questionnaire honestly —
expect 12+ at least. Under-13 would drag in COPPA and a parental-consent flow,
so if the terms already say 13+, make sure signup actually enforces it.

---

## Payments — nothing to do

Worth stating plainly because it is the other classic rejection: the app is
free, Stripe is gone, and nothing digital is sold inside it. Physical goods
bought on the open web are explicitly outside the in-app-purchase rules
(3.1.3(e)/3.1.5), so external links to physical items are allowed. If a
*digital* subscription or unlock ever comes back inside the app, it must go
through IAP at 15–30%.

---

## Store listing assets

None of this exists yet:

- App icon, 1024×1024, no transparency, no rounded corners
- Screenshots: 6.9" iPhone required; 6.5" if you support older; iPad set if you
  declare iPad support (declaring it means it must actually work on iPad —
  easier to ship iPhone-only first)
- Name (30 chars), subtitle (30), keywords (100), description
- Support URL, marketing URL, privacy policy URL — all exist on the site
- "What's New" text
- Export compliance answer (uses HTTPS → exempt, but you must answer)

---

## Suggested order

1. Find out whether a shell exists, and sort out Mac access. Everything is
   blocked behind this.
2. Apple Developer Program enrolment — £79/yr, and it can take days to
   approve. Start it early because Sign in with Apple needs it.
3. Sign in with Apple on the website. It is useful on the web anyway, and it
   is the one blocker you can clear without a Mac.
4. Build the Capacitor shell properly: push notifications first, then offline
   reading, then share and haptics.
5. Demo account, App Privacy answers, age rating, review notes.
6. Icon and screenshots.
7. Submit, and expect at least one rejection — 4.2 is a judgement call and
   first submissions of wrapper apps usually get a conversation.

---

## Honest assessment

The compliance work from September was the hard, boring half and it is real:
deletion, reporting, blocking, guidelines, AI disclosure, no payments. That
clears most of the things that get apps rejected on policy.

What is left is not policy, it is **building an actual app**. A webview with a
user-agent string will be rejected under 4.2, and should be — it would also be
a worse product than the website, because notifications are off. The work that
makes it pass review is the same work that makes it worth installing: push,
offline, widgets, proper audio.

Budget weeks, not days, and Mac access is the first domino.
