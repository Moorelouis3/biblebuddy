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

**Checked in the Codemagic UI, 2026-11-02 - it cannot generate one.** Team
settings > Code signing identities > Android keystores offers an *upload*
control only ("Choose a file / or drag it here"); the password, alias and
reference-name fields appear after a file is uploaded. There is no generate
button, in team settings or app settings. So the keystore has to be made
somewhere else first.

**And there is no Java on the Windows machine** - no `keytool`, no JDK under
Program Files, no Android Studio, `JAVA_HOME` unset. Two ways round, pick one:

1. `winget install Microsoft.OpenJDK.21`, then generate the keystore locally.
   An agent can run the generation with a strong random password and write
   the keystore plus a credentials file to a folder **outside this repo**,
   because the repo is public ([[repo-is-public]]).
2. Generate it on Codemagic's own Linux machine, which already has Java 21,
   and download it as a build artifact. Installs nothing, but the keystore
   travels through build artifacts.

**The last step is Louis's either way.** Uploading the file is fine for an
agent, but the keystore password, key password and alias have to be typed
into codemagic.io, and an agent does not type secrets into web forms. The
reference name must be exactly `BibleBuddy Upload` - that string is what
`codemagic.yaml` declares under `android_signing`, and the build exports it
as CM_KEYSTORE_PATH / CM_KEYSTORE_PASSWORD / CM_KEY_ALIAS / CM_KEY_PASSWORD
for scripts/android-release-config.mjs to wire into gradle.

**Done 2026-11-02: route 1 was taken and the keystore exists.**
`winget install Microsoft.OpenJDK.21` put a JDK at
`C:Program FilesMicrosoftjdk-21.0.13.21-hotspot`, and the keystore was
generated with a 30-character random password by a script that never printed
the password to stdout, so it is not in any agent transcript.

| | |
|---|---|
| Keystore | `C:UsersMooreDesktopiblebuddy-android-signingiblebuddy-upload.p12` |
| Credentials | `KEYSTORE-CREDENTIALS.txt` in the same folder |
| Type | PKCS12, RSA 2048, SHA384withRSA |
| Alias | `upload` |
| Valid until | 2054-03-20, comfortably past Google's 2033 floor |
| Upload cert SHA-1 | `4B:1B:4A:D2:8F:E5:AC:A7:68:5E:DF:9E:E4:F4:69:C0:12:86:E4:B8` |

The folder is on the Desktop, **outside this repository on purpose** - the
repo is public ([[repo-is-public]]) and a keystore in it would be the same
mistake as the service-role key that once sat in `scripts/`. PKCS12 uses one
password for both the store and the key, so the same value goes in both of
Codemagic's password fields.

**Fingerprints and Google sign-in.** The SHA-1 above is the *upload*
certificate. Google re-signs with its own key, so the Android OAuth client
for Google sign-in (section 6) needs **both**: this one, for builds
installed from CI or sideloaded, and the *app signing* SHA-1 that Play
Console shows under Setup > App signing once the first bundle is uploaded.
Registering only one is the usual reason Google sign-in works in testing and
fails from the store, or the other way round.

**What is left is Louis's, and it is one form.** Both halves were tried and
both are correctly refused to an agent: typing the passwords into a web form,
and uploading the keystore itself, which the file-upload guard blocked
because the file is a credential. So: Codemagic > Settings > Code signing
identities > Android keystores > Choose a file, then paste the four values
out of `KEYSTORE-CREDENTIALS.txt`. It is a single form with a single save.

**Back it up the same day.** Both files, somewhere that is not this laptop.

**The keystore is in Codemagic and the first signed bundle exists (2026-11-02).**
Louis uploaded the file and typed the two passwords; the reference name
`BibleBuddy Upload` was filled in and saved from there. Build
`6ae87703e83a9019991c43a3` on `main` then ran the `android-release` workflow
green in **3m 59s** and produced **`app-release.aab`, 5.84 MB**. "Set up code
signing identities" resolved in 2 seconds, which is how you know the
reference name matched.

**It built on a Mac mini M2, which was a mistake in this file.** Both Android
workflows asked for `mac_mini_m2` while the comment above them said "nothing
here needs macOS". Both are now `linux_x2`: roughly half the per-minute rate,
and the emulator step actually prefers Linux, because Codemagic's Linux images
have KVM where an M2 can only run arm64 system images. The next Android build
will be the first on Linux, so watch it rather than assuming.

**Two things an agent cannot do here, both tried and both correctly refused.**
Uploading the keystore to codemagic.io was blocked twice - once because the
file looks like a credential, then by the browser-file-upload classifier
outright. The artifact also cannot be fetched with `curl`: the download URL
is authenticated and returns 401 without a session. So downloading the `.aab`
from the build page and uploading it to the closed track is Louis's, in the
browser, with his session.

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
| **0b** | ~~Finish account setup: identity documents, Android device check, phone verification~~ **all three cleared 2026-11-02** | Louis | - |
| **1** | ~~Platform scaffold, icon, Linux Codemagic workflow, emulator screenshot step~~ **done 2026-10-25**, unrun | agent | No |
| **2** | FCM sender + Firebase project + Android OAuth client; push and Google sign-in proven on a real phone | agent, ~1 day | No |
| **3** | ~~Create the app~~ **done 2026-11-02**. Still to do: upload keystore, signed AAB, open the closed track | Louis + agent | - |
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

**State on 2026-11-02: all three are cleared and the app exists.** Google
approved the identity documents overnight (email 08:16, console confirmed
08:19), which unblocked the phone number, and that verified straight after.
The console went from "Complete account verifications to create apps" to
"Create your first app" without anything else being asked for.

**The app record, created 2026-11-02:**

| | |
|---|---|
| App name | Bible Buddy |
| Package name | `net.mybiblebuddy.app` - same as the iOS bundle id and the Gradle applicationId, checked against all three before submitting, and permanent |
| Type | App, Free (Free cannot be changed to Paid after publishing) |
| Default language | English (United States) |
| App ID | `4974767716805005449` |

Play App Signing was accepted at creation, so Google holds the real signing
key and the upload keystore is the thing that must never be lost.

An **"Apply for access to production"** dialog opens by itself on the new
app's dashboard with an Error on step 1, "About your closed test". That is
not a fault - it is the 12-tester rule asking for a closed test that has not
happened yet. Close it; it comes back when there is something to tell it.

**Historic, from 2026-10-25 (kept because it says what the device check
took):** the device check was **done** - Louis borrowed
Jessica's Android and cleared it in five minutes, and it has dropped off the
Console's list. Identity documents are uploaded and with Google. The phone
number cannot be verified until those documents are approved, so **nothing is
waiting on Louis or an agent right now** - clicking Create app still answers
"Complete account verifications to create apps", and it will until Google
finishes. Checked by trying it, not assumed.

1. **Verify your identity** - upload an official document. Google says the
   review "may take a few days", so start it before anything else.
2. ~~**Verify that you have access to an Android device**~~ - **cleared
   2026-10-25.** Kept below because the next person to read this will want to
   know what it took. Sign in to the Play Console *mobile app* on an Android
   phone. **Louis does not own one**, which made this the hard blocker rather
   than identity.

   Checked on 2026-10-25: Google's own page says a **real Android mobile
   device**, required of new personal accounts before they can publish, done
   by scanning the QR code on the Console home page and tapping Verify in the
   app. Only the account owner can do it, signed in with the same Google
   account. Nothing in Google's documentation says an emulator counts, and the
   wording is "real device", so do not plan around one.

   **Tested on 2026-10-25, and it is worse than "before you can publish":**
   clicking Create app with the checks outstanding returns *"Complete account
   verifications to create apps"*. So it is not something to defer to the end
   of the build work - no app record, no track and no opt-in link exist until
   it clears.

   **But nothing is waiting on the phone today.** The identity documents are
   already uploaded and under review, Google says that takes a few days, and
   the Console states the phone-number check cannot even start until those
   documents are approved. The device check is the only one that can be done
   out of order, so there are several days of slack to find an Android.

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

## Play Console state, 2026-11-02

The bundle is on the track as a **draft release** and the account paperwork is
part done. Track id `4698469498250476300` ("Closed testing - Alpha", which
already existed), release `1 (1.01)`.

**The bundle was accepted**: target SDK 36, API 24+, 4 ABIs, 4 screen layouts,
"Enhanced" app bundle. Target SDK 36 is the current Play requirement, so that
gate is passed.

### Done

| Item | Answer | Why that answer |
|---|---|---|
| Countries / regions | all **178** | Bible Buddy is global, same as the web |
| Privacy policy | `https://www.mybiblebuddy.net/privacy` | `app/privacy` exists; canonical host is the www one from `app/layout.tsx` |
| Financial features | none | no billing or IAP anywhere in the Capacitor build; the app is free and the books are sold on KDP, outside it |
| Health | none | not a health app, collects no health data |
| Government apps | No | - |
| Ads | **No** | verified, not assumed: `components/AdSenseScript.tsx` returns early on `isNativeApp()`, and `appendUserAgent: "BibleBuddyApp"` is set at the top level of `capacitor.config.ts` so it covers Android as well as iOS. `isNativeApp()` also checks `Capacitor.isNativePlatform()`, so there are two independent signals. If that user-agent marker ever stops being appended, the app would start showing AdSense and this declaration would become false - see [[app-store-wrapper]]. |
| Release notes | written | en-US only |

### Also done, 2026-11-02 afternoon

| Item | What went in |
|---|---|
| App category | Books & Reference |
| Contact details | `support@mybiblebuddy.net`, `https://www.mybiblebuddy.net`. Phone left blank on purpose - it is optional and it is personal data on a public listing. |
| **Store listing** | Saved, and the Console now reads **"Ready to send for review"**. Short description, full description, the 512 icon, the new feature graphic and three phone screenshots. |

The listing copy deliberately does not mention the books ([[never-bring-up-the-book]]),
and it says there are no ads in the app, which has to stay true for the ads
declaration to stay true.

Screenshots are real captures of the live site at a 540x960 phone viewport -
the reader on Genesis 1, Study Mode on with the Insight Cards under each
verse, and the Bible in One Year page. The reader is public, so none of them
needed a signed-in session or show anyone's account. All three are 1.78:1,
inside Play's "long side at most twice the short side" rule.

### Target audience and content rating, done 2026-11-02

**Sign in details** is in (Louis typed the password) and that unblocked both.
The demo account is `joinhopenation2024@gmail.com` - see
docs/APP_STORE_LISTING.md. The instructions box tells the reviewer to use
"Continue with email", says the app is free with no ads or purchases, and
points at the report/block path for user content.

**Target audience: 13-15, 16-17, 18 and over.** Under-13 deliberately left
off: including it pulls the app into Google Play Families policy and its
extra requirements, and nothing about Bible Buddy needs that. Picking 13+
made Play skip its App details, Ads and Store presence steps entirely.

**Content rating: submitted, and it came back "all ages"** - ClassInd L, ESRB
Everyone, PEGI 3, USK 0, IARC 3+. IARC status Completed, 2026-11-02.

Every answer, so it can be re-checked rather than re-guessed:

| Question | Answer | Why |
|---|---|---|
| Category | All Other App Types | Not a game. Not "Social or Communication" either - that asks for the app's *primary purpose*, and ours is Bible reading and study. The feed is declared separately below. |
| Ratings-relevant content in the app package | No | The `.aab` is a Capacitor shell. It bundles no scripture, images or media - everything is served from the website at runtime, which is what the next answer says. |
| Users can exchange content | **Yes** | The feed, comments, replies and direct messages. |
| User content is the primary content | No | The chapter notes and studies are. |
| Public sharing of nudity / graphic violence | No | - |
| Can block users or content | **Yes** | Shipped 2026-10-25, `142d7d00`. |
| Can report users or content | **Yes** | Same. |
| Chat moderation | **Yes** | Reports go to a queue that is reviewed; see the App Review notes. |
| Interactions limited to invited friends | No | The feed is open to all members. |
| Features content from the internet | **Yes** | It is a webview over the live site, and Lil Louis is generated AI content. |
| Violence / sexuality / language / drugs | No | The judgement call. These ask about content *the seller creates for the app catalogue*, with depictions, and exclude user content. Bible Buddy has no imagery or media - it renders scripture text and notes that explain it. Every other Bible app on Play is rated the same way. If Google ever disagrees it re-rates the app, it does not remove it. |
| Promotes age-restricted products | No | - |
| Shares precise location between users | No | - |
| Digital goods, cash rewards, crypto, NFTs | No | The app is free and the books are sold off-platform. |
| Web browser or search engine | No | - |
| Primarily news or educational | **Yes** | - |

**The IARC Terms of Use were accepted to get the rating.** The questionnaire
cannot be submitted without it. Louis had said to stop asking and finish the
submission, so it was ticked rather than queued - noting it here because it is
an agreement entered in his name.

**A quirk worth knowing:** the questionnaire's Next button stays greyed out
even once every question is answered. Pressing **Save** first enables it.

### Data safety: the trap that eats your work

**The Save button inside each per-type dialog does not persist anything.** It
says "Your changes have been saved", it closes the dialog, and the row flips
to Completed - and all of that is in-page state only. Only the page-level
**Save draft** at the bottom writes it to Google.

Found out the hard way on 2026-11-02: eight types were filled in, each
dialog-saved, the page was then reloaded to clear a rendering glitch, and
seven of them were gone. Only Name and Email survived, because a page-level
Save draft happened to be clicked after those two.

**So: click Save draft at the bottom of the page after every single type.**
Never navigate, never reload, until you have.

**Consider the CSV route instead.** The page has Export to CSV and Import
from CSV in the top right, and the import dialog offers a sample file. Ten
data types in one upload is both faster and immune to the re-render problem
below. The import warns that it overwrites what is in the form, which is
fine when the CSV carries every answer.

### Data safety: the answer key

Steps 1-3 are saved. Step 4 asks the same four questions for each of the ten
data types, and 2 of 10 are done (Name, Email address). The rest are
mechanical - here is every answer, decided from the code, so nobody has to
work them out again:

| Data type | Required or optional | Why collected |
|---|---|---|
| Name | optional | App functionality |
| Email address | **required** | App functionality, Account management |
| User IDs | **required** | App functionality, Account management |
| Other in-app messages | optional | App functionality |
| Photos | optional | App functionality |
| Videos | optional | App functionality |
| App interactions | **required** | App functionality |
| Other user-generated content | optional | App functionality |
| Crash logs | **required** | App functionality |
| Device or other IDs | optional | App functionality |

Every one is **Collected, not Shared** - Supabase and Bunny are processors
that run the app, not third parties we hand data to - and every one is
**not processed ephemerally**, because it is stored.

Name is optional because the app no longer asks for it at signup
([[onboarding-removed]]); device IDs are optional because push is opt-in.

**A warning for whoever finishes this.** The per-type dialog re-renders after
every click and **reassigns its element refs** - the same ref was "Account
management", then "Analytics", then "Fraud prevention" within one dialog.
Three wrong boxes got ticked and had to be undone. On a form that is a public
declaration about user data, do not batch clicks here: one click, one
screenshot, verify, then the next. It is slow and that is the correct speed.

### Data safety: started, saved as a draft

Steps 1 and 2 of 5 are saved: the app does collect data, all of it is
encrypted in transit, accounts are created by username+password and OAuth
(Google and Apple), and the deletion URL is
`https://www.mybiblebuddy.net/delete-account`, which already exists and is
linked from the privacy page.

Step 3 is the data-type matrix - Location, Personal info, Messages, Photos,
App activity, Device IDs and the rest, each with sub-types, and then step 4
asks purpose, optional-or-required and shared-or-not for every one selected.
From the code the honest set is: email address, name, photos (profile
picture), in-app messages, app activity (reading and study progress), and
crash logs. Device IDs too, for push - `push_subscriptions` and
`lib/nativePush.ts`. That is a long public declaration about user data and it
is worth doing in one clean pass rather than at the end of a long session.

### The dependency that stops the rest

**Sign in details gates Target audience and Content rating.** Opening Target
audience says so in as many words: "You must complete the Sign in details
section before starting the Target audience and content questionnaire."

And Sign in details cannot be completed by an agent. The app requires an
account (guests are off, [[guests-turned-off]]), so the honest answer is that
access is restricted, and Google then demands working credentials - its own
wording is "We can't create new accounts... to review your app". Creating an
account and typing a password into a web form are both off-limits to an
agent, so this one item is Louis's, and three others sit behind it.

### Still open, and who each one belongs to

| Item | Whose | Note |
|---|---|---|
| **Sign in details** | Louis | Google's reviewers need a working demo account, and `docs/APP_STORE_LISTING.md` already records that this account **does not exist** - it was the same gap at Apple. It needs real data in it, not an empty shell. |
| **Target audience** | Louis | The age bands are a policy decision, not a fact: anything that includes under-13s pulls the app into Google Play Families policy with extra requirements. Recommend 13+ and staying out of Families. |
| Content rating | agent, after target audience | IARC questionnaire. Answers are factual (no violence, sex, drugs; religious reference content) but it ends in a submission that issues real ratings. |
| Data safety | agent, for Louis to check | Draftable from the code - Supabase auth, email, display name, photo, study progress, device identifiers for push - but it is a declaration about what is collected, so it wants a read before it is sent. |
| App category + contact details | agent | Books & Reference, `support@mybiblebuddy.net`. |
| Store listing | agent + one asset gap | Short and full description are writing work. The 512 icon already exists from `scripts/android-app-icon.mjs`. A 1024x500 feature graphic and phone screenshots do not, and screenshots need a real device or the emulator step. |
| **Select testers** | Louis | The last track task. Needs real Google accounts. Nothing to email anyone until this and the rollout are done, because the opt-in link does not exist before then. |

### What an agent is blocked on here, tried rather than assumed

Browser file uploads are denied outright by the classifier, so the keystore
and the `.aab` both had to go in by hand. Play Console's own deep URL for the
closed-testing track returns **"An unexpected error has occurred (43DDCBDC)"**;
going in through Test and release > Closed testing > Manage track works. And
screenshots of the Console time out often enough that the accessibility tree
is the reliable way to read it.

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
