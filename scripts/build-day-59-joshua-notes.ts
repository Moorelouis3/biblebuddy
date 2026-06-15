import { writeFileSync } from "fs";

type ApiVerse = { chapter: number; verse: number; text: string };

type Section = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const icons = ["👑", "⚔️", "🗺️", "🏞️", "📜", "🏠", "⛰️", "🙏", "👥", "🌾", "🛡️", "❤️"];

const stopWords = new Set(["and", "the", "that", "with", "from", "unto", "upon", "into", "they", "them", "their", "there", "were", "shall", "said", "came", "went", "when", "then", "this", "have", "also", "before", "after", "which"]);

const priority = [
  "kings", "land", "smote", "possessed", "jordan", "sihon", "og", "moses", "servant", "lord", "possession",
  "inheritance", "lot", "families", "levites", "joshua", "caleb", "wholly followed", "mountain", "anakims",
  "judah", "border", "cities", "villages", "hebron", "debir", "achsa", "springs", "jerusalem",
];

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function cleanText(value: string) {
  return value.replace(/\bLORD\b/g, "Lord").replace(/[;:,().?!]/g, " ").replace(/\s+/g, " ").trim();
}

function windows(words: string[]) {
  const phrases: string[] = [];
  for (const size of [8, 7, 6, 5, 4]) {
    for (let index = 0; index <= words.length - size; index += 1) {
      const slice = words.slice(index, index + size);
      if (slice.every((word) => stopWords.has(word.toLowerCase()))) continue;
      phrases.push(titleCase(slice.join(" ")));
    }
  }
  return phrases;
}

function candidates(verse: ApiVerse) {
  const text = cleanText(verse.text);
  const clausePhrases = text
    .split(/\b(?:and|but|for|when|then|so|because)\b/i)
    .map(titleCase)
    .filter((phrase) => wordCount(phrase) >= 4 && wordCount(phrase) <= 11);
  return [...clausePhrases, ...windows(text.split(/\s+/).filter(Boolean))];
}

function score(phrase: string) {
  const lower = phrase.toLowerCase();
  let value = wordCount(phrase);
  for (const item of priority) if (lower.includes(item)) value += 12;
  if (/^(and|the|that|with|from|unto|upon|then|when)\b/i.test(phrase)) value -= 9;
  if (wordCount(phrase) >= 5 && wordCount(phrase) <= 8) value += 4;
  return value;
}

function nearDuplicate(phrase: string, selected: string[]) {
  const lower = phrase.toLowerCase();
  return selected.some((item) => lower.includes(item.toLowerCase()) || item.toLowerCase().includes(lower));
}

function phraseIcon(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/king|sihon|og|jericho|ai|hebron|jerusalem/.test(lower)) return "👑";
  if (/smote|battle|drove|took|fought|giants|anakims/.test(lower)) return "⚔️";
  if (/land|border|coast|plain|sea|river|mount|valley|wilderness|cities|villages/.test(lower)) return "🗺️";
  if (/inheritance|possession|lot|families|tribe|children/.test(lower)) return "🏠";
  if (/lord|moses|joshua|caleb|wholly followed|commanded/.test(lower)) return "🙏";
  return "🔎";
}

function bullets(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/king|sihon|og|jericho|ai|hebron|jerusalem/.test(lower)) {
    return ["👑 A real ruler is being remembered", "⚔️ His power was defeated", "🗺️ His territory mattered", "📜 The victory becomes part of Israel's record"];
  }
  if (/land|border|coast|plain|sea|river|mount|valley|wilderness|cities|villages/.test(lower)) {
    return ["🗺️ The place is specific", "🏞️ The promise has real geography", "👥 Tribes and families will live there", "📜 The details keep the inheritance concrete"];
  }
  if (/inheritance|possession|lot|families|tribe|children/.test(lower)) {
    return ["🏠 The promise becomes a home", "👥 Families are included", "📜 The land is assigned with order", "🕊️ Victory moves toward settled life"];
  }
  if (/caleb|wholly followed|mountain|anakims|strong/.test(lower)) {
    return ["❤️ Caleb's loyalty is still alive", "⛰️ The assignment is still difficult", "💪 Faith has not become passive", "🙏 Courage depends on the LORD"];
  }
  if (/lord|moses|joshua|commanded/.test(lower)) {
    return ["🙏 God's word leads the scene", "👤 His servants carry the mission", "📜 The promise continues across generations", "👣 Obedience must keep moving"];
  }
  return ["🔎 The detail should be slowed down", "👥 Real people are involved", "🗺️ The story is happening in a real place", "📜 The phrase carries part of the chapter's meaning"];
}

function explain(phrase: string) {
  const lower = phrase.toLowerCase();
  let opening: string;
  let second: string;

  if (/king|sihon|og|jericho|ai|hebron|jerusalem/.test(lower)) {
    opening = `${phrase} points to defeated royal power in the land.`;
    second = "Joshua is not listing names to fill space. He is recording kings whose rule had to fall before Israel could receive the inheritance.";
  } else if (/land|border|coast|plain|sea|river|mount|valley|wilderness|cities|villages/.test(lower)) {
    opening = `${phrase} gives the promise a real location on the map.`;
    second = "The land in Joshua is not a vague spiritual idea. It has rivers, mountains, borders, towns, and places where families will actually live.";
  } else if (/inheritance|possession|lot|families|tribe|children/.test(lower)) {
    opening = `${phrase} shows the land becoming an ordered inheritance.`;
    second = "After the battles, the promise must be divided into real portions for tribes and households.";
  } else if (/caleb|wholly followed|mountain|anakims|strong/.test(lower)) {
    opening = `${phrase} belongs to Caleb's long obedience.`;
    second = "Caleb is old, but his faith is not old in the sense of being weak or finished. He still trusts the LORD for the hard place promised to him.";
  } else if (/lord|moses|joshua|commanded/.test(lower)) {
    opening = `${phrase} keeps the chapter anchored in God's command and promise.`;
    second = "Joshua is showing continuity: Moses served, Joshua leads, and the LORD's word keeps moving the people toward inheritance.";
  } else {
    opening = `${phrase} is one of the details that carries the movement of the passage.`;
    second = "The wording should be read inside the larger movement from conquered kings to divided inheritance.";
  }

  return [opening, second, ...bullets(phrase)].join("\n\n");
}

function selectPhrases(chunk: ApiVerse[]) {
  const pool = [...new Set(chunk.flatMap(candidates))]
    .filter((phrase) => wordCount(phrase) >= 4 && wordCount(phrase) <= 11)
    .sort((a, b) => score(b) - score(a));
  const selected: string[] = [];
  for (const phrase of pool) {
    if (!nearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 7) break;
  }
  return selected;
}

function chunks(verses: ApiVerse[]) {
  const result: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 6) result.push(verses.slice(index, index + 6));
  return result;
}

function makeSection(chunk: ApiVerse[], index: number): Section | null {
  const phrases = selectPhrases(chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk.at(-1)!.verse;
  const icon = icons[(chunk[0].chapter + startVerse + index) % icons.length] || "📖";
  return {
    chapter: chunk[0].chapter,
    startVerse,
    endVerse,
    reference: `Joshua ${chunk[0].chapter}:${startVerse}-${endVerse}`,
    title: `${icon} ${phrases[0]}`,
    icon,
    phrases: phrases.map((phrase) => [`${phraseIcon(phrase)} ${phrase}`, explain(phrase)]),
  };
}

async function getChapter(chapter: number) {
  const response = await fetch(`https://bible-api.com/${encodeURIComponent(`Joshua ${chapter}`)}?translation=kjv`);
  if (!response.ok) throw new Error(`Could not fetch Joshua ${chapter}: ${response.status}`);
  return (await response.json()).verses as ApiVerse[];
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .trim();
}

async function main() {
  const sections: Section[] = [];
  for (const chapter of [12, 13, 14, 15]) {
    const verses = await getChapter(chapter);
    chunks(verses).forEach((chunk, index) => {
      const section = makeSection(chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  writeFileSync(
    "lib/dayFiftyNineJoshuaPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";\n\nexport const DAY_59_JOSHUA_12_15_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [\n${serialize(sections)}\n];\n`,
  );
  console.log(`Wrote ${sections.length} Day 59 Joshua sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
