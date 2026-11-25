# Why Bible Buddy feels slow, and what to do about it

25 November 2026. From three sources: timings taken on the live site in
Chrome, a read of the code, and research on how other Bible apps work.
Nothing in this report has been changed yet.

## The short answer

Nothing is ever "already downloaded". Three things cause almost all of the
waiting:

1. **The site tells phones not to keep any picture or sound.** One line in
   `vercel.json` sends `Cache-Control: no-store` for everything except the
   Bible text, the notes and the code. Every map, board, cover, banner and
   music track is downloaded again on every visit.
2. **Screens ask for their data only after they have loaded, one request
   after another**, and each one waits on a sign-in check that goes over the
   network.
3. **Some screens ship far more than they need.** The Plans screen carries
   the whole Bible's study notes; study days carry about 3 MB of game data.

App size is not the reason. That part is at the end.

## What was measured

Live site, signed in, desktop Chrome on wifi. Phones on mobile data will be
slower than this. One run each, so treat them as rough.

| Screen | What happened |
|---|---|
| Any page | The server takes 0.4 to 1.8 seconds to answer before anything can start. One chapter request took 7.5 seconds (a cold start). |
| Study guide day | Bounced through three pages to reach Plans. 174 requests, 58 database calls, 7.9 MB of code. The last data arrived at 11.3 seconds and the study text was still not on screen at 10 seconds. |
| Bible chapter (Genesis 1) | 45 database calls, 3.5 MB of code. The notes arrived at 11.6 seconds on the slow run. |
| Bible Match | The page itself appears in 0.3 seconds, then downloads 21 pictures, 11.2 MB, plus a 1.7 MB music track. Every visit. |

## Causes, biggest first

| # | What people feel | Cause | Fix | Needs an app build? |
|---|---|---|---|---|
| 1 | Maps, boards, covers and music load slowly every time | `vercel.json` catch-all `no-store` | Let phones keep pictures, fonts and sound | No |
| 2 | Match is slow to start | It preloads all 14 book maps (about 11 MB) on its home screen | Load only the current book's map and the next board | No |
| 3 | Opening a study shows blank, then a splash, then "Loading plan..." | Three redirects in a row, each drawing nothing | Link straight to the final page | No |
| 4 | Long splash on Plans and study days | The whole Bible's notes are bundled into that screen (the code's own comment calls it a 33 MB chunk), plus 1.8 MB of trivia data | Load one chapter's notes at a time, as the Bible reader already does | No |
| 5 | "Loading Bible study..." for several seconds | Seven database requests in a row, and the whole chain runs twice | Run them together, show the study first, remember it on the phone | No |
| 6 | Everything on a screen arrives late together | 148 places ask the server "who is signed in?" and every other request waits behind that | Read the sign-in from the phone instead | No |
| 7 | Grey screen before a chapter | The chapter waits for the sign-in check, then downloads the reader | Start both at once, show a text skeleton | No |
| 8 | Covers and banners appear slowly | 600 to 1,000 KB pictures shown as small thumbnails | Small versions of each cover | No |
| 9 | Home numbers blank and refill every visit | Nothing on Home is remembered between visits | Show the last known numbers at once, refresh behind | No |
| 10 | Nothing works without signal, worst on iPhone | The offline cache does not run inside the iPhone app | Store content on the phone through a native storage plugin | Yes |

The Bible reader is the healthiest part: the text and notes are already small
static files that phones are allowed to keep.

## Why iPhone is worse

Android's web view can run the site's offline cache, which hides some of
cause 1. The iPhone web view only runs it under a setting that is switched
off in this app, so on iPhone every picture really is fetched again each
time. This was read from the code and not confirmed on a device.

## The order to do it in

**Step 1, a day of work, no app build:** causes 1 and 2. This is the "it
should already be downloaded" complaint. After it, a second visit to Match
loads its art from the phone.

One trade-off: if a picture is replaced under the same file name, phones
keep the old one for up to a day. A new file name shows at once.

**Step 2, a few days, no app build:** causes 3 to 7. This is the study guide
complaint.

**Step 3, small:** causes 8 and 9.

**Step 4, needs a new app build:** real offline. Add native storage to the
apps and download a content pack on first open: the whole KJV is only
7.4 MB, the notes and the reader's current studies are a few MB more. Apple
allows this; a required first download has to state its size.

## How other apps do it, and the 6 MB question

Bible Buddy is 6 MB because the apps are a frame around the website. The
others are native apps:

| App | iPhone size |
|---|---|
| Lectio 365 | 61 MB |
| BibleProject | 83 MB |
| Blue Letter Bible | 97 MB |
| Olive Tree | 120 MB |
| Bible Gateway | 137 MB |
| YouVersion | 182 MB |
| Hallow | 211 MB |
| Dwell | 258 MB |
| Logos | 339 MB |
| Glorify | 487 MB |

That size is mostly program code, artwork and sometimes one built-in Bible.
They do not ship everything. YouVersion downloads each Bible version when
you ask for it and calls them "very small text files". Logos streams books
unless you tap Download.

What makes them feel instant is that anything already seen is read from the
phone. Bible Buddy can do the same at 6 MB plus a small content pack.

## The speed test against other apps

Not done. Timing YouVersion or any other native app needs a real phone, and
no published comparison exists. The fair way to do it:

- One phone, one network, screen recording on.
- Time three things in each app: cold start to first real content, tap to
  chapter text, and the same two in airplane mode.
- Count the frames in the recording.

Under one second from tap to text is the mark that feels uninterrupted.
Bible Buddy is several seconds from that today on a study day.

## Not confirmed

- Timings on a real phone.
- Whether the offline cache actually runs inside each app.
- The real size of the Plans bundle; 33 MB is from a comment in the code.
- Android download sizes of the other apps.
