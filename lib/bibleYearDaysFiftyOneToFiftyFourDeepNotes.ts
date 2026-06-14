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

The big idea is this: ${title} continues Moses' covenant teaching by helping the reader understand worship, justice, mercy, leadership, obedience, blessing, curse, and covenant renewal before Israel enters the land.`;
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

### The LORD Thy God
This phrase keeps every command connected to covenant relationship.

### The Place Which The LORD Shall Choose
This phrase reminds Israel that worship is received from God's instruction, not invented by human preference.

### Thou Shalt
This phrase shows that covenant love becomes practical obedience.

### Justice And Judgment
This phrase reminds the reader that life in the land must reflect God's righteousness.

## What This Means

This section helps beginners see that Deuteronomy is not random law.

It teaches Israel how to live as a holy people in ordinary life.`,
  }));
}

const DAY_51_SECTIONS = [
  {
    reference: "Deuteronomy 14:1-29",
    chapter: 14,
    startVerse: 1,
    endVerse: 29,
    heading: "Holy People, Clean Food, and Tithes",
    summary: "Moses teaches Israel that holiness touches identity, food, worship, and care for the vulnerable.",
    teaching: [
      "Deuteronomy 14 calls Israel the children of the LORD and a holy people.",
      "That identity shapes how they grieve, what they eat, and how they bring tithes before the LORD.",
      "The clean and unclean food laws teach separation from the nations and attention to God's word in daily life.",
      "The tithe teaches worship, gratitude, and care for the Levite, stranger, fatherless, and widow.",
    ],
  },
  {
    reference: "Deuteronomy 15:1-23",
    chapter: 15,
    startVerse: 1,
    endVerse: 23,
    heading: "Release, Generosity, and Firstborn Animals",
    summary: "The seventh-year release teaches mercy, open-handed care, and remembrance of Israel's own deliverance.",
    teaching: [
      "Deuteronomy 15 teaches the release of debts in the seventh year.",
      "The poor must not be treated with a hard heart or a shut hand.",
      "Servants released in the seventh year are to be sent away generously because Israel was once enslaved in Egypt.",
      "The firstborn animals belong to the LORD, so worship and mercy are both woven into the life of the land.",
    ],
  },
  {
    reference: "Deuteronomy 16:1-22",
    chapter: 16,
    startVerse: 1,
    endVerse: 22,
    heading: "Feasts, Judges, and Pure Worship",
    summary: "Passover, Weeks, Tabernacles, judges, and forbidden worship objects show holy rhythm and public justice.",
    teaching: [
      "Deuteronomy 16 gathers Israel around sacred time.",
      "Passover remembers deliverance, Weeks celebrates harvest, and Tabernacles rejoices before the LORD.",
      "The chapter also commands judges who must not twist justice or take bribes.",
      "Israel's worship calendar and court system both belong under the LORD's authority.",
    ],
  },
  {
    reference: "Deuteronomy 17:1-20",
    chapter: 17,
    startVerse: 1,
    endVerse: 20,
    heading: "Justice and the Future King",
    summary: "Moses warns against blemished offerings and idolatry, then describes judges and a king under God's law.",
    teaching: [
      "Deuteronomy 17 protects worship from blemished offerings and idolatry.",
      "Hard legal cases must be brought to the appointed place and received with humility.",
      "The future king must not multiply horses, wives, or silver and gold.",
      "He must write a copy of the law and read it all his days so leadership stays under God's word.",
    ],
  },
] as const;

const DAY_52_SECTIONS = [
  {
    reference: "Deuteronomy 18:1-22",
    chapter: 18,
    startVerse: 1,
    endVerse: 22,
    heading: "Levites, Forbidden Practices, and the Prophet",
    summary: "Moses teaches priestly provision, rejects occult practices, and promises a prophet like Moses.",
    teaching: [
      "Deuteronomy 18 begins with the priests and Levites having no ordinary land inheritance.",
      "The LORD Himself is their inheritance, and the people provide for their service.",
      "Israel must reject divination, sorcery, and occult practices because they belong to the nations' corruption.",
      "God promises to raise up a prophet like Moses, and Israel must listen to the word God puts in his mouth.",
    ],
  },
  {
    reference: "Deuteronomy 19:1-21",
    chapter: 19,
    startVerse: 1,
    endVerse: 21,
    heading: "Cities of Refuge and True Witness",
    summary: "Cities of refuge, boundary markers, witnesses, and false testimony show careful justice in the land.",
    teaching: [
      "Deuteronomy 19 returns to cities of refuge and accidental killing.",
      "The road to refuge must be prepared so vengeance does not outrun justice.",
      "Boundary markers must not be moved because land inheritance must be protected.",
      "A matter requires witnesses, and false witnesses must be judged so evil does not hide behind legal language.",
    ],
  },
  {
    reference: "Deuteronomy 20:1-20",
    chapter: 20,
    startVerse: 1,
    endVerse: 20,
    heading: "War Under the LORD's Command",
    summary: "Israel must not fear stronger armies, and even warfare is placed under God's order.",
    teaching: [
      "Deuteronomy 20 teaches Israel how to face battle without panic.",
      "The priest reminds the people that the LORD goes with them to fight for them.",
      "Certain men are sent home so fear and unfinished responsibilities do not weaken the army.",
      "The chapter also limits destruction and warns Israel not to learn the abominations of the nations.",
    ],
  },
  {
    reference: "Deuteronomy 21:1-23",
    chapter: 21,
    startVerse: 1,
    endVerse: 23,
    heading: "Unsolved Blood, Family Order, and Public Shame",
    summary: "Moses gives laws for unsolved murder, captive women, firstborn rights, rebellious sons, and cursed hanging.",
    teaching: [
      "Deuteronomy 21 shows that God cares about hard cases that could be ignored.",
      "Unsolved bloodshed still matters before the LORD.",
      "Family order must not be twisted by favoritism, and rebellion is treated seriously.",
      "The hanging body is not to remain overnight because even public judgment must not defile the land.",
    ],
  },
] as const;

const DAY_53_SECTIONS = [
  {
    reference: "Deuteronomy 22:1-30",
    chapter: 22,
    startVerse: 1,
    endVerse: 30,
    heading: "Neighbor Care and Moral Boundaries",
    summary: "Everyday faithfulness includes restoring lost animals, protecting life, and guarding sexual holiness.",
    teaching: [
      "Deuteronomy 22 shows that holiness reaches ordinary neighbor life.",
      "Lost animals and property must not be ignored.",
      "A roof needs a battlement because love protects another person's life before harm happens.",
      "The chapter also gives difficult sexual laws that show the seriousness of covenant purity, truth, protection, and justice.",
    ],
  },
  {
    reference: "Deuteronomy 23:1-25",
    chapter: 23,
    startVerse: 1,
    endVerse: 25,
    heading: "The Assembly, the Camp, and Neighbor Mercy",
    summary: "Moses teaches holiness in the assembly, purity in the camp, protection for runaway servants, vows, and gleaning kindness.",
    teaching: [
      "Deuteronomy 23 teaches that the assembly and camp belong before a holy God.",
      "Some restrictions are hard for modern readers, but they show that covenant nearness was treated with seriousness.",
      "The runaway servant must not be returned to oppression, and vows must not be spoken carelessly.",
      "Even eating from a neighbor's field has boundaries: enough for hunger, not enough for theft.",
    ],
  },
  {
    reference: "Deuteronomy 24:1-22",
    chapter: 24,
    startVerse: 1,
    endVerse: 22,
    heading: "Mercy in Marriage, Work, and Poverty",
    summary: "Marriage, pledges, wages, justice for vulnerable people, and gleaning laws show mercy in daily life.",
    teaching: [
      "Deuteronomy 24 brings covenant concern into everyday relationships.",
      "The newly married man is protected from military burden for a season.",
      "Workers must be paid on time, and the poor must not be exploited through harsh pledges.",
      "The stranger, fatherless, and widow are protected because Israel must remember they were bondmen in Egypt.",
    ],
  },
  {
    reference: "Deuteronomy 25:1-19",
    chapter: 25,
    startVerse: 1,
    endVerse: 19,
    heading: "Justice, Family Name, Honest Measures, and Amalek",
    summary: "Moses teaches restrained punishment, family preservation, honest weights, and remembering Amalek's cruelty.",
    teaching: [
      "Deuteronomy 25 teaches justice with limits.",
      "Punishment must not become humiliation beyond what is right.",
      "The law about a brother's name shows concern for family inheritance and remembrance.",
      "Honest weights matter because cheating in business is still sin before the LORD.",
    ],
  },
] as const;

const DAY_54_SECTIONS = [
  {
    reference: "Deuteronomy 26:1-19",
    chapter: 26,
    startVerse: 1,
    endVerse: 19,
    heading: "Firstfruits and Covenant Confession",
    summary: "Israel must bring firstfruits and confess the rescue story when they enter the land.",
    teaching: [
      "Deuteronomy 26 teaches Israel how to receive the land with worship.",
      "The firstfruits confession remembers Jacob, Egypt, affliction, deliverance, and the good land.",
      "The tithe for the vulnerable shows that worship and mercy belong together.",
      "The chapter ends with Israel avouching the LORD and the LORD avouching Israel as His special people.",
    ],
  },
  {
    reference: "Deuteronomy 27:1-26",
    chapter: 27,
    startVerse: 1,
    endVerse: 26,
    heading: "Words Written, Altar Built, Curses Answered",
    summary: "Moses commands the law to be written on stones, an altar built, and covenant curses answered by the people.",
    teaching: [
      "Deuteronomy 27 looks ahead to entering the land.",
      "The law must be written plainly on stones so the covenant word stands openly before Israel.",
      "An altar of whole stones reminds the people that obedience and worship belong together.",
      "The curses expose hidden sin and call all the people to answer Amen before the LORD.",
    ],
  },
  {
    reference: "Deuteronomy 28:1-68",
    chapter: 28,
    startVerse: 1,
    endVerse: 68,
    heading: "Blessings for Obedience and Curses for Disobedience",
    summary: "Moses lays out blessing and curse in one of the Bible's strongest covenant warning chapters.",
    teaching: [
      "Deuteronomy 28 is long and serious.",
      "Blessing is described in city, field, fruit, work, family, victory, and abundance.",
      "The curses are much longer because covenant rebellion is deadly serious.",
      "The chapter warns that rejecting the LORD will unravel the life Israel is about to receive in the land.",
    ],
  },
  {
    reference: "Deuteronomy 29:1-29",
    chapter: 29,
    startVerse: 1,
    endVerse: 29,
    heading: "Covenant Renewed in Moab",
    summary: "Moses renews the covenant, warns against secret idolatry, and reminds Israel that revealed things belong to obedience.",
    teaching: [
      "Deuteronomy 29 renews the covenant in Moab.",
      "Moses reminds Israel of what they saw in Egypt and how the LORD sustained them in the wilderness.",
      "No one must secretly bless himself while walking in stubbornness.",
      "The secret things belong to the LORD, but the revealed things belong to Israel and their children so they may obey.",
    ],
  },
] as const;

export const DEUTERONOMY_DAY_FIFTY_ONE_WORSHIP_JUSTICE_AND_LEADERSHIP_LESSON = makeLesson(51, "Worship, Justice, and Leadership", "Deuteronomy 14-17", "20-30 min", [
  "Day 51 continues Moses' teaching for life in the land.",
  "Deuteronomy 14 through 17 shows holiness touching food, generosity, feasts, courts, and even the future king.",
  "The repeated lesson is that worship, justice, and leadership must all stay under the LORD's word.",
], DAY_51_SECTIONS, [
  "Day 51 teaches that covenant life is not only private belief.",
  "It reaches the table, the tithe, the poor, the courts, the feasts, and the throne.",
]);

export const DEUTERONOMY_DAY_FIFTY_TWO_PROPHETS_CITIES_AND_JUSTICE_LESSON = makeLesson(52, "Prophets, Cities, and Justice", "Deuteronomy 18-21", "20-30 min", [
  "Day 52 listens as Moses teaches Israel about Levites, forbidden practices, true prophecy, refuge, witnesses, war, and hard cases of justice.",
  "These chapters show that the land must not be ruled by fear, magic, revenge, false testimony, or careless bloodshed.",
], DAY_52_SECTIONS, [
  "Day 52 teaches that God's people need true words, careful justice, and holy order in the hardest parts of life.",
]);

export const DEUTERONOMY_DAY_FIFTY_THREE_EVERYDAY_FAITHFULNESS_LESSON = makeLesson(53, "Everyday Faithfulness", "Deuteronomy 22-25", "20-30 min", [
  "Day 53 brings covenant obedience into ordinary life.",
  "Moses teaches about neighbors, property, roofs, marriage, the camp, vows, wages, gleaning, punishment, family name, honest weights, and Amalek.",
  "These chapters show that holiness is not only for worship services; it reaches daily choices.",
], DAY_53_SECTIONS, [
  "Day 53 teaches that everyday faithfulness matters because ordinary life is lived before the LORD.",
]);

export const DEUTERONOMY_DAY_FIFTY_FOUR_BLESSING_CURSE_AND_COVENANT_RENEWAL_LESSON = makeLesson(54, "Blessing, Curse, and Covenant Renewal", "Deuteronomy 26-29", "20-30 min", [
  "Day 54 brings Israel to covenant confession, written law, blessing, curse, and renewal in Moab.",
  "Moses calls the people to remember rescue, answer Amen, take the warnings seriously, and receive the revealed word as something to obey.",
], DAY_54_SECTIONS, [
  "Day 54 teaches that covenant renewal includes worship, memory, public obedience, sober warning, and humble trust in what God has revealed.",
]);

export const BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_NOTES = makeDeepNotes("Worship, Justice, and Leadership", ["Deuteronomy 14", "Deuteronomy 15", "Deuteronomy 16", "Deuteronomy 17"], DEUTERONOMY_DAY_FIFTY_ONE_WORSHIP_JUSTICE_AND_LEADERSHIP_LESSON.opening, DAY_51_SECTIONS, DEUTERONOMY_DAY_FIFTY_ONE_WORSHIP_JUSTICE_AND_LEADERSHIP_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_NOTES = makeDeepNotes("Prophets, Cities, and Justice", ["Deuteronomy 18", "Deuteronomy 19", "Deuteronomy 20", "Deuteronomy 21"], DEUTERONOMY_DAY_FIFTY_TWO_PROPHETS_CITIES_AND_JUSTICE_LESSON.opening, DAY_52_SECTIONS, DEUTERONOMY_DAY_FIFTY_TWO_PROPHETS_CITIES_AND_JUSTICE_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_NOTES = makeDeepNotes("Everyday Faithfulness", ["Deuteronomy 22", "Deuteronomy 23", "Deuteronomy 24", "Deuteronomy 25"], DEUTERONOMY_DAY_FIFTY_THREE_EVERYDAY_FAITHFULNESS_LESSON.opening, DAY_53_SECTIONS, DEUTERONOMY_DAY_FIFTY_THREE_EVERYDAY_FAITHFULNESS_LESSON.closing);
export const BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_NOTES = makeDeepNotes("Blessing, Curse, and Covenant Renewal", ["Deuteronomy 26", "Deuteronomy 27", "Deuteronomy 28", "Deuteronomy 29"], DEUTERONOMY_DAY_FIFTY_FOUR_BLESSING_CURSE_AND_COVENANT_RENEWAL_LESSON.opening, DAY_54_SECTIONS, DEUTERONOMY_DAY_FIFTY_FOUR_BLESSING_CURSE_AND_COVENANT_RENEWAL_LESSON.closing);

export const BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_51_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_STUDY_SECTIONS = makeStudySections(DAY_52_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_53_SECTIONS);
export const BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_STUDY_SECTIONS = makeStudySections(DAY_54_SECTIONS);
