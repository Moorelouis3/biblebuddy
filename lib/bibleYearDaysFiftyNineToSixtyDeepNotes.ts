import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DaySection = {
  reference: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  heading: string;
  summary: string;
  teaching: readonly string[];
};

function makeLesson(dayNumber: number, title: string, reference: string, sections: readonly DaySection[], opening: string[], closing: string[]): BibleYearDailyLesson {
  return {
    dayNumber,
    title,
    reference,
    estimatedListenTime: "20-30 min",
    opening,
    sections: sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: [...section.teaching],
    })),
    closing,
  };
}

function makeDeepNotes(title: string, chapters: string[], intro: string[], sections: readonly DaySection[], closing: string[]) {
  return `## Bible Reader Chapters Covered

${chapters.map((chapter) => `- ${chapter}`).join("\n")}

## Chapter Introduction

${intro.join("\n\n")}

## Study Notes

${sections.map((section) => `${section.reference} - ${section.heading}\n\n${section.teaching.join("\n\n")}`).join("\n\n")}

## Application & Reflection

${closing.join("\n\n")}

The big idea is this: ${title} shows that the land is not random territory. It is promised inheritance distributed under the LORD's faithfulness.`;
}

function makeStudySections(sections: readonly DaySection[]): BibleYearDeepStudySection[] {
  return sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: "book",
    summary: section.summary,
    markdown: `## ${section.reference}

${section.teaching.join("\n\n")}

## Key Phrases

### Inheritance
Inheritance means the land is being received as a promised gift from the LORD, not seized as random property.

### Tribe
The tribes receive their portions so Israel can live in the land as an ordered covenant people.

### Lot
The lot shows the distribution is handled under God's rule instead of personal ambition.

### Promise
These chapters show God's old promises becoming mapped places, borders, cities, and family portions.

## What This Means

Joshua's land chapters may feel like lists, but they are promise becoming real geography.

The LORD gave Israel a place to live as His covenant people.`,
  }));
}

const DAY_59_SECTIONS: DaySection[] = [
  {
    reference: "Joshua 12:1-24",
    chapter: 12,
    startVerse: 1,
    endVerse: 24,
    heading: "Kings Defeated",
    summary: "Joshua lists the kings defeated east and west of Jordan, showing the LORD's victories over the land.",
    teaching: [
      "Joshua 12 looks like a list, but it is a record of victory.",
      "The kings east of Jordan and west of Jordan show that the LORD has been giving real enemies into Israel's hand.",
      "The list helps Israel remember that the land was not gained by accident.",
      "Every named king points to a real place where God's promise moved forward.",
    ],
  },
  {
    reference: "Joshua 13:1-33",
    chapter: 13,
    startVerse: 1,
    endVerse: 33,
    heading: "Land Yet To Be Possessed",
    summary: "The LORD tells Joshua that much land remains, while the eastern tribes receive their inheritance.",
    teaching: [
      "Joshua is old, but the LORD's work is still moving.",
      "The chapter holds both unfinished land and real inheritance.",
      "Reuben, Gad, and half Manasseh receive land east of Jordan.",
      "The Levites are different because the LORD Himself is their inheritance.",
    ],
  },
  {
    reference: "Joshua 14:1-15",
    chapter: 14,
    startVerse: 1,
    endVerse: 15,
    heading: "Caleb Receives Hebron",
    summary: "Caleb remembers the promise from Moses and asks for Hebron with steady faith.",
    teaching: [
      "Caleb's faith has lasted through decades of waiting.",
      "He remembers what Moses promised because he wholly followed the LORD.",
      "At eighty-five years old, Caleb still trusts God for the hill country.",
      "His inheritance shows patient faith receiving what God promised long ago.",
    ],
  },
  {
    reference: "Joshua 15:1-63",
    chapter: 15,
    startVerse: 1,
    endVerse: 63,
    heading: "Judah's Inheritance",
    summary: "Judah receives borders, cities, and family inheritance, including Caleb's continued faithfulness.",
    teaching: [
      "Joshua 15 maps Judah's inheritance in detail.",
      "The borders and cities show that promise becomes real land for real families.",
      "Caleb's family appears again, showing courage and inheritance tied together.",
      "The chapter also notes unfinished obedience where Jerusalem's inhabitants remain.",
    ],
  },
];

const DAY_60_SECTIONS: DaySection[] = [
  {
    reference: "Joshua 16:1-10",
    chapter: 16,
    startVerse: 1,
    endVerse: 10,
    heading: "Ephraim's Inheritance",
    summary: "Joseph's descendants receive land, but Ephraim does not drive out the Canaanites from Gezer.",
    teaching: [
      "Joshua 16 begins the inheritance of Joseph's descendants.",
      "The land is described by borders, cities, and families.",
      "Ephraim receives a portion, but the chapter ends with incomplete obedience.",
      "The Canaanites in Gezer become an early warning that receiving land still requires faithfulness.",
    ],
  },
  {
    reference: "Joshua 17:1-18",
    chapter: 17,
    startVerse: 1,
    endVerse: 18,
    heading: "Manasseh's Inheritance",
    summary: "Manasseh receives land, Zelophehad's daughters receive inheritance, and Joseph's children ask for more room.",
    teaching: [
      "Joshua 17 continues Joseph's inheritance through Manasseh.",
      "Zelophehad's daughters receive their inheritance as the LORD had commanded through Moses.",
      "The tribe asks for more land because they are numerous.",
      "Joshua calls them to clear the forest and trust that they can drive out the Canaanites.",
    ],
  },
  {
    reference: "Joshua 18:1-28",
    chapter: 18,
    startVerse: 1,
    endVerse: 28,
    heading: "The Land Is Surveyed",
    summary: "The tabernacle is set up at Shiloh, and the remaining land is surveyed and divided by lot.",
    teaching: [
      "Joshua 18 moves the tabernacle to Shiloh, placing worship at the center of the land story.",
      "Seven tribes still have not received their inheritance.",
      "Joshua sends men to describe the land in a book.",
      "The remaining portions are distributed by lot before the LORD.",
    ],
  },
  {
    reference: "Joshua 19:1-51",
    chapter: 19,
    startVerse: 1,
    endVerse: 51,
    heading: "The Remaining Tribes Receive Land",
    summary: "The remaining tribes receive their inheritances, and Joshua receives Timnathserah.",
    teaching: [
      "Joshua 19 finishes the major tribal allotments.",
      "Simeon, Zebulun, Issachar, Asher, Naphtali, and Dan receive their portions.",
      "Joshua also receives his own inheritance after the people receive theirs.",
      "The chapter closes the distribution with order, fairness, and the LORD's promise taking shape.",
    ],
  },
];

export const JOSHUA_DAY_FIFTY_NINE_LAND_IS_DISTRIBUTED_LESSON = makeLesson(59, "The Land Is Distributed", "Joshua 12-15", DAY_59_SECTIONS, [
  "Today the story slows down into records, borders, and inheritance.",
  "That may feel less dramatic than battle, but it matters deeply because God's promise is becoming real land for His people.",
], [
  "The LORD's promise becomes more than an idea.",
  "It becomes places, borders, cities, and inheritance for families.",
]);

export const JOSHUA_DAY_SIXTY_INHERITANCE_FOR_THE_TRIBES_LESSON = makeLesson(60, "Inheritance for the Tribes", "Joshua 16-19", DAY_60_SECTIONS, [
  "Today the inheritance continues tribe by tribe.",
  "The chapters show promise, responsibility, unfinished obedience, and worship at the center of Israel's life in the land.",
], [
  "Inheritance is a gift, but it still calls for faithful obedience.",
  "Joshua 16-19 helps us see the promise being settled among real families and tribes.",
]);

export const BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_NOTES = makeDeepNotes("The Land Is Distributed", ["Joshua 12", "Joshua 13", "Joshua 14", "Joshua 15"], JOSHUA_DAY_FIFTY_NINE_LAND_IS_DISTRIBUTED_LESSON.opening, DAY_59_SECTIONS, JOSHUA_DAY_FIFTY_NINE_LAND_IS_DISTRIBUTED_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_DEEP_NOTES = makeDeepNotes("Inheritance for the Tribes", ["Joshua 16", "Joshua 17", "Joshua 18", "Joshua 19"], JOSHUA_DAY_SIXTY_INHERITANCE_FOR_THE_TRIBES_LESSON.opening, DAY_60_SECTIONS, JOSHUA_DAY_SIXTY_INHERITANCE_FOR_THE_TRIBES_LESSON.closing);

export const BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_59_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_DEEP_STUDY_SECTIONS = makeStudySections(DAY_60_SECTIONS);
