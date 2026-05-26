import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DayBlueprint = {
  dayNumber: number;
  title: string;
  reference: string;
  listenTime: string;
  opening: string[];
  sections: Array<{
    reference: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    heading: string;
    icon: string;
    summary: string;
    teaching: string[];
  }>;
  closing: string[];
};

function buildLesson(day: DayBlueprint): BibleYearDailyLesson {
  return {
    dayNumber: day.dayNumber,
    title: day.title,
    reference: day.reference,
    estimatedListenTime: day.listenTime,
    opening: day.opening,
    sections: day.sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: section.teaching,
    })),
    closing: day.closing,
  };
}

function buildDeepNotes(day: DayBlueprint) {
  return `${day.reference} continues the Bible in One Year journey with ${day.title}.

${day.opening.join("\n\n")}

Big idea: ${day.closing[day.closing.length - 1]}`;
}

function buildStudySections(day: DayBlueprint): BibleYearDeepStudySection[] {
  return day.sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: section.icon,
    summary: section.summary,
    markdown: `## ${section.reference}

> **${section.startVerse}** This section opens the story movement in ${section.reference}.

## What Is Happening Here?

${section.teaching.join("\n\n")}

## Why This Matters

This part of the story helps us follow how God's promise moves through real family pressure, weakness, obedience, and mercy.

## Big Idea

${section.summary}`,
  }));
}

const DAY_10: DayBlueprint = {
  dayNumber: 10,
  title: "Covenant Through Isaac",
  reference: "Genesis 25-27",
  listenTime: "about 20 min",
  opening: [
    "Genesis 25-27 follows Abraham's final years and Isaac's household as the covenant promise continues through a very imperfect family.",
    "Abraham's life closes, Jacob and Esau are born, Isaac faces famine, repeats some of Abraham's fear, digs wells, and receives God's promise.",
    "Then Genesis 27 shows deception, favoritism, Jacob, Esau, and the blessing moving forward through weakness.",
  ],
  sections: [
    {
      reference: "Genesis 25:1-18",
      chapter: 25,
      startVerse: 1,
      endVerse: 18,
      heading: "Abraham's Final Years",
      icon: "scroll",
      summary: "Abraham's life closes, and Genesis keeps the covenant line focused through Isaac.",
      teaching: [
        "Abraham has more descendants, gives gifts, and sends other sons away from Isaac.",
        "Then Abraham dies full of years.",
        "Isaac and Ishmael bury him together.",
        "The focus remains clear: the covenant promise continues through Isaac.",
      ],
    },
    {
      reference: "Genesis 25:19-34",
      chapter: 25,
      startVerse: 19,
      endVerse: 34,
      heading: "Jacob and Esau Are Born",
      icon: "twins",
      summary: "Isaac's household begins with waiting, prayer, twins, conflict, and a despised birthright.",
      teaching: [
        "Genesis now turns toward Isaac's family.",
        "Rebekah conceives twins, and the struggle begins before birth.",
        "Jacob and Esau grow into very different men, and Esau despises his birthright.",
        "The next generation begins with conflict, but God's purpose is still moving forward.",
      ],
    },
    {
      reference: "Genesis 26:1-11",
      chapter: 26,
      startVerse: 1,
      endVerse: 11,
      heading: "Isaac Faces Famine and Fear",
      icon: "wheat",
      summary: "Isaac faces famine and repeats Abraham's fear, but God still confirms the covenant promise.",
      teaching: [
        "A famine comes in Isaac's day, just as one came in Abraham's day.",
        "God tells Isaac not to go down to Egypt and repeats the promise of land, descendants, and blessing.",
        "Isaac still acts out of fear and says Rebekah is his sister.",
      ],
    },
    {
      reference: "Genesis 26:12-25",
      chapter: 26,
      startVerse: 12,
      endVerse: 25,
      heading: "Isaac Digs Wells",
      icon: "well",
      summary: "Isaac keeps moving through conflict until God gives him room and he worships.",
      teaching: [
        "Isaac prospers, but conflict rises around the wells.",
        "Instead of fighting over every place, Isaac keeps moving and digging.",
        "At Beersheba, God appears to him and says, Do not be afraid.",
      ],
    },
    {
      reference: "Genesis 27:1-29",
      chapter: 27,
      startVerse: 1,
      endVerse: 29,
      heading: "Jacob Receives the Blessing",
      icon: "hands",
      summary: "Rebekah and Jacob use deception, and Isaac blesses Jacob instead of Esau.",
      teaching: [
        "Isaac plans to bless Esau, but Rebekah and Jacob scheme to secure the blessing.",
        "Jacob wears Esau's clothes and deceives his father.",
        "The blessing lands on Jacob, but the way it happens wounds the family.",
      ],
    },
    {
      reference: "Genesis 27:30-46",
      chapter: 27,
      startVerse: 30,
      endVerse: 46,
      heading: "Esau's Grief and Jacob's Escape",
      icon: "tears",
      summary: "Esau grieves the stolen blessing, and Jacob must flee from the conflict his deception helped create.",
      teaching: [
        "Esau realizes the blessing has been given to Jacob and cries bitterly.",
        "Anger rises, and Jacob's life is now in danger.",
        "The covenant continues, but the family is fractured by favoritism and deception.",
      ],
    },
  ],
  closing: [
    "Day 10 shows that the covenant promise continues as Abraham's life closes and Isaac's household comes into focus.",
    "But Genesis is honest: this family is marked by fear, conflict, favoritism, and deception.",
    "God's promise moves forward, but human sin still leaves real consequences.",
  ],
};

const DAY_11: DayBlueprint = {
  dayNumber: 11,
  title: "Jacob's Journey Begins",
  reference: "Genesis 28-29",
  listenTime: "about 16 min",
  opening: [
    "Genesis 28-29 begins Jacob's exile from home.",
    "Jacob leaves with fear and uncertainty, but God meets him at Bethel and repeats the covenant promise.",
    "Then Jacob arrives in Haran, meets Rachel, works for Laban, and experiences deception inside his own family story.",
  ],
  sections: [
    {
      reference: "Genesis 28:1-9",
      chapter: 28,
      startVerse: 1,
      endVerse: 9,
      heading: "Jacob Leaves Home",
      icon: "road",
      summary: "Jacob leaves home under family pressure, carrying both blessing and consequences.",
      teaching: ["Jacob is sent away to find a wife from the family line.", "He leaves with the blessing, but also because conflict with Esau has made home unsafe.", "The promise is moving, but Jacob is also facing consequences."],
    },
    {
      reference: "Genesis 28:10-22",
      chapter: 28,
      startVerse: 10,
      endVerse: 22,
      heading: "God Meets Jacob at Bethel",
      icon: "ladder",
      summary: "God meets Jacob in a dream and promises presence, land, descendants, and return.",
      teaching: ["Jacob dreams of a ladder reaching to heaven.", "God repeats the promise given to Abraham and Isaac.", "Jacob wakes up realizing God was present in a place he did not expect."],
    },
    {
      reference: "Genesis 29:1-20",
      chapter: 29,
      startVerse: 1,
      endVerse: 20,
      heading: "Jacob Meets Rachel",
      icon: "heart",
      summary: "Jacob reaches Haran, meets Rachel at the well, and agrees to work seven years for her.",
      teaching: ["Jacob arrives among his relatives and meets Rachel at a well.", "His love for Rachel shapes the next part of his life.", "He agrees to serve Laban seven years to marry her."],
    },
    {
      reference: "Genesis 29:21-35",
      chapter: 29,
      startVerse: 21,
      endVerse: 35,
      heading: "Jacob Is Deceived",
      icon: "veil",
      summary: "Jacob the deceiver is deceived by Laban, and family pain grows through Leah and Rachel.",
      teaching: ["Laban gives Leah to Jacob instead of Rachel.", "Jacob experiences deception from the other side.", "Leah is unloved, but God sees her pain and gives her children."],
    },
  ],
  closing: [
    "Day 11 shows God meeting Jacob on the road.",
    "Jacob is not yet mature, but God is already faithful to the promise.",
    "God's presence can meet us even in exile, uncertainty, and consequences.",
  ],
};

const DAY_12: DayBlueprint = {
  dayNumber: 12,
  title: "Jacob Leaves Laban",
  reference: "Genesis 30-31",
  listenTime: "about 16 min",
  opening: [
    "Genesis 30-31 follows Jacob's growing household, painful rivalry, hard labor, and conflict with Laban.",
    "The family grows, but the growth is messy.",
    "Eventually God tells Jacob to leave, and Jacob begins the journey back toward the land of promise.",
  ],
  sections: [
    {
      reference: "Genesis 30:1-24",
      chapter: 30,
      startVerse: 1,
      endVerse: 24,
      heading: "Jacob's Household Grows",
      icon: "family",
      summary: "Jacob's children are born in the middle of rivalry, longing, and pain.",
      teaching: ["Rachel and Leah struggle with jealousy and longing.", "Children are born through a painful family situation.", "God is still building the family line, but Genesis does not hide the brokenness."],
    },
    {
      reference: "Genesis 30:25-43",
      chapter: 30,
      startVerse: 25,
      endVerse: 43,
      heading: "Jacob Prospers Under Pressure",
      icon: "flock",
      summary: "Jacob works under Laban's pressure, but God still increases him.",
      teaching: ["Jacob wants to return home, but Laban wants to keep benefiting from him.", "The flocks increase, and Jacob becomes prosperous.", "The story shows God providing even under unfair conditions."],
    },
    {
      reference: "Genesis 31:1-21",
      chapter: 31,
      startVerse: 1,
      endVerse: 21,
      heading: "God Tells Jacob to Return",
      icon: "home",
      summary: "God calls Jacob to leave Laban and return to the land of his fathers.",
      teaching: ["Laban's household turns against Jacob.", "God tells Jacob to return to the land of promise.", "Jacob leaves with his family, possessions, and unresolved tension."],
    },
    {
      reference: "Genesis 31:22-55",
      chapter: 31,
      startVerse: 22,
      endVerse: 55,
      heading: "Jacob and Laban Make a Covenant",
      icon: "stones",
      summary: "Laban pursues Jacob, but God restrains him and the conflict ends with a boundary covenant.",
      teaching: ["Laban pursues Jacob, but God warns him in a dream.", "Jacob and Laban confront years of tension.", "They set up a heap of stones as a witness and part ways."],
    },
  ],
  closing: [
    "Day 12 shows growth under pressure.",
    "Jacob's family is messy, but God is still guiding him back toward promise.",
    "God can lead His people out of unhealthy places and back toward the road of obedience.",
  ],
};

const DAY_13: DayBlueprint = {
  dayNumber: 13,
  title: "Jacob Wrestles With God",
  reference: "Genesis 32-33",
  listenTime: "about 16 min",
  opening: [
    "Genesis 32-33 brings Jacob face to face with fear, prayer, God, and Esau.",
    "Jacob is returning home, but the old wound with Esau still waits ahead of him.",
    "Before Jacob meets Esau, he wrestles through the night and receives a new name.",
  ],
  sections: [
    {
      reference: "Genesis 32:1-21",
      chapter: 32,
      startVerse: 1,
      endVerse: 21,
      heading: "Jacob Prepares to Meet Esau",
      icon: "shield",
      summary: "Jacob is afraid to meet Esau and brings his fear to God in prayer.",
      teaching: ["Jacob hears that Esau is coming with four hundred men.", "He divides the camp and prays honestly.", "Fear pushes Jacob toward both planning and prayer."],
    },
    {
      reference: "Genesis 32:22-32",
      chapter: 32,
      startVerse: 22,
      endVerse: 32,
      heading: "Jacob Wrestles Through the Night",
      icon: "wrestle",
      summary: "Jacob wrestles, is wounded, receives blessing, and is renamed Israel.",
      teaching: ["Jacob is left alone at night and wrestles with a mysterious man.", "He is wounded but refuses to let go without blessing.", "His name becomes Israel, marking a new identity."],
    },
    {
      reference: "Genesis 33:1-17",
      chapter: 33,
      startVerse: 1,
      endVerse: 17,
      heading: "Jacob and Esau Reconcile",
      icon: "embrace",
      summary: "Jacob meets Esau, and the feared confrontation becomes a surprising moment of mercy.",
      teaching: ["Jacob bows as he approaches Esau.", "Esau runs, embraces him, and weeps.", "The meeting is not everything Jacob feared; mercy meets him on the road."],
    },
    {
      reference: "Genesis 33:18-20",
      chapter: 33,
      startVerse: 18,
      endVerse: 20,
      heading: "Jacob Builds an Altar",
      icon: "altar",
      summary: "Jacob arrives in the land and builds an altar to the God of Israel.",
      teaching: ["Jacob comes safely to Shechem.", "He buys land and builds an altar.", "The new name Israel is now connected with worship."],
    },
  ],
  closing: [
    "Day 13 shows Jacob changed through struggle.",
    "He limps away from the wrestling match, but he also carries a new name.",
    "God can use fear, prayer, and even weakness to reshape a person.",
  ],
};

const DAY_14: DayBlueprint = {
  dayNumber: 14,
  title: "Jacob Returns to Bethel",
  reference: "Genesis 34-36",
  listenTime: "about 18 min",
  opening: [
    "Genesis 34-36 closes Jacob's section with grief, violence, renewal, loss, and family lines.",
    "Genesis 34 is painful and shows the deep brokenness around Jacob's household.",
    "Then God calls Jacob back to Bethel, where worship and promise are renewed before the story records loss and the line of Esau.",
  ],
  sections: [
    {
      reference: "Genesis 34:1-31",
      chapter: 34,
      startVerse: 1,
      endVerse: 31,
      heading: "Dinah and Shechem",
      icon: "warning",
      summary: "A painful chapter shows violation, anger, deception, and violence inside Jacob's family story.",
      teaching: ["Dinah is violated by Shechem.", "Jacob's sons respond with deception and violence.", "Genesis does not make this chapter neat; it shows how brokenness spreads through families and cities."],
    },
    {
      reference: "Genesis 35:1-15",
      chapter: 35,
      startVerse: 1,
      endVerse: 15,
      heading: "Jacob Returns to Bethel",
      icon: "house",
      summary: "God calls Jacob back to Bethel, and Jacob puts away idols and worships.",
      teaching: ["God tells Jacob to go back to Bethel.", "Jacob calls his household to put away foreign gods.", "At Bethel, God repeats Jacob's new name and the covenant promise."],
    },
    {
      reference: "Genesis 35:16-29",
      chapter: 35,
      startVerse: 16,
      endVerse: 29,
      heading: "Loss in Jacob's Family",
      icon: "tears",
      summary: "Rachel dies, Benjamin is born, and Isaac's life comes to a close.",
      teaching: ["Rachel dies while giving birth to Benjamin.", "The family keeps moving through grief.", "Isaac dies, and Jacob and Esau bury him."],
    },
    {
      reference: "Genesis 36:1-43",
      chapter: 36,
      startVerse: 1,
      endVerse: 43,
      heading: "The Line of Esau",
      icon: "scroll",
      summary: "Genesis records Esau's descendants and shows another family line developing outside Jacob.",
      teaching: ["Genesis pauses to list Esau's family line.", "Esau becomes connected with Edom.", "This prepares later Bible history where Edom and Israel will appear again."],
    },
  ],
  closing: [
    "Day 14 is heavy, but it is important.",
    "Jacob's family story includes violence, grief, worship, promise, and generational consequences.",
    "God calls Jacob back to worship so the promise can keep moving through a broken but chosen family.",
  ],
};

export const GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON = buildLesson(DAY_10);
export const GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON = buildLesson(DAY_11);
export const GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON = buildLesson(DAY_12);
export const GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON = buildLesson(DAY_13);
export const GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON = buildLesson(DAY_14);

export const BIBLE_YEAR_DAY_TEN_DEEP_NOTES = buildDeepNotes(DAY_10);
export const BIBLE_YEAR_DAY_ELEVEN_DEEP_NOTES = buildDeepNotes(DAY_11);
export const BIBLE_YEAR_DAY_TWELVE_DEEP_NOTES = buildDeepNotes(DAY_12);
export const BIBLE_YEAR_DAY_THIRTEEN_DEEP_NOTES = buildDeepNotes(DAY_13);
export const BIBLE_YEAR_DAY_FOURTEEN_DEEP_NOTES = buildDeepNotes(DAY_14);

export const BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_10);
export const BIBLE_YEAR_DAY_ELEVEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_11);
export const BIBLE_YEAR_DAY_TWELVE_DEEP_STUDY_SECTIONS = buildStudySections(DAY_12);
export const BIBLE_YEAR_DAY_THIRTEEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_13);
export const BIBLE_YEAR_DAY_FOURTEEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_14);
