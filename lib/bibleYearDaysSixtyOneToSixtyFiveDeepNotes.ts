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

The big idea is this: ${title} helps the reader follow Israel's move from inheritance and covenant warning into the early cycles of Judges, where God's people repeatedly need mercy, deliverance, courage, and renewed faithfulness.`;
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
This phrase keeps the reader focused on the God who gives the land, guards justice, raises deliverers, and warns His people.

### The Children Of Israel
This phrase points to the covenant people who received God's promises but still had to choose obedience in the land.

### Inheritance
Inheritance is not just property. It is the promised gift that must be received with faithfulness.

### Serve The LORD
This phrase shows that covenant life requires loyalty, not divided worship.

## What This Means

This section helps beginners see that Joshua and Judges belong together.

Joshua shows God keeping His promise.

Judges shows what happens when the people drift from the LORD who gave them the land.`,
  }));
}

const DAY_61_SECTIONS = [
  {
    reference: "Joshua 20:1-9",
    chapter: 20,
    startVerse: 1,
    endVerse: 9,
    heading: "Cities Of Refuge",
    summary: "The LORD commands cities of refuge so justice can protect life and distinguish murder from accidental death.",
    teaching: [
      "Joshua 20 gives cities of refuge for the person who kills someone unknowingly.",
      "The city protects the accused from revenge until the case can be heard.",
      "This shows that the promised land must be shaped by justice, patience, and careful judgment.",
      "God's people must not confuse anger with righteousness or revenge with justice.",
    ],
  },
  {
    reference: "Joshua 21:1-45",
    chapter: 21,
    startVerse: 1,
    endVerse: 45,
    heading: "Levite Cities And Rest",
    summary: "The Levites receive cities throughout the tribes, and the chapter celebrates that the LORD kept every promise.",
    teaching: [
      "Joshua 21 gives cities to the Levites among the tribal inheritances.",
      "The servants of worship are scattered among the people, so teaching and worship stay close to everyday life.",
      "The chapter closes by saying the LORD gave Israel rest and not one good thing failed.",
      "This is one of Joshua's great promise-keeping moments.",
    ],
  },
  {
    reference: "Joshua 22:1-34",
    chapter: 22,
    startVerse: 1,
    endVerse: 34,
    heading: "An Altar Almost Divides Israel",
    summary: "The eastern tribes build an altar, Israel fears rebellion, and careful conversation prevents civil war.",
    teaching: [
      "Joshua 22 shows how quickly misunderstanding can threaten unity.",
      "The western tribes think the eastern tribes have built a rival altar.",
      "The eastern tribes explain that the altar is a witness, not a replacement for worship at the tabernacle.",
      "The chapter teaches zeal for pure worship, but also the need to listen before judging.",
    ],
  },
  {
    reference: "Joshua 23:1-16",
    chapter: 23,
    startVerse: 1,
    endVerse: 16,
    heading: "Joshua Warns The Leaders",
    summary: "Joshua reminds Israel's leaders that God fought for them and warns them not to cling to the nations or idols.",
    teaching: [
      "Joshua 23 is an old leader's warning before his death.",
      "Joshua reminds Israel that the LORD fought for them and kept His promises.",
      "He also warns that compromise with the remaining nations will become a snare.",
      "The same God who fulfills blessing will also fulfill warning if Israel turns away.",
    ],
  },
] as const;

const DAY_62_SECTIONS = [
  {
    reference: "Joshua 24:1-33",
    chapter: 24,
    startVerse: 1,
    endVerse: 33,
    heading: "Choose Whom Ye Will Serve",
    summary: "Joshua gathers Israel at Shechem, retells God's faithfulness, and calls the people to serve the LORD sincerely.",
    teaching: [
      "Joshua 24 retells Israel's story from Abraham to the land.",
      "Joshua wants the people to see that grace came before their choice.",
      "The call to choose whom they will serve is not a motivational slogan.",
      "It is a covenant demand for undivided loyalty to the LORD who rescued and provided for them.",
    ],
  },
  {
    reference: "Judges 1:1-36",
    chapter: 1,
    startVerse: 1,
    endVerse: 36,
    heading: "Incomplete Obedience Begins",
    summary: "Judges opens with victories, but repeated failures to drive out the inhabitants show compromise taking root.",
    teaching: [
      "Judges 1 begins after Joshua's death with tribes still taking possession of their inheritance.",
      "There are real victories, but the chapter repeatedly says Israel did not drive out the inhabitants.",
      "That repeated phrase matters because unfinished obedience becomes future trouble.",
      "The book begins by showing small compromises that will grow into deep spiritual danger.",
    ],
  },
  {
    reference: "Judges 2:1-23",
    chapter: 2,
    startVerse: 1,
    endVerse: 23,
    heading: "A Generation That Knew Not The LORD",
    summary: "The angel of the LORD rebukes Israel, Joshua's generation passes, and the cycle of Judges begins.",
    teaching: [
      "Judges 2 explains the spiritual pattern of the whole book.",
      "The people forsake the LORD, serve other gods, suffer oppression, cry out, and receive judges whom God raises up.",
      "The phrase another generation arose after them is heartbreaking.",
      "Faith that is not remembered, taught, and lived can disappear quickly from a people.",
    ],
  },
  {
    reference: "Judges 3:1-31",
    chapter: 3,
    startVerse: 1,
    endVerse: 31,
    heading: "The First Deliverers",
    summary: "Othniel, Ehud, and Shamgar show the LORD raising deliverers even when Israel's trouble comes from disobedience.",
    teaching: [
      "Judges 3 introduces the first deliverers in the book.",
      "Othniel delivers Israel after the Spirit of the LORD comes upon him.",
      "Ehud's story shows an unexpected deliverer used against Moab's oppression.",
      "Shamgar's brief note reminds readers that God can rescue through surprising people and simple tools.",
    ],
  },
] as const;

const DAY_63_SECTIONS = [
  {
    reference: "Judges 4:1-24",
    chapter: 4,
    startVerse: 1,
    endVerse: 24,
    heading: "Deborah, Barak, And Jael",
    summary: "The LORD delivers Israel from Jabin and Sisera through Deborah's leadership, Barak's obedience, and Jael's courage.",
    teaching: [
      "Judges 4 shows Israel oppressed again after doing evil in the sight of the LORD.",
      "Deborah speaks God's word as prophetess and judge.",
      "Barak goes to battle, but the honor of the victory goes to a woman named Jael.",
      "The chapter teaches that deliverance belongs to the LORD, even when He uses unexpected servants.",
    ],
  },
  {
    reference: "Judges 5:1-31",
    chapter: 5,
    startVerse: 1,
    endVerse: 31,
    heading: "Deborah's Song",
    summary: "Deborah and Barak sing about the LORD's victory, willing leaders, hesitant tribes, and the defeat of Sisera.",
    teaching: [
      "Judges 5 retells the victory as worship.",
      "The song praises the LORD, honors willing leaders, and exposes tribes that stayed back.",
      "The poetry helps the reader feel the spiritual meaning of the battle.",
      "Israel's deliverance is not only military success; it is a reason to bless the LORD.",
    ],
  },
  {
    reference: "Judges 6:1-40",
    chapter: 6,
    startVerse: 1,
    endVerse: 40,
    heading: "Gideon Is Called",
    summary: "Midian oppresses Israel, the angel of the LORD calls Gideon, and Gideon struggles toward faith.",
    teaching: [
      "Judges 6 begins with Israel hiding from Midian.",
      "The angel of the LORD calls Gideon a mighty man of valor while Gideon feels weak and afraid.",
      "Gideon tears down his father's altar to Baal before he ever fights Midian.",
      "The chapter teaches that deliverance must begin with turning from idols.",
    ],
  },
  {
    reference: "Judges 7:1-25",
    chapter: 7,
    startVerse: 1,
    endVerse: 25,
    heading: "Gideon's Army Is Made Small",
    summary: "The LORD reduces Gideon's army so Israel knows the victory is from Him and not from human strength.",
    teaching: [
      "Judges 7 is famous because God makes Gideon's army smaller before the battle.",
      "The LORD says the people are too many, because Israel might boast in its own hand.",
      "The victory comes through trumpets, pitchers, lamps, confusion, and the LORD's power.",
      "The chapter teaches that God can reduce human strength so His glory becomes clear.",
    ],
  },
] as const;

const DAY_64_SECTIONS = [
  {
    reference: "Judges 8:1-35",
    chapter: 8,
    startVerse: 1,
    endVerse: 35,
    heading: "Gideon's Victory Turns Dangerous",
    summary: "Gideon finishes the battle but then makes choices that leave Israel spiritually vulnerable.",
    teaching: [
      "Judges 8 shows Gideon after victory, and the story becomes more troubling.",
      "He refuses the title of king, but he gathers gold and makes an ephod that becomes a snare.",
      "Israel is delivered from Midian, yet idolatry grows again.",
      "The chapter warns that victory does not automatically make the heart faithful.",
    ],
  },
  {
    reference: "Judges 9:1-57",
    chapter: 9,
    startVerse: 1,
    endVerse: 57,
    heading: "Abimelech Grabs Power",
    summary: "Abimelech murders his brothers, rules through violence, and falls under God's judgment.",
    teaching: [
      "Judges 9 is a warning about ambition without God.",
      "Abimelech uses family ties, idol money, and violence to make himself king.",
      "Jotham's parable exposes the foolishness of choosing destructive leadership.",
      "The chapter ends by showing that God repays wickedness, even when evil seems powerful for a season.",
    ],
  },
  {
    reference: "Judges 10:1-18",
    chapter: 10,
    startVerse: 1,
    endVerse: 18,
    heading: "Israel Cries Out Again",
    summary: "After more idolatry and oppression, Israel cries to the LORD, and the LORD confronts their divided loyalty.",
    teaching: [
      "Judges 10 shows the cycle getting heavier.",
      "Israel serves many gods, and the LORD tells them to cry to the gods they have chosen.",
      "The people put away foreign gods and serve the LORD.",
      "The chapter shows both the seriousness of idolatry and the mercy of God toward a humbled people.",
    ],
  },
  {
    reference: "Judges 11:1-40",
    chapter: 11,
    startVerse: 1,
    endVerse: 40,
    heading: "Jephthah's Vow",
    summary: "Jephthah rises from rejection to leadership, but his rash vow brings sorrow into his victory.",
    teaching: [
      "Judges 11 introduces Jephthah, a rejected man who becomes Israel's leader.",
      "He understands Israel's history with Ammon better than many around him.",
      "But his vow is reckless and tragic.",
      "The chapter warns that zeal without wisdom can bring grief even in a season of deliverance.",
    ],
  },
] as const;

const DAY_65_SECTIONS = [
  {
    reference: "Judges 12:1-15",
    chapter: 12,
    startVerse: 1,
    endVerse: 15,
    heading: "Conflict After Jephthah",
    summary: "Jephthah's conflict with Ephraim shows Israel's internal fractures after deliverance.",
    teaching: [
      "Judges 12 shows conflict between Israelites after a deliverance story.",
      "The tribe of Ephraim confronts Jephthah, and the result is civil bloodshed.",
      "The word Shibboleth becomes a tragic test at the Jordan crossings.",
      "The chapter shows that Israel's trouble is not only outside oppression but internal division.",
    ],
  },
  {
    reference: "Judges 13:1-25",
    chapter: 13,
    startVerse: 1,
    endVerse: 25,
    heading: "Samson's Birth Announced",
    summary: "The angel of the LORD announces Samson's birth and his Nazirite calling before he is born.",
    teaching: [
      "Judges 13 begins with Israel again doing evil in the sight of the LORD.",
      "The angel of the LORD appears to Manoah's wife and announces a son.",
      "Samson is set apart as a Nazirite from the womb.",
      "The chapter builds hope because God begins deliverance before Samson can do anything.",
    ],
  },
  {
    reference: "Judges 14:1-20",
    chapter: 14,
    startVerse: 1,
    endVerse: 20,
    heading: "Samson's Strength And Weakness",
    summary: "Samson's desire for a Philistine woman begins a troubled path where strength and appetite collide.",
    teaching: [
      "Judges 14 shows Samson as powerful but impulsive.",
      "He sees a Philistine woman and wants her, even though his parents question the choice.",
      "The Spirit of the LORD comes upon him with power, but Samson also plays with riddles, anger, and desire.",
      "The chapter makes the reader feel the tension between God's purpose and Samson's weakness.",
    ],
  },
  {
    reference: "Judges 15:1-20",
    chapter: 15,
    startVerse: 1,
    endVerse: 20,
    heading: "Samson Strikes The Philistines",
    summary: "Samson attacks the Philistines, is handed over by Judah, and defeats many with the jawbone of an ass.",
    teaching: [
      "Judges 15 continues Samson's conflict with the Philistines.",
      "His actions are mixed with anger, revenge, and real deliverance.",
      "Judah hands him over, but the Spirit of the LORD comes mightily upon him.",
      "The chapter shows God beginning to deliver Israel through a deeply flawed man.",
    ],
  },
] as const;

export const JOSHUA_DAY_SIXTY_ONE_REFUGE_REST_AND_WARNING_LESSON = makeLesson(61, "Refuge, Rest, and Joshua's Warning", "Joshua 20-23", "20-30 min", [
  "Day 61 brings Joshua near the end of his leadership.",
  "The land has been divided, but the people still need justice, worship, unity, and warning.",
  "Joshua 20 through 23 shows refuge, Levite cities, a dangerous misunderstanding, and Joshua's final charge to the leaders.",
], DAY_61_SECTIONS, [
  "Day 61 teaches that promise fulfilled still requires faithful living.",
  "The LORD gives refuge, keeps His word, guards worship, and warns His people not to drift.",
]);

export const JOSHUA_JUDGES_DAY_SIXTY_TWO_COVENANT_CHOICE_AND_DRIFT_LESSON = makeLesson(62, "Covenant Choice and Israel's Drift", "Joshua 24; Judges 1-3", "20-30 min", [
  "Day 62 turns a major corner.",
  "Joshua calls Israel to choose whom they will serve, and then Judges begins showing how quickly the people drift.",
  "The day moves from covenant commitment to incomplete obedience and the first deliverers.",
], DAY_62_SECTIONS, [
  "Day 62 teaches that covenant words must become covenant faithfulness.",
  "The LORD remains merciful, but Israel's drift shows why memory, obedience, and worship matter.",
]);

export const JUDGES_DAY_SIXTY_THREE_DEBORAH_GIDEON_AND_DELIVERANCE_LESSON = makeLesson(63, "Deborah, Gideon, and Deliverance", "Judges 4-7", "20-30 min", [
  "Day 63 moves into some of the most memorable deliverance stories in Judges.",
  "Deborah, Barak, Jael, and Gideon all show that the LORD can rescue through unexpected people.",
  "The day also shows that fear and weakness do not stop God's power.",
], DAY_63_SECTIONS, [
  "Day 63 teaches that deliverance belongs to the LORD.",
  "God can use willing leaders, hidden courage, weak faith, and a small army to make His power clear.",
]);

export const JUDGES_DAY_SIXTY_FOUR_GIDEONS_FAILURE_AND_JEPHTHAHS_VOW_LESSON = makeLesson(64, "Gideon's Failure and Jephthah's Vow", "Judges 8-11", "20-30 min", [
  "Day 64 is a sobering day in Judges.",
  "Deliverance happens, but leadership becomes more compromised and painful.",
  "Gideon's ephod, Abimelech's violence, Israel's idolatry, and Jephthah's vow all show the spiritual cost of drift.",
], DAY_64_SECTIONS, [
  "Day 64 teaches that victory without faithfulness can still leave deep damage.",
  "The LORD is merciful, but Judges warns us not to confuse success, power, or zeal with obedience.",
]);

export const JUDGES_DAY_SIXTY_FIVE_SAMSON_BEGINS_TROUBLED_CALLING_LESSON = makeLesson(65, "Samson Begins His Troubled Calling", "Judges 12-15", "20-30 min", [
  "Day 65 brings us into Samson's story.",
  "His birth is announced by the angel of the LORD, and his life is marked by calling, strength, conflict, and weakness.",
  "The day helps readers see both God's purpose and Samson's troubled character.",
], DAY_65_SECTIONS, [
  "Day 65 teaches that God can begin deliverance through a flawed person.",
  "Samson's strength is real, but so are his appetites, anger, and lack of wisdom.",
]);

export const BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_NOTES = makeDeepNotes("Refuge, Rest, and Joshua's Warning", ["Joshua 20", "Joshua 21", "Joshua 22", "Joshua 23"], JOSHUA_DAY_SIXTY_ONE_REFUGE_REST_AND_WARNING_LESSON.opening, DAY_61_SECTIONS, JOSHUA_DAY_SIXTY_ONE_REFUGE_REST_AND_WARNING_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_NOTES = makeDeepNotes("Covenant Choice and Israel's Drift", ["Joshua 24", "Judges 1", "Judges 2", "Judges 3"], JOSHUA_JUDGES_DAY_SIXTY_TWO_COVENANT_CHOICE_AND_DRIFT_LESSON.opening, DAY_62_SECTIONS, JOSHUA_JUDGES_DAY_SIXTY_TWO_COVENANT_CHOICE_AND_DRIFT_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_NOTES = makeDeepNotes("Deborah, Gideon, and Deliverance", ["Judges 4", "Judges 5", "Judges 6", "Judges 7"], JUDGES_DAY_SIXTY_THREE_DEBORAH_GIDEON_AND_DELIVERANCE_LESSON.opening, DAY_63_SECTIONS, JUDGES_DAY_SIXTY_THREE_DEBORAH_GIDEON_AND_DELIVERANCE_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_NOTES = makeDeepNotes("Gideon's Failure and Jephthah's Vow", ["Judges 8", "Judges 9", "Judges 10", "Judges 11"], JUDGES_DAY_SIXTY_FOUR_GIDEONS_FAILURE_AND_JEPHTHAHS_VOW_LESSON.opening, DAY_64_SECTIONS, JUDGES_DAY_SIXTY_FOUR_GIDEONS_FAILURE_AND_JEPHTHAHS_VOW_LESSON.closing);
export const BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_NOTES = makeDeepNotes("Samson Begins His Troubled Calling", ["Judges 12", "Judges 13", "Judges 14", "Judges 15"], JUDGES_DAY_SIXTY_FIVE_SAMSON_BEGINS_TROUBLED_CALLING_LESSON.opening, DAY_65_SECTIONS, JUDGES_DAY_SIXTY_FIVE_SAMSON_BEGINS_TROUBLED_CALLING_LESSON.closing);

export const BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_61_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_STUDY_SECTIONS = makeStudySections(DAY_62_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_63_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_STUDY_SECTIONS = makeStudySections(DAY_64_SECTIONS);
export const BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_STUDY_SECTIONS = makeStudySections(DAY_65_SECTIONS);
