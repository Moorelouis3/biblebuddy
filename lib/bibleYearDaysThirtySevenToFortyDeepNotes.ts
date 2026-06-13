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

The big idea is this: ${title} is not a disconnected reading. It continues the same Bible Buddy journey of seeing how the LORD forms His people for worship, holiness, order, mercy, and faithful life before Him.`;
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
God's word directs the life of His people. These chapters are not religious guesswork; they are instruction from the LORD.

### Before The LORD
This phrase reminds the reader that worship, service, offerings, time, justice, and camp order all happen in God's presence.

### The Children Of Israel
God is forming a whole people, not only private individuals. The commands shape community life.

### As The LORD Commanded Moses
This phrase shows obedience. Israel's worship and camp life must follow God's word, not human invention.

## What This Means

This section helps beginners see that the details matter.

- God orders worship.
- God guards holiness.
- God provides mercy.
- God forms His people as a community.
- God teaches ordinary life to happen before Him.`,
  }));
}

const DAY_37_SECTIONS = [
  {
    reference: "Leviticus 21:1-24",
    chapter: 21,
    startVerse: 1,
    endVerse: 24,
    heading: "Priests Must Bear Holiness Near The Altar",
    summary: "God gives priestly standards about death, marriage, family honor, and altar service.",
    teaching: [
      "Leviticus 21 focuses on priests because priests serve near the altar and handle holy things.",
      "The chapter deals with death, mourning, marriage, the high priest, and physical blemishes.",
      "Some details feel far from modern life, but the main idea is clear: nearness to holy service carries weight.",
      "Priests may still be human, grieve, eat holy food, and belong to the people, but altar service must visibly point to wholeness before God.",
    ],
  },
  {
    reference: "Leviticus 22:1-16",
    chapter: 22,
    startVerse: 1,
    endVerse: 16,
    heading: "Holy Food Must Be Handled Carefully",
    summary: "God teaches priests how to handle holy things without profaning His name.",
    teaching: [
      "Leviticus 22 continues speaking to the priests.",
      "The priests must separate themselves from holy things when they are unclean.",
      "Holy food is not ordinary food because it belongs to the LORD's service.",
      "The chapter carefully names who may eat and who may not eat, because holy things must not be treated casually.",
    ],
  },
  {
    reference: "Leviticus 22:17-33",
    chapter: 22,
    startVerse: 17,
    endVerse: 33,
    heading: "Offerings Must Be Without Blemish",
    summary: "God commands Israel to bring acceptable offerings that honor His holy name.",
    teaching: [
      "This section turns from holy food to acceptable offerings.",
      "Animals brought to the LORD must be without blemish.",
      "Israel must not bring God what is damaged, corrupt, or careless.",
      "The repeated reason is God's holy name: the LORD sanctifies Israel and brought them out of Egypt to be their God.",
    ],
  },
  {
    reference: "Leviticus 23:1-14",
    chapter: 23,
    startVerse: 1,
    endVerse: 14,
    heading: "Sabbath, Passover, And Firstfruits",
    summary: "God begins Israel's holy calendar with Sabbath, Passover, Unleavened Bread, and Firstfruits.",
    teaching: [
      "Leviticus 23 shows that God owns time.",
      "The weekly Sabbath comes first, because rest and worship shape Israel's rhythm.",
      "Passover and Unleavened Bread remember rescue from Egypt.",
      "Firstfruits teaches Israel to honor the LORD at the beginning of harvest before enjoying the fullness of increase.",
    ],
  },
  {
    reference: "Leviticus 23:15-44",
    chapter: 23,
    startVerse: 15,
    endVerse: 44,
    heading: "Holy Time Through The Year",
    summary: "God gives feasts for harvest, trumpets, atonement, and booths so Israel's year is shaped by worship.",
    teaching: [
      "The rest of Leviticus 23 moves through the yearly calendar.",
      "Weeks celebrates harvest and includes mercy for the poor and stranger.",
      "Trumpets gathers the people with a holy alarm.",
      "The Day of Atonement calls Israel to humility.",
      "Tabernacles teaches them to rejoice and remember how God made them dwell in booths after Egypt.",
    ],
  },
  {
    reference: "Leviticus 24:1-9",
    chapter: 24,
    startVerse: 1,
    endVerse: 9,
    heading: "Lamp And Bread Before The LORD",
    summary: "God commands continual light and weekly bread in the tabernacle.",
    teaching: [
      "Leviticus 24 begins inside the sanctuary.",
      "Pure oil keeps the lamp burning continually before the LORD.",
      "Twelve loaves are set in order before God, representing the tribes of Israel.",
      "The light and bread show continual worship and covenant presence before the LORD.",
    ],
  },
  {
    reference: "Leviticus 24:10-23",
    chapter: 24,
    startVerse: 10,
    endVerse: 23,
    heading: "The Holy Name And Equal Justice",
    summary: "A blasphemy case teaches reverence for God's name and equal justice for Israel and the stranger.",
    teaching: [
      "The chapter moves from the tabernacle to the camp.",
      "A man blasphemes the name of the LORD, and the people wait for God's judgment.",
      "God's name must not be treated as common or cursed.",
      "The chapter also gives justice language that applies to Israel and the stranger alike.",
    ],
  },
] as const;

const DAY_38_SECTIONS = [
  {
    reference: "Leviticus 25:1-22",
    chapter: 25,
    startVerse: 1,
    endVerse: 22,
    heading: "Sabbath Years And Jubilee",
    summary: "God teaches Israel that the land must rest and that Jubilee brings release and return.",
    teaching: [
      "Leviticus 25 teaches that the land belongs to God.",
      "Every seventh year, the land receives Sabbath rest.",
      "After seven sabbaths of years comes Jubilee, a year of liberty and return.",
      "Israel must trust that the LORD can provide enough even when they rest from normal production.",
    ],
  },
  {
    reference: "Leviticus 25:23-55",
    chapter: 25,
    startVerse: 23,
    endVerse: 55,
    heading: "Land, Debt, Poor Brethren, And Redemption",
    summary: "God gives laws about land, poverty, redemption, servants, and the truth that Israel belongs to Him.",
    teaching: [
      "The land must not be sold forever because the land belongs to the LORD.",
      "If an Israelite becomes poor, the community must not exploit him.",
      "Near relatives can redeem land or people from loss.",
      "The repeated truth is that Israel are the LORD's servants because He brought them out of Egypt.",
    ],
  },
  {
    reference: "Leviticus 26:1-13",
    chapter: 26,
    startVerse: 1,
    endVerse: 13,
    heading: "Blessing For Covenant Faithfulness",
    summary: "God promises rain, harvest, peace, victory, fruitfulness, and His presence if Israel walks in His statutes.",
    teaching: [
      "Leviticus 26 begins with covenant blessing.",
      "Israel must reject idols, keep Sabbaths, and reverence God's sanctuary.",
      "If they walk in God's statutes, the land will be fruitful and safe.",
      "The greatest blessing is not only harvest or peace; God says He will walk among them and be their God.",
    ],
  },
  {
    reference: "Leviticus 26:14-46",
    chapter: 26,
    startVerse: 14,
    endVerse: 46,
    heading: "Warnings, Discipline, And Remembered Covenant",
    summary: "God warns Israel about escalating discipline but also promises to remember His covenant.",
    teaching: [
      "The warnings in Leviticus 26 are heavy.",
      "If Israel refuses to listen, covenant discipline increases.",
      "The land will eventually enjoy its sabbaths while the people are in exile.",
      "But the chapter does not end without mercy: if they confess their iniquity, God will remember His covenant.",
    ],
  },
  {
    reference: "Leviticus 27:1-34",
    chapter: 27,
    startVerse: 1,
    endVerse: 34,
    heading: "Vows, Devotion, And What Belongs To The LORD",
    summary: "Leviticus ends with vows, dedicated things, redemption values, devoted things, and the tithe.",
    teaching: [
      "Leviticus 27 can feel like a surprising ending.",
      "It deals with vows, dedicated people, animals, houses, fields, devoted things, and tithes.",
      "The main idea is that what is dedicated to the LORD must be treated honestly.",
      "Leviticus ends by reminding Israel that holy things belong to God.",
    ],
  },
  {
    reference: "Numbers 1:1-54",
    chapter: 1,
    startVerse: 1,
    endVerse: 54,
    heading: "Israel Is Counted For The Journey",
    summary: "Numbers begins with Israel counted by tribes, armies, names, fathers' houses, and the Levites set apart for the tabernacle.",
    teaching: [
      "Numbers begins in the wilderness of Sinai.",
      "The LORD commands Moses to number the men able to go to war.",
      "The tribes are counted by families and fathers' houses.",
      "The Levites are not counted with the armies because they are assigned to guard and serve the tabernacle.",
      "God is preparing an ordered people for the journey ahead.",
    ],
  },
] as const;

const DAY_39_SECTIONS = [
  {
    reference: "Numbers 2:1-34",
    chapter: 2,
    startVerse: 1,
    endVerse: 34,
    heading: "The Camp Ordered Around The Tabernacle",
    summary: "God arranges the tribes by standards around the tabernacle and orders how they camp and set forward.",
    teaching: [
      "Numbers 2 shows Israel arranged around the tabernacle.",
      "The camp is not random.",
      "Each tribe has a place, a standard, and an order for setting forward.",
      "The tabernacle remains at the center because God's presence is the center of Israel's life.",
    ],
  },
  {
    reference: "Numbers 3:1-13",
    chapter: 3,
    startVerse: 1,
    endVerse: 13,
    heading: "The Levites Belong To The LORD",
    summary: "God sets apart the Levites in place of the firstborn of Israel.",
    teaching: [
      "Numbers 3 begins with Aaron's sons and the Levites.",
      "Nadab and Abihu are remembered because holy service must not be treated carelessly.",
      "The Levites are given to Aaron for tabernacle service.",
      "They belong to the LORD in place of the firstborn whom God claimed after Egypt.",
    ],
  },
  {
    reference: "Numbers 3:14-51",
    chapter: 3,
    startVerse: 14,
    endVerse: 51,
    heading: "Levite Families And Redemption Money",
    summary: "The Levite clans are counted and assigned around the tabernacle, and the extra firstborn are redeemed.",
    teaching: [
      "The Levites are counted by their families: Gershon, Kohath, and Merari.",
      "Each family camps in a specific place and carries a specific responsibility.",
      "The firstborn of Israel are counted too.",
      "Because there are more firstborn than Levites, redemption money is given.",
    ],
  },
  {
    reference: "Numbers 4:1-49",
    chapter: 4,
    startVerse: 1,
    endVerse: 49,
    heading: "Holy Things Are Carried With Care",
    summary: "God assigns Kohath, Gershon, and Merari their work for carrying the tabernacle.",
    teaching: [
      "Numbers 4 explains how the tabernacle moves.",
      "The Kohathites carry the most holy things, but Aaron and his sons must cover them first.",
      "Gershon carries curtains and coverings.",
      "Merari carries boards, bars, pillars, sockets, and structural pieces.",
      "God's house is mobile, but holy things still require order and reverence.",
    ],
  },
  {
    reference: "Numbers 5:1-10",
    chapter: 5,
    startVerse: 1,
    endVerse: 10,
    heading: "The Camp Must Be Kept Clean",
    summary: "God commands uncleanness to be put outside the camp and restitution to be made for wrongs.",
    teaching: [
      "Numbers 5 begins with camp purity.",
      "Those who are unclean are put outside the camp because the LORD dwells in the midst of Israel.",
      "The chapter also returns to confession and restitution.",
      "Wrongdoing against another person is also unfaithfulness against the LORD.",
    ],
  },
  {
    reference: "Numbers 5:11-31",
    chapter: 5,
    startVerse: 11,
    endVerse: 31,
    heading: "Jealousy, Hidden Sin, And The LORD's Judgment",
    summary: "A difficult jealousy law brings hidden marital suspicion before the LORD rather than leaving it to private vengeance.",
    teaching: [
      "This passage is difficult for modern readers, but the setting matters.",
      "A husband suspects adultery but lacks witnesses.",
      "The case is brought before the LORD, not handled by private violence.",
      "The priestly process places hidden truth under God's judgment.",
    ],
  },
] as const;

const DAY_40_SECTIONS = [
  {
    reference: "Numbers 6:1-21",
    chapter: 6,
    startVerse: 1,
    endVerse: 21,
    heading: "The Nazarite Vow",
    summary: "God gives instructions for a Nazarite vow of special separation unto the LORD.",
    teaching: [
      "Numbers 6 begins with the Nazarite vow.",
      "A man or woman may separate themselves unto the LORD for a special season.",
      "The vow involves abstaining from wine and grapes, not cutting the hair, and avoiding contact with the dead.",
      "The point is visible dedication to God.",
    ],
  },
  {
    reference: "Numbers 6:22-27",
    chapter: 6,
    startVerse: 22,
    endVerse: 27,
    heading: "The Priestly Blessing",
    summary: "God gives Aaron and his sons words of blessing to place His name upon Israel.",
    teaching: [
      "The priestly blessing is one of the most loved passages in Numbers.",
      "The LORD bless thee, and keep thee.",
      "The LORD make His face shine upon thee, and be gracious unto thee.",
      "The LORD lift up His countenance upon thee, and give thee peace.",
      "God's name is placed upon His people with blessing.",
    ],
  },
  {
    reference: "Numbers 7:1-89",
    chapter: 7,
    startVerse: 1,
    endVerse: 89,
    heading: "Tribal Offerings At The Altar",
    summary: "The leaders of Israel bring offerings for the dedication of the altar, tribe by tribe.",
    teaching: [
      "Numbers 7 is long because each tribe's offering is recorded.",
      "The repetition is part of the point.",
      "Every tribe has a place before the LORD.",
      "The offerings are equal and carefully remembered.",
      "At the end, Moses hears the voice of the LORD from above the mercy seat.",
    ],
  },
  {
    reference: "Numbers 8:1-26",
    chapter: 8,
    startVerse: 1,
    endVerse: 26,
    heading: "Lampstand And Levites Cleansed For Service",
    summary: "The lampstand is arranged, and the Levites are cleansed, offered, and assigned to service.",
    teaching: [
      "Numbers 8 begins with the lampstand giving light before the LORD.",
      "Then the Levites are cleansed for service.",
      "They are presented before the LORD as a living offering from Israel.",
      "Their service belongs to God because He took them in place of the firstborn.",
    ],
  },
  {
    reference: "Numbers 9:1-14",
    chapter: 9,
    startVerse: 1,
    endVerse: 14,
    heading: "Passover Kept In The Wilderness",
    summary: "Israel keeps Passover in the wilderness, and God provides a second-month Passover for those who are unclean or far away.",
    teaching: [
      "Numbers 9 brings Passover into the wilderness journey.",
      "Israel remembers the night God rescued them from Egypt.",
      "Some men are unclean by a dead body and cannot keep Passover at the normal time.",
      "God provides a second-month Passover, showing both holiness and mercy.",
    ],
  },
  {
    reference: "Numbers 9:15-23",
    chapter: 9,
    startVerse: 15,
    endVerse: 23,
    heading: "The Cloud Leads Israel",
    summary: "The cloud covers the tabernacle, and Israel journeys or rests according to the commandment of the LORD.",
    teaching: [
      "Numbers 9 ends with guidance.",
      "The cloud covers the tabernacle by day, and fire appears by night.",
      "When the cloud moves, Israel journeys.",
      "When the cloud stays, Israel rests.",
      "The people are learning to move by God's presence, not by their own impatience.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_SEVEN_PRIESTS_FEASTS_AND_SACRED_ORDER_LESSON = makeLesson(
  37,
  "Priests, Feasts, and Sacred Order",
  "Leviticus 21-24",
  "35-40 min",
  [
    "Day 37 continues Leviticus by focusing on priests, holy offerings, holy time, holy light, holy bread, holy speech, and holy justice.",
    "The reading shows that holiness touches both the sanctuary and the camp.",
    "God is teaching Israel that nearness to Him requires reverence in worship and righteousness in community life.",
  ],
  DAY_37_SECTIONS,
  [
    "Day 37 teaches that holy service must not be handled casually.",
    "Priests, offerings, feasts, lamps, bread, speech, and justice all belong before the LORD.",
  ],
);

export const LEVITICUS_NUMBERS_DAY_THIRTY_EIGHT_JUBILEE_COVENANT_AND_ISRAEL_COUNTED_LESSON = makeLesson(
  38,
  "Jubilee, Covenant, and Israel Counted",
  "Leviticus 25-27; Numbers 1",
  "35-40 min",
  [
    "Day 38 closes Leviticus and opens Numbers.",
    "Leviticus ends by showing that land, time, debt, vows, blessing, warning, and devotion all belong to the LORD.",
    "Numbers begins by counting Israel for the wilderness journey ahead.",
  ],
  DAY_38_SECTIONS,
  [
    "Day 38 teaches that God owns the land, the people, the calendar, the future, and the journey.",
    "The same God who gives covenant warnings also prepares His people to move forward in ordered obedience.",
  ],
);

export const NUMBERS_DAY_THIRTY_NINE_CAMP_ORDER_AND_PURITY_LESSON = makeLesson(
  39,
  "Camp Order and Purity",
  "Numbers 2-5",
  "35-40 min",
  [
    "Day 39 moves deeper into Numbers.",
    "God arranges the camp, assigns the Levites, orders the carrying of holy things, and protects the purity of the community.",
    "The wilderness journey begins with order because God's presence is in the middle of the camp.",
  ],
  DAY_39_SECTIONS,
  [
    "Day 39 teaches that God's people are not a scattered crowd.",
    "They are an ordered camp with God's presence at the center, holy service assigned, and purity protected.",
  ],
);

export const NUMBERS_DAY_FORTY_BLESSING_DEDICATION_AND_PASSOVER_LESSON = makeLesson(
  40,
  "Blessing, Dedication, and Passover",
  "Numbers 6-9",
  "35-40 min",
  [
    "Day 40 continues Numbers with dedication, blessing, offerings, Levite service, Passover, and God's guiding cloud.",
    "The reading moves from special consecration to priestly blessing and from altar dedication to wilderness guidance.",
    "God is forming a people who are blessed, ordered, cleansed, remembered, and led by His presence.",
  ],
  DAY_40_SECTIONS,
  [
    "Day 40 teaches that God's people need both dedication and blessing.",
    "They remember Passover, serve near the tabernacle, and move only when the LORD leads.",
  ],
);

export const BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_NOTES = makeDeepNotes(
  "Priests, Feasts, and Sacred Order",
  ["Leviticus 21", "Leviticus 22", "Leviticus 23", "Leviticus 24"],
  LEVITICUS_DAY_THIRTY_SEVEN_PRIESTS_FEASTS_AND_SACRED_ORDER_LESSON.opening,
  DAY_37_SECTIONS,
  LEVITICUS_DAY_THIRTY_SEVEN_PRIESTS_FEASTS_AND_SACRED_ORDER_LESSON.closing,
);

export const BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_NOTES = makeDeepNotes(
  "Jubilee, Covenant, and Israel Counted",
  ["Leviticus 25", "Leviticus 26", "Leviticus 27", "Numbers 1"],
  LEVITICUS_NUMBERS_DAY_THIRTY_EIGHT_JUBILEE_COVENANT_AND_ISRAEL_COUNTED_LESSON.opening,
  DAY_38_SECTIONS,
  LEVITICUS_NUMBERS_DAY_THIRTY_EIGHT_JUBILEE_COVENANT_AND_ISRAEL_COUNTED_LESSON.closing,
);

export const BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_NOTES = makeDeepNotes(
  "Camp Order and Purity",
  ["Numbers 2", "Numbers 3", "Numbers 4", "Numbers 5"],
  NUMBERS_DAY_THIRTY_NINE_CAMP_ORDER_AND_PURITY_LESSON.opening,
  DAY_39_SECTIONS,
  NUMBERS_DAY_THIRTY_NINE_CAMP_ORDER_AND_PURITY_LESSON.closing,
);

export const BIBLE_YEAR_DAY_FORTY_DEEP_NOTES = makeDeepNotes(
  "Blessing, Dedication, and Passover",
  ["Numbers 6", "Numbers 7", "Numbers 8", "Numbers 9"],
  NUMBERS_DAY_FORTY_BLESSING_DEDICATION_AND_PASSOVER_LESSON.opening,
  DAY_40_SECTIONS,
  NUMBERS_DAY_FORTY_BLESSING_DEDICATION_AND_PASSOVER_LESSON.closing,
);

export const BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_STUDY_SECTIONS = makeStudySections(DAY_37_SECTIONS);
export const BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_STUDY_SECTIONS = makeStudySections(DAY_38_SECTIONS);
export const BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_39_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_DEEP_STUDY_SECTIONS = makeStudySections(DAY_40_SECTIONS);
