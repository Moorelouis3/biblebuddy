import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type PersonalPhrase = [string, string];
type PersonalSection = PersonalLeviticusPhraseSectionInput;

const note = (lines: string[]) => lines.join("\n\n");

const supplementalDeuteronomyThirtyFourSections: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 34,
    startVerse: 7,
    endVerse: 7,
    reference: "Deuteronomy 34:7",
    title: "🕯️ Moses Was An Hundred And Twenty Years Old",
    icon: "🕯️",
    phrases: [
      ["🕯️ Moses Was An Hundred And Twenty Years Old", note(["Moses' age shows the end of a long, faithful life under God's calling.", "The verse does not make Moses seem weak or forgotten. It shows that his death comes at the end of a complete assignment.", "📆 A full lifetime is shown", "🏔️ His work reaches its final edge", "🕊️ God remains faithful after Moses", "➡️ Israel must continue forward", "The phrase lets the reader feel the weight of transition without thinking God's promise ended with Moses."])],
      ["👁️ His Eye Was Not Dim", note(["Moses is not described as fading away in confusion.", "His sight remains clear, which makes his death feel less like collapse and more like God's appointed closing of his ministry.", "👁️ Clarity remains", "💪 Strength is still present", "⏳ The ending is appointed", "📜 The promise moves beyond him", "Moses' death is not a failure of strength. It is the close of his role before Israel enters the land."])],
      ["💪 Nor His Natural Force Abated", note(["Moses still has strength when his life ends.", "That detail keeps the reader from thinking he dies because he simply wore out. The chapter is showing God's timing.", "💪 Strength had not disappeared", "🕯️ His calling had reached its end", "🏔️ He sees the land but does not enter", "👣 Joshua will lead next", "The transition is sharp: the LORD, not human weakness, decides the next step."])],
      ["🏔️ When He Died", note(["Moses dies before Israel crosses into Canaan.", "This phrase is painful because the leader who carried Israel through the wilderness does not personally enter the land.", "🏜️ The wilderness journey closes", "📜 God's word stands", "🕊️ The promise continues", "➡️ Joshua must lead Israel forward", "The death of Moses teaches that God's mission is bigger than one servant, even a servant as great as Moses."])],
    ],
  },
  {
    chapter: 34,
    startVerse: 8,
    endVerse: 8,
    reference: "Deuteronomy 34:8",
    title: "😭 The Children Of Israel Wept For Moses",
    icon: "😭",
    phrases: [
      ["😭 The Children Of Israel Wept For Moses", note(["Israel's grief shows that Moses was not only a public leader.", "He had carried the people, pleaded for them, taught them, corrected them, and stood between them and judgment.", "😭 The nation mourns", "👤 The leader is gone", "📜 His teaching remains", "➡️ The journey must continue", "The reader should pause and feel the cost of the transition before Joshua steps forward."])],
      ["🏜️ In The Plains Of Moab", note(["The plains of Moab are the waiting place before Canaan.", "Israel mourns Moses on the edge of the promise, not back in Egypt and not yet inside the land.", "🏜️ The wilderness road is ending", "🏞️ Canaan is near", "😭 Moses is mourned", "👣 Israel is about to move", "The location matters because grief and hope stand side by side in this chapter."])],
      ["📆 Thirty Days", note(["Thirty days marks a full period of national mourning.", "Israel does not rush past Moses' death. The people stop long enough to honor the servant God used.", "📆 Grief is given time", "👥 The whole people mourn", "🕊️ Honor is shown", "➡️ A new season waits", "The phrase shows ordered grief: Israel mourns deeply, but mourning will not become permanent paralysis."])],
      ["🕊️ Were Ended", note(["The mourning has a real ending.", "That does not mean Moses is forgotten. It means Israel must receive Joshua's leadership and keep walking toward the promise.", "😭 Grief was real", "📆 Mourning had a limit", "👣 Obedience must continue", "🏞️ The land still waits", "The phrase prepares the reader for movement after loss."])],
    ],
  },
  {
    chapter: 34,
    startVerse: 9,
    endVerse: 9,
    reference: "Deuteronomy 34:9",
    title: "🧠 Full Of The Spirit Of Wisdom",
    icon: "🧠",
    phrases: [
      ["🧠 Full Of The Spirit Of Wisdom", note(["Joshua is not stepping into leadership with mere confidence.", "Wisdom from God is marking him for the work Moses can no longer do.", "🧠 Wisdom is needed", "🕊️ God supplies it", "👣 Leadership continues", "📜 Israel must obey", "The new leader is equipped by God, not only chosen by people."])],
      ["✋ Moses Had Laid His Hands Upon Him", note(["Moses laying hands on Joshua shows public transfer of leadership.", "Israel can see that Joshua is not forcing himself into Moses' place. He has been appointed for it.", "✋ Leadership is passed on", "👤 Joshua is recognized", "📜 Moses' role is honored", "➡️ The mission continues", "The phrase explains why Israel should now listen to Joshua."])],
      ["👂 The Children Of Israel Hearkened Unto Him", note(["Israel responds by listening to Joshua.", "This matters because leadership transition only works if the people receive the leader God has raised up.", "👂 They listen", "👣 They follow", "🧠 Wisdom guides the next step", "🏞️ The land is still ahead", "Israel begins moving from Moses' leadership to Joshua's leadership."])],
      ["📜 As The LORD Commanded Moses", note(["Joshua's leadership is tied to what the LORD had already commanded through Moses.", "This keeps the transition from becoming a new religion or a new direction.", "📜 God's command remains", "👤 Moses' teaching continues", "🧭 Joshua leads under the same LORD", "🏞️ Israel enters the promise by obedience", "The servant changes, but the LORD's word does not."])],
    ],
  },
];

const generatedDeuteronomyThirtyToThirtyFourPersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [30, 31, 32, 33, 34],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "That Thou And Thy Seed May Live",
    "This Commandment Which I Command Thee This Day",
    "Set Your Hearts Unto All The Words",
    "The Blessing Wherewith Moses The Man Of God Blessed",
    "Moses The Servant Of The LORD",
    "The Eternal God Is Thy Refuge",
    "The LORD Came From Sinai",
    "Let Reuben Live And Not Die",
    "Blessed Of The LORD Be His Land",
    "As Thy Days So Shall Thy Strength Be",
    "Thine Enemies Shall Be Found Liars Unto Thee",
  ],
});

const day55DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 30:1-3": [
    "📌 It Shall Come To Pass",
    "🧭 When All These Things Are Come Upon Thee",
    "📖 The Blessing And The Curse",
    "🧠 Thou Shalt Call Them To Mind Among All The Nations",
    "👑 And Shalt Return Unto The LORD Thy God",
    "👨‍👩‍👧 Thou And Thy Children",
    "🗣️ And Shalt Obey His Voice",
  ],
  "Deuteronomy 30:4-6": [
    "🌍 If Any Of Thine Be Driven Out Unto The Outmost Parts Of Heaven",
    "🤲 From Thence Will The LORD Thy God Gather Thee",
    "🏞️ The LORD Thy God Will Bring Thee Into The Land",
    "✨ And He Will Do Thee Good",
    "📈 And Multiply Thee Above Thy Fathers",
    "❤️ The LORD Thy God Will Circumcise Thine Heart",
    "🙏 To Love The LORD Thy God With All Thine Heart",
  ],
  "Deuteronomy 30:7-10": [
    "⚖️ The LORD Thy God Will Put All These Curses Upon Thine Enemies",
    "👂 Thou Shalt Return And Obey The Voice Of The LORD",
    "📜 And Do All His Commandments",
    "🌾 The LORD Thy God Will Make Thee Plenteous In Every Work Of Thine Hand",
    "😊 For The LORD Will Again Rejoice Over Thee For Good",
    "👂 If Thou Shalt Hearken Unto The Voice Of The LORD Thy God",
    "🫀 If Thou Turn Unto The LORD Thy God With All Thine Heart",
  ],
  "Deuteronomy 30:11-14": [
    "📜 This Commandment Which I Command Thee This Day",
    "🚫 It Is Not Hidden From Thee",
    "🚫 Neither Is It Far Off",
    "☁️ It Is Not In Heaven",
    "🌊 Neither Is It Beyond The Sea",
    "🗣️ The Word Is Very Nigh Unto Thee, In Thy Mouth",
    "❤️ And In Thy Heart, That Thou Mayest Do It",
  ],
  "Deuteronomy 30:15-18": [
    "📅 I Have Set Before Thee This Day Life And Good",
    "💀 And Death And Evil",
    "❤️ To Love The LORD Thy God",
    "🚶 To Walk In His Ways",
    "📜 And To Keep His Commandments And His Statutes And His Judgments",
    "🚫 If Thine Heart Turn Away",
    "⚠️ I Denounce Unto You This Day, That Ye Shall Surely Perish",
  ],
  "Deuteronomy 30:19-20": [
    "🌤️ I Call Heaven And Earth To Record This Day Against You",
    "📅 I Have Set Before You Life And Death",
    "🌾 Blessing And Cursing",
    "✅ Therefore Choose Life",
    "👨‍👩‍👧 That Both Thou And Thy Seed May Live",
    "❤️ That Thou Mayest Love The LORD Thy God",
    "📌 And That Thou Mayest Cleave Unto Him",
  ],
  "Deuteronomy 31:1-2": [
    "🚶 Moses Went And Spake These Words Unto All Israel",
    "🎂 I Am An Hundred And Twenty Years Old This Day",
    "🚫 I Can No More Go Out And Come In",
    "🚫 Thou Shalt Not Go Over This Jordan",
  ],
  "Deuteronomy 31:3-6": [
    "👑 The LORD Thy God, He Will Go Over Before Thee",
    "⚔️ He Will Destroy These Nations From Before Thee",
    "🧭 Joshua, He Shall Go Over Before Thee",
    "🔥 The LORD Shall Do Unto Them As He Did To Sihon And To Og",
    "💪 Be Strong And Of A Good Courage",
    "🚫 Fear Not, Nor Be Afraid Of Them",
    "🤝 He Will Not Fail Thee, Nor Forsake Thee",
  ],
  "Deuteronomy 31:7-8": [
    "🗣️ Moses Called Unto Joshua",
    "👀 In The Sight Of All Israel",
    "💪 Be Strong And Of A Good Courage",
    "🏞️ Thou Must Go With This People Unto The Land",
    "👑 The LORD, He It Is That Doth Go Before Thee",
    "🤝 He Will Be With Thee",
    "🚫 He Will Not Fail Thee, Neither Forsake Thee",
  ],
  "Deuteronomy 31:9-13": [
    "✍️ Moses Wrote This Law",
    "🙌 And Delivered It Unto The Priests The Sons Of Levi",
    "📅 At The End Of Every Seven Years",
    "🕊️ In The Solemnity Of The Year Of Release",
    "⛺ In The Feast Of Tabernacles",
    "👂 Gather The People Together, Men, And Women, And Children",
    "🌍 And Thy Stranger That Is Within Thy Gates",
  ],
  "Deuteronomy 31:14-15": [
    "⏳ Thy Days Approach That Thou Must Die",
    "👥 Call Joshua, And Present Yourselves In The Tabernacle Of The Congregation",
    "☁️ The LORD Appeared In The Tabernacle In A Pillar Of A Cloud",
    "🚪 The Pillar Of The Cloud Stood Over The Door Of The Tabernacle",
  ],
  "Deuteronomy 31:16-18": [
    "😴 Thou Shalt Sleep With Thy Fathers",
    "🚫 This People Will Rise Up, And Go A Whoring After The Gods Of The Strangers",
    "💔 And Will Forsake Me, And Break My Covenant",
    "😠 Then My Anger Shall Be Kindled Against Them",
    "🙈 And I Will Hide My Face From Them",
    "😨 Many Evils And Troubles Shall Befall Them",
    "❓ Are Not These Evils Come Upon Us, Because Our God Is Not Among Us",
  ],
  "Deuteronomy 31:19-22": [
    "🎶 Now Therefore Write Ye This Song For You",
    "👄 Put It In Their Mouths",
    "🧾 That This Song May Be A Witness For Me Against The Children Of Israel",
    "🍯 A Land Flowing With Milk And Honey",
    "🍽️ Then They Shall Have Eaten And Filled Themselves, And Waxen Fat",
    "🚫 Then Will They Turn Unto Other Gods",
    "🎶 Moses Therefore Wrote This Song The Same Day",
  ],
  "Deuteronomy 31:24-27": [
    "📘 When Moses Had Made An End Of Writing The Words Of This Law In A Book",
    "🙌 Moses Commanded The Levites Which Bare The Ark Of The Covenant Of The LORD",
    "📦 Take This Book Of The Law",
    "📍 Put It In The Side Of The Ark Of The Covenant Of The LORD Your God",
    "🧾 That It May Be There For A Witness Against Thee",
  ],
  "Deuteronomy 31:28-30": [
    "👥 Gather Unto Me All The Elders Of Your Tribes, And Your Officers",
    "👂 That I May Speak These Words In Their Ears",
    "🌤️ And Call Heaven And Earth To Record Against Them",
    "🎶 Moses Spake In The Ears Of All The Congregation Of Israel The Words Of This Song",
  ],
  "Deuteronomy 32:1-4": [
    "🌤️ Give Ear, O Ye Heavens, And I Will Speak",
    "🌧️ My Doctrine Shall Drop As The Rain",
    "🙌 Ascribe Ye Greatness Unto Our God",
    "🪨 He Is The Rock",
    "✅ His Work Is Perfect",
    "⚖️ All His Ways Are Judgment",
    "👑 A God Of Truth And Without Iniquity, Just And Right Is He",
  ],
  "Deuteronomy 32:5-9": [
    "🪞 They Have Corrupted Themselves",
    "🚫 They Are A Perverse And Crooked Generation",
    "❓ Do Ye Thus Requite The LORD, O Foolish People And Unwise",
    "🧠 Remember The Days Of Old",
    "👴 Ask Thy Father, And He Will Shew Thee",
    "📏 He Set The Bounds Of The People",
    "🎁 The LORD'S Portion Is His People, Jacob Is The Lot Of His Inheritance",
  ],
  "Deuteronomy 32:10-14": [
    "🏜️ He Found Him In A Desert Land",
    "🛡️ He Led Him About, He Instructed Him, He Kept Him As The Apple Of His Eye",
    "🦅 As An Eagle Stirreth Up Her Nest",
    "🙌 So The LORD Alone Did Lead Him",
    "⛰️ He Made Him Ride On The High Places Of The Earth",
    "🍯 He Made Him To Suck Honey Out Of The Rock",
    "🥛 Butter Of Kine, And Milk Of Sheep",
  ],
  "Deuteronomy 32:15-18": [
    "🐂 Jeshurun Waxed Fat, And Kicked",
    "🚫 Then He Forsook God Which Made Him",
    "😠 They Provoked Him To Jealousy With Strange Gods",
    "🩸 They Sacrificed Unto Devils, Not To God",
    "🪨 Of The Rock That Begat Thee Thou Art Unmindful",
    "🚫 And Hast Forgotten God That Formed Thee",
  ],
  "Deuteronomy 32:19-24": [
    "😠 When The LORD Saw It, He Abhorred Them",
    "🙈 I Will Hide My Face From Them",
    "🪝 They Have Moved Me To Jealousy With That Which Is Not God",
    "🔥 For A Fire Is Kindled In Mine Anger",
    "🍽️ They Shall Be Burnt With Hunger",
    "🦁 I Will Also Send The Teeth Of Beasts Upon Them",
    "💀 The Sword Without, And Terror Within",
  ],
  "Deuteronomy 32:25-25": [
    "⚔️ The Sword Without",
    "😨 And Terror Within",
    "👦 Shall Destroy Both The Young Man And The Virgin",
    "👶 The Suckling Also With The Man Of Gray Hairs",
  ],
  "Deuteronomy 32:26-31": [
    "🌍 I Would Scatter Them Into Corners",
    "🚫 Were It Not That I Feared The Wrath Of The Enemy",
    "🪨 For Their Rock Is Not As Our Rock",
    "⚔️ How Should One Chase A Thousand",
  ],
  "Deuteronomy 32:32-33": [
    "🍇 Their Vine Is Of The Vine Of Sodom",
    "🍷 Their Grapes Are Grapes Of Gall",
    "☠️ Their Wine Is The Poison Of Dragons",
    "🐍 And The Cruel Venom Of Asps",
  ],
  "Deuteronomy 32:34-39": [
    "🔐 Is Not This Laid Up In Store With Me",
    "⚖️ To Me Belongeth Vengeance, And Recompence",
    "🙌 The LORD Shall Judge His People",
    "❓ Where Are Their Gods, Their Rock In Whom They Trusted",
    "👁️ See Now That I, Even I, Am He",
    "🩸 I Kill, And I Make Alive",
    "🩹 I Wound, And I Heal",
  ],
  "Deuteronomy 32:40-43": [
    "✋ I Lift Up My Hand To Heaven",
    "🗡️ If I Whet My Glittering Sword",
    "⚖️ I Will Render Vengeance To Mine Enemies",
    "🎉 Rejoice, O Ye Nations, With His People",
  ],
  "Deuteronomy 32:44-47": [
    "🗣️ Moses Came And Spake All The Words Of This Song",
    "❤️ Set Your Hearts Unto All The Words Which I Testify Among You This Day",
    "👨‍👩‍👧 Command Them Your Children",
    "🧬 It Is Not A Vain Thing For You",
  ],
  "Deuteronomy 32:48-52": [
    "🕊️ The LORD Spake Unto Moses That Selfsame Day",
    "⛰️ Get Thee Up Into This Mountain Abarim, Unto Mount Nebo",
    "👀 Behold The Land Of Canaan",
    "💀 And Die In The Mount Whither Thou Goest Up",
  ],
  "Deuteronomy 33:1-5": [
    "🙏 This Is The Blessing, Wherewith Moses The Man Of God Blessed The Children Of Israel Before His Death",
    "🌄 The LORD Came From Sinai, And Rose Up From Seir Unto Them",
    "🔥 He Shined Forth From Mount Paran",
    "❤️ Yea, He Loved The People",
  ],
  "Deuteronomy 33:6-7": [
    "🛡️ Let Reuben Live, And Not Die",
    "👥 Let Not His Men Be Few",
    "🗣️ Hear, LORD, The Voice Of Judah",
    "🤝 And Bring Him Unto His People",
    "✋ Let His Hands Be Sufficient For Him",
    "⚔️ Be Thou An Help To Him From His Enemies",
  ],
  "Deuteronomy 33:8-11": [
    "🧭 Of Levi He Said",
    "🧪 Let Thy Thummim And Thy Urim Be With Thy Holy One",
    "⚖️ They Shall Teach Jacob Thy Judgments",
    "🕯️ They Shall Put Incense Before Thee",
    "🔥 And Whole Burnt Sacrifice Upon Thine Altar",
    "💪 Bless, LORD, His Substance",
  ],
  "Deuteronomy 33:13-17": [
    "🌾 Of Joseph He Said",
    "💧 Blessed Of The LORD Be His Land",
    "⛰️ For The Precious Things Of Heaven, For The Dew",
    "🌞 For The Precious Fruits Brought Forth By The Sun",
  ],
  "Deuteronomy 33:18-19": [
    "🚶 Of Zebulun He Said, Rejoice, Zebulun, In Thy Going Out",
    "⛺ And, Issachar, In Thy Tents",
    "🏔️ They Shall Call The People Unto The Mountain",
    "🐟 They Shall Suck Of The Abundance Of The Seas",
  ],
  "Deuteronomy 33:20-21": [
    "🦁 Of Gad He Said, Blessed Be He That Enlargeth Gad",
    "🦁 He Dwelleth As A Lion",
    "⚖️ He Executed The Justice Of The LORD",
    "🤝 And His Judgments With Israel",
  ],
  "Deuteronomy 33:22-23": [
    "🦁 Of Dan He Said, Dan Is A Lion's Whelp",
    "🌊 He Shall Leap From Bashan",
    "😊 Of Naphtali He Said, O Naphtali, Satisfied With Favour",
    "🙏 And Full With The Blessing Of The LORD",
    "🧭 Possess Thou The West And The South",
  ],
  "Deuteronomy 33:24-25": [
    "👶 Of Asher He Said, Let Asher Be Blessed With Children",
    "🤝 Let Him Be Acceptable To His Brethren",
    "🫒 Let Him Dip His Foot In Oil",
    "🛡️ Thy Shoes Shall Be Iron And Brass",
    "💪 As Thy Days, So Shall Thy Strength Be",
  ],
  "Deuteronomy 33:26-29": [
    "✨ There Is None Like Unto The God Of Jeshurun",
    "🛡️ The Eternal God Is Thy Refuge",
    "💪 And Underneath Are The Everlasting Arms",
    "🎉 Happy Art Thou, O Israel",
  ],
};

const day55DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 30:1-3": "↩️ Return Unto The LORD",
  "Deuteronomy 30:4-6": "❤️ The LORD Will Circumcise Thine Heart",
  "Deuteronomy 30:7-10": "😊 The LORD Will Again Rejoice Over Thee",
  "Deuteronomy 30:11-14": "📜 The Word Is Very Nigh Unto Thee",
  "Deuteronomy 30:15-18": "⚖️ Life And Good, Death And Evil",
  "Deuteronomy 30:19-20": "✅ Therefore Choose Life",
  "Deuteronomy 31:1-2": "⏳ Moses Cannot Go Over Jordan",
  "Deuteronomy 31:3-6": "💪 Be Strong And Of A Good Courage",
  "Deuteronomy 31:7-8": "🤝 Joshua Must Lead",
  "Deuteronomy 31:9-13": "👂 Read The Law To All Israel",
  "Deuteronomy 31:14-15": "☁️ Present Yourselves In The Tabernacle",
  "Deuteronomy 31:16-18": "🙈 I Will Hide My Face From Them",
  "Deuteronomy 31:19-22": "🎶 Write Ye This Song",
  "Deuteronomy 31:24-27": "📦 Put This Book By The Ark",
  "Deuteronomy 31:28-30": "🌤️ Call Heaven And Earth To Record",
  "Deuteronomy 32:1-4": "🪨 He Is The Rock",
  "Deuteronomy 32:5-9": "🧠 Remember The Days Of Old",
  "Deuteronomy 32:10-14": "🦅 As An Eagle Stirreth Up Her Nest",
  "Deuteronomy 32:15-18": "🐂 Jeshurun Waxed Fat, And Kicked",
  "Deuteronomy 32:19-24": "🔥 A Fire Is Kindled In Mine Anger",
  "Deuteronomy 32:25-25": "⚔️ The Sword Without, And Terror Within",
  "Deuteronomy 32:26-31": "🌍 I Would Scatter Them Into Corners",
  "Deuteronomy 32:32-33": "☠️ The Poison Of Dragons",
  "Deuteronomy 32:34-39": "⚖️ To Me Belongeth Vengeance",
  "Deuteronomy 32:40-43": "🎉 Rejoice, O Ye Nations, With His People",
  "Deuteronomy 32:44-47": "❤️ It Is Not A Vain Thing For You",
  "Deuteronomy 32:48-52": "⛰️ Get Thee Up Into Mount Nebo",
  "Deuteronomy 33:1-5": "🙏 This Is The Blessing",
  "Deuteronomy 33:6-7": "🛡️ Reuben And Judah Blessed",
  "Deuteronomy 33:8-11": "🔥 Levi And The Altar",
  "Deuteronomy 33:13-17": "🌾 Joseph's Blessed Land",
  "Deuteronomy 33:18-19": "🏔️ Zebulun And Issachar",
  "Deuteronomy 33:20-21": "🦁 Gad Enlarged",
  "Deuteronomy 33:22-23": "🦁 Dan And Naphtali",
  "Deuteronomy 33:24-25": "💪 As Thy Days, So Shall Thy Strength Be",
  "Deuteronomy 33:26-29": "🛡️ The Eternal God Is Thy Refuge",
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

const day56DeuteronomyCuratedPhraseTitles: Record<string, string[]> = {
  "Deuteronomy 34:1-4": [
    "⛰️ Moses Went Up From The Plains Of Moab Unto Mount Nebo",
    "👁️ The LORD Shewed Him All The Land",
    "🗺️ All The Land Of Gilead, Unto Dan",
    "📜 This Is The Land Which I Sware Unto Abraham, Unto Isaac, And Unto Jacob",
    "🚫 Thou Shalt Not Go Over Thither",
  ],
  "Deuteronomy 34:5-6": [
    "🕯️ Moses The Servant Of The LORD Died There",
    "🗣️ According To The Word Of The LORD",
    "⚰️ He Buried Him In A Valley In The Land Of Moab",
    "❓ No Man Knoweth Of His Sepulchre Unto This Day",
  ],
  "Deuteronomy 34:10-12": [
    "👑 There Arose Not A Prophet Since In Israel Like Unto Moses",
    "🤝 Whom The LORD Knew Face To Face",
    "✨ In All The Signs And The Wonders",
    "💪 In All That Mighty Hand, And In All The Great Terror",
  ],
};

const day56DeuteronomySectionTitles: Record<string, string> = {
  "Deuteronomy 34:1-4": "⛰️ Moses Sees The Promised Land",
  "Deuteronomy 34:5-6": "🕯️ Moses Dies And Is Buried",
  "Deuteronomy 34:10-12": "👑 No Prophet Like Moses",
};

function getMeaning(title: string, section: { reference: string }) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil|that thou and thy seed may live|love the lord|cleave unto him/.test(lower)) {
    return ["Moses is pressing Israel to choose covenant life with the LORD.", "Life is not bare survival; it means loving God, listening to Him, and walking in His ways."];
  }
  if (/commandment|not hidden|not far off|mouth|heart|do it|words of this law/.test(lower)) {
    return ["God's command is being placed close enough for Israel to obey.", "Moses does not describe obedience as mysterious or unreachable, but as a real response to God's revealed word."];
  }
  if (/joshua|be strong|good courage|go with thee|not fail thee|not forsake thee/.test(lower)) {
    return ["Joshua is being strengthened for leadership after Moses.", "The courage command rests on the LORD's presence, not on Joshua's personality or military skill."];
  }
  if (/song|witness|heaven|earth|set your hearts|teach it|children/.test(lower)) {
    return ["Moses uses song and witnesses to make Israel remember God's words.", "The people must carry the warning into future generations instead of treating it as a momentary speech."];
  }
  if (/rock|eagle|jeshurun|provoked|strange gods|vengeance|recompence/.test(lower)) {
    return ["The song describes the LORD's faithfulness and Israel's danger of rebellion.", "Its images teach that God is steady, just, and merciful while His people are often forgetful."];
  }
  if (/blessing|moses the man of god|reuben|judah|levi|benjamin|joseph|zebulun|gad|dan|naphtali|asher/.test(lower)) {
    return ["Moses blesses the tribes before his death.", "The blessings look over Israel's future and place each tribe under the care and rule of the LORD."];
  }
  if (/eternal god|refuge|everlasting arms|happy art thou|saved by the lord|shield|sword/.test(lower)) {
    return ["Israel's safety is found in the eternal God.", "Moses ends by pointing beyond himself to the LORD who carries, protects, and saves His people."];
  }
  if (/moses|hundred and twenty|eye was not dim|natural force|died|wept|thirty days|spirit of wisdom|laid his hands/.test(lower)) {
    return ["Moses' ministry is closing while God's promise continues.", "The chapter honors Moses without making Israel's future depend on Moses being present."];
  }

  return ["Moses is giving Israel final covenant instruction before the transition to Joshua.", `In ${section.reference}, the people are being taught to remember the LORD, obey His word, and trust Him beyond Moses' lifetime.`];
}

function getBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil|love the lord|cleave/.test(lower)) return ["✅ Life is tied to the LORD", "❤️ Love must become obedience", "⚠️ Rebellion leads toward death"];
  if (/commandment|not hidden|not far off|mouth|heart/.test(lower)) return ["📜 God's word is near", "🗣️ The mouth must confess it", "❤️ The heart must receive it"];
  if (/joshua|be strong|good courage|not fail|not forsake/.test(lower)) return ["💪 Courage has a reason", "🤝 The LORD stays with His servant", "➡️ Leadership moves forward"];
  if (/song|witness|heaven|earth|children|set your hearts/.test(lower)) return ["🎶 The song teaches memory", "👂 Israel must listen deeply", "👨‍👩‍👧 The next generation must learn"];
  if (/rock|eagle|jeshurun|strange gods|vengeance/.test(lower)) return ["🪨 The LORD is steady", "🦅 He carried Israel with care", "💔 Idolatry betrays His mercy"];
  if (/blessing|reuben|judah|levi|benjamin|joseph|zebulun|gad|dan|naphtali|asher/.test(lower)) return ["🙌 The tribes are blessed before God", "🏞️ Each inheritance has a future", "👑 The LORD rules over Israel"];
  if (/eternal god|refuge|arms|shield|sword|saved/.test(lower)) return ["🛡️ God is Israel's refuge", "💪 His arms uphold His people", "🙌 Salvation belongs to the LORD"];
  if (/moses|died|wept|thirty days|wisdom|laid his hands/.test(lower)) return ["🕯️ Moses' work reaches its close", "➡️ The mission continues", "🕊️ God provides the next leader"];

  return ["📜 Final words must be remembered", "❤️ Israel must answer from the heart", "➡️ God's promise continues forward"];
}

function getTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil/.test(lower)) return "Covenant choice is about life with the LORD.";
  if (/joshua|be strong|good courage/.test(lower)) return "Courage comes from God's continuing presence.";
  if (/moses|died|wept|laid his hands|wisdom/.test(lower)) return "God's work continues when one faithful servant's role ends.";
  return "Israel must receive Moses' final words as a call to faithful covenant life.";
}

function getDay55Support(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/return|gather thee|circumcise thine heart|choose life|cleave unto him|life and good|death and evil|blessing and cursing|seed may live|love the lord|obey his voice|bring thee into the land|do thee good|multiply thee|plenteous|rejoice over thee/.test(lower)) return ["?? Return to God is central", "?? The heart must be changed", "? Life is tied to covenant obedience", "?? The LORD restores and gives life"];
  if (/commandment|not hidden|not far off|in heaven|beyond the sea|mouth|heart/.test(lower)) return ["?? God's word is near enough to obey", "??? The mouth receives and speaks it", "?? The heart must hold it", "?? Obedience is not unreachable"];
  if (/joshua|be strong|good courage|go over before thee|not fail thee|not forsake thee|hundred and twenty|go out and come in|went and spake|fear not|be with thee|called unto joshua|sight of all israel/.test(lower)) return ["?? Leadership changes, but God stays present", "?? Joshua is publicly strengthened", "? Moses' role is ending", "?? The mission continues"];
  if (/wrote this law|read this law|year of release|feast of tabernacles|song|witness|heaven and earth|priests|stranger|tabernacle|book of the law|ark|elders|door of the tabernacle/.test(lower)) return ["?? Israel must hear and remember", "?? The song is a lasting witness", "?? The law is for future generations too", "??? Creation is called as witness"];
  if (/hide my face|go a whoring|forsake me|other gods|waxen fat|sleep with thy fathers|anger shall be kindled|evils and troubles|milk and honey|rise up|break my covenant/.test(lower)) return ["?? God's hidden face signals judgment", "?? Idolatry is covenant betrayal", "?? Prosperity can turn into forgetfulness", "?? The warning is meant to restrain rebellion"];
  if (/rock|eagle|jeshurun|vengeance|recompence|scatter them|gall|dragons|asps|heavens|doctrine|greatness|perfect|judgment|truth|corrupted|days of old|desert land|apple of his eye|high places|honey out of the rock|butter of kine|hunger|teeth of beasts|sword without|terror within|chase a thousand|laid up in store|i kill|i make alive|i wound|i heal|glittering sword/.test(lower)) return ["?? The LORD is steady and just", "?? He cared for Israel from the beginning", "?? Rebellion poisons what He gave", "?? Judgment and mercy both belong to Him"];
  if (/blessing|reuben|judah|levi|joseph|zebulun|issachar|gad|dan|naphtali|asher|jeshurun|eternal god|everlasting arms|happy art thou|sinai|seir|paran|loved the people|thummim|urim|incense|burnt sacrifice|precious things|dew|sun|going out|tents|mountain|abundance of the seas|lion|possess thou|dip his foot in oil|iron and brass|strength be/.test(lower)) return ["?? Moses blesses the tribes before he dies", "??? Each tribe is spoken over distinctly", "??? Israel's safety is in God, not itself", "?? The blessing looks ahead to their future"];
  if (/moses was an hundred and twenty|eye was not dim|wept|thirty days|spirit of wisdom|laid his hands/.test(lower)) return ["??? Moses' life closes, but God's work does not", "?? Israel mourns a real leader", "?? Joshua is equipped for what comes next", "?? The promise continues forward"];

  return ["?? Moses is giving final covenant words", "?? The people must answer from the heart", "?? God's word is the center", "?? The next generation must keep walking"];
}

function getDay55LeadSupport(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/return|gather thee|circumcise thine heart|choose life|life and good|death and evil|seed may live|love the lord|cleave unto him|bring thee into the land|plenteous|rejoice over thee/.test(lower)) return "?? Moses is pressing Israel toward life-giving return";
  if (/commandment|not hidden|not far off|mouth|heart/.test(lower)) return "?? God's word is close, not unreachable";
  if (/joshua|be strong|good courage|not fail thee|not forsake thee|hundred and twenty|go out and come in|went and spake|fear not|be with thee|called unto joshua/.test(lower)) return "?? Courage rests on God's continuing presence";
  if (/law|song|witness|heaven and earth|year of release|priests|stranger|tabernacle|ark|elders/.test(lower)) return "?? The covenant must be remembered aloud";
  if (/hide my face|other gods|waxen fat|sleep with thy fathers|anger shall be kindled|evils and troubles|milk and honey|break my covenant/.test(lower)) return "?? The warning is about future covenant betrayal";
  if (/rock|eagle|vengeance|gall|dragons|heavens|doctrine|greatness|perfect|truth|corrupted|days of old|desert land|apple of his eye|high places|honey out of the rock|butter of kine|hunger|teeth of beasts|sword without|terror within|i kill|i heal|glittering sword/.test(lower)) return "?? The song teaches who God is and what rebellion does";
  if (/blessing|reuben|judah|levi|joseph|zebulun|gad|dan|naphtali|asher|eternal god|everlasting arms|happy art thou|sinai|seir|paran|loved the people|thummim|urim|incense|burnt sacrifice|dew|sun|going out|tents|mountain|abundance of the seas|lion|dip his foot in oil|iron and brass|strength be/.test(lower)) return "?? Moses is blessing Israel under God's care";
  if (/wept|spirit of wisdom|laid his hands/.test(lower)) return "??? Transition does not end God's faithfulness";

  return "?? One phrase carries a real covenant lesson";
}

function explainDay55DeuteronomyAt95(section: { reference: string; chapter: number }, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This line belongs to Moses' final covenant words.", "He is pressing Israel to remember the LORD and live accordingly."];

  if (/all these things are come upon thee/.test(lower)) opening = ["Moses is speaking about a future moment when blessing and curse have both become real history.", "The return he describes begins after judgment has been felt."];
  else if (/it shall come to pass/.test(lower)) opening = ["It shall come to pass means this future turning is certain, not imaginary.", "Moses is speaking with covenant certainty about what Israel will one day face."];
  else if (/the blessing and the curse/.test(lower)) opening = ["The blessing and the curse are the two covenant outcomes already placed before Israel.", "Moses says both must be remembered if the people are going to understand their history rightly."];
  else if (/obey his voice/.test(lower) && section.reference === "Deuteronomy 30:1-3") opening = ["Obey his voice means respond to what God says with actual submission.", "Return to the LORD is proved by listening to Him again."];
  else if (/call them to mind among all the nations/.test(lower)) opening = ["Call them to mind means remember deeply and honestly.", "Repentance begins when exile wakes memory."];
  else if (/return unto the lord thy god/.test(lower)) opening = ["Return means turn back in repentance and renewed obedience.", "Moses speaks of real return, not vague regret."];
  else if (/thou and thy children/.test(lower)) opening = ["The return is described as generational, not merely personal.", "The covenant response must reach the family line too."];
  else if (/if any of thine be driven out unto the outmost parts of heaven/.test(lower)) opening = ["This phrase describes exile to the farthest imaginable distance.", "Even there, scattering does not put Israel beyond the LORD's reach."];
  else if (/from thence will the lord thy god gather thee/.test(lower)) opening = ["From thence means from the very places of scattering.", "The LORD is able to regather people who seemed fully dispersed."];
  else if (/bring thee into the land/.test(lower)) opening = ["Restoration is not only spiritual; it includes return to the promised land.", "The covenant promise reaches place as well as forgiveness."];
  else if (/and he will do thee good/.test(lower)) opening = ["Do thee good means the LORD will act for Israel's welfare.", "Restoration is pictured as active favor, not mere cancellation of judgment."];
  else if (/multiply thee above thy fathers/.test(lower)) opening = ["Multiply thee means increase your numbers and strength.", "The promise reaches beyond recovery into renewed fruitfulness."];
  else if (/circumcise thine heart/.test(lower)) opening = ["Circumcise thine heart means God cutting away inner stubbornness.", "The problem is not only location but the heart's condition."];
  else if (/love the lord thy god with all thine heart/.test(lower)) opening = ["The goal of heart-circumcision is whole-hearted love for God.", "Real covenant life begins inside before it shows outside."];
  else if (/put all these curses upon thine enemies/.test(lower)) opening = ["The judgment once falling on Israel is pictured falling on hostile enemies instead.", "Restoration includes reversal."];
  else if (/thou shalt return and obey the voice of the lord/.test(lower)) opening = ["Return and obey brings repentance and submission together in one movement.", "Moses is describing a people who not only come back, but begin listening again."];
  else if (/hearken unto the voice of the lord/.test(lower) && section.reference === "Deuteronomy 30:7-10") opening = ["Hearken means listen with actual obedience.", "Moses ties restoration to a renewed listening life."];
  else if (/do all his commandments/.test(lower)) opening = ["Do all his commandments means full obedience, not partial interest.", "Restoration is joined to a life that actually follows what God has said."];
  else if (/make thee plenteous/.test(lower)) opening = ["Plenteous means abundant and full.", "The restored life is pictured in concrete fruitfulness."];
  else if (/rejoice over thee for good/.test(lower)) opening = ["God is described as rejoicing over His people again for good.", "The phrase pictures restored favor, not bare survival."];
  else if (/if thou turn unto the lord thy god with all thine heart/.test(lower)) opening = ["Turn with all thine heart means return without divided loyalty.", "Moses is describing repentance that reaches the inner life, not words alone."];
  else if (/this commandment which i command thee this day/.test(lower)) opening = ["Moses is talking about God's command as something present and binding now.", "He wants the people to stop thinking obedience is beyond them."];
  else if (/not hidden from thee/.test(lower)) opening = ["Hidden here means mysterious or inaccessible.", "God has not concealed what Israel needs to know."];
  else if (/neither is it far off/.test(lower)) opening = ["Far off means beyond reach.", "The command is not located at impossible distance."];
  else if (/it is not in heaven/.test(lower)) opening = ["The people do not need to climb into heaven to fetch God's will.", "The command has already been spoken to them."];
  else if (/neither is it beyond the sea/.test(lower)) opening = ["Neither must someone cross the sea to discover it.", "God's revealed will is already near."];
  else if (/the word is very nigh unto thee, in thy mouth/.test(lower)) opening = ["In thy mouth means God's word is near enough to speak, confess, and repeat.", "Obedience begins with a word the people can actually receive and say."];
  else if (/and in thy heart, that thou mayest do it/.test(lower)) opening = ["The heart is named because obedience must become inward, not merely spoken aloud.", "God's word belongs inside the person so it can shape what they do."];
  else if (/i have set before thee this day life and good/.test(lower)) opening = ["Life and good are named together because true life comes with God's favor.", "Moses is making the covenant path sound concrete and desirable."];
  else if (/and death and evil/.test(lower)) opening = ["Death and evil are paired as the covenant outcome of rebellion.", "Moses removes any illusion that turning from God is harmless."];
  else if (/to love the lord thy god/.test(lower) && section.reference === "Deuteronomy 30:15-18") opening = ["Love here means covenant loyalty, not only warm feeling.", "Choosing life includes loving the LORD who gives life."];
  else if (/to walk in his ways/.test(lower)) opening = ["To walk in His ways means to live by God's character and commands.", "Life is not a momentary choice only, but a path."];
  else if (/keep his commandments and his statutes and his judgments/.test(lower)) opening = ["The repeated words emphasize full covenant obedience.", "Moses is not speaking of selective loyalty."];
  else if (/thine heart turn away/.test(lower)) opening = ["The danger begins in the heart before it appears in open idolatry.", "Inner turning becomes outward ruin."];
  else if (/denounce unto you this day/.test(lower)) opening = ["Denounce means declare solemnly and plainly.", "Moses is warning Israel in advance that rebellion leads to real perishing."];
  else if (/i call heaven and earth to record/.test(lower)) opening = ["Heaven and earth are summoned as witnesses to the covenant choice.", "The whole creation is pictured hearing this moment."];
  else if (/i have set before you life and death/.test(lower)) opening = ["Life and death are set before Israel like two visible roads.", "Moses is forcing the choice into the open."];
  else if (/blessing and cursing/.test(lower) && section.reference === "Deuteronomy 30:19-20") opening = ["Blessing and cursing name the outcome attached to each road.", "The covenant is never morally neutral."];
  else if (/therefore choose life/.test(lower)) opening = ["Choose life is Moses' direct appeal after laying out both roads.", "He does not leave the people at bare information."];
  else if (/that both thou and thy seed may live/.test(lower)) opening = ["The choice of life reaches children as well as parents.", "Moses is speaking about a future shaped across generations."];
  else if (/that thou mayest love the lord thy god/.test(lower) && section.reference === "Deuteronomy 30:19-20") opening = ["Moses ties true life to loving the LORD Himself.", "The covenant is not merely about surviving in the land."];
  else if (/cleave unto him/.test(lower)) opening = ["Cleave means hold fast in loyal attachment.", "Life is tied to staying close to the LORD."];
  else if (/moses went and spake these words unto all israel/.test(lower)) opening = ["Moses is deliberately addressing the whole nation before the transition.", "These last words are public covenant words, not private counsel."];
  else if (/hundred and twenty years old/.test(lower)) opening = ["Moses names his age to mark the real end of his leadership season.", "The people must prepare for transition."];
  else if (/i can no more go out and come in/.test(lower)) opening = ["This means Moses' public leading role is closing.", "The sentence signals transition, not despair."];
  else if (/thou shalt not go over this jordan/.test(lower)) opening = ["Moses reminds them that he will not cross with them.", "The promise continues, but his role stops here."];
  else if (/he will go over before thee/.test(lower)) opening = ["The LORD going over before them means He leads the crossing and conquest.", "Joshua's role rests under God's prior presence."];
  else if (/he will destroy these nations from before thee/.test(lower)) opening = ["Destroy these nations means Israel's victory will come from the LORD's action.", "The land is not taken by bare human strength."];
  else if (/joshua, he shall go over before thee/.test(lower)) opening = ["Joshua is named as the human leader who will cross before the people.", "Moses is handing forward responsibility without taking away God's lead."];
  else if (/as he did to sihon and to og/.test(lower)) opening = ["Moses points back to Sihon and Og as proof of what God can do.", "Past victories are meant to steady present courage."];
  else if (/be strong and of a good courage/.test(lower) && section.reference === "Deuteronomy 31:3-6") opening = ["Israel is told to be strong because the LORD Himself will cross before them.", "This courage is for the coming conquest, not for private ambition."];
  else if (/be strong and of a good courage/.test(lower) && section.reference === "Deuteronomy 31:7-8") opening = ["Joshua is told to be strong as he steps into Moses' place before the people.", "The command fits the burden of leading others into the land."];
  else if (/fear not, nor be afraid of them/.test(lower)) opening = ["Fear not means do not let the nations' power master your heart.", "Israel is being told to measure danger by God's presence, not by appearances."];
  else if (/he will not fail thee, nor forsake thee/.test(lower)) opening = ["Fail thee and forsake thee both deny abandonment.", "Joshua and Israel are told that God's presence will not drop away."];
  else if (/moses called unto joshua/.test(lower)) opening = ["Moses calls Joshua forward in front of the nation for a public handoff.", "The next leader is being named openly, not quietly."];
  else if (/in the sight of all israel/.test(lower)) opening = ["Joshua is charged where all Israel can hear and remember it.", "The transition is made public so the people know whom to follow."];
  else if (/thou must go with this people unto the land/.test(lower)) opening = ["Joshua is told he must go with the people into the land itself.", "Leadership here means entering the promise beside them, not staying at a distance."];
  else if (/he it is that doth go before thee/.test(lower)) opening = ["Before Joshua leads Israel, the LORD leads Joshua.", "That order keeps the new leader from standing alone."];
  else if (/he will be with thee/.test(lower)) opening = ["Be with thee means God's presence will accompany Joshua personally.", "The new assignment is supported by nearness, not merely command."];
  else if (/he will not fail thee, neither forsake thee/.test(lower)) opening = ["Joshua is assured that God's help will not collapse halfway through the task.", "The promise removes the fear of being left alone in leadership."];
  else if (/moses wrote this law/.test(lower)) opening = ["Moses writing the law fixes these words in lasting form.", "The covenant is not left to fading memory alone."];
  else if (/delivered it unto the priests the sons of levi/.test(lower)) opening = ["The written law is placed into priestly custody for guarding and reading.", "Israel's worship leaders must preserve the covenant words."];
  else if (/at the end of every seven years/.test(lower)) opening = ["This reading is tied to a repeating seven-year rhythm.", "Israel is not meant to hear the law once and then drift from it."];
  else if (/in the solemnity of the year of release/.test(lower)) opening = ["The year of release is a set covenant season when debts and rest are already being remembered.", "The law is read there so mercy and obedience stay tied together."];
  else if (/in the feast of tabernacles/.test(lower)) opening = ["The Feast of Tabernacles remembers Israel's wilderness life before God.", "Reading the law there helps the people hear covenant words in a season of remembrance."];
  else if (/gather the people together/.test(lower)) opening = ["The reading is for the whole assembly, not only leaders.", "Men, women, children, and stranger all need these words."];
  else if (/thy stranger that is within thy gates/.test(lower)) opening = ["The stranger inside Israel's gates is included in hearing the law.", "Life under the covenant shapes the whole community, not native Israelites only."];
  else if (/thy days approach that thou must die/.test(lower)) opening = ["God tells Moses plainly that his death is near.", "The transition is openly acknowledged by the LORD Himself."];
  else if (/call joshua, and present yourselves in the tabernacle of the congregation/.test(lower)) opening = ["Moses and Joshua are summoned together to the tabernacle.", "God is publicly confirming the leadership transition at the place of meeting."];
  else if (/the lord appeared in the tabernacle in a pillar of a cloud/.test(lower)) opening = ["The pillar of cloud shows the LORD visibly appearing to speak and commission.", "His presence still governs Israel's next step."];
  else if (/stood over the door of the tabernacle/.test(lower)) opening = ["The cloud standing over the door marks the entrance as the place of divine encounter.", "The scene makes God's presence impossible to miss."];
  else if (/thou shalt sleep with thy fathers/.test(lower)) opening = ["Sleep with thy fathers is a gentle way of speaking about death and joining earlier generations.", "Moses is being told that his own life is nearing its close."];
  else if (/go a whoring after the gods of the strangers/.test(lower)) opening = ["This strong image compares idolatry to covenant unfaithfulness in marriage.", "Going after other gods is treated as betrayal, not curiosity."];
  else if (/forsake me, and break my covenant/.test(lower)) opening = ["Forsake me means abandon the LORD who bound Himself to Israel.", "Breaking my covenant means tearing loyalty away from the relationship God established."];
  else if (/my anger shall be kindled against them/.test(lower)) opening = ["Kindled anger means God's judgment is stirred by covenant betrayal.", "The phrase shows that idolatry is personally offensive to Him."];
  else if (/and i will hide my face from them/.test(lower) && section.reference === "Deuteronomy 31:16-18") opening = ["God warns in advance that He will withdraw favor when Israel breaks covenant.", "The hidden face here is part of the coming covenant curse."];
  else if (/hide my face from them/.test(lower)) opening = ["God hiding His face means withdrawing favor and protection.", "The phrase describes relational judgment, not divine ignorance."];
  else if (/many evils and troubles shall befall them/.test(lower)) opening = ["Befall means come upon them in lived experience.", "The warning is that covenant rebellion will produce real trouble, not empty threat."];
  else if (/are not these evils come upon us, because our god is not among us/.test(lower)) opening = ["The people will finally connect their troubles to God's withdrawn presence.", "The phrase shows conscience waking up after judgment lands."];
  else if (/write ye this song/.test(lower)) opening = ["The song is given as a memory-tool and witness.", "Poetry will help carry the warning into future generations."];
  else if (/put it in their mouths/.test(lower)) opening = ["The song is not only to be stored in writing but spoken and memorized.", "The warning must live on the people's lips."];
  else if (/that this song may be a witness for me against the children of israel/.test(lower)) opening = ["The song serves as courtroom-style testimony against future rebellion.", "When Israel drifts, the words will stand and say the warning was already given."];
  else if (/a land flowing with milk and honey/.test(lower)) opening = ["Milk and honey picture rich provision and settled abundance.", "The danger is that a good land can make the people forget the Giver."];
  else if (/waxen fat/.test(lower)) opening = ["Waxen fat means grown prosperous and self-satisfied.", "The warning is that abundance can become spiritual danger."];
  else if (/then will they turn unto other gods/.test(lower)) opening = ["The warning is that full stomachs may be followed by false worship.", "Prosperity can become the doorway to idolatry."];
  else if (/moses therefore wrote this song the same day/.test(lower)) opening = ["Moses obeys immediately by writing the song that very day.", "The warning is urgent enough to be put in place at once."];
  else if (/when moses had made an end of writing the words of this law in a book/.test(lower)) opening = ["The law is presented as a finished written witness, not loose remembered sayings.", "Its completion gives Israel something fixed to keep and hear."];
  else if (/moses commanded the levites which bare the ark of the covenant of the lord/.test(lower)) opening = ["The Levites who carry the ark are entrusted with the written law beside it.", "Those nearest the covenant symbol are charged with guarding the covenant words."];
  else if (/take this book of the law/.test(lower)) opening = ["The written law is placed beside the ark as a standing witness.", "It remains near the covenant center."];
  else if (/put it in the side of the ark/.test(lower)) opening = ["The book is placed beside the ark, not as decoration, but as covenant testimony.", "God's throne-symbol and God's written word are held close together."];
  else if (/that it may be there for a witness against thee/.test(lower)) opening = ["The book itself stands as witness against future rebellion.", "Israel will never be able to say it was not told."];
  else if (/gather unto me all the elders of your tribes, and your officers/.test(lower)) opening = ["Moses calls the nation's leaders together because this warning is public business.", "Those who guide the people must hear the covenant charge first-hand."];
  else if (/that i may speak these words in their ears/.test(lower)) opening = ["Speak in their ears means make the warning direct and unmistakable.", "Moses wants no softened version reaching the leaders."];
  else if (/call heaven and earth to record against them/.test(lower)) opening = ["Moses again summons creation as witness against future rebellion.", "The warning is made public and solemn."];
  else if (/moses spake in the ears of all the congregation of israel the words of this song/.test(lower)) opening = ["The whole congregation hears the song, not only a select group.", "What warns the nation must be spoken before the nation."];
  else if (/give ear, o ye heavens/.test(lower)) opening = ["The song opens by calling the heavens to listen.", "Its message is treated as weighty enough for cosmic witness."];
  else if (/my doctrine shall drop as the rain/.test(lower)) opening = ["Doctrine here means Moses' teaching.", "He pictures true teaching as life-giving rain and dew."];
  else if (/ascribe ye greatness unto our god/.test(lower)) opening = ["Ascribe greatness means openly acknowledge how great God truly is.", "The song begins by directing honor upward before it says anything about Israel."];
  else if (/he is the rock/.test(lower)) opening = ["The Rock is an image of stability, faithfulness, and strength.", "God is being contrasted with Israel's instability."];
  else if (/his work is perfect/.test(lower)) opening = ["Perfect means complete and without flaw in what God does.", "Whatever follows in the song cannot be blamed on defect in Him."];
  else if (/all his ways are judgment/.test(lower)) opening = ["Judgment here means His ways are just and rightly ordered.", "God never acts crookedly or unfairly."];
  else if (/a god of truth and without iniquity, just and right is he/.test(lower)) opening = ["Truth and without iniquity mean God is utterly reliable and morally clean.", "Moses stacks these words so no one mistakes God's character."];
  else if (/they have corrupted themselves/.test(lower)) opening = ["Corrupted means ruined themselves morally.", "The blame is placed on the people, not on God's leadership."];
  else if (/they are a perverse and crooked generation/.test(lower)) opening = ["Perverse and crooked describe a people bent away from what is straight.", "The problem is not weakness alone but distortion of heart and path."];
  else if (/do ye thus requite the lord/.test(lower)) opening = ["Requite means repay or answer back.", "Moses is asking how Israel can answer the LORD's goodness with rebellion."];
  else if (/remember the days of old/.test(lower)) opening = ["Moses calls them to learn from long memory, not just present feeling.", "The past is part of wisdom."];
  else if (/ask thy father, and he will shew thee/.test(lower)) opening = ["The people are told to learn their story from older witnesses.", "Covenant memory is meant to be passed down, not rediscovered from scratch."];
  else if (/he set the bounds of the people/.test(lower)) opening = ["Set the bounds means God fixed the nations' places and limits.", "History is pictured as ordered by Him, not random motion."];
  else if (/jacob is the lot of his inheritance/.test(lower)) opening = ["Israel is described as the LORD's own allotted possession.", "The phrase speaks of chosen belonging."];
  else if (/found him in a desert land/.test(lower)) opening = ["The song remembers Israel's helpless beginning in the wilderness.", "God's care starts where they had no strength of their own."];
  else if (/he led him about, he instructed him, he kept him as the apple of his eye/.test(lower)) opening = ["These verbs picture patient protection, guidance, and teaching.", "Apple of his eye means a guarded object of special care."];
  else if (/as an eagle stirreth up her nest/.test(lower)) opening = ["The eagle image pictures strong, watchful, training care.", "God's leadership is both tender and forceful."];
  else if (/so the lord alone did lead him/.test(lower)) opening = ["Alone means no rival god shared credit for Israel's rescue and guidance.", "The song guards the people from spreading praise where it does not belong."];
  else if (/made him ride on the high places of the earth/.test(lower)) opening = ["High places here picture secure possession and rich access to the land's best places.", "God is shown lifting His people into settled blessing."];
  else if (/made him to suck honey out of the rock/.test(lower)) opening = ["Honey out of the rock pictures surprising provision from a hard place.", "The LORD brings sweetness where the people could not have produced it."];
  else if (/butter of kine, and milk of sheep/.test(lower)) opening = ["These foods picture rich pasture and settled abundance.", "The song is reminding Israel how generously the LORD fed them."];
  else if (/jeshurun waxed fat, and kicked/.test(lower)) opening = ["Jeshurun is a poetic name for Israel.", "Waxed fat and kicked means prosperity turned into rebellion."];
  else if (/forsook god which made him/.test(lower)) opening = ["Israel abandoned the very God who made and formed the nation.", "The line exposes rebellion as ingratitude as well as disobedience."];
  else if (/they provoked him to jealousy with strange gods/.test(lower)) opening = ["Strange gods means foreign gods who do not belong in Israel's worship.", "The phrase shows idolatry as a direct insult to the LORD's covenant claim."];
  else if (/they sacrificed unto devils, not to god/.test(lower)) opening = ["The line strips away the glamour of idols by calling their worship demonic and false.", "Moses is saying Israel was not moving to harmless religion, but into dark rebellion."];
  else if (/of the rock that begat thee thou art unmindful/.test(lower)) opening = ["Begat thee uses family language for God's forming care toward Israel.", "To be unmindful is to live as though the Maker had become forgettable."];
  else if (/hast forgotten god that formed thee/.test(lower)) opening = ["Forgotten does not mean lost from memory only, but pushed aside in practice.", "The line names neglect of God as the root of Israel's drift."];
  else if (/i will hide my face from them/.test(lower) && section.chapter === 32) opening = ["In the song, hidden face means the people will feel God's judgment by absence of favor.", "The phrase explains the misery to come."];
  else if (/when the lord saw it, he abhorred them/.test(lower)) opening = ["Abhorred them means the LORD regarded their rebellion with holy disgust.", "The song shows that idolatry does not leave Him indifferent."];
  else if (/they have moved me to jealousy with that which is not god/.test(lower)) opening = ["The phrase mocks idols by calling them not god at all.", "Israel's worship of emptiness is what provokes divine jealousy."];
  else if (/for a fire is kindled in mine anger/.test(lower)) opening = ["The fire image makes God's anger feel consuming and unstoppable.", "Judgment is described as heat that spreads beyond one small point."];
  else if (/they shall be burnt with hunger/.test(lower)) opening = ["Burnt with hunger means consumed by famine and want.", "Need itself becomes part of the judgment."];
  else if (/i will also send the teeth of beasts upon them/.test(lower)) opening = ["The teeth of beasts picture danger from the natural world turning hostile.", "Judgment reaches beyond armies into the land itself."];
  else if (/the sword without, and terror within/.test(lower)) opening = ["The line joins outward attack with inward panic in one picture of collapse.", "Judgment is shown reaching both public danger and private fear."];
  else if (/the sword without/.test(lower)) opening = ["The sword without means danger from war and attack outside the home.", "Judgment is pictured as meeting the people in the open."];
  else if (/and terror within/.test(lower)) opening = ["Terror within means fear and ruin invading the inner life of the community.", "The warning is that no hidden corner stays peaceful under judgment."];
  else if (/sword without, and terror within/.test(lower)) opening = ["Judgment is pictured both outside and inside the community.", "There is no safe place in rebellion."];
  else if (/shall destroy both the young man and the virgin/.test(lower)) opening = ["The line stresses that judgment cuts across age and hope.", "Even those who seem to stand at the beginning of life are not outside its reach."];
  else if (/the suckling also with the man of gray hairs/.test(lower)) opening = ["From nursing infant to gray-haired elder, the whole span of life is named.", "The phrase shows how sweeping the judgment will be."];
  else if (/i would scatter them into corners/.test(lower)) opening = ["The phrase imagines full dispersal under judgment.", "Scattering is a covenant curse of broken stability."];
  else if (/were it not that i feared the wrath of the enemy/.test(lower)) opening = ["God speaks of restraining total destruction so the enemy cannot misread the outcome.", "The LORD will not let pagans take credit for what belongs to His rule."];
  else if (/their rock is not as our rock/.test(lower)) opening = ["False gods are contrasted with the true Rock.", "The enemies themselves are made to see the difference."];
  else if (/how should one chase a thousand/.test(lower)) opening = ["The point is that Israel's collapse would be impossible unless God had handed them over.", "Military reversal is being read as a spiritual signal."];
  else if (/their vine is of the vine of sodom/.test(lower)) opening = ["A vine of Sodom means the source itself is morally ruined.", "The image says corruption is growing from a cursed root."];
  else if (/their grapes are grapes of gall/.test(lower)) opening = ["Gall is bitter and harmful, so these grapes picture fruit that looks usable but brings bitterness.", "The harvest matches the poisoned root it came from."];
  else if (/their wine is the poison of dragons/.test(lower)) opening = ["Wine usually suggests joy, but here it becomes an image of deadly corruption.", "What they produce is intoxicating poison, not blessing."];
  else if (/the cruel venom of asps/.test(lower)) opening = ["Asps are venomous snakes, so the phrase pictures lethal hidden poison.", "Moses is saying their corruption carries death inside it."];
  else if (/is not this laid up in store with me/.test(lower)) opening = ["Laid up in store means kept in reserve with God for the proper time.", "Nothing about judgment is forgotten or misplaced in His hands."];
  else if (/to me belongeth vengeance/.test(lower)) opening = ["Vengeance belongs to God means final justice is His right.", "The phrase guards divine judgment from human presumption."];
  else if (/the lord shall judge his people/.test(lower)) opening = ["Judge His people means the LORD will not ignore Israel's condition forever.", "He will both correct and vindicate in His own time."];
  else if (/where are their gods, their rock in whom they trusted/.test(lower)) opening = ["The question exposes idols by asking them to help when judgment has already fallen.", "What was trusted is shown powerless when it is most needed."];
  else if (/see now that i, even i, am he/.test(lower)) opening = ["The doubled I means God alone is claiming unmatched identity and authority.", "The phrase sweeps rivals away and leaves Him standing by Himself."];
  else if (/i kill, and i make alive/.test(lower)) opening = ["God claims sovereign authority over life, death, wounding, and healing.", "No rival power stands beside Him."];
  else if (/i wound, and i heal/.test(lower)) opening = ["The same God who strikes is also able to restore.", "Healing is not found outside His rule but within it."];
  else if (/i lift up my hand to heaven/.test(lower)) opening = ["Lifting the hand to heaven is oath language.", "God is speaking with solemn certainty about what He will do."];
  else if (/if i whet my glittering sword/.test(lower)) opening = ["Whet means sharpen, so the image is of God preparing judgment like a warrior.", "The glittering sword makes divine justice vivid and active."];
  else if (/i will render vengeance to mine enemies/.test(lower)) opening = ["Render vengeance means repay enemies with the justice they are due.", "God's judgment is not impulsive rage but measured recompense."];
  else if (/rejoice, o ye nations, with his people/.test(lower)) opening = ["The song ends with nations called to rejoice over God's justice and mercy.", "The scope widens beyond Israel alone."];
  else if (/moses came and spake all the words of this song/.test(lower)) opening = ["Moses does not leave the song on a page; he speaks it aloud to the people.", "The warning must be heard, not merely stored."];
  else if (/set your hearts unto all the words/.test(lower)) opening = ["Set your hearts means take these words in with seriousness and intent.", "Moses does not want the song treated as poetry only."];
  else if (/command them your children/.test(lower)) opening = ["Parents are told to pass these words onward as a command, not a suggestion.", "The covenant must travel into the next generation on purpose."];
  else if (/it is not a vain thing for you/.test(lower)) opening = ["Vain here means empty or pointless.", "Moses insists that these words are life, not filler."];
  else if (/the lord spake unto moses that selfsame day/.test(lower)) opening = ["Selfsame day makes the timing immediate and weighty.", "God does not delay the final command to Moses."];
  else if (/mountain abarim|mount nebo/.test(lower)) opening = ["God directs Moses up the mountain to view the land before his death.", "The command closes his public role with solemn clarity."];
  else if (/behold the land of canaan/.test(lower)) opening = ["Behold means look carefully and fully.", "Moses is allowed to see the promise clearly even though he will not enter it."];
  else if (/die in the mount whither thou goest up/.test(lower)) opening = ["God tells Moses plainly that the mountain ascent will end in death.", "The final climb is both privilege and farewell."];
  else if (/this is the blessing/.test(lower)) opening = ["Moses now speaks blessing over Israel before his death.", "The tone shifts from warning to spoken favor."];
  else if (/the lord came from sinai/.test(lower)) opening = ["The blessing begins by recalling the LORD's majestic appearing.", "Israel's future is anchored in who first came to them."];
  else if (/he shined forth from mount paran/.test(lower)) opening = ["Shined forth pictures the LORD appearing in radiant majesty.", "The blessing remembers God as a glorious Deliverer, not a distant idea."];
  else if (/he loved the people/.test(lower)) opening = ["The phrase makes divine love explicit in the middle of holy majesty.", "God's nearness is not cold power only."];
  else if (/let reuben live/.test(lower)) opening = ["Moses speaks survival and preservation over Reuben.", "The blessing is brief but weighty."];
  else if (/let not his men be few/.test(lower)) opening = ["This is a prayer that Reuben not dwindle into weakness or disappearance.", "The tribe is being blessed with continued life and number."];
  else if (/hear, lord, the voice of judah/.test(lower)) opening = ["Judah's blessing is a prayer for the LORD to hear and help.", "The tribe's future is placed under divine response."];
  else if (/of levi he said/.test(lower)) opening = ["Levi's blessing centers on the tribe's priestly calling before God.", "Moses is about to speak about sacred service, guidance, and worship."];
  else if (/thummim and thy urim/.test(lower)) opening = ["Thummim and Urim refer to priestly means of seeking God's judgment.", "The phrase asks that Levi remain entrusted with holy discernment."];
  else if (/they shall teach jacob thy judgments/.test(lower)) opening = ["Levi is blessed with the task of teaching God's judgments to the people.", "Their calling is not only ritual service, but shaping Israel by the law."];
  else if (/bring him unto his people/.test(lower)) opening = ["Bring him unto his people asks for Judah to be restored safely to his brothers.", "The phrase sounds like prayer for reunion, victory, and belonging."];
  else if (/let his hands be sufficient for him/.test(lower)) opening = ["Sufficient hands means strength for the task set before the tribe.", "Judah is being blessed with capability, not self-sufficiency apart from God."];
  else if (/be thou an help to him from his enemies/.test(lower)) opening = ["Judah's safety depends on the LORD becoming his helper in conflict.", "The blessing assumes real enemies and seeks real aid."];
  else if (/let thy thummim and thy urim be with thy holy one/.test(lower)) opening = ["Thummim and Urim were priestly means of discerning God's judgment.", "The blessing asks that Levi remain entrusted with holy guidance."];
  else if (/they shall put incense before thee/.test(lower)) opening = ["Incense before thee refers to priestly worship rising before God.", "Levi is blessed in the work of drawing near at the altar."];
  else if (/whole burnt sacrifice upon thine altar/.test(lower)) opening = ["A whole burnt sacrifice is an offering wholly given to God.", "The phrase highlights Levi's role in complete consecrated worship."];
  else if (/bless, lord, his substance/.test(lower)) opening = ["Substance means Levi's goods, strength, and provision.", "Moses asks God to sustain the tribe's ministry with needed blessing."];
  else if (/of joseph he said/.test(lower)) opening = ["Joseph's blessing opens with attention on the tribe's land and fruitfulness.", "Moses is about to speak in images of richness, growth, and strength."];
  else if (/blessed of the lord be his land/.test(lower)) opening = ["Joseph's land is spoken over as land specially favored by the LORD.", "The blessing pictures the ground itself as receiving divine generosity."];
  else if (/for the precious things of heaven, for the dew/.test(lower)) opening = ["Dew is named as one of heaven's precious gifts to the land.", "Joseph's blessing pictures fertility arriving from above."];
  else if (/for the precious fruits brought forth by the sun/.test(lower)) opening = ["The blessing includes crops ripened by the sun's steady work.", "Joseph's land is pictured as richly productive across the seasons."];
  else if (/of zebulun he said, rejoice, zebulun, in thy going out/.test(lower)) opening = ["Going out points to Zebulun's outward work, trade, or travel under blessing.", "Moses speaks joy over the tribe's movement into its calling."];
  else if (/and, issachar, in thy tents/.test(lower)) opening = ["Issachar in thy tents points to settled life, dwelling, and labor at home.", "The paired blessing shows that both outward work and settled life can stand under God's favor."];
  else if (/they shall call the people unto the mountain/.test(lower)) opening = ["The mountain points to a place of worship and gathering before God.", "Their blessing includes drawing others toward holy assembly."];
  else if (/they shall suck of the abundance of the seas/.test(lower)) opening = ["Suck of the abundance means draw wealth and provision from the sea.", "The phrase pictures fruitful access to resources God has provided."];
  else if (/of gad he said, blessed be he that enlargeth gad/.test(lower)) opening = ["Enlargeth Gad means giving the tribe room, strength, and expansion.", "The blessing praises God for making space for Gad's inheritance and power."];
  else if (/he dwelleth as a lion/.test(lower)) opening = ["The lion image gives Gad a reputation for bold strength and readiness.", "Moses is not describing softness, but a tribe prepared to act."];
  else if (/he executed the justice of the lord/.test(lower)) opening = ["This praises Gad for carrying out what the LORD judged to be right.", "Strength is being connected with obedience, not mere violence."];
  else if (/and his judgments with israel/.test(lower)) opening = ["Gad is remembered as acting in step with God's judgments among the tribes.", "The blessing honors shared covenant faithfulness."];
  else if (/of dan he said, dan is a lion's whelp/.test(lower)) opening = ["A lion's whelp is a young lion, full of emerging strength.", "Dan is being pictured as vigorous and dangerous to oppose."];
  else if (/of naphtali he said, o naphtali, satisfied with favour/.test(lower)) opening = ["Naphtali is described as satisfied with favour, meaning filled and content under blessing.", "The tribe's future is spoken of in terms of received grace, not lack."];
  else if (/he shall leap from bashan/.test(lower)) opening = ["Leaping from Bashan pictures sudden strength and striking movement.", "Dan is given an image of energetic force."];
  else if (/and full with the blessing of the lord/.test(lower)) opening = ["Naphtali is pictured as filled up with the LORD's favor.", "The blessing describes abundance received, not seized."];
  else if (/possess thou the west and the south/.test(lower)) opening = ["Possess means take hold of the inheritance God assigns.", "The phrase names territory as a gift to receive under blessing."];
  else if (/of asher he said, let asher be blessed with children/.test(lower)) opening = ["Asher is blessed with fruitfulness and increase in family line.", "The phrase speaks of life multiplying under God's favor."];
  else if (/let him dip his foot in oil/.test(lower)) opening = ["Oil here pictures richness and abundance in Asher's portion.", "The image suggests a land so fruitful it seems to overflow beneath his steps."];
  else if (/as thy days, so shall thy strength be/.test(lower)) opening = ["The promise means strength will meet the day it is needed.", "God is not offering stored-up ease, but fitting help for each season."];
  else if (/there is none like unto the god of jeshurun/.test(lower)) opening = ["Jeshurun is a poetic name for Israel, and the line exalts Israel's God as unmatched.", "Moses ends the chapter by lifting the people's eyes above every rival power."];
  else if (/the eternal god is thy refuge/.test(lower)) opening = ["Refuge means a shelter where danger cannot finally undo you.", "Israel's safety is grounded in God's everlasting being, not temporary circumstances."];
  else if (/and underneath are the everlasting arms/.test(lower)) opening = ["Everlasting arms picture support that holds from beneath when the people cannot hold themselves up.", "The image turns divine care into something weight-bearing and steady."];
  else if (/happy art thou, o israel/.test(lower)) opening = ["Happy here means deeply blessed and favored, not lightly cheerful.", "Moses is declaring how rare it is to be a people saved by the LORD."];
  else if (/let him be acceptable to his brethren/.test(lower)) opening = ["Acceptable to his brethren means living in favor and peace among the other tribes.", "The blessing reaches relationships, not only material increase."];
  else if (/thy shoes shall be iron and brass/.test(lower)) opening = ["Iron and brass shoes picture strength for rough ground and hard travel.", "The blessing imagines God supplying endurance where the road is demanding."];
  else if (/eternal god is thy refuge|everlasting arms|happy art thou/.test(lower)) opening = ["The eternal God is pictured as lasting refuge beneath His people.", "Moses ends by pointing Israel beyond tribes to the God who holds them all."];

  return note([
    opening[0],
    opening[1],
    getDay55LeadSupport(cleanTitle),
    ...getDay55Support(cleanTitle).slice(0, 3),
  ]);
}

function explainDay56DeuteronomyAt95(cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This line marks the closing of Moses' life and ministry.", "The chapter honors Moses while showing God's promise still moving forward."];
  let lead = "🕯️ Moses' life ends, but God's promise does not.";
  let support = ["👀 Moses sees the promise", "📜 God's word still stands", "👣 Israel must keep moving"];

  if (/mount nebo/.test(lower)) {
    opening = ["Mount Nebo is the mountain where Moses is taken to view the land before he dies.", "The climb is a final meeting place between God's promise and Moses' unfinished journey."];
    lead = "⛰️ Moses is brought to the edge of the promise.";
    support = ["👀 He is allowed to see the land", "📍 The moment is final", "🕯️ His role is ending"];
  } else if (/shewed him all the land/.test(lower)) {
    opening = ["The LORD shewed him means God personally lets Moses see what had been promised for generations.", "Moses does not imagine the land from far away; God displays it to him."];
    lead = "👁️ God gives Moses a final sight of the promise.";
    support = ["👀 The land is clearly shown", "📜 The promise is real", "🕯️ The moment is bittersweet"];
  } else if (/gilead, unto dan/.test(lower)) {
    opening = ["The verse names a wide stretch of the land so the reader feels how much Moses is seeing.", "This is not a vague glimpse, but a real survey of the inheritance."];
    lead = "🗺️ The promise is described in visible detail.";
    support = ["🧭 The land has real boundaries", "👀 Moses sees its breadth", "📜 God's oath was concrete"];
  } else if (/which i sware unto abraham/.test(lower)) {
    opening = ["This is the land which I sware points back to God's covenant oath to Abraham, Isaac, and Jacob.", "The land matters because it rests on God's long-standing promise, not on Israel's imagination."];
    lead = "📜 The land is tied to God's covenant oath.";
    support = ["👴 The patriarchs were promised it", "🗣️ God keeps His word", "🏞️ Canaan is covenant gift"];
  } else if (/thou shalt not go over thither/.test(lower)) {
    opening = ["Moses is allowed to see the land, but not enter it.", "The phrase keeps mercy and discipline together in the same moment."];
    lead = "🚫 Moses sees the promise without crossing into it.";
    support = ["👀 Sight is granted", "⛔ Entry is denied", "➡️ Joshua must lead next"];
  } else if (/moses the servant of the lord died there/.test(lower)) {
    opening = ["Moses is called the servant of the LORD at the moment of his death.", "The title sums up his life as belonging to God before it says anything about his burial."];
    lead = "🕯️ Moses dies as God's servant, not as a forgotten man.";
    support = ["📛 His service is remembered", "⏳ His work is complete", "➡️ God's mission continues"];
  } else if (/according to the word of the lord/.test(lower)) {
    opening = ["According to the word of the LORD means Moses dies at God's appointed command.", "His death is not outside God's rule or timing."];
    lead = "🗣️ Even Moses' death happens under God's word.";
    support = ["⏳ The timing is appointed", "👑 God remains in control", "🕯️ The ending is purposeful"];
  } else if (/buried him in a valley/.test(lower)) {
    opening = ["The burial in the valley shows Moses is laid to rest by God's own care, not with public royal display.", "The scene is quiet, personal, and hidden."];
    lead = "⚰️ Moses is buried under God's own oversight.";
    support = ["🏜️ The grave is in Moab", "🤲 God tends to His servant", "🔇 The ending is quiet"];
  } else if (/no man knoweth of his sepulchre/.test(lower)) {
    opening = ["Sepulchre means tomb or burial place.", "The phrase says Moses' grave is not turned into a public shrine people can center themselves around."];
    lead = "❓ Moses' burial place is kept hidden.";
    support = ["⚰️ He truly dies", "🚫 The grave is not exalted", "👑 Attention stays on God"];
  } else if (/there arose not a prophet since in israel like unto moses/.test(lower)) {
    opening = ["The verse says no later prophet in Israel matched Moses in the same way.", "It is honoring the uniqueness of the leader who brought Israel out of Egypt and gave them the law."];
    lead = "👑 Moses is remembered as uniquely great in Israel.";
    support = ["📜 He gave God's law", "🕊️ He led the exodus generation", "🧠 His role was unmatched"];
  } else if (/whom the lord knew face to face/.test(lower)) {
    opening = ["Face to face speaks of unusual closeness in God's dealings with Moses.", "It does not make Moses divine; it highlights the intimacy of his prophetic calling."];
    lead = "🤝 Moses knew a rare closeness with the LORD.";
    support = ["🗣️ God spoke with him directly", "👑 His calling was unique", "📜 His ministry carried special weight"];
  } else if (/signs and the wonders/.test(lower)) {
    opening = ["Signs and wonders refers to the mighty acts God worked through Moses, especially in Egypt.", "The phrase reminds the reader that Moses' ministry was publicly marked by divine power."];
    lead = "✨ Moses' ministry was confirmed by mighty acts.";
    support = ["🐑 Egypt saw God's power", "👀 Israel witnessed it", "📜 Moses' role was authenticated"];
  } else if (/mighty hand, and in all the great terror/.test(lower)) {
    opening = ["Mighty hand and great terror point to overwhelming acts of power that made the people stand in awe.", "The phrase gathers Moses' public ministry into one last picture of force and fear."];
    lead = "💪 Moses' ministry was marked by awe-filled power.";
    support = ["👀 Israel saw mighty acts", "⚡ God's power was undeniable", "👑 Moses leaves a weighty legacy"];
  } else if (/hundred and twenty years old/.test(lower)) {
    opening = ["Moses' age marks the close of a full life under God's calling.", "The verse is honoring a finished servant, not describing a wasted life."];
    lead = "🕯️ Moses reaches the end of a full appointed life.";
    support = ["📅 His years are counted", "👑 God sustained him long", "➡️ Another leader must now continue"];
  } else if (/his eye was not dim/.test(lower)) {
    opening = ["The verse says Moses' sight had not failed him.", "His death is not being explained as simple decline into helplessness."];
    lead = "👁️ Moses dies before God with clarity still intact.";
    support = ["🕯️ His end is appointed", "💪 He is not pictured as collapsing", "👑 God's timing is emphasized"];
  } else if (/nor his natural force abated/.test(lower)) {
    opening = ["Natural force means bodily strength or vigor.", "The line keeps the reader from thinking Moses' mission ended because his strength had completely disappeared."];
    lead = "💪 Moses' strength had not simply run out.";
    support = ["🕯️ His role ends by God's word", "👑 The transition is intentional", "➡️ Joshua must now lead"];
  } else if (/when he died/.test(lower)) {
    opening = ["Moses dies before Israel crosses into the land.", "The phrase is painful because the great leader sees the promise but does not enter it."];
    lead = "🏔️ Moses' death comes on the threshold of the promise.";
    support = ["👀 He saw the land", "⛔ He did not enter", "➡️ God's mission still continues"];
  } else if (/children of israel wept for moses/.test(lower)) {
    opening = ["Israel wept because Moses was not only a national figure, but the man who led, taught, and interceded for them.", "The mourning shows that his loss was deeply felt."];
    lead = "😭 The people openly grieve the leader they have lost.";
    support = ["👥 The nation mourns", "🕯️ Moses mattered to them", "➡️ Grief comes before the next step"];
  } else if (/plains of moab/.test(lower)) {
    opening = ["The plains of Moab are the final waiting place before Israel enters Canaan.", "Moses is mourned at the edge of the promise, not far back in the wilderness."];
    lead = "🏜️ Grief happens on the border of the promised land.";
    support = ["🏞️ Canaan is near", "😭 The people pause there", "➡️ Hope and loss meet in one place"];
  } else if (/thirty days/.test(lower)) {
    opening = ["Thirty days marks a full period of public mourning.", "Israel does not rush past Moses' death as though his life were a small thing."];
    lead = "📆 The nation gives real time to grief.";
    support = ["👥 The mourning is public", "🕯️ Moses is honored", "➡️ Loss is felt before the journey continues"];
  } else if (/were ended/.test(lower)) {
    opening = ["The mourning had an end point.", "Israel must eventually rise from grief and continue under Joshua's leadership."];
    lead = "🕊️ Mourning is real, but it is not endless.";
    support = ["😭 Grief has its season", "➡️ The people must move again", "👑 God's promise still stands"];
  } else if (/full of the spirit of wisdom/.test(lower)) {
    opening = ["Joshua is described as full of the spirit of wisdom because leadership will require more than courage alone.", "He must know how to guide God's people well."];
    lead = "🧠 God equips Joshua with the wisdom leadership requires.";
    support = ["👑 A new leader is being prepared", "📜 Wisdom must guide the people", "➡️ The transition is supplied by God"];
  } else if (/laid his hands upon him/.test(lower)) {
    opening = ["Moses laying hands on Joshua marks public transfer of leadership.", "Joshua does not seize the role; he receives it through God's appointed servant."];
    lead = "✋ Joshua's leadership is publicly handed on.";
    support = ["👥 Israel can see the transfer", "🕯️ Moses' role is honored", "👑 Joshua is appointed, not self-made"];
  } else if (/children of israel hearkened unto him/.test(lower)) {
    opening = ["Hearkened means listened and responded.", "The people begin to receive Joshua as the leader God has set over them."];
    lead = "👂 Israel starts listening to Joshua.";
    support = ["👥 The transition is accepted", "👑 God's appointment is received", "➡️ The nation can now move forward"];
  } else if (/as the lord commanded moses/.test(lower)) {
    opening = ["Joshua's leadership is tied back to what the LORD had already commanded through Moses.", "The servant changes, but God's command does not."];
    lead = "📜 The transition stays under the same divine command.";
    support = ["🕯️ Moses' word still matters", "👑 God remains the true authority", "➡️ Joshua leads in continuity, not novelty"];
  }

  return note([
    opening[0],
    opening[1],
    lead,
    ...support,
  ]);
}

function makeExplanation(section: PersonalLeviticusPhraseSectionInput, title: string) {
  const cleanTitle = stripLeadingEmoji(title);
  if (section.chapter >= 30 && section.chapter <= 33) {
    return explainDay55DeuteronomyAt95(section, cleanTitle);
  }
  if (section.chapter === 34) {
    return explainDay56DeuteronomyAt95(cleanTitle);
  }
  const [lineOne, lineTwo] = getMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getBullets(title),
    getTakeaway(title),
  ]);
}

function polishSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  const isDay55Section = section.chapter >= 30 && section.chapter <= 33;
  const isDay56GeneratedSection = section.chapter === 34 && day56DeuteronomyCuratedPhraseTitles[section.reference]?.length === section.phrases.length;
  const title = isDay55Section
    ? (day55DeuteronomySectionTitles[section.reference] || section.title)
    : isDay56GeneratedSection
      ? (day56DeuteronomySectionTitles[section.reference] || section.title)
    : section.title;
  const phraseTitles = isDay55Section
    ? (day55DeuteronomyCuratedPhraseTitles[section.reference] || section.phrases.map(([phraseTitle]) => phraseTitle))
    : isDay56GeneratedSection
      ? day56DeuteronomyCuratedPhraseTitles[section.reference]
    : section.phrases.map(([phraseTitle]) => phraseTitle);

  return {
    ...section,
    title,
    phrases: phraseTitles.map((phraseTitle) => [
      phraseTitle,
      makeExplanation(section, phraseTitle),
    ] as PersonalPhrase),
  };
}

export const DEUTERONOMY_30_34_PERSONAL_SECTIONS: PersonalSection[] = [
  ...generatedDeuteronomyThirtyToThirtyFourPersonalSections.map(polishSection),
  ...supplementalDeuteronomyThirtyFourSections.map(polishSection),
];
