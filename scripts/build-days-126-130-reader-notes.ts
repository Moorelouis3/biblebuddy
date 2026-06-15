import { writeFileSync } from "fs";

type BookName = "Job" | "Psalms";

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

const jobChapters = Array.from({ length: 12 }, (_, index) => index + 31);
const psalmChapters = Array.from({ length: 6 }, (_, index) => index + 1);

const sectionIcons = ["⚖️", "🕯️", "🌩️", "👑", "🧭", "🔥", "📜", "💧", "🛡️", "🌱", "🎶", "🙏", "🌙", "☀️"];
const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also)\b/i;
const badEnd = new Set(["and", "as", "at", "be", "because", "both", "but", "by", "for", "from", "hath", "he", "his", "in", "into", "is", "of", "on", "that", "the", "their", "there", "to", "unto", "was", "when", "which", "with"]);

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
      if (index > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

function trimPhrase(raw: string) {
  let phrase = normalize(raw)
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/[:;,.!?]+$/g, "")
    .replace(badStart, "")
    .trim();

  const specials = [
    "I made a covenant with mine eyes",
    "I put on righteousness",
    "The Spirit of God hath made me",
    "The breath of the Almighty hath given me life",
    "God speaketh once",
    "Out of the whirlwind",
    "Where wast thou when I laid the foundations of the earth",
    "Hast thou commanded the morning",
    "He beholdeth all high things",
    "I know that thou canst do every thing",
    "I have heard of thee by the hearing of the ear",
    "Now mine eye seeth thee",
    "The LORD turned the captivity of Job",
    "The LORD blessed the latter end of Job more than his beginning",
    "Blessed is the man",
    "Nor sitteth in the seat of the scornful",
    "His delight is in the law of the LORD",
    "He shall be like a tree planted by the rivers of water",
    "The LORD knoweth the way of the righteous",
    "Why do the heathen rage",
    "Yet have I set my king upon my holy hill of Zion",
    "Thou art my Son",
    "Kiss the Son",
    "LORD how are they increased that trouble me",
    "Thou O LORD art a shield for me",
    "I laid me down and slept",
    "Hear me when I call",
    "Commune with your own heart upon your bed",
    "I will both lay me down in peace",
    "Give ear to my words O LORD",
    "Lead me O LORD in thy righteousness",
    "Let all those that put their trust in thee rejoice",
    "O LORD rebuke me not in thine anger",
    "Heal me for my bones are vexed",
    "The LORD hath heard the voice of my weeping",
  ];

  const lower = phrase.toLowerCase();
  const special = specials.find((item) => lower.startsWith(item.toLowerCase()));
  if (special) return titleCase(special);
  if (lower.includes("the lord blessed the latter end of job more than his beginning")) {
    return "The LORD Blessed the Latter End of Job More Than His Beginning";
  }

  let words = phrase.split(/\s+/).filter(Boolean).slice(0, 11);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  phrase = words.join(" ");
  return titleCase(phrase);
}

function wordCount(phrase: string) {
  return phrase.split(/\s+/).filter(Boolean).length;
}

function isWeakPhrase(phrase: string) {
  const lower = phrase.toLowerCase();
  if (wordCount(phrase) < 4) return true;
  if (wordCount(phrase) > 13) return true;
  if (/^(then|and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because)\b/.test(lower)) return true;
  if (/^(job answered|elihu answered|the lord answered|and he said|and said|then answered)\b/.test(lower)) return true;
  if (/\b(and|or|of|to|unto|with|from|in|on|by|that|which|when|because|the|his|their)$/i.test(phrase)) return true;
  return false;
}

function candidateSetsFromVerse(verse: ApiVerse) {
  const clauses = normalize(verse.text)
    .split(/[,;:.!?]/)
    .map(trimPhrase)
    .filter((phrase) => !isWeakPhrase(phrase));

  const words = normalize(verse.text).replace(/[;:,.!?()"']/g, "").split(/\s+/).filter(Boolean);
  const windows: string[] = [];
  for (let index = 0; index < words.length; index += 3) {
    const phrase = trimPhrase(words.slice(index, index + 8).join(" "));
    if (!isWeakPhrase(phrase)) windows.push(phrase);
  }

  return { clauses, windows };
}

function category(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (book === "Psalms") {
    if (/\b(lord|god|son|king|zion|holy|mercy|salvation|righteousness)\b/.test(lower)) return "psalmGod";
    if (/\b(blessed|delight|law|righteous|way|tree|fruit|prosper)\b/.test(lower)) return "psalmWisdom";
    if (/\b(enemies|heathen|rage|wicked|ungodly|scornful|anger|trouble|workers)\b/.test(lower)) return "psalmConflict";
    if (/\b(hear|call|cry|prayer|voice|trust|rejoice|peace|sleep|weeping|heal)\b/.test(lower)) return "psalmPrayer";
    return "psalmDetail";
  }

  if (/\b(covenant|righteousness|integrity|heart|eyes|steps|walked|poor|widow|fatherless|stranger|cause)\b/.test(lower)) return "integrity";
  if (/\b(elihu|wrath|answered|words|knowledge|mouth|doctrine|speak|speech)\b/.test(lower)) return "speech";
  if (/\b(god|lord|almighty|spirit|breath|maker|heaven|thunder|voice|majesty)\b/.test(lower)) return "god";
  if (/\b(whirlwind|earth|morning|sea|cloud|snow|hail|stars|light|darkness|rain|behemoth|leviathan|eagle|horse)\b/.test(lower)) return "creation";
  if (/\b(sin|wicked|judgment|justice|iniquity|hypocrite|righteous|condemn|justify)\b/.test(lower)) return "justice";
  if (/\b(soul|grief|weeping|affliction|trouble|death|grave|destruction|bones)\b/.test(lower)) return "lament";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  return {
    integrity: "⚖️",
    speech: "🗣️",
    god: "🙏",
    creation: "🌩️",
    justice: "📜",
    lament: "💧",
    detail: "🔎",
    psalmGod: "👑",
    psalmWisdom: "🌱",
    psalmConflict: "🛡️",
    psalmPrayer: "🙏",
    psalmDetail: "🎶",
  }[category(book, phrase)];
}

function scorePhrase(book: BookName, phrase: string) {
  let score = isWeakPhrase(phrase) ? -100 : 0;
  const lower = phrase.toLowerCase();
  if (book === "Job") {
    if (/\b(covenant|righteousness|integrity|elihu|spirit|almighty|whirlwind|foundations|morning|behemoth|leviathan|captivity|blessed)\b/.test(lower)) score += 30;
    if (/\b(eyes|heart|poor|widow|fatherless|words|knowledge|voice|thunder|earth|sea|stars|repent|dust|ashes)\b/.test(lower)) score += 14;
  } else {
    if (/\b(blessed|law of the lord|tree planted|heathen rage|my king|thou art my son|kiss the son|shield|slept|peace|give ear|heal me)\b/.test(lower)) score += 32;
    if (/\b(lord|righteous|wicked|trust|rejoice|prayer|salvation|mercy|bed)\b/.test(lower)) score += 16;
  }
  const words = wordCount(phrase);
  if (words >= 4 && words <= 9) score += 8;
  return score;
}

function bullets(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const clean = phrase.replace(/\bLORD\b/g, "LORD");
  const bulletMap: Record<string, string[]> = {
    integrity: ["⚖️ Moral testing", "👁️ Hidden motives", "🤲 Neighbor love", "📜 Account before God"],
    speech: ["🗣️ Speaker identified", "👂 Words weighed", "📜 Argument followed", "🧭 Debate clarified"],
    god: ["🙏 God is central", "🌬️ Life comes from Him", "👑 He judges rightly", "🕯️ Human limits exposed"],
    creation: ["🌩️ Creation speaks", "🌊 Human smallness", "👑 God's rule", "🧭 Wonder before answers"],
    justice: ["📜 Right and wrong", "⚖️ Judgment weighed", "🧭 Easy answers tested", "🙏 God sees fully"],
    lament: ["💧 Pain named", "🦴 Suffering felt", "🙏 Grief brought to God", "🕯️ Hope still sought"],
    detail: ["🔎 Exact wording", "📖 Scene followed", "🧭 Meaning located", "🕯️ Reader slowed down"],
    psalmGod: ["👑 The LORD reigns", "🕯️ His character leads", "🙏 Worship responds", "🛡️ Refuge is found"],
    psalmWisdom: ["🌱 Two ways compared", "📜 God's word loved", "🧭 Life directed", "🍎 Fruit over time"],
    psalmConflict: ["🛡️ Trouble is real", "⚖️ Rebellion exposed", "👑 God still rules", "🙏 Safety sought"],
    psalmPrayer: ["🙏 Prayer spoken", "💧 Need brought honestly", "🌙 Trust in the night", "🕯️ Peace received"],
    psalmDetail: ["🎶 Psalm language", "📖 Phrase noticed", "🧭 Heart directed", "🙏 Worship made plain"],
  };

  const list = bulletMap[kind] || bulletMap.detail;
  if (/tree planted/i.test(clean)) return ["🌱 Planted stability", "💧 Rivers of water", "🍎 Fruit in season", "🍃 Life that does not wither"];
  if (/whirlwind/i.test(clean)) return ["🌩️ Storm setting", "👑 God speaks", "🕯️ Job listens", "🧭 Questions become worship"];
  if (/leviathan|behemoth/i.test(clean)) return ["🐾 Powerful creature", "🌍 Created strength", "👑 God alone rules", "🕯️ Job's limits exposed"];
  if (/covenant with mine eyes/i.test(clean)) return ["👁️ Eyes disciplined", "⚖️ Desire judged", "🧭 Integrity guarded", "🙏 God sees the private life"];
  return list;
}

function explainJob(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/covenant with mine eyes/.test(lower)) {
    return note([
      `${phrase} means Job made a serious promise about what he would allow his eyes to desire.`,
      "He is not only defending public behavior. He is saying integrity reaches into private thoughts and hidden looks.",
      bullets("Job", phrase).join("\n"),
      "A beginner should see that Job's defense is not casual. He is asking God to examine the inner life as well as outward actions.",
    ]);
  }
  if (/put on righteousness|clothed me/.test(lower)) {
    return note([
      `${phrase} pictures righteousness like clothing Job wore openly.`,
      "Job is saying justice was not a decoration for rare moments. It shaped how people recognized his life.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps readers understand why Job cannot accept the charge that his suffering proves secret cruelty.",
    ]);
  }
  if (/spirit of god hath made me|breath of the almighty/.test(lower)) {
    return note([
      `${phrase} teaches that Elihu sees human life as a gift from God Himself.`,
      "Before Elihu corrects Job, he admits that his own breath and existence come from the Almighty.",
      bullets("Job", phrase).join("\n"),
      "The phrase keeps Elihu's speech from sounding like mere opinion. He is speaking under the truth that people live because God gives life.",
    ]);
  }
  if (/god speaketh once|in a dream|openeth the ears/.test(lower)) {
    return note([
      `${phrase} explains Elihu's claim that God can warn people in more than one way.`,
      "Elihu believes God is not silent just because people do not notice the form of His warning.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a reader follow Elihu's point: God may use dreams, pain, and correction to pull a person back from pride.",
    ]);
  }
  if (/out of the whirlwind/.test(lower)) {
    return note([
      `${phrase} marks the moment God finally answers Job.`,
      "The whirlwind is not a soft classroom setting. It surrounds God's speech with power, awe, and holy seriousness.",
      bullets("Job", phrase).join("\n"),
      "The phrase tells the reader to listen differently now. The debate has ended, and the Creator is speaking.",
    ]);
  }
  if (/where wast thou|foundations of the earth|commanded the morning/.test(lower)) {
    return note([
      `${phrase} turns Job's attention from his courtroom questions to God's creation wisdom.`,
      "God is not avoiding Job. He is showing that Job cannot govern the world or see all that God sees.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a beginner understand God's answer: Job does not get every explanation, but he is brought before the One who rules everything wisely.",
    ]);
  }
  if (/behemoth|leviathan|he beholdeth all high things/.test(lower)) {
    return note([
      `${phrase} points to created power that Job cannot tame or command.`,
      "God uses mighty creatures to show the difference between human limits and divine rule.",
      bullets("Job", phrase).join("\n"),
      "The phrase is not random animal detail. It teaches Job that proud strength in creation still belongs under God's authority.",
    ]);
  }
  if (/i know that thou canst do every thing|now mine eye seeth thee|dust and ashes/.test(lower)) {
    return note([
      `${phrase} is Job's humbled response after hearing the LORD.`,
      "Job does not pretend his pain was small. But he stops speaking as though he can judge the whole order of God's world.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps readers see repentance as a return to reverence when God's greatness becomes clear.",
    ]);
  }
  if (/turned the captivity of job|blessed the latter end/.test(lower)) {
    return note([
      `${phrase} shows the LORD restoring Job after the long season of loss and accusation.`,
      "The ending does not erase the suffering, but it does reveal that Job's story was never abandoned by God.",
      bullets("Job", phrase).join("\n"),
      "The phrase helps a beginner see that restoration belongs to the LORD, not to the friends' shallow explanations.",
    ]);
  }

  const kind = category("Job", phrase);
  const openings: Record<string, string> = {
    integrity: `${phrase} belongs to Job's final defense of his integrity.`,
    speech: `${phrase} helps identify how the speeches in Job are moving.`,
    god: `${phrase} puts God, not human opinion, at the center of the argument.`,
    creation: `${phrase} draws the reader into God's wisdom over the created world.`,
    justice: `${phrase} presses the justice question that runs through Job.`,
    lament: `${phrase} gives language to suffering instead of hiding it.`,
    detail: `${phrase} gives the reader a concrete handle on this part of Job.`,
  };
  const second: Record<string, string> = {
    integrity: "Job is asking to be weighed honestly, not judged by the friends' simple formula that suffering must prove guilt.",
    speech: "The book is careful about who is speaking, because each speaker brings a different kind of counsel or correction.",
    god: "Job and his friends have spoken many words, but the book keeps pulling the reader back to the God who knows more than they do.",
    creation: "The creation language widens the scene until Job's suffering is held before the Creator of the whole world.",
    justice: "The phrase matters because Job is wrestling with righteousness, guilt, and God's government of the world.",
    lament: "The pain is not treated as an abstract idea. It is voiced in words a suffering person can actually say.",
    detail: "The wording may feel small, but it keeps the reader close to the exact movement of the passage.",
  };
  const closing: Record<string, string> = {
    integrity: "That matters because Job is asking God to weigh his conduct, not letting the friends define him from his pain alone.",
    speech: "That helps a beginner track the debate instead of blending every speaker into one voice.",
    god: "That matters because Job's story cannot be understood without remembering that God sees more than every human speaker.",
    creation: "That helps the reader feel the scale of God's wisdom before trying to solve Job's suffering too quickly.",
    justice: "That keeps the question honest: righteousness, guilt, suffering, and God's rule are all being weighed.",
    lament: "That helps the reader hear grief as part of faithful wrestling, not as something to skip.",
    detail: "That small handle keeps the reader attached to the actual wording of Job.",
  };

  return note([openings[kind], second[kind], bullets("Job", phrase).join("\n"), closing[kind]]);
}

function explainPsalm(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/blessed is the man/.test(lower)) {
    return note([
      `${phrase} opens the Psalms by describing the life God calls truly blessed.`,
      "Blessing here is not luck. It is the settled good of walking in God's way instead of being shaped by wicked counsel.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see that Psalms begins with a choice of paths.",
    ]);
  }
  if (/delight is in the law of the lord|tree planted/.test(lower)) {
    return note([
      `${phrase} shows that the blessed life is rooted in God's instruction.`,
      "The picture is slow and living: roots by water, fruit in season, and a life that does not dry up when pressure comes.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps a beginner connect meditation on God's word with a life that grows over time.",
    ]);
  }
  if (/why do the heathen rage|set my king|thou art my son|kiss the son/.test(lower)) {
    return note([
      `${phrase} belongs to Psalm 2's picture of nations resisting the LORD's appointed King.`,
      "The psalm does not panic over rebellion. It shows God ruling above it and calling people to submit with wisdom.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers understand why Psalm 2 became so important for reading the Messiah and God's kingdom.",
    ]);
  }
  if (/shield for me|laid me down and slept|salvation belongeth unto the lord/.test(lower)) {
    return note([
      `${phrase} turns danger into trust before the LORD.`,
      "David is surrounded by trouble, yet he speaks as someone guarded by God, not controlled by fear.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see faith praying in the middle of pressure, not only after pressure is gone.",
    ]);
  }
  if (/commune with your own heart|lay me down in peace|put gladness in my heart/.test(lower)) {
    return note([
      `${phrase} teaches quiet trust when the day is ending and the heart is still stirred up.`,
      "Psalm 4 does not deny distress. It brings distress into prayer until peace becomes possible.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps a beginner see that biblical peace is not pretending; it is resting under God's care.",
    ]);
  }
  if (/give ear to my words|lead me o lord|trust in thee rejoice/.test(lower)) {
    return note([
      `${phrase} shows prayer asking God for attention, guidance, and refuge.`,
      "Psalm 5 is morning prayer shaped by God's holiness and by the danger of wickedness around the worshiper.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers hear prayer as dependence: God must lead, protect, and make the way straight.",
    ]);
  }
  if (/rebuke me not|heal me|voice of my weeping|depart from me/.test(lower)) {
    return note([
      `${phrase} gives a suffering person words to bring weakness before God.`,
      "Psalm 6 is honest about fear, pain, tears, and the need for mercy.",
      bullets("Psalms", phrase).join("\n"),
      "The phrase helps readers see that lament is not faithlessness. It is pain turning toward the LORD.",
    ]);
  }

  const kind = category("Psalms", phrase);
  const openings: Record<string, string> = {
    psalmGod: `${phrase} directs the reader's attention to the LORD's rule and character.`,
    psalmWisdom: `${phrase} helps explain the wise path Psalm 1 sets before the reader.`,
    psalmConflict: `${phrase} names real opposition without making trouble the final word.`,
    psalmPrayer: `${phrase} gives prayer language for need, fear, trust, or joy.`,
    psalmDetail: `${phrase} carries one concrete movement in the psalm's worship language.`,
  };
  const second: Record<string, string> = {
    psalmGod: "The psalm teaches readers to measure life from God's throne, not from the noise of circumstances.",
    psalmWisdom: "The wording contrasts a life rooted in God with a life carried along by wickedness.",
    psalmConflict: "The psalm is honest about enemies, rebellion, and distress while still looking to the LORD.",
    psalmPrayer: "The phrase matters because Psalms teaches people how to bring the whole heart before God.",
    psalmDetail: "The line may be brief, but it helps the reader follow the psalm's movement from trouble toward trust.",
  };
  const closing: Record<string, string> = {
    psalmGod: "That matters because the psalm teaches worship before it teaches technique.",
    psalmWisdom: "That helps a beginner see the Psalms as a guide for the whole life, not only private emotion.",
    psalmConflict: "That keeps the reader from thinking faith means there is no pressure, no enemies, and no fear.",
    psalmPrayer: "That helps readers learn how to pray with their actual heart in front of God.",
    psalmDetail: "That small line helps the reader stay inside the song instead of jumping to a broad topic.",
  };

  return note([openings[kind], second[kind], bullets("Psalms", phrase).join("\n"), closing[kind]]);
}

function explain(book: BookName, phrase: string) {
  return book === "Job" ? explainJob(phrase) : explainPsalm(phrase);
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 5) {
    chunks.push(verses.slice(index, index + 5));
  }
  if (chunks.length > 1 && chunks[chunks.length - 1].length < 3) {
    const last = chunks.pop()!;
    const previous = chunks.pop()!;
    const keep = Math.max(3, previous.length - last.length);
    chunks.push(previous.slice(0, keep));
    chunks.push([...previous.slice(keep), ...last]);
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

function cleanFallbackWindow(phrase: string) {
  const lower = phrase.toLowerCase();
  if (/\b(and if|why then should i|that i should|but the way|and in his law)\b/.test(lower) && !/^(why|but)\b/.test(lower)) return false;
  if (/^(eyes|heart|way|law|righteous|wicked|almighty|lord|god)\b/i.test(phrase) && wordCount(phrase) > 6) return false;
  return true;
}

function selectPhrases(book: BookName, chunk: ApiVerse[]) {
  const sets = chunk.map(candidateSetsFromVerse);
  const clausePool = [...new Set(sets.flatMap((set) => set.clauses))].sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const windowPool = [...new Set(sets.flatMap((set) => set.windows).filter(cleanFallbackWindow))].sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const selected: string[] = [];

  for (const phrase of clausePool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 6) return selected;
  }

  if (selected.length >= 4) return selected;

  for (const phrase of windowPool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 6) return selected;
  }

  return selected;
}

function makeSection(book: BookName, chapter: number, chunk: ApiVerse[], sectionIndex: number): Section | null {
  const phrases = selectPhrases(book, chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk[chunk.length - 1].verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  const title = phrases[0];
  const icon = sectionIcons[(chapter + startVerse + sectionIndex) % sectionIcons.length];
  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title,
    icon,
    phrases: phrases.map((phrase) => [`${phraseIcon(book, phrase)} ${phrase}`, explain(book, phrase)]),
  };
}

async function getChapter(book: BookName, chapter: number) {
  const apiBook = book === "Psalms" ? "Psalm" : book;
  const url = `https://bible-api.com/${encodeURIComponent(`${apiBook} ${chapter}`)}?translation=kjv`;
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
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  return sections;
}

async function main() {
  const jobSections = await buildBook("Job", jobChapters);
  const psalmSections = await buildBook("Psalms", psalmChapters);

  writeFileSync(
    "lib/jobThirtyOneToFortyTwoPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type JobPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Job" };

export const JOB_31_42_PERSONAL_SECTIONS = [
${serialize(jobSections)}
] as const satisfies readonly JobPhraseSectionInput[];
`,
  );

  writeFileSync(
    "lib/psalmsOneToSixPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type PsalmsPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Psalms" };

export const PSALMS_1_6_PERSONAL_SECTIONS = [
${serialize(psalmSections)}
] as const satisfies readonly PsalmsPhraseSectionInput[];
`,
  );

  console.log(`Wrote ${jobSections.length} Job sections and ${psalmSections.length} Psalms sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
