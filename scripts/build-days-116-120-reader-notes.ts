import { writeFileSync } from "fs";

type Book = "Esther" | "Job";

type ApiVerse = {
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
  { book: "Esther", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { book: "Job", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
];

const sectionIcons = ["👑", "📜", "⚖️", "🕯️", "🛡️", "💛", "⚠️", "🧭", "🕊️", "🎭", "🔥", "🙏", "✨"];
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
  if (/^let that day be darkness let not god/i.test(phrase.trim())) {
    return "Let That Day Be Darkness";
  }
  const words = phrase.trim().replace(/^and\s+/i, "").split(/\s+/).slice(0, 12);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

function isWeakPhrase(phrase: string) {
  const trimmed = phrase.trim();
  const lower = trimmed.toLowerCase();
  if (/^(and |now )?it came to pass\b/.test(lower)) return true;
  if (/^(then|and when|for it came|and said|and he said|and they said|now when|after this|there was)\b/.test(lower)) return true;
  if (/^(were expired|were present|was in|which was|which have|which he|which saw|which commanded|same when|commandment and his decree drew|the king ahasuerus name|unto the queen)\b/.test(lower)) return true;
  if (/^(of|for|to|with|in|from|by|that|when|because|or|and)\b/i.test(trimmed)) return true;
  if (/\b(the|of|for|to|with|in|from|by|that|when|and|an|his|their|our|your|many|much|all)\s*$/i.test(trimmed)) return true;
  if (trimmed.split(/\s+/).length < 4) return true;
  return false;
}

function category(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/\b(lord|god|almighty|heaven|pray|fast|worship|blessed)\b/.test(lower)) return "god";
  if (/\b(king|queen|ahasuerus|esther|mordecai|haman|palace|throne|royal|crown|banquet|chamberlains)\b/.test(lower)) return "court";
  if (/\b(decree|commandment|letters|writing|sealed|ring|law|scribe|book)\b/.test(lower)) return "decree";
  if (/\b(jews|people|province|shushan|maidens|servants|city|kindred|seed)\b/.test(lower)) return "people";
  if (/\b(enemy|wrath|destroy|slay|perish|gallows|adversary|trouble|evil|fear)\b/.test(lower)) return "danger";
  if (/\b(deliverance|enlargement|escaped|rest|gladness|joy|feast|purim|honour)\b/.test(lower)) return "reversal";
  if (/\b(job|satan|sons of god|perfect and upright|integrity|curse|skin for skin)\b/.test(lower)) return "testing";
  if (/\b(day|night|born|womb|grave|death|soul|life|sorrow|complaint|grief|misery|weary)\b/.test(lower)) return "lament";
  if (/\b(friend|eliphaz|bildad|answer|words|reproof|doctrine|speech)\b/.test(lower)) return "counsel";
  if (/\b(judgment|righteous|wicked|iniquity|sin|justice|cause|plead)\b/.test(lower)) return "justice";
  return "detail";
}

function phraseIcon(phrase: string) {
  return {
    god: "🙏",
    court: "👑",
    decree: "📜",
    people: "🧭",
    danger: "⚠️",
    reversal: "🕊️",
    testing: "🔥",
    lament: "💧",
    counsel: "🗣️",
    justice: "⚖️",
    detail: "✨",
  }[category(phrase)];
}

function scorePhrase(phrase: string) {
  let score = isWeakPhrase(phrase) ? -80 : 0;
  const lower = phrase.toLowerCase();
  if (/\b(lord|god|almighty|king|queen|esther|mordecai|haman|jews|decree|letters|deliverance|purim|job|satan|upright|integrity|curse|soul|life|complaint|wicked|righteous)\b/.test(lower)) score += 20;
  if (/\b(gallows|banquet|sealed|ring|shushan|province|sons of god|perfect and upright|skin for skin|miserable comforters)\b/.test(lower)) score += 12;
  const words = phrase.split(/\s+/).length;
  if (words >= 4 && words <= 10) score += 6;
  if (words > 13) score -= 7;
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
    "for such a time as this": [
      `${phrase} means Esther's position is tied to the crisis in front of her.`,
      "Mordecai is not saying Esther is safe because she is queen. He is pressing her to see that privilege can become responsibility.",
      "👑 Position\n⚠️ Danger\n🕊️ Courage for others",
      "The phrase helps the reader see providence working through a difficult decision."
    ],
    "if i perish i perish": [
      `${phrase} is Esther's costly surrender before she goes to the king.`,
      "She does not pretend the risk is small. She chooses courage while knowing the outcome is not in her control.",
      "💛 Courage\n🙏 Fasting\n⚠️ Real danger",
      "The phrase teaches that faithful action can still feel frightening."
    ],
    "the lord gave and the lord hath taken away": [
      `${phrase} holds Job's grief and worship in the same sentence.`,
      "Job does not understand the heavenly scene, but he refuses to treat God as worthy only when life is easy.",
      "🙏 Worship\n💧 Loss\n🔥 Faith tested",
      "The phrase helps a beginner see that lament and reverence can stand together."
    ],
    "shall we receive good at the hand of god": [
      `${phrase} asks whether faith will trust God only in comfortable seasons.`,
      "Job answers his wife by refusing to make blessing the only measure of God's worth.",
      "🔥 Testing\n🙏 Reverence\n💧 Pain still real",
      "The phrase teaches that suffering exposes what a person believes God is owed."
    ],
    "let the day perish wherein i was born": [
      `${phrase} opens Job's lament with raw grief.`,
      "Job is not giving a neat speech. He is pouring out the pain of a man who wishes his life had never begun.",
      "💧 Grief spoken\n🌑 Darkness named\n🗣️ Pain brought into words",
      "The phrase helps the reader understand lament as honest speech before God."
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
      [`${phrase} brings God into the center of the scene.`, "Esther often shows God's providence quietly, while Job speaks to God through pain. In both books, the reader should look beyond the visible crisis.", "🙏 God is not absent\n🕯️ Hidden or questioned\n💛 Faith under pressure", "The phrase keeps the card from treating the story as only human drama."],
      [`${phrase} gives the reader God-language inside pressure.`, "Prayer, fasting, worship, blessing, and pleading show people responding to more than circumstances.", "🙏 Turning toward God\n🔥 Testing real faith\n🕊️ Hope not erased", "The phrase teaches that crisis reveals what the heart believes about God."],
      [`${phrase} makes the scene spiritual, not only emotional.`, "Pain, politics, fear, and loss are real, but the Bible keeps placing them before God.", "💧 Pain named\n🙏 God addressed\n🧭 Life interpreted", "The phrase helps a beginner connect suffering and faith without flattening either one."],
      [`${phrase} reminds the reader that God is the deepest audience.`, "The people may face kings, enemies, friends, or grief, but their words and choices still happen before Him.", "👑 Earthly power\n🔥 Trial\n🙏 God sees", "The phrase gives weight to the decision or prayer in the passage."]
    ],
    court: [
      [`${phrase} places the reader inside the Persian court.`, "Esther's story moves through banquets, chambers, crowns, servants, and royal commands because power is part of the danger.", "👑 Palace setting\n📜 Royal custom\n⚠️ Risk beneath beauty", "The phrase helps explain why access to the king matters so much."],
      [`${phrase} is court language, but it is not empty decoration.`, "The details show a world where one ruler's favor or anger can change many lives.", "👑 Status\n🎭 Public appearance\n🧭 Hidden vulnerability", "The phrase teaches the reader to watch how fragile palace security can be."],
      [`${phrase} shows authority operating through royal spaces.`, "Ahasuerus, Esther, Mordecai, and Haman move inside a system of honor, access, command, and fear.", "👑 Power\n📜 Protocol\n⚠️ Consequences", "The phrase keeps the Esther story grounded in its political setting."],
      [`${phrase} reveals how visible honor can hide danger.`, "The court may look splendid, but the people of God are still vulnerable inside the empire.", "🎭 Splendor\n⚠️ Threat\n💛 Courage needed", "The phrase helps a beginner read Esther with both beauty and tension in view."]
    ],
    decree: [
      [`${phrase} shows written power moving through the empire.`, "In Esther, letters and seals can threaten death or open deliverance. The written decree carries real force.", "📜 Words sent\n👑 Authority behind them\n🧭 Provinces affected", "The phrase helps the reader see why documents matter in the story."],
      [`${phrase} is more than paperwork.`, "A royal command can turn private hatred into public danger, or later turn fear into protection.", "📜 Decree\n⚠️ Real consequences\n🕊️ Reversal possible", "The phrase teaches how power becomes active through written words."],
      [`${phrase} keeps the reader close to the official action.`, "The empire moves by command, seal, scribes, and messengers. Esther's crisis spreads through that machinery.", "📜 Scribes\n👑 King's name\n🧭 Many provinces", "The phrase explains how one decision reaches a whole people."],
      [`${phrase} marks the moment authority becomes public.`, "Once a word is written and sent, the crisis can no longer stay hidden in the palace.", "📜 Written order\n⚠️ Public threat\n🕊️ Public rescue", "The phrase helps the reader follow the story's turning points."]
    ],
    people: [
      [`${phrase} widens the scene beyond one person.`, "Esther and Job both name households, servants, friends, peoples, and communities because suffering and deliverance spread through relationships.", "🧭 People affected\n💛 Shared burden\n📜 Names matter", "The phrase keeps the reader from shrinking the passage to one private feeling."],
      [`${phrase} shows who is caught inside the story's pressure.`, "The crisis touches families, cities, provinces, servants, and friends. The Bible wants the reader to notice the human weight.", "🧭 Community\n⚠️ Vulnerability\n🕊️ Hope needed", "The phrase helps explain why the stakes are not small."],
      [`${phrase} brings the reader close to the people involved.`, "The wording names who is threatened, grieving, gathered, accused, or delivered.", "👥 Real people\n💧 Real pain\n🕊️ Real mercy", "The phrase keeps the explanation close to the text."],
      [`${phrase} reminds the reader that decisions affect more than the decision-maker.`, "In these chapters, courage, fear, counsel, and commands ripple outward.", "🧭 Wider impact\n👑 Public choices\n💛 Shared consequences", "The phrase helps a beginner see why each scene matters."]
    ],
    danger: [
      [`${phrase} brings danger into plain view.`, "The threat may come through Haman's hatred, royal law, physical loss, or crushing grief, but the pressure is not imaginary.", "⚠️ Threat named\n💧 Pain real\n🛡️ Rescue needed", "The phrase helps the reader feel the weight of the moment."],
      [`${phrase} shows the story moving through real risk.`, "Esther is not a fairy tale, and Job is not a theory about pain. Both books force the reader to face danger honestly.", "⚠️ Risk\n🔥 Testing\n💛 Courage or endurance", "The phrase keeps the explanation from becoming shallow."],
      [`${phrase} marks the pressure placed on the people.`, "Fear, anger, loss, and accusation press hard in these chapters.", "⚠️ Pressure\n🕯️ Uncertainty\n🙏 Need for help", "The phrase teaches that biblical faith is lived inside real trouble."],
      [`${phrase} shows how quickly life can become fragile.`, "A command, an enemy, a sickness, or a loss can change the whole scene.", "⚠️ Fragility\n💧 Grief\n🛡️ Need for deliverance", "The phrase helps a beginner understand why the passage slows down over crisis."]
    ],
    reversal: [
      [`${phrase} signals a turn from danger toward relief.`, "Esther's story is built around reversal: the threatened people are preserved, and hidden schemes are exposed.", "🕊️ Reversal\n👑 Power redirected\n💛 Joy after fear", "The phrase helps the reader see how deliverance unfolds."],
      [`${phrase} shows joy arriving after pressure.`, "The gladness is not random celebration. It comes after fear, fasting, danger, and a threat of destruction.", "💧 Fear before\n🕊️ Rescue after\n🎉 Joy remembered", "The phrase teaches why Purim becomes a remembered feast."],
      [`${phrase} marks deliverance becoming visible.`, "What was hidden in anxiety becomes public relief. The story turns from mourning toward gladness.", "🕊️ Rescue\n📜 Public news\n🎉 Remembered joy", "The phrase helps explain the emotional movement of Esther."],
      [`${phrase} points to God turning the story without being loudly named.`, "Esther's book often shows providence through timing, courage, sleep, records, banquets, and reversals.", "🕯️ Hidden providence\n🕊️ Reversal\n👥 People preserved", "The phrase helps a reader notice God's work under the surface."]
    ],
    testing: [
      [`${phrase} places Job inside a test he cannot see.`, "Job knows his suffering, but he does not know the heavenly conversation behind it.", "🔥 Trial\n💧 Loss\n🙏 Faith watched", "The phrase helps the reader understand why Job's responses matter."],
      [`${phrase} shows faith being examined under loss.`, "Job's story asks whether reverence for God can survive when blessing is stripped away.", "🔥 Testing\n💛 Integrity\n💧 Pain not denied", "The phrase keeps Job's suffering from becoming a simple lesson."],
      [`${phrase} names the pressure around Job's integrity.`, "The issue is not whether Job feels pain. The question is whether pain will make him abandon God.", "🔥 Integrity tested\n🗣️ Accusation\n🙏 Worship challenged", "The phrase helps a beginner follow the spiritual conflict."],
      [`${phrase} belongs to the deep tension of Job.`, "A righteous sufferer is being tested in ways he cannot explain from earth.", "⚖️ Righteous sufferer\n🔥 Hidden test\n💧 Honest grief", "The phrase prepares the reader for Job's hard speeches."]
    ],
    lament: [
      [`${phrase} gives Job's pain words.`, "Job does not hide behind polite religious language. He speaks from the depth of grief.", "💧 Sorrow spoken\n🌑 Darkness named\n🗣️ Pain made audible", "The phrase teaches that lament is honest speech, not fake calm."],
      [`${phrase} shows suffering from the inside.`, "Job is not merely discussing pain; he is living inside it.", "💧 Grief\n🛏️ Weariness\n🙏 Questions before God", "The phrase helps the reader slow down and listen instead of rushing to fix him."],
      [`${phrase} carries the heaviness of Job's complaint.`, "His words can sound shocking because the pain is severe. The Bible lets the sufferer speak honestly.", "💧 Complaint\n🌑 Darkness\n🧭 Meaning sought", "The phrase helps a beginner understand why Job's speeches feel so raw."],
      [`${phrase} names sorrow without pretending it is small.`, "Job's lament brings grief into the open where it can be heard.", "💧 Pain named\n🗣️ Words formed\n🙏 God still in view", "The phrase keeps the reader from dismissing suffering too quickly."]
    ],
    counsel: [
      [`${phrase} introduces words offered to a sufferer.`, "Job's friends speak, but their counsel must be weighed carefully because not every religious-sounding answer heals.", "🗣️ Counsel\n💧 Suffering listener\n⚖️ Wisdom tested", "The phrase helps the reader listen critically."],
      [`${phrase} shows speech becoming part of the trial.`, "Job's pain is hard enough, but the explanations around him add another burden.", "🗣️ Words\n🔥 Pressure\n💛 Discernment needed", "The phrase teaches that comfort can fail when it speaks too quickly."],
      [`${phrase} brings the debate into view.`, "The friends try to explain suffering, while Job keeps wrestling with what he knows and what he feels.", "🗣️ Debate\n⚖️ Assumptions\n💧 Real pain", "The phrase helps a beginner follow the argument."],
      [`${phrase} reminds the reader that speech has weight.`, "Words can comfort, accuse, correct, or wound. Job's dialogues show why careful listening matters.", "🗣️ Speech\n💧 Grief nearby\n⚖️ Wisdom needed", "The phrase keeps the card focused on the spoken exchange."]
    ],
    justice: [
      [`${phrase} raises the question of justice.`, "Job wrestles with why the righteous suffer and why the wicked can seem secure.", "⚖️ Justice questioned\n💧 Pain present\n🙏 God addressed", "The phrase helps the reader see why Job refuses easy answers."],
      [`${phrase} brings moral language into suffering.`, "The question is not only that Job hurts. He is trying to understand pain, guilt, innocence, and God's rule.", "⚖️ Right and wrong\n🔥 Trial\n🧭 Meaning sought", "The phrase keeps the discussion connected to justice."],
      [`${phrase} presses the reader to think about righteousness.`, "Job's speeches and the friends' replies keep circling around whether suffering always proves guilt.", "⚖️ Righteousness\n🗣️ Accusation\n💧 Suffering", "The phrase helps a beginner see the central debate."],
      [`${phrase} places the pain before a moral question.`, "Job wants his case heard because his suffering does not fit simple formulas.", "⚖️ A case to plead\n💧 A wounded man\n🙏 God as judge", "The phrase gives shape to Job's complaint."]
    ],
    detail: [
      [`${phrase} gives the reader a concrete detail to notice.`, "The wording may look small, but it helps locate the scene, the speaker, or the movement of the story.", "✨ Detail noticed\n📜 Text followed\n🧭 Scene clearer", "The phrase keeps the explanation anchored to the exact Bible wording."],
      [`${phrase} works like a handle on the passage.`, "A beginner can use the phrase to understand who is speaking, what is changing, or why the moment matters.", "🔎 Phrase observed\n🧭 Context opened\n💛 Meaning clarified", "The phrase helps the reader stay close to the text."],
      [`${phrase} opens a specific detail in the passage.`, "Esther and Job both teach through repeated details, named people, timing, and careful speech.", "📜 Bible wording\n🕯️ Hidden significance\n🧭 Story movement", "The detail is part of how the passage carries meaning."],
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

function selectPhrases(chunk: ApiVerse[]) {
  const clauses = chunk.flatMap(candidatesFromVerse);
  const windows = chunk.flatMap(windowPhrases);
  return [...new Set([...clauses, ...windows])].sort((a, b) => scorePhrase(b) - scorePhrase(a)).slice(0, 4);
}

function tryMakeSection(book: Book, chapter: number, chunk: ApiVerse[], sectionIndex: number) {
  const phrases = selectPhrases(chunk);
  if (phrases.length < 4) return null;
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

type EstherJobPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Esther" | "Job" };

const sections = [
${serialize(sections)}
] as const satisfies readonly EstherJobPhraseSectionInput[];

export const ESTHER_1_10_PERSONAL_SECTIONS = sections.filter((section) => section.book === "Esther");
export const JOB_1_10_PERSONAL_SECTIONS = sections.filter((section) => section.book === "Job");
`;
  writeFileSync("lib/estherOneToJobTenPersonalNotes.ts", file);
  console.log(`Wrote ${sections.length} sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
