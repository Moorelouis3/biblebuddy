import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type DeepNotesMap = Record<number, string | undefined>;

type GeneratedPersonalSectionOptions = {
  book: string;
  notes: DeepNotesMap;
  chapters: number[];
  icon: string;
  fallbackPhrases: string[];
};

type ParsedDeepSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  title: string;
  phrases: Array<[string, string]>;
};

const note = (lines: string[]) => lines.join("\n\n");

function titleCase(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function stripLeadingIcon(value: string) {
  return value
    .replace(/^[^A-Za-z0-9'"]+/u, "")
    .replace(/\*\*/g, "")
    .trim();
}

function isGenericStudyHeading(value: string) {
  return /^(what this passage shows|what is happening here|why this matters|why this detail matters|beginner connection|watch this pattern|what this shows about people|what this shows about god|final thought|pause and reflect)$/i.test(
    stripLeadingIcon(value),
  );
}

function getPhraseIcon(title: string) {
  const lower = title.toLowerCase();

  if (/lord|god|holy|sanctif|before the lord|name/.test(lower)) return pickIcon(title, ["🕊️", "✨", "👑", "🙏", "📛", "🛡️"]);
  if (/priest|aaron|sons|levite|anoint|garment|consecrate/.test(lower)) return pickIcon(title, ["👤", "👕", "🫒", "🧴", "🙌", "🏛️"]);
  if (/offering|sacrifice|bread|altar|fire|blemish|blood|atonement/.test(lower)) return pickIcon(title, ["🔥", "🩸", "🐑", "🍞", "⛪", "✅"]);
  if (/feast|sabbath|day|month|year|season|convocation|trumpet|jubilee/.test(lower)) return pickIcon(title, ["📅", "🎺", "🌙", "🌾", "🎉", "🛖"]);
  if (/lamp|oil|light|candlestick/.test(lower)) return pickIcon(title, ["🪔", "💡", "🫒", "🌙", "🔥", "✨"]);
  if (/loaf|loaves|meat|food|eat|table/.test(lower)) return pickIcon(title, ["🍞", "🥖", "🍽️", "🌾", "🧂", "🏺"]);
  if (/stranger|children|israel|congregation|people|community/.test(lower)) return pickIcon(title, ["👥", "🏕️", "🤝", "🧑‍🤝‍🧑", "🏠", "🌍"]);
  if (/justice|judgment|law|statute|command|ordinance|eye|tooth|equal/.test(lower)) return pickIcon(title, ["⚖️", "📜", "👁️", "🦷", "🧭", "🔨"]);
  if (/unclean|clean|defile|profane|abomination/.test(lower)) return pickIcon(title, ["🚫", "💧", "⚠️", "🧼", "🧱", "🛑"]);
  if (/land|inheritance|border|possession|field|vineyard/.test(lower)) return pickIcon(title, ["🌾", "🏞️", "🗺️", "🌱", "🍇", "🏡"]);
  if (/remember|teach|heart|hear|love|soul|mind/.test(lower)) return pickIcon(title, ["🧠", "❤️", "👂", "📖", "🗣️", "🪶"]);
  if (/journey|wilderness|camp|tent|tabernacle/.test(lower)) return pickIcon(title, ["⛺", "🏕️", "🚶", "☁️", "🧭", "📍"]);

  return pickIcon(title, ["🔎", "📌", "📖", "🧩", "➡️", "🧭"]);
}

function getSectionIcon(book: string, chapter: number, startVerse: number, title: string) {
  const lower = `${book} ${chapter} ${title}`.toLowerCase();

  if (/priest|altar|consecrat|anoint/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["👤", "🏛️", "🫒", "👕", "🙌"]);
  if (/food|bread|offering|blemish/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["🍞", "🔥", "🐑", "✅", "🌾"]);
  if (/feast|sabbath|firstfruit|atonement|tabernacle|year|jubilee/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["📅", "🎺", "🛖", "🌾", "🎉"]);
  if (/lamp|light|oil/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["🪔", "💡", "🫒", "✨"]);
  if (/name|blasphem/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["🕊️", "📛", "⚠️", "👑"]);
  if (/justice|judgment|law/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["⚖️", "📜", "👁️", "🦷"]);
  if (/camp|journey|wilderness/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["⛺", "🏕️", "🚶", "🧭"]);
  if (/land|inheritance|field/.test(lower)) return pickIcon(`${title}-${startVerse}`, ["🌾", "🏞️", "🗺️", "🌱"]);

  const palette = ["📖", "🔥", "🕊️", "📅", "⚖️", "🪔", "🍞", "👥", "⛺", "🌾"];
  return palette[(chapter + startVerse) % palette.length];
}

function pickIcon(seed: string, icons: string[]) {
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % 9973;
  return icons[hash % icons.length] || icons[0] || "🔎";
}

const alternateIcons = ["🔎", "📌", "📖", "🧩", "➡️", "🧭", "✨", "🙏", "⚖️", "🌾", "👥", "🔥", "🛡️", "📜"];

function firstGrapheme(value: string) {
  const chars = Array.from(value.trim());
  return chars[1] === "\uFE0F" ? `${chars[0]}${chars[1]}` : chars[0] || "";
}

function replaceLeadingIcon(value: string, icon: string) {
  return `${icon} ${stripLeadingIcon(value)}`;
}

function pickDifferentIcon(currentIcon: string, seed: string, previousIcon: string) {
  if (currentIcon && currentIcon !== previousIcon) return currentIcon;
  const options = alternateIcons.filter((icon) => icon !== previousIcon);
  if (!options.length) return currentIcon || "🔎";
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % 9973;
  return options[hash % options.length] || options[0] || "🔎";
}

function normalizeAdjacentIcons(sections: PersonalLeviticusPhraseSectionInput[]) {
  let previousSectionIcon = "";

  for (const section of sections) {
    section.icon = pickDifferentIcon(section.icon, section.reference, previousSectionIcon);
    previousSectionIcon = section.icon;

    let previousPhraseIcon = "";
    section.phrases = section.phrases.map(([title, explanation], index) => {
      const currentIcon = firstGrapheme(title);
      const nextIcon = pickDifferentIcon(currentIcon, `${section.reference}-${index}-${title}`, previousPhraseIcon);
      previousPhraseIcon = nextIcon;
      return [replaceLeadingIcon(title, nextIcon), explanation];
    });
  }

  return sections;
}

function buildPhraseTitle(rawTitle: string) {
  const cleanTitle = titleCase(stripLeadingIcon(rawTitle));
  return `${getPhraseIcon(cleanTitle)} ${cleanTitle}`;
}

function phraseSpecificTeaching(title: string, book: string, chapter: number) {
  const lower = title.toLowerCase();

  if (book === "Joshua" && /be strong and of a good courage|only be thou strong|neither be thou dismayed/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} is the LORD's courage command to Joshua as leadership passes from Moses to him.`,
      "The phrase does not mean Joshua should trust his own personality. His courage rests on God's presence and promise.",
      ...buildTeachingBullets(title),
      "A beginner should see that biblical courage is tied to listening to the LORD and walking forward because He is with His people.",
    ]);
  }

  if (book === "Joshua" && /ark of the covenant|ark of the lord|ark of god/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to the visible sign of the LORD's covenant presence leading Israel.`,
      "The ark is not a magic object. It belongs to worship, covenant, and God's holy presence among His people.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see why the river crossing and the march around Jericho are centered on God's presence, not Israel's strength.",
    ]);
  }

  if (book === "Joshua" && /according unto the word of the lord|as the lord commanded|commanded joshua|word of the lord/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} shows Joshua and Israel acting under God's command rather than their own strategy.`,
      "The phrase matters because victory in Joshua is repeatedly tied to obedience.",
      ...buildTeachingBullets(title),
      "A beginner should read it as the anchor of the story: God's word directs the action.",
    ]);
  }

  if (book === "Joshua" && /land which i do give|lord gave unto israel|gave them rest|land rested from war/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} shows the promise becoming real in the land of Canaan.`,
      "Joshua is not mainly about Israel grabbing land by ambition. It is about the LORD giving what He promised.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see geography as covenant promise taking shape for real tribes and families.",
    ]);
  }

  if (book === "Joshua" && /inheritance by lot|according to their families|cities and villages|coast|border|border went/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to the careful distribution of inheritance among Israel's tribes.`,
      "These details can feel like lists, but they show that God's promise reaches actual families, borders, towns, and responsibilities.",
      ...buildTeachingBullets(title),
      "A beginner should see order here: the promised land is being received as covenant inheritance, not vague religious language.",
    ]);
  }

  if (book === "Joshua" && /children of israel|tribe of|half tribe|joseph|judah|ephraim|manasseh/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} names the covenant people or tribe receiving a real place in the promise.`,
      "Joshua keeps repeating tribal names because the promise is not abstract. It belongs to the people God brought out of Egypt.",
      ...buildTeachingBullets(title),
      "The phrase helps readers follow how one rescued nation is being settled tribe by tribe.",
    ]);
  }

  if (book === "Joshua" && /joshua|rahab|achan|caleb|eleazar|jordan|jericho|gilgal|ai/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} identifies a person or place that carries the story forward in Joshua.`,
      "The phrase matters because Joshua's story moves through real leaders, cities, crossings, failures, and acts of faith.",
      ...buildTeachingBullets(title),
      "A beginner should slow down here because the named details show where obedience, mercy, judgment, or inheritance is happening.",
    ]);
  }

  if (book === "Joshua" && /twelve stones|take you twelve men|out of every tribe|memorial|what mean ye by these stones/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to Israel turning God's mighty act into something future generations can remember.`,
      "The stones are not decoration. They are teaching signs so children will hear what the LORD did at the Jordan.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see that Joshua connects miracle, memory, and family instruction.",
    ]);
  }

  if (book === "Joshua" && /accursed thing|devoted thing|hath sinned|israel hath sinned|get thee up|wherefore liest thou/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to the Achan story, where hidden sin damages the whole covenant community.`,
      "Joshua 7 teaches that victory at Jericho did not make Israel safe from disobedience.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see why the LORD exposes sin before Israel can move forward.",
    ]);
  }

  if (book === "Joshua" && /ask not counsel|league with us|made a league|let them live|gibeon|beguiled us|work wilily/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to the Gibeonite deception, where Israel acts without asking counsel from the LORD.`,
      "The phrase teaches that danger does not always look like battle. Sometimes it looks reasonable and persuasive.",
      ...buildTeachingBullets(title),
      "A beginner should see that covenant wisdom must seek God's counsel, not only trust appearances.",
    ]);
  }

  if (book === "Joshua" && /sharp knives|circumcis|captain of the lord|passover|manna|old corn/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to covenant renewal before Israel moves deeper into the land.`,
      "Joshua 5 slows the story down before Jericho so the people remember who they are before the LORD.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see that worship and covenant identity come before battle confidence.",
    ]);
  }

  if (book === "Joshua" && /father|mother|brethren|sisters|household|kindness|swear unto me/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} shows Rahab asking for mercy to reach her family, not only herself.`,
      "Her request matters because faith in Joshua 2 becomes a plea for rescue in the middle of coming judgment.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see mercy entering Jericho before Jericho falls.",
    ]);
  }

  if (book === "Joshua" && /valley|springs|wilderness|towns|villages|city|cities|coast|mountain|wood country|south land|lot came out/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} names the actual places, borders, or portions connected to Israel's inheritance.`,
      "These details may feel slow, but they show the promise becoming settled geography for real families.",
      ...buildTeachingBullets(title),
      "The phrase keeps the reader from treating the land as an idea. Joshua is showing the inheritance taking shape.",
    ]);
  }

  if (/i am the lord/.test(lower)) {
    return formatPhraseTeaching(title, [
      "I Am The LORD identifies the One giving the command.",
      "The point is authority and relationship: Israel obeys because the covenant LORD is speaking.",
      ...buildTeachingBullets(title),
      "They come from the God who rescued His people and now teaches them how to live near Him.",
    ]);
  }

  if (/lord spake unto moses/.test(lower)) {
    return formatPhraseTeaching(title, [
      "The LORD Spake Unto Moses means the instruction begins with God's own word.",
      "Moses is not inventing worship rules or community laws from his own wisdom.",
      ...buildTeachingBullets(title),
      "A beginner should notice that Leviticus keeps grounding its commands in the LORD who speaks.",
    ]);
  }

  if (/be holy/.test(lower)) {
    return formatPhraseTeaching(title, [
      "Be Holy means God's people are called to live as set-apart people.",
      "Holy does not mean strange for no reason.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see that Leviticus is about nearness to God, not empty rules.",
    ]);
  }

  if (/keep my statutes/.test(lower)) {
    return formatPhraseTeaching(title, [
      "Keep My Statutes means Israel must guard and obey what the LORD has commanded.",
      "Statutes are God's covenant instructions for His people.",
      ...buildTeachingBullets(title),
      "The phrase teaches that love for God is shown through careful obedience.",
    ]);
  }

  if (/before the lord/.test(lower)) {
    const focus =
      chapter >= 26
        ? chapter === 26
          ? "Before The LORD means Israel brings firstfruits and confession into God's presence."
          : chapter === 27
          ? "Before The LORD means the covenant ceremony is being treated as worship, not merely public speech."
          : "Before The LORD means Israel's covenant words and gifts are being brought into God's presence."
        : chapter >= 16
        ? "Before The LORD means the feast, offering, or judgment is not merely a social event."
        : "Before The LORD means the action is happening in God's presence.";
    return formatPhraseTeaching(title, [
      focus,
      "The phrase makes the moment personal and serious because the LORD sees what His people bring, say, and do.",
      ...buildTeachingBullets(title),
      "A beginner should read it as nearness: the people are acting before the holy God, not only in front of one another.",
    ]);
  }

  if (/children of israel/.test(lower)) {
    return formatPhraseTeaching(title, [
      "The Children Of Israel means the covenant people descended from Jacob.",
      "Leviticus is not speaking only to private individuals.",
      ...buildTeachingBullets(title),
      "The phrase helps readers remember that God is shaping a people who belong to Him together.",
    ]);
  }

  if (/statute for ever/.test(lower)) {
    return formatPhraseTeaching(title, [
      "A Statute For Ever means this command was meant to continue for Israel through their generations.",
      "The phrase gives weight to the instruction.",
      ...buildTeachingBullets(title),
      "It helps the reader see why Israel's worship calendar and holy practices mattered so deeply.",
    ]);
  }

  if (/thou shalt not/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means God is placing a clear boundary around His people's life.`,
      "The command is not random control. It protects worship, justice, family, neighbor love, or holiness.",
      ...buildTeachingBullets(title),
      "A beginner should read this as covenant instruction: the LORD is teaching His people what must not belong among them.",
    ]);
  }

  if (/thou shalt|ye shall|shall not|shalt not/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means the passage is giving Israel a direct covenant command.`,
      "The wording tells the reader that obedience is meant to become visible in ordinary decisions, not only in worship moments.",
      ...buildTeachingBullets(title),
      "The phrase helps the reader see that God's law was shaping a whole way of life before Him.",
    ]);
  }

  if (/the lord thy god|the lord your god|the lord our god/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} identifies the covenant God who rescued Israel and now teaches them how to live.`,
      "The phrase is personal: Israel does not obey an unknown power, but the LORD who bound Himself to them by promise.",
      ...buildTeachingBullets(title),
      "That makes the command relational, not merely legal.",
    ]);
  }

  if (/holy people|children of the lord|peculiar people/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means Israel's identity comes from belonging to the LORD.`,
      "They are not being told to act different so God might choose them. They are called to live differently because He already has.",
      ...buildTeachingBullets(title),
      "The phrase helps beginners see that holiness starts with who God says His people are.",
    ]);
  }

  if (/levite|levites|tribe of levi|priests the levites|priest/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to the people set apart for spiritual service among Israel.`,
      "The Levites did not live by ordinary tribal inheritance the same way the other tribes did.",
      ...buildTeachingBullets(title),
      "Their place in the passage teaches that worship, teaching, and service before the LORD had to be cared for by the whole people.",
    ]);
  }

  if (/inheritance|part nor inheritance|lord is their inheritance/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means the passage is talking about what someone receives as their portion or lasting support.`,
      "For the Levites, the point is especially important because their security is tied to the LORD and to Israel's faithfulness in worship.",
      ...buildTeachingBullets(title),
      "The phrase helps beginners see that inheritance in Deuteronomy is about provision, identity, and belonging.",
    ]);
  }

  if (/clean|unclean|abomination|cheweth|cloven|fins|scales|eat of|not eat/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to Israel's clean and unclean food instructions.`,
      "These commands trained Israel to remember that they were a holy people even in ordinary meals.",
      ...buildTeachingBullets(title),
      "The point is not random diet advice. It is covenant identity practiced at the table.",
    ]);
  }

  if (/release|lend|borrow|debt|open thine hand|shut thine hand|poor brother/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} teaches how mercy and generosity were supposed to shape Israel's economy.`,
      "The phrase matters because covenant life was not allowed to become cold, greedy, or careless toward people in need.",
      ...buildTeachingBullets(title),
      "It shows that the LORD cared about debt, poverty, and open-handed love.",
    ]);
  }

  if (/place which the lord shall choose|place which he shall choose|before the lord thy god/.test(lower)) {
    const focus =
      chapter >= 26
        ? `${title} points to covenant worship being brought to the place God chose for His name.`
        : chapter >= 16
        ? `${title} means Israel's feasts and offerings must gather where the LORD appoints.`
        : `${title} points to worship gathered around the place God chooses, not wherever Israel invents for itself.`;
    return formatPhraseTeaching(title, [
      focus,
      "The phrase keeps worship centered on God's authority instead of personal preference.",
      ...buildTeachingBullets(title),
      "It teaches that worship is a response to God's word, not something people design on their own terms.",
    ]);
  }

  if (/justice and judgment/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means public decisions must be measured by truth instead of pressure, favoritism, or fear.`,
      "In Deuteronomy, justice is not a side issue. It is part of covenant faithfulness before the LORD.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see that holy life includes fair courts, honest leaders, and righteous decisions.",
    ]);
  }

  if (/keep the commandments/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means Israel must guard the LORD's words by actually obeying them.`,
      "The phrase is not about collecting religious information. It is about covenant instruction becoming visible life.",
      ...buildTeachingBullets(title),
      "A beginner should hear this as careful loyalty: the people remember God's word by walking in it.",
    ]);
  }

  if (/tithe|firstling|passover|feast|solemn|unleavened|weeks|tabernacles/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to Israel's worship rhythm before the LORD.`,
      "The phrase teaches that food, harvest, time, and celebration were all meant to remind Israel of God's provision.",
      ...buildTeachingBullets(title),
      "A beginner should see that worship in Deuteronomy includes memory, gratitude, generosity, and joy.",
    ]);
  }

  if (/poor|widow|fatherless|stranger|foreigner|servant|bondman|brother/.test(lower) && !/moses the servant of the lord/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} brings vulnerable people or covenant neighbors into view.`,
      "The phrase matters because God's law does not ignore people with less power, less money, or less protection.",
      ...buildTeachingBullets(title),
      "It shows that covenant faithfulness had to become mercy and fairness in real relationships.",
    ]);
  }

  if (/promised thee|promise|as he promised|sware|swore/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points back to something the LORD already said He would do.`,
      "The phrase matters because obedience in Deuteronomy is built on God's faithfulness, not on Israel starting from nothing.",
      ...buildTeachingBullets(title),
      "It helps the reader connect the command in front of them to the bigger promise story.",
    ]);
  }

  if (/this commandment which i command thee this day|this commandment/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to the covenant word Moses is putting directly before Israel.`,
      "In Deuteronomy, the command is not treated as distant, hidden, or impossible to hear.",
      ...buildTeachingBullets(title),
      "The phrase helps the reader see that obedience begins with receiving the word God has already made known.",
    ]);
  }

  if (/song of moses|this song|write ye this song|teach it the children/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} points to the witness Moses gives Israel in song form before he dies.`,
      "The song is meant to be remembered, repeated, and used as testimony when Israel forgets the LORD.",
      ...buildTeachingBullets(title),
      "A beginner should see that the song is not decoration. It is covenant memory shaped into words the people can carry.",
    ]);
  }

  if (/choose life|that thou and thy seed may live/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} is Moses' urgent call for Israel to cling to the LORD instead of choosing death through rebellion.`,
      "Life here means covenant life with God: loving Him, obeying His voice, and holding fast to Him.",
      ...buildTeachingBullets(title),
      "The phrase helps the reader hear Deuteronomy's final appeal as personal, serious, and full of mercy.",
    ]);
  }

  if (/set your hearts unto all the words|set your hearts/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} means Moses wants Israel to take the covenant words into the center of their attention.`,
      "This is more than hearing sounds. The people must receive the words as life-giving instruction.",
      ...buildTeachingBullets(title),
      "The phrase teaches that Scripture is meant to be held, taught, remembered, and obeyed.",
    ]);
  }

  if (/moses the servant of the lord/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} identifies Moses by his faithful role before the LORD at the end of his life.`,
      "The phrase does not make Moses the center. It shows that even Israel's great leader stands under God's command.",
      ...buildTeachingBullets(title),
      "A beginner should see honor and humility together: Moses is important because he served the LORD.",
    ]);
  }

  if (/eternal god is thy refuge|underneath are the everlasting arms/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} describes the LORD as the safe place beneath and around His people.`,
      "Moses is blessing Israel with confidence that their security rests in the everlasting God.",
      ...buildTeachingBullets(title),
      "The phrase helps readers see that Israel's future depends on God's strength, not their own.",
    ]);
  }

  if (/judge|judges|officers|judgment|justice|witness|matter|controversy/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to the way justice was supposed to work among God's people.`,
      "The phrase is about truth, fairness, and refusing to let power or pressure twist what is right.",
      ...buildTeachingBullets(title),
      "It helps the reader see that the LORD cares about public justice, not only private religion.",
    ]);
  }

  if (/\bking\b|\bthrone\b|\breign\b|\bhorses\b|\bwives\b|\bsilver\b|\bgold\b|book of the law/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} teaches that Israel's king must live under God's word.`,
      "The king is not allowed to become a proud ruler who copies the nations and forgets the LORD.",
      ...buildTeachingBullets(title),
      "The phrase points forward to the Bible's bigger question: what kind of king will truly lead God's people well?",
    ]);
  }

  if (/prophet|dreamer|divination|observer|witch|familiar spirit|hearken/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} is about how God's people receive guidance and truth.`,
      "The phrase separates the LORD's word from forbidden spiritual practices and false voices.",
      ...buildTeachingBullets(title),
      "It teaches beginners that God's people are not meant to chase every spiritual-sounding source.",
    ]);
  }

  if (/city of refuge|refuge|blood|slayer|avenger|innocent/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} belongs to Israel's justice system for life, death, guilt, and protection.`,
      "The phrase shows that the law took human life seriously while also making room for careful judgment.",
      ...buildTeachingBullets(title),
      "It helps the reader see justice with order, witnesses, and protection from revenge.",
    ]);
  }

  if (/war|battle|enemy|enemies|horse|chariot|captain|siege/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} speaks into Israel's battles and fears.`,
      "The phrase reminds the reader that war was not supposed to be ruled by panic, pride, or cruelty.",
      ...buildTeachingBullets(title),
      "Even in conflict, God's people were being taught to listen to the LORD.",
    ]);
  }

  if (/hide thyself|know him not|bring it unto thine own house|restore|lost|brother's ox|brother's ass|fallen down/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} teaches that Israel could not ignore a neighbor's need just because helping was inconvenient.`,
      "The phrase is about active responsibility: seeing a problem and choosing care instead of looking away.",
      ...buildTeachingBullets(title),
      "It helps beginners see that Deuteronomy brings love of neighbor into ordinary moments.",
    ]);
  }

  if (/garment|raiment|pledge|field|vineyard|ox|ass|bird|nest|roof|house|landmark|measure|weight/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} shows God's law reaching ordinary daily life.`,
      "The phrase may sound small, but it teaches that holiness includes homes, work, property, animals, clothing, and neighbor care.",
      ...buildTeachingBullets(title),
      "Deuteronomy is showing that faithfulness is practiced in real-life details.",
    ]);
  }

  if (/remember|forget|egypt|brought thee forth/.test(lower)) {
    return formatPhraseTeaching(title, [
      `${title} calls Israel to read the command through the memory of rescue.`,
      "The LORD does not want His people to forget slavery, deliverance, mercy, or dependence on Him.",
      ...buildTeachingBullets(title),
      "Remembering grace is meant to shape obedience.",
    ]);
  }

  return formatPhraseTeaching(title, [
    `${title} names an exact detail the reader is meant to notice in this part of ${book}.`,
    "The phrase may be small, but it belongs to the way the passage moves the story, command, warning, or promise forward.",
    ...buildTeachingBullets(title),
    "It keeps the explanation tied to the Bible's wording instead of turning the section into a vague summary.",
  ]);
}

function buildTeachingBullets(title: string) {
  const lower = title.toLowerCase();

  if (/lord|god|holy|sanctif|before the lord|name/.test(lower)) {
    return ["🙏 God's presence", "✨ Holy character", "📜 Covenant authority"];
  }

  if (/priest|aaron|sons|levite|anoint|garment|consecrate/.test(lower)) {
    return ["👤 Set-apart servants", "🧴 Prepared for service", "🏛️ Near holy things"];
  }

  if (/offering|sacrifice|bread|altar|fire|blemish|blood|atonement/.test(lower)) {
    return ["🔥 Worship brought to God", "🐑 A costly gift", "✅ Treated as holy"];
  }

  if (/feast|sabbath|day|month|year|season|convocation|trumpet|jubilee/.test(lower)) {
    return ["📅 Sacred time", "🎺 Public remembrance", "🌾 Trust in God's provision"];
  }

  if (/lamp|oil|light|candlestick/.test(lower)) {
    return ["🪔 Light in God's house", "🫒 Oil for the lamp", "✨ Steady worship"];
  }

  if (/loaf|loaves|meat|food|eat|table/.test(lower)) {
    return ["🍞 Bread before the LORD", "🍽️ Shared provision", "🏛️ Worship in the holy place"];
  }

  if (/stranger|children|israel|congregation|people|community|tribe|family|armies/.test(lower)) {
    return ["👥 God's people", "🏕️ Ordered community", "🤝 Life together"];
  }

  if (/justice|judgment|law|statute|command|ordinance|eye|tooth|equal/.test(lower)) {
    return ["⚖️ Justice", "📜 God's command", "🧭 Right order"];
  }

  if (/unclean|clean|defile|profane|abomination/.test(lower)) {
    return ["🚫 Uncleanness", "💧 Cleansing", "✨ Holiness near God"];
  }

  if (/land|inheritance|border|possession|field|vineyard|redeem|jubile/.test(lower)) {
    return ["🌾 The land", "🏡 Family inheritance", "🔁 Restoration"];
  }

  if (/journey|wilderness|camp|tent|tabernacle|standard|ensign/.test(lower)) {
    return ["🏕️ Camp order", "🧭 Wilderness journey", "⛪ God's presence at the center"];
  }

  return ["🔎 A detail to notice", "📖 The Bible's wording", "🧩 Part of the larger story"];
}

function formatPhraseTeaching(title: string, lines: string[]) {
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  const intro = cleaned.filter((line) => !/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u.test(line)).slice(0, 2);
  const bullets = cleaned.filter((line) => /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u.test(line)).slice(0, 3);
  const outro = cleaned.filter((line) => !intro.includes(line) && !bullets.includes(line)).slice(0, 2);

  return [...intro, ...bullets, ...outro].slice(0, 7);
}

function cleanVersePhrase(value: string) {
  return value
    .replace(/^and\s+/i, "")
    .replace(/^but\s+/i, "")
    .replace(/^for\s+/i, "")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "")
    .trim();
}

function extractVersePhraseTitles(sectionBody: string) {
  const verseText = [...sectionBody.matchAll(/^>\s+\*\*\d+\*\*\s+(.+)$/gm)]
    .map((match) => match[1] || "")
    .join(" ");
  const candidates = verseText
    .split(/[,;:]/)
    .map(cleanVersePhrase)
    .filter((phrase) => {
      const words = phrase.split(/\s+/).filter(Boolean);
      if (/^(it came to pass|now therefore|and now)$/i.test(phrase)) return false;
      return words.length >= 3 && words.length <= 10 && !/^\d+$/.test(phrase);
    });
  const seen = new Set<string>();
  const titles: string[] = [];

  for (const phrase of candidates) {
    const key = phrase.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    titles.push(titleCase(phrase));
  }

  return titles;
}

function cleanBody(value: string) {
  return value
    .replace(/^>\s+\*\*\d+\*\*.*$/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^(this phrase is important|this detail is important|this matters|this phrase matters)\.?$/i.test(line))
    .filter((line) => !/is a phrase from the passage that names a real command, person, object, or action/i.test(line))
    .filter((line) => !/helps explain how covenant life was supposed to work/i.test(line))
    .filter((line) => !/keeps the reader close to the bible's own wording/i.test(line))
    .filter((line) => !/belongs to the instruction god is giving/i.test(line))
    .filter((line) => !/helps identify who is involved, what is being commanded, or how/i.test(line))
    .slice(0, 7);
}

function explainPhrase(rawTitle: string, rawBody: string, book: string) {
  const title = stripLeadingIcon(rawTitle);
  const bodyLines = cleanBody(rawBody);
  const fallbackTeaching = phraseSpecificTeaching(title, book, 0);
  const firstLine = bodyLines.find((line) => !/^[-*]/.test(line)) || fallbackTeaching[0] || `${title} helps explain this part of ${book}.`;

  const lines = [firstLine, ...bodyLines.filter((line) => line !== firstLine).slice(0, 4)];

  if (lines.length < 4) {
    for (const line of fallbackTeaching) {
      if (lines.length >= 4) break;
      if (!lines.includes(line)) lines.push(line);
    }
  }

  return note(formatPhraseTeaching(title, [...lines.slice(0, 2), ...buildTeachingBullets(title), ...lines.slice(2)]));
}

function parseDeepSections(book: string, chapter: number, markdown: string): ParsedDeepSection[] {
  const escapedBook = book.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionPattern = new RegExp(`## ${escapedBook} ${chapter}:(\\d+)(?:-| to )(\\d+)\\n([\\s\\S]*?)(?=\\n## ${escapedBook} ${chapter}:|\\n# The Big Lesson|\\n# Final Thought|\\n# Pause and Reflect|$)`, "g");
  const sections: ParsedDeepSection[] = [];
    const useVersePhrasesFirst = book === "Numbers" || book === "Deuteronomy" || book === "Joshua";

  for (const match of markdown.matchAll(sectionPattern)) {
    const startVerse = Number(match[1]);
    const endVerse = Number(match[2]);
    const body = match[3] || "";
    const versePhraseTitles = extractVersePhraseTitles(body);
    const versePhrases = useVersePhrasesFirst
      ? versePhraseTitles.map((title) => [buildPhraseTitle(title), note(phraseSpecificTeaching(title, book, chapter))] as [string, string])
      : [];
    const headingPhrases = [...body.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
      .map((phraseMatch) => {
        const title = stripLeadingIcon(phraseMatch[1] || "");
        return [buildPhraseTitle(title), explainPhrase(title, phraseMatch[2] || "", book)] as [string, string];
      })
      .filter(([title]) => !isGenericStudyHeading(title))
      .filter(([title]) => title.replace(/^📌\s*/, "").length > 2);

    const phrases = [...versePhrases, ...(useVersePhrasesFirst ? [] : headingPhrases)].filter((item, index, list) => {
      const key = stripLeadingIcon(item[0]).toLowerCase();
      return list.findIndex((candidate) => stripLeadingIcon(candidate[0]).toLowerCase() === key) === index;
    });

    const chunkCount = Math.ceil((endVerse - startVerse + 1) / 6);
    const neededPhraseCount = chunkCount * 4;
    const usedTitles = new Set(phrases.map(([title]) => stripLeadingIcon(title).toLowerCase()));

    for (const title of versePhraseTitles) {
      if (phrases.length >= neededPhraseCount) break;
      const key = title.toLowerCase();
      if (usedTitles.has(key) || isGenericStudyHeading(title)) continue;
      usedTitles.add(key);
      phrases.push([buildPhraseTitle(title), note(phraseSpecificTeaching(title, book, chapter))]);
    }

    sections.push({
      chapter,
      startVerse,
      endVerse,
      title: `${book} ${chapter}:${startVerse}-${endVerse}`,
      phrases,
    });
  }

  return sections;
}

function makeFallbackPhrase(title: string, book: string, chapter: number): [string, string] {
  const cleanTitle = titleCase(stripLeadingIcon(title));
  return [
    buildPhraseTitle(cleanTitle),
    note(phraseSpecificTeaching(cleanTitle, book, chapter)),
  ];
}

function chunkSection(section: ParsedDeepSection, book: string, icon: string, fallbackPhrases: string[]) {
  const chunks: PersonalLeviticusPhraseSectionInput[] = [];
  let phraseCursor = 0;

  for (let start = section.startVerse; start <= section.endVerse; start += 6) {
    const end = Math.min(section.endVerse, start + 5);
    const chunkPhrases = section.phrases.slice(phraseCursor, phraseCursor + 7);
    phraseCursor += Math.max(4, chunkPhrases.length);

    while (chunkPhrases.length < 4) {
      const fallbackIndex = (section.chapter + start + chunks.length + chunkPhrases.length) % fallbackPhrases.length;
      const fallback = fallbackPhrases[fallbackIndex] || "The LORD Spake Unto Moses";
      chunkPhrases.push(makeFallbackPhrase(fallback, book, section.chapter));
    }

    const chunkTitle = chunkPhrases[0]?.[0]?.replace(/^📌\s*/, "") || section.title;

    const sectionIcon = getSectionIcon(book, section.chapter, start, chunkTitle);
    const displayTitle = /^[A-Za-z0-9'"]/.test(chunkTitle) ? `${sectionIcon} ${chunkTitle}` : chunkTitle;

    chunks.push({
      chapter: section.chapter,
      startVerse: start,
      endVerse: end,
      reference: `${book} ${section.chapter}:${start}-${end}`,
      title: displayTitle,
      icon: sectionIcon,
      phrases: chunkPhrases.slice(0, 7),
    });
  }

  return chunks;
}

export function buildGeneratedPersonalSections({
  book,
  notes,
  chapters,
  icon,
  fallbackPhrases,
}: GeneratedPersonalSectionOptions): PersonalLeviticusPhraseSectionInput[] {
  const sections: PersonalLeviticusPhraseSectionInput[] = [];

  for (const chapter of chapters) {
    const markdown = notes[chapter - 1] || "";
    const parsed = parseDeepSections(book, chapter, markdown);

    for (const section of parsed) {
      sections.push(...chunkSection(section, book, icon, fallbackPhrases));
    }
  }

  return normalizeAdjacentIcons(sections);
}
