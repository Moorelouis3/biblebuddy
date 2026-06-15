import { writeFileSync } from "fs";

type Book = "Ezra" | "Nehemiah";

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
  { book: "Ezra", chapters: [4, 5, 6, 7, 8, 9, 10] },
  { book: "Nehemiah", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
];

const sectionIcons = ["📜", "🏛️", "🛡️", "🙏", "👑", "💛", "🧱", "⚖️", "🕊️", "🧭", "⚠️", "🎺", "✨"];
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
    .join(" ")
    .trim();
}

function normalize(text: string) {
  return text.replace(/[“”]/g, "\"").replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function trimPhrase(phrase: string) {
  const words = phrase.trim().replace(/^and\s+/i, "").split(/\s+/).slice(0, 12);
  const badEnd = new Set(["and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "that", "the", "to", "unto", "when", "with"]);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

function isWeakPhrase(phrase: string) {
  const trimmed = phrase.trim();
  const lower = trimmed.toLowerCase();
  if (/^(and |now )?it came to pass\b/.test(lower)) return true;
  if (/^(then|and when|for it came|and said|and he said|and they said|now when)\b/.test(lower)) return true;
  if (/^(of|for|to|with|in|from|by|that|when|because|or|and)\b/i.test(trimmed)) return true;
  if (/\b(the|of|for|to|with|in|from|by|that|when|and|an|his|their|our|your|many|much|all)\s*$/i.test(trimmed)) return true;
  if (trimmed.split(/\s+/).length < 4) return true;
  return false;
}

function category(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("lord") || lower.includes("god") || lower.includes("pray") || lower.includes("fast") || lower.includes("sought")) return "god";
  if (lower.includes("king") || lower.includes("artaxerxes") || lower.includes("darius") || lower.includes("cyrus") || lower.includes("decree") || lower.includes("letter")) return "decree";
  if (lower.includes("house") || lower.includes("temple") || lower.includes("build") || lower.includes("altar") || lower.includes("foundation")) return "temple";
  if (lower.includes("wall") || lower.includes("gate") || lower.includes("repair") || lower.includes("builded")) return "wall";
  if (lower.includes("adversaries") || lower.includes("enemy") || lower.includes("samaritan") || lower.includes("mock") || lower.includes("conspired") || lower.includes("hired counsellors")) return "opposition";
  if (lower.includes("law") || lower.includes("book") || lower.includes("scribe") || lower.includes("commandment") || lower.includes("word")) return "word";
  if (lower.includes("confess") || lower.includes("sin") || lower.includes("trespass") || lower.includes("strange wives") || lower.includes("separated")) return "repentance";
  if (lower.includes("covenant") || lower.includes("seal") || lower.includes("oath") || lower.includes("curse")) return "covenant";
  if (lower.includes("jerusalem") || lower.includes("judah") || lower.includes("israel") || lower.includes("people") || lower.includes("remnant") || lower.includes("children of")) return "people";
  if (lower.includes("joy") || lower.includes("singers") || lower.includes("thanksgiving") || lower.includes("dedication") || lower.includes("feast")) return "worship";
  if (lower.includes("poor") || lower.includes("usury") || lower.includes("debt") || lower.includes("judgment")) return "justice";
  if (lower.includes("heart") || lower.includes("fear") || lower.includes("wept")) return "heart";
  return "detail";
}

function phraseIcon(phrase: string) {
  return {
    god: "🙏",
    decree: "👑",
    temple: "🏛️",
    wall: "🧱",
    opposition: "🛡️",
    word: "📜",
    repentance: "💛",
    covenant: "✍️",
    people: "🧭",
    worship: "🎺",
    justice: "⚖️",
    heart: "💛",
    detail: "✨",
  }[category(phrase)];
}

function scorePhrase(phrase: string) {
  let score = isWeakPhrase(phrase) ? -60 : 0;
  const lower = phrase.toLowerCase();
  if (/\b(lord|god|law|book|scribe|pray|confess|covenant|wall|gate|house|temple|altar|adversaries|enemy|decree|letter|jerusalem|remnant|separated)\b/.test(lower)) score += 18;
  if (/\b(artaxerxes|darius|cyrus|ezra|nehemiah|sanballat|tobiah|singers|levites|priests|thanksgiving|dedication)\b/.test(lower)) score += 10;
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

function specialExplanation(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("people of the land weakened the hands")) {
    return [
      `${phrase} means opposition attacked their courage before it attacked their materials.`,
      "The rebuilding work is not stopped only by stones or tools. Fear, pressure, and discouragement are used to weaken the people.",
      "🛡️ Pressure outside\n💛 Courage tested\n🏛️ Worship work threatened",
      "The phrase helps the reader understand spiritual opposition as something that can target the heart."
    ].join("\n\n");
  }
  if (lower.includes("ezra had prepared his heart")) {
    return [
      `${phrase} shows that Ezra's public teaching began with private devotion.`,
      "He does not handle the law as information only. He prepares his heart to seek it, do it, and teach it.",
      "💛 Heart prepared\n📜 Law sought\n🧭 People taught",
      "The phrase gives a clear pattern for Bible study: seek, obey, then teach."
    ].join("\n\n");
  }
  if (lower.includes("the hand of our god is upon all them for good")) {
    return [
      `${phrase} means Ezra trusts God's active care over the journey.`,
      "The travelers are vulnerable, but Ezra believes the LORD is not distant. God's hand represents help, protection, and favor.",
      "🙏 God's hand\n🧭 Dangerous road\n🕊️ Help for seekers",
      "The phrase teaches that faith is not pretending danger is gone; it is trusting God on the road."
    ].join("\n\n");
  }
  if (lower.includes("we have trespassed against our god")) {
    return [
      `${phrase} names sin honestly before God.`,
      "The people do not heal by hiding the wrong. Repentance begins when the sin is brought into the light and named truthfully.",
      "💛 Honest confession\n⚠️ Sin named\n↩️ Return begins",
      "The phrase helps a beginner see that confession is not shame theater; it is the start of restoration."
    ].join("\n\n");
  }
  if (lower.includes("let us rise up and build")) {
    return [
      `${phrase} is the people's answer to Nehemiah's call.`,
      "The broken wall does not repair itself. The people respond with courage and shared responsibility.",
      "🧱 Work begins\n💛 Courage rises\n🧭 People move together",
      "The phrase shows faith turning into action."
    ].join("\n\n");
  }
  if (lower.includes("the people had a mind to work")) {
    return [
      `${phrase} means the rebuilding effort had shared resolve.`,
      "Opposition is real, but the people are not passive. Their minds are set toward the work God has placed before them.",
      "🧱 Shared work\n💛 Steady resolve\n🛡️ Pressure resisted",
      "The phrase teaches that faithful rebuilding often requires unity and endurance."
    ].join("\n\n");
  }
  if (lower.includes("the joy of the lord is your strength")) {
    return [
      `${phrase} means the people are strengthened by God's joy after hearing His word.`,
      "They have wept under conviction, but the leaders do not leave them crushed. God's word leads them into holy joy.",
      "📜 Word heard\n💛 Grief answered\n🎺 Joy strengthens",
      "The phrase helps the reader see that conviction and joy can belong together."
    ].join("\n\n");
  }
  return null;
}

function explain(phrase: string) {
  const special = specialExplanation(phrase);
  if (special) return special;
  const c = category(phrase);
  const variant = [...phrase].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3;
  const map: Record<string, string[][]> = {
    god: [
      [`${phrase} keeps the LORD at the center of the scene.`, "Ezra and Nehemiah include kings, walls, letters, and enemies, but this wording reminds the reader that God is leading the return.", "🙏 God is present\n📜 His word matters\n🕊️ Restoration is His work", "The phrase teaches the reader to look for God's hand underneath the visible events."],
      [`${phrase} names God directly inside the rebuilding story.`, "The people are not merely managing a national project. They are answering the LORD who restores, corrects, protects, and commands.", "🙏 Living God\n🧱 Rebuilding before Him\n💛 People accountable", "The phrase keeps the scene from becoming only politics or construction."],
      [`${phrase} tells the reader to read this moment before God.`, "Prayer, fasting, confession, and courage make sense because the LORD is not absent from the struggle.", "🙏 Prayer rises\n⚖️ God sees\n🕊️ God can restore", "The phrase gives the scene spiritual weight."]
    ],
    decree: [
      [`${phrase} shows royal power entering the story.`, "Persian kings can issue letters and decrees, but the return narrative keeps showing that God can work even through imperial decisions.", "👑 Earthly authority\n📜 Written decree\n🙏 God still rules", "The phrase helps the reader see public policy inside God's larger purpose."],
      [`${phrase} is government language with spiritual consequences.`, "A letter can slow the work, protect the work, or send resources for the work. These documents shape the rebuilding story.", "📜 Official words\n👑 Power at work\n🏛️ Worship affected", "The phrase teaches that God can rule over systems larger than His people."],
      [`${phrase} keeps the reader close to authority and accountability.`, "The kings are powerful, but they are not ultimate. Ezra and Nehemiah show the LORD moving His purposes through and beyond them.", "👑 Kings speak\n📜 Decrees move\n🕊️ God remains sovereign", "The phrase helps explain why royal letters matter in these chapters."]
    ],
    temple: [
      [`${phrase} points to worship being rebuilt.`, "The temple, altar, vessels, and service are not decorations. They are signs that the people are returning to life before the LORD.", "🏛️ Worship restored\n🔥 Sacrifice remembered\n🙏 God's house honored", "The phrase helps a beginner see why rebuilding the house matters."],
      [`${phrase} keeps temple work from becoming ordinary construction.`, "Stone, wood, vessels, and labor matter because they serve worship and covenant obedience.", "🏛️ Holy work\n🛠️ Prepared hands\n📜 Obedience visible", "The phrase connects practical labor to spiritual restoration."],
      [`${phrase} is house-of-God language.`, "Ezra keeps the focus on worship, not only survival. The returned people need more than a place to live; they need ordered life before God.", "🏛️ God's house\n🧭 Returned people\n🙏 Worship renewed", "The phrase anchors the scene in restoration."]
    ],
    wall: [
      [`${phrase} points to the rebuilding of Jerusalem's protection and identity.`, "The wall is not only a construction project. It represents a broken city being restored after shame and danger.", "🧱 Broken places repaired\n🛡️ Protection restored\n🧭 A people regathered", "The phrase helps the reader feel why Nehemiah cares so deeply."],
      [`${phrase} is rebuilding language.`, "Each gate, wall section, and repair shows ordinary people taking responsibility for the city God preserved.", "🧱 Shared labor\n🏙️ City restored\n💛 Faith made practical", "The phrase teaches that restoration often happens one section at a time."],
      [`${phrase} gives the reader a piece of the wall-work to notice.`, "Nehemiah names the work carefully because rebuilding is not vague inspiration. It is organized, costly, and shared.", "🧱 Specific repair\n🧭 Shared responsibility\n🛡️ Opposition nearby", "The phrase keeps the rebuilding grounded in the text."]
    ],
    opposition: [
      [`${phrase} shows resistance against the work of restoration.`, "Opposition in Ezra and Nehemiah comes through fear, accusation, mockery, politics, and threats.", "🛡️ Resistance rises\n⚠️ Courage tested\n🙏 God still leads", "The phrase helps the reader see that rebuilding often attracts pressure."],
      [`${phrase} marks a threat to the returned people.`, "The enemies are not only annoyed by construction. They are trying to stop worship, identity, and obedience from being restored.", "⚠️ Threat\n🧱 Work challenged\n💛 Faith tested", "The phrase teaches that opposition can be spiritual, social, and political at once."],
      [`${phrase} brings conflict into the scene.`, "The Bible does not pretend obedience will be easy. The work continues while pressure speaks loudly.", "🛡️ Enemies push\n📜 Truth steadies\n🧱 Work continues", "The phrase helps the reader understand endurance."]
    ],
    word: [
      [`${phrase} highlights God's instruction as the authority for the people.`, "The returned community cannot be rebuilt by walls alone. They need the law, teaching, understanding, and obedience.", "📜 Word opened\n👂 People listen\n🧭 Life reshaped", "The phrase helps the reader see Scripture as central to restoration."],
      [`${phrase} brings teaching and obedience into view.`, "Ezra and Nehemiah treat the word as something to understand and do, not merely hear.", "📜 Instruction\n💛 Response\n⚖️ Covenant life", "The phrase shows that renewal is built on truth."],
      [`${phrase} gives the people a voice of authority beyond fear and politics.`, "Letters and enemies speak, but God's word must shape the community more deeply.", "📜 God instructs\n🧭 People guided\n🔑 Obedience opens", "The phrase keeps the reader anchored in Scripture."]
    ],
    repentance: [
      [`${phrase} names sin honestly before God.`, "Restoration does not happen by pretending wrong choices were small. The people must confess and turn.", "💛 Sin named\n↩️ Turning back\n🕊️ Mercy sought", "The phrase teaches that repentance is part of rebuilding."],
      [`${phrase} shows the community facing what has gone wrong.`, "Ezra and Nehemiah do not treat holiness as optional. Confession becomes a serious step toward covenant faithfulness.", "⚠️ Wrong exposed\n🙏 Prayer made\n💛 Hearts humbled", "The phrase helps a beginner see why grief can be holy."],
      [`${phrase} is return language at the heart level.`, "Coming back to Jerusalem is not enough if the people do not also return to the LORD.", "↩️ Heart return\n📜 Obedience renewed\n🕊️ Mercy needed", "The phrase keeps restoration from becoming only geographical."]
    ],
    covenant: [
      [`${phrase} points to renewed commitment before God.`, "The people are not simply inspired for a moment. They bind themselves to walk in God's law.", "✍️ Covenant promise\n📜 Law received\n💛 Obedience pledged", "The phrase teaches that renewal calls for faithful commitment."],
      [`${phrase} is covenant-renewal language.`, "After confession, the people respond with a serious promise. Their worship must become a way of life.", "✍️ Written commitment\n⚖️ Accountability\n🏛️ Worship protected", "The phrase helps the reader see repentance moving toward obedience."],
      [`${phrase} shows the people answering God's mercy with loyalty.`, "A sealed covenant means they do not want to drift back into the same sins.", "💛 Loyalty\n📜 Commandments\n🧭 Community direction", "The phrase keeps the focus on lasting reform."]
    ],
    people: [
      [`${phrase} widens the scene beyond one leader.`, "Ezra and Nehemiah name priests, Levites, families, nobles, rulers, singers, and ordinary people because restoration is shared.", "🧭 A gathered people\n🧱 Shared work\n📜 Shared instruction", "The phrase keeps the story from shrinking to one famous leader."],
      [`${phrase} reminds the reader that the community is being rebuilt.`, "The return is about people, worship, homes, leadership, and obedience coming back into order.", "🧭 Families named\n🏙️ City restored\n🙏 Worship renewed", "The phrase helps a beginner see covenant life taking public shape."],
      [`${phrase} shows God's work moving through a community.`, "The names and groups are not filler. They show who belongs, who serves, and who shares responsibility.", "📜 Names remembered\n🧭 People gathered\n💛 Responsibility shared", "The phrase helps the reader value the lists instead of skipping them."]
    ],
    worship: [
      [`${phrase} shows worship returning to the center.`, "Singing, thanksgiving, feasts, dedication, and temple service mark the people as restored before God.", "🎺 Praise\n🏛️ Worship order\n🕊️ Joy restored", "The phrase teaches that restoration is not complete without worship."],
      [`${phrase} is worship language with public joy.`, "The returned people do not only rebuild walls. They gather to praise, give thanks, and honor the LORD together.", "🎺 Thanksgiving\n🧭 Gathered people\n🙏 God honored", "The phrase helps the reader connect restoration with praise."],
      [`${phrase} brings the reader into the worship life of the community.`, "Ezra and Nehemiah show renewal through Scripture, confession, offerings, singing, and celebration.", "📜 Word\n🙏 Prayer\n🎺 Praise", "The phrase keeps worship connected to the whole life of the people."]
    ],
    justice: [
      [`${phrase} exposes a wrong inside the community.`, "Nehemiah has to confront not only outside enemies but internal injustice among God's people.", "⚖️ Wrong exposed\n💛 Neighbors harmed\n↩️ Repair required", "The phrase teaches that rebuilding walls means little if people are crushing one another."],
      [`${phrase} is justice language.`, "The returned people must not copy oppression while trying to restore worship.", "⚖️ Fairness\n🧭 Community care\n📜 Fear of God", "The phrase helps the reader see that reform includes economics and relationships."],
      [`${phrase} shows covenant life touching practical needs.`, "Debt, food, land, and treatment of the poor matter before God.", "🍞 Real needs\n⚖️ Real wrongs\n💛 Real repentance", "The phrase keeps holiness connected to daily life."]
    ],
    heart: [
      [`${phrase} asks the reader to look below the surface.`, "The rebuilding story is not only about walls and decrees. It is about fear, grief, courage, joy, and devotion before God.", "💛 Inner response\n🙏 Prayer rises\n🧱 Work continues", "The phrase helps explain why the heart matters in restoration."],
      [`${phrase} names an inward moment.`, "Ezra and Nehemiah often move from outward crisis to inward response: weeping, praying, fearing God, or rejoicing in Him.", "💛 Heart moved\n📜 Truth received\n🕊️ Strength renewed", "The phrase keeps the explanation from becoming only historical."],
      [`${phrase} reveals what is happening inside the people.`, "A restored city still needs restored hearts. The inner response tells the reader where the community is spiritually.", "💛 Fear or joy\n🙏 Prayer or pride\n🧭 Direction of life", "The phrase teaches that rebuilding must reach the soul."]
    ],
    detail: [
      [`${phrase} gives the reader a concrete detail to slow down over.`, "Ezra and Nehemiah teach through names, dates, letters, places, and actions because restoration happens in real history.", "📖 Named detail\n🧭 Scene located\n✨ Meaning inside detail", "The phrase keeps the explanation anchored in the text."],
      [`${phrase} is a textual handle for understanding the scene.`, "The detail may look small, but it helps the reader follow what is opposed, rebuilt, confessed, or renewed.", "🔎 Detail noticed\n📜 Context matters\n🔑 Meaning opens", "The phrase keeps the card from drifting into a general idea."],
      [`${phrase} gives the reader something specific to observe.`, "Instead of skipping the wording, the card asks what this exact phrase contributes to the chapter.", "✨ Specific phrase\n🧭 Scene clarified\n📖 Bible wording", "The phrase helps a beginner stay close to the passage."]
    ],
  };
  return map[c][variant].join("\n\n");
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

function tryMakeSection(book: Book, chapter: number, chunk: ApiVerse[], sectionIndex: number) {
  const clauses = chunk.flatMap(candidatesFromVerse);
  const windows = chunk.flatMap(windowPhrases);
  const pool = clauses.length >= 4 ? clauses : [...clauses, ...windows];
  const phrases = [...new Set(pool)].sort((a, b) => scorePhrase(b) - scorePhrase(a)).slice(0, 4);
  if (phrases.length < 4) return null;
  return makeSection(book, chapter, chunk, sectionIndex);
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
      chunkVerses(apiChapter.verses).forEach((chunk, index) => {
        const section = tryMakeSection(reading.book, chapter, chunk, index);
        if (section) sections.push(section);
      });
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }

  const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type EzraNehemiahPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Ezra" | "Nehemiah" };

const sections = [
${serialize(sections)}
] as const satisfies readonly EzraNehemiahPhraseSectionInput[];

export const EZRA_4_10_PERSONAL_SECTIONS = sections.filter((section) => section.book === "Ezra");
export const NEHEMIAH_1_13_PERSONAL_SECTIONS = sections.filter((section) => section.book === "Nehemiah");
`;
  writeFileSync("lib/ezraFourToNehemiahThirteenPersonalNotes.ts", file);
  console.log(`Wrote ${sections.length} sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
