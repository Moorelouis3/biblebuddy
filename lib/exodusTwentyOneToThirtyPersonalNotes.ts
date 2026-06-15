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

function getExodusTwentyOneToThirtyTitleIcon(title: string) {
  if (/this is the thing|from the children|day by day|cubit|sanctify them|neither shall ye make|whosoever compoundeth|tempered together|beat some of it/i.test(title)) return "\u{1F4DC}";
  if (/pour it upon his head/i.test(title)) return "\u{1F56F}\u{FE0F}";
  if (/that they die not/i.test(title)) return "\u{26A0}\u{FE0F}";
  if (/wash|laver|water|hands|feet/i.test(title)) return "\u{1F4A7}";
  if (/garment|coat|girdle|bonnet|breeches|mitre/i.test(title)) return "\u{1F455}";
  if (/anoint|oil|lamps|morning|even|light/i.test(title)) return "\u{1F56F}\u{FE0F}";
  if (/bullock|ram|lamb|blood|sin offering|burnt offering|sacrifice|altar|horn|atonement|consecration|sweet savour|fat|rump|shoulder|flesh|ear|caul|hin of wine/i.test(title)) return "\u{1FA78}";
  if (/bread|loaf|cake|basket|unleavened|wafer|flour/i.test(title)) return "\u{1F35E}";
  if (/priest|aaron|sons|hallow|consecrate|holy|most holy|office/i.test(title)) return "\u{1F451}";
  if (/incense|perfume|spices|stacte|onycha|galbanum|myrrh|cinnamon|calamus|apothecary/i.test(title)) return "\u{1F32B}\u{FE0F}";
  if (/shekel|ransom|rich|poor|sum|memorial|plague|give less/i.test(title)) return "\u{1FA99}";
  if (/tabernacle|door|veil|testimony|meet|dwell|brought them forth/i.test(title)) return "\u{1F3D5}\u{FE0F}";
  if (/sanctuary|dwell among|shew thee|pattern|taken from it|one side|other side|one ring|middle bar|vail|veil|door of the tent|without the vail|that it may be one|so shall they make it/i.test(title)) return "\u{1F3D5}\u{FE0F}";
  if (/rams' skins|badgers' skins|tenons|coupled|cunning work|wreathen|ouches|chains|ends|foursquare|span|habergeon|coats|girdles|bonnets|breeches/i.test(title)) return "\u{1F9F5}";
  if (/pans|ashes|vessels|altar|come near unto the altar/i.test(title)) return "\u{1FA78}";
  if (/evening to morning|oil|light|sound shall be heard/i.test(title)) return "\u{1F56F}\u{FE0F}";
  if (/minister unto me|glory and for beauty|spirit of wisdom|shoulderpieces|urim|thummim|accepted before the lord|bear not iniquity|and die/i.test(title)) return "\u{1F451}";
  if (/sardius|topaz|carbuncle|beryl|jasper|every one with his name|engravings of a signet/i.test(title)) return "\u{1F48E}";
  if (/appoint thee a place|refuge/i.test(title)) return "\u{1F3C3}";
  if (/gored a son|cast their young|barren/i.test(title)) return "\u{1F9D2}";
  if (/if it be known|in time past/i.test(title)) return "\u{1F441}\u{FE0F}";
  if (/the dead shall be his own/i.test(title)) return "\u{1F402}";
  if (/breaking up/i.test(title)) return "\u{1F3E0}";
  if (/endow her/i.test(title)) return "\u{1F48D}";
  if (/witch|other gods|their gods|snare|bow down/i.test(title)) return "\u{1F6AB}";
  if (/afflict|cry|wrath|gracious|poor|fatherless|widow/i.test(title)) return "\u{1F494}";
  if (/usurer|gift|bribe|money|silver/i.test(title)) return "\u{1FA99}";
  if (/curse the ruler|revile/i.test(title)) return "\u{1F5E3}\u{FE0F}";
  if (/delay to offer|firstborn|holy men|flesh that is torn/i.test(title)) return "\u{1F56F}\u{FE0F}";
  if (/multitude|answered with one voice|elders/i.test(title)) return "\u{1F465}";
  if (/six years thou shalt sow|six days thou shalt do|three times|feast|harvest|ingathering/i.test(title)) return "\u{1F4C5}";
  if (/keep thee in the way|obey his voice|my name is in him|little and little|set thy bounds|dwell in thy land/i.test(title)) return "\u{1F9ED}";
  if (/send my fear|drive them out/i.test(title)) return "\u{1F6E1}\u{FE0F}";
  if (/make thee sin/i.test(title)) return "\u{26A0}\u{FE0F}";
  if (/pillars/i.test(title)) return "\u{1F5FF}";
  if (/sprinkled/i.test(title)) return "\u{1FA78}";
  if (/servant|maid|master|manservant|bondman|bondwoman|slave/i.test(title)) return "⚖️";
  if (/smite|kill|death|life|eye|tooth|hand|foot|burning|wound|stripe|hurt/i.test(title)) return "⚖️";
  if (/if a man|if men|come presumptuously|stealeth|curseth|strive|slay|wicked/i.test(title)) return "⚖️";
  if (/ox|sheep|ass|beast|field|vineyard|fire|pit|restitution|restore/i.test(title)) return "🧾";
  if (/owner|money|stuff|good|make good|pay|sum|loss|torn in pieces/i.test(title)) return "🧾";
  if (/widow|fatherless|stranger|poor|enemy|neighbor|borrow|pledge/i.test(title)) return "🛡️";
  if (/false|witness|report|judge|judgment|cause|matter|controversy/i.test(title)) return "⚖️";
  if (/sabbath|feast|firstfruits|bread|sacrifice|blood|covenant/i.test(title)) return "🙌";
  if (/ark|mercy seat|cherubim|table|candlestick|lamp|tabernacle|curtain|veil|court/i.test(title)) return "🏕️";
  if (/altar|burnt|offering|horn|brasen/i.test(title)) return "🩸";
  if (/ephod|breastplate|robe|garment|mitre|stones|names/i.test(title)) return "👕";
  if (/priest|aaron|sons|holy|anoint|consecrate|wash|incense|oil/i.test(title)) return "🕯️";
  if (/gold|silver|brass|blue|purple|scarlet|linen|shittim/i.test(title)) return "🎁";
  if (/command|word|book|law|ordinance|statute|testimony/i.test(title)) return "📜";
  if (/angel|presence|lord|god|worship|serve/i.test(title)) return "🙌";
  if (/cubits|boards|rings|staves|sockets|hooks|loops|taches|branches|bowls/i.test(title)) return "🏕️";
  if (/seventh|free|redeemed|go out free|redeem/i.test(title)) return "🔓";
  if (/daughters|marriage|food|raiment|milk|kid|mother/i.test(title)) return "🏠";
  if (/mount|cloud|come up|near|sapphire|forty days|forty nights|called unto moses/i.test(title)) return "⛰️";
  if (/meet with thee|commune|faces|look one to another|willingly|heart/i.test(title)) return "🙌";
  if (/dishes|spoons|covers|tongs|snuffdishes|fashion|pattern|remnant|remaineth|covering/i.test(title)) return "🏕️";
  return "🔎";
}

function ensureExodusTwentyOneToThirtyTitleEmoji(title: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  return `${getExodusTwentyOneToThirtyTitleIcon(cleanTitle)} ${cleanTitle}`;
}

function getExodusTwentyOneToThirtySectionIcon(section: PersonalExodusPhraseSectionInput) {
  const text = `${section.title} ${section.reference}`.toLowerCase();
  if (/servant|injury|violence|justice|law|judgment/.test(text)) return "⚖️";
  if (/theft|property|restitution|field|ox/.test(text)) return "🧾";
  if (/widow|poor|stranger|neighbor|mercy/.test(text)) return "🛡️";
  if (/sabbath|feast|worship|covenant|blood/.test(text)) return "🙌";
  if (/ark|mercy seat/.test(text)) return "📦";
  if (/table|bread/.test(text)) return "🍞";
  if (/candlestick|lamp/.test(text)) return "🕯️";
  if (/tabernacle|curtain|veil|court/.test(text)) return "🏕️";
  if (/altar|sacrifice/.test(text)) return "🩸";
  if (/garment|ephod|breastplate|priest/.test(text)) return "👕";
  return getExodusTwentyOneToThirtyTitleIcon(section.title);
}

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

const DAY_27_EXACT_PHRASE_EXPLANATIONS: Record<string, string[]> = {
  "She Shall Not Go Out As The Menservants Do": ["She Shall Not Go Out As The Menservants Do means this woman is not treated like the male servant in the earlier law.", "Her situation involves household and marriage responsibility, so her protection is described differently.", "God is limiting what a powerful household can do to someone vulnerable.", "\u{1F469} Vulnerable woman", "\u{1F3E0} Household duty", "\u{2696}\u{FE0F} Protection", "The phrase keeps the reader from flattening every servant law into the same situation."],
  "For He Is His Money": ["For He Is His Money is hard wording from an ancient household law.", "It means the servant was legally tied to the master's property and labor system.", "The law is describing responsibility inside that world, not saying the servant has no value before God.", "\u{1F4B0} Legal loss", "\u{1F9D1} Servant harmed", "\u{2696}\u{FE0F} Judgment weighed", "The phrase helps a beginner see that Exodus is regulating a broken ancient system with limits and accountability."],
  "Thirty Shekels Of Silver": ["Thirty Shekels Of Silver names the payment required when an ox kills a servant.", "A shekel was a weight of silver used for payment.", "The amount shows that even the death of a servant could not be ignored.", "\u{1FA99} Silver", "\u{1F402} Dangerous ox", "\u{2696}\u{FE0F} Required payment", "The phrase gives a concrete cost where life and responsibility meet in the law."],
  "If It Be Known": ["If It Be Known means the owner had knowledge of the danger.", "The ox had already been known to push in the past.", "That makes the owner responsible for failing to restrain it.", "\u{1F441}\u{FE0F} Known danger", "\u{1F402} Repeated behavior", "\u{1F6A7} Preventable harm", "The phrase teaches that ignoring known danger is not treated as innocence."],
  "He Shall Not Make Good": ["He Shall Not Make Good means the borrower does not have to repay in that situation.", "If the owner was present, the responsibility is judged differently.", "The law pays attention to context instead of forcing one flat rule on every case.", "\u{1F9FE} No repayment", "\u{1F441}\u{FE0F} Owner present", "\u{2696}\u{FE0F} Careful judgment", "The phrase shows that God's justice considers what actually happened."],
  "He Shall Surely Make It Good": ["He Shall Surely Make It Good means the borrower must repay when responsible for the loss.", "Make it good means restore or compensate for what was damaged.", "The repeated wording makes the duty strong and clear.", "\u{1F9FE} Repayment", "\u{1F91D} Responsibility", "\u{2696}\u{FE0F} Restitution", "The phrase teaches that borrowing from a neighbor carries real accountability."],
  "Thou Shalt Take No Gift": ["Thou Shalt Take No Gift means judges must not accept bribes.", "Gift here is not a birthday present.", "It means money or favor that bends judgment.", "\u{1F4B0} Bribe", "\u{1F441}\u{FE0F} Blinded judgment", "\u{2696}\u{FE0F} Fair court", "The phrase protects justice from being bought by the person with more power."],
  "Three Times In The Year": ["Three Times In The Year means Israel's men were to appear before the LORD at set feast times.", "Their calendar included regular moments of worship, memory, and thanksgiving.", "God was shaping the year around His rescue and provision.", "\u{1F4C5} Set times", "\u{1F33E} Harvest", "\u{1F64C} Worship", "The phrase teaches that Israel's time belonged to the LORD, not only their emergencies."],
  "Moses Took The Blood": ["Moses Took The Blood begins the blood-sign moment of the covenant ceremony.", "The covenant is not sealed by words alone.", "Blood from sacrifice marks the seriousness of life with the holy LORD.", "\u{1FA78} Blood", "\u{1F525} Sacrifice", "\u{1F4DC} Covenant", "The phrase helps the reader see that covenant with God is serious, costly, and holy."],
  "Moses Went Up Into The Mount": ["Moses Went Up Into The Mount means Moses enters the holy place of meeting on Sinai.", "The people remain below while Moses goes up as the mediator.", "He is going to receive instruction from the LORD.", "\u{26F0}\u{FE0F} Mount Sinai", "\u{1F9D4} Moses", "\u{2601}\u{FE0F} Holy cloud", "The phrase shows nearness to God happening through the person God appoints."],
};

function explainDay27Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  const exact = DAY_27_EXACT_PHRASE_EXPLANATIONS[title];
  if (exact) return note(exact);

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
    add(`${title} explains one part of Israel's covenant life after Sinai.`, "The wording helps the reader see what God is teaching about justice, mercy, worship, responsibility, or covenant nearness.", "📖 Scripture wording", "🔍 Phrase meaning", "🧠 Covenant understanding", "God's rescued people are learning how to live differently from Egypt.");
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
    add(`${title} means these colors are woven into the tabernacle curtains.`, "These colors are not just a supply list here; they are woven into the fabric surrounding holy space.", "The curtains teach beauty, skill, and reverence in the place where God dwells.", "🧵 Woven colors", "🏕️ Tabernacle curtains", "✨ Holy beauty", "The same colors given as offerings are now shaped into worship space.");
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
    add(`${title} means this layer covers and protects the tabernacle.`, "The holy tent needed coverings that protected and completed the structure.", "Even outer layers mattered because the dwelling place of God was treated with care.", "🏕️ Covering", "🐐 Goats' hair", "🛡️ Protection", "Holy space is both beautiful inside and carefully covered outside.");
  } else if (lower.includes("boards") || lower.includes("standing up") || lower.includes("ten cubits") || lower.includes("tenons") || lower.includes("sockets") || lower.includes("south side") || lower.includes("corners") || lower.includes("ring") || lower.includes("bars")) {
    add(`${title} gives the tabernacle structure strength and shape.`, "Boards, sockets, tenons, rings, and bars hold the tent together.", "The details may feel technical, but they show that God's dwelling place is ordered and stable.", "🪵 Boards", "⚙️ Sockets and rings", "🏕️ Strong structure", "Worship is not thrown together. It is built according to God's pattern.");
  } else if (lower.includes("middle bar") || lower.includes("rear up") || lower.includes("fashion") || lower.includes("vail") || lower.includes("holy place") || lower.includes("most holy") || lower.includes("door of the tent")) {
    add(`${title} teaches boundaries inside holy space.`, "The veil divided the Holy Place from the Most Holy Place.", "God is near His people, but His holiness still creates ordered access.", "🚪 Veil", "📍 Holy and Most Holy", "🙇 Reverent approach", "The tabernacle says both truths at once: God dwells near, and God is holy.");
  } else if (lower.includes("altar") || lower.includes("five cubits") || lower.includes("horns") || lower.includes("ashes") || lower.includes("vessels") || lower.includes("hollow with boards") || lower.includes("shewed thee in the mount")) {
    add(`${title} names an altar detail connected to sacrifice and approach.`, "The altar stands in the worship system because sinful people need atonement before a holy God.", "Its horns, vessels, ashes, and carrying poles all serve that holy work.", "🩸 Sacrifice", "🔥 Altar", "📐 Mountain pattern", "Approach to God begins with God's provided way, not human confidence.");
  } else if (lower.includes("court") || lower.includes("hangings") || lower.includes("pillars") || lower.includes("sockets") || lower.includes("gate") || lower.includes("pins")) {
    add(`${title} means this detail helps form the courtyard boundary around the tabernacle.`, "The court marked off holy space from ordinary camp space.", "People did not rush into God's presence however they wanted.", "🚧 Boundary", "🏕️ Court", "🚪 Gate", "God's nearness is open by His command and guarded by His holiness.");
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
    add(`${title} explains one piece of the pattern God gave Moses.`, "The tabernacle is not built from Israel's imagination.", "Its objects, materials, priests, and boundaries are all received from the LORD.", "📖 Scripture wording", "🔍 Phrase meaning", "🙌 Holy worship", "The rescued people are learning how a holy God dwells among them.");
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
    add("The Ram Of Consecration also becomes food in the holy meal for the priests.", "After sacrifice is offered, Aaron and his sons eat what God allows them to receive.", "\u{1F402} Ram", "\u{1F372} Holy meal", "\u{1F3D5}\u{FE0F} Holy place", "This shows that priestly service includes both cleansing and participation in what God provides.");
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
    add(`${title} means food was included in the holy consecration ceremony.`, "In the Bible, eating can show fellowship, participation, and receiving what God provides.", "\u{1F35E} Bread", "\u{1F372} Shared meal", "\u{1F3D5}\u{FE0F} Holy place", "The priests were not just watching a ritual happen. They were being brought into the service God assigned them.");
  } else if (lower.includes("blemish")) {
    add(`${title} means the sacrifice could not be damaged or defective.`, "Israel was not supposed to bring God whatever was easiest to spare.", "\u{2705} Whole", "\u{2705} Acceptable", "\u{2705} Given with care", "The offering taught reverence: the LORD deserves worship that honors Him.");
  } else if (lower.includes("shittim") || lower.includes("pure gold") || lower.includes("crown of gold") || lower.includes("horns thereof")) {
    add(`${title} means the furniture was made with deliberate material and design.`, "The tabernacle furniture was built with care because it served worship near God's presence.", "\u{1FAB5} Wood", "\u{1F7E1} Gold", "\u{1F3D5}\u{FE0F} Holy furniture", "These details help beginners see that God gave Israel a pattern, not a vague idea.");
  } else {
    add(`${title} names one action or object in the priest-consecration ceremony.`, "Consecration means Aaron and his sons are being prepared for holy service.", "\u{1F3D5}\u{FE0F} Holy place", "\u{1F64C} Holy service", "\u{1FA78} Sin dealt with", "The ceremony teaches that priests do not walk into God's service casually. They are washed, clothed, marked, and brought near by sacrifice.");
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
    .replace(/\bThis phrase matters because\b/gi, "This is important because")
    .replace(/\bThe phrase matters because\b/gi, "This is important because")
    .replace(/\bmatters because\b/gi, "is important because")
    .replace(/\bbelongs to\b/gi, "is part of")
    .replace(/\bA beginner should see that\s*/gi, "Notice that ")
    .replace(/\bA beginner should see\s*/gi, "Notice ")
    .replace(/\bA beginner should notice that\s*/gi, "Notice that ")
    .replace(/\bA beginner should notice\s*/gi, "Notice ")
    .replace(/\bA beginner should\s+/gi, "The reader can ")
    .replace(/\bFor beginners,?\s*/gi, "")
    .replace(/\bThis phrase helps\s+/gi, "The wording helps ")
    .replace(/\bThe phrase helps\s+/gi, "The wording helps ")
    .replace(/\bBible Buddy should slow down here because\s*/gi, "Slow down here because ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bmeans this detail helps build\b/gi, "names a piece used to build")
    .replace(/\bmeans this detail helps form\b/gi, "names a piece used to form")
    .replace(/\bmeans this detail helps\b/gi, "names a detail that")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
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

function getExodusTwentyOneToThirtyPhraseList(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/servant|maid|master|manservant|bondman|bondwoman|slave/.test(lower)) {
    return [
      `⚖️ ${cleanTitle}`,
      "🏠 Justice inside daily life",
      "🛡️ Protection for the vulnerable",
      "📜 Covenant law shaping conduct",
    ];
  }

  if (/ox|sheep|ass|beast|field|vineyard|fire|pit|restitution|restore/.test(lower)) {
    return [
      `🧾 ${cleanTitle}`,
      "🐂 Property and responsibility",
      "⚖️ Repairing harm",
      "🏠 Neighbor love in practical form",
    ];
  }

  if (/widow|fatherless|stranger|poor|enemy|neighbor|borrow|pledge/.test(lower)) {
    return [
      `🛡️ ${cleanTitle}`,
      "💔 People with less power",
      "🤝 Mercy in the community",
      "🙌 God's concern for justice",
    ];
  }

  if (/sabbath|feast|firstfruits|bread|altar|sacrifice|blood|covenant/.test(lower)) {
    return [
      `🙌 ${cleanTitle}`,
      "📅 Worship shaping time",
      "🩸 Covenant relationship",
      "📜 Israel living before the LORD",
    ];
  }

  if (/ark|mercy seat|cherubim|table|candlestick|lamp|tabernacle|curtain|veil|altar|court|ephod|breastplate|robe|garment/.test(lower)) {
    return [
      `🏕️ ${cleanTitle}`,
      "🧵 Holy design",
      "🙌 Worship near God's presence",
      "📜 Every detail given by command",
    ];
  }

  if (/priest|aaron|sons|holy|anoint|consecrate|wash|incense|oil/.test(lower)) {
    return [
      `🕯️ ${cleanTitle}`,
      "🧼 Set apart for service",
      "🙌 Priestly worship",
      "📜 Holiness before the LORD",
    ];
  }

  return [
    `🔎 ${cleanTitle}`,
    section.chapter <= 24 ? "⚖️ Covenant life being shaped" : "🏕️ Worship space being prepared",
    section.chapter <= 24 ? "🏠 God's law reaching daily life" : "🙌 God teaching Israel how to approach",
  ];
}

function getExodusTwentyOneToThirtyTeachingLines(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter <= 24) {
    if (/servant|maid|widow|fatherless|stranger|poor|enemy|neighbor/.test(lower)) {
      return [
        `${cleanTitle} shows that covenant law reaches real people.`,
        `With ${cleanTitle}, God does not leave justice floating above daily life.`,
        `${cleanTitle} teaches Israel how to protect life, repair harm, and care for the vulnerable.`,
      ];
    }

    return [
      `${cleanTitle} helps explain covenant life after the Exodus.`,
      `Through ${cleanTitle}, Israel is learning what freedom under God looks like in daily choices.`,
      `${cleanTitle} shows the law shaping rescued people into a holy community.`,
    ];
  }

  if (/ark|mercy seat|veil|altar|tabernacle|court|lamp|candlestick/.test(lower)) {
    return [
      `${cleanTitle} names a piece of the worship space God is teaching Israel to honor.`,
      `In ${cleanTitle}, the tabernacle instructions are teaching more than decoration.`,
      `${cleanTitle} teaches that God's presence is holy and Israel must approach His way.`,
    ];
  }

  if (/priest|aaron|garment|ephod|breastplate|anoint|consecrate/.test(lower)) {
    return [
      `${cleanTitle} points to priestly service.`,
      `In ${cleanTitle}, the priest does not come before God casually.`,
      `${cleanTitle} helps teach holiness before the LORD through clothing, washing, and setting apart.`,
    ];
  }

  return [
    `${cleanTitle} should be read as more than a construction note.`,
    `Through ${cleanTitle}, God is showing that worship has shape, order, and purpose.`,
    `${cleanTitle} points to a holy dwelling where the LORD will meet His people.`,
  ];
}

function removeExodusTwentyOneToThirtyRepeatedPhraseTitle(title: string, lines: string[]) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const repeatedTitlePattern = new RegExp(`^${escapedTitle}\\s+(means|explains|describes|shows|names|gives|is|stresses|teaches|captures|announces|pictures|protects|closes|deals with|turns|introduces|exposes|preserves|carries|celebrates|marks|looks|points to|points into|reminds|connects|ties|places|repeats|praises|identifies|becomes|dates|brings|treats|warns|makes|keeps|follows|begins|guards|shapes|joins|prepares|stays|matters because|also becomes|should be read as|helps)\\s+`, "i");

  return lines.map((line) => {
    let cleaned = line
      .replace(/\bThe phrase helps the reader\b/gi, "This shows")
      .replace(/\bThe phrase helps readers\b/gi, "This shows")
      .replace(/\bThe wording helps the reader ask what God is showing through\b/gi, "This points to")
      .replace(/\bThe wording helps a beginner see that\b/gi, "This means")
      .replace(/\bThe wording helps beginners see that\b/gi, "This means")
      .replace(/\bThe wording of\b/gi, "The meaning of")
      .replace(/\bThis reminds the reader that\b/gi, "This shows that")
      .replace(new RegExp(`\\bThrough ${escapedTitle},\\s*`, "gi"), "")
      .replace(new RegExp(`\\bAround ${escapedTitle},\\s*`, "gi"), "Here, ")
      .replace(new RegExp(`\\bIn ${escapedTitle},\\s*`, "gi"), "Here, ")
      .replace(new RegExp(`${escapedTitle}\\s+helps\\s+`, "gi"), "This shows ")
      .replace(new RegExp(`${escapedTitle}\\s+points\\s+`, "gi"), "This points ")
      .replace(/\bThis detail God\b/gi, "God")
      .replace(/\bhelps the reader picture\b/gi, "pictures")
      .replace(/\bhelps the reader see\b/gi, "shows")
      .replace(/\bhelps readers see\b/gi, "shows")
      .replace(/\bkeeps the reader close to\b/gi, "stays close to")
      .replace(/\bthe reader already knows\b/gi, "the surrounding story has already shown")
      .replace(/\bthe reader\b/gi, "a beginner")
      .replace(/\breaders\b/gi, "beginners")
      .replace(/\bThis should be read as more than a construction note\b/gi, "This detail belongs to worship before the LORD");

    cleaned = cleaned.replace(repeatedTitlePattern, (_match, verb: string) => {
      const normalizedVerb = verb.toLowerCase();
      if (normalizedVerb === "means") return "";
      if (normalizedVerb === "is") return "This is ";
      if (normalizedVerb === "turns") return "This turns ";
      if (normalizedVerb === "looks") return "This looks ";
      return `This ${normalizedVerb} `;
    });

    return cleaned
      .replace(/\bThis shows explain\b/gi, "This explains")
      .replace(/\bThis explains covenant life after the Exodus\b/gi, "Israel is learning covenant life after the Exodus")
      .replace(/\bThis should be read as more than a construction note\b/gi, "This detail belongs to worship before the LORD")
      .replace(/\bThis reminds the reader that\b/gi, "This shows that")
      .replace(/\bThis reminds the reader\b/gi, "This shows")
      .replace(/^This matters because\s+/i, "")
      .replace(/^([a-z])/, (letter) => letter.toUpperCase());
  });
}

function getDays27To29TeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.chapter >= 21 && section.chapter <= 24) {
    if (/servant|bond|maid|master|ox|thief|borrow|pledge|widow|fatherless|stranger|judge|rest|sabbath|feast|blood|altar|book/.test(lower)) {
      return ["⚖️ God's law protects real people", "🏠 Covenant life reaches ordinary situations", "🛡️ The weak must not be exploited", "📜 Israel must live under the LORD's justice"];
    }
    return ["📜 The LORD gives covenant instruction", "⚖️ Justice matters among God's people", "🤝 Neighbor love becomes practical", "🙌 Rescue leads into ordered obedience"];
  }

  if (section.chapter >= 25 && section.chapter <= 28) {
    if (/ark|mercy seat|cherubim|table|candlestick|lamp|curtain|vail|altar|court|oil|ephod|breastplate|stones|garments|mitre|plate/.test(lower)) {
      return ["🏕️ The tabernacle teaches holy nearness", "✨ Worship has beauty and order", "🩸 Access to God requires His provision", "👑 The priest represents the people before the LORD"];
    }
    return ["🏕️ God is preparing a dwelling among Israel", "🛠️ The details follow His command", "🙌 Worship is shaped by God's holiness", "✨ Beauty serves the presence of the LORD"];
  }

  if (section.chapter >= 29 && section.chapter <= 30) {
    if (/priest|aaron|sons|blood|ram|altar|anoint|atonement|incense|wash|basin|holy|continual|offering/.test(lower)) {
      return ["🩸 Blood marks consecration and atonement", "👑 Priests are set apart for holy service", "🔥 Worship must be offered God's way", "🙌 The LORD makes a way to dwell with His people"];
    }
    return ["⛺ Holy service happens by God's command", "🧼 Cleansing is required near His presence", "🕯️ Worship continues before the LORD", "📜 Israel cannot invent its own approach to God"];
  }

  return ["📖 The phrase comes from the assigned text", "🔍 It explains a real detail in the verse", "🙌 The LORD is teaching His people", "🧠 The meaning should be clear before moving on"];
}

function isDays27To29FillerLine(line: string) {
  return /(^this detail belongs|^this names\b|^this gives\b|^this protects\b|^this teaches\b|^this treats\b|^this explains\b|^this person or object|^sacrifice is dealing|^holy oil marked|helps the reader|helps readers|the phrase shows|real detail|assigned text|meaning should be clear|keeps the reader close|should be understood before|names something god included|more than a construction note)/i.test(line);
}

function makeDays27To29OpeningLineUnique(line: string, title: string, section: PersonalExodusPhraseSectionInput) {
  const startsWithTitle = line.toLowerCase().startsWith(title.toLowerCase());
  const adjusted = startsWithTitle ? `The wording ${line.charAt(0).toLowerCase()}${line.slice(1)}` : line;
  return adjusted;
}

function getDay27ShortTeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 21:1-6" || section.reference === "Exodus 21:7-11") {
    return ["\u{2696}\u{FE0F} Service has limits", "\u{1F3E0} Households must act justly", "\u{1F6E1}\u{FE0F} Vulnerable people are protected", "\u{1F4DC} The LORD sets the terms"];
  }
  if (section.chapter === 21) {
    return ["\u{2696}\u{FE0F} Harm must be judged", "\u{1F9FE} Responsibility has a cost", "\u{1F6E1}\u{FE0F} Life must be protected", "\u{1F91D} Justice repairs what it can"];
  }
  if (section.reference === "Exodus 22:1-6" || section.reference === "Exodus 22:7-12" || section.reference === "Exodus 22:13-15") {
    return ["\u{1F9FE} Restitution repairs loss", "\u{1F3E0} Neighbor property matters", "\u{2696}\u{FE0F} Context matters in judgment", "\u{1F91D} Trust must be protected"];
  }
  if (section.reference === "Exodus 22:16-21" || section.reference === "Exodus 22:22-27" || section.reference === "Exodus 22:28-31") {
    return ["\u{1F6E1}\u{FE0F} The vulnerable are protected", "\u{1F494} God hears affliction", "\u{1F932} Mercy shapes justice", "\u{1F64C} Holiness reaches daily life"];
  }
  if (section.reference === "Exodus 23:1-6" || section.reference === "Exodus 23:7-9") {
    return ["\u{1F5E3}\u{FE0F} Truth matters in court", "\u{2696}\u{FE0F} Justice must not bend", "\u{1F6AB} Bribes corrupt judgment", "\u{1F6E1}\u{FE0F} The stranger must not be oppressed"];
  }
  if (section.reference === "Exodus 23:10-15" || section.reference === "Exodus 23:16-19") {
    return ["\u{1F6D1} Rest belongs to the LORD", "\u{1F33E} Harvest becomes worship", "\u{1F35E} Feasts remember rescue", "\u{1F4C5} Israel's calendar is holy"];
  }
  if (section.reference === "Exodus 23:20-25" || section.reference === "Exodus 23:26-31" || section.reference === "Exodus 23:32-33") {
    return ["\u{1F9ED} The LORD leads the way", "\u{1F6AB} False gods are a danger", "\u{1F3DE}\u{FE0F} The land is received by trust", "\u{1F6E1}\u{FE0F} God guards His people"];
  }
  if (section.reference === "Exodus 24:1-6" || section.reference === "Exodus 24:7-8") {
    return ["\u{1F4DC} Covenant words are heard", "\u{1FA78} Blood marks the covenant", "\u{1F5E3}\u{FE0F} The people answer", "\u{1F64C} Worship confirms the promise"];
  }
  if (section.reference === "Exodus 24:9-14" || section.reference === "Exodus 24:15-18") {
    return ["\u{26F0}\u{FE0F} Sinai is holy ground", "\u{2601}\u{FE0F} The cloud covers the mountain", "\u{1F525} Glory appears like fire", "\u{1F4DC} Moses receives God's word"];
  }

  return getDays27To29TeachingBullets(section, title);
}

function getDay27ShortClosing(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 21:1-6" || section.reference === "Exodus 21:7-11") return "A redeemed people must not copy Egypt's cruelty.";
  if (section.chapter === 21 && /ox|pit|sum|ransom|pay|known|owner|gore|push/.test(lower)) return "Known danger and real damage bring real responsibility.";
  if (section.chapter === 21) return "God's law protects life and restrains harm.";
  if (section.reference === "Exodus 22:1-6" || section.reference === "Exodus 22:7-12" || section.reference === "Exodus 22:13-15") return "Justice includes repairing what was taken or damaged.";
  if (section.reference === "Exodus 22:16-21" || section.reference === "Exodus 22:22-27" || section.reference === "Exodus 22:28-31") return "Holiness protects people who could easily be exploited.";
  if (section.reference === "Exodus 23:1-6" || section.reference === "Exodus 23:7-9") return "Covenant justice must tell the truth.";
  if (section.reference === "Exodus 23:10-15" || section.reference === "Exodus 23:16-19") return "Israel's time, work, and harvest belong to the LORD.";
  if (section.reference === "Exodus 23:20-25" || section.reference === "Exodus 23:26-31" || section.reference === "Exodus 23:32-33") return "The promised land must not pull Israel into false worship.";
  if (section.reference === "Exodus 24:1-6" || section.reference === "Exodus 24:7-8") return "The covenant is heard, accepted, and marked with blood.";
  if (section.reference === "Exodus 24:9-14" || section.reference === "Exodus 24:15-18") return "God's nearness is glorious, holy, and never casual.";

  return "The LORD is shaping rescued people into a just and holy community.";
}

function getDay28ShortTeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.chapter === 25 && /offering|willingly|heart|gold|silver|brass|blue|purple|scarlet|oil|spices|onyx|stones/.test(lower)) {
    return ["\u{1F381} Gifts are brought willingly", "\u{1F48E} Valuable materials are given", "\u{1F56F}\u{FE0F} Oil and spices serve worship", "\u{1F3D5}\u{FE0F} God is preparing a dwelling place"];
  }
  if (section.chapter === 25 && /sanctuary|dwell|pattern|ark|mercy seat|cherub|testimony|meet|commune/.test(lower)) {
    return ["\u{1F3D5}\u{FE0F} The sanctuary is God's dwelling", "\u{1F4E6} The ark holds the testimony", "\u{1F64F} Mercy is at the center", "\u{1FAE1} God promises to meet His people"];
  }
  if (section.chapter === 25) {
    return ["\u{1F35E} Bread stands before the LORD", "\u{1F56F}\u{FE0F} Light fills the holy place", "\u{1F7E1} Gold marks holy service", "\u{1F4DC} Every detail follows God's command"];
  }
  if (section.chapter === 26) {
    return ["\u{1F3D5}\u{FE0F} The tabernacle is a holy tent", "\u{1F9F5} Curtains and coverings are ordered", "\u{1F6AA} The veil guards holy access", "\u{2728} Beauty serves God's presence"];
  }
  if (section.chapter === 27) {
    if (section.reference === "Exodus 27:21-21") {
      return ["\u{1F56F}\u{FE0F} The lamp is tended continually", "\u{1F307} Evening to morning", "\u{1F451} Aaron and his sons serve", "\u{1F4DC} The command continues for Israel"];
    }
    return ["\u{1FA78} The altar points to sacrifice", "\u{1F6A7} The court marks holy boundaries", "\u{1F56F}\u{FE0F} The lamp gives steady light", "\u{1F64C} Worship follows God's pattern"];
  }
  if (section.chapter === 28 && /ephod|breastplate|stones|names|urim|thummim|shoulder|heart/.test(lower)) {
    return ["\u{1F455} Priestly garments mark holy service", "\u{1F48E} Israel's names are carried before God", "\u{1F64F} The priest represents the people", "\u{1F451} Holiness belongs to the LORD"];
  }
  if (section.chapter === 28) {
    return ["\u{1F455} The priest is dressed for holy service", "\u{1F451} Aaron serves before the LORD", "\u{1F64F} The priest represents Israel", "\u{26A0}\u{FE0F} God's holiness is serious"];
  }

  return getDays27To29TeachingBullets(section, title);
}

function getDay28ShortClosing(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.chapter === 25 && /offering|willingly|heart|gold|silver|brass|blue|purple|scarlet|oil|spices|onyx|stones/.test(lower)) return "Worship begins with willing gifts for God's dwelling place.";
  if (section.chapter === 25 && /sanctuary|dwell|pattern|ark|mercy seat|cherub|testimony|meet|commune/.test(lower)) return "The center of Israel's camp is God's holy presence and mercy.";
  if (section.chapter === 25) return "The holy place teaches provision, light, beauty, and order before the LORD.";
  if (section.chapter === 26 && /vail|veil|most holy|holy place/.test(lower)) return "The veil teaches that nearness to God is holy and guarded.";
  if (section.chapter === 26) return "God's dwelling place is built with order, beauty, and holiness.";
  if (section.chapter === 27 && /altar|offering|blood|horn|ashes/.test(lower)) return "Approach to God begins with sacrifice.";
  if (section.chapter === 27 && /court|hanging|gate|pillars|sockets/.test(lower)) return "The court marks the boundary around holy worship.";
  if (section.chapter === 27) return "The lamp keeps light burning before the LORD.";
  if (section.chapter === 28 && /names|stones|breastplate|ephod|shoulder|heart/.test(lower)) return "The priest carries Israel before the LORD.";
  if (section.chapter === 28) return "Priestly service must be marked by holiness.";

  return "The LORD teaches Israel how to worship near His presence.";
}

function getDay29ShortTeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 29:1-6" || section.reference === "Exodus 29:7-9") {
    return ["\u{1F4A7} Priests are washed", "\u{1F455} Priests are clothed", "\u{1F56F}\u{FE0F} Oil marks holy service", "\u{1F451} Aaron's house is set apart"];
  }
  if (section.reference === "Exodus 29:10-15" || section.reference === "Exodus 29:16-21" || section.reference === "Exodus 29:22-27") {
    return ["\u{1FA78} Blood marks consecration", "\u{1F525} Sacrifice is offered to God", "\u{1F450} Priests identify with the offering", "\u{1F451} Holy service begins with atonement"];
  }
  if (section.reference === "Exodus 29:28-28" || section.reference === "Exodus 29:29-34") {
    return ["\u{1F4DC} The priestly portion is commanded", "\u{1F35E} Holy food stays holy", "\u{1F451} The priesthood continues", "\u{1F6AB} Strangers may not eat it"];
  }
  if (section.reference === "Exodus 29:35-40" || section.reference === "Exodus 29:41-46") {
    return ["\u{1FA78} Daily offerings continue", "\u{1F307} Morning and evening worship", "\u{1F3D5}\u{FE0F} God meets His people", "\u{1F64C} The LORD dwells with Israel"];
  }
  if (section.reference === "Exodus 30:1-6" || section.reference === "Exodus 30:7-10") {
    return ["\u{1F32B}\u{FE0F} Incense rises before God", "\u{1F56F}\u{FE0F} Lamps are tended daily", "\u{1F6AA} Worship happens near the veil", "\u{1F4DC} The altar follows God's command"];
  }
  if (section.reference === "Exodus 30:11-16") {
    return ["\u{1FA99} Every life is counted", "\u{2696}\u{FE0F} Rich and poor give alike", "\u{1FA78} Atonement protects the people", "\u{1F4DC} The ransom belongs to the LORD"];
  }
  if (section.reference === "Exodus 30:17-21") {
    return ["\u{1F4A7} Washing comes before service", "\u{270B} Hands and feet are cleansed", "\u{26A0}\u{FE0F} Holy service is serious", "\u{1F451} Priests approach God's way"];
  }
  if (section.reference === "Exodus 30:22-27" || section.reference === "Exodus 30:28-33") {
    return ["\u{1F56F}\u{FE0F} Oil marks holy service", "\u{1F33F} Spices are set apart", "\u{1F3D5}\u{FE0F} The tabernacle is consecrated", "\u{1F6AB} Holy oil is not common"];
  }
  if (section.reference === "Exodus 30:34-38") {
    return ["\u{1F32B}\u{FE0F} Incense is holy", "\u{1F33F} Fragrance belongs to worship", "\u{1F4DC} God gives the recipe", "\u{1F6AB} It must not be copied"];
  }

  if (/incense|perfume|spices/.test(lower)) return ["\u{1F32B}\u{FE0F} Fragrance is set apart", "\u{1F64C} It belongs to worship", "\u{1F4DC} God gives the terms", "\u{1F6AB} Holy things are not common"];
  return ["\u{1F451} Priests are set apart", "\u{1FA78} Sacrifice deals with sin", "\u{1F3D5}\u{FE0F} God meets His people", "\u{1F4DC} Worship follows God's command"];
}

function getDay29ShortClosing(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 29:1-6" || section.reference === "Exodus 29:7-9") return "Priests are prepared by washing, clothing, and anointing.";
  if (section.reference === "Exodus 29:10-15" || section.reference === "Exodus 29:16-21" || section.reference === "Exodus 29:22-27") return "Priestly service begins with sacrifice and blood.";
  if (section.reference === "Exodus 29:28-28" || section.reference === "Exodus 29:29-34") return "Holy portions are treated as holy because they belong to God.";
  if (section.reference === "Exodus 29:35-40" || section.reference === "Exodus 29:41-46") return "Daily worship keeps Israel near the LORD by His mercy.";
  if (section.reference === "Exodus 30:1-6" || section.reference === "Exodus 30:7-10") return "Incense marks daily worship near the veil.";
  if (section.reference === "Exodus 30:11-16") return "Every life is counted before the LORD.";
  if (section.reference === "Exodus 30:17-21") return "Priests must be washed before holy service.";
  if (section.reference === "Exodus 30:22-27" || section.reference === "Exodus 30:28-33") return "Holy oil marks what belongs to God's service.";
  if (section.reference === "Exodus 30:34-38") return "Holy incense belongs to worship before the LORD.";
  if (/blood|atonement/.test(lower)) return "Holy service depends on atonement.";

  return "The LORD teaches Israel to treat holy service as holy.";
}

function getDays27To29SpecificOpening(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.chapter >= 29 && section.chapter <= 30) {
    if (lower.includes("this is the thing")) return ["This introduces the ceremony that will set Aaron and his sons apart.", "Priestly service begins because God commands it, not because Aaron chooses it for himself."];
    if (lower.includes("to hallow them")) return ["Hallow means set apart as holy for the LORD.", "Aaron and his sons must be made ready before they serve as priests."];
    if (lower.includes("young bullock") || lower.includes("bullock")) return ["A bullock is a young bull brought for sacrifice.", "The priestly ceremony begins with sin being dealt with before God."];
    if (lower.includes("two rams") || lower === "one ram") return ["A ram is a male sheep used for sacrifice.", "The rams are part of setting the priests apart for holy service."];
    if (lower.includes("without blemish")) return ["Without blemish means without defect.", "The animal brought to the LORD must not be damaged or careless."];
    if (lower.includes("unleavened bread")) return ["Unleavened bread is bread made without leaven, so it does not rise.", "This bread is brought with the sacrifices as part of the consecration ceremony."];
    if (lower.includes("cakes unleavened") || lower.includes("wafers unleavened")) return ["These are unleavened bread pieces used in the priestly offering.", "Even the food in the ceremony is prepared as God commands."];
    if (lower.includes("mingled with oil") || lower.includes("anointed with oil")) return ["Oil is added to the bread for the holy offering.", "The food is not ordinary table bread; it belongs to worship."];
    if (lower.includes("wheaten flour")) return ["Wheaten flour is fine wheat flour used to make the offering bread.", "The materials for the ceremony are named because worship follows God's order."];
    if (lower.includes("bring them in the basket")) return ["The bread is carried in a basket to the tabernacle.", "The basket brings the prepared food into the priestly ceremony."];
    if (lower.includes("wash them with water")) return ["Washing with water prepares the priests for holy service.", "Before Aaron and his sons are clothed, they are cleansed."];
    if (lower.includes("put upon aaron the holy garments")) return ["Aaron is dressed in garments set apart for priestly service.", "His clothing marks that he is serving before the LORD."];
    if (lower.includes("garments, and the anointing oil")) return ["The garments and oil are both signs of priestly consecration.", "Aaron is clothed and anointed for service that belongs to God."];
    if (lower.includes("take the anointing oil")) return ["The anointing oil is the holy oil used to mark priestly service.", "Aaron does not enter the priesthood without being set apart."];
    if (lower.includes("pour it upon his head")) return ["The oil is poured on Aaron's head as a visible sign of consecration.", "His priestly role is publicly marked before the LORD."];
    if (lower === "anoint him") return ["Anoint means mark him with holy oil for God's service.", "Aaron is being set apart to serve as priest."];
    if (lower.includes("bring his sons")) return ["Aaron's sons are brought forward because the priesthood includes his house.", "They also must be prepared before serving."];
    if (lower.includes("put coats upon them")) return ["Coats are priestly garments placed on Aaron's sons.", "Their clothing shows they are not entering ordinary work."];
    if (lower.includes("gird them with girdles")) return ["Girdles are sashes used to fasten the priestly clothing.", "The sons are dressed carefully for holy service."];
    if (lower.includes("bonnets")) return ["Bonnets are priestly head coverings.", "Even the priests' heads are covered as part of their holy clothing."];
    if (lower.includes("priest's office")) return ["The priest's office is the role of serving before the LORD for Israel.", "God gives this role to Aaron and his sons."];
    if (lower.includes("consecrate aaron")) return ["Consecrate means set apart for holy service.", "Aaron and his sons are being prepared to serve as priests."];
    if (lower.includes("put their hands upon the head")) return ["Laying hands on the animal connects the priests with the sacrifice.", "The offering stands in their place before God."];
    if (lower.includes("kill the bullock") || lower.includes("kill the ram") || lower.includes("slay the ram")) return ["Slaying the animal turns it into the appointed sacrifice.", "Priestly service begins with life given before the LORD."];
    if (lower.includes("blood of the bullock") || lower.includes("blood of the ram") || lower.includes("take of the blood")) return ["The blood is taken from the sacrifice for the ceremony.", "Blood marks that atonement and consecration are serious."];
    if (lower.includes("horns of the altar")) return ["The altar's horns are its raised corner points.", "Blood is placed there to mark the altar in the sin offering."];
    if (lower.includes("with thy finger")) return ["Moses applies the blood with his finger.", "The action shows the altar is being marked deliberately."];
    if (lower.includes("bottom of the altar") || lower.includes("blood beside the bottom")) return ["The rest of the blood is poured at the base of the altar.", "The whole sacrifice is handled as God commands."];
    if (lower.includes("sin offering")) return ["A sin offering deals with sin before the holy LORD.", "The priests cannot serve without atonement."];
    if (lower.includes("sprinkle the blood")) return ["Sprinkling the blood means applying it around the altar.", "The altar is marked by sacrificial blood before priestly service continues."];
    if (lower.includes("burnt offering")) return ["A burnt offering is fully offered up to God on the altar.", "The whole animal is given in worship."];
    if (lower.includes("sweet savour")) return ["A sweet savour means the offering is pleasing to the LORD.", "The sacrifice rises to God as accepted worship."];
    if (lower.includes("ram of consecration")) return ["The ram of consecration is the sacrifice used to set the priests apart.", "Its blood and portions mark Aaron and his sons for service."];
    if (lower.includes("cut the ram in pieces")) return ["The ram is cut into pieces before being offered.", "The sacrifice is prepared carefully for the altar."];
    if (lower.includes("tip of the right ear")) return ["The right ear, thumb, and toe are marked with blood.", "The priest's hearing, work, and walk are claimed for holy service."];
    if (lower.includes("upon aaron, and upon his garments")) return ["Blood and oil are placed on Aaron and his garments.", "Both the priest and his clothing are marked as holy."];
    if (lower.includes("fat and the rump")) return ["The fat and rump are chosen portions from the ram.", "These parts are lifted into the consecration offering."];
    if (lower.includes("right shoulder")) return ["The right shoulder is a selected portion of the ram.", "It is set apart in the priestly ceremony."];
    if (lower.includes("one loaf of bread")) return ["One loaf is taken from the basket of consecration bread.", "Bread is included with the animal offering."];
    if (lower.includes("put all in the hands")) return ["The offering portions are placed in Aaron's and his sons' hands.", "Their hands are filled for priestly service before the LORD."];
    if (lower.includes("wave offering")) return ["A wave offering is presented before the LORD.", "The action shows the offering belongs to God."];
    if (lower.includes("burn them upon the altar")) return ["The offering portions are burned on the altar.", "What is placed in the priests' hands is then given to the LORD."];
    if (lower.includes("burn the whole ram")) return ["The whole ram is burned on the altar as a burnt offering.", "The sacrifice is completely given to the LORD."];
    if (lower.includes("sanctified from the ram")) return ["These parts are set apart from the ram for holy use.", "The consecration sacrifice provides a priestly portion."];
    if (lower.includes("inwards") || lower.includes("caul")) return ["The inward parts are inner portions of the animal.", "The sacrifice is handled in the detailed way God commands."];
    if (lower.includes("heave offering")) return ["A heave offering is a portion lifted up or set apart for the LORD.", "This part of the sacrifice is assigned by God's command."];
    if (lower.includes("statute for ever")) return ["A statute for ever is a lasting command for Israel.", "The priestly portion is not a one-time custom."];
    if (lower.includes("from the children of israel")) return ["The priestly portion comes from Israel's offerings.", "The people share in supporting the worship God commanded."];
    if (lower.includes("peace offerings")) return ["Peace offerings are sacrifices connected with fellowship before God.", "Part of that offering is assigned to the priests."];
    if (lower.includes("holy garments of aaron")) return ["Aaron's holy garments are the clothing of the high priest.", "They pass to his sons when they serve after him."];
    if (lower.includes("his sons after him")) return ["Aaron's sons continue the priestly service after him.", "The priesthood is carried forward through his line."];
    if (lower.includes("seven days")) return ["Seven days marks the full length of the consecration ceremony.", "The priests are not rushed into holy service."];
    if (lower.includes("boil his flesh")) return ["The consecration meat is cooked in a holy place.", "Even eating from the sacrifice is treated as holy."];
    if (lower.includes("stranger shall not eat")) return ["A stranger means someone outside the priestly household.", "Holy consecration food is not common food for anyone to eat."];
    if (lower.includes("eat the flesh of the ram")) return ["The priests eat from the consecration ram.", "The meal belongs to their being set apart for service."];
    if (lower.includes("make the atonement")) return ["Atonement means sin is dealt with before God.", "The ceremony prepares priests to serve near the holy LORD."];
    if (lower.includes("to be anointed therein")) return ["To be anointed therein means Aaron's sons wear the holy garments when they are anointed.", "The clothing and oil together mark priestly service."];
    if (lower.includes("cleanse the altar")) return ["The altar is cleansed so it can be used for holy sacrifice.", "Even the place of offering must be consecrated."];
    if (lower.includes("toucheth the altar")) return ["Anything touching the altar is treated as holy.", "The altar is not ordinary furniture."];
    if (lower.includes("offer every day")) return ["A sacrifice is offered every day during the consecration.", "The altar is prepared through repeated appointed offerings."];
    if (lower.includes("anoint it, to sanctify it")) return ["The altar is anointed to set it apart as holy.", "It cannot be treated as ordinary because sacrifices will be offered there."];
    if (lower.includes("two lambs")) return ["Two young lambs are appointed for the daily offering.", "Israel's worship has a morning and evening rhythm."];
    if (lower.includes("day by day continually")) return ["Continually means the offering keeps happening day after day.", "Worship before the LORD becomes a regular pattern."];
    if (lower.includes("hin of wine") || lower.includes("hin of beaten oil")) return ["A hin is an ancient liquid measure.", "The amount is specified because offerings follow God's command."];
    if (lower.includes("at even")) return ["At even means in the evening.", "The daily offering is made at the close of the day."];
    if (lower.includes("door of the tabernacle")) return ["The door of the tabernacle is the entrance to the holy tent.", "God appoints this as the meeting place for worship."];
    if (lower.includes("where i will meet")) return ["God promises to meet His people at the tabernacle.", "The sacrifices are tied to His holy presence, not empty ritual."];
    if (lower.includes("sanctify the tabernacle")) return ["God will sanctify the tabernacle by His presence.", "The tent is holy because the LORD meets Israel there."];
    if (lower.includes("dwell among the children")) return ["God dwelling among Israel means His presence stays in the camp.", "The rescue from Egypt is moving toward life with God."];
    if (lower.includes("i will be their god")) return ["I will be their God names the covenant relationship.", "Israel belongs to the LORD who lives among them."];
    if (lower.includes("brought them forth out of egypt")) return ["God reminds Israel that He brought them out of Egypt.", "Deliverance leads to His presence dwelling among them."];
    if (lower.includes("altar to burn incense")) return ["The incense altar is the place where fragrant incense is burned.", "It stands inside the tabernacle for daily worship."];
    if (lower.includes("shittim wood")) return ["Shittim wood is the durable wood used for tabernacle furniture.", "The incense altar is built from real materials chosen for holy use."];
    if (lower.includes("cubit shall be the length")) return ["A cubit is an ancient length measurement.", "The incense altar is built to exact size, not rough guesswork."];
    if (lower.includes("overlay it with pure gold")) return ["The incense altar is covered with pure gold.", "The gold marks it as holy furniture for worship."];
    if (lower.includes("horns thereof")) return ["The horns are raised corners on the incense altar.", "They are part of the altar's holy design."];
    if (lower.includes("crown of gold")) return ["A crown of gold is a raised golden rim.", "The incense altar is given beauty and distinction."];
    if (lower.includes("before the vail") || lower.includes("before the veil")) return ["Before the veil means near the curtain to the Most Holy Place.", "The incense altar stands close to God's guarded presence."];
    if (lower.includes("before the mercy seat")) return ["The mercy seat is the cover of the ark connected with atonement.", "The incense altar is placed near the place where God meets Moses."];
    if (lower.includes("aaron shall burn thereon sweet incense")) return ["Aaron burns sweet incense on the incense altar.", "The fragrance rises before the LORD as part of daily worship."];
    if (lower.includes("every morning")) return ["Every morning means incense is burned at the start of each day.", "Daily worship begins with fragrance rising before the LORD."];
    if (lower.includes("perpetual incense")) return ["Perpetual incense means incense is offered regularly before the LORD.", "The fragrance marks ongoing worship, not a rare event only."];
    if (lower.includes("aaron shall make an atonement")) return ["Aaron makes atonement on the incense altar with blood.", "Even this altar is cleansed because worship is near the holy LORD."];
    if (lower.includes("dresseth the lamps")) return ["Dressing the lamps means trimming and tending them.", "Incense is offered while the priest cares for the holy light."];
    if (lower.includes("lamps at even")) return ["The lamps are tended in the evening.", "Light and incense mark the daily rhythm of worship."];
    if (lower.includes("strange incense")) return ["Strange incense means unauthorized incense.", "The altar must not be used however people prefer."];
    if (lower.includes("once in a year")) return ["Once in a year marks the yearly atonement on the altar.", "Even the incense altar is connected with cleansing by blood."];
    if (lower.includes("most holy unto the lord")) return ["Most holy means completely set apart for the LORD.", "The incense altar must be treated with deep reverence."];
    if (lower.includes("takest the sum")) return ["Taking the sum means counting the people.", "When Israel is numbered, each life must be acknowledged before God."];
    if (lower.includes("ransom")) return ["A ransom is a payment given for a life.", "The census offering teaches that every Israelite life belongs to the LORD."];
    if (lower.includes("no plague")) return ["No plague means the ransom protects the people during the numbering.", "Counting Israel is not casual because the people belong to God."];
    if (lower.includes("half a shekel")) return ["A half shekel is a set weight of silver.", "Each person gives the same ransom amount before the LORD."];
    if (lower.includes("rich shall not give more")) return ["The rich do not give more and the poor do not give less.", "Every life is valued equally in the ransom offering."];
    if (lower.includes("poor shall not give less")) return ["The poor are not allowed to give less than the ransom amount.", "The command teaches that every life stands equal before the LORD."];
    if (lower.includes("shekel of the sanctuary")) return ["The shekel of the sanctuary is the official weight used for the offering.", "The ransom is measured by God's standard, not private judgment."];
    if (lower.includes("memorial")) return ["A memorial is something kept before the LORD as a reminder.", "The ransom money witnesses that Israel's lives are His."];
    if (lower.includes("atonement for your souls")) return ["Atonement for your souls means the ransom is tied to life before God.", "The payment points to mercy, not simple taxation."];
    if (lower.includes("laver of brass")) return ["The laver is a bronze basin for washing.", "Priests use it before entering holy service."];
    if (lower.includes("foot also of brass")) return ["The laver's foot is its bronze base.", "The basin stands ready between the tent and the altar."];
    if (lower.includes("wash withal")) return ["To wash withal means to wash with it.", "The laver exists so priests can cleanse themselves before serving."];
    if (lower.includes("wash their hands and their feet")) return ["Priests wash their hands and feet before service.", "Their work and walk must be clean near holy things."];
    if (lower.includes("that they die not")) return ["That they die not warns that unwashed service is dangerous.", "God's holiness makes priestly cleansing necessary."];
    if (lower.includes("come near to the altar")) return ["Coming near the altar means approaching the place of sacrifice.", "Priests must wash before handling holy worship."];
    if (lower.includes("between the tabernacle and the altar")) return ["The laver stands between the tent and the altar.", "Its location puts washing directly before priestly service."];
    if (lower.includes("their hands and their feet")) return ["Hands and feet point to priestly work and movement.", "The priests must be clean in what they do and where they go."];
    if (lower.includes("holy anointing oil")) return ["Holy anointing oil is the special oil used to consecrate people and objects.", "It marks what belongs to God's service."];
    if (lower.includes("principal spices")) return ["Principal spices are the chief spices for the holy anointing oil.", "God names the ingredients instead of leaving the mixture open."];
    if (lower.includes("pure myrrh")) return ["Pure myrrh is a costly fragrant spice.", "It becomes part of the oil set apart for holy service."];
    if (lower.includes("sweet cinnamon")) return ["Sweet cinnamon is a fragrant spice in the holy oil.", "The smell itself belongs to consecrated worship."];
    if (lower.includes("sweet calamus")) return ["Sweet calamus is another fragrant ingredient.", "The holy oil is made from specific spices God commands."];
    if (lower.includes("oil olive")) return ["Olive oil is the base of the anointing oil.", "It carries the spices used to mark holy things."];
    if (lower.includes("art of the apothecary")) return ["An apothecary is a skilled maker of mixtures.", "The holy oil is carefully prepared, not casually blended."];
    if (lower.includes("tabernacle of the congregation")) return ["The tabernacle of the congregation is the meeting tent.", "It is anointed because it belongs to the LORD's presence."];
    if (lower.includes("ark of the testimony")) return ["The ark of the testimony is the sacred chest holding God's covenant word.", "It is anointed as part of the holy dwelling."];
    if (lower.includes("altar of burnt offering")) return ["The altar of burnt offering is the place of sacrifice.", "It is anointed because sacrifice belongs to holy worship."];
    if (lower.includes("sanctify them")) return ["Sanctify means set apart as holy.", "The anointing oil marks these objects as belonging to God."];
    if (lower.includes("they may be most holy")) return ["Most holy means completely set apart for the LORD.", "The anointed objects must not be treated as common."];
    if (lower.includes("upon man's flesh")) return ["The holy oil must not be poured on ordinary human skin.", "It is reserved for God's appointed holy use."];
    if (lower.includes("make any other like it")) return ["Israel must not copy the holy oil for ordinary use.", "What God sets apart must stay set apart."];
    if (lower.includes("holy unto you")) return ["Holy unto you means Israel must treat the oil as sacred.", "The mixture belongs to worship, not personal fragrance."];
    if (lower.includes("cut off from his people")) return ["Cut off from his people means removed from covenant community.", "Misusing holy oil is treated as serious rebellion."];
    if (lower.includes("compoundeth any like it")) return ["Compounding any like it means making a copy of the holy mixture.", "God forbids copying sacred oil for common use."];
    if (lower.includes("sweet spices")) return ["Sweet spices are fragrant ingredients for holy incense.", "God gives the scent of worship its own recipe."];
    if (lower.includes("stacte") || lower.includes("onycha") || lower.includes("galbanum")) return ["Stacte, onycha, and galbanum are incense ingredients.", "Their names show that the incense is a specific holy mixture."];
    if (lower.includes("pure frankincense")) return ["Pure frankincense is a fragrant incense ingredient.", "It is included in the holy mixture offered before the LORD."];
    if (lower.includes("a perfume")) return ["The perfume is the holy incense mixture.", "Its fragrance belongs to worship before the LORD."];
    if (lower.includes("tempered together")) return ["Tempered together means blended into one mixture.", "The incense is prepared carefully as God commands."];
    if (lower.includes("beat some of it very small")) return ["Beating it very small means grinding the incense fine.", "The prepared incense is placed before the testimony."];
    if (lower.includes("salted, pure, and holy")) return ["Salted, pure, and holy describes incense set apart for God.", "The mixture is prepared for sacred use, not common smell."];
    if (lower.includes("before the testimony")) return ["Before the testimony means near the ark that holds God's covenant word.", "The incense stands close to the heart of the tabernacle."];
    if (lower.includes("it shall be unto you most holy")) return ["Most holy means the incense is completely set apart for the LORD.", "Israel must treat its fragrance as sacred."];

    return ["This wording names a holy part of priestly service.", "The detail matters because priests may approach God only in the way He commands."];
  }

  if (section.chapter >= 25 && section.chapter <= 28) {
    if (lower.includes("to the ouches")) return ["The chains are fastened to the gold settings.", "The breastplate is secured to the priestly garment with care."];
    if (lower.includes("aaron shall bear the names")) return ["Aaron shall bear the names means he carries Israel's tribes before the LORD.", "The priest does not stand before God for himself only."];
    if (lower.includes("accepted before the lord")) return ["Accepted before the LORD means the holy gifts are received through the priest's service.", "The priest bears responsibility so Israel's offerings may be brought rightly."];
    if (lower.includes("coats, girdles, and bonnets")) return ["Coats, girdles, and bonnets are priestly clothing pieces.", "Aaron's sons are dressed for holy service, not ordinary work."];
    if (lower.includes("linen breeches")) return ["Linen breeches are undergarments for priestly modesty.", "The priests must be covered properly when serving near holy things."];
    if (lower.includes("come in unto the tabernacle")) return ["Coming into the tabernacle means entering the holy tent for service.", "The priests must approach dressed as God commands."];
    if (lower.includes("come near unto the altar")) return ["Coming near the altar means serving at the place of sacrifice.", "The priest must not approach the altar carelessly."];
    if (lower.includes("bear not iniquity")) return ["Bear not iniquity means avoid guilt by obeying God's priestly command.", "Holy service brings responsibility before the LORD."];
    if (lower === "and die") return ["And die warns that careless priestly service can bring judgment.", "God's holiness is not something to treat lightly."];
    if (lower.includes("bring me an offering")) return ["God asks Israel to bring an offering for the tabernacle.", "The dwelling place begins with gifts given for worship."];
    if (lower.includes("giveth it willingly")) return ["Willingly means the gift is given from desire, not forced labor.", "The tabernacle offering is different from Egypt's slavery work."];
    if (lower.includes("with his heart")) return ["With his heart means the gift comes from inward willingness.", "God wants worshipful giving, not empty pressure."];
    if (lower.includes("gold, and silver, and brass")) return ["Gold, silver, and brass are valuable metals for the tabernacle.", "Israel gives costly materials for the LORD's dwelling place."];
    if (lower.includes("blue, and purple, and scarlet")) return ["Blue, purple, and scarlet are rich colors used in the tabernacle materials.", "The holy place is being made with beauty and care."];
    if (lower.includes("oil for the light")) return ["Oil for the light means oil used to keep the lamp burning.", "The tabernacle needs steady light before the LORD."];
    if (lower.includes("spices")) return ["Spices are fragrant materials used in holy worship.", "The smell of worship is also set apart for the LORD."];
    if (lower.includes("onyx stones")) return ["Onyx stones are precious stones for the priestly garments.", "They will help carry Israel's names before the LORD."];
    if (lower.includes("stones to be set in the ephod")) return ["These stones are placed in the priestly ephod.", "The priest's clothing will carry memory and representation before God."];
    if (lower.includes("let them make me a sanctuary")) return ["A sanctuary is a holy dwelling place for God among His people.", "The LORD is not leaving Israel with rescue only; He is preparing to dwell among them."];
    if (lower.includes("that i may dwell among them")) return ["Dwell among them means God will live in the midst of Israel's camp.", "The tabernacle is about God's holy presence with His rescued people."];
    if (lower.includes("according to all that i shew thee")) return ["According to all that I shew thee means Moses must follow God's revealed pattern.", "Israel cannot invent the tabernacle from imagination."];
    if (lower.includes("after the pattern")) return ["Pattern means the design God shows Moses.", "The tabernacle is built by command, not personal taste."];
    if (lower.includes("overlay it with pure gold")) return ["Overlay it with pure gold means cover the wooden object with gold.", "The gold marks the furniture as belonging to holy service."];
    if (lower.includes("crown of gold")) return ["A crown of gold is a raised gold border around holy furniture.", "The detail gives the piece beauty and distinction for worship."];
    if (lower.includes("rings of gold")) return ["Gold rings are attached so the holy furniture can be carried.", "The tabernacle furniture must travel with Israel without being handled casually."];
    if (lower.includes("not be taken from it")) return ["The poles must stay in the ark's rings.", "The ark is always to be ready for careful carrying."];
    if (lower.includes("testimony which i shall give thee")) return ["The testimony is the covenant word God gives Moses.", "The ark holds the LORD's covenant instruction at the center of worship."];
    if (lower.includes("faces shall look one to another")) return ["The cherubim face one another over the mercy seat.", "Their posture frames the holy place where God promises to meet Moses."];
    if (lower.includes("there i will meet with thee")) return ["God promises to meet Moses above the mercy seat.", "The ark is not just furniture; it is tied to God's holy nearness."];
    if (lower.includes("i will commune with thee")) return ["Commune means speak with Moses.", "God promises to give His word from the place of mercy."];
    if (lower.includes("make a table")) return ["The table is holy furniture for the tabernacle.", "It will hold bread before the LORD."];
    if (lower.includes("border of an hand breadth")) return ["A hand breadth is a small width measured by the hand.", "The table is built with exact details instead of vague design."];
    if (lower.includes("table may be borne")) return ["The table may be borne means it can be carried with poles.", "Even holy furniture is made for Israel's journey."];
    if (lower.includes("dishes") || lower.includes("spoons") || lower.includes("covers") || lower.includes("bowls")) return ["These are utensils used with the tabernacle table.", "Even the serving pieces belong to ordered worship before the LORD."];
    if (lower.includes("bowls made like unto almonds")) return ["Almond-shaped bowls are part of the lampstand design.", "The lampstand is made with beauty, not bare function only."];
    if (lower.includes("six branches")) return ["Six branches extend from the lampstand.", "The lampstand's design is ordered and carefully shaped for holy light."];
    if (lower.includes("after their pattern")) return ["After their pattern means the pieces must match the design God showed.", "Worship is shaped by God's command, not Israel's guessing."];
    if (lower.includes("make the tabernacle")) return ["The tabernacle is the holy tent where God will dwell among Israel.", "Its construction begins with exact instructions."];
    if (lower.includes("loops of blue")) return ["Loops of blue are fasteners for the tabernacle curtains.", "Small connecting pieces matter because the tent must be joined as God commands."];
    if (lower.includes("covering upon the tabernacle")) return ["The covering protects the tabernacle tent.", "God's dwelling place has outer layers as well as inner beauty."];
    if (lower.includes("fifty loops")) return ["Fifty loops are repeated fasteners for joining the curtains.", "The number shows careful order in how the tent is connected."];
    if (lower.includes("that it may be one")) return ["That it may be one means the separate curtain pieces become one tent.", "The tabernacle is joined together as a unified dwelling place."];
    if (lower.includes("remnant that remaineth") || lower.includes("that which remaineth")) return ["Remaineth means the extra material left over in the tent covering.", "Even the overlap of the fabric is described with care."];
    if (lower.includes("covering for the tent")) return ["A covering for the tent is an outer protective layer.", "The holy dwelling is guarded by strong materials."];
    if (lower.includes("boards for the tabernacle")) return ["Boards form the frame of the tabernacle.", "The holy tent has a real structure, not only fabric."];
    if (lower.includes("two tenons")) return ["Tenons are projecting pieces that fit into sockets.", "The boards are designed to stand securely in place."];
    if (lower.includes("sockets of silver")) return ["Sockets of silver are bases that hold the boards.", "The frame rests on ordered supports."];
    if (lower.includes("twenty boards") || lower.includes("six boards") || lower.includes("two boards")) return ["The boards are counted and placed for each side or corner.", "God gives exact structure for the tabernacle walls."];
    if (lower.includes("coupled together beneath")) return ["Coupled together means fastened together.", "The corner boards must be joined securely."];
    if (lower.includes("unto one ring")) return ["One ring joins the boards at the corner.", "The small connection helps hold the holy structure together."];
    if (lower.includes("middle bar")) return ["The middle bar runs through the boards to strengthen them.", "The tabernacle frame is held together with support."];
    if (lower.includes("overlay the boards with gold")) return ["The boards are covered with gold for holy use.", "Even the frame of the dwelling is marked as sacred."];
    if (lower.includes("rear up the tabernacle")) return ["Rear up means set up the tabernacle.", "Moses must assemble the dwelling according to God's design."];
    if (lower.includes("according to the fashion")) return ["Fashion means the form or design shown to Moses.", "The tabernacle must be raised according to God's revealed pattern."];
    if (lower.includes("holy place and the most holy")) return ["The Holy Place and Most Holy are two sacred spaces inside the tabernacle.", "The layout teaches that God's presence is near but guarded."];
    if (lower.includes("hanging for the door")) return ["The hanging for the door is the entrance curtain of the tent.", "Access into the holy tent is marked by a commanded doorway."];
    if (lower.includes("make an altar")) return ["The altar is the place where sacrifices are offered.", "Approach to God begins with sacrifice."];
    if (lower.includes("horns of it")) return ["The horns are raised corners of the altar.", "They are part of the altar's sacred design."];
    if (lower.includes("overlay it with brass")) return ["Overlay it with brass means cover the altar with bronze-like metal.", "The altar is made strong for sacrificial fire."];
    if (lower.includes("pans to receive his ashes")) return ["The pans receive ashes from the altar fire.", "Even the cleanup of sacrifice has ordered tools."];
    if (lower.includes("vessels thereof")) return ["The vessels are tools used with the altar.", "Sacrifice is served with specific instruments."];
    if (lower.includes("two sides of the altar")) return ["The poles are placed on two sides of the altar.", "The altar is built so it can be carried."];
    if (lower.includes("altar may be borne")) return ["The altar may be borne means it can be carried with poles.", "Israel's worship furniture travels with the camp."];
    if (lower.includes("hollow with boards")) return ["Hollow with boards describes the altar's construction.", "The altar is made according to the form God shows Moses."];
    if (lower.includes("shewed thee in the mount")) return ["God showed Moses the pattern on the mountain.", "The altar follows revelation, not invention."];
    if (lower.includes("so shall they make it")) return ["So shall they make it means the builders must follow God's pattern.", "The command leaves no room for redesigning worship."];
    if (lower.includes("court of the tabernacle")) return ["The court is the outer enclosed area around the tabernacle.", "It marks the boundary of holy worship space."];
    if (lower.includes("hangings for the court")) return ["Hangings are fabric walls for the courtyard.", "They separate the worship area from the rest of the camp."];
    if (lower.includes("fine twined linen")) return ["Fine twined linen is carefully woven fabric.", "The court is made with ordered and clean material."];
    if (lower.includes("twenty pillars")) return ["Twenty pillars support the court hangings.", "The courtyard boundary is held up by a real structure."];
    if (lower.includes("sockets of brass")) return ["Sockets of brass are bases for the pillars.", "The boundary stands on strong supports."];
    if (lower.includes("gate of the court")) return ["The gate of the court is the entrance to the tabernacle courtyard.", "There is a commanded way into the worship space."];
    if (lower.includes("pillars round about")) return ["The pillars round about support the court on every side.", "The holy boundary surrounds the worship area."];
    if (lower.includes("filleted with silver")) return ["Filleted with silver means joined or trimmed with silver bands.", "The court structure includes careful finishing details."];
    if (lower.includes("pins of the tabernacle")) return ["Pins are stakes that help secure the tabernacle and court.", "Even the anchoring pieces matter in God's design."];
    if (lower.includes("pure oil olive beaten")) return ["Pure beaten olive oil fuels the lamp.", "The light before the LORD is kept with prepared oil."];
    if (lower.includes("tabernacle of the congregation")) return ["The tabernacle of the congregation is the tent of meeting.", "It is the place connected with Israel gathering before the LORD."];
    if (lower === "before the lord") return ["Before the LORD means in God's presence.", "The lamp burns as service offered toward Him."];
    if (lower.includes("aaron and his sons")) return ["Aaron and his sons are the priests appointed to serve.", "They are responsible to tend the lamp before the LORD."];
    if (lower.includes("evening to morning")) return ["From evening to morning means the lamp is tended through the night.", "The light is not occasional; it is maintained steadily."];
    if (lower.includes("statute for ever")) return ["A statute for ever means an ongoing command for Israel.", "The lamp service is meant to continue through their generations."];
    if (lower.includes("aaron thy brother")) return ["Aaron is Moses' brother, chosen for priestly service.", "God appoints the priesthood instead of leaving it open to anyone."];
    if (lower.includes("minister unto me")) return ["Minister unto me means serve the LORD as priest.", "Aaron's work is directed toward God, not personal status."];
    if (lower.includes("priest's office")) return ["The priest's office is the appointed role of serving before the LORD.", "Priestly work is a holy calling with boundaries."];
    if (lower.includes("holy garments")) return ["Holy garments are clothing set apart for priestly service.", "Aaron does not approach the LORD in ordinary dress."];
    if (lower.includes("glory and for beauty")) return ["For glory and for beauty means the garments display honor and beauty.", "The priest's clothing teaches the weight of holy service."];
    if (lower.includes("spirit of wisdom")) return ["The Spirit of wisdom gives skill for making the garments.", "Holy craftsmanship depends on wisdom God provides."];
    if (lower.includes("two shoulderpieces")) return ["Two shoulderpieces are parts of the ephod joined together.", "The garment is built to carry symbolic weight before God."];
    if (lower.includes("grave on them the names")) return ["Grave means engrave the names into the stones.", "Israel's names are permanently marked on the priestly garment."];
    if (lower.includes("six of their names")) return ["Six names on one stone means half the tribes are carried on one shoulder stone.", "The other six are carried on the other stone."];
    if (lower.includes("stones of memorial")) return ["Stones of memorial are stones that keep Israel's names before the LORD.", "The priest carries the people in remembered form."];
    if (lower.includes("bear their names")) return ["Aaron bearing their names means he carries Israel before the LORD.", "The priest represents the people as he serves."];
    if (lower.includes("ouches of gold")) return ["Ouches of gold are gold settings for the stones.", "The names of Israel are held in precious settings."];
    if (lower.includes("chains of pure gold")) return ["Chains of pure gold connect parts of the priestly garment.", "The breastplate is secured with valuable, holy materials."];
    if (lower.includes("at the ends")) return ["At the ends names where the gold chains are attached.", "The detail shows how carefully the garment is assembled."];
    if (lower.includes("wreathen work")) return ["Wreathen work means braided or twisted craftsmanship.", "The priestly garment is made with skilled beauty."];
    if (lower.includes("fasten the wreathen chains")) return ["The wreathen chains are fastened to hold the breastplate in place.", "The priestly garment is joined carefully for holy service."];
    if (lower.includes("cunning work")) return ["Cunning work means skillful craftsmanship.", "The breastplate is made with wisdom and care."];
    if (lower.includes("foursquare")) return ["Foursquare means the breastplate is square.", "Its shape is specified as part of God's design."];
    if (lower.includes("span shall be the length")) return ["A span is a hand-width measurement.", "The breastplate has exact dimensions."];
    if (lower.includes("four rows of stones")) return ["Four rows of stones hold the tribal stones on the breastplate.", "The people of Israel are represented in ordered beauty."];
    if (lower.includes("sardius") || lower.includes("topaz") || lower.includes("carbuncle")) return ["These are precious stones in the breastplate.", "The named stones show beauty and value in representing Israel before God."];
    if (lower.includes("according to the names of the children of israel")) return ["The stones correspond to the names of Israel's tribes.", "The breastplate is not decoration only; it carries the people before God."];
    if (lower.includes("twelve, according to their names")) return ["Twelve stones correspond to the twelve tribes.", "Every tribe is remembered in the priest's service."];
    if (lower.includes("every one with his name")) return ["Each stone carries a name.", "No tribe is swallowed into a vague crowd before the LORD."];
    if (lower.includes("engravings of a signet")) return ["A signet engraving is a carved mark like a seal.", "The names are fixed into the stones with permanence."];
    if (lower.includes("chains at the ends")) return ["Chains at the ends help attach the breastplate.", "The garment is secured with ordered craftsmanship."];
    if (lower.includes("two rings of gold")) return ["Two gold rings help fasten the breastplate.", "Small gold connectors hold the priestly garment together."];
    if (lower.includes("upon his heart")) return ["Upon his heart means Aaron carries Israel close to his chest.", "The priest represents the people before the LORD with care."];
    if (lower.includes("holy place")) return ["The holy place is the sacred room where the priest serves.", "Aaron enters as a representative, not as a private person."];
    if (lower.includes("judgment of the children of israel")) return ["The judgment of Israel is carried on the breastplate.", "The priest brings the people's case before the LORD."];
    if (lower.includes("all of blue")) return ["All of blue describes the robe's color.", "The priestly garment is marked by a distinct holy appearance."];
    if (lower.includes("habergeon")) return ["A habergeon was a kind of protective garment opening.", "The robe opening is reinforced so it will not tear."];
    if (lower.includes("pomegranates")) return ["Pomegranates are decorative fruit shapes on the robe.", "The garment uses beauty and symbolism in holy service."];
    if (lower.includes("golden bell")) return ["Golden bells are placed around the robe's hem.", "The priest's movement in holy service is heard."];
    if (lower.includes("sound shall be heard")) return ["The sound of the bells marks Aaron's service as he enters.", "The priest does not move casually before the holy LORD."];
    if (lower.includes("blue lace")) return ["Blue lace fastens the holy plate to the priestly headpiece.", "The visible sign of holiness is attached by God's command."];
    if (lower.includes("bear the iniquity")) return ["Aaron bearing iniquity means he carries guilt connected with Israel's holy gifts.", "The priest's role includes representing a sinful people before the LORD."];
  }

  if (lower.includes("judgments")) return ["Judgments are case laws for real situations.", "After the Ten Commandments, the LORD shows how justice should work in daily life."];
  if (lower.includes("six years")) return ["Six years sets a limit on Israelite service.", "The servant is not meant to be trapped under another Israelite forever."];
  if (lower.includes("in the seventh")) return ["The seventh year brings release from service.", "Freedom is built into the law as a command, not a favor."];
  if (lower.includes("i love my master")) return ["The servant may choose to stay because of love and household attachment.", "The law describes a voluntary decision, not forced slavery."];
  if (lower.includes("serve him for ever")) return ["Serve him for ever means the servant chooses lifelong service in that household.", "The public act shows the choice is serious and visible."];
  if (lower.includes("hebrew servant")) return ["A Hebrew servant was an Israelite bound to service for a limited time.", "The law places boundaries around service so Israel does not copy Egypt's crushing slavery."];
  if (lower.includes("maidservant")) return ["A maidservant was a female servant in a vulnerable household situation.", "The law names protections so she is not used and discarded by someone with more power."];
  if (lower.includes("menservants")) return ["This woman is not released by the same rule as the male servant.", "Her case involves household and marriage obligations, so the law gives different protections."];
  if (lower.includes("redeemed")) return ["Redeemed means bought back or released through an allowed payment.", "The law gives a vulnerable person a path out instead of trapping her without protection."];
  if (lower.includes("manner of daughters")) return ["After the manner of daughters means she must be treated with daughter-like household protection.", "The man may not treat her as disposable property."];
  if (lower.includes("raiment")) return ["Raiment means clothing.", "Food, clothing, and marriage duty are named because the woman must not be neglected."];
  if (lower.includes("without money")) return ["Without money means she leaves without having to pay for her freedom.", "If her basic rights are denied, the law releases her from that household."];
  if (lower.includes("smiteth")) return ["Smiteth means strikes.", "The law treats violent harm as serious because life and family order matter before God."];
  if (lower.includes("deliver him into his hand")) return ["This phrase describes a death that was not planned by the killer.", "The law leaves room to distinguish accident from deliberate murder."];
  if (lower.includes("appoint thee a place")) return ["God appoints a place of refuge for the person who killed unintentionally.", "Justice must protect the innocent from revenge while still taking death seriously."];
  if (lower.includes("presumptuously")) return ["Presumptuously means deliberately and arrogantly.", "The law distinguishes planned violence from accidental death."];
  if (lower.includes("stealeth a man")) return ["Stealeth a man means kidnapping a person.", "God's law treats stealing people as a grave attack on human dignity."];
  if (lower.includes("curseth")) return ["Curseth means speaks a curse against someone.", "Dishonoring father or mother is treated as serious rebellion inside covenant family life."];
  if (lower.includes("strive together")) return ["Strive together means fight or struggle with each other.", "The law does not ignore injuries that happen during conflict."];
  if (lower.includes("loss of his time")) return ["Loss of his time means lost work and livelihood during recovery.", "The person who caused the injury must take responsibility for the damage done."];
  if (lower.includes("thoroughly healed")) return ["Thoroughly healed means fully cared for through recovery.", "Justice includes restoration, not only punishment."];
  if (lower.includes("smite his servant")) return ["This case deals with a master striking a servant.", "The law brings even household power under judgment."];
  if (lower.includes("for he is his money")) return ["This hard phrase reflects the servant's legal place in an ancient household economy.", "The law is weighing loss and accountability inside that world, not saying the servant has no value before God."];
  if (lower.includes("hurt a woman with child")) return ["This case involves a pregnant woman harmed during a fight.", "The law treats harm to mother and child as serious, not accidental background damage."];
  if (lower.includes("life for life")) return ["Life for life means the penalty must match the seriousness of the harm.", "The law refuses to treat a life as a small loss."];
  if (lower.includes("eye for eye")) return ["Eye for eye limits punishment to fit the injury.", "The point is measured justice, not unlimited revenge."];
  if (lower.includes("tooth for tooth")) return ["Tooth for tooth continues the rule of proportion.", "The law restrains retaliation so anger does not grow beyond the harm."];
  if (lower.includes("hand for hand")) return ["Hand for hand continues the rule of measured justice.", "The response must fit the injury instead of becoming revenge."];
  if (lower.includes("foot for foot")) return ["Foot for foot continues the same limit on punishment.", "God's law restrains retaliation by tying judgment to the actual harm."];
  if (lower.includes("go free")) return ["Go free means release from service.", "When a servant is seriously injured, freedom becomes part of justice."];
  if (lower.includes("ox")) return ["An ox was a powerful work animal that could injure or kill.", "The law makes owners responsible when dangerous animals are not restrained."];
  if (lower.includes("gore")) return ["Gore means strike or pierce with horns.", "The danger is physical and serious, so the law weighs both the animal and the owner's responsibility."];
  if (lower.includes("pit")) return ["A pit was an open hole that could trap or kill an animal.", "Leaving danger uncovered makes a person responsible for preventable harm."];
  if (lower.includes("ransom")) return ["Ransom means a payment connected with sparing life.", "The law gives a concrete cost where negligence has brought deadly guilt."];
  if (lower.includes("owner also")) return ["The owner can share guilt when he ignored a known dangerous animal.", "Responsibility increases when warning has already been given."];
  if (lower.includes("sum of money")) return ["A sum of money means a required payment set in response to guilt.", "The law turns responsibility into a concrete cost."];
  if (lower.includes("if it be known")) return ["If it be known means the owner already knew the danger.", "Known danger creates responsibility for what happens next."];
  if (lower.includes("in time past")) return ["In time past means the danger had shown itself before.", "The owner cannot pretend the harm came with no warning."];
  if (lower.includes("not kept him in")) return ["The owner failed to restrain a dangerous animal.", "Neglect becomes guilt when a known danger is left loose."];
  if (lower.includes("dead shall be his own")) return ["The dead animal becomes the owner's loss after repayment.", "The law assigns both compensation and final responsibility."];
  if (lower.includes("restitution") || lower.includes("restore")) return ["Restitution means repairing or paying back what was taken or damaged.", "God's justice pushes wrongdoers toward repair, not only punishment."];
  if (lower.includes("breaking up")) return ["Breaking up means breaking into a house.", "The law distinguishes a night intrusion from other property situations."];
  if (lower.includes("no blood be shed")) return ["No blood be shed means the thief's death is not treated as justified in that case.", "The law weighs the situation instead of giving one careless answer for every theft."];
  if (lower.includes("best of his own field")) return ["The best of his own field means repayment must come from good produce, not leftovers.", "The person who caused loss must repair it fairly."];
  if (lower.includes("fire break out")) return ["Fire breaking out means a person's fire spreads and damages another field.", "The law makes people responsible for harm that spreads from their actions."];
  if (lower.includes("stuff")) return ["Stuff means belongings or property.", "The law protects neighbor trust when someone keeps another person's goods."];
  if (lower.includes("master of the house")) return ["The master of the house is brought before the judges when entrusted goods are missing.", "The law does not let hidden loss be handled by suspicion alone."];
  if (lower.includes("judges shall condemn")) return ["The judges decide guilt in the dispute.", "Restitution follows a judged case, not private revenge."];
  if (lower.includes("oath of the lord")) return ["An oath of the LORD is a solemn promise made before God.", "When no human witness can settle the matter, the dispute is still treated as happening before the LORD."];
  if (lower.includes("torn in pieces")) return ["Torn in pieces means an animal was killed by another beast.", "Evidence must be brought so the keeper is not blamed unfairly."];
  if (lower.includes("bring it for witness")) return ["The remains are brought as witness to what happened.", "The law uses evidence instead of guessing guilt."];
  if (lower.includes("not make good")) return ["Not make good means repayment is not required in that case.", "The law notices when loss was not caused by the keeper's fault."];
  if (lower.includes("borrow ought")) return ["Borrow ought means borrow something from a neighbor.", "Using another person's property brings responsibility."];
  if (lower.includes("surely make it good")) return ["Surely make it good means the borrower must repay the loss.", "Borrowing is not casual when another person's goods are damaged."];
  if (lower.includes("owner thereof be with it")) return ["If the owner is present, responsibility is judged differently.", "The law pays attention to who had control when the loss happened."];
  if (lower.includes("entice a maid")) return ["Entice a maid means seduce an unmarried young woman.", "The law refuses to treat sexual harm as casual or consequence-free."];
  if (lower.includes("endow")) return ["Endow means provide the required marriage payment.", "The man must take covenant responsibility instead of using the woman and walking away."];
  if (lower.includes("witch")) return ["A witch here refers to forbidden occult practice.", "Israel must not seek spiritual power apart from the LORD."];
  if (lower.includes("lieth with a beast")) return ["This command forbids sexual union with an animal.", "Israel's holiness includes rejecting practices that corrupt God's design for the body."];
  if (lower.includes("sacrificeth unto any god")) return ["Sacrificing to any god means offering worship to a false god.", "Covenant worship belongs to the LORD alone."];
  if (lower.includes("vex")) return ["Vex means mistreat, oppress, or trouble someone.", "Israel must not treat foreigners the way Egypt treated them."];
  if (lower.includes("strangers in the land")) return ["Israel knew what it felt like to live as strangers in Egypt.", "Their own pain must teach them mercy toward foreigners."];
  if (lower.includes("widow") || lower.includes("fatherless")) return ["Widows and fatherless children were people with less protection in ancient society.", "The LORD warns Israel not to exploit those who can easily be harmed."];
  if (lower.includes("afflict them")) return ["Afflict means mistreat or oppress.", "God warns Israel not to harm widows or fatherless children in any way."];
  if (lower.includes("hear their cry")) return ["God promises to hear the cry of the vulnerable.", "People with little earthly protection are not invisible to Him."];
  if (lower.includes("wrath shall wax hot")) return ["God's wrath growing hot means His judgment is stirred against oppression.", "Mistreating the vulnerable is not a small matter to the LORD."];
  if (lower.includes("usurer")) return ["Usury means interest charged in a way that exploits need.", "The law protects the poor from being crushed by someone else's gain."];
  if (lower.includes("pledge")) return ["A pledge was something held as security for a debt.", "Even debt situations must be handled with mercy toward the poor."];
  if (lower.includes("i will hear; for i am gracious")) return ["God says He will hear because He is gracious.", "His mercy stands behind the command to return the poor person's cloak."];
  if (lower.includes("revile the gods")) return ["Revile means speak with contempt.", "The command warns Israel not to speak recklessly toward authority."];
  if (lower.includes("curse the ruler")) return ["Cursing the ruler means speaking evil against the leader of the people.", "Covenant life puts a boundary around rebellious speech."];
  if (lower.includes("delay to offer")) return ["Not delaying means Israel must not hold back what belongs to the LORD.", "Worship should not be pushed aside after provision comes."];
  if (lower.includes("firstborn of thy sons")) return ["The firstborn sons belong to the LORD in a special way.", "Israel must remember that God spared their firstborn in the Exodus."];
  if (lower.includes("holy men")) return ["Holy men means people set apart for the LORD.", "Israel's daily life must match the God who rescued them."];
  if (lower.includes("flesh that is torn")) return ["Torn flesh means meat from an animal killed by beasts.", "Israel's food practices were also shaped by holiness."];
  if (lower.includes("follow a multitude")) return ["Following a multitude means joining the crowd.", "God's people must not do evil just because many people are doing it."];
  if (lower.includes("countenance a poor man")) return ["Countenance means show favoritism.", "The poor must receive justice, but judges must not twist truth even for sympathy."];
  if (lower.includes("far from a false matter")) return ["Keeping far from a false matter means avoiding lies before they shape judgment.", "Truth must be protected before a case becomes corrupt."];
  if (lower.includes("innocent and righteous")) return ["The innocent and righteous must not be condemned or killed.", "God's justice protects the person who has not done wrong."];
  if (lower.includes("justify the wicked")) return ["God will not justify the wicked means He will not call evil innocent.", "Human judges must not reverse good and evil."];
  if (lower.includes("gift blindeth")) return ["A gift here means a bribe.", "Bribes blind judgment by making the judge favor the giver instead of the truth."];
  if (lower.includes("take no gift")) return ["Taking a gift means accepting a bribe in judgment.", "A judge must not let money bend the truth."];
  if (lower.includes("oppress a stranger")) return ["Oppressing a stranger means mistreating a foreigner living among the people.", "Israel must remember Egypt and refuse to repeat its cruelty."];
  if (lower.includes("heart of a stranger")) return ["Knowing the heart of a stranger means Israel understands that pain from experience.", "Their memory of Egypt must become compassion."];
  if (lower.includes("false report")) return ["A false report is a lie that damages justice.", "God's people must not use words to twist court, reputation, or community judgment."];
  if (lower.includes("wrest the judgment")) return ["Wrest the judgment means twist justice away from what is right.", "The poor must not be denied justice, and the law must not bend for pressure."];
  if (lower.includes("six years thou shalt sow")) return ["Six years of sowing names the ordinary work cycle for the land.", "Israel may work the land, but they do not own time as if God is absent."];
  if (lower.includes("seventh year")) return ["The seventh year was a rest year for the land.", "Israel had to trust the LORD enough to let fields rest and let the poor eat."];
  if (lower.includes("six days thou shalt do")) return ["Six days are given for ordinary work.", "The command honors work while setting a boundary around it."];
  if (lower.includes("seventh day")) return ["The seventh day is the Sabbath day of rest.", "The rhythm of rest reaches workers, animals, and strangers, not only household leaders."];
  if (lower.includes("other gods")) return ["Israel must not even keep the names of other gods alive in worship.", "The LORD is guarding His people from divided loyalty."];
  if (lower.includes("three times thou shalt keep")) return ["Three times means Israel's year has appointed feast moments.", "The people must regularly gather to remember and worship."];
  if (lower.includes("unleavened bread")) return ["Unleavened bread is bread made without leaven, so it does not rise.", "The feast keeps Israel remembering the hurried rescue from Egypt."];
  if (lower.includes("feast of harvest")) return ["The Feast of Harvest celebrates the first results of the field.", "Israel's harvest becomes thanksgiving before the LORD."];
  if (lower.includes("feast of ingathering")) return ["The Feast of Ingathering comes when the harvest is gathered in.", "The end of the agricultural year becomes worship and gratitude."];
  if (lower.includes("three times in the year")) return ["Three times in the year means regular appointed worship before the LORD.", "Israel's calendar is shaped around God's presence and provision."];
  if (lower.includes("blood of my sacrifice")) return ["The blood of the sacrifice must not be offered with leavened bread.", "God sets boundaries around how worship is brought to Him."];
  if (lower.includes("firstfruits")) return ["Firstfruits means the first part of the harvest brought to the LORD.", "Israel gives the first produce as worship because the land's increase comes from God."];
  if (lower.includes("kid in his mother's milk")) return ["A kid is a young goat.", "The command sets a boundary around Israel's food and worship practices so they do not imitate surrounding customs."];
  if (lower.includes("angel")) return ["The angel is the LORD's appointed messenger leading Israel toward the land.", "Guidance is tied to obedience, because God's name and authority are with him."];
  if (lower.includes("keep thee in the way")) return ["To keep thee in the way means to guard Israel on the road ahead.", "The LORD is not leaving His people to find the land alone."];
  if (lower.includes("obey his voice")) return ["Obey his voice means Israel must listen to the messenger God sends.", "Guidance is a gift, but it must be received with obedience."];
  if (lower.includes("my name is in him")) return ["God's name being in him means the messenger carries the LORD's authority.", "Israel must treat the message as God's command, not ordinary advice."];
  if (lower.includes("bow down to their gods")) return ["Bowing down to their gods means joining the worship of the nations.", "The land must not pull Israel away from the LORD."];
  if (lower.includes("serve the lord your god")) return ["Serving the LORD means worshiping and obeying Him alone.", "Israel's life in the land must be centered on the God who brought them there."];
  if (lower.includes("nor be barren")) return ["Nor be barren means God promises fruitfulness among the people and animals.", "The blessing of the land is tied to the LORD's care."];
  if (lower.includes("send my fear")) return ["God sending His fear means He will make the nations afraid before Israel.", "The battle for the land depends on the LORD going ahead of them."];
  if (lower.includes("hornets")) return ["Hornets are stinging insects used here as an image of God driving enemies out.", "The LORD promises to go before Israel in ways they cannot control."];
  if (lower.includes("not drive them out") || lower.includes("one year")) return ["God will not drive out the nations all at once.", "Slow victory protects Israel from a land becoming empty and dangerous."];
  if (lower.includes("little and little")) return ["Little and little means gradually.", "God will give the land over time because immediate victory could create new dangers."];
  if (lower.includes("set thy bounds")) return ["God setting bounds means He marks the borders of Israel's land.", "The promise has real shape, not vague hope."];
  if (lower.includes("make no covenant")) return ["Making no covenant means Israel must not make binding peace with the false-worshiping nations.", "The danger is spiritual compromise, not only politics."];
  if (lower.includes("nor with their gods")) return ["Nor with their gods means Israel must reject the gods behind those nations' worship.", "The LORD will not share covenant loyalty with idols."];
  if (lower.includes("dwell in thy land")) return ["They shall not dwell in thy land means the nations must not remain as a spiritual trap.", "The land is meant for covenant faithfulness."];
  if (lower.includes("make thee sin")) return ["Make thee sin means draw Israel into rebellion against the LORD.", "Wrong worship can spread through close partnership."];
  if (lower.includes("serve their gods")) return ["Serving their gods means adopting idol worship.", "The LORD warns that false worship will trap Israel."];
  if (lower.includes("snare")) return ["A snare is a trap.", "False worship can trap Israel by slowly pulling the heart away from the LORD."];
  if (lower.includes("come up unto the lord")) return ["Come up unto the LORD means approach the mountain by God's invitation.", "No one comes near Sinai unless the LORD calls them."];
  if (lower.includes("worship ye afar")) return ["Worship afar off means the leaders worship from a distance.", "God allows approach, but His holiness still sets boundaries."];
  if (lower.includes("moses alone")) return ["Moses alone coming near means he has a unique mediator role.", "The people and leaders cannot approach God the same way Moses does."];
  if (lower.includes("all the words of the lord")) return ["All the words of the LORD means the covenant commands are spoken to the people.", "Israel hears God's actual instruction before answering."];
  if (lower.includes("answered with one voice")) return ["The people answer with one voice as a united response.", "They promise together to obey the LORD's covenant words."];
  if (lower.includes("wrote all the words")) return ["Moses writes the LORD's words down.", "The covenant is not left as a vague memory or private feeling."];
  if (lower.includes("builded an altar")) return ["Moses builds an altar at the foot of the mountain.", "Worship and sacrifice stand at the center of the covenant ceremony."];
  if (lower.includes("twelve pillars")) return ["The twelve pillars represent the twelve tribes of Israel.", "The whole nation is included in the covenant scene."];
  if (lower.includes("book of the covenant")) return ["The book of the covenant is the written record of the LORD's covenant words.", "Israel hears actual commands before promising obedience."];
  if (lower.includes("will we do")) return ["The people promise to do all the LORD has said.", "Their answer accepts covenant responsibility."];
  if (lower.includes("moses took the blood")) return ["Moses takes the sacrificial blood for the covenant ceremony.", "The covenant is not sealed by words alone."];
  if (lower.includes("blood of the covenant")) return ["Blood of the covenant means sacrificial blood marking the covenant relationship.", "The ceremony shows that life with the holy LORD is serious and costly."];
  if (lower.includes("sprinkled")) return ["Sprinkled means the blood was applied to the people.", "The covenant is not only placed on the altar; the people themselves are marked as included."];
  if (lower.includes("concerning all these words")) return ["All these words are the covenant instructions the people have heard.", "The blood is tied to the LORD's spoken commands, not a vague ritual."];
  if (lower.includes("nadab") || lower.includes("abihu")) return ["Moses, Aaron, Nadab, and Abihu are named among those invited up.", "The covenant scene includes appointed leaders, not the whole camp rushing in."];
  if (lower.includes("seventy of the elders")) return ["Seventy elders represent Israel's leadership before the LORD.", "The covenant meal includes leaders from the people God rescued."];
  if (lower.includes("saw the god of israel")) return ["They saw the God of Israel in a limited, protected way.", "The scene shows astonishing nearness without making God casual."];
  if (lower.includes("sapphire")) return ["Sapphire is a precious blue stone.", "The pavement image gives a glimpse of royal beauty beneath the LORD's revealed presence."];
  if (lower.includes("laid not his hand")) return ["God did not lay His hand on the leaders means He did not strike them down.", "They are allowed to behold and eat by mercy, not by entitlement."];
  if (lower.includes("eat and drink")) return ["They eat and drink in God's presence as part of the covenant scene.", "The meal shows fellowship, but still under holy mercy."];
  if (lower.includes("come up to me into the mount")) return ["God calls Moses up into the mountain.", "Moses goes higher to receive the tablets and instruction from the LORD."];
  if (lower.includes("went up into the mount")) return ["Moses goes up into the mountain of God.", "He leaves the people below because he is receiving God's instruction for them."];
  if (lower.includes("cloud covered")) return ["The cloud covers the mountain as a sign of God's presence.", "The glory is near, but still hidden and holy."];
  if (lower.includes("glory of the lord abode")) return ["The glory of the LORD abode means God's visible presence rested there.", "Sinai becomes the place where God's holiness settles before Israel."];
  if (lower.includes("devouring fire")) return ["A devouring fire is a frightening picture of God's glory.", "The people see that His presence is powerful and holy."];
  if (lower.includes("forty days")) return ["Forty days and forty nights shows Moses remains on the mountain for a long appointed time.", "Receiving God's instruction is not rushed."];
  if (lower.includes("hewed tables")) return ["Hewed tables means cut stone tablets.", "Moses receives covenant words from the LORD, not ideas invented by Israel."];
  if (lower.includes("shittim")) return ["Shittim wood was the durable acacia-like wood used for tabernacle furniture and frames.", "The material is named because holy worship is built from specific things God commanded."];
  if (lower.includes("cubit")) return ["A cubit was an ancient length measurement based roughly on the forearm.", "The measurement shows that the tabernacle was a real structure built to God's pattern."];
  if (lower.includes("staves")) return ["Staves were poles used to carry holy furniture.", "The furniture had to be movable because God's dwelling traveled with Israel."];
  if (lower.includes("ark")) return ["The ark was the sacred chest connected with God's covenant testimony.", "It stood at the center of the tabernacle's holiest space."];
  if (lower.includes("mercy seat")) return ["The mercy seat was the cover of the ark and the place connected with atonement.", "It joins God's holy presence with the mercy His people need."];
  if (lower.includes("cherub")) return ["Cherubims were heavenly guardian figures connected with God's holy presence.", "Their placement over the mercy seat teaches reverence around the throne-like center of the tabernacle."];
  if (lower.includes("shewbread")) return ["Shewbread was bread set before the LORD in the holy place.", "The bread was a continual sign of Israel living before God's presence."];
  if (lower.includes("candlestick") || lower.includes("lamp")) return ["The candlestick was the lampstand that gave light in the holy place.", "Its ordered light belonged to worship before the LORD."];
  if (lower.includes("knops")) return ["Knops were rounded decorative buds on the lampstand.", "The detail shows beauty and careful design inside holy worship."];
  if (lower.includes("tongs") || lower.includes("snuffdishes")) return ["Tongs and snuffdishes were tools for tending the lamps.", "Even the care of the light had ordered tools in God's design."];
  if (lower.includes("curtain")) return ["Curtains formed the fabric walls and layers of the tabernacle.", "The tent where God would dwell was made with ordered beauty and careful joining."];
  if (lower.includes("goats' hair")) return ["Goats' hair was used for a protective tent covering.", "The outer layers made the tabernacle durable as well as beautiful."];
  if (lower.includes("badgers")) return ["Badgers' skins were outer covering material for the tent.", "The phrase points to protection over the holy dwelling."];
  if (lower.includes("taches")) return ["Taches were clasps that fastened tabernacle curtains together.", "Small connectors mattered because the separate pieces had to become one tent."];
  if (lower.includes("vail") || lower.includes("veil")) return ["The vail was the curtain separating the holy place from the most holy place.", "It taught that God's presence is near, but access is still guarded by holiness."];
  if (lower.includes("ephod")) return ["The ephod was a special priestly garment.", "Aaron wore it while representing Israel before the LORD."];
  if (lower.includes("breastplate")) return ["The breastplate was a priestly piece worn over the chest.", "It carried Israel's names before the LORD as Aaron served."];
  if (lower.includes("onyx")) return ["Onyx stones were precious stones used in the priestly garments.", "They carried names and memory before the LORD."];
  if (lower.includes("mitre")) return ["The mitre was the priestly headpiece.", "It marked Aaron's service as holy before the LORD."];
  if (lower.includes("curious girdle")) return ["Curious girdle means a skillfully woven sash.", "The priestly clothing was carefully made for holy service, not ordinary dressing."];
  if (lower.includes("urim") || lower.includes("thummim")) return ["Urim and Thummim were sacred objects connected with priestly judgment.", "They show that Israel needed the LORD's direction, not guesswork."];
  if (lower.includes("holiness to the lord")) return ["Holiness to the LORD means set apart for God's own service.", "The priest's forehead plate made his holy role visible."];
  if (lower.includes("bullock")) return ["A bullock was a young bull used for sacrifice.", "The animal is named because priestly service begins with sin being dealt with before God."];
  if (lower.includes("ram")) return ["A ram was a male sheep used in sacrifice.", "The consecration ceremony uses rams to set the priests apart for holy service."];
  if (lower.includes("without blemish")) return ["Without blemish means without defect.", "The offering must be whole because worship before the LORD is not casual or careless."];
  if (lower.includes("hallow") || lower.includes("consecrate")) return ["Hallow and consecrate mean set apart as holy.", "Aaron and his sons cannot serve as priests until the LORD sets them apart His way."];
  if (lower.includes("anoint")) return ["Anoint means pour or apply holy oil to mark someone or something for God's service.", "The oil marks priestly service as belonging to the LORD."];
  if (lower.includes("wave offering")) return ["A wave offering was lifted or moved before the LORD as part of worship.", "The action presents the offering to God rather than treating it as ordinary food."];
  if (lower.includes("heave offering")) return ["A heave offering was a contribution lifted up or set apart for the LORD.", "It marked part of the sacrifice as belonging to holy service."];
  if (lower.includes("atonement")) return ["Atonement means covering or dealing with sin before God.", "The priests and altar need cleansing because the holy LORD will meet sinful people there."];
  if (lower.includes("continual")) return ["Continual means ongoing or regular.", "Israel's worship is not a one-time event but a daily pattern before the LORD."];
  if (lower.includes("hin")) return ["A hin was an ancient liquid measure.", "The exact measure shows that offerings were given according to God's command, not guesswork."];
  if (lower.includes("laver")) return ["A laver was a basin for washing.", "Priests had to wash before coming near the altar or entering the tent."];
  if (lower.includes("incense")) return ["Incense was fragrant material burned before the LORD.", "Its smoke marked holy worship near the veil, not ordinary perfume."];
  if (lower.includes("apothecary")) return ["An apothecary was a skilled maker of sacred mixtures like oil or incense.", "The holy mixture required skill and obedience to God's recipe."];
  if (lower.includes("shekel")) return ["A shekel was a weight of silver used for payment.", "The amount makes responsibility concrete instead of vague."];

  const focus = section.chapter <= 24 ? "covenant law" : section.chapter <= 28 ? "tabernacle worship" : "priestly consecration";
  return [`This line is naming ${title.toLowerCase()} as one concrete part of ${focus}.`, `${section.title} teaches ${focus} through real words, objects, actions, and responsibilities.`];
}

function formatRenderedDays27To29Lines(section: PersonalExodusPhraseSectionInput, cleanTitle: string, lines: string[]) {
  if (section.chapter < 21 || section.chapter > 30) return lines;

  if (section.chapter >= 21 && section.chapter <= 24) {
    const rawOpening = getDays27To29SpecificOpening(section, cleanTitle);
    return [
      rawOpening[0],
      rawOpening[1],
      ...getDay27ShortTeachingBullets(section, cleanTitle),
      getDay27ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  if (section.chapter >= 25 && section.chapter <= 28) {
    const rawOpening = getDays27To29SpecificOpening(section, cleanTitle);
    return [
      rawOpening[0],
      rawOpening[1],
      ...getDay28ShortTeachingBullets(section, cleanTitle),
      getDay28ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  if (section.chapter >= 29 && section.chapter <= 30) {
    const rawOpening = getDays27To29SpecificOpening(section, cleanTitle);
    return [
      rawOpening[0],
      rawOpening[1],
      ...getDay29ShortTeachingBullets(section, cleanTitle),
      getDay29ShortClosing(section, cleanTitle),
    ].filter(Boolean).slice(0, 7);
  }

  const isEmojiLine = (line: string) => /^[^A-Za-z0-9'"(]/.test(line.trim());
  const cleaned = removeExodusTwentyOneToThirtyRepeatedPhraseTitle(cleanTitle, lines)
    .map((line) => line.trim())
    .filter(Boolean);
  const proseLines = cleaned.filter((line) => !isEmojiLine(line) && !isDays27To29FillerLine(line));
  const rawOpening = getDays27To29SpecificOpening(section, cleanTitle);
  const opening = [
    makeDays27To29OpeningLineUnique(rawOpening[0], cleanTitle, section),
    rawOpening[1],
  ];
  const closing = proseLines.slice(opening.length);

  return [
    ...opening,
    ...getDays27To29TeachingBullets(section, cleanTitle),
    ...closing,
  ].slice(0, 8);
}

function normalizeRepeatedExodusTwentyOneToThirtyLines(sections: PersonalExodusPhraseSectionInput[]) {
  const counts = new Map<string, number>();
  const normalizeLine = (line: string) => line.toLowerCase().replace(/[.?!]+$/, "").trim();

  for (const section of sections) {
    if (section.chapter < 21 || section.chapter > 30) continue;
    for (const [, content] of section.phrases) {
      for (const line of content.split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
        const key = normalizeLine(line);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return sections.map((section) => {
    if (section.chapter < 21 || section.chapter > 30) return section;

    return {
      ...section,
      phrases: section.phrases.map(([title, content]) => {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        const kept: string[] = [];

        for (const line of formatExodusTwentyOneToThirtyPhraseExplanation(section, content).split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
          const key = normalizeLine(line);
          const isRepeated = (counts.get(key) ?? 0) >= 3;
          const isTitleLine = line.toLowerCase().includes(cleanTitle.toLowerCase());
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          if (isRepeated && !isTitleLine && !isEmojiLine) continue;
          kept.push(line);
        }

        const hasList = kept.filter((line) => /^[^A-Za-z0-9'"(]/.test(line)).length >= 2;
        if (!hasList) {
          kept.splice(Math.min(2, kept.length), 0, ...getExodusTwentyOneToThirtyPhraseList(section, cleanTitle));
        }

        if (section.chapter >= 25 && kept.length >= 7) {
          return [ensureExodusTwentyOneToThirtyTitleEmoji(title), note(formatRenderedDays27To29Lines(section, cleanTitle, kept))] as [string, string];
        }

        for (const line of getExodusTwentyOneToThirtyTeachingLines(section, cleanTitle)) {
          if (kept.length >= 7) break;
          if (!kept.some((keptLine) => normalizeLine(keptLine) === normalizeLine(line))) {
            kept.push(line);
          }
        }

        while (kept.length < (section.chapter >= 25 ? 6 : 4)) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `${cleanTitle} names something God included in this scene.`,
            `${cleanTitle} should be understood before the reader moves on.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        return [ensureExodusTwentyOneToThirtyTitleEmoji(title), note(formatRenderedDays27To29Lines(section, cleanTitle, kept))] as [string, string];
      }),
    };
  });
}

function formatExodusTwentyOneToThirtySectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return normalizeRepeatedExodusTwentyOneToThirtyLines(sections.map((section) => ({
    ...section,
    icon: getExodusTwentyOneToThirtySectionIcon(section),
    phrases: section.phrases.map(([title, content]) => [
      title,
      formatExodusTwentyOneToThirtyPhraseExplanation(section, content),
    ] as [string, string]),
  })));
}

export const EXODUS_21_30_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusTwentyOneToThirtySectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS, [21, 22, 23, 24], "⚖️").map(deepenDay27PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS, [25, 26, 27, 28], "⛺").map(deepenDay28PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS, [29, 30], "🕯️").map(deepenDay29Exodus29To30PhraseCards).map(deepenDay29Exodus29To30Mining),
  ...RAW_EXODUS_21_30_PERSONAL_SECTIONS.filter((section) => section.chapter < 21 || section.chapter > 30),
]);
