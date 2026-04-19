import type { FeatureTourKey } from "./featureTours";

export type LouisGuideId =
  | "dashboard"
  | "bible_books"
  | "bible_reader"
  | "bible_trivia"
  | "bible_buddy_tv"
  | "devotionals";

export type LouisPageGuide = {
  id: LouisGuideId;
  featureKey: FeatureTourKey;
  title: string;
  intro?: string;
  ask: string;
  prompt?: string;
  chatStarter: string;
  bullets: string[];
};

const DASHBOARD_GUIDE: LouisPageGuide = {
  id: "dashboard",
  featureKey: "dashboard",
  title: "This is your dashboard",
  intro: "This is your home. This is your main page in Bible Buddy. This is where you can access everything inside the app.",
  ask: "You want me to show you how the dashboard works and where each card takes you?",
  prompt: "You want me to show you how the dashboard works and where each card takes you?",
  chatStarter:
    "We're on your dashboard right now. This is where you can access everything inside Bible Buddy. I can show you what each card does, where to start, or what your next step should be today.",
  bullets: [
    "🏆 **YOUR LEVEL CARD**\nThis lets you know what level you are on Bible Buddy. Everything you do inside the app gives you points, and those points help you level up.",
    "📖 **THE BIBLE**\nThis is your full Bible reader where you can read Scripture, highlight verses, save progress, and interact with the Word of God.",
    "👥 **BIBLE STUDY GROUP**\nThis is where you interact with other Bible Buddies inside the app. We study the Bible together through weekly series and daily conversation.",
    "🛠️ **BIBLE STUDY TOOLS**\nThis is where you can access devotionals, reading plans, and the deeper study side of Bible Buddy, including people, places, and keyword tools.",
    "📺 **BIBLE BUDDY TV**\nThis is where you can stream Bible shows, movies, sermons, documentaries, animation, and more.",
    "🎮 **BIBLE STUDY GAMES**\nThis is where you can play Bible-based games like trivia and Scrabble-style challenges to help lock in what you're learning.",
    "🤝 **SHARE BIBLE BUDDY**\nDo you know somebody else who would like to be a Bible Buddy too? Tap that card and send them the app.",
    "👉 **JUST CLICK ONE OF THE CARDS TO START.**",
  ],
};

const BIBLE_BOOKS_GUIDE: LouisPageGuide = {
  id: "bible_books",
  featureKey: "bible",
  title: "This is the Bible reader",
  intro: "This is where you move through the books of the Bible inside Bible Buddy.",
  ask: "You want me to show you how to move around the Bible reader and pick a book?",
  prompt: "You want me to show you how to move around the Bible reader and pick a book?",
  chatStarter:
    "We're on the Bible books page right now. I can help you find where to start, explain how the books are organized, or help you pick your next book.",
  bullets: [
    "Click any book to open it and move into its chapters, use the reader to track your progress, and ask me if you want help choosing where to start.",
  ],
};

const BIBLE_READER_GUIDE: LouisPageGuide = {
  id: "bible_reader",
  featureKey: "bible",
  title: "This is the Bible reader",
  intro: "This chapter page is where reading and study tools come together.",
  ask: "You want the quick breakdown of how this chapter page works?",
  prompt: "You want the quick breakdown of how this chapter page works?",
  chatStarter:
    "We're inside the Bible reader right now. I can help you understand this chapter, the tools on the page, or how to study it better.",
  bullets: [
    "Read the chapter here, tap verse numbers to highlight, open Chapter Notes to go deeper, switch translations if you need to, and mark the chapter complete when you're done so I can guide your next step.",
  ],
};

const TRIVIA_GUIDE: LouisPageGuide = {
  id: "bible_trivia",
  featureKey: "bible_trivia",
  title: "This is Bible trivia",
  intro: "This is where you reinforce what you know with Bible trivia.",
  ask: "You want me to show you how trivia works before you jump in?",
  prompt: "You want me to show you how trivia works before you jump in?",
  chatStarter:
    "We're on Bible trivia right now. I can help you understand the categories, how scoring works, or where to start.",
  bullets: [
    "🎮 Pick a category or a book and answer one question at a time.",
    "🧠 Trivia is one of the fastest ways to reinforce what you've already been reading.",
    "🙌 You do not need to get everything right for it to help you learn.",
    "❓ If a question confuses you, ask Louis and we can break the verse or story down together.",
  ],
};

const TV_GUIDE: LouisPageGuide = {
  id: "bible_buddy_tv",
  featureKey: "bible_buddy_tv",
  title: "This is Bible Buddy TV",
  intro: "This is where Bible Buddy's videos, sermons, and movies live.",
  ask: "You want me to show you how Bible Buddy TV is organized?",
  prompt: "You want me to show you how Bible Buddy TV is organized?",
  chatStarter:
    "We're in Bible Buddy TV right now. This is where you can watch Bible shows, movies, sermons, documentaries, and animation without leaving Bible Buddy. I can show you how it works and help you find a good next watch.",
  bullets: [
    "🏠 STREAMING HOME\nThis page is built to help you move through Bible Buddy TV the same way you move through the rest of the app.",
    "⭐ FEATURED RIGHT NOW\nThis is where I surface something strong to watch first so you do not have to overthink what to pick.",
    "▶️ CONTINUE WATCHING\nThis is where you can jump back into anything you already started without searching for it again.",
    "🎞️ BROWSE BY CATEGORY\nMove through sermons, movies, documentaries, animation, and TV shows depending on what kind of content you want today.",
    "📖 EVERY TITLE GOES DEEPER\nWhen you open something, you can watch it inside Bible Buddy and study the notes under it too.",
    "👉 JUST TAP A TITLE TO START\nAnd if you want, I can help you pick the best one for today.",
  ],
};

const DEVOTIONALS_GUIDE: LouisPageGuide = {
  id: "devotionals",
  featureKey: "guided_studies",
  title: "This is the devotional page",
  intro: "This is where you can start a devotional and build a real Bible habit one day at a time.",
  ask: "You want me to show you how devotionals work and help you pick a good one?",
  prompt: "You want me to show you how devotionals work and help you pick a good one?",
  chatStarter:
    "We're on the devotional page right now. Each devotional covers a different topic, Bible story, or growth area. I can help you figure out what fits you best today.",
  bullets: [
    "🏠 **THIS IS YOUR DEVOTIONAL SHELF**\nThis page is where you come when you want something guided instead of trying to figure everything out on your own.",
    "📚 **EACH DEVOTIONAL HAS A DIFFERENT FOCUS**\nSome walk through a Bible story. Some help with a spiritual habit. Some take one big theme and break it down day by day.",
    "🕊️ **FREE USERS CAN START WITH ONE**\nYou can still get real value here on the free plan. If you ever hit the limit, that is where upgrading starts making more sense.",
    "⏱️ **DO ONE DAY AT A TIME**\nDo not rush it. Read the devotional, read the Bible passage, and sit with the reflection question.",
    "🔥 **THIS IS A STRONG PLACE TO BUILD A HABIT**\nIf you want structure, this is one of the best places to start because it gives you a simple daily rhythm.",
    "👉 **JUST PICK ONE TO START**\nIf you want, I can help you choose the best devotional for where you are right now.",
  ],
};

export function getLouisPageGuide(pathname: string | null): LouisPageGuide | null {
  if (!pathname) return null;

  if (pathname === "/dashboard") return DASHBOARD_GUIDE;
  if (pathname === "/reading") return BIBLE_BOOKS_GUIDE;
  if (pathname.startsWith("/reading/books/") || pathname.startsWith("/Bible/")) return BIBLE_READER_GUIDE;
  if (pathname === "/bible-trivia" || pathname.startsWith("/bible-trivia/")) return TRIVIA_GUIDE;
  if (pathname === "/biblebuddy-tv" || pathname.startsWith("/biblebuddy-tv/")) return TV_GUIDE;
  if (pathname === "/devotionals" || pathname.startsWith("/devotionals/")) return DEVOTIONALS_GUIDE;

  return null;
}

export function buildLouisGuideChatMessage(guide: LouisPageGuide) {
  const bulletLines = guide.bullets.join("\n\n");
  return `${guide.title}.\n\n${bulletLines}`;
}

