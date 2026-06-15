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

const psalmChapters = Array.from({ length: 30 }, (_, index) => index + 67);

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
    "O LORD my God in thee do I put my trust",
    "Save me from all them that persecute me",
    "The LORD shall judge the people",
    "What is man that thou art mindful of him",
    "Out of the mouth of babes and sucklings",
    "The heavens declare the glory of God",
    "The law of the LORD is perfect",
    "Let the words of my mouth",
    "The LORD also will be a refuge for the oppressed",
    "I will praise thee O LORD with my whole heart",
    "The wicked shall be turned into hell",
    "The LORD is King for ever and ever",
    "Help LORD for the godly man ceaseth",
    "The words of the LORD are pure words",
    "How long wilt thou forget me O LORD",
    "I will sing unto the LORD",
    "The fool hath said in his heart There is no God",
    "Who shall abide in thy tabernacle",
    "He that walketh uprightly",
    "Preserve me O God",
    "The LORD is the portion of mine inheritance",
    "Thou wilt not leave my soul in hell",
    "Keep me as the apple of the eye",
    "I will love thee O LORD my strength",
    "The LORD is my rock and my fortress",
    "The heavens declare his righteousness",
    "The statutes of the LORD are right",
    "Some trust in chariots",
    "The king shall joy in thy strength",
    "My God my God why hast thou forsaken me",
    "They pierced my hands and my feet",
    "They part my garments among them",
    "The LORD is my shepherd",
    "He maketh me to lie down in green pastures",
    "Yea though I walk through the valley of the shadow of death",
    "Thou preparest a table before me",
    "The earth is the LORD's",
    "Who shall ascend into the hill of the LORD",
    "Lift up your heads O ye gates",
    "Shew me thy ways O LORD",
    "Remember not the sins of my youth",
    "Mine eyes are ever toward the LORD",
    "The LORD is my light and my salvation",
    "One thing have I desired of the LORD",
    "Wait on the LORD",
    "The LORD is my strength and my shield",
    "Weeping may endure for a night",
    "Joy cometh in the morning",
    "Into thine hand I commit my spirit",
    "Be of good courage",
    "Blessed is he whose transgression is forgiven",
    "I acknowledged my sin unto thee",
    "The LORD looketh from heaven",
    "O taste and see that the LORD is good",
    "The angel of the LORD encampeth round about them",
    "The righteous cry and the LORD heareth",
    "With thee is the fountain of life",
    "Fret not thyself because of evildoers",
    "Trust in the LORD and do good",
    "Delight thyself also in the LORD",
    "Commit thy way unto the LORD",
    "Rest in the LORD and wait patiently for him",
    "The steps of a good man are ordered by the LORD",
    "I have been young and now am old",
    "The law of his God is in his heart",
    "LORD make me to know mine end",
    "I was dumb I opened not my mouth",
    "I waited patiently for the LORD",
    "He brought me up also out of an horrible pit",
    "Sacrifice and offering thou didst not desire",
    "Lo I come",
    "As the hart panteth after the water brooks",
    "Why art thou cast down O my soul",
    "Send out thy light and thy truth",
    "My heart is inditing a good matter",
    "God is our refuge and strength",
    "Be still and know that I am God",
    "The LORD of hosts is with us",
    "God is gone up with a shout",
    "Great is the LORD and greatly to be praised",
    "We have thought of thy lovingkindness O God",
    "None of them can by any means redeem his brother",
    "Man that is in honour and understandeth not",
    "Call upon me in the day of trouble",
    "The sacrifices of God are a broken spirit",
    "Have mercy upon me O God",
    "Wash me throughly from mine iniquity",
    "Against thee thee only have I sinned",
    "Create in me a clean heart O God",
    "Restore unto me the joy of thy salvation",
    "Why boastest thou thyself in mischief",
    "The goodness of God endureth continually",
    "I am like a green olive tree",
    "Save me O God by thy name",
    "God is mine helper",
    "Give ear to my prayer O God",
    "Cast thy burden upon the LORD",
    "What time I am afraid I will trust in thee",
    "Thou tellest my wanderings",
    "Put thou my tears into thy bottle",
    "Be merciful unto me O God",
    "My heart is fixed O God",
    "Do ye indeed speak righteousness O congregation",
    "The righteous shall rejoice when he seeth the vengeance",
    "Deliver me from mine enemies O my God",
    "I will sing of thy power",
    "Give us help from trouble",
    "Lead me to the rock that is higher than I",
    "When my heart is overwhelmed",
    "My soul waiteth upon God",
    "He only is my rock and my salvation",
    "Trust in him at all times",
    "My soul thirsteth for thee",
    "Thy lovingkindness is better than life",
    "Hear my voice O God in my prayer",
    "They encourage themselves in an evil matter",
    "Praise waiteth for thee O God in Sion",
    "Thou visitest the earth and waterest it",
    "Make a joyful noise unto God",
    "Come and hear all ye that fear God",
    "God be merciful unto us and bless us",
    "Let the people praise thee O God",
    "Let the nations be glad",
    "Let God arise",
    "A father of the fatherless",
    "Thou hast ascended on high",
    "Save me O God for the waters are come in unto my soul",
    "Zeal of thine house hath eaten me up",
    "They gave me also gall for my meat",
    "Make haste O God to deliver me",
    "Cast me not off in the time of old age",
    "Give the king thy judgments O God",
    "He shall have dominion also from sea to sea",
    "Truly God is good to Israel",
    "My feet were almost gone",
    "Until I went into the sanctuary of God",
    "Whom have I in heaven but thee",
    "God is the strength of my heart",
    "We see not our signs",
    "Thou didst divide the sea by thy strength",
    "I will remember the works of the LORD",
    "Thy way O God is in the sanctuary",
    "Give ear O my people to my law",
    "They forgat his works",
    "Turn us again O God",
    "Give ear O Shepherd of Israel",
    "Sing aloud unto God our strength",
    "Open thy mouth wide and I will fill it",
    "How long will ye judge unjustly",
    "Defend the poor and fatherless",
    "How amiable are thy tabernacles",
    "My soul longeth",
    "A day in thy courts is better than a thousand",
    "Wilt thou not revive us again",
    "Mercy and truth are met together",
    "Righteousness and peace have kissed each other",
    "Glorious things are spoken of thee",
    "All my springs are in thee",
    "My soul is full of troubles",
    "Lover and friend hast thou put far from me",
    "I have made a covenant with my chosen",
    "Lord thou hast been our dwelling place",
    "Teach us to number our days",
    "He that dwelleth in the secret place of the most High",
    "He shall give his angels charge over thee",
    "The LORD reigneth",
    "O come let us sing unto the LORD",
    "Today if ye will hear his voice",
    "Declare his glory among the heathen",
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
  if (/god be merciful unto us|cause his face to shine|thy way may be known|saving health among all nations|people praise thee|nations be glad|earth yield her increase|judge the people righteously|govern the nations/.test(lower)) {
    return note([
      `${phrase} connects God's blessing with His purpose for the nations.`,
      "Psalm 67 does not treat blessing as something to hoard. Israel asks for mercy so the whole earth may know God's way.",
      "🌍 Nations included\n🙏 Mercy requested\n🎶 Praise multiplied\n🌾 Blessing bears fruit",
      "That helps readers see mission and worship together: God blesses so His name is known.",
    ]);
  }
  if (/righteous be glad|rejoice before god|exceedingly rejoice|sing unto god|extol him|rideth upon the heavens/.test(lower)) {
    return note([
      `${phrase} calls God's people to rejoice because the LORD is present and victorious.`,
      "Psalm 68 does not present praise as shallow excitement. The joy rises because God acts, leads, defends, and reigns.",
      "🎶 Praise rises\n👑 God is victorious\n🛡️ His people are helped\n🙏 Joy answers His works",
      "That helps a beginner see worship as a response to who God is and what He has done.",
    ]);
  }
  if (/let god arise|father of the fatherless|widows|ascended on high|daily loadeth us|chariots of god/.test(lower)) {
    return note([
      `${phrase} presents God as the victorious helper of the vulnerable.`,
      "Psalm 68 celebrates God's power, but that power is not cold. He defends the fatherless, cares for widows, and carries His people.",
      "👑 God arises\n🛡️ The weak are defended\n⛰️ Victory is celebrated\n🙏 Burdens are carried",
      "That helps a beginner see God's majesty and mercy standing together.",
    ]);
  }
  if (/waters are come|mire|zeal of thine house|gall for my meat|vinegar|reproach hath broken|poor and sorrowful/.test(lower)) {
    return note([
      `${phrase} gives language to suffering that is deep, public, and costly.`,
      "Psalm 69 speaks of sinking, shame, enemies, and zeal for God's house. The pain is not hidden from prayer.",
      "💧 Deep distress\n🔥 Zeal for God\n🍋 Bitter treatment\n🙏 The sufferer cries out",
      "That helps readers understand why this psalm becomes important for seeing righteous suffering.",
    ]);
  }
  if (/make haste|deliver me|old age|king thy judgments|dominion also from sea to sea|name shall endure/.test(lower)) {
    return note([
      `${phrase} moves from urgent help to the hope of righteous rule.`,
      "Psalms 70-72 bring personal need, aging weakness, and the longing for a king who judges with righteousness.",
      "🙏 Help needed now\n🕯️ Weakness admitted\n👑 Righteous king desired\n🌍 Rule reaches the nations",
      "That helps readers see prayer and kingdom hope meeting in the same worship life.",
    ]);
  }
  if (/god is good to israel|feet were almost gone|sanctuary of god|whom have i in heaven|strength of my heart|portion for ever/.test(lower)) {
    return note([
      `${phrase} teaches faith when life feels unfair and the wicked seem comfortable.`,
      "Psalm 73 does not pretend envy is impossible. It brings confusion into worship until God's presence changes the way the psalmist sees.",
      "⚖️ Life feels unfair\n🧭 Worship gives perspective\n💔 The heart is corrected\n👑 God becomes the portion",
      "That helps a beginner see worship as the place where distorted vision can be healed.",
    ]);
  }
  if (/see not our signs|divide the sea|works of the lord|thy way o god|give ear o my people|forgat his works|tempted god/.test(lower)) {
    return note([
      `${phrase} calls God's people to remember His works instead of drifting into unbelief.`,
      "Psalms 74, 77, and 78 hold pain, memory, and warning together. The past works of God teach the present generation how to trust.",
      "📜 Israel's memory\n🌊 God delivered before\n⚠️ Forgetfulness warned\n🙏 Faith is taught",
      "That helps readers see Bible memory as spiritual survival, not trivia.",
    ]);
  }
  if (/god is the judge|judah is god known|more glorious and excellent|give thanks|cup is in the lord's hand/.test(lower)) {
    return note([
      `${phrase} places human pride under God's judgment and glory.`,
      "Psalms 75 and 76 remind the reader that God lifts up, puts down, and is known by His power among His people.",
      "⚖️ God judges\n👑 God is known\n🛡️ Pride is humbled\n🎶 Thanks is given",
      "That helps readers understand judgment as part of God's public reign.",
    ]);
  }
  if (/turn us again|shepherd of israel|open thy mouth wide|sing aloud unto god|how long wilt thou be angry/.test(lower)) {
    return note([
      `${phrase} asks God to restore His people and teach them to listen again.`,
      "Psalms 79-81 move through judgment, restoration, worship, and the grief of not listening to God.",
      "💧 Judgment felt\n🙏 Restoration requested\n🎶 Worship called for\n👂 Listening matters",
      "That helps a beginner see restoration as returning to God, not merely escaping consequences.",
    ]);
  }
  if (/judge unjustly|defend the poor|fatherless|amiable are thy tabernacles|soul longeth|day in thy courts/.test(lower)) {
    return note([
      `${phrase} joins justice with longing for God's presence.`,
      "Psalms 82-84 show that worship is not separated from righteousness. God cares about unjust judgment and welcomes longing for His house.",
      "⚖️ Justice required\n🛡️ The weak defended\n🏠 God's house desired\n🙏 The heart longs",
      "That helps readers see God's presence as holy, beautiful, and morally serious.",
    ]);
  }
  if (/revive us again|mercy and truth are met|righteousness and peace|glorious things|springs are in thee/.test(lower)) {
    return note([
      `${phrase} points to revival, covenant beauty, and hope centered in Zion.`,
      "Psalms 85-87 pray for renewed life and speak of God's city as a place where blessing flows outward.",
      "🌱 Revival requested\n🤝 Mercy and truth meet\n🏙️ Zion remembered\n💧 Life springs from God",
      "That helps a beginner see restoration as both personal renewal and hope for God's people.",
    ]);
  }
  if (/soul is full of troubles|lover and friend|covenant with my chosen|dwelling place|number our days/.test(lower)) {
    return note([
      `${phrase} brings darkness, covenant hope, and human frailty before God.`,
      "Psalms 88-90 are not shallow. They include deep darkness, God's promise to David, and the prayer to live wisely under time's limits.",
      "🌑 Darkness named\n📜 Covenant remembered\n⏳ Days are numbered\n🙏 Wisdom is requested",
      "That helps readers see that faith can pray honestly even when the chapter feels heavy.",
    ]);
  }
  if (/secret place of the most high|angels charge|good thing to give thanks|lord reigneth|habitation of thy throne/.test(lower)) {
    return note([
      `${phrase} teaches refuge and worship under the reign of the LORD.`,
      "Psalms 91-93 move from protection to thanksgiving to the proclamation that the LORD reigns.",
      "🛡️ Refuge promised\n🎶 Thanks is good\n👑 The LORD reigns\n⚖️ His throne is righteous",
      "That helps readers rest in God's rule without treating refuge as a magic slogan.",
    ]);
  }
  if (/come let us sing|today if ye will hear|declare his glory|among the heathen|lord made the heavens|new song/.test(lower)) {
    return note([
      `${phrase} calls people to worship the LORD with listening hearts and public praise.`,
      "Psalms 95 and 96 join singing, warning, mission, and creation's joy before the LORD.",
      "🎶 Worship invited\n👂 Hearts must listen\n🌍 Glory declared\n👑 The Creator reigns",
      "That helps a beginner see worship as joyful obedience, not only music.",
    ]);
  }
  if (/give ear to the words of my mouth|hear my prayer|give ear to my prayer/.test(lower)) {
    return note([
      `${phrase} asks God to listen closely to urgent prayer.`,
      "The psalmist is not giving a performance. He is bringing words, fear, and need before the God who can save.",
      "🙏 Prayer spoken\n👂 God asked to hear\n🛡️ Help needed\n🕯️ Trust stays open",
      "That helps a beginner see prayer as honest dependence, not polished religious speech.",
    ]);
  }
  if (/boastest thou thyself|goodness of god endureth|green olive tree|trusted in the abundance|deceitful tongue/.test(lower)) {
    return note([
      `${phrase} contrasts proud evil with the steady goodness of God.`,
      "The psalm exposes the person who trusts in harm, lies, and power, then answers with trust in God's mercy.",
      "🌿 Faithful endurance\n⚠️ Boasting exposed\n🕊️ Mercy trusted\n👑 God's goodness lasts",
      "That helps readers see why the faithful do not need to copy the methods of the wicked.",
    ]);
  }
  if (/save me o god by thy name|god is mine helper|strangers are risen|oppressors seek after my soul/.test(lower)) {
    return note([
      `${phrase} asks God to sustain the faithful when enemies rise up.`,
      "Psalm 54 is short, but it is direct: the threatened worshiper looks to God's name, help, and truth.",
      "🛡️ Rescue requested\n🙏 God's name trusted\n⚖️ Enemies answered\n🎶 Praise follows help",
      "That helps a beginner see prayer as bringing real danger to the God who can uphold the soul.",
    ]);
  }
  if (/give ear to my prayer|cast thy burden|wings like a dove|friend|companion|violence and strife|evening and morning/.test(lower)) {
    return note([
      `${phrase} gives words for fear, betrayal, and the weight of trouble.`,
      "Psalm 55 does not minimize pain. It brings turmoil, betrayal, and burden-bearing into prayer before the LORD.",
      "💧 Betrayal hurts\n🙏 Prayer keeps speaking\n🕊️ Escape is desired\n🛡️ The LORD sustains",
      "That helps readers understand that God invites honest prayer when the heart feels overloaded.",
    ]);
  }
  if (/what time i am afraid|tears into thy bottle|be merciful unto me|heart is fixed|awake up my glory/.test(lower)) {
    return note([
      `${phrase} turns fear and tears into trust before God.`,
      "Psalms 56 and 57 show faith speaking while danger is still active, not after all pressure disappears.",
      "💧 Tears remembered\n🛡️ Fear answered by trust\n🕊️ Mercy requested\n🎶 Praise rises",
      "That helps a beginner see courage as trust in God's mercy, not pretending fear is gone.",
    ]);
  }
  if (/speak righteousness|righteous shall rejoice|deliver me from mine enemies|sing of thy power|scatter them|defend me/.test(lower)) {
    return note([
      `${phrase} asks God to judge evil and defend the righteous.`,
      "These psalms are not embarrassed by justice. They bring violent, lying, and oppressive enemies before the God who rules rightly.",
      "⚖️ Justice requested\n🛡️ Protection needed\n👑 God rules evil\n🎶 Deliverance becomes praise",
      "That helps readers see judgment as part of God's care for a world damaged by wickedness.",
    ]);
  }
  if (/give us help from trouble|through god we shall do valiantly|rock that is higher|heart is overwhelmed|strong tower/.test(lower)) {
    return note([
      `${phrase} reaches for God as help when human strength is not enough.`,
      "Psalms 60 and 61 move from defeat or overwhelm toward the LORD as the higher rock and sure help.",
      "🪨 Higher refuge\n🙏 Help requested\n⚔️ Human strength limited\n👑 God gives victory",
      "That helps a beginner see weakness as the place where prayer looks upward.",
    ]);
  }
  if (/soul waiteth upon god|rock and my salvation|trust in him at all times|pour out your heart|lovingkindness is better than life|my soul thirsteth/.test(lower)) {
    return note([
      `${phrase} teaches the soul to rest and thirst for God Himself.`,
      "Psalms 62 and 63 are not merely asking for gifts. They speak of God as rock, salvation, refuge, and better than life.",
      "🪨 God is steady\n💧 The soul thirsts\n🙏 The heart pours out\n🕊️ Trust rests in Him",
      "That helps readers see devotion as wanting God, not only wanting relief.",
    ]);
  }
  if (/hear my voice|evil matter|praise waiteth|visitest the earth|joyful noise|come and hear|what he hath done for my soul/.test(lower)) {
    return note([
      `${phrase} moves from protection into praise for what God has done.`,
      "Psalms 64-66 bring hidden schemes, answered prayer, creation's blessing, and public testimony under God's praise.",
      "🛡️ Hidden danger exposed\n🌾 Creation blessed\n🎶 Praise invited\n🙏 Testimony shared",
      "That helps a beginner see praise as remembering God's protection and telling others what He has done.",
    ]);
  }
  if (/fret not|trust in the lord|delight thyself|commit thy way|rest in the lord|wait patiently|steps of a good man|young and now am old|law of his god/.test(lower)) {
    return note([
      `${phrase} teaches patient faith when wickedness seems to be winning.`,
      "Psalm 37 does not tell the reader to ignore evil. It teaches the righteous to trust, wait, do good, and let the LORD judge the final outcome.",
      "🕰️ Waiting faith\n🌱 Steady obedience\n⚖️ Wickedness will not last\n🙏 The LORD orders the path",
      "That helps a beginner see patience as active trust, not passive resignation.",
    ]);
  }
  if (/make me to know mine end|opened not my mouth|stranger with thee|frailty|handbreadth|vanity/.test(lower)) {
    return note([
      `${phrase} faces the shortness of life without pretending people are stronger than they are.`,
      "Psalm 39 turns human frailty into prayer, asking God for wisdom before life passes like a shadow.",
      "⏳ Life is brief\n🕯️ Frailty is admitted\n🙏 Prayer asks for wisdom\n👑 Hope stays with God",
      "That helps readers think soberly about time without falling into despair.",
    ]);
  }
  if (/waited patiently|horrible pit|miry clay|new song|sacrifice and offering|lo i come|delight to do thy will/.test(lower)) {
    return note([
      `${phrase} shows rescue becoming obedience and praise.`,
      "Psalm 40 moves from being lifted out of the pit to offering God a willing heart, not empty religious performance.",
      "🕳️ Rescue from the pit\n🎶 A new song\n📜 God's will embraced\n🙏 Obedience from the heart",
      "That helps a beginner see that deliverance is meant to form worship and surrender.",
    ]);
  }
  if (/hart panteth|cast down o my soul|hope thou in god|deep calleth unto deep|send out thy light|thy truth/.test(lower)) {
    return note([
      `${phrase} gives words for spiritual thirst, discouragement, and renewed hope.`,
      "Psalms 42 and 43 do not shame a downcast soul. They teach the soul to speak honestly and hope again in God.",
      "💧 Thirst for God\n🌊 Deep sorrow\n🕯️ Hope preached to the soul\n🙏 God's light requested",
      "That helps readers see faith as a conversation with God and with the troubled heart.",
    ]);
  }
  if (/my heart is inditing|king|fairer than|throne o god|queen|daughter/.test(lower)) {
    return note([
      `${phrase} belongs to royal praise that lifts the reader's eyes to the beauty and rule of the king.`,
      "Psalm 45 uses wedding and kingdom language to celebrate majesty, righteousness, and covenant joy.",
      "👑 Royal beauty\n📜 Righteous rule\n🎶 Praise overflowing\n💍 Covenant joy",
      "That helps a beginner read the psalm as worshipful royal poetry, not a random love song.",
    ]);
  }
  if (/god is our refuge|be still|lord of hosts is with us|gone up with a shout|great is the lord|lovingkindness/.test(lower)) {
    return note([
      `${phrase} anchors safety and worship in God's reign over the whole earth.`,
      "Psalms 46-48 answer fear with the presence, rule, and praise of God.",
      "🏰 God is refuge\n👑 God reigns\n🌍 Nations are under Him\n🎶 Praise fills the city",
      "That helps readers see refuge as confidence in God's nearness and kingship.",
    ]);
  }
  if (/redeem his brother|riches|honour|like the beasts|understandeth not|mouth of the righteous/.test(lower)) {
    return note([
      `${phrase} warns that wealth and status cannot rescue a person from death or judgment.`,
      "Psalm 49 strips away false confidence so the reader does not mistake money, honor, or public success for salvation.",
      "💰 Wealth has limits\n⚰️ Death humbles all\n🧭 Wisdom is needed\n👑 God alone redeems",
      "That helps a beginner see why the Bible refuses to worship success.",
    ]);
  }
  if (/call upon me|day of trouble|offer unto god thanksgiving|broken spirit|have mercy upon me|wash me|against thee|create in me|restore unto me/.test(lower)) {
    return note([
      `${phrase} brings trouble, worship, or sin into honest speech before God.`,
      "Psalms 50 and 51 expose empty religion and then show true repentance: mercy asked for, sin confessed, and a clean heart desired.",
      "💧 Sin confessed\n🙏 Mercy requested\n🕊️ Clean heart desired\n🎶 True worship restored",
      "That helps readers see repentance as returning honestly to God, not hiding behind religious words.",
    ]);
  }
  if (/our fathers trusted|thou didst deliver|he trusted on the lord|from my mother's belly|thou art my god/.test(lower)) {
    return note([
      `${phrase} remembers earlier trust while the present moment still feels painful.`,
      "The psalmist looks back at God's faithfulness and at his own life with God, even while asking why help feels far away now.",
      "🧠 Past deliverance remembered\n🙏 Present pain prayed\n🕯️ Trust keeps speaking\n👑 The LORD is still God",
      "That helps readers see faith wrestling honestly without cutting itself off from memory.",
    ]);
  }
  if (/be not far|none to help|bulls|bashan|gaped upon me|poured out like water|bones are out|heart is like wax|strength is dried|tongue cleaveth/.test(lower)) {
    return note([
      `${phrase} describes suffering as surrounding pressure that the sufferer cannot escape alone.`,
      "Psalm 22 stacks images of weakness, danger, and bodily collapse so the reader feels the desperation of the prayer.",
      "💧 Weakness exposed\n🛡️ Enemies surround\n🙏 Help is needed\n🕯️ The prayer keeps reaching",
      "That helps a beginner understand the psalm as lived agony before God, not a calm religious speech.",
    ]);
  }
  if (/my god my god|forsaken me|pierced my hands|part my garments|cast lots|laugh me to scorn|deliver my soul/.test(lower)) {
    return note([
      `${phrase} gives language to deep suffering while the prayer is still directed to God.`,
      "Psalm 22 is not vague sadness. It names abandonment, mockery, weakness, and enemies, yet keeps crying toward the LORD.",
      "💧 Suffering named\n🙏 God still addressed\n🕯️ Hope fights through pain\n👑 The LORD hears",
      "That helps a beginner see why this psalm becomes so important for understanding the suffering of Christ.",
    ]);
  }
  if (/lord is my shepherd|green pastures|still waters|restoreth my soul|valley of the shadow|preparest a table|goodness and mercy/.test(lower)) {
    return note([
      `${phrase} shows the LORD caring for His people like a shepherd who stays near.`,
      "Psalm 23 is not only peaceful scenery. It teaches guidance, provision, courage, and fellowship with God even near death.",
      "🐑 Shepherd care\n🌿 Provision\n🛡️ Courage in danger\n🏠 Life with the LORD",
      "That helps readers see comfort as trust in the LORD's presence, not the absence of hard valleys.",
    ]);
  }
  if (/earth is the lord's|ascend into the hill|clean hands|pure heart|king of glory|lift up your heads/.test(lower)) {
    return note([
      `${phrase} presents the LORD as Creator, holy King, and the One worthy to enter in glory.`,
      "Psalm 24 joins creation, holiness, and kingship so worshipers understand who they are approaching.",
      "🌍 The earth belongs to God\n🕊️ Holiness matters\n👑 The King enters\n🙏 Worship opens the gates",
      "That helps a beginner see worship as coming before the holy King, not simply having a religious feeling.",
    ]);
  }
  if (/shew me thy ways|teach me thy paths|sins of my youth|mine eyes are ever|secret of the lord|wait on thee/.test(lower)) {
    return note([
      `${phrase} asks the LORD for guidance, mercy, and covenant instruction.`,
      "Psalm 25 speaks like someone who knows he needs direction and forgiveness at the same time.",
      "🧭 Guidance requested\n💧 Mercy needed\n📜 The LORD teaches\n🙏 Trust keeps waiting",
      "That helps readers understand that guidance is not only about decisions. It is about walking humbly with God.",
    ]);
  }
  if (/lord is my light|one thing have i desired|beauty of the lord|wait on the lord|be of good courage/.test(lower)) {
    return note([
      `${phrase} turns fear into focused desire for the LORD Himself.`,
      "Psalm 27 has enemies and danger, but its center is not panic. Its center is seeking the LORD's face and waiting for Him.",
      "🕯️ The LORD gives light\n🏠 Presence is desired\n🛡️ Courage is strengthened\n🙏 Waiting becomes faith",
      "That helps a beginner see courage as worshipful dependence, not self-confidence.",
    ]);
  }
  if (/strength and my shield|voice of my supplications|weeping may endure|joy cometh|turned for me my mourning/.test(lower)) {
    return note([
      `${phrase} shows prayer moving from need into praise because the LORD helps His people.`,
      "These psalms are honest about crying, danger, and sorrow, but they also remember that God can turn mourning into joy.",
      "🙏 Prayer rises\n🛡️ Help is received\n💧 Sorrow is named\n☀️ Joy returns",
      "That helps readers see praise as the answer to mercy, not a denial of grief.",
    ]);
  }
  if (/into thine hand i commit my spirit|be of good courage|transgression is forgiven|acknowledged my sin|covered my sin|hiding place/.test(lower)) {
    return note([
      `${phrase} brings either trust or confession directly before the LORD.`,
      "Psalms 31 and 32 teach two kinds of honest speech: entrusting yourself to God and confessing sin without hiding.",
      "🤲 Trust surrendered\n💧 Sin confessed\n🛡️ God becomes hiding place\n🕯️ Courage grows",
      "That helps a beginner see that safety with God includes both dependence and repentance.",
    ]);
  }
  if (/lord looketh from heaven|word of the lord is right|taste and see|angel of the lord|righteous cry|fountain of life|wicked borroweth|mercy o lord/.test(lower)) {
    return note([
      `${phrase} teaches the reader to measure life by the LORD's goodness, sight, and faithful care.`,
      "These psalms contrast human pride and trouble with the God who sees, hears, shelters, and gives life.",
      "👑 The LORD sees\n🛡️ The LORD shelters\n🎶 Praise remembers\n🌊 Life comes from Him",
      "That helps readers understand goodness as something tasted in trusting the LORD, not merely defined from a distance.",
    ]);
  }
  if (/put my trust|save me from all them|tear my soul like a lion|rending it in pieces/.test(lower)) {
    return note([
      `${phrase} turns danger into direct prayer instead of private panic.`,
      "The psalmist is not describing mild annoyance. He feels hunted, exposed, and in need of rescue only the LORD can give.",
      "🛡️ Real danger\n🙏 Trust spoken aloud\n🦁 Enemy pressure\n👑 The LORD can save",
      "That helps a beginner see trust as something prayed while fear is still present.",
    ]);
  }
  if (/according to my righteousness|mine integrity|hearts and reins|rewarded evil|wickedness of the wicked/.test(lower)) {
    return note([
      `${phrase} brings integrity and hidden motives before God's judgment.`,
      "The psalmist is asking the LORD to examine the case honestly, including what people cannot see from the outside.",
      "⚖️ Integrity tested\n🕯️ Motives searched\n👑 God judges rightly\n🙏 Prayer asks for truth",
      "That matters because biblical justice is not only about public appearance. The LORD weighs the heart.",
    ]);
  }
  if (/pit|ditch|mischief shall return|violent dealing|whet his sword|bent his bow/.test(lower)) {
    return note([
      `${phrase} shows evil turning back on the person who planned it.`,
      "The psalm does not treat wickedness as clever forever. Sin digs, bends, aims, and schemes, but God can make it collapse on itself.",
      "🕳️ Trap imagery\n⚖️ Reversal of evil\n👑 God sees the scheme\n🛡️ The righteous can pray",
      "That helps readers understand why the psalms can ask God for judgment without pretending revenge belongs to us.",
    ]);
  }
  if (/praise the lord|sing praise|excellent is thy name|whole heart|marvellous works/.test(lower)) {
    return note([
      `${phrase} turns God's help into remembered praise.`,
      "The psalmist does not only ask for rescue. He also names the LORD's works so worship can answer what God has done.",
      "🎶 Praise spoken\n🧠 Works remembered\n👑 God's name honored\n🙏 The heart responds",
      "That helps a beginner see praise as testimony, not just religious decoration.",
    ]);
  }
  if (/what is man|mouth of babes|son of man|dominion over/.test(lower)) {
    return note([
      `${phrase} slows the reader down before the mystery of human smallness and human honor.`,
      "Psalm 8 looks at the greatness of the heavens, then wonders that God still cares for mankind.",
      "🌙 Human smallness\n👑 God-given honor\n🌍 Creation under care\n🙏 Wonder becomes praise",
      "That matters because the psalm teaches humility without making human life meaningless.",
    ]);
  }
  if (/lord shall judge|wicked shall be turned|lord is king|refuge for the oppressed|arise o lord/.test(lower)) {
    return note([
      `${phrase} places injustice under the rule of the LORD.`,
      "The psalms do not pretend evil is harmless. They bring evil before the Judge who sees, remembers, and acts rightly.",
      "⚖️ Evil is weighed\n👑 The LORD reigns\n🛡️ The oppressed have refuge\n🙏 Prayer asks God to act",
      "That helps readers understand judgment as hope for those who are being crushed by wickedness.",
    ]);
  }
  if (/how long wilt thou forget|help lord|godly man ceaseth|fool hath said|there is no god/.test(lower)) {
    return note([
      `${phrase} gives words for a world where faithfulness seems weak and evil seems loud.`,
      "The psalmist is not writing from comfort only. He is praying from pressure, confusion, and grief.",
      "💧 Trouble named\n🛡️ Evil exposed\n🙏 Prayer continues\n🕯️ Hope refuses to quit",
      "That helps a beginner see lament as faithful speech, not spiritual failure.",
    ]);
  }
  if (/preserve me|portion of mine inheritance|not leave my soul|apple of the eye|my rock and my fortress/.test(lower)) {
    return note([
      `${phrase} teaches refuge by naming the LORD as the safe place of the worshiper.`,
      "These psalms keep returning to God as portion, shield, rock, fortress, and keeper.",
      "🛡️ Protection sought\n👑 The LORD is enough\n🌙 Trust in danger\n🙏 Prayer rests in Him",
      "That helps readers see that refuge is not mainly a place. It is the LORD Himself.",
    ]);
  }
  if (/some trust in chariots|king shall joy|strength o lord|anointed|holy hill/.test(lower)) {
    return note([
      `${phrase} connects royal victory to the LORD's strength rather than human power.`,
      "The king is not meant to be independent from God. His joy, rescue, and triumph come from the LORD.",
      "👑 The king depends\n🛡️ God saves\n⚔️ Human strength is limited\n🙏 Praise follows victory",
      "That helps a beginner read the royal psalms as worship, not just national pride.",
    ]);
  }
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
    psalmWisdom: `${phrase} helps explain the wise path this psalm sets before the reader.`,
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
  const psalmSections = await buildBook("Psalms", psalmChapters);

  writeFileSync(
    "lib/psalmsSixtySevenToNinetySixPersonalNotes.ts",
    `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type PsalmsPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "Psalms" };

export const PSALMS_67_96_PERSONAL_SECTIONS = [
${serialize(psalmSections)}
] as const satisfies readonly PsalmsPhraseSectionInput[];
`,
  );

  console.log(`Wrote ${psalmSections.length} Psalms sections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
