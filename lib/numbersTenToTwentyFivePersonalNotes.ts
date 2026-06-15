import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedNumbersTenToTwentyFivePersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedNumbersTenToTwentyFivePersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "In The Wilderness",
    "As The LORD Commanded Moses",
    "Before The LORD",
    "The Congregation",
    "The Tabernacle Of The Congregation",
  ],
});

const day41SectionIcons = [
  "🎺", "☁️", "🧭", "🚶", "📣", "🔥", "🍞", "🪶", "👂", "🙏",
  "🌬️", "🧺", "🕊️", "👑", "💬", "🤍", "⛺", "🧑‍⚖️", "🔎", "🍇",
  "🌿", "🏞️", "🛡️", "😨", "✅", "📜", "🧱", "🌄", "🕯️", "👥",
  "🪨", "🗺️", "⚖️", "🕰️",
];

const day42SectionIcons = [
  "😭", "🛑", "🗣️", "🙌", "🔥", "🕊️", "⚔️", "🏜️", "📜", "🧎",
  "🌾", "🍷", "🧺", "🧵", "🔵", "🚨", "👥", "⛺", "🪨", "🌍",
  "⚖️", "🕳️", "🔥", "🧼", "🛡️", "🙏", "🌿", "👑", "📣", "🪔",
  "🍞", "✨", "🧭", "🔎", "📦", "✅", "💡", "🌙",
];

const day43SectionIcons = [
  "👑", "⛪", "🛡️", "🎁", "🌾", "🍞", "🧂", "💧", "🐄", "🔥",
  "🧼", "🕊️", "⛺", "🚪", "🪦", "🏜️", "💦", "🪨", "😡", "⚖️",
  "🐍", "🩹", "⚔️", "🏞️", "🎶", "🌊", "🗺️", "📍", "🛕", "🌄",
  "✅", "🧭",
];

const day44SectionIcons = [
  "👀", "😨", "📨", "🧙", "🛑", "🗣️", "🐴", "⚔️", "👁️", "⛰️",
  "🔥", "🙏", "🌅", "🕊️", "👑", "🚫", "💬", "📜", "🌟", "🏕️",
  "⚖️", "🧭", "✨", "🦁", "🌊", "🏞️", "🪔", "🔭", "🧱", "🛡️",
  "🍽️", "💔", "⚠️", "🧎", "🗡️", "🕯️", "✅", "📍", "🚨",
];

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getNumbersTenToTwentyFiveMeaning(title: string, section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();

  if (/lord spake|said unto|speak unto|commanded moses|as the lord commanded/.test(lower)) {
    return ["The instruction begins with God's command.", "Israel's movement, worship, judgment, and mercy must be shaped by what the LORD says."];
  }
  if (/trumpet|blow|alarm|journey|cloud|ark|camp|standard|set forward|wilderness/.test(lower)) {
    return ["Israel is being ordered for the wilderness journey.", "The camp does not move by impulse; the LORD gives signals, order, and direction."];
  }
  if (/complain|murmur|wept|lust|flesh|manna|quails|wrath|fire|graves|egypt/.test(lower)) {
    return ["The people are resisting God's provision in the wilderness.", "Their hunger and fear become a test of trust after the LORD has already rescued them."];
  }
  if (/moses|aaron|miriam|seventy|elders|spirit|prophet|servant|meek/.test(lower)) {
    return ["The LORD is showing how leadership works among His people.", "Moses does not carry the burden by personal strength; God appoints, corrects, and defends His servants."];
  }
  if (/spy|search|land|grapes|giants|walled|report|caleb|joshua|milk and honey|evil report/.test(lower)) {
    return ["The promised land is being examined before Israel enters.", "The issue is not whether the land is real, but whether Israel will trust the LORD who promised it."];
  }
  if (/unbelief|rebel|stone|captain|go back|wilderness|forty years|carcases|children/.test(lower)) {
    return ["Israel's unbelief turns fear into rebellion.", "The people want safety without obedience, so the wilderness becomes the place where mistrust is exposed."];
  }
  if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour|atonement|forgiven|ignorance/.test(lower)) {
    return ["The LORD gives Israel worship instructions for life near Him.", "Offerings, firstfruits, and atonement teach that even ordinary provision belongs under God's rule."];
  }
  if (/sabbath|sticks|fringes|garment|remember|commandments|holy/.test(lower)) {
    return ["Israel is being taught to remember God's commands in daily life.", "Holy time, visible reminders, and obedience keep the covenant from becoming only words."];
  }
  if (/korah|dathan|abiram|rebellion|censer|earth opened|rod|budded|plague|priesthood/.test(lower)) {
    return ["The rebellion challenges the order God Himself gave.", "Numbers shows that priesthood and leadership are not prizes people seize for themselves."];
  }
  if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) {
    return ["The priests and Levites are assigned holy responsibility.", "Their service guards the sanctuary and teaches Israel that nearness to God is both gift and danger."];
  }
  if (/red heifer|ashes|water of separation|unclean|dead|cleanse|sprinkle/.test(lower)) {
    return ["The law gives a way to deal with uncleanness from death.", "Israel must not treat death as harmless near the holy presence of the living God."];
  }
  if (/rock|water|meribah|speak ye|smote|believed me not|edom|aaron died/.test(lower)) {
    return ["The wilderness exposes both need and disobedience.", "God provides water, but Moses and Aaron must still honor Him as holy before the people."];
  }
  if (/serpent|fiery|brass|looked|he lived|arum|sihon|og|amorites|smote/.test(lower)) {
    return ["The LORD provides rescue and victory on the road.", "Judgment, mercy, and battle all show that Israel's life depends on God's command."];
  }
  if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) {
    return ["A foreign king tries to control Israel's future.", "The LORD turns attempted curses into blessing because His promise is stronger than hired words."];
  }
  if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) {
    return ["Israel's idolatry brings covenant danger into the camp.", "False worship and sexual sin are treated as rebellion against the LORD who dwells among them."];
  }
  if (/children of israel|congregation|people/.test(lower)) {
    return ["The covenant people are being addressed as one gathered community.", "Numbers is not only about individual choices; the whole camp must learn to trust and obey the LORD together."];
  }

  return ["The verse is naming a concrete part of Israel's life with God.", `In ${section.reference}, the people are learning that travel, worship, leadership, and daily obedience all happen near the LORD's presence.`];
}

function getNumbersTenToTwentyFiveBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/trumpet|journey|camp|cloud|ark|wilderness/.test(lower)) return ["🏕️ Israel moves as an ordered camp", "☁️ The LORD guides the journey", "📜 Obedience shapes each step"];
  if (/complain|murmur|lust|manna|quails|egypt|wrath/.test(lower)) return ["💔 Complaint exposes mistrust", "🍞 God's provision is being rejected", "🔥 Rebellion brings consequence"];
  if (/spy|land|grapes|caleb|joshua|report|giants/.test(lower)) return ["🍇 The land is truly fruitful", "😨 Fear challenges faith", "🙌 Trust must answer God's promise"];
  if (/korah|rebellion|censer|rod|budded|priesthood/.test(lower)) return ["⚠️ Holy roles cannot be seized", "👑 God confirms His appointed servants", "⛺ The sanctuary must be guarded"];
  if (/offering|sacrifice|atonement|firstfruits|dough/.test(lower)) return ["🔥 Worship follows God's command", "🙏 Atonement is provided by mercy", "🌾 Provision is offered back to God"];
  if (/serpent|water|rock|unclean|ashes|dead|cleanse/.test(lower)) return ["💧 God provides a way through need", "🧼 Uncleanness must be dealt with", "🙌 Mercy comes through God's command"];
  if (/balaam|balak|curse|bless|star|sceptre/.test(lower)) return ["👑 God rules over foreign kings", "🗣️ Curses cannot overturn His promise", "✨ Blessing comes from the LORD"];
  if (/baal|peor|phinehas|plague|whoredom/.test(lower)) return ["💔 Idolatry breaks covenant loyalty", "🔥 Sin brings judgment into the camp", "🛡️ Zeal protects God's holy people"];

  if (/children of israel|congregation|people/.test(lower)) return ["👥 Israel is treated as one people", "⛺ The whole camp stands before God", "🙌 Covenant life requires shared obedience"];

  return ["⛺ Israel lives as God's camp", "📍 The wilderness becomes a place of testing", "🙌 Daily life must answer the LORD"];
}

function makeNumbersTenToTwentyFiveExplanation(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], title: string) {
  const [lineOne, lineTwo] = getNumbersTenToTwentyFiveMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getNumbersTenToTwentyFiveBullets(title),
  ]);
}

function buildSectionIconByReference(chapters: number[], icons: string[]) {
  return new Map(
    generatedNumbersTenToTwentyFivePersonalSections
      .filter((section) => chapters.includes(section.chapter))
      .map((section, index) => [section.reference, icons[index % icons.length]])
  );
}

const sectionIconByReference = new Map([
  ...buildSectionIconByReference([10, 11, 12, 13], day41SectionIcons),
  ...buildSectionIconByReference([14, 15, 16, 17], day42SectionIcons),
  ...buildSectionIconByReference([18, 19, 20, 21], day43SectionIcons),
  ...buildSectionIconByReference([22, 23, 24, 25], day44SectionIcons),
]);

sectionIconByReference.set("Numbers 16:4-7", "🙇");

function polishNumbersTenToTwentyFiveSection(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]): PersonalSection {
  const icon = sectionIconByReference.get(section.reference);
  if (!icon) return {
    ...section,
    phrases: section.phrases.map(([title, body]) => [title, body] as PersonalPhrase),
  };

  return {
    ...section,
    icon,
    title: `${icon} ${stripLeadingEmoji(section.title)}`,
    phrases: section.phrases.map(([title]) => [
      title,
      makeNumbersTenToTwentyFiveExplanation(section, title),
    ] as PersonalPhrase),
  };
}

export const NUMBERS_10_25_PERSONAL_SECTIONS = generatedNumbersTenToTwentyFivePersonalSections.map(polishNumbersTenToTwentyFiveSection);
