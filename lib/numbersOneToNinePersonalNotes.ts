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
    "This census detail belongs to Israel's ordered camp.",
    "The phrase belongs to Numbers 1, where God counts, orders, and prepares Israel for the wilderness journey.",
  ];
}

function makeDay38NumbersExplanation(title: string) {
  const finalTitle = replaceDay38NumbersPhraseTitle(title);
  const [lineOne, lineTwo] = getDay38NumbersMeaning(finalTitle);
  const cleanTitle = getDay38NumbersCleanTitle(finalTitle);

  return [lineOne, lineTwo, getDay38NumbersCueLines(finalTitle).join("\n"), `A reader should connect ${cleanTitle} to the bigger movement: the holy people are now becoming an ordered camp.`].join("\n\n");
}

function polishDay38NumbersSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  if (section.chapter !== 1) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title]) => {
      const finalTitle = replaceDay38NumbersPhraseTitle(title);
      return [finalTitle, makeDay38NumbersExplanation(finalTitle)];
    }),
  };
}

export const NUMBERS_1_9_PERSONAL_SECTIONS = generatedNumbersOneToNinePersonalSections.map(polishDay38NumbersSection);
