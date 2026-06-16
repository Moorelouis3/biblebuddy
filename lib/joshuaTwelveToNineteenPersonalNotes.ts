import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { DAY_59_JOSHUA_12_15_PERSONAL_SECTIONS } from "./dayFiftyNineJoshuaPersonalNotes";

type PersonalPhrase = [string, string];
type PersonalSection = PersonalLeviticusPhraseSectionInput;

const note = (lines: string[]) => lines.join("\n\n");

const dropGeneratedJoshua60References = new Set([
  "Joshua 16:1-4",
  "Joshua 16:5-8",
  "Joshua 16:9",
  "Joshua 16:10",
  "Joshua 17:3-6",
  "Joshua 17:14-18",
  "Joshua 18:1-3",
]);

const upgradedDayFiftyNineOpeningSections: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    reference: "Joshua 12:1-6",
    title: "🌱 Now These Are The Kings Of The Land",
    icon: "🌱",
    phrases: [
      [
        "🌱 Now These Are The Kings Of The Land",
        note([
          "Joshua is pausing to name the defeated kings before the land is divided.",
          "This is not a random list.",
          "It is a record of real victories God gave Israel before they received their inheritance.",
          "👑 Kings had ruled the land",
          "⚔️ Israel had fought real enemies",
          "🗺️ The land had real boundaries",
          "📜 The victories are being remembered",
          "The phrase tells the reader that inheritance in Joshua is built on God's faithfulness in actual history.",
        ]),
      ],
      [
        "👥 Which The Children Of Israel Smote",
        note([
          "Israel did not simply walk into empty territory.",
          "The people had to face kings, armies, fortified places, and long-standing powers in the land.",
          "👥 Israel is the covenant people",
          "⚔️ Smote means they defeated those kings in battle",
          "🛡️ The victories were costly and public",
          "🙏 The LORD had gone before them",
          "The phrase keeps the reader from treating the land as an abstract promise. The promise was received through real deliverance.",
        ]),
      ],
      [
        "🗺️ Possessed Their Land",
        note([
          "Possessed means Israel took hold of the land as an inheritance.",
          "Joshua is showing that the land moved from enemy control into covenant possession.",
          "🗺️ The land changed hands",
          "👥 Tribes would now live there",
          "📜 God's promise was becoming visible",
          "🏠 Possession meant future homes, fields, and cities",
          "The phrase explains why these victories matter: defeated kings make way for settled inheritance.",
        ]),
      ],
      [
        "🌅 On The Other Side Jordan Toward The Rising Of The Sun",
        note([
          "This points to the land east of the Jordan River.",
          "Toward the rising of the sun means the eastern side, where Reuben, Gad, and half of Manasseh received land.",
          "🌅 East of Jordan",
          "🏞️ Before the main crossing into Canaan",
          "👥 The eastern tribes are remembered",
          "🧭 The map is being oriented",
          "Those words place the first victories east of the Jordan before the chapter moves to the western victories.",
        ]),
      ],
      [
        "🏞️ From The River Arnon Unto Mount Hermon",
        note([
          "Joshua gives the range of the conquered territory.",
          "The River Arnon marks the southern side, and Mount Hermon points far north.",
          "🏞️ Arnon marks one edge",
          "⛰️ Hermon marks another edge",
          "🗺️ The victory covers a wide region",
          "📜 The record is specific, not vague",
          "The phrase teaches the reader that Bible geography is part of the story of promise fulfilled.",
        ]),
      ],
      [
        "🌄 All The Plain On The East",
        note([
          "The plain on the east describes the open region east of the Jordan.",
          "Joshua is summarizing the territory Moses' generation had already conquered before the western land was divided.",
          "🌄 Eastern plain",
          "🗺️ Real territory",
          "👥 Assigned to real tribes",
          "🙏 Remembered as part of God's gift",
          "The phrase keeps the eastern inheritance connected to the whole story of Israel receiving the land.",
        ]),
      ],
      [
        "👤 Moses The Servant Of The LORD",
        note([
          "Moses is remembered as the LORD's servant even though Joshua is now leading.",
          "The chapter honors the earlier victories God gave through Moses before listing Joshua's victories west of the Jordan.",
          "👤 Moses served the LORD",
          "📜 His work still matters",
          "➡️ Joshua continues the mission",
          "🙏 The same LORD stands behind both leaders",
          "The phrase shows continuity: the leader changes, but God's promise keeps moving forward.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 7,
    endVerse: 8,
    reference: "Joshua 12:7-8",
    title: "🧭 On This Side Jordan On The West",
    icon: "🧭",
    phrases: [
      [
        "🧭 On This Side Jordan On The West",
        note([
          "Joshua now turns from the eastern victories under Moses to the western victories under Joshua.",
          "The wording marks the chapter's structure: Moses' victories east of Jordan, then Joshua's victories west of Jordan.",
          "🌅 East victories came first",
          "🌄 West victories are now listed",
          "👤 Moses and Joshua are both remembered",
          "📜 The whole land story is being gathered together",
          "Joshua 12 is not filler. It is a victory record for both sides of the Jordan.",
        ]),
      ],
      [
        "🏔️ From Baal-gad In The Valley Of Lebanon",
        note([
          "Baal-gad marks the northern reach of the western conquest.",
          "The name helps place the victories on an actual map instead of leaving them as vague battle stories.",
          "🏔️ Northern boundary",
          "🗺️ Real location",
          "⚔️ Conquest remembered",
          "📜 The record is specific",
          "The phrase shows that Israel's inheritance had shape, distance, and history.",
        ]),
      ],
      [
        "⛰️ Unto The Mount Halak",
        note([
          "Mount Halak marks the southern reach of the territory being summarized.",
          "Together with Baal-gad, it frames the land Joshua conquered west of the Jordan.",
          "⛰️ Southern marker",
          "🧭 Boundary language",
          "🏞️ The land is measured",
          "🙏 The promise becomes visible",
          "The wording traces the sweep of the conquest from north to south.",
        ]),
      ],
      [
        "🏠 For A Possession According To Their Divisions",
        note([
          "The conquered land is not left as a battlefield.",
          "It is given to Israel's tribes as possession according to their divisions.",
          "🏠 Possession means settled inheritance",
          "👥 Divisions means tribal allotments",
          "📜 The land is ordered",
          "🕊️ Victory moves toward home",
          "The phrase shows why the king list matters: conquest prepares the way for inheritance.",
        ]),
      ],
      [
        "🏞️ In The Mountains, And In The Valleys",
        note([
          "Joshua names different kinds of land because the conquest covered more than one kind of terrain.",
          "Israel's inheritance included mountains, valleys, plains, springs, wilderness, and southern country.",
          "🏞️ Mountains were included",
          "🌾 Valleys were included",
          "💧 Springs were included",
          "🏜️ Wilderness was included",
          "The land being received is broad and varied, not one small battlefield.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 6,
    endVerse: 11,
    reference: "Joshua 14:6-11",
    title: "❤️ I Wholly Followed The LORD My God",
    icon: "⛰️",
    phrases: [
      [
        "❤️ I Wholly Followed The LORD My God",
        note([
          "Caleb describes a life of undivided loyalty.",
          "He had seen the same giants as the fearful spies, but he trusted the LORD more than the danger.",
          "❤️ His heart stayed loyal",
          "👣 His obedience endured",
          "⏳ Forty-five years did not erase faith",
          "🙏 The LORD remained his confidence",
          "The phrase explains why Caleb is remembered differently from the unbelieving generation.",
        ]),
      ],
      [
        "💪 I Am As Strong This Day",
        note([
          "Caleb is eighty-five, but he is still ready for the work before him.",
          "The point is not pride in his body. The point is that God has preserved him for the promise.",
          "💪 Strength has been preserved",
          "⏳ Years have passed",
          "📜 The promise still stands",
          "⛰️ The assignment remains",
          "The phrase makes Caleb's faith feel active, not nostalgic.",
        ]),
      ],
      [
        "🛡️ If So Be The LORD Will Be With Me",
        note([
          "Caleb's courage is not confidence without God.",
          "He knows the mountain can only be taken if the LORD is with him.",
          "🛡️ The enemy is real",
          "🙏 God's presence is necessary",
          "⛰️ The mountain is not easy",
          "📜 The promise is trusted",
          "The phrase keeps Caleb's bravery humble and God-centered.",
        ]),
      ],
      [
        "📜 The LORD Spake This Word Unto Moses",
        note([
          "Caleb's request rests on something the LORD had already spoken.",
          "He is not inventing a new claim late in life. He is holding onto an old promise.",
          "📜 God's word came first",
          "👤 Moses heard the promise",
          "⏳ Caleb waited for years",
          "⛰️ The inheritance is still before him",
          "The phrase shows why Caleb can ask boldly without sounding selfish.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 12,
    endVerse: 12,
    reference: "Joshua 14:12",
    title: "⛰️ Now Therefore Give Me This Mountain",
    icon: "⛰️",
    phrases: [
      [
        "⛰️ Now Therefore Give Me This Mountain",
        note([
          "Caleb is asking for the hard inheritance God had promised him.",
          "He is not asking for comfort first. He is asking for the place where faith must still fight.",
          "⛰️ The mountain is difficult",
          "🛡️ The Anakims are still there",
          "📜 God had promised it",
          "💪 Caleb still trusts the LORD",
          "The phrase shows old faith still ready to obey.",
        ]),
      ],
      [
        "🏙️ The Cities Were Great And Fenced",
        note([
          "Caleb does not pretend the cities are easy targets.",
          "Great and fenced means the place is strong, fortified, and intimidating.",
          "🏙️ The cities are strong",
          "🛡️ The walls are real",
          "⚔️ The fight will not be light",
          "🙏 Caleb still trusts the LORD",
          "Faith is not blind to the difficulty. It trusts God while seeing the difficulty clearly.",
        ]),
      ],
      [
        "🙏 If So Be The LORD Will Be With Me",
        note([
          "Caleb's courage depends on God's presence.",
          "He does not speak as if his age, strength, or experience can win the mountain by itself.",
          "🙏 The LORD must be with him",
          "💪 Strength is not enough alone",
          "⛰️ The assignment is serious",
          "📜 The promise is trusted",
          "The phrase keeps Caleb's bravery humble.",
        ]),
      ],
      [
        "⚔️ I Shall Be Able To Drive Them Out",
        note([
          "Caleb believes the enemy can be removed because the LORD has spoken.",
          "This is not empty confidence. It is faith acting on a promise that has lasted for decades.",
          "⚔️ The enemy must be driven out",
          "⏳ The promise has waited",
          "🙏 The LORD is Caleb's confidence",
          "🏞️ The inheritance can be received",
          "The phrase shows faith moving from memory to action.",
        ]),
      ],
    ],
  },
];

const supplementalJoshuaTwelveToNineteenSections: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 4,
    reference: "Joshua 16:1-4",
    title: "🗺️ The Lot Of The Children Of Joseph",
    icon: "🗺️",
    phrases: [
      ["🗺️ The Lot Of The Children Of Joseph", note(["Joseph's descendants receive their inheritance by lot.", "The phrase ties this border list to God's ordered distribution of the land.", "🗺️ The boundary is assigned", "👥 Joseph's family is remembered", "🎲 The lot orders the inheritance", "🏞️ The promise becomes mapped land", "The reader should see covenant promise becoming real geography."])],
      ["🏞️ Fell From Jordan By Jericho", note(["The inheritance begins near the Jordan by Jericho.", "That location matters because Israel has just crossed the Jordan and seen Jericho fall.", "🏞️ The border starts at Jordan", "🏰 Jericho marks the entry point", "👣 The conquest becomes inheritance", "📜 God's promise is being measured", "The phrase connects earlier victory to settled tribal land."])],
      ["⛰️ Throughout Mount Bethel", note(["Mount Bethel marks part of the route of Joseph's inheritance.", "The border language may feel slow, but it shows the land being defined carefully.", "⛰️ The route climbs through hill country", "🗺️ The inheritance has shape", "📍 Places matter", "👥 A tribe receives a real portion", "The phrase keeps the reader from treating the inheritance as vague or symbolic only."])],
      ["🌊 The Goings Out Thereof Are At The Sea", note(["The boundary reaches its far edge at the sea.", "This phrase tells the reader where the line ends, completing the movement from Jordan toward the west.", "🌊 The western edge is named", "🗺️ The border is completed", "🏞️ The land has limits", "📜 The inheritance is ordered", "The phrase shows that God's gift is specific enough to be traced."])],
      ["👥 Manasseh And Ephraim Took Their Inheritance", note(["Joseph's two sons receive inheritance through their tribes.", "Manasseh and Ephraim show how Joseph's family becomes two major tribal portions in the land.", "👥 Joseph's house is divided into two tribes", "🏞️ Both receive inheritance", "📜 Jacob's blessing is remembered", "🗺️ The promise reaches families", "The phrase explains why Joseph's name appears through Manasseh and Ephraim."])],
    ],
  },
  {
    chapter: 16,
    startVerse: 5,
    endVerse: 8,
    reference: "Joshua 16:5-8",
    title: "🌿 The Border Of The Children Of Ephraim",
    icon: "🌿",
    phrases: [
      ["🌿 The Border Of The Children Of Ephraim", note(["Ephraim's inheritance is now described more closely.", "The phrase moves from Joseph's larger family to Ephraim's specific tribal portion.", "🌿 Ephraim is named", "🗺️ The border is traced", "👥 Families are included", "🏞️ The promise becomes local", "The reader should see God's promise reaching a named tribe with actual boundaries."])],
      ["👨‍👩‍👧 According To Their Families", note(["The land is distributed through family lines.", "Inheritance is not random land ownership. It is covenant provision for households.", "👨‍👩‍👧 Families receive a place", "🏠 Households are protected", "📜 Order matters", "🗺️ The tribe is organized", "God's promise reaches ordinary family life."])],
      ["🌅 On The East Side", note(["The east side marks one direction of Ephraim's border.", "Border details orient the reader so the inheritance can be followed across the land.", "🌅 Direction is given", "🗺️ The line can be traced", "🏞️ The land is concrete", "👥 Ephraim receives a defined place", "The phrase helps make the inheritance visible instead of abstract."])],
      ["🌊 The Border Went Out Toward The Sea", note(["Ephraim's boundary stretches toward the sea.", "The wording describes movement across the land so the tribal map can be followed.", "🌊 The line moves westward", "🗺️ The inheritance has edges", "📍 Towns mark the route", "🏞️ The promise is measured", "The land promise is being organized with care."])],
      ["🏞️ This Is The Inheritance Of The Tribe", note(["The chapter pauses to identify Ephraim's portion as inheritance.", "Inheritance means received gift and responsibility, not merely territory taken by force.", "🏞️ The land is received", "👥 The tribe is named", "📜 The promise is fulfilled", "🧭 Boundaries bring order", "The phrase tells the reader how to understand the border list: this is covenant inheritance."])],
      ["👥 Children Of Ephraim By Their Families", note(["Ephraim's inheritance is counted through family groupings.", "The repeated family language keeps the land connected to people who will live, worship, farm, and raise children there.", "👥 The tribe is personal", "🏠 Families need a place", "🌿 The land supports life", "📜 God's promise reaches households", "The phrase makes the map pastoral: God is settling His people."])],
    ],
  },
  {
    chapter: 16,
    startVerse: 9,
    endVerse: 9,
    reference: "Joshua 16:9",
    title: "🏘️ The Separate Cities For The Children Of Ephraim",
    icon: "🏘️",
    phrases: [
      ["🏘️ The Separate Cities For The Children Of Ephraim", note(["Ephraim receives cities even within the area connected to Manasseh.", "This detail shows that tribal inheritance can include shared or embedded places.", "🏘️ Cities are named as part of inheritance", "👥 Ephraim receives a portion", "🗺️ The land is carefully arranged", "🤝 Tribal borders can overlap in detail", "The phrase explains why the map is more detailed than a simple line."])],
      ["👥 Among The Inheritance Of The Children Of Manasseh", note(["Some Ephraimite cities are located within Manasseh's broader inheritance.", "The phrase shows the complexity of tribal settlement inside Joseph's family line.", "👥 Joseph's family has two tribes", "🗺️ Inheritances touch each other", "🏘️ Cities are placed carefully", "📜 The allotment remains ordered", "The reader learns that inheritance is detailed and relational, not careless."])],
      ["🏘️ All The Cities With Their Villages", note(["The inheritance includes cities and their surrounding villages.", "The land is not only borders; it includes communities where people will live.", "🏘️ Cities provide centers", "🏡 Villages surround them", "🌾 Daily life is included", "👥 Families need settled places", "The map becomes lived covenant life."])],
      ["📜 The Inheritance Of The Children", note(["Inheritance is the key idea behind these city details.", "The chapter is not merely recording geography. It is showing what God gives to His people by tribe and family.", "📜 Promise becomes inheritance", "👥 Children receive a place", "🏞️ Land is assigned", "🧭 Order protects the gift", "The phrase keeps the reader focused on covenant fulfillment."])],
    ],
  },
  {
    chapter: 16,
    startVerse: 10,
    endVerse: 10,
    reference: "Joshua 16:10",
    title: "⚠️ They Drave Not Out The Canaanites",
    icon: "⚠️",
    phrases: [
      ["⚠️ They Drave Not Out The Canaanites", note(["Ephraim does not fully remove the Canaanites from Gezer.", "The phrase is an early warning that incomplete obedience will remain a problem in the land.", "⚠️ Obedience is incomplete", "🏙️ Gezer remains mixed", "👥 Canaanites continue there", "📉 Future trouble is planted", "The reader should hear this as a warning, not just a settlement note."])],
      ["🏙️ That Dwelt In Gezer", note(["Gezer is the specific city where the Canaanites remain.", "Naming the place makes the warning concrete. This is not a vague failure somewhere in the land.", "🏙️ The city is identified", "👥 The people remain", "⚠️ The problem is local", "🗺️ The map includes spiritual danger", "The phrase shows that unfinished obedience has an address."])],
      ["🏠 The Canaanites Dwell Among The Ephraimites", note(["The Canaanites continue living among Ephraim.", "This creates a mixed situation inside the inheritance God gave the tribe.", "🏠 They remain in the land", "👥 Ephraim lives beside them", "⚠️ Separation is incomplete", "📜 The command has not been fully carried out", "The phrase prepares readers for later compromise in Israel's story."])],
      ["⏳ Unto This Day", note(["Unto this day means the situation continued beyond the first moment of settlement.", "The phrase tells the reader this was not a temporary delay that quickly disappeared.", "⏳ The problem lasts", "⚠️ Incomplete obedience remains visible", "🏙️ Gezer stays mixed", "📉 The warning carries forward", "The phrase shows the long shadow of unfinished obedience."])],
      ["💰 Serve Under Tribute", note(["The Canaanites are made forced laborers instead of being driven out.", "Ephraim gains control, but control is not the same as complete obedience.", "💰 Tribute replaces removal", "⚠️ Compromise becomes practical", "👥 The Canaanites remain", "📜 God's command is not fully followed", "The phrase teaches that partial control can still be disobedience."])],
    ],
  },
  {
    chapter: 17,
    startVerse: 3,
    endVerse: 6,
    reference: "Joshua 17:3-6",
    title: "👩‍👧 The Daughters Of Zelophehad",
    icon: "👩‍👧",
    phrases: [
      ["👩‍👧 Zelophehad Had No Sons But Daughters", note(["Zelophehad's family situation matters for inheritance.", "Because he had daughters and no sons, the chapter recalls how their inheritance was protected.", "👩‍👧 Daughters are named", "🏠 A family line is preserved", "📜 The earlier command is remembered", "🏞️ The land includes them", "The phrase shows careful justice inside the inheritance process."])],
      ["📜 The LORD Commanded Moses To Give Us An Inheritance", note(["The daughters appeal to the LORD's command given through Moses.", "Their request is not selfish pressure. It rests on God's instruction about their family inheritance.", "📜 God's command is the basis", "👩‍👧 The daughters speak", "🏞️ Inheritance is protected", "⚖️ Justice is remembered", "The phrase shows how God's law guards a vulnerable family line."])],
      ["🏞️ An Inheritance Among Our Brethren", note(["The daughters receive a place among their relatives.", "This matters because they are not pushed outside the covenant inheritance because their father had no sons.", "🏞️ They receive land", "👥 They remain among family", "⚖️ Justice is upheld", "📜 God's command is honored", "The phrase shows inheritance being handled with covenant fairness."])],
      ["✅ According To The Commandment Of The LORD", note(["The inheritance is given because the LORD commanded it.", "The phrase keeps the decision rooted in obedience, not mere human kindness.", "✅ The command is followed", "📜 Moses' instruction stands", "👩‍👧 The daughters are protected", "🏞️ The inheritance is given", "The phrase shows Israel applying God's word inside a real family case."])],
      ["🔟 Ten Portions Fell To Manasseh", note(["Manasseh's inheritance includes the portions connected to Zelophehad's daughters.", "The number shows that the family case affects the actual distribution of land.", "🔟 The portions are counted", "🏞️ The tribe receives land", "👩‍👧 The daughters are included", "📜 The allotment is ordered", "The phrase shows justice becoming part of the map."])],
    ],
  },
  {
    chapter: 17,
    startVerse: 14,
    endVerse: 18,
    reference: "Joshua 17:14-18",
    title: "🌲 The Mountain Shall Be Thine",
    icon: "🌲",
    phrases: [
      ["❓ Why Hast Thou Given Me But One Lot", note(["The children of Joseph complain that their inheritance feels too small.", "Their question reveals tension between receiving land and taking responsibility to clear it.", "❓ They question the allotment", "👥 They see themselves as many people", "🏞️ They want more room", "🧭 Joshua answers with responsibility", "The phrase opens a lesson about using the land already given."])],
      ["👥 I Am A Great People", note(["Joseph's descendants describe themselves as numerous and blessed.", "Joshua does not deny their strength. He directs that strength toward work.", "👥 They are many", "💪 They have capacity", "🌲 The hill country must be cleared", "🏞️ Inheritance requires action", "The phrase shows that blessing brings responsibility, not only entitlement."])],
      ["🌲 Get Thee Up To The Wood Country", note(["Joshua tells them to clear the wooded hill country.", "The answer is practical: if they need more space, they must work the inheritance before them.", "🌲 Trees must be cleared", "👣 They must move", "🏞️ The land can be used", "💪 Strength must become obedience", "The phrase turns complaint into assignment."])],
      ["🪓 Cut Down For Thyself There", note(["The tribe is told to make room by laboring in the land.", "Joshua does not solve their complaint by giving an easy replacement. He calls them to act.", "🪓 Work is required", "🌲 Obstacles must be removed", "🏞️ The inheritance can expand in use", "👥 The people must participate", "The phrase shows that receiving a promise can still involve hard work."])],
      ["🐎 Chariots Of Iron", note(["The Canaanites' iron chariots represent intimidating military strength.", "Joseph's descendants see the obstacle clearly, but Joshua points them back to their own God-given strength.", "🐎 The enemy looks strong", "😨 Fear is understandable", "💪 Israel must not stop", "👑 The LORD's promise remains", "The phrase names the obstacle without making it greater than God's promise."])],
      ["🏔️ The Mountain Shall Be Thine", note(["Joshua promises that the hill country can belong to them.", "The phrase is both encouragement and command: the land is theirs, but they must take up the task.", "🏔️ The land is promised", "🪓 Work is required", "💪 Strength must be used", "👑 God's gift is trusted", "The phrase closes the complaint with courageous responsibility."])],
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 3,
    reference: "Joshua 18:1-3",
    title: "⛺ Set Up The Tabernacle Of The Congregation",
    icon: "⛺",
    phrases: [
      ["⛺ Set Up The Tabernacle Of The Congregation", note(["The tabernacle is set up at Shiloh while the land is being divided.", "This places worship at the center of Israel's settled life.", "⛺ The tabernacle is established", "🙏 Worship remains central", "🏞️ The land is being received", "👥 The congregation gathers", "The phrase shows that inheritance is not separated from the LORD's presence."])],
      ["🏞️ The Land Was Subdued Before Them", note(["The main resistance has been broken, but the work of possession is not finished.", "The phrase explains why Joshua can now press the remaining tribes to receive their inheritance.", "🏞️ The land is subdued", "👣 Possession still matters", "📜 The promise is ready to be received", "⚠️ Delay is now the issue", "The phrase holds victory and responsibility together."])],
      ["⏳ How Long Are Ye Slack To Go", note(["Joshua confronts the tribes for delaying.", "Slack means they are holding back when they should be moving forward into what the LORD has given.", "⏳ Delay is challenged", "👣 They must go", "🏞️ The inheritance waits", "📜 God's promise should be acted on", "The phrase warns against treating God's gift casually."])],
      ["🎁 The Land Which The LORD God Of Your Fathers Hath Given You", note(["The inheritance is described as a gift from the covenant God of their fathers.", "Joshua's rebuke rests on this truth: they are slow to receive what God has given.", "🎁 The land is given", "👑 The LORD is the giver", "👴 The fathers' promise is remembered", "👣 The tribes must respond", "The phrase makes their delay look spiritually serious."])],
    ],
  },
];

const generatedJoshuaTwelveToNineteenPersonalSections = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [12, 13, 14, 15, 16, 17, 18, 19],
  icon: "🗺️",
  fallbackPhrases: [
    "The Land Rested From War",
    "The LORD Gave Unto Israel",
    "Inheritance By Lot",
    "According To Their Families",
    "Cities And Villages",
    "The Children Of Israel",
    "The Kings Of The Land",
    "There Remaineth Yet Very Much Land",
    "Give Me This Mountain",
    "The Lot Came Out",
    "Their Coast Went Out",
    "The Tabernacle Of The Congregation",
  ],
}).filter((section) => ![12, 13, 14, 15].includes(section.chapter));

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

const day60JoshuaCuratedPhraseTitles: Record<string, string[]> = {
  "Joshua 16:1-4": [
    "🗺️ The Lot Of The Children Of Joseph",
    "🌊 Fell From Jordan By Jericho",
    "⛰️ Through The Wilderness Of Beth-el Unto Luz",
    "🌊 The Goings Out Thereof Were At The Sea",
  ],
  "Joshua 16:5-8": [
    "🌿 The Border Of The Children Of Ephraim",
    "👨‍👩‍👧 According To Their Families",
    "🌅 On The East Side",
    "🌊 The Border Went Out Toward The Sea",
  ],
  "Joshua 17:1-2": [
    "🧭 There Was Also A Lot For The Tribe Of Manasseh",
    "👶 He Was The Firstborn Of Joseph",
    "⚔️ Because He Was A Man Of War",
    "🏠 The Rest Of Manasseh's Sons Had Their Portion",
  ],
  "Joshua 17:7-12": [
    "🗺️ The Coast Of Manasseh Was From Asher To Michmethah",
    "↗️ The Border Descended Unto The River Kanah",
    "🏘️ Manasseh Had In Issachar And In Asher",
    "⚠️ Yet The Children Of Manasseh Could Not Drive Out",
  ],
  "Joshua 17:13-13": [
    "💰 The Canaanites To Tribute",
    "🚫 They Would Not Utterly Drive Them Out",
    "💪 When The Children Of Israel Were Waxen Strong",
    "⚠️ Strength Did Not Become Full Obedience",
  ],
  "Joshua 17:14-15": [
    "❓ Why Hast Thou Given Me But One Lot",
    "👥 I Am A Great People",
    "🌲 Get Thee Up To The Wood Country",
    "🪓 Cut Down For Thyself There",
  ],
  "Joshua 17:16-18": [
    "⛰️ The Hill Is Not Enough For Us",
    "🐎 All The Canaanites... Have Chariots Of Iron",
    "💪 Thou Art A Great People, And Hast Great Power",
    "🌲 The Mountain Shall Be Thine",
  ],
  "Joshua 18:2-3": [
    "🏠 There Remained Among The Children Of Israel Seven Tribes",
    "⏳ How Long Are Ye Slack To Go",
    "🎁 The Land Which The LORD God Of Your Fathers Hath Given You",
    "⚠️ A Gift Can Still Be Neglected",
  ],
  "Joshua 18:4-7": [
    "👥 Give Out From Among You Three Men For Each Tribe",
    "🗺️ They Shall Rise, And Go Through The Land",
    "📛 The Priesthood Of The LORD Is Their Inheritance",
    "🌅 Reuben, Gad, And Half Manasseh Have Received Their Inheritance",
  ],
  "Joshua 18:8-10": [
    "📋 Describe It According To The Inheritance Of Them",
    "📍 In Seven Parts",
    "🎲 Joshua Cast Lots For Them In Shiloh",
    "🗺️ Joshua Divided The Land",
  ],
  "Joshua 18:11-16": [
    "🎲 The Lot Of The Tribe Of Benjamin Came Up",
    "🗺️ The Coast Of Their Lot Came Forth",
    "⬇️ The Border Went Down To The End Of The Mountain",
    "💧 Descended To The Waters Of En-shemesh",
  ],
  "Joshua 18:17-20": [
    "🧂 The Border Passed Along Toward The North",
    "🪨 Went Down Unto The Stone Of Bohan",
    "🌊 Jordan Was The Border Of It",
    "🧭 This Was The Inheritance Of Benjamin",
  ],
  "Joshua 18:21-26": [
    "🏘️ The Cities Of The Tribe Of Benjamin",
    "📍 Jericho, Beth-hoglah, And The Valley Of Keziz",
    "📍 Gibeon, Ramah, And Beeroth",
    "📌 Twelve Cities With Their Villages",
  ],
  "Joshua 18:27-28": [
    "📍 Zelah, Eleph, And Jebusi",
    "🏙️ Jebusi, Which Is Jerusalem",
    "📌 Fourteen Cities With Their Villages",
    "🏠 This Is The Inheritance Of Benjamin",
  ],
  "Joshua 19:1-6": [
    "🎲 The Second Lot Came Forth To Simeon",
    "🏠 Their Inheritance Was Within The Inheritance Of Judah",
    "📍 Beer-sheba, Sheba, And Moladah",
    "📌 Thirteen Cities And Their Villages",
  ],
  "Joshua 19:7-9": [
    "📍 Ain, Remmon, And Ether",
    "📌 Four Cities And Their Villages",
    "🏠 Out Of The Portion Of The Children Of Judah",
    "⚖️ The Part Of Judah Was Too Much For Them",
  ],
  "Joshua 19:10-15": [
    "🎲 The Third Lot Came Up For Zebulun",
    "🌊 Their Border Went Up Toward The Sea",
    "📍 Their Border Compassed Sarid",
    "📌 Twelve Cities With Their Villages",
  ],
  "Joshua 19:16-16": [
    "🏠 This Is The Inheritance Of Zebulun",
    "👨‍👩‍👧 According To Their Families",
    "🏘️ These Cities With Their Villages",
    "📌 The Allotment Is Complete",
  ],
  "Joshua 19:17-22": [
    "🎲 The Fourth Lot Came Out To Issachar",
    "📍 Their Border Went To Jezreel",
    "🌊 Reached To Jordan",
    "📌 Sixteen Cities With Their Villages",
  ],
  "Joshua 19:23-23": [
    "🏠 This Is The Inheritance Of Issachar",
    "👨‍👩‍👧 According To Their Families",
    "🏘️ The Cities And Their Villages",
    "📌 The Allotment Is Stated Plainly",
  ],
  "Joshua 19:24-29": [
    "🎲 The Fifth Lot Came Out For Asher",
    "📍 Their Border Turned Toward Ramah",
    "🌊 The Goings Out Thereof Are At The Sea",
    "📌 Twenty And Two Cities With Their Villages",
  ],
  "Joshua 19:30-31": [
    "🏠 This Is The Inheritance Of The Tribe Of Asher",
    "👨‍👩‍👧 According To Their Families",
    "🏘️ These Cities With Their Villages",
    "📌 The Allotment Is Complete",
  ],
  "Joshua 19:32-37": [
    "🎲 The Sixth Lot Came Out To Naphtali",
    "🌳 Their Border Was From Heleph, From Allon To Zaanannim",
    "🌊 Reached To Judah Upon Jordan",
    "📌 Nineteen Cities With Their Villages",
  ],
  "Joshua 19:38-39": [
    "🏠 This Is The Inheritance Of Naphtali",
    "👨‍👩‍👧 According To Their Families",
    "🏘️ The Cities And Their Villages",
    "📌 The Allotment Is Complete",
  ],
  "Joshua 19:40-45": [
    "🎲 The Seventh Lot Came Out For Dan",
    "📍 The Coast Of Their Inheritance Was Zorah, And Eshtaol",
    "📍 Shaalabbin, Ajalon, And Jethlah",
    "📌 Cities Named Within Dan's Portion",
  ],
  "Joshua 19:46-48": [
    "⚔️ The Children Of Dan Went Up To Fight Against Leshem",
    "🏙️ Took It, And Smote It With The Edge Of The Sword",
    "🏠 Called Leshem, Dan, After The Name Of Dan Their Father",
    "🏠 This Is The Inheritance Of Dan",
  ],
  "Joshua 19:49-50": [
    "🏁 They Made An End Of Dividing The Land",
    "🏙️ They Gave Joshua The City Which He Asked",
    "🏠 Timnath-serah In Mount Ephraim",
    "➡️ He Built The City, And Dwelt Therein",
  ],
};

const day60JoshuaSectionTitles: Record<string, string> = {
  "Joshua 16:1-4": "🗺️ The Lot Of Joseph",
  "Joshua 16:5-8": "🌿 The Border Of Ephraim",
  "Joshua 17:1-2": "🎲 A Lot For Manasseh",
  "Joshua 17:7-12": "⚠️ Manasseh Could Not Drive Them Out",
  "Joshua 17:13-13": "💰 Tribute Without Full Obedience",
  "Joshua 17:14-15": "❓ Why Hast Thou Given Me But One Lot",
  "Joshua 17:16-18": "🌲 The Mountain Shall Be Thine",
  "Joshua 18:2-3": "⏳ How Long Are Ye Slack",
  "Joshua 18:4-7": "🗺️ Describe The Land",
  "Joshua 18:8-10": "🎲 Joshua Cast Lots In Shiloh",
  "Joshua 18:11-16": "🧭 Benjamin's Border Came Forth",
  "Joshua 18:17-20": "🌊 Jordan Was The Border",
  "Joshua 18:21-26": "🏘️ The Cities Of Benjamin",
  "Joshua 18:27-28": "🏙️ Jebusi, Which Is Jerusalem",
  "Joshua 19:1-6": "🎲 The Second Lot To Simeon",
  "Joshua 19:7-9": "⚖️ Judah's Portion Was Too Much",
  "Joshua 19:10-15": "🎲 The Third Lot To Zebulun",
  "Joshua 19:16-16": "🏠 The Inheritance Of Zebulun",
  "Joshua 19:17-22": "🎲 The Fourth Lot To Issachar",
  "Joshua 19:23-23": "🏠 The Inheritance Of Issachar",
  "Joshua 19:24-29": "🎲 The Fifth Lot To Asher",
  "Joshua 19:30-31": "🏠 The Inheritance Of Asher",
  "Joshua 19:32-37": "🎲 The Sixth Lot To Naphtali",
  "Joshua 19:38-39": "🏠 The Inheritance Of Naphtali",
  "Joshua 19:40-45": "🎲 The Seventh Lot To Dan",
  "Joshua 19:46-48": "⚔️ Dan Took Leshem",
  "Joshua 19:49-50": "🏁 They Made An End Of Dividing The Land",
};

function explainDay59JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = [
    "This line belongs to Israel's land allotment after the main conquest battles.",
    "The phrase is meant to make the inheritance, borders, or remembered victories concrete.",
  ];
  let lead = "🏞️ Joshua is turning conquest into settled inheritance.";
  let support = ["🗺️ Boundaries and places matter here", "👥 Tribes and families are being located", "🙌 God's promise is becoming visible on the map"];

  if (section.chapter === 12) {
    lead = "👑 Joshua 12 records the kings whose rule fell before Israel's inheritance.";
    support = ["⚔️ Victory over rulers is being remembered", "🗺️ The land has real locations", "🙌 The record shows fulfilled promise in history"];
  } else if (section.chapter === 13) {
    lead = "🏞️ Joshua 13 moves from conquest to unfinished land and tribal inheritance.";
    support = ["📍 Real territory is being assigned", "👥 Tribes receive defined portions", "🙌 The LORD remains the giver of the land"];
  } else if (section.chapter === 14) {
    lead = "⛰️ Joshua 14 joins inheritance with Caleb's long-tested faith.";
    support = ["🧭 The land is assigned by God's word", "💪 Caleb still trusts the promise", "🙌 Inheritance and faithfulness stay connected"];
  } else if (section.chapter === 15) {
    lead = "🗺️ Joshua 15 traces Judah's border, cities, and family inheritance.";
    support = ["📍 The map of Judah is being drawn", "👥 Families live in named places", "🙌 The promise takes shape in actual towns and boundaries"];
  }

  if (/now these are the kings of the land/.test(lower)) {
    opening = ["The chapter begins by naming the kings whose land was taken from them.", "This is a conquest record, not a filler list."];
  } else if (/which the children of israel smote/.test(lower)) {
    opening = ["Smote means Israel struck and defeated these kings in battle.", "The phrase reminds the reader that inheritance followed real conflict."];
  } else if (/possessed their land/.test(lower)) {
    opening = ["Possessed means Israel took hold of the land as inheritance.", "The land changed from enemy control to covenant possession."];
  } else if (/on the other side jordan toward the rising of the sun/.test(lower)) {
    opening = ["Toward the rising of the sun means east of the Jordan River.", "The phrase locates the first victories on the eastern side."];
  } else if (/from the river arnon unto mount hermon/.test(lower)) {
    opening = ["Arnon and Hermon mark the range of the conquered territory from south to north.", "The phrase gives the victory record real geographic spread."];
  } else if (/all the plain on the east/.test(lower)) {
    opening = ["The plain on the east refers to the eastern lowland region beyond Jordan.", "The phrase keeps that side of Israel's inheritance in view too."];
  } else if (/moses the servant of the lord/.test(lower) && section.reference === "Joshua 12:1-6") {
    opening = ["Moses is remembered as the LORD's servant in the record of the eastern victories.", "The phrase ties Joshua's day back to what God had already done through Moses."];
  } else if (/on this side jordan on the west/.test(lower)) {
    opening = ["On the west means the chapter now turns to the land west of the Jordan.", "The phrase marks the shift from Moses' victories to Joshua's."];
  } else if (/from baal-gad in the valley of lebanon/.test(lower)) {
    opening = ["Baal-gad marks the northern reach of the western conquest summary.", "The phrase helps the reader picture how far the victories extended."];
  } else if (/unto the mount halak/.test(lower)) {
    opening = ["Mount Halak marks the southern end of the region being summarized.", "The phrase works with the northern marker to frame the conquered land."];
  } else if (/for a possession according to their divisions/.test(lower)) {
    opening = ["Possession here means inherited land divided among the tribes.", "According to their divisions means each tribe receives its ordered portion."];
  } else if (/in the mountains, and in the valleys/.test(lower)) {
    opening = ["The wording lists different kinds of terrain inside Israel's inheritance.", "The land includes varied regions, not one flat uniform space."];
  } else if (/are the kings of the country which joshua/.test(lower)) {
    opening = ["Joshua now names the kings he defeated in the western land.", "The phrase introduces a list of rulers whose power had to fall before inheritance could be settled."];
  } else if (/kings of the country which joshua and the/.test(lower)) {
    opening = ["The chapter keeps counting western kings one by one.", "Each named ruler stands as another witness to the conquest God gave Israel."];
  } else if (/which joshua and the children of israel smote/.test(lower)) {
    opening = ["Joshua and Israel are named together because the whole people shared in these victories.", "The phrase keeps conquest tied to the covenant community, not Joshua alone."];
  } else if (/joshua and the children of israel smote on/.test(lower)) {
    opening = ["Joshua and all Israel are named together in the western conquest record.", "The phrase stresses shared victory under God's help."];
  } else if (/children of israel smote on this side jordan/.test(lower)) {
    opening = ["The children of Israel are identified as the people who won these western victories.", "The phrase keeps the conquest tied to the covenant nation."];
  } else if (/of israel smote on this side jordan on/.test(lower)) {
    opening = ["The record keeps locating these victories on the west side of the Jordan.", "The phrase is part of the chapter's map-like summary of conquest."];
  } else if (/israel smote on this side jordan on the/.test(lower)) {
    opening = ["The western land is still the setting being described in this conquest count.", "The phrase helps the reader stay oriented inside Joshua's summary list."];
  } else if (/king of debir one the king of geder/.test(lower)) {
    opening = ["Debir and Geder are counted as two more defeated kings in the record.", "The phrase adds their fall to the running conquest list."];
  } else if (/of debir one the king of geder one/.test(lower)) {
    opening = ["Debir's king and Geder's king are being counted one after another.", "The repeated numbering style emphasizes steady conquest."];
  } else if (/the king of debir one the king of/.test(lower)) {
    opening = ["The chapter continues the one-by-one counting of defeated kings beginning with Debir.", "The phrase belongs to the running total of conquered rulers."];
  } else if (/king of hormah one the king of arad/.test(lower)) {
    opening = ["Hormah and Arad are added as more defeated royal cities.", "The phrase keeps extending the list of conquered kings."];
  } else if (/of hormah one the king of arad one/.test(lower)) {
    opening = ["The kings of Hormah and Arad are counted in sequence here.", "The phrase shows the conquest record moving ruler by ruler."];
  } else if (/king of libnah one the king of adullam/.test(lower)) {
    opening = ["Libnah and Adullam are named as further kings who fell before Israel.", "The phrase keeps building the conquest count."];
  } else if (/of libnah one the king of adullam one/.test(lower)) {
    opening = ["Libnah's king and Adullam's king are listed as another counted pair.", "The one-by-one wording keeps the record exact."];
  } else if (/king of madon one the king of hazor/.test(lower)) {
    opening = ["Madon and Hazor are included among the kings Joshua overcame.", "The phrase continues the western victory roll."];
  } else if (/of madon one the king of hazor one/.test(lower)) {
    opening = ["The kings of Madon and Hazor are counted one after another.", "The wording adds them to the measured list of conquered rulers."];
  } else if (/king of shimron-meron one the king of achshaph/.test(lower)) {
    opening = ["Shimron-meron and Achshaph are two more kings in the conquest total.", "Their names keep the record specific and historical."];
  } else if (/king of tirzah one all the kings thirty/.test(lower)) {
    opening = ["Tirzah's king appears near the end of the list before the total is given.", "The phrase helps close the conquest count."];
  } else if (/of tirzah one all the kings thirty and/.test(lower)) {
    opening = ["Tirzah stands at the end of the list just before the final number is stated.", "The phrase gathers the chapter toward its conclusion."];
  } else if (/the king of tirzah one all the kings/.test(lower)) {
    opening = ["The king of Tirzah is the last ruler named before the full total is summarized.", "The phrase prepares for the final count of conquered kings."];
  } else if (/all the kings thirty and one/.test(lower) || /tirzah one all the kings thirty and one/.test(lower)) {
    opening = ["Thirty and one gives the total number of western kings listed in the chapter.", "The phrase gathers many separate victories into one final count."];
  } else if (/now joshua was old and stricken in years/.test(lower) || /joshua was old and stricken in years and/.test(lower)) {
    opening = /now joshua was old/.test(lower)
      ? ["Stricken in years means advanced in age.", "The phrase reminds the reader that much land has been taken, but Joshua is now old as the work continues."]
      : ["Joshua's age is repeated to stress the urgency of finishing the land assignment.", "The work continues even though the leader is now advanced in years."];
  } else if (/remaineth yet very much land to be possessed/.test(lower)) {
    opening = ["Very much land remains means conquest is not yet complete.", "The phrase keeps Israel from confusing major victory with finished possession."];
  } else if (/land that yet remaineth all the borders of/.test(lower)) {
    opening = ["The borders still to be possessed are now being named explicitly.", "The phrase points to unfinished regions inside the promised land."];
  } else if (/the land that yet remaineth all the borders/.test(lower)) {
    opening = ["The remaining land is being described in terms of its outer boundaries.", "The phrase keeps unfinished conquest tied to actual geography."];
  } else if (/by lot unto the israelites for an inheritance/.test(lower)) {
    opening = ["The Israelites are to receive the remaining land by lot as inheritance.", "The phrase places distribution under God's ordering."];
  } else if (/lot unto the israelites for an inheritance as/.test(lower)) {
    opening = ["The lot is the method by which the inheritance will be assigned.", "The phrase emphasizes that the allotment is received, not seized by preference."];
  } else if (/their inheritance which moses gave them beyond jordan/.test(lower)) {
    opening = ["The eastern inheritance already given through Moses is being recalled here.", "The phrase connects Joshua's day with earlier allotments beyond Jordan."];
  } else if (/inheritance which moses gave them beyond jordan eastward/.test(lower)) {
    opening = ["The phrase points specifically to inheritance east of the Jordan under Moses.", "That earlier gift remains part of the same land story."];
  } else if (/beyond jordan eastward even as moses the servant/.test(lower)) {
    opening = ["East of Jordan, the inheritance already matched what God gave through Moses.", "The phrase roots that land in earlier covenant history."];
  } else if (/jordan eastward even as moses the servant of/.test(lower)) {
    opening = ["The eastern side of Jordan is linked directly to Moses' assigned inheritance.", "The phrase keeps Joshua's record joined to Moses' earlier work."];
  } else if (/even as moses the servant of the lord/.test(lower)) {
    opening = ["The wording recalls Moses as the servant through whom this earlier inheritance was given.", "The phrase highlights continuity between the two leaders."];
  } else if (/as moses the servant of the lord gave/.test(lower)) {
    opening = ["Moses is remembered here as the one who gave the eastern inheritance under God's command.", "The phrase ties this allotment to his completed work."];
  } else if (/moses the servant of the lord gave them/.test(lower)) {
    opening = ["These tribes received their land through Moses before Joshua's western allotments.", "The phrase keeps the eastern inheritance anchored in that earlier gift."];
  } else if (/gave none inheritance/.test(lower) || /tribe of levi he gave none inheritance/.test(lower) || /levi he gave none inheritance/.test(lower)) {
    opening = /tribe of levi/.test(lower)
      ? ["The tribe of Levi is singled out as having no standard land inheritance.", "Their place in Israel differs from the landed tribes."]
      : /^of levi/.test(lower)
        ? ["Levi is mentioned again to stress that no ordinary land portion belonged to that tribe.", "The repeated line keeps their different calling in view."]
        : /levi he gave none/.test(lower)
          ? ["Levi is again noted as lacking a normal tribal land portion.", "The repeated statement keeps their unique calling in view."]
          : ["No land inheritance was given in the ordinary tribal sense here.", "The phrase prepares the reader for Levi's different provision."];
  } else if (/none inheritance the sacrifices of the lord god/.test(lower)) {
    opening = ["The LORD's sacrifices are named here as priestly provision instead of landed inheritance.", "The phrase explains how Levi was sustained without a tribal territory."];
  } else if (/inheritance the sacrifices of the lord god of/.test(lower)) {
    opening = ["The sacrifices offered to the LORD are presented as Levi's portion in place of land.", "The phrase explains their different kind of inheritance."];
  } else if (/children of reuben inheritance according to their families/.test(lower)) {
    opening = ["Reuben's inheritance is being described family by family.", "The phrase shows that tribal land is meant for real households, not only a tribal name."];
  } else if (/after their families the cities and the villages/.test(lower)) {
    opening = ["The phrase ties the named cities and villages directly to family inheritance.", "Judah's land is being organized for households, not just listed on a map."];
  } else if (/their families the cities and the villages thereof/.test(lower)) {
    opening = ["Families are linked to their cities and surrounding villages here.", "The phrase makes inheritance feel settled and local."];
  } else if (/after their families the cities and their villages/.test(lower)) {
    opening = ["The towns named here belong to an inheritance arranged by family groups.", "The phrase connects clan structure with the places they will occupy."];
  } else if (/amorites which reigned in heshbon whom moses smote/.test(lower)) {
    opening = ["The Amorite rule in Heshbon is recalled through Moses' earlier victory.", "The phrase grounds this inheritance in an old conquest already won."];
  } else if (/which reigned in heshbon whom moses smote/.test(lower)) {
    opening = ["Heshbon's former ruler is remembered as one Moses defeated.", "The phrase ties the territory to that earlier battle."];
  } else if (/reigned in heshbon whom moses smote/.test(lower)) {
    opening = ["The phrase keeps Heshbon connected to Moses' conquest over its ruler.", "This inheritance stands on a victory already given."];
  } else if (/in heshbon whom moses smote/.test(lower)) {
    opening = ["Heshbon is named as part of the territory won under Moses.", "The phrase keeps eastern allotment connected to remembered victory."];
  } else if (/heshbon whom moses smote with the princes/.test(lower)) {
    opening = ["Heshbon's defeat is recalled together with the princes who fell there.", "The phrase fills out the history behind the inherited land."];
  } else if (/kingdom of sihon king of heshbon/.test(lower)) {
    opening = ["Sihon's kingdom is being remembered as land now inherited by Israel.", "The phrase turns an old enemy realm into part of the tribal map."];
  } else if (/of sihon king of heshbon/.test(lower)) {
    opening = ["Sihon's name still identifies the region he once ruled before Israel possessed it.", "The phrase preserves the conquest history behind the inheritance."];
  } else if (/sihon king of heshbon/.test(lower)) {
    opening = ["Sihon king of Heshbon is the ruler whose territory became part of Israel's inheritance.", "The phrase recalls the conquest that opened this region."];
  } else if (/cities of gilead and half the land of/.test(lower)) {
    opening = ["Gilead and the half-land named here belong to the territory assigned in this section.", "The phrase describes the spread of the inheritance across known regions."];
  } else if (/ain and rimmon all the cities are twenty/.test(lower)) {
    opening = ["Ain and Rimmon appear at the point where this town group reaches its total count.", "The phrase closes that local cluster with a summary number."];
  } else if (/king of heshbon jordan and his border even/.test(lower)) {
    opening = ["The Jordan border helps define the extent of Heshbon's former territory.", "The phrase uses the river to mark inheritance clearly."];
  } else if (/of heshbon jordan and his border even unto/.test(lower)) {
    opening = ["Heshbon's boundary is being traced with the Jordan as a landmark.", "The phrase shows how carefully the territory is being described."];
  } else if (/levi moses gave not any inheritance/.test(lower)) {
    opening = ["Moses gave Levi no standard landed inheritance among the tribes.", "The phrase repeats that difference at the close of this allotment section."];
  } else if (/moses gave not any inheritance the lord god/.test(lower)) {
    opening = ["The wording again reminds the reader that Levi's portion was unlike the other tribes.", "Their inheritance is defined differently because of their calling."];
  } else if (/countries which moses did distribute for inheritance/.test(lower)) {
    opening = ["These countries had already been distributed by Moses as inheritance.", "The phrase remembers earlier allotment work east of Jordan."];
  } else if (/which moses did distribute for inheritance in the/.test(lower)) {
    opening = ["Moses is remembered here as the one who distributed these lands for inheritance.", "The phrase ties Joshua's record back to that earlier division."];
  } else if (/moses did distribute for inheritance in the plains/.test(lower)) {
    opening = ["The plains where Moses distributed inheritance are still part of Israel's remembered land story.", "The phrase connects geography with the earlier allotment."];
  } else if (/edrei cities of the kingdom of og in/.test(lower)) {
    opening = ["Edrei is named as part of the kingdom once ruled by Og.", "The phrase recalls Bashan through one of its known cities."];
  } else if (/cities of the kingdom of og in bashan/.test(lower)) {
    opening = ["Og's Bashan cities are included in the territory now assigned to Israel.", "The phrase keeps that old giant-kingdom in the memory of conquest."];
  } else if (/by lot was their inheritance as the lord/.test(lower)) {
    opening = ["Their inheritance came by lot under the LORD's direction.", "The phrase makes clear that the allotment was received, not self-chosen."];
  } else if (/lot was their inheritance as the lord commanded/.test(lower)) {
    opening = ["The lot is specifically tied to what the LORD commanded.", "The phrase emphasizes obedient distribution of the land."];
  } else if (/was their inheritance as the lord commanded by/.test(lower)) {
    opening = ["The inheritance is traced back to command first given through Moses.", "The phrase joins allotment with longstanding covenant instruction."];
  } else if (/levites in the land save cities to dwell/.test(lower)) {
    opening = ["The Levites had cities to live in even though they lacked a tribal territory.", "The phrase explains their practical place inside the land."];
  } else if (/unto the levites in the land save cities/.test(lower)) {
    opening = ["The Levites are granted cities within the land rather than a border-defined allotment.", "The phrase shows provision without a full tribal district."];
  } else if (/the levites in the land save cities to/.test(lower)) {
    opening = ["The phrase clarifies that Levite inheritance took the form of cities to dwell in.", "Their living arrangement differs from the other tribes."];
  } else if (/judah came unto joshua in gilgal and caleb/.test(lower)) {
    opening = ["Caleb comes forward with Judah to speak to Joshua at Gilgal.", "The phrase begins his appeal for the inheritance Moses had promised him."];
  } else if (/i wholly followed the lord my god/.test(lower)) {
    opening = ["Wholly followed means Caleb stayed fully loyal to the LORD.", "He is explaining why his story differs from the fearful spies of his generation."];
  } else if (/i am as strong this day/.test(lower)) {
    opening = ["Caleb says his strength still matches the task before him.", "The phrase highlights God's preserving power across many years."];
  } else if (/if so be the lord will be with me/.test(lower)) {
    opening = section.reference === "Joshua 14:12"
      ? ["Caleb measures the mountain ahead by the LORD's presence, not by his own age or strength.", "The phrase shows faith facing present giants with dependence on God."]
      : ["Caleb's confidence is still conditional on the LORD being with him.", "The phrase shows faith, not self-confidence alone."];
  } else if (/the lord spake this word unto moses/.test(lower)) {
    opening = ["Caleb bases his request on a word the LORD had spoken earlier through Moses.", "The phrase roots his claim in promise, not personal ambition."];
  } else if (/i when moses the servant of the lord/.test(lower)) {
    opening = ["Caleb begins his memory by placing himself back in Moses' day.", "The phrase opens his testimony from the time of the spies."];
  } else if (/moses the servant of the lord sent me/.test(lower)) {
    opening = ["Moses had sent Caleb on the original spying mission into the land.", "The phrase ties his present request to that earlier assignment."];
  } else if (/when moses the servant of the lord sent/.test(lower)) {
    opening = ["Caleb anchors his story in the moment Moses sent him to view the land.", "The phrase reaches back to the beginning of his long obedience."];
  } else if (/years old was i when moses the servant/.test(lower)) {
    opening = ["Caleb states his age at the time of the spy mission to show how long he has waited.", "The phrase makes the years of faithfulness measurable."];
  } else if (/old was i when moses the servant of/.test(lower)) {
    opening = ["His age is part of the testimony, because Caleb's faith has lasted across decades.", "The phrase helps the reader feel the length of the promise."];
  } else if (/was i when moses the servant of the/.test(lower)) {
    opening = ["Caleb remembers the exact season when Moses sent him into Canaan.", "The phrase ties present inheritance to an old act of faith."];
  } else if (/servant of the lord sent me from kadesh-barnea/.test(lower)) {
    opening = ["Kadesh-barnea is recalled as the place from which Caleb had been sent to spy the land.", "The phrase brings the old testing ground back into view."];
  } else if (/now therefore give me this mountain/.test(lower)) {
    opening = ["Caleb asks for the mountain region he was once promised.", "The request shows old faith still reaching for unfinished inheritance."];
  } else if (/the cities were great and fenced/.test(lower)) {
    opening = ["Fenced means fortified or strongly defended.", "Caleb is not pretending the challenge is small."];
  } else if (/i shall be able to drive them out/.test(lower)) {
    opening = ["Drive them out means remove the occupants and take the land fully.", "Caleb expects victory only because of the LORD's help."];
  } else if (/gave unto caleb the son of jephunneh hebron/.test(lower)) {
    opening = ["Hebron is explicitly given to Caleb by Joshua as his inheritance.", "The phrase records the moment promise becomes possession."];
  } else if (/joshua blessed him and gave unto caleb the/.test(lower)) {
    opening = ["Joshua blesses Caleb as he grants the promised inheritance.", "The phrase adds public honor to the gift of the land."];
  } else if (/caleb the son of jephunneh hebron for an/.test(lower)) {
    opening = ["Caleb's name is permanently joined to Hebron as his portion.", "The phrase records the inheritance in lasting terms."];
  } else if (/hebron therefore became the inheritance/.test(lower)) {
    opening = ["Hebron is stated plainly as Caleb's inheritance after his request is granted.", "The phrase closes the promise with possession."];
  } else if (/therefore became the inheritance of caleb/.test(lower)) {
    opening = ["Caleb's inheritance is presented as the settled result of God's earlier promise.", "The phrase marks a faithful end to long waiting."];
  } else if (/became the inheritance of caleb/.test(lower)) {
    opening = ["The wording fixes Caleb's claim to Hebron as an enduring possession.", "His faith now has a named place in the land."];
  } else if (/inheritance of caleb the son of jephunneh/.test(lower)) {
    opening = ["Caleb's inheritance is being named in formal, family-linked terms.", "The phrase makes his portion part of Israel's permanent record."];
  } else if (/judah by their families even to the border/.test(lower)) {
    opening = ["Judah's territorial line begins to be traced family by family.", "The phrase opens the full map of Judah's inheritance."];
  } else if (/of the children of judah by their families/.test(lower)) {
    opening = ["The children of Judah are the tribe receiving this detailed allotment.", "The phrase ties the map to a specific covenant family line."];
  } else if (/children of judah by their families even to/.test(lower)) {
    opening = ["Judah's families are the human center of the boundary list now unfolding.", "The phrase keeps the inheritance personal and tribal."];
  } else if (/of judah by their families even to the/.test(lower)) {
    opening = ["The phrase continues identifying Judah's allotment in family terms.", "The border exists for a tribe that will actually inhabit it."];
  } else if (/by their families even to the border of/.test(lower)) {
    opening = ["The border of Edom is being used to anchor Judah's inheritance geographically.", "The phrase starts the southern edge with a known neighbor."];
  } else if (/their families even to the border of edom/.test(lower)) {
    opening = ["Judah's families are placed right up to Edom's border in this description.", "The phrase ties inheritance to an actual frontier."];
  } else if (/families even to the border of edom the/.test(lower)) {
    opening = ["Edom marks the outer southern limit of Judah's family inheritance here.", "The phrase helps the reader picture how far Judah's portion extends."];
  } else if (/border went up toward debir from the valley/.test(lower)) {
    opening = ["The border is being traced by movement from landmark to landmark.", "The phrase helps the reader follow Judah's line across real terrain."];
  } else if (/jebusite the same is jerusalem/.test(lower)) {
    opening = ["Jerusalem is identified here by its older Jebusite identity.", "The phrase links a famous later city to Judah's border line."];
  } else if (/same is jerusalem and the border went up/.test(lower)) {
    opening = ["The place just named is clarified as Jerusalem before the boundary line continues.", "The phrase helps the reader track the map through a well-known city."];
  } else if (/is jerusalem and the border went up/.test(lower)) {
    opening = ["Jerusalem is the city in view as Judah's border keeps climbing onward.", "The phrase joins city identity with boundary movement."];
  } else if (/jerusalem and the border went up/.test(lower)) {
    opening = ["Jerusalem serves here as a landmark in Judah's boundary description.", "The phrase keeps the border tied to recognizable places."];
  } else if (/cities of mount ephron and the border was/.test(lower)) {
    opening = ["Mount Ephron and its cities are used as border markers for Judah.", "The phrase keeps the boundary grounded in named places."];
  } else if (/of judah round about according to their families/.test(lower)) {
    opening = ["The border circuit closes by returning to Judah's families.", "The phrase reminds the reader that the map exists for an inheritance, not for geography alone."];
  } else if (/judah according to the commandment of the lord/.test(lower)) {
    opening = ["Caleb's share in Judah is said to follow the LORD's command.", "The phrase keeps his inheritance rooted in divine direction."];
  } else if (/to the commandment of the lord to joshua/.test(lower)) {
    opening = ["The commandment to Joshua governs how Caleb's portion is given.", "The phrase shows this inheritance following received instruction."];
  } else if (/commandment of the lord to joshua even the/.test(lower)) {
    opening = ["The LORD's command to Joshua reaches all the way down to this specific city grant.", "The phrase makes the local inheritance part of a larger command."];
  } else if (/of the lord to joshua even the city/.test(lower)) {
    opening = ["The city named here is included under the LORD's command to Joshua.", "The phrase links one place on the map to God's stated will."];
  } else if (/lord to joshua even the city of arba/.test(lower)) {
    opening = ["The city of Arba is the place being identified under the LORD's command to Joshua.", "The phrase connects Hebron's older name to Caleb's inheritance."];
  } else if (/the commandment of the lord to joshua even/.test(lower)) {
    opening = ["This inheritance detail is explicitly framed as obedience to the LORD's command.", "The phrase turns a local grant into an act of covenant faithfulness."];
  } else if (/caleb took it and he gave him achsah/.test(lower)) {
    opening = ["Caleb promises Achsah in marriage to the man who takes the city.", "The phrase turns conquest, family, and inheritance into one scene."];
  } else if (/me a south land give me also springs/.test(lower)) {
    opening = ["Achsah knows a south land needs springs if it is to support life well.", "Her request turns inheritance into a question of usefulness, not bare ownership."];
  } else if (/a south land give me also springs of/.test(lower)) {
    opening = ["The south land she received needed water sources to become fruitful.", "The phrase explains why springs mattered so much."];
  } else if (/south land give me also springs of water/.test(lower)) {
    opening = ["Springs of water would make a dry southern inheritance livable.", "The phrase shows practical wisdom inside Achsah's request."];
  } else if (/land give me also springs of water and/.test(lower)) {
    opening = ["Achsah asks for more than ground alone; she asks for the water that makes land useful.", "The phrase keeps inheritance tied to real daily need."];
  } else if (/for thou hast given me a south land/.test(lower)) {
    opening = ["She explains her request by pointing to the dry nature of the land she already has.", "The phrase gives the reason springs are necessary."];
  } else if (/thou hast given me a south land give/.test(lower)) {
    opening = ["The inherited south land is the reason Achsah asks for added springs.", "The phrase connects gift and need in the same breath."];
  } else if (/children of judah according to their families/.test(lower)) {
    opening = ["The city lists keep circling back to Judah's families as the ones who will live there.", "The phrase ties names on the map to households in the land."];
  } else if (/cities are twenty and nine with their villages/.test(lower)) {
    opening = ["Twenty and nine gives the total for this particular southern town group.", "The phrase closes one counted cluster inside Judah's inheritance."];
  } else if (/rimmon all the cities are twenty and nine/.test(lower)) {
    opening = ["The running list reaches its total here at twenty-nine cities with their villages.", "The phrase summarizes the full cluster just named."];
  } else if (/all the cities are twenty and nine with/.test(lower)) {
    opening = ["The phrase totals the named towns and their villages as one grouped unit.", "It helps the reader treat the list as organized inheritance rather than loose names."];
  } else if (/naamah and makkedah sixteen cities with their villages/.test(lower)) {
    opening = ["Naamah and Makkedah sit within a group totaling sixteen cities with their villages.", "The phrase counts one regional cluster in Judah's lowland inheritance."];
  } else if (/achzib and mareshah nine cities with their villages/.test(lower)) {
    opening = ["Achzib and Mareshah belong to a group counted as nine cities with their villages.", "The phrase totals another local section of Judah's land."];
  } else if (/hebron and zior nine cities with their villages/.test(lower)) {
    opening = ["Hebron and Zior appear in a hill-country group counted at nine cities with their villages.", "The phrase shows Hebron among a wider regional cluster."];
  } else if (/holon and giloh eleven cities with their villages/.test(lower)) {
    opening = ["Holon and Giloh belong to a grouped total of eleven cities with their villages.", "The phrase counts another section of Judah's hill-country inheritance."];
  } else if (/gibeah and timnah ten cities with their villages/.test(lower)) {
    opening = ["Gibeah and Timnah stand inside a counted group of ten cities with their villages.", "The phrase shows Judah's inheritance arranged in local totals."];
  } else if (/beth-anoth and eltekon six cities with their villages/.test(lower)) {
    opening = ["Beth-anoth and Eltekon belong to a smaller cluster totaling six cities with their villages.", "The phrase counts another organized pocket of Judah's towns."];
  } else if (/kirjath-jearim and rabbah two cities with their villages/.test(lower)) {
    opening = ["Kirjath-jearim and Rabbah form a two-city group with their villages.", "The phrase shows even small clusters being counted carefully."];
  } else if (/salt and en-gedi six cities with their villages/.test(lower)) {
    opening = ["Salt and En-gedi stand in a wilderness group counted as six cities with their villages.", "The phrase totals that final Judah cluster."];
  } else if (/hazor hadattah and kerioth and hezron/.test(lower)) {
    opening = ["Hazor-hadattah, Kerioth, and Hezron are southern towns inside Judah's inheritance.", "The phrase starts one regional town cluster on Judah's map."];
  } else if (/hadattah and kerioth and hezron/.test(lower)) {
    opening = ["Hadattah, Kerioth, and Hezron continue the naming of Judah's southern towns.", "The phrase helps build that regional list place by place."];
  } else if (/amam and shema and moladah/.test(lower)) {
    opening = ["Amam, Shema, and Moladah are part of Judah's inherited town list.", "The phrase adds more settled places to the regional map."];
  } else if (/hazar-gaddah and heshmon and beth-palet/.test(lower)) {
    opening = ["Hazar-gaddah, Heshmon, and Beth-palet form another cluster of Judahite towns.", "The phrase keeps the inheritance tied to named local places."];
  } else if (/hazar-shual and beer-sheba and bizjothjah/.test(lower)) {
    opening = ["Hazar-shual, Beer-sheba, and Bizjothjah are included in Judah's southern territory.", "The phrase extends the town list through known settlements."];
  } else if (/baalah and iim and azem/.test(lower)) {
    opening = ["Baalah, Iim, and Azem are further towns assigned within Judah's land.", "The phrase adds more local detail to the inheritance map."];
  } else if (/eltolad and chesil and hormah/.test(lower)) {
    opening = ["Eltolad, Chesil, and Hormah are part of Judah's town register in this region.", "The phrase continues the grouped town listing."];
  } else if (/zenan and hadashah and migdal-gad/.test(lower)) {
    opening = ["Zenan, Hadashah, and Migdal-gad appear in another grouped section of Judah's towns.", "The phrase shifts to a new local cluster inside the inheritance."];
  } else if (/dilean and mizpeh and joktheel/.test(lower)) {
    opening = ["Dilean, Mizpeh, and Joktheel add more named towns to Judah's list.", "The phrase keeps the inheritance specific and local."];
  } else if (/lachish and bozkath and eglon/.test(lower)) {
    opening = ["Lachish, Bozkath, and Eglon are three more towns in Judah's allotment.", "The phrase carries the regional list forward."];
  } else if (/adithaim and gederah and gederothaim/.test(lower)) {
    opening = ["Adithaim, Gederah, and Gederothaim belong to a shared local cluster in Judah.", "The phrase groups related settlements inside one inheritance region."];
  } else if (/gederah and gederothaim/.test(lower)) {
    opening = ["Gederah and Gederothaim are part of another counted cluster of Judah's towns.", "The phrase keeps the local map moving through named settlements."];
  } else if (/shilhim and ain and rimmon/.test(lower)) {
    opening = ["Shilhim, Ain, and Rimmon help complete a grouped section of Judah's southern towns.", "The phrase carries the list toward its regional total."];
  } else if (/gederoth beth-dagon and naamah and makkedah/.test(lower)) {
    opening = ["Gederoth, Beth-dagon, Naamah, and Makkedah appear together in one section of Judah's towns.", "The phrase counts another organized local cluster."];
  } else if (/beth-dagon and naamah and makkedah/.test(lower)) {
    opening = ["Beth-dagon, Naamah, and Makkedah continue the grouped list of Judah's towns.", "The phrase adds more detail to that regional section."];
  } else if (/and naamah and makkedah/.test(lower)) {
    opening = ["Naamah and Makkedah are still part of the same counted town group.", "The phrase helps finish that local list within Judah."];
  } else if (/keilah and achzib and mareshah/.test(lower)) {
    opening = ["Keilah, Achzib, and Mareshah are grouped together as towns in Judah's inheritance.", "The phrase keeps the allotment tied to real settlements."];
  } else if (/all that lay near ashdod with their villages/.test(lower)) {
    opening = ["The lands near Ashdod are included with their surrounding villages in Judah's list.", "The phrase expands the map beyond the city itself."];
  } else if (/ashdod with her towns and her villages gaza/.test(lower)) {
    opening = ["Ashdod is named together with its towns and villages before the list moves toward Gaza.", "The phrase shows how cities and their dependent places were grouped."];
  } else if (/her towns and her villages gaza/.test(lower)) {
    opening = ["The dependent towns and villages are counted along with Gaza in this regional section.", "The phrase shows inheritance reaching beyond the main city name."];
  } else if (/towns and her villages gaza/.test(lower)) {
    opening = ["Gaza appears here with its towns and villages as part of Judah's territorial list.", "The phrase keeps the regional grouping concrete."];
  } else if (/her villages gaza with her towns/.test(lower)) {
    opening = ["Gaza's villages and towns are being included as part of the broader local cluster.", "The phrase counts the settlement network around the city."];
  } else if (/goshen and holon and giloh/.test(lower)) {
    opening = ["Goshen, Holon, and Giloh are named as towns within Judah's hill-country inheritance.", "The phrase adds to that regional town group."];
  } else if (/cain gibeah and timnah/.test(lower)) {
    opening = ["Cain, Gibeah, and Timnah belong to a grouped section of Judah's towns.", "The phrase helps fill out that local inheritance cluster."];
  } else if (/maarath and beth-anoth and eltekon/.test(lower)) {
    opening = ["Maarath, Beth-anoth, and Eltekon are counted together in Judah's inheritance.", "The phrase marks another small regional cluster."];
  } else if (/kirjath-baal which is kirjath-jearim and rabbah/.test(lower)) {
    opening = ["Kirjath-baal, also called Kirjath-jearim, is listed with Rabbah in this town group.", "The phrase links an alternate name to the inheritance record."];
  } else if (/which is kirjath-jearim and rabbah/.test(lower)) {
    opening = ["Kirjath-jearim is clarified here by its alternate name before Rabbah is counted with it.", "The phrase helps the reader identify the town correctly."];
  } else if (/humtah and kirjath-arba which is hebron/.test(lower)) {
    opening = ["Humtah and Kirjath-arba, that is Hebron, are listed together in Judah's inheritance.", "The phrase places Hebron among neighboring hill-country towns."];
  } else if (/kirjath-arba which is hebron and zior/.test(lower)) {
    opening = ["Kirjath-arba, that is Hebron, appears here with Zior in Judah's hill-country list.", "The phrase identifies the well-known city inside a broader regional cluster."];
  } else if (/which is hebron and zior/.test(lower)) {
    opening = ["Hebron is being clarified by its older name as the town list continues.", "The phrase helps the reader connect alternate city names."];
  } else if (/is hebron and zior/.test(lower)) {
    opening = ["Hebron is the city being identified in the middle of this grouped list.", "The phrase keeps the town register clear."];
  } else if (/inhabitants of jerusalem the children of judah could/.test(lower)) {
    opening = ["The inhabitants of Jerusalem are named as people Judah could not fully remove.", "The phrase records incomplete possession in a specific city."];
  } else if (/of jerusalem the children of judah could not/.test(lower)) {
    opening = ["Jerusalem is the city where Judah could not finish the work of driving out the people.", "The phrase turns the boundary list into a warning note."];
  } else if (/jerusalem the children of judah could not drive/.test(lower)) {
    opening = ["Jerusalem is singled out as a place Judah could not fully clear.", "The phrase records a lingering pocket of resistance."];
  } else if (/dwell with the children of judah at jerusalem/.test(lower)) {
    opening = ["The Jebusites are said to dwell alongside Judah at Jerusalem.", "The phrase shows coexistence where full possession had not happened."];
  } else if (/children of judah at jerusalem unto this day/.test(lower)) {
    opening = ["Unto this day means the mixed presence at Jerusalem was still true when the record was written.", "The phrase underlines that the problem lasted."];
  } else if (/the inhabitants of jerusalem the children of judah/.test(lower)) {
    opening = ["Jerusalem's inhabitants are brought into focus as a continuing challenge for Judah.", "The phrase adds historical realism to the inheritance story."];
  }

  return note([
    opening[0],
    opening[1],
    lead,
    ...support,
  ]);
}

function explainDay60JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = [
    "This line belongs to the later allotment of the land among Israel's tribes.",
    "The phrase is meant to make borders, delays, cities, or inheritance details understandable.",
  ];
  let lead = "🗺️ Joshua 16-19 keeps turning the promised land into named inheritance.";
  let support = ["📍 Borders and towns are being fixed", "👥 Tribes are receiving real places", "🙌 God's promise is becoming settled life"];

  if (section.chapter === 16) {
    lead = "🌿 Joshua 16 traces the inheritance of Joseph's sons.";
    support = ["🗺️ Ephraim's border is being mapped", "👥 Joseph's family receives land", "⚠️ The chapter also records incomplete obedience"];
  } else if (section.chapter === 17) {
    lead = "🏞️ Joshua 17 joins Manasseh's allotment with faith, complaint, and unfinished obedience.";
    support = ["🎲 Land is assigned by lot", "👩‍👧 Justice is preserved for Zelophehad's daughters", "⚠️ Strength still must become obedience"];
  } else if (section.chapter === 18) {
    lead = "🎲 Joshua 18 presses the remaining tribes to receive what God has given.";
    support = ["⏳ Delay is being confronted", "🗺️ The land must be surveyed and described", "⛺ Shiloh becomes the center of allotment"];
  } else if (section.chapter === 19) {
    lead = "🏠 Joshua 19 completes several tribal inheritances and closes the division of the land.";
    support = ["🎲 Lot after lot is assigned", "📍 Cities and borders are named carefully", "🏁 The distribution of the land reaches completion"];
  }

  if (/the lot of the children of joseph/.test(lower)) {
    opening = ["The lot is the portion assigned to Joseph's family line in the land.", "The phrase begins the map of inheritance for Ephraim and Manasseh."];
  } else if (/fell from jordan by jericho/.test(lower)) {
    opening = ["The border line starts near Jordan by Jericho.", "The phrase gives a concrete starting point for Joseph's inheritance."];
  } else if (/throughout mount bethel/.test(lower) || /through the wilderness of beth-el unto luz/.test(lower)) {
    opening = ["Mount Bethel and Luz are landmarks used to trace Joseph's inheritance through the hill country.", "The phrase keeps the border tied to actual terrain and towns."];
  } else if (/the goings out thereof are at the sea/.test(lower) && section.chapter === 19) {
    opening = ["The goings out are the outer end of Asher's border line at the sea.", "The phrase closes that tribal boundary with a coastal edge."];
  } else if (/the goings out thereof are at the sea/.test(lower)) {
    opening = ["The goings out are the outer end or outlet of Joseph's border line.", "The phrase says that inheritance stretched all the way to the sea."];
  } else if (/manasseh and ephraim took their inheritance/.test(lower) || /took their inheritance/.test(lower)) {
    opening = ["The inheritance is now actually received by Joseph's two tribal lines.", "The phrase moves from border description to possession."];
  } else if (/the border of the children of ephraim/.test(lower)) {
    opening = ["Ephraim's border is now being described specifically.", "The phrase narrows the inheritance from Joseph's house to one tribe's portion."];
  } else if (/according to their families/.test(lower) && section.reference === "Joshua 16:5-8") {
    opening = ["According to their families means Ephraim's inheritance belongs to real clan groups within the tribe.", "The phrase ties land lines to households that will live there."];
  } else if (/on the east side/.test(lower)) {
    opening = ["The east side tells the reader which edge of Ephraim's border is being described.", "Direction words matter here because the chapter is drawing a map."];
  } else if (/the border went out toward the sea/.test(lower)) {
    opening = ["Went out means the border line continued until it reached the seaward side.", "The phrase helps complete Ephraim's territorial outline."];
  } else if (/this is the inheritance of the tribe of asher/.test(lower)) {
    opening = ["The statement formally closes Asher's allotment.", "The phrase gathers its border and towns into one settled inheritance."];
  } else if (/this is the inheritance of zebulun/.test(lower)) {
    opening = ["The statement formally closes Zebulun's allotment.", "The phrase gathers its border and towns into one settled inheritance."];
  } else if (/this is the inheritance of issachar/.test(lower)) {
    opening = ["The statement formally closes Issachar's allotment.", "The phrase gathers its border and towns into one settled inheritance."];
  } else if (/this is the inheritance of naphtali/.test(lower)) {
    opening = ["The statement formally closes Naphtali's allotment.", "The phrase gathers its border and towns into one settled inheritance."];
  } else if (/this is the inheritance of dan/.test(lower)) {
    opening = ["The statement formally closes Dan's allotment.", "The phrase gathers its border and towns into one settled inheritance."];
  } else if (/this is the inheritance of the tribe/.test(lower)) {
    opening = ["The statement gathers Ephraim's border details into one formal inheritance.", "The phrase closes the allotment in summary form."];
  } else if (/children of ephraim by their families/.test(lower)) {
    opening = ["Ephraim's inheritance is explicitly tied to its family groups.", "The phrase reminds the reader who will actually live within the border just traced."];
  } else if (/the separate cities for the children of ephraim/.test(lower)) {
    opening = ["Separate cities means towns of Ephraim that lay within Manasseh's larger inheritance area.", "The phrase explains a mixed arrangement inside the tribal map."];
  } else if (/among the inheritance of the children of manasseh/.test(lower)) {
    opening = ["These Ephraimite cities sat within the broader inheritance of Manasseh.", "The phrase shows how the tribal map could contain embedded cities."];
  } else if (/all the cities with their villages/.test(lower) && section.reference === "Joshua 16:9") {
    opening = ["The phrase includes the smaller villages that belonged with the named cities.", "It turns the list into a fuller picture of settled life."];
  } else if (/these cities with their villages/.test(lower) && section.reference === "Joshua 19:16-16") {
    opening = ["These cities and villages make up the settled places within Zebulun's inheritance.", "The phrase shows that allotment as real communities, not just borders."];
  } else if (/these cities with their villages/.test(lower) && section.reference === "Joshua 19:30-31") {
    opening = ["These cities and villages make up the settled places within Asher's inheritance.", "The phrase shows that allotment as real communities, not just borders."];
  } else if (/the cities and their villages/.test(lower) && section.reference === "Joshua 19:23-23") {
    opening = ["The cities and villages listed here make up Issachar's settled inheritance.", "The phrase turns the allotment into places where families actually live."];
  } else if (/the cities and their villages/.test(lower) && section.reference === "Joshua 19:38-39") {
    opening = ["The cities and villages listed here make up Naphtali's settled inheritance.", "The phrase turns the allotment into places where families actually live."];
  } else if (/the cities and their villages/.test(lower) && section.chapter === 19) {
    opening = ["The phrase includes both the named cities and the smaller villages attached to them.", "It shows the inheritance as settled communities, not isolated town names."];
  } else if (/these cities with their villages/.test(lower) && section.chapter === 19) {
    opening = ["These cities are counted together with the villages that belonged to them.", "The phrase completes the picture of one tribe's settled inheritance."];
  } else if (/the inheritance of the children/.test(lower)) {
    opening = ["The wording gathers the city list back into a formal inheritance statement.", "The phrase reminds the reader that these places belong to a covenant people."];
  } else if (/there was also a lot for the tribe of manasseh/.test(lower)) {
    opening = ["Manasseh also receives a lot, meaning a distinct tribal inheritance.", "The phrase begins the western allotment for that tribe."];
  } else if (/he was the firstborn of joseph/.test(lower)) {
    opening = ["Firstborn identifies Manasseh's place within Joseph's family line.", "The phrase explains why his tribe is being described so prominently."];
  } else if (/because he was a man of war/.test(lower)) {
    opening = ["The wording recalls military strength as part of Manasseh's history.", "The phrase explains why one branch had already received territory earlier."];
  } else if (/the rest of manasseh's sons had their portion/.test(lower)) {
    opening = ["The rest of Manasseh's descendants also receive land by family branches.", "The phrase shows the allotment spreading beyond one prominent line."];
  } else if (/zelophehad.*had no sons/.test(lower) || /zelophehad had no sons but daughters/.test(lower)) {
    opening = ["The phrase highlights the family problem: Zelophehad left no sons to inherit his name and portion in the usual way.", "That is why his daughters step forward."];
  } else if (/but daughters.*they came near before eleazar the priest/.test(lower)) {
    opening = ["The daughters come forward publicly because inheritance must be settled with justice.", "The phrase shows them appealing through the proper leaders."];
  } else if (/the lord commanded moses to give us an inheritance/.test(lower)) {
    opening = ["The daughters base their request on a command God had already given through Moses.", "The phrase turns their case from personal plea into covenant justice."];
  } else if (/an inheritance among our brethren/.test(lower)) {
    opening = ["They are asking for a place among their male relatives, not outside the tribe.", "The phrase protects their family line from disappearing in the land map."];
  } else if (/according to the commandment of the lord/.test(lower) && section.reference === "Joshua 17:3-6") {
    opening = ["Their inheritance is granted because it matches the LORD's command.", "The phrase shows the land being divided with obedience and fairness."];
  } else if (/ten portions fell to manasseh/.test(lower)) {
    opening = ["Ten portions means Manasseh received multiple family shares in the allotment.", "The phrase shows the tribe's inheritance being carefully divided."];
  } else if (/the coast of manasseh was from asher to michmethah/.test(lower)) {
    opening = ["Manasseh's border is traced from one known place to another.", "The phrase begins the map of that tribe's western territory."];
  } else if (/the border descended unto the river kanah/.test(lower)) {
    opening = ["Descended means the boundary line ran downward toward the river Kanah.", "The phrase follows the border through natural landmarks."];
  } else if (/manasseh had in issachar and in asher/.test(lower)) {
    opening = ["Manasseh held towns inside neighboring tribal regions as well.", "The phrase shows the inheritance map was not always simple and isolated."];
  } else if (/yet the children of manasseh could not drive out/.test(lower)) {
    opening = ["Manasseh also failed to remove the inhabitants from certain cities.", "The phrase records incomplete obedience inside the inheritance story."];
  } else if (/they drave not out the canaanites/.test(lower)) {
    opening = ["Ephraim did not drive out the Canaanites living in Gezer.", "The phrase records incomplete obedience inside the inheritance story."];
  } else if (/that dwelt in gezer/.test(lower)) {
    opening = ["Gezer is the city where the Canaanites still remained.", "The phrase makes the unfinished obedience geographically specific."];
  } else if (/the canaanites dwell among the ephraimites/.test(lower)) {
    opening = ["The Canaanites are said to remain living among Ephraim instead of being removed.", "The phrase shows coexistence where conquest had been left incomplete."];
  } else if (/unto this day/.test(lower) && section.reference === "Joshua 16:10") {
    opening = ["Unto this day means the compromise at Gezer lasted beyond the first conquest moment.", "The phrase turns incomplete obedience into a lingering condition."];
  } else if (/the canaanites to tribute/.test(lower)) {
    opening = ["Tribute means forced labor or imposed payment under Israel's control.", "The phrase shows domination without full obedience."];
  } else if (/serve under tribute/.test(lower)) {
    opening = ["Serve under tribute means the Canaanites remained in the land under forced service.", "The phrase shows compromise instead of complete removal."];
  } else if (/when the children of israel were waxen strong/.test(lower)) {
    opening = ["Waxen strong means Israel had grown strong enough to act decisively.", "The phrase makes their later compromise more serious, not less."];
  } else if (/strength did not become full obedience/.test(lower)) {
    opening = ["The summary line points to a hard truth: strength by itself did not lead Israel to finish what God had commanded.", "The phrase exposes compromise after victory."];
  } else if (/they would not utterly drive them out/.test(lower) || /but did not utterly drive them out/.test(lower)) {
    opening = ["Utterly drive them out means remove them completely from the land.", "The phrase says Israel stopped short of what full obedience required."];
  } else if (/the children of joseph spake unto joshua/.test(lower)) {
    opening = ["Joseph's descendants bring their complaint directly to Joshua.", "The phrase opens a dispute about whether their inheritance is enough."];
  } else if (/why hast thou given me but one lot/.test(lower)) {
    opening = ["Joseph's descendants complain that one lot feels too small for their numbers.", "The phrase reveals dissatisfaction inside the inheritance process."];
  } else if (/seeing i am a great people/.test(lower)) {
    opening = ["Joseph's descendants point to their large numbers as a reason they want more room.", "The phrase turns population into an argument for a larger inheritance."];
  } else if (/i am a great people/.test(lower)) {
    opening = ["Great people here means numerous and strong in size.", "The phrase is part of Joseph's complaint that their portion feels too small."];
  } else if (/if thou be a great people/.test(lower)) {
    opening = ["Joshua answers their complaint by testing their claim to greatness.", "The phrase challenges them to act instead of only asking for more."];
  } else if (/then get thee up to the wood country/.test(lower)) {
    opening = ["Joshua directs them to the wood country as the practical answer to their complaint.", "The phrase says expansion will come through hard work, not a new lot."];
  } else if (/get thee up to the wood country/.test(lower)) {
    opening = ["The wood country is forested hill land that must be cleared for use.", "Joshua tells them to enlarge their inheritance by labor and courage."];
  } else if (/and cut down for thyself there/.test(lower)) {
    opening = ["The command tells Joseph's descendants to clear the wooded land for themselves.", "The phrase turns their complaint into labor."];
  } else if (/cut down for thyself there/.test(lower)) {
    opening = ["Cut down means clear the forest so the land becomes usable.", "The phrase turns complaint into work."];
  } else if (/the hill is not enough for us/.test(lower)) {
    opening = ["Joseph's descendants say the hill country alone is too small for them.", "The phrase keeps pressing their dissatisfaction with the allotted land."];
  } else if (/the children of joseph said/.test(lower)) {
    opening = ["Joseph's house answers Joshua by pressing the difficulty of the land before them.", "The phrase continues the complaint after his first response."];
  } else if (/for it is a wood/.test(lower)) {
    opening = ["The phrase explains why Joshua told them to cut the forested land.", "Their portion included wooded ground that needed work before it could be fully used."];
  } else if (/though they have iron chariots/.test(lower)) {
    opening = ["The iron chariots are offered as the reason the enemy still looks too strong to drive out.", "The phrase reveals fear mixed into the complaint."];
  } else if (/all the canaanites.*have chariots of iron/.test(lower) || /chariots of iron/.test(lower)) {
    opening = ["Chariots of iron were intimidating military weapons that made the enemy look hard to defeat.", "The phrase explains why Joseph's descendants felt blocked."];
  } else if (/thou art a great people, and hast great power/.test(lower)) {
    opening = ["Joshua answers them by affirming their strength instead of excusing their fear.", "The phrase pushes them toward courage and action."];
  } else if (/and hast great power.*but the mountain shall be thine/.test(lower)) {
    opening = ["Joshua links their claimed strength with responsibility to take the difficult hill country.", "The phrase turns power into a call to possess hard land."];
  } else if (/the mountain shall be thine/.test(lower)) {
    opening = ["Joshua tells them the mountain region will indeed be theirs.", "The phrase turns difficult land into a call to possess what God has given."];
  } else if (/there remained among the children of israel seven tribes/.test(lower)) {
    opening = ["Seven tribes were still waiting for their inheritance to be assigned.", "The phrase shows the work of distribution was not finished yet."];
  } else if (/set up the tabernacle of the congregation/.test(lower)) {
    opening = ["The tabernacle is set up at Shiloh as the center of Israel's worship and national life.", "The phrase places land division under the LORD's presence."];
  } else if (/the land was subdued before them/.test(lower)) {
    opening = ["Subdued means the land's main resistance had been broken under Israel.", "The phrase explains why attention can now turn from major conquest to delayed allotment."];
  } else if (/how long are ye slack to go/.test(lower) && section.reference === "Joshua 18:1-3") {
    opening = ["Joshua asks why the tribes are still delaying the move into their land.", "Slack means they are hesitating when God has already made the inheritance available."];
  } else if (/how long are ye slack to go/.test(lower)) {
    opening = ["Slack means slow, reluctant, or delaying what should be done.", "Joshua is rebuking the tribes for not moving into their inheritance."];
  } else if (/the land which the lord god of your fathers hath given you/.test(lower) && section.reference === "Joshua 18:1-3") {
    opening = ["Joshua describes the land as a gift already given by the God of their fathers.", "The phrase makes their hesitation look like neglect of received grace."];
  } else if (/the land which the lord god of your fathers hath given you/.test(lower)) {
    opening = ["The land is described as already given by the God of their fathers.", "The phrase makes their delay look like failure to receive a gift."];
  } else if (/a gift can still be neglected/.test(lower)) {
    opening = ["The summary line draws out the problem in Joshua's rebuke: a given inheritance can still be left untouched.", "The phrase warns against delay after promise."];
  } else if (/give out from among you three men for each tribe/.test(lower)) {
    opening = ["Joshua orders a survey team from each tribe to map the land.", "The phrase turns delay into a practical next step."];
  } else if (/they shall rise, and go through the land/.test(lower) || /go and walk through the land/.test(lower)) {
    opening = ["The men must walk the land so it can be described accurately for division.", "The phrase shows inheritance requiring careful survey, not guesswork."];
  } else if (/the priesthood of the lord is their inheritance/.test(lower)) {
    opening = ["Levi's inheritance is priestly service before the LORD, not a normal tribal territory.", "The phrase explains why Levi is not included in the land division the same way."];
  } else if (/reuben, gad, and half manasseh have received their inheritance/.test(lower)) {
    opening = ["Those eastern tribes had already received their land beyond Jordan.", "The phrase narrows the present task to the tribes still waiting."];
  } else if (/describe it according to the inheritance of them/.test(lower)) {
    opening = ["Describe it means write down the land in a way fit for fair tribal division.", "The phrase turns geography into ordered inheritance."];
  } else if (/in seven parts/.test(lower)) {
    opening = ["Seven parts means the remaining land must be divided into seven tribal portions.", "The phrase gives the survey its exact purpose."];
  } else if (/joshua cast lots for them in shiloh/.test(lower)) {
    opening = ["Casting lots at Shiloh places the division of the land before the LORD.", "The phrase shows the allotment as sacred ordering, not private bargaining."];
  } else if (/joshua divided the land/.test(lower)) {
    opening = ["Joshua is the leader overseeing the final division of the remaining land.", "The phrase marks the move from survey to settled allotment."];
  } else if (/the lot of the tribe of benjamin came up/.test(lower)) {
    opening = ["Benjamin's lot now comes up as its own tribal inheritance.", "The phrase begins a new section of allotment."];
  } else if (/the coast of their lot came forth/.test(lower) || /their coast went out/.test(lower)) {
    opening = ["The coast is the border line of the inheritance, not the seashore only.", "The phrase means the boundary is now being traced outward."];
  } else if (/the border went down to the end of the mountain/.test(lower)) {
    opening = ["The border is followed downward along the terrain to a mountain's end.", "The phrase helps the reader picture the line moving through the land."];
  } else if (/descended to the waters of en-shemesh/.test(lower)) {
    opening = ["The border line drops to the waters of En-shemesh as a landmark.", "The phrase uses a known water source to mark the boundary."];
  } else if (/the border passed along toward the north/.test(lower)) {
    opening = ["Passed along means the border continued in that direction across the land.", "The phrase keeps the map moving step by step."];
  } else if (/went down unto the stone of bohan/.test(lower)) {
    opening = ["The stone of Bohan is a landmark used to fix the border accurately.", "The phrase shows how concrete these allotment lines were."];
  } else if (/jordan was the border of it/.test(lower)) {
    opening = ["The Jordan River served as one clear edge of Benjamin's inheritance.", "The phrase uses the river as a final border marker."];
  } else if (/this was the inheritance of benjamin/.test(lower) || /this is the inheritance of benjamin/.test(lower)) {
    opening = /this was/.test(lower)
      ? ["The statement gathers Benjamin's boundary line into a formal inheritance summary.", "The phrase closes the border description in settled terms."]
      : ["The statement gathers Benjamin's city list into a formal inheritance summary.", "The phrase closes the allotment in settled terms."];
  } else if (/the cities of the tribe of benjamin/.test(lower)) {
    opening = ["The chapter now shifts from borders to the actual towns belonging to Benjamin.", "The phrase turns the map line into lived places."];
  } else if (/jericho, beth-hoglah, and the valley of keziz/.test(lower) || /gibeon, ramah, and beeroth/.test(lower) || /zelah, eleph, and jebusi/.test(lower)) {
    opening = /jericho/.test(lower)
      ? ["Jericho and the nearby places named here belong to Benjamin's inheritance.", "The phrase makes that tribal portion concrete through specific towns."]
      : /gibeon/.test(lower)
        ? ["Gibeon, Ramah, and Beeroth are named towns inside Benjamin's allotted land.", "The phrase builds the inheritance through recognizable places."]
        : ["Zelah, Eleph, and Jebusi are part of Benjamin's city list.", "The phrase ties Jerusalem's earlier name into Benjamin's inheritance."];
  } else if (/twelve cities with their villages/.test(lower) || /fourteen cities with their villages/.test(lower)) {
    opening = /fourteen/.test(lower)
      ? ["The phrase totals another grouped section of Benjamin's towns and villages at fourteen.", "The count keeps the inheritance organized instead of loose."]
      : /Joshua 18/.test(section.reference)
        ? ["The phrase totals one grouped section of Benjamin's towns and villages at twelve.", "The count keeps the inheritance organized instead of loose."]
        : ["The phrase totals Zebulun's town group at twelve cities with their villages.", "The count keeps that allotment organized and measurable."];
  } else if (/jebusi, which is jerusalem/.test(lower)) {
    opening = ["Jebusi is identified here as Jerusalem.", "The phrase connects Benjamin's inheritance to a city that later becomes central in Israel's story."];
  } else if (/the second lot came forth to simeon/.test(lower)) {
    opening = ["Simeon receives the second tribal lot in this sequence.", "The phrase begins that tribe's allotment."];
  } else if (/their inheritance was within the inheritance of judah/.test(lower)) {
    opening = ["Simeon's inheritance lay inside Judah's larger territory.", "The phrase explains why Simeon's land is nested within another tribe's portion."];
  } else if (/beer-sheba, sheba, and moladah/.test(lower) || /ain, remmon, and ether/.test(lower)) {
    opening = /beer-sheba/.test(lower)
      ? ["Beer-sheba, Sheba, and Moladah are named towns inside Simeon's allotted region.", "The phrase turns Simeon's inheritance into recognizable places."]
      : ["Ain, Remmon, and Ether are part of Simeon's smaller town group.", "The phrase keeps Simeon's inheritance concrete through named places."];
  } else if (/thirteen cities and their villages/.test(lower) || /four cities and their villages/.test(lower)) {
    opening = /thirteen/.test(lower)
      ? ["The phrase totals Simeon's first town cluster at thirteen cities with their villages.", "The count keeps the allotment orderly and measurable."]
      : ["The phrase totals Simeon's smaller town cluster at four cities with their villages.", "The count keeps the allotment orderly and measurable."];
  } else if (/out of the portion of the children of judah/.test(lower)) {
    opening = ["Simeon's inheritance is taken out of Judah's portion.", "The phrase explains how both tribes fit together on the map."];
  } else if (/the part of judah was too much for them/.test(lower)) {
    opening = ["Judah's portion was larger than needed for that tribe alone.", "The phrase gives the reason Simeon received land within it."];
  } else if (/the third lot came up for zebulun/.test(lower) || /the fourth lot came out to issachar/.test(lower) || /the fifth lot came out for asher/.test(lower) || /the sixth lot came out to naphtali/.test(lower) || /the seventh lot came out for dan/.test(lower)) {
    opening = /third lot/.test(lower)
      ? ["Zebulun receives the third tribal lot in the continuing division of the land.", "The phrase marks that tribe's turn in Joshua's sequence."]
      : /fourth lot/.test(lower)
        ? ["Issachar receives the fourth tribal lot in the ongoing allotment.", "The phrase begins that tribe's inheritance section."]
        : /fifth lot/.test(lower)
          ? ["Asher receives the fifth tribal lot as the land division continues.", "The phrase starts Asher's allotment."]
          : /sixth lot/.test(lower)
            ? ["Naphtali receives the sixth tribal lot in the sequence.", "The phrase opens that tribe's inheritance."]
            : ["Dan receives the seventh tribal lot at this stage of the division.", "The phrase begins Dan's inheritance section."];
  } else if (/their border went up toward the sea/.test(lower) || /their border turned toward ramah/.test(lower) || /their border was from heleph/.test(lower) || /their border went to jezreel/.test(lower) || /reached to jordan/.test(lower)) {
    opening = /toward the sea/.test(lower)
      ? ["The phrase traces Zebulun's border toward the sea.", "It helps the reader follow that tribe's inheritance shape."]
      : /to jezreel/.test(lower)
        ? ["The phrase traces Issachar's border through Jezreel.", "It helps the reader follow that tribe's inheritance shape."]
        : /reached to jordan/.test(lower)
          ? ["The border is shown extending to the Jordan as a major landmark.", "The phrase helps fix the inheritance by a well-known boundary."]
          : /toward ramah/.test(lower)
            ? ["The phrase traces Asher's border toward Ramah.", "It helps the reader follow that tribe's inheritance shape."]
            : ["The phrase traces Naphtali's border from one landmark to another.", "It helps the reader follow that tribe's inheritance shape."];
  } else if (/their border compassed sarid/.test(lower)) {
    opening = ["Compassed means the border curved or went around the area of Sarid.", "The phrase follows Zebulun's line through a specific landmark."];
  } else if (/sixteen cities with their villages/.test(lower)) {
    opening = ["The phrase totals Issachar's town cluster at sixteen cities with their villages.", "The count keeps that tribal inheritance organized and measurable."];
  } else if (/twenty and two cities with their villages/.test(lower)) {
    opening = ["The phrase totals Asher's town cluster at twenty-two cities with their villages.", "The count keeps that tribal inheritance organized and measurable."];
  } else if (/nineteen cities with their villages/.test(lower)) {
    opening = ["The phrase totals Naphtali's town cluster at nineteen cities with their villages.", "The count keeps that tribal inheritance organized and measurable."];
  } else if (/reached to judah upon jordan/.test(lower)) {
    opening = ["The phrase describes Naphtali's border reaching toward Judah at the Jordan.", "It shows how tribal boundaries were related to one another as well as to landmarks."];
  } else if (/the coast of their inheritance was zorah, and eshtaol/.test(lower) || /shaalabbin, ajalon, and jethlah/.test(lower)) {
    opening = /zorah/.test(lower)
      ? ["Zorah and Eshtaol are named places within Dan's allotted territory.", "The phrase begins filling in Dan's map with towns."]
      : ["Shaalabbin, Ajalon, and Jethlah add more named places to Dan's territory.", "The phrase continues Dan's town list."];
  } else if (/the children of dan went up to fight against leshem/.test(lower)) {
    opening = ["Dan goes up to fight for additional territory beyond the standard allotment list.", "The phrase shows the tribe enlarging its possession by battle."];
  } else if (/took it, and smote it with the edge of the sword/.test(lower)) {
    opening = ["The phrase says Dan captured the city by force and defeated its people.", "It records a real conquest, not just a border adjustment."];
  } else if (/called leshem, dan, after the name of dan their father/.test(lower)) {
    opening = ["The city receives the tribal name Dan after its ancestor.", "The phrase shows conquest turning into identity and settlement."];
  } else if (/according to their families/.test(lower) && section.reference === "Joshua 19:16-16") {
    opening = ["According to their families means Zebulun's inheritance belongs to its clan groups.", "The phrase ties the allotment to the households that will live there."];
  } else if (/according to their families/.test(lower) && section.reference === "Joshua 19:23-23") {
    opening = ["According to their families means Issachar's inheritance belongs to its clan groups.", "The phrase ties the allotment to the households that will live there."];
  } else if (/according to their families/.test(lower) && section.reference === "Joshua 19:30-31") {
    opening = ["According to their families means Asher's inheritance belongs to its clan groups.", "The phrase ties the allotment to the households that will live there."];
  } else if (/according to their families/.test(lower) && section.reference === "Joshua 19:38-39") {
    opening = ["According to their families means Naphtali's inheritance belongs to its clan groups.", "The phrase ties the allotment to the households that will live there."];
  } else if (/according to their families/.test(lower) && section.chapter === 19) {
    opening = ["According to their families means the inheritance belongs to real clan groups within that tribe.", "The phrase ties the land list to households that will live there."];
  } else if (/the allotment is complete/.test(lower) && section.reference === "Joshua 19:16-16") {
    opening = ["The line marks Zebulun's allotment as fully stated.", "The phrase signals that section has reached a settled finish."];
  } else if (/the allotment is complete/.test(lower) && section.reference === "Joshua 19:30-31") {
    opening = ["The line marks Asher's allotment as fully stated.", "The phrase signals that section has reached a settled finish."];
  } else if (/the allotment is complete/.test(lower) && section.reference === "Joshua 19:38-39") {
    opening = ["The line marks Naphtali's allotment as fully stated.", "The phrase signals that section has reached a settled finish."];
  } else if (/the allotment is complete/.test(lower)) {
    opening = ["The line marks that tribe's allotment as fully stated.", "The phrase signals the section has reached a settled finish."];
  } else if (/the allotment is stated plainly/.test(lower)) {
    opening = ["The line marks Issachar's allotment as plainly stated and complete.", "The phrase closes that section in simple summary form."];
  } else if (/cities named within dan's portion/.test(lower)) {
    opening = ["The line gathers the named cities as part of Dan's assigned territory.", "The phrase keeps the inheritance tied to actual places."];
  } else if (/they made an end of dividing the land/.test(lower)) {
    opening = ["The division of the land finally reaches completion here.", "The phrase marks the end of a long allotment process."];
  } else if (/they gave joshua the city which he asked/.test(lower)) {
    opening = ["Joshua himself receives a city only after the tribal allotments are finished.", "The phrase shows the leader waiting until the people have received their portions."];
  } else if (/timnath-serah in mount ephraim/.test(lower)) {
    opening = ["Timnath-serah is the city Joshua receives in Ephraim's hill country.", "The phrase gives his inheritance a specific location."];
  } else if (/he built the city, and dwelt therein/.test(lower) || /and dwelt therein/.test(lower)) {
    opening = ["Joshua settles in the city he received and makes it livable.", "The phrase closes the allotment story with habitation, not just paperwork."];
  }

  return note([
    opening[0],
    opening[1],
    lead,
    ...support,
  ]);
}

function getMeaning(title: string, section: { reference: string }) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/kings of the land|king|smote|defeated|possessed|war/.test(lower)) {
    return ["Joshua is remembering real victories before the land is divided.", "The inheritance is not an abstract idea; it follows the LORD giving Israel victory over actual rulers and places."];
  }
  if (/land|inheritance|possess|lot|portion|fell|gave|divided|families/.test(lower)) {
    return ["The promised land is being assigned to Israel's tribes and families.", "Joshua is showing God's promise becoming specific through borders, portions, cities, and households."];
  }
  if (/coast|border|went out|river|mount|valley|sea|city|cities|villages/.test(lower)) {
    return ["The boundary language gives shape to Israel's inheritance.", "The Bible names places because God's promise becomes real territory, not a vague spiritual idea."];
  }
  if (/caleb|give me this mountain|hebron|wholly followed|anakims|forty/.test(lower)) {
    return ["Caleb is trusting the same promise he believed decades earlier.", "His request for the mountain shows old faith still acting with courage in the land."];
  }
  if (/daughters of zelophehad|daughter|no sons|inheritance among our brethren|commandment of the lord/.test(lower)) {
    return ["The daughters' inheritance is protected according to the LORD's command.", "Their family is not erased because there were no sons; justice becomes part of the land map."];
  }
  if (/canaanites|drave not out|dwell among|tribute|slack|how long/.test(lower)) {
    return ["Incomplete obedience is being exposed inside the inheritance story.", "Israel may control some places, but leaving what God commanded them to remove plants danger for the future."];
  }
  if (/tabernacle|congregation|shiloh/.test(lower)) {
    return ["Worship is being placed at the center of Israel's settled life.", "The land is not merely real estate; the covenant people must live around the LORD's presence."];
  }
  if (/children of israel|tribe|tribes|people|brethren/.test(lower)) {
    return ["The inheritance belongs to the covenant people together.", "Joshua keeps naming tribes and families because God's promise is being distributed to real households."];
  }

  return ["Joshua is describing how the promised land becomes ordered inheritance.", `In ${section.reference}, victory, boundaries, tribes, and cities are being gathered under the LORD's faithfulness.`];
}

function getBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/king|smote|war|defeated/.test(lower)) return ["👑 Real kings had ruled there", "⚔️ Israel faced real enemies", "🙌 The LORD gave victory"];
  if (/inheritance|lot|portion|families|gave|divided/.test(lower)) return ["🏞️ The land is God's gift", "👥 Families receive their place", "📜 The allotment is ordered"];
  if (/coast|border|went out|river|mount|valley|sea|cities|villages/.test(lower)) return ["🗺️ The promise has boundaries", "📍 Places are named carefully", "🏠 The land becomes livable"];
  if (/caleb|mountain|hebron|anakims|wholly followed/.test(lower)) return ["💪 Caleb keeps trusting", "⛰️ The mountain requires courage", "📜 God's old promise still stands"];
  if (/daughters|zelophehad|no sons|brethren/.test(lower)) return ["👩‍👧 The daughters are included", "⚖️ Justice protects the family", "🏞️ Inheritance is preserved"];
  if (/canaanites|drave not out|dwell among|tribute|slack/.test(lower)) return ["⚠️ Obedience is incomplete", "🏠 The danger remains nearby", "📉 Compromise will have consequences"];
  if (/tabernacle|congregation|shiloh/.test(lower)) return ["⛺ Worship stands at the center", "👥 The congregation gathers", "🙌 The land belongs before God"];
  if (/children of israel|tribe|tribes|people|brethren/.test(lower)) return ["👥 Israel receives the promise together", "🏠 Families matter to the allotment", "📜 God's gift is ordered"];

  return ["🏞️ The land is becoming inheritance", "📍 The details make the promise concrete", "🙌 The LORD's faithfulness is being recorded"];
}

function getTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/canaanites|drave not out|slack|tribute/.test(lower)) return "Partial possession is not the same as full obedience.";
  if (/caleb|mountain|hebron/.test(lower)) return "Long obedience can still ask boldly for what God promised.";
  if (/daughters|zelophehad/.test(lower)) return "God's inheritance includes careful justice for vulnerable families.";
  if (/coast|border|cities|villages|lot|inheritance/.test(lower)) return "God's promise becomes concrete in real places and real families.";
  return "God's promise is becoming visible in Israel's settled life.";
}

function makeExplanation(section: { reference: string }, title: string) {
  const personalSection = section as PersonalLeviticusPhraseSectionInput;
  if (personalSection.chapter >= 12 && personalSection.chapter <= 15) {
    return explainDay59JoshuaAt95(personalSection, stripLeadingEmoji(title));
  }
  if (personalSection.chapter >= 16 && personalSection.chapter <= 19) {
    return explainDay60JoshuaAt95(personalSection, stripLeadingEmoji(title));
  }
  const [lineOne, lineTwo] = getMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getBullets(title),
    getTakeaway(title),
  ]);
}

function polishSection<T extends { phrases: string[][]; reference: string }>(section: T): T & { phrases: PersonalPhrase[] } {
  const personalSection = section as T & PersonalLeviticusPhraseSectionInput;
  const isDay60GeneratedSection = personalSection.chapter >= 16
    && personalSection.chapter <= 19
    && day60JoshuaCuratedPhraseTitles[personalSection.reference]?.length === personalSection.phrases.length;
  const title = isDay60GeneratedSection
    ? (day60JoshuaSectionTitles[personalSection.reference] || (section as T & { title?: string }).title)
    : (section as T & { title?: string }).title;
  const phraseTitles = isDay60GeneratedSection
    ? day60JoshuaCuratedPhraseTitles[personalSection.reference]
    : section.phrases.map(([phraseTitle]) => phraseTitle);
  return {
    ...section,
    ...(title ? { title } : {}),
    phrases: phraseTitles.map((phraseTitle) => [
      phraseTitle,
      makeExplanation(personalSection, phraseTitle),
    ] as PersonalPhrase),
  };
}

export const JOSHUA_12_19_PERSONAL_SECTIONS: PersonalSection[] = [
  ...upgradedDayFiftyNineOpeningSections.map(polishSection),
  ...DAY_59_JOSHUA_12_15_PERSONAL_SECTIONS
    .filter((section) => section.reference !== "Joshua 12:1-6" && section.reference !== "Joshua 12:7-8" && section.reference !== "Joshua 14:6-11")
    .map(polishSection),
  ...generatedJoshuaTwelveToNineteenPersonalSections
    .filter((section) => !dropGeneratedJoshua60References.has(section.reference))
    .map(polishSection),
  ...supplementalJoshuaTwelveToNineteenSections.map(polishSection),
];
