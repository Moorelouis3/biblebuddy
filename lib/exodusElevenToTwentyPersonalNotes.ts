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

function makeDay24Exodus11To12PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay24Exodus11To12Phrase(section, title)];
}

function explainDay24Exodus11To12Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("one plague more")) {
    add(`${title} announces that Pharaoh's long refusal is reaching its final judgment.`, "God has warned Pharaoh again and again.", "Now one last plague will break the grip of Egypt.", "🌙 Final night", "⚠️ Last warning", "🚪 Release coming", "Deliverance for Israel will come through judgment on Egypt.");
  } else if (lower.includes("afterwards") || lower.includes("go hence")) {
    add(`${title} means Israel's release is now certain.`, "Pharaoh has refused every command so far.", "But God says the next act will force the door open.", "🚪 Way out", "⏳ Almost time", "👑 Pharaoh's grip breaking", "God is declaring what will happen.");
  } else if (lower.includes("borrow") || lower.includes("favour") || lower.includes("spoiled")) {
    add(`${title} shows God sending enslaved Israel out with provision.`, "The people who were exploited in Egypt will not leave empty-handed.", "Silver, gold, and clothing become signs of reversal.", "💍 Silver and gold", "👕 Clothing", "⚖️ Justice and reversal", "God's rescue includes care for the journey ahead.");
  } else if (lower.includes("midnight")) {
    add(`${title} gives the final plague an appointed hour.`, "Midnight makes the moment feel solemn and unmistakable.", "Egypt will learn that the LORD rules timing as surely as He rules the river, sky, and land.", "🌙 Night", "⏰ Appointed time", "⚖️ Judgment", "The darkness of the hour matches the seriousness of what is coming.");
  } else if (lower.includes("firstborn")) {
    add(`${title} names the heartbreaking reach of the final plague.`, "The firstborn represented a family's future, inheritance, and strength.", "Pharaoh once attacked Israel's sons; now judgment reaches Egypt's households.", "👶 Firstborn", "🏠 Household", "💔 Deep grief", "This is one of the most sobering places in Exodus.");
  } else if (lower.includes("great cry")) {
    add(`${title} describes the grief that will fill Egypt after the final plague.`, "Earlier Israel groaned under slavery.", "Now Egypt cries out under judgment.", "😭 Cry", "🏠 Every household touched", "⚖️ Pharaoh's cruelty answered", "The sound of Egypt's grief shows that Pharaoh's rebellion has brought suffering on his own people.");
  } else if (lower.includes("dog move his tongue")) {
    add(`${title} is a vivid way of saying Israel will be completely protected.`, "Not even a dog will bark against them.", "The picture is ordinary, but the meaning is powerful.", "🔇 No barking", "🛡️ Protected homes", "✅ Complete difference", "God can keep His people in peace while Egypt is judged.");
  } else if (lower.includes("put a difference")) {
    add(`${title} explains that God can judge Egypt and shelter Israel at the same time.`, "The difference is not Israel's military power or moral greatness.", "It is the LORD's protecting mercy.", "⚖️ Distinction", "🏠 Israel sheltered", "🌍 Egypt judged", "The Exodus rescue is precise, not chaotic.");
  } else if (lower.includes("servants shall come down") || lower.includes("get thee out")) {
    add(`${title} pictures Pharaoh's officials begging Israel to leave.`, "The people who once served Pharaoh's command will soon plead for the Hebrews to go.", "God reverses the power scene.", "🙇 Servants come down", "🚪 Leave now", "🔁 Reversal", "The king who would not listen will watch his own household push toward release.");
  } else if (lower.includes("great anger")) {
    add(`${title} shows Moses leaving Pharaoh with holy seriousness.`, "Pharaoh's refusal has endangered the whole land.", "Moses understands that final judgment is now near.", "🔥 Anger", "📣 Warning rejected", "⚖️ Judgment near", "Stubborn sin should grieve and anger God's messenger.");
  } else if (lower.includes("not hearken") || lower.includes("wonders may be multiplied")) {
    add(`${title} reminds the reader that Pharaoh's refusal will not stop God's plan.`, "His hard heart makes the judgment story longer, but not stronger than God.", "The LORD will use even Pharaoh's resistance to display His power.", "🔒 Refusal", "⚡ Wonders", "🌍 God's name made known", "The king's no becomes the stage where God's authority is seen more clearly.");
  } else if (lower.includes("beginning of months")) {
    add(`${title} means Israel's calendar is being rebuilt around redemption.`, "God makes their rescue the starting point for how they count sacred time.", "Their year will now remember the night He brought them out.", "📅 New calendar", "🚪 New beginning", "🙌 Rescue remembered", "Freedom becomes the center of Israel's worship rhythm.");
  } else if (lower.includes("tenth day") || lower.includes("fourteenth day")) {
    add(`${title} shows that Passover preparation had an exact timetable.`, "The lamb was chosen before the night it was killed.", "The waiting period made the rescue feel deliberate and serious.", "📅 Tenth day", "🐑 Lamb selected", "⏳ Fourteenth day", "God teaches Israel to receive deliverance carefully, not casually.");
  } else if (lower.includes("lamb") || lower.includes("without blemish") || lower.includes("male of the first year")) {
    add(`${title} describes the Passover sacrifice God required.`, "The lamb was not random leftovers from the flock.", "It had to be whole, fitting, and set apart for this holy night.", "🐑 Lamb", "✅ Without blemish", "🏠 For the household", "Rescue comes through the sign God provides.");
  } else if (lower.includes("number of the souls") || lower.includes("house")) {
    add(`${title} shows Passover happening household by household.`, "God's rescue reaches families, tables, doors, and ordinary homes.", "No household is meant to treat the night lightly.", "🏠 House", "👪 Family", "🍽️ Shared meal", "The Exodus is national rescue received in real homes.");
  } else if (lower.includes("blood") || lower.includes("side posts") || lower.includes("lintel")) {
    add(`${title} points to the visible sign of shelter during judgment.`, "The blood marked the doorway of the house.", "The family inside was safe because they obeyed the sign God gave.", "🩸 Blood", "🚪 Doorway", "🛡️ Shelter", "Passover teaches rescue by trusting God's provided way.");
  } else if (lower.includes("eat the flesh") || lower.includes("roast with fire")) {
    add(`${title} keeps the Passover lamb connected to a real meal.`, "Israel did not only mark the door and stand back.", "They ate the lamb as people ready to leave Egypt.", "🐑 Lamb", "🔥 Roasted", "🍽️ Meal", "The rescue night includes shelter, worship, and readiness all together.");
  } else if (lower.includes("unleavened") || lower.includes("leaven") || lower.includes("dough") || lower.includes("cakes")) {
    add(`${title} teaches Israel to remember the hurry of their departure.`, "Leaven makes dough rise, but Israel would leave too quickly for normal bread-making.", "The simple bread became a yearly reminder of rescue.", "🍞 Bread", "🏃 Haste", "📅 Remember every year", "God placed memory into ordinary food so families could taste the story again.");
  } else if (lower.includes("loins girded")) {
    add(`${title} means the people were dressed and ready to move.`, "Long garments had to be tucked up for travel or work.", "Passover was not a slow dinner for people settling into Egypt.", "👞 Shoes on", "🧥 Clothes ready", "🏃 Ready to leave", "The meal trained Israel to eat as people whose freedom was about to begin.");
  } else if (lower.includes("lord's passover")) {
    add(`${title} gives the night its name and meaning.`, "The LORD is the One who passes over the marked houses while judging Egypt.", "Israel is not saved because their homes are nicer or stronger.", "🛡️ Passed over", "🩸 Blood sign", "🙌 The LORD saves", "The name keeps the focus on God's mercy and command.");
  } else if (lower.includes("gods of egypt")) {
    add(`${title} explains that the final plague is also a judgment against Egypt's false gods.`, "Egypt trusted many gods connected to life, death, fertility, kingship, and protection.", "The LORD shows that none of them can shield Egypt from Him.", "🏛️ Egypt's gods", "⚖️ Judgment", "👑 Pharaoh humbled", "The LORD exposes every false refuge.");
  } else if (lower.includes("token") || lower.includes("when i see the blood") || lower.includes("pass over you")) {
    add(`${title} explains how the blood sign functioned on Passover night.`, "God promised to see the blood and pass over that house.", "The safety of the family rested on God's word attached to God's sign.", "🩸 Blood seen", "🚪 House marked", "✅ Judgment passes over", "The point is trusting and obeying the rescue God commanded.");
  } else if (lower.includes("memorial") || lower.includes("children") || lower.includes("observed")) {
    add(`${title} shows that Exodus was meant to be taught and remembered.`, "God did not want the rescue to become an old story nobody understood.", "He built memory into meals, questions, calendars, and family teaching.", "👶 Children ask", "📖 Parents explain", "🕯️ Worship remembers", "Bible faith keeps telling the next generation what the LORD has done.");
  } else if (lower.includes("seven days") || lower.includes("cut off") || lower.includes("soul shall be cut off")) {
    add(`${title} shows the seriousness of the feast after Passover night.`, "Israel was not free to treat God's memorial however they wanted.", "The command shaped the whole community's worship.", "📅 Seven days", "🚫 No leaven", "⚠️ Serious command", "God's rescue creates a people who remember Him with obedience.");
  } else if (lower.includes("armies")) {
    add(`${title} describes Israel leaving Egypt in ordered groups under God's command.`, "They are not a mob escaping by luck.", "The enslaved people are being formed into the LORD's organized people.", "🚶 People moving", "🏕️ Ordered groups", "🙌 Led by God", "The word helps readers see dignity and purpose in the Exodus departure.");
  } else if (lower.includes("stranger") || lower.includes("born in the land") || lower.includes("homeborn")) {
    add(`${title} shows that Passover had covenant boundaries and a place for outsiders who joined Israel's sign.`, "A stranger could not treat the meal casually.", "But the law made room for the stranger who entered the covenant through circumcision.", "🏠 Homeborn", "🧍 Stranger", "📜 One covenant order", "God's people are distinct, but His mercy is not limited to one family line only.");
  } else if (lower.includes("habitations")) {
    add(`${title} brings the command into every place Israel lives.`, "Passover was not only for one public ceremony.", "The memory of rescue had to shape households wherever God's people settled.", "🏠 Homes", "🍞 Food practice", "📅 Ongoing remembrance", "God wanted the Exodus story to live in daily spaces.");
  } else if (lower.includes("draw out") || lower.includes("kill the passover")) {
    add(`${title} is Moses turning God's command into action for the elders of Israel.`, "The lamb must be selected and killed just as the LORD said.", "Obedience now matters because judgment night is near.", "🐑 Lamb taken", "🩸 Sacrifice", "⏳ Night approaching", "Faith is shown by doing what God said before the danger passes.");
  } else if (lower.includes("hyssop")) {
    add(`${title} names the plant used to apply the blood to the doorway.`, "Hyssop was a small plant used for sprinkling or applying liquid in Bible rituals.", "Here it carries the blood to the lintel and side posts.", "🌿 Hyssop", "🩸 Blood applied", "🚪 Door marked", "A simple plant becomes part of the visible sign of God's protection.");
  } else if (lower.includes("none of you shall go out")) {
    add(`${title} teaches that the marked house was the place of safety.`, "The people were not told to wander outside and test danger.", "They were to stay under the shelter God provided.", "🏠 Stay inside", "🩸 Blood-marked door", "🛡️ Protection", "Obedience meant remaining where God's mercy had placed them.");
  } else if (lower.includes("bowed") || lower.includes("worshipped")) {
    add(`${title} shows Israel responding to God's Passover command with reverence.`, "Before the rescue is fully visible, the people bow and worship.", "They receive God's word as true and holy.", "🙇 Bowed heads", "🙌 Worship", "📜 Trusted command", "Worship begins before the road out of Egypt opens.");
  } else if (lower.includes("smote")) {
    add(`${title} describes the LORD carrying out the final judgment exactly as warned.`, "The plague is not accidental tragedy.", "It is the promised judgment after Pharaoh's repeated refusal.", "🌙 Midnight", "⚖️ Judgment", "💔 Egypt struck", "The moment shows the weight of resisting God's word.");
  } else if (lower.includes("rise up") || lower.includes("get you forth")) {
    add(`${title} is Pharaoh finally commanding Israel to leave.`, "The king who kept saying no now tells them to go.", "God has broken the hold of Egypt.", "🚪 Go out", "👑 Pharaoh yields", "🏃 Departure begins", "The release comes because the LORD acted, not because Pharaoh became generous.");
  } else if (lower.includes("flocks") || lower.includes("herds")) {
    add(`${title} shows Pharaoh surrendering the compromise he tried to keep earlier.`, "He had wanted to hold Israel's animals back.", "Now he tells them to take the flocks and herds too.", "🐐 Flocks", "🐄 Herds", "🚫 No more bargaining", "God's command wins over Pharaoh's attempt to control Israel's worship.");
  } else if (lower.includes("bless me also")) {
    add(`${title} is a striking request from Pharaoh after judgment falls.`, "The king who dismissed the LORD now asks Moses for blessing.", "But the request comes after terrible loss and long resistance.", "👑 Humbled king", "🙏 Bless me", "💔 Too late to avoid the plague", "Pharaoh's words show defeat more than true worship.");
  } else if (lower.includes("urgent") || lower.includes("dead men") || lower.includes("thrust out") || lower.includes("could not tarry")) {
    add(`${title} captures the sudden pressure to leave Egypt immediately.`, "Egypt wants Israel gone because the judgment has become unbearable.", "The departure is not calm or leisurely.", "🏃 Hurry", "🚪 Forced out", "🍞 No time for bread to rise", "God's promised rescue arrives with urgency after years of bondage.");
  } else if (lower.includes("six hundred thousand") || lower.includes("mixed multitude")) {
    add(`${title} shows the size and variety of the people leaving Egypt.`, "Israel's departure is massive, and others go with them too.", "The Exodus is no hidden escape by a few people.", "👥 Great crowd", "🚶 On foot", "🧍 Mixed multitude", "God's rescue is public, visible, and bigger than one household.");
  } else if (lower.includes("four hundred and thirty") || lower.includes("selfsame day")) {
    add(`${title} shows God's timing over many generations.`, "The years in Egypt did not make God forget His promise.", "On the exact day appointed, He brought His people out.", "⏳ Long waiting", "📅 Exact timing", "✅ Promise kept", "God's delays are not the same as God's absence.");
  } else if (lower.includes("ordinance") || lower.includes("stranger eat") || lower.includes("servant") || lower.includes("circumcised") || lower.includes("congregation")) {
    add(`${title} gives covenant boundaries for who may share the Passover meal.`, "The meal is holy because it remembers holy rescue.", "Outsiders and servants are not ignored, but they must enter the covenant sign before eating.", "📜 Ordinance", "🔪 Circumcision sign", "🍽️ Holy meal", "God's welcome has order because Passover belongs to His redeemed people.");
  } else if (lower.includes("one house")) {
    add(`${title} keeps the Passover meal gathered and whole.`, "The lamb was not to be treated casually or scattered around.", "The household setting helped preserve the meaning of the meal.", "🏠 One house", "🐑 One lamb", "🍽️ Shared meal", "The rescue story was meant to be remembered together.");
  } else if (lower.includes("break a bone")) {
    add(`${title} protects the wholeness of the Passover lamb.`, "The lamb was eaten according to God's instruction, not handled however people wanted.", "Later readers also connect this language with the suffering of Jesus, the true Passover Lamb.", "🐑 Lamb kept whole", "📜 Careful command", "✝️ Later Bible connection", "Even small details in Passover teach reverence for God's rescue.");
  } else if (lower.includes("one law")) {
    add(`${title} teaches that the same covenant rule applies to Israelite and joined stranger.`, "God does not create one holy standard for insiders and another for outsiders who join them.", "The worshiping community is ordered under one command.", "📜 One law", "🏠 Homeborn", "🧍 Stranger", "The line holds together holiness, welcome, and obedience.");
  } else if (lower.includes("as the lord commanded") || lower.includes("did bring")) {
    add(`${title} closes the chapter by showing God's word fulfilled in action.`, "Israel does what the LORD commanded, and the LORD brings them out.", "The long rescue promise is no longer only spoken; it is happening on the road.", "✅ Command obeyed", "🚪 Brought out", "🙌 The LORD saves", "Obedience and deliverance stand together.");
  } else {
    add(`${title} keeps the reader close to the Passover wording.`, "The surrounding verses move through final judgment, blood-marked shelter, worship, memory, and departure.", "📖 Bible text", "🔍 Slow reading", "🧠 Beginner understanding", "The goal is to let the actual words teach the rescue story.");
  }

  return note(lines.slice(0, 8));
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
  "Exodus 16:28-30": ["How Long Refuse Ye To Keep My Commandments", "See, For That The LORD Hath Given You The Sabbath", "Abide Ye Every Man In His Place", "Let No Man Go Out Of His Place", "On The Seventh Day", "The People Rested On The Seventh Day"],
  "Exodus 16:31-36": ["The House Of Israel Called The Name Thereof Manna", "Like Coriander Seed", "Wafers Made With Honey", "Fill An Omer Of It To Be Kept", "That They May See The Bread", "Laid It Up Before The Testimony", "The Children Of Israel Did Eat Manna Forty Years", "Until They Came Unto The Borders Of Canaan"],
};

function makeDay25PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay25Phrase(section, title)];
}

function explainDay25Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("sanctify") || lower.includes("set apart")) {
    add(`${title} means the firstborn are now marked for the LORD in a special way.`, "God spared Israel's firstborn on Passover night, so rescued life is marked as His.", "This is not random religious paperwork. It teaches Israel that salvation creates belonging.", "👶 Firstborn", "🙌 Set apart", "📜 Rescued life is God's gift", "The people who were brought out must now remember who brought them out.");
  } else if (lower.includes("openeth the womb") || lower.includes("firstling") || lower.includes("firstborn")) {
    add(`${title} points to the first life that opens a family or flock.`, "In Israel's world, firstborn language carried inheritance, future, strength, and family hope.", "God claims the first because He rescued the firstborn from death in Egypt.", "👶 Firstborn child", "🐑 First animal", "🩸 Passover memory", "Every firstborn reminder points back to the night God spared His people.");
  } else if (lower === "it is mine") {
    add(`${title} is God's claim over what He rescued.`, "Israel's firstborn were spared by mercy, not by their own strength.", "So God says plainly that rescued life belongs to Him.", "🙌 Belonging", "🛡️ Mercy", "📜 God's claim", "Exodus teaches that salvation is not independence from God. It is life given back to God.");
  } else if (lower.includes("remember this day") || lower.includes("shew thy son") || lower.includes("son asketh") || lower.includes("memorial") || lower.includes("mouth")) {
    add(`${title} turns rescue into family memory and teaching.`, "God does not want the Exodus to become a story people forget.", "Parents must explain what the LORD did, and children must grow up hearing why this day matters.", "👶 Children ask", "📖 Parents explain", "🕯️ Memory becomes worship", "Faith is carried forward when the next generation understands the rescue story.");
  } else if (lower.includes("house of bondage") || lower.includes("brought us out") || lower.includes("brought you out") || lower.includes("land of egypt")) {
    add(`${title} reminds Israel what God rescued them from.`, "Egypt was not just a hard season. It was bondage, forced labor, fear, and Pharaoh's control.", "The LORD brought them out when they could not free themselves.", "🧱 Bondage", "🚪 Brought out", "🙌 Rescue", "Remembering slavery keeps freedom from becoming pride.");
  } else if (lower.includes("strength of hand")) {
    add(`${title} explains how Israel left Egypt.`, "They did not escape because Pharaoh became kind or Israel became powerful.", "The LORD's strong hand broke the grip of bondage.", "💪 Strong hand", "👑 Pharaoh humbled", "🚪 Freedom opened", "The Exodus is God's rescue before it is Israel's journey.");
  } else if (lower.includes("leaven") || lower.includes("unleavened") || lower.includes("abib")) {
    add(`${title} connects Israel's food and calendar to the rescue from Egypt.`, "Unleavened bread reminded the people that they left quickly, before normal bread could rise.", "Abib marks the season when this rescue memory was kept.", "🍞 Unleavened bread", "🏃 Haste", "📅 Rescue season", "God put memory into ordinary food so families could taste the story again.");
  } else if (lower.includes("sign") || lower.includes("frontlets") || lower.includes("between thine eyes") || lower.includes("upon thine hand")) {
    add(`${title} means the Exodus memory should shape what Israel does and how Israel thinks.`, "The hand points to action, and the eyes point to attention and thought.", "God's rescue was not supposed to stay hidden in the past.", "✋ Hands", "👀 Eyes", "🧠 Daily remembrance", "The people were to live like rescued people in visible, practical ways.");
  } else if (lower.includes("philistines") || lower.includes("lest peradventure") || lower.includes("god led them not") || lower.includes("god led the people about")) {
    add(`${title} shows God's patient guidance after Egypt.`, "The shortest road was not the wisest road for a people just freed from slavery.", "God knew they were not ready for immediate war and led them another way.", "🧭 Guidance", "🛡️ Protection", "⏳ Patient route", "Sometimes God's longer road is mercy, not delay.");
  } else if (lower.includes("harnessed")) {
    add(`${title} means Israel left in an ordered way, ready for the journey ahead.`, "They were no longer a trapped slave people under Pharaoh's quotas.", "They were moving as the LORD's rescued people.", "🚶 Leaving Egypt", "🏕️ Ordered groups", "🙌 New identity", "Freedom begins with God leading them out as a people with purpose.");
  } else if (lower.includes("bones of joseph") || lower.includes("joseph")) {
    add(`${title} ties Exodus directly back to Genesis.`, "Joseph had believed God would visit His people and bring them out of Egypt.", "Moses carrying his bones shows that old promise being honored.", "⚰️ Joseph's bones", "📜 Old promise", "🏞️ Hope for Canaan", "Even Joseph's bones are preaching that God's word came true.");
  } else if (lower.includes("pillar of cloud") || lower.includes("pillar of fire") || lower.includes("took not away the pillar")) {
    add(`${title} shows God's visible guidance for a people learning freedom.`, "The pillar meant Israel was not wandering alone.", "God gave direction by day and protection by night.", "☁️ Cloud by day", "🔥 Fire by night", "🧭 God leads", "Freedom means learning to follow the presence of the LORD.");
  } else if (lower.includes("turn and encamp") || lower.includes("entangled") || lower.includes("pihahiroth") || lower.includes("baalzephon")) {
    add(`${title} places Israel where escape looks impossible.`, "To Pharaoh, Israel looks trapped by land and sea.", "But the trap is really the stage where God will display His rescue.", "🌊 Sea ahead", "👑 Pharaoh watching", "🧭 God positioning", "What looks like a dead end can become the place where the LORD acts.");
  } else if (lower.includes("harden pharaoh") || lower.includes("hardened the heart")) {
    add(`${title} shows Pharaoh still locked in rebellion after Israel leaves.`, "He has seen judgment, grief, and release, but his heart still resists God.", "The chase toward the sea exposes one last time that Pharaoh wants control back.", "🔒 Hard heart", "👑 Refusing king", "🌊 Sea judgment coming", "A hard heart can lose everything and still reach for bondage again.");
  } else if (lower.includes("honoured upon pharaoh") || lower.includes("egyptians may know")) {
    add(`${title} means God will make His identity clear through Pharaoh's defeat.`, "Egypt's king wants glory for himself, but the LORD will be honored over him.", "The sea will show that Pharaoh is not the final power.", "👑 Pharaoh humbled", "🙌 The LORD honored", "🌍 Egypt sees", "God's rescue reveals who truly rules.");
  } else if (lower.includes("chariot") || lower.includes("chariots") || lower.includes("captains") || lower.includes("horse")) {
    add(`${title} shows Egypt bringing its military strength against Israel.`, "Chariots were powerful weapons in the ancient world.", "Israel cannot match Egypt's army, which makes God's rescue at the sea even clearer.", "🐎 Horses", "⚔️ Chariots", "😨 Real danger", "The threat looks impossible so the LORD's salvation can be seen plainly.");
  } else if (lower.includes("pursued")) {
    add(`${title} shows Egypt trying to pull Israel back into bondage.`, "Pharaoh does not simply regret losing workers. He chases them with force.", "The old master wants the rescued people back under control.", "🏃 Pursuit", "👑 Pharaoh's army", "🔒 Bondage reaching back", "God will answer the chase with a rescue Israel could never create.");
  } else if (lower.includes("high hand")) {
    add(`${title} describes Israel leaving openly and boldly.`, "They are not sneaking out like criminals.", "The LORD has brought them out in public victory.", "✋ High hand", "🚪 Open departure", "🙌 Public rescue", "The people who were crushed by slavery now walk out under God's power.");
  } else if (lower.includes("sore afraid") || lower.includes("cried out") || lower.includes("graves in egypt") || lower.includes("wherefore") || lower.includes("let us alone")) {
    add(`${title} shows fear speaking inside newly freed people.`, "Israel is out of Egypt, but Egypt's army is behind them and the sea is ahead.", "Their panic is real, but fear starts rewriting the rescue story.", "😨 Fear", "🌊 Sea ahead", "🐎 Army behind", "The wilderness will teach Israel to trust the LORD after freedom begins.");
  } else if (lower.includes("fear ye not") || lower.includes("stand still") || lower.includes("salvation") || lower.includes("fight for you")) {
    add(`${title} teaches Israel how to face an impossible moment.`, "They cannot defeat Pharaoh's army or open the sea.", "They must watch the LORD do what only He can do.", "😨 Fear answered", "👀 Watch God act", "🛡️ The LORD fights", "Before Israel learns many commands, they learn that the LORD is the One who saves.");
  } else if (lower.includes("go forward") || lower.includes("lift thou up thy rod") || lower.includes("divide it") || lower.includes("dry ground")) {
    add(`${title} shows God turning a blocked path into a rescue road.`, "The sea looked like the end of the journey.", "God commands Moses forward, and the impossible place becomes the way through.", "🌊 Sea", "🚶 Dry ground", "📜 God's command", "Faith moves forward because God makes the road.");
  } else if (lower.includes("angel of god") || lower.includes("pillar of the cloud") || lower.includes("cloud and darkness") || lower.includes("gave light")) {
    add(`${title} shows God's presence standing between Israel and Egypt.`, "The same cloud gives light to Israel and darkness to Egypt.", "God's presence protects His people while confusing their enemies.", "☁️ Cloud", "💡 Light for Israel", "🌑 Darkness for Egypt", "The LORD is not only ahead of His people; He also guards behind them.");
  } else if (lower.includes("waters were a wall") && section.reference === "Exodus 14:29-31") {
    add(`${title} is repeated after the danger is over so Israel remembers how they crossed safely.`, "The walls of water were not a poetic idea to them.", "They had walked between those waters and survived because God held the path open.", "🌊 Water held back", "🚶 Israel crossed", "👀 Rescue remembered", "The repeated image helps the people understand that the LORD protected every step through the sea.");
  } else if (lower.includes("strong east wind") || lower.includes("waters were divided") || lower.includes("waters were a wall") || lower.includes("sea dry land")) {
    add(`${title} carries the great sea deliverance in a concrete image.`, "The water that looked like death becomes a passage of life.", "God makes dry ground where Israel could never build a road.", "🌊 Sea", "🧱 Waters like walls", "🚶 Dry ground", "The Creator makes a way through what His people cannot cross.");
  } else if (lower.includes("morning watch") || lower.includes("troubled") || lower.includes("chariot wheels") || lower.includes("flee from the face") || lower.includes("overthrew")) {
    add(`${title} shows Egypt's strength collapsing inside God's judgment.`, "The army that looked unstoppable becomes confused, slowed, and trapped.", "Even Egypt's chariot wheels cannot carry them through what God opened for Israel.", "⚔️ Army troubled", "🛞 Wheels fail", "🌊 Sea returns", "The road of rescue for Israel becomes judgment for Pharaoh's army.");
  } else if (lower.includes("lord saved israel") || lower.includes("saw the egyptians dead") || lower.includes("saw that great work") || lower.includes("believed the lord")) {
    add(`${title} marks the visible result of God's rescue at the sea.`, "Israel sees that Pharaoh's army can no longer drag them back.", "The fear of Egypt is replaced by fear of the LORD.", "👀 Israel saw", "🛡️ The LORD saved", "🙌 Belief grows", "God's work at the sea teaches Israel whom to trust.");
  } else if (lower.includes("sang") || lower.includes("sing") || lower.includes("song") || lower.includes("timbrels") || lower.includes("dances") || lower.includes("miriam")) {
    add(`${title} shows rescue turning into worship.`, "After God saves Israel at the sea, the people sing.", "Praise becomes the first big response to deliverance.", "🎶 Song", "🥁 Timbrels", "🙌 Worship", "The song teaches Israel how to remember the victory: the LORD triumphed.");
  } else if (lower.includes("triumphed gloriously") && section.reference === "Exodus 15:19-21") {
    add(`${title} becomes the chorus Miriam and the women repeat after the sea rescue.`, "The victory is not left as a private memory.", "It is sung back by the community with music and movement.", "🎶 Repeated praise", "🥁 Timbrels", "🙌 Shared worship", "The same rescue truth moves from Moses' song into the people's celebration.");
  } else if (lower.includes("triumphed gloriously") || lower.includes("rider") || lower.includes("right hand") || lower.includes("man of war") || lower.includes("overthrown") || lower.includes("wrath") || lower.includes("enemy said")) {
    add(`${title} celebrates the LORD's victory over Egypt's power.`, "The song does not praise Israel's bravery or strategy.", "It praises the LORD who threw down the horse, rider, army, and pride of Egypt.", "👑 The LORD wins", "🐎 Egypt defeated", "🌊 Sea judgment", "Worship tells the rescue story with God at the center.");
  } else if (lower.includes("strength and song") || lower.includes("he is my god") || lower.includes("who is like") || lower.includes("glorious") || lower.includes("doing wonders")) {
    add(`${title} turns doctrine into worshipful confession.`, "Israel is not only saying God did a powerful act.", "They are confessing who He is: strong, holy, wonderful, and unlike any other.", "🙌 Praise", "🔥 Holiness", "✨ Wonders", "The sea rescue teaches Israel to know God, not just enjoy escape.");
  } else if (lower.includes("mercy hast led") || lower.includes("people shall hear") || lower.includes("pass over") || lower.includes("purchased")) {
    add(`${title} looks beyond the sea toward the nations and the promised future.`, "The song says other peoples will hear and tremble.", "Israel has been redeemed, and the LORD will keep leading them.", "🛡️ Mercy", "🌍 Nations hear", "💰 Purchased people", "The rescue at the sea is the beginning of a larger journey with God.");
  } else if (lower.includes("bring them in") || lower.includes("plant them") || lower.includes("inheritance") || lower.includes("sanctuary") || lower.includes("reign")) {
    add(`${title} looks forward to God's goal for His rescued people.`, "The Exodus is not only about leaving Egypt.", "God is bringing His people toward a place where He will dwell with them.", "🏞️ Inheritance", "🌱 Planted people", "👑 The LORD reigns", "Rescue has a destination: life with God as King.");
  } else if (lower.includes("three days") || lower.includes("no water") || lower.includes("marah") || lower.includes("murmured") || lower.includes("tree") || lower.includes("healeth") || lower.includes("wells")) {
    add(`${title} shows the wilderness testing Israel's trust quickly after rescue.`, "The need is real: the people are thirsty.", "But the wilderness will teach them to bring need to God instead of letting fear rewrite the story.", "💧 Water", "🌳 Tree", "🩺 The LORD heals", "The God who opened the sea can also provide in dry places.");
  } else if (lower.includes("wilderness of sin") || lower.includes("fifteenth day") || lower.includes("whole congregation murmured") || lower.includes("flesh pots") || lower.includes("bread to the full") || lower.includes("kill this whole assembly")) {
    add(`${title} shows hunger and fear speaking after the rescue.`, "Israel remembers Egypt's food but forgets Egypt's bondage.", "Need is real, but nostalgia can make slavery look safer than trust.", "🍲 Egypt remembered", "🍞 Hunger", "😟 Fear talking", "God will teach them daily dependence instead of backward-looking panic.");
  } else if (lower.includes("rain bread") || lower.includes("gather") || lower.includes("certain rate") || lower.includes("prove them") || lower.includes("sixth day")) {
    add(`${title} introduces manna as daily training in trust.`, "God gives bread, but He gives it with instructions.", "The people must gather enough for each day and learn that God's provision can be trusted.", "🍞 Bread from heaven", "📏 Daily amount", "🧪 Testing trust", "Provision becomes a classroom where Israel learns obedience.");
  } else if (lower.includes("glory of the lord") || lower.includes("heard the murmurings") || lower.includes("eat flesh") || lower.includes("filled with bread") || lower.includes("lord your god")) {
    add(`${title} shows God answering complaint with mercy and revelation.`, "The LORD hears the murmuring, but He still provides quail and bread.", "The goal is not only full stomachs. The goal is that Israel knows the LORD is their God.", "👂 God hears", "🍗 Flesh at evening", "🍞 Bread in morning", "Provision reveals the Provider.");
  } else if (lower.includes("quails") || lower.includes("dew") || lower.includes("small round thing") || lower.includes("what is it") || lower.includes("bread which the lord") || lower.includes("omer") || lower.includes("much had nothing over") || lower.includes("little had no lack")) {
    add(`${title} teaches daily dependence on God's measured provision.`, "Manna was strange enough that the people asked what it was.", "Yet God gave enough for each person, with no one lacking when they gathered as commanded.", "🍞 Manna", "📏 Omer", "✅ Enough for each day", "God is reshaping former slaves into people who receive His care one morning at a time.");
  } else if (lower.includes("leave of it") || lower.includes("hearkened not") || lower.includes("worms") || lower.includes("stank") || lower.includes("sun waxed hot") || lower.includes("melted")) {
    add(`${title} shows what happens when Israel tries to control tomorrow without trusting God.`, "Some people keep manna overnight against Moses' command.", "The spoiled manna teaches that God's daily provision must be received God's way.", "🍞 Manna", "🪱 Spoiled food", "☀️ Melted away", "Trust means obeying the Provider, not hoarding against His word.");
  } else if (lower.includes("twice as much") || lower.includes("holy sabbath") || lower.includes("bake") || lower.includes("seventh day") || lower.includes("there shall be none") || lower.includes("rested")) {
    add(`${title} teaches rest as part of freedom.`, "Slaves in Egypt were driven by endless quotas, but God gives His people a rhythm of work and rest.", "The double portion trains them to trust God's care even when they stop gathering.", "🛑 Rest", "🍞 Double portion", "📅 Seventh day", "The Sabbath shows that Israel is the LORD's people, not servants of endless labor.");
  } else if (lower.includes("how long refuse") || lower.includes("commandments")) {
    add(`${title} exposes disobedience after God has clearly provided.`, "Some Israelites still go out looking for manna on the Sabbath.", "The issue is no longer lack of food. It is refusal to trust God's command.", "🚫 Refusal", "📜 Commandments", "🛑 Sabbath lesson", "Freedom with God includes learning to stop when He says stop.");
  } else if (lower.includes("manna") || lower.includes("coriander") || lower.includes("wafers") || lower.includes("honey") || lower.includes("kept") || lower.includes("testimony") || lower.includes("forty years") || lower.includes("borders of canaan")) {
    add(`${title} preserves the memory of God's wilderness provision.`, "Manna was not only food for a hungry morning.", "It became testimony that the LORD fed Israel through the long journey.", "🍞 Manna", "🏺 Kept as witness", "🏞️ Until Canaan", "The bread reminded Israel that God sustained them from Egypt to the promised land.");
  } else {
    add(`${title} teaches a real detail in Israel's journey from rescue into life with God.`, "The wording helps a beginner slow down and ask what God is showing through memory, guidance, worship, testing, provision, or rest.", "📖 Bible words", "🔍 Slow reading", "🧠 Clear understanding", "Every rescued step is training Israel to trust the LORD.");
  }

  return note(lines.slice(0, 8));
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
  "Exodus 17:7-7": ["He Called The Name Of The Place Massah", "And Meribah", "Because Of The Chiding Of The Children Of Israel", "They Tempted The LORD", "Saying", "Is The LORD Among Us, Or Not"],
  "Exodus 17:8-13": ["Then Came Amalek", "Joshua, Choose Us Out Men", "The Rod Of God In Mine Hand", "When Moses Held Up His Hand", "Aaron And Hur Stayed Up His Hands", "His Hands Were Steady", "Joshua Discomfited Amalek"],
  "Exodus 17:14-16": ["Write This For A Memorial In A Book", "Rehearse It In The Ears Of Joshua", "I Will Utterly Put Out The Remembrance Of Amalek", "Moses Built An Altar", "Called The Name Of It Jehovahnissi", "The LORD Hath Sworn", "War With Amalek From Generation To Generation"],
  "Exodus 18:1-6": ["Jethro, The Priest Of Midian", "Heard Of All That God Had Done", "The LORD Had Brought Israel Out Of Egypt", "Zipporah, Moses' Wife", "After He Had Sent Her Back", "Gershom", "Eliezer", "I Thy Father In Law Jethro Am Come"],
  "Exodus 18:7-12": ["Moses Went Out To Meet His Father In Law", "Did Obeisance, And Kissed Him", "They Asked Each Other Of Their Welfare", "Moses Told His Father In Law", "The LORD Delivered Them", "Now I Know That The LORD Is Greater Than All Gods", "Jethro Took A Burnt Offering"],
  "Exodus 18:13-18": ["Moses Sat To Judge The People", "The People Stood By Moses From The Morning Unto The Evening", "What Is This Thing That Thou Doest", "Why Sittest Thou Thyself Alone", "The People Come Unto Me To Enquire Of God", "I Do Make Them Know The Statutes Of God", "The Thing That Thou Doest Is Not Good", "Thou Wilt Surely Wear Away"],
  "Exodus 18:19-24": ["Be Thou For The People To God-Ward", "Teach Them Ordinances And Laws", "Shew Them The Way Wherein They Must Walk", "Provide Out Of All The People Able Men", "Such As Fear God", "Men Of Truth, Hating Covetousness", "Rulers Of Thousands", "Moses Hearkened"],
  "Exodus 18:25-27": ["Moses Chose Able Men", "Made Them Heads Over The People", "They Judged The People At All Seasons", "The Hard Causes They Brought Unto Moses", "Every Small Matter They Judged Themselves", "Moses Let His Father In Law Depart"],
  "Exodus 19:1-6": ["In The Third Month", "They Came Into The Wilderness Of Sinai", "Israel Camped Before The Mount", "Moses Went Up Unto God", "Ye Have Seen What I Did Unto The Egyptians", "I Bare You On Eagles' Wings", "A Peculiar Treasure Unto Me", "A Kingdom Of Priests, And An Holy Nation"],
  "Exodus 19:7-8": ["Moses Called For The Elders", "The Elders Of The People", "Laid Before Their Faces All These Words", "All The People Answered Together", "All That The LORD Hath Spoken We Will Do", "Moses Returned The Words Of The People"],
  "Exodus 19:9-14": ["Lo, I Come Unto Thee In A Thick Cloud", "That The People May Hear", "Sanctify Them To Day And To Morrow", "Let Them Wash Their Clothes", "Be Ready Against The Third Day", "Set Bounds Unto The People", "Take Heed To Yourselves", "Moses Sanctified The People"],
  "Exodus 19:15-20": ["Be Ready Against The Third Day", "There Were Thunders And Lightnings", "A Thick Cloud Upon The Mount", "The Voice Of The Trumpet Exceeding Loud", "All The People Trembled", "Mount Sinai Was Altogether On A Smoke", "The LORD Descended Upon It In Fire", "Moses Spake, And God Answered Him"],
  "Exodus 19:21-25": ["Go Down, Charge The People", "Lest They Break Through Unto The LORD", "Let The Priests Also Sanctify Themselves", "The People Cannot Come Up", "Away, Get Thee Down", "Thou Shalt Come Up, Thou, And Aaron With Thee"],
  "Exodus 20:1-3": ["God Spake All These Words", "I Am The LORD Thy God", "Which Have Brought Thee Out", "Out Of The House Of Bondage", "Thou Shalt Have No Other Gods", "Before Me"],
  "Exodus 20:4-9": ["Thou Shalt Not Make Unto Thee Any Graven Image", "Thou Shalt Not Bow Down Thyself To Them", "I The LORD Thy God Am A Jealous God", "Shewing Mercy Unto Thousands", "Thou Shalt Not Take The Name Of The LORD Thy God In Vain", "Remember The Sabbath Day", "Six Days Shalt Thou Labour"],
  "Exodus 20:10-11": ["The Seventh Day Is The Sabbath", "In It Thou Shalt Not Do Any Work", "Nor Thy Son, Nor Thy Daughter", "Nor Thy Manservant, Nor Thy Maidservant", "For In Six Days The LORD Made Heaven And Earth", "The LORD Blessed The Sabbath Day", "And Hallowed It"],
  "Exodus 20:12-17": ["Honour Thy Father And Thy Mother", "Thou Shalt Not Kill", "Thou Shalt Not Commit Adultery", "Thou Shalt Not Steal", "Thou Shalt Not Bear False Witness", "Thou Shalt Not Covet", "Any Thing That Is Thy Neighbour's"],
  "Exodus 20:18-23": ["All The People Saw The Thunderings", "They Removed, And Stood Afar Off", "Speak Thou With Us, And We Will Hear", "Let Not God Speak With Us, Lest We Die", "Fear Not", "That His Fear May Be Before Your Faces", "Ye Shall Not Make With Me Gods Of Silver"],
  "Exodus 20:24-26": ["An Altar Of Earth Thou Shalt Make", "Thy Burnt Offerings", "In All Places Where I Record My Name", "I Will Come Unto Thee", "If Thou Wilt Make Me An Altar Of Stone", "Thou Shalt Not Build It Of Hewn Stone", "Neither Shalt Thou Go Up By Steps"],
};

function makeDay26PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay26Phrase(section, title)];
}

function explainDay26Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("after their journeys")) {
    add(`${title} reminds the reader that Israel is moving step by step through the wilderness.`, "They have left Egypt, but they have not yet learned how to live as free people with God.", "Every stop becomes a place where trust is tested.", "🚶 Journey", "🏜️ Wilderness", "🧠 Learning trust", "The road after rescue is where God begins training His people.");
  } else if (lower.includes("no water") || lower.includes("chide") || lower.includes("wherefore") || lower.includes("stone me")) {
    add(`${title} shows real need turning into angry accusation.`, "The people are thirsty, so the problem is not imaginary.", "But instead of trusting the God who opened the sea, they turn their fear against Moses.", "💧 No water", "😡 Quarreling", "🪨 Threatening stones", "The wilderness exposes what fear sounds like when trust is weak.");
  } else if (lower.includes("moses cried")) {
    add(`${title} shows Moses bringing pressure back to the LORD instead of only arguing with the people.`, "The crowd is angry enough that Moses feels in danger.", "His prayer is honest because leadership has become heavy.", "🙏 Moses cries out", "😰 Real pressure", "🙌 God must answer", "Good leadership learns to carry people's panic to God.");
  } else if (lower.includes("rock in horeb") || lower.includes("smite the rock")) {
    add(`${title} points to God's surprising provision in a dry place.`, "The people need water, and God gives it from the rock.", "The answer comes by God's command, not by Moses' cleverness.", "🪨 Rock", "💧 Water", "📜 God's command", "The LORD can bring life from places that look completely unable to give it.");
  } else if (lower.includes("massah") || lower.includes("meribah")) {
    add(`${title} turns the place name into a memory lesson.`, "Massah is connected with testing, and Meribah is connected with quarreling.", "The name helps Israel remember what unbelief sounded like at Rephidim.", "📍 Place name", "⚖️ Testing", "😡 Quarreling", "Bible place names often teach the meaning of what happened there.");
  } else if (lower.includes("tempted the lord") || lower === "saying" || lower.includes("among us")) {
    add(`${title} reveals the deeper question under Israel's complaint.`, "They are not only asking for water.", "They are questioning whether the LORD is really present with them.", "❓ Is God here?", "💧 Need", "💔 Doubt", "The painful irony is that God has been leading them the whole way.");
  } else if (lower.includes("amalek") || lower.includes("joshua") || lower.includes("choose us out")) {
    add(`${title} introduces Israel's first battle after leaving Egypt.`, "The rescued people now face an enemy in the wilderness.", "Joshua appears as a leader while Moses stands with the rod of God.", "⚔️ Battle", "🧍 Joshua", "🏜️ Wilderness enemy", "Freedom does not mean Israel will never face conflict. It means the LORD is with them in it.");
  } else if (lower.includes("rod of god") || lower.includes("held up his hand") || lower.includes("aaron and hur") || lower.includes("hands were steady")) {
    add(`${title} shows that victory depends on the LORD and is supported by faithful people.`, "Moses grows tired, so Aaron and Hur help hold up his hands.", "The battle is won through dependence, endurance, and shared support.", "🙌 Lifted hands", "🤝 Aaron and Hur", "⚔️ Battle below", "Even leaders who trust God still need people to help them stand.");
  } else if (lower.includes("discomfited amalek")) {
    add(`${title} means Joshua defeats Amalek in battle.`, "The word sounds old, but it means Amalek was overthrown or beaten back.", "Israel's victory is tied to God's help, not only Joshua's sword.", "⚔️ Joshua fights", "🙌 Moses depends on God", "✅ Amalek defeated", "The scene teaches both action and dependence.");
  } else if (lower.includes("memorial in a book") || lower.includes("rehearse it") || lower.includes("remembrance of amalek")) {
    add(`${title} shows that this battle must be remembered and taught.`, "God tells Moses to write it down and make sure Joshua hears it.", "The fight with Amalek will matter beyond one day.", "📖 Written memory", "👂 Joshua hears", "⚔️ Long conflict", "Some moments are recorded because future faithfulness will need them.");
  } else if (lower.includes("altar") || lower.includes("jehovahnissi") || lower.includes("lord hath sworn") || lower.includes("war with amalek")) {
    add(`${title} turns victory into worship and witness.`, "Moses builds an altar and names it Jehovah-nissi, meaning the LORD is my banner.", "The name says Israel's victory flag is not Moses, Joshua, or the army. It is the LORD.", "⛳ Banner", "🙌 Worship", "⚔️ Ongoing battle", "After the fight, Moses makes sure the glory goes to God.");
  } else if (lower.includes("jethro") || lower.includes("midian") || lower.includes("father in law")) {
    add(`${title} brings Moses' family connection back into the story.`, "Jethro is Moses' father-in-law from Midian, the place where Moses lived before returning to Egypt.", "His arrival connects the wilderness rescue with Moses' earlier life.", "👴 Jethro", "🏜️ Midian", "👨‍👩‍👦 Family connection", "God's work in Exodus is public, but it also touches real families.");
  } else if (lower.includes("heard of all") || lower.includes("brought israel out") || lower.includes("delivered them")) {
    add(`${title} shows the Exodus story spreading beyond Israel.`, "Jethro hears what God has done to Pharaoh and for His people.", "Deliverance becomes testimony to someone outside the rescued nation.", "👂 Heard", "🚪 Brought out", "🙌 God delivered", "God's rescue is meant to be known, not hidden.");
  } else if (lower.includes("zipporah") || lower.includes("gershom") || lower.includes("eliezer")) {
    add(`${title} names Moses' household and reminds the reader that Moses is not only a public leader.`, "His wife and sons carry pieces of his story: exile, help, and God's rescue from danger.", "These family names keep Moses grounded as a real person.", "👩 Zipporah", "👦 Sons", "🏠 Moses' household", "The leader of Israel still has a family story inside God's bigger story.");
  } else if (lower.includes("obeisance") || lower.includes("kissed") || lower.includes("welfare")) {
    add(`${title} describes respectful family greeting in an ancient setting.`, "Moses honors Jethro, greets him warmly, and asks about his peace.", "The scene is tender after the pressure of plagues, escape, thirst, and battle.", "🙇 Respect", "🤝 Greeting", "🏕️ Family reunion", "Exodus includes ordinary human kindness inside the larger rescue story.");
  } else if (lower.includes("greater than all gods") || lower.includes("burnt offering")) {
    add(`${title} is Jethro responding to Israel's rescue with worship.`, "He confesses that the LORD is greater than all gods and brings an offering.", "The Exodus has taught him something about who God is.", "🙌 Confession", "🔥 Offering", "👑 The LORD greater", "A rescued story becomes a witness that leads to worship.");
  } else if (lower.includes("sat to judge") || lower.includes("morning unto the evening") || lower.includes("why sittest") || lower.includes("wear away") || lower.includes("not good")) {
    add(`${title} shows leadership overload becoming visible.`, "Moses is trying to judge every case by himself from morning until evening.", "Jethro sees that this will wear Moses down and exhaust the people too.", "⚖️ Judging cases", "⏳ All day", "😓 Burnout danger", "Serving God does not mean carrying every burden alone.");
  } else if (lower.includes("enquire of god") || lower.includes("statutes of god")) {
    add(`${title} shows that Israel's disputes need God's wisdom, not only human opinion.`, "The people bring matters to Moses because they need guidance from the LORD.", "Moses teaches them God's statutes and laws.", "📜 God's instruction", "⚖️ Decisions", "🧭 Wisdom", "A rescued people must learn God's ways for ordinary life.");
  } else if (lower.includes("god-ward") || lower.includes("teach them") || lower.includes("way wherein")) {
    add(`${title} describes Moses' main calling in shared leadership.`, "Moses must represent the people before God and teach them the way to walk.", "Delegating cases does not mean abandoning spiritual responsibility.", "🙏 Before God", "📜 Teach the law", "🧭 Show the way", "Healthy leadership keeps the main calling clear.");
  } else if (lower.includes("able men") || lower.includes("fear god") || lower.includes("men of truth") || lower.includes("hating covetousness") || lower.includes("rulers of thousands") || lower.includes("hearkened")) {
    add(`${title} gives the character standard for shared leadership.`, "The leaders must be capable, reverent, truthful, and not greedy.", "God's people need more than talented organizers. They need trustworthy servants.", "💪 Able", "🙏 Fear God", "⚖️ Truthful and fair", "Shared leadership protects the people and the leader.");
  } else if (lower.includes("heads over the people") || lower.includes("judged the people") || lower.includes("hard causes") || lower.includes("small matter") || lower.includes("depart")) {
    add(`${title} shows Jethro's counsel being put into practice.`, "Smaller cases are handled by appointed leaders, while hard cases come to Moses.", "This creates order without pretending Moses can do everything.", "👥 Shared leaders", "⚖️ Hard cases", "✅ Wise order", "God's people are helped when responsibility is carried wisely.");
  } else if (lower.includes("third month") || lower.includes("sinai") || lower.includes("camped before the mount")) {
    add(`${title} brings Israel to the mountain where covenant instruction will be given.`, "The people rescued from Egypt now stand before Sinai.", "This is where the LORD will speak and shape them as His holy people.", "⛰️ Sinai", "🏕️ Camped people", "📜 Covenant coming", "Rescue leads to relationship, worship, and command.");
  } else if (lower.includes("moses went up") || lower.includes("thick cloud") || lower.includes("people may hear")) {
    add(`${title} shows God preparing to speak in a way the people can recognize as serious and holy.`, "Moses goes up as mediator, and the cloud marks God's presence.", "The people are meant to hear and learn to trust the word God gives through Moses.", "⛰️ Mountain", "☁️ Cloud", "👂 People hear", "God is drawing near, but not casually.");
  } else if (lower.includes("what i did unto the egyptians") || lower.includes("eagles' wings")) {
    add(`${title} reminds Israel that covenant begins with grace.`, "Before God gives commands, He reminds them that He rescued them.", "The image of eagles' wings shows care, strength, and carrying help.", "🦅 Carried", "🚪 Rescued", "🙌 Grace first", "Obedience in Exodus comes after deliverance, not before it.");
  } else if (lower.includes("peculiar treasure") || lower.includes("kingdom of priests") || lower.includes("holy nation")) {
    add(`${title} names Israel's calling after rescue.`, "God is making them His treasured people, set apart to represent Him among the nations.", "This is identity before it is assignment.", "💎 Treasured people", "🙌 Priests", "✨ Holy nation", "The LORD rescues Israel so they can live near Him and show His ways.");
  } else if (lower.includes("elders") || lower.includes("laid before") || lower.includes("all the people answered") || lower.includes("we will do") || lower.includes("returned the words")) {
    add(`${title} shows Israel responding to the covenant word.`, "Moses brings God's words to the elders and the people answer together.", "Their response is serious, even though the coming story will show how deeply they still need grace.", "📜 God's words", "👥 People answer", "✅ We will do", "Covenant response should be wholehearted, not casual.");
  } else if (lower.includes("be ready") && section.reference === "Exodus 19:15-20") {
    add(`${title} is repeated as Sinai gets closer and the people approach the third day.`, "The waiting is almost over, and the signs of God's presence are about to shake the mountain.", "Readiness here means reverence before the LORD descends.", "⏳ Third day", "⛰️ Sinai", "🙇 Reverence", "The repeated command makes the moment feel serious, not casual.");
  } else if (lower.includes("sanctify") || lower.includes("wash their clothes") || lower.includes("be ready") || lower.includes("set bounds") || lower.includes("take heed")) {
    add(`${title} teaches that meeting the holy God requires preparation and boundaries.`, "The people wash, wait, and stay within the limits God gives.", "God is near, but He is not ordinary or safe to treat lightly.", "🧼 Washed clothes", "⏳ Ready", "🚧 Boundaries", "Holiness means God's presence is wonderful and serious.");
  } else if (lower.includes("thunders") || lower.includes("lightnings") || lower.includes("trumpet") || lower.includes("trembled") || lower.includes("smoke") || lower.includes("descended") || lower.includes("god answered")) {
    add(`${title} describes Sinai as a terrifying holy meeting place.`, "The thunder, lightning, trumpet, smoke, and fire show that the LORD's presence is not small.", "The people tremble because God is drawing near in majesty.", "⛈️ Thunder", "🔥 Fire", "🎺 Trumpet", "The mountain scene teaches reverence before the God who rescued them.");
  } else if (lower.includes("go down") || lower.includes("break through") || lower.includes("priests also") || lower.includes("cannot come up") || lower.includes("aaron with thee")) {
    add(`${title} protects the people from treating God's holiness carelessly.`, "The boundaries around Sinai are not pointless rules.", "They teach that access to God's presence must happen God's way.", "🚧 Boundary", "⚠️ Do not break through", "🙌 Holy presence", "God's nearness is a gift, but it must be received with reverence.");
  } else if (lower.includes("god spake") || lower.includes("i am the lord") || lower.includes("brought thee out") || lower.includes("house of bondage")) {
    add(`${title} begins the commandments with God's identity and rescue.`, "Before Israel hears what to do, they hear who God is and what He has done.", "The law begins with deliverance, not cold rule-keeping.", "📜 God's word", "🚪 Brought out", "🙌 Rescuer first", "The Ten Commandments are given to a people already rescued by grace.");
  } else if (lower.includes("no other gods") || lower.includes("before me") || lower.includes("graven image") || lower.includes("bow down") || lower.includes("jealous god") || lower.includes("mercy unto thousands") || lower.includes("name of the lord") || lower.includes("vain")) {
    add(`${title} teaches Israel that the LORD alone must receive their worship.`, "God rescued them from Egypt, so they must not give their worship to idols, images, or empty use of His name.", "His jealousy is covenant love that refuses to share His people with false gods.", "🙌 One God", "🚫 No idols", "📛 Holy name", "Freedom begins with right worship.");
  } else if (lower.includes("sabbath") || lower.includes("six days") || lower.includes("seventh day") || lower.includes("not do any work") || lower.includes("blessed") || lower.includes("hallowed")) {
    add(`${title} teaches rest as part of covenant life.`, "Israel had known slave labor in Egypt, but God gives them a holy rhythm of work and rest.", "The Sabbath reaches households, servants, animals, and strangers.", "🛑 Rest", "📅 Seventh day", "🌍 Creation pattern", "The LORD's people are not ruled by endless work.");
  } else if (lower.includes("father") || lower.includes("mother") || lower.includes("kill") || lower.includes("adultery") || lower.includes("steal") || lower.includes("false witness") || lower.includes("covet") || lower.includes("neighbour")) {
    add(`${title} shows that covenant life shapes how people treat one another.`, "God's commands protect family, life, marriage, property, truth, and the heart's desires.", "Freedom is not permission to harm others.", "👨‍👩‍👧 Family", "⚖️ Justice", "💭 Heart desires", "Love for the LORD must become love and faithfulness toward neighbors.");
  } else if (lower.includes("thunderings") || lower.includes("afar off") || lower.includes("speak thou") || lower.includes("lest we die") || lower.includes("fear not") || lower.includes("fear may be before")) {
    add(`${title} shows the people trembling before God's voice.`, "They are afraid and ask Moses to stand between them and God.", "Moses teaches that the right fear of God should lead them away from sin, not away from obedience.", "😨 Trembling people", "🗣️ God's voice", "🙇 Holy fear", "The scene teaches reverence without running from God's word.");
  } else if (lower.includes("gods of silver") || lower.includes("altar") || lower.includes("burnt offerings") || lower.includes("record my name") || lower.includes("hewn stone") || lower.includes("steps")) {
    add(`${title} keeps Israel's worship simple and obedient after the commandments.`, "They must not make rival gods or shape worship around human display.", "Even the altar instructions teach humility before the LORD.", "🪨 Altar", "🚫 No idols", "🙌 Worship God's way", "The God who spoke from Sinai also teaches how His people may approach Him.");
  } else {
    add(`${title} teaches a real detail in Israel's covenant journey with God.`, "The wording helps a beginner slow down and see what the LORD is teaching about trust, worship, leadership, holiness, or obedience.", "📖 Bible words", "🔍 Slow reading", "🧠 Clear understanding", "Rescued people are learning how to live with the God who saved them.");
  }

  return note(lines.slice(0, 8));
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
  if (section.chapter >= 11 && section.chapter <= 20) {
    return cleaned;
  }

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
