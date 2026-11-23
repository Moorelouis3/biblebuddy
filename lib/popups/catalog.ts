/**
 * The one list of popups (Louis, 2026-11-13).
 *
 * EVERY popup Bible Buddy shows on its own is an entry here, since
 * 2026-11-15 (Louis: "every pop up needs to be under here and work from this
 * system"). The popup coordinator shows at most one of them per visit. The
 * weekly prayer request and poll, the two new games, Bible Lock and the
 * Beginning of Everything invitation each used to be a component with its
 * own timer; they are entries now. A new popup is a new entry, never a new
 * component with its own trigger.
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
import { getPrayerWeekKey } from "../weeklyFeedPopups";
import { BIRTHDAY_ENDS_AT, BIRTHDAY_HEADLINE, BIRTHDAY_MESSAGE, BIRTHDAY_SHORT_LINE, BIRTHDAY_STARTS_AT } from "../birthday";

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
  | "android_web"
  /**
   * Inside the Bible Buddy app on an iPhone that can run Bible Lock and has
   * not set it up (bibleLockStatus()). Asked of the phone, costs no network.
   */
  | "bible_lock_ready";

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
  | "prayer"
  /** The week's poll: the options themselves, answered in the popup. */
  | "poll"
  /** A study sign-up: the study's own artwork instead of a drawn preview. */
  | "event_signup"
  /** Bible Covers: a little shelf of real cover thumbnails. */
  | "covers"
  /** The first birthday: the party hat and a big 1. */
  | "birthday"
  /** The widget Home: a little grid of widget tiles. */
  | "home_widgets"
  /** Bible Buddy Match: a little board of real tiles over the Garden. */
  | "match";

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
  /**
   * Designed artwork, the look of the Beginning of Everything popup (Louis,
   * 2026-11-14). When it is there the sign-up is drawn with it instead of
   * the plain card: on a wide screen the finished image with a real button
   * over its drawn one, on a phone the picture as a header and real text.
   * Only the look changes; who sees it and what the button does do not.
   */
  poster?: PopupPoster;
};

export type PopupPoster = {
  /** 1200 x 809, words and button drawn in. */
  desktop: string;
  /** Picture only, no words. */
  mobile: string;
  /** Everything the desktop image says, for a screen reader. */
  alt: string;
  /** Where the drawn button is on the desktop image, in percent. */
  button: { left: number; top: number; width: number; height: number };
  /** The title on a phone: white line, then gold line. */
  title: [string, string];
  /** The gold opening words, then the rest of the sentence. */
  lead: [string, string];
  features: { icon: string; title: string; text: string }[];
  verse: string;
  verseRef: string;
  /** The words on the gold button. */
  ctaLabel: string;
};

export type PopupStep = { title: string; detail: string };

/**
 * "Already uses it" signals that live on the device instead of in
 * master_actions (PopupCoordinator sets them). bible_cover_chosen: a Bible
 * Cover or Dark mode is on.
 */
export const LOCAL_POPUP_SIGNALS = ["bible_cover_chosen", "home_customized", "match_played"] as const;
export type LocalPopupSignal = (typeof LOCAL_POPUP_SIGNALS)[number];

export type PopupDefinition = {
  id: string;
  version: number;
  kind: PopupKind;
  /** Higher wins among popups of the same kind that are all eligible. */
  priority: number;
  /**
   * "headline": something Louis wants every Buddy to know about (Louis,
   * 2026-11-21, the Bible Covers launch). It is chosen before anything else
   * that is eligible - timed, tutorial, announcement or ask - and it may go
   * past the three-a-week limit. Every other rule still holds: never while
   * someone is reading, typing or playing, one popup a visit, 20 hours apart,
   * and once closed it comes back at most once, two weeks later.
   */
  level?: "headline";
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
  cta: {
    label: string;
    href: string;
    /** Leaves the site (the App Store). */
    external?: boolean;
    /**
     * Asks for a review instead of going to href: the App Store's write-a-review
     * page in the iPhone app, the Play listing in the Android app, and our own
     * review form (components/FeedbackModal.tsx) on the web.
     */
    review?: boolean;
  };
  /** No "Maybe later" under the button; the corner X still closes it. */
  hideLater?: boolean;
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
  usedWhen: Array<ActionType | LocalPopupSignal>;
  /** Days after signup before this may appear on its own. 0 = at once. */
  minAccountAgeDays: number;
  /** ISO date. After this the popup is never chosen. null = no end. */
  expiresAt: string | null;
  /** ISO date. Before this the popup is never chosen. Absent = already open. */
  startsAt?: string;
  /** Set on a study sign-up. See PopupEventSignup. */
  event?: PopupEventSignup;
  /**
   * Comes round every week. Its version is the week's number (liveCatalog),
   * and a new version is what the rules already treat as "something new":
   * closed or answered this week, it is offered again next week. The
   * coordinator asks /api/popups/weekly-feed for the week's post (and the
   * poll's question) before showing it.
   */
  weekly?: "prayer" | "poll";
  /**
   * Drawn by its own approved design instead of the shared card. Only the
   * drawing: who sees it and what is recorded are the coordinator's.
   */
  custom?: "new_games" | "bible_lock";
  /**
   * This popup ran on its own before it was an entry here, under this same
   * id, and was shown once per person. Anybody with a row from then has seen
   * it and is not shown it again.
   */
  seenBeforeIsFinal?: boolean;
};

const ABRAHAM = getCommunityEvent("obedience-of-abraham");
const BEGINNING = getCommunityEvent("beginning-of-everything");

const WEEK_MS = 7 * 24 * 3_600_000;

/** When a live study's last day has passed and it turns evergreen. */
function communityEventEndsAt(startsAt: string, totalDays: number): string {
  return new Date(Date.parse(startsAt) + totalDays * 24 * 3_600_000).toISOString();
}

export const POPUP_CATALOG: PopupDefinition[] = [
  {
    // The customizable Home (Louis, 2026-11-21: "we also need pop up for the
    // dashboard widgets"). The button opens Home straight in edit mode
    // (HomeScreen reads ?edit=1). Anyone who has already arranged their Home
    // has found it and is never told (home_customized, set on the device by
    // PopupCoordinator from lib/homeLayoutStore's saved copy).
    id: "home_widgets_2026_11",
    version: 1,
    kind: "announcement",
    priority: 90,
    sections: [],
    pill: "New in Bible Buddy",
    headline: "Make Home yours.",
    headlineAccent: "yours.",
    description: "Pin the study guides you are doing, ask Lil Louis from Home, move or remove anything you never use.",
    cardTitle: "Your Home, your widgets",
    cardLine: "Add, move, resize and remove what is on Home.",
    cardIcon: "🧩",
    preview: "home_widgets",
    steps: [
      { title: "Tap Edit Home, or press and hold a widget", detail: "Everything on Home starts to wiggle." },
      { title: "Drag to move, tap − to remove", detail: "Removing a widget never deletes your progress or notes." },
      { title: "Add Widget, then Study Guide", detail: "Pin any study you like, as many as you want." },
    ],
    cta: { label: "Edit my Home", href: "/dashboard?edit=1" },
    ctaInSection: "Edit my Home",
    footnote: "Find this again in Tips",
    usedWhen: ["home_customized"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  {
    // Bible Buddy's first birthday (Louis, 2026-11-21). Shown only inside the
    // window in lib/birthday.ts, the same one that puts the party hat on the
    // header, so the two start and stop together. A headline, so it is the
    // first thing a Buddy sees on their next visit; priority above the Bible
    // Covers headline, which then follows on a later visit.
    id: "bible_buddy_birthday_2026",
    version: 1,
    kind: "announcement",
    level: "headline",
    priority: 96,
    sections: [],
    pill: "One year together",
    headline: BIRTHDAY_HEADLINE,
    headlineAccent: "turns 1! 🎉",
    description: BIRTHDAY_MESSAGE,
    cardTitle: "One year in God’s Word",
    cardLine: BIRTHDAY_SHORT_LINE,
    cardIcon: "🎉",
    preview: "birthday",
    steps: [],
    // Louis, 2026-11-21: the birthday "should lead them to leave a review".
    cta: { label: "Leave us a review ⭐", href: "/dashboard", review: true },
    ctaInSection: "Leave us a review ⭐",
    hideLater: true,
    footnote: "Thank you for being here",
    usedWhen: [],
    minAccountAgeDays: 0,
    startsAt: BIRTHDAY_STARTS_AT,
    expiresAt: BIRTHDAY_ENDS_AT,
  },
  {
    // Headline (2026-11-21): Bible Covers launch to everyone.
    id: "bible_covers_2026_11",
    version: 1,
    kind: "announcement",
    level: "headline",
    priority: 95,
    sections: ["/settings"],
    pill: "New in Bible Buddy",
    headline: "Pick the Bible you carry.",
    headlineAccent: "you carry.",
    description:
      "Covers dress every page of Bible Buddy: snowy Winter Cabin, Midnight Garden with fireflies, nine more. Or go Dark.",
    cardTitle: "Bible Covers",
    cardLine: "Eleven covers, plus Light and Dark.",
    cardIcon: "📖",
    preview: "covers",
    steps: [
      { title: "Open Settings, then Bible cover", detail: "Every cover is on one shelf, with how many Buddies use it." },
      { title: "Tap the Bible you like", detail: "Your whole app changes at once, and follows you to your other devices." },
      { title: "Turn the effect off any time", detail: "Snow, fireflies and the rest have their own switch." },
    ],
    cta: { label: "Choose my cover", href: "/settings?open=cover" },
    ctaInSection: "Got it",
    footnote: "Find this again in Tips",
    // Not a master_actions row: the coordinator sets it on the device when a
    // cover is on (PopupCoordinator LOCAL_SIGNALS), so a Buddy who already
    // picked one is never told about covers.
    usedWhen: ["bible_cover_chosen"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
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
    cardLine: "Any book or chapter, Easy, Medium or Hard.",
    cardIcon: "🎯",
    preview: "trivia",
    steps: [
      { title: "Review what you read", detail: "Answer questions on the chapter you just finished." },
      { title: "Check your understanding", detail: "See what you remember and what to read again." },
      { title: "Learn something new", detail: "A question can show you something you missed." },
    ],
    cta: { label: "Play Bible Trivia", href: "/bible-study-games/clue" },
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
      // Louis's artwork, 2026-11-14. The desktop image does not say when the
      // study starts, so the phone's first point and the alt text do.
      poster: {
        desktop: "/events/abraham-popup-desktop.webp",
        mobile: "/events/abraham-popup-mobile.webp",
        alt: "The Obedience of Abraham: a free 30-day community study starting December 1st. Follow the journey of Abraham, a study on faith, obedience and what it means to trust God, even when the path is unclear. Study together with Bible Buddies around the world, with daily discussion. Sign up for the free study.",
        button: { left: 3.3, top: 86, width: 93.5, height: 8 },
        title: ["The Obedience", "of Abraham"],
        lead: [
          "Follow the journey of Abraham.",
          "A 30-day study on faith, obedience and what it means to trust God, even when the path is unclear.",
        ],
        features: [
          { icon: "📅", title: "30 Days", text: "Starts December 1st" },
          { icon: "👥", title: "Study Together", text: "With Bible Buddies around the world" },
          { icon: "💬", title: "Daily Discussion", text: "Share insights, ask questions" },
          { icon: "📈", title: "Grow in Faith", text: "Learn to trust and obey God more completely" },
        ],
        verse: "By faith Abraham obeyed when he was called to go out to a place he would later receive as his inheritance.",
        verseRef: "Hebrews 11:8",
        ctaLabel: "Sign up for the free study",
      },
    },
  },
  // The Beginning of Everything invitation (2026-10-25). Its own component
  // until 2026-11-15; same id, so the 486 people it was already shown to are
  // not asked again. It stops when the live study's last day has passed.
  // Lower than Abraham: somebody new is offered the next study first.
  {
    id: "beginning_of_everything_2026",
    version: 1,
    kind: "announcement",
    priority: 90,
    sections: ["/events"],
    pill: "Live now · Community study",
    headline: "The Beginning of Everything",
    headlineAccent: "Everything",
    description: "Start at the start. A 21-day study of Genesis 1-8, explained one day at a time.",
    cardTitle: "21-Day Bible Study",
    cardLine: "Genesis 1-8, one day at a time",
    cardIcon: "🌍",
    preview: "event_signup",
    steps: [],
    cta: { label: "Start the free study", href: "/events/beginning-of-everything" },
    ctaInSection: "Start the free study",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: BEGINNING ? communityEventEndsAt(communityEventStartsAt(BEGINNING), BEGINNING.totalDays) : "2026-11-28T23:00:00.000Z",
    seenBeforeIsFinal: true,
    event: {
      slug: "beginning-of-everything",
      art: BEGINNING?.heroBanner || "/events/beginning-of-everything-hero.webp",
      facts: ["21-Day Bible Study", "Genesis 1-8"],
      bullets: ["📖 One reading each day", "👥 Study together", "💬 Daily discussion", "❤️ 100% FREE!"],
      doneTitle: "You're in!",
      doneLine: "The Beginning of Everything is open. Start with Day 1.",
      poster: {
        desktop: "/events/beginning-popup-desktop.webp",
        mobile: "/events/beginning-popup-mobile.webp",
        alt: "The Beginning of Everything: a free 21-day study of Genesis 1-8. One reading each day, study together with Bible Buddies around the world, daily discussion. Start the free study.",
        button: { left: 2.9, top: 89.3, width: 94.4, height: 8.7 },
        title: ["The Beginning", "of Everything"],
        lead: [
          "Start at the start.",
          "A 21-day study of Genesis 1-8 - creation, the fall, Cain and Abel, Noah and the flood - explained one day at a time.",
        ],
        features: [
          { icon: "📅", title: "21 Days", text: "One reading each day" },
          { icon: "👥", title: "Study Together", text: "With Bible Buddies around the world" },
          { icon: "💬", title: "Daily Discussion", text: "Share insights, ask questions" },
          { icon: "📈", title: "Understand It", text: "Not just read it" },
        ],
        verse: "In the beginning God created the heaven and the earth.",
        verseRef: "Genesis 1:1",
        ctaLabel: "Start the free study",
      },
    },
  },
  // Bible Lock (2026-11-13). Its own component until 2026-11-15. Only a phone
  // that can run the lock and has not set it up (device below).
  {
    id: "bible_lock_2026_11",
    version: 1,
    kind: "announcement",
    priority: 70,
    sections: ["/bible-lock", "/settings"],
    pill: "New in Bible Buddy",
    headline: "Bible first. Apps after.",
    headlineAccent: "Apps after.",
    description: "Lock the apps you choose until today's Bible Buddy task is done.",
    cardTitle: "Bible Lock",
    cardLine: "You choose the apps. One task unlocks them.",
    cardIcon: "🔒",
    preview: "reader",
    steps: [],
    cta: { label: "Set it up", href: "/bible-lock" },
    ctaInSection: "Got it",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    device: "bible_lock_ready",
    custom: "bible_lock",
    seenBeforeIsFinal: true,
  },
  // Bible Buddy Match (Louis, 2026-11-22: "add this popup to get people
  // playing it"). A headline: chosen before anything else that is eligible.
  {
    id: "bible_buddy_match_2026_11",
    version: 1,
    kind: "announcement",
    priority: 70,
    level: "headline",
    sections: ["/bible-study-games/match"],
    pill: "New in Bible Buddy",
    headline: "Bible Buddy Match",
    headlineAccent: "Match",
    description: "Match your way through Genesis.",
    cardTitle: "Bible Buddy Match",
    cardLine: "Swap tiles, clear each board, and walk the Bible story from Creation.",
    cardIcon: "💎",
    preview: "match",
    steps: [],
    cta: { label: "Play Bible Buddy Match →", href: "/bible-study-games/match?from=popup" },
    ctaInSection: "Got it",
    footnote: "",
    // Somebody who has played it on this device is never told about it.
    usedWhen: ["match_played"],
    minAccountAgeDays: 0,
    expiresAt: null,
  },
  // The two new games (2026-11-13). Its own component until 2026-11-15.
  {
    id: "new_games_2026_11",
    version: 1,
    kind: "announcement",
    priority: 60,
    sections: ["/bible-study-games", "/bible-trivia"],
    pill: "New in Bible Buddy",
    headline: "Make Scripture stick.",
    headlineAccent: "stick.",
    description: "Two new games. More ways to grow.",
    cardTitle: "2 New Game Modes",
    cardLine: "Bible Memory and Bible Word Search.",
    cardIcon: "🎮",
    preview: "memory",
    steps: [],
    cta: { label: "Open Games", href: "/bible-study-games" },
    ctaInSection: "Got it",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    custom: "new_games",
    seenBeforeIsFinal: true,
  },
  // The weekly prayer request and the weekly poll (2026-10-18). One component
  // of their own (WeeklyFeedPopup) until 2026-11-15, in a different look;
  // they are the shared card now. Below the tutorials and the dated things on
  // purpose: they come round every week, so they can wait their turn.
  {
    id: "weekly_prayer",
    version: 1,
    kind: "announcement",
    priority: 25,
    sections: ["/bb-feed"],
    pill: "This week",
    headline: "What can we pray for this week?",
    headlineAccent: "this week?",
    description: "Add it under this week's prayer post and the Bible Buddy community prays with you.",
    cardTitle: "Prayer requests",
    cardLine: "Be as specific as you need, or just say please pray for me.",
    cardIcon: "🙏",
    preview: "prayer",
    steps: [],
    cta: { label: "Add your prayer request", href: "/bb-feed" },
    ctaInSection: "Got it",
    footnote: "100% FREE • On the feed",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    weekly: "prayer",
  },
  {
    id: "weekly_poll",
    version: 1,
    kind: "announcement",
    priority: 24,
    sections: ["/bb-feed"],
    pill: "This week's poll",
    // The week's own question replaces these when it is shown.
    headline: "This week's question.",
    headlineAccent: "question.",
    description: "One tap to answer, then see what everyone else said.",
    cardTitle: "Weekly poll",
    cardLine: "A new question every Wednesday.",
    cardIcon: "📊",
    preview: "poll",
    steps: [],
    cta: { label: "See what everyone said", href: "/bb-feed" },
    ctaInSection: "Got it",
    footnote: "",
    usedWhen: [],
    minAccountAgeDays: 0,
    expiresAt: null,
    weekly: "poll",
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
    cardTitle: "Get the app",
    cardLine: "Bible Buddy, on your Android phone.",
    cardIcon: "🤖",
    preview: "android_beta",
    steps: [],
    // Louis, 2026-11-14: "I want it to say Download on Play Store, not talk
    // about the 2 steps". Since 2026-11-22 the app is public on Play, so it
    // goes straight to the listing (lib/androidBeta.ts PLAY_LISTING_URL).
    cta: { label: "Download on the Play Store", href: "https://play.google.com/store/apps/details?id=net.mybiblebuddy.app", external: true },
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
export const TIPS_CATALOG = POPUP_CATALOG.filter((popup) => popup.kind !== "ask" && !popup.event && !popup.weekly && !popup.custom);

/**
 * The list as it stands this week: a weekly popup's version is its week's
 * number, so it is "new" once a week and never twice in one. Prayer weeks run
 * Sunday to Sunday, poll weeks Wednesday to Wednesday - the weeks their posts
 * already run on (lib/weeklyFeedPopups.ts, lib/groupWeeklyPoll.ts).
 */
/**
 * The Wednesday on or before this date, UTC: getPollWeekStart() in
 * lib/groupWeeklyPoll.ts, repeated here because that file brings the whole
 * 52-question bank with it and this list is loaded on every page.
 */
function pollWeekStart(date: Date): number {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  utc.setUTCDate(utc.getUTCDate() - ((utc.getUTCDay() + 4) % 7));
  return utc.getTime();
}

export function liveCatalog(now: Date): PopupDefinition[] {
  return POPUP_CATALOG.map((popup) => {
    if (!popup.weekly) return popup;
    const start = popup.weekly === "poll" ? pollWeekStart(now) : Date.parse(`${getPrayerWeekKey(now)}T00:00:00Z`);
    return { ...popup, version: Math.floor(start / WEEK_MS) };
  });
}

export function findPopup(id: string): PopupDefinition | null {
  return POPUP_CATALOG.find((popup) => popup.id === id) ?? null;
}

export function inSection(popup: PopupDefinition, pathname: string | null): boolean {
  if (!pathname) return false;
  return popup.sections.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(`${prefix}?`));
}
