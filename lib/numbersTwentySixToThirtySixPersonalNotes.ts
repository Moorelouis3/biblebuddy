import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedNumbersTwentySixToThirtySixPersonalSections = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "According To Their Families",
    "Before The LORD",
    "The Inheritance",
    "As The LORD Commanded Moses",
    "The Congregation",
  ],
});

const day45NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 26:1-4": [
    "📍 It Came To Pass After The Plague",
    "📋 Take The Sum Of All The Congregation",
    "🔢 From Twenty Years Old And Upward",
    "⚔️ Able To Go To War In Israel",
  ],
  "Numbers 26:5-10": [
    "👤 Reuben, The Eldest Son Of Israel",
    "🏠 After Their Families",
    "📛 Dathan And Abiram",
    "🕳️ The Earth Opened Her Mouth",
    "🔥 The Fire Devoured Two Hundred And Fifty Men",
  ],
  "Numbers 26:11-11": [
    "🕊️ Notwithstanding The Children Of Korah Died Not",
    "👥 The Children Of Korah",
    "⚖️ Died Not",
    "📛 Korah's Line Was Not Wiped Out",
  ],
  "Numbers 26:12-14": [
    "👥 The Sons Of Simeon After Their Families",
    "🏠 The Family Of The Nemuelites",
    "📋 These Are The Families Of The Simeonites",
    "🔢 Twenty And Two Thousand And Two Hundred",
  ],
  "Numbers 26:15-18": [
    "👥 The Children Of Gad After Their Families",
    "🏠 The Family Of The Zephonites",
    "📋 These Are The Families Of The Children Of Gad",
    "🔢 Forty Thousand And Five Hundred",
  ],
  "Numbers 26:19-22": [
    "👤 The Sons Of Judah Were Er And Onan",
    "⚰️ Er And Onan Died In The Land Of Canaan",
    "🏠 The Family Of The Shelanites",
    "📋 These Are The Families Of Judah",
    "🔢 Threescore And Sixteen Thousand And Five Hundred",
  ],
  "Numbers 26:23-27": [
    "👥 Of The Sons Of Issachar After Their Families",
    "🏠 The Family Of The Tolaites",
    "📋 These Are The Families Of Issachar",
    "👥 The Sons Of Zebulun After Their Families",
    "🔢 Threescore Thousand And Five Hundred",
  ],
  "Numbers 26:28-33": [
    "👥 The Sons Of Joseph After Their Families",
    "🏠 Manasseh And Ephraim",
    "👤 Zelophehad Had No Sons, But Daughters",
    "👧 The Names Of The Daughters Of Zelophehad",
    "📛 Mahlah, And Noah, Hoglah, Milcah, And Tirzah",
  ],
  "Numbers 26:34-34": [
    "📋 These Are The Families Of Manasseh",
    "🔢 Fifty And Two Thousand And Seven Hundred",
    "🏠 Manasseh's Families Are Counted",
    "🗺️ Manasseh Stands Ready For Inheritance",
  ],
  "Numbers 26:35-37": [
    "👥 These Are The Sons Of Ephraim",
    "🏠 The Family Of The Shuthelahites",
    "📋 These Are The Families Of The Sons Of Ephraim",
    "🔢 Thirty And Two Thousand And Five Hundred",
  ],
  "Numbers 26:38-41": [
    "👥 The Sons Of Benjamin After Their Families",
    "🏠 The Family Of The Belaites",
    "📋 These Are The Sons Of Benjamin",
    "🔢 Forty And Five Thousand And Six Hundred",
  ],
  "Numbers 26:42-43": [
    "👥 These Are The Sons Of Dan After Their Families",
    "🏠 The Family Of The Shuhamites",
    "📋 These Are The Families Of Dan",
    "🔢 Threescore And Four Thousand And Four Hundred",
  ],
  "Numbers 26:44-47": [
    "👥 Of The Children Of Asher After Their Families",
    "🏠 The Family Of The Jimnites",
    "👧 The Name Of The Daughter Of Asher Was Sarah",
    "📋 These Are The Families Of The Sons Of Asher",
    "🔢 Fifty And Three Thousand And Four Hundred",
  ],
  "Numbers 26:48-50": [
    "👥 Of The Sons Of Naphtali After Their Families",
    "🏠 The Family Of The Jahzeelites",
    "📋 These Are The Families Of Naphtali",
    "🔢 Forty And Five Thousand And Four Hundred",
  ],
  "Numbers 26:51-56": [
    "📋 These Were The Numbered Of The Children Of Israel",
    "🔢 Six Hundred Thousand And A Thousand Seven Hundred And Thirty",
    "🏞️ Unto These The Land Shall Be Divided For An Inheritance",
    "🎲 According To The Lot Shall The Possession Thereof Be Divided",
    "📏 Between Many And Few",
  ],
  "Numbers 26:57-62": [
    "👥 These Are They That Were Numbered Of The Levites",
    "🏠 The Family Of The Gershonites",
    "👶 Jochebed The Daughter Of Levi",
    "👑 She Bare Unto Amram Aaron And Moses",
    "🚫 They Were Not Numbered Among The Children Of Israel",
  ],
  "Numbers 26:63-65": [
    "📍 These Are They That Were Numbered By Moses And Eleazar",
    "🚫 There Was Not A Man Of Them",
    "⚰️ They Shall Surely Die In The Wilderness",
    "✅ Save Caleb The Son Of Jephunneh, And Joshua The Son Of Nun",
  ],
  "Numbers 27:1-4": [
    "👧 Then Came The Daughters Of Zelophehad",
    "📛 Mahlah, Noah, Hoglah, Milcah, And Tirzah",
    "🙋 They Stood Before Moses",
    "⚰️ Our Father Died In The Wilderness",
    "🚫 He Had No Sons",
    "🏞️ Give Unto Us Therefore A Possession",
  ],
  "Numbers 27:5-7": [
    "⚖️ Moses Brought Their Cause Before The LORD",
    "📣 The LORD Spake Unto Moses",
    "✅ The Daughters Of Zelophehad Speak Right",
    "🏞️ Thou Shalt Surely Give Them A Possession",
  ],
  "Numbers 27:8-11": [
    "⚰️ If A Man Die",
    "🚫 And Have No Son",
    "👧 Then Ye Shall Cause His Inheritance To Pass Unto His Daughter",
    "📜 A Statute Of Judgment",
  ],
  "Numbers 27:12-14": [
    "⛰️ Get Thee Up Into This Mount Abarim",
    "👀 See The Land Which I Have Given Unto The Children Of Israel",
    "👥 Thou Also Shalt Be Gathered Unto Thy People",
    "⚠️ Ye Rebelled Against My Commandment",
  ],
  "Numbers 27:15-17": [
    "🙏 Moses Spake Unto The LORD",
    "🕊️ The God Of The Spirits Of All Flesh",
    "👤 Set A Man Over The Congregation",
    "🐑 That The Congregation Of The LORD Be Not As Sheep",
  ],
  "Numbers 27:18-20": [
    "🧭 Take Thee Joshua The Son Of Nun",
    "🕊️ A Man In Whom Is The Spirit",
    "✋ Lay Thine Hand Upon Him",
    "👑 Put Some Of Thine Honour Upon Him",
    "👥 All The Congregation May Be Obedient",
  ],
  "Numbers 27:22-23": [
    "✅ Moses Did As The LORD Commanded Him",
    "👥 He Set Him Before Eleazar The Priest",
    "✋ Laid His Hands Upon Him",
    "📜 Gave Him A Charge",
  ],
  "Numbers 28:1-2": [
    "📣 Command The Children Of Israel",
    "🍞 My Offering, And My Bread",
    "🔥 My Sacrifices Made By Fire",
    "🌸 For A Sweet Savour Unto Me",
    "⏰ In Their Due Season",
  ],
  "Numbers 28:3-4": [
    "🐑 Two Lambs Of The First Year Without Spot",
    "📅 Day By Day",
    "🔥 For A Continual Burnt Offering",
    "🌅 The One Lamb Shalt Thou Offer In The Morning",
    "🌆 The Other Lamb Shalt Thou Offer At Even",
  ],
  "Numbers 28:5-8": [
    "🌾 A Tenth Part Of An Ephah Of Flour",
    "🛢️ The Fourth Part Of An Hin Of Beaten Oil",
    "🔥 A Continual Burnt Offering",
    "🍷 The Drink Offering Thereof",
    "🌸 A Sweet Savour",
  ],
  "Numbers 28:9-10": [
    "🕊️ On The Sabbath Day",
    "🐑 Two Lambs Of The First Year Without Spot",
    "🌾 Two Tenth Deals Of Flour",
    "🔥 Beside The Continual Burnt Offering",
  ],
  "Numbers 28:11-15": [
    "🌙 In The Beginnings Of Your Months",
    "🐂 Two Young Bullocks",
    "🐏 One Ram",
    "🐑 Seven Lambs Of The First Year Without Spot",
    "🐐 One Kid Of The Goats For A Sin Offering",
  ],
  "Numbers 28:16-18": [
    "🐑 In The Fourteenth Day Of The First Month",
    "🩸 Is The Passover Of The LORD",
    "🍞 The Feast Of Unleavened Bread",
    "🛑 Ye Shall Do No Manner Of Servile Work Therein",
  ],
  "Numbers 28:19-22": [
    "🔥 Ye Shall Offer A Sacrifice Made By Fire",
    "🐂 Two Young Bullocks",
    "🐑 Seven Lambs Of The First Year",
    "✅ They Shall Be Unto You Without Blemish",
    "🕊️ To Make An Atonement For You",
  ],
  "Numbers 28:23-25": [
    "🔥 Beside The Burnt Offering Of The Morning",
    "📅 After This Manner Ye Shall Offer Daily",
    "🍞 The Meat Of The Sacrifice Made By Fire",
    "🛑 Ye Shall Do No Servile Work",
  ],
  "Numbers 28:26-31": [
    "🌾 In The Day Of The Firstfruits",
    "🆕 When Ye Bring A New Meat Offering",
    "📅 After Your Weeks Be Out",
    "🔥 Ye Shall Offer The Burnt Offering",
    "✅ They Shall Be Unto You Without Blemish",
  ],
  "Numbers 29:1-6": [
    "📅 In The Seventh Month",
    "🎺 It Is A Day Of Blowing The Trumpets Unto You",
    "🛑 Ye Shall Do No Servile Work",
    "🔥 Ye Shall Offer A Burnt Offering",
    "🌙 Beside The Burnt Offering Of The Month",
  ],
  "Numbers 29:7-11": [
    "📅 On The Tenth Day Of This Seventh Month",
    "🧎 Ye Shall Afflict Your Souls",
    "🛑 Ye Shall Not Do Any Work Therein",
    "🩸 Beside The Sin Offering Of Atonement",
  ],
  "Numbers 29:12-16": [
    "📅 On The Fifteenth Day Of The Seventh Month",
    "🎉 Ye Shall Keep A Feast Unto The LORD Seven Days",
    "🛑 Ye Shall Do No Servile Work",
    "🐂 Thirteen Young Bullocks",
    "🌸 Of A Sweet Savour Unto The LORD",
  ],
  "Numbers 29:17-19": [
    "📅 On The Second Day",
    "🐂 Twelve Young Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Spot",
    "🐐 One Kid Of The Goats For A Sin Offering",
  ],
  "Numbers 29:20-22": [
    "📅 On The Third Day",
    "🐂 Eleven Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Blemish",
    "🐐 One Goat For A Sin Offering",
  ],
  "Numbers 29:23-25": [
    "📅 On The Fourth Day",
    "🐂 Ten Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Blemish",
    "🐐 One Kid Of The Goats For A Sin Offering",
  ],
  "Numbers 29:26-28": [
    "📅 On The Fifth Day",
    "🐂 Nine Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Spot",
    "🐐 One Goat For A Sin Offering",
  ],
  "Numbers 29:29-31": [
    "📅 On The Sixth Day",
    "🐂 Eight Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Blemish",
    "🐐 One Goat For A Sin Offering",
  ],
  "Numbers 29:32-34": [
    "📅 On The Seventh Day",
    "🐂 Seven Bullocks",
    "🐑 Fourteen Lambs Of The First Year Without Blemish",
    "🐐 One Goat For A Sin Offering",
  ],
  "Numbers 29:35-38": [
    "📅 On The Eighth Day",
    "🕊️ Ye Shall Have A Solemn Assembly",
    "🛑 Ye Shall Do No Servile Work Therein",
    "🔥 Ye Shall Offer A Burnt Offering",
    "🐂 One Bullock, One Ram, Seven Lambs",
  ],
  "Numbers 29:39-40": [
    "🎁 Beside Your Vows",
    "🎁 Beside Your Freewill Offerings",
    "🔥 For Your Burnt Offerings",
    "🍷 For Your Drink Offerings",
  ],
};

const day46NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 30:1-2": [
    "📣 Moses Spake Unto The Heads Of The Tribes",
    "🙏 If A Man Vow A Vow Unto The LORD",
    "🔒 Or Swear An Oath To Bind His Soul With A Bond",
    "🗣️ He Shall Not Break His Word",
    "✅ He Shall Do According To All That Proceedeth Out Of His Mouth",
  ],
  "Numbers 30:3-5": [
    "👧 If A Woman Also Vow A Vow Unto The LORD",
    "🔒 Bind Herself By A Bond",
    "🏠 Being In Her Father's House In Her Youth",
    "👂 Her Father Hear Her Vow",
    "🕊️ The LORD Shall Forgive Her",
  ],
  "Numbers 30:6-8": [
    "💍 If She Had At All An Husband",
    "🗣️ Wherewith She Bound Her Soul",
    "👂 Her Husband Heard It",
    "✅ Then Her Vows Shall Stand",
    "🚫 Her Husband Disallowed Her",
  ],
  "Numbers 30:10-12": [
    "🏠 If She Vowed In Her Husband's House",
    "🤐 Her Husband Held His Peace At Her",
    "✅ Then All Her Vows Shall Stand",
    "🚫 If Her Husband Hath Utterly Made Them Void",
    "🕊️ The LORD Shall Forgive Her",
  ],
  "Numbers 30:13-15": [
    "🔒 Every Vow, And Every Binding Oath",
    "🧎 To Afflict The Soul",
    "✅ Her Husband May Establish It",
    "🚫 Or Her Husband May Make It Void",
    "⚖️ Then He Shall Bear Her Iniquity",
  ],
  "Numbers 31:1-3": [
    "📣 The LORD Spake Unto Moses",
    "⚔️ Avenge The Children Of Israel Of The Midianites",
    "⏳ Afterward Shalt Thou Be Gathered Unto Thy People",
    "🛡️ Arm Some Of Yourselves Unto The War",
    "⚔️ Let Them Go Against The Midianites",
  ],
  "Numbers 31:4-6": [
    "🔢 Of Every Tribe A Thousand",
    "👥 Twelve Thousand Armed For War",
    "👑 Phinehas The Son Of Eleazar The Priest",
    "🛠️ With The Holy Instruments",
    "🎺 The Trumpets To Blow In His Hand",
  ],
  "Numbers 31:7-8": [
    "⚔️ They Warred Against The Midianites",
    "📜 As The LORD Commanded Moses",
    "🗡️ They Slew All The Males",
    "👑 The Kings Of Midian",
    "🧙 Balaam Also... They Slew With The Sword",
  ],
  "Numbers 31:9-12": [
    "👥 The Children Of Israel Took All The Women Of Midian Captives",
    "🐄 Took The Spoil Of All Their Cattle",
    "🔥 They Burnt All Their Cities",
    "🏰 All Their Goodly Castles",
    "📦 They Brought The Captives, And The Prey, And The Spoil",
  ],
  "Numbers 31:13-16": [
    "😡 Moses Was Wroth With The Officers",
    "❓ Have Ye Saved All The Women Alive",
    "🧠 Through The Counsel Of Balaam",
    "📛 To Commit Trespass Against The LORD",
    "🦠 There Was A Plague Among The Congregation",
  ],
  "Numbers 31:17-20": [
    "⚖️ Now Therefore Kill Every Male Among The Little Ones",
    "🏕️ Do Ye Abide Without The Camp Seven Days",
    "🧼 Purify Both Yourselves And Your Captives",
    "👕 Purify All Your Raiment",
    "🧺 All Work Of Goats' Hair",
  ],
  "Numbers 31:21-24": [
    "📜 This Is The Ordinance Of The Law",
    "🔥 Every Thing That May Abide The Fire",
    "💧 It Shall Be Purified With The Water Of Separation",
    "🧼 All That Abideth Not The Fire Ye Shall Make Go Through The Water",
    "✅ Ye Shall Be Clean",
  ],
  "Numbers 31:25-30": [
    "📋 Take The Sum Of The Prey That Was Taken",
    "➗ Divide The Prey Into Two Parts",
    "⚔️ Between Them That Took The War Upon Them",
    "👥 And Between All The Congregation",
    "🎁 Give It Unto Eleazar The Priest For An Heave Offering",
  ],
  "Numbers 31:31-31": [
    "✅ Moses And Eleazar The Priest Did As The LORD Commanded Moses",
    "📜 The Spoil Was Divided By Command",
    "👑 Priest And Prophet Obey Together",
    "⚖️ Victory Is Handled Under God's Order",
  ],
  "Numbers 31:32-37": [
    "🐑 Six Hundred Thousand And Seventy Thousand And Five Thousand Sheep",
    "🐄 Threescore And Twelve Thousand Beeves",
    "🐴 Threescore And One Thousand Asses",
    "👥 Thirty And Two Thousand Persons",
    "🎁 The LORD'S Tribute Of The Sheep Was Six Hundred And Threescore And Fifteen",
  ],
  "Numbers 31:38-41": [
    "🐄 The Beeves Were Thirty And Six Thousand",
    "🎁 The LORD'S Tribute Was Threescore And Twelve",
    "🐴 The Asses Were Thirty Thousand And Five Hundred",
    "👥 The Persons Were Sixteen Thousand",
    "👑 Moses Gave The Tribute Unto Eleazar The Priest",
  ],
  "Numbers 31:42-47": [
    "👥 The Children Of Israel's Half",
    "➗ Which Moses Divided From The Men That Warred",
    "🐑 Three Hundred Thousand And Thirty Thousand And Seven Thousand And Five Hundred Sheep",
    "🎁 Moses Took One Portion Of Fifty",
    "🧑‍🤝‍🧑 Gave Them Unto The Levites",
  ],
  "Numbers 31:48-50": [
    "🧾 Thy Servants Have Taken The Sum Of The Men Of War",
    "✅ There Lacketh Not One Man Of Us",
    "💍 We Have Therefore Brought An Oblation For The LORD",
    "🏅 Jewels Of Gold, Chains, And Bracelets",
    "🕊️ To Make An Atonement For Our Souls",
  ],
  "Numbers 31:51-54": [
    "🥇 All Wrought Jewels",
    "⚖️ Sixteen Thousand Seven Hundred And Fifty Shekels",
    "🎁 The Men Of War Had Taken Spoil",
    "🏕️ Brought It Into The Tabernacle Of The Congregation",
    "📌 For A Memorial For The Children Of Israel",
  ],
  "Numbers 32:1-5": [
    "🐄 The Children Of Reuben And The Children Of Gad Had A Very Great Multitude Of Cattle",
    "🗺️ The Place Was A Place For Cattle",
    "🙏 If We Have Found Grace In Thy Sight",
    "🏞️ Let This Land Be Given Unto Thy Servants",
    "🚫 Bring Us Not Over Jordan",
  ],
  "Numbers 32:6-9": [
    "❓ Shall Your Brethren Go To War, And Shall Ye Sit Here",
    "💔 Wherefore Discourage Ye The Heart Of The Children Of Israel",
    "🍇 When I Sent Them From Kadeshbarnea To See The Land",
    "📉 They Discouraged The Heart Of The Children Of Israel",
    "🚫 That They Should Not Go Into The Land",
  ],
  "Numbers 32:10-15": [
    "🔥 The LORD'S Anger Was Kindled",
    "🚫 Surely None Of The Men... Shall See The Land",
    "✅ Save Caleb... And Joshua",
    "🏜️ He Made Them Wander In The Wilderness Forty Years",
    "⚠️ Ye Are Risen Up In Your Fathers' Stead",
  ],
  "Numbers 32:16-19": [
    "🏠 We Will Build Sheepfolds Here For Our Cattle",
    "🏙️ Cities For Our Little Ones",
    "⚔️ We Ourselves Will Go Ready Armed",
    "🏡 Our Little Ones Shall Dwell In The Fenced Cities",
    "🚫 We Will Not Inherit With Them On Yonder Side Jordan",
  ],
  "Numbers 32:20-24": [
    "⚔️ If Ye Will Go Armed Before The LORD To War",
    "🏞️ Until He Hath Driven Out His Enemies",
    "✅ Then Afterward Ye Shall Return, And Be Guiltless",
    "⚠️ But If Ye Will Not Do So",
    "📛 Be Sure Your Sin Will Find You Out",
    "🏗️ Build You Cities For Your Little Ones",
  ],
  "Numbers 32:25-27": [
    "✅ Thy Servants Will Do As My Lord Commandeth",
    "🏙️ Our Little Ones, Our Wives, Our Flocks",
    "🛡️ Shall Be There In The Cities Of Gilead",
    "⚔️ Every Man Armed For War",
    "📛 Before The LORD To Battle",
  ],
  "Numbers 32:28-30": [
    "📣 Moses Commanded Eleazar The Priest",
    "🧭 Joshua The Son Of Nun",
    "🌊 If The Children Of Gad And Reuben Will Pass With You Over Jordan",
    "🏞️ Ye Shall Give Them The Land Of Gilead",
    "⚠️ If They Will Not Pass Over With You Armed",
  ],
  "Numbers 32:31-33": [
    "✅ As The LORD Hath Said Unto Thy Servants, So Will We Do",
    "⚔️ We Will Pass Over Armed Before The LORD",
    "🏞️ Our Inheritance On This Side Jordan",
    "🎁 Moses Gave Unto Them... The Kingdom Of Sihon",
    "👑 The Kingdom Of Og King Of Bashan",
  ],
  "Numbers 32:34-38": [
    "🏙️ The Children Of Gad Built Dibon",
    "🏙️ The Children Of Reuben Built Heshbon",
    "🧱 Fenced Cities",
    "🐑 Folds For Sheep",
    "📛 Gave Other Names Unto The Cities Which They Builded",
  ],
  "Numbers 32:39-42": [
    "⚔️ The Children Of Machir... Went To Gilead",
    "🏞️ Took It",
    "📛 Moses Gave Gilead Unto Machir",
    "🏘️ Nobah Went And Took Kenath",
    "🏷️ Called It Nobah, After His Own Name",
  ],
  "Numbers 33:1-2": [
    "🗺️ These Are The Journeys Of The Children Of Israel",
    "🚪 Which Went Forth Out Of The Land Of Egypt",
    "✍️ Moses Wrote Their Goings Out",
    "📜 According To Their Journeys By The Commandment Of The LORD",
  ],
  "Numbers 33:3-4": [
    "🚪 They Departed From Rameses In The First Month",
    "🩸 On The Morrow After The Passover",
    "💪 With An High Hand",
    "👀 In The Sight Of All The Egyptians",
    "⚰️ The Egyptians Buried All Their Firstborn",
  ],
  "Numbers 33:5-10": [
    "⛺ Removed From Rameses, And Pitched In Succoth",
    "🌊 Passed Through The Midst Of The Sea",
    "🏜️ Went Three Days' Journey In The Wilderness",
    "🌴 Encamped By The Red Sea",
    "💧 Rephidim, Where Was No Water",
  ],
  "Numbers 33:11-15": [
    "🏜️ Removed From The Red Sea",
    "⛺ Pitched In The Wilderness Of Sin",
    "🌴 Encamped In Elim",
    "⛰️ Pitched In The Wilderness Of Sinai",
    "💧 Rephidim, Where Was No Water For The People To Drink",
  ],
  "Numbers 33:16-21": [
    "⛰️ Removed From The Desert Of Sinai",
    "⚰️ Pitched At Kibrothhattaavah",
    "🏕️ Departed From Hazeroth",
    "📍 Pitched In Rithmah",
    "⛰️ Pitched In Mount Hor",
  ],
  "Numbers 33:22-27": [
    "⛺ Removed From Rissah",
    "⛰️ Pitched In Mount Shapher",
    "🏕️ Encamped In Makheloth",
    "📍 Pitched In Tahath",
    "📍 Pitched In Tarah",
  ],
  "Numbers 33:28-33": [
    "⛺ Removed From Tarah",
    "📍 Pitched In Mithcah",
    "📍 Pitched In Hashmonah",
    "📍 Encamped At Moseroth",
    "⛰️ Pitched In Horhagidgad",
  ],
  "Numbers 33:34-37": [
    "📍 Removed From Jotbathah",
    "🏕️ Encamped At Ebronah",
    "🌊 Encamped At Eziongaber",
    "🏜️ Pitched In The Wilderness Of Zin, Which Is Kadesh",
    "⛰️ Pitched In Mount Hor",
  ],
  "Numbers 33:38-39": [
    "👑 Aaron The Priest Went Up Into Mount Hor",
    "📜 At The Commandment Of The LORD",
    "⚰️ Died There",
    "📅 In The Fortieth Year",
    "🔢 Aaron Was An Hundred And Twenty And Three Years Old",
  ],
  "Numbers 33:40-45": [
    "👂 King Arad The Canaanite Heard",
    "🚶 The Children Of Israel Came",
    "📍 From Zalmonah To Punon",
    "🏞️ Pitched By Oboth",
    "📍 From Iim Even Unto Dibongad",
  ],
  "Numbers 33:46-49": [
    "📍 Removed From Dibongad",
    "⛰️ Pitched In The Mountains Of Abarim",
    "🌊 Pitched By Jordan Near Jericho",
    "📍 From Bethjesimoth Even Unto Abelshittim",
  ],
  "Numbers 33:50-53": [
    "📣 The LORD Spake Unto Moses",
    "🌊 When Ye Are Passed Over Jordan",
    "🧹 Drive Out All The Inhabitants Of The Land",
    "🗿 Destroy All Their Pictures",
    "🏞️ Ye Shall Dispossess The Inhabitants Of The Land, And Dwell Therein",
    "🎁 I Have Given You The Land To Possess It",
  ],
  "Numbers 33:55-56": [
    "⚠️ If Ye Will Not Drive Out The Inhabitants",
    "👁️ Pricks In Your Eyes",
    "🌵 Thorns In Your Sides",
    "⚔️ They Shall Vex You In The Land",
    "⚖️ I Shall Do Unto You, As I Thought To Do Unto Them",
  ],
};

const day47NumbersCuratedPhraseTitles: Record<string, string[]> = {
  "Numbers 34:1-2": [
    "📣 The LORD Spake Unto Moses",
    "👥 Command The Children Of Israel",
    "🏞️ When Ye Come Into The Land Of Canaan",
    "🎁 This Is The Land That Shall Fall Unto You For An Inheritance",
    "📐 The Land Of Canaan With The Coasts Thereof",
  ],
  "Numbers 34:3-5": [
    "🧭 Your South Quarter Shall Be From The Wilderness Of Zin",
    "🏜️ Along By The Coast Of Edom",
    "🌊 The Outmost Coast Of The Salt Sea",
    "📍 Your Border Shall Turn From The South To Maalehacrabbim",
    "🌊 The Goings Out Of It Shall Be At The Sea",
  ],
  "Numbers 34:7-9": [
    "⛰️ This Shall Be Your North Border",
    "📍 From The Great Sea Ye Shall Point Out For You Mount Hor",
    "🏙️ From Mount Hor Ye Shall Point Out Your Border Unto Hamath",
    "🏙️ The Goings Forth Of The Border Shall Be To Zedad",
    "🏁 The Goings Out Of It Shall Be At Hazarenan",
  ],
  "Numbers 34:10-12": [
    "🧭 Ye Shall Point Out Your East Border",
    "📍 From Hazarenan To Shepham",
    "🌊 The Border Shall Descend, And Shall Reach Unto The Side Of The Sea Of Chinnereth",
    "🏞️ The Border Shall Go Down To Jordan",
    "📐 This Shall Be Your Land With The Coasts Thereof Round About",
  ],
  "Numbers 34:13-15": [
    "🎲 This Is The Land Which Ye Shall Inherit By Lot",
    "👥 Which The LORD Commanded To Give Unto The Nine Tribes",
    "🌓 To The Half Tribe",
    "🌊 On This Side Jordan Near Jericho Eastward",
  ],
  "Numbers 34:16-19": [
    "📣 The LORD Spake Unto Moses",
    "👑 Eleazar The Priest, And Joshua The Son Of Nun",
    "🧑‍⚖️ One Prince Of Every Tribe",
    "🏞️ To Divide The Land By Inheritance",
    "🦁 Of The Tribe Of Judah, Caleb The Son Of Jephunneh",
  ],
  "Numbers 34:20-25": [
    "🏠 Of The Tribe Of The Children Of Simeon",
    "🏠 Of The Tribe Of Benjamin",
    "🏠 Of The Tribe Of The Children Of Dan",
    "👑 The Prince Of The Children Of Joseph",
    "🏠 For The Tribe Of The Children Of Manasseh",
    "🏠 For The Tribe Of The Children Of Ephraim",
  ],
  "Numbers 34:26-29": [
    "🏠 For The Tribe Of The Children Of Zebulun",
    "🏠 For The Tribe Of The Children Of Issachar",
    "🏠 For The Tribe Of The Children Of Asher",
    "🏠 Of The Tribe Of The Children Of Naphtali",
    "✅ These Are They Whom The LORD Commanded",
    "🏞️ To Divide The Inheritance",
  ],
  "Numbers 35:1-3": [
    "📣 The LORD Spake Unto Moses",
    "🏙️ Give Unto The Levites Cities To Dwell In",
    "🌾 Ye Shall Give Also Unto The Levites Suburbs For The Cities",
    "🐄 The Suburbs Of Them Shall Be For Their Cattle",
    "📦 For Their Goods, And For All Their Beasts",
  ],
  "Numbers 35:4-5": [
    "📏 The Suburbs Of The Cities",
    "📐 A Thousand Cubits Round About",
    "🧭 Ye Shall Measure From Without The City",
    "📏 Two Thousand Cubits",
  ],
  "Numbers 35:6-8": [
    "🏃 Six Cities For Refuge",
    "🩸 For The Manslayer",
    "🏙️ Forty And Two Cities",
    "🔢 All The Cities... Shall Be Forty And Eight Cities",
    "⚖️ From Them That Have Many Ye Shall Give Many",
    "⚖️ From Them That Have Few Ye Shall Give Few",
  ],
  "Numbers 35:9-14": [
    "📣 The LORD Spake Unto Moses",
    "🌊 When Ye Be Come Over Jordan Into The Land Of Canaan",
    "🏃 Appoint You Cities To Be Cities Of Refuge",
    "🩸 The Slayer May Flee Thither",
    "⚖️ Until He Stand Before The Congregation In Judgment",
    "🏙️ Six Cities Shall Ye Have For Refuge",
  ],
  "Numbers 35:15-15": [
    "👥 For The Children Of Israel",
    "🌍 For The Stranger",
    "🚶 For The Sojourner Among Them",
    "🩸 Every One That Killeth Any Person Unawares May Flee Thither",
  ],
  "Numbers 35:16-21": [
    "🪨 If He Smite Him With An Instrument Of Iron",
    "🪵 With An Hand Weapon Of Wood",
    "💢 If He Thrust Him Of Hatred",
    "🎯 Lying In Wait",
    "⚖️ The Murderer Shall Surely Be Put To Death",
    "🩸 The Revenger Of Blood Himself Shall Slay The Murderer",
  ],
  "Numbers 35:22-25": [
    "🚫 Without Enmity",
    "👀 Without Seeing Him",
    "⚖️ The Congregation Shall Judge",
    "🛡️ Deliver The Slayer Out Of The Hand Of The Revenger Of Blood",
    "🏃 The Congregation Shall Restore Him To The City Of His Refuge",
    "👑 Until The Death Of The High Priest",
  ],
  "Numbers 35:26-28": [
    "🚪 If The Slayer Shall At Any Time Come Without The Border",
    "🩸 The Revenger Of Blood Find Him Without The Borders",
    "⚖️ He Shall Not Be Guilty Of Blood",
    "🏙️ He Should Have Remained In The City Of His Refuge",
    "👑 Until The Death Of The High Priest",
  ],
  "Numbers 35:29-30": [
    "📜 These Things Shall Be For A Statute Of Judgment",
    "👥 Throughout Your Generations",
    "⚖️ Whoso Killeth Any Person",
    "👂 By The Mouth Of Witnesses Shall The Murderer Be Put To Death",
    "🚫 One Witness Shall Not Testify Against Any Person",
  ],
  "Numbers 35:31-34": [
    "💰 Ye Shall Take No Satisfaction For The Life Of A Murderer",
    "🚫 Take No Satisfaction For Him That Is Fled To The City Of His Refuge",
    "🩸 Blood It Defileth The Land",
    "🌊 The Land Cannot Be Cleansed Of The Blood",
    "🏕️ Defile Not Therefore The Land Which Ye Shall Inhabit",
    "✨ Wherein I Dwell",
  ],
  "Numbers 36:1-2": [
    "👥 The Chief Fathers Of The Families",
    "👧 The Daughters Of Zelophehad",
    "🏞️ Give The Inheritance Of Zelophehad Our Brother Unto His Daughters",
    "📜 The LORD Commanded My Lord",
  ],
  "Numbers 36:3-4": [
    "💍 If They Be Married To Any Of The Sons Of The Other Tribes",
    "📉 Their Inheritance Shall Be Taken From The Inheritance Of Our Fathers",
    "➕ Shall Be Put To The Inheritance Of The Tribe Whereunto They Are Received",
    "📣 When The Jubile Of The Children Of Israel Shall Be",
  ],
  "Numbers 36:5-6": [
    "📣 Moses Commanded The Children Of Israel",
    "✅ The Tribe Of The Sons Of Joseph Hath Said Well",
    "💍 Let Them Marry To Whom They Think Best",
    "🏠 Only To The Family Of The Tribe Of Their Father",
  ],
  "Numbers 36:7-9": [
    "🔒 Neither Shall The Inheritance Remove From One Tribe To Another",
    "🏠 Every One Of The Children Of Israel Shall Keep Himself To The Inheritance",
    "💍 Every Daughter... Shall Be Wife Unto One Of The Family Of The Tribe Of Her Father",
    "👥 That The Children Of Israel May Enjoy Every Man The Inheritance Of His Fathers",
  ],
  "Numbers 36:10-12": [
    "✅ Even As The LORD Commanded Moses",
    "👧 Mahlah, Tirzah, And Hoglah, And Milcah, And Noah",
    "💍 Were Married Unto Their Father's Brothers' Sons",
    "🏠 Their Inheritance Remained In The Tribe Of The Family Of Their Father",
  ],
};

const day47NumbersSectionTitles: Record<string, string> = {
  "Numbers 34:1-2": "🗺️ The Land Of Canaan",
  "Numbers 34:3-5": "🧭 The South Border",
  "Numbers 34:7-9": "⛰️ The North Border",
  "Numbers 34:10-12": "🌊 The East Border",
  "Numbers 34:13-15": "🎲 Inherited By Lot",
  "Numbers 34:16-19": "👑 Leaders For The Land",
  "Numbers 34:20-25": "🏠 Tribal Leaders Named",
  "Numbers 34:26-29": "✅ Appointed To Divide",
  "Numbers 35:1-3": "🏙️ Cities For The Levites",
  "Numbers 35:4-5": "📏 Measured Suburbs",
  "Numbers 35:6-8": "🏃 Cities Of Refuge",
  "Numbers 35:9-14": "⚖️ Refuge Before Judgment",
  "Numbers 35:15-15": "🌍 Refuge For All Residents",
  "Numbers 35:16-21": "🩸 Murder And Blood Justice",
  "Numbers 35:22-25": "🛡️ Accidental Death And Refuge",
  "Numbers 35:26-28": "🚪 Staying Inside Refuge",
  "Numbers 35:29-30": "👂 Witnesses And Judgment",
  "Numbers 35:31-34": "✨ Blood, Land, And God's Dwelling",
  "Numbers 36:1-2": "👧 Zelophehad's Daughters Again",
  "Numbers 36:3-4": "💍 Marriage And Inheritance",
  "Numbers 36:5-6": "✅ The Tribe Spoke Well",
  "Numbers 36:7-9": "🔒 Inheritance Stays With The Tribe",
  "Numbers 36:10-12": "🏠 The Inheritance Remained",
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getNumbersTwentySixToThirtySixMeaning(title: string, section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) {
    return ["The instruction begins with God's command.", "Israel's inheritance, worship, vows, battles, and boundaries must be ordered by the LORD's word."];
  }
  if (/number|families|twenty years|plague|census|sum|according to their families/.test(lower)) {
    return ["The new generation is being counted before entering the land.", "Numbers is showing that God is still preserving Israel after judgment in the wilderness."];
  }
  if (/inheritance|land|possession|lot|divide|daughters|zelophehad|tribe|border|coast/.test(lower)) {
    return ["The land is treated as God's promised gift to Israel.", "Inheritance must be received and guarded according to the LORD's command, not family pressure or human advantage."];
  }
  if (/joshua|moses|eleazar|leader|shepherd|spirit|charge|before all the congregation/.test(lower)) {
    return ["Leadership is being transferred under God's authority.", "Moses will not enter the land, but the LORD provides Joshua so the congregation is not left without a shepherd."];
  }
  if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram|sabbath|new moon|feast|atonement|trumpets/.test(lower)) {
    return ["Israel's calendar is shaped by worship before the LORD.", "Daily, weekly, monthly, and feast offerings teach that time itself belongs to God."];
  }
  if (/vow|bond|word|father|husband|hold his peace|forgive her/.test(lower)) {
    return ["Words spoken before the LORD carry real weight.", "Vows are not casual promises; households must handle them with truth, authority, and mercy."];
  }
  if (/midian|vengeance|war|phinehas|spoil|prey|tribute|purify/.test(lower)) {
    return ["Israel is dealing with Midian after covenant betrayal.", "The battle, spoil, and purification laws show that judgment and holiness still matter after victory."];
  }
  if (/reuben|gad|half tribe|jordan|cattle|armed|children|wives|cities/.test(lower)) {
    return ["Some tribes want land east of the Jordan.", "Moses requires them to fight with their brothers before settling into their own inheritance."];
  }
  if (/journey|departed|encamped|rameses|succoth|mount hor|plains of moab/.test(lower)) {
    return ["Israel's journey is being remembered stage by stage.", "The route shows that the wilderness years were not random; the LORD carried the people through real places."];
  }
  if (/drive out|inhabitants|images|high places|pricks|thorns/.test(lower)) {
    return ["Israel must remove idolatry from the land.", "The warning is clear: what Israel refuses to confront will become a continuing danger."];
  }
  if (/levites|cities|suburbs|refuge|manslayer|avenger|blood|witness|congregation judge/.test(lower)) {
    return ["The land must include justice and mercy.", "Levite cities and refuge cities teach that worship, life, bloodguilt, and protection all belong under God's law."];
  }
  if (/marry|tribe|daughter|inheritance shall remain|mahlah|tirzah|hoglah|milcah|noah/.test(lower)) {
    return ["The daughters' inheritance must remain within the tribe.", "Numbers closes by protecting both family provision and tribal boundaries in the promised land."];
  }
  if (/children of israel|congregation|families|tribes/.test(lower)) {
    return ["Israel is being treated as a covenant people made of real families and tribes.", "The land will not be received as a vague promise; it will be assigned to households the LORD has preserved."];
  }

  return ["The verse is naming something Israel must handle before entering the land.", `In ${section.reference}, inheritance, worship, justice, and obedience are being ordered under the LORD's command.`];
}

function getNumbersTwentySixToThirtySixBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/number|families|census|twenty years/.test(lower)) return ["📋 Israel is counted by family", "🏕️ A new generation stands ready", "🙌 God preserves His people"];
  if (/inheritance|land|possession|lot|border|coast|tribe/.test(lower)) return ["🏞️ The land is God's gift", "🏠 Families receive real inheritance", "📜 Boundaries follow the LORD's command"];
  if (/joshua|moses|leader|shepherd|charge/.test(lower)) return ["🧭 God provides leadership", "👥 The congregation needs a shepherd", "🙌 Moses' work continues through Joshua"];
  if (/offering|feast|sabbath|trumpets|atonement|lamb|bullock/.test(lower)) return ["🔥 Worship marks Israel's time", "📅 The calendar belongs to God", "🙌 Offerings keep the LORD at the center"];
  if (/vow|word|father|husband|bond/.test(lower)) return ["🗣️ Words before God matter", "🏠 Households carry responsibility", "📜 Promises must be handled truthfully"];
  if (/midian|war|spoil|purify|tribute/.test(lower)) return ["⚔️ Judgment follows covenant betrayal", "🧼 Victory still needs cleansing", "📦 Spoil is handled before the LORD"];
  if (/refuge|manslayer|blood|avenger|witness/.test(lower)) return ["🛡️ Refuge protects life", "⚖️ Justice must be careful", "🩸 Bloodguilt is serious"];

  if (/children of israel|congregation|families|tribes/.test(lower)) return ["👥 Israel is counted as God's people", "🏠 Families matter in the inheritance", "📜 The LORD orders the community"];

  return ["🏞️ Israel is nearing the promised land", "📜 The LORD gives order before entry", "🙌 Obedience must shape the future"];
}

function getNumbers26To36DistinctiveTopic(cleanTitle: string) {
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !["the", "and", "of", "a", "an", "to", "for", "with", "shall", "be", "is", "it", "he", "him", "them", "that", "this", "unto", "upon", "in", "their", "all", "any", "ye", "thy", "by"].includes(word));

  return (words.length <= 6 ? words : words.slice(-4)).join(" ") || "this detail";
}

function getNumbers26To36Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) return ["\u{1F4DC} God's command gives the order", "\u{1F9D4} Moses receives the instruction", "\u{1F3DE}\u{FE0F} Israel is prepared for the land", "\u{1F64C} The future must follow the LORD"];
  if (/number|families|census|twenty years|plague|sum|counted/.test(lower)) return ["\u{1F4CB} Israel is counted by family", "\u{1F3D5}\u{FE0F} A new generation stands ready", "\u{1F64C} God preserves His people", "\u{1F5FA}\u{FE0F} The land is coming into view"];
  if (/inheritance|land|possession|lot|divide|daughters|zelophehad|tribe|border|coast/.test(lower)) return ["\u{1F3DE}\u{FE0F} The land is God's gift", "\u{1F3E0} Families receive real inheritance", "\u{1F4DC} Boundaries follow the LORD's command", "\u{2696}\u{FE0F} Justice protects family provision"];
  if (/joshua|moses|eleazar|leader|shepherd|spirit|charge|congregation/.test(lower)) return ["\u{1F9ED} God provides leadership", "\u{1F465} The congregation needs a shepherd", "\u{1F64C} Moses' work continues through Joshua", "\u{1F4DC} Authority is given before the people"];
  if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram|sabbath|new moon|feast|atonement|trumpets/.test(lower)) return ["\u{1F525} Worship marks Israel's time", "\u{1F4C5} The calendar belongs to God", "\u{1F64C} Offerings keep the LORD at the center", "\u{1F35E} Daily life answers His command"];
  if (/vow|bond|word|father|husband|hold his peace|forgive/.test(lower)) return ["\u{1F5E3}\u{FE0F} Words before God matter", "\u{1F3E0} Households carry responsibility", "\u{1F4DC} Promises must be handled truthfully", "\u{1F64F} Mercy and authority both matter"];
  if (/midian|vengeance|war|phinehas|spoil|prey|tribute|purify/.test(lower)) return ["\u{2694}\u{FE0F} Judgment follows covenant betrayal", "\u{1F9FC} Victory still needs cleansing", "\u{1F4E6} Spoil is handled before the LORD", "\u{26A0}\u{FE0F} Holiness matters after battle"];
  if (/reuben|gad|half tribe|jordan|cattle|armed|children|wives|cities/.test(lower)) return ["\u{1F3DE}\u{FE0F} Land east of Jordan is requested", "\u{2694}\u{FE0F} The tribes must still help their brothers", "\u{1F3E0} Families and cattle need settlement", "\u{1F4DC} Inheritance cannot cancel shared duty"];
  return ["\u{1F3DE}\u{FE0F} Israel is nearing the promised land", "\u{1F4DC} The LORD gives order before entry", "\u{1F9E0} The wording answers a concrete question", "\u{1F64C} Obedience must shape the future"];
}

function getDay45NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/plague|sum|twenty|war|families|family of|reuben|simeon|gad|judah|issachar|zebulun|joseph|manasseh|ephraim|benjamin|dan|asher|naphtali|numbered|thousand|korah|earth opened|fire devoured|died not|jochebed|not a man|surely die/.test(lower)) return ["📋 Israel is counted by family", "🏕️ A new generation stands ready", "⚖️ Judgment is remembered", "🙌 God's promise continues"];
  if (/inheritance|land|lot|possession|many and few|zelophehad|daughters|mahlah|noah|hoglah|milcah|tirzah|no son|statute|judgment|pass unto|stood before|father died|cause before|lord spake unto moses|if a man die/.test(lower)) return ["🏞️ The land is God's gift", "🏠 Families receive real inheritance", "⚖️ Justice protects the vulnerable", "📜 The LORD orders the future"];
  if (/abarim|see the land|gathered|rebelled|moses spake|spirits|set a man|sheep|joshua|spirit|lay thine hand|laid his hands|honour|charge|eleazar|obedient|moses did as/.test(lower)) return ["⛰️ Moses sees the promise from outside", "🧭 Joshua is appointed to lead", "🐑 The congregation needs a shepherd", "📜 Leadership follows God's command"];
  if (/offering|bread|sacrifices|sweet savour|due season|lamb|morning|even|ephah|hin|oil|drink offering|sabbath|month|bullock|ram|goat|atonement|blemish|firstfruits|meat offering|without spot|day by day|two tenth|passover|sacrifice made by fire|after this manner|weeks be out|command the children|burnt offering/.test(lower)) return ["🔥 Worship stays at the center", "📅 Time belongs to the LORD", "🍞 Offerings answer God's provision", "🕊️ Atonement and dedication matter"];
  if (/seventh month|trumpets|tenth day|afflict|souls|servile work|no work|any work|feast|seven days|second day|third day|fourth day|fifth day|sixth day|seventh day|eighth day|solemn assembly|vows|freewill/.test(lower)) return ["🎺 Feasts mark Israel's calendar", "🛑 Rest is part of worship", "🔥 Sacrifice continues through the feast", "🙌 Joy and repentance both belong before God"];

  return ["📋 Israel is being prepared for Canaan", "🏞️ The promise is becoming organized", "📜 God's command gives order", "🙌 The future must belong to the LORD"];
}

function explainDay45NumbersAt95(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/after the plague/.test(lower)) opening = ["The count happens after a deadly judgment in the camp.", "Numbers wants the reader to feel both the loss and the fresh start."];
  else if (/take the sum/.test(lower)) opening = ["Taking the sum means counting the people.", "This census measures the new generation that will receive the land."];
  else if (/twenty years old/.test(lower)) opening = ["Twenty years old and upward marks the adult men counted for Israel's army.", "The people are being prepared for life and battle in Canaan."];
  else if (/able to go to war/.test(lower)) opening = ["Able to go to war means fit for military service.", "The census is connected to entering and defending the promised land."];
  else if (/eldest son/.test(lower)) opening = ["Reuben is named first because he was Jacob's firstborn son.", "The census begins with Israel's family order."];
  else if (/^after their families$/.test(lower)) opening = ["Reuben's descendants are grouped by household lines.", "The promised land will be given to real families, not a nameless crowd."];
  else if (/after their families/.test(lower)) opening = [`${cleanTitle.replace(/ After Their Families/i, "")} is counted by household lines.`, "The promised land will be given to real families, not a nameless crowd."];
  else if (/dathan and abiram/.test(lower)) opening = ["These two men are remembered as rebels with Korah.", "Their names warn the new generation about resisting the LORD's order."];
  else if (/earth opened/.test(lower)) opening = ["The earth opening its mouth recalls the judgment on Korah's rebellion.", "The census remembers that rebellion had real consequences."];
  else if (/fire devoured/.test(lower)) opening = ["The fire devoured the men who joined the rebellion with censers.", "The new generation is counted with that warning still in view."];
  else if (/children of korah$/.test(lower)) opening = ["Korah's descendants are singled out after the rebellion story.", "Their survival shows that the judgment did not erase every child in that line."];
  else if (/children of korah died not/.test(lower)) opening = ["Korah's children did not die with the rebels.", "Judgment was real, but God did not erase the whole family line."];
  else if (/died not/.test(lower) && section.reference === "Numbers 26:11-11") opening = ["Died not means Korah's children were spared from their father's judgment.", "The family line continues even though Korah himself was destroyed."];
  else if (/korah's line/.test(lower)) opening = ["Korah's family line continued after the judgment.", "The detail keeps mercy and warning side by side."];
  else if (/sons of simeon/.test(lower)) opening = ["Simeon's descendants are counted by their family groups.", "Each tribe's place in the new generation is recorded."];
  else if (/nemuelites|zephonites|tolaites|shuthelahites|belaites|shuhamites|jimnites|jahzeelites|gershonites/.test(lower)) {
    const familyName = cleanTitle.match(/The Family Of The (.+)$/)?.[1] || "This family";
    opening = [`${familyName} identify one branch inside the tribe.`, "Numbers counts Israel in households because inheritance will be given through families."];
  }
  else if (/families of the simeonites/.test(lower)) opening = ["Simeon's family groups are summarized before the total.", "The tribe is counted for its place among Israel."];
  else if (/twenty and two thousand/.test(lower)) opening = ["The number gives Simeon's counted strength.", "The tribe's size will matter when land is divided."];
  else if (/children of gad/.test(lower)) opening = ["Gad's descendants are counted by family lines.", "The tribe is part of the new generation preparing for inheritance."];
  else if (/families of the children of gad/.test(lower)) opening = ["Gad's families are gathered into one tribal total.", "The census keeps family identity and tribal identity together."];
  else if (/forty thousand and five hundred/.test(lower)) opening = ["This is Gad's counted total.", "Numbers records the tribe's size for the coming division of the land."];
  else if (/sons of judah were er and onan/.test(lower)) opening = ["Er and Onan are named even though they died earlier.", "Judah's line is counted with its family history remembered."];
  else if (/er and onan died/.test(lower)) opening = ["Er and Onan died in Canaan before this census.", "Their deaths explain why Judah's family line continues through other sons."];
  else if (/shelanites/.test(lower)) opening = ["The Shelanites come from Shelah's line in Judah.", "The census traces Judah through living family branches."];
  else if (/families of judah/.test(lower)) opening = ["Judah's families are summarized before their total.", "The tribe remains large and important in Israel's future."];
  else if (/threescore and sixteen/.test(lower)) opening = ["Threescore and sixteen thousand means seventy-six thousand.", "Judah's large total shows a strong tribe in the new generation."];
  else if (/sons of issachar/.test(lower)) opening = ["Issachar's sons are counted by their family lines.", "The tribe's households are being prepared for inheritance."];
  else if (/families of issachar/.test(lower)) opening = ["Issachar's families are gathered into the tribal count.", "Their identity is preserved before entering the land."];
  else if (/sons of zebulun/.test(lower)) opening = ["Zebulun's descendants are counted after Issachar.", "The census continues tribe by tribe without skipping ordinary families."];
  else if (/threescore thousand/.test(lower)) opening = ["Threescore thousand means sixty thousand.", "The number records Zebulun's counted strength."];
  else if (/sons of joseph/.test(lower)) opening = ["Joseph's descendants are counted through Manasseh and Ephraim.", "Joseph receives a double family presence in Israel's tribes."];
  else if (/manasseh and ephraim/.test(lower)) opening = ["Joseph's two tribal lines are Manasseh and Ephraim.", "Both are counted for their future inheritance."];
  else if (/zelophehad had no sons/.test(lower)) opening = ["Zelophehad had daughters but no sons.", "That detail prepares the inheritance question in the next chapter."];
  else if (/names of the daughters/.test(lower)) opening = ["The daughters are named because their case matters.", "Their names keep the inheritance issue personal and concrete."];
  else if (/mahlah.*noah.*hoglah/.test(lower) && section.reference === "Numbers 26:28-33") opening = ["These five named sisters are Zelophehad's daughters listed in Manasseh's family record.", "Their names matter because their father's line has no sons."];
  else if (/mahlah.*noah.*hoglah/.test(lower) && section.reference === "Numbers 27:1-4") opening = ["These same five sisters now come forward to present their inheritance case.", "The list of names shows they are speaking as a real family, not an abstract issue."];
  else if (/mahlah.*noah.*hoglah/.test(lower)) opening = ["These five named sisters are Zelophehad's daughters.", "They will ask for their father's family name not to disappear."];
  else if (/families of manasseh/.test(lower)) opening = ["Manasseh's families are summarized as a tribe.", "The tribe's count sets up its portion in the land."];
  else if (/fifty and two thousand/.test(lower)) opening = ["This is Manasseh's counted total.", "The number matters because larger tribes receive larger portions."];
  else if (/manasseh's families are counted/.test(lower)) opening = ["Manasseh's household lines are gathered into the census.", "The tribe is being prepared for its place in the land."];
  else if (/manasseh stands/.test(lower)) opening = ["Manasseh is counted as ready for inheritance.", "The tribe will receive land as part of Joseph's line."];
  else if (/these are the sons of ephraim/.test(lower)) opening = ["The sons of Ephraim are now being listed clan by clan.", "Joseph's tribal line is traced through real family branches."];
  else if (/families of the sons of ephraim/.test(lower)) opening = ["These are Ephraim's counted family divisions.", "The census records the tribe by its clans, not just one total number."];
  else if (/sons of ephraim/.test(lower)) opening = ["Ephraim's descendants are counted by family groups.", "Joseph's second tribal line is also preserved."];
  else if (/thirty and two thousand/.test(lower)) opening = ["This is Ephraim's counted total.", "The smaller number still represents a real tribe with a real inheritance."];
  else if (/sons of benjamin/.test(lower)) opening = ["Benjamin's descendants are counted after their families.", "The tribe is preserved in the new generation."];
  else if (/these are the sons of benjamin/.test(lower)) opening = ["Benjamin's family groups are gathered into the tribal record.", "The census keeps the tribe's place clear."];
  else if (/forty and five thousand and six hundred/.test(lower)) opening = ["This is Benjamin's counted total.", "The number records the tribe's strength before Canaan."];
  else if (/forty and five thousand and four hundred/.test(lower)) opening = ["This is Naphtali's counted total.", "The final tribe in the census is also recorded before the land is divided."];
  else if (/forty and five thousand/.test(lower)) opening = ["This is a tribe's counted total.", "The census records tribal strength before Canaan."];
  else if (/sons of dan/.test(lower)) opening = ["Dan's descendants are counted by family.", "The tribe's identity continues into the new generation."];
  else if (/families of dan/.test(lower)) opening = ["Dan's family groups are summarized together.", "Their count prepares for future land assignment."];
  else if (/threescore and four thousand/.test(lower)) opening = ["Threescore and four thousand means sixty-four thousand.", "Dan is counted as one of Israel's larger tribes."];
  else if (/children of asher/.test(lower)) opening = ["Asher's descendants are counted by family groups.", "The tribe is named for its place in the inheritance."];
  else if (/daughter of asher was sarah/.test(lower)) opening = ["Sarah is named as Asher's daughter.", "The census sometimes preserves women by name when their family place matters."];
  else if (/families of the sons of asher/.test(lower)) opening = ["Asher's family lines are gathered into one tribal total.", "The record protects the tribe's identity."];
  else if (/fifty and three thousand/.test(lower)) opening = ["This is Asher's counted total.", "The number will matter when the land is divided."];
  else if (/sons of naphtali/.test(lower)) opening = ["Naphtali's descendants are counted by family groups.", "The final tribal counts continue the same inheritance pattern."];
  else if (/families of naphtali/.test(lower)) opening = ["Naphtali's family groups are summarized together.", "The tribe receives its place among Israel."];
  else if (/forty and five thousand and four hundred/.test(lower)) opening = ["This is Naphtali's counted total.", "The census closes the tribal list with a concrete number."];
  else if (/numbered of the children/.test(lower)) opening = ["The numbered total gathers all the counted fighting men.", "The new generation is now visible as a whole people."];
  else if (/six hundred thousand/.test(lower)) opening = ["The total is just over six hundred thousand.", "God has preserved a full nation after the wilderness deaths."];
  else if (/land shall be divided/.test(lower)) opening = ["The census leads directly to land division.", "The count is not trivia; it prepares each tribe's inheritance."];
  else if (/according to the lot/.test(lower)) opening = ["The lot was a God-directed way to assign land.", "Israel's inheritance will not be grabbed by human preference."];
  else if (/many and few/.test(lower)) opening = ["Many and few refers to larger and smaller tribes.", "The land portions must match the size of the families counted."];
  else if (/numbered of the levites/.test(lower)) opening = ["The Levites are counted separately from the other tribes.", "Their calling is tied to sanctuary service, not ordinary land inheritance."];
  else if (/jochebed/.test(lower)) opening = ["Jochebed is named as the mother of Aaron, Moses, and Miriam.", "The census pauses to remember the family line of Israel's leaders."];
  else if (/amram aaron and moses/.test(lower)) opening = ["Aaron and Moses come from Amram and Jochebed's family.", "The leadership and priesthood are placed inside Israel's real family history."];
  else if (/not numbered among/.test(lower)) opening = ["The Levites are not counted with the fighting men.", "They have a different calling and no normal land inheritance."];
  else if (/moses and eleazar/.test(lower)) opening = ["Moses and Eleazar oversee the count on the plains of Moab.", "The census happens under priestly and prophetic leadership."];
  else if (/not a man of them/.test(lower)) opening = ["None of the earlier counted generation remains among these men.", "The wilderness judgment has fully come to pass."];
  else if (/surely die in the wilderness/.test(lower)) opening = ["God had said the unbelieving generation would die in the wilderness.", "This census proves that His warning was not empty."];
  else if (/save caleb/.test(lower)) opening = ["Save means except.", "Only Caleb and Joshua remain from the earlier adult generation because they trusted the LORD."];
  else if (/daughters of zelophehad speak right/.test(lower)) opening = ["God says Zelophehad's daughters are right.", "Their request agrees with His justice for family inheritance."];
  else if (/daughters of zelophehad/.test(lower)) opening = ["Zelophehad's daughters come forward with an inheritance concern.", "Their courage brings a real family question before Israel's leaders."];
  else if (/mahlah, noah/.test(lower)) opening = ["The sisters are named one by one.", "Their names show this is not an abstract legal issue but a real family."];
  else if (/stood before moses/.test(lower)) opening = ["Standing before Moses means bringing their case publicly to leadership.", "They do not hide the problem or seize land for themselves."];
  else if (/our father died/.test(lower)) opening = ["Their father died in the wilderness with his generation.", "They distinguish his ordinary death from Korah's rebellion."];
  else if (/he had no sons/.test(lower)) opening = ["Having no sons created an inheritance problem in that culture.", "Without a ruling, their father's name could vanish from his tribe."];
  else if (/give unto us/.test(lower)) opening = ["They ask for a possession among their father's brothers.", "The request is about preserving family inheritance in the promised land."];
  else if (/brought their cause/.test(lower)) opening = ["Moses submits their case to the LORD.", "The hard legal question is not answered by impulse."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 27:5-7") opening = ["The LORD answers the inheritance question directly.", "The ruling for Zelophehad's daughters becomes part of Israel's law."];
  else if (/speak right/.test(lower)) opening = ["God says the daughters are right.", "Their request agrees with His justice for family inheritance."];
  else if (/surely give them/.test(lower)) opening = ["God commands that they receive an inheritance.", "The family line is protected even without sons."];
  else if (/if a man die/.test(lower)) opening = ["Death without a son now has a clear inheritance path.", "This case becomes a law for future families."];
  else if (/have no son/.test(lower)) opening = ["No son means no male heir in the usual inheritance path.", "God's law makes sure the family possession does not disappear."];
  else if (/pass unto his daughter/.test(lower)) opening = ["The inheritance passes to the daughter when there is no son.", "The ruling protects the father's name and the daughter's place."];
  else if (/statute of judgment/.test(lower)) opening = ["This becomes a lasting legal rule.", "Zelophehad's daughters become the occasion for a clear inheritance law."];
  else if (/mount abarim/.test(lower)) opening = ["Mount Abarim is where Moses will view the promised land.", "He sees the gift from a distance but will not enter it."];
  else if (/see the land/.test(lower)) opening = ["God lets Moses see the land He is giving Israel.", "The promise is real even though Moses' own role is ending."];
  else if (/gathered unto thy people/.test(lower)) opening = ["Being gathered to his people means Moses will die and join his ancestors.", "His death is near, but God's covenant story continues."];
  else if (/rebelled against my commandment/.test(lower)) opening = ["The rebellion refers to Moses and Aaron at the waters of Meribah.", "Their failure to honor God as holy still has consequences."];
  else if (/moses spake unto the lord/.test(lower)) opening = ["Moses responds by praying for the congregation's future.", "He thinks about the people needing a leader after him."];
  else if (/god of the spirits/.test(lower)) opening = ["The LORD knows every person's life and inner being.", "Moses asks the all-knowing God to choose the right leader."];
  else if (/set a man/.test(lower)) opening = ["Moses asks God to appoint a man over the congregation.", "Leadership must come from the LORD, not from ambition."];
  else if (/not as sheep/.test(lower)) opening = ["Sheep without a shepherd are exposed and directionless.", "Moses does not want Israel left leaderless at the edge of the land."];
  else if (/joshua the son of nun/.test(lower)) opening = ["Joshua is named as Moses' successor.", "The next leader is chosen before Moses dies."];
  else if (/man in whom is the spirit/.test(lower)) opening = ["Joshua is marked as a man with the Spirit.", "Leadership for God's people requires more than skill or courage."];
  else if (/lay thine hand/.test(lower)) opening = ["Laying a hand on Joshua publicly identifies him for leadership.", "The sign shows Moses transferring responsibility before the congregation."];
  else if (/honour upon him/.test(lower)) opening = ["Moses gives Joshua some of his honor.", "The people must recognize Joshua's authority as real."];
  else if (/may be obedient/.test(lower)) opening = ["The congregation needs to obey Joshua's God-given leadership.", "Order is being established before Israel enters the land."];
  else if (/moses did as/.test(lower)) opening = ["Moses follows the LORD's command about Joshua.", "He does not cling to his role when God appoints another leader."];
  else if (/set him before eleazar/.test(lower)) opening = ["Joshua is set before Eleazar the priest.", "The new leader will serve with priestly guidance before the LORD."];
  else if (/laid his hands/.test(lower)) opening = ["The public hand-laying confirms Joshua's new role.", "The visible act shows the transfer of responsibility."];
  else if (/gave him a charge/.test(lower)) opening = ["A charge is a solemn command or responsibility.", "Joshua receives leadership as a duty before God."];
  else if (/command the children/.test(lower)) opening = ["The new generation is commanded to keep bringing the LORD's offerings.", "They must enter the land as worshipers."];
  else if (/my offering.*my bread/.test(lower)) opening = ["God calls the offerings His bread, meaning His appointed altar portion.", "The language shows worship as something owed to Him."];
  else if (/sacrifices made by fire/.test(lower)) opening = ["Sacrifices made by fire are offerings burned on the altar.", "They mark Israel's worship with visible dedication."];
  else if (/sweet savour/.test(lower) && section.reference === "Numbers 28:1-2") opening = ["The pleasing aroma language describes offerings accepted by the LORD.", "Israel's worship is meant to rise before Him in the appointed way."];
  else if (/sweet savour/.test(lower) && section.reference === "Numbers 28:5-8") opening = ["The daily offering is described as pleasing before the LORD.", "Morning and evening worship are not empty routine."];
  else if (/sweet savour/.test(lower) && section.reference === "Numbers 29:12-16") opening = ["The feast offering is also a pleasing aroma to the LORD.", "Festival joy is joined to sacrifice and worship."];
  else if (/sweet savour/.test(lower)) opening = ["A sweet savour is a pleasing aroma before the LORD.", "The phrase pictures worship accepted by God."];
  else if (/due season/.test(lower)) opening = ["Due season means the appointed time.", "Israel must bring worship when God commands, not whenever they prefer."];
  else if (/two lambs/.test(lower) && section.reference === "Numbers 28:3-4") opening = ["Two lambs are required for the daily burnt offering.", "One is offered in the morning and one at evening each day."];
  else if (/two lambs/.test(lower) && section.reference === "Numbers 28:9-10") opening = ["Two lambs are also required for the Sabbath burnt offering.", "The weekly Sabbath adds its own pair beside the daily offering."];
  else if (/two lambs/.test(lower)) opening = ["Two lambs are required for a regular burnt offering.", "The number belongs to God's ordered worship pattern."];
  else if (/day by day/.test(lower)) opening = ["Regular worship happens every day, not only at special feasts.", "Israel's ordinary time is shaped by sacrifice."];
  else if (/continual burnt offering/.test(lower) && section.reference === "Numbers 28:3-4") opening = ["The daily burnt offering is kept before the LORD each morning and evening.", "It teaches steady devotion rather than occasional attention."];
  else if (/continual burnt offering/.test(lower) && section.reference === "Numbers 28:9-10") opening = ["The Sabbath offerings are added beside the daily sacrifice.", "Weekly worship does not cancel the regular burnt offering."];
  else if (/continual burnt offering/.test(lower)) opening = ["The regular burnt offering remains the foundation.", "Special worship is added to daily faithfulness."];
  else if (/one lamb shalt thou offer in the morning/.test(lower)) opening = ["The morning lamb begins the day's regular worship.", "Israel's day opens with an offering to the LORD."];
  else if (/burnt offering of the morning/.test(lower)) opening = ["The morning burnt offering is the regular daily sacrifice already in place.", "Festival sacrifices are added beside it, not instead of it."];
  else if (/morning/.test(lower)) opening = ["Morning marks the beginning portion of the day's worship.", "God orders even the timing of sacrifice."];
  else if (/at even/.test(lower)) opening = ["At even means in the evening.", "The second lamb closes the day with worship."];
  else if (/ephah/.test(lower)) opening = ["An ephah is a dry measure for grain.", "The flour amount shows that even daily offerings are ordered carefully."];
  else if (/hin/.test(lower)) opening = ["A hin is a liquid measure.", "The oil amount is part of the exact offering God commands."];
  else if (/drink offering/.test(lower) && section.reference === "Numbers 28:5-8") opening = ["A drink offering is wine poured out with the daily sacrifice.", "It completes the regular pattern of worship morning and evening."];
  else if (/drink offering/.test(lower) && section.reference === "Numbers 29:39-40") opening = ["Drink offerings are the wine portions added to all these festival sacrifices.", "The closing summary gathers them with the vows and freewill offerings."];
  else if (/drink offering/.test(lower)) opening = ["A drink offering is wine poured out to the LORD.", "It accompanies the sacrifice as part of complete worship."];
  else if (/sabbath day/.test(lower)) opening = ["The Sabbath receives additional offerings.", "Holy rest is marked by worship, not just stopping work."];
  else if (/two tenth deals/.test(lower)) opening = ["The Sabbath flour is measured in exact portions.", "The Sabbath offering has its own ordered grain gift."];
  else if (/beginnings of your months/.test(lower)) opening = ["The beginnings of the months are new moon observances.", "Israel marks each month with worship before the LORD."];
  else if (/two young bullocks/.test(lower) && section.reference === "Numbers 28:11-15") opening = ["Two young bullocks begin the new moon offering.", "The monthly worship is larger than the daily pattern."];
  else if (/two young bullocks/.test(lower) && section.reference === "Numbers 28:19-22") opening = ["Two young bullocks are also required for this feast offering.", "Festival worship repeats the larger sacrificial pattern."];
  else if (/two young bullocks/.test(lower)) opening = ["Young bullocks are young bulls offered in worship.", "The larger offerings include them by God's command."];
  else if (/one ram/.test(lower) && section.reference === "Numbers 28:11-15") opening = ["A ram is added to the new moon offering with the bullocks and lambs.", "The monthly sacrifice has several parts, not one animal only."];
  else if (/one ram/.test(lower) && section.reference === "Numbers 29:35-38") opening = ["One ram belongs to the solemn assembly offering at the close of the feast.", "The final day has a reduced but still complete sacrifice list."];
  else if (/one ram/.test(lower)) opening = ["A ram is a male sheep.", "It is added as part of the commanded worship."];
  else if (/seven lambs/.test(lower) && section.reference === "Numbers 28:11-15") opening = ["Seven lambs complete the new moon offering.", "The monthly sacrifice is fuller than the daily one."];
  else if (/seven lambs/.test(lower) && section.reference === "Numbers 28:19-22") opening = ["Seven lambs also belong to this feast-day offering.", "The repeated number shows a fixed worship pattern for the feast."];
  else if (/seven lambs/.test(lower)) opening = ["Seven lambs complete the larger festival offering.", "The number and quality show ordered dedication before God."];
  else if (/kid of the goats/.test(lower) && section.reference === "Numbers 28:11-15") opening = ["The new month includes a young goat for sin.", "Worship at the start of the month still requires atonement."];
  else if (/kid of the goats/.test(lower) && section.reference === "Numbers 28:19-22") opening = ["The Passover-week offerings include a young goat for sin.", "Celebration does not ignore the need for atonement."];
  else if (/kid of the goats/.test(lower) && section.reference === "Numbers 29:23-25") opening = ["The fourth-day feast offering includes a young goat for sin.", "The repeated feast worship keeps atonement in view."];
  else if (/kid of the goats/.test(lower)) opening = ["A kid of the goats is a young goat.", "It is brought as a sin offering to deal with guilt before God."];
  else if (/fourteenth day/.test(lower)) opening = ["The fourteenth day of the first month is Passover time.", "Israel's calendar remembers the rescue from Egypt."];
  else if (/passover/.test(lower)) opening = ["This feast remembers the night the LORD spared Israel and judged Egypt.", "The new generation must keep remembering its rescue."];
  else if (/unleavened bread/.test(lower)) opening = ["Unleavened bread is bread made without leaven, so it does not rise.", "The feast remembers Israel leaving Egypt in haste."];
  else if (/servile work/.test(lower) && section.reference === "Numbers 28:16-18") opening = ["Servile work is ordinary labor or work service.", "Passover week is set apart for worship instead of normal tasks."];
  else if (/servile work/.test(lower) && section.reference === "Numbers 28:23-25") opening = ["Ordinary work stops again at the close of the feast.", "The holy day keeps worship from being crowded out by labor."];
  else if (/servile work/.test(lower) && section.reference === "Numbers 29:1-6") opening = ["The trumpet day is free from ordinary labor.", "The month begins with worshipful attention to the LORD."];
  else if (/servile work/.test(lower) && section.reference === "Numbers 29:12-16") opening = ["The feast begins with ordinary work set aside.", "Israel gathers for worship instead of treating the day like any other."];
  else if (/servile work/.test(lower) && section.reference === "Numbers 29:35-38") opening = ["The solemn eighth day also stops ordinary work.", "The final gathering is protected for worship."];
  else if (/servile work/.test(lower)) opening = ["Servile work means ordinary labor or work service.", "The feast day is set apart for worship instead of normal tasks."];
  else if (/ye shall offer the burnt offering/.test(lower) && section.reference === "Numbers 28:26-31") opening = ["The firstfruits day includes a burnt offering.", "Harvest gratitude is expressed through worship before the LORD."];
  else if (/ye shall offer a burnt offering/.test(lower) && section.reference === "Numbers 29:1-6") opening = ["The trumpet day includes a burnt offering.", "The holy gathering begins with sacrifice before the LORD."];
  else if (/ye shall offer a burnt offering/.test(lower) && section.reference === "Numbers 29:35-38") opening = ["The solemn eighth day includes its own burnt offering.", "The feast closes with worship, not only dismissal."];
  else if (/burnt offering of the month/.test(lower)) opening = ["The trumpet-day offerings are added beside the new-month offering.", "Special worship does not erase the regular calendar offering."];
  else if (/sacrifice made by fire/.test(lower) && section.reference === "Numbers 28:19-22") opening = ["The Passover-week sacrifice is burned on the altar.", "The feast is celebrated with costly worship before the LORD."];
  else if (/sacrifice made by fire/.test(lower) && section.reference === "Numbers 29:12-16") opening = ["The feast sacrifice is offered by fire before the LORD.", "The celebration includes worship, not only gathering."];
  else if (/sacrifice made by fire/.test(lower) && section.reference === "Numbers 29:35-38") opening = ["The final assembly still includes a sacrifice by fire.", "The feast closes with worship before the LORD."];
  else if (/sacrifice made by fire/.test(lower)) opening = ["A sacrifice made by fire is burned on the altar.", "The feast is celebrated with costly worship before the LORD."];
  else if (/fourteen lambs.*without spot/.test(lower) && section.reference === "Numbers 29:17-19") opening = ["The second-day lambs must be whole and unblemished.", "The feast keeps the quality of the offering high."];
  else if (/fourteen lambs.*without spot/.test(lower) && section.reference === "Numbers 29:26-28") opening = ["The fifth-day lambs are still required without defect.", "Repeated worship must not become careless."];
  else if (/without blemish/.test(lower) && section.reference === "Numbers 28:19-22") opening = ["The Passover-week animals must have no defect.", "The feast offerings must be whole and acceptable to God."];
  else if (/without blemish/.test(lower) && section.reference === "Numbers 29:20-22") opening = ["The third-day lambs must still be without defect.", "Repeated worship does not lower the standard of the offering."];
  else if (/without blemish/.test(lower) && section.reference === "Numbers 29:23-25") opening = ["The fourth-day lambs also have to be whole.", "Every day of the feast keeps the same care before God."];
  else if (/without blemish/.test(lower) && section.reference === "Numbers 29:29-31") opening = ["The sixth-day lambs are required to be without defect.", "The long feast still demands careful worship."];
  else if (/without blemish/.test(lower) && section.reference === "Numbers 29:32-34") opening = ["The seventh-day lambs remain without blemish.", "The closing day of the week keeps the offering pure."];
  else if (/without blemish/.test(lower)) opening = ["Without blemish means without defect.", "The animals offered to God must be whole and acceptable."];
  else if (/make an atonement/.test(lower)) opening = ["Atonement means guilt is covered before God.", "The offering deals with sin so worship can continue rightly."];
  else if (/burnt offering of the morning/.test(lower)) opening = ["The festival offerings do not replace the morning sacrifice.", "Special worship is added to daily faithfulness."];
  else if (/after this manner/.test(lower)) opening = ["This same ordered pattern continues through the feast.", "The offerings are repeated daily according to God's command."];
  else if (/meat of the sacrifice/.test(lower)) opening = ["Meat here means grain, not animal meat.", "The feast includes grain with the sacrifices made by fire."];
  else if (/day of the firstfruits/.test(lower)) opening = ["Firstfruits are the first produce of the harvest.", "Israel brings the beginning of the harvest to the LORD."];
  else if (/new meat offering/.test(lower)) opening = ["A new meat offering means a new grain offering from the harvest.", "The first produce is turned into worship."];
  else if (/weeks be out/.test(lower)) opening = ["The weeks counted from firstfruits have come to completion.", "The calendar ties harvest time to worship."];
  else if (/seventh month/.test(lower) && section.reference === "Numbers 29:1-6") opening = ["The seventh month opens with a trumpet gathering.", "Trumpets, atonement, and the feast all come in this sacred month."];
  else if (/seventh month/.test(lower) && section.reference === "Numbers 29:7-11") opening = ["The seventh month also includes the Day of Atonement.", "The same worship season includes humility as well as celebration."];
  else if (/seventh month/.test(lower) && section.reference === "Numbers 29:12-16") opening = ["The seventh month reaches the seven-day feast.", "Israel's calendar moves from trumpet call to atonement to joyful worship."];
  else if (/seventh month/.test(lower)) opening = ["The seventh month begins a major season of worship.", "Trumpets, atonement, and the feast all come in this sacred month."];
  else if (/blowing the trumpets/.test(lower)) opening = ["The trumpet day calls Israel's attention to the LORD.", "The sound marks the month as holy and summons worship."];
  else if (/tenth day/.test(lower)) opening = ["The tenth day of the seventh month is the Day of Atonement.", "Israel must humble itself while atonement is made."];
  else if (/afflict your souls/.test(lower)) opening = ["Afflict your souls means humble yourselves deeply before God.", "The day is marked by repentance, not ordinary celebration."];
  else if (/not do any work/.test(lower)) opening = ["The Day of Atonement is set apart from normal labor.", "Israel stops ordinary work to attend to atonement."];
  else if (/one goat for a sin offering/.test(lower) && section.reference === "Numbers 29:20-22") opening = ["The third day includes one goat for a sin offering.", "The feast's joy still keeps guilt and cleansing before God."];
  else if (/one goat for a sin offering/.test(lower) && section.reference === "Numbers 29:26-28") opening = ["The fifth day includes one goat for sin.", "Atonement remains part of the feast's repeated worship."];
  else if (/one goat for a sin offering/.test(lower) && section.reference === "Numbers 29:29-31") opening = ["The sixth day again includes one goat for sin.", "Israel's worship keeps returning to the need for mercy."];
  else if (/one goat for a sin offering/.test(lower) && section.reference === "Numbers 29:32-34") opening = ["The seventh day includes one goat for sin as the feast week closes.", "The final day of the main feast still includes atonement."];
  else if (/sin offering of atonement/.test(lower)) opening = ["The sin offering of atonement deals with Israel's guilt before God.", "The extra offerings stand beside this central cleansing work."];
  else if (/fifteenth day/.test(lower)) opening = ["The fifteenth day begins the seven-day feast.", "Israel moves from atonement into extended worship and joy."];
  else if (/feast unto the lord seven days/.test(lower)) opening = ["The feast lasts seven days before the LORD.", "A full week of worship marks God's provision and presence."];
  else if (/thirteen young bullocks/.test(lower)) opening = ["The feast begins with thirteen young bulls.", "The number will decrease each day through the feast."];
  else if (/second day/.test(lower)) opening = ["The second day continues the feast offering pattern.", "The worship does not stop after the opening day."];
  else if (/twelve young bullocks/.test(lower)) opening = ["The second day uses twelve young bulls.", "The decreasing bull count continues in ordered worship."];
  else if (/third day/.test(lower)) opening = ["The third day continues the feast's repeated sacrifices.", "Israel's worship follows God's daily pattern."];
  else if (/eleven bullocks/.test(lower)) opening = ["The third day uses eleven bulls.", "The feast keeps its ordered rhythm before the LORD."];
  else if (/fourth day/.test(lower)) opening = ["The fourth day keeps the feast moving in order.", "Each day has its appointed sacrifice."];
  else if (/ten bullocks/.test(lower)) opening = ["The fourth day uses ten bulls.", "The pattern continues to decrease while worship continues."];
  else if (/fifth day/.test(lower)) opening = ["The fifth day is another appointed day of feast worship.", "Israel keeps bringing offerings according to God's command."];
  else if (/nine bullocks/.test(lower)) opening = ["The fifth day uses nine bulls.", "The repeated count shows careful obedience."];
  else if (/sixth day/.test(lower)) opening = ["The sixth day continues the festival sequence.", "The feast teaches steady worship over time."];
  else if (/eight bullocks/.test(lower)) opening = ["The sixth day uses eight bulls.", "The offering pattern is still exact and intentional."];
  else if (/seventh day/.test(lower)) opening = ["The seventh day completes the seven-day feast cycle.", "Israel keeps worshiping through the full appointed time."];
  else if (/seven bullocks/.test(lower)) opening = ["The seventh day uses seven bulls.", "The count reaches seven as the main feast week closes."];
  else if (/eighth day/.test(lower)) opening = ["The eighth day comes after the seven-day feast.", "It gives Israel a final solemn gathering before returning to normal life."];
  else if (/solemn assembly/.test(lower)) opening = ["A solemn assembly is a sacred gathering.", "The feast ends with the people gathered before the LORD."];
  else if (/one bullock, one ram/.test(lower)) opening = ["The final day's offering is smaller and distinct.", "It marks the solemn close of the feast."];
  else if (/beside your vows/.test(lower)) opening = ["Vows are promised offerings made to the LORD.", "These do not replace the appointed festival sacrifices."];
  else if (/freewill offerings/.test(lower)) opening = ["Freewill offerings are voluntary gifts.", "Israel may give freely, but still keeps the required worship."];
  else if (/for your burnt offerings/.test(lower)) opening = ["Burnt offerings are sacrifices wholly given to God.", "Vows and freewill gifts may include them beyond the regular calendar."];
  else if (/for your drink offerings/.test(lower)) opening = ["Drink offerings are poured out with sacrifices.", "Even extra gifts follow ordered worship before the LORD."];
  else opening = ["This Day 45 phrase needs a direct explanation.", "It belongs to the census, inheritance, Joshua's commissioning, or Israel's worship calendar."];

  return note([
    opening[0],
    opening[1],
    ...getDay45NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function getDay46NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/vow|oath|bond|word|mouth|father|husband|wife|woman|youth|held his peace|disallowed|void|forgive|afflict the soul|iniquity|heads of the tribes|bound her soul/.test(lower)) return ["🗣️ Words before God matter", "🔒 Vows bind the person who speaks", "🏠 Households carry responsibility", "🕊️ The LORD makes room for mercy"];
  if (/midian|war|armed|phinehas|holy instruments|trumpets|slew|balaam|captives|spoil|prey|wroth|counsel|trespass|plague|purify|water of separation|tribute|eleazar|memorial|atonement|lord spake unto moses|every tribe|commanded moses|goodly castles|saved all the women|without the camp|goats' hair|ordinance of the law|abide the fire|abideth not the fire|be clean|all the congregation|victory is handled|sheep|beeves|asses|persons|children of israel's half|one portion of fifty|levites|lacketh not|oblation|jewels|shekels|tabernacle of the congregation/.test(lower)) return ["⚔️ Judgment answers covenant betrayal", "🎺 The battle is fought under holy command", "🧼 Victory still needs cleansing", "🎁 Spoil is handled before the LORD"];
  if (/reuben|gad|cattle|jordan|brethren|war|discourage|kadeshbarnea|caleb|joshua|wilderness forty|sheepfolds|little ones|armed|guiltless|sin will find|gilead|sihon|og|built|cities|machir|nobah|found grace|land be given|not go into the land|anger was kindled|none of the men|driven out|will not do|servants will do|before the lord to battle|lord hath said|took it/.test(lower)) return ["🐄 The request concerns land and livestock", "⚔️ The tribes must still fight with Israel", "🏠 Families need protection", "⚖️ Inheritance cannot cancel shared duty"];
  if (/journeys|rameses|passover|egypt|succoth|sea|wilderness|red sea|rephidim|sinai|kibrothhattaavah|hazeroth|rithmah|mount hor|rissah|shapher|makheloth|tahath|tarah|mithcah|hashmonah|moseroth|horhagidgad|jotbathah|ebronah|eziongaber|kadesh|aaron|fortieth|arad|zalmonah|punon|oboth|dibongad|abarim|jericho|abelshittim|goings out|high hand|elim|commandment of the lord|died there|children of israel came/.test(lower)) return ["🗺️ The journey is remembered stage by stage", "🚪 The LORD brought Israel out of Egypt", "🏜️ Each stop carries wilderness history", "📜 Moses records the road by command"];
  if (/passed over jordan|drive out|inhabitants|pictures|images|high places|dispossess|possess|pricks|thorns|vex|as i thought/.test(lower)) return ["🏞️ The land is a gift to possess", "🧹 Idolatry must be removed", "⚠️ Unremoved enemies become trouble", "📜 The warning prepares Israel for Canaan"];

  return ["📜 Day 46 prepares Israel for life near the land", "⚖️ Obedience matters in words, war, and inheritance", "🏜️ The wilderness road is remembered", "🙌 The LORD keeps ordering His people"];
}

function explainDay46NumbersAt95(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/heads of the tribes/.test(lower)) opening = ["The heads of the tribes are Israel's recognized leaders.", "Moses gives the vow laws through those responsible to guide the people."];
  else if (/man vow a vow/.test(lower)) opening = ["A vow is a serious promise made to the LORD.", "A man who speaks such a promise is responsible to keep it."];
  else if (/bind his soul/.test(lower)) opening = ["Binding the soul means placing oneself under an obligation.", "The oath is not casual speech; it ties the person to what was promised."];
  else if (/not break his word/.test(lower)) opening = ["Breaking his word means failing to do what he promised.", "God's people must treat spoken commitments as weighty."];
  else if (/proceedeth out of his mouth/.test(lower)) opening = ["What proceeds out of the mouth is the promise actually spoken.", "The person must do what he said, not merely what he later wishes he had said."];
  else if (/woman also vow/.test(lower)) opening = ["Women could make vows to the LORD too.", "The law explains how those vows worked inside a father's or husband's household."];
  else if (/bind herself/.test(lower)) opening = ["Binding herself means accepting a serious obligation.", "Her words are treated as real, not dismissed as meaningless."];
  else if (/father's house/.test(lower)) opening = ["Her father's house means she is still under her father's household authority.", "The law deals with vows made while she is young and unmarried."];
  else if (/father hear her vow/.test(lower)) opening = ["The father's response matters when he hears the vow.", "Silence allows it to stand; disallowing it cancels the obligation."];
  else if (/lord shall forgive her/.test(lower) && section.reference === "Numbers 30:3-5") opening = ["The LORD forgives her when a father's refusal cancels the vow of a young unmarried daughter.", "She is released from guilt because the vow is lawfully stopped."];
  else if (/lord shall forgive her/.test(lower) && section.reference === "Numbers 30:10-12") opening = ["The LORD forgives her when a husband annuls his wife's vow after hearing it.", "She is released because the vow does not remain binding under his refusal."];
  else if (/lord shall forgive her/.test(lower)) opening = ["Forgiveness is needed because the vow was spoken before the LORD.", "When the proper authority cancels it, God releases her from guilt."];
  else if (/had at all an husband/.test(lower)) opening = ["A woman who has a husband is under marital household authority in this law.", "The rules now explain how vows work inside a marriage."];
  else if (/bound her soul/.test(lower)) opening = ["Her soul being bound means her vow placed her under obligation.", "The promise affected her life before God."];
  else if (/husband heard/.test(lower)) opening = ["The husband's hearing starts his responsibility.", "His silence or objection determines whether the vow stands."];
  else if (/all her vows shall stand/.test(lower) && section.reference === "Numbers 30:10-12") opening = ["All her vows shall stand means every vow of a widow or divorced woman remains binding.", "No husband is present to cancel what she has spoken."];
  else if (/vows shall stand/.test(lower) && section.reference === "Numbers 30:6-8") opening = ["A vow standing means a married woman's vow remains in force if her husband stays silent.", "His silence counts as allowing it."];
  else if (/vows shall stand/.test(lower)) opening = ["A vow standing means it remains binding.", "If the proper authority does not object, the promise stays in force."];
  else if (/disallowed her/.test(lower)) opening = ["Disallowed means refused or canceled.", "If the husband objects when he hears it, the vow does not continue."];
  else if (/vowed in her husband's house/.test(lower)) opening = ["The vow is made within marriage and household responsibility.", "The law protects both the seriousness of the vow and the order of the household."];
  else if (/held his peace/.test(lower)) opening = ["Held his peace means he stayed silent.", "His silence confirms the vow instead of canceling it."];
  else if (/made them void/.test(lower)) opening = ["Made them void means canceled them.", "The husband can remove the obligation if he acts when he hears it."];
  else if (/every vow.*binding oath/.test(lower)) opening = ["The law covers both vows and binding oaths.", "Any promise that places the person under obligation must be handled truthfully."];
  else if (/afflict the soul/.test(lower)) opening = ["Afflicting the soul means humbling or denying oneself.", "Some vows involved personal self-denial before the LORD."];
  else if (/may establish/.test(lower)) opening = ["Establish means confirm.", "The husband may let the vow stand as binding."];
  else if (/may make it void/.test(lower)) opening = ["Making it void means canceling the vow's obligation.", "The law gives a real way for the household authority to release it."];
  else if (/bear her iniquity/.test(lower)) opening = ["Bearing her iniquity means carrying the guilt connected to the canceled vow.", "If he cancels it too late, the responsibility falls on him."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 31:1-3") opening = ["The LORD commands the Midian judgment through Moses.", "This battle is not private revenge but covenant justice."];
  else if (/avenge.*midianites/.test(lower)) opening = ["Avenge means bring judgment for the harm Midian caused Israel.", "Midian had drawn Israel into Baal-peor's sin."];
  else if (/gathered unto thy people/.test(lower)) opening = ["Moses will die after this final act of judgment.", "His leadership is nearing its end, but obedience is still required."];
  else if (/arm some/.test(lower)) opening = ["Israel must arm men for battle.", "The judgment on Midian will be carried out through selected warriors."];
  else if (/go against the midianites/.test(lower)) opening = ["The warriors are sent specifically against Midian.", "The target is the people who helped lead Israel into covenant betrayal."];
  else if (/every tribe a thousand/.test(lower)) opening = ["Each tribe contributes a thousand men.", "The battle represents all Israel, not one private clan."];
  else if (/^twelve thousand/.test(lower)) opening = ["Twelve thousand warriors are gathered from the tribes.", "The army is limited, ordered, and chosen for this judgment."];
  else if (/phinehas/.test(lower)) opening = ["Phinehas goes with the army as priestly representative.", "The battle is connected to holiness, not merely military strength."];
  else if (/holy instruments/.test(lower)) opening = ["The holy instruments show the battle is carried out before God.", "Israel does not treat this war as ordinary plunder."];
  else if (/trumpets/.test(lower)) opening = ["The trumpets signal holy battle and assembly.", "The same instruments that order the camp now accompany judgment."];
  else if (/warred against the midianites/.test(lower)) opening = ["Israel fights Midian as the LORD commanded.", "The battle answers the earlier sin at Peor."];
  else if (/as the lord commanded/.test(lower) && section.reference === "Numbers 31:7-8") opening = ["The battle against Midian is carried out under the LORD's command.", "Israel is acting in judgment, not private revenge."];
  else if (/as the lord commanded/.test(lower) && section.reference === "Numbers 31:31-31") opening = ["Moses and Eleazar follow the LORD's command in handling the spoil.", "The post-battle division is also governed by obedience."];
  else if (/as the lord commanded/.test(lower)) opening = ["The action follows the LORD's command.", "Obedience, not impulse, is meant to control Israel's response."];
  else if (/slew all the males/.test(lower)) opening = ["The males of Midian are struck down in judgment.", "The scene shows the seriousness of Midian's role in Israel's sin."];
  else if (/kings of midian/.test(lower)) opening = ["Midian's kings are named among the defeated.", "The judgment reaches the leaders of the people."];
  else if (/balaam also.*slew with the sword/.test(lower)) opening = ["Balaam is killed with the sword among Midian's defeated men.", "The man who tried to profit from harming Israel dies under the same judgment."];
  else if (/counsel of balaam/.test(lower)) opening = ["Balaam's counsel had taught Midian how to draw Israel into sin.", "His influence reaches beyond cursing into deliberate spiritual compromise."];
  else if (/balaam/.test(lower)) opening = ["Balaam is killed with the sword.", "The prophet who counseled compromise dies in the judgment that follows it."];
  else if (/women of midian captives/.test(lower)) opening = ["Israel takes Midianite women captive after the battle.", "Moses will confront this because the earlier seduction came through Midian's women."];
  else if (/spoil.*cattle/.test(lower)) opening = ["Spoil means goods taken after victory.", "The cattle and flocks must later be divided under God's order."];
  else if (/burnt all their cities/.test(lower)) opening = ["Burning the cities shows the judgment is not partial.", "Midian's settled strength is broken."];
  else if (/goodly castles/.test(lower)) opening = ["Strong Midianite settlements are destroyed with the cities.", "Even Midian's impressive places do not survive the judgment."];
  else if (/captives.*prey.*spoil/.test(lower)) opening = ["Captives are people taken, prey is living plunder, and spoil is goods.", "All of it must be brought to Moses and handled under command."];
  else if (/moses was wroth/.test(lower)) opening = ["Wroth means angry.", "Moses is angry because the officers spared those tied to Israel's earlier sin."];
  else if (/saved all the women alive/.test(lower)) opening = ["Moses challenges the officers for sparing the women.", "The issue is tied to the way Midian drew Israel into Baal-peor."];
  else if (/commit trespass/.test(lower)) opening = ["Trespass means covenant wrongdoing against the LORD.", "Midian's strategy led Israel into guilt, not merely social compromise."];
  else if (/plague among/.test(lower)) opening = ["The plague came because Israel sinned at Peor.", "Moses connects the battle to that deadly judgment."];
  else if (/kill every male/.test(lower)) opening = ["The command completes the judgment on Midian's future fighting strength.", "It is a hard judgment scene tied to covenant betrayal."];
  else if (/without the camp seven days/.test(lower)) opening = ["Seven days outside the camp are required after battle.", "Contact with death requires purification before returning."];
  else if (/purify both yourselves/.test(lower)) opening = ["Purify means cleanse from ritual uncleanness.", "Both warriors and captives must be cleansed after the battle."];
  else if (/purify all your raiment/.test(lower)) opening = ["Raiment means clothing.", "Even garments touched by battle must go through purification."];
  else if (/goats' hair/.test(lower)) opening = ["Woven goods made from goats' hair also need cleansing.", "Objects from the battle are not automatically clean."];
  else if (/ordinance of the law/.test(lower)) opening = ["Ordinance means a commanded practice.", "Eleazar explains how battle objects must be purified."];
  else if (/abide the fire/.test(lower)) opening = ["Objects that can survive fire are purified by fire.", "Metal objects must pass through judgment-like cleansing before use."];
  else if (/water of separation/.test(lower)) opening = ["Water of separation is cleansing water used for uncleanness.", "Even after fire, purification water is still required."];
  else if (/not the fire.*water|abideth not the fire/.test(lower)) opening = ["Objects that cannot survive fire are cleansed with water.", "God's law distinguishes how different materials are purified."];
  else if (/ye shall be clean/.test(lower)) opening = ["After washing, the warriors may return as clean.", "Purification restores them after contact with death."];
  else if (/take the sum of the prey/.test(lower)) opening = ["The prey must be counted before it is divided.", "Even victory goods are handled with order before the LORD."];
  else if (/divide the prey/.test(lower)) opening = ["The spoil is split into two parts.", "Warriors and the congregation both receive assigned portions."];
  else if (/took the war upon them/.test(lower)) opening = ["These are the men who carried the battle itself.", "Their half recognizes the burden they bore in war."];
  else if (/between all the congregation/.test(lower)) opening = ["The wider congregation receives the other share.", "The victory belongs to all Israel, not only the soldiers."];
  else if (/heave offering/.test(lower)) opening = ["A heave offering is a lifted portion given to the LORD.", "The spoil must honor God before it enriches the people."];
  else if (/moses and eleazar.*commanded/.test(lower)) opening = ["Moses and Eleazar obey the LORD's command for the spoil.", "Priestly and prophetic leadership handle the victory together."];
  else if (/spoil was divided/.test(lower)) opening = ["The spoil is divided by command, not by grabbing.", "Numbers shows victory brought under God's order."];
  else if (/priest and prophet/.test(lower)) opening = ["Eleazar and Moses act together in obedience.", "The priesthood and Moses' leadership both serve the LORD's command."];
  else if (/victory is handled/.test(lower)) opening = ["The battle's success is not treated as lawless gain.", "Even success must be submitted to God's order."];
  else if (/lord's tribute.*sheep/.test(lower)) opening = ["The LORD's tribute of the sheep is the set portion taken from the spoil for Him.", "A small fixed amount is lifted out before the rest is divided."];
  else if (/sheep/.test(lower) && /six hundred/.test(lower)) opening = ["This sheep total records the full number taken as spoil from Midian.", "The count prepares for dividing it between warriors and congregation."];
  else if (/beeves/.test(lower) && section.reference === "Numbers 31:32-37") opening = ["Beeves means cattle in the overall spoil count.", "The animals are being totaled before division."];
  else if (/beeves/.test(lower) && section.reference === "Numbers 31:38-41") opening = ["Here the beeves are the cattle in the divided half of the spoil.", "The total is now being broken down for tribute and allotment."];
  else if (/beeves/.test(lower)) opening = ["Beeves means cattle.", "The cattle are counted because the spoil must be divided carefully."];
  else if (/asses/.test(lower) && section.reference === "Numbers 31:32-37") opening = ["Asses are donkeys included in the full spoil count.", "Working animals are counted along with the rest of the plunder."];
  else if (/asses/.test(lower) && section.reference === "Numbers 31:38-41") opening = ["Here the asses are the donkeys in the divided half of the spoil.", "The total is being reduced to calculate tribute and allotment."];
  else if (/asses/.test(lower)) opening = ["Asses are donkeys.", "Even working animals from the spoil are counted before distribution."];
  else if (/thirty and two thousand persons/.test(lower)) opening = ["The persons are counted as part of what was taken alive.", "The list shows the full scope of the spoil."];
  else if (/lord's tribute/.test(lower)) opening = ["The LORD's tribute is His assigned portion from the spoil.", "Victory must give God His due before anyone enjoys the gain."];
  else if (/persons were sixteen thousand/.test(lower)) opening = ["Sixteen thousand persons are counted in this half of the spoil.", "The tribute portion is calculated from an exact number."];
  else if (/moses gave the tribute/.test(lower)) opening = ["Moses gives the LORD's tribute to Eleazar.", "The priest receives the holy portion from the battle spoil."];
  else if (/children of israel's half/.test(lower)) opening = ["The congregation's half is the share given to the wider people.", "The people who did not fight still receive a commanded portion."];
  else if (/divided from the men/.test(lower)) opening = ["Moses separates the congregation's half from the soldiers' half.", "The division keeps the spoil orderly and fair."];
  else if (/three hundred thousand.*sheep/.test(lower)) opening = ["This large sheep count belongs to the congregation's half.", "The spoil is counted carefully before the Levite portion is taken."];
  else if (/one portion of fifty/.test(lower)) opening = ["One out of fifty is taken from Israel's half.", "That portion supports the Levites who guard the tabernacle."];
  else if (/levites/.test(lower)) opening = ["The Levites receive a portion from the congregation's share.", "Their tabernacle service is supported even after battle."];
  else if (/taken the sum/.test(lower)) opening = ["The officers count the men who returned from battle.", "They discover that none of their soldiers are missing."];
  else if (/lacketh not one man/.test(lower)) opening = ["Every soldier has returned from the battle.", "The officers recognize God's protection in the victory."];
  else if (/oblation/.test(lower)) opening = ["Oblation means an offering brought to the LORD.", "The officers bring gold because every soldier returned alive."];
  else if (/jewels of gold/.test(lower)) opening = ["Gold jewelry becomes a grateful offering.", "The officers turn their battle gain into worship."];
  else if (/atonement for our souls/.test(lower)) opening = ["Atonement means covering guilt before God.", "The gift acknowledges that their lives were preserved by mercy."];
  else if (/wrought jewels/.test(lower)) opening = ["Crafted gold pieces are brought as part of the offering.", "The gift is valuable and intentionally given."];
  else if (/shekels/.test(lower)) opening = ["Shekels measure the weight of the gold.", "The amount records the size of the memorial offering."];
  else if (/men of war had taken spoil/.test(lower)) opening = ["The soldiers had taken spoil in battle.", "Now part of that gain is brought before the LORD."];
  else if (/tabernacle of the congregation/.test(lower)) opening = ["The gold is placed at the tabernacle.", "The offering becomes part of worship, not private display."];
  else if (/memorial/.test(lower)) opening = ["A memorial is something kept to remember.", "This offering remembers the LORD's protection over the warriors."];
  else if (/great multitude of cattle/.test(lower)) opening = ["Reuben and Gad have many livestock.", "Their request begins with the practical need for grazing land."];
  else if (/place for cattle/.test(lower)) opening = ["The land east of Jordan looks good for livestock.", "The tribes see it as useful for their flocks and herds."];
  else if (/found grace/.test(lower)) opening = ["Finding grace means asking for favor.", "They ask Moses for permission rather than seizing the land."];
  else if (/land be given/.test(lower)) opening = ["The tribes ask for this land as their possession.", "The request would place their inheritance east of the Jordan."];
  else if (/bring us not over jordan/.test(lower)) opening = ["They ask not to cross the Jordan for their inheritance.", "That request sounds dangerous because the rest of Israel still must fight."];
  else if (/brethren go to war/.test(lower)) opening = ["Moses asks whether their brothers should fight while they sit safely.", "The request raises the issue of shared responsibility."];
  else if (/discourage ye/.test(lower)) opening = ["Discourage means weaken the heart.", "Moses fears their request will make Israel afraid to enter Canaan."];
  else if (/kadeshbarnea/.test(lower)) opening = ["Kadesh-barnea recalls the earlier spy mission.", "Moses connects this request with the disaster of unbelief."];
  else if (/discouraged the heart/.test(lower)) opening = ["The spies once discouraged Israel from entering the land.", "Moses warns Reuben and Gad not to repeat that failure."];
  else if (/not go into the land/.test(lower)) opening = ["The earlier generation refused to enter the promised land.", "Moses hears an echo of that danger in the new request."];
  else if (/anger was kindled/.test(lower)) opening = ["The LORD's anger burned against the unbelieving generation.", "Moses reminds them how serious refusal became."];
  else if (/none of the men/.test(lower)) opening = ["Those unbelieving adults were barred from seeing the land.", "Their refusal had a generation-long consequence."];
  else if (/save caleb/.test(lower)) opening = ["Save means except.", "Caleb and Joshua were the faithful exceptions who followed the LORD."];
  else if (/wander in the wilderness forty years/.test(lower)) opening = ["The forty years were the sentence for unbelief.", "Moses does not want the new generation dragged back into judgment."];
  else if (/fathers' stead/.test(lower)) opening = ["Rising in their fathers' place means repeating the older generation's sin.", "Moses warns that their choice could harm all Israel."];
  else if (/sheepfolds/.test(lower)) opening = ["Sheepfolds are enclosures for flocks.", "The tribes propose protecting their livestock before going to war."];
  else if (/cities for our little ones/.test(lower)) opening = ["Cities for the little ones means safe settlements for families.", "They want their children protected while the men fight."];
  else if (/ready armed/.test(lower)) opening = ["Ready armed means prepared for battle.", "They promise not to abandon the rest of Israel."];
  else if (/our little ones shall dwell in the fenced cities/.test(lower)) opening = ["Fenced cities are fortified towns where their families can stay protected.", "The men are explaining how their households will be safe while they go to war."];
  else if (/fenced cities/.test(lower)) opening = ["Fortified cities will protect the families left in Gilead.", "The warriors can cross Jordan without leaving households exposed."];
  else if (/not inherit with them/.test(lower)) opening = ["They will not take inheritance west of the Jordan.", "Their portion will be on the east side if they keep their promise."];
  else if (/if ye will go armed before the lord to war/.test(lower)) opening = ["Going armed before the LORD means crossing into battle under God's eye and command.", "Moses accepts their request only if they fight with the rest of Israel first."];
  else if (/we will pass over armed before the lord/.test(lower)) opening = ["This is the tribes' promise that they really will cross armed before the LORD.", "They are repeating the condition Moses laid down."];
  else if (/armed before the lord/.test(lower)) opening = ["Going armed before the LORD means fighting under God's eye and command.", "Their promise is not merely to Moses but before God."];
  else if (/driven out his enemies/.test(lower)) opening = ["The fighting must continue until the LORD's enemies are removed.", "They cannot stop after securing their own families."];
  else if (/return.*guiltless/.test(lower)) opening = ["They may return guiltless only after helping their brothers.", "Their eastern inheritance depends on keeping the commitment."];
  else if (/will not do so/.test(lower)) opening = ["Refusing to keep the promise would be sin.", "Moses makes the condition clear before granting the land."];
  else if (/sin will find you out/.test(lower)) opening = ["Sin finding you out means guilt will expose and overtake them.", "Hidden disobedience will not stay hidden before the LORD."];
  else if (/build you cities/.test(lower)) opening = ["They may build cities for their families and folds for flocks.", "Moses allows settlement only with the battle promise attached."];
  else if (/servants will do/.test(lower)) opening = ["The tribes agree to obey Moses' command.", "They accept the condition tied to their inheritance."];
  else if (/wives.*flocks/.test(lower)) opening = ["Their families and flocks will remain in Gilead.", "The fighting men will leave protected households behind."];
  else if (/cities of gilead/.test(lower)) opening = ["Gilead is the east-Jordan region they want to settle.", "Their families will stay there while the men go to battle."];
  else if (/every man armed/.test(lower)) opening = ["Every fighting man promises to go armed.", "They commit themselves to shared war before enjoying rest."];
  else if (/before the lord to battle/.test(lower)) opening = ["The battle promise is made in the LORD's presence.", "God will hold them accountable for the words they speak."];
  else if (/moses commanded eleazar/.test(lower)) opening = ["Moses gives the agreement to Eleazar and Joshua.", "The next leaders must enforce the promise after Moses is gone."];
  else if (/joshua the son of nun/.test(lower)) opening = ["Joshua is included because he will lead Israel across Jordan.", "The agreement must continue under his leadership."];
  else if (/pass with you over jordan/.test(lower)) opening = ["The tribes must cross Jordan with the rest of Israel.", "Their inheritance is conditional on fighting with their brothers."];
  else if (/land of gilead/.test(lower)) opening = ["Gilead is granted if they keep the battle condition.", "The land gift is tied to faithful action."];
  else if (/not pass over with you armed/.test(lower)) opening = ["If they refuse to cross armed, they lose the special arrangement.", "They would have to receive inheritance among the others in Canaan."];
  else if (/as the lord hath said/.test(lower)) opening = ["The tribes answer by accepting the LORD's word.", "Their promise is framed as obedience, not negotiation only."];
  else if (/pass over armed/.test(lower)) opening = ["They promise to cross armed before the LORD.", "The answer repeats the condition Moses required."];
  else if (/inheritance on this side/.test(lower)) opening = ["Their inheritance will be east of Jordan.", "They accept that their land is separate from the western allotments."];
  else if (/kingdom of sihon/.test(lower)) opening = ["Sihon's former kingdom becomes part of their possession.", "Israel's earlier victory now becomes settled land."];
  else if (/kingdom of og/.test(lower)) opening = ["Og's former kingdom is also included.", "The east-side inheritance comes from victories the LORD gave."];
  else if (/gad built dibon/.test(lower)) opening = ["Gad rebuilds or fortifies Dibon.", "The tribe begins turning conquered territory into settled cities."];
  else if (/reuben built heshbon/.test(lower)) opening = ["Reuben rebuilds Heshbon.", "The city once tied to Sihon becomes part of Israel's settlement."];
  else if (/fenced cities/.test(lower)) opening = ["These rebuilt towns are fortified cities for the tribes settling east of Jordan.", "They are preparing lasting places for family life in Gilead."];
  else if (/folds for sheep/.test(lower)) opening = ["The sheepfolds match the tribes' livestock need.", "Their settlement plan includes care for flocks as well as cities."];
  else if (/other names/.test(lower)) opening = ["Renaming the cities marks new ownership and identity.", "The conquered places are being reshaped under Israel's settlement."];
  else if (/children of machir.*went to gilead/.test(lower)) opening = ["Machir's descendants go to Gilead and capture it.", "This Manassite branch takes land east of Jordan by conquest."];
  else if (/machir/.test(lower)) opening = ["Machir's descendants take Gilead.", "This branch of Manasseh receives a place east of Jordan."];
  else if (/took it/.test(lower)) opening = ["Machir's clan gains control of the region.", "The land becomes part of Israel's east-side possession."];
  else if (/gave gilead/.test(lower)) opening = ["Moses gives Gilead to Machir's line after their conquest.", "Their settlement is confirmed, not merely assumed."];
  else if (/nobah.*kenath/.test(lower)) opening = ["Nobah captures Kenath and its villages.", "The settlement expands through named towns."];
  else if (/after his own name/.test(lower)) opening = ["Naming the place after himself marks possession.", "The captured city receives a new identity under its conqueror."];
  else if (/journeys of the children/.test(lower)) opening = ["The journeys are Israel's recorded stages from Egypt to Moab.", "Numbers pauses to remember the whole wilderness road."];
  else if (/forth out of the land of egypt/.test(lower)) opening = ["The journey began with rescue from Egypt.", "Every later stop is part of the road that started with deliverance."];
  else if (/moses wrote/.test(lower)) opening = ["The stages of travel are recorded by Moses.", "The wilderness years are preserved as commanded history, not forgotten wandering."];
  else if (/according to their journeys by the commandment of the lord/.test(lower)) opening = ["The route is written down because the LORD directed Israel's journeys.", "The travel record is not random history but remembered guidance."];
  else if (/commandment of the lord/.test(lower)) opening = ["The route is written by the LORD's command.", "God wants Israel to remember how He led them."];
  else if (/departed from rameses/.test(lower)) opening = ["Rameses is the starting point of the exodus journey.", "Israel leaves Egypt from a place tied to their bondage."];
  else if (/morrow after the passover/.test(lower)) opening = ["The morrow after Passover means the day after the rescue night.", "Israel's journey begins immediately after the LORD spares them."];
  else if (/high hand/.test(lower)) opening = ["A high hand means bold, open departure.", "Israel leaves Egypt as a delivered people, not as secret fugitives."];
  else if (/sight of all the egyptians/.test(lower)) opening = ["Egypt sees Israel leave openly.", "The exodus is public evidence of the LORD's victory."];
  else if (/buried all their firstborn/.test(lower)) opening = ["Egypt is burying its firstborn while Israel departs.", "The journey begins in the shadow of judgment and deliverance."];
  else if (/rephidim, where was no water for the people to drink/.test(lower)) opening = ["Rephidim is remembered as the place where the people had no water to drink.", "The route list remembers hardship as well as movement."];
  else if (/rephidim.*no water/.test(lower)) opening = ["Rephidim is remembered as a place where the people had no water.", "The route list includes hardship, not only movement."];
  else if (/kibrothhattaavah/.test(lower)) opening = ["Kibrothhattaavah means graves of craving.", "The journey list remembers the place where sinful desire brought judgment."];
  else if (/pitched by oboth/.test(lower)) opening = ["Oboth is one of the later camps near Moab.", "The route is moving closer to the edge of the promised land."];
  else if (/pitched by jordan/.test(lower)) opening = ["The camp by Jordan near Jericho places Israel at Canaan's border.", "The wilderness road is nearly finished."];
  else if (/pitched in mount hor/.test(lower) && section.reference === "Numbers 33:16-21") opening = ["This stage records Israel camping at a place called Mount Hor in the route list.", "The journey record is naming each stop one by one."];
  else if (/pitched in mount hor/.test(lower) && section.reference === "Numbers 33:34-37") opening = ["This later Mount Hor note records the camp near Edom where Aaron's final days unfold.", "The same place-name now carries a more solemn memory in the journey."];
  else if (/removed from|pitched in|pitched at|pitched by|encamped|passed through|went three days|came|from /.test(lower) && section.chapter === 33) opening = [`This stage records ${cleanTitle.toLowerCase()}.`, "The route shows that Israel's wilderness story moved through real places under God's care."];
  else if (/aaron the priest/.test(lower)) opening = ["Aaron goes up Mount Hor near the end of the wilderness years.", "The journey record pauses for the death of Israel's first high priest."];
  else if (/at the commandment of the lord/.test(lower)) opening = ["Aaron goes up the mountain under the LORD's command.", "Even this loss is held inside God's rule over the journey."];
  else if (/commandment of the lord/.test(lower)) opening = ["Aaron's death happens under the LORD's command.", "Even this loss is held inside God's rule over the journey."];
  else if (/died there/.test(lower)) opening = ["Mount Hor becomes the place of Aaron's death.", "The priesthood continues, but Israel loses its first high priest on the road."];
  else if (/fortieth year/.test(lower)) opening = ["The fortieth year marks the end of the wilderness generation.", "Aaron's death comes as Israel nears the land."];
  else if (/hundred and twenty/.test(lower)) opening = ["Aaron is one hundred twenty-three years old when he dies.", "The detail gives weight to the end of his long priestly life."];
  else if (/king arad/.test(lower)) opening = ["King Arad hears of Israel's approach.", "The journey record remembers enemies as well as campsites."];
  else if (/children of israel came/.test(lower)) opening = ["Israel's arrival near Canaan draws attention from local kings.", "The road toward the land is becoming contested."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 33:50-53") opening = ["The LORD now gives instructions for entering Canaan.", "The journey list turns into a command about the land."];
  else if (/passed over jordan/.test(lower)) opening = ["Passing over Jordan means entering Canaan.", "Israel is being told what to do once the river is crossed."];
  else if (/drive out all the inhabitants/.test(lower)) opening = ["Driving out the inhabitants means removing the peoples living in the land when Israel enters Canaan.", "God is commanding a complete clearing of the land from idolatrous nations."];
  else if (/not drive out/.test(lower)) opening = ["If Israel does not drive out the inhabitants, the remaining peoples will become a continuing trouble.", "The warning explains why partial obedience will be dangerous."];
  else if (/drive out/.test(lower)) opening = ["Driving out the inhabitants means removing the peoples living in the land.", "Israel must not blend with Canaan's idolatry."];
  else if (/destroy all their pictures/.test(lower)) opening = ["Pictures are idolatrous images or carved figures.", "The visible tools of false worship must be destroyed."];
  else if (/dispossess/.test(lower)) opening = ["Dispossess means remove someone from possession.", "Israel must take the land God gives instead of leaving Canaanite control in place."];
  else if (/given you the land/.test(lower)) opening = ["The land is given by the LORD.", "Israel's possession rests on God's promise, not mere military power."];
  else if (/pricks in your eyes/.test(lower)) opening = ["Sharp pain in the eyes pictures constant trouble.", "The remaining inhabitants would become a painful snare."];
  else if (/thorns in your sides/.test(lower)) opening = ["Side-piercing thorns picture ongoing hurt and pressure.", "What Israel refuses to remove will keep wounding them."];
  else if (/vex you/.test(lower)) opening = ["Vex means trouble or harass.", "The remaining peoples would keep pressing Israel in the land."];
  else if (/as i thought/.test(lower)) opening = ["God warns that Israel could receive the judgment meant for the Canaanites.", "Disobedience would make them share the danger they were told to remove."];
  else opening = ["This Day 46 phrase needs a direct explanation.", "It belongs to vows, Midian, east-Jordan inheritance, the journey record, or Canaan's warning."];

  return note([
    opening[0],
    opening[1],
    ...getDay46NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function getDay47NumbersSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/refuge|manslayer|slayer|flee|judgment|stranger|sojourner|unawares/.test(lower)) return ["🏃 Refuge protects the accused", "⚖️ Judgment must happen carefully", "🩸 Death is treated seriously", "🌍 The same law guards outsiders"];
  if (/smite|instrument|weapon|hatred|lying in wait|murderer|revenger|blood/.test(lower)) return ["🩸 Murder is named clearly", "⚖️ Justice weighs intent", "👂 Witnesses matter", "🏕️ Bloodguilt affects the land"];
  if (/enmity|seeing|congregation|deliver|restore|border|high priest|not guilty/.test(lower)) return ["🚫 Intent matters", "⚖️ The congregation judges", "🛡️ Refuge restrains revenge", "👑 The high priest's death marks release"];
  if (/satisfaction|defileth|cleansed|defile not|dwell/.test(lower)) return ["💰 Life cannot be bought off", "🩸 Blood pollutes the land", "🌊 Cleansing requires justice", "✨ The LORD dwells among Israel"];
  if (/zelophehad|daughters|married|jubile|sons of joseph|marry|wife|fathers|remained/.test(lower)) return ["👧 The daughters keep their inheritance", "💍 Marriage affects tribal land", "🏠 Family portions are protected", "⚖️ Mercy and order stay together"];
  if (/border|coast|quarter|zin|edom|salt sea|maalehacrabbim|mount hor|hamath|zedad|hazarenan|shepham|chinnereth|jordan|round about/.test(lower)) return ["🧭 The borders are named", "🏞️ The promise becomes mapped land", "📏 Boundaries protect inheritance", "🙌 God gives an ordered place"];
  if (/inherit|inheritance|lot|nine tribes|half tribe|tribe|prince|caleb|divide|commanded/.test(lower)) return ["🎁 The land is received as a gift", "🏠 Tribes get real portions", "⚖️ Leaders divide it publicly", "📜 The LORD orders the inheritance"];
  if (/levites|cities|suburbs|cattle|goods|beasts|cubits|measure/.test(lower)) return ["🏙️ Levites need places to live", "🌾 Space is measured around the cities", "🐄 Animals and goods are included", "📜 Worship servants are provided for"];

  return ["🏞️ Israel is preparing for the land", "📜 The LORD gives ordered commands", "⚖️ Justice protects the people", "🙌 The promise becomes practical"];
}

function explainDay47NumbersAt95(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 34:1-2") opening = ["The land-boundary instructions begin with the LORD speaking to Moses.", "Israel does not invent Canaan's borders for itself."];
  else if (/command the children/.test(lower)) opening = ["Moses must give the command to the whole covenant people.", "The land is for Israel's tribes, so the whole nation must hear how it will be received."];
  else if (/when ye come into the land/.test(lower)) opening = ["Canaan is the land God promised to bring Israel into.", "The phrase points forward from wilderness travel to settled life in the promised place."];
  else if (/shall fall unto you/.test(lower)) opening = ["Fall unto you means be assigned to you.", "Israel's inheritance will come as a received portion, not as land grabbed by force alone."];
  else if (/with the coasts thereof round about/.test(lower)) opening = ["Coasts round about means the border lines on every side.", "The LORD describes Canaan as a complete land with a full outline."];
  else if (/coasts thereof/.test(lower)) opening = ["Coasts here means borders or boundary lines.", "The promise is being described as a real territory with limits."];
  else if (/south quarter/.test(lower)) opening = ["The south quarter is the southern side of the land.", "God begins marking where Israel's inheritance will run along the wilderness edge."];
  else if (/coast of edom/.test(lower)) opening = ["Edom lies along Israel's southern border.", "The boundary keeps Israel's promised land distinct from a neighboring people's land."];
  else if (/outmost coast of the salt sea/.test(lower)) opening = ["The Salt Sea is the Dead Sea.", "Its southern end helps mark the edge of Israel's land."];
  else if (/maalehacrabbim/.test(lower)) opening = ["Maalehacrabbim is a boundary location on the southern line.", "The unfamiliar place name helps trace the land instead of leaving the border vague."];
  else if (/goings out.*sea/.test(lower) && section.reference === "Numbers 34:3-5") opening = ["The border's goings out are its endpoint.", "The southern boundary finishes at the sea after passing the named places."];
  else if (/north border/.test(lower)) opening = ["The north border marks the upper edge of Canaan.", "Israel is being shown that the promised land has ordered limits on every side."];
  else if (/great sea.*mount hor/.test(lower)) opening = ["The Great Sea is the Mediterranean Sea.", "Mount Hor becomes one point used to draw the northern border."];
  else if (/hamath/.test(lower)) opening = ["Hamath is a northern landmark outside Israel's central settlements.", "Naming it helps readers see the border reaching toward the far north."];
  else if (/zedad/.test(lower)) opening = ["Zedad is another marker on the northern boundary.", "The land promise is being traced through actual places."];
  else if (/hazarenan to shepham/.test(lower)) opening = ["Hazar-enan to Shepham begins the eastern boundary line.", "The named places show the border moving from point to point."];
  else if (/hazarenan/.test(lower)) opening = ["Hazar-enan is the endpoint named for the northern or eastern line.", "The border is not left open-ended."];
  else if (/east border/.test(lower)) opening = ["The east border marks the side facing the Jordan valley.", "This completes the land's shape opposite the Great Sea."];
  else if (/chinnereth/.test(lower)) opening = ["Chinnereth is the Sea of Galilee.", "The eastern border reaches the lake before continuing down toward the Jordan."];
  else if (/go down to jordan/.test(lower)) opening = ["Jordan is the river running down Israel's eastern side.", "The border follows the river toward the Salt Sea."];
  else if (/round about/.test(lower) && !/cubits/.test(lower)) opening = ["Round about means all around.", "The LORD gives Israel a complete boundary, not only a loose direction."];
  else if (/inherit by lot/.test(lower)) opening = ["The lot was a God-supervised way to assign tribal portions.", "Israel's land division is not supposed to be controlled by greed or favoritism."];
  else if (/nine tribes/.test(lower)) opening = ["Nine and a half tribes will receive land west of the Jordan.", "Some tribes have already received land on the east side."];
  else if (/half tribe/.test(lower)) opening = ["The half tribe refers to half of Manasseh.", "Part of Manasseh settles east of Jordan while the rest receives land with the western tribes."];
  else if (/this side jordan/.test(lower)) opening = ["This side Jordan means the east side from Moses' viewpoint in Moab.", "Reuben, Gad, and half Manasseh already have their inheritance there."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 34:16-19") opening = ["The LORD names the leaders who will oversee the land division.", "The inheritance will be assigned through recognized servants, not private grabbing."];
  else if (/eleazar.*joshua/.test(lower)) opening = ["Eleazar is the priest, and Joshua is Moses' successor.", "Priestly leadership and national leadership work together as the land is divided."];
  else if (/one prince/.test(lower)) opening = ["Each tribe has one prince, meaning a recognized tribal leader.", "The division includes public representatives from the people."];
  else if (/divide the inheritance/.test(lower)) opening = ["Dividing the inheritance means distributing the assigned tribal portions.", "The leader list ends with the actual job they must carry out."];
  else if (/divide the land/.test(lower)) opening = ["Dividing the land means assigning the promised land to the tribes.", "The gift must become real portions that families can live in and guard."];
  else if (/caleb/.test(lower)) opening = ["Caleb is named first among the tribal leaders for Judah.", "The faithful spy from the earlier generation is still present as the land is assigned."];
  else if (/simeon/.test(lower)) opening = ["Simeon's tribe receives its own representative in the land division.", "Even a smaller or weakened tribe is still counted in the inheritance."];
  else if (/benjamin/.test(lower)) opening = ["Benjamin's tribe is represented by its appointed leader.", "The youngest tribal line is included in the ordered division of Canaan."];
  else if (/children of dan/.test(lower)) opening = ["Dan's tribe has a named representative for the inheritance.", "The land assignment is handled tribe by tribe instead of as a crowd."];
  else if (/children of joseph/.test(lower)) opening = ["Joseph's descendants are represented through Ephraim and Manasseh.", "The double portion promised through Joseph is still visible in the land division."];
  else if (/manasseh/.test(lower)) opening = ["Manasseh has its own leader for receiving land.", "This matters because part of Manasseh is already tied to land east of Jordan."];
  else if (/ephraim/.test(lower)) opening = ["Ephraim has a separate leader for its inheritance.", "Joseph's family line is not blurred into one unnamed group."];
  else if (/zebulun/.test(lower)) opening = ["Zebulun's tribe is named as the leader list continues.", "The land division reaches each tribe in turn."];
  else if (/issachar/.test(lower)) opening = ["Issachar's representative is included among the land-dividing leaders.", "The tribe's place in Canaan is handled under the same public order."];
  else if (/asher/.test(lower)) opening = ["Asher's tribe receives representation for the inheritance.", "Its future portion is protected by the same commanded process."];
  else if (/naphtali/.test(lower)) opening = ["Naphtali's tribe closes the list of appointed representatives.", "The inheritance process includes the northern tribes too."];
  else if (/tribe of the children of|tribe of benjamin|children of joseph|tribe of judah/.test(lower)) opening = ["The tribe name identifies which family group receives representation.", "No tribe's inheritance is treated as an afterthought."];
  else if (/these are they/.test(lower)) opening = ["The list closes by confirming the appointed leaders.", "The land division has named people responsible for carrying it out."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 35:1-3") opening = ["The LORD now gives instructions for the Levites' towns.", "The servants of the tabernacle need places to live among the tribes."];
  else if (/lord spake unto moses/.test(lower) && section.reference === "Numbers 35:9-14") opening = ["The LORD now commands the refuge-city system.", "Israel's land must include places where justice can slow down revenge."];
  else if (/levites cities/.test(lower)) opening = ["The Levites do not receive a normal tribal territory.", "Instead, Israel must give them cities to live in throughout the land."];
  else if (/suburbs of the cities/.test(lower)) opening = ["The open land around each Levite city is measured.", "Israel cannot give the Levites a token space and call it enough."];
  else if (/suburbs/.test(lower) && /cities/.test(lower)) opening = ["Suburbs are open lands around the cities.", "The Levites need space around their towns, not only houses inside the walls."];
  else if (/cattle/.test(lower)) opening = ["The pastureland is for the Levites' animals.", "Their calling is spiritual service, but their daily life still needs practical provision."];
  else if (/goods|beasts/.test(lower)) opening = ["Goods and beasts means possessions and animals.", "God's command provides for the Levites' real household needs."];
  else if (/thousand cubits/.test(lower) && !/two thousand/.test(lower)) opening = ["A cubit is a short ancient measure based roughly on the forearm.", "The first measurement sets a clear space around the Levite city."];
  else if (/measure from without/.test(lower)) opening = ["Measuring from outside the city means the open land begins at the city edge.", "The border of each Levite pasture is made plain."];
  else if (/two thousand cubits/.test(lower)) opening = ["The wider pasture belt around each Levite city is measured at two thousand cubits.", "The Levites receive a clearly assigned area, not undefined leftover space."];
  else if (/six cities for refuge/.test(lower)) opening = ["Refuge cities are safe places for someone accused of killing another person.", "They keep vengeance from happening before the case is judged."];
  else if (/manslayer/.test(lower)) opening = ["A manslayer is someone who has killed a person.", "The law must distinguish accidental killing from murder."];
  else if (/forty and two cities/.test(lower)) opening = ["Forty-two more Levite cities are added beyond the refuge cities.", "The Levites will live spread through Israel's land."];
  else if (/forty and eight/.test(lower)) opening = ["The total number of Levite cities is forty-eight.", "God gives a complete provision for the tribe without ordinary territory."];
  else if (/many ye shall give many/.test(lower)) opening = ["Larger tribes must give more cities.", "Provision for the Levites is shared fairly according to each tribe's inheritance."];
  else if (/few ye shall give few/.test(lower)) opening = ["Smaller tribes give fewer cities.", "The command protects fairness instead of demanding the same amount from unequal tribes."];
  else if (/over jordan/.test(lower)) opening = ["Coming over Jordan means entering Canaan from the east.", "The refuge system is prepared before Israel settles the land."];
  else if (/appoint.*cities.*refuge/.test(lower)) opening = ["Israel must intentionally appoint refuge cities.", "Mercy and justice need planned places, not last-minute confusion."];
  else if (/slayer may flee/.test(lower)) opening = ["Flee thither means run there for safety.", "The accused person can reach protection while the facts are examined."];
  else if (/stand before the congregation/.test(lower)) opening = ["Standing before the congregation means facing public judgment.", "The city protects the person until the case can be heard."];
  else if (/six cities shall ye have/.test(lower)) opening = ["Six refuge cities are spread through Israel's territory.", "Access to justice must be near enough for people to reach."];
  else if (/children of israel/.test(lower) && section.reference === "Numbers 35:15-15") opening = ["The refuge law applies to Israelites.", "Native members of the covenant community are protected by ordered judgment."];
  else if (/stranger/.test(lower)) opening = ["A stranger is a foreigner living among Israel.", "The same refuge protection is not limited to born Israelites."];
  else if (/sojourner/.test(lower)) opening = ["A sojourner is a temporary resident or outsider living in the land.", "God's justice covers vulnerable people who are not tribal landholders."];
  else if (/unawares/.test(lower)) opening = ["Unawares means unintentionally.", "The refuge city is for a killing that was not planned murder."];
  else if (/instrument of iron/.test(lower)) opening = ["An iron object could be a deadly weapon.", "If someone strikes with it and the person dies, the law treats the case as murder."];
  else if (/hand weapon of wood/.test(lower)) opening = ["A wooden weapon can also be deadly.", "The law looks at the result and the weapon, not only the material."];
  else if (/hatred/.test(lower)) opening = ["Hatred points to hostile intent.", "The law separates a violent attack from an accident."];
  else if (/lying in wait/.test(lower)) opening = ["This describes someone hiding and waiting for the chance to attack.", "A killing like that is treated as intentional murder."];
  else if (/murderer shall surely/.test(lower)) opening = ["Surely be put to death means the sentence is certain after guilt is established.", "The law treats intentional murder as a direct attack on life."];
  else if (/deliver.*revenger of blood/.test(lower)) opening = ["The avenger is restrained when the killing was not murder.", "Refuge keeps grief from turning into unlawful revenge."];
  else if (/revenger of blood find him/.test(lower)) opening = ["The avenger finding him outside refuge changes the case.", "The manslayer has stepped beyond the boundary where protection was promised."];
  else if (/revenger of blood/.test(lower)) opening = ["This is the dead person's family representative who pursues justice.", "Even that duty must stay inside God's law rather than becoming private revenge."];
  else if (/without enmity/.test(lower)) opening = ["The death happened without prior hatred between the people involved.", "That detail helps show the case is accidental rather than murderous."];
  else if (/without seeing/.test(lower)) opening = ["The person did not see the other man there before the deadly act happened.", "That detail points to an accident instead of a planned strike."];
  else if (/congregation shall judge/.test(lower)) opening = ["The congregation must judge between the accused person and the avenger.", "The community must weigh the facts before blood is shed."];
  else if (/deliver the slayer/.test(lower)) opening = ["Deliver means protect or rescue from immediate revenge.", "If the killing was not murder, the accused is shielded from the avenger."];
  else if (/restore him/.test(lower)) opening = ["Restore means send him back to the refuge city.", "The person remains protected, but not free to live anywhere he wants."];
  else if (/death of the high priest/.test(lower) && section.reference === "Numbers 35:22-25") opening = ["The high priest's death sets the length of the refuge stay.", "The manslayer's return is tied to priestly order instead of private negotiation."];
  else if (/death of the high priest/.test(lower)) opening = ["Release comes only after the high priest dies.", "Until then, the refuge city remains the manslayer's appointed place of safety."];
  else if (/come without the border/.test(lower)) opening = ["Coming outside the border means leaving the refuge city's protected area.", "The law warns the manslayer not to step outside the place of safety."];
  else if (/find him without the borders/.test(lower)) opening = ["If the avenger finds him outside, the protection no longer applies in the same way.", "The manslayer has left the boundary God gave for safety."];
  else if (/not be guilty of blood/.test(lower)) opening = ["Not guilty of blood means the avenger is not charged with murder in that case.", "The manslayer's safety depended on remaining in refuge."];
  else if (/remained in the city/.test(lower)) opening = ["The manslayer should have stayed in the refuge city.", "Protection was real, but it came with a clear boundary."];
  else if (/statute of judgment/.test(lower)) opening = ["A statute of judgment is a lasting legal rule.", "This refuge law is meant to guide Israel across generations."];
  else if (/throughout your generations/.test(lower)) opening = ["This law is meant to remain in force for Israel's descendants after them.", "It is not limited to the wilderness moment when Moses first gave it."];
  else if (/whoso killeth/.test(lower)) opening = ["Whoso means whoever.", "Any person accused of killing must be handled under this same legal standard."];
  else if (/mouth of witnesses/.test(lower)) opening = ["The mouth of witnesses means testimony from people who saw or knew the facts.", "A murder sentence requires confirmed evidence."];
  else if (/one witness/.test(lower)) opening = ["One witness is not enough for a death sentence.", "God's law guards against careless or false accusation."];
  else if (/take no satisfaction.*murderer/.test(lower)) opening = ["Satisfaction means a payment or settlement.", "A murderer cannot buy his way out of justice."];
  else if (/fled to the city/.test(lower)) opening = ["A manslayer in refuge cannot pay to leave early.", "The protection system must not be turned into a money arrangement."];
  else if (/blood it defileth/.test(lower)) opening = ["Defileth means makes unclean or polluted.", "Unanswered bloodshed stains the land where Israel lives."];
  else if (/land cannot be cleansed/.test(lower)) opening = ["Bloodguilt does not disappear simply because people stay silent about it.", "Only just judgment can answer the pollution caused by murder."];
  else if (/defile not/.test(lower)) opening = ["Israel must not pollute the land with bloodguilt.", "The promised land is holy because the LORD lives among His people."];
  else if (/wherein i dwell/.test(lower)) opening = ["The land matters because the LORD lives among His people there.", "Bloodguilt is serious because it pollutes the place of His dwelling."];
  else if (/chief fathers/.test(lower)) opening = ["These are the leading family heads from the tribe of Manasseh.", "They come forward with a concern about how tribal inheritance will be preserved."];
  else if (/daughters of zelophehad/.test(lower)) opening = ["Zelophehad's daughters had received inheritance because their father had no sons.", "Now the leaders ask how that inheritance stays with the tribe."];
  else if (/give the inheritance/.test(lower)) opening = ["The earlier ruling gave Zelophehad's land to his daughters.", "Numbers now protects that mercy from creating a new tribal problem."];
  else if (/lord commanded my lord/.test(lower)) opening = ["The leaders appeal to the command already given through Moses.", "They are not rejecting the daughters' inheritance; they are asking how to preserve it rightly."];
  else if (/married.*other tribes/.test(lower)) opening = ["Marriage into another tribe could move land with the daughter.", "The concern is that Manasseh's portion might shrink over time."];
  else if (/taken from the inheritance/.test(lower)) opening = ["Their inheritance being taken means land would transfer away from their father's tribe.", "The leaders want family mercy without tribal loss."];
  else if (/put to the inheritance/.test(lower)) opening = ["The land would be added to the tribe of the husband.", "Marriage could change which tribe controlled the family portion."];
  else if (/jubile/.test(lower)) opening = ["Jubilee was the year when land returned to family possession.", "The leaders wonder how that restoration works if the daughters marry outside the tribe."];
  else if (/moses commanded/.test(lower)) opening = ["Moses gives the ruling to Israel by the LORD's command.", "The inheritance question receives public covenant direction."];
  else if (/said well/.test(lower)) opening = ["Hath said well means they have spoken rightly.", "The concern about tribal inheritance is treated as a valid question."];
  else if (/marry to whom they think best/.test(lower)) opening = ["The daughters are allowed to marry whom they choose.", "The ruling does not erase their freedom, but it sets a boundary for inheritance."];
  else if (/family of the tribe/.test(lower) && section.reference === "Numbers 36:5-6") opening = ["They must marry within their father's tribe.", "That keeps the inherited land attached to the family line it was given to."];
  else if (/inheritance remove/.test(lower)) opening = ["The inheritance must not move from one tribe to another.", "God's land order protects each tribe's portion."];
  else if (/keep himself/.test(lower)) opening = ["Each Israelite must keep to the inheritance of his tribe.", "The land gift is guarded as a family and tribal trust."];
  else if (/every daughter/.test(lower)) opening = ["An heiress daughter must marry within her father's tribe.", "The rule preserves both her inheritance and her tribe's land."];
  else if (/enjoy every man/.test(lower)) opening = ["Enjoy means possess and benefit from the inheritance.", "Each family is meant to keep the portion given to its fathers."];
  else if (/even as the lord commanded/.test(lower)) opening = ["The daughters obey the LORD's command through Moses.", "The story closes with the family following the inheritance ruling."];
  else if (/mahlah/.test(lower)) opening = ["The sisters are named again one by one.", "Their obedience is personal, not an abstract legal footnote."];
  else if (/father's brothers' sons/.test(lower)) opening = ["They marry cousins from their father's clan.", "That choice keeps the land inside the family line."];
  else if (/remained in the tribe/.test(lower)) opening = ["The inheritance stays in their father's tribe.", "Numbers closes with mercy for the daughters and protection for the tribe held together."];
  else opening = ["This Day 47 Numbers phrase needs a direct explanation.", "It belongs to land borders, Levite cities, refuge justice, or inheritance protection."];

  return note([
    opening[0],
    opening[1],
    ...getDay47NumbersSupport(cleanTitle),
  ].slice(0, 8));
}

function explainNumbers26To36At95(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], title: string, occurrenceIndex = 0) {
  const cleanTitle = stripLeadingEmoji(title);
  if (section.chapter >= 26 && section.chapter <= 29) return explainDay45NumbersAt95(section, cleanTitle);
  if (section.chapter >= 30 && section.chapter <= 33) return explainDay46NumbersAt95(section, cleanTitle);
  if (section.chapter >= 34 && section.chapter <= 36) return explainDay47NumbersAt95(section, cleanTitle);

  const lower = cleanTitle.toLowerCase();
  let opening: string[];

  if (/lord spake|said unto|commanded moses|as the lord commanded/.test(lower)) opening = ["The instruction begins with the LORD's command.", "Israel's inheritance, worship, leadership, and calendar must be ordered by His word."];
  else if (/number|census|sum|twenty years|families|according to their families/.test(lower)) opening = ["The census counts the new generation by family.", "After wilderness judgment, God is still preserving Israel for the land."];
  else if (/plague/.test(lower)) opening = ["The plague marks the judgment that fell after rebellion.", "The new count happens after loss, showing both consequence and preservation."];
  else if (/inheritance|land|possession|lot|divide|tribe/.test(lower)) opening = ["Inheritance means the land portion given to families and tribes.", "The land is a promised gift, but it must be divided according to the LORD's command."];
  else if (/zelophehad|daughters|mahlah|tirzah|hoglah|milcah|noah/.test(lower)) opening = ["The daughters of Zelophehad ask about family inheritance when there is no son.", "Their case shows God's law protecting a family's place in the promised land."];
  else if (/moses|mount abarim|not go over|gathered unto thy people/.test(lower)) opening = ["Moses is being told he will see the land but not enter it.", "Leadership consequences remain, but God's promise continues."];
  else if (/joshua|spirit|charge|shepherd|eleazar/.test(lower)) opening = ["Joshua is appointed as the next leader under God's authority.", "The congregation will not be left like sheep without a shepherd."];
  else if (/offering|burnt|meat offering|drink offering|lamb|bullock|ram/.test(lower)) opening = ["The offering words describe regular worship before the LORD.", "Daily, weekly, monthly, and feast sacrifices keep Israel's time centered on God."];
  else if (/sabbath|new moon|passover|unleavened|trumpets|atonement|feast/.test(lower)) opening = ["The calendar word names an appointed time for worship.", "Israel's days and seasons belong to the LORD, not merely to work or harvest."];
  else if (/vow|bond|word|father|husband|hold his peace|forgive/.test(lower)) opening = ["A vow was a serious promise spoken before the LORD.", "Numbers treats words as weighty because promises affect households and worship."];
  else if (/midian|vengeance|war|phinehas/.test(lower)) opening = ["The Midian battle follows covenant betrayal at Baal-peor.", "Judgment is handled under God's command, not as private revenge."];
  else if (/spoil|prey|tribute|purify/.test(lower)) opening = ["Spoil and tribute are the goods taken after battle and handled before the LORD.", "Victory does not remove the need for cleansing and ordered obedience."];
  else if (/reuben|gad|half tribe|jordan|cattle|armed/.test(lower)) opening = ["Reuben and Gad request land east of the Jordan.", "Moses requires them to help the other tribes before settling their own families."];
  else if (/children of israel|congregation|families|tribes/.test(lower)) opening = ["Israel is being treated as a covenant people made of real families and tribes.", "The land will be assigned to households the LORD has preserved."];
  else opening = [`This wording names ${getNumbers26To36DistinctiveTopic(cleanTitle)} in Numbers ${section.chapter}.`, "The phrase gives a concrete part of Israel's preparation for inheritance, worship, or leadership."];

  const startsWithTitle = opening[0].toLowerCase().startsWith(cleanTitle.toLowerCase());
  const firstLine = startsWithTitle ? `In ${section.reference}, ${opening[0].charAt(0).toLowerCase()}${opening[0].slice(1)}` : `${opening[0]} Here it applies to ${getNumbers26To36DistinctiveTopic(cleanTitle)} in ${section.reference}.`;
  const occurrenceNote = occurrenceIndex > 0 ? " This repeated wording marks another command or response in the same scene." : "";

  return note([
    `${firstLine}${occurrenceNote}`,
    opening[1],
    ...getNumbers26To36Support(cleanTitle),
  ].slice(0, 8));
}

function makeNumbersTwentySixToThirtySixExplanation(section: (typeof generatedNumbersTwentySixToThirtySixPersonalSections)[number], title: string, occurrenceIndex = 0) {
  return explainNumbers26To36At95(section, title, occurrenceIndex);

  const [lineOne, lineTwo] = getNumbersTwentySixToThirtySixMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getNumbersTwentySixToThirtySixBullets(title),
  ]);
}

export const NUMBERS_26_36_PERSONAL_SECTIONS: PersonalSection[] = generatedNumbersTwentySixToThirtySixPersonalSections.map((section) => ({
  ...section,
  title: day47NumbersSectionTitles[section.reference] || section.title,
  phrases: (() => {
    const seen = new Map<string, number>();
    return (
      day45NumbersCuratedPhraseTitles[section.reference] ||
      day46NumbersCuratedPhraseTitles[section.reference] ||
      day47NumbersCuratedPhraseTitles[section.reference] ||
      section.phrases.map(([title]) => title)
    ).map((title) => {
      const key = stripLeadingEmoji(title).toLowerCase();
      const occurrence = seen.get(key) ?? 0;
      seen.set(key, occurrence + 1);
      return [
        title,
        makeNumbersTwentySixToThirtySixExplanation(section, title, occurrence),
      ] as PersonalPhrase;
    });
  })(),
}));
