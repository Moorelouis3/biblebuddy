import { BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyEightDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyNineDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentySevenDeepNotes";

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

const RAW_EXODUS_21_30_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  {
    chapter: 21,
    startVerse: 1,
    endVerse: 11,
    reference: "Exodus 21:1-11",
    title: "Laws For Servants In A Redeemed People",
    icon: "⚖️",
    phrases: [
      phrase("📜 These Are The Judgments", ["These are case laws.", "They apply covenant life to real situations.", "📜 God's law", "🏠 Households", "⚖️ Justice", "Exodus is showing that redemption must reshape ordinary society."]),
      phrase("⏳ Six Years He Shall Serve", ["Servitude is limited.", "No Israelite servant is meant to be trapped forever under another Israelite.", "⏳ Six years", "🔓 Seventh year release", "🚫 Not Pharaoh-style bondage", "A people rescued from slavery must not recreate Egypt among themselves."]),
      phrase("🔓 He Shall Go Out Free", ["Freedom is built into the law.", "The servant's release is not optional generosity.", "🔓 Free", "📜 Commanded", "⚖️ Protected", "God places limits on human power."]),
      phrase("🏠 If He Came In By Himself", ["The law pays attention to household situations.", "Freedom and responsibility are handled carefully.", "🏠 Marriage", "👥 Family", "⚖️ Case-by-case justice", "God's law enters complicated real life instead of staying abstract."]),
      phrase("❤️ I Love My Master", ["A servant may choose to stay because of love and household attachment.", "This is voluntary, not forced by Pharaoh-like control.", "❤️ Love", "🏠 Household", "👂 Ear marked", "The passage distinguishes chosen belonging from endless oppression."]),
      phrase("👂 Bore His Ear Through", ["The ear is marked as a sign of lifelong service.", "It is public and embodied.", "👂 Ear", "🚪 Doorpost", "📜 Witness", "The decision is not hidden; it becomes visible in the household community."]),
      phrase("🛡️ She Shall Not Go Out As The Menservants Do", ["The law gives specific protection to a vulnerable woman.", "Her situation is not treated carelessly.", "🛡️ Protection", "👩 Vulnerable person", "⚖️ Limits on male power", "God's law notices people who could easily be used and discarded."]),
      phrase("🍞 Her Food, Her Raiment, And Her Duty Of Marriage", ["Basic provision and marital rights are protected.", "The man cannot neglect her while keeping control.", "🍞 Food", "👗 Clothing", "🤝 Covenant duty", "The law pushes responsibility into the details of daily care."]),
    ],
  },
  {
    chapter: 21,
    startVerse: 12,
    endVerse: 36,
    reference: "Exodus 21:12-36",
    title: "Justice For Life And Injury",
    icon: "🩸",
    phrases: [
      phrase("🩸 He That Smiteth A Man", ["Human life is protected by serious law.", "Violence cannot be treated lightly.", "🩸 Life", "⚖️ Accountability", "🚫 Murder condemned", "The God who rescued Israel from violent oppression commands His people to value life."]),
      phrase("🏃 I Will Appoint Thee A Place", ["The law distinguishes murder from accidental killing.", "Justice must be careful.", "🏃 Refuge", "⚖️ Discernment", "🚫 No mob justice", "God's law is not careless with either guilt or innocence."]),
      phrase("👪 Father Or Mother", ["Violence and dishonor toward parents are treated seriously.", "Family order matters in covenant life.", "👪 Parents", "🏠 Household", "⚖️ Accountability", "The home is not outside God's justice."]),
      phrase("⛓️ Stealeth A Man", ["Kidnapping is condemned.", "People must not be treated as property to steal and sell.", "⛓️ Kidnapping", "🚫 Human trafficking", "⚖️ Severe judgment", "This matters deeply in a book about liberation from bondage."]),
      phrase("⚖️ Eye For Eye", ["This phrase limits revenge.", "The response must fit the harm.", "⚖️ Proportion", "🚫 No escalating vengeance", "🩹 Injury addressed", "God's law restrains retaliation instead of unleashing it."]),
      phrase("🛡️ He Shall Let Him Go Free", ["If a servant is permanently injured, freedom is required.", "The master's power has consequences.", "🛡️ Protection", "🩹 Injury", "🔓 Freedom", "The law refuses to let powerful people harm servants without cost."]),
      phrase("🐂 If An Ox Were Wont To Push", ["Known danger creates responsibility.", "Negligence matters before God.", "🐂 Dangerous ox", "⚠️ Owner warned", "⚖️ Accountable", "Ignoring a known risk can become guilt."]),
      phrase("🧾 He Shall Make It Good", ["Damage must be repaired.", "Justice includes restoration where possible.", "🧾 Payment", "🐂 Loss", "🤝 Neighbor responsibility", "God cares about the real-world cost of harm."]),
    ],
  },
  {
    chapter: 22,
    startVerse: 1,
    endVerse: 15,
    reference: "Exodus 22:1-15",
    title: "Restitution For What Was Taken",
    icon: "🧾",
    phrases: [
      phrase("🐂 He Shall Restore Five Oxen", ["Theft requires more than apology.", "The thief must repair the loss.", "🐂 Ox stolen", "🧾 Restitution", "⚖️ Costly justice", "Biblical justice cares about the person who was harmed."]),
      phrase("🌙 Breaking Up", ["The law addresses a thief breaking in.", "Danger, fear, and defense are treated with care.", "🌙 Night", "🏠 Home", "⚖️ Context matters", "God's law does not flatten every case into one simple slogan."]),
      phrase("🔥 If Fire Break Out", ["Even spreading damage creates responsibility.", "A person's actions can harm a neighbor's field.", "🔥 Fire", "🌾 Field", "🧾 Repayment", "Holiness includes caring about consequences."]),
      phrase("🤲 Delivered Unto His Neighbour To Keep", ["Entrusted property must be handled faithfully.", "Trust is sacred in community life.", "🤲 Entrusted goods", "🏠 Neighbor", "⚖️ Accountability", "God cares about ordinary honesty."]),
      phrase("🙏 The Oath Of The Lord", ["When facts are hidden, an oath before God matters.", "God is treated as witness.", "🙏 Oath", "👀 God sees", "⚖️ Dispute settled", "Truthfulness before God holds the community together."]),
      phrase("🐎 Borrowed", ["Borrowing carries responsibility.", "Using what belongs to someone else is not casual.", "🐎 Borrowed animal", "🧾 Loss", "🤝 Neighbor care", "The law teaches people to treat another person's property with seriousness."]),
    ],
  },
  {
    chapter: 22,
    startVerse: 16,
    endVerse: 31,
    reference: "Exodus 22:16-31",
    title: "Holiness Protects The Vulnerable",
    icon: "🛡️",
    phrases: [
      phrase("💍 Endow Her To Be His Wife", ["Sexual sin has social and covenant consequences.", "The woman must not be used and discarded.", "💍 Responsibility", "👩 Protection", "⚖️ Consequence", "God's law pushes against exploitation."]),
      phrase("🚫 Thou Shalt Not Suffer A Witch To Live", ["Israel must reject spiritual practices that turn from the LORD.", "Covenant worship cannot mix with occult rebellion.", "🚫 Forbidden practice", "🙏 Loyalty to God", "🔥 Holy seriousness", "The command guards Israel's worship from spiritual corruption."]),
      phrase("🌍 Thou Shalt Neither Vex A Stranger", ["God protects the stranger because Israel knows what that pain feels like.", "Memory must become mercy.", "🌍 Stranger", "🏜️ Egypt memory", "🛡️ Protection", "Former strangers must not become oppressors."]),
      phrase("👂 I Will Surely Hear Their Cry", ["God hears widows and fatherless children.", "The vulnerable are not invisible.", "👂 God hears", "💔 Affliction", "⚖️ Judgment", "The God who heard Israel's cry now warns Israel that He hears other cries too."]),
      phrase("💰 Thou Shalt Not Be To Him As An Usurer", ["Need must not become an opportunity for exploitation.", "The poor are protected from predatory lending.", "💰 Money", "🤲 Mercy", "🚫 Crushing interest", "God's people must not profit from desperation."]),
      phrase("🧥 Thou Shalt Deliver It Unto Him By That The Sun Goeth Down", ["A poor person's cloak may be needed for warmth at night.", "The law notices bodily need.", "🧥 Cloak", "🌙 Night", "🛡️ Compassion", "Justice is not cold paperwork; it cares whether someone can sleep."]),
      phrase("👑 Thou Shalt Not Revile The Gods", ["The passage warns against contemptuous speech toward authority.", "Covenant people must not be reckless with words.", "👑 Rulers", "🗣️ Speech", "⚖️ Restraint", "Holiness shapes how people speak even under authority structures."]),
      phrase("🌾 The First Of Thy Ripe Fruits", ["Israel must give God the first, not leftovers.", "Provision is received as gift.", "🌾 Firstfruits", "🍇 Plenty", "🙏 Worship", "Giving trains the heart to remember who provides."]),
    ],
  },
  {
    chapter: 23,
    startVerse: 1,
    endVerse: 9,
    reference: "Exodus 23:1-9",
    title: "Truth In The Courts",
    icon: "🗣️",
    phrases: [
      phrase("🗣️ Thou Shalt Not Raise A False Report", ["False words damage justice.", "God's people must not spread what is untrue.", "🗣️ Report", "⚖️ Court", "🤝 Neighbor", "Truth is part of covenant faithfulness."]),
      phrase("👥 Thou Shalt Not Follow A Multitude To Do Evil", ["A crowd can make wrong feel normal.", "God warns Israel not to let numbers become conscience.", "👥 Crowd", "🚫 Evil", "🧭 Moral courage", "Truth does not become false because many people prefer it."]),
      phrase("⚖️ Neither Shalt Thou Countenance A Poor Man", ["Justice must not be bent by favoritism in any direction.", "The poor must be protected, but truth still matters.", "⚖️ Impartiality", "👀 Truth", "🚫 Favoritism", "Biblical justice is compassion without corruption."]),
      phrase("🐂 Thine Enemy's Ox", ["Even an enemy's animal must be helped.", "Neighbor love reaches across personal hostility.", "🐂 Enemy's ox", "🤲 Return it", "💔 Restraint", "God's law trains people not to let hatred govern conduct."]),
      phrase("💰 Thou Shalt Take No Gift", ["Bribes blind judgment.", "Money can distort even wise people.", "💰 Gift", "👀 Blindness", "⚖️ Twisted words", "Justice cannot be sold and still remain justice."]),
      phrase("🌍 Ye Know The Heart Of A Stranger", ["Israel's memory of Egypt becomes a moral teacher.", "They know what it feels like to be vulnerable outsiders.", "🌍 Stranger", "💔 Heart memory", "🛡️ Protection", "God turns remembered pain into commanded mercy."]),
    ],
  },
  {
    chapter: 23,
    startVerse: 10,
    endVerse: 33,
    reference: "Exodus 23:10-33",
    title: "Sabbath, Feasts, And The Road Ahead",
    icon: "🧭",
    phrases: [
      phrase("🌾 The Seventh Year Thou Shalt Let It Rest", ["Even the land receives rest.", "The poor and animals benefit from the release.", "🌾 Resting land", "🤲 Poor eat", "🐾 Beasts eat", "God's law resists endless extraction."]),
      phrase("🛑 On The Seventh Day Thou Shalt Rest", ["Sabbath reaches servants, strangers, and animals.", "Rest is not only for the powerful.", "🛑 Sabbath", "🐂 Ox", "🌍 Stranger", "God builds mercy into time."]),
      phrase("🎉 Three Times Thou Shalt Keep A Feast", ["Israel's calendar becomes a teacher.", "Feasts keep rescue and provision in memory.", "🎉 Feast", "📅 Yearly rhythm", "🙏 Worship", "Time itself is shaped around God."]),
      phrase("🍞 Feast Of Unleavened Bread", ["This feast remembers the Exodus rescue.", "Israel must not forget the haste and mercy of deliverance.", "🍞 Unleavened bread", "🏃 Leaving Egypt", "🧠 Memory", "Freedom gets placed on the calendar."]),
      phrase("👼 I Send An Angel Before Thee", ["God promises guidance on the road ahead.", "Israel will not enter the future alone.", "👼 Angel", "🧭 Way", "🛡️ Keeper", "The God who brought them out will lead them forward."]),
      phrase("✨ My Name Is In Him", ["The angel carries God's authority in a mysterious way.", "This is no ordinary messenger.", "✨ God's name", "📣 Authority", "🧭 Guidance", "Israel must take God's leading seriously."]),
      phrase("🌱 By Little And Little", ["God says the land will not be taken all at once.", "Promise unfolds through process.", "🌱 Gradual growth", "⏳ Patience", "🏞️ Land ahead", "Slow fulfillment is still faithfulness."]),
      phrase("🚫 Thou Shalt Make No Covenant With Them", ["Israel must not covenant with idolatry.", "Compromise would become a snare.", "🚫 No covenant", "🪤 Snare", "🙏 Worship guarded", "The promised land must not become a place where Israel forgets the LORD."]),
    ],
  },
  {
    chapter: 24,
    startVerse: 1,
    endVerse: 8,
    reference: "Exodus 24:1-8",
    title: "The Covenant Is Sealed With Blood",
    icon: "🩸",
    phrases: [
      phrase("⛰️ Come Up Unto The Lord", ["God calls Moses, Aaron, Nadab, Abihu, and the elders near.", "Covenant includes ordered approach.", "⛰️ Mountain", "👥 Leaders", "🙏 Worship afar", "Nearness to God is real, but still structured by His command."]),
      phrase("📖 Moses Told The People All The Words", ["The covenant is spoken to the people.", "They are not entering blind.", "📖 Words", "👂 Hearing", "🤝 Response", "God's covenant people must hear God's covenant words."]),
      phrase("🙋 All The Words Which The Lord Hath Said Will We Do", ["Israel answers with commitment.", "Their words are serious.", "🙋 We will do", "📜 God's commands", "🤝 Covenant promise", "This moment will make later disobedience even more weighty."]),
      phrase("🪨 Twelve Pillars", ["The twelve pillars represent the tribes of Israel.", "The whole people are represented before the altar.", "🪨 Pillars", "👥 Twelve tribes", "🙏 Covenant scene", "God is binding a people to Himself."]),
      phrase("🩸 Half Of The Blood", ["Blood is placed on the altar and on the people.", "The covenant is sealed with life-blood.", "🩸 Blood", "🔥 Altar", "👥 People", "Covenant with a holy God is not casual paperwork."]),
      phrase("📖 The Book Of The Covenant", ["The covenant words are written and read.", "Israel hears the terms again.", "📖 Book", "👂 Public reading", "🤝 Covenant obedience", "God's people are shaped by spoken and written word."]),
      phrase("🩸 Behold The Blood Of The Covenant", ["Moses names what the blood means.", "The people are marked into covenant relationship.", "🩸 Covenant blood", "👥 People sprinkled", "📜 Words confirmed", "The relationship is sealed by God's appointed sign."]),
    ],
  },
  {
    chapter: 24,
    startVerse: 9,
    endVerse: 18,
    reference: "Exodus 24:9-18",
    title: "The Elders Eat Before God",
    icon: "🍽️",
    phrases: [
      phrase("👀 They Saw The God Of Israel", ["The elders receive a real vision of God.", "The text is careful and reverent.", "👀 Saw", "👑 God of Israel", "💎 Sapphire-like pavement", "The covenant brings astonishing nearness without making God common."]),
      phrase("💎 As It Were A Paved Work Of A Sapphire Stone", ["The description focuses under God's feet.", "The language reaches for beauty without pretending to contain God.", "💎 Sapphire", "🌌 Clearness", "👑 Majesty", "Some glory can be described, but not domesticated."]),
      phrase("🍽️ They Did Eat And Drink", ["The elders eat before God.", "Covenant nearness becomes fellowship.", "🍽️ Meal", "👥 Elders", "🙏 Before God", "The holy God who thundered at Sinai also allows covenant fellowship."]),
      phrase("🪨 Tables Of Stone", ["God calls Moses up to receive the tablets.", "The covenant words will be written by God.", "🪨 Stone", "📜 Law", "👑 Divine authority", "Israel's life will be ordered by God's own testimony."]),
      phrase("☁️ A Cloud Covered The Mount", ["The cloud marks God's presence on Sinai.", "Moses waits before entering deeper glory.", "☁️ Cloud", "⛰️ Mountain", "⏳ Six days", "God's presence is weighty and not rushed."]),
      phrase("🔥 Like Devouring Fire", ["The glory of the LORD appears like devouring fire.", "Israel sees holiness from below.", "🔥 Fire", "✨ Glory", "😨 Awe", "The God of covenant fellowship is still the holy God."]),
      phrase("⏳ Forty Days And Forty Nights", ["Moses remains on the mountain for forty days and nights.", "The people must wait.", "⏳ Forty days", "⛰️ Mountain", "📜 Instruction", "This waiting period will become a test in Exodus 32."]),
    ],
  },
  {
    chapter: 25,
    startVerse: 1,
    endVerse: 22,
    reference: "Exodus 25:1-22",
    title: "The Ark And Mercy Seat",
    icon: "📦",
    phrases: [
      phrase("🤲 Of Every Man That Giveth It Willingly", ["The tabernacle offering begins with willing hearts.", "God does not present holy construction as forced extraction.", "🤲 Willing gift", "💛 Heart", "🏕️ Dwelling", "The rescued people are invited to bring materials for God's sanctuary."]),
      phrase("🏕️ Let Them Make Me A Sanctuary", ["God wants to dwell among His people.", "This is the heart of the tabernacle instructions.", "🏕️ Sanctuary", "👥 Among them", "✨ God's presence", "Exodus moves from rescue to dwelling."]),
      phrase("📐 According To All That I Shew Thee", ["The tabernacle is built by God's pattern.", "Worship is received, not invented.", "📐 Pattern", "👀 Shown to Moses", "🛠️ Obedient making", "Holy space must be shaped by God's word."]),
      phrase("📦 An Ark Of Shittim Wood", ["The ark is the central covenant chest.", "It will hold the testimony.", "📦 Ark", "🪵 Wood", "📜 Covenant witness", "The furniture is not random decoration; it carries covenant meaning."]),
      phrase("👑 A Crown Of Gold Round About", ["The ark is overlaid with gold and crowned.", "Its beauty matches its holy purpose.", "👑 Gold", "✨ Holy beauty", "📦 Ark", "God's dwelling is marked by glory, not carelessness."]),
      phrase("🪽 Cherubims", ["Cherubim are placed over the mercy seat.", "They echo guarded holy presence.", "🪽 Cherubim", "🩸 Mercy seat", "🔥 Holy space", "Access to God is merciful, but never casual."]),
      phrase("🩸 Mercy Seat", ["The mercy seat is the place where God will meet with Moses.", "It is connected to atonement and covenant presence.", "🩸 Mercy", "📦 Ark", "🗣️ God speaks", "God's throne among Israel is a place of holy mercy."]),
      phrase("🗣️ There I Will Meet With Thee", ["God promises to meet and speak from above the mercy seat.", "The tabernacle is about relationship, not furniture alone.", "🗣️ Speech", "🤝 Meeting", "🏕️ Presence", "God provides a place where His word comes to His people."]),
    ],
  },
  {
    chapter: 25,
    startVerse: 23,
    endVerse: 40,
    reference: "Exodus 25:23-40",
    title: "Table And Lampstand",
    icon: "🕯️",
    phrases: [
      phrase("🍞 A Table Of Shittim Wood", ["The table belongs in holy space.", "It will hold bread before the LORD.", "🍞 Table", "🏕️ Holy place", "🤲 Provision remembered", "God's presence includes fellowship and provision."]),
      phrase("🍞 Shewbread", ["The bread is placed before God continually.", "Israel's tribes are represented in God's presence.", "🍞 Bread", "👥 People remembered", "⏳ Continual", "The table teaches ongoing dependence and fellowship."]),
      phrase("🕯️ A Candlestick Of Pure Gold", ["The lampstand brings light into holy space.", "It is carefully made and beautiful.", "🕯️ Lampstand", "✨ Gold", "🏕️ Sanctuary light", "Nearness to God is filled with ordered light."]),
      phrase("🌸 Bowls Made Like Unto Almonds", ["The lampstand is shaped with plant-like beauty.", "Holy design includes artistry.", "🌸 Almond blossoms", "🎨 Beauty", "🕯️ Light", "God values crafted beauty in worship."]),
      phrase("🔥 Seven Lamps", ["The seven lamps give light over against the lampstand.", "The holy place is not dark.", "🔥 Lamps", "7️⃣ Fullness", "💡 Illumination", "God provides light for priestly service."]),
      phrase("👀 Look That Thou Make Them After Their Pattern", ["Moses must follow the pattern shown on the mountain.", "The details matter because they are God's details.", "👀 Look", "📐 Pattern", "🛠️ Obedience", "Worship is not a place for careless improvisation."]),
    ],
  },
  {
    chapter: 26,
    startVerse: 1,
    endVerse: 14,
    reference: "Exodus 26:1-14",
    title: "Curtains For The Tabernacle",
    icon: "🧵",
    phrases: [
      phrase("🧵 Fine Twined Linen", ["The tabernacle begins with carefully made curtains.", "Holy space is crafted with skill.", "🧵 Linen", "🎨 Workmanship", "🏕️ Dwelling", "God's dwelling among Israel is not thrown together."]),
      phrase("🪽 Cherubims Of Cunning Work", ["Cherubim are woven into the curtains.", "The imagery marks the space as holy.", "🪽 Cherubim", "🧵 Woven beauty", "🔥 Guarded presence", "The tabernacle carries visual reminders of heavenly holiness."]),
      phrase("🔗 Coupled Together", ["The curtains are joined into one tabernacle.", "Many pieces become one dwelling.", "🔗 Loops and clasps", "🧵 Joined curtains", "🏕️ One tent", "The details teach ordered unity."]),
      phrase("🐐 Curtains Of Goats' Hair", ["Outer coverings protect the holy space.", "The dwelling has layers.", "🐐 Goats' hair", "🏕️ Covering", "🛡️ Protection", "God's instructions include both beauty and durability."]),
      phrase("🛡️ Rams' Skins Dyed Red", ["More coverings are placed over the tent.", "The holy dwelling is protected from outside exposure.", "🛡️ Covering", "🔴 Red skins", "🏕️ Shelter", "The sanctuary is a guarded place of nearness."]),
    ],
  },
  {
    chapter: 26,
    startVerse: 15,
    endVerse: 37,
    reference: "Exodus 26:15-37",
    title: "Frames, Veils, And Holy Space",
    icon: "🚪",
    phrases: [
      phrase("🪵 Boards For The Tabernacle", ["The tabernacle has a stable frame.", "God gives structure to the dwelling.", "🪵 Boards", "📐 Measurements", "🏕️ Stability", "Holy space has order and form."]),
      phrase("🥈 Sockets Of Silver", ["The boards rest in silver sockets.", "The dwelling is carefully grounded.", "🥈 Silver", "🪵 Boards", "📐 Fitted design", "The details show strength and beauty working together."]),
      phrase("🔩 Bars Of Shittim Wood", ["Bars hold the frames together.", "The tabernacle is joined and strengthened.", "🔩 Bars", "🪵 Frames", "🔗 Unity", "God's dwelling is built with careful connection."]),
      phrase("🚪 A Vail", ["The veil separates the holy place from the most holy.", "Access is real, but guarded.", "🚪 Veil", "📦 Ark behind it", "🔥 Holiness", "God is near, but sinful people cannot rush in however they want."]),
      phrase("📦 Within The Vail", ["The ark belongs inside the veil.", "The most holy place centers on God's covenant presence.", "📦 Ark", "🚪 Veil", "🩸 Mercy seat", "The heart of the tabernacle is guarded mercy."]),
      phrase("🍞 The Table Without The Vail", ["The table is outside the veil in the holy place.", "Each piece has its assigned place.", "🍞 Table", "🕯️ Lampstand", "📐 Ordered placement", "Worship space is arranged by God's wisdom."]),
      phrase("🌈 An Hanging For The Door", ["The entrance has a crafted hanging.", "The way into holy space is marked and ordered.", "🌈 Blue, purple, scarlet", "🚪 Door", "🎨 Needlework", "Approach to God is beautiful, but still defined by God."]),
    ],
  },
  {
    chapter: 27,
    startVerse: 1,
    endVerse: 19,
    reference: "Exodus 27:1-19",
    title: "The Altar And The Court",
    icon: "🔥",
    phrases: [
      phrase("🔥 An Altar Of Shittim Wood", ["The altar stands in the courtyard.", "Sacrifice belongs at the approach to God.", "🔥 Altar", "🪵 Wood", "🩸 Sacrifice", "The path toward God's dwelling passes through atonement."]),
      phrase("🦬 Horns Of It", ["The altar has horns at its corners.", "They are part of its strength and ritual design.", "🦬 Horns", "🔥 Altar", "📐 Holy pattern", "Even the altar's shape is given by God."]),
      phrase("🧺 Pans, Shovels, Basons", ["The tools for altar service are named.", "Holy worship includes practical work.", "🧺 Tools", "🔥 Ashes", "🩸 Service", "The details remind us that worship involves real labor, not vague feelings."]),
      phrase("🏕️ The Court Of The Tabernacle", ["The court creates a defined space around the dwelling.", "There is an outside and an inside.", "🏕️ Court", "🚧 Boundaries", "🙏 Approach", "God provides access, but ordered access."]),
      phrase("🧵 Fine Twined Linen", ["The court hangings mark off holy space.", "The boundary itself has beauty.", "🧵 Linen", "📐 Measurements", "🏕️ Sacred boundary", "Holiness is made visible through separation and order."]),
      phrase("🥉 Pins Of The Court", ["Even the pins are mentioned.", "Small parts matter in the structure God commands.", "🥉 Pins", "🏕️ Stability", "🛠️ Faithful details", "Nothing is too small when it belongs to God's dwelling."]),
    ],
  },
  {
    chapter: 27,
    startVerse: 20,
    endVerse: 21,
    reference: "Exodus 27:20-21",
    title: "Oil For The Lamp",
    icon: "🕯️",
    phrases: [
      phrase("🫒 Pure Oil Olive", ["The lamp requires pure olive oil.", "God specifies the fuel for holy light.", "🫒 Oil", "🕯️ Lamp", "✨ Purity", "Holy service is sustained by what God commands."]),
      phrase("🕯️ To Cause The Lamp To Burn Always", ["The light is to be kept burning continually.", "The holy place is not left dark.", "🕯️ Light", "⏳ Continual", "🙏 Service", "God's dwelling is marked by ongoing light."]),
      phrase("👥 Aaron And His Sons", ["The priests tend the lamp.", "Holy light requires faithful service.", "👥 Priests", "🕯️ Tending", "📅 Evening to morning", "God appoints people to maintain what belongs to His presence."]),
      phrase("📜 A Statute For Ever", ["This is not a one-time instruction.", "It becomes part of Israel's ongoing worship life.", "📜 Statute", "👥 Generations", "🕯️ Continued light", "God's worship forms rhythms across generations."]),
    ],
  },
  {
    chapter: 28,
    startVerse: 1,
    endVerse: 14,
    reference: "Exodus 28:1-14",
    title: "Garments For Glory And Beauty",
    icon: "👕",
    phrases: [
      phrase("👥 Aaron Thy Brother", ["Aaron and his sons are set apart for priestly service.", "The priesthood is appointed, not self-invented.", "👥 Aaron", "👕 Sons", "🙏 Minister unto God", "Holy service begins with God's calling."]),
      phrase("✨ Holy Garments", ["The priestly garments are called holy.", "Clothing becomes part of consecrated service.", "✨ Holy", "👕 Garments", "🙏 Priesthood", "Nearness to God shapes even what the priest wears."]),
      phrase("👑 For Glory And For Beauty", ["The garments are meant to carry weight and beauty.", "Worship is not careless or ugly in God's design.", "👑 Glory", "🎨 Beauty", "🙏 Service", "God's holiness is reflected through ordered beauty."]),
      phrase("🧠 Wise Hearted", ["Skilled workers make the garments.", "Their wisdom is given by God.", "🧠 Wisdom", "🛠️ Skill", "👕 Holy garments", "Craftsmanship can be Spirit-enabled service."]),
      phrase("💎 Two Onyx Stones", ["The stones carry the names of Israel's sons.", "The priest bears the people before God.", "💎 Stones", "👥 Names", "🙏 Representation", "Priestly ministry is not about private status; it carries the people."]),
      phrase("💪 Upon His Shoulders", ["The names are carried on the priest's shoulders.", "Shoulders picture bearing weight.", "💪 Shoulders", "👥 Israel's names", "🙏 Before the LORD", "The priest's service includes carrying the covenant people."]),
    ],
  },
  {
    chapter: 28,
    startVerse: 15,
    endVerse: 43,
    reference: "Exodus 28:15-43",
    title: "The Breastplate And Holy Crown",
    icon: "💎",
    phrases: [
      phrase("💎 Breastplate Of Judgment", ["The breastplate is connected with priestly judgment and discernment.", "It is beautiful and serious.", "💎 Breastplate", "⚖️ Judgment", "🙏 Priest before God", "The priest represents Israel in matters requiring God's direction."]),
      phrase("👥 According To The Twelve Tribes", ["The stones represent Israel's tribes.", "Each tribe is remembered before God.", "👥 Twelve tribes", "💎 Stones", "❤️ Over the heart", "God's people are carried personally, not anonymously."]),
      phrase("❤️ Upon Aaron's Heart", ["Aaron bears the names over his heart.", "Representation includes affection and burden.", "❤️ Heart", "👥 Names", "🙏 Before the LORD", "The priest carries the people close, not merely officially."]),
      phrase("⚖️ Urim And Thummim", ["These are connected with discerning judgment before the LORD.", "Israel needs God's guidance.", "⚖️ Judgment", "🙏 Before God", "🧭 Direction", "Covenant leadership depends on God's wisdom, not only human calculation."]),
      phrase("🔔 Bells Of Gold", ["The robe has bells around the hem.", "The priest's movement is heard in holy service.", "🔔 Bells", "👕 Robe", "🔥 Holy place", "The detail teaches the seriousness of entering God's presence."]),
      phrase("✨ Holiness To The Lord", ["The gold plate on Aaron's forehead names the priestly calling.", "His service is marked as belonging to God.", "✨ Holiness", "👑 Crown", "🙏 Service", "Ministry is holy identity, not personal platform."]),
      phrase("🩳 Linen Breeches", ["Even undergarments are commanded.", "God protects modesty in holy service.", "🩳 Linen", "🛡️ Covering", "🔥 Near altar", "Nothing about priestly service is outside God's concern."]),
      phrase("⚠️ That They Bear Not Iniquity", ["Priests must serve as God commands.", "Holy service mishandled brings guilt.", "⚠️ Warning", "🙏 Service", "🔥 Holiness", "Nearness to God is gift and responsibility."]),
    ],
  },
  {
    chapter: 29,
    startVerse: 1,
    endVerse: 21,
    reference: "Exodus 29:1-21",
    title: "The Priests Are Consecrated",
    icon: "🩸",
    phrases: [
      phrase("🧼 Wash Them With Water", ["Priestly service begins with washing.", "The priests do not approach God by self-confidence.", "🧼 Washing", "👥 Priests", "🙏 Preparation", "Cleansing comes before service."]),
      phrase("👕 Put Upon Aaron The Coat", ["Aaron is clothed for his role.", "The garments mark him for holy service.", "👕 Clothing", "👑 Priesthood", "✨ Glory and beauty", "The priest is dressed according to God's command, not personal taste."]),
      phrase("🫒 Anointing Oil", ["Oil is poured on Aaron's head.", "He is set apart for priestly ministry.", "🫒 Oil", "👑 Head", "🙏 Consecration", "God marks the priest as belonging to holy service."]),
      phrase("🐂 A Bullock For A Sin Offering", ["The priests need a sin offering.", "Their role does not make them sinless.", "🐂 Bull", "🩸 Sin offering", "🙏 Atonement", "The mediator must first receive cleansing."]),
      phrase("✋ Put Their Hands Upon The Head", ["The priests identify with the offering.", "The sacrifice is not detached from them.", "✋ Hands", "🐂 Offering", "🩸 Identification", "Atonement involves represented life."]),
      phrase("🔥 Burn The Whole Ram", ["The burnt offering rises completely to God.", "Consecration includes whole surrender.", "🔥 Burnt offering", "🐏 Ram", "🙏 Given to God", "Priestly service is not half-owned by the priest."]),
      phrase("👂 Tip Of The Right Ear", ["Blood marks ear, thumb, and toe.", "The whole life is consecrated.", "👂 Hearing", "👍 Serving", "🦶 Walking", "Priests are marked to hear, act, and walk before God."]),
    ],
  },
  {
    chapter: 29,
    startVerse: 22,
    endVerse: 46,
    reference: "Exodus 29:22-46",
    title: "Daily Offerings And God's Dwelling",
    icon: "🔥",
    phrases: [
      phrase("🤲 Wave Offering", ["Parts of the sacrifice are waved before the LORD.", "The priestly portion is first presented to God.", "🤲 Waved", "🔥 Offered", "🙏 Before the LORD", "Even what the priest receives is acknowledged as God's."]),
      phrase("⏳ Seven Days", ["Consecration lasts seven days.", "The process is complete and ordered.", "⏳ Seven days", "🙏 Ordination", "🔥 Altar sanctified", "Holy service is not rushed."]),
      phrase("🔥 Continually", ["Daily offerings are made morning and evening.", "Worship is sustained over time.", "🔥 Morning lamb", "🌙 Evening lamb", "⏳ Continual", "Israel's life near God is rhythmic, not occasional."]),
      phrase("🍞 Flour Mingled With Oil", ["The daily offering includes grain and drink elements.", "Worship involves provision given back to God.", "🍞 Flour", "🫒 Oil", "🍷 Drink offering", "Daily food symbols become daily devotion."]),
      phrase("🤝 There I Will Meet With The Children Of Israel", ["God promises meeting at the tabernacle.", "The goal is relationship.", "🤝 Meeting", "👥 Israel", "✨ Glory", "The tabernacle is about God's presence among His people."]),
      phrase("🏕️ I Will Dwell Among The Children Of Israel", ["This is one of the great lines of Exodus.", "God rescued Israel so He could dwell with them.", "🏕️ Dwell", "👥 Among them", "👑 Their God", "Redemption aims at presence."]),
      phrase("🧠 They Shall Know That I Am The Lord", ["Deliverance and dwelling reveal God's identity.", "The people are meant to know Him.", "🧠 Know", "🔓 Brought out", "🏕️ Dwelling God", "The Exodus is not only escape from Egypt; it is knowing the LORD."]),
    ],
  },
  {
    chapter: 30,
    startVerse: 1,
    endVerse: 10,
    reference: "Exodus 30:1-10",
    title: "The Altar Of Incense",
    icon: "🌫️",
    phrases: [
      phrase("🌫️ An Altar To Burn Incense", ["The incense altar stands inside holy service.", "Prayer-like fragrance rises before God.", "🌫️ Incense", "🔥 Altar", "🙏 Near presence", "The tabernacle includes not only sacrifice, but fragrant worship."]),
      phrase("👑 A Crown Of Gold Round About", ["The incense altar has a gold crown.", "Its design is beautiful and holy.", "👑 Gold crown", "🌫️ Incense", "🏕️ Holy place", "God gives beauty to the place of continual worship."]),
      phrase("🌅 Every Morning", ["Aaron burns incense every morning.", "Holy service has daily rhythm.", "🌅 Morning", "🌫️ Incense", "🕯️ Lamps dressed", "Each day begins with tended light and rising fragrance."]),
      phrase("🌙 At Even", ["Incense is also burned in the evening.", "The day closes with holy service.", "🌙 Evening", "🕯️ Lamps lit", "🌫️ Incense", "Worship surrounds the daily life of Israel."]),
      phrase("🚫 Strange Incense", ["God forbids unauthorized incense.", "Holy things must not be invented casually.", "🚫 Strange incense", "📜 God's command", "🔥 Holy boundary", "Worship must be shaped by God's word."]),
      phrase("🩸 Once In A Year", ["Atonement is made on the horns of the incense altar once a year.", "Even the altar of fragrance needs blood applied.", "🩸 Atonement", "🌫️ Incense altar", "📅 Yearly", "Access and worship still depend on cleansing."]),
    ],
  },
  {
    chapter: 30,
    startVerse: 11,
    endVerse: 21,
    reference: "Exodus 30:11-21",
    title: "Atonement Money And The Laver",
    icon: "💧",
    phrases: [
      phrase("🧮 When Thou Takest The Sum", ["Counting the people requires atonement money.", "Israel's lives belong to God.", "🧮 Numbering", "🪙 Ransom", "🙏 Before the LORD", "Even administration is brought under worship."]),
      phrase("🪙 A Ransom For His Soul", ["Each person gives ransom money.", "The language teaches that life must be covered before God.", "🪙 Ransom", "👤 Soul", "⚖️ Atonement", "Israel is counted as a redeemed people."]),
      phrase("⚖️ The Rich Shall Not Give More", ["The ransom amount is the same for rich and poor.", "Every life stands equal in this act.", "⚖️ Same amount", "💰 Rich", "🤲 Poor", "Atonement is not priced by status."]),
      phrase("🏕️ Service Of The Tabernacle", ["The atonement money supports tabernacle service.", "Redemption and worship are connected.", "🏕️ Tabernacle", "🪙 Money", "📜 Memorial", "The people's ransom becomes part of the dwelling-place work."]),
      phrase("💧 A Laver Of Brass", ["The laver provides water for priestly washing.", "Service near God requires cleansing.", "💧 Laver", "👐 Hands", "🦶 Feet", "Priests must be washed before approaching the altar or tent."]),
      phrase("⚠️ That They Die Not", ["The warning is repeated.", "Holy service without cleansing is dangerous.", "⚠️ Warning", "💧 Washing", "🔥 Altar", "God's nearness is mercy, but it is never casual."]),
    ],
  },
  {
    chapter: 30,
    startVerse: 22,
    endVerse: 38,
    reference: "Exodus 30:22-38",
    title: "Holy Oil And Holy Incense",
    icon: "🫒",
    phrases: [
      phrase("🫒 Principal Spices", ["The anointing oil is made from costly spices.", "Holy service is marked by richness and care.", "🫒 Oil", "🌿 Spices", "✨ Set apart", "God's things are not treated as common."]),
      phrase("✨ An Holy Anointing Oil", ["The oil consecrates the tabernacle, furniture, and priests.", "It marks them as belonging to God.", "✨ Holy oil", "🏕️ Tabernacle", "👥 Priests", "Anointing sets apart people and objects for holy service."]),
      phrase("🚫 Upon Man's Flesh Shall It Not Be Poured", ["The oil must not be used casually.", "It is not ordinary perfume.", "🚫 Not common", "✨ Holy", "📜 Guarded use", "What God sets apart must not be turned into personal luxury."]),
      phrase("🌫️ A Perfume", ["The incense is carefully blended.", "Scent becomes part of holy worship.", "🌫️ Incense", "🌿 Spices", "🙏 Before testimony", "God's worship engages the senses, but under His command."]),
      phrase("⚖️ Tempered Together, Pure And Holy", ["The incense is balanced, pure, and holy.", "It is crafted with skill.", "⚖️ Blended", "✨ Pure", "🌫️ Holy fragrance", "Beauty in worship is ordered and consecrated."]),
      phrase("🚫 Ye Shall Not Make To Yourselves", ["The incense recipe must not be copied for personal use.", "Holy fragrance belongs to God's service.", "🚫 No imitation", "🙏 Reserved for God", "🔥 Holy boundary", "God guards the difference between holy and common."]),
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
    "This phrase matters because Exodus is now showing what redeemed life protects.",
    "The laws are not random rule collecting; they teach Israel how not to recreate Egypt among themselves.",
    "⚖️ Justice",
    "🏠 Households",
    "🤝 Neighbor love",
    "⛺ Holy worship",
    "The detail helps a beginner see that freedom from Pharaoh becomes responsibility before God and neighbor.",
  ]);
}

function makeBeginnerExodusPhrase(title: string, section: PersonalExodusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the law or covenant scene is easier to follow.`,
    focus,
    "For a beginner, the key is to ask what this law is protecting.",
    "Exodus brings God's holiness into ordinary life: work, injury, money, courts, rest, feasts, worship, and covenant promises.",
    "⚖️ What is fair",
    "🛡️ Who is protected",
    "🧾 What is required",
    "🙌 How worship stays holy",
    `In ${section.title}, God is shaping a rescued people into a community that reflects His justice.`,
  ]);
}

function ensureBeginnerExodusPhraseDepth(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerExodusPhrase("🧭 What Is Happening Here?", section, "This phrase helps the reader locate the law or covenant scene: who is being protected, what wrong is being limited, and what kind of people Israel must become."),
    makeBeginnerExodusPhrase("🔎 Why This Detail Matters", section, "This detail matters because Exodus moves from rescue to formation; God is shaping daily life, not only dramatic worship moments."),
    makeBeginnerExodusPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why these laws are here, but they show that God's salvation changes households, courts, money, animals, work, rest, and worship."),
    makeBeginnerExodusPhrase("🧵 Watch The Pattern", section, "Watch the pattern: God protects vulnerable people, limits retaliation, commands honest worship, and makes covenant life visible."),
    makeBeginnerExodusPhrase("❤️ What This Shows About People", section, "This scene shows people need boundaries because power, anger, greed, negligence, and false worship can damage a community."),
    makeBeginnerExodusPhrase("🙌 What This Shows About God", section, "This scene shows the LORD cares about justice in ordinary life, not only songs, sacrifices, and mountain experiences."),
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

export const EXODUS_21_30_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS, [21, 22, 23, 24], "⚖️").map(ensureBeginnerExodusPhraseDepth),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS, [25, 26, 27, 28], "⛺").map(ensureBeginnerExodusPhraseDepth),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS, [29, 30], "🕯️").map(ensureBeginnerExodusPhraseDepth),
  ...RAW_EXODUS_21_30_PERSONAL_SECTIONS.filter((section) => section.chapter < 21 || section.chapter > 30),
];
