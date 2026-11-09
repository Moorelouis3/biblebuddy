# Making links open the app instead of Chrome

Louis, 2026-11-08: *"the emails open the web version of the app in chrome on my
iphone, can we make it open the app on ios or android instead of the website?"*

Yes. The code for it is written and committed. It is switched **off**, because
three of the switches are not mine to flip. This page is what you need to do,
in order, and what to expect.

---

## What this actually is

Apple calls it a **Universal Link**, Google calls it an **App Link**. Same idea:
your website publishes a small file saying *"the Bible Buddy app is mine"*, and
the app is built carrying a matching claim saying *"www.mybiblebuddy.net is
mine"*. When both halves agree, the phone stops sending your links to Chrome and
opens the app instead.

Neither half does anything alone. That is why nothing changes today.

There is no new app to install and no App Store review needed for the website
half. The app half needs a new build.

---

## Where this stands

Two of the three things are done (2026-11-09). One decision is left, and it is
yours: see **Email click tracking** below.

### 1. Apple — done

**Associated Domains** is ticked on the App ID `net.mybiblebuddy.app`
(Team Q8TDSF2RP2), and `ASSOCIATED_DOMAINS_ENTITLEMENT: "on"` is set in both
iOS workflows in `codemagic.yaml`.

Apple warns on save that ticking a capability invalidates existing provisioning
profiles. Nothing to do about it here: `ios-release` and `ios-build` both sign
through the `app_store_connect: BibleBuddy ASC` integration with `ios_signing`,
so Codemagic asks Apple for a fresh profile on every build. There is no profile
file to regenerate by hand and none to upload.

One thing to watch on the next iOS build. Family Controls is ticked on this same
App ID and the profile Apple issues still does not carry it
(`docs/bible-lock-entitlement-evidence.md`), so it is possible Associated
Domains behaves the same way. If a build dies at signing with a message about an
entitlement the profile lacks, that is what happened — set
`ASSOCIATED_DOMAINS_ENTITLEMENT` back to `off` and the build goes green again,
minus this feature.

### 2. Android — done

The app signing key fingerprint is in Vercel as `ANDROID_APP_LINK_SHA256`
(Production, Preview and Development), and `ANDROID_APP_LINKS: "on"` is set in
both Android workflows.

It was taken from **Play Console → App integrity → App signing key**, from the
ready-made "Digital Asset Links JSON" snippet Google generates there, which also
names `net.mybiblebuddy.app` — so there is no chance of having copied the upload
key by mistake. That mix-up is the usual reason App Links silently never work.

It is stored as a **Config** variable rather than a Secret on purpose. A
certificate fingerprint is published to the world by design, right there in
`/.well-known/assetlinks.json`; marking it secret would only mean nobody could
read it back to check it.

The file starts serving the fingerprint at the next scheduled deploy, so any
Android build from now on is building against a file that is live or about to be.

### 3. Email click tracking — a decision, not a task


**This is the one that decides whether any of it works for emails.**

Amazon SES is currently rewriting every link in every email you send. A link you
wrote as `https://www.mybiblebuddy.net/library` leaves as something like
`https://xxxx.awstrack.me/L0/https:%2F%2Fwww.mybiblebuddy.net%2Flibrary/1/...`
so that SES can count the click.

The phone matches the domain **the reader actually taps**. That domain is
`awstrack.me`, which is Amazon's, not ours — so the tap opens Chrome, and the
redirect that follows does *not* hand it back to the app. iOS deliberately does
not follow redirects into apps.

Verified today: the configuration set `biblebuddy-main` has an event destination
with `CLICK` among its event types.

A custom tracking subdomain (`click.mybiblebuddy.net`) does **not** rescue this.
It points at Amazon's servers, so we cannot publish our proof file on it.

So it is one of these two, and it is your call:

| | What you get | What you give up |
|---|---|---|
| **Turn SES click tracking off** | Every email link opens the app | No click numbers in SES at all |
| **Mark chosen links `ses:no-track`** | Those links open the app, the rest stay tracked | Click numbers on exactly the links that matter most |

Worth weighing against the note already on record that SES opens are all bots
and clicks are the only email signal you trust. I have not picked one — say
which and I will do it.

**Everything else already works without this.** Links in the app, in push
notifications, on social, in a text message, or pasted anywhere at all will open
the app as soon as steps 1 and 2 are done. It is only email links that SES
intercepts.

---

## What was built

| Piece | Where | State |
|---|---|---|
| Apple's proof file | `app/api/well-known/apple-app-site-association/route.ts` | Live, serving |
| Google's proof file | `app/api/well-known/assetlinks/route.ts` | Live; serves the fingerprint from the next deploy |
| The `/.well-known/` paths | `next.config.ts` rewrites | Live |
| Letting Apple and Google fetch them | `proxy.ts` | Live |
| iOS entitlement | `scripts/ios-entitlements.sh` | On — in the next iOS build |
| Android intent-filter | `scripts/android-deep-links.mjs` | On — in the next Android build |
| Opening the right page in the app | `components/NativeDeepLinks.tsx` | Live |
| Email links on `www` | `lib/emailFunnelTemplates.ts` | Done |

### Why the email links moved to `www`

`mybiblebuddy.net` redirects to `www.mybiblebuddy.net`. In a browser that is
invisible. For a Universal Link it is fatal — the phone does not follow the
redirect, so an apex link can never open the app. Thirteen links in the 7-day
funnel were on the bare domain and are now on `www`. The newer senders under
`lib/email/` were already correct.

### What stays in the browser on purpose

Signing in, signing up, password resets, unsubscribe, account deletion, and the
landing page. Auth has to finish where it started, unsubscribe has to work for
someone who does not have the app, and the landing page exists to sell the app to
a stranger.

---

## How to check it worked

After a build with the flags on:

1. **The files are readable.** Open these in any browser — both should show JSON,
   not a sign-up page:
   - `https://www.mybiblebuddy.net/.well-known/apple-app-site-association`
   - `https://www.mybiblebuddy.net/.well-known/assetlinks.json`
   The Android one showing `[]` means `ANDROID_APP_LINK_SHA256` did not reach
   that deployment, or its value failed the format check in the route.
2. **iPhone.** Text yourself `https://www.mybiblebuddy.net/library`. Tap it. The
   app should open on the Library. If Safari opens instead, long-press the link —
   an "Open in Bible Buddy" row in that menu means the phone knows, and something
   else is wrong; no row means the association has not been picked up yet.
3. **Android.** Same test. `adb shell pm get-app-links net.mybiblebuddy.app`
   reports `verified` or why not.

Apple caches the association file through its own CDN for about a day, and the
phone re-checks on install and on update. A fresh install is the quickest way to
force it.

### If it does not work

- Reinstalling the app is the usual fix — both systems check on install.
- iOS will not use a file it fetched over a redirect. `www` only, always.
- Android failing verification is almost always the wrong fingerprint (step 2).
