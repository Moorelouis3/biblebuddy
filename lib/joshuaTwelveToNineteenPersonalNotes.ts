import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

const note = (lines: string[]) => lines.join("\n\n");

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

export const JOSHUA_12_19_PERSONAL_SECTIONS = [
  ...buildGeneratedPersonalSections({
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
  }),
  ...supplementalJoshuaTwelveToNineteenSections,
];
