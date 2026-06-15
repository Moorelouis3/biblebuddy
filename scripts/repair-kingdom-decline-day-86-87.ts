import { writeFileSync } from "fs";
import type { PersonalLeviticusPhraseSectionInput } from "../lib/leviticusOneToTenPersonalNotes";
import {
  FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS,
  FIRST_KINGS_16_22_PERSONAL_SECTIONS,
  SECOND_KINGS_1_25_PERSONAL_SECTIONS,
} from "../lib/kingdomDeclinePersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Kings" | "2 Kings" | "1 Chronicles" };

const emojiPattern = /^\p{Extended_Pictographic}(?:\uFE0F)?\s+/u;
const icons = ["✨", "📜", "🗡️", "🛡️", "👑", "🏠", "🙏", "💛", "⚠️", "🏙️", "🔑", "😢", "🔥", "🧠", "📦", "🕍", "💧", "⛰️"];

function stripIcon(value: string) {
  return value.replace(emojiPattern, "").replace(/\s+\d+$/g, "").trim();
}

function titleCase(value: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return value
    .replace(/[.,;:!?]+$/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (word === "LORD") return "LORD";
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function phraseKey(value: string) {
  return stripIcon(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isWeakPhrase(title: string) {
  const clean = stripIcon(title);
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 3) return true;
  if (/^(of|to|and|or|but|that|which|who|for|with)\b/i.test(clean)) return true;
  if (/^(came to|sixth year of|three years without war between)\b/i.test(clean)) return true;
  if (/\b(and|of|to|with|that|which|who|for|the|between)$/i.test(clean)) return true;
  return false;
}

function iconFor(title: string, fallback: string) {
  const t = title.toLowerCase();
  if (t.includes("lord") || t.includes("god") || t.includes("prophet")) return "🙏";
  if (t.includes("king") || t.includes("reign") || t.includes("kingdom") || t.includes("throne")) return "👑";
  if (t.includes("war") || t.includes("battle") || t.includes("sword") || t.includes("smote") || t.includes("host")) return "🗡️";
  if (t.includes("sin") || t.includes("evil") || t.includes("wicked") || t.includes("idol") || t.includes("baal")) return "⚠️";
  if (t.includes("house") || t.includes("vineyard") || t.includes("field")) return "🏠";
  if (t.includes("fire") || t.includes("heaven")) return "🔥";
  if (t.includes("heart") || t.includes("humbled") || t.includes("heavy")) return "💛";
  if (t.includes("died") || t.includes("death") || t.includes("slain") || t.includes("sick") || t.includes("fell")) return "😢";
  return fallback;
}

function explain(title: string) {
  const t = title.toLowerCase();
  if (t.includes("lord") || t.includes("god")) {
    return [
      `${title} keeps the reader focused on the LORD Himself.`,
      "This phrase is not mainly about human power, royal plans, or political pressure.",
      "",
      "🙏 God's authority",
      "📜 God's word",
      "🔑 God's purpose",
      "",
      "The phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story.",
    ].join("\n\n");
  }
  if (t.includes("prophet") || t.includes("word") || t.includes("saith")) {
    return [
      `${title} points to a message that comes with authority.`,
      "A prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.",
      "",
      "📜 God's message",
      "🙏 A messenger sent",
      "⚠️ A warning to hear",
      "",
      "The phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him.",
    ].join("\n\n");
  }
  if (t.includes("sin") || t.includes("evil") || t.includes("wicked") || t.includes("abominably") || t.includes("idol") || t.includes("baal")) {
    return [
      `${title} names rebellion clearly.`,
      "The Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.",
      "",
      "⚠️ Sin named",
      "💛 A heart turned away",
      "🙏 God sees it",
      "",
      "The phrase helps the reader see why judgment comes and why false worship damages the whole nation.",
    ].join("\n\n");
  }
  if (t.includes("king") || t.includes("reign") || t.includes("kingdom") || t.includes("throne") || t.includes("govern")) {
    return [
      `${title} is kingdom language.`,
      "It is about authority, leadership, and the way power is being used among God's people.",
      "",
      "👑 Authority",
      "🏠 A royal house",
      "⚠️ Leadership under God",
      "",
      "The phrase helps the reader ask whether the king is leading faithfully or using power for himself.",
    ].join("\n\n");
  }
  if (t.includes("war") || t.includes("battle") || t.includes("sword") || t.includes("smote") || t.includes("host")) {
    return [
      `${title} brings conflict into view.`,
      "This is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.",
      "",
      "🗡️ Conflict",
      "🛡️ Danger",
      "⚠️ Real consequences",
      "",
      "The phrase helps the reader feel that sin and power struggles spill into real lives.",
    ].join("\n\n");
  }
  if (t.includes("house")) {
    return [
      `${title} can mean more than a building.`,
      "In Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.",
      "",
      "🏠 Family line",
      "👑 Royal future",
      "📜 Consequences carried forward",
      "",
      "The phrase helps the reader see that leadership choices can affect an entire household after the leader is gone.",
    ].join("\n\n");
  }
  if (t.includes("vineyard") || t.includes("field") || t.includes("inheritance")) {
    return [
      `${title} points to land that mattered deeply in Israel.`,
      "A vineyard was not just property to trade. It could be family inheritance connected to identity, provision, and covenant life.",
      "",
      "🏠 Family inheritance",
      "💧 Daily provision",
      "⚠️ Power tested by desire",
      "",
      "The phrase helps the reader understand why taking Naboth's vineyard is more than a business deal. It is injustice.",
    ].join("\n\n");
  }
  if (t.includes("fire") || t.includes("heaven")) {
    return [
      `${title} shows God's power breaking into the scene.`,
      "Fire from heaven is not normal human strength. It shows that the LORD is answering, judging, or defending His word.",
      "",
      "🔥 Power from God",
      "🙏 Holy authority",
      "⚠️ Judgment is serious",
      "",
      "The phrase helps the reader see that Elijah's message is backed by the God who rules heaven and earth.",
    ].join("\n\n");
  }
  if (t.includes("said") || t.includes("spake") || t.includes("answered")) {
    return [
      `${title} marks spoken words entering the scene.`,
      "In Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.",
      "",
      "📜 Words spoken",
      "💛 Motives revealed",
      "🔑 The scene turns",
      "",
      "The phrase teaches the reader to listen carefully when pressure makes people speak.",
    ].join("\n\n");
  }
  if (t.includes("came to pass") || t.includes("after") || t.includes("third year") || t.includes("seventh time")) {
    return [
      `${title} is timing language.`,
      "It tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.",
      "",
      "🔑 A new moment",
      "📜 Story movement",
      "⚠️ Consequences unfolding",
      "",
      "The phrase reminds the reader that the Bible often teaches through sequence, not only through speeches.",
    ].join("\n\n");
  }
  if (t.includes("heart") || t.includes("humbled") || t.includes("heavy") || t.includes("displeased")) {
    return [
      `${title} points to what is happening inside a person.`,
      "The Bible is showing more than outward action. It is showing desire, sorrow, fear, pride, or repentance.",
      "",
      "💛 Inner life",
      "🔑 Direction of the heart",
      "⚠️ Choices taking shape",
      "",
      "The phrase helps the reader watch the heart before the next action appears.",
    ].join("\n\n");
  }
  if (t.includes("died") || t.includes("death") || t.includes("slain") || t.includes("sick") || t.includes("fell") || t.includes("mourn")) {
    return [
      `${title} is grief or consequence language.`,
      "The passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.",
      "",
      "😢 Loss",
      "⚠️ Consequence",
      "📜 Sorrow named honestly",
      "",
      "The phrase helps the reader feel the seriousness of what has happened in the story.",
    ].join("\n\n");
  }
  return [
    `${title} gives the reader a concrete detail to watch.`,
    "The phrase tells what is happening in the passage so the story does not become vague or rushed.",
    "",
    "📖 Exact wording",
    "🔑 Story movement",
    "✨ Detail with meaning",
    "",
    "The phrase helps the reader slow down and understand the passage through the Bible's own words.",
  ].join("\n\n");
}

function repairSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const usedIcons = new Set<string>();
  const usedTitles = new Set<string>();
  const repairedPhrases = section.phrases.map((phrase, index) => {
    const rawTitle = stripIcon(phrase[0]);
    const preferredTitle = titleCase(isWeakPhrase(rawTitle) ? section.title : rawTitle);
    const fallbackTitle = titleCase(rawTitle);
    const preferredKey = phraseKey(preferredTitle);
    const fallbackKey = phraseKey(fallbackTitle);
    const finalTitle = usedTitles.has(preferredKey) && !usedTitles.has(fallbackKey) ? fallbackTitle : preferredTitle;
    usedTitles.add(phraseKey(finalTitle));
    let icon = iconFor(finalTitle, icons[index % icons.length]);
    if (usedIcons.has(icon)) icon = icons.find((candidate) => !usedIcons.has(candidate)) || icon;
    usedIcons.add(icon);
    return [`${icon} ${finalTitle}`, explain(finalTitle)] as [string, string];
  });

  return {
    ...section,
    icon: icons[(section.chapter + section.startVerse) % icons.length],
    phrases: repairedPhrases,
  };
}

const sections = [
  ...FIRST_KINGS_16_22_PERSONAL_SECTIONS.map(repairSection),
  ...SECOND_KINGS_1_25_PERSONAL_SECTIONS.map((section) => (section.chapter <= 21 ? repairSection(section) : section)),
  ...FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS,
] as const satisfies readonly KingdomDeclinePhraseSectionInput[];

const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Kings" | "2 Kings" | "1 Chronicles" };

const sections = ${JSON.stringify(sections, null, 2).replace(/"([^"]+)":/g, "$1:")} as const satisfies readonly KingdomDeclinePhraseSectionInput[];

export const FIRST_KINGS_16_22_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Kings");
export const SECOND_KINGS_1_25_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Kings");
export const FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Chronicles");
`;

writeFileSync("lib/kingdomDeclinePersonalNotes.ts", file);
