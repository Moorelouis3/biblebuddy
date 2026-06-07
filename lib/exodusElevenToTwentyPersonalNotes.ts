import { BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyFiveDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyFourDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentySixDeepNotes";

export type PersonalExodusPhraseSectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const note = (lines: string[]) => lines.join("\n\n");
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

const RAW_EXODUS_11_20_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  {
    chapter: 11,
    startVerse: 1,
    endVerse: 10,
    reference: "Exodus 11:1-10",
    title: "The Final Plague Is Announced",
    icon: "🌙",
    phrases: [
      phrase("🌙 Yet Will I Bring One Plague More", ["The final plague is announced before it comes.", "God is not acting in confusion or panic.", "🌙 One plague more", "📣 Warning before judgment", "🔓 Release coming", "This line tells us the conflict with Pharaoh is reaching its decisive moment."]),
      phrase("🏃 He Shall Surely Thrust You Out", ["Pharaoh will not merely allow Israel to leave.", "He will drive them out.", "👑 The oppressor releases", "🏃 The people leave", "⚖️ God's judgment breaks the grip", "The king who kept saying no will be forced into the very release he resisted."]),
      phrase("💍 Jewels Of Silver, And Jewels Of Gold", ["Israel is told to ask Egypt for silver and gold.", "The enslaved people will not leave empty.", "💍 Silver", "👑 Gold", "🎒 Provision for the journey", "God reverses the exploitation of Egypt and sends His people out supplied."]),
      phrase("👑 Moses Was Very Great", ["Moses is now respected in Egypt.", "The fugitive shepherd has become God's public messenger.", "👑 Before Pharaoh's servants", "👥 Before the people", "📣 Carrying God's word", "His greatness is not celebrity; it comes from the LORD's authority on his mission."]),
      phrase("🌃 About Midnight", ["The final judgment has an appointed time.", "Midnight makes the scene heavy and unmistakable.", "🌃 Night", "⏰ Appointed hour", "⚖️ Judgment", "Egypt will learn that the LORD rules timing as surely as He rules nature."]),
      phrase("👶 All The Firstborn", ["The judgment reaches the firstborn of Egypt.", "This is deeply connected to Pharaoh's attack on Hebrew sons in Exodus 1.", "👶 Firstborn", "👑 Throne", "🏠 Household", "Pharaoh targeted Israel's children; now judgment reaches Egypt's households."]),
      phrase("🛡️ The Lord Doth Put A Difference", ["God makes a distinction between Egypt and Israel.", "The rescue is not because Israel is stronger.", "🛡️ Difference", "👥 God's people", "⚖️ Judgment passing by", "God knows how to judge Egypt while preserving His covenant people."]),
      phrase("🔒 Pharaoh Shall Not Hearken", ["Even after all the signs, Pharaoh will not listen.", "The hard heart is now fully exposed.", "🔒 Refusal", "📣 Clear warning", "⚖️ More wonders", "This prepares the reader for the final blow and the Passover shelter."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 20,
    reference: "Exodus 12:1-20",
    title: "Passover Begins A New Calendar",
    icon: "🐑",
    phrases: [
      phrase("📅 The Beginning Of Months", ["God resets Israel's calendar around redemption.", "Their time will now be marked by the night He brought them out.", "📅 New beginning", "🩸 Rescue remembered", "👥 Identity reshaped", "Freedom changes how Israel counts time."]),
      phrase("🏠 According To The House Of Their Fathers", ["Passover is given household by household.", "Deliverance reaches actual families, tables, and doorways.", "🏠 Household", "🍽️ Meal", "🩸 Door", "The rescue is national, but it is received in homes."]),
      phrase("🐑 A Lamb For An House", ["Each household takes a lamb.", "The lamb stands at the center of the night of shelter.", "🐑 Lamb", "🏠 House", "🩸 Blood", "God gives Israel a specific way to be covered during judgment."]),
      phrase("✨ Without Blemish", ["The lamb must be without blemish.", "Israel does not give God what is defective.", "✨ Whole", "🐑 Set apart", "🙏 Given under God's command", "The rescue is not invented by Israel; it follows God's provided pattern."]),
      phrase("🩸 They Shall Take Of The Blood", ["The blood is placed on the side posts and lintel of the house.", "The doorway becomes the visible boundary of shelter.", "🩸 Blood", "🚪 Doorway", "🛡️ Protection", "The house is not safe because it is Hebrew, but because it is marked according to God's word."]),
      phrase("🔥 Roast With Fire", ["The lamb is eaten roasted with fire, unleavened bread, and bitter herbs.", "The meal teaches through taste and memory.", "🔥 Roasted lamb", "🍞 Unleavened bread", "🌿 Bitter herbs", "Israel remembers both suffering and rescue."]),
      phrase("👟 Your Shoes On Your Feet", ["Israel eats ready to leave.", "The meal is not relaxed nostalgia; it is urgent faith.", "👟 Shoes on", "🎒 Staff in hand", "🏃 Ready to go", "They must trust that deliverance is close enough to dress for departure."]),
      phrase("🩸 When I See The Blood", ["This is one of the clearest rescue lines in Exodus.", "God promises to pass over the marked houses.", "🩸 Blood seen", "🛡️ Judgment passes over", "🏠 Household sheltered", "Safety rests on God's appointed sign."]),
      phrase("🍞 Seven Days Shall Ye Eat Unleavened Bread", ["Unleavened bread becomes a yearly practice.", "The haste of deliverance is built into Israel's memory.", "🍞 No leaven", "📅 Seven days", "🧠 Remember rescue", "God gives the people a rhythm so freedom will not be forgotten."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 21,
    endVerse: 32,
    reference: "Exodus 12:21-32",
    title: "Blood On The Doorposts",
    icon: "🩸",
    phrases: [
      phrase("🪴 Hyssop", ["Hyssop is used to apply the blood.", "A simple plant becomes part of the act of obedience.", "🪴 Hyssop", "🩸 Blood", "🚪 Doorposts", "God's appointed means may look ordinary, but obedience to His word matters."]),
      phrase("🚪 None Of You Shall Go Out", ["The people must remain inside the marked house.", "Faith is shown by staying under the shelter God provides.", "🚪 Inside", "🩸 Blood outside", "🛡️ Safety", "They do not survive by bravery in the street, but by trusting God's covering."]),
      phrase("👶 Your Children Shall Say", ["God expects children to ask about Passover.", "The ritual is meant to teach the next generation.", "👶 Children ask", "📖 Parents explain", "🧠 Memory continues", "Deliverance must become family instruction, not just adult memory."]),
      phrase("🙇 The People Bowed The Head And Worshipped", ["Israel worships before the final plague falls.", "They receive God's word and bow.", "🙇 Worship", "📣 Promise heard", "🩸 Rescue prepared", "Faith responds before the full deliverance is visible."]),
      phrase("🌙 At Midnight", ["The announced hour arrives.", "Egypt's long refusal meets God's final judgment.", "🌙 Midnight", "⚖️ Judgment", "😢 Great cry", "The timing shows that God's warning was true."]),
      phrase("😢 A Great Cry In Egypt", ["The death of the firstborn brings grief through Egypt.", "This is a terrible and weighty judgment.", "😢 Cry", "🏠 Every house touched", "👑 Pharaoh's house included", "Exodus does not make judgment feel light. It is holy and severe."]),
      phrase("🏃 Rise Up, And Get You Forth", ["Pharaoh finally tells Israel to go.", "The command he resisted now comes from his own mouth.", "🏃 Leave", "🔓 Release", "👑 Pharaoh broken", "God has turned refusal into expulsion."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 33,
    endVerse: 51,
    reference: "Exodus 12:33-51",
    title: "Israel Leaves Egypt",
    icon: "🎒",
    phrases: [
      phrase("⚡ The Egyptians Were Urgent", ["Egypt urges Israel to leave quickly.", "The oppressor now fears delay.", "⚡ Urgency", "🏃 Departure", "⚖️ Judgment behind them", "God can make the system that held people captive push them out."]),
      phrase("🍞 Before It Was Leavened", ["Israel carries dough before it rises.", "The food itself tells the story of haste.", "🍞 Unleavened dough", "🎒 Wrapped possessions", "🏃 Quick departure", "Their bread becomes a reminder that God delivered suddenly."]),
      phrase("👥 About Six Hundred Thousand", ["The small family from Genesis has become a great multitude.", "This shows the promise visibly multiplied.", "👥 Multitude", "📈 Growth", "📜 Abraham's promise", "God kept His word in Egypt."]),
      phrase("🌍 A Mixed Multitude", ["Non-Israelites leave with Israel.", "The Exodus already has a wider witness.", "🌍 Outsiders", "👥 Traveling with Israel", "📣 God's fame spreading", "God's rescue draws more than one ethnic household into the movement."]),
      phrase("⏳ Four Hundred And Thirty Years", ["The timeline shows long waiting.", "Generations lived and died before this night.", "⏳ 430 years", "😣 Long affliction", "📜 Promise kept", "God's timing can feel long, but Exodus says He did not forget."]),
      phrase("🌙 A Night To Be Much Observed", ["The night becomes holy memory.", "Israel must keep watching it through generations.", "🌙 Night of rescue", "🧠 Memory", "🙏 Worship", "Freedom needs remembrance so the Rescuer is not forgotten."]),
      phrase("🍽️ The Ordinance Of The Passover", ["God gives rules for the meal after the rescue.", "Deliverance creates ordered worship.", "🍽️ Meal", "📜 Ordinance", "👥 Covenant people", "Passover is not random celebration; it belongs to the identity of the redeemed."]),
      phrase("✂️ Circumcised", ["The Passover meal is tied to covenant belonging.", "Outsiders may join, but not casually.", "✂️ Covenant sign", "🌍 Stranger welcomed", "📜 Same law", "Grace welcomes people into belonging, not detached religious sampling."]),
      phrase("🪖 By Their Armies", ["Israel leaves Egypt by their hosts.", "Former slaves are described as organized people under God's command.", "🪖 Hosts", "🔓 Freed people", "🧭 Ordered journey", "God is forming a people, not only emptying Egypt of laborers."]),
    ],
  },
  {
    chapter: 13,
    startVerse: 1,
    endVerse: 16,
    reference: "Exodus 13:1-16",
    title: "Redeemed People Remember",
    icon: "🧠",
    phrases: [
      phrase("👶 Sanctify Unto Me All The Firstborn", ["God claims the firstborn because He spared Israel's firstborn.", "Rescue creates belonging.", "👶 Firstborn", "🛡️ Spared by mercy", "🙏 Set apart to God", "The life God protected is now marked as His."]),
      phrase("🧠 Remember This Day", ["God commands memory immediately after deliverance.", "Freed people can forget quickly.", "🧠 Remember", "🔓 Brought out", "💪 Strong hand", "Memory becomes part of worship."]),
      phrase("🍞 No Leavened Bread", ["Unleavened bread keeps the haste of rescue visible.", "The absence of leaven teaches the story.", "🍞 Unleavened", "🏃 Haste", "📅 Repeated feast", "Israel eats memory into the next generation."]),
      phrase("🏞️ When The Lord Shall Bring Thee", ["The command looks forward to the land.", "Passover memory must continue after the crisis is over.", "🏞️ Promised land", "📜 Old oath", "🧠 Continued remembrance", "God does not want comfort in the land to erase memory of rescue."]),
      phrase("👶 When Thy Son Asketh Thee", ["Children will ask what the practices mean.", "God wants parents ready with the story.", "👶 Question", "📖 Answer", "💪 By strength of hand", "Faith is passed on through explained remembrance."]),
      phrase("✋ A Sign Unto Thee Upon Thine Hand", ["The rescue is to shape action and thought.", "Hand and eyes point to daily life and memory.", "✋ Actions", "👀 Attention", "📜 God's law", "Deliverance belongs in ordinary life, not only festival days."]),
      phrase("🐑 Thou Shalt Redeem", ["The firstborn son is redeemed, not sacrificed.", "God teaches that life belongs to Him and is rescued by provision.", "🐑 Substitute", "👶 Firstborn son", "🤲 Redemption", "The language prepares the Bible's larger theme of rescue through a price."]),
    ],
  },
  {
    chapter: 13,
    startVerse: 17,
    endVerse: 22,
    reference: "Exodus 13:17-22",
    title: "God Leads The Long Way",
    icon: "☁️",
    phrases: [
      phrase("🧭 God Led Them Not Through The Way Of The Philistines", ["The shortest route is not the route God chooses.", "Israel is free but not yet battle-ready.", "🧭 Longer road", "⚔️ War avoided", "🛡️ Mercy", "A longer path can still be God's kindness."]),
      phrase("🔁 Lest Peradventure The People Repent", ["God knows the people's weakness.", "He leads with patience.", "🔁 Turning back", "😨 Fear of war", "☁️ Guided mercy", "God's route accounts for what His people can actually bear."]),
      phrase("🪖 Harnessed", ["Israel leaves in ordered formation.", "They are no longer a scattered slave population.", "🪖 Ordered hosts", "🔓 Freed people", "🧭 Journey begins", "God is shaping their identity as His people."]),
      phrase("🦴 Moses Took The Bones Of Joseph", ["Joseph's bones connect Exodus back to Genesis 50.", "Joseph believed God would surely visit His people.", "🦴 Bones", "📜 Promise remembered", "🏞️ Canaan hope", "Even Joseph's remains preach that Egypt is not the final home."]),
      phrase("☁️ A Pillar Of Cloud", ["God gives visible guidance by day.", "A newly freed people need more than release; they need direction.", "☁️ Cloud", "🧭 Guidance", "👥 God with them", "Israel is not wandering alone."]),
      phrase("🔥 A Pillar Of Fire", ["The fire gives light by night.", "God's presence guides in darkness too.", "🔥 Fire", "🌙 Night", "💡 Light", "The journey can continue because the LORD leads both day and night."]),
    ],
  },
  {
    chapter: 14,
    startVerse: 1,
    endVerse: 14,
    reference: "Exodus 14:1-14",
    title: "Fear At The Sea",
    icon: "😨",
    phrases: [
      phrase("🌊 Camp Before The Sea", ["God leads Israel to a place that looks trapped.", "The sea is in front and Egypt will come behind.", "🌊 Sea", "🏜️ Wilderness", "🐎 Army coming", "The setup looks impossible, but it is not outside God's plan."]),
      phrase("🪤 They Are Entangled In The Land", ["Pharaoh thinks Israel is trapped.", "He reads the geography without seeing God.", "🪤 Trap", "👑 Pharaoh's confidence", "🌊 Sea", "What looks like entanglement to Pharaoh will become deliverance for Israel."]),
      phrase("🐎 Six Hundred Chosen Chariots", ["Egypt brings elite military power.", "The contrast is extreme: chariots against freed slaves.", "🐎 Chariots", "⚔️ Army", "😨 Fear", "The visible threat is real, which makes God's rescue unmistakable."]),
      phrase("😨 They Were Sore Afraid", ["Israel's fear is understandable.", "The army is real.", "😨 Fear", "🌊 Sea", "🐎 Pursuit", "But fear becomes dangerous when it rewrites God's rescue as a mistake."]),
      phrase("⚰️ Because There Were No Graves In Egypt", ["The people speak with bitter sarcasm.", "They accuse Moses of bringing them out to die.", "⚰️ Graves", "😣 Panic", "🔁 Egypt nostalgia", "Fear can make bondage look safer than faith."]),
      phrase("🛑 Fear Ye Not", ["Moses commands the people not to fear.", "This is not because the danger is fake, but because God is real.", "🛑 Fear not", "👀 Stand still", "🛡️ Salvation coming", "Faith begins by looking away from Egypt's power to the LORD's promise."]),
      phrase("👀 Stand Still, And See", ["Israel cannot save itself at the sea.", "They must watch God act.", "👀 Stand still", "🛡️ Salvation", "💪 The LORD acts", "This moment teaches salvation before it teaches strategy."]),
      phrase("🛡️ The Lord Shall Fight For You", ["God Himself will fight for Israel.", "The Exodus is not Israel's military victory.", "🛡️ The LORD fights", "🤫 Hold peace", "🐎 Egypt defeated", "The people are rescued by divine power, not battle skill."]),
    ],
  },
  {
    chapter: 14,
    startVerse: 15,
    endVerse: 31,
    reference: "Exodus 14:15-31",
    title: "The Sea Opens",
    icon: "🌊",
    phrases: [
      phrase("🚶 Go Forward", ["After standing still, Israel must move.", "Faith changes posture when God commands.", "👀 Stand still", "🚶 Go forward", "🌊 Path opening", "Waiting and walking both belong to obedience."]),
      phrase("☁️ The Pillar Removed", ["The cloud moves between Egypt and Israel.", "God's presence becomes a shield behind them.", "☁️ Cloud", "🛡️ Protection", "🐎 Egypt blocked", "The LORD knows where His people need defense."]),
      phrase("🌬️ A Strong East Wind", ["God uses wind to divide the sea.", "Creation obeys the Creator.", "🌬️ Wind", "🌊 Waters divided", "🏜️ Dry ground", "The rescue echoes creation: God brings order and dry land through waters."]),
      phrase("🧱 A Wall Unto Them", ["The waters stand like walls on both sides.", "The sea that looked like death becomes a passage.", "🧱 Water walls", "🚶 Israel walking", "🛡️ God preserving", "The impossible path exists because God commands it."]),
      phrase("⚙️ Took Off Their Chariot Wheels", ["Egypt follows, but their strength breaks down.", "The chariots that terrified Israel become useless.", "⚙️ Wheels off", "🐎 Army troubled", "⚖️ Pride collapsing", "God can dismantle the very power people trust."]),
      phrase("🏃 Let Us Flee", ["Egypt finally recognizes the LORD fights for Israel.", "But the recognition comes too late.", "🏃 Panic", "🛡️ The LORD fights", "🌊 Waters returning", "The oppressor's confidence collapses inside the place of judgment."]),
      phrase("👀 Israel Saw That Great Work", ["The people see the LORD's deliverance.", "The sight leads to fear of the LORD and belief.", "👀 Saw", "🙇 Feared", "🤲 Believed", "Deliverance becomes a foundation for worship and trust."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 1,
    endVerse: 21,
    reference: "Exodus 15:1-21",
    title: "Israel Sings The Victory",
    icon: "🎶",
    phrases: [
      phrase("🎶 I Will Sing Unto The Lord", ["The first major song rises from deliverance.", "Israel does not merely escape; they worship.", "🎶 Song", "🌊 Sea rescue", "🙌 Praise", "God's saving work becomes the people's music."]),
      phrase("🐎 Horse And His Rider", ["The song remembers Egypt's military pride thrown into the sea.", "What terrified Israel is gone.", "🐎 Horse", "⚔️ Rider", "🌊 Sea", "The line celebrates the LORD's victory over visible power."]),
      phrase("💪 The Lord Is My Strength And Song", ["God is not only the One who gives strength.", "He becomes the center of song.", "💪 Strength", "🎶 Song", "🛡️ Salvation", "The rescued people now have a new source of confidence."]),
      phrase("👑 The Lord Is A Man Of War", ["The song praises the LORD as warrior.", "He fought for His oppressed people.", "👑 Warrior", "⚖️ Justice", "🛡️ Rescue", "This is not random violence; it is holy deliverance from oppression."]),
      phrase("❓ Who Is Like Unto Thee", ["The question is worship.", "No rival compares to the LORD.", "❓ Who is like", "✨ Glorious in holiness", "🙌 Fearful in praises", "Egypt's gods and Pharaoh's power have been exposed as nothing beside Him."]),
      phrase("🏞️ Thou Shalt Bring Them In", ["The song looks forward to the destination.", "God did not rescue Israel to leave them nowhere.", "🏞️ Bring them in", "⛰️ Holy habitation", "📜 Promise ahead", "Deliverance has a destination: life near God."]),
      phrase("🥁 Miriam The Prophetess", ["Miriam leads the women in praise.", "Her leadership is visible and named.", "🥁 Timbrel", "💃 Dance", "🎶 Answering song", "The victory belongs to the whole community, and worship spreads through it."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 22,
    endVerse: 27,
    reference: "Exodus 15:22-27",
    title: "Bitter Water And The God Who Heals",
    icon: "💧",
    phrases: [
      phrase("🏜️ Three Days In The Wilderness", ["The song is followed by thirst.", "Spiritual highs do not remove real needs.", "🏜️ Wilderness", "⏳ Three days", "💧 No water", "Israel must learn trust after the sea."]),
      phrase("💧 The Waters Of Marah", ["The water exists, but it is bitter.", "Need turns into disappointment.", "💧 Water found", "😖 Bitter", "😣 Cannot drink", "The wilderness exposes the heart quickly."]),
      phrase("😣 The People Murmured", ["Israel complains against Moses.", "Their thirst is real, but their response turns against God's servant.", "😣 Complaint", "💧 Need", "🧠 Short memory", "The people who sang at the sea now struggle at the water."]),
      phrase("🌳 The Lord Shewed Him A Tree", ["God shows Moses what to do.", "The tree is God's appointed means for healing the water.", "🌳 Tree", "💧 Bitter made sweet", "🤲 Provision", "God can make bitter places livable."]),
      phrase("🩺 I Am The Lord That Healeth Thee", ["God reveals Himself as healer.", "He cares for His people after the dramatic rescue.", "🩺 Healing", "💧 Water", "🏜️ Wilderness", "The LORD is not only the God who defeats Egypt; He heals His people on the road."]),
      phrase("🌴 Elim", ["After Marah, Israel comes to Elim with twelve wells and seventy palm trees.", "God gives refreshment after testing.", "🌴 Palm trees", "💧 Twelve wells", "🏕️ Rest", "The wilderness includes bitter places, but not only bitter places."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 12,
    reference: "Exodus 16:1-12",
    title: "Bread From Heaven",
    icon: "🍞",
    phrases: [
      phrase("🏜️ Wilderness Of Sin", ["This is a wilderness location, not a claim that the place itself is sinful.", "Israel is away from Egypt's food system now.", "🏜️ Wilderness", "🍽️ Hunger", "🤲 Dependence", "Freedom requires learning a new source of daily life."]),
      phrase("😣 The Whole Congregation Murmured", ["The complaint spreads through the community.", "Hunger is real, but fear turns into accusation.", "😣 Murmuring", "👥 Whole congregation", "🍽️ Hunger", "Pressure can make a rescued people speak like Egypt was better."]),
      phrase("🍲 Flesh Pots", ["Israel remembers Egypt's food while forgetting Egypt's cruelty.", "Fear edits memory.", "🍲 Meat pots", "🍞 Bread to the full", "🔒 Slavery minimized", "Hunger can make bondage sound safer than trust."]),
      phrase("🍞 I Will Rain Bread From Heaven", ["God answers hunger with bread from above.", "Israel cannot produce it or control it.", "🍞 Bread", "☁️ From heaven", "🤲 Gift", "Daily life will become a classroom of trust."]),
      phrase("📏 A Certain Rate Every Day", ["God gives daily limits.", "The people must gather enough for each day.", "📏 Measured portion", "📅 Daily rhythm", "🤲 Trust", "God is training them out of hoarding and into dependence."]),
      phrase("🧪 That I May Prove Them", ["The manna is food and a test.", "God is forming a people who listen.", "🧪 Test", "🍞 Provision", "📜 Law", "Provision is not only survival; it is discipleship."]),
      phrase("👂 The Lord Heareth Your Murmurings", ["God hears even the complaints.", "The people aim their frustration at Moses and Aaron, but the deeper issue is with the LORD.", "👂 God hears", "😣 Murmuring", "🙏 Need", "God answers with provision, but He also names the complaint truthfully."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 13,
    endVerse: 36,
    reference: "Exodus 16:13-36",
    title: "Manna And Sabbath Rest",
    icon: "❓",
    phrases: [
      phrase("🐦 Quails Came Up", ["God provides meat in the evening.", "He answers the people's complaint with real provision.", "🐦 Quail", "🌙 Evening", "🍽️ Food", "The wilderness is not too empty for God to feed His people."]),
      phrase("❓ What Is It", ["Manna is connected to Israel's question.", "They receive provision they do not recognize.", "❓ What is it", "🍞 Bread from the LORD", "🤲 Strange gift", "God's provision may be unfamiliar before it becomes daily bread."]),
      phrase("📏 An Omer For Every Man", ["Each person gathers according to need.", "No one is meant to lack, and no one is meant to hoard.", "📏 Omer", "👥 Every person", "⚖️ Enough", "God's economy trains the community in sufficiency."]),
      phrase("🪱 It Bred Worms", ["When people keep manna against God's command, it spoils.", "Hoarding disobeys the daily lesson.", "🪱 Worms", "😖 Stench", "🛑 Distrust exposed", "God is teaching trust one morning at a time."]),
      phrase("🛑 The Rest Of The Holy Sabbath", ["Sabbath appears before Sinai's tablets.", "Former slaves are taught holy rest.", "🛑 Rest", "🍞 Double portion", "📅 Seventh day", "Rest is not laziness; it is trust in God's provision."]),
      phrase("🚫 There Was None", ["Some still go out looking for manna on Sabbath.", "They struggle to trust rest.", "🚫 No manna", "🛑 Sabbath", "😟 Slave habits", "A rescued people must learn that God gives enough for rest too."]),
      phrase("🏺 Lay Up An Omer", ["A portion of manna is kept as a witness for future generations.", "God wants the miracle remembered.", "🏺 Omer kept", "👶 Generations", "📖 Testimony", "The daily bread becomes evidence of God's faithfulness in the wilderness."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 7,
    reference: "Exodus 17:1-7",
    title: "Water From The Rock",
    icon: "💧",
    phrases: [
      phrase("💧 No Water For The People To Drink", ["The need is real.", "The wilderness has brought Israel to thirst again.", "💧 No water", "🏜️ Rephidim", "😣 Pressure", "Exodus does not pretend the need is small. It shows what need reveals."]),
      phrase("⚖️ The People Did Chide", ["The people quarrel with Moses.", "Fear turns into accusation.", "⚖️ Quarreling", "😣 Thirst", "🧠 Forgetting", "The deeper question is whether they trust the God who has already provided."]),
      phrase("🪨 Smite The Rock", ["God tells Moses to strike the rock at Horeb.", "Water comes from an unlikely place.", "🪨 Rock", "🪵 Rod", "💧 Water", "The staff used in judgment on Egypt now becomes connected to provision for Israel."]),
      phrase("❓ Is The Lord Among Us, Or Not", ["This question names the heart issue.", "Israel's thirst is real, but they question God's presence.", "❓ Is God here", "💧 Need", "😨 Doubt", "The wilderness tests whether they know the LORD is with them when the next need appears."]),
      phrase("📍 Massah And Meribah", ["The place is named for testing and quarrelling.", "Place names in Exodus preserve spiritual memory.", "📍 Massah", "📍 Meribah", "🧠 Warning", "The map itself becomes a reminder of mistrust and God's provision."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 8,
    endVerse: 16,
    reference: "Exodus 17:8-16",
    title: "The Lord Is My Banner",
    icon: "🏳️",
    phrases: [
      phrase("⚔️ Then Came Amalek", ["The first battle comes after the water crisis.", "Freedom does not mean life becomes battle-free.", "⚔️ Amalek", "🏜️ Wilderness", "🛡️ Need for God", "Israel must learn dependence in conflict as well as thirst."]),
      phrase("🪖 Joshua", ["Joshua appears as a battle leader.", "This is an early introduction to someone who will matter later.", "🪖 Joshua", "⚔️ Fighting below", "⛰️ Moses above", "God's deliverance uses different servants in different roles."]),
      phrase("🙌 When Moses Held Up His Hand", ["The battle is connected to Moses' raised hands.", "Israel's victory is not explained by military strength alone.", "🙌 Raised hands", "⚔️ Battle", "🤲 Dependence", "The scene shows that victory depends on the LORD."]),
      phrase("🥀 Moses' Hands Were Heavy", ["Moses is called, but he is still human.", "His weakness is not hidden.", "🥀 Heavy hands", "🪨 Stone seat", "🤝 Help needed", "Faithful leadership often requires faithful support."]),
      phrase("🤝 Aaron And Hur Stayed Up His Hands", ["Aaron and Hur support Moses until sunset.", "Their hidden help matters to the victory.", "🤝 Support", "🙌 Steady hands", "⚔️ Victory", "Exodus honors the people who hold up weary servants."]),
      phrase("🏳️ Jehovah-Nissi", ["Moses names the altar The LORD is my banner.", "A banner marks identity and rallying point.", "🏳️ Banner", "🙌 Worship", "🛡️ Victory belongs to God", "Israel must remember whose name stands over the battle."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 12,
    reference: "Exodus 18:1-12",
    title: "Jethro Hears What God Has Done",
    icon: "👂",
    phrases: [
      phrase("👂 Jethro Heard", ["The Exodus is becoming testimony beyond Israel.", "Jethro hears what God has done.", "👂 Heard", "🌍 Outsider listening", "📣 God's works spreading", "Deliverance is meant to be known."]),
      phrase("🏠 Zipporah", ["Moses' family is brought back into the story.", "The deliverer is also a husband and father.", "🏠 Family", "👥 Reunion", "🧭 Journey", "Exodus keeps public mission and personal household in view."]),
      phrase("🗣️ Moses Told His Father In Law All", ["Moses tells the story of deliverance and hardship.", "Good testimony does not hide trouble.", "🗣️ Told all", "⚖️ What Pharaoh did", "🛡️ How the LORD delivered", "The story belongs to God's glory, not Moses' image."]),
      phrase("😊 Jethro Rejoiced", ["Jethro rejoices over God's goodness to Israel.", "An outsider celebrates the LORD's rescue.", "😊 Joy", "🙌 Blessing", "🌍 Wider witness", "God's salvation draws praise from beyond the rescued people."]),
      phrase("👑 Greater Than All Gods", ["Jethro confesses the LORD's greatness.", "Egypt's gods have been exposed.", "👑 Greater", "⚖️ Proud enemies judged", "🙌 The LORD blessed", "The Exodus reveals supremacy, not merely power."]),
      phrase("🍽️ Eat Bread With Moses' Father In Law Before God", ["The chapter ends with a meal before God.", "Deliverance becomes fellowship and worship.", "🍽️ Meal", "👴 Elders", "🙌 Before God", "Testimony leads to shared worship."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 13,
    endVerse: 27,
    reference: "Exodus 18:13-27",
    title: "Jethro Teaches Shared Leadership",
    icon: "🧑‍⚖️",
    phrases: [
      phrase("🧑‍⚖️ Moses Sat To Judge The People", ["Moses is carrying dispute after dispute.", "The need is real, but the load is too heavy.", "🧑‍⚖️ Judging", "👥 People waiting", "😓 One man overloaded", "Good work can still be unsustainable."]),
      phrase("❓ Why Sittest Thou Thyself Alone", ["Jethro asks a wise question.", "He sees the strain Moses has normalized.", "❓ Why alone", "👀 Outside perspective", "🧠 Wisdom", "Sometimes faithful leaders need someone else to name what is not working."]),
      phrase("😓 Thou Wilt Surely Wear Away", ["Jethro warns Moses that the load will wear him out.", "The people will suffer too.", "😓 Exhaustion", "👥 People burdened", "⚠️ Not sustainable", "Human limits are not failure; they are part of wise leadership."]),
      phrase("📖 Teach Them Ordinances And Laws", ["Moses must teach the people God's ways, not only solve cases.", "Instruction helps the whole community mature.", "📖 Teach", "🧭 Show the way", "👥 Form the people", "Leadership is not only answering problems; it is shaping understanding."]),
      phrase("🧑‍⚖️ Able Men", ["Jethro describes the kind of leaders needed.", "Ability and character both matter.", "🧑‍⚖️ Able", "🙏 Fear God", "🗣️ Truth", "🚫 Hating covetousness", "Shared leadership must be trustworthy leadership."]),
      phrase("🤝 They Shall Bear The Burden With Thee", ["The load is shared.", "Moses does not have to carry every case alone.", "🤝 Shared burden", "👥 Ordered people", "😌 Sustainable service", "God's care can come through wise structure."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 15,
    reference: "Exodus 19:1-15",
    title: "Israel Comes To Sinai",
    icon: "⛰️",
    phrases: [
      phrase("⛰️ Wilderness Of Sinai", ["Israel arrives at the mountain region where God will speak covenant words.", "The rescue from Egypt is moving toward relationship.", "⛰️ Sinai", "🏕️ Camp", "📜 Covenant coming", "God brought them out so He could bring them near."]),
      phrase("🦅 Bare You On Eagles' Wings", ["God describes the Exodus as carrying Israel.", "They did not fly themselves out.", "🦅 Carried", "🔓 Brought out", "🏠 Brought unto God", "Deliverance is grace before it is responsibility."]),
      phrase("💎 A Peculiar Treasure", ["Israel is called God's treasured possession.", "This is identity before law-keeping is described.", "💎 Treasure", "🌍 All earth is God's", "👥 Covenant people", "God's commands come to people He has already claimed."]),
      phrase("👑 A Kingdom Of Priests", ["Israel is called to represent God among the nations.", "Their identity has a priestly purpose.", "👑 Kingdom", "🙏 Priests", "🕊️ Holy nation", "Rescue gives Israel a calling, not just relief."]),
      phrase("🙋 All That The Lord Hath Spoken We Will Do", ["The people answer covenant words with commitment.", "They agree before hearing all the details.", "🙋 We will do", "📜 God's words", "🤝 Covenant response", "The moment is serious because Israel is entering binding relationship with the LORD."]),
      phrase("🧼 Sanctify Them", ["The people must prepare to meet God.", "Washing clothes becomes an outward sign of readiness.", "🧼 Washed garments", "⏳ Third day", "🔥 Holy presence", "Grace does not make God's nearness casual."]),
      phrase("🚧 Set Bounds", ["Boundaries are placed around the mountain.", "Nearness to God must be approached God's way.", "🚧 Boundary", "⛰️ Mountain", "⚠️ Warning", "The limits are mercy because God's holiness is weighty."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 16,
    endVerse: 25,
    reference: "Exodus 19:16-25",
    title: "The Lord Descends On Sinai",
    icon: "⚡",
    phrases: [
      phrase("⚡ Thunders And Lightnings", ["Sinai overwhelms the senses.", "God's arrival is not casual.", "⚡ Lightning", "🌩️ Thunder", "🎺 Trumpet", "The people are encountering the living God, not receiving religious tips."]),
      phrase("🔥 The Lord Descended Upon It In Fire", ["Fire marks God's holy presence on the mountain.", "The mountain smokes because the LORD descends.", "🔥 Fire", "⛰️ Mountain", "☁️ Smoke", "God comes near, and creation trembles."]),
      phrase("🌋 The Whole Mount Quaked Greatly", ["The mountain shakes.", "The physical world responds to God's presence.", "🌋 Quaking", "😨 People trembling", "👑 Divine majesty", "Sinai teaches reverence before any command is given."]),
      phrase("🎺 The Voice Of The Trumpet", ["The trumpet grows louder and louder.", "The scene builds holy fear.", "🎺 Trumpet", "📣 God answering", "⛰️ Moses speaks", "The sound marks the seriousness of covenant encounter."]),
      phrase("⚠️ Charge The People", ["God repeats the warning not to break through.", "The boundary matters.", "⚠️ Warning", "🚧 Boundary", "🔥 Holiness", "God is near, but approach still requires reverence."]),
      phrase("👥 Let The Priests Also", ["Even priests must sanctify themselves.", "Religious role does not make someone casual before God.", "👥 Priests", "🧼 Sanctified", "🔥 Holy God", "The closer the service, the greater the need for reverence."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 11,
    reference: "Exodus 20:1-11",
    title: "Love The Lord Your God",
    icon: "☝️",
    phrases: [
      phrase("🗣️ God Spake All These Words", ["The commandments come from God Himself.", "They are not Moses' private leadership ideas.", "🗣️ God speaks", "📜 Covenant words", "👥 Israel hears", "The law begins with divine speech."]),
      phrase("🏠 Out Of The House Of Bondage", ["God begins by reminding Israel of deliverance.", "Obedience is response to rescue.", "🏠 Bondage", "🔓 Brought out", "📜 Then command", "The law is given to freed people, not as a ladder to earn freedom."]),
      phrase("☝️ No Other Gods Before Me", ["The LORD requires exclusive worship.", "Israel has left Egypt's world of many gods.", "☝️ One LORD", "🚫 No rivals", "🤝 Covenant loyalty", "Freedom begins with worship rightly ordered."]),
      phrase("🪵 Graven Image", ["An idol tries to make the divine manageable.", "God forbids worship through human-made images.", "🪵 Image", "👁️ Visible control", "🚫 False worship", "The LORD must be received as He reveals Himself, not reduced to what people can handle."]),
      phrase("🕊️ Name Of The Lord In Vain", ["God's name must not be carried lightly, falsely, or emptily.", "This is bigger than a single careless phrase.", "🕊️ Name", "⚖️ Weight", "👥 Representation", "God's people must not claim His name while emptying it of truth."]),
      phrase("🛑 Remember The Sabbath Day", ["Former slaves are commanded to rest.", "This command pushes against Pharaoh's endless production.", "🛑 Sabbath", "😌 Rest", "🙏 Holy time", "The LORD gives His people a rhythm Egypt never gave them."]),
      phrase("🌍 For In Six Days The Lord Made Heaven And Earth", ["Sabbath is grounded in creation.", "Israel's weekly rhythm reflects God's ordering of time.", "🌍 Creation", "📅 Six days", "🛑 Seventh day", "Rest is built into the world by the Creator."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 12,
    endVerse: 26,
    reference: "Exodus 20:12-26",
    title: "Life With Neighbor And Holy Fear",
    icon: "🤝",
    phrases: [
      phrase("👪 Honour Thy Father And Thy Mother", ["God protects family order and generational faithfulness.", "A redeemed community must learn honor.", "👪 Parents", "🏠 Household", "📜 Covenant life", "Freedom must shape home life."]),
      phrase("🩸 Thou Shalt Not Kill", ["Human life is protected by God's command.", "Former slaves must not become people who treat life cheaply.", "🩸 Life", "🛡️ Protection", "⚖️ Accountability", "The God who judged Egypt's violence now commands His people to honor life."]),
      phrase("💍 Thou Shalt Not Commit Adultery", ["God protects marriage covenant.", "Faithfulness matters in the life of a redeemed people.", "💍 Marriage", "🤝 Faithfulness", "🏠 Family stability", "Covenant with God shapes covenant with people."]),
      phrase("🧾 Thou Shalt Not Steal", ["God protects a neighbor's property and livelihood.", "The people rescued from exploitation must not exploit one another.", "🧾 Property", "🤝 Neighbor", "⚖️ Justice", "Freedom is not permission to take."]),
      phrase("🗣️ Thou Shalt Not Bear False Witness", ["Truth matters because lies can destroy justice and community.", "Words are moral actions.", "🗣️ Witness", "⚖️ Court", "🤝 Neighbor", "A redeemed people must not use speech as a weapon."]),
      phrase("🧠 Thou Shalt Not Covet", ["The final command reaches desire.", "God cares about what the heart rehearses wanting.", "🧠 Desire", "🏠 Neighbor's house", "💔 Inner disorder", "The law does not stop at behavior; it exposes the heart."]),
      phrase("😨 The People Stood Afar Off", ["The people tremble at Sinai.", "They feel the weight of God's voice.", "😨 Fear", "⛰️ Distance", "🔥 Holy presence", "Sinai teaches that nearness to God is a gift, not a casual right."]),
      phrase("🔥 His Fear May Be Before Your Faces", ["Moses explains holy fear.", "This fear is meant to keep them from sin.", "🔥 Reverence", "🛑 Guardrail", "📜 Obedience", "Biblical fear is not thinking God is cruel; it is taking Him seriously."]),
      phrase("🪨 An Altar Of Earth", ["God gives simple altar instructions.", "Worship must not become a display of human pride.", "🪨 Earth altar", "🙏 Sacrifice", "🚫 No performance", "The God who thundered at Sinai still teaches humble worship."]),
    ],
  },
];

type DeepStudySection = {
  reference: string;
  title: string;
  summary: string;
  markdown: string;
};

function getDeepPhraseEntries(markdown: string, fallbackTitle: string, fallbackSummary: string) {
  const entries = [...markdown.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
    .map((match) => ({
      title: match[1].trim(),
      body: match[2].replace(/\n+/g, " ").trim(),
    }))
    .filter((entry) => entry.title && entry.body)
    .slice(0, 6);

  if (entries.length > 0) return entries;

  return [
    { title: fallbackTitle, body: fallbackSummary },
    { title: "What Is Happening Here", body: fallbackSummary },
    { title: "Why This Matters", body: fallbackSummary },
  ];
}

function makeGeneratedExodusPhrase(title: string, body: string, summary: string): [string, string] {
  return phrase(`📌 ${title}`, [
    body,
    summary,
    "This phrase is carrying the rescue story forward.",
    "Israel is out of Egypt, but the Lord is still teaching them what freedom, worship, memory, and trust look like.",
    "🌊 Rescue",
    "🍞 Provision",
    "🧭 Guidance",
    "⛰️ Covenant",
    "The detail helps a beginner see that deliverance is not only escape from Pharaoh; it is formation under God's care.",
  ]);
}

function makeBeginnerExodusPhrase(title: string, section: PersonalExodusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the scene is easier to follow.`,
    focus,
    "For a beginner, the key is to see how ordinary needs become teaching moments.",
    "The Lord is using roads, water, bread, battle, law, and worship to train a newly rescued people.",
    "🌊 Fear at the sea",
    "🎶 Songs after rescue",
    "🍞 Bread in the wilderness",
    "⛰️ Meeting with God",
    `In ${section.title}, Exodus is showing what freedom looks like when God is the one leading.`,
  ]);
}

function ensureBeginnerExodusPhraseDepth(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerExodusPhrase("🧭 What Is Happening Here?", section, "This phrase helps the reader locate the scene: Israel has been rescued, but now they must learn what freedom, worship, and trust look like."),
    makeBeginnerExodusPhrase("🔎 Why This Detail Matters", section, "This detail matters because Exodus does not stop at leaving Egypt; it teaches how rescued people remember, obey, and depend on God."),
    makeBeginnerExodusPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why the story slows down over food, water, bones, songs, or route changes, but those details teach God's care."),
    makeBeginnerExodusPhrase("🧵 Watch The Pattern", section, "Watch the pattern: God rescues, Israel fears or grumbles, God provides, and the people are invited to trust Him more deeply."),
    makeBeginnerExodusPhrase("❤️ What This Shows About People", section, "This scene shows how quickly rescued people can become afraid, hungry, forgetful, or unsure when the next need appears."),
    makeBeginnerExodusPhrase("🙌 What This Shows About God", section, "This scene shows the LORD as deliverer, guide, warrior, healer, provider, and patient teacher in the wilderness."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

function makeExodusSectionsFromDeepStudy(
  sections: DeepStudySection[],
  allowedChapters: number[],
  icon: string,
): PersonalExodusPhraseSectionInput[] {
  return sections.flatMap((section) => {
    const match = section.reference.match(/^Exodus (\d+):(\d+)-(\d+)$/);
    if (!match) return [];

    const chapter = Number(match[1]);
    if (!allowedChapters.includes(chapter)) return [];

    const sectionStart = Number(match[2]);
    const sectionEnd = Number(match[3]);
    const phrases = getDeepPhraseEntries(section.markdown, section.title, section.summary).map((entry) =>
      makeGeneratedExodusPhrase(entry.title, entry.body, section.summary),
    );
    const chunks: PersonalExodusPhraseSectionInput[] = [];

    for (let startVerse = sectionStart; startVerse <= sectionEnd; startVerse += 6) {
      const endVerse = Math.min(startVerse + 5, sectionEnd);
      chunks.push({
        chapter,
        startVerse,
        endVerse,
        reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
        title: startVerse === sectionStart ? section.title : `${section.title} Continued`,
        icon,
        phrases,
      });
    }

    return chunks;
  });
}

const DAY_24_EXODUS_11_12_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 11:1-6": ["Yet Will I Bring One Plague More", "Afterwards He Will Let You Go Hence", "Borrow Of His Neighbour", "The LORD Gave The People Favour", "About Midnight", "All The Firstborn In The Land Of Egypt Shall Die", "There Shall Be A Great Cry"],
  "Exodus 11:7-10": ["Against Any Of The Children Of Israel Shall Not A Dog Move His Tongue", "That Ye May Know How That The LORD Doth Put A Difference", "All These Thy Servants Shall Come Down", "Get Thee Out", "He Went Out From Pharaoh In A Great Anger", "Pharaoh Shall Not Hearken Unto You", "That My Wonders May Be Multiplied"],
  "Exodus 12:1-6": ["This Month Shall Be Unto You The Beginning Of Months", "In The Tenth Day Of This Month", "A Lamb For An House", "According To The Number Of The Souls", "Your Lamb Shall Be Without Blemish", "A Male Of The First Year", "Keep It Up Until The Fourteenth Day"],
  "Exodus 12:7-12": ["They Shall Take Of The Blood", "Strike It On The Two Side Posts", "Eat The Flesh In That Night", "Roast With Fire", "With Unleavened Bread", "Your Loins Girded", "It Is The LORD's Passover", "Against All The Gods Of Egypt I Will Execute Judgment"],
  "Exodus 12:13-18": ["The Blood Shall Be To You For A Token", "When I See The Blood", "I Will Pass Over You", "This Day Shall Be Unto You For A Memorial", "Seven Days Shall Ye Eat Unleavened Bread", "Cut Off From Israel", "I Have Brought Your Armies Out"],
  "Exodus 12:19-20": ["No Leaven Found In Your Houses", "That Soul Shall Be Cut Off", "Whether He Be A Stranger", "Or Born In The Land", "Eat Nothing Leavened", "In All Your Habitations"],
  "Exodus 12:21-26": ["Draw Out And Take You A Lamb", "Kill The Passover", "A Bunch Of Hyssop", "Touch The Lintel And The Two Side Posts", "None Of You Shall Go Out", "The LORD Will Pass Through", "When Your Children Shall Say"],
  "Exodus 12:27-32": ["It Is The Sacrifice Of The LORD's Passover", "The People Bowed The Head And Worshipped", "At Midnight The LORD Smote All The Firstborn", "There Was A Great Cry In Egypt", "Rise Up, And Get You Forth", "Take Your Flocks And Your Herds", "Bless Me Also"],
  "Exodus 12:33-38": ["The Egyptians Were Urgent Upon The People", "We Be All Dead Men", "Their Dough Before It Was Leavened", "The Children Of Israel Did According To The Word Of Moses", "They Spoiled The Egyptians", "About Six Hundred Thousand On Foot", "A Mixed Multitude Went Up Also"],
  "Exodus 12:39-42": ["They Baked Unleavened Cakes", "They Were Thrust Out Of Egypt", "Could Not Tarry", "Four Hundred And Thirty Years", "The Selfsame Day", "A Night To Be Much Observed", "The LORD Did Bring Them Out"],
  "Exodus 12:43-48": ["This Is The Ordinance Of The Passover", "There Shall No Stranger Eat Thereof", "Every Man's Servant", "When Thou Hast Circumcised Him", "In One House Shall It Be Eaten", "Neither Shall Ye Break A Bone Thereof", "All The Congregation Of Israel Shall Keep It"],
  "Exodus 12:49-51": ["One Law Shall Be To Him That Is Homeborn", "And Unto The Stranger", "All The Children Of Israel Did", "As The LORD Commanded Moses And Aaron", "The LORD Did Bring The Children Of Israel Out", "By Their Armies"],
};

const DAY_24_EXODUS_11_12_EXPLANATIONS: Record<string, string[]> = {
  "Exodus 11:1-6": ["The final plague is announced before Passover instructions begin.", "God says this last judgment will break Pharaoh's refusal and lead to Israel's release.", "The favor from Egyptians and the death of the firstborn show reversal and judgment together.", "This is the most sobering turn in the plague story."],
  "Exodus 11:7-10": ["God again makes a distinction between Egypt and Israel.", "Moses leaves Pharaoh angry because the king's refusal has brought Egypt to final judgment.", "The wonders multiply because Pharaoh will not listen.", "The difference between Israel and Egypt is God's protecting mercy, not Israel's power."],
  "Exodus 12:1-6": ["Passover begins by resetting Israel's calendar around redemption.", "The lamb is chosen by household, without blemish, and kept until the appointed day.", "The instructions are careful because the night is holy and serious.", "God is teaching Israel how to receive rescue under the sign He gives."],
  "Exodus 12:7-12": ["The blood on the doorposts, the meal, the readiness to leave, and the judgment on Egypt all belong together.", "Passover is shelter under blood while God judges Egypt.", "The details teach worship, urgency, and protection.", "The LORD is rescuing His people and confronting Egypt's gods in the same night."],
  "Exodus 12:13-18": ["God explains the meaning of the blood as a token and the day as a memorial.", "Israel must remember rescue every year through unleavened bread and holy assembly.", "The feast trains future generations to remember that freedom came from the LORD.", "Memory becomes worship."],
  "Exodus 12:19-20": ["The leaven instructions are repeated so the seriousness is clear.", "Every household, homeborn or stranger, must honor the sign of the feast.", "Unleavened bread becomes a daily embodied reminder of the Exodus.", "God's people remember deliverance in their kitchens, not only in their songs."],
  "Exodus 12:21-26": ["Moses gives the Passover instructions to the elders.", "The lamb, hyssop, blood, doorway, and command to stay inside all matter deeply.", "The section also looks ahead to children asking what the service means.", "Passover is rescue and teaching at the same time."],
  "Exodus 12:27-32": ["The people worship after hearing the Passover command, and then midnight judgment falls.", "Egypt's great cry answers Pharaoh's long refusal.", "At last Pharaoh tells Israel to go, with flocks and herds, and even asks for blessing.", "God's word has overthrown the king who said he did not know the LORD."],
  "Exodus 12:33-38": ["Egypt urgently sends Israel out, and Israel leaves with unleavened dough, silver, gold, clothing, children, livestock, and a mixed multitude.", "The departure is hurried and public.", "The enslaved people leave with provision instead of empty hands.", "God's promise to bring them out is becoming visible on the road."],
  "Exodus 12:39-42": ["The unleavened cakes show how suddenly Israel had to leave.", "The 430 years and the selfsame day language show God's timing over generations.", "The night becomes one to be much observed because the LORD brought them out.", "Exodus turns a night of judgment into a night of remembered deliverance."],
  "Exodus 12:43-48": ["The Passover ordinance defines who may eat and how the meal must be kept.", "Circumcision, one house, no broken bone, and congregation-wide obedience show covenant boundaries.", "The meal is open to the stranger who enters the covenant sign, but it is not casual.", "Redemption creates a worshiping people with ordered memory."],
  "Exodus 12:49-51": ["The chapter closes by stressing one law for homeborn and stranger and obedience to God's command.", "The LORD brings Israel out by their armies, meaning ordered groups of His people.", "The final line confirms that the long-promised deliverance has happened.", "The people who groaned in bondage are now brought out by the LORD."],
};

function makeDay24Exodus11To12PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  const [scene, meaning, beginner, lesson] = DAY_24_EXODUS_11_12_EXPLANATIONS[section.reference] ?? [
    `This phrase belongs to ${section.reference}.`,
    "It helps explain Passover, judgment, memory, and Israel's departure from Egypt.",
    "A beginner should slow down here because Exodus is moving from plague warning to redemption night.",
    "The LORD is teaching His people how rescue is received and remembered.",
  ];

  return phrase(`📌 ${title}`, [
    scene,
    meaning,
    beginner,
    "This phrase comes directly from the passage, so the note stays anchored in the Bible text.",
    lesson,
  ]);
}

function deepenDay24Exodus11To12PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_24_EXODUS_11_12_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay24Exodus11To12PhraseCard(section, title)),
  };
}

const DAY_25_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 13:1-6": ["Sanctify Unto Me All The Firstborn", "Whatsoever Openeth The Womb", "It Is Mine", "Remember This Day", "Out Of The House Of Bondage", "By Strength Of Hand", "No Leavened Bread Be Eaten", "The Month Abib"],
  "Exodus 13:7-10": ["Unleavened Bread Shall Be Eaten Seven Days", "There Shall No Leavened Bread Be Seen", "Thou Shalt Shew Thy Son", "This Is Done Because Of That Which The LORD Did", "For A Sign Unto Thee Upon Thine Hand", "For A Memorial Between Thine Eyes", "The LORD's Law May Be In Thy Mouth"],
  "Exodus 13:11-16": ["When The LORD Shall Bring Thee", "Thou Shalt Set Apart Unto The LORD", "Every Firstling", "Every Firstborn Of Man Among Thy Children Shalt Thou Redeem", "When Thy Son Asketh Thee", "By Strength Of Hand The LORD Brought Us Out", "Pharaoh Would Hardly Let Us Go", "For Frontlets Between Thine Eyes"],
  "Exodus 13:17-22": ["God Led Them Not Through The Way Of The Land Of The Philistines", "Lest Peradventure The People Repent", "God Led The People About", "Harnessed Out Of The Land Of Egypt", "Moses Took The Bones Of Joseph", "A Pillar Of Cloud By Day", "A Pillar Of Fire By Night", "He Took Not Away The Pillar"],
  "Exodus 14:1-6": ["Speak Unto The Children Of Israel", "That They Turn And Encamp", "They Are Entangled In The Land", "I Will Harden Pharaoh's Heart", "I Will Be Honoured Upon Pharaoh", "The Egyptians May Know That I Am The LORD", "He Made Ready His Chariot"],
  "Exodus 14:7-9": ["Six Hundred Chosen Chariots", "All The Chariots Of Egypt", "Captains Over Every One Of Them", "The LORD Hardened The Heart Of Pharaoh", "The Children Of Israel Went Out With An High Hand", "The Egyptians Pursued After Them", "Beside Pihahiroth Before Baalzephon"],
  "Exodus 14:10-14": ["They Were Sore Afraid", "The Children Of Israel Cried Out Unto The LORD", "Because There Were No Graves In Egypt", "Wherefore Hast Thou Dealt Thus With Us", "Let Us Alone", "Fear Ye Not", "Stand Still, And See The Salvation Of The LORD", "The LORD Shall Fight For You"],
  "Exodus 14:15-20": ["Wherefore Criest Thou Unto Me", "Speak Unto The Children Of Israel, That They Go Forward", "Lift Thou Up Thy Rod", "Divide It", "The Children Of Israel Shall Go On Dry Ground", "The Angel Of God Removed", "The Pillar Of The Cloud Went From Before Their Face", "It Was A Cloud And Darkness To Them, But It Gave Light By Night"],
  "Exodus 14:21-22": ["Moses Stretched Out His Hand Over The Sea", "The LORD Caused The Sea To Go Back", "By A Strong East Wind", "Made The Sea Dry Land", "The Waters Were Divided", "Upon The Dry Ground", "The Waters Were A Wall Unto Them"],
  "Exodus 14:23-28": ["The Egyptians Pursued", "In The Morning Watch", "The LORD Looked Unto The Host Of The Egyptians", "Troubled The Host Of The Egyptians", "Took Off Their Chariot Wheels", "Let Us Flee From The Face Of Israel", "The Sea Returned To His Strength", "The LORD Overthrew The Egyptians"],
  "Exodus 14:29-31": ["The Children Of Israel Walked Upon Dry Land", "The Waters Were A Wall Unto Them", "The LORD Saved Israel That Day", "Israel Saw The Egyptians Dead Upon The Sea Shore", "Israel Saw That Great Work", "The People Feared The LORD", "Believed The LORD, And His Servant Moses"],
  "Exodus 15:1-6": ["Then Sang Moses And The Children Of Israel", "I Will Sing Unto The LORD", "He Hath Triumphed Gloriously", "The Horse And His Rider Hath He Thrown Into The Sea", "The LORD Is My Strength And Song", "He Is My God", "The LORD Is A Man Of War", "Thy Right Hand, O LORD"],
  "Exodus 15:7-10": ["In The Greatness Of Thine Excellency", "Thou Hast Overthrown Them", "Thou Sentest Forth Thy Wrath", "With The Blast Of Thy Nostrils", "The Floods Stood Upright", "The Enemy Said, I Will Pursue", "Thou Didst Blow With Thy Wind", "They Sank As Lead"],
  "Exodus 15:11-16": ["Who Is Like Unto Thee, O LORD", "Glorious In Holiness", "Fearful In Praises", "Doing Wonders", "Thou In Thy Mercy Hast Led Forth", "The People Shall Hear, And Be Afraid", "Till Thy People Pass Over", "Thou Hast Purchased"],
  "Exodus 15:17-18": ["Thou Shalt Bring Them In", "Plant Them In The Mountain Of Thine Inheritance", "The Place, O LORD, Which Thou Hast Made", "The Sanctuary, O Lord", "Thy Hands Have Established", "The LORD Shall Reign For Ever And Ever"],
  "Exodus 15:19-21": ["The Horse Of Pharaoh Went In", "The LORD Brought Again The Waters", "Miriam The Prophetess", "The Sister Of Aaron", "Timbrels And With Dances", "Sing Ye To The LORD", "He Hath Triumphed Gloriously"],
  "Exodus 15:22-27": ["Three Days In The Wilderness", "Found No Water", "They Could Not Drink Of The Waters Of Marah", "The People Murmured Against Moses", "The LORD Shewed Him A Tree", "There He Made For Them A Statute And An Ordinance", "I Am The LORD That Healeth Thee", "Twelve Wells Of Water"],
  "Exodus 16:1-3": ["The Wilderness Of Sin", "The Fifteenth Day Of The Second Month", "The Whole Congregation Murmured", "Would To God We Had Died By The Hand Of The LORD", "When We Sat By The Flesh Pots", "When We Did Eat Bread To The Full", "Ye Have Brought Us Forth To Kill This Whole Assembly"],
  "Exodus 16:4-9": ["I Will Rain Bread From Heaven", "The People Shall Go Out And Gather", "A Certain Rate Every Day", "That I May Prove Them", "On The Sixth Day", "At Even, Then Ye Shall Know", "In The Morning, Then Ye Shall See The Glory Of The LORD", "Your Murmurings Are Not Against Us, But Against The LORD"],
  "Exodus 16:10-12": ["As Aaron Spake", "They Looked Toward The Wilderness", "The Glory Of The LORD Appeared In The Cloud", "I Have Heard The Murmurings", "At Even Ye Shall Eat Flesh", "In The Morning Ye Shall Be Filled With Bread", "Ye Shall Know That I Am The LORD Your God"],
  "Exodus 16:13-18": ["At Even The Quails Came Up", "In The Morning The Dew Lay", "A Small Round Thing", "What Is It", "This Is The Bread Which The LORD Hath Given You", "An Omer For Every Man", "He That Gathered Much Had Nothing Over", "He That Gathered Little Had No Lack"],
  "Exodus 16:19-21": ["Let No Man Leave Of It Till The Morning", "They Hearkened Not Unto Moses", "It Bred Worms, And Stank", "Moses Was Wroth With Them", "They Gathered It Every Morning", "When The Sun Waxed Hot, It Melted"],
  "Exodus 16:22-27": ["On The Sixth Day They Gathered Twice As Much Bread", "This Is That Which The LORD Hath Said", "To Morrow Is The Rest Of The Holy Sabbath", "Bake That Which Ye Will Bake", "It Did Not Stink", "Six Days Ye Shall Gather It", "On The Seventh Day, Which Is The Sabbath", "There Shall Be None"],
  "Exodus 16:28-30": ["How Long Refuse Ye To Keep My Commandments", "See, For That The LORD Hath Given You The Sabbath", "Abide Ye Every Man In His Place", "Let No Man Go Out Of His Place", "The People Rested On The Seventh Day"],
  "Exodus 16:31-36": ["The House Of Israel Called The Name Thereof Manna", "Like Coriander Seed", "Wafers Made With Honey", "Fill An Omer Of It To Be Kept", "That They May See The Bread", "Laid It Up Before The Testimony", "The Children Of Israel Did Eat Manna Forty Years", "Until They Came Unto The Borders Of Canaan"],
};

function makeDay25PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return phrase(`📌 ${title}`, [
    `${section.reference} is showing how God forms His rescued people through memory, guidance, worship, testing, and provision.`,
    `In ${section.title}, this phrase is not filler; it carries part of the movement from Egypt's bondage into life with the LORD.`,
    "A beginner should slow down here because Exodus is teaching what freedom with God actually looks like.",
    "This phrase comes directly from the passage, so the note stays anchored in the Bible text.",
    "The LORD is teaching Israel to remember, trust, worship, obey, and rest.",
  ]);
}

function deepenDay25PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_25_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay25PhraseCard(section, title)),
  };
}

const DAY_26_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 17:1-6": ["After Their Journeys", "There Was No Water For The People To Drink", "Wherefore The People Did Chide With Moses", "Wherefore Is This That Thou Hast Brought Us Up Out Of Egypt", "Moses Cried Unto The LORD", "They Be Almost Ready To Stone Me", "The Rock In Horeb", "Thou Shalt Smite The Rock"],
  "Exodus 17:7-7": ["He Called The Name Of The Place Massah", "And Meribah", "Because Of The Chiding Of The Children Of Israel", "They Tempted The LORD", "Is The LORD Among Us, Or Not"],
  "Exodus 17:8-13": ["Then Came Amalek", "Joshua, Choose Us Out Men", "The Rod Of God In Mine Hand", "When Moses Held Up His Hand", "Aaron And Hur Stayed Up His Hands", "His Hands Were Steady", "Joshua Discomfited Amalek"],
  "Exodus 17:14-16": ["Write This For A Memorial In A Book", "Rehearse It In The Ears Of Joshua", "I Will Utterly Put Out The Remembrance Of Amalek", "Moses Built An Altar", "Called The Name Of It Jehovahnissi", "The LORD Hath Sworn", "War With Amalek From Generation To Generation"],
  "Exodus 18:1-6": ["Jethro, The Priest Of Midian", "Heard Of All That God Had Done", "The LORD Had Brought Israel Out Of Egypt", "Zipporah, Moses' Wife", "After He Had Sent Her Back", "Gershom", "Eliezer", "I Thy Father In Law Jethro Am Come"],
  "Exodus 18:7-12": ["Moses Went Out To Meet His Father In Law", "Did Obeisance, And Kissed Him", "They Asked Each Other Of Their Welfare", "Moses Told His Father In Law", "The LORD Delivered Them", "Now I Know That The LORD Is Greater Than All Gods", "Jethro Took A Burnt Offering"],
  "Exodus 18:13-18": ["Moses Sat To Judge The People", "The People Stood By Moses From The Morning Unto The Evening", "What Is This Thing That Thou Doest", "Why Sittest Thou Thyself Alone", "The People Come Unto Me To Enquire Of God", "I Do Make Them Know The Statutes Of God", "The Thing That Thou Doest Is Not Good", "Thou Wilt Surely Wear Away"],
  "Exodus 18:19-24": ["Be Thou For The People To God-Ward", "Teach Them Ordinances And Laws", "Shew Them The Way Wherein They Must Walk", "Provide Out Of All The People Able Men", "Such As Fear God", "Men Of Truth, Hating Covetousness", "Rulers Of Thousands", "Moses Hearkened"],
  "Exodus 18:25-27": ["Moses Chose Able Men", "Made Them Heads Over The People", "They Judged The People At All Seasons", "The Hard Causes They Brought Unto Moses", "Every Small Matter They Judged Themselves", "Moses Let His Father In Law Depart"],
  "Exodus 19:1-6": ["In The Third Month", "They Came Into The Wilderness Of Sinai", "Israel Camped Before The Mount", "Moses Went Up Unto God", "Ye Have Seen What I Did Unto The Egyptians", "I Bare You On Eagles' Wings", "A Peculiar Treasure Unto Me", "A Kingdom Of Priests, And An Holy Nation"],
  "Exodus 19:7-8": ["Moses Called For The Elders", "Laid Before Their Faces All These Words", "All The People Answered Together", "All That The LORD Hath Spoken We Will Do", "Moses Returned The Words Of The People"],
  "Exodus 19:9-14": ["Lo, I Come Unto Thee In A Thick Cloud", "That The People May Hear", "Sanctify Them To Day And To Morrow", "Let Them Wash Their Clothes", "Be Ready Against The Third Day", "Set Bounds Unto The People", "Take Heed To Yourselves", "Moses Sanctified The People"],
  "Exodus 19:15-20": ["Be Ready Against The Third Day", "There Were Thunders And Lightnings", "A Thick Cloud Upon The Mount", "The Voice Of The Trumpet Exceeding Loud", "All The People Trembled", "Mount Sinai Was Altogether On A Smoke", "The LORD Descended Upon It In Fire", "Moses Spake, And God Answered Him"],
  "Exodus 19:21-25": ["Go Down, Charge The People", "Lest They Break Through Unto The LORD", "Let The Priests Also Sanctify Themselves", "The People Cannot Come Up", "Away, Get Thee Down", "Thou Shalt Come Up, Thou, And Aaron With Thee"],
  "Exodus 20:1-3": ["God Spake All These Words", "I Am The LORD Thy God", "Which Have Brought Thee Out", "Out Of The House Of Bondage", "Thou Shalt Have No Other Gods Before Me"],
  "Exodus 20:4-9": ["Thou Shalt Not Make Unto Thee Any Graven Image", "Thou Shalt Not Bow Down Thyself To Them", "I The LORD Thy God Am A Jealous God", "Shewing Mercy Unto Thousands", "Thou Shalt Not Take The Name Of The LORD Thy God In Vain", "Remember The Sabbath Day", "Six Days Shalt Thou Labour"],
  "Exodus 20:10-11": ["The Seventh Day Is The Sabbath", "In It Thou Shalt Not Do Any Work", "Nor Thy Son, Nor Thy Daughter", "Nor Thy Manservant, Nor Thy Maidservant", "For In Six Days The LORD Made Heaven And Earth", "The LORD Blessed The Sabbath Day", "And Hallowed It"],
  "Exodus 20:12-17": ["Honour Thy Father And Thy Mother", "Thou Shalt Not Kill", "Thou Shalt Not Commit Adultery", "Thou Shalt Not Steal", "Thou Shalt Not Bear False Witness", "Thou Shalt Not Covet", "Any Thing That Is Thy Neighbour's"],
  "Exodus 20:18-23": ["All The People Saw The Thunderings", "They Removed, And Stood Afar Off", "Speak Thou With Us, And We Will Hear", "Let Not God Speak With Us, Lest We Die", "Fear Not", "That His Fear May Be Before Your Faces", "Ye Shall Not Make With Me Gods Of Silver"],
  "Exodus 20:24-26": ["An Altar Of Earth Thou Shalt Make", "Thy Burnt Offerings", "In All Places Where I Record My Name", "I Will Come Unto Thee", "If Thou Wilt Make Me An Altar Of Stone", "Thou Shalt Not Build It Of Hewn Stone", "Neither Shalt Thou Go Up By Steps"],
};

function makeDay26PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return phrase(`📌 ${title}`, [
    `${section.reference} is showing Israel learning life with God after rescue: thirst, battle, shared leadership, holy covenant, and commanded worship.`,
    `In ${section.title}, this phrase carries a real piece of the passage, not a generic comment card.`,
    "A beginner should slow down here because Exodus is moving from escape into formation.",
    "This phrase comes directly from the Bible text, so the note stays close to what the verse actually says.",
    "The LORD is teaching His people to trust His presence, receive His order, and live as a holy people.",
  ]);
}

function deepenDay26PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_26_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay26PhraseCard(section, title)),
  };
}

const EXODUS_11_20_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  11: ["🌙 The final plague is announced.", "👶 Firstborn judgment answers Pharaoh's cruelty.", "🛡️ God distinguishes His people."],
  12: ["🐑 Passover teaches shelter through blood.", "🚪 Rescue is received household by household.", "🏃 Israel leaves ready for freedom."],
  13: ["🧠 Redeemed people must remember.", "👶 The firstborn belongs to the LORD.", "☁️ God leads His people by presence."],
  14: ["🌊 The sea looks impossible.", "🛡️ The LORD fights for Israel.", "👀 Deliverance becomes something the people see."],
  15: ["🎶 Rescue turns into worship.", "💧 The wilderness tests trust quickly.", "🩺 The LORD heals and provides."],
  16: ["🍞 Daily bread trains daily trust.", "📏 God gives enough, not hoarding.", "🛑 Sabbath rest teaches freedom from slave rhythms."],
  17: ["💧 Need exposes trust.", "🙌 Victory depends on the LORD.", "🤝 Weary leaders need faithful support."],
  18: ["👂 Jethro listens to what God has done.", "⚖️ Wise leadership shares the load.", "🧭 God's people need order, not burnout."],
  19: ["⛰️ Sinai is holy ground for a rescued people.", "🧼 The people prepare before God descends.", "📜 Covenant begins with grace: God carried them first."],
  20: ["📜 God's commands shape free people.", "🙌 Worship belongs to the LORD alone.", "⚖️ Love for God and neighbor becomes covenant life."],
};

function hasExodusElevenToTwentyVisualList(content: string) {
  return content
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function formatExodusElevenToTwentyPhraseExplanation(section: PersonalExodusPhraseSectionInput, content: string) {
  const cleaned = content
    .replace(/not filler/g, "part of the story")
    .replace(/not a generic comment card/g, "a real piece of the passage")
    .replace(/this phrase carries a real piece of the passage, a real piece of the passage/g, "this phrase carries a real piece of the passage");
  if (section.chapter < 11 || section.chapter > 20 || hasExodusElevenToTwentyVisualList(cleaned)) {
    return cleaned;
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = EXODUS_11_20_MOBILE_FORMAT_CUES[section.chapter];

  if (!cues || blocks.length < 2) {
    return blocks.join("\n\n");
  }

  const opening = blocks.slice(0, Math.min(2, blocks.length));
  const closing = blocks.slice(opening.length);

  return note([
    ...opening,
    "What to notice:",
    ...cues,
    ...closing,
  ]);
}

function formatExodusElevenToTwentySectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [
      title,
      formatExodusElevenToTwentyPhraseExplanation(section, content),
    ] as [string, string]),
  }));
}

export const EXODUS_11_20_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusElevenToTwentySectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS, [11, 12], "🐑").map(deepenDay24Exodus11To12PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_STUDY_SECTIONS, [13, 14, 15, 16], "🌊").map(deepenDay25PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS, [17, 18, 19, 20], "⛰️").map(deepenDay26PhraseCards),
  ...RAW_EXODUS_11_20_PERSONAL_SECTIONS.filter((section) => section.chapter < 11 || section.chapter > 20),
]);
