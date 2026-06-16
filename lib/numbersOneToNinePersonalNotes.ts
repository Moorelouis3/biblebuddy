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

const day39NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 2:1-2": [
    "📣 The LORD Spake Unto Moses And Unto Aaron",
    "🚩 Every Man By His Own Standard",
    "🏠 With The Ensign Of Their Father's House",
    "⛺ Far Off About The Tabernacle",
  ],
  "Numbers 2:3-8": [
    "🌅 On The East Side Toward The Rising Of The Sun",
    "🦁 The Standard Of The Camp Of Judah",
    "👑 Nahshon The Son Of Amminadab",
    "🌾 The Tribe Of Issachar",
    "🛳️ The Tribe Of Zebulun",
  ],
  "Numbers 2:9-9": [
    "📋 All That Were Numbered In The Camp Of Judah",
    "⚔️ An Hundred Thousand And Fourscore Thousand",
    "🚶 These Shall First Set Forth",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 2:10-15": [
    "🧭 On The South Side Shall Be The Standard Of Reuben",
    "👤 Elizur The Son Of Shedeur",
    "🧑‍🤝‍🧑 The Tribe Of Simeon",
    "🛡️ The Tribe Of Gad",
    "🏕️ According To Their Armies",
  ],
  "Numbers 2:16-16": [
    "📋 All That Were Numbered In The Camp Of Reuben",
    "⚔️ An Hundred Thousand And One And Fifty Thousand",
    "🚶 They Shall Set Forth In The Second Rank",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 2:18-23": [
    "🌊 On The West Side Shall Be The Standard Of Ephraim",
    "🌿 Elishama The Son Of Ammihud",
    "🌿 The Tribe Of Manasseh",
    "🐺 The Tribe Of Benjamin",
    "🏕️ According To Their Armies",
  ],
  "Numbers 2:24-24": [
    "📋 All That Were Numbered Of The Camp Of Ephraim",
    "⚔️ An Hundred Thousand And Eight Thousand",
    "🚶 They Shall Go Forward In The Third Rank",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 2:25-30": [
    "🧭 The Standard Of The Camp Of Dan Shall Be On The North",
    "⚖️ Ahiezer The Son Of Ammishaddai",
    "🌳 The Tribe Of Asher",
    "🦌 The Tribe Of Naphtali",
    "🏕️ According To Their Armies",
  ],
  "Numbers 2:31-31": [
    "📋 All They That Were Numbered In The Camp Of Dan",
    "⚔️ An Hundred Thousand And Fifty And Seven Thousand",
    "🚶 They Shall Go Hindmost With Their Standards",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 2:32-34": [
    "📋 These Are Those Which Were Numbered",
    "🚫 The Levites Were Not Numbered Among The Children Of Israel",
    "🚩 So They Pitched By Their Standards",
    "🚶 So They Set Forward",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 3:1-4": [
    "📜 The Generations Of Aaron And Moses",
    "🫒 The Priests Which Were Anointed",
    "🔥 Nadab And Abihu Died Before The LORD",
    "👶 They Had No Children",
    "🛕 Eleazar And Ithamar Ministered",
  ],
  "Numbers 3:5-10": [
    "📣 The LORD Spake Unto Moses",
    "⛺ Bring The Tribe Of Levi Near",
    "👑 Present Them Before Aaron The Priest",
    "🛡️ They Shall Keep His Charge",
    "🚫 The Stranger That Cometh Nigh Shall Be Put To Death",
  ],
  "Numbers 3:11-13": [
    "🧑‍🍼 I Have Taken The Levites",
    "👶 Instead Of All The Firstborn",
    "🩸 On The Day That I Smote All The Firstborn",
    "✨ All The Firstborn Are Mine",
    "🕊️ I Am The LORD",
  ],
  "Numbers 3:14-19": [
    "🏜️ In The Wilderness Of Sinai",
    "👶 From A Month Old And Upward",
    "📋 Moses Numbered Them",
    "👨‍👦 Gershon, And Kohath, And Merari",
  ],
  "Numbers 3:20-20": [
    "👨‍👦 The Sons Of Merari By Their Families",
    "📋 These Are The Families Of The Levites",
    "🏠 According To The House Of Their Fathers",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 3:21-26": [
    "🏠 Of Gershon Was The Family Of The Libnites",
    "⛺ The Tent, And The Covering Thereof",
    "🚪 The Hanging For The Door Of The Tabernacle",
    "🪢 The Cords Of It",
    "🛡️ All The Service Thereof",
  ],
  "Numbers 3:27-32": [
    "🏠 Of Kohath Was The Family Of The Amramites",
    "📦 The Ark, And The Table",
    "🪔 The Candlestick, And The Altars",
    "👑 Eleazar The Son Of Aaron The Priest",
    "🛡️ The Oversight Of Them That Keep The Charge",
  ],
  "Numbers 3:33-37": [
    "🏠 Of Merari Was The Family Of The Mahlites",
    "🪵 The Boards Of The Tabernacle",
    "🧱 The Bars Thereof",
    "🪨 The Pillars Thereof",
    "🔩 The Sockets Thereof",
  ],
  "Numbers 3:38-39": [
    "🌅 Before The Tabernacle Toward The East",
    "👑 Moses, And Aaron And His Sons",
    "🛡️ Keeping The Charge Of The Sanctuary",
    "🚫 The Stranger That Cometh Nigh Shall Be Put To Death",
    "📋 Twenty And Two Thousand",
  ],
  "Numbers 3:40-45": [
    "👶 Number All The Firstborn Males",
    "📋 Take The Number Of Their Names",
    "🔁 Thou Shalt Take The Levites For Me",
    "🐄 The Cattle Of The Levites",
    "🕊️ I Am The LORD",
  ],
  "Numbers 3:46-51": [
    "➕ The Two Hundred Threescore And Thirteen",
    "💰 Five Shekels Apiece By The Poll",
    "⚖️ After The Shekel Of The Sanctuary",
    "👑 Give The Money Unto Aaron And To His Sons",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 4:1-3": [
    "📣 The LORD Spake Unto Moses And Unto Aaron",
    "🏠 After Their Families",
    "🛡️ By The House Of Their Fathers",
    "🔢 From Thirty Years Old And Upward",
    "⛺ To Do The Work In The Tabernacle",
  ],
  "Numbers 4:4-9": [
    "✨ About The Most Holy Things",
    "☁️ When The Camp Setteth Forward",
    "📦 They Shall Take Down The Covering Vail",
    "📜 Cover The Ark Of Testimony",
    "🚫 They Shall Not Touch Any Holy Thing",
    "⚠️ Lest They Die",
  ],
  "Numbers 4:10-15": [
    "📦 All The Vessels Thereof",
    "🛡️ They Shall Put It Upon A Bar",
    "👑 Aaron And His Sons Have Made An End",
    "💪 The Sons Of Kohath Shall Come To Bear It",
    "⚠️ They Shall Not Touch Any Holy Thing",
  ],
  "Numbers 4:17-20": [
    "📣 The LORD Spake Unto Moses And Unto Aaron",
    "🚫 Cut Ye Not Off The Tribe Of The Families Of The Kohathites",
    "🕊️ That They May Live",
    "👑 Aaron And His Sons Shall Go In",
    "👁️ They Shall Not Go In To See",
    "⚠️ Lest They Die",
  ],
  "Numbers 4:21-26": [
    "📣 The LORD Spake Unto Moses",
    "🏠 Take Also The Sum Of The Sons Of Gershon",
    "📦 To Bear Curtains",
    "🪢 And For Burdens",
    "👑 Under The Hand Of Ithamar",
  ],
  "Numbers 4:27-28": [
    "👑 At The Appointment Of Aaron And His Sons",
    "🛡️ Ye Shall Appoint Unto Them In Charge",
    "⛺ Their Service In The Tabernacle",
    "👑 Under The Hand Of Ithamar",
  ],
  "Numbers 4:29-33": [
    "🪵 As For The Sons Of Merari",
    "🧱 The Boards Of The Tabernacle",
    "🪢 The Bars Thereof",
    "🪨 The Pillars Thereof",
    "🔩 And Sockets Thereof",
    "📌 By Name Ye Shall Reckon",
  ],
  "Numbers 4:34-37": [
    "📋 Moses And Aaron Numbered The Sons Of The Kohathites",
    "🏠 After Their Families",
    "🔢 From Thirty Years Old And Upward",
    "⛺ Every One That Entered Into The Service",
    "✅ According To The Commandment Of The LORD",
  ],
  "Numbers 4:38-41": [
    "📋 Those That Were Numbered Of The Sons Of Gershon",
    "🏠 Throughout Their Families",
    "🔢 From Thirty Years Old And Upward",
    "⛺ To Do Service In The Tabernacle",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 4:42-45": [
    "📋 Those That Were Numbered Of The Families Of Merari",
    "🔢 From Thirty Years Old And Upward",
    "⛺ Every One That Entered Into The Service",
    "👑 By The Hand Of Moses",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 4:46-49": [
    "📋 All Those That Were Numbered Of The Levites",
    "🔢 From Thirty Years Old And Upward",
    "🛠️ For The Service Of The Ministry",
    "📦 And For The Service Of The Burden",
    "✅ According To The Commandment Of The LORD",
  ],
  "Numbers 5:1-4": [
    "📣 The LORD Spake Unto Moses",
    "🧼 Every Leper",
    "💧 Every One That Hath An Issue",
    "⚰️ Whosoever Is Defiled By The Dead",
    "🚪 Without The Camp Shall Ye Put Them",
    "⛺ That They Defile Not Their Camps",
  ],
  "Numbers 5:5-10": [
    "📣 The LORD Spake Unto Moses",
    "🗣️ Speak Unto The Children Of Israel",
    "🙏 Then They Shall Confess Their Sin",
    "💰 Recompense His Trespass With The Principal",
    "➕ Add Unto It The Fifth Part",
    "👑 Let The Trespass Be Recompensed Unto The LORD",
  ],
  "Numbers 5:11-15": [
    "📣 The LORD Spake Unto Moses",
    "💔 If Any Man's Wife Go Aside",
    "🛏️ A Man Lie With Her Carnally",
    "🕵️ It Be Hid From The Eyes Of Her Husband",
    "🌾 The Offering Of Jealousy",
    "🧠 Bringing Iniquity To Remembrance",
  ],
  "Numbers 5:16-21": [
    "👑 The Priest Shall Bring Her Near",
    "🌊 Holy Water In An Earthen Vessel",
    "🪨 Dust That Is In The Floor Of The Tabernacle",
    "🧕 Uncover The Woman's Head",
    "📜 The Priest Shall Charge Her By An Oath",
  ],
  "Numbers 5:22-22": [
    "🌊 This Water That Causeth The Curse",
    "💔 To Make Thy Belly To Swell",
    "🦵 And Thy Thigh To Rot",
    "🗣️ The Woman Shall Say, Amen, Amen",
  ],
  "Numbers 5:23-28": [
    "📖 The Priest Shall Write These Curses In A Book",
    "🌊 Blot Them Out With The Bitter Water",
    "🥣 Cause The Woman To Drink",
    "🛑 If She Be Defiled",
    "✅ If The Woman Be Not Defiled",
    "👶 She Shall Conceive Seed",
  ],
  "Numbers 5:29-31": [
    "⚖️ This Is The Law Of Jealousies",
    "💔 When A Wife Goeth Aside",
    "👑 The Priest Shall Execute Upon Her All This Law",
    "🛡️ The Man Shall Be Guiltless",
    "⚠️ This Woman Shall Bear Her Iniquity",
  ],
};

const day40NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 6:1-4": [
    "📣 The LORD Spake Unto Moses",
    "🗣️ Speak Unto The Children Of Israel",
    "🙌 Separate Themselves Unto The LORD",
    "🍇 Wine And Strong Drink",
    "🚫 Eat Nothing That Is Made Of The Vine Tree",
  ],
  "Numbers 6:5-8": [
    "✂️ There Shall No Razor Come Upon His Head",
    "💇 The Locks Of The Hair Of His Head Shall Grow",
    "⚰️ He Shall Come At No Dead Body",
    "✨ The Consecration Of His God Is Upon His Head",
    "🕊️ He Is Holy Unto The LORD",
  ],
  "Numbers 6:9-12": [
    "⚰️ If Any Man Die Very Suddenly By Him",
    "🧼 He Shall Shave His Head",
    "🕊️ Two Turtles, Or Two Young Pigeons",
    "⚠️ Because His Separation Was Defiled",
    "🔁 The Days That Were Before Shall Be Lost",
  ],
  "Numbers 6:13-17": [
    "📜 This Is The Law Of The Nazarite",
    "🚪 When The Days Of His Separation Are Fulfilled",
    "🐑 One He Lamb Of The First Year",
    "🐏 One Ram Without Blemish",
    "🍞 A Basket Of Unleavened Bread",
  ],
  "Numbers 6:18-21": [
    "💇 Shave The Head Of His Separation",
    "🔥 Put It In The Fire",
    "🙌 The Priest Shall Wave Them",
    "🍷 After That The Nazarite May Drink Wine",
    "📜 This Is The Law Of The Nazarite",
  ],
  "Numbers 6:22-27": [
    "📣 The LORD Spake Unto Moses",
    "👑 Speak Unto Aaron And Unto His Sons",
    "🙌 The LORD Bless Thee, And Keep Thee",
    "🌟 The LORD Make His Face Shine Upon Thee",
    "🕊️ The LORD Lift Up His Countenance Upon Thee",
    "📛 Put My Name Upon The Children Of Israel",
  ],
  "Numbers 7:1-3": [
    "🫒 Moses Had Fully Set Up The Tabernacle",
    "✨ Anointed It, And Sanctified It",
    "👑 The Princes Of Israel",
    "🎁 Brought Their Offering Before The LORD",
    "🛞 Six Covered Wagons",
    "🐂 Twelve Oxen",
  ],
  "Numbers 7:4-9": [
    "📣 The LORD Spake Unto Moses",
    "🎁 Take It Of Them",
    "⛺ For The Service Of The Tabernacle",
    "👨‍👦 Unto The Sons Of Gershon",
    "👨‍👦 Unto The Sons Of Merari",
    "📦 Unto The Sons Of Kohath He Gave None",
  ],
  "Numbers 7:10-15": [
    "👑 Nahshon The Son Of Amminadab",
    "🦁 Of The Tribe Of Judah",
    "🥣 One Silver Charger",
    "🩸 For A Burnt Offering",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:16-17": [
    "🐂 Two Oxen",
    "🐏 Five Rams",
    "🐐 Five He Goats",
    "🐑 Five Lambs Of The First Year",
  ],
  "Numbers 7:18-23": [
    "📅 On The Second Day",
    "👑 Nethaneel The Son Of Zuar",
    "🌾 Prince Of Issachar",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:24-29": [
    "📅 On The Third Day",
    "👑 Eliab The Son Of Helon",
    "🛳️ Prince Of The Children Of Zebulun",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:30-35": [
    "📅 On The Fourth Day",
    "👑 Elizur The Son Of Shedeur",
    "🧭 Prince Of The Children Of Reuben",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:36-41": [
    "📅 On The Fifth Day",
    "👑 Shelumiel The Son Of Zurishaddai",
    "🧑‍🤝‍🧑 Prince Of The Children Of Simeon",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:42-47": [
    "📅 On The Sixth Day",
    "👑 Eliasaph The Son Of Deuel",
    "🛡️ Prince Of The Children Of Gad",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:48-53": [
    "📅 On The Seventh Day",
    "👑 Elishama The Son Of Ammihud",
    "🌊 Prince Of The Children Of Ephraim",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:54-59": [
    "📅 On The Eighth Day",
    "👑 Gamaliel The Son Of Pedahzur",
    "🌿 Prince Of The Children Of Manasseh",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:60-65": [
    "📅 On The Ninth Day",
    "👑 Abidan The Son Of Gideoni",
    "🐺 Prince Of The Children Of Benjamin",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:66-71": [
    "📅 On The Tenth Day",
    "👑 Ahiezer The Son Of Ammishaddai",
    "⚖️ Prince Of The Children Of Dan",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:72-77": [
    "📅 On The Eleventh Day",
    "👑 Pagiel The Son Of Ocran",
    "🌳 Prince Of The Children Of Asher",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:78-83": [
    "📅 On The Twelfth Day",
    "👑 Ahira The Son Of Enan",
    "🦌 Prince Of The Children Of Naphtali",
    "🥣 One Silver Charger",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🕊️ For A Sacrifice Of Peace Offerings",
  ],
  "Numbers 7:84-88": [
    "🔥 This Was The Dedication Of The Altar",
    "📅 In The Day When It Was Anointed",
    "🥣 Twelve Chargers Of Silver",
    "🐂 Twelve Bullocks",
    "🐏 The Rams Twelve",
    "🐐 The Kids Of The Goats Twelve",
  ],
  "Numbers 8:1-4": [
    "📣 The LORD Spake Unto Moses",
    "👑 Speak Unto Aaron",
    "🪔 When Thou Lightest The Lamps",
    "💡 The Seven Lamps Shall Give Light",
    "🕯️ Over Against The Candlestick",
    "🔨 Of Beaten Gold",
  ],
  "Numbers 8:5-7": [
    "📣 The LORD Spake Unto Moses",
    "🧼 Take The Levites From Among The Children Of Israel",
    "💧 Sprinkle Water Of Purifying Upon Them",
    "🪒 Let Them Shave All Their Flesh",
    "👕 Let Them Wash Their Clothes",
    "✨ So Make Themselves Clean",
  ],
  "Numbers 8:8-11": [
    "🐂 Let Them Take A Young Bullock",
    "🌾 His Meat Offering",
    "🐂 Another Young Bullock Shalt Thou Take",
    "👥 Gather Thou The Whole Assembly",
    "🤲 The Children Of Israel Shall Put Their Hands Upon The Levites",
    "🙌 Aaron Shall Offer The Levites Before The LORD",
  ],
  "Numbers 8:12-15": [
    "🤲 The Levites Shall Lay Their Hands",
    "🐂 Offer The One For A Sin Offering",
    "🔥 The Other For A Burnt Offering",
    "✨ To Make An Atonement For The Levites",
    "🙌 Set The Levites Before Aaron",
  ],
  "Numbers 8:16-19": [
    "🔁 They Are Wholly Given Unto Me",
    "👶 Instead Of Such As Open Every Womb",
    "🩸 On The Day That I Smote Every Firstborn",
    "🎁 I Have Given The Levites As A Gift",
    "🛡️ To Make An Atonement For The Children Of Israel",
  ],
  "Numbers 8:20-22": [
    "✅ Moses, And Aaron, And All The Congregation",
    "🧼 The Levites Were Purified",
    "👕 They Washed Their Clothes",
    "🙌 Aaron Offered Them As An Offering",
    "🛕 The Levites Went In To Do Their Service",
  ],
  "Numbers 8:23-26": [
    "📣 The LORD Spake Unto Moses",
    "🔢 From Twenty And Five Years Old And Upward",
    "🛠️ To Wait Upon The Service",
    "🛑 From The Age Of Fifty Years They Shall Cease",
    "🤝 Shall Minister With Their Brethren",
    "🚫 Shall Do No Service",
  ],
  "Numbers 9:1-5": [
    "🏜️ In The Wilderness Of Sinai",
    "📅 In The First Month Of The Second Year",
    "🐑 Let The Children Of Israel Keep The Passover",
    "🌙 At Even",
    "📜 According To All The Rites Of It",
    "✅ As The LORD Commanded Moses",
  ],
  "Numbers 9:6-8": [
    "⚰️ Defiled By The Dead Body Of A Man",
    "🚫 Wherefore Are We Kept Back",
    "🎁 Offer An Offering Of The LORD",
    "⏳ Stand Still",
    "👂 I Will Hear What The LORD Will Command",
  ],
  "Numbers 9:9-14": [
    "📣 The LORD Spake Unto Moses",
    "📅 The Fourteenth Day Of The Second Month",
    "🍞 Eat It With Unleavened Bread And Bitter Herbs",
    "🚫 He Shall Leave None Of It Unto The Morning",
    "🌍 One Ordinance",
    "👤 Both For The Stranger",
  ],
  "Numbers 9:15-16": [
    "☁️ The Cloud Covered The Tabernacle",
    "🔥 The Appearance Of Fire By Night",
    "🌙 Until The Morning",
    "🔁 So It Was Alway",
  ],
  "Numbers 9:17-22": [
    "☁️ When The Cloud Was Taken Up",
    "🚶 Then After That The Children Of Israel Journeyed",
    "⛺ There The Children Of Israel Pitched Their Tents",
    "📅 Whether It Were Two Days, Or A Month, Or A Year",
    "📣 At The Commandment Of The LORD They Journeyed",
  ],
  "Numbers 9:23-23": [
    "🛡️ They Kept The Charge Of The LORD",
    "📣 At The Commandment Of The LORD",
    "🤲 By The Hand Of Moses",
    "✅ As The LORD Commanded Moses",
  ],
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

  if (/levi|levites|aaron|sons|priest|charge|service|tabernacle|vessels|bear/.test(lower)) return ["\u{26FA} Holy service is assigned", "\u{1F451} Priests and Levites guard the work", "\u{1F4E6} Sacred objects are handled carefully", "\u{1F6E1}\u{FE0F} The camp is protected from careless nearness"];
  if (/sum|numbered|poll|families|fathers|tribe|armies|standard|ensign|camp|pitch/.test(lower)) return ["\u{1F4CB} Israel is counted and arranged", "\u{1F3D5}\u{FE0F} The camp centers on God's dwelling", "\u{1F9ED} Each tribe has its place", "\u{1F6B6} The people are prepared to travel"];
  if (/unclean|leper|issue|dead|without the camp|confess|restitution|trespass|jealousy|bitter water/.test(lower)) return ["\u{1F9FC} Uncleanness is handled honestly", "\u{1F64F} Guilt must be confessed", "\u{1F91D} Harm must be repaired", "\u{1F3D5}\u{FE0F} The camp remains ordered around God's presence"];
  if (/nazarite|separate|wine|razor|hair|vow|holy unto the lord/.test(lower)) return ["\u{1F64C} The vow sets a person apart", "\u{1F6AB} Ordinary pleasures are limited", "\u{2728} Dedication becomes visible", "\u{1F4DC} The days belong to the LORD"];
  if (/bless|keep thee|face|gracious|peace|name/.test(lower)) return ["\u{1F64C} Blessing comes from the LORD", "\u{2728} God's face means favor", "\u{1F54A}\u{FE0F} Peace is His gift", "\u{1F3D5}\u{FE0F} The camp lives under His name"];
  if (/offering|charger|bowl|spoon|bullock|ram|lamb|goat|incense|altar|dedication/.test(lower)) return ["\u{1F381} Each tribe brings a gift", "\u{1F525} Worship is offered before God", "\u{1F4DC} Dedication follows holy order", "\u{1F465} Every tribe participates"];
  if (/passover|unleavened|cloud|journey|trumpet|second month|at even|ordinance/.test(lower)) return ["\u{1F35E} Rescue is remembered", "\u{2601}\u{FE0F} The LORD guides the journey", "\u{1F4DC} The command orders the camp", "\u{1F6B6} Israel moves when God leads"];
  return ["\u{1F4DC} Numbers records camp order", "\u{1F3D5}\u{FE0F} Israel gathers around God's presence", "\u{1F9E0} The census gives real structure", "\u{1F64C} The LORD teaches His people"];
}

function getDay39SectionContext(section: PersonalLeviticusPhraseSectionInput) {
  const contextByReference: Record<string, string> = {
    "Numbers 2:1-2": "the command to camp by standards around the tabernacle",
    "Numbers 2:3-8": "Judah's east-side camp",
    "Numbers 2:9-9": "Judah's camp setting out first",
    "Numbers 2:10-15": "Reuben's south-side camp",
    "Numbers 2:16-16": "Reuben's camp setting out second",
    "Numbers 2:18-23": "Ephraim's west-side camp",
    "Numbers 2:24-24": "Ephraim's camp setting out third",
    "Numbers 2:25-30": "Dan's north-side camp",
    "Numbers 2:31-31": "Dan's camp guarding the rear",
    "Numbers 2:32-34": "the full camp order",
    "Numbers 3:1-4": "Aaron's priestly family",
    "Numbers 3:5-10": "the Levites being brought near to Aaron",
    "Numbers 3:11-13": "the Levites replacing Israel's firstborn",
    "Numbers 3:14-19": "the numbering of Levi's clans",
    "Numbers 3:20-20": "Merari's family line",
    "Numbers 3:21-26": "Gershon's tabernacle duties",
    "Numbers 3:27-32": "Kohath's most holy duties",
    "Numbers 3:33-37": "Merari's frame-and-socket duties",
    "Numbers 3:38-39": "the east-side guard before the tabernacle",
    "Numbers 3:40-45": "the firstborn redemption exchange",
    "Numbers 3:46-51": "the redemption money for the extra firstborn",
    "Numbers 4:1-3": "the Kohathite service census",
    "Numbers 4:4-9": "covering the most holy things",
    "Numbers 4:10-15": "Kohath carrying the covered holy things",
    "Numbers 4:17-20": "protecting the Kohathites from death",
    "Numbers 4:21-26": "Gershon's carrying duties",
    "Numbers 4:27-28": "Gershon serving under priestly appointment",
    "Numbers 4:29-33": "Merari's assigned burdens",
    "Numbers 4:34-37": "Kohath's final service count",
    "Numbers 4:38-41": "Gershon's final service count",
    "Numbers 4:42-45": "Merari's final service count",
    "Numbers 4:46-49": "the full Levite service total",
    "Numbers 5:1-4": "camp cleansing from uncleanness",
    "Numbers 5:5-10": "confession and restitution",
    "Numbers 5:11-15": "the jealousy offering",
    "Numbers 5:16-21": "the priestly oath ritual",
    "Numbers 5:22-22": "the curse oath",
    "Numbers 5:23-28": "the bitter-water test",
    "Numbers 5:29-31": "the law of jealousies",
  };

  return contextByReference[section.reference] || stripLeadingEmoji(section.title).toLowerCase();
}

function getDay39NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/standard|ensign|camp|east|south|west|north|set forth|set forward|forward|rank|hindmost|pitched|armies|far off|tabernacle/.test(lower)) return ["🏕️ The camp is ordered", "🚩 Each tribe has a place", "⛺ The tabernacle stays central", "🚶 Israel moves in formation"];
  if (/judah|reuben|simeon|gad|ephraim|manasseh|benjamin|dan|asher|naphtali|issachar|zebulun|nahshon|elizur|elishama|ahiezer/.test(lower)) return ["🏷️ The tribe is named", "👤 Leadership is visible", "📋 The count is orderly", "🏕️ The camp has structure"];
  if (/numbered|hundred|thousand|fourscore|fifty|seven thousand|twenty and two|poll|sum|names/.test(lower)) return ["📋 The people are counted", "🏠 Families are remembered", "⚖️ The number has purpose", "🚶 Israel is prepared to move"];
  if (/levi|levites|firstborn|smote all the firstborn|mine|cattle|month old|wilderness of sinai|i am the lord/.test(lower)) return ["👶 Firstborn life belongs to God", "⛺ Levites serve in their place", "🩸 Passover mercy stands behind it", "🕊️ The LORD claims His people"];
  if (/priest|aaron|eleazar|ithamar|anointed|ministered|nadab|abihu|no children|stranger|nigh/.test(lower)) return ["👑 Priestly service is guarded", "⛺ Holy space is protected", "🛡️ Nearness has boundaries", "⚠️ Carelessness is dangerous"];
  if (/gershon|kohath|merari|libnites|mahlites|amramites|families|fathers/.test(lower)) return ["🏠 Levite clans are named", "📦 Work is assigned by family", "⛺ Each clan serves the tabernacle", "✅ God's order is specific"];
  if (/ark|table|candlestick|altar|vail|holy thing|vessels|covering|curtains|boards|bars|pillars|sockets|pins|cords|burden|bear|bar|service|charge|oversight|hanging|door|shekel|lest they die|that they may live|not go in to see|by name|hand of moses/.test(lower)) return ["📦 Sacred objects are handled carefully", "👑 Priests direct the work", "💪 Levites carry assigned burdens", "⚠️ Holy things are not casual"];
  if (/thirty years|entered into the service|ministry|work in the tabernacle/.test(lower)) return ["🔢 Service age is defined", "💪 Work requires readiness", "⛺ Tabernacle service is ordered", "✅ The count follows God's command"];
  if (/leper|issue|dead|defiled|without the camp|defile not/.test(lower)) return ["🧼 Uncleanness is handled honestly", "🚪 The camp is protected", "⛺ God dwells among Israel", "✅ Cleansing preserves order"];
  if (/confess|trespass|principal|fifth|recompensed|restitution/.test(lower)) return ["🙏 Sin must be confessed", "💰 Harm must be repaid", "➕ Restitution adds the fifth", "👑 Wrongdoing is answered before God"];
  if (/wife|carnally|hid|jealousy|jealousies|iniquity|priest shall bring|holy water|dust|uncover|oath|curse|belly|thigh|amen|bitter water|woman to drink|defiled|clean|conceive|guiltless/.test(lower)) return ["💔 Hidden sin is brought before God", "👑 The priest handles the case", "🌊 The ritual tests truth", "⚖️ The LORD judges rightly"];
  if (/lord spake|commanded moses|commandment of the lord|speak unto/.test(lower)) return ["📣 God gives the order", "🧭 Moses receives it", "✅ Israel must obey", "⛺ The camp follows the LORD"];

  return ["📜 The detail belongs to camp order", "⛺ Israel lives near God's presence", "🧭 The LORD gives structure", "✅ The people must obey"];
}

function explainDay39NumbersAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const context = getDay39SectionContext(section);
  let opening: string[];

  if (/lord spake.*aaron/.test(lower)) opening = [`God gives Moses and Aaron the order for ${context}.`, "The camp is not arranged by instinct; it is arranged by the LORD's command."];
  else if (/lord spake|lord said|speak unto/.test(lower)) opening = [`God gives the command for ${context}.`, "Israel learns how to live near Him by listening before acting."];
  else if (/as the lord commanded|according to the commandment/.test(lower)) opening = [`Moses follows the LORD's command for ${context}.`, "The repeated obedience matters because holy order must be received, not invented."];
  else if (/every man by his own standard/.test(lower)) opening = ["Each man camps under his tribal standard.", "A standard is a banner or marker that keeps the tribe gathered in its proper place."];
  else if (/ensign/.test(lower)) opening = ["An ensign is a family banner or sign.", "The banner connects each household to its tribe inside the ordered camp."];
  else if (/far off about the tabernacle/.test(lower)) opening = ["The tribes camp around the tabernacle at a proper distance.", "God's presence is central, but holy nearness still has boundaries."];
  else if (/east side/.test(lower)) opening = ["The east side faces the rising sun.", "Judah's group camps there and leads the first movement of Israel."];
  else if (/south side/.test(lower)) opening = ["The south side is Reuben's assigned side of the camp.", "The tribe has a fixed place instead of choosing its own location."];
  else if (/west side/.test(lower)) opening = ["The west side is Ephraim's assigned side of the camp.", "Joseph's house is represented there through Ephraim, Manasseh, and Benjamin."];
  else if (/north/.test(lower)) opening = ["The north side is Dan's assigned side of the camp.", "Dan's group later guards the rear when the camp moves."];
  else if (/standard of the camp of ([a-z]+)/.test(lower)) {
    const tribe = cleanTitle.match(/Camp Of ([A-Za-z]+)/i)?.[1] || "the tribe";
    opening = [`${tribe}'s standard marks that camp group.`, "The banner shows where the tribe belongs when Israel rests or travels."];
  }
  else if (/the tribe of ([a-z]+)/.test(lower)) {
    const tribe = cleanTitle.match(/Tribe Of ([A-Za-z]+)/i)?.[1] || "This tribe";
    opening = [`${tribe} is named as part of this camp group.`, "The tribe is not lost inside the crowd; it has a clear place in Israel's order."];
  }
  else if (/son of/.test(lower)) {
    const leader = cleanTitle.replace(/^.*?([A-Z][A-Za-z]+ The Son Of [A-Z][A-Za-z]+).*$/, "$1");
    opening = [`${leader} is the named leader for this tribal group.`, "Numbers ties camp order to real leaders who answer for their tribes."];
  }
  else if (/all .*numbered.*camp of ([a-z]+)/.test(lower)) {
    const camp = cleanTitle.match(/Camp Of ([A-Za-z]+)/i)?.[1] || "this camp";
    opening = [`${camp}'s camp total gathers the fighting men under that standard.`, "The number shows a tribe group prepared to move in order."];
  }
  else if (/fourscore thousand/.test(lower)) opening = ["Judah's camp total is one hundred eighty-six thousand four hundred.", "The largest camp group is placed first in Israel's travel order."];
  else if (/one and fifty thousand/.test(lower)) opening = ["Reuben's camp total is one hundred fifty-one thousand four hundred fifty.", "The number marks the strength of the south-side camp."];
  else if (/eight thousand/.test(lower)) opening = ["Ephraim's camp total is one hundred eight thousand one hundred.", "The west-side camp has its own counted strength and marching place."];
  else if (/fifty and seven thousand/.test(lower)) opening = ["Dan's camp total is one hundred fifty-seven thousand six hundred.", "The rear-guard camp is large and ordered for the march."];
  else if (/twenty and two thousand/.test(lower)) opening = ["Twenty-two thousand is the total Levite count given here.", "The number prepares for comparing Levites with Israel's firstborn."];
  else if (/two hundred threescore and thirteen/.test(lower)) opening = ["The two hundred seventy-three are the extra firstborn beyond the Levite count.", "They require redemption money because no Levite directly stands in their place."];
  else if (/hundred|thousand|fifty/.test(lower)) opening = ["The number records the size of that counted group.", "Numbers is showing Israel as an organized people prepared for the wilderness march."];
  else if (/first set forth/.test(lower)) opening = ["Judah's camp moves first when Israel sets forward.", "The order of travel is fixed before the journey begins."];
  else if (/second rank/.test(lower)) opening = ["Reuben's camp moves second in the travel order.", "The camp moves by command, not by crowd confusion."];
  else if (/third rank/.test(lower)) opening = ["Ephraim's camp moves third in the travel order.", "Even movement through the wilderness follows God's arrangement."];
  else if (/hindmost/.test(lower)) opening = ["Dan's camp goes last as the rear guard.", "The final group still has an assigned place and responsibility."];
  else if (/pitched by their standards/.test(lower)) opening = ["Israel camps under the standards God assigned.", "Resting in camp follows the same order as traveling."];
  else if (/so they set forward/.test(lower)) opening = ["Israel sets forward in the order God gave.", "The march is organized around obedience, not panic or preference."];
  else if (/levites were not numbered/.test(lower)) opening = ["The Levites are excluded from the fighting census.", "Their role is tabernacle service, not ordinary military numbering."];
  else if (/generations of aaron and moses/.test(lower)) opening = ["The generations of Aaron and Moses introduce the priestly family line.", "Numbers slows down to show who serves closest to the tabernacle."];
  else if (/priests which were anointed/.test(lower)) opening = ["The anointed priests are set apart for holy service.", "Anointing marks their work as belonging to the LORD."];
  else if (/nadab and abihu died/.test(lower)) opening = ["Nadab and Abihu died before the LORD after offering unauthorized fire.", "Their death warns that priestly nearness is never casual."];
  else if (/no children/.test(lower)) opening = ["Nadab and Abihu left no children to continue their priestly line.", "The priestly service continues through Eleazar and Ithamar."];
  else if (/eleazar and ithamar/.test(lower)) opening = ["Eleazar and Ithamar continue serving as priests.", "The priestly line remains active after Nadab and Abihu's judgment."];
  else if (/bring the tribe of levi near/.test(lower)) opening = ["The tribe of Levi is brought near for tabernacle service.", "Their closeness is a calling with duties, not a privilege for pride."];
  else if (/present them before aaron/.test(lower)) opening = ["The Levites are presented before Aaron the priest.", "They serve under priestly oversight instead of acting independently."];
  else if (/keep his charge/.test(lower)) opening = ["Keeping Aaron's charge means assisting the priest with assigned holy duties.", "The Levites serve near Aaron, not in place of him."];
  else if (/oversight.*charge/.test(lower)) opening = ["Oversight of the charge means Eleazar supervises those guarding holy duties.", "The most sacred work is watched by priestly leadership."];
  else if (/keeping the charge of the sanctuary/.test(lower)) opening = ["Keeping the charge of the sanctuary means guarding holy access at the tabernacle.", "Moses, Aaron, and his sons protect the entrance side from unauthorized nearness."];
  else if (/stranger.*put to death/.test(lower)) opening = ["A stranger here means someone not authorized for priestly service.", "Coming near holy duties without permission brings deadly danger."];
  else if (/i have taken the levites/.test(lower)) opening = ["God takes the Levites for Himself in place of Israel's firstborn.", "Their service is rooted in God's claim over rescued life."];
  else if (/instead of all the firstborn/.test(lower)) opening = ["The Levites stand in place of Israel's firstborn sons.", "This connects tabernacle service to the mercy of Passover."];
  else if (/smote all the firstborn/.test(lower)) opening = ["God points back to the night He struck Egypt's firstborn.", "Israel's spared firstborn belong to Him because He rescued them."];
  else if (/all the firstborn are mine/.test(lower)) opening = ["The firstborn belong to the LORD.", "Their lives are remembered as rescued lives, not private possessions."];
  else if (/i am the lord/.test(lower)) opening = ["God seals the command with His own name.", "The claim over Levites, firstborn, and worship rests on who He is."];
  else if (/month old/.test(lower)) opening = ["The Levites are counted from one month old and upward.", "This is a tribal-service count, not the same as the army census."];
  else if (/gershon.*kohath.*merari/.test(lower)) opening = ["Gershon, Kohath, and Merari are Levi's main family lines.", "Each line will receive its own tabernacle work."];
  else if (/sons of merari by their families/.test(lower)) opening = ["Merari's sons are listed by their family groups.", "This completes the naming of Levi's major clans."];
  else if (/merari.*mahlites/.test(lower)) opening = ["Merari's Mahlite family is named for the frame-carrying work.", "This clan receives the heavy structural parts of the tabernacle."];
  else if (/as for the sons of merari/.test(lower)) opening = ["The sons of Merari are addressed for their transport duties.", "Their work focuses on the tabernacle's frame and supports."];
  else if (/families of merari/.test(lower)) opening = ["Merari's serving families are counted after their duties are described.", "The number shows who is ready for the heavy frame work."];
  else if (/gershon.*libnites/.test(lower)) opening = ["Gershon's Libnite family is named for its tabernacle duties.", "This clan handles fabric, coverings, and hangings."];
  else if (/take also the sum of the sons of gershon/.test(lower)) opening = ["Gershon's sons are counted for their carrying service.", "Their assigned load includes curtains and coverings."];
  else if (/numbered of the sons of gershon/.test(lower)) opening = ["Gershon's serving men are counted after their duties are assigned.", "The number belongs to tabernacle service, not army strength."];
  else if (/kohath.*amramites/.test(lower)) opening = ["Kohath's Amramite family is named among the most holy workers.", "This clan is connected to the sacred furniture of the tabernacle."];
  else if (/kohath.*bear/.test(lower)) opening = ["The sons of Kohath carry the covered holy things.", "Their burden is sacred, but it is limited by priestly boundaries."];
  else if (/numbered.*kohathites/.test(lower)) opening = ["Kohath's serving men are counted after the duty instructions.", "The number shows who is ready for the most holy carrying work."];
  else if (/tent, and the covering/.test(lower)) opening = ["The tent and its covering are Gershon's assigned fabric work.", "The holy dwelling must be covered and transported with care."];
  else if (/hanging for the door/.test(lower)) opening = ["The door hanging is the entrance fabric of the tabernacle.", "Gershon guards the pieces that mark and cover access to holy space."];
  else if (/cords of it/.test(lower)) opening = ["The cords hold the tabernacle coverings and hangings in place.", "Even support pieces are assigned because holy service is orderly."];
  else if (/covering vail/.test(lower)) opening = ["The covering veil is taken down to cover the ark.", "The most holy object is hidden before it is carried."];
  else if (/ark, and the table/.test(lower)) opening = ["The ark and table are central holy furnishings.", "Kohath's clan is tied to the sacred objects nearest God's presence."];
  else if (/candlestick, and the altars/.test(lower)) opening = ["The lampstand and altars are holy furnishings used in worship.", "They must be handled under priestly direction."];
  else if (/cover the ark/.test(lower)) opening = ["The ark of testimony is covered before transport.", "The ark is never treated as ordinary cargo."];
  else if (/boards of the tabernacle/.test(lower)) opening = ["The boards form the tabernacle's frame.", "Merari carries the pieces that give the holy tent its structure."];
  else if (/bars thereof/.test(lower)) opening = ["The bars hold the tabernacle boards together.", "Merari carries the connecting pieces that keep the frame secure."];
  else if (/pillars thereof/.test(lower)) opening = ["The pillars support the tabernacle and court hangings.", "Merari's duty includes the upright supports of holy space."];
  else if (/sockets thereof|and sockets/.test(lower)) opening = ["The sockets are the bases that hold pillars and boards in place.", "Merari carries the foundation pieces for the tabernacle structure."];
  else if (/pins/.test(lower)) opening = ["The pins help secure the tabernacle coverings and court.", "Even small parts are counted because the holy dwelling must be set up rightly."];
  else if (/before the tabernacle toward the east/.test(lower)) opening = ["The east side before the tabernacle is the guarded entrance side.", "Moses, Aaron, and his sons camp there to protect holy access."];
  else if (/moses, and aaron/.test(lower)) opening = ["Moses, Aaron, and Aaron's sons guard the most responsible position.", "Leadership stands closest to the entrance of holy service."];
  else if (/twenty and two thousand/.test(lower)) opening = ["Twenty-two thousand is the total Levite count given here.", "The number prepares for comparing Levites with Israel's firstborn."];
  else if (/number all the firstborn/.test(lower)) opening = ["The firstborn males are counted separately.", "This count sets up the exchange between Israel's firstborn and the Levites."];
  else if (/number of their names/.test(lower)) opening = ["Taking the number of their names means counting them person by person.", "The firstborn are treated as real lives claimed by God."];
  else if (/take the levites for me/.test(lower)) opening = ["God takes the Levites for Himself instead of the firstborn.", "The exchange turns rescued life into assigned service."];
  else if (/cattle of the levites/.test(lower)) opening = ["Even the Levites' cattle are counted in the exchange.", "The substitution reaches household life, not only people."];
  else if (/two hundred threescore and thirteen/.test(lower)) opening = ["The two hundred seventy-three are the extra firstborn beyond the Levite count.", "They require redemption money because no Levite directly stands in their place."];
  else if (/five shekels/.test(lower)) opening = ["Five shekels apiece is the redemption price for each extra firstborn.", "The payment makes the mismatch between counts concrete."];
  else if (/shekel of the sanctuary/.test(lower)) opening = ["The sanctuary shekel is the holy standard for the payment.", "Redemption is measured by God's appointed weight, not private guessing."];
  else if (/give the money/.test(lower)) opening = ["The redemption money is given to Aaron and his sons.", "The payment belongs to the priestly service connected with the LORD's claim."];
  else if (/thirty years old/.test(lower)) opening = [`Thirty years old and upward marks the service age for ${context}.`, "The work requires mature strength and readiness."];
  else if (/work in the tabernacle/.test(lower)) opening = ["The work in the tabernacle is Kohath's holy service assignment.", "The Levites serve the dwelling place at the center of Israel's camp."];
  else if (/their service in the tabernacle/.test(lower)) opening = ["Their service in the tabernacle refers to Gershon's assigned duties.", "The work is done under priestly oversight."];
  else if (/do service in the tabernacle/.test(lower)) opening = ["Doing service in the tabernacle means Gershon's counted men are ready for holy work.", "The count is tied to service, not status."];
  else if (/most holy things/.test(lower)) opening = ["The most holy things are the sacred objects nearest God's presence.", "They must be covered and carried with extreme care."];
  else if (/camp setteth forward/.test(lower)) opening = ["When the camp sets forward, the tabernacle must be prepared for travel.", "Holy movement begins with priestly covering and order."];
  else if (/covering vail|ark of testimony/.test(lower)) opening = ["The veil covers the ark before it is carried.", "The ark is never treated as ordinary cargo."];
  else if (/not touch any holy thing/.test(lower)) opening = ["The Kohathites must not touch the holy objects themselves.", "They carry what priests have covered, but direct contact would bring death."];
  else if (/lest they die/.test(lower)) opening = ["Lest they die warns that careless nearness to holy things is deadly.", "The rule protects the Levites while honoring God's holiness."];
  else if (/vessels thereof/.test(lower)) opening = ["The vessels are the smaller tools used with the holy furnishings.", "Even the tools of worship must be packed and carried carefully."];
  else if (/upon a bar/.test(lower)) opening = ["Putting it upon a bar prepares the covered object to be carried.", "The Levites transport holy things without grabbing them directly."];
  else if (/made an end/.test(lower)) opening = ["Aaron and his sons finish covering the holy things first.", "Only after the priests complete their work may Kohath begin carrying."];
  else if (/kohath.*bear/.test(lower)) opening = ["The sons of Kohath carry the covered holy things.", "Their burden is sacred, but it is limited by priestly boundaries."];
  else if (/cut ye not off/.test(lower)) opening = ["God warns Moses and Aaron not to let Kohath be cut off through careless handling.", "The instructions preserve their lives while they serve near holy things."];
  else if (/that they may live/.test(lower)) opening = ["That they may live means the rules are protective, not merely restrictive.", "God gives order so the Kohathites can serve without dying."];
  else if (/aaron and his sons shall go in/.test(lower)) opening = ["Aaron and his sons must enter first to assign each task.", "Priestly oversight keeps the Kohathites from seeing or touching what they should not."];
  else if (/not go in to see/.test(lower)) opening = ["The Kohathites must not watch the holy things being covered.", "Even sight is guarded when the most holy objects are being prepared."];
  else if (/sons of gershon/.test(lower)) opening = ["The sons of Gershon are counted for their assigned carrying work.", "Their service focuses on the tabernacle fabrics and coverings."];
  else if (/bear curtains/.test(lower)) opening = ["Gershon carries the tabernacle curtains.", "The fabric parts of the holy tent are assigned to this clan."];
  else if (/burdens/.test(lower)) opening = ["Burdens are the loads assigned for transport.", "The Levites do not choose random tasks; each burden is appointed."];
  else if (/ithamar/.test(lower)) opening = ["Ithamar supervises this branch of Levite service.", "Priestly oversight keeps the work ordered."];
  else if (/appointment of aaron/.test(lower)) opening = ["The service happens at Aaron's appointment.", "The Levites work under priestly direction, not personal preference."];
  else if (/appoint unto them in charge/.test(lower)) opening = ["Their charge is assigned to them by name and duty.", "Holy service is specific so nothing is neglected."];
  else if (/by name ye shall reckon/.test(lower)) opening = ["By name ye shall reckon means each duty is assigned personally.", "The heavy tabernacle parts are not left to confusion."];
  else if (/numbered.*kohathites/.test(lower)) opening = ["Kohath's serving men are counted after the duty instructions.", "The number shows who is ready for the most holy carrying work."];
  else if (/numbered.*gershon/.test(lower)) opening = ["Gershon's serving men are counted for their tabernacle duties.", "Their number belongs to ordered service, not military strength."];
  else if (/numbered.*merari/.test(lower)) opening = ["Merari's serving men are counted for the frame-carrying work.", "Their number is tied to burdens, boards, bars, and sockets."];
  else if (/all those.*levites/.test(lower)) opening = ["The full Levite service total gathers all three clans.", "Numbers shows the whole tabernacle workforce ready for transport."];
  else if (/service of the ministry/.test(lower)) opening = ["The service of the ministry is the Levites' holy work.", "Their labor supports worship at the tabernacle."];
  else if (/service of the burden/.test(lower)) opening = ["The service of the burden is the work of carrying assigned loads.", "Holy objects and structures move only by ordered responsibility."];
  else if (/leper/.test(lower)) opening = ["A leper has a serious skin disease that makes the person ritually unclean.", "The person is moved outside the camp so uncleanness does not spread through God's dwelling place."];
  else if (/hath an issue/.test(lower)) opening = ["An issue is a bodily discharge that made someone ritually unclean.", "The law treats the condition seriously because the LORD dwells in the camp."];
  else if (/defiled by the dead/.test(lower)) opening = ["Contact with the dead makes a person ritually unclean.", "Death is kept outside the ordered camp where God's presence dwells."];
  else if (/without the camp/.test(lower)) opening = ["Without the camp means outside Israel's ordered living space.", "The boundary protects the camp from uncleanness while cleansing is needed."];
  else if (/defile not their camps/.test(lower)) opening = ["The purpose is to keep the camps from being defiled.", "Israel's camp must reflect the presence of the LORD in the middle."];
  else if (/confess/.test(lower)) opening = ["Confess means openly admit the sin that was committed.", "Repair begins with truth before God and neighbor."];
  else if (/principal/.test(lower)) opening = ["The principal is the original amount or damage owed.", "Restitution begins by paying back what was wrongfully taken or harmed."];
  else if (/fifth part/.test(lower)) opening = ["The fifth part means an added twenty percent.", "The extra amount shows that wrongdoing must be repaired beyond the bare minimum."];
  else if (/recompensed unto the lord/.test(lower)) opening = ["The trespass is repaid to the LORD when no human relative can receive it.", "Wrongdoing against people is still handled before God."];
  else if (/wife go aside/.test(lower)) opening = ["A wife going aside means suspected unfaithfulness in marriage.", "The law brings the hidden accusation before the LORD instead of private revenge."];
  else if (/lie with her carnally/.test(lower)) opening = ["Lying with her carnally means sexual relations.", "The case deals with possible adultery that cannot be proven by witnesses."];
  else if (/hid from the eyes/.test(lower)) opening = ["Hidden from the husband's eyes means the truth is not publicly known.", "The ritual addresses suspicion when ordinary evidence is missing."];
  else if (/offering of jealousy/.test(lower)) opening = ["The offering of jealousy is brought with the suspected wife.", "It is plain barley meal because the case is solemn, not celebratory."];
  else if (/bringing iniquity to remembrance/.test(lower)) opening = ["Bringing iniquity to remembrance means bringing possible guilt before God.", "The ritual asks the LORD to expose truth that people cannot see."];
  else if (/priest shall bring her near/.test(lower)) opening = ["The priest brings the woman near before the LORD.", "The accusation moves from private suspicion into God's presence."];
  else if (/holy water/.test(lower)) opening = ["Holy water is placed in an earthen vessel for the test.", "The ritual uses sanctuary elements because the LORD is judge."];
  else if (/dust.*floor/.test(lower)) opening = ["Dust from the tabernacle floor is put into the water.", "The test is tied to the holy place where God's presence dwells."];
  else if (/uncover the woman's head/.test(lower)) opening = ["Uncovering the woman's head is part of the public ritual.", "The moment is solemn because her case is being presented before God."];
  else if (/oath/.test(lower)) opening = ["The oath places the woman under a spoken curse if she is guilty.", "Words become part of the judgment because the truth is being brought before the LORD."];
  else if (/water that causeth the curse/.test(lower)) opening = ["The water is connected to the curse spoken in the oath.", "It becomes the sign through which God will judge the hidden matter."];
  else if (/belly to swell/.test(lower)) opening = ["The swelling belly is named as part of the curse's bodily judgment.", "The result would expose guilt that had been hidden."];
  else if (/thigh to rot/.test(lower)) opening = ["The rotting thigh is another image of the curse's bodily judgment.", "The law treats hidden adultery as something God can reveal."];
  else if (/amen, amen/.test(lower)) opening = ["Amen, amen means the woman accepts the oath's terms.", "She verbally places herself under God's judgment if she is guilty."];
  else if (/write these curses/.test(lower)) opening = ["The priest writes the curses in a book.", "The spoken oath is made visible before it is washed into the water."];
  else if (/blot them out/.test(lower)) opening = ["Blotting the curses into the water connects the written words to the drink.", "The ritual makes the oath part of the test itself."];
  else if (/cause the woman to drink/.test(lower)) opening = ["The woman drinks the bitter water as the test is completed.", "The outcome is placed in God's hands."];
  else if (/if she be defiled/.test(lower)) opening = ["If she is defiled means if she is truly guilty.", "The curse exposes guilt that could not be proven by people."];
  else if (/not defiled/.test(lower)) opening = ["If she is not defiled means she is innocent of the accusation.", "The law provides a way for the accusation to be cleared."];
  else if (/conceive seed/.test(lower)) opening = ["Conceiving seed means she can bear children.", "The cleared woman is not left under suspicion forever."];
  else if (/law of jealousies/.test(lower)) opening = ["The law of jealousies summarizes the whole ritual for suspected adultery.", "It puts jealousy under God's judgment instead of human violence."];
  else if (/man shall be guiltless/.test(lower)) opening = ["The man is guiltless when he follows the law instead of taking revenge.", "His suspicion must be handled through the LORD's appointed process."];
  else if (/woman shall bear her iniquity/.test(lower)) opening = ["The woman bears her iniquity if she is truly guilty.", "Hidden sin is not hidden from the LORD."];
  else if (/wilderness of sinai/.test(lower)) opening = ["The wilderness of Sinai is where Israel is still camped after the Exodus.", "Even in the wilderness, the LORD orders the Levites by clan and service."];
  else if (/by the hand of moses/.test(lower)) opening = ["By the hand of Moses means Moses carries out the LORD's command.", "Merari's final service count is reported through the mediator God appointed."];
  else opening = [`${cleanTitle} names a specific part of ${context}.`, "It marks the order of Israel's camp, service, purity, or justice before the LORD."];

  return [
    opening[0],
    opening[1],
    ...getDay39NumbersSupport(cleanTitle),
  ].slice(0, 8);
}

function getDay40SectionContext(section: PersonalLeviticusPhraseSectionInput) {
  const contextByReference: Record<string, string> = {
    "Numbers 6:1-4": "the beginning of the Nazarite vow",
    "Numbers 6:5-8": "the visible signs of Nazarite separation",
    "Numbers 6:9-12": "a Nazarite vow interrupted by death",
    "Numbers 6:13-17": "the offerings that complete a Nazarite vow",
    "Numbers 6:18-21": "the final actions of the Nazarite vow",
    "Numbers 6:22-27": "the priestly blessing over Israel",
    "Numbers 7:1-3": "the leaders bringing dedication gifts",
    "Numbers 7:4-9": "wagons assigned for tabernacle service",
    "Numbers 7:10-15": "Judah's altar dedication offering",
    "Numbers 7:16-17": "Judah's peace offering animals",
    "Numbers 7:18-23": "Issachar's altar dedication offering",
    "Numbers 7:24-29": "Zebulun's altar dedication offering",
    "Numbers 7:30-35": "Reuben's altar dedication offering",
    "Numbers 7:36-41": "Simeon's altar dedication offering",
    "Numbers 7:42-47": "Gad's altar dedication offering",
    "Numbers 7:48-53": "Ephraim's altar dedication offering",
    "Numbers 7:54-59": "Manasseh's altar dedication offering",
    "Numbers 7:60-65": "Benjamin's altar dedication offering",
    "Numbers 7:66-71": "Dan's altar dedication offering",
    "Numbers 7:72-77": "Asher's altar dedication offering",
    "Numbers 7:78-83": "Naphtali's altar dedication offering",
    "Numbers 7:84-88": "the totals from the altar dedication",
    "Numbers 8:1-4": "the lampstand in the holy place",
    "Numbers 8:5-7": "the cleansing of the Levites",
    "Numbers 8:8-11": "the Levites presented before the LORD",
    "Numbers 8:12-15": "atonement and presentation for the Levites",
    "Numbers 8:16-19": "the Levites given in place of the firstborn",
    "Numbers 8:20-22": "Israel obeying the Levite cleansing command",
    "Numbers 8:23-26": "the age limits for Levite service",
    "Numbers 9:1-5": "Passover kept in the wilderness",
    "Numbers 9:6-8": "unclean men asking about Passover",
    "Numbers 9:9-14": "the second-month Passover provision",
    "Numbers 9:15-16": "the cloud and fire over the tabernacle",
    "Numbers 9:17-22": "Israel following the cloud",
    "Numbers 9:23-23": "obedience to the LORD's command through Moses",
  };

  return contextByReference[section.reference] || stripLeadingEmoji(section.title).toLowerCase();
}

function getDay40NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/nazarite|separate|separation|consecration|holy unto|wine|strong drink|vine|razor|hair|locks|dead body|die very suddenly|shave|pigeons|defiled|fulfilled|days that were before|drink wine|priest shall wave/.test(lower)) return ["🙌 The vow sets a person apart", "🚫 Ordinary freedoms are limited", "✨ Dedication becomes visible", "📜 The days belong to the LORD"];
  if (/bless|keep thee|face|shine|gracious|countenance|name|children of israel/.test(lower)) return ["🙌 Blessing comes from the LORD", "🌟 God's face means favor", "🕊️ Peace is His gift", "📛 Israel carries His name"];
  if (/dedication|anointed|sanctified|fully set up|princes|offering|charger|silver|wagons|oxen|take it|service of the tabernacle|gershon|merari|kohath/.test(lower)) return ["🎁 Leaders bring gifts", "⛺ The tabernacle is served", "📦 Transport is provided", "✅ Worship follows order"];
  if (/judah|issachar|zebulun|reuben|simeon|gad|ephraim|manasseh|benjamin|dan|asher|naphtali|nahshon|nethaneel|eliab|elizur|shelumiel|eliasaph|elishama|gamaliel|abidan|ahiezer|pagiel|ahira|prince|second day|third day|fourth day|fifth day|sixth day|seventh day|eighth day|ninth day|tenth day|eleventh day|twelfth day/.test(lower)) return ["🏷️ Each tribe is named", "👑 Leaders bring offerings", "🎁 Gifts match across tribes", "⛺ All serve the altar"];
  if (/bullock|bullocks|ram|rams|lamb|lambs|kid|kids|goats|he goats|sin offering|burnt offering|peace offerings|unleavened bread|basket/.test(lower)) return ["🔥 Worship includes sacrifice", "🐑 Animals are offered", "🕊️ Peace is celebrated", "📜 The gift follows holy order"];
  if (/lamps|lamp|candlestick|beaten gold|lightest|light/.test(lower)) return ["🪔 The lamps give light", "⛺ The holy place is tended", "🔨 The lampstand is crafted", "✅ Aaron follows command"];
  if (/levites|purifying|cleanse|clean|shave|wash|hands upon|atonement|wholly given|open every womb|firstborn|gift|service|twenty and five|fifty years|minister|no service|whole assembly|moses.*aaron.*congregation/.test(lower)) return ["🧼 Levites are cleansed", "🙌 They are presented to God", "👶 They stand for the firstborn", "⛺ Their service is ordered"];
  if (/passover|fourteenth|second month|first month|wilderness of sinai|at even|rites|unleavened|bitter herbs|journey|stranger|ordinance|dead body|kept back|stand still|hear|leave none/.test(lower)) return ["🐑 Passover remembers rescue", "🧼 Uncleanness is handled honestly", "📜 The command gives order", "🌍 One ordinance covers the people"];
  if (/cloud|fire|taken up|journeyed|pitched|tents|two days|month|year|until the morning|alway|commandment|charge|hand of moses/.test(lower)) return ["☁️ The LORD guides the camp", "🔥 His presence is visible", "🚶 Israel moves when He leads", "⛺ Israel stays when He stays"];
  if (/lord spake|speak unto|commanded moses/.test(lower)) return ["📣 God gives the order", "🧭 Moses receives it", "✅ Israel must obey", "⛺ The camp follows the LORD"];

  return ["📜 The detail belongs to holy order", "⛺ Israel lives near God's presence", "🧭 The LORD gives structure", "✅ The people must obey"];
}

function explainDay40NumbersAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const context = getDay40SectionContext(section);
  let opening: string[];

  if (/lord spake/.test(lower)) opening = [`God gives the command for ${context}.`, "The instruction comes from the LORD before Israel acts."];
  else if (/speak unto/.test(lower)) opening = [`Moses must speak this command for ${context}.`, "The people learn God's order through the mediator He appointed."];
  else if (/as the lord commanded/.test(lower)) opening = [`Moses obeys the LORD's command for ${context}.`, "The repeated obedience shows that holy order is received from God."];
  else if (/separate themselves/.test(lower)) opening = ["Separate themselves unto the LORD means taking a special vow of dedication.", "The Nazarite is set apart for God in visible, daily ways."];
  else if (/wine and strong drink/.test(lower)) opening = ["Wine and strong drink are forbidden during the Nazarite vow.", "The vow limits normal pleasures so dedication to the LORD is visible."];
  else if (/vine tree/.test(lower)) opening = ["Nothing from the vine tree means no grape products at all.", "The command is broader than avoiding drunkenness; it marks full separation."];
  else if (/no razor/.test(lower)) opening = ["No razor means the Nazarite does not cut the hair during the vow.", "Uncut hair becomes the visible sign of separation to the LORD."];
  else if (/locks of the hair/.test(lower)) opening = ["The growing locks show the vow continuing day after day.", "The body carries the sign that this person belongs to a special season of dedication."];
  else if (/no dead body|dead body/.test(lower) && section.chapter === 6) opening = ["The Nazarite must avoid contact with the dead.", "Death would interrupt the vow because the person is set apart to the living LORD."];
  else if (/consecration/.test(lower)) opening = ["Consecration means the Nazarite's set-apart dedication is upon him.", "His life is marked as belonging to God for the days of the vow."];
  else if (/holy unto the lord/.test(lower)) opening = ["Holy unto the LORD means set apart for God's use.", "The Nazarite vow is not a private hobby; it belongs to the LORD."];
  else if (/die very suddenly/.test(lower)) opening = ["Sudden death near the Nazarite defiles the vow even if it was not planned.", "The interruption still has to be handled before God."];
  else if (/shave his head/.test(lower)) opening = ["Shaving the head marks a reset after defilement.", "The visible sign of the vow is removed and the days must begin again."];
  else if (/turtles|pigeons/.test(lower)) opening = ["Turtledoves or young pigeons are brought as cleansing offerings.", "The interrupted vow is restored through sacrifice, not ignored."];
  else if (/separation was defiled/.test(lower)) opening = ["The separation was defiled means the vow's holy status was broken.", "The person must deal with the uncleanness before continuing."];
  else if (/days that were before/.test(lower)) opening = ["The earlier days are lost because the vow was interrupted.", "The Nazarite must begin the dedicated period again."];
  else if (/law of the nazarite/.test(lower)) opening = ["The law of the Nazarite gathers the rules for this special vow.", "Numbers shows how dedication begins, is protected, and is completed."];
  else if (/days of his separation are fulfilled/.test(lower)) opening = ["The days are fulfilled when the vowed period is complete.", "The Nazarite comes to the tabernacle to end the vow in worship."];
  else if (/he lamb/.test(lower)) opening = ["The he lamb is part of the offering that completes the vow.", "The vow ends with sacrifice before the LORD."];
  else if (/ram without blemish/.test(lower)) opening = ["The ram without blemish is a whole, acceptable animal for offering.", "The completed vow is brought back to God through worship."];
  else if (/basket of unleavened bread/.test(lower)) opening = ["The basket of unleavened bread is part of the completion offering.", "The vow ends with holy food connected to sacrifice."];
  else if (/head of his separation/.test(lower)) opening = ["The head of his separation is the hair grown during the vow.", "Shaving it marks that the dedicated period is finished."];
  else if (/put it in the fire/.test(lower)) opening = ["The shaved hair is placed in the altar fire.", "The visible sign of dedication is returned to God in worship."];
  else if (/priest shall wave/.test(lower)) opening = ["The priest waves the offering before the LORD.", "The completed vow is presented publicly as belonging to God."];
  else if (/may drink wine/.test(lower)) opening = ["The Nazarite may drink wine after the vow is completed.", "The restriction ends only after the required worship is finished."];
  else if (/aaron.*sons/.test(lower)) opening = ["Aaron and his sons receive the words of blessing to speak over Israel.", "The priests bless the people in the LORD's name, not their own."];
  else if (/bless thee.*keep thee/.test(lower)) opening = ["The LORD blessing and keeping means He gives favor and guards His people.", "Israel needs God's care more than camp order alone."];
  else if (/face shine/.test(lower)) opening = ["The LORD's face shining means His favor rests on His people.", "The blessing asks God to look on Israel with grace, not rejection."];
  else if (/gracious/.test(lower)) opening = ["Gracious means God shows kindness that His people do not earn.", "The blessing asks for mercy from the LORD Himself."];
  else if (/countenance/.test(lower)) opening = ["The LORD lifting His countenance means turning His face toward His people.", "The blessing pictures personal favor and peace from God."];
  else if (/put my name/.test(lower)) opening = ["Putting God's name on Israel marks them as His people.", "The blessing places Israel under the LORD's identity and care."];
  else if (/anointed it.*sanctified|anointed it|sanctified it/.test(lower)) opening = ["Anointing and sanctifying set the tabernacle apart for holy use.", "The dedication gifts come after the dwelling place is marked as belonging to God."];
  else if (/princes of israel/.test(lower)) opening = ["The princes of Israel are the tribal leaders.", "They bring gifts as representatives of the tribes."];
  else if (/brought their offering/.test(lower)) opening = ["The leaders bring their offering before the LORD.", "The dedication of the altar involves every tribe, not one private family."];
  else if (/covered wagons/.test(lower)) opening = ["Covered wagons are practical gifts for moving tabernacle materials.", "Worship includes support for the work God assigned."];
  else if (/twelve oxen/.test(lower)) opening = ["The twelve oxen match the twelve tribal leaders bringing gifts.", "The animals help move the tabernacle through the wilderness."];
  else if (/take it of them/.test(lower)) opening = ["God tells Moses to accept the leaders' transport gifts.", "The wagons and oxen are useful because the tabernacle must move."];
  else if (/service of the tabernacle/.test(lower)) opening = ["The service of the tabernacle is the practical work of moving and caring for the holy tent.", "The gifts are assigned according to each Levite clan's burden."];
  else if (/sons of gershon/.test(lower)) opening = ["Gershon receives wagons for the fabric and covering work.", "His clan needs transport help for its assigned tabernacle pieces."];
  else if (/sons of merari/.test(lower)) opening = ["Merari receives more wagons because his clan carries the heavy frame parts.", "Boards, bars, pillars, and sockets require greater transport support."];
  else if (/kohath.*none/.test(lower)) opening = ["Kohath receives no wagons because the most holy things are carried on shoulders.", "Holy furniture is not hauled like ordinary cargo."];
  else if (/tribe of|prince of|son of/.test(lower) && section.chapter === 7) opening = [`This names the leader or tribe for ${context}.`, "Each tribe participates in altar dedication with equal honor."];
  else if (/silver charger/.test(lower)) opening = [`The silver charger is part of the gift for ${context}.`, "The tribe brings costly vessels for altar dedication."];
  else if (/burnt offering/.test(lower)) opening = [`The burnt offering in ${context} is worship given wholly to the LORD.`, "Each tribe's gift includes sacrifice, not only silver vessels."];
  else if (/sin offering/.test(lower)) opening = [`The sin offering in ${context} deals with uncleanness and guilt before God.`, "Dedication still requires atonement."];
  else if (/peace offering|peace offerings/.test(lower)) opening = [`The peace offerings in ${context} celebrate fellowship with the LORD.`, "The dedication gifts include worship marked by communion and gratitude."];
  else if (/two oxen/.test(lower)) opening = ["The two oxen begin Judah's peace offering list.", "Peace offerings are larger because they celebrate fellowship before God."];
  else if (/five rams/.test(lower)) opening = ["The five rams are part of Judah's peace offering.", "The repeated number shows an ordered, generous dedication gift."];
  else if (/five he goats/.test(lower)) opening = [`The five goats belong to the peace offering in ${context}.`, "The tribe's gift includes repeated animals for fellowship worship."];
  else if (/five lambs/.test(lower)) opening = ["The five lambs complete Judah's peace offering list.", "The gift is abundant because the altar dedication is a major moment."];
  else if (/dedication of the altar/.test(lower)) opening = ["The dedication of the altar summarizes the completed tribal gifts.", "All twelve tribes have taken part in setting apart the altar for worship."];
  else if (/in the day when it was anointed/.test(lower)) opening = ["The totals belong to the day the altar was anointed.", "The gifts are tied to setting the altar apart for holy use."];
  else if (/twelve chargers/.test(lower)) opening = ["Twelve silver chargers means one from each tribe.", "The total shows equal participation in the dedication."];
  else if (/twelve bullocks/.test(lower)) opening = ["Twelve bullocks totals the large animals given by the tribes.", "The dedication is corporate, not isolated."];
  else if (/rams twelve/.test(lower)) opening = ["The twelve rams summarize the tribe-by-tribe offerings.", "The repeated gifts become one complete dedication."];
  else if (/kids of the goats twelve/.test(lower)) opening = ["The twelve goat kids summarize the sin offerings.", "Every tribe's dedication includes atonement before celebration."];
  else if (/lightest the lamps/.test(lower)) opening = ["Lighting the lamps means Aaron tends the holy-place light.", "The lampstand gives ordered light before the LORD."];
  else if (/seven lamps/.test(lower)) opening = ["The seven lamps shine forward from the lampstand.", "The holy place is not left dark or neglected."];
  else if (/over against the candlestick/.test(lower)) opening = ["The lamps shine over against the candlestick as God commanded.", "Aaron arranges the light according to the pattern shown to Moses."];
  else if (/beaten gold/.test(lower)) opening = ["Beaten gold means the lampstand was hammered into shape from gold.", "The crafted beauty of the lampstand matches holy service."];
  else if (/take the levites/.test(lower)) opening = ["The Levites are taken from among Israel for cleansing and service.", "They must be prepared before working near the tabernacle."];
  else if (/water of purifying/.test(lower)) opening = ["Water of purifying is used in the Levites' cleansing ritual.", "Their service begins with cleansing, not self-appointment."];
  else if (/shave all their flesh/.test(lower)) opening = ["Shaving their bodies is part of the visible cleansing process.", "The Levites are prepared completely for holy service."];
  else if (/wash their clothes/.test(lower)) opening = ["Washing their clothes marks outward cleansing.", "The Levites' garments must match the clean service they are entering."];
  else if (/make themselves clean/.test(lower)) opening = ["Making themselves clean means completing the commanded cleansing actions.", "The Levites cannot begin service casually."];
  else if (/young bullock/.test(lower)) opening = ["The young bullocks are brought for the Levites' offerings.", "Their cleansing includes sacrifice before service."];
  else if (/meat offering/.test(lower)) opening = ["The meat offering is a grain offering, not animal meat.", "It accompanies the bullock as part of ordered worship."];
  else if (/whole assembly/.test(lower)) opening = ["The whole assembly gathers for the Levites' presentation.", "The tribe serves on behalf of all Israel."];
  else if (/hands upon the levites/.test(lower)) opening = ["Israel lays hands on the Levites to identify them as their representatives.", "The Levites are presented before God for the whole congregation."];
  else if (/offer the levites before/.test(lower)) opening = ["Aaron offers the Levites before the LORD as a living gift.", "Their service is presented to God before it is performed."];
  else if (/levites shall lay their hands/.test(lower)) opening = ["The Levites lay hands on the sacrificial animals.", "Their own cleansing and atonement are connected to the offerings."];
  else if (/one for a sin offering/.test(lower)) opening = ["One bullock is offered as a sin offering for the Levites.", "Holy service begins with atonement."];
  else if (/other for a burnt offering/.test(lower)) opening = ["The other bullock is offered as a burnt offering.", "The Levites are dedicated wholly to the LORD's service."];
  else if (/atonement for the levites/.test(lower)) opening = ["Atonement for the Levites means their guilt and uncleanness are dealt with before service.", "They serve only after God provides cleansing."];
  else if (/set the levites before aaron/.test(lower)) opening = ["The Levites are set before Aaron after cleansing and sacrifice.", "Their tabernacle service remains under priestly oversight."];
  else if (/wholly given/.test(lower)) opening = ["Wholly given unto me means the Levites belong fully to the LORD's service.", "They are not partly assigned to the tabernacle; their calling is complete."];
  else if (/open every womb/.test(lower)) opening = ["Those who open every womb are the firstborn.", "The Levites serve in place of the firstborn sons of Israel."];
  else if (/smote every firstborn/.test(lower)) opening = ["God points back to the Passover judgment on Egypt's firstborn.", "The spared firstborn in Israel belong to Him because He rescued them."];
  else if (/gift/.test(lower)) opening = ["The Levites are given as a gift for tabernacle service.", "God provides servants who protect Israel from dangerous nearness."];
  else if (/atonement for the children of israel/.test(lower)) opening = ["The Levites help make atonement for Israel by guarding holy service.", "Their work protects the people from plague at the sanctuary."];
  else if (/moses, and aaron/.test(lower)) opening = ["Moses, Aaron, and the congregation obey the Levite cleansing command.", "The whole community participates in preparing the Levites."];
  else if (/levites were purified/.test(lower)) opening = ["The Levites are purified before entering service.", "Their work near the tabernacle requires cleansing."];
  else if (/aaron offered them/.test(lower)) opening = ["Aaron presents the Levites as an offering before the LORD.", "Their lives are given for holy service."];
  else if (/went in to do their service/.test(lower)) opening = ["The Levites begin their service after cleansing and presentation.", "They do the work only after God's order has been followed."];
  else if (/twenty and five years/.test(lower)) opening = ["Twenty-five years old marks the beginning age for Levite service preparation.", "The work has ordered limits instead of being casual labor."];
  else if (/wait upon the service/.test(lower)) opening = ["Waiting upon the service means entering the assigned tabernacle work.", "The Levites serve under God's schedule and structure."];
  else if (/fifty years/.test(lower)) opening = ["At fifty years old the Levite stops the heavier service.", "God limits the burden of the work with mercy and order."];
  else if (/minister with their brethren/.test(lower)) opening = ["Older Levites may still assist their brothers.", "They support the work without carrying the same burden."];
  else if (/no service/.test(lower)) opening = ["Doing no service means stepping back from the heavy assigned labor.", "Age changes the Levite's role without erasing his place."];
  else if (/wilderness of sinai/.test(lower)) opening = ["The wilderness of Sinai is where Israel keeps Passover after the Exodus.", "Rescued people remember rescue even before reaching the land."];
  else if (/first month of the second year/.test(lower)) opening = ["The first month of the second year places this Passover one year after rescue from Egypt.", "The calendar keeps deliverance fresh in Israel's memory."];
  else if (/keep the passover/.test(lower)) opening = ["Keeping Passover means observing the feast that remembers rescue from Egypt.", "Israel's journey must stay rooted in God's deliverance."];
  else if (/at even/.test(lower)) opening = ["At even means at evening, the appointed time for Passover.", "The feast is kept according to God's timing."];
  else if (/rites of it/.test(lower)) opening = ["The rites are the commanded practices of Passover.", "Israel is not free to redesign the feast however they like."];
  else if (/defiled by the dead body/.test(lower)) opening = ["These men are unclean because they touched a dead body.", "Their uncleanness keeps them from keeping Passover at the normal time."];
  else if (/kept back/.test(lower)) opening = ["Kept back means prevented from bringing the Passover offering.", "The men want to honor the LORD but are blocked by uncleanness."];
  else if (/offering of the lord/.test(lower)) opening = ["The Passover offering belongs to the LORD.", "The men do not want their uncleanness to cut them off from worship."];
  else if (/stand still/.test(lower)) opening = ["Stand still means wait while Moses seeks the LORD's command.", "Moses does not invent an answer for a holy problem."];
  else if (/hear what the lord/.test(lower)) opening = ["Moses will hear what the LORD commands about the case.", "The solution must come from God, not pressure or convenience."];
  else if (/fourteenth day of the second month/.test(lower)) opening = ["The fourteenth day of the second month gives a later Passover date.", "God makes provision for those who were unclean or away."];
  else if (/unleavened bread and bitter herbs/.test(lower)) opening = ["Unleavened bread and bitter herbs keep the original Passover pattern.", "The later Passover is still Passover, not a new feast."];
  else if (/leave none/.test(lower)) opening = ["Leaving none until morning follows the Passover rule.", "The delayed observance still obeys the original command."];
  else if (/one ordinance/.test(lower)) opening = ["One ordinance means the same Passover rule applies to Israelite and stranger.", "God's rescue is remembered under one shared command."];
  else if (/stranger/.test(lower)) opening = ["The stranger is a foreigner living among Israel.", "If he keeps Passover, he follows the same ordinance as Israel."];
  else if (/cloud covered/.test(lower)) opening = ["The cloud covering the tabernacle shows the LORD's presence over His dwelling.", "Israel can see that God is with them."];
  else if (/fire by night/.test(lower)) opening = ["The fire by night shows God's presence in the darkness.", "The same presence that appears as cloud by day appears as fire at night."];
  else if (/until the morning/.test(lower)) opening = ["Until the morning shows the fire remaining through the night.", "God's visible presence does not vanish when the camp sleeps."];
  else if (/so it was alway/.test(lower)) opening = ["So it was always means this visible guidance became the regular pattern.", "Israel learns to live by God's presence day and night."];
  else if (/cloud was taken up|when the cloud was taken up/.test(lower)) opening = ["When the cloud was taken up, Israel knew it was time to move.", "The camp follows God's signal instead of choosing its own timing."];
  else if (/journeyed/.test(lower)) opening = ["Israel journeyed after the cloud lifted.", "Movement begins when the LORD leads."];
  else if (/pitched their tents/.test(lower)) opening = ["Israel pitched their tents where the cloud rested.", "Stopping is also obedience, not laziness."];
  else if (/two days|month|year/.test(lower)) opening = ["Whether two days, a month, or a year means the waiting time could be short or long.", "Israel must follow God's timing even when it is unpredictable."];
  else if (/commandment of the lord.*journeyed|at the commandment/.test(lower)) opening = ["At the LORD's command Israel travels or stays.", "The cloud teaches dependence on God's direction."];
  else if (/kept the charge/.test(lower)) opening = ["Keeping the charge means obeying the LORD's travel command.", "Israel's journey is ordered by God's word and presence."];
  else if (/hand of moses/.test(lower)) opening = ["By the hand of Moses means the LORD's command comes through Moses.", "The people follow God's appointed mediator."];
  else opening = [`${cleanTitle} names a specific part of ${context}.`, "It marks how Israel worships, serves, remembers rescue, or follows the LORD."];

  return [
    opening[0],
    opening[1],
    ...getDay40NumbersSupport(cleanTitle),
  ].slice(0, 8);
}

function explainNumbersOneToNineAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string, occurrenceIndex = 0) {
  if (section.chapter >= 2 && section.chapter <= 5) return explainDay39NumbersAt95(section, cleanTitle);
  if (section.chapter >= 6 && section.chapter <= 9) return explainDay40NumbersAt95(section, cleanTitle);

  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/as the lord commanded moses/.test(lower) && section.reference === "Numbers 1:17-19") opening = ["Moses carries out the census exactly as the LORD commanded.", "Israel's camp order comes from God, not from human planning alone."];
  else if (/as the lord commanded moses/.test(lower)) opening = ["The people obey the census arrangement exactly as the LORD commanded Moses.", "Israel's camp order comes from God, not from human planning alone."];
  else if (/speak unto the children of israel/.test(lower)) opening = ["Moses is to deliver this command to all Israel.", "Camp order is not private advice; it is public instruction for the nation."];
  else if (/lord spake|say unto|commanded moses/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's camp order comes from God, not from human planning alone."];
  else if (/wilderness of sinai/.test(lower)) opening = ["The wilderness of Sinai is the desert region where Israel camped after leaving Egypt.", "Numbers begins with rescued people still near the mountain, preparing to travel."];
  else if (/tabernacle of the congregation/.test(lower)) opening = ["The tabernacle of the congregation is the meeting tent at the center of Israel's camp.", "The census begins near God's dwelling because the people are ordered around His presence."];
  else if (/appoint the levites over the tabernacle/.test(lower)) opening = ["The Levites are appointed over the tabernacle of testimony.", "Their work is to guard the holy dwelling and its service."];
  else if (/levites shall pitch round about the tabernacle/.test(lower)) opening = ["The Levites camp around the tabernacle as a protective boundary.", "Their placement keeps holy space from being treated casually."];
  else if (/tabernacle of testimony/.test(lower)) opening = ["God's holy dwelling is in view here, with the covenant witness inside it.", "The Levites keep charge of it because God's presence is central to the camp."];
  else if (/tabernacle/.test(lower)) opening = ["The tabernacle is the holy tent where the LORD dwells among Israel.", "The camp is arranged around God's presence, not around human convenience."];
  else if (/second year|come out/.test(lower)) opening = ["The second year after Egypt places the census at a real point in Israel's journey.", "The rescued people are no longer escaping Egypt; they are being ordered for the road ahead."];
  else if (/take ye the sum/.test(lower)) opening = ["Taking the sum means counting the congregation.", "The census prepares Israel for ordered movement, service, and battle."];
  else if (/those that were numbered of the tribe of manasseh/.test(lower) && section.reference === "Numbers 1:28-33") {
    opening = ["Manasseh's census total is first given with the surrounding tribe counts.", "Joseph's younger son is fully counted among Israel's fighting men."];
  }
  else if (/those that were numbered of the tribe of manasseh/.test(lower)) {
    opening = ["Manasseh's number is repeated here as its own tribe total.", "The separate line makes sure Joseph's divided inheritance is clearly counted."];
  }
  else if (/those that were numbered of the tribe of (\w+)/.test(lower)) {
    const tribe = cleanTitle.match(/Tribe Of ([A-Za-z]+)/i)?.[1] || "this tribe";
    opening = [`${tribe} is counted among Israel's fighting men.`, "The number gives that tribe a visible place in the ordered camp."];
  }
  else if (/six hundred thousand and three thousand and five hundred and fifty/.test(lower)) opening = ["This is the full total of Israel's counted fighting men.", "Israel is no longer shown as scattered slaves, but as an ordered people prepared to move."];
  else if (/all they that were numbered were six hundred thousand/.test(lower)) opening = ["The census now restates the final army total after the tribe lists are complete.", "Israel is no longer shown as scattered slaves, but as an ordered people prepared to move."];
  else if (/all they that were numbered|six hundred thousand/.test(lower)) opening = ["The full army number gathers the tribe counts into one total.", "Israel is no longer shown as scattered slaves, but as an ordered people prepared to move."];
  else if (/numbered|poll|sum/.test(lower)) opening = ["The count gives Israel ordered responsibility before God.", "The census prepares the camp for movement, service, and battle."];
  else if (/after their families/.test(lower) && section.reference === "Numbers 1:1-4") opening = ["The whole census follows household lines.", "Israel is numbered as real families with covenant identity."];
  else if (/after their families/.test(lower) && section.reference === "Numbers 1:26-27") opening = ["Judah is counted by family lines.", "The tribe's strength is connected to real households, not a faceless total."];
  else if (/after their families/.test(lower) && section.reference === "Numbers 1:34-35") opening = ["Manasseh is counted through its family groups.", "Joseph's line is represented through actual households in the camp."];
  else if (/after their families/.test(lower)) opening = ["Naphtali's count also follows family lines.", "The final tribe listed is still counted through covenant households."];
  else if (/every one head of the house of his fathers/.test(lower)) opening = ["Each leader stands as head of his father's house.", "The census uses recognized family leadership for tribal order."];
  else if (/by the house of their fathers/.test(lower) && section.reference === "Numbers 1:17-19") opening = ["The names are organized by ancestral households.", "The census is public and orderly before the LORD."];
  else if (/by the house of their fathers/.test(lower) && section.reference === "Numbers 1:26-27") opening = ["Judah's count is organized by fathers' houses.", "The tribe is counted through its covenant family structure."];
  else if (/by the house of their fathers/.test(lower) && section.reference === "Numbers 1:34-35") opening = ["Manasseh's fathers' houses anchor its census number.", "The tribe's place is traced through family identity."];
  else if (/house of his fathers|house of their fathers/.test(lower)) opening = ["The final tribe count is still tied to fathers' houses.", "Numbers connects each person to tribe and household, not just an individual name."];
  else if (/declared their pedigrees/.test(lower)) opening = ["Declared their pedigrees means they stated their family records.", "The census depends on known covenant family lines."];
  else if (/by their generations/.test(lower)) opening = ["The count follows family descent from one generation to the next.", "The tribe is remembered through its households across time."];
  else if (/princes of the tribes/.test(lower)) opening = ["Princes of the tribes are recognized leaders from each father's house.", "They give visible order to the congregation under Moses and Aaron."];
  else if (/families|fathers|pedigrees|generations/.test(lower)) opening = ["Israel is counted by household lines.", "Numbers counts real households, not a faceless crowd."];
  else if (/able to go forth to war/.test(lower) && section.reference === "Numbers 1:1-4") opening = ["The opening census focuses on men able for war.", "Israel is being prepared for the conflict ahead, not merely counted for curiosity."];
  else if (/able to go forth to war/.test(lower) && section.reference === "Numbers 1:26-27") opening = ["Judah's counted men are able for war.", "The tribe that will later lead is already shown as strong within the camp."];
  else if (/able to go forth to war/.test(lower) && section.reference === "Numbers 1:28-33") opening = ["These middle tribe counts also focus on men ready for war.", "Every tribe named here has a military responsibility in Israel's ordered camp."];
  else if (/able to go forth to war/.test(lower)) opening = ["The final count confirms the men ready for war.", "The census total is built from real fighting-age men across the tribes."];
  else if (/of the children of joseph/.test(lower) && section.reference === "Numbers 1:10-15") opening = ["Joseph's descendants are counted through Ephraim and Manasseh.", "The one son Joseph receives a double tribal presence in Israel."];
  else if (/of the children of joseph/.test(lower)) opening = ["Joseph's name appears again because both Ephraim and Manasseh carry his tribal line.", "The census keeps his double tribal presence visible."];
  else if (/of (reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali);/.test(lower)) {
    const tribe = cleanTitle.match(/Of ([A-Za-z]+)/i)?.[1] || "this tribe";
    const leader = cleanTitle.match(/;\s*([^;]+)$/)?.[1] || "its leader";
    opening = [`${tribe}'s leader is named as ${leader}.`, "The census works through recognized tribal heads, not anonymous administration."];
  }
  else if (/children of (reuben|judah|manasseh|naphtali)/.test(lower)) {
    const tribe = cleanTitle.match(/Children Of ([A-Za-z]+)/i)?.[1] || "This tribe";
    opening = [`${tribe}'s descendants are being counted in their place.`, "The tribe stands as one part of the whole ordered camp."];
  }
  else if (/reuben|simeon|gad|judah|issachar|zebulun|ephraim|manasseh|benjamin|dan|asher|naphtali|joseph/.test(lower)) opening = ["The named tribe is placed inside Israel's ordered camp.", "Each tribe has responsibility and location without being erased into the crowd."];
  else if (/thou shalt not number the tribe of levi/.test(lower)) opening = ["Levi is excluded from the military census because its service is different.", "The tribe is set apart to guard the holy dwelling rather than join the war count."];
  else if (/levites shall keep the charge/.test(lower)) opening = ["The Levites are assigned the duty of guarding the tabernacle's service.", "Their work protects holy space at the center of the camp."];
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
  else opening = [`The census gives a concrete detail about ${getNumbersDistinctiveTopic(cleanTitle)}.`, "Israel is being counted, named, and arranged for life near God's presence."];

  const firstLine = opening[0];
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
  const curatedTitles = day39NumbersCuratedPhraseTitles[section.reference] || day40NumbersCuratedPhraseTitles[section.reference];

  return {
    ...section,
    icon,
    title: `${icon} ${stripLeadingEmoji(section.title)}`,
    phrases: (() => {
      const seen = new Map<string, number>();
      return (curatedTitles || section.phrases.map(([title]) => title)).map((title) => {
        const key = stripLeadingEmoji(title).toLowerCase();
        const occurrence = seen.get(key) ?? 0;
        seen.set(key, occurrence + 1);
        return [
          title,
          formatNumbersOneToNineMeaningFirstLines(section, title, "", occurrence),
        ];
      });
    })(),
  };
}

export const NUMBERS_1_9_PERSONAL_SECTIONS = generatedNumbersOneToNinePersonalSections
  .map(polishDay38NumbersSection)
  .map(polishDay39To40NumbersSection);
