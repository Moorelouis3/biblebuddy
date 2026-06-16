import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedDeuteronomyOneToThirteenPersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Our God",
    "Hear O Israel",
    "Keep The Commandments",
    "Remember",
    "The Land Which The LORD Sware",
    "Love The LORD Thy God",
    "With All Thine Heart",
  ],
});

const day47DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 1:1-5": [
    "📣 These Be The Words Which Moses Spake Unto All Israel",
    "🌊 On This Side Jordan In The Wilderness",
    "📅 In The Eleventh Month",
    "📜 According Unto All That The LORD Had Given Him In Commandment",
    "⚔️ After He Had Slain Sihon The King Of The Amorites",
    "👑 Og The King Of Bashan",
    "📖 Moses Began To Declare This Law",
  ],
  "Deuteronomy 1:6-8": [
    "🙌 The LORD Our God Spake Unto Us In Horeb",
    "⛰️ Ye Have Dwelt Long Enough In This Mount",
    "🚶 Turn You, And Take Your Journey",
    "🏞️ Go To The Mount Of The Amorites",
    "👀 Behold, I Have Set The Land Before You",
    "🎁 Go In And Possess The Land",
    "🤝 Which The LORD Sware Unto Your Fathers",
  ],
  "Deuteronomy 1:9-14": [
    "🗣️ I Spake Unto You At That Time",
    "🧱 I Am Not Able To Bear You Myself Alone",
    "🌌 The LORD Your God Hath Multiplied You",
    "🌠 Ye Are This Day As The Stars Of Heaven For Multitude",
    "🏋️ How Can I Myself Alone Bear Your Cumbrance",
    "🧠 Take You Wise Men, And Understanding",
    "✅ The Thing Which Thou Hast Spoken Is Good For Us To Do",
  ],
  "Deuteronomy 1:15-15": [
    "🧑‍⚖️ I Took The Chief Of Your Tribes",
    "🧠 Wise Men, And Known",
    "👥 Made Them Heads Over You",
    "🔢 Captains Over Thousands",
    "🔟 Captains Over Tens",
    "📋 Officers Among Your Tribes",
  ],
  "Deuteronomy 1:16-18": [
    "⚖️ I Charged Your Judges At That Time",
    "👂 Hear The Causes Between Your Brethren",
    "✅ Judge Righteously Between Every Man And His Brother",
    "🌍 And The Stranger That Is With Him",
    "🚫 Ye Shall Not Respect Persons In Judgment",
    "🙌 For The Judgment Is God's",
    "🧠 The Cause That Is Too Hard For You",
  ],
  "Deuteronomy 1:19-24": [
    "🏜️ We Went Through All That Great And Terrible Wilderness",
    "📍 We Came To Kadeshbarnea",
    "🏞️ Ye Are Come Unto The Mountain Of The Amorites",
    "🎁 The LORD Thy God Hath Set The Land Before Thee",
    "🚫 Fear Not, Neither Be Discouraged",
    "🕵️ We Will Send Men Before Us",
    "🧭 They Shall Search Us Out The Land",
  ],
  "Deuteronomy 1:25-25": [
    "🍇 They Took Of The Fruit Of The Land",
    "📦 Brought It Down Unto Us",
    "🗣️ Brought Us Word Again",
    "✅ It Is A Good Land",
    "🎁 Which The LORD Our God Doth Give Us",
  ],
  "Deuteronomy 1:26-31": [
    "🚫 Notwithstanding Ye Would Not Go Up",
    "💔 Rebelled Against The Commandment Of The LORD Your God",
    "🏕️ Ye Murmured In Your Tents",
    "❌ Because The LORD Hated Us",
    "😨 Our Brethren Have Discouraged Our Heart",
    "🏙️ The Cities Are Great And Walled Up To Heaven",
    "🙌 The LORD Your God Which Goeth Before You",
  ],
  "Deuteronomy 1:32-33": [
    "🚫 Yet In This Thing Ye Did Not Believe The LORD Your God",
    "⚔️ He Shall Fight For You",
    "👨‍👦 As A Man Doth Bear His Son",
    "🚶 In All The Way That Ye Went",
    "🔥 Who Went In The Way Before You",
    "⛺ To Search You Out A Place To Pitch Your Tents",
    "🌙 In Fire By Night",
  ],
  "Deuteronomy 1:34-39": [
    "👂 The LORD Heard The Voice Of Your Words",
    "🔥 And Was Wroth",
    "🚫 There Shall Not One Of These Men See That Good Land",
    "✅ Save Caleb The Son Of Jephunneh",
    "🧭 Joshua The Son Of Nun, Which Standeth Before Thee",
    "👶 Your Little Ones, Which Ye Said Should Be A Prey",
    "🎁 Unto Them Will I Give It",
  ],
  "Deuteronomy 1:40-40": [
    "↩️ But As For You",
    "🔄 Turn You",
    "🚶 Take Your Journey Into The Wilderness",
    "🌊 By The Way Of The Red Sea",
  ],
  "Deuteronomy 1:41-46": [
    "🗣️ We Have Sinned Against The LORD",
    "⚔️ We Will Go Up And Fight",
    "🚫 Go Not Up",
    "⚠️ For I Am Not Among You",
    "🙉 Ye Would Not Hear",
    "⛰️ Went Presumptuously Up Into The Hill",
    "😭 Ye Returned And Wept Before The LORD",
  ],
};

const day47DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 1:1-5": "📖 Moses Begins To Declare The Law",
  "Deuteronomy 1:6-8": "⛰️ Long Enough At Horeb",
  "Deuteronomy 1:9-14": "👥 Moses Shares The Burden",
  "Deuteronomy 1:15-15": "🧑‍⚖️ Leaders Over The People",
  "Deuteronomy 1:16-18": "⚖️ Judges Must Judge Righteously",
  "Deuteronomy 1:19-24": "🏜️ From Wilderness To Kadeshbarnea",
  "Deuteronomy 1:25-25": "🍇 The Land Was Good",
  "Deuteronomy 1:26-31": "💔 Fear Became Rebellion",
  "Deuteronomy 1:32-33": "🔥 The LORD Had Carried Them",
  "Deuteronomy 1:34-39": "✅ Caleb, Joshua, And The Children",
  "Deuteronomy 1:40-40": "↩️ Back Toward The Wilderness",
  "Deuteronomy 1:41-46": "😭 Presumption And Defeat",
};

const day48DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 2:1-6": [
    "🧭 Then We Turned",
    "📣 As The LORD Spake Unto Me",
    "⛰️ Ye Have Compassed This Mountain Long Enough",
    "🧭 Turn You Northward",
    "🏔️ Your Brethren The Children Of Esau, Which Dwell In Seir",
    "⚠️ Take Ye Good Heed Unto Yourselves Therefore",
  ],
  "Deuteronomy 2:7-7": [
    "🚫 Meddle Not With Them",
    "🏞️ I Will Not Give You Of Their Land",
    "👣 Not So Much As A Foot Breadth",
    "🎁 I Have Given Mount Seir Unto Esau For A Possession",
  ],
  "Deuteronomy 2:6-11": [
    "🍞 Ye Shall Buy Meat Of Them For Money",
    "💧 Ye Shall Also Buy Water Of Them For Money",
    "🙌 The LORD Thy God Hath Blessed Thee",
    "🚶 He Knoweth Thy Walking Through This Great Wilderness",
    "📆 These Forty Years The LORD Thy God Hath Been With Thee",
    "✅ Thou Hast Lacked Nothing",
    "🏙️ Through The Way Of The Plain From Elath",
  ],
  "Deuteronomy 2:12-12": [
    "🚫 Distress Not The Moabites",
    "⚔️ Neither Contend With Them In Battle",
    "🎁 I Have Given Ar Unto The Children Of Lot",
    "📏 For A Possession",
    "🦣 A People Great, And Many, And Tall, As The Anakims",
    "🏠 The Children Of Esau Succeeded Them",
  ],
  "Deuteronomy 2:13-18": [
    "⬆️ Now Rise Up",
    "🌊 Get You Over The Brook Zered",
    "📆 Thirty And Eight Years",
    "⚰️ All The Generation Of The Men Of War Were Wasted Out",
    "✋ The Hand Of The LORD Was Against Them",
    "📣 The LORD Spake Unto Me",
    "🏙️ Thou Art To Pass Over Through Ar",
  ],
  "Deuteronomy 2:19-23": [
    "🚫 Distress Them Not",
    "🤲 Nor Meddle With Them",
    "🏞️ I Will Not Give Thee Of The Land Of The Children Of Ammon",
    "🎁 I Have Given It Unto The Children Of Lot",
    "🦣 Giants Dwelt Therein In Old Time",
    "🏷️ The Ammonites Call Them Zamzummims",
    "🔥 The LORD Destroyed Them Before Them",
  ],
  "Deuteronomy 2:24-29": [
    "⬆️ Rise Ye Up",
    "🌊 Pass Over The River Arnon",
    "👑 Sihon The Amorite, King Of Heshbon",
    "🎁 I Have Given Into Thine Hand",
    "⚔️ Begin To Possess It",
    "🕊️ I Sent Messengers Out Of The Wilderness Of Kedemoth",
    "🛣️ Let Me Pass Through Thy Land",
  ],
  "Deuteronomy 2:30-30": [
    "🛣️ I Will Go Along By The High Way",
    "🍞 Thou Shalt Sell Me Meat For Money",
    "💧 Give Me Water For Money",
    "🚶 Until I Shall Pass Over Jordan",
    "🏞️ Into The Land Which The LORD Our God Giveth Us",
  ],
  "Deuteronomy 2:31-36": [
    "📣 The LORD Said Unto Me",
    "👀 Behold, I Have Begun To Give Sihon And His Land Before Thee",
    "⚔️ Begin To Possess",
    "⚔️ Sihon Came Out Against Us",
    "🙌 The LORD Our God Delivered Him Before Us",
    "🏙️ We Took All His Cities",
    "🚫 There Was Not One City Too Strong For Us",
  ],
  "Deuteronomy 2:37-37": [
    "🐄 Only The Cattle We Took For A Prey Unto Ourselves",
    "📦 The Spoil Of The Cities",
    "🌊 From Aroer, Which Is By The Brink Of The River Of Arnon",
    "⛰️ Even Unto Gilead",
    "📜 The LORD Our God Forbad Us",
  ],
  "Deuteronomy 3:1-6": [
    "🧭 Then We Turned",
    "⛰️ Went Up The Way To Bashan",
    "👑 Og The King Of Bashan Came Out Against Us",
    "⚔️ To Battle At Edrei",
    "🚫 Fear Him Not",
    "🤲 I Will Deliver Him",
    "⚔️ Thou Shalt Do Unto Him As Thou Didst Unto Sihon",
  ],
  "Deuteronomy 3:7-7": [
    "🙌 The LORD Our God Delivered Into Our Hands",
    "👥 Og Also, The King Of Bashan",
    "🏙️ All His Cities",
    "🚫 There Was Not A City Which We Took Not From Them",
    "🏔️ All The Region Of Argob",
    "🏘️ Unwalled Towns A Great Many",
  ],
  "Deuteronomy 3:6-11": [
    "⚔️ We Utterly Destroyed Them",
    "👑 As We Did Unto Sihon King Of Heshbon",
    "🐄 All The Cattle, And The Spoil Of The Cities",
    "🌊 From The River Of Arnon Unto Mount Hermon",
    "🏷️ Hermon The Sidonians Call Sirion",
    "🛏️ His Bedstead Was A Bedstead Of Iron",
    "📏 Nine Cubits Was The Length Thereof",
  ],
  "Deuteronomy 3:12-17": [
    "🏞️ Which We Possessed At That Time",
    "🌊 From Aroer, Which Is By The River Arnon",
    "⛰️ Half Mount Gilead",
    "🏰 All Bashan, Being The Kingdom Of Og",
    "🌓 Gave I Unto The Half Tribe Of Manasseh",
    "🏠 Unto The Reubenites And Unto The Gadites",
    "🌊 Jordan, And The Coast Thereof",
  ],
  "Deuteronomy 3:18-22": [
    "📣 I Commanded You At That Time",
    "⚔️ Ye Shall Pass Over Armed Before Your Brethren",
    "🏠 Your Wives, And Your Little Ones",
    "🐄 I Know That Ye Have Much Cattle",
    "🕊️ Until The LORD Have Given Rest Unto Your Brethren",
    "👀 Thine Eyes Have Seen All That The LORD Your God Hath Done",
    "⚔️ Ye Shall Not Fear Them",
  ],
  "Deuteronomy 3:23-28": [
    "🙏 I Besought The LORD At That Time",
    "🙌 Thou Hast Begun To Shew Thy Servant Thy Greatness",
    "💪 Thy Mighty Hand",
    "❓ What God Is There In Heaven Or In Earth",
    "👀 Let Me Go Over, And See The Good Land",
    "😠 The LORD Was Wroth With Me For Your Sakes",
    "🧭 Charge Joshua, And Encourage Him",
  ],
  "Deuteronomy 3:29-29": [
    "🚫 Let It Suffice Thee",
    "🛑 Speak No More Unto Me Of This Matter",
    "👀 Lift Up Thine Eyes Westward",
    "⛰️ Thou Shalt Not Go Over This Jordan",
    "🧭 Joshua... Shall Go Over Before This People",
    "🏞️ He Shall Cause Them To Inherit The Land",
  ],
  "Deuteronomy 4:1-4": [
    "👂 Now Therefore Hearken",
    "📜 Unto The Statutes And Unto The Judgments",
    "🧠 Which I Teach You",
    "✅ For To Do Them",
    "🌱 That Ye May Live",
    "🚫 Ye Shall Not Add Unto The Word",
    "🚫 Neither Shall Ye Diminish Ought From It",
  ],
  "Deuteronomy 4:5-8": [
    "📚 I Have Taught You Statutes And Judgments",
    "📣 As The LORD My God Commanded Me",
    "👀 Keep Therefore And Do Them",
    "🧠 This Is Your Wisdom And Your Understanding",
    "🌍 In The Sight Of The Nations",
    "🙌 Who Hath God So Nigh Unto Them",
    "⚖️ Statutes And Judgments So Righteous",
  ],
  "Deuteronomy 4:9-14": [
    "⚠️ Only Take Heed To Thyself",
    "🧠 Keep Thy Soul Diligently",
    "🚫 Lest Thou Forget The Things Which Thine Eyes Have Seen",
    "👨‍👩‍👧 Teach Them Thy Sons",
    "👶 Thy Sons' Sons",
    "🔥 Ye Stood Before The LORD Your God In Horeb",
    "📜 He Declared Unto You His Covenant",
  ],
  "Deuteronomy 4:15-20": [
    "⚠️ Take Ye Therefore Good Heed Unto Yourselves",
    "👀 Ye Saw No Manner Of Similitude",
    "🚫 Lest Ye Corrupt Yourselves",
    "🗿 Make You A Graven Image",
    "🧍 The Likeness Of Male Or Female",
    "🐂 The Likeness Of Any Beast",
    "☀️ Lest Thou Lift Up Thine Eyes Unto Heaven",
  ],
  "Deuteronomy 4:21-24": [
    "😠 The LORD Was Angry With Me For Your Sakes",
    "🌊 I Should Not Go Over Jordan",
    "🏞️ The Good Land, Which The LORD Thy God Giveth Thee",
    "⚰️ I Must Die In This Land",
    "⚠️ Take Heed Unto Yourselves",
    "🚫 Forget The Covenant Of The LORD Your God",
    "🔥 The LORD Thy God Is A Consuming Fire",
  ],
  "Deuteronomy 4:25-30": [
    "👶 When Thou Shalt Beget Children",
    "🏞️ Remained Long In The Land",
    "🚫 Shall Corrupt Yourselves",
    "🗿 Make A Graven Image",
    "😠 To Provoke Him To Anger",
    "🌍 Ye Shall Soon Utterly Perish From Off The Land",
    "🔍 If From Thence Thou Shalt Seek The LORD Thy God",
  ],
  "Deuteronomy 4:31-31": [
    "🕊️ The LORD Thy God Is A Merciful God",
    "🤝 He Will Not Forsake Thee",
    "🚫 Neither Destroy Thee",
    "🧠 Nor Forget The Covenant Of Thy Fathers",
    "🪵 The Work Of Men's Hands, Wood And Stone",
    "👀 Which Neither See, Nor Hear, Nor Eat, Nor Smell",
  ],
  "Deuteronomy 4:32-37": [
    "🔙 Ask Now Of The Days That Are Past",
    "🌍 Since The Day That God Created Man Upon The Earth",
    "👂 Did Ever People Hear The Voice Of God",
    "🔥 Speaking Out Of The Midst Of The Fire",
    "💪 By A Mighty Hand",
    "🙌 Unto Thee It Was Shewed",
    "❤️ Because He Loved Thy Fathers",
  ],
  "Deuteronomy 4:38-40": [
    "💪 By A Stretched Out Arm",
    "🔥 By Great Terrors",
    "🙌 The LORD He Is God",
    "🚫 There Is None Else Beside Him",
    "📜 Keep Therefore His Statutes",
    "🌱 That It May Go Well With Thee",
    "👶 And With Thy Children After Thee",
  ],
  "Deuteronomy 4:41-46": [
    "🏃 That The Slayer Might Flee Thither",
    "🩸 Kill His Neighbour Unawares",
    "🚫 Hated Him Not In Times Past",
    "🏙️ Bezer In The Wilderness",
    "🏙️ Ramoth In Gilead",
    "⚖️ These Are The Testimonies",
    "📍 On This Side Jordan",
  ],
  "Deuteronomy 4:47-49": [
    "🏙️ Golan In Bashan",
    "👑 Sihon King Of The Amorites",
    "👑 Og King Of Bashan",
    "📜 These Are The Testimonies",
    "⚖️ The Statutes And The Judgments",
    "📣 Which Moses Spake Unto The Children Of Israel",
    "🚪 After They Came Forth Out Of Egypt",
  ],
  "Deuteronomy 5:2-5": [
    "🤝 The LORD Our God Made A Covenant With Us In Horeb",
    "👥 But With Us",
    "🗣️ The LORD Talked With You Face To Face",
    "🔥 In The Mount Out Of The Midst Of The Fire",
    "🧍 I Stood Between The LORD And You",
    "📖 To Shew You The Word Of The LORD",
    "😨 Ye Were Afraid By Reason Of The Fire",
  ],
  "Deuteronomy 5:8-10": [
    "🗿 Thou Shalt Not Make Thee Any Graven Image",
    "🌌 In Heaven Above",
    "🌍 In The Earth Beneath",
    "🌊 In The Waters Beneath The Earth",
    "🙇 Thou Shalt Not Bow Down Thyself Unto Them",
    "🛠️ Nor Serve Them",
    "🔥 I The LORD Thy God Am A Jealous God",
  ],
  "Deuteronomy 5:12-15": [
    "🕊️ Keep The Sabbath Day To Sanctify It",
    "🛠️ Six Days Thou Shalt Labour",
    "🚫 In It Thou Shalt Not Do Any Work",
    "👨‍👩‍👧 Nor Thy Son, Nor Thy Daughter",
    "🧑‍🌾 Nor Thy Manservant, Nor Thy Maidservant",
    "🐄 Nor Thine Ox, Nor Thine Ass",
    "🧠 Remember That Thou Wast A Servant In The Land Of Egypt",
  ],
  "Deuteronomy 5:23-27": [
    "🔥 The Mountain Did Burn With Fire",
    "👥 All The Heads Of Your Tribes, And Your Elders",
    "🙌 The LORD Our God Hath Shewed Us His Glory",
    "👂 We Have Heard His Voice Out Of The Midst Of The Fire",
    "❓ Why Should We Die?",
    "🔥 This Great Fire Will Consume Us",
    "🧍 Go Thou Near, And Hear All That The LORD Our God Shall Say",
  ],
  "Deuteronomy 5:28-31": [
    "👂 The LORD Heard The Voice Of Your Words",
    "✅ They Have Well Said All That They Have Spoken",
    "❤️ O That There Were Such An Heart In Them",
    "🙏 That They Would Fear Me",
    "📜 Keep All My Commandments Always",
    "🌱 That It Might Be Well With Them",
    "👶 And With Their Children For Ever",
  ],
  "Deuteronomy 5:32-33": [
    "⚠️ Observe To Do",
    "🚫 Ye Shall Not Turn Aside To The Right Hand Or To The Left",
    "🚶 Ye Shall Walk In All The Ways",
    "🌱 That Ye May Live",
    "🕊️ That It May Be Well With You",
    "⏳ Prolong Your Days In The Land",
  ],
};

const day48DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 2:1-6": "🧭 Around Seir",
  "Deuteronomy 2:7-7": "🚫 Do Not Take Esau's Land",
  "Deuteronomy 2:6-11": "🍞 Buy Food And Water",
  "Deuteronomy 2:12-12": "🚫 Do Not Fight Moab",
  "Deuteronomy 2:13-18": "🌊 Over The Brook Zered",
  "Deuteronomy 2:19-23": "🤲 Do Not Meddle With Ammon",
  "Deuteronomy 2:24-29": "⚔️ Begin To Possess Sihon's Land",
  "Deuteronomy 2:30-30": "🛣️ The Peaceful Request",
  "Deuteronomy 2:31-36": "🏙️ Sihon Defeated",
  "Deuteronomy 2:37-37": "📜 Where Israel Did Not Go",
  "Deuteronomy 3:1-6": "⚔️ Og King Of Bashan",
  "Deuteronomy 3:7-7": "🏙️ Bashan's Cities Taken",
  "Deuteronomy 3:6-11": "🛏️ Og's Iron Bedstead",
  "Deuteronomy 3:12-17": "🏞️ East-Jordan Inheritance",
  "Deuteronomy 3:18-22": "🛡️ Armed Before Your Brethren",
  "Deuteronomy 3:23-28": "🙏 Moses Pleads To Enter",
  "Deuteronomy 3:29-29": "🧭 Joshua Must Lead",
  "Deuteronomy 4:1-4": "👂 Hear And Do",
  "Deuteronomy 4:5-8": "🧠 Israel's Wisdom Before The Nations",
  "Deuteronomy 4:9-14": "🧠 Remember And Teach",
  "Deuteronomy 4:15-20": "🚫 No Graven Image",
  "Deuteronomy 4:21-24": "🔥 A Consuming Fire",
  "Deuteronomy 4:25-30": "🔍 Seeking After Corruption",
  "Deuteronomy 4:31-31": "🕊️ A Merciful God",
  "Deuteronomy 4:32-37": "🔥 God Spoke From The Fire",
  "Deuteronomy 4:38-40": "🙌 There Is None Else",
  "Deuteronomy 4:41-46": "🏃 Cities Of Refuge East Of Jordan",
  "Deuteronomy 4:47-49": "📜 Testimonies East Of Jordan",
  "Deuteronomy 5:2-5": "🤝 Covenant At Horeb",
  "Deuteronomy 5:8-10": "🗿 No Images",
  "Deuteronomy 5:12-15": "🕊️ The Sabbath Command",
  "Deuteronomy 5:23-27": "🔥 Afraid At The Mountain",
  "Deuteronomy 5:28-31": "❤️ O That There Were Such An Heart",
  "Deuteronomy 5:32-33": "🚶 Walk In All The Ways",
};

const day49DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 6:1-3": [
    "📜 These Are The Commandments",
    "⚖️ The Statutes, And The Judgments",
    "👨‍👩‍👧 Thou, And Thy Son, And Thy Son's Son",
    "📆 All The Days Of Thy Life",
    "👂 Hear Therefore, O Israel",
    "🍯 A Land That Floweth With Milk And Honey",
  ],
  "Deuteronomy 6:6-7": [
    "👂 Hear, O Israel",
    "🙌 The LORD Our God Is One LORD",
    "❤️ Thou Shalt Love The LORD Thy God",
    "🫀 With All Thine Heart",
    "💪 With All Thy Might",
    "👧 Thou Shalt Teach Them Diligently Unto Thy Children",
    "🏠 When Thou Sittest In Thine House",
  ],
  "Deuteronomy 6:8-9": [
    "✋ Thou Shalt Bind Them For A Sign Upon Thine Hand",
    "👀 They Shall Be As Frontlets Between Thine Eyes",
    "🚪 Thou Shalt Write Them Upon The Posts Of Thy House",
    "🏙️ And On Thy Gates",
  ],
  "Deuteronomy 6:10-12": [
    "🤝 Which He Sware Unto Thy Fathers",
    "🏙️ Great And Goodly Cities, Which Thou Buildedst Not",
    "🏠 Houses Full Of All Good Things, Which Thou Filledst Not",
    "💧 Wells Digged, Which Thou Diggedst Not",
    "🌳 Vineyards And Olive Trees, Which Thou Plantedst Not",
    "🍽️ When Thou Shalt Have Eaten And Be Full",
    "⚠️ Beware Lest Thou Forget The LORD",
  ],
  "Deuteronomy 6:13-15": [
    "🙇 Thou Shalt Fear The LORD Thy God",
    "🛠️ And Serve Him",
    "🗣️ Shalt Swear By His Name",
    "🚫 Ye Shall Not Go After Other Gods",
    "🔥 The LORD Thy God Is A Jealous God Among You",
    "🧹 Destroy Thee From Off The Face Of The Earth",
  ],
  "Deuteronomy 6:17-19": [
    "📜 Ye Shall Diligently Keep The Commandments",
    "🧾 His Testimonies",
    "⚖️ His Statutes",
    "✅ Thou Shalt Do That Which Is Right And Good",
    "🌱 That It May Be Well With Thee",
    "🏞️ Go In And Possess The Good Land",
    "🧹 Cast Out All Thine Enemies From Before Thee",
  ],
  "Deuteronomy 6:20-23": [
    "👦 When Thy Son Asketh Thee In Time To Come",
    "❓ What Mean The Testimonies",
    "⛓️ We Were Pharaoh's Bondmen In Egypt",
    "💪 The LORD Brought Us Out Of Egypt With A Mighty Hand",
    "✨ Signs And Wonders, Great And Sore",
    "🏠 Upon Egypt, Upon Pharaoh, And Upon All His Household",
    "🎁 That He Might Bring Us In",
  ],
  "Deuteronomy 6:24-25": [
    "📣 The LORD Commanded Us To Do All These Statutes",
    "🙇 To Fear The LORD Our God",
    "✅ For Our Good Always",
    "🌱 That He Might Preserve Us Alive",
    "⚖️ It Shall Be Our Righteousness",
    "👀 If We Observe To Do All These Commandments",
  ],
  "Deuteronomy 7:1-2": [
    "🏞️ When The LORD Thy God Shall Bring Thee Into The Land",
    "🌍 Hath Cast Out Many Nations Before Thee",
    "💪 Seven Nations Greater And Mightier Than Thou",
    "🤲 The LORD Thy God Shall Deliver Them Before Thee",
    "🚫 Thou Shalt Make No Covenant With Them",
    "🕊️ Nor Shew Mercy Unto Them",
  ],
  "Deuteronomy 7:3-4": [
    "💍 Neither Shalt Thou Make Marriages With Them",
    "👧 Thy Daughter Thou Shalt Not Give Unto His Son",
    "👦 Nor His Daughter Shalt Thou Take Unto Thy Son",
    "🔄 They Will Turn Away Thy Son From Following Me",
    "🛐 That They May Serve Other Gods",
    "🔥 The Anger Of The LORD Be Kindled Against You",
  ],
  "Deuteronomy 7:7-8": [
    "❤️ The LORD Did Not Set His Love Upon You",
    "✅ Nor Choose You",
    "🔢 Because Ye Were More In Number Than Any People",
    "📉 Ye Were The Fewest Of All People",
    "❤️ Because The LORD Loved You",
    "🤝 Because He Would Keep The Oath",
    "🔓 Redeemed You Out Of The House Of Bondmen",
  ],
  "Deuteronomy 7:9-11": [
    "🧠 Know Therefore That The LORD Thy God",
    "🙌 He Is God",
    "👑 The Faithful God",
    "🤝 Keepeth Covenant And Mercy",
    "❤️ Them That Love Him",
    "⚖️ Repayeth Them That Hate Him To Their Face",
    "📜 Keep The Commandments",
  ],
  "Deuteronomy 7:12-15": [
    "👂 If Ye Hearken To These Judgments",
    "✅ Keep, And Do Them",
    "🤝 The LORD Thy God Shall Keep Unto Thee The Covenant",
    "❤️ He Will Love Thee",
    "🌾 Bless The Fruit Of Thy Land",
    "🐄 The Increase Of Thy Kine",
    "🕊️ The LORD Will Take Away From Thee All Sickness",
  ],
  "Deuteronomy 7:17-19": [
    "🫀 If Thou Shalt Say In Thine Heart",
    "😨 These Nations Are More Than I",
    "❓ How Can I Dispossess Them?",
    "🧠 Thou Shalt Well Remember",
    "👑 What The LORD Thy God Did Unto Pharaoh",
    "✨ The Signs, And The Wonders",
    "💪 The Mighty Hand, And The Stretched Out Arm",
  ],
  "Deuteronomy 7:20-21": [
    "🐝 The LORD Thy God Will Send The Hornet",
    "🕳️ They That Are Left, And Hide Themselves From Thee",
    "🚫 Thou Shalt Not Be Affrighted At Them",
    "🙌 The LORD Thy God Is Among You",
    "💪 A Mighty God And Terrible",
  ],
  "Deuteronomy 7:22-24": [
    "🐢 The LORD Thy God Will Put Out Those Nations By Little And Little",
    "⚠️ Thou Mayest Not Consume Them At Once",
    "🐾 Lest The Beasts Of The Field Increase Upon Thee",
    "🤲 The LORD Thy God Shall Deliver Them Unto Thee",
    "🧹 Destroy Them With A Mighty Destruction",
    "🚫 No Man Be Able To Stand Before Thee",
  ],
  "Deuteronomy 7:25-26": [
    "🔥 The Graven Images Of Their Gods Shall Ye Burn With Fire",
    "🚫 Thou Shalt Not Desire The Silver Or Gold",
    "🪤 Lest Thou Be Snared Therein",
    "🏠 Neither Shalt Thou Bring An Abomination Into Thine House",
    "🤢 Thou Shalt Utterly Detest It",
    "🚫 For It Is A Cursed Thing",
  ],
  "Deuteronomy 8:5-6": [
    "🫀 Consider In Thine Heart",
    "👨‍👦 As A Man Chasteneth His Son",
    "📜 Keep The Commandments Of The LORD Thy God",
    "🚶 To Walk In His Ways",
    "🙇 And To Fear Him",
  ],
  "Deuteronomy 8:7-9": [
    "🏞️ The LORD Thy God Bringeth Thee Into A Good Land",
    "💧 Brooks Of Water",
    "🌾 Wheat, And Barley",
    "🍇 Vines, And Fig Trees, And Pomegranates",
    "🫒 Oil Olive, And Honey",
    "🍞 Bread Without Scarceness",
    "⛏️ Out Of Whose Hills Thou Mayest Dig Brass",
  ],
  "Deuteronomy 8:11-14": [
    "⚠️ Beware That Thou Forget Not The LORD Thy God",
    "🚫 In Not Keeping His Commandments",
    "🍽️ When Thou Hast Eaten And Art Full",
    "🏠 Built Goodly Houses",
    "🐄 Thy Herds And Thy Flocks Multiply",
    "💰 Thy Silver And Thy Gold Is Multiplied",
    "⬆️ Thine Heart Be Lifted Up",
  ],
  "Deuteronomy 8:15-16": [
    "🏜️ That Great And Terrible Wilderness",
    "🐍 Fiery Serpents",
    "💧 Where There Was No Water",
    "⛺ Fed Thee In The Wilderness With Manna",
    "❓ Which Thy Fathers Knew Not",
    "⬇️ That He Might Humble Thee",
    "🧪 That He Might Prove Thee",
  ],
  "Deuteronomy 8:17-18": [
    "🗣️ Thou Say In Thine Heart",
    "💪 My Power And The Might Of Mine Hand",
    "💰 Hath Gotten Me This Wealth",
    "🧠 Remember The LORD Thy God",
    "🤲 He It Is That Giveth Thee Power To Get Wealth",
    "🤝 That He May Establish His Covenant",
  ],
  "Deuteronomy 8:19-20": [
    "⚠️ If Thou Do At All Forget The LORD Thy God",
    "🚶 Walk After Other Gods",
    "🛠️ Serve Them",
    "🙇 Worship Them",
    "📣 I Testify Against You This Day",
    "⚰️ Ye Shall Surely Perish",
  ],
  "Deuteronomy 9:1-3": [
    "🌊 Thou Art To Pass Over Jordan This Day",
    "🏙️ Cities Great And Fenced Up To Heaven",
    "🦣 A People Great And Tall",
    "🏠 The Children Of The Anakims",
    "🔥 The LORD Thy God Is He Which Goeth Over Before Thee",
    "🔥 As A Consuming Fire",
    "🤲 He Shall Bring Them Down Before Thy Face",
  ],
  "Deuteronomy 9:4-5": [
    "🫀 Speak Not Thou In Thine Heart",
    "✅ For My Righteousness",
    "🏞️ The LORD Hath Brought Me In To Possess This Land",
    "🚫 Not For Thy Righteousness",
    "⚠️ For The Wickedness Of These Nations",
    "🤝 That He May Perform The Word",
  ],
  "Deuteronomy 9:7-8": [
    "🧠 Remember, And Forget Not",
    "😠 How Thou Provokedst The LORD Thy God To Wrath",
    "🏜️ In The Wilderness",
    "👶 From The Day That Thou Didst Depart Out Of Egypt",
    "🚫 Ye Have Been Rebellious Against The LORD",
    "⛰️ Also In Horeb Ye Provoked The LORD To Wrath",
  ],
  "Deuteronomy 9:9-11": [
    "⛰️ I Was Gone Up Into The Mount",
    "🪨 The Tables Of Stone",
    "🤝 The Tables Of The Covenant",
    "🍞 I Neither Did Eat Bread Nor Drink Water",
    "🔥 The LORD Spake With You In The Mount Out Of The Midst Of The Fire",
    "✍️ Written With The Finger Of God",
  ],
  "Deuteronomy 9:12-14": [
    "📣 The LORD Said Unto Me",
    "⬇️ Get Thee Down Quickly From Hence",
    "🚫 They Have Quickly Turned Aside",
    "🛤️ Out Of The Way Which I Commanded Them",
    "🐄 They Have Made Them A Molten Image",
    "🦴 It Is A Stiffnecked People",
    "🧹 Blot Out Their Name From Under Heaven",
  ],
  "Deuteronomy 9:15-17": [
    "⬇️ I Turned And Came Down From The Mount",
    "🔥 The Mount Burned With Fire",
    "🐄 Ye Had Made You A Molten Calf",
    "🚫 Ye Had Turned Aside Quickly",
    "🪨 I Took The Two Tables",
    "💥 Brake Them Before Your Eyes",
  ],
  "Deuteronomy 9:18-19": [
    "🙏 I Fell Down Before The LORD",
    "📆 Forty Days And Forty Nights",
    "🍞 I Did Neither Eat Bread, Nor Drink Water",
    "😈 Because Of All Your Sins",
    "🔥 The LORD Was Angry With You To Destroy You",
    "👂 The LORD Hearkened Unto Me",
  ],
  "Deuteronomy 9:20-21": [
    "😠 The LORD Was Very Angry With Aaron",
    "🙏 I Prayed For Aaron Also",
    "🐄 The Calf Which Ye Had Made",
    "🔥 Burnt It With Fire",
    "🧂 Ground It Very Small",
    "🌊 Cast The Dust Thereof Into The Brook",
  ],
  "Deuteronomy 9:22-24": [
    "📍 At Taberah",
    "📍 At Massah",
    "📍 At Kibrothhattaavah",
    "📍 When The LORD Sent You From Kadeshbarnea",
    "🚫 Ye Believed Him Not",
    "🚫 Ye Have Been Rebellious Against The LORD",
  ],
  "Deuteronomy 9:25-26": [
    "🙏 I Fell Down Before The LORD Forty Days And Forty Nights",
    "🧹 Destroy Not Thy People",
    "🎁 Thine Inheritance",
    "🔓 Which Thou Hast Redeemed Through Thy Greatness",
    "💪 Which Thou Hast Brought Forth Out Of Egypt With A Mighty Hand",
  ],
  "Deuteronomy 9:27-29": [
    "🧠 Remember Thy Servants, Abraham, Isaac, And Jacob",
    "🚫 Look Not Unto The Stubbornness Of This People",
    "😈 Nor To Their Wickedness",
    "🗣️ Lest The Land Whence Thou Broughtest Us Out Say",
    "❌ Because The LORD Was Not Able",
    "❤️ Because He Hated Them",
    "🙌 They Are Thy People And Thine Inheritance",
  ],
};

const day49DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 6:1-3": "👂 Hear And Fear The LORD",
  "Deuteronomy 6:6-7": "❤️ Love The LORD With All Thy Heart",
  "Deuteronomy 6:8-9": "✋ Bind And Write The Words",
  "Deuteronomy 6:10-12": "⚠️ Do Not Forget In Fullness",
  "Deuteronomy 6:13-15": "🙇 Fear The LORD Alone",
  "Deuteronomy 6:17-19": "✅ Do Right And Good",
  "Deuteronomy 6:20-23": "👦 When Thy Son Asketh",
  "Deuteronomy 6:24-25": "🌱 For Our Good Always",
  "Deuteronomy 7:1-2": "🚫 No Covenant With The Nations",
  "Deuteronomy 7:3-4": "💍 No Marriages That Turn The Heart",
  "Deuteronomy 7:7-8": "❤️ Loved Because He Loved You",
  "Deuteronomy 7:9-11": "👑 The Faithful God",
  "Deuteronomy 7:12-15": "🌾 Covenant Blessing",
  "Deuteronomy 7:17-19": "🧠 Remember Egypt When Afraid",
  "Deuteronomy 7:20-21": "💪 A Mighty God And Terrible",
  "Deuteronomy 7:22-24": "🐢 Little By Little",
  "Deuteronomy 7:25-26": "🔥 Burn The Images",
  "Deuteronomy 8:5-6": "👨‍👦 Chastened As A Son",
  "Deuteronomy 8:7-9": "🏞️ The Good Land",
  "Deuteronomy 8:11-14": "⚠️ Beware Fullness",
  "Deuteronomy 8:15-16": "🏜️ The Wilderness That Humbled",
  "Deuteronomy 8:17-18": "💰 Remember Who Gives Wealth",
  "Deuteronomy 8:19-20": "⚰️ If You Forget",
  "Deuteronomy 9:1-3": "🔥 The LORD Goes Before",
  "Deuteronomy 9:4-5": "🚫 Not For Thy Righteousness",
  "Deuteronomy 9:7-8": "🧠 Remember Rebellion",
  "Deuteronomy 9:9-11": "🪨 The Tables Of The Covenant",
  "Deuteronomy 9:12-14": "🐄 The Molten Image",
  "Deuteronomy 9:15-17": "💥 The Tables Broken",
  "Deuteronomy 9:18-19": "🙏 Moses Fell Down Again",
  "Deuteronomy 9:20-21": "🔥 The Calf Destroyed",
  "Deuteronomy 9:22-24": "📍 Rebellion Repeated",
  "Deuteronomy 9:25-26": "🙏 Destroy Not Thy People",
  "Deuteronomy 9:27-29": "🧠 Remember Abraham, Isaac, And Jacob",
};

const day50DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 10:14-15": [
    "🌌 Behold, The Heaven And The Heaven Of Heavens Is The LORD'S Thy God",
    "🌍 The Earth Also, With All That Therein Is",
    "❤️ Only The LORD Had A Delight In Thy Fathers To Love Them",
    "🌱 And He Chose Their Seed After Them",
    "👥 Even You Above All People",
    "📅 As It Is This Day",
  ],
  "Deuteronomy 10:18-19": [
    "⚖️ He Doth Execute The Judgment Of The Fatherless And Widow",
    "👥 And Loveth The Stranger",
    "🍞 In Giving Him Food And Raiment",
    "❤️ Love Ye Therefore The Stranger",
    "⛓️ For Ye Were Strangers In The Land Of Egypt",
  ],
  "Deuteronomy 11:10-12": [
    "🏞️ The Land, Whither Thou Goest In To Possess It",
    "🚫 Is Not As The Land Of Egypt",
    "🌱 Where Thou Sowedst Thy Seed",
    "🦶 And Wateredst It With Thy Foot",
    "🌿 As A Garden Of Herbs",
    "🌧️ Drinketh Water Of The Rain Of Heaven",
    "👀 The Eyes Of The LORD Thy God Are Always Upon It",
  ],
  "Deuteronomy 11:13-15": [
    "👂 If Ye Shall Hearken Diligently Unto My Commandments",
    "❤️ To Love The LORD Your God",
    "🙌 And To Serve Him With All Your Heart And With All Your Soul",
    "🌧️ I Will Give You The Rain Of Your Land In His Due Season",
    "🌾 That Thou Mayest Gather In Thy Corn, And Thy Wine, And Thine Oil",
    "🍽️ That Thou Mayest Eat And Be Full",
  ],
  "Deuteronomy 11:18-21": [
    "🫀 Lay Up These My Words In Your Heart And In Your Soul",
    "✋ Bind Them For A Sign Upon Your Hand",
    "👀 That They May Be As Frontlets Between Your Eyes",
    "👨‍👩‍👧 Teach Them Your Children",
    "🏠 Speaking Of Them When Thou Sittest In Thine House",
    "🚶 And When Thou Walkest By The Way",
    "🚪 Write Them Upon The Door Posts Of Thine House, And Upon Thy Gates",
  ],
  "Deuteronomy 11:22-25": [
    "📜 To Keep All These Commandments Which I Command You",
    "❤️ To Love The LORD Your God",
    "🚶 To Walk In All His Ways",
    "🤝 And To Cleave Unto Him",
    "👣 Every Place Whereon The Soles Of Your Feet Shall Tread Shall Be Yours",
    "🌍 From The Wilderness And Lebanon",
    "🌊 From The River, The River Euphrates",
  ],
  "Deuteronomy 11:26-28": [
    "👀 Behold, I Set Before You This Day A Blessing And A Curse",
    "🌿 A Blessing, If Ye Obey The Commandments Of The LORD Your God",
    "🚫 And A Curse, If Ye Will Not Obey The Commandments Of The LORD Your God",
    "↩️ But Turn Aside Out Of The Way",
    "🕊️ To Go After Other Gods",
    "❓ Which Ye Have Not Known",
  ],
  "Deuteronomy 11:29-32": [
    "⛰️ Put The Blessing Upon Mount Gerizim",
    "⛰️ And The Curse Upon Mount Ebal",
    "🌅 By The Way Where The Sun Goeth Down",
    "🏕️ In The Land Of The Canaanites",
    "🌳 Beside The Plains Of Moreh",
    "🏞️ Ye Shall Pass Over Jordan To Possess The Land",
    "✅ Ye Shall Observe To Do All The Statutes And Judgments",
  ],
  "Deuteronomy 12:8-9": [
    "🚫 Ye Shall Not Do After All The Things That We Do Here This Day",
    "👁️ Every Man Whatsoever Is Right In His Own Eyes",
    "🛑 For Ye Are Not As Yet Come To The Rest",
    "🎁 And To The Inheritance",
    "🏞️ Which The LORD Your God Giveth You",
  ],
  "Deuteronomy 12:13-14": [
    "⚠️ Take Heed To Thyself",
    "👀 That Thou Offer Not Thy Burnt Offerings In Every Place That Thou Seest",
    "📍 But In The Place Which The LORD Shall Choose",
    "🔥 There Thou Shalt Offer Thy Burnt Offerings",
    "📜 And There Thou Shalt Do All That I Command Thee",
  ],
  "Deuteronomy 12:17-19": [
    "🚫 Thou Mayest Not Eat Within Thy Gates",
    "🌾 The Tithe Of Thy Corn",
    "🍷 Or Of Thy Wine, Or Of Thy Oil",
    "🐄 Or The Firstlings Of Thy Herds Or Of Thy Flock",
    "🙏 Nor Any Of Thy Vows Which Thou Vowest",
    "🎁 Nor Thy Freewill Offerings",
    "🤲 Or Heave Offering Of Thine Hand",
  ],
  "Deuteronomy 12:23-25": [
    "🩸 Only Be Sure That Thou Eat Not The Blood",
    "❤️ For The Blood Is The Life",
    "🚫 Thou Mayest Not Eat The Life With The Flesh",
    "🌍 Thou Shalt Pour It Upon The Earth As Water",
    "🌱 That It May Go Well With Thee, And With Thy Children After Thee",
  ],
  "Deuteronomy 13:1-3": [
    "⚖️ If There Arise Among You A Prophet",
    "🌙 Or A Dreamer Of Dreams",
    "✨ And Giveth Thee A Sign Or A Wonder",
    "✅ And The Sign Or The Wonder Come To Pass",
    "🕊️ Let Us Go After Other Gods",
    "🚫 Thou Shalt Not Hearken Unto The Words Of That Prophet",
    "🫀 For The LORD Your God Proveth You",
  ],
  "Deuteronomy 13:6-8": [
    "🤫 If Thy Brother, The Son Of Thy Mother, Entice Thee Secretly",
    "👦 Or Thy Son, Or Thy Daughter",
    "💍 Or The Wife Of Thy Bosom",
    "🤝 Or Thy Friend, Which Is As Thine Own Soul",
    "🕊️ Saying, Let Us Go And Serve Other Gods",
    "❓ Which Thou Hast Not Known, Thou, Nor Thy Fathers",
    "🚫 Thou Shalt Not Consent Unto Him, Nor Hearken Unto Him",
  ],
  "Deuteronomy 13:9-11": [
    "⚖️ Thou Shalt Surely Kill Him",
    "✋ Thine Hand Shall Be First Upon Him",
    "🪨 Thou Shalt Stone Him With Stones, That He Die",
    "⛓️ Because He Hath Sought To Thrust Thee Away From The LORD Thy God",
    "🏠 Which Brought Thee Out Of The Land Of Egypt",
    "🔓 From The House Of Bondage",
    "👂 All Israel Shall Hear, And Fear",
  ],
  "Deuteronomy 13:12-14": [
    "👂 If Thou Shalt Hear Say In One Of Thy Cities",
    "🧍 Certain Men, The Children Of Belial, Are Gone Out From Among You",
    "↩️ And Have Withdrawn The Inhabitants Of Their City",
    "🕊️ Saying, Let Us Go And Serve Other Gods",
    "❓ Which Ye Have Not Known",
    "🔎 Then Shalt Thou Enquire, And Make Search, And Ask Diligently",
  ],
  "Deuteronomy 13:15-16": [
    "⚔️ Thou Shalt Surely Smite The Inhabitants Of That City With The Edge Of The Sword",
    "🔥 Destroying It Utterly",
    "🐄 And All The Cattle Thereof",
    "📦 Gather All The Spoil Of It Into The Midst Of The Street Thereof",
    "🔥 Shalt Burn With Fire The City, And All The Spoil Thereof Every Whit",
    "🏚️ It Shall Be An Heap For Ever",
  ],
  "Deuteronomy 13:17-18": [
    "🚫 There Shall Cleave Nought Of The Cursed Thing To Thine Hand",
    "💗 That The LORD May Turn From The Fierceness Of His Anger",
    "🤲 And Shew Thee Mercy",
    "❤️ And Have Compassion Upon Thee",
    "📈 And Multiply Thee",
    "🤝 As He Hath Sworn Unto Thy Fathers",
    "👂 Because Thou Shalt Hearken To The Voice Of The LORD Thy God",
  ],
};

const day50DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 10:1-2": "🪨 New Tables Of Stone",
  "Deuteronomy 10:3-5": "🪵 The Ark Receives The Testimony",
  "Deuteronomy 10:6-7": "⚰️ Aaron Died There",
  "Deuteronomy 10:8-9": "🕊️ Levi Was Separated",
  "Deuteronomy 10:10-11": "🙏 The LORD Hearkened Again",
  "Deuteronomy 10:12-13": "🫀 What Doth The LORD Require",
  "Deuteronomy 10:14-15": "🌌 Heaven, Earth, And Chosen Seed",
  "Deuteronomy 10:18-19": "⚖️ He Loveth The Stranger",
  "Deuteronomy 10:20-21": "🙇 Fear, Serve, And Cleave",
  "Deuteronomy 11:2-7": "🧠 Know Ye This Day",
  "Deuteronomy 11:8-9": "💪 Be Strong In The Land",
  "Deuteronomy 11:10-12": "🌧️ A Land Of Rain From Heaven",
  "Deuteronomy 11:13-15": "🌾 Rain In Due Season",
  "Deuteronomy 11:16-17": "⚠️ Take Heed To Yourselves",
  "Deuteronomy 11:18-21": "🏠 Lay Up These Words",
  "Deuteronomy 11:22-25": "👣 Every Place Shall Be Yours",
  "Deuteronomy 11:26-28": "⚖️ A Blessing And A Curse",
  "Deuteronomy 11:29-32": "⛰️ Gerizim And Ebal",
  "Deuteronomy 12:2-3": "🔥 Destroy Their Worship Places",
  "Deuteronomy 12:4-7": "📍 The Place The LORD Shall Choose",
  "Deuteronomy 12:8-9": "🚫 Not Right In His Own Eyes",
  "Deuteronomy 12:10-12": "🎉 Rejoice Before The LORD",
  "Deuteronomy 12:13-14": "⚠️ Not In Every Place",
  "Deuteronomy 12:15-16": "🥩 Flesh But Not Blood",
  "Deuteronomy 12:17-19": "🚪 Not Within Thy Gates",
  "Deuteronomy 12:20-22": "🏕️ When The Border Is Enlarged",
  "Deuteronomy 12:23-25": "🩸 The Blood Is The Life",
  "Deuteronomy 12:26-28": "🙏 Holy Things And Vows",
  "Deuteronomy 12:29-31": "🚫 Enquire Not After Their Gods",
  "Deuteronomy 13:1-3": "⚠️ A Prophet With A False Message",
  "Deuteronomy 13:6-8": "🤫 Enticed Secretly",
  "Deuteronomy 13:9-11": "⚖️ Put Away The Evil",
  "Deuteronomy 13:12-14": "🔎 Search The Matter Diligently",
  "Deuteronomy 13:15-16": "🔥 Destroying It Utterly",
  "Deuteronomy 13:17-18": "🤲 Mercy After Purging Evil",
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getDeuteronomyOneToThirteenMeaning(title: string, section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord our god|lord thy god|lord spake|said unto me|commanded|as the lord/.test(lower)) {
    return ["Moses is grounding Israel's life in the LORD's word.", "Deuteronomy is not a speech about self-improvement; it is covenant instruction from the God who rescued them."];
  }
  if (/moses|spake unto all israel|this side jordan|wilderness|horeb|kadeshbarnea|turned|journey/.test(lower)) {
    return ["Moses is retelling Israel's journey before they enter the land.", "The new generation must understand where they have been so they can obey where they are going."];
  }
  if (/judges|captains|wise men|hear between|righteous judgment|respect persons/.test(lower)) {
    return ["Israel needs ordered justice among the people.", "Leaders must judge fairly because covenant life cannot be built on favoritism or fear."];
  }
  if (/go up|possess|land|inheritance|mountain|giants|walled|good land|sware/.test(lower)) {
    return ["The land is God's promised gift to Israel.", "The question is whether the people will trust the LORD enough to enter and obey."];
  }
  if (/rebelled|murmured|would not go|afraid|unbelief|forty years|children|wander/.test(lower)) {
    return ["Moses is reminding Israel how unbelief damaged the previous generation.", "Fear turned into rebellion when the people refused to trust the LORD's promise."];
  }
  if (/edom|moab|ammon|sihon|og|bashan|jordan|cities|battle|smote/.test(lower)) {
    return ["The LORD orders Israel's dealings with surrounding nations.", "Some lands are not theirs to take, while other battles show God giving victory as He promised."];
  }
  if (/statutes|judgments|commandments|teach|keep|do them|observe/.test(lower)) {
    return ["God's commands are meant to be heard and practiced.", "Israel must not treat covenant instruction as information only; obedience is the path of life in the land."];
  }
  if (/idols|graven image|other gods|corrupt|jealous|fire|sun|moon|stars/.test(lower)) {
    return ["The LORD forbids Israel from turning worship toward created things.", "Idolatry would corrupt the people by replacing the living God with something made or seen."];
  }
  if (/ten commandments|tables|sabbath|honour thy father|kill|adultery|steal|false witness|covet/.test(lower)) {
    return ["The covenant commands teach Israel how to live before God and neighbor.", "Worship, family, truth, rest, and desire all come under the LORD's authority."];
  }
  if (/hear o israel|love the lord|heart|soul|might|teach them|doorposts|bind/.test(lower)) {
    return ["Israel is called to love the LORD with the whole life.", "God's word must shape the home, the children, the daily road, and the heart."];
  }
  if (/remember|forget|egypt|bondage|wilderness|manna|humbled|fed thee|wealth|power/.test(lower)) {
    return ["Israel must remember that life comes from the LORD.", "The danger in the land is forgetting the God who fed, humbled, corrected, and carried them."];
  }
  if (/chosen|holy people|treasure|covenant|mercy|fathers|love/.test(lower)) {
    return ["Israel belongs to the LORD by covenant mercy.", "Their identity begins with God's love and promise, not with their size, power, or goodness."];
  }
  if (/destroy|drive out|nations|consume|snare|abomination|fear them not/.test(lower)) {
    return ["Israel must not make peace with idolatry in the land.", "The nations' false worship would become a snare if Israel tried to keep what God commanded them to remove."];
  }
  if (/golden calf|provoked|stiffnecked|interceded|forty days|ark|tables|levi/.test(lower)) {
    return ["Moses reminds Israel of their covenant failure at Sinai.", "The story exposes their stubbornness, but it also shows the mercy of God through intercession and renewed covenant tablets."];
  }
  if (/circumcise|heart|fear the lord|serve him|cleave|stranger|fatherless|widow/.test(lower)) {
    return ["The LORD wants obedience that reaches the heart.", "Israel must fear Him, love Him, serve Him, and show justice to vulnerable people because that reflects His own character."];
  }
  if (/blessing|curse|gerizim|ebal|if ye obey|if ye will not obey/.test(lower)) {
    return ["Moses sets covenant blessing and curse before Israel.", "The people are being taught that obedience and rebellion lead in different directions."];
  }
  if (/place which the lord|choose|sacrifice|altar|eat before|rejoice|blood|high places/.test(lower)) {
    return ["Worship in the land must happen the LORD's way.", "Israel may not copy the nations or invent worship; sacrifice, joy, and blood must be handled under God's command."];
  }
  if (/prophet|dreamer|sign|wonder|secretly|serve other gods|belial/.test(lower)) {
    return ["False spiritual influence must not pull Israel away from the LORD.", "Even impressive signs or close relationships cannot excuse worshiping other gods."];
  }
  if (/places|river|mount|border|coast|plain|wilderness|jordan|cities/.test(lower)) {
    return ["Moses is speaking about real places tied to Israel's covenant journey.", "The land, roads, borders, and cities matter because obedience must happen in the actual place God is giving them."];
  }

  return ["Moses is explaining covenant life before Israel enters the land.", `In ${section.reference}, the people are being taught to remember the LORD, obey His commands, reject idols, and love Him with the whole heart.`];
}

function getDeuteronomyOneToThirteenBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/land|inheritance|possess|jordan|cities|nations/.test(lower)) return ["🏞️ The land is God's gift", "📜 Israel must enter by faith", "🙌 Obedience belongs in the land"];
  if (/commandments|statutes|judgments|keep|observe|do them/.test(lower)) return ["📜 God's word must be kept", "🚶 Obedience is practiced", "🧠 The heart must remember"];
  if (/idols|other gods|graven|image|false|prophet|dreamer/.test(lower)) return ["🚫 Idolatry must be rejected", "🙌 Worship belongs to the LORD alone", "🛡️ False voices must not lead Israel"];
  if (/heart|love|soul|might|hear o israel|teach/.test(lower)) return ["❤️ Love reaches the heart", "👨‍👩‍👧 Children must be taught", "🏠 God's word shapes the home"];
  if (/remember|forget|egypt|wilderness|manna|humbled/.test(lower)) return ["🧠 Memory guards faith", "🍞 The LORD provided in the wilderness", "⚠️ Forgetting leads to pride"];
  if (/judge|justice|respect persons|wise men/.test(lower)) return ["⚖️ Justice must be fair", "👥 Leaders serve the people", "🙌 Judgment belongs under God"];
  if (/calf|stiffnecked|interceded|tables|ark/.test(lower)) return ["💔 Israel sinned at Sinai", "🙏 Moses interceded for mercy", "📜 Covenant mercy was renewed"];

  if (/places|river|mount|border|coast|plain|wilderness|jordan|cities/.test(lower)) return ["📍 Real places carry covenant memory", "🏞️ The land is tied to God's promise", "🚶 Israel must obey where God leads"];

  return ["📜 Moses teaches covenant life", "🏞️ Israel is preparing for the land", "🙌 Faithfulness means loving and obeying the LORD"];
}

function getDeuteronomy1To13DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getDeuteronomy1To13Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/lord our god|lord thy god|commanded|spake|hear o israel|keep|statutes|judgments|commandments/.test(lower)) return ["\u{1F4DC} God's word must be kept", "\u{1F6B6} Obedience is practiced", "\u{1F9E0} The heart must remember", "\u{1F64C} Covenant life begins with the LORD"];
  if (/wilderness|horeb|kadesh|jordan|journey|turned|mount|seir|moab|ammon|bashan/.test(lower)) return ["\u{1F4CD} Real places carry covenant memory", "\u{1F3DE}\u{FE0F} The land is tied to God's promise", "\u{1F6B6} Israel must obey where God leads", "\u{1F9E0} The journey teaches the next generation"];
  if (/judge|justice|wise|captains|respect persons|hear between/.test(lower)) return ["\u{2696}\u{FE0F} Justice must be fair", "\u{1F465} Leaders serve the people", "\u{1F64C} Judgment belongs under God", "\u{1F6AB} Favoritism must not rule"];
  if (/land|inheritance|possess|giants|walled|good land|sware|nations|cities/.test(lower)) return ["\u{1F3DE}\u{FE0F} The land is God's gift", "\u{1F4DC} Israel must enter by faith", "\u{1F64C} Obedience belongs in the land", "\u{26A0}\u{FE0F} Fear must not rule the promise"];
  if (/rebel|murmur|afraid|forty years|wander|calf|stiffnecked|interceded|tables|ark/.test(lower)) return ["\u{1F494} Israel's sin is remembered honestly", "\u{1F64F} Moses intercedes for mercy", "\u{1F4DC} Covenant mercy is renewed", "\u{26A0}\u{FE0F} Rebellion has consequences"];
  if (/heart|love|soul|might|teach|children|house|bind|doorposts/.test(lower)) return ["\u{2764}\u{FE0F} Love reaches the heart", "\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467} Children must be taught", "\u{1F3E0} God's word shapes the home", "\u{1F9E0} Memory must become daily practice"];
  if (/remember|forget|egypt|manna|humbled|bread|power|wealth/.test(lower)) return ["\u{1F9E0} Memory guards faith", "\u{1F35E} The LORD provided in the wilderness", "\u{26A0}\u{FE0F} Forgetting leads to pride", "\u{1F64C} Dependence matters more than self-trust"];
  if (/idol|other gods|graven|image|false|prophet|dreamer|belial|serve/.test(lower)) return ["\u{1F6AB} Idolatry must be rejected", "\u{1F64C} Worship belongs to the LORD alone", "\u{1F6E1}\u{FE0F} False voices must not lead Israel", "\u{1F525} Covenant loyalty is guarded"];
  if (/place which the lord|choose|sacrifice|altar|eat before|rejoice|blood|high places/.test(lower)) return ["\u{26FA} Worship must happen God's way", "\u{1F525} Sacrifice is not invented", "\u{1F6AB} Pagan worship patterns are rejected", "\u{1F389} Rejoicing stays under God's command"];
  return ["\u{1F4DC} Moses teaches covenant life", "\u{1F3DE}\u{FE0F} Israel is preparing for the land", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Faithfulness means loving and obeying the LORD"];
}

function getDay47DeuteronomySupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/would not|rebelled|murmured|hated|discouraged|walled|believe|fight|bear his son|fire by night|wroth|not one|caleb|joshua|little ones|prey/.test(lower)) return ["💔 Unbelief becomes rebellion", "🙌 The LORD had already carried them", "⚖️ Rebellion brings consequence", "✅ Faithful trust is honored"];
  if (/turn|red sea|sinned|go up|go not|not among|would not hear|presumptuously|wept/.test(lower)) return ["↩️ The people must turn back", "⚠️ Late zeal cannot replace obedience", "🙉 Refusing God's word brings defeat", "😭 Tears do not undo rebellion"];
  if (/words|moses|declare|law|commandment|spake/.test(lower)) return ["📖 Moses explains the covenant", "👥 All Israel must listen", "📜 God's command stands behind the speech", "🧠 The next generation must remember"];
  if (/jordan|wilderness|month|sihon|og|bashan|horeb|mount|amorites|land|possess|sware|journey/.test(lower)) return ["📍 Real places carry memory", "🏞️ The land is before Israel", "🤝 God's promise is still active", "🚶 The people must move by faith"];
  if (/bear|multiplied|stars|cumbrance|wise|chief|heads|captains|officers|judges|causes|righteously|stranger|respect persons|judgment|hard/.test(lower)) return ["👥 Israel has become many", "⚖️ Justice must be shared and fair", "🧠 Leaders need wisdom", "🙌 Judgment belongs under God"];
  if (/kadeshbarnea|wilderness|fear|discouraged|send men|search|fruit|good land|word again/.test(lower)) return ["🏜️ The hard road is remembered", "🍇 The land is truly good", "🚫 Fear must not rule", "🙌 God's gift should be trusted"];

  return ["📖 Moses retells the journey", "🏞️ Israel stands near the land", "⚖️ The past warns the present", "🙌 Trust must answer God's promise"];
}

function explainDay47DeuteronomyAt95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/these be the words/.test(lower)) opening = ["Deuteronomy begins as Moses' spoken words to Israel.", "He is teaching the new generation before they enter the land."];
  else if (/this side jordan/.test(lower)) opening = ["This side Jordan means the side where Israel is camped before crossing the river.", "Moses speaks while the people are still just outside Canaan."];
  else if (/eleventh month/.test(lower)) opening = ["The eleventh month places the speech near the end of the wilderness years.", "Israel is close to the land, and Moses is preparing them to remember rightly."];
  else if (/according unto all/.test(lower)) opening = ["Moses speaks what the LORD commanded him to say.", "Deuteronomy is not Moses' private opinion about Israel's future."];
  else if (/sihon/.test(lower)) opening = ["Sihon was an Amorite king Israel had already defeated.", "That victory reminds the people that the LORD can give them the land."];
  else if (/og the king/.test(lower)) opening = ["Og was the king of Bashan, another defeated ruler east of Jordan.", "His defeat stands behind Moses' call to trust God for what comes next."];
  else if (/began to declare this law/.test(lower)) opening = ["Declare means explain clearly.", "Moses is opening up God's law so Israel will understand how to live in the land."];
  else if (/lord our god spake/.test(lower)) opening = ["Horeb is another name for Sinai, where God made covenant with Israel.", "Moses starts the story with God's command, not Israel's plan."];
  else if (/dwelt long enough/.test(lower)) opening = ["Israel had stayed at the mountain long enough.", "God's command moves them from receiving covenant instruction toward entering the promised land."];
  else if (/turn you/.test(lower) && section.reference === "Deuteronomy 1:6-8") opening = ["Turn you means set out in a new direction.", "The people are told to leave the mountain and continue toward Canaan."];
  else if (/mount of the amorites/.test(lower)) opening = ["The mount of the Amorites refers to the hill country of Canaan.", "God is directing Israel toward the land occupied by the peoples they must face."];
  else if (/set the land before you/.test(lower)) opening = ["God places the land before Israel as an open promise.", "The question is whether they will trust Him enough to enter."];
  else if (/go in and possess/.test(lower)) opening = ["Possess means receive and take hold of the land God gives.", "Israel must enter by faith instead of only admiring the promise from a distance."];
  else if (/sware unto your fathers/.test(lower)) opening = ["Sware means promised with an oath.", "The land is tied to God's promises to Abraham, Isaac, and Jacob."];
  else if (/i spake unto you/.test(lower)) opening = ["Moses reminds Israel of an earlier leadership problem.", "The people had grown too numerous for him to carry every dispute alone."];
  else if (/not able to bear/.test(lower)) opening = ["Bear means carry.", "Moses could not carry the whole nation's needs and disputes by himself."];
  else if (/multiplied you/.test(lower)) opening = ["Multiplied means made many.", "Israel's large number shows God's promise to grow Abraham's family is being fulfilled."];
  else if (/stars of heaven/.test(lower)) opening = ["The stars image recalls God's promise to Abraham.", "Israel's size is evidence that the LORD has kept His word."];
  else if (/cumbrance/.test(lower)) opening = ["Cumbrance means heavy burden or pressure.", "Moses is talking about the weight of leading and judging a large people."];
  else if (/wise men, and known/.test(lower)) opening = ["Known means recognized by the people.", "The leaders must be wise, but they must also have a public reputation for trustworthiness."];
  else if (/wise men/.test(lower)) opening = ["Wise and understanding men are leaders able to judge with discernment.", "Israel needs more than popularity; it needs trustworthy judgment."];
  else if (/thing.*good/.test(lower)) opening = ["The people agree that shared leadership is good.", "Moses' solution is received as a practical way to care for the nation."];
  else if (/chief of your tribes/.test(lower)) opening = ["The chiefs are recognized leaders from Israel's tribes.", "Moses chooses men who already have standing among the people."];
  else if (/heads over you/.test(lower)) opening = ["Heads over you means appointed leaders with responsibility.", "Israel's community life needs ordered leadership."];
  else if (/captains over thousands/.test(lower)) opening = ["These are leaders responsible for very large groups of people.", "Moses organizes Israel so major burdens do not fall on one man alone."];
  else if (/captains over tens/.test(lower)) opening = ["These are leaders responsible for the smallest community units.", "Even everyday disputes are meant to be handled close to the people involved."];
  else if (/officers among your tribes/.test(lower)) opening = ["Officers help carry out leadership among the tribes.", "Moses builds a system that can serve the people in daily life."];
  else if (/charged your judges/.test(lower)) opening = ["Charged means gave a serious command.", "Moses tells the judges how to handle cases under God's authority."];
  else if (/hear the causes/.test(lower)) opening = ["Causes are disputes or legal cases.", "Judges must listen carefully before deciding."];
  else if (/judge righteously/.test(lower)) opening = ["Righteously means fairly and according to what is right.", "Judges must not twist decisions for family, status, or pressure."];
  else if (/stranger/.test(lower)) opening = ["The stranger is the outsider living among Israel.", "Justice must protect him too, not only native-born Israelites."];
  else if (/respect persons/.test(lower)) opening = ["Respect persons means show favoritism because of someone's status.", "A judge must not favor the rich, powerful, familiar, or impressive."];
  else if (/judgment is god/.test(lower)) opening = ["Judgment belongs to God because justice reflects His authority.", "Israel's judges answer to Him for how they decide."];
  else if (/cause that is too hard/.test(lower)) opening = ["A hard cause is a case too difficult for lower judges.", "Moses provides a path for difficult disputes instead of leaving them confused."];
  else if (/great and terrible wilderness/.test(lower)) opening = ["The wilderness was great in size and terrible in danger.", "Moses wants Israel to remember the hard road the LORD brought them through."];
  else if (/kadeshbarnea/.test(lower)) opening = ["Kadesh-barnea was the place where Israel stood near the land and failed to trust.", "The name carries the memory of the spy mission and rebellion."];
  else if (/mountain of the amorites/.test(lower)) opening = ["The mountain of the Amorites is the promised land's hill country.", "Israel had reached the edge of what God was giving."];
  else if (/lord thy god hath set/.test(lower)) opening = ["The land is set before Israel by the LORD Himself.", "Moses presents it as God's gift, not as an impossible dream."];
  else if (/fear not/.test(lower)) opening = ["Fear not means do not let fear control your obedience.", "The command calls Israel to trust God's promise more than the danger ahead."];
  else if (/send men before us/.test(lower)) opening = ["The people ask to send scouts ahead.", "The request begins as a search plan, but it soon exposes fear in their hearts."];
  else if (/search us out/.test(lower)) opening = ["Search out means inspect the land and the route.", "The scouts are meant to bring information, not replace trust in God."];
  else if (/fruit of the land/.test(lower)) opening = ["The fruit gives visible proof that Canaan is fruitful.", "The scouts bring back evidence that the promised land is good."];
  else if (/brought it down/.test(lower)) opening = ["The fruit is carried back to the camp.", "Israel can see the goodness of the land with its own eyes."];
  else if (/word again/.test(lower)) opening = ["The scouts bring a report back to Israel.", "Their words should have strengthened trust because the land was good."];
  else if (/^it is a good land$/.test(lower)) opening = ["The report agrees that the land is good.", "The problem will not be the land but Israel's refusal to trust the giver."];
  else if (/doth give us/.test(lower)) opening = ["The LORD is the one giving the land.", "The fruit is not just produce; it is a sign of God's promised gift."];
  else if (/notwithstanding/.test(lower)) opening = ["Notwithstanding means even so or despite that.", "Even with the good report, Israel refused to go up."];
  else if (/rebelled against/.test(lower)) opening = ["Rebellion is refusal to obey God's command.", "Israel's fear becomes open resistance to the LORD."];
  else if (/murmured/.test(lower)) opening = ["Murmured means grumbled or complained.", "The people spread unbelief privately in their tents."];
  else if (/lord hated us/.test(lower)) opening = ["Israel says the LORD hated them, but that accusation is false.", "Fear makes them reinterpret rescue as if God meant harm."];
  else if (/discouraged our heart/.test(lower)) opening = ["Discouraged means made the heart weak with fear.", "The report about strong people and cities crushed their trust."];
  else if (/walled up to heaven/.test(lower)) opening = ["Walled up to heaven is exaggerated fear language.", "The cities looked impossible to them because fear had become larger than faith."];
  else if (/goeth before you/.test(lower)) opening = ["The LORD going before them means He leads and fights ahead of Israel.", "Moses points their eyes back to the God who already delivered them."];
  else if (/did not believe/.test(lower)) opening = ["The deepest issue is unbelief.", "Israel had seen God's care but still would not trust Him at the land's edge."];
  else if (/fight for you/.test(lower)) opening = ["The LORD fighting for Israel means the battle depends on His power first.", "They are not being asked to face Canaan alone."];
  else if (/bear his son/.test(lower)) opening = ["The father carrying his son pictures tender protection.", "Moses says the LORD carried Israel through the wilderness like a father caring for a child."];
  else if (/all the way/.test(lower)) opening = ["All the way means the whole journey.", "God's care did not appear once and vanish; He carried them throughout the road."];
  else if (/went in the way before you/.test(lower)) opening = ["God went ahead of Israel to guide the camp.", "He was not behind them waiting; He led the way."];
  else if (/place to pitch/.test(lower)) opening = ["Pitch your tents means set up camp.", "The LORD guided Israel to places where the camp could stop."];
  else if (/fire by night/.test(lower)) opening = ["Fire by night recalls God's visible guidance in the wilderness.", "The people had light for the dark road, yet still doubted Him."];
  else if (/heard the voice/.test(lower)) opening = ["God was listening to the words Israel spoke in fear and complaint.", "Their private grumbling was fully heard by Him."];
  else if (/wroth/.test(lower)) opening = ["Wroth means angry.", "God's anger rises because their refusal rejects His promise and care."];
  else if (/not one of these men/.test(lower)) opening = ["The unbelieving generation is barred from seeing the good land.", "Their refusal at the border leads to a severe consequence."];
  else if (/save caleb/.test(lower)) opening = ["Save means except.", "Caleb is the faithful exception because he followed the LORD fully."];
  else if (/joshua/.test(lower)) opening = ["Joshua will enter and lead Israel after Moses.", "God provides the next leader even while judging the old generation."];
  else if (/little ones/.test(lower)) opening = ["The children whom Israel thought would be prey will enter the land.", "God protects the very ones the fearful parents used as an excuse."];
  else if (/unto them will i give/.test(lower)) opening = ["God gives the land to the next generation.", "The promise continues even though the unbelieving adults lose their place in it."];
  else if (/but as for you/.test(lower)) opening = ["Moses now turns from the promise of the land to the sentence on the unbelieving adults.", "They will not move forward into Canaan with Joshua's generation."];
  else if (/turn you/.test(lower) && section.reference === "Deuteronomy 1:40-40") opening = ["The people are told to reverse direction and head back.", "Instead of entering Canaan, they must return toward the wilderness."];
  else if (/journey into the wilderness/.test(lower)) opening = ["The wilderness becomes the path of discipline.", "Israel must go back into the place they could have moved beyond by faith."];
  else if (/red sea/.test(lower)) opening = ["The Red Sea route points back toward the earlier wilderness road.", "The generation that refused the land must return to wandering."];
  else if (/sinned against/.test(lower)) opening = ["The people admit they have sinned against the LORD.", "But confession after judgment does not automatically remove the consequence."];
  else if (/go up and fight/.test(lower)) opening = ["Now the people want to fight after refusing to obey.", "Their late courage is not the same as faith."];
  else if (/go not up/.test(lower)) opening = ["God commands them not to go up now.", "The moment for obedient entry has passed."];
  else if (/not among you/.test(lower)) opening = ["God says He is not among them for that battle.", "Without His presence, their effort will become defeat."];
  else if (/would not hear/.test(lower)) opening = ["They would not hear means they refused to listen.", "Israel repeats disobedience by ignoring the warning not to fight."];
  else if (/presumptuously/.test(lower)) opening = ["Presumptuously means boldly in self-will, without God's permission.", "They climb the hill as if zeal can replace obedience."];
  else if (/wept before the lord/.test(lower)) opening = ["Their weeping is real sorrow after defeat.", "But tears do not undo the rebellion when the people still refused God's word."];
  else opening = ["This Day 47 Deuteronomy phrase needs a direct explanation.", "It belongs to Moses' opening sermon, Israel's leaders, the spy story, rebellion, or the failed attack."];

  return note([
    opening[0],
    opening[1],
    ...getDay47DeuteronomySupport(cleanTitle),
  ].slice(0, 8));
}

function getDay48DeuteronomySupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/meddle|distress|contend|esau|moab|ammon|lot|seir|ar|foot breadth|possession/.test(lower)) return ["🚫 Israel must respect limits", "🏞️ Other peoples have assigned land", "📜 Obedience controls the journey", "🙌 The LORD rules every border"];
  if (/buy|meat|water|may eat|that ye may eat|walking|wilderness|forty years|lacked nothing|elath|eziongaber/.test(lower)) return ["🍞 Israel must pay fairly", "💧 Needs are met without stealing", "🚶 The wilderness was known by God", "✅ The LORD provided enough"];
  if (/sihon|og|bashan|heshbon|arnon|battle|delivered|smote|cities|argob|edrei|possess|into .*hand|thine hand|mighty hand|prey|spoil|cattle|gilead|hermon|bedstead|cubit/.test(lower)) return ["⚔️ The LORD gives victory", "🏙️ Strong cities fall", "🏞️ The land begins to be possessed", "🙌 Israel sees God's power"];
  if (/reuben|gad|manasseh|wives|little ones|cattle|rest|brethren|armed|jordan|inherit|joshua|encourage|charge/.test(lower)) return ["🏠 Families receive inheritance", "🛡️ Tribes must help their brothers", "🕊️ Rest is shared together", "🧭 Joshua must lead next"];
  if (/besought|shew|greatness|mighty hand|what god|good land|wroth|suffice|speak no more|lift up thine eyes|not go over/.test(lower)) return ["🙏 Moses prays honestly", "💪 God's greatness is unmatched", "⚖️ Consequences still stand", "👀 Moses may see but not enter"];
  if (/hearken|statutes|judgments|teach|do them|may live|add|diminish|wisdom|understanding|nations|nigh|righteous/.test(lower)) return ["👂 God's word must be heard", "✅ Obedience gives life", "🚫 The command must not be edited", "🌍 Israel's wisdom is visible"];
  if (/covenant|face to face|stood between|shew|afraid|fire|graven image|bow down|serve|jealous|sabbath|labour|work|servant|egypt|commandments|heart|fear me|well with them|walk|right hand|left|prolong/.test(lower)) return ["🤝 Covenant shapes life with God", "🔥 God's presence is weighty", "📜 Commands reach worship and work", "🌱 Obedience is for life"];
  if (/heed|soul|forget|teach|sons|horef|similitude|corrupt|graven|likeness|heaven|sun|moon|stars|consuming fire|jealous/.test(lower)) return ["🧠 Memory must be guarded", "👨‍👩‍👧 Children must be taught", "🚫 Images corrupt worship", "🔥 The LORD is holy"];
  if (/beget|children|perish|seek|merciful|forsake|destroy|forget the covenant|wood and stone|neither see|created|voice of god|fire|mighty hand|stretched out|terrors|none else|well with thee/.test(lower)) return ["⚠️ Idolatry brings danger", "🔎 Seeking the LORD still matters", "🕊️ Mercy remains possible", "🙌 The LORD alone is God"];
  if (/slayer|flee|kill|neighbour|unawares|hated|bezer|ramoth|golan|testimonies|came forth out of egypt/.test(lower)) return ["🏃 Refuge protects life", "⚖️ Justice weighs intent", "🏙️ Cities are named for safety", "📜 Moses sets covenant order"];
  return ["📖 Moses teaches the new generation", "🏞️ Israel is nearing the land", "📜 God's word orders the way", "🙌 Trust must become obedience"];
}

function explainDay48DeuteronomyAt95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/then we turned/.test(lower) && section.chapter === 2) opening = ["Israel turns away from the failed entry into Canaan.", "The journey now moves through wilderness roads under the LORD's command."];
  else if (/then we turned/.test(lower) && section.chapter === 3) opening = ["Israel turns north toward Bashan after Sihon's defeat.", "Moses is showing the new generation how the LORD gave victory step by step."];
  else if (/as the lord spake/.test(lower)) opening = ["Moses moves because the LORD has spoken.", "The route is guided by command, not by wandering impulse."];
  else if (/compassed this mountain long enough/.test(lower)) opening = ["Compassed means circled or gone around.", "Israel has spent enough time around Seir and must move forward."];
  else if (/turn you northward/.test(lower)) opening = ["Northward means toward the north.", "God redirects Israel's road instead of letting them keep circling the same mountain."];
  else if (/children of esau succeeded/.test(lower)) opening = ["Esau's descendants had taken over their own land before Israel arrived.", "Their history reminds Israel that the LORD orders other nations too."];
  else if (/children of esau|dwell in seir/.test(lower)) opening = ["The children of Esau are Israel's relatives through Jacob's brother.", "Their land in Seir is not Israel's to take."];
  else if (/take ye good heed/.test(lower) && section.chapter === 2) opening = ["Take good heed means be very careful.", "Israel must not provoke Esau's descendants while passing near them."];
  else if (/meddle not/.test(lower)) opening = ["Meddle means interfere or start trouble.", "Israel must not treat Esau's land as if God had given it to them."];
  else if (/not give you of their land/.test(lower)) opening = ["God plainly says that land is not Israel's gift.", "The promise to Israel does not erase His gifts to others."];
  else if (/foot breadth/.test(lower)) opening = ["A foot breadth is the width of a foot.", "God will not give Israel even the smallest piece of Esau's land."];
  else if (/mount seir.*esau/.test(lower)) opening = ["Mount Seir belongs to Esau's descendants by God's decision.", "Israel must respect that boundary even while moving toward its own inheritance."];
  else if (/buy meat/.test(lower)) opening = ["Meat here means food, not only animal flesh.", "Israel must buy food instead of taking supplies from Esau's people."];
  else if (/buy water/.test(lower)) opening = ["Water must also be paid for.", "The command teaches Israel to pass through without stealing what others need to live."];
  else if (/blessed thee/.test(lower)) opening = ["The LORD's blessing means Israel has enough to pay its way.", "Their provision removes any excuse for taking from others."];
  else if (/knoweth thy walking/.test(lower)) opening = ["God knows Israel's walking through the wilderness.", "Every hard mile has been seen by Him."];
  else if (/forty years/.test(lower)) opening = ["Forty years names the full wilderness period.", "The LORD stayed with Israel through judgment, travel, hunger, and need."];
  else if (/lacked nothing/.test(lower)) opening = ["Lacked nothing means God supplied what was necessary.", "The wilderness was hard, but the LORD did not abandon His people."];
  else if (/elath/.test(lower)) opening = ["Elath and Ezion-geber are places on Israel's travel route.", "The names remind the reader that Moses is retelling a real road."];
  else if (/distress not the moabites/.test(lower)) opening = ["Distress means harass or press hard.", "Israel must not threaten Moab as an enemy to conquer."];
  else if (/contend with them in battle/.test(lower)) opening = ["Contend in battle means fight them.", "Moab's land is not the battle God is giving Israel."];
  else if (/ar unto the children of lot/.test(lower)) opening = ["Ar belongs to the children of Lot, the Moabites.", "God has assigned land to them too."];
  else if (/for a possession/.test(lower)) opening = ["A possession is land held as an inheritance.", "Moab's territory is treated as a real God-allowed possession."];
  else if (/anakims|people great/.test(lower)) opening = ["The Anakims were remembered as unusually tall and fearsome people.", "Moses shows that other peoples had faced giants before Israel."];
  else if (/children of esau succeeded/.test(lower)) opening = ["Succeeded means took the place of the earlier inhabitants.", "Esau's descendants had already received and occupied their land."];
  else if (/now rise up/.test(lower)) opening = ["Rise up means get moving.", "After the long wilderness period, Israel is commanded to cross the next boundary."];
  else if (/brook zered/.test(lower)) opening = ["The brook Zered marks a turning point in the journey.", "Crossing it signals that the old generation's sentence has run its course."];
  else if (/thirty and eight years/.test(lower)) opening = ["Thirty-eight years counts the long delay after Kadesh-barnea.", "Moses measures how long unbelief kept Israel from moving forward."];
  else if (/men of war were wasted/.test(lower)) opening = ["The men of war were the older fighting generation.", "They died out as the LORD had warned after their refusal to enter Canaan."];
  else if (/hand of the lord was against/.test(lower)) opening = ["God's power was working against that generation instead of for it.", "The phrase describes divine judgment finishing what He had sworn."];
  else if (/lord spake unto me/.test(lower) && section.chapter === 2) opening = ["The LORD speaks again after the old generation is gone.", "The journey can now move into the next stage."];
  else if (/pass over through ar/.test(lower)) opening = ["Passing through Ar means moving near Moab's territory.", "Israel is still traveling under careful boundaries."];
  else if (/distress them not/.test(lower)) opening = ["God repeats the warning not to harass Ammon.", "Israel must obey even when land nearby looks useful."];
  else if (/nor meddle/.test(lower)) opening = ["Meddle means interfere or pick a fight.", "Ammon's land is also off limits to Israel."];
  else if (/land of the children of ammon/.test(lower)) opening = ["The children of Ammon are descendants of Lot.", "Their territory is not part of Israel's inheritance."];
  else if (/given it unto the children of lot/.test(lower)) opening = ["God gave that land to Lot's descendants.", "Israel must honor God's decision about another people's inheritance."];
  else if (/giants dwelt/.test(lower)) opening = ["Giants had lived there in earlier times.", "The note reminds Israel that frightening peoples can be removed when God gives land."];
  else if (/zamzummims/.test(lower)) opening = ["Zamzummims is the Ammonite name for an earlier giant people.", "The strange name points to the land's history before Ammon possessed it."];
  else if (/lord destroyed them/.test(lower)) opening = ["The LORD removed the earlier inhabitants before Ammon.", "This shows God rules the histories of nations, not Israel only."];
  else if (/rise ye up/.test(lower)) opening = ["The command tells Israel to break camp and move forward.", "Their journey is no longer circling; it is advancing toward conflict God has appointed."];
  else if (/from aroer.*river arnon/.test(lower)) opening = ["Aroer by the Arnon marks the southern edge of the taken land.", "Moses uses the river line to show the victory had clear borders."];
  else if (/river arnon/.test(lower)) opening = ["The Arnon is a boundary river east of the Jordan.", "Crossing it begins Israel's movement toward Sihon's territory."];
  else if (/as we did unto sihon/.test(lower)) opening = ["Og receives the same kind of defeat as Sihon.", "The earlier victory becomes the pattern for the next one."];
  else if (/sihon.*heshbon/.test(lower)) opening = ["Sihon is the Amorite king ruling from Heshbon.", "Unlike Edom, Moab, and Ammon, his land is now given into Israel's hand."];
  else if (/given into thine hand/.test(lower)) opening = ["Given into thine hand means delivered into Israel's power.", "The coming victory begins with God's gift, not Israel's strength."];
  else if (/begin to possess it/.test(lower)) opening = ["Israel is told to start taking hold of the land God is now giving them.", "The promise is becoming something they must actually enter and receive."];
  else if (/messengers.*kedemoth/.test(lower)) opening = ["Moses first sends messengers with peaceful words.", "Israel does not begin by grabbing Sihon's road or supplies."];
  else if (/pass through thy land/.test(lower)) opening = ["The request is for passage, not conquest.", "Moses asks to travel through Sihon's land without turning aside."];
  else if (/high way/.test(lower)) opening = ["The high way is the main road.", "Israel promises to stay on the road and not spread through the land."];
  else if (/sell me meat/.test(lower)) opening = ["Moses offers to buy food with money.", "The request shows Israel is willing to pay rather than plunder."];
  else if (/give me water for money/.test(lower)) opening = ["Even water would be paid for.", "Israel asks for fair passage with supplies purchased honestly."];
  else if (/pass over jordan/.test(lower)) opening = ["Passing over Jordan means entering the land west of the river.", "Moses explains that Israel's goal is beyond Sihon's territory."];
  else if (/land which the lord our god giveth/.test(lower)) opening = ["The land ahead is the LORD's gift to Israel.", "The peaceful request does not weaken the promise; it respects the road."];
  else if (/lord said unto me/.test(lower) && section.chapter === 2) opening = ["The LORD announces that Sihon's defeat has begun.", "Israel is told to move from request to possession."];
  else if (/begun to give sihon/.test(lower)) opening = ["God says He has begun to give Sihon and his land.", "The victory starts before Israel sees the outcome."];
  else if (/begin to possess$/.test(lower)) opening = ["Israel must start occupying what the LORD has placed before them.", "This is the moment when promised land begins to become inherited land."];
  else if (/sihon came out/.test(lower)) opening = ["Sihon chooses battle instead of peaceful passage.", "His resistance becomes the moment God gives Israel victory."];
  else if (/delivered him before us/.test(lower)) opening = ["Delivered him before us means the LORD handed him over.", "Moses gives God the credit for the defeat of Sihon."];
  else if (/took all his cities/.test(lower)) opening = ["Israel captures Sihon's cities after the battle.", "The victory becomes actual territory, not only a battlefield win."];
  else if (/not one city too strong/.test(lower)) opening = ["No city was strong enough to stop the LORD's gift.", "The detail encourages Israel to remember God's power against fortified places."];
  else if (/cattle.*prey/.test(lower)) opening = ["Prey here means captured goods or livestock after victory.", "Israel keeps the cattle from the defeated cities."];
  else if (/all the cattle.*spoil/.test(lower)) opening = ["The cattle and city spoil are kept after Bashan is defeated.", "The victory provides both territory and supplies for Israel."];
  else if (/spoil of the cities/.test(lower)) opening = ["Spoil means goods taken after a battle.", "The captured cities provide supplies after the victory."];
  else if (/aroer/.test(lower)) opening = ["Aroer is a city near the Arnon River.", "The place name marks the southern edge of the conquered territory."];
  else if (/unto gilead/.test(lower)) opening = ["Gilead is the hill country farther north.", "The victory stretches from the Arnon region up toward Gilead."];
  else if (/forbad us/.test(lower)) opening = ["Forbad means forbade or commanded not to enter.", "Israel stops where the LORD's boundary stops."];
  else if (/way to bashan/.test(lower)) opening = ["Bashan lies north of the land taken from Sihon.", "Israel's next movement brings them toward Og's kingdom."];
  else if (/og the king of bashan came out/.test(lower)) opening = ["Og comes out with his people to fight Israel.", "The next threat is another powerful king east of Jordan."];
  else if (/battle at edrei/.test(lower)) opening = ["Edrei is the battle location against Og.", "The victory over Bashan happens at a real named place."];
  else if (/fear him not/.test(lower)) opening = ["Og's size and strength must not control Israel's response.", "The battle will be decided by the LORD, not by Og's reputation."];
  else if (/i will deliver him/.test(lower)) opening = ["The LORD promises to hand Og over to Israel.", "The battle is framed by God's assurance before it begins."];
  else if (/as thou didst unto sihon/.test(lower)) opening = ["Og will fall as Sihon fell.", "The earlier victory becomes a lesson for trusting God again."];
  else if (/delivered into our hands/.test(lower)) opening = ["Delivered into our hands means God gave the enemy into Israel's power.", "Moses repeats that Bashan was won by the LORD's action."];
  else if (/og also/.test(lower)) opening = ["Og is named as the second major king defeated east of Jordan.", "His defeat confirms that Sihon's fall was not a one-time accident."];
  else if (/all his cities/.test(lower)) opening = ["Og's cities are included in the victory.", "The conquest reaches more than the battlefield."];
  else if (/city which we took not/.test(lower)) opening = ["Every city in that region was taken.", "Moses stresses the completeness of the victory."];
  else if (/region of argob/.test(lower)) opening = ["Argob was a district in Bashan.", "The whole region is named to show the size of what God gave."];
  else if (/unwalled towns/.test(lower)) opening = ["Unwalled towns were settlements without defensive walls.", "Even smaller villages are counted along with the fortified cities."];
  else if (/utterly destroyed/.test(lower)) opening = ["Utterly destroyed means devoted to complete judgment.", "Moses compares Og's defeat to Sihon's earlier defeat."];
  else if (/as we did unto sihon/.test(lower)) opening = ["The same judgment that fell on Sihon falls on Og.", "Moses connects the two victories as one movement of God's power."];
  else if (/all the cattle/.test(lower)) opening = ["The cattle are counted among what Israel receives after victory.", "The battle leaves Israel with provision as well as land."];
  else if (/mount hermon/.test(lower)) opening = ["Mount Hermon marks the far northern reach of the conquered land.", "Moses is mapping the territory God gave east of Jordan."];
  else if (/sidonians call sirion/.test(lower)) opening = ["Sirion is the Sidonian name for Hermon.", "Different peoples knew the same mountain by different names."];
  else if (/bedstead of iron/.test(lower)) opening = ["Og's iron bedstead points to his unusual size and strength.", "The detail makes his defeat feel even more striking."];
  else if (/nine cubits/.test(lower)) opening = ["A cubit was a forearm-length measure.", "Nine cubits describes a very long bed, emphasizing Og's giant-like scale."];
  else if (/possessed at that time/.test(lower)) opening = ["The land east of Jordan is now possessed by Israel.", "What began as victory becomes assigned territory."];
  else if (/half mount gilead/.test(lower)) opening = ["Half of Gilead is included in the eastern inheritance.", "The land is being divided into real regions."];
  else if (/kingdom of og/.test(lower)) opening = ["Bashan had been Og's kingdom.", "That former royal territory becomes part of Israel's possession."];
  else if (/half tribe of manasseh/.test(lower)) opening = ["Half of Manasseh receives part of the land east of Jordan.", "The tribe is split between eastern and western inheritance."];
  else if (/reubenites.*gadites/.test(lower)) opening = ["Reuben and Gad also receive east-Jordan land.", "Their inheritance matches the earlier agreement about settling there."];
  else if (/jordan, and the coast/.test(lower)) opening = ["The Jordan and its border mark the edge of the eastern allotment.", "The inheritance is described with geographic limits."];
  else if (/commanded you at that time/.test(lower)) opening = ["Moses reminds the east-side tribes of their duty.", "Receiving land early did not release them from helping the rest of Israel."];
  else if (/armed before your brethren/.test(lower)) opening = ["The armed men must cross ahead with their brothers.", "Their inheritance comes with shared responsibility."];
  else if (/wives.*little ones/.test(lower)) opening = ["Families may remain in the protected cities.", "The warriors leave households behind while they help Israel fight."];
  else if (/much cattle/.test(lower)) opening = ["Moses recognizes their large herds.", "Their east-side settlement fits their livestock needs, but not at the cost of brotherly duty."];
  else if (/given rest unto your brethren/.test(lower)) opening = ["Rest means settled safety in the land.", "The eastern tribes must help until their brothers receive rest too."];
  else if (/things which thine eyes have seen/.test(lower)) opening = ["The things their eyes saw are God's acts at Horeb and in the journey.", "Israel must not let witnessed mercy fade from memory."];
  else if (/eyes have seen/.test(lower)) opening = ["Israel has already seen what the LORD did to Sihon and Og.", "Past victory is meant to strengthen future courage."];
  else if (/shall not fear them/.test(lower)) opening = ["The people must not fear the remaining enemies.", "The LORD who fought for them east of Jordan will fight again."];
  else if (/besought the lord/.test(lower)) opening = ["Besought means pleaded or begged.", "Moses honestly asks the LORD to let him enter the land."];
  else if (/begun to shew/.test(lower)) opening = ["Moses says the LORD has started showing him divine greatness.", "The victories over Sihon and Og have given him a glimpse of God's power."];
  else if (/shew you the word/.test(lower)) opening = ["Shew means show.", "Moses' role was to make the LORD's word known to the people."];
  else if (/mighty hand/.test(lower) && section.chapter === 3) opening = ["The mighty hand pictures God's powerful action.", "Moses has seen the LORD defeat kings and give land."];
  else if (/what god is there/.test(lower)) opening = ["Moses declares that no god compares with the LORD.", "His prayer begins with worship before request."];
  else if (/let me go over/.test(lower)) opening = ["Moses asks to cross Jordan and see Canaan.", "He longs to enter the land he has led Israel toward."];
  else if (/wroth with me/.test(lower)) opening = ["Wroth means angry.", "Moses' earlier failure still keeps him from entering the land."];
  else if (/charge joshua/.test(lower)) opening = ["Charge means give a solemn responsibility.", "Moses must strengthen Joshua because Joshua will lead the crossing."];
  else if (/let it suffice/.test(lower)) opening = ["God is telling Moses to let the matter stop there.", "The answer about entering the land will not be reopened."];
  else if (/speak no more/.test(lower)) opening = ["God tells Moses not to keep asking about entering Canaan.", "The answer is final even though Moses is loved by the LORD."];
  else if (/lift up thine eyes.*heaven/.test(lower)) opening = ["Lifting the eyes to heaven could become worship of sun, moon, and stars.", "Moses warns Israel not to turn creation into gods."];
  else if (/lift up thine eyes/.test(lower)) opening = ["Moses may look at the land from a distance.", "God grants him sight of the promise, but not entrance into it."];
  else if (/not go over this jordan/.test(lower)) opening = ["Moses will not cross the Jordan River.", "His leadership reaches the edge of the land and stops there."];
  else if (/joshua.*go over/.test(lower)) opening = ["Joshua will cross before the people.", "The next leader will complete what Moses cannot."];
  else if (/cause them to inherit/.test(lower)) opening = ["Joshua will lead Israel into its inheritance.", "God's promise continues through a new leader."];
  else if (/now therefore hearken/.test(lower)) opening = ["Hearken means listen with the intent to obey.", "Moses turns from history to urgent covenant instruction."];
  else if (/statutes and unto the judgments/.test(lower)) opening = ["Statutes and judgments are God's commands and legal rulings.", "Israel must learn how to live under His covenant."];
  else if (/which i teach you/.test(lower)) opening = ["Moses teaches so Israel can understand and obey.", "The law is not meant to stay abstract or hidden."];
  else if (/for to do them/.test(lower)) opening = ["The commands are given to be practiced.", "Hearing without obedience would miss the point."];
  else if (/that ye may live/.test(lower) && section.chapter === 5) opening = ["Living means continuing in the good of God's covenant path.", "Moses ties obedience to life, peace, and endurance in the land."];
  else if (/that ye may live/.test(lower)) opening = ["Life is tied to covenant obedience.", "Moses is not offering trivia; he is teaching the path of life in the land."];
  else if (/not add/.test(lower)) opening = ["Adding to God's word means treating His command as incomplete.", "Israel must not improve the law by inventing extra authority."];
  else if (/diminish/.test(lower)) opening = ["Diminish means take away or reduce.", "Israel must not cut down God's command to make it easier."];
  else if (/taught you statutes/.test(lower)) opening = ["Moses has already taught Israel the LORD's commands.", "The people are responsible to live what they have received."];
  else if (/lord my god commanded/.test(lower)) opening = ["Moses teaches under God's command.", "His authority comes from the LORD, not from personal opinion."];
  else if (/keep therefore and do/.test(lower)) opening = ["Israel must hold God's commands carefully and then carry them out.", "Their wisdom is meant to be visible in obedient living."];
  else if (/wisdom and your understanding/.test(lower)) opening = ["Wisdom and understanding mean the nations can see sense and justice in Israel's life.", "Obedience makes God's people visibly different."];
  else if (/sight of the nations/.test(lower)) opening = ["The nations will watch Israel's life.", "God's law is meant to display His wisdom before surrounding peoples."];
  else if (/god so nigh/.test(lower)) opening = ["Nigh means near.", "Israel's greatness is that the LORD is close when they call on Him."];
  else if (/righteous/.test(lower)) opening = ["Righteous statutes are just and good commands.", "Israel's law reflects the character of the LORD who gave it."];
  else if (/only take heed/.test(lower)) opening = ["Take heed means pay careful attention.", "Moses warns Israel to guard its heart and memory."];
  else if (/keep thy soul diligently/.test(lower)) opening = ["Keeping the soul diligently means guarding one's inner life carefully.", "Israel must not let memory and worship drift."];
  else if (/forget the things/.test(lower)) opening = ["Forgetting means losing hold of what God has shown them.", "The danger is that seen mercy becomes ignored history."];
  else if (/teach them thy sons/.test(lower)) opening = ["Parents must teach God's acts and words to their children.", "Faithful memory is meant to move into the next generation."];
  else if (/sons' sons/.test(lower)) opening = ["Sons' sons means grandchildren.", "The story of God's covenant must be carried beyond one generation."];
  else if (/stood before the lord.*horeb/.test(lower)) opening = ["Horeb is Sinai, where Israel stood before God.", "Moses reminds them of the mountain where covenant words were heard."];
  else if (/declared unto you his covenant/.test(lower)) opening = ["God declared His covenant by speaking His commandments.", "Israel's relationship with Him is grounded in His revealed word."];
  else if (/good heed unto yourselves/.test(lower) && section.chapter === 4) opening = ["Moses tells Israel to be deeply careful with worship.", "They saw God's fire, but no visible shape to copy."];
  else if (/no manner of similitude/.test(lower)) opening = ["Similitude means visible form or shape.", "Israel saw no form of God at Horeb, so they must not invent one."];
  else if (/shall corrupt yourselves/.test(lower)) opening = ["Future corruption would mean turning settled life into false worship.", "The danger does not disappear once Israel has children and land."];
  else if (/corrupt yourselves/.test(lower)) opening = ["Corrupt yourselves means ruin worship by turning it false.", "Making an image would damage Israel's covenant life."];
  else if (/make a graven image/.test(lower) && section.reference === "Deuteronomy 4:25-30") opening = ["A graven image in the future would prove Israel had forgotten the LORD.", "Moses warns that settled generations can still fall into idol worship."];
  else if (/graven image/.test(lower) && section.reference === "Deuteronomy 5:8-10") opening = ["A graven image is a carved or crafted idol.", "The command forbids making images for worship."];
  else if (/graven image/.test(lower)) opening = ["A carved idol would turn worship toward something made by human hands.", "The LORD must not be represented by an object Israel can shape."];
  else if (/likeness of male or female/.test(lower)) opening = ["Male or female likeness means a human-shaped image.", "Israel must not reduce God to a human form."];
  else if (/likeness of any beast/.test(lower)) opening = ["An animal likeness would copy created life for worship.", "The Creator must not be confused with creatures."];
  else if (/eyes unto heaven/.test(lower)) opening = ["Looking at sun, moon, and stars could tempt Israel into worshiping them.", "The heavens are created things, not gods."];
  else if (/angry with me/.test(lower)) opening = ["Moses again remembers the LORD's anger over his failure.", "The warning is personal: even Moses did not escape consequence."];
  else if (/not go over jordan/.test(lower)) opening = ["Moses will not cross into Canaan.", "The people will enter, but he must stop on the east side."];
  else if (/good land.*giveth/.test(lower)) opening = ["This is the promised land given by the LORD as Israel's inheritance.", "Moses warns that such a gift must not lead them into idolatry."];
  else if (/must die in this land/.test(lower)) opening = ["Moses must die east of Jordan.", "His death will happen before the people cross into their inheritance."];
  else if (/forget the covenant of thy fathers/.test(lower)) opening = ["God will not forget the covenant He swore to Israel's fathers.", "His mercy rests on His faithful promise, not on Israel's perfect record."];
  else if (/forget the covenant/.test(lower)) opening = ["Forgetting the covenant means living as if God's spoken relationship does not matter.", "Idolatry would be covenant betrayal."];
  else if (/consuming fire/.test(lower)) opening = ["A consuming fire burns up what is unholy.", "The phrase warns that the LORD's holiness is not safe to treat casually."];
  else if (/jealous god/.test(lower)) opening = ["Jealous means the LORD will not share covenant worship with idols.", "His people belong to Him and must not give worship elsewhere."];
  else if (/beget children/.test(lower)) opening = ["Moses looks ahead to future generations born in the land.", "The warning is for Israel after they become settled."];
  else if (/remained long/.test(lower)) opening = ["Long life in the land could make Israel careless.", "Settled comfort can become dangerous if memory fades."];
  else if (/shall corrupt yourselves/.test(lower)) opening = ["Future idolatry would corrupt Israel's worship.", "The warning assumes the danger will remain after they enter Canaan."];
  else if (/provoke him to anger/.test(lower)) opening = ["Provoke means stir up anger.", "Idolatry would offend the LORD because it breaks covenant loyalty."];
  else if (/utterly perish/.test(lower)) opening = ["Utterly perish means be removed in severe judgment.", "The land gift can be lost if Israel turns to idols."];
  else if (/seek the lord/.test(lower)) opening = ["Seeking the LORD means turning back to Him with the whole heart.", "Even after failure, mercy is found by returning to God."];
  else if (/merciful god/.test(lower)) opening = ["Merciful means compassionate and ready to show pity.", "Moses grounds hope in God's character, not Israel's strength."];
  else if (/not forsake/.test(lower)) opening = ["Forsake means abandon.", "The LORD will not leave repentant Israel without mercy."];
  else if (/neither destroy thee/.test(lower)) opening = ["God's mercy keeps judgment from being the final word.", "He can discipline without erasing His covenant people."];
  else if (/nor forget the covenant/.test(lower)) opening = ["God will not forget His covenant with the fathers.", "His promise remains stronger than Israel's failure."];
  else if (/wood and stone/.test(lower)) opening = ["Wood and stone are materials used to make idols.", "Moses mocks idols as handmade objects, not living gods."];
  else if (/neither see/.test(lower)) opening = ["Idols cannot see, hear, eat, or smell.", "They have no life and cannot answer worshipers."];
  else if (/days that are past/.test(lower)) opening = ["Moses tells Israel to look back through history.", "No other nation has experienced God the way Israel has."];
  else if (/created man/.test(lower)) opening = ["The question reaches back to creation itself.", "Moses wants Israel to feel how unique God's revelation has been."];
  else if (/hear the voice of god/.test(lower)) opening = ["Israel heard God's voice and lived.", "That experience sets them apart from the nations."];
  else if (/heard his voice out of the midst of the fire/.test(lower)) opening = ["Israel heard God's voice coming from the fire.", "The leaders know the covenant words came from the living LORD."];
  else if (/mount out of the midst of the fire/.test(lower)) opening = ["The LORD spoke from the mountain fire at Horeb.", "The setting made His covenant words feel weighty and holy."];
  else if (/speaking out of the midst of the fire/.test(lower)) opening = ["God's voice came out of the fire and Israel lived.", "Moses uses that wonder to show how unusual Israel's experience was."];
  else if (/midst of the fire/.test(lower)) opening = ["God spoke from the fire at Sinai.", "The fire showed His holiness while His voice gave covenant words."];
  else if (/mighty hand/.test(lower) && section.chapter === 4) opening = ["A mighty hand describes the LORD's saving force in the exodus.", "Israel's rescue came by power no nation could match."];
  else if (/unto thee it was shewed/.test(lower)) opening = ["Shewed means shown.", "God revealed these things so Israel would know He alone is the LORD."];
  else if (/loved thy fathers/.test(lower)) opening = ["The rescue began with God's love for the fathers.", "Israel's story rests on promise and grace before it rests on obedience."];
  else if (/stretched out arm/.test(lower)) opening = ["A stretched out arm pictures God's powerful action in rescue.", "The phrase points back to the exodus deliverance."];
  else if (/great terrors/.test(lower)) opening = ["Great terrors are fearful acts of judgment and power.", "Egypt saw that Israel's God was not weak."];
  else if (/lord he is god/.test(lower)) opening = ["Moses wants Israel to know the LORD alone is God.", "The exodus and Sinai were meant to settle that truth in their hearts."];
  else if (/none else/.test(lower)) opening = ["None else means there is no other true God beside Him.", "Israel's worship must be exclusive because the LORD alone is God."];
  else if (/keep therefore his statutes/.test(lower)) opening = ["Knowing the LORD must lead to keeping His commands.", "Truth about God is meant to become obedience."];
  else if (/go well with thee/.test(lower)) opening = ["Go well means life ordered under God's blessing.", "Obedience is connected to flourishing in the land."];
  else if (/children after thee/.test(lower)) opening = ["The children after thee are future generations.", "Faithfulness now affects the life Israel's children inherit."];
  else if (/take heed unto yourselves/.test(lower) && section.reference === "Deuteronomy 4:21-24") opening = ["Moses tells Israel to keep watch over their covenant loyalty.", "The warning comes because the people will enter the land he cannot enter."];
  else if (/slayer might flee/.test(lower)) opening = ["A slayer is someone who has killed a person.", "The refuge city gives a place to run while the case is judged."];
  else if (/kill his neighbour unawares/.test(lower)) opening = ["Unawares means unintentionally.", "The refuge law protects someone who caused death without planning murder."];
  else if (/hated him not/.test(lower)) opening = ["Not hating him before means there was no old hostility.", "The law distinguishes an accident from a planned attack."];
  else if (/bezer/.test(lower)) opening = ["Bezer is one of the refuge cities east of Jordan.", "Its location gives safety for Reuben's territory."];
  else if (/ramoth/.test(lower)) opening = ["Ramoth is a refuge city in the region of Gilead.", "Its location helps make legal protection reachable in that part of the land."];
  else if (/golan/.test(lower)) opening = ["Golan is the refuge city assigned in Bashan.", "It gives the northern eastern tribes access to the same protection."];
  else if (/on this side jordan/.test(lower)) opening = ["This side Jordan means the east side where Moses is speaking.", "The cities and commands are placed before Israel crosses west into Canaan."];
  else if (/sihon king of the amorites/.test(lower)) opening = ["Sihon was the Amorite king defeated east of Jordan.", "His land forms part of the setting where Moses now teaches."];
  else if (/og king of bashan/.test(lower)) opening = ["Og was the king of Bashan defeated after Sihon.", "His fall marks the northern part of Israel's east-side victory."];
  else if (/these are the testimonies/.test(lower) && section.reference === "Deuteronomy 4:47-49") opening = ["The testimonies introduce Moses' covenant teaching after the victories.", "The law is restated in the land east of Jordan."];
  else if (/these are the testimonies/.test(lower)) opening = ["Testimonies are covenant words that witness to what God requires.", "Moses is about to restate the law for the people."];
  else if (/statutes.*judgments|statutes and the judgments/.test(lower)) opening = ["Statutes and judgments are commands and legal rulings.", "They teach Israel how covenant life is supposed to work."];
  else if (/moses spake unto the children/.test(lower)) opening = ["Moses speaks these words to Israel after the exodus.", "The rescued people must now hear how to live with God."];
  else if (/came forth out of egypt/.test(lower)) opening = ["Coming out of Egypt means Israel has been rescued from bondage.", "The law is given to a delivered people, not to earn deliverance."];
  else if (/made a covenant/.test(lower)) opening = ["A covenant is a binding relationship with promises and commands.", "At Horeb, the LORD formally bound Israel to Himself."];
  else if (/but with us/.test(lower)) opening = ["Moses says the covenant is for the living generation too.", "They must not treat Sinai as only their parents' story."];
  else if (/face to face/.test(lower)) opening = ["Face to face means God addressed Israel directly and personally.", "The phrase stresses nearness, not that Israel saw God's shape."];
  else if (/mount out of the midst/.test(lower)) opening = ["The fire on the mountain showed God's holy presence.", "Israel heard covenant words from a terrifying scene."];
  else if (/stood between/.test(lower)) opening = ["Moses stood as mediator between the LORD and the people.", "He brought God's word to them when they feared the fire."];
  else if (/afraid by reason of the fire/.test(lower)) opening = ["The people were afraid because God's fire was overwhelming.", "Their fear explains why Moses stood between them and the LORD."];
  else if (/graven image/.test(lower) && section.chapter === 5) opening = ["A graven image is a carved or crafted idol.", "The command forbids making images for worship."];
  else if (/heaven above/.test(lower)) opening = ["Heaven above includes the sky and heavenly bodies.", "Nothing in the heavens may become an image for worship."];
  else if (/earth beneath/.test(lower)) opening = ["Earth beneath includes creatures and things on the ground.", "No created thing on earth may represent God in worship."];
  else if (/waters beneath/.test(lower)) opening = ["The waters beneath the earth point to sea creatures and hidden depths.", "Even mysterious parts of creation must not become idols."];
  else if (/bow down/.test(lower)) opening = ["Bowing down means giving worship or reverence.", "Israel must not honor images as gods."];
  else if (/nor serve them/.test(lower)) opening = ["Serve them means give religious loyalty and obedience to idols.", "The command forbids both worship gestures and lived devotion."];
  else if (/sabbath day/.test(lower)) opening = ["Sabbath is the weekly day of rest set apart to the LORD.", "To sanctify it means treat it as holy."];
  else if (/six days.*labour/.test(lower)) opening = ["Ordinary work belongs in the six workdays.", "The command gives work a place so rest can be protected."];
  else if (/not do any work/.test(lower)) opening = ["The Sabbath stops ordinary labor.", "Rest is part of covenant obedience, not laziness."];
  else if (/son.*daughter/.test(lower)) opening = ["The Sabbath rest reaches children in the household.", "The command is not only for the head of the family."];
  else if (/manservant.*maidservant/.test(lower)) opening = ["Manservants and maidservants are male and female servants.", "The Sabbath protects workers from endless labor."];
  else if (/ox.*ass/.test(lower)) opening = ["Even working animals are given rest.", "The command reaches the whole household economy."];
  else if (/servant in the land of egypt/.test(lower)) opening = ["Israel must remember being servants in Egypt.", "Their own rescue from forced labor teaches them to give rest to others."];
  else if (/mountain did burn/.test(lower)) opening = ["The burning mountain recalls Sinai's terrifying holiness.", "The people remember that God's voice came with fire."];
  else if (/heads of your tribes/.test(lower)) opening = ["The tribal heads and elders represent the people.", "They come near to Moses because the whole nation is afraid."];
  else if (/shewed us his glory/.test(lower)) opening = ["God's glory is His revealed majesty.", "Israel knows the mountain event was no ordinary sound or fire."];
  else if (/heard his voice/.test(lower)) opening = ["Israel heard God's voice from the fire.", "The living God spoke words they could understand."];
  else if (/why should we die/.test(lower)) opening = ["The people fear that hearing more will kill them.", "God's holiness feels too weighty for them to bear directly."];
  else if (/fire will consume/.test(lower)) opening = ["Consume means burn up.", "The people fear the holy fire will destroy them."];
  else if (/go thou near/.test(lower)) opening = ["The people ask Moses to go near in their place.", "They want him to hear God's word and bring it back to them."];
  else if (/heard the voice/.test(lower) && section.chapter === 5) opening = ["God listens to the people's request for Moses to stand between them and the fire.", "Their fear of direct exposure to His voice is acknowledged."];
  else if (/well said/.test(lower)) opening = ["God says the people's request was right.", "Their fear recognized the seriousness of hearing the LORD."];
  else if (/such an heart/.test(lower)) opening = ["God wants their heart to stay reverent and obedient.", "The issue is not only what they said once, but whether they will keep fearing Him."];
  else if (/fear me/.test(lower)) opening = ["Fearing God means reverent awe that leads to obedience.", "The LORD wants more than a moment of fear at the mountain."];
  else if (/commandments always/.test(lower)) opening = ["Always means the obedience should continue beyond Sinai.", "The people must keep God's commands in ordinary life."];
  else if (/well with them/.test(lower)) opening = ["God's commands aim at Israel's good.", "Obedience is not empty restriction; it is the path of life."];
  else if (/children for ever/.test(lower)) opening = ["The blessing is meant to reach their children after them.", "Covenant obedience shapes future generations."];
  else if (/observe to do/.test(lower)) opening = ["The command is not only to know God's words but to carry them out carefully.", "Moses presses practiced obedience, not mere agreement."];
  else if (/right hand.*left/.test(lower)) opening = ["Turning aside right or left means leaving the commanded path.", "Israel must not drift from God's way in either direction."];
  else if (/walk in all the ways/.test(lower)) opening = ["Walking in God's ways means living according to His commands.", "Obedience is pictured as a road Israel must stay on."];
  else if (/that it may be well with you/.test(lower)) opening = ["Well with you means life goes rightly under God's care.", "The command connects obedience with covenant blessing."];
  else if (/prolong your days/.test(lower)) opening = ["The promise is about continuing to live many days in the land.", "Remaining in the inheritance is tied to faithful obedience."];
  else opening = ["Moses is teaching one part of Israel's covenant journey.", "The wording points to land, worship, obedience, warning, or God's mercy."];

  return note([
    opening[0],
    opening[1],
    ...getDay48DeuteronomySupport(cleanTitle),
  ].slice(0, 8));
}

function getDay49DeuteronomySupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/son's son|thy son, and thy son's son/.test(lower)) return ["👨‍👩‍👧 Faith must reach the family", "📆 Obedience lasts through life", "🧠 Children inherit remembered truth", "🙌 The LORD forms future generations"];
  if (/son asketh|pharaoh|bondmen|egypt|mighty hand|signs|wonders|household|bring us in|redeemed|bondmen/.test(lower)) return ["👦 Children ask about meaning", "⛓️ Egypt was bondage", "💪 The LORD rescued by power", "🎁 Rescue leads toward inheritance"];
  if (/jordan|fenced|anakims|consuming fire|before thee|righteousness|wickedness|perform the word|provoked|wrath|rebellious|horeb/.test(lower)) return ["🔥 The LORD goes before Israel", "🚫 Pride must be rejected", "⚖️ Judgment falls on wickedness", "🧠 Israel must remember rebellion"];
  if (/set his love|nor choose|more in number|fewest|loved you|oath|faithful god|keepeth covenant|keep unto thee the covenant|establish his covenant|them that love him|hate him|slack|mercy/.test(lower)) return ["❤️ Election begins with God's love", "🤝 The LORD keeps His oath", "👑 God is faithful", "⚖️ Hatred of God is not ignored"];
  if (/hear, o israel|hear therefore|one lord|love the lord|all thine heart|all thy might|teach|upon thine hand|frontlets|posts|gates|walkest|liest|risest|sittest/.test(lower)) return ["❤️ Love reaches the whole life", "👨‍👩‍👧 Children must be taught", "🏠 God's word belongs at home", "🚶 Obedience follows daily rhythms"];
  if (/forget|full|cities|houses|wells|vineyards|olive|beware|goodly|wealth|silver|gold|lifted|my power|power to get wealth|gotten/.test(lower)) return ["⚠️ Fullness can become dangerous", "🏠 Gifts can make people forget", "🧠 Memory guards humility", "🙌 The LORD gives what Israel enjoys"];
  if (/fear|serve|other gods|jealous|destroy|testimonies|statutes|right and good|well|possess|our righteousness|observe/.test(lower)) return ["🙇 Worship belongs to the LORD", "📜 Commands shape covenant life", "🌱 Obedience is for Israel's good", "🔥 Idolatry brings danger"];
  if (/nations|covenant with them|mercy unto them|marriages|thy daughter|his son|his daughter|unto thy son|turn away thy son|following me|canaanites|amorites|jebusites|hivites|perizzites|girgashites/.test(lower)) return ["🚫 Israel must not blend with idolatry", "💍 Marriage can turn worship", "🔥 Covenant loyalty must be guarded", "🏞️ The land must not become Canaanite again"];
  if (/hearken|he will love thee|bless|multiply|fruit|womb|corn|wine|oil|kine|sickness|little by little|hornet|affrighted|mighty god|terrible|destroy/.test(lower)) return ["👂 Hearing leads to doing", "🌾 Blessing reaches daily life", "💪 The LORD fights for Israel", "🐢 Victory may come gradually"];
  if (/graven|images|silver|gold|snared|abomination|detest|abhor|cursed/.test(lower)) return ["🔥 Idols must be destroyed", "🪤 Idol wealth is a trap", "🏠 Nothing cursed belongs at home", "🚫 God's people must reject false worship"];
  if (/chasteneth|son|walk in his ways|fear him|good land|brooks|wheat|barley|vines|fig|pomegranates|oil|honey|bread|scarceness|brass|lack/.test(lower)) return ["👨‍👦 Discipline trains God's people", "🏞️ The land is generous", "🍞 Provision comes from the LORD", "🙇 Blessing should lead to fear"];
  if (/wilderness|fiery serpents|no water|manna|humble|prove|bread only|word|perish/.test(lower)) return ["🏜️ Wilderness exposed dependence", "🍞 Manna taught trust", "⬇️ Humbling fought pride", "⚰️ Forgetting leads to ruin"];
  if (/tables|stone|bread nor drink|finger of god|molten|calf|stiffnecked|brake|burned|ground|dust|brook|aaron/.test(lower)) return ["🪨 Covenant words were written", "🐄 Israel made the calf", "💥 Sin broke covenant fellowship", "🙏 Moses interceded for mercy"];
  if (/fell down|forty days|sins|wickedly|hearkened|taberah|massah|kibrothhattaavah|kadeshbarnea|believed him not|destroy not|inheritance|abraham|isaac|jacob|stubbornness|wickedness|hated/.test(lower)) return ["🙏 Moses pleads for Israel", "💔 Rebellion is remembered honestly", "🤝 The fathers' covenant matters", "🙌 Israel belongs to the LORD"];

  return ["📖 Moses warns the new generation", "🧠 Memory must shape obedience", "🙌 The LORD is the source of life", "🚫 Pride and idols must be rejected"];
}

function getDay49DeuteronomyLeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const concept = cleanTitle
    .replace(/\b(the|thy|thine|thou|ye|your|you|shalt|shall|unto|into|with|from|before|after|and|or|of|in|on|to|for|that|this|he|his|him|me|my|our|us|lord|god)\b/gi, " ")
    .replace(/[^A-Za-z0-9' -]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 3)
    .join(" ")
    .toLowerCase();
  const mark = (line: string) => concept ? `${line}: ${concept}` : line;

  if (/with all thine heart/.test(lower)) return "🫀 Loyalty begins inside";
  if (/because the lord loved you/.test(lower)) return "🤲 Grace comes before Israel's greatness";
  if (/gotten me this wealth|my power/.test(lower)) return "💰 Prosperity can become self-credit";
  if (/not for thy righteousness|my righteousness/.test(lower)) return "🧎 The gift is not proof of greatness";
  if (/molten image|molten calf/.test(lower)) return "🔨 Handmade worship replaces trust";
  if (/commandments|statutes|judgments|testimonies/.test(lower)) return mark("📜 Covenant life needs clear instruction");
  if (/son's son|children|teach/.test(lower)) return mark("👨‍👩‍👧 Faith is practiced where children can learn");
  if (/all the days|always/.test(lower)) return mark("📆 Obedience is meant to last");
  if (/\bhear\b|hear therefore|hear, o israel/.test(lower)) return mark("👂 Listening is the doorway to obedience");
  if (/milk and honey|good land|brooks|wheat|barley|vines|fig|pomegranates|oil|honey|bread without/.test(lower)) return mark("🏞️ The promised land is generous");
  if (/one lord|love the lord|heart|might/.test(lower)) return mark("❤️ Loyalty reaches the whole person");
  if (/house|hand|frontlets|posts|gates|walkest|liest|risest|sittest/.test(lower)) return mark("🏠 God's word belongs in ordinary life");
  if (/sware|oath|fathers|abraham|isaac|jacob|covenant/.test(lower)) return mark("🤝 Promise stands behind the gift");
  if (/cities|wells|vineyards|full|wealth|silver|gold|gotten|power/.test(lower)) return mark("⚠️ Gifts can tempt the heart toward pride");
  if (/forget|remember|know|consider/.test(lower)) return mark("🧠 Memory protects worship");
  if (/fear|serve|swear|worship/.test(lower)) return mark("🙇 Reverence must become allegiance");
  if (/other gods|jealous|idol|image|calf|abomination|cursed|snared/.test(lower)) return mark("🚫 False worship must be rejected");
  if (/son asketh|bondmen|egypt|pharaoh|redeemed|mighty hand|signs|wonders/.test(lower)) return mark("⛓️ Rescue explains Israel's obedience");
  if (/bring.*land|possess|jordan|nations|anakims|fenced/.test(lower)) return mark("🏞️ Israel is entering a real inheritance");
  if (/marriages|daughter|son|turn away/.test(lower)) return mark("💍 Household loyalty can shape worship");
  if (/loved you|set his love|choose|fewest|faithful/.test(lower)) return mark("❤️ Grace comes before Israel's greatness");
  if (/bless|multiply|fruit|womb|kine|sickness|little by little|hornet|affrighted|terrible/.test(lower)) return mark("🌾 Blessing reaches daily life");
  if (/chasteneth|humble|prove|wilderness|manna|serpents|no water/.test(lower)) return mark("🏜️ Wilderness need trained dependence");
  if (/righteousness|wickedness|wrath|rebellious|stiffnecked|provoked/.test(lower)) return mark("🚫 Pride cannot explain mercy");
  if (/tables|stone|finger|brake|burned|ground|dust|brook|aaron/.test(lower)) return mark("🪨 The covenant breach becomes visible");
  if (/fell down|forty days|destroy not|inheritance|stubbornness|sin|hated/.test(lower)) return mark("🙏 Mercy is asked for guilty people");

  return mark("📌 One concrete detail carries Moses' warning");
}

function explainDay49DeuteronomyAt95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/these are the commandments/.test(lower)) opening = ["Moses is naming the commands Israel must learn before entering the land.", "The promised land is not a place for spiritual guessing."];
  else if (/statutes.*judgments/.test(lower) && section.chapter === 6) opening = ["Statutes and judgments are God's commands and legal rulings.", "Israel needs both worship direction and community justice."];
  else if (/son's son/.test(lower)) opening = ["Son and son's son means children and grandchildren.", "The fear of the LORD must pass beyond one generation."];
  else if (/all the days/.test(lower)) opening = ["Moses is speaking about obedience that lasts for a whole lifetime.", "The fear of the LORD is meant to continue beyond one brief season."];
  else if (/hear therefore/.test(lower)) opening = ["Hear means listen in a way that receives and obeys.", "Israel's life in the land begins with attention to the LORD."];
  else if (/milk and honey/.test(lower)) opening = ["Milk and honey picture rich provision and plenty.", "The land is generous because the LORD is giving it."];
  else if (/hear, o israel/.test(lower)) opening = ["Moses is calling the whole covenant people to listen with full attention.", "What follows is not casual advice but the central truth Israel must receive."];
  else if (/one lord/.test(lower)) opening = ["The LORD being one means Israel has one true covenant God.", "Their worship must not be divided among many gods."];
  else if (/love the lord/.test(lower)) opening = ["Loving the LORD means covenant loyalty, not only emotion.", "Israel must respond to rescue with whole-person devotion."];
  else if (/all thine heart/.test(lower)) opening = ["The heart is the inner center of thought, desire, and loyalty.", "God wants love that reaches the inside of the person."];
  else if (/all thy might/.test(lower)) opening = ["Might means strength, capacity, and energy.", "Love for the LORD must reach what Israel does, not only what Israel says."];
  else if (/teach them diligently/.test(lower)) opening = ["Teach diligently means repeat and impress the words carefully.", "Children should grow up hearing God's commands as part of normal life."];
  else if (/sittest in thine house/.test(lower)) opening = ["Sitting in the house means ordinary family time.", "God's word belongs in daily home life, not only public worship."];
  else if (/bind them.*hand/.test(lower)) opening = ["Binding the words on the hand pictures keeping God's commands close to action.", "What Israel does with its hands should answer God's word."];
  else if (/frontlets/.test(lower)) opening = ["Frontlets were reminders worn near the forehead or eyes.", "The image teaches Israel to keep God's words before their attention."];
  else if (/posts of thy house/.test(lower)) opening = ["Writing the words on house posts makes the home a place of remembrance.", "God's commands should mark where Israel lives."];
  else if (/on thy gates/.test(lower)) opening = ["Gates are the public entrance points of a home or city.", "God's word should shape both private life and public community."];
  else if (/sware unto thy fathers/.test(lower)) opening = ["Sware means promised with an oath.", "The good land rests on God's promise to Abraham, Isaac, and Jacob."];
  else if (/cities.*buildedst not/.test(lower)) opening = ["Israel will receive cities they did not build.", "The gift could tempt them to forget the giver."];
  else if (/houses full/.test(lower)) opening = ["The houses will already contain good things.", "Israel will enjoy provision that came before their own labor."];
  else if (/wells digged/.test(lower)) opening = ["Wells were life-giving water sources.", "Israel will drink from work they did not do."];
  else if (/vineyards.*olive/.test(lower)) opening = ["These are established crops that normally require years of labor before yielding well.", "Israel will receive long-term provision it did not build for itself."];
  else if (/eaten and be full/.test(lower)) opening = ["Fullness means the danger comes after blessing, not only during need.", "Comfort can make rescued people forget rescue."];
  else if (/beware lest thou forget/.test(lower)) opening = ["Beware means watch out carefully.", "The danger is forgetting the LORD after enjoying His gifts."];
  else if (/fear the lord thy god/.test(lower) && section.chapter === 6) opening = ["Fearing the LORD means reverent loyalty and obedience.", "Israel must treat Him as holy while living in His land."];
  else if (/serve him/.test(lower) && section.chapter === 6) opening = ["Serving the LORD means worshiping and obeying Him.", "Israel's labor and loyalty must belong to Him."];
  else if (/swear by his name/.test(lower)) opening = ["Swearing by His name means making solemn promises under the LORD's authority.", "Israel must not invoke other gods for truth or trust."];
  else if (/go after other gods/.test(lower)) opening = ["Going after other gods means pursuing rival worship.", "The surrounding nations must not become Israel's spiritual teachers."];
  else if (/jealous god/.test(lower)) opening = ["Jealous means the LORD will not share covenant worship with idols.", "His people belong to Him and must not give themselves to other gods."];
  else if (/destroy thee from off/.test(lower)) opening = ["Being destroyed from the earth means covenant judgment in the land.", "Idolatry threatens Israel's life with God."];
  else if (/diligently keep/.test(lower)) opening = ["Diligently keep means guard with care.", "Israel must not treat God's commands casually."];
  else if (/what mean/.test(lower)) opening = ["The child is asking why Israel keeps these covenant words.", "The answer must connect the commands to the LORD's rescue from Egypt."];
  else if (/testimonies/.test(lower) && section.chapter === 6) opening = ["Testimonies are covenant words that witness to what God has done and requires.", "They remind Israel who rescued them and how to live."];
  else if (/his statutes/.test(lower) && section.chapter === 6) opening = ["Statutes are commanded practices from the LORD.", "Israel's daily life must follow His order."];
  else if (/right and good/.test(lower)) opening = ["Right and good means pleasing to the LORD and fitting with His covenant.", "Obedience is not bare rule-keeping; it is living rightly before God."];
  else if (/well with thee/.test(lower)) opening = ["Well with thee means life goes rightly under God's care.", "Moses connects obedience with flourishing in the land."];
  else if (/possess the good land/.test(lower)) opening = ["Possessing the good land means entering and living in God's gift.", "The land is received through trust and obedience."];
  else if (/cast out all thine enemies/.test(lower)) opening = ["Casting out enemies means the LORD removes opposition before Israel.", "The land will not be secured by Israel's strength alone."];
  else if (/son asketh/.test(lower)) opening = ["Moses expects children to ask why Israel keeps these commands.", "Parents must answer with the story of rescue, not empty tradition."];
  else if (/pharaoh's bondmen/.test(lower)) opening = ["Bondmen means slaves.", "Israel's obedience begins with remembering they were enslaved in Egypt."];
  else if (/mighty hand/.test(lower) && section.chapter === 6) opening = ["The mighty hand pictures God's saving power.", "Israel did not free itself from Pharaoh."];
  else if (/signs and wonders/.test(lower)) opening = ["This refers to the extraordinary acts God performed against Egypt.", "Those events proved that Pharaoh could not resist the LORD's power."];
  else if (/pharaoh.*household/.test(lower)) opening = ["God's judgment reached Pharaoh and his whole household.", "The rescue story includes both mercy for Israel and judgment on Egypt."];
  else if (/bring us in/.test(lower)) opening = ["God brought Israel out in order to bring them in.", "Freedom from Egypt was meant to lead to life in the promised land."];
  else if (/commanded us to do/.test(lower)) opening = ["The LORD's commands are Israel's response to rescue.", "They obey as a people already delivered."];
  else if (/fear the lord our god/.test(lower)) opening = ["Fearing the LORD means living with reverence before Him.", "Israel's obedience should flow from awe, gratitude, and loyalty."];
  else if (/for our good always/.test(lower)) opening = ["God's commands are described as working for Israel's lasting life and protection.", "The law is not given to crush them but to preserve them under His care."];
  else if (/preserve us alive/.test(lower)) opening = ["Preserve us alive means keep Israel living before Him.", "The commands guard life with the God who rescued them."];
  else if (/our righteousness/.test(lower)) opening = ["Righteousness here means covenant faithfulness expressed in obedience.", "Israel's right response is to keep what the LORD commanded."];
  else if (/observe to do/.test(lower)) opening = ["Israel is told to put the commands into careful practice.", "Moses keeps pressing obedience that becomes action."];
  else if (/bring thee into the land/.test(lower)) opening = ["The LORD is the one bringing Israel into Canaan.", "The land comes as His gift before it becomes Israel's home."];
  else if (/many nations/.test(lower)) opening = ["Many nations already live in Canaan.", "Israel must know the land is occupied before God gives victory."];
  else if (/seven nations/.test(lower)) opening = ["The seven nations represent Canaan's entrenched peoples.", "They are stronger than Israel, but not stronger than the LORD."];
  else if (/deliver them before thee/.test(lower)) opening = ["God delivering them means handing them over to Israel's victory.", "The conquest depends first on the LORD's action."];
  else if (/no covenant with them/.test(lower)) opening = ["Making no covenant means Israel must not form loyalty agreements with Canaan's idolatrous nations.", "Compromise would endanger worship."];
  else if (/shew mercy unto them/.test(lower)) opening = ["Shew mercy here means spare the nations in a way that preserves their idolatrous influence.", "This command is about guarding covenant worship from corruption."];
  else if (/make marriages/.test(lower)) opening = ["The marriage warning is about spiritual danger, not ethnicity by itself.", "Canaanite marriages could turn Israel's children toward idols."];
  else if (/thy daughter.*his son/.test(lower)) opening = ["Giving an Israelite daughter to a Canaanite son would bind families across worship lines.", "Moses is warning that household ties can become spiritual pressure."];
  else if (/his daughter.*thy son/.test(lower)) opening = ["Taking a Canaanite daughter for an Israelite son creates the same danger in reverse.", "The marriage warning protects worship from being turned toward idols."];
  else if (/daughter.*son/.test(lower)) opening = ["Giving daughters or taking daughters would join households across covenant lines.", "The issue is worship being pulled away from the LORD."];
  else if (/turn away thy son/.test(lower)) opening = ["The danger is that children will be turned from following the LORD.", "Marriage can shape worship and allegiance."];
  else if (/serve other gods/.test(lower)) opening = ["Serving other gods means giving worship and loyalty to idols.", "That is the danger behind the marriage command."];
  else if (/anger of the lord/.test(lower)) opening = ["The LORD's anger burns against idolatry.", "False worship is covenant betrayal, not harmless difference."];
  else if (/set his love/.test(lower)) opening = ["God did not love Israel because they were impressive.", "His choice begins with His own covenant love."];
  else if (/nor choose you/.test(lower)) opening = ["God's choosing was not earned by Israel's size or strength.", "Election is grace, not a reward for greatness."];
  else if (/more in number/.test(lower)) opening = ["Israel was not chosen because it was the largest people.", "God's love cannot be explained by human advantage."];
  else if (/fewest/.test(lower)) opening = ["Israel was the fewest, not the strongest.", "Their smallness makes God's love stand out more clearly."];
  else if (/because the lord loved you/.test(lower)) opening = ["The reason given is simply the LORD's love.", "Israel's identity rests on God's covenant affection."];
  else if (/keep the oath/.test(lower)) opening = ["The oath is God's sworn promise to the fathers.", "He rescues Israel because He keeps His word."];
  else if (/redeemed.*bondmen/.test(lower)) opening = ["Redeemed means bought back or rescued from bondage.", "The LORD brought Israel out of slavery by His power."];
  else if (/know therefore/.test(lower)) opening = ["Know therefore means settle this truth in your mind.", "Israel must build life on who the LORD is."];
  else if (/he is god/.test(lower)) opening = ["The LORD is God means He alone is the true God.", "Israel's worship must match reality."];
  else if (/faithful god/.test(lower)) opening = ["Faithful means dependable and true to His word.", "The LORD keeps covenant instead of changing with moods."];
  else if (/keepeth covenant/.test(lower)) opening = ["Keeping covenant means the LORD remains loyal to His promises.", "His mercy is steady toward those who love Him."];
  else if (/them that love him/.test(lower)) opening = ["Those who love Him respond with covenant loyalty.", "Love and obedience belong together in Deuteronomy."];
  else if (/repayeth them/.test(lower)) opening = ["Repayeth means pays back with judgment.", "Hatred of the LORD is not treated as harmless."];
  else if (/not be slack/.test(lower)) opening = ["Not slack means not slow or careless.", "God will not ignore those who hate Him."];
  else if (/keep the commandments/.test(lower) && section.chapter === 7) opening = ["Keeping the commandments means holding fast to what the LORD requires.", "Knowing God's faithfulness should lead Israel to obey Him."];
  else if (/hearken to these judgments/.test(lower)) opening = ["Hearken means listen and obey.", "The blessings are tied to receiving God's judgments and doing them."];
  else if (/keep, and do/.test(lower)) opening = ["The command is to hold God's words carefully and then live them out.", "Israel's obedience must move from hearing into action."];
  else if (/keep unto thee the covenant/.test(lower)) opening = ["The LORD keeps covenant with His people.", "Israel's obedience lives inside His prior faithfulness."];
  else if (/he will love thee/.test(lower)) opening = ["God's love is pictured as covenant blessing over Israel's life.", "The relationship is meant to be lived, not merely named."];
  else if (/fruit of thy land/.test(lower)) opening = ["The fruit of the land means harvest produce.", "Blessing reaches Israel's fields and food."];
  else if (/increase of thy kine/.test(lower)) opening = ["Kine means cattle.", "The blessing includes the growth of Israel's herds."];
  else if (/all sickness/.test(lower)) opening = ["Taking away sickness means protection from the diseases Israel knew in Egypt.", "The LORD's care reaches the body as well as the field."];
  else if (/say in thine heart/.test(lower) && section.chapter === 7) opening = ["Moses names the fear Israel might hide inside.", "The heart may whisper that the nations are too strong."];
  else if (/more than i/.test(lower)) opening = ["The nations really look stronger than Israel.", "Moses does not deny the fear; he answers it with memory."];
  else if (/how can i dispossess/.test(lower)) opening = ["Dispossess means remove people from possession of land.", "Israel wonders how it can remove nations stronger than itself."];
  else if (/well remember/.test(lower)) opening = ["Well remember means intentionally call the past to mind.", "Fear is answered by remembering what the LORD did in Egypt."];
  else if (/pharaoh/.test(lower) && section.chapter === 7) opening = ["Pharaoh was once the terrifying power Israel could not defeat.", "The LORD had already overthrown a stronger enemy."];
  else if (/the signs, and the wonders/.test(lower)) opening = ["Moses is pointing back to God's dramatic acts against Egypt.", "Remembering them helps Israel trust Him against present enemies."];
  else if (/stretched out arm/.test(lower)) opening = ["The stretched out arm pictures God's active power in rescue.", "Israel's courage must come from remembering His strength."];
  else if (/hornet/.test(lower)) opening = ["The hornet pictures God driving enemies out by means beyond Israel's sword.", "The LORD can make hidden enemies come out."];
  else if (/hide themselves/.test(lower)) opening = ["Enemies who hide will still not be beyond the LORD's reach.", "God's victory does not stop with visible opponents."];
  else if (/affrighted/.test(lower)) opening = ["Affrighted means terrified.", "Israel must not be overwhelmed by the nations' appearance."];
  else if (/god is among you/.test(lower)) opening = ["The LORD being among Israel means His presence goes with them.", "They are not entering the land alone."];
  else if (/mighty god and terrible/.test(lower)) opening = ["Terrible means awe-inspiring or fearsome.", "The LORD is mighty for Israel and dreadful to His enemies."];
  else if (/little and little/.test(lower)) opening = ["Little by little means gradually.", "God may give victory in stages instead of all at once."];
  else if (/not consume them at once/.test(lower)) opening = ["Israel will not remove every enemy immediately.", "Gradual conquest protects the land from becoming overrun by wild animals."];
  else if (/deliver them unto thee/.test(lower)) opening = ["God delivering them means handing the nations over to Israel's victory.", "Even gradual conquest still depends on the LORD's power."];
  else if (/beasts of the field/.test(lower)) opening = ["The beasts of the field are wild animals.", "Empty land without people could become dangerous in another way."];
  else if (/mighty destruction/.test(lower)) opening = ["Mighty destruction means decisive defeat.", "Even gradual victory will still be complete by the LORD's power."];
  else if (/no man be able/.test(lower)) opening = ["No one will be able to stand against Israel when the LORD gives victory.", "The promise answers fear of stronger nations."];
  else if (/images.*burn/.test(lower)) opening = ["The idols must be burned, not collected.", "Israel must destroy the tools of false worship."];
  else if (/silver or gold/.test(lower)) opening = ["The precious metal on idols could tempt Israel.", "God warns them not to keep wealth tied to false worship."];
  else if (/snared/.test(lower)) opening = ["Snared means trapped.", "Keeping idol wealth could pull Israel into the worship attached to it."];
  else if (/abomination.*house/.test(lower)) opening = ["An abomination is something detestable to the LORD.", "Israel must not bring cursed idol objects into the home."];
  else if (/detest/.test(lower)) opening = ["Detest means strongly reject as hateful.", "Israel must train its desires to hate what corrupts worship."];
  else if (/cursed thing/.test(lower)) opening = ["A cursed thing is devoted to destruction under God's judgment.", "Keeping it would make Israel share its uncleanness."];
  else if (/consider in thine heart/.test(lower)) opening = ["Israel is being told to settle this truth deeply in the inner life.", "The wilderness years should be understood as a Father's discipline, not random hardship."];
  else if (/keep the commandments of the lord/.test(lower)) opening = ["Keeping the LORD's commandments is the right response to His fatherly training.", "The wilderness was meant to form obedient sons and daughters."];
  else if (/chasteneth/.test(lower)) opening = ["Chasteneth means disciplines or trains.", "God corrected Israel like a father training his son."];
  else if (/walk in his ways/.test(lower)) opening = ["Walking in His ways means living according to the LORD's commands.", "The wilderness training should become obedient life."];
  else if (/to fear him/.test(lower)) opening = ["Fearing Him means reverent obedience before the LORD.", "Blessing should deepen awe, not erase it."];
  else if (/good land/.test(lower) && section.chapter === 8) opening = ["The good land is rich, watered, and fruitful.", "Moses wants Israel to see it as the LORD's generous gift."];
  else if (/brooks of water/.test(lower)) opening = ["This refers to streams and running water throughout the land.", "Moses is describing a place supplied with the water the wilderness lacked."];
  else if (/wheat, and barley/.test(lower)) opening = ["These are the main grains used for daily bread and common food.", "The land will support ordinary life, not just rare moments of abundance."];
  else if (/vines.*fig.*pomegranates/.test(lower)) opening = ["These are long-term fruit crops that a settled people enjoy.", "Israel will receive productive land it did not plant for itself."];
  else if (/oil olive/.test(lower)) opening = ["Oil olive means olive oil from olive trees.", "The land supplies food, light, and daily provision."];
  else if (/without scarceness/.test(lower)) opening = ["Without scarceness means without shortage.", "Israel will eat bread in plenty after the wilderness."];
  else if (/dig brass/.test(lower)) opening = ["Brass here refers to copper or bronze resources from the hills.", "The land provides minerals as well as food."];
  else if (/forget not the lord/.test(lower) && section.chapter === 8) opening = ["The warning is about forgetting God after success.", "Full barns and good houses can make people act self-made."];
  else if (/not keeping his commandments/.test(lower)) opening = ["Forgetting the LORD shows itself by not keeping His commands.", "Memory and obedience belong together."];
  else if (/hast eaten and art full/.test(lower)) opening = ["Eating and being full names the moment of comfort.", "Moses warns that abundance can dull dependence."];
  else if (/goodly houses/.test(lower)) opening = ["Goodly houses are pleasant, prosperous homes.", "Settled success can become spiritually dangerous."];
  else if (/herds and thy flocks/.test(lower)) opening = ["Multiplying herds and flocks means growing wealth.", "The blessing itself can become a test of humility."];
  else if (/silver and thy gold/.test(lower)) opening = ["Silver and gold stand for accumulated wealth.", "Prosperity must not replace gratitude."];
  else if (/heart be lifted up/.test(lower)) opening = ["A lifted-up heart is pride.", "The danger is thinking blessing came from self instead of the LORD."];
  else if (/terrible wilderness/.test(lower)) opening = ["The great and terrible wilderness was dangerous and harsh.", "God led Israel through a place where survival depended on Him."];
  else if (/fiery serpents/.test(lower)) opening = ["These were venomous wilderness snakes that made the desert dangerous.", "Moses is reminding Israel that God preserved them in a place full of real threat."];
  else if (/no water/.test(lower)) opening = ["No water means the wilderness could not sustain Israel by itself.", "Every drink was a lesson in dependence."];
  else if (/manna/.test(lower)) opening = ["Manna was the bread-like food God gave in the wilderness.", "It taught Israel to receive daily life from Him."];
  else if (/fathers knew not/.test(lower)) opening = ["Their fathers had not known manna before God gave it.", "The provision was unfamiliar because it came directly from the LORD."];
  else if (/humble thee/.test(lower)) opening = ["To humble Israel means to lower pride and expose dependence.", "The wilderness taught them they were not self-sustaining."];
  else if (/prove thee/.test(lower)) opening = ["Prove means test.", "God used the wilderness to reveal what was in Israel's heart."];
  else if (/thou say in thine heart/.test(lower)) opening = ["Moses names the proud thought prosperity can produce.", "The danger is silently taking credit for what God gave."];
  else if (/my power/.test(lower)) opening = ["This is the prideful sentence Moses warns against.", "Israel must not claim its wealth came from its own power."];
  else if (/gotten me this wealth/.test(lower)) opening = ["Gotten me this wealth means produced this prosperity for myself.", "The phrase exposes self-credit after God's provision."];
  else if (/remember the lord thy god/.test(lower)) opening = ["Remembering the LORD means crediting Him as the giver.", "Prosperity should lead Israel back to gratitude."];
  else if (/power to get wealth/.test(lower)) opening = ["Even the ability to gain wealth comes from God.", "Israel's strength, land, and opportunity are gifts."];
  else if (/establish his covenant/.test(lower)) opening = ["God gives prosperity to uphold His sworn covenant.", "The wealth is tied to promise, not Israel's greatness."];
  else if (/forget the lord thy god/.test(lower) && section.reference === "Deuteronomy 8:19-20") opening = ["Forgetting the LORD can become open idolatry.", "Moses warns that memory failure leads to worship failure."];
  else if (/walk after other gods/.test(lower)) opening = ["Walking after other gods means following them in worship and loyalty.", "Idolatry is a path, not a single harmless moment."];
  else if (/serve them/.test(lower) && section.chapter === 8) opening = ["Serving other gods means giving them religious allegiance.", "The LORD will not treat that as covenant faithfulness."];
  else if (/worship them/.test(lower)) opening = ["Worshiping other gods is bowing the heart to idols.", "It is the opposite of loving the LORD with all the heart."];
  else if (/testify against you/.test(lower)) opening = ["Testify means solemnly warn as a witness.", "Moses makes the consequence plain before it happens."];
  else if (/surely perish/.test(lower)) opening = ["Surely perish means destruction is certain if Israel abandons the LORD.", "The land cannot protect a people who forsake God."];
  else if (/pass over jordan/.test(lower)) opening = ["Passing over Jordan means entering Canaan.", "Moses speaks as Israel stands at the edge of the promise."];
  else if (/fenced up to heaven/.test(lower)) opening = ["Fenced up to heaven means extremely high and fortified walls.", "The phrase describes how impossible the cities looked."];
  else if (/people great and tall/.test(lower)) opening = ["The people are strong and physically intimidating.", "Israel must face real fear without trusting itself."];
  else if (/anakims/.test(lower)) opening = ["The Anakims were remembered as giant-like people.", "Their reputation had frightened Israel before."];
  else if (/goeth over before thee/.test(lower)) opening = ["The LORD going before Israel means He leads the battle ahead of them.", "The strongest presence in Canaan is not the Anakim but God."];
  else if (/consuming fire/.test(lower)) opening = ["A consuming fire burns up what stands before it.", "Here the image describes the LORD's power to defeat Canaan's enemies."];
  else if (/bring them down/.test(lower)) opening = ["God bringing them down means humbling and defeating them.", "Israel receives victory because the LORD acts first."];
  else if (/speak not.*heart/.test(lower)) opening = ["Moses warns Israel not to explain victory with pride.", "The heart may claim credit even while God gives the land."];
  else if (/my righteousness/.test(lower)) opening = ["This is the proud thought that victory came because Israel was righteous enough to deserve it.", "Moses rejects that idea and strips away self-congratulation."];
  else if (/possess this land/.test(lower) && section.chapter === 9) opening = ["Possessing the land is God's gift, not proof of Israel's perfection.", "Moses separates inheritance from self-congratulation."];
  else if (/not for thy righteousness/.test(lower)) opening = ["Moses says plainly that Israel's righteousness is not the reason.", "The land gift should produce humility."];
  else if (/wickedness of these nations/.test(lower)) opening = ["Canaan's wickedness is one reason judgment comes.", "Israel must not confuse God's judgment on them with praise of Israel."];
  else if (/perform the word/.test(lower)) opening = ["Perform the word means fulfill the promise.", "God is keeping what He swore to Abraham, Isaac, and Jacob."];
  else if (/remember, and forget not/.test(lower)) opening = ["Moses piles up both words to make the warning unmistakable.", "Israel must keep its own rebellion in mind so it does not become proud in the land."];
  else if (/provokedst.*wrath/.test(lower)) opening = ["Provokedst means stirred up anger.", "Israel repeatedly angered the LORD in the wilderness."];
  else if (/in the wilderness/.test(lower) && section.chapter === 9) opening = ["The wilderness was not only a place of need; it was a place of rebellion.", "Moses refuses to let Israel remember only the flattering parts."];
  else if (/depart out of egypt/.test(lower)) opening = ["Moses is speaking about Israel's history starting at the moment they left Egypt.", "From the very beginning of that rescue journey, rebellion kept appearing."];
  else if (/rebellious against the lord/.test(lower) && section.reference === "Deuteronomy 9:22-24") opening = ["Moses repeats that rebellion has marked Israel's story from early on.", "The list of place names proves this was not a single isolated failure."];
  else if (/rebellious against the lord/.test(lower)) opening = ["Rebellious means resisting the LORD's authority.", "Moses names Israel's history honestly."];
  else if (/horeb.*wrath/.test(lower)) opening = ["Horeb was the covenant mountain where Israel made the golden calf.", "They rebelled at the very place where God gave His law."];
  else if (/gone up into the mount/.test(lower)) opening = ["Moses went up the mountain to receive the covenant tablets.", "The people below were supposed to wait in faithfulness."];
  else if (/tables of stone/.test(lower)) opening = ["These were stone tablets carrying the covenant commandments.", "Stone made the words visible, fixed, and weighty before the people."];
  else if (/tables of the covenant/.test(lower)) opening = ["The tablets belonged to the covenant relationship.", "Breaking them will picture how serious Israel's sin was."];
  else if (/spake with you.*midst of the fire/.test(lower)) opening = ["The LORD spoke to Israel from the fire at Horeb.", "The covenant words came from His holy presence, not from Moses' imagination."];
  else if (/did neither eat bread.*drink water/.test(lower) && section.reference === "Deuteronomy 9:18-19") opening = ["Moses fasts again while pleading after the calf.", "His hunger marks the seriousness of interceding for Israel's sin."];
  else if (/neither did eat bread/.test(lower) || /did neither eat bread/.test(lower)) opening = ["Moses fasted from bread and water on the mountain.", "The scene shows the weight of receiving the covenant."];
  else if (/finger of god/.test(lower)) opening = ["The wording says the commandments were written directly by God Himself.", "The covenant words carry divine authority, not human authorship."];
  else if (/lord said unto me/.test(lower) && section.chapter === 9) opening = ["The LORD interrupts Moses on the mountain with news of Israel's sin.", "God sees the calf rebellion before Moses sees it."];
  else if (/get thee down quickly/.test(lower)) opening = ["God tells Moses to go down quickly because the people have already sinned.", "The rebellion happens while the covenant tablets are being given."];
  else if (/ye had turned aside quickly/.test(lower)) opening = ["Moses tells Israel they had already left God's path when he came down.", "The broken tablets happen after a rebellion already in motion."];
  else if (/quickly turned aside|turned aside quickly/.test(lower)) opening = ["Turning aside quickly means leaving God's way almost immediately.", "Israel's rebellion is shockingly fast."];
  else if (/out of the way/.test(lower)) opening = ["The way is the path God commanded.", "The calf shows Israel stepping off that path."];
  else if (/molten image/.test(lower)) opening = ["A molten image is an idol made from melted metal.", "Israel makes a visible god while the true God is giving His word."];
  else if (/stiffnecked/.test(lower)) opening = ["Stiffnecked pictures a stubborn animal refusing direction.", "God says Israel is resistant to His lead."];
  else if (/blot out their name/.test(lower)) opening = ["This means remove them completely so their national identity disappears.", "The warning shows how severe the golden calf rebellion was."];
  else if (/came down from the mount/.test(lower)) opening = ["Moses comes down from the mountain carrying the covenant tablets.", "He descends into the middle of Israel's rebellion."];
  else if (/mount burned with fire/.test(lower)) opening = ["The mountain still burned with God's holy presence.", "Israel's idol sin happens in the shadow of visible holiness."];
  else if (/molten calf/.test(lower)) opening = ["The molten calf was an idol shaped from metal.", "Israel replaces the unseen LORD with something they made."];
  else if (/two tables/.test(lower)) opening = ["The two tables are the covenant tablets Moses held.", "They represent the words Israel has just broken."];
  else if (/brake them/.test(lower)) opening = ["Brake means broke.", "Moses shattering the tablets acts out the covenant breach."];
  else if (/fell down before the lord forty days/.test(lower)) opening = ["Moses emphasizes the length of his intercession.", "Israel survived because mercy answered a long and costly plea."];
  else if (/fell down before the lord/.test(lower)) opening = ["Falling down before the LORD shows urgent intercession.", "Moses pleads because Israel deserves judgment."];
  else if (/forty days and forty nights/.test(lower)) opening = ["The number marks an extended period of fasting and prayer before God.", "Moses wants Israel to feel how long he interceded for them."];
  else if (/because of all your sins/.test(lower)) opening = ["Moses fasts because Israel's sin is severe.", "The problem is wickedness before the LORD, not a small mistake."];
  else if (/doing wickedly/.test(lower)) opening = ["Doing wickedly means acting in evil against the LORD.", "The calf is rebellion in God's sight."];
  else if (/angry with you to destroy/.test(lower)) opening = ["The LORD's anger had reached the point of destruction.", "Moses wants Israel to remember how close judgment came."];
  else if (/hearkened unto me/.test(lower)) opening = ["Hearkened means listened favorably.", "The LORD spared Israel in response to Moses' intercession."];
  else if (/angry with aaron/.test(lower)) opening = ["Aaron also came under God's anger for the calf.", "Leadership did not excuse his part in the sin."];
  else if (/prayed for aaron/.test(lower)) opening = ["Moses interceded for Aaron too.", "Even the priest needed mercy after the golden calf."];
  else if (/calf which ye had made/.test(lower)) opening = ["Moses keeps calling it the calf they made.", "The wording forces Israel to own the idol as their work."];
  else if (/burnt it with fire/.test(lower)) opening = ["Moses burns the calf instead of preserving it.", "The idol must be destroyed, not repaired or admired."];
  else if (/ground it very small/.test(lower)) opening = ["Grinding the calf small makes it powerless dust.", "Moses reduces the idol to nothing."];
  else if (/cast the dust/.test(lower)) opening = ["The dust is thrown into the brook.", "The destroyed idol is removed from Israel's camp."];
  else if (/taberah/.test(lower)) opening = ["Taberah was a place where the LORD's fire burned because of complaint.", "Moses lists it as part of Israel's repeated rebellion."];
  else if (/massah/.test(lower)) opening = ["Massah was where Israel tested the LORD over water.", "The name reminds them of distrust, not faith."];
  else if (/kibrothhattaavah/.test(lower)) opening = ["Kibroth-hattaavah means graves of craving.", "It remembers the place where sinful desire brought judgment."];
  else if (/kadeshbarnea/.test(lower)) opening = ["Kadesh-barnea was where Israel refused to enter the land.", "The place name recalls unbelief at the edge of promise."];
  else if (/believed him not/.test(lower)) opening = ["Not believing Him means refusing to trust the LORD's promise.", "Unbelief became disobedience."];
  else if (/fell down.*forty days/.test(lower)) opening = ["Moses repeats that he lay before the LORD for forty days and nights.", "The repeated detail shows the seriousness of Israel's danger."];
  else if (/destroy not thy people/.test(lower)) opening = ["Moses asks God not to destroy His own people.", "The prayer appeals to God's ownership and mercy."];
  else if (/thy people and thine inheritance/.test(lower)) opening = ["Moses ends by calling Israel God's own people and inheritance.", "The plea rests on the LORD's claim on them, not their innocence."];
  else if (/thine inheritance/.test(lower)) opening = ["Here inheritance means a people claimed as the LORD's own possession.", "Moses is pleading on the basis that Israel belongs to God."];
  else if (/redeemed through thy greatness/.test(lower)) opening = ["Redeemed means rescued from bondage.", "Moses points to God's greatness already shown in the exodus."];
  else if (/brought forth out of egypt/.test(lower)) opening = ["God brought Israel out of Egypt by His mighty hand.", "Moses appeals to the rescue God has already performed."];
  else if (/abraham, isaac, and jacob/.test(lower)) opening = ["Moses asks God to remember the patriarchs.", "The covenant with Abraham, Isaac, and Jacob is the ground of his plea."];
  else if (/stubbornness/.test(lower)) opening = ["Stubbornness means hard resistance to God's direction.", "Moses asks God not to judge Israel only by that record."];
  else if (/wickedness/.test(lower) && section.chapter === 9) opening = ["Wickedness means real evil before God.", "Moses does not pretend Israel is innocent."];
  else if (/nor to their sin/.test(lower)) opening = ["Sin is the guilt Moses asks God not to count against them fully.", "The prayer depends on mercy, not Israel's worthiness."];
  else if (/land whence/.test(lower)) opening = ["Moses thinks about what Egypt might say if Israel is destroyed.", "He pleads for the honor of God's name among the nations."];
  else if (/not able/.test(lower)) opening = ["The nations might claim the LORD was not able to bring Israel in.", "Moses asks God not to let His power be slandered."];
  else if (/hated them/.test(lower)) opening = ["The nations might claim God hated Israel and brought them out to kill them.", "Moses appeals against that false story."];
  else opening = ["Moses is warning Israel to remember the LORD and reject pride.", "The wording belongs to covenant love, obedience, prosperity, idolatry, or the golden calf memory."];

  return note([
    opening[0],
    opening[1],
    getDay49DeuteronomyLeadSupport(cleanTitle),
    ...getDay49DeuteronomySupport(cleanTitle).slice(0, 3),
  ].slice(0, 8));
}

function getDay50DeuteronomySupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/tables|writing|ten commandments|\bark\b/.test(lower)) return ["🪨 Covenant words are restored", "🪵 The ark receives God's testimony", "🙌 Mercy follows failure", "📜 The same commandments still govern Israel"];
  if (/aaron|levi|minister|bless in his name|inheritance/.test(lower)) return ["🕊️ Levi is set apart for holy service", "🏕️ Worship needs appointed ministry", "🏠 The LORD Himself can be the inheritance", "🙌 Holy service happens before God"];
  if (/require|fear the lord|walk in all his ways|love him|serve him|cleave|commandments|statutes|for thy good/.test(lower)) return ["🫀 God asks for heart-deep obedience", "🙇 Fear and love belong together", "🚶 Walking means daily obedience", "🌱 His commands are for Israel's good"];
  if (/heaven|earth also|delight in thy fathers|chose their seed|above all people/.test(lower)) return ["🌌 The whole world belongs to the LORD", "❤️ Election begins with God's love", "👨‍👩‍👧 Promise runs through the fathers", "🙌 Chosen grace should humble Israel"];
  if (/fatherless|widow|stranger|food and raiment|strangers in the land of egypt/.test(lower)) return ["⚖️ God defends vulnerable people", "🍞 Mercy reaches daily needs", "👥 Israel must mirror God's love", "⛓️ Egypt should be remembered"];
  if (/praise|great and terrible things|thine eyes have seen/.test(lower)) return ["👀 Israel saw God's acts itself", "🙌 Praise belongs to the LORD alone", "💪 Rescue proved His power", "📜 Memory should shape worship"];
  if (/know ye this day|mighty hand|stretched out arm|miracles|acts|army of egypt/.test(lower)) return ["🧠 Moses calls Israel to remember what it witnessed", "💪 Egypt already proved God's power", "👀 The people are eyewitnesses", "🙌 Memory should make obedience serious"];
  if (/strong|prolong your days|milk and honey/.test(lower)) return ["💪 Strength is needed for obedience", "🏞️ The land is a promised gift", "🍯 Blessing in the land is real", "📆 Faithfulness shapes the future"];
  if (/not as the land of egypt|wateredst it with thy foot|garden of herbs|rain of heaven|eyes of the lord/.test(lower)) return ["🌧️ Canaan depends on God's rain", "🦶 Egypt relied on human irrigation", "👀 The LORD watches the land continually", "🙌 Provision is not self-made"];
  if (/hearken diligently|rain of your land|corn|wine|oil|eat and be full/.test(lower)) return ["👂 Obedience opens the way for blessing", "🌧️ Rain is God's gift", "🌾 Harvest depends on Him", "🍽️ Fullness should lead to gratitude"];
  if (/heart be not deceived|turn aside|serve other gods|wrath be kindled|shut up the heaven/.test(lower)) return ["⚠️ A wandering heart is dangerous", "🕊️ Idolatry brings covenant judgment", "🌧️ Shut heaven means withheld rain", "🚫 Turning aside ruins life in the land"];
  if (/lay up these my words|bind them|frontlets|teach them your children|sittest|walkest|door posts|gates/.test(lower)) return ["🫀 God's words belong inside the person", "👨‍👩‍👧 Children must be taught", "🏠 Home life should carry the word", "🚶 Daily routines become places of remembrance"];
  if (/keep all these commandments|every place whereon the soles of your feet shall tread|wilderness and lebanon|river euphrates/.test(lower)) return ["📜 Victory is tied to obedience", "👣 The land promise has real borders", "💪 The LORD makes room for His people", "🙌 Courage rests on covenant loyalty"];
  if (/blessing and a curse|if ye obey|if ye will not obey|turn aside out of the way|other gods/.test(lower)) return ["⚖️ Israel is being given a real choice", "🌿 Obedience leads toward blessing", "🚫 Rebellion turns toward curse", "🫀 Loyalty is tested in the heart"];
  if (/gerizim|ebal|sun goeth down|plains of moreh|pass over jordan/.test(lower)) return ["⛰️ Blessing and curse are tied to the land", "📍 These are real covenant markers", "🏞️ Jordan crossing leads to decision", "📜 The statutes must be obeyed there"];
  if (/utterly destroy|served their gods|high mountains|hills|green tree|altars|pillars/.test(lower)) return ["🔥 Canaanite worship must be torn down", "🚫 Israel must not leave idol systems standing", "🏞️ Worship sites are not neutral places", "🪵 False worship must be dismantled"];
  if (/habitation shall ye seek|thither thou shalt come|burnt offerings|sacrifices|tithes|vows|rejoice/.test(lower)) return ["📍 The LORD chooses where sacrifice belongs", "🔥 Offerings must come His way", "🎁 Gifts and vows are brought before Him", "🎉 Worship includes reverent joy"];
  if (/right in his own eyes|rest|inheritance/.test(lower)) return ["👁️ Personal preference is not the rule for worship", "🛑 Rest had not yet been reached", "🎁 Inheritance comes with God's order", "📜 Worship must not be self-designed"];
  if (/go over jordan|dwell in safety|heave offering|rejoice before the lord/.test(lower)) return ["🏞️ Settled life in the land changes worship practice", "🕊️ Safety is God's gift", "🔥 Offerings still belong to Him", "🎉 Households are meant to rejoice before the LORD"];
  if (/take heed to thyself|offer not thy burnt offerings in every place|place which the lord shall choose/.test(lower)) return ["⚠️ Zeal does not justify disobedience", "📍 Sacrifice is restricted to God's chosen place", "🔥 Worship must follow command, not convenience", "🙇 The LORD decides how He is approached"];
  if (/whatsoever thy soul lusteth after|unclean and the clean|roebuck|hart|pour it upon the earth as water/.test(lower)) return ["🥩 Ordinary meat may be eaten", "👥 Clean and unclean here share common meat", "🦌 Roebuck and hart picture non-sacrificial game", "🩸 Blood still belongs to God"];
  if (/mayest not eat within thy gates|tithe of thy corn|wine|oil|firstlings|vows|freewill offerings|heave offering/.test(lower)) return ["🚪 Some holy foods cannot be treated like common meals", "🌾 Tithes and firstlings belong to worship", "🙏 Vows must be brought before the LORD", "📍 The chosen place still governs these gifts"];
  if (/enlarge thy border|i will eat flesh|longeth to eat flesh|thou mayest eat flesh/.test(lower)) return ["🏕️ Life will expand in the land", "🥩 Meat for desire is permitted", "📏 Distance from the sanctuary changes ordinary eating", "🙌 The gift still comes from the LORD"];
  if (/blood is the life|go well with thee|children after thee/.test(lower)) return ["🩸 Blood represents life itself", "🚫 Life must not be eaten as food", "🌱 Obedience affects the next generation", "✅ Doing right brings covenant good"];
  if (/holy things|vows|place which the lord shall choose|upon the altar/.test(lower)) return ["🙏 Holy gifts are set apart for worship", "📍 They must go to the chosen place", "🔥 Burnt offerings belong on the altar", "🩸 Sacrifice is handled under God's order"];
  if (/enquire not after their gods|abomination|sons and their daughters will they burn/.test(lower)) return ["🚫 Curiosity about pagan worship is dangerous", "🔥 Abomination means something detestable to the LORD", "💔 Canaanite worship included horrific evil", "🙇 The LORD must not be worshiped their way"];
  if (/prophet|dreamer of dreams|sign or a wonder|come to pass|proveth you/.test(lower)) return ["⚠️ A true-looking sign can still carry a false message", "🕊️ Other gods remain the real test", "🫀 Love for the LORD is being proved", "🚫 Spiritual impressiveness does not excuse idolatry"];
  if (/entice thee secretly|thy brother|thy son|thy daughter|wife of thy bosom|friend/.test(lower)) return ["🤫 The pressure comes from someone close", "💍 Family affection is not above covenant loyalty", "🕊️ Secret enticement still aims at idolatry", "🫀 The heart must stay true to the LORD"];
  if (/surely kill him|hand shall be first|stone him with stones|house of bondage|all israel shall hear/.test(lower)) return ["⚖️ Idolatry is treated as deadly covenant evil", "✋ The witness cannot stay neutral", "⛓️ Egypt should not be traded for idols again", "👂 Public judgment warns the whole people"];
  if (/children of belial|withdrawn the inhabitants|enquire.*diligently/.test(lower)) return ["🧍 Belial points to worthlessness and wicked rebellion", "🏙️ An entire city can be drawn away", "🔎 The charge must be investigated carefully", "⚖️ Judgment requires truth, not rumor"];
  if (/smite the inhabitants|destroying it utterly|cattle thereof|spoil|heap for ever/.test(lower)) return ["⚔️ The city falls under total judgment", "🔥 Nothing idolatrous is preserved", "📦 Spoil is not a prize to keep", "🏚️ The ruin stands as a warning"];
  if (/cursed thing|fierceness of his anger|shew thee mercy|compassion upon thee|multiply thee|hearken/.test(lower)) return ["🚫 Nothing devoted to destruction may be kept", "💗 Mercy follows obedience, not compromise", "📈 Compassion restores the people", "👂 Hearing God is still the path of life"];

  return ["📜 Moses is pressing covenant loyalty", "🫀 The heart must stay with the LORD", "🚫 Idolatry must be refused", "🏞️ Life in the land must follow God's word"];
}

function getDay50DeuteronomyLeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/tables|writing|\bark\b/.test(lower)) return "🪨 Mercy does not erase God's words";
  if (/levi|minister|inheritance/.test(lower)) return "🕊️ Holy service is assigned, not invented";
  if (/require|fear|walk|love|serve|statutes|good/.test(lower)) return "🫀 Obedience reaches the whole life";
  if (/heaven|earth|fathers|seed/.test(lower)) return "🌌 The Maker is also the chooser";
  if (/stranger|fatherless|widow|food and raiment/.test(lower)) return "⚖️ God's character shapes social mercy";
  if (/mighty hand|stretched out arm|miracles|acts/.test(lower)) return "🧠 Memory is meant to govern the present";
  if (/rain|corn|wine|oil|eat and be full/.test(lower)) return "🌧️ Daily provision depends on God";
  if (/heart be not deceived|turn aside|other gods|shut up the heaven/.test(lower)) return "⚠️ The heart can wander before the feet do";
  if (/lay up these my words|teach them your children|door posts|gates/.test(lower)) return "🏠 The word belongs in ordinary routines";
  if (/blessing|curse|gerizim|ebal/.test(lower)) return "⚖️ Covenant life moves in two directions";
  if (/destroy|altars|pillars|green tree/.test(lower)) return "🔥 False worship must be dismantled";
  if (/habitation|burnt offerings|sacrifices|vows|altar/.test(lower)) return "📍 Worship happens where God chooses";
  if (/blood|life|pour it upon the earth/.test(lower)) return "🩸 Life is not common food";
  if (/prophet|dreamer|sign|wonder/.test(lower)) return "⚠️ Not every sign deserves trust";
  if (/brother|son|daughter|wife|friend|secretly/.test(lower)) return "🤫 Pressure can wear a familiar face";
  if (/smite the inhabitants|destroying it utterly|heap for ever/.test(lower)) return "🏚️ Idolatry can ruin a whole city";

  return "📌 One phrase carries a real covenant lesson";
}

function explainDay50DeuteronomyAt95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/at that time the lord said unto me/.test(lower)) opening = ["The phrase returns to the moment when God spoke again after the golden calf.", "Mercy begins with the LORD renewing contact instead of abandoning Israel."];
  else if (/hew thee two tables of stone like unto the first/.test(lower)) opening = ["God tells Moses to prepare fresh tablets after the first pair was broken.", "The renewed stone shows covenant mercy after covenant failure."];
  else if (/hewed two tables of stone like unto the first/.test(lower)) opening = ["Moses obeys by cutting the new tablets himself.", "The action shows restoration required real submission, not mere regret."];
  else if (/come up unto me into the mount/.test(lower)) opening = ["Moses is summoned back up Sinai into God's presence.", "The same mountain of covenant terror becomes the place of renewed mercy."];
  else if (/went up into the mount/.test(lower)) opening = ["Moses actually climbs the mountain with the new tablets in hand.", "The movement shows obedience following God's command to return."];
  else if (/put them in the ark/.test(lower)) opening = ["God tells Moses where the restored tablets must be kept.", "The covenant words belong in the sacred chest at Israel's center."];
  else if (/i made an ark of shittim wood/.test(lower)) opening = ["Shittim wood is the acacia wood used for holy furnishings.", "Moses makes the ark as the place where the covenant tablets will rest."];
  else if (/according to the first writing/.test(lower)) opening = ["The first writing means the same commandments written before.", "God does not soften His word after Israel's sin."];
  else if (/the ten commandments/.test(lower)) opening = ["These are the ten covenant words spoken by God at Sinai.", "They summarize Israel's fundamental obligations before God and neighbor."];
  else if (/and there they be/.test(lower)) opening = ["The tablets remained in the ark as an ongoing witness.", "Israel's covenant life stays anchored to God's spoken words."];
  else if (/as the lord commanded me/.test(lower)) opening = ["Moses is careful to do exactly what God said.", "Precise obedience matters in holy things."];
  else if (/there aaron died/.test(lower)) opening = ["Aaron's death marks the passing of an older generation in the wilderness story.", "Even key leaders do not stay forever, but God's covenant continues."];
  else if (/there he was buried/.test(lower)) opening = ["The burial note makes Aaron's death concrete and final.", "Israel's journey includes real losses, not only victories and laws."];
  else if (/from gudgodah to jotbath/.test(lower)) opening = ["Gudgodah and Jotbath are travel stages in Israel's wilderness journey.", "Moses keeps tying covenant teaching to real places they passed through."];
  else if (/a land of rivers of waters/.test(lower)) opening = ["Jotbath is described as a place with abundant flowing water.", "The phrase highlights relief and provision along a hard wilderness road."];
  else if (/separated the tribe of levi/.test(lower)) opening = ["Separated means set apart for a special holy role.", "Levi is assigned to worship service instead of ordinary tribal inheritance."];
  else if (/bear the ark of the covenant/.test(lower)) opening = ["The Levites are appointed to carry the sacred chest that holds the covenant testimony.", "This duty keeps them closely tied to God's presence and His word."];
  else if (/stand before the lord to minister unto him/.test(lower)) opening = ["To minister means to serve in holy duties before God.", "Levi's work happens in the LORD's presence, not merely in front of people."];
  else if (/bless in his name/.test(lower)) opening = ["Blessing in His name means speaking good over the people under God's authority.", "The priestly blessing is not personal magic; it is service done in the LORD's name."];
  else if (/the lord is his inheritance/.test(lower)) opening = ["Inheritance here means the portion a tribe receives.", "Levi's portion is not land but the privilege of belonging to the LORD's service."];
  else if (/according as the lord thy god promised him/.test(lower)) opening = ["The priestly role rests on God's promise, not Levi's self-appointment.", "Moses wants Israel to see this arrangement as covenant order."];
  else if (/i stayed in the mount/.test(lower)) opening = ["Moses remained on the mountain in God's presence.", "The phrase points to prolonged intercession and covenant renewal, not a brief visit."];
  else if (/according to the first time/.test(lower)) opening = ["The second mountain stay matched the first in length.", "The repeated period shows the seriousness of restoring the covenant after rebellion."];
  else if (/forty days and forty nights/.test(lower)) opening = ["The number marks a prolonged season of prayer, fasting, and waiting before God.", "Moses is reminding Israel that covenant mercy came through extended intercession."];
  else if (/hearkened unto me at that time also/.test(lower)) opening = ["Hearkened means listened favorably.", "God heard Moses again, which shows mercy triumphing over deserved destruction."];
  else if (/take thy journey before the people/.test(lower)) opening = ["Moses is told to lead the people forward again.", "After repentance and mercy, covenant life moves back into obedient travel."];
  else if (/that they may go in and possess the land/.test(lower)) opening = ["To possess the land means to enter and receive God's promised inheritance.", "Forgiveness is tied to moving forward into the promise, not staying at failure."];
  else if (/which i sware unto their fathers to give unto them/.test(lower)) opening = ["Sware means promised with an oath.", "The land still comes because God remembers His promise to the fathers."];
  else if (/what doth the lord thy god require of thee/.test(lower)) opening = ["Moses is summarizing what God asks from His people.", "The covenant is not mysterious here; its demands are stated plainly."];
  else if (/but to fear the lord thy god/.test(lower)) opening = ["Fear is the first requirement Moses names in his summary.", "The covenant begins with reverent submission to the LORD."];
  else if (/thou shalt fear the lord thy god/.test(lower)) opening = ["Here fear becomes a direct personal command near the end of the chapter.", "Israel's worship response must stay shaped by reverence for the LORD."];
  else if (/to walk in all his ways/.test(lower) && section.chapter === 10) opening = ["Walking in God's ways means copying His path in daily life.", "Moses is describing obedience as a lived pattern, not only a belief."];
  else if (/to walk in all his ways/.test(lower) && section.chapter === 11) opening = ["Here walking in His ways is tied to the conquest promise.", "Possessing the land depends on continuing in the path God sets."];
  else if (/and to love him/.test(lower)) opening = ["Love here means covenant loyalty, not mere feeling.", "God wants the heart's affection joined to faithful obedience."];
  else if (/to love the lord your god/.test(lower) && section.chapter === 11 && /13-15/.test(section.reference)) opening = ["Love for the LORD is the inner condition attached to the promised rain.", "The blessing of the land is tied to a heart that remains loyal."];
  else if (/to love the lord your god/.test(lower)) opening = ["This love is repeated because covenant obedience starts with affection for God.", "Israel cannot keep His ways rightly while loving other gods."];
  else if (/to keep the commandments of the lord/.test(lower)) opening = ["Moses includes obedience explicitly in the list of what God requires.", "The commandments define covenant faithfulness in concrete terms."];
  else if (/to keep all these commandments which i command you/.test(lower)) opening = ["The phrase gathers all the commands into one sustained charge.", "Israel's future in the land depends on a whole pattern of obedience, not selective loyalty."];
  else if (/and his statutes/.test(lower)) opening = ["Statutes are fixed commands laid down by God.", "They give Israel concrete patterns for life under His rule."];
  else if (/for thy good/.test(lower)) opening = ["For thy good means God's commands aim at Israel's true well-being.", "Moses wants the people to see obedience as life-giving, not arbitrary."];
  else if (/heaven and the heaven of heavens/.test(lower)) opening = ["The heaven of heavens is a way of speaking about the highest heavens.", "Moses is saying the LORD owns every level of creation above them."];
  else if (/the earth also, with all that therein is/.test(lower)) opening = ["The earth and all that is in it already belong to God.", "Israel's chosen status rests inside His universal rule over everything."];
  else if (/had a delight in thy fathers to love them/.test(lower)) opening = ["Had a delight means God set His affection on the fathers.", "The covenant story begins with divine love, not human impressiveness."];
  else if (/he chose their seed after them/.test(lower)) opening = ["Their seed after them means their descendants.", "God's choice reaches from the fathers down into later generations."];
  else if (/even you above all people/.test(lower)) opening = ["The phrase marks Israel out from the surrounding nations.", "Chosen status is meant to produce gratitude and humility, not pride."];
  else if (/as it is this day/.test(lower)) opening = ["Moses points to the people's present standing as visible proof of God's choice.", "The phrase ties ancient promise to the reality now in front of them."];
  else if (/execute the judgment of the fatherless and widow/.test(lower)) opening = ["Executing judgment means giving justice and defending the case.", "God acts on behalf of people who are easily neglected or exploited."];
  else if (/loveth the stranger/.test(lower)) opening = ["The stranger is the foreigner living among Israel.", "Moses says plainly that God loves the outsider, not only the native-born Israelite."];
  else if (/food and raiment/.test(lower)) opening = ["Raiment means clothing.", "The line moves from God's love to His provision of everyday needs."];
  else if (/love ye therefore the stranger/.test(lower)) opening = ["Israel is told to treat the foreigner with the same active concern God shows.", "Mercy toward outsiders is part of covenant obedience."];
  else if (/for ye were strangers in the land of egypt/.test(lower)) opening = ["Israel once lived in Egypt as outsiders without power.", "That memory is meant to make them compassionate instead of hard-hearted."];
  else if (/him shalt thou serve/.test(lower)) opening = ["Serving Him means placing worship and obedience under the LORD alone.", "The command names the direction of Israel's loyalty."];
  else if (/to serve him with all your heart and with all your soul/.test(lower)) opening = ["This service reaches the whole inner life, not just outward ritual.", "Moses ties worship to the entire heart and soul."];
  else if (/to him shalt thou cleave/.test(lower)) opening = ["Cleave means cling to the LORD personally and steadfastly.", "The image is one of close attachment that refuses to let go."];
  else if (/and to cleave unto him/.test(lower)) opening = ["The conquest promise is linked to sticking close to God.", "Victory in the land depends on nearness in loyalty."];
  else if (/swear by his name|he is thy praise/.test(lower)) opening = ["Swearing by His name means making solemn commitments under God's authority.", "He is thy praise means the LORD is the one Israel should boast in, not itself."];
  else if (/he is thy god/.test(lower)) opening = ["The phrase is a covenant confession, not a vague religious statement.", "Israel belongs to this God personally and exclusively."];
  else if (/great and terrible things/.test(lower)) opening = ["Terrible here means awe-inspiring and fearsome.", "Moses is pointing back to acts of power that overwhelmed Egypt and protected Israel."];
  else if (/which thine eyes have seen/.test(lower)) opening = ["The people are not being asked to trust rumor.", "They themselves saw the mighty works Moses is recalling."];
  else if (/know ye this day/.test(lower)) opening = ["Moses is calling this generation to remember what it already knows by experience.", "The appeal is to living memory, not secondhand tradition."];
  else if (/his mighty hand/.test(lower)) opening = ["A mighty hand is a picture of active saving power.", "The phrase points to the LORD's strength in judgment and deliverance."];
  else if (/his stretched out arm/.test(lower)) opening = ["A stretched out arm pictures power reaching into history to act.", "Israel's rescue was not distant goodwill but forceful intervention."];
  else if (/his miracles/.test(lower)) opening = ["Miracles are signs that display God's unusual power.", "Egypt saw works no human ruler could produce."];
  else if (/his acts/.test(lower)) opening = ["Acts means the deeds God actually performed.", "Moses wants the people to remember what God did, not only what He said."];
  else if (/unto all his land/.test(lower)) opening = ["God's judgments spread across Egypt's whole land, not just one palace.", "The phrase widens the scale of the exodus signs."];
  else if (/what he did unto the army of egypt/.test(lower)) opening = ["Moses points specifically to Egypt's military defeat.", "The army that looked strongest still collapsed before the LORD."];
  else if (/that ye may be strong/.test(lower)) opening = ["Strength here means strength for obedience and for entering the land.", "Moses ties real strength to receiving God's command seriously."];
  else if (/and go in and possess the land/.test(lower)) opening = ["Entering the land means stepping into God's promise in actual obedience.", "The phrase keeps strength tied to movement and trust."];
  else if (/whither ye go to possess it/.test(lower)) opening = ["The land ahead is the place Israel is actively moving toward.", "Moses keeps the goal in view so obedience feels urgent, not abstract."];
  else if (/prolong your days in the land/.test(lower)) opening = ["The phrase speaks about continuing to live long in the land God gives.", "Remaining there is tied to covenant obedience."];
  else if (/land that floweth with milk and honey/.test(lower)) opening = ["Milk and honey describe abundance and settled provision.", "The promise is not bare survival but a richly supplied land."];
  else if (/the land, whither thou goest in to possess it|whither thou goest in to possess it/.test(lower)) opening = ["Moses is contrasting the land ahead with the land Israel left behind.", "Canaan must be understood on God's terms before the people enter it."];
  else if (/is not as the land of egypt/.test(lower)) opening = ["Canaan is not like Egypt in the way it is watered and lived in.", "The comparison teaches Israel not to imagine life in the new land by old habits."];
  else if (/where thou sowedst thy seed/.test(lower)) opening = ["The phrase recalls ordinary farming labor in Egypt.", "Moses is using agriculture to show how different the promised land will be."];
  else if (/wateredst it with thy foot/.test(lower)) opening = ["Watering with the foot refers to foot-worked irrigation in Egypt.", "The image contrasts human-managed watering there with God-given rain in Canaan."];
  else if (/as a garden of herbs/.test(lower)) opening = ["A garden of herbs is a small, carefully watered patch.", "Egypt could be worked by human effort in a way Canaan could not."];
  else if (/drinketh water of the rain of heaven/.test(lower)) opening = ["The land drinks rain from heaven instead of relying on man-made irrigation.", "Canaan teaches dependence because the sky, not the foot, supplies its water."];
  else if (/eyes of the lord thy god are always upon it/.test(lower)) opening = ["The phrase pictures God's constant watch and care over the land.", "Israel's future home lives under His ongoing attention from year to year."];
  else if (/if ye shall hearken diligently unto my commandments/.test(lower)) opening = ["Hearken diligently means listen carefully with obedient intent.", "Blessing is tied to attentive covenant obedience, not careless hearing."];
  else if (/rain of your land in his due season/.test(lower)) opening = ["Due season means the right time.", "The phrase teaches that harvest depends on God sending rain when it is needed."];
  else if (/gather in thy corn, and thy wine, and thine oil/.test(lower)) opening = ["Corn, wine, and oil stand for the staple produce of settled life.", "God's blessing reaches the field, the vineyard, and the olive grove."];
  else if (/that thou mayest eat and be full/.test(lower)) opening = ["Being full means having enough to eat with satisfaction.", "Moses presents fullness as a gift from God, not a human achievement."];
  else if (/take heed to yourselves/.test(lower)) opening = ["Take heed means watch yourselves carefully.", "The warning begins at the level of the heart before outward idolatry appears."];
  else if (/that your heart be not deceived/.test(lower)) opening = ["A deceived heart is one tricked into false trust and worship.", "Moses warns that idolatry starts inside before it spreads outside."];
  else if (/and ye turn aside/.test(lower)) opening = ["The phrase pictures the first step off God's path.", "A turned heart soon becomes turned behavior."];
  else if (/but turn aside out of the way/.test(lower)) opening = ["Turning aside out of the way means abandoning the road God set before them.", "The curse comes when Israel deliberately leaves the commanded path."];
  else if (/and serve other gods/.test(lower) && section.chapter === 11) opening = ["The warning moves from a deceived heart into actual idolatrous service.", "Israel is being warned against handing devotion to false gods."];
  else if (/and worship them/.test(lower)) opening = ["Worship them adds outward reverence to inward departure.", "The warning moves from heart deception to visible idolatry."];
  else if (/to go after other gods/.test(lower)) opening = ["Going after other gods means pursuing rival worship as a new path.", "The phrase treats idolatry like a chosen direction of life."];
  else if (/let us go after other gods/.test(lower)) opening = ["The temptation is a spoken invitation into false worship.", "Even impressive signs cannot make that invitation safe."];
  else if (/saying, let us go and serve other gods/.test(lower) && section.reference === "Deuteronomy 13:6-8") opening = ["The secret enticer is openly inviting the listener into idol service.", "The phrase exposes the seduction at the center of the warning."];
  else if (/saying, let us go and serve other gods/.test(lower) && section.reference === "Deuteronomy 13:12-14") opening = ["The corrupt men are trying to move a whole city into idol service.", "The phrase exposes the seduction at the center of the warning."];
  else if (/saying, let us go and serve other gods/.test(lower)) opening = ["The speaker is actively trying to recruit someone into idolatry.", "The phrase exposes the seduction at the center of the warning."];
  else if (/and serve other gods/.test(lower)) opening = ["The phrase names idolatry as an act of service and allegiance.", "Israel is being warned against handing devotion to false gods."];
  else if (/lord's wrath be kindled against you/.test(lower)) opening = ["Kindled wrath pictures God's anger burning against covenant unfaithfulness.", "Idolatry is serious because it attacks the relationship itself."];
  else if (/shut up the heaven/.test(lower)) opening = ["Shut up the heaven means God withholds rain.", "The judgment strikes the land at its point of dependence."];
  else if (/lay up these my words in your heart and in your soul/.test(lower)) opening = ["Lay up means store deeply within.", "God's words are meant to live inside the person, not only outside on the lips."];
  else if (/bind them for a sign upon your hand/.test(lower)) opening = ["The hand represents action and work.", "The phrase teaches that what Israel does should stay tied to God's word."];
  else if (/frontlets between your eyes/.test(lower)) opening = ["Frontlets are reminders kept before the eyes or forehead.", "The image teaches constant attention to God's words."];
  else if (/teach them your children/.test(lower)) opening = ["The command makes the next generation a direct responsibility.", "Covenant memory must be taught on purpose, not left to chance."];
  else if (/speaking of them when thou sittest in thine house/.test(lower)) opening = ["The house setting points to ordinary family life.", "God's words belong in everyday conversation, not only in formal worship."];
  else if (/when thou walkest by the way/.test(lower)) opening = ["The way means the daily road and routine travel of life.", "Instruction is meant to follow Israel out of the meeting place and into motion."];
  else if (/write them upon the door posts of thine house, and upon thy gates/.test(lower)) opening = ["Door posts and gates mark entry points into home and community life.", "The phrase teaches visible remembrance at the places where people come and go."];
  else if (/every place whereon the soles of your feet shall tread shall be yours/.test(lower)) opening = ["Walking on the land becomes a sign of taking hold of God's promise.", "The inheritance is concrete enough to be measured by their steps."];
  else if (/from the wilderness and lebanon/.test(lower)) opening = ["These places mark one edge of the promised territory.", "Moses begins sketching the borders of the land God will give."];
  else if (/from the river, the river euphrates/.test(lower)) opening = ["The Euphrates marks the far reach of the promise in that direction.", "The phrase helps Israel imagine the scale of the land gift."];
  else if (/behold, i set before you this day a blessing and a curse/.test(lower)) opening = ["Moses places the covenant choices openly before the nation.", "The phrase removes any illusion that obedience and rebellion lead to the same end."];
  else if (/a blessing, if ye obey/.test(lower)) opening = ["Blessing is tied to hearing and obeying God's commands.", "The good promised to Israel is covenant good, not random luck."];
  else if (/a curse, if ye will not obey/.test(lower)) opening = ["Curse means covenant judgment instead of covenant favor.", "Refusing God's voice leads in the opposite direction from blessing."];
  else if (/which ye have not known/.test(lower) && section.chapter === 11) opening = ["The gods named here are strangers to Israel's covenant history.", "The phrase exposes idolatry as abandoning the true Redeemer for strangers."];
  else if (/which ye have not known/.test(lower)) opening = ["The city is being invited to worship gods outside everything Israel knows from God's rescue.", "The phrase exposes idolatry as abandoning the true Redeemer for strangers."];
  else if (/which thou hast not known, thou, nor thy fathers/.test(lower)) opening = ["The enticer is pointing toward gods unknown even to the family line.", "The phrase makes the betrayal feel even more foreign and rootless."];
  else if (/put the blessing upon mount gerizim/.test(lower)) opening = ["Gerizim is the mountain appointed for the covenant blessing.", "The place turns obedience into something publicly declared in the land."];
  else if (/and the curse upon mount ebal/.test(lower)) opening = ["Ebal is the mountain appointed for the covenant curse.", "The place makes rebellion as visible and weighty as blessing."];
  else if (/by the way where the sun goeth down/.test(lower)) opening = ["This directional marker helps Israel locate the covenant scene precisely.", "Moses anchors blessing and curse in real geography they will reach."];
  else if (/beside the plains of moreh/.test(lower)) opening = ["The plains of Moreh are another landmark fixing the location in the land.", "The covenant warning is not floating in theory; it is tied to actual ground."];
  else if (/ye shall pass over jordan to possess the land/.test(lower)) opening = ["Crossing Jordan means the covenant warnings are about to become lived reality.", "Possession of the land brings responsibility with the gift."];
  else if (/ye shall observe to do all the statutes and judgments/.test(lower)) opening = ["Observe to do means carefully practice what has been commanded.", "The mountain signs are meant to end in obedience, not ceremony alone."];
  else if (/ye shall utterly destroy all the places/.test(lower)) opening = ["The places are worship sites used by the nations.", "Israel must remove the structures of false worship, not merely ignore them."];
  else if (/wherein the nations which ye shall possess served their gods/.test(lower)) opening = ["The nations served their gods in specific visible locations.", "Moses is teaching that idolatry lives in habits and places, not only in ideas."];
  else if (/upon the high mountains/.test(lower)) opening = ["High places were prominent sites where pagan worship was often performed.", "Moses starts naming the visible settings of Canaanite religion."];
  else if (/upon the hills/.test(lower)) opening = ["The worship sites spread beyond one sacred peak into the wider landscape.", "Israel must learn to recognize idolatry in ordinary terrain too."];
  else if (/under every green tree/.test(lower)) opening = ["Green trees were common places for fertility worship and shrine practices.", "The image shows how deeply pagan religion was woven into the land."];
  else if (/overthrow their altars/.test(lower)) opening = ["Altars are the raised places where offerings were presented to idols.", "Israel must tear them down because the worship itself is false."];
  else if (/break their pillars/.test(lower)) opening = ["Pillars are standing stones used in pagan worship.", "Breaking them prevents false worship from remaining honored in the land."];
  else if (/habitation shall ye seek/.test(lower)) opening = ["Habitation means the dwelling place God chooses for His name.", "Worship will be gathered to the place He appoints, not scattered by preference."];
  else if (/thither thou shalt come/.test(lower)) opening = ["Thither means to that chosen place.", "Israel must move toward the place God names instead of creating rival centers."];
  else if (/and thither ye shall bring your burnt offerings/.test(lower)) opening = ["Burnt offerings are whole offerings placed on the altar for God.", "Even the most complete sacrifice must be brought to the place He chooses."];
  else if (/and your sacrifices/.test(lower) && section.reference === "Deuteronomy 12:4-7") opening = ["The word sacrifices broadens the list beyond burnt offerings alone.", "The phrase expands the rule beyond one kind of gift."];
  else if (/and your sacrifices/.test(lower)) opening = ["The settled-land command repeats that ordinary sacrifices still belong at God's chosen place.", "The phrase expands the rule beyond one kind of gift."];
  else if (/and your tithes/.test(lower)) opening = ["Tithes are the set portions given as part of covenant worship.", "They too must come under God's chosen worship order."];
  else if (/and heave offerings of your hand/.test(lower)) opening = ["A heave offering is a lifted portion presented to the LORD as a sacred gift.", "The phrase marks even raised portions as holy, not casual food."];
  else if (/and the heave offering of your hand/.test(lower)) opening = ["The settled-land list repeats the heave offering to show that raised gifts still belong to holy worship.", "The phrase marks even raised portions as holy, not casual food."];
  else if (/or heave offering of thine hand/.test(lower)) opening = ["Here the heave offering is one more example of food that cannot be treated like an ordinary home meal.", "The phrase marks even raised portions as holy, not casual food."];
  else if (/and your vows/.test(lower)) opening = ["Vows are promised gifts that must be brought to God as spoken commitments.", "What is promised to the LORD must be brought and honored His way."];
  else if (/nor any of thy vows which thou vowest/.test(lower)) opening = ["The line forbids treating vowed gifts like private food within the gates.", "What is promised to the LORD must be brought and honored His way."];
  else if (/ye shall not do after all the things that we do here this day/.test(lower)) opening = ["Moses says the current wilderness pattern will not continue unchanged.", "Life in the land will require a more settled and regulated worship life."];
  else if (/every man whatsoever is right in his own eyes/.test(lower)) opening = ["Doing what is right in his own eyes means acting by personal judgment alone.", "The phrase warns against self-designed worship."];
  else if (/for ye are not as yet come to the rest/.test(lower)) opening = ["Rest means settled life in the land under God's gift.", "The people are still in transition and have not yet reached that stage."];
  else if (/and to the inheritance/.test(lower)) opening = ["Inheritance is the land portion God is giving His people.", "Moses links worship order to life in the promised gift."];
  else if (/which the lord your god giveth you/.test(lower) && section.chapter === 12) opening = ["The land remains God's gift even while Moses is giving worship rules for it.", "Inheritance is never permission to ignore the Giver's order."];
  else if (/when ye go over jordan/.test(lower)) opening = ["Crossing Jordan marks entry into the promised land.", "The phrase points to a coming change in how Israel will live and worship."];
  else if (/dwell in safety/.test(lower)) opening = ["Safety here means rest from enemies under God's protection.", "Settled peace is a gift God Himself provides."];
  else if (/thither shall ye bring all that i command you/.test(lower)) opening = ["The phrase gathers every commanded offering under one chosen place.", "Worship is centralized because God, not preference, sets its location."];
  else if (/your burnt offerings/.test(lower) && section.reference === "Deuteronomy 12:10-12") opening = ["Even after the people settle in safety, burnt offerings still belong to God's command.", "Rest in the land does not loosen worship order."];
  else if (/ye shall rejoice before the lord your god/.test(lower)) opening = ["Rejoicing before the LORD means glad worship in His presence.", "Obedience is not joyless; it includes thankful celebration."];
  else if (/take heed to thyself/.test(lower)) opening = ["Moses gives a direct personal warning to stay watchful about worship.", "Sacrificial zeal is not enough if it ignores God's chosen order."];
  else if (/offer not thy burnt offerings in every place that thou seest/.test(lower)) opening = ["The phrase forbids offering sacrifice wherever it seems convenient.", "Seeing a place is not the same as God choosing a place."];
  else if (/in the place which the lord shall choose/.test(lower)) opening = ["The chosen place belongs to God's decision, not Israel's imagination.", "Central worship protects the people from copying pagan patterns."];
  else if (/there thou shalt offer thy burnt offerings/.test(lower)) opening = ["The place of sacrifice is narrowed down to where God appoints.", "True worship obeys the location as well as the act."];
  else if (/and there thou shalt do all that i command thee/.test(lower)) opening = ["The phrase joins all worship practice to God's direct command.", "Nothing holy is left to improvisation."];
  else if (/whatsoever thy soul lusteth after/.test(lower)) opening = ["The soul lusting after something means strongly desiring it.", "Here the desire is for meat as ordinary food rather than altar worship."];
  else if (/i will eat flesh/.test(lower)) opening = ["The phrase voices a straightforward desire to eat meat.", "Moses is talking about common appetite, not sacrifice."];
  else if (/because thy soul longeth to eat flesh/.test(lower)) opening = ["Longing here means craving or wanting something strongly.", "The law acknowledges ordinary human desire while still setting limits."];
  else if (/thou mayest eat flesh/.test(lower)) opening = ["The permission is real: ordinary meat may be eaten.", "Moses is distinguishing common meals from sanctuary offerings."];
  else if (/unclean and the clean may eat thereof/.test(lower)) opening = ["Here clean and unclean persons may share in ordinary meat that is not sacrificial.", "The rule is different because this is common food, not altar food."];
  else if (/as of the roebuck|roebuck|hart/.test(lower)) opening = ["The roebuck and the hart are wild animals hunted for food.", "They picture meat that may be eaten apart from sanctuary sacrifice."];
  else if (/ye shall pour it upon the earth as water/.test(lower)) opening = ["The blood is to be released back to the ground rather than eaten.", "The act keeps common meat from becoming a misuse of life."];
  else if (/thou mayest not eat within thy gates/.test(lower)) opening = ["Within thy gates means in your hometown or local settlement.", "The phrase forbids treating holy portions like an ordinary meal at home."];
  else if (/the tithe of thy corn/.test(lower)) opening = ["The grain tithe belongs to God as a set worship portion.", "It cannot be reduced to private eating at home."];
  else if (/or of thy wine, or of thy oil/.test(lower)) opening = ["Wine and oil are named with the tithe because they too belong to holy use.", "The phrase widens the rule beyond grain alone."];
  else if (/or the firstlings of thy herds or of thy flock/.test(lower)) opening = ["Firstlings are the firstborn animals from herd and flock.", "They are set apart and cannot be handled like common livestock."];
  else if (/nor thy freewill offerings/.test(lower)) opening = ["A freewill offering is given voluntarily, but it is still holy once offered.", "Willingness does not remove the need for ordered worship."];
  else if (/only be sure that thou eat not the blood/.test(lower)) opening = ["Be sure means take special care.", "The blood prohibition is emphasized because blood represents life before God."];
  else if (/for the blood is the life/.test(lower)) opening = ["The phrase treats blood as the life of the creature.", "That is why it cannot be treated as just another edible part."];
  else if (/thou mayest not eat the life with the flesh/.test(lower)) opening = ["The life must not be consumed along with the meat.", "Moses turns the rule into a moral boundary around life itself."];
  else if (/thou shalt pour it upon the earth as water/.test(lower)) opening = ["The command repeats the same act in stronger personal form.", "Life must be returned to the earth instead of treated like food."];
  else if (/only thy holy things which thou hast/.test(lower)) opening = ["Holy things are gifts already marked off for God.", "Once set apart, they must be handled as sacred, not ordinary."];
  else if (/and thy vows/.test(lower)) opening = ["The vows are the promised offerings Israel must still fulfill.", "Moses keeps reminding the people that spoken commitments to God matter."];
  else if (/go unto the place which the lord shall choose/.test(lower)) opening = ["The journey to the chosen place is part of the obedience itself.", "Holy things are not complete until they are brought where God appoints."];
  else if (/the flesh and the blood/.test(lower)) opening = ["Both meat and blood are mentioned to distinguish what belongs on the altar from what may be eaten.", "The phrase protects the sacred meaning of sacrifice."];
  else if (/upon the altar of the lord thy god/.test(lower)) opening = ["The altar is the appointed place where sacrificial life is offered to God.", "The phrase keeps holy sacrifice separate from ordinary eating."];
  else if (/whither thou goest to possess them/.test(lower)) opening = ["Israel is entering land that once belonged to idolatrous nations.", "The phrase sets the scene for a warning about copied worship."];
  else if (/and thou succeedest them/.test(lower)) opening = ["Succeedest means take their place after them.", "Israel must inherit the land without inheriting the religion that filled it."];
  else if (/and dwellest in their land/.test(lower)) opening = ["Settling in their land creates the temptation to settle into their customs too.", "Moses warns before that imitation begins."];
  else if (/after that they be destroyed from before thee/.test(lower)) opening = ["Even after the nations are judged, their religious patterns can still linger as a temptation.", "Removal of people does not automatically remove the danger of imitation."];
  else if (/enquire not after their gods/.test(lower)) opening = ["The phrase forbids researching pagan worship as if it might teach something useful.", "Curiosity becomes dangerous when the subject is false worship."];
  else if (/for every abomination to the lord/.test(lower)) opening = ["Abomination means something loathsome and detestable to God.", "The warning explains why pagan worship cannot be borrowed."];
  else if (/which he hateth/.test(lower)) opening = ["The phrase states God's settled opposition to those practices.", "What the LORD hates cannot become a pattern for His people."];
  else if (/if there arise among you a prophet/.test(lower)) opening = ["A prophet could claim to speak for God from inside the covenant community.", "Moses warns that not every spiritual voice is trustworthy."];
  else if (/dreamer of dreams/.test(lower)) opening = ["A dreamer of dreams claims revelation through dreams.", "The warning reaches both spoken prophecy and dream-based claims."];
  else if (/giveth thee a sign or a wonder/.test(lower)) opening = ["A sign or wonder is something impressive that seems to validate the speaker.", "Moses is preparing Israel not to confuse wonder with truth."];
  else if (/the sign or the wonder come to pass/.test(lower)) opening = ["Even a sign that actually happens is not the final test of truth.", "A fulfilled wonder still must be judged by whether it leads toward the LORD or away from Him."];
  else if (/thou shalt not hearken unto the words of that prophet/.test(lower)) opening = ["Hearken not means refuse his message.", "Moses breaks the link between supernatural impressiveness and spiritual truth."];
  else if (/for the lord your god proveth you/.test(lower)) opening = ["Proveth you means tests you.", "The false sign exposes whether Israel truly loves the LORD more than spectacle."];
  else if (/if thy brother, the son of thy mother, entice thee secretly/.test(lower)) opening = ["Entice secretly means quietly lure someone away.", "The danger here is intimate pressure rather than public preaching."];
  else if (/or thy son, or thy daughter/.test(lower)) opening = ["Moses even names children as possible sources of pressure toward idolatry.", "No family bond is allowed to outrank covenant loyalty."];
  else if (/wife of thy bosom/.test(lower)) opening = ["The wife of thy bosom is the spouse closest to the heart.", "Moses names the nearest relationships so loyalty to God cannot be sidestepped."];
  else if (/friend, which is as thine own soul/.test(lower)) opening = ["This is a friend loved like one's own life.", "Even deep friendship cannot make idolatry harmless."];
  else if (/thou shalt not consent unto him, nor hearken unto him/.test(lower)) opening = ["Consent means agree and join in.", "The command forbids both sympathy and participation in the seduction."];
  else if (/thou shalt surely kill him/.test(lower)) opening = ["The severe wording shows how seriously covenant idolatry is treated.", "The one who tries to pull Israel from the LORD is not treated as a minor influence."];
  else if (/thine hand shall be first upon him/.test(lower)) opening = ["The accuser cannot stand at a safe distance from the judgment.", "The phrase forces personal responsibility in a matter that serious."];
  else if (/stone him with stones, that he die/.test(lower)) opening = ["The execution language makes the judgment public and final.", "The community is taught that covenant treachery is deadly evil."];
  else if (/sought to thrust thee away from the lord thy god/.test(lower)) opening = ["To thrust away means push or drive someone off course.", "The enticer is trying to separate Israel from its Redeemer."];
  else if (/which brought thee out of the land of egypt/.test(lower)) opening = ["The phrase names the God who actually rescued Israel from Egypt.", "It makes the enticer's sin personal betrayal against the true Deliverer."];
  else if (/from the house of bondage/.test(lower)) opening = ["The house of bondage means the condition of slavery Israel lived under in Egypt.", "The reminder shows how wicked it is to push the rescued people away from their Redeemer."];
  else if (/all israel shall hear, and fear/.test(lower)) opening = ["The judgment is meant to be heard about by the whole nation.", "Public fear is supposed to stop the spread of the same evil."];
  else if (/if thou shalt hear say in one of thy cities/.test(lower)) opening = ["The warning now moves from an individual to a whole city.", "Idolatry can spread through a community, not only through one person."];
  else if (/children of belial/.test(lower)) opening = ["Belial means worthlessness or wicked rebellion.", "The phrase names people who are morally corrupt and destructive."];
  else if (/withdrawn the inhabitants of their city/.test(lower)) opening = ["Withdrawn means drawn away from covenant loyalty.", "The danger is organized influence that turns a population toward idols."];
  else if (/then shalt thou enquire, and make search, and ask diligently/.test(lower)) opening = ["The three verbs slow the process down on purpose.", "Serious judgment requires careful investigation, not rumor and panic."];
  else if (/thou shalt surely smite the inhabitants of that city with the edge of the sword/.test(lower)) opening = ["The whole city comes under judgment once the apostasy is proven true.", "The sentence shows how seriously covenant treason is treated at a communal level."];
  else if (/destroying it utterly/.test(lower)) opening = ["Utterly means completely and without remainder.", "Nothing about the apostate city is to be preserved as normal."];
  else if (/all the cattle thereof/.test(lower)) opening = ["The judgment reaches the city's livestock as well as its people.", "The destruction is total because the city has become devoted to judgment."];
  else if (/gather all the spoil of it into the midst of the street thereof/.test(lower)) opening = ["Spoil means the city's goods and property gathered into one public place.", "The phrase stops people from quietly claiming private profit."];
  else if (/shalt burn with fire the city, and all the spoil thereof every whit/.test(lower)) opening = ["Every whit means every bit of it.", "The total burning shows the judgment is complete and not a chance for gain."];
  else if (/it shall be an heap for ever/.test(lower)) opening = ["An heap for ever means a permanent ruin.", "The destroyed city becomes a standing warning against covenant revolt."];
  else if (/there shall cleave nought of the cursed thing to thine hand/.test(lower)) opening = ["Nothing under the curse may stick to Israel's hand as personal gain.", "Holy judgment cannot be mixed with private greed."];
  else if (/turn from the fierceness of his anger/.test(lower)) opening = ["Fierceness of anger describes judgment at full heat.", "Moses is showing that obedience matters because it turns away deserved wrath."];
  else if (/and shew thee mercy/.test(lower)) opening = ["Mercy here is the LORD's gracious turning toward His people after judgment is honored.", "Covenant severity is not God's final delight."];
  else if (/and have compassion upon thee/.test(lower)) opening = ["Compassion means tender pity toward the people.", "Restoration comes because God is merciful, not because the people were flawless."];
  else if (/multiply thee/.test(lower)) opening = ["Multiply thee means make the people flourish and increase.", "Restoration is not merely survival; it can become renewed fruitfulness."];
  else if (/as he hath sworn unto thy fathers/.test(lower)) opening = ["Again Moses grounds hope in God's oath to the fathers.", "Mercy moves along covenant promise, not human worthiness."];
  else if (/because thou shalt hearken to the voice of the lord thy god/.test(lower)) opening = ["Hearkening to God's voice means receiving it with obedience.", "Mercy and life are tied to listening rightly to the LORD."];
  else opening = [`This wording highlights ${getDeuteronomy1To13DistinctiveTopic(cleanTitle)} in Day 50's covenant teaching.`, "Moses keeps pressing heart loyalty, true worship, and obedience inside the land God gives."];

  return note([
    opening[0],
    opening[1],
    getDay50DeuteronomyLeadSupport(cleanTitle),
    ...getDay50DeuteronomySupport(cleanTitle).slice(0, 3),
  ].slice(0, 8));
}

function explainDeuteronomy1To13At95(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  if (section.chapter === 1) return explainDay47DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 2 && section.chapter <= 5) return explainDay48DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 6 && section.chapter <= 9) return explainDay49DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 10 && section.chapter <= 13) return explainDay50DeuteronomyAt95(section, cleanTitle);

  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord our god|lord thy god/.test(lower)) opening = ["The LORD our God identifies Israel's covenant God personally.", "Moses is not giving general religion; he is calling Israel back to the God who rescued them."];
  else if (/spake|said unto me|commanded|as the lord/.test(lower)) opening = ["The command begins with the LORD's word.", "Deuteronomy grounds Israel's future in what God has spoken, not in self-confidence."];
  else if (/moses|spake unto all israel/.test(lower)) opening = ["Moses is addressing the new generation before they enter the land.", "His speech retells the journey so Israel will remember and obey."];
  else if (/this side jordan|wilderness|horeb|kadeshbarnea|seir|moab|ammon|bashan/.test(lower)) opening = ["The place name anchors Moses' speech in Israel's real journey.", "The geography matters because obedience must happen in the actual land God gives."];
  else if (/judges|captains|wise men|hear between|righteous judgment|respect persons/.test(lower)) opening = ["The justice language describes fair leadership among the people.", "Israel cannot live as God's covenant people if judgment is twisted by fear or favoritism."];
  else if (/go up|possess|land|inheritance|mountain|giants|walled|good land|sware/.test(lower)) opening = ["Possess the land means receive and enter what God promised.", "The land is gift, but Israel must trust and obey the LORD there."];
  else if (/rebelled|murmured|would not go|afraid|unbelief|forty years|children|wander/.test(lower)) opening = ["Moses recalls how fear became rebellion in the previous generation.", "The warning teaches the new generation not to repeat unbelief at the edge of promise."];
  else if (/calf|stiffnecked|interceded|tables|ark/.test(lower)) opening = ["The Sinai rebellion is remembered so Israel will understand mercy honestly.", "God renewed covenant after real sin, not because Israel deserved it."];
  else if (/hear o israel/.test(lower)) opening = ["Hear O Israel is a call to listen with covenant attention.", "Moses is summoning the whole people to receive God's command with heart and life."];
  else if (/love the lord|heart|soul|might/.test(lower)) opening = ["Love the LORD means covenant loyalty with the whole person.", "Deuteronomy refuses a shallow obedience that leaves the heart untouched."];
  else if (/teach|children|house|bind|doorposts|gates/.test(lower)) opening = ["Teaching the children means God's word must shape the home.", "The command moves faith from public hearing into ordinary family life."];
  else if (/remember|forget|egypt|manna|humbled|bread/.test(lower)) opening = ["Remember means actively keep the LORD's rescue and provision in mind.", "Forgetting would turn wilderness mercy into pride and self-trust."];
  else if (/power|get wealth|heart lifted/.test(lower)) opening = ["The warning about power and wealth exposes pride after blessing.", "Israel must not treat God's gifts as proof of their own greatness."];
  else if (/idol|other gods|graven|image|serve/.test(lower)) opening = ["Other gods and graven images mean rival worship.", "Israel's covenant with the LORD cannot be shared with manufactured gods."];
  else if (/place which the lord|choose|altar|sacrifice|blood|high places/.test(lower)) opening = ["The chosen place means worship must follow the LORD's command.", "Israel may not copy Canaan's worship patterns or handle sacrifice casually."];
  else if (/prophet|dreamer|sign|wonder|secretly|belial/.test(lower)) opening = ["A false prophet or dreamer could sound spiritual while leading away from the LORD.", "Even impressive signs cannot excuse idolatry."];
  else opening = [`This wording names ${getDeuteronomy1To13DistinctiveTopic(cleanTitle)} in Deuteronomy ${section.chapter}.`, "The phrase gives a concrete part of covenant memory, obedience, warning, worship, or love."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getDeuteronomy1To13DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or warning in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getDeuteronomy1To13Support(cleanTitle),
  ].slice(0, 8));
}

function makeDeuteronomyOneToThirteenExplanation(section: (typeof generatedDeuteronomyOneToThirteenPersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainDeuteronomy1To13At95(section, title, occurrenceIndex);

  const [lineOne, lineTwo] = getDeuteronomyOneToThirteenMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getDeuteronomyOneToThirteenBullets(title),
  ]);
}

export const DEUTERONOMY_1_13_PERSONAL_SECTIONS: PersonalSection[] = generatedDeuteronomyOneToThirteenPersonalSections.map((section) => ({
  ...section,
  title: day47DeuteronomySectionTitles[section.reference] || day48DeuteronomySectionTitles[section.reference] || day49DeuteronomySectionTitles[section.reference] || day50DeuteronomySectionTitles[section.reference] || section.title,
  phrases: (() => {
    const seen = new Map<string, number>();
    return (
      day47DeuteronomyCuratedPhraseTitles[section.reference] ||
      day48DeuteronomyCuratedPhraseTitles[section.reference] ||
      day49DeuteronomyCuratedPhraseTitles[section.reference] ||
      day50DeuteronomyCuratedPhraseTitles[section.reference] ||
      section.phrases.map(([title]) => title)
    ).map((title) => {
      const key = stripLeadingEmoji(title).toLowerCase();
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);
      return [
        title,
        makeDeuteronomyOneToThirteenExplanation(section, title, occurrence),
      ] as PersonalPhrase;
    });
  })(),
}));
