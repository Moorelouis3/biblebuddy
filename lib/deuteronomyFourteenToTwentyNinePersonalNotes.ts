import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

type PersonalPhrase = [string, string];
type PersonalSection = (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number] & {
  phrases: PersonalPhrase[];
};

const note = (lines: string[]) => lines.join("\n\n");

const generatedDeuteronomyFourteenToTwentyNinePersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "Thou Shalt Not",
    "Before The LORD",
    "The Place Which The LORD Shall Choose",
    "Justice And Judgment",
    "Keep The Commandments",
    "All The Words Of This Law",
    "Thou Shalt Rejoice Before The LORD",
    "Thou Shalt Not Wrest Judgment",
    "That Which Is Altogether Just",
    "The Stranger And The Fatherless And The Widow",
    "All The Words Of This Covenant",
  ],
});

const day51DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 14:1-2": [
    "👨‍👩‍👧 Ye Are The Children Of The LORD Your God",
    "🚫 Ye Shall Not Cut Yourselves",
    "🚫 Nor Make Any Baldness Between Your Eyes For The Dead",
    "🙏 Thou Art An Holy People Unto The LORD Thy God",
    "💎 The LORD Hath Chosen Thee To Be A Peculiar People",
    "🌍 Above All The Nations That Are Upon The Earth",
  ],
  "Deuteronomy 14:3-8": [
    "🚫 Thou Shalt Not Eat Any Abominable Thing",
    "🐄 Every Beast That Parteth The Hoof, And Cheweth The Cud",
    "🐫 The Camel",
    "🐇 The Hare",
    "🦡 The Coney",
    "🐖 The Swine Is Unclean Unto You",
    "🚫 Ye Shall Not Eat Of Their Flesh",
  ],
  "Deuteronomy 14:9-10": [
    "🐟 All That Have Fins And Scales Shall Ye Eat",
    "🚫 Whatsoever Hath Not Fins And Scales Ye May Not Eat",
    "🧼 It Is Unclean Unto You",
    "🌊 Of All That Are In The Waters",
  ],
  "Deuteronomy 14:11-16": [
    "🐦 Of All Clean Birds Ye Shall Eat",
    "🚫 These Are They Of Which Ye Shall Not Eat",
    "🦅 The Eagle, And The Ossifrage, And The Ospray",
    "🪶 The Glede, And The Kite, And The Vulture After His Kind",
    "🖤 Every Raven After His Kind",
    "🦉 The Owl, And The Night Hawk, And The Cuckow",
  ],
  "Deuteronomy 14:17-20": [
    "🦉 The Little Owl, And The Great Owl, And The Swan",
    "🐦 The Pelican, And The Gier Eagle, And The Cormorant",
    "🪶 The Stork, And The Heron After Her Kind",
    "🦇 The Lapwing, And The Bat",
    "🐜 All Flying Creeping Things Are Unclean Unto You",
    "🐦 But Of All Clean Fowls Ye May Eat",
  ],
  "Deuteronomy 14:21-23": [
    "🚫 Ye Shall Not Eat Of Any Thing That Dieth Of Itself",
    "👥 Thou Shalt Give It Unto The Stranger That Is In Thy Gates",
    "🙏 Thou Art An Holy People Unto The LORD Thy God",
    "🥛 Thou Shalt Not Seethe A Kid In His Mother's Milk",
    "🌾 Thou Shalt Truly Tithe All The Increase Of Thy Seed",
    "🍞 The Tithe Of Thy Corn, Of Thy Wine, And Of Thine Oil",
    "🐑 The Firstlings Of Thy Herds And Of Thy Flocks",
  ],
  "Deuteronomy 14:24-26": [
    "🛣️ If The Way Be Too Long For Thee",
    "📍 If The Place Be Too Far From Thee",
    "💰 Then Shalt Thou Turn It Into Money",
    "✋ And Bind Up The Money In Thine Hand",
    "🐄 For Oxen, Or For Sheep, Or For Wine, Or For Strong Drink",
    "🍽️ Thou Shalt Eat There Before The LORD Thy God",
    "🎉 Thou Shalt Rejoice, Thou, And Thine Household",
  ],
  "Deuteronomy 14:28-29": [
    "📦 Thou Shalt Bring Forth All The Tithe Of Thine Increase The Same Year",
    "🚪 And Shalt Lay It Up Within Thy Gates",
    "🕊️ The Levite, Because He Hath No Part Nor Inheritance With Thee",
    "🤝 The Stranger, And The Fatherless, And The Widow",
    "🍽️ Shall Come, And Shall Eat And Be Satisfied",
    "🙌 That The LORD Thy God May Bless Thee",
  ],
  "Deuteronomy 15:1-2": [
    "📅 At The End Of Every Seven Years Thou Shalt Make A Release",
    "🧾 This Is The Manner Of The Release",
    "🤲 Every Creditor That Lendeth Ought Unto His Neighbour Shall Release It",
    "🚫 He Shall Not Exact It Of His Neighbour, Or Of His Brother",
    "📣 Because It Is Called The LORD'S Release",
  ],
  "Deuteronomy 15:3-6": [
    "🌍 Of A Foreigner Thou Mayest Exact It Again",
    "🤝 Save When There Shall Be No Poor Among You",
    "🎁 The LORD Shall Greatly Bless Thee",
    "👂 Only If Thou Carefully Hearken Unto The Voice Of The LORD Thy God",
    "🏦 Thou Shalt Lend Unto Many Nations, But Thou Shalt Not Borrow",
    "👑 Thou Shalt Reign Over Many Nations",
  ],
  "Deuteronomy 15:7-8": [
    "🫀 Thou Shalt Not Harden Thine Heart",
    "🚫 Nor Shut Thine Hand From Thy Poor Brother",
    "🤲 Thou Shalt Open Thine Hand Wide Unto Him",
    "💵 And Shalt Surely Lend Him Sufficient For His Need",
    "📉 In That Which He Wanteth",
  ],
  "Deuteronomy 15:9-11": [
    "⚠️ Beware That There Be Not A Thought In Thy Wicked Heart",
    "📅 The Seventh Year, The Year Of Release, Is At Hand",
    "👁️ Thine Eye Be Evil Against Thy Poor Brother",
    "🚫 And Thou Givest Him Nought",
    "🗣️ He Cry Unto The LORD Against Thee",
    "🤲 Thou Shalt Surely Give Him",
    "🌍 For The Poor Shall Never Cease Out Of The Land",
  ],
  "Deuteronomy 15:12-15": [
    "⛓️ If Thy Brother, An Hebrew Man, Or An Hebrew Woman, Be Sold Unto Thee",
    "📅 And Serve Thee Six Years",
    "🕊️ In The Seventh Year Thou Shalt Let Him Go Free",
    "🚫 Thou Shalt Not Let Him Go Away Empty",
    "🎁 Thou Shalt Furnish Him Liberally",
    "🧠 Thou Shalt Remember That Thou Wast A Bondman In The Land Of Egypt",
  ],
  "Deuteronomy 15:16-18": [
    "🗣️ If He Say Unto Thee, I Will Not Go Away From Thee",
    "❤️ Because He Loveth Thee And Thine House",
    "📍 Then Thou Shalt Take An Aul",
    "👂 And Thrust It Through His Ear Unto The Door",
    "🤝 He Shall Be Thy Servant For Ever",
    "💸 It Shall Not Seem Hard Unto Thee, When Thou Sendest Him Away Free",
  ],
  "Deuteronomy 15:19-20": [
    "🐑 All The Firstling Males That Come Of Thy Herd And Of Thy Flock",
    "🙏 Thou Shalt Sanctify Unto The LORD Thy God",
    "🚫 Thou Shalt Do No Work With The Firstling Of Thy Bullock",
    "✂️ Nor Shear The Firstling Of Thy Sheep",
    "🍽️ Thou Shalt Eat It Before The LORD Thy God Year By Year",
    "👨‍👩‍👧 Thou And Thy Household",
  ],
  "Deuteronomy 15:21-23": [
    "⚠️ If There Be Any Blemish Therein",
    "🦽 As If It Be Lame, Or Blind",
    "🚫 Thou Shalt Not Sacrifice It Unto The LORD Thy God",
    "👥 The Unclean And The Clean Person Shall Eat It Alike",
    "🦌 As The Roebuck, And As The Hart",
    "🩸 Only Thou Shalt Not Eat The Blood Thereof",
    "🌍 Thou Shalt Pour It Upon The Ground As Water",
  ],
  "Deuteronomy 16:1-2": [
    "📅 Observe The Month Of Abib",
    "🐑 Keep The Passover Unto The LORD Thy God",
    "🌙 In The Month Of Abib The LORD Thy God Brought Thee Forth Out Of Egypt By Night",
    "🔥 Thou Shalt Therefore Sacrifice The Passover Unto The LORD Thy God",
  ],
  "Deuteronomy 16:3-4": [
    "🍞 Thou Shalt Eat No Leavened Bread With It",
    "🫓 Seven Days Shalt Thou Eat Unleavened Bread Therewith",
    "⚖️ Even The Bread Of Affliction",
    "🏃 For Thou Camest Forth Out Of The Land Of Egypt In Haste",
    "🧠 That Thou Mayest Remember The Day When Thou Camest Forth Out Of The Land Of Egypt",
    "🚫 Neither Shall There Any Thing Of The Flesh Remain All Night",
  ],
  "Deuteronomy 16:5-8": [
    "📍 Thou Mayest Not Sacrifice The Passover Within Any Of Thy Gates",
    "🏠 Which The LORD Thy God Giveth Thee",
    "🌇 At The Going Down Of The Sun",
    "🔥 Thou Shalt Roast And Eat It In The Place Which The LORD Thy God Shall Choose",
    "🏕️ Thou Shalt Turn In The Morning, And Go Unto Thy Tents",
    "💤 On The Seventh Day Shall Be A Solemn Assembly To The LORD Thy God",
  ],
  "Deuteronomy 16:9-10": [
    "📆 Seven Weeks Shalt Thou Number Unto Thee",
    "🌾 Begin To Number The Seven Weeks From Such Time As Thou Beginnest To Put The Sickle To The Corn",
    "🎉 Thou Shalt Keep The Feast Of Weeks Unto The LORD Thy God",
    "🤲 A Tribute Of A Freewill Offering Of Thine Hand",
    "🎁 Which Thou Shalt Give Unto The LORD Thy God",
    "🙌 According As The LORD Thy God Hath Blessed Thee",
  ],
  "Deuteronomy 16:11-12": [
    "🎉 Thou Shalt Rejoice Before The LORD Thy God",
    "👨‍👩‍👧 Thou, And Thy Son, And Thy Daughter",
    "👷 And Thy Manservant, And Thy Maidservant",
    "🕊️ And The Levite That Is Within Thy Gates",
    "🤝 And The Stranger, And The Fatherless, And The Widow",
    "🧠 Thou Shalt Remember That Thou Wast A Bondman In Egypt",
  ],
  "Deuteronomy 16:13-15": [
    "⛺ Thou Shalt Observe The Feast Of Tabernacles Seven Days",
    "🌾 After That Thou Hast Gathered In Thy Corn And Thy Wine",
    "🎉 Thou Shalt Rejoice In Thy Feast",
    "👨‍👩‍👧 Thou, And Thy Son, And Thy Daughter",
    "🤝 And The Stranger, And The Fatherless, And The Widow",
    "😊 Therefore Thou Shalt Surely Rejoice",
  ],
  "Deuteronomy 16:16-17": [
    "📍 Three Times In A Year Shall All Thy Males Appear Before The LORD Thy God",
    "🍞 In The Feast Of Unleavened Bread",
    "🌾 And In The Feast Of Weeks",
    "⛺ And In The Feast Of Tabernacles",
    "🚫 They Shall Not Appear Before The LORD Empty",
    "🎁 Every Man Shall Give As He Is Able",
  ],
  "Deuteronomy 16:18-20": [
    "⚖️ Judges And Officers Shalt Thou Make Thee In All Thy Gates",
    "✅ They Shall Judge The People With Just Judgment",
    "🚫 Thou Shalt Not Wrest Judgment",
    "🚫 Thou Shalt Not Respect Persons",
    "🚫 Neither Take A Gift",
    "👁️ A Gift Doth Blind The Eyes Of The Wise",
    "🛤️ That Which Is Altogether Just Shalt Thou Follow",
  ],
  "Deuteronomy 16:21-22": [
    "🌳 Thou Shalt Not Plant Thee A Grove Of Any Trees Near Unto The Altar Of The LORD Thy God",
    "🪵 Which Thou Shalt Make Thee",
    "🪨 Neither Shalt Thou Set Thee Up Any Image",
    "🚫 Which The LORD Thy God Hateth",
  ],
  "Deuteronomy 17:1-3": [
    "🐑 Thou Shalt Not Sacrifice Unto The LORD Thy God Any Bullock, Or Sheep, Wherein Is Blemish",
    "🚫 For That Is An Abomination Unto The LORD Thy God",
    "🔎 If There Be Found Among You Man Or Woman",
    "💔 That Hath Wrought Wickedness In The Sight Of The LORD Thy God",
    "🤝 In Transgressing His Covenant",
    "🕊️ And Hath Gone And Served Other Gods",
    "☀️ Either The Sun, Or Moon, Or Any Of The Host Of Heaven",
  ],
  "Deuteronomy 17:4-7": [
    "👂 It Be Told Thee, And Thou Hast Heard Of It",
    "🔎 And Enquired Diligently",
    "✅ It Be True, And The Thing Certain",
    "🚪 Then Shalt Thou Bring Forth That Man Or That Woman Unto Thy Gates",
    "🪨 And Shalt Stone Them With Stones, Till They Die",
    "🗣️ At The Mouth Of Two Witnesses, Or Three Witnesses",
    "✋ The Hands Of The Witnesses Shall Be First Upon Him",
  ],
  "Deuteronomy 17:8-9": [
    "🩸 Between Blood And Blood",
    "⚖️ Between Plea And Plea, And Between Stroke And Stroke",
    "🚪 Being Matters Of Controversy Within Thy Gates",
    "⬆️ Then Shalt Thou Arise, And Get Thee Up Into The Place Which The LORD Thy God Shall Choose",
    "👨‍⚖️ Thou Shalt Come Unto The Priests The Levites, And Unto The Judge",
  ],
  "Deuteronomy 17:10-13": [
    "📜 Thou Shalt Do According To The Sentence",
    "🚫 Thou Shalt Not Decline From The Sentence",
    "➡️ To The Right Hand, Nor To The Left",
    "😤 The Man That Will Do Presumptuously",
    "⚖️ Even That Man Shall Die",
    "👂 All The People Shall Hear, And Fear",
  ],
  "Deuteronomy 17:14-15": [
    "🏞️ And Shalt Possess It, And Shalt Dwell Therein",
    "👑 I Will Set A King Over Me, Like As All The Nations That Are About Me",
    "✅ Thou Shalt In Any Wise Set Him King Over Thee",
    "👑 Whom The LORD Thy God Shall Choose",
    "🤝 One From Among Thy Brethren Shalt Thou Set King Over Thee",
  ],
  "Deuteronomy 17:16-17": [
    "🐎 He Shall Not Multiply Horses To Himself",
    "↩️ Nor Cause The People To Return To Egypt",
    "💍 Neither Shall He Multiply Wives To Himself",
    "🫀 That His Heart Turn Not Away",
    "💰 Neither Shall He Greatly Multiply To Himself Silver And Gold",
  ],
  "Deuteronomy 17:18-20": [
    "📘 He Shall Write Him A Copy Of This Law In A Book",
    "📖 It Shall Be With Him, And He Shall Read Therein All The Days Of His Life",
    "🙇 That He May Learn To Fear The LORD His God",
    "📜 To Keep All The Words Of This Law And These Statutes, To Do Them",
    "🫀 That His Heart Be Not Lifted Up Above His Brethren",
    "➡️ That He Turn Not Aside From The Commandment",
    "👑 That He May Prolong His Days In His Kingdom",
  ],
};

const day51DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 14:1-2": "👨‍👩‍👧 Holy Children Of The LORD",
  "Deuteronomy 14:3-8": "🐖 Clean Beasts And Unclean Beasts",
  "Deuteronomy 14:9-10": "🐟 Fins And Scales",
  "Deuteronomy 14:11-16": "🐦 Unclean Birds Named",
  "Deuteronomy 14:17-20": "🦇 More Unclean Fowl",
  "Deuteronomy 14:21-23": "🌾 Holy Eating And The Tithe",
  "Deuteronomy 14:24-26": "💰 Turn It Into Money",
  "Deuteronomy 14:28-29": "🚪 The Tithe Within Thy Gates",
  "Deuteronomy 15:1-2": "📅 The LORD'S Release",
  "Deuteronomy 15:3-6": "🤝 No Poor Among You",
  "Deuteronomy 15:7-8": "🤲 Open Thine Hand Wide",
  "Deuteronomy 15:9-11": "⚠️ Beware A Wicked Heart",
  "Deuteronomy 15:12-15": "🕊️ Let Him Go Free",
  "Deuteronomy 15:16-18": "👂 The Servant Who Stays",
  "Deuteronomy 15:19-20": "🐑 Sanctify The Firstlings",
  "Deuteronomy 15:21-23": "⚠️ Blemished Firstlings",
  "Deuteronomy 16:1-2": "📅 Observe The Month Of Abib",
  "Deuteronomy 16:3-4": "🫓 The Bread Of Affliction",
  "Deuteronomy 16:5-8": "📍 Passover At The Chosen Place",
  "Deuteronomy 16:9-10": "🌾 The Feast Of Weeks",
  "Deuteronomy 16:11-12": "🎉 Rejoice Before The LORD",
  "Deuteronomy 16:13-15": "⛺ The Feast Of Tabernacles",
  "Deuteronomy 16:16-17": "🎁 Appear Not Empty",
  "Deuteronomy 16:18-20": "⚖️ Just Judgment In Thy Gates",
  "Deuteronomy 16:21-22": "🚫 No Grove Or Image",
  "Deuteronomy 17:1-3": "🚫 No Blemished Sacrifice Or Idolatry",
  "Deuteronomy 17:4-7": "🪨 Two Or Three Witnesses",
  "Deuteronomy 17:8-9": "👨‍⚖️ Hard Matters Of Judgment",
  "Deuteronomy 17:10-13": "📜 Do According To The Sentence",
  "Deuteronomy 17:14-15": "👑 The King Whom The LORD Chooses",
  "Deuteronomy 17:16-17": "🐎 He Shall Not Multiply",
  "Deuteronomy 17:18-20": "📘 The King Must Read The Law",
};

const day52DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 18:1-2": [
    "🙌 The Priests The Levites",
    "👥 And All The Tribe Of Levi",
    "🚫 Shall Have No Part Nor Inheritance With Israel",
    "📛 The LORD Is Their Inheritance",
    "📜 As He Hath Said Unto Them",
  ],
  "Deuteronomy 18:3-5": [
    "👕 This Shall Be The Priest's Due From The People",
    "🐂 Whether It Be Ox Or Sheep",
    "💪 They Shall Give Unto The Priest The Shoulder",
    "😮 And The Two Cheeks",
    "🫃 And The Maw",
    "🌾 The Firstfruit Also Of Thy Corn, Of Thy Wine, And Of Thine Oil",
    "🐑 And The First Of The Fleece Of Thy Sheep",
  ],
  "Deuteronomy 18:6-8": [
    "🚪 Out Of Any Of Thy Gates",
    "❤️ With All The Desire Of His Mind",
    "🙌 As All His Brethren The Levites Do",
    "💰 Beside That Which Cometh Of The Sale Of His Patrimony",
  ],
  "Deuteronomy 18:9-11": [
    "🚫 Thou Shalt Not Learn To Do After The Abominations Of Those Nations",
    "🔥 That Maketh His Son Or His Daughter To Pass Through The Fire",
    "🔮 Or That Useth Divination",
    "⏳ Or An Observer Of Times",
    "🪄 Or An Enchanter, Or A Witch",
    "🧿 Or A Charmer, Or A Consulter With Familiar Spirits",
    "👻 Or A Wizard, Or A Necromancer",
  ],
  "Deuteronomy 18:12-14": [
    "🤢 All That Do These Things Are An Abomination Unto The LORD",
    "🏃 Because Of These Abominations The LORD Thy God Doth Drive Them Out",
    "✅ Thou Shalt Be Perfect With The LORD Thy God",
    "👂 These Nations Hearkened Unto Observers Of Times And Unto Diviners",
  ],
  "Deuteronomy 18:16-17": [
    "🗣️ Let Me Not Hear Again The Voice Of The LORD My God",
    "🔥 Neither Let Me See This Great Fire Any More",
    "💀 That I Die Not",
    "✅ They Have Well Spoken That Which They Have Spoken",
  ],
  "Deuteronomy 18:18-19": [
    "👤 I Will Raise Them Up A Prophet",
    "🧭 Like Unto Thee",
    "🗣️ I Will Put My Words In His Mouth",
    "⚖️ I Will Require It Of Him",
  ],
  "Deuteronomy 18:21-22": [
    "❤️ If Thou Say In Thine Heart",
    "❓ How Shall We Know The Word Which The LORD Hath Not Spoken",
    "❌ If The Thing Follow Not",
    "⌛ Nor Come To Pass",
    "⚠️ The Prophet Hath Spoken It Presumptuously",
    "🚫 Thou Shalt Not Be Afraid Of Him",
  ],
  "Deuteronomy 19:1-3": [
    "✂️ When The LORD Thy God Hath Cut Off The Nations",
    "🏠 And Dwellest In Their Cities, And In Their Houses",
    "🏙️ Thou Shalt Separate Three Cities For Thee",
    "📏 Thou Shalt Prepare Thee A Way",
    "🧭 Divide The Coasts Of Thy Land Into Three Parts",
    "🛡️ Every Slayer May Flee Thither",
    "🎁 Which The LORD Thy God Giveth Thee To Inherit",
  ],
  "Deuteronomy 19:4-5": [
    "📖 This Is The Case Of The Slayer",
    "🏃 Which Shall Flee Thither",
    "💓 That He May Live",
    "🤝 Whoso Killeth His Neighbour Ignorantly",
    "🚫 Whom He Hated Not In Time Past",
    "🪓 And The Head Slippeth From The Helve",
    "💥 And Lighteth Upon His Neighbour",
  ],
  "Deuteronomy 19:6-7": [
    "🩸 Lest The Avenger Of The Blood Pursue The Slayer",
    "🔥 While His Heart Is Hot",
    "🏃 And Overtake Him, Because The Way Is Long",
    "⚔️ And Slay Him",
    "🚫 Whereas He Was Not Worthy Of Death",
    "🤝 Inasmuch As He Hated Him Not In Time Past",
    "🏙️ Thou Shalt Separate Three Cities For Thee",
  ],
  "Deuteronomy 19:8-10": [
    "📏 If The LORD Thy God Enlarge Thy Coast",
    "📜 As He Hath Sworn Unto Thy Fathers",
    "❤️ To Love The LORD Thy God",
    "🚶 And To Walk Ever In His Ways",
    "🏙️ Then Shalt Thou Add Three Cities More For Thee",
    "🩸 That Innocent Blood Be Not Shed In Thy Land",
    "🚫 That Blood Be Not Upon Thee",
  ],
  "Deuteronomy 19:11-13": [
    "😡 If Any Man Hate His Neighbour",
    "🕵️ And Lie In Wait For Him",
    "⚔️ And Smite Him Mortally That He Die",
    "🏃 And Fleeth Into One Of These Cities",
    "🤝 Then The Elders Of His City Shall Send And Fetch Him Thence",
    "🚫 Thine Eye Shall Not Pity Him",
    "✅ That It May Go Well With Thee",
  ],
  "Deuteronomy 19:16-17": [
    "🗣️ If A False Witness Rise Up Against Any Man",
    "⚖️ To Testify Against Him That Which Is Wrong",
    "👥 Then Both The Men, Between Whom The Controversy Is",
    "🙌 Shall Stand Before The LORD",
    "👨‍⚖️ Before The Priests And The Judges",
  ],
  "Deuteronomy 19:18-19": [
    "🔎 The Judges Shall Make Diligent Inquisition",
    "❌ If The Witness Be A False Witness",
    "🗣️ And Hath Testified Falsely Against His Brother",
    "↩️ Then Shall Ye Do Unto Him",
    "📏 As He Had Thought To Have Done Unto His Brother",
    "🧹 So Shalt Thou Put The Evil Away",
  ],
  "Deuteronomy 19:20-21": [
    "👂 Those Which Remain Shall Hear",
    "😨 And Fear",
    "🚫 And Shall Henceforth Commit No More Any Such Evil",
    "🚫 Thine Eye Shall Not Pity",
    "⚖️ Life Shall Go For Life",
    "🖐️ Eye For Eye, Tooth For Tooth, Hand For Hand, Foot For Foot",
  ],
  "Deuteronomy 20:2-4": [
    "⚔️ When Thou Goest Out To Battle Against Thine Enemies",
    "🐎 Horses, And Chariots, And A People More Than Thou",
    "🚫 Be Not Afraid Of Them",
    "🙌 The LORD Thy God Is With Thee",
    "👤 The Priest Shall Approach And Speak Unto The People",
    "🫀 Let Not Your Hearts Faint",
    "🛡️ The LORD Your God Is He That Goeth With You",
  ],
  "Deuteronomy 20:8-9": [
    "👮 The Officers Shall Speak Further Unto The People",
    "😨 What Man Is There That Is Fearful And Fainthearted",
    "🏠 Let Him Go And Return Unto His House",
    "🪖 The Captains Of The Armies Shall Lead The People",
  ],
  "Deuteronomy 20:10-11": [
    "🕊️ When Thou Comest Nigh Unto A City To Fight Against It",
    "📣 Then Proclaim Peace Unto It",
    "✅ If It Make Thee Answer Of Peace",
    "🚪 And Open Unto Thee",
    "🧱 All The People That Is Found Therein Shall Be Tributaries Unto Thee",
  ],
  "Deuteronomy 20:12-15": [
    "🚫 If It Will Make No Peace With Thee",
    "⚔️ But Will Make War Against Thee",
    "🏰 Then Thou Shalt Besiege It",
    "🗡️ Thou Shalt Smite Every Male Thereof",
    "👩 But The Women, And The Little Ones, And The Cattle",
    "🎁 And All The Spoil Of The City",
    "🌍 Thus Shalt Thou Do Unto All The Cities Which Are Very Far Off",
  ],
  "Deuteronomy 20:16-18": [
    "🏙️ Of The Cities Of These People",
    "🚫 Thou Shalt Save Alive Nothing That Breatheth",
    "🗡️ Thou Shalt Utterly Destroy Them",
    "👥 The Hittites, And The Amorites, And The Canaanites",
    "👥 The Perizzites, The Hivites, And The Jebusites",
    "📜 As The LORD Thy God Hath Commanded Thee",
    "🚫 That They Teach You Not To Do After All Their Abominations",
  ],
  "Deuteronomy 20:19-20": [
    "🌳 When Thou Shalt Besiege A City A Long Time",
    "🪓 Thou Shalt Not Destroy The Trees Thereof",
    "🍎 For Thou Mayest Eat Of Them",
    "❓ For The Tree Of The Field Is Man's Life",
    "🏰 Only The Trees Which Thou Knowest That They Be Not Trees For Meat",
  ],
  "Deuteronomy 21:1-4": [
    "🏞️ If One Be Found Slain In The Land",
    "❓ And It Be Not Known Who Hath Slain Him",
    "📏 Thy Elders And Thy Judges Shall Measure",
    "🏙️ Which City Is Next Unto The Slain Man",
    "🐄 The Elders Of That City Shall Take An Heifer",
    "🚫 Which Hath Not Been Wrought With",
    "🌊 Bring Down The Heifer Unto A Rough Valley",
  ],
  "Deuteronomy 21:5-9": [
    "🙌 The Priests The Sons Of Levi Shall Come Near",
    "🗣️ To Bless In The Name Of The LORD",
    "⚖️ By Their Word Shall Every Controversy And Every Stroke Be Tried",
    "🧼 All The Elders Of That City Shall Wash Their Hands",
    "🚫 Our Hands Have Not Shed This Blood",
    "🙏 Be Merciful, O LORD, Unto Thy People Israel",
    "🧹 So Shalt Thou Put Away The Guilt Of Innocent Blood",
  ],
  "Deuteronomy 21:10-14": [
    "⚔️ When Thou Goest Forth To War Against Thine Enemies",
    "👁️ And Seest Among The Captives A Beautiful Woman",
    "❤️ And Hast A Desire Unto Her",
    "🏠 Then Thou Shalt Bring Her Home To Thine House",
    "💇 She Shall Shave Her Head, And Pare Her Nails",
    "😭 She Shall Bewail Her Father And Her Mother A Full Month",
    "🚪 Thou Shalt Let Her Go Whither She Will",
  ],
  "Deuteronomy 21:15-17": [
    "👨 If A Man Have Two Wives",
    "❤️ One Beloved, And Another Hated",
    "👶 And They Have Born Him Children",
    "1️⃣ If The Firstborn Son Be Hers That Was Hated",
    "🚫 He May Not Make The Son Of The Beloved Firstborn",
    "✅ He Shall Acknowledge The Son Of The Hated For The Firstborn",
    "✌️ By Giving Him A Double Portion Of All That He Hath",
  ],
  "Deuteronomy 21:18-21": [
    "🧒 If A Man Have A Stubborn And Rebellious Son",
    "🚫 Which Will Not Obey The Voice Of His Father Or His Mother",
    "🪵 When They Have Chastened Him",
    "🚫 He Will Not Hearken Unto Them",
    "🏛️ Then Shall His Father And His Mother Lay Hold On Him",
    "🚪 Bring Him Out Unto The Elders Of His City",
    "🍷 He Is A Glutton, And A Drunkard",
  ],
  "Deuteronomy 21:22-23": [
    "⚖️ If A Man Have Committed A Sin Worthy Of Death",
    "🪵 And Thou Hang Him On A Tree",
    "🌙 His Body Shall Not Remain All Night Upon The Tree",
    "🪦 Thou Shalt In Any Wise Bury Him That Day",
    "💀 He That Is Hanged Is Accursed Of God",
    "🚫 That Thy Land Be Not Defiled",
    "🎁 Which The LORD Thy God Giveth Thee For An Inheritance",
  ],
};

const day52DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 18:1-2": "🙌 The Levites Have No Land Inheritance",
  "Deuteronomy 18:3-5": "👕 The Priest's Due",
  "Deuteronomy 18:6-8": "🚪 A Levite May Come Serve",
  "Deuteronomy 18:9-11": "🚫 No Occult Practices",
  "Deuteronomy 18:12-14": "✅ Perfect With The LORD",
  "Deuteronomy 18:16-17": "🔥 The People Feared The Fire",
  "Deuteronomy 18:18-19": "👤 A Prophet Like Moses",
  "Deuteronomy 18:21-22": "⚠️ Testing A Prophet",
  "Deuteronomy 19:1-3": "🏙️ Separate Three Cities",
  "Deuteronomy 19:4-5": "🪓 The Case Of The Slayer",
  "Deuteronomy 19:6-7": "🩸 The Avenger Of Blood",
  "Deuteronomy 19:8-10": "📏 Add Three Cities More",
  "Deuteronomy 19:11-13": "⚔️ The Murderer Must Not Stay There",
  "Deuteronomy 19:16-17": "🗣️ Both Men Shall Stand Before The LORD",
  "Deuteronomy 19:18-19": "🔎 False Witness Punished",
  "Deuteronomy 19:20-21": "⚖️ Life For Life",
  "Deuteronomy 20:2-4": "🛡️ Fear Not In Battle",
  "Deuteronomy 20:8-9": "👮 The Fearful May Return Home",
  "Deuteronomy 20:10-11": "🕊️ Proclaim Peace First",
  "Deuteronomy 20:12-15": "🏰 If It Make No Peace",
  "Deuteronomy 20:16-18": "🗡️ Save Alive Nothing That Breatheth",
  "Deuteronomy 20:19-20": "🌳 Do Not Destroy The Fruit Trees",
  "Deuteronomy 21:1-4": "🏞️ A Slain Man In The Field",
  "Deuteronomy 21:5-9": "🧼 Wash Their Hands Over The Heifer",
  "Deuteronomy 21:10-14": "💇 The Captive Woman",
  "Deuteronomy 21:15-17": "1️⃣ The Firstborn Son Must Be Honored",
  "Deuteronomy 21:18-21": "🧒 The Rebellious Son",
  "Deuteronomy 21:22-23": "🪵 Hanged On A Tree",
};

const day53DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 22:1-4": [
    "🐂 Thou Shalt Not See Thy Brother's Ox Or His Sheep Go Astray",
    "🚫 And Hide Thyself From Them",
    "🏠 Then Thou Shalt Bring It Unto Thine Own House",
    "👕 And So Shalt Thou Do With His Raiment",
    "🔎 And With All Lost Thing Of Thy Brother's",
    "🤝 Which He Hath Lost, And Thou Hast Found",
    "💪 Thou Mayest Not Hide Thyself",
  ],
  "Deuteronomy 22:6-7": [
    "🪺 If A Bird's Nest Chance To Be Before Thee",
    "🌳 In Any Tree, Or On The Ground",
    "🐣 Whether They Be Young Ones, Or Eggs",
    "🐦 And The Dam Sitting Upon The Young, Or Upon The Eggs",
    "🚫 Thou Shalt Not Take The Dam With The Young",
    "🕊️ Thou Shalt In Any Wise Let The Dam Go",
    "😊 That It May Be Well With Thee, And That Thou Mayest Prolong Thy Days",
  ],
  "Deuteronomy 22:9-12": [
    "🍇 Thou Shalt Not Sow Thy Vineyard With Divers Seeds",
    "🐂 Thou Shalt Not Plow With An Ox And An Ass Together",
    "🧵 Thou Shalt Not Wear A Garment Of Divers Sorts",
    "🪢 Thou Shalt Make Thee Fringes Upon The Four Quarters Of Thy Vesture",
  ],
  "Deuteronomy 22:13-18": [
    "💍 If Any Man Take A Wife",
    "❤️ And Go In Unto Her, And Hate Her",
    "🗣️ And Give Occasions Of Speech Against Her",
    "⚠️ And Bring Up An Evil Name Upon Her",
    "📢 I Took This Woman, And When I Came To Her, I Found Her Not A Maid",
    "📜 Then Shall The Father Of The Damsel, And Her Mother, Take And Bring Forth The Tokens",
    "👨‍⚖️ Unto The Elders Of The City In The Gate",
  ],
  "Deuteronomy 22:19-19": [
    "💰 They Shall Amerce Him In An Hundred Shekels Of Silver",
    "👨 And Give Them Unto The Father Of The Damsel",
    "⚠️ Because He Hath Brought Up An Evil Name Upon A Virgin Of Israel",
    "💍 And She Shall Be His Wife",
    "🚫 He May Not Put Her Away All His Days",
    "🗣️ And The Damsel's Father Shall Say Unto The Elders",
    "❤️ I Gave My Daughter Unto This Man To Wife, And He Hateth Her",
  ],
  "Deuteronomy 22:20-21": [
    "❌ If This Thing Be True",
    "🚫 And The Tokens Of Virginity Be Not Found For The Damsel",
    "⚠️ Because She Hath Wrought Folly In Israel",
    "🧹 So Shalt Thou Put Evil Away From Among You",
  ],
  "Deuteronomy 22:23-24": [
    "🏙️ If A Damsel That Is A Virgin Be Betrothed Unto An Husband",
    "👨 And A Man Find Her In The City",
    "🛏️ And Lie With Her",
    "🪨 Then Ye Shall Stone Them With Stones That They Die",
    "📣 Because She Cried Not, Being In The City",
    "💔 Because He Hath Humbled His Neighbour's Wife",
    "🧹 So Thou Shalt Put Away Evil From Among You",
  ],
  "Deuteronomy 22:25-27": [
    "🏞️ If A Man Find A Betrothed Damsel In The Field",
    "💥 And The Man Force Her, And Lie With Her",
    "⚖️ Then The Man Only That Lay With Her Shall Die",
    "✅ There Is In The Damsel No Sin Worthy Of Death",
    "🗡️ For As When A Man Riseth Against His Neighbour, And Slayeth Him",
    "📖 Even So Is This Matter",
    "📣 For He Found Her In The Field, And The Betrothed Damsel Cried",
  ],
  "Deuteronomy 22:28-29": [
    "👧 If A Man Find A Damsel That Is A Virgin, Which Is Not Betrothed",
    "✋ And Lay Hold On Her",
    "🛏️ And Lie With Her",
    "👀 And They Be Found",
    "💰 Then The Man Shall Give Unto The Damsel's Father Fifty Shekels Of Silver",
    "💍 She Shall Be His Wife",
    "🚫 He May Not Put Her Away All His Days",
  ],
  "Deuteronomy 23:1-2": [
    "🚫 He That Is Wounded In The Stones",
    "🚫 Or Hath His Privy Member Cut Off",
    "🚫 A Bastard Shall Not Enter Into The Congregation Of The LORD",
    "🔟 Even To His Tenth Generation",
  ],
  "Deuteronomy 23:3-6": [
    "🚫 An Ammonite Or Moabite Shall Not Enter Into The Congregation Of The LORD",
    "🥖 Because They Met You Not With Bread And With Water",
    "🧙 Because They Hired Against Thee Balaam",
    "🚫 Thou Shalt Not Seek Their Peace Nor Their Prosperity All Thy Days For Ever",
  ],
  "Deuteronomy 23:7-8": [
    "🤝 Thou Shalt Not Abhor An Edomite",
    "👬 For He Is Thy Brother",
    "🤝 Thou Shalt Not Abhor An Egyptian",
    "🏠 Because Thou Wast A Stranger In His Land",
  ],
  "Deuteronomy 23:9-11": [
    "⚔️ When The Host Goeth Forth Against Thine Enemies",
    "🚫 Then Keep Thee From Every Wicked Thing",
    "🌙 If There Be Among You Any Man That Is Not Clean By Reason Of Uncleanness",
    "🏕️ Then Shall He Go Abroad Out Of The Camp",
    "🌆 When Evening Cometh On He Shall Wash Himself With Water",
    "☀️ And When The Sun Is Down He Shall Come Into The Camp Again",
    "🧼 He Shall Not Come Within The Camp",
  ],
  "Deuteronomy 23:12-14": [
    "📍 Thou Shalt Have A Place Also Without The Camp",
    "🪓 Thou Shalt Have A Paddle Upon Thy Weapon",
    "🕳️ When Thou Wilt Ease Thyself Abroad",
    "🙈 Thou Shalt Turn Back And Cover That Which Cometh From Thee",
    "🚶 The LORD Thy God Walketh In The Midst Of Thy Camp",
    "🛡️ To Deliver Thee, And To Give Up Thine Enemies Before Thee",
    "🙏 Therefore Shall Thy Camp Be Holy",
  ],
  "Deuteronomy 23:15-16": [
    "🏃 Thou Shalt Not Deliver Unto His Master The Servant Which Is Escaped",
    "🏠 He Shall Dwell With Thee",
    "📍 In That Place Which He Shall Choose",
    "🚫 Thou Shalt Not Oppress Him",
  ],
  "Deuteronomy 23:17-18": [
    "🚫 There Shall Be No Whore Of The Daughters Of Israel",
    "🚫 Nor A Sodomite Of The Sons Of Israel",
    "🚫 Thou Shalt Not Bring The Hire Of A Whore, Or The Price Of A Dog, Into The House Of The LORD",
    "🤢 Even Both These Are Abomination Unto The LORD Thy God",
  ],
  "Deuteronomy 23:19-20": [
    "🚫 Thou Shalt Not Lend Upon Usury To Thy Brother",
    "💰 Usury Of Money",
    "🍞 Usury Of Victuals",
    "📦 Usury Of Any Thing That Is Lent Upon Usury",
    "🌍 Unto A Stranger Thou Mayest Lend Upon Usury",
    "🤝 But Unto Thy Brother Thou Shalt Not Lend Upon Usury",
  ],
  "Deuteronomy 23:21-23": [
    "🗣️ When Thou Shalt Vow A Vow Unto The LORD Thy God",
    "🚫 Thou Shalt Not Slack To Pay It",
    "⚖️ It Would Be Sin In Thee",
    "🫶 That Which Is Gone Out Of Thy Lips Thou Shalt Keep And Perform",
  ],
  "Deuteronomy 23:24-25": [
    "🍇 When Thou Comest Into Thy Neighbour's Vineyard",
    "😊 Then Thou Mayest Eat Grapes Thy Fill At Thine Own Pleasure",
    "🚫 But Thou Shalt Not Put Any In Thy Vessel",
    "🌾 Then Thou Mayest Pluck The Ears With Thine Hand",
  ],
  "Deuteronomy 24:1-4": [
    "💍 When A Man Hath Taken A Wife, And Married Her",
    "⚠️ Because He Hath Found Some Uncleanness In Her",
    "📜 Then Let Him Write Her A Bill Of Divorcement",
    "🚪 And Send Her Out Of His House",
    "💍 And If She Go And Become Another Man's Wife",
    "🚫 Her Former Husband May Not Take Her Again To Be His Wife",
    "🤢 For That Is Abomination Before The LORD",
  ],
  "Deuteronomy 24:8-9": [
    "🦠 Take Heed In The Plague Of Leprosy",
    "👂 That Thou Observe Diligently",
    "📜 According To All That The Priests The Levites Shall Teach You",
    "🧠 Remember What The LORD Thy God Did Unto Miriam By The Way",
  ],
  "Deuteronomy 24:10-13": [
    "🤝 When Thou Dost Lend Thy Brother Any Thing",
    "🚫 Thou Shalt Not Go Into His House To Fetch His Pledge",
    "🚪 Thou Shalt Stand Abroad",
    "🌙 If The Man Be Poor, Thou Shalt Not Sleep With His Pledge",
  ],
  "Deuteronomy 24:14-15": [
    "💼 Thou Shalt Not Oppress An Hired Servant That Is Poor And Needy",
    "👬 Whether He Be Of Thy Brethren, Or Of Thy Strangers",
    "🌅 At His Day Thou Shalt Give Him His Hire",
    "🌇 Neither Shall The Sun Go Down Upon It",
    "💓 For He Is Poor, And Setteth His Heart Upon It",
    "🗣️ Lest He Cry Against Thee Unto The LORD",
    "⚠️ And It Be Sin Unto Thee",
  ],
  "Deuteronomy 24:17-18": [
    "⚖️ Thou Shalt Not Pervert The Judgment Of The Stranger",
    "👶 Nor Of The Fatherless",
    "🧥 Nor Take A Widow's Raiment To Pledge",
    "🧠 But Thou Shalt Remember That Thou Wast A Bondman In Egypt",
    "🎁 And The LORD Thy God Redeemed Thee Thence",
  ],
  "Deuteronomy 24:20-22": [
    "🌳 When Thou Beatest Thine Olive Tree",
    "🚫 Thou Shalt Not Go Over The Boughs Again",
    "🤝 It Shall Be For The Stranger, For The Fatherless, And For The Widow",
    "🍇 When Thou Gatherest The Grapes Of Thy Vineyard",
    "🚫 Thou Shalt Not Glean It Afterward",
    "🧠 Thou Shalt Remember That Thou Wast A Bondman In The Land Of Egypt",
  ],
  "Deuteronomy 25:2-3": [
    "⚖️ If The Wicked Man Be Worthy To Be Beaten",
    "👨‍⚖️ The Judge Shall Cause Him To Lie Down",
    "👀 And To Be Beaten Before His Face",
    "📏 According To His Fault, By A Certain Number",
    "4️⃣0️⃣ Forty Stripes He May Give Him",
    "🚫 And Not Exceed",
    "🤝 Lest Thy Brother Should Seem Vile Unto Thee",
  ],
  "Deuteronomy 25:5-6": [
    "👬 If Brethren Dwell Together",
    "💀 And One Of Them Die, And Have No Child",
    "🚫 The Wife Of The Dead Shall Not Marry Without Unto A Stranger",
    "💍 Her Husband's Brother Shall Go In Unto Her",
    "👶 The Firstborn Which She Beareth Shall Succeed In The Name Of His Brother",
    "🕯️ That His Name Be Not Put Out Of Israel",
  ],
  "Deuteronomy 25:7-10": [
    "🚫 If The Man Like Not To Take His Brother's Wife",
    "🏛️ Then Let His Brother's Wife Go Up To The Gate Unto The Elders",
    "🗣️ My Husband's Brother Refuseth To Raise Up Unto His Brother A Name In Israel",
    "🗣️ And If He Stand To It, And Say, I Like Not To Take Her",
    "👞 Then Shall His Brother's Wife Come Unto Him In The Presence Of The Elders, And Loose His Shoe",
    "💦 And Spit In His Face",
    "📛 The House Of Him That Hath His Shoe Loosed",
  ],
  "Deuteronomy 25:11-12": [
    "🥊 When Men Strive Together One With Another",
    "✋ And The Wife Of The One Draweth Near For To Deliver Her Husband",
    "🤲 And Putteth Forth Her Hand",
    "🤐 And Taketh Him By The Secrets",
    "✂️ Then Thou Shalt Cut Off Her Hand",
  ],
  "Deuteronomy 25:13-16": [
    "⚖️ Thou Shalt Not Have In Thy Bag Divers Weights",
    "⚖️ Thou Shalt Not Have In Thine House Divers Measures",
    "✅ A Perfect And Just Weight Shalt Thou Have",
    "🤢 All That Do Unrighteously Are An Abomination Unto The LORD Thy God",
  ],
  "Deuteronomy 25:17-19": [
    "🧠 Remember What Amalek Did Unto Thee By The Way",
    "💥 How He Met Thee By The Way",
    "😫 And Smote The Hindmost Of Thee",
    "🥵 Even All That Were Feeble Behind Thee, When Thou Wast Faint And Weary",
    "🚫 And He Feared Not God",
    "🗑️ Thou Shalt Blot Out The Remembrance Of Amalek From Under Heaven",
    "🚫 Thou Shalt Not Forget It",
  ],
};

const day53DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 22:1-4": "🤝 Do Not Hide From Your Brother's Need",
  "Deuteronomy 22:6-7": "🪺 The Bird's Nest",
  "Deuteronomy 22:9-12": "🧵 Keep Distinctions Visible",
  "Deuteronomy 22:13-18": "⚖️ False Charges Against A Wife",
  "Deuteronomy 22:19-19": "💰 The Slanderer Is Fined",
  "Deuteronomy 22:20-21": "🧹 Put Evil Away",
  "Deuteronomy 22:23-24": "🏙️ The Betrothed Woman In The City",
  "Deuteronomy 22:25-27": "🏞️ The Betrothed Woman In The Field",
  "Deuteronomy 22:28-29": "💍 The Unbetrothed Virgin",
  "Deuteronomy 23:1-2": "🚫 Excluded From The Congregation",
  "Deuteronomy 23:3-6": "🚫 Ammon And Moab Remembered",
  "Deuteronomy 23:7-8": "🤝 Do Not Abhor Edom Or Egypt",
  "Deuteronomy 23:9-11": "🏕️ Cleanliness In The Camp",
  "Deuteronomy 23:12-14": "🪓 A Holy Camp",
  "Deuteronomy 23:15-16": "🏃 Do Not Return The Escaped Servant",
  "Deuteronomy 23:17-18": "🚫 No Sexual Corruption In Worship",
  "Deuteronomy 23:19-20": "🤝 No Usury To Thy Brother",
  "Deuteronomy 23:21-23": "🗣️ Pay What You Vow",
  "Deuteronomy 23:24-25": "🍇 Eat, But Do Not Harvest",
  "Deuteronomy 24:1-4": "📜 A Bill Of Divorcement",
  "Deuteronomy 24:8-9": "🦠 Remember Miriam",
  "Deuteronomy 24:10-13": "🚪 Do Not Enter For The Pledge",
  "Deuteronomy 24:14-15": "💼 Pay The Poor Worker",
  "Deuteronomy 24:17-18": "⚖️ Protect The Stranger, Fatherless, And Widow",
  "Deuteronomy 24:20-22": "🌾 Leave Some Behind",
  "Deuteronomy 25:2-3": "⚖️ Forty Stripes And No More",
  "Deuteronomy 25:5-6": "🕯️ Raise Up A Brother's Name",
  "Deuteronomy 25:7-10": "👞 The House Of Him That Hath His Shoe Loosed",
  "Deuteronomy 25:11-12": "✂️ Cut Off Her Hand",
  "Deuteronomy 25:13-16": "⚖️ A Perfect And Just Weight",
  "Deuteronomy 25:17-19": "🧠 Remember Amalek",
};

const day54DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 26:1-4": "🧺 The Basket Of Firstfruits",
  "Deuteronomy 26:6-8": "🗣️ The Confession Of Deliverance",
  "Deuteronomy 26:9-11": "🎁 Rejoice In Every Good Thing",
  "Deuteronomy 26:12-13": "🌾 The Year Of Tithing",
  "Deuteronomy 26:17-19": "👑 Avouched This Day",
  "Deuteronomy 27:1-3": "🪨 Write The Law On Stones",
  "Deuteronomy 27:4-8": "⛰️ An Altar On Mount Ebal",
  "Deuteronomy 27:9-10": "👂 This Day Thou Art Become The People Of The LORD",
  "Deuteronomy 27:11-13": "🏔️ Gerizim And Ebal",
  "Deuteronomy 27:14-15": "📣 Cursed Be The Idol-Maker",
  "Deuteronomy 27:20-23": "🚫 Cursed Sexual Corruption",
  "Deuteronomy 27:24-25": "🩸 Cursed Hidden Violence",
  "Deuteronomy 28:1-2": "👂 Hearken Diligently",
  "Deuteronomy 28:3-6": "🌆 Blessed In City And Field",
  "Deuteronomy 28:7-10": "🛡️ Enemies Flee Before You",
  "Deuteronomy 28:11-14": "🌾 Plenteous In Goods",
  "Deuteronomy 28:15-19": "⚠️ Cursed In City And Field",
  "Deuteronomy 28:20-24": "🌫️ Cursing, Vexation, And Rebuke",
  "Deuteronomy 28:25-30": "🏃 Flee Seven Ways",
  "Deuteronomy 28:31-35": "😞 Oppression And Smiting",
  "Deuteronomy 28:36-41": "🌍 Scattered Among Nations",
  "Deuteronomy 28:42-46": "🦗 The Stranger Gets Above Thee",
  "Deuteronomy 28:47-52": "😢 Because Thou Servedst Not With Joyfulness",
  "Deuteronomy 28:53-57": "🫓 Siege And Horror",
  "Deuteronomy 28:58-63": "😨 Fear This Glorious And Fearful Name",
  "Deuteronomy 28:64-68": "⛓️ No Ease Among The Nations",
  "Deuteronomy 29:2-4": "👁️ Eyes That Have Seen, Yet Hearts Unawake",
  "Deuteronomy 29:5-9": "🥾 Forty Years In The Wilderness",
  "Deuteronomy 29:10-13": "🤝 Ye Stand This Day All Of You",
  "Deuteronomy 29:14-15": "📜 The Covenant Reaches Beyond This Moment",
  "Deuteronomy 29:16-18": "🌱 A Root That Beareth Gall And Wormwood",
  "Deuteronomy 29:19-21": "🔥 Though He Bless Himself In His Heart",
  "Deuteronomy 29:22-27": "❓ Why Hath The LORD Done Thus Unto This Land",
  "Deuteronomy 29:28-28": "🔐 The Secret Things Belong Unto The LORD",
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

const day51AnimalFirstLines: Record<string, string> = {
  "The Camel": "Camels are named as unclean even though they chew the cud.",
  "The Hare": "Hares are listed among the animals Israel may not eat.",
  "The Coney": "A coney is a small rock-dwelling animal counted as unclean here.",
  "The Swine Is Unclean Unto You": "The swine means the pig, and it is called unclean here.",
  "The Eagle, And The Ossifrage, And The Ospray": "These are birds of prey placed in the unclean list.",
  "The Glede, And The Kite, And The Vulture After His Kind": "These are scavenging or hunting birds Israel must not eat.",
  "Every Raven After His Kind": "The whole raven family is treated as unclean here.",
  "The Owl, And The Night Hawk, And The Cuckow": "These named birds are grouped among the unclean fowl.",
  "The Little Owl, And The Great Owl, And The Swan": "This line continues the list of birds Israel must avoid.",
  "The Pelican, And The Gier Eagle, And The Cormorant": "These birds are named as unclean in Israel's food laws.",
  "The Stork, And The Heron After Her Kind": "This line keeps listing birds Israel may not eat.",
  "The Lapwing, And The Bat": "Even these winged creatures are included in the unclean list.",
  "As The Roebuck, And As The Hart": "The roebuck and the hart are wild deer-like animals used as a comparison here.",
};

function summarizeDay51Title(cleanTitle: string) {
  return cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\b(the|and|of|thy|thou|ye|your|unto|that|this|be|is|are|it|to|for|in|on|with|all|any|or|nor|as|at|from)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 4)
    .join(" ");
}

function uniquifyDay51FirstLine(cleanTitle: string, line: string) {
  const repeated = new Set([
    "These are mourning cuts and shaved marks used in pagan grief rituals.",
    "Holy means set apart for God.",
    "Fins and scales are the marks that identify clean water creatures in this law.",
    "The law makes room for distance without canceling worship.",
    "The tithe may be converted into money for travel.",
    "The worship meal is eaten before the LORD, not as a casual picnic.",
    "This is the third-year storage of the tithe within the local town.",
    "These are the vulnerable groups Moses keeps naming together.",
    "The release is the canceling of certain debts in the seventh year.",
    "To exact is to press for payment.",
    "The ideal Moses holds out is a community where deep poverty is relieved.",
    "The language describes national stability and strength under God's blessing.",
    "The command targets the inner attitude before the outward action.",
    "The phrase calls for enough help to meet the real need.",
    "A wicked heart here is a calculating heart that uses the calendar to avoid mercy.",
    "The law limits how long a Hebrew servant may remain in service.",
    "Freedom must not be a bare dismissal with nothing in hand.",
    "This servant chooses to remain because life in the master's house has become good to him.",
    "An aul is an awl, a pointed tool used to pierce.",
    "The firstborn male animals are set apart as belonging to God.",
    "The holy firstling is not to be used like ordinary property.",
    "A blemish is a defect that makes an animal unfit for sacrifice.",
    "The blood is still withheld from eating even when the meat itself may be eaten.",
    "Passover is the feast of remembered deliverance from Egypt.",
    "Leavened bread is bread made with leaven that causes dough to rise.",
    "The haste of the exodus explains why this bread matters.",
    "Passover is not left to local preference.",
    "The feast has an ordered ending as well as an ordered beginning.",
    "This feast is counted from the beginning of harvest.",
    "The joy of the feast is shared across the household and the vulnerable alike.",
    "The Feast of Tabernacles is tied to gathered harvest and commanded joy.",
    "The yearly pilgrim feasts gather the males of Israel before God.",
    "Moses is ordering the courts and leaders in Israel's towns.",
    "A grove and an image are worship forms borrowed from pagan religion.",
    "The phrase describes covenant betrayal through open idolatry.",
    "The law requires hearing, investigation, and certainty before judgment.",
    "One witness is not enough in a death case.",
    "These phrases describe hard cases the local courts cannot settle easily.",
    "The people must receive the lawful decision given at the chosen place.",
    "This phrase names one concrete part of covenant life.",
  ]);

  if (!repeated.has(line)) return line;

  const lower = cleanTitle.toLowerCase();

  if (/above all the nations/.test(lower)) return "Israel is being marked out above the surrounding nations here.";
  if (/water creatures are divided/.test(lower)) return "This line sums up the clean-water-creature rule.";
  if (/of all clean birds ye shall eat/.test(lower)) return "The line opens the bird list with permission for clean birds.";
  if (/these are they of which ye shall not eat/.test(lower)) return "The sentence introduces the forbidden bird list.";
  if (/but of all clean fowls ye may eat/.test(lower)) return "The list closes by restating permission for clean birds.";
  if (/the tithe of thy corn/.test(lower)) return "Grain is explicitly included in the worship tenth.";
  if (/of thy wine/.test(lower)) return "Wine from the harvest is included in the tithe.";
  if (/and of thine oil/.test(lower)) return "Oil from the olive yield is also part of the tithe.";
  if (/that the lord thy god may bless thee/.test(lower)) return "The promise of blessing is attached to this generous practice.";
  if (/at the end of every seven years/.test(lower)) return "Every seventh year resets debt pressure among Israelite brothers.";
  if (/this is the manner of the release/.test(lower)) return "This line begins the practical rules for how the release works.";
  if (/every creditor that lendeth ought unto his neighbour shall release it/.test(lower)) return "Lenders must release what an Israelite brother owes in that seventh year.";
  if (/he shall not exact it of his neighbour, or of his brother/.test(lower)) return "The lender may not press an Israelite brother for payment during the release.";
  if (/because it is called the lord's release/.test(lower)) return "The release belongs to the LORD, so Israel cannot treat it as optional.";
  if (/thou shalt not harden thine heart/.test(lower)) return "The warning begins in the heart before it ever reaches the hand.";
  if (/nor shut thine hand from thy poor brother/.test(lower)) return "A shut hand means mercy is being withheld from a needy brother.";
  if (/thou shalt open thine hand wide unto him/.test(lower)) return "Open thine hand means give freely instead of staying guarded.";
  if (/and shalt surely lend him sufficient for his need/.test(lower)) return "The help must be large enough to meet the real need.";
  if (/in that which he wanteth/.test(lower)) return "The gift is measured by the person's actual lack, not by token charity.";
  if (/and thou givest him nought/.test(lower)) return "This line names the sinful refusal to help the poor brother.";
  if (/thou shalt surely give him/.test(lower)) return "The command moves from warning into actual giving.";
  if (/he shall be thy servant for ever/.test(lower)) return "The chosen bond becomes a permanent household relationship.";
  if (/thou and thy household/.test(lower)) return "The command includes the whole home in this worship practice.";
  if (/thou shalt not sacrifice it unto the lord thy god/.test(lower)) return "A blemished firstling is barred from the altar.";
  if (/which the lord thy god giveth thee/.test(lower)) return "The gate in view stands inside land already given by God.";
  if (/which thou shalt give unto the lord thy god/.test(lower)) return "The offering is described as something personally handed to God.";
  if (/according as the lord thy god hath blessed thee/.test(lower)) return "The size of the gift is tied to the blessing received.";
  if (/thou shalt rejoice in thy feast/.test(lower)) return "The feast is commanded to be joyful, not merely observed.";
  if (/and in the feast of tabernacles/.test(lower)) return "Tabernacles is named as the third great annual appearance.";
  if (/that thou mayest live/.test(lower)) return "The pursuit of justice is tied directly to life in the land.";
  if (/if there be found among you/.test(lower)) return "The law imagines idolatry being discovered within Israel itself.";
  if (/man or woman/.test(lower)) return "The command applies without favoritism to either man or woman.";
  if (/and worshipped them/.test(lower)) return "The line moves from serving false gods to openly worshiping them.";
  if (/either the sun/.test(lower)) return "The warning even names heavenly bodies as false objects of worship.";
  if (/then shalt thou bring forth that man or that woman unto thy gates/.test(lower)) return "The guilty person must be brought into the public place of judgment.";
  if (/and shalt stone them with stones, till they die/.test(lower)) return "The sentence makes the judgment public and final.";
  if (/to the right hand, nor to the left/.test(lower)) return "The people may not turn aside from the ruling in either direction.";
  if (/even that man shall die/.test(lower)) return "Presumptuous rebellion against lawful judgment ends in death.";
  if (/all the people shall hear, and fear/.test(lower)) return "The result is meant to warn the whole nation.";
  if (/and shalt possess it, and shalt dwell therein/.test(lower)) return "The king question is raised only after settled life in the land.";
  if (/thou shalt in any wise set him king over thee/.test(lower)) return "If a king is appointed, the choice must follow God's limits.";
  if (/it shall be$/.test(lower)) return "The law now describes what must happen once the king is enthroned.";
  if (/when he sitteth upon the throne of his kingdom/.test(lower)) return "The command begins at the moment royal rule becomes official.";
  if (/and it shall be with him/.test(lower)) return "The written law is meant to stay near the king continually.";
  if (/that he may learn to fear the lord his god/.test(lower)) return "The king studies the law so reverence for God will rule his heart.";
  if (/to do them$/.test(lower)) return "Reading the law is meant to end in obedient practice.";

  const summary = summarizeDay51Title(cleanTitle);
  return summary ? `${line} Here the focus is ${summary}.` : line;
}

function getGenericMeaning(title: string, section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number]) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/lord thy god|lord your god|command|statutes|judgments|law|words of this law|words of this covenant/.test(lower)) {
    return ["Moses is grounding Israel's life in the LORD's revealed word.", "The people are not free to shape worship, justice, family life, or leadership by instinct."];
  }
  if (/clean|unclean|eat|beast|fish|fowl|cheweth|cloven|abomination/.test(lower)) {
    return ["Israel's ordinary eating is being marked by holiness.", "Clean and unclean food laws trained the people to see daily life as belonging to the LORD."];
  }
  if (/tithe|tenth|firstling|firstfruits|place which the lord|before the lord|rejoice/.test(lower)) {
    return ["Worship and provision are being brought before the LORD.", "Israel must receive harvest, animals, and celebration as gifts to enjoy under God's command."];
  }
  if (/poor|brother|lend|borrow|release|debt|bondman|servant|widow|fatherless|stranger/.test(lower)) {
    return ["Covenant life must protect vulnerable people.", "Moses teaches Israel that mercy, generosity, debt release, and fair treatment belong to obedience."];
  }
  if (/passover|unleavened|weeks|tabernacles|solemn feast|appear before|empty/.test(lower)) {
    return ["Israel's calendar is shaped around remembering and worshiping the LORD.", "The feasts keep rescue, harvest, joy, and gratitude in front of the whole nation."];
  }
  if (/judge|judges|justice|judgment|wrest|respect persons|gift|altogether just|witness/.test(lower)) {
    return ["Justice must be honest because Israel lives before the LORD.", "Courts, witnesses, and leaders may not twist judgment for fear, favoritism, or gain."];
  }
  if (/king|horses|wives|silver|gold|copy of this law|lifted up above his brethren/.test(lower)) {
    return ["Israel's future king must live under God's law.", "Royal power is not permission for pride, luxury, self-protection, or forgetting the LORD."];
  }

  return ["Moses is explaining a concrete part of covenant life in the land.", `In ${section.reference}, Israel is learning how worship, justice, mercy, and obedience must work before the LORD.`];
}

function getGenericBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/clean|unclean|eat|beast|fish|fowl|abomination/.test(lower)) return ["🍽️ Daily eating is set apart", "🧼 Clean and unclean teach holiness", "🙌 Israel belongs to the LORD"];
  if (/tithe|firstling|firstfruits|rejoice|place which the lord|before the lord/.test(lower)) return ["🎁 Provision is received from God", "📍 Worship happens where He chooses", "🙌 Joy is practiced before the LORD"];
  if (/poor|brother|release|debt|servant|widow|fatherless|stranger/.test(lower)) return ["🤲 Mercy protects the vulnerable", "🏠 Covenant life reaches households", "📜 Obedience includes generosity"];
  if (/feast|passover|unleavened|weeks|tabernacles/.test(lower)) return ["📅 Israel's year remembers God", "🍞 Rescue and provision are celebrated", "👥 The whole nation worships together"];
  if (/judge|justice|judgment|witness|gift/.test(lower)) return ["⚖️ Judgment must be honest", "👁️ Favoritism must be refused", "📜 Truth matters before God"];
  if (/king|horses|wives|silver|gold/.test(lower)) return ["👑 Power must submit to God", "📘 The king needs the law", "⚠️ Pride can corrupt leadership"];
  return ["📜 The law teaches covenant life", "🏞️ Israel is preparing for the land", "🙌 Obedience must shape daily life"];
}

function getGenericTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/poor|widow|fatherless|stranger|servant|debt|release/.test(lower)) return "Faithfulness to God must become mercy toward people.";
  if (/judge|justice|judgment|witness/.test(lower)) return "Truth and justice are part of worshiping the LORD.";
  if (/king/.test(lower)) return "Even the highest human authority must stay under God's word.";
  return "Faithful life in the land must be shaped by God's command.";
}

function makeGenericExplanation(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], title: string) {
  const [lineOne, lineTwo] = getGenericMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getGenericBullets(title),
    getGenericTakeaway(title),
  ]);
}

function getDay51Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/children of the lord|holy people|peculiar people|chosen/.test(lower)) return ["👨‍👩‍👧 Israel belongs to God as family", "🙏 Holiness changes mourning and daily life", "💎 Chosen status is a gift", "🌍 Israel is set apart among the nations"];
  if (/cut yourselves|baldness|dead/.test(lower)) return ["😭 Pagan mourning customs are forbidden", "🫀 Grief must stay under covenant identity", "🚫 Israel must not copy the nations", "🙏 Even sorrow is shaped by holiness"];
  if (/abominable|clean|unclean|camel|hare|coney|swine|fins|scales|birds|fowls|creeping|dieth of itself|their flesh|waters|seethe a kid/.test(lower)) return ["🍽️ Food laws train Israel's daily life", "🧼 Clean and unclean make distinctions visible", "🚫 Holiness reaches ordinary appetite", "🙌 The LORD rules even the table"];
  if (/tithe|increase|seed|corn|wine|oil|firstlings/.test(lower)) return ["🌾 Increase is treated as God's gift", "🎁 Worship includes the harvest", "🐑 Firstlings belong to the LORD", "🙌 Gratitude is practiced, not assumed"];
  if (/way be too long|place be too far|money|oxen|sheep|strong drink|rejoice.*household/.test(lower)) return ["🛣️ Distance does not cancel worship", "💰 The tithe can be converted for travel", "🍽️ The chosen place still matters", "🎉 Worship includes rejoicing households"];
  if (/levite|stranger|fatherless|widow|within thy gates|satisfied/.test(lower)) return ["🚪 Local provision must include vulnerable people", "🕊️ Levites need support because they lack land", "🤝 Mercy is built into the tithe", "🙌 Blessing is linked to generosity"];
  if (/harden thine heart|shut thine hand|open thine hand|poor brother|wicked heart|eye be evil|givest him nought|sufficient for his need|wanteth/.test(lower)) return ["🫀 The danger begins inside the heart", "🤲 Openhanded mercy is commanded", "👁️ Greedy calculation is condemned", "📜 Love of neighbor is part of obedience"];
  if (/release|creditor|neighbour|poor among you|\blending\b|\blend\b|\bborrow\b|reign over many nations/.test(lower)) return ["📅 The seventh year interrupts ordinary debt patterns", "🤲 Covenant life loosens the grip of poverty", "🏦 Lending and borrowing are moral issues here", "🙌 Blessing should make Israel generous"];
  if (/hebrew man|hebrew woman|six years|seventh year|go away empty|furnish him liberally|bondman in egypt/.test(lower)) return ["⛓️ Servitude in Israel is limited", "🕊️ Freedom must be real and generous", "🎁 Release includes provision", "🧠 Egypt should shape Israel's mercy"];
  if (/aul|\bear\b|door|i will not go away|loveth thee/.test(lower)) return ["❤️ The servant chooses to remain", "🚪 The doorway marks a public decision", "👂 The ear piercing becomes a sign", "🏠 Household love changes the outcome"];
  if (/firstling|blemish|lame|blind|roebuck|hart|blood/.test(lower)) return ["🐑 Firstborn animals are treated as holy", "⚠️ Blemishes matter in sacrifice", "👥 Some meat may be eaten like wild game", "🩸 Blood still belongs to God"];
  if (/abib|passover|unleavened|bread of affliction|came forth out of egypt|solemn assembly/.test(lower)) return ["📅 The calendar remembers rescue", "🍞 Bread becomes a memory tool", "🏃 Egypt was left in haste", "🙌 Worship keeps deliverance from being forgotten"];
  if (/weeks|tabernacles|appear before|rejoice|freewill offering|empty/.test(lower)) return ["🎉 The feasts gather the nation before God", "🌾 Harvest gratitude is commanded", "🎁 People bring gifts according to blessing", "👥 Joy includes the whole household and community"];
  if (/judges|officers|wrest judgment|respect persons|gift|altogether just|witnesses|sentence|judge/.test(lower)) return ["⚖️ Justice must be straight", "👁️ Bribes and favoritism distort truth", "🗣️ Witnesses carry serious responsibility", "🙌 Judgment happens before the LORD"];
  if (/grove|image|host of heaven|other gods|transgressing his covenant|abomination/.test(lower)) return ["🚫 Worship must not borrow pagan forms", "🌳 Visible symbols can pull hearts away", "🕊️ Idolatry breaks covenant loyalty", "⚖️ False worship is treated seriously"];
  if (/king|horses|egypt|wives|heart turn|silver and gold|copy of this law|read therein|learn to fear|to do them|heart be not lifted up/.test(lower)) return ["👑 Kingship must stay under God's word", "🐎 Power and military trust are dangerous", "💍 Desire can turn the heart away", "📘 The law must govern the ruler"];

  return ["📜 Moses is teaching covenant life", "🫀 The heart must stay obedient", "🙌 Holiness reaches ordinary life", "🏞️ Israel is being prepared for the land"];
}

function getDay51LeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/children|holy people|peculiar people|chosen/.test(lower)) return "👨‍👩‍👧 Identity comes before behavior";
  if (/clean|unclean|camel|hare|coney|swine|fins|scales|birds|fowls|dieth of itself|their flesh|seethe a kid/.test(lower)) return "🍽️ Holiness reaches the table";
  if (/tithe|increase|firstlings|money|rejoice/.test(lower)) return "🎁 Worship handles God's gifts God's way";
  if (/poor|lend|brother|servant|bondman|open thine hand|harden thine heart|sufficient for his need|wanteth/.test(lower)) return "🤲 Covenant mercy costs something";
  if (/release|creditor|borrow|reign over many nations/.test(lower)) return "🤲 Covenant mercy costs something";
  if (/passover|unleavened|abib|weeks|tabernacles|feast/.test(lower)) return "📅 Time itself is taught to remember";
  if (/judges|judgment|witness|sentence|gift/.test(lower)) return "⚖️ Justice is part of holiness";
  if (/king|horses|wives|copy of this law|read therein|learn to fear|heart be not lifted up/.test(lower)) return "👑 Leadership must bow to God's word";
  if (/other gods|image|grove|host of heaven/.test(lower)) return "🚫 Worship may not be reshaped by desire";

  return "📌 One phrase carries a real covenant lesson";
}

function explainDay51DeuteronomyAt95(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], cleanTitle: string) {
  const animalLine = day51AnimalFirstLines[cleanTitle];
  if (animalLine) {
    return note([
      animalLine,
      "The food list is teaching Israel to live with visible distinctions between clean and unclean.",
      getDay51LeadSupport(cleanTitle),
      ...getDay51Support(cleanTitle).slice(0, 3),
    ]);
  }

  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This phrase names one concrete part of covenant life.", "Moses is training Israel to live differently because they belong to the LORD."];

  if (/children of the lord/.test(lower)) opening = ["The phrase gives Israel a family identity before it gives Israel a rule.", "The commands that follow grow out of belonging to God as His people."];
  else if (/cut yourselves|baldness.*dead/.test(lower)) opening = ["These are mourning cuts and shaved marks used in pagan grief rituals.", "Israel must not copy death customs that deny its holy identity."];
  else if (/holy people|peculiar people|chosen/.test(lower)) opening = ["Holy means set apart for God.", "Peculiar people means a treasured possession belonging to Him in a special way."];
  else if (/abominable thing/.test(lower)) opening = ["An abominable thing is something treated as unfit and detestable under God's law.", "The command begins the food laws with a strong boundary word."];
  else if (/every beast that parteth the hoof, and cheweth the cud/.test(lower)) opening = ["The phrase names the main signs of a clean land animal.", "Israel is taught to notice created distinctions before eating."];
  else if (/swine is unclean/.test(lower)) opening = ["The swine means the pig, and it is called unclean here.", "Even a familiar food animal can be forbidden when God draws the line."];
  else if (/ye shall not eat of their flesh/.test(lower)) opening = ["The command applies to eating, not merely touching.", "Israel's appetite itself is brought under holiness."];
  else if (/fins and scales/.test(lower)) opening = ["Fins and scales are the marks that identify clean water creatures in this law.", "The sea and rivers are placed under the same holy distinctions as the land."];
  else if (/whatsoever hath not fins and scales/.test(lower)) opening = ["Creatures lacking those marks are excluded from Israel's diet.", "The phrase teaches refusal as much as permission."];
  else if (/it is unclean unto you/.test(lower)) opening = ["Unclean here means not permitted for Israel's eating under the covenant.", "The rule trains the people to respect God's categories."];
  else if (/flying creeping things/.test(lower)) opening = ["Flying creeping things are winged creatures that move like swarming things.", "The law keeps Israel from treating every moving creature as food."];
  else if (/ye shall not eat of any thing that dieth of itself/.test(lower)) opening = ["A thing that dieth of itself is an animal not properly killed for food.", "Israel is not to treat carcasses found dead as normal food."];
  else if (/give it unto the stranger/.test(lower)) opening = ["The stranger in thy gates is a foreign resident living among Israel.", "The line shows that this food restriction belongs specifically to Israel's holy calling."];
  else if (/seethe a kid in his mother's milk/.test(lower)) opening = ["Seethe means boil, and a kid is a young goat.", "The phrase forbids a practice Israel must not treat as normal cooking."];
  else if (/truly tithe all the increase of thy seed/.test(lower)) opening = ["To tithe means to give a tenth.", "The increase of thy seed means the produce that comes from the field year by year."];
  else if (/tithe of thy corn, of thy wine, and of thine oil/.test(lower)) opening = ["Corn, wine, and oil represent Israel's staple produce.", "The phrase gathers ordinary prosperity into worship."];
  else if (/firstlings of thy herds and of thy flocks/.test(lower)) opening = ["Firstlings are the firstborn animals from herd and flock.", "The first increase is not treated as merely private gain."];
  else if (/way be too long|place be too far/.test(lower)) opening = ["The law makes room for distance without canceling worship.", "Practical difficulty is handled, but the chosen place still matters."];
  else if (/turn it into money|bind up the money/.test(lower)) opening = ["The tithe may be converted into money for travel.", "The phrase keeps worship possible when carrying produce or animals would be too hard."];
  else if (/oxen, or for sheep, or for wine, or for strong drink/.test(lower)) opening = ["The money can be used for food and drink at the worship meal.", "God is not abolishing joy here; He is ordering it."];
  else if (/eat there before the lord|rejoice, thou, and thine household/.test(lower)) opening = ["The worship meal is eaten before the LORD, not as a casual picnic.", "Household joy becomes part of covenant worship."];
  else if (/bring forth all the tithe|lay it up within thy gates/.test(lower)) opening = ["This is the third-year storage of the tithe within the local town.", "The command redirects worship provision toward nearby need."];
  else if (/levite.*no part nor inheritance/.test(lower)) opening = ["Levi lacks a normal landed inheritance among the tribes.", "That is why Israel must remember the Levite in its giving."];
  else if (/the stranger, and the fatherless, and the widow/.test(lower) && section.chapter === 14) opening = ["The stored tithe is meant to reach the vulnerable people living nearby.", "The law repeatedly places them in view so prosperity cannot become selfish."];
  else if (/and the stranger, and the fatherless, and the widow/.test(lower) && section.reference === "Deuteronomy 16:11-12") opening = ["The Feast of Weeks joy must include the vulnerable as well as the household.", "The law repeatedly places them in view so prosperity cannot become selfish."];
  else if (/and the stranger, and the fatherless, and the widow/.test(lower) && section.reference === "Deuteronomy 16:13-15") opening = ["The Feast of Tabernacles joy must include the vulnerable as well as the household.", "The law repeatedly places them in view so prosperity cannot become selfish."];
  else if (/eat and be satisfied/.test(lower)) opening = ["Satisfied means genuinely provided for, not barely included.", "The aim is real care, not symbolic charity."];
  else if (/make a release|manner of the release|lord's release/.test(lower)) opening = ["The release is the canceling of certain debts in the seventh year.", "The phrase stops financial pressure from becoming endless among brothers."];
  else if (/creditor|exact it of his neighbour|exact it again/.test(lower)) opening = ["To exact is to press for payment.", "The law restrains how a lender may use power over another Israelite."];
  else if (/no poor among you|the lord shall greatly bless thee/.test(lower)) opening = ["The ideal Moses holds out is a community where deep poverty is relieved.", "Blessing is meant to shape how Israel handles need."];
  else if (/carefully hearken/.test(lower)) opening = ["Hearken means listen with obedience, not with bare awareness.", "The promise of blessing is tied to careful response to God's voice."];
  else if (/lend unto many nations|not borrow|reign over many nations/.test(lower)) opening = ["The language describes national stability and strength under God's blessing.", "Moses connects public flourishing with covenant obedience."];
  else if (/harden thine heart|shut thine hand|open thine hand/.test(lower)) opening = ["The command targets the inner attitude before the outward action.", "A shut hand starts with a hard heart, so Moses addresses both."];
  else if (/lend him sufficient for his need|in that which he wanteth/.test(lower)) opening = ["The phrase calls for enough help to meet the real need.", "Generosity here is not token giving."];
  else if (/wicked heart|eye be evil/.test(lower)) opening = ["A wicked heart here is a calculating heart that uses the calendar to avoid mercy.", "An evil eye means stingy resentment toward the poor brother."];
  else if (/he cry unto the lord/.test(lower)) opening = ["The poor person's cry is treated as morally serious before God.", "Refusing mercy becomes a matter the LORD Himself hears."];
  else if (/poor shall never cease out of the land/.test(lower)) opening = ["Moses is realistic that need will remain in the land.", "That realism is used to command generosity, not excuse neglect."];
  else if (/hebrew man|hebrew woman|serve thee six years|seventh year/.test(lower)) opening = ["The law limits how long a Hebrew servant may remain in service.", "Brotherhood under the covenant puts an end point on bondage."];
  else if (/not let him go away empty|furnish him liberally/.test(lower)) opening = ["Freedom must not be a bare dismissal with nothing in hand.", "The release is meant to restore the person with provision."];
  else if (/bondman in the land of egypt/.test(lower)) opening = ["Israel's own slavery in Egypt is the memory behind this command.", "Rescued people must not recreate Egypt for one another."];
  else if (/i will not go away from thee|loveth thee and thine house/.test(lower)) opening = ["This servant chooses to remain because life in the master's house has become good to him.", "The law makes room for willing lifelong service."];
  else if (/aul|ear unto the door/.test(lower)) opening = ["An aul is an awl, a pointed tool used to pierce.", "The ear at the door becomes the sign of permanent service."];
  else if (/not seem hard unto thee/.test(lower)) opening = ["Moses knows generosity can feel costly to the master.", "The command pushes against reluctant hearts even in obedience."];
  else if (/firstling males|sanctify unto the lord/.test(lower)) opening = ["The firstborn male animals are set apart as belonging to God.", "Sanctify means mark them off for holy use."];
  else if (/do no work with the firstling|nor shear the firstling/.test(lower)) opening = ["The holy firstling is not to be used like ordinary property.", "Its set-apart status changes how Israel handles labor and profit."];
  else if (/eat it before the lord.*year by year/.test(lower)) opening = ["The firstling becomes part of a repeated worship meal before the LORD.", "Holiness is practiced regularly, not once and forgotten."];
  else if (/blemish|lame|blind/.test(lower)) opening = ["A blemish is a defect that makes an animal unfit for sacrifice.", "The phrase teaches that God is not to be given damaged leftovers."];
  else if (/unclean and the clean person shall eat it alike/.test(lower)) opening = ["Because the blemished animal is not sacrificed, it may be eaten as common meat.", "The rule changes once the animal is no longer treated as altar food."];
  else if (/not eat the blood|pour it upon the ground as water/.test(lower)) opening = ["The blood is still withheld from eating even when the meat itself may be eaten.", "Life remains God's even when the animal is not offered."];
  else if (/observe the month of abib/.test(lower)) opening = ["Abib is the month tied to Israel's exodus from Egypt.", "The calendar itself is ordered around rescue."];
  else if (/keep the passover|sacrifice the passover/.test(lower)) opening = ["Passover is the feast of remembered deliverance from Egypt.", "The sacrifice keeps the rescue story alive in worship."];
  else if (/brought thee forth out of egypt by night/.test(lower)) opening = ["The night detail keeps the departure vivid and concrete.", "Israel's rescue happened in a real moment of urgency, not in a vague memory."];
  else if (/eat no leavened bread|unleavened bread/.test(lower)) opening = ["Leavened bread is bread made with leaven that causes dough to rise.", "Unleavened bread keeps the hasty exodus in view."];
  else if (/bread of affliction/.test(lower)) opening = ["Bread of affliction means bread linked to hardship and urgent departure.", "The phrase keeps Passover from becoming a comfortable tradition."];
  else if (/camest forth.*in haste|remember the day/.test(lower)) opening = ["The haste of the exodus explains why this bread matters.", "Memory is protected by the way the meal is kept."];
  else if (/remain all night/.test(lower)) opening = ["The leftovers rule keeps the Passover sacrifice from becoming ordinary food storage.", "The meal is bounded by God's command."];
  else if (/not sacrifice the passover within any of thy gates|place which the lord.*shall choose/.test(lower)) opening = ["Passover is not left to local preference.", "The feast must be kept at the place the LORD chooses."];
  else if (/going down of the sun/.test(lower)) opening = ["The phrase fixes Passover to the time of evening.", "The timing matters because the rescue itself is being remembered carefully."];
  else if (/roast and eat it/.test(lower)) opening = ["The command reaches the manner of preparation as well as the place.", "Worship meals are not improvised."];
  else if (/turn in the morning|solemn assembly/.test(lower)) opening = ["The feast has an ordered ending as well as an ordered beginning.", "Even rest from work is shaped by the memory of rescue."];
  else if (/seven weeks|sickle to the corn|feast of weeks|freewill offering/.test(lower)) opening = ["This feast is counted from the beginning of harvest.", "The harvest rhythm is turned into worship and generous giving."];
  else if (/thou, and thy son, and thy daughter/.test(lower) && section.reference === "Deuteronomy 16:11-12") opening = ["Children are named so the Feast of Weeks joy reaches the family, not only the adults.", "Worship joy is not meant to be private or exclusive."];
  else if (/thou, and thy son, and thy daughter/.test(lower) && section.reference === "Deuteronomy 16:13-15") opening = ["Children are named again so Tabernacles joy fills the household too.", "Worship joy is not meant to be private or exclusive."];
  else if (/rejoice before the lord|manservant|maidservant|levite|widow/.test(lower)) opening = ["The joy of the feast is shared across the household and the vulnerable alike.", "Worship joy is not meant to be private or exclusive."];
  else if (/remember that thou wast a bondman/.test(lower)) opening = ["The memory of bondage keeps celebration from becoming shallow.", "Israel rejoices as a rescued people."];
  else if (/observe the feast of tabernacles|gathered in thy corn and thy wine|surely rejoice/.test(lower)) opening = ["The Feast of Tabernacles is tied to gathered harvest and commanded joy.", "Full barns are meant to become grateful worship."];
  else if (/three times in a year|appear before the lord|not appear.*empty|give as he is able/.test(lower)) opening = ["The yearly pilgrim feasts gather the males of Israel before God.", "Appearing before the LORD requires thankful giving, not empty presence."];
  else if (/judges and officers|just judgment|wrest judgment|respect persons|take a gift|altogether just/.test(lower)) opening = ["Moses is ordering the courts and leaders in Israel's towns.", "Justice must stay straight because God sees what human courts do."];
  else if (/gift doth blind the eyes/.test(lower)) opening = ["A gift here means a bribe.", "The line explains why corrupt giving destroys good judgment."];
  else if (/grove of any trees|image|which the lord thy god hateth/.test(lower)) opening = ["A grove and an image are worship forms borrowed from pagan religion.", "The altar of the LORD must not be surrounded by symbols He hates."];
  else if (/blemish.*abomination|sacrifice.*wherein is blemish/.test(lower)) opening = ["A blemished sacrifice is called an abomination because God must not be given a corrupted offering.", "Worship integrity matters before justice cases even begin."];
  else if (/found among you man or woman|wrought wickedness|transgressing his covenant|served other gods|host of heaven/.test(lower)) opening = ["The phrase describes covenant betrayal through open idolatry.", "Serving created things is treated as wickedness against the LORD."];
  else if (/told thee|heard of it|enquired diligently|thing certain/.test(lower)) opening = ["The law requires hearing, investigation, and certainty before judgment.", "Serious punishment must not rest on rumor."];
  else if (/mouth of two witnesses|hands of the witnesses/.test(lower)) opening = ["One witness is not enough in a death case.", "The witnesses must also bear personal responsibility in the judgment."];
  else if (/between blood and blood|plea and plea|stroke and stroke|matters of controversy/.test(lower)) opening = ["These phrases describe hard cases the local courts cannot settle easily.", "The law provides a higher court for difficult judgment."];
  else if (/priests the levites|judge that shall be in those days|sentence|decline.*right hand|presumptuously/.test(lower)) opening = ["The people must receive the lawful decision given at the chosen place.", "Presumption against rightful judgment is treated as serious rebellion."];
  else if (/i will set a king over me, like as all the nations/.test(lower)) opening = ["Moses anticipates Israel wanting a king like the surrounding nations.", "Even kingship, if it comes, must stay inside God's covenant terms."];
  else if (/whom the lord thy god shall choose/.test(lower) && section.chapter === 17) opening = ["The future king may not be self-made or merely popular.", "The ruler must be the one the LORD Himself approves."];
  else if (/one from among thy brethren shalt thou set king over thee/.test(lower)) opening = ["The king must come from among Israel's own brothers.", "Royal rule is not meant to place a foreign master over the covenant people."];
  else if (/multiply horses|return to egypt|multiply wives|heart turn|silver and gold/.test(lower)) opening = ["The king is forbidden from building security and glory the way pagan rulers do.", "Military strength, many wives, and amassed wealth can all turn the heart away."];
  else if (/copy of this law|read therein|learn to fear|heart be not lifted up|turn not aside|prolong his days/.test(lower)) opening = ["The king must write and read the law so he remains a man under God's word.", "The law is meant to humble the ruler and keep his reign faithful."];

  return note([
    uniquifyDay51FirstLine(cleanTitle, opening[0]),
    opening[1],
    getDay51LeadSupport(cleanTitle),
    ...getDay51Support(cleanTitle).slice(0, 3),
  ]);
}

function getDay52Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/the priests the levites|tribe of levi|levi|levites|no part nor inheritance|lord is their inheritance|priest's due|shoulder|cheeks|maw|firstfruit|fleece|patrimony/.test(lower)) return ["🙌 The Levites live from holy service", "🏞️ They receive no normal land inheritance", "🎁 Israel's worship must support them", "📜 Their portion comes from God's order"];
  if (/abominations|pass through the fire|divination|observer of times|enchanter|witch|charmer|familiar spirits|wizard|necromancer|perfect with the lord/.test(lower)) return ["🚫 Israel must not copy pagan spiritual practices", "🔮 Counterfeit guidance is forbidden", "🙌 God keeps the right to speak His own way", "🧭 Holiness rejects spiritual shortcuts"];
  if (/hear again the voice|great fire|die not|well spoken|raise them up a prophet|like unto thee|words in his mouth|require it of him|how shall we know|follow not|come to pass|presumptuously|not be afraid/.test(lower)) return ["🗣️ God provides His own spokesman", "🔥 Sinai showed the people needed mediated words", "👂 The people are responsible to listen", "⚖️ False prophecy must be refused"];
  if (/slayer|flee thither|helve|avenger of the blood|innocent blood|three cities|hate his neighbour|lie in wait|false witness|diligent inquisition|life shall go for life|eye for eye/.test(lower)) return ["⚖️ The law distinguishes accident from murder", "🏙️ Justice must protect life without haste", "🩸 Innocent blood must not stain the land", "🔎 Cases must be examined carefully"];
  if (/battle|horses|chariots|be not afraid|priest shall approach|hearts faint|fearful and fainthearted|proclaim peace|besiege|spoil|very far off|save alive nothing|tree of the field|trees for meat|goeth with you|to fight against it/.test(lower)) return ["⚔️ War is approached under God's command", "🫀 Fear is addressed before battle begins", "🕊️ Peace is offered where God allows it", "🌳 Even war has God-given limits"];
  if (/slain in the land|not known who hath slain him|elders and thy judges shall measure|next unto the slain man|heifer|rough valley|wash their hands|our hands have not shed this blood|be merciful/.test(lower)) return ["🩸 Innocent blood must be answered for", "👨‍⚖️ Leaders act publicly before the LORD", "🙏 Mercy is sought for the land", "🧼 The ritual declares innocence and asks atonement"];
  if (/beautiful woman|desire unto her|bring her home|shave her head|bewail her father and her mother|let her go whither she will/.test(lower)) return ["🏠 Even in war the woman is not treated as loot", "😭 Space is given for mourning and transition", "💍 Marriage carries obligations, not mere possession", "🚫 She may not be sold after being humbled"];
  if (/two wives|beloved|hated|firstborn|double portion|acknowledge the son/.test(lower)) return ["1️⃣ Firstborn status may not be reassigned by favoritism", "⚖️ Family inheritance must follow truth", "👶 Birth order matters in the law", "🚫 Love and resentment may not distort justice"];
  if (/stubborn and rebellious son|will not obey|will not hearken|lay hold on him|elders of his city|glutton, and a drunkard/.test(lower)) return ["🏠 Persistent rebellion threatens household and community", "👪 Parents do not act alone in judgment", "🚪 The matter goes to the elders at the gate", "⚖️ Hardened rebellion is treated seriously"];
  if (/sin worthy of death|hang him on a tree|body shall not remain all night|bury him that day|accursed of god|land be not defiled|inheritance/.test(lower)) return ["⚖️ Execution does not cancel burial duty", "🌙 The body may not stay exposed overnight", "💀 Public hanging marks curse and shame", "🏞️ The land must not be defiled"];

  return ["📜 Moses is applying covenant life to hard cases", "🫀 Obedience reaches public and private life", "🙌 The LORD sets the terms", "⚖️ Holiness and justice stay together"];
}

function getDay52LeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/the priests the levites|tribe of levi|levi|levites|no part nor inheritance|lord is their inheritance|priest's due|firstfruit|fleece|patrimony|sons of levi/.test(lower)) return "🙌 Holy service still needs real support";
  if (/abominations|divination|observer of times|enchanter|witch|charmer|familiar spirits|wizard|necromancer|perfect with the lord/.test(lower)) return "🚫 Guidance must come from God, not occult power";
  if (/prophet|hear again the voice|great fire|die not|well spoken|require it of him|follow not|come to pass|presumptuously/.test(lower)) return "🗣️ God speaks through His chosen word";
  if (/slayer|flee thither|prepare thee a way|divide the coasts|helve|lighteth upon|avenger of the blood|innocent blood|blood be not upon thee|hate his neighbour|lie in wait|mortally|false witness|controversy|inquisition|thought to have done|thine eye shall not pity|eye for eye|life shall go for life|go well with thee/.test(lower)) return "⚖️ Justice must protect life carefully";
  if (/battle|horses|chariots|peace|besiege|very far off|save alive nothing|trees|priest shall approach|fearful and fainthearted|goeth with you|to fight against it/.test(lower)) return "⚔️ Even war stays under God's law";
  if (/slain in the land|heifer|wash their hands|be merciful/.test(lower)) return "🩸 Bloodguilt must be answered before the LORD";
  if (/beautiful woman|bring her home|bewail|let her go/.test(lower)) return "🏠 Power over another person is limited by God's law";
  if (/two wives|firstborn|double portion/.test(lower)) return "1️⃣ Family rights may not be rewritten by favoritism";
  if (/stubborn and rebellious son|hearken|glutton, and a drunkard/.test(lower)) return "🏠 The home is part of covenant order";
  if (/hang him on a tree|bury him that day|accursed of god/.test(lower)) return "💀 Judgment still has limits and duties";
  if (/giveth thee to inherit|giveth thee for an inheritance|dwellest in their cities|their houses/.test(lower)) return "🎁 The land is received from God's hand";
  if (/teach you not to do after all their abominations/.test(lower)) return "🚫 Israel must not let pagan worship train its life";

  return "📌 One phrase carries a real covenant lesson";
}

function explainDay52DeuteronomyAt95(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This phrase names one hard part of covenant life.", "Moses is teaching Israel how holiness and justice work in real situations."];

  if (/the priests the levites/.test(lower)) opening = ["The priests and Levites are the men set apart for tabernacle and altar service.", "This line identifies their sacred role before it explains their support."];
  else if (/all the tribe of levi/.test(lower)) opening = ["This widens the focus from priests alone to the whole tribe of Levi.", "Levi's service life shapes the whole tribe's place in Israel."];
  else if (/no part nor inheritance with israel/.test(lower)) opening = ["Inheritance here means a tribal land share in Canaan.", "Levi does not receive land like the other tribes do."];
  else if (/the lord is their inheritance/.test(lower)) opening = ["The LORD is their inheritance means their portion comes through belonging to His service.", "Their support is tied to God's presence rather than farmland."];
  else if (/as he hath said unto them/.test(lower)) opening = ["This line appeals to God's earlier promise about Levi's place.", "Moses is not inventing a new rule here."];
  else if (/priest's due from the people/.test(lower)) opening = ["Due means the assigned portion owed to the priest.", "Worshipers are responsible to provide it as part of obedience."];
  else if (/whether it be ox or sheep/.test(lower)) opening = ["The rule applies whether the sacrifice animal is large or small.", "The priest's portion does not disappear with a different offering animal."];
  else if (/shoulder/.test(lower)) opening = ["The shoulder is one of the meat portions given to the priest.", "Specific body parts are named so the support is concrete, not vague."];
  else if (/two cheeks/.test(lower)) opening = ["The two cheeks are part of the animal's head given to the priest.", "The law spells out actual portions for priestly support."];
  else if (/\bmaw\b/.test(lower)) opening = ["The maw is the stomach or inner part named among the priest's portions.", "Even unfamiliar parts are assigned by God's rule."];
  else if (/firstfruit also of thy corn, of thy wine, and of thine oil/.test(lower)) opening = ["Firstfruit means the earliest produce gathered from the harvest.", "Grain, wine, and oil are included in supporting the priestly ministry."];
  else if (/first of the fleece/.test(lower)) opening = ["The first fleece is the first wool taken from the sheep.", "Even the flock's wool belongs in Israel's support for holy service."];
  else if (/out of any of thy gates/.test(lower)) opening = ["Gates here means the towns where a Levite may be living.", "A Levite is not trapped in one local place if he wants to serve at the sanctuary."];
  else if (/desire of his mind/.test(lower)) opening = ["This means the Levite truly wants to come and serve before the LORD.", "The law makes room for willing service, not mere birthplace."];
  else if (/as all his brethren the levites do/.test(lower)) opening = ["The visiting Levite serves on equal footing with the Levites already there.", "He is not treated as a second-class helper."];
  else if (/sale of his patrimony/.test(lower)) opening = ["Patrimony means family property or family support that may come to him.", "Even with that, he still shares in the sanctuary portions."];
  else if (/not learn to do after the abominations/.test(lower)) opening = ["Abominations here are detestable religious practices of the nations.", "Israel must not study them in order to copy them."];
  else if (/pass through the fire/.test(lower)) opening = ["Passing a son or daughter through the fire refers to a pagan child-sacrifice ritual.", "Israel must not imitate worship that destroys life."];
  else if (/useth divination/.test(lower)) opening = ["Divination means trying to gain hidden knowledge by forbidden spiritual means.", "Guidance may not be sought this way in Israel."];
  else if (/observer of times/.test(lower)) opening = ["An observer of times tries to read lucky moments, omens, or signs for guidance.", "Israel is not to treat the future as something decoded by superstition."];
  else if (/enchanter, or a witch/.test(lower)) opening = ["An enchanter or witch uses spells, sorcery, or occult power.", "The phrase rejects magical control as a source of help."];
  else if (/charmer, or a consulter with familiar spirits/.test(lower)) opening = ["A charmer uses binding spells, and a consulter with familiar spirits seeks spirit contact.", "Israel must not cross into forbidden spiritual mediation."];
  else if (/wizard, or a necromancer/.test(lower)) opening = ["A wizard or necromancer seeks knowledge from the dead or the spirit world.", "The law shuts that door completely."];
  else if (/all that do these things are an abomination/.test(lower)) opening = ["The line gives God's verdict on all those occult practices together.", "They are not harmless customs but things He detests."];
  else if (/because of these abominations/.test(lower)) opening = ["The nations are being driven out for these abominations.", "Israel is warned not to inherit the land and then repeat the same sins."];
  else if (/thou shalt be perfect with the lord thy god/.test(lower)) opening = ["Perfect here means wholehearted and undivided toward the LORD.", "Israel is being called to loyal trust rather than spiritual mixture."];
  else if (/these nations hearkened unto observers of times/.test(lower)) opening = ["Hearkened means listened to and followed.", "The nations took guidance from diviners, but Israel must not."];
  else if (/let me not hear again the voice/.test(lower)) opening = ["This recalls Israel's fear at Sinai when God spoke from the fire.", "The people knew direct exposure to that holiness terrified them."];
  else if (/great fire any more/.test(lower)) opening = ["The great fire is the blazing holy presence at Sinai.", "Israel asked not to face that terrifying display again."];
  else if (/that i die not/.test(lower)) opening = ["The people feared they would die under direct exposure to God's holy voice and fire.", "This explains why they asked for a mediator."];
  else if (/they have well spoken/.test(lower)) opening = ["God approves the people's request for mediated speech.", "Their fear at Sinai becomes the setting for true prophecy."];
  else if (/i will raise them up a prophet/.test(lower)) opening = ["God Himself promises to appoint a prophet for the people.", "True prophecy begins with His initiative, not human ambition."];
  else if (/like unto thee/.test(lower)) opening = ["Like unto thee means like Moses in being God's appointed spokesman.", "The people will receive God's words through a mediator they must hear."];
  else if (/i will put my words in his mouth/.test(lower)) opening = ["This means the prophet speaks God's message, not his own invention.", "His authority depends on words given by the LORD."];
  else if (/i will require it of him/.test(lower)) opening = ["God will hold the listener accountable for refusing His prophet.", "Ignoring a true word from God is not a small matter."];
  else if (/if thou say in thine heart/.test(lower)) opening = ["The question begins inside the hearer who wants to know if a prophet is real.", "Moses makes room for testing instead of blind acceptance."];
  else if (/how shall we know/.test(lower)) opening = ["This asks how ordinary people can recognize a false prophet.", "The law gives a practical test rather than leaving Israel helpless."];
  else if (/if the thing follow not/.test(lower)) opening = ["If the thing follow not means the announced word does not happen.", "A failed prediction exposes the claim."];
  else if (/nor come to pass/.test(lower)) opening = ["Come to pass means actually happen in history.", "Truth is tested by whether the word is fulfilled."];
  else if (/spoken it presumptuously/.test(lower)) opening = ["Presumptuously means speaking with bold self-claim instead of divine commission.", "The prophet has stepped beyond what God gave."];
  else if (/not be afraid of him/.test(lower)) opening = ["Israel must not be intimidated by a false prophet's confidence or claims.", "Failure of the word removes the prophet's authority."];
  else if (/cut off the nations/.test(lower)) opening = ["Cut off means remove the nations from the land under judgment.", "Israel is entering territory God has cleared by His own verdict."];
  else if (/dwellest in their cities, and in their houses/.test(lower)) opening = ["Israel will inherit actual homes and towns already standing in the land.", "The warning about justice begins in a place of received gift."];
  else if (/separate three cities for thee/.test(lower) && section.reference === "Deuteronomy 19:1-3") opening = ["These cities are set apart as places of refuge.", "They keep a killing case from turning into instant revenge."];
  else if (/separate three cities for thee/.test(lower) && section.reference === "Deuteronomy 19:6-7") opening = ["Moses repeats the refuge-city command because the danger of rushed vengeance is real.", "The repeated line keeps protection for the accidental slayer in view."];
  else if (/prepare thee a way/.test(lower)) opening = ["Prepare a way means keep the route to the refuge city open and usable.", "Access to justice must be practical, not merely theoretical."];
  else if (/divide the coasts of thy land/.test(lower)) opening = ["The land is divided so refuge is reachable from every region.", "Distance must not keep an innocent person from safety."];
  else if (/every slayer may flee thither/.test(lower)) opening = ["A slayer here is a person who has caused a death.", "The city gives him a place of protection until the case is known."];
  else if (/which the lord thy god giveth thee to inherit/.test(lower)) opening = ["The land is described as a gift and inheritance from God.", "Israel must build its justice system inside a land it received, not merely seized."];
  else if (/this is the case of the slayer/.test(lower)) opening = ["Case here means the kind of situation the refuge law is talking about.", "Moses now defines who may flee there."];
  else if (/which shall flee thither/.test(lower)) opening = ["Flee thither means run to the refuge city for protection.", "The flight is part of preserving life until judgment can be made."];
  else if (/that he may live/.test(lower)) opening = ["The purpose of the refuge city is to keep the person alive while the case is handled.", "The law is designed to stop rash blood vengeance."];
  else if (/killeth his neighbour ignorantly/.test(lower)) opening = ["Ignorantly means without intending to kill.", "The law distinguishes accident from hatred and murder."];
  else if (/whom he hated not in time past/.test(lower)) opening = ["This phrase looks for the absence of prior hatred.", "It helps show the death was not planned."];
  else if (/head slippeth from the helve/.test(lower)) opening = ["The helve is the handle of an axe.", "The example shows an accidental death caused by a tool flying loose."];
  else if (/lighteth upon his neighbour/.test(lower)) opening = ["Lighteth upon means the falling axe head strikes the other person.", "The death happens without murderous intent."];
  else if (/avenger of the blood pursue the slayer/.test(lower)) opening = ["The avenger of blood is the relative who seeks justice for the dead.", "The refuge city keeps anger from deciding the case too quickly."];
  else if (/while his heart is hot/.test(lower)) opening = ["A hot heart means burning anger.", "The law recognizes how grief and rage can rush a person into vengeance."];
  else if (/because the way is long/.test(lower)) opening = ["If the road is too long, the slayer may be caught before reaching safety.", "That is why the refuge system must be accessible."];
  else if (/and slay him/.test(lower)) opening = ["The danger is that the avenger kills the slayer before the case is judged.", "The law tries to prevent that unjust outcome."];
  else if (/whereas he was not worthy of death/.test(lower)) opening = ["Not worthy of death means the killing was accidental, not capital murder.", "The law refuses to treat every death as the same kind of guilt."];
  else if (/inasmuch as he hated him not in time past/.test(lower)) opening = ["Again Moses points to the absence of prior hatred as evidence.", "The refuge law depends on this distinction."];
  else if (/enlarge thy coast/.test(lower)) opening = ["Enlarge thy coast means expand Israel's territory in fulfillment of God's promise.", "If the land grows, the refuge system must grow with it."];
  else if (/as he hath sworn unto thy fathers/.test(lower)) opening = ["This points back to God's oath to the fathers.", "The justice system is being shaped in expectation of promised blessing."];
  else if (/to love the lord thy god/.test(lower)) opening = ["Love here means covenant loyalty, not bare feeling.", "Obedience and affection toward God belong together."];
  else if (/walk ever in his ways/.test(lower)) opening = ["To walk in His ways means live by His character and commands continually.", "Expanded refuge comes in the setting of sustained obedience."];
  else if (/add three cities more/.test(lower)) opening = ["The number of refuge cities increases if the land increases.", "Justice must expand with the nation's growth."];
  else if (/innocent blood be not shed/.test(lower)) opening = ["Innocent blood means wrongful death that should not happen.", "A careless justice system can make the land guilty too."];
  else if (/that blood be not upon thee/.test(lower)) opening = ["Blood upon thee means bloodguilt resting on the nation.", "Israel is responsible to structure justice carefully."];
  else if (/if any man hate his neighbour/.test(lower)) opening = ["Now Moses turns from accident to deliberate hatred.", "This is no longer the case of protected manslaughter."];
  else if (/lie in wait for him/.test(lower)) opening = ["Lie in wait means hide and plan for an attack.", "The phrase marks premeditated violence."];
  else if (/smite him mortally/.test(lower)) opening = ["Mortally means with a fatal blow.", "This is intentional killing, not mishap."];
  else if (/fleeth into one of these cities/.test(lower)) opening = ["A murderer might try to misuse the refuge city.", "The city is not a shelter for planned bloodshed."];
  else if (/elders of his city shall send and fetch him thence/.test(lower)) opening = ["The local elders must remove the murderer from false refuge.", "Justice is not allowed to hide behind the refuge system."];
  else if (/thine eye shall not pity him/.test(lower)) opening = ["Pity must not erase justice in a murder case.", "Compassion cannot excuse deliberate bloodshed."];
  else if (/that it may go well with thee/.test(lower)) opening = ["The people's well-being is tied to removing bloodguilt rightly.", "Justice serves the health of the whole land."];
  else if (/false witness rise up/.test(lower)) opening = ["A false witness is someone who gives lying testimony in court.", "Moses treats words in judgment as a life-and-death matter."];
  else if (/testify against him that which is wrong/.test(lower)) opening = ["Wrong here means a false charge meant to harm another person.", "The law names slander in court as serious evil."];
  else if (/both the men, between whom the controversy is/.test(lower)) opening = ["The two parties in the dispute must appear for judgment.", "The case is handled openly, not by rumor alone."];
  else if (/shall stand before the lord/.test(lower)) opening = ["Standing before the LORD means the trial is held under His authority.", "Court is not merely a human transaction."];
  else if (/before the priests and the judges/.test(lower)) opening = ["Priests and judges together represent authorized public judgment.", "The case belongs before recognized leaders."];
  else if (/judges shall make diligent inquisition/.test(lower)) opening = ["Diligent inquisition means careful investigation.", "Judges must search the facts instead of deciding quickly."];
  else if (/if the witness be a false witness/.test(lower)) opening = ["The court must determine whether the witness lied.", "Truthfulness of testimony is itself on trial here."];
  else if (/testified falsely against his brother/.test(lower)) opening = ["The lie is not abstract; it is aimed at harming a fellow Israelite.", "False testimony becomes an act against a brother."];
  else if (/then shall ye do unto him/.test(lower)) opening = ["The false witness receives the penalty he tried to bring on another.", "The law turns the planned harm back on the liar."];
  else if (/thought to have done unto his brother/.test(lower)) opening = ["The punishment matches the harm he intended.", "Justice exposes the moral weight of deceptive testimony."];
  else if (/put the evil away/.test(lower)) opening = ["The goal is to purge evil from the community.", "False witness is treated as something that corrupts the whole people."];
  else if (/those which remain shall hear/.test(lower)) opening = ["The community is meant to hear about the judgment.", "Public justice teaches the nation."];
  else if (/and fear$/.test(lower)) opening = ["Fear here means sober restraint after seeing justice done.", "The sentence is meant to deter repetition."];
  else if (/henceforth commit no more/.test(lower)) opening = ["The judgment is meant to stop the same evil from spreading again.", "Justice has a protective purpose for the future."];
  else if (/thine eye shall not pity/.test(lower) && section.reference === "Deuteronomy 19:20-21") opening = ["Compassion must not cancel measured justice once guilt is clear.", "The court is not allowed to soften a sentence by sentiment."];
  else if (/life shall go for life/.test(lower)) opening = ["This is the principle of measured justice.", "The penalty must fit the harm rather than exceed it."];
  else if (/eye for eye/.test(lower)) opening = ["The phrase states proportional justice, not uncontrolled revenge.", "Punishment must be matched and limited by the actual injury."];
  else if (/goest out to battle against thine enemies/.test(lower) && section.chapter === 20) opening = ["Moses now speaks to Israel at the threshold of battle.", "War too must be entered under God's word."];
  else if (/horses, and chariots, and a people more than thou/.test(lower)) opening = ["These are the visible reasons Israel might feel outmatched.", "The law names military fear before answering it."];
  else if (/be not afraid of them/.test(lower)) opening = ["The command forbids fear from ruling the people in battle.", "Israel must remember who fights with them."];
  else if (/the lord thy god is with thee/.test(lower)) opening = ["God's presence is the answer to military anxiety.", "The people are not sent into battle alone."];
  else if (/priest shall approach and speak unto the people/.test(lower)) opening = ["The priest speaks before the battle to frame it theologically.", "Courage is formed by hearing God's truth."];
  else if (/let not your hearts faint/.test(lower)) opening = ["A faint heart is a collapsing inner courage.", "Moses addresses fear at its inward source."];
  else if (/lord your god is he that goeth with you/.test(lower)) opening = ["God is described as the One who goes with Israel into battle.", "Victory is not grounded first in numbers."];
  else if (/officers shall speak further/.test(lower)) opening = ["After the priest speaks, the officers handle practical readiness.", "Spiritual courage and orderly procedure work together."];
  else if (/fearful and fainthearted/.test(lower)) opening = ["This is the man whose fear could spread through the ranks.", "He is sent home so panic does not weaken others."];
  else if (/let him go and return unto his house/.test(lower)) opening = ["The fearful man is dismissed from the battle line.", "The law takes the contagion of fear seriously."];
  else if (/captains of the armies shall lead the people/.test(lower)) opening = ["Once the exemptions are handled, the commanders take charge.", "The army moves forward in ordered ranks."];
  else if (/comest nigh unto a city to fight/.test(lower)) opening = ["This concerns a city outside the specially doomed Canaanite peoples.", "The first approach is not immediate destruction."];
  else if (/proclaim peace unto it/.test(lower)) opening = ["Israel must offer terms of peace before attacking such a city.", "War is not the first move in every case."];
  else if (/make thee answer of peace/.test(lower)) opening = ["An answer of peace means the city accepts the offered terms.", "The response changes what follows."];
  else if (/open unto thee/.test(lower)) opening = ["Opening the city means yielding instead of resisting.", "Peace is shown by submission rather than siege."];
  else if (/tributaries unto thee/.test(lower)) opening = ["Tributaries are people placed under forced service or labor duty.", "The city survives, but under Israel's rule."];
  else if (/if it will make no peace/.test(lower)) opening = ["Refusal of peace leads to siege.", "Moses distinguishes between willing surrender and continued war."];
  else if (/will make war against thee/.test(lower)) opening = ["The city's answer is active resistance.", "That turns the encounter into open war."];
  else if (/then thou shalt besiege it/.test(lower)) opening = ["Besiege means surround and pressure the city until it falls.", "This is a prolonged military action, not a quick raid."];
  else if (/smite every male thereof/.test(lower)) opening = ["The adult fighting male population receives the sword after conquest.", "The law is describing severe warfare judgment."];
  else if (/women, and the little ones, and the cattle/.test(lower)) opening = ["These are not treated the same way as the fighting males in this case.", "The law distinguishes groups within the conquered city."];
  else if (/all the spoil of the city/.test(lower)) opening = ["Spoil means the goods and possessions taken after victory.", "What remains becomes plunder for Israel."];
  else if (/cities which are very far off/.test(lower)) opening = ["These rules apply to distant cities, not the named Canaanite peoples.", "Moses keeps the categories distinct."];
  else if (/of the cities of these people/.test(lower)) opening = ["Now the law turns to the nations under unique judgment in the land.", "These cities are treated differently from distant cities."];
  else if (/save alive nothing that breatheth/.test(lower)) opening = ["This is total destruction language under divine judgment.", "Israel is not being left free to make private exceptions."];
  else if (/utterly destroy them/.test(lower)) opening = ["Utterly destroy means place them under complete judgment.", "The command is severe because the corruption in view is severe."];
  else if (/hittites, and the amorites, and the canaanites/.test(lower)) opening = ["The named peoples are examples of the nations under this judgment.", "The command is targeted, not random."];
  else if (/perizzites, the hivites, and the jebusites/.test(lower)) opening = ["The list continues the peoples inhabiting the land.", "Israel must hear the command as specific and bounded."];
  else if (/as the lord thy god hath commanded thee/.test(lower)) opening = ["The severity of the action rests on God's explicit command, not Israel's impulse.", "This is treated as obedience, not private revenge."];
  else if (/teach you not to do after all their abominations/.test(lower)) opening = ["The stated reason is moral and religious protection.", "Israel must not learn the abominations of the peoples it replaces."];
  else if (/besiege a city a long time/.test(lower)) opening = ["A long siege creates pressure to strip the land bare.", "The law steps in to limit that destruction."];
  else if (/not destroy the trees thereof/.test(lower)) opening = ["Fruit trees are not to be cut down recklessly during siege.", "The army must not consume tomorrow's food supply in anger."];
  else if (/for thou mayest eat of them/.test(lower)) opening = ["The tree is spared because it provides food.", "Its future usefulness matters even in wartime."];
  else if (/tree of the field is man's life/.test(lower)) opening = ["The point is that fruit trees sustain human life.", "They are not enemy soldiers to be attacked."];
  else if (/trees which thou knowest that they be not trees for meat/.test(lower)) opening = ["Non-fruit trees may be cut for siege works.", "The law distinguishes between food-bearing and non-food-bearing trees."];
  else if (/if one be found slain in the land/.test(lower)) opening = ["This is the case of a murdered person found in the open land.", "Even when the killer is unknown, the bloodshed cannot be ignored."];
  else if (/it be not known who hath slain him/.test(lower)) opening = ["The killer's identity is hidden, but the bloodguilt problem remains.", "Unknown guilt still demands public response."];
  else if (/elders and thy judges shall measure/.test(lower)) opening = ["The leaders measure distances to identify the nearest city.", "Responsibility must be located carefully."];
  else if (/which city is next unto the slain man/.test(lower)) opening = ["The nearest city bears the ritual responsibility.", "Proximity matters in answering the bloodguilt."];
  else if (/elders of that city shall take an heifer/.test(lower)) opening = ["An heifer is a young cow used in this special ritual.", "The nearest city must provide it."];
  else if (/which hath not been wrought with/.test(lower)) opening = ["This means the heifer has not been used for common labor.", "An unused animal is set apart for the ritual."];
  else if (/bring down the heifer unto a rough valley/.test(lower)) opening = ["The rough valley is an uncultivated place chosen for the rite.", "The setting marks the seriousness of the unresolved bloodshed."];
  else if (/priests the sons of levi shall come near/.test(lower)) opening = ["The priests come near because the matter is handled before God.", "Bloodguilt is not only a civil concern."];
  else if (/bless in the name of the lord/.test(lower)) opening = ["Blessing in the LORD's name is priestly speech under divine authority.", "The ritual is carried out with sacred oversight."];
  else if (/every controversy and every stroke be tried/.test(lower)) opening = ["Controversy and stroke refer to disputes and injury cases brought for judgment.", "The priests have a recognized role in these weighty matters."];
  else if (/elders of that city shall wash their hands/.test(lower)) opening = ["Hand washing here is a public sign of innocence in the killing.", "The leaders deny responsibility before the LORD."];
  else if (/our hands have not shed this blood/.test(lower)) opening = ["The elders formally declare they did not commit the bloodshed.", "The statement is part of clearing the community publicly."];
  else if (/be merciful, o lord, unto thy people israel/.test(lower)) opening = ["The prayer asks God to cover the guilt hanging over the land.", "Mercy is needed even when the killer is unknown."];
  else if (/put away the guilt of innocent blood/.test(lower)) opening = ["The ritual aims to remove bloodguilt from the community.", "Unanswered innocent blood cannot simply be left in the land."];
  else if (/goest forth to war against thine enemies/.test(lower) && section.chapter === 21) opening = ["This law begins in the context of military victory and captives.", "Even there, desire is not left without boundaries."];
  else if (/seest among the captives a beautiful woman/.test(lower)) opening = ["The phrase names the moment of desire after war.", "Moses regulates what might otherwise become raw exploitation."];
  else if (/hast a desire unto her/.test(lower)) opening = ["Desire is acknowledged, but it is not treated as self-justifying.", "The law places restraint between desire and possession."];
  else if (/bring her home to thine house/.test(lower)) opening = ["She must be brought into the house under a legal process, not treated as battlefield spoil.", "The action moves toward household accountability."];
  else if (/shave her head, and pare her nails/.test(lower)) opening = ["These acts mark a visible transition out of her former condition.", "The law slows the process and changes the moment."];
  else if (/bewail her father and her mother a full month/.test(lower)) opening = ["She is given a full month to mourn her parents and her loss.", "The law recognizes grief before marriage is allowed."];
  else if (/let her go whither she will/.test(lower)) opening = ["If the man will not keep her as wife, she must be released free.", "He may not turn her humiliation into a sale."];
  else if (/if a man have two wives/.test(lower)) opening = ["The law addresses a divided household where affection is unequal.", "Inheritance must not be governed by preference."];
  else if (/one beloved, and another hated/.test(lower)) opening = ["Hated here means the less-loved or rejected wife, not necessarily constant hostility.", "The difference in affection creates legal pressure around the children."];
  else if (/have born him children/.test(lower)) opening = ["The issue becomes urgent because sons have been born to both women.", "Inheritance rights now have to be settled truthfully."];
  else if (/firstborn son be hers that was hated/.test(lower)) opening = ["The true firstborn may belong to the less-loved wife.", "The father's feelings do not erase birth order."];
  else if (/may not make the son of the beloved firstborn/.test(lower)) opening = ["The father is forbidden to rewrite firstborn status out of favoritism.", "Love for one wife cannot overturn the legal truth."];
  else if (/acknowledge the son of the hated for the firstborn/.test(lower)) opening = ["Acknowledge means publicly recognize the true firstborn.", "Justice in the family begins with telling the truth about who came first."];
  else if (/double portion/.test(lower)) opening = ["The double portion is the larger inheritance share owed to the firstborn son.", "The privilege follows status, not preference."];
  else if (/stubborn and rebellious son/.test(lower)) opening = ["This is not ordinary childish disobedience but hardened, ongoing rebellion.", "The law is addressing a son who refuses correction."];
  else if (/will not obey the voice of his father or his mother/.test(lower)) opening = ["The son rejects both parental authorities, not just one.", "His rebellion is settled rather than momentary."];
  else if (/when they have chastened him/.test(lower)) opening = ["Chastened means disciplined or corrected.", "The case assumes prior attempts to restore him."];
  else if (/he will not hearken unto them/.test(lower)) opening = ["Hearken means listen with response.", "Even after discipline, he still refuses to yield."];
  else if (/father and his mother lay hold on him/.test(lower)) opening = ["The parents together bring the matter forward.", "This is a public legal step, not private rage."];
  else if (/bring him out unto the elders of his city/.test(lower)) opening = ["The case goes to the elders at the gate for communal judgment.", "The household does not execute justice by itself."];
  else if (/glutton, and a drunkard/.test(lower)) opening = ["These words describe wasteful, uncontrolled living.", "The son is marked by destructive appetite as well as rebellion."];
  else if (/sin worthy of death/.test(lower)) opening = ["The person has already been judged worthy of execution.", "The hanging that follows is connected to an established death sentence."];
  else if (/hang him on a tree/.test(lower)) opening = ["Hanging on a tree is a public display of curse and shame after judgment.", "It is not permission to leave the body there indefinitely."];
  else if (/body shall not remain all night/.test(lower)) opening = ["The corpse may not stay exposed overnight.", "Judgment has a time limit on public display."];
  else if (/bury him that day/.test(lower)) opening = ["Even the executed person must be buried the same day.", "The law preserves the land from ongoing defilement."];
  else if (/hanged is accursed of god/.test(lower)) opening = ["The hanging marks the person as under curse and judgment.", "The shame of the act is theological, not merely social."];
  else if (/land be not defiled/.test(lower)) opening = ["Leaving the body exposed would defile the land.", "Israel's inheritance must not be polluted by ignored bloodguilt."];
  else if (/lord thy god giveth thee for an inheritance/.test(lower)) opening = ["The land is repeatedly called God's gift and Israel's inheritance.", "That gift must be kept from defilement."];

  return note([
    opening[0],
    opening[1],
    getDay52LeadSupport(cleanTitle),
    ...getDay52Support(cleanTitle).slice(0, 3),
  ]);
}

function getDay53Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/brother's ox|sheep go astray|lost thing|raiment|hide thyself/.test(lower)) return ["🤝 Love of neighbor includes ordinary property", "🏠 Responsibility may require temporary care", "👀 Need must not be ignored", "💪 Mercy is active, not distant"];
  if (/bird's nest|\bdam\b|young ones|eggs|let the dam go|prolong thy days/.test(lower)) return ["🪺 God cares how life is taken and preserved", "🐦 The command limits needless destruction", "🫀 Mercy reaches small creatures too", "😊 Obedience is tied to blessing"];
  if (/divers seeds|plow with an ox and an ass|garment of divers sorts|fringes|vesture/.test(lower)) return ["🧵 Israel is taught to keep distinctions visible", "🚫 Mixing is limited in daily life", "🙌 Holiness reaches ordinary habits", "👀 The body and field both carry reminders"];
  if (/wife|evil name|maid|tokens|elders|betrothed|damsel|humbled|virginity|field|city|shekels of silver|put her away/.test(lower)) return ["⚖️ Sexual matters are handled as covenant justice", "🗣️ Accusation and consent both matter", "🏙️ Place and circumstance affect the case", "💍 Marriage is not treated lightly"];
  if (/usury|lend upon usury|money|victuals|thing that is lent/.test(lower)) return ["🤝 Brotherly life must not feed on exploitation", "💰 Profit has moral limits", "🏠 Need within the covenant is treated differently", "🙌 Blessing should not become predatory gain"];
  if (/congregation of the lord|ammonite|moabite|edomite|egyptian|tenth generation|stranger in his land/.test(lower)) return ["👥 The covenant assembly has guarded boundaries", "🧠 Israel is told to remember past treatment", "🤝 Kinship and history both matter", "🚫 Nearness to God's people is not casual"];
  if (/host goeth forth|uncleanness|camp|paddle|ease thyself|cover that which cometh from thee|walketh in the midst of thy camp|camp be holy/.test(lower)) return ["🏕️ God's presence shapes the camp", "🧼 Uncleanness and waste are handled carefully", "🚶 The LORD is pictured as walking among His people", "🙏 Holiness reaches even private acts"];
  if (/escaped servant|dwell with thee|choose|oppress him/.test(lower)) return ["🏃 Refuge is protected here", "🏠 The vulnerable servant is not returned to harm", "🤝 Israel must make room for him", "🚫 Power may not be used to crush him"];
  if (/whore|sodomite|hire of a whore|price of a dog|house of the lord|abomination/.test(lower)) return ["🚫 Sexual corruption must not be normalized", "🏛️ Worship may not be funded by defilement", "🤢 God rejects polluted offerings", "🙌 Holiness guards both body and worship"];
  if (/vow a vow|slack to pay|sin in thee|gone out of thy lips/.test(lower)) return ["🗣️ Spoken promises to God are binding", "⏱️ Delay becomes disobedience here", "⚖️ Words can become guilt", "🙌 Worship includes truthful follow-through"];
  if (/vineyard|grapes|vessel|ears with thine hand/.test(lower)) return ["🍇 Neighborly access is allowed within limits", "✋ Hunger may be met without turning into harvest", "🚫 Permission is not ownership", "🤝 Generosity and restraint are both taught"];
  if (/bill of divorcement|uncleanness in her|another man's wife|former husband|abomination before the lord/.test(lower)) return ["📜 Divorce is treated as a serious legal matter", "💍 Marriage bonds are not to be cycled carelessly", "🚫 The woman is not a reusable possession", "⚖️ The law limits disorder after separation"];
  if (/leprosy|observe diligently|priests the levites|miriam/.test(lower)) return ["🦠 Uncleanness laws must be taken seriously", "👂 The priestly teaching is to be followed carefully", "🧠 Miriam is a warning remembered", "🙌 Holiness is not casual"];
  if (/lend thy brother|pledge|stand abroad|sleep with his pledge|raiment/.test(lower)) return ["🚪 Lending must respect the poor person's dignity", "🧥 Basic coverings may not be withheld cruelly", "🤝 Debt does not erase neighbor-love", "🌙 Mercy considers the debtor's night as well as the lender's right"];
  if (/hired servant|his hire|sun go down|setteth his heart upon it|cry against thee|sin unto thee/.test(lower)) return ["💼 Wages belong to the worker without delay", "💓 The poor depend on that pay immediately", "🗣️ Economic injustice reaches God", "⚖️ Delay can become sin"];
  if (/hired servant|his hire|sun go down|setteth his heart upon it|cry against thee|sin unto thee/.test(lower)) return ["💼 Wages belong to the worker without delay", "💓 The poor depend on that pay immediately", "🗣️ Economic injustice reaches God", "⚖️ Delay can become sin"];
  if (/stranger|fatherless|widow|bondman in egypt|redeemed thee thence|olive tree|glean/.test(lower)) return ["🤝 Vulnerable people must be protected and fed", "🧠 Israel's Egypt memory shapes its mercy", "🌾 Harvest leaves room for the needy", "🙌 Redemption is meant to become generosity"];
  if (/worthy to be beaten|judge|forty stripes|not exceed|brother should seem vile/.test(lower)) return ["⚖️ Punishment is measured, not unlimited", "👨‍⚖️ The judge must keep discipline proportionate", "🚫 Justice may not become degradation", "🤝 Even the guilty man remains your brother"];
  if (/brethren dwell together|die|have no child|brother's wife|name be not put out of israel|shoe loosed/.test(lower)) return ["🕯️ A dead brother's name is to be preserved", "👪 Family duty reaches inheritance and offspring", "🏛️ Refusal becomes a public shame matter", "👞 The shoe rite marks the refusal visibly"];
  if (/men strive together|taketh him by the secrets|cut off her hand/.test(lower)) return ["⚖️ Even in a fight there are forbidden acts", "🚫 Rescue has limits that may not be crossed", "✂️ The penalty shows the seriousness of the violation", "🫀 Bodily harm matters under God's law"];
  if (/divers weights|divers measures|perfect and just weight|unrighteously/.test(lower)) return ["⚖️ Trade must be honest in hidden details", "👜 Bag and house both must be truthful", "✅ God cares about fair measurement", "🤢 Cheating is treated as abomination"];
  if (/amalek|hindmost|feeble behind thee|faint and weary|feared not god|blot out|not forget/.test(lower)) return ["🧠 Israel must remember attacks on the weak", "😫 Amalek struck the exhausted and exposed", "🚫 Godlessness showed itself in cruelty", "⚔️ Judgment is tied to remembered evil"];

  return ["📜 Moses is teaching everyday faithfulness", "🫀 Ordinary choices still belong under God's covenant", "🙌 The LORD rules daily life", "⚖️ Mercy and holiness stay together"];
}

function getDay53LeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/brother's ox|sheep go astray|lost thing|raiment|hide thyself/.test(lower)) return "🤝 Neighbor-love must become practical help";
  if (/bird's nest|\bdam\b|young ones|eggs/.test(lower)) return "🪺 Mercy reaches small living things";
  if (/divers seeds|ox and an ass|garment of divers sorts|fringes/.test(lower)) return "🧵 God trains Israel through visible distinctions";
  if (/wife|betrothed|damsel|virgin|evil name|tokens|humbled/.test(lower)) return "⚖️ Sexual wrongs are judged carefully";
  if (/congregation of the lord|ammonite|moabite|edomite|egyptian/.test(lower)) return "👥 Nearness to the covenant assembly is treated seriously";
  if (/camp|uncleanness|paddle|cover|walketh in the midst/.test(lower)) return "🏕️ God's presence shapes the whole camp";
  if (/escaped servant|oppress him/.test(lower)) return "🏃 Protection matters more than returning a vulnerable servant";
  if (/whore|sodomite|house of the lord|abomination/.test(lower)) return "🚫 Worship may not be joined to sexual corruption";
  if (/usury|lend upon usury|money|victuals|thing that is lent/.test(lower)) return "🤝 Brotherly care must not become profit-taking";
  if (/vow|slack to pay|gone out of thy lips/.test(lower)) return "🗣️ God hears what you promise";
  if (/vineyard|grapes|ears with thine hand|vessel/.test(lower)) return "🍇 Shared provision still has limits";
  if (/divorcement|former husband|another man's wife/.test(lower)) return "📜 Separation does not erase moral order";
  if (/leprosy|miriam/.test(lower)) return "🦠 Holiness laws are to be remembered carefully";
  if (/pledge|stand abroad|raiment/.test(lower)) return "🚪 Debt must not trample dignity";
  if (/hired servant|his hire|sun go down|setteth his heart upon it|cry against thee|sin unto thee/.test(lower)) return "💼 The worker's wage cannot wait";
  if (/stranger|fatherless|widow|glean|olive tree/.test(lower)) return "🌾 Harvest must leave room for the needy";
  if (/stranger|fatherless|widow|glean|olive tree/.test(lower)) return "🌾 Harvest must leave room for the needy";
  if (/forty stripes|worthy to be beaten|brother should seem vile/.test(lower)) return "⚖️ Justice has a stopping point";
  if (/brethren dwell together|brother's wife|name be not put out|shoe loosed/.test(lower)) return "🕯️ Family duty includes preserving a brother's name";
  if (/men strive together|cut off her hand/.test(lower)) return "✂️ Even rescue can cross forbidden lines";
  if (/divers weights|divers measures|perfect and just weight/.test(lower)) return "⚖️ God cares about fairness in trade";
  if (/amalek|feeble behind thee|not forget/.test(lower)) return "🧠 Remembered evil still matters before God";

  return "📌 One phrase carries a real covenant lesson";
}

function explainDay53DeuteronomyAt95(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This phrase names one ordinary part of covenant life.", "Moses is showing that everyday conduct still belongs to the LORD."];

  if (/brother's ox or his sheep go astray/.test(lower)) opening = ["Go astray means wander off and become lost.", "The law begins with a neighbor's property in danger."];
  else if (/hide thyself from them/.test(lower)) opening = ["Hide thyself means pretend not to see the problem.", "Israel is forbidden to look away from a neighbor's loss."];
  else if (/bring it unto thine own house/.test(lower)) opening = ["The animal or item is to be kept safely until the owner can receive it back.", "Help may require real inconvenience and care."];
  else if (/do with his raiment/.test(lower)) opening = ["Raiment means clothing.", "The same duty applies to smaller lost possessions too."];
  else if (/all lost thing of thy brother's/.test(lower)) opening = ["Lost thing widens the rule beyond livestock or clothing.", "Anything found belonging to a brother falls under this duty."];
  else if (/which he hath lost, and thou hast found/.test(lower)) opening = ["Finding another person's loss creates a responsibility, not an opportunity.", "The phrase turns discovery into neighbor-duty."];
  else if (/thou mayest not hide thyself/.test(lower)) opening = ["This repeats the command so indifference cannot excuse itself.", "Refusal to help is treated as a real wrong."];
  else if (/bird's nest chance to be before thee/.test(lower)) opening = ["Chance to be before thee means you come upon the nest unexpectedly.", "The law addresses a small moment a traveler might meet on the road."];
  else if (/any tree, or on the ground/.test(lower)) opening = ["The nest may be in a tree or on the ground.", "Where it is found does not change the command."];
  else if (/young ones, or eggs/.test(lower)) opening = ["The nest may contain chicks or eggs.", "The rule applies at either stage of fragile life."];
  else if (/dam sitting upon the young/.test(lower)) opening = ["The dam is the mother bird.", "Her presence matters to how the nest is handled."];
  else if (/not take the dam with the young/.test(lower)) opening = ["The command forbids taking the mother bird together with the offspring.", "The act is limited so destruction is not total."];
  else if (/let the dam go/.test(lower)) opening = ["The mother bird must be released.", "The law requires restraint even where taking the young is allowed."];
  else if (/it may be well with thee/.test(lower)) opening = ["Blessing is attached to this small act of obedient restraint.", "God treats mercy in little things as meaningful."];
  else if (/sow thy vineyard with divers seeds/.test(lower)) opening = ["Divers seeds means mixed kinds of seed.", "The vineyard is not to be planted with a confused mixture."];
  else if (/plow with an ox and an ass together/.test(lower)) opening = ["An ox and an ass are different animals with unequal strength and gait.", "The command forbids yoking unlike creatures together."];
  else if (/garment of divers sorts/.test(lower)) opening = ["A garment of divers sorts is a mixed-fabric garment named in the law.", "Israel's clothing too is made to show distinction."];
  else if (/make thee fringes/.test(lower)) opening = ["Fringes are tassel-like edges worn on the garment.", "They serve as visible covenant reminders on ordinary clothing."];
  else if (/if any man take a wife/.test(lower)) opening = ["The law begins with a husband making a serious accusation after marriage.", "Marriage disputes here are treated publicly, not privately."];
  else if (/go in unto her, and hate her/.test(lower)) opening = ["Go in unto her means consummate the marriage.", "The hatred that follows becomes the setting for a damaging accusation."];
  else if (/occasions of speech against her/.test(lower)) opening = ["Occasions of speech means grounds for a public charge.", "The husband is trying to shape how others speak about her."];
  else if (/bring up an evil name upon her/.test(lower)) opening = ["An evil name is a ruined public reputation.", "The accusation is treated as a serious injury to the woman and her family."];
  else if (/i took this woman/.test(lower)) opening = ["The husband's claim is stated plainly before the elders.", "He is accusing the bride of lacking virginity at marriage."];
  else if (/then shall the father of the damsel, and her mother, take and bring forth the tokens/.test(lower)) opening = ["The tokens are the evidence brought by the parents in answer to the charge.", "The case depends on public proof, not bare suspicion."];
  else if (/elders of the city in the gate/.test(lower)) opening = ["The gate is the place of public judgment.", "The matter is handled before recognized leaders."];
  else if (/amerce him in an hundred shekels/.test(lower)) opening = ["Amerce means fine or penalize.", "The slanderer pays a heavy public penalty."];
  else if (/unto the father of the damsel/.test(lower)) opening = ["The money goes to the woman's father because the accusation damaged his household too.", "The law treats slander as a family injury, not only a private quarrel."];
  else if (/evil name upon a virgin of israel/.test(lower)) opening = ["The phrase names the wrong as public disgrace placed on a covenant daughter.", "The law refuses to treat reputation damage lightly."];
  else if (/she shall be his wife/.test(lower) && section.reference === "Deuteronomy 22:19-19") opening = ["The husband remains bound to the marriage he tried to damage.", "He is not allowed to use slander as a path to discard her."];
  else if (/may not put her away all his days/.test(lower) && section.reference === "Deuteronomy 22:19-19") opening = ["Put her away means divorce her.", "The man loses the option to send her off later."];
  else if (/may not put her away all his days/.test(lower) && section.reference === "Deuteronomy 22:28-29") opening = ["After this act, the man is forbidden to dismiss the woman later by divorce.", "The law binds him to a permanent consequence."];
  else if (/damsel's father shall say unto the elders/.test(lower)) opening = ["The father now speaks publicly before the elders in defense of his daughter.", "The household answers the accusation in the place of judgment."];
  else if (/he hateth her/.test(lower)) opening = ["The father's speech repeats the husband's hostility as part of the case.", "The law exposes hatred as a driver of the accusation."];
  else if (/if this thing be true/.test(lower)) opening = ["Now Moses turns to the case where the charge is actually true.", "The outcome changes because the facts are different."];
  else if (/tokens of virginity be not found/.test(lower)) opening = ["The absence of tokens means the charge is confirmed rather than answered.", "The proof does not support the woman."];
  else if (/wrought folly in israel/.test(lower)) opening = ["Folly in Israel means a disgraceful covenant wrong, not mere silliness.", "The phrase marks the act as morally serious."];
  else if (/put evil away from among you/.test(lower) && section.reference === "Deuteronomy 22:20-21") opening = ["The goal is to purge evil from the community.", "Judgment is tied to protecting Israel's moral life."];
  else if (/betrothed unto an husband/.test(lower)) opening = ["Betrothed means legally pledged for marriage, not casually dating.", "The woman is already under a binding marriage promise."];
  else if (/find her in the city/.test(lower)) opening = ["The city setting matters because help could have been nearby.", "Place affects how the case is judged."];
  else if (/lie with her/.test(lower) && section.reference === "Deuteronomy 22:23-24") opening = ["The act is treated here as a sexual violation of an already-bound woman.", "The city's setting shapes the legal conclusion."];
  else if (/stone them with stones/.test(lower)) opening = ["Stoning is the public death penalty under the law.", "The sentence shows the severity of the offense."];
  else if (/because she cried not/.test(lower)) opening = ["Her silence in the city is treated as evidence because rescue could have been sought.", "The law is reasoning from the circumstance of the place."];
  else if (/humbled his neighbour's wife/.test(lower)) opening = ["Humbled means sexually violated or dishonored her.", "The betrothed woman is spoken of as the neighbor's wife because the pledge is already binding."];
  else if (/so thou shalt put away evil from among you/.test(lower)) opening = ["The repeated sentence shows that this sexual wrong is treated as communal evil, not private drama.", "The judgment is meant to remove corruption from Israel's life."];
  else if (/find a betrothed damsel in the field/.test(lower)) opening = ["The field setting changes the case because help is not near.", "Moses now distinguishes forced assault from the city case."];
  else if (/force her/.test(lower)) opening = ["Force marks the act as coercion, not consent.", "That changes who bears guilt."];
  else if (/man only that lay with her shall die/.test(lower)) opening = ["Only the man dies because only he is counted guilty here.", "The law explicitly separates her from his crime."];
  else if (/no sin worthy of death/.test(lower)) opening = ["The woman bears no capital guilt in this case.", "The phrase clears her completely."];
  else if (/as when a man riseth against his neighbour, and slayeth him/.test(lower)) opening = ["The comparison is to murder.", "Moses treats the violent assault as a crime of that seriousness."];
  else if (/even so is this matter/.test(lower)) opening = ["The point is that this case must be understood like a violent attack, not mutual consent.", "The comparison controls the judgment."];
  else if (/found her in the field/.test(lower)) opening = ["In the field there may be no one to hear or rescue her.", "The setting supports her innocence."];
  else if (/damsel that is a virgin, which is not betrothed/.test(lower)) opening = ["Now the woman is unmarried and not under a betrothal pledge.", "That makes this a different legal case again."];
  else if (/lay hold on her/.test(lower)) opening = ["Lay hold on her means seize her.", "The phrase describes forceful taking."];
  else if (/lie with her/.test(lower) && section.reference === "Deuteronomy 22:28-29") opening = ["The act creates a binding legal consequence for the man.", "The law does not treat it as a casual encounter."];
  else if (/they be found/.test(lower)) opening = ["Be found means the matter becomes known publicly.", "This is not left hidden from communal judgment."];
  else if (/fifty shekels of silver/.test(lower)) opening = ["Fifty shekels is the required payment to the woman's father.", "The law imposes a fixed financial penalty."];
  else if (/she shall be his wife/.test(lower) && section.reference === "Deuteronomy 22:28-29") opening = ["The man is bound to the woman he violated.", "He may not treat the act as something he can walk away from."];
  else if (/wounded in the stones/.test(lower)) opening = ["This phrase refers to severe injury to a man's private parts.", "The law is speaking about exclusion from the congregation."];
  else if (/privy member cut off/.test(lower)) opening = ["Privy member is an older way of speaking about the male sexual organ.", "The phrase continues the bodily condition in view."];
  else if (/bastard shall not enter/.test(lower)) opening = ["The word here names a restricted birth-status under the law's assembly rules.", "The focus is entrance into the congregation of the LORD."];
  else if (/tenth generation/.test(lower)) opening = ["Tenth generation expresses a long-lasting exclusion, not a small delay.", "The phrase emphasizes how serious the boundary is."];
  else if (/ammonite or moabite shall not enter/.test(lower)) opening = ["Ammon and Moab are named with a lasting exclusion from the assembly.", "Moses ties this to their history toward Israel."];
  else if (/met you not with bread and with water/.test(lower)) opening = ["Their sin included refusing basic aid on Israel's journey.", "Hospitality was withheld in a time of need."];
  else if (/hired against thee balaam/.test(lower)) opening = ["They hired Balaam to curse Israel.", "Hostility went beyond neglect into spiritual attack."];
  else if (/seek their peace nor their prosperity/.test(lower)) opening = ["Israel is forbidden to pursue their welfare politically or covenantally in this context.", "The command preserves the memory of their hostile acts."];
  else if (/not abhor an edomite/.test(lower)) opening = ["Abhor means hate with disgust or treat as detestable.", "Edom is not to be regarded that way."];
  else if (/he is thy brother/.test(lower)) opening = ["Edom is linked to Israel through kinship descending from Esau.", "Family history affects how Israel must remember him."];
  else if (/not abhor an egyptian/.test(lower)) opening = ["Egypt too is not to be treated with permanent disgust here.", "Israel's memory is more complex than one-note hatred."];
  else if (/stranger in his land/.test(lower)) opening = ["Israel once lived in Egypt as a resident people in another land.", "That memory shapes this command."];
  else if (/host goeth forth against thine enemies/.test(lower)) opening = ["The camp in wartime must still stay holy.", "Battle does not suspend God's standards."];
  else if (/keep thee from every wicked thing/.test(lower)) opening = ["The command widens beyond one act to overall camp purity.", "Warfare is not an excuse for moral looseness."];
  else if (/not clean by reason of uncleanness/.test(lower)) opening = ["Unclean here means ceremonially unfit for the camp's holy setting.", "The issue is not ordinary dirt but ritual uncleanness."];
  else if (/go abroad out of the camp/.test(lower)) opening = ["The unclean person must step outside the camp for a time.", "Distance protects the camp's holiness."];
  else if (/when evening cometh on he shall wash himself/.test(lower)) opening = ["Washing marks the process of becoming clean again.", "The timing matters within the law's pattern."];
  else if (/sun is down he shall come into the camp again/.test(lower)) opening = ["Reentry comes after the required waiting and washing.", "Holiness includes a defined path back."];
  else if (/he shall not come within the camp/.test(lower)) opening = ["For a time the unclean man must stay outside the camp boundary.", "Distance protects the holy space until cleansing is complete."];
  else if (/have a place also without the camp/.test(lower)) opening = ["A designated place outside the camp is required.", "Even bodily waste is handled intentionally."];
  else if (/paddle upon thy weapon/.test(lower)) opening = ["The paddle is a digging tool carried with the soldier's gear.", "The law turns sanitation into part of camp equipment."];
  else if (/ease thyself abroad/.test(lower)) opening = ["Ease thyself is an older way of speaking about relieving oneself.", "The phrase addresses a basic bodily act directly."];
  else if (/cover that which cometh from thee/.test(lower)) opening = ["The waste is to be buried and covered.", "The camp is not to be left exposed to impurity."];
  else if (/lord thy god walketh in the midst of thy camp/.test(lower)) opening = ["God is pictured as moving among His people in the camp.", "That presence explains the strictness of the commands."];
  else if (/to deliver thee, and to give up thine enemies before thee/.test(lower)) opening = ["God's presence in the camp is tied to protection and victory.", "The army's safety is linked to the holiness of the camp."];
  else if (/camp be holy/.test(lower)) opening = ["Holy means set apart for God's presence.", "The camp must match the God who dwells among it."];
  else if (/not deliver unto his master the servant which is escaped/.test(lower)) opening = ["The escaped servant is not to be handed back to the master he fled.", "Protection overrides simple return."];
  else if (/he shall dwell with thee/.test(lower)) opening = ["The servant is allowed to stay among Israel.", "Refuge includes an actual place to live."];
  else if (/place which he shall choose/.test(lower)) opening = ["He may live where he chooses within Israel's towns.", "The law gives him agency in his resettlement."];
  else if (/not oppress him/.test(lower)) opening = ["The escaped servant must not be exploited once received.", "Protection continues after shelter is given."];
  else if (/no whore of the daughters of israel/.test(lower)) opening = ["The command forbids covenant daughters from becoming cultic prostitutes.", "Sexual defilement is being kept out of Israel."];
  else if (/nor a sodomite of the sons of israel/.test(lower)) opening = ["This refers to a male participant in sexual corruption tied to pagan worship.", "The prohibition covers both sexes."];
  else if (/hire of a whore|price of a dog/.test(lower)) opening = ["These are earnings from sexual corruption brought as an offering.", "God rejects money gained that way."];
  else if (/abomination unto the lord/.test(lower) && section.reference === "Deuteronomy 23:17-18") opening = ["God calls both the practice and its offering detestable.", "Worship is not cleansed by attaching holy language to polluted gain."];
  else if (/lend upon usury to thy brother/.test(lower)) opening = ["Usury here means interest charged on a loan.", "A covenant brother is not to be treated as a profit source."];
  else if (/usury of money/.test(lower)) opening = ["The rule reaches ordinary money loans.", "Financial need may not be turned into interest-taking from a brother."];
  else if (/usury of victuals/.test(lower)) opening = ["Victuals means food or provisions.", "Even loans of food are covered by this limit."];
  else if (/any thing that is lent upon usury/.test(lower)) opening = ["The law closes loopholes by widening the category.", "Anything loaned for interest falls under the prohibition."];
  else if (/unto a stranger thou mayest lend upon usury/.test(lower)) opening = ["The outsider is treated differently from the covenant brother in this law.", "Moses marks a distinction in economic obligations."];
  else if (/unto thy brother thou shalt not lend upon usury/.test(lower)) opening = ["Brotherhood puts a limit on profit-taking.", "The poor within Israel are not to be commercially exploited."];
  else if (/when thou shalt vow a vow/.test(lower)) opening = ["A vow is a spoken promise made to God.", "Once said, it cannot be treated lightly."];
  else if (/not slack to pay it/.test(lower)) opening = ["Slack means delay carelessly.", "Postponement in this case becomes disobedience."];
  else if (/it would be sin in thee/.test(lower)) opening = ["The guilt does not lie in silence but in failing to fulfill what was vowed.", "Words to God can become moral debt."];
  else if (/gone out of thy lips/.test(lower)) opening = ["What you said with your mouth must be carried through in action.", "Speech and obedience are joined here."];
  else if (/into thy neighbour's vineyard/.test(lower)) opening = ["A traveler may satisfy present hunger from a neighbor's vineyard.", "The law allows immediate need to be met."];
  else if (/eat grapes thy fill/.test(lower)) opening = ["Thy fill means enough to satisfy hunger.", "Permission is generous for present eating."];
  else if (/not put any in thy vessel/.test(lower)) opening = ["A vessel would turn hunger relief into taking produce away.", "The boundary keeps eating from becoming harvesting."];
  else if (/pluck the ears with thine hand/.test(lower)) opening = ["A person may pluck grain by hand for immediate use.", "Again the law allows eating without granting ownership."];
  else if (/man hath taken a wife, and married her/.test(lower)) opening = ["The law begins after a real marriage has been formed.", "What follows concerns a formal separation process."];
  else if (/found some uncleanness in her/.test(lower)) opening = ["Uncleanness here is the stated ground used in the divorce process.", "The phrase does not treat marriage dissolution as casual."];
  else if (/write her a bill of divorcement/.test(lower)) opening = ["A bill of divorcement is a written certificate of separation.", "The law requires formality and clarity."];
  else if (/send her out of his house/.test(lower)) opening = ["The woman leaves with a legal document rather than mere expulsion.", "The separation is publicly defined."];
  else if (/become another man's wife/.test(lower)) opening = ["The law assumes she may enter a second marriage.", "That new bond matters for what the first husband may later do."];
  else if (/former husband may not take her again/.test(lower)) opening = ["The first husband cannot reclaim her after she has belonged to another marriage.", "She is not treated like recyclable property."];
  else if (/abomination before the lord/.test(lower) && section.reference === "Deuteronomy 24:1-4") opening = ["That return-marriage is called an abomination.", "The law blocks a cycle that would defile the land."];
  else if (/plague of leprosy/.test(lower)) opening = ["Leprosy here refers to a serious skin impurity handled by priestly law.", "The warning is to treat that law with care."];
  else if (/observe diligently/.test(lower)) opening = ["Observe diligently means obey with close attention.", "The matter is not to be handled loosely."];
  else if (/priests the levites shall teach you/.test(lower)) opening = ["The priests are the authorized teachers in this impurity matter.", "Israel is told to submit to their instruction."];
  else if (/remember what the lord thy god did unto miriam/.test(lower)) opening = ["Miriam's punishment on the journey becomes a warning memory.", "Israel is told not to forget how seriously God treated defilement and rebellion."];
  else if (/lend thy brother any thing/.test(lower)) opening = ["Lending creates an obligation, but not permission for intrusion.", "The borrower keeps a measure of household dignity."];
  else if (/not go into his house to fetch his pledge/.test(lower)) opening = ["The lender may not walk into the poor man's house to seize the pledge himself.", "Need does not erase the borrower's personal space."];
  else if (/stand abroad/.test(lower)) opening = ["The lender waits outside instead of invading the house.", "Respectful distance is part of the command."];
  else if (/sleep with his pledge/.test(lower)) opening = ["If the pledge is a needed covering, it must be returned for the night.", "Collateral may not become cruelty."];
  else if (/oppress an hired servant/.test(lower)) opening = ["Oppress here means exploit or withhold what is due.", "The worker's weakness is not to be used against him."];
  else if (/whether he be of thy brethren, or of thy strangers/.test(lower)) opening = ["The rule covers both Israelite and resident foreign worker.", "Poverty makes the command broad rather than narrow."];
  else if (/at his day thou shalt give him his hire/.test(lower)) opening = ["His hire means his wages.", "They are to be paid on the day they are owed."];
  else if (/sun go down upon it/.test(lower)) opening = ["The wage must not be carried past sundown unpaid.", "Delay becomes a real wrong because the worker depends on it."];
  else if (/he is poor, and setteth his heart upon it/.test(lower)) opening = ["The worker's heart is set on the wage because he needs it to live.", "The law looks at dependence, not only contract."];
  else if (/cry against thee unto the lord/.test(lower)) opening = ["The oppressed worker may cry to God over withheld pay.", "Economic wrong is presented as something God hears."];
  else if (/it be sin unto thee/.test(lower)) opening = ["Failing the poor worker in this way becomes sin before God.", "Unpaid wages are treated as moral guilt, not a minor delay."];
  else if (/shalt not pervert the judgment of the stranger/.test(lower)) opening = ["Pervert judgment means twist justice away from what is right.", "The outsider's case must not be bent because he is vulnerable."];
  else if (/nor of the fatherless/.test(lower)) opening = ["The fatherless child is named because lack of protection invites abuse.", "The law speaks directly for the exposed."];
  else if (/widow's raiment to pledge/.test(lower)) opening = ["A widow's garment is not to be seized as collateral.", "Her vulnerability limits what may be taken from her."];
  else if (/remember that thou wast a bondman in egypt/.test(lower) && section.reference === "Deuteronomy 24:17-18") opening = ["Israel's own slavery is the moral memory behind the law.", "Redeemed people must not become oppressors."];
  else if (/lord thy god redeemed thee thence/.test(lower)) opening = ["God's redemption from Egypt is given as the reason for mercy.", "Past rescue must shape present justice."];
  else if (/beatest thine olive tree/.test(lower)) opening = ["Beating the olive tree was a way of knocking fruit down for gathering.", "The harvest process itself is being limited."];
  else if (/not go over the boughs again/.test(lower)) opening = ["The gatherer may not strip the branches a second time.", "Something must be left behind."];
  else if (/stranger, for the fatherless, and for the widow/.test(lower)) opening = ["The remainder belongs to vulnerable people.", "Harvest has mercy built into it."];
  else if (/gatherest the grapes of thy vineyard/.test(lower)) opening = ["The vineyard too is harvested under mercy limits.", "Abundance is not treated as permission to take every last bit."];
  else if (/not glean it afterward/.test(lower)) opening = ["Glean afterward means go back for leftovers.", "The owner must stop before the field is emptied."];
  else if (/remember that thou wast a bondman in the land of egypt/.test(lower) && section.reference === "Deuteronomy 24:20-22") opening = ["Again Egypt is recalled so generosity will not dry up.", "Redemption is meant to leave a memory-shaped harvest."];
  else if (/wicked man be worthy to be beaten/.test(lower)) opening = ["The beating happens only after guilt is established.", "Punishment is not random but judicial."];
  else if (/judge shall cause him to lie down/.test(lower)) opening = ["The judge oversees the punishment directly.", "Discipline stays under authority, not private rage."];
  else if (/beaten before his face/.test(lower)) opening = ["Before his face means in the judge's sight.", "The punishment is monitored, not hidden."];
  else if (/according to his fault, by a certain number/.test(lower)) opening = ["The number of stripes must match the offense.", "Measured justice is the point."];
  else if (/forty stripes he may give him/.test(lower)) opening = ["Forty sets the upper limit.", "Even deserved punishment has a boundary."];
  else if (/not exceed/.test(lower)) opening = ["The punisher may not go beyond the set limit.", "Justice must stop where God says stop."];
  else if (/brother should seem vile unto thee/.test(lower)) opening = ["Even the punished wrongdoer remains thy brother.", "Discipline may not turn into public degradation."];
  else if (/brethren dwell together/.test(lower)) opening = ["This case begins with brothers living in the same family setting.", "The law is about preserving a dead brother's line."];
  else if (/one of them die, and have no child/.test(lower)) opening = ["The problem is a dead brother with no heir.", "Without action, his name and property line would disappear."];
  else if (/wife of the dead shall not marry without unto a stranger/.test(lower)) opening = ["Without unto a stranger means outside the family line.", "Her remarriage is restricted by this duty."];
  else if (/husband's brother shall go in unto her/.test(lower)) opening = ["The brother-in-law is assigned the marriage duty.", "The union serves family continuity, not romance language."];
  else if (/firstborn which she beareth shall succeed in the name of his brother/.test(lower)) opening = ["The child carries forward the dead brother's name and line.", "The law protects remembrance inside Israel."];
  else if (/name be not put out of israel/.test(lower)) opening = ["Put out means disappear from Israel's line and memory.", "The duty is about preserving that name."];
  else if (/man like not to take his brother's wife/.test(lower)) opening = ["Now Moses addresses refusal of the brother-duty.", "The law gives a public way to mark that refusal."];
  else if (/go up to the gate unto the elders/.test(lower)) opening = ["The gate is again the place of public judgment.", "Family refusal becomes a communal matter."];
  else if (/refuseth to raise up unto his brother a name/.test(lower)) opening = ["Raise up a name means preserve the dead brother's line.", "The widow states the failure publicly."];
  else if (/i like not to take her/.test(lower)) opening = ["The man openly confirms his refusal.", "The shame follows from a declared unwillingness."];
  else if (/loose his shoe/.test(lower)) opening = ["Removing the shoe becomes the public sign of refusal.", "The symbol marks surrendered duty."];
  else if (/spit in his face/.test(lower)) opening = ["Spitting is an act of public shame.", "The refusal is treated as dishonorable."];
  else if (/house of him that hath his shoe loosed/.test(lower)) opening = ["The man's household receives a lasting shame-name from the act.", "The title preserves the memory of the refusal."];
  else if (/men strive together one with another/.test(lower)) opening = ["The case begins in the middle of a fight between men.", "What follows addresses intervention during that struggle."];
  else if (/wife of the one draweth near/.test(lower)) opening = ["The wife steps in to rescue her husband.", "The law does not assume every attempt to help is permitted."];
  else if (/putteth forth her hand/.test(lower)) opening = ["The gesture is deliberate physical intervention.", "The method she uses is what the law judges."];
  else if (/taketh him by the secrets/.test(lower)) opening = ["The secrets is an older way of referring to the man's private parts.", "The act is treated as a serious bodily violation."];
  else if (/cut off her hand/.test(lower)) opening = ["The penalty shows that even in rescue there are forbidden injuries.", "The law marks this bodily assault as severe."];
  else if (/not have in thy bag divers weights/.test(lower)) opening = ["Divers weights means two different standards used dishonestly in trade.", "The bag can hide cheating as easily as open theft."];
  else if (/not have in thine house divers measures/.test(lower)) opening = ["The house-stored measuring tools must also be honest.", "Private trade equipment is under God's eye."];
  else if (/perfect and just weight shalt thou have/.test(lower)) opening = ["Perfect and just means full, accurate, and fair.", "Business honesty is named as covenant obedience."];
  else if (/do unrighteously are an abomination/.test(lower)) opening = ["Cheating in measurement is called an abomination.", "God treats hidden economic fraud as morally detestable."];
  else if (/remember what amalek did unto thee/.test(lower)) opening = ["Israel is commanded to keep Amalek's attack in memory.", "The event is not to fade into a vague past."];
  else if (/met thee by the way/.test(lower)) opening = ["Amalek attacked Israel on the journey itself.", "The location highlights vulnerability on the road."];
  else if (/smote the hindmost of thee/.test(lower)) opening = ["The hindmost are the stragglers at the rear.", "Amalek struck those least able to defend themselves."];
  else if (/all that were feeble behind thee/.test(lower)) opening = ["Feeble means weak, worn down, and exposed.", "The attack targeted the exhausted rather than the strong."];
  else if (/he feared not god/.test(lower)) opening = ["His actions revealed no fear of God.", "Cruelty toward the weak is named as godless."];
  else if (/blot out the remembrance of amalek/.test(lower)) opening = ["Blot out means remove the enduring memory and standing of Amalek under judgment.", "The command is a sentence against remembered evil."];
  else if (/not forget it/.test(lower)) opening = ["The command ends by forbidding forgetfulness.", "Moral memory is part of covenant obedience."];

  return note([
    opening[0],
    opening[1],
    getDay53LeadSupport(cleanTitle),
    ...getDay53Support(cleanTitle).slice(0, 3),
  ]);
}

function getDay54Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/basket|firstfruits|land which the lord|place which the lord shall choose|set it before the lord|bow down/.test(lower)) return ["🧺 Worship begins with received gifts", "🌾 Firstfruits confess God as giver", "📍 Giving happens before the LORD", "🙌 Gratitude becomes a practiced act"];
  if (/egyptians|evil entreated|cried unto the lord|brought us forth|mighty hand|stretched out arm/.test(lower)) return ["🧠 Israel retells its rescue story", "🗣️ Deliverance is confessed, not assumed", "💪 God saved with power", "🙌 Worship remembers redemption"];
  if (/brought us into this place|land that floweth with milk and honey|rejoice in every good thing/.test(lower)) return ["🎁 The land is received as gift", "🏞️ Promise has become place", "😊 God's goodness is meant to be enjoyed", "👥 Joy is shared before Him"];
  if (/year of tithing|levite|stranger|fatherless|widow|i have brought away the hallowed things/.test(lower)) return ["🌾 Tithing supports holy and vulnerable people", "🤝 Giving must reach those without security", "📜 The giver publicly confesses obedience", "🙌 Worship includes generous provision"];
  if (/avouched|peculiar people|set thee on high|walk in his ways|keep his statutes/.test(lower)) return ["👑 Covenant identity is being declared", "🤝 Israel and the LORD are bound in public commitment", "📜 Obedience belongs to belonging", "🌍 A holy people is being set apart"];
  if (/stones|plaster|write upon them|mount ebal|altar|burnt offerings|peace offerings/.test(lower)) return ["🪨 The law is made visible in the land", "🔥 Altar and law stand together", "📜 Entry into the land requires covenant memory", "🙌 Worship and obedience are not separated"];
  if (/this day thou art become the people|hearken|gerizim|ebal|levites shall speak|amen|cursed be/.test(lower)) return ["👂 Israel must hear and answer the covenant", "📣 Blessing and curse are spoken publicly", "🏔️ The land receives a covenant witness", "⚖️ Sin is named before the whole people"];
  if (/blessed shalt thou|come to pass|hearken diligently|commandments/.test(lower)) return ["🌾 Blessing is tied to covenant obedience", "👂 Listening is more than hearing sounds", "🙌 God's favor fills ordinary life", "📜 The commands shape the outcome"];
  if (/cursed shalt thou|cursing|vexation|rebuke|consume thee|heaven.*brass|earth.*iron/.test(lower)) return ["⚠️ Curse is covenant judgment, not bad luck", "🌫️ Daily life collapses under disobedience", "☁️ Creation itself is pictured as closing against them", "📜 Refusal of God's word has consequences"];
  if (/go out one way|flee seven ways|betroth a wife|build an house|plant a vineyard|grope at noonday|mad for the sight/.test(lower)) return ["😞 The curse reaches plans, work, and safety", "🏃 What should be stable turns against them", "🫀 Fear and frustration invade daily life", "⚖️ Judgment becomes personal and public"];
  if (/bring thee.*king|serve other gods|olive shall cast|sons and daughters|locust|stranger.*above thee/.test(lower)) return ["🌍 Disobedience ends in loss and reversal", "⬇️ Israel is brought low instead of lifted up", "🧒 Family and harvest are both struck", "🚫 Idolatry leads toward exile"];
  if (/servedst not the lord thy god with joyfulness|hunger|thirst|yoke of iron|nation against thee|eagle flieth/.test(lower)) return ["😢 Joyless service becomes part of the charge", "⛓️ Refusing God leads to harsher masters", "🦅 Invasion is described as fast and severe", "🏰 Siege is covenant curse reaching the city"];
  if (/eat the fruit of thine own body|toward her children|want of all things/.test(lower)) return ["😨 The siege curses reach horrifying extremes", "🥀 Judgment strips away natural tenderness", "🏚️ Want becomes unbearable", "⚠️ These warnings are meant to terrify before they happen"];
  if (/glorious and fearful name|wonderful plagues|few in number|rejoiced over you to do you good/.test(lower)) return ["😨 The LORD's name is treated with fearful holiness", "🩺 Plagues are pictured as covenant blows", "📉 Population and joy can be reversed", "📜 The warnings press the seriousness of disobedience"];
  if (/scatter thee|among all people|find no ease|trembling heart|egypt again with ships/.test(lower)) return ["🌍 Exile is the far edge of covenant curse", "🫀 Rest disappears among the nations", "⛓️ The return-to-Egypt image means total reversal", "🚫 The end of disobedience is bondage, not freedom"];
  if (/eyes have seen|heart to perceive|ears to hear|forty years|raiment waxed not old|sihon|og/.test(lower)) return ["🧠 Israel has seen much but still needs an obedient heart", "🥾 The wilderness years are evidence of God's care", "👂 Seeing signs does not guarantee understanding", "📜 Moses is pressing them to respond now"];
  if (/stand this day|captains|little ones|stranger that is in thy camp|enter into covenant|not with you only/.test(lower)) return ["🤝 The whole people are gathered into covenant", "👥 Rank and age do not remove responsibility", "📜 The oath binds the nation together", "🫀 This moment reaches beyond the present listeners"];
  if (/abominations|idols|root that beareth gall and wormwood|bless himself in his heart|i shall have peace/.test(lower)) return ["🌱 Secret rebellion can grow into public ruin", "🚫 Idolatry begins in the heart before the shrine", "🫀 Self-blessing under sin is exposed", "⚠️ Hidden roots still bear bitter fruit"];
  if (/not spare him|separate him unto evil|stranger.*far land|brimstone and salt|why hath the lord done thus/.test(lower)) return ["🔥 Covenant breaking leaves visible ruin", "🌍 Future generations will ask what happened", "⚖️ The answer is covenant abandonment", "🗣️ Judgment becomes a warning witness"];
  if (/secret things belong unto the lord|revealed things belong unto us/.test(lower)) return ["🔐 God keeps some things to Himself", "📖 What He has revealed is enough for obedience", "👨‍👩‍👧 Covenant life rests on known words, not secret ones", "🙌 Humility and obedience belong together"];

  return ["📜 Moses is renewing the covenant before the land", "🫀 Blessing and curse are being placed before Israel", "🙌 The LORD's words govern the future", "⚖️ Covenant life is public and serious"];
}

function getDay54LeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/basket|firstfruits|land which the lord|milk and honey|rejoice in every good thing/.test(lower)) return "🧺 Gratitude must take visible form";
  if (/egyptians|cried unto the lord|mighty hand|stretched out arm/.test(lower)) return "🗣️ Worship retells God's rescue";
  if (/year of tithing|levite|stranger|fatherless|widow/.test(lower)) return "🌾 Holy giving must reach real people";
  if (/avouched|peculiar people|set thee on high/.test(lower)) return "👑 Covenant identity is being spoken aloud";
  if (/stones|plaster|mount ebal|altar|peace offerings/.test(lower)) return "🪨 The covenant is made visible in the land";
  if (/gerizim|ebal|levites shall speak|amen|cursed be/.test(lower)) return "📣 The whole nation must answer the covenant";
  if (/blessed shalt thou|hearken diligently|commandments/.test(lower)) return "🌾 Blessing follows covenant obedience";
  if (/cursed shalt thou|cursing|vexation|rebuke/.test(lower)) return "⚠️ Curse is the other side of the covenant";
  if (/go out one way|flee seven ways|grope at noonday|betroth a wife|build an house/.test(lower)) return "😞 Judgment reaches daily life";
  if (/servedst not the lord thy god with joyfulness|yoke of iron|eagle flieth/.test(lower)) return "😢 Joyless worship is part of the warning";
  if (/eat the fruit of thine own body|toward her children/.test(lower)) return "😨 The warning is meant to shock the hearer";
  if (/glorious and fearful name|wonderful plagues|few in number/.test(lower)) return "😨 The LORD's holiness is not light";
  if (/scatter thee|find no ease|trembling heart|egypt again/.test(lower)) return "🌍 Exile is pictured as covenant reversal";
  if (/heart to perceive|ears to hear|forty years|raiment waxed not old/.test(lower)) return "🧠 Seeing God's works still requires a changed heart";
  if (/stand this day|captains|little ones|not with you only/.test(lower)) return "🤝 The covenant gathers everyone";
  if (/gall and wormwood|bless himself in his heart|i shall have peace/.test(lower)) return "🌱 Hidden rebellion still bears fruit";
  if (/why hath the lord done thus|brimstone and salt|separate him unto evil/.test(lower)) return "🔥 Judgment becomes a public warning";
  if (/secret things belong unto the lord|revealed things belong unto us/.test(lower)) return "🔐 God has not hidden what we need to obey";

  return "📌 One phrase carries a real covenant lesson";
}

function getDay54FallbackOpening(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], cleanTitle: string) {
  const summary = summarizeDay51Title(cleanTitle) || "this line";

  if (section.chapter === 26 && section.reference === "Deuteronomy 26:1-4") return [`This line adds another step to Israel's firstfruits offering in the land: ${summary}.`, "The worship act is being described piece by piece so gratitude becomes concrete."];
  if (section.chapter === 26 && section.reference === "Deuteronomy 26:6-8") return [`This line adds another part of Israel's slavery-and-rescue confession: ${summary}.`, "The people retell what Egypt was like so the LORD's deliverance is not forgotten."];
  if (section.chapter === 26 && section.reference === "Deuteronomy 26:9-11") return [`This line adds another part of Israel's arrival-and-thanksgiving confession: ${summary}.`, "The gift of the land is being answered with worship and shared joy."];
  if (section.chapter === 26 && section.reference === "Deuteronomy 26:12-13") return [`This line adds another part of the tithe declaration: ${summary}.`, "The worshiper is publicly stating that the holy portion has been given where God commanded."];
  if (section.chapter === 26 && section.reference === "Deuteronomy 26:17-19") return [`This line adds another part of the covenant commitment spoken that day: ${summary}.`, "Israel's identity and obedience are being declared in public terms."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:1-3") return [`This line adds another part of the stone-writing command: ${summary}.`, "The covenant is being carried into the land in visible form."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:4-8") return [`This line adds another part of the Mount Ebal altar command: ${summary}.`, "Law, altar, and entry into the land are being held together."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:9-10") return [`This line adds another part of the day's covenant charge: ${summary}.`, "Israel is being addressed as the LORD's people and told to obey accordingly."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:11-13") return [`This line assigns another part of the blessing-and-curse ceremony: ${summary}.`, "The covenant is being staged across the land in a public way."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:14-15") return [`This line adds another feature of the idol-maker curse: ${summary}.`, "The people must hear that hidden false worship still brings covenant judgment."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:20-23") return [`This line adds another example from the sexual-sin curses: ${summary}.`, "The repeated curse formula shows that these acts are all treated as covenant defilement."];
  if (section.chapter === 27 && section.reference === "Deuteronomy 27:24-25") return [`This line adds another example from the hidden-violence curses: ${summary}.`, "Secret bloodshed and bribed injustice are being named before the whole nation."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:1-2") return [`This line adds another part of the opening blessing promise: ${summary}.`, "Moses is setting obedience and its consequences plainly before Israel."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:3-6") return [`This line adds another ordinary-life blessing: ${summary}.`, "The list keeps showing how fully God's favor could fill Israel's daily world."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:7-10") return [`This line adds another national blessing: ${summary}.`, "Protection, reputation, and stability are being described as gifts from the LORD."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:11-14") return [`This line adds another image of overflowing covenant blessing: ${summary}.`, "Abundance and elevation are being described in concrete terms."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:15-19") return [`This line adds another ordinary-life curse: ${summary}.`, "The blessing list is being answered with its dark reversal."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:20-24") return [`This line adds another image of covenant collapse: ${summary}.`, "The curse is pictured as pressing in through health, land, and sky."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:25-30") return [`This line adds another reversal under judgment: ${summary}.`, "What people expect to enjoy is being turned into loss and frustration."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:31-35") return [`This line adds another humiliating effect of the curse: ${summary}.`, "Judgment is being described as helplessness in broad daylight."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:36-41") return [`This line adds another exile-and-loss warning: ${summary}.`, "The curse keeps reaching into kingship, harvest, and family."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:42-46") return [`This line adds another sign of Israel being brought low: ${summary}.`, "The warning keeps showing blessings reversing into deprivation."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:47-52") return [`This line adds another consequence of refusing joyful service: ${summary}.`, "Moses is tracing the road from ingratitude to siege and bondage."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:53-57") return [`This line adds another horror from the siege curses: ${summary}.`, "The warning is meant to shock the people before such things ever happen."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:58-63") return [`This line adds another reason to fear the LORD's holy name: ${summary}.`, "The covenant warning is pressing the seriousness of belonging to Him."];
  if (section.chapter === 28 && section.reference === "Deuteronomy 28:64-68") return [`This line adds another exile warning: ${summary}.`, "Disobedience is being pictured as total reversal of Israel's rescue story."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:2-4") return [`This line adds another part of Moses' review of what Israel has seen: ${summary}.`, "He is pressing the people to move from witnessed signs to actual understanding."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:5-9") return [`This line adds another wilderness reminder: ${summary}.`, "God's sustaining care is being set before Israel as a reason to obey."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:10-13") return [`This line adds another group or purpose within the covenant assembly: ${summary}.`, "The whole nation is being gathered into one oath before the LORD."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:14-15") return [`This line widens the covenant's reach: ${summary}.`, "Moses insists that the oath is bigger than the people physically standing there."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:16-18") return [`This line adds another warning about hidden idolatry: ${summary}.`, "The bitter root image is being prepared by reminding Israel what it has seen among the nations."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:19-21") return [`This line adds another feature of self-deceived rebellion: ${summary}.`, "The warning is aimed at the person who feels safe while refusing the covenant."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:22-27") return [`This line adds another part of the future explanation of the land's ruin: ${summary}.`, "Moses imagines later generations asking why judgment fell so hard."];
  if (section.chapter === 29 && section.reference === "Deuteronomy 29:28-28") return [`This line closes the covenant warning with a distinction about ${summary}.`, "God keeps some things hidden, but what He has revealed must be obeyed."];

  return [`This line highlights ${summary} inside the covenant warning.`, "Moses is still pressing remembrance and obedience."];
}

function explainDay54DeuteronomyAt95(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = getDay54FallbackOpening(section, cleanTitle);

  if (/it shall be/.test(lower) && section.reference === "Deuteronomy 26:1-4") opening = ["This phrase looks ahead to life settled in the land.", "The worship act that follows belongs to inheritance, not wilderness wandering."];
  else if (/basket/.test(lower)) opening = ["The basket carries the firstfruits brought before the LORD.", "The offering begins with gathered produce from the land."];
  else if (/priest/.test(lower) && section.reference === "Deuteronomy 26:1-4") opening = ["The priest receives the basket as part of the worship act.", "Giving is brought into God's ordered presence."];
  else if (/set it before the altar|before the lord thy god/.test(lower) && section.reference === "Deuteronomy 26:1-4") opening = ["The fruit is set before the LORD, not merely handed over as produce.", "The act turns harvest into worship."];
  else if (/egyptians evil entreated us/.test(lower)) opening = ["Evil entreated means treated harshly and cruelly.", "Israel's confession starts with remembered oppression."];
  else if (/cried unto the lord/.test(lower)) opening = ["The people answered oppression by crying out to God.", "The confession highlights dependence before rescue."];
  else if (/mighty hand|stretched out arm/.test(lower)) opening = ["These phrases describe God's powerful intervention in the exodus.", "Israel was not rescued by its own strength."];
  else if (/brought us into this place/.test(lower)) opening = ["This place means the promised land now actually received.", "The confession moves from rescue to arrival."];
  else if (/milk and honey/.test(lower)) opening = ["A land flowing with milk and honey means a fertile, abundant land.", "The phrase celebrates God's generous promise fulfilled."];
  else if (/rejoice in every good thing/.test(lower)) opening = ["Israel is commanded to enjoy God's gifts with gratitude.", "The land is not only possessed but gratefully received."];
  else if (/year of tithing/.test(lower)) opening = ["The year of tithing is the special year when the stored tithe is distributed locally.", "Giving is directed toward people who need support."];
  else if (/brought away the hallowed things/.test(lower)) opening = ["Hallowed things are the portions set apart for holy use.", "The giver is declaring that the sacred share has been handled rightly."];
  else if (/levite|stranger|fatherless|widow/.test(lower) && section.reference === "Deuteronomy 26:12-13") opening = ["These are the groups meant to receive the tithe's provision.", "The command keeps worship tied to mercy."];
  else if (/avouched/.test(lower)) opening = ["Avouched means publicly declared or affirmed.", "Both the LORD and Israel are being spoken of in covenant terms."];
  else if (/walk in his ways/.test(lower) && section.reference === "Deuteronomy 26:17-19") opening = ["To walk in His ways means live by His character and commands.", "Belonging to God is meant to shape daily conduct."];
  else if (/peculiar people/.test(lower)) opening = ["Peculiar people means a treasured possession belonging to God in a special way.", "Israel's identity is being set apart by covenant."];
  else if (/set thee on high/.test(lower)) opening = ["This means raising Israel above other nations in honor and calling.", "The promise is tied to covenant faithfulness."];
  else if (/moses with the elders/.test(lower)) opening = ["Moses stands with Israel's elders to deliver a public covenant command.", "The law is being handed on with national witness."];
  else if (/write upon them all the words of this law/.test(lower)) opening = ["The law is to be written publicly on stones.", "Israel is meant to carry God's words into the land visibly."];
  else if (/mount ebal|plaster/.test(lower)) opening = ["The plastered stones create a visible writing surface for the law.", "Mount Ebal becomes a covenant memorial place."];
  else if (/altar/.test(lower) && section.reference === "Deuteronomy 27:4-8") opening = ["The altar shows that covenant entry includes sacrifice and worship.", "Law and altar appear together, not separately."];
  else if (/burnt offerings|peace offerings/.test(lower)) opening = ["Burnt offerings and peace offerings mark worship, surrender, and fellowship before God.", "The land is entered with sacrifice and joy."];
  else if (/this day thou art become the people/.test(lower)) opening = ["The phrase marks a covenant moment of public identity.", "Israel is being addressed as a people belonging to the LORD."];
  else if (/hearken/.test(lower) && section.reference === "Deuteronomy 27:9-10") opening = ["Hearken means listen with obedience, not with bare hearing.", "The people's identity requires a responsive ear."];
  else if (/gerizim|ebal/.test(lower)) opening = ["These mountains become the setting for blessing and curse declared over the nation.", "The land itself receives a covenant witness."];
  else if (/levites shall speak/.test(lower) && section.chapter === 27) opening = ["The Levites are appointed to speak the covenant curses aloud.", "The people must hear God's judgments publicly."];
  else if (/cursed be/.test(lower)) opening = ["Cursed be announces a covenant judgment on the named sin.", "These are not casual warnings but solemn declarations."];
  else if (/lieth with his father's wife/.test(lower)) opening = ["This phrase names a sexual sin that uncovers the father's family honor.", "The law treats it as a curse-worthy offense."];
  else if (/smiteth his neighbour secretly|taketh reward to slay an innocent person/.test(lower)) opening = ["The curse reaches hidden violence and bribed bloodshed.", "Secret wrongdoing is still fully seen by God."];
  else if (/it shall come to pass/.test(lower) && section.reference === "Deuteronomy 28:1-2") opening = ["The phrase introduces covenant consequences that will surely follow obedience.", "Moses is not speculating but declaring outcome."];
  else if (/hearken diligently/.test(lower) && section.reference === "Deuteronomy 28:1-2") opening = ["Hearken diligently means careful, sustained obedience.", "Blessing is tied to listening that actually responds."];
  else if (/blessed shalt thou be in the city|field|basket|store|fruit of thy body|kneadingtrough/.test(lower)) opening = ["The blessing list reaches ordinary places, work, and family life.", "God's favor is pictured filling the whole pattern of living."];
  else if (/come out against thee one way|flee before thee seven ways/.test(lower) && section.reference === "Deuteronomy 28:7-10") opening = ["The image is of enemies breaking apart in defeat.", "God's protection reverses the battle line."];
  else if (/plenteous in goods|open unto thee his good treasure|lend unto many nations|head, and not the tail/.test(lower)) opening = ["These promises describe abundance, open provision, and national strength.", "The picture is of life overflowing under God's favor."];
  else if (/cursed shalt thou/.test(lower) && section.reference === "Deuteronomy 28:15-19") opening = ["The curse list mirrors the earlier blessing list, but in reversal.", "What could have flourished now comes under judgment."];
  else if (/cursing|vexation|rebuke/.test(lower)) opening = ["These words describe a life harassed by covenant judgment.", "The curse is pictured as active disruption, not vague sadness."];
  else if (/heaven.*brass|earth.*iron/.test(lower)) opening = ["Brass heaven and iron earth picture closed skies and hardened ground.", "Creation itself is shown refusing to nourish them."];
  else if (/go out one way against them|flee seven ways|betroth a wife|build an house|plant a vineyard/.test(lower)) opening = ["The curse reaches plans people normally expect to enjoy.", "What should have become settled life is frustrated and lost."];
  else if (/grope at noonday|mad for the sight/.test(lower)) opening = ["To grope at noonday means to live in confusion even in broad daylight.", "Judgment is described as disorientation and mental misery."];
  else if (/bring thee, and thy king/.test(lower)) opening = ["The warning extends even to the king, not only to ordinary people.", "No rank can shield the nation from covenant judgment."];
  else if (/locust|olive shall cast his fruit|sons and daughters/.test(lower)) opening = ["Harvest and family are both struck in these warnings.", "The curse empties what people most naturally count on."];
  else if (/stranger that is within thee shall get up above thee/.test(lower)) opening = ["The stranger rising above Israel pictures covenant reversal and humiliation.", "The nation that should have led is brought low."];
  else if (/servedst not the lord thy god with joyfulness/.test(lower)) opening = ["The charge is not only disobedience but joyless service in abundance.", "Ingratitude is exposed inside outward religion."];
  else if (/hunger|thirst|nakedness|want of all things/.test(lower) && section.reference === "Deuteronomy 28:47-52") opening = ["The curse answers refused service to God with servitude under deprivation.", "Need becomes the new master."];
  else if (/yoke of iron/.test(lower)) opening = ["A yoke of iron pictures harsh, crushing bondage.", "The image is the opposite of covenant freedom."];
  else if (/eagle flieth/.test(lower)) opening = ["The invading nation is compared to an eagle for speed and force.", "The warning stresses how suddenly judgment can arrive."];
  else if (/eat the fruit of thine own body/.test(lower)) opening = ["The phrase describes the horror of siege famine at its worst extreme.", "The warning is meant to shock the hearer before such judgment ever comes."];
  else if (/eye shall be evil|toward her children/.test(lower)) opening = ["An evil eye here means cruel, hardened selfishness born from desperation.", "Natural tenderness is pictured being destroyed by siege."];
  else if (/glorious and fearful name/.test(lower)) opening = ["God's name is called glorious and fearful because His holiness is weighty and awesome.", "The warning presses the seriousness of belonging to Him."];
  else if (/wonderful plagues|few in number|rejoiced over you to do you good/.test(lower)) opening = ["The same God who delighted to bless can also bring severe covenant judgment.", "The reversal is meant to sober the nation."];
  else if (/scatter thee among all people|find no ease|trembling heart|egypt again with ships/.test(lower)) opening = ["These lines describe exile, unrest, and total reversal of exodus freedom.", "The end of disobedience is pictured as scattered bondage."];
  else if (/moses called unto all israel/.test(lower)) opening = ["Moses gathers the whole nation to look back before speaking forward.", "The covenant renewal begins with shared memory."];
  else if (/eyes have seen|heart to perceive|ears to hear/.test(lower)) opening = ["The people have seen mighty acts, yet understanding is still named as lacking.", "Miracles alone do not create an obedient heart."];
  else if (/led you forty years|raiment waxed not old|shoe is not waxen old|bread have ye not eaten/.test(lower)) opening = ["The wilderness years are retold as years of God's preserving care.", "Their survival was sustained by Him, not by ordinary provision."];
  else if (/sihon|og/.test(lower)) opening = ["These conquered kings are named as proof of God's help in battle.", "Recent victories are part of Moses' argument for obedience."];
  else if (/stand this day all of you|captains|little ones|stranger that is in thy camp/.test(lower)) opening = ["The whole nation is summoned, from leaders to children to resident outsider.", "No part of Israel stands outside the covenant gathering."];
  else if (/enter into covenant|oath which the lord thy god maketh/.test(lower)) opening = ["The people are entering not only a covenant but also its oath.", "This is a binding, spoken commitment before God."];
  else if (/not with you only/.test(lower)) opening = ["The covenant is described as reaching beyond the people visibly standing there.", "Its claim extends forward, not only sideways."];
  else if (/seen their abominations|idols of wood and stone/.test(lower)) opening = ["Israel has already seen the detestable idols of other nations.", "Moses warns them with images they know firsthand."];
  else if (/root that beareth gall and wormwood/.test(lower)) opening = ["This root is a hidden source that grows bitter and poisonous fruit.", "The image warns that secret rebellion does not stay secret forever."];
  else if (/bless himself in his heart|i shall have peace/.test(lower)) opening = ["The sinner is privately excusing himself while staying in rebellion.", "Self-blessing is exposed as a lie against covenant reality."];
  else if (/not spare him|separate him unto evil/.test(lower)) opening = ["God's refusal to spare means the covenant breaker will not slip past judgment.", "The separation unto evil marks personal exclusion under curse."];
  else if (/stranger that shall come from a far land|why hath the lord done thus unto this land/.test(lower)) opening = ["Future outsiders and descendants will look at the land's ruin and ask why.", "Judgment becomes a visible question to later generations."];
  else if (/brimstone and salt/.test(lower)) opening = ["Brimstone and salt picture a scorched, barren land under curse.", "The land itself becomes a witness of wrath."];
  else if (/secret things belong unto the lord/.test(lower)) opening = ["Some matters remain with God alone and are not given to human control.", "The line teaches humility about what has not been revealed."];
  else if (/revealed things belong unto us and to our children/.test(lower)) opening = ["What God has revealed is the people's lasting inheritance for obedience.", "The focus is on known words, not hidden mysteries."];

  return note([
    opening[0],
    opening[1],
    getDay54LeadSupport(cleanTitle),
    ...getDay54Support(cleanTitle).slice(0, 3),
  ]);
}

function makeExplanation(section: (typeof generatedDeuteronomyFourteenToTwentyNinePersonalSections)[number], title: string) {
  const cleanTitle = stripLeadingEmoji(title);
  if (section.chapter >= 14 && section.chapter <= 17) return explainDay51DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 18 && section.chapter <= 21) return explainDay52DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 22 && section.chapter <= 25) return explainDay53DeuteronomyAt95(section, cleanTitle);
  if (section.chapter >= 26 && section.chapter <= 29) return explainDay54DeuteronomyAt95(section, cleanTitle);
  return makeGenericExplanation(section, title);
}

export const DEUTERONOMY_14_29_PERSONAL_SECTIONS: PersonalSection[] = generatedDeuteronomyFourteenToTwentyNinePersonalSections.map((section) => ({
  ...section,
  title: day54DeuteronomySectionTitles[section.reference] || day53DeuteronomySectionTitles[section.reference] || day52DeuteronomySectionTitles[section.reference] || day51DeuteronomySectionTitles[section.reference] || section.title,
  phrases: (
    day53DeuteronomyCuratedPhraseTitles[section.reference] ||
    day52DeuteronomyCuratedPhraseTitles[section.reference] ||
    day51DeuteronomyCuratedPhraseTitles[section.reference] ||
    section.phrases.map(([title]) => title)
  ).map((title) => [
    title,
    makeExplanation(section, title),
  ] as PersonalPhrase),
}));
