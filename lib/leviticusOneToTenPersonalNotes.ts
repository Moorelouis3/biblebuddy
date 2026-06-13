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

function getLeviticusTitleIcon(title: string) {
  if (/burnt offering|fire|burn|flay|pieces/i.test(title)) return "🔥";
  if (/sweet savour|ashes|wood|flay|cut|wash|inwards|legs|crop|feathers|wings|divide|asunder/i.test(title)) return "🔥";
  if (/meat offering|grain|flour|oil|frankincense|cakes|wafers/i.test(title)) return "🌾";
  if (/memorial|baken|fryingpan|honey|firstfruits|salt|green ears|corn|full ears/i.test(title)) return "🌾";
  if (/peace offering|thanksgiving|vow|freewill/i.test(title)) return "🕊️";
  if (/sin offering|trespass offering|sin|ignorance|forgiven|forgiveness/i.test(title)) return "🩸";
  if (/blood|atonement|sprinkle|altar|without blemish|lay his hand|kill/i.test(title)) return "🩸";
  if (/bullock|lamb|ram|goat|kid|herd|flock|cattle/i.test(title)) return "🐐";
  if (/priest|aaron|sons|consecrate|anoint|garments|wash|oil/i.test(title)) return "🕯️";
  if (/holy|unclean|clean|defiled|separate|sanctify|abomination|abominable|make a difference/i.test(title)) return "🧼";
  if (/leprosy|plague|skin|scab|bright spot|priest shall look|shut up|pronounce|hair|deeper|flesh|camp|clothes|rent|bare|cover/i.test(title)) return "🧼";
  if (/goat|scapegoat|mercy seat|holy place|incense|within the veil|azazel/i.test(title)) return "🐐";
  if (/nadab|abihu|strange fire|died|glory|appeared|accepted|befallen|content/i.test(title)) return "⚠️";
  if (/bird|fowl|turtle|pigeon|eagle|vulture|raven|owl|locust/i.test(title)) return "🐦";
  if (/kidney|fat|liver|inwards/i.test(title)) return "🫀";
  if (/issue|running|seed|woman|blood|separation|fountain|plague be healed|bed|saddle|lieth|bathe|water|earthen vessel/i.test(title)) return "🧼";
  if (/command|spake|said|law|statute|ordinance|teach|called unto moses/i.test(title)) return "📜";
  if (/before the lord|unto the lord|tabernacle|congregation|sanctuary|hallowed|eighth day|blessed|shouted|fell on their faces/i.test(title)) return "🙌";
  if (/camel|coney|hare|swine|beasts|hoof|cud|fins|scales|creeping thing|belly|all four|carcase/i.test(title)) return "🐾";
  if (/man child|seven days|circumcised|purifying|open field|house|break down the house|scrape the house/i.test(title)) return "🏠";
  if (/young calf|people's offering|breasts|wave breast|heave shoulder|due/i.test(title)) return "🐐";
  if (/afflict your souls|sabbath of rest|once in a year|confess|iniquities|not inhabited/i.test(title)) return "🐐";
  return "🔎";
}

function ensureLeviticusTitleEmoji(title: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  return `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`;
}

function getLeviticusSectionIcon(section: PersonalLeviticusPhraseSectionInput) {
  const text = `${section.title} ${section.reference}`.toLowerCase();
  if (/skin disease|leprosy|examination/.test(text)) return "🧼";
  if (/garments/.test(text)) return "👕";
  if (/contaminated house/.test(text)) return "🏠";
  if (/bodily discharges/.test(text)) return "💧";
  if (/atonement|scapegoat|mercy seat|solemn rest/.test(text)) return "🐐";
  if (/cleansing the restored person/.test(text)) return "🕊️";
  if (/burnt/.test(text)) return "🔥";
  if (/meat|grain|flour/.test(text)) return "🌾";
  if (/peace/.test(text)) return "🕊️";
  if (/sin|trespass|forgiven/.test(text)) return "🩸";
  if (/priest|aaron|consecration|ordination/.test(text)) return "🕯️";
  if (/strange fire|nadab|abihu/.test(text)) return "⚠️";
  if (/clean|unclean|food|animals/.test(text)) return "🧼";
  if (/leprosy|skin|plague/.test(text)) return "🧼";
  return getLeviticusTitleIcon(section.title);
}

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
  const context = body.toLowerCase();

  if (context.includes("burnt offering")) {
    add(`${title} means the offering is being given to God in surrender.`, "The burnt offering rises from the altar as worship, atonement, and dedication.", "The details are not empty ritual. They show that coming near to God involves life, cost, and God's provided way.", "\u{1F525} Whole offering", "\u{1FA78} Atonement", "\u{1F64C} Surrender");
  } else if (context.includes("grain offering")) {
    add(`${title} means daily provision can be offered back to God in gratitude.`, "The grain offering uses what comes from the field and kitchen rather than the herd.", "Fine flour, oil, frankincense, salt, and firstfruits teach dedication with ordinary provision.", "\u{1F33E} Grain", "\u{1FA94} Oil", "\u{1F9C2} Covenant salt");
  } else if (context.includes("peace offering")) {
    add(`${title} means fellowship with God is treated as holy and costly.`, "The peace offering celebrates wholeness, gratitude, and restored relationship before the LORD.", "The rich portions are offered to God first because peace with Him is not casual.", "\u{1F91D} Fellowship", "\u{1F525} Offered to God", "\u{1F37D}\u{FE0F} Shared peace");
  } else if (context.includes("sin") || context.includes("congregation") || context.includes("leader")) {
    add(`${title} means sin must be dealt with truthfully before God.`, "Leviticus teaches that guilt cannot be ignored, even when the sin was not open rebellion.", "God provides atonement so priests, leaders, the whole community, and ordinary people can be forgiven.", "\u{1F4DD} Sin named", "\u{1FA78} Atonement provided", "\u{2705} Forgiveness");
  } else if (context.includes("guilt") || context.includes("restitution") || context.includes("trespass")) {
    add(`${title} means guilt creates real responsibility before God and people.`, "Leviticus does not treat wrong as a private feeling only.", "When harm is done, the worshiper must confess, bring the offering God commands, and repair what can be repaired.", "\u{1F9FE} Restitution", "\u{2795} Added fifth", "\u{1F410} Guilt offering");
  } else if (context.includes("washed and clothed") || context.includes("priests for service")) {
    add(`${title} means priests must be prepared before serving near God's presence.`, "Aaron and his sons are washed, clothed, anointed, and marked for service.", "They do not step into holy work by natural right. God prepares them by His command.", "\u{1F4A7} Washed", "\u{1F455} Clothed", "\u{1FA94} Anointed");
  } else if (lower.includes("eighth day") || lower.includes("glory") || lower.includes("fire came") || lower.includes("blessed the people") || lower.includes("shouted") || lower.includes("fell on their faces")) {
    add(`${title} means priestly ministry is moving from preparation into public worship.`, "After seven days of ordination, Aaron starts serving before the whole congregation.", "The people see that God receives worship His way.", "\u{2728} Glory appears", "\u{1F525} Fire receives the offering", "\u{1F64C} The people worship", "God's nearness is beautiful, but it comes through His appointed way.");
  } else if (lower.includes("strange fire") || lower.includes("commanded them not") || lower.includes("nadab") || lower.includes("abihu") || lower.includes("sanctified") || lower.includes("held his peace")) {
    add(`${title} means holy service cannot be invented by the priests.`, "Nadab and Abihu come near with fire God had not commanded.", "The issue is not merely that they made a small mistake; they treated holy service as something they could shape themselves.", "\u{26A0}\u{FE0F} Unauthorized worship", "\u{1F525} Holy fire", "\u{1F910} Aaron is silent", "The closer someone serves near God's presence, the more serious obedience becomes.");
  } else if (lower.includes("wine") || lower.includes("strong drink") || lower.includes("holy and unholy") || lower.includes("clean and unclean") || lower.includes("teach the children")) {
    add(`${title} means priests must serve with clear minds and careful judgment.`, "Priests are not only people who handle sacrifices.", "They help Israel understand the difference between holy, common, clean, and unclean.", "\u{1F9ED} Discernment", "\u{1F4D6} Teaching", "\u{1F6AB} Blurred judgment is dangerous", "God's people need leaders who can explain His ways, not just perform rituals.");
  } else if (lower.includes("parteth the hoof") || lower.includes("cheweth the cud") || lower.includes("fins") || lower.includes("scales") || lower.includes("abomination") || lower.includes("creeping") || lower.includes("flying")) {
    add(`${title} means Israel learned holiness even at the dinner table.`, "These food laws trained Israel to make distinctions every day.", "Meals became reminders that Israel was set apart for the holy LORD and was not just like the nations around them.", "\u{1F37D}\u{FE0F} Holiness at the table", "\u{1F9ED} Distinctions", "\u{1F465} Set-apart people", "A beginner should not read this as random diet advice. It is identity training for a covenant people.");
  } else if (lower.includes("carcase") || lower.includes("unclean until the even") || lower.includes("wash his clothes") || lower.includes("earthen vessel") || lower.includes("be holy") || lower.includes("i am holy")) {
    add(`${title} means uncleanness could affect ordinary daily life.`, "Uncleanness is often connected to death, decay, and contact with what does not fit near holy space.", "It is not always personal sin, but it still affects worship access.", "\u{1F480} Death and disorder", "\u{1F4A7} Washing and waiting", "\u{1F54A}\u{FE0F} Be holy", "God gives boundaries and a way back, so uncleanness is serious but not hopeless.");
  } else if (lower.includes("conceived seed") || lower.includes("child") || lower.includes("purifying") || lower.includes("turtledoves") || lower.includes("young pigeons") || lower.includes("circumcised")) {
    add(`${title} means childbirth had a path back into regular sanctuary worship.`, "Leviticus is not calling babies evil or motherhood sinful.", "The chapter deals with blood, birth, and returning after a major body-and-family event.", "\u{1F476} Childbirth", "\u{1FA78} Blood and purification", "\u{1F426} Offering for the poor", "This law quietly prepares readers for Luke 2, where Mary brings the poor-person offering after Jesus is born.");
  } else if (lower.includes("leprosy") || lower.includes("plague") || lower.includes("skin") || lower.includes("scab") || lower.includes("bright spot") || lower.includes("priest shall look") || lower.includes("shut up") || lower.includes("outside the camp") || lower.includes("without the camp")) {
    add(`${title} means visible uncleanness had to be examined carefully.`, "The priest is not guessing.", "He looks, waits, checks again, and only then declares clean or unclean.", "\u{1F50E} Careful examination", "\u{23F3} Waiting when unclear", "\u{1F3D5}\u{FE0F} Outside the camp", "Being outside the camp was painful, but it protected the place where God's holy presence dwelt.");
  } else if (lower.includes("garment") || lower.includes("warp") || lower.includes("woof") || lower.includes("linen") || lower.includes("woollen") || lower.includes("wash") || lower.includes("burn")) {
    add(`${title} means even clothing and ordinary objects were handled under God's holiness.`, "Leviticus does not treat daily life as separate from worship.", "If contamination spreads in fabric or leather, it must be examined, washed, torn out, or burned.", "\u{1F9E5} Garments", "\u{1F4A7} Washing", "\u{1F525} Removing spread", "What keeps spreading corruption cannot be ignored forever.");
  } else if (lower.includes("two birds") || lower.includes("cedar") || lower.includes("scarlet") || lower.includes("hyssop") || lower.includes("living bird") || lower.includes("open field") || lower.includes("shave") || lower.includes("he shall be clean")) {
    add(`${title} means God gives a way back after uncleanness.`, "Leviticus 14 is good news because restoration is possible.", "The priest goes outside the camp, cleansing is performed, and the restored person moves back toward community and worship.", "\u{1F54A}\u{FE0F} Living bird released", "\u{1F4A7} Washing", "\u{2705} He shall be clean", "God does not only identify uncleanness. He provides restoration.");
  } else if (lower.includes("house") || lower.includes("stones") || lower.includes("scrape") || lower.includes("break down") || lower.includes("land of canaan")) {
    add(`${title} means Israel's homes were also brought under God's holy order.`, "These laws look ahead to life in the promised land.", "Houses, stones, walls, and ordinary living spaces matter because God is forming a holy people.", "\u{1F3E0} Home life", "\u{1F9F1} Stones removed", "\u{1F3DA}\u{FE0F} House torn down if needed", "Restoration is attempted first, but spreading corruption must be taken seriously.");
  } else if (lower.includes("issue") || lower.includes("seed") || lower.includes("bathe") || lower.includes("flesh in water") || lower.includes("monthly") || lower.includes("separation")) {
    add(`${title} brings private body matters before the holy LORD.`, "Leviticus 15 can feel uncomfortable, but it teaches that bodies are not outside God's care. Some conditions are abnormal, some are ordinary, and God gives a path back to cleanness.", "\u{1F4A7} Washing", "\u{23F3} Waiting", "\u{1F64F} Restoration", "Ritual impurity is not always moral guilt. It marks boundaries around life, blood, fluids, and holy space.");
  } else if (lower.includes("mercy seat") || lower.includes("scapegoat") || lower.includes("azazel") || lower.includes("within the veil") || lower.includes("all their iniquities") || lower.includes("atonement") || lower.includes("come not at all times") || lower.includes("afflict your souls")) {
    add(`${title} means Israel needed deep cleansing before the holy LORD.`, "Once a year, the high priest enters the Most Holy Place with blood.", "One goat dies before the LORD, and the live goat carries the confessed sins away.", "\u{1FA78} Blood atonement", "\u{1F410} Sin carried away", "\u{1F6AA} Access only God's way", "This is one of the clearest pictures in the Old Testament that sin must be covered and removed.");
  } else if (lower.includes("burnt") || lower.includes("whole") || lower.includes("flay") || lower.includes("pieces")) {
    add(`${title} means the offering is given to God in whole surrender.`, "The whole animal goes up on the altar, teaching Israel that worship is not giving God leftovers.", "\u{1F525} Whole offering", "\u{1FA78} Atonement", "\u{1F64C} Surrender", "Coming near to God involves cost, life, and God's provided way.");
  } else if (lower.includes("hand") || lower.includes("head")) {
    add(`${title} means the worshiper is personally connected to the offering.`, "The worshiper places a hand on the animal's head.", "That action shows the offering is not random or distant. It stands connected to the person bringing it.", "\u{1F590}\u{FE0F} Hand on the head", "\u{1F501} Identification", "\u{1FA78} Life for life", "Sacrifice is personal, not empty ritual.");
  } else if (lower.includes("blood") || lower.includes("sprinkle") || lower.includes("horns") || lower.includes("bottom of the altar")) {
    add(`${title} treats life and atonement as serious before God.`, "In Leviticus, blood is not treated as common because it represents life before the LORD.", "\u{1FA78} Blood", "\u{26A0}\u{FE0F} Sin is serious", "\u{1F64F} Atonement", "The priest handles the blood because God provides a holy way for guilt to be covered.");
  } else if (lower.includes("fine flour") || lower.includes("oil") || lower.includes("frankincense") || lower.includes("meat offering") || lower.includes("grain")) {
    add(`${title} means daily provision can be offered back to God in gratitude.`, "This offering uses what comes from the field and kitchen rather than the herd.", "It teaches dedication, thankfulness, and worship with ordinary provision.", "\u{1F33E} Grain", "\u{1FA94} Oil", "\u{1F4A8} Frankincense", "Israel gives back to the LORD from what He has provided.");
  } else if (lower.includes("leaven") || lower.includes("honey") || lower.includes("salt")) {
    add(`${title} means worship has covenant boundaries.`, "Leaven and honey were not burned on the altar, but salt was required as a sign of covenant faithfulness.", "\u{1F9C2} Salt", "\u{1F6AB} No leaven", "\u{1F91D} Covenant faithfulness", "God defines worship; Israel does not invent it.");
  } else if (lower.includes("peace") || lower.includes("fat") || lower.includes("kidneys") || lower.includes("caul") || lower.includes("inwards")) {
    add(`${title} means fellowship with God is treated as holy and costly.`, "The rich inner portions are offered to the LORD, teaching that the best and deepest parts are not handled casually.", "\u{1F91D} Fellowship", "\u{1F525} Offered to God", "\u{1F37D}\u{FE0F} Shared peace", "Peace in Leviticus means wholeness and restored relationship, not just the absence of trouble.");
  } else if (lower.includes("sin") || lower.includes("ignorance") || lower.includes("unwittingly") || lower.includes("guilty") || lower.includes("forgiven")) {
    add(`${title} means sin must be dealt with truthfully before God.`, "Leviticus teaches that sin matters even when someone did not mean to rebel.", "God provides atonement instead of telling Israel to ignore guilt.", "\u{1F4DD} Sin named", "\u{1FA78} Atonement provided", "\u{2705} Forgiveness", "This is mercy with truth: God does not minimize sin, but He gives a way back.");
  } else if (lower.includes("priest") || lower.includes("congregation") || lower.includes("ruler") || lower.includes("common")) {
    add(`${title} reminds the reader that everyone needs atonement.`, "Priests, leaders, the whole congregation, and ordinary people are all accountable before the holy LORD.", "\u{1F46A} Whole community", "\u{1F451} Leaders", "\u{1F64F} Priests also need mercy", "No role puts a person above confession and forgiveness.");
  } else if (lower.includes("confess") || lower.includes("witness") || lower.includes("unclean") || lower.includes("oath") || lower.includes("swearing")) {
    add(`${title} brings guilt into everyday life.`, "Leviticus names ordinary sins like silence, uncleanness, careless words, and broken honesty.", "\u{1F5E3}\u{FE0F} Words matter", "\u{1F9FC} Uncleanness matters", "\u{1F64F} Confession", "God cares about hidden and ordinary wrongs, not only dramatic rebellion.");
  } else if (lower.includes("restitution") || lower.includes("fifth") || lower.includes("restore") || lower.includes("ram") || lower.includes("trespass")) {
    add(`${title} means wrongs must be repaired, not only regretted.`, "Guilt is treated like real damage.", "The person restores what was wrong and adds a fifth instead of pretending the harm never happened.", "\u{1F9FE} Restitution", "\u{2795} Add the fifth", "\u{1F410} Guilt offering", "Forgiveness does not cancel the responsibility to make wrongs right.");
  } else if (lower.includes("fire") || lower.includes("ashes") || lower.includes("altar")) {
    add(`${title} teaches careful priestly service at the altar.`, "The altar fire, ashes, and holy place details show that worship near God's presence is tended carefully.", "\u{1F525} Fire", "\u{1F9F9} Ashes handled", "\u{1F64C} Holy service", "Leviticus slows down because holy things must not be handled casually.");
  } else if (lower.includes("washed") || lower.includes("garments") || lower.includes("anointed") || lower.includes("aaron") || lower.includes("sons") || lower.includes("consecration")) {
    add(`${title} means priests must be prepared before serving near God's presence.`, "Aaron and his sons are washed, clothed, anointed, and marked for service before they can minister.", "\u{1F4A7} Washed", "\u{1F455} Clothed", "\u{1FA94} Anointed", "The priests must be prepared by God's command before they serve.");
  } else {
    add(`${title} means this detail helps explain worship near God's presence.`, body, summary, "Leviticus is teaching how sinful people can live near a holy God.");
  }

  return note(lines.slice(0, 8));
}

function makeMinedLeviticusPhrase(section: PersonalLeviticusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainLeviticusMinedPhrase(title, section.title, `${section.title} helps explain worship near God's presence.`)];
}
function makeBeginnerLeviticusPhrase(title: string, section: PersonalLeviticusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the offering instructions are easier to follow.`,
    focus,
    "Leviticus can feel strange at first because it talks about animals, blood, flour, oil, salt, fat, priests, and fire.",
    "But the big question is simple: how can people with sin come near the holy God who now dwells among them?",
    "â›º God's presence",
    "ðŸ”¥ Costly worship",
    "ðŸ©¸ Atonement",
    "ðŸ¤² Mercy provided",
    `In ${section.title}, the details help explain the way God gives for worship, cleansing, fellowship, or forgiveness.`,
  ]);
}

function ensureBeginnerLeviticusPhraseDepth(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerLeviticusPhrase("ðŸ§­ The Offering Scene", section, "The wording helps locate the offering scene: who brings the offering, what is done with it, and what need it answers before God."),
    makeBeginnerLeviticusPhrase("ðŸ”Ž Why This Detail Matters", section, "This detail matters because Leviticus teaches through repeated actions like bringing, laying on hands, sprinkling blood, burning portions, and receiving forgiveness."),
    makeBeginnerLeviticusPhrase("ðŸ§  Beginner Connection", section, "A new Bible reader may not know why these rituals matter, but they prepare the whole Bible's language of sacrifice, priesthood, holiness, and atonement."),
    makeBeginnerLeviticusPhrase("ðŸ§µ Watch The Pattern", section, "Watch the pattern: God speaks from the tabernacle, the worshiper brings what God commands, the priest serves at the altar, and God provides a way near."),
    makeBeginnerLeviticusPhrase("â¤ï¸ What This Shows About People", section, "This scene shows that people need surrender, gratitude, fellowship, cleansing, and forgiveness because sin affects life near God's presence."),
    makeBeginnerLeviticusPhrase("ðŸ™Œ What This Shows About God", section, "This scene shows the LORD as holy and merciful. He tells His people the truth about sin while giving them a way to draw near."),
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
  1: ["ðŸ”¥ The burnt offering shows whole surrender.", "ðŸ©¸ Blood marks atonement at the altar.", "ðŸ™Œ Worship begins by coming God's way."],
  2: ["ðŸŒ¾ The grain offering gives thanks for provision.", "ðŸ§‚ Salt reminds Israel of covenant faithfulness.", "ðŸ”¥ Part is burned to the LORD; part supports the priests."],
  3: ["ðŸ¤ The peace offering celebrates fellowship.", "ðŸ½ï¸ Worship can include a shared meal.", "ðŸ©¸ Life is claimed by God, so blood is not treated as common."],
  4: ["ðŸ’” Sin can happen even when people do not mean to rebel.", "ðŸ©¸ Atonement is needed for priest, people, leader, and common person.", "ðŸ™Œ God provides forgiveness without pretending sin is small."],
  5: ["ðŸ—£ï¸ Guilt must be confessed honestly.", "ðŸ¤² Mercy makes room for the poor.", "ðŸ§¾ Some wrongs create debt that must be repaired."],
  6: ["ðŸ¤ Sin against a neighbor is also sin against the LORD.", "ðŸ”¥ The altar fire is tended continually.", "ðŸ‘¨â€ðŸ³ Priests handle holy offerings carefully."],
  7: ["ðŸ©¸ The guilt offering is most holy.", "ðŸ™ Peace offerings include thanks, vows, and freewill worship.", "ðŸš« Blood and fat are reserved for God."],
  8: ["ðŸ‘• Priests are washed, clothed, and anointed.", "ðŸ©¸ Blood marks them for hearing, serving, and walking.", "â³ Consecration takes time and obedience."],
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
  const cleaned = content
    .replace(/\bThis phrase matters because\b/gi, "This is important because")
    .replace(/\bThe phrase matters because\b/gi, "This is important because")
    .replace(/\bmatters because\b/gi, "is important because")
    .replace(/\bbelongs to\b/gi, "is part of")
    .replace(/\bnot filler\b/gi, "part of the story")
    .replace(/not random ritual pieces/g, "not empty religious details")
    .replace(/\bA beginner should see that\s*/gi, "Notice that ")
    .replace(/\bA beginner should see\s*/gi, "Notice ")
    .replace(/\bA beginner should not read this as\s*/gi, "Do not read this as ")
    .replace(/\bA beginner should notice that\s*/gi, "Notice that ")
    .replace(/\bA beginner should notice\s*/gi, "Notice ")
    .replace(/\bA beginner should\s+/gi, "The reader can ")
    .replace(/\bFor beginners,?\s*/gi, "")
    .replace(/\bBible Buddy should slow down here because\s*/gi, "Slow down here because ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThis phrase helps\s+/gi, "The wording helps ")
    .replace(/\bThe phrase helps\s+/gi, "The wording helps ")
    .replace(/\bThis detail helps\s+/gi, "The wording helps ")
    .replace(/\bThe detail helps\s+/gi, "The wording helps ")
    .replace(/\bmeans this detail helps build\b/gi, "names a piece used to build")
    .replace(/\bmeans this detail helps form\b/gi, "names a piece used to form")
    .replace(/\bmeans this detail helps explain\b/gi, "names a detail that explains")
    .replace(/\bmeans this detail helps\b/gi, "names a detail that");
  if (section.chapter >= 1 && section.chapter <= 8) {
    return cleaned;
  }

  if (section.chapter < 1 || section.chapter > 8 || cleaned.includes("Key details:")) {
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
    "Key details:",
    ...cues,
    ...closing,
  ]);
}

function getLeviticusPhraseList(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/burnt offering|meat offering|peace offering|sin offering|trespass offering|offering|oblation|sacrifice/.test(lower)) {
    return [
      `🔥 ${cleanTitle}`,
      "🙌 Worship brought near",
      "🩸 Sacrifice before God",
      "📜 A holy pattern for approach",
    ];
  }

  if (/blood|atonement|sprinkle|altar|without blemish|lay his hand|kill/.test(lower)) {
    return [
      `🩸 ${cleanTitle}`,
      "⚖️ Sin taken seriously",
      "🙌 Life given before the LORD",
      "🕊️ Atonement and mercy",
    ];
  }

  if (/priest|aaron|sons|consecrate|anoint|garments|wash|oil/.test(lower)) {
    return [
      `🕯️ ${cleanTitle}`,
      "🧼 Priests set apart",
      "👕 Holy service",
      "🙌 Worship led God's way",
    ];
  }

  if (/holy|unclean|clean|defiled|separate|sanctify/.test(lower)) {
    return [
      `🧼 ${cleanTitle}`,
      "⚖️ Clean and unclean",
      "🙌 Holiness before God",
      "👥 Israel learning distinction",
    ];
  }

  if (/leprosy|plague|skin|scab|bright spot|priest shall look|shut up|pronounce/.test(lower)) {
    return [
      `🔎 ${cleanTitle}`,
      "🧑‍⚕️ Careful examination",
      "🏕️ Camp kept holy",
      "💔 Sickness and separation",
    ];
  }

  if (/goat|scapegoat|mercy seat|holy place|incense|within the veil|azazel/.test(lower)) {
    return [
      `🕊️ ${cleanTitle}`,
      "🩸 Atonement for sin",
      "🏕️ The holy place",
      "🙌 Mercy before the LORD",
    ];
  }

  if (/fire|strange fire|nadab|abihu|died|glory|appeared/.test(lower)) {
    return [
      `🔥 ${cleanTitle}`,
      "⚠️ Holy worship",
      "🙌 God's presence is serious",
      "📜 Worship must follow God's command",
    ];
  }

  return [
    `🔎 ${cleanTitle}`,
    section.chapter <= 7 ? "🔥 Offerings before the LORD" : section.chapter <= 10 ? "🕯️ Priests serving before God" : "🧼 Holiness in daily life",
    section.chapter <= 7 ? "🩸 Sacrifice teaching approach" : section.chapter <= 10 ? "🙌 Worship treated as holy" : "👥 Israel learning clean and unclean",
  ];
}

function getLeviticusTeachingLines(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/offering|oblation|sacrifice|altar|blood|atonement|without blemish|lay his hand/.test(lower)) {
    return [
      "This phrase teaches how sinful people approach a holy God.",
      "Leviticus is not empty ritual.",
      "The sacrifices show that worship, sin, mercy, and holiness all matter before the LORD.",
    ];
  }

  if (/priest|aaron|sons|consecrate|anoint|wash|garments/.test(lower)) {
    return [
      "This phrase points to priestly service.",
      "The priests are set apart because they serve near holy things.",
      "Leviticus teaches that worship must be handled with reverence.",
    ];
  }

  if (/clean|unclean|defiled|holy|separate|sanctify|leprosy|plague/.test(lower)) {
    return [
      "This phrase helps explain clean and unclean in Israel's life.",
      "The issue is not simple dirtiness.",
      "God is teaching His people to recognize holiness, disorder, life, and death.",
    ];
  }

  if (/goat|scapegoat|mercy seat|veil|incense|atonement/.test(lower)) {
    return [
      "This phrase points toward the Day of Atonement.",
      "Israel's sin must be dealt with before the holy God.",
      "The chapter shows mercy, substitution, cleansing, and access on God's terms.",
    ];
  }

  return [
    "This phrase gives an important detail in Leviticus.",
    "The book is teaching Israel how to live near a holy God.",
    "Read these details as worship training, not random rules.",
  ];
}

function normalizeRepeatedLeviticusLines(sections: PersonalLeviticusPhraseSectionInput[]) {
  const counts = new Map<string, number>();
  const normalizeLine = (line: string) => line.toLowerCase().replace(/[.?!]+$/, "").trim();

  for (const section of sections) {
    if (section.chapter < 1 || section.chapter > 16) continue;
    for (const [, content] of section.phrases) {
      for (const line of content.split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
        const key = normalizeLine(line);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return sections.map((section) => {
    if (section.chapter < 1 || section.chapter > 16) return section;

    return {
      ...section,
      phrases: section.phrases.map(([title, content]) => {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        const kept: string[] = [];

        for (const line of formatLeviticusOneToEightPhraseExplanation(section, content).split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
          const key = normalizeLine(line);
          const isRepeated = (counts.get(key) ?? 0) >= 3;
          const isTitleLine = line.toLowerCase().includes(cleanTitle.toLowerCase());
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          if (isRepeated && !isTitleLine && !isEmojiLine) continue;
          kept.push(line);
        }

        const hasList = kept.filter((line) => /^[^A-Za-z0-9'"(]/.test(line)).length >= 2;
        if (!hasList) {
          kept.splice(Math.min(2, kept.length), 0, ...getLeviticusPhraseList(section, cleanTitle));
        }

        for (const line of getLeviticusTeachingLines(section, cleanTitle)) {
          if (kept.length >= 7) break;
          if (!kept.some((keptLine) => normalizeLine(keptLine) === normalizeLine(line))) {
            kept.push(line);
          }
        }

        while (kept.length < 4) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `It names a real detail God included in this part of the law.`,
            `That detail should be read slowly instead of skipped.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        return [ensureLeviticusTitleEmoji(title), note(kept)] as [string, string];
      }),
    };
  });
}

function formatLeviticusOneToEightSectionExplanations(sections: PersonalLeviticusPhraseSectionInput[]) {
  return normalizeRepeatedLeviticusLines(sections.map((section) => ({
    ...section,
    icon: getLeviticusSectionIcon(section),
    phrases: section.phrases
      .filter(([title]) => !LEVITICUS_1_8_BANNED_FILLER_TITLES.some((bannedTitle) => title.includes(bannedTitle)))
      .map(([title, content]) => [
        title,
        formatLeviticusOneToEightPhraseExplanation(section, content),
      ] as [string, string]),
  })));
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

function getLeviticusLocalPhrasePool(section: PersonalLeviticusPhraseSectionInput): string[] {
  if (section.chapter === 1 && section.startVerse >= 13) {
    return ["Turtledoves, Or Of Young Pigeons", "The Priest Shall Bring It", "Wring Off His Head", "Burn It On The Altar", "The Blood Thereof", "His Crop With His Feathers", "Cleave It With The Wings", "Shall Not Divide It Asunder"];
  }
  if (section.chapter === 1 && section.startVerse >= 7) {
    return ["Put Fire Upon The Altar", "Lay The Wood In Order", "The Priests Shall Lay The Parts", "The Head And The Fat", "Wash The Inwards And The Legs", "Burn All On The Altar", "Of The Flocks", "A Sweet Savour Unto The LORD"];
  }
  if (section.chapter === 1) {
    return ["The LORD Called Unto Moses", "Out Of The Tabernacle", "Bring An Offering Unto The LORD", "Of The Herd", "A Male Without Blemish", "Of His Own Voluntary Will", "At The Door Of The Tabernacle", "Put His Hand Upon The Head"];
  }

  if (section.chapter === 2 && section.startVerse >= 13) {
    return ["Season With Salt", "The Salt Of The Covenant", "With All Thine Offerings", "Green Ears Of Corn", "Corn Beaten Out Of Full Ears", "Put Oil Upon It", "Lay Frankincense Thereon", "A Memorial Of It"];
  }
  if (section.chapter === 2 && section.startVerse >= 7) {
    return ["Baken In The Fryingpan", "Bring The Meat Offering", "Take From The Meat Offering A Memorial", "Most Holy Of The Offerings", "No Meat Offering Shall Be Made With Leaven", "Neither Shall Any Honey", "The Offering Of The Firstfruits", "Burnt On The Altar"];
  }
  if (section.chapter === 2) {
    return ["A Meat Offering Unto The LORD", "Fine Flour", "Pour Oil Upon It", "Put Frankincense Thereon", "Aaron's Sons The Priests", "An Handful Of The Flour", "A Memorial Thereof", "Unleavened Cakes"];
  }

  if (section.chapter === 3 && section.startVerse >= 13) {
    return ["Lay His Hand Upon The Head", "Kill It Before The Tabernacle", "Sprinkle The Blood", "The Fat That Covereth The Inwards", "All The Fat Is The LORD's", "A Perpetual Statute", "Eat Neither Fat Nor Blood", "Throughout Your Generations"];
  }
  if (section.chapter === 3 && section.startVerse >= 7) {
    return ["If He Offer A Lamb", "Lay His Hand Upon The Head", "Kill It Before The Tabernacle", "The Whole Rump", "The Fat That Covereth The Inwards", "The Two Kidneys", "The Food Of The Offering", "A Sweet Savour"];
  }
  if (section.chapter === 3) {
    return ["A Sacrifice Of Peace Offering", "Of The Herd", "Male Or Female", "Without Blemish", "Lay His Hand Upon The Head", "Sprinkle The Blood Upon The Altar", "The Fat That Covereth The Inwards", "The Two Kidneys"];
  }

  if (section.chapter === 4 && section.startVerse >= 27) {
    return ["Any One Of The Common People", "If His Sin Come To His Knowledge", "A Kid Of The Goats, A Female", "Lay His Hand Upon The Head", "A Lamb For A Sin Offering", "The Priest Shall Make An Atonement", "It Shall Be Forgiven Him", "A Sweet Savour Unto The LORD"];
  }
  if (section.chapter === 4 && section.startVerse >= 22) {
    return ["When A Ruler Hath Sinned", "Through Ignorance", "A Kid Of The Goats", "A Male Without Blemish", "Lay His Hand Upon The Head", "The Blood Of The Sin Offering", "The Priest Shall Make An Atonement", "It Shall Be Forgiven Him"];
  }
  if (section.chapter === 4 && section.startVerse >= 13) {
    return ["The Whole Congregation Of Israel", "The Thing Be Hid", "When The Sin Is Known", "The Elders Of The Congregation", "Lay Their Hands Upon The Head", "Sprinkle It Seven Times", "The Priest Shall Make An Atonement", "It Shall Be Forgiven Them"];
  }
  if (section.chapter === 4 && section.startVerse >= 7) {
    return ["The Horns Of The Altar", "Pour All The Blood", "All The Fat Of The Bullock", "The Skin Of The Bullock", "Without The Camp", "A Clean Place", "Burn Him On The Wood With Fire", "The Ashes Are Poured Out"];
  }
  if (section.chapter === 4) {
    return ["If A Soul Shall Sin Through Ignorance", "Against Any Of The Commandments", "The Priest That Is Anointed", "Bring A Young Bullock", "Lay His Hand Upon The Bullock's Head", "Dip His Finger In The Blood", "Seven Times Before The LORD", "The Holy Place"];
  }

  if (section.chapter === 5 && section.startVerse >= 14) {
    return ["Commit A Trespass", "In The Holy Things Of The LORD", "A Ram Without Blemish", "Add The Fifth Part Thereto", "Though He Wist It Not", "The Priest Shall Make An Atonement", "He Hath Certainly Trespassed", "A Trespass Offering"];
  }
  if (section.chapter === 5 && section.startVerse >= 7) {
    return ["If He Be Not Able", "Two Turtledoves", "Two Young Pigeons", "Wrung Off His Head", "Sprinkle Of The Blood", "The Tenth Part Of An Ephah", "He Shall Put No Oil Upon It", "He Shall Be Forgiven"];
  }
  if (section.chapter === 5) {
    return ["If A Soul Sin", "The Voice Of Swearing", "He Is A Witness", "Touch Any Unclean Thing", "When He Knoweth Of It", "Pronouncing With His Lips", "He Shall Confess", "A Female From The Flock"];
  }

  if (section.chapter === 6 && section.startVerse >= 20) {
    return ["The Offering Of Aaron And His Sons", "In The Day When He Is Anointed", "In A Pan It Shall Be Made", "Wholly Burnt Unto The LORD", "The Law Of The Sin Offering", "Most Holy", "The Priest That Offereth It", "The Earthen Vessel"];
  }
  if (section.chapter === 6 && section.startVerse >= 8) {
    return ["The Law Of The Burnt Offering", "All Night Unto The Morning", "The Fire Of The Altar", "Put On His Linen Garment", "Take Up The Ashes", "Without The Camp", "The Fire Upon The Altar Shall Be Burning", "It Shall Never Go Out"];
  }
  if (section.chapter === 6) {
    return ["Committed A Trespass Against The LORD", "Lie Unto His Neighbour", "Delivered Him To Keep", "Found That Which Was Lost", "Restore That Which He Took", "Add The Fifth Part More", "A Ram Without Blemish", "It Shall Be Forgiven Him"];
  }

  if (section.chapter === 7 && section.startVerse >= 28) {
    return ["His Own Hands Shall Bring", "The Fat With The Breast", "The Breast May Be Waved", "The Right Shoulder", "The Wave Breast", "The Heave Shoulder", "The Portion Of The Anointing", "In The Wilderness Of Sinai"];
  }
  if (section.chapter === 7 && section.startVerse >= 17) {
    return ["It Shall Not Be Accepted", "The Flesh That Toucheth Any Unclean Thing", "His Uncleanness Upon Him", "Eat No Manner Of Fat", "Eat No Manner Of Blood", "That Soul Shall Be Cut Off", "Peace Offerings", "Priestly Portions"];
  }
  if (section.chapter === 7 && section.startVerse >= 11) {
    return ["The Law Of The Sacrifice Of Peace Offerings", "Offer It For A Thanksgiving", "Leavened Bread", "One Out Of The Whole Oblation", "Eaten The Same Day", "A Vow, Or A Voluntary Offering", "The Sacrifice Of His Peace Offerings", "Shared Fellowship"];
  }
  if (section.chapter === 7) {
    return ["The Law Of The Trespass Offering", "It Is Most Holy", "Sprinkle The Blood Round About", "All The Fat Thereof", "The Priest Shall Burn Them", "Every Male Among The Priests", "The Skin Of The Burnt Offering", "Baken In The Oven"];
  }

  if (section.chapter === 8 && section.startVerse >= 32) {
    return ["That Which Remaineth", "Burn With Fire", "Seven Days Shall He Consecrate You", "Abide At The Door Of The Tabernacle", "Keep The Charge Of The LORD", "Aaron And His Sons Did", "All Things Which The LORD Commanded", "By The Hand Of Moses"];
  }
  if (section.chapter === 8 && section.startVerse >= 20) {
    return ["Cut The Ram Into Pieces", "The Ram Of Consecration", "Upon The Tip Of Aaron's Right Ear", "Upon The Thumb Of His Right Hand", "Upon The Great Toe Of His Right Foot", "One Unleavened Cake", "Waved Them For A Wave Offering", "Sprinkled It Upon Aaron"];
  }
  if (section.chapter === 8 && section.startVerse >= 14) {
    return ["The Bullock For The Sin Offering", "Moses Took The Blood", "Purified The Altar", "Poured The Blood At The Bottom", "The Ram For The Burnt Offering", "Moses Sprinkled The Blood", "Cut The Ram Into Pieces", "Burnt Offering For A Sweet Savour"];
  }
  if (section.chapter === 8 && section.startVerse >= 7) {
    return ["He Put Upon Him The Coat", "Girded Him With The Girdle", "He Put The Breastplate Upon Him", "Urim And The Thummim", "The Holy Crown", "Anointed The Tabernacle", "Sprinkled Thereof Upon The Altar", "Poured Of The Anointing Oil"];
  }
  if (section.chapter === 8) {
    return ["Take Aaron And His Sons", "The Garments", "The Anointing Oil", "Gather Thou All The Congregation", "This Is The Thing Which The LORD Commanded", "Moses Washed Them With Water", "Aaron And His Sons", "The Door Of The Tabernacle"];
  }

  if (section.chapter === 9 && section.startVerse >= 19) {
    return ["Aaron Lifted Up His Hand", "Blessed Them", "Moses And Aaron Went Into The Tabernacle", "The Glory Of The LORD Appeared", "Fire Came Out From Before The LORD", "All The People Saw", "They Shouted", "Fell On Their Faces"];
  }
  if (section.chapter === 9 && section.startVerse >= 13) {
    return ["Presented The Burnt Offering", "He Washed The Inwards And The Legs", "The People's Offering", "Beside The Burnt Sacrifice", "He Slew Also The Bullock", "The Fat Of The Bullock", "Upon The Breasts", "He Burnt The Fat"];
  }
  if (section.chapter === 9 && section.startVerse >= 7) {
    return ["Offer Thy Sin Offering", "Make An Atonement For Thyself", "Aaron Went Unto The Altar", "The Calf Of The Sin Offering", "Aaron's Sons Brought The Blood", "He Burnt Upon The Altar", "The Flesh And The Hide", "Burnt With Fire"];
  }
  if (section.chapter === 9) {
    return ["On The Eighth Day", "Moses Called Aaron", "Take Thee A Young Calf", "A Ram For A Burnt Offering", "Speak Unto The Children Of Israel", "The LORD Will Appear Unto You", "The Glory Of The LORD Shall Appear", "Before The LORD"];
  }

  if (section.chapter === 10 && section.startVerse >= 14) {
    return ["The Wave Breast And Heave Shoulder", "Moses Diligently Sought The Goat", "Bear The Iniquity Of The Congregation", "The Blood Of It Was Not Brought In", "Such Things Have Befallen Me", "Should It Have Been Accepted", "Moses Heard That", "He Was Content"];
  }
  if (section.chapter === 10 && section.startVerse >= 8) {
    return ["Wine Nor Strong Drink", "When Ye Go Into The Tabernacle", "Between Holy And Unholy", "Between Unclean And Clean", "Teach The Children Of Israel", "Take The Meat Offering", "Eat It In The Holy Place", "Thy Due"];
  }
  if (section.chapter === 10) {
    return ["Nadab And Abihu", "Put Fire Therein", "Strange Fire", "Which He Commanded Them Not", "Fire From The LORD", "I Will Be Sanctified", "Aaron Held His Peace", "Uncover Not Your Heads"];
  }

  if (section.chapter === 11 && section.startVerse >= 42) {
    return ["Upon The Belly", "Whatsoever Goeth Upon All Four", "Ye Shall Not Make Yourselves Abominable", "Sanctify Yourselves", "Ye Shall Be Holy", "For I Am Holy", "Make A Difference", "Between The Unclean And The Clean"];
  }
  if (section.chapter === 11 && section.startVerse >= 24) {
    return ["Ye Shall Be Unclean", "Whosoever Toucheth The Carcase", "Unclean Until The Even", "Every Earthen Vessel", "It Shall Be Broken Down", "A Fountain Or Pit", "Wash His Clothes", "Every Creeping Thing"];
  }
  if (section.chapter === 11 && section.startVerse >= 13) {
    return ["The Eagle", "The Ossifrage", "The Vulture", "Every Raven", "The Owl", "All Fowls That Creep", "Legs Above Their Feet", "The Locust After His Kind"];
  }
  if (section.chapter === 11 && section.startVerse >= 7) {
    return ["The Swine", "They Are Unclean To You", "Of Their Flesh Shall Ye Not Eat", "Fins And Scales", "Whatsoever Hath No Fins Nor Scales", "They Shall Be An Abomination", "In The Seas", "In The Rivers"];
  }
  if (section.chapter === 11) {
    return ["These Are The Beasts Which Ye Shall Eat", "Parteth The Hoof", "Cheweth The Cud", "The Camel", "The Coney", "The Hare", "Unclean Unto You", "Make A Difference"];
  }

  if (section.chapter === 12 && section.startVerse >= 7) {
    return ["The Priest Shall Make An Atonement", "She Shall Be Clean", "If She Be Not Able To Bring A Lamb", "Two Turtles, Or Two Young Pigeons", "One For The Burnt Offering", "One For A Sin Offering", "The Law For Her That Hath Born", "Purifying"];
  }
  if (section.chapter === 12) {
    return ["If A Woman Have Conceived Seed", "Born A Man Child", "Seven Days", "The Flesh Of His Foreskin", "Circumcised", "The Blood Of Her Purifying", "Touch No Hallowed Thing", "Come Into The Sanctuary"];
  }

  if (section.chapter === 13 && section.startVerse >= 47) {
    return ["The Garment Also", "A Woollen Garment", "In The Warp, Or Woof", "Greenish Or Reddish", "It Is A Fretting Leprosy", "He Shall Burn That Garment", "It Shall Be Washed", "The Priest Shall Look", "The Plague Hath Not Changed", "Rent It Out Of The Garment", "Washed The Second Time"];
  }

  if (section.chapter === 13) {
    return ["The Plague Of Leprosy", "The Priest Shall Look", "The Hair In The Plague Is Turned White", "Deeper Than The Skin", "Shut Up Him That Hath The Plague Seven Days", "Pronounce Him Clean", "Pronounce Him Unclean", "Raw Flesh", "A White Rising", "A Yellow Thin Hair", "His Clothes Shall Be Rent", "He Shall Dwell Alone", "Without The Camp"];
  }

  if (section.chapter === 14 && section.startVerse >= 33) {
    return ["When Ye Be Come Into The Land Of Canaan", "The Plague Of Leprosy In A House", "Empty The House", "They Shall Take Away The Stones", "Scrape The House", "He Shall Break Down The House", "Cleanse The House", "Cedar Wood", "Scarlet", "Hyssop", "Running Water", "Let Go The Living Bird"];
  }

  if (section.chapter === 14) {
    return ["In The Day Of His Cleansing", "The Priest Shall Go Forth Out Of The Camp", "Two Birds Alive And Clean", "Cedar Wood", "Scarlet", "Hyssop", "Running Water", "The Living Bird", "Into The Open Field", "He Shall Wash His Clothes", "Shave Off All His Hair", "He Shall Be Clean", "The Log Of Oil", "Upon The Tip Of The Right Ear", "If He Be Poor"];
  }

  if (section.chapter === 15 && section.startVerse >= 19) {
    return ["The Woman Also", "Her Issue In Her Flesh Be Blood", "Seven Days", "Every Thing That She Lieth Upon", "Unclean Until The Even", "Many Days Out Of The Time", "Two Turtles, Or Two Young Pigeons", "The Priest Shall Make An Atonement", "Separate The Children Of Israel From Their Uncleanness"];
  }

  if (section.chapter === 15) {
    return ["When Any Man Hath A Running Issue", "Every Bed Whereon He Lieth", "Wash His Clothes", "Bathe Himself In Water", "Unclean Until The Even", "The Saddle", "An Earthen Vessel", "When He That Hath An Issue Is Cleansed", "Two Turtledoves", "The Priest Shall Make An Atonement", "If Any Man's Seed Of Copulation"];
  }

  if (section.chapter === 16 && section.startVerse >= 29) {
    return ["Afflict Your Souls", "A Statute For Ever", "Clean From All Your Sins", "A Sabbath Of Rest", "The Priest Whom He Shall Anoint", "Make An Atonement For The Holy Sanctuary", "Once In A Year"];
  }

  if (section.chapter === 16 && section.startVerse >= 11) {
    return ["A Cloud Of Incense", "Sprinkle It Upon The Mercy Seat", "Because Of The Uncleanness Of The Children Of Israel", "No Man In The Tabernacle", "Lay Both His Hands Upon The Head", "Confess Over Him All The Iniquities", "Bear Upon Him All Their Iniquities", "Into A Land Not Inhabited", "Carry Forth Without The Camp"];
  }

  if (section.chapter === 16) {
    return ["After The Death Of The Two Sons Of Aaron", "Come Not At All Times Into The Holy Place", "Within The Vail", "Before The Mercy Seat", "That He Die Not", "A Young Bullock For A Sin Offering", "Two Kids Of The Goats", "One Lot For The LORD", "The Other Lot For The Scapegoat", "Presented Alive Before The LORD"];
  }

  const byChapter: Record<number, string[]> = {
    ...DAY_32_LEVITICUS_1_4_EXTRA_PHRASES,
    ...DAY_33_LEVITICUS_5_8_EXTRA_PHRASES,
    ...DAY_34_LEVITICUS_9_12_EXTRA_PHRASES,
  };

  return byChapter[section.chapter] ?? [];
}

function rotateLeviticusPhrasePool(section: PersonalLeviticusPhraseSectionInput, pool: string[], desiredCount: number) {
  if (pool.length <= desiredCount) return pool;

  const offset = ((section.startVerse - 1) * 2) % pool.length;
  return [...pool.slice(offset), ...pool.slice(0, offset)].slice(0, desiredCount);
}

function deepenLeviticusPhraseCards(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const desiredCount = section.chapter >= 13 ? 7 : 8;
  const localPool = getLeviticusLocalPhrasePool(section);
  const titles = rotateLeviticusPhrasePool(section, localPool, desiredCount);

  return {
    ...section,
    phrases: titles.map((title) => makeMinedLeviticusPhrase(section, title)),
  };
}

export const LEVITICUS_1_10_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] =
  formatLeviticusOneToEightSectionExplanations([
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS, [9, 10, 11, 12], "\u{2728}").map(deepenLeviticusPhraseCards),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS, [13, 14, 15, 16], "\u{1F54A}\u{FE0F}").map(deepenLeviticusPhraseCards),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS, [1, 2, 3, 4], "🔥").map(deepenLeviticusPhraseCards),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS, [5, 6, 7, 8], "🩸").map(deepenLeviticusPhraseCards),
  ]);
