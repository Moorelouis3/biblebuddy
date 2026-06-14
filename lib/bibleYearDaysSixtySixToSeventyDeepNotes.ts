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

The big idea is this: ${title} helps the reader follow Israel from the collapse of the judges into the hope of faithful covenant love, prophetic leadership, and the beginning of kingship.`;
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
The LORD remains the true ruler even when Israel lacks faithful human leadership.

### Israel
Israel is God's covenant people, but these chapters show how badly they need wise leadership and faithful hearts.

### Covenant
Covenant loyalty is shown in worship, justice, family faithfulness, and trust in God's word.

### King
The request for a king grows out of real disorder, but it also exposes Israel's struggle to trust the LORD as King.

## What This Means

These chapters show the bridge from Judges into Ruth and 1 Samuel.

The story moves from collapse to quiet faithfulness, then toward Samuel and the beginning of Israel's monarchy.`,
  }));
}

const DAY_66_SECTIONS: DaySection[] = [
  {
    reference: "Judges 16:1-31",
    chapter: 16,
    startVerse: 1,
    endVerse: 31,
    heading: "Samson Falls And Dies",
    summary: "Samson's weakness with Delilah leads to capture, blindness, prayer, and a final blow against the Philistines.",
    teaching: [
      "Judges 16 shows Samson's strength and Samson's weakness standing side by side.",
      "Delilah presses him until he reveals the sign connected to his Nazirite calling.",
      "When the LORD departs from him, Samson discovers that his strength was never independent power.",
      "His final prayer shows a broken man depending on God one last time.",
    ],
  },
  {
    reference: "Judges 17:1-13",
    chapter: 17,
    startVerse: 1,
    endVerse: 13,
    heading: "Micah Makes A Private Shrine",
    summary: "Micah mixes the LORD's name with idol worship and hires a Levite to make his private religion feel legitimate.",
    teaching: [
      "Judges 17 moves from Samson's public conflict to household-level spiritual confusion.",
      "Micah uses religious language, but his worship is built around images God had forbidden.",
      "The hired Levite gives Micah false confidence that the LORD will bless what Micah has arranged.",
      "The chapter explains the atmosphere of Judges: every man did what was right in his own eyes.",
    ],
  },
  {
    reference: "Judges 18:1-31",
    chapter: 18,
    startVerse: 1,
    endVerse: 31,
    heading: "Dan Steals Worship And Takes Laish",
    summary: "The tribe of Dan steals Micah's shrine and sets up corrupt worship in its new city.",
    teaching: [
      "Judges 18 shows private idolatry spreading into tribal idolatry.",
      "Dan wants land, but the tribe also takes Micah's religious objects and priest.",
      "The chapter is not celebrating Dan's actions. It is showing how confused Israel has become.",
      "False worship moves easily when people want religious success more than obedience to the LORD.",
    ],
  },
  {
    reference: "Judges 19:1-30",
    chapter: 19,
    startVerse: 1,
    endVerse: 30,
    heading: "Gibeah's Horror",
    summary: "A violent crime in Gibeah exposes how deeply Israel has collapsed without faithful covenant order.",
    teaching: [
      "Judges 19 is intentionally painful because it shows the moral collapse of Israel from the inside.",
      "The story begins with no king in Israel and ends with the nation being called to consider what has happened.",
      "Hospitality fails, violence erupts, and vulnerable people suffer.",
      "The chapter makes the reader feel the need for righteous leadership and true obedience to God.",
    ],
  },
];

const DAY_67_SECTIONS: DaySection[] = [
  {
    reference: "Judges 20:1-48",
    chapter: 20,
    startVerse: 1,
    endVerse: 48,
    heading: "Civil War In Israel",
    summary: "Israel gathers to judge Gibeah, but Benjamin refuses to surrender the guilty men and civil war follows.",
    teaching: [
      "Judges 20 shows Israel responding to evil, but the response becomes a devastating civil war.",
      "Benjamin protects Gibeah instead of handing over the guilty men.",
      "The battle wounds the whole nation, even when judgment finally falls.",
      "The chapter teaches that sin inside the covenant people can tear the community apart.",
    ],
  },
  {
    reference: "Judges 21:1-25",
    chapter: 21,
    startVerse: 1,
    endVerse: 25,
    heading: "Benjamin Is Nearly Lost",
    summary: "Israel grieves the near destruction of Benjamin and tries to preserve the tribe through troubling human schemes.",
    teaching: [
      "Judges 21 shows the bitter aftermath of Israel's civil war.",
      "The people are grieved that one tribe is nearly missing from Israel.",
      "Their attempts to solve the crisis still reveal confusion, vows made rashly, and vulnerable people being harmed.",
      "Judges ends by repeating the diagnosis: there was no king in Israel, and everyone did what was right in his own eyes.",
    ],
  },
  {
    reference: "Ruth 1:1-22",
    chapter: 1,
    startVerse: 1,
    endVerse: 22,
    heading: "Ruth Clings To Naomi",
    summary: "In the days of the judges, Naomi returns empty from Moab, but Ruth clings to her and chooses Naomi's God.",
    teaching: [
      "Ruth begins in the days when the judges ruled, but the tone changes from national collapse to quiet covenant loyalty.",
      "Naomi returns to Bethlehem grieving and bitter after losing her husband and sons.",
      "Ruth's commitment to Naomi is one of the Bible's clearest pictures of loyal love.",
      "The chapter ends at the beginning of barley harvest, quietly hinting that God is already bringing hope.",
    ],
  },
  {
    reference: "Ruth 2:1-23",
    chapter: 2,
    startVerse: 1,
    endVerse: 23,
    heading: "Ruth Gleans In Boaz's Field",
    summary: "Ruth finds favor in Boaz's field, and Naomi begins to see that a redeemer may be near.",
    teaching: [
      "Ruth 2 shows God's kindness through ordinary work, lawful provision, and a righteous man named Boaz.",
      "Gleaning allowed the poor and foreigner to gather food with dignity.",
      "Boaz protects Ruth, blesses her, and provides more than she expected.",
      "Naomi begins to recognize that the LORD has not abandoned the living or the dead.",
    ],
  },
];

const DAY_68_SECTIONS: DaySection[] = [
  {
    reference: "Ruth 3:1-18",
    chapter: 3,
    startVerse: 1,
    endVerse: 18,
    heading: "Ruth Asks For Redemption",
    summary: "Ruth asks Boaz to act as kinsman redeemer, and Boaz responds with honor and wisdom.",
    teaching: [
      "Ruth 3 is not a random romantic scene. It is about lawful redemption, family protection, and covenant kindness.",
      "Ruth asks Boaz to spread his covering over her because he is a near kinsman.",
      "Boaz protects her reputation and promises to handle the matter properly.",
      "The chapter shows courageous faith and righteous restraint working together.",
    ],
  },
  {
    reference: "Ruth 4:1-22",
    chapter: 4,
    startVerse: 1,
    endVerse: 22,
    heading: "Boaz Redeems Ruth",
    summary: "Boaz redeems Ruth publicly, Obed is born, and the book closes by pointing to David.",
    teaching: [
      "Ruth 4 brings the redemption to the city gate, where legal matters were witnessed publicly.",
      "Boaz redeems the land and takes responsibility for Ruth and the family line.",
      "The birth of Obed restores joy to Naomi and carries the story toward Jesse and David.",
      "A small story of faithful love becomes part of God's larger plan for Israel's king.",
    ],
  },
  {
    reference: "1 Samuel 1:1-28",
    chapter: 1,
    startVerse: 1,
    endVerse: 28,
    heading: "Hannah Prays For A Son",
    summary: "Hannah pours out her soul before the LORD, receives Samuel, and gives him back to God's service.",
    teaching: [
      "First Samuel begins with Hannah's sorrow and prayer.",
      "Her pain is personal, but God uses her prayer to begin a major new movement in Israel's history.",
      "Samuel is born as an answer to prayer and then dedicated to the LORD.",
      "The chapter teaches that God can begin public renewal through private suffering and faithful prayer.",
    ],
  },
  {
    reference: "1 Samuel 2:1-36",
    chapter: 2,
    startVerse: 1,
    endVerse: 36,
    heading: "Hannah's Song And Eli's House",
    summary: "Hannah praises the LORD's reversals while Eli's sons corrupt worship and receive judgment.",
    teaching: [
      "First Samuel 2 places Hannah's worship beside the corruption of Eli's sons.",
      "Hannah's song celebrates the LORD who raises the lowly and brings down the proud.",
      "Hophni and Phinehas abuse holy worship and cause people to despise the offering of the LORD.",
      "The chapter promises that God will raise up a faithful priest.",
    ],
  },
];

const DAY_69_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 3:1-21",
    chapter: 3,
    startVerse: 1,
    endVerse: 21,
    heading: "Samuel Hears The LORD",
    summary: "The LORD calls Samuel, gives him a hard message, and establishes him as a prophet.",
    teaching: [
      "First Samuel 3 shows God's word coming in a spiritually dark time.",
      "Samuel learns to say, Speak, LORD; for thy servant heareth.",
      "The first message he receives is difficult because it concerns judgment on Eli's house.",
      "The chapter ends with all Israel knowing that Samuel is established as a prophet of the LORD.",
    ],
  },
  {
    reference: "1 Samuel 4:1-22",
    chapter: 4,
    startVerse: 1,
    endVerse: 22,
    heading: "The Ark Is Taken",
    summary: "Israel treats the ark like a battle tool, loses to the Philistines, and the glory departs from Israel.",
    teaching: [
      "First Samuel 4 warns against treating holy things like magic objects.",
      "Israel brings the ark into battle without humble repentance or true dependence on the LORD.",
      "The ark is taken, Eli dies, and the child Ichabod is named as a sign that glory has departed.",
      "The chapter shows that God's presence cannot be controlled by religious symbols.",
    ],
  },
  {
    reference: "1 Samuel 5:1-12",
    chapter: 5,
    startVerse: 1,
    endVerse: 12,
    heading: "Dagon Falls Before The Ark",
    summary: "The Philistines place the ark in Dagon's temple, but the LORD humiliates the idol and afflicts Philistine cities.",
    teaching: [
      "First Samuel 5 shows that the LORD is not defeated just because Israel lost a battle.",
      "Dagon falls before the ark, and then the idol is broken.",
      "The Philistines move the ark from city to city, but the hand of the LORD remains heavy.",
      "The chapter teaches that the living God needs no army to defend His glory.",
    ],
  },
  {
    reference: "1 Samuel 6:1-21",
    chapter: 6,
    startVerse: 1,
    endVerse: 21,
    heading: "The Ark Returns",
    summary: "The Philistines send the ark back, the cows go straight to Bethshemesh, and Israel must still treat the LORD as holy.",
    teaching: [
      "First Samuel 6 shows the Philistines acknowledging that Israel's God must be honored.",
      "The cows going straight to Bethshemesh confirms that the LORD's hand was behind what happened.",
      "Israel rejoices when the ark returns, but the chapter also warns that God's holiness cannot be treated lightly.",
      "The ark's return brings joy and holy fear together.",
    ],
  },
];

const DAY_70_SECTIONS: DaySection[] = [
  {
    reference: "1 Samuel 7:1-17",
    chapter: 7,
    startVerse: 1,
    endVerse: 17,
    heading: "Israel Returns And Ebenezer Is Raised",
    summary: "Samuel calls Israel to put away idols, the LORD delivers them from the Philistines, and Ebenezer marks God's help.",
    teaching: [
      "First Samuel 7 shows Israel returning to the LORD with repentance.",
      "Samuel calls them to prepare their hearts and put away strange gods.",
      "When the Philistines threaten, the LORD thunders against them and delivers Israel.",
      "Ebenezer means the people must remember that the LORD has helped them this far.",
    ],
  },
  {
    reference: "1 Samuel 8:1-22",
    chapter: 8,
    startVerse: 1,
    endVerse: 22,
    heading: "Israel Demands A King",
    summary: "Israel asks for a king like the nations, and Samuel warns them about the cost of their request.",
    teaching: [
      "First Samuel 8 is the turning point toward monarchy.",
      "The people's request grows out of real leadership failure, but it also exposes their desire to be like the nations.",
      "God says the deeper rejection is against Him.",
      "Samuel warns that the king will take, but the people still demand a king.",
    ],
  },
  {
    reference: "1 Samuel 9:1-27",
    chapter: 9,
    startVerse: 1,
    endVerse: 27,
    heading: "Saul Meets Samuel",
    summary: "Saul searches for lost donkeys, but God's hidden providence brings him to Samuel.",
    teaching: [
      "First Samuel 9 introduces Saul through an ordinary family problem.",
      "Lost donkeys lead Saul to the prophet Samuel, but God has already prepared the meeting.",
      "Saul looks impressive, yet he is surprised that God would choose someone from Benjamin.",
      "The chapter shows God's providence working through ordinary roads and conversations.",
    ],
  },
  {
    reference: "1 Samuel 10:1-27",
    chapter: 10,
    startVerse: 1,
    endVerse: 27,
    heading: "Saul Is Anointed And Presented",
    summary: "Samuel anoints Saul, God gives him another heart, and Saul is publicly chosen as king.",
    teaching: [
      "First Samuel 10 moves Saul from private anointing to public recognition.",
      "The oil, signs, and Spirit show that Saul's role is given under God's authority.",
      "God gives Saul another heart and confirms the calling before the people.",
      "The chapter ends with hope and tension: Saul is chosen, but not everyone receives him gladly.",
    ],
  },
];

export const JUDGES_DAY_SIXTY_SIX_SAMSON_FALLS_AND_ISRAEL_UNRAVELS_LESSON = makeLesson(
  66,
  "Samson Falls and Israel Unravels",
  "Judges 16-19",
  DAY_66_SECTIONS,
  [
    "Day 66 finishes Samson's story and then shows Israel unraveling from household idolatry to public violence.",
    "The book of Judges is pressing one question into the reader: what happens when God's people do what is right in their own eyes?",
  ],
  [
    "Day 66 teaches that strength without faithfulness cannot save.",
    "Israel needs more than gifted leaders. Israel needs hearts ruled by the LORD.",
  ],
);

export const JUDGES_RUTH_DAY_SIXTY_SEVEN_CIVIL_WAR_AND_RUTHS_LOYAL_LOVE_LESSON = makeLesson(
  67,
  "Civil War and Ruth's Loyal Love",
  "Judges 20-21; Ruth 1-2",
  DAY_67_SECTIONS,
  [
    "Day 67 moves from the grief of Israel's civil war into the quiet faithfulness of Ruth.",
    "The contrast matters: Judges ends with everyone doing what is right in their own eyes, while Ruth begins showing loyal love in ordinary life.",
  ],
  [
    "Day 67 teaches that God can preserve hope in small acts of loyalty.",
    "Even in the days of the judges, the LORD is quietly preparing the line that will lead to David.",
  ],
);

export const RUTH_SAMUEL_DAY_SIXTY_EIGHT_REDEMPTION_AND_SAMUELS_BIRTH_LESSON = makeLesson(
  68,
  "Redemption and Samuel's Birth",
  "Ruth 3-4; 1 Samuel 1-2",
  DAY_68_SECTIONS,
  [
    "Day 68 moves from Boaz redeeming Ruth to Hannah praying for Samuel.",
    "Both stories show God working through vulnerable women, faithful prayer, and ordinary family life.",
  ],
  [
    "Day 68 teaches that redemption and renewal often begin quietly.",
    "God is preparing David's line through Ruth and prophetic leadership through Hannah's son Samuel.",
  ],
);

export const FIRST_SAMUEL_DAY_SIXTY_NINE_SAMUEL_HEARS_GOD_AND_ARK_TAKEN_LESSON = makeLesson(
  69,
  "Samuel Hears God and the Ark Is Taken",
  "1 Samuel 3-6",
  DAY_69_SECTIONS,
  [
    "Day 69 shows Samuel hearing the LORD and Israel learning that God's presence cannot be controlled.",
    "The ark is taken, Dagon falls, and the LORD defends His own glory.",
  ],
  [
    "Day 69 teaches that God's word and God's holiness must be received with reverence.",
    "The LORD is not weak when His people are defeated. He remains holy, powerful, and sovereign.",
  ],
);

export const FIRST_SAMUEL_DAY_SEVENTY_ISRAEL_ASKS_FOR_A_KING_LESSON = makeLesson(
  70,
  "Israel Asks for a King",
  "1 Samuel 7-10",
  DAY_70_SECTIONS,
  [
    "Day 70 moves from repentance and Ebenezer to Israel's demand for a king.",
    "Samuel leads faithfully, but the people want to be like the nations around them.",
  ],
  [
    "Day 70 teaches that the desire for human leadership can reveal what the heart trusts.",
    "Saul's story begins with real promise, but the deeper question remains: will Israel trust the LORD as King?",
  ],
);

export const BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_NOTES = makeDeepNotes("Samson Falls and Israel Unravels", ["Judges 16", "Judges 17", "Judges 18", "Judges 19"], JUDGES_DAY_SIXTY_SIX_SAMSON_FALLS_AND_ISRAEL_UNRAVELS_LESSON.opening, DAY_66_SECTIONS, JUDGES_DAY_SIXTY_SIX_SAMSON_FALLS_AND_ISRAEL_UNRAVELS_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_NOTES = makeDeepNotes("Civil War and Ruth's Loyal Love", ["Judges 20", "Judges 21", "Ruth 1", "Ruth 2"], JUDGES_RUTH_DAY_SIXTY_SEVEN_CIVIL_WAR_AND_RUTHS_LOYAL_LOVE_LESSON.opening, DAY_67_SECTIONS, JUDGES_RUTH_DAY_SIXTY_SEVEN_CIVIL_WAR_AND_RUTHS_LOYAL_LOVE_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_NOTES = makeDeepNotes("Redemption and Samuel's Birth", ["Ruth 3", "Ruth 4", "1 Samuel 1", "1 Samuel 2"], RUTH_SAMUEL_DAY_SIXTY_EIGHT_REDEMPTION_AND_SAMUELS_BIRTH_LESSON.opening, DAY_68_SECTIONS, RUTH_SAMUEL_DAY_SIXTY_EIGHT_REDEMPTION_AND_SAMUELS_BIRTH_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_NOTES = makeDeepNotes("Samuel Hears God and the Ark Is Taken", ["1 Samuel 3", "1 Samuel 4", "1 Samuel 5", "1 Samuel 6"], FIRST_SAMUEL_DAY_SIXTY_NINE_SAMUEL_HEARS_GOD_AND_ARK_TAKEN_LESSON.opening, DAY_69_SECTIONS, FIRST_SAMUEL_DAY_SIXTY_NINE_SAMUEL_HEARS_GOD_AND_ARK_TAKEN_LESSON.closing);
export const BIBLE_YEAR_DAY_SEVENTY_DEEP_NOTES = makeDeepNotes("Israel Asks for a King", ["1 Samuel 7", "1 Samuel 8", "1 Samuel 9", "1 Samuel 10"], FIRST_SAMUEL_DAY_SEVENTY_ISRAEL_ASKS_FOR_A_KING_LESSON.opening, DAY_70_SECTIONS, FIRST_SAMUEL_DAY_SEVENTY_ISRAEL_ASKS_FOR_A_KING_LESSON.closing);

export const BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_STUDY_SECTIONS = makeStudySections(DAY_66_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_STUDY_SECTIONS = makeStudySections(DAY_67_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_STUDY_SECTIONS = makeStudySections(DAY_68_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_69_SECTIONS);
export const BIBLE_YEAR_DAY_SEVENTY_DEEP_STUDY_SECTIONS = makeStudySections(DAY_70_SECTIONS);
