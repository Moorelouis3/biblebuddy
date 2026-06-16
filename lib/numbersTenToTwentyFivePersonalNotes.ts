import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedNumbersTenToTwentyFivePersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedNumbersTenToTwentyFivePersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "In The Wilderness",
    "As The LORD Commanded Moses",
    "Before The LORD",
    "The Congregation",
    "The Tabernacle Of The Congregation",
  ],
});

const day41SectionIcons = [
  "🎺", "☁️", "🧭", "🚶", "📣", "🔥", "🍞", "🪶", "👂", "🙏",
  "🌬️", "🧺", "🕊️", "👑", "💬", "🤍", "⛺", "🧑‍⚖️", "🔎", "🍇",
  "🌿", "🏞️", "🛡️", "😨", "✅", "📜", "🧱", "🌄", "🕯️", "👥",
  "🪨", "🗺️", "⚖️", "🕰️",
];

const day42SectionIcons = [
  "😭", "🛑", "🗣️", "🙌", "🔥", "🕊️", "⚔️", "🏜️", "📜", "🧎",
  "🌾", "🍷", "🧺", "🧵", "🔵", "🚨", "👥", "⛺", "🪨", "🌍",
  "⚖️", "🕳️", "🔥", "🧼", "🛡️", "🙏", "🌿", "👑", "📣", "🪔",
  "🍞", "✨", "🧭", "🔎", "📦", "✅", "💡", "🌙",
];

const day43SectionIcons = [
  "👑", "⛪", "🛡️", "🎁", "🌾", "🍞", "🧂", "💧", "🐄", "🔥",
  "🧼", "🕊️", "⛺", "🚪", "🪦", "🏜️", "💦", "🪨", "😡", "⚖️",
  "🐍", "🩹", "⚔️", "🏞️", "🎶", "🌊", "🗺️", "📍", "🛕", "🌄",
  "✅", "🧭",
];

const day44SectionIcons = [
  "👀", "😨", "📨", "🧙", "🛑", "🗣️", "🐴", "⚔️", "👁️", "⛰️",
  "🔥", "🙏", "🌅", "🕊️", "👑", "🚫", "💬", "📜", "🌟", "🏕️",
  "⚖️", "🧭", "✨", "🦁", "🌊", "🏞️", "🪔", "🔭", "🧱", "🛡️",
  "🍽️", "💔", "⚠️", "🧎", "🗡️", "🕯️", "✅", "📍", "🚨",
];

const day41NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 10:1-6": [
    "🎺 Make Thee Two Trumpets Of Silver",
    "🔨 Of A Whole Piece Shalt Thou Make Them",
    "👥 For The Calling Of The Assembly",
    "🚶 For The Journeying Of The Camps",
    "📣 Ye Shall Blow An Alarm",
  ],
  "Numbers 10:7-10": [
    "🎺 When The Congregation Is To Be Gathered Together",
    "⚔️ If Ye Go To War In Your Land",
    "🙏 Ye Shall Be Remembered Before The LORD",
    "🎉 In The Day Of Your Gladness",
    "🔥 Over Your Burnt Offerings",
  ],
  "Numbers 10:11-13": [
    "📅 In The Second Year",
    "☁️ The Cloud Was Taken Up",
    "🚶 The Children Of Israel Took Their Journeys",
    "🏜️ Out Of The Wilderness Of Sinai",
    "✅ According To The Commandment Of The LORD",
  ],
  "Numbers 10:14-19": [
    "🦁 The Standard Of The Camp Of Judah",
    "🚶 First Took Their Journey",
    "⛺ The Tabernacle Was Taken Down",
    "📦 The Sons Of Gershon And Merari Set Forward",
  ],
  "Numbers 10:20-25": [
    "🧭 The Standard Of The Camp Of Reuben",
    "📦 The Kohathites Set Forward",
    "🏕️ Bearing The Sanctuary",
    "🌊 The Standard Of The Camp Of Ephraim",
    "⚖️ The Standard Of The Camp Of Dan",
  ],
  "Numbers 10:26-28": [
    "📋 Thus Were The Journeyings",
    "🏕️ Of The Children Of Israel",
    "⚔️ According To Their Armies",
    "🚶 When They Set Forward",
  ],
  "Numbers 10:29-32": [
    "🤝 Come Thou With Us",
    "🎁 We Will Do Thee Good",
    "🚫 I Will Not Go",
    "👀 Thou Mayest Be To Us Instead Of Eyes",
    "🤲 The Same Will We Do Unto Thee",
  ],
  "Numbers 10:33-36": [
    "📦 The Ark Of The Covenant Of The LORD Went Before Them",
    "☁️ The Cloud Of The LORD Was Upon Them",
    "📣 Rise Up, LORD",
    "⚔️ Let Thine Enemies Be Scattered",
    "🏕️ Return, O LORD",
  ],
  "Numbers 11:1-3": [
    "💬 When The People Complained",
    "👂 The LORD Heard It",
    "🔥 The Fire Of The LORD Burnt Among Them",
    "🙏 Moses Prayed Unto The LORD",
    "📛 He Called The Name Of The Place Taberah",
  ],
  "Numbers 11:4-6": [
    "🍽️ The Mixt Multitude Fell A Lusting",
    "😭 The Children Of Israel Also Wept Again",
    "🥩 Who Shall Give Us Flesh To Eat",
    "🏺 We Remember The Fish",
    "🍞 There Is Nothing At All, Beside This Manna",
  ],
  "Numbers 11:7-9": [
    "🌾 The Manna Was As Coriander Seed",
    "👀 The Colour Thereof As The Colour Of Bdellium",
    "🧺 The People Went About, And Gathered It",
    "🍳 Baked It In Pans",
    "🌧️ The Manna Fell Upon It",
  ],
  "Numbers 11:10-15": [
    "😭 Moses Heard The People Weep",
    "😡 The Anger Of The LORD Was Kindled Greatly",
    "💔 Moses Also Was Displeased",
    "🤱 Have I Conceived All This People",
    "🪨 I Am Not Able To Bear All This People Alone",
  ],
  "Numbers 11:16-17": [
    "👥 Gather Unto Me Seventy Men",
    "🧓 Whom Thou Knowest To Be The Elders",
    "☁️ I Will Come Down And Talk With Thee",
    "🕊️ I Will Take Of The Spirit Which Is Upon Thee",
    "🤝 They Shall Bear The Burden Of The People With Thee",
  ],
  "Numbers 11:18-20": [
    "🧼 Sanctify Yourselves Against To Morrow",
    "🥩 Ye Shall Eat Flesh",
    "📅 Even A Whole Month",
    "🤢 Until It Come Out At Your Nostrils",
    "🚫 Ye Have Despised The LORD",
  ],
  "Numbers 11:21-23": [
    "👥 Six Hundred Thousand Footmen",
    "🐑 Shall The Flocks And The Herds Be Slain",
    "🌊 Shall All The Fish Of The Sea Be Gathered",
    "💪 Is The LORD'S Hand Waxed Short",
    "👁️ Thou Shalt See Now",
  ],
  "Numbers 11:24-29": [
    "🗣️ Moses Told The People The Words Of The LORD",
    "👥 Gathered The Seventy Men",
    "🕊️ The Spirit Rested Upon Them",
    "📣 They Prophesied",
    "🙌 Would God That All The LORD'S People Were Prophets",
  ],
  "Numbers 11:30-30": [
    "🏕️ Moses Gat Him Into The Camp",
    "👥 He And The Elders Of Israel",
    "✅ The Shared Burden Returns To The Camp",
    "🕊️ The Spirit-Given Help Remains With The People",
  ],
  "Numbers 11:31-32": [
    "🌬️ There Went Forth A Wind From The LORD",
    "🐦 Brought Quails From The Sea",
    "📏 Two Cubits High Upon The Face Of The Earth",
    "🌙 All That Night",
    "🧺 They Gathered The Quails",
  ],
  "Numbers 11:33-35": [
    "🍖 While The Flesh Was Yet Between Their Teeth",
    "😡 The Wrath Of The LORD Was Kindled",
    "⚰️ The LORD Smote The People",
    "📛 Kibrothhattaavah",
    "🪦 They Buried The People That Lusted",
  ],
  "Numbers 12:1-2": [
    "🗣️ Miriam And Aaron Spake Against Moses",
    "👩 The Ethiopian Woman Whom He Had Married",
    "❓ Hath The LORD Indeed Spoken Only By Moses",
    "👂 The LORD Heard It",
  ],
  "Numbers 12:4-5": [
    "⚡ The LORD Spake Suddenly",
    "👥 Come Out Ye Three",
    "☁️ The LORD Came Down In The Pillar Of The Cloud",
    "🚪 Stood In The Door Of The Tabernacle",
    "📣 Called Aaron And Miriam",
  ],
  "Numbers 12:6-8": [
    "👂 Hear Now My Words",
    "🌙 In A Dream",
    "🗣️ Mouth To Mouth",
    "👁️ The Similitude Of The LORD Shall He Behold",
    "⚠️ Wherefore Then Were Ye Not Afraid",
  ],
  "Numbers 12:9-10": [
    "😡 The Anger Of The LORD Was Kindled",
    "☁️ The Cloud Departed",
    "🤍 Miriam Became Leprous",
    "❄️ White As Snow",
  ],
  "Numbers 12:10-12": [
    "👀 Aaron Looked Upon Miriam",
    "🙏 I Beseech Thee",
    "💔 Lay Not The Sin Upon Us",
    "🧟 Let Her Not Be As One Dead",
  ],
  "Numbers 12:14-16": [
    "🙏 Moses Cried Unto The LORD",
    "🧼 Heal Her Now, O God",
    "🚪 Let Her Be Shut Out From The Camp Seven Days",
    "⏳ The People Journeyed Not",
    "🏜️ The Wilderness Of Paran",
  ],
  "Numbers 13:1-3": [
    "📣 The LORD Spake Unto Moses",
    "🕵️ Send Thou Men",
    "🗺️ Search The Land Of Canaan",
    "👑 Every One A Ruler Among Them",
    "✅ Moses Sent Them",
  ],
  "Numbers 13:4-9": [
    "📜 These Were Their Names",
    "🧭 Of The Tribe Of Reuben",
    "🦁 Of The Tribe Of Judah, Caleb",
    "🌿 Of The Tribe Of Ephraim, Oshea",
    "🏷️ Each Tribe Sends A Man",
  ],
  "Numbers 13:10-15": [
    "🐺 Of The Tribe Of Benjamin",
    "⚖️ Of The Tribe Of Dan",
    "🌳 Of The Tribe Of Asher",
    "🦌 Of The Tribe Of Naphtali",
    "🛡️ Of The Tribe Of Gad",
  ],
  "Numbers 13:16-16": [
    "📜 These Are The Names Of The Men",
    "🕵️ Which Moses Sent To Spy Out The Land",
    "✝️ Oshea The Son Of Nun",
    "🏷️ Moses Called Oshea Jehoshua",
  ],
  "Numbers 13:17-20": [
    "🧭 Get You Up This Way Southward",
    "👁️ See The Land, What It Is",
    "💪 Whether They Be Strong Or Weak",
    "🏙️ What Cities They Be",
    "🍇 Bring Of The Fruit Of The Land",
  ],
  "Numbers 13:21-24": [
    "🗺️ They Searched The Land",
    "🏔️ From The Wilderness Of Zin Unto Rehob",
    "🧱 Came Unto Hebron",
    "👥 The Children Of Anak",
    "🍇 The Brook Of Eshcol",
  ],
  "Numbers 13:25-27": [
    "⏳ After Forty Days",
    "📣 Brought Back Word",
    "🍯 Surely It Floweth With Milk And Honey",
    "🍇 This Is The Fruit Of It",
    "👥 Unto All The Congregation",
  ],
  "Numbers 13:28-29": [
    "⚠️ Nevertheless The People Be Strong",
    "🏙️ The Cities Are Walled",
    "👥 The Children Of Anak",
    "🏜️ The Amalekites Dwell In The South",
    "🌊 The Canaanites Dwell By The Sea",
  ],
  "Numbers 13:31-33": [
    "🚫 We Be Not Able To Go Up",
    "📉 They Brought Up An Evil Report",
    "🧍 Men Of A Great Stature",
    "🦗 We Were In Our Own Sight As Grasshoppers",
    "👀 So We Were In Their Sight",
  ],
};

const day42NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 14:1-4": [
    "😭 All The Congregation Lifted Up Their Voice",
    "💬 Murmured Against Moses And Against Aaron",
    "⚰️ Would God That We Had Died In Egypt",
    "📖 Let Us Make A Captain",
    "↩️ Let Us Return Into Egypt",
  ],
  "Numbers 14:5-10": [
    "🙇 Moses And Aaron Fell On Their Faces",
    "👕 Rent Their Clothes",
    "🍯 The Land Is An Exceeding Good Land",
    "🛡️ The LORD Is With Us",
    "🚫 Fear Them Not",
    "🪨 Bade Stone Them With Stones",
  ],
  "Numbers 14:11-12": [
    "📣 The LORD Said Unto Moses",
    "❓ How Long Will This People Provoke Me",
    "🚫 How Long Will It Be Ere They Believe Me",
    "🦠 I Will Smite Them With The Pestilence",
    "🧬 Make Of Thee A Greater Nation",
  ],
  "Numbers 14:13-18": [
    "🙏 Moses Said Unto The LORD",
    "👂 The Egyptians Shall Hear It",
    "☁️ Thy Cloud Standeth Over Them",
    "⚖️ The LORD Is Longsuffering",
    "🧎 Pardon, I Beseech Thee",
  ],
  "Numbers 14:19-19": [
    "🧎 Pardon The Iniquity Of This People",
    "📏 According Unto The Greatness Of Thy Mercy",
    "🚪 From Egypt Even Until Now",
    "🙏 Moses Intercedes For The Camp",
  ],
  "Numbers 14:20-25": [
    "🕊️ I Have Pardoned According To Thy Word",
    "🌍 All The Earth Shall Be Filled With The Glory Of The LORD",
    "👁️ They Have Seen My Glory",
    "🔟 Have Tempted Me Now These Ten Times",
    "✅ My Servant Caleb",
    "🏜️ Get You Into The Wilderness",
  ],
  "Numbers 14:26-31": [
    "📣 How Long Shall I Bear With This Evil Congregation",
    "💬 Which Murmur Against Me",
    "⚰️ Your Carcases Shall Fall In This Wilderness",
    "🔢 From Twenty Years Old And Upward",
    "👶 Your Little Ones",
    "📅 Forty Days, Each Day For A Year",
  ],
  "Numbers 14:32-35": [
    "🏜️ Your Carcases Shall Fall In This Wilderness",
    "👶 Your Children Shall Wander",
    "📅 Forty Years",
    "⚠️ Ye Shall Know My Breach Of Promise",
  ],
  "Numbers 14:36-38": [
    "🕵️ Which Moses Sent To Search The Land",
    "📉 Made All The Congregation To Murmur",
    "🦠 Died By The Plague Before The LORD",
    "✅ Joshua And Caleb Lived Still",
  ],
  "Numbers 14:39-44": [
    "😭 The People Mourned Greatly",
    "⛰️ Gat Them Up Into The Top Of The Mountain",
    "⚠️ Wherefore Now Do Ye Transgress",
    "🚫 The LORD Is Not Among You",
    "📦 The Ark Of The Covenant Departed Not",
    "⚔️ The Amalekites And Canaanites Smote Them",
  ],
  "Numbers 14:45-45": [
    "⚔️ The Amalekites Came Down",
    "⚔️ The Canaanites Which Dwelt In That Hill",
    "📉 Discomfited Them",
    "📍 Even Unto Hormah",
  ],
  "Numbers 15:1-3": [
    "📣 The LORD Spake Unto Moses",
    "🏡 When Ye Be Come Into The Land",
    "🎁 Make An Offering By Fire Unto The LORD",
    "🐂 Of The Herd, Or Of The Flock",
    "🌸 A Sweet Savour Unto The LORD",
  ],
  "Numbers 15:4-9": [
    "🌾 A Meat Offering",
    "🛢️ A Fourth Part Of An Hin Of Oil",
    "🍷 Wine For A Drink Offering",
    "🐏 When Thou Preparest A Ram",
    "🔥 For A Burnt Offering",
  ],
  "Numbers 15:10-12": [
    "🍷 Wine For A Drink Offering",
    "🌸 A Sweet Savour Unto The LORD",
    "🐂 One Bullock",
    "🔢 According To The Number That Ye Shall Prepare",
  ],
  "Numbers 15:13-16": [
    "🌍 All That Are Born Of The Country",
    "🧳 If A Stranger Sojourn With You",
    "📜 One Ordinance",
    "⚖️ As Ye Are, So Shall The Stranger Be",
    "📏 One Law And One Manner",
  ],
  "Numbers 15:17-21": [
    "🍞 When Ye Eat Of The Bread Of The Land",
    "🌾 Offer Up An Heave Offering",
    "🥣 A Cake Of The First Of Your Dough",
    "🏠 Throughout Your Generations",
  ],
  "Numbers 15:22-26": [
    "⚠️ If Ye Have Erred",
    "🚫 Not Observed All These Commandments",
    "🐂 One Young Bullock For A Burnt Offering",
    "🐐 One Kid Of The Goats For A Sin Offering",
    "🙏 The Priest Shall Make An Atonement",
    "🕊️ It Shall Be Forgiven Them",
  ],
  "Numbers 15:27-29": [
    "👤 If Any Soul Sin Through Ignorance",
    "🐐 A She Goat Of The First Year",
    "🙏 The Priest Shall Make An Atonement",
    "🕊️ It Shall Be Forgiven Him",
    "📏 One Law",
  ],
  "Numbers 15:30-31": [
    "✊ Doeth Ought Presumptuously",
    "📛 Reproacheth The LORD",
    "✂️ That Soul Shall Be Cut Off",
    "📜 He Hath Despised The Word Of The LORD",
    "⚖️ His Iniquity Shall Be Upon Him",
  ],
  "Numbers 15:32-36": [
    "🪵 Found A Man That Gathered Sticks",
    "🛑 Upon The Sabbath Day",
    "⏳ Put Him In Ward",
    "📣 The LORD Said Unto Moses",
    "🪨 Stoned Him With Stones",
  ],
  "Numbers 15:37-41": [
    "🧵 Bid Them That They Make Them Fringes",
    "🔵 A Ribband Of Blue",
    "👀 That Ye May Look Upon It",
    "🧠 Remember All The Commandments",
    "🚫 Seek Not After Your Own Heart",
    "🚪 I Brought You Out Of The Land Of Egypt",
  ],
  "Numbers 16:1-3": [
    "👥 Korah... Dathan And Abiram... Took Men",
    "📣 Two Hundred And Fifty Princes",
    "⚔️ They Rose Up Before Moses",
    "🗣️ Ye Take Too Much Upon You",
    "⛺ All The Congregation Are Holy",
  ],
  "Numbers 16:4-7": [
    "🙇 Moses Fell Upon His Face",
    "🌅 To Morrow The LORD Will Shew",
    "🔥 Take You Censers",
    "🧪 Put Fire Therein",
    "📛 Ye Take Too Much Upon You",
  ],
  "Numbers 16:8-11": [
    "👂 Hear, I Pray You, Ye Sons Of Levi",
    "❓ Seemeth It But A Small Thing Unto You",
    "⛺ To Do The Service Of The Tabernacle",
    "👑 Seek Ye The Priesthood Also",
    "⚔️ Gathered Together Against The LORD",
  ],
  "Numbers 16:12-14": [
    "📣 Moses Sent To Call Dathan And Abiram",
    "🚫 We Will Not Come Up",
    "🍯 A Land That Floweth With Milk And Honey",
    "👁️ Wilt Thou Put Out The Eyes Of These Men",
  ],
  "Numbers 16:15-19": [
    "😡 Moses Was Very Wroth",
    "🙏 Respect Not Thou Their Offering",
    "🔥 Take Every Man His Censer",
    "👥 Korah Gathered All The Congregation",
    "✨ The Glory Of The LORD Appeared",
  ],
  "Numbers 16:20-22": [
    "📣 The LORD Spake Unto Moses And Aaron",
    "🚪 Separate Yourselves From Among This Congregation",
    "🔥 I May Consume Them In A Moment",
    "🧎 They Fell Upon Their Faces",
    "🕊️ The God Of The Spirits Of All Flesh",
  ],
  "Numbers 16:23-27": [
    "📣 Speak Unto The Congregation",
    "🚶 Get You Up From About The Tabernacle Of Korah",
    "⚠️ Depart From The Tents Of These Wicked Men",
    "🚫 Touch Nothing Of Theirs",
    "🏕️ Dathan And Abiram Came Out",
  ],
  "Numbers 16:28-33": [
    "📣 Hereby Ye Shall Know",
    "🌍 If The LORD Make A New Thing",
    "🕳️ The Earth Open Her Mouth",
    "📉 They Went Down Alive Into The Pit",
    "🌑 The Earth Closed Upon Them",
  ],
  "Numbers 16:34-34": [
    "🏃 All Israel That Were Round About Them Fled",
    "😨 Lest The Earth Swallow Us Up Also",
    "⚠️ Judgment Brings Fear To The Camp",
    "📛 Rebellion Is Exposed Publicly",
  ],
  "Numbers 16:35-40": [
    "🔥 There Came Out A Fire From The LORD",
    "🔥 Consumed The Two Hundred And Fifty Men",
    "🧪 The Censers Of These Sinners",
    "🔨 Broad Plates For A Covering Of The Altar",
    "⚠️ A Memorial Unto The Children Of Israel",
  ],
  "Numbers 16:41-45": [
    "💬 Ye Have Killed The People Of The LORD",
    "☁️ The Cloud Covered It",
    "✨ The Glory Of The LORD Appeared",
    "🚪 Get You Up From Among This Congregation",
    "🔥 I May Consume Them As In A Moment",
  ],
  "Numbers 16:46-50": [
    "🧪 Take A Censer",
    "🔥 Put Fire Therein From Off The Altar",
    "🙏 Make An Atonement For Them",
    "🦠 The Plague Is Begun",
    "🧍 He Stood Between The Dead And The Living",
    "🛑 The Plague Was Stayed",
  ],
  "Numbers 17:1-5": [
    "📣 The LORD Spake Unto Moses",
    "🪵 Take Of Every One Of Them A Rod",
    "✍️ Write Thou Every Man's Name Upon His Rod",
    "👑 Write Aaron's Name Upon The Rod Of Levi",
    "🌱 The Man's Rod, Whom I Shall Choose, Shall Blossom",
  ],
  "Numbers 17:6-7": [
    "🪵 Twelve Rods",
    "👑 The Rod Of Aaron Was Among Their Rods",
    "📦 Moses Laid Up The Rods Before The LORD",
    "⛺ In The Tabernacle Of Witness",
  ],
  "Numbers 17:8-9": [
    "🌱 The Rod Of Aaron Was Budded",
    "🌸 Brought Forth Buds",
    "🌼 Bloomed Blossoms",
    "🌰 Yielded Almonds",
    "👥 Moses Brought Out All The Rods",
  ],
  "Numbers 17:10-11": [
    "📦 Bring Aaron's Rod Again Before The Testimony",
    "📛 To Be Kept For A Token Against The Rebels",
    "🛑 Thou Shalt Quite Take Away Their Murmurings",
    "✅ Moses Did So",
  ],
  "Numbers 17:12-13": [
    "😨 Behold, We Die",
    "💀 We Perish, We All Perish",
    "⚠️ Whosoever Cometh Any Thing Near Unto The Tabernacle",
    "❓ Shall We Be Consumed With Dying",
  ],
};

const day43NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 18:1-2": [
    "⚖️ Thou And Thy Sons Shall Bear The Iniquity Of The Sanctuary",
    "👑 Thou And Thy Sons With Thee Shall Bear The Iniquity Of Your Priesthood",
    "🤝 Bring With Thee Thy Brethren Also Of The Tribe Of Levi",
    "🧩 That They May Be Joined Unto Thee",
    "⛺ Thou And Thy Sons Shall Minister Before The Tabernacle",
  ],
  "Numbers 18:3-7": [
    "🛡️ They Shall Keep Thy Charge",
    "🚫 They Shall Not Come Nigh The Vessels Of The Sanctuary",
    "⚰️ That Neither They, Nor Ye Also, Die",
    "🚷 A Stranger Shall Not Come Nigh Unto You",
    "🎁 Your Priest's Office Unto You As A Service Of Gift",
  ],
  "Numbers 18:8-10": [
    "🎁 I Also Have Given Thee The Charge Of Mine Heave Offerings",
    "🔥 Reserved From The Fire",
    "📦 Every Oblation Of Theirs",
    "🏛️ In The Most Holy Place Shalt Thou Eat It",
  ],
  "Numbers 18:11-13": [
    "🌾 The Heave Offering Of Their Gift",
    "👨‍👩‍👧‍👦 I Have Given Them Unto Thee, And To Thy Sons And To Thy Daughters",
    "🧼 Every One That Is Clean In Thy House Shall Eat Of It",
    "🫒 All The Best Of The Oil",
    "🍇 The Firstfruits Of Them",
  ],
  "Numbers 18:14-19": [
    "🔒 Every Thing Devoted In Israel Shall Be Thine",
    "👶 Every Thing That Openeth The Matrix",
    "💰 The Firstborn Of Man Shalt Thou Surely Redeem",
    "🐂 The Firstling Of A Cow... Thou Shalt Not Redeem",
    "🧂 A Covenant Of Salt For Ever",
  ],
  "Numbers 18:21-24": [
    "🔟 I Have Given The Children Of Levi All The Tenth In Israel",
    "⛺ For Their Service Which They Serve",
    "🚫 The Children Of Israel Must Not Come Nigh The Tabernacle",
    "🏞️ Among The Children Of Israel They Shall Have No Inheritance",
    "🌾 The Tithes... I Have Given To The Levites To Inherit",
  ],
  "Numbers 18:25-29": [
    "📣 Speak Unto The Levites",
    "🔟 When Ye Take Of The Children Of Israel The Tithes",
    "🌾 Offer Up An Heave Offering Of It For The LORD",
    "🔁 Even A Tenth Part Of The Tithe",
    "✅ Of All The Best Thereof",
  ],
  "Numbers 18:30-32": [
    "🌾 When Ye Have Heaved From It The Best Of It",
    "🍽️ Ye Shall Eat It In Every Place",
    "🎁 It Is Your Reward For Your Service",
    "⚖️ Ye Shall Bear No Sin By Reason Of It",
    "🛑 Neither Shall Ye Pollute The Holy Things",
  ],
  "Numbers 19:1-2": [
    "📜 This Is The Ordinance Of The Law",
    "🐄 Bring Thee A Red Heifer Without Spot",
    "✅ Wherein Is No Blemish",
    "🪢 Upon Which Never Came Yoke",
  ],
  "Numbers 19:3-4": [
    "👑 Ye Shall Give Her Unto Eleazar The Priest",
    "🏕️ Bring Her Forth Without The Camp",
    "🩸 Sprinkle Of Her Blood Directly Before The Tabernacle",
    "🔢 Seven Times",
  ],
  "Numbers 19:5-6": [
    "🔥 One Shall Burn The Heifer In His Sight",
    "🥩 Her Skin, And Her Flesh, And Her Blood",
    "🧱 With Her Dung",
    "🌲 Cedar Wood, And Hyssop, And Scarlet",
    "🔥 Cast It Into The Midst Of The Burning",
  ],
  "Numbers 19:7-10": [
    "🧼 The Priest Shall Wash His Clothes",
    "🌙 Be Unclean Until The Even",
    "📦 Gather Up The Ashes Of The Heifer",
    "💧 Water Of Separation",
    "🕊️ It Is A Purification For Sin",
  ],
  "Numbers 19:11-13": [
    "💀 He That Toucheth The Dead Body",
    "📅 Shall Be Unclean Seven Days",
    "💧 He Shall Purify Himself With It On The Third Day",
    "⛺ Defileth The Tabernacle Of The LORD",
    "🚫 The Water Of Separation Was Not Sprinkled Upon Him",
  ],
  "Numbers 19:14-16": [
    "⛺ When A Man Dieth In A Tent",
    "📖 This Is The Law",
    "🏺 Every Open Vessel",
    "🚫 Which Hath No Covering Bound Upon It",
    "🪦 Or A Grave",
  ],
  "Numbers 19:17-19": [
    "🔥 Ashes Of The Burnt Heifer Of Purification For Sin",
    "💧 Running Water Shall Be Put Thereto",
    "🌿 A Clean Person Shall Take Hyssop",
    "🏕️ Sprinkle It Upon The Tent",
    "📅 On The Seventh Day He Shall Purify Himself",
  ],
  "Numbers 19:21-22": [
    "📜 It Shall Be A Perpetual Statute",
    "🧼 He That Sprinkleth The Water Of Separation Shall Wash His Clothes",
    "🖐️ Whatsoever The Unclean Person Toucheth Shall Be Unclean",
    "🌙 The Soul That Toucheth It Shall Be Unclean Until Even",
  ],
  "Numbers 20:2-5": [
    "💧 There Was No Water For The Congregation",
    "💬 They Chode With Moses",
    "⚰️ Would God That We Had Died",
    "🌵 Why Have Ye Brought Up The Congregation Into This Wilderness",
    "🏜️ This Evil Place",
  ],
  "Numbers 20:7-8": [
    "📣 The LORD Spake Unto Moses",
    "🪵 Take The Rod",
    "🗣️ Speak Ye Unto The Rock",
    "💧 It Shall Give Forth His Water",
    "🐄 Thou Shalt Give The Congregation And Their Beasts Drink",
  ],
  "Numbers 20:9-11": [
    "🪵 Moses Took The Rod From Before The LORD",
    "😡 Hear Now, Ye Rebels",
    "❓ Must We Fetch You Water Out Of This Rock",
    "✋ Moses Lifted Up His Hand",
    "🪨 He Smote The Rock Twice",
    "💧 The Water Came Out Abundantly",
  ],
  "Numbers 20:12-13": [
    "🚫 Because Ye Believed Me Not",
    "🕊️ To Sanctify Me In The Eyes Of The Children Of Israel",
    "🚪 Ye Shall Not Bring This Congregation Into The Land",
    "💬 The Children Of Israel Strove With The LORD",
    "✨ He Was Sanctified In Them",
  ],
  "Numbers 20:14-17": [
    "📨 Moses Sent Messengers From Kadesh",
    "🤝 Thus Saith Thy Brother Israel",
    "⚰️ Our Fathers Went Down Into Egypt",
    "🙏 Let Us Pass, I Pray Thee, Through Thy Country",
    "🛣️ We Will Go By The King's Highway",
  ],
  "Numbers 20:18-21": [
    "🚫 Thou Shalt Not Pass By Me",
    "⚔️ Lest I Come Out Against Thee With The Sword",
    "💧 If I And My Cattle Drink Of Thy Water",
    "💰 Then I Will Pay For It",
    "💪 Edom Came Out Against Him With Much People",
  ],
  "Numbers 20:22-24": [
    "⛰️ Came Unto Mount Hor",
    "📣 The LORD Spake Unto Moses And Aaron",
    "👥 Aaron Shall Be Gathered Unto His People",
    "🚪 He Shall Not Enter Into The Land",
    "⚠️ Ye Rebelled Against My Word",
  ],
  "Numbers 20:25-29": [
    "👑 Take Aaron And Eleazar His Son",
    "⛰️ Bring Them Up Unto Mount Hor",
    "👕 Strip Aaron Of His Garments",
    "👕 Put Them Upon Eleazar His Son",
    "⚰️ Aaron Died There In The Top Of The Mount",
    "😭 All The House Of Israel Mourned For Aaron",
  ],
  "Numbers 21:1-3": [
    "👑 King Arad The Canaanite",
    "⚔️ He Fought Against Israel",
    "🙏 Israel Vowed A Vow Unto The LORD",
    "🛡️ The LORD Hearkened To The Voice Of Israel",
    "📍 The Name Of The Place Was Called Hormah",
  ],
  "Numbers 21:8-9": [
    "🔥 Make Thee A Fiery Serpent",
    "🚩 Set It Upon A Pole",
    "👀 Every One That Is Bitten, When He Looketh Upon It, Shall Live",
    "🐍 Moses Made A Serpent Of Brass",
    "🙌 When He Beheld The Serpent Of Brass, He Lived",
  ],
  "Numbers 21:10-13": [
    "🚶 The Children Of Israel Set Forward",
    "⛺ Pitched In Oboth",
    "🌅 Toward The Sunrising",
    "🏞️ The River Of Arnon",
    "📍 Between Moab And The Amorites",
  ],
  "Numbers 21:14-16": [
    "📖 The Book Of The Wars Of The LORD",
    "🏞️ The Brooks Of Arnon",
    "📣 Gather The People Together",
    "💧 I Will Give Them Water",
  ],
  "Numbers 21:17-20": [
    "🎵 Then Israel Sang This Song",
    "⛲ Spring Up, O Well",
    "👑 The Princes Digged The Well",
    "🪵 By The Direction Of The Lawgiver",
    "⛰️ From The Wilderness They Went To Mattanah",
  ],
  "Numbers 21:21-24": [
    "📨 Israel Sent Messengers Unto Sihon",
    "🙏 Let Me Pass Through Thy Land",
    "🚫 Sihon Would Not Suffer Israel To Pass",
    "⚔️ Sihon Gathered All His People Together",
    "🛡️ Israel Smote Him With The Edge Of The Sword",
  ],
  "Numbers 21:25-30": [
    "🏙️ Israel Took All These Cities",
    "🏰 Heshbon Was The City Of Sihon",
    "🔥 A Fire Gone Out Of Heshbon",
    "💥 Woe To Thee, Moab",
    "📉 Heshbon Is Perished Even Unto Dibon",
  ],
  "Numbers 21:31-35": [
    "🏡 Israel Dwelt In The Land Of The Amorites",
    "🕵️ Moses Sent To Spy Out Jaazer",
    "🚫 Fear Him Not",
    "🤲 I Have Delivered Him Into Thy Hand",
    "⚔️ They Smote Him, And His Sons, And All His People",
  ],
};

const day44NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 22:2-4": [
    "👀 Balak The Son Of Zippor Saw",
    "😨 Moab Was Sore Afraid",
    "📣 Moab Said Unto The Elders Of Midian",
    "🐂 As The Ox Licketh Up The Grass",
  ],
  "Numbers 22:5-6": [
    "📨 He Sent Messengers Therefore Unto Balaam",
    "🌊 The People Is Come Out From Egypt",
    "🌍 They Cover The Face Of The Earth",
    "🪄 Curse Me This People",
    "💪 They Are Too Mighty For Me",
  ],
  "Numbers 22:7-8": [
    "🎁 The Rewards Of Divination",
    "🌙 Lodge Here This Night",
    "📣 I Will Bring You Word Again",
    "🗣️ As The LORD Shall Speak Unto Me",
  ],
  "Numbers 22:9-12": [
    "🌙 God Came Unto Balaam",
    "❓ What Men Are These With Thee",
    "🚫 Thou Shalt Not Go With Them",
    "🚫 Thou Shalt Not Curse The People",
    "✅ They Are Blessed",
  ],
  "Numbers 22:13-14": [
    "🌅 Balaam Rose Up In The Morning",
    "🏞️ Get You Into Your Land",
    "🚫 The LORD Refuseth To Give Me Leave",
    "📣 Balaam Refuseth To Come With Us",
  ],
  "Numbers 22:15-17": [
    "👑 Princes, More, And More Honourable",
    "🙏 Let Nothing, I Pray Thee, Hinder Thee",
    "🏆 I Will Promote Thee Unto Very Great Honour",
    "🗣️ Whatsoever Thou Sayest Unto Me I Will Do",
  ],
  "Numbers 22:18-19": [
    "🏠 If Balak Would Give Me His House Full Of Silver And Gold",
    "🚫 I Cannot Go Beyond The Word Of The LORD",
    "🌙 Tarry Ye Also Here This Night",
    "👂 What The LORD Will Say Unto Me More",
  ],
  "Numbers 22:20-21": [
    "🌙 God Came Unto Balaam At Night",
    "🚶 If The Men Come To Call Thee",
    "🗣️ The Word Which I Shall Say Unto Thee",
    "🐴 Balaam Saddled His Ass",
  ],
  "Numbers 22:22-23": [
    "🔥 God's Anger Was Kindled Because He Went",
    "⚔️ The Angel Of The LORD Stood In The Way",
    "🚧 For An Adversary Against Him",
    "🗡️ His Sword Drawn In His Hand",
  ],
  "Numbers 22:23-27": [
    "🐴 The Ass Saw The Angel Of The LORD",
    "🌾 Turned Aside Out Of The Way",
    "🧱 Thrust Herself Unto The Wall",
    "😖 Crushed Balaam's Foot",
    "🪨 Fell Down Under Balaam",
  ],
  "Numbers 22:28-30": [
    "🗣️ The LORD Opened The Mouth Of The Ass",
    "❓ What Have I Done Unto Thee",
    "😡 Balaam Said Unto The Ass",
    "⚔️ I Would There Were A Sword In Mine Hand",
    "🐴 Am Not I Thine Ass",
  ],
  "Numbers 22:31-33": [
    "👁️ The LORD Opened The Eyes Of Balaam",
    "🙇 He Bowed Down His Head",
    "⚠️ Thy Way Is Perverse Before Me",
    "🗡️ Surely Now Also I Had Slain Thee",
    "✅ Saved Her Alive",
  ],
  "Numbers 22:34-35": [
    "🧎 I Have Sinned",
    "👁️ I Knew Not That Thou Stoodest In The Way",
    "↩️ I Will Get Me Back Again",
    "🗣️ Only The Word That I Shall Speak Unto Thee",
    "🚶 So Balaam Went With The Princes Of Balak",
  ],
  "Numbers 22:36-41": [
    "🏙️ Balak Went Out To Meet Him",
    "❓ Am I Not Able Indeed To Promote Thee To Honour",
    "🗣️ The Word That God Putteth In My Mouth",
    "🐂 Balak Offered Oxen And Sheep",
    "⛰️ The High Places Of Baal",
  ],
  "Numbers 23:1-3": [
    "🧱 Build Me Here Seven Altars",
    "🐂 Prepare Me Here Seven Oxen And Seven Rams",
    "🔥 Stand By Thy Burnt Offering",
    "🙏 Peradventure The LORD Will Come To Meet Me",
  ],
  "Numbers 23:4-6": [
    "🤝 God Met Balaam",
    "🧱 I Have Prepared Seven Altars",
    "🗣️ The LORD Put A Word In Balaam's Mouth",
    "↩️ Return Unto Balak",
  ],
  "Numbers 23:7-10": [
    "📜 He Took Up His Parable",
    "🪄 Come, Curse Me Jacob",
    "❓ How Shall I Curse, Whom God Hath Not Cursed",
    "⛰️ From The Top Of The Rocks I See Him",
    "✨ Let Me Die The Death Of The Righteous",
  ],
  "Numbers 23:11-12": [
    "😡 What Hast Thou Done Unto Me",
    "🪄 I Took Thee To Curse Mine Enemies",
    "🙌 Thou Hast Blessed Them Altogether",
    "🗣️ Must I Not Take Heed To Speak",
  ],
  "Numbers 23:13-17": [
    "👀 Thou Shalt See But The Utmost Part Of Them",
    "⛰️ The Field Of Zophim",
    "🧱 Built Seven Altars",
    "🗣️ Put A Word In His Mouth",
  ],
  "Numbers 23:18-20": [
    "👂 Hearken Unto Me, Thou Son Of Zippor",
    "🚫 God Is Not A Man, That He Should Lie",
    "🔁 Neither The Son Of Man, That He Should Repent",
    "🙌 I Have Received Commandment To Bless",
    "🔒 I Cannot Reverse It",
  ],
  "Numbers 23:21-24": [
    "👁️ He Hath Not Beheld Iniquity In Jacob",
    "👑 The Shout Of A King Is Among Them",
    "🚪 God Brought Them Out Of Egypt",
    "🦁 The People Shall Rise Up As A Great Lion",
  ],
  "Numbers 23:25-26": [
    "🚫 Neither Curse Them At All",
    "🚫 Nor Bless Them At All",
    "🗣️ All That The LORD Speaketh",
    "✅ That I Must Do",
  ],
  "Numbers 23:27-30": [
    "🙏 Peradventure It Will Please God",
    "⛰️ The Top Of Peor",
    "🏜️ Looketh Toward Jeshimon",
    "🧱 Build Me Here Seven Altars",
  ],
  "Numbers 24:1-2": [
    "🚫 He Went Not, As At Other Times",
    "🪄 To Seek For Enchantments",
    "🏜️ He Set His Face Toward The Wilderness",
    "👀 Balaam Lifted Up His Eyes",
    "🕊️ The Spirit Of God Came Upon Him",
  ],
  "Numbers 24:3-4": [
    "📜 He Took Up His Parable",
    "👁️ The Man Whose Eyes Are Open",
    "👂 Which Heard The Words Of God",
    "👁️ Which Saw The Vision Of The Almighty",
    "🙇 Falling Into A Trance",
  ],
  "Numbers 24:5-6": [
    "🏕️ How Goodly Are Thy Tents, O Jacob",
    "🏡 Thy Tabernacles, O Israel",
    "🌿 As The Valleys Are They Spread Forth",
    "🌊 As Gardens By The River's Side",
    "🌳 As Cedar Trees Beside The Waters",
  ],
  "Numbers 24:7-9": [
    "💧 He Shall Pour The Water Out Of His Buckets",
    "👑 His King Shall Be Higher Than Agag",
    "💪 He Hath As It Were The Strength Of An Unicorn",
    "🦁 He Couched, He Lay Down As A Lion",
    "🙌 Blessed Is He That Blesseth Thee",
    "🪄 Cursed Is He That Curseth Thee",
  ],
  "Numbers 24:10-11": [
    "🔥 Balak's Anger Was Kindled Against Balaam",
    "👏 He Smote His Hands Together",
    "🪄 I Called Thee To Curse Mine Enemies",
    "🏆 I Thought To Promote Thee Unto Great Honour",
  ],
  "Numbers 24:12-14": [
    "🏠 If Balak Would Give Me His House Full Of Silver And Gold",
    "🚫 I Cannot Go Beyond The Commandment Of The LORD",
    "🏡 I Go Unto My People",
    "🔮 I Will Advertise Thee",
  ],
  "Numbers 24:15-17": [
    "📜 He Took Up His Parable",
    "👂 Which Heard The Words Of God",
    "⏳ I Shall See Him, But Not Now",
    "⭐ There Shall Come A Star Out Of Jacob",
    "👑 A Sceptre Shall Rise Out Of Israel",
  ],
  "Numbers 24:18-19": [
    "🏔️ Edom Shall Be A Possession",
    "🏰 Seir Also Shall Be A Possession",
    "💪 Israel Shall Do Valiantly",
    "👑 Out Of Jacob Shall Come He That Shall Have Dominion",
  ],
  "Numbers 24:21-22": [
    "🪨 Strong Is Thy Dwellingplace",
    "🪺 Thou Puttest Thy Nest In A Rock",
    "🔥 The Kenite Shall Be Wasted",
    "⛓️ Asshur Shall Carry Thee Away Captive",
  ],
  "Numbers 24:23-24": [
    "📜 He Took Up His Parable",
    "❓ Who Shall Live When God Doeth This",
    "🚢 Ships Shall Come From The Coast Of Chittim",
    "💥 Shall Afflict Asshur",
    "🌑 He Also Shall Perish For Ever",
  ],
  "Numbers 25:1-3": [
    "📍 Israel Abode In Shittim",
    "💔 The People Began To Commit Whoredom",
    "🍽️ The People Did Eat",
    "🙇 Bowed Down To Their Gods",
    "🔥 The Anger Of The LORD Was Kindled Against Israel",
  ],
  "Numbers 25:4-5": [
    "📣 The LORD Said Unto Moses",
    "⚖️ Take All The Heads Of The People",
    "☀️ Hang Them Up Before The LORD Against The Sun",
    "🗡️ Slay Ye Every One His Men",
  ],
  "Numbers 25:7-9": [
    "👀 When Phinehas... Saw It",
    "🧍 He Rose Up From Among The Congregation",
    "🗡️ Took A Javelin In His Hand",
    "🛑 The Plague Was Stayed",
    "🔢 Those That Died In The Plague Were Twenty And Four Thousand",
  ],
  "Numbers 25:10-13": [
    "📣 The LORD Spake Unto Moses",
    "🔥 He Was Zealous For My Sake",
    "🕊️ I Give Unto Him My Covenant Of Peace",
    "👑 An Everlasting Priesthood",
    "🛡️ He Made An Atonement For The Children Of Israel",
  ],
  "Numbers 25:14-15": [
    "📛 The Name Of The Israelite That Was Slain",
    "👑 A Prince Of A Chief House Among The Simeonites",
    "📛 The Name Of The Midianitish Woman",
    "👑 Daughter Of Zur",
  ],
  "Numbers 25:16-18": [
    "📣 The LORD Spake Unto Moses",
    "⚔️ Vex The Midianites",
    "🗡️ Smite Them",
    "🧠 They Vex You With Their Wiles",
    "📍 In The Matter Of Peor",
  ],
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getNumbersTenToTwentyFiveMeaning(title: string, section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]) {
  const cleanTitle = stripLeadingEmoji(title);
  const lower = cleanTitle.toLowerCase();

  if (/lord spake|said unto|speak unto|commanded moses|as the lord commanded/.test(lower)) {
    return ["The instruction begins with God's command.", "Israel's movement, worship, judgment, and mercy must be shaped by what the LORD says."];
  }
  if (/trumpet|blow|alarm|journey|cloud|ark|camp|standard|set forward|wilderness/.test(lower)) {
    return ["Israel is being ordered for the wilderness journey.", "The camp does not move by impulse; the LORD gives signals, order, and direction."];
  }
  if (/complain|murmur|wept|lust|flesh|manna|quails|wrath|fire|graves|egypt/.test(lower)) {
    return ["The people are resisting God's provision in the wilderness.", "Their hunger and fear become a test of trust after the LORD has already rescued them."];
  }
  if (/moses|aaron|miriam|seventy|elders|spirit|prophet|servant|meek/.test(lower)) {
    return ["The LORD is showing how leadership works among His people.", "Moses does not carry the burden by personal strength; God appoints, corrects, and defends His servants."];
  }
  if (/spy|search|land|grapes|giants|walled|report|caleb|joshua|milk and honey|evil report/.test(lower)) {
    return ["The promised land is being examined before Israel enters.", "The issue is not whether the land is real, but whether Israel will trust the LORD who promised it."];
  }
  if (/unbelief|rebel|stone|captain|go back|wilderness|forty years|carcases|children/.test(lower)) {
    return ["Israel's unbelief turns fear into rebellion.", "The people want safety without obedience, so the wilderness becomes the place where mistrust is exposed."];
  }
  if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour|atonement|forgiven|ignorance/.test(lower)) {
    return ["The LORD gives Israel worship instructions for life near Him.", "Offerings, firstfruits, and atonement teach that even ordinary provision belongs under God's rule."];
  }
  if (/sabbath|sticks|fringes|garment|remember|commandments|holy/.test(lower)) {
    return ["Israel is being taught to remember God's commands in daily life.", "Holy time, visible reminders, and obedience keep the covenant from becoming only words."];
  }
  if (/korah|dathan|abiram|rebellion|censer|earth opened|rod|budded|plague|priesthood/.test(lower)) {
    return ["The rebellion challenges the order God Himself gave.", "Numbers shows that priesthood and leadership are not prizes people seize for themselves."];
  }
  if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) {
    return ["The priests and Levites are assigned holy responsibility.", "Their service guards the sanctuary and teaches Israel that nearness to God is both gift and danger."];
  }
  if (/red heifer|ashes|water of separation|unclean|dead|cleanse|sprinkle/.test(lower)) {
    return ["The law gives a way to deal with uncleanness from death.", "Israel must not treat death as harmless near the holy presence of the living God."];
  }
  if (/rock|water|meribah|speak ye|smote|believed me not|edom|aaron died/.test(lower)) {
    return ["The wilderness exposes both need and disobedience.", "God provides water, but Moses and Aaron must still honor Him as holy before the people."];
  }
  if (/serpent|fiery|brass|looked|he lived|arum|sihon|og|amorites|smote/.test(lower)) {
    return ["The LORD provides rescue and victory on the road.", "Judgment, mercy, and battle all show that Israel's life depends on God's command."];
  }
  if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) {
    return ["A foreign king tries to control Israel's future.", "The LORD turns attempted curses into blessing because His promise is stronger than hired words."];
  }
  if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) {
    return ["Israel's idolatry brings covenant danger into the camp.", "False worship and sexual sin are treated as rebellion against the LORD who dwells among them."];
  }
  if (/children of israel|congregation|people/.test(lower)) {
    return ["The covenant people are being addressed as one gathered community.", "Numbers is not only about individual choices; the whole camp must learn to trust and obey the LORD together."];
  }

  return ["The verse is naming a concrete part of Israel's life with God.", `In ${section.reference}, the people are learning that travel, worship, leadership, and daily obedience all happen near the LORD's presence.`];
}

function getNumbersTenToTwentyFiveBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/trumpet|journey|camp|cloud|ark|wilderness/.test(lower)) return ["🏕️ Israel moves as an ordered camp", "☁️ The LORD guides the journey", "📜 Obedience shapes each step"];
  if (/complain|murmur|lust|manna|quails|egypt|wrath/.test(lower)) return ["💔 Complaint exposes mistrust", "🍞 God's provision is being rejected", "🔥 Rebellion brings consequence"];
  if (/spy|land|grapes|caleb|joshua|report|giants/.test(lower)) return ["🍇 The land is truly fruitful", "😨 Fear challenges faith", "🙌 Trust must answer God's promise"];
  if (/korah|rebellion|censer|rod|budded|priesthood/.test(lower)) return ["⚠️ Holy roles cannot be seized", "👑 God confirms His appointed servants", "⛺ The sanctuary must be guarded"];
  if (/offering|sacrifice|atonement|firstfruits|dough/.test(lower)) return ["🔥 Worship follows God's command", "🙏 Atonement is provided by mercy", "🌾 Provision is offered back to God"];
  if (/serpent|water|rock|unclean|ashes|dead|cleanse/.test(lower)) return ["💧 God provides a way through need", "🧼 Uncleanness must be dealt with", "🙌 Mercy comes through God's command"];
  if (/balaam|balak|curse|bless|star|sceptre/.test(lower)) return ["👑 God rules over foreign kings", "🗣️ Curses cannot overturn His promise", "✨ Blessing comes from the LORD"];
  if (/baal|peor|phinehas|plague|whoredom/.test(lower)) return ["💔 Idolatry breaks covenant loyalty", "🔥 Sin brings judgment into the camp", "🛡️ Zeal protects God's holy people"];

  if (/children of israel|congregation|people/.test(lower)) return ["👥 Israel is treated as one people", "⛺ The whole camp stands before God", "🙌 Covenant life requires shared obedience"];

  return ["⛺ Israel lives as God's camp", "📍 The wilderness becomes a place of testing", "🙌 Daily life must answer the LORD"];
}

function getNumbers10To25DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getNumbers10To25Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/trumpet|journey|cloud|ark|camp|standard|set forward|wilderness|hobab/.test(lower)) return ["\u{1F3D5}\u{FE0F} Israel moves as an ordered camp", "\u{2601}\u{FE0F} The LORD guides the journey", "\u{1F4DC} Obedience shapes each step", "\u{1F9ED} The road is directed, not random"];
  if (/complain|murmur|wept|lust|flesh|manna|quails|wrath|fire|graves|egypt/.test(lower)) return ["\u{1F494} Complaint exposes mistrust", "\u{1F35E} God's provision is being rejected", "\u{1F525} Rebellion brings consequence", "\u{1F9E0} Memory of Egypt is distorted"];
  if (/moses|aaron|miriam|seventy|elders|spirit|prophet|servant|meek/.test(lower)) return ["\u{1F9D4} Leadership belongs under God", "\u{1F64C} The LORD appoints and defends", "\u{1F465} Burdens are shared", "\u{26A0}\u{FE0F} Speaking against God's servant is serious"];
  if (/spy|search|land|grapes|giants|walled|report|caleb|joshua|milk and honey/.test(lower)) return ["\u{1F347} The land is truly fruitful", "\u{1F628} Fear challenges faith", "\u{1F64C} Trust must answer God's promise", "\u{1F5FA}\u{FE0F} The land is real, not vague"];
  if (/rebel|stone|captain|go back|forty years|carcases|children|presumed/.test(lower)) return ["\u{1F6D1} Unbelief becomes rebellion", "\u{1F3DC}\u{FE0F} The wilderness exposes mistrust", "\u{26A0}\u{FE0F} Refusing God's promise has cost", "\u{1F64F} Mercy does not erase consequences"];
  if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour|atonement|forgiven|ignorance/.test(lower)) return ["\u{1F525} Worship follows God's command", "\u{1F64F} Atonement is provided by mercy", "\u{1F33E} Provision is offered back to God", "\u{1F4DC} The land will still be lived before the LORD"];
  if (/sabbath|sticks|fringes|garment|remember|commandments|holy|presumptuously/.test(lower)) return ["\u{1F4DC} Commands must be remembered", "\u{1F9F5} Visible reminders train obedience", "\u{1F6D1} Holy time is guarded", "\u{1F54A}\u{FE0F} Israel is set apart"];
  if (/korah|dathan|abiram|rebellion|censer|earth opened|rod|budded|plague|priesthood/.test(lower)) return ["\u{26A0}\u{FE0F} Holy roles cannot be seized", "\u{1F451} God confirms His appointed servants", "\u{26FA} The sanctuary must be guarded", "\u{1F525} Rebellion near holy things is dangerous"];
  if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) return ["\u{26FA} Holy service is assigned", "\u{1F381} Support comes through the offerings", "\u{1F6E1}\u{FE0F} The sanctuary is guarded", "\u{1F64C} Nearness to God is gift and danger"];
  if (/red heifer|ashes|water of separation|unclean|dead|cleanse|sprinkle/.test(lower)) return ["\u{1F9FC} Uncleanness from death is handled", "\u{1F4A7} Cleansing comes by God's command", "\u{1F525} The heifer is part of purification", "\u{1F3D5}\u{FE0F} The camp stays near the living God"];
  if (/rock|water|meribah|speak|smote|believed me not|edom|aaron died/.test(lower)) return ["\u{1F4A7} God provides in the wilderness", "\u{1FAA8} The rock scene tests obedience", "\u{26A0}\u{FE0F} Leaders must honor God as holy", "\u{1F3DC}\u{FE0F} The journey includes grief and consequence"];
  if (/serpent|fiery|brass|looked|he lived|arum|sihon|og|amorites|smote/.test(lower)) return ["\u{1F40D} Judgment exposes rebellion", "\u{1FA79} Mercy comes through God's provided sign", "\u{2694}\u{FE0F} The LORD gives victory", "\u{1F64C} Life depends on trusting His word"];
  if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) return ["\u{1F451} God rules over foreign kings", "\u{1F5E3}\u{FE0F} Curses cannot overturn His promise", "\u{2728} Blessing comes from the LORD", "\u{1F981} A royal hope is spoken"];
  if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) return ["\u{1F494} Idolatry breaks covenant loyalty", "\u{1F525} Sin brings judgment into the camp", "\u{1F6E1}\u{FE0F} Zeal protects God's holy people", "\u{26A0}\u{FE0F} False worship is not harmless"];
  return ["\u{26FA} Israel lives as God's camp", "\u{1F4CD} The wilderness becomes a place of testing", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Daily life must answer the LORD"];
}

function getDay41SectionContext(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]) {
  const contextByReference: Record<string, string> = {
    "Numbers 10:1-6": "the silver trumpets",
    "Numbers 10:7-10": "trumpets for gathering, war, feasts, and offerings",
    "Numbers 10:11-13": "Israel leaving Sinai",
    "Numbers 10:14-19": "Judah leading the march",
    "Numbers 10:20-25": "the middle and rear camp order",
    "Numbers 10:26-28": "the summary of Israel's journey order",
    "Numbers 10:29-32": "Moses inviting Hobab",
    "Numbers 10:33-36": "the ark going before Israel",
    "Numbers 11:1-3": "the first complaint and fire at Taberah",
    "Numbers 11:4-6": "Israel craving Egypt's food",
    "Numbers 11:7-9": "the manna God provided",
    "Numbers 11:10-15": "Moses feeling the burden of the people",
    "Numbers 11:16-17": "the seventy elders sharing the burden",
    "Numbers 11:18-20": "God answering the craving for flesh",
    "Numbers 11:21-23": "Moses questioning how God will provide",
    "Numbers 11:24-29": "the Spirit resting on the elders",
    "Numbers 11:30-30": "Moses and the elders returning to camp",
    "Numbers 11:31-32": "the quails sent by the LORD",
    "Numbers 11:33-35": "judgment at Kibrothhattaavah",
    "Numbers 12:1-2": "Miriam and Aaron speaking against Moses",
    "Numbers 12:4-5": "the LORD summoning Moses, Aaron, and Miriam",
    "Numbers 12:6-8": "the LORD defending Moses' unique role",
    "Numbers 12:9-10": "Miriam struck with leprosy",
    "Numbers 12:10-12": "Aaron pleading for Miriam",
    "Numbers 12:14-16": "Miriam shut out and then restored",
    "Numbers 13:1-3": "the spies being sent",
    "Numbers 13:4-9": "the first named spies",
    "Numbers 13:10-15": "the remaining named spies",
    "Numbers 13:16-16": "Moses naming Joshua",
    "Numbers 13:17-20": "Moses' instructions to the spies",
    "Numbers 13:21-24": "the spies searching the land",
    "Numbers 13:25-27": "the spies returning with fruit",
    "Numbers 13:28-29": "the fearful report about the land",
    "Numbers 13:31-33": "the evil report of unbelief",
  };

  return contextByReference[section.reference] || stripLeadingEmoji(section.title).toLowerCase();
}

function getDay41NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/trumpet|silver|whole piece|blow|alarm|assembly|journeying|war|gladness|burnt offerings|remembered/.test(lower)) return ["🎺 Trumpets signal the camp", "👥 Israel gathers by command", "🚶 The journey has order", "🙏 Worship and danger both come before God"];
  if (/cloud|ark|covenant|set forward|journey|journeyings|wilderness|standard|camp|sanctuary|tabernacle|armies|judah|reuben|ephraim|dan|gershon|merari|kohath|second year|children of israel/.test(lower)) return ["☁️ The LORD guides the journey", "🏕️ Israel moves as an ordered camp", "📦 Holy things travel carefully", "✅ The road follows God's command"];
  if (/hobab|come thou|i will not go|leave us not|eyes|good|same will we do/.test(lower)) return ["🤝 Moses welcomes help", "🏜️ The wilderness is difficult", "👀 Practical wisdom matters", "☁️ The LORD still leads"];
  if (/rise up|return o lord|enemies be scattered/.test(lower)) return ["📦 The ark goes before them", "🙌 Moses prays as they move", "⚔️ The LORD defends the camp", "🏕️ Israel rests with His presence"];
  if (/complained|taberah|fire|anger|wrath|heard|prayed|wept again|smote|kibrothhattaavah|buried/.test(lower)) return ["💬 Complaint exposes mistrust", "🔥 Rebellion brings judgment", "🙏 Moses intercedes", "📛 The place remembers the warning"];
  if (/mixt multitude|lusting|flesh|fish|egypt|manna|melons|leeks|onions|garlick|quails|nostrils|despised|whole month|sanctify yourselves|wind from the lord|two cubits|all that night/.test(lower)) return ["🍽️ Craving distorts memory", "🍞 God's provision is despised", "🏺 Egypt is remembered falsely", "⚠️ Desire becomes rebellion"];
  if (/manna|coriander|bdellium|colour|gathered|ground|baked|fell/.test(lower)) return ["🍞 Manna is God's daily provision", "🧺 The people gather it", "🍳 Provision becomes food", "☁️ Mercy arrives in the wilderness"];
  if (/moses|seventy|elders|spirit|burden|conceived|bear|hand waxed short|prophets|prophesied|come down|six hundred thousand|flocks|herds|see now/.test(lower)) return ["🧔 Moses carries leadership pressure", "👥 God shares the burden", "🕊️ The Spirit equips servants", "💪 The LORD is not limited"];
  if (/miriam|aaron|ethiopian|mouth to mouth|dream|similitude|leprous|snow|heal|shut out|come out ye three|door of the tabernacle|hear now|not afraid|beseech|lay not|one dead/.test(lower)) return ["🗣️ Speech against God's servant is serious", "☁️ The LORD defends Moses", "🤍 Judgment exposes sin", "🙏 Mercy seeks restoration"];
  if (/spy|search|land|canaan|tribe|caleb|oshea|jehoshua|southward|cities|fruit|eshcol|milk and honey|anak|walled|strong|evil report|grasshoppers|ruler|these.*names|hebron|forty days|brought back word|congregation|amalekites|not able|great stature|their sight/.test(lower)) return ["🕵️ The land is examined", "🍇 The fruit confirms promise", "😨 Fear challenges faith", "🗺️ The promise is real"];
  if (/lord spake|commandment|commanded moses|send thou|return.*lord/.test(lower)) return ["📣 God gives the word", "🧭 Moses leads under command", "✅ Israel must obey", "🙌 The LORD remains central"];

  return ["🏕️ Israel lives as God's camp", "📍 The wilderness tests trust", "🧭 The LORD gives direction", "✅ The people must respond"];
}

function explainDay41NumbersAt95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const context = getDay41SectionContext(section);
  let opening: string[];

  if (/lord spake|commandment|commanded moses/.test(lower)) opening = [`God gives the command for ${context}.`, "Israel's journey must follow the LORD's word, not impulse."];
  else if (/make thee two trumpets/.test(lower)) opening = ["The two silver trumpets are made to direct Israel's camp.", "They give clear signals for gathering, movement, worship, and danger."];
  else if (/whole piece/.test(lower)) opening = ["Of a whole piece means each trumpet is hammered from one piece of silver.", "The instruments for calling God's people are carefully made."];
  else if (/calling of the assembly/.test(lower)) opening = ["Calling the assembly means gathering the people together.", "The trumpet sound keeps Israel from moving or meeting in confusion."];
  else if (/journeying of the camps/.test(lower)) opening = ["Journeying of the camps means the tribes move by trumpet signal.", "The wilderness march is organized, not random."];
  else if (/blow an alarm/.test(lower)) opening = ["Blowing an alarm gives a sharp signal for movement or danger.", "Israel learns to respond together when the sound is heard."];
  else if (/war in your land/.test(lower)) opening = ["The trumpet is also used when Israel faces war in the land.", "Battle is brought before the LORD instead of treated as merely human strength."];
  else if (/remembered before the lord/.test(lower)) opening = ["Being remembered before the LORD means God hears and acts for His people.", "The trumpet cry turns danger into prayerful dependence."];
  else if (/day of your gladness/.test(lower)) opening = ["The day of gladness means joyful feast days and celebrations.", "Trumpets are used in worship as well as in danger."];
  else if (/burnt offerings/.test(lower)) opening = ["Burnt offerings are sacrifices given wholly to the LORD.", "The trumpet sound marks worship as something done before God."];
  else if (/second year/.test(lower)) opening = ["The second year marks the time after Sinai when Israel begins moving again.", "The camp is leaving the mountain where it received God's law."];
  else if (/cloud was taken up/.test(lower)) opening = ["The cloud lifting means the LORD is signaling Israel to move.", "The people do not choose the timing of the journey."];
  else if (/took their journeys/.test(lower)) opening = ["Israel taking their journeys means the camp begins its ordered march.", "The rescued people are now moving toward the promised land."];
  else if (/wilderness of sinai/.test(lower)) opening = ["Leaving the wilderness of Sinai means moving away from the mountain of instruction.", "Israel must now walk out what the LORD has commanded."];
  else if (/standard of the camp of reuben/.test(lower)) opening = ["Reuben's standard marks the south-side camp group.", "That camp moves after Judah in the ordered march."];
  else if (/standard of the camp of ephraim/.test(lower)) opening = ["Ephraim's standard marks the west-side camp group.", "That camp moves after the sanctuary-bearing Levites."];
  else if (/standard of the camp of dan/.test(lower)) opening = ["Dan's standard marks the rear camp group.", "That camp closes the march and guards the back of Israel."];
  else if (/standard of the camp/.test(lower)) opening = [`The standard marks the camp group in ${context}.`, "Each tribe has a visible place in the march."];
  else if (/first took their journey/.test(lower)) opening = ["Judah's camp moves first.", "The order given earlier now becomes action."];
  else if (/tabernacle was taken down/.test(lower)) opening = ["The tabernacle is taken down so it can travel with the camp.", "God's dwelling stays central even when Israel moves."];
  else if (/gershon.*merari/.test(lower)) opening = ["Gershon and Merari move with the tabernacle parts they carry.", "Their work prepares the holy tent to be set up again."];
  else if (/kohathites set forward/.test(lower)) opening = ["The Kohathites move with the most holy things after the tabernacle parts go ahead.", "Their timing protects the order of setting up God's dwelling."];
  else if (/bearing the sanctuary/.test(lower)) opening = ["Bearing the sanctuary means carrying the covered holy objects.", "Holy things travel by assigned service, not casual handling."];
  else if (/journeyings/.test(lower)) opening = ["Journeyings summarizes the ordered movements of Israel's camps.", "Numbers wants the reader to see structure in the wilderness march."];
  else if (/according to their armies/.test(lower)) opening = ["According to their armies means the tribes move in organized divisions.", "Israel travels like a prepared people, not a scattered crowd."];
  else if (/come thou with us/.test(lower)) opening = ["Moses invites Hobab to travel with Israel.", "He values help from someone who knows the wilderness road."];
  else if (/we will do thee good/.test(lower)) opening = ["Moses promises Hobab that Israel will share the good the LORD gives.", "Joining the journey means sharing in God's kindness to His people."];
  else if (/i will not go/.test(lower)) opening = ["Hobab first refuses the invitation.", "The wilderness journey asks him to leave familiar people and land."];
  else if (/instead of eyes/.test(lower)) opening = ["Being instead of eyes means helping the camp know the wilderness terrain.", "Practical wisdom can serve God's people while the LORD remains their true guide."];
  else if (/ark of the covenant/.test(lower)) opening = ["The ark going before Israel shows the LORD's covenant presence leading the way.", "The journey is guided by God, not only by human planning."];
  else if (/cloud of the lord/.test(lower)) opening = ["The cloud over them shows the LORD's visible presence.", "Israel travels under God's covering."];
  else if (/rise up/.test(lower)) opening = ["Rise up, LORD is Moses' prayer when the ark sets forward.", "He asks God to lead and defend the camp."];
  else if (/enemies be scattered/.test(lower)) opening = ["Scattered enemies means opposition driven away before the LORD.", "Moses knows Israel's safety depends on God's presence."];
  else if (/return, o lord/.test(lower)) opening = ["Return, O LORD is the prayer when the ark rests.", "Israel needs God's presence in stopping as much as in moving."];
  else if (/people complained/.test(lower)) opening = ["The people complaining means they grumble against the LORD's care.", "The journey quickly exposes mistrust."];
  else if (/lord heard/.test(lower)) opening = ["The LORD hearing means the complaint reaches God Himself.", "Grumbling in the camp is not hidden from His presence."];
  else if (/fire of the lord burnt/.test(lower)) opening = ["The fire of the LORD is judgment against rebellion.", "The edge of the camp feels the seriousness of complaint."];
  else if (/moses prayed/.test(lower)) opening = ["Moses prays for the people in the middle of judgment.", "His intercession turns the scene toward mercy."];
  else if (/taberah/.test(lower)) opening = ["Taberah means burning.", "The place name preserves the memory of the fire that judged complaint."];
  else if (/mixt multitude/.test(lower)) opening = ["The mixed multitude begins craving food beyond what God provides.", "Their desire spreads discontent through Israel."];
  else if (/wept again/.test(lower)) opening = ["Israel weeps again because craving has taken over trust.", "Their tears are not repentance; they are complaint."];
  else if (/flesh to eat/.test(lower)) opening = ["Flesh means meat.", "The people demand meat as if God's manna is not enough."];
  else if (/remember the fish/.test(lower)) opening = ["Remembering Egypt's fish shows selective memory.", "They recall food while ignoring slavery."];
  else if (/nothing at all.*manna/.test(lower)) opening = ["Nothing but manna means they despise the food God gives daily.", "The complaint turns mercy into boredom."];
  else if (/manna.*coriander/.test(lower)) opening = ["Manna is described as small seed-like food.", "Numbers slows down to show what God's provision was like."];
  else if (/bdellium/.test(lower)) opening = ["Bdellium describes the manna's appearance.", "The description pictures the wilderness food God provided."];
  else if (/gathered it/.test(lower)) opening = ["The people gathered manna each day.", "God's provision still required daily receiving."];
  else if (/baked it/.test(lower)) opening = ["The people prepared manna into food.", "God's gift became their daily meals in the wilderness."];
  else if (/manna fell/.test(lower)) opening = ["The manna fell with the dew.", "Provision arrived quietly and regularly from God."];
  else if (/moses heard/.test(lower)) opening = ["Moses hears the people weeping family by family.", "The complaint is widespread, not isolated."];
  else if (/anger of the lord/.test(lower)) opening = ["The LORD's anger is kindled because the people reject His care.", "Their craving has become rebellion."];
  else if (/moses also was displeased/.test(lower)) opening = ["Moses is crushed and displeased by the people's burden.", "Leadership pressure becomes painfully personal."];
  else if (/conceived all this people/.test(lower)) opening = ["Moses asks if he gave birth to the people.", "He is saying the burden feels impossible for one man."];
  else if (/not able to bear/.test(lower)) opening = ["Moses cannot bear the people alone.", "The LORD will answer by sharing the burden with elders."];
  else if (/seventy men/.test(lower)) opening = ["The seventy men are chosen elders of Israel.", "God provides shared leadership for the burden Moses cannot carry alone."];
  else if (/knowest to be the elders/.test(lower)) opening = ["The elders are recognized leaders already known among the people.", "God's help uses real leaders from the community."];
  else if (/come down and talk/.test(lower)) opening = ["The LORD will come down and speak with Moses.", "The solution begins with God's presence, not management technique."];
  else if (/spirit which is upon thee/.test(lower)) opening = ["God takes of the Spirit upon Moses and places it on the elders.", "The shared burden requires divine enabling."];
  else if (/bear the burden/.test(lower)) opening = ["The elders will bear the burden with Moses.", "Leadership becomes shared so Moses is not crushed alone."];
  else if (/sanctify yourselves/.test(lower)) opening = ["Sanctify yourselves means prepare for what the LORD is about to do.", "The people will receive meat, but as judgment on their craving."];
  else if (/eat flesh/.test(lower)) opening = ["The LORD says they will eat meat.", "The answer exposes their demand rather than honoring it as faith."];
  else if (/whole month/.test(lower)) opening = ["A whole month means the meat will become overwhelming.", "The gift they demanded will turn bitter."];
  else if (/nostrils/.test(lower)) opening = ["Coming out at the nostrils is a vivid picture of disgust.", "The craving becomes sickening because it rejected the LORD."];
  else if (/despised the lord/.test(lower)) opening = ["Despising the LORD means their complaint is really against God Himself.", "Rejecting His provision is rejecting His care."];
  else if (/six hundred thousand/.test(lower)) opening = ["Moses points to the huge number of people.", "He cannot imagine how meat could be provided for such a crowd."];
  else if (/flocks and the herds/.test(lower)) opening = ["Moses asks whether all the flocks and herds would be enough.", "His question shows the problem looks impossible from the human side."];
  else if (/fish of the sea/.test(lower)) opening = ["Moses imagines gathering all the fish of the sea.", "He is measuring God's promise by visible resources."];
  else if (/hand waxed short/.test(lower)) opening = ["The LORD's hand waxed short means His power would be too weak.", "God challenges Moses to stop thinking His ability is limited."];
  else if (/thou shalt see now/.test(lower)) opening = ["God tells Moses he will see whether the LORD's word comes true.", "The coming event will answer Moses' doubt."];
  else if (/words of the lord/.test(lower)) opening = ["Moses tells the people what the LORD said.", "The command moves from God's speech into the camp."];
  else if (/gathered the seventy/.test(lower)) opening = ["Moses gathers the seventy elders around the tabernacle.", "Shared leadership begins in God's presence."];
  else if (/spirit rested/.test(lower)) opening = ["The Spirit resting on them means God equips the elders for service.", "They do not share Moses' burden by natural strength alone."];
  else if (/prophesied/.test(lower)) opening = ["They prophesy as a sign that the Spirit has come upon them.", "The moment confirms God's appointment publicly."];
  else if (/all the lord's people were prophets/.test(lower)) opening = ["Moses wishes all the LORD's people had the Spirit.", "He is not jealous of God's gifts being shared."];
  else if (/wind from the lord/.test(lower)) opening = ["The wind from the LORD brings the quails.", "God provides what He said, but in a way that exposes the craving."];
  else if (/quails/.test(lower)) opening = ["Quails are the meat God sends into the camp.", "The abundance answers the demand and sets up the judgment."];
  else if (/two cubits/.test(lower)) opening = ["Two cubits high pictures quails piled thick around the camp.", "The provision is overwhelming, just as God warned."];
  else if (/while the flesh/.test(lower)) opening = ["The flesh is still between their teeth when judgment falls.", "The craving is judged before they can enjoy it."];
  else if (/smote the people/.test(lower)) opening = ["The LORD strikes the people who lusted.", "Their demand for meat ends in judgment, not satisfaction."];
  else if (/kibrothhattaavah/.test(lower)) opening = ["Kibrothhattaavah means graves of craving.", "The name remembers the cost of lusting against the LORD."];
  else if (/buried the people/.test(lower)) opening = ["They bury the people who lusted.", "The place becomes a warning about rejecting God's provision."];
  else if (/miriam and aaron/.test(lower)) opening = ["Miriam and Aaron speak against Moses.", "The challenge comes from inside Moses' own family."];
  else if (/ethiopian woman/.test(lower)) opening = ["The Ethiopian woman is the stated occasion for their criticism.", "The complaint soon reveals a deeper challenge to Moses' role."];
  else if (/spoken only by moses/.test(lower)) opening = ["They question whether Moses is uniquely used by the LORD.", "Their words challenge the authority God gave him."];
  else if (/lord heard it/.test(lower)) opening = ["The LORD hears their private-sounding criticism.", "Speech against His servant is not hidden from Him."];
  else if (/spake suddenly/.test(lower)) opening = ["The LORD speaks suddenly to confront the rebellion.", "God does not let the accusation drift."];
  else if (/come out ye three/.test(lower)) opening = ["God summons Moses, Aaron, and Miriam together.", "The conflict is brought into the LORD's presence."];
  else if (/pillar of the cloud/.test(lower)) opening = ["The LORD comes down in the pillar of cloud.", "His visible presence marks the seriousness of the judgment."];
  else if (/door of the tabernacle/.test(lower)) opening = ["The door of the tabernacle is the place of holy meeting.", "God confronts the speakers at the boundary of His dwelling."];
  else if (/hear now my words/.test(lower)) opening = ["God commands Aaron and Miriam to listen.", "Their speech must now answer to His word."];
  else if (/dream/.test(lower)) opening = ["Dreams are one way God may speak to prophets.", "God contrasts this with how directly He speaks with Moses."];
  else if (/mouth to mouth/.test(lower)) opening = ["Mouth to mouth means direct, clear speech from God to Moses.", "Moses' role is not ordinary prophetic experience."];
  else if (/similitude/.test(lower)) opening = ["Similitude means a form or visible likeness.", "Moses receives a closeness to God's revelation that others do not."];
  else if (/not afraid/.test(lower)) opening = ["God asks why they were not afraid to speak against Moses.", "Their criticism was not small because Moses is the LORD's servant."];
  else if (/anger.*kindled/.test(lower)) opening = ["The LORD's anger is kindled against Aaron and Miriam.", "Their challenge to Moses is treated as sin before God."];
  else if (/cloud departed/.test(lower)) opening = ["The cloud departs after the LORD speaks.", "The visible sign leaves Miriam exposed in judgment."];
  else if (/miriam became leprous|white as snow/.test(lower)) opening = ["Miriam becomes leprous, white as snow.", "The judgment makes her uncleanness visible to everyone."];
  else if (/aaron looked/.test(lower)) opening = ["Aaron looks and sees Miriam's leprosy.", "The consequence of their speech is now undeniable."];
  else if (/beseech/.test(lower)) opening = ["I beseech thee means Aaron pleads urgently with Moses.", "The one who challenged Moses now needs Moses to intercede."];
  else if (/lay not the sin/.test(lower)) opening = ["Aaron asks that the sin not remain on them.", "He recognizes their speech as foolish and guilty."];
  else if (/as one dead/.test(lower)) opening = ["As one dead compares Miriam's condition to deathlike uncleanness.", "Her judgment cuts her off from normal life in the camp."];
  else if (/cried unto the lord|heal her/.test(lower)) opening = ["Moses cries to the LORD for Miriam's healing.", "The servant who was attacked becomes the intercessor."];
  else if (/shut out.*seven days/.test(lower)) opening = ["Miriam must be shut outside the camp seven days.", "Mercy comes with a real period of shame and cleansing."];
  else if (/people journeyed not/.test(lower)) opening = ["The people do not journey until Miriam is brought back.", "Her sin affects the movement of the whole camp."];
  else if (/paran/.test(lower)) opening = ["Paran is the wilderness region where Israel camps next.", "The journey resumes after Miriam's restoration."];
  else if (/send thou men/.test(lower)) opening = ["God tells Moses to send men to search the land.", "The spies will inspect what God has promised to give."];
  else if (/search the land/.test(lower)) opening = ["Searching the land means examining Canaan before entry.", "The mission should strengthen trust, not replace it."];
  else if (/ruler among them/.test(lower)) opening = ["Each spy is a ruler from his tribe.", "The report will come from recognized leaders, not random travelers."];
  else if (/these were their names/.test(lower)) opening = ["The names of the spies are recorded tribe by tribe.", "Numbers makes the mission public and accountable."];
  else if (/tribe of reuben/.test(lower)) opening = ["Reuben sends a named representative into Canaan.", "The firstborn tribe is included in the search."];
  else if (/tribe of judah/.test(lower)) opening = ["Judah sends Caleb as its representative.", "Caleb will become the faithful contrast to the fearful report."];
  else if (/tribe of ephraim/.test(lower)) opening = ["Ephraim sends Oshea, later called Joshua.", "His presence quietly prepares the reader for faithful leadership."];
  else if (/tribe of benjamin/.test(lower)) opening = ["Benjamin sends its representative into Canaan.", "The smaller tribe is still included in the national mission."];
  else if (/tribe of dan/.test(lower)) opening = ["Dan sends its representative into the land.", "Every camp division has a voice in the search."];
  else if (/tribe of asher/.test(lower)) opening = ["Asher sends its representative as part of the twelve.", "The mission covers the whole covenant people through tribal leaders."];
  else if (/tribe of naphtali/.test(lower)) opening = ["Naphtali sends its representative into Canaan.", "The northern tribe is not left out of the search."];
  else if (/tribe of gad/.test(lower)) opening = ["Gad sends its representative into the land.", "The search is shared across Israel's tribes."];
  else if (/tribe of/.test(lower)) opening = ["Each tribe sends a representative into Canaan.", "The whole nation is represented in the search."];
  else if (/caleb/.test(lower)) opening = ["Caleb is named as Judah's representative.", "He will become a voice of faith when others fear."];
  else if (/oshea|jehoshua/.test(lower)) opening = ["Oshea is renamed Jehoshua, the name later rendered Joshua.", "The name change marks him as a key servant in the promise story."];
  else if (/get you up/.test(lower)) opening = ["Moses tells the spies the route into the land.", "The mission has a clear direction and purpose."];
  else if (/see the land/.test(lower)) opening = ["Seeing the land means observing its condition directly.", "They are to bring back evidence, not rumors."];
  else if (/strong or weak/.test(lower)) opening = ["Strong or weak asks about the people living in the land.", "Moses wants the spies to describe the challenge honestly."];
  else if (/what cities/.test(lower)) opening = ["The spies must inspect the cities.", "The report will include whether the land is open or fortified."];
  else if (/fruit of the land/.test(lower)) opening = ["Fruit of the land will show Canaan's richness.", "The evidence should confirm God's promise of a good land."];
  else if (/searched the land/.test(lower)) opening = ["The spies search the land from south to north.", "They see the promise with their own eyes."];
  else if (/zin.*rehob/.test(lower)) opening = ["From Zin to Rehob describes the wide range of their search.", "The mission covers a large stretch of Canaan."];
  else if (/hebron/.test(lower)) opening = ["Hebron is one of the places the spies reach.", "There they also see descendants of Anak."];
  else if (/anak/.test(lower)) opening = ["The children of Anak are large, frightening people in the land.", "Their presence becomes part of the fear-filled report."];
  else if (/eshcol/.test(lower)) opening = ["Eshcol is the brook where the spies cut the large cluster of grapes.", "The place becomes tied to the land's fruitfulness."];
  else if (/forty days/.test(lower)) opening = ["The spies return after forty days of searching.", "Their report comes after a full inspection of the land."];
  else if (/brought back word/.test(lower)) opening = ["They bring back word to Moses, Aaron, and the congregation.", "The whole camp hears how the leaders interpret the land."];
  else if (/milk and honey/.test(lower)) opening = ["Milk and honey means the land is rich and fruitful.", "The spies confirm that God's description of the land is true."];
  else if (/this is the fruit/.test(lower)) opening = ["The fruit is physical proof of the land's abundance.", "The evidence should have encouraged trust in God's promise."];
  else if (/people be strong/.test(lower)) opening = ["Nevertheless turns from fruitfulness to fear.", "The spies focus on the strength of the people more than the promise of God."];
  else if (/cities are walled/.test(lower)) opening = ["Walled cities mean fortified places that look hard to conquer.", "The report names real obstacles but lets them dominate the story."];
  else if (/amalekites/.test(lower)) opening = ["The Amalekites in the south are one of the threats in the land.", "The spies map the danger around Canaan."];
  else if (/canaanites.*sea/.test(lower)) opening = ["The Canaanites by the sea and Jordan show enemies spread across the land.", "The report piles up threats for the congregation."];
  else if (/not able/.test(lower)) opening = ["We be not able means the spies deny Israel can take the land.", "Their conclusion rejects the LORD's promise."];
  else if (/evil report/.test(lower)) opening = ["An evil report is a faithless interpretation of the land.", "The problem is not only what they saw, but how they spoke about it."];
  else if (/great stature/.test(lower)) opening = ["Men of great stature describes the intimidating size of the people.", "Fear grows as the spies focus on human strength."];
  else if (/grasshoppers/.test(lower)) opening = ["Seeing themselves as grasshoppers means the spies feel tiny and powerless.", "Their self-image is shaped by fear, not by the LORD's promise."];
  else if (/in their sight/.test(lower)) opening = ["So we were in their sight assumes the enemy saw them the same fearful way.", "The spies project their fear onto the people of the land."];
  else opening = [`${cleanTitle} belongs to ${context}.`, "It teaches how Israel journeys, complains, follows leaders, or faces the promised land."];

  return note([
    opening[0],
    opening[1],
    ...getDay41NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function getDay42SectionContext(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]) {
  const contextByReference: Record<string, string> = {
    "Numbers 14:1-4": "Israel wanting Egypt again",
    "Numbers 14:5-10": "Joshua and Caleb answering the panic",
    "Numbers 14:11-12": "the LORD confronting unbelief",
    "Numbers 14:13-18": "Moses pleading for mercy",
    "Numbers 14:19-19": "Moses asking pardon for the camp",
    "Numbers 14:20-25": "mercy joined to wilderness judgment",
    "Numbers 14:26-31": "the sentence on the unbelieving generation",
    "Numbers 14:32-35": "the forty-year wandering",
    "Numbers 14:36-38": "the false spies being judged",
    "Numbers 14:39-44": "Israel trying to fight after refusing faith",
    "Numbers 14:45-45": "defeat at Hormah",
    "Numbers 15:1-3": "offerings promised for life in the land",
    "Numbers 15:4-9": "grain, oil, and wine with sacrifice",
    "Numbers 15:10-12": "larger offerings brought in order",
    "Numbers 15:13-16": "one law for Israel and the stranger",
    "Numbers 15:17-21": "the first dough offered to the LORD",
    "Numbers 15:22-26": "atonement for the congregation's unintentional sin",
    "Numbers 15:27-29": "atonement for one person's unintentional sin",
    "Numbers 15:30-31": "defiant sin against the LORD's word",
    "Numbers 15:32-36": "the Sabbath breaker being judged",
    "Numbers 15:37-41": "fringes that remind Israel to obey",
    "Numbers 16:1-3": "Korah's public challenge",
    "Numbers 16:4-7": "the censer test",
    "Numbers 16:8-11": "Levites reaching for priesthood",
    "Numbers 16:12-14": "Dathan and Abiram refusing Moses",
    "Numbers 16:15-19": "the rebels gathering at the tabernacle",
    "Numbers 16:20-22": "Moses and Aaron interceding again",
    "Numbers 16:23-27": "the camp separating from the rebels",
    "Numbers 16:28-33": "the earth swallowing the rebellion",
    "Numbers 16:34-34": "Israel fleeing the judgment",
    "Numbers 16:35-40": "the censers becoming a warning",
    "Numbers 16:41-45": "the congregation blaming Moses and Aaron",
    "Numbers 16:46-50": "Aaron standing between death and life",
    "Numbers 17:1-5": "the rod test for God's chosen priest",
    "Numbers 17:6-7": "the rods placed before the LORD",
    "Numbers 17:8-9": "Aaron's dead rod bearing life",
    "Numbers 17:10-11": "Aaron's rod kept as a warning",
    "Numbers 17:12-13": "the people fearing death near the tabernacle",
  };

  return contextByReference[section.reference] || stripLeadingEmoji(section.title).toLowerCase();
}

function getDay42NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/congregation|murmur|captain|egypt|provoke|believe|evil congregation|carcases|twenty years|forty|mourned|transgress|not among you|hormah|discomfited|gat them up|ark of the covenant|smote|came down|dwelt in that hill|breach|wilderness|children shall wander/.test(lower)) return ["💬 Unbelief turns into rebellion", "🏜️ The wilderness exposes mistrust", "⚠️ Refusing God's promise has a cost", "🙏 Mercy does not erase consequences"];
  if (/caleb|joshua|land|milk|honey|search|sent to search|good land|with us|fear them not|little ones|rent their clothes|bade stone|tempted me/.test(lower)) return ["🍇 The land is truly good", "🙌 Trust answers fear", "🗺️ God's promise is concrete", "🛡️ The LORD's presence matters most"];
  if (/moses said|pardon|mercy|longsuffering|egyptians|cloud|glory|word|iniquity|intercedes|lord said|pestilence|greater nation|spake unto moses/.test(lower)) return ["🙏 Moses intercedes", "📛 God's name is at stake", "🕊️ Mercy is requested", "⚖️ Justice still matters"];
  if (/offering|fire|meat offering|drink offering|hin|stranger|one law|one ordinance|bread|dough|heave|sweet savour|bullock|flock|herd|ram|generations|number|born of the country|come into the land/.test(lower)) return ["🔥 Worship follows God's command", "🌾 Provision returns to God", "🌍 One law includes the stranger", "🏡 The land is still promised"];
  if (/ignorance|atonement|forgiven|presumptuously|cut off|despised|sabbath|sticks|ward|fringes|ribband|blue|remember|own heart|erred|not observed|she goat|iniquity shall be upon|reproacheth|stoned him|look upon it/.test(lower)) return ["🙏 Atonement covers unintentional sin", "✊ Defiant sin is serious", "🧵 Visible reminders train obedience", "📜 God's commands must be remembered"];
  if (/korah|dathan|abiram|censers|censer|priesthood|levi|tabernacle|separate|earth|pit|fire|memorial|altar|plague|dead and the living|too much|wicked men|killed the people|fell upon|consume them|glory of the lord|offering|wroth|every man his|two hundred|rose up|to morrow|shew|against the lord|will not come up|put out the eyes|god of the spirits|hereby|fled|judgment brings fear|rebellion is exposed/.test(lower)) return ["⚠️ Holy roles cannot be seized", "👑 God defends His appointed order", "🔥 Rebellion near holy things is dangerous", "🛡️ Atonement protects the camp"];
  if (/rod|aaron|budded|buds|blossoms|almonds|token|murmurings|testimony|witness|perish|consumed|moses did so|behold, we die/.test(lower)) return ["🌱 Life marks God's chosen priest", "👑 Aaron's priesthood is confirmed", "📛 The sign answers rebels", "🛑 Murmuring must stop"];

  return ["📜 The LORD gives the word", "🏜️ The camp is being tested", "⚖️ Rebellion and mercy are both real", "✅ Israel must respond"];
}

function explainDay42NumbersAt95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const context = getDay42SectionContext(section);
  let opening: string[];

  if (/lord spake|lord said|speak unto/.test(lower)) opening = [`God speaks directly into ${context}.`, "The camp's next step must come from the LORD's word, not fear or anger."];
  else if (/lifted up their voice/.test(lower)) opening = ["The whole congregation cries out together.", "Their tears show panic spreading through the camp instead of trust in the promised land."];
  else if (/murmured against moses/.test(lower)) opening = ["Murmured means grumbled with complaint and distrust.", "The people blame Moses and Aaron, but their refusal is really against the LORD's promise."];
  else if (/would god.*died in egypt/.test(lower)) opening = ["Would God means I wish.", "Israel is saying death in Egypt would be better than trusting God to bring them into Canaan."];
  else if (/make a captain/.test(lower)) opening = ["A captain is a new leader.", "The people want leadership that will take them backward, away from Moses and away from the LORD's promise."];
  else if (/return into egypt/.test(lower)) opening = ["Returning to Egypt means going back to slavery.", "Fear makes the rescue look worthless and the old bondage look safe."];
  else if (/moses and aaron fell/.test(lower)) opening = ["Face-down humility shows Moses and Aaron know the camp is in danger.", "They do not answer the panic with pride or performance."];
  else if (/moses fell upon.*face/.test(lower)) opening = ["Face-down, Moses refuses to meet rebellion with self-defense.", "He brings the challenge before the LORD instead."];
  else if (/fell on their faces|fell upon.*face/.test(lower)) opening = ["Face-down intercession begins while judgment threatens the camp.", "Moses and Aaron plead because the rebellion is deadly."];
  else if (/rent their clothes/.test(lower)) opening = ["Tearing garments was a visible sign of grief.", "Joshua and Caleb respond as men who know Israel is rejecting the LORD."];
  else if (/exceeding good land/.test(lower)) opening = ["Exceeding good means very good.", "Joshua and Caleb insist that Canaan is not a trap but the fruitful land God promised."];
  else if (/lord is with us/.test(lower)) opening = ["The LORD being with Israel is the answer to fear.", "The enemies are real, but God's presence makes obedience possible."];
  else if (/fear them not/.test(lower)) opening = ["Do not let the people of Canaan rule your heart.", "Joshua and Caleb call Israel to trust the LORD more than the giants."];
  else if (/stone them/.test(lower)) opening = ["The crowd wants to stone Joshua and Caleb.", "Faithful truth now sounds threatening to people who have chosen fear."];
  else if (/provoke me/.test(lower)) opening = ["Provoke means anger by stubborn rebellion.", "The LORD names Israel's unbelief as repeated resistance to Him."];
  else if (/ere they believe me/.test(lower)) opening = ["Ere means before.", "God is asking how long Israel will refuse to believe Him after seeing His works."];
  else if (/pestilence/.test(lower)) opening = ["Pestilence means deadly disease.", "The LORD warns that rebellion could bring sudden judgment on the camp."];
  else if (/greater nation/.test(lower)) opening = ["God could make a new nation from Moses.", "The warning shows Israel survives by mercy, not because God needs their rebellion."];
  else if (/egyptians shall hear/.test(lower)) opening = ["Moses thinks about what Egypt will hear.", "If Israel is destroyed, the nations may misunderstand the LORD's saving power."];
  else if (/cloud standeth/.test(lower)) opening = ["The cloud standing over Israel is the visible sign of God's presence.", "Moses appeals to the fact that the nations already know the LORD is with this people."];
  else if (/longsuffering/.test(lower)) opening = ["Longsuffering means slow to anger and patient.", "Moses pleads from God's own character, not from Israel's goodness."];
  else if (/moses said unto the lord/.test(lower)) opening = ["Moses answers judgment with intercession.", "He speaks to the LORD for the people who have just rebelled."];
  else if (/pardon/.test(lower) && /iniquity/.test(lower)) opening = ["Pardon means forgive, and iniquity means guilt or sin.", "Moses asks the LORD to forgive the people's rebellion because His mercy is great."];
  else if (/pardon.*beseech/.test(lower)) opening = ["Beseech means plead urgently.", "Moses begs the LORD to forgive instead of destroying the guilty camp."];
  else if (/greatness of thy mercy/.test(lower)) opening = ["The greatness of God's mercy means His compassion is larger than Israel's sin.", "Moses rests his prayer on who God is."];
  else if (/egypt even until now/.test(lower)) opening = ["From Egypt until now covers the whole rescue journey.", "Moses remembers that the LORD has been forgiving this people again and again."];
  else if (/intercedes/.test(lower)) opening = ["Intercession means standing before God on behalf of others.", "Moses asks for mercy when the camp deserves judgment."];
  else if (/pardoned according to thy word/.test(lower)) opening = ["God grants the pardon Moses asked for.", "The people are not wiped out, but mercy will still include serious consequences."];
  else if (/earth shall be filled/.test(lower)) opening = ["The LORD's glory filling the earth means His honor will be known everywhere.", "Israel's rebellion cannot stop God's purpose from becoming visible."];
  else if (/seen my glory/.test(lower)) opening = ["The people have already seen the LORD's glory in rescue and provision.", "Their unbelief is not from lack of evidence."];
  else if (/tempted me.*ten times/.test(lower)) opening = ["Tempted me means tested God's patience by repeated unbelief.", "Ten times pictures a full pattern of rebellion, not one nervous mistake."];
  else if (/my servant caleb/.test(lower)) opening = ["Caleb is called God's servant because he follows the LORD fully.", "His trust separates him from the fearful majority."];
  else if (/get you into the wilderness/.test(lower)) opening = ["The command sends Israel away from the land they refused to trust God for.", "The wilderness becomes the consequence of unbelief."];
  else if (/evil congregation/.test(lower)) opening = ["An evil congregation is a gathered people acting in unbelief.", "God treats the group's grumbling as a serious covenant rebellion."];
  else if (/which murmur against me/.test(lower)) opening = ["The murmuring is against the LORD Himself.", "Complaining about Moses hides a deeper refusal to trust God."];
  else if (/carcases/.test(lower)) opening = ["Carcases means dead bodies.", "The unbelieving adults will die in the wilderness instead of entering the land."];
  else if (/twenty years old/.test(lower)) opening = ["Twenty years old and upward marks the counted adult generation.", "Those old enough to be numbered for the camp bear responsibility for the rebellion."];
  else if (/little ones/.test(lower)) opening = ["The little ones are the children the adults feared would be lost.", "God says those children will enter the land their parents refused."];
  else if (/each day for a year/.test(lower)) opening = ["Each spy-day becomes a year of wilderness wandering.", "Forty days of faithless searching become forty years of consequence."];
  else if (/children shall wander/.test(lower)) opening = ["The children will wander because of their parents' unbelief.", "They survive, but the older generation's sin shapes their road."];
  else if (/forty years/.test(lower)) opening = ["A whole generation will pass before Israel enters the land.", "A journey to the land becomes a generation-long delay."];
  else if (/breach of promise/.test(lower)) opening = ["Breach of promise means the painful result of rejecting God's promise.", "Israel will feel what it means to turn away from the land."];
  else if (/sent to search/.test(lower)) opening = ["The spies were sent to inspect the land.", "Their mission should have strengthened faith, but most used it to spread fear."];
  else if (/made all the congregation to murmur/.test(lower)) opening = ["The false report made the whole camp grumble.", "Bad leadership turned fear into national rebellion."];
  else if (/died by the plague/.test(lower)) opening = ["The plague is God's direct judgment on the faithless spies.", "The men who spread the evil report die before the LORD."];
  else if (/joshua and caleb lived/.test(lower)) opening = ["Joshua and Caleb survive when the other spies die.", "Their lives mark the difference between faith and unbelief."];
  else if (/mourned greatly/.test(lower)) opening = ["The people mourn after hearing the sentence.", "Their grief comes late, after they have already refused the LORD's word."];
  else if (/gat them up/.test(lower)) opening = ["Gat them up means they went up.", "Israel tries to enter the hill country after God has told them not to go."];
  else if (/wherefore.*transgress/.test(lower)) opening = ["Wherefore means why.", "Moses asks why they are breaking the LORD's command again by rushing forward."];
  else if (/lord is not among you/.test(lower)) opening = ["God is not going with this attack.", "Courage without obedience will not protect them."];
  else if (/ark of the covenant departed not/.test(lower)) opening = ["The ark stays in the camp instead of going with the fighters.", "The sign of God's covenant presence does not join their disobedient plan."];
  else if (/amalekites and canaanites smote/.test(lower)) opening = ["Smote means struck or defeated.", "The enemies beat Israel because the people went without the LORD's command."];
  else if (/came down/.test(lower) && /amalekites/.test(lower)) opening = ["The Amalekites come down from the hill country to attack.", "Israel's unauthorized advance ends in exposure and defeat."];
  else if (/canaanites.*hill/.test(lower)) opening = ["The Canaanites in the hill country join the attack.", "The danger Israel feared becomes worse when they disobey."];
  else if (/discomfited/.test(lower)) opening = ["Discomfited means defeated and scattered.", "Israel learns that rushing forward after unbelief is not the same as faith."];
  else if (/hormah/.test(lower)) opening = ["Hormah is the place tied to this defeat.", "The name fixes the shame of trying to fight without the LORD."];
  else if (/come into the land/.test(lower)) opening = ["God still speaks about Israel's future in Canaan.", "Even after judgment, the promised land has not disappeared from His plan."];
  else if (/offering by fire/.test(lower)) opening = ["An offering by fire is a sacrifice burned for the LORD.", "These commands teach Israel how worship will continue in the land."];
  else if (/herd|flock/.test(lower)) opening = ["Herd and flock mean cattle, sheep, and goats.", "The sacrifices come from the animals Israel will depend on in settled life."];
  else if (/sweet savour/.test(lower)) opening = ["A sweet savour is a pleasing aroma from sacrifice.", "The phrase pictures worship accepted before the LORD."];
  else if (/meat offering/.test(lower)) opening = ["Meat offering here means grain offering, not animal meat.", "Flour and oil are brought with the sacrifice as worship from daily provision."];
  else if (/hin of oil/.test(lower)) opening = ["A hin is an ancient liquid measure.", "The oil amount shows that worship is ordered carefully, not guessed."];
  else if (/drink offering/.test(lower)) opening = ["A drink offering is wine poured out to the LORD.", "It accompanies the sacrifice as part of full worship."];
  else if (/preparest a ram/.test(lower)) opening = ["Preparing a ram means bringing a male sheep for sacrifice.", "The added grain, oil, and wine match the size of the offering."];
  else if (/burnt offering/.test(lower)) opening = ["A burnt offering is a sacrifice wholly given to God on the altar.", "It pictures complete dedication before the LORD."];
  else if (/one bullock/.test(lower)) opening = ["A bullock is a young bull.", "A larger animal receives a larger accompanying offering."];
  else if (/according to the number/.test(lower)) opening = ["According to the number means each animal has its proper offering.", "Israel is not to bring worship carelessly or unevenly."];
  else if (/born of the country/.test(lower)) opening = ["Those born in the country are native Israelites.", "They must follow the same worship order God gives the whole people."];
  else if (/stranger sojourn/.test(lower)) opening = ["A stranger sojourning is a foreigner living among Israel.", "The outsider who worships the LORD is not given a separate religion."];
  else if (/one ordinance/.test(lower)) opening = ["Ordinance means a rule or appointed practice.", "Native Israelite and resident stranger stand under the same worship command."];
  else if (/as ye are/.test(lower)) opening = ["As ye are means the stranger is treated by the same worship standard as Israel.", "The LORD does not create a lower obedience for outsiders in the camp."];
  else if (/one law and one manner/.test(lower)) opening = ["The same command and the same practice apply to all who worship the LORD.", "Shared worship is guarded by shared obedience."];
  else if (/bread of the land/.test(lower)) opening = ["Bread of the land means food made from Canaan's harvest.", "When Israel eats from the land, the first portion must honor the LORD."];
  else if (/heave offering/.test(lower)) opening = ["A heave offering is a portion lifted up and given to the LORD.", "It teaches that the harvest belongs first to Him."];
  else if (/first of your dough/.test(lower)) opening = ["The first dough is the beginning of the household's bread supply.", "Before the family eats freely, the LORD receives His portion."];
  else if (/throughout your generations/.test(lower)) opening = ["Future families must keep this practice too.", "Remembering the LORD is not only for the wilderness generation."];
  else if (/have erred/.test(lower)) opening = ["Erred means sinned by mistake or gone wrong unintentionally.", "God provides a way back when the congregation fails without open defiance."];
  else if (/not observed/.test(lower)) opening = ["Not observed means failed to keep God's commands.", "Even unintentional failure still needs atonement before the LORD."];
  else if (/young bullock/.test(lower)) opening = ["The young bull is offered for the congregation's unintentional sin.", "The sacrifice treats accidental disobedience as real guilt needing mercy."];
  else if (/kid of the goats/.test(lower)) opening = ["A kid of the goats is a young goat.", "It is brought as a sin offering to deal with guilt before God."];
  else if (/make an atonement/.test(lower) && section.reference === "Numbers 15:22-26") opening = ["Atonement covers the congregation's guilt before God.", "The priest stands between the guilty people and the LORD's judgment."];
  else if (/make an atonement/.test(lower) && section.reference === "Numbers 15:27-29") opening = ["Atonement also covers one person's unintentional sin.", "The priest brings the required sacrifice so the person can be restored."];
  else if (/make an atonement/.test(lower)) opening = ["Aaron makes atonement while the plague is moving through the camp.", "The priest stands between judgment and the living people."];
  else if (/forgiven them|forgiven him/.test(lower)) opening = ["Forgiven means the guilt is released by God's mercy.", "The sacrifice points to restoration, not pretending sin never mattered."];
  else if (/soul sin through ignorance/.test(lower)) opening = ["A soul means a person, and ignorance means unintentional failure.", "God gives mercy for one person who sins without defiant intent."];
  else if (/she goat/.test(lower)) opening = ["The she goat is the required sacrifice for one person's unintentional sin.", "A real offering is brought because even hidden failure needs cleansing."];
  else if (/one law$/.test(lower)) opening = ["The same mercy and responsibility apply across the community.", "Native Israelite and stranger both answer to the LORD."];
  else if (/presumptuously/.test(lower)) opening = ["Presumptuously means with a high hand, openly defying God.", "This is not a mistake; it is deliberate rebellion against the LORD."];
  else if (/reproacheth/.test(lower)) opening = ["Reproacheth means insults or dishonors.", "Defiant sin treats the LORD Himself with contempt."];
  else if (/cut off/.test(lower)) opening = ["Cut off means removed from the covenant community under judgment.", "High-handed rebellion cannot be treated like an accidental failure."];
  else if (/despised the word/.test(lower)) opening = ["Despised means treated as worthless.", "The sinner has rejected the LORD's command, not merely broken a small rule."];
  else if (/iniquity shall be upon him/.test(lower)) opening = ["The guilty person must bear his own guilt.", "There is no covering for a person who proudly rejects God's word."];
  else if (/gathered sticks/.test(lower)) opening = ["Gathering sticks was work being done on the Sabbath.", "The scene tests whether Israel will honor holy time as God commanded."];
  else if (/sabbath day/.test(lower)) opening = ["The Sabbath day is the weekly day of rest set apart to the LORD.", "Breaking it publicly treats God's rhythm of holy rest as optional."];
  else if (/put him in ward/.test(lower)) opening = ["Ward means custody.", "The people hold the man while they wait for the LORD's judgment."];
  else if (/stoned him/.test(lower)) opening = ["Stoning was the public execution God commanded in this case.", "The punishment shows that despising the Sabbath was covenant rebellion."];
  else if (/make them fringes/.test(lower)) opening = ["Fringes are tassels attached to the edges of garments.", "God gives Israel something visible to remind them of His commands."];
  else if (/ribband of blue/.test(lower)) opening = ["A ribband is a cord or thread, and blue marks the tassel as holy reminder.", "The color turns ordinary clothing into a daily call to obedience."];
  else if (/look upon it/.test(lower)) opening = ["Looking at the fringe is meant to wake up memory.", "The visible tassel helps obedience begin before temptation carries the heart away."];
  else if (/remember all the commandments/.test(lower)) opening = ["Remember means more than recall facts.", "Israel is to see the tassels and return to active obedience."];
  else if (/own heart/.test(lower)) opening = ["Seeking after your own heart means chasing inner desires away from God.", "The tassels warn Israel not to let appetite lead instead of the LORD."];
  else if (/brought you out/.test(lower)) opening = ["God bringing Israel out of Egypt is the reason for obedience.", "The rescued people belong to the LORD who freed them."];
  else if (/korah.*dathan/.test(lower)) opening = ["Korah, Dathan, and Abiram gather men against Moses and Aaron.", "The rebellion is organized, public, and aimed at God's appointed order."];
  else if (/two hundred and fifty/.test(lower)) opening = ["The two hundred fifty princes are respected leaders.", "Their status makes the rebellion more dangerous, not more righteous."];
  else if (/rose up before moses/.test(lower)) opening = ["They rise up before Moses in open confrontation.", "Private discontent has become public revolt."];
  else if (/too much upon you/.test(lower)) opening = ["The rebels accuse Moses and Aaron of grabbing too much authority.", "They sound humble, but they are rejecting the roles God gave."];
  else if (/all the congregation are holy/.test(lower)) opening = ["The claim is partly true but twisted.", "Israel belongs to God, but that does not erase the priesthood God appointed."];
  else if (/to morrow.*shew/.test(lower)) opening = ["To morrow means tomorrow, and shew means show.", "Moses says the LORD Himself will reveal whom He has chosen."];
  else if (/take you censers/.test(lower)) opening = ["Censers are fire pans used for incense before the LORD.", "The test brings the rebels close to holy service they are trying to seize."];
  else if (/put fire therein/.test(lower)) opening = ["Putting fire in the censers prepares them for incense.", "The rebels must stand before the LORD with the holy object they claim a right to use."];
  else if (/sons of levi/.test(lower)) opening = ["The sons of Levi already have special tabernacle service.", "Moses reminds them that their calling is a gift, not a small thing."];
  else if (/small thing/.test(lower)) opening = ["A small thing means something treated as not enough.", "Korah's group despises the honor God already gave the Levites."];
  else if (/service of the tabernacle/.test(lower)) opening = ["Tabernacle service is holy work near God's dwelling.", "The Levites are already brought close, but they want more."];
  else if (/seek ye the priesthood/.test(lower)) opening = ["Seeking the priesthood means reaching for Aaron's priestly office.", "They want a role God has not assigned to them."];
  else if (/against the lord/.test(lower)) opening = ["Gathering against Moses is really gathering against the LORD.", "The argument about leaders is actually rebellion against God's choice."];
  else if (/sent to call dathan/.test(lower)) opening = ["Moses sends for Dathan and Abiram to answer the charge.", "They refuse even to come and face the matter."];
  else if (/will not come up/.test(lower)) opening = ["This is flat refusal.", "Dathan and Abiram reject Moses' summons and harden the rebellion."];
  else if (/floweth with milk and honey/.test(lower)) opening = ["Milk and honey means a rich and fruitful land.", "The rebels mock Moses by using promised-land language for Egypt."];
  else if (/put out the eyes/.test(lower)) opening = ["Putting out the eyes means blinding people or treating them as fools.", "They accuse Moses of deceiving Israel, even though their own accusation is twisted."];
  else if (/very wroth/.test(lower)) opening = ["Wroth means angry.", "Moses is deeply angered because the accusation is false and rebellious."];
  else if (/respect not.*offering/.test(lower)) opening = ["Moses asks God not to accept their offering.", "He refuses to treat their rebellion as true worship."];
  else if (/every man his censer/.test(lower)) opening = ["Each rebel must bring his own censer before the LORD.", "Their claim to holy service will be tested publicly."];
  else if (/gathered all the congregation/.test(lower)) opening = ["Korah gathers the congregation at the tabernacle door.", "The rebellion tries to pull the whole camp into its side."];
  else if (/glory of the lord appeared/.test(lower)) opening = ["The LORD's glory appears at the tabernacle.", "God Himself enters the dispute over priesthood and authority."];
  else if (/separate yourselves/.test(lower)) opening = ["Separate yourselves means move away from the guilty congregation.", "Moses and Aaron are warned before judgment falls."];
  else if (/consume them.*moment/.test(lower)) opening = ["The warning is sudden destruction.", "The rebellion has brought the whole congregation into danger."];
  else if (/god of the spirits/.test(lower)) opening = ["The LORD knows every person's life and heart.", "Moses and Aaron ask Him not to destroy all for the sin of some."];
  else if (/get you up from about/.test(lower)) opening = ["The people must move away from the rebels' tents.", "Distance becomes obedience because judgment is about to fall."];
  else if (/wicked men/.test(lower)) opening = ["Wicked men means men acting in guilty rebellion.", "The camp must not treat their household revolt as harmless."];
  else if (/touch nothing/.test(lower)) opening = ["The people must not share in what belongs to the rebels.", "They must separate from the rebellion completely."];
  else if (/came out/.test(lower) && /dathan/.test(lower)) opening = ["Dathan and Abiram stand at their tent doors.", "Their families and households are now visibly tied to the rebellion."];
  else if (/hereby ye shall know/.test(lower)) opening = ["Hereby means by this sign.", "Moses says the coming judgment will prove the LORD sent him."];
  else if (/new thing/.test(lower)) opening = ["A new thing means an unusual judgment only God can do.", "The earth itself will answer the rebels' challenge."];
  else if (/earth open/.test(lower)) opening = ["The earth opening its mouth pictures the ground swallowing the rebels.", "Creation becomes the instrument of God's judgment."];
  else if (/alive into the pit/.test(lower)) opening = ["Going down alive into the pit means being swallowed before dying.", "The judgment is sudden, public, and unmistakably from the LORD."];
  else if (/earth closed/.test(lower)) opening = ["The earth closes over the rebels.", "Their rebellion disappears under the judgment they could not escape."];
  else if (/fled/.test(lower)) opening = ["Israel flees from the area of judgment.", "The camp sees enough to know this rebellion is deadly."];
  else if (/swallow us up/.test(lower)) opening = ["The people fear being swallowed too.", "Judgment on the rebels teaches the whole camp to tremble."];
  else if (/judgment brings fear/.test(lower)) opening = ["Judgment brings fear because the LORD has acted openly.", "The camp must learn that rebellion near holy things is not small."];
  else if (/rebellion is exposed/.test(lower)) opening = ["Public rebellion receives public exposure.", "The LORD makes clear who has challenged His order."];
  else if (/fire from the lord/.test(lower)) opening = ["Fire from the LORD is holy judgment.", "The men offering unauthorized incense are consumed before God."];
  else if (/consumed the two hundred/.test(lower)) opening = ["The two hundred fifty men are consumed by fire.", "Their censers do not make their rebellion acceptable."];
  else if (/censers of these sinners/.test(lower)) opening = ["The censers belonged to men who sinned by seizing holy service.", "The objects are holy, but the rebellion attached to them is condemned."];
  else if (/broad plates/.test(lower)) opening = ["The censers are hammered into broad plates for the altar.", "What was misused in rebellion becomes a visible warning in worship."];
  else if (/memorial/.test(lower)) opening = ["A memorial is something kept to make people remember.", "The altar covering warns Israel not to seize the priesthood."];
  else if (/killed the people/.test(lower)) opening = ["The congregation blames Moses and Aaron for the deaths.", "Even after judgment, the people twist the truth instead of fearing the LORD."];
  else if (/cloud covered/.test(lower)) opening = ["The cloud covers the tabernacle as God's presence appears.", "The complaint has again brought the camp before holy judgment."];
  else if (/get you up from among/.test(lower)) opening = ["Moses and Aaron are told to move away from the congregation.", "The whole camp is again in danger because rebellion continues."];
  else if (/take a censer/.test(lower)) opening = ["Aaron takes a censer with holy fire and incense.", "This time the priestly censer is used for atonement, not rebellion."];
  else if (/fire therein from off the altar/.test(lower)) opening = ["The fire comes from the altar, the place of sacrifice.", "Atonement must begin with what God has provided, not human invention."];
  else if (/plague is begun/.test(lower)) opening = ["The plague has already started among the people.", "Judgment is moving through the camp while Aaron runs to intercede."];
  else if (/dead and the living/.test(lower)) opening = ["Aaron stands between the dead and the living.", "The priest becomes the dividing line where atonement stops the plague."];
  else if (/plague was stayed/.test(lower)) opening = ["Stayed means stopped.", "The plague ends because atonement is made through the priest God appointed."];
  else if (/every one.*rod/.test(lower)) opening = ["A rod is a staff representing a tribal leader.", "Each tribe's staff will stand before the LORD for His decision."];
  else if (/write.*name/.test(lower)) opening = ["Writing each name on a rod identifies the tribe's leader.", "The test removes guesswork and personal campaigning."];
  else if (/aaron's name/.test(lower)) opening = ["Aaron's name is written on Levi's rod.", "The priesthood question will be answered by the LORD, not by argument."];
  else if (/shall blossom/.test(lower)) opening = ["A dead rod blossoming would mean God has chosen that man.", "Life from a staff becomes the sign of God's appointed priest."];
  else if (/twelve rods/.test(lower)) opening = ["The twelve rods represent Israel's tribes.", "Each tribe is included in the test before the LORD."];
  else if (/rod of aaron was among/.test(lower)) opening = ["Aaron's rod is placed with all the others.", "His priesthood will be confirmed in the same test, not by hiding from challenge."];
  else if (/laid up the rods/.test(lower)) opening = ["Moses lays the rods before the LORD.", "The answer must come from God's presence."];
  else if (/tabernacle of witness/.test(lower)) opening = ["The tabernacle of witness is the tent connected to God's testimony.", "The rods are placed where the LORD's covenant presence is central."];
  else if (/rod of aaron was budded/.test(lower)) opening = ["Aaron's dry rod buds with new life.", "The LORD marks Aaron's priesthood by making the dead staff live."];
  else if (/brought forth buds/.test(lower)) opening = ["Buds are the first signs of new growth.", "The rod is not merely decorated; it is becoming alive."];
  else if (/bloomed blossoms/.test(lower)) opening = ["Blossoms are flowers that come before fruit.", "The sign moves from new growth to visible fullness."];
  else if (/yielded almonds/.test(lower)) opening = ["The rod produces almonds, real fruit from a dead staff.", "God's chosen priesthood is marked by life, not self-promotion."];
  else if (/brought out all the rods/.test(lower)) opening = ["Moses brings every rod back out to the people.", "All Israel sees which staff the LORD has changed."];
  else if (/before the testimony/.test(lower)) opening = ["Before the testimony means before the covenant witness in the tabernacle.", "Aaron's rod is kept near God's presence as lasting evidence."];
  else if (/token against the rebels/.test(lower)) opening = ["A token is a sign.", "Aaron's rod becomes a warning against future rebellion."];
  else if (/take away their murmurings/.test(lower)) opening = ["Taking away their murmurings means silencing the complaints against Aaron's priesthood.", "The living rod answers what arguments could not settle."];
  else if (/moses did so/.test(lower)) opening = ["Moses obeys the LORD's instruction.", "The sign is preserved exactly as God commanded."];
  else if (/behold, we die/.test(lower)) opening = ["The people cry out in fear of death.", "They finally feel the danger of approaching holy things wrongly."];
  else if (/we perish/.test(lower)) opening = ["We perish means we are being destroyed.", "The people now see that rebellion near God's dwelling brings death."];
  else if (/cometh.*near.*tabernacle/.test(lower)) opening = ["Coming near the tabernacle means approaching God's holy dwelling.", "The people fear that careless nearness to holy things will consume them."];
  else if (/consumed with dying/.test(lower)) opening = ["Consumed with dying means completely destroyed by death.", "The question shows fear, but also a new awareness that holiness is serious."];
  else opening = [`The wording belongs to ${context}.`, "It names a concrete moment where Israel must face rebellion, mercy, worship, or priesthood before the LORD."];

  return note([
    opening[0],
    opening[1],
    ...getDay42NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function getDay43NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/sanctuary|priesthood|levi|joined|charge|vessels|stranger|priest's office|service of gift|tabernacle|minister|neither they|nor ye.*die/.test(lower)) return ["👑 Holy service carries responsibility", "⛺ Levites guard access to the tabernacle", "🚫 Nearness to holy things has boundaries", "🎁 Priesthood is received as a gift"];
  if (/heave|offering|oblation|fire|clean|oil|wine|firstfruits|devoted|firstborn|redeem|firstling|salt|tenth|tithes|reward|best|pollute|most holy place|sons.*daughters|openeth the matrix|service which they serve|no inheritance|eat it in every place|bear no sin/.test(lower)) return ["🌾 The LORD provides for His servants", "🎁 Offerings support holy service", "✅ The best belongs to God first", "🧂 Covenant provision is lasting"];
  if (/red heifer|heifer|blemish|yoke|eleazar|blood|burn|ashes|water of separation|purification|unclean|dead|grave|hyssop|running water|seventh|third|perpetual|ordinance of the law|without the camp|seven times|dung|wash his clothes|man dieth|this is the law|open vessel|no covering|sprinkle it/.test(lower)) return ["🐄 The red heifer provides cleansing", "💀 Death makes a person unclean", "💧 God gives a way back to cleanness", "⛺ Cleansing protects life near the tabernacle"];
  if (/water|chode|died|evil place|rod|rock|rebels|smote|believed|sanctify|strove|kadesh|edom|pass|king's highway|sword|pay|mount hor|aaron|eleazar|garments|mourned|brought up the congregation|lord spake unto moses|beasts drink|lifted up his hand|not bring this congregation|sanctified in them|brother israel|fathers went down|not enter into the land|rebelled against my word/.test(lower)) return ["💧 Need exposes the heart", "⚠️ Leadership must honor the LORD", "🏜️ The journey has real consequences", "👑 God carries His priesthood forward"];
  if (/arad|canaanite|vowed|hormah|fiery serpent|pole|bitten|looketh|brass|set forward|oboth|arnon|wars|well|song|sihon|heshbon|moab|jaazer|og|bashan|fear him not|delivered|fought against israel|hearkened|spy out jaazer|sunrising|book of the wars|lawgiver|mattanah|took all these cities|dwelt in the land/.test(lower)) return ["⚔️ The road includes battle", "🙏 Israel must depend on the LORD", "🐍 Judgment and mercy meet in the serpent sign", "🗺️ God keeps moving His people toward the land"];

  return ["📖 Day 43 follows Israel's wilderness road", "⛺ Holiness shapes camp life", "⚠️ Unbelief has consequences", "🙌 The LORD still provides"];
}

function explainDay43NumbersAt95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/bear the iniquity of the sanctuary/.test(lower)) opening = ["Bearing iniquity means carrying responsibility for guilt connected to holy things.", "Aaron's family must guard the sanctuary so Israel does not treat God's dwelling carelessly."];
  else if (/bear the iniquity of your priesthood/.test(lower)) opening = ["The priesthood itself carries serious responsibility.", "Aaron's sons answer for how priestly service is handled before the LORD."];
  else if (/tribe of levi/.test(lower)) opening = ["The tribe of Levi is brought near to assist Aaron's priestly family.", "They serve around the tabernacle but do not replace the priests."];
  else if (/joined unto thee/.test(lower)) opening = ["Joined means attached for service.", "The Levites are assigned to help Aaron carry the work of the tabernacle."];
  else if (/minister before the tabernacle/.test(lower)) opening = ["Minister means serve.", "Aaron and his sons serve before the tabernacle as the appointed priests."];
  else if (/keep thy charge/.test(lower)) opening = ["Keeping charge means guarding an assigned duty.", "The Levites protect the holy work by doing only what God gives them."];
  else if (/not come nigh.*vessels/.test(lower)) opening = ["Coming nigh means coming near.", "The Levites may serve, but they must not handle the sanctuary vessels reserved for priests."];
  else if (/nor ye also, die/.test(lower)) opening = ["The warning is about death near holy things.", "Wrong access can endanger both Levites and priests."];
  else if (/stranger shall not come nigh/.test(lower)) opening = ["A stranger here means someone not appointed for this holy service.", "God limits access so the tabernacle is not treated as common space."];
  else if (/service of gift/.test(lower)) opening = ["The priest's office is called a gift.", "Aaron's family receives priestly service from God rather than taking it by ambition."];
  else if (/charge of mine heave offerings/.test(lower)) opening = ["The heave offerings are lifted-up portions given to the LORD.", "God entrusts Aaron with these holy portions as priestly provision."];
  else if (/reserved from the fire/.test(lower)) opening = ["The part not burned on the altar is kept for the priests.", "That remaining holy portion is given to them for food."];
  else if (/oblation/.test(lower)) opening = ["An oblation is an offering brought to God.", "The priests receive certain portions from what Israel gives to the LORD."];
  else if (/most holy place.*eat/.test(lower)) opening = ["The most holy portions must be eaten in a holy setting.", "Priestly food is still treated as sacred, not ordinary leftovers."];
  else if (/heave offering of their gift/.test(lower)) opening = ["The heave offering is a lifted portion presented to the LORD.", "After being given to God, it supports the priestly household."];
  else if (/sons and.*daughters/.test(lower)) opening = ["Aaron's sons and daughters may share certain priestly portions.", "Some offerings provide for the whole clean household, not only the priests on duty."];
  else if (/clean in thy house/.test(lower)) opening = ["Clean means ritually fit to eat holy food.", "Only clean members of the priestly household may eat these portions."];
  else if (/best of the oil/.test(lower)) opening = ["The best oil, wine, and wheat are first-quality gifts.", "Israel gives God the first and best, not the scraps."];
  else if (/firstfruits/.test(lower)) opening = ["Firstfruits are the first produce of the harvest.", "Giving them to the LORD teaches that the whole harvest comes from Him."];
  else if (/devoted in israel/.test(lower)) opening = ["Devoted means set apart completely to the LORD.", "Those devoted things belong to the priestly provision God assigns."];
  else if (/openeth the matrix/.test(lower)) opening = ["Openeth the matrix means the first offspring born from the womb.", "The firstborn principle marks life as belonging to the LORD."];
  else if (/firstborn of man.*redeem/.test(lower)) opening = ["Redeem means buy back or ransom.", "Firstborn sons are not sacrificed; they are redeemed because they belong to God."];
  else if (/firstling of a cow/.test(lower)) opening = ["Firstling means firstborn animal.", "Firstborn clean animals are not redeemed because they are given as sacrifices."];
  else if (/covenant of salt/.test(lower)) opening = ["A covenant of salt means a lasting, binding provision.", "Salt pictures durability, so the priestly portion is treated as secure before the LORD."];
  else if (/all the tenth/.test(lower)) opening = ["The tenth is the tithe, one part out of ten.", "God gives Israel's tithes to the Levites as their support."];
  else if (/service which they serve/.test(lower)) opening = ["The Levites receive the tithe because they serve at the tabernacle.", "Their provision is tied to their assigned holy work."];
  else if (/must not come nigh/.test(lower)) opening = ["Israel must not come near the tabernacle in an unauthorized way.", "The Levites guard the boundary so the people do not bear guilt."];
  else if (/no inheritance/.test(lower)) opening = ["No inheritance means the Levites do not receive tribal land like the others.", "The LORD provides for them through the holy portions instead."];
  else if (/tithes.*levites/.test(lower)) opening = ["The tithes become the Levites' inheritance.", "Their support comes from Israel's worship rather than ordinary farmland."];
  else if (/speak unto the levites/.test(lower)) opening = ["Moses must address the Levites directly.", "Those who receive the tithe also have responsibilities before God."];
  else if (/take.*tithes/.test(lower)) opening = ["The Levites receive tithes from Israel.", "But receiving holy support does not exempt them from giving to the LORD."];
  else if (/offer up.*heave offering/.test(lower)) opening = ["The Levites must lift up a portion from what they receive.", "They give back to the LORD from the tithe that supports them."];
  else if (/tenth part of the tithe/.test(lower)) opening = ["A tenth of the tithe means the Levites give one part out of ten from their portion.", "Their gift is sometimes called the tithe of the tithe."];
  else if (/best thereof/.test(lower)) opening = ["The best must be offered from the Levites' portion.", "Even God's servants give Him first-quality worship."];
  else if (/heaved from it the best/.test(lower)) opening = ["Heaved means lifted up as an offering.", "Once the best portion is given to the LORD, the rest may be eaten rightly."];
  else if (/eat it in every place/.test(lower)) opening = ["The Levites may eat their remaining portion wherever they live.", "After the holy gift is given, their provision becomes ordinary food for their households."];
  else if (/reward for your service/.test(lower)) opening = ["Reward means assigned payment or support.", "The Levites are fed through the work God gave them to do."];
  else if (/bear no sin/.test(lower)) opening = ["Bearing no sin means they will not be guilty when they handle the tithe rightly.", "Obedience lets them receive the provision without defiling it."];
  else if (/pollute the holy things/.test(lower)) opening = ["Pollute means treat holy things as common or unclean.", "The Levites must handle Israel's gifts carefully because they belong to the LORD."];
  else if (/ordinance of the law/.test(lower)) opening = ["An ordinance is a commanded practice.", "The red heifer ritual gives Israel a way to be cleansed from contact with death."];
  else if (/red heifer without spot/.test(lower)) opening = ["A heifer is a young cow that has not borne a calf.", "This red heifer must be without spot because it is set apart for cleansing."];
  else if (/no blemish/.test(lower)) opening = ["No blemish means no defect.", "The animal used for purification must be whole and acceptable."];
  else if (/never came yoke/.test(lower)) opening = ["A yoke is a wooden frame used for work animals.", "This heifer has never been put to ordinary labor, marking it as set apart."];
  else if (/eleazar the priest/.test(lower)) opening = ["Eleazar is Aaron's son and priestly successor.", "He oversees the red heifer ritual outside the camp."];
  else if (/without the camp/.test(lower)) opening = ["Without the camp means outside Israel's settled camp area.", "The death-related cleansing ritual happens away from the tabernacle center."];
  else if (/sprinkle.*blood/.test(lower)) opening = ["Sprinkling the blood toward the tabernacle connects the ritual to God's presence.", "Even outside the camp, cleansing is aimed toward the LORD's dwelling."];
  else if (/seven times/.test(lower)) opening = ["The repeated sprinkling marks the ritual as complete.", "The blood is sprinkled fully before the tabernacle."];
  else if (/burn the heifer/.test(lower)) opening = ["The heifer is burned completely.", "Its ashes will later be used to make cleansing water."];
  else if (/skin.*flesh.*blood/.test(lower)) opening = ["The whole animal is included in the burning.", "Nothing about the heifer is treated casually or separated from the cleansing purpose."];
  else if (/dung/.test(lower)) opening = ["Dung means waste from the animal.", "Even this is burned, showing the heifer is consumed completely."];
  else if (/cedar wood.*hyssop.*scarlet/.test(lower)) opening = ["Cedar wood, hyssop, and scarlet are added to the burning heifer.", "These materials become part of the ashes used for purification."];
  else if (/midst of the burning/.test(lower)) opening = ["The materials are cast into the fire while the heifer burns.", "The whole mixture will serve the later cleansing ritual."];
  else if (/wash his clothes/.test(lower)) opening = ["Washing clothes is part of returning from ritual uncleanness.", "Even the priest involved in cleansing must be washed afterward."];
  else if (/unclean until the even/.test(lower)) opening = ["Until the even means until evening.", "The person remains unclean for a limited time after handling the ritual."];
  else if (/ashes of the heifer/.test(lower)) opening = ["The ashes are gathered and stored for later use.", "They become the key ingredient in the water of separation."];
  else if (/water of separation/.test(lower)) opening = ["This cleansing water is made with the heifer's ashes.", "It separates uncleanness from the person so they can return to the camp."];
  else if (/purification for sin/.test(lower)) opening = ["Purification for sin means cleansing from defilement before God.", "The ritual deals especially with uncleanness connected to death."];
  else if (/toucheth the dead body/.test(lower)) opening = ["Touching a dead body makes a person unclean under this law.", "Death cannot be treated as ordinary near the living God."];
  else if (/unclean seven days/.test(lower)) opening = ["Seven days marks the full cleansing period.", "The person must move through God's appointed process before being clean."];
  else if (/third day/.test(lower)) opening = ["The third-day washing begins the cleansing process.", "Skipping it means the seventh-day cleansing will not be complete."];
  else if (/defileth the tabernacle/.test(lower)) opening = ["Defileth means makes unclean.", "Refusing purification brings death-uncleanness into relation with the LORD's dwelling."];
  else if (/not sprinkled/.test(lower)) opening = ["Without the cleansing water, uncleanness remains.", "The person cannot simply ignore contact with death and return as if nothing happened."];
  else if (/man dieth in a tent/.test(lower)) opening = ["Death inside a tent affects the whole space.", "Everyone and everything open inside becomes connected to uncleanness."];
  else if (/this is the law/.test(lower)) opening = ["The rule now explains what happens when death enters a tent.", "Israel needs clear instruction for ordinary life near mortality."];
  else if (/open vessel/.test(lower)) opening = ["An open vessel is a container without a sealed cover.", "Because it is uncovered, it becomes unclean in the death-contaminated tent."];
  else if (/no covering/.test(lower)) opening = ["No covering means the vessel is not sealed shut.", "The open container must be treated as unclean."];
  else if (/grave/.test(lower)) opening = ["A grave is a burial place.", "Contact with a grave also brings death-uncleanness."];
  else if (/ashes of the burnt heifer/.test(lower)) opening = ["The ashes from the red heifer are used for purification water.", "The burned sacrifice continues serving Israel after the ritual is finished."];
  else if (/running water/.test(lower)) opening = ["Running water means fresh flowing water.", "It is mixed with the ashes to prepare the cleansing water."];
  else if (/clean person.*hyssop/.test(lower)) opening = ["A clean person handles the hyssop for sprinkling.", "Cleansing must be carried out by someone not already defiled."];
  else if (/sprinkle it upon the tent/.test(lower)) opening = ["The cleansing water is sprinkled on the tent and its contents.", "The whole space touched by death must be purified."];
  else if (/seventh day.*purify/.test(lower)) opening = ["The seventh day completes the cleansing process.", "After washing, the person may return to cleanness at evening."];
  else if (/perpetual statute/.test(lower)) opening = ["A perpetual statute is a lasting rule for Israel.", "Death-cleansing is not a one-time command but an ongoing need."];
  else if (/sprinkleth.*wash/.test(lower)) opening = ["The person who sprinkles the water must wash too.", "Handling purification still requires care with uncleanness."];
  else if (/whatsoever.*toucheth/.test(lower)) opening = ["Uncleanness can spread through touch.", "The law teaches Israel to take defilement seriously."];
  else if (/soul.*unclean until even/.test(lower)) opening = ["The soul here means the person.", "Anyone touching the unclean thing remains unclean until evening."];
  else if (/no water for the congregation/.test(lower)) opening = ["The camp has no water again.", "A real need becomes another test of trust in the wilderness."];
  else if (/chode with moses/.test(lower)) opening = ["Chode means argued or contended.", "The people turn thirst into accusation against Moses."];
  else if (/would god.*died/.test(lower)) opening = ["Would God means I wish.", "The people say death earlier would have been better than thirst now."];
  else if (/brought up.*wilderness/.test(lower)) opening = ["The people blame Moses for bringing them into the wilderness.", "Their words ignore the LORD's rescue and guidance."];
  else if (/evil place/.test(lower)) opening = ["Calling it an evil place means they see the wilderness only as harm.", "Thirst makes them forget God's promise and provision."];
  else if (/lord spake unto moses/.test(lower)) opening = ["The LORD answers the water crisis with instruction.", "Provision begins with God's word, not Moses' frustration."];
  else if (/take the rod/.test(lower)) opening = ["The rod is the staff connected with Moses' authority before God.", "Moses is told to take it as he gathers the people."];
  else if (/speak ye unto the rock/.test(lower)) opening = ["God commands Moses to speak to the rock.", "The water is meant to come through obedient trust, not angry striking."];
  else if (/give forth his water/.test(lower)) opening = ["The rock will give water because the LORD commands it.", "Creation responds to God's word to provide for the thirsty camp."];
  else if (/beasts drink/.test(lower)) opening = ["God provides water for both people and animals.", "The mercy is practical and abundant."];
  else if (/took the rod from before the lord/.test(lower)) opening = ["Moses takes the rod from before the LORD as commanded.", "The scene begins with obedience but will turn at the rock."];
  else if (/hear now, ye rebels/.test(lower)) opening = ["Moses calls the people rebels.", "His anger is understandable, but his words set up a failure to honor God rightly."];
  else if (/must we fetch/.test(lower)) opening = ["Moses speaks as if he and Aaron will bring the water.", "The wording steals attention from the LORD's power."];
  else if (/lifted up his hand/.test(lower)) opening = ["Moses lifts his hand to strike.", "Instead of speaking to the rock, he acts in anger."];
  else if (/smote the rock twice/.test(lower)) opening = ["Smote means struck.", "Moses strikes the rock twice even though God told him to speak."];
  else if (/water came out abundantly/.test(lower)) opening = ["Abundantly means more than enough.", "God still provides water, even while Moses' disobedience is serious."];
  else if (/believed me not/.test(lower)) opening = ["God says Moses and Aaron failed to trust Him rightly.", "Their action did not display the LORD as holy before the people."];
  else if (/sanctify me/.test(lower)) opening = ["Sanctify means treat as holy.", "Leaders must show the people that the LORD, not Moses, is the holy provider."];
  else if (/not bring this congregation/.test(lower)) opening = ["Moses and Aaron will not lead Israel into the land.", "The consequence is severe because their public disobedience was serious."];
  else if (/strove with the lord/.test(lower)) opening = ["Strove means contended or argued.", "The people's quarrel was ultimately with the LORD, not only with Moses."];
  else if (/sanctified in them/.test(lower)) opening = ["God is sanctified when His holiness is made clear.", "Even through judgment, the LORD shows He must be honored as holy."];
  else if (/messengers from kadesh/.test(lower)) opening = ["Moses sends messengers from Kadesh to Edom.", "Israel seeks permission to pass peacefully through Edomite territory."];
  else if (/brother israel/.test(lower)) opening = ["Brother Israel reminds Edom of family connection through Jacob and Esau.", "Moses appeals to shared ancestry instead of threatening war."];
  else if (/fathers went down into egypt/.test(lower)) opening = ["Moses retells Israel's history in Egypt.", "The request is framed by suffering, rescue, and the road home."];
  else if (/let us pass/.test(lower)) opening = ["Israel asks to pass through Edom's land.", "They are not asking to settle or steal resources."];
  else if (/king's highway/.test(lower)) opening = ["The king's highway is the main public road.", "Israel promises to stay on the route and avoid Edom's fields and vineyards."];
  else if (/not pass by me/.test(lower)) opening = ["Edom refuses Israel's request.", "The family connection does not soften Edom's hostility."];
  else if (/with the sword/.test(lower)) opening = ["Edom threatens violence if Israel enters.", "A peaceful travel request is answered with military warning."];
  else if (/drink of thy water/.test(lower)) opening = ["Israel offers to pay for any water used.", "They try to remove every practical reason for Edom's refusal."];
  else if (/pay for it/.test(lower)) opening = ["Paying for water shows Israel is not trying to take Edom's supplies.", "The offer keeps the request peaceful and limited."];
  else if (/much people/.test(lower)) opening = ["Edom comes out with a large force.", "Israel turns away rather than forcing passage."];
  else if (/mount hor/.test(lower)) opening = ["Mount Hor becomes the place of Aaron's death.", "The journey reaches a solemn leadership transition."];
  else if (/aaron shall be gathered/.test(lower)) opening = ["Being gathered to his people means Aaron will die and join his ancestors.", "His priestly service is ending because of the rebellion at Meribah."];
  else if (/not enter into the land/.test(lower)) opening = ["Aaron will not enter Canaan.", "His consequence matches the judgment given after the water-from-the-rock sin."];
  else if (/rebelled against my word/.test(lower)) opening = ["Rebelling against God's word means refusing His command at Meribah.", "Even honored leaders are accountable to obey."];
  else if (/take aaron and eleazar/.test(lower)) opening = ["Eleazar goes up the mountain with Aaron and Moses.", "The priesthood is about to pass from father to son."];
  else if (/bring them up unto mount hor/.test(lower)) opening = ["The mountain setting makes Aaron's death public and solemn.", "Israel will know the priestly office is being transferred by God's command."];
  else if (/strip aaron/.test(lower)) opening = ["Stripping Aaron's garments means removing his priestly clothing.", "His service as high priest is ending."];
  else if (/put them upon eleazar/.test(lower)) opening = ["Putting the garments on Eleazar installs him in Aaron's priestly role.", "The office continues even though Aaron dies."];
  else if (/aaron died/.test(lower)) opening = ["Aaron dies on Mount Hor after the garments are transferred.", "The priesthood continues, but Israel loses its first high priest."];
  else if (/mourned for aaron/.test(lower)) opening = ["All Israel mourns Aaron for thirty days.", "The whole camp feels the loss of the high priest."];
  else if (/king arad/.test(lower)) opening = ["King Arad is a Canaanite ruler in the south.", "He attacks Israel as they move near the land."];
  else if (/fought against israel/.test(lower)) opening = ["Arad fights Israel and takes captives.", "The wilderness road includes real enemies, not only hunger and thirst."];
  else if (/vowed a vow/.test(lower)) opening = ["A vow is a solemn promise made to the LORD.", "Israel asks God for victory and promises to devote the cities."];
  else if (/hearkened/.test(lower)) opening = ["Hearkened means listened.", "The LORD hears Israel's prayer and gives victory."];
  else if (/hormah/.test(lower)) opening = ["Hormah is tied to destruction or devotion to judgment.", "The place name remembers the victory God gave over Canaanite cities."];
  else if (/fiery serpent/.test(lower)) opening = ["The fiery serpent represents the deadly serpents that bit the people.", "God turns the sign of judgment into the place where mercy is received."];
  else if (/upon a pole/.test(lower)) opening = ["The pole lifts the serpent where the bitten people can see it.", "Rescue comes by looking at the sign God provides."];
  else if (/looketh upon it/.test(lower)) opening = ["The bitten person lives by looking where God commands.", "Healing is received by trusting the LORD's provided sign."];
  else if (/serpent of brass/.test(lower)) opening = ["Brass is a bronze-like metal.", "Moses makes a visible serpent-shaped sign according to God's command."];
  else if (/he lived/.test(lower)) opening = ["The bitten person lives when he looks at the bronze serpent.", "God provides mercy in the middle of deserved judgment."];
  else if (/set forward/.test(lower)) opening = ["Israel sets forward means the camp moves on again.", "The journey continues after judgment and mercy."];
  else if (/oboth/.test(lower)) opening = ["Oboth is one of Israel's stopping places.", "Numbers traces the road as the people move toward the land."];
  else if (/sunrising/.test(lower)) opening = ["Sunrising means east.", "The detail locates Israel's movement around Moab."];
  else if (/arnon/.test(lower)) opening = ["Arnon is a boundary river near Moab.", "The route places Israel between Moab and Amorite territory."];
  else if (/moab and the amorites/.test(lower)) opening = ["Moab and the Amorites are neighboring peoples along Israel's route.", "The journey is now moving through contested borderlands."];
  else if (/book of the wars/.test(lower)) opening = ["This source preserved victory songs or records about the LORD's battles.", "Numbers quotes it to mark God's battles for Israel."];
  else if (/brooks of arnon/.test(lower)) opening = ["The brooks of Arnon are streams connected to that border region.", "The geography shows Israel's movement through real lands and boundaries."];
  else if (/gather the people/.test(lower)) opening = ["God gathers the people for water.", "This time provision is announced as a gift rather than a quarrel."];
  else if (/give them water/.test(lower)) opening = ["The LORD promises to give water.", "After earlier conflict over water, this scene highlights generous provision."];
  else if (/sang this song/.test(lower)) opening = ["Israel sings in response to the well.", "The water gift turns the camp from complaint to praise."];
  else if (/spring up/.test(lower)) opening = ["Spring up is a call for the well to bring forth water.", "The song celebrates provision rising from the ground."];
  else if (/princes digged/.test(lower)) opening = ["The leaders help dig the well.", "This provision includes both God's gift and the people's ordered participation."];
  else if (/lawgiver/.test(lower)) opening = ["The lawgiver's direction means the digging follows appointed leadership.", "The well is not chaos; it is provision received with order."];
  else if (/mattanah/.test(lower)) opening = ["Mattanah is another stop on the journey.", "The travel list shows Israel continuing toward the promised land."];
  else if (/messengers unto sihon/.test(lower)) opening = ["Israel sends messengers to Sihon king of the Amorites.", "They ask for peaceful passage before battle begins."];
  else if (/pass through thy land/.test(lower)) opening = ["Israel asks to pass through Sihon's land.", "The request is limited to travel, not conquest."];
  else if (/would not suffer/.test(lower)) opening = ["Would not suffer means would not allow.", "Sihon refuses Israel's peaceful request."];
  else if (/gathered all his people/.test(lower)) opening = ["Sihon gathers his army against Israel.", "He chooses battle instead of letting them pass."];
  else if (/edge of the sword/.test(lower)) opening = ["The edge of the sword means battle defeat.", "Israel wins because the LORD gives victory on the road."];
  else if (/took all these cities/.test(lower)) opening = ["Israel captures the Amorite cities.", "The victory gives Israel settled territory east of the Jordan."];
  else if (/heshbon.*sihon/.test(lower)) opening = ["Heshbon was Sihon's royal city.", "Taking it shows Israel's victory over Amorite power."];
  else if (/fire.*heshbon/.test(lower)) opening = ["The fire from Heshbon is poetic battle language.", "The old song remembers Sihon's earlier conquest of Moab."];
  else if (/woe to thee, moab/.test(lower)) opening = ["Woe is a cry of grief or doom.", "The song recalls Moab's defeat under Amorite power."];
  else if (/heshbon is perished/.test(lower)) opening = ["The poem says Heshbon's power has collapsed.", "Israel's victory overturns the city that once dominated others."];
  else if (/dwelt in the land/.test(lower)) opening = ["Israel dwells in Amorite land after the victory.", "The road is beginning to include possession, not only travel."];
  else if (/spy out jaazer/.test(lower)) opening = ["Spying out Jaazer means scouting the area before taking it.", "Moses sends men to examine the Amorite towns."];
  else if (/fear him not/.test(lower)) opening = ["God tells Moses not to fear Og king of Bashan.", "The next enemy is strong, but the LORD has already promised victory."];
  else if (/delivered him into thy hand/.test(lower)) opening = ["Delivered into thy hand means God has given the enemy over to defeat.", "Israel's courage rests on the LORD's promise."];
  else if (/smote him.*sons.*people/.test(lower)) opening = ["Israel defeats Og, his sons, and his people.", "The victory leaves no surviving force to block that part of the journey."];
  else opening = ["This Day 43 phrase needs a direct explanation.", "It belongs to priestly service, cleansing, water, wilderness travel, or battle."];

  return note([
    opening[0],
    opening[1],
    ...getDay43NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function getDay44NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/balak|moab|midian|messengers|curse|too mighty|rewards|divination|honour|silver|gold|promote|princes|zippor|hinder|whatsoever|lodge|tarry|refuseth|get you|cover the face|what men|come to call|speak unto me more|what hast thou done/.test(lower)) return ["😨 Fear drives Balak's plan", "🪄 He wants a spiritual weapon", "💰 Money and honor pressure Balaam", "🛡️ God's blessing cannot be bought"];
  if (/god came|lord speak|lord shall speak|word|not go|not curse|blessed|beyond|shalt speak|mouth|take heed|must do|commandment|reverse|rose up|give me leave|the lord speaketh|god met/.test(lower)) return ["🗣️ The LORD controls the message", "🚫 Balaam is limited by God's word", "🙌 Israel remains blessed", "🔒 God's purpose cannot be reversed"];
  if (/ass|angel|sword|way|adversary|eyes|perverse|slain|alive|saddled|foot|wall|mouth|fell down|what have i done|i have sinned|get me back/.test(lower)) return ["🐴 The donkey sees danger first", "⚔️ The angel blocks Balaam's road", "👁️ God opens what Balaam cannot see", "⚠️ Greedy desire blinds judgment"];
  if (/altar|altars|burnt offering|parable|jacob|iniquity|king|lion|egypt|righteous|bless|zophim|peor|jeshimon|oxen|rams|peradventure|top of the rocks|utmost part|god is not a man|son of man/.test(lower)) return ["🧱 Altars cannot force God's hand", "🙌 The curse becomes blessing", "👑 Israel is pictured as protected", "🦁 The nation is strong because God is with them"];
  if (/enchantments|spirit|vision|almighty|tents|tabernacles|valleys|gardens|waters|star|sceptre|dominion|edom|seir|kenite|chittim|perish|went not|set his face|trance|buckets|agag|unicorn|nest|asshur/.test(lower)) return ["👁️ Balaam sees beyond the moment", "🕊️ God's Spirit gives the word", "🏕️ Israel's future is blessed", "👑 A coming ruler is promised"];
  if (/shittim|whoredom|eat|bowed|baal|anger|heads|hang|slay|phinehas|javelin|plague|zealous|peace|priesthood|atonement|midianitish|vex|wiles|peor|twenty and four|simeonites|zur/.test(lower)) return ["💔 Compromise enters the camp", "🔥 Sin brings covenant danger", "🛡️ Zeal stops the plague", "⚖️ The LORD confronts Midian's trap"];

  return ["🧭 Balak's plan keeps failing", "🗣️ Balaam is not free to invent the message", "⚠️ Greed keeps pressing against obedience", "🙌 The LORD keeps guarding Israel"];
}

function explainDay44NumbersAt95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/balak.*zippor.*saw/.test(lower)) opening = ["Balak sees what Israel has done to the Amorites.", "His fear begins the attempt to use Balaam against God's people."];
  else if (/moab was sore afraid/.test(lower)) opening = ["Sore afraid means deeply afraid.", "Moab looks at Israel and feels threatened by the size and strength of the camp."];
  else if (/elders of midian/.test(lower)) opening = ["Moab turns to Midian's elders for help.", "Balak's fear becomes a political alliance against Israel."];
  else if (/ox licketh/.test(lower)) opening = ["The ox image pictures Israel consuming everything around Moab.", "Balak thinks Israel will strip the land bare like cattle eating grass."];
  else if (/sent messengers.*balaam/.test(lower)) opening = ["Balak sends for Balaam because Balaam is known for spiritual words of blessing and cursing.", "The king wants a curse because he fears fighting Israel directly."];
  else if (/come out from egypt/.test(lower)) opening = ["Balak knows Israel is the people rescued from Egypt.", "Their past deliverance makes them look dangerous to nearby nations."];
  else if (/cover the face of the earth/.test(lower)) opening = ["Covering the face of the earth means filling the visible land.", "Balak describes Israel as a massive crowd spread near him."];
  else if (/curse me this people/.test(lower)) opening = ["A curse is a spoken call for harm or defeat.", "Balak wants Balaam's words to weaken Israel before battle."];
  else if (/too mighty/.test(lower)) opening = ["Too mighty means too strong for Balak to handle alone.", "He seeks a curse because he thinks ordinary force may not be enough."];
  else if (/rewards of divination/.test(lower)) opening = ["Divination is a forbidden attempt to gain spiritual power or hidden knowledge.", "The princes bring payment because they expect Balaam to work for reward."];
  else if (/lodge here this night/.test(lower)) opening = ["Lodge here means stay overnight.", "Balaam delays the messengers while he waits to hear what the LORD will say."];
  else if (/bring you word again/.test(lower)) opening = ["Balaam promises to report back with an answer.", "The decision must come from the LORD, not from Balak's money."];
  else if (/lord shall speak/.test(lower)) opening = ["Balaam knows the LORD's word must decide the matter.", "Even a hired prophet cannot control what God says."];
  else if (/god came unto balaam/.test(lower)) opening = ["God confronts Balaam during the night.", "The LORD steps into Balak's plan before Balaam can act."];
  else if (/what men are these/.test(lower)) opening = ["God's question exposes Balaam's visitors.", "The LORD makes Balaam answer for the mission he is entertaining."];
  else if (/not go with them/.test(lower)) opening = ["God forbids Balaam to travel with the messengers.", "The first answer is clear: he must not join Balak's plan."];
  else if (/not curse the people/.test(lower)) opening = ["God forbids Balaam to curse Israel.", "The people Balak fears are under the LORD's protection."];
  else if (/they are blessed/.test(lower)) opening = ["Blessed means under God's favor.", "A people blessed by the LORD cannot be turned into cursed people by Balaam's fee."];
  else if (/rose up in the morning/.test(lower)) opening = ["Balaam gets up and sends the princes away.", "He obeys the refusal outwardly, even though the story will show his desire is not settled."];
  else if (/get you into your land/.test(lower)) opening = ["Balaam tells the princes to return home.", "The first embassy fails because the LORD has refused the mission."];
  else if (/refuseth.*give me leave/.test(lower)) opening = ["Give me leave means give permission.", "Balaam says the LORD will not permit him to go with Balak's men."];
  else if (/refuseth to come/.test(lower)) opening = ["Balak hears that Balaam refused to come.", "The message reports the outcome but not the weight of God's command."];
  else if (/more honourable/.test(lower)) opening = ["Balak sends more important princes the second time.", "He increases pressure as if a better offer can change God's word."];
  else if (/let nothing.*hinder/.test(lower)) opening = ["Hinder means stop or hold back.", "Balak urges Balaam not to let anything keep him from coming."];
  else if (/very great honour/.test(lower)) opening = ["Very great honor means public reward, status, and promotion.", "Balak tempts Balaam with the kind of recognition money can buy."];
  else if (/whatsoever thou sayest/.test(lower)) opening = ["Balak offers Balaam almost anything he asks.", "The king treats spiritual power like something he can purchase."];
  else if (/house full of silver and gold/.test(lower)) opening = ["A house full of silver and gold pictures enormous payment.", "Balaam admits that even a fortune cannot give him permission to pass God's word."];
  else if (/cannot go beyond the word/.test(lower)) opening = ["Going beyond God's word means stepping outside what the LORD has commanded.", "Balaam knows he is not free to invent a curse."];
  else if (/tarry ye also/.test(lower)) opening = ["Tarry means wait.", "Balaam asks the second group to stay, even though God's first answer was already clear."];
  else if (/say unto me more/.test(lower)) opening = ["Balaam wants to hear more from the LORD.", "The request shows his desire pulling against the command he already received."];
  else if (/god came.*night/.test(lower)) opening = ["God meets Balaam again at night.", "The LORD permits the trip only under strict control of His word."];
  else if (/men come to call/.test(lower)) opening = ["The condition is if the men come to call him.", "Balaam may go only within the boundary God gives."];
  else if (/word which i shall say/.test(lower)) opening = ["Balaam may speak only the word God gives.", "The journey does not make him free to serve Balak's curse."];
  else if (/saddled his ass/.test(lower)) opening = ["An ass is a donkey.", "Balaam saddles his animal and begins the road that will expose his heart."];
  else if (/anger was kindled/.test(lower)) opening = ["God's anger burns because Balaam goes with a heart still drawn toward reward.", "The permission to travel is not permission to chase Balak's evil purpose."];
  else if (/angel of the lord stood/.test(lower)) opening = ["The angel of the LORD blocks Balaam's path.", "He stands as a divine warning on the road."];
  else if (/adversary against him/.test(lower)) opening = ["An adversary is an opponent.", "God's messenger becomes Balaam's opponent because Balaam's way is dangerous."];
  else if (/sword drawn/.test(lower)) opening = ["The drawn sword means judgment is ready.", "Balaam is in danger before he even realizes it."];
  else if (/ass saw the angel/.test(lower)) opening = ["The donkey sees the angel before Balaam does.", "The animal has clearer sight than the man who claims spiritual knowledge."];
  else if (/turned aside/.test(lower)) opening = ["Turning aside means leaving the path.", "The donkey is avoiding danger, though Balaam thinks she is disobeying."];
  else if (/wall/.test(lower)) opening = ["The donkey presses against the wall to avoid the angel.", "Balaam feels pain but still does not see the mercy protecting him."];
  else if (/crushed balaam/.test(lower)) opening = ["Balaam's foot is crushed against the wall.", "The painful moment is part of the warning he refuses to understand."];
  else if (/fell down under balaam/.test(lower)) opening = ["The donkey finally lies down under Balaam.", "She stops because the road ahead means death."];
  else if (/opened the mouth/.test(lower)) opening = ["The LORD makes the donkey speak.", "God uses an animal to confront the prophet who is acting blindly."];
  else if (/what have i done/.test(lower)) opening = ["The donkey asks why Balaam is beating her.", "The question forces Balaam to face his own angry blindness."];
  else if (/balaam said unto the ass/.test(lower)) opening = ["Balaam answers the donkey as if the strange event is normal.", "His anger is so strong that he misses the warning in front of him."];
  else if (/sword in mine hand/.test(lower)) opening = ["Balaam says he would kill the donkey if he had a sword.", "He does not know a sword is already drawn against him."];
  else if (/am not i thine ass/.test(lower)) opening = ["The donkey reminds Balaam of her long faithful service.", "Her words show that the problem is not her character but Balaam's blindness."];
  else if (/opened the eyes of balaam/.test(lower)) opening = ["God opens Balaam's eyes to see the angel.", "The danger was real before Balaam could perceive it."];
  else if (/bowed down his head/.test(lower)) opening = ["Balaam bows when he finally sees the angel.", "The proud prophet is forced into humility."];
  else if (/perverse before me/.test(lower)) opening = ["Perverse means twisted or reckless.", "The angel names Balaam's road as morally crooked before God."];
  else if (/slain thee/.test(lower)) opening = ["The angel says Balaam could have been killed.", "The donkey's resistance was mercy that kept him alive."];
  else if (/saved her alive/.test(lower)) opening = ["The donkey would have been spared even if Balaam died.", "God shows that the animal acted more rightly than the prophet."];
  else if (/i have sinned/.test(lower)) opening = ["Balaam admits guilt when his eyes are opened.", "He recognizes that his road has brought him against God's messenger."];
  else if (/knew not.*stoodest/.test(lower)) opening = ["Balaam did not know the angel stood in the way.", "His ignorance does not make the path safe."];
  else if (/get me back again/.test(lower)) opening = ["Balaam offers to turn back.", "The angel will let him go only under the strict command to speak God's word."];
  else if (/only the word/.test(lower)) opening = ["Only God's word may come from Balaam's mouth.", "The angel repeats the limit that controls the whole story."];
  else if (/went with the princes/.test(lower)) opening = ["Balaam continues with Balak's princes.", "The journey goes forward, but Balaam is now openly warned."];
  else if (/went out to meet/.test(lower)) opening = ["Balak goes out to meet Balaam at the border.", "The king treats Balaam's arrival as the key to his plan."];
  else if (/able indeed to promote/.test(lower)) opening = ["Balak complains that he can reward Balaam richly.", "He still thinks honor and payment should control Balaam."];
  else if (/putteth in my mouth/.test(lower)) opening = ["Balaam says he can speak only what God puts in his mouth.", "Balak wants a curse, but the message belongs to the LORD."];
  else if (/offered oxen and sheep/.test(lower)) opening = ["Balak offers animals in sacrifice and feasting.", "The meeting is dressed in religious action, but the goal is still to curse Israel."];
  else if (/high places of baal/.test(lower)) opening = ["High places of Baal are worship sites connected to the false god Baal.", "Balak brings Balaam to a place shaped by idolatry."];
  else if (/build me here seven altars|built seven altars/.test(lower) && section.reference === "Numbers 23:1-3") opening = ["The first seven altars create an impressive ritual scene.", "Balaam and Balak prepare sacrifices, but ritual cannot force God to curse Israel."];
  else if (/build me here seven altars|built seven altars/.test(lower) && section.reference === "Numbers 23:13-17") opening = ["The second set of altars repeats the same costly ritual.", "Balak changes the viewing place, but the sacrifice still cannot buy a curse."];
  else if (/build me here seven altars|built seven altars/.test(lower) && section.reference === "Numbers 23:27-30") opening = ["The third set of altars shows Balak's stubborn hope.", "He keeps trying new places even though God's blessing has already been clear."];
  else if (/build me here seven altars|built seven altars/.test(lower)) opening = ["Seven altars create an impressive ritual scene.", "Balaam and Balak prepare sacrifices, but ritual cannot force God to curse Israel."];
  else if (/seven oxen and seven rams/.test(lower)) opening = ["The seven oxen and seven rams make the ritual costly and formal.", "The size of the offering does not control the LORD's answer."];
  else if (/stand by thy burnt offering/.test(lower)) opening = ["Balak must stand beside the burnt offering while Balaam goes aside.", "They are waiting for a word, not generating one by effort."];
  else if (/peradventure/.test(lower) && /meet me/.test(lower)) opening = ["Peradventure means perhaps.", "Balaam hopes the LORD will meet him, but he cannot command the meeting."];
  else if (/god met balaam/.test(lower)) opening = ["God meets Balaam and takes control of the moment.", "The answer will not come from Balak's plan."];
  else if (/prepared seven altars/.test(lower)) opening = ["Balaam reports the altars he prepared.", "He presents the ritual, but God's word still rules the outcome."];
  else if (/put a word in balaam/.test(lower) || /put a word in his mouth/.test(lower)) opening = ["The LORD places the message in Balaam's mouth.", "Balaam's speech will carry God's decision, not Balak's desire."];
  else if (/return unto balak/.test(lower)) opening = ["Balaam is sent back to Balak with God's word.", "The king waiting for a curse is about to hear blessing."];
  else if (/took up his parable/.test(lower) && section.reference === "Numbers 23:7-10") opening = ["Balaam begins a formal prophetic saying.", "The hired curse is about to turn into God's blessing."];
  else if (/took up his parable/.test(lower) && section.reference === "Numbers 24:3-4") opening = ["The next oracle begins with Balaam under revealed sight.", "He speaks as a man being shown what God wants said."];
  else if (/took up his parable/.test(lower) && section.reference === "Numbers 24:15-17") opening = ["Another formal oracle introduces a future ruler.", "Balaam's words now reach beyond Balak's immediate fear."];
  else if (/took up his parable/.test(lower) && section.reference === "Numbers 24:23-24") opening = ["The final oracle looks beyond Moab to later nations.", "Balaam sees that every power stands under God's future judgment."];
  else if (/took up his parable/.test(lower)) opening = ["A parable here is a formal prophetic saying.", "Balaam speaks an oracle rather than ordinary conversation."];
  else if (/come, curse me jacob/.test(lower)) opening = ["Balak wants Jacob cursed, meaning Israel harmed by spoken judgment.", "Balaam begins by naming the command he has been hired to fulfill."];
  else if (/how shall i curse/.test(lower)) opening = ["Balaam cannot curse people God has not cursed.", "The question exposes the impossibility of Balak's plan."];
  else if (/top of the rocks/.test(lower)) opening = ["From the high rocks Balaam sees Israel spread below.", "The viewpoint meant for cursing becomes a place of blessing."];
  else if (/death of the righteous/.test(lower)) opening = ["The righteous are people counted upright before God.", "Balaam envies Israel's blessed end even while standing with their enemy."];
  else if (/what hast thou done/.test(lower)) opening = ["Balak reacts with frustration.", "He paid for a curse but hears a blessing instead."];
  else if (/curse mine enemies/.test(lower)) opening = ["Balak calls Israel his enemies.", "His goal is not truth but harm against the people God blessed."];
  else if (/blessed them altogether/.test(lower)) opening = ["Altogether means completely.", "Balak complains because Balaam's words fully bless Israel."];
  else if (/take heed to speak/.test(lower)) opening = ["Take heed means be careful.", "Balaam says he must carefully speak what the LORD gives."];
  else if (/utmost part/.test(lower)) opening = ["Balak tries showing only part of Israel's camp.", "He hopes a different view will produce a different word."];
  else if (/field of zophim/.test(lower)) opening = ["Zophim is another high place for viewing Israel.", "Balak changes locations, but he cannot change God's blessing."];
  else if (/hearken unto me/.test(lower)) opening = ["Hearken means listen carefully.", "Balaam calls Balak to hear God's answer instead of pushing his own agenda."];
  else if (/god is not a man/.test(lower)) opening = ["God is not unstable or deceitful like sinful humans.", "His word is not something Balak can bribe or pressure into changing."];
  else if (/son of man.*repent/.test(lower)) opening = ["Repent here means change His declared course.", "God does not reverse His blessing because Balak wants Him to."];
  else if (/commandment to bless/.test(lower)) opening = ["Balaam has received a command to bless Israel.", "The prophet is under orders from God, not from the king."];
  else if (/cannot reverse/.test(lower)) opening = ["Balaam cannot reverse God's blessing.", "No hired word can undo what the LORD has spoken."];
  else if (/not beheld iniquity/.test(lower)) opening = ["The line means God is not treating Israel as a cursed guilty nation here.", "Balak wants judgment, but the LORD is speaking covenant favor over His people."];
  else if (/shout of a king/.test(lower)) opening = ["The shout of a king means royal victory is among Israel.", "The LORD's presence gives the camp confidence and strength."];
  else if (/brought them out of egypt/.test(lower)) opening = ["Israel's rescue from Egypt is the foundation of Balaam's blessing.", "The God who brought them out still protects them."];
  else if (/great lion/.test(lower)) opening = ["The lion picture shows Israel rising with strength.", "Balak wants them weakened, but the oracle pictures them powerful."];
  else if (/neither curse/.test(lower)) opening = ["Balak tells Balaam to stop cursing and stop blessing.", "If he cannot get the curse, he wants silence."];
  else if (/nor bless/.test(lower)) opening = ["Balak cannot tolerate Israel being blessed.", "He would rather hear nothing than hear God's favor spoken again."];
  else if (/all that the lord speaketh/.test(lower)) opening = ["Balaam repeats that the LORD's speech controls him.", "The king's frustration does not change the prophet's limit."];
  else if (/that i must do/.test(lower)) opening = ["Must means Balaam is bound to obey.", "He cannot turn God's message into Balak's preferred curse."];
  else if (/please god/.test(lower)) opening = ["Balak still hopes God may allow a curse from another place.", "Changing the location cannot change the LORD's will."];
  else if (/top of peor/.test(lower)) opening = ["Peor is another height from which Balak shows Israel to Balaam.", "The repeated setup shows Balak's stubborn refusal to accept God's answer."];
  else if (/jeshimon/.test(lower)) opening = ["Jeshimon means the desert or wasteland area.", "Balak chooses a lookout facing the wilderness, still searching for a curse."];
  else if (/went not.*other times/.test(lower)) opening = ["Balaam stops using his earlier search for omens.", "He now sees that the LORD is determined to bless Israel."];
  else if (/enchantments/.test(lower)) opening = ["Enchantments are occult attempts to gain spiritual power or signs.", "Balaam turns away from that practice because God's blessing is clear."];
  else if (/face toward the wilderness/.test(lower)) opening = ["Balaam faces the wilderness where Israel is camped.", "He looks directly at the people God has blessed."];
  else if (/lifted up his eyes/.test(lower)) opening = ["Balaam lifts his eyes and sees Israel ordered by tribes.", "The sight prepares the blessing that follows."];
  else if (/spirit of god came/.test(lower)) opening = ["The Spirit of God comes upon Balaam.", "The next words are driven by God's Spirit, not by Balak's money."];
  else if (/eyes are open/.test(lower)) opening = ["Open eyes means Balaam is being made to see what God reveals.", "The prophet who was blind on the road now speaks from revealed sight."];
  else if (/heard the words of god/.test(lower)) opening = ["Balaam hears words that come from God.", "His oracle depends on revelation, not personal imagination."];
  else if (/vision of the almighty/.test(lower)) opening = ["A vision is something God allows a person to see.", "Balaam is shown a truth larger than the political moment with Balak."];
  else if (/falling into a trance/.test(lower)) opening = ["The trance describes Balaam overwhelmed by the vision.", "He is not controlling the scene; God's revelation is controlling him."];
  else if (/goodly are thy tents/.test(lower)) opening = ["Goodly means beautiful or pleasing.", "Balaam looks at Israel's tents and blesses the camp Balak wants cursed."];
  else if (/thy tabernacles/.test(lower)) opening = ["Tabernacles here means dwellings or tents.", "Israel's ordinary camp is pictured as ordered and blessed."];
  else if (/valleys are they spread/.test(lower)) opening = ["The valley image pictures Israel spread out with abundance.", "The camp is described as life-giving rather than threatening."];
  else if (/gardens by the river/.test(lower)) opening = ["Gardens by a river picture freshness and fruitfulness.", "The blessing sees Israel as watered and alive."];
  else if (/cedar trees/.test(lower)) opening = ["Cedar trees picture strength, height, and stability.", "Israel is described as planted and flourishing by God's favor."];
  else if (/water out of his buckets/.test(lower)) opening = ["Water pouring from buckets pictures overflowing supply.", "The blessing speaks of future abundance flowing from Israel."];
  else if (/king.*higher than agag/.test(lower)) opening = ["Israel's king is pictured as greater than Agag.", "The blessing looks ahead to royal strength over enemies."];
  else if (/strength of an unicorn/.test(lower)) opening = ["Unicorn in the KJV refers to a powerful wild ox-like animal.", "The image means God gives Israel great strength."];
  else if (/lay down as a lion/.test(lower)) opening = ["The resting lion image shows strength no enemy dares disturb.", "Israel is pictured as secure under God's blessing."];
  else if (/blessed is he/.test(lower)) opening = ["Those who bless Israel align with God's blessing.", "Balaam repeats the promise pattern given to Abraham's family."];
  else if (/cursed is he/.test(lower)) opening = ["Those who curse Israel stand against God's promise.", "Balak's plan is dangerous because it fights the blessing God protects."];
  else if (/balak.*anger/.test(lower)) opening = ["Balak's anger burns because Balaam keeps blessing Israel.", "The king's plan has completely failed."];
  else if (/smote his hands/.test(lower)) opening = ["Smoting his hands means clapping or striking them together in anger.", "Balak's gesture shows open frustration."];
  else if (/called thee to curse/.test(lower)) opening = ["Balak reminds Balaam why he hired him.", "The king wanted a weaponized curse, not God's blessing."];
  else if (/thought to promote/.test(lower)) opening = ["Balak planned to reward Balaam with high honor.", "Now he blames the LORD for keeping Balaam from that reward."];
  else if (/commandment of the lord/.test(lower)) opening = ["The LORD's commandment sets the boundary Balaam cannot cross.", "Reward cannot make disobedience acceptable."];
  else if (/go unto my people/.test(lower)) opening = ["Balaam says he is going home to his own people.", "Before leaving, he gives Balak one more word about the future."];
  else if (/advertise thee/.test(lower)) opening = ["Advertise here means tell or make known.", "Balaam will announce what Israel will later do to Balak's people."];
  else if (/see him.*not now/.test(lower)) opening = ["Balaam sees a future ruler, not someone arriving immediately.", "The promise points beyond the present conflict."];
  else if (/star out of jacob/.test(lower)) opening = ["The star pictures a coming royal figure from Jacob.", "The blessing looks forward to a ruler raised up from Israel."];
  else if (/sceptre/.test(lower)) opening = ["A sceptre is a ruler's staff.", "The image points to kingly authority rising from Israel."];
  else if (/edom shall be/.test(lower)) opening = ["Edom becoming a possession means Israel's future ruler will have victory there.", "The oracle looks beyond Balaam's day to later dominion."];
  else if (/seir also/.test(lower)) opening = ["Seir is connected with Edom.", "The same enemy region is pictured under Israel's future rule."];
  else if (/valiantly/.test(lower)) opening = ["Valiantly means with strength and courage.", "Israel's future is not defeat but victorious action under God's promise."];
  else if (/have dominion/.test(lower)) opening = ["Dominion means ruling authority.", "The promised ruler from Jacob will exercise power over enemies."];
  else if (/strong is thy dwellingplace/.test(lower)) opening = ["The Kenites live in a place that seems secure.", "Balaam says even a strong dwelling cannot escape future judgment."];
  else if (/nest in a rock/.test(lower)) opening = ["A nest in a rock pictures a high, protected home.", "The image shows confidence in natural security."];
  else if (/kenite shall be wasted/.test(lower)) opening = ["Wasted means worn down or destroyed.", "The oracle warns that Kenite security will not last forever."];
  else if (/asshur.*captive/.test(lower)) opening = ["Asshur means Assyria.", "The Kenites are pictured being carried away by a stronger empire."];
  else if (/who shall live/.test(lower)) opening = ["The question asks who can survive when God brings these events.", "Balaam sees judgment larger than any one nation can manage."];
  else if (/ships.*chittim/.test(lower)) opening = ["Chittim points to distant western coastlands or islands.", "The oracle looks ahead to powers arriving by sea."];
  else if (/afflict asshur/.test(lower)) opening = ["Asshur will be afflicted by another power.", "Even strong empires stand under God's future judgment."];
  else if (/perish for ever/.test(lower)) opening = ["Perish forever means final ruin.", "The oracle ends with the collapse of powers that seem strong now."];
  else if (/abode in shittim/.test(lower)) opening = ["Shittim is Israel's camp location before the sin with Moab.", "The place becomes tied to a dangerous compromise."];
  else if (/commit whoredom/.test(lower)) opening = ["Whoredom means sexual immorality.", "Israel's sin begins with Moabite women and leads into idolatry."];
  else if (/people did eat/.test(lower)) opening = ["The eating happens at pagan sacrificial meals.", "Fellowship with Moab's worship pulls Israel toward false gods."];
  else if (/bowed down/.test(lower)) opening = ["Bowing down means worshiping.", "Israel moves from immoral compromise into idolatry."];
  else if (/anger of the lord/.test(lower)) opening = ["The LORD's anger burns because Israel has joined itself to Baal-peor.", "The camp is now in covenant danger."];
  else if (/lord said unto moses|lord spake unto moses/.test(lower) && section.reference === "Numbers 25:4-5") opening = ["The LORD commands public judgment against the Baal-peor sin.", "Israel cannot treat idolatry in the camp as a small matter."];
  else if (/lord said unto moses|lord spake unto moses/.test(lower) && section.reference === "Numbers 25:10-13") opening = ["The LORD explains why Phinehas' zeal mattered.", "The plague stopped because covenant rebellion was confronted."];
  else if (/lord said unto moses|lord spake unto moses/.test(lower) && section.reference === "Numbers 25:16-18") opening = ["The LORD turns Israel's attention toward Midian.", "The people who set the trap must now be treated as enemies."];
  else if (/lord said unto moses|lord spake unto moses/.test(lower)) opening = ["The LORD speaks because the sin must be confronted.", "Israel cannot treat idolatry in the camp as a small matter."];
  else if (/heads of the people/.test(lower)) opening = ["The heads of the people are leaders responsible for judgment in the camp.", "Public sin requires public accountability."];
  else if (/hang them up/.test(lower)) opening = ["Hanging them before the LORD is public judgment.", "The punishment shows the seriousness of joining Baal-peor."];
  else if (/slay ye every one/.test(lower)) opening = ["The judges must execute those joined to Baal-peor.", "The camp must remove the rebellion before the plague consumes more people."];
  else if (/phinehas.*saw/.test(lower)) opening = ["Phinehas sees open defiance while the congregation is weeping.", "He acts because the sin is being displayed in front of the camp."];
  else if (/rose up from among/.test(lower)) opening = ["Phinehas rises from the congregation to act.", "His zeal interrupts the public rebellion."];
  else if (/javelin/.test(lower)) opening = ["A javelin is a spear-like weapon.", "Phinehas takes it to stop the defiant sin bringing plague on Israel."];
  else if (/plague was stayed/.test(lower)) opening = ["Stayed means stopped.", "The plague ends when the rebellion is judged."];
  else if (/twenty and four thousand/.test(lower)) opening = ["Twenty-four thousand people die in the plague.", "The number shows how deadly the Baal-peor compromise became."];
  else if (/zealous for my sake/.test(lower)) opening = ["Zealous means passionately loyal for God's honor.", "Phinehas acts because the LORD's holiness is being openly despised."];
  else if (/covenant of peace/.test(lower)) opening = ["The covenant of peace is God's promised favor to Phinehas.", "The man who turned away wrath receives peace from the LORD."];
  else if (/everlasting priesthood/.test(lower)) opening = ["Everlasting priesthood means an enduring priestly line.", "Phinehas' zeal is honored with a lasting priestly promise."];
  else if (/made an atonement/.test(lower)) opening = ["Atonement means dealing with guilt before God.", "Phinehas' action turns away wrath from Israel."];
  else if (/israelite that was slain/.test(lower)) opening = ["The slain Israelite is named so the sin is not vague.", "Numbers records the public shame of the rebellion."];
  else if (/simeonites/.test(lower)) opening = ["The man belonged to a chief family in Simeon.", "High status does not protect open sin from judgment."];
  else if (/midianitish woman/.test(lower)) opening = ["The Midianite woman is also named.", "The story identifies the relationship that drew Israel deeper into sin."];
  else if (/daughter of zur/.test(lower)) opening = ["Zur was a Midianite leader.", "The woman came from an important family, showing the sin had political weight too."];
  else if (/vex the midianites/.test(lower)) opening = ["Vex means treat as enemies and trouble them in return.", "The LORD commands Israel to confront Midian for the trap they set."];
  else if (/smite them/.test(lower)) opening = ["Smite means strike in judgment.", "Midian's attack through seduction must be answered by God's command."];
  else if (/wiles/.test(lower)) opening = ["Wiles are schemes or tricks.", "Midian harmed Israel through deception, not only open battle."];
  else if (/matter of peor/.test(lower)) opening = ["Peor is the place tied to Baal-peor worship.", "The phrase remembers the idolatry that brought the plague."];
  else opening = ["This Day 44 phrase needs a direct explanation.", "It belongs to Balaam, Balak, blessing, or the Baal-peor compromise."];

  return note([
    opening[0],
    opening[1],
    ...getDay44NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function explainNumbers10To25At95(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  if (section.chapter >= 10 && section.chapter <= 13) return explainDay41NumbersAt95(section, cleanTitle);
  if (section.chapter >= 14 && section.chapter <= 17) return explainDay42NumbersAt95(section, cleanTitle);
  if (section.chapter >= 18 && section.chapter <= 21) return explainDay43NumbersAt95(section, cleanTitle);
  if (section.chapter >= 22 && section.chapter <= 25) return explainDay44NumbersAt95(section, cleanTitle);

  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake|said unto|speak unto|commanded moses|as the lord commanded/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's movement, worship, judgment, and mercy must be shaped by what the LORD says."];
  else if (/trumpet|blow|alarm/.test(lower)) opening = ["The silver trumpets were signals for Israel's camp.", "They told the people when to gather, move, or prepare for danger."];
  else if (/cloud/.test(lower)) opening = ["The cloud was the visible sign of the LORD's presence guiding Israel.", "The people moved or stayed because God led them."];
  else if (/ark/.test(lower)) opening = ["The ark represented the LORD's covenant presence with Israel.", "Its movement showed that the journey was not merely human travel."];
  else if (/wilderness|journey|set forward|camp|standard/.test(lower)) opening = ["The wilderness journey was ordered by God's command.", "Israel did not move as a loose crowd but as a camp arranged around the LORD."];
  else if (/hobab/.test(lower)) opening = ["Hobab was Moses' relative whom Moses invited to travel with Israel.", "The request shows practical guidance being welcomed while the LORD still leads the journey."];
  else if (/complain|murmur/.test(lower)) opening = ["Complaint means the people are resisting God's care with distrust.", "In Numbers, grumbling turns need into rebellion against the LORD."];
  else if (/manna/.test(lower)) opening = ["Manna was the bread-like food God provided in the wilderness.", "The people's complaint shows them despising daily mercy."];
  else if (/quails|flesh|lust|egypt|graves/.test(lower)) opening = ["The craving for flesh shows Israel's memory of Egypt becoming twisted.", "They remember food while forgetting slavery and rescue."];
  else if (/wrath|fire/.test(lower)) opening = ["The LORD's wrath means holy judgment against rebellion.", "Numbers treats distrust near God's presence as serious, not harmless frustration."];
  else if (/seventy|elders|spirit/.test(lower)) opening = ["The seventy elders were appointed to share the burden with Moses.", "God gives help so leadership does not rest on Moses' strength alone."];
  else if (/miriam|aaron|prophet|meek|servant/.test(lower)) opening = ["Miriam and Aaron challenge Moses' unique role.", "The LORD defends His servant and shows that leadership is His to appoint."];
  else if (/spy|search|land|grapes|eshcol/.test(lower)) opening = ["The spies are sent to examine the promised land.", "The fruit proves the land is good; the test is whether Israel will trust God."];
  else if (/giants|walled|evil report|grasshoppers/.test(lower)) opening = ["The fearful report magnifies the danger over the promise.", "The spies describe real obstacles but interpret them without trust."];
  else if (/caleb|joshua|well able|milk and honey/.test(lower)) opening = ["Caleb and Joshua answer fear with trust in the LORD's promise.", "They do not deny the land's dangers; they believe God is greater."];
  else if (/rebel|stone|captain|go back/.test(lower)) opening = ["Rebellion means Israel refuses the LORD's promise and wants another way.", "Fear turns into a desire to undo the rescue from Egypt."];
  else if (/forty years|carcases|children/.test(lower)) opening = ["The forty years are judgment for unbelief at the edge of the land.", "The wilderness becomes the place where the unbelieving generation falls."];
  else if (/offering|sacrifice|heave|firstfruits|dough|wine|oil|flour/.test(lower)) opening = ["The offering words describe worship Israel must practice in the land.", "Even after judgment, God still teaches a future life of worship."];
  else if (/atonement|forgiven|ignorance/.test(lower)) opening = ["Atonement means guilt is covered before God.", "Numbers distinguishes unintentional sin from defiant rebellion while still providing mercy."];
  else if (/presumptuously/.test(lower)) opening = ["Presumptuously means high-handed, defiant rebellion.", "This is not accidental failure; it is open contempt for the LORD's word."];
  else if (/sabbath|sticks/.test(lower)) opening = ["The Sabbath was holy time guarded by God's command.", "The man gathering sticks tests whether Israel will treat God's rest as serious."];
  else if (/fringes|garment|remember/.test(lower)) opening = ["Fringes were visible reminders on Israel's garments.", "God gave His people a daily way to remember His commands."];
  else if (/korah|dathan|abiram|rebellion/.test(lower)) opening = ["Korah's rebellion challenges the roles God assigned.", "The issue is not ambition only; it is seizing holy service God did not give."];
  else if (/censer|earth opened|rod|budded|plague/.test(lower)) opening = ["The sign or judgment confirms the LORD's chosen order.", "Numbers shows that priesthood is received from God, not taken by force."];
  else if (/levite|priest|charge|tithe|inheritance|heave offering|sanctuary/.test(lower)) opening = ["The priests and Levites have assigned holy responsibility.", "Their work guards the sanctuary so the camp can live near God's presence."];
  else if (/red heifer|ashes|water of separation/.test(lower)) opening = ["The red heifer ritual provides cleansing from contact with death.", "The ashes and water teach that death must be dealt with near the living God."];
  else if (/unclean|dead|cleanse|sprinkle/.test(lower)) opening = ["Unclean means not fit for normal camp or sanctuary access for a time.", "Contact with death required cleansing before return."];
  else if (/rock|water|meribah|speak|smote|believed me not/.test(lower)) opening = ["Meribah is the place where water need and disobedience collide.", "God provides water, but Moses and Aaron fail to honor Him as holy."];
  else if (/edom|aaron died|mount hor/.test(lower)) opening = ["The Edom roadblock and Aaron's death show the journey's cost.", "Israel keeps moving, but leadership and access to the land are affected by disobedience."];
  else if (/serpent|fiery|brass|looked|he lived/.test(lower)) opening = ["The brass serpent was God's provided sign of rescue after judgment.", "The bitten person lived by looking where God commanded."];
  else if (/arum|sihon|og|amorites|smote/.test(lower)) opening = ["The battle language shows the LORD giving Israel victories on the road.", "Enemies cannot stop the journey when God gives the land."];
  else if (/balak|balaam|ass|angel|curse|bless|parable|star|sceptre/.test(lower)) opening = ["Balak hires Balaam to curse Israel, but the LORD controls the outcome.", "Human schemes and paid words cannot overturn God's blessing."];
  else if (/baalpeor|peor|whoredom|phinehas|zeal|plague|midianitish/.test(lower)) opening = ["Baal-peor is Israel's idolatry and sexual rebellion with Moab.", "The sin brings covenant danger into the camp until zeal stops the plague."];
  else if (/children of israel|congregation|people/.test(lower)) opening = ["The covenant people are being addressed as a gathered community.", "Numbers shows the whole camp learning trust, worship, and obedience together."];
  else opening = [`This wording names ${getNumbers10To25DistinctiveTopic(cleanTitle)} in Numbers ${section.chapter}.`, "The phrase gives a concrete part of Israel's wilderness testing and covenant life."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getNumbers10To25DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or response in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getNumbers10To25Support(cleanTitle),
  ].slice(0, 8));
}

function makeNumbersTenToTwentyFiveExplanation(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainNumbers10To25At95(section, title, occurrenceIndex);

  const [lineOne, lineTwo] = getNumbersTenToTwentyFiveMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getNumbersTenToTwentyFiveBullets(title),
  ]);
}

function buildSectionIconByReference(chapters: number[], icons: string[]) {
  return new Map(
    generatedNumbersTenToTwentyFivePersonalSections
      .filter((section) => chapters.includes(section.chapter))
      .map((section, index) => [section.reference, icons[index % icons.length]])
  );
}

const sectionIconByReference = new Map([
  ...buildSectionIconByReference([10, 11, 12, 13], day41SectionIcons),
  ...buildSectionIconByReference([14, 15, 16, 17], day42SectionIcons),
  ...buildSectionIconByReference([18, 19, 20, 21], day43SectionIcons),
  ...buildSectionIconByReference([22, 23, 24, 25], day44SectionIcons),
]);

sectionIconByReference.set("Numbers 16:4-7", "🙇");

function polishNumbersTenToTwentyFiveSection(section: (typeof generatedNumbersTenToTwentyFivePersonalSections)[number]): PersonalSection {
  const icon = sectionIconByReference.get(section.reference);
  if (!icon) return {
    ...section,
    phrases: section.phrases.map(([title, body]) => [title, body] as PersonalPhrase),
  };

  return {
    ...section,
    icon,
    title: `${icon} ${stripLeadingEmoji(section.title)}`,
    phrases: (() => {
      const seen = new Map<string, number>();
      return (
        day41NumbersCuratedPhraseTitles[section.reference] ||
        day42NumbersCuratedPhraseTitles[section.reference] ||
        day43NumbersCuratedPhraseTitles[section.reference] ||
        day44NumbersCuratedPhraseTitles[section.reference] ||
        section.phrases.map(([title]) => title)
      ).map((title) => {
        const key = stripLeadingEmoji(title).toLowerCase();
        const occurrence = seen.get(key) ?? 0;
        seen.set(key, occurrence + 1);
        return [
          title,
          makeNumbersTenToTwentyFiveExplanation(section, title, occurrence),
        ] as PersonalPhrase;
      });
    })(),
  };
}

export const NUMBERS_10_25_PERSONAL_SECTIONS = generatedNumbersTenToTwentyFivePersonalSections.map(polishNumbersTenToTwentyFiveSection);
