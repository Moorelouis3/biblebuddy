import { readFileSync, writeFileSync } from "fs";

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
  book: "1 Chronicles" | "2 Chronicles";
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const filePath = "lib/chroniclesPersonalNotes.ts";

const sectionIcons = ["👑", "🏛️", "🙏", "🔥", "📜", "💛", "🛡️", "⚖️", "🕊️", "🏠", "📦", "🧭", "⚠️", "🎺", "✨"];

const dayReadings = [
  { book: "1 Chronicles" as const, chapters: [29] },
  { book: "2 Chronicles" as const, chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
];

const weakOpeners = [
  /^and it came to pass$/i,
  /^and it came to pass\b/i,
  /^and said$/i,
  /^and he said$/i,
  /^and they said$/i,
  /^then/i,
  /^and when/i,
  /^for it came to pass/i,
];

function titleCase(phrase: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return phrase
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/[^\w'-]/g, "");
      if (clean.toUpperCase() === "LORD") return "LORD";
      const lower = clean.toLowerCase();
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function normalize(text: string) {
  return text
    .replace(/[“”]/g, "\"")
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function trimPhrase(phrase: string) {
  const words = phrase.replace(/^and\s+/i, "").split(/\s+/).slice(0, 12);
  const badEnd = new Set(["and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "that", "the", "to", "unto", "when", "with"]);
  while (words.length > 4 && badEnd.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

function isAwkwardPhrase(phrase: string) {
  const lower = phrase.toLowerCase();
  if (weakOpeners.some((pattern) => pattern.test(lower))) return true;
  if (/^(of|for|to|with|in|from|by|that|when|because)\b/i.test(phrase)) return true;
  if (/\b(the|of|for|to|with|in|from|by|that|when|and)\s*$/i.test(phrase)) return true;
  if (/^(my god the gold|of god of gold|all this store|heart to keep|him and said|king of israel that)/i.test(phrase)) return true;
  if (/\b(gold five|silver ten|holy|went)$/i.test(phrase)) return true;
  return false;
}

function phraseIcon(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("lord") || lower.includes("god") || lower.includes("pray") || lower.includes("sought")) return "🙏";
  if (lower.includes("king") || lower.includes("throne") || lower.includes("reign") || lower.includes("solomon") || lower.includes("david")) return "👑";
  if (lower.includes("house") || lower.includes("temple") || lower.includes("build")) return "🏛️";
  if (lower.includes("ark") || lower.includes("covenant")) return "📦";
  if (lower.includes("altar") || lower.includes("sacrifice") || lower.includes("offered") || lower.includes("fire")) return "🔥";
  if (lower.includes("heart") || lower.includes("willing") || lower.includes("humble")) return "💛";
  if (lower.includes("wisdom") || lower.includes("knowledge") || lower.includes("understanding")) return "🧠";
  if (lower.includes("judg") || lower.includes("justice") || lower.includes("cause")) return "⚖️";
  if (lower.includes("war") || lower.includes("battle") || lower.includes("chariot") || lower.includes("shield") || lower.includes("army")) return "🛡️";
  if (lower.includes("prophet") || lower.includes("seer") || lower.includes("word")) return "📜";
  if (lower.includes("glory") || lower.includes("cloud")) return "☁️";
  if (lower.includes("stranger") || lower.includes("all israel") || lower.includes("judah")) return "🧭";
  return "✨";
}

function scorePhrase(phrase: string) {
  const lower = phrase.toLowerCase();
  let score = 0;
  if (isAwkwardPhrase(phrase)) score -= 40;
  if (/\b(lord|god|covenant|mercy|heart|wisdom|knowledge|house|temple|altar|ark|glory|cloud|king|throne|reign|humble|seek|pray|judgment|justice|prophet|seer|forsook|commandments|law)\b/i.test(lower)) score += 12;
  if (/\b(gold|silver|cherubims|veil|lampstands|sea|oxen|shields|cities|levites|priests|stranger|queen|sheba|rehoboam|jeroboam|asa|jehoshaphat|micaiah|ahab)\b/i.test(lower)) score += 6;
  const words = phrase.split(/\s+/).length;
  if (words >= 4 && words <= 10) score += 5;
  if (words > 13) score -= 4;
  if (/^\d/.test(phrase)) score -= 10;
  return score;
}

function candidatesFromVerse(verse: ApiVerse) {
  const text = normalize(verse.text);
  const pieces = text
    .split(/[,;:.!?]/)
    .map((piece) => piece.trim().replace(/^["']|["']$/g, ""))
    .filter((piece) => piece.split(/\s+/).length >= 4)
    .map(trimPhrase);
  return pieces.filter((piece) => piece.split(/\s+/).length >= 4);
}

function windowPhrases(verse: ApiVerse) {
  const words = normalize(verse.text)
    .replace(/[;:,.!?()"']/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const phrases: string[] = [];
  for (let index = 0; index < words.length; index += 4) {
    const phrase = trimPhrase(words.slice(index, index + 7).join(" "));
    if (phrase.split(/\s+/).length >= 4) phrases.push(phrase);
  }
  return phrases;
}

function category(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("sacrifice") || lower.includes("offered") || lower.includes("fire")) return "worship";
  if (lower.includes("king") || lower.includes("throne") || lower.includes("reign") || lower.includes("solomon") || lower.includes("david") || lower.includes("rehoboam") || lower.includes("asa") || lower.includes("jehoshaphat")) return "king";
  if (lower.includes("house") || lower.includes("temple") || lower.includes("build")) return "temple";
  if (lower.includes("altar")) return "worship";
  if (lower.includes("lord") || lower.includes("god")) return "god";
  if (lower.includes("heart") || lower.includes("willing") || lower.includes("humble")) return "heart";
  if (lower.includes("wisdom") || lower.includes("knowledge") || lower.includes("understanding")) return "wisdom";
  if (lower.includes("ark") || lower.includes("covenant")) return "covenant";
  if (lower.includes("glory") || lower.includes("cloud")) return "glory";
  if (lower.includes("stranger") || lower.includes("all israel") || lower.includes("judah") || lower.includes("levites") || lower.includes("priests")) return "people";
  if (lower.includes("war") || lower.includes("battle") || lower.includes("chariot") || lower.includes("army")) return "battle";
  if (lower.includes("prophet") || lower.includes("seer") || lower.includes("word") || lower.includes("commandments") || lower.includes("law")) return "word";
  if (lower.includes("forsook") || lower.includes("wrath") || lower.includes("evil")) return "warning";
  return "detail";
}

function explain(phrase: string, book: string, chapter: number) {
  const c = category(phrase);
  const special = specialExplanation(phrase);
  if (special) return special;

  const variant = Math.abs([...phrase].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 3;
  const lines: Record<string, string[][]> = {
    god: [
      [`${phrase} keeps the LORD from becoming background noise.`,
      "The chapter may include kings, gold, armies, prayers, or buildings, but this wording reminds the reader that God is the main actor.",
      "🙏 God is present\n📜 His word has weight\n🔑 His purpose leads",
      "The phrase teaches the reader to look for what the LORD is doing before looking at human success."],
      [`${phrase} names God directly inside the movement of the story.`,
      "Chronicles wants worship and leadership to be read under God's authority. The people are not building a future apart from Him.",
      "🙏 Holy authority\n🏛️ Worship under God\n💛 People answering Him",
      "The phrase keeps the explanation centered on the LORD instead of on religious activity by itself."],
      [`${phrase} draws attention to God's claim over the moment.`,
      "The wording makes the scene more than history. It is covenant history, where God sees hearts, receives worship, gives wisdom, and judges rebellion.",
      "📜 Covenant memory\n🙏 Living God\n⚖️ Accountable people",
      "The phrase helps the reader understand why every decision in Chronicles has spiritual weight."]
    ],
    temple: [
      [`${phrase} points to the place where worship, sacrifice, prayer, and covenant memory gather.`,
      "The house is never just a beautiful building. It is the visible center of Israel's worship before the LORD.",
      "🏛️ Worship has a place\n🔥 Sacrifice belongs there\n🙏 Prayer rises there",
      "Chronicles wants the reader to feel why building, cleansing, filling, and guarding this house matters."],
      [`${phrase} keeps the reader focused on the temple as holy space.`,
      "Materials and measurements matter because they serve worship. The building is meant to honor the LORD's name, not display royal ego.",
      "🏛️ Holy space\n✨ Costly preparation\n🙏 Worship purpose",
      "The phrase helps a beginner see the difference between construction and consecration."],
      [`${phrase} connects ordinary work to the worship of God.`,
      "Chronicles names builders, vessels, rooms, and supplies because the temple requires prepared service from many hands.",
      "🛠️ Work offered\n🏛️ House prepared\n🙏 God honored",
      "The phrase shows that practical labor can become holy service when it is ordered toward the LORD."]
    ],
    worship: [
      [`${phrase} is worship language.`,
      "Sacrifice in Chronicles is not random ceremony. It is how the people come before God with thanksgiving, repentance, dedication, and dependence.",
      "🔥 Offering given\n🙏 Nearness sought\n🕊️ Mercy needed",
      "The phrase helps a beginner connect the action at the altar with the heart of worship."],
      [`${phrase} shows worship becoming visible through action.`,
      "The people do not only speak about honoring God. They bring offerings, bow, praise, and order their lives around His house.",
      "🔥 Sacrifice\n🎺 Praise\n💛 Surrender",
      "The phrase teaches that worship involves the whole person, not only a private feeling."],
      [`${phrase} brings the reader near the altar.`,
      "At the altar, gratitude, guilt, dedication, and mercy all come before the LORD. Chronicles wants worship to feel weighty, not casual.",
      "🔥 Holy offering\n🙏 Need before God\n🕊️ Mercy remembered",
      "The phrase keeps the reader from treating sacrifice as empty ritual."]
    ],
    heart: [
      [`${phrase} is about the inside of a person, not only outward behavior.`,
      "In the Bible, the heart includes desire, loyalty, thought, and choice. Chronicles keeps showing that God sees the direction underneath the action.",
      "💛 Desire\n🔑 Loyalty\n⚠️ Direction of life",
      "The phrase matters because a temple, throne, or army cannot replace a heart that is right before God."],
      [`${phrase} asks the reader to look below the surface.`,
      "A king can speak well, build much, and win battles while still drifting inside. Chronicles keeps pressing the question of loyalty.",
      "💛 Inner loyalty\n📜 Obedient desire\n🙏 God sees within",
      "The phrase helps explain why spiritual condition matters more than public appearance."],
      [`${phrase} is about what a person loves, seeks, and chooses.`,
      "The Bible does not treat the heart as a mood. It is the command center of trust, obedience, worship, and rebellion.",
      "💛 What is loved\n🧭 Where life turns\n⚠️ What God sees",
      "The phrase teaches that reform must reach deeper than behavior."]
    ],
    wisdom: [
      [`${phrase} names the kind of help Solomon needs before he can lead well.`,
      "Wisdom is more than being clever. It is the ability to judge rightly, listen carefully, and rule God's people with discernment.",
      "🧠 Discernment\n👑 Leadership\n📜 Decisions under God",
      "The phrase helps the reader see why Solomon's best beginning is asking God for what he lacks."],
      [`${phrase} shows leadership beginning with dependence.`,
      "Solomon does not ask first for comfort or revenge. He asks for the capacity to govern God's people well.",
      "🧠 Understanding\n⚖️ Judging rightly\n🙏 Asking God",
      "The phrase teaches that true wisdom is received before it is displayed."],
      [`${phrase} names the gift that turns power into service.`,
      "Without wisdom, a throne can become dangerous. With wisdom from God, leadership can protect and guide the people.",
      "👑 Power submitted\n🧠 Discernment given\n🧭 People guided",
      "The phrase helps the reader connect Solomon's request to the needs of the whole nation."]
    ],
    king: [
      [`${phrase} keeps the reader close to royal responsibility.`,
      "Kings in Chronicles do not live private lives. Their choices affect worship, justice, families, armies, and the spiritual direction of the people.",
      "👑 Public leadership\n⚖️ Shared consequences\n💛 Character revealed",
      "The phrase teaches that a crown is never separated from accountability before the LORD."],
      [`${phrase} puts leadership under the spotlight.`,
      "Chronicles is not impressed by a throne by itself. It keeps asking whether the king listens to God, serves the people, and protects worship.",
      "👑 Authority\n📜 Obedience tested\n🧭 A nation affected",
      "The phrase helps the reader understand why one ruler's choices can bless or wound many."],
      [`${phrase} is royal language, but it is not flattery.`,
      "The Bible names kings so the reader can watch responsibility, failure, pride, repentance, and mercy unfold in public.",
      "👑 Visible power\n⚠️ Visible danger\n🙏 Accountable to God",
      "The phrase teaches that leadership is measured before the LORD, not merely before people."]
    ],
    covenant: [
      [`${phrase} points to God's covenant presence among His people.`,
      "The ark and covenant language remind the reader that Israel's hope rests on God's promises, not on human greatness alone.",
      "📦 Covenant remembered\n🙏 Holy presence\n📜 Promise still speaking",
      "The phrase helps explain why temple worship is about relationship with the LORD, not religious decoration."],
      [`${phrase} brings the promises of God into view.`,
      "Covenant language teaches that Israel's worship is rooted in what God has spoken and pledged.",
      "📦 Promise remembered\n🏛️ Worship anchored\n🙏 God with His people",
      "The phrase helps the reader connect temple life to God's faithful commitment."],
      [`${phrase} is not only religious vocabulary.`,
      "It points to the bond God made with His people and the way that bond shapes worship, leadership, and hope.",
      "📜 Spoken promise\n📦 Covenant sign\n💛 People belonging to God",
      "The phrase keeps the reader from treating the temple story as only politics or architecture."]
    ],
    glory: [
      [`${phrase} describes God's overwhelming presence filling the scene.`,
      "The cloud and glory show that the LORD Himself is approving, occupying, and sanctifying the house built for His name.",
      "☁️ Holy nearness\n🏛️ The house filled\n🙏 Priests made small",
      "The phrase teaches that worship reaches its goal when God is honored as present and holy."],
      [`${phrase} shows that God is not merely being talked about.`,
      "His presence becomes the weight of the moment. The people cannot reduce worship to music, ceremony, or architecture.",
      "☁️ God draws near\n🔥 Worship answered\n🏛️ The house overwhelmed",
      "The phrase helps the reader feel the holiness of dedication day."],
      [`${phrase} marks the temple as received by God.`,
      "The glory does what human hands cannot do. It makes clear that the LORD Himself is the center of the house.",
      "✨ Holy weight\n🙏 Human limits\n🏛️ God's house filled",
      "The phrase teaches reverence because God's presence is beautiful and serious."]
    ],
    people: [
      [`${phrase} widens the scene beyond one leader.`,
      "Chronicles keeps showing priests, Levites, strangers, tribes, and all Judah because covenant life is shared by a whole people.",
      "🧭 A gathered people\n🏛️ Ordered worship\n👑 Leadership affecting many",
      "The phrase helps a beginner see that the kingdom story is personal and national at the same time."],
      [`${phrase} reminds the reader that the nation is involved.`,
      "The decisions of kings touch families, worshipers, workers, priests, and strangers who come near to the LORD.",
      "🧭 Shared life\n👑 Public consequences\n🙏 Worship together",
      "The phrase keeps the reader from shrinking the story down to one famous person."],
      [`${phrase} shows God's work moving through a community.`,
      "Chronicles names groups because worship and obedience are not private projects. The whole people are being formed before God.",
      "🏛️ Community worship\n📜 Shared instruction\n💛 Hearts gathered",
      "The phrase helps the reader see the people as participants, not background scenery."]
    ],
    battle: [
      [`${phrase} brings the reader into danger and dependence.`,
      "Battles in Chronicles are not only military reports. They reveal whether leaders trust God, trust alliances, or trust their own strength.",
      "🛡️ Pressure rises\n⚠️ Trust is tested\n🙏 Help must come from God",
      "The phrase matters because conflict exposes the spiritual condition of the king and the people."],
      [`${phrase} is conflict language with spiritual weight.`,
      "Armies, chariots, and danger show what a king relies on when pressure becomes real.",
      "🛡️ Threat outside\n💛 Trust inside\n🙏 God still rules",
      "The phrase teaches that war scenes in Chronicles are also trust scenes."],
      [`${phrase} puts the kingdom under pressure.`,
      "The reader should watch whether fear leads to prayer, pride, compromise, or obedience.",
      "⚔️ Danger\n⚠️ Testing\n📜 Consequences",
      "The phrase helps explain why battles reveal more than military strength."]
    ],
    word: [
      [`${phrase} highlights instruction, warning, or truth that must be obeyed.`,
      "Chronicles treats God's word as more than information. It is the authority that should shape kings, priests, judges, and the whole nation.",
      "📜 God speaks\n⚖️ People must answer\n🔑 Obedience matters",
      "The phrase helps the reader notice that ignoring God's word is never a small thing."],
      [`${phrase} brings command, warning, or instruction into the foreground.`,
      "When God's word is present, the issue is not merely what people feel. The issue is whether they will listen.",
      "📜 Instruction\n👂 Listening\n⚖️ Accountability",
      "The phrase teaches that the kingdom is judged by its response to truth."],
      [`${phrase} gives the reader something spoken that must be taken seriously.`,
      "Chronicles often turns on whether a king receives, rejects, or forgets the word brought to him.",
      "📜 Word given\n👑 King tested\n🔑 Obedience revealed",
      "The phrase helps the reader follow the moral direction of the chapter."]
    ],
    warning: [
      [`${phrase} signals spiritual danger.`,
      "Chronicles often explains national trouble by showing where kings and people turned away from the LORD.",
      "⚠️ Sin has direction\n🛡️ False security fails\n🙏 Mercy must be sought",
      "The phrase helps the reader understand that decline begins before the visible disaster arrives."],
      [`${phrase} is a danger marker in the passage.`,
      "The wording shows that the problem is not only political or military. Something has gone wrong before God.",
      "⚠️ Drift exposed\n📜 God sees clearly\n↩️ Repentance needed",
      "The phrase helps a beginner notice the spiritual cause underneath the visible crisis."],
      [`${phrase} warns the reader not to admire strength without obedience.`,
      "Chronicles repeatedly shows that success without faithfulness can collapse quickly.",
      "👑 Power can fail\n⚠️ Sin is costly\n🙏 God must be sought",
      "The phrase teaches that the safest place is not pride, alliance, or wealth, but returning to the LORD."]
    ],
    detail: [
      [`${phrase} gives the reader a concrete detail to slow down over.`,
      "Chronicles teaches through names, materials, places, measurements, and decisions because God's work happens in real history.",
      "📖 Real wording\n🧭 A scene to locate\n✨ Meaning inside the detail",
      "The phrase keeps the explanation tied to the text instead of drifting into a general idea."],
      [`${phrase} is a textual handle for understanding the scene.`,
      "The detail may look small, but Chronicles often builds meaning through exact people, places, gifts, and actions.",
      "📖 Exact phrase\n🔎 Detail noticed\n🧭 Scene clarified",
      "The phrase helps the reader stay close to what the passage actually says."],
      [`${phrase} gives the reader something specific to observe.`,
      "Instead of skipping past the wording, the card slows down and asks what this detail contributes to the chapter.",
      "✨ Specific wording\n📜 Context matters\n🔑 Meaning opens",
      "The phrase keeps the explanation anchored in the Bible text."]
    ],
  };

  return lines[c][variant].join("\n\n");
}

function specialExplanation(phrase: string) {
  const lower = phrase.toLowerCase();
  if (lower.includes("young and tender")) {
    return [
      `${phrase} means Solomon is chosen, but still inexperienced.`,
      "David is not insulting his son. He is explaining why the whole congregation needs to support the work and why Solomon needs God's help.",
      "👑 Chosen son\n💛 Still growing\n🏛️ Heavy calling",
      "The temple work is too weighty for confidence in youth, talent, or royal position alone."
    ].join("\n\n");
  }
  if (lower.includes("house is not for man")) {
    return [
      `${phrase} means the temple is being built for the LORD, not for human pride.`,
      "David wants the people to understand that this project is holy. The building may use human gifts, but its purpose is worship.",
      "🏛️ God's house\n🙏 Holy purpose\n⚠️ No room for vanity",
      "The phrase protects the reader from seeing the temple as a monument to David or Solomon."
    ].join("\n\n");
  }
  if (lower.includes("all things come of thee")) {
    return [
      `${phrase} means even Israel's gifts came from God first.`,
      "David refuses to act as if generosity starts with people. The people can give because the LORD has already given to them.",
      "🎁 God gives first\n🙏 People give back\n💛 Worship stays humble",
      "The phrase teaches that offering is gratitude before it is achievement."
    ].join("\n\n");
  }
  if (lower.includes("give unto solomon") && lower.includes("perfect heart")) {
    return [
      `${phrase} is David's prayer for Solomon's inner loyalty.`,
      "David does not only ask God to give Solomon skill, money, or power. He asks for a whole heart that will keep God's commandments.",
      "💛 Whole loyalty\n📜 Obedient life\n👑 A king under God",
      "The phrase shows that the temple builder needs spiritual faithfulness before construction success."
    ].join("\n\n");
  }
  if (lower.includes("wisdom and knowledge")) {
    return [
      `${phrase} names the gift Solomon asks from God.`,
      "Solomon knows the people are too many and the task is too heavy for shallow leadership. He needs discernment to go out and come in before them.",
      "🧠 Discernment\n👑 Leadership\n🙏 Dependence on God",
      "The phrase shows a good beginning: Solomon asks for what will help him serve, not merely what will make him look great."
    ].join("\n\n");
  }
  if (lower.includes("great is our god")) {
    return [
      `${phrase} explains why Solomon wants the temple to be great.`,
      "The building is not great because God can be contained inside it. It is great because Israel's worship should honor the greatness of the LORD.",
      "🏛️ A great house\n🙏 A greater God\n✨ Worship with weight",
      "The phrase keeps the temple from becoming architecture without awe."
    ].join("\n\n");
  }
  if (lower.includes("mount moriah")) {
    return [
      `${phrase} names the mountain where Solomon begins to build.`,
      "Moriah carries memory, sacrifice, and divine provision. Chronicles ties the temple site to the place David prepared after judgment and mercy.",
      "⛰️ Chosen place\n🔥 Sacrifice remembered\n🏛️ Temple begins",
      "The phrase helps the reader see that the temple location is loaded with meaning, not chosen at random."
    ].join("\n\n");
  }
  if (lower.includes("glory of the lord")) {
    return [
      `${phrase} means God's presence fills the temple with holy weight.`,
      "The priests cannot control this moment. The house reaches its purpose when the LORD shows that He is present among His people.",
      "☁️ Holy presence\n🏛️ The house filled\n🙏 People made small",
      "The phrase teaches that worship is not complete because people perform it well; worship depends on God drawing near."
    ].join("\n\n");
  }
  if (lower.includes("if my people")) {
    return [
      `${phrase} begins God's call to covenant repentance.`,
      "The promise is not casual comfort. God names a people called by His name, then calls them to humble themselves, pray, seek His face, and turn from wicked ways.",
      "💛 Humility\n🙏 Prayer\n↩️ Turning from sin",
      "The phrase teaches that healing is connected to returning to the LORD, not pretending rebellion is harmless."
    ].join("\n\n");
  }
  if (lower.includes("forsook the law")) {
    return [
      `${phrase} names the root of Rehoboam's collapse.`,
      "The danger is not only political weakness. The king and people turn away from the LORD's instruction, and the kingdom becomes exposed.",
      "📜 Law abandoned\n⚠️ Protection lost\n👑 Leadership failing",
      "The phrase helps the reader see that spiritual drift has public consequences."
    ].join("\n\n");
  }
  if (lower.includes("help the ungodly")) {
    return [
      `${phrase} is Jehu's rebuke to Jehoshaphat.`,
      "Jehoshaphat survived the battle, but survival does not mean the alliance was wise. The seer confronts the danger of joining strength to rebellion.",
      "⚠️ Bad alliance\n📜 Prophetic warning\n💛 Divided loyalty",
      "The phrase teaches that friendship with evil can endanger even a king who loves the LORD."
    ].join("\n\n");
  }
  return null;
}

async function getChapter(book: string, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let i = 0; i < verses.length; i += 6) chunks.push(verses.slice(i, i + 6));
  if (chunks.length > 1 && chunks[chunks.length - 1].length === 1) {
    const last = chunks.pop()!;
    const previous = chunks.pop()!;
    chunks.push(previous.slice(0, previous.length - 1));
    chunks.push([...previous.slice(previous.length - 1), ...last]);
  }
  return chunks;
}

function makeSection(book: "1 Chronicles" | "2 Chronicles", chapter: number, chunk: ApiVerse[], index: number): Section {
  const clausePool = chunk.flatMap(candidatesFromVerse).filter((phrase) => !isAwkwardPhrase(phrase));
  const fallbackPool = chunk.flatMap(windowPhrases).filter((phrase) => !isAwkwardPhrase(phrase));
  const candidatePool = clausePool.length >= 4 ? clausePool : [...clausePool, ...fallbackPool];
  const unique = [...new Set(candidatePool)]
    .sort((a, b) => scorePhrase(b) - scorePhrase(a))
    .slice(0, 4);

  let fallbackIndex = 0;
  while (unique.length < 4) {
    const fallback = trimPhrase(normalize(chunk[fallbackIndex % chunk.length].text).split(/[,;:.!?]/)[0] || `${book} ${chapter} verse ${chunk[0].verse}`);
    if (fallback.split(/\s+/).length >= 4 && !unique.includes(fallback)) unique.push(fallback);
    fallbackIndex += 1;
    if (fallbackIndex > 12) throw new Error(`Could not make 4 phrases for ${book} ${chapter}:${chunk[0].verse}`);
  }

  const startVerse = chunk[0].verse;
  const endVerse = chunk[chunk.length - 1].verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  const title = unique[0].replace(/^(And|But)\s+/i, "").split(/\s+/).slice(0, 8).join(" ");

  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title,
    icon: sectionIcons[index % sectionIcons.length],
    phrases: unique.map((phrase) => [`${phraseIcon(phrase)} ${phrase}`, explain(phrase, book, chapter)]),
  };
}

function serializeSections(sections: Section[]) {
  return sections
    .map((section) => `  ${JSON.stringify(section, null, 4).replace(/^/gm, "  ").trimStart()}`)
    .join(",\n");
}

async function main() {
  const newSections: Section[] = [];
  for (const reading of dayReadings) {
    for (const chapter of reading.chapters) {
      const apiChapter = await getChapter(reading.book, chapter);
      for (const [index, chunk] of chunkVerses(apiChapter.verses).entries()) {
        newSections.push(makeSection(reading.book, chapter, chunk, index));
      }
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }

  const source = readFileSync(filePath, "utf8");
  const startMarkers = [
    '  {\n    book: "1 Chronicles",\n    chapter: 29,',
    '  {\n      "book": "1 Chronicles",\n      "chapter": 29,',
  ];
  const start = startMarkers.map((marker) => source.indexOf(marker)).find((index) => index !== -1) ?? -1;
  const endMarker = "\n] as const satisfies readonly ChroniclesPhraseSectionInput[];";
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) throw new Error("Could not locate Chronicles 101-105 section range.");

  const next = `${source.slice(0, start)}${serializeSections(newSections)}${source.slice(end)}`;
  writeFileSync(filePath, next);
  console.log(`Replaced ${newSections.length} sections for Days 101-105.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
