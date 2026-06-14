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

The big idea is this: ${title} continues the wilderness journey by showing how the LORD leads, tests, corrects, provides for, and preserves His covenant people.`;
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
God's word directs Israel in the wilderness. The people do not survive by instinct, complaint, or human strategy, but by listening to the LORD.

### The Children Of Israel
This phrase keeps the focus on the covenant people God rescued from Egypt and is still shaping for the promised land.

### In The Wilderness
The wilderness is the testing place where Israel learns whether they will trust the God who rescued them.

### Before The LORD
This phrase reminds the reader that rebellion, worship, judgment, mercy, and leadership all happen in God's presence.

## What This Means

This section helps beginners see that Numbers is not random travel history.

- God leads His people.
- God exposes unbelief.
- God judges rebellion.
- God provides mercy.
- God keeps His promise moving forward.`,
  }));
}

const DAY_41_SECTIONS = [
  {
    reference: "Numbers 10:1-10",
    chapter: 10,
    startVerse: 1,
    endVerse: 10,
    heading: "Silver Trumpets For Gathering And Journeying",
    summary: "God gives trumpets to gather the congregation, move the camps, sound alarm, and remember Israel before Him.",
    teaching: [
      "Numbers 10 begins with silver trumpets.",
      "The trumpets call leaders, gather the congregation, signal the journey, sound alarm in battle, and mark worship days.",
      "Israel is not supposed to move by confusion.",
      "Even sound is ordered by God so the camp can hear when it is time to gather, march, fight, or worship.",
    ],
  },
  {
    reference: "Numbers 10:11-36",
    chapter: 10,
    startVerse: 11,
    endVerse: 36,
    heading: "The Camp Sets Forward From Sinai",
    summary: "Israel leaves Sinai in ordered formation as Moses asks Hobab to guide them and the ark goes before the people.",
    teaching: [
      "The cloud lifts, and Israel begins moving from Sinai.",
      "The tribes set forward in the order God gave.",
      "Moses asks Hobab to come with them and be as eyes in the wilderness.",
      "The ark going before the people shows that the journey belongs to the LORD's presence, not merely human navigation.",
    ],
  },
  {
    reference: "Numbers 11:1-15",
    chapter: 11,
    startVerse: 1,
    endVerse: 15,
    heading: "Complaining In The Wilderness",
    summary: "Israel complains, remembers Egypt wrongly, despises manna, and Moses feels the crushing weight of leadership.",
    teaching: [
      "Numbers 11 shows how quickly the journey becomes spiritually dangerous.",
      "The people complain, and the mixed multitude lusts for food from Egypt.",
      "Manna, which was God's daily provision, begins to feel small to them.",
      "Moses brings his burden honestly to the LORD, showing that leadership in a complaining community can feel too heavy to carry alone.",
    ],
  },
  {
    reference: "Numbers 11:16-35",
    chapter: 11,
    startVerse: 16,
    endVerse: 35,
    heading: "Seventy Elders And Quail In Judgment",
    summary: "God shares the burden of leadership with seventy elders and gives quail while judging Israel's craving.",
    teaching: [
      "God answers Moses by giving seventy elders to help bear the burden.",
      "He also sends quail, but the gift becomes judgment because the people's craving is full of unbelief.",
      "The issue is not that food is bad.",
      "The issue is that Israel rejects the LORD's provision and treats Egypt as if it were better than God's care.",
    ],
  },
  {
    reference: "Numbers 12:1-16",
    chapter: 12,
    startVerse: 1,
    endVerse: 16,
    heading: "Miriam And Aaron Speak Against Moses",
    summary: "Miriam and Aaron challenge Moses, and God defends the servant He appointed.",
    teaching: [
      "Numbers 12 brings rebellion into Moses' own family.",
      "Miriam and Aaron speak against Moses and question his unique role.",
      "God calls them to the tabernacle and makes clear that Moses is His chosen servant.",
      "Miriam is struck with leprosy, Moses intercedes, and the camp waits until she is restored.",
    ],
  },
  {
    reference: "Numbers 13:1-33",
    chapter: 13,
    startVerse: 1,
    endVerse: 33,
    heading: "Spies Search The Land",
    summary: "Twelve spies search Canaan, bring fruit from the land, and return with a divided report.",
    teaching: [
      "Numbers 13 brings Israel to the edge of promise.",
      "The spies see that the land truly is fruitful.",
      "But most of them focus on fortified cities, strong people, and giants.",
      "Caleb calls Israel to go up at once, but fear begins to drown out faith.",
    ],
  },
] as const;

const DAY_42_SECTIONS = [
  {
    reference: "Numbers 14:1-10",
    chapter: 14,
    startVerse: 1,
    endVerse: 10,
    heading: "The People Refuse The Promised Land",
    summary: "Israel weeps, accuses God, wants to return to Egypt, and rejects Caleb and Joshua's call to trust the LORD.",
    teaching: [
      "Numbers 14 shows unbelief becoming open rebellion.",
      "The people treat Egypt like safety and Canaan like death.",
      "Joshua and Caleb plead with them not to rebel against the LORD.",
      "The people respond by wanting to stone the faithful witnesses, but the glory of the LORD appears.",
    ],
  },
  {
    reference: "Numbers 14:11-25",
    chapter: 14,
    startVerse: 11,
    endVerse: 25,
    heading: "Moses Intercedes For A Rebellious People",
    summary: "God speaks of judgment, and Moses pleads according to the LORD's name, mercy, and reputation among the nations.",
    teaching: [
      "Moses intercedes again for Israel.",
      "He does not pretend the sin is small.",
      "He appeals to God's revealed character: longsuffering, great mercy, forgiving iniquity, yet not clearing the guilty.",
      "The LORD pardons, but the unbelieving generation will not enter the land.",
    ],
  },
  {
    reference: "Numbers 14:26-45",
    chapter: 14,
    startVerse: 26,
    endVerse: 45,
    heading: "Forty Years And Presumptuous Defeat",
    summary: "God sentences the generation to wander forty years, and the people suffer defeat when they try to go up without Him.",
    teaching: [
      "The forty days of spying become forty years of wilderness wandering.",
      "The children will enter the land, but the unbelieving adults will fall in the wilderness.",
      "When the people try to go up after God has said no, they are defeated.",
      "Presumption is not faith; obedience must follow God's word.",
    ],
  },
  {
    reference: "Numbers 15:1-41",
    chapter: 15,
    startVerse: 1,
    endVerse: 41,
    heading: "Offerings, Sabbath, And Fringes",
    summary: "God gives laws for offerings, sins of ignorance, Sabbath rebellion, and fringes that help Israel remember His commandments.",
    teaching: [
      "Numbers 15 comes after the judgment of Numbers 14, and that matters.",
      "God still speaks about offerings in the land, which means His promise is not dead.",
      "The chapter also shows the seriousness of high-handed sin.",
      "The fringes on garments become a daily reminder to remember and do the commandments of the LORD.",
    ],
  },
  {
    reference: "Numbers 16:1-50",
    chapter: 16,
    startVerse: 1,
    endVerse: 50,
    heading: "Korah's Rebellion",
    summary: "Korah and others challenge Moses and Aaron, and God judges the rebellion while Aaron stands between the dead and the living.",
    teaching: [
      "Korah's rebellion is not a small disagreement.",
      "It challenges the leadership and priesthood God appointed.",
      "The earth opens, fire consumes, and a plague breaks out among the people.",
      "Aaron runs with incense and stands between the dead and the living, showing priestly mediation in a moment of judgment.",
    ],
  },
  {
    reference: "Numbers 17:1-13",
    chapter: 17,
    startVerse: 1,
    endVerse: 13,
    heading: "Aaron's Rod Buds",
    summary: "God confirms Aaron's priesthood by making his rod bud, blossom, and bear almonds.",
    teaching: [
      "Numbers 17 answers the question of priesthood with a sign of life.",
      "Each tribal rod is placed before the LORD.",
      "Aaron's rod alone buds, blossoms, and bears almonds.",
      "God confirms His chosen priesthood so the murmuring will stop.",
    ],
  },
] as const;

const DAY_43_SECTIONS = [
  {
    reference: "Numbers 18:1-32",
    chapter: 18,
    startVerse: 1,
    endVerse: 32,
    heading: "Priests, Levites, And Holy Provision",
    summary: "God gives priests and Levites their responsibilities and provision from holy gifts and tithes.",
    teaching: [
      "Numbers 18 follows the rebellion and budding rod by clarifying priestly responsibility.",
      "Aaron and his sons bear the iniquity of the sanctuary and priesthood.",
      "The Levites are given to help, but they must not intrude into priestly service.",
      "God also provides for priests and Levites through holy gifts and tithes.",
    ],
  },
  {
    reference: "Numbers 19:1-22",
    chapter: 19,
    startVerse: 1,
    endVerse: 22,
    heading: "The Red Heifer And Cleansing From Death",
    summary: "God gives the water of separation for cleansing those defiled by contact with death.",
    teaching: [
      "Numbers 19 deals with uncleanness from death.",
      "A red heifer is burned outside the camp, and its ashes are used with water for purification.",
      "This matters in a wilderness where a generation will die because of unbelief.",
      "God provides a way for death's uncleanness to be cleansed so the camp can remain near His presence.",
    ],
  },
  {
    reference: "Numbers 20:1-13",
    chapter: 20,
    startVerse: 1,
    endVerse: 13,
    heading: "Water From The Rock And Moses' Sin",
    summary: "The people complain for water, and Moses dishonors God by striking the rock instead of speaking to it.",
    teaching: [
      "Numbers 20 begins with Miriam's death and another water crisis.",
      "God tells Moses to speak to the rock.",
      "Moses strikes the rock and speaks harshly to the people.",
      "Water comes out, but Moses and Aaron fail to sanctify the LORD before Israel and will not bring the congregation into the land.",
    ],
  },
  {
    reference: "Numbers 20:14-29",
    chapter: 20,
    startVerse: 14,
    endVerse: 29,
    heading: "Edom Refuses Passage And Aaron Dies",
    summary: "Edom refuses Israel passage, and Aaron dies on Mount Hor as Eleazar receives the priestly garments.",
    teaching: [
      "Israel asks Edom for passage as a brother nation descended from Esau.",
      "Edom refuses and comes out with force.",
      "The chapter then moves to Aaron's death.",
      "His garments are placed on Eleazar, showing that the priesthood continues even as one generation passes away.",
    ],
  },
  {
    reference: "Numbers 21:1-9",
    chapter: 21,
    startVerse: 1,
    endVerse: 9,
    heading: "Fiery Serpents And The Bronze Serpent",
    summary: "Israel complains again, serpents bite the people, and God provides healing through the serpent of brass.",
    teaching: [
      "Numbers 21 shows complaint bringing deadly judgment.",
      "The people confess that they have sinned.",
      "God tells Moses to make a serpent of brass and lift it on a pole.",
      "Whoever looks lives, making this one of the clearest mercy-in-judgment pictures in Numbers.",
    ],
  },
  {
    reference: "Numbers 21:10-35",
    chapter: 21,
    startVerse: 10,
    endVerse: 35,
    heading: "Wells, Songs, And Victories",
    summary: "Israel journeys on, receives water, sings, and defeats Sihon and Og.",
    teaching: [
      "The chapter ends with movement and victory.",
      "Israel receives water at Beer and sings about the well.",
      "Sihon refuses passage and fights Israel.",
      "The LORD gives victory over Sihon and Og, showing that the journey toward the land is moving forward despite earlier failure.",
    ],
  },
] as const;

const DAY_44_SECTIONS = [
  {
    reference: "Numbers 22:1-21",
    chapter: 22,
    startVerse: 1,
    endVerse: 21,
    heading: "Balak Calls Balaam",
    summary: "Balak fears Israel and sends for Balaam to curse the people God has blessed.",
    teaching: [
      "Numbers 22 begins in the plains of Moab.",
      "Balak sees Israel and fears what they might do.",
      "He sends for Balaam because he wants spiritual power used against God's people.",
      "But the LORD makes clear that Balaam must not curse Israel, because they are blessed.",
    ],
  },
  {
    reference: "Numbers 22:22-41",
    chapter: 22,
    startVerse: 22,
    endVerse: 41,
    heading: "The Angel, The Donkey, And Balaam's Blindness",
    summary: "The donkey sees the angel of the LORD before Balaam does, exposing Balaam's spiritual blindness.",
    teaching: [
      "This is one of the most memorable scenes in Numbers.",
      "Balaam is supposed to be a seer, but his donkey sees the angel before he does.",
      "The LORD opens the donkey's mouth and then opens Balaam's eyes.",
      "The scene exposes Balaam's danger and shows that God controls the road, the prophet, the animal, and the outcome.",
    ],
  },
  {
    reference: "Numbers 23:1-30",
    chapter: 23,
    startVerse: 1,
    endVerse: 30,
    heading: "Balaam Blesses Instead Of Cursing",
    summary: "Balaam repeatedly blesses Israel because he can only speak the word God puts in his mouth.",
    teaching: [
      "Balak wants a curse, but God gives blessing.",
      "Balaam cannot reverse what God has spoken.",
      "The words over Israel highlight God's faithfulness, strength, and covenant blessing.",
      "Balak keeps changing locations, but changing the view cannot change the LORD's purpose.",
    ],
  },
  {
    reference: "Numbers 24:1-25",
    chapter: 24,
    startVerse: 1,
    endVerse: 25,
    heading: "A Star Shall Come Out Of Jacob",
    summary: "Balaam gives further blessing and speaks of a future ruler coming from Jacob.",
    teaching: [
      "Numbers 24 takes the blessing even higher.",
      "Balaam sees Israel's tents and the Spirit of God comes upon him.",
      "He blesses Israel and speaks of a star coming out of Jacob and a scepter rising out of Israel.",
      "This points beyond the immediate story to God's larger plan for kingship and victory.",
    ],
  },
  {
    reference: "Numbers 25:1-18",
    chapter: 25,
    startVerse: 1,
    endVerse: 18,
    heading: "Compromise At Baalpeor",
    summary: "Israel joins itself to Baalpeor, judgment falls, and Phinehas turns away wrath through zeal for the LORD.",
    teaching: [
      "After all the failed attempts to curse Israel, compromise becomes the danger.",
      "Israel sins with Moabite women and joins itself to Baalpeor.",
      "The result is plague and judgment.",
      "Phinehas acts with zeal for the LORD, and God makes a covenant of peace with him.",
    ],
  },
] as const;

export const NUMBERS_DAY_FORTY_ONE_JOURNEY_COMPLAINTS_AND_SPIES_LESSON = makeLesson(
  41,
  "Journey, Complaints, and Spies",
  "Numbers 10-13",
  "20-30 min",
  [
    "Day 41 follows Israel as they finally set forward from Sinai.",
    "The camp moves by God's command, but the journey quickly exposes complaint, craving, leadership pressure, family rebellion, and fear at the edge of the promised land.",
    "Numbers 10-13 teaches that being led by God does not remove testing; it reveals whether His people trust Him.",
  ],
  DAY_41_SECTIONS,
  [
    "Day 41 teaches that the wilderness exposes the heart.",
    "God leads Israel forward, but complaints, cravings, rivalry, and fear show how deeply the people still need trust.",
  ],
);

export const NUMBERS_DAY_FORTY_TWO_REBELLION_AND_CHOSEN_PRIESTHOOD_LESSON = makeLesson(
  42,
  "Rebellion and God's Chosen Priesthood",
  "Numbers 14-17",
  "20-30 min",
  [
    "Day 42 shows the terrible cost of unbelief and rebellion.",
    "Israel refuses the promised land, Moses intercedes, a generation is sentenced to wander, and Korah challenges God's appointed leadership.",
    "Yet God confirms Aaron's priesthood with a sign of life: a dead rod that buds, blossoms, and bears fruit.",
  ],
  DAY_42_SECTIONS,
  [
    "Day 42 teaches that unbelief is not harmless.",
    "But it also shows God's mercy, God's appointed mediator, and God's power to bring life where there should only be dead wood.",
  ],
);

export const NUMBERS_DAY_FORTY_THREE_PROVISION_JUDGMENT_AND_BRONZE_SERPENT_LESSON = makeLesson(
  43,
  "Provision, Judgment, and the Bronze Serpent",
  "Numbers 18-21",
  "20-30 min",
  [
    "Day 43 moves through priestly provision, cleansing from death, water from the rock, Aaron's death, serpents in the camp, and victories on the road.",
    "These chapters show the wilderness generation facing death, failure, judgment, mercy, and continued movement toward the land.",
    "The bronze serpent becomes a powerful picture of healing by looking to the provision God gives.",
  ],
  DAY_43_SECTIONS,
  [
    "Day 43 teaches that the wilderness contains both judgment and mercy.",
    "God exposes sin, provides cleansing, gives water, preserves priesthood, heals bitten people, and keeps the journey moving.",
  ],
);

export const NUMBERS_DAY_FORTY_FOUR_BALAAM_BLESSING_AND_COMPROMISE_LESSON = makeLesson(
  44,
  "Balaam, Blessing, and Compromise",
  "Numbers 22-25",
  "20-30 min",
  [
    "Day 44 follows Balak and Balaam as Moab tries to curse Israel from the outside.",
    "God turns attempted curses into blessing, speaks through Balaam, and even uses a donkey to expose spiritual blindness.",
    "But after the curses fail, Israel is attacked through compromise at Baalpeor.",
  ],
  DAY_44_SECTIONS,
  [
    "Day 44 teaches that no curse can overturn God's blessing.",
    "But God's people must still guard their hearts, because compromise can harm from within when opposition fails from without.",
  ],
);

export const BIBLE_YEAR_DAY_FORTY_ONE_DEEP_NOTES = makeDeepNotes(
  "Journey, Complaints, and Spies",
  ["Numbers 10", "Numbers 11", "Numbers 12", "Numbers 13"],
  NUMBERS_DAY_FORTY_ONE_JOURNEY_COMPLAINTS_AND_SPIES_LESSON.opening,
  DAY_41_SECTIONS,
  NUMBERS_DAY_FORTY_ONE_JOURNEY_COMPLAINTS_AND_SPIES_LESSON.closing,
);

export const BIBLE_YEAR_DAY_FORTY_TWO_DEEP_NOTES = makeDeepNotes(
  "Rebellion and God's Chosen Priesthood",
  ["Numbers 14", "Numbers 15", "Numbers 16", "Numbers 17"],
  NUMBERS_DAY_FORTY_TWO_REBELLION_AND_CHOSEN_PRIESTHOOD_LESSON.opening,
  DAY_42_SECTIONS,
  NUMBERS_DAY_FORTY_TWO_REBELLION_AND_CHOSEN_PRIESTHOOD_LESSON.closing,
);

export const BIBLE_YEAR_DAY_FORTY_THREE_DEEP_NOTES = makeDeepNotes(
  "Provision, Judgment, and the Bronze Serpent",
  ["Numbers 18", "Numbers 19", "Numbers 20", "Numbers 21"],
  NUMBERS_DAY_FORTY_THREE_PROVISION_JUDGMENT_AND_BRONZE_SERPENT_LESSON.opening,
  DAY_43_SECTIONS,
  NUMBERS_DAY_FORTY_THREE_PROVISION_JUDGMENT_AND_BRONZE_SERPENT_LESSON.closing,
);

export const BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_NOTES = makeDeepNotes(
  "Balaam, Blessing, and Compromise",
  ["Numbers 22", "Numbers 23", "Numbers 24", "Numbers 25"],
  NUMBERS_DAY_FORTY_FOUR_BALAAM_BLESSING_AND_COMPROMISE_LESSON.opening,
  DAY_44_SECTIONS,
  NUMBERS_DAY_FORTY_FOUR_BALAAM_BLESSING_AND_COMPROMISE_LESSON.closing,
);

export const BIBLE_YEAR_DAY_FORTY_ONE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_41_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_TWO_DEEP_STUDY_SECTIONS = makeStudySections(DAY_42_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_THREE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_43_SECTIONS);
export const BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_STUDY_SECTIONS = makeStudySections(DAY_44_SECTIONS);
