import { writeFileSync } from "fs";

type BookName = "Joshua" | "Judges" | "Ruth" | "1 Samuel" | "2 Samuel";

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

type Target = {
  exportName: string;
  book: BookName;
  chapters: number[];
};

const targets: Target[] = [
  { exportName: "DAY_61_80_JOSHUA_20_24_SUPPLEMENTAL_SECTIONS", book: "Joshua", chapters: [20, 21, 22, 23, 24] },
  { exportName: "DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS", book: "Judges", chapters: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15] },
  { exportName: "DAY_61_80_JUDGES_16_21_SUPPLEMENTAL_SECTIONS", book: "Judges", chapters: [16, 17, 18, 19, 20, 21] },
  { exportName: "DAY_61_80_RUTH_1_4_SUPPLEMENTAL_SECTIONS", book: "Ruth", chapters: [1, 2, 3, 4] },
  { exportName: "DAY_61_80_FIRST_SAMUEL_1_10_SUPPLEMENTAL_SECTIONS", book: "1 Samuel", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { exportName: "DAY_61_80_FIRST_SAMUEL_11_30_SUPPLEMENTAL_SECTIONS", book: "1 Samuel", chapters: Array.from({ length: 20 }, (_, index) => index + 11) },
  { exportName: "DAY_61_80_FIRST_SAMUEL_31_SUPPLEMENTAL_SECTIONS", book: "1 Samuel", chapters: [31] },
  { exportName: "DAY_61_80_SECOND_SAMUEL_1_19_SUPPLEMENTAL_SECTIONS", book: "2 Samuel", chapters: Array.from({ length: 19 }, (_, index) => index + 1) },
];

const icons = ["📖", "🔎", "🧭", "⚖️", "🛡️", "👑", "🙏", "⚠️", "🏠", "🕊️", "🌾", "🔥", "💔", "🤝"];

const stopWords = new Set([
  "and", "the", "that", "with", "from", "unto", "upon", "into", "they", "them", "their", "there", "were", "shall", "said",
  "came", "went", "when", "then", "this", "have", "also", "before", "after", "which", "what", "where", "because",
]);

const importantWords = [
  "lord", "god", "covenant", "ark", "inheritance", "refuge", "levites", "serve", "forsake", "evil", "judge", "delivered",
  "spirit", "cried", "vow", "samson", "ruth", "boaz", "kinsman", "redeem", "samuel", "saul", "david", "king", "anointed",
  "philistines", "ark", "glory", "heart", "hand", "house", "covenant", "mercy", "sinned", "battle", "prayer", "word",
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

function cleanVerseText(value: string) {
  return value
    .replace(/\bLORD\b/g, "Lord")
    .replace(/[;:,().?!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phraseWindows(words: string[]) {
  const phrases: string[] = [];
  for (const size of [7, 6, 5, 4]) {
    for (let index = 0; index <= words.length - size; index += 1) {
      const window = words.slice(index, index + size);
      if (window.every((word) => stopWords.has(word.toLowerCase()))) continue;
      phrases.push(titleCase(window.join(" ")));
    }
  }
  return phrases;
}

function candidatePhrases(verse: ApiVerse) {
  const text = cleanVerseText(verse.text);
  const clauses = text
    .split(/\b(?:and|but|for|when|then|so)\b/i)
    .map(titleCase)
    .filter((phrase) => wordCount(phrase) >= 4 && wordCount(phrase) <= 10);
  const words = text.split(/\s+/).filter(Boolean);
  return [...clauses, ...phraseWindows(words)];
}

function scorePhrase(phrase: string) {
  const lower = phrase.toLowerCase();
  let score = wordCount(phrase);
  if (importantWords.some((word) => lower.includes(word))) score += 25;
  if (/lord|god|covenant|spirit|ark|king|judge|redeem|mercy|evil|sinned|heart/.test(lower)) score += 12;
  if (wordCount(phrase) >= 5 && wordCount(phrase) <= 8) score += 5;
  if (/^(and|the|that|with|from|unto|upon|then|when)\b/i.test(phrase)) score -= 10;
  return score;
}

function isNearDuplicate(phrase: string, selected: string[]) {
  const lower = phrase.toLowerCase();
  return selected.some((item) => {
    const other = item.toLowerCase();
    return lower.includes(other) || other.includes(lower);
  });
}

function phraseIcon(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/lord|god|spirit|ark|holy|covenant/.test(lower)) return "🙏";
  if (/king|saul|david|captain|anoint|throne/.test(lower)) return "👑";
  if (/battle|philistines|sword|smote|war|host/.test(lower)) return "⚔️";
  if (/evil|sinned|forsook|idols|baal|ashteroth/.test(lower)) return "⚠️";
  if (/house|father|mother|son|daughter|wife|child/.test(lower)) return "🏠";
  if (/ruth|boaz|kinsman|redeem|naomi|glean|barley/.test(lower)) return "🌾";
  if (/wept|died|dead|mourning|lament|grief/.test(lower)) return "💔";
  if (/land|inheritance|city|border|field|gate/.test(lower)) return "🗺️";
  return icons[(book.length + phrase.length) % icons.length] || "🔎";
}

function teachingBullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/lord|god|spirit|ark|covenant/.test(lower)) {
    return ["🙏 God's authority is in view", "📜 His word directs the scene", "👥 His people must respond", "🧭 The story turns around Him"];
  }
  if (/king|saul|david|anoint|throne/.test(lower)) {
    return ["👑 Leadership is being tested", "🏠 The nation is affected", "⚖️ Power carries responsibility", "📜 God's rule stands above the king"];
  }
  if (/evil|sinned|forsook|idols|baal|ashteroth/.test(lower)) {
    return ["⚠️ Sin is being exposed", "💔 Covenant loyalty is damaged", "📉 The people move away from God", "🙏 Mercy is needed, not excuses"];
  }
  if (/battle|philistines|sword|smote|war|host/.test(lower)) {
    return ["⚔️ Conflict becomes visible", "👥 Real people are affected", "⚠️ Choices bring consequences", "🛡️ Deliverance must come from God"];
  }
  if (book === "Ruth" || /ruth|boaz|kinsman|redeem|glean|barley/.test(lower)) {
    return ["🌾 Provision is happening in ordinary life", "🏠 Family future is at stake", "🤝 Kindness carries real weight", "🕊️ God is quietly preserving hope"];
  }
  if (/land|inheritance|city|border|field|gate/.test(lower)) {
    return ["🗺️ The place is concrete", "👥 Families and tribes are affected", "📜 God's promise reaches daily life", "🧭 The detail keeps the story grounded"];
  }
  return ["🔎 The wording slows the scene down", "👥 Real people are involved", "📜 The detail carries meaning", "🧭 The story moves through this moment"];
}

function explain(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  const opening = /lord|god|spirit|ark|covenant/.test(lower)
    ? `${phrase} puts God's presence, authority, or covenant word at the center of the scene.`
    : /king|saul|david|anoint|throne/.test(lower)
      ? `${phrase} shows leadership being received, tested, protected, or misused.`
      : /evil|sinned|forsook|idols|baal|ashteroth/.test(lower)
        ? `${phrase} names the spiritual problem instead of hiding it behind ordinary events.`
        : /battle|philistines|sword|smote|war|host/.test(lower)
          ? `${phrase} brings the conflict into the open so the cost can be seen clearly.`
          : book === "Ruth" || /ruth|boaz|kinsman|redeem|glean|barley/.test(lower)
            ? `${phrase} belongs to the way God preserves Ruth and Naomi through faithful kindness.`
            : `${phrase} gives the scene a concrete detail a new reader should not rush past.`;
  const second = book === "Judges"
    ? "Judges keeps showing what happens when Israel forgets the LORD, needs rescue, and lacks faithful leadership."
    : book === "Ruth"
      ? "Ruth turns ordinary family need, work, loss, and kindness into a story of redemption."
      : book === "1 Samuel"
        ? "First Samuel shows Israel moving through priesthood, prophecy, kingship, fear, and the need for faithful rule."
        : book === "2 Samuel"
          ? "Second Samuel shows David's kingdom with both promise and painful consequences."
          : "Joshua shows God's promise becoming real through obedience, inheritance, warning, and covenant faithfulness.";
  return [opening, second, ...teachingBullets(book, phrase)].join("\n\n");
}

function selectPhrases(book: BookName, chunk: ApiVerse[]) {
  const pool = [...new Set(chunk.flatMap(candidatePhrases))]
    .filter((phrase) => wordCount(phrase) >= 4 && wordCount(phrase) <= 10)
    .sort((a, b) => scorePhrase(b) - scorePhrase(a));
  const selected: string[] = [];
  for (const phrase of pool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 7) break;
  }
  return selected;
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 6) chunks.push(verses.slice(index, index + 6));
  return chunks;
}

function makeSection(book: BookName, chunk: ApiVerse[], index: number): Section | null {
  const phrases = selectPhrases(book, chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk.at(-1)!.verse;
  const icon = icons[(chunk[0].chapter + startVerse + index) % icons.length] || "🔎";
  return {
    chapter: chunk[0].chapter,
    startVerse,
    endVerse,
    reference: `${book} ${chunk[0].chapter}:${startVerse}-${endVerse}`,
    title: `${icon} ${phrases[0]}`,
    icon,
    phrases: phrases.map((phrase) => [`${phraseIcon(book, phrase)} ${phrase}`, explain(book, phrase)]),
  };
}

async function getChapter(book: BookName, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()).verses as ApiVerse[];
    if (response.status !== 429 || attempt === 8) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .trim();
}

async function main() {
  const blocks: string[] = [];
  for (const target of targets) {
    const sections: Section[] = [];
    for (const chapter of target.chapters) {
      const verses = await getChapter(target.book, chapter);
      chunkVerses(verses).forEach((chunk, index) => {
        const section = makeSection(target.book, chunk, index);
        if (section) sections.push(section);
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    blocks.push(`export const ${target.exportName}: PersonalLeviticusPhraseSectionInput[] = [\n${serialize(sections)}\n];`);
    console.log(`Wrote ${sections.length} supplemental ${target.book} sections for ${target.exportName}.`);
  }

  writeFileSync(
    "lib/daySixtyOneToEightySupplementalPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";\n\n${blocks.join("\n\n")}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
