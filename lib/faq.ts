/**
 * The Bible Buddy FAQ: one list, read by two things (Louis, 2026-11-15).
 *
 *   app/faq/page.tsx               shows every entry, each at /faq#<id>
 *   lib/dmFaq/answer.ts            answers a DM with an entry's `dm` text and
 *                                  a button to /faq#<id>
 *
 * So a fix to an answer here fixes the page and the DM reply together, and
 * the two can never disagree. Add a question here, never in either of those.
 *
 * WHERE THE QUESTIONS CAME FROM: the 233 messages people sent Louis between
 * 18 July and 15 November 2026. Translations came up most ("I like NKJV",
 * "I only see KJV, ASV and WEB"), then getting the phone app, earlier and
 * locked study days, and past Verses of the Day.
 *
 * WRITING RULES. `dm` is Louis talking to one person: first person, warm,
 * short, no headings. `answer` is the same facts for a stranger reading the
 * page. Both must stay TRUE of the app as it is - every fact below was
 * checked in the code on the day it was written, with where:
 *
 *   translations        KJV (default), WEB and ASV only - FullChapterReader,
 *                       ChapterInsightReader, the Bible in One Year reader.
 *                       The reason is Louis's own words, 15 Nov 2026.
 *   change-translation  the button at the top of the Bible reader reads KJV /
 *                       WEB / ASV; in the phone layout's menu the row is
 *                       "Translation".
 *   phone-app           iOS live since 1 Nov 2026 (id 6822155944); Android is
 *                       a closed test, page /android.
 *   locked-day,         app/devotionals/[id]/page.tsx isDayUnlocked: a day you
 *   earlier-days        have been into never closes; the next day opens once
 *                       the day before is read.
 *   past-verses         VerseOfTheDayBreakdown: "View Previous Daily Verses",
 *                       /daily-verses.
 *   delete-account      30-day wait, signing back in cancels (since 3 Nov 2026).
 */

export type FaqEntry = {
  /** The page anchor, /faq#<id>, and what the DM log records. Never rename one in use. */
  id: string;
  question: string;
  /** For the FAQ page. One paragraph per string. */
  answer: string[];
  /**
   * The DM reply, as Louis. Null means this entry is never sent as an
   * automatic reply - the page only.
   */
  dm: string | null;
  /** The button under the DM. Defaults to the FAQ entry itself. */
  dmAction?: { label: string; href: string };
  /** For the classifier: what people write when they mean this. */
  askedAs: string[];
};

export const APP_STORE_URL = "https://apps.apple.com/us/app/bible-buddy-bible-study-help/id6822155944";

export const FAQ: FaqEntry[] = [
  {
    id: "translations",
    question: "Why isn't the NIV, ESV, NKJV or NLT in Bible Buddy?",
    answer: [
      "Most modern translations, like the NIV, ESV, NKJV and NLT, are owned by publishers and have to be licensed and paid for.",
      "I made the decision to keep Bible Buddy 100% free, so we only use translations that are free for everyone: the King James Version (KJV), the World English Bible (WEB) and the American Standard Version (ASV).",
      "The KJV is the version I use in all the Bible studies. If the King James is hard going, switch the Bible reader to the WEB. It is a modern-English translation and much easier to read than the King James.",
    ],
    dm: "I understand how frustrating it is not to have the translation you're used to. Most translations like the NIV, ESV and NKJV are owned by publishers and have to be licensed, and I made the decision to keep Bible Buddy 100% free, so we only have the free ones: King James (KJV), the World English Bible (WEB) and the ASV.\n\nThe King James is the one I use in all the Bible studies. When you're reading the Bible you can switch to WEB, which is modern English and much easier to read than the King James. Tap KJV at the top of the Bible reader to change it.",
    askedAs: [
      "Can I use the NIV?",
      "I like the NKJV, how do I get it?",
      "I only see KJV, ASV and WEB in the drop down",
      "Do you have the ESV or NLT?",
      "Can you add my translation?",
    ],
  },
  {
    id: "change-translation",
    question: "How do I change my Bible translation?",
    answer: [
      "Open any chapter in the Bible tab. At the top of the reader there is a button showing the translation you are on (it starts on KJV). Tap it and choose KJV, WEB or ASV. On a phone it sits in the reader's menu, in the row called Translation.",
      "The Bible studies and the Verse of the Day are written from the King James, so they stay in KJV. The switch changes the Bible text you read.",
    ],
    dm: "In the Bible tab, open any chapter and tap the translation button at the top of the reader (it says KJV to start). You can pick KJV, WEB or ASV. On a phone it's in the reader's menu, in the row called Translation.\n\nThe studies and the Verse of the Day are written from the King James, so those stay KJV. If the King James is hard going, WEB is the easiest of the three to read.",
    askedAs: [
      "How do I change the version of the Bible?",
      "How do I switch to King James?",
      "Can I change the verse of the day to a different version?",
      "Where do I change the translation?",
    ],
  },
  {
    id: "phone-app",
    question: "Is there a Bible Buddy app for my phone?",
    answer: [
      "Yes. On iPhone, Bible Buddy is in the App Store. Search for Bible Buddy, or use the link below.",
      "On Android, the app is in testing on Google Play and is not public yet. You can sign up to test it at mybiblebuddy.net/android. Until it is public, open mybiblebuddy.net in Chrome, tap the three-dot menu and choose Add to Home screen, and it opens like an app.",
      "Your account is the same everywhere. Sign in on the phone with the same method you used on the website and all your progress is there.",
    ],
    dm: "Yes! On iPhone, Bible Buddy is in the App Store: just search for Bible Buddy, or tap the button below.\n\nOn Android the app is still in testing on Google Play, so it isn't public yet. You can sign up to test it at mybiblebuddy.net/android. Until then, open mybiblebuddy.net in Chrome, tap the three dots and choose Add to Home screen and it works just like an app.\n\nSign in with the same method you used before and all your progress comes with you.",
    dmAction: { label: "Get the iPhone app", href: APP_STORE_URL },
    askedAs: [
      "Is there an app to download?",
      "I can't find the app in the Play Store",
      "Is Bible Buddy on the App Store?",
      "How do I put it on my home screen?",
      "How can I save it to my phone?",
    ],
  },
  {
    id: "locked-day",
    question: "Why is a study day locked?",
    answer: [
      "Each day of a study opens once you have read the day before it. Open the earlier day, read it, and close the reading with the close button inside it.",
      "If you close the reading with your phone's back button or a swipe, it may not save that you read it. Open it again and finish with the button inside the reading screen.",
      "A day you have already been into never locks again.",
    ],
    dm: "Each day opens once you've read the day before it. Go back to the earlier day, open the reading, and finish it with the close button inside the reading screen. If you close it with your phone's back button or a swipe, it sometimes doesn't save that you read it.\n\nOnce you've been into a day it never locks again. If a day is still locked after that, tap Report a Problem at the bottom of the page and I'll look at it.",
    askedAs: [
      "Day 9 is locked",
      "It won't let me open day 2",
      "The days are greyed out and I can't click them",
      "How do I unlock the next day?",
    ],
  },
  {
    id: "earlier-days",
    question: "How do I go back to an earlier day of a study?",
    answer: [
      "Open the study from the Library tab or your bookshelf on the Home tab. Every day is listed there, and any day you have already been into stays open for good. Tap it to read it again or finish what you missed.",
    ],
    dm: "Open the study from the Library tab (or your bookshelf on Home). Every day is listed there, and any day you've already been into stays open for good, so you can tap it to read it again or finish anything you missed.",
    askedAs: [
      "How do I go back and view chapter 11 of Proverbs?",
      "Is there a way to see what days I missed?",
      "I can only go forward, not back",
    ],
  },
  {
    id: "past-verses",
    question: "Can I see past Verses of the Day?",
    answer: [
      "Yes. Open the Verse of the Day on the Home tab, tap Read the Breakdown, and at the bottom tap View Previous Daily Verses. You can also bookmark any verse to keep it.",
    ],
    dm: "Yes! Open the Verse of the Day on Home, tap Read the Breakdown, and at the bottom tap View Previous Daily Verses. You can bookmark any of them to keep them.",
    dmAction: { label: "See past verses", href: "/daily-verses" },
    askedAs: [
      "Can I go back to a previous daily word?",
      "Where are the old verses of the day?",
    ],
  },
  {
    id: "is-it-free",
    question: "Is Bible Buddy free?",
    answer: [
      "Yes, completely. Every study, every chapter note, Bible in One Year, the games and the community are free. There is no paid plan and nothing locked behind one.",
    ],
    dm: "Yes, 100% free. Every study, every chapter note, Bible in One Year, the games and the community. There's no paid plan and nothing is locked behind one.",
    askedAs: ["Is it free?", "Do I have to pay?", "How much does it cost?"],
  },
  {
    id: "lost-progress",
    question: "I signed in and my progress is gone. What happened?",
    answer: [
      "Almost always this means you signed in a different way from the first time, so you are in a second, empty account. If you first signed up with Google, sign in with Google; with Apple, use Apple; with an email and password, use that same email.",
      "If it says your email is already registered, that account exists: sign in to it instead of creating a new one. If your progress is still missing, tap Report a Problem and tell me which email you used.",
    ],
    dm: "Almost always this means you signed in a different way from the first time, so you landed in a new, empty account. If you first signed up with Google, sign in with Google; with Apple, use Apple; with an email and password, use that same email.\n\nIf it says your email is already registered, that's your account, so sign in to it instead of making a new one. If your progress still isn't there, tell me which email you used and I'll find it.",
    askedAs: [
      "I logged back in and lost my progress",
      "It says my email is already registered",
      "I can't find my original account",
    ],
  },
  {
    id: "streak",
    question: "My streak looks wrong. How is it counted?",
    answer: [
      "A day counts toward your streak when you finish something in it, such as a study day, a chapter or a Bible in One Year day. Opening the app on its own does not count.",
      "Days are counted on US Eastern time, so if you live elsewhere, late-night study can land on the next day. If your streak is still wrong, tap Report a Problem and I will check it.",
    ],
    dm: null,
    askedAs: ["My streak reset", "My streak is wrong"],
  },
  {
    id: "lil-louis-error",
    question: "Lil Louis says 'Something went wrong'. What do I do?",
    answer: [
      "Wait a minute and ask again. If it keeps happening, tap Report a Problem so I know it is down.",
    ],
    dm: null,
    askedAs: ["Lil Louis isn't working"],
  },
  {
    id: "app-store-review",
    question: "How do I leave a review on the App Store?",
    answer: [
      "Open Bible Buddy's page in the App Store, scroll down to Ratings & Reviews and tap Write a Review. Thank you: reviews are how other people find the app.",
    ],
    dm: "Thank you so much! Open Bible Buddy's page in the App Store (the button below goes straight there), scroll down to Ratings & Reviews and tap Write a Review. Reviews are honestly how other people find the app.",
    dmAction: { label: "Open the App Store", href: APP_STORE_URL },
    askedAs: ["How do I leave a review?", "I tried to leave a review but it doesn't pop up"],
  },
  {
    id: "report-problem",
    question: "How do I report a problem?",
    answer: [
      "At the bottom of every page there is a Report a Problem card. Tap it, say what happened, and it comes straight to me. Most problems are fixed within a day, and you get a message when yours is.",
    ],
    dm: null,
    askedAs: [],
  },
  {
    id: "delete-account",
    question: "How do I delete my account?",
    answer: [
      "Go to Settings and choose Delete account, or visit mybiblebuddy.net/delete-account. Your account is deleted 30 days later. If you change your mind, signing back in during those 30 days cancels it.",
    ],
    dm: null,
    askedAs: [],
  },
];

export function faqEntry(id: string): FaqEntry | undefined {
  return FAQ.find((entry) => entry.id === id);
}

/** The entries that may be sent as an automatic DM reply. */
export function dmAnswerableFaq(): FaqEntry[] {
  return FAQ.filter((entry) => entry.dm !== null);
}
