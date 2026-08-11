# Handoff: upload 35 YouTube Shorts

Everything is rendered and ready. All that is left is uploading and
scheduling. Nothing here needs re-rendering — do not regenerate the videos.

## What to do

**Channel:** Bible Study With Louis — `UCY0Hxdc0TPl1gFqZpgjiGaQ`

1. **Publish `19-choose-your-hard.mp4` LIVE NOW** (public, publish immediately,
   not scheduled). Louis asked for this one to go up right away. It is the
   strongest post in the set — 6.6K likes on Threads.
2. **Schedule the other 34** at the dates and times in the table below.
3. Per video: title and description are given below. Set **"No, it's not made
   for kids."** Visibility **Public**. Everything else default.

## Rules that matter

- **The music is already baked into every file.** Do NOT add a track from
  YouTube's sound catalogue. That was a deliberate decision: Louis uploads from
  desktop, where the catalogue is unreachable, so the audio was mixed in
  instead. Adding catalogue audio would play two tracks at once.
- The music is lifted from `Template 03.mp4` of Louis's Bible in One Year
  templates. He has confirmed it is the right track and cleared for use.
- Every file is already 1080x1920 vertical, 6–23s, H.264 + AAC, `+faststart`.
  YouTube will classify them as Shorts automatically. Do not add `#Shorts` to
  the title; it is already in the descriptions.
- **Times are in whatever timezone the YouTube Studio account is set to.**
  Nobody has verified which that is. Louis is in Germany. Worth confirming the
  Studio timezone with him before scheduling all 34, since 02:00 vs 02:00 in a
  different zone changes the whole week.

## Where the files are

```
C:\Users\Moore\Desktop\biblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e\tmp\shorts\out\
```

35 files, `01-life-feels-off.mp4` through `35-uncomfortable-truth.mp4`, about
55 MB total. Machine-readable schedule: `data/shorts-schedule.json`. Source
text and background assignments: `data/shorts-queue.json`.

## What blocked the previous session — read this before trying

The upload could not be completed from that session. Three routes were tried
and all failed for the same underlying reason:

1. The `file_upload` browser tool is broken — it reports the `paths` argument
   as `undefined` before it even reaches a permission check. Passing the array
   standalone and inside `browser_batch`, with forward and back slashes, all
   produce the same schema error. Do not spend time on this one.
2. Serving the file from `http://127.0.0.1:8791` and attaching it to the file
   input via `DataTransfer` in page JS — the `fetch` hangs forever. The port is
   genuinely bound and reachable (confirmed: `EADDRINUSE` when binding it twice,
   and `curl` returns the full 1,456,681 bytes). Chrome is holding the request
   pending a local-network permission prompt.
3. Clicking "Select files" to drive the native Windows dialog — no dialog ever
   opens. Confirmed by enumerating windows: no file dialog exists.

**Root cause for 2 and 3:** the tab being automated was a *background* tab.
Chrome's active tab was "Commits · Moorelouis3/biblebuddy". A background tab
cannot raise a native file picker and cannot surface a permission prompt, so
both routes hang silently. Creating a new tab via `tabs_create_mcp` did not
front it either.

**So: make the YouTube Studio tab the visible, active tab in Chrome before
starting.** If that alone fixes it, route 2 or 3 should work — the server
script is at `tmp/shorts/serve.js` (run `node tmp/shorts/serve.js`, it already
sends the Private Network Access headers).

If it still will not attach, the durable fix is the YouTube Data API: create an
OAuth client in Google Cloud Console, store the refresh token, and upload with
`videos.insert` setting `status.publishAt` for the scheduled ones. That needs
Louis to click through the consent screen once, and then all 35 — and every
future batch — go up from a script with no browser involved.

## The schedule

### 2026-08-12

**02:00 — Choose Your Hard**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Choose Your Hard`
- Description:
```
Quitting sin is hard.
Hearing 'Depart from me' will be harder.
Choose your hard.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 6600 likes on Threads, 2025-11-19

**06:00 — Not Religious**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Not Religious`
- Description:
```
I am not religious...
I just follow Jesus.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 284 likes on Threads, 2025-11-21

**12:00 — Ready To Be Corrected**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Ready To Be Corrected`
- Description:
```
The Bible is offensive
to those who aren't ready
to be corrected.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 141 likes on Threads, 2025-11-12

**16:00 — Not The Stars**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Not The Stars`
- Description:
```
Zodiac signs try to define you.
But God says that's His job,
not the stars.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 111 likes on Threads, 2025-12-02

**20:00 — Bible Thumper**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Bible Thumper`
- Description:
```
When I first came to God, I didn't want to be a Bible thumper. Now look at me... A Bible thumper 😂

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 60 likes on Threads, 2025-08-26


### 2026-08-13

**02:00 — Another Level Of Strength**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Another Level Of Strength`
- Description:
```
Having to let go of someone
you love to obey God
is another level of strength.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 2500 likes on Threads, 2025-11-21

**06:00 — World Record**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `World Record`
- Description:
```
Jesus holds the world record
for most lives saved...

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 261 likes on Threads, 2025-11-23

**12:00 — Knowing Sin Isn't Safety**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Knowing Sin Isn't Safety`
- Description:
```
Solomon wrote Proverbs
and still fell to the very sins he described.
Knowing sin does not mean
you are safe from it.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 138 likes on Threads, 2026-01-01

**16:00 — Until You Find Treasure**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Until You Find Treasure`
- Description:
```
Reading the Bible scratches the surface.
Studying the Bible digs
until you find treasure.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 105 likes on Threads, 2025-10-29

**20:00 — They Read You**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `They Read You`
- Description:
```
Non-believers don't read the Bible,
but they read you,
so be a reflection of Christ
everywhere you go.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 60 likes on Threads, 2025-10-12


### 2026-08-14

**02:00 — Life Feels Off**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Life Feels Off`
- Description:
```
Anybody else notice how life feels off
after just a few days of not opening your Bible?

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 889 likes on Threads, 2025-08-27

**06:00 — You Do Have Time**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `You Do Have Time`
- Description:
```
"I don't have time to read the Bible."
Yes, you do. Go to bed 30 minutes earlier.
Wake up 30 minutes earlier.
That's 30 minutes of peace with God that can change your whole day.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 259 likes on Threads, 2025-09-08

**12:00 — Be Honest**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Be Honest`
- Description:
```
Be honest, when was the last time you opened your bible 👀

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 131 likes on Threads, 2026-07-06

**16:00 — 20 Minutes**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `20 Minutes`
- Description:
```
I don't know who needs to hear this...
But spending 20 minutes in your Bible
might do more for your peace
than 2 hours on your phone.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 95 likes on Threads, 2026-07-06

**20:00 — Uncomfortable Truth**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Uncomfortable Truth`
- Description:
```
Uncomfortable truth:
The world isn't tired of Jesus.
They're tired of Christians
who don't look like Him.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 59 likes on Threads, 2025-11-11


### 2026-08-15

**02:00 — It's Easy To Wear A Cross**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `It's Easy To Wear A Cross`
- Description:
```
IT'S EASY
TO WEAR
A CROSS AROUND
YOUR NECK
IT'S HARDER
TO CARRY ONE
ON YOUR BACK.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 860 likes on Threads, 2026-07-06

**06:00 — Jesus Is My Everything**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Jesus Is My Everything`
- Description:
```
Jesus is my Peace.
Jesus is my Strength.
Jesus is my Savior.
Jesus is my Redeemer.
Jesus is my Shepherd.
Jesus is my Refuge.
Jesus is my Hope.
Jesus is my Provider.
Jesus is my Lord.
Jesus is my Everything.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 192 likes on Threads, 2026-07-11

**12:00 — Closed Bibles**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Closed Bibles`
- Description:
```
You cannot win a spiritual warfare
with closed Bibles.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 128 likes on Threads, 2025-09-05

**16:00 — Give Him The Gratitude**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Give Him The Gratitude`
- Description:
```
Jesus woke us all up this morning give him all the gratitude 🙌

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 91 likes on Threads, 2026-07-11

**20:00 — 7 Signs God Is Answering You**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `7 Signs God Is Answering You`
- Description:
```
7 Signs God Is Answering You
🕊 You suddenly have peace
🚪 Unexpected doors open
🚫 Wrong doors keep closing
📖 Scripture feels personal
👥 God sends the right people
⏳ Waiting is strengthening you
🙌 Looking back...
you realize He already answered

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 58 likes on Threads, 2026-07-15


### 2026-08-16

**02:00 — Too Seriously**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Too Seriously`
- Description:
```
I'd rather hear the world say,
"He is taking this Jesus thing too seriously"
than to hear
"Depart from me, I never knew you."

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 810 likes on Threads, 2025-11-22

**06:00 — Live By It**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Live By It`
- Description:
```
The Bible isn't just for quoting,
you have to live by it...

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 181 likes on Threads, 2025-11-22

**12:00 — Become A Better Version Of Yourself**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Become A Better Version Of Yourself`
- Description:
```
God.
Go ghost.
Gym.
Small circle.
Make more money.
Accept the past.
Become a better version of yourself.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 124 likes on Threads, 2026-07-06

**16:00 — Stop Trying To Find Yourself**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Stop Trying To Find Yourself`
- Description:
```
Instead of trying to find yourself.
Open up the Bible & find God.
Then you'll truly know who you are.
Your identity is found in God.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 86 likes on Threads, 2025-09-02

**20:00 — Not Your Job**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Not Your Job`
- Description:
```
Your job isn't to change people.
Your job is to tell them about Jesus.
The Holy Spirit handles the rest.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 50 likes on Threads, 2026-07-17


### 2026-08-17

**02:00 — Very Expensive**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Very Expensive`
- Description:
```
The price you pay
for ignoring the Holy Spirit
is very expensive.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 457 likes on Threads, 2025-11-10

**06:00 — The Louder The World Gets**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `The Louder The World Gets`
- Description:
```
The longer I stay away from my Bible,
the louder the world gets.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 153 likes on Threads, 2026-07-06

**12:00 — Offend Your Flesh**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Offend Your Flesh`
- Description:
```
The Bible is supposed
to offend your flesh.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 123 likes on Threads, 2025-11-19

**16:00 — Not By Accident**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Not By Accident`
- Description:
```
You don't accidentally grow closer to God.
You do it by spending time with Him.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 84 likes on Threads, 2026-07-11

**20:00 — Job 8:7**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Job 8:7`
- Description:
```
"And though you started with little,
you will end with much."
- Job 8:7

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 47 likes on Threads, 2025-09-10


### 2026-08-18

**02:00 — If God Had Threads**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `If God Had Threads`
- Description:
```
Proverbs feels like what God would post
if He had a Threads account...

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 294 likes on Threads, 2026-01-16

**06:00 — Kill Your Flesh**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Kill Your Flesh`
- Description:
```
I'm a firm believer that if you are Christian,
you MUST WORKOUT.
Physical discipline is key
in helping to kill your flesh.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 148 likes on Threads, 2025-11-10

**12:00 — Like God Sent You**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Like God Sent You`
- Description:
```
Someone told me,
"Walk into every room like God sent you."
That one sentence changed how I move.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 123 likes on Threads, 2025-11-20

**16:00 — God's Pen**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `God's Pen`
- Description:
```
Don't grab the pen out of God's hand.
The story He writes will always be better
than the one you would've written.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 78 likes on Threads, 2026-07-11

**20:00 — Stop Venting**  
- File: `C:UsersMooreDesktopiblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e	mpshortsout${r.file}`
- Title: `Stop Venting`
- Description:
```
Stop venting to people who can't fix it.
Take it to God.

#Shorts #Bible #Jesus #Faith #BibleStudy
```
- Original post: 47 likes on Threads, 2025-09-02

