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

The big idea is this: ${title} helps the reader follow Saul, David, obedience, fear, courage, mercy, and God's patient movement toward the king He has chosen.`;
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
The LORD remains the true King over Israel, even while human kings rise, fail, fear, and fight.

### Saul
Saul's story shows the danger of outward success without a heart that listens carefully to God.

### David
David is introduced as the chosen king, but his road to the throne passes through danger, waiting, mercy, and trust.

### Obedience
These chapters keep asking whether God's word will be honored when pressure, fear, and opportunity appear.

## What This Means

1 Samuel is not only telling political history.

It is teaching the reader what kind of king Israel needs and why God's choice matters more than human appearance.`,
  }));
}

const DAY_71_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 11:1-15",
    chapter: 11,
    startVerse: 1,
    endVerse: 15,
    heading: "Saul Rescues Jabeshgilead",
    summary: "Saul's first public victory rescues Jabeshgilead and renews the kingdom at Gilgal.",
    teaching: [
      "1 Samuel 11 shows Saul at his strongest early moment.",
      "Nahash threatens Jabeshgilead with shame and violence, and Israel needs a rescuer.",
      "The Spirit of God comes upon Saul, and he gathers Israel for battle.",
      "The victory is credited to the LORD, so Saul's kingship begins with mercy, deliverance, and worship at Gilgal.",
    ],
  },
  {
    reference: "1 Samuel 12:1-25",
    chapter: 12,
    startVerse: 1,
    endVerse: 25,
    heading: "Samuel Warns Israel",
    summary: "Samuel reviews Israel's history, confronts their request for a king, and calls them to serve the LORD faithfully.",
    teaching: [
      "Samuel stands before Israel as a faithful prophet whose hands are clean.",
      "He reminds the people that the LORD has rescued them again and again.",
      "Their request for a king came from fear, but the LORD still calls them to obedience.",
      "The thunder and rain make the warning visible: Israel has a king, but they must not turn away from the LORD.",
    ],
  },
  {
    reference: "1 Samuel 13:1-23",
    chapter: 13,
    startVerse: 1,
    endVerse: 23,
    heading: "Saul Offers Unlawfully",
    summary: "Saul grows afraid, offers the burnt offering himself, and hears that his kingdom will not continue.",
    teaching: [
      "1 Samuel 13 shows the first major crack in Saul's kingship.",
      "The Philistines gather with overwhelming strength, and Saul's people begin to scatter.",
      "Instead of waiting for Samuel, Saul offers the sacrifice himself.",
      "Samuel explains that the LORD is seeking a man after His own heart, not a king who obeys only when obedience feels safe.",
    ],
  },
  {
    reference: "1 Samuel 14:1-52",
    chapter: 14,
    startVerse: 1,
    endVerse: 52,
    heading: "Jonathan's Faith And Saul's Rash Oath",
    summary: "Jonathan trusts the LORD for victory while Saul's rash oath weakens the army and nearly costs Jonathan his life.",
    teaching: [
      "Jonathan steps forward with brave faith while Saul's leadership is confused and fearful.",
      "Jonathan knows the LORD can save by many or by few.",
      "The victory begins through faith, but Saul's oath puts unnecessary pressure on the people.",
      "The chapter contrasts Jonathan's trust with Saul's impulsive leadership.",
    ],
  },
];

const DAY_72_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 15:1-35",
    chapter: 15,
    startVerse: 1,
    endVerse: 35,
    heading: "Saul Is Rejected",
    summary: "Saul spares what God commanded him to destroy, and Samuel declares that obedience is better than sacrifice.",
    teaching: [
      "1 Samuel 15 is the turning point of Saul's reign.",
      "Saul is given a clear command concerning Amalek, but he keeps Agag alive and preserves the best of the spoil.",
      "He tries to dress disobedience in religious language, saying the animals are for sacrifice.",
      "Samuel's answer is sharp and clear: obedience matters more than religious appearance.",
    ],
  },
  {
    reference: "1 Samuel 16:1-23",
    chapter: 16,
    startVerse: 1,
    endVerse: 23,
    heading: "David Is Anointed",
    summary: "The LORD sends Samuel to Bethlehem, chooses David, and the Spirit comes upon him.",
    teaching: [
      "The LORD tells Samuel not to judge by outward appearance.",
      "David is the youngest son and is still keeping the sheep, but God sees his heart.",
      "When David is anointed, the Spirit of the LORD comes upon him.",
      "At the same time, Saul is troubled, and David enters Saul's service as a harp player.",
    ],
  },
  {
    reference: "1 Samuel 17:1-58",
    chapter: 17,
    startVerse: 1,
    endVerse: 58,
    heading: "David And Goliath",
    summary: "David faces Goliath in the name of the LORD and shows Israel that the battle belongs to God.",
    teaching: [
      "Goliath's challenge is not only against Israel's army. It is against the living God.",
      "David sees the battle through faith, while Saul and Israel see only size and danger.",
      "David refuses Saul's armor because his confidence is not in military appearance.",
      "The stone, the sling, and the victory all point to this truth: the battle is the LORD's.",
    ],
  },
  {
    reference: "1 Samuel 18:1-30",
    chapter: 18,
    startVerse: 1,
    endVerse: 30,
    heading: "David Rises And Saul Grows Jealous",
    summary: "David gains favor with Jonathan, the people, and the LORD, while Saul becomes jealous and afraid.",
    teaching: [
      "David's success creates joy in Israel but fear in Saul.",
      "Jonathan loves David and makes a covenant with him.",
      "The women's song exposes Saul's jealousy, and he begins to see David as a threat.",
      "David behaves wisely, and the LORD is with him, which only makes Saul more afraid.",
    ],
  },
];

const DAY_73_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 19:1-24",
    chapter: 19,
    startVerse: 1,
    endVerse: 24,
    heading: "Saul Tries To Kill David",
    summary: "Saul's jealousy becomes open violence, but Jonathan, Michal, and the LORD preserve David.",
    teaching: [
      "1 Samuel 19 shows Saul's heart moving from suspicion to murder.",
      "Jonathan speaks for David because David has done Saul no wrong.",
      "Michal helps David escape through a window when Saul sends men to take him.",
      "Even Saul's messengers are stopped when the Spirit of God comes upon them.",
    ],
  },
  {
    reference: "1 Samuel 20:1-42",
    chapter: 20,
    startVerse: 1,
    endVerse: 42,
    heading: "Jonathan Protects David",
    summary: "Jonathan confirms Saul's murderous intent and renews covenant loyalty with David.",
    teaching: [
      "Jonathan stands between his father's anger and David's danger.",
      "The new moon feast becomes the test that reveals Saul's heart.",
      "Saul's rage against Jonathan shows how far jealousy has twisted him.",
      "David and Jonathan part in grief, but their covenant loyalty remains strong.",
    ],
  },
  {
    reference: "1 Samuel 21:1-15",
    chapter: 21,
    startVerse: 1,
    endVerse: 15,
    heading: "David Flees To Nob And Gath",
    summary: "David receives holy bread and Goliath's sword, then flees into Philistine territory.",
    teaching: [
      "David is now a fugitive, and his choices become pressured and complicated.",
      "At Nob, Ahimelech gives him bread and the sword of Goliath.",
      "Doeg the Edomite sees what happens, which will matter terribly in the next chapter.",
      "David then flees to Gath and acts like a madman to escape danger.",
    ],
  },
  {
    reference: "1 Samuel 22:1-23",
    chapter: 22,
    startVerse: 1,
    endVerse: 23,
    heading: "David Hides And Saul Kills The Priests",
    summary: "David gathers distressed people while Saul murders the priests of Nob through Doeg.",
    teaching: [
      "David hides in the cave of Adullam, and broken people gather around him.",
      "Saul sits with a spear in his hand, suspicious of everyone around him.",
      "Doeg reports Ahimelech's help, and Saul orders a terrible slaughter.",
      "Abiathar escapes to David, and David takes responsibility for protecting him.",
    ],
  },
];

const DAY_74_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 23:1-29",
    chapter: 23,
    startVerse: 1,
    endVerse: 29,
    heading: "David Seeks The LORD While Saul Hunts Him",
    summary: "David rescues Keilah, seeks God's direction, and is strengthened by Jonathan while Saul continues hunting him.",
    teaching: [
      "David does not stop caring for Israel just because Saul is hunting him.",
      "He asks the LORD before going to Keilah and again before leaving it.",
      "Jonathan strengthens David's hand in God, reminding him of the LORD's promise.",
      "Saul nearly traps David, but the LORD makes a way of escape.",
    ],
  },
  {
    reference: "1 Samuel 24:1-22",
    chapter: 24,
    startVerse: 1,
    endVerse: 22,
    heading: "David Spares Saul In The Cave",
    summary: "David refuses to kill Saul when he has the chance and entrusts judgment to the LORD.",
    teaching: [
      "The cave scene tests David's heart when opportunity looks like permission.",
      "David cuts Saul's robe but will not strike the LORD's anointed.",
      "He proves his innocence by showing the robe piece and calling Saul his lord.",
      "David chooses mercy and trust instead of revenge.",
    ],
  },
  {
    reference: "1 Samuel 25:1-44",
    chapter: 25,
    startVerse: 1,
    endVerse: 44,
    heading: "Abigail Turns David From Bloodguilt",
    summary: "Nabal insults David, but Abigail acts with wisdom and keeps David from taking vengeance.",
    teaching: [
      "After Samuel dies, David faces another test of anger and restraint.",
      "Nabal repays David's protection with insult, and David prepares for revenge.",
      "Abigail moves quickly with humility, wisdom, and provision.",
      "Her words help David see that the LORD can handle justice without David staining his hands.",
    ],
  },
  {
    reference: "1 Samuel 26:1-25",
    chapter: 26,
    startVerse: 1,
    endVerse: 25,
    heading: "David Spares Saul Again",
    summary: "David enters Saul's camp, takes the spear and cruse, and again refuses to kill Saul.",
    teaching: [
      "The second sparing of Saul shows David's mercy was not accidental.",
      "David can reach Saul in the camp, but he will not take the kingdom by murder.",
      "The spear beside Saul becomes proof that David could have killed him.",
      "David waits for the LORD to judge and continues to honor God's timing.",
    ],
  },
];

const DAY_75_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 27:1-12",
    chapter: 27,
    startVerse: 1,
    endVerse: 12,
    heading: "David Lives Among The Philistines",
    summary: "David moves to Philistine territory and receives Ziklag from Achish.",
    teaching: [
      "David's long season of running leaves him weary and afraid.",
      "He moves into Philistine territory, where Saul stops searching for him.",
      "Achish gives David Ziklag, and David lives in a complicated exile.",
      "The chapter shows a faithful man under pressure making choices in a morally tangled place.",
    ],
  },
  {
    reference: "1 Samuel 28:1-25",
    chapter: 28,
    startVerse: 1,
    endVerse: 25,
    heading: "Saul Seeks A Medium",
    summary: "Saul receives no answer from the LORD and turns to forbidden spiritual counsel before his final battle.",
    teaching: [
      "Saul's story reaches a dark point when the Philistines gather for war.",
      "The LORD does not answer him by dreams, Urim, or prophets.",
      "Instead of repenting, Saul seeks a woman with a familiar spirit.",
      "Samuel's message is final: Saul's rebellion has brought judgment on his house.",
    ],
  },
  {
    reference: "1 Samuel 29:1-11",
    chapter: 29,
    startVerse: 1,
    endVerse: 11,
    heading: "The Philistines Send David Away",
    summary: "The Philistine rulers reject David from battle, keeping him from fighting against Israel.",
    teaching: [
      "David is caught in a dangerous position near the Philistine army.",
      "Achish trusts him, but the Philistine princes remember David's victories over them.",
      "Their rejection removes David from the battle where Saul will die.",
      "God's providence protects David even in the complications of exile.",
    ],
  },
  {
    reference: "1 Samuel 30:1-31",
    chapter: 30,
    startVerse: 1,
    endVerse: 31,
    heading: "David Recovers All At Ziklag",
    summary: "David strengthens himself in the LORD, pursues the Amalekites, recovers all, and shares the spoil generously.",
    teaching: [
      "David returns to Ziklag and finds it burned, with the families taken captive.",
      "His men are bitter enough to speak of stoning him.",
      "David strengthens himself in the LORD, asks God what to do, and receives direction.",
      "The rescue restores everyone, and David shares the spoil with mercy and wisdom.",
    ],
  },
];

export const FIRST_SAMUEL_DAY_SEVENTY_ONE_SAULS_RISE_AND_EARLY_FAILURE_LESSON = makeLesson(
  71,
  "Saul's Rise and Early Failure",
  "1 Samuel 11-14",
  DAY_71_SECTIONS,
  [
    "Today we watch Saul rise in public victory, then begin to crack under fear and pressure.",
    "The story will show rescue, warning, unlawful sacrifice, Jonathan's faith, and Saul's rash leadership.",
  ],
  [
    "Saul's story warns us that strong moments do not replace a listening heart.",
    "Jonathan's faith reminds us that the LORD can save by many or by few.",
  ],
);

export const FIRST_SAMUEL_DAY_SEVENTY_TWO_SAUL_REJECTED_AND_DAVID_APPEARS_LESSON = makeLesson(
  72,
  "Saul Is Rejected and David Appears",
  "1 Samuel 15-18",
  DAY_72_SECTIONS,
  [
    "Today Saul is rejected, David is anointed, and the famous battle with Goliath brings David into the open.",
    "The chapters turn the story from Saul's failing kingship toward the king God has chosen.",
  ],
  [
    "God sees the heart when people see appearance.",
    "David's courage grows from confidence in the living God, not confidence in himself.",
  ],
);

export const FIRST_SAMUEL_DAY_SEVENTY_THREE_DAVID_FLEES_FROM_SAUL_LESSON = makeLesson(
  73,
  "David Flees From Saul",
  "1 Samuel 19-22",
  DAY_73_SECTIONS,
  [
    "Today David becomes a fugitive.",
    "Saul's jealousy becomes dangerous, but God preserves David through covenant friendship, escape, and hidden protection.",
  ],
  [
    "David is chosen, but he is not rushed into comfort.",
    "The road to the throne passes through danger, grief, and dependence on God.",
  ],
);

export const FIRST_SAMUEL_DAY_SEVENTY_FOUR_DAVID_SPARES_SAUL_LESSON = makeLesson(
  74,
  "David Spares Saul",
  "1 Samuel 23-26",
  DAY_74_SECTIONS,
  [
    "Today David keeps refusing to seize the throne through revenge.",
    "He asks the LORD for direction, receives encouragement from Jonathan, and twice spares Saul's life.",
  ],
  [
    "David's restraint is part of his preparation.",
    "He learns to trust God's timing even when revenge looks easy.",
  ],
);

export const FIRST_SAMUEL_DAY_SEVENTY_FIVE_DAVID_IN_EXILE_LESSON = makeLesson(
  75,
  "David in Exile",
  "1 Samuel 27-30",
  DAY_75_SECTIONS,
  [
    "Today David lives in exile while Saul moves toward his final collapse.",
    "The chapters hold fear, deception, forbidden counsel, providence, grief, prayer, and rescue.",
  ],
  [
    "David's lowest moments still become places where he learns to seek the LORD.",
    "Saul's collapse warns us not to wait until crisis to listen to God's word.",
  ],
);

export const BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_NOTES = makeDeepNotes(
  "Saul's Rise and Early Failure",
  ["1 Samuel 11", "1 Samuel 12", "1 Samuel 13", "1 Samuel 14"],
  ["Day 71 follows Saul from public rescue to early failure.", "The day is important because Saul's kingship begins with promise, but pressure quickly exposes whether he will obey the LORD."],
  DAY_71_SECTIONS,
  ["Where does pressure tempt you to act before waiting on God?", "What does Jonathan's courage teach you about trusting the LORD with limited resources?"],
);

export const BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_NOTES = makeDeepNotes(
  "Saul Is Rejected and David Appears",
  ["1 Samuel 15", "1 Samuel 16", "1 Samuel 17", "1 Samuel 18"],
  ["Day 72 is a major turning point.", "Saul is rejected for disobedience, David is anointed in secret, and the battle with Goliath shows the kind of faith God is raising up."],
  DAY_72_SECTIONS,
  ["Where are you tempted to value appearance more than the heart?", "What would it look like to face fear in the name of the LORD?"],
);

export const BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_NOTES = makeDeepNotes(
  "David Flees From Saul",
  ["1 Samuel 19", "1 Samuel 20", "1 Samuel 21", "1 Samuel 22"],
  ["Day 73 follows David into danger.", "David has been chosen, but Saul's jealousy forces him into life as a fugitive."],
  DAY_73_SECTIONS,
  ["How can loyal friendship strengthen faith during danger?", "Where do you need to trust God while the path feels unstable?"],
);

export const BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_NOTES = makeDeepNotes(
  "David Spares Saul",
  ["1 Samuel 23", "1 Samuel 24", "1 Samuel 25", "1 Samuel 26"],
  ["Day 74 shows David learning restraint.", "David has chances to protect himself through revenge, but he keeps choosing the LORD's timing instead."],
  DAY_74_SECTIONS,
  ["Where are you tempted to take control instead of trusting God's timing?", "What does mercy look like when you have power over someone who has hurt you?"],
);

export const BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_NOTES = makeDeepNotes(
  "David in Exile",
  ["1 Samuel 27", "1 Samuel 28", "1 Samuel 29", "1 Samuel 30"],
  ["Day 75 follows David in exile and Saul in spiritual collapse.", "The contrast is painful: David strengthens himself in the LORD, while Saul seeks forbidden counsel after refusing God's word."],
  DAY_75_SECTIONS,
  ["What does it mean to strengthen yourself in the LORD during crisis?", "Where do you need to seek God's direction before reacting?"],
);

export const BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_71_SECTIONS);
export const BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_STUDY_SECTIONS = makeStudySections(DAY_72_SECTIONS);
export const BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_73_SECTIONS);
export const BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_STUDY_SECTIONS = makeStudySections(DAY_74_SECTIONS);
export const BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_75_SECTIONS);
