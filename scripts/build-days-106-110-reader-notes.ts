import { writeFileSync } from "fs";

type Book = "2 Chronicles" | "Ezra";

type ApiVerse = {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type Section = {
  book: Book;
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const readings: Array<{ book: Book; chapters: number[] }> = [
  { book: "2 Chronicles", chapters: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] },
  { book: "Ezra", chapters: [1, 2, 3] },
];

const sectionIcons = ["🙏", "🛡️", "👑", "🏛️", "📜", "💛", "🔥", "🕊️", "⚖️", "🧭", "⚠️", "🎺", "📦", "✨"];

const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);

function titleCase(phrase: string) {
  return phrase
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/[^\w'-]/g, "");
      if (clean.toUpperCase() === "LORD") return "LORD";
      const lower = clean.toLowerCase();
      if (index > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function normalize(text: string) {
  return text.replace(/[“”]/g, "\"").replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function trimPhrase(phrase: string) {
  const words = phrase.trim().replace(/^and\s+/i, "").split(/\s+/).slice(0, 12);
  const badEnd = new Set(["and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "that", "the", "to", "unto", "when", "with"]);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" ")).trim();
}

function isWeakPhrase(phrase: string) {
  const lower = phrase.trim().toLowerCase();
  if (/^(and )?it came to pass\b/.test(lower)) return true;
  if (/^(then|and when|for it came|and said|and he said|and they said)\b/.test(lower)) return true;
  if (/^(of|for|to|with|in|from|by|that|when|because)\b/i.test(phrase)) return true;
  if (/\b(the|of|for|to|with|in|from|by|that|when|and)\s*$/i.test(phrase)) return true;
  if (/\b(loud|holy|many|much|all|any|his|her|their|our|your|an)\s*$/i.test(phrase)) return true;
  if (/^(and|or)\b/i.test(phrase.trim())) return true;
  if (phrase.split(/\s+/).length < 4) return true;
  return false;
}

function category(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("lord") || lower.includes("god") || lower.includes("pray") || lower.includes("sought")) return "god";
  if (lower.includes("king") || lower.includes("reign") || lower.includes("throne") || lower.includes("asa") || lower.includes("jehoshaphat") || lower.includes("hezekiah") || lower.includes("manasseh") || lower.includes("josiah") || lower.includes("cyrus")) return "king";
  if (lower.includes("house") || lower.includes("temple") || lower.includes("build") || lower.includes("foundation")) return "temple";
  if (lower.includes("altar") || lower.includes("offered") || lower.includes("sacrifice") || lower.includes("passover") || lower.includes("feast")) return "worship";
  if (lower.includes("heart") || lower.includes("humble") || lower.includes("repent")) return "heart";
  if (lower.includes("law") || lower.includes("book") || lower.includes("prophet") || lower.includes("word") || lower.includes("commandment")) return "word";
  if (lower.includes("battle") || lower.includes("war") || lower.includes("army") || lower.includes("shield") || lower.includes("chariot") || lower.includes("sword")) return "battle";
  if (lower.includes("children of") || lower.includes("families") || lower.includes("fathers") || lower.includes("judah") || lower.includes("jerusalem") || lower.includes("israel") || lower.includes("people") || lower.includes("remnant")) return "people";
  if (lower.includes("wrath") || lower.includes("evil") || lower.includes("forsook") || lower.includes("transgressed") || lower.includes("captivity")) return "warning";
  if (lower.includes("mercy") || lower.includes("compassion") || lower.includes("return")) return "mercy";
  return "detail";
}

function phraseIcon(phrase: string) {
  const c = category(phrase);
  return {
    god: "🙏",
    king: "👑",
    temple: "🏛️",
    worship: "🔥",
    heart: "💛",
    word: "📜",
    battle: "🛡️",
    people: "🧭",
    warning: "⚠️",
    mercy: "🕊️",
    detail: "✨",
  }[c];
}

function scorePhrase(phrase: string) {
  let score = isWeakPhrase(phrase) ? -50 : 0;
  const lower = phrase.toLowerCase();
  if (/\b(lord|god|pray|sought|heart|humble|law|prophet|word|house|temple|altar|passover|covenant|mercy|compassion|return|remnant|cyrus)\b/.test(lower)) score += 16;
  if (/\b(battle|war|enemy|sword|wrath|forsook|evil|captivity|jerusalem|judah|levites|priests|singers)\b/.test(lower)) score += 9;
  const words = phrase.split(/\s+/).length;
  if (words >= 4 && words <= 10) score += 5;
  if (words > 13) score -= 5;
  return score;
}

function candidatesFromVerse(verse: ApiVerse) {
  return normalize(verse.text)
    .split(/[,;:.!?]/)
    .map((piece) => trimPhrase(piece.trim().replace(/^["']|["']$/g, "")))
    .filter((piece) => !isWeakPhrase(piece));
}

function windowPhrases(verse: ApiVerse) {
  const words = normalize(verse.text).replace(/[;:,.!?()"']/g, "").split(/\s+/).filter(Boolean);
  const phrases: string[] = [];
  for (let index = 0; index < words.length; index += 4) {
    const phrase = trimPhrase(words.slice(index, index + 7).join(" "));
    if (!isWeakPhrase(phrase)) phrases.push(phrase);
  }
  return phrases;
}

function explain(phrase: string) {
  const c = category(phrase);
  const special = specialExplanation(phrase);
  if (special) return special;
  const variant = [...phrase].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3;
  const map: Record<string, string[][]> = {
    god: [
      [`${phrase} keeps the LORD at the center of the scene.`, "The chapter may include kings, armies, reforms, or rebuilding, but this phrase reminds the reader that God is the one who rules the story.", "🙏 God is present\n📜 His word has weight\n🔑 His purpose leads", "The phrase teaches the reader to look for God's action before admiring human strength."],
      [`${phrase} names God directly inside the movement of the chapter.`, "That matters because Chronicles and Ezra are not just national history. They are covenant history under the LORD's authority.", "🙏 Living God\n👑 Kings under Him\n🧭 People accountable", "The phrase keeps worship, leadership, and return centered on God."],
      [`${phrase} tells the reader that this moment must be read before God.`, "People may plan, fight, confess, build, or disobey, but the LORD sees and responds.", "📜 God speaks\n⚖️ God weighs\n🕊️ God can restore", "The phrase gives the scene spiritual weight."]
    ],
    king: [
      [`${phrase} puts leadership under the spotlight.`, "Kings in these chapters guide worship, make alliances, ignore warnings, repent, or lead reform. Their choices never stay private.", "👑 Public rule\n💛 Character exposed\n⚖️ Shared consequences", "The phrase helps the reader see why one leader can wound or strengthen many people."],
      [`${phrase} is royal language, but it is not flattery.`, "The Bible names kings so the reader can watch power answer to the LORD.", "👑 Authority\n⚠️ Danger\n🙏 Accountability", "The phrase teaches that a throne is measured by faithfulness, not appearance."],
      [`${phrase} keeps the reader close to responsibility.`, "A king can have soldiers, cities, and wealth, but Chronicles keeps asking whether he seeks the LORD.", "👑 Rule\n📜 Obedience tested\n🧭 A people affected", "The phrase helps explain the spiritual direction of the chapter."]
    ],
    temple: [
      [`${phrase} points to the place where worship and covenant memory gather.`, "The house of the LORD is never just a building. It is where sacrifice, prayer, teaching, and restoration become visible.", "🏛️ Holy place\n🔥 Worship restored\n🙏 God honored", "The phrase helps a beginner understand why rebuilding or cleansing the house matters so much."],
      [`${phrase} keeps temple work from becoming ordinary construction.`, "Boards, stones, foundations, vessels, and doors matter because they serve worship before the LORD.", "🏛️ Sacred work\n🛠️ Prepared hands\n✨ Worship purpose", "The phrase connects practical labor to holy service."],
      [`${phrase} is house-of-God language.`, "The text wants the reader to feel the difference between royal projects and worship centered on the LORD's name.", "🏛️ God's house\n📜 Ordered worship\n🕊️ Return to Him", "The phrase anchors the scene in worship, not human pride."]
    ],
    worship: [
      [`${phrase} is worship language.`, "The people draw near through offerings, feasts, praise, and obedience. These actions show what the heart is doing before God.", "🔥 Offering\n🎺 Praise\n💛 Surrender", "The phrase keeps worship from feeling like empty ceremony."],
      [`${phrase} shows worship becoming visible.`, "Chronicles and Ezra often mark restoration by the return of sacrifice, song, Passover, or altar service.", "🙏 Nearness sought\n🔥 Sacrifice offered\n🕊️ Mercy remembered", "The phrase helps the reader connect ritual action with returning to the LORD."],
      [`${phrase} brings the reader into ordered worship.`, "The Bible is showing people honoring God with real practices, not vague religious feelings.", "🏛️ Service\n📜 Obedience\n🎺 Joy", "The phrase teaches that worship has shape, memory, and reverence."]
    ],
    heart: [
      [`${phrase} is about the inside of a person.`, "In the Bible, the heart includes desire, loyalty, thought, and choice. God is not fooled by outward success.", "💛 Desire\n🧭 Direction\n🙏 God sees within", "The phrase teaches that reform must reach deeper than behavior."],
      [`${phrase} asks the reader to look below the surface.`, "A king can build, fight, or speak well while still drifting. The heart reveals where trust really rests.", "💛 Inner loyalty\n⚠️ Hidden drift\n📜 Obedience tested", "The phrase explains why spiritual condition matters more than public image."],
      [`${phrase} names the inward turning point.`, "Humility and repentance are not decoration in these chapters. They are the doorway back toward mercy.", "💛 Humbled heart\n↩️ Turning back\n🕊️ Mercy sought", "The phrase helps the reader see restoration beginning inside."]
    ],
    word: [
      [`${phrase} brings God's instruction or warning into view.`, "The word is not background information. It is the authority kings and people must answer.", "📜 God speaks\n👂 People must listen\n⚖️ Obedience matters", "The phrase helps the reader notice whether the chapter is moving toward or away from truth."],
      [`${phrase} highlights truth that must be obeyed.`, "Chronicles repeatedly turns on whether leaders receive, reject, or rediscover God's word.", "📜 Instruction\n👑 Leaders tested\n🔑 Direction given", "The phrase teaches that ignoring God's word is never small."],
      [`${phrase} gives the reader the voice of authority in the scene.`, "Prophets, books, commandments, and decrees shape the story because God rules through His word.", "📜 Spoken truth\n⚠️ Warning\n🕊️ Return possible", "The phrase keeps the explanation tied to what God has said."]
    ],
    battle: [
      [`${phrase} brings the reader into danger and dependence.`, "Battles in Chronicles reveal whether people trust God, fear enemies, or lean on human strength.", "🛡️ Pressure rises\n🙏 Help is needed\n⚠️ Trust is tested", "The phrase matters because conflict exposes the heart."],
      [`${phrase} is conflict language with spiritual weight.`, "The question is not only who has the larger army. The question is who seeks the LORD.", "⚔️ Danger\n👑 Leadership tested\n🙏 God can save", "The phrase helps the reader read battle scenes as faith scenes."],
      [`${phrase} puts the people under pressure.`, "Fear, prayer, pride, and obedience become visible when danger comes near.", "🛡️ Threat outside\n💛 Trust inside\n📜 God still rules", "The phrase teaches that war can reveal worship."]
    ],
    people: [
      [`${phrase} widens the scene beyond one leader.`, "Judah, Jerusalem, priests, Levites, singers, families, and returning exiles all show that covenant life is shared.", "🧭 A gathered people\n🏛️ Shared worship\n👑 Leadership affects many", "The phrase keeps the reader from shrinking the story to one famous person."],
      [`${phrase} reminds the reader that the nation is involved.`, "The people suffer from bad leadership and are strengthened by reform, worship, and obedience.", "🧭 Community\n⚖️ Shared consequences\n🕊️ Shared return", "The phrase helps a beginner see the public shape of faithfulness."],
      [`${phrase} shows God's work moving through a community.`, "The story includes leaders and ordinary people because rebuilding worship requires many faithful hands.", "🏛️ Community worship\n📜 Shared instruction\n💛 Hearts gathered", "The phrase makes the people participants, not background scenery."]
    ],
    warning: [
      [`${phrase} signals spiritual danger.`, "Trouble in these chapters often begins before the visible disaster. The heart turns, worship breaks, and judgment follows.", "⚠️ Drift exposed\n📜 God sees\n↩️ Repentance needed", "The phrase teaches the reader to notice the spiritual cause under the crisis."],
      [`${phrase} warns the reader not to admire strength without obedience.`, "A king may seem secure, but rebellion against the LORD makes everything fragile.", "👑 Power can fail\n⚠️ Sin is costly\n🙏 Mercy must be sought", "The phrase helps explain why decline can come quickly."],
      [`${phrase} is a warning marker in the passage.`, "The wording shows that sin is not merely private preference. It brings consequences into the life of the people.", "⚠️ Rebellion\n🛡️ False safety\n⚖️ Real consequence", "The phrase keeps the reader from treating disobedience lightly."]
    ],
    mercy: [
      [`${phrase} points toward mercy and return.`, "Even after judgment, God can stir hearts, open a way home, and restore worship.", "🕊️ Mercy\n↩️ Return\n🏛️ Worship renewed", "The phrase helps the reader see hope after failure."],
      [`${phrase} shows restoration beginning to move.`, "The LORD does not forget His people in exile or ruin. He can bring them back to rebuild what was broken.", "🕊️ Compassion\n🧭 A way opened\n🔥 Worship rekindled", "The phrase teaches that judgment is not stronger than God's mercy."],
      [`${phrase} is return language.`, "The story turns from loss toward rebuilding, not because the people earned it, but because God remains faithful.", "↩️ Coming back\n📜 Promise remembered\n🏛️ Foundation laid", "The phrase gives the reader hope inside the historical movement."]
    ],
    detail: [
      [`${phrase} gives the reader a concrete detail to slow down over.`, "Chronicles and Ezra teach through names, places, dates, materials, and actions because God's work happens in real history.", "📖 Named detail\n🧭 Scene located\n✨ Meaning inside detail", "The phrase keeps the explanation anchored in the text."],
      [`${phrase} is a textual handle for understanding the scene.`, "The detail may look small, but it helps the reader follow what is being built, lost, restored, or commanded.", "🔎 Detail noticed\n📜 Context matters\n🔑 Meaning opens", "The phrase keeps the card from drifting into a general idea."],
      [`${phrase} gives the reader something specific to observe.`, "Instead of skipping the wording, the card asks what this exact phrase contributes to the chapter.", "✨ Specific phrase\n🧭 Scene clarified\n📖 Bible wording", "The phrase helps a beginner stay close to the passage."]
    ],
  };
  return map[c][variant].join("\n\n");
}

function specialExplanation(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("battle is not yours")) {
    return [
      `${phrase} means Judah's deliverance will not depend on military strength.`,
      "The people still have to stand, listen, and obey, but the victory belongs to the LORD.",
      "🛡️ Fear is real\n🙏 God takes the battle\n🎺 Worship goes forward",
      "The phrase teaches a beginner that trusting God is not passivity; it is obedience under His promise."
    ].join("\n\n");
  }
  if (lower.includes("believe in the lord your god")) {
    return [
      `${phrase} calls the people to trust the LORD before they see the outcome.`,
      "Jehoshaphat puts faith before visible victory. The people must lean on God's word while the enemy is still present.",
      "🙏 Trust God\n📜 Believe His prophets\n🛡️ Stand before fear",
      "The phrase helps the reader see why worship leads the battle instead of panic."
    ].join("\n\n");
  }
  if (lower.includes("hezekiah") && lower.includes("opened the doors")) {
    return [
      `${phrase} marks the beginning of temple repair under Hezekiah.`,
      "The closed house of the LORD becomes an open house again. Reform starts by restoring worship where neglect had taken over.",
      "🏛️ Doors opened\n🧹 Neglect addressed\n🙏 Worship restored",
      "The phrase teaches that returning to God includes repairing what sin and carelessness damaged."
    ].join("\n\n");
  }
  if (lower.includes("book of the law")) {
    return [
      `${phrase} means God's written instruction has been found again among the people.`,
      "The discovery is not treated like an old artifact. It exposes sin, awakens fear, and calls the king back to covenant obedience.",
      "📜 Word recovered\n💛 Heart pierced\n↩️ Reform begins",
      "The phrase helps the reader see why Josiah responds with grief instead of curiosity."
    ].join("\n\n");
  }
  if (lower.includes("he hath charged me to build")) {
    return [
      `${phrase} shows Cyrus sending the exiles back for temple rebuilding.`,
      "A Persian king is speaking, but the story has already said the LORD stirred him. The return begins because God keeps His word.",
      "👑 A king moved\n🏛️ A house rebuilt\n🕊️ Exile opens",
      "The phrase connects political decree with divine faithfulness."
    ].join("\n\n");
  }
  if (lower.includes("house of his gods")) {
    return [
      `${phrase} shows the temple vessels sitting in a pagan shrine after Jerusalem fell.`,
      "The holy things had been carried away, but Ezra shows them coming back. The return is not only about people moving home; worship is being restored.",
      "📦 Vessels recovered\n⚠️ Exile remembered\n🏛️ Worship restored",
      "The phrase helps the reader feel the reversal from loss to restoration."
    ].join("\n\n");
  }
  if (lower.includes("came again unto jerusalem and judah")) {
    return [
      `${phrase} means the exile is turning into return.`,
      "The people are not only leaving Babylon. They are coming back to the land, the city, and the worship life that had been broken.",
      "↩️ Return home\n🧭 Families counted\n🏛️ Worship ahead",
      "The phrase gives the reader hope after the collapse at the end of Chronicles."
    ].join("\n\n");
  }
  return null;
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 6) chunks.push(verses.slice(index, index + 6));
  if (chunks.length > 1 && chunks[chunks.length - 1].length === 1) {
    const last = chunks.pop()!;
    const previous = chunks.pop()!;
    chunks.push(previous.slice(0, previous.length - 1));
    chunks.push([...previous.slice(previous.length - 1), ...last]);
  }
  return chunks;
}

async function getChapter(book: Book, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function makeSection(book: Book, chapter: number, chunk: ApiVerse[], sectionIndex: number): Section {
  const clauses = chunk.flatMap(candidatesFromVerse);
  const windows = chunk.flatMap(windowPhrases);
  const pool = clauses.length >= 4 ? clauses : [...clauses, ...windows];
  const phrases = [...new Set(pool)].sort((a, b) => scorePhrase(b) - scorePhrase(a)).slice(0, 4);
  if (phrases.length < 4) throw new Error(`Could not make 4 phrases for ${book} ${chapter}:${chunk[0].verse}`);
  const startVerse = chunk[0].verse;
  const endVerse = chunk[chunk.length - 1].verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title: phrases[0].split(/\s+/).slice(0, 8).join(" "),
    icon: sectionIcons[sectionIndex % sectionIcons.length],
    phrases: phrases.map((phrase) => [`${phraseIcon(phrase)} ${phrase}`, explain(phrase)]),
  };
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/^\[\n/, "")
    .replace(/\n\]$/, "")
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^/gm, "  ")
    .trimStart();
}

async function main() {
  const sections: Section[] = [];
  for (const reading of readings) {
    for (const chapter of reading.chapters) {
      const apiChapter = await getChapter(reading.book, chapter);
      chunkVerses(apiChapter.verses).forEach((chunk, index) => sections.push(makeSection(reading.book, chapter, chunk, index)));
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }

  const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type SecondChroniclesEzraPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "2 Chronicles" | "Ezra" };

const sections = [
${serialize(sections)}
] as const satisfies readonly SecondChroniclesEzraPhraseSectionInput[];

export const SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Chronicles");
export const EZRA_1_3_PERSONAL_SECTIONS = sections.filter((section) => section.book === "Ezra");
`;
  writeFileSync("lib/secondChroniclesTwentyToEzraThreePersonalNotes.ts", file);
  console.log(`Wrote ${sections.length} sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
