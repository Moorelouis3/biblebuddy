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

## The three things only you can do

### 1. Apple — tick one box (2 minutes)

Go to **developer.apple.com → Certificates, Identifiers & Profiles →
Identifiers → `net.mybiblebuddy.app`**, tick **Associated Domains**, save. Then
**regenerate the provisioning profile** and upload the new one to Codemagic.

Then set `ASSOCIATED_DOMAINS_ENTITLEMENT=on` in the Codemagic iOS workflows.

**Do not set that variable before the box is ticked.** An app that asks for an
entitlement its profile does not carry cannot be signed at all — this is exactly
what killed builds 16, 17 and 18 on 2026-10-17, thirteen seconds each. The flag
is off by default for that reason and no other.

Unlike Family Controls, this one is a checkbox. There is no application to make
and nothing to wait for.

### 2. Android — fetch one fingerprint (5 minutes)

Go to **Play Console → Test and release → App integrity → App signing key
certificate** and copy the **SHA-256 certificate fingerprint**. It looks like
`AB:CD:12:...`, 32 pairs long.

It must be the **app signing key**, the one Google signs with — *not* the upload
key and *not* Codemagic's keystore. Getting that wrong is the single most common
reason App Links silently never work.

Then:

- Set `ANDROID_APP_LINK_SHA256` to that value in **Vercel** (all environments).
- Set `ANDROID_APP_LINKS=on` in the **Codemagic** Android workflows.

Both, or neither. The website file and the app have to agree.

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
| Google's proof file | `app/api/well-known/assetlinks/route.ts` | Live, empty until the fingerprint is set |
| The `/.well-known/` paths | `next.config.ts` rewrites | Live |
| Letting Apple and Google fetch them | `proxy.ts` | Live |
| iOS entitlement | `scripts/ios-entitlements.sh` | Off — needs step 1 |
| Android intent-filter | `scripts/android-deep-links.mjs` | Off — needs step 2 |
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
   The Android one showing `[]` means the fingerprint is not set yet.
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
