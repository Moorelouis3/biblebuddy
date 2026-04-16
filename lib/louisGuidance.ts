import type { FeatureTourKey } from "./featureTours";

export type LouisGuideId =
  | "dashboard"
  | "bible_books"
  | "bible_reader"
  | "bible_trivia"
  | "bible_buddy_tv";

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
  intro: "This is your home base in Bible Buddy.",
  ask: "You want me to show you how the dashboard works and where each card takes you?",
  prompt: "You want me to show you how the dashboard works and where each card takes you?",
  chatStarter:
    "We’re on your dashboard right now. I can help you understand what each card does, where to start, or what your next step should be today.",
  bullets: [
    "The level card tracks your movement and growth across Bible Buddy.",
    "The Bible card is your fastest way into Scripture when you want to read.",
    "Bible Study Group and Tools are where deeper study and community happen.",
    "Bible Buddy TV and Games give you other ways to learn without leaving the app.",
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
    "We’re on the Bible books page right now. I can help you find where to start, explain how the books are organized, or help you pick your next book.",
  bullets: [
    "Click any book card to open that book and move into its chapters.",
    "Use Previous books and Next books to move through all 66 books without feeling overwhelmed.",
    "Switch on Alphabetical Order if you want to find a book faster.",
    "Open Your Bible Study Stats when you want to see how much Scripture you’ve completed.",
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
    "We’re inside the Bible reader right now. I can help you understand this chapter, the tools on the page, or how to study it better.",
  bullets: [
    "You can click the verse numbers to highlight a verse that stands out.",
    "Click chapter review or chapter notes to get a deeper breakdown of what you’re reading.",
    "Mark the chapter as finished when you’re done so you get credit and keep your progress moving.",
    "If you get stuck on a word, person, or place, ask Louis right here instead of leaving the app.",
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
    "We’re on Bible trivia right now. I can help you understand the categories, how scoring works, or where to start.",
  bullets: [
    "Pick a category or a book and answer one question at a time.",
    "Trivia is one of the fastest ways to reinforce what you’ve already been reading.",
    "You do not need to get everything right for it to help you learn.",
    "If a question confuses you, ask Louis and we can break the verse or story down together.",
  ],
};

const TV_GUIDE: LouisPageGuide = {
  id: "bible_buddy_tv",
  featureKey: "bible_buddy_tv",
  title: "This is Bible Buddy TV",
  intro: "This is where Bible Buddy’s videos, sermons, and movies live.",
  ask: "You want me to show you how Bible Buddy TV is organized?",
  prompt: "You want me to show you how Bible Buddy TV is organized?",
  chatStarter:
    "We’re in Bible Buddy TV right now. I can help you find something to watch, explain the categories, or point you to a good next title.",
  bullets: [
    "Featured is where Louis surfaces something strong to watch right now.",
    "Continue Watching helps you pick back up where you left off.",
    "Use the browse links and categories to move through sermons, movies, documentaries, animation, and TV shows.",
    "When you open a title, you can watch it inside Bible Buddy and study the notes under it too.",
  ],
};

export function getLouisPageGuide(pathname: string | null): LouisPageGuide | null {
  if (!pathname) return null;

  if (pathname === "/dashboard") return DASHBOARD_GUIDE;
  if (pathname === "/reading") return BIBLE_BOOKS_GUIDE;
  if (pathname.startsWith("/reading/books/") || pathname.startsWith("/Bible/")) return BIBLE_READER_GUIDE;
  if (pathname === "/bible-trivia" || pathname.startsWith("/bible-trivia/")) return TRIVIA_GUIDE;
  if (pathname === "/biblebuddy-tv" || pathname.startsWith("/biblebuddy-tv/")) return TV_GUIDE;

  return null;
}

export function buildLouisGuideChatMessage(guide: LouisPageGuide) {
  const bulletLines = guide.bullets.map((item) => `- ${item}`).join("\n");
  return `${guide.title}.\n\n${bulletLines}`;
}
