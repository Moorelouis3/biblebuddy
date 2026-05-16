import type { FeatureTourKey } from "./featureTours";

export type LouisGuideId =
  | "dashboard"
  | "bible_books"
  | "bible_study_hub"
  | "bible_trivia"
  | "bible_buddy_tv"
  | "devotionals"
  | "bible_references";

export type LouisPageGuide = {
  id: LouisGuideId;
  featureKey: FeatureTourKey;
  title: string;
};

type GuideMessageOptions = {
  firstName: string | null;
  isPaidUser: boolean;
};

const DASHBOARD_GUIDE: LouisPageGuide = {
  id: "dashboard",
  featureKey: "dashboard",
  title: "Dashboard",
};

const BIBLE_BOOKS_GUIDE: LouisPageGuide = {
  id: "bible_books",
  featureKey: "bible",
  title: "Bible Reader",
};

const BIBLE_STUDY_GROUP_GUIDE: LouisPageGuide = {
  id: "bible_study_hub",
  featureKey: "bible_study_hub",
  title: "The Bible Study Group",
};

const TRIVIA_GUIDE: LouisPageGuide = {
  id: "bible_trivia",
  featureKey: "bible_trivia",
  title: "Bible Study Games",
};

const TV_GUIDE: LouisPageGuide = {
  id: "bible_buddy_tv",
  featureKey: "bible_buddy_tv",
  title: "Bible Buddy TV",
};

const DEVOTIONALS_GUIDE: LouisPageGuide = {
  id: "devotionals",
  featureKey: "guided_studies",
  title: "Devotionals",
};

const REFERENCES_GUIDE: LouisPageGuide = {
  id: "bible_references",
  featureKey: "bible_references",
  title: "Bible Tools",
};

export function getLouisPageGuide(pathname: string | null): LouisPageGuide | null {
  if (!pathname) return null;

  if (pathname === "/dashboard") return DASHBOARD_GUIDE;
  if (pathname === "/reading" || pathname === "/Bible") return BIBLE_BOOKS_GUIDE;
  if (
    pathname === "/study-groups" ||
    pathname.endsWith("/chat") ||
    pathname.endsWith("/series") ||
    pathname.includes("/study-groups/")
  ) {
    return BIBLE_STUDY_GROUP_GUIDE;
  }
  if (
    pathname === "/bible-study-games" ||
    pathname.startsWith("/bible-study-games/scrambled") ||
    pathname === "/bible-trivia" ||
    pathname.startsWith("/bible-trivia/")
  ) {
    return TRIVIA_GUIDE;
  }
  if (pathname === "/biblebuddy-tv" || pathname.startsWith("/biblebuddy-tv/")) return TV_GUIDE;
  if (pathname === "/devotionals" || pathname === "/bible-studies") return DEVOTIONALS_GUIDE;
  if (pathname === "/bible-reference" || pathname === "/bible-references") return REFERENCES_GUIDE;

  return null;
}

function requireFirstName(firstName: string | null) {
  return typeof firstName === "string" && firstName.trim() ? firstName.trim() : null;
}

export function buildLouisGuideChatMessage(
  guide: LouisPageGuide,
  options: GuideMessageOptions,
) {
  const name = requireFirstName(options.firstName);
  if (!name) {
    return "I need your first name on your profile before I do this guide.\n\nAdd your name first and come back, and I will walk you through it.";
  }

  switch (guide.id) {
    case "dashboard":
      return [
        `hey ${name}, this is your dashboard`,
        "this is your home base in Bible Buddy where everything starts",
        "use this page to jump into the Bible, devotionals, the group, games, and the rest of the app",
        "if you ever feel lost, click me and I will help you find your next step",
      ].join("\n\n");
    case "bible_books":
      return [
        `hey ${name}, you just entered the Bible reader`,
        "this is where you can open all 66 books and move chapter by chapter through Scripture",
        "tap any book to start reading and track your progress as you grow your faith by actually spending time in the Word",
        "if you ever have any questions while reading the Bible, click me and I’ll be happy to help",
      ].join("\n\n");
    case "bible_study_hub":
      return [
        `hey ${name}, this is the Bible study group`,
        "this is where you can connect with other Bible Buddies and grow together",
        "we also run weekly Bible studies and daily faith conversations here",
        "don’t just read alone, be part of something",
      ].join("\n\n");
    case "bible_references":
      return [
        `hey ${name}, this is your Bible tools section`,
        "here you can access devotionals, reading plans, and deeper study resources",
        "you can also explore people, places, and keywords from the Bible with full explanations",
        "use this when you want to go deeper",
      ].join("\n\n");
    case "devotionals":
      return options.isPaidUser
        ? [
            `hey ${name}, this is the devotional library`,
            "devotionals are designed to help you build a daily Bible habit",
            "as a Pro member, you have full access to the entire library",
            "pick one and stay consistent daily",
          ].join("\n\n")
        : [
            `hey ${name}, this is the devotional library`,
            "devotionals are designed to help you build a daily Bible habit",
            "as a free user, you get access to one devotional",
            "if you want full access, you can upgrade here",
            "but if not, pick one and come back daily to complete the reading and reflection",
          ].join("\n\n");
    case "bible_buddy_tv":
      return [
        `hey ${name}, this is BibleBuddy TV`,
        "here you’ll find sermons, Christian movies, documentaries, and Bible based content",
        "everything is organized to help you grow while you watch",
        "use this when you want to learn in a different way",
      ].join("\n\n");
    case "bible_trivia":
      return [
        `hey ${name}, this is where you can test and grow your knowledge of the Word`,
        "play trivia or scrambled to challenge yourself",
        "learning doesn’t always have to be serious",
        "use this to sharpen what you’ve been reading",
      ].join("\n\n");
    default:
      return "";
  }
}
