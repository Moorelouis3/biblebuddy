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

function getDeuteronomy1To13DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getDeuteronomy1To13Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/lord our god|lord thy god|commanded|spake|hear o israel|keep|statutes|judgments|commandments/.test(lower)) return ["\u{1F4DC} God's word must be kept", "\u{1F6B6} Obedience is practiced", "\u{1F9E0} The heart must remember", "\u{1F64C} Covenant life begins with the LORD"];
  if (/wilderness|horeb|kadesh|jordan|journey|turned|mount|seir|moab|ammon|bashan/.test(lower)) return ["\u{1F4CD} Real places carry covenant memory", "\u{1F3DE}\u{FE0F} The land is tied to God's promise", "\u{1F6B6} Israel must obey where God leads", "\u{1F9E0} The journey teaches the next generation"];
  if (/judge|justice|wise|captains|respect persons|hear between/.test(lower)) return ["\u{2696}\u{FE0F} Justice must be fair", "\u{1F465} Leaders serve the people", "\u{1F64C} Judgment belongs under God", "\u{1F6AB} Favoritism must not rule"];
  if (/land|inheritance|possess|giants|walled|good land|sware|nations|cities/.test(lower)) return ["\u{1F3DE}\u{FE0F} The land is God's gift", "\u{1F4DC} Israel must enter by faith", "\u{1F64C} Obedience belongs in the land", "\u{26A0}\u{FE0F} Fear must not rule the promise"];
  if (/rebel|murmur|afraid|forty years|wander|calf|stiffnecked|interceded|tables|ark/.test(lower)) return ["\u{1F494} Israel's sin is remembered honestly", "\u{1F64F} Moses intercedes for mercy", "\u{1F4DC} Covenant mercy is renewed", "\u{26A0}\u{FE0F} Rebellion has consequences"];
  if (/heart|love|soul|might|teach|children|house|bind|doorposts/.test(lower)) return ["\u{2764}\u{FE0F} Love reaches the heart", "\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467} Children must be taught", "\u{1F3E0} God's word shapes the home", "\u{1F9E0} Memory must become daily practice"];
  if (/remember|forget|egypt|manna|humbled|bread|power|wealth/.test(lower)) return ["\u{1F9E0} Memory guards faith", "\u{1F35E} The LORD provided in the wilderness", "\u{26A0}\u{FE0F} Forgetting leads to pride", "\u{1F64C} Dependence matters more than self-trust"];
  if (/idol|other gods|graven|image|false|prophet|dreamer|belial|serve/.test(lower)) return ["\u{1F6AB} Idolatry must be rejected", "\u{1F64C} Worship belongs to the LORD alone", "\u{1F6E1}\u{FE0F} False voices must not lead Israel", "\u{1F525} Covenant loyalty is guarded"];
  if (/place which the lord|choose|sacrifice|altar|eat before|rejoice|blood|high places/.test(lower)) return ["\u{26FA} Worship must happen God's way", "\u{1F525} Sacrifice is not invented", "\u{1F6AB} Pagan worship patterns are rejected", "\u{1F389} Rejoicing stays under God's command"];
  return ["\u{1F4DC} Moses teaches covenant life", "\u{1F3DE}\u{FE0F} Israel is preparing for the land", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Faithfulness means loving and obeying the LORD"];
}

function explainDeuteronomy1To13At95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord our god|lord thy god/.test(lower)) opening = ["The LORD our God identifies Israel's covenant God personally.", "Moses is not giving general religion; he is calling Israel back to the God who rescued them."];
  else if (/spake|said unto me|commanded|as the lord/.test(lower)) opening = ["The command begins with the LORD's word.", "Deuteronomy grounds Israel's future in what God has spoken, not in self-confidence."];
  else if (/moses|spake unto all israel/.test(lower)) opening = ["Moses is addressing the new generation before they enter the land.", "His speech retells the journey so Israel will remember and obey."];
  else if (/this side jordan|wilderness|horeb|kadeshbarnea|seir|moab|ammon|bashan/.test(lower)) opening = ["The place name anchors Moses' speech in Israel's real journey.", "The geography matters because obedience must happen in the actual land God gives."];
  else if (/judges|captains|wise men|hear between|righteous judgment|respect persons/.test(lower)) opening = ["The justice language describes fair leadership among the people.", "Israel cannot live as God's covenant people if judgment is twisted by fear or favoritism."];
  else if (/go up|possess|land|inheritance|mountain|giants|walled|good land|sware/.test(lower)) opening = ["Possess the land means receive and enter what God promised.", "The land is gift, but Israel must trust and obey the LORD there."];
  else if (/rebelled|murmured|would not go|afraid|unbelief|forty years|children|wander/.test(lower)) opening = ["Moses recalls how fear became rebellion in the previous generation.", "The warning teaches the new generation not to repeat unbelief at the edge of promise."];
  else if (/calf|stiffnecked|interceded|tables|ark/.test(lower)) opening = ["The Sinai rebellion is remembered so Israel will understand mercy honestly.", "God renewed covenant after real sin, not because Israel deserved it."];
  else if (/hear o israel/.test(lower)) opening = ["Hear O Israel is a call to listen with covenant attention.", "Moses is summoning the whole people to receive God's command with heart and life."];
  else if (/love the lord|heart|soul|might/.test(lower)) opening = ["Love the LORD means covenant loyalty with the whole person.", "Deuteronomy refuses a shallow obedience that leaves the heart untouched."];
  else if (/teach|children|house|bind|doorposts|gates/.test(lower)) opening = ["Teaching the children means God's word must shape the home.", "The command moves faith from public hearing into ordinary family life."];
  else if (/remember|forget|egypt|manna|humbled|bread/.test(lower)) opening = ["Remember means actively keep the LORD's rescue and provision in mind.", "Forgetting would turn wilderness mercy into pride and self-trust."];
  else if (/power|get wealth|heart lifted/.test(lower)) opening = ["The warning about power and wealth exposes pride after blessing.", "Israel must not treat God's gifts as proof of their own greatness."];
  else if (/idol|other gods|graven|image|serve/.test(lower)) opening = ["Other gods and graven images mean rival worship.", "Israel's covenant with the LORD cannot be shared with manufactured gods."];
  else if (/place which the lord|choose|altar|sacrifice|blood|high places/.test(lower)) opening = ["The chosen place means worship must follow the LORD's command.", "Israel may not copy Canaan's worship patterns or handle sacrifice casually."];
  else if (/prophet|dreamer|sign|wonder|secretly|belial/.test(lower)) opening = ["A false prophet or dreamer could sound spiritual while leading away from the LORD.", "Even impressive signs cannot excuse idolatry."];
  else opening = [`This wording names ${getDeuteronomy1To13DistinctiveTopic(cleanTitle)} in Deuteronomy ${section.chapter}.`, "The phrase gives a concrete part of covenant memory, obedience, warning, worship, or love."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getDeuteronomy1To13DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or warning in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getDeuteronomy1To13Support(cleanTitle),
  ].slice(0, 8));
}

function makeDeuteronomyOneToThirteenExplanation(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainDeuteronomy1To13At95(section, title, occurrenceIndex);

  const [lineOne, lineTwo] = getDeuteronomyOneToThirteenMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getDeuteronomyOneToThirteenBullets(title),
  ]);
}

export const DEUTERONOMY_1_13_PERSONAL_SECTIONS: PersonalSection[] = generatedDeuteronomyOneToThirteenPersonalSections.map((section) => ({
  ...section,
  phrases: (() => {
    const seen = new Map<string, number>();
    return section.phrases.map(([title]) => {
      const key = stripLeadingEmoji(title).toLowerCase();
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);
      return [
        title,
        makeDeuteronomyOneToThirteenExplanation(section, title, occurrence),
      ] as PersonalPhrase;
    });
  })(),
}));
