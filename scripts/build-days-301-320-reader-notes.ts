import { writeFileSync } from "fs";

type BookName = "Luke" | "John" | "Acts" | "Romans";

type ApiVerse = {
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type Section = {
  book: BookName;
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

type Target = {
  book: BookName;
  chapters: number[];
  exportName: string;
  fileName: string;
};

const targets: Target[] = [
  { book: "Luke", chapters: [22, 23, 24], exportName: "LUKE_22_24_PERSONAL_SECTIONS", fileName: "lukeTwentyTwoToTwentyFourPersonalNotes" },
  { book: "John", chapters: Array.from({ length: 21 }, (_, index) => index + 1), exportName: "JOHN_1_21_PERSONAL_SECTIONS", fileName: "johnOneToTwentyOnePersonalNotes" },
  { book: "Acts", chapters: Array.from({ length: 28 }, (_, index) => index + 1), exportName: "ACTS_1_28_PERSONAL_SECTIONS", fileName: "actsOneToTwentyEightPersonalNotes" },
  { book: "Romans", chapters: Array.from({ length: 8 }, (_, index) => index + 1), exportName: "ROMANS_1_8_PERSONAL_SECTIONS", fileName: "romansOneToEightPersonalNotes" },
];

const sectionIcons = ["✝️", "🌅", "🕊️", "👑", "📜", "🔥", "💧", "🍞", "🛡️", "🌿", "🧭", "🙏", "⚖️", "💬", "✨", "🏛️"];
const stopWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also|yea|now|there)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "can", "could", "did", "do", "does", "for", "from", "hath", "he", "his", "in", "into", "is", "may", "might", "must", "of", "on", "shall", "should", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "will", "with", "would"]);
const weakPhrasePattern = /^(he|she|they|them|we|ye|you|i|it|him|her)\s+(said|say|answered|asked|went|came|come|took|gave|give|sent|found|sat|stood|entered|saw|heard|made|make|did)\b/i;
const weakExactPhrases = new Set([
  "He Said unto Them",
  "They Said unto Him",
  "He Went His Way",
  "He Sat Down",
  "He Took Bread",
  "Gave unto Them",
  "We May Eat",
  "I Say unto You",
  "They Were Glad",
]);

const anchors = [
  "This is my body",
  "This cup is the new testament in my blood",
  "Not my will but thine be done",
  "Father forgive them",
  "To day shalt thou be with me in paradise",
  "He is not here but is risen",
  "Ought not Christ to have suffered",
  "Beginning at Moses and all the prophets",
  "The Word was with God",
  "The Word was God",
  "The Word was made flesh",
  "Behold the Lamb of God",
  "Ye must be born again",
  "God so loved the world",
  "Living water",
  "I am the bread of life",
  "If any man thirst let him come unto me",
  "I am the light of the world",
  "I am the good shepherd",
  "I am the resurrection and the life",
  "I am the way the truth and the life",
  "Abide in me",
  "It is finished",
  "Feed my sheep",
  "Ye shall receive power",
  "Ye shall be witnesses unto me",
  "Repent and be baptized",
  "In the name of Jesus Christ",
  "There is none other name under heaven",
  "We ought to obey God rather than men",
  "Full of faith and power",
  "Lord Jesus receive my spirit",
  "Saul Saul why persecutest thou me",
  "What God hath cleansed",
  "The disciples were called Christians first",
  "Believe on the Lord Jesus Christ",
  "God that made the world",
  "The just shall live by faith",
  "There is none righteous",
  "All have sinned",
  "Being justified freely by his grace",
  "Peace with God",
  "While we were yet sinners Christ died for us",
  "Buried with him by baptism into death",
  "Sin shall not have dominion over you",
  "The wages of sin is death",
  "There is therefore now no condemnation",
  "The Spirit itself beareth witness",
  "All things work together for good",
];

function note(lines: string[]) {
  return lines.filter(Boolean).join("\n\n");
}

function normalize(text: string) {
  return text.replace(/[“”]/g, "\"").replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function titleCase(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, "");
      const lower = clean.toLowerCase();
      if (!clean) return "";
      if (clean.toUpperCase() === "LORD") return "LORD";
      if (clean.toUpperCase() === "JESUS") return "JESUS";
      if (clean.toUpperCase() === "CHRIST") return "Christ";
      if (index > 0 && stopWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

function wordCount(phrase: string) {
  return phrase.split(/\s+/).filter(Boolean).length;
}

function trimPhrase(raw: string) {
  let phrase = normalize(raw)
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/[:;,.!?]+$/g, "")
    .replace(badStart, "")
    .trim();
  phrase = phrase.replace(/\s+/g, " ");
  while (phrase) {
    const last = phrase.split(/\s+/).at(-1)?.toLowerCase() ?? "";
    if (!badEnd.has(last)) break;
    phrase = phrase.split(/\s+/).slice(0, -1).join(" ");
  }
  phrase = titleCase(phrase);
  if (wordCount(phrase) < 3 || wordCount(phrase) > 10) return "";
  if (/^\d/.test(phrase)) return "";
  if (weakExactPhrases.has(phrase)) return "";
  if (/\b(they said unto him|he said unto them|he went his way|ye laid him they said|laid him they said|christ tell us and he said)\b/i.test(phrase)) return "";
  if (weakPhrasePattern.test(phrase) && !/lord|god|jesus|christ|spirit|blood|bread|cup|cross|sin|faith|grace|gospel|kingdom|scripture|promise|passover|resurrection/i.test(phrase)) return "";
  return phrase;
}

function verseCandidateSets(text: string) {
  const normalized = normalize(text).replace(/\([^)]+\)/g, "");
  const clauses = normalized
    .split(/[,;:.!?]/)
    .map(trimPhrase)
    .filter(Boolean);
  const words = normalized.replace(/[^A-Za-z0-9'\s-]/g, " ").split(/\s+/).filter(Boolean);
  const windows: string[] = [];
  for (const size of [4, 5, 6, 7, 8, 9]) {
    for (let index = 0; index + size <= words.length; index += 1) {
      const phrase = trimPhrase(words.slice(index, index + size).join(" "));
      if (phrase) windows.push(phrase);
    }
  }
  const special = anchors.filter((anchor) => normalized.toLowerCase().includes(anchor.toLowerCase())).map(titleCase);
  return { clauses: [...new Set([...special, ...clauses])], windows: [...new Set(windows)] };
}

function category(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/spirit|holy ghost|comforter|power from on high|promise of the father/.test(lower)) return "spirit";
  if (/word|light|life|only begotten|lamb of god|son of god|son of man|christ|jesus|lord/.test(lower)) return "identity";
  if (/cross|blood|body|cup|betray|crucified|calvary|sepulchre|risen|resurrection|paradise|finished|passover/.test(lower)) return "cross";
  if (/believe|faith|grace|justified|righteousness|gospel|salvation|saved|peace with god|no condemnation/.test(lower)) return "gospel";
  if (/sin|death|flesh|law|wrath|condemnation|dominion|old man|wages/.test(lower)) return "sinLaw";
  if (/born again|living water|bread of life|light of the world|good shepherd|abide|vine|way the truth/.test(lower)) return "johnImage";
  if (/witness|preach|apostles|church|baptized|name of jesus|boldness|disciples|christians/.test(lower)) return "witness";
  if (/temple|synagogue|council|pharisees|chief priests|pilate|herod|rome|caesar|jews|gentiles/.test(lower)) return "publicSetting";
  if (/prayer|pray|forgive|mercy|love|commandment|feed my sheep/.test(lower)) return "lovePrayer";
  if (/scripture|prophet|moses|david|abraham|promise|written|fulfilled/.test(lower)) return "fulfillment";
  if (book === "Romans") return "gospel";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  return {
    identity: "👑",
    spirit: "🕊️",
    cross: "✝️",
    gospel: "📣",
    sinLaw: "⚖️",
    johnImage: "💧",
    witness: "🔥",
    publicSetting: "🏛️",
    lovePrayer: "🙏",
    fulfillment: "📜",
    detail: "🔎",
  }[category(book, phrase)];
}

function bullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/word|light|life|son of god|lamb of god|christ|lord|jesus/.test(lower)) return ["👑 Jesus revealed", "📜 Scripture connected", "🧭 Reader oriented", "🙏 Faith invited"];
  if (/spirit|holy ghost|comforter|power/.test(lower)) return ["🕊️ God's presence", "🔥 Witness empowered", "🧭 Guidance given", "🌿 New life formed"];
  if (/cross|blood|body|cup|crucified|risen|finished|sepulchre|paradise/.test(lower)) return ["✝️ Suffering named", "🩸 Covenant cost", "🌅 Resurrection hope", "📣 Good news carried"];
  if (/believe|faith|grace|justified|righteousness|gospel|saved|peace/.test(lower)) return ["📣 Gospel explained", "🤲 Grace received", "⚖️ Right standing", "🌿 Life changed"];
  if (/sin|death|law|wrath|flesh|condemnation|dominion|wages/.test(lower)) return ["⚖️ Human need exposed", "🩸 Grace required", "🧭 False hope removed", "🌅 Freedom opened"];
  if (/born again|living water|bread of life|light of the world|good shepherd|vine|abide/.test(lower)) return ["💧 Picture language", "👑 Jesus centered", "🌿 Life offered", "🧭 Meaning clarified"];
  if (/witness|preach|apostles|baptized|church|disciples|christians/.test(lower)) return ["🔥 Witness sent", "📣 Jesus proclaimed", "🏛️ Public pressure", "🕊️ Spirit help"];
  if (/temple|synagogue|council|pharisees|pilate|herod|rome|caesar|gentiles/.test(lower)) return ["🏛️ Public setting", "💬 Authority tested", "🧭 Scene clarified", "📜 Promise moving"];
  if (/pray|forgive|mercy|love|commandment|feed my sheep/.test(lower)) return ["🙏 Mercy practiced", "💬 Love commanded", "🌿 Heart shaped", "👣 Faith embodied"];
  if (/scripture|prophet|moses|david|abraham|promise|written|fulfilled/.test(lower)) return ["📜 Scripture fulfilled", "🧭 Story connected", "👑 Messiah revealed", "🌿 Promise kept"];
  if (/hour|day|supper|morning|sabbath|feast|passover/.test(lower)) return ["⏳ Timing noticed", "🍞 Meal or feast setting", "🧭 Scene order", "📜 Promise moving"];
  if (/house|city|temple|room|ship|island|jerusalem|rome|prison|wilderness/.test(lower)) return ["📍 Place named", "🏛️ Public setting", "🧭 Movement followed", "👣 Mission path"];
  if (/people|multitude|brethren|disciples|apostles|elders|priests|soldiers|gentiles|jews/.test(lower)) return ["👥 People identified", "💬 Response shown", "🧭 Scene clarified", "📣 Message pressure"];
  if (/asked|answered|said|cried|called|commanded|spake|declared/.test(lower)) return ["💬 Speech marked", "👂 Hearers tested", "🧭 Meaning traced", "🌿 Response invited"];
  if (book === "John") return ["💧 Sign or saying", "👑 Jesus in view", "🧭 Meaning opened", "🙏 Belief pressed"];
  if (book === "Acts") return ["🔥 Mission movement", "👥 Witnesses named", "🏛️ Public setting", "🕊️ Spirit help"];
  if (book === "Romans") return ["⚖️ Need explained", "📣 Gospel answer", "🧭 Argument followed", "🌿 Life reshaped"];
  return ["🔎 Detail noticed", "📖 Passage followed", "🧭 Reader clarity", "🌿 Faith connection"];
}

function explain(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const lower = phrase.toLowerCase();
  const detailLines: [string, string, string] = (() => {
    if (/hour|day|supper|morning|sabbath|feast|passover/.test(lower)) {
      return [
        `${phrase} marks the timing of the scene so the reader knows where the moment sits in the story.`,
        "Timing words matter because the New Testament often connects meals, feasts, nights, mornings, and appointed hours to what God is doing through Jesus and His witnesses.",
        "The wording keeps the reader from treating the event as random.",
      ];
    }
    if (/house|city|temple|room|ship|island|jerusalem|rome|prison|wilderness/.test(lower)) {
      return [
        `${phrase} places the scene somewhere specific instead of leaving it floating in the air.`,
        "Locations matter because the Gospel and the church's witness move through real houses, cities, roads, courts, ships, prisons, and worship spaces.",
        "The wording helps the reader follow the movement of the story.",
      ];
    }
    if (/people|multitude|brethren|disciples|apostles|elders|priests|soldiers|gentiles|jews/.test(lower)) {
      return [
        `${phrase} identifies the people involved so the reader can tell who is acting, resisting, listening, or receiving the message.`,
        "The New Testament often teaches through responses: some people believe, some oppose, some fear, some ask, and some carry the word forward.",
        "The wording keeps the human response in view.",
      ];
    }
    if (/asked|answered|said|cried|called|commanded|spake|declared/.test(lower)) {
      return [
        `${phrase} draws attention to speech in the passage.`,
        "Words matter here because questions, commands, testimony, accusations, and promises often reveal what people believe about Jesus and what God is making clear.",
        "The wording helps the reader listen to the exchange, not just the action.",
      ];
    }
    if (book === "John") {
      return [
        `${phrase} gives one of John's close-up details about Jesus, belief, misunderstanding, or witness.`,
        "John often slows the story down so a sign, question, title, or response can reveal who Jesus is and what kind of life He gives.",
        "The wording helps the reader see the meaning inside the scene.",
      ];
    }
    if (book === "Acts") {
      return [
        `${phrase} traces how the witness about Jesus moves through real people and places.`,
        "Acts is full of movement: prayer, preaching, opposition, travel, courts, conversions, and courage under pressure.",
        "The wording helps the reader follow the mission step by step.",
      ];
    }
    if (book === "Romans") {
      return [
        `${phrase} is part of Paul's careful explanation of sin, grace, faith, righteousness, and new life.`,
        "Romans builds its argument line by line, so even small phrases can carry an important turn in how the Gospel is being explained.",
        "The wording helps the reader follow Paul's reasoning without skipping ahead.",
      ];
    }
    return [
      `${phrase} gives a concrete detail that helps the reader follow the passage.`,
      "The detail may show movement, timing, audience, response, or setting before the passage moves to its larger point.",
      "The wording keeps the explanation tied to the words on the page.",
    ];
  })();
  const lines: Record<ReturnType<typeof category>, [string, string, string]> = {
    identity: [
      `${phrase} points the reader to who Jesus is, not merely what is happening around Him.`,
      "In these chapters, Jesus is revealed through names, signs, words, suffering, resurrection, and authority. The phrase helps the reader see His identity inside the scene.",
      "The reader should come away knowing what this wording teaches about Jesus Himself.",
    ],
    spirit: [
      `${phrase} names God's presence and power at work among Jesus' people.`,
      "Luke, John, Acts, and Romans do not treat the Spirit as an abstract idea. The Spirit gives life, courage, witness, comfort, holiness, and assurance.",
      "The phrase helps the reader understand how God continues His work in and through His people.",
    ],
    cross: [
      `${phrase} carries the reader into Jesus' suffering, death, resurrection, or the meaning of His sacrifice.`,
      "The cross is not a tragic interruption. Jesus gives Himself, fulfills Scripture, carries sin's cost, and rises so the good news can be preached with confidence.",
      "The phrase helps the reader keep both the cost and the victory of Jesus in view.",
    ],
    gospel: [
      `${phrase} explains how God saves, justifies, forgives, or gives life through Christ.`,
      "This wording matters because the New Testament keeps pulling the reader away from self-rescue and toward grace, faith, righteousness, and peace with God.",
      "The phrase helps a beginner understand what the Gospel actually gives and why it is needed.",
    ],
    sinLaw: [
      `${phrase} exposes the problem that grace answers.`,
      "Romans especially slows down over sin, law, death, flesh, wrath, and condemnation so the reader understands why human effort cannot heal the deepest problem.",
      "The phrase helps the reader see the need before rushing past it to the answer.",
    ],
    johnImage: [
      `${phrase} is one of John's picture-rich ways of showing what Jesus gives.`,
      "John uses images like birth, water, bread, light, shepherd, vine, and way because Jesus is not offering a small religious improvement. He is offering life from God.",
      "The phrase helps the reader understand the image without flattening it into a slogan.",
    ],
    witness: [
      `${phrase} shows the Gospel moving outward through witnesses.`,
      "Acts keeps showing ordinary believers speaking about Jesus in public places, under pressure, and across cultural boundaries by the help of the Spirit.",
      "The phrase helps the reader see how the message of Jesus spreads from person to person.",
    ],
    publicSetting: [
      `${phrase} locates the scene in real public pressure, authority, or conflict.`,
      "The New Testament story happens in councils, synagogues, courts, cities, temples, prisons, roads, and homes. These details help the reader know who is responding and what is at stake.",
      "The phrase keeps the passage tied to a real setting instead of a vague religious idea.",
    ],
    lovePrayer: [
      `${phrase} teaches faith as a lived response before God and other people.`,
      "Prayer, forgiveness, love, obedience, and care for others are not side topics. They show what trusting Jesus begins to look like in real life.",
      "The phrase helps the reader connect belief with the shape of a changed heart.",
    ],
    fulfillment: [
      `${phrase} connects this moment to what God had already spoken in Scripture.`,
      "The New Testament repeatedly shows that Jesus and the mission of the church are not disconnected from Moses, the prophets, David, Abraham, and the promises of God.",
      "The phrase helps the reader see one Bible story moving forward.",
    ],
    detail: detailLines,
  };
  const [first, second, closing] = lines[kind];
  return note([first, second, bullets(book, phrase).join("\n"), closing]);
}

function scorePhrase(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  let score = wordCount(phrase);
  if (anchors.some((anchor) => lower.includes(anchor.toLowerCase()))) score += 35;
  if (/lord|god|jesus|christ|spirit|gospel|grace|faith|believe|righteous|sin|death|life|resurrection|witness|kingdom|scripture|promise|blood/.test(lower)) score += 14;
  if (category(book, phrase) !== "detail") score += 10;
  if (/^(said|came|went|made|took|called)\b/i.test(phrase)) score -= 4;
  if (/\b(and|or|but)\b/i.test(phrase)) score -= 1;
  return score;
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 3) chunks.push(verses.slice(index, index + 3));
  if (chunks.length > 1 && chunks.at(-1)!.length < 3) {
    const last = chunks.pop()!;
    const prev = chunks.pop()!;
    const keep = Math.max(2, prev.length - last.length);
    chunks.push(prev.slice(0, keep));
    chunks.push([...prev.slice(keep), ...last]);
  }
  return chunks;
}

function isNearDuplicate(phrase: string, selected: string[]) {
  const lower = phrase.toLowerCase();
  return selected.some((item) => {
    const other = item.toLowerCase();
    return lower.includes(other) || other.includes(lower);
  });
}

function selectPhrases(book: BookName, chunk: ApiVerse[]) {
  const sets = chunk.map((verse) => verseCandidateSets(verse.text));
  const clausePool = [...new Set(sets.flatMap((set) => set.clauses))]
    .filter((phrase) => wordCount(phrase) >= 3)
    .sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const windowPool = [...new Set(sets.flatMap((set) => set.windows))]
    .filter((phrase) => wordCount(phrase) >= 3)
    .sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const selected: string[] = [];
  for (const phrase of clausePool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 7) break;
  }
  for (const phrase of windowPool) {
    if (selected.length >= 7) break;
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
  }
  return selected;
}

function makeSection(book: BookName, chapter: number, chunk: ApiVerse[], sectionIndex: number): Section | null {
  const phrases = selectPhrases(book, chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk.at(-1)!.verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  const title = phrases[0];
  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title,
    icon: sectionIcons[(chapter + startVerse + sectionIndex) % sectionIcons.length],
    phrases: phrases.map((phrase) => [`${phraseIcon(book, phrase)} ${phrase}`, explain(book, phrase)]),
  };
}

async function getChapter(book: BookName, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/^\[\n/, "")
    .replace(/\n\]$/, "")
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^/gm, "  ")
    .trimStart();
}

async function buildBook(book: BookName, chapters: number[]) {
  const sections: Section[] = [];
  for (const chapter of chapters) {
    const apiChapter = await getChapter(book, chapter);
    chunkVerses(apiChapter.verses).forEach((chunk, index) => {
      const section = makeSection(book, chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  return sections;
}

function typeName(book: BookName) {
  return `${book.replace(/\s+/g, "")}PhraseSectionInput`;
}

async function main() {
  for (const target of targets) {
    const sections = await buildBook(target.book, target.chapters);
    const type = typeName(target.book);
    writeFileSync(
      `lib/${target.fileName}.ts`,
      `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type ${type} = PersonalLeviticusPhraseSectionInput & { book: "${target.book}" };

export const ${target.exportName} = [
${serialize(sections)}
] as const satisfies readonly ${type}[];
`,
    );
    console.log(`Wrote ${sections.length} ${target.book} sections.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
