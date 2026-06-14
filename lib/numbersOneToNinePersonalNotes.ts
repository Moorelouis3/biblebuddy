import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

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

function polishDay38NumbersSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  if (section.chapter !== 1) return section;

  return {
    ...section,
    ...(day38NumbersSectionHeadings[section.reference] || {}),
    phrases: (day38NumbersCuratedPhraseTitles[section.reference] || section.phrases.map(([title]) => title)).map((title) => {
      const finalTitle = replaceDay38NumbersPhraseTitle(title);
      return [finalTitle, makeDay38NumbersExplanation(finalTitle)];
    }),
  };
}

export const NUMBERS_1_9_PERSONAL_SECTIONS = generatedNumbersOneToNinePersonalSections.map(polishDay38NumbersSection);
