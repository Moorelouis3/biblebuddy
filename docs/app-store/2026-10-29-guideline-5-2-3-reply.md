# Reply to App Review — Guideline 5.2.3, 29 October 2026

Submission ID `b6072ee2-6fd5-4091-8f84-c87d7796fcfd`.

**Do not send this until the deploy is live and verified** (see "Before you
send" at the bottom). Apple will check, and if the TV tab is still reachable
the reply makes things worse rather than better.

---

## The reply

Thank you for the review, and for being specific about the guideline.

You are right, and we have removed the content in question.

The previous build included a section called Bible Buddy TV. It listed films,
series and documentaries produced by other people and played them from
YouTube, presented under our own branding with our own posters. We do not hold
the rights to present that material as a catalogue inside our app, and it
should not have been there.

In the current build:

- The TV tab has been removed from the app's navigation.
- Every /biblebuddy-tv route is blocked in the iOS app and redirects to the
  home screen, so the catalogue cannot be reached from a link, a shared URL,
  or by typing an address. It is not merely unlinked — it does not load.
- No third-party film, series or documentary is listed, described, or playable
  anywhere in the app.

Everything that remains in Bible Buddy is written and produced by us: our
Bible study guides, our daily devotionals, our chapter-by-chapter study notes,
our own narrated audio, and our own video.

Bible Buddy is a wrapper around our own website, so this change is already
live and applies to the build you currently have in review. No new binary is
needed to see it — opening the app will show no TV tab, and /biblebuddy-tv
will not load.

We are happy to make any further change you need.

Thank you,
Louis Moore III
Bible Buddy

---

## Before you send

1. The fix must be **deployed and live**. Check: the TV tab is gone in the app
   and `https://www.mybiblebuddy.net/biblebuddy-tv` redirects when requested
   with the app's user agent (it still works in a normal browser — the website
   is unchanged).
2. Paste the reply into **Reply to App Review** on the submission page.

## What was changed, for the record

| Where | Change |
|---|---|
| `app/biblebuddy-tv/layout.tsx` | New. Server-side redirect to `/` when the user agent carries `BibleBuddyApp`. This is the real block — it covers every TV route at once, including ones reached by deep link. |
| `components/BottomNav.tsx` | The TV tab is filtered out of the bottom bar in the app. |
| `components/home/BibleBuddyTvShelf.tsx` | The home-screen TV shelf renders nothing in the app. |
| `components/DashboardCards.tsx` | The "Bible Buddy TV" dashboard card is hidden in the app. |

Nothing was deleted and the website keeps the section exactly as it was.

**Known gap, not a blocker:** Lil Louis can still *offer* to open Bible Buddy
TV in conversation (7 places in `components/ChatLouis.tsx`). Those now land on
the home screen because the route redirects, so the catalogue is still
unreachable — but the suggestion is a dead end and should be cleaned up.

If the catalogue is ever licensed, or rebuilt out of Louis's own videos,
deleting `app/biblebuddy-tv/layout.tsx` turns it back on.
