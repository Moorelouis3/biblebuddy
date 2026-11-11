/**
 * The five-day welcome funnel — Bucket 1.
 *
 * Approved by Louis on 11 November 2026 and stored here verbatim. This file is
 * the implementation source of truth: the bodies are copied from his approved
 * text, not reconstructed from summaries, and they must not be reworded,
 * trimmed or "improved" without him saying so.
 *
 * HOW IT REPLACES THE OLD WELCOME. There was one transactional email,
 * campaign_id 'welcome', 387 sends since 10 Oct. It is paused, not deleted, and
 * these five take over. Day 1 is NOT the old welcome re-used - Louis asked
 * specifically for the new copy.
 *
 * NEVER TWICE. Each step is its own campaign_id, and email_campaign_sends is
 * keyed (campaign_id, email), so a subscriber cannot receive a step twice -
 * including after unsubscribing and re-subscribing - without someone explicitly
 * deleting the send row. That is the existing mechanism, not a new one.
 *
 * ANDROID LINK. Louis, 11 Nov: "For the missing Google Play URL, do not invent
 * one ... Use the website https://www.mybiblebuddy.net where appropriate until
 * the Android listing is confirmed." So Day 1 points Android readers at the
 * site. No Play Store URL is guessed anywhere.
 *
 * IMAGES. Day 2 needs the approved GIF and Day 3 the study-guides graphic.
 * Both currently exist only as Google Drive viewer links, which are HTML pages
 * and will not render in an email client. Until they are hosted publicly,
 * IMAGE_PENDING marks the spot and `isReadyToSend` returns false for those two
 * steps, so neither can be armed by accident.
 */

export const APP_STORE_URL = "https://apps.apple.com/app/id6822155944";
export const WEBSITE_URL = "https://www.mybiblebuddy.net";

/** Marks a slot that still needs a publicly hosted asset. */
export const IMAGE_PENDING = "__IMAGE_PENDING__";

/**
 * Where the two welcome images live, hosted 11 Nov 2026.
 *
 * Louis sent both as .webp. Neither could be used as supplied: Outlook cannot
 * render webp at all, and a Google Drive viewer link is an HTML page rather
 * than an image. So both were re-encoded and uploaded to post-media/email/,
 * which is where Bible Buddy's email images already live, and both were
 * checked with an unauthenticated request before being wired in.
 *
 * Day 2 is a PNG because it is a flat UI screenshot; Day 3 is a JPEG because
 * it is six photographic covers, and as a PNG it was 864KB against 157KB.
 * Both are 600px wide, the standard email content width.
 */
export const WELCOME_DAY2_IMAGE =
  "https://dntaonyrfdzedukvwcwk.supabase.co/storage/v1/object/public/post-media/email/welcome-day2-study-notes.png";
export const WELCOME_DAY3_IMAGE =
  "https://dntaonyrfdzedukvwcwk.supabase.co/storage/v1/object/public/post-media/email/welcome-day3-study-guides.jpg";

export type WelcomeStep = {
  /** 1-5. Also the order they send in. */
  step: number;
  campaignId: string;
  subject: string;
  /** Plain text body, verbatim from Louis's approved copy. */
  body: string;
  /**
   * What still has to be hosted before this step can send, or null.
   * Non-null means isReadyToSend() is false.
   */
  pendingAsset: { what: string; source: string; placeAfter: string } | null;
};

const DAY_1 = `Hey {{first_name}},

WELCOME TO BIBLE BUDDY! 📖

My name is Louis, and I'm the creator of Bible Buddy!

I really hope you enjoy it.

I originally created Bible Buddy to make studying the Bible easier for myself.

But over time, it turned into something that thousands of other people are now using to help them understand and study God's Word.

And I hope it does the same thing for you!

📱 HAVE YOU DOWNLOADED THE APP YET?

If you haven't already, you can download Bible Buddy here:

🍎 [Download on the App Store](${APP_STORE_URL})
🤖 [Open Bible Buddy on the web](${WEBSITE_URL})

📖 HERE'S HOW BIBLE BUDDY CAN HELP YOU!

📘 BIBLE STUDY NOTES
Understand what you're reading with detailed study notes built right into the Bible chapters.
No more jumping between different websites trying to figure out what a passage means!

📚 BIBLE STUDY GUIDES
Go deeper into God's Word with guided studies that walk you through Scripture one day at a time.

🧠 BIBLE TRIVIA
Test your knowledge with trivia questions covering different Bible chapters, stories, and topics.

💬 COMMUNITY
Connect with other believers, ask questions, share what you're learning, and grow together in God's Word.

That's what Bible Buddy is all about.

Helping you STUDY, UNDERSTAND, and GROW in God's Word!

I hope to see you inside Bible Buddy!

And keep an eye on your inbox because tomorrow I'm going to show you how to use the Bible Study Notes to better understand what you're reading.

God bless,
Louis
Creator of Bible Buddy 🙏🏾`;

const DAY_2 = `Hey {{first_name}},

When I first started studying the Bible, I had EVERYTHING.

📚 Multiple Bible translations
💻 Different Bible study websites
📱 Multiple Bible study apps
🎥 YouTube pastors explaining Scripture
📝 Notebooks, highlighters, and study materials

I was using all of these things just to understand what I was reading.

And Bible study started becoming a whole production!

Imagine if every time you wanted something to eat, you had to cook an entire Thanksgiving dinner.

You just worked 12 hours.

You're tired.

All you want is a sandwich.

But instead, you've got to prepare a five-star meal!

Eventually, you wouldn't even feel like eating! 😂

That's exactly how Bible study started feeling for me.

I wanted to spend time in God's Word, but sometimes the amount of preparation made me not even want to start.

AND THAT'S ONE OF THE REASONS I CREATED BIBLE BUDDY!

I wanted to make studying the Bible easier without losing the depth of understanding Scripture.

📖 INTRODUCING BIBLE STUDY NOTES!

Over the years, I've collected and written study notes to help me understand different passages in the Bible.

And now I've brought those notes into Bible Buddy!

Instead of switching between five different apps and websites, you can read Scripture and explore explanations RIGHT INSIDE THE BIBLE!

Here's how it works:

📖 STEP 1: Open the Bible inside Bible Buddy and navigate to the book and chapter you want to read.
👆🏾 STEP 2: Tap a highlighted verse or phrase to see its study note.
📚 STEP 3: Or turn on STUDY MODE to display all the available study note cards alongside the Bible verses. Tap any card to open the full explanation.

That's it!

No complicated setup. No ten different apps. Just you and God's Word.

👇🏾 TAKE A LOOK!

![Bible Buddy study notes: open the Bible, pick a book, pick a chapter, tap a verse](${WELCOME_DAY2_IMAGE})

[OPEN BIBLE BUDDY](${APP_STORE_URL})

I hope these notes help you understand Scripture the same way they've helped me.

And tomorrow, I'm going to show you another feature that can make studying God's Word even easier: BIBLE STUDY GUIDES! 📚

God bless,
Louis
Creator of Bible Buddy 🙏🏾`;

const DAY_3 = `Hey {{first_name}},

Sometimes having a Bible reading plan can make staying consistent and understanding God's Word a whole lot easier.

Because let's face it.

Sometimes the hardest part of studying the Bible is simply figuring out WHERE TO START!

And that's one of my favorite things to do as a Bible teacher.

I LOVE WRITING BIBLE STUDY GUIDES! 📚

Over the years, I've written different study guides to help people understand Scripture, learn more about God, and grow in their faith.

And the best part?

YOU CAN STUDY ALL OF THEM FOR FREE INSIDE BIBLE BUDDY! 🙌🏾

Right now, we have six different studies available, including:

🌍 THE BEGINNING OF EVERYTHING: A 21-day study through Genesis 1–8, covering creation, Adam and Eve, Cain and Abel, Noah, and the flood.
🔥 THE TEMPTING OF JESUS: A 21-day study of Jesus in the wilderness and how He responded to temptation.
👑 21 WOMEN OF THE BIBLE: A 21-day study exploring the lives of remarkable women in Scripture.
💪🏾 HIGHER HOPE: A 60-day Bible study focused on overcoming addiction through God's Word.
📖 THE WISDOM OF PROVERBS: A 31-day study exploring biblical wisdom and how to apply it to everyday life.
🗓️ BIBLE IN ONE YEAR: A 365-day journey through God's Word.

BUT HERE'S MY FAVORITE PART!

You don't have to do these studies alone.

Bible Buddy lets you participate in a GROUP BIBLE STUDY ON YOUR OWN SCHEDULE!

You can study in the morning.

You can study at night.

You can study whenever you have time.

Each day, you can:

📖 READ the day's Scripture.
📝 LEARN through the daily Bible study lesson.
🧠 TEST what you've learned with trivia questions.
💬 DISCUSS the lesson by answering the daily discussion question alongside other people studying the same material.

And because everyone's answers are shared in the community, you get to see what other people are learning too!

It's a Bible study group that fits YOUR schedule.

📚 FIND YOUR NEXT BIBLE STUDY!

![Six free Bible Buddy study guides](${WELCOME_DAY3_IMAGE})

[EXPLORE THE STUDY GUIDES IN BIBLE BUDDY](${APP_STORE_URL})

I hope you find a study that helps you grow closer to God and understand His Word a little better each day.

And tomorrow, I'm going to show you another way to make Bible study fun while testing what you've learned.

BIBLE TRIVIA! 🧠

God bless,
Louis
Creator of Bible Buddy 🙏🏾`;

const DAY_4 = `Hey {{first_name}},

Let me ask you something.

When you finish reading a chapter of the Bible, how do you know if you actually understood what you just read?

Because there's a BIG difference between reading something and understanding it.

Imagine reading an entire algebra textbook.

You read every chapter.

You finish every page.

But when someone hands you an algebra problem, YOU HAVE NO IDEA HOW TO SOLVE IT! 😂

Sure, you read the book.

BUT DID YOU ACTUALLY LEARN ANYTHING?

And sometimes we do the same thing with the Bible.

We read a chapter, close our Bible, and move on.

But did we understand what happened?

Do we know why it happened?

Could we explain it to somebody else?

HERE'S SOMETHING I WANT YOU TO REMEMBER!

Our task as Christians is not just to READ the Bible.

It's to SHARE the Good Word!

BUT YOU CAN'T SHARE THE GOOD WORD IF YOU DON'T UNDERSTAND GOD'S WORD! 📖

And that's one of the reasons I added Bible trivia to Bible Buddy.

🧠 TRIVIA ISN'T JUST ABOUT GETTING THE RIGHT ANSWER!

It's about checking whether you're actually following and understanding what you're studying.

Inside Bible Buddy, you can:

📖 REVIEW WHAT YOU READ: Answer questions about Bible stories, chapters, and different topics.
🧠 CHECK YOUR UNDERSTANDING: See what you remember and what you might need to study again.
💡 LEARN SOMETHING NEW: Sometimes a question helps you notice something you missed while reading.

And don't worry about getting every question right.

THIS ISN'T A TEST YOU HAVE TO PASS!

It's another tool to help you grow in your understanding of God's Word.

Because the goal isn't just to finish reading the Bible.

THE GOAL IS TO UNDERSTAND WHAT YOU'RE READING!

🎮 READY TO GIVE IT A TRY?

[TRY BIBLE TRIVIA IN BIBLE BUDDY](${APP_STORE_URL})

And tomorrow, I'm going to show you how you can take what you're learning and discuss it with other believers inside Bible Buddy.

God bless,
Louis
Creator of Bible Buddy 🙏🏾`;

const DAY_5 = `Hey {{first_name}},

I want to tell you about one of my favorite parts of Bible Buddy.

THE BIBLE BUDDY COMMUNITY! 🙌🏾

Let me explain why I built it.

I spend a lot of time on social media.

And as a Christian, I try my best to stay on the Christian side of it.

I want to see people talking about Jesus, sharing Scripture, encouraging each other, and growing in their faith.

But you know how social media works.

One minute you're watching a Bible study video.

The next minute you're seeing something that has absolutely nothing to do with God. 😂

And sometimes it doesn't matter how many times you tell the algorithm you're not interested.

IT STILL FINDS ITS WAY BACK!

So I started thinking.

What if we had a place where Christians could come together without all those distractions?

A place where we could share what we're learning from Scripture.

Ask questions.

Encourage one another.

And connect with people who are also trying to grow closer to God.

THAT'S WHY I BUILT THE BIBLE BUDDY FEED! 📖

I wanted to create a place where our conversations could be centered on God's Word.

Where you could finish studying a chapter of the Bible, share what you learned, and hear what another believer took away from that same passage.

Because sometimes somebody else notices something in Scripture that you completely missed!

AND THAT'S ONE OF THE BEAUTIFUL THINGS ABOUT STUDYING THE BIBLE TOGETHER! 🙌🏾

Inside the Bible Buddy community, you can:

📖 SHARE WHAT YOU'RE LEARNING: Post your thoughts, favorite Scriptures, and Bible study insights.
💬 CONNECT WITH OTHER BELIEVERS: Ask questions, join discussions, and learn from one another.
🙏🏾 ENCOURAGE SOMEBODY ELSE: You never know when something you share might be exactly what another Christian needed to hear.

And here's something I've been thinking about.

We all know how easy it is to spend 20 or 30 minutes scrolling through social media.

BUT WHAT IF SOME OF THAT TIME WAS SPENT READING ABOUT JESUS?

Imagine opening your feed and seeing people sharing what God taught them that morning.

Someone asking a question about Genesis.

Another person sharing something they learned about Jesus.

And somebody else encouraging a believer who's having a difficult day.

NOW THAT'S THE KIND OF FEED I WANT TO SCROLL THROUGH! 😂📖

And that's the kind of community I want us to build together.

A place where we can learn from each other, encourage each other, and grow closer to Jesus.

💬 [JOIN THE BIBLE BUDDY COMMUNITY](${APP_STORE_URL})

Come introduce yourself, share something you're learning from Scripture, or join a conversation!

Because studying God's Word is important.

BUT WE WERE NEVER MEANT TO WALK THIS JOURNEY ALONE. ❤️

God bless,
Louis
Creator of Bible Buddy 🙏🏾`;

export const WELCOME_SEQUENCE: WelcomeStep[] = [
  {
    step: 1,
    campaignId: "welcome-1",
    subject: "Welcome to Bible Buddy! 📖",
    body: DAY_1,
    pendingAsset: null,
  },
  {
    step: 2,
    campaignId: "welcome-2",
    subject: "What do you do when you don't understand God's Word? 📖",
    body: DAY_2,
    pendingAsset: null,
  },
  {
    step: 3,
    campaignId: "welcome-3",
    subject: "Sometimes a Plan Makes It Easier 📖",
    body: DAY_3,
    pendingAsset: null,
  },
  {
    step: 4,
    campaignId: "welcome-4",
    subject: "Are You Understanding What You're Reading? 📖",
    body: DAY_4,
    pendingAsset: null,
  },
  {
    step: 5,
    campaignId: "welcome-5",
    subject: "What If Social Media Brought You Closer to God? 🙏🏾",
    body: DAY_5,
    pendingAsset: null,
  },
];

export const WELCOME_CAMPAIGN_IDS = WELCOME_SEQUENCE.map((s) => s.campaignId);
export const FINAL_WELCOME_STEP = WELCOME_SEQUENCE.length;

/** The old single welcome. Paused on 11 Nov; kept so nothing re-arms it by name. */
export const RETIRED_WELCOME_CAMPAIGN_ID = "welcome";

/**
 * A step may only be armed once nothing is still waiting on an asset.
 *
 * Days 2 and 3 carry IMAGE_PENDING in place of an image, and sending that to a
 * subscriber would put a literal placeholder in their inbox. This is the guard
 * that stops it, and it is checked before any arming rather than trusted to
 * whoever runs the script.
 */
export function isReadyToSend(step: WelcomeStep): boolean {
  return step.pendingAsset === null && !step.body.includes(IMAGE_PENDING);
}

export function stepByCampaignId(campaignId: string): WelcomeStep | undefined {
  return WELCOME_SEQUENCE.find((s) => s.campaignId === campaignId);
}
