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
      phrase("⚖️ Eye For Eye", ["The wording limits revenge.", "The response must fit the harm.", "⚖️ Proportion", "🚫 No escalating vengeance", "🩹 Injury addressed", "God's law restrains retaliation instead of unleashing it."]),
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
      phrase("🐎 Borrowed", ["Borrowing carries responsibility.", "Using another person's property is not casual.", "🐎 Borrowed animal", "🧾 Loss", "🤝 Neighbor care", "The law teaches people to treat another person's property with seriousness."]),
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
      phrase("🗣️ Thou Shalt Not Raise A False Report", ["False words damage justice.", "God's people must not spread what is untrue.", "🗣️ Report", "⚖️ Court", "🤝 Neighbor", "Truth fits within covenant faithfulness."]),
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
      phrase("🥉 Pins Of The Court", ["Even the pins are mentioned.", "Small parts matter in the structure God commands.", "🥉 Pins", "🏕️ Stability", "🛠️ Faithful details", "Nothing is too small when it serves God's dwelling."]),
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
      phrase("👥 Aaron And His Sons", ["The priests tend the lamp.", "Holy light requires faithful service.", "👥 Priests", "🕯️ Tending", "📅 Evening to morning", "God appoints people to maintain what serves His presence."]),
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
      phrase("✨ Holiness To The Lord", ["The gold plate on Aaron's forehead names the priestly calling.", "His service is marked as set apart for God.", "✨ Holiness", "👑 Crown", "🙏 Service", "Ministry is holy identity, not personal platform."]),
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
      phrase("🫒 Principal Spices", ["The anointing oil is made from costly spices.", "Holy service is marked by richness and care.", "🫒 Oil", "🌿 Spices", "✨ Set apart", "Holy things are not treated as common."]),
      phrase("✨ An Holy Anointing Oil", ["The oil consecrates the tabernacle, furniture, and priests.", "It marks them as set apart for God.", "✨ Holy oil", "🏕️ Tabernacle", "👥 Priests", "Anointing sets apart people and objects for holy service."]),
      phrase("🚫 Upon Man's Flesh Shall It Not Be Poured", ["The oil must not be used casually.", "It is not ordinary perfume.", "🚫 Not common", "✨ Holy", "📜 Guarded use", "What God sets apart must not be turned into personal luxury."]),
      phrase("🌫️ A Perfume", ["The incense is carefully blended.", "Scent becomes part of holy worship.", "🌫️ Incense", "🌿 Spices", "🙏 Before testimony", "God's worship engages the senses, but under His command."]),
      phrase("⚖️ Tempered Together, Pure And Holy", ["The incense is balanced, pure, and holy.", "It is crafted with skill.", "⚖️ Blended", "✨ Pure", "🌫️ Holy fragrance", "Beauty in worship is ordered and consecrated."]),
      phrase("🚫 Ye Shall Not Make To Yourselves", ["The incense recipe must not be copied for personal use.", "Holy fragrance is reserved for God's service.", "🚫 No imitation", "🙏 Reserved for God", "🔥 Holy boundary", "God guards the difference between holy and common."]),
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
    "The wording matters because Exodus is now showing what redeemed life protects.",
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
    makeBeginnerExodusPhrase("🧭 What Is Happening Here?", section, "The wording helps the reader locate the law or covenant scene: who is being protected, what wrong is being limited, and what kind of people Israel must become."),
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

const DAY_27_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 21:1-6": ["These Are The Judgments", "An Hebrew Servant", "Six Years He Shall Serve", "In The Seventh He Shall Go Out Free", "I Love My Master", "He Shall Serve Him For Ever"],
  "Exodus 21:7-11": ["If A Man Sell His Daughter To Be A Maidservant", "She Shall Not Go Out As The Menservants Do", "He Shall Let Her Be Redeemed", "After The Manner Of Daughters", "Her Food, Her Raiment, And Her Duty Of Marriage", "Then Shall She Go Out Free Without Money"],
  "Exodus 21:12-17": ["He That Smiteth A Man, So That He Die", "God Deliver Him Into His Hand", "I Will Appoint Thee A Place", "If A Man Come Presumptuously", "He That Smiteth His Father, Or His Mother", "He That Stealeth A Man", "He That Curseth His Father, Or His Mother"],
  "Exodus 21:18-23": ["If Men Strive Together", "He Shall Pay For The Loss Of His Time", "Cause Him To Be Thoroughly Healed", "If A Man Smite His Servant", "For He Is His Money", "If Men Strive, And Hurt A Woman With Child", "Life For Life"],
  "Exodus 21:24-29": ["Eye For Eye", "Tooth For Tooth", "Hand For Hand", "Foot For Foot", "He Shall Let Him Go Free", "If An Ox Gore A Man", "The Ox Shall Be Surely Stoned", "The Owner Also Shall Be Put To Death"],
  "Exodus 21:30-35": ["If There Be Laid On Him A Sum Of Money", "The Ransom Of His Life", "Whether He Have Gored A Son", "If The Ox Shall Push A Manservant", "Thirty Shekels Of Silver", "If A Man Shall Open A Pit", "The Owner Of The Pit Shall Make It Good"],
  "Exodus 21:36-36": ["If It Be Known", "The Ox Hath Used To Push", "In Time Past", "His Owner Hath Not Kept Him In", "He Shall Surely Pay Ox For Ox", "The Dead Shall Be His Own"],
  "Exodus 22:1-6": ["If A Man Shall Steal An Ox, Or A Sheep", "He Shall Restore Five Oxen", "Breaking Up", "There Shall No Blood Be Shed For Him", "He Should Make Full Restitution", "The Best Of His Own Field", "If Fire Break Out"],
  "Exodus 22:7-12": ["If A Man Shall Deliver Unto His Neighbour Money Or Stuff", "The Master Of The House Shall Be Brought Unto The Judges", "Whom The Judges Shall Condemn", "Deliver Unto His Neighbour An Ass, Or An Ox", "An Oath Of The LORD Shall Be Between Them", "He Shall Make Restitution Unto The Owner"],
  "Exodus 22:13-15": ["If It Be Torn In Pieces", "Let Him Bring It For Witness", "He Shall Not Make Good", "If A Man Borrow Ought Of His Neighbour", "He Shall Surely Make It Good", "If The Owner Thereof Be With It"],
  "Exodus 22:16-21": ["If A Man Entice A Maid", "He Shall Surely Endow Her", "Thou Shalt Not Suffer A Witch To Live", "Whosoever Lieth With A Beast", "He That Sacrificeth Unto Any God", "Thou Shalt Neither Vex A Stranger", "Ye Were Strangers In The Land Of Egypt"],
  "Exodus 22:22-27": ["Ye Shall Not Afflict Any Widow, Or Fatherless Child", "If Thou Afflict Them In Any Wise", "I Will Surely Hear Their Cry", "My Wrath Shall Wax Hot", "Thou Shalt Not Be To Him As An Usurer", "If Thou At All Take Thy Neighbour's Raiment To Pledge", "I Will Hear; For I Am Gracious"],
  "Exodus 22:28-31": ["Thou Shalt Not Revile The Gods", "Nor Curse The Ruler Of Thy People", "Thou Shalt Not Delay To Offer", "The Firstborn Of Thy Sons Shalt Thou Give Unto Me", "Ye Shall Be Holy Men Unto Me", "Neither Shall Ye Eat Any Flesh That Is Torn"],
  "Exodus 23:1-6": ["Thou Shalt Not Raise A False Report", "Put Not Thine Hand With The Wicked", "Thou Shalt Not Follow A Multitude To Do Evil", "Neither Shalt Thou Countenance A Poor Man In His Cause", "Thine Enemy's Ox Or His Ass Going Astray", "Thou Shalt Not Wrest The Judgment Of Thy Poor"],
  "Exodus 23:7-9": ["Keep Thee Far From A False Matter", "The Innocent And Righteous Slay Thou Not", "I Will Not Justify The Wicked", "Thou Shalt Take No Gift", "A Gift Blindeth The Wise", "Thou Shalt Not Oppress A Stranger", "Ye Know The Heart Of A Stranger"],
  "Exodus 23:10-15": ["Six Years Thou Shalt Sow Thy Land", "The Seventh Year Thou Shalt Let It Rest", "Six Days Thou Shalt Do Thy Work", "On The Seventh Day Thou Shalt Rest", "Make No Mention Of The Name Of Other Gods", "Three Times Thou Shalt Keep A Feast", "The Feast Of Unleavened Bread"],
  "Exodus 23:16-19": ["The Feast Of Harvest", "The Firstfruits Of Thy Labours", "The Feast Of Ingathering", "Three Times In The Year", "Thou Shalt Not Offer The Blood Of My Sacrifice With Leavened Bread", "The First Of The Firstfruits", "Thou Shalt Not Seethe A Kid In His Mother's Milk"],
  "Exodus 23:20-25": ["Behold, I Send An Angel Before Thee", "To Keep Thee In The Way", "Beware Of Him, And Obey His Voice", "My Name Is In Him", "Mine Angel Shall Go Before Thee", "Thou Shalt Not Bow Down To Their Gods", "Ye Shall Serve The LORD Your God"],
  "Exodus 23:26-31": ["There Shall Nothing Cast Their Young", "Nor Be Barren", "I Will Send My Fear Before Thee", "I Will Send Hornets Before Thee", "I Will Not Drive Them Out From Before Thee In One Year", "By Little And Little", "I Will Set Thy Bounds"],
  "Exodus 23:32-33": ["Thou Shalt Make No Covenant With Them", "Nor With Their Gods", "They Shall Not Dwell In Thy Land", "Lest They Make Thee Sin Against Me", "If Thou Serve Their Gods", "It Will Surely Be A Snare Unto Thee"],
  "Exodus 24:1-6": ["Come Up Unto The LORD", "Worship Ye Afar Off", "Moses Alone Shall Come Near", "All The Words Of The LORD", "All The People Answered With One Voice", "Moses Wrote All The Words", "Builded An Altar Under The Hill", "Twelve Pillars"],
  "Exodus 24:7-8": ["The Book Of The Covenant", "All That The LORD Hath Said Will We Do", "Moses Took The Blood", "Sprinkled It On The People", "Behold The Blood Of The Covenant", "Concerning All These Words"],
  "Exodus 24:9-14": ["Moses, And Aaron, Nadab, And Abihu", "Seventy Of The Elders Of Israel", "They Saw The God Of Israel", "A Paved Work Of A Sapphire Stone", "He Laid Not His Hand", "They Saw God, And Did Eat And Drink", "Come Up To Me Into The Mount"],
  "Exodus 24:15-18": ["Moses Went Up Into The Mount", "A Cloud Covered The Mount", "The Glory Of The LORD Abode", "The Seventh Day He Called Unto Moses", "A Devouring Fire", "Moses Was In The Mount Forty Days And Forty Nights"],
};

function explainExodusTwentyOneToTwentyEightPhrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("judgments") || lower.includes("servant") || lower.includes("maidservant") || lower.includes("go out free") || lower.includes("year of release")) {
    add(`${title} means God is bringing justice into ordinary life after rescue.`, "These laws do not let Israel recreate Egypt's cruelty. They put limits around power and protect people who could easily be mistreated.", "\u{2696}\u{FE0F} Justice", "\u{1F3E0} Household life", "\u{1F6E1}\u{FE0F} Protection", "God's rescued people must treat vulnerable people differently than Pharaoh did.");
  } else if (lower.includes("smite") || lower.includes("tooth") || lower.includes("eye") || lower.includes("life for life") || lower.includes("ox") || lower.includes("pit")) {
    add(`${title} means damage, negligence, and repair all matter before God.`, "The law teaches that damage cannot be ignored. Life, injury, animals, property, and negligence all matter before God.", "\u{2696}\u{FE0F} Fair judgment", "\u{1F9FE} Responsibility", "\u{1F91D} Repairing harm", "A beginner should see that God's law brings justice into ordinary conflicts, not only religious ceremonies.");
  } else if (lower.includes("widow") || lower.includes("fatherless") || lower.includes("stranger") || lower.includes("poor") || lower.includes("pledge") || lower.includes("usury")) {
    add(`${title} means God puts His protection around people who could easily be mistreated.`, "In the ancient world, widows, orphans, foreigners, and the poor could be easily exploited. God commands Israel to protect them.", "\u{1F494} Vulnerable people", "\u{1F932} Mercy", "\u{2696}\u{FE0F} Justice", "The people rescued from oppression must not become oppressors themselves.");
  } else if (lower.includes("sabbath") || lower.includes("feast") || lower.includes("firstfruits") || lower.includes("unleavened") || lower.includes("harvest")) {
    add(`${title} means Israel's calendar was being trained to remember God.`, "Sabbaths and feasts trained Israel to remember rescue, receive rest, and bring the first of their increase to the LORD.", "\u{1F4C6} Holy time", "\u{1F35E} Remembered rescue", "\u{1F33E} Firstfruits", "God's people do not seek Him only in crisis. Their calendar is under His rule too.");
  } else if (lower.includes("book of the covenant") || lower.includes("blood of the covenant") || lower.includes("all that the lord hath said")) {
    add(`${title} means Israel is being bound to the LORD in a serious covenant relationship.`, "Israel hears God's words, agrees to the covenant, and the blood marks the seriousness of the relationship.", "\u{1F4DC} Covenant words", "\u{1FA78} Covenant blood", "\u{1F64F} Worship response", "This is not casual agreement. The rescued people are being bound to the LORD as His covenant people.");
  } else if (lower.includes("offering") || lower.includes("willingly") || lower.includes("gold") || lower.includes("silver") || lower.includes("brass") || lower.includes("blue") || lower.includes("purple") || lower.includes("scarlet") || lower.includes("oil")) {
    add(`${title} means Israel is bringing real materials for the LORD's dwelling place.`, "The tabernacle begins with willing gifts, not forced labor like Egypt. The rescued people give valuable materials for worship.", "\u{1F381} Willing offering", "\u{1F48E} Precious materials", "\u{1F56F}\u{FE0F} Oil for light", "God is forming a worshiping people, not a slave workforce.");
  } else if (lower.includes("ark") || lower.includes("mercy seat") || lower.includes("cherubims") || lower.includes("testimony") || lower.includes("commune")) {
    add(`${title} means the center of Israel's worship is God's mercy and presence.`, "The ark held the testimony, and the mercy seat was the place where God promised to meet and speak with Moses.", "\u{1F4E6} Ark", "\u{1FAB6} Cherubim", "\u{1F64F} Meeting with God", "The center of Israel's camp is not Pharaoh's throne. It is the holy presence of the LORD.");
  } else if (lower.includes("table") || lower.includes("shewbread") || lower.includes("candlestick") || lower.includes("lamps") || lower.includes("almonds") || lower.includes("branches")) {
    add(`${title} means the holy place taught Israel through bread, light, beauty, and order.`, "The table, bread, lampstand, and lamps teach that God's house has fellowship, provision, beauty, and light.", "\u{1F35E} Bread before God", "\u{1F56F}\u{FE0F} Lamp light", "\u{1F33F} Almond design", "These details help a beginner see that worship space is teaching truth through objects.");
  } else if (lower.includes("curtain") || lower.includes("covering") || lower.includes("boards") || lower.includes("sockets") || lower.includes("vail") || lower.includes("holy place") || lower.includes("most holy")) {
    add(`${title} means God's nearness is ordered, beautiful, and never casual.`, "The tabernacle was not random fabric and wood. Curtains, boards, sockets, and the veil taught Israel that nearness to God is beautiful, ordered, and holy.", "\u{1F3D5}\u{FE0F} Holy tent", "\u{1F6AA} Veil", "\u{1F4CD} Holy and Most Holy", "God wants to dwell among His people, but His presence must be honored His way.");
  } else if (lower.includes("altar") || lower.includes("ashes") || lower.includes("horns") || lower.includes("court") || lower.includes("pins") || lower.includes("lamp to burn")) {
    add(`${title} means approach to God included sacrifice, boundaries, and steady service.`, "The altar teaches sacrifice before approach, the court marks holy boundaries, and the lamp keeps light before the LORD.", "\u{1FA78} Sacrifice", "\u{1F6A7} Courtyard boundary", "\u{1F56F}\u{FE0F} Continual light", "Israel learns that worship includes access, cleansing, boundaries, and steady service.");
  } else if (lower.includes("aaron") || lower.includes("priest") || lower.includes("ephod") || lower.includes("breastplate") || lower.includes("onyx") || lower.includes("names") || lower.includes("urim") || lower.includes("thummim") || lower.includes("holiness to the lord")) {
    add(`${title} means the priest stood before God on behalf of the people.`, "The priest carried Israel's names before God, wore holy garments, and served as a representative for the people.", "\u{1F455} Holy garments", "\u{1F48E} Stones with names", "\u{1F64F} Representing Israel", "A beginner should see that coming near to God requires a God-given mediator, not casual self-approach.");
  } else if (lower.includes("linen breeches") || lower.includes("nakedness") || lower.includes("die") || lower.includes("accepted")) {
    add(`${title} means priestly service before the holy LORD could not be treated casually.`, "Even clothing details matter because the priest's work happens before the holy LORD. Shame, sin, and careless approach cannot be treated lightly.", "\u{1F455} Covered for service", "\u{26A0}\u{FE0F} Holy danger", "\u{2705} Accepted before God", "The point is not fashion. It is reverent service before God's presence.");
  } else {
    add(`${title} gives a specific detail in Israel's covenant instruction.`, "The reader should ask what this wording protects, limits, restores, or sets apart.", "Exodus is showing that redemption reshapes ordinary life and worship.", "God's people are learning justice, mercy, obedience, and reverence in practical ways.");
  }

  return note(lines.slice(0, 8));
}
function makeDay27PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay27Phrase(section, title)];
}

function explainDay27Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("judgments")) {
    add(`${title} means these are case laws for real situations among God's people.`, "After the Ten Commandments, God shows what justice looks like in daily life.", "These laws touch servants, families, injuries, property, worship, courts, and covenant.", "⚖️ Case laws", "🏠 Ordinary life", "📜 God's justice", "The LORD is teaching Israel not to become another Egypt.");
  } else if (lower.includes("hebrew servant") || lower.includes("six years") || lower.includes("seventh") || lower.includes("serve him for ever") || lower.includes("i love my master")) {
    add(`${title} means Israelite service was limited by release, protection, and accountability.`, "This is not Pharaoh-style slavery where people are crushed without release.", "The law puts boundaries around service and gives a path to freedom.", "⏳ Six years", "🚪 Release", "🛡️ Protected servant", "God's rescued people must not treat workers the way Egypt treated them.");
  } else if (lower.includes("sell his daughter") || lower.includes("maidservant") || lower.includes("redeemed") || lower.includes("daughters") || lower.includes("food") || lower.includes("raiment") || lower.includes("duty of marriage") || lower.includes("free without money")) {
    add(`${title} protects a vulnerable woman inside a hard ancient household situation.`, "The law does not let a man use her and discard her without responsibility.", "Food, clothing, marriage rights, redemption, and freedom are all named because she matters before God.", "👩 Protected woman", "🍞 Food", "👗 Clothing", "God places limits on power so vulnerable people are not treated like disposable property.");
  } else if (lower.includes("smiteth") || lower.includes("die") || lower.includes("presumptuously") || lower.includes("father") || lower.includes("mother") || lower.includes("stealeth a man") || lower.includes("curseth")) {
    add(`${title} treats violence, family dishonor, and kidnapping as serious sins.`, "Israel's law protects life, parents, and human dignity.", "Some actions are not small disputes; they attack the order God gives for community life.", "🩸 Life matters", "👨‍👩‍👧 Family honor", "🚫 Kidnapping condemned", "A rescued people must value human life because every person lives before God.");
  } else if (lower.includes("appoint thee a place") || lower.includes("god deliver him")) {
    add(`${title} means God's justice pays attention to intent, guilt, and refuge.`, "Not every death is treated the same way.", "The law makes room for justice that considers intent, guilt, and refuge.", "⚖️ Intent matters", "🏃 Place of refuge", "📜 Careful judgment", "God's justice is not careless revenge.");
  } else if (lower.includes("men strive") || lower.includes("loss of his time") || lower.includes("thoroughly healed") || lower.includes("smite his servant") || lower.includes("woman with child") || lower.includes("life for life")) {
    add(`${title} means harm could not be brushed aside as if nothing happened.`, "The law does not pretend harm is harmless.", "Lost time, healing, pregnancy, servants, and life itself all matter before God.", "🩹 Healing", "⏳ Lost time", "⚖️ Accountability", "Justice means damage must be faced, not ignored.");
  } else if (lower.includes("eye for eye") || lower.includes("tooth for tooth") || lower.includes("hand for hand") || lower.includes("foot for foot")) {
    add(`${title} teaches measured justice, not unlimited revenge.`, "The punishment must fit the harm.", "This law restrains personal vengeance by placing injury under public justice.", "👁️ Eye", "🦷 Tooth", "⚖️ Proportion", "God's law limits retaliation so anger does not become cruelty.");
  } else if (lower.includes("go free")) {
    add(`${title} gives freedom as a form of justice when a servant is injured.`, "The injured person is not simply sent back into the same situation as though nothing happened.", "The law says bodily harm matters.", "🚪 Freedom", "🩹 Injury recognized", "⚖️ Protection", "God's justice sees the vulnerable person, not only the powerful household.");
  } else if (lower.includes("ox") || lower.includes("gore") || lower.includes("stoned") || lower.includes("owner") || lower.includes("sum of money") || lower.includes("ransom") || lower.includes("pit") || lower.includes("testified") || lower.includes("push") || lower.includes("time past") || lower.includes("kept him in") || lower.includes("dead shall be his own")) {
    add(`${title} teaches responsibility for danger someone should have known about.`, "Animals, pits, and repeated risks could hurt real people in an ancient village.", "God's law says negligence is not innocent when warning signs were already clear.", "🐂 Dangerous ox", "🕳️ Open pit", "⚖️ Owner responsible", "Justice includes preventing harm, not only reacting after harm happens.");
  } else if (lower.includes("steal") || lower.includes("restore") || lower.includes("breaking up") || lower.includes("no blood be shed") || lower.includes("restitution") || lower.includes("field") || lower.includes("fire break out")) {
    add(`${title} means stolen or damaged livelihood had to be repaired.`, "The law does not only punish the thief; it aims to repair what was taken or ruined.", "Oxen, sheep, fields, and fire damage all affected survival and livelihood.", "🐑 Stolen animals", "🌾 Damaged field", "🔁 Restitution", "God's justice pushes wrongdoers toward repair, not excuses.");
  } else if (lower.includes("money or stuff") || lower.includes("judges") || lower.includes("condemn") || lower.includes("ass") || lower.includes("oath of the lord") || lower.includes("make restitution") || lower.includes("torn in pieces") || lower.includes("witness") || lower.includes("borrow")) {
    add(`${title} means neighbor trust had to be handled with honesty before God.`, "People borrowed, guarded, and held property for one another.", "When something was lost or damaged, the law gave a path for truth and fair judgment.", "🤝 Neighbor trust", "⚖️ Judges", "📜 Oath before God", "Ordinary property disputes still happen before the LORD.");
  } else if (lower.includes("entice a maid") || lower.includes("endow her")) {
    add(`${title} protects a woman from being used without covenant responsibility.`, "The law treats sexual action as serious, not casual.", "A man cannot harm a woman's future and then walk away as if nothing happened.", "👩 Woman protected", "💍 Marriage responsibility", "⚖️ Accountability", "God's law speaks into private behavior because private sin damages real people.");
  } else if (lower.includes("witch") || lower.includes("beast") || lower.includes("sacrificeth unto any god")) {
    add(`${title} guards Israel from practices that corrupt worship and community life.`, "These commands sound severe because Israel is being formed as a holy people near God's presence.", "False worship and degrading practices cannot be treated as harmless options.", "🚫 False worship", "⚠️ Corruption", "🙌 Holy people", "The LORD is teaching Israel that worship shapes the whole community.");
  } else if (lower.includes("stranger") || lower.includes("vex") || lower.includes("egypt") || lower.includes("widow") || lower.includes("fatherless") || lower.includes("afflict") || lower.includes("hear their cry") || lower.includes("wrath") || lower.includes("usurer") || lower.includes("raiment") || lower.includes("pledge") || lower.includes("gracious")) {
    add(`${title} teaches mercy toward people who can easily be mistreated.`, "Israel knows what it was like to be powerless in Egypt.", "So God commands them not to crush foreigners, widows, or fatherless children.", "💔 Vulnerable people", "👂 God hears", "⚖️ Mercy and justice", "The rescued must not become oppressors.");
  } else if (lower.includes("revile the gods") || lower.includes("curse the ruler") || lower.includes("delay to offer") || lower.includes("firstborn") || lower.includes("holy men") || lower.includes("flesh that is torn")) {
    add(`${title} teaches reverence, ordered giving, and holy identity.`, "Israel's speech, offerings, firstborn, and food practices all belong under God's rule.", "Holiness is not only what happens at a mountain. It reaches daily choices.", "🗣️ Reverent speech", "🎁 First offerings", "✨ Holy people", "God is shaping a community that looks different from Egypt and the nations.");
  } else if (lower.includes("false report") || lower.includes("wicked") || lower.includes("multitude") || lower.includes("poor man") || lower.includes("wrest the judgment") || lower.includes("false matter") || lower.includes("innocent") || lower.includes("gift blindeth") || lower.includes("heart of a stranger")) {
    add(`${title} protects justice from lies, pressure, bribery, and partiality.`, "God does not want courts controlled by crowds, money, fear, or favoritism.", "Truth matters whether the person is rich, poor, native, or foreign.", "🗣️ No false report", "💰 No bribe", "⚖️ Fair judgment", "Justice must not bend toward the powerful or pretend to help by lying.");
  } else if (lower.includes("enemy's ox") || lower.includes("ass going astray")) {
    add(`${title} teaches kindness even when the owner is an enemy.`, "Israel cannot use personal dislike as an excuse to ignore another person's loss.", "The law trains people to do what is right even when feelings are hard.", "🐂 Enemy's animal", "🤝 Return what is lost", "💛 Mercy", "God's justice reaches beyond people we already like.");
  } else if (lower.includes("six years") || lower.includes("seventh year") || lower.includes("six days") || lower.includes("seventh day") || lower.includes("rest") || lower.includes("feast") || lower.includes("unleavened bread") || lower.includes("harvest") || lower.includes("ingathering") || lower.includes("firstfruits") || lower.includes("kid in his mother's milk") || lower.includes("leavened bread")) {
    add(`${title} shapes Israel's time, land, food, and worship around the LORD.`, "The calendar teaches rest, trust, remembrance, harvest gratitude, and holy boundaries.", "Israel's work and feasts must say that the land and increase come from God.", "📅 Holy time", "🌾 Harvest", "🙌 Worship", "God's people learn faith through rhythms, not only crisis moments.");
  } else if (lower.includes("other gods") || lower.includes("bow down") || lower.includes("serve the lord") || lower.includes("angel") || lower.includes("obey his voice") || lower.includes("my name is in him") || lower.includes("keep thee in the way")) {
    add(`${title} connects guidance with loyal worship.`, "God promises to lead Israel, but they must not turn aside to the gods of the land.", "The way forward requires obedience, not just movement.", "🧭 Guidance", "🙌 Worship the LORD", "🚫 No idols", "God leads His people toward promise while warning them against divided worship.");
  } else if (lower.includes("nothing cast their young") || lower.includes("barren") || lower.includes("fear before thee") || lower.includes("hornets") || lower.includes("one year") || lower.includes("little and little") || lower.includes("bounds")) {
    add(`${title} means God will bring Israel into the land with care and timing.`, "The LORD promises blessing and victory, but He also says the land will not be cleared all at once.", "Little by little is still God's faithfulness.", "⏳ Gradual promise", "🛡️ God goes before", "📍 Set bounds", "God's timing protects His people from dangers they may not even see.");
  } else if (lower.includes("covenant with them") || lower.includes("nor with their gods") || lower.includes("dwell in thy land") || lower.includes("make thee sin") || lower.includes("serve their gods") || lower.includes("snare")) {
    add(`${title} warns Israel against agreements that would pull them into idolatry.`, "The issue is not ordinary kindness to neighbors.", "The danger is covenant loyalty with people and gods that would turn Israel away from the LORD.", "🚫 No idolatrous covenant", "⚠️ Snare", "🙌 Loyalty to God", "A trap can look peaceful if it slowly teaches the heart to worship wrongly.");
  } else if (lower.includes("come up") || lower.includes("afar off") || lower.includes("moses alone") || lower.includes("words of the lord") || lower.includes("one voice") || lower.includes("wrote") || lower.includes("altar") || lower.includes("twelve pillars")) {
    add(`${title} prepares the covenant ceremony with worship, words, altar, and witness.`, "Moses writes the LORD's words and the people answer together.", "The altar and twelve pillars show covenant worship involving all Israel.", "📜 Written words", "🪨 Altar and pillars", "👥 One voice", "The people are being formally bound to the God who rescued them.");
  } else if (lower.includes("book of the covenant")) {
    add(`${title} means Moses has written covenant words to read aloud to the people.`, "Israel is not agreeing to vague feelings about God.", "They hear the covenant read aloud so their response is tied to actual words from the LORD.", "📖 Written covenant", "👂 Public reading", "📜 Clear words", "God's people need His words, not guesswork.");
  } else if (lower.includes("will we do")) {
    add(`${title} is Israel's spoken promise after hearing the covenant read.`, "The people answer that they will obey what the LORD has said.", "Their words are serious because covenant obedience is not casual enthusiasm.", "🗣️ Public promise", "✅ We will do", "📜 God's commands", "The coming story will show they need grace, but the response here is still a real covenant commitment.");
  } else if (lower.includes("moses took the blood")) {
    add(`${title} begins the blood-sign part of the covenant ceremony.`, "Moses does not treat the covenant as only a speech or agreement.", "Blood from sacrifice marks the seriousness of life with the holy LORD.", "🩸 Blood taken", "🔥 Sacrifice", "📜 Covenant ceremony", "The covenant is sealed with life-and-death seriousness.");
  } else if (lower.includes("sprinkled it on the people")) {
    add(`${title} means the covenant blood is applied to the people, not only the altar.`, "The blood is not kept far away from the people.", "It is sprinkled on them to mark that they are included in the covenant relationship.", "🩸 Blood applied", "👥 People marked", "✅ Covenant accepted", "Israel is not just hearing about covenant. They are being brought under it.");
  } else if (lower.includes("blood of the covenant")) {
    add(`${title} gives the ceremony its meaning.`, "The blood points to the seriousness of the relationship between the LORD and His rescued people.", "Covenant with God is not a casual handshake. It is sealed through sacrifice.", "🩸 Covenant blood", "📖 Covenant words", "🙌 Holy relationship", "These words help later readers understand why covenant, sacrifice, and forgiveness belong together.");
  } else if (lower.includes("concerning all these words")) {
    add(`${title} ties the blood ceremony back to the covenant words.`, "The sacrifice does not float apart from obedience.", "The people are being bound to the LORD according to what He has spoken.", "📜 All these words", "🩸 Blood seal", "✅ Covenant responsibility", "God's covenant includes both mercy and a real call to obey.");
  } else if (lower.includes("book of the covenant") || lower.includes("will we do") || lower.includes("blood") || lower.includes("sprinkled") || lower.includes("concerning all these words")) {
    add(`${title} marks the covenant as serious, spoken, written, accepted, and sealed with blood.`, "The people hear the book, promise obedience, and are sprinkled with covenant blood.", "Blood shows that this relationship is not casual.", "📖 Covenant book", "🩸 Covenant blood", "✅ We will do", "At Sinai, Israel's life with God is sealed by sacrifice and words.");
  } else if (lower.includes("nadab") || lower.includes("abihu") || lower.includes("seventy") || lower.includes("saw the god") || lower.includes("sapphire") || lower.includes("laid not his hand") || lower.includes("eat and drink")) {
    add(`${title} means covenant blood is followed by an astonishing meal in God's presence.`, "The leaders see a manifestation of God's glory, yet God does not strike them down.", "Eating and drinking points to peace and fellowship in His presence.", "👥 Elders", "💎 Sapphire-like pavement", "🍽️ Covenant meal", "God's holiness is terrifying, but His covenant also brings invited nearness.");
  } else if (lower.includes("cloud covered") || lower.includes("glory of the lord") || lower.includes("seventh day") || lower.includes("devouring fire") || lower.includes("forty days")) {
    add(`${title} means Moses is entering the holy cloud where the LORD is present.`, "The mountain is covered with glory, and the people see the LORD's presence like devouring fire.", "Moses stays forty days and nights to receive more instruction.", "☁️ Cloud", "🔥 Devouring fire", "⛰️ Forty days", "God's nearness is beautiful, weighty, and never casual.");
  } else {
    add(`${title} teaches a real detail in Israel's covenant life after Sinai.`, "The wording helps a beginner slow down and see what God is teaching about justice, mercy, worship, responsibility, or covenant nearness.", "📖 Bible words", "🔍 Slow reading", "🧠 Clear understanding", "God's rescued people are learning how to live differently from Egypt.");
  }

  return note(lines.slice(0, 8));
}
function deepenDay27PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_27_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay27PhraseCard(section, title)),
  };
}

const DAY_28_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 25:1-6": ["Bring Me An Offering", "Of Every Man That Giveth It Willingly", "With His Heart", "Gold, And Silver, And Brass", "Blue, And Purple, And Scarlet", "Oil For The Light"],
  "Exodus 25:7-9": ["Onyx Stones", "Stones To Be Set In The Ephod", "Let Them Make Me A Sanctuary", "That I May Dwell Among Them", "According To All That I Shew Thee", "After The Pattern Of The Tabernacle"],
  "Exodus 25:10-15": ["They Shall Make An Ark", "Shittim Wood", "Overlay It With Pure Gold", "A Crown Of Gold Round About", "Four Rings Of Gold", "Staves Of Shittim Wood", "They Shall Not Be Taken From It"],
  "Exodus 25:16-21": ["The Testimony Which I Shall Give Thee", "A Mercy Seat Of Pure Gold", "Two Cherubims Of Gold", "Of The Mercy Seat Shall Ye Make The Cherubims", "Their Faces Shall Look One To Another", "Toward The Mercy Seat", "Thou Shalt Put The Mercy Seat Above"],
  "Exodus 25:22-22": ["There I Will Meet With Thee", "I Will Commune With Thee", "From Above The Mercy Seat", "From Between The Two Cherubims", "Which Are Upon The Ark Of The Testimony", "Of All Things Which I Will Give Thee In Commandment"],
  "Exodus 25:23-28": ["Thou Shalt Also Make A Table", "Overlay It With Pure Gold", "A Crown Of Gold Round About", "A Border Of An Hand Breadth", "Four Rings Of Gold", "Places For The Staves", "That The Table May Be Borne"],
  "Exodus 25:29-34": ["Dishes Thereof", "Spoons Thereof", "Covers Thereof", "Bowls Thereof", "Shewbread Before Me Alway", "A Candlestick Of Pure Gold", "His Bowls Made Like Unto Almonds"],
  "Exodus 25:35-40": ["Six Branches Going Out Of It", "Their Knops And Their Branches", "Seven Lamps Thereof", "They Shall Light The Lamps", "Tongs Thereof", "Snuffdishes Thereof", "After Their Pattern"],
  "Exodus 26:1-6": ["Thou Shalt Make The Tabernacle", "Ten Curtains Of Fine Twined Linen", "Blue, And Purple, And Scarlet", "Cherubims Of Cunning Work", "The Curtains Shall Be Coupled Together", "Loops Of Blue", "Taches Of Gold"],
  "Exodus 26:7-12": ["Curtains Of Goats' Hair", "A Covering Upon The Tabernacle", "Eleven Curtains", "Fifty Loops", "Taches Of Brass", "That It May Be One", "The Remnant That Remaineth"],
  "Exodus 26:13-14": ["A Cubit On The One Side", "A Cubit On The Other Side", "That Which Remaineth", "A Covering For The Tent", "Rams' Skins Dyed Red", "Badgers' Skins Above"],
  "Exodus 26:15-20": ["Boards For The Tabernacle", "Shittim Wood Standing Up", "Ten Cubits Shall Be The Length", "Two Tenons In One Board", "Forty Sockets Of Silver", "Twenty Boards On The South Side"],
  "Exodus 26:21-26": ["Forty Sockets Of Silver", "Six Boards", "Two Boards Shalt Thou Make For The Corners", "They Shall Be Coupled Together Beneath", "Unto One Ring", "Bars Of Shittim Wood"],
  "Exodus 26:27-32": ["The Middle Bar", "Overlay The Boards With Gold", "Rear Up The Tabernacle", "According To The Fashion Thereof", "A Vail Of Blue, And Purple, And Scarlet", "Cherubims Shall It Be Made", "Four Pillars Of Shittim Wood"],
  "Exodus 26:33-37": ["Thou Shalt Hang Up The Vail", "Within The Vail", "The Ark Of The Testimony", "The Vail Shall Divide Unto You", "The Holy Place And The Most Holy", "Set The Table Without The Vail", "An Hanging For The Door Of The Tent"],
  "Exodus 27:1-6": ["Thou Shalt Make An Altar", "Shittim Wood", "Five Cubits Long", "The Horns Of It", "Overlay It With Brass", "Pans To Receive His Ashes", "All The Vessels Thereof"],
  "Exodus 27:7-8": ["The Staves Shall Be Put Into The Rings", "Upon The Two Sides Of The Altar", "The Altar May Be Borne", "Hollow With Boards Shalt Thou Make It", "As It Was Shewed Thee In The Mount", "So Shall They Make It"],
  "Exodus 27:9-14": ["The Court Of The Tabernacle", "Hangings For The Court", "Fine Twined Linen", "Twenty Pillars", "Twenty Sockets Of Brass", "The Gate Of The Court", "Fifteen Cubits"],
  "Exodus 27:15-20": ["All The Pillars Round About The Court", "Filleted With Silver", "Sockets Of Brass", "All The Pins Of The Tabernacle", "Pure Oil Olive Beaten For The Light", "To Cause The Lamp To Burn Always"],
  "Exodus 27:21-21": ["In The Tabernacle Of The Congregation", "Without The Vail", "Before The LORD", "Aaron And His Sons", "From Evening To Morning", "A Statute For Ever"],
  "Exodus 28:1-6": ["Take Thou Unto Thee Aaron Thy Brother", "That He May Minister Unto Me", "In The Priest's Office", "Holy Garments", "For Glory And For Beauty", "Whom I Have Filled With The Spirit Of Wisdom", "They Shall Make The Ephod"],
  "Exodus 28:7-12": ["Two Shoulderpieces", "Curious Girdle Of The Ephod", "Two Onyx Stones", "Grave On Them The Names", "Six Of Their Names On One Stone", "Stones Of Memorial", "Aaron Shall Bear Their Names"],
  "Exodus 28:13-14": ["Ouches Of Gold", "Two Chains Of Pure Gold", "At The Ends", "Wreathen Work", "Fasten The Wreathen Chains", "To The Ouches"],
  "Exodus 28:15-20": ["The Breastplate Of Judgment", "With Cunning Work", "Foursquare It Shall Be", "A Span Shall Be The Length", "Four Rows Of Stones", "Sardius, A Topaz, And A Carbuncle", "A Beryl, And An Onyx, And A Jasper"],
  "Exodus 28:21-26": ["According To The Names Of The Children Of Israel", "Twelve, According To Their Names", "Every One With His Name", "Like The Engravings Of A Signet", "Chains At The Ends", "Two Rings Of Gold", "The Ends Of The Breastplate"],
  "Exodus 28:27-30": ["The Breastplate Be Not Loosed", "Aaron Shall Bear The Names", "Upon His Heart", "When He Goeth In Unto The Holy Place", "The Urim And The Thummim", "The Judgment Of The Children Of Israel", "Before The LORD Continually"],
  "Exodus 28:31-36": ["The Robe Of The Ephod", "All Of Blue", "As It Were The Hole Of An Habergeon", "Pomegranates Of Blue, And Of Purple, And Of Scarlet", "A Golden Bell And A Pomegranate", "His Sound Shall Be Heard", "HOLINESS TO THE LORD"],
  "Exodus 28:37-42": ["Upon A Blue Lace", "Upon The Mitre", "Aaron Shall Bear The Iniquity", "That They May Be Accepted Before The LORD", "Coats, Girdles, And Bonnets", "For Glory And For Beauty", "Linen Breeches To Cover Their Nakedness"],
  "Exodus 28:43-43": ["When They Come In Unto The Tabernacle", "When They Come Near Unto The Altar", "To Minister In The Holy Place", "That They Bear Not Iniquity", "And Die", "A Statute For Ever"],
};

function makeDay28PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainDay28Phrase(section, title)];
}

function explainDay28Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("blue, and purple, and scarlet") && section.reference === "Exodus 26:1-6") {
    add(`${title} means these colors are woven into the tabernacle curtains.`, "These colors are not just a supply list here; they become part of the fabric surrounding holy space.", "The curtains teach beauty, skill, and reverence in the place where God dwells.", "🧵 Woven colors", "🏕️ Tabernacle curtains", "✨ Holy beauty", "The same colors given as offerings are now shaped into worship space.");
  } else if (lower.includes("shittim wood") && section.reference === "Exodus 27:1-6") {
    add(`${title} means this wood is used for the altar of sacrifice.`, "The altar is made to be strong, portable, and overlaid with brass.", "This is the place where sacrifice is offered before approach to God.", "🪵 Shittim wood", "🔥 Altar", "🩸 Sacrifice", "The material serves the worship where sin is dealt with before the LORD.");
  } else if (lower.includes("overlay it with pure gold") && section.reference === "Exodus 25:23-28") {
    add(`${title} means the table is covered with gold because it is set apart for holy service.`, "This table is not ordinary household furniture.", "It stands in the tabernacle as part of worship before the LORD.", "✨ Gold covering", "🍞 Holy table", "🙌 Set apart", "The gold marks the table as belonging to sacred service.");
  } else if (lower.includes("crown of gold round about") && section.reference === "Exodus 25:23-28") {
    add(`${title} means the holy table has a finished gold rim around it.`, "The crown gives the table a finished, honored edge.", "Even a border detail teaches that worship objects are carefully made for God's presence.", "👑 Gold rim", "🍞 Table", "✨ Careful beauty", "Small details matter when they serve holy worship.");
  } else if (lower.includes("four rings of gold") && section.reference === "Exodus 25:23-28") {
    add(`${title} gives the table a way to be carried without treating it casually.`, "The rings held the poles used for transport.", "Holy furniture could move with Israel, but it had to be carried according to God's design.", "💍 Gold rings", "🚶 Carried table", "📐 Ordered movement", "God's dwelling travels with His people, but His holiness still shapes how they move it.");
  } else if (lower.includes("forty sockets of silver") && section.reference === "Exodus 26:21-26") {
    add(`${title} repeats the silver foundation pieces for another side of the tabernacle.`, "The matching sockets show that the tent's structure is balanced and ordered.", "The repeated detail helps the reader picture a stable holy dwelling, not a loose shelter.", "🥈 Silver sockets", "🪵 Boards supported", "🏕️ Ordered structure", "God's house is built with care on every side.");
  } else if (lower.includes("statute for ever") && section.reference === "Exodus 28:43-43") {
    add(`${title} makes priestly holiness an ongoing rule, not a one-time warning.`, "The priests must keep these clothing commands whenever they serve.", "Holy service remains serious from generation to generation.", "📜 Lasting statute", "👕 Priestly covering", "⚠️ Holy responsibility", "God's people cannot treat priestly service as casual just because time passes.");
  } else if (lower.includes("glory and for beauty") && section.reference === "Exodus 28:37-42") {
    add(`${title} repeats the purpose of the priestly garments after more clothing details are given.`, "The coats, girdles, bonnets, and covering are not merely practical.", "They show dignity, holiness, and beauty in service before the LORD.", "👕 Garments", "✨ Beauty", "🙌 Holy service", "Priestly clothing teaches that worship before God should be reverent and fitting.");
  } else if (lower.includes("pure oil olive") || lower.includes("beaten for the light")) {
    add(`${title} means this oil is prepared for the tabernacle lamp.`, "The oil was beaten and prepared so the lamp could keep burning before the LORD.", "This is not only a material; it supports continual light in the holy place.", "🫒 Olive oil", "🕯️ Lamp light", "🌙 Steady service", "God's dwelling place is marked by ordered light before His presence.");
  } else if (lower.includes("aaron shall bear their names")) {
    add(`${title} means Aaron carries Israel's tribes before the LORD.`, "The names on the stones mean the priest does not serve as a private person.", "He represents the people of Israel when he comes near to God.", "💎 Names on stones", "👥 Israel represented", "🙌 Priest carries the people", "God's people are remembered before Him in priestly service.");
  } else if (lower.includes("that it may be one")) {
    add(`${title} means the tabernacle pieces are joined into one whole dwelling.`, "The curtains and clasps are not scattered parts.", "They are fastened together so the tent functions as one ordered sanctuary.", "🏕️ One tent", "🔗 Joined pieces", "📐 Ordered worship", "God's dwelling place is carefully joined, not thrown together.");
  } else if (lower.includes("cubit on the one side") || lower.includes("cubit on the other side") || lower.includes("fifteen cubits")) {
    add(`${title} gives a measurement that helps the reader picture the holy space.`, "Measurements may feel slow, but they show that the tabernacle is built with exact care.", "God's pattern gives shape to every side, length, and boundary.", "📏 Measurement", "🏕️ Holy space", "📐 Exact pattern", "The details teach that worship follows God's ordered design.");
  } else if (lower.includes("so shall they make it")) {
    add(`${title} closes the altar instruction by calling for obedience to the shown pattern.`, "The altar is not made by personal preference.", "It must be built the way God showed Moses on the mountain.", "📐 Shown pattern", "🔥 Altar", "✅ Obedient building", "Holy worship is shaped by God's command from start to finish.");
  } else if (lower === "before the lord") {
    add(`${title} places the lamp service in God's presence.`, "The lamp is not burning as decoration for people first.", "It burns before the LORD as part of faithful tabernacle service.", "🕯️ Lamp", "🙌 Before God", "🌙 Evening to morning", "The phrase reminds the reader that worship is done in the sight of the LORD.");
  } else if (lower.includes("that he may minister unto me")) {
    add(`${title} explains why Aaron is set apart.`, "Priesthood is not mainly about honor in front of people.", "Aaron is chosen to minister to the LORD in holy service.", "🙌 Ministry to God", "👕 Priestly calling", "✨ Set apart", "The priest serves before God for the sake of the people.");
  } else if (lower === "at the ends") {
    add(`${title} explains where the gold chains attach on the priestly garment.`, "The phrase is small, but it helps picture how the breastpiece and ephod are fastened.", "Priestly clothing is carefully joined so it can be worn in holy service.", "🔗 Chain ends", "👕 Garment pieces", "📐 Careful design", "Even connecting points matter in work done before the LORD.");
  } else if (lower.includes("every one with his name") || lower.includes("engravings of a signet")) {
    add(`${title} means each tribe is personally named before God.`, "The stones are engraved like official seals, not loosely marked.", "Every name matters because the priest carries real people before the LORD.", "✍️ Engraved names", "💎 Tribal stones", "👥 Every tribe remembered", "God's people are represented specifically, not vaguely.");
  } else if (lower.includes("bear not iniquity")) {
    add(`${title} warns that priestly service carries real guilt if handled carelessly.`, "The clothing commands are tied to holiness, not appearance only.", "The priests must serve covered and prepared so they do not bear iniquity before the LORD.", "⚠️ Iniquity", "👕 Priestly covering", "🙇 Holy service", "Serving near God's presence is a gift, but it is never casual.");
  } else if (lower.includes("offering") || lower.includes("willingly") || lower.includes("heart")) {
    add(`${title} means the tabernacle begins with willing gifts, not forced labor.`, "Egypt took work from Israel under pressure, but the LORD invites His rescued people to give from the heart.", "The materials for worship come through willing participation.", "🎁 Offering", "💛 Willing heart", "🙌 Worship response", "God is forming a worshiping people, not another slave workforce.");
  } else if (lower.includes("gold") || lower.includes("silver") || lower.includes("brass") || lower.includes("blue") || lower.includes("purple") || lower.includes("scarlet") || lower.includes("oil") || lower.includes("onyx") || lower.includes("stones")) {
    add(`${title} names materials set apart for beauty and worship.`, "The tabernacle is made from valuable, colorful, and carefully chosen materials.", "These details teach that God's dwelling among His people is not treated as ordinary.", "💎 Precious materials", "🎨 Beauty", "🕯️ Oil and light", "Worship uses created things to point to the worth and holiness of the LORD.");
  } else if (lower.includes("sanctuary") || lower.includes("dwell among") || lower.includes("pattern") || lower.includes("shew thee")) {
    add(`${title} explains the purpose of the tabernacle.`, "God is not only rescuing Israel from Egypt; He is coming to dwell among them.", "The pattern matters because worship must be shaped by God's command, not human invention.", "🏕️ Sanctuary", "🙌 God dwelling near", "📐 God-given pattern", "The center of Israel's camp will be the presence of the LORD.");
  } else if (lower.includes("ark") || lower.includes("shittim wood") || lower.includes("pure gold") || lower.includes("crown of gold") || lower.includes("rings") || lower.includes("staves") || lower.includes("taken from it")) {
    add(`${title} means the ark is holy furniture made for God's presence and command.`, "The ark is built with wood, gold, rings, and carrying poles because it is both holy and movable.", "Israel will journey with the LORD's dwelling place at the center.", "📦 Ark", "✨ Gold", "🚶 Carried with poles", "The details teach reverence: holy things are handled God's way.");
  } else if (lower.includes("testimony") || lower.includes("mercy seat") || lower.includes("cherubims") || lower.includes("faces") || lower.includes("meet with thee") || lower.includes("commune") || lower.includes("between the two cherubims") || lower.includes("commandment")) {
    add(`${title} means the ark area joins God's word, mercy, and presence.`, "The testimony holds God's covenant words, and the mercy seat becomes the place where God promises to meet and speak.", "The cherubim show that this is holy space, not casual furniture.", "📜 Testimony", "🪽 Cherubim", "🙌 God meets and speaks", "At the center of worship is the LORD's mercy and His word.");
  } else if (lower.includes("table") || lower.includes("border") || lower.includes("hand breadth") || lower.includes("places for the staves") || lower.includes("borne")) {
    add(`${title} means the table is holy furniture for service before the LORD.`, "The table is carefully built, bordered, overlaid, and carried like other holy furniture.", "Even practical details teach order and reverence.", "🍞 Holy table", "✨ Gold", "🚶 Carried carefully", "God's dwelling place is beautiful, ordered, and treated with care.");
  } else if (lower.includes("dishes") || lower.includes("spoons") || lower.includes("covers") || lower.includes("bowls") || lower.includes("shewbread")) {
    add(`${title} names items connected to the bread set before the LORD.`, "The shewbread reminded Israel that life and provision are lived before God.", "The dishes and bowls show that worship had ordinary-looking objects set apart for holy use.", "🍞 Bread before God", "🥣 Holy vessels", "🙌 Provision remembered", "The LORD's house teaches fellowship and dependence.");
  } else if (lower.includes("candlestick") || lower.includes("branches") || lower.includes("knops") || lower.includes("lamps") || lower.includes("light the lamps") || lower.includes("tongs") || lower.includes("snuffdishes") || lower.includes("almonds")) {
    add(`${title} means the lampstand gives ordered light inside the holy place.`, "The lampstand is both useful and beautiful, shaped with branches and almond-like designs.", "Light in the tabernacle reminds Israel that worship happens in God's ordered presence.", "🕯️ Lamp light", "🌿 Almond design", "✨ Holy beauty", "God's house is not dark confusion. It is a place of light, life, and careful service.");
  } else if (lower.includes("tabernacle") || lower.includes("curtains") || lower.includes("fine twined linen") || lower.includes("cunning work") || lower.includes("coupled") || lower.includes("loops") || lower.includes("taches")) {
    add(`${title} means this detail helps build the tent where God will dwell among His people.`, "The curtains, loops, clasps, colors, and designs are not random decoration.", "They create ordered holy space around God's presence.", "🏕️ Holy tent", "🧵 Curtains", "✨ Beauty and order", "The tabernacle teaches that nearness to God is a gift arranged by God Himself.");
  } else if (lower.includes("goats") || lower.includes("covering") || lower.includes("eleven curtains") || lower.includes("remaineth") || lower.includes("rams") || lower.includes("badgers")) {
    add(`${title} means this layer covers and protect the tabernacle.`, "The holy tent needed coverings that protected and completed the structure.", "Even outer layers mattered because the dwelling place of God was treated with care.", "🏕️ Covering", "🐐 Goats' hair", "🛡️ Protection", "Holy space is both beautiful inside and carefully covered outside.");
  } else if (lower.includes("boards") || lower.includes("standing up") || lower.includes("ten cubits") || lower.includes("tenons") || lower.includes("sockets") || lower.includes("south side") || lower.includes("corners") || lower.includes("ring") || lower.includes("bars")) {
    add(`${title} gives the tabernacle structure strength and shape.`, "Boards, sockets, tenons, rings, and bars hold the tent together.", "The details may feel technical, but they show that God's dwelling place is ordered and stable.", "🪵 Boards", "⚙️ Sockets and rings", "🏕️ Strong structure", "Worship is not thrown together. It is built according to God's pattern.");
  } else if (lower.includes("middle bar") || lower.includes("rear up") || lower.includes("fashion") || lower.includes("vail") || lower.includes("holy place") || lower.includes("most holy") || lower.includes("door of the tent")) {
    add(`${title} teaches boundaries inside holy space.`, "The veil divided the Holy Place from the Most Holy Place.", "God is near His people, but His holiness still creates ordered access.", "🚪 Veil", "📍 Holy and Most Holy", "🙇 Reverent approach", "The tabernacle says both truths at once: God dwells near, and God is holy.");
  } else if (lower.includes("altar") || lower.includes("five cubits") || lower.includes("horns") || lower.includes("ashes") || lower.includes("vessels") || lower.includes("hollow with boards") || lower.includes("shewed thee in the mount")) {
    add(`${title} names an altar detail connected to sacrifice and approach.`, "The altar stands in the worship system because sinful people need atonement before a holy God.", "Its horns, vessels, ashes, and carrying poles all serve that holy work.", "🩸 Sacrifice", "🔥 Altar", "📐 Mountain pattern", "Approach to God begins with God's provided way, not human confidence.");
  } else if (lower.includes("court") || lower.includes("hangings") || lower.includes("pillars") || lower.includes("sockets") || lower.includes("gate") || lower.includes("pins")) {
    add(`${title} means this detail forms part of the courtyard boundary around the tabernacle.`, "The court marked off holy space from ordinary camp space.", "People did not rush into God's presence however they wanted.", "🚧 Boundary", "🏕️ Court", "🚪 Gate", "God's nearness is open by His command and guarded by His holiness.");
  } else if (lower.includes("pure oil") || lower.includes("lamp") || lower.includes("evening to morning") || lower.includes("statute for ever") || lower.includes("without the vail")) {
    add(`${title} teaches steady light before the LORD.`, "The lamp was to burn from evening to morning outside the veil.", "Aaron and his sons were responsible for this regular service.", "🕯️ Lamp", "🌙 Evening to morning", "🙌 Continual service", "God's people learn that worship includes faithful rhythms, not only dramatic moments.");
  } else if (lower.includes("aaron") || lower.includes("priest") || lower.includes("holy garments") || lower.includes("glory and for beauty") || lower.includes("spirit of wisdom") || lower.includes("ephod")) {
    add(`${title} introduces Aaron and his sons as priests set apart for holy service.`, "The garments are not costumes for showing off.", "They mark the priest as someone who represents Israel before the LORD.", "👕 Holy garments", "🙌 Priest service", "✨ Glory and beauty", "Coming near to God requires a God-appointed mediator.");
  } else if (lower.includes("shoulderpieces") || lower.includes("girdle") || lower.includes("onyx") || lower.includes("grave on them") || lower.includes("names") || lower.includes("memorial") || lower.includes("bear their names")) {
    add(`${title} means the priest carries Israel's names before God.`, "The stones on the priestly garment are not decoration only.", "They represent the tribes of Israel in the presence of the LORD.", "💎 Stones with names", "👥 Israel remembered", "🙌 Priest represents", "The priest does not come before God as a private person. He carries the people with him.");
  } else if (lower.includes("ouches") || lower.includes("chains") || lower.includes("wreathen") || lower.includes("fasten")) {
    add(`${title} means this gold setting or chain holds the priestly pieces together.`, "These details connect the holy garments with strength and beauty.", "Even the fasteners matter because priestly service must be prepared carefully.", "✨ Gold settings", "🔗 Chains", "👕 Priestly garment", "Holy service is not careless. It is fitted and ordered for the LORD.");
  } else if (lower.includes("breastplate") || lower.includes("judgment") || lower.includes("foursquare") || lower.includes("span") || lower.includes("rows of stones") || lower.includes("sardius") || lower.includes("topaz") || lower.includes("carbuncle") || lower.includes("beryl") || lower.includes("jasper")) {
    add(`${title} means the breastplate is worn over the priest's heart as he represents Israel.`, "The precious stones represent Israel before the LORD in beauty and order.", "The breastplate is tied to judgment because the priest serves as representative before God.", "💎 Precious stones", "❤️ Over the heart", "⚖️ Judgment", "God's people are carried before Him, not forgotten.");
  } else if (lower.includes("urim") || lower.includes("thummim") || lower.includes("upon his heart") || lower.includes("holy place") || lower.includes("before the lord continually") || lower.includes("children of israel")) {
    add(`${title} means Aaron carries Israel's judgment before the LORD continually.`, "The priest bears the names and the judgment of the people near God's presence.", "This is a picture of representation, responsibility, and holy mediation.", "❤️ Upon his heart", "👥 Israel represented", "🙌 Before the LORD", "The priest's work teaches that God's people need someone to stand before God for them.");
  } else if (lower.includes("robe") || lower.includes("all of blue") || lower.includes("habergeon") || lower.includes("pomegranates") || lower.includes("bell") || lower.includes("sound shall be heard") || lower.includes("holiness to the lord")) {
    add(`${title} means priestly service is visible, audible, and holy.`, "The robe, bells, pomegranates, and golden plate all mark Aaron's service before the LORD.", "HOLINESS TO THE LORD names the whole point of the priestly calling.", "🔔 Bells", "🍎 Pomegranates", "✨ Holiness", "The priest approaches God as one set apart for holy service.");
  } else if (lower.includes("blue lace") || lower.includes("mitre") || lower.includes("bear the iniquity") || lower.includes("accepted") || lower.includes("coats") || lower.includes("girdles") || lower.includes("bonnets") || lower.includes("linen breeches") || lower.includes("nakedness") || lower.includes("die") || lower.includes("minister in the holy place")) {
    add(`${title} means serving near God's holiness is serious.`, "The priestly clothing covers, marks, and prepares the priests for service.", "Careless approach could bring guilt and death because the work is before the holy LORD.", "👕 Priestly clothing", "⚠️ Holy danger", "✅ Accepted before God", "The details are not fashion notes. They teach reverence before God's presence.");
  } else {
    add(`${title} gives another piece of the pattern God gave Moses.`, "The tabernacle is not built from Israel's imagination.", "Its objects, materials, priests, and boundaries are all received from the LORD.", "📖 Bible words", "🔍 Slow reading", "🙌 Holy worship", "The rescued people are learning how a holy God dwells among them.");
  }

  return note(lines.slice(0, 8));
}
function deepenDay28PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_28_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay28PhraseCard(section, title)),
  };
}

const DAY_29_EXODUS_29_30_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 29:1-6": ["This Is The Thing That Thou Shalt Do", "To Hallow Them", "One Young Bullock", "Two Rams Without Blemish", "Unleavened Bread", "Wash Them With Water", "Put Upon Aaron The Holy Garments"],
  "Exodus 29:7-9": ["Take The Anointing Oil", "Pour It Upon His Head", "Anoint Him", "Bring His Sons", "Put Coats Upon Them", "The Priest's Office Shall Be Theirs", "Consecrate Aaron And His Sons"],
  "Exodus 29:10-15": ["Bring A Bullock Before The Tabernacle", "Put Their Hands Upon The Head", "Kill The Bullock Before The LORD", "Put It Upon The Horns Of The Altar", "Pour All The Blood Beside The Bottom", "It Is A Sin Offering", "One Ram"],
  "Exodus 29:16-21": ["Thou Shalt Slay The Ram", "Sprinkle The Blood Round About", "Burn The Whole Ram Upon The Altar", "It Is A Burnt Offering", "A Sweet Savour", "The Ram Of Consecration", "Tip Of The Right Ear"],
  "Exodus 29:22-27": ["The Fat And The Rump", "The Right Shoulder", "One Loaf Of Bread", "Wave Them For A Wave Offering", "Burn Them Upon The Altar", "Sanctified From The Ram", "The Breast Of The Wave Offering"],
  "Exodus 29:28-28": ["Aaron's And His Sons' By A Statute For Ever", "An Heave Offering", "From The Children Of Israel", "Of The Sacrifice Of Their Peace Offerings"],
  "Exodus 29:29-34": ["The Holy Garments Of Aaron", "His Sons After Him", "Seven Days", "The Ram Of Consecration", "Boil His Flesh In The Holy Place", "Eat The Flesh Of The Ram", "A Stranger Shall Not Eat Thereof"],
  "Exodus 29:35-40": ["Seven Days Shalt Thou Consecrate Them", "Offer Every Day A Bullock", "Cleanse The Altar", "Anoint It, To Sanctify It", "Whatsoever Toucheth The Altar Shall Be Holy", "Two Lambs Of The First Year", "Day By Day Continually"],
  "Exodus 29:41-46": ["At Even", "A Sweet Savour", "A Continual Burnt Offering", "At The Door Of The Tabernacle", "Where I Will Meet You", "I Will Sanctify The Tabernacle", "I Will Dwell Among The Children Of Israel"],
  "Exodus 30:1-6": ["An Altar To Burn Incense Upon", "Shittim Wood", "Overlay It With Pure Gold", "The Horns Thereof", "A Crown Of Gold Round About", "Before The Vail", "Where I Will Meet With Thee"],
  "Exodus 30:7-10": ["Aaron Shall Burn Thereon Sweet Incense", "Every Morning", "At Even", "Perpetual Incense Before The LORD", "Ye Shall Offer No Strange Incense", "Aaron Shall Make An Atonement", "Most Holy Unto The LORD"],
  "Exodus 30:11-16": ["When Thou Takest The Sum", "Then Shall They Give Every Man A Ransom", "That There Be No Plague", "Half A Shekel", "The Rich Shall Not Give More", "The Poor Shall Not Give Less", "A Memorial Unto The Children Of Israel"],
  "Exodus 30:17-21": ["A Laver Of Brass", "His Foot Also Of Brass", "To Wash Withal", "Aaron And His Sons Shall Wash Their Hands And Their Feet", "That They Die Not", "When They Come Near To The Altar", "A Statute For Ever"],
  "Exodus 30:22-27": ["Principal Spices", "Pure Myrrh", "Sweet Cinnamon", "Sweet Calamus", "Oil Olive", "An Holy Anointing Oil", "Anoint The Tabernacle Of The Congregation"],
  "Exodus 30:28-33": ["The Altar Of Burnt Offering", "Sanctify Them", "They May Be Most Holy", "Upon Man's Flesh Shall It Not Be Poured", "Neither Shall Ye Make Any Other Like It", "It Shall Be Holy Unto You", "Shall Even Be Cut Off From His People"],
  "Exodus 30:34-38": ["Take Unto Thee Sweet Spices", "Stacte, And Onycha, And Galbanum", "Pure Frankincense", "A Perfume", "Tempered Together", "Thou Shalt Beat Some Of It Very Small", "It Shall Be Unto You Most Holy"],
};

function makeDay29Exodus29To30PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainExodusTwentyNineToThirtyPhrase(section, title)];
}

function explainExodusTwentyNineToThirtyPhrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower === "the ram of consecration" && section.reference === "Exodus 29:16-21") {
    add("The Ram Of Consecration is the sacrifice used to mark Aaron and his sons for priestly service.", "The word consecration means they are being set apart for the LORD's work.", "\u{1F402} Ram", "\u{1F64C} Set apart", "\u{1FA78} Blood applied", "The priest is not ready because he volunteered. He is ready because God prepares him.");
  } else if (lower === "the ram of consecration") {
    add("The Ram Of Consecration also becomes part of the holy meal for the priests.", "After sacrifice is offered, Aaron and his sons eat what God allows them to receive.", "\u{1F402} Ram", "\u{1F372} Holy meal", "\u{1F3D5}\u{FE0F} Holy place", "This shows that priestly service includes both cleansing and participation in what God provides.");
  } else if (lower === "a sweet savour" && section.reference === "Exodus 29:16-21") {
    add("A Sweet Savour means the burnt offering is received as pleasing before the LORD.", "This does not mean God needed the smell like a person needs food. It means the offering was accepted according to His command.", "\u{1F525} Offering burned", "\u{1F64C} Accepted worship", "\u{1F4DC} God's way", "The phrase helps beginners see that sacrifice was about relationship with God, not empty ritual.");
  } else if (lower === "a sweet savour") {
    add("A Sweet Savour means the daily offering rises before God in an accepted way.", "Morning and evening worship taught Israel that life with the LORD had a steady rhythm.", "\u{1F305} Morning", "\u{1F307} Evening", "\u{1F525} Offering", "The repeated offering kept reminding the people that nearness to God depended on His mercy.");
  } else if (lower === "at even" && section.reference === "Exodus 29:41-46") {
    add("At Even means the second daily lamb was offered in the evening.", "Israel's day was framed by worship, not just work, meals, and sleep.", "\u{1F307} Evening", "\u{1F402} Daily lamb", "\u{1F64C} Worship rhythm", "God was teaching His people to end the day with sacrifice and dependence.");
  } else if (lower === "at even") {
    add("At Even means Aaron burned incense again when the lamps were lit.", "The evening incense connected light, fragrance, and priestly service inside the holy place.", "\u{1F307} Evening", "\u{1F56F}\u{FE0F} Lamps", "\u{1F32B}\u{FE0F} Incense", "The tabernacle rhythm kept worship before the LORD every day.");
  } else if (lower.includes("hallow") || lower.includes("holy") || lower.includes("sanctify") || lower.includes("consecrate")) {
    add(`${title} means this person or object is being set apart for God.`, "In Exodus, holy does not mean fancy or mysterious. It means belonging to the LORD for His purpose.", "\u{1F64C} Set apart", "\u{1F3D5}\u{FE0F} Used for worship", "\u{26A0}\u{FE0F} Not treated as common", "The priests, altar, oil, garments, and tabernacle are being marked as God's, not Israel's personal property.");
  } else if (lower.includes("wash") || lower.includes("water") || lower.includes("laver")) {
    add(`${title} means cleansing came before holy service.`, "The priests could not walk into holy work as if uncleanness did not matter.", "\u{1F4A7} Water", "\u{1F9FC} Cleansing", "\u{1F590}\u{FE0F} Hands and feet", "The washing reminded every priest that nearness to God must be received with reverence.");
  } else if (lower.includes("anoint") || lower.includes("oil") || lower.includes("spices") || lower.includes("myrrh") || lower.includes("cinnamon") || lower.includes("calamus")) {
    add(`${title} means holy oil marked what belonged to the LORD's service.`, "This oil was not regular perfume. It was reserved for the tabernacle, its furniture, and the priests.", "\u{1F9F4} Oil", "\u{1F33F} Fragrant spices", "\u{1F3D5}\u{FE0F} Holy space", "The smell itself would remind Israel that worship near the LORD was different from ordinary life.");
  } else if (lower.includes("bullock") || lower.includes("ram") || lower.includes("lamb") || lower.includes("blood") || lower.includes("sin offering") || lower.includes("burnt offering") || lower.includes("atonement")) {
    add(`${title} means sacrifice is dealing with sin, cleansing, or worship before God.`, "Even the priests needed sacrifice before they served. Their position did not make them clean by themselves.", "\u{1F402} Animal sacrifice", "\u{1FA78} Blood", "\u{1F64F} Atonement", "A beginner should see the order: God deals with sin before people draw near in worship.");
  } else if (lower.includes("ear") || lower.includes("thumb") || lower.includes("toe")) {
    add(`${title} means the priest's hearing, working, and walking were claimed for God.`, "The ear, hand, and foot picture the life of the priest.", "\u{1F442} What he hears", "\u{1F590}\u{FE0F} What he does", "\u{1F463} Where he walks", "Priestly service was not just a job at the altar. God was claiming the servant's listening, working, and walking.");
  } else if (lower.includes("right shoulder") || lower.includes("wave") || lower.includes("heave") || lower.includes("breast") || lower.includes("rump") || lower.includes("fat")) {
    add(`${title} means thfits within the sacrifice is handled in the exact way God commanded.`, "These details can feel strange at first because modern readers do not live around temple sacrifices.", "\u{1F64C} Lifted before God", "\u{1F402} Taken from the sacrifice", "\u{1F372} Shared with the priests when allowed", "The point is that worship included giving God what He commanded, not inventing a simpler version.");
  } else if (lower.includes("incense") || lower.includes("altar to burn") || lower.includes("perfume") || lower.includes("frankincense") || lower.includes("stacte") || lower.includes("onycha") || lower.includes("galbanum")) {
    add(`${title} means fragrant incense rose before the LORD as holy worship.`, "Incense was burned in the holy place, close to the veil before the ark.", "\u{1F32B}\u{FE0F} Fragrance rising", "\u{1F6AA} Near the veil", "\u{1F64F} Worship before God", "Israel was learning that worship is not casual smoke. It is ordered, holy, and received on God's terms.");
  } else if (lower.includes("strange incense") || lower.includes("make any other") || lower.includes("make to yourselves") || lower.includes("upon man's flesh") || lower.includes("cut off")) {
    add(`${title} means holy things were not for casual personal use.`, "God's oil and incense were not recipes for everyday use.", "\u{1F6AB} Not copied", "\u{1F6AB} Not used casually", "\u{26A0}\u{FE0F} Serious boundary", "The LORD was teaching His people that worship is received from Him, not customized for human taste.");
  } else if (lower.includes("ransom") || lower.includes("half a shekel") || lower.includes("rich") || lower.includes("poor") || lower.includes("memorial") || lower.includes("sum")) {
    add(`${title} means every Israelite life was counted before the LORD.`, "The ransom money was not a popularity fee or a wealth display. Rich and poor gave the same amount.", "\u{1FA99} Half shekel", "\u{1F465} Every person counted", "\u{2696}\u{FE0F} Equal before God", "No one could buy a higher place, and no one was too poor to belong.");
  } else if (lower.includes("garments") || lower.includes("coats") || lower.includes("priest") || lower.includes("aaron") || lower.includes("sons")) {
    add(`${title} means priestly clothing carried identity, responsibility, and representation.`, "The clothing did not make Aaron important for his own glory. It marked him as a servant representing the people before God.", "\u{1F455} Holy garments", "\u{1F465} Serving the people", "\u{1F64C} Set apart for the LORD", "Priesthood in Exodus is about responsibility, holiness, and nearness to God.");
  } else if (lower.includes("continual") || lower.includes("morning") || lower.includes("even") || lower.includes("day by day") || lower.includes("at even")) {
    add(`${title} means worship was woven into Israel's morning and evening life.`, "God was not teaching Israel to seek Him only during emergencies.", "\u{1F305} Morning", "\u{1F307} Evening", "\u{1F56F}\u{FE0F} Steady worship", "The people were learning that life with the LORD shapes ordinary time, not only big moments.");
  } else if (lower.includes("meet") || lower.includes("dwell") || lower.includes("door of the tabernacle") || lower.includes("before the vail") || lower.includes("mercy seat")) {
    add(`${title} means the tabernacle was about meeting with God, not furniture by itself.`, "The goal is not furniture by itself. The goal is God living among His rescued people.", "\u{1F3D5}\u{FE0F} Dwelling place", "\u{1F64C} God comes near", "\u{1F465} Israel is His people", "Exodus began with Israel groaning in slavery. Now the LORD is preparing a place where He will meet them.");
  } else if (lower.includes("unleavened") || lower.includes("loaf") || lower.includes("bread") || lower.includes("eat") || lower.includes("boil")) {
    add(`${title} means food became part of the holy consecration ceremony.`, "In the Bible, eating can show fellowship, participation, and receiving what God provides.", "\u{1F35E} Bread", "\u{1F372} Shared meal", "\u{1F3D5}\u{FE0F} Holy place", "The priests were not just watching a ritual happen. They were being brought into the service God assigned them.");
  } else if (lower.includes("blemish")) {
    add(`${title} means the sacrifice could not be damaged or defective.`, "Israel was not supposed to bring God whatever was easiest to spare.", "\u{2705} Whole", "\u{2705} Acceptable", "\u{2705} Given with care", "The offering taught reverence: the LORD deserves worship that honors Him.");
  } else if (lower.includes("shittim") || lower.includes("pure gold") || lower.includes("crown of gold") || lower.includes("horns thereof")) {
    add(`${title} means the furniture was made with deliberate material and design.`, "The tabernacle furniture was built with care because it served worship near God's presence.", "\u{1FAB5} Wood", "\u{1F7E1} Gold", "\u{1F3D5}\u{FE0F} Holy furniture", "These details help beginners see that God gave Israel a pattern, not a vague idea.");
  } else {
    add(`${title} is one action or object in the priest-consecration ceremony.`, "Consecration means Aaron and his sons are being prepared for holy service.", "\u{1F3D5}\u{FE0F} Holy place", "\u{1F64C} Holy service", "\u{1FA78} Sin dealt with", "The ceremony teaches that priests do not walk into God's service casually. They are washed, clothed, marked, and brought near by sacrifice.");
  }

  return note(lines.slice(0, 8));
}

function deepenDay29Exodus29To30Mining(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  if (section.chapter < 29 || section.chapter > 30) return section;

  const pools: Record<string, string[]> = {
    "Exodus 29:1-6": ["Garments, And The Anointing Oil", "Bring Them In The Basket"],
    "Exodus 29:7-9": ["Gird Them With Girdles", "Bonnets Shalt Thou Put On Them"],
    "Exodus 29:10-15": ["The Blood Of The Bullock", "Upon The Altar With Thy Finger"],
    "Exodus 29:16-21": ["Cut The Ram In Pieces", "Upon Aaron, And Upon His Garments"],
    "Exodus 29:22-27": ["The Inwards, And The Caul", "Put All In The Hands Of Aaron"],
    "Exodus 29:28-28": ["By A Statute For Ever", "It Is An Heave Offering"],
    "Exodus 29:29-34": ["To Be Anointed Therein", "Wherewith To Make The Atonement"],
    "Exodus 29:35-40": ["An Hin Of Beaten Oil", "The Fourth Part Of An Hin Of Wine"],
    "Exodus 29:41-46": ["I Will Be Their God", "Brought Them Forth Out Of Egypt"],
    "Exodus 30:1-6": ["A Cubit Shall Be The Length", "Put It Before The Vail"],
    "Exodus 30:7-10": ["When He Dresseth The Lamps", "Once In A Year"],
    "Exodus 30:11-16": ["After The Shekel Of The Sanctuary", "To Make An Atonement For Your Souls"],
    "Exodus 30:17-21": ["Between The Tabernacle And The Altar", "Their Hands And Their Feet"],
    "Exodus 30:22-27": ["After The Art Of The Apothecary", "The Ark Of The Testimony"],
    "Exodus 30:28-33": ["This Shall Be An Holy Anointing Oil", "Whosoever Compoundeth Any Like It"],
    "Exodus 30:34-38": ["Salted, Pure, And Holy", "Before The Testimony"],
  };
  const existing = new Set(section.phrases.map(([phraseTitle]) => phraseTitle.replace(/^📌\s*/, "").trim().toLowerCase()));
  const additions = (pools[section.reference] ?? [])
    .filter((phraseTitle) => !existing.has(phraseTitle.toLowerCase()))
    .slice(0, 2)
    .map((phraseTitle) => makeDay29Exodus29To30PhraseCard(section, phraseTitle));

  return { ...section, phrases: [...section.phrases, ...additions] };
}

function deepenDay29Exodus29To30PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_29_EXODUS_29_30_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay29Exodus29To30PhraseCard(section, title)),
  };
}

const EXODUS_21_30_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  21: ["⚖️ These laws limit harm and protect life.", "🏠 Covenant justice reaches households and daily conflicts.", "🛡️ God cares about people with less power."],
  22: ["🧾 Restitution repairs what theft or damage broke.", "💔 Widows, orphans, strangers, and the poor receive special protection.", "🙌 Holiness includes how people treat neighbors."],
  23: ["🗣️ Truth matters in court and community life.", "🛑 Sabbath and feasts shape Israel's time around God.", "🧭 The promised land must not pull Israel into false worship."],
  24: ["📜 Israel hears the covenant words.", "🩸 Blood seals the covenant relationship.", "⛰️ Moses goes up because God's presence is holy."],
  25: ["🎁 Worship begins with willing gifts.", "📦 The ark and mercy seat sit at the center.", "🏕️ God wants to dwell among His people."],
  26: ["🏕️ The tent teaches holy space.", "🚪 The veil shows nearness and separation.", "🧵 Beauty and order belong in worship."],
  27: ["🩸 The altar teaches sacrifice before approach.", "🚧 The courtyard marks a holy boundary.", "🕯️ The lamp keeps light before the LORD."],
  28: ["👕 Priestly garments teach holy service.", "💎 Israel's names are carried before God.", "🙌 The priest represents the people."],
  29: ["💧 Priests must be washed and set apart.", "🩸 Sacrifice deals with sin before service.", "🏕️ God meets His people at the tent."],
  30: ["🕯️ Incense marks daily worship near the veil.", "💧 Washing teaches cleansing before service.", "🧴 Holy oil and incense are set apart for God."],
};

function formatExodusTwentyOneToThirtyPhraseExplanation(section: PersonalExodusPhraseSectionInput, content: string) {
  const cleaned = content
    .replace(/not a generic explanation card/g, "a real part of the passage")
    .replace(/not random or casual/g, "ordered by God's holiness")
    .replace(/the wording is a real part of the passage, a real part of the passage/g, "the wording is a real part of the passage")
    .replace(/the wording carries a real part of the passage, a real part of the passage/g, "the wording carries a real part of the passage");
  if (section.chapter >= 21 && section.chapter <= 30) {
    return cleaned;
  }

  if (section.chapter < 21 || section.chapter > 30) {
    return cleaned;
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = EXODUS_21_30_MOBILE_FORMAT_CUES[section.chapter];

  if (!cues || blocks.length < 2) {
    return blocks.join("\n\n");
  }

  const opening = blocks.slice(0, Math.min(2, blocks.length));
  const closing = blocks.slice(opening.length);

  return note([...opening, ...cues, ...closing]);
}

function formatExodusTwentyOneToThirtySectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [
      title,
      formatExodusTwentyOneToThirtyPhraseExplanation(section, content),
    ] as [string, string]),
  }));
}

export const EXODUS_21_30_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusTwentyOneToThirtySectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS, [21, 22, 23, 24], "⚖️").map(deepenDay27PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS, [25, 26, 27, 28], "⛺").map(deepenDay28PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS, [29, 30], "🕯️").map(deepenDay29Exodus29To30PhraseCards).map(deepenDay29Exodus29To30Mining),
  ...RAW_EXODUS_21_30_PERSONAL_SECTIONS.filter((section) => section.chapter < 21 || section.chapter > 30),
]);
