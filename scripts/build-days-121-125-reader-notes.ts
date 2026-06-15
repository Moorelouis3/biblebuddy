import { writeFileSync } from "fs";

type ApiVerse = {
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type Section = {
  book: "Job";
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const chapters = Array.from({ length: 20 }, (_, index) => index + 11);
const sectionIcons = ["💧", "⚖️", "🔥", "🗣️", "🙏", "🕯️", "🧭", "💛", "📜", "✨", "🌑", "🛡️"];
const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badEnd = new Set(["and", "as", "at", "be", "because", "both", "but", "by", "for", "from", "in", "into", "of", "on", "that", "the", "their", "there", "to", "unto", "when", "which", "with"]);

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
  const raw = phrase.trim();
  if (/^i know that my redeemer liveth/i.test(raw)) return "I Know That My Redeemer Liveth";
  if (/^though after my skin worms destroy this body/i.test(raw)) return "Though After My Skin Worms Destroy This Body";
  if (/^oh that my words were now written/i.test(raw)) return "Oh That My Words Were Now Written";
  if (/^wherefore do the wicked live/i.test(raw)) return "Wherefore Do the Wicked Live";
  if (/^but he knoweth the way that i take/i.test(raw)) return "He Knoweth the Way That I Take";
  if (/^when he hath tried me/i.test(raw)) return "When He Hath Tried Me";
  if (/^he putteth no trust in his saints/i.test(raw)) return "He Putteth No Trust in His Saints";
  if (/^the fear of the lord/i.test(raw)) return "The Fear of the Lord";
  if (/^unto man he said/i.test(raw)) return "Unto Man He Said";

  const words = raw.replace(/^and\s+/i, "").split(/\s+/).slice(0, 12);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

function isWeakPhrase(phrase: string) {
  const trimmed = phrase.trim();
  const lower = trimmed.toLowerCase();
  if (/^(and |now )?it came to pass\b/.test(lower)) return true;
  if (/^(then|and when|for it came|and said|and he said|and they said|now when|after this|there was|answered and said|job answered and said|but job answered and said)\b/.test(lower)) return true;
  if (/^(of|for|to|with|in|from|by|that|when|because|or|and|which|who)\b/i.test(trimmed)) return true;
  if (/\b(the|of|for|to|with|in|from|by|that|when|and|an|his|their|our|your|many|much|all)\s*$/i.test(trimmed)) return true;
  if (trimmed.split(/\s+/).length < 4) return true;
  return false;
}

function category(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/\b(god|lord|almighty|redeemer|prayer|pray|heaven|spirit)\b/.test(lower)) return "god";
  if (/\b(job|zophar|eliphaz|bildad|answer|words|speech|reproof|doctrine|comforters|friends)\b/.test(lower)) return "counsel";
  if (/\b(wicked|righteous|judgment|justice|iniquity|sin|hypocrite|oppressor|innocent|cause|plead)\b/.test(lower)) return "justice";
  if (/\b(soul|grief|complaint|tears|sorrow|darkness|death|grave|mourn|poor|affliction|misery|weary)\b/.test(lower)) return "lament";
  if (/\b(wisdom|understanding|fear of the lord|search|known|knowledge|instruction)\b/.test(lower)) return "wisdom";
  if (/\b(try|tried|gold|path|steps|way|integrity|hold fast|perfect|upright)\b/.test(lower)) return "integrity";
  if (/\b(earth|sea|clouds|stars|light|darkness|wind|waters|heavens|north|south)\b/.test(lower)) return "creation";
  return "detail";
}

function phraseIcon(phrase: string) {
  return {
    god: "🙏",
    counsel: "🗣️",
    justice: "⚖️",
    lament: "💧",
    wisdom: "📜",
    integrity: "🔥",
    creation: "🌌",
    detail: "✨",
  }[category(phrase)];
}

function scorePhrase(phrase: string) {
  let score = isWeakPhrase(phrase) ? -100 : 0;
  const lower = phrase.toLowerCase();
  if (/\b(god|lord|almighty|redeemer|wicked|righteous|job|zophar|eliphaz|bildad|wisdom|understanding|soul|complaint|integrity|tried|gold|fear of the lord)\b/.test(lower)) score += 22;
  if (/\b(i know that my redeemer liveth|he knoweth the way that i take|when he hath tried me|wherefore do the wicked live|miserable comforters)\b/.test(lower)) score += 30;
  const words = phrase.split(/\s+/).length;
  if (words >= 4 && words <= 10) score += 7;
  if (words > 13) score -= 8;
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
    const phrase = trimPhrase(words.slice(index, index + 8).join(" "));
    if (!isWeakPhrase(phrase)) phrases.push(phrase);
  }
  return phrases;
}

function specialExplanation(phrase: string) {
  const lower = phrase.toLowerCase();
  const special: Record<string, string[]> = {
    "i know that my redeemer liveth": [
      `${phrase} is Job's strongest word of hope inside grief.`,
      "Job feels accused, misunderstood, and crushed, but he still speaks of a living Redeemer who can stand for him.",
      "💧 Pain is still present\n🙏 Hope still speaks\n⚖️ Job longs to be vindicated",
      "The phrase helps a beginner see that Job's faith is not neat, but it is still alive."
    ],
    "he knoweth the way that i take": [
      `${phrase} means Job believes God sees the path even when Job cannot find Him.`,
      "Job feels hidden from God, yet he also confesses that God knows his way completely.",
      "🕯️ God seems hard to find\n🔥 Job is being tested\n🙏 God still knows",
      "The phrase teaches the tension of faith under suffering."
    ],
    "when he hath tried me": [
      `${phrase} compares Job's suffering to a refining test.`,
      "Job is not saying the pain is easy. He is saying that if God examines him, his integrity will not disappear.",
      "🔥 Trial\n⚖️ Integrity\n✨ Gold after testing",
      "The phrase helps the reader understand Job's confidence without ignoring his pain."
    ],
    "wherefore do the wicked live": [
      `${phrase} asks why unjust people can seem to thrive.`,
      "Job is pushing back against the simple idea that suffering always proves guilt and success always proves righteousness.",
      "⚖️ Justice questioned\n🌑 Easy answers challenged\n💧 Job speaks honestly",
      "The phrase helps the reader follow one of Job's central arguments."
    ],
    "the fear of the lord": [
      `${phrase} names true wisdom as reverent relationship with God.`,
      "After searching creation for wisdom, Job 28 points the reader toward the LORD as wisdom's source.",
      "📜 Wisdom\n🙏 Reverence\n🧭 Life rightly ordered",
      "The phrase teaches that wisdom is more than information."
    ],
  };
  const key = Object.keys(special).find((entry) => lower.includes(entry));
  return key ? special[key].join("\n\n") : null;
}

function explain(phrase: string) {
  const special = specialExplanation(phrase);
  if (special) return special;

  const c = category(phrase);
  const variant = [...phrase].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  const map: Record<string, string[][]> = {
    god: [
      [`${phrase} brings Job's suffering before God.`, "Job may be confused, angry, or afraid, but he keeps speaking in a world where God is the final audience.", "🙏 God addressed\n💧 Pain not hidden\n⚖️ Answers sought", "The phrase keeps the reader from treating Job as only a human debate."],
      [`${phrase} names God inside unresolved pain.`, "Job does not have the full explanation, but the language keeps the question of God at the center.", "🌑 Mystery\n🙏 Faith under strain\n🧭 Meaning sought", "The phrase helps a beginner see why Job keeps wrestling upward."],
      [`${phrase} gives the passage spiritual weight.`, "The friends speak, Job answers, and grief rises, but the deepest issue is still life before God.", "🗣️ Human voices\n💧 Real grief\n🙏 God remains central", "The phrase anchors the scene in worship, complaint, or longing."],
      [`${phrase} shows Job trying to understand God from inside suffering.`, "The words are not calm theory. They are faith trying to breathe while pain presses hard.", "💧 Suffering\n🙏 Godward speech\n🕯️ Honest searching", "The phrase helps the reader slow down with Job instead of rushing past him."]
    ],
    counsel: [
      [`${phrase} introduces speech that must be weighed carefully.`, "Job's friends often sound religious, but their explanations can wound because they reduce suffering to a formula.", "🗣️ Counsel\n⚖️ Assumptions tested\n💧 A hurting listener", "The phrase helps the reader listen with discernment."],
      [`${phrase} shows words becoming part of Job's trial.`, "Job is not only suffering loss. He is also enduring explanations that do not fit his case.", "🗣️ Speech\n🔥 Pressure\n💧 Pain intensified", "The phrase teaches that wrong comfort can add weight to grief."],
      [`${phrase} brings the debate into focus.`, "The friends want Job to accept their explanation, while Job insists his suffering is not simple proof of hidden guilt.", "⚖️ Debate\n🗣️ Accusation\n💛 Integrity defended", "The phrase helps a beginner follow the argument."],
      [`${phrase} reminds the reader that speech can heal or harm.`, "Job's dialogues show that quick answers can fail when the pain is deep.", "🗣️ Words matter\n💧 Grief nearby\n📜 Wisdom needed", "The phrase keeps the card focused on the spoken exchange."]
    ],
    justice: [
      [`${phrase} raises the justice question at the heart of Job.`, "Job keeps asking why suffering and guilt do not line up as neatly as his friends claim.", "⚖️ Justice questioned\n💧 Pain present\n🧭 Easy answers challenged", "The phrase helps the reader understand why Job refuses shallow explanations."],
      [`${phrase} brings moral language into the suffering.`, "The issue is not only that Job hurts. He is wrestling with innocence, guilt, evil, and God's rule.", "⚖️ Right and wrong\n🔥 Trial\n🙏 God as judge", "The phrase keeps the explanation connected to Job's central struggle."],
      [`${phrase} presses the reader to think about righteousness.`, "Job's friends often assume pain proves sin, but Job challenges that formula.", "⚖️ Righteousness\n🗣️ Accusation\n💧 Suffering", "The phrase helps a beginner see why the debate is so intense."],
      [`${phrase} places Job's pain before a moral question.`, "Job wants his case heard because his suffering does not fit the simple answers around him.", "⚖️ A case to plead\n💧 A wounded man\n🙏 God as judge", "The phrase gives shape to Job's complaint."]
    ],
    lament: [
      [`${phrase} gives Job's pain words.`, "Job does not hide behind polite religious language. He speaks from the depth of grief.", "💧 Sorrow spoken\n🌑 Darkness named\n🗣️ Pain made audible", "The phrase teaches that lament is honest speech, not fake calm."],
      [`${phrase} shows suffering from the inside.`, "Job is not merely discussing pain; he is living inside it.", "💧 Grief\n🛏️ Weariness\n🙏 Questions before God", "The phrase helps the reader listen instead of rushing to fix him."],
      [`${phrase} carries the heaviness of Job's complaint.`, "His words can sound shocking because the pain is severe. Scripture lets the sufferer speak honestly.", "💧 Complaint\n🌑 Darkness\n🧭 Meaning sought", "The phrase helps a beginner understand why Job's speeches feel so raw."],
      [`${phrase} names sorrow without pretending it is small.`, "Job's lament brings grief into the open where it can be heard.", "💧 Pain named\n🗣️ Words formed\n🙏 God still in view", "The phrase keeps the reader from dismissing suffering too quickly."]
    ],
    wisdom: [
      [`${phrase} turns the reader toward wisdom.`, "Job's speeches ask where real understanding can be found when pain breaks ordinary explanations.", "📜 Wisdom sought\n🕯️ Mystery remains\n🙏 God must teach", "The phrase helps a beginner see that Job is about wisdom, not only sadness."],
      [`${phrase} shows that knowledge has limits.`, "The friends claim to understand more than they do, while Job keeps pressing toward deeper truth.", "📜 Human limits\n⚖️ Hard questions\n🧭 Need for wisdom", "The phrase teaches humility in the face of suffering."],
      [`${phrase} helps frame Job's search for meaning.`, "The book does not treat pain as simple. It makes the reader ask what wisdom looks like when answers are incomplete.", "🕯️ Searching\n📜 Understanding\n🙏 Reverence", "The phrase keeps the discussion from becoming only argument."],
      [`${phrase} names the kind of understanding Job longs for.`, "He wants more than information. He wants truth that can stand inside suffering.", "📜 Wisdom\n💧 Suffering\n✨ Truth that holds", "The phrase gives the reader a handle on Job's deeper search."]
    ],
    integrity: [
      [`${phrase} points to Job's tested integrity.`, "Job is hurting, but he refuses to confess lies just to make the debate easier.", "🔥 Tested faith\n⚖️ Honest conscience\n💛 Integrity held", "The phrase helps the reader see why Job keeps defending his way."],
      [`${phrase} shows endurance under pressure.`, "Job does not claim to understand everything. He insists that suffering has not erased his walk before God.", "🔥 Trial\n🧭 Path watched\n💛 Faith under strain", "The phrase teaches that integrity can be painful to maintain."],
      [`${phrase} gives Job's defense a clear shape.`, "The friends want a confession, but Job will not pretend guilt simply because pain is present.", "⚖️ A defended life\n🔥 Pressure\n🗣️ Honest speech", "The phrase helps explain why Job's replies become so intense."],
      [`${phrase} shows Job holding to what he knows.`, "His circumstances accuse him, and his friends accuse him, but Job still speaks from conscience.", "💛 Conscience\n🔥 Testing\n🙏 God knows", "The phrase keeps the reader close to Job's inner struggle."]
    ],
    creation: [
      [`${phrase} uses creation language to widen the scene.`, "Job's speeches look at earth, sea, light, darkness, clouds, and heavens because suffering raises questions as large as the world.", "🌌 Creation\n🕯️ Mystery\n🙏 God beyond Job", "The phrase helps a beginner feel the scale of the book."],
      [`${phrase} points beyond human control.`, "Creation imagery reminds the reader that Job's pain sits inside a world much larger than his understanding.", "🌌 Vast world\n💧 Small human strength\n📜 Wisdom needed", "The phrase keeps the reader humble before the mystery."],
      [`${phrase} brings the natural world into Job's wrestling.`, "Job reaches for images bigger than ordinary speech because his grief is too large for small words.", "🌌 Sky and earth\n🌑 Darkness\n🗣️ Deep complaint", "The phrase shows how poetic language carries pain."],
      [`${phrase} helps the reader see Job's imagination at work.`, "Creation details are not random decoration. They give shape to wonder, fear, and unanswered questions.", "🌌 World imagery\n🕯️ Mystery\n💧 Human sorrow", "The phrase keeps the poetic details meaningful."]
    ],
    detail: [
      [`${phrase} gives the reader a concrete detail to notice.`, "The wording may look small, but it helps locate the speaker, the argument, or the movement of the chapter.", "✨ Detail noticed\n📜 Text followed\n🧭 Scene clearer", "The phrase keeps the explanation anchored to the exact Bible wording."],
      [`${phrase} works like a handle on the passage.`, "A beginner can use the phrase to understand who is speaking, what is changing, or why the moment matters.", "🔎 Phrase observed\n🧭 Context opened\n💛 Meaning clarified", "The phrase helps the reader stay close to the text."],
      [`${phrase} opens a specific detail in Job's argument.`, "Job's speeches and the friends' replies turn on repeated details, sharp images, and careful wording.", "📜 Bible wording\n🕯️ Meaning inside detail\n🧭 Argument movement", "The detail is part of how the passage carries meaning."],
      [`${phrase} gives the card a specific piece of the passage to explain.`, "The goal is not a broad topic. The phrase itself helps the reader understand the scene.", "✨ Specific phrase\n📜 Bible wording\n🧭 Passage meaning", "The phrase keeps the explanation from drifting."]
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

async function getChapter(chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`Job ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch Job ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
  }
  throw new Error(`Could not fetch Job ${chapter}`);
}

function selectPhrases(chunk: ApiVerse[]) {
  const clauses = chunk.flatMap(candidatesFromVerse);
  const windows = chunk.flatMap(windowPhrases);
  const pool = clauses.length >= 4 ? clauses : [...clauses, ...windows];
  return [...new Set(pool)].sort((a, b) => scorePhrase(b) - scorePhrase(a)).slice(0, 4);
}

function tryMakeSection(chapter: number, chunk: ApiVerse[], sectionIndex: number) {
  const phrases = selectPhrases(chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk[chunk.length - 1].verse;
  const reference = startVerse === endVerse ? `Job ${chapter}:${startVerse}` : `Job ${chapter}:${startVerse}-${endVerse}`;
  return {
    book: "Job",
    chapter,
    startVerse,
    endVerse,
    reference,
    title: phrases[0].split(/\s+/).slice(0, 8).join(" "),
    icon: sectionIcons[sectionIndex % sectionIcons.length],
    phrases: phrases.map((phrase) => [`${phraseIcon(phrase)} ${phrase}`, explain(phrase)]),
  } satisfies Section;
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
  for (const chapter of chapters) {
    const apiChapter = await getChapter(chapter);
    chunkVerses(apiChapter.verses).forEach((chunk, index) => {
      const section = tryMakeSection(chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 900));
  }

  const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type JobPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Job" };

export const JOB_11_30_PERSONAL_SECTIONS = [
${serialize(sections)}
] as const satisfies readonly JobPhraseSectionInput[];
`;
  writeFileSync("lib/jobElevenToThirtyPersonalNotes.ts", file);
  console.log(`Wrote ${sections.length} sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
