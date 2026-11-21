# Bible Buddy dashboard: widget brief

Written 21 November 2026 for a mock-up. Paste everything below the line into
ChatGPT and attach `current-dashboard.jpg` from this folder, which is a
phone-size capture of the dashboard as it is today.

---

## The job

Design a phone mock-up of the Bible Buddy home dashboard rebuilt as a
**widget home screen**, like the iPhone home screen. Every block on the
dashboard becomes a widget. The reader can add widgets, remove them, drag
them into a new order and pick a size.

Please produce:

1. The default dashboard a brand-new reader sees (normal mode).
2. The same screen in **edit mode**: widgets jiggle, each has a remove badge,
   there is an "Add widget" button, and one widget is being dragged.
3. The **widget gallery** that opens from "Add widget": widgets grouped by
   category, each offered in its sizes.
4. A second example dashboard for a different kind of reader (for example a
   social reader: feed, buddies, messages and prayer first), to show how
   different two people's dashboards can be.

## What Bible Buddy is

A free Bible study app (website plus iPhone and Android apps that show the
same site). People read the Bible with study notes, follow multi-day study
guides, do a Bible in One Year plan, keep a daily streak, play Bible games,
post in a social feed with their "buddies", and chat with an AI helper
called Lil Louis.

## What the dashboard looks like today

The attached image is the truth; this is the same thing in words. Top to
bottom, in a fixed order that nobody can change:

1. Greeting: "Good afternoon, Louis" and "Let's grow closer to God today."
2. Three small stat cards in a row: Day Streak (320), % of Bible read (13%
   ring), Level (Level 20).
3. **Verse of the Day**: large card, verse in a serif face over a soft
   sunset-cloud background, with Read the Breakdown, Memorize, bookmark and
   share.
4. **Your Bookshelf**: a sideways row of study covers. Each cover shows its
   state: upcoming study with a countdown, live group study ("Day 14 of 21,
   163 studying together"), currently reading ("Day 9 of 31, 29%"), Bible in
   One Year ("Day 37 of 365"), completed.
5. **Today's Group Study**: today's reading and discussion question, how many
   people have answered, and a "Start Day 14" button.
6. **Quick Reads**: a sideways row of blog articles with banner images.
7. **Look It Up**: a search box ("Search 7400+ names, places and words") and
   three tiles: People, Places, Keywords.
8. **Test Your Knowledge**: four game cards: Bible Trivia, Scrambled, Bible
   Word Search, Bible Memory.

Around it:

- Top bar: "Bible Buddy" wordmark, notification bell, messages icon, profile
  photo.
- Bottom bar: a floating white pill with six tabs: Home, Bible, Library,
  Games, Feed, Lil Louis.

## Look and feel to keep

- Page background very light blue-white (`#F7FAFC`). Main brand colour is
  logo blue (`#0056FD`).
- Cards have large rounded corners (about 24px), a thin border and a soft
  pastel gradient tint (peach, mint, lavender, sky). Each card type has its
  own tint.
- Headings are a heavy, wide black sans-serif. Scripture is set in a serif.
- Buttons are pills: dark navy with white text, or the card's own strong
  colour (the live study uses red).
- Friendly, warm, a little playful. Not corporate, not a plain white card
  with a grey button.

## Widget sizes

Use a two-column grid on a phone, like iPhone widgets:

- **Small**: one column wide, square. One number or one action.
- **Medium**: two columns wide, short. A line or two plus a button.
- **Large**: two columns wide, tall. Real content you can read or use.

## The widget catalogue

Every widget below is a real feature that exists in the app today.
"New" in the last column means the feature exists but the small view would
need a little building.

### Daily habit

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Streak | S | Flame, "320 day streak", grace days left | Do today's reading | On dashboard |
| % of Bible | S | Progress ring, "13% of the Bible" | Continue reading | On dashboard |
| Level | S, M | "Level 6, 340 XP to next", progress bar | Open levels | On dashboard |
| Next badge | S | Badge art, "80% to Faithful Reader" | Open badges | New |
| Verse of the Day | M, L | Today's verse over background art | Read breakdown, memorize, share | On dashboard |
| Weekly report | M | "This week: 5 chapters, 3 days" | View report | New |
| Bible Lock | S | "Locked, 1 task to unlock" or "Unlocked" | Open today's tasks | iPhone app only |

### Reading and studying

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Study guide (one per study) | S, M | Cover, "Day 4 of 30", progress bar, last read | Continue Day 5 | New as its own widget |
| Bookshelf | L | The sideways row of all the reader's studies | Open a study, open Library | On dashboard |
| Bible in One Year | S, M | "Day 37 of 365", today's reading, play button | Continue, play today's audio | New as its own widget |
| Continue reading | S, M | "Last read John 3", next chapter | Open next chapter | New |
| Chapter audio | M | Chapter title, play/pause, progress | Play | New |
| Group study today | M | Today's reading, question, "42 answers so far" | Start today | On dashboard |
| Group study countdown | S | "Starts in 9 days", cover | Sign up | New as its own widget |
| Suggested study | M | A study the reader has not started | Start | New |

The study guide widget is the important one: a reader can have several
studies going at once, so they can add **one widget per study** and see all
of them. There are six studies today: The Beginning of Everything (21 days),
The Obedience of Abraham (30), The Wisdom of Proverbs (31), The Tempting of
Jesus (21), 21 Women of the Bible (21) and Higher Hope (60), plus Bible in
One Year (365).

### Ask and look up

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Lil Louis | M, L | An "Ask Louis anything" box and his last reply | Type a question right there | New |
| Look It Up | M | Search box, People / Places / Keywords tiles | Search | On dashboard |
| Person, place or word of the day | M | One entry with a picture and one line | Learn it | New |
| What I've learned | S | "48 people, 12 places, 30 keywords learned" | Open the list | New |

### Notes and saved things

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Notes | S, M | "12 notes", the latest one | New note | New |
| Saved verses | S, M | Latest bookmarked verse | Open bookmarks | New |
| Recent highlight | S, M | The last verse the reader highlighted | Open that chapter | New |

### Games

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Bible Trivia | S, M, L | L: one question playable inside the widget | Answer, or Start | On dashboard (card only) |
| Scrambled | S, M | "Next: Genesis 4" | Play | On dashboard (card only) |
| Bible Word Search | S, M | Next book | Play | On dashboard (card only) |
| Bible Memory | S, M, L | "3 verses to practise", L: practise one inside the widget | Practise | On dashboard (card only) |

### Community

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Feed | M, L | The two or three newest posts from buddies | Open post, write a post | New |
| Buddies | S, M | Buddy photos, what they did today, buddy requests | Accept, open a profile | New |
| Messages | S, M | "3 unread", latest message preview | Open the conversation | New |
| Prayer requests | M | The newest prayer request from the feed | Pray, post a request | New |
| Top Buddies | S, M | This week's leaderboard, the reader's place | Open the board | New |
| Invite a buddy | S | "Study with a friend" | Share the invite link | New |

### Reading material

| Widget | Sizes | Shows | One-tap action | Status |
|---|---|---|---|---|
| Quick Reads | M, L | Blog articles with banner images | Read | On dashboard |

## How editing should work

- Press and hold any widget to enter edit mode. Widgets wobble.
- Each widget shows a small remove badge in its corner.
- Drag a widget to move it; the others slide out of the way.
- An "Add widget" button opens the gallery, grouped by the categories above.
  Each widget is shown in every size it comes in.
- "Done" leaves edit mode. A "Reset to default" link puts everything back.
- The layout belongs to the reader's account, so it is the same on their
  phone and on the website.

## Rules for the mock-up

- Keep the top bar and the floating six-tab bottom bar exactly as they are.
- Keep the greeting at the top; it is not a widget.
- Some widgets have nothing to show some days (no group study running, no
  unread messages). Show a calm empty state for one of them, not a blank box.
- Do not invent features that are not in the catalogue. No video or TV
  widget, no shop, no subscription or upgrade widget, no coins or diamonds.
- Suggested default for a new reader: Streak, % of Bible, Level (three
  smalls), Verse of the Day (large), their current study guide (medium), Lil
  Louis (medium), Feed (medium), one game (medium).
