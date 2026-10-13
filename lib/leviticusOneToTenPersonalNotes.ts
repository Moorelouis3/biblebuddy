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
  if (/plague|leprosy|hair|skin|shut up|deeper|raw flesh|fretting|changed|shave off all his hair/i.test(title)) return "\u{1F9FC}";
  if (/flesh and the hide/i.test(title)) return "\u{1FA78}";
  if (/uncover not your heads|of their flesh shall ye not eat|flesh of his foreskin/i.test(title)) return "\u{1F9FC}";
  if (/without the camp|outside the camp/i.test(title)) return "\u{1F3D5}\u{FE0F}";
  if (/burnt offering|fire|burn|flay|pieces/i.test(title)) return "\u{1F525}";
  if (/sweet savour|ashes|wood|flay|cut|wash|inwards|legs|crop|feathers|wings|divide|asunder/i.test(title)) return "\u{1F4A7}";
  if (/meat offering|grain|flour|oil|frankincense|cakes|wafers/i.test(title)) return "\u{1F33E}";
  if (/memorial|baken|fryingpan|honey|firstfruits|salt|green ears|corn|full ears/i.test(title)) return "\u{1F9C2}";
  if (/peace offering|thanksgiving|vow|freewill/i.test(title)) return "\u{1F54A}\u{FE0F}";
  if (/sin offering|trespass offering|sin|ignorance|forgiven|forgiveness/i.test(title)) return "\u{1FA78}";
  if (/blood|atonement|sprinkle|altar|without blemish|lay his hand|kill/i.test(title)) return "\u{1FA78}";
  if (/witness|knoweth|pronouncing|lips|swear|confess|confession|truth/i.test(title)) return "\u{1F5E3}\u{FE0F}";
  if (/not able|poor|tenth part|ephah|handful|remnant|remaineth|left/i.test(title)) return "\u{1F932}";
  if (/restore|restitution|fifth part|lost|neighbour|lie|trespass|committed/i.test(title)) return "\u{2696}\u{FE0F}";
  if (/all night|morning|never go out|same day|generations|statute|for ever|many days/i.test(title)) return "\u{1F4C5}";
  if (/charge of the lord|hand of moses|speak unto the children|all thine offerings/i.test(title)) return "\u{1F4DC}";
  if (/linen|coat|girdle|breastplate|urim|thummim|garment|woollen/i.test(title)) return "\u{1F455}";
  if (/wave|waved|breast|shoulder|right shoulder|rump|food of the offering|his own hands|oblation/i.test(title)) return "\u{1F64C}";
  if (/leaven|unleavened|cake|bread|pan|fryingpan|baken/i.test(title)) return "\u{1F35E}";
  if (/vail|veil|die not|lot|holy place|mercy seat/i.test(title)) return "\u{26FA}";
  if (/sanctified|strong drink|wine|glory|all the people saw/i.test(title)) return "\u{26A0}\u{FE0F}";
  if (/bullock|lamb|ram|goat|kid|herd|flock|cattle/i.test(title)) return "\u{1F411}";
  if (/priest|aaron|sons|consecrate|anoint|garments|wash|oil/i.test(title)) return "\u{1F451}";
  if (/holy|unclean|clean|defiled|separate|sanctify|abomination|abominable|make a difference/i.test(title)) return "\u{1F9FC}";
  if (/leprosy|plague|skin|scab|bright spot|priest shall look|shut up|pronounce|hair|deeper|flesh|camp|clothes|rent|bare|cover/i.test(title)) return "\u{1F50E}";
  if (/goat|scapegoat|mercy seat|holy place|incense|within the veil|azazel/i.test(title)) return "\u{1F410}";
  if (/nadab|abihu|strange fire|died|glory|appeared|accepted|befallen|content/i.test(title)) return "\u{26A0}\u{FE0F}";
  if (/bird|fowl|turtle|pigeon|eagle|vulture|raven|owl|locust/i.test(title)) return "\u{1F54A}\u{FE0F}";
  if (/kidney|fat|liver|inwards/i.test(title)) return "\u{1F525}";
  if (/issue|running|seed|woman|blood|separation|fountain|plague be healed|bed|saddle|lieth|bathe|water|earthen vessel/i.test(title)) return "\u{1F4A7}";
  if (/command|spake|said|law|statute|ordinance|teach|called unto moses/i.test(title)) return "\u{1F4DC}";
  if (/before the lord|unto the lord|tabernacle|congregation|sanctuary|hallowed|eighth day|blessed|shouted|fell on their faces/i.test(title)) return "\u{26FA}";
  if (/voluntary|own will|accepted/i.test(title)) return "\u{1F64C}";
  if (/put.*hand|lay.*hand|hands? upon|thumb|toe|ear/i.test(title)) return "\u{270B}";
  if (/wring|cleave|divide/i.test(title)) return "\u{1F54A}\u{FE0F}";
  if (/camel|coney|hare|swine|beasts|hoof|cud|fins|scales|creeping thing|belly|all four|carcase/i.test(title)) return "\u{1F37D}\u{FE0F}";
  if (/common people|male or female/i.test(title)) return "\u{1F9D1}";
  if (/thing be hid|wist it not|ignorance|unaware/i.test(title)) return "\u{1F648}";
  if (/wrung off/i.test(title)) return "\u{1F54A}\u{FE0F}";
  if (/broken down/i.test(title)) return "\u{1F9F1}";
  if (/man child|seven days|circumcised|purifying|open field/i.test(title)) return "\u{1F476}";
  if (/house|break down the house|scrape the house|stones|dust/i.test(title)) return "\u{1F3E0}";
  if (/scarlet/i.test(title)) return "\u{1F9F5}";
  if (/hyssop|cedar/i.test(title)) return "\u{1F331}";
  if (/dwell alone|without the camp|outside the camp/i.test(title)) return "\u{1F3D5}\u{FE0F}";
  if (/seas|rivers|fins|scales/i.test(title)) return "\u{1F30A}";
  if (/ossifrage/i.test(title)) return "\u{1FAB6}";
  if (/young calf|people's offering|breasts|wave breast|heave shoulder|due/i.test(title)) return "\u{1F64C}";
  if (/afflict your souls|sabbath of rest|once in a year|confess|iniquities|not inhabited/i.test(title)) return "\u{1F4C5}";
  return "\u{1F4CC}";
}

function ensureLeviticusTitleEmoji(title: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  return `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`;
}

function getLeviticusSectionIcon(section: PersonalLeviticusPhraseSectionInput) {
  const text = `${section.title} ${section.reference}`.toLowerCase();
  if (/skin disease|leprosy|examination/.test(text)) return "\u{1F50E}";
  if (/garments/.test(text)) return "\u{1F455}";
  if (/contaminated house/.test(text)) return "\u{1F3E0}";
  if (/bodily discharges/.test(text)) return "\u{1F4A7}";
  if (/atonement|scapegoat|mercy seat|solemn rest/.test(text)) return "\u{1FA78}";
  if (/cleansing the restored person/.test(text)) return "\u{1F54A}\u{FE0F}";
  if (/burnt/.test(text)) return "\u{1F525}";
  if (/meat|grain|flour/.test(text)) return "\u{1F33E}";
  if (/peace/.test(text)) return "\u{1F54A}\u{FE0F}";
  if (/sin|trespass|forgiven/.test(text)) return "\u{1FA78}";
  if (/priest|aaron|consecration|ordination/.test(text)) return "\u{1F451}";
  if (/strange fire|nadab|abihu/.test(text)) return "\u{26A0}\u{FE0F}";
  if (/clean|unclean|food|animals/.test(text)) return "\u{1F37D}\u{FE0F}";
  if (/leprosy|skin|plague/.test(text)) return "\u{1F50E}";
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
  return [ensureLeviticusTitleEmoji(title), explainLeviticusMinedPhrase(title, body, summary)];
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

  if (lower.includes("priest shall look") || lower.includes("looketh")) {
    add(`${title} means the priest had to examine visible uncleanness carefully.`, "The priest is not guessing or reacting in a panic.", "He looks, waits when needed, checks again, and then declares clean or unclean.", "\u{1F50E} Careful examination", "\u{23F3} Waiting when unclear", "\u{1F3D5}\u{FE0F} Camp boundaries", "The phrase shows that holiness required careful judgment, not careless labels.");
  } else if (lower.includes("without the camp") || lower.includes("outside the camp")) {
    add(`${title} means someone or something is moved outside Israel's camp for a time.`, "The camp is where God's people live around His holy presence.", "So uncleanness cannot be treated like an ordinary inconvenience.", "\u{1F3D5}\u{FE0F} Outside the camp", "\u{26A0}\u{FE0F} Uncleanness named", "\u{2705} Restoration still possible", "The phrase is painful, but it also points toward the hope of being cleansed and brought back.");
  } else if (lower.includes("cedar wood") || lower.includes("scarlet") || lower.includes("hyssop") || lower.includes("running water")) {
    add(`${title} names one visible detail in the cleansing ceremony.`, "This was not decoration.", "It helped Israel see cleansing and restoration with their own eyes.", "\u{1F4A7} Cleansing", "\u{1F54A}\u{FE0F} Restoration", "\u{1F441}\u{FE0F} Visible sign", "The phrase reminds the reader that God gave Israel a real process for returning from uncleanness.");
  } else if (lower.includes("clothes shall be rent") || lower.includes("head bare") || lower.includes("upper lip") || lower.includes("unclean, unclean") || lower.includes("dwell alone")) {
    add(`${title} describes the public signs of uncleanness outside the camp.`, "These signs were not meant to shame someone for entertainment.", "They warned the community that the person could not live in normal worship life until cleansing came.", "\u{1F3D5}\u{FE0F} Outside the camp", "\u{1F514} Public warning", "\u{2705} Hope of cleansing", "The phrase shows how serious uncleanness was near God's holy presence.");
  } else if (lower.includes("yellow thin hair") || lower.includes("raw flesh") || lower.includes("white rising") || lower.includes("deeper than the skin") || lower.includes("plague hath not changed") || lower.includes("darkish white") || lower.includes("quick raw flesh")) {
    add(`${title} names one visible sign the priest had to examine.`, "Leviticus does not leave the priest to guess from fear or emotion.", "The law gives visible markers so the judgment can be careful.", "\u{1F50E} Look closely", "\u{23F3} Wait when unclear", "\u{2696}\u{FE0F} Judge carefully", "The phrase teaches that holiness required patience, attention, and truth.");
  } else if (lower.includes("two birds") || lower.includes("living bird") || lower.includes("open field") || lower.includes("shave") || lower.includes("wash his clothes") || lower.includes("in the day of his cleansing") || lower.includes("priest shall go forth") || lower.includes("log of oil")) {
    add(`${title} shows the way back after uncleanness.`, "The person is not simply left outside forever.", "God gives a real process for cleansing, return, and restored worship.", "\u{1F54A}\u{FE0F} Life released", "\u{1F4A7} Washing", "\u{2705} Return made possible", "Leviticus is not only about exclusion. It is also about the way back.");
  } else if (lower.includes("scrape the house") || lower.includes("break down the house") || lower.includes("cleanse the house") || lower.includes("plague in a house") || lower.includes("stones thereof") || lower.includes("dust thereof")) {
    add(`${title} shows that Israel's homes also came under God's holy order.`, "The house was not treated as separate from worship life.", "If uncleanness spread there, it had to be examined and dealt with.", "\u{1F3E0} Home life", "\u{1F9F1} Stones and walls", "\u{1F9FC} Cleansing or removal", "The phrase teaches that holiness reaches ordinary places, not only the tabernacle.");
  } else if (lower.includes("issue") || lower.includes("bed") || lower.includes("saddle") || lower.includes("bathe his flesh") || lower.includes("earthen vessel") || lower.includes("woman also") || lower.includes("blood of her purifying") || lower.includes("seven days")) {
    add(`${title} brings private body matters under God's care and order.`, "Leviticus is not embarrassed to speak about bodies.", "Some uncleanness came from normal life, and some came from abnormal conditions.", "\u{1F4A7} Washing", "\u{23F3} Waiting", "\u{2705} Return to cleanness", "The phrase helps the reader separate ritual uncleanness from personal shame.");
  } else if (lower.includes("mercy seat") || lower.includes("within the vail") || lower.includes("cloud of incense") || lower.includes("confess over him") || lower.includes("all their iniquities") || lower.includes("scapegoat") || lower.includes("bear upon him") || lower.includes("fit man") || lower.includes("afflict your souls")) {
    add(`${title} helps explain the deep cleansing of the Day of Atonement.`, "Israel's sin could not be ignored or explained away.", "God gave a way for sin to be covered before Him and carried away from the people.", "\u{1FA78} Blood before God", "\u{1F410} Sin carried away", "\u{1F64F} Mercy on God's terms", "The phrase shows both the seriousness of sin and the mercy God provides.");
  } else if (lower.includes("make an atonement") || lower.includes("atonement")) {
    add(`${title} means sin or uncleanness must be dealt with before a holy God.`, "Atonement is about God making a way for people to be covered, cleansed, and accepted according to His command.", "\u{1FA78} Blood", "\u{1F64F} Mercy", "\u{2705} Accepted by God's way", "The phrase keeps mercy and holiness together.");
  } else if (context.includes("burnt offering")) {
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
    "⛺ God's presence",
    "🔥 Costly worship",
    "🩸 Atonement",
    "🤲 Mercy provided",
    `In ${section.title}, the details help explain the way God gives for worship, cleansing, fellowship, or forgiveness.`,
  ]);
}

function ensureBeginnerLeviticusPhraseDepth(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerLeviticusPhrase("🧭 The Offering Scene", section, "The wording helps locate the offering scene: who brings the offering, what is done with it, and what need it answers before God."),
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
  3: ["🤝 The peace offering celebrates fellowship.", "🍽️ Worship can include a shared meal.", "🩸 Life is claimed by God, so blood is not treated as common."],
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
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1F64C} Worship brought near",
      "\u{1F525} Sacrifice before God",
      "\u{1F4DC} A holy pattern for approach",
    ];
  }

  if (/blood|atonement|sprinkle|altar|without blemish|lay his hand|kill/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{26A0}\u{FE0F} Sin taken seriously",
      "\u{1FA78} Life given before the LORD",
      "\u{1F64F} Atonement and mercy",
    ];
  }

  if (/priest|aaron|sons|consecrate|anoint|garments|wash|oil/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1F451} Priests set apart",
      "\u{26FA} Holy service",
      "\u{1F64C} Worship led God's way",
    ];
  }

  if (/holy|unclean|clean|defiled|separate|sanctify/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1F9FC} Clean and unclean",
      "\u{1F54A}\u{FE0F} Holiness before God",
      "\u{1F9ED} Israel learning distinction",
    ];
  }

  if (/leprosy|plague|skin|scab|bright spot|priest shall look|shut up|pronounce/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1F50E} Careful examination",
      "\u{1F3D5}\u{FE0F} Camp kept holy",
      "\u{26A0}\u{FE0F} Sickness and separation",
    ];
  }

  if (/goat|scapegoat|mercy seat|holy place|incense|within the veil|azazel/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1FA78} Atonement for sin",
      "\u{26FA} The holy place",
      "\u{1F64F} Mercy before the LORD",
    ];
  }

  if (/fire|strange fire|nadab|abihu|died|glory|appeared/.test(lower)) {
    return [
      `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
      "\u{1F525} Holy worship",
      "\u{26A0}\u{FE0F} God's presence is serious",
      "\u{1F4DC} Worship must follow God's command",
    ];
  }

  return [
    `${getLeviticusTitleIcon(cleanTitle)} ${cleanTitle}`,
    section.chapter <= 7 ? "\u{1F525} Offerings before the LORD" : section.chapter <= 10 ? "\u{1F451} Priests serving before God" : "\u{1F54A}\u{FE0F} Holiness in daily life",
    section.chapter <= 7 ? "\u{1FA78} Sacrifice teaching approach" : section.chapter <= 10 ? "\u{26FA} Worship treated as holy" : "\u{1F9FC} Israel learning clean and unclean",
  ];
}

function getLeviticusTeachingLines(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const focus = getLeviticusSectionFocus(section);

  if (/priest shall look|looketh/.test(lower)) {
    return [
      `${cleanTitle} protects the person and the camp during ${focus}.`,
      `During ${focus}, the priest was not guessing, rushing, or treating ${cleanTitle} lightly.`,
      `The decision around ${cleanTitle} affected worship, community life, and whether someone could remain near the camp during ${focus}.`,
    ];
  }

  if (/without the camp|outside the camp/.test(lower)) {
    return [
      `${cleanTitle} is painful in ${focus}, but it is not hopeless.`,
      `The camp around ${cleanTitle} was where God's people lived around His holy presence.`,
      `${cleanTitle} shows both the seriousness of uncleanness and the hope of restoration after cleansing.`,
    ];
  }

  if (/cedar wood|scarlet|hyssop|running water/.test(lower)) {
    return [
      `${cleanTitle} makes ${focus} visible instead of hidden or vague.`,
      `${cleanTitle} was not included as decoration in ${focus}.`,
      `${cleanTitle} served in a cleansing process Israel could watch, remember, and understand during ${focus}.`,
    ];
  }

  if (/make an atonement|atonement/.test(lower)) {
    return [
      `${cleanTitle} keeps the focus on God's provided way during ${focus}.`,
      `Atonement means guilt and uncleanness connected to ${cleanTitle} must be covered before a holy God.`,
      `The phrase keeps mercy and holiness together, not ritual without meaning.`,
    ];
  }

  if (/offering|oblation|sacrifice|altar|blood|atonement|without blemish|lay his hand/.test(lower)) {
    return [
      `${cleanTitle} teaches how sinful people approach a holy God.`,
      `${cleanTitle} is not empty ritual for its own sake.`,
      `The wording of ${cleanTitle} connects worship, sin, mercy, and holiness before the LORD.`,
    ];
  }

  if (/priest|aaron|sons|consecrate|anoint|wash|garments/.test(lower)) {
    return [
      `${cleanTitle} points to priestly service.`,
      `In ${cleanTitle}, the priests are set apart because they serve near holy things.`,
      `${cleanTitle} teaches that worship must be handled with reverence.`,
    ];
  }

  if (/clean|unclean|defiled|holy|separate|sanctify|leprosy|plague/.test(lower)) {
    return [
      `${cleanTitle} helps explain clean and unclean in Israel's life.`,
      `In ${cleanTitle}, the issue is not simple dirtiness or ordinary sickness only.`,
      `${cleanTitle} teaches Israel to recognize holiness, disorder, life, and death.`,
    ];
  }

  if (/goat|scapegoat|mercy seat|veil|incense|atonement/.test(lower)) {
    return [
      `${cleanTitle} points toward the Day of Atonement.`,
      `Through ${cleanTitle}, Israel's sin must be dealt with before the holy God.`,
      `${cleanTitle} shows mercy, substitution, cleansing, and access on God's terms.`,
    ];
  }

  if (/strange fire|nadab|abihu|commanded them not|sanctified|held his peace/.test(lower)) {
    return [
      `${cleanTitle} shows that worship near God cannot be invented by the priests.`,
      `The issue around ${cleanTitle} is not creativity, but disobedience near holy fire.`,
      `${cleanTitle} teaches that God's presence is good, but never casual.`,
    ];
  }

  return [
    `${cleanTitle} helps explain what holiness looked like during ${focus}.`,
    `Through ${cleanTitle}, Israel could see that God's law touched real actions, objects, bodies, places, and worship practices.`,
    `${cleanTitle} keeps the instruction clear instead of vague.`,
  ];
}

function getLeviticusSectionFocus(section: PersonalLeviticusPhraseSectionInput) {
  if (section.chapter === 1) {
    if (section.startVerse >= 13) return "bird offerings for worshipers with fewer resources";
    if (section.startVerse >= 7) return "the altar work of the burnt offering";
    return "the worshiper bringing the first burnt offering";
  }
  if (section.chapter === 2) {
    if (section.startVerse >= 13) return "salt, firstfruits, and covenant faithfulness";
    if (section.startVerse >= 7) return "grain offerings prepared in different ways";
    return "flour, oil, and frankincense brought near to God";
  }
  if (section.chapter === 3) {
    if (section.startVerse >= 13) return "the lasting command about fat and blood";
    if (section.startVerse >= 7) return "peace offerings from the flock";
    return "peace offerings from the herd";
  }
  if (section.chapter === 4) {
    if (section.startVerse >= 27) return "atonement for one of the common people";
    if (section.startVerse >= 22) return "atonement when a ruler sins";
    if (section.startVerse >= 13) return "atonement for the whole congregation";
    if (section.startVerse >= 7) return "blood and ashes in the priestly sin offering";
    return "sin committed through ignorance";
  }
  if (section.chapter === 5) {
    if (section.startVerse >= 14) return "trespass in the holy things of the LORD";
    if (section.startVerse >= 7) return "mercy for a worshiper who cannot afford a lamb";
    return "confession after hidden or ordinary guilt";
  }
  if (section.chapter === 6) {
    if (section.startVerse >= 20) return "priestly portions and holy handling";
    if (section.startVerse >= 8) return "the altar fire and the priest's daily care";
    return "restitution when a neighbor has been wronged";
  }
  if (section.chapter === 7) {
    if (section.startVerse >= 28) return "wave and heave portions for the priests";
    if (section.startVerse >= 17) return "uncleanness, fat, and blood restrictions";
    if (section.startVerse >= 11) return "thanksgiving and peace offering meals";
    return "the trespass offering and priestly portions";
  }
  if (section.chapter === 8) {
    if (section.startVerse >= 32) return "the seven-day consecration charge";
    if (section.startVerse >= 20) return "the ram of consecration";
    if (section.startVerse >= 14) return "blood applied during ordination";
    if (section.startVerse >= 7) return "Aaron clothed for priestly service";
    return "Aaron and his sons being gathered for ordination";
  }
  if (section.chapter === 9) {
    if (section.startVerse >= 19) return "God receiving the offering with glory and fire";
    if (section.startVerse >= 13) return "the people's offering";
    if (section.startVerse >= 7) return "Aaron offering for himself and the people";
    return "the eighth day when priestly ministry begins";
  }
  if (section.chapter === 10) {
    if (section.startVerse >= 14) return "Aaron's grief and the uneaten sin offering";
    if (section.startVerse >= 8) return "priestly discernment after judgment";
    return "Nadab and Abihu offering strange fire";
  }
  if (section.chapter === 11) {
    if (section.startVerse >= 42) return "the final call to be holy";
    if (section.startVerse >= 36) return "uncleanness around vessels, seed, and creeping things";
    if (section.startVerse >= 30) return "uncleanness from creeping things";
    if (section.startVerse >= 24) return "contact with carcasses and uncleanness";
    if (section.startVerse >= 13) return "birds and creeping things";
    if (section.startVerse >= 7) return "unclean land animals and water creatures";
    return "clean and unclean land animals";
  }
  if (section.chapter === 12) {
    if (section.startVerse >= 7) return "the offering that completes purification";
    return "childbirth, circumcision, and purification";
  }
  if (section.chapter === 13) {
    if (section.startVerse >= 59) return "the closing law about garment uncleanness";
    if (section.startVerse >= 53) return "the rechecked garment after washing";
    if (section.startVerse >= 47) return "the first inspection of garment uncleanness";
    if (section.startVerse >= 43) return "the public signs of uncleanness";
    if (section.startVerse >= 31) return "unclear signs that require repeated inspection";
    if (section.startVerse >= 19) return "spreading marks and deeper examination";
    if (section.startVerse >= 13) return "uncleanness that affects the whole person";
    if (section.startVerse >= 7) return "a mark that spreads after the first inspection";
    return "the first skin examination";
  }
  if (section.chapter === 14) {
    if (section.startVerse >= 51) return "the final cleansing sign for a house";
    if (section.startVerse >= 45) return "a house that must be broken down";
    if (section.startVerse >= 39) return "a returning plague in the house";
    if (section.startVerse >= 33) return "uncleanness discovered in a house";
    if (section.startVerse >= 31) return "the poor person's cleansing offering";
    if (section.startVerse >= 25) return "oil and blood in the cleansing ceremony";
    if (section.startVerse >= 19) return "the living bird released into the open field";
    if (section.startVerse >= 13) return "washing, shaving, and reentry";
    if (section.startVerse >= 7) return "blood and oil applied to the restored person";
    return "the first cleansing ceremony outside the camp";
  }
  if (section.chapter === 15) {
    if (section.startVerse >= 31) return "why Israel must be separated from uncleanness";
    if (section.startVerse >= 25) return "extended bleeding and restoration";
    if (section.startVerse >= 19) return "a woman's monthly uncleanness";
    if (section.startVerse >= 13) return "cleansing after a bodily issue";
    if (section.startVerse >= 7) return "contact with uncleanness";
    return "bodily discharges and daily uncleanness";
  }
  if (section.chapter === 16) {
    if (section.startVerse >= 29) return "the yearly Day of Atonement statute";
    if (section.startVerse >= 23) return "washing and finishing the atonement work";
    if (section.startVerse >= 17) return "confession over the live goat";
    if (section.startVerse >= 11) return "blood, incense, and the mercy seat";
    if (section.startVerse >= 7) return "the two goats before the LORD";
    return "restricted access after Aaron's sons died";
  }

  return "life near God's holy presence";
}

function getLeviticusContextualOpening(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const focus = getLeviticusSectionFocus(section);

  if (/priest shall look|looketh/.test(lower)) {
    return `${cleanTitle} means the priest examines ${focus} instead of guessing.`;
  }

  if (/cedar wood|scarlet|hyssop|running water/.test(lower)) {
    return `${cleanTitle} names a visible cleansing detail in ${focus}.`;
  }

  if (/without the camp|outside the camp/.test(lower)) {
    return `${cleanTitle} moves uncleanness outside the camp during ${focus}.`;
  }

  if (/leprosy|plague|skin|scab|bright spot|hair|deeper|white rising|raw flesh|yellow thin hair|plague hath not changed|darkish white/.test(lower)) {
    return `${cleanTitle} gives the priest a visible sign to weigh during ${focus}.`;
  }

  if (/wash|bathe|issue|blood|bed|saddle|earthen|unclean until/.test(lower)) {
    return `${cleanTitle} shows how ${focus} affected ordinary daily life.`;
  }

  if (/mercy seat|scapegoat|within the vail|confess|iniquities|atonement|incense|lot|azazel|afflict/.test(lower)) {
    return `${cleanTitle} explains one movement in ${focus}.`;
  }

  if (/house|stones|scrape|break down|cleanse the house/.test(lower)) {
    return `${cleanTitle} explains how ${focus} was handled under God's law.`;
  }

  return `${cleanTitle} helps explain ${focus}.`;
}

function getLeviticus95Support(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/atonement|blood|sprinkle|sin|trespass|guilt|forgiven|mercy seat|scapegoat|iniquities/.test(lower)) {
    return ["\u{1FA78} Sin is dealt with before God", "\u{1F64F} Mercy comes through God's appointed way", "\u{2705} Forgiveness is received, not invented", "\u{26A0}\u{FE0F} Holiness is still serious"];
  }

  if (/priest|aaron|sons|anoint|garment|consecrate|wash|mitre|ephod|ordination|minister/.test(lower)) {
    return ["\u{1F451} Priests are set apart for service", "\u{1F4A7} Cleansing comes before nearness", "\u{1F455} Garments mark holy work", "\u{1F64C} Service follows God's command"];
  }

  if (/leprosy|plague|skin|scab|hair|raw flesh|garment|warp|woof|fretting|unclean|clean|camp|issue|blood|bathe|wash/.test(lower)) {
    return ["\u{1F50E} Uncleanness is examined carefully", "\u{23F3} Cleansing may require waiting", "\u{1F3D5}\u{FE0F} The camp is guarded around God's presence", "\u{2705} Restoration is still possible"];
  }

  if (/offering|oblation|sacrifice|burnt|meat|peace|flour|oil|frankincense|salt|fat|kidneys|inwards|sweet savour/.test(lower)) {
    return ["\u{1F525} The offering is brought to the LORD", "\u{1F64C} Worship follows God's pattern", "\u{1F54A}\u{FE0F} Nearness requires holy surrender", "\u{1F91D} God provides a way to draw near"];
  }

  if (/beast|hoof|cud|camel|swine|fins|scales|abomination|carcase|creeping|holy/.test(lower)) {
    return ["\u{1F37D}\u{FE0F} Daily meals teach distinction", "\u{1F9ED} Israel learns clean and unclean", "\u{1F465} God's people are set apart", "\u{1F4A7} Contact with death affects cleanness"];
  }

  if (/child|foreskin|circumcised|purifying|hallowed|turtles|pigeons/.test(lower)) {
    return ["\u{1F476} Birth belongs under God's care", "\u{1FA78} Blood and purification matter", "\u{1F54A}\u{FE0F} The poor can still bring an offering", "\u{2705} The mother returns to sanctuary worship"];
  }

  if (/cloud|incense|vail|lot|goat|afflict|statute|once in a year/.test(lower)) {
    return ["\u{2601}\u{FE0F} Access comes only God's way", "\u{1FA78} Blood is brought before the LORD", "\u{1F410} Sin is carried away", "\u{1F64F} Israel humbles itself before mercy"];
  }

  return ["\u{1F4DC} The law teaches life near God", "\u{1F64C} Holiness reaches real details", "\u{1F9E0} The wording answers a concrete question", "\u{2705} God gives order instead of confusion"];
}

function explainLeviticusPhraseAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const focus = getLeviticusSectionFocus(section);
  let opening: string[];

  if (/called unto moses/.test(lower)) opening = ["Called unto Moses means the LORD speaks directly to Moses.", "Leviticus begins with God giving worship instructions from the tabernacle, not from Moses' imagination."];
  else if (/tabernacle/.test(lower)) opening = ["The tabernacle was the holy tent where the LORD dwelt among Israel.", "Leviticus explains how sinful people can live near that holy presence."];
  else if (/unleavened|leaven/.test(lower)) opening = ["Leaven is what makes dough rise, like yeast.", "Grain offerings burned to the LORD could not include leaven because worship followed God's boundaries."];
  else if (/honey/.test(lower)) opening = ["Honey was sweet food, but it was not burned on the altar.", "The rule teaches that worship is not shaped by what people prefer, but by what God commands."];
  else if (/salt/.test(lower)) opening = ["Salt was required with the offering as a sign of covenant faithfulness.", "It helped Israel remember that worship happened inside a binding relationship with the LORD."];
  else if (/green ears|corn|full ears/.test(lower)) opening = ["Green ears and corn refer to fresh grain from the harvest.", "Firstfruits worship thanked the LORD for provision at the beginning of harvest."];
  else if (/two kids|two goats|lot for the lord|scapegoat/.test(lower)) opening = ["The two goats divide the Day of Atonement picture into sacrifice and removal.", "One goat is offered before the LORD, and the other carries confessed sin away."];
  else if (/offering|oblation/.test(lower)) opening = ["An offering is something brought near to the LORD in worship.", "The kind of offering named here answers a specific need: surrender, gratitude, fellowship, cleansing, or forgiveness."];
  else if (/herd|flock|cattle/.test(lower)) opening = ["Herd and flock name the animals a worshiper could bring.", "Leviticus starts with real animals from daily life because worship cost something concrete."];
  else if (/without blemish/.test(lower)) opening = ["Without blemish means the animal had no defect.", "The worshiper could not bring God a damaged leftover and call it holy worship."];
  else if (/voluntary will|freewill/.test(lower)) opening = ["Voluntary will means the worshiper brings the offering willingly.", "The burnt offering is not treated as a casual payment; it is worship brought before the LORD."];
  else if (/door of the tabernacle|door of the tent/.test(lower)) opening = ["The door of the tabernacle was the appointed place of approach.", "The worshiper comes where God says to come, not by inventing a private way."];
  else if (/lay|put.*hand|head/.test(lower)) opening = ["Putting a hand on the animal's head showed personal identification.", "The offering is connected to the worshiper; sacrifice is not random or distant."];
  else if (/accepted/.test(lower)) opening = ["Accepted means the LORD receives the worshiper through the offering He commanded.", "Acceptance is given by God's provided way, not by human confidence."];
  else if (/atonement/.test(lower)) opening = ["Atonement means sin or uncleanness is covered before God.", "Leviticus keeps holiness and mercy together: guilt is not ignored, but God gives a way near."];
  else if (/blood|sprinkle/.test(lower)) opening = ["Blood represents life before the LORD.", "The priest handles it carefully because atonement is serious, not symbolic decoration."];
  else if (/sweet savour/.test(lower)) opening = ["Sweet savour means a pleasing aroma rising to the LORD.", "The phrase pictures worship received by God when it is offered His way."];
  else if (/turtledoves|pigeons/.test(lower)) opening = ["Turtledoves and young pigeons were smaller birds used for offerings.", "They show that poorer worshipers still had a God-given way to bring an offering."];
  else if (/crop|feathers/.test(lower)) opening = ["The crop and feathers were parts of a bird handled during the offering.", "Even a small bird offering followed ordered steps before the LORD."];
  else if (/meat offering/.test(lower)) opening = ["Meat offering in the KJV means a grain offering, not a meat dinner.", "It uses flour, oil, and frankincense to give daily provision back to God in gratitude."];
  else if (/fine flour/.test(lower)) opening = ["Fine flour was carefully prepared grain flour.", "The offering gives ordinary provision back to the LORD with care and honor."];
  else if (/oil/.test(lower)) opening = ["Oil was poured on the grain offering as part of its preparation.", "Food from Israel's daily life becomes worship when brought according to God's command."];
  else if (/frankincense/.test(lower)) opening = ["Frankincense was fragrant resin used in worship.", "Its smell marked the grain offering as something set apart for the LORD."];
  else if (/memorial/.test(lower)) opening = ["A memorial portion was the part burned on the altar before the LORD.", "It represented the whole offering being remembered and received by God."];
  else if (/most holy/.test(lower)) opening = ["Most holy means this part of the offering was set apart in an especially serious way.", "The priests could not treat it like ordinary food or casual leftovers."];
  else if (/baken|oven|fryingpan/.test(lower)) opening = ["Baken means baked.", "Leviticus names different preparations because ordinary food preparation could become holy worship."];
  else if (/peace offering/.test(lower)) opening = ["A peace offering celebrated fellowship and wholeness with God.", "It was not only about stopping conflict; it pictured restored relationship before the LORD."];
  else if (/fat|kidneys|inwards|caul/.test(lower)) opening = ["Fat and inner parts were rich portions given to the LORD.", "The peace offering teaches that the best and deepest parts are not handled casually."];
  else if (/neither fat nor blood/.test(lower)) opening = ["Fat and blood were reserved from ordinary eating.", "Blood represented life, and the fat belonged to the LORD in the offering system."];
  else if (/throughout your generations/.test(lower)) opening = ["Throughout your generations means this command continues for Israel's descendants.", "The rule is not a one-day instruction; it shapes covenant life over time."];
  else if (/sin through ignorance|ignorance|unwittingly/.test(lower)) opening = ["Sin through ignorance means sin committed without open defiance or full awareness.", "Leviticus still treats it seriously because unintentional sin can make someone guilty before God."];
  else if (/commandments/.test(lower)) opening = ["Commandments are the LORD's instructions for covenant life.", "Sin is measured against God's word, not against what feels harmless to the person."];
  else if (/anointed priest/.test(lower)) opening = ["The anointed priest was the priest set apart with holy oil.", "Even a priest needed atonement when he sinned; office did not erase guilt."];
  else if (/bullock|calf|ram|goat|kid|lamb/.test(lower)) opening = ["The animal named here is part of the sacrifice God commanded.", "Different offerings used different animals, but each one taught that approach to God involved life and cost."];
  else if (/seven times/.test(lower)) opening = ["Seven times marks a repeated priestly action before the LORD.", "The repetition shows careful obedience, not rushed ritual."];
  else if (/congregation/.test(lower)) opening = ["Congregation means the gathered people of Israel.", "Leviticus shows that sin can involve the whole community, not only private individuals."];
  else if (/hid from the eyes/.test(lower)) opening = ["Hid from the eyes means the sin was not noticed at first.", "When guilt becomes known, Israel must deal with it honestly before God."];
  else if (/ruler/.test(lower)) opening = ["A ruler was a leader among the people.", "Leaders are not above God's law; their sin also needs confession and atonement."];
  else if (/common people|common person/.test(lower)) opening = ["A common person means an ordinary Israelite without special office.", "Leviticus gives ordinary people a way to seek forgiveness too."];
  else if (/forgiven/.test(lower)) opening = ["Forgiven means guilt is removed according to God's provided way.", "The word is mercy language, but it comes after sin is named and atonement is made."];
  else if (/voice of swearing|oath|swearing/.test(lower)) opening = ["Swearing here means an oath or solemn statement.", "Leviticus treats speech as serious because words can make a person guilty."];
  else if (/witness/.test(lower)) opening = ["A witness is someone who knows what happened and is responsible to tell the truth.", "Silence can become guilt when truth is required."];
  else if (/unclean thing/.test(lower)) opening = ["An unclean thing made a person ritually unclean for worship access.", "This was not always moral shame, but it still had to be addressed before holy space."];
  else if (/confess/.test(lower)) opening = ["Confess means openly admit the wrong before God.", "Leviticus does not let guilt stay hidden behind vague feelings."];
  else if (/ephah/.test(lower)) opening = ["An ephah was an ancient dry measure for grain.", "The tenth part shows God made room for a poor worshiper to bring a smaller offering."];
  else if (/trespass/.test(lower)) opening = ["Trespass means guilt from violating what belongs to God or another person.", "The offering does not erase responsibility; wrongs still need to be repaired."];
  else if (/holy things/.test(lower)) opening = ["Holy things were items or duties set apart for the LORD.", "Misusing them was not a small mistake because they belonged to God's worship."];
  else if (/fifth/.test(lower)) opening = ["The fifth part means an extra twenty percent added when restitution was made.", "Wrongdoing had to be repaired, not only regretted."];
  else if (/neighbour|restore|delivered him to keep/.test(lower)) opening = ["Wronging a neighbor is treated as sin against the LORD.", "Leviticus joins worship and justice instead of separating them."];
  else if (/fire upon the altar|not be put out/.test(lower)) opening = ["The altar fire had to keep burning.", "Priestly service included steady daily care, not only dramatic sacrifice moments."];
  else if (/ashes/.test(lower)) opening = ["Ashes were the remains from sacrifices on the altar.", "Even removing them had holy order because the altar belonged to the LORD."];
  else if (/linen garment/.test(lower)) opening = ["A linen garment was priestly clothing for holy service.", "The priest dressed according to God's command before handling altar work."];
  else if (/wave breast|heave shoulder|wave|heave/.test(lower)) opening = ["Wave and heave offerings were portions presented before the LORD.", "Those portions also provided for the priests who served at the altar."];
  else if (/garments/.test(lower)) opening = ["The garments were priestly clothes made for holy service.", "They marked Aaron and his sons as set apart before they ministered."];
  else if (/anointing oil|anoint/.test(lower)) opening = ["Anointing oil was holy oil used to set people or objects apart.", "Being anointed marked priestly service as belonging to the LORD."];
  else if (/washed them with water/.test(lower)) opening = ["Washing with water came before priestly service.", "Aaron and his sons had to be cleansed before they served near God's presence."];
  else if (/right ear|thumb|great toe/.test(lower)) opening = ["The ear, thumb, and toe marked hearing, serving, and walking.", "Blood on these parts showed the priest's whole life being claimed for holy service."];
  else if (/seven days.*consecrate|abide at the door/.test(lower)) opening = ["Seven days of consecration meant priestly preparation took time.", "Aaron and his sons had to remain where God commanded until the ordination was complete."];
  else if (/eighth day/.test(lower)) opening = ["The eighth day marks the move from ordination into public priestly service.", "After seven days of preparation, Aaron begins serving before the congregation."];
  else if (/glory of the lord/.test(lower)) opening = ["The glory of the LORD means God's visible holy presence.", "The people are about to see that God receives worship offered His way."];
  else if (/fire out from before the lord|fire from the lord/.test(lower)) opening = ["Fire from the LORD shows God Himself receiving or judging at the altar.", "The same holy presence that accepts commanded worship also judges unauthorized worship."];
  else if (/shouted|fell on their faces/.test(lower)) opening = ["Shouting and falling on their faces show public awe.", "The people respond because God's glory has appeared, not because the ritual is empty ceremony."];
  else if (/strange fire/.test(lower)) opening = ["Strange fire means unauthorized fire God had not commanded.", "Nadab and Abihu treated holy worship as something they could invent."];
  else if (/nadab|abihu/.test(lower)) opening = ["Nadab and Abihu were Aaron's sons and priests.", "Their judgment shows that serving near holy things brings serious responsibility."];
  else if (/sanctified/.test(lower)) opening = ["Sanctified means treated as holy.", "The LORD will be honored as holy by those who come near Him."];
  else if (/held his peace/.test(lower)) opening = ["Held his peace means Aaron stayed silent.", "His silence shows grief under God's judgment without arguing that holy worship can be handled casually."];
  else if (/wine|strong drink/.test(lower)) opening = ["Wine and strong drink could blur priestly judgment.", "Priests needed clear minds to serve and teach near God's holy presence."];
  else if (/holy and unholy|unclean and clean|difference/.test(lower)) opening = ["Holy and unholy, clean and unclean are distinctions priests had to teach.", "Israel needed leaders who could explain God's boundaries clearly."];
  else if (/teach the children/.test(lower)) opening = ["Teaching the children of Israel was part of priestly service.", "Priests did not only perform rituals; they helped the people understand God's law."];
  else if (/beasts|hoof|cud/.test(lower)) opening = ["Parting the hoof and chewing the cud were signs in Israel's food laws.", "Daily eating trained Israel to make distinctions as a set-apart people."];
  else if (/camel|swine/.test(lower)) opening = ["The camel and swine are examples of animals Israel could not eat.", "The point is covenant distinction, not modern diet advice."];
  else if (/fins and scales/.test(lower)) opening = ["Fins and scales marked water creatures Israel could eat.", "The rule made even meals part of learning clean and unclean."];
  else if (/abomination/.test(lower)) opening = ["Abomination here means something forbidden as unclean for Israel.", "The word marks a boundary for covenant life, not a random dislike."];
  else if (/carcase/.test(lower)) opening = ["Carcase means a dead body.", "Contact with death brought uncleanness because death and decay do not fit easily near God's holy dwelling."];
  else if (/until the even/.test(lower)) opening = ["Until the even means until evening.", "Some uncleanness lasted only for a time, with washing and waiting before return."];
  else if (/earthen vessel/.test(lower)) opening = ["An earthen vessel was a clay container.", "Because clay absorbed contamination, some vessels had to be broken instead of reused."];
  else if (/be holy|i am holy/.test(lower)) opening = ["Be holy means live as people set apart for the holy LORD.", "Israel's daily habits were to reflect the God who rescued them."];
  else if (/conceived seed|man child|woman have/.test(lower)) opening = ["Conceived seed and man child are old wording for pregnancy and the birth of a son.", "Leviticus speaks about childbirth as a major life event that required purification before sanctuary worship."];
  else if (/foreskin|circumcised/.test(lower)) opening = ["Circumcised means the covenant sign was given to the baby boy.", "The eighth-day sign connects the child to Israel's covenant identity."];
  else if (/purifying|hallowed/.test(lower)) opening = ["Purifying means the period before returning to regular worship cleanness.", "The mother was not being called evil; the law deals with blood, birth, and holy space."];
  else if (/leprosy/.test(lower)) opening = ["Leprosy in Leviticus covers serious skin disease or visible contamination, not only modern leprosy.", "The priest examines it because uncleanness affects life near the holy camp."];
  else if (/priest shall look|look on him again/.test(lower)) opening = ["The priest had to look carefully before declaring someone clean or unclean.", "Leviticus slows judgment down so fear does not replace truth."];
  else if (/hair.*white|deeper than the skin|raw flesh|white rising|yellow thin hair/.test(lower)) opening = ["The visible sign named here helped the priest judge the condition.", "The law uses observable evidence instead of guesses or panic."];
  else if (/shut up/.test(lower)) opening = ["Shut up means the person was isolated for a set time.", "Waiting gave the priest time to see whether the mark spread or faded."];
  else if (/pronounce.*clean/.test(lower)) opening = ["Pronounce clean means the priest declares the person restored for normal life and worship access.", "The declaration mattered because the person could return from suspicion or uncleanness."];
  else if (/pronounce.*unclean/.test(lower)) opening = ["Pronounce unclean means the priest declares the person unable to live in normal camp life for a time.", "The decision protected the camp around God's holy presence."];
  else if (/clothes shall be rent|dwell alone|without the camp/.test(lower)) opening = ["Rent clothes, living alone, and being outside the camp were public signs of uncleanness.", "The signs were painful, but they protected the community and kept open the hope of cleansing."];
  else if (/woollen|warp|woof|garment/.test(lower)) opening = ["Warp and woof are threads that run lengthwise and crosswise in fabric.", "Even clothing could be examined because uncleanness could touch ordinary objects."];
  else if (/fretting leprosy/.test(lower)) opening = ["Fretting leprosy means a spreading contamination in fabric or material.", "What kept spreading had to be removed or burned instead of ignored."];
  else if (/burn that garment/.test(lower)) opening = ["Burning the garment removed contamination that could not be cleansed.", "Leviticus treats spreading uncleanness as something that must be stopped."];
  else if (/day of his cleansing/.test(lower)) opening = ["The day of cleansing is the beginning of the way back.", "Leviticus 14 is not only about exclusion; it gives a path toward restoration."];
  else if (/go forth out of the camp/.test(lower)) opening = ["The priest going outside the camp shows restoration begins where the unclean person is.", "The person is not left to find a way back alone."];
  else if (/two birds|living bird/.test(lower)) opening = ["The two birds belong to the cleansing ceremony.", "One bird dies, and the living bird is released to picture cleansing and restored life."];
  else if (/cedar|scarlet|hyssop|running water/.test(lower)) opening = ["Cedar, scarlet, hyssop, and running water were visible parts of cleansing.", "The ceremony used physical signs so restoration could be seen, not only imagined."];
  else if (/open field/.test(lower)) opening = ["The open field is where the living bird is released.", "The release pictures life and freedom after uncleanness has been dealt with."];
  else if (/shave|wash his clothes/.test(lower)) opening = ["Shaving and washing marked a real cleansing process.", "The restored person moved step by step back toward community and worship."];
  else if (/log of oil/.test(lower)) opening = ["A log of oil was a measured amount of oil used in the cleansing ceremony.", "The oil marked restoration and renewed readiness before the LORD."];
  else if (/tip of the right ear/.test(lower)) opening = ["The ear, thumb, and toe show the restored person's hearing, serving, and walking brought back under God.", "Cleansing touches the whole life, not only the diseased place."];
  else if (/if he be poor/.test(lower)) opening = ["If he be poor means the law gives a smaller offering for someone with fewer resources.", "God's way back did not exclude the poor."];
  else if (/land of canaan|house/.test(lower)) opening = ["The house laws look ahead to life in Canaan.", "Holiness will reach Israel's homes, not only the tabernacle."];
  else if (/stones|scrape|break down|cleanse the house/.test(lower)) opening = ["Stones, scraping, breaking down, and cleansing describe how a contaminated house was handled.", "Restoration was attempted, but spreading corruption could not be ignored forever."];
  else if (/running issue|issue/.test(lower)) opening = ["A running issue means an ongoing bodily discharge.", "Leviticus brings private body conditions under God's care without treating the body as outside holiness."];
  else if (/bed|saddle|lieth/.test(lower)) opening = ["Beds and saddles could become unclean through contact.", "Uncleanness affected ordinary daily objects, not only religious spaces."];
  else if (/bathe|flesh in water|wash/.test(lower)) opening = ["Bathing and washing were part of returning to cleanness.", "The law gives a concrete path back through washing, waiting, and offerings when needed."];
  else if (/seed of copulation/.test(lower)) opening = ["Seed of copulation is old wording for semen.", "Leviticus speaks plainly about bodily fluids because holy space touched real human life."];
  else if (/woman also|blood/.test(lower)) opening = ["The woman's issue of blood refers to menstrual or extended bleeding.", "The law marks ritual uncleanness around blood without saying the woman has committed moral sin."];
  else if (/separate the children/.test(lower)) opening = ["Separate the children of Israel from uncleanness means the people must respect holy boundaries.", "The command protects life around the LORD's dwelling place."];
  else if (/after the death/.test(lower)) opening = ["After the death of Aaron's sons connects the Day of Atonement to holy danger.", "Access to the Most Holy Place cannot be casual after Nadab and Abihu's judgment."];
  else if (/come not at all times/.test(lower)) opening = ["Come not at all times means Aaron could not enter the Most Holy Place whenever he wanted.", "God set the terms for access to His holy presence."];
  else if (/vail|veil/.test(lower)) opening = ["The vail was the curtain before the Most Holy Place.", "It marked the boundary between ordinary priestly service and the place of God's special presence."];
  else if (/mercy seat/.test(lower)) opening = ["The mercy seat was the cover of the ark where atonement blood was brought.", "It is the place where God's holiness and mercy meet on His terms."];
  else if (/die not/.test(lower)) opening = ["That he die not means the warning is life-and-death serious.", "Coming near God's holy presence without God's command is dangerous."];
  else if (/cloud of incense/.test(lower)) opening = ["The cloud of incense covered the mercy seat area.", "Even the high priest enters with protection and reverence, not casual sight."];
  else if (/uncleanness of the children/.test(lower)) opening = ["Israel's uncleanness means the sanctuary itself needed cleansing from the people's sin and impurity.", "The Day of Atonement deals with the whole nation's need before God."];
  else if (/confess.*iniquities|bear.*iniquities/.test(lower)) opening = ["Confessing and bearing iniquities means Israel's sins are named and carried away.", "The live goat visibly shows guilt leaving the camp."];
  else if (/land not inhabited/.test(lower)) opening = ["A land not inhabited means a wilderness place away from the camp.", "The goat carries sin away from the people and away from God's dwelling."];
  else if (/afflict your souls/.test(lower)) opening = ["Afflict your souls means humble yourselves before the LORD.", "The Day of Atonement was not party worship; it was solemn repentance and mercy."];
  else if (/statute for ever|once in a year/.test(lower)) opening = ["Once in a year means the Day of Atonement was repeated annually.", "Israel needed a regular, God-given day for deep cleansing before the LORD."];
  else opening = [getLeviticusContextualOpening(section, cleanTitle).replace(new RegExp(`^${cleanTitle}\\s+`, "i"), "This "), `Inside ${focus}, this wording answers a real question about worship, cleanness, sin, or mercy.`];

  return finalizeLeviticus95Lines(section, cleanTitle, [...opening, ...getLeviticus95Support(section, cleanTitle), `Inside ${focus}, the wording teaches how people live near the holy LORD.`].slice(0, 8));
}

function finalizeLeviticus95Lines(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string, lines: string[]) {
  if (lines.length === 0) return lines;

  const focus = getLeviticusSectionFocus(section);
  const lowerTitle = cleanTitle.toLowerCase();
  const startsWithTitle = lines[0].toLowerCase().startsWith(lowerTitle);
  const detail = getLeviticusDistinctiveTopic(cleanTitle);
  const topic = `${getLeviticus95Topic(cleanTitle)} (${detail})`;
  const firstLine = lines[0]
    .replace(/\bThis helps explain\b/gi, `Inside ${focus}, this explains`)
    .replace(/\bThis helps\b/gi, "This shows");
  const first = cleanRenderedLeviticusOpening(
    cleanTitle,
    startsWithTitle ? `In ${section.reference}, ${firstLine.charAt(0).toLowerCase()}${firstLine.slice(1)}` : `${firstLine} Here it applies to ${topic} in ${section.reference}.`,
  );

  return [
    first,
    ...lines.slice(1).map((line) =>
      line
        .replace(/\s+Here it applies to .*$/i, "")
        .replace(/^Inside [^.]+, this wording answers a real question about worship, cleanness, sin, or mercy\./i, `This detail fits the larger instruction about ${focus}.`)
        .replace(/^Inside [^.]+, this explains /i, "")
        .replace(/\bthe phrase shows\b/gi, "the wording shows")
        .replace(/\bthe phrase explains\b/gi, "the wording explains")
        .replace(/\bthe phrase teaches\b/gi, "the wording teaches")
        .replace(/\bThis helps explain\b/gi, `Inside ${focus}, this explains`)
    ),
  ];
}

function getLeviticus95Topic(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const detail = getLeviticusDistinctiveTopic(cleanTitle);
  if (/leaven/.test(lower)) return "the leaven rule";
  if (/honey/.test(lower)) return "the honey restriction";
  if (/salt/.test(lower)) return "the covenant salt command";
  if (/scapegoat/.test(lower)) return "the scapegoat lot";
  if (/atonement/.test(lower)) return "the atonement action";
  if (/blood|sprinkle/.test(lower)) return "the blood ritual";
  if (/fifth/.test(lower)) return "the added repayment";
  if (/trespass/.test(lower)) return "the trespass law";
  if (/unclean|clean/.test(lower)) return "the clean-or-unclean ruling";
  if (/leprosy|plague/.test(lower)) return "the visible uncleanness being examined";
  if (/issue|blood/.test(lower)) return "the bodily uncleanness being named";
  if (/offering|sacrifice|oblation/.test(lower)) return `the offering detail about ${detail}`;
  if (/priest|aaron|sons/.test(lower)) return `the priestly service detail about ${detail}`;
  if (/goat|bullock|ram|lamb|calf|kid|bird|turtledove|pigeon/.test(lower)) return `the required sacrifice detail about ${detail}`;
  return `the wording about ${detail}`;
}

function getLeviticusDistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any"].includes(word));

  return (words.length <= 4 ? words : words.slice(-3)).join(" ") || "this detail";
}

function getDay32ShortOpening(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const ref = section.reference;

  if (/sweet savour unto the lord|sweet savour$/.test(lower) && ref === "Leviticus 1:7-12") return ["Sweet savour means a pleasing aroma rising to the LORD.", "The burnt offering is received as worship when it is offered His way."];
  if (/sweet savour$/.test(lower) && ref === "Leviticus 3:7-12") return ["A sweet savour means the lamb offering is pleasing before the LORD.", "The altar portion rises as accepted worship."];
  if (/sweet savour unto the lord/.test(lower) && ref === "Leviticus 4:27-32") return ["Sweet savour unto the LORD shows the common person's sin offering is received.", "Even forgiveness for ordinary people comes through worship God accepts."];
  if (/sweet savour unto the lord/.test(lower) && ref === "Leviticus 4:33-35") return ["Sweet savour unto the LORD repeats that atonement ends in accepted worship.", "The sin offering is not only about guilt leaving, but mercy being received."];
  if (/memorial thereof/.test(lower)) return ["A memorial portion is the part of the grain offering burned before the LORD.", "It represents the whole gift being remembered by God."];
  if (/meat offering a memorial/.test(lower)) return ["The memorial from the meat offering is the altar portion taken from the grain gift.", "Part of the offering stands for the whole."];
  if (/memorial of it/.test(lower)) return ["A memorial of it is the portion burned from the firstfruits grain.", "The first harvest gift is brought before God in a visible way."];
  if (/fat that covereth the inwards/.test(lower) && ref === "Leviticus 3:1-6") return ["The fat covering the inwards is the rich inner fat from the cattle offering.", "That prized portion belongs to the LORD."];
  if (/fat that covereth the inwards/.test(lower) && ref === "Leviticus 3:7-12") return ["The lamb's inner fat is removed for the altar.", "The peace offering gives the rich portions to God."];
  if (/fat that covereth the inwards/.test(lower) && ref === "Leviticus 3:13-17") return ["The goat's inner fat is also given to the LORD.", "The same peace offering pattern applies to this sacrifice."];
  if (/seven times before the lord/.test(lower)) return ["Seven times before the LORD means repeated sprinkling in God's presence.", "The priest's sin offering is handled with complete, deliberate care."];
  if (/sprinkle it seven times/.test(lower) && ref === "Leviticus 4:13-18") return ["Sprinkling it seven times marks the congregation's sin offering with repeated blood application.", "The whole people's guilt is treated seriously before the LORD."];
  if (/sprinkle it seven times/.test(lower) && ref === "Leviticus 4:19-21") return ["The repeated sevenfold sprinkling continues the congregation's atonement ritual.", "The second section repeats the same serious pattern for communal sin."];
  if (/priest shall make an atonement/.test(lower) && ref === "Leviticus 4:13-18") return ["Atonement means the priest deals with the congregation's sin before God.", "The whole community receives mercy through the appointed sacrifice."];
  if (/priest shall make an atonement/.test(lower) && ref === "Leviticus 4:19-21") return ["The priest makes atonement again for the whole congregation.", "The repeated wording assures Israel that communal guilt can be forgiven."];
  if (/priest shall make an atonement/.test(lower) && ref === "Leviticus 4:22-26") return ["The priest makes atonement for the ruler who sinned.", "A leader needs God's mercy as much as anyone else."];
  if (/priest shall make an atonement/.test(lower) && ref === "Leviticus 4:27-32") return ["The priest makes atonement for an ordinary person.", "The common worshiper is not left without a way to be forgiven."];
  if (/priest shall make an atonement/.test(lower) && ref === "Leviticus 4:33-35") return ["Atonement is made through the sacrifice God appointed.", "The repeated promise shows forgiveness is available when sin is brought to God."];
  if (/forgiven him/.test(lower) && ref === "Leviticus 4:22-26") return ["Forgiven him means the ruler receives mercy after atonement.", "Leadership failure can be brought honestly before God."];
  if (/forgiven him/.test(lower) && ref === "Leviticus 4:27-32") return ["Forgiven him means the ordinary sinner receives mercy.", "Known sin does not have to remain hidden or unresolved."];
  if (/forgiven him/.test(lower) && ref === "Leviticus 4:33-35") return ["Forgiven him repeats the promise for another common-person offering.", "God provides more than one clear path for sinners to seek mercy."];
  if (/lay his hand upon the head/.test(lower) && ref === "Leviticus 3:1-6") return ["Laying a hand on the head identifies the worshiper with the peace offering.", "The sacrifice is personal fellowship worship before the LORD."];
  if (/lord called unto moses/.test(lower)) return ["Leviticus begins with the LORD speaking to Moses.", "The offering laws come from God, not from Moses making up worship rules."];
  if (/out of the tabernacle/.test(lower)) return ["The tabernacle was the holy tent where God dwelt among Israel.", "The instructions now come from God's dwelling in the camp."];
  if (/bring an offering unto the lord/.test(lower)) return ["An offering is something brought near to the LORD in worship.", "The worshiper does not approach God empty-handed or in his own way."];
  if (/of the herd/.test(lower) && ref === "Leviticus 1:1-6") return ["The herd means cattle from a worshiper's livestock.", "A burnt offering could come from the costly animals a household depended on."];
  if (/of the herd/.test(lower)) return ["Of the herd means the peace offering could come from cattle.", "This offering used a valuable animal from daily life."];
  if (/male without blemish/.test(lower)) return ["A male without blemish means an animal with no defect.", "The worshiper could not bring God a damaged leftover and call it holy worship."];
  if (/of his own voluntary will/.test(lower)) return ["Voluntary will means the worshiper brings the offering willingly.", "The burnt offering is worship offered before the LORD, not a forced payment."];
  if (/at the door of the tabernacle/.test(lower)) return ["The door of the tabernacle is the entrance to the holy tent area.", "The offering is brought to the place God appointed for approach."];
  if (/put his hand upon the head/.test(lower)) return ["Putting a hand on the animal's head showed personal identification.", "The offering is connected to the worshiper, not random or distant."];
  if (/put fire upon the altar/.test(lower)) return ["Fire on the altar is where the sacrifice is burned before the LORD.", "The priest prepares the altar so the offering can be received God's way."];
  if (/lay the wood in order/.test(lower)) return ["Laying the wood in order means arranging the fuel carefully on the altar.", "Even the firewood is prepared with order, not carelessness."];
  if (/priests shall lay the parts/.test(lower)) return ["The priests lay the cut pieces on the altar fire.", "The worshiper brings the offering, but priests handle the holy altar work."];
  if (/head and the fat/.test(lower)) return ["The head and the fat are parts placed on the altar.", "The offering is given in ordered pieces before the LORD."];
  if (/wash the inwards and the legs/.test(lower)) return ["The inwards are the inner parts, and the legs are washed before burning.", "The offering is cleaned before it is placed on the altar."];
  if (/burn all on the altar/.test(lower)) return ["Burn all means the whole burnt offering is given up to the LORD.", "Nothing is kept back from this sacrifice."];
  if (/of the flocks/.test(lower)) return ["The flocks means sheep or goats could be brought for the offering.", "God gives more than one fitting way for worshipers to bring a burnt offering."];
  if (/sweet savour unto the lord|sweet savour$/.test(lower)) return ["Sweet savour means a pleasing aroma rising to the LORD.", "The phrase pictures worship received by God when offered His way."];
  if (/turtledoves|young pigeons/.test(lower)) return ["Turtledoves and young pigeons were smaller birds used for offerings.", "Poorer worshipers still had a God-given way to bring a sacrifice."];
  if (/priest shall bring it/.test(lower)) return ["The priest brings the bird offering to the altar.", "The priest guides the sacrifice through the holy steps."];
  if (/wring off his head/.test(lower)) return ["Wring off his head describes how the bird sacrifice is killed.", "Leviticus gives the priest exact steps even for a small offering."];
  if (/burn it on the altar/.test(lower)) return ["Burning it on the altar gives the bird offering to the LORD.", "The smaller sacrifice is still treated as holy worship."];
  if (/blood thereof/.test(lower)) return ["The blood represents life before the LORD.", "The priest handles it carefully because atonement is serious."];
  if (/crop with his feathers/.test(lower)) return ["The crop and feathers are parts of the bird removed during the offering.", "Even a small bird sacrifice follows ordered preparation."];
  if (/cleave it with the wings/.test(lower)) return ["Cleave means split open.", "The bird is opened with its wings as part of the sacrifice."];
  if (/shall not divide it asunder/.test(lower)) return ["Asunder means completely apart.", "The bird is opened, but not split into two separate pieces."];
  if (/meat offering unto the lord/.test(lower)) return ["A meat offering is a grain offering, not animal meat.", "It brings food from the harvest to the LORD in worship."];
  if (/fine flour/.test(lower)) return ["Fine flour is carefully prepared grain flour.", "The offering gives ordinary provision back to the LORD with care."];
  if (/pour oil upon it/.test(lower) && ref === "Leviticus 2:1-6") return ["Oil is poured on the flour as part of the grain offering.", "The grain is prepared for worship before it reaches the altar."];
  if (/put oil upon it/.test(lower)) return ["Oil is added to the firstfruits grain offering.", "The harvest gift is prepared before part of it is burned."];
  if (/put frankincense thereon/.test(lower)) return ["Frankincense was fragrant resin used in worship.", "Its smell marked the grain offering as set apart for the LORD."];
  if (/lay frankincense thereon/.test(lower)) return ["Frankincense is laid on the firstfruits offering.", "The harvest gift is joined with holy fragrance before God."];
  if (/aaron's sons the priests/.test(lower)) return ["Aaron's sons are the priests who serve at the altar.", "The offering is handled by the people God set apart for holy work."];
  if (/handful of the flour/.test(lower)) return ["A handful of flour is the portion taken from the grain offering.", "Part of the gift represents the whole offering before the LORD."];
  if (/memorial thereof|memorial of it|meat offering a memorial/.test(lower)) return ["A memorial portion is the part burned on the altar before the LORD.", "It represents the whole offering being remembered and received by God."];
  if (/unleavened cakes/.test(lower)) return ["Unleavened cakes are bread made without leaven, the ingredient that makes dough rise.", "The grain offering uses bread prepared within God's boundaries."];
  if (/baken in the fryingpan/.test(lower)) return ["Baken means baked.", "Leviticus names ordinary cooking methods because prepared food could become worship."];
  if (/bring the meat offering/.test(lower)) return ["Bringing the meat offering means presenting the grain gift to the LORD.", "The food offering is brought to the priest instead of kept at home."];
  if (/most holy of the offerings/.test(lower)) return ["Most holy means this offering is set apart in a special way.", "What remains belongs to the priests as holy food, not common leftovers."];
  if (/no meat offering shall be made with leaven/.test(lower)) return ["Leaven is what makes dough rise, like yeast.", "Grain offerings burned to the LORD could not include leaven."];
  if (/neither shall any honey/.test(lower)) return ["Honey was sweet food, but it was not burned on the altar.", "Worship is shaped by God's command, not by what tastes pleasant."];
  if (/offering of the firstfruits/.test(lower)) return ["Firstfruits are the first part of the harvest.", "Israel gives the beginning of increase to the LORD instead of treating it as their own."];
  if (/burnt on the altar/.test(lower)) return ["Burnt on the altar means the portion is offered to God by fire.", "Only the appointed part of the grain gift is burned."];
  if (/season with salt/.test(lower)) return ["Season with salt means salt must be added to the grain offering.", "Salt marks the offering with preservation and covenant faithfulness."];
  if (/salt of the covenant/.test(lower)) return ["The salt of the covenant connects salt with God's lasting covenant.", "The offering remembers that Israel belongs to the LORD by covenant."];
  if (/with all thine offerings/.test(lower)) return ["With all thine offerings means salt belongs with every offering named here.", "No worshiper gets to ignore this covenant sign."];
  if (/green ears of corn/.test(lower)) return ["Green ears of corn means fresh heads of grain, not modern sweet corn.", "The firstfruits offering comes from the new harvest."];
  if (/corn beaten out of full ears/.test(lower)) return ["Corn beaten out of full ears means grain kernels crushed or prepared from ripe heads.", "The firstfruits are processed enough to be offered with care."];
  if (/sacrifice of peace offering/.test(lower)) return ["A peace offering is a sacrifice connected with fellowship and well-being before God.", "It is not mainly about escape from danger, but shared peace with the LORD."];
  if (/male or female/.test(lower)) return ["Male or female means either could be used for the peace offering.", "The rule is different from some burnt offering instructions."];
  if (/without blemish/.test(lower)) return ["Without blemish means the animal had no defect.", "Peace with God is not honored by bringing damaged leftovers."];
  if (/lay his hand upon the head/.test(lower) && ref === "Leviticus 3:7-12") return ["Laying a hand on the lamb's head identifies the worshiper with the offering.", "The peace offering is personal worship, not a distant ritual."];
  if (/lay his hand upon the head/.test(lower) && ref === "Leviticus 3:13-17") return ["The worshiper's hand connects him to the goat offering.", "Peace with God is approached through the sacrifice God appoints."];
  if (/lay his hand upon the head/.test(lower) && ref === "Leviticus 4:22-26") return ["The ruler lays his hand on the sin offering's head.", "His guilt is dealt with through the sacrifice God commands."];
  if (/lay his hand upon the head/.test(lower) && ref === "Leviticus 4:27-32") return ["The common person lays a hand on the sin offering's head.", "The sacrifice is personally connected to the sinner seeking forgiveness."];
  if (/lay his hand upon the head/.test(lower)) return ["Laying hands on the head connects the worshiper or elders to the offering.", "The sacrifice stands in relation to the people who have sinned."];
  if (/sprinkle the blood upon the altar/.test(lower)) return ["Sprinkling blood on the altar presents the life of the sacrifice before God.", "Peace with the LORD is approached through blood handled His way."];
  if (/sprinkle the blood$/.test(lower)) return ["Sprinkling the blood means applying the sacrifice's blood at the altar.", "The priest treats the life of the offering as holy."];
  if (/fat that covereth the inwards/.test(lower)) return ["The fat covering the inwards is the rich inner fat of the animal.", "That prized portion belongs to the LORD in the offering."];
  if (/two kidneys/.test(lower)) return ["The two kidneys are inner organs removed with the fat.", "Leviticus names the inner parts because the offering is handled carefully."];
  if (/if he offer a lamb/.test(lower)) return ["If he offer a lamb gives another peace offering option.", "A worshiper may bring a lamb and still follow God's same holy pattern."];
  if (/kill it before the tabernacle/.test(lower)) return ["Killing it before the tabernacle means the sacrifice happens at God's appointed place.", "The offering is not done privately wherever someone chooses."];
  if (/whole rump/.test(lower)) return ["The whole rump is the fat tail portion of the lamb.", "That rich part is included among the portions burned to the LORD."];
  if (/food of the offering/.test(lower)) return ["Food of the offering describes the altar portion given to the LORD.", "The language pictures God's altar receiving what belongs to Him."];
  if (/all the fat is the lord's/.test(lower)) return ["All the fat is the LORD's means the richest portions belong to God.", "The worshiper may not treat the best parts as personal leftovers."];
  if (/perpetual statute/.test(lower)) return ["A perpetual statute is an ongoing rule for Israel.", "This command is not a one-time instruction for one sacrifice."];
  if (/eat neither fat nor blood/.test(lower)) return ["Israel must not eat the fat or the blood.", "The fat belongs to the LORD, and the blood represents life."];
  if (/throughout your generations/.test(lower)) return ["Throughout your generations means the rule continues for Israel's descendants.", "Future families must learn the same holiness around fat and blood."];
  if (/soul shall sin through ignorance/.test(lower)) return ["Sin through ignorance means sin done unintentionally or without full awareness.", "Leviticus still treats that sin as needing atonement."];
  if (/against any of the commandments/.test(lower)) return ["Against any of the commandments means the sin breaks what the LORD commanded.", "Sin is measured by God's word, not by personal opinion."];
  if (/priest that is anointed/.test(lower)) return ["The anointed priest is the priest set apart with holy oil.", "If he sins, his failure affects the people he represents."];
  if (/bring a young bullock/.test(lower)) return ["A young bullock is a young bull brought as the priest's sin offering.", "A serious offering is required because priestly sin is serious."];
  if (/bullock's head/.test(lower)) return ["The priest lays his hand on the bullock's head.", "His own sin is connected to the sacrifice being offered."];
  if (/dip his finger in the blood/.test(lower)) return ["The priest dips his finger in the blood to apply it before the LORD.", "The blood is handled carefully as part of atonement."];
  if (/seven times before the lord|sprinkle it seven times/.test(lower)) return ["Seven times means repeated sprinkling before the LORD.", "The action shows complete, deliberate atonement."];
  if (/holy place/.test(lower)) return ["The holy place is the sacred room inside the tabernacle.", "The priest's sin reaches into the place where he serves."];
  if (/horns of the altar/.test(lower)) return ["The horns are raised corners on the altar.", "Blood is placed there as part of the sin offering ritual."];
  if (/pour all the blood/.test(lower)) return ["Pouring all the blood means the rest is emptied at the altar base.", "The blood is not treated casually or reused."];
  if (/all the fat of the bullock/.test(lower)) return ["All the fat of the bullock is removed for the LORD.", "The sin offering still gives the richest portions to God."];
  if (/skin of the bullock/.test(lower)) return ["The skin of the bullock is taken outside with the rest of the carcass.", "Not every part is burned on the altar."];
  if (/without the camp/.test(lower)) return ["Without the camp means outside Israel's camp.", "The remains of the sin offering are carried away from the holy dwelling area."];
  if (/clean place/.test(lower)) return ["A clean place is a place not treated as defiled.", "Even outside the camp, the remains are handled with care."];
  if (/burn him on the wood with fire/.test(lower)) return ["Burning him on wood with fire destroys the remaining parts outside the camp.", "The sin offering removes what cannot stay near the sanctuary."];
  if (/ashes are poured out/.test(lower)) return ["The ashes are poured out in the clean place.", "The remains of the offering end where God commanded."];
  if (/whole congregation of israel/.test(lower)) return ["The whole congregation means the community as a whole.", "Leviticus makes room for corporate sin, not only private failure."];
  if (/thing be hid/.test(lower)) return ["The thing be hid means the sin was hidden or unnoticed at first.", "Unknown sin still matters when it comes to light."];
  if (/when the sin is known/.test(lower)) return ["When the sin is known means the hidden wrong has become clear.", "Once Israel knows, they must seek atonement instead of ignoring it."];
  if (/elders of the congregation/.test(lower)) return ["The elders represent the congregation before the LORD.", "They act for the people when the whole community has sinned."];
  if (/lay their hands upon the head/.test(lower)) return ["The elders lay their hands on the sacrifice's head.", "The community's guilt is connected to the offering."];
  if (/priest shall make an atonement/.test(lower)) return ["Atonement means the priest deals with sin before God through the appointed sacrifice.", "Forgiveness comes through God's provided way, not human excuses."];
  if (/it shall be forgiven them/.test(lower)) return ["Forgiven them means the congregation receives mercy after atonement.", "God provides a way back when the people have sinned."];
  if (/ruler hath sinned/.test(lower)) return ["A ruler hath sinned means a leader has broken God's command.", "Leadership does not place someone above the need for atonement."];
  if (/through ignorance/.test(lower)) return ["Through ignorance means the sin was unintentional or not fully understood at first.", "Unintentional sin still needs to be brought before God."];
  if (/kid of the goats/.test(lower) && ref === "Leviticus 4:22-26") return ["A kid of the goats is a young goat used for the ruler's sin offering.", "The leader brings the sacrifice God requires."];
  if (/kid of the goats, a female/.test(lower)) return ["A female kid of the goats is one option for a common person's sin offering.", "God gives ordinary people a clear path for forgiveness."];
  if (/blood of the sin offering/.test(lower)) return ["The blood of the sin offering is applied to deal with guilt before God.", "The blood shows that forgiveness is costly and holy."];
  if (/forgiven him/.test(lower)) return ["Forgiven him means the sinner receives mercy after the priest makes atonement.", "The goal of the sacrifice is restored standing before God."];
  if (/common people/.test(lower)) return ["The common people are ordinary Israelites, not priests or rulers.", "Leviticus shows that everyday people also need a way to be forgiven."];
  if (/sin come to his knowledge/.test(lower)) return ["If his sin come to his knowledge means he becomes aware of what he did wrong.", "Once the sin is known, he must not pretend it did not happen."];
  if (/lamb for a sin offering/.test(lower)) return ["A lamb for a sin offering is another allowed sacrifice for an ordinary person.", "God gives a clear way to seek forgiveness."];

  return ["This phrase names a specific step in Israel's offering laws.", "The detail teaches worshipers how to approach the holy LORD with care."];
}

function getDay32ShortSupport(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 1 && /bird|turtledove|pigeon|crop|feathers|cleave|asunder|wring/.test(lower)) return ["\u{1F54A}\u{FE0F} Poorer worshipers can bring birds", "\u{1FA78} Blood is still handled carefully", "\u{1F525} The offering is burned", "\u{1F64C} Small gifts still matter"];
  if (section.chapter === 1) return ["\u{1F525} The whole offering is given", "\u{1FA78} Blood marks atonement", "\u{270B} The worshiper identifies with it", "\u{1F64C} Worship follows God's order"];
  if (section.chapter === 2) return ["\u{1F33E} Grain is brought to God", "\u{1FAD2} Oil and fragrance prepare it", "\u{1F9C2} Salt marks covenant faithfulness", "\u{1F525} A memorial portion is burned"];
  if (section.chapter === 3) return ["\u{1F54A}\u{FE0F} Peace is celebrated before God", "\u{270B} The worshiper identifies with the offering", "\u{1FA78} Blood belongs at the altar", "\u{1F525} The fat belongs to the LORD"];
  if (section.reference === "Leviticus 4:1-6" || section.reference === "Leviticus 4:7-12") return ["\u{1FA78} Sin is brought before God", "\u{1F451} Priestly guilt is serious", "\u{1F4CD} Blood is applied in holy places", "\u{1F3D5}\u{FE0F} Remains go outside the camp"];
  if (section.reference === "Leviticus 4:22-26") return ["\u{1F9D1} Leaders can sin too", "\u{1F648} Ignorant sin still matters", "\u{1FA78} Blood is handled at the altar", "\u{2705} Forgiveness follows atonement"];
  if (section.reference === "Leviticus 4:27-32" || section.reference === "Leviticus 4:33-35") return ["\u{1F9D1} Ordinary people can be forgiven", "\u{1F648} Known sin must be faced", "\u{1FA78} Atonement is provided", "\u{2705} Mercy is received God's way"];
  if (section.chapter === 4 && /priest|anointed|holy place|bullock|finger|seven|horns|camp|ashes|fat|skin/.test(lower)) return ["\u{1FA78} Sin is brought before God", "\u{1F451} Priestly guilt is serious", "\u{1F4CD} Blood is applied in holy places", "\u{1F3D5}\u{FE0F} Remains go outside the camp"];
  if (section.chapter === 4 && /congregation|elders|known|hid|them/.test(lower)) return ["\u{1F465} The whole people can sin", "\u{1F648} Hidden sin can become known", "\u{270B} Elders represent the congregation", "\u{1FA78} Atonement brings forgiveness"];
  if (section.chapter === 4 && /ruler|him|male/.test(lower)) return ["\u{1F9D1} Leaders can sin too", "\u{1F648} Ignorant sin still matters", "\u{1FA78} Blood is handled at the altar", "\u{2705} Forgiveness follows atonement"];
  if (section.chapter === 4) return ["\u{1F9D1} Ordinary people can be forgiven", "\u{1F648} Known sin must be faced", "\u{1FA78} Atonement is provided", "\u{2705} Mercy is received God's way"];

  return ["\u{1F4DC} The law teaches worship", "\u{1F64C} God gives the way near", "\u{1FA78} Sin is treated seriously", "\u{2705} Mercy is possible"];
}

function getDay32ShortClosing(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 1 && /bird|turtledove|pigeon|crop|feathers|cleave|asunder|wring/.test(lower)) return "The bird offering shows that even a smaller sacrifice is holy before the LORD.";
  if (section.chapter === 1) return "The burnt offering teaches surrender through sacrifice brought God's way.";
  if (section.chapter === 2 && /leaven|honey/.test(lower)) return "The grain offering is shaped by God's boundaries, not human preference.";
  if (section.chapter === 2 && /salt|covenant/.test(lower)) return "Salt reminds Israel that worship belongs inside God's covenant.";
  if (section.chapter === 2) return "The grain offering turns daily provision into worship before the LORD.";
  if (section.chapter === 3) return "The peace offering teaches fellowship with God through ordered sacrifice.";
  if (section.chapter === 4 && /congregation|elders|them/.test(lower)) return "The sin offering gives the whole community a way back to mercy.";
  if (section.chapter === 4 && /ruler|him/.test(lower)) return "The ruler's sin offering shows that leaders also need atonement.";
  if (section.chapter === 4) return "The sin offering teaches that guilt must be brought to God for atonement.";

  return "The phrase teaches worship near a holy God without filler.";
}

function cleanRenderedLeviticusOpening(cleanTitle: string, line: string) {
  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleStartPattern = new RegExp(`^${escapedTitle}\\s+(means|shows|gives|helps|explains|teaches|marks|names|is|are|was|were|connects|keeps|points to|prepares|brings|describes|refers to|repeats|continues|introduces)\\s+`, "i");
  const bareTitlePattern = new RegExp(`^${escapedTitle}\\s+`, "i");

  let cleaned = line.trim();
  cleaned = cleaned.replace(titleStartPattern, (_match, verb: string) => {
    const action = verb.toLowerCase();
    if (action === "means") return "";
    if (action === "is") return "This is ";
    if (action === "are") return "These are ";
    if (action === "was") return "This was ";
    if (action === "were") return "These were ";
    return `This ${action} `;
  });

  return cleaned
    .replace(/^In [^,]+,\s*/i, "")
    .replace(/\s+Here it applies to .*$/i, "")
    .replace(bareTitlePattern, "")
    .replace(/^The wording\s+/i, "")
    .replace(/^This\s+means\s+/i, "")
    .replace(/^([a-z])/, (letter) => letter.toUpperCase());
}

function getDay34ShortOpening(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const ref = section.reference;

  if (/on the eighth day/.test(lower)) return ["The eighth day comes after Aaron's seven days of ordination.", "Now the priests begin public service before Israel."];
  if (/moses called aaron/.test(lower)) return ["Moses calls Aaron into his priestly work.", "Aaron does not begin ministry by his own idea or timing."];
  if (/take thee a young calf/.test(lower)) return ["Aaron must take a young calf for his own sin offering.", "The priest needs atonement before he serves for the people."];
  if (/ram for a burnt offering/.test(lower)) return ["A ram for a burnt offering is given wholly to the LORD.", "Aaron's first public service begins with surrender and atonement."];
  if (/speak unto the children of israel/.test(lower)) return ["The children of Israel are told what to bring.", "The whole congregation is included in this worship moment."];
  if (/lord will appear unto you/.test(lower)) return ["The LORD will appear means God will make His presence known.", "The offerings prepare the people to see God's glory."];
  if (/glory of the lord shall appear|glory of the lord appeared/.test(lower)) return ["The glory of the LORD is God's visible holy presence.", "The people are about to see that God receives worship offered His way."];
  if (/before the lord/.test(lower)) return ["Before the LORD means in God's presence.", "The offerings are not private ceremonies; they are brought where God meets His people."];
  if (/offer thy sin offering/.test(lower)) return ["Aaron must offer his own sin offering first.", "The priest cannot help the people draw near while ignoring his own need for atonement."];
  if (/make an atonement for thyself/.test(lower)) return ["Atonement means sin is dealt with before God.", "Aaron needs mercy before he can serve as priest for others."];
  if (/aaron went unto the altar/.test(lower)) return ["Aaron going to the altar shows priestly service beginning.", "The ordination instructions now become public worship."];
  if (/calf of the sin offering/.test(lower)) return ["The calf is Aaron's sacrifice for sin.", "His priestly role begins with blood and atonement, not status."];
  if (/aaron's sons brought the blood/.test(lower)) return ["Aaron's sons bring the blood for the altar ritual.", "The priestly family shares in the holy work."];
  if (/he burnt upon the altar/.test(lower)) return ["Burning on the altar gives the appointed portion to the LORD.", "The sacrifice is completed in the place God commanded."];
  if (/flesh and the hide/.test(lower)) return ["The flesh and the hide are the remaining parts of the sin offering.", "Those parts are handled outside the altar service."];
  if (/burnt with fire/.test(lower)) return ["Burnt with fire means the remains are destroyed as God commanded.", "The sin offering is treated seriously from beginning to end."];
  if (/presented the burnt offering/.test(lower)) return ["The burnt offering is presented after the sin offering.", "Worship moves from atonement into full surrender to the LORD."];
  if (/washed the inwards and the legs/.test(lower)) return ["The inwards are inner parts, and the legs are washed before burning.", "The offering is prepared cleanly before it is placed on the altar."];
  if (/people's offering/.test(lower)) return ["The people's offering is the sacrifice brought for the congregation.", "Aaron now serves not only for himself, but for Israel."];
  if (/beside the burnt sacrifice/.test(lower)) return ["Beside the burnt sacrifice means another offering is added alongside the regular burnt offering.", "Israel's worship includes more than one appointed sacrifice."];
  if (/slew also the bullock/.test(lower)) return ["Slew means killed the bullock for sacrifice.", "The people's offering involves real cost and blood before the LORD."];
  if (/fat of the bullock/.test(lower)) return ["The fat of the bullock is the rich portion given to the LORD.", "The best parts are not kept back for the worshiper."];
  if (/upon the breasts/.test(lower)) return ["Upon the breasts describes how the fat portions are placed with the wave-breast pieces.", "Leviticus names the parts because the offering follows an exact order."];
  if (/he burnt the fat/.test(lower)) return ["Burning the fat gives the rich portion to the LORD.", "The altar receives what God claimed as His."];
  if (/aaron lifted up his hand/.test(lower)) return ["Aaron lifts his hand to bless the people.", "The priestly service ends with blessing, not performance."];
  if (/blessed them/.test(lower)) return ["Aaron blesses the people after offering the sacrifices.", "The goal of the service is Israel standing under God's favor."];
  if (/moses and aaron went into the tabernacle/.test(lower)) return ["Moses and Aaron enter the tabernacle after the offerings.", "The new priestly ministry is connected to God's dwelling."];
  if (/fire came out from before the lord/.test(lower)) return ["Fire from before the LORD shows God accepting the offering.", "The sacrifice is consumed by God's own holy fire."];
  if (/all the people saw/.test(lower)) return ["All the people saw the LORD's response.", "God's acceptance of worship is witnessed by the whole congregation."];
  if (/they shouted/.test(lower)) return ["The people shouted in awe and joy.", "God's visible acceptance turns worship into public praise."];
  if (/fell on their faces/.test(lower)) return ["Falling on their faces means the people bow low in reverence.", "God's glory produces worship, not casual excitement."];
  if (/nadab and abihu/.test(lower)) return ["Nadab and Abihu are Aaron's sons who serve as priests.", "Their story warns that priestly nearness to God is not casual."];
  if (/put fire therein/.test(lower)) return ["They put fire in their censers for incense service.", "The problem is not fire itself, but unauthorized worship."];
  if (/strange fire/.test(lower)) return ["Strange fire means unauthorized fire God had not commanded.", "Holy worship cannot be invented by the priest."];
  if (/commanded them not/.test(lower)) return ["God had not commanded this act of worship.", "In Leviticus, uncommanded priestly worship is treated as dangerous."];
  if (/fire from the lord/.test(lower)) return ["Fire from the LORD brings judgment on Nadab and Abihu.", "The same holy fire that accepted worship also judged false worship."];
  if (/i will be sanctified/.test(lower)) return ["I will be sanctified means God must be treated as holy.", "Priests nearest to Him must honor Him most carefully."];
  if (/aaron held his peace/.test(lower)) return ["Aaron held his peace means he stayed silent after the judgment.", "His grief is real, but he does not argue against God's holiness."];
  if (/uncover not your heads/.test(lower)) return ["Uncover not your heads means the priests must not show mourning in the usual public way.", "Their priestly duty before God cannot be abandoned."];
  if (/wine nor strong drink/.test(lower)) return ["Wine nor strong drink means priests must not drink alcohol before tabernacle service.", "Clear judgment is required for holy work."];
  if (/when ye go into the tabernacle/.test(lower)) return ["When ye go into the tabernacle points to priestly service inside God's dwelling.", "The warning applies especially when priests draw near to serve."];
  if (/between holy and unholy/.test(lower)) return ["Holy and unholy means what belongs to God and what does not.", "Priests must be able to tell the difference."];
  if (/between unclean and clean/.test(lower)) return ["Unclean and clean are categories for what may or may not come near holy things.", "Priests must teach Israel how to live near God."];
  if (/teach the children of israel/.test(lower)) return ["Priests are responsible to teach Israel God's statutes.", "Their work is not only offering sacrifices, but explaining holiness."];
  if (/take the meat offering/.test(lower)) return ["The meat offering is the grain offering portion assigned to the priests.", "After judgment, the remaining holy food still must be handled God's way."];
  if (/eat it in the holy place/.test(lower)) return ["Eating it in the holy place means the priestly portion stays in sacred space.", "Holy food is not treated like an ordinary meal."];
  if (/thy due/.test(lower)) return ["Thy due means the portion rightly assigned to the priests.", "God provides for priestly service without making holy food common."];
  if (/wave breast and heave shoulder/.test(lower)) return ["The wave breast and heave shoulder are priestly portions from the peace offering.", "Certain parts are lifted before God and then given to the priests."];
  if (/moses diligently sought the goat/.test(lower)) return ["Moses diligently sought the goat means he carefully checked the sin offering.", "He wants to know whether the priests handled it correctly."];
  if (/bear the iniquity of the congregation/.test(lower)) return ["To bear the iniquity of the congregation means to carry responsibility in the sin offering ritual.", "The priests serve so the people's guilt can be dealt with before God."];
  if (/blood of it was not brought in/.test(lower)) return ["The blood was not brought into the holy place.", "That detail changes how the sin offering should have been eaten."];
  if (/such things have befallen me/.test(lower)) return ["Such things have befallen me refers to Aaron's terrible loss that day.", "Aaron explains why eating the sin offering did not seem fitting."];
  if (/should it have been accepted/.test(lower)) return ["Aaron asks whether eating the offering would have been accepted before the LORD.", "He is concerned with God's approval, not his own convenience."];
  if (/moses heard that/.test(lower)) return ["Moses listens to Aaron's explanation.", "The dispute is weighed in light of the day's grief and the LORD's holiness."];
  if (/he was content/.test(lower)) return ["Moses being content means he accepts Aaron's answer.", "The chapter ends with sober discernment after judgment and grief."];
  if (/these are the beasts/.test(lower)) return ["These are the beasts introduces the animals Israel may eat.", "Leviticus now teaches daily holiness at the dinner table."];
  if (/parteth the hoof/.test(lower)) return ["Parteth the hoof means the animal has a split hoof.", "This is one mark used to identify clean land animals."];
  if (/cheweth the cud/.test(lower)) return ["Cheweth the cud means the animal rechews its food.", "Clean land animals need both this sign and a divided hoof."];
  if (/the camel/.test(lower)) return ["The camel chews the cud but does not divide the hoof.", "Because it lacks one required sign, Israel must treat it as unclean."];
  if (/the coney/.test(lower)) return ["The coney is a small rock-dwelling animal listed as unclean.", "It does not meet the full clean-animal rule."];
  if (/the hare/.test(lower)) return ["The hare is listed with animals Israel must not eat.", "Its mention teaches that similar-looking creatures still need God's distinction."];
  if (/unclean unto you|they are unclean to you/.test(lower)) return ["Unclean unto you means Israel must not treat it as acceptable food.", "The rule trains God's people to make distinctions."];
  if (/make a difference/.test(lower)) return ["Make a difference means distinguish between what God calls clean and unclean.", "Holiness reaches ordinary choices, including food."];
  if (/the swine/.test(lower)) return ["The swine has a divided hoof but does not chew the cud.", "Because it lacks the second sign, it is unclean for Israel."];
  if (/of their flesh shall ye not eat/.test(lower)) return ["Of their flesh shall ye not eat means Israel must not eat those animals.", "The command is about obedience, not personal taste."];
  if (/fins and scales/.test(lower)) return ["Fins and scales are the signs for clean water creatures.", "Fish without both signs are not food for Israel."];
  if (/whatsoever hath no fins nor scales/.test(lower)) return ["Anything without fins and scales is forbidden from the waters.", "The rule makes clean and unclean visible in seas and rivers."];
  if (/abomination/.test(lower)) return ["Abomination here means something detestable for Israel to eat.", "The word marks strong separation from what God forbids."];
  if (/in the seas/.test(lower)) return ["In the seas means the rule applies to saltwater creatures.", "Clean food laws reach beyond the land into the waters."];
  if (/in the rivers/.test(lower)) return ["In the rivers means the rule also applies to freshwater creatures.", "Israel must distinguish clean and unclean wherever food is found."];
  if (/the eagle/.test(lower)) return ["The eagle is listed among birds Israel must not eat.", "Leviticus names forbidden birds instead of giving a simple bird rule."];
  if (/ossifrage/.test(lower)) return ["The ossifrage is a forbidden bird, likely a bone-breaking bird of prey.", "Its strange name is part of the list Israel must avoid."];
  if (/vulture/.test(lower)) return ["The vulture is a scavenging bird listed as unclean.", "Israel is not to eat birds associated with carrion."];
  if (/every raven/.test(lower)) return ["Every raven means ravens of every kind are unclean.", "The food law includes whole kinds, not only one bird."];
  if (/the owl/.test(lower)) return ["The owl is another bird Israel must avoid.", "The list teaches careful attention to what God calls unclean."];
  if (/fowls that creep/.test(lower)) return ["Fowls that creep refers to winged insects that move on all fours.", "Most of these are forbidden as food."];
  if (/legs above their feet/.test(lower)) return ["Legs above their feet describes insects with jointed legs for leaping.", "That detail explains why some locust-like insects are allowed."];
  if (/locust after his kind/.test(lower)) return ["Locust after his kind means permitted locust varieties.", "Some leaping insects were allowed while other creeping things were not."];
  if (/ye shall be unclean/.test(lower) && ref === "Leviticus 11:24-29") return ["Ye shall be unclean means contact with a carcass makes a person ritually unclean.", "The first warning explains how uncleanness spreads by touch."];
  if (/ye shall be unclean/.test(lower) && ref === "Leviticus 11:30-35") return ["Ye shall be unclean repeats the result when dead creatures touch household items.", "The law moves from people to objects in the camp."];
  if (/ye shall be unclean/.test(lower) && ref === "Leviticus 11:36-41") return ["Ye shall be unclean continues the warning around water, seed, and creeping things.", "Israel must think carefully about uncleanness in daily life."];
  if (/toucheth the carcase/.test(lower) && ref === "Leviticus 11:24-29") return ["A carcase is a dead body.", "Touching a dead unclean creature makes a person unclean."];
  if (/toucheth the carcase/.test(lower) && ref === "Leviticus 11:30-35") return ["Touching the carcase now applies to objects and containers.", "Dead uncleanness can affect what people use, not only their hands."];
  if (/toucheth the carcase/.test(lower) && ref === "Leviticus 11:36-41") return ["The carcase rule continues with food sources and creeping things.", "Death and uncleanness must be handled according to God's boundaries."];
  if (/unclean until the even/.test(lower) && ref === "Leviticus 11:24-29") return ["Until the even means until evening.", "A person waits through the day before the uncleanness ends."];
  if (/unclean until the even/.test(lower) && ref === "Leviticus 11:30-35") return ["Unclean until the even gives a time limit for affected items and people.", "The uncleanness is temporary, but it is not ignored."];
  if (/unclean until the even/.test(lower) && ref === "Leviticus 11:36-41") return ["Until evening marks when the uncleanness period ends.", "God gives both a boundary and a path back to cleanness."];
  if (/every earthen vessel/.test(lower) && ref === "Leviticus 11:24-29") return ["An earthen vessel is a clay container.", "Clay can absorb uncleanness in a way that makes the vessel unusable."];
  if (/every earthen vessel/.test(lower) && ref === "Leviticus 11:30-35") return ["Every earthen vessel means household clay containers are included.", "The clean/unclean law reaches ordinary kitchen life."];
  if (/every earthen vessel/.test(lower) && ref === "Leviticus 11:36-41") return ["Earthen vessels show how uncleanness can affect stored food and daily tools.", "Holiness reaches what Israel uses at home."];
  if (/broken down/.test(lower) && ref === "Leviticus 11:24-29") return ["Broken down means the clay vessel must be destroyed.", "Some contamination is not cleaned by simple washing."];
  if (/broken down/.test(lower) && ref === "Leviticus 11:30-35") return ["Breaking the vessel removes the affected clay item from use.", "The command prevents uncleanness from being treated lightly."];
  if (/broken down/.test(lower) && ref === "Leviticus 11:36-41") return ["Broken down shows that some objects cannot return to common use.", "The camp learns that uncleanness has real consequences."];
  if (/fountain or pit/.test(lower) && ref === "Leviticus 11:24-29") return ["A fountain or pit is a source or storage place for water.", "Water sources are treated with special care because the camp depends on them."];
  if (/fountain or pit/.test(lower) && ref === "Leviticus 11:30-35") return ["The fountain or pit rule protects shared water.", "God's law distinguishes between a polluted item and a needed water source."];
  if (/fountain or pit/.test(lower) && ref === "Leviticus 11:36-41") return ["A fountain or pit remains important because water sustains life in the camp.", "The law guards cleanness without destroying necessary water sources."];
  if (/wash his clothes/.test(lower) && ref === "Leviticus 11:24-29") return ["Washing clothes is part of the cleansing response after contact with uncleanness.", "The person acts visibly instead of pretending nothing happened."];
  if (/wash his clothes/.test(lower) && ref === "Leviticus 11:30-35") return ["Washing clothes shows the person responds to household uncleanness.", "Cleansing involves practical obedience."];
  if (/wash his clothes/.test(lower) && ref === "Leviticus 11:36-41") return ["Washing clothes marks a return from uncleanness toward cleanness.", "The law gives a concrete step after contact with what is unclean."];
  if (/every creeping thing/.test(lower) && ref === "Leviticus 11:24-29") return ["Every creeping thing refers to small creatures that move along the ground.", "The rule warns Israel not to treat all creatures as acceptable food."];
  if (/every creeping thing/.test(lower) && ref === "Leviticus 11:30-35") return ["Every creeping thing includes small ground creatures that can make items unclean.", "The law trains attention to what enters the camp and home."];
  if (/every creeping thing/.test(lower) && ref === "Leviticus 11:36-41") return ["Every creeping thing continues the category of forbidden ground creatures.", "Israel must reject what God names unclean."];
  if (/upon the belly/.test(lower)) return ["Upon the belly describes creatures that crawl on their stomach.", "They belong to the forbidden creeping things."];
  if (/goeth upon all four/.test(lower)) return ["Goeth upon all four means moving on four feet.", "This is another group of creeping things Israel must avoid."];
  if (/make yourselves abominable/.test(lower)) return ["Make yourselves abominable means defile yourselves by eating what God forbids.", "Food choices can train Israel either toward holiness or away from it."];
  if (/sanctify yourselves/.test(lower)) return ["Sanctify yourselves means set yourselves apart as holy.", "Israel's daily life must match the holy God who redeemed them."];
  if (/ye shall be holy/.test(lower)) return ["Ye shall be holy means Israel must belong to God in a distinct way.", "Holiness is not only for priests; it reaches the whole people."];
  if (/for i am holy/.test(lower)) return ["For I am holy gives the reason for Israel's holiness.", "God's own character shapes His people's life."];
  if (/between the unclean and the clean/.test(lower)) return ["Between the unclean and the clean means Israel must learn God's categories.", "The chapter ends by teaching careful distinction."];
  if (/woman have conceived seed/.test(lower)) return ["Conceived seed means a woman has become pregnant.", "Leviticus brings childbirth under God's care and holiness."];
  if (/born a man child/.test(lower)) return ["A man child means a male baby.", "The law describes the mother's purification after giving birth to a son."];
  if (/seven days/.test(lower)) return ["Seven days is the first period of uncleanness after childbirth.", "The law gives a clear time frame for purification."];
  if (/flesh of his foreskin/.test(lower)) return ["The flesh of his foreskin refers to the skin removed in circumcision.", "The male child receives the covenant sign on the eighth day."];
  if (/circumcised/.test(lower)) return ["Circumcised means the covenant sign is cut into the male child's flesh.", "The child is marked as belonging to God's covenant people."];
  if (/blood of her purifying/.test(lower)) return ["The blood of her purifying refers to the mother's purification period after birth.", "The law treats birth and blood with careful holiness."];
  if (/touch no hallowed thing/.test(lower)) return ["Hallowed thing means something holy.", "During purification, the mother does not touch holy things."];
  if (/come into the sanctuary/.test(lower)) return ["Coming into the sanctuary means entering the holy worship space.", "The mother waits until purification is complete."];
  if (/priest shall make an atonement/.test(lower)) return ["The priest makes atonement for the mother after childbirth.", "The offering restores her to regular sanctuary worship."];
  if (/she shall be clean/.test(lower)) return ["She shall be clean means her purification is complete.", "The mother can return to worship without ritual uncleanness."];
  if (/not able to bring a lamb/.test(lower)) return ["If she cannot bring a lamb, God provides a poorer person's option.", "The law makes a way for worshipers with fewer resources."];
  if (/two turtles|young pigeons/.test(lower)) return ["Two turtles means two turtledoves, or two young pigeons.", "Bird offerings allow a poor mother to complete purification."];
  if (/one for the burnt offering/.test(lower)) return ["One bird is for the burnt offering.", "Part of the sacrifice is given wholly to the LORD."];
  if (/one for a sin offering/.test(lower)) return ["One bird is for a sin offering.", "The purification ritual includes atonement before God."];
  if (/law for her that hath born/.test(lower)) return ["This is the law for the woman who has given birth.", "Leviticus gives clear instruction for returning to sanctuary worship."];
  if (/purifying/.test(lower)) return ["Purifying means being made ritually clean again.", "The process ends with sacrifice and restored access to worship."];

  return ["This phrase names a specific part of Israel's holiness laws.", "The detail teaches God's people how to live near Him with care."];
}

function getDay34ShortSupport(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 9 && /glory|fire|saw|shouted|faces|blessed/.test(lower)) return ["\u{26A0}\u{FE0F} God's glory appears", "\u{1F525} Fire comes from the LORD", "\u{1F64C} The people respond in worship", "\u{1F451} Priesthood begins before Israel"];
  if (section.chapter === 9) return ["\u{1F451} Aaron begins priestly service", "\u{1FA78} Atonement comes first", "\u{1F525} Offerings rise to the LORD", "\u{1F64C} God receives ordered worship"];
  if (section.chapter === 10 && /nadab|abihu|strange|commanded|fire from|sanctified|peace|uncover/.test(lower)) return ["\u{26A0}\u{FE0F} False worship is judged", "\u{1F525} Holy fire is dangerous", "\u{1F451} Priests must honor God", "\u{1F9D8} Aaron remains silent"];
  if (section.chapter === 10) return ["\u{1F451} Priests must discern", "\u{1F9FC} Clean and unclean matter", "\u{1F4DC} Israel must be taught", "\u{1F64C} Holy food stays holy"];
  if (section.chapter === 11 && /fins|scales|seas|rivers/.test(lower)) return ["\u{1F30A} Water creatures are tested", "\u{1F41F} Fins and scales matter", "\u{1F6AB} Some food is forbidden", "\u{1F9FC} Israel learns distinction"];
  if (section.chapter === 11 && /eagle|ossifrage|vulture|raven|owl|fowls|locust|legs/.test(lower)) return ["\u{1FAB6} Birds and insects are named", "\u{1F6AB} Forbidden kinds are avoided", "\u{1F997} Some leaping insects are allowed", "\u{1F9FC} Holiness reaches food"];
  if (section.chapter === 11 && /carcase|unclean until|earthen|broken|fountain|wash|creeping/.test(lower)) return ["\u{1F9FC} Uncleanness is taken seriously", "\u{1F4A7} Washing may be required", "\u{23F3} Waiting may be required", "\u{1F3D5}\u{FE0F} The camp is guarded"];
  if (section.chapter === 11) return ["\u{1F37D}\u{FE0F} Food choices are taught", "\u{1F9FC} Clean and unclean are separated", "\u{1F4DC} God's law gives categories", "\u{2728} Israel is called holy"];
  if (section.chapter === 12) return ["\u{1F476} Birth is brought under God's care", "\u{1FA78} Blood and purification matter", "\u{1F54A}\u{FE0F} The poor can still bring an offering", "\u{2705} Worship access is restored"];

  return ["\u{1F4DC} God's law teaches holiness", "\u{1F9FC} Clean and unclean matter", "\u{1F64C} Worship follows God's command", "\u{2705} God provides a way near"];
}

function getDay34ShortClosing(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 9 && /glory|fire|saw|shouted|faces|blessed/.test(lower)) return "The first priestly service ends with God's glory and Israel's worship.";
  if (section.chapter === 9) return "Leviticus 9 shows priestly worship beginning exactly as God commanded.";
  if (section.chapter === 10 && /nadab|abihu|strange|commanded|fire from|sanctified|peace|uncover/.test(lower)) return "Nadab and Abihu show that holy nearness must not become careless worship.";
  if (section.chapter === 10) return "Priests must guard holiness by discerning, teaching, and obeying.";
  if (section.chapter === 11 && /holy|difference|clean|unclean|abominable/.test(lower)) return "The food laws train Israel to live as a holy people.";
  if (section.chapter === 11) return "Clean and unclean laws teach Israel daily distinction before God.";
  if (section.chapter === 12) return "The childbirth law restores the mother to worship through purification and offering.";

  return "The phrase teaches holiness in daily life without filler.";
}

function getDay35Stage(section: PersonalLeviticusPhraseSectionInput) {
  if (section.chapter === 13 && section.startVerse <= 6) return "the first skin inspection";
  if (section.chapter === 13 && section.startVerse <= 12) return "a mark that spreads after inspection";
  if (section.chapter === 13 && section.startVerse <= 18) return "uncleanness affecting the whole person";
  if (section.chapter === 13 && section.startVerse <= 24) return "a boil or burn being examined";
  if (section.chapter === 13 && section.startVerse <= 30) return "a scalp or beard condition";
  if (section.chapter === 13 && section.startVerse <= 36) return "a second scalp inspection";
  if (section.chapter === 13 && section.startVerse <= 42) return "raw flesh and rising skin";
  if (section.chapter === 13 && section.startVerse <= 46) return "public uncleanness outside the camp";
  if (section.chapter === 13 && section.startVerse <= 52) return "the first garment inspection";
  if (section.chapter === 13 && section.startVerse <= 58) return "the follow-up garment inspection";
  if (section.chapter === 13) return "the final garment ruling";
  if (section.chapter === 14 && section.startVerse <= 6) return "the first cleansing ceremony";
  if (section.chapter === 14 && section.startVerse <= 12) return "the return to the camp";
  if (section.chapter === 14 && section.startVerse <= 18) return "washing, shaving, and oil";
  if (section.chapter === 14 && section.startVerse <= 24) return "the restored person's offerings";
  if (section.chapter === 14 && section.startVerse <= 32) return "the poor person's cleansing offering";
  if (section.chapter === 14 && section.startVerse <= 38) return "the first house inspection";
  if (section.chapter === 14 && section.startVerse <= 44) return "the follow-up house inspection";
  if (section.chapter === 14 && section.startVerse <= 50) return "the contaminated house being removed";
  if (section.chapter === 14 && section.startVerse <= 56) return "the house cleansing rite";
  if (section.chapter === 14) return "the final house-cleansing summary";
  if (section.chapter === 15 && section.startVerse <= 6) return "the first discharge rules";
  if (section.chapter === 15 && section.startVerse <= 12) return "contact with the discharge";
  if (section.chapter === 15 && section.startVerse <= 18) return "cleansing after the discharge";
  if (section.chapter === 15 && section.startVerse <= 24) return "a woman's regular flow";
  if (section.chapter === 15 && section.startVerse <= 30) return "an extended flow and offering";
  if (section.chapter === 15) return "the summary of bodily uncleanness";
  if (section.chapter === 16 && section.startVerse <= 10) return "the Day of Atonement entrance";
  if (section.chapter === 16 && section.startVerse <= 16) return "blood and incense before the mercy seat";
  if (section.chapter === 16 && section.startVerse <= 22) return "confession over the scapegoat";
  if (section.chapter === 16 && section.startVerse <= 28) return "removal outside the camp";
  return "the yearly Day of Atonement";
}

function getDay35ShortOpening(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const stage = getDay35Stage(section);

  if (/plague of leprosy/.test(lower)) return [`Leprosy in Leviticus means a serious visible disease or contamination being examined during ${stage}.`, "It is broader than the modern disease usually called leprosy."];
  if (/priest shall look/.test(lower)) return [`The priest must inspect carefully during ${stage}.`, "Clean and unclean are not guessed by fear or rumor."];
  if (/hair in the plague is turned white/.test(lower)) return [`White hair is one visible sign the priest checks during ${stage}.`, "The law uses observable evidence before making a judgment."];
  if (/deeper than the skin/.test(lower)) return [`Deeper than the skin means the mark appears more than surface-level during ${stage}.`, "That depth helps the priest decide whether the condition is unclean."];
  if (/shut up him/.test(lower)) return [`Shut up means isolate the person for seven days during ${stage}.`, "Waiting lets the priest see whether the condition spreads or fades."];
  if (/pronounce him clean/.test(lower)) return [`Pronounce him clean means the priest declares the person free from that uncleanness in ${stage}.`, "The person can return from suspicion instead of remaining cut off."];
  if (/pronounce him unclean/.test(lower)) return [`Pronounce him unclean means the priest declares the condition truly unclean in ${stage}.`, "That declaration protects the camp and the sanctuary."];
  if (/carry forth without the camp/.test(lower)) return [`Carrying forth without the camp means taking remains or guilt-bearing signs away during ${stage}.`, "What is tied to sin is removed from the holy camp."];
  if (/dwell alone/.test(lower)) return [`Dwelling alone means the unclean person lives separated from normal camp life during ${stage}.`, "The separation is painful, but it guards the holy camp."];
  if (/without the camp/.test(lower)) return [`Without the camp means outside Israel's camp during ${stage}.`, "Uncleanness is kept away from the place where God dwells among His people."];
  if (/clothes shall be rent/.test(lower)) return [`Rent clothes means torn clothing during ${stage}.`, "It publicly marks grief and uncleanness instead of hiding the condition."];
  if (/yellow thin hair/.test(lower)) return [`Yellow thin hair is a warning sign in ${stage}.`, "The priest uses the visible sign to judge the condition carefully."];
  if (/white rising/.test(lower)) return [`A white rising is a raised pale mark on the skin during ${stage}.`, "The priest examines whether it is harmless or unclean."];
  if (/raw flesh/.test(lower)) return [`Raw flesh is exposed living flesh in ${stage}.`, "That sign shows the condition is serious and unclean."];
  if (/fretting leprosy/.test(lower)) return ["Fretting leprosy means a spreading contamination in cloth or leather.", "Leviticus treats garments as able to carry uncleanness too."];
  if (/burn that garment/.test(lower)) return ["Burning the garment destroys clothing that remains contaminated.", "Some uncleanness is removed by destruction, not repair."];
  if (/shall be washed/.test(lower)) return [`Washing is part of testing or cleansing during ${stage}.`, "The item or person is not declared clean without a commanded response."];
  if (/plague hath not changed/.test(lower)) return [`The plague not changing means the mark has stayed after inspection in ${stage}.`, "The priest uses time and evidence before deciding what to do."];
  if (/rent it out of the garment/.test(lower)) return [`Rent it out means tear out the contaminated part during ${stage}.`, "The law removes the affected part instead of ignoring it."];
  if (/washed the second time/.test(lower)) return [`Washed the second time means the garment is washed again during ${stage}.`, "Cleansing may require repeated action before restoration."];
  if (/garment also/.test(lower)) return ["The garment also is included in the clean-or-unclean ruling.", "Holiness reaches what people wear, not only their skin."];
  if (/woollen garment/.test(lower)) return ["A woollen garment is clothing made from wool.", "Even ordinary material can come under examination for uncleanness."];
  if (/day of his cleansing/.test(lower)) return [`The day of his cleansing begins restoration during ${stage}.`, "Cleansing is public, ordered, and priest-led."];
  if (/priest shall go forth out of the camp/.test(lower)) return [`The priest goes outside the camp during ${stage}.`, "Restoration begins before the person comes back into normal life."];
  if (/two birds alive and clean/.test(lower)) return [`Two living clean birds are used during ${stage}.`, "The rite pictures cleansing and restored life."];
  if (/cedar wood/.test(lower)) return [`Cedar wood is one visible item used in ${stage}.`, "The ritual uses concrete materials to mark restoration."];
  if (/scarlet/.test(lower)) return [`Scarlet is red thread or material used in ${stage}.`, "Its color stands out in the rite of cleansing."];
  if (/hyssop/.test(lower)) return [`Hyssop is a small plant used for sprinkling during ${stage}.`, "It helps apply the cleansing sign visibly."];
  if (/running water/.test(lower)) return [`Running water means fresh living water used in ${stage}.`, "The cleansing ritual uses water associated with life and purity."];
  if (/log of oil/.test(lower)) return [`A log of oil is a measured amount of oil in ${stage}.`, "The oil is applied as part of the restored person's consecration."];
  if (/tip of the right ear/.test(lower)) return ["The right ear is touched with blood and oil in the cleansing rite.", "The restored person is marked for hearing and living before God."];
  if (/if he be poor/.test(lower)) return ["If he be poor means God provides a less costly offering option.", "Restoration is not blocked from someone with fewer resources."];
  if (/wash his clothes/.test(lower)) return [`Washing clothes is a required cleansing action in ${stage}.`, "The person responds to uncleanness with visible obedience."];
  if (/shave off all his hair/.test(lower)) return ["Shaving off all his hair is part of the restored person's cleansing.", "The whole body is treated as returning from uncleanness."];
  if (/he shall be clean/.test(lower)) return [`He shall be clean means the cleansing process reaches restoration in ${stage}.`, "The goal is return, not permanent exclusion."];
  if (/living bird/.test(lower)) return ["The living bird is released after the other bird is sacrificed.", "The release pictures life after cleansing."];
  if (/open field/.test(lower)) return ["The open field is where the living bird is released.", "The restored person's cleansing points outward toward freedom and return."];
  if (/scrape the house/.test(lower)) return [`Scraping the house removes affected material during ${stage}.`, "A contaminated home must be dealt with, not decorated over."];
  if (/break down the house/.test(lower)) return [`Breaking down the house means destroying it if contamination persists in ${stage}.`, "Some uncleanness cannot remain in Israel's dwellings."];
  if (/cleanse the house/.test(lower)) return [`Cleansing the house means restoring the home during ${stage}.`, "Even a dwelling can be brought back into clean use."];
  if (/running issue/.test(lower)) return ["A running issue is an abnormal bodily discharge.", "Leviticus treats bodily uncleanness honestly and carefully."];
  if (/bed whereon he lieth/.test(lower)) return ["The bed where he lies becomes unclean through contact.", "Uncleanness affects the places connected to the body."];
  if (/bathe himself in water/.test(lower)) return [`Bathing in water is part of cleansing during ${stage}.`, "The body is washed before the uncleanness is considered ended."];
  if (/unclean until the even/.test(lower)) return [`Until the even means until evening during ${stage}.`, "The uncleanness is temporary, but it must be respected."];
  if (/the saddle/.test(lower)) return [`The saddle is something the unclean person sits on or rides during ${stage}.`, "Contact with bodily uncleanness affects ordinary objects."];
  if (/earthen vessel/.test(lower)) return [`An earthen vessel is a clay container mentioned in ${stage}.`, "Clay vessels can be affected by uncleanness in a serious way."];
  if (/issue is cleansed/.test(lower)) return ["When the issue is cleansed means the discharge has stopped and cleansing can begin.", "Restoration starts after the condition ends."];
  if (/two turtledoves|two turtles|two young pigeons/.test(lower)) return [`Turtledoves and young pigeons are bird offerings for cleansing in ${stage}.`, "God provides a sacrifice that ordinary people can bring."];
  if (/woman also/.test(lower)) return [`The woman also introduces female bodily uncleanness in ${stage}.`, "Leviticus speaks about female bodily uncleanness directly."];
  if (/issue in her flesh be blood/.test(lower)) return ["Issue in her flesh be blood means a flow of blood from her body.", "The law names the condition plainly without treating the person as worthless."];
  if (/seven days/.test(lower)) return ["Seven days gives the period of uncleanness for her regular flow.", "The time limit gives order to the cleansing process."];
  if (/thing that she lieth upon/.test(lower)) return [`Anything she lies on becomes unclean during ${stage}.`, "Contact rules show how uncleanness spreads through daily life."];
  if (/many days out of the time/.test(lower)) return ["Many days out of the time describes a flow lasting beyond the normal period.", "An ongoing condition requires a different cleansing process."];
  if (/priest shall make an atonement/.test(lower)) return [`The priest makes atonement after cleansing in ${stage}.`, "Restored worship comes through God's appointed sacrifice."];
  if (/separate the children of israel/.test(lower)) return ["Separating Israel from uncleanness means teaching them to guard the holy camp.", "The goal is life near God's dwelling, not shame for its own sake."];
  if (/after the death/.test(lower)) return ["After the death of Aaron's two sons recalls Nadab and Abihu's judgment.", "The Day of Atonement instructions begin with a warning about holy nearness."];
  if (/come not at all times/.test(lower)) return ["Aaron may not enter the Most Holy Place whenever he wants.", "Access to God's presence is holy and limited."];
  if (/within the vail|within the veil/.test(lower)) return ["Within the vail means behind the curtain into the Most Holy Place.", "That space is approached only in the way God commands."];
  if (/before the mercy seat/.test(lower)) return ["The mercy seat is the cover of the ark.", "Atonement is made before the place tied to God's holy presence and mercy."];
  if (/die not/.test(lower)) return ["That he die not means the warning is life-and-death serious.", "Holy presence cannot be entered casually."];
  if (/young bullock/.test(lower)) return ["The young bullock is Aaron's sin offering for himself.", "The high priest needs atonement before acting for the people."];
  if (/two kids of the goats/.test(lower)) return ["Two kids of the goats are chosen for the people's sin offering.", "One is for the LORD, and one becomes the scapegoat."];
  if (/one lot for the lord/.test(lower)) return ["One lot for the LORD chooses the goat sacrificed as the sin offering.", "The choice is placed under God's direction."];
  if (/other lot for the scapegoat/.test(lower)) return ["The scapegoat is the goat sent away carrying Israel's sins.", "The ritual pictures guilt removed from the camp."];
  if (/uncleanness of the children of israel/.test(lower)) return [`The uncleanness of the children of Israel means the people's sins and impurities during ${stage}.`, "The sanctuary itself must be cleansed because God dwells among them."];
  if (/no man in the tabernacle/.test(lower)) return ["No man in the tabernacle means the high priest enters alone for this atonement work.", "No one else shares that holy moment."];
  if (/lay both his hands/.test(lower)) return ["Laying both hands on the goat marks transfer of guilt in the ritual.", "Israel's sins are confessed over the animal."];
  if (/confess over him all the iniquities/.test(lower)) return [`Confessing all the iniquities means naming Israel's sins over the goat during ${stage}.`, "Sin is not hidden; it is placed before God honestly."];
  if (/bear upon him all their iniquities/.test(lower)) return ["The goat bearing iniquities pictures Israel's sins being carried away.", "The ritual shows removal, not denial."];
  if (/land not inhabited/.test(lower)) return ["A land not inhabited means a deserted place away from the camp.", "The scapegoat carries sin far from God's people."];
  if (/cloud of incense/.test(lower)) return ["The cloud of incense covers the mercy seat before the LORD.", "Incense shields the high priest as he enters the holy place."];
  if (/sprinkle it upon the mercy seat/.test(lower)) return ["Sprinkling blood on the mercy seat applies atonement at the ark cover.", "Blood is brought to the place of mercy before God's presence."];
  if (/afflict your souls/.test(lower)) return ["Afflict your souls means humble yourselves before God.", "The Day of Atonement is marked by repentance, not celebration only."];
  if (/statute for ever/.test(lower)) return ["A statute for ever is an ongoing command for Israel.", "The Day of Atonement is not a one-time event."];
  if (/clean from all your sins/.test(lower)) return ["Clean from all your sins means the day points to full cleansing before the LORD.", "The goal is not ritual motion but forgiven uncleanness."];
  if (/sabbath of rest/.test(lower)) return ["A Sabbath of rest means a solemn day of stopping.", "Israel rests while atonement is made before God."];
  if (/priest whom he shall anoint/.test(lower)) return ["The anointed priest is the priest set apart to continue the atonement work.", "The yearly rite continues through the priest God appoints."];
  if (/atonement for the holy sanctuary/.test(lower)) return ["Atonement for the holy sanctuary means cleansing the sacred place itself.", "Israel's uncleanness affects the dwelling where God lives among them."];
  if (/once in a year/.test(lower)) return ["Once in a year means the Day of Atonement happens annually.", "Israel regularly returns to God's provision for cleansing."];

  return [`This phrase belongs to ${stage}.`, "It teaches how uncleanness, cleansing, and atonement are handled before the holy LORD."];
}

function getDay35ShortSupport(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 13 && /garment|woollen|washed|burn|rent it|changed|fretting/.test(lower)) return ["\u{1F455} Garments can be examined", "\u{1F9FC} Uncleanness is not ignored", "\u{1F525} Persistent contamination is destroyed", "\u{2705} Cleansing can restore use"];
  if (section.chapter === 13) return ["\u{1F9FC} Uncleanness is examined carefully", "\u{23F3} Waiting may be required", "\u{1F3D5}\u{FE0F} The camp is guarded", "\u{2705} Restoration remains possible"];
  if (section.chapter === 14 && /house|scrape|break down|cleanse the house/.test(lower)) return ["\u{1F3E0} Houses can be examined", "\u{1F9FC} Contamination must be removed", "\u{1F525} Persistent uncleanness is serious", "\u{2705} A home can be restored"];
  if (section.chapter === 14) return ["\u{1F54A}\u{FE0F} Cleansing brings return", "\u{1F4A7} Water and washing matter", "\u{1F331} Visible signs mark restoration", "\u{2705} The person can be clean"];
  if (section.chapter === 15) return ["\u{1F4A7} Bodily uncleanness is named", "\u{1F9FC} Washing matters", "\u{23F3} Waiting may be required", "\u{2705} Atonement restores worship"];
  if (section.chapter === 16 && /scapegoat|confess|iniquities|land not inhabited|lot/.test(lower)) return ["\u{1F410} The scapegoat carries sin away", "\u{1F5E3}\u{FE0F} Sins are confessed", "\u{1F3D5}\u{FE0F} Guilt leaves the camp", "\u{1FA78} Atonement brings cleansing"];
  if (section.chapter === 16) return ["\u{1FA78} Atonement is made", "\u{26FA} The holy place is guarded", "\u{1F32B}\u{FE0F} Incense covers the mercy seat", "\u{2705} Israel is cleansed"];

  return ["\u{1F9FC} Uncleanness is handled carefully", "\u{1F4DC} God's law gives order", "\u{1FA78} Atonement is provided", "\u{2705} Restoration is possible"];
}

function getDay35ShortClosing(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter === 13 && /garment|woollen|washed|burn|rent it|changed|fretting/.test(lower)) return "The garment laws show that uncleanness must be examined and removed.";
  if (section.chapter === 13) return "The skin examination laws protect the camp while leaving room for restoration.";
  if (section.chapter === 14 && /house|scrape|break down|cleanse the house/.test(lower)) return "The house laws teach that even a home must be brought under God's holiness.";
  if (section.chapter === 14) return "The cleansing ritual shows return from uncleanness into restored worship.";
  if (section.chapter === 15) return "The discharge laws teach Israel to handle bodily uncleanness with honesty and order.";
  if (section.chapter === 16 && /scapegoat|confess|iniquities|land not inhabited/.test(lower)) return "The scapegoat pictures sin being confessed and carried away.";
  if (section.chapter === 16) return "The Day of Atonement gathers Israel's uncleanness before God's mercy.";

  return "The phrase teaches cleansing and atonement without filler.";
}

function formatDay32To35MeaningFirstLines(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string, lines: string[]) {
  if (section.chapter < 1 || section.chapter > 16) return lines;

  if (section.chapter >= 1 && section.chapter <= 4) {
    const opening = getDay32ShortOpening(section, cleanTitle);
    return [
      cleanRenderedLeviticusOpening(cleanTitle, opening[0]),
      opening[1],
      ...getDay32ShortSupport(section, cleanTitle),
      getDay32ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  if (section.chapter >= 9 && section.chapter <= 12) {
    const opening = getDay34ShortOpening(section, cleanTitle);
    return [
      cleanRenderedLeviticusOpening(cleanTitle, opening[0]),
      opening[1],
      ...getDay34ShortSupport(section, cleanTitle),
      getDay34ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  if (section.chapter >= 13 && section.chapter <= 16) {
    const opening = getDay35ShortOpening(section, cleanTitle);
    return [
      cleanRenderedLeviticusOpening(cleanTitle, opening[0]),
      opening[1],
      ...getDay35ShortSupport(section, cleanTitle),
      getDay35ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  return explainLeviticusPhraseAt95(section, cleanTitle);

  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleStartPattern = new RegExp(`^${escapedTitle}\\s+(means|shows|gives|helps|explains|teaches|marks|names|is|are|was|were|connects|keeps|points to|prepares|brings|describes)\\s+`, "i");
  const isEmojiLine = (line: string) => /^[^A-Za-z0-9'"(]/.test(line.trim());
  const focus = getLeviticusSectionFocus(section);
  const cleanLine = (line: string) => {
    let cleaned = line.trim();
    cleaned = cleaned.replace(titleStartPattern, (_match, verb: string) => {
      const action = verb.toLowerCase();
      if (action === "means") return "";
      if (action === "is") return "This is ";
      if (action === "are") return "These are ";
      if (action === "was") return "This was ";
      if (action === "were") return "These were ";
      return `This ${action} `;
    });
    cleaned = cleaned
      .replace(new RegExp(`\\bThrough ${escapedTitle},\\s*`, "gi"), "")
      .replace(new RegExp(`\\bIn ${escapedTitle},\\s*`, "gi"), "Here, ")
      .replace(new RegExp(`\\b${escapedTitle}\\b`, "gi"), "This detail")
      .replace(/\bThis phrase matters because\b/gi, "This means")
      .replace(/\bThe phrase matters because\b/gi, "This means")
      .replace(/\bThis phrase\b/gi, "This")
      .replace(/\bThe phrase\b/gi, "This")
      .replace(/\bThe wording helps(?: a beginner| beginners| the reader| readers)?(?: see| follow| understand)? that\s*/gi, "This means ")
      .replace(/\bThe wording helps(?: a beginner| beginners| the reader| readers)?(?: see| follow| understand)?\s*/gi, "This shows ")
      .replace(/\bThe wording of\b/gi, "The meaning of")
      .replace(/\bThe wording\b/gi, "This")
      .replace(/\bhelps the reader\b/gi, "shows")
      .replace(/\bhelps readers\b/gi, "shows")
      .replace(/\bkeeps the reader close to\b/gi, "stays with")
      .replace(/\bthe reader\b/gi, "a beginner")
      .replace(/\breaders\b/gi, "beginners")
      .replace(/\bA beginner should not read this as\b/gi, "This is not")
      .replace(/\bA beginner should see that\b/gi, "Notice that")
      .replace(/\bA beginner should\b/gi, "Notice")
      .replace(/\bNotice that renewed worship\b/gi, "Renewed worship")
      .replace(/\bThis shows explain\b/gi, "This explains")
      .replace(/\bThis helps explain\b/gi, "This explains")
      .replace(/\bThe meaning of This detail\b/gi, "This detail")
      .replace(/\bThis keeps the instruction clear instead of vague\b/gi, "This keeps the instruction clear.")
      .replace(/\bThis keeps the instruction clear\.\./gi, "This keeps the instruction clear.");
    return cleaned.replace(/^([a-z])/, (letter) => letter.toUpperCase());
  };

  const cleaned = lines.map(cleanLine).filter(Boolean);
  const proseLines = cleaned.filter((line) => !isEmojiLine(line) && !/^\?+$/.test(line));
  const emojiLines = cleaned.filter(isEmojiLine).filter((line) => !line.includes(cleanTitle));
  const lower = cleanTitle.toLowerCase();
  const bullets = emojiLines.length >= 3 ? emojiLines.slice(0, 4) :
    /blood|atonement|sprinkle|altar|sin|trespass|forgiven|guilt/.test(lower)
      ? ["🩸 Sin is dealt with before God", "🙏 Mercy comes through God's appointed way", "✅ Forgiveness is received, not invented"]
      : /priest|aaron|sons|anoint|garments|consecrate|wash/.test(lower)
        ? ["👑 Priests are set apart for service", "💧 Cleansing comes before nearness", "🙌 Holy work follows God's command"]
        : /clean|unclean|leprosy|plague|issue|wash|bathe|camp/.test(lower)
          ? ["🧼 Uncleanness is named honestly", "⏳ Cleansing may require waiting", "🏕️ The camp is guarded around God's presence"]
          : /offering|sacrifice|burnt|meat|peace|flour|oil|frankincense|salt|fat/.test(lower)
            ? ["🔥 The offering is brought to the LORD", "🙌 Worship follows God's pattern", "🕊️ Nearness requires holy surrender"]
            : ["📜 The law teaches life near God", "🙌 Holiness reaches real details", "🧠 The meaning belongs inside " + focus];
  const opening = proseLines.slice(0, Math.min(3, proseLines.length));
  const closing = proseLines.slice(opening.length).filter((line) => !/exact Bible wording|read slowly|empty detail|key details/i.test(line));

  return [...opening, ...bullets, ...closing].slice(0, 8);
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

        while (kept.length < 6) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `It names a real detail God included in this part of the law.`,
            `That detail should be read slowly instead of skipped.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        const firstKey = normalizeLine(kept[0] ?? "");
        if ((counts.get(firstKey) ?? 0) >= 3) {
          kept[0] = getLeviticusContextualOpening(section, cleanTitle);
        }

        const seenInCard = new Set<string>();
        const focus = getLeviticusSectionFocus(section);
        const refined = kept.map((line, index) => {
          const key = normalizeLine(line);
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          const isRepeated = (counts.get(key) ?? 0) >= 8 || seenInCard.has(key);
          seenInCard.add(key);

          if (index === 0 || isEmojiLine || !isRepeated) return line;

          if (line.includes(cleanTitle)) {
            return `${cleanTitle} carries its meaning inside ${focus}, not as an empty detail.`;
          }

          return `Inside ${focus}, this detail helps Israel treat holiness with care.`;
        });

        return [ensureLeviticusTitleEmoji(title), note(formatDay32To35MeaningFirstLines(section, cleanTitle, refined))] as [string, string];
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
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS, [1, 2, 3, 4], "\u{1F525}").map(deepenLeviticusPhraseCards),
    ...makeLeviticusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS, [5, 6, 7, 8], "\u{1FA78}").map(deepenLeviticusPhraseCards),
  ]);
