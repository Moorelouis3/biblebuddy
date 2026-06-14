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

The big idea is this: ${title} helps the reader follow covenant choice, Moses' final words, Joshua's courage, memorial faith, and obedient trust as Israel moves into the land.`;
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

### The LORD
The LORD remains faithful to His covenant and leads His people into what He promised.

### Moses
Moses finishes his calling by teaching, warning, blessing, and preparing Israel for life after him.

### Joshua
Joshua must lead with courage because the LORD is with him.

### Covenant
These chapters show covenant faithfulness moving from words, memory, and warning into real obedience in the land.

## What This Means

The story is moving from Moses to Joshua.

The promise is not ending with Moses' death. The LORD continues His work through the next leader and the next step of obedience.`,
  }));
}

const DAY_55_SECTIONS: DaySection[] = [
  {
    reference: "Deuteronomy 30:1-20",
    chapter: 30,
    startVerse: 1,
    endVerse: 20,
    heading: "Choose Life",
    summary: "Moses calls Israel to return to the LORD, love Him, obey His voice, and choose life.",
    teaching: [
      "Deuteronomy 30 brings the covenant choice close to the heart.",
      "Moses says the command is not far away or impossible to reach.",
      "Israel must love the LORD, obey His voice, and cleave to Him.",
      "The phrase choose life turns obedience into a clear path before the people.",
    ],
  },
  {
    reference: "Deuteronomy 31:1-30",
    chapter: 31,
    startVerse: 1,
    endVerse: 30,
    heading: "Moses Charges Joshua",
    summary: "Moses prepares Joshua and Israel for the next season, reminding them that the LORD will go before them.",
    teaching: [
      "Moses tells Israel that he will not cross the Jordan with them.",
      "Joshua is charged to be strong and courageous.",
      "The law is written, preserved, and placed where Israel can hear it again.",
      "The chapter prepares the people for leadership change without forgetting God's word.",
    ],
  },
  {
    reference: "Deuteronomy 32:1-52",
    chapter: 32,
    startVerse: 1,
    endVerse: 52,
    heading: "The Song Of Moses",
    summary: "Moses teaches Israel a song that remembers the LORD's faithfulness and warns against future rebellion.",
    teaching: [
      "Deuteronomy 32 uses song as a witness.",
      "The LORD is called the Rock because His work is perfect and His ways are just.",
      "Israel is warned not to forget the God who formed and carried them.",
      "The song teaches memory, warning, worship, and accountability all at once.",
    ],
  },
  {
    reference: "Deuteronomy 33:1-29",
    chapter: 33,
    startVerse: 1,
    endVerse: 29,
    heading: "Moses Blesses Israel",
    summary: "Moses blesses the tribes and points Israel to the eternal God who is their refuge.",
    teaching: [
      "Moses' final blessing speaks over Israel tribe by tribe.",
      "The blessing is not shallow encouragement. It places the tribes under God's care and purpose.",
      "The chapter ends by calling Israel blessed because the LORD is their help and shield.",
      "Moses' last words point beyond himself to the God who carries His people.",
    ],
  },
];

const DAY_56_SECTIONS: DaySection[] = [
  {
    reference: "Deuteronomy 34:1-12",
    chapter: 34,
    startVerse: 1,
    endVerse: 12,
    heading: "Moses Dies",
    summary: "Moses sees the land from Pisgah, dies in Moab, and Israel grieves the servant of the LORD.",
    teaching: [
      "Deuteronomy ends with Moses seeing the promised land but not entering it.",
      "The LORD buries Moses, and Israel mourns him.",
      "Joshua is filled with the spirit of wisdom for the next stage.",
      "The chapter honors Moses while showing that God's promise continues beyond one leader.",
    ],
  },
  {
    reference: "Joshua 1:1-18",
    chapter: 1,
    startVerse: 1,
    endVerse: 18,
    heading: "The LORD Commissions Joshua",
    summary: "The LORD commands Joshua to be strong and courageous because He will be with him.",
    teaching: [
      "Joshua begins after the death of Moses.",
      "The LORD tells Joshua to arise and lead the people over Jordan.",
      "Courage is tied to God's presence and God's law.",
      "Joshua's leadership must be strong because it is rooted in obedience, not self-confidence.",
    ],
  },
  {
    reference: "Joshua 2:1-24",
    chapter: 2,
    startVerse: 1,
    endVerse: 24,
    heading: "Rahab Hides The Spies",
    summary: "Rahab protects Israel's spies and confesses that the LORD has given Israel the land.",
    teaching: [
      "Rahab has heard what the LORD did at the Red Sea and to the kings east of Jordan.",
      "Her confession shows faith appearing inside Jericho before the walls fall.",
      "The scarlet cord becomes a sign of rescue for her household.",
      "Joshua 2 shows that God's mercy can reach someone inside a judged city.",
    ],
  },
  {
    reference: "Joshua 3:1-17",
    chapter: 3,
    startVerse: 1,
    endVerse: 17,
    heading: "Israel Crosses Jordan",
    summary: "The ark goes before Israel, the Jordan stops, and the people cross on dry ground.",
    teaching: [
      "The ark of the covenant leads the people toward the river.",
      "The priests step into the Jordan before the waters stop.",
      "The crossing teaches that the LORD is with Joshua as He was with Moses.",
      "Israel enters the land by God's power, not by ordinary human strength.",
    ],
  },
];

const DAY_57_SECTIONS: DaySection[] = [
  {
    reference: "Joshua 4:1-24",
    chapter: 4,
    startVerse: 1,
    endVerse: 24,
    heading: "Memorial Stones",
    summary: "Israel sets up stones so future children will ask and hear how the LORD dried up the Jordan.",
    teaching: [
      "Joshua 4 turns miracle into memory.",
      "The stones are not decoration. They are teaching tools for future generations.",
      "Children are expected to ask what the stones mean.",
      "The answer is that the LORD dried up Jordan so all people would know His hand is mighty.",
    ],
  },
  {
    reference: "Joshua 5:1-15",
    chapter: 5,
    startVerse: 1,
    endVerse: 15,
    heading: "Covenant Signs At Gilgal",
    summary: "Israel is circumcised, keeps Passover, eats the fruit of the land, and meets the captain of the LORD's host.",
    teaching: [
      "Before Jericho falls, Israel is brought back to covenant signs.",
      "Circumcision marks the people as belonging to the LORD.",
      "Passover remembers rescue from Egypt as they stand inside the land.",
      "The captain of the LORD's host reminds Joshua that the battle belongs to God.",
    ],
  },
  {
    reference: "Joshua 6:1-27",
    chapter: 6,
    startVerse: 1,
    endVerse: 27,
    heading: "Jericho Falls",
    summary: "Israel obeys the LORD's unusual command, Jericho falls, and Rahab is spared.",
    teaching: [
      "Jericho is shut up, but the LORD has already given the city into Joshua's hand.",
      "The battle plan centers on obedience, priests, trumpets, and the ark.",
      "The walls fall after Israel follows God's word.",
      "Rahab and her household are spared, showing mercy in the middle of judgment.",
    ],
  },
  {
    reference: "Joshua 7:1-26",
    chapter: 7,
    startVerse: 1,
    endVerse: 26,
    heading: "Achan's Sin",
    summary: "Achan takes devoted things, Israel is defeated at Ai, and hidden sin is exposed.",
    teaching: [
      "Joshua 7 shows that victory at Jericho does not make Israel immune to sin.",
      "Achan takes what was devoted to destruction.",
      "The defeat at Ai reveals that hidden sin damages the whole community.",
      "The chapter teaches that covenant obedience matters after victory, not only before it.",
    ],
  },
];

const DAY_58_SECTIONS: DaySection[] = [
  {
    reference: "Joshua 8:1-35",
    chapter: 8,
    startVerse: 1,
    endVerse: 35,
    heading: "Ai Falls And The Law Is Read",
    summary: "The LORD gives Ai into Joshua's hand, and Israel renews attention to the law at Ebal and Gerizim.",
    teaching: [
      "After Achan's sin is judged, the LORD tells Joshua not to fear.",
      "Ai falls by God's instruction and Israel's obedience.",
      "The chapter does not end with military pride.",
      "It ends with altar, sacrifice, blessing, curse, and the reading of the law.",
    ],
  },
  {
    reference: "Joshua 9:1-27",
    chapter: 9,
    startVerse: 1,
    endVerse: 27,
    heading: "The Gibeonites Deceive Israel",
    summary: "The Gibeonites trick Israel into a covenant because Israel does not ask counsel of the LORD.",
    teaching: [
      "Joshua 9 warns that danger does not always look like battle.",
      "The Gibeonites use old sacks, old bottles, and dry bread to appear far away.",
      "Israel makes peace without asking counsel of the LORD.",
      "The chapter teaches that wisdom must seek God, especially when something looks reasonable.",
    ],
  },
  {
    reference: "Joshua 10:1-43",
    chapter: 10,
    startVerse: 1,
    endVerse: 43,
    heading: "The LORD Fights For Israel",
    summary: "The LORD gives victory over the southern kings, sends hailstones, and lengthens the day for battle.",
    teaching: [
      "Joshua 10 shows the LORD fighting for Israel in unmistakable ways.",
      "The sun standing still is tied to the LORD hearing Joshua and giving victory.",
      "The kings who resist are defeated city by city.",
      "The chapter keeps repeating that Joshua does as the LORD commanded.",
    ],
  },
  {
    reference: "Joshua 11:1-23",
    chapter: 11,
    startVerse: 1,
    endVerse: 23,
    heading: "Northern Kings Defeated",
    summary: "Joshua defeats the northern coalition and the land rests from war.",
    teaching: [
      "Joshua 11 shows another large coalition rising against Israel.",
      "The LORD again tells Joshua not to be afraid.",
      "Joshua obeys the LORD's command and continues the conquest.",
      "The chapter ends with the land resting from war, showing the promise moving forward.",
    ],
  },
];

export const DEUTERONOMY_DAY_FIFTY_FIVE_CHOOSE_LIFE_AND_MOSES_BLESSING_LESSON = makeLesson(55, "Choose Life and Receive Moses' Blessing", "Deuteronomy 30-33", DAY_55_SECTIONS, [
  "Today Moses brings the covenant choice close to Israel's heart.",
  "He calls them to choose life, prepares Joshua, teaches a song, and blesses the tribes before his work ends.",
], [
  "Moses' final words keep pointing Israel back to the LORD.",
  "Life is found in loving Him, obeying His voice, and holding fast to Him.",
]);

export const DEUTERONOMY_JOSHUA_DAY_FIFTY_SIX_MOSES_DIES_AND_JOSHUA_LEADS_LESSON = makeLesson(56, "Moses Dies and Joshua Leads", "Deuteronomy 34; Joshua 1-3", DAY_56_SECTIONS, [
  "Today the story moves from Moses to Joshua.",
  "Moses dies, Joshua is commissioned, Rahab protects the spies, and Israel crosses the Jordan.",
], [
  "The LORD's promise does not die with Moses.",
  "God continues leading His people through Joshua, His word, and His presence.",
]);

export const JOSHUA_DAY_FIFTY_SEVEN_MEMORIAL_STONES_JERICHO_AND_ACHAN_LESSON = makeLesson(57, "Memorial Stones, Jericho, and Achan", "Joshua 4-7", DAY_57_SECTIONS, [
  "Today Israel remembers the Jordan crossing, renews covenant signs, sees Jericho fall, and faces the seriousness of hidden sin.",
  "The chapters move from memory to worship, victory, mercy, and judgment.",
], [
  "God's people must remember His works and obey His word.",
  "Victory is not a reason to become careless with sin.",
]);

export const JOSHUA_DAY_FIFTY_EIGHT_CONQUEST_AND_COVENANT_OBEDIENCE_LESSON = makeLesson(58, "Conquest and Covenant Obedience", "Joshua 8-11", DAY_58_SECTIONS, [
  "Today Israel moves through Ai, Gibeon, the southern battle, and the northern campaign.",
  "The chapters show conquest, covenant renewal, deception, prayer, and obedience.",
], [
  "Joshua's victories are tied to the LORD's command and the LORD's help.",
  "The land is received through faith-filled obedience, not self-confidence.",
]);

export const BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_NOTES = makeDeepNotes("Choose Life and Receive Moses' Blessing", ["Deuteronomy 30", "Deuteronomy 31", "Deuteronomy 32", "Deuteronomy 33"], DEUTERONOMY_DAY_FIFTY_FIVE_CHOOSE_LIFE_AND_MOSES_BLESSING_LESSON.opening, DAY_55_SECTIONS, DEUTERONOMY_DAY_FIFTY_FIVE_CHOOSE_LIFE_AND_MOSES_BLESSING_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_NOTES = makeDeepNotes("Moses Dies and Joshua Leads", ["Deuteronomy 34", "Joshua 1", "Joshua 2", "Joshua 3"], DEUTERONOMY_JOSHUA_DAY_FIFTY_SIX_MOSES_DIES_AND_JOSHUA_LEADS_LESSON.opening, DAY_56_SECTIONS, DEUTERONOMY_JOSHUA_DAY_FIFTY_SIX_MOSES_DIES_AND_JOSHUA_LEADS_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_NOTES = makeDeepNotes("Memorial Stones, Jericho, and Achan", ["Joshua 4", "Joshua 5", "Joshua 6", "Joshua 7"], JOSHUA_DAY_FIFTY_SEVEN_MEMORIAL_STONES_JERICHO_AND_ACHAN_LESSON.opening, DAY_57_SECTIONS, JOSHUA_DAY_FIFTY_SEVEN_MEMORIAL_STONES_JERICHO_AND_ACHAN_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_NOTES = makeDeepNotes("Conquest and Covenant Obedience", ["Joshua 8", "Joshua 9", "Joshua 10", "Joshua 11"], JOSHUA_DAY_FIFTY_EIGHT_CONQUEST_AND_COVENANT_OBEDIENCE_LESSON.opening, DAY_58_SECTIONS, JOSHUA_DAY_FIFTY_EIGHT_CONQUEST_AND_COVENANT_OBEDIENCE_LESSON.closing);

export const BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_55_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_STUDY_SECTIONS = makeStudySections(DAY_56_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_STUDY_SECTIONS = makeStudySections(DAY_57_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_STUDY_SECTIONS = makeStudySections(DAY_58_SECTIONS);
