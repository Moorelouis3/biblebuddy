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

function makeLesson(dayNumber: number, title: string, reference: string, estimatedListenTime: string, opening: string[], sections: readonly DaySection[], closing: string[]): BibleYearDailyLesson {
  return {
    dayNumber,
    title,
    reference,
    estimatedListenTime,
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

The big idea is this: ${title} continues Bible in One Year by helping the reader understand God's covenant faithfulness, Israel's responsibility, and the movement from wilderness preparation toward life in the land.`;
}

function makeStudySections(sections: readonly DaySection[]): BibleYearDeepStudySection[] {
  return sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: "book",
    summary: section.summary,
    markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.join("\n\n")}

## Key Phrases

### The LORD Spake Unto Moses
God's word continues to govern the journey, the land, worship, leadership, and covenant life.

### The Children Of Israel
This phrase keeps the focus on the covenant people God rescued, disciplined, preserved, and is preparing to bring into the land.

### As The LORD Commanded Moses
This phrase shows that Israel's future must be shaped by obedience to God's word, not by fear, pride, or human invention.

### The Land
The land is not merely geography. It is the promised inheritance where Israel must learn to live as God's people.

## What This Means

This section helps beginners follow the movement from wilderness testing toward covenant life.

- God keeps His promise.
- God prepares a new generation.
- God gives order for worship and community.
- God warns against forgetting.
- God calls His people to love and obey Him.`,
  }));
}

const DAY_45_SECTIONS = [
  {
    reference: "Numbers 26:1-65",
    chapter: 26,
    startVerse: 1,
    endVerse: 65,
    heading: "A New Generation Is Counted",
    summary: "God counts the new generation after the plague and before the land is divided.",
    teaching: [
      "Numbers 26 gives another census.",
      "The first wilderness generation has fallen, just as the LORD said.",
      "Now a new generation is counted by tribes and families.",
      "This count prepares Israel for inheritance, because the land will be divided according to the number of names.",
    ],
  },
  {
    reference: "Numbers 27:1-11",
    chapter: 27,
    startVerse: 1,
    endVerse: 11,
    heading: "The Daughters Of Zelophehad Ask For Inheritance",
    summary: "The daughters of Zelophehad bring a hard inheritance question before Moses, and God gives a just answer.",
    teaching: [
      "The daughters of Zelophehad come forward because their father died without sons.",
      "They ask that his name not be removed from his family.",
      "Moses brings the case before the LORD.",
      "God's answer protects inheritance and shows that justice in the land must listen carefully to real people and real family situations.",
    ],
  },
  {
    reference: "Numbers 27:12-23",
    chapter: 27,
    startVerse: 12,
    endVerse: 23,
    heading: "Joshua Is Commissioned To Lead",
    summary: "Moses sees the land from afar and Joshua is appointed as the next shepherd over Israel.",
    teaching: [
      "Moses will not enter the land because of his sin at Meribah.",
      "But Moses still cares about the people.",
      "He asks God to appoint a leader so Israel will not be like sheep without a shepherd.",
      "Joshua is commissioned before the congregation, showing that God's work continues beyond Moses.",
    ],
  },
  {
    reference: "Numbers 28:1-31",
    chapter: 28,
    startVerse: 1,
    endVerse: 31,
    heading: "Daily, Sabbath, Monthly, And Feast Offerings",
    summary: "God gives the regular offering rhythms that will shape Israel's worship.",
    teaching: [
      "Numbers 28 returns to worship rhythms.",
      "Daily offerings, Sabbath offerings, monthly offerings, Passover, Unleavened Bread, and Firstfruits are all named.",
      "This matters because the new generation needs more than land boundaries.",
      "They need worship ordered around the LORD.",
    ],
  },
  {
    reference: "Numbers 29:1-40",
    chapter: 29,
    startVerse: 1,
    endVerse: 40,
    heading: "Seventh Month Worship",
    summary: "God gives offerings for trumpets, the Day of Atonement, and the feast of Tabernacles.",
    teaching: [
      "Numbers 29 focuses heavily on the seventh month.",
      "Trumpets, the Day of Atonement, and Tabernacles shape Israel's worship calendar.",
      "The repeated offerings can feel slow, but they teach steady worship.",
      "The people entering the land must remember that their year belongs to the LORD.",
    ],
  },
] as const;

const DAY_46_SECTIONS = [
  {
    reference: "Numbers 30:1-16",
    chapter: 30,
    startVerse: 1,
    endVerse: 16,
    heading: "Vows Must Be Taken Seriously",
    summary: "God gives instructions about vows, households, authority, and keeping one's word before Him.",
    teaching: [
      "Numbers 30 teaches that words spoken before God matter.",
      "A vow is not casual speech.",
      "The chapter also addresses household authority and how vows may be confirmed or disallowed.",
      "For beginners, the key idea is that covenant people must not treat promises lightly.",
    ],
  },
  {
    reference: "Numbers 31:1-54",
    chapter: 31,
    startVerse: 1,
    endVerse: 54,
    heading: "Judgment On Midian",
    summary: "Israel fights Midian, Balaam dies, and the spoil is purified and divided.",
    teaching: [
      "Numbers 31 connects back to the sin at Baalpeor.",
      "Midian had helped lead Israel into compromise.",
      "The battle is judgment, not ordinary expansion.",
      "The chapter also shows purification, division of spoil, and an offering to the LORD from the commanders.",
    ],
  },
  {
    reference: "Numbers 32:1-42",
    chapter: 32,
    startVerse: 1,
    endVerse: 42,
    heading: "Tribes Settle East Of Jordan",
    summary: "Reuben, Gad, and half Manasseh request land east of Jordan and promise to fight with the rest of Israel.",
    teaching: [
      "Reuben and Gad see good land for livestock east of Jordan.",
      "Moses worries that their request will discourage Israel like the spies did.",
      "They promise to fight until the other tribes receive their inheritance.",
      "The chapter teaches that personal settlement must not replace shared covenant responsibility.",
    ],
  },
  {
    reference: "Numbers 33:1-49",
    chapter: 33,
    startVerse: 1,
    endVerse: 49,
    heading: "The Journey From Egypt Reviewed",
    summary: "Moses records Israel's stages from Egypt through the wilderness to the plains of Moab.",
    teaching: [
      "Numbers 33 reviews Israel's journey stage by stage.",
      "The list reminds the people that the LORD has carried them through many places.",
      "Some names may feel unfamiliar, but each stop is part of the story.",
      "Memory matters before entering the land.",
    ],
  },
  {
    reference: "Numbers 33:50-56",
    chapter: 33,
    startVerse: 50,
    endVerse: 56,
    heading: "Drive Out The Inhabitants",
    summary: "God commands Israel to drive out the inhabitants and warns that compromise will become a snare.",
    teaching: [
      "The chapter ends with a warning about the land.",
      "Israel must not keep the idolatrous systems of Canaan in place.",
      "If they compromise, what remains will become pricks, thorns, and trouble.",
      "This prepares the reader for the seriousness of covenant loyalty in Deuteronomy.",
    ],
  },
] as const;

const DAY_47_SECTIONS = [
  {
    reference: "Numbers 34:1-29",
    chapter: 34,
    startVerse: 1,
    endVerse: 29,
    heading: "Boundaries Of The Land",
    summary: "God names the boundaries of Canaan and appoints leaders to divide the inheritance.",
    teaching: [
      "Numbers 34 gives land boundaries.",
      "This is promise becoming specific.",
      "The land is not vague hope anymore; its borders are named.",
      "God also appoints leaders to divide the inheritance, showing order and accountability.",
    ],
  },
  {
    reference: "Numbers 35:1-8",
    chapter: 35,
    startVerse: 1,
    endVerse: 8,
    heading: "Cities For The Levites",
    summary: "The Levites receive cities and pasturelands among the tribes instead of one tribal territory.",
    teaching: [
      "The Levites do not receive land like the other tribes.",
      "Instead, they receive cities scattered through Israel.",
      "That keeps priestly and Levitical presence among the people.",
      "God's servants are distributed throughout the land, not isolated from the nation.",
    ],
  },
  {
    reference: "Numbers 35:9-34",
    chapter: 35,
    startVerse: 9,
    endVerse: 34,
    heading: "Cities Of Refuge And Bloodguilt",
    summary: "God gives cities of refuge and laws about murder, manslaughter, witnesses, and not defiling the land.",
    teaching: [
      "Cities of refuge protect someone who kills unintentionally until judgment can happen rightly.",
      "The law distinguishes murder from manslaughter.",
      "Witnesses matter because justice must not be careless.",
      "The land must not be polluted with bloodguilt because the LORD dwells among Israel.",
    ],
  },
  {
    reference: "Numbers 36:1-13",
    chapter: 36,
    startVerse: 1,
    endVerse: 13,
    heading: "Inheritance Protected Within The Tribe",
    summary: "The inheritance of Zelophehad's daughters is protected so tribal inheritance remains ordered.",
    teaching: [
      "Numbers closes by returning to inheritance.",
      "The concern is that land could move from one tribe to another through marriage.",
      "God gives a solution that protects both the daughters' inheritance and the tribe's inheritance.",
      "Numbers ends with the land promise being handled carefully before Israel enters.",
    ],
  },
  {
    reference: "Deuteronomy 1:1-46",
    chapter: 1,
    startVerse: 1,
    endVerse: 46,
    heading: "Moses Begins Looking Back",
    summary: "Moses begins Deuteronomy by retelling Israel's journey, leadership structure, unbelief at Kadesh, and defeat.",
    teaching: [
      "Deuteronomy begins with Moses speaking to Israel across Jordan.",
      "He retells the journey so the new generation understands where they came from.",
      "He remembers leaders being appointed, the command to go into the land, and the rebellion after the spies.",
      "Deuteronomy starts with memory because the future generation must learn from the past.",
    ],
  },
] as const;

const DAY_48_SECTIONS = [
  {
    reference: "Deuteronomy 2:1-37",
    chapter: 2,
    startVerse: 1,
    endVerse: 37,
    heading: "Remembering The Wilderness Road",
    summary: "Moses remembers Israel passing Edom, Moab, and Ammon and defeating Sihon by the LORD's command.",
    teaching: [
      "Deuteronomy 2 shows that God directed Israel's path among other nations.",
      "They were not allowed to seize Edom, Moab, or Ammon because God had given those lands to others.",
      "But Sihon resisted, and the LORD gave him into Israel's hand.",
      "The chapter teaches that God rules both restraint and victory.",
    ],
  },
  {
    reference: "Deuteronomy 3:1-29",
    chapter: 3,
    startVerse: 1,
    endVerse: 29,
    heading: "Og Defeated And Moses Sees The Land",
    summary: "Moses recounts victory over Og, land given east of Jordan, Joshua encouraged, and Moses barred from entering.",
    teaching: [
      "Deuteronomy 3 remembers victory over Og king of Bashan.",
      "The land east of Jordan is assigned to Reuben, Gad, and half Manasseh.",
      "Moses encourages Joshua because Joshua will lead Israel into the land.",
      "Moses pleads to enter, but the LORD tells him to view the land and strengthen Joshua.",
    ],
  },
  {
    reference: "Deuteronomy 4:1-24",
    chapter: 4,
    startVerse: 1,
    endVerse: 24,
    heading: "Hearken And Keep The Commandments",
    summary: "Moses calls Israel to hear, obey, remember Sinai, and refuse idols because the LORD is a consuming fire.",
    teaching: [
      "Deuteronomy 4 moves from memory to command.",
      "Israel must hearken, keep, and do the statutes of the LORD.",
      "Moses reminds them that they heard God's voice but saw no form.",
      "That matters because Israel must not make images of God.",
    ],
  },
  {
    reference: "Deuteronomy 4:25-49",
    chapter: 4,
    startVerse: 25,
    endVerse: 49,
    heading: "Seek The LORD From Exile",
    summary: "Moses warns about idolatry, exile, mercy, and the uniqueness of the LORD who rescued Israel.",
    teaching: [
      "Moses warns that idolatry will lead to scattering among the nations.",
      "But even there, if Israel seeks the LORD with all the heart and soul, He will be found.",
      "The chapter asks whether any people has heard God speak and lived like Israel did.",
      "The point is clear: the LORD alone is God.",
    ],
  },
  {
    reference: "Deuteronomy 5:1-33",
    chapter: 5,
    startVerse: 1,
    endVerse: 33,
    heading: "The Covenant At Horeb Remembered",
    summary: "Moses repeats the Ten Commandments and reminds Israel how they heard God's voice at the mountain.",
    teaching: [
      "Deuteronomy 5 repeats the covenant words.",
      "The new generation must hear the commandments as their own covenant responsibility.",
      "Moses reminds them of the fear and glory at Horeb.",
      "The chapter calls Israel to walk in all the ways the LORD commanded so they may live.",
    ],
  },
] as const;

const DAY_49_SECTIONS = [
  {
    reference: "Deuteronomy 6:1-25",
    chapter: 6,
    startVerse: 1,
    endVerse: 25,
    heading: "Love The LORD Thy God",
    summary: "Moses gives the Shema, calls Israel to love God with the whole heart, and warns them not to forget after blessing.",
    teaching: [
      "Deuteronomy 6 is one of the central chapters of the Old Testament.",
      "Hear, O Israel: The LORD our God is one LORD.",
      "Israel must love the LORD with all the heart, soul, and might.",
      "This love must be taught in the home, carried into daily life, and remembered when prosperity comes.",
    ],
  },
  {
    reference: "Deuteronomy 7:1-26",
    chapter: 7,
    startVerse: 1,
    endVerse: 26,
    heading: "A Holy People Chosen By Grace",
    summary: "Moses reminds Israel that God chose them in love, not because they were more numerous than other nations.",
    teaching: [
      "Deuteronomy 7 teaches election and holiness in plain language.",
      "Israel is chosen because the LORD loved them and kept His oath.",
      "They must not make covenant with the idolatry of the land.",
      "Grace does not make obedience unnecessary; it gives Israel a holy identity to live from.",
    ],
  },
  {
    reference: "Deuteronomy 8:1-20",
    chapter: 8,
    startVerse: 1,
    endVerse: 20,
    heading: "Remember The LORD In Prosperity",
    summary: "Moses explains the wilderness humbling, manna, and the danger of forgetting God in a good land.",
    teaching: [
      "Deuteronomy 8 explains why God humbled Israel in the wilderness.",
      "Manna taught them that man does not live by bread only, but by every word from the LORD.",
      "The good land will bring abundance, but abundance creates danger if the heart forgets God.",
      "Israel must remember that God gives power to get wealth.",
    ],
  },
  {
    reference: "Deuteronomy 9:1-29",
    chapter: 9,
    startVerse: 1,
    endVerse: 29,
    heading: "Not For Thy Righteousness",
    summary: "Moses warns Israel not to think they receive the land because of their own righteousness and reminds them of the golden calf.",
    teaching: [
      "Deuteronomy 9 attacks pride before Israel enters the land.",
      "The LORD gives victory because of His promise and because of the nations' wickedness, not Israel's righteousness.",
      "Moses reminds them of the golden calf to prove the point.",
      "Their story is a story of grace, not self-congratulation.",
    ],
  },
] as const;

const DAY_50_SECTIONS = [
  {
    reference: "Deuteronomy 10:1-22",
    chapter: 10,
    startVerse: 1,
    endVerse: 22,
    heading: "Circumcise Your Heart",
    summary: "Moses remembers the new tablets and calls Israel to fear, love, serve, and cleave to the LORD.",
    teaching: [
      "Deuteronomy 10 returns to the tablets after the golden calf.",
      "God renews the covenant words and continues with Israel.",
      "Moses asks what the LORD requires: fear Him, walk in His ways, love Him, serve Him, and keep His commandments.",
      "Circumcise your heart means Israel must not only carry an outward sign; their inner life must belong to God.",
    ],
  },
  {
    reference: "Deuteronomy 11:1-32",
    chapter: 11,
    startVerse: 1,
    endVerse: 32,
    heading: "Blessing And Curse Set Before Israel",
    summary: "Moses calls Israel to love, obey, remember, teach, and choose blessing over curse.",
    teaching: [
      "Deuteronomy 11 keeps pressing covenant loyalty into daily life.",
      "Israel must remember what God did in Egypt and in the wilderness.",
      "They must lay up God's words in their hearts, teach their children, and walk in His ways.",
      "Blessing and curse are set before them because covenant life requires a real response.",
    ],
  },
  {
    reference: "Deuteronomy 12:1-32",
    chapter: 12,
    startVerse: 1,
    endVerse: 32,
    heading: "The Place The LORD Shall Choose",
    summary: "God commands Israel to destroy false worship and bring worship to the place He chooses.",
    teaching: [
      "Deuteronomy 12 begins the detailed covenant instructions for life in the land.",
      "Israel must destroy false worship places rather than adopt them.",
      "They must bring sacrifices and worship to the place the LORD chooses.",
      "The chapter teaches that worship is not whatever feels meaningful; it must be shaped by God's word.",
    ],
  },
  {
    reference: "Deuteronomy 13:1-18",
    chapter: 13,
    startVerse: 1,
    endVerse: 18,
    heading: "Do Not Follow Other Gods",
    summary: "Moses warns Israel against false prophets, close family pressure, and cities that turn toward other gods.",
    teaching: [
      "Deuteronomy 13 is a strong warning about spiritual seduction.",
      "Even signs and wonders cannot excuse leading people after other gods.",
      "Even close relationships must not pull Israel away from covenant loyalty.",
      "The chapter teaches that love for the LORD must be stronger than pressure, charisma, and community drift.",
    ],
  },
] as const;

export const NUMBERS_DAY_FORTY_FIVE_NEW_GENERATION_COUNTED_LESSON = makeLesson(45, "A New Generation Counted", "Numbers 26-29", "20-30 min", [
  "Day 45 counts a new generation and prepares Israel for inheritance, leadership, and worship in the land.",
  "The wilderness judgment has happened, but God's promise has not failed.",
  "Numbers 26-29 shows names, land, Joshua, and offerings all being ordered before Israel enters Canaan.",
], DAY_45_SECTIONS, [
  "Day 45 teaches that God keeps His promise through a new generation.",
  "The land, leadership, justice, and worship are all prepared by the LORD.",
]);

export const NUMBERS_DAY_FORTY_SIX_VOWS_VICTORY_AND_JOURNEY_REVIEWED_LESSON = makeLesson(46, "Vows, Victory, and the Journey Reviewed", "Numbers 30-33", "20-30 min", [
  "Day 46 moves through vows, Midian, east-of-Jordan settlement, and the long journey list from Egypt to Moab.",
  "The reading shows Israel learning that words matter, compromise has consequences, and memory matters before entering the land.",
], DAY_46_SECTIONS, [
  "Day 46 teaches that the promised land requires honest words, shared responsibility, remembered grace, and serious separation from idolatry.",
]);

export const NUMBERS_DEUTERONOMY_DAY_FORTY_SEVEN_LAND_BOUNDARIES_AND_MOSES_LOOKS_BACK_LESSON = makeLesson(47, "Land Boundaries and Moses Looks Back", "Numbers 34-36; Deuteronomy 1", "20-30 min", [
  "Day 47 closes Numbers and opens Deuteronomy.",
  "Numbers ends with boundaries, Levite cities, cities of refuge, and inheritance protection.",
  "Then Moses begins speaking to the new generation, retelling the journey so they can enter the land with memory and wisdom.",
], DAY_47_SECTIONS, [
  "Day 47 teaches that inheritance, justice, refuge, memory, and leadership all matter as Israel stands near the land.",
]);

export const DEUTERONOMY_DAY_FORTY_EIGHT_REMEMBERING_JOURNEY_AND_COVENANT_LESSON = makeLesson(48, "Remembering the Journey and the Covenant", "Deuteronomy 2-5", "20-30 min", [
  "Day 48 listens as Moses remembers the journey and repeats the covenant.",
  "The new generation must know where God led them, what God gave them, and how God spoke to them at Horeb.",
], DAY_48_SECTIONS, [
  "Day 48 teaches that remembering God's past faithfulness prepares the heart for present obedience.",
]);

export const DEUTERONOMY_DAY_FORTY_NINE_LOVE_GOD_AND_REMEMBER_GRACE_LESSON = makeLesson(49, "Love God and Remember Grace", "Deuteronomy 6-9", "20-30 min", [
  "Day 49 includes the great call to love the LORD with all the heart, soul, and might.",
  "Moses warns Israel not to forget God in prosperity and not to think the land is earned by their own righteousness.",
], DAY_49_SECTIONS, [
  "Day 49 teaches that covenant obedience begins with love, memory, humility, and grace.",
]);

export const DEUTERONOMY_DAY_FIFTY_COVENANT_LOYALTY_FROM_THE_HEART_LESSON = makeLesson(50, "Covenant Loyalty From the Heart", "Deuteronomy 10-13", "20-30 min", [
  "Day 50 presses covenant loyalty into the heart, the home, worship, and community life.",
  "Moses calls Israel to love the LORD, circumcise the heart, choose blessing, worship where God chooses, and refuse other gods.",
], DAY_50_SECTIONS, [
  "Day 50 teaches that true covenant loyalty is not surface religion; it is love, obedience, worship, and allegiance from the heart.",
]);

export const BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_NOTES = makeDeepNotes("A New Generation Counted", ["Numbers 26", "Numbers 27", "Numbers 28", "Numbers 29"], NUMBERS_DAY_FORTY_FIVE_NEW_GENERATION_COUNTED_LESSON.opening, DAY_45_SECTIONS, NUMBERS_DAY_FORTY_FIVE_NEW_GENERATION_COUNTED_LESSON.closing);
export const BIBLE_YEAR_DAY_FORTY_SIX_DEEP_NOTES = makeDeepNotes("Vows, Victory, and the Journey Reviewed", ["Numbers 30", "Numbers 31", "Numbers 32", "Numbers 33"], NUMBERS_DAY_FORTY_SIX_VOWS_VICTORY_AND_JOURNEY_REVIEWED_LESSON.opening, DAY_46_SECTIONS, NUMBERS_DAY_FORTY_SIX_VOWS_VICTORY_AND_JOURNEY_REVIEWED_LESSON.closing);
export const BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_NOTES = makeDeepNotes("Land Boundaries and Moses Looks Back", ["Numbers 34", "Numbers 35", "Numbers 36", "Deuteronomy 1"], NUMBERS_DEUTERONOMY_DAY_FORTY_SEVEN_LAND_BOUNDARIES_AND_MOSES_LOOKS_BACK_LESSON.opening, DAY_47_SECTIONS, NUMBERS_DEUTERONOMY_DAY_FORTY_SEVEN_LAND_BOUNDARIES_AND_MOSES_LOOKS_BACK_LESSON.closing);
export const BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_NOTES = makeDeepNotes("Remembering the Journey and the Covenant", ["Deuteronomy 2", "Deuteronomy 3", "Deuteronomy 4", "Deuteronomy 5"], DEUTERONOMY_DAY_FORTY_EIGHT_REMEMBERING_JOURNEY_AND_COVENANT_LESSON.opening, DAY_48_SECTIONS, DEUTERONOMY_DAY_FORTY_EIGHT_REMEMBERING_JOURNEY_AND_COVENANT_LESSON.closing);
export const BIBLE_YEAR_DAY_FORTY_NINE_DEEP_NOTES = makeDeepNotes("Love God and Remember Grace", ["Deuteronomy 6", "Deuteronomy 7", "Deuteronomy 8", "Deuteronomy 9"], DEUTERONOMY_DAY_FORTY_NINE_LOVE_GOD_AND_REMEMBER_GRACE_LESSON.opening, DAY_49_SECTIONS, DEUTERONOMY_DAY_FORTY_NINE_LOVE_GOD_AND_REMEMBER_GRACE_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_DEEP_NOTES = makeDeepNotes("Covenant Loyalty From the Heart", ["Deuteronomy 10", "Deuteronomy 11", "Deuteronomy 12", "Deuteronomy 13"], DEUTERONOMY_DAY_FIFTY_COVENANT_LOYALTY_FROM_THE_HEART_LESSON.opening, DAY_50_SECTIONS, DEUTERONOMY_DAY_FIFTY_COVENANT_LOYALTY_FROM_THE_HEART_LESSON.closing);

export const BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_45_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_SIX_DEEP_STUDY_SECTIONS = makeStudySections(DAY_46_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_STUDY_SECTIONS = makeStudySections(DAY_47_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_STUDY_SECTIONS = makeStudySections(DAY_48_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_NINE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_49_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_DEEP_STUDY_SECTIONS = makeStudySections(DAY_50_SECTIONS);
