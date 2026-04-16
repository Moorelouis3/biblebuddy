import {
  bibleBuddyTvTitles,
  type BibleBuddyTvCategory,
} from "./bibleBuddyTvContent";

export type BibleBuddyTvBrowseKey = BibleBuddyTvCategory | "home" | "my-list";

export type BibleBuddyTvBrowseSubcategory = {
  id: string;
  label: string;
};

export const bibleBuddyTvBrowseOptions: Array<{
  id: BibleBuddyTvBrowseKey;
  label: string;
}> = [
  { id: "home", label: "Home" },
  { id: "my-list", label: "My List" },
  { id: "sermons", label: "Sermons" },
  { id: "movies", label: "Movies" },
  { id: "documentaries", label: "Documentaries" },
  { id: "bible-stories", label: "Animation" },
  { id: "tv", label: "TV Shows" },
];

export function getBrowsePageHref(key: Exclude<BibleBuddyTvBrowseKey, "home">) {
  return `/biblebuddy-tv/browse/${key}`;
}

export function getBrowsePageLabel(key: BibleBuddyTvBrowseKey) {
  return bibleBuddyTvBrowseOptions.find((option) => option.id === key)?.label ?? key;
}

export function getBrowsePageTitle(key: Exclude<BibleBuddyTvBrowseKey, "home">) {
  switch (key) {
    case "my-list":
      return "My List";
    case "sermons":
      return "Sermons";
    case "movies":
      return "Movies";
    case "documentaries":
      return "Documentaries";
    case "bible-stories":
      return "Animation";
    case "tv":
      return "TV Shows";
  }
}

export function getBrowsePageDescription(key: Exclude<BibleBuddyTvBrowseKey, "home">) {
  switch (key) {
    case "my-list":
      return "Everything you have saved to come back to later.";
    case "sermons":
      return "Bible-centered messages organized by what they are really speaking to.";
    case "movies":
      return "Feature-length Bible stories organized by story arc and focus.";
    case "documentaries":
      return "Bible history, archaeology, reliability, and people-of-the-Bible deep dives.";
    case "bible-stories":
      return "Animated Bible stories organized by era, people, and theme.";
    case "tv":
      return "Bible series and streaming-style shows organized by story and vibe.";
  }
}

export function getBrowseSubcategories(
  key: Exclude<BibleBuddyTvBrowseKey, "home" | "my-list">
): BibleBuddyTvBrowseSubcategory[] {
  switch (key) {
    case "sermons":
      return [
        { id: "popular", label: "Popular" },
        { id: "holy-spirit", label: "Holy Spirit" },
        { id: "temptation", label: "Temptation" },
        { id: "stress", label: "Stress" },
        { id: "peace", label: "Peace" },
        { id: "hope", label: "Hope" },
        { id: "addiction", label: "Addiction" },
        { id: "money", label: "Money" },
      ];
    case "movies":
      return [
        { id: "popular", label: "Popular" },
        { id: "old-testament", label: "Old Testament" },
        { id: "new-testament", label: "New Testament" },
        { id: "bible-characters", label: "Bible Characters" },
        { id: "prophets-kings", label: "Prophets & Kings" },
        { id: "deliverance", label: "Deliverance" },
      ];
    case "documentaries":
      return [
        { id: "popular", label: "Popular" },
        { id: "archaeology", label: "Archaeology" },
        { id: "bible-history", label: "Bible History" },
        { id: "bible-people", label: "Bible People" },
        { id: "scripture-reliability", label: "Scripture Reliability" },
        { id: "jesus-christianity", label: "Jesus & Christianity" },
      ];
    case "bible-stories":
      return [
        { id: "popular", label: "Popular" },
        { id: "old-testament", label: "Old Testament" },
        { id: "prophets", label: "Prophets" },
        { id: "jesus-story", label: "Jesus Story" },
        { id: "bible-characters", label: "Bible Characters" },
        { id: "faith-under-fire", label: "Faith Under Fire" },
      ];
    case "tv":
      return [
        { id: "popular", label: "Popular" },
        { id: "wilderness", label: "Wilderness" },
        { id: "jesus-stories", label: "Jesus Stories" },
        { id: "comedy-drama", label: "Comedy & Drama" },
        { id: "discipleship", label: "Discipleship" },
      ];
  }
}

export function getTitlesForBrowseCategory(key: Exclude<BibleBuddyTvBrowseKey, "home" | "my-list">) {
  return bibleBuddyTvTitles.filter((title) => title.badge !== "Coming Soon" && title.category === key);
}

export function matchesBrowseSubcategory(
  key: Exclude<BibleBuddyTvBrowseKey, "home" | "my-list">,
  subcategoryId: string,
  titleId: string
) {
  if (subcategoryId === "popular") return true;

  switch (key) {
    case "sermons":
      return (
        {
          "billy-graham-holy-spirit": ["holy-spirit"],
          "philip-anthony-mitchell-break-free": ["temptation"],
          "steven-furtick-gods-working-stop-stressing": ["stress"],
          "phil-robertson-finding-peace-of-mind-in-christ": ["peace"],
          "sarah-jakes-roberts-listen-for-your-breakthrough": ["hope"],
          "craig-groeschel-your-porn-battle-plan": ["addiction"],
          "dave-ramsey-how-to-take-hold-of-your-money": ["money"],
        } as Record<string, string[]>
      )[titleId]?.includes(subcategoryId) ?? false;
    case "movies":
      return (
        {
          "moses-movie": ["old-testament", "bible-characters", "deliverance"],
          "joseph-movie": ["old-testament", "bible-characters"],
          "gospel-of-john-movie": ["new-testament", "bible-characters"],
          "esther-movie": ["old-testament", "bible-characters", "prophets-kings"],
          "jeremiah-movie": ["old-testament", "bible-characters", "prophets-kings"],
        } as Record<string, string[]>
      )[titleId]?.includes(subcategoryId) ?? false;
    case "documentaries":
      return (
        {
          "lost-treasures-of-the-bible": ["archaeology", "bible-history", "bible-people"],
          "history-of-the-bible": ["bible-history", "scripture-reliability"],
          "the-story-of-god": ["bible-history", "jesus-christianity"],
          "dead-sea-scroll-detectives": ["archaeology", "scripture-reliability"],
          "story-of-the-twelve-apostles": ["bible-people", "jesus-christianity"],
          "peter-and-paul": ["bible-people", "jesus-christianity"],
          "shroud-of-turin": ["archaeology", "jesus-christianity", "scripture-reliability"],
        } as Record<string, string[]>
      )[titleId]?.includes(subcategoryId) ?? false;
    case "bible-stories":
      return (
        {
          "queen-jezebel-animation": ["old-testament", "prophets", "bible-characters"],
          "daniel-animation": ["old-testament", "prophets", "bible-characters", "faith-under-fire"],
          "god-with-us-animation": ["jesus-story", "bible-characters"],
          "john-the-baptist-animation": ["prophets", "jesus-story", "bible-characters", "faith-under-fire"],
          "job-animation": ["old-testament", "bible-characters", "faith-under-fire"],
        } as Record<string, string[]>
      )[titleId]?.includes(subcategoryId) ?? false;
    case "tv":
      return (
        {
          "promised-land": ["wilderness", "comedy-drama"],
          "the-chosen": ["jesus-stories", "discipleship"],
        } as Record<string, string[]>
      )[titleId]?.includes(subcategoryId) ?? false;
  }
}
