import { BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyThreeDeepNotes";
import { BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyFiveDeepNotes";
import { BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyFourDeepNotes";
import { BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyTwoDeepNotes";

export type PersonalLeviticusPhraseSectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

type DeepStudySection = {
  reference: string;
  title: string;
  summary: string;
  markdown: string;
};

const note = (lines: string[]) => lines.join("\n\n");
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

function getDeepPhraseEntries(markdown: string, fallbackTitle: string, fallbackSummary: string) {
  const entries = [...markdown.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
    .map((match) => ({
      title: match[1].trim(),
      body: match[2].replace(/\n+/g, " ").trim(),
    }))
    .filter((entry) => entry.title && entry.body)
    .slice(0, 6);

  if (entries.length > 0) return entries;

  return [
    { title: fallbackTitle, body: fallbackSummary },
    { title: "What Is Happening Here", body: fallbackSummary },
    { title: "Why This Matters", body: fallbackSummary },
  ];
}

function makeGeneratedLeviticusPhrase(title: string, body: string, summary: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainLeviticusMinedPhrase(title, body, summary)];
}

function explainLeviticusMinedPhrase(title: string, body: string, summary: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("eighth day") || lower.includes("glory") || lower.includes("fire came") || lower.includes("blessed the people") || lower.includes("shouted") || lower.includes("fell on their faces")) {
    add(`${title} belongs to the moment when public priestly ministry begins.`, "After seven days of ordination, Aaron starts serving before the whole congregation. The worship is not private anymore; Israel sees the LORD receive what He commanded.", "\u{2728} Glory appears", "\u{1F525} Fire receives the offering", "\u{1F64C} The people worship", "God's nearness is beautiful, but it comes through His appointed way.");
  } else if (lower.includes("strange fire") || lower.includes("commanded them not") || lower.includes("nadab") || lower.includes("abihu") || lower.includes("sanctified") || lower.includes("held his peace")) {
    add(`${title} explains the shock of Leviticus 10.`, "Nadab and Abihu come near with fire God had not commanded. The issue is not merely that they made a small mistake; they treated holy service as something they could shape themselves.", "\u{26A0}\u{FE0F} Unauthorized worship", "\u{1F525} Holy fire", "\u{1F910} Aaron is silent", "The closer someone serves near God's presence, the more serious obedience becomes.");
  } else if (lower.includes("wine") || lower.includes("strong drink") || lower.includes("holy and unholy") || lower.includes("clean and unclean") || lower.includes("teach the children")) {
    add(`${title} gives the priests their teaching responsibility.`, "Priests are not only people who handle sacrifices. They must stay clear-minded and help Israel understand the difference between what is holy, common, clean, and unclean.", "\u{1F9ED} Discernment", "\u{1F4D6} Teaching", "\u{1F6AB} Blurred judgment is dangerous", "God's people need leaders who can explain His ways, not just perform rituals.");
  } else if (lower.includes("parteth the hoof") || lower.includes("cheweth the cud") || lower.includes("fins") || lower.includes("scales") || lower.includes("abomination") || lower.includes("creeping") || lower.includes("flying")) {
    add(`${title} comes from the clean and unclean animal laws.`, "These food laws trained Israel to make distinctions every day. Meals became reminders that Israel belonged to the holy LORD and was not just like the nations around them.", "\u{1F37D}\u{FE0F} Holiness at the table", "\u{1F9ED} Distinctions", "\u{1F465} Set-apart people", "A beginner should not read this as random diet advice. It is identity training for a covenant people.");
  } else if (lower.includes("carcase") || lower.includes("unclean until the even") || lower.includes("wash his clothes") || lower.includes("earthen vessel") || lower.includes("be holy") || lower.includes("i am holy")) {
    add(`${title} teaches Israel how uncleanness spreads and how holiness shapes daily life.`, "Uncleanness is often connected to death, decay, and contact with what does not belong near holy space. It is not always personal sin, but it still affects worship access.", "\u{1F480} Death and disorder", "\u{1F4A7} Washing and waiting", "\u{1F54A}\u{FE0F} Be holy", "God gives boundaries and a way back, so uncleanness is serious but not hopeless.");
  } else if (lower.includes("conceived seed") || lower.includes("child") || lower.includes("purifying") || lower.includes("turtledoves") || lower.includes("young pigeons") || lower.includes("circumcised")) {
    add(`${title} belongs to purification after childbirth.`, "Leviticus is not calling babies evil or motherhood sinful. The chapter deals with blood, birth, and returning to ordinary sanctuary worship after a major body-and-family event.", "\u{1F476} Childbirth", "\u{1FA78} Blood and purification", "\u{1F426} Offering for the poor", "This law quietly prepares readers for Luke 2, where Mary brings the poor-person offering after Jesus is born.");
  } else if (lower.includes("leprosy") || lower.includes("plague") || lower.includes("skin") || lower.includes("scab") || lower.includes("bright spot") || lower.includes("priest shall look") || lower.includes("shut up") || lower.includes("outside the camp") || lower.includes("without the camp")) {
    add(`${title} comes from the priestly examination of visible uncleanness.`, "The priest is not guessing. He looks, waits, checks again, and only then declares clean or unclean. Holiness requires careful discernment, not panic.", "\u{1F50E} Careful examination", "\u{23F3} Waiting when unclear", "\u{1F3D5}\u{FE0F} Outside the camp", "Being outside the camp was painful, but it protected the place where God's holy presence dwelt.");
  } else if (lower.includes("garment") || lower.includes("warp") || lower.includes("woof") || lower.includes("linen") || lower.includes("woollen") || lower.includes("wash") || lower.includes("burn")) {
    add(`${title} brings holiness into clothing and ordinary objects.`, "Leviticus does not treat daily life as separate from worship. If contamination spreads in fabric or leather, it must be examined, washed, torn out, or burned.", "\u{1F9E5} Garments", "\u{1F4A7} Washing", "\u{1F525} Removing spread", "The lesson is simple: what keeps spreading corruption cannot be ignored forever.");
  } else if (lower.includes("two birds") || lower.includes("cedar") || lower.includes("scarlet") || lower.includes("hyssop") || lower.includes("living bird") || lower.includes("open field") || lower.includes("shave") || lower.includes("he shall be clean")) {
    add(`${title} points to restoration after uncleanness.`, "Leviticus 14 is good news because it gives a way back. The priest goes outside the camp, cleansing is performed, and the restored person moves back toward community and worship.", "\u{1F54A}\u{FE0F} Living bird released", "\u{1F4A7} Washing", "\u{2705} He shall be clean", "God does not only identify uncleanness. He provides restoration.");
  } else if (lower.includes("house") || lower.includes("stones") || lower.includes("scrape") || lower.includes("break down") || lower.includes("land of canaan")) {
    add(`${title} shows holiness reaching Israel's homes.`, "These laws look ahead to life in the promised land. Houses, stones, walls, and ordinary living spaces also belong under God's holy order.", "\u{1F3E0} Home life", "\u{1F9F1} Stones removed", "\u{1F3DA}\u{FE0F} House torn down if needed", "Restoration is attempted first, but spreading corruption must be taken seriously.");
  } else if (lower.includes("issue") || lower.includes("seed") || lower.includes("bathe") || lower.includes("flesh in water") || lower.includes("monthly") || lower.includes("separation")) {
    add(`${title} brings private body matters before the holy LORD.`, "Leviticus 15 can feel uncomfortable, but it teaches that bodies are not outside God's care. Some conditions are abnormal, some are ordinary, and God gives a path back to cleanness.", "\u{1F4A7} Washing", "\u{23F3} Waiting", "\u{1F64F} Restoration", "Ritual impurity is not always moral guilt. It marks boundaries around life, blood, fluids, and holy space.");
  } else if (lower.includes("mercy seat") || lower.includes("scapegoat") || lower.includes("azazel") || lower.includes("within the veil") || lower.includes("all their iniquities") || lower.includes("atonement") || lower.includes("come not at all times") || lower.includes("afflict your souls")) {
    add(`${title} belongs to the Day of Atonement, the deep cleansing day for Israel.`, "Once a year, the high priest enters the Most Holy Place with blood. One goat dies before the LORD, and the live goat carries the confessed sins away.", "\u{1FA78} Blood atonement", "\u{1F410} Sin carried away", "\u{1F6AA} Access only God's way", "This is one of the clearest pictures in the Old Testament that sin must be covered and removed.");
  } else if (lower.includes("burnt") || lower.includes("whole") || lower.includes("flay") || lower.includes("pieces")) {
    add(`${title} is connected to the burnt offering, the offering of whole surrender.`, "The whole animal goes up on the altar, teaching Israel that worship is not giving God leftovers.", "\u{1F525} Whole offering", "\u{1FA78} Atonement", "\u{1F64C} Surrender", "Coming near to God involves cost, life, and God's provided way.");
  } else if (lower.includes("hand") || lower.includes("head")) {
    add(`${title} is the worshiper identifying with the offering.`, "The worshiper places a hand on the animal's head, showing that the offering stands connected to the person bringing it.", "\u{1F590}\u{FE0F} Hand on the head", "\u{1F501} Identification", "\u{1FA78} Life for life", "Sacrifice is personal, not empty ritual.");
  } else if (lower.includes("blood") || lower.includes("sprinkle") || lower.includes("horns") || lower.includes("bottom of the altar")) {
    add(`${title} treats life and atonement as serious before God.`, "In Leviticus, blood is not treated as common because it represents life before the LORD.", "\u{1FA78} Blood", "\u{26A0}\u{FE0F} Sin is serious", "\u{1F64F} Atonement", "The priest handles the blood because God provides a holy way for guilt to be covered.");
  } else if (lower.includes("fine flour") || lower.includes("oil") || lower.includes("frankincense") || lower.includes("meat offering") || lower.includes("grain")) {
    add(`${title} comes from the grain offering, a gift of daily provision back to God.`, "This offering comes from the field and kitchen rather than the herd. It teaches gratitude and dedication.", "\u{1F33E} Grain", "\u{1FA94} Oil", "\u{1F4A8} Frankincense", "Israel gives back to the LORD from what He has provided.");
  } else if (lower.includes("leaven") || lower.includes("honey") || lower.includes("salt")) {
    add(`${title} teaches that worship has covenant boundaries.`, "Leaven and honey were not burned on the altar, but salt was required as a sign of covenant faithfulness.", "\u{1F9C2} Salt", "\u{1F6AB} No leaven", "\u{1F91D} Covenant faithfulness", "God defines worship; Israel does not invent it.");
  } else if (lower.includes("peace") || lower.includes("fat") || lower.includes("kidneys") || lower.includes("caul") || lower.includes("inwards")) {
    add(`${title} belongs with the peace offering, which celebrates fellowship with God.`, "The rich inner portions are offered to the LORD, teaching that the best and deepest parts belong to Him.", "\u{1F91D} Fellowship", "\u{1F525} Offered to God", "\u{1F37D}\u{FE0F} Shared peace", "Peace in Leviticus means wholeness and restored relationship, not just the absence of trouble.");
  } else if (lower.includes("sin") || lower.includes("ignorance") || lower.includes("unwittingly") || lower.includes("guilty") || lower.includes("forgiven")) {
    add(`${title} is part of the sin offering instructions.`, "Leviticus teaches that sin matters even when someone did not mean to rebel. God provides atonement instead of telling Israel to ignore guilt.", "\u{1F4DD} Sin named", "\u{1FA78} Atonement provided", "\u{2705} Forgiveness", "This is mercy with truth: God does not minimize sin, but He gives a way back.");
  } else if (lower.includes("priest") || lower.includes("congregation") || lower.includes("ruler") || lower.includes("common")) {
    add(`${title} reminds the reader that everyone needs atonement.`, "Priests, leaders, the whole congregation, and ordinary people are all accountable before the holy LORD.", "\u{1F46A} Whole community", "\u{1F451} Leaders", "\u{1F64F} Priests also need mercy", "No role puts a person above confession and forgiveness.");
  } else if (lower.includes("confess") || lower.includes("witness") || lower.includes("unclean") || lower.includes("oath") || lower.includes("swearing")) {
    add(`${title} brings guilt into everyday life.`, "Leviticus names ordinary sins like silence, uncleanness, careless words, and broken honesty.", "\u{1F5E3}\u{FE0F} Words matter", "\u{1F9FC} Uncleanness matters", "\u{1F64F} Confession", "God cares about hidden and ordinary wrongs, not only dramatic rebellion.");
  } else if (lower.includes("restitution") || lower.includes("fifth") || lower.includes("restore") || lower.includes("ram") || lower.includes("trespass")) {
    add(`${title} is part of the guilt offering, where wrongs must be repaired.`, "Guilt is treated like real damage. The person restores what was wrong and adds a fifth instead of pretending the harm never happened.", "\u{1F9FE} Restitution", "\u{2795} Add the fifth", "\u{1F410} Guilt offering", "Forgiveness does not cancel the responsibility to make wrongs right.");
  } else if (lower.includes("fire") || lower.includes("ashes") || lower.includes("altar")) {
    add(`${title} teaches careful priestly service at the altar.`, "The altar fire, ashes, and holy place details show that worship near God's presence is tended carefully.", "\u{1F525} Fire", "\u{1F9F9} Ashes handled", "\u{1F64C} Holy service", "Leviticus slows down because holy things must not be handled casually.");
  } else if (lower.includes("washed") || lower.includes("garments") || lower.includes("anointed") || lower.includes("aaron") || lower.includes("sons") || lower.includes("consecration")) {
    add(`${title} comes from the consecration of the priests.`, "Aaron and his sons are washed, clothed, anointed, and marked for service before they can minister near God's presence.", "\u{1F4A7} Washed", "\u{1F455} Clothed", "\u{1FA94} Anointed", "The priests must be prepared by God's command before they serve.");
  } else {
    add(`${title} gives a specific detail in Leviticus.`, body, summary, "The phrase may name an offering, action, person, object, or command that helps explain worship near God's presence.", "Leviticus is teaching how sinful people can live near a holy God.");
  }

  return note(lines.slice(0, 8));
}

function makeMinedLeviticusPhrase(section: PersonalLeviticusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainLeviticusMinedPhrase(title, section.title, `${section.reference} is part of ${section.title}.`)];
}
function makeBeginnerLeviticusPhrase(title: string, section: PersonalLeviticusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the offering instructions are easier to follow.`,
    focus,
    "Leviticus can feel strange at first because it talks about animals, blood, flour, oil, salt, fat, priests, and fire.",
    "But the big question is simple: how can people with sin come near the holy God who now dwells among them?",
    "⛺ God's presence",
    "🔥 Costly worship",
    "🩸 Atonement",
    "🤲 Mercy provided",
    `In ${section.title}, the details help explain the way God gives for worship, cleansing, fellowship, or forgiveness.`,
  ]);
}

function ensureBeginnerLeviticusPhraseDepth(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerLeviticusPhrase("🧭 What Is Happening Here?", section, "This phrase helps locate the offering scene: who brings the offering, what is done with it, and what need it answers before God."),
    makeBeginnerLeviticusPhrase("🔎 Why This Detail Matters", section, "This detail matters because Leviticus teaches through repeated actions like bringing, laying on hands, sprinkling blood, burning portions, and receiving forgiveness."),
    makeBeginnerLeviticusPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why these rituals matter, but they prepare the whole Bible's language of sacrifice, priesthood, holiness, and atonement."),
    makeBeginnerLeviticusPhrase("🧵 Watch The Pattern", section, "Watch the pattern: God speaks from the tabernacle, the worshiper brings what God commands, the priest serves at the altar, and God provides a way near."),
    makeBeginnerLeviticusPhrase("❤️ What This Shows About People", section, "This scene shows that people need surrender, gratitude, fellowship, cleansing, and forgiveness because sin affects life near God's presence."),
    makeBeginnerLeviticusPhrase("🙌 What This Shows About God", section, "This scene shows the LORD as holy and merciful. He tells His people the truth about sin while giving them a way to draw near."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

function makeLeviticusSectionsFromDeepStudy(
  sections: DeepStudySection[],
  allowedChapters: number[],
  icon: string,
): PersonalLeviticusPhraseSectionInput[] {
  return sections.flatMap((section) => {
    const match = section.reference.match(/^Leviticus (\d+):(\d+)-(\d+)$/);
    if (!match) return [];

    const chapter = Number(match[1]);
    if (!allowedChapters.includes(chapter)) return [];

    const sectionStart = Number(match[2]);
    const sectionEnd = Number(match[3]);
    const phrases = getDeepPhraseEntries(section.markdown, section.title, section.summary).map((entry) =>
      makeGeneratedLeviticusPhrase(entry.title, entry.body, section.summary),
    );
    const chunks: PersonalLeviticusPhraseSectionInput[] = [];

    for (let startVerse = sectionStart; startVerse <= sectionEnd; startVerse += 6) {
      const endVerse = Math.min(startVerse + 5, sectionEnd);
      chunks.push({
        chapter,
        startVerse,
        endVerse,
        reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
        title: startVerse === sectionStart ? section.title : `${section.title} Continued`,
        icon,
        phrases,
      });
    }

    return chunks;
  });
}

const LEVITICUS_1_8_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  1: ["🔥 The burnt offering shows whole surrender.", "🩸 Blood marks atonement at the altar.", "🙌 Worship begins by coming God's way."],
  2: ["🌾 The grain offering gives thanks for provision.", "🧂 Salt reminds Israel of covenant faithfulness.", "🔥 Part is burned to the LORD; part supports the priests."],
  3: ["🤝 The peace offering celebrates fellowship.", "🍽️ Worship can include a shared meal.", "🩸 Life belongs to God, so blood is not treated as common."],
  4: ["💔 Sin can happen even when people do not mean to rebel.", "🩸 Atonement is needed for priest, people, leader, and common person.", "🙌 God provides forgiveness without pretending sin is small."],
  5: ["🗣️ Guilt must be confessed honestly.", "🤲 Mercy makes room for the poor.", "🧾 Some wrongs create debt that must be repaired."],
  6: ["🤝 Sin against a neighbor is also sin against the LORD.", "🔥 The altar fire is tended continually.", "👨‍🍳 Priests handle holy offerings carefully."],
  7: ["🩸 The guilt offering is most holy.", "🙏 Peace offerings include thanks, vows, and freewill worship.", "🚫 Blood and fat are reserved for God."],
  8: ["👕 Priests are washed, clothed, and anointed.", "🩸 Blood marks them for hearing, serving, and walking.", "⏳ Consecration takes time and obedience."],
};

const LEVITICUS_1_8_BANNED_FILLER_TITLES = [
  "What Is Happening Here",
  "Why This Detail Matters",
  "Why This Matters",
  "Beginner Connection",
  "Watch The Pattern",
  "Watch This Pattern",
  "What This Shows About People",
  "What This Shows About God",
];

function formatLeviticusOneToEightPhraseExplanation(section: PersonalLeviticusPhraseSectionInput, content: string) {
  const cleaned = content.replace(/not random ritual pieces/g, "not empty religious details");
  if (section.chapter >= 1 && section.chapter <= 8) {
    return cleaned;
  }

  if (section.chapter < 1 || section.chapter > 8 || cleaned.includes("What to notice:")) {
    return cleaned;
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = LEVITICUS_1_8_MOBILE_FORMAT_CUES[section.chapter];

  if (!cues || blocks.length < 2) {
    return blocks.join("\n\n");
  }

  const opening = blocks.slice(0, Math.min(2, blocks.length));
  const closing = blocks.slice(opening.length);

  return note([
    ...opening,
    "What to notice:",
    ...cues,
    ...closing,
  ]);
}

function formatLeviticusOneToEightSectionExplanations(sections: PersonalLeviticusPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases
      .filter(([title]) => !LEVITICUS_1_8_BANNED_FILLER_TITLES.some((bannedTitle) => title.includes(bannedTitle)))
      .map(([title, content]) => [
        title,
        formatLeviticusOneToEightPhraseExplanation(section, content),
      ] as [string, string]),
  }));
}

function appendMinedLeviticusPhraseCards(
  section: PersonalLeviticusPhraseSectionInput,
  desiredCount: number,
  poolsByChapter: Record<number, string[]>,
): PersonalLeviticusPhraseSectionInput {
  if (section.phrases.length >= desiredCount) return section;

  const existing = new Set(
    section.phrases.map(([phraseTitle]) =>
      phraseTitle.startsWith("\u{1F4CC} ") ? phraseTitle.slice(3).trim().toLowerCase() : phraseTitle.trim().toLowerCase(),
    ),
  );
  const pool = poolsByChapter[section.chapter] ?? [];
  const additions = pool
    .filter((phraseTitle) => !existing.has(phraseTitle.toLowerCase()))
    .slice(0, desiredCount - section.phrases.length)
    .map((phraseTitle) => makeMinedLeviticusPhrase(section, phraseTitle));

  return { ...section, phrases: [...section.phrases, ...additions] };
}

const DAY_32_LEVITICUS_1_4_EXTRA_PHRASES: Record<number, string[]> = {
  1: ["The LORD Called Unto Moses", "Out Of The Tabernacle", "If Any Man Of You Bring An Offering", "Of The Herd", "A Male Without Blemish", "Of His Own Voluntary Will", "At The Door Of The Tabernacle", "He Shall Put His Hand", "It Shall Be Accepted For Him", "To Make Atonement For Him", "Sprinkle The Blood Round About", "A Sweet Savour Unto The LORD", "Turtledoves, Or Of Young Pigeons", "The Crop With His Feathers"],
  2: ["A Meat Offering Unto The LORD", "Fine Flour", "Pour Oil Upon It", "Put Frankincense Thereon", "A Memorial Thereof", "Most Holy Of The Offerings", "Baken In The Oven", "Unleavened Cakes", "No Meat Offering Shall Be Made With Leaven", "Neither Shall Any Honey", "Season With Salt", "The Salt Of The Covenant", "Green Ears Of Corn", "Corn Beaten Out Of Full Ears"],
  3: ["A Sacrifice Of Peace Offering", "Of The Herd", "Male Or Female", "Without Blemish", "Lay His Hand Upon The Head", "Sprinkle The Blood Upon The Altar Round About", "The Fat That Covereth The Inwards", "The Two Kidneys", "It Is The Food Of The Offering", "A Sweet Savour Unto The LORD", "All The Fat Is The LORD's", "Ye Shall Eat Neither Fat Nor Blood", "Throughout Your Generations"],
  4: ["If A Soul Shall Sin Through Ignorance", "Against Any Of The Commandments", "The Priest That Is Anointed", "Bring A Young Bullock", "Dip His Finger In The Blood", "Seven Times Before The LORD", "The Whole Congregation Of Israel", "The Thing Be Hid From The Eyes", "The Elders Of The Congregation", "When A Ruler Hath Sinned", "If Any One Of The Common People Sin", "It Shall Be Forgiven Him", "The Priest Shall Make An Atonement"],
};

const DAY_33_LEVITICUS_5_8_EXTRA_PHRASES: Record<number, string[]> = {
  5: ["If A Soul Sin", "The Voice Of Swearing", "He Is A Witness", "Touch Any Unclean Thing", "When He Knoweth Of It", "He Shall Confess", "A Female From The Flock", "Two Turtledoves", "The Tenth Part Of An Ephah", "He Shall Be Forgiven", "Commit A Trespass", "In The Holy Things Of The LORD", "Add The Fifth Part Thereto", "A Ram Without Blemish"],
  6: ["Committed A Trespass Against The LORD", "Lie Unto His Neighbour", "In That Which Was Delivered Him To Keep", "Restore That Which He Took", "Add The Fifth Part More", "The Fire Upon The Altar Shall Be Burning", "It Shall Not Be Put Out", "The Priest Shall Put On His Linen Garment", "Take Up The Ashes", "The Law Of The Meat Offering", "It Shall Be Eaten In The Holy Place", "The Law Of The Sin Offering", "It Is Most Holy"],
  7: ["The Law Of The Trespass Offering", "It Is Most Holy", "Sprinkle The Blood", "The Priest Shall Have To Himself", "The Sacrifice Of Peace Offerings", "For A Thanksgiving", "His Own Hands Shall Bring", "The Fat With The Breast", "The Wave Breast", "The Heave Shoulder", "Ye Shall Eat No Manner Of Blood", "The Portion Of The Anointing", "In The Day When He Presented Them"],
  8: ["Take Aaron And His Sons", "The Garments", "The Anointing Oil", "Gather Thou All The Congregation", "Moses Washed Them With Water", "He Put Upon Him The Coat", "He Poured Of The Anointing Oil", "The Bullock For The Sin Offering", "Moses Took The Blood", "Upon The Tip Of Aaron's Right Ear", "Upon The Thumb Of His Right Hand", "Upon The Great Toe Of His Right Foot", "Seven Days Shall He Consecrate You", "Abide At The Door Of The Tabernacle"],
};
const DAY_34_LEVITICUS_9_12_EXTRA_PHRASES: Record<number, string[]> = {
  9: ["It Came To Pass On The Eighth Day", "Moses Called Aaron", "Take Thee A Young Calf", "For A Sin Offering", "A Ram For A Burnt Offering", "Offer For Thyself", "Make An Atonement For Thyself", "The Glory Of The LORD Shall Appear Unto You", "Aaron Lifted Up His Hand Toward The People", "Moses And Aaron Went Into The Tabernacle", "There Came A Fire Out From Before The LORD", "All The People Saw, They Shouted"],
  10: ["Nadab And Abihu", "Put Fire Therein", "Strange Fire", "Which He Commanded Them Not", "There Went Out Fire From The LORD", "I Will Be Sanctified", "Aaron Held His Peace", "Uncover Not Your Heads", "Wine Nor Strong Drink", "When Ye Go Into The Tabernacle", "That Ye May Put Difference", "Between Holy And Unholy", "Between Unclean And Clean", "Teach The Children Of Israel", "Moses Diligently Sought The Goat"],
  11: ["These Are The Beasts Which Ye Shall Eat", "Whatsoever Parteth The Hoof", "Cheweth The Cud", "The Camel", "The Swine", "Whatsoever Hath Fins And Scales", "They Shall Be An Abomination Unto You", "The Eagle", "The Ossifrage", "The Locust After His Kind", "Whosoever Toucheth The Carcase", "Unclean Until The Even", "Every Earthen Vessel", "Ye Shall Therefore Be Holy", "For I Am Holy"],
  12: ["If A Woman Have Conceived Seed", "Born A Man Child", "The Flesh Of His Foreskin Shall Be Circumcised", "The Blood Of Her Purifying", "She Shall Touch No Hallowed Thing", "Bring A Lamb Of The First Year", "The Priest Shall Make An Atonement For Her", "Two Turtles, Or Two Young Pigeons", "She Shall Be Clean"],
};

const DAY_35_LEVITICUS_13_16_EXTRA_PHRASES: Record<number, string[]> = {
  13: ["The Plague Of Leprosy", "The Priest Shall Look", "The Hair In The Plague Is Turned White", "Deeper Than The Skin", "Shut Up Him That Hath The Plague Seven Days", "The Priest Shall Look On Him Again", "Pronounce Him Clean", "Pronounce Him Unclean", "Raw Flesh", "A White Rising", "His Clothes Shall Be Rent", "He Shall Dwell Alone", "Without The Camp", "The Garment Also", "A Woollen Garment", "In The Warp, Or Woof", "It Is A Fretting Leprosy", "He Shall Burn That Garment", "It Shall Be Washed"],
  14: ["In The Day Of His Cleansing", "The Priest Shall Go Forth Out Of The Camp", "Two Birds Alive And Clean", "Cedar Wood", "Scarlet", "Hyssop", "Running Water", "The Living Bird", "Into The Open Field", "He Shall Wash His Clothes", "Shave Off All His Hair", "He Shall Be Clean", "The Log Of Oil", "Upon The Tip Of The Right Ear", "If He Be Poor", "When Ye Be Come Into The Land Of Canaan", "The Plague Of Leprosy In A House", "They Shall Take Away The Stones", "He Shall Break Down The House", "Cleanse The House"],
  15: ["When Any Man Hath A Running Issue", "Every Bed Whereon He Lieth", "Wash His Clothes", "Bathe Himself In Water", "Unclean Until The Even", "The Saddle", "An Earthen Vessel", "When He That Hath An Issue Is Cleansed", "Two Turtledoves", "The Priest Shall Make An Atonement", "If Any Man's Seed Of Copulation", "The Woman Also", "Her Issue In Her Flesh Be Blood", "Seven Days", "Separate The Children Of Israel From Their Uncleanness"],
  16: ["After The Death Of The Two Sons Of Aaron", "Come Not At All Times Into The Holy Place", "Within The Vail", "Before The Mercy Seat", "That He Die Not", "A Young Bullock For A Sin Offering", "Two Kids Of The Goats", "One Lot For The LORD", "The Other Lot For The Scapegoat", "A Cloud Of Incense", "Sprinkle It Upon The Mercy Seat", "Because Of The Uncleanness Of The Children Of Israel", "Lay Both His Hands Upon The Head", "Confess Over Him All The Iniquities", "Bear Upon Him All Their Iniquities", "Into A Land Not Inhabited", "Afflict Your Souls", "A Statute For Ever", "Once In A Year"],
};

export const LEVITICUS_1_10_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] =
  formatLeviticusOneToEightSectionExplanations([
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS, [9, 10, 11, 12], "\u{2728}").map((section) => appendMinedLeviticusPhraseCards(section, 11, DAY_34_LEVITICUS_9_12_EXTRA_PHRASES)),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS, [13, 14, 15, 16], "\u{1F54A}\u{FE0F}").map((section) => appendMinedLeviticusPhraseCards(section, 7, DAY_35_LEVITICUS_13_16_EXTRA_PHRASES)),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS, [1, 2, 3, 4], "🔥").map(ensureBeginnerLeviticusPhraseDepth).map((section) => appendMinedLeviticusPhraseCards(section, 15, DAY_32_LEVITICUS_1_4_EXTRA_PHRASES)),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS, [5, 6, 7, 8], "🩸").map(ensureBeginnerLeviticusPhraseDepth).map((section) => appendMinedLeviticusPhraseCards(section, 11, DAY_33_LEVITICUS_5_8_EXTRA_PHRASES)),
  ]);
