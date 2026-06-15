import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedNumbersTwentySixToThirtySixPersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "According To Their Families",
    "Before The LORD",
    "The Inheritance",
    "As The LORD Commanded Moses",
    "The Congregation",
  ],
});

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getNumbersTwentySixToThirtySixMeaning(title: string, section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) {
    return ["The instruction begins with God's command.", "Israel's inheritance, worship, vows, battles, and boundaries must be ordered by the LORD's word."];
  }
  if (/number|families|twenty years|plague|census|sum|according to their families/.test(lower)) {
    return ["The new generation is being counted before entering the land.", "Numbers is showing that God is still preserving Israel after judgment in the wilderness."];
  }
  if (/inheritance|land|possession|lot|divide|daughters|zelophehad|tribe|border|coast/.test(lower)) {
    return ["The land is treated as God's promised gift to Israel.", "Inheritance must be received and guarded according to the LORD's command, not family pressure or human advantage."];
  }
  if (/joshua|moses|eleazar|leader|shepherd|spirit|charge|before all the congregation/.test(lower)) {
    return ["Leadership is being transferred under God's authority.", "Moses will not enter the land, but the LORD provides Joshua so the congregation is not left without a shepherd."];
  }
  if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram|sabbath|new moon|feast|atonement|trumpets/.test(lower)) {
    return ["Israel's calendar is shaped by worship before the LORD.", "Daily, weekly, monthly, and feast offerings teach that time itself belongs to God."];
  }
  if (/vow|bond|word|father|husband|hold his peace|forgive her/.test(lower)) {
    return ["Words spoken before the LORD carry real weight.", "Vows are not casual promises; households must handle them with truth, authority, and mercy."];
  }
  if (/midian|vengeance|war|phinehas|spoil|prey|tribute|purify/.test(lower)) {
    return ["Israel is dealing with Midian after covenant betrayal.", "The battle, spoil, and purification laws show that judgment and holiness still matter after victory."];
  }
  if (/reuben|gad|half tribe|jordan|cattle|armed|children|wives|cities/.test(lower)) {
    return ["Some tribes want land east of the Jordan.", "Moses requires them to fight with their brothers before settling into their own inheritance."];
  }
  if (/journey|departed|encamped|rameses|succoth|mount hor|plains of moab/.test(lower)) {
    return ["Israel's journey is being remembered stage by stage.", "The route shows that the wilderness years were not random; the LORD carried the people through real places."];
  }
  if (/drive out|inhabitants|images|high places|pricks|thorns/.test(lower)) {
    return ["Israel must remove idolatry from the land.", "The warning is clear: what Israel refuses to confront will become a continuing danger."];
  }
  if (/levites|cities|suburbs|refuge|manslayer|avenger|blood|witness|congregation judge/.test(lower)) {
    return ["The land must include justice and mercy.", "Levite cities and refuge cities teach that worship, life, bloodguilt, and protection all belong under God's law."];
  }
  if (/marry|tribe|daughter|inheritance shall remain|mahlah|tirzah|hoglah|milcah|noah/.test(lower)) {
    return ["The daughters' inheritance must remain within the tribe.", "Numbers closes by protecting both family provision and tribal boundaries in the promised land."];
  }
  if (/children of israel|congregation|families|tribes/.test(lower)) {
    return ["Israel is being treated as a covenant people made of real families and tribes.", "The land will not be received as a vague promise; it will be assigned to households the LORD has preserved."];
  }

  return ["The verse is naming something Israel must handle before entering the land.", `In ${section.reference}, inheritance, worship, justice, and obedience are being ordered under the LORD's command.`];
}

function getNumbersTwentySixToThirtySixBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/number|families|census|twenty years/.test(lower)) return ["📋 Israel is counted by family", "🏕️ A new generation stands ready", "🙌 God preserves His people"];
  if (/inheritance|land|possession|lot|border|coast|tribe/.test(lower)) return ["🏞️ The land is God's gift", "🏠 Families receive real inheritance", "📜 Boundaries follow the LORD's command"];
  if (/joshua|moses|leader|shepherd|charge/.test(lower)) return ["🧭 God provides leadership", "👥 The congregation needs a shepherd", "🙌 Moses' work continues through Joshua"];
  if (/offering|feast|sabbath|trumpets|atonement|lamb|bullock/.test(lower)) return ["🔥 Worship marks Israel's time", "📅 The calendar belongs to God", "🙌 Offerings keep the LORD at the center"];
  if (/vow|word|father|husband|bond/.test(lower)) return ["🗣️ Words before God matter", "🏠 Households carry responsibility", "📜 Promises must be handled truthfully"];
  if (/midian|war|spoil|purify|tribute/.test(lower)) return ["⚔️ Judgment follows covenant betrayal", "🧼 Victory still needs cleansing", "📦 Spoil is handled before the LORD"];
  if (/refuge|manslayer|blood|avenger|witness/.test(lower)) return ["🛡️ Refuge protects life", "⚖️ Justice must be careful", "🩸 Bloodguilt is serious"];

  if (/children of israel|congregation|families|tribes/.test(lower)) return ["👥 Israel is counted as God's people", "🏠 Families matter in the inheritance", "📜 The LORD orders the community"];

  return ["🏞️ Israel is nearing the promised land", "📜 The LORD gives order before entry", "🙌 Obedience must shape the future"];
}

function makeNumbersTwentySixToThirtySixExplanation(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], title: string) {
  const [lineOne, lineTwo] = getNumbersTwentySixToThirtySixMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getNumbersTwentySixToThirtySixBullets(title),
  ]);
}

export const NUMBERS_26_36_PERSONAL_SECTIONS: PersonalSection[] = generatedNumbersTwentySixToThirtySixPersonalSections.map((section) => ({
  ...section,
  phrases: section.phrases.map(([title]) => [
    title,
    makeNumbersTwentySixToThirtySixExplanation(section, title),
  ] as PersonalPhrase),
}));
