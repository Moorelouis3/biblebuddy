import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { DAY_59_JOSHUA_12_15_PERSONAL_SECTIONS } from "./dayFiftyNineJoshuaPersonalNotes";

type PersonalPhrase = [string, string];
type PersonalSection = PersonalLeviticusPhraseSectionInput;

const note = (lines: string[]) => lines.join("\n\n");

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
  const [lineOne, lineTwo] = getMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getBullets(title),
    getTakeaway(title),
  ]);
}

function polishSection<T extends { phrases: string[][]; reference: string }>(section: T): T & { phrases: PersonalPhrase[] } {
  return {
    ...section,
    phrases: section.phrases.map(([title]) => [
      title,
      makeExplanation(section, title),
    ] as PersonalPhrase),
  };
}

export const JOSHUA_12_19_PERSONAL_SECTIONS: PersonalSection[] = [
  ...upgradedDayFiftyNineOpeningSections.map(polishSection),
  ...DAY_59_JOSHUA_12_15_PERSONAL_SECTIONS
    .filter((section) => section.reference !== "Joshua 12:1-6" && section.reference !== "Joshua 12:7-8" && section.reference !== "Joshua 14:6-11")
    .map(polishSection),
  ...generatedJoshuaTwelveToNineteenPersonalSections.map(polishSection),
  ...supplementalJoshuaTwelveToNineteenSections.map(polishSection),
];
