# One popup system for Bible Buddy: proposal

Louis asked for this on 13 November 2026. Nothing in here is live for users.
The existing popups still run exactly as before, and no one's history was
touched. What exists so far is a preview: the rules as tested code, one shared
popup design, and an unlinked page at `/tips` where each proposed tutorial can
be opened by hand.

## 1. What we have today

There is no coordinator. Each popup is its own component with its own timer,
and what a person sees is decided by which network call comes back first.
Seven of them share one table (`user_popups_seen`) to remember "shown". That
table records only that a popup was shown: not whether it was closed, tapped
or acted on.

### Announcements and tutorials (the ones this proposal is about)

| Popup | What it is | Who sees it, where | On now? | Buttons | Remembered in | Can it compete? |
|---|---|---|---|---|---|---|
| **Beginning of Everything** | Invitation to join the live study | Signed in, not a member, any app page | Yes, until 29 Nov | Start the free study (joins, opens Day 1); close | `user_popups_seen` `beginning_of_everything_2026` | Yes. Ignores the "one promo per visit" key |
| **Study day reminder** | "Day N is ready" for study members | Members who have not done today's day | Yes | Open today's study; Later today | `..._day_<n>`, one row per day | Yes |
| **Proverbs launch** | "Proverbs has started" | Members, during the study | No. Study ended 31 Oct. Still mounted and still calls the server on every page load | Start Day 1; Not now | `wisdom_proverbs_launch_2026` | No longer |
| **Proverbs book** | "New book live" | Proverbs members and readers | Yes | See the books; Not now | `wisdom_proverbs_book_2026` | Yes |
| **New games** | Bible Memory and Word Search | Everyone signed in, once | Yes | Try Bible Memory; Try Word Search; Maybe later | `new_games_2026_11` | Yes. Ignores the per-visit key |
| **Bible Lock** | Announces Bible Lock | iPhone app, lock not set up | Yes (from the next build) | Set up Bible Lock; Maybe later | `bible_lock_2026_11` | Yes. Also shows alongside the Bible Lock strip, which targets the same people |
| **Weekly prayer / weekly poll** | Nudge to the feed, once a week each | Everyone signed in | Yes | Add your prayer request; vote; Maybe later | `weekly_prayer_<date>`, `weekly_poll_<date>`, `weekly_any_<date>` | Yes |
| **App Store ask** | "Bible Buddy is on the App Store" | Signed in, iPhone browser | Yes | Download; Not now (5 days); Don't show this again | This phone only (`bb:appstore-ask`) | **Worst offender.** Checks nothing, sits above every other popup, and reopens on every page load until a button is pressed |
| **Android beta ask** | Recruits Android testers | Signed in, Android browser | Yes | Yes, show me how; Not now; Don't show this again | This phone only (`bb:playstore-ask`) | Same as above |
| **Bible Lock strip** | One-line strip at the top of every page | iPhone app | Yes | Set Up; close | This phone only | Shows with the Bible Lock popup |
| **Feed intro** | Four steps, ends with agreeing to the Community Guidelines | First visit to the feed | Yes | Continue / Back; cannot be closed | `profile_stats.feed_onboarding_completed` | Opens at once. Others wait for it, then open two seconds after it closes |
| Proverbs join popup | The original study invitation | - | No. Not mounted | - | `wisdom_proverbs_2026` (still read by the book popup) | - |
| Monthly update modal | "What's new" | - | No. Dead code | - | - | - |
| Daily welcome, daily recommendation | Verse / "what to do next" | - | No. Flagged off | - | - | - |
| Louis feature tours | 15 tour keys (dashboard, reader, games...) | - | **No. None of them can open.** The modal is hard-coded off and the event the others fire has no listener | - | `profile_stats.feature_tours` | - |
| Dashboard guided intro | 4-step dashboard tour | - | No. Never starts | - | - | - |

So today there is **no working feature tutorial at all** apart from the feed
intro. Everything live is an announcement or an ask.

### Not part of this (necessary dialogs, left alone)

Name-and-photo prompt after the first action, account-required gate,
"welcome back" after a cancelled deletion, level-up and day-complete
celebrations, "You're Buddies", the push and install asks after finishing a
day, confirmations, errors, contact form. These keep priority: while one is
up, no educational popup opens.

### What goes wrong today

1. **No limit per visit.** A returning person on an iPhone browser can get,
   one after another on the same visit: App Store ask, New games, Beginning
   of Everything, weekly prayer. Each opens about two seconds after the last
   one is closed.
2. **The winner is luck.** Whichever popup's database check returns first.
3. **Two can open stacked.** Each checks "is another popup open?" and then
   waits on a database write before opening. Two can pass the check together.
4. **Popups open on top of what the person just chose.** Tap "Open today's
   study" and New games can open over the study day.
5. **Seeing the App Store ask counts as activity.** It writes
   `appstore_popup_shown` into `master_actions`, the same table streaks and
   active-user counts are read from.
6. **We cannot tell if a popup worked.** Only "shown" is on the account.
   Closes and taps go to an analytics table and are never joined back.

### Previews

New games and Bible Lock: any app page with `?bb_preview=new_games` or
`?bb_preview=bible_lock`. These record nothing.

The study popups have preview links too (`?previewPopup=1&previewDay=6`,
`?previewLaunch=1`, `?previewBooks=1`), but those go through the real
"shown" write, so I did not open them on Louis's account.

## 2. Tutorials I recommend

Wording for the reader and the study guides comes from the approved welcome
emails (days 2 and 3). The rest was checked against the screens.

**Already exist and stay:** New games, Bible Lock, the feed intro.

**New. All seven are built in the preview and open from `/tips`:**

| Tutorial | Appears in | For | Headline | Steps | Button |
|---|---|---|---|---|---|
| Bible Study Notes | The Bible reader | Anyone who has never opened a study note | Tap a highlighted word. | Open a chapter / Tap a highlighted verse or phrase / Or turn on Study Mode | Got it (Open the Bible, from Tips) |
| Bible Study Guides | A study page | Anyone who has never finished a study day | One day at a time. | Read / Learn / Test / Discuss | Got it (Browse the studies) |
| Bible Memory | Bible Memory | Anyone who has never finished a round | Save a verse. Then practise it. | Add a verse / Practise it / Come back to it | Got it (Open Bible Memory) |
| Bible Word Search | Word Search | Anyone who has never finished a book | Pick a book. Find its words. | Choose a book / Drag across the letters / Read what you found | Got it (Open Word Search) |
| Bible Trivia | Trivia | Anyone who has never finished a chapter quiz | Did it stick? | Review what you read / Check your understanding / Learn something new | Got it (Play Bible Trivia) |
| The Community Feed | Anywhere except the feed | Account 3+ days old, never posted | A feed that stays on the Bible. | Share what you are learning / Ask for prayer / Join the conversation | Open the feed |
| Verse of the Day | Anywhere | Account 3+ days old, never opened a breakdown | One verse, explained every day. | Read the breakdown / Tap Memorize | See today's verse |

Full wording is in `lib/popups/catalog.ts`.

**Not recommended now:** Bible in One Year (its day flow already explains
itself step by step), Notes (used by very few; a dashboard card already
prompts it), Lil Louis (unreliable until its errors are fixed).

## 3. The rules, in plain English

**One per visit.** A person gets at most one automatic educational or
announcement popup per visit, across the whole app.

**What a visit is.** A visit lasts until there have been 30 minutes with no
activity. Changing page, refreshing, opening a second tab and reopening the
app within 30 minutes are all the same visit. The visit is kept where every
tab can see it, so two tabs cannot each show one.

**Between visits.** At least 20 hours between automatic popups, and no more
than three in any seven days, however often someone opens the app. This is
checked against the account, so a phone and a laptop share the limit.

**A quiet moment.** A popup waits until the page has been still for a couple
of seconds and nothing else is open. It never opens while someone is typing,
in the middle of a game round, with audio playing, on a study day page, or
inside a prayer or post they are writing. It never opens in the first few
seconds after the person tapped a popup's button to go somewhere.

**Mandatory things go first.** The name prompt, account gates, the feed
guidelines step, celebrations and anything else necessary always win. An
educational popup waits for another visit rather than following straight
after.

**Who is eligible for a given popup.** It must be switched on, not expired,
supported on the device, and the person must not already use the feature.
A tutorial only appears in the section where the feature is. An announcement
appears anywhere except the section it is about.

**Which one wins**, when several are eligible:

1. Anything with an end date (a study that starts this week).
2. A tutorial for the section the person is in.
3. A feature announcement.
4. The weekly feed nudges and the App Store / Android asks.

Within a level, the higher priority number wins.

**If nothing fits, nothing shows.** That is the normal case.

### Closing and repeating

| What the person does | What happens |
|---|---|
| Close, Escape, tap outside, "Maybe later" | All mean "not now". It may come back once, 14 days later. Closed a second time, it never returns on its own |
| Taps the main button | Never shown again automatically. Counted as a tap, not as using the feature |
| Actually uses the feature | The popup is retired for them. If that happens within 7 days of seeing it, it counts as adoption |
| "Don't show this again" | Offered only on the repeating ones (store asks, weekly nudges). Permanent |
| We fix a typo or change the picture | Nothing. Nobody sees it again |
| We raise the popup's version number | The only thing that makes it eligible again for people who finished with it |

Every tutorial stays available by hand in **Tips**, whatever the automatic
rules say. Opening one there is never counted as an automatic display.

## 4. Three journeys

**New user (signed up today).** She lands on the dashboard: nothing, because
the two discovery popups wait until the account is three days old. She opens
Genesis 1. After a couple of still seconds the Bible Study Notes tutorial
appears, taps "Got it". She goes on to Trivia in the same visit: nothing,
one per visit. Tomorrow she opens Trivia again: the Trivia tutorial, unless
she already finished a quiz, in which case nothing.

**Returning user (a month old, reads chapters, never opened the feed).** On
the dashboard he gets "A feed that stays on the Bible." He closes it. Nothing
else that visit, nothing for 20 hours. Two days later in Word Search he gets
the Word Search tutorial. The feed popup may return once, two weeks later.
If he closes it again it is gone for good, though it is still in Tips.

**Experienced user (uses the reader, studies, trivia, feed, memory).** She is
never taught any of those. She sees a popup only when something is genuinely
new, such as a study with a start date, and at most three in a week.

These three are tested by `npm run verify:popups` (23 checks).

## 5. The minimum changes

**Code**

- `lib/popups/catalog.ts`: the one list of popups. *Built.*
- `lib/popups/decide.ts`: the rules above as one plain function that also
  returns its reasons. *Built and tested; not called for users.*
- `components/popups/FeaturePopup.tsx`: the one shell in the approved design.
  *Built.*
- `/tips`: open any tutorial by hand. *Built, not linked from anywhere.*
- `components/popups/PopupCoordinator.tsx`: one component mounted once in
  AppShell. Gathers what `decide` needs, waits for the quiet moment, claims
  the display, opens the shell, records the outcome. *Built 13 Nov, switched
  off (`COORDINATOR_ENABLED = false`). Not yet run against real accounts.*
- The App Store and Android asks are in the catalog (`ask_app_store`,
  `ask_android_beta`) and the old popups stand down whenever the coordinator
  is on (`lib/popups/switch.ts`). *Built and tested locally 13 Nov; off.*
- Move New games, Bible Lock, the study popups and the weekly nudges into the
  catalog, and remove their own triggers. *Not done.*
- Delete what is dead: the Proverbs launch popup, the unmounted Proverbs join
  popup, the monthly update modal, the unused popup queue. *Not done.*

**Database** (run on 13 Nov 2026 with Louis's go-ahead:
`supabase/migrations/20261113_popup_coordinator.sql`. 4,892 existing rows
kept, `popup_settings` is empty so every popup is off)

1. Add columns to the existing `user_popups_seen` rather than a new table, so
   every existing row keeps its meaning:
   `content_version`, `first_shown_at`, `last_shown_at`, `display_count`,
   `dismissed_at`, `dismiss_type`, `cta_clicked_at`, `completed_at`,
   `never_again`, `next_eligible_at`, `automatic`.
2. A small `popup_settings` table: `popup_id`, `enabled`, `priority`,
   `expires_at`, `updated_at`. This is what the admin switches write, so a
   popup can be turned off without waiting for a build.
3. One database function, `claim_popup(popup_id, version)`. It locks the
   person's rows, re-checks the 20-hour and three-a-week limits, and only
   then records the display. This is what stops two tabs, or a phone and a
   laptop, from both showing one: the database decides, not the browser.

A view is recorded at the moment the popup opens, not when it is picked: the
coordinator only asks the database once the page has been still, clear and
visible for a few seconds, and opens the popup the instant it is told yes.

**Signed-out visitors.** The app is behind an account, so the coordinator
only runs signed in. The one signed-out prompt (the blog's app bar) keeps its
phone-only memory. On sign-in, anything remembered on the phone is copied to
the account only where the account has no row yet. It never overwrites.

**Popup events stay out of activity.** Popup events go to the analytics table
only. Nothing a popup does writes to `master_actions`, and the App Store ask
stops doing so.

## 6. Keeping everyone's history

- No existing row is deleted or changed in meaning. The new columns are
  filled from what is there: `first_shown_at` and `last_shown_at` from
  `seen_at`, `display_count` 1, `content_version` 1.
- Every existing popup keeps its id, so "already seen New games" stays true.
- Old rows are marked as not counting toward the weekly limit, so nobody
  starts out blocked.
- The store asks' phone-only memory ("don't show again", snoozes) is copied
  to the account the first time the coordinator runs on that phone.
- The feed intro's flag stays where it is.
- The old Louis tour flags are ignored. No tour ever opened, so there is
  nothing to honour.

**Order of rollout**

1. Run the database change. Nothing visible changes.
2. Ship the coordinator switched off, with every popup `enabled = false` in
   `popup_settings`. Check the "why / why not" view against test accounts.
3. Move the existing popups under it one at a time, removing each one's own
   trigger in the same change. This step alone ends the stacking.
4. Turn on the new tutorials one at a time and watch the numbers.
5. Add Tips to the More menu.

## 7. Admin

One page, `/admin/popups`, on the existing admin layout:

- Every popup in the catalog with a Preview button (the same shell).
- On/off, priority and expiry, saved to `popup_settings`. Section, audience
  and wording stay in the catalog file, where they can be reviewed.
- "Check an account": enter a user, pick a page, and see for each popup
  "eligible" or the reason it is not. This is the same function that decides
  for real, so it cannot disagree with what the person sees.
- Per popup: shown, closed, tapped, and adopted within 7 days.

These numbers go in the existing Features tab on the analytics page rather
than a second dashboard.

## 8. The preview

- `/tips` while signed in: all seven proposed tutorials. `/tips?open=<id>`
  opens one directly, for example `/tips?open=tutorial_reader_study_notes`.
- `npm run verify:popups`: the rules and the three journeys.

## Decisions for Louis

1. The limits: one per visit, 20 hours apart, three a week.
2. Close and "Maybe later" treated the same (back once after 14 days).
3. The seven tutorials and their wording.
4. Whether the App Store and Android asks come under the same limit. I
   recommend yes: they are the most intrusive popups we have.
5. Go-ahead for the database change.
