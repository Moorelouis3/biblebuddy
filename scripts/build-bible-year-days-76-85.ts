import { writeFileSync } from "fs";

type ApiVerse = {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type DayPlan = {
  day: number;
  title: string;
  reference: string;
  readings: Array<{ book: string; chapters: number[] }>;
};

const e = (...codes: number[]) => String.fromCodePoint(...codes);

const I = {
  altar: e(0x1f54d),
  ark: e(0x1f4e6),
  battle: e(0x2694, 0xfe0f),
  book: e(0x1f4d6),
  city: e(0x1f3d9, 0xfe0f),
  cloud: e(0x2601, 0xfe0f),
  crown: e(0x1f451),
  dove: e(0x1f54a, 0xfe0f),
  fire: e(0x1f525),
  heart: e(0x1f49b),
  house: e(0x1f3e0),
  key: e(0x1f511),
  lamp: e(0x1fa94),
  lion: e(0x1f981),
  mountain: e(0x26f0, 0xfe0f),
  prayer: e(0x1f64f),
  scroll: e(0x1f4dc),
  shield: e(0x1f6e1, 0xfe0f),
  sorrow: e(0x1f622),
  spark: e(0x2728),
  sword: e(0x1f5e1, 0xfe0f),
  table: e(0x1f37d, 0xfe0f),
  temple: e(0x1f3db, 0xfe0f),
  trumpet: e(0x1f3ba),
  warning: e(0x26a0, 0xfe0f),
  water: e(0x1f4a7),
  wisdom: e(0x1f9e0),
};

const sectionIcons = [I.crown, I.sword, I.scroll, I.house, I.prayer, I.fire, I.city, I.shield, I.temple, I.wisdom, I.warning, I.heart];
const phraseIcons = [I.spark, I.scroll, I.sword, I.shield, I.crown, I.house, I.prayer, I.heart, I.warning, I.city, I.key, I.sorrow, I.fire, I.wisdom, I.ark, I.altar];

const dayPlans: DayPlan[] = [
  { day: 76, title: "Saul Falls and David's Kingdom Begins", reference: "1 Samuel 31; 2 Samuel 1-3", readings: [{ book: "1 Samuel", chapters: [31] }, { book: "2 Samuel", chapters: [1, 2, 3] }] },
  { day: 77, title: "David's Throne and God's Promise", reference: "2 Samuel 4-7", readings: [{ book: "2 Samuel", chapters: [4, 5, 6, 7] }] },
  { day: 78, title: "David's Victories and David's Sin", reference: "2 Samuel 8-11", readings: [{ book: "2 Samuel", chapters: [8, 9, 10, 11] }] },
  { day: 79, title: "Consequences in David's House", reference: "2 Samuel 12-15", readings: [{ book: "2 Samuel", chapters: [12, 13, 14, 15] }] },
  { day: 80, title: "Absalom's Rebellion and David's Grief", reference: "2 Samuel 16-19", readings: [{ book: "2 Samuel", chapters: [16, 17, 18, 19] }] },
  { day: 81, title: "David's Later Reign and Mighty Men", reference: "2 Samuel 20-23", readings: [{ book: "2 Samuel", chapters: [20, 21, 22, 23] }] },
  { day: 82, title: "David's Census and Solomon's Wisdom", reference: "2 Samuel 24; 1 Kings 1-3", readings: [{ book: "2 Samuel", chapters: [24] }, { book: "1 Kings", chapters: [1, 2, 3] }] },
  { day: 83, title: "Solomon's Wisdom and Temple Preparations", reference: "1 Kings 4-7", readings: [{ book: "1 Kings", chapters: [4, 5, 6, 7] }] },
  { day: 84, title: "Temple Glory and Solomon's Fall", reference: "1 Kings 8-11", readings: [{ book: "1 Kings", chapters: [8, 9, 10, 11] }] },
  { day: 85, title: "The Kingdom Divides", reference: "1 Kings 12-15", readings: [{ book: "1 Kings", chapters: [12, 13, 14, 15] }] },
];

function titleCase(phrase: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return phrase
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (word === "LORD") return "LORD";
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").replace(/[“”]/g, "\"").trim();
}

function cleanPhrase(phrase: string) {
  return titleCase(
    phrase
      .replace(/["'()]/g, "")
      .replace(/[,\s]+$/g, "")
      .replace(/^\s*and\s+/i, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function phraseKey(phrase: string) {
  return phrase.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isNearDuplicatePhrase(key: string, seen: Set<string>) {
  if (!key) return true;
  for (const existing of seen) {
    if (existing === key) return true;
    if (key.length >= 14 && existing.startsWith(key)) return true;
    if (existing.length >= 14 && key.startsWith(existing)) return true;
    const keyWords = key.split(" ");
    const existingWords = existing.split(" ");
    if (keyWords.length >= 4 && existingWords.length >= 4 && keyWords.slice(0, 4).join(" ") === existingWords.slice(0, 4).join(" ")) return true;
  }
  return false;
}

function makePhraseCandidates(verse: ApiVerse) {
  const text = normalizeText(verse.text)
    .replace(/^And\s+/i, "And ")
    .replace(/^But\s+/i, "But ");
  const pieces = text
    .split(/[,;:.!?]|\s+and\s+/i)
    .map((piece) => piece.trim())
    .filter((piece) => piece.split(/\s+/).length >= 3)
    .map((piece) => piece.replace(/^And\s+/i, "And ").replace(/\s+$/g, ""));
  const titled = pieces.map(cleanPhrase);
  const extra: string[] = [];
  const words = text.replace(/["'()]/g, "").split(/\s+/).filter(Boolean);
  for (let index = 0; index + 3 <= words.length; index += 3) {
    extra.push(cleanPhrase(words.slice(index, Math.min(index + 5, words.length)).join(" ")));
  }
  return titled.length >= 2
    ? titled.filter((phrase) => phrase.split(/\s+/).length >= 3).slice(0, 2)
    : [...titled, ...extra].filter((phrase) => phrase.split(/\s+/).length >= 3).slice(0, 4);
}

function phraseIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("lord") || t.includes("god")) return I.prayer;
  if (t.includes("king") || t.includes("throne") || t.includes("reign") || t.includes("crown")) return I.crown;
  if (t.includes("sword") || t.includes("battle") || t.includes("smote") || t.includes("war") || t.includes("host")) return I.sword;
  if (t.includes("house") || t.includes("build") || t.includes("dwelt")) return I.house;
  if (t.includes("ark") || t.includes("covenant")) return I.ark;
  if (t.includes("altar") || t.includes("sacrifice") || t.includes("offered")) return I.altar;
  if (t.includes("heart") || t.includes("love")) return I.heart;
  if (t.includes("wisdom") || t.includes("understanding")) return I.wisdom;
  if (t.includes("jerusalem") || t.includes("hebron") || t.includes("shechem") || t.includes("city")) return I.city;
  if (t.includes("cloud") || t.includes("glory") || t.includes("temple")) return I.temple;
  if (t.includes("died") || t.includes("wept") || t.includes("mourn") || t.includes("slain")) return I.sorrow;
  if (t.includes("command") || t.includes("word") || t.includes("said")) return I.scroll;
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return phraseIcons[hash % phraseIcons.length];
}

function phraseIconUnique(title: string, used: Set<string>) {
  const preferred = phraseIcon(title);
  if (!used.has(preferred)) {
    used.add(preferred);
    return preferred;
  }
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  for (let offset = 1; offset <= phraseIcons.length; offset += 1) {
    const icon = phraseIcons[(hash + offset) % phraseIcons.length];
    if (!used.has(icon)) {
      used.add(icon);
      return icon;
    }
  }
  return preferred;
}

function explain(title: string, book: string, chapter: number) {
  const t = title.toLowerCase();
  const words = title.split(/\s+/).filter(Boolean);
  const shortTitle = words.slice(0, 5).join(" ");
  let meaning = `${title} is action language. It tells the reader what is being done, moved, received, or decided in the scene.`;
  let support = `The phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.`;
  let bullets = [`${I.book} Exact action`, `${I.key} Story movement`, `${phraseIcon(title)} Detail with meaning`];
  let close = `This helps the reader follow the passage by watching what actually happens, step by step.`;

  if (/\b(whence|who art thou|what is|wherefore|why|how)\b/i.test(title)) {
    meaning = `${title} is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.`;
    support = "Questions in these chapters often expose what is hidden in a person's heart or in the political situation.";
    bullets = [`${I.key} Identity being tested`, `${I.scroll} Words under pressure`, `${I.heart} Motives coming out`];
    close = "The question helps the reader listen carefully before judging the scene too quickly.";
  } else if (t.includes("hear thou") || t.includes("prayer") || t.includes("supplication")) {
    meaning = `${title} is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.`;
    support = "The temple is important, but Solomon knows God is not trapped inside a building.";
    bullets = [`${I.prayer} God hears`, `${I.temple} Temple worship`, `${I.heart} Mercy needed`];
    close = "The phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears.";
  } else if (t.includes("forgive") || t.includes("sinned") || t.includes("transgressions") || t.includes("transgressed")) {
    meaning = `${title} is forgiveness language. It names sin honestly and asks God to show mercy to guilty people.`;
    support = "Solomon does not pretend Israel will obey perfectly. He builds repentance and mercy into his prayer.";
    bullets = [`${I.warning} Sin named`, `${I.prayer} Mercy requested`, `${I.scroll} Covenant hope`];
    close = "The phrase matters because God's people need more than a temple; they need forgiveness from the LORD.";
  } else if (t.includes("stranger") || t.includes("all people of the earth") || t.includes("nations")) {
    meaning = `${title} points beyond Israel. A stranger is someone from outside the covenant nation who comes seeking the LORD.`;
    support = "Solomon's prayer looks outward so other nations can know God's name and fear Him.";
    bullets = [`${I.city} Nations included`, `${I.prayer} Prayer welcomed`, `${I.scroll} God's name known`];
    close = "The phrase helps the reader see that God's temple was meant to display His glory beyond one nation.";
  } else if (t.includes("hallowed") || t.includes("my name") || t.includes("thy name") || t.includes("name be magnified")) {
    meaning = `${title} is name language. In the Bible, God's name represents His character, authority, reputation, and presence.`;
    support = "To hallow God's name means to treat Him as holy, honored, and set apart from every false god.";
    bullets = [`${I.prayer} God's character`, `${I.temple} Holy worship`, `${I.key} His reputation`];
    close = "The phrase teaches the reader that worship is about honoring who the LORD truly is.";
  } else if (t.includes("statutes") || t.includes("commandments") || t.includes("walk in his") || t.includes("perfect with the lord")) {
    meaning = `${title} is obedience language. To walk in God's statutes means to live according to His commands.`;
    support = "The word walk pictures a daily pattern, not a one-time religious moment.";
    bullets = [`${I.scroll} God's commands`, `${I.heart} Whole-heart loyalty`, `${I.key} Daily direction`];
    close = "The phrase helps the reader see that temple worship was meant to lead to faithful living.";
  } else if (t.includes("sacrifice") || t.includes("offerings") || t.includes("altar") || t.includes("burnt offerings") || t.includes("peace offerings")) {
    meaning = `${title} is worship language. It points to offerings brought before the LORD as part of Israel's worship.`;
    support = "Sacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.";
    bullets = [`${I.altar} Altar worship`, `${I.fire} Offering given`, `${I.prayer} Drawing near to God`];
    close = "The phrase keeps the reader focused on worship, not just royal ceremony.";
  } else if (t.includes("rest unto his people") || t.includes("given rest")) {
    meaning = `${title} means God has brought His people into a settled place after danger, wandering, and conflict.`;
    support = "Rest is more than taking a break. It is peace and stability that come from God's promise being kept.";
    bullets = [`${I.house} Settled people`, `${I.prayer} Promise kept`, `${I.heart} Peace after conflict`];
    close = "The phrase helps the reader see temple dedication as a moment of gratitude for God's faithfulness.";
  } else if (t.includes("wisdom") || t.includes("understanding") || t.includes("wise") || t.includes("discern")) {
    meaning = `${title} is wisdom language. It is about seeing clearly, judging rightly, and leading with understanding.`;
    support = "Solomon's wisdom is not meant to make him impressive only; it is meant to help him govern God's people well.";
    bullets = [`${I.wisdom} Discernment`, `${I.crown} Leadership`, `${I.scroll} Right judgment`];
    close = "The phrase helps the reader see why wisdom matters for a king.";
  } else if (t.includes("gold") || t.includes("silver") || t.includes("talents") || t.includes("chariots") || t.includes("horses") || t.includes("navy of ships")) {
    meaning = `${title} is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.`;
    support = "These details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.";
    bullets = [`${I.crown} Royal wealth`, `${I.city} Kingdom reach`, `${I.warning} Power can tempt`];
    close = "The phrase helps the reader notice both the glory and the danger of Solomon's success.";
  } else if (t.includes("many strange women") || t.includes("turned away his heart") || t.includes("other gods") || t.includes("high places") || t.includes("ashtoreth") || t.includes("milcom") || t.includes("chemosh") || t.includes("molech")) {
    meaning = `${title} is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.`;
    support = "The tragedy is not only political. It is spiritual: divided love becomes divided worship.";
    bullets = [`${I.warning} Heart pulled away`, `${I.heart} Divided loyalty`, `${I.prayer} False worship`];
    close = "The phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning.";
  } else if (t.includes("lord") || t.includes("god")) {
    meaning = `${title} puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.`;
    support = "God's name reminds the reader that human power is always under divine authority.";
    bullets = [`${I.prayer} God's authority`, `${I.scroll} God's word`, `${I.key} God's purpose`];
    close = "The phrase teaches the reader to look for what God is doing beneath the visible drama.";
  } else if (t.includes("anointed")) {
    meaning = `${title} means Saul had been set apart for kingship by the LORD, even though Saul had failed badly.`;
    support = "David still treats that calling seriously because royal authority is not something to grab by violence.";
    bullets = [`${I.crown} Set apart as king`, `${I.warning} Not for revenge`, `${I.prayer} Answerable to God`];
    close = "The phrase explains why David refuses to celebrate Saul's death as a shortcut to the throne.";
  } else if (t.includes("king") || t.includes("throne") || t.includes("reign")) {
    meaning = `${title} is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.`;
    support = "In these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.";
    bullets = [`${I.crown} Authority`, `${I.house} A royal house`, `${I.warning} Leadership under God`];
    close = "The phrase helps the reader ask whether power is being received faithfully or seized selfishly.";
  } else if (t.includes("house")) {
    meaning = `${title} can mean a home, a family line, or a royal household, depending on the sentence.`;
    support = "That matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.";
    bullets = [`${I.house} Family line`, `${I.crown} Royal future`, `${I.scroll} Consequences carried forward`];
    close = "The phrase helps the reader see that leadership problems do not stay private.";
  } else if (t.includes("heart")) {
    meaning = `${title} points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.`;
    support = "The story is showing more than outward actions; it is showing what people love, fear, and pursue.";
    bullets = [`${I.heart} Desire`, `${I.key} Loyalty`, `${I.warning} Direction of life`];
    close = "The phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear.";
  } else if (t.includes("sword") || t.includes("battle") || t.includes("war") || t.includes("smote") || t.includes("slew") || t.includes("host") || t.includes("fought")) {
    meaning = `${title} is battle language. It shows conflict becoming physical, public, and costly.`;
    support = "War in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.";
    bullets = [`${I.sword} Conflict`, `${I.shield} Danger`, `${I.warning} Real consequences`];
    close = "The phrase helps the reader feel that sin and power struggles spill into real lives.";
  } else if (t.includes("fled") || t.includes("slain") || t.includes("fallen") || t.includes("fell") || t.includes("died") || t.includes("death") || t.includes("dead") || t.includes("mourn") || t.includes("wept")) {
    meaning = `${title} is grief or defeat language. It tells the reader that the story has reached a painful result.`;
    support = "The Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.";
    bullets = [`${I.sorrow} Loss`, `${I.warning} Consequence`, `${I.scroll} Sorrow named honestly`];
    close = "The phrase matters because God's story does not pretend broken leadership has no cost.";
  } else if (t.includes("men of israel") || t.includes("children of israel") || t.includes("judah") || t.includes("benjamin")) {
    meaning = `${title} focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.`;
    support = "When tribes and people groups are named, the reader should notice how public the consequences have become.";
    bullets = [`${I.city} The people`, `${I.crown} Public leadership`, `${I.warning} Shared consequences`];
    close = "The phrase helps the reader see the kingdom story as both personal and national.";
  } else if (t.includes("ark") || t.includes("covenant")) {
    meaning = `${title} points to God's covenant presence and promise among His people.`;
    support = "The ark and covenant language remind the reader that Israel's hope is deeper than military strength.";
    bullets = [`${I.ark} Covenant sign`, `${I.prayer} Holy presence`, `${I.scroll} Promises remembered`];
    close = "The phrase keeps worship and God's presence at the center of the kingdom story.";
  } else if (t.includes("altar") || t.includes("sacrifice") || t.includes("offered")) {
    meaning = `${title} is worship language. It shows people drawing near to God through sacrifice, surrender, or thanksgiving.`;
    support = "An altar is not decoration. It is a place where sin, gratitude, judgment, and mercy are brought before the LORD.";
    bullets = [`${I.altar} Worship`, `${I.fire} Sacrifice`, `${I.prayer} Seeking mercy`];
    close = "The phrase helps the reader see that the kingdom still needs worship more than appearance.";
  } else if (t.includes("wisdom") || t.includes("understanding") || t.includes("counsel")) {
    meaning = `${title} is about guidance, judgment, and knowing what should be done next.`;
    support = "Counsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.";
    bullets = [`${I.wisdom} Discernment`, `${I.scroll} Words that guide`, `${I.crown} Leadership decisions`];
    close = "The phrase teaches the reader that advice is never neutral when a kingdom is under pressure.";
  } else if (t.includes("jerusalem") || t.includes("hebron") || t.includes("gath") || t.includes("askelon") || t.includes("jordan") || t.includes("zion") || t.includes("jabesh")) {
    meaning = `${title} names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.`;
    support = "The location helps the reader follow where the conflict, mourning, or promise is moving.";
    bullets = [`${I.city} A real location`, `${I.key} A story marker`, `${I.scroll} Memory attached to place`];
    close = "The phrase keeps the Bible from feeling vague; these events happen in real places to real people.";
  } else if (t.includes("buried") || t.includes("bones")) {
    meaning = `${title} is burial language. It shows honor being given after shame, defeat, or death.`;
    support = "Burial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.";
    bullets = [`${I.sorrow} Death honored`, `${I.house} Community memory`, `${I.scroll} Sorrow handled with care`];
    close = "The phrase helps the reader see respect and grief in a chapter full of collapse.";
  } else if (t.includes("fasted")) {
    meaning = `${title} means the people stopped eating for a set time as a sign of grief, humility, and seriousness before God.`;
    support = "Fasting in a mourning scene shows that the loss touched the whole person, not only the emotions.";
    bullets = [`${I.sorrow} Mourning`, `${I.prayer} Humility`, `${I.scroll} Seven days marked off`];
    close = "The phrase helps the reader see that Israel responds to Saul's death with sober grief, not casual dismissal.";
  } else if (t.includes("said") || t.includes("spake") || t.includes("answered") || t.includes("called")) {
    meaning = `${title} marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.`;
    support = "The reader should pay attention because a sentence can expose the direction of a heart or a kingdom.";
    bullets = [`${I.scroll} Words spoken`, `${I.heart} Motives revealed`, `${I.key} The scene turns`];
    close = "The phrase teaches the reader to listen closely to what people say when pressure rises.";
  } else if (t.includes("david") || t.includes("saul") || t.includes("solomon") || t.includes("absalom") || t.includes("abner") || t.includes("joab") || t.includes("jonathan") || t.includes("ishbosheth") || t.includes("mephibosheth")) {
    meaning = `${title} keeps attention on a person whose choices affect more than himself.`;
    support = "In the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.";
    bullets = [`${I.crown} Leadership`, `${I.heart} Character revealed`, `${I.warning} Choices spread outward`];
    close = "The phrase helps the reader watch how one person's actions can bless or wound many others.";
  } else if (t.includes("came to pass") || t.includes("on the morrow") || t.includes("after this") || t.includes("third day")) {
    meaning = `${title} is timing language. It helps the reader know when the story has shifted to a new moment.`;
    support = "These small time markers keep the movement clear so the reader can follow cause, consequence, and response.";
    bullets = [`${I.key} A new moment`, `${I.scroll} Story movement`, `${I.warning} Consequences unfolding`];
    close = "The phrase reminds the reader that the Bible often teaches through sequence, not only through speeches.";
  }

  return [meaning, support, "", ...bullets, "", close].join("\n\n");
}

function explainSection(heading: string, reference: string, dayTitle: string) {
  const cleanHeading = heading.replace(/^. /u, "");
  const t = cleanHeading.toLowerCase();
  let line = `${cleanHeading} gives the listener the main phrase to watch while this section is read.`;
  if (t.includes("lord") || t.includes("god")) line = `${cleanHeading} keeps the LORD's authority in view while people make difficult choices.`;
  else if (t.includes("death") || t.includes("slain") || t.includes("fallen") || t.includes("wept")) line = `${cleanHeading} names sorrow directly, so the listener can feel the weight of what has happened.`;
  else if (t.includes("king") || t.includes("throne") || t.includes("reign")) line = `${cleanHeading} focuses on royal authority and the question of faithful leadership.`;
  else if (t.includes("david") || t.includes("saul") || t.includes("absalom") || t.includes("abner") || t.includes("joab")) line = `${cleanHeading} follows a person whose choices shape the wider kingdom story.`;
  else if (t.includes("battle") || t.includes("war") || t.includes("sword") || t.includes("fought")) line = `${cleanHeading} brings the listener into conflict where sin, courage, fear, and consequence become visible.`;
  else if (t.includes("jerusalem") || t.includes("hebron") || t.includes("jordan") || t.includes("zion")) line = `${cleanHeading} anchors the scene in a real place where the kingdom story moves forward.`;
  return [
    `${reference} belongs inside ${dayTitle}, but this section has its own focused movement.`,
    line,
    "Listen for the exact words, because the Bible often teaches through names, places, questions, grief, promises, and repeated actions.",
    "Before moving on, help the listener understand what the phrase means and why it changes the story.",
  ];
}

function sectionHeading(book: string, chapter: number, start: number, end: number, phrases: string[]) {
  const core = phrases[0]
    ?.replace(/^(And|But)\s+/i, "")
    .replace(/\bthat were\b/i, "were")
    .replace(/\bthat was\b/i, "was")
    .replace(/\bthat had\b/i, "had") || `${book} ${chapter}:${start}-${end}`;
  const weakEndings = new Set(["and", "as", "at", "but", "by", "for", "from", "in", "of", "on", "that", "the", "to", "unto", "when", "with"]);
  const words = core.split(" ").slice(0, 9);
  while (words.length > 3 && weakEndings.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

async function getChapter(book: string, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 5) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 2500 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function splitIntoChunks<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
}

function serialize(value: unknown) {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
}

async function main() {
  const chapterCache = new Map<string, ApiVerse[]>();
  for (const day of dayPlans) {
    for (const reading of day.readings) {
      for (const chapter of reading.chapters) {
        const apiChapter = await getChapter(reading.book, chapter);
        chapterCache.set(`${reading.book}:${chapter}`, apiChapter.verses);
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
    }
  }

  const allSections: Array<{
    book: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    reference: string;
    title: string;
    icon: string;
    phrases: Array<[string, string]>;
  }> = [];

  for (const [key, verses] of chapterCache) {
    const [book, chapterText] = key.split(":");
    const chapter = Number(chapterText);
    for (const [chunkIndex, chunk] of splitIntoChunks(verses, 6).entries()) {
      const candidates: string[] = [];
      for (const verse of chunk) candidates.push(...makePhraseCandidates(verse));
      const unique: string[] = [];
      const seen = new Set<string>();
      for (const phrase of candidates) {
        const key = phraseKey(phrase);
        if (isNearDuplicatePhrase(key, seen)) continue;
        unique.push(phrase);
        seen.add(key);
        if (unique.length === 4) break;
      }
      let fallbackVerseIndex = 0;
      while (unique.length < 4) {
        const verse = normalizeText(chunk[fallbackVerseIndex % chunk.length].text);
        const words = verse.replace(/["'()]/g, "").split(/\s+/).filter(Boolean);
        const start = fallbackVerseIndex % Math.max(1, words.length - 3);
        const fallback = cleanPhrase(words.slice(start, Math.min(start + 8, words.length)).join(" "));
        const fallbackKey = phraseKey(fallback);
        if (!isNearDuplicatePhrase(fallbackKey, seen) && fallback.split(/\s+/).length >= 3) {
          unique.push(fallback);
          seen.add(fallbackKey);
        }
        fallbackVerseIndex += 1;
        if (fallbackVerseIndex > chunk.length + 6) {
          const lastFallback = cleanPhrase(words.slice(Math.max(0, words.length - 8 - unique.length), words.length).join(" "));
          const lastKey = phraseKey(lastFallback);
          if (!isNearDuplicatePhrase(lastKey, seen) && lastFallback.split(/\s+/).length >= 3) {
            unique.push(lastFallback);
            seen.add(lastKey);
          }
        }
      }
      const startVerse = chunk[0].verse;
      const endVerse = chunk[chunk.length - 1].verse;
      const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
      allSections.push({
        book,
        chapter,
        startVerse,
        endVerse,
        reference,
        title: sectionHeading(book, chapter, startVerse, endVerse, unique),
        icon: sectionIcons[(chapter + chunkIndex) % sectionIcons.length],
        phrases: (() => {
          const usedIcons = new Set<string>();
          return unique.map((title) => [`${phraseIconUnique(title, usedIcons)} ${title}`, explain(title, book, chapter)] as [string, string]);
        })(),
      });
    }
  }

  const personalFile = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type RoyalPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Samuel" | "2 Samuel" | "1 Kings" };

const sections = ${serialize(allSections)} as const satisfies readonly RoyalPhraseSectionInput[];

export const FIRST_SAMUEL_31_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Samuel");
export const SECOND_SAMUEL_1_24_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Samuel");
export const FIRST_KINGS_1_15_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Kings");
`;

  const dayObjects = dayPlans.map((day) => {
    const refs = day.readings.flatMap((reading) => reading.chapters.map((chapter) => `${reading.book} ${chapter}`));
    const sections = day.readings.flatMap((reading) =>
      reading.chapters.flatMap((chapter) => allSections.filter((section) => section.book === reading.book && section.chapter === chapter)),
    );
    return { ...day, refs, sections };
  });

  const deepFile = `import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DaySection = {
  reference: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  heading: string;
  summary: string;
  teaching: readonly string[];
};

function makeLesson(dayNumber: number, title: string, reference: string, sections: readonly DaySection[], opening: string[], closing: string[]): BibleYearDailyLesson {
  return {
    dayNumber,
    title,
    reference,
    estimatedListenTime: "20-30 min",
    opening,
    sections: sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: [...section.teaching],
    })),
    closing,
  };
}

function makeDeepNotes(title: string, chapters: string[], intro: string[], sections: readonly DaySection[], closing: string[]) {
  return \`## Bible Reader Chapters Covered

\${chapters.map((chapter) => \`- \${chapter}\`).join("\\n")}

## Chapter Introduction

\${intro.join("\\n\\n")}

## Study Notes

\${sections.map((section) => \`\${section.reference} - \${section.heading}\\n\\n\${section.teaching.join("\\n\\n")}\`).join("\\n\\n")}

## Application & Reflection

\${closing.join("\\n\\n")}

The big idea is this: \${title} helps the reader follow the kingdom story with clear attention to God, covenant, wisdom, sin, mercy, and the need for faithful leadership.\`;
}

function makeStudySections(sections: readonly DaySection[]): BibleYearDeepStudySection[] {
  return sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: "book",
    summary: section.summary,
    markdown: \`## \${section.reference}

\${section.teaching.join("\\n\\n")}

## What This Means

This section should be read slowly.

The kingdom story is not just listing events.

It is teaching the reader how leadership, worship, sin, wisdom, and covenant promises shape the people of God.\`,
  }));
}

${dayObjects
  .map((day) => {
    const constName = `DAY_${day.day}_SECTIONS`;
    const sections = day.sections.map((section) => ({
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
      heading: section.title,
      summary: `${section.reference} follows ${section.title.toLowerCase()} as part of ${day.title.toLowerCase()}.`,
      teaching: explainSection(section.title, section.reference, day.title),
    }));
    return `const ${constName}: DaySection[] = ${serialize(sections)};`;
  })
  .join("\n\n")}

${dayObjects
  .map((day) => {
    const varName = day.day === 76
      ? "SAMUEL_KINGS_DAY_SEVENTY_SIX_SAUL_FALLS_AND_DAVIDS_KINGDOM_BEGINS_LESSON"
      : day.day === 77
      ? "SAMUEL_KINGS_DAY_SEVENTY_SEVEN_DAVIDS_THRONE_AND_GODS_PROMISE_LESSON"
      : day.day === 78
      ? "SAMUEL_KINGS_DAY_SEVENTY_EIGHT_DAVIDS_VICTORIES_AND_DAVIDS_SIN_LESSON"
      : day.day === 79
      ? "SAMUEL_KINGS_DAY_SEVENTY_NINE_CONSEQUENCES_IN_DAVIDS_HOUSE_LESSON"
      : day.day === 80
      ? "SAMUEL_KINGS_DAY_EIGHTY_ABSALOMS_REBELLION_AND_DAVIDS_GRIEF_LESSON"
      : day.day === 81
      ? "SAMUEL_KINGS_DAY_EIGHTY_ONE_DAVIDS_LATER_REIGN_AND_MIGHTY_MEN_LESSON"
      : day.day === 82
      ? "SAMUEL_KINGS_DAY_EIGHTY_TWO_DAVIDS_CENSUS_AND_SOLOMONS_WISDOM_LESSON"
      : day.day === 83
      ? "SAMUEL_KINGS_DAY_EIGHTY_THREE_SOLOMONS_WISDOM_AND_TEMPLE_PREPARATIONS_LESSON"
      : day.day === 84
      ? "SAMUEL_KINGS_DAY_EIGHTY_FOUR_TEMPLE_GLORY_AND_SOLOMONS_FALL_LESSON"
      : "SAMUEL_KINGS_DAY_EIGHTY_FIVE_THE_KINGDOM_DIVIDES_LESSON";
    return `export const ${varName} = makeLesson(
  ${day.day},
  ${JSON.stringify(day.title)},
  ${JSON.stringify(day.reference)},
  DAY_${day.day}_SECTIONS,
  [
    ${JSON.stringify(`Today we continue the Bible in One Year with ${day.reference}.`)},
    ${JSON.stringify(`${day.title} shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.`)},
  ],
  [
    ${JSON.stringify(`Day ${day.day} reminds us that kings change, but the LORD still rules over His people.`)},
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);`;
  })
  .join("\n\n")}

${dayObjects
  .map((day) => `export const BIBLE_YEAR_DAY_${day.day}_DEEP_NOTES = makeDeepNotes(
  ${JSON.stringify(day.title)},
  ${serialize(day.refs)},
  [
    ${JSON.stringify(`Day ${day.day} covers ${day.reference}.`)},
    ${JSON.stringify(`${day.title} belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.`)},
  ],
  DAY_${day.day}_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);`)
  .join("\n\n")}

${dayObjects.map((day) => `export const BIBLE_YEAR_DAY_${day.day}_DEEP_STUDY_SECTIONS = makeStudySections(DAY_${day.day}_SECTIONS);`).join("\n")}
`;

  writeFileSync("lib/royalHistoryPersonalNotes.ts", personalFile);
  writeFileSync("lib/bibleYearDaysSeventySixToEightyFiveDeepNotes.ts", deepFile);

  for (const day of dayObjects) {
    const script = `# Bible in One Year - Day ${day.day}

## ${day.title}

${day.reference}

${day.sections
  .map(
    (section) => `### ${section.reference}

[Read ${section.reference}.]

${section.title} is the focus of this section. Explain the key phrases, help the listener follow the story, and connect the moment to the larger kingdom movement before continuing.
`,
  )
  .join("\n")}
`;
    writeFileSync(`docs/bible-in-one-year-day-${day.day}-narrator-script.md`, script);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
