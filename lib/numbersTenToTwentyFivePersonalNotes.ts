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

function getNumbers10To25DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getNumbers10To25Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/trumpet|journey|cloud|ark|camp|standard|set forward|wilderness|hobab/.test(lower)) return ["\u{1F3D5}\u{FE0F} Israel moves as an ordered camp", "\u{2601}\u{FE0F} The LORD guides the journey", "\u{1F4DC} Obedience shapes each step", "\u{1F9ED} The road is directed, not random"];
  if (/complain|murmur|wept|lust|flesh|manna|quails|wrath|fire|graves|egypt/.test(lower)) return ["\u{1F494} Complaint exposes mistrust", "\u{1F35E} God's provision is being rejected", "\u{1F525} Rebellion brings consequence", "\u{1F9E0} Memory of Egypt is distorted"];
  if (/moses|aaron|miriam|seventy|elders|spirit|prophet|servant|meek/.test(lower)) return ["\u{1F9D4} Leadership belongs under God", "\u{1F64C} The LORD appoints and defends", "\u{1F465} Burdens are shared", "\u{26A0}\u{FE0F} Speaking against God's servant is serious"];
  if (/spy|search|land|grapes|giants|walled|report|caleb|joshua|milk and honey/.test(lower)) return ["\u{1F347} The land is truly fruitful", "\u{1F628} Fear challenges faith", "\u{1F64C} Trust must answer God's promise", "\u{1F5FA}\u{FE0F} The land is real, not vague"];
  if (/rebel|stone|captain|go back|forty years|carcases|children|presumed/.test(lower)) return ["\u{1F6D1} Unbelief becomes rebellion", "\u{1F3DC}\u{FE0F} The wilderness exposes mistrust", "\u{26A0}\u{FE0F} Refusing God's promise has cost", "\u{1F64F} Mercy does not erase consequences"];
  if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour|atonement|forgiven|ignorance/.test(lower)) return ["\u{1F525} Worship follows God's command", "\u{1F64F} Atonement is provided by mercy", "\u{1F33E} Provision is offered back to God", "\u{1F4DC} The land will still be lived before the LORD"];
  if (/sabbath|sticks|fringes|garment|remember|commandments|holy|presumptuously/.test(lower)) return ["\u{1F4DC} Commands must be remembered", "\u{1F9F5} Visible reminders train obedience", "\u{1F6D1} Holy time is guarded", "\u{1F54A}\u{FE0F} Israel is set apart"];
  if (/korah|dathan|abiram|rebellion|censer|earth opened|rod|budded|plague|priesthood/.test(lower)) return ["\u{26A0}\u{FE0F} Holy roles cannot be seized", "\u{1F451} God confirms His appointed servants", "\u{26FA} The sanctuary must be guarded", "\u{1F525} Rebellion near holy things is dangerous"];
  if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) return ["\u{26FA} Holy service is assigned", "\u{1F381} Support comes through the offerings", "\u{1F6E1}\u{FE0F} The sanctuary is guarded", "\u{1F64C} Nearness to God is gift and danger"];
  if (/red heifer|ashes|water of separation|unclean|dead|cleanse|sprinkle/.test(lower)) return ["\u{1F9FC} Uncleanness from death is handled", "\u{1F4A7} Cleansing comes by God's command", "\u{1F525} The heifer is part of purification", "\u{1F3D5}\u{FE0F} The camp stays near the living God"];
  if (/rock|water|meribah|speak|smote|believed me not|edom|aaron died/.test(lower)) return ["\u{1F4A7} God provides in the wilderness", "\u{1FAA8} The rock scene tests obedience", "\u{26A0}\u{FE0F} Leaders must honor God as holy", "\u{1F3DC}\u{FE0F} The journey includes grief and consequence"];
  if (/serpent|fiery|brass|looked|he lived|arum|sihon|og|amorites|smote/.test(lower)) return ["\u{1F40D} Judgment exposes rebellion", "\u{1FA79} Mercy comes through God's provided sign", "\u{2694}\u{FE0F} The LORD gives victory", "\u{1F64C} Life depends on trusting His word"];
  if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) return ["\u{1F451} God rules over foreign kings", "\u{1F5E3}\u{FE0F} Curses cannot overturn His promise", "\u{2728} Blessing comes from the LORD", "\u{1F981} A royal hope is spoken"];
  if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) return ["\u{1F494} Idolatry breaks covenant loyalty", "\u{1F525} Sin brings judgment into the camp", "\u{1F6E1}\u{FE0F} Zeal protects God's holy people", "\u{26A0}\u{FE0F} False worship is not harmless"];
  return ["\u{26FA} Israel lives as God's camp", "\u{1F4CD} The wilderness becomes a place of testing", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Daily life must answer the LORD"];
}

function explainNumbers10To25At95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake|said unto|speak unto|commanded moses|as the lord commanded/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's movement, worship, judgment, and mercy must be shaped by what the LORD says."];
  else if (/trumpet|blow|alarm/.test(lower)) opening = ["The silver trumpets were signals for Israel's camp.", "They told the people when to gather, move, or prepare for danger."];
  else if (/cloud/.test(lower)) opening = ["The cloud was the visible sign of the LORD's presence guiding Israel.", "The people moved or stayed because God led them."];
  else if (/ark/.test(lower)) opening = ["The ark represented the LORD's covenant presence with Israel.", "Its movement showed that the journey was not merely human travel."];
  else if (/wilderness|journey|set forward|camp|standard/.test(lower)) opening = ["The wilderness journey was ordered by God's command.", "Israel did not move as a loose crowd but as a camp arranged around the LORD."];
  else if (/hobab/.test(lower)) opening = ["Hobab was Moses' relative whom Moses invited to travel with Israel.", "The request shows practical guidance being welcomed while the LORD still leads the journey."];
  else if (/complain|murmur/.test(lower)) opening = ["Complaint means the people are resisting God's care with distrust.", "In Numbers, grumbling turns need into rebellion against the LORD."];
  else if (/manna/.test(lower)) opening = ["Manna was the bread-like food God provided in the wilderness.", "The people's complaint shows them despising daily mercy."];
  else if (/quails|flesh|lust|egypt|graves/.test(lower)) opening = ["The craving for flesh shows Israel's memory of Egypt becoming twisted.", "They remember food while forgetting slavery and rescue."];
  else if (/wrath|fire/.test(lower)) opening = ["The LORD's wrath means holy judgment against rebellion.", "Numbers treats distrust near God's presence as serious, not harmless frustration."];
  else if (/seventy|elders|spirit/.test(lower)) opening = ["The seventy elders were appointed to share the burden with Moses.", "God gives help so leadership does not rest on Moses' strength alone."];
  else if (/miriam|aaron|prophet|meek|servant/.test(lower)) opening = ["Miriam and Aaron challenge Moses' unique role.", "The LORD defends His servant and shows that leadership is His to appoint."];
  else if (/spy|search|land|grapes|eshcol/.test(lower)) opening = ["The spies are sent to examine the promised land.", "The fruit proves the land is good; the test is whether Israel will trust God."];
  else if (/giants|walled|evil report|grasshoppers/.test(lower)) opening = ["The fearful report magnifies the danger over the promise.", "The spies describe real obstacles but interpret them without trust."];
  else if (/caleb|joshua|well able|milk and honey/.test(lower)) opening = ["Caleb and Joshua answer fear with trust in the LORD's promise.", "They do not deny the land's dangers; they believe God is greater."];
  else if (/rebel|stone|captain|go back/.test(lower)) opening = ["Rebellion means Israel refuses the LORD's promise and wants another way.", "Fear turns into a desire to undo the rescue from Egypt."];
  else if (/forty years|carcases|children/.test(lower)) opening = ["The forty years are judgment for unbelief at the edge of the land.", "The wilderness becomes the place where the unbelieving generation falls."];
  else if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour/.test(lower)) opening = ["The offering words describe worship Israel must practice in the land.", "Even after judgment, God still teaches a future life of worship."];
  else if (/atonement|forgiven|ignorance/.test(lower)) opening = ["Atonement means guilt is covered before God.", "Numbers distinguishes unintentional sin from defiant rebellion while still providing mercy."];
  else if (/presumptuously/.test(lower)) opening = ["Presumptuously means high-handed, defiant rebellion.", "This is not accidental failure; it is open contempt for the LORD's word."];
  else if (/sabbath|sticks/.test(lower)) opening = ["The Sabbath was holy time guarded by God's command.", "The man gathering sticks tests whether Israel will treat God's rest as serious."];
  else if (/fringes|garment|remember/.test(lower)) opening = ["Fringes were visible reminders on Israel's garments.", "God gave His people a daily way to remember His commands."];
  else if (/korah|dathan|abiram|rebellion/.test(lower)) opening = ["Korah's rebellion challenges the roles God assigned.", "The issue is not ambition only; it is seizing holy service God did not give."];
  else if (/censer|earth opened|rod|budded|plague/.test(lower)) opening = ["The sign or judgment confirms the LORD's chosen order.", "Numbers shows that priesthood is received from God, not taken by force."];
  else if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) opening = ["The priests and Levites have assigned holy responsibility.", "Their work guards the sanctuary so the camp can live near God's presence."];
  else if (/red heifer|ashes|water of separation/.test(lower)) opening = ["The red heifer ritual provides cleansing from contact with death.", "The ashes and water teach that death must be dealt with near the living God."];
  else if (/unclean|dead|cleanse|sprinkle/.test(lower)) opening = ["Unclean means not fit for normal camp or sanctuary access for a time.", "Contact with death required cleansing before return."];
  else if (/rock|water|meribah|speak|smote|believed me not/.test(lower)) opening = ["Meribah is the place where water need and disobedience collide.", "God provides water, but Moses and Aaron fail to honor Him as holy."];
  else if (/edom|aaron died|mount hor/.test(lower)) opening = ["The Edom roadblock and Aaron's death show the journey's cost.", "Israel keeps moving, but leadership and access to the land are affected by disobedience."];
  else if (/serpent|fiery|brass|looked|he lived/.test(lower)) opening = ["The brass serpent was God's provided sign of rescue after judgment.", "The bitten person lived by looking where God commanded."];
  else if (/arum|sihon|og|amorites|smote/.test(lower)) opening = ["The battle language shows the LORD giving Israel victories on the road.", "Enemies cannot stop the journey when God gives the land."];
  else if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) opening = ["Balak hires Balaam to curse Israel, but the LORD controls the outcome.", "Human schemes and paid words cannot overturn God's blessing."];
  else if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) opening = ["Baal-peor is Israel's idolatry and sexual rebellion with Moab.", "The sin brings covenant danger into the camp until zeal stops the plague."];
  else if (/children of israel|congregation|people/.test(lower)) opening = ["The covenant people are being addressed as a gathered community.", "Numbers shows the whole camp learning trust, worship, and obedience together."];
  else opening = [`This wording names ${getNumbers10To25DistinctiveTopic(cleanTitle)} in Numbers ${section.chapter}.`, "The phrase gives a concrete part of Israel's wilderness testing and covenant life."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getNumbers10To25DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or response in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getNumbers10To25Support(cleanTitle),
  ].slice(0, 8));
}

function makeNumbersTenToTwentyFiveExplanation(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainNumbers10To25At95(section, title, occurrenceIndex);

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
    phrases: (() => {
      const seen = new Map<string, number>();
      return section.phrases.map(([title]) => {
        const key = stripLeadingEmoji(title).toLowerCase();
        const occurrence = seen.get(key) ?? 0;
        seen.set(key, occurrence + 1);
        return [
          title,
          makeNumbersTenToTwentyFiveExplanation(section, title, occurrence),
        ] as PersonalPhrase;
      });
    })(),
  };
}

export const NUMBERS_10_25_PERSONAL_SECTIONS = generatedNumbersTenToTwentyFivePersonalSections.map(polishNumbersTenToTwentyFiveSection);
