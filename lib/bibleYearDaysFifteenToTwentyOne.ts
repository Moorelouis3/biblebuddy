import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_15_SECTIONS = [
  {
    reference: "Genesis 37:1-4",
    chapter: 37,
    startVerse: 1,
    endVerse: 4,
    heading: "Joseph, The Robe, And The Hatred",
    summary: "Joseph's story begins inside a family already shaped by favoritism, tension, and visible preference.",
    teaching: [
      "Joseph's testing begins at home, not in Egypt.",
      "Jacob loves Joseph in a visible way because Joseph is Rachel's son, the child born after years of waiting.",
      "The robe makes the favoritism public, and the brothers cannot speak peaceably to him.",
      "Genesis is showing that the pit starts forming in the heart before Joseph ever reaches an actual pit.",
    ],
  },
  {
    reference: "Genesis 37:5-11",
    chapter: 37,
    startVerse: 5,
    endVerse: 11,
    heading: "Joseph's Dreams Increase The Tension",
    summary: "Joseph's dreams point toward a future his family cannot receive yet.",
    teaching: [
      "The dreams are important because they will eventually come true, but Joseph does not yet know how to carry them wisely.",
      "The sheaves and the sun, moon, and stars all point toward bowing, authority, and future reversal.",
      "His brothers hear the dreams as a threat, while Jacob rebukes Joseph but also keeps the matter in mind.",
      "This is one of the first lessons of Joseph's life: something can be from God and still be misunderstood by people.",
    ],
  },
  {
    reference: "Genesis 37:12-17",
    chapter: 37,
    startVerse: 12,
    endVerse: 17,
    heading: "Joseph Walks Into Danger",
    summary: "Jacob sends Joseph to check on his brothers, and Joseph keeps searching until he finds them.",
    teaching: [
      "Joseph is sent from Hebron toward Shechem, a place already connected with family trauma from Genesis 34.",
      "When he does not find his brothers, he keeps looking and follows them to Dothan.",
      "The scene feels ordinary on the surface, but the reader knows the family tension is dangerous.",
      "Joseph is obeying his father, but obedience is about to place him in the hands of brothers who hate him.",
    ],
  },
  {
    reference: "Genesis 37:18-28",
    chapter: 37,
    startVerse: 18,
    endVerse: 28,
    heading: "The Pit And The Sale",
    summary: "The brothers strip Joseph, throw him into a pit, and sell him toward Egypt.",
    teaching: [
      "The brothers see Joseph from far away and call him the dreamer.",
      "They do not just reject Joseph; they want to see what will become of his dreams.",
      "Reuben tries to prevent murder, but his partial rescue does not truly save Joseph.",
      "Judah suggests selling Joseph, and the brothers turn family hatred into profit.",
      "Joseph is pulled from the pit and sold toward Egypt, but the dreams are not dead.",
    ],
  },
  {
    reference: "Genesis 37:29-36",
    chapter: 37,
    startVerse: 29,
    endVerse: 36,
    heading: "Jacob Is Deceived",
    summary: "The brothers use Joseph's robe and goat blood to deceive Jacob, while Joseph is taken into Egypt.",
    teaching: [
      "The robe that once displayed favoritism now becomes false evidence.",
      "The brothers use a goat and a garment to deceive Jacob, echoing how Jacob once used goats and garments to deceive Isaac.",
      "Jacob believes Joseph is dead and refuses to be comforted.",
      "The family is trapped inside a lie, but Genesis quietly shows Joseph alive in Egypt.",
    ],
  },
  {
    reference: "Genesis 38:1-11",
    chapter: 38,
    startVerse: 1,
    endVerse: 11,
    heading: "Judah's House Begins To Break",
    summary: "Judah separates from his brothers, and Tamar is left waiting after deep family failure.",
    teaching: [
      "Genesis 38 feels like a detour, but it is really showing what is happening inside Judah.",
      "Judah leaves his brothers, builds a household, and Tamar enters the family.",
      "Er and Onan are both described as wicked, and Tamar is denied the future and protection she should have received.",
      "Judah sends Tamar away to wait for Shelah, but the text shows he does not really intend to protect her.",
    ],
  },
  {
    reference: "Genesis 38:12-23",
    chapter: 38,
    startVerse: 12,
    endVerse: 23,
    heading: "Tamar Acts After Judah Fails",
    summary: "Tamar uses Judah's own pledge as evidence after he withholds justice from her.",
    teaching: [
      "Tamar sees that Shelah has grown and Judah has still not given him to her.",
      "Her action is morally tangled, but Genesis wants us to understand the injustice that pushed her there.",
      "Judah acts on desire without recognizing Tamar, and Tamar asks for his signet, cord, and staff as a pledge.",
      "Those items are personal identifiers, so the hidden truth will not stay hidden forever.",
    ],
  },
  {
    reference: "Genesis 38:24-30",
    chapter: 38,
    startVerse: 24,
    endVerse: 30,
    heading: "Judah Tells The Truth",
    summary: "Tamar reveals the evidence, Judah admits his failure, and Perez is born into the family line.",
    teaching: [
      "Judah is quick to condemn Tamar until the evidence points back to him.",
      "Tamar does not give a long speech; she simply asks Judah to recognize what belongs to the father of her child.",
      "Judah says she has been more righteous than he is because he withheld Shelah.",
      "Perez is born through this messy story, and later Scripture traces the royal line through Perez.",
      "Genesis is showing that God can keep the promise moving through places people would rather hide.",
    ],
  },
] as const;

export const GENESIS_DAY_FIFTEEN_JOSEPHS_TESTING_BEGINS_LESSON: BibleYearDailyLesson = {
  dayNumber: 15,
  title: "Joseph Is Betrayed",
  reference: "Genesis 37-38",
  estimatedListenTime: "35-40 min",
  opening: [
    "Genesis 37-38 begins the final major movement of Genesis: the story of Joseph.",
    "Joseph's testing does not begin in Egypt. It begins at home, in a family marked by favoritism, jealousy, old wounds, and misunderstood dreams.",
    "Genesis 38 then turns aside to Judah and Tamar, showing that God is also working inside the brother who helped sell Joseph.",
  ],
  sections: DAY_15_SECTIONS.map((section) => ({
    heading: section.heading,
    verseBlock: {
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
    },
    teaching: [...section.teaching],
  })),
  closing: [
    "Day 15 begins with a robe and ends with hidden providence.",
    "Joseph is sold, Jacob is crushed, Judah is exposed, and Tamar is finally vindicated.",
    "Genesis 37-38 teaches that God can keep His plan moving through betrayal, hypocrisy, family damage, and painful truth-telling.",
  ],
};

export const BIBLE_YEAR_DAY_FIFTEEN_DEEP_NOTES = `Genesis 37-38 begins Joseph's testing and exposes Judah's household.

Joseph is loved visibly, hated deeply, misunderstood through dreams, stripped of his robe, thrown into a pit, and sold toward Egypt.

Then Genesis turns to Judah and Tamar, showing that God is not only working through Joseph's suffering, but also confronting the brother who helped send him away.

Big idea: God's hidden plan can keep moving even when a family is full of favoritism, betrayal, deception, hypocrisy, and pain.`;

export const BIBLE_YEAR_DAY_FIFTEEN_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_15_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "📖",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.join("\n\n")}

## What This Means

This section helps us see how Joseph's story begins in real family pain, while God is already carrying the promise forward through places no one understands yet.

## Big Idea

${section.summary}`,
}));
