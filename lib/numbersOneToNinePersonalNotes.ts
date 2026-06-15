import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

const note = (lines: string[]) => lines.join("\n\n");

const generatedNumbersOneToNinePersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "By Their Armies",
    "According To Their Families",
    "Before The Tabernacle",
    "Keep The Charge",
    "As The LORD Commanded Moses",
  ],
});

const day39SectionIcons = [
  "🏕️", "🚩", "🧭", "🦁", "📍", "🛡️", "🌿", "🌊", "🔥", "✅",
  "👶", "📋", "⛺", "👨‍👩‍👦", "🧺", "🕯️", "🛕", "👕", "🔢", "🧑‍⚖️",
  "🪔", "🧳", "📦", "🛞", "🪢", "⚖️", "🧼", "🚪", "🕊️", "🍞",
  "💧", "🛑", "🙏", "👂", "🧎", "🌾", "📜", "💬", "✨",
];

const day40SectionIcons = [
  "🗣️", "🍇", "✂️", "🕊️", "🙏", "🌟", "🕯️", "🛞", "🥣", "⚖️",
  "🧾", "🪔", "🏛️", "💎", "🛡️", "📦", "🌿", "🔥", "✅", "🧼",
  "⛺", "👕", "📋", "🌙", "🩸", "🍞", "🧳", "☁️", "🚶", "🎺",
  "👥", "🕰️", "🛕", "💡", "🏕️",
];

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function buildSectionIconByReference(chapters: number[], icons: string[]) {
  return new Map(
    generatedNumbersOneToNinePersonalSections
      .filter((section) => chapters.includes(section.chapter))
      .map((section, index) => [section.reference, icons[index % icons.length]])
  );
}

const day39SectionIconByReference = buildSectionIconByReference([2, 3, 4, 5], day39SectionIcons);
const day40SectionIconByReference = buildSectionIconByReference([6, 7, 8, 9], day40SectionIcons);

const day38NumbersPhraseTitleReplacements: Record<string, string> = {
  "In The Tabernacle": "⛺ In The Tabernacle Of The Congregation",
  "The Second Year After Egypt": "📅 In The Second Year After They Were Come Out",
  "Reuben Comes First": "👤 Of Reuben; Elizur The Son Of Shedeur",
  "Judah Is Already Important": "🦁 Of Judah; Nahshon The Son Of Amminadab",
  "Each Tribe Has A Voice": "👥 Every One Head Of The House Of His Fathers",
  "Joseph Becomes Two Tribes": "🌿 Of The Children Of Joseph",
  "Benjamin Is Still Included": "👤 Of Benjamin",
  "The Remaining Tribes Have Their Place": "📋 These Were The Renowned Of The Congregation",
  "Reuben Is Counted": "📋 Those That Were Numbered Of The Tribe Of Reuben",
  "Simeon Is Counted": "📋 Those That Were Numbered Of The Tribe Of Simeon",
  "Gad Is Counted": "📋 Those That Were Numbered Of The Tribe Of Gad",
  "Judah Is Counted": "📋 Those That Were Numbered Of The Tribe Of Judah",
  "Issachar Is Counted": "📋 Those That Were Numbered Of The Tribe Of Issachar",
  "Zebulun Is Counted": "📋 Those That Were Numbered Of The Tribe Of Zebulun",
  "Ephraim Is Counted": "📋 Those That Were Numbered Of The Tribe Of Ephraim",
  "Manasseh Is Counted": "📋 Those That Were Numbered Of The Tribe Of Manasseh",
  "Benjamin Is Counted": "📋 Those That Were Numbered Of The Tribe Of Benjamin",
  "Dan Is Counted": "📋 Those That Were Numbered Of The Tribe Of Dan",
  "Asher Is Counted": "📋 Those That Were Numbered Of The Tribe Of Asher",
  "Naphtali Is Counted": "📋 Those That Were Numbered Of The Tribe Of Naphtali",
  "603,550": "🔢 Six Hundred Thousand And Three Thousand And Five Hundred And Fifty",
  "The Levites Are Set Apart": "⛺ Thou Shalt Not Number The Tribe Of Levi",
  "The Tabernacle Is Central": "🏕️ The Levites Shall Pitch Round About The Tabernacle",
  "That There Be No Wrath": "⚠️ That There Be No Wrath Upon The Congregation",
  "Everyone Has A Place": "📍 Every Man By His Own Camp",
};

function getDay38NumbersCleanTitle(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function replaceDay38NumbersPhraseTitle(title: string) {
  const cleanTitle = getDay38NumbersCleanTitle(title);
  return day38NumbersPhraseTitleReplacements[cleanTitle] || title;
}

const day38NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 1:1-4": [
    "🏜️ In The Wilderness Of Sinai",
    "⛺ In The Tabernacle Of The Congregation",
    "📅 In The Second Year After They Were Come Out",
    "📋 Take Ye The Sum Of All The Congregation",
    "👨‍👩‍👦 After Their Families",
    "⚔️ Able To Go Forth To War",
  ],
  "Numbers 1:5-9": [
    "🤝 Men That Shall Stand With You",
    "👤 Of Reuben; Elizur The Son Of Shedeur",
    "👤 Of Simeon; Shelumiel The Son Of Zurishaddai",
    "🦁 Of Judah; Nahshon The Son Of Amminadab",
    "👑 Every One Head Of The House Of His Fathers",
  ],
  "Numbers 1:10-15": [
    "🌿 Of The Children Of Joseph",
    "🧭 Of Ephraim; Elishama The Son Of Ammihud",
    "👤 Of Benjamin; Abidan The Son Of Gideoni",
    "👤 Of Dan; Ahiezer The Son Of Ammishaddai",
    "👤 Of Naphtali; Ahira The Son Of Enan",
  ],
  "Numbers 1:16-16": [
    "📣 These Were The Renowned Of The Congregation",
    "👑 Princes Of The Tribes Of Their Fathers",
    "🧩 Heads Of Thousands In Israel",
    "🏕️ Leaders Stand For Ordered People",
  ],
  "Numbers 1:17-19": [
    "🤝 Moses And Aaron Took These Men",
    "🕊️ Expressed By Their Names",
    "📖 They Declared Their Pedigrees",
    "🏠 By The House Of Their Fathers",
    "☁️ As The LORD Commanded Moses",
  ],
  "Numbers 1:20-25": [
    "🏠 The Children Of Reuben",
    "👑 Israel's Eldest Son",
    "📖 By Their Generations",
    "📋 Those That Were Numbered Of The Tribe Of Reuben",
    "📋 Those That Were Numbered Of The Tribe Of Simeon",
    "📋 Those That Were Numbered Of The Tribe Of Gad",
  ],
  "Numbers 1:26-27": [
    "🦁 Of The Children Of Judah",
    "👨‍👩‍👦 After Their Families",
    "🏠 By The House Of Their Fathers",
    "⚔️ Able To Go Forth To War",
  ],
  "Numbers 1:28-33": [
    "📋 Those That Were Numbered Of The Tribe Of Issachar",
    "📋 Those That Were Numbered Of The Tribe Of Zebulun",
    "📋 Those That Were Numbered Of The Tribe Of Ephraim",
    "📋 Those That Were Numbered Of The Tribe Of Manasseh",
    "🌿 Of The Children Of Joseph",
    "⚔️ Able To Go Forth To War",
  ],
  "Numbers 1:34-35": [
    "👤 Of The Children Of Manasseh",
    "👨‍👩‍👦 After Their Families",
    "🏠 By The House Of Their Fathers",
    "📋 Those That Were Numbered Of The Tribe Of Manasseh",
  ],
  "Numbers 1:36-41": [
    "📋 Those That Were Numbered Of The Tribe Of Benjamin",
    "📋 Those That Were Numbered Of The Tribe Of Dan",
    "📋 Those That Were Numbered Of The Tribe Of Asher",
    "📋 Those That Were Numbered Of The Tribe Of Naphtali",
    "🔢 Six Hundred Thousand And Three Thousand And Five Hundred And Fifty",
    "🏕️ All The Tribes Stand Accounted",
  ],
  "Numbers 1:42-46": [
    "👤 Of The Children Of Naphtali",
    "👨‍👩‍👦 After Their Families",
    "🏠 By The House Of Their Fathers",
    "⚔️ Able To Go Forth To War",
    "🔢 All They That Were Numbered Were Six Hundred Thousand",
  ],
  "Numbers 1:47-52": [
    "⛺ The Levites After The Tribe Of Their Fathers",
    "🚫 Thou Shalt Not Number The Tribe Of Levi",
    "🛖 Appoint The Levites Over The Tabernacle Of Testimony",
    "📦 Over All The Vessels Thereof",
    "🏕️ The Levites Shall Pitch Round About The Tabernacle",
    "⚠️ That There Be No Wrath Upon The Congregation",
  ],
  "Numbers 1:53-54": [
    "🛡️ The Levites Shall Keep The Charge",
    "⛺ The Tabernacle Of Testimony",
    "👥 The Children Of Israel Did According To All",
    "☁️ As The LORD Commanded Moses",
  ],
};

const day38NumbersSectionHeadings: Record<string, { icon: string; title: string }> = {
  "Numbers 1:1-4": { icon: "🏜️", title: "🏜️ Counted In The Wilderness" },
  "Numbers 1:5-9": { icon: "🤝", title: "🤝 Leaders Stand With Moses" },
  "Numbers 1:10-15": { icon: "🌿", title: "🌿 Joseph's Sons And The Tribes" },
  "Numbers 1:16-16": { icon: "📣", title: "📣 Renowned Heads Of Israel" },
  "Numbers 1:17-19": { icon: "📝", title: "📝 Names Declared Before The LORD" },
  "Numbers 1:20-25": { icon: "🧾", title: "🧾 Reuben, Simeon, And Gad Counted" },
  "Numbers 1:26-27": { icon: "🦁", title: "🦁 Judah Counted For War" },
  "Numbers 1:28-33": { icon: "📋", title: "📋 Issachar Through Manasseh Counted" },
  "Numbers 1:34-35": { icon: "👤", title: "👤 Manasseh Counted By Family" },
  "Numbers 1:36-41": { icon: "🔢", title: "🔢 The Remaining Tribes Counted" },
  "Numbers 1:42-46": { icon: "🪖", title: "🪖 The Full Army Number" },
  "Numbers 1:47-52": { icon: "🛕", title: "🛕 Levi Set Apart For The Tabernacle" },
  "Numbers 1:53-54": { icon: "✅", title: "✅ The Levites Keep The Charge" },
};

function getDay38NumbersCueLines(title: string) {
  const lower = getDay38NumbersCleanTitle(title).toLowerCase();

  if (/wilderness|sinai|second year|come out|journey/.test(lower)) {
    return ["🏜️ Wilderness setting", "📅 Journey timeline", "🧭 Israel being prepared"];
  }
  if (/tabernacle|congregation|levi|levites|charge|wrath|so did they|own camp/.test(lower)) {
    return ["⛺ Tabernacle guarded", "🛡️ Levites set apart", "🔥 Holy presence respected"];
  }
  if (/sum|numbered|six hundred|thousand|armies|war|host/.test(lower)) {
    return ["📋 Israel counted", "⚔️ Men able for war", "🏕️ Ordered camp"];
  }
  if (/families|fathers|pedigrees|generations|names|tribe|head|renowned|men that shall stand|son of|eldest/.test(lower)) {
    return ["👪 Family lines", "👤 Named leaders", "🏛️ Tribal order"];
  }
  if (/reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali|joseph/.test(lower)) {
    return ["🏷️ Tribe named", "📋 People counted", "🏕️ Place in the camp"];
  }
  if (/children of israel|every man/.test(lower)) {
    return ["👥 Covenant people", "🏕️ Ordered camp", "🧭 Ready for the journey"];
  }

  return ["🔎 Census detail", "🧭 Camp context", "🏕️ Israel ordered by God"];
}

function getDay38NumbersMeaning(title: string) {
  const cleanTitle = getDay38NumbersCleanTitle(title);
  const lower = cleanTitle.toLowerCase();

  if (/wilderness of sinai/.test(lower)) {
    return [
      "Numbers begins with Israel still in the wilderness near Sinai.",
      "The setting tells the reader that the rescued people are not settled yet; they are being prepared to travel with the LORD.",
    ];
  }
  if (/tabernacle of the congregation|tabernacle of testimony/.test(lower)) {
    return [
      "The count happens with the tabernacle at the center.",
      "Israel's camp is not organized around a palace or battlefield first, but around God's holy dwelling.",
    ];
  }
  if (/second year after they were come out/.test(lower)) {
    return [
      "The timing connects Numbers to the Exodus story.",
      "Israel has been rescued from Egypt, taught at Sinai, and now must learn how to move as an ordered people.",
    ];
  }
  if (/take ye the sum|all they that were numbered|six hundred thousand/.test(lower)) {
    return [
      "The census counts Israel for responsibility, movement, and battle.",
      "This is not a random list; it shows a once-enslaved people being formed into an ordered camp.",
    ];
  }
  if (/after their families|house of their fathers|pedigrees|generations/.test(lower)) {
    return [
      "The people are counted through family lines.",
      "Numbers wants the reader to see real households and covenant identity, not a faceless crowd.",
    ];
  }
  if (/able to go forth to war/.test(lower)) {
    return [
      "The census focuses on men able to serve in Israel's armies.",
      "The people are moving toward promised land conflict, so the count prepares them for the road ahead.",
    ];
  }
  if (/men that shall stand with you|renowned|princes|heads of thousands|head of the house/.test(lower)) {
    return [
      "Named leaders stand with Moses and Aaron in the work.",
      "The phrase shows order and accountability, because each tribe has recognized heads before the journey begins.",
    ];
  }
  if (/reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali|joseph/.test(lower)) {
    return [
      "This tribe is being named within the whole camp of Israel.",
      "Each tribe has a real place in the count, so God's people are ordered without being erased into one blur.",
    ];
  }
  if (/levites|tribe of levi|appoint the levites|vessels|keep the charge|wrath/.test(lower)) {
    return [
      "The Levites are set apart from the fighting census.",
      "Their assignment is to guard and serve the tabernacle, protecting Israel from careless contact with holy things.",
    ];
  }
  if (/as the lord commanded moses|did according to all/.test(lower)) {
    return [
      "The chapter closes by stressing obedience to the LORD's command.",
      "Israel is learning that order in the camp must come from God's word, not from convenience or guesswork.",
    ];
  }
  if (/leaders stand for ordered people/.test(lower)) {
    return [
      "The named leaders show that Israel's order has visible responsibility.",
      "Moses is not dealing with a crowd without structure; each tribe has recognized leadership before the LORD.",
    ];
  }

  if (/lord spake|moses|wilderness|sinai|second year|come out/.test(lower)) {
    return [
      "Numbers opens at a real moment in Israel's journey.",
      "The rescued people are still in the wilderness near Sinai, and the LORD is now preparing them to move as an ordered camp.",
    ];
  }
  if (/tabernacle|levi|levites|charge|wrath|so did they|own camp/.test(lower)) {
    return [
      "The tabernacle remains central even when Israel is preparing to move.",
      "The Levites are not counted with the fighting men because their work is to guard and serve the holy dwelling place of God.",
    ];
  }
  if (/sum|numbered|six hundred|thousand|armies|war|host/.test(lower)) {
    return [
      "Israel is being counted for ordered movement and battle.",
      "The census is not random recordkeeping; it shows the tribes arranged as a people ready to travel under God's command.",
    ];
  }
  if (/families|fathers|pedigrees|generations|names|tribe|head|renowned|men that shall stand|son of|eldest/.test(lower)) {
    return [
      "Israel is counted by families and fathers' houses.",
      "Numbers wants the reader to see real tribes, real households, and real leaders, not a faceless crowd.",
    ];
  }
  if (/reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali|joseph/.test(lower)) {
    return [
      "One tribe is being named inside the whole camp of Israel.",
      "Each tribe has its own place in the count, showing that God's people are ordered without being erased into one blur.",
    ];
  }
  if (/children of israel|every man|own camp/.test(lower)) {
    return [
      "Israel is being described as a gathered covenant people.",
      "The camp is ordered by tribe, family, and responsibility because the LORD is forming His people for the journey ahead.",
    ];
  }

  return [
    "This census detail helps the reader see Israel becoming an ordered camp.",
    "Numbers 1 is showing a rescued people counted, named, and prepared for the wilderness journey.",
  ];
}

function makeDay38NumbersExplanation(title: string) {
  const finalTitle = replaceDay38NumbersPhraseTitle(title);
  const [lineOne, lineTwo] = getDay38NumbersMeaning(finalTitle);

  return [lineOne, lineTwo, getDay38NumbersCueLines(finalTitle).join("\n")].join("\n\n");
}

function getNumbersOneToNineMeaning(title: string, section: PersonalLeviticusPhraseSectionInput) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();

  if (/lord spake|speak unto|say unto|as the lord commanded/.test(lower)) return ["The instruction begins with God's command.", "Moses receives the word so Israel's order comes from the LORD, not from human guesswork."];
  if (/ensign|standard|camp|pitch|far off|tabernacle/.test(lower)) return ["Israel's camp is arranged around the LORD's dwelling.", "The tribes do not move as a loose crowd; each family has a place near the tabernacle."];
  if (/judah|reuben|ephraim|dan|simeon|gad|issachar|zebulun|manasseh|benjamin|asher|naphtali|levi|levites/.test(lower)) return ["This tribe is named inside Israel's ordered camp.", "Numbers shows that every tribe has a real place, responsibility, and relationship to the tabernacle."];
  if (/firstborn|redeem|redemption|number|sum|count|poll|shekel|month old|able to go/.test(lower)) return ["The count gives Israel ordered responsibility before God.", "Numbers is not listing people for trivia; it is showing a rescued people prepared for worship, service, and journey."];
  if (/aaron|sons|priest|charge|service|minister|keep/.test(lower)) return ["The priests and Levites are responsible for holy service.", "Their work guards the tabernacle so God's presence is honored and the camp is protected."];
  if (/unclean|leper|issue|dead|without the camp|confess|restitution|trespass/.test(lower)) return ["Uncleanness and guilt must be dealt with inside the camp.", "God is teaching Israel that life near His presence requires cleansing, confession, and repair."];
  if (/nazarite|separate|wine|razor|hair|vow|holy unto the lord/.test(lower)) return ["The Nazarite vow sets a person apart to the LORD for a special season.", "The visible restrictions teach that dedication to God touches appetite, appearance, and contact with death."];
  if (/bless|keep thee|face shine|gracious|peace|put my name/.test(lower)) return ["The priestly blessing places God's care over His people.", "Israel needs more than camp order; they need the LORD's face, grace, and peace."];
  if (/offering|charger|bowl|spoon|bullock|ram|lamb|goat|incense|altar/.test(lower)) return ["The tribal gifts are brought for worship before the LORD.", "Repeated offerings show every tribe participating in the dedication of the altar."];
  if (/lamp|candlestick|levites|cleanse|sprinkle|shave|wash|wave offering/.test(lower)) return ["The Levites are cleansed and presented for service.", "Their work belongs to the LORD because they stand in the place of Israel's firstborn."];
  if (/passover|unleavened|cloud|journey|keep the charge|second month/.test(lower)) return ["Israel remembers rescue while preparing to travel.", "Passover, cloud, and command teach that the journey must stay under the LORD's direction."];

  return ["This detail belongs to Israel's ordered wilderness life.", `In ${section.reference}, the LORD is teaching the camp how to live, worship, and travel near His presence.`];
}

function getNumbersOneToNineBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord spake|speak unto|say unto|as the lord commanded/.test(lower)) return ["📜 God's command gives the order", "🧔 Moses receives the instruction", "🏕️ The camp must obey the LORD"];
  if (/camp|ensign|standard|tabernacle|journey/.test(lower)) return ["🏕️ The camp is ordered around God", "🧭 Each tribe has a place", "🙌 The journey follows the LORD"];
  if (/levi|levites|priest|aaron|sons|charge|service/.test(lower)) return ["⛺ Holy service is guarded", "👑 Priests and Levites have assigned work", "🛡️ The tabernacle must be honored"];
  if (/unclean|confess|trespass|restitution|leper|dead/.test(lower)) return ["🧼 Uncleanness is handled honestly", "🙏 Guilt must be confessed", "🤝 Harm must be repaired"];
  if (/nazarite|vow|separate|wine|hair|razor/.test(lower)) return ["🙌 The vow sets a person apart", "🚫 Ordinary pleasures are limited", "✨ Dedication becomes visible"];
  if (/bless|face|peace|gracious|name/.test(lower)) return ["🙌 Blessing comes from the LORD", "✨ God's face means favor", "🕊️ Peace is His gift"];
  if (/offering|charger|bowl|spoon|bullock|ram|lamb|goat|altar/.test(lower)) return ["🎁 Each tribe brings a gift", "🔥 Worship is offered before God", "📜 Dedication follows holy order"];
  return ["📜 Numbers records a real camp detail", "🏕️ Israel is being ordered around God's presence", "🙌 The LORD is teaching His people"];
}

function getNumbersDistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getNumbers95Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/sum|numbered|poll|families|fathers|tribe|armies|standard|ensign|camp|pitch/.test(lower)) return ["\u{1F4CB} Israel is counted and arranged", "\u{1F3D5}\u{FE0F} The camp centers on God's dwelling", "\u{1F9ED} Each tribe has its place", "\u{1F6B6} The people are prepared to travel"];
  if (/levi|levites|aaron|sons|priest|charge|service|tabernacle|vessels|bear/.test(lower)) return ["\u{26FA} Holy service is assigned", "\u{1F451} Priests and Levites guard the work", "\u{1F4E6} Sacred objects are handled carefully", "\u{1F6E1}\u{FE0F} The camp is protected from careless nearness"];
  if (/unclean|leper|issue|dead|without the camp|confess|restitution|trespass|jealousy|bitter water/.test(lower)) return ["\u{1F9FC} Uncleanness is handled honestly", "\u{1F64F} Guilt must be confessed", "\u{1F91D} Harm must be repaired", "\u{1F3D5}\u{FE0F} The camp remains ordered around God's presence"];
  if (/nazarite|separate|wine|razor|hair|vow|holy unto the lord/.test(lower)) return ["\u{1F64C} The vow sets a person apart", "\u{1F6AB} Ordinary pleasures are limited", "\u{2728} Dedication becomes visible", "\u{1F4DC} The days belong to the LORD"];
  if (/bless|keep thee|face|gracious|peace|name/.test(lower)) return ["\u{1F64C} Blessing comes from the LORD", "\u{2728} God's face means favor", "\u{1F54A}\u{FE0F} Peace is His gift", "\u{1F3D5}\u{FE0F} The camp lives under His name"];
  if (/offering|charger|bowl|spoon|bullock|ram|lamb|goat|incense|altar|dedication/.test(lower)) return ["\u{1F381} Each tribe brings a gift", "\u{1F525} Worship is offered before God", "\u{1F4DC} Dedication follows holy order", "\u{1F465} Every tribe participates"];
  if (/passover|unleavened|cloud|journey|trumpet|second month|at even|ordinance/.test(lower)) return ["\u{1F35E} Rescue is remembered", "\u{2601}\u{FE0F} The LORD guides the journey", "\u{1F4DC} The command orders the camp", "\u{1F6B6} Israel moves when God leads"];
  return ["\u{1F4DC} Numbers records a real camp detail", "\u{1F3D5}\u{FE0F} Israel is ordered around God's presence", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} The LORD teaches His people"];
}

function explainNumbersOneToNineAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string, occurrenceIndex = 0) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake|speak unto|say unto|commanded moses/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's camp order comes from God, not from human planning alone."];
  else if (/wilderness of sinai/.test(lower)) opening = ["The wilderness of Sinai is the desert region where Israel camped after leaving Egypt.", "Numbers begins with rescued people still near the mountain, preparing to travel."];
  else if (/tabernacle of the congregation|tabernacle/.test(lower)) opening = ["The tabernacle was the holy tent of meeting where the LORD dwelt among Israel.", "The camp is arranged around God's presence, not around human convenience."];
  else if (/second year|come out/.test(lower)) opening = ["The second year after Egypt places the census at a real point in Israel's journey.", "The rescued people are no longer escaping Egypt; they are being ordered for the road ahead."];
  else if (/take ye the sum|numbered|poll|sum/.test(lower)) opening = ["Taking the sum means counting the people.", "The census prepares Israel for ordered movement, service, and battle."];
  else if (/families|fathers|pedigrees|generations/.test(lower)) opening = ["Families and fathers' houses are Israel's household lines.", "Numbers counts real households, not a faceless crowd."];
  else if (/armies|war|host|able to go forth/.test(lower)) opening = ["Able to go forth to war means men counted for military service.", "The count prepares Israel for promised-land conflict under God's command."];
  else if (/reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali|joseph/.test(lower)) opening = ["The named tribe is being placed inside Israel's ordered camp.", "Each tribe has responsibility and location without being erased into the crowd."];
  else if (/levi|levites/.test(lower)) opening = ["The Levites were the tribe set apart for tabernacle service.", "They are counted differently because their work guards the holy dwelling."];
  else if (/standard|ensign|pitch|camp/.test(lower)) opening = ["A standard or ensign was a tribal banner or signal.", "The camp was arranged by tribe so Israel could move with order around the tabernacle."];
  else if (/firstborn/.test(lower)) opening = ["The firstborn belonged specially to the LORD because of the Passover rescue.", "Numbers explains how Levites stand in place of Israel's firstborn."];
  else if (/redeem|redemption|shekel/.test(lower)) opening = ["Redeem means buy back or release by payment.", "The redemption money shows that belonging to the LORD has a concrete cost and order."];
  else if (/charge|service|minister|bear|vessels|keep/.test(lower)) opening = ["Keeping charge means guarding an assigned holy responsibility.", "The Levites serve and carry sacred things according to God's order."];
  else if (/unclean|leper|issue|dead|without the camp/.test(lower)) opening = ["Unclean means not fit for normal camp or sanctuary access for a time.", "The camp must deal honestly with uncleanness because God's presence is in the middle."];
  else if (/confess|trespass|restitution/.test(lower)) opening = ["Confession names the wrong, and restitution repairs the harm.", "Numbers joins guilt before God with responsibility toward people."];
  else if (/jealousy|bitter water|suspected/.test(lower)) opening = ["The jealousy test addresses a broken-trust accusation in marriage.", "The ritual brings a hidden matter before the LORD instead of leaving it to private revenge."];
  else if (/nazarite|separate|vow/.test(lower)) opening = ["A Nazarite vow set a person apart to the LORD for a special season.", "The vow made dedication visible in daily habits."];
  else if (/wine|strong drink|vinegar|grapes/.test(lower)) opening = ["The Nazarite avoided wine and grape products during the vow.", "Limiting ordinary pleasure made the person's dedication visible."];
  else if (/razor|hair|locks/.test(lower)) opening = ["Uncut hair was the visible sign of the Nazarite vow.", "The growing hair marked the days of separation to the LORD."];
  else if (/dead body|dead/.test(lower)) opening = ["Contact with the dead would defile the Nazarite vow.", "Dedication to the LORD required distance from death during the vow period."];
  else if (/bless|keep thee|face shine|gracious|peace|put my name/.test(lower)) opening = ["The priestly blessing places the LORD's care over Israel.", "The camp needs God's keeping, favor, grace, and peace more than order alone."];
  else if (/charger|bowl|spoon/.test(lower)) opening = ["Chargers, bowls, and spoons were offering vessels.", "The tribal leaders bring costly gifts for altar dedication."];
  else if (/bullock|ram|lamb|goat|kid/.test(lower)) opening = ["The animal named here belongs to the offering brought before the LORD.", "The repeated gifts show every tribe participating in worship."];
  else if (/dedication|altar/.test(lower)) opening = ["Dedication means setting the altar apart for holy use.", "The tribal offerings mark the altar as central to worship in the camp."];
  else if (/lamp|candlestick/.test(lower)) opening = ["The lamps belonged to the holy-place lampstand.", "Their light had to be arranged according to the LORD's command."];
  else if (/sprinkle|shave|wash|cleanse/.test(lower)) opening = ["Sprinkling, shaving, and washing were cleansing actions.", "The Levites had to be cleansed before serving near holy things."];
  else if (/wave offering/.test(lower)) opening = ["A wave offering was presented before the LORD.", "The Levites themselves are presented as belonging to God for service."];
  else if (/passover/.test(lower)) opening = ["Passover remembers the LORD's rescue from Egypt.", "Even in the wilderness, Israel must keep rescue at the center of its life."];
  else if (/unleavened/.test(lower)) opening = ["Unleavened bread is bread made without leaven, so it does not rise.", "It keeps the memory of the hurried Exodus rescue alive."];
  else if (/second month/.test(lower)) opening = ["The second month provision gave a later Passover for people who were unclean or away.", "God's command makes room without turning obedience into guesswork."];
  else if (/cloud/.test(lower)) opening = ["The cloud was the visible sign of the LORD's presence over the tabernacle.", "Israel moved or stayed because God guided the camp."];
  else if (/trumpet/.test(lower)) opening = ["Trumpets were signals for gathering and movement.", "The sound helped the camp respond together to the LORD's order."];
  else opening = [`This wording names ${getNumbersDistinctiveTopic(cleanTitle)} in Numbers ${section.chapter}.`, "The phrase gives a concrete part of Israel's ordered wilderness life."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getNumbersDistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? ` This is repeated here because the section gives another command or response in the same scene.` : "";

  return [
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getNumbers95Support(cleanTitle),
  ].slice(0, 8);
}

function formatNumbersOneToNineMeaningFirstLines(section: PersonalLeviticusPhraseSectionInput, title: string, content: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  return note(explainNumbersOneToNineAt95(section, cleanTitle, occurrenceIndex));

  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleStartPattern = new RegExp(`^${escapedTitle}\\s+(means|shows|gives|helps|explains|teaches|marks|names|is|are|was|were|connects|keeps|points to|prepares|refers to|describes)\\s+`, "i");
  const isEmojiLine = (line: string) => /^[^A-Za-z0-9'"(]/.test(line.trim());
  const lines = content.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const cleaned = lines.map((line) => {
    let next = line.replace(titleStartPattern, (_match, verb: string) => {
      const action = verb.toLowerCase();
      if (action === "means" || action === "refers to") return "";
      if (action === "is") return "This is ";
      if (action === "are") return "These are ";
      if (action === "was") return "This was ";
      if (action === "were") return "These were ";
      return `This ${action} `;
    });
    next = next
      .replace(/^The LORD Spake Unto Moses(?: And Unto Aaron)? means\s+/i, "The instruction begins with ")
      .replace(new RegExp(`\\b${escapedTitle}\\b`, "gi"), "This detail")
      .replace(/\bnames an exact detail (?:a beginner|the reader) is meant to notice in this part of Numbers\.?/gi, "belongs to Israel's ordered wilderness life.")
      .replace(/\bThe phrase may be small, but it belongs to the way the passage moves the story, command, warning, or promise forward\.?/gi, `It matters inside ${section.reference} because the camp is learning God's order.`)
      .replace(/\bThis phrase\b/gi, "This")
      .replace(/\bThe phrase\b/gi, "This")
      .replace(/\bThe wording\b/gi, "This")
      .replace(/\bDeuteronomy\b/gi, "Numbers")
      .replace(/\bhelps the reader\b/gi, "shows")
      .replace(/\bhelps readers\b/gi, "shows")
      .replace(/\bthe reader\b/gi, "a beginner")
      .replace(/\breaders\b/gi, "beginners")
      .replace(/\bA beginner should\b/gi, "Notice")
      .replace(/\bNotice notice that\b/gi, "Notice that");
    return next.replace(/^([a-z])/, (letter) => letter.toUpperCase());
  });
  const proseLines = cleaned.filter((line) => !isEmojiLine(line) && !/A detail to notice|Movement in the passage|Meaning for Israel/i.test(line));
  const hasGenericCarryover = proseLines.some((line) => /ordinary daily life|homes, work, property|may sound small|story, command, warning|vague summary|Bible's wording|larger story|detail to notice|Deuteronomy|Leviticus|Notice notice/i.test(line));
  const opening = !hasGenericCarryover && proseLines.length >= 2 ? proseLines.slice(0, 3) : getNumbersOneToNineMeaning(title, section);
  const bullets = cleaned.filter(isEmojiLine).slice(0, 4);
  const teachingBullets = !hasGenericCarryover && bullets.length >= 3 ? bullets : getNumbersOneToNineBullets(title);
  const closing = hasGenericCarryover ? [] : proseLines.slice(opening.length).filter((line) => !/exact detail|small, but|faceless crowd|reader/i.test(line));

  return note([...opening, ...teachingBullets, ...closing].slice(0, 8));
}

function polishDay38NumbersSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  if (section.chapter !== 1) return section;

  return {
    ...section,
    ...(day38NumbersSectionHeadings[section.reference] || {}),
    phrases: (() => {
      const seen = new Map<string, number>();
      return (day38NumbersCuratedPhraseTitles[section.reference] || section.phrases.map(([title]) => title)).map((title) => {
      const finalTitle = replaceDay38NumbersPhraseTitle(title);
      const key = stripLeadingEmoji(finalTitle).toLowerCase();
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);
      return [finalTitle, formatNumbersOneToNineMeaningFirstLines(section, finalTitle, makeDay38NumbersExplanation(finalTitle), occurrence)];
      });
    })(),
  };
}

function polishDay39To40NumbersSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const icon = day39SectionIconByReference.get(section.reference) || day40SectionIconByReference.get(section.reference);
  if (!icon) return section;

  return {
    ...section,
    icon,
    title: `${icon} ${stripLeadingEmoji(section.title)}`,
    phrases: (() => {
      const seen = new Map<string, number>();
      return section.phrases.map(([title, content]) => {
        const key = stripLeadingEmoji(title).toLowerCase();
        const occurrence = seen.get(key) ?? 0;
        seen.set(key, occurrence + 1);
        return [
          title,
          formatNumbersOneToNineMeaningFirstLines(section, title, content, occurrence),
        ];
      });
    })(),
  };
}

export const NUMBERS_1_9_PERSONAL_SECTIONS = generatedNumbersOneToNinePersonalSections
  .map(polishDay38NumbersSection)
  .map(polishDay39To40NumbersSection);
