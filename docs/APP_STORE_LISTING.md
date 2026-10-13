# App Store submission pack

Everything that gets typed into App Store Connect, written now so Stage 3 is
copy-and-paste rather than a day of decisions. Nothing here needs a Mac or a
paid account.

Drafted 2026-10-11. See `APP_STORE_READINESS_AUDIT.md` for the plan.

---

## Account facts (2026-10-13)

| | |
|---|---|
| Team ID | `Q8TDSF2RP2` |
| App ID / bundle | `net.mybiblebuddy.app` — Push Notifications + Sign in with Apple enabled |
| Services ID (Sign in with Apple, web flow) | `net.mybiblebuddy.signin` → `https://<supabase-ref>.supabase.co/auth/v1/callback` |
| Apple ID (the app's number) | `6822155944` |
| SKU | `biblebuddy-ios-001` |
| Store name as registered | **Bible Buddy: Study & Devotions** |

## Already entered in App Store Connect

Everything below is saved and verified after a reload — it does not need
retyping at submission time.

- Name, subtitle, promotional text, description, keywords
- Support URL, marketing URL, version 1.0, copyright
- Primary category **Reference**, secondary **Books**
- Privacy policy URL
- App Review notes (the about / UGC / AI / account-deletion blocks below) —
  **without** the demo account, which does not exist yet
- App Privacy: all ten data types, published
- Age rating: 13+
- Pricing: free, and available in all 175 countries or regions

## Verified by reading the code, 2026-10-13

Three claims this pack depends on, checked rather than assumed:

- **Ads really are off everywhere.** `components/AdSlot.tsx:74` is a
  hard-coded `const ENABLE_ADS = false`, not an environment flag, so there is
  no build in which an ad renders. This is what holds up both "no ads anywhere
  in the app" in the review notes and **tracking: No** on all ten privacy data
  types.
- **Account deletion is reachable.** The 2026-10-04 audit found it stranded on
  an unlinked `/settings` page, which is a Guideline 5.1.1(v) rejection. It
  has since been fixed: `DashboardJourneyExperience.tsx:85` embeds the whole
  settings page inside the dashboard, delete section included.
- **Nothing on the server branches on the app's user agent.**
  `isNativeUserAgent()` exists in `lib/nativeApp.ts` but has no callers, so
  the app and the website are served identical HTML and no CDN cache can hand
  one the other's page. Worth keeping that way.

Safe areas are handled across the header, bottom nav and modals, and the
viewport is already `viewportFit: "cover"`, so the notch is unlikely to be
the problem the first screenshots show.

---

## Still to enter, and why it was left

| Item | Why it is not done |
|---|---|
| EU trader status | A legal declaration about who is selling. Apple removes apps from the EU store without it, so this is required, not optional. Louis only. |
| Content rights answer | A rights attestation. Louis only. |
| App Review demo account + "Sign-in required" | The account does not exist. Needs real data in it or Guideline 4.2 gets more likely. |
| App Review contact phone | Not known to the agent. |
| Family Controls entitlement | The request is written out in `FAMILY_CONTROLS_REQUEST.md`; Louis submits it, because it is an application to Apple in his name. |
| Screenshots | Need the app running on a device. |
| Build | Needs signing, which needs keys only Louis can download and paste. |

## App Privacy — exact answers

Data collection is declared as **Yes**. Ten data types are selected and
nothing else: Name, Email Address, Photos or Videos, Other User Content,
User ID, Device ID, Product Interaction, Crash Data, Performance Data,
Other Diagnostic Data. **Tracking is No on every single one**, which is only
true while ads stay off in the native build.

| Data type | Purposes | Linked | Tracking | Done |
|---|---|---|---|---|
| Name | App Functionality | Yes | No | ✅ |
| Email Address | App Functionality, Developer's Advertising or Marketing | Yes | No | ✅ |
| Photos or Videos | App Functionality | Yes | No | ✅ |
| Other User Content | App Functionality | Yes | No | ✅ |
| User ID | Analytics, App Functionality | Yes | No | ✅ |
| Device ID | App Functionality | Yes | No | ✅ |
| Product Interaction | Analytics, App Functionality | Yes | No | ✅ |
| Crash Data | App Functionality | Yes | No | ✅ |
| Performance Data | App Functionality | Yes | No | ✅ |
| Other Diagnostic Data | App Functionality | Yes | No | ✅ |

Email Address carries "Developer's Advertising or Marketing" because Bible
Buddy sends campaign email. Dropping that would understate what the app does
with the address.

All ten are set up and **published** (2026-10-13). The product page shows
"Data Linked to You" and **no "Data Used to Track You" section at all** — that
is the thing worth protecting.

---

## App Privacy ("nutrition label")

Apple asks, per data type: do you collect it, is it linked to the user, and
is it used to track them across other companies' apps and sites.

**Tracking: No, for every single item.** Ads are off in the native build
(`components/AdSlot.tsx:106`), so there is no IDFA, no App Tracking
Transparency prompt and no "Data Used to Track You" section. This is worth
protecting — turning ads on in the app would change this page and the answer
Apple shows to every person considering an install.

| Data | Collected | Linked to you | Why |
|---|---|---|---|
| Email address | Yes | Yes | Account, and the emails you opt into |
| Name | Yes | Yes | Your display name in groups and the feed |
| Photos | Yes | Yes | Profile picture, and images posted to groups |
| Audio data | **No** | — | Voice input to Little Louis is transcribed on the device; no recording is stored |
| User content (notes, prayers, posts, messages, AI chats) | Yes | Yes | It is the product — your study saved so you can return to it |
| Identifiers (user ID, device push token) | Yes | Yes | Signing you in and delivering notifications you turned on |
| Usage data (features used, chapters read) | Yes | Yes | Streaks, progress, and knowing what to build |
| Diagnostics (crash and error logs) | Yes | Yes | Fixing what breaks |
| Location, contacts, health, financial info, browsing history | **No** | — | Never collected |

**Third parties who receive data** — all already named in `/privacy`:
Supabase (database, logins, uploads), Vercel (hosting and anonymous
analytics), OpenAI (Little Louis messages), Google (optional sign-in),
Amazon Web Services (sending email), Apple Push Notification service (device
tokens, once remote push ships).

⚠️ Check `/privacy` is still accurate on the day you submit. Apple compares
the two and a mismatch is a rejection.

---

## Age rating — done, 13+

Answered 2026-10-13. Apple calculated **13+** (16+ in Brazil, 15+ in Korea,
and 12+ on operating systems older than version 26). No override applied.

Also: Apple will not sell the app in **Afghanistan or Morocco** — automatic,
local law, nothing to do with these answers.

| Question | Answer | Why |
|---|---|---|
| Parental controls / age assurance | No / No | Neither exists in the app |
| Unrestricted web access | **No** | External links leave the app for the system browser (`components/NativeExternalLinks.tsx`); inside the shell you can only reach mybiblebuddy.net |
| User-generated content | Yes | Study groups and article comments |
| Social media | Yes | Posts are redistributed through a feed |
| Social media disabled under 13 | No | There is no age gate — see below |
| Messaging and chat | Yes | `/messages` |
| Advertising | **No** | Ads are off in the native build |
| Profanity or crude humour | None | |
| Horror / fear themes | None | Frightening passages exist, but the app is not horror content |
| Alcohol, tobacco or drugs | Infrequent | Scripture plainly references wine and drunkenness |
| Medical or treatment info | None | |
| Health or wellness topics | No | Devotionals are spiritual reflection, not self-care advice |
| Mature or suggestive themes | Infrequent | The full KJV includes adultery, rape and incest, and the notes explain those passages |
| Sexual content / graphic | None / None | No depictions |
| Cartoon violence | None | |
| Realistic violence | Infrequent | Biblical narrative |
| Prolonged graphic violence | None | |
| Guns or weapons | Infrequent | Swords and spears throughout |
| Simulated gambling / gambling / loot boxes | None / No / No | |
| Contests | Infrequent | Trivia and streaks |

The judgement calls are the "infrequent" ones. They are there because the app
presents the complete Bible, and under-declaring is a rejection risk while
over-declaring only costs a slightly higher age. Change them if you disagree —
the questionnaire is editable until submission.

**There is no age gate today.** `/terms` says Bible Buddy "is not intended
for children under 13", and nothing at signup collects or checks a birthdate
— no age field exists anywhere in the signup or onboarding flow. That is the
normal posture for a 12+ app and Apple does not require a gate, but it is a
deliberate position rather than an oversight, so do not tell App Review there
is one.

---

## Store listing

**Name** (30 max)

```
Bible Buddy: Study & Devotions
```

**Subtitle** (30 max)

```
Read the Bible, understand it
```

**Keywords** (100 max, comma separated, no spaces, don't repeat the name)

```
bible,study,devotional,scripture,daily,reading,plan,verse,christian,faith,prayer,kjv,notes,trivia
```

**Promotional text** (170 max, changeable without review — use it for
whatever is current)

```
Reading plans, chapter-by-chapter notes, devotionals, trivia and a study group — free, with no account needed to read along.
```

**Description**

```
Bible Buddy helps you read the Bible and actually understand what you're reading.

Open any chapter and the hard parts are explained as you go — who this person
is, what's happening here, what this phrase meant to the people who first
heard it. No commentary degree required.

READ THE BIBLE
Every chapter, with notes that explain the people, places and phrases along
the way.

BIBLE IN ONE YEAR
A daily reading plan through the whole Bible, with audio you can listen to on
the way to work.

DEVOTIONALS
Short studies that help you reflect on Scripture and apply it to your week.

STUDY NOTES
Go deeper on any chapter with plain explanations that make the passage make
sense.

TRIVIA
Test what you know and find something you didn't.

A STUDY GROUP
Ask questions, share what you're learning, and study alongside other people
instead of alone.

DAILY CHECK-INS
A reminder when you want one, a streak when you keep it, and your progress
saved as you go.

Bible Buddy is free. There is no subscription and no paid tier.
```

**What's New** (first release)

```
The first Bible Buddy app. Everything from the website, plus offline reading,
lock-screen audio controls and a daily reading reminder.
```

**URLs**

| Field | Value |
|---|---|
| Support | https://www.mybiblebuddy.net/contact |
| Marketing | https://www.mybiblebuddy.net |
| Privacy policy | https://www.mybiblebuddy.net/privacy |

---

## App Review notes

Paste into the App Review Information box. **Create the demo account first
and give it real data** — a reviewer who sees an empty app is far more likely
to invoke Guideline 4.2.

```
DEMO ACCOUNT
Email:    appreview@mybiblebuddy.net
Password: [set one and put it here]

This account has a reading plan in progress, saved notes and study group
membership, so the app is not empty on first open.

ABOUT THE APP
Bible Buddy is free. There are no in-app purchases, no subscriptions and no
paid tier. No ads are shown anywhere in the app.

USER-GENERATED CONTENT (Guideline 1.2)
Readers can post in study groups and comment on articles. Every post,
comment, reply, profile and group member can be reported and blocked from
inside the app. Blocked users' content is hidden immediately. Reports go to a
moderation queue that is reviewed daily, and we act on reported content
within 24 hours.

AI DISCLOSURE
"Little Louis" is an AI study assistant powered by OpenAI. It is disclosed as
AI before the first message and requires consent to use. It is instructed to
direct anyone in crisis to real help.

ACCOUNT DELETION (Guideline 5.1.1(v))
Settings > Delete account, which removes the account and its data. Also
available at https://www.mybiblebuddy.net/delete-account.
```

---

## Info.plist strings needed

Xcode work, listed here so the wording is decided in advance. Apple rejects
vague permission strings.

| Key | String |
|---|---|
| `NSMicrophoneUsageDescription` | Bible Buddy uses the microphone so you can speak to Little Louis instead of typing. |
| `NSPhotoLibraryUsageDescription` | Bible Buddy needs access to your photos so you can set a profile picture and share images in your study group. |
| `NSCameraUsageDescription` | Bible Buddy uses the camera so you can take a photo for your profile or your study group. |
| `UIBackgroundModes` | `audio` — so chapter readings keep playing when the screen locks. |

---

## Screenshots

6.9" iPhone, the only required size. Six, in this order — the first two are
what people actually see in search results, so they carry the argument:

1. A chapter open with a study note expanded — the whole pitch in one image
2. Bible in One Year, a day in progress
3. Devotionals
4. Study group feed
5. Trivia
6. Streak and progress

Captions across the top of each, large enough to read at thumbnail size.
