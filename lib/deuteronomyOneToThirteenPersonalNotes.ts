import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedDeuteronomyOneToThirteenPersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Our God",
    "Hear O Israel",
    "Keep The Commandments",
    "Remember",
    "The Land Which The LORD Sware",
    "Love The LORD Thy God",
    "With All Thine Heart",
  ],
});

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getDeuteronomyOneToThirteenMeaning(title: string, section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord our god|lord thy god|lord spake|said unto me|commanded|as the lord/.test(lower)) {
    return ["Moses is grounding Israel's life in the LORD's word.", "Deuteronomy is not a speech about self-improvement; it is covenant instruction from the God who rescued them."];
  }
  if (/moses|spake unto all israel|this side jordan|wilderness|horeb|kadeshbarnea|turned|journey/.test(lower)) {
    return ["Moses is retelling Israel's journey before they enter the land.", "The new generation must understand where they have been so they can obey where they are going."];
  }
  if (/judges|captains|wise men|hear between|righteous judgment|respect persons/.test(lower)) {
    return ["Israel needs ordered justice among the people.", "Leaders must judge fairly because covenant life cannot be built on favoritism or fear."];
  }
  if (/go up|possess|land|inheritance|mountain|giants|walled|good land|sware/.test(lower)) {
    return ["The land is God's promised gift to Israel.", "The question is whether the people will trust the LORD enough to enter and obey."];
  }
  if (/rebelled|murmured|would not go|afraid|unbelief|forty years|children|wander/.test(lower)) {
    return ["Moses is reminding Israel how unbelief damaged the previous generation.", "Fear turned into rebellion when the people refused to trust the LORD's promise."];
  }
  if (/edom|moab|ammon|sihon|og|bashan|jordan|cities|battle|smote/.test(lower)) {
    return ["The LORD orders Israel's dealings with surrounding nations.", "Some lands are not theirs to take, while other battles show God giving victory as He promised."];
  }
  if (/statutes|judgments|commandments|teach|keep|do them|observe/.test(lower)) {
    return ["God's commands are meant to be heard and practiced.", "Israel must not treat covenant instruction as information only; obedience is the path of life in the land."];
  }
  if (/idols|graven image|other gods|corrupt|jealous|fire|sun|moon|stars/.test(lower)) {
    return ["The LORD forbids Israel from turning worship toward created things.", "Idolatry would corrupt the people by replacing the living God with something made or seen."];
  }
  if (/ten commandments|tables|sabbath|honour thy father|kill|adultery|steal|false witness|covet/.test(lower)) {
    return ["The covenant commands teach Israel how to live before God and neighbor.", "Worship, family, truth, rest, and desire all come under the LORD's authority."];
  }
  if (/hear o israel|love the lord|heart|soul|might|teach them|doorposts|bind/.test(lower)) {
    return ["Israel is called to love the LORD with the whole life.", "God's word must shape the home, the children, the daily road, and the heart."];
  }
  if (/remember|forget|egypt|bondage|wilderness|manna|humbled|fed thee|wealth|power/.test(lower)) {
    return ["Israel must remember that life comes from the LORD.", "The danger in the land is forgetting the God who fed, humbled, corrected, and carried them."];
  }
  if (/chosen|holy people|treasure|covenant|mercy|fathers|love/.test(lower)) {
    return ["Israel belongs to the LORD by covenant mercy.", "Their identity begins with God's love and promise, not with their size, power, or goodness."];
  }
  if (/destroy|drive out|nations|consume|snare|abomination|fear them not/.test(lower)) {
    return ["Israel must not make peace with idolatry in the land.", "The nations' false worship would become a snare if Israel tried to keep what God commanded them to remove."];
  }
  if (/golden calf|provoked|stiffnecked|interceded|forty days|ark|tables|levi/.test(lower)) {
    return ["Moses reminds Israel of their covenant failure at Sinai.", "The story exposes their stubbornness, but it also shows the mercy of God through intercession and renewed covenant tablets."];
  }
  if (/circumcise|heart|fear the lord|serve him|cleave|stranger|fatherless|widow/.test(lower)) {
    return ["The LORD wants obedience that reaches the heart.", "Israel must fear Him, love Him, serve Him, and show justice to vulnerable people because that reflects His own character."];
  }
  if (/blessing|curse|gerizim|ebal|if ye obey|if ye will not obey/.test(lower)) {
    return ["Moses sets covenant blessing and curse before Israel.", "The people are being taught that obedience and rebellion lead in different directions."];
  }
  if (/place which the lord|choose|sacrifice|altar|eat before|rejoice|blood|high places/.test(lower)) {
    return ["Worship in the land must happen the LORD's way.", "Israel may not copy the nations or invent worship; sacrifice, joy, and blood must be handled under God's command."];
  }
  if (/prophet|dreamer|sign|wonder|secretly|serve other gods|belial/.test(lower)) {
    return ["False spiritual influence must not pull Israel away from the LORD.", "Even impressive signs or close relationships cannot excuse worshiping other gods."];
  }
  if (/places|river|mount|border|coast|plain|wilderness|jordan|cities/.test(lower)) {
    return ["Moses is speaking about real places tied to Israel's covenant journey.", "The land, roads, borders, and cities matter because obedience must happen in the actual place God is giving them."];
  }

  return ["Moses is explaining covenant life before Israel enters the land.", `In ${section.reference}, the people are being taught to remember the LORD, obey His commands, reject idols, and love Him with the whole heart.`];
}

function getDeuteronomyOneToThirteenBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/land|inheritance|possess|jordan|cities|nations/.test(lower)) return ["🏞️ The land is God's gift", "📜 Israel must enter by faith", "🙌 Obedience belongs in the land"];
  if (/commandments|statutes|judgments|keep|observe|do them/.test(lower)) return ["📜 God's word must be kept", "🚶 Obedience is practiced", "🧠 The heart must remember"];
  if (/idols|other gods|graven|image|false|prophet|dreamer/.test(lower)) return ["🚫 Idolatry must be rejected", "🙌 Worship belongs to the LORD alone", "🛡️ False voices must not lead Israel"];
  if (/heart|love|soul|might|hear o israel|teach/.test(lower)) return ["❤️ Love reaches the heart", "👨‍👩‍👧 Children must be taught", "🏠 God's word shapes the home"];
  if (/remember|forget|egypt|wilderness|manna|humbled/.test(lower)) return ["🧠 Memory guards faith", "🍞 The LORD provided in the wilderness", "⚠️ Forgetting leads to pride"];
  if (/judge|justice|respect persons|wise men/.test(lower)) return ["⚖️ Justice must be fair", "👥 Leaders serve the people", "🙌 Judgment belongs under God"];
  if (/calf|stiffnecked|interceded|tables|ark/.test(lower)) return ["💔 Israel sinned at Sinai", "🙏 Moses interceded for mercy", "📜 Covenant mercy was renewed"];

  if (/places|river|mount|border|coast|plain|wilderness|jordan|cities/.test(lower)) return ["📍 Real places carry covenant memory", "🏞️ The land is tied to God's promise", "🚶 Israel must obey where God leads"];

  return ["📜 Moses teaches covenant life", "🏞️ Israel is preparing for the land", "🙌 Faithfulness means loving and obeying the LORD"];
}

function makeDeuteronomyOneToThirteenExplanation(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], title: string) {
  const [lineOne, lineTwo] = getDeuteronomyOneToThirteenMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getDeuteronomyOneToThirteenBullets(title),
  ]);
}

export const DEUTERONOMY_1_13_PERSONAL_SECTIONS: PersonalSection[] = generatedDeuteronomyOneToThirteenPersonalSections.map((section) => ({
  ...section,
  phrases: section.phrases.map(([title]) => [
    title,
    makeDeuteronomyOneToThirteenExplanation(section, title),
  ] as PersonalPhrase),
}));
