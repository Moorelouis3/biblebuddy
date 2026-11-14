/**
 * The one list of educational popups (Louis, 2026-11-13).
 *
 * PROPOSAL / PREVIEW. Nothing here is shown to anybody automatically yet.
 * The only thing that reads this file today is the /tips page, where a
 * signed-in person can open a tutorial by hand, and scripts/verify-popups.ts.
 * The existing popups (NewGamesPopup, BibleLockPopup, the study popups, the
 * store asks) still run on their own triggers and are untouched. See
 * docs/POPUP_SYSTEM_PROPOSAL.md for the plan to bring them under this list.
 *
 * Why a list. Every popup so far has been its own component with its own
 * timer, and what a person saw was decided by which network call came back
 * first. With one list, lib/popups/decide.ts can look at all of them and pick
 * at most one.
 *
 * What may be written here. Only what the feature does today. The reader and
 * study wording is taken from the approved welcome emails
 * (lib/email/welcomeSequence.ts, days 2 and 3); the rest was checked against
 * the screens themselves. If a feature changes, change the words with it.
 *
 * `version` is the content version. Fixing a comma or redrawing the picture
 * does NOT change it. Raise it only when there is something new worth telling
 * a person who has already seen the popup - that is the one thing that makes
 * it eligible to appear again.
 */

import type { ActionType } from "../actionTypes";
import { communityEventStartsAt, getCommunityEvent } from "../communityEvents";

export type PopupKind =
  /** Teaches a feature. Shown only in the section where it can be used. */
  | "tutorial"
  /** Tells people about something new or something they have not found. */
  | "announcement"
  /** Asks for something (get the app). Lowest rank: it waits for the others. */
  | "ask";

/** Where a popup can physically work. Absent = everywhere. */
export type PopupDevice =
  /** An iPhone or iPad in a browser: not the app, not a home-screen shortcut. */
  | "ios_web"
  /** An Android phone in a browser, same exclusions. */
  | "android_web";

export type PopupPreview =
  | "reader"
  | "feed"
  | "memory"
  | "word_search"
  | "study_day"
  | "trivia"
  | "verse_of_the_day"
  | "app_store"
  | "android_beta"
  /** A study sign-up: the study's own artwork instead of a drawn preview. */
  | "event_signup";

/**
 * Makes a popup a sign-up for a community study (lib/communityEvents.ts).
 *
 * The button registers the person there and then, with the same
 * joinCommunityEvent() the study's own page uses, instead of going somewhere.
 * Members of the study never see it. Everything else - who is eligible, the
 * one-per-visit and weekly limits, what closing it does - is the ordinary
 * rules in decide.ts; this adds no rules of its own.
 */
export type PopupEventSignup = {
  /** CommunityEvent.slug. */
  slug: string;
  /** Approved artwork, shown whole across the top. */
  art: string;
  /** The two lines under the title. */
  facts: [string, string];
  /** Emoji included, one per line. */
  bullets: string[];
  doneTitle: string;
  doneLine: string;
};

export type PopupStep = { title: string; detail: string };

export type PopupDefinition = {
  id: string;
  version: number;
  kind: PopupKind;
  /** Higher wins among popups of the same kind that are all eligible. */
  priority: number;
  /**
   * Path prefixes. A tutorial appears only on these. An announcement appears
   * anywhere EXCEPT these (somebody already there has found the feature).
   */
  sections: string[];
  /** Small label in the pill. */
  pill: string;
  headline: string;
  /** The last word or two of the headline, underlined. Must end the headline. */
  headlineAccent: string;
  description: string;
  cardTitle: string;
  cardLine: string;
  cardIcon: string;
  preview: PopupPreview;
  steps: PopupStep[];
  /** Button when the person is somewhere else: goes to the feature. */
  cta: { label: string; href: string; /** Leaves the site (the App Store). */ external?: boolean };
  /** Only shown on this kind of device. */
  device?: PopupDevice;
  /** Offer "Don't show this again". For asks, never for tutorials. */
  offerNeverAgain?: boolean;
  /** Button when the person is already in the section: just closes. */
  ctaInSection: string;
  footnote: string;
  /**
   * Doing any of these means the person already uses the feature, so they
   * are never taught it. Also what counts as "adopted" in reporting.
   */
  usedWhen: ActionType[];
  /** Days after signup before this may appear on its own. 0 = at once. */
  minAccountAgeDays: number;
  /** ISO date. After this the popup is never chosen. null = no end. */
  expiresAt: string | null;
  /** Set on a study sign-up. See PopupEventSignup. */
  event?: PopupEventSignup;
};

const ABRAHAM = getCommunityEvent("obedience-of-abraham");

export const POPUP_CATALOG: PopupDefinition[] = [
  {
    id: "tutorial_reader_study_notes",
    version: 1,
    kind: "tutorial",
    priority: 90,
    sections: ["/reading", "/bible"],
    pill: "How it works",
    headline: "Tap a highlighted word.",
    headlineAccent: "word.",
    description: "Study notes are built right into the chapter, so you never have to leave the page to understand it.",
    cardTitle: "Bible Study Notes",
    cardLine: "Read Scripture and its explanation in one place.",
    cardIcon: "📖",
    preview: "reader",
    steps: [
      { title: "Open a chapter", detail: "Pick a book, then the chapter you want to read." },
      { title: "Tap a highlighted verse or phrase", detail: "Its study note opens right there." },
      { title: "Or turn on Study Mode", detail: "Every note card is listed under its verse. Tap any card to open it." },
    ],
    cta: { label: "Open the Bible", href: "/reading" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["study_notes_viewed", "study_notes_section_opened", "chapter_notes_viewed", "chapter_notes_reviewed"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    id: "tutorial_study_day",
    version: 1,
    kind: "tutorial",
    priority: 80,
    sections: ["/devotionals", "/bible-studies"],
    pill: "How it works",
    headline: "One day at a time.",
    headlineAccent: "a time.",
    description: "Each study walks you through Scripture a day at a time, and you can do it whenever you have time.",
    cardTitle: "Bible Study Guides",
    cardLine: "Every day has the same four parts.",
    cardIcon: "📚",
    preview: "study_day",
    steps: [
      { title: "Read", detail: "The day's Scripture." },
      { title: "Learn", detail: "The daily Bible study lesson." },
      { title: "Test", detail: "Trivia questions on what you just read." },
      { title: "Discuss", detail: "Answer the day's question and see what others said." },
    ],
    cta: { label: "Browse the studies", href: "/plan?view=bible_studies" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["devotional_day_completed"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    id: "tutorial_bible_memory",
    version: 1,
    kind: "tutorial",
    priority: 70,
    sections: ["/bible-study-games/memory"],
    pill: "How it works",
    headline: "Save a verse. Then practise it.",
    headlineAccent: "practise it.",
    description: "Bible Memory turns a verse you care about into short rounds you can play until you know it.",
    cardTitle: "Bible Memory",
    cardLine: "Three kinds of question, one verse at a time.",
    cardIcon: "🧠",
    preview: "memory",
    steps: [
      { title: "Add a verse", detail: "Tap a verse here, or tap Memorize on the Verse of the Day." },
      { title: "Practise it", detail: "Fill in the missing word, put the words in order, match the reference." },
      { title: "Come back to it", detail: "A verse moves from New to Practising to Ready for review." },
    ],
    cta: { label: "Open Bible Memory", href: "/bible-study-games/memory" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["bible_memory_session_completed"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    id: "tutorial_word_search",
    version: 1,
    kind: "tutorial",
    priority: 60,
    sections: ["/bible-study-games/word-search"],
    pill: "How it works",
    headline: "Pick a book. Find its words.",
    headlineAccent: "its words.",
    description: "Every book of the Bible has its own puzzle, built from words that matter in that book.",
    cardTitle: "Bible Word Search",
    cardLine: "66 books, one puzzle each.",
    cardIcon: "🔎",
    preview: "word_search",
    steps: [
      { title: "Choose a book", detail: "Any of the 66." },
      { title: "Drag across the letters", detail: "Words run across, down and diagonally." },
      { title: "Read what you found", detail: "Each word shows what it means and the verse it comes from." },
    ],
    cta: { label: "Open Word Search", href: "/bible-study-games/word-search" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["word_search_book_completed"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    id: "tutorial_trivia",
    version: 1,
    kind: "tutorial",
    priority: 50,
    sections: ["/bible-trivia"],
    pill: "How it works",
    headline: "Did it stick?",
    headlineAccent: "stick?",
    description: "Trivia is a quick way to check you followed what you read. It is not a test you have to pass.",
    cardTitle: "Bible Trivia",
    cardLine: "Questions on Bible stories, chapters and topics.",
    cardIcon: "🎯",
    preview: "trivia",
    steps: [
      { title: "Review what you read", detail: "Answer questions on the chapter you just finished." },
      { title: "Check your understanding", detail: "See what you remember and what to read again." },
      { title: "Learn something new", detail: "A question can show you something you missed." },
    ],
    cta: { label: "Play Bible Trivia", href: "/bible-trivia" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["trivia_chapter_completed"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    id: "discover_feed",
    version: 1,
    kind: "announcement",
    priority: 40,
    sections: ["/bb-feed"],
    pill: "Have you seen this?",
    headline: "A feed that stays on the Bible.",
    headlineAccent: "the Bible.",
    description: "The Bible Buddy feed is where people share what they are learning, with none of the usual distractions.",
    cardTitle: "The Community Feed",
    cardLine: "Other believers, studying the same Word.",
    cardIcon: "💬",
    preview: "feed",
    steps: [
      { title: "Share what you are learning", detail: "Post a thought, a prayer, a photo or a video." },
      { title: "Ask for prayer", detail: "Add a prayer request, and comment on someone else's." },
      { title: "Join the conversation", detail: "Like, comment and answer the weekly poll." },
    ],
    cta: { label: "Open the feed", href: "/bb-feed" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["feed_post_thought", "feed_post_prayer", "feed_post_prayer_request", "feed_post_photo"],
    minAccountAgeDays: 3,
    expiresAt: null,
  },
  {
    id: "discover_verse_of_the_day",
    version: 1,
    kind: "announcement",
    priority: 30,
    sections: [],
    pill: "Have you seen this?",
    headline: "One verse, explained every day.",
    headlineAccent: "every day.",
    description: "The Verse of the Day on your home screen comes with a short breakdown of what it means.",
    cardTitle: "Verse of the Day",
    cardLine: "A new verse each morning.",
    cardIcon: "☀️",
    preview: "verse_of_the_day",
    steps: [
      { title: "Read the breakdown", detail: "A plain explanation of today's verse." },
      { title: "Tap Memorize", detail: "It is saved to Bible Memory so you can practise it." },
    ],
    cta: { label: "See today's verse", href: "/dashboard" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    usedWhen: ["understand_verse_of_the_day"],
    minAccountAgeDays: 3,
    expiresAt: null,
  },
  // Sign-up for the next live study (Louis, 2026-11-14). It ends by itself
  // when the study starts: expiresAt is the event's own start, read from
  // lib/communityEvents.ts, so moving the date there moves this with it.
  // popup_settings.expires_at overrides it without a build. Because it has an
  // end date, the ordinary rule in decide.ts puts it ahead of things that can
  // wait - that is the whole of its "priority"; it has no special treatment.
  {
    id: "signup_obedience_of_abraham",
    version: 1,
    kind: "announcement",
    priority: 100,
    // Somebody on the study's own page has found it.
    sections: ["/events"],
    pill: "Coming next · Live Bible study",
    headline: "The Obedience of Abraham",
    headlineAccent: "Abraham",
    description: "Join us as we study the life of Abraham and discover what it means to trust and obey God.",
    cardTitle: "30-Day Bible Study",
    cardLine: "Starts December 1st",
    cardIcon: "📖",
    preview: "event_signup",
    steps: [],
    cta: { label: "Sign Me Up", href: "/events/obedience-of-abraham" },
    ctaInSection: "Sign Me Up",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: ABRAHAM ? communityEventStartsAt(ABRAHAM) : "2026-11-30T23:00:00.000Z",
    event: {
      slug: "obedience-of-abraham",
      art: ABRAHAM?.heroBanner || "/events/obedience-of-abraham-hero.webp",
      facts: ["30-Day Bible Study", "Starts December 1st"],
      bullets: [
        "📖 Daily Bible study",
        "🙏 Guided devotionals",
        "🤔 Reflection questions",
        "💬 Study together as a community",
        "❤️ 100% FREE!",
      ],
      doneTitle: "You're signed up!",
      doneLine: "The Obedience of Abraham starts December 1st. Day 1 opens that morning.",
    },
  },
  // The two store asks. Until 13 Nov 2026 these were AppStorePopup and
  // AndroidBetaPopup, which checked nothing, sat above every other popup and
  // reopened on every page load. The words are theirs; the limits are now
  // everybody's. They stand down when the coordinator is on (lib/popups/switch).
  {
    id: "ask_app_store",
    version: 1,
    kind: "ask",
    priority: 20,
    sections: [],
    pill: "For your iPhone",
    headline: "Get the Bible Buddy app.",
    headlineAccent: "app.",
    description: "You're on an iPhone. The real app is free and opens straight to today's reading.",
    cardTitle: "Get the app",
    cardLine: "Bible Buddy, on your home screen.",
    cardIcon: "📱",
    preview: "app_store",
    steps: [],
    cta: { label: "Download on the App Store", href: "https://apps.apple.com/app/id6822155944", external: true },
    ctaInSection: "Download on the App Store",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    device: "ios_web",
    offerNeverAgain: true,
  },
  {
    id: "ask_android_beta",
    version: 1,
    kind: "ask",
    priority: 20,
    sections: [],
    pill: "For your Android",
    headline: "Get Bible Buddy on Android.",
    headlineAccent: "Android.",
    description: "You're on Android. The real app is free and opens straight to today's reading.",
    cardTitle: "Help us launch",
    cardLine: "You're on Android. Would you be one of them?",
    cardIcon: "🤖",
    preview: "android_beta",
    steps: [],
    // Louis, 2026-11-14: "I want it to say Download on Play Store, not talk
    // about the 2 steps". The steps are on the page it opens (/android).
    cta: { label: "Download on the Play Store", href: "/android" },
    ctaInSection: "Download on the Play Store",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    device: "android_web",
    offerNeverAgain: true,
  },
];

/** What /tips lists: things worth reopening by hand. An ask is not one, nor is a sign-up with a date. */
export const TIPS_CATALOG = POPUP_CATALOG.filter((popup) => popup.kind !== "ask" && !popup.event);

export function findPopup(id: string): PopupDefinition | null {
  return POPUP_CATALOG.find((popup) => popup.id === id) ?? null;
}

export function inSection(popup: PopupDefinition, pathname: string | null): boolean {
  if (!pathname) return false;
  return popup.sections.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(`${prefix}?`));
}
