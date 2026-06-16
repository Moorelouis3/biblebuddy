import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type PersonalPhrase = [string, string];
type PersonalSection = PersonalLeviticusPhraseSectionInput;

const note = (lines: string[]) => lines.join("\n\n");

const supplementalJoshuaOneToElevenSections: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 1,
    startVerse: 7,
    endVerse: 8,
    reference: "Joshua 1:7-8",
    title: "📖 This Book Of The Law Shall Not Depart",
    icon: "📖",
    phrases: [
      ["📖 This Book Of The Law", note(["Joshua's courage must stay tied to God's written instruction.", "The new leader does not receive permission to invent his own way forward.", "📖 God's word directs him", "👂 Joshua must listen", "👣 Israel must obey", "🏞️ The land is entered by faithfulness", "The phrase shows that conquest begins with submission to the LORD's word."])],
      ["🗣️ Shall Not Depart Out Of Thy Mouth", note(["Joshua is commanded to keep God's law close in speech.", "The law is not meant to sit silently in the background. It is to shape what he says and teaches.", "🗣️ The word is spoken", "📜 The command is remembered", "👥 The people are instructed", "🧭 Leadership stays anchored", "The phrase shows that Joshua's public leadership must be filled with God's instruction."])],
      ["🌙 Meditate Therein Day And Night", note(["Meditation means steady attention to God's word.", "Joshua needs more than a quick reminder before battle. He needs the law shaping his mind day and night.", "🌅 Morning obedience", "🌙 Night reflection", "🧠 A trained mind", "👣 A steady walk", "The phrase teaches that biblical courage grows from repeated attention to God's word."])],
      ["👣 Observe To Do According To All That Is Written", note(["Joshua is not only told to know the law.", "He must do what is written, because knowledge without obedience would not lead Israel well.", "👣 Obedience is required", "📜 The written word sets the path", "⚖️ All the command matters", "🏞️ The promise is entered God's way", "The phrase joins reading, remembering, and obeying into one calling."])],
      ["✅ Then Thou Shalt Make Thy Way Prosperous", note(["Prosperity here is tied to walking in the LORD's instruction.", "Joshua's success is not presented as luck or military talent. It is covenant faithfulness under God's command.", "✅ The way is blessed", "📖 The word is obeyed", "🛡️ Courage is grounded", "🏞️ The mission moves forward", "The phrase keeps success connected to obedience rather than self-confidence."])],
    ],
  },
  {
    chapter: 2,
    startVerse: 8,
    endVerse: 11,
    reference: "Joshua 2:8-11",
    title: "🪟 I Know That The LORD Hath Given You The Land",
    icon: "🪟",
    phrases: [
      ["🪟 I Know That The LORD Hath Given You The Land", note(["Rahab recognizes what the LORD is doing before Israel takes Jericho.", "Her confession shows that news of God's power has reached inside the city walls.", "🪟 Faith appears in Jericho", "🏞️ The land is God's gift", "👂 Rahab has heard", "🛡️ Israel's God is feared", "The phrase turns Rahab from a background character into a witness to the LORD's victory."])],
      ["😨 Your Terror Is Fallen Upon Us", note(["Jericho is already afraid before the battle begins.", "The fear is not mainly about Israel's army. It is about the LORD who dried up the sea and defeated kings.", "😨 Fear fills the city", "🌊 The Red Sea is remembered", "⚔️ Former victories are known", "👑 The LORD is being recognized", "The phrase shows that God has gone before Israel even into the hearts of their enemies."])],
      ["👂 We Have Heard How The LORD Dried Up The Water", note(["Rahab's faith is connected to what she has heard about the LORD.", "The old rescue from Egypt is still preaching to people far away in Canaan.", "👂 The report reaches Jericho", "🌊 The sea crossing is remembered", "📣 God's acts become testimony", "🪟 Rahab responds with faith", "The phrase shows how God's past deliverance creates present fear and faith."])],
      ["💔 Our Hearts Did Melt", note(["The people of Jericho lose courage when they hear what the LORD has done.", "Their walls may still stand, but inwardly the city is already shaken.", "💔 Courage collapses", "🏰 Walls cannot protect the heart", "👑 The LORD is feared", "🪟 Rahab sees the truth", "God's power reaches deeper than military defenses."])],
      ["👑 He Is God In Heaven Above And In Earth Beneath", note(["Rahab confesses that Israel's God rules everywhere.", "This is not a small tribal claim. She recognizes the LORD over heaven and earth.", "👑 God reigns above", "🌍 God rules below", "🪟 A Canaanite woman confesses Him", "🛡️ Jericho's gods cannot save", "The phrase is one of the clearest faith statements in the chapter."])],
    ],
  },
  {
    chapter: 3,
    startVerse: 17,
    endVerse: 17,
    reference: "Joshua 3:17",
    title: "🌊 Stood Firm On Dry Ground",
    icon: "🌊",
    phrases: [
      ["🌊 Stood Firm On Dry Ground", note(["The priests stand in the riverbed while the people cross.", "Their stillness shows trust: the ark remains in the middle until everyone passes safely.", "🌊 The river has opened", "🦶 The ground is dry", "📦 The ark remains central", "👥 The people cross safely", "The phrase shows God's presence holding the way open for Israel."])],
      ["📦 The Ark Of The Covenant Of The LORD", note(["The ark marks the LORD's covenant presence in the middle of the crossing.", "Israel is not crossing because the priests are powerful. They cross because the LORD is present with His covenant people.", "📦 Covenant presence", "👑 The LORD leads", "🌊 The river obeys", "👣 Israel follows", "The phrase keeps the miracle centered on God, not on human bravery."])],
      ["🏞️ In The Midst Of Jordan", note(["The priests stand in the middle of the danger, not safely on the edge.", "That detail makes the crossing feel concrete: the place that should stop Israel becomes the place where God holds them secure.", "🏞️ The riverbed becomes a pathway", "🛡️ The priests stand firm", "👥 The nation passes through", "📜 The promise moves forward", "The miracle is happening in the very place that looked impossible to cross."])],
      ["👥 All The Israelites Passed Over", note(["The crossing is not only for leaders or soldiers.", "All Israel passes through, showing that the LORD is bringing the whole covenant people into the land.", "👥 The whole people cross", "👣 No tribe is left behind", "🏞️ The promise is shared", "📦 God's presence stays with them", "The phrase shows the mercy and completeness of the LORD's deliverance."])],
      ["✅ Passed Clean Over Jordan", note(["The crossing is completed safely.", "Clean over means the people do not merely start the miracle; they finish the passage to the other side.", "✅ The crossing is finished", "🌊 The barrier is overcome", "🏞️ Canaan is reached", "👑 The LORD proves faithful", "The phrase closes the scene with completion, not uncertainty."])],
    ],
  },
  {
    chapter: 4,
    startVerse: 20,
    endVerse: 24,
    reference: "Joshua 4:20-24",
    title: "🪨 Those Twelve Stones",
    icon: "🪨",
    phrases: [
      ["🪨 Those Twelve Stones", note(["The stones become a physical reminder of the Jordan crossing.", "They are not decoration. They are memory markers for Israel's children.", "🪨 A sign is set up", "👥 Twelve tribes are remembered", "🌊 The Jordan crossing is taught", "📣 Future children will ask", "The phrase shows that God wants His works remembered and explained."])],
      ["👶 When Your Children Shall Ask", note(["The memorial is built with future children in mind.", "Israel must not let the miracle become a forgotten story from the past.", "👶 Children will ask", "👨‍👩‍👧 Parents must answer", "📖 God's work must be taught", "🪨 The stones start the conversation", "The phrase shows that faith is meant to be passed on with explanation."])],
      ["🌊 The LORD Your God Dried Up The Waters Of Jordan", note(["The explanation of the stones points straight to what the LORD did.", "Israel is not told to celebrate their courage first. They are told to remember God's power.", "🌊 The waters stopped", "👑 The LORD acted", "👥 Israel crossed", "📣 The story must be told", "The phrase keeps the memorial centered on God's mighty work."])],
      ["🌍 All The People Of The Earth Might Know", note(["The Jordan crossing is not only for Israel's private memory.", "God's power is meant to be known beyond Israel, among all peoples.", "🌍 The nations should know", "💪 The LORD's hand is mighty", "📣 Israel becomes a witness", "👑 God is publicly revealed", "The phrase widens the meaning of the miracle beyond one generation."])],
      ["🙏 Fear The LORD Your God For Ever", note(["The right response to the miracle is reverent fear.", "Israel should remember the Jordan so they keep honoring the LORD long after the water returns to normal.", "🙏 Reverence is required", "📜 Memory supports obedience", "🪨 The stones keep teaching", "⏳ The lesson is lasting", "The phrase turns memory into worship and obedience."])],
    ],
  },
  {
    chapter: 5,
    startVerse: 1,
    endVerse: 1,
    reference: "Joshua 5:1",
    title: "💔 Their Heart Melted",
    icon: "💔",
    phrases: [
      ["💔 Their Heart Melted", note(["The kings of Canaan lose courage after hearing about the Jordan crossing.", "The phrase shows fear inside the enemy before Israel ever fights.", "💔 Courage collapses", "🌊 The Jordan miracle is known", "👑 The LORD is feared", "🏰 Canaan's confidence breaks", "God's work at the river shakes the land Israel is about to enter."])],
      ["🌊 The LORD Had Dried Up The Waters Of Jordan", note(["The drying of the Jordan becomes testimony to the nations.", "The miracle was not hidden. Canaan's kings hear that the LORD opened the way for Israel.", "🌊 The river was stopped", "👑 The LORD acted", "📣 The report spread", "😨 The nations trembled", "The phrase shows that God's deliverance announces His power beyond Israel."])],
      ["👥 From Before The Children Of Israel", note(["The waters dried up in front of Israel as they moved toward the promise.", "The phrase connects the miracle directly to God's care for His covenant people.", "👥 Israel is protected", "👣 The people pass through", "🏞️ The land lies ahead", "🛡️ God goes before them", "The crossing is personal: the LORD makes a way for His people."])],
      ["😶 Neither Was There Spirit In Them Any More", note(["The kings have no courage left.", "Spirit here points to inner strength or resolve, and the verse says that resolve has drained away.", "😶 Courage is gone", "🏰 Power looks weak", "👑 The LORD has acted", "⚔️ Battle has not even begun", "The phrase shows that fear of the LORD's works can empty human confidence."])],
    ],
  },
  {
    chapter: 5,
    startVerse: 15,
    endVerse: 15,
    reference: "Joshua 5:15",
    title: "👣 Loose Thy Shoe From Off Thy Foot",
    icon: "👣",
    phrases: [
      ["👣 Loose Thy Shoe From Off Thy Foot", note(["Joshua is commanded to respond with reverence.", "The command echoes Moses at the burning bush and shows that this moment is holy.", "👣 Shoes come off", "🙏 Reverence is required", "🔥 Holy ground is recognized", "👑 The LORD's authority stands", "The phrase teaches Joshua that conquest begins with worship, not swagger."])],
      ["🔥 The Place Whereon Thou Standest Is Holy", note(["The ground is holy because of God's presence.", "Joshua is near Jericho, but the most important reality is not the city. It is the LORD meeting him.", "🔥 God's presence makes the place holy", "🏰 Jericho is not ultimate", "🙏 Joshua must bow", "⚔️ Battle belongs to the LORD", "The phrase shifts the reader's attention from strategy to worship."])],
      ["🛡️ The Captain Of The LORD'S Host", note(["The speaker is the commander of the LORD's army.", "Joshua leads Israel, but he is not the highest commander in the story.", "🛡️ Heaven's army is named", "👑 The LORD outranks Joshua", "⚔️ The battle is God's", "🙏 Joshua must submit", "The phrase prepares the reader for Jericho by showing who truly leads the campaign."])],
      ["✅ Joshua Did So", note(["Joshua obeys immediately.", "The short phrase matters because the leader of Israel responds to holiness with submission.", "✅ Obedience is immediate", "🙏 Reverence is visible", "👣 The shoe is removed", "👑 God's command is honored", "The phrase shows Joshua receiving the posture he needs before the battle begins."])],
    ],
  },
  {
    chapter: 1,
    startVerse: 1,
    endVerse: 5,
    reference: "Joshua 1:1-5",
    title: "🧭 Arise Go Over This Jordan",
    icon: "🧭",
    phrases: [
      ["🧭 Arise Go Over This Jordan", note(["Joshua is commanded to move forward after Moses' death.", "The phrase does not let grief become stillness. God calls Joshua and Israel toward the promise.", "🧭 The command is active", "🌊 Jordan is the barrier", "👣 Joshua must lead", "🏞️ The land is ahead", "The phrase sets the direction for the whole book of Joshua."])],
      ["👥 Thou And All This People", note(["Joshua does not cross alone.", "The command includes the whole covenant people who must move together into the land God promised.", "👥 The people are included", "👣 Leadership serves the nation", "🏞️ The promise is shared", "📜 God's word directs them", "The phrase shows that Joshua's calling is for Israel's future, not his personal glory."])],
      ["🏞️ The Land Which I Do Give To Them", note(["The land is described as God's gift.", "Joshua is about conquest, but this phrase makes clear that the inheritance comes from the LORD's promise.", "🏞️ The land is given", "👑 God is the giver", "📜 Promise is being fulfilled", "👣 Israel must enter by faith", "The phrase keeps the reader from seeing the land as mere human achievement."])],
      ["👣 Every Place That The Sole Of Your Foot Shall Tread Upon", note(["The promise becomes connected to Israel's actual steps.", "God gives the land, and Israel must walk into what He gives.", "👣 Feet must move", "🏞️ Promise becomes place", "🛡️ Courage is required", "📜 God's word stands", "The phrase joins divine gift with obedient movement."])],
      ["🤝 I Will Not Fail Thee Nor Forsake Thee", note(["God promises Joshua His continuing presence.", "This is the foundation beneath every courage command in the chapter.", "🤝 God will not abandon him", "🛡️ Courage has a reason", "👣 Joshua can move forward", "🏞️ The promise is secure", "The phrase teaches that Joshua's confidence rests on God's faithfulness."])],
    ],
  },
  {
    chapter: 2,
    startVerse: 12,
    endVerse: 14,
    reference: "Joshua 2:12-14",
    title: "🧵 Give Me A True Token",
    icon: "🧵",
    phrases: [
      ["🙏 Swear Unto Me By The LORD", note(["Rahab asks the spies to make an oath before the LORD.", "Her request shows that she understands Israel's God as the one who gives weight to their promise.", "🙏 The oath is serious", "👑 The LORD is named", "🪟 Rahab seeks mercy", "🤝 The spies must answer faithfully", "The phrase shows Rahab placing her hope under the name of the LORD."])],
      ["🕊️ Shewed You Kindness", note(["Rahab reminds the spies that she protected them.", "Kindness here is not a soft feeling; it is risky action that sheltered God's people.", "🕊️ Mercy was shown", "🪟 Rahab hid the spies", "⚠️ Her risk was real", "🤝 She asks for mercy in return", "The phrase helps explain why the spies promise protection to her house."])],
      ["🏠 My Father's House", note(["Rahab asks for mercy not only for herself but for her family.", "Her faith reaches toward her household in the middle of Jericho's coming judgment.", "🏠 Her family is named", "🕊️ Mercy is requested", "⚠️ Judgment is near", "🧵 A sign will mark the house", "The phrase shows personal faith seeking family rescue."])],
      ["🧵 Give Me A True Token", note(["Rahab asks for a reliable sign that the promise will be kept.", "The token will later be the scarlet cord, marking the house that should be spared.", "🧵 A sign is requested", "🤝 The promise must be trusted", "🏠 The house will be marked", "🕊️ Mercy needs a visible pledge", "The phrase prepares the reader for the cord in the window."])],
      ["💙 Our Life For Yours", note(["The spies pledge their own lives as security for Rahab's rescue.", "The phrase shows how seriously they take the promise made to her.", "💙 Their lives stand behind the oath", "🤝 Mercy is promised", "🏠 Rahab's house is protected", "👑 The LORD's name gives weight", "The phrase makes the covenant of protection feel costly and real."])],
    ],
  },
  {
    chapter: 4,
    startVerse: 8,
    endVerse: 13,
    reference: "Joshua 4:8-13",
    title: "🪨 Carried Them Over With Them",
    icon: "🪨",
    phrases: [
      ["🪨 Took Up Twelve Stones", note(["The twelve stones represent the twelve tribes of Israel.", "The act turns the Jordan crossing into a memorial that the whole nation shares.", "🪨 Stones are lifted", "👥 Twelve tribes are represented", "🌊 The crossing is remembered", "📣 The story will be taught", "The phrase shows memory being built into Israel's life."])],
      ["👣 Carried Them Over With Them", note(["The stones are carried from the riverbed to the place where Israel lodges.", "That movement connects the miracle in the Jordan to daily life on the other side.", "👣 The stones move with the people", "🏕️ The memorial reaches camp", "🌊 The river miracle is remembered", "👥 The nation carries the testimony", "The phrase shows Israel taking the memory of God's work forward."])],
      ["📦 The Ark Of The Covenant Of The LORD Stood", note(["The ark remains in the Jordan while the people complete the crossing.", "God's covenant presence stays in the middle until the nation is safely across.", "📦 The ark stands", "🌊 The river remains open", "👥 The people cross", "👑 The LORD holds the way", "The phrase keeps the crossing centered on God's presence."])],
      ["⚔️ The Children Of Reuben And The Children Of Gad", note(["The eastern tribes cross armed before the rest of Israel.", "They already have land east of the Jordan, but they still help their brothers enter theirs.", "⚔️ They cross ready for battle", "🤝 They keep their promise", "👥 The tribes remain united", "🏞️ The conquest is shared", "The phrase shows covenant responsibility across tribal lines."])],
    ],
  },
  {
    chapter: 4,
    startVerse: 14,
    endVerse: 14,
    reference: "Joshua 4:14",
    title: "👑 The LORD Magnified Joshua",
    icon: "👑",
    phrases: [
      ["👑 The LORD Magnified Joshua", note(["The LORD publicly confirms Joshua's leadership at the Jordan.", "This matters because Israel must learn to follow Joshua after Moses.", "👑 God honors Joshua's role", "👥 Israel sees it", "🌊 The crossing confirms leadership", "📜 Moses' transition continues", "The phrase shows that Joshua's authority is established by the LORD."])],
      ["👀 In The Sight Of All Israel", note(["Joshua's confirmation happens publicly before the people.", "The phrase matters because Israel needs to recognize the leader God has raised up.", "👀 The people see it", "👤 Joshua is recognized", "🌊 The miracle confirms the moment", "📜 The transition from Moses is clear", "The phrase shows that leadership is being established before the whole nation."])],
      ["🙏 They Feared Him", note(["Israel responds to Joshua with reverent respect.", "This does not mean they worship Joshua. It means they receive the authority God has placed on him.", "🙏 Respect is shown", "👥 Israel listens", "👤 Joshua is honored", "📜 God's appointment is received", "The phrase shows the people accepting Joshua's God-given role."])],
      ["📜 As They Feared Moses", note(["Joshua's leadership is connected to Moses' leadership.", "The phrase shows continuity: Israel is not starting over with a disconnected leader.", "📜 Moses' role is remembered", "👤 Joshua follows in that line", "👥 Israel recognizes him", "👑 The LORD confirms the transition", "Joshua is the appointed successor, not a rival to Moses."])],
    ],
  },
  {
    chapter: 6,
    startVerse: 17,
    endVerse: 19,
    reference: "Joshua 6:17-19",
    title: "⚠️ The City Shall Be Accursed",
    icon: "⚠️",
    phrases: [
      ["⚠️ The City Shall Be Accursed", note(["Jericho is placed under judgment before the LORD.", "The phrase means the city is devoted to destruction, not treated like ordinary spoil.", "⚠️ Judgment is declared", "🏰 Jericho belongs to the ban", "📜 Israel must obey exactly", "👑 The victory belongs to the LORD", "The phrase prepares the reader for why taking spoil becomes such a serious sin."])],
      ["🪟 Only Rahab The Harlot Shall Live", note(["Rahab is singled out for mercy in the middle of judgment.", "The phrase shows that faith and covenant mercy can rescue even inside a condemned city.", "🪟 Rahab is remembered", "🕊️ Mercy is shown", "🏠 Her household is spared", "👑 The LORD honors faith", "The phrase makes Rahab's rescue stand out against Jericho's fall."])],
      ["🧵 She Hid The Messengers", note(["Rahab's earlier act of faith is remembered here.", "She protected the spies because she believed the LORD had given Israel the land.", "🧵 Her action mattered", "⚠️ The risk was real", "🕊️ Mercy follows faith", "📜 The promise is kept", "The phrase connects Joshua 2 to the rescue in Joshua 6."])],
      ["🚫 Keep Yourselves From The Accursed Thing", note(["Israel is warned not to take what belongs under the ban.", "The command is clear because disobedience would bring trouble on the whole camp.", "🚫 Do not take it", "⚠️ Judgment is holy", "👥 The camp can be harmed", "📜 Obedience must be complete", "The phrase sets up the seriousness of Achan's sin in the next chapter."])],
      ["🥇 The Silver And Gold", note(["Precious metals are not for private greed.", "They are to be set apart for the treasury of the LORD instead of treated as personal loot.", "🥇 Valuable things are named", "🏛️ They belong to the LORD's treasury", "🚫 Israel must not steal them", "📜 Victory has holy boundaries", "The phrase teaches that even victory must be handled by God's command."])],
    ],
  },
  {
    chapter: 7,
    startVerse: 10,
    endVerse: 15,
    reference: "Joshua 7:10-15",
    title: "🚨 Israel Hath Sinned",
    icon: "🚨",
    phrases: [
      ["🚨 Israel Hath Sinned", note(["The LORD names the real problem after the defeat at Ai.", "The issue is not military weakness first. It is covenant disobedience inside the camp.", "🚨 Sin is exposed", "👥 The whole people are affected", "📜 The covenant has been broken", "⚠️ Defeat has a spiritual cause", "The phrase shifts the reader from battlefield confusion to hidden sin."])],
      ["📜 Transgressed My Covenant", note(["Achan's theft is described as covenant breaking.", "This makes the sin bigger than taking forbidden items. It is rebellion against the LORD's command.", "📜 The covenant is violated", "🚫 The ban was ignored", "👑 The LORD's word was dishonored", "👥 Israel suffers together", "The phrase explains why the consequence is so serious."])],
      ["🤲 Taken Of The Accursed Thing", note(["Someone has taken what God commanded Israel not to take.", "The phrase points directly back to Jericho's warning about devoted things.", "🤲 Forbidden spoil was taken", "⚠️ The command was clear", "🏰 Jericho's victory was polluted", "👥 The camp is troubled", "The phrase shows that hidden disobedience can corrupt public victory."])],
      ["🛑 Neither Will I Be With You Any More", note(["The LORD warns that His presence cannot be presumed while sin is protected.", "Israel's strength depends on God's presence, so this warning is terrifying.", "🛑 Presence is at stake", "🚨 Sin must be dealt with", "👥 Israel cannot move forward casually", "📜 Covenant obedience matters", "The phrase teaches that God's presence is holy, not automatic approval."])],
      ["🔥 Burnt With Fire", note(["The judgment on the guilty person shows the seriousness of devoted things.", "The punishment is severe because the sin has brought covenant trouble into Israel.", "🔥 Judgment is severe", "⚠️ Sin is not hidden from God", "👥 The camp must be cleansed", "📜 The LORD's word is upheld", "The phrase shows that Israel cannot carry the accursed thing forward."])],
    ],
  },
];

const generatedJoshuaOneToElevenPersonalSections = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  icon: "🛡️",
  fallbackPhrases: [
    "Be Strong And Of A Good Courage",
    "The LORD Thy God Is With Thee",
    "Ark Of The Covenant",
    "The Children Of Israel",
    "According Unto The Word Of The LORD",
    "The Land Which I Do Give",
    "This Book Of The Law",
    "The Lord Your God Dried Up The Waters",
    "Take You Twelve Men Out Of The People",
    "The Captain Of The LORD'S Host",
    "The Accursed Thing",
    "Ask Not Counsel At The Mouth Of The LORD",
  ],
});

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

const day57JoshuaCuratedPhraseTitles: Record<string, string[]> = {
  "Joshua 4:1-3": ["👥 When All The People Were Clean Passed Over Jordan", "🗣️ The LORD Spake Unto Joshua", "👬 Take You Twelve Men Out Of The People", "🏷️ Out Of Every Tribe A Man", "🪨 Take You Hence Out Of The Midst Of Jordan", "👣 Carry Them Over With You"],
  "Joshua 4:4-7": ["👬 Joshua Called The Twelve Men", "🪨 Take You Up Every Man Of You A Stone", "❓ When Your Children Ask Their Fathers In Time To Come", "🪧 That This May Be A Sign Among You"],
  "Joshua 4:8-10": ["✅ The Children Of Israel Did So As Joshua Commanded", "🪨 Took Up Twelve Stones Out Of The Midst Of Jordan", "📦 The Priests Which Bare The Ark Stood In The Midst Of Jordan", "⏳ Until Every Thing Was Finished"],
  "Joshua 4:11-14": ["✅ When All The People Were Clean Passed Over", "📦 The Ark Of The LORD Passed Over", "⚔️ The Children Of Reuben, And The Children Of Gad, And Half The Tribe Of Manasseh Passed Over Armed", "🪖 About Forty Thousand Prepared For War", "👑 The LORD Magnified Joshua"],
  "Joshua 4:15-18": ["🗣️ The LORD Spake Unto Joshua", "📦 Command The Priests That Bear The Ark Of The Testimony", "⬆️ Come Ye Up Out Of Jordan", "🌊 The Waters Of Jordan Returned Unto Their Place"],
  "Joshua 4:19-20": ["🌊 The People Came Up Out Of Jordan", "📅 On The Tenth Day Of The First Month", "⛺ Encamped In Gilgal", "🪨 Those Twelve Stones, Which They Took Out Of Jordan"],
  "Joshua 4:21-24": ["❓ When Your Children Shall Ask Their Fathers In Time To Come", "🌊 Israel Came Over This Jordan On Dry Land", "🌊 The LORD Your God Dried Up The Waters Of Jordan", "🌍 All The People Of The Earth Might Know The Hand Of The LORD"],
  "Joshua 5:2-7": ["🔪 Make Thee Sharp Knives", "✂️ Circumcise Again The Children Of Israel The Second Time", "🚶 All The People That Came Out Of Egypt", "👶 Their Children, Whom He Raised Up In Their Stead"],
  "Joshua 5:8-9": ["🏕️ They Abode In Their Places In The Camp", "💊 Till They Were Whole", "📛 This Day Have I Rolled Away The Reproach Of Egypt From Off You", "📍 The Name Of The Place Is Called Gilgal"],
  "Joshua 5:10-12": ["⛺ The Children Of Israel Encamped In Gilgal", "🫓 Did Eat Of The Old Corn Of The Land", "🍞 The Manna Ceased On The Morrow", "🌾 They Did Eat Of The Fruit Of The Land Of Canaan"],
  "Joshua 5:13-14": ["👀 Joshua Lifted Up His Eyes And Looked", "⚔️ There Stood A Man Over Against Him With His Sword Drawn In His Hand", "❓ Art Thou For Us, Or For Our Adversaries", "🛡️ As Captain Of The Host Of The LORD Am I Now Come"],
  "Joshua 6:1-2": ["🚪 Jericho Was Straitly Shut Up", "🚫 None Went Out, And None Came In", "🎁 I Have Given Into Thine Hand Jericho", "👑 And The King Thereof", "💪 And The Mighty Men Of Valour"],
  "Joshua 6:3-5": ["🔁 Ye Shall Compass The City", "🪖 All Ye Men Of War", "📯 Seven Priests Shall Bear Before The Ark Seven Trumpets Of Rams' Horns", "📣 When They Make A Long Blast With The Ram's Horn, And When Ye Hear The Sound Of The Trumpet, All The People Shall Shout"],
  "Joshua 6:6-11": ["📦 Take Up The Ark Of The Covenant", "📯 Seven Priests Bear Seven Trumpets Of Rams' Horns", "🔁 Compass The City", "🔇 Ye Shall Not Shout, Nor Make Any Noise With Your Voice", "🌅 Until The Day I Bid You Shout"],
  "Joshua 6:12-16": ["🌅 Joshua Rose Early In The Morning", "🔁 Compassed The City After The Same Manner Seven Times", "📯 The Priests Blew With The Trumpets", "📣 Shout; For The LORD Hath Given You The City"],
  "Joshua 6:17-19": ["⚠️ The City Shall Be Accursed, Even It, And All That Are Therein, To The LORD", "🪟 Only Rahab The Harlot Shall Live", "🧵 Because She Hid The Messengers That We Sent", "🚫 Keep Yourselves From The Accursed Thing", "🥇 The Silver, And The Gold, And Vessels Of Brass And Iron, Are Consecrated Unto The LORD"],
  "Joshua 6:20-21": ["📣 The People Shouted When The Priests Blew With The Trumpets", "🧱 The Wall Fell Down Flat", "⬆️ The People Went Up Into The City", "⚔️ They Utterly Destroyed All That Was In The City"],
  "Joshua 6:22-25": ["🏠 Go Into The Harlot's House", "👨‍👩‍👧 Bring Out Thence The Woman, And All That She Hath", "🫶 Joshua Saved Rahab The Harlot Alive", "🏡 She Dwelleth In Israel Even Unto This Day"],
  "Joshua 6:26-27": ["⚠️ Cursed Be The Man Before The LORD", "🏗️ He Shall Lay The Foundation Thereof In His Firstborn", "🚪 In His Youngest Son Shall He Set Up The Gates Of It", "📣 His Fame Was Noised Throughout All The Country"],
  "Joshua 7:2-5": ["🕵️ Joshua Sent Men From Jericho To Ai", "🔍 View The Country", "😌 Let Not All The People Go Up", "💔 The Hearts Of The People Melted, And Became As Water"],
  "Joshua 7:6-9": ["👕 Joshua Rent His Clothes", "🪨 Fell To The Earth Upon His Face Before The Ark Of The LORD", "😢 Alas, O LORD God", "❓ What Shall I Say, When Israel Turneth Their Backs Before Their Enemies"],
  "Joshua 7:10-12": ["🚨 Israel Hath Sinned", "📜 They Have Also Transgressed My Covenant", "🤲 They Have Even Taken Of The Accursed Thing", "🛑 Therefore The Children Of Israel Could Not Stand Before Their Enemies"],
  "Joshua 7:13-15": ["✨ Sanctify The People", "⚠️ There Is An Accursed Thing In The Midst Of Thee, O Israel", "👣 In The Morning Therefore Ye Shall Be Brought According To Your Tribes", "🔥 He That Is Taken With The Accursed Thing Shall Be Burnt With Fire"],
  "Joshua 7:16-18": ["🌅 Joshua Rose Up Early In The Morning", "🏷️ Brought Israel By Their Tribes", "🏠 Brought The Family Of Judah", "👤 Achan, The Son Of Carmi, The Son Of Zabdi, The Son Of Zerah, Of The Tribe Of Judah, Was Taken"],
  "Joshua 7:19-21": ["🙏 My Son, Give, I Pray Thee, Glory To The LORD God Of Israel", "🗣️ Make Confession Unto Him", "👘 I Saw Among The Spoils A Goodly Babylonish Garment", "🥈 Two Hundred Shekels Of Silver", "🥇 A Wedge Of Gold Of Fifty Shekels Weight", "🕳️ They Are Hid In The Earth In The Midst Of My Tent"],
  "Joshua 7:22-23": ["🏃 Joshua Sent Messengers", "⛺ They Ran Unto The Tent", "🤲 Took Them Out Of The Midst Of The Tent", "📦 Laid Them Out Before The LORD"],
  "Joshua 7:24-26": ["👥 All Israel With Him", "🪨 Raised Over Him A Great Heap Of Stones", "📍 Called The Name Of That Place, The Valley Of Achor", "😌 So The LORD Turned From The Fierceness Of His Anger"],
};

const day57JoshuaSectionTitles: Record<string, string> = {
  "Joshua 4:1-3": "🪨 Take Stones From Jordan",
  "Joshua 4:4-7": "🪧 A Sign For Your Children",
  "Joshua 4:8-10": "📦 The Priests Stood In Jordan",
  "Joshua 4:11-14": "👑 The LORD Magnified Joshua",
  "Joshua 4:15-18": "⬆️ Come Ye Up Out Of Jordan",
  "Joshua 4:19-20": "⛺ Encamped In Gilgal",
  "Joshua 4:21-24": "🌍 All The Earth Might Know",
  "Joshua 5:2-7": "🔪 Circumcise Again",
  "Joshua 5:8-9": "📛 The Reproach Of Egypt Rolled Away",
  "Joshua 5:10-12": "🍞 The Manna Ceased",
  "Joshua 5:13-14": "🛡️ Captain Of The LORD's Host",
  "Joshua 6:1-2": "🚪 Jericho Was Shut Up",
  "Joshua 6:3-5": "🔁 Compass The City",
  "Joshua 6:6-11": "📯 Seven Trumpets Before The Ark",
  "Joshua 6:12-16": "📣 Shout; For The LORD Hath Given You The City",
  "Joshua 6:17-19": "⚠️ The City Shall Be Accursed",
  "Joshua 6:20-21": "🧱 The Wall Fell Down Flat",
  "Joshua 6:22-25": "🏠 Bring Out Rahab",
  "Joshua 6:26-27": "⚠️ Cursed Be The Man Before The LORD",
  "Joshua 7:2-5": "💔 The Hearts Of The People Melted",
  "Joshua 7:6-9": "👕 Joshua Rent His Clothes",
  "Joshua 7:10-12": "🚨 Israel Hath Sinned",
  "Joshua 7:13-15": "✨ Sanctify The People",
  "Joshua 7:16-18": "🏷️ Achan Was Taken",
  "Joshua 7:19-21": "👘 I Saw Among The Spoils",
  "Joshua 7:22-23": "🏃 Joshua Sent Messengers",
  "Joshua 7:24-26": "📍 The Valley Of Achor",
};

const dropGeneratedJoshuaReferences = new Set([
  "Joshua 6:17-19",
]);

const day58JoshuaCuratedPhraseTitles: Record<string, string[]> = {
  "Joshua 8:1-2": [
    "🛡️ Fear Not, Neither Be Thou Dismayed",
    "👥 Take All The People Of War With Thee",
    "⬆️ Arise, Go Up To Ai",
    "👑 I Have Given Into Thy Hand The King Of Ai",
    "💰 Only The Spoil Thereof",
    "🕵️ Lay Thee An Ambush For The City Behind It",
  ],
  "Joshua 8:3-8": [
    "⚔️ Joshua Chose Out Thirty Thousand Mighty Men Of Valour",
    "🌙 Sent Them Away By Night",
    "🕵️ Lie Ye In Wait Against The City",
    "📍 Go Not Very Far From The City",
    "👥 I And All The People That Are With Me",
    "🏃 They Will Come Out After Us",
    "🏙️ Ye Shall Rise Up From The Ambush",
  ],
  "Joshua 8:9-9": [
    "➡️ Joshua Sent Them Forth",
    "🕵️ They Went To Lie In Ambush",
    "📍 Between Bethel And Ai",
    "🏕️ Joshua Lodged That Night Among The People",
  ],
  "Joshua 8:10-15": [
    "🌅 Joshua Rose Up Early In The Morning",
    "🔢 Numbered The People",
    "🏞️ There Was A Valley Between Them And Ai",
    "👀 When The King Of Ai Saw It",
    "🏃 They Fled By The Way Of The Wilderness",
  ],
  "Joshua 8:16-17": [
    "📣 All The People That Were In Ai Were Called Together",
    "🏃 They Pursued After Joshua",
    "🚪 There Was Not A Man Left In Ai Or Bethel",
    "🏙️ They Left The City Open",
  ],
  "Joshua 8:18-23": [
    "📏 Stretch Out The Spear That Is In Thy Hand Toward Ai",
    "🤲 I Will Give It Into Thine Hand",
    "🔥 They Entered Into The City, And Took It",
    "👑 The King Of Ai They Took Alive",
  ],
  "Joshua 8:24-29": [
    "🖐️ Joshua Drew Not His Hand Back",
    "⚔️ Until He Had Utterly Destroyed",
    "💰 Only The Cattle And The Spoil Of That City",
    "🌳 The King Of Ai He Hanged On A Tree",
  ],
  "Joshua 8:30-32": [
    "🪨 Joshua Built An Altar Unto The LORD God Of Israel",
    "⛰️ In Mount Ebal",
    "🧱 An Altar Of Whole Stones",
    "📜 Wrote There Upon The Stones A Copy Of The Law Of Moses",
  ],
  "Joshua 8:33-35": [
    "👥 All Israel, And Their Elders",
    "⛰️ Half Of Them Over Against Mount Gerizim",
    "🌍 As Well The Stranger, As He That Was Born Among Them",
    "📖 He Read All The Words Of The Law",
  ],
  "Joshua 9:1-2": [
    "👑 All The Kings Which Were On This Side Jordan",
    "👂 Heard Thereof",
    "🤝 Gathered Themselves Together",
    "➡️ With One Accord",
  ],
  "Joshua 9:3-6": [
    "🧠 They Did Work Wilily",
    "🎒 Took Old Sacks Upon Their Asses",
    "👞 Old Shoes And Clouted Upon Their Feet",
    "🤝 Make Ye A League With Us",
  ],
  "Joshua 9:7-10": [
    "🏠 Peradventure Ye Dwell Among Us",
    "🙇 We Are Thy Servants",
    "🌍 From A Very Far Country Thy Servants Are Come",
    "📛 Because Of The Name Of The LORD Thy God",
  ],
  "Joshua 9:11-15": [
    "🥖 Take Victuals With You For The Journey",
    "🙇 We Are Your Servants",
    "🍞 The Men Took Of Their Victuals",
    "🙏 Asked Not Counsel At The Mouth Of The LORD",
  ],
  "Joshua 9:16-21": [
    "🏘️ They Were Their Neighbours",
    "😠 All The Congregation Murmured",
    "🗣️ We Have Sworn Unto Them",
    "🫶 Let Them Live",
  ],
  "Joshua 9:22-23": [
    "❓ Wherefore Have Ye Beguiled Us",
    "🌍 We Are Very Far From You",
    "🏠 When Ye Dwell Among Us",
    "⚠️ Now Therefore Ye Are Cursed",
    "🪓 Hewers Of Wood And Drawers Of Water",
  ],
  "Joshua 9:24-27": [
    "📢 It Was Certainly Told Thy Servants",
    "🏞️ To Give You All The Land",
    "😨 We Were Sore Afraid Of Our Lives",
    "👌 As It Seemeth Good And Right Unto Thee",
    "🪓 Hewers Of Wood And Drawers Of Water",
  ],
  "Joshua 10:1-5": [
    "👑 Adonizedek King Of Jerusalem",
    "🕊️ Gibeon Had Made Peace With Israel",
    "😨 Feared Greatly",
    "📣 Come Up Unto Me, And Help Me",
  ],
  "Joshua 10:6-8": [
    "✋ Slack Not Thy Hand From Thy Servants",
    "🏃 Come Up To Us Quickly",
    "💪 Fear Them Not",
    "🚫 There Shall Not A Man Of Them Stand Before Thee",
  ],
  "Joshua 10:9-11": [
    "🌙 Joshua Came Unto Them Suddenly",
    "🚶 Went Up From Gilgal All Night",
    "😱 The LORD Discomfited Them Before Israel",
    "🪨 Cast Down Great Stones From Heaven",
  ],
  "Joshua 10:12-15": [
    "☀️ Sun, Stand Thou Still Upon Gibeon",
    "🌙 Thou, Moon, In The Valley Of Ajalon",
    "⏸️ The Sun Stood Still",
    "🛑 The Moon Stayed",
    "📅 There Was No Day Like That Before It Or After It",
    "👂 The LORD Hearkened Unto The Voice Of A Man",
    "⚔️ The LORD Fought For Israel",
  ],
  "Joshua 10:16-21": [
    "👑 These Five Kings Fled",
    "🕳️ Hid Themselves In A Cave",
    "⚔️ Smote Them With A Very Great Slaughter",
    "🕊️ All The People Returned To The Camp In Peace",
  ],
  "Joshua 10:22-27": [
    "🪨 Open The Mouth Of The Cave",
    "🦶 Put Your Feet Upon The Necks Of These Kings",
    "💪 Fear Not, Nor Be Dismayed",
    "🌳 Joshua Hanged Them On Five Trees",
  ],
  "Joshua 10:28-33": [
    "🏙️ That Day Joshua Took Makkedah",
    "➡️ Joshua Passed From Makkedah Unto Libnah",
    "🤲 The LORD Delivered It Also",
    "👑 Horam King Of Gezer Came Up To Help Lachish",
  ],
  "Joshua 10:34-39": [
    "➡️ Joshua Passed Unto Lachish",
    "➡️ From Lachish Unto Eglon",
    "➡️ From Eglon They Went Up To Hebron",
    "➡️ From Hebron He Passed Unto Debir",
  ],
  "Joshua 10:40-43": [
    "🗺️ Joshua Smote All The Country Of The Hills",
    "🚫 Left None Remaining",
    "⚔️ At One Time",
    "🙌 The LORD God Of Israel Fought For Israel",
  ],
  "Joshua 11:1-5": [
    "👑 Jabin King Of Hazor",
    "🏖️ As The Sand That Is Upon The Sea Shore In Multitude",
    "🐎 With Horses And Chariots Very Many",
    "💧 Pitched Together At The Waters Of Merom",
  ],
  "Joshua 11:7-9": [
    "⚡ Joshua Came Suddenly",
    "⚔️ They Fell Upon Them Suddenly",
    "🐎 Houghed Their Horses",
    "🔥 Burnt Their Chariots With Fire",
  ],
  "Joshua 11:10-15": [
    "👑 Hazor Beforetime Was The Head Of All Those Kingdoms",
    "⚔️ Joshua Smote All The Souls",
    "🔥 Burnt Hazor With Fire",
    "🏙️ Israel Burned None Of The Cities",
    "📜 As The LORD Commanded Moses",
    "✅ So Did Joshua",
  ],
  "Joshua 11:16-20": [
    "🗺️ Joshua Took All That Land",
    "⏳ Joshua Made War A Long Time",
    "🏘️ Save The Hivites The Inhabitants Of Gibeon",
    "🫀 It Was Of The LORD To Harden Their Hearts",
  ],
  "Joshua 11:21-22": [
    "⚔️ Joshua Cut Off The Anakims",
    "🚫 Left None Of The Anakims",
    "📍 Only In Gaza, In Gath, And In Ashdod",
    "⏰ At That Time Came Joshua",
  ],
};

const day58JoshuaSectionTitles: Record<string, string> = {
  "Joshua 8:1-2": "🛡️ Fear Not At Ai",
  "Joshua 8:3-8": "🕵️ Set An Ambush",
  "Joshua 8:9-9": "🌙 Ambush By Night",
  "Joshua 8:10-15": "🏃 Ai Chases Israel",
  "Joshua 8:16-17": "🚪 The City Left Open",
  "Joshua 8:18-23": "📏 Stretch Out The Spear",
  "Joshua 8:24-29": "🌳 The King Of Ai Hanged",
  "Joshua 8:30-32": "🪨 An Altar In Mount Ebal",
  "Joshua 8:33-35": "📖 All The Words Of The Law",
  "Joshua 9:1-2": "🤝 Kings Gather Together",
  "Joshua 9:3-6": "🧠 The Gibeonites Work Wilily",
  "Joshua 9:7-10": "🌍 From A Far Country",
  "Joshua 9:11-15": "🙏 Asked Not Counsel",
  "Joshua 9:16-21": "🫶 Let Them Live",
  "Joshua 9:22-23": "⚠️ Now Therefore Ye Are Cursed",
  "Joshua 9:24-27": "🪓 Hewers Of Wood",
  "Joshua 10:1-5": "📣 Come Up Unto Me",
  "Joshua 10:6-8": "💪 Fear Them Not",
  "Joshua 10:9-11": "🪨 Great Stones From Heaven",
  "Joshua 10:12-15": "☀️ Sun, Stand Thou Still",
  "Joshua 10:16-21": "🕳️ The Five Kings Fled",
  "Joshua 10:22-27": "🦶 Feet Upon Their Necks",
  "Joshua 10:28-33": "🏙️ Joshua Took Makkedah",
  "Joshua 10:34-39": "➡️ From Lachish To Debir",
  "Joshua 10:40-43": "🗺️ Joshua Smote All The Country",
  "Joshua 11:1-5": "👑 Jabin King Of Hazor",
  "Joshua 11:7-9": "⚡ Joshua Came Suddenly",
  "Joshua 11:10-15": "🔥 Burnt Hazor With Fire",
  "Joshua 11:16-20": "🗺️ Joshua Took All That Land",
  "Joshua 11:21-22": "⚔️ Joshua Cut Off The Anakims",
};

const day56JoshuaCuratedPhraseTitles: Record<string, string[]> = {
  "Joshua 1:1-2": [
    "🕯️ After The Death Of Moses The Servant Of The LORD",
    "🗣️ The LORD Spake Unto Joshua The Son Of Nun",
    "📛 Moses My Servant Is Dead",
    "➡️ Now Therefore Arise",
    "🌊 Go Over This Jordan",
  ],
  "Joshua 1:3-5": [
    "👣 Every Place That The Sole Of Your Foot Shall Tread Upon",
    "📜 As I Said Unto Moses",
    "🛡️ There Shall Not Any Man Be Able To Stand Before Thee",
    "🤝 I Will Not Fail Thee, Nor Forsake Thee",
  ],
  "Joshua 1:7-8": [
    "💪 Only Be Thou Strong And Very Courageous",
    "📖 Observe To Do According To All The Law",
    "↔️ Turn Not From It To The Right Hand Or To The Left",
    "✅ Then Thou Shalt Have Good Success",
  ],
  "Joshua 1:10-11": [
    "🧭 Joshua Commanded The Officers Of The People",
    "👥 Pass Through The Host",
    "🥖 Prepare You Victuals",
    "📅 Within Three Days",
    "🌊 Ye Shall Pass Over This Jordan",
  ],
  "Joshua 1:12-15": [
    "🛡️ To The Reubenites, And To The Gadites, And To Half The Tribe Of Manasseh",
    "🧠 Remember The Word Which Moses The Servant Of The LORD Commanded You",
    "🏠 Your Wives, Your Little Ones, And Your Cattle",
    "📍 Shall Remain In The Land",
    "⚔️ Ye Shall Pass Before Your Brethren Armed",
    "🕊️ Until The LORD Have Given Your Brethren Rest",
  ],
  "Joshua 1:16-18": [
    "🙌 All That Thou Commandest Us We Will Do",
    "👣 Whithersoever Thou Sendest Us, We Will Go",
    "👂 According As We Hearkened Unto Moses In All Things, So Will We Hearken Unto Thee",
    "🤝 Only The LORD Thy God Be With Thee, As He Was With Moses",
    "⚠️ Whosoever He Be That Doth Rebel Against Thy Commandment",
    "💪 Only Be Strong And Of A Good Courage",
  ],
  "Joshua 2:2-7": [
    "👑 There Came Men In Hither To Night Of The Children Of Israel To Search Out The Country",
    "🚪 Bring Forth The Men",
    "🏠 She Had Brought Them Up To The Roof",
    "🌾 Hid Them With The Stalks Of Flax",
  ],
  "Joshua 2:8-11": [
    "🌙 Before They Were Laid Down",
    "🪟 She Came Up Unto Them Upon The Roof",
    "🪟 I Know That The LORD Hath Given You The Land",
    "👂 We Have Heard How The LORD Dried Up The Water Of The Red Sea",
    "💔 Our Hearts Did Melt",
    "👑 The LORD Your God, He Is God In Heaven Above, And In Earth Beneath",
  ],
  "Joshua 2:12-14": [
    "🙏 Swear Unto Me By The LORD",
    "🕊️ Since I Have Shewed You Kindness",
    "🏠 Ye Will Also Shew Kindness Unto My Father's House",
    "🧵 Give Me A True Token",
    "👨‍👩‍👧 Save Alive My Father, And My Mother",
    "👬 And My Brethren, And My Sisters",
    "💙 Our Life For Yours",
  ],
  "Joshua 2:15-16": [
    "🧵 She Let Them Down By A Cord Through The Window",
    "🏠 Her House Was Upon The Town Wall",
    "⛰️ Get You To The Mountain",
    "📅 Hide Yourselves There Three Days",
  ],
  "Joshua 2:17-21": [
    "📜 We Will Be Blameless Of This Thine Oath",
    "🧵 Thou Shalt Bind This Line Of Scarlet Thread In The Window",
    "👨‍👩‍👧 Bring Thy Father, And Thy Mother, And Thy Brethren",
    "🚪 Whosoever Shall Go Out Of The Doors Of Thy House Into The Street",
  ],
  "Joshua 2:22-24": [
    "⛰️ They Went, And Came Unto The Mountain",
    "📅 Abode There Three Days",
    "🔎 The Pursuers Sought Them Throughout All The Way",
    "🙌 Truly The LORD Hath Delivered Into Our Hands All The Land",
  ],
  "Joshua 3:1-4": [
    "🌅 Joshua Rose Early In The Morning",
    "🚶 They Removed From Shittim, And Came To Jordan",
    "📣 The Officers Went Through The Host",
    "📦 When Ye See The Ark Of The Covenant Of The LORD Your God",
    "🧭 Ye Have Not Passed This Way Heretofore",
  ],
  "Joshua 3:5-6": [
    "✨ Sanctify Yourselves",
    "🙌 Tomorrow The LORD Will Do Wonders Among You",
    "📦 Take Up The Ark Of The Covenant",
    "👣 Pass Over Before The People",
  ],
  "Joshua 3:7-8": [
    "👑 This Day Will I Begin To Magnify Thee In The Sight Of All Israel",
    "🤝 As I Was With Moses, So I Will Be With Thee",
    "🌊 When Ye Are Come To The Brink Of The Water Of Jordan",
    "🛑 Ye Shall Stand Still In Jordan",
  ],
  "Joshua 3:9-13": [
    "👂 Come Hither, And Hear The Words Of The LORD Your God",
    "🕊️ Hereby Ye Shall Know That The Living God Is Among You",
    "📦 The Ark Of The Covenant Of The LORD Of All The Earth",
    "🌊 The Waters Of Jordan Shall Be Cut Off",
  ],
  "Joshua 3:14-16": [
    "👣 The Feet Of The Priests That Bare The Ark Were Dipped In The Brim Of The Water",
    "🌊 Jordan Overfloweth All His Banks",
    "🧱 The Waters Which Came Down From Above Stood And Rose Up Upon An Heap",
    "➡️ The People Passed Over Right Against Jericho",
  ],
};

const day56JoshuaSectionTitles: Record<string, string> = {
  "Joshua 1:1-2": "🕯️ Joshua Called After Moses' Death",
  "Joshua 1:3-5": "🏞️ The Land Is Given",
  "Joshua 1:7-8": "📖 Courage And The Law",
  "Joshua 1:10-11": "🥖 Prepare To Cross",
  "Joshua 1:12-15": "⚔️ The Eastern Tribes Must Help",
  "Joshua 1:16-18": "🤝 Israel Answers Joshua",
  "Joshua 2:2-7": "🪟 Rahab Hides The Spies",
  "Joshua 2:8-11": "👑 Rahab Confesses The LORD",
  "Joshua 2:12-14": "🧵 Rahab Asks For Mercy",
  "Joshua 2:15-16": "⛰️ Rahab Sends Them Away",
  "Joshua 2:17-21": "🧵 The Scarlet Thread Sign",
  "Joshua 2:22-24": "🙌 The Spies Return",
  "Joshua 3:1-4": "📦 Follow The Ark",
  "Joshua 3:5-6": "✨ Sanctify Yourselves",
  "Joshua 3:7-8": "👑 Joshua Is Confirmed",
  "Joshua 3:9-13": "🕊️ The Living God Is Among You",
  "Joshua 3:14-16": "🌊 Jordan Stands Up",
};

function explainDay56JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: string[] = ["This line moves Joshua and Israel toward the promised land.", "The chapter shows God's promise continuing after Moses."];
  let lead = "➡️ The story is moving forward under God's word.";
  let support = ["📜 God speaks clearly", "👥 Israel must respond", "🏞️ The promise is ahead"];

  if (/after the death of moses/.test(lower)) {
    opening = ["The story begins after Moses' death so the reader feels the weight of transition immediately.", "Israel has lost its great leader, but God's purpose has not ended."];
    lead = "🕯️ Moses is gone, but the mission remains.";
    support = ["📛 A faithful servant has died", "👑 God still rules the story", "➡️ Joshua must now lead"];
  } else if (/the lord spake unto joshua/.test(lower)) {
    opening = ["God speaks directly to Joshua as the new leader of Israel.", "Joshua is not stepping forward on his own authority; he is being addressed by the LORD."];
    lead = "🗣️ Joshua's leadership begins with God's word.";
    support = ["👂 The next leader must listen", "📜 God's command sets the path", "👥 Israel will follow under that word"];
  } else if (/moses my servant is dead/.test(lower)) {
    opening = ["God states Moses' death plainly.", "The sentence closes one era and clears the way for Joshua's assignment to begin."];
    lead = "📛 The old leadership season has truly ended.";
    support = ["🕯️ Grief is real", "➡️ The mission must continue", "👑 God remains present"];
  } else if (/now therefore arise/.test(lower)) {
    opening = ["Arise means get up for action.", "Joshua is not called to stay still at the edge of grief or fear."];
    lead = "➡️ God calls Joshua to move forward.";
    support = ["👣 Obedience begins with movement", "⏳ Delay is over", "🏞️ The promise must be entered"];
  } else if (/go over this jordan/.test(lower) && section.reference === "Joshua 1:1-2") {
    opening = ["Jordan is the river barrier between Israel and the promised land.", "Go over this Jordan means the long wilderness season is ending and the crossing must begin."];
    lead = "🌊 The barrier must now be crossed.";
    support = ["🏞️ Canaan lies beyond", "👣 Joshua must lead the crossing", "🙌 God will make the way"];
  } else if (/arise go over this jordan/.test(lower)) {
    opening = ["God joins the command to arise with the command to cross the river.", "Joshua is being called to active forward movement into the promise right now."];
    lead = "?? The mission moves from standing still to crossing over.";
    support = ["?? God commands movement", "?? Joshua must lead the people", "??? The land lies ahead"];
  } else if (/thou and all this people/.test(lower)) {
    opening = ["Joshua is not sent forward alone.", "The whole covenant people are included in the crossing and in the inheritance."];
    lead = "?? The promise is for the people together.";
    support = ["?? Joshua leads a nation, not a private mission", "??? The inheritance is shared", "?? Everyone must move with him"];
  } else if (/every place that the sole of your foot/.test(lower) && section.reference === "Joshua 1:1-5") {
    opening = ["The promise is attached to the ground Israel will actually step on as they enter Canaan.", "God is teaching Joshua that inheritance is received by moving into what He gives."];
    lead = "👣 Promise and movement are joined together.";
    support = ["🏞️ The land is real territory", "👥 The people must step into it", "🙌 God gives what He commands them to enter"];
  } else if (/every place that the sole of your foot/.test(lower)) {
    opening = ["The promise is described in terms of actual footsteps on actual ground.", "God gives the land, but Israel must walk into what He gives."];
    lead = "👣 The gift becomes real as Israel steps into it.";
    support = ["🏞️ The land is promised", "👥 The people must move", "📜 God's word makes the claim sure"];
  } else if (/as i said unto moses/.test(lower)) {
    opening = ["God ties Joshua's future to the same promise already spoken to Moses.", "The new leader is not receiving a new religion, but the same covenant word carried forward."];
    lead = "📜 Joshua stands under an earlier promise, not a new invention.";
    support = ["🤝 Promise continues across leaders", "🕯️ Moses' work is not erased", "👑 God stays consistent"];
  } else if (/there shall not any man be able to stand before thee/.test(lower)) {
    opening = ["The phrase promises that enemies will not finally prevail against Joshua while God is with him.", "It is not bragging about Joshua's skill; it is assurance of divine backing."];
    lead = "🛡️ Opposition will not overpower a leader upheld by God.";
    support = ["⚔️ Enemies will resist", "👑 God gives the edge", "💪 Courage has a reason"];
  } else if (/i will not fail thee nor forsake thee/.test(lower)) {
    opening = ["God promises Joshua that His presence will not abandon him as the mission begins.", "The line gives a personal foundation beneath every command to be strong."];
    lead = "?? Joshua is assured of God's personal faithfulness.";
    support = ["?? God will stay with him", "?? Courage has a solid reason", "??? The promise can be pursued without fear"];
  } else if (/i will not fail thee, nor forsake thee/.test(lower)) {
    opening = ["Fail thee and forsake thee both deny abandonment.", "Joshua's courage rests on the promise that God will not drop him halfway through the mission."];
    lead = "🤝 Joshua is promised God's steady presence.";
    support = ["👑 God stays with His servant", "💪 Courage is grounded", "🏞️ The promise can be pursued"];
  } else if (/land which i do give to them/.test(lower)) {
    opening = ["The land is spoken of as something God gives, not something Israel invents or earns into existence.", "Conquest will happen, but gift comes first in the wording."];
    lead = "??? The inheritance is fundamentally God's gift.";
    support = ["?? God is the giver", "?? Israel receives together", "?? Promise stands behind possession"];
  } else if (/only be thou strong and very courageous/.test(lower)) {
    opening = ["Strong and very courageous does not mean self-confident swagger.", "Joshua is being told to stand firm enough to obey all God has said."];
    lead = "💪 Courage here means obedience under pressure.";
    support = ["📖 The law must be kept", "↔️ Joshua must not turn aside", "👑 Strength serves obedience"];
  } else if (/observe to do according to all the law/.test(lower)) {
    opening = ["Observe to do means watch carefully in order to obey.", "Joshua is not told merely to admire the law, but to practice it fully."];
    lead = "📖 God's law must be obeyed, not just known.";
    support = ["👂 The word must be heard", "👣 Obedience must follow", "💪 Courage protects faithfulness"];
  } else if (/turn not from it to the right hand or to the left/.test(lower)) {
    opening = ["The image is of staying on the path without drifting either direction.", "Joshua's success depends on straight obedience rather than creative detours."];
    lead = "↔️ Joshua must not drift from God's path.";
    support = ["🧭 The way is narrow and clear", "📜 God's word defines it", "👣 Steady obedience matters"];
  } else if (/then thou shalt have good success/.test(lower)) {
    opening = ["Good success is tied to covenant obedience, not mere visible achievement.", "Joshua is being taught that true prosperity comes from walking God's way."];
    lead = "✅ Success is defined by obedience under God's favor.";
    support = ["📖 The law stays central", "👣 Obedience shapes outcome", "👑 God gives the increase"];
  } else if (/this book of the law/.test(lower) && section.reference === "Joshua 1:7-8" && section.phrases.length === 5) {
    opening = ["The phrase points Joshua back to the written law as his steady rule for leadership.", "He is not supposed to invent the way forward from courage alone."];
    lead = "📖 Scripture must stay at the center of Joshua's leadership.";
    support = ["📜 Moses' written instruction still leads", "👂 Joshua must keep receiving it", "💪 Courage must answer to the word"];
  } else if (/this book of the law/.test(lower)) {
    opening = ["The book of the law is God's written instruction given through Moses.", "Joshua is not free to lead by impulse; he must stay under revealed truth."];
    lead = "?? Joshua's leadership must remain tethered to Scripture.";
    support = ["?? Written instruction leads him", "?? He must keep hearing it", "?? Courage must stay under the word"];
  } else if (/shall not depart out of thy mouth/.test(lower)) {
    opening = ["The law must stay in Joshua's mouth, meaning it must be spoken, repeated, and kept close in speech.", "A leader shaped by God's word should sound like it."];
    lead = "??? God's word must stay active in Joshua's speech.";
    support = ["?? The law is not background noise", "?? The people need to hear it", "?? Leadership speaks from Scripture"];
  } else if (/meditate therein day and night/.test(lower)) {
    opening = ["Meditate means give steady, repeated attention to God's word.", "Joshua needs more than quick inspiration; he needs a mind trained by Scripture."];
    lead = "?? Courage grows from deep repeated attention to God's word.";
    support = ["?? The word shapes both day and night", "?? The mind is being trained", "?? Obedience is fed by meditation"];
  } else if (/observe to do according to all that is written/.test(lower)) {
    opening = ["Joshua is called to do what is written, not merely to admire or quote it.", "The phrase joins reading and obedience together."];
    lead = "?? The written word is meant to be practiced.";
    support = ["?? Scripture directs action", "?? Courage protects obedience", "?? God is honored by doing, not just knowing"];
  } else if (/make thy way prosperous/.test(lower)) {
    opening = ["Prosperous here means the path is blessed under God's favor.", "Joshua is not promised self-made success, but fruitfulness tied to obedience."];
    lead = "? Prosperity is described as a blessed path under God.";
    support = ["?? Obedience shapes the way", "?? The path matters as much as the result", "?? God is the source of success"];
  } else if (/joshua commanded the officers/.test(lower)) {
    opening = ["Joshua immediately begins issuing orders to the nation's officers.", "The new leader is not left as a symbolic figure; he must organize the people to move."];
    lead = "🧭 Joshua leads by giving clear command.";
    support = ["👥 The officers must carry the word", "⏳ The crossing is near", "🏞️ Israel must prepare"];
  } else if (/pass through the host/.test(lower)) {
    opening = ["The host means the camp of Israel.", "Passing through it means the command must reach the whole people, not stay with leaders only."];
    lead = "👥 The camp must hear the order to prepare.";
    support = ["📣 Leadership carries the message", "🏕️ The whole camp is involved", "➡️ Movement is coming"];
  } else if (/prepare you victuals/.test(lower)) {
    opening = ["Victuals means food and provisions for the journey ahead.", "The people are being told to prepare in practical ways for obedience."];
    lead = "🥖 Faithful movement includes real preparation.";
    support = ["🏕️ The crossing is close", "👥 The people must get ready", "🌊 Obedience touches daily needs"];
  } else if (/within three days/.test(lower)) {
    opening = ["The command is given a clear time frame so Israel knows the crossing is imminent.", "The promise is no longer distant talk; it is now on the calendar."];
    lead = "📅 God's next step is close at hand.";
    support = ["⏳ Waiting is nearly over", "👥 The people must be ready", "🌊 Jordan will soon be crossed"];
  } else if (/ye shall pass over this jordan/.test(lower)) {
    opening = ["Joshua speaks the crossing as a real coming event, not a distant hope.", "The river that once marked delay is now the next act of obedience."];
    lead = "🌊 Israel is being readied for the crossing.";
    support = ["👥 The people will move together", "🏞️ The inheritance lies beyond", "🙌 God will open the way"];
  } else if (/to the reubenites.*manasseh/.test(lower)) {
    opening = ["Joshua addresses the eastern tribes by name because they had already received land east of Jordan.", "Their earlier rest does not release them from helping their brothers."];
    lead = "🛡️ The tribes with land already received still owe covenant help.";
    support = ["🤝 Israel must act as one people", "⚔️ Shared promise means shared duty", "🧭 Joshua reminds them of their commitment"];
  } else if (/remember the word which moses/.test(lower)) {
    opening = ["Joshua calls them to remember the command already given through Moses.", "Their duty now is not new information, but faithful follow-through."];
    lead = "🧠 Covenant memory is meant to become action.";
    support = ["📜 Moses' word still binds", "🤝 Promise requires response", "⚔️ Help must now be given"];
  } else if (/your wives, your little ones, and your cattle/.test(lower)) {
    opening = ["Joshua names the families and livestock that will remain behind east of Jordan.", "The phrase shows that the fighting men go ahead while the households stay in the settled land."];
    lead = "🏠 Not everyone crosses armed, but everyone is part of the arrangement.";
    support = ["👨‍👩‍👧 Families are accounted for", "🐄 Property remains behind", "⚔️ The armed men go first"];
  } else if (/shall remain in the land/.test(lower)) {
    opening = ["The eastern tribes are allowed to leave their families in the land already given to them.", "That permission does not cancel their duty to help the rest of Israel gain rest too."];
    lead = "📍 Rest already received does not cancel responsibility.";
    support = ["🏠 Their households stay behind", "🤝 Their obligation continues", "⚔️ They must still serve"];
  } else if (/ye shall pass before your brethren armed/.test(lower)) {
    opening = ["Armed means ready for battle as they go ahead of their brothers.", "The phrase shows solidarity: they will not enjoy private rest while the other tribes still fight."];
    lead = "⚔️ Covenant unity demands costly help.";
    support = ["🤝 Brothers must be helped", "🛡️ Strength is shared", "🏞️ The conquest belongs to all Israel"];
  } else if (/until the lord have given your brethren rest/.test(lower)) {
    opening = ["Their service lasts until the other tribes receive rest in the land too.", "Rest is treated as something the whole people should share, not something one tribe keeps for itself."];
    lead = "🕊️ True rest is shared across the covenant people.";
    support = ["🤝 Tribal loyalty matters", "⏳ Service continues until the work is done", "🏞️ The inheritance must be shared"];
  } else if (/all that thou commandest us we will do/.test(lower)) {
    opening = ["The people answer Joshua with open obedience.", "Their first response to the new leader is not suspicion, but willingness to follow."];
    lead = "🙌 Israel publicly receives Joshua's leadership.";
    support = ["👂 The people respond", "🤝 The transition is accepted", "➡️ Obedience can now move forward"];
  } else if (/whithersoever thou sendest us, we will go/.test(lower)) {
    opening = ["The people promise readiness to go wherever Joshua sends them.", "The line shows that his authority is being treated as real, not merely ceremonial."];
    lead = "👣 The people commit themselves to follow.";
    support = ["🤝 Joshua is received", "👥 The nation moves together", "🏞️ The mission can proceed"];
  } else if (/according as we hearkened unto moses/.test(lower)) {
    opening = ["The people connect their obedience to Joshua with the obedience once given to Moses.", "The sentence emphasizes continuity rather than rupture."];
    lead = "👂 Joshua is received as Moses' true successor.";
    support = ["🕯️ The old leader is remembered", "🤝 The new leader is honored", "👑 God's order is continuing"];
  } else if (/only the lord thy god be with thee/.test(lower)) {
    opening = ["The people know Joshua's success depends on God being with him.", "Their encouragement reaches beyond Joshua himself to the presence that must sustain him."];
    lead = "🤝 Israel wants Joshua to be upheld by God's presence.";
    support = ["👑 God must stay near", "💪 Courage depends on Him", "🕯️ Moses' pattern is recalled"];
  } else if (/whosoever he be that doth rebel/.test(lower)) {
    opening = ["The people treat rebellion against Joshua's lawful command as a serious matter.", "This sharp pledge shows they understand the danger of disorder at the threshold of the land."];
    lead = "⚠️ The new leadership must not be undermined.";
    support = ["👥 The nation needs unity", "🛑 Rebellion will be judged", "🏞️ Disorder would endanger the mission"];
  } else if (/only be strong and of a good courage/.test(lower) && section.reference === "Joshua 1:16-18") {
    opening = ["The people repeat God's courage command back to Joshua.", "What God spoke privately is now echoed publicly by those he must lead."];
    lead = "💪 Joshua is strengthened by both God and the people.";
    support = ["🗣️ The command is reaffirmed", "🤝 Leadership is supported", "➡️ The nation is ready to move"];
  } else if (/there came men in hither to night/.test(lower)) {
    opening = ["The king of Jericho hears that Israelite spies have entered the city at night.", "The phrase shows the city is already alert and afraid before any battle begins."];
    lead = "👑 Jericho knows Israel is near.";
    support = ["🌃 The spies arrive secretly", "👂 News travels quickly", "⚠️ Danger rises at once"];
  } else if (/bring forth the men/.test(lower)) {
    opening = ["The king demands that Rahab hand over the spies.", "The order puts her at a moment of decision between Jericho and the God of Israel."];
    lead = "🚪 Rahab is forced to choose where she stands.";
    support = ["👑 The king is searching", "🪟 The spies are vulnerable", "⚖️ Her loyalty will be revealed"];
  } else if (/i wot not whence they were/.test(lower)) {
    opening = ["Wot means knew.", "Rahab's answer is a deliberate misdirection meant to protect the spies from capture."];
    lead = "❓ Rahab hides the truth to shield the men.";
    support = ["🪟 The spies remain concealed", "⚠️ The risk is immediate", "🤝 Rahab acts decisively"];
  } else if (/brought them up to the roof/.test(lower)) {
    opening = ["Rahab moves the spies up onto the roof of her house.", "That upper space becomes the place where rescue begins inside enemy territory."];
    lead = "🏠 The roof becomes a hiding place of mercy.";
    support = ["🪟 Rahab takes initiative", "⚠️ Jericho is searching", "🤝 The spies are protected"];
  } else if (/hid them with the stalks of flax/.test(lower)) {
    opening = ["Flax is a plant laid out to dry, so Rahab uses ordinary materials to conceal the spies.", "The phrase turns a rooftop detail into a means of protection."];
    lead = "🌾 Common materials become a shelter in God's providence.";
    support = ["🪟 Rahab hides them carefully", "👀 The searchers are misled", "🤝 Mercy works through practical action"];
  } else if (/pursued after them the way to jordan/.test(lower)) {
    opening = ["The pursuers rush toward the Jordan road, thinking the spies have fled that way.", "Rahab's protection succeeds because the search is sent in the wrong direction."];
    lead = "🌊 The danger is redirected away from the spies.";
    support = ["👣 The search moves out", "🪟 The spies remain hidden", "⏳ Time is gained"];
  } else if (/before they were laid down/.test(lower)) {
    opening = ["Before they slept, Rahab comes to speak with the spies.", "The timing matters because her confession and request for mercy happen before the night is over."];
    lead = "🌙 A decisive conversation happens before dawn.";
    support = ["🪟 Rahab approaches them", "🗣️ Faith begins to speak", "⚠️ Judgment is near"];
  } else if (/she came up unto them upon the roof/.test(lower)) {
    opening = ["Rahab goes up to the roof because that hidden place is where the spies are waiting.", "The movement turns the hiding place into a meeting place of confession."];
    lead = "🪟 The roof becomes the place where Rahab speaks her faith.";
    support = ["🤝 She seeks the men directly", "🗣️ Her words will matter", "⚠️ Jericho still lies under judgment"];
  } else if (/i know that the lord hath given you the land/.test(lower) && section.phrases.length === 5) {
    opening = ["Rahab openly confesses that the LORD has already decided Israel's inheritance.", "She sees God's verdict before Jericho's walls have fallen."];
    lead = "🪟 Rahab believes God's decision before the conquest is visible.";
    support = ["🏞️ The land is the LORD's to give", "👂 Jericho has heard His works", "🙌 Faith appears in an unexpected place"];
  } else if (/i know that the lord hath given you the land/.test(lower)) {
    opening = ["Rahab speaks with certainty that the land already belongs to Israel by God's gift.", "Her faith sees God's decision before Jericho has even fallen."];
    lead = "🪟 Rahab believes God's gift before the conquest is complete.";
    support = ["🏞️ The land is the LORD's to give", "👂 Rahab has heard His works", "🙌 Faith appears inside Jericho"];
  } else if (/heard how the lord dried up the water of the red sea/.test(lower)) {
    opening = ["Rahab's faith is built on what she has heard about the Red Sea deliverance.", "God's old rescue is still bearing witness in a foreign city years later."];
    lead = "👂 The exodus still preaches God's power.";
    support = ["🌊 The sea crossing is remembered", "👑 Jericho hears the report", "🙌 Faith responds to testimony"];
  } else if (/our hearts did melt/.test(lower) && section.phrases.length === 5) {
    opening = ["Jericho's courage has already collapsed because of what the people have heard about the LORD.", "The city still stands physically, but inwardly it is shaken."];
    lead = "💔 Fear is already weakening Jericho from the inside.";
    support = ["👂 The report has done its work", "🏰 Walls cannot steady the heart", "👑 The LORD is being feared"];
  } else if (/our hearts did melt/.test(lower)) {
    opening = ["Hearts did melt means courage collapsed inwardly.", "Jericho may still have walls, but its confidence is already dissolving."];
    lead = "💔 Fear reaches the heart before Israel ever attacks.";
    support = ["🏰 Walls cannot keep courage alive", "👑 God's acts have shaken the city", "⚠️ Judgment is approaching"];
  } else if (/he is god in heaven above and in earth beneath/.test(lower)) {
    opening = ["Rahab confesses that the LORD rules both above and below, not just in Israel's territory.", "Her words recognize God's universal rule from inside a Canaanite city."];
    lead = "?? Rahab declares the LORD's rule over all places.";
    support = ["?? Heaven is under His authority", "?? Earth is under His authority", "?? Jericho's idols are exposed as powerless"];
  } else if (/he is god in heaven above, and in earth beneath/.test(lower)) {
    opening = ["Rahab confesses that Israel's God rules above and below, not in one small territory only.", "This is a remarkably full confession from a woman inside a Canaanite city."];
    lead = "👑 Rahab names the LORD as universal God.";
    support = ["☁️ Heaven is under His rule", "🌍 Earth is under His rule", "🙌 Jericho's gods are exposed as nothing"];
  } else if (/swear unto me by the lord/.test(lower) && section.phrases.length === 5) {
    opening = ["Rahab wants the spies' promise tied directly to the LORD's name.", "She is asking for rescue to rest on the God she now trusts."];
    lead = "🙏 Rahab wants mercy secured by the LORD's name.";
    support = ["🤝 The oath must be solemn", "🏠 Her house is in view", "🙌 Faith is reaching for covenant mercy"];
  } else if (/swear unto me by the lord/.test(lower)) {
    opening = ["Rahab asks for an oath made in the name of the LORD.", "She wants mercy secured by the God she has come to fear and trust."];
    lead = "🙏 Rahab seeks mercy under the LORD's name.";
    support = ["🗣️ The promise must be solemn", "🤝 The spies must answer faithfully", "🏠 A household is in view"];
  } else if (/since i have shewed you kindness/.test(lower)) {
    opening = ["Shewed means showed, and kindness here means concrete mercy given at real risk.", "Rahab is asking that the mercy she gave be answered with mercy shown to her."];
    lead = "🕊️ Rahab appeals to remembered kindness.";
    support = ["🪟 She protected the spies", "⚠️ Her risk was real", "🤝 Mercy is being requested in return"];
  } else if (/ye will also shew kindness unto my father's house/.test(lower)) {
    opening = ["Rahab does not ask only for herself, but for her father's household too.", "Her faith immediately reaches outward toward family rescue."];
    lead = "🏠 Mercy is requested for a whole household.";
    support = ["👨‍👩‍👧 Family is named", "⚠️ Jericho is doomed", "🕊️ Rahab seeks shared rescue"];
  } else if (/give me a true token/.test(lower) && section.phrases.length === 5) {
    opening = ["Rahab asks for a sign she can rely on when judgment comes to Jericho.", "She does not want vague reassurance, but a mark that the promise will stand."];
    lead = "🧵 Rahab asks for visible reassurance of mercy.";
    support = ["🤝 The promise must be dependable", "🏠 The house will be marked", "🙌 Faith looks for a trustworthy sign"];
  } else if (/give me a true token/.test(lower)) {
    opening = ["A true token is a trustworthy sign that the promise will really be kept.", "Rahab is asking for something visible she can rest her hope on."];
    lead = "🧵 Mercy is tied to a visible pledge.";
    support = ["🤝 The oath must be dependable", "🏠 The house will be marked", "🙌 Faith asks for a real sign"];
  } else if (/save alive my father, and my mother/.test(lower)) {
    opening = ["Rahab is pleading for the lives of her parents, not for abstract kindness.", "The phrase makes the coming judgment feel personal and urgent."];
    lead = "👨‍👩‍👧 Rahab wants actual lives spared.";
    support = ["⚠️ Jericho is under sentence", "🏠 Family rescue matters", "🕊️ Mercy must become concrete"];
  } else if (/and my brethren, and my sisters/.test(lower)) {
    opening = ["Rahab keeps naming relatives because she wants the circle of rescue widened.", "Her faith is not content with private survival."];
    lead = "👬 Rahab's plea grows to include her wider family.";
    support = ["🏠 The household expands", "🕊️ Mercy is sought broadly", "⚠️ Judgment is close"];
  } else if (/our life for yours/.test(lower) && section.phrases.length === 5) {
    opening = ["The spies answer with a pledge that places their own lives behind the promise.", "The phrase makes the coming rescue feel weighty and binding."];
    lead = "💙 The promise of rescue is backed by a serious pledge.";
    support = ["🤝 The oath carries cost", "🏠 Rahab's family is included", "🙌 Mercy is spoken with solemn weight"];
  } else if (/our life for yours/.test(lower)) {
    opening = ["The spies place their own lives behind the promise they are making.", "The phrase gives weight and cost to the pledge of protection."];
    lead = "💙 The promise of rescue is treated as solemn and costly.";
    support = ["🤝 The oath is serious", "🏠 Rahab's house will be remembered", "🙌 Mercy is not spoken lightly"];
  } else if (/let them down by a cord through the window/.test(lower)) {
    opening = ["Rahab lowers the spies by a cord through the window so they can escape unseen.", "The cord becomes the immediate means of deliverance before it later becomes a sign."];
    lead = "🧵 Escape comes through a fragile-looking means.";
    support = ["🪟 The window becomes the way out", "⚠️ Danger is near", "🤝 Rahab acts again"];
  } else if (/her house was upon the town wall/.test(lower)) {
    opening = ["Rahab's house is built into the city wall, which explains how the spies can be lowered from it.", "A structural detail becomes the doorway of rescue."];
    lead = "🏠 Rahab's location makes escape possible.";
    support = ["🪟 The house has an opening outward", "🏰 Jericho's wall is being used against itself", "🤝 Providence is at work in the details"];
  } else if (/get you to the mountain/.test(lower)) {
    opening = ["Rahab directs the spies toward the mountain country so they can avoid the pursuers.", "She is giving a real escape route, not a vague wish for safety."];
    lead = "⛰️ Mercy includes practical direction.";
    support = ["👣 The men need a place to hide", "⚠️ Pursuers are searching", "🗺️ Rahab knows how to buy them time"];
  } else if (/hide yourselves there three days/.test(lower)) {
    opening = ["The spies are told to stay hidden for three days until the search dies down.", "Patience becomes part of their deliverance."];
    lead = "📅 Escape requires waiting as well as running.";
    support = ["⛰️ The mountain gives cover", "⏳ The search must pass", "👣 Return comes later"];
  } else if (/we will be blameless of this thine oath/.test(lower)) {
    opening = ["Blameless means free from guilt if the agreed terms are broken.", "The spies are carefully defining the conditions of the promise so there is no confusion later."];
    lead = "📜 Mercy is promised with clear covenant terms.";
    support = ["🤝 The oath has boundaries", "🧵 The sign must be kept", "🏠 The household must stay within the agreement"];
  } else if (/bind this line of scarlet thread in the window/.test(lower)) {
    opening = ["The scarlet thread is the visible mark that will identify Rahab's house for mercy.", "The sign does not save by magic; it marks trust in the promised word."];
    lead = "🧵 A visible sign will mark the house to be spared.";
    support = ["🪟 The window bears the sign", "🏠 The house is set apart", "🕊️ Mercy will remember the mark"];
  } else if (/bring thy father, and thy mother, and thy brethren/.test(lower)) {
    opening = ["Rahab must gather her family into the marked house if they are to share in the rescue.", "Mercy is available, but they must come under the sign."];
    lead = "👨‍👩‍👧 The household must be brought into the place of safety.";
    support = ["🏠 The house becomes refuge", "🧵 The sign marks it", "⚠️ Outside the house is danger"];
  } else if (/whosoever shall go out of the doors of thy house into the street/.test(lower)) {
    opening = ["Going outside the marked house means stepping outside the promised protection.", "The phrase shows that mercy must be received on the terms given."];
    lead = "🚪 Safety is tied to staying inside the marked refuge.";
    support = ["🏠 The house is the safe place", "⚠️ The street will not be protected", "📜 The oath has to be honored as given"];
  } else if (/they went, and came unto the mountain/.test(lower)) {
    opening = ["The spies obey Rahab's directions and reach the mountain safely.", "Their escape succeeds because the warning they received is actually followed."];
    lead = "⛰️ Wise obedience preserves the spies.";
    support = ["👣 They follow the route given", "⚠️ Pursuers are avoided", "🙌 The escape is working"];
  } else if (/abode there three days/.test(lower)) {
    opening = ["The spies remain hidden for the full three days Rahab told them to wait.", "The phrase shows patient trust instead of panicked movement."];
    lead = "📅 Deliverance includes waiting for the right moment.";
    support = ["⛰️ The mountain gives cover", "⏳ Timing matters", "👣 Return comes after patience"];
  } else if (/the pursuers sought them throughout all the way/.test(lower)) {
    opening = ["The search is thorough, which makes Rahab's help look even more significant.", "The spies were not safe because the danger was small; they were safe because they were hidden well."];
    lead = "🔎 The danger was real, not imaginary.";
    support = ["⚠️ The searchers were serious", "🪟 Rahab's action mattered", "🙌 God preserved them through means"];
  } else if (/truly the lord hath delivered into our hands all the land/.test(lower)) {
    opening = ["The spies return convinced that the LORD has already decided the outcome.", "Rahab's confession and Jericho's fear confirm what God had promised."];
    lead = "🙌 The report comes back full of confidence in God's gift.";
    support = ["👂 Jericho's fear has been witnessed", "🏞️ The land is seen as delivered", "🤝 Joshua receives a strong report"];
  } else if (/your terror is fallen upon us/.test(lower)) {
    opening = ["Rahab says fear has already fallen on Jericho before Israel has attacked.", "The city is inwardly shaken because of what it has heard about the LORD."];
    lead = "?? God has gone before Israel into the hearts of its enemies.";
    support = ["?? The report has spread", "?? Jericho is afraid already", "?? The LORD is being feared"];
  } else if (/we have heard how the lord dried up the water/.test(lower)) {
    opening = ["Rahab's confidence is based on the report of what the LORD did at the Red Sea.", "God's old rescue is still creating fear and faith in Canaan."];
    lead = "?? God's past rescue is still bearing witness.";
    support = ["?? The sea crossing is remembered", "?? Jericho has heard", "?? Testimony is producing response"];
  } else if (/shewed you kindness/.test(lower)) {
    opening = ["Kindness here means a costly act of mercy, not a small polite gesture.", "Rahab protected the spies, and now she asks that mercy be answered with mercy."];
    lead = "??? Rahab appeals to the mercy she has already shown.";
    support = ["?? She acted at real risk", "?? Mercy should be returned", "?? Her household is in view"];
  } else if (/my father's house/.test(lower)) {
    opening = ["Rahab's faith reaches beyond herself to the family she wants rescued.", "The phrase makes mercy a household concern, not a private one."];
    lead = "?? Rahab wants salvation to reach her family too.";
    support = ["???????? Family is named", "?? Judgment is coming", "??? Faith seeks rescue for others"];
  } else if (/joshua rose early in the morning/.test(lower)) {
    opening = ["Joshua rises early because the crossing is now an urgent act of obedience.", "The phrase shows readiness instead of hesitation."];
    lead = "🌅 Joshua acts promptly when the time comes.";
    support = ["👣 Leadership moves first", "⏳ Delay is over", "🌊 Jordan is now before them"];
  } else if (/removed from shittim, and came to jordan/.test(lower)) {
    opening = ["Israel leaves Shittim and comes to the river itself.", "The people are no longer waiting at a distance from the obstacle; they are standing before it."];
    lead = "🚶 Israel comes right up to the barrier.";
    support = ["🌊 Jordan is now in front of them", "👥 The whole camp is involved", "🙌 God will meet them there"];
  } else if (/the officers went through the host/.test(lower)) {
    opening = ["The officers move through the camp to carry instructions to the people.", "The crossing will require ordered listening, not crowd confusion."];
    lead = "📣 The camp is being prepared by clear instruction.";
    support = ["👥 Everyone must hear", "📦 The ark will lead", "🧭 Order matters in obedience"];
  } else if (/when ye see the ark of the covenant/.test(lower)) {
    opening = ["The people are told to watch for the ark because God's presence must lead the crossing.", "They are not to rush ahead by instinct."];
    lead = "📦 Israel must move by following God's presence.";
    support = ["👀 The people must watch", "👣 Movement follows the ark", "🙌 God leads first"];
  } else if (/ye have not passed this way heretofore/.test(lower)) {
    opening = ["The people are entering a path they have never walked before.", "The unknown future is exactly why they must follow the ark carefully."];
    lead = "🧭 New ground requires close attention to God's lead.";
    support = ["👣 The path is unfamiliar", "📦 The ark must guide them", "🙌 God knows the way they do not"];
  } else if (/sanctify yourselves/.test(lower)) {
    opening = ["Sanctify yourselves means prepare yourselves as set apart before the LORD.", "The people are being readied for holy encounter, not merely for a dramatic event."];
    lead = "✨ The crossing begins with consecration.";
    support = ["🕊️ Hearts must be prepared", "🙌 God is about to act", "👥 The people must be ready"];
  } else if (/tomorrow the lord will do wonders among you/.test(lower)) {
    opening = ["Wonders means mighty acts that only God can do.", "Joshua tells the people to expect something divine, not ordinary."];
    lead = "🙌 Israel is told to expect God's mighty action.";
    support = ["⏳ The moment is near", "👥 The people will witness it", "🌊 The obstacle will not stand"];
  } else if (/take up the ark of the covenant/.test(lower)) {
    opening = ["The priests must lift the ark because the sign of God's covenant presence is going before the nation.", "The crossing centers on the LORD's presence, not on human daring."];
    lead = "📦 The ark goes first because God goes first.";
    support = ["👣 The priests lead with the ark", "🌊 Jordan will answer to God", "👥 The people follow behind"];
  } else if (/pass over before the people/.test(lower)) {
    opening = ["The priests carrying the ark move ahead of the people.", "The order matters because Israel is meant to follow God's presence into the impossible place."];
    lead = "👣 The people cross by following what goes before them.";
    support = ["📦 The ark leads", "👥 Israel follows", "🌊 The river will open under God's rule"];
  } else if (/this day will i begin to magnify thee/.test(lower)) {
    opening = ["Magnify thee means publicly honor and establish Joshua before Israel.", "The LORD is confirming the new leader in a way the people will be able to see."];
    lead = "👑 God is establishing Joshua before the nation.";
    support = ["👀 Israel must recognize him", "🤝 The transition from Moses is being confirmed", "🙌 God gives the validation"];
  } else if (/as i was with moses, so i will be with thee/.test(lower)) {
    opening = ["God promises Joshua the same covenant presence that upheld Moses.", "The sentence is not making Joshua equal in every way, but assuring him he is not abandoned."];
    lead = "🤝 Joshua is promised continuity of God's presence.";
    support = ["🕯️ Moses' pattern is recalled", "👑 God remains the same", "💪 Leadership is strengthened"];
  } else if (/brink of the water of jordan/.test(lower)) {
    opening = ["The brink is the edge of the river itself.", "Joshua is told exactly how near the priests must go before God acts."];
    lead = "🌊 Obedience must bring them right to the water's edge.";
    support = ["👣 The priests must step close", "📦 The ark leads into the danger", "🙌 God meets them there"];
  } else if (/ye shall stand still in jordan/.test(lower)) {
    opening = ["Stand still in Jordan means remain in the riverbed where God places them.", "The priests are not told to rush through, but to hold their place while Israel crosses."];
    lead = "🛑 The priests must stand where only God can hold them.";
    support = ["🌊 The river is no longer ordinary", "📦 The ark remains central", "👥 Israel crosses because they stand"];
  } else if (/come hither, and hear the words of the lord your god/.test(lower)) {
    opening = ["Joshua gathers the people close because what they need most is to hear God's word.", "Before the river opens, the people must listen."];
    lead = "👂 The crossing begins with hearing.";
    support = ["👥 The nation is addressed", "📜 God's word explains the moment", "🙌 Obedience starts with listening"];
  } else if (/hereby ye shall know that the living god is among you/.test(lower)) {
    opening = ["Living God means the God who truly acts and is not like dead idols.", "The crossing will prove His presence by deed, not only by claim."];
    lead = "🕊️ The miracle will show that the living God is present.";
    support = ["🌊 Jordan will testify", "👑 The idols of Canaan cannot do this", "👥 Israel will know God is among them"];
  } else if (/he will without fail drive out from before you/.test(lower)) {
    opening = ["Without fail means certainly and effectively.", "Joshua links the coming crossing to the future conquest of Canaanite peoples."];
    lead = "⚔️ The God who opens Jordan will also clear the land.";
    support = ["🏞️ The conquest is in view", "👑 God's promise includes victory", "👥 Israel must trust His certainty"];
  } else if (/ark of the covenant of the lord of all the earth/.test(lower)) {
    opening = ["The title LORD of all the earth makes God's rule wider than Israel alone.", "The ark carries the sign of a God whose authority reaches over the river and the nations."];
    lead = "📦 The ark represents the Lord who rules the whole earth.";
    support = ["🌍 God's authority is universal", "🌊 Jordan must obey Him", "👥 Israel follows His presence"];
  } else if (/waters of jordan shall be cut off/.test(lower)) {
    opening = ["Cut off means the river's flow will be stopped.", "Joshua is telling the people in advance what kind of wonder God is about to do."];
    lead = "🌊 The river will stop because God commands it.";
    support = ["🙌 The wonder is announced beforehand", "👥 Israel will cross on God's terms", "👑 The living God will be known"];
  } else if (/feet of the priests.*dipped in the brim/.test(lower)) {
    opening = ["The priests must step into the edge of the overflowing river before the waters part.", "The miracle begins at the point of obedient contact, not from a safe distance."];
    lead = "👣 Obedience steps into the impossible before the path opens.";
    support = ["🌊 The river is still full", "📦 The ark goes first", "🙌 God answers obedient movement"];
  } else if (/jordan overfloweth all his banks/.test(lower)) {
    opening = ["The river is at flood stage, which makes the crossing humanly harder, not easier.", "The detail magnifies the miracle by showing the obstacle at its strongest."];
    lead = "🌊 The barrier is at full force when God opens it.";
    support = ["⚠️ The crossing is impossible by human power", "🙌 The wonder will be unmistakable", "👥 Israel must depend on God"];
  } else if (/stood and rose up upon an heap/.test(lower)) {
    opening = ["The waters pile up instead of continuing their normal flow.", "The phrase makes clear that the river is being halted by God's direct power."];
    lead = "🧱 The river behaves unnaturally because God has stopped it.";
    support = ["🌊 The flow is interrupted", "🙌 The miracle is visible", "👥 A path is being made"];
  } else if (/passed over right against jericho/.test(lower)) {
    opening = ["Israel crosses right opposite Jericho, the city that stands first in the way of conquest.", "The crossing places God's people directly before the stronghold they must soon face."];
    lead = "➡️ God brings Israel straight to the place of next obedience.";
    support = ["🏰 Jericho is now before them", "🌊 The barrier is behind them", "🙌 God's promise has carried them forward"];
  } else if (/stood firm on dry ground/.test(lower)) {
    opening = ["The priests stand firmly on the riverbed while the people cross.", "Their stillness shows that God's presence is holding the path open until everyone is safe."];
    lead = "?? The open way is held steady by God's presence.";
    support = ["?? The ark remains central", "?? The people cross safely", "?? God keeps the path open"];
  } else if (/ark of the covenant of the lord/.test(lower) && section.reference === "Joshua 3:17") {
    opening = ["The ark marks the LORD's covenant presence in the center of the crossing.", "Israel is not crossing because the priests are powerful, but because God is with His people."];
    lead = "?? The crossing is centered on God's covenant presence.";
    support = ["?? The LORD stands at the center", "?? The river obeys Him", "?? Israel follows His presence"];
  } else if (/in the midst of jordan/.test(lower)) {
    opening = ["The priests stand in the middle of the river, not on the safer edges.", "The place that should stop Israel becomes the place where God holds them secure."];
    lead = "??? God meets His people in the middle of the obstacle.";
    support = ["?? The barrier becomes a pathway", "?? The ark stands in the center", "?? Israel passes through"];
  } else if (/all the israelites passed over/.test(lower)) {
    opening = ["The whole nation crosses, not only leaders or soldiers.", "The phrase shows that the LORD is bringing the entire covenant people through."];
    lead = "?? God's deliverance reaches all His people together.";
    support = ["?? No tribe is left behind", "?? God's presence remains with them", "??? The promise is shared"];
  } else if (/passed clean over jordan/.test(lower)) {
    opening = ["Clean over means the crossing is completed safely from one side to the other.", "The people do not merely begin the miracle; they finish the passage."];
    lead = "? The crossing ends in complete safe passage.";
    support = ["?? The barrier is fully overcome", "??? The people reach the other side", "?? God proves faithful to the end"];
  }
  const categoryLead = section.chapter === 2
    ? "🪟 Rahab's faith and Israel's coming victory meet in this moment."
    : section.chapter === 3
      ? "🌊 The Jordan crossing is being shaped by God's presence."
      : "💪 Joshua's leadership is being established under God's word.";
  const categorySupport = section.chapter === 2
    ? ["👂 Jericho has heard what God has done", "🏠 Mercy can reach a household", "🧵 Faith will receive a visible sign"]
    : section.chapter === 3
      ? ["📦 The ark leads the way", "👥 Israel must follow in order", "🙌 The living God makes the path"]
      : ["📜 God's word directs the mission", "👥 Israel must move together", "🏞️ The promise is ahead"];

  return note([
    opening[0],
    opening[1],
    lead === "➡️ The story is moving forward under God's word." ? categoryLead : lead,
    ...(lead === "➡️ The story is moving forward under God's word." ? categorySupport : support),
  ]);
}

function explainDay57JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const cleanSectionTitle = stripLeadingEmoji(section.title || "");
  let opening: string[] = ["This line belongs to Israel's entry into the land after the Jordan crossing.", "The chapter is teaching memory, holiness, obedience, judgment, or victory in a concrete way."];
  let lead = section.chapter === 4
    ? "🪨 Israel is being taught to remember what God has done."
    : section.chapter === 5
      ? "✨ Israel is being prepared to live in the land as God's people."
      : section.chapter === 6
        ? "📣 Jericho falls only by the LORD's command."
        : "🚨 Hidden sin is bringing trouble into the camp.";
  let support = section.chapter === 4
    ? ["🌊 Jordan has just been crossed", "👨‍👩‍👧 Future generations must be taught", "🙌 God's work must be remembered"]
    : section.chapter === 5
      ? ["👥 The people are being set apart", "🏞️ Life in the land is beginning", "👑 The LORD is preparing them"]
      : section.chapter === 6
        ? ["🏰 Jericho stands under God's word", "👥 Israel must obey exactly", "🙌 Victory belongs to the LORD"]
        : ["💔 Defeat has exposed a deeper problem", "📜 God's covenant has been violated", "🔥 Sin must be dealt with"];

  if (/the lord magnified joshua/.test(lower) && section.reference === "Joshua 4:14") {
    opening = ["The LORD raises Joshua's standing before the whole nation at the Jordan.", "The miracle confirms that Moses' successor truly carries God's authority."];
  } else if (/encamped in gilgal/.test(lower) && /children of israel/.test(lower)) {
    opening = ["Israel is settled at Gilgal as a real camp inside the promised land.", "The phrase marks the shift from wandering in the wilderness to living in Canaan."];
  } else if (/those twelve stones/.test(lower) && cleanSectionTitle === "Those Twelve Stones") {
    opening = ["These stones are kept so later generations can see and ask what happened here.", "The memorial turns one crossing day into an ongoing lesson for Israel."];
  } else if (/the lord your god dried up the waters of jordan/.test(lower) && section.reference === "Joshua 4:20-24") {
    opening = ["The stones are explained by pointing straight back to what God did at the river.", "The memorial teaches children that the crossing happened because the LORD stopped the waters."];
  } else if (/the lord had dried up the waters of jordan/.test(lower)) {
    opening = ["The kings of Canaan hear that the LORD dried up Jordan for Israel.", "The phrase shows the miracle becoming public news among Israel's enemies."];
  } else if (/people shouted when the priests blew with the trumpets/.test(lower)) {
    opening = ["The shout and the trumpet blast happen together at the commanded moment.", "The phrase ties Jericho's collapse to exact obedience, not human noise alone."];
  } else if (/israel hath sinned/.test(lower) && section.reference === "Joshua 7:10-15") {
    opening = ["The LORD begins the search for the guilty man by naming Israel's sin plainly.", "The phrase shows that the camp's trouble starts with moral guilt, not bad tactics."];
  } else if (/transgressed my covenant/.test(lower) && section.reference === "Joshua 7:10-15") {
    opening = ["Transgressed means crossing over a line God had clearly set.", "The phrase explains Achan's theft as broken covenant loyalty, not a private mistake only."];
  } else if (/taken of the accursed thing/.test(lower) && section.reference === "Joshua 7:10-15") {
    opening = ["The accursed thing was spoil God had banned from private use.", "The phrase shows exactly why Achan's hidden taking polluted the whole camp."];
  } else if (/clean passed over jordan/.test(lower)) {
    opening = ["Clean passed over means the crossing was fully completed from one side to the other.", "The wording stresses completion, not a half-finished rescue."];
  } else if (/when all the people were clean passed over/.test(lower)) {
    opening = ["The whole nation has now finished crossing the river safely.", "The phrase marks the moment when Israel stands complete on the promised-land side."];
  } else if (/the lord spake unto joshua/.test(lower) && section.reference === "Joshua 4:1-3") {
    opening = ["The LORD speaks again after the crossing because the miracle still needs to be remembered rightly.", "God not only opens the river, but also tells Israel how to preserve the memory of it."];
  } else if (/the lord spake unto joshua/.test(lower) && section.reference === "Joshua 4:15-18") {
    opening = ["The LORD speaks again to close the Jordan crossing in an ordered way.", "The same God who opened the river now decides when the miracle ends."];
  } else if (/take you twelve men out of the people/.test(lower)) {
    opening = ["Twelve men are chosen so the memorial will represent all twelve tribes of Israel.", "The sign is meant to belong to the whole nation, not one small group."];
  } else if (/out of every tribe a man/.test(lower)) {
    opening = ["One man from each tribe means every tribe shares in the memorial work.", "The crossing is not one tribe's story, but Israel's story together."];
  } else if (/take you hence out of the midst of jordan/.test(lower)) {
    opening = ["The stones are to be taken from the middle of the riverbed itself.", "That detail ties the memorial directly to the place where God opened the way."];
  } else if (/carry them over with you/.test(lower)) {
    opening = ["The stones are carried out of Jordan and taken into Israel's camp.", "Memory is meant to travel with the people into ordinary life."];
  } else if (/joshua called the twelve men/.test(lower)) {
    opening = ["Joshua personally calls the twelve chosen men because the memorial must be deliberately carried out.", "The sign will not happen by accident or vague remembrance."];
  } else if (/take you up every man of you a stone/.test(lower)) {
    opening = ["Each man takes one stone as a visible piece of the miracle.", "The act turns the crossing into something that can later be pointed to and explained."];
  } else if (/when your children ask their fathers/.test(lower)) {
    opening = ["The wording assumes children will see the memorial and ask what it means.", "God wants His works explained across generations, not silently admired."];
  } else if (/when your children shall ask their fathers in time to come/.test(lower)) {
    opening = ["The memorial is built with future questions already in mind.", "God wants parents to explain the miracle when children ask about the stones later."];
  } else if (/when your children shall ask/.test(lower)) {
    opening = ["Children are expected to ask what the stones mean.", "The phrase shows that remembering God's works should lead to teaching the next generation."];
  } else if (/that this may be a sign among you/.test(lower)) {
    opening = ["A sign is something visible that points beyond itself to a larger meaning.", "The stones are not decoration; they are teaching tools."];
  } else if (/did so as joshua commanded/.test(lower)) {
    opening = ["The people obey Joshua's instruction exactly.", "Their obedience turns God's command about memory into a real national practice."];
  } else if (/took up twelve stones out of the midst of jordan/.test(lower)) {
    opening = ["The stones are lifted from the very spot where the river had been stopped.", "The memorial is physically tied to the miracle."];
  } else if (/priests which bare the ark stood in the midst of jordan/.test(lower)) {
    opening = ["The priests remain in the middle of the riverbed while the work is being finished.", "God's presence stays at the center until the whole crossing and memorial task are complete."];
  } else if (/until every thing was finished/.test(lower)) {
    opening = ["The phrase emphasizes that the work connected to the crossing is carried through to completion.", "God does not bring Israel halfway and leave the rest uncertain."];
  } else if (/the ark of the lord passed over/.test(lower)) {
    opening = ["The ark passing over keeps the crossing centered on God's covenant presence.", "The people do not simply move on their own; they move under the LORD's lead."];
  } else if (/passed over armed/.test(lower)) {
    opening = ["The eastern tribes cross armed because they are keeping their promise to help their brothers.", "Rest already received does not excuse them from covenant responsibility."];
  } else if (/about forty thousand prepared for war/.test(lower)) {
    opening = ["The number makes the reader feel the scale of the armed help being given.", "The crossing is not only symbolic; Israel is entering the land ready for battle."];
  } else if (/the lord magnified joshua/.test(lower)) {
    opening = ["Magnified Joshua means the LORD publicly established his authority before the people.", "The new leader is being confirmed by God's action, not by self-assertion."];
  } else if (/command the priests that bear the ark of the testimony/.test(lower)) {
    opening = ["The ark of the testimony is the ark connected to God's covenant witness among His people.", "Joshua is told to direct the priests because the miracle is now drawing to its close."];
  } else if (/come ye up out of jordan/.test(lower)) {
    opening = ["The command brings the priests and ark up out of the riverbed after the crossing is complete.", "What God opened for Israel is now being closed again."];
  } else if (/waters of jordan returned unto their place/.test(lower)) {
    opening = ["The river returns to its normal flow once the priests come up.", "The miracle is shown to be real and temporary, not a permanent change in the river."];
  } else if (/the people came up out of jordan/.test(lower)) {
    opening = ["The people come up out of the river and stand on the promised-land side.", "The long-awaited crossing is now behind them."];
  } else if (/tenth day of the first month/.test(lower)) {
    opening = ["The date anchors the crossing in Israel's calendar, not in vague memory.", "God's acts happen in real history and are meant to be remembered that way."];
  } else if (/encamped in gilgal/.test(lower)) {
    opening = ["Gilgal becomes Israel's first camp in the land after crossing Jordan.", "It will be a place of memory, preparation, and covenant identity."];
  } else if (/those twelve stones/.test(lower)) {
    opening = ["The twelve stones stand for the twelve tribes and keep the Jordan crossing visible.", "They are meant to turn memory into teaching."];
  } else if (/israel came over this jordan on dry land/.test(lower)) {
    opening = ["The explanation given to children points straight to the miracle itself.", "Dry land means the LORD made a safe path where water should have stopped them."];
  } else if (/dried up the waters of jordan/.test(lower)) {
    opening = ["The LORD dried up Jordan the way He once dried up the Red Sea.", "The phrase connects this crossing to the older exodus pattern of deliverance."];
  } else if (/all the people of the earth might know the hand of the lord/.test(lower)) {
    opening = ["The miracle is not only for Israel's private comfort.", "God intends the nations to know His power through what He has done."];
  } else if (/all the people of the earth might know/.test(lower)) {
    opening = ["God wants the Jordan crossing known beyond Israel itself.", "The phrase turns one national miracle into a witness to the nations."];
  } else if (/fear the lord your god for ever/.test(lower)) {
    opening = ["Fear here means reverence that lasts, not a brief moment of alarm.", "The stones are meant to keep Israel honoring the LORD long after the crossing day ends."];
  } else if (/make thee sharp knives/.test(lower)) {
    opening = ["Sharp knives are needed because Joshua is being told to circumcise the people.", "The command is physical and covenantal at the same time."];
  } else if (/circumcise again the children of israel the second time/.test(lower)) {
    opening = ["The second time means a new generation is now being circumcised after the wilderness years.", "Israel must bear the covenant sign before moving forward in the land."];
  } else if (/all the people that came out of egypt/.test(lower)) {
    opening = ["The phrase points back to the older exodus generation.", "Joshua is explaining why a covenant sign needs to be renewed among the people now alive."];
  } else if (/their children, whom he raised up in their stead/.test(lower)) {
    opening = ["A new generation has been raised up in place of the one that died in the wilderness.", "The land is being entered by children who must now receive the covenant sign for themselves."];
  } else if (/abode in their places in the camp/.test(lower)) {
    opening = ["The people remain in camp while their bodies recover after circumcision.", "Obedience sometimes requires stopping and waiting before moving on."];
  } else if (/till they were whole/.test(lower)) {
    opening = ["Whole means healed or recovered.", "The phrase reminds the reader that covenant obedience touches the body as well as the heart."];
  } else if (/rolled away the reproach of egypt/.test(lower)) {
    opening = ["Reproach means disgrace or shame.", "God is declaring that an old mark of humiliation has now been removed from His people."];
  } else if (/name of the place is called gilgal/.test(lower)) {
    opening = ["Gilgal is tied to the idea of rolling away, matching the statement God has just made.", "The place name becomes a memory of what the LORD removed."];
  } else if (/children of israel encamped in gilgal/.test(lower)) {
    opening = ["Israel is now settled in camp inside the land at Gilgal.", "The first camp in Canaan becomes a place where covenant life begins again."];
  } else if (/did eat of the old corn of the land/.test(lower)) {
    opening = ["Old corn means produce already in the land, not manna from the wilderness.", "The people are beginning to live from Canaan's provision."];
  } else if (/the manna ceased/.test(lower)) {
    opening = ["The manna stops because the wilderness season of feeding has ended.", "Israel is now being sustained by the fruit of the promised land."];
  } else if (/did eat of the fruit of the land of canaan/.test(lower)) {
    opening = ["The people are eating the produce of the land itself.", "The promise is becoming ordinary life, meal by meal."];
  } else if (/joshua lifted up his eyes and looked/.test(lower)) {
    opening = ["Joshua suddenly sees someone standing before him near Jericho.", "The scene interrupts ordinary preparation with a holy confrontation."];
  } else if (/their heart melted/.test(lower)) {
    opening = ["Their heart melted means courage drained away inside the Canaanite kings.", "The phrase describes fear so deep that their confidence collapses."];
  } else if (/from before the children of israel/.test(lower)) {
    opening = ["The kings lose courage because Israel is coming toward them under the LORD's help.", "The phrase keeps the fear tied to God's people as the nation He is leading."];
  } else if (/neither was there spirit in them any more/.test(lower)) {
    opening = ["Spirit here means inner strength or resolve.", "The phrase says the nations no longer have the courage to stand firm."];
  } else if (/loose thy shoe from off thy foot/.test(lower)) {
    opening = ["Joshua is told to remove his shoe as an act of reverence on holy ground.", "The command teaches him to approach God's presence with humility."];
  } else if (/the place whereon thou standest is holy/.test(lower)) {
    opening = ["Holy ground is ground made holy by God's presence there.", "The place matters because the LORD has come near, not because the soil is special by itself."];
  } else if (/sword drawn in his hand/.test(lower)) {
    opening = ["A drawn sword means readiness for battle.", "The figure Joshua sees is not casual or harmless, but comes with active authority."];
  } else if (/art thou for us, or for our adversaries/.test(lower)) {
    opening = ["Joshua asks whether the figure stands on Israel's side or against them.", "The question shows Joshua is trying to understand the encounter in battle terms."];
  } else if (/captain of the host of the lord am i now come/.test(lower)) {
    opening = ["The captain of the LORD's host is the commander of the LORD's army.", "Joshua is being reminded that he is not the highest authority in this battle."];
  } else if (/the captain of the lord's host/.test(lower)) {
    opening = ["The title names the speaker as commander over the LORD's army.", "Joshua is meeting the One under whom Israel's battles must be fought."];
  } else if (/jericho was straitly shut up/.test(lower)) {
    opening = ["Jericho is shut up tightly because the city is afraid of Israel.", "The wording pictures a fortress in defensive lockdown."];
  } else if (/none went out, and none came in/.test(lower)) {
    opening = ["The city is sealed in both directions.", "No one is moving freely because Jericho knows danger has arrived."];
  } else if (/i have given into thine hand jericho/.test(lower)) {
    opening = ["God speaks of Jericho as already given before the battle plan is carried out.", "The victory is presented first as divine gift, then as military event."];
  } else if (/and the king thereof/.test(lower)) {
    opening = ["The king of Jericho is included in what God says He has given into Joshua's hand.", "The city's leadership is not outside the LORD's judgment."];
  } else if (/mighty men of valour/.test(lower)) {
    opening = ["Mighty men of valour means Jericho's strong fighting men.", "Even the city's military strength is included under God's verdict."];
  } else if (/ye shall compass the city/.test(lower)) {
    opening = ["Compass the city means march around it in a circle.", "The command is unusual on purpose and forces Israel to win by obedience, not normal siege skill."];
  } else if (/all ye men of war/.test(lower)) {
    opening = ["The fighting men are included in the strange marching command.", "Even soldiers must submit to God's way of winning, not merely their own instincts."];
  } else if (/seven priests shall bear before the ark seven trumpets/.test(lower)) {
    opening = ["The repeated sevens make the march feel ordered, sacred, and deliberate.", "Priests and trumpets show that this battle plan is liturgical as well as military."];
  } else if (/all the people shall shout/.test(lower)) {
    opening = ["The people are told to shout only at the appointed moment.", "Their final cry will be part of obedience to God's command, not a random burst of noise."];
  } else if (/take up the ark of the covenant/.test(lower) && section.reference === "Joshua 6:6-11") {
    opening = ["The ark must go into the march because God's presence stands at the center of the battle.", "Jericho will fall under the LORD's rule, not Israel's swagger."];
  } else if (/seven priests bear seven trumpets/.test(lower)) {
    opening = ["The priests lead with trumpets before the ark.", "The city is being confronted by a holy procession, not a standard attack formation."];
  } else if (/compass the city/.test(lower) && section.reference === "Joshua 6:6-11") {
    opening = ["The march around Jericho begins exactly as commanded.", "Israel is learning to trust God's plan even when it looks strange."];
  } else if (/ye shall not shout, nor make any noise/.test(lower)) {
    opening = ["Silence is commanded until the right moment arrives.", "The people must restrain themselves instead of acting on excitement or impatience."];
  } else if (/until the day i bid you shout/.test(lower)) {
    opening = ["Joshua sets the shout under command and timing.", "Victory will come through waiting for God's appointed moment, not grabbing the moment early."];
  } else if (/joshua rose early in the morning/.test(lower) && section.reference === "Joshua 6:12-16") {
    opening = ["Joshua rises early again because sustained obedience is required day after day.", "The march around Jericho is not one dramatic burst, but repeated faithfulness."];
  } else if (/compassed the city after the same manner seven times/.test(lower)) {
    opening = ["On the seventh day the city is circled seven times instead of once.", "The repeated action builds toward the moment God has appointed."];
  } else if (/priests blew with the trumpets/.test(lower)) {
    opening = ["The trumpets sound as part of the holy march around Jericho.", "The battle scene is still being governed by God's ritual order."];
  } else if (/shout; for the lord hath given you the city/.test(lower)) {
    opening = ["Joshua finally commands the shout because the decisive moment has come.", "He ties the cry directly to the LORD's gift of the city."];
  } else if (/city shall be accursed/.test(lower)) {
    opening = ["Accursed here means devoted to destruction under God's judgment.", "Jericho is not ordinary spoil to be enjoyed after victory."];
  } else if (/only rahab the harlot shall live/.test(lower)) {
    opening = ["Rahab is singled out for life in the middle of a condemned city.", "The phrase makes mercy stand out sharply against judgment."];
  } else if (/because she hid the messengers/.test(lower)) {
    opening = ["Rahab's earlier act of faith is remembered at the moment of Jericho's fall.", "Her protection of the spies is treated as meaningful and not forgotten."];
  } else if (/keep yourselves from the accursed thing/.test(lower)) {
    opening = ["Israel is warned to stay away from what God has devoted to destruction.", "Victory does not erase the need for careful obedience."];
  } else if (/silver, and the gold/.test(lower)) {
    opening = ["The silver and gold are not to become private plunder.", "These valuables are set apart for the LORD rather than for personal greed."];
  } else if (/people shouted when the priests blew/.test(lower)) {
    opening = ["The shout happens at the exact moment God had ordered.", "The fall of Jericho is tied to obedient timing, not random excitement."];
  } else if (/wall fell down flat/.test(lower)) {
    opening = ["The wall falls down flat so the people can go straight in.", "The phrase makes the miracle feel sudden, complete, and unmistakable."];
  } else if (/people went up into the city/.test(lower)) {
    opening = ["Once the wall falls, Israel goes up into the city in front of them.", "The path into Jericho is opened by God's act before it is occupied by the people."];
  } else if (/utterly destroyed all that was in the city/.test(lower)) {
    opening = ["Utterly destroyed means Jericho is placed fully under the judgment God had declared.", "The victory is severe because the city stood under the ban."];
  } else if (/go into the harlot's house/.test(lower)) {
    opening = ["Joshua sends the men into Rahab's house because mercy must now be carried out as promised.", "The house marked by faith is remembered inside the city's destruction."];
  } else if (/bring out thence the woman/.test(lower)) {
    opening = ["Rahab and all that belongs to her are brought out before the city is destroyed.", "Mercy is not left vague; it is acted on concretely."];
  } else if (/joshua saved rahab the harlot alive/.test(lower)) {
    opening = ["Rahab is explicitly said to be saved alive.", "The phrase underlines that faith truly found mercy in a day of judgment."];
  } else if (/dwelleth in israel even unto this day/.test(lower)) {
    opening = ["Rahab's rescue is not momentary survival only.", "She comes to live among Israel, showing lasting mercy and belonging."];
  } else if (/cursed be the man before the lord/.test(lower)) {
    opening = ["Joshua places a curse on rebuilding Jericho as though nothing holy had happened there.", "The warning protects memory by attaching judgment to careless rebuilding."];
  } else if (/lay the foundation thereof in his firstborn/.test(lower)) {
    opening = ["The curse speaks of devastating loss attached to rebuilding the city.", "The wording makes clear that defying this warning would come at terrible cost."];
  } else if (/youngest son shall he set up the gates/.test(lower)) {
    opening = ["The curse reaches from beginning to end of the building project.", "It turns the whole rebuilding into a picture of tragic cost."];
  } else if (/fame was noised throughout all the country/.test(lower)) {
    opening = ["News about Joshua spreads because Jericho's fall has made his leadership publicly visible.", "The phrase shows that God's act at Jericho cannot stay hidden."];
  } else if (/joshua sent men from jericho to ai/.test(lower)) {
    opening = ["After Jericho, Joshua sends spies toward Ai to assess the next target.", "The movement from one victory to the next looks ordinary until trouble appears."];
  } else if (/view the country/.test(lower)) {
    opening = ["The men are told to inspect the land around Ai before the attack.", "The phrase sounds practical and reasonable, which makes the coming failure more striking."];
  } else if (/let not all the people go up/.test(lower)) {
    opening = ["The advice sounds efficient: send only part of the force because Ai looks small.", "The phrase reveals human confidence before the hidden sin is exposed."];
  } else if (/hearts of the people melted, and became as water/.test(lower)) {
    opening = ["Israel's courage collapses after the defeat at Ai.", "The phrase mirrors the fear once felt by Canaanites, but now inside Israel's camp."];
  } else if (/joshua rent his clothes/.test(lower)) {
    opening = ["Joshua tears his clothes as a sign of grief, shock, and humiliation before God.", "The leader does not shrug off the defeat; he breaks before the LORD."];
  } else if (/fell to the earth upon his face before the ark/.test(lower)) {
    opening = ["Joshua falls before the ark because the defeat must be brought before God's presence.", "His posture shows desperation, not strategy."];
  } else if (/alas, o lord god/.test(lower)) {
    opening = ["Joshua cries out in distress because the defeat has shattered expectations.", "The phrase lets the reader hear the leader's pain before the cause is explained."];
  } else if (/what shall i say, when israel turneth their backs/.test(lower)) {
    opening = ["Joshua is asking what can be said now that Israel has fled before its enemies.", "The defeat feels publicly humiliating and spiritually confusing."];
  } else if (/israel hath sinned/.test(lower)) {
    opening = ["God names sin, not military weakness, as the real problem at Ai.", "The phrase shifts the whole scene from tactics to covenant guilt."];
  } else if (/in the sight of all israel/.test(lower)) {
    opening = ["The whole nation sees Joshua honored before their eyes.", "The phrase stresses that his authority is being confirmed publicly, not privately."];
  } else if (/they feared him/.test(lower)) {
    opening = ["They feared him means Israel treated Joshua with reverent respect.", "The phrase describes received authority, not worship of the man himself."];
  } else if (/as they feared moses/.test(lower)) {
    opening = ["Israel now regards Joshua with the same reverent seriousness they had shown Moses.", "The phrase highlights continuity in leadership after Moses' death."];
  } else if (/transgressed my covenant/.test(lower)) {
    opening = ["The sin is described as crossing a covenant boundary God had set.", "Taking the devoted things was not a small mistake, but broken loyalty."];
  } else if (/taken of the accursed thing/.test(lower)) {
    opening = ["Someone has taken what God had placed under the ban.", "The hidden theft has polluted the victory that came before it."];
  } else if (/could not stand before their enemies/.test(lower)) {
    opening = ["Israel cannot stand because God's favor is not being presumed while sin is hidden.", "The phrase explains the military collapse through covenant reality."];
  } else if (/sanctify the people/.test(lower)) {
    opening = ["The people must be set apart because the camp is about to be searched under God's gaze.", "Holiness is required before the guilty thing can be exposed."];
  } else if (/there is an accursed thing in the midst of thee/.test(lower)) {
    opening = ["God says the accursed thing is in Israel's midst, not far away.", "The problem is inside the covenant community itself."];
  } else if (/in the morning therefore ye shall be brought according to your tribes/.test(lower)) {
    opening = ["The search for guilt will move in ordered stages through the nation.", "The phrase shows judgment narrowing step by step under God's direction."];
  } else if (/taken with the accursed thing shall be burnt with fire/.test(lower)) {
    opening = ["The punishment is severe because the sin has brought holy trouble into the camp.", "The phrase shows how seriously God treats what was devoted to Him."];
  } else if (/joshua rose up early in the morning/.test(lower) && section.reference === "Joshua 7:16-18") {
    opening = ["Joshua rises early because the matter cannot be delayed once God has spoken.", "The search for the guilty man begins with solemn urgency."];
  } else if (/brought israel by their tribes/.test(lower)) {
    opening = ["The nation is brought forward tribe by tribe under God's searching judgment.", "The process makes the exposure of sin public and unavoidable."];
  } else if (/brought the family of judah/.test(lower)) {
    opening = ["The search narrows from tribe to family.", "The phrase increases the tension as judgment moves closer to the guilty man."];
  } else if (/achan.*was taken/.test(lower)) {
    opening = ["Achan is finally identified as the guilty man.", "The hidden sin that troubled the whole nation is now brought fully into the open."];
  } else if (/give, i pray thee, glory to the lord god of israel/.test(lower)) {
    opening = ["Joshua tells Achan to glorify God by telling the truth.", "Confession here means openly agreeing with God's judgment rather than hiding further."];
  } else if (/make confession unto him/.test(lower)) {
    opening = ["Achan is commanded to confess plainly before God.", "The phrase shows that the way forward begins with truth, not excuses."];
  } else if (/goodly babylonish garment/.test(lower)) {
    opening = ["A Babylonish garment is a beautiful imported robe taken from the spoil.", "Achan's desire fastened onto something attractive that God had forbidden."];
  } else if (/two hundred shekels of silver/.test(lower)) {
    opening = ["The silver is named because greed is being exposed in concrete detail.", "The confession shows that temptation often has a measurable object."];
  } else if (/wedge of gold of fifty shekels weight/.test(lower)) {
    opening = ["The wedge of gold makes the stolen treasure feel heavy, valuable, and real.", "Achan is not confessing vague desire, but specific coveted wealth."];
  } else if (/hid in the earth in the midst of my tent/.test(lower)) {
    opening = ["The stolen things were buried in the earth beneath Achan's tent.", "The phrase shows how hidden sin is deliberately concealed close to home."];
  } else if (/joshua sent messengers/.test(lower)) {
    opening = ["Joshua sends messengers to verify Achan's confession.", "The truth is not left as words only; the hidden objects are sought out."];
  } else if (/ran unto the tent/.test(lower)) {
    opening = ["The messengers run because the matter is urgent and weighty.", "The pace of the search shows how serious the camp's defilement is."];
  } else if (/took them out of the midst of the tent/.test(lower)) {
    opening = ["The hidden spoil is physically taken out where it can no longer remain concealed.", "What was buried in secret is now exposed in public."];
  } else if (/laid them out before the lord/.test(lower)) {
    opening = ["The stolen items are laid out before the LORD because the sin must be fully uncovered in His presence.", "The phrase turns hidden loot into open evidence."];
  } else if (/neither will i be with you any more/.test(lower)) {
    opening = ["God warns that His help cannot be treated as automatic while the sin remains protected.", "The phrase makes clear that holy presence and tolerated rebellion do not live together."];
  } else if (/burnt with fire/.test(lower)) {
    opening = ["Burnt with fire describes severe judgment on the one found guilty.", "The phrase shows how seriously God treats what was stolen from the devoted spoil."];
  } else if (/all israel with him/.test(lower)) {
    opening = ["All Israel is involved because the trouble touched the whole camp.", "The nation's corporate involvement matches the corporate damage the sin caused."];
  } else if (/raised over him a great heap of stones/.test(lower)) {
    opening = ["The heap of stones becomes a lasting marker of judgment.", "The place itself is made to remember what hidden sin did."];
  } else if (/valley of achor/.test(lower)) {
    opening = ["Achor sounds like trouble, matching what the place now represents.", "The name turns the location into a memory of the sin's consequences."];
  } else if (/the lord turned from the fierceness of his anger/.test(lower)) {
    opening = ["God's anger turns away only after the sin has been exposed and judged.", "The phrase shows that restored favor follows dealt-with guilt, not ignored guilt."];
  } else if (/took up twelve stones/.test(lower) && section.reference === "Joshua 4:8-13") {
    opening = ["The twelve stones are lifted as a memorial for all twelve tribes.", "The act gives Israel something visible to point to after the crossing is over."];
  } else if (/carried them over with them/.test(lower)) {
    opening = ["The stones are carried across with the people instead of left behind in the river.", "Memory is meant to travel into the camp, not stay at the miracle site only."];
  } else if (/the ark of the covenant of the lord stood/.test(lower)) {
    opening = ["The ark remains standing in Jordan while the crossing finishes.", "God's covenant presence stays at the center until every task is done."];
  } else if (/the children of reuben and the children of gad/.test(lower)) {
    opening = ["These eastern tribes cross ahead armed because they are keeping their promise to help Israel fight.", "Receiving land already has not freed them from helping their brothers."];
  }

  return note([
    opening[0],
    opening[1],
    lead,
    ...support,
  ]);
}

const day58JoshuaExplanationLines: Record<string, [string, string]> = {
  "Joshua 8:1-2::Fear Not, Neither Be Thou Dismayed": ["Dismayed means discouraged or crushed in spirit after a setback.", "God tells Joshua not to carry Ai like an unfinished wound after Achan's sin."],
  "Joshua 8:1-2::Take All The People Of War With Thee": ["Joshua is told to bring the fighting force with him to Ai.", "The command shows this return to battle is public and full, not hesitant."],
  "Joshua 8:1-2::Arise, Go Up To Ai": ["Arise means Joshua must move forward again instead of staying frozen by the last defeat.", "Ai is the same place where Israel recently fell, so the command restores action after shame."],
  "Joshua 8:1-2::I Have Given Into Thy Hand The King Of Ai": ["God speaks of victory as already granted before the battle begins.", "The king himself is included, showing Ai's power is already under the LORD's verdict."],
  "Joshua 8:1-2::Only The Spoil Thereof": ["Spoil means the goods taken after a military victory.", "Unlike Jericho, Ai's spoil is permitted, so the reader can see the difference between the two cities."],
  "Joshua 8:1-2::Lay Thee An Ambush For The City Behind It": ["An ambush is a hidden group waiting to strike by surprise.", "God's plan for Ai includes concealment and timing, not a direct march only."],
  "Joshua 8:3-8::Joshua Chose Out Thirty Thousand Mighty Men Of Valour": ["Mighty men of valour means seasoned, capable fighting men.", "Joshua selects a strong force because the plan requires disciplined execution."],
  "Joshua 8:3-8::Sent Them Away By Night": ["Moving by night keeps the ambush hidden from Ai.", "Darkness becomes part of Joshua's battle strategy under God's direction."],
  "Joshua 8:3-8::Lie Ye In Wait Against The City": ["To lie in wait means to stay hidden until the right moment to attack.", "The phrase describes patience under orders, not rushing ahead."],
  "Joshua 8:3-8::Go Not Very Far From The City": ["The hidden force must stay close enough to act quickly.", "Distance matters because the trap depends on exact timing."],
  "Joshua 8:3-8::I And All The People That Are With Me": ["Joshua distinguishes the visible group from the hidden ambush force.", "The phrase helps the reader follow the split in Israel's movements."],
  "Joshua 8:3-8::They Will Come Out After Us": ["Joshua expects Ai to chase Israel as before.", "The enemy's confidence is being used against them."],
  "Joshua 8:3-8::Ye Shall Rise Up From The Ambush": ["The hidden men must wait until Joshua's signal before moving.", "Rise up here means stepping out of concealment into action at the planned moment."],
  "Joshua 8:9-9::Joshua Sent Them Forth": ["Joshua sends the ambush party out to the assigned place.", "The phrase shows the plan leaving the stage of command and becoming action."],
  "Joshua 8:9-9::They Went To Lie In Ambush": ["The men take up their hidden position for the attack.", "Their task is to stay unseen until Ai has been drawn away."],
  "Joshua 8:9-9::Between Bethel And Ai": ["The location matters because it sits near the city while still allowing concealment.", "The ambush is not random; it is carefully placed between known landmarks."],
  "Joshua 8:9-9::Joshua Lodged That Night Among The People": ["Joshua stays among the people instead of separating himself from them.", "The leader remains present with the army on the night before battle."],
  "Joshua 8:10-15::Joshua Rose Up Early In The Morning": ["Rising early shows Joshua moving quickly into the plan he has received.", "The battle at Ai begins with readiness, not delay."],
  "Joshua 8:10-15::Numbered The People": ["Numbered means Joshua reviewed or arranged the fighting men for battle.", "The phrase shows ordered preparation instead of disorderly movement."],
  "Joshua 8:10-15::There Was A Valley Between Them And Ai": ["The valley creates visible space between Israel and the city.", "That terrain detail helps the trap make sense in the reader's mind."],
  "Joshua 8:10-15::When The King Of Ai Saw It": ["The king reacts to what he sees in front of the city.", "The phrase reminds the reader that appearances are steering Ai into the trap."],
  "Joshua 8:10-15::They Fled By The Way Of The Wilderness": ["Israel's flight is deliberate, not panic.", "The retreat toward the wilderness is part of drawing Ai out from its defenses."],
  "Joshua 8:16-17::All The People That Were In Ai Were Called Together": ["Ai gathers its people for pursuit instead of staying inside the city.", "The phrase shows the whole town being pulled into the chase."],
  "Joshua 8:16-17::They Pursued After Joshua": ["Ai thinks it is chasing a defeated enemy again.", "The phrase shows the city moving exactly where Joshua wanted."],
  "Joshua 8:16-17::There Was Not A Man Left In Ai Or Bethel": ["The wording stresses how completely the cities emptied out for pursuit.", "No defenders remain behind to guard what is about to be taken."],
  "Joshua 8:16-17::They Left The City Open": ["Open means vulnerable and unguarded.", "The city becomes exposed because its people ran out after Israel."],
  "Joshua 8:18-23::Stretch Out The Spear That Is In Thy Hand Toward Ai": ["The spear becomes Joshua's visible signal in the battle.", "God ties the next movement of the attack to Joshua's raised hand."],
  "Joshua 8:18-23::I Will Give It Into Thine Hand": ["Into thine hand means into Joshua's power and control.", "The city is taken because God hands it over, not because the plan works by itself."],
  "Joshua 8:18-23::They Entered Into The City, And Took It": ["The hidden men move in once the city has been emptied.", "The phrase marks the success of the ambush."],
  "Joshua 8:18-23::The King Of Ai They Took Alive": ["The king is captured alive instead of being killed immediately.", "That detail prepares for his later public judgment."],
  "Joshua 8:24-29::Joshua Drew Not His Hand Back": ["Joshua keeps the spear stretched out without lowering it.", "The posture continues until the battle is fully finished."],
  "Joshua 8:24-29::Until He Had Utterly Destroyed": ["Utterly destroyed means the judgment on Ai is carried through completely.", "The phrase emphasizes total completion, not partial victory."],
  "Joshua 8:24-29::Only The Cattle And The Spoil Of That City": ["Ai's animals and goods are kept as lawful spoil for Israel.", "The exception matters because Jericho's devoted things had been different."],
  "Joshua 8:24-29::The King Of Ai He Hanged On A Tree": ["The king's body is displayed as a public sign of judgment.", "The phrase shows that Ai's ruler falls under the same defeat as his city."],
  "Joshua 8:30-32::Joshua Built An Altar Unto The LORD God Of Israel": ["An altar is a place for sacrifice and worship before God.", "After battle, Joshua leads Israel to worship instead of only celebrating conquest."],
  "Joshua 8:30-32::In Mount Ebal": ["Mount Ebal is the mountain named in Moses' instructions for this covenant ceremony.", "The location ties Joshua's actions back to earlier law."],
  "Joshua 8:30-32::An Altar Of Whole Stones": ["Whole stones are stones not shaped by human tools.", "The altar must match God's instruction instead of human artistry."],
  "Joshua 8:30-32::Wrote There Upon The Stones A Copy Of The Law Of Moses": ["Joshua writes the law publicly so the covenant is visible and remembered.", "The phrase joins land conquest with continued submission to God's word."],
  "Joshua 8:33-35::All Israel, And Their Elders": ["The covenant gathering includes the whole people with their leaders.", "This is not a private ceremony for Joshua alone."],
  "Joshua 8:33-35::Half Of Them Over Against Mount Gerizim": ["Israel stands divided across the two mountains as Moses had commanded.", "The arrangement fits the covenant blessings and curses ceremony."],
  "Joshua 8:33-35::As Well The Stranger, As He That Was Born Among Them": ["The stranger is the foreigner living among Israel.", "The phrase shows covenant hearing extending beyond native-born Israelites alone."],
  "Joshua 8:33-35::He Read All The Words Of The Law": ["Joshua reads the law aloud instead of leaving it unwritten and unheard.", "The people must hear the covenant plainly inside the land they have entered."],
  "Joshua 9:1-2::All The Kings Which Were On This Side Jordan": ["The phrase gathers many Canaanite rulers into one widening response to Israel.", "Joshua is no longer facing one city only, but a regional reaction."],
  "Joshua 9:1-2::Heard Thereof": ["Heard thereof means they heard what Israel and the LORD had done.", "News of conquest is moving ahead of Israel through the land."],
  "Joshua 9:1-2::Gathered Themselves Together": ["The kings assemble because they see a common threat.", "The phrase shows opposition organizing instead of remaining scattered."],
  "Joshua 9:1-2::With One Accord": ["With one accord means with shared purpose and agreement.", "Formerly separate peoples now unite against Israel."],
  "Joshua 9:3-6::They Did Work Wilily": ["Wilily means with cunning or deceptive craft.", "The Gibeonites choose trickery instead of open battle."],
  "Joshua 9:3-6::Took Old Sacks Upon Their Asses": ["The old sacks are part of the disguise meant to sell a long-journey story.", "Their worn supplies are chosen props in a false appearance."],
  "Joshua 9:3-6::Old Shoes And Clouted Upon Their Feet": ["Clouted means patched or mended.", "The patched shoes are meant to prove they have traveled from far away."],
  "Joshua 9:3-6::Make Ye A League With Us": ["A league is a formal peace agreement or covenant.", "The Gibeonites want binding protection from Israel."],
  "Joshua 9:7-10::Peradventure Ye Dwell Among Us": ["Peradventure means perhaps or maybe.", "Israel voices the exact concern that the strangers may actually be nearby neighbors."],
  "Joshua 9:7-10::We Are Thy Servants": ["The Gibeonites lower themselves in speech to make peace more likely.", "Calling themselves servants is part humility and part strategy."],
  "Joshua 9:7-10::From A Very Far Country Thy Servants Are Come": ["The claim of a far country is the center of the deception.", "If true, it would make a treaty seem lawful and safe."],
  "Joshua 9:7-10::Because Of The Name Of The LORD Thy God": ["They appeal to the LORD's name because they know that language will sound believable.", "The phrase shows truth and manipulation being mixed together."],
  "Joshua 9:11-15::Take Victuals With You For The Journey": ["Victuals means food supplies for travel.", "The Gibeonites build their story around worn provisions and a supposed long trip."],
  "Joshua 9:11-15::We Are Your Servants": ["The repeated claim of servanthood keeps pressing for peace.", "Their words aim to soften Israel's suspicion."],
  "Joshua 9:11-15::The Men Took Of Their Victuals": ["Israel examines or accepts the food evidence in front of them.", "The phrase shows them relying on visible proof."],
  "Joshua 9:11-15::Asked Not Counsel At The Mouth Of The LORD": ["To ask counsel at the mouth of the LORD means to seek God's direction before deciding.", "This is the key failure in the whole episode."],
  "Joshua 9:16-21::They Were Their Neighbours": ["The truth is discovered: the supposed foreigners actually live nearby.", "The phrase collapses the deception in one blow."],
  "Joshua 9:16-21::All The Congregation Murmured": ["Murmured means complained in dissatisfied speech.", "The people react against the leaders once the mistake becomes clear."],
  "Joshua 9:16-21::We Have Sworn Unto Them": ["The rulers point to the oath already made in the LORD's name.", "Their promise now binds them even though it was made unwisely."],
  "Joshua 9:16-21::Let Them Live": ["The leaders spare the Gibeonites because of the oath.", "Mercy here is constrained by covenant speech already given."],
  "Joshua 9:22-23::Wherefore Have Ye Beguiled Us": ["Beguiled means deceived or tricked.", "Joshua confronts them for winning protection through lies."],
  "Joshua 9:22-23::We Are Very Far From You": ["Joshua repeats the false claim back to the Gibeonites.", "Their own words become the accusation against them."],
  "Joshua 9:22-23::When Ye Dwell Among Us": ["The phrase contrasts the lie with the truth of their location.", "They are not distant outsiders but immediate neighbors."],
  "Joshua 9:22-23::Now Therefore Ye Are Cursed": ["The curse is a sentence of lowered service, not immediate execution.", "Joshua places lasting consequences on their deception."],
  "Joshua 9:22-23::Hewers Of Wood And Drawers Of Water": ["These are labor roles of cutting wood and carrying water.", "The phrase defines the servile work that will mark their future."],
  "Joshua 9:24-27::It Was Certainly Told Thy Servants": ["The Gibeonites explain that the reports about Israel were clear and convincing.", "They present fear of the LORD's command as the reason for their scheme."],
  "Joshua 9:24-27::To Give You All The Land": ["They know God has promised the land to Israel.", "The phrase shows that even Canaanites understand the scale of Israel's coming victory."],
  "Joshua 9:24-27::We Were Sore Afraid Of Our Lives": ["Sore afraid means deeply terrified for survival.", "Their deception grows out of fear of destruction."],
  "Joshua 9:24-27::As It Seemeth Good And Right Unto Thee": ["The Gibeonites submit themselves to Joshua's decision.", "The phrase accepts Israel's authority after the deception has been uncovered."],
  "Joshua 9:24-27::Hewers Of Wood And Drawers Of Water": ["The service sentence becomes their fixed place within Israel's community.", "Their lives are spared, but under permanent labor before God's people."],
  "Joshua 10:1-5::Adonizedek King Of Jerusalem": ["Adonizedek is the ruler of Jerusalem reacting to Israel's advance.", "His name marks the political leader who starts this southern coalition."],
  "Joshua 10:1-5::Gibeon Had Made Peace With Israel": ["Gibeon's peace treaty changes the balance of the region.", "The phrase explains why nearby kings now feel threatened."],
  "Joshua 10:1-5::Feared Greatly": ["The king's fear is intense because Gibeon was significant and now aligned with Israel.", "Political fear is driving the next attack."],
  "Joshua 10:1-5::Come Up Unto Me, And Help Me": ["Adonizedek calls other kings to join him in war.", "The phrase is a summons to coalition action."],
  "Joshua 10:6-8::Slack Not Thy Hand From Thy Servants": ["Slack not thy hand means do not relax your help or hold back your strength.", "Gibeon urgently asks Joshua not to abandon the covenant promise."],
  "Joshua 10:6-8::Come Up To Us Quickly": ["Quickly matters because Gibeon is under immediate threat.", "The phrase makes the request sound desperate and time-sensitive."],
  "Joshua 10:6-8::Fear Them Not": ["God answers the crisis with a direct command against fear.", "Joshua is told to face a coalition of kings without shrinking back."],
  "Joshua 10:6-8::There Shall Not A Man Of Them Stand Before Thee": ["Stand before thee means successfully resist or survive against Joshua.", "God promises total inability on the enemy side."],
  "Joshua 10:9-11::Joshua Came Unto Them Suddenly": ["Suddenly means the attack falls on the enemy with surprise.", "Joshua's march turns covenant help into immediate military rescue."],
  "Joshua 10:9-11::Went Up From Gilgal All Night": ["The army marches through the night to reach Gibeon in time.", "The phrase shows costly speed and commitment."],
  "Joshua 10:9-11::The LORD Discomfited Them Before Israel": ["Discomfited means threw them into confusion and panic.", "God unsettles the enemy before Israel finishes defeating them."],
  "Joshua 10:9-11::Cast Down Great Stones From Heaven": ["The stones from heaven are hail or divinely sent deadly stones.", "The phrase shows God Himself striking the fleeing enemy."],
  "Joshua 10:12-15::Sun, Stand Thou Still Upon Gibeon": ["Joshua speaks to the sun as part of his appeal for prolonged victory.", "The phrase describes daylight being held in place over the battlefield."],
  "Joshua 10:12-15::Thou, Moon, In The Valley Of Ajalon": ["Joshua also names the moon, extending the command across the sky.", "The battle is being described in cosmic terms, not ordinary human scale."],
  "Joshua 10:12-15::The Sun Stood Still": ["The phrase says daylight did not move forward in the normal way.", "The battle time is lengthened by God's intervention."],
  "Joshua 10:12-15::The Moon Stayed": ["Stayed means remained in place instead of continuing its usual course.", "The pause in the sky matches the pause of the sun."],
  "Joshua 10:12-15::There Was No Day Like That Before It Or After It": ["The writer marks the day as extraordinary and unmatched.", "The phrase warns the reader not to treat this as a normal event."],
  "Joshua 10:12-15::The LORD Hearkened Unto The Voice Of A Man": ["Hearkened means listened and responded.", "The wonder is not man's power over heaven, but God's willing response."],
  "Joshua 10:12-15::The LORD Fought For Israel": ["The victory belongs to God as the true warrior for His people.", "This line explains the whole miracle more than Joshua's command does."],
  "Joshua 10:16-21::These Five Kings Fled": ["The coalition rulers do not stand bravely at the end; they run.", "Their flight shows the collapse of their alliance."],
  "Joshua 10:16-21::Hid Themselves In A Cave": ["The cave becomes a temporary hiding place for defeated kings.", "The phrase pictures rulers reduced to concealment and fear."],
  "Joshua 10:16-21::Smote Them With A Very Great Slaughter": ["A very great slaughter means the enemy army is crushed on a large scale.", "The phrase highlights how overwhelming the defeat became."],
  "Joshua 10:16-21::All The People Returned To The Camp In Peace": ["Returned in peace means Israel comes back without further threat from the enemy.", "The campaign movement ends in security, not lingering danger."],
  "Joshua 10:22-27::Open The Mouth Of The Cave": ["The mouth of the cave means its entrance.", "Opening it brings the hidden kings back into the open for judgment."],
  "Joshua 10:22-27::Put Your Feet Upon The Necks Of These Kings": ["The gesture pictures complete subjugation under Israel's victory.", "Their necks underfoot symbolize conquered power."],
  "Joshua 10:22-27::Fear Not, Nor Be Dismayed": ["The repeated courage command teaches Israel how to interpret this victory.", "God wants courage to grow from what they now see."],
  "Joshua 10:22-27::Joshua Hanged Them On Five Trees": ["The dead kings are displayed publicly after execution.", "The phrase turns their defeat into a visible warning to others."],
  "Joshua 10:28-33::That Day Joshua Took Makkedah": ["The phrase marks the campaign moving city by city without pause.", "Makkedah becomes the next conquered stronghold in the southern sweep."],
  "Joshua 10:28-33::Joshua Passed From Makkedah Unto Libnah": ["Joshua does not settle after one capture, but moves forward to the next city.", "The phrase shows the conquest progressing in sequence."],
  "Joshua 10:28-33::The LORD Delivered It Also": ["Also means this victory belongs in the same chain of God's gifts.", "Libnah falls under the same divine hand as the earlier cities."],
  "Joshua 10:28-33::Horam King Of Gezer Came Up To Help Lachish": ["Horam enters the fight as an ally trying to reinforce Lachish.", "The phrase shows resistance gathering even as Joshua keeps advancing."],
  "Joshua 10:34-39::Joshua Passed Unto Lachish": ["The campaign keeps rolling onward from city to city.", "Lachish becomes another stop in the unfolding southern conquest."],
  "Joshua 10:34-39::From Lachish Unto Eglon": ["The movement to Eglon shows how quickly the victories continue.", "The phrase compresses distance into steady military momentum."],
  "Joshua 10:34-39::From Eglon They Went Up To Hebron": ["Joshua climbs from one conquered city toward another hill-country target.", "The phrase keeps the reader tracking the conquest map."],
  "Joshua 10:34-39::From Hebron He Passed Unto Debir": ["Debir is the next city taken in the same campaign flow.", "The phrase stresses continuity rather than isolated battles."],
  "Joshua 10:40-43::Joshua Smote All The Country Of The Hills": ["Country of the hills means the hill region as a whole.", "The phrase broadens the view from single cities to an entire zone."],
  "Joshua 10:40-43::Left None Remaining": ["The wording says no surviving opposition was left in the struck region.", "It describes completed judgment rather than partial control."],
  "Joshua 10:40-43::At One Time": ["At one time means in one sustained campaign movement.", "The phrase gives the reader the speed and force of Joshua's advance."],
  "Joshua 10:40-43::The LORD God Of Israel Fought For Israel": ["The summary of the campaign is that God fought for His people.", "The phrase interprets every city victory under one cause."],
  "Joshua 11:1-5::Jabin King Of Hazor": ["Jabin is the northern ruler who leads the next major resistance.", "Hazor's king stands at the head of a new coalition."],
  "Joshua 11:1-5::As The Sand That Is Upon The Sea Shore In Multitude": ["The comparison means the gathered force was extremely numerous.", "The phrase makes the enemy host feel overwhelming to the reader."],
  "Joshua 11:1-5::With Horses And Chariots Very Many": ["Horses and chariots were major military assets in ancient war.", "The phrase highlights the visible strength Israel is facing."],
  "Joshua 11:1-5::Pitched Together At The Waters Of Merom": ["Pitched together means they camped there as one assembled force.", "The waters of Merom become the staging ground for the northern battle."],
  "Joshua 11:7-9::Joshua Came Suddenly": ["Joshua attacks before the northern coalition can settle into safety.", "The sudden arrival keeps the enemy from using its size comfortably."],
  "Joshua 11:7-9::They Fell Upon Them Suddenly": ["Israel strikes the enemy with abrupt force.", "The phrase shows surprise turning into immediate battle advantage."],
  "Joshua 11:7-9::Houghed Their Horses": ["Houghed means Joshua disabled the horses by cutting their tendons.", "The phrase shows Israel rendering captured war animals unusable."],
  "Joshua 11:7-9::Burnt Their Chariots With Fire": ["The chariots are destroyed instead of kept as trophies.", "The phrase prevents Israel from trusting the military technology of the nations."],
  "Joshua 11:10-15::Hazor Beforetime Was The Head Of All Those Kingdoms": ["Beforetime means formerly or previously.", "Hazor is identified as the leading city of that northern group."],
  "Joshua 11:10-15::Joshua Smote All The Souls": ["All the souls means all the people within the judged city.", "The phrase describes total judgment on Hazor's inhabitants."],
  "Joshua 11:10-15::Burnt Hazor With Fire": ["Hazor is singled out for burning in a way the other captured cities are not.", "The phrase marks this city as a special target within the campaign."],
  "Joshua 11:10-15::Israel Burned None Of The Cities": ["Most of the captured cities were not burned after their fall.", "The exception of Hazor therefore stands out more sharply."],
  "Joshua 11:10-15::As The LORD Commanded Moses": ["Joshua's actions are measured against commands first given through Moses.", "The phrase keeps conquest tied to old covenant instruction."],
  "Joshua 11:10-15::So Did Joshua": ["The short line emphasizes plain obedience.", "Joshua is praised here for carrying out what had been commanded."],
  "Joshua 11:16-20::Joshua Took All That Land": ["The phrase summarizes the broad territorial result of the campaigns.", "Individual battles now add up to real possession across the region."],
  "Joshua 11:16-20::Joshua Made War A Long Time": ["The conquest was not finished in a single brief moment.", "The phrase reminds the reader that receiving the land involved long conflict."],
  "Joshua 11:16-20::Save The Hivites The Inhabitants Of Gibeon": ["Save here means except for the Gibeonites.", "They are the lone major Canaanite group in this section spared by treaty."],
  "Joshua 11:16-20::It Was Of The LORD To Harden Their Hearts": ["Harden their hearts means God gave them over so they would come against Israel in judgment.", "The phrase explains why peace was largely absent from the land."],
  "Joshua 11:21-22::Joshua Cut Off The Anakims": ["Cut off means removed them by military judgment from the land regions named.", "The Anakims were known as formidable giant-like peoples."],
  "Joshua 11:21-22::Left None Of The Anakims": ["The phrase stresses how thorough the removal was inside Israel's conquest area.", "Joshua leaves no Anakim stronghold in those central regions."],
  "Joshua 11:21-22::Only In Gaza, In Gath, And In Ashdod": ["Only means a remnant remained in a few Philistine cities outside the main conquest zone.", "The phrase limits where the Anakims still survived."],
  "Joshua 11:21-22::At That Time Came Joshua": ["At that time links this action to the larger conquest period already underway.", "Joshua's strike against the Anakims belongs to the same campaign season."],
};

function explainDay58JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const key = `${section.reference}::${cleanTitle}`;
  const opening = day58JoshuaExplanationLines[key] || [
    "This line belongs to Joshua's conquest of the land after Ai.",
    "The phrase is meant to clarify the action, place, or covenant meaning in front of the reader.",
  ];

  let lead = "⚔️ Joshua's battles keep unfolding under the LORD's direction.";
  let support = ["🧭 The campaign is moving forward", "👥 Israel must obey what God says", "🙌 Victory is interpreted through the LORD's work"];

  if (section.chapter === 8) {
    lead = "⚔️ Ai falls as Israel returns to battle under God's direction.";
    support = ["🕵️ Strategy matters in this battle", "👥 Israel moves as one people again", "🙌 Victory follows restored obedience"];
  } else if (section.chapter === 9) {
    lead = "🤝 The Gibeonite story tests truth, oath, and discernment.";
    support = ["🧠 Appearances can mislead", "🙏 Israel needed the LORD's counsel", "📜 Spoken promises still matter"];
  } else if (section.chapter === 10) {
    lead = "⚔️ The LORD fights for Israel against the southern kings.";
    support = ["👑 Coalitions rise against Israel", "💪 God gives courage in battle", "🙌 Victory comes from the LORD"];
  } else if (section.chapter === 11) {
    lead = "🗺️ The northern campaign shows the land being steadily taken.";
    support = ["🐎 Enemy strength looks impressive", "⚔️ Joshua acts with obedience and force", "🙌 The LORD gives the outcome"];
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

  if (/be strong|good courage|not fail|not forsake|lord thy god is with thee|whithersoever/.test(lower)) {
    return ["Joshua is being called to courageous obedience.", "His courage is grounded in the LORD's presence, not in confidence that he can lead by himself."];
  }
  if (/book of the law|mouth|meditate|observe to do|written|commanded moses/.test(lower)) {
    return ["Joshua's leadership must stay under God's written instruction.", "The conquest of the land begins with hearing, speaking, remembering, and obeying the LORD's word."];
  }
  if (/jordan|ark|covenant|priests|dry ground|passed over|waters/.test(lower)) {
    return ["The LORD is bringing Israel through the Jordan by His covenant presence.", "The river that should block them becomes the place where God shows that He leads His people into the promise."];
  }
  if (/rahab|harlot|spies|scarlet|token|house|hid|messengers/.test(lower)) {
    return ["Rahab is responding to the LORD with faith while Jericho faces judgment.", "Her house becomes a place where mercy is promised because she receives Israel's God as the true God."];
  }
  if (/jericho|wall|shout|trumpets|compass|seventh day|accursed thing|silver|gold/.test(lower)) {
    return ["Jericho's fall must happen exactly the way the LORD commands.", "Victory is not treated as Israel's private achievement; the city, the spoil, and the rescue of Rahab belong under God's word."];
  }
  if (/achan|israel hath sinned|covenant|accursed|ai|taken|burnt|troubled/.test(lower)) {
    return ["Hidden sin has brought covenant trouble into Israel's camp.", "The defeat at Ai shows that victory cannot continue while disobedience is protected."];
  }
  if (/gibeon|league|counsel|mouth of the lord|hewers of wood|drawers of water/.test(lower)) {
    return ["Israel is being warned about acting without asking the LORD.", "The Gibeonite deception shows how quickly sight, pressure, and appearances can lead God's people into a binding mistake."];
  }
  if (/sun|moon|stood still|hailstones|kings|makkedah|amorites/.test(lower)) {
    return ["The LORD fights for Israel in the battle.", "Joshua's campaign is not only military strategy; creation, weather, and victory are shown under God's authority."];
  }
  if (/land|give|inheritance|children of israel|tribes|people/.test(lower)) {
    return ["The promised land is being received by the covenant people.", "Joshua shows that God's gift becomes real as Israel follows, fights, and obeys under His command."];
  }

  return ["Joshua is showing the LORD bringing His people into the promise.", `In ${section.reference}, courage, obedience, mercy, judgment, and victory are being shaped by God's word.`];
}

function getBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/be strong|good courage|not fail|not forsake|with thee/.test(lower)) return ["💪 Courage rests on God", "🤝 The LORD stays with Joshua", "👣 Obedience must move forward"];
  if (/book of the law|meditate|observe|written|commanded/.test(lower)) return ["📖 God's word leads Joshua", "🧠 Meditation shapes courage", "👣 Obedience is required"];
  if (/jordan|ark|covenant|dry ground|waters|passed over/.test(lower)) return ["🌊 The barrier opens", "📦 God's presence leads", "👥 The whole people cross"];
  if (/rahab|scarlet|token|house|hid|messengers/.test(lower)) return ["🪟 Rahab responds with faith", "🏠 Mercy reaches her household", "🤝 The promise must be kept"];
  if (/jericho|wall|shout|trumpets|accursed|silver|gold/.test(lower)) return ["🏰 Jericho falls by God's command", "📣 Israel obeys the strange instruction", "⚠️ Devoted things belong to the LORD"];
  if (/achan|sinned|covenant|ai|taken|burnt|troubled/.test(lower)) return ["🚨 Sin is exposed", "👥 The camp is affected", "🔥 Judgment cleanses the trouble"];
  if (/gibeon|league|counsel|mouth of the lord|hewers|drawers/.test(lower)) return ["👀 Appearances deceive", "🙏 Israel should ask the LORD", "🤝 A covenant promise still binds"];
  if (/sun|moon|hailstones|kings|amorites|battle/.test(lower)) return ["☀️ Creation obeys God", "⚔️ The LORD fights for Israel", "👑 Enemy kings cannot stop Him"];
  if (/land|inheritance|children of israel|tribes|people/.test(lower)) return ["🏞️ The land is God's gift", "👥 Israel receives it together", "📜 The promise becomes visible"];

  return ["📜 God's word directs the story", "🏞️ The promise is moving forward", "🙌 Israel must trust and obey"];
}

function getTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/rahab|scarlet|token/.test(lower)) return "Mercy is real for the one who trusts the LORD.";
  if (/achan|accursed|ai|troubled/.test(lower)) return "Hidden disobedience harms the whole covenant community.";
  if (/book of the law|meditate|observe/.test(lower)) return "Courage must stay joined to God's word.";
  if (/jordan|ark|waters|dry ground/.test(lower)) return "God's presence makes a way where Israel cannot make one.";
  return "The LORD leads Israel into the land by promise, obedience, and mercy.";
}

function makeExplanation(section: { reference: string }, title: string) {
  const personalSection = section as PersonalLeviticusPhraseSectionInput;
  if (personalSection.chapter >= 1 && personalSection.chapter <= 3) {
    return explainDay56JoshuaAt95(personalSection, stripLeadingEmoji(title));
  }
  if (personalSection.chapter >= 4 && personalSection.chapter <= 7) {
    return explainDay57JoshuaAt95(personalSection, stripLeadingEmoji(title));
  }
  if (personalSection.chapter >= 8 && personalSection.chapter <= 11) {
    return explainDay58JoshuaAt95(personalSection, stripLeadingEmoji(title));
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
  const isDay56GeneratedSection = personalSection.chapter >= 1
    && personalSection.chapter <= 3
    && day56JoshuaCuratedPhraseTitles[personalSection.reference]?.length === personalSection.phrases.length;
  const isDay57GeneratedSection = personalSection.chapter >= 4
    && personalSection.chapter <= 7
    && day57JoshuaCuratedPhraseTitles[personalSection.reference]?.length === personalSection.phrases.length;
  const isDay58GeneratedSection = personalSection.chapter >= 8
    && personalSection.chapter <= 11
    && day58JoshuaCuratedPhraseTitles[personalSection.reference]?.length === personalSection.phrases.length;
  const title = isDay56GeneratedSection
    ? (day56JoshuaSectionTitles[personalSection.reference] || (section as T & { title?: string }).title)
    : isDay57GeneratedSection
      ? (day57JoshuaSectionTitles[personalSection.reference] || (section as T & { title?: string }).title)
      : isDay58GeneratedSection
        ? (day58JoshuaSectionTitles[personalSection.reference] || (section as T & { title?: string }).title)
        : (section as T & { title?: string }).title;
  const phraseTitles = isDay56GeneratedSection
    ? day56JoshuaCuratedPhraseTitles[personalSection.reference]
    : isDay57GeneratedSection
      ? day57JoshuaCuratedPhraseTitles[personalSection.reference]
      : isDay58GeneratedSection
        ? day58JoshuaCuratedPhraseTitles[personalSection.reference]
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

export const JOSHUA_1_11_PERSONAL_SECTIONS: PersonalSection[] = [
  ...generatedJoshuaOneToElevenPersonalSections
    .filter((section) => !dropGeneratedJoshuaReferences.has(section.reference))
    .map(polishSection),
  ...supplementalJoshuaOneToElevenSections.map(polishSection),
];
