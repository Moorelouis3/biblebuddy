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

function getNumbers26To36DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getNumbers26To36Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) return ["\u{1F4DC} God's command gives the order", "\u{1F9D4} Moses receives the instruction", "\u{1F3DE}\u{FE0F} Israel is prepared for the land", "\u{1F64C} The future must follow the LORD"];
  if (/number|families|census|twenty years|plague|sum|counted/.test(lower)) return ["\u{1F4CB} Israel is counted by family", "\u{1F3D5}\u{FE0F} A new generation stands ready", "\u{1F64C} God preserves His people", "\u{1F5FA}\u{FE0F} The land is coming into view"];
  if (/inheritance|land|possession|lot|divide|daughters|zelophehad|tribe|border|coast/.test(lower)) return ["\u{1F3DE}\u{FE0F} The land is God's gift", "\u{1F3E0} Families receive real inheritance", "\u{1F4DC} Boundaries follow the LORD's command", "\u{2696}\u{FE0F} Justice protects family provision"];
  if (/joshua|moses|eleazar|leader|shepherd|spirit|charge|congregation/.test(lower)) return ["\u{1F9ED} God provides leadership", "\u{1F465} The congregation needs a shepherd", "\u{1F64C} Moses' work continues through Joshua", "\u{1F4DC} Authority is given before the people"];
  if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram|sabbath|new moon|feast|atonement|trumpets/.test(lower)) return ["\u{1F525} Worship marks Israel's time", "\u{1F4C5} The calendar belongs to God", "\u{1F64C} Offerings keep the LORD at the center", "\u{1F35E} Daily life answers His command"];
  if (/vow|bond|word|father|husband|hold his peace|forgive/.test(lower)) return ["\u{1F5E3}\u{FE0F} Words before God matter", "\u{1F3E0} Households carry responsibility", "\u{1F4DC} Promises must be handled truthfully", "\u{1F64F} Mercy and authority both matter"];
  if (/midian|vengeance|war|phinehas|spoil|prey|tribute|purify/.test(lower)) return ["\u{2694}\u{FE0F} Judgment follows covenant betrayal", "\u{1F9FC} Victory still needs cleansing", "\u{1F4E6} Spoil is handled before the LORD", "\u{26A0}\u{FE0F} Holiness matters after battle"];
  if (/reuben|gad|half tribe|jordan|cattle|armed|children|wives|cities/.test(lower)) return ["\u{1F3DE}\u{FE0F} Land east of Jordan is requested", "\u{2694}\u{FE0F} The tribes must still help their brothers", "\u{1F3E0} Families and cattle need settlement", "\u{1F4DC} Inheritance cannot cancel shared duty"];
  return ["\u{1F3DE}\u{FE0F} Israel is nearing the promised land", "\u{1F4DC} The LORD gives order before entry", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Obedience must shape the future"];
}

function explainNumbers26To36At95(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's inheritance, worship, leadership, and calendar must be ordered by His word."];
  else if (/number|census|sum|twenty years|families|according to their families/.test(lower)) opening = ["The census counts the new generation by family.", "After wilderness judgment, God is still preserving Israel for the land."];
  else if (/plague/.test(lower)) opening = ["The plague marks the judgment that fell after rebellion.", "The new count happens after loss, showing both consequence and preservation."];
  else if (/inheritance|land|possession|lot|divide|tribe/.test(lower)) opening = ["Inheritance means the land portion given to families and tribes.", "The land is a promised gift, but it must be divided according to the LORD's command."];
  else if (/zelophehad|daughters|mahlah|tirzah|hoglah|milcah|noah/.test(lower)) opening = ["The daughters of Zelophehad ask about family inheritance when there is no son.", "Their case shows God's law protecting a family's place in the promised land."];
  else if (/moses|mount abarim|not go over|gathered unto thy people/.test(lower)) opening = ["Moses is being told he will see the land but not enter it.", "Leadership consequences remain, but God's promise continues."];
  else if (/joshua|spirit|charge|shepherd|eleazar/.test(lower)) opening = ["Joshua is appointed as the next leader under God's authority.", "The congregation will not be left like sheep without a shepherd."];
  else if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram/.test(lower)) opening = ["The offering words describe regular worship before the LORD.", "Daily, weekly, monthly, and feast sacrifices keep Israel's time centered on God."];
  else if (/sabbath|new moon|passover|unleavened|trumpets|atonement|feast/.test(lower)) opening = ["The calendar word names an appointed time for worship.", "Israel's days and seasons belong to the LORD, not merely to work or harvest."];
  else if (/vow|bond|word|father|husband|hold his peace|forgive/.test(lower)) opening = ["A vow was a serious promise spoken before the LORD.", "Numbers treats words as weighty because promises affect households and worship."];
  else if (/midian|vengeance|war|phinehas/.test(lower)) opening = ["The Midian battle follows covenant betrayal at Baal-peor.", "Judgment is handled under God's command, not as private revenge."];
  else if (/spoil|prey|tribute|purify/.test(lower)) opening = ["Spoil and tribute are the goods taken after battle and handled before the LORD.", "Victory does not remove the need for cleansing and ordered obedience."];
  else if (/reuben|gad|half tribe|jordan|cattle|armed/.test(lower)) opening = ["Reuben and Gad request land east of the Jordan.", "Moses requires them to help the other tribes before settling their own families."];
  else if (/children of israel|congregation|families|tribes/.test(lower)) opening = ["Israel is being treated as a covenant people made of real families and tribes.", "The land will be assigned to households the LORD has preserved."];
  else opening = [`This wording names ${getNumbers26To36DistinctiveTopic(cleanTitle)} in Numbers ${section.chapter}.`, "The phrase gives a concrete part of Israel's preparation for inheritance, worship, or leadership."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getNumbers26To36DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or response in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getNumbers26To36Support(cleanTitle),
  ].slice(0, 8));
}

function makeNumbersTwentySixToThirtySixExplanation(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainNumbers26To36At95(section, title, occurrenceIndex);

  const [lineOne, lineTwo] = getNumbersTwentySixToThirtySixMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getNumbersTwentySixToThirtySixBullets(title),
  ]);
}

export const NUMBERS_26_36_PERSONAL_SECTIONS: PersonalSection[] = generatedNumbersTwentySixToThirtySixPersonalSections.map((section) => ({
  ...section,
  phrases: (() => {
    const seen = new Map<string, number>();
    return section.phrases.map(([title]) => {
      const key = stripLeadingEmoji(title).toLowerCase();
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);
      return [
        title,
        makeNumbersTwentySixToThirtySixExplanation(section, title, occurrence),
      ] as PersonalPhrase;
    });
  })(),
}));
