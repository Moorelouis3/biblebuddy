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

### 3. The offline screen stops promising downloads iOS cannot have
**Ready. Nothing more to do but build.** Commit `86dcb9e2`.

**What an offline screen is.** Bible Buddy's app is a window onto the live
website, so it needs a connection for almost everything. When someone opens it
on the Underground, or in a tunnel, or with one bar, the page cannot load. Left
alone, the phone shows its own browser error - a grey screen reading something
like "cannot connect to server", with our web address printed on it. It looks
like the app is broken, and it looks like a website, which is the one thing
Apple does not want an app to look like.

So we ship our own page for that moment instead: the Bible Buddy mark, "You're
offline", a line of explanation and a Try again button. That page is the
offline screen. It is the only screen in the whole app that lives inside the
app rather than on the website, because it has to work when the website cannot
be reached. That is also why it needs a build to change.

**What was wrong with it.** It ended with "Anything you've saved for offline
reading is still available." On iPhone that was not true, and had never been
true. Saving a reading for offline needs a piece of browser machinery that
Apple switches off inside apps unless we ask for it in a specific way, and we
deliberately do not ask - see the decision below. So on iPhone nothing is ever
saved, the Save for offline button correctly hides itself, and the offline
screen was the only thing in the app still pointing at the feature. Somebody
with no signal read that we had their reading, went looking, and found no
button and no reading.

It now says it picks up where you left off as soon as you are back online,
which is what the page actually does - the button reloads the page you were on,
and it retries by itself the moment the signal returns.

**The technical version**, for whoever maintains this: service workers are
disabled in WKWebView unless the hosts are listed under `WKAppBoundDomains` in
`Info.plist` and `limitsNavigationsToAppBoundDomains` is true;
`capacitor.config.ts` sets that to false on purpose. The page is
`native/www/offline.html` (and its byte-identical twin `index.html`), served
by Capacitor's `errorPath`, compiled into the bundle - which is why the live
site cannot deliver this fix.

**Not verified on a device.** That iOS has no worker is Apple's rule read, not
a phone tested. To settle it, attach Safari Web Inspector to the app's WebView
and look for `[SW] registration failed` from `AppShell.tsx:1674`.

**Decided: no. We are not turning app-bound domains on.** Louis handed the
call to me on 2026-11-10 and this is it, so that it does not get re-argued.

The reason is not the cache, it is the second thing that flag does.
`limitsNavigationsToAppBoundDomains: true` also limits the WebView to the
declared domains - and `capacitor.config.ts:80` sets it to `false` on purpose,
with a comment saying why: the app opens outside links through the Browser
plugin. Outside links are something the app does constantly; an offline cache
is something nobody has reported wanting. That is the wrong trade, and the
simulator build would not catch it, because nothing in CI clicks an external
link.

If it is ever reconsidered, none of the groundwork needs redoing:

- The Info.plist side has a home already - `scripts/ios-info-plist.sh`, run by
  the "Write the Info.plist keys Apple requires" step. `ios/` is regenerated
  by `npx cap add ios` every build, which is why keys are written there and
  not committed. Add `WKAppBoundDomains` as an array of
  `www.mybiblebuddy.net` and `mybiblebuddy.net`. Max 10 entries, no wildcards.
- Flip `limitsNavigationsToAppBoundDomains` to `true` in `capacitor.config.ts`.
- `scripts/ios-simulator-run.sh` already launches the app and photographs it,
  so a dead bridge shows up as a white screen in the build artifacts without
  anyone holding a phone. What it will NOT tell you: whether external links
  still work, and whether the worker actually registered - its log predicate is
  `process == 'App'`, and WebView console output comes from the WebContent
  process.
- So the test is manual and it is three things, in this order: the app opens,
  an external link still opens in the in-app browser, and
  `[SW] registration failed` is absent from Safari Web Inspector.

Own branch, never the same build as a submission.

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

### 3. The same offline-screen wording fix
**Ready**, and cosmetic here. Commit `86dcb9e2`.

Same page as iOS entry 3 above - read that one for what an offline screen is.
The file is shared between both platforms, so this change rides along.

It matters less on Android, for a good reason: Android **does** let the app
save pages for offline reading, and has since October. So on Android the
sentence we removed was broadly true, and the screen itself rarely appears -
Android can usually serve the last version of the page it saw instead of an
error page at all.

**Worth confirming on a phone:** that offline reading in the Play app actually
works. We believe it on the strength of a commit message.

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
