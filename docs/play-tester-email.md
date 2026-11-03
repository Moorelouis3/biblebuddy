# The Play Store tester email

Ready to send. Louis's wording, 2026-11-03 - the day Google approved the
closed test. Send it as it stands; the notes below are background, not
instructions to rewrite it.

## Background

The app is **on Android already** - it is in closed testing, a stage Google
puts every new Android app through, rather than a sign anything went wrong
with the submission.

Google's bar is **12 testers with the app still installed after 14 unbroken
days.** Not 12 clicks. Twelve is a floor and not a cap, so extra testers are
insurance against the people who install it and delete it on day three, which
is why the email welcomes more.

The two steps cannot be merged: joining the group is what grants permission
to see the test, and the second link is what installs it.

**The red box is load-bearing.** Someone who taps step 2 before step 1 has
gone through is told they are not a tester, which reads like a broken link
rather than a missing step - and the people most likely to get it wrong are
the ones skimming on a phone. Hence Louis's call: "make STEP 1 big and red
or something like do step 1 first please!" The warning sits above both
buttons, in red, with its own border, and step 1's button is red while step
2's is the usual teal.

## Where it lives

- `drafts/play-android-testers.html` - what actually gets sent
- `drafts/play-android-testers.txt` - the plain-text part
- Campaign id `play-android-testers`, created as a draft, audience 5,473
  (the whole list, no tag)

Drive it with `npm run campaign -- status|start|pause play-android-testers`.
A test copy needs `CRON_SECRET` in `.env.local`, which is not there - it only
exists on Vercel - so the proof before sending was a local render rather than
a real test send.

Send to the whole list. Twelve out of several thousand is a low bar.

---

## The email

Hey Bible Buddy Family! 💙

**Exciting news! 🎉 Bible Buddy has officially been approved for Android testing!**

But before we can launch publicly on the Google Play Store, **I need 12 of you to help me!** 🙏

Google requires 12 testers for 14 days before we can apply for public release.

All you need to do is download Bible Buddy, keep it installed, and use it whenever you'd like!

### 📱 Here's how to help!

**✅ Step 1 — Join our testing group**

👉 [JOIN THE GROUP](https://groups.google.com/g/biblebuddy-android-testers)

Click **"Join group."**

**✅ Step 2 — Download Bible Buddy**

👉 [GET BIBLE BUDDY ON ANDROID](https://play.google.com/apps/testing/net.mybiblebuddy.app)

Click **"Become a tester"**, then **"Download it on Google Play."**

That's it! You're officially helping us bring Bible Buddy to Android! 🎉

💙 **If more than 12 of you join, even better!** Every tester helps us get closer to launching.

Thank you for supporting this journey and helping more people grow in God's Word!

God bless,  
**Louis**

---

🍎 **Have an iPhone?** Bible Buddy is already live!

👉 [DOWNLOAD ON THE APP STORE](https://apps.apple.com/app/id6822155944)

---

## What to watch

The tester count is in Play Console under Test and release > Closed testing >
Alpha. The 14 days do not start until 12 people are actually in.

## The links, if they ever need rebuilding

- Testing group: https://groups.google.com/g/biblebuddy-android-testers
- Join the test: https://play.google.com/apps/testing/net.mybiblebuddy.app
- Play listing (testers only until launch): https://play.google.com/store/apps/details?id=net.mybiblebuddy.app
- iOS: https://apps.apple.com/app/id6822155944
