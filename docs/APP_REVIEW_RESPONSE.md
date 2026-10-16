# Reply to App Review — Guideline 2.1, Information Needed

Rejected 2026-10-16 on the first submission. Nothing was wrong with the app:
this is the questionnaire Apple sends to a developer account with no review
history. Five of the six answers are below, ready to paste into both the reply
and the **Notes** field of App Review Information — Apple asks for both, and
having it in Notes means the next submission does not get asked again.

The sixth, the screen recording, is Louis's: it has to be a real capture on a
real phone.

---

## What goes in the Notes field and the reply

```
ABOUT BIBLE BUDDY

Bible Buddy is a free Bible reading app for people who want to read the Bible
and actually understand what they are reading.

The problem it solves: the King James Version is hard to read. The vocabulary
is four hundred years old, and the people, places and customs are left
unexplained. Most Bible apps hand you the text and stop there. Bible Buddy
explains the chapter as you read it - who this person is, what is happening,
what a phrase meant to the people who first heard it - so someone with no
theological training can follow it.

Target audience: adults who want to read the Bible regularly. Christians who
have tried to read it and given up partway, and people exploring Christianity
who need the hard parts explained rather than assumed. The app is in English
and most of its readers are in the United States.

Bible Buddy is free. There is no subscription, no paid tier, no in-app
purchase and no advertising.

HOW TO SET UP AND REACH THE MAIN FEATURES

A demo account is in the Sign-In Information fields of this submission. It is
a real account with reading history in it. Sign in with that email and
password on the welcome screen - "Continue with email" - and the app opens on
the dashboard. No sample files or other setup are needed.

The six tabs along the bottom are the whole app:

- Home - the dashboard: today's reading, streak, and what to do next.
- Bible - the reader. Open any book and chapter. The "Study Mode" switch at
  the top turns on the explanations; tap any underlined phrase to read what it
  means. The play button narrates the chapter aloud.
- Plans - devotionals and the Bible in One Year plan. Open a day to read it,
  listen to it, and mark it complete.
- Games - Bible trivia and a scrambled-verse game.
- Group - the study group feed, where readers post and reply. This is the
  user-generated content in the app. Every post and every profile has a menu
  with Report and Block.
- More - notes, the in-app study assistant, and the invite page.

Account registration is on the welcome screen, through Sign in with Apple,
Google, or an email address and password. Account deletion is in Settings,
reachable from the Home tab: Settings > Delete my account. It removes the
account and its data.

EXTERNAL SERVICES USED

- Supabase - accounts, sign-in, the database and file storage.
- Sign in with Apple, and Google Sign-In - authentication only.
- OpenAI - two things: the in-app study assistant that answers questions about
  a passage, and the spoken narration of chapters and devotionals, which is
  generated with OpenAI's text-to-speech.
- Amazon SES - transactional and newsletter email.
- Vercel - hosting, and anonymous usage analytics.
- Stripe - present in the codebase from the website's earlier subscription,
  which was discontinued. Every upsell and checkout path is switched off
  behind a single flag, and no purchase of any kind can be reached from the
  iOS app.

REGIONAL DIFFERENCES

There are none. Every feature and all content is identical in every region
the app is available in. The app is English only, and the Scripture text is
the same King James Version everywhere. Nothing is gated or varied by country.

REGULATED INDUSTRY AND THIRD-PARTY MATERIAL

Bible Buddy is not in a regulated industry. It is a reading app.

The Scripture text is the King James Version, which is in the public domain
worldwide. Everything else in the app - the chapter explanations, the
devotionals, the study notes, the trivia questions and the narration audio -
is original material we wrote and produced ourselves. No third party's
copyrighted material is used.
```

---

## The screen recording — Louis only

One video, on a real iPhone, starting from the app launching. Apple names
three things it must show, and all three exist in Bible Buddy, so all three
have to be in it:

1. **Registration, login, and account deletion.** Sign out first. Record
   creating a new account with an email address, then signing in. Then
   Settings > Delete my account, and go through with it on a throwaway
   account - Apple checks that deletion is real, not a form that does nothing.
2. **User-generated content, with reporting and blocking.** Open the Group
   tab, post something, then open the menu on a post and show **Report**, and
   on a profile show **Block**. Apple rejects apps whose community features
   have no way to report or block.
3. **Paid content.** Nothing to show - there are no purchases. Say so in the
   reply rather than leaving it unanswered.

Then the ordinary flow: open a chapter, turn on Study Mode, tap a highlighted
phrase, play the audio, open a devotional, open the trivia.

A few minutes is plenty. Upload it to the **Attachment** field in App Review
Information, or reply with a link Apple can open without signing in.
