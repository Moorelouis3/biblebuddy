# Next build list

**What this is.** The running list of things that only reach people when a new
**app build** is made and sent to the App Store / Play Store. When Louis says
"my build list" or "the new build list", this file is what he means.

**Why it exists.** Bible Buddy's phone apps are a shell around the live
website. That means almost everything — new pages, fixes, content, design —
reaches the app the moment the website deploys. No build needed, nothing to
submit, no review.

A short list of things does **not** work that way. Permissions, entitlements,
link handling, plugins, the icon, the splash screen: those are baked into the
app when it is compiled. Changing them on the website does nothing. They sit
here until someone builds.

**So the rule is:** if it is on this list, it is NOT live for people with the
app, however finished it looks and however long ago it was written.

---

## Waiting for the next iOS build

### 1. Email links open the app instead of Chrome
**Ready. Nothing more to do but build.**

Tapping a link in an email currently opens Chrome or Safari, not Bible Buddy.
Everything needed is done except the build itself:

- Associated Domains is ticked on the App ID (done 2026-11-09)
- `ASSOCIATED_DOMAINS_ENTITLEMENT: "on"` is set in both iOS workflows
- The file Apple reads is live and answering at
  `https://www.mybiblebuddy.net/.well-known/apple-app-site-association`
- SES click tracking is off, so links are no longer rewritten through Amazon

**Watch for:** Associated Domains is an entitlement, and the profile Apple
issues has previously failed to carry one — Family Controls has been ticked for
weeks and still does not appear in the profile. If a build dies at signing over
a missing entitlement, set `ASSOCIATED_DOMAINS_ENTITLEMENT` back to `off` and
the build goes green without this feature. See `docs/DEEP_LINKS.md`.

**Known gap, Louis's call:** the day 1–6 funnel emails link to the bare
`mybiblebuddy.net`, which is the marketing landing page, and that page is
deliberately excluded from opening the app. Those specific emails will keep
opening the browser even after this ships. Pointing them at `/dashboard`
instead is a one-line change per email.

### 2. Bible Lock (Screen Time) — blocked, not ready
`BIBLE_LOCK_ENTITLEMENT` is on, but Apple's provisioning profile has not been
issuing the Family Controls entitlement even though it is ticked on the App ID
and reads as Assigned. An app asking for an entitlement its profile lacks
cannot be signed at all. Evidence in `docs/bible-lock-entitlement-evidence.md`.
This is the one most likely to break a build.

---

## Waiting for the next Android build

### 1. Email links open the app instead of Chrome
**Ready. Nothing more to do but build.**

- The Play app signing fingerprint is in Vercel as `ANDROID_APP_LINK_SHA256`
- `ANDROID_APP_LINKS: "on"` is set in both Android workflows
- The file Google reads is live and answering at
  `https://www.mybiblebuddy.net/.well-known/assetlinks.json`, carrying that
  fingerprint

### 2. Items committed since the last Play build — need confirming
These went in after the current closed-test build and may or may not be in
whatever is on testers' phones. Worth checking before the next release rather
than assuming:

- Staying logged in when the app is closed (commit `29361759`)
- The Firebase config being installed by the build (commit `b4a5cc6d`)
- The advertising ID permission being stripped (commit `a77ed974`)

---

## Before an iOS release can be submitted at all

- The updated Apple Developer **Program License Agreement** has to be accepted
  in App Store Connect. Until it is, version 1.1 cannot be submitted. Nothing
  else on this list matters until that is done.

---

## Already in the current App Store build (1.0, live since 2026-11-01)

Here so nobody puts them back on the list:

- Native Apple and Google sign-in
- The `BibleBuddyApp` user-agent tag, which several features switch on
- Stage 1 store compliance
- Bible Buddy TV removed (Guideline 5.2.3)

---

## How to keep this list honest

Add an entry the moment something is written that needs a build — not when the
build is made. Each entry says what it is, whether it is **ready** or
**blocked**, and what could go wrong. When a build ships, move the entry down
to "Already in the current build" rather than deleting it, so the history of
what is actually on people's phones stays readable.

Last updated: 2026-11-10
