import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedDeuteronomyFourteenToTwentyNinePersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "Thou Shalt Not",
    "Before The LORD",
    "The Place Which The LORD Shall Choose",
    "Justice And Judgment",
    "Keep The Commandments",
    "All The Words Of This Law",
    "Thou Shalt Rejoice Before The LORD",
    "Thou Shalt Not Wrest Judgment",
    "That Which Is Altogether Just",
    "The Stranger And The Fatherless And The Widow",
    "All The Words Of This Covenant",
  ],
});

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getMeaning(title: string, section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord thy god|lord your god|command|statutes|judgments|law|words of this law|words of this covenant/.test(lower)) {
    return ["Moses is grounding Israel's life in the LORD's revealed word.", "The people are not free to shape worship, justice, family life, or leadership by instinct."];
  }
  if (/clean|unclean|eat|beast|fish|fowl|cheweth|cloven|abomination/.test(lower)) {
    return ["Israel's ordinary eating is being marked by holiness.", "Clean and unclean food laws trained the people to see daily life as belonging to the LORD."];
  }
  if (/tithe|tenth|firstling|firstfruits|place which the lord|before the lord|rejoice/.test(lower)) {
    return ["Worship and provision are being brought before the LORD.", "Israel must receive harvest, animals, and celebration as gifts to enjoy under God's command."];
  }
  if (/poor|brother|lend|borrow|release|debt|bondman|servant|widow|fatherless|stranger/.test(lower)) {
    return ["Covenant life must protect vulnerable people.", "Moses teaches Israel that mercy, generosity, debt release, and fair treatment belong to obedience."];
  }
  if (/passover|unleavened|weeks|tabernacles|solemn feast|appear before|empty/.test(lower)) {
    return ["Israel's calendar is shaped around remembering and worshiping the LORD.", "The feasts keep rescue, harvest, joy, and gratitude in front of the whole nation."];
  }
  if (/judge|judges|justice|judgment|wrest|respect persons|gift|altogether just|witness/.test(lower)) {
    return ["Justice must be honest because Israel lives before the LORD.", "Courts, witnesses, and leaders may not twist judgment for fear, favoritism, or gain."];
  }
  if (/king|horses|wives|silver|gold|copy of this law|lifted up above his brethren/.test(lower)) {
    return ["Israel's future king must live under God's law.", "Royal power is not permission for pride, luxury, self-protection, or forgetting the LORD."];
  }
  if (/levite|priest|prophet|divination|observer|witch|familiar spirit|hearken unto him/.test(lower)) {
    return ["Israel must listen to the LORD's true word and reject false spiritual practices.", "Priests, Levites, and prophets serve under God's authority, not human superstition."];
  }
  if (/city of refuge|refuge|blood|manslayer|avenger|landmark|boundary/.test(lower)) {
    return ["Justice must protect life while still taking guilt seriously.", "Refuge cities and boundary laws keep Israel from treating blood, land, and truth carelessly."];
  }
  if (/war|battle|enemy|horses and chariots|captain|city|besiege|spoil|captive/.test(lower)) {
    return ["Israel's battles must be governed by the LORD's command.", "Even war is not a place for panic, cruelty, greed, or acting like the nations."];
  }
  if (/wife|husband|son|daughter|virgin|marry|divorce|brother's wife|household|family/.test(lower)) {
    return ["Family life is being placed under covenant responsibility.", "Marriage, children, inheritance, and household justice must not be handled selfishly."];
  }
  if (/blessed|curse|cursed|amen|mount gerizim|mount ebal|obey|hearken|secret things/.test(lower)) {
    return ["Moses sets covenant blessing and curse before Israel.", "The people must understand that obedience and rebellion lead in very different directions."];
  }

  return ["Moses is explaining a concrete part of covenant life in the land.", `In ${section.reference}, Israel is learning how worship, justice, mercy, and obedience must work before the LORD.`];
}

function getBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/clean|unclean|eat|beast|fish|fowl|abomination/.test(lower)) return ["🍽️ Daily eating is set apart", "🧼 Clean and unclean teach holiness", "🙌 Israel belongs to the LORD"];
  if (/tithe|firstling|firstfruits|rejoice|place which the lord|before the lord/.test(lower)) return ["🎁 Provision is received from God", "📍 Worship happens where He chooses", "🙌 Joy is practiced before the LORD"];
  if (/poor|brother|release|debt|servant|widow|fatherless|stranger/.test(lower)) return ["🤲 Mercy protects the vulnerable", "🏠 Covenant life reaches households", "📜 Obedience includes generosity"];
  if (/feast|passover|unleavened|weeks|tabernacles/.test(lower)) return ["📅 Israel's year remembers God", "🍞 Rescue and provision are celebrated", "👥 The whole nation worships together"];
  if (/judge|justice|judgment|wrest|witness|gift/.test(lower)) return ["⚖️ Judgment must be honest", "👁️ Favoritism must be refused", "📜 Truth matters before God"];
  if (/king|horses|wives|silver|gold/.test(lower)) return ["👑 Power must submit to God", "📖 The king needs the law", "⚠️ Pride can corrupt leadership"];
  if (/levite|priest|prophet|divination|witch|spirit/.test(lower)) return ["🕊️ Worship must stay holy", "👂 Israel must hear God's word", "🚫 False spiritual practices are rejected"];
  if (/refuge|blood|manslayer|avenger|landmark|boundary/.test(lower)) return ["🛡️ Life must be protected", "⚖️ Justice must be careful", "🗺️ Land boundaries matter"];
  if (/war|battle|enemy|city|spoil|captive/.test(lower)) return ["⚔️ Battle belongs under God's command", "🛡️ Fear must not rule Israel", "📜 Victory has holy limits"];
  if (/wife|husband|son|daughter|virgin|marry|divorce|family/.test(lower)) return ["🏠 Households need justice", "🤝 Relationships carry responsibility", "🧼 Holiness reaches private life"];
  if (/blessed|curse|cursed|amen|obey|hearken|secret things/.test(lower)) return ["✅ Obedience brings covenant blessing", "⚠️ Rebellion brings covenant warning", "📜 Israel must answer God's word"];

  return ["📜 The law teaches covenant life", "🏞️ Israel is preparing for the land", "🙌 Obedience must shape daily life"];
}

function getTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/poor|widow|fatherless|stranger|servant|debt|release/.test(lower)) return "Faithfulness to God must become mercy toward people.";
  if (/judge|justice|judgment|witness/.test(lower)) return "Truth and justice are part of worshiping the LORD.";
  if (/king/.test(lower)) return "Even the highest human authority must stay under God's word.";
  if (/blessed|curse|obey|hearken/.test(lower)) return "Covenant life is never neutral before the LORD.";
  return "Faithful life in the land must be shaped by God's command.";
}

function makeExplanation(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], title: string) {
  const [lineOne, lineTwo] = getMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getBullets(title),
    getTakeaway(title),
  ]);
}

export const DEUTERONOMY_14_29_PERSONAL_SECTIONS: PersonalSection[] = generatedDeuteronomyFourteenToTwentyNinePersonalSections.map((section) => ({
  ...section,
  phrases: section.phrases.map(([title]) => [
    title,
    makeExplanation(section, title),
  ] as PersonalPhrase),
}));
