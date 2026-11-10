# Making links open the app instead of Chrome

Louis, 2026-11-08: *"the emails open the web version of the app in chrome on my
iphone, can we make it open the app on ios or android instead of the website?"*

Yes. Done, 2026-11-09. All three switches are flipped: the Associated Domains
box at Apple, the Play signing fingerprint on Vercel, and SES click tracking,
which is now off. This page is what was done and what each piece costs.

The website half is live at the next scheduled deploy. The app halves need a
new store build - there is nothing to install today.

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

All three are done (2026-11-09). Each section below says what was changed and,
where it cost something, what.

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

### 3. Email click tracking — turned off, 2026-11-09

Louis: "just do what ever is needed so email links open the app". So it is off.

SES was rewriting every link in every email. A link written as
`https://www.mybiblebuddy.net/library` left as
`https://xxxx.awstrack.me/L0/https:%2F%2Fwww.mybiblebuddy.net%2Flibrary/1/...`
so SES could count the click. The phone matches the domain the reader actually
taps, and that domain was Amazon's, so the tap opened Chrome — and the redirect
afterwards does not hand it back to the app. iOS deliberately does not follow
redirects into apps.

A custom tracking subdomain (`click.mybiblebuddy.net`) does not rescue this: it
points at Amazon's servers, so our proof file cannot be published on it. There
was no third option.

**What changed.** The event destination `bounces-and-complaints` on
configuration set `biblebuddy-main` went from
`BOUNCE,CLICK,COMPLAINT,DELIVERY,OPEN` to `BOUNCE,COMPLAINT,DELIVERY,OPEN`.
Dropping `CLICK` is what stops the rewriting — in SES, link rewriting happens
only while something is subscribed to click events. Bounces, complaints and
deliveries are untouched, which matters: those are what keep the sending
reputation readable.

**Proved, not assumed.** A test email sent after the change arrived in Gmail
with its anchor reading `https://www.mybiblebuddy.net/dashboard` — the real
domain, unrewritten.

**What it costs.** Click numbers stop arriving, everywhere they were used:

- `app/api/webhooks/ses/route.ts` no longer records `click` rows in `ses_events`
- the email effectiveness panels in `lib/productHealth.ts` and
  `lib/productHealthTabs.ts` lose their only input
- `ses_campaign_stats` keeps counting opens; its click column stops moving

Nothing errors. The numbers simply stop, and rows already recorded stay.

Set against that: opens on this account are all bots
(MEMORY: email-opens-are-all-bots), so clicks were the one email signal worth
trusting — and this trades it for the links actually working. If it ever needs
to come back, add `CLICK` to that event destination's matching event types and
the rewriting resumes on the next send.

**Everything else already worked without this.** Links in the app, in push
notifications, on social, in a text message, or pasted anywhere at all open the
app. It was only email that SES intercepted.

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
| Email links on `www` | was `lib/emailFunnelTemplates.ts` | Moot — funnel retired 2026-11-10, see `docs/EMAIL_FUNNEL_RETIRED.md` |

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

---

## How clicks are counted now

Turning click tracking off cost the click number. This is what replaced it, and
it measures a different thing on purpose: **SES counted the leaving, we count
the arriving.**

Every email link already carries `?utm_source=email&utm_campaign=<id>`. When one
of those lands on the site, `components/EmailArrivalRecorder.tsx` posts one
request to `app/api/email/arrival/route.ts`, which writes a row to
`email_arrivals`. One request per arrival, no polling and no retry — an
eight-second poll took the database down three times in October and a statistic
is never worth another one.

Arriving is the better of the two numbers:

- **Scanners disappear.** A mail scanner fetches a link without running
  JavaScript, so it never reaches the recorder. SES counted those as clicks,
  which is why `lib/productHealth.ts` carries a `SCANNER_UA` regex to strip them
  out after the fact. That filter stays on clicks and is deliberately not
  applied to arrivals.
- **The app counts.** The iPhone and Android apps load these same pages, so an
  arrival inside the app is counted exactly like one in a browser. SES could
  never see those at all.
- **Nothing identifying travels in the link.** A signed-in arrival is matched to
  a person from the Supabase session server-side. No address, no hash of one, no
  per-recipient token goes into a URL.

What it cannot see: somebody who taps and never loads the page, and who a
logged-out reader is. Both accepted.

**Where it shows up.** "Arrived from email" in the email panel
(`lib/productHealthTabs.ts`), an `arrivals` column per campaign from
`app/api/admin/campaigns/route.ts`, and "Email → study" in
`lib/productHealth.ts`, which now prefers arrivals and falls back to clicks for
any window before 2026-11-09. Every historical click row is still read and still
shown — arrivals sit beside them rather than replacing them.

Counted **distinct by reader**, the same way `ses_campaign_stats` counts unique
recipients rather than raw opens, so a reload is not a second person.

`npm run verify:email-arrivals` pins all of the above offline.

### One thing to know about the funnel emails

Several funnel links point at the bare domain — `https://www.mybiblebuddy.net?utm_source=email&utm_campaign=day1`.
`/` is on the Apple exclusion list on purpose (it is the marketing landing page,
which exists to sell the app to a stranger), so **those particular links still
open the browser**, by design. They are counted as arrivals all the same. If the
day-1 to day-6 emails should open the app instead, their links need to point at
a real page inside it, such as `/dashboard`.

