# Google Play: the plan

Written 2026-10-25, after the iOS build was handed to Apple and started
waiting. The question was "how hard is this?", and the honest answer has two
halves that point in opposite directions.

**The engineering is much easier than iOS.** Two to three days of real work,
not six weeks. Android needs no Mac, no certificates on anyone's machine, no
provisioning profiles, no entitlement that Apple refuses to issue. Louis's own
Windows laptop can build a signed Android release, which was never true of the
iPhone build for a single day.

**The calendar is worse.** Google will not let a new personal developer account
publish to production until it has run a closed test with **at least 12 testers
opted in for 14 continuous days**. That is policy, not a queue, and it cannot be
paid past or hurried. It is the critical path for this whole project, and the
only part of it that is about people rather than code.

So: roughly three to four weeks to live, of which about three days is building.
Start recruiting the twelve testers on day one, because everything else finishes
while that clock is still running.

---

## What already works on Android with no work at all

The shell was built platform-neutral, mostly by accident and partly on purpose,
and it pays off here:

- **`capacitor.config.ts`** needs no Android branch. `appId`, `appName`,
  `server.url` (`/app`, not `/` - see the comment in that file), `errorPath`,
  `allowNavigation` and `webDir` are all read identically by the Android
  platform. The only iOS-specific block is `ios: {}` at the bottom.
- **`appendUserAgent: "BibleBuddyApp"`** is the load-bearing line, and it is
  platform-neutral too. Every native switch already shipped - hiding install
  banners, web push, the service worker, ads - keys off that string, and it will
  be in the Android webview's user agent on the first build.
- **`lib/nativeApp.ts:36`** - `nativePlatform()` already returns `"android"`.
  Nobody has to teach the app what Android is.
- **`app/api/push/register-device/route.ts:38`** already accepts
  `platform: "android"` and stores the token. The *sending* side does not (below).
- **`lib/installEnvironment.ts`** and the onboarding analytics already count
  Android as its own install platform, so the numbers will separate themselves.
- **Plugins**: `@capacitor/app`, `browser`, `haptics`, `local-notifications`,
  `push-notifications`, `share` are all cross-platform and need no replacement.
- **The listing**: most of `docs/APP_STORE_LISTING.md` is reusable - the
  description, the data-collection answers, the 13+ reasoning, the review notes.
  Play asks the same questions in different forms.
- **`native/appstore/app-icon-1024.png`** is the source art for the Android icon
  too, though Android needs it cut differently (below).

## What is genuinely new work

### 1. The platform scaffold - half a day

`npm i @capacitor/android@^8.5.3` (a **runtime** dependency, not a dev one, for
exactly the reason written at the top of `capacitor.config.ts`: CI installs with
`--omit=dev` and `npx cap add` reads the platform out of `node_modules`), then
`npx cap add android`. `android/` gets gitignored the way `ios/` is - it is
generated output and should be rebuilt every build rather than drift.

**Settled, 2026-10-25.** Done. `@capacitor/android@8.5.3` is a runtime
dependency and `android/` is gitignored beside `ios/`, which it already was.

Play has required **targetSdk 36 (Android 16)** for all new submissions since
31 August 2026, and the worry was that this would need a script of its own, the
shape of `scripts/ios-deployment-target.sh`. It does not: the generated
`android/variables.gradle` already reads `minSdk 24, compileSdk 36,
targetSdk 36`. The workflow prints those three lines on every build instead of
enforcing them, because a wrong value fails at upload hours later with an error
that never mentions the file.

### 2. Icon and splash - done, 2026-10-25

Android does not take a single 1024px square. It wants an **adaptive icon**: a
foreground layer and a background layer, which the launcher composites and then
crops to a circle, a squircle or a rounded square depending on the phone.

`scripts/android-app-icon.mjs` builds all of it from the same
`native/appstore/app-icon-1024.png` the iPhone uses: the brand blue as a flat
background colour, the white mark alone on transparency as the foreground, the
legacy square and round icons for Android 7 and below, and a 512px
`native/appstore/play-store-icon-512.png` with the alpha flattened, which is
what the listing form accepts. The mark is lifted off its background by
luminance rather than by matching the blue, so the anti-aliased curves keep
clean edges instead of a blue fringe.

**The sizing trap, found by rendering it:** only the central 72 of the 108dp
layer survives the crop, and that area is a CIRCLE - so a square does not fit at
its own width. The first pass put the mark at 62% of the layer and the preview
showed the top and bottom of the "B" sliced off on a round launcher. It is 50%
now, which is 54dp against a 69dp diagonal. Against the 72dp the user actually
sees, it still reads at three quarters of the icon.

### 3. The build pipeline - done, 2026-10-25

`codemagic.yaml` gets `android-build` and `android-release` workflows on a
**Linux instance**, not `mac_mini_m2`. Two reasons: Linux minutes are cheaper
and faster, and the 500 free minutes on the individual plan are macOS minutes
that the iOS build is already spending.

Manual trigger only, no `triggering:` block, for the same reason the iOS
workflows have none: two routines commit to `main` all day and would otherwise
queue a build per chapter of Bible notes.

Steal the best idea from the iOS workflow - **`scripts/android-emulator-run.sh`,
which boots an emulator, installs the APK, launches it and photographs what
happens.** "It compiles" was never the same as "it runs", and on iOS that step
is the only reason anyone has seen the app open.

The `android-build` workflow is in `codemagic.yaml` now, on `linux_x2`, manual
trigger only, with Java 21 and Node 22. There is deliberately **no
android-release workflow yet**: signing needs an upload keystore, and that
needs the Play Console account, so it arrives with phase 3.

**Not yet proved:** nothing here has been compiled. There is no JDK and no
Android SDK on Louis's Windows machine, so the first Codemagic run is the first
time `./gradlew assembleDebug` executes at all. What has been checked locally
is that the platform generates, the eight plugins link, `cap sync` is clean,
the config carries `appendUserAgent: "BibleBuddyApp"` into
`android/app/src/main/assets/capacitor.config.json`, the manifest has INTERNET,
the icon output renders correctly under all three launcher masks, and the YAML
parses.

### 4. Signing - Louis, 20 minutes, and one thing to never lose

Play uses **Play App Signing**: Louis generates an *upload* keystore, Google
holds the real app signing key. Codemagic can generate and store the upload
keystore so it never sits on the Windows machine.

**The warning that matters:** lose the upload keystore and you cannot ship an
update to the app ever again under that listing. It gets backed up somewhere
that is not one laptop, on the day it is created.

### 5. Push notifications = FCM, and this is the biggest build - one day

Android push does not go through APNs. It goes through **Firebase Cloud
Messaging**, and the server does not speak it yet:
`app/api/push/process/route.ts:4` imports only `sendApnsPush`, and
`apnsConfigured()` gates the whole send.

What this needs:

- a Firebase project, with `google-services.json` dropped into
  `android/app/` during the build (another generated-file script);
- **`lib/fcmSender.ts`** - FCM HTTP v1, which means minting an OAuth token from
  a service-account key rather than the certificate dance APNs uses;
- a platform branch in `app/api/push/process/route.ts` so iOS tokens go to APNs
  and Android tokens go to FCM, with dead-token cleanup handled for both.

`native_push_tokens` already stores the platform per row, so the data model
needs nothing. This is a day of focused work and it is the one piece of the
Android app that is a real feature rather than a wrapper detail.

**Decision to make:** build this before the closed test opens, or ship the
closed test without Android push and add it during the 14 days. The daily post
and the reading reminders are a real part of the product, so the recommendation
is to build it in phase 2, before testers ever see it.

### 6. Google sign-in - no new client code, but one trap

`lib/nativeAuth.ts:579` already initialises `@capgo/capacitor-social-login` with
`webClientId`, which is the id Android uses. The code path works as written.

What is needed outside the code is an **Android OAuth client** in Google Cloud,
registered with the package name and the signing certificate's **SHA-1
fingerprint**.

**The trap:** because Play App Signing re-signs the app, the fingerprint on the
app users install is *not* the upload key's fingerprint, and Play only shows you
the app signing certificate's SHA-1 after the first build is uploaded. Register
**both** - the upload cert's and Play's app signing cert's - or sign-in works in
local testing and fails for every real installer. This is a well-worn way to
lose a day.

### 7. Sign in with Apple - hide it on Android

Apple's Guideline 4.8 forces Apple sign-in alongside Google *on iOS*. Google has
no equivalent rule, and the Apple sheet on Android would be a web redirect -
exactly the fragile shape `lib/nativeAuth.ts` abandoned for good reasons. Android
shows Google and email.

Also confirm the `@capacitor-community/apple-sign-in` import does not break the
Android build. It is guarded by `nativePluginAvailable()`, so it should be a
no-op, but it has never been compiled for Android.

### 8. The Bible lock does not ship on Android v1

This is the one feature that genuinely does not cross over.
`native/plugins/bible-lock` is Swift against Apple's Family Controls and Screen
Time APIs. Android's nearest equivalents are `UsageStatsManager` plus a drawn
overlay, or an `AccessibilityService` - and Play's Accessibility API policy and
Restricted Permissions declarations make that its own review fight, on an
account that has not shipped anything yet.

Hide the lock UI when `nativePlatform() === "android"`, ship without it, and
treat it as a version 2 question. Worth noting that the iOS version is *also*
still waiting on an entitlement Apple has not issued
(`docs/bible-lock-entitlement-evidence.md`), so nobody is missing a feature that
currently works.

### 9. Play Console paperwork - Louis, spread over a few days

- **$25, one time, forever.** Not $99 a year.
- **Identity verification**: a personal account needs ID and address confirmed.
  This can take several days and nothing else can be submitted until it clears,
  which is why it is step one.
- **Data safety form** - Play's version of the privacy nutrition label. The
  answers in `docs/APP_STORE_LISTING.md` map across almost directly.
- **Content rating** - an IARC questionnaire. Same answers as the 13+ reasoning.
- **Privacy policy URL** - already live on the site.
- **App access instructions** - reviewers need a working test account, because
  anonymous accounts were turned off on 2026-10-06 and there is no guest path
  past the sign-in wall any more. Apple needed this too.

---

## The order, and who does what

| | What | Who | Blocking? |
|---|---|---|---|
| **0** | ~~Create the Play Console account, pay the $25~~ **done 2026-10-25** | Louis | - |
| **0b** | Finish account setup: identity documents, Android device check, phone verification | Louis | **Yes - no app can be created until this clears** |
| **1** | ~~Platform scaffold, icon, Linux Codemagic workflow, emulator screenshot step~~ **done 2026-10-25**, unrun | agent | No |
| **2** | FCM sender + Firebase project + Android OAuth client; push and Google sign-in proven on a real phone | agent, ~1 day | No |
| **3** | Upload keystore and a signed AAB, create the app, open the closed track | Louis + agent | Needs 0b |
| **4** | **The opt-in link exists.** Now email the list and ask | Louis | Needs 3 |
| **5** | Closed test: 12 testers, 14 continuous days | Louis | **This is the schedule** |
| **6** | Apply for production access, submit, answer review | both | Needs 5 |

**An earlier draft of this plan had step 4 at the top, as "start recruiting
now".** That was wrong, and Louis said so: "we have no link to send them.. what
u wanna email? hey can you do me a favor use the app for android... but we don't
have the link yet?" Exactly right. Google generates the opt-in URL only once a
closed testing track exists with a build on it, so there is nothing to ask
anyone for until step 3 lands. Asking people to stand by, and then going quiet
for a week while a keystore gets sorted out, is how you lose the twelve you
had.

The 14-day clock therefore starts at step 5, not today. Steps 1 and 2 are the
only things that can run in parallel, and 1 is already done.

## Account facts (signup, 2026-10-25)

Filled in during the signup at `play.google.com/console/signup`. Everything
below is answered and saved; the form is sitting on the last two steps.

**This repository is public** (github.com/Moorelouis3/biblebuddy), so the
addresses, the account email and the phone number are deliberately not written
here. The full table lives in the agent memory note `play-console-account`,
which is local.

| | |
|---|---|
| Account type | **Yourself** (personal), not an organization |
| Owning Google account | the usual one - **cannot be changed later** |
| Developer name (public) | **Bible Buddy** |
| Payments profile | the German one, so the account's country is **Germany (DE)** |
| Public profile email | `support@mybiblebuddy.net`, verified by code |
| Contact (private) | the usual Google account, verified through it |
| Preferred language | English (United States) |
| Apps in 12 months | 1 |
| Earning money | **No** - keeps the full legal address off the public listing |
| App categories | None of the above |
| Other Play Console accounts | No |

**Why personal and not an organization.** An organization account is exempt
from the 12-tester rule, which is tempting - but it needs a D-U-N-S number for
a registered business, that takes weeks to issue, and until the organization is
verified Google treats the account as personal anyway. Louis said the twelve
testers are gettable, so the personal account is the faster road.

**Why the German payments profile.** Two were already on the Google account, a
US one and a German one, and the German one is the one Google Play, Google
Store and Google Pay already use. The profile fixes the developer account's
country permanently and identity verification has to match it, so it has to be
where Louis actually lives.

**The account exists as of 2026-10-25.** Louis finished the phone number, the
Developer Distribution Agreement and the USD 25 himself. Account ID
`7337921392900834938`.

### The setup checklist, which blocks everything

Play Console opens on "Finish setting up your developer account" and will not
let an app be created until three things clear. All three are Louis's, and the
second is the one to look at first:

1. **Verify your identity** - upload an official document. Google says the
   review "may take a few days", so start it before anything else.
2. **Verify that you have access to an Android device** - sign in to the Play
   Console *mobile app* on an Android phone. **Louis does not own one**, which
   makes this the hard blocker rather than identity.

   Checked on 2026-10-25: Google's own page says a **real Android mobile
   device**, required of new personal accounts before they can publish, done
   by scanning the QR code on the Console home page and tapping Verify in the
   app. Only the account owner can do it, signed in with the same Google
   account. Nothing in Google's documentation says an emulator counts, and the
   wording is "real device", so do not plan around one.

   A closed-track release is a publish, so this gates the opt-in link too, not
   just production.

   Two ways through, and they are not alternatives - do both, in order.
   **Borrow an Android for five minutes** to clear the check today; the
   verification attaches to the account, not the phone, so it can be signed
   out afterwards (and the session revoked from Google account settings).
   Then **buy a cheap used Android before the closed test starts**, because
   the real problem is not the checkbox: Bible Buddy is about to ship to the
   one in five of its users who are on Android, and nobody on this side has
   any way to open it. CI screenshots from an emulator are not the same as
   holding the thing. Sixty euros against everything already spent.
3. **Verify your contact phone number** - a code to the number given at signup.

A QR-code dialog offering to continue verification on a phone opens over the
console on load; it is step 2 asking, not an error.

## The testers

Twelve real people with Google accounts, opted in and staying opted in for
fourteen unbroken days. A tester who opts out and back in resets. Sources, in
order of how likely they are to actually stay:

1. The email list - there is a real one now, and this is a genuine "be first"
   ask rather than a favour.
2. The study group members who already comment.
3. Friends and family, who will opt in and then need reminding not to uninstall.

Recruit fifteen or sixteen, not twelve. Some will drop.

## Deploy note

Everything in phases 1 and 2 is step 3 under the deploy test in `CLAUDE.md` -
nobody's Bible Buddy is broken because Android does not exist yet. Commits go in
untagged and ride the next scheduled build. The one exception would be if the
FCM branch touched the live push path badly enough to break iOS sends, which is
a reason to keep that change narrow and behind a configured check, the way
`apnsConfigured()` already works.

## Sources for the two dated claims

- Closed testing, 12 testers / 14 days, personal accounts created after
  13 November 2023:
  <https://support.google.com/googleplay/android-developer/answer/14151465>
- Target API level 36 required for new submissions from 31 August 2026:
  <https://developer.android.com/google/play/requirements/target-sdk>
