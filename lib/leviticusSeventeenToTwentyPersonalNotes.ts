import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

const note = (lines: string[]) => lines.join("\n\n");
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

const card = (
  title: string,
  opening: string,
  bullets: string[],
  closing: string,
): [string, string] =>
  phrase(title, [
    opening,
    ...bullets,
    closing,
  ]);

function stripDay36Title(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function formatDay36MeaningFirstLines(title: string, lines: string[]) {
  const cleanTitle = stripDay36Title(title);
  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleStartPattern = new RegExp(`^${escapedTitle}\\s+(means|shows|gives|helps|explains|teaches|marks|names|is|are|was|were|connects|keeps|points to|prepares|refers to|describes)\\s+`, "i");
  const isEmojiLine = (line: string) => /^[^A-Za-z0-9'"(]/.test(line.trim());
  const cleanLine = (line: string) => {
    let cleaned = line.trim();
    cleaned = cleaned.replace(titleStartPattern, (_match, verb: string) => {
      const action = verb.toLowerCase();
      if (action === "means" || action === "refers to") return "";
      if (action === "is") return "This is ";
      if (action === "are") return "These are ";
      if (action === "was") return "This was ";
      if (action === "were") return "These were ";
      return `This ${action} `;
    });
    cleaned = cleaned
      .replace(new RegExp(`\\b${escapedTitle}\\b`, "gi"), "This detail")
      .replace(/\bThis phrase reminds us that\b/gi, "")
      .replace(/\bThis phrase explains\b/gi, "This explains")
      .replace(/\bThe phrase makes\b/gi, "The command is")
      .replace(/\bThe phrase names\b/gi, "This names")
      .replace(/\bThe phrase shows\b/gi, "This shows")
      .replace(/\bThis phrase\b/gi, "This")
      .replace(/\bThe phrase\b/gi, "This")
      .replace(/\bGod slows the reader down so\b/gi, "God names the relationship so")
      .replace(/\bthe reader\b/gi, "a beginner")
      .replace(/\breaders\b/gi, "beginners")
      .replace(/\bhelps beginners\b/gi, "shows beginners")
      .replace(/\bhelps explain\b/gi, "explains");
    return cleaned.replace(/^([a-z])/, (letter) => letter.toUpperCase());
  };

  const cleaned = lines.map(cleanLine).filter(Boolean);
  const proseLines = cleaned.filter((line) => !isEmojiLine(line));
  const emojiLines = cleaned.filter(isEmojiLine);

  return [
    ...proseLines.slice(0, Math.min(3, proseLines.length)),
    ...emojiLines.slice(0, 4),
    ...proseLines.slice(Math.min(3, proseLines.length)),
  ].slice(0, 8);
}

function polishDay36Section(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  return {
    ...section,
    phrases: section.phrases.map(([title, content]) => [
      title,
      note(formatDay36MeaningFirstLines(title, content.split(/\n+/).map((line) => line.trim()).filter(Boolean))),
    ]),
  };
}

const RAW_LEVITICUS_17_20_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 4,
    reference: "Leviticus 17:1-4",
    title: "Sacrifice Must Come Before The LORD",
    icon: "🩸",
    phrases: [
      card("🗣️ The LORD Spake Unto Moses", "This phrase reminds us that these commands begin with God's voice.", ["📜 God speaks", "🧔 Moses receives", "👥 Israel must listen"], "Leviticus is not built on human religious ideas. It is God teaching His people how life near His holy presence must work."),
      card("👥 All The Children Of Israel", "This command is not only for priests.", ["👨‍👩‍👧 Families", "⛺ The whole camp", "🙏 Every worshiper"], "Sacrifice and blood matter for the entire covenant community because the whole camp lives around God's presence."),
      card("📜 This Is The Thing Which The LORD Hath Commanded", "The phrase makes the command specific and serious.", ["✅ Not suggestion", "✅ Not custom", "✅ Command from the LORD"], "Israel is learning that worship must be shaped by what God commands, not by what people prefer."),
      card("🐂 Killeth An Ox, Or Lamb, Or Goat", "These are sacrificial animals that could be used in worship.", ["🐂 Ox", "🐑 Lamb", "🐐 Goat"], "The issue is not ordinary meat only. Leviticus is guarding the killing of animals that belong in the sacrificial world."),
      card("🚪 The Door Of The Tabernacle Of The Congregation", "This is the appointed place where sacrifice must be brought.", ["🚪 Door", "⛺ Tabernacle", "🔥 Altar nearby"], "The door matters because God has given Israel a holy meeting place. Worship is not hidden in private fields."),
      card("🙏 To Offer An Offering Unto The LORD", "This phrase explains the purpose of bringing the animal.", ["🔥 It is offered", "🙏 It is worship", "🕊️ It is directed to the LORD"], "The animal is not just killed. It is brought to God in the way He commanded."),
      card("🩸 Blood Shall Be Imputed Unto That Man", "This means the guilt of shed blood is charged to the person.", ["🩸 Life has been taken", "🚫 The altar was ignored", "⚖️ Guilt is counted"], "Blood is too holy to be handled casually. If sacrifice is separated from God's altar, the act becomes guilt instead of worship."),
    ],
  },
  {
    chapter: 17,
    startVerse: 5,
    endVerse: 7,
    reference: "Leviticus 17:5-7",
    title: "No More Sacrifices To Devils",
    icon: "⚠️",
    phrases: [
      card("🌾 Sacrifices, Which They Offer In The Open Field", "The open field was where sacrifices had been happening away from the tabernacle.", ["🌾 Field worship", "🚫 Unchecked worship", "⚠️ Danger of idolatry"], "God is pulling sacrifice back under His command so worship does not drift into false worship."),
      card("🚪 Unto The Door Of The Tabernacle", "The door is repeated because the place matters.", ["🚪 Public approach", "⛺ God's dwelling", "🔥 The appointed altar"], "Israel must bring worship into the light before the LORD, not keep it in hidden places."),
      card("🧔 Unto The Priest", "The priest stands between the worshiper and the altar service.", ["🧔 Priest receives", "🩸 Priest sprinkles blood", "🔥 Priest burns the fat"], "This keeps sacrifice connected to God's ordered way of atonement and worship."),
      card("🕊️ Peace Offerings Unto The LORD", "Peace offerings were sacrifices connected to fellowship and thanksgiving.", ["🤝 Fellowship", "🙏 Thanksgiving", "🔥 Worship"], "God is redirecting Israel's sacrifices so their fellowship is with Him, not with false gods."),
      card("🩸 Sprinkle The Blood Upon The Altar", "The blood is placed at the altar because blood represents life before God.", ["🩸 Blood", "🔥 Altar", "🙏 Worship before the LORD"], "The priest does not treat blood like waste. He handles it as holy because life belongs to God."),
      card("🔥 Burn The Fat For A Sweet Savour Unto The LORD", "The fat was the rich portion offered up to God.", ["🔥 Burned to God", "🕊️ Pleasing aroma", "🙌 Worship received"], "This phrase shows that sacrifice is not only about killing. It is about giving the best portion to the LORD."),
      card("⚠️ No More Offer Their Sacrifices Unto Devils", "This phrase exposes the danger behind unauthorized sacrifice.", ["🚫 False worship", "💔 Covenant betrayal", "🛡️ God guarding His people"], "When worship leaves God's word, it can become worship of something else. God is protecting Israel from spiritual unfaithfulness."),
    ],
  },
  {
    chapter: 17,
    startVerse: 8,
    endVerse: 12,
    reference: "Leviticus 17:8-12",
    title: "The Life Of The Flesh Is In The Blood",
    icon: "🩸",
    phrases: [
      card("🌍 The Strangers Which Sojourn Among You", "This phrase includes non-Israelites living inside Israel's community.", ["👥 Israel", "🌍 Sojourners", "⛺ One holy camp"], "God's holiness shapes everyone living among His people. No one may bring false sacrificial practice into the camp."),
      card("🔥 Offereth A Burnt Offering Or Sacrifice", "This phrase covers acts of worship involving sacrifice.", ["🔥 Burnt offering", "🐐 Sacrifice", "🙏 Worship"], "God is not only regulating priests. He is guarding the way every worshiper approaches Him."),
      card("🚪 Bringeth It Not Unto The Door", "This phrase names the disobedience.", ["🚪 The right place ignored", "⛺ The tabernacle bypassed", "⚖️ Worship becomes rebellion"], "A person may feel religious and still disobey. Leviticus teaches that worship must come God's way."),
      card("⚖️ I Will Even Set My Face Against That Soul", "This is strong judgment language.", ["⚠️ God opposes", "🚫 Blood is not common", "⚖️ The soul is accountable"], "Eating blood is not treated as a small habit. It violates a holy boundary God Himself explains."),
      card("🩸 The Life Of The Flesh Is In The Blood", "This is the key sentence of the chapter.", ["🩸 Blood represents life", "🙌 Life belongs to God", "🚫 Blood is not ordinary food"], "Israel must treat blood with reverence because life is God's gift and God's property."),
      card("🔥 I Have Given It To You Upon The Altar", "God says blood for atonement is His gift.", ["🎁 God gives", "🔥 Upon the altar", "🙏 Atonement provided"], "Israel does not invent cleansing. God gives the appointed way for sin to be covered before Him."),
      card("🙏 It Is The Blood That Maketh An Atonement For The Soul", "Atonement means sin is dealt with before God.", ["🩸 Life for life", "⚖️ Sin is serious", "🕊️ Mercy is provided"], "This phrase helps explain why blood matters across the Bible. God provides a costly way for guilty people to be covered."),
    ],
  },
  {
    chapter: 17,
    startVerse: 13,
    endVerse: 16,
    reference: "Leviticus 17:13-16",
    title: "Blood Must Be Treated With Reverence",
    icon: "🏹",
    phrases: [
      card("🏹 Hunteth And Catcheth Any Beast Or Fowl", "The chapter now moves from sacrifice to hunting.", ["🏹 The hunt", "🍽️ Ordinary food", "🙌 Still under God's rule"], "Even when an animal is not brought as a sacrifice, its blood must still be treated with reverence."),
      card("🩸 Pour Out The Blood Thereof", "The hunter must pour out the blood instead of eating it.", ["🩸 Blood released", "🚫 Not consumed", "🙏 Life honored"], "The animal may be eaten, but its life is not treated like common food."),
      card("🌱 Cover It With Dust", "Covering the blood with dust is a visible act of respect.", ["🌱 Dust", "🩸 Blood", "🙌 Reverence"], "The life of the animal is returned to the ground under God's command."),
      card("🔁 The Life Of All Flesh Is The Blood Thereof", "God repeats the reason because the lesson is important.", ["🩸 Blood means life", "🐾 All flesh", "🙏 Life belongs to God"], "Repetition teaches Israel to remember that life is sacred, not cheap."),
      card("🐾 That Which Died Of Itself, Or That Which Was Torn", "This kind of meat is connected to uncontrolled death.", ["🐾 Died by itself", "🦁 Torn by beasts", "⚠️ Contact with death"], "Israel must handle death carefully because uncleanness affects life near God's holy presence."),
      card("💧 Wash His Clothes, And Bathe Himself In Water", "Washing marks the way back from uncleanness.", ["💧 Wash clothes", "🚿 Bathe body", "🌙 Wait until evening"], "Uncleanness is serious, but God gives a clear path back to cleanness."),
      card("⚖️ He Shall Bear His Iniquity", "If the person refuses cleansing, the guilt remains on him.", ["🚫 Refused washing", "⚖️ Guilt remains", "📜 God's command ignored"], "Mercy does not remove responsibility. God gives a way back, but Israel must obey it."),
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 5,
    reference: "Leviticus 18:1-5",
    title: "Do Not Live Like Egypt Or Canaan",
    icon: "🧭",
    phrases: [
      card("🙌 I Am The LORD Your God", "God begins sexual holiness by naming Himself.", ["👑 His authority", "🤝 His covenant", "📜 His command"], "These laws are not random advice. Israel obeys because the LORD is their God."),
      card("🇪🇬 The Land Of Egypt, Wherein Ye Dwelt", "Egypt is the old place Israel came from.", ["⛓️ Slavery", "🗿 Pagan worship", "🚫 Old patterns"], "God is not only bringing Israel out of Egypt's land. He is teaching them not to carry Egypt's ways with them."),
      card("🌄 The Land Of Canaan, Whither I Bring You", "Canaan is the place Israel is going.", ["🌄 Future home", "⚠️ Corrupt practices", "🧭 A test of obedience"], "Israel may enter Canaan, but they must not copy Canaan."),
      card("🚫 Shall Ye Not Do", "This phrase draws a clear boundary.", ["🚫 Do not copy Egypt", "🚫 Do not copy Canaan", "✅ Follow the LORD"], "God's people cannot measure holiness by the culture around them."),
      card("🚶 Neither Shall Ye Walk In Their Ordinances", "To walk means to live by a pattern.", ["🚶 Daily habits", "📜 Moral rules", "🧠 A way of thinking"], "Israel must not let the nations teach them what normal life should be."),
      card("📜 Ye Shall Do My Judgments", "God gives Israel a different standard.", ["📜 God's judgments", "🛤️ God's path", "🙌 God's authority"], "Holiness is not vague. God gives His people a way to walk."),
      card("🌱 He Shall Live In Them", "God's statutes are presented as a path of life.", ["🌱 Life", "🛡️ Protection", "🙏 Obedience"], "God's boundaries are not meant to steal life. They guard life with Him."),
    ],
  },
  {
    chapter: 18,
    startVerse: 6,
    endVerse: 10,
    reference: "Leviticus 18:6-10",
    title: "Near Kin Must Be Protected",
    icon: "🏠",
    phrases: [
      card("🏠 Near Of Kin", "Near of kin means close family.", ["👩 Mother", "👨 Father", "👧 Sister", "👶 Grandchild"], "God is protecting the family from sexual confusion, abuse, and shame."),
      card("🚫 To Uncover Their Nakedness", "This phrase means a forbidden sexual relationship.", ["🚫 Forbidden approach", "💔 Sexual violation", "🛡️ Protected family"], "Leviticus uses this wording to teach that family closeness does not give permission."),
      card("🙌 I Am The LORD", "This repeated phrase anchors the command in God's authority.", ["👑 The LORD commands", "📜 The boundary stands", "🙏 Israel must obey"], "The family is not protected by opinion alone. It is protected by the word of the LORD."),
      card("👩 She Is Thy Mother", "The phrase names the relationship plainly.", ["👩 Mother", "🏠 Family honor", "🚫 No violation"], "God slows the reader down so the relationship cannot be blurred or excused."),
      card("👨 It Is Thy Father's Nakedness", "A sin against the father's wife is also a dishonor against the father.", ["👨 Father", "💍 Marriage bond", "🏠 Household order"], "Sexual sin damages more than one person. It wounds the structure of the family."),
      card("👧 Whether She Be Born At Home, Or Born Abroad", "God closes loopholes about family identity.", ["🏠 Born at home", "🌍 Born elsewhere", "👧 Still sister"], "Distance or circumstance does not erase the boundary God gives."),
      card("👶 For Theirs Is Thine Own Nakedness", "The phrase shows how closely family members are connected.", ["👶 Grandchildren", "🏠 Family line", "🛡️ Protected dignity"], "God treats family vulnerability as something to guard, not exploit."),
    ],
  },
  {
    chapter: 18,
    startVerse: 11,
    endVerse: 14,
    reference: "Leviticus 18:11-14",
    title: "More Protected Family Boundaries",
    icon: "🛡️",
    phrases: [
      card("👧 She Is Thy Sister", "This phrase keeps the family relationship clear.", ["👧 Sister", "🏠 Same family line", "🚫 Not a sexual partner"], "God names the relationship so desire cannot rename it."),
      card("👵 Thy Father's Sister", "This phrase names an aunt in the father's family line.", ["👵 Aunt", "👨 Father's side", "🛡️ Family honor"], "Leviticus teaches that extended family boundaries matter too."),
      card("👵 Thy Mother's Sister", "This phrase names an aunt in the mother's family line.", ["👵 Aunt", "👩 Mother's side", "🛡️ Protected kinship"], "God guards family nearness on both sides of the household."),
      card("👰 She Is Thine Aunt", "The wife of an uncle is also protected by family boundary.", ["👰 Uncle's wife", "🏠 Family connection", "🚫 No approach"], "Marriage brings a person into the family structure, and that relationship must be honored."),
    ],
  },
  {
    chapter: 18,
    startVerse: 15,
    endVerse: 18,
    reference: "Leviticus 18:15-18",
    title: "Marriage And Household Boundaries",
    icon: "💍",
    phrases: [
      card("👰 Thy Daughter In Law", "A daughter in law is protected by her marriage to the son.", ["👰 Daughter in law", "💍 Son's wife", "🏠 Household order"], "God refuses to let power inside the family become an excuse for sexual sin."),
      card("💍 She Is Thy Son's Wife", "This phrase explains why the boundary matters.", ["👦 The son", "👰 His wife", "🛡️ Their marriage guarded"], "The relationship is already claimed by marriage, so it must not be violated."),
      card("👥 Thy Brother's Wife", "A brother's wife is also protected by family and marriage boundaries.", ["👥 Brother", "👰 His wife", "🏠 Family honor"], "God protects the marriage bond even inside close family connections."),
      card("👩 A Woman And Her Daughter", "This phrase names a relationship that must not be joined in sexual rivalry.", ["👩 Woman", "👧 Daughter", "🚫 No exploitation"], "God is guarding a household from desire that would turn family relationships into harm."),
      card("💔 It Is Wickedness", "This phrase names the moral weight of the act.", ["⚠️ Not harmless", "💔 Wickedness", "🛡️ Family protected"], "Leviticus is not embarrassed to call destructive sin what it is."),
      card("😣 To Vex Her", "This phrase shows the damage of taking sisters as rival wives.", ["😣 Rivalry", "💔 Pain", "🏠 Family disorder"], "God sees the emotional harm that can grow inside broken household arrangements."),
    ],
  },
  {
    chapter: 18,
    startVerse: 19,
    endVerse: 23,
    reference: "Leviticus 18:19-23",
    title: "Desire Must Not Become Defilement",
    icon: "🚫",
    phrases: [
      card("🩸 As Long As She Is Put Apart For Her Uncleanness", "This phrase connects sexual behavior with the uncleanness laws already given.", ["🩸 Blood", "⏳ Waiting", "🛡️ Reverence"], "God is teaching Israel that bodies, blood, and holiness belong together."),
      card("💍 Thy Neighbour's Wife", "This phrase protects marriage from adultery.", ["💍 Marriage", "👥 Neighbor", "🚫 Betrayal"], "A neighbor's wife is not available for desire. Her marriage must be honored."),
      card("💔 To Defile Thyself With Her", "Adultery is described as defilement.", ["💔 Betrayal", "🧍 Personal defilement", "🏠 Household damage"], "Sin is not only private pleasure. It leaves moral uncleanness behind."),
      card("🔥 Thy Seed Pass Through The Fire To Molech", "This phrase refers to a horrifying false worship practice involving children.", ["🔥 False worship", "👶 Children harmed", "🚫 God's name profaned"], "Leviticus places this here because idolatry and moral corruption belong together."),
      card("🙌 Neither Shalt Thou Profane The Name Of Thy God", "Profane means to treat God's holy name as common or dishonored.", ["👑 God's name", "🔥 False worship", "⚠️ Public dishonor"], "Israel's behavior says something about the God they claim to belong to."),
      card("🚫 It Is Abomination", "This phrase names an act as detestable before God.", ["🚫 Forbidden", "⚖️ Serious before God", "🛡️ Israel set apart"], "The word is strong because God is drawing a moral boundary for His covenant people."),
      card("🌀 It Is Confusion", "Confusion means disorder against God's design.", ["🌀 Disorder", "🐾 Creature boundary crossed", "💔 Defilement"], "God is teaching that desire must not tear down the boundaries He created."),
    ],
  },
  {
    chapter: 18,
    startVerse: 24,
    endVerse: 27,
    reference: "Leviticus 18:24-27",
    title: "The Land Must Not Be Defiled",
    icon: "🌍",
    phrases: [
      card("🚫 Defile Not Ye Yourselves", "God warns Israel not to become polluted by the practices He has named.", ["🚫 Do not copy sin", "🧼 Stay clean", "🙌 Belong to the LORD"], "Holiness is not only about avoiding punishment. It is about refusing what corrupts life with God."),
      card("🌍 The Nations Are Defiled", "The nations were not judged for nothing.", ["🌍 Nations", "💔 Defilement", "⚖️ Judgment"], "God is showing Israel that these practices already brought corruption before them."),
      card("🌱 The Land Is Defiled", "Human sin is described as affecting the land itself.", ["🌱 Land", "🏠 Communities", "⚠️ Sin's spread"], "The Bible does not treat sin as invisible. It stains people, places, and community life."),
      card("🤢 The Land Itself Vomiteth Out Her Inhabitants", "This is strong picture language.", ["🤢 Vomiting out", "⚖️ Judgment", "🚫 Corruption rejected"], "The land cannot hold a people who fill it with defilement forever."),
    ],
  },
  {
    chapter: 18,
    startVerse: 28,
    endVerse: 30,
    reference: "Leviticus 18:28-30",
    title: "Keep Mine Ordinance",
    icon: "📜",
    phrases: [
      card("🤢 That The Land Spue Not You Out Also", "God warns Israel that the same judgment could reach them.", ["🤢 Land spues out", "⚠️ Defilement judged", "🚫 Privilege is not protection"], "Israel must not think God's gift of the land makes rebellion safe."),
      card("⚖️ Every One That Committeth Any Of These Abominations", "The warning applies to anyone who practices these sins.", ["⚖️ Accountability", "🚫 Abominations named", "👥 Community seriousness"], "God's standard does not disappear because people normalize sin."),
      card("📜 Therefore Shall Ye Keep Mine Ordinance", "God gives Israel a clear response.", ["📜 Keep", "🚶 Obey", "🙌 Listen to the LORD"], "The way to avoid the nations' corruption is to hold fast to God's command."),
      card("🚫 Abominable Customs", "Customs are repeated practices that become normal in a culture.", ["🚫 Corrupt customs", "🌍 Nations before them", "🛡️ Israel warned"], "God does not want Israel to inherit Canaan's habits along with Canaan's land."),
      card("🧼 Defile Not Yourselves Therein", "Israel must not become polluted by the practices around them.", ["🧼 Stay clean", "🚫 Refuse corruption", "🙌 Belong to God"], "Holiness means refusing what would make life with God unclean."),
      card("🙌 I Am The LORD Your God", "The chapter ends with God's identity again.", ["👑 God owns Israel", "📜 God commands Israel", "🕊️ God sets Israel apart"], "The reason for holiness is not cultural superiority. It is belonging to the LORD."),
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 4,
    reference: "Leviticus 19:1-4",
    title: "Ye Shall Be Holy",
    icon: "🕊️",
    phrases: [
      card("👥 All The Congregation Of The Children Of Israel", "This holiness command is for the whole people.", ["👥 Whole congregation", "🏠 Families", "🛠️ Daily workers"], "Holiness is not only for priests. It is the calling of everyone who belongs to the LORD."),
      card("🕊️ Ye Shall Be Holy", "Holy means set apart for God.", ["🕊️ Set apart", "🙌 Belonging to God", "🚶 A different way to live"], "Israel must live differently because they belong to the holy LORD."),
      card("🙌 For I The LORD Your God Am Holy", "God's character becomes the pattern for His people.", ["👑 God is holy", "🪞 Israel reflects Him", "📜 Life follows His ways"], "Holiness begins with who God is before it becomes what Israel does."),
      card("👪 Fear Every Man His Mother, And His Father", "Fear here means honor and reverence.", ["👩 Mother", "👨 Father", "🏠 Home life"], "Leviticus begins practical holiness inside the family."),
      card("🕯️ Keep My Sabbaths", "Sabbath teaches Israel that time belongs to God.", ["🕯️ Rest", "🙏 Worship", "🙌 Trust"], "Holiness shapes the calendar, not only the altar."),
      card("🚫 Turn Ye Not Unto Idols", "Turning to idols means giving attention and trust to false gods.", ["🚫 False gods", "💔 Divided worship", "👑 Loyalty to the LORD"], "A holy people cannot reflect the LORD while bowing to idols."),
      card("🗿 Nor Make To Yourselves Molten Gods", "Molten gods were crafted idols.", ["🗿 Made by hands", "🚫 Not the living God", "⚠️ Dangerous worship"], "God refuses to let His people replace Him with something they can manufacture."),
    ],
  },
  {
    chapter: 19,
    startVerse: 5,
    endVerse: 10,
    reference: "Leviticus 19:5-10",
    title: "Holy Worship And Merciful Harvest",
    icon: "🌾",
    phrases: [
      card("🕊️ Sacrifice Of Peace Offerings", "Peace offerings were connected to fellowship with God.", ["🕊️ Peace", "🙏 Thanksgiving", "🍽️ Shared worship"], "Even joyful worship must be offered in the way God commands."),
      card("📅 Eaten The Same Day", "The offering had time limits.", ["📅 Same day", "🌅 Next day allowed", "🔥 Third day burned"], "Holy food cannot be handled carelessly or stretched beyond God's boundary."),
      card("⚠️ It Is Abominable; It Shall Not Be Accepted", "This phrase shows that disobedience can corrupt an offering.", ["⚠️ Wrong handling", "🚫 Not accepted", "🔥 Holy things guarded"], "God's acceptance matters more than the worshiper's convenience."),
      card("⚖️ He Hath Profaned The Hallowed Thing Of The LORD", "Profaned means treated holy things as common.", ["🔥 Holy offering", "🚫 Treated casually", "⚖️ Guilt carried"], "Leviticus teaches that holy things must not be handled like ordinary leftovers."),
      card("🌾 Thou Shalt Not Wholly Reap The Corners Of Thy Field", "God commands Israel not to harvest every edge.", ["🌾 Field corners", "🤲 Room for the poor", "🌍 Room for the stranger"], "Holiness makes space for mercy in the economy of daily life."),
      card("🍇 Neither Shalt Thou Gather Every Grape", "The vineyard must not be stripped clean.", ["🍇 Grapes left", "🤲 Provision shared", "💛 Generosity built in"], "God's people must not squeeze every possible gain for themselves."),
      card("🤲 Leave Them For The Poor And Stranger", "This phrase shows God's care for vulnerable people.", ["🤲 Poor", "🌍 Stranger", "🌾 Harvest mercy"], "The field becomes a place where God's holiness looks like practical compassion."),
    ],
  },
  {
    chapter: 19,
    startVerse: 11,
    endVerse: 14,
    reference: "Leviticus 19:11-14",
    title: "Holiness In Honesty And Mercy",
    icon: "🤝",
    phrases: [
      card("🚫 Ye Shall Not Steal", "Stealing takes what belongs to another person.", ["🚫 Taking", "💔 Harm", "⚖️ Injustice"], "Holiness includes how people handle property and trust."),
      card("💬 Neither Deal Falsely", "Dealing falsely means acting with deception.", ["💬 False dealings", "🎭 Hidden dishonesty", "🤝 Broken trust"], "God's people must be truthful in the way they treat one another."),
      card("🗣️ Neither Lie One To Another", "This phrase makes honesty personal.", ["🗣️ Words", "👥 Neighbors", "🤝 Trust"], "A holy community cannot be built on lies."),
      card("🙌 Ye Shall Not Swear By My Name Falsely", "God's name must not be used to support a lie.", ["🙌 God's name", "🚫 False oath", "⚠️ Profaned worship"], "Using God's name falsely treats His holiness as a tool for dishonesty."),
      card("💰 The Wages Of Him That Is Hired", "This phrase protects the hired worker.", ["💰 Wages", "🛠️ Worker", "🌙 Not held overnight"], "Holiness reaches payday. God sees how workers are treated."),
      card("🧏 Thou Shalt Not Curse The Deaf", "The deaf person may not hear the curse, but God hears it.", ["🧏 The deaf", "🗣️ Hidden cruelty", "👑 God sees"], "God protects people who may not be able to defend themselves."),
      card("🧑‍🦯 Nor Put A Stumblingblock Before The Blind", "This phrase forbids taking advantage of someone's weakness.", ["🧑‍🦯 The blind", "🪨 Stumblingblock", "🛡️ Mercy"], "Holiness means refusing hidden cruelty, even when no one else sees."),
    ],
  },
  {
    chapter: 19,
    startVerse: 15,
    endVerse: 18,
    reference: "Leviticus 19:15-18",
    title: "Justice, Speech, And Love",
    icon: "⚖️",
    phrases: [
      card("⚖️ No Unrighteousness In Judgment", "Judgment must be fair and truthful.", ["⚖️ Court decisions", "👥 Community disputes", "📜 Righteous standard"], "God's people must not twist justice for personal advantage."),
      card("🤲 Not Respect The Person Of The Poor", "Even compassion must not bend justice falsely.", ["🤲 Poor person", "⚖️ Fair judgment", "🚫 No favoritism"], "Biblical justice is not favoritism in either direction."),
      card("👑 Nor Honour The Person Of The Mighty", "Powerful people must not receive special treatment.", ["👑 Mighty person", "💰 Influence", "⚖️ Same standard"], "God's justice is not impressed by status."),
      card("💬 Not Go Up And Down As A Talebearer", "A talebearer spreads damaging talk.", ["💬 Gossip", "🔥 Harmful words", "👥 Community damage"], "Holiness reaches speech because words can wound neighbors."),
      card("🩸 Neither Stand Against The Blood Of Thy Neighbour", "This phrase warns against endangering a neighbor's life.", ["🩸 Life at risk", "👥 Neighbor protected", "⚖️ Responsibility"], "God's people cannot stay neutral when a neighbor's life is threatened."),
      card("💔 Thou Shalt Not Hate Thy Brother In Thine Heart", "God speaks to hidden hatred, not only outward actions.", ["💔 Hidden anger", "🧠 Inner life", "👥 Brother protected"], "Holiness reaches the heart where resentment can grow unseen."),
      card("❤️ Thou Shalt Love Thy Neighbour As Thyself", "This famous command appears inside a holiness chapter.", ["❤️ Love", "👥 Neighbor", "🙌 I am the LORD"], "Love is not separate from holiness. It is one of the clearest ways God's people reflect Him."),
    ],
  },
  {
    chapter: 19,
    startVerse: 19,
    endVerse: 22,
    reference: "Leviticus 19:19-22",
    title: "Boundaries And Atonement",
    icon: "🚧",
    phrases: [
      card("📜 Ye Shall Keep My Statutes", "This phrase calls Israel back to God's ordered commands.", ["📜 Statutes", "🚶 Obedience", "🙌 God's authority"], "The details may feel unusual, but the big lesson is that God defines holy order."),
      card("🐄 Cattle Gender With A Diverse Kind", "This command teaches Israel to notice created boundaries.", ["🐄 Animals", "🚧 Difference", "🧭 Ordered life"], "God uses daily life to train His people in distinction."),
      card("🌱 Field With Mingled Seed", "The field also becomes a place of obedience.", ["🌱 Seed", "🌾 Field", "🚧 Boundaries"], "Holiness reaches farming, not only sacrifice."),
      card("🧥 Garment Mingled Of Linen And Woollen", "Even clothing could remind Israel of distinction.", ["🧥 Garment", "🧵 Linen", "🐑 Wool"], "The command trains Israel to live as a people shaped by God's boundaries."),
      card("💔 A Bondmaid, Betrothed To An Husband", "This phrase describes a vulnerable and complicated situation.", ["💔 Sexual sin", "🧍 Vulnerable woman", "⚖️ Legal complexity"], "Leviticus does not ignore hard cases. It brings them under God's justice and mercy."),
      card("🐏 A Ram For A Trespass Offering", "The guilty man must bring a trespass offering.", ["🐏 Ram", "⚖️ Guilt named", "🙏 Atonement needed"], "Sin is not brushed aside. God provides a way for guilt to be dealt with."),
      card("✅ The Sin Which He Hath Done Shall Be Forgiven Him", "Forgiveness comes after sin is named and atonement is made.", ["📜 Sin named", "🐏 Offering brought", "✅ Forgiveness"], "God's mercy is real, but it does not pretend the wrong never happened."),
    ],
  },
  {
    chapter: 19,
    startVerse: 23,
    endVerse: 26,
    reference: "Leviticus 19:23-26",
    title: "Holy Patience In The Land",
    icon: "🌳",
    phrases: [
      card("🌳 When Ye Shall Come Into The Land", "This phrase looks ahead to life in Canaan.", ["🌳 Future land", "🏠 Settled life", "🙌 Still under God"], "Israel's future farming must be shaped by the LORD from the beginning."),
      card("⏳ Three Years Shall It Be As Uncircumcised", "The first fruit from the trees is not eaten.", ["⏳ Waiting", "🌳 Fruit trees", "🚫 Not yet eaten"], "God teaches patience before provision."),
      card("🙌 In The Fourth Year All The Fruit Thereof Shall Be Holy", "The fourth year's fruit belongs to praise.", ["🙌 Holy fruit", "🙏 Praise", "🎁 First full honor to God"], "Before Israel enjoys the increase, they learn to honor the LORD with it."),
      card("🍽️ In The Fifth Year Shall Ye Eat", "Only after waiting and consecration do the people eat.", ["🍽️ Eating", "🌱 Increase", "📜 God's timing"], "God's timing teaches Israel that the land is a gift, not something to seize greedily."),
      card("🩸 Ye Shall Not Eat Any Thing With The Blood", "This repeats the blood command from Leviticus 17.", ["🩸 Blood", "🙌 Life belongs to God", "🚫 Not food"], "Holiness remembers that life is sacred even at the table."),
    ],
  },
  {
    chapter: 19,
    startVerse: 27,
    endVerse: 30,
    reference: "Leviticus 19:27-30",
    title: "Bodies, Mourning, Sabbath, And Sanctuary",
    icon: "⛺",
    phrases: [
      card("🧔 Not Round The Corners Of Your Heads", "This phrase forbids Israel from copying pagan identity practices.", ["🧔 Hair", "🚫 Pagan pattern", "🕊️ Set apart"], "Even outward customs can teach loyalty, so Israel must not be discipled by false worship."),
      card("🧔 Nor Mar The Corners Of Thy Beard", "The beard command continues the same concern.", ["🧔 Beard", "🚫 Pagan marking", "🙌 Belonging to the LORD"], "God is shaping Israel's public identity as a holy people."),
      card("🧍 Cuttings In Your Flesh For The Dead", "Israel must not copy pagan mourning rituals.", ["🧍 Body", "⚰️ Mourning", "🚫 False worship patterns"], "Even grief must not be shaped by practices that deny God's holiness."),
      card("✒️ Nor Print Any Marks Upon You", "This phrase forbids body markings tied to pagan practice.", ["✒️ Marks", "🧍 Body", "🚫 False worship"], "Israel's bodies belong to the LORD, so even visible signs of identity must be guarded."),
      card("💔 Do Not Prostitute Thy Daughter", "God forbids exploiting a daughter for sexual gain.", ["💔 Daughter protected", "🚫 Exploitation", "🏠 Family holiness"], "Holiness protects vulnerable people from being treated like profit."),
      card("🌍 Lest The Land Fall To Whoredom", "Private exploitation can corrupt the wider land.", ["🌍 Land affected", "💔 Wickedness spreads", "⚠️ Sin is not isolated"], "God shows that sexual sin and exploitation damage more than one household."),
      card("⛺ Keep My Sabbaths, And Reverence My Sanctuary", "The section ends with holy time and holy space.", ["🕯️ Sabbath", "⛺ Sanctuary", "🙌 Reverence"], "God's people must honor both the rhythms He gives and the place where He dwells among them."),
    ],
  },
  {
    chapter: 19,
    startVerse: 31,
    endVerse: 34,
    reference: "Leviticus 19:31-34",
    title: "Reject Occult Guidance And Love The Stranger",
    icon: "🌍",
    phrases: [
      card("🔮 Regard Not Them That Have Familiar Spirits", "God forbids seeking occult guidance.", ["🔮 Familiar spirits", "🚫 False power", "🙌 Seek the LORD"], "Israel must not look for hidden spiritual help apart from God."),
      card("🧙 Neither Seek After Wizards", "Wizards represent forbidden spiritual practices.", ["🧙 Wizards", "⚠️ Defilement", "🚫 Not God's way"], "False guidance does not make Israel wise. It defiles them."),
      card("👴 Rise Up Before The Hoary Head", "Hoary head means gray hair.", ["👴 Older person", "🙇 Respect", "🏠 Community honor"], "Holiness includes honoring age and wisdom."),
      card("🌍 If A Stranger Sojourn With Thee", "This phrase speaks about a foreigner living among Israel.", ["🌍 Stranger", "⛺ Dwelling among them", "🛡️ Protected by God's law"], "God cares how His people treat outsiders who live near them."),
      card("❤️ Thou Shalt Love Him As Thyself", "Israel must love the stranger, not merely tolerate him.", ["❤️ Love", "🌍 Stranger", "👥 As yourself"], "The command expands neighbor love to the vulnerable foreigner among them."),
      card("🇪🇬 Ye Were Strangers In The Land Of Egypt", "God grounds compassion in Israel's memory.", ["🇪🇬 Egypt", "⛓️ Israel knew hardship", "🤲 Remember and show mercy"], "People rescued by God must not forget what it felt like to be powerless."),
    ],
  },
  {
    chapter: 19,
    startVerse: 35,
    endVerse: 37,
    reference: "Leviticus 19:35-37",
    title: "Honest Measures And Obedience",
    icon: "⚖️",
    phrases: [
      card("⚖️ No Unrighteousness In Judgment", "This phrase brings honesty into public decisions and business life.", ["⚖️ Judgment", "📏 Measurement", "🤝 Fair dealing"], "God's people must not twist justice or numbers for advantage."),
      card("📏 In Meteyard, In Weight, Or In Measure", "These are tools for measuring length, weight, and volume.", ["📏 Length", "🏋️ Weight", "🏺 Measure"], "Holiness reaches the practical tools people use to buy and sell."),
      card("⚖️ Just Balances, Just Weights", "Business must be honest before God.", ["⚖️ Balances", "🏋️ Weights", "📏 Measures"], "Holiness reaches the marketplace. God's people must not cheat with numbers."),
      card("🏺 A Just Ephah, And A Just Hin", "An ephah and hin were measures used in trade and offerings.", ["🏺 Ephah", "🏺 Hin", "✅ Honest amounts"], "God cares about exact fairness in ordinary transactions."),
      card("🇪🇬 Which Brought You Out Of The Land Of Egypt", "God connects honest business to rescue from Egypt.", ["🇪🇬 Rescue remembered", "⛓️ Oppression left behind", "🤝 Fairness practiced"], "A rescued people must not become oppressors in the marketplace."),
      card("📜 Observe All My Statutes, And All My Judgments, And Do Them", "The chapter ends by calling for obedience.", ["👀 Observe", "📜 God's judgments", "🚶 Do them"], "Holiness is not only knowing what God says. It is walking it out."),
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 5,
    reference: "Leviticus 20:1-5",
    title: "Molech Worship Is Judged",
    icon: "🔥",
    phrases: [
      card("🔥 Giveth Any Of His Seed Unto Molech", "This phrase refers to giving children to a false god.", ["🔥 Molech worship", "👶 Children harmed", "💔 Life destroyed"], "God treats this with extreme seriousness because false worship is destroying children and profaning His name."),
      card("⚖️ He Shall Surely Be Put To Death", "The consequence shows the severity of the sin.", ["⚖️ Judgment", "🚫 No tolerance", "🛡️ Community protected"], "This is not a small religious mistake. It is covenant rebellion that destroys life."),
      card("👥 The People Of The Land Shall Stone Him With Stones", "The community must not ignore the evil.", ["👥 Community responsibility", "⚖️ Public judgment", "🚫 Evil confronted"], "Holiness is not protected by pretending nothing happened."),
      card("🙌 I Will Set My Face Against That Man", "God Himself opposes the person who gives children to Molech.", ["🙌 God's face set", "⚖️ Direct opposition", "🚫 False worship judged"], "The phrase shows that God is not neutral toward evil."),
      card("⛺ To Defile My Sanctuary", "Molech worship affects God's sanctuary.", ["⛺ Sanctuary", "💔 Defilement", "🙌 God's presence dishonored"], "False worship outside the tabernacle still pollutes the covenant community."),
      card("👑 To Profane My Holy Name", "Profaning God's name means dishonoring His holiness.", ["👑 God's name", "🚫 Treated as common", "💔 Public dishonor"], "Israel's worship and behavior speak about the God they claim to serve."),
      card("🙈 Hide Their Eyes", "This phrase means refusing to confront evil.", ["🙈 Looking away", "⚠️ Shared guilt", "🛡️ Holiness ignored"], "Ignoring destructive sin is not compassion or peace. It allows defilement to spread."),
    ],
  },
  {
    chapter: 20,
    startVerse: 6,
    endVerse: 8,
    reference: "Leviticus 20:6-8",
    title: "Be Holy Because God Sanctifies",
    icon: "🕊️",
    phrases: [
      card("🔮 Familiar Spirits", "Familiar spirits refer to forbidden occult powers.", ["🔮 False spiritual contact", "🚫 Not the LORD", "💔 Spiritual unfaithfulness"], "Israel must not seek hidden power from sources God forbids."),
      card("🧙 Wizards", "Wizards represent people who claim forbidden spiritual knowledge.", ["🧙 Wizard", "🚫 False guidance", "⚠️ Defilement"], "God's people must not trade trust in the LORD for occult guidance."),
      card("💔 To Go A Whoring After Them", "This is covenant betrayal language.", ["💔 Spiritual adultery", "🚫 False worship", "🙌 Loyalty broken"], "God treats occult practices as unfaithfulness, not harmless curiosity."),
      card("🕊️ Sanctify Yourselves Therefore", "Sanctify means set apart as holy.", ["🕊️ Set apart", "🚶 Live differently", "🙌 Belong to God"], "Israel must actively separate from what defiles because they belong to the LORD."),
      card("📜 Keep My Statutes, And Do Them", "God calls for obedience that is actually practiced.", ["📜 Keep", "🚶 Do", "🙌 Obey the LORD"], "Holiness is not only agreeing with God's commands. It is living them."),
      card("🙌 I Am The LORD Which Sanctify You", "God is the One who makes Israel holy.", ["🙌 God sanctifies", "👥 Israel responds", "🕊️ Holiness is His work"], "Israel obeys, but holiness begins with God's claim on them."),
    ],
  },
  {
    chapter: 20,
    startVerse: 9,
    endVerse: 12,
    reference: "Leviticus 20:9-12",
    title: "Family Honor And Marriage Betrayal",
    icon: "⚖️",
    phrases: [
      card("👪 Curseth His Father Or His Mother", "This phrase names deep dishonor toward parents.", ["👩 Mother", "👨 Father", "💔 Family honor attacked"], "In Israel's covenant life, contempt for parents tore at the order God commanded."),
      card("🩸 His Blood Shall Be Upon Him", "This phrase means the guilt and consequence belong to the offender.", ["🩸 Bloodguilt", "⚖️ Responsibility", "🚫 No excuse"], "The law is saying the person bears the weight of his own rebellion."),
      card("💍 Committeth Adultery With His Neighbour's Wife", "Adultery is betrayal of marriage and neighbor.", ["💍 Marriage broken", "👥 Neighbor wronged", "🏠 Household damaged"], "God treats marriage as covenantal, not casual."),
      card("🏠 Uncovered His Father's Nakedness", "This phrase describes sexual sin that dishonors the father and household.", ["🏠 Family boundary", "💔 Shame", "⚖️ Serious guilt"], "The sin damages more than private desire. It attacks family order."),
      card("🌀 They Have Wrought Confusion", "Confusion means disorder against God's design.", ["🌀 Disorder", "🏠 Family chaos", "💔 Harm"], "God names the damage because sexual sin can twist relationships that should be protected."),
    ],
  },
  {
    chapter: 20,
    startVerse: 13,
    endVerse: 16,
    reference: "Leviticus 20:13-16",
    title: "Defiling Acts And Covenant Consequences",
    icon: "🚫",
    phrases: [
      card("🚫 Committed An Abomination", "This phrase marks an act as detestable before God.", ["🚫 Forbidden act", "⚖️ Serious boundary", "🕊️ Holy people"], "Leviticus uses strong language because Israel is being set apart from the nations."),
      card("🔥 It Is Wickedness", "The phrase names the moral character of the act.", ["🔥 Wickedness", "🚫 Not normal holiness", "👥 Community danger"], "God is not treating destructive desire as a small private preference."),
      card("👩 A Wife And Her Mother", "This phrase describes a household boundary being violated.", ["👩 Wife", "👵 Her mother", "🏠 Family order"], "The law protects relationships that sin would turn into confusion."),
      card("🔥 That There Be No Wickedness Among You", "The goal is to remove destructive evil from the community.", ["🔥 Wickedness removed", "👥 Community guarded", "🙌 Holiness protected"], "God's concern is not only individual behavior but the health of the whole people."),
      card("🐾 If A Man Lie With A Beast", "This phrase names a boundary between human beings and animals.", ["🐾 Animal boundary", "🌀 Confusion", "🚫 Defilement"], "God's created order must not be twisted by desire."),
      card("🩸 Their Blood Shall Be Upon Them", "This phrase places responsibility on the offenders.", ["🩸 Guilt", "⚖️ Consequence", "🚫 No excuse"], "Leviticus is teaching that serious sin carries real responsibility before God."),
    ],
  },
  {
    chapter: 20,
    startVerse: 17,
    endVerse: 21,
    reference: "Leviticus 20:17-21",
    title: "The Weight Of Hidden Sin",
    icon: "💔",
    phrases: [
      card("👧 Take His Sister", "This phrase names a forbidden family relationship.", ["👧 Sister", "🏠 Near family", "🚫 Boundary crossed"], "God protects family nearness from becoming sexual violation."),
      card("💔 It Is A Wicked Thing", "The phrase names the act morally.", ["💔 Wicked thing", "⚠️ Not harmless", "🛡️ Boundary protected"], "Leviticus refuses to soften what damages the family."),
      card("⚖️ They Shall Bear Their Iniquity", "To bear iniquity means to carry guilt and consequence.", ["⚖️ Guilt carried", "📜 Sin named", "🚫 Not ignored"], "Sin has weight before God, even if people try to hide it."),
      card("🩸 The Fountain Of Her Blood", "This phrase connects the act to blood and uncleanness.", ["🩸 Blood", "🚫 Forbidden approach", "🧼 Uncleanness"], "Leviticus has been teaching that blood must be treated with reverence."),
      card("👵 Near Kin", "Near kin means close family relation.", ["👵 Aunt", "👴 Uncle's wife", "🏠 Family bond"], "God keeps repeating family nearness because closeness needs protection, not exploitation."),
      card("🚫 It Is An Unclean Thing", "This phrase describes the act as unclean before God.", ["🚫 Unclean", "💔 Disorder", "⚖️ Consequence"], "The law teaches that desire does not get to redefine holiness."),
      card("👶 They Shall Be Childless", "This consequence removes future fruitfulness from the union.", ["👶 Childless", "⚖️ Consequence", "🏠 Family line affected"], "The phrase shows that forbidden sin damages the future, not only the moment."),
    ],
  },
  {
    chapter: 20,
    startVerse: 22,
    endVerse: 26,
    reference: "Leviticus 20:22-26",
    title: "Separated To Belong To The LORD",
    icon: "🕊️",
    phrases: [
      card("📜 Keep All My Statutes, And All My Judgments", "God calls Israel to receive the whole pattern of holy life.", ["📜 Statutes", "⚖️ Judgments", "🚶 Obedience"], "Israel cannot choose only the commands that feel easy."),
      card("🤢 That The Land Spue You Not Out", "This repeats the warning that the land can reject defilement.", ["🤢 Land spues out", "⚠️ Defilement judged", "🌍 Holiness in the land"], "The promised land is a gift, but it must not be filled with the sins God judged."),
      card("🚶 Ye Shall Not Walk In The Manners Of The Nation", "Israel must not copy the nations' way of life.", ["🚶 Walk", "🌍 Nations", "🚫 Do not copy"], "Belonging to God means the surrounding culture cannot become Israel's moral compass."),
      card("🥛 A Land That Floweth With Milk And Honey", "This phrase describes the goodness of the land God gives.", ["🥛 Milk", "🍯 Honey", "🎁 Gift from God"], "The land is generous, but Israel must live there as a holy people."),
      card("🧼 Put Difference Between Clean Beasts And Unclean", "God trains Israel to make distinctions.", ["🧼 Clean", "⚠️ Unclean", "🧭 Discernment"], "Ritual distinctions teach Israel that holiness requires noticing what God separates."),
      card("🕊️ Ye Shall Be Holy Unto Me", "This phrase makes holiness personal.", ["🕊️ Holy", "🙌 Unto the LORD", "🤝 Belonging"], "Israel is not holy to look impressive. Israel is holy to God."),
      card("🤲 That Ye Should Be Mine", "This is the heart of the chapter.", ["🤲 God's possession", "❤️ Covenant belonging", "🕊️ Set apart"], "Holiness is not only about what Israel avoids. It is about whom Israel belongs to."),
    ],
  },
  {
    chapter: 20,
    startVerse: 27,
    endVerse: 27,
    reference: "Leviticus 20:27",
    title: "A Final Warning Against Occult Power",
    icon: "🔮",
    phrases: [
      card("🧍 A Man Also Or Woman", "The warning applies to both men and women.", ["🧍 Man", "🧍‍♀️ Woman", "⚖️ Same accountability"], "No person in Israel is free to practice forbidden spiritual power."),
      card("🔮 Hath A Familiar Spirit", "This phrase describes someone connected to forbidden spiritual practices.", ["🔮 Familiar spirit", "🚫 False source", "💔 Spiritual danger"], "God's people must not seek spiritual contact apart from Him."),
      card("🧙 Or That Is A Wizard", "The wizard is another form of forbidden occult practice.", ["🧙 Wizard", "⚠️ Forbidden guidance", "🚫 Not the LORD"], "The chapter ends where it began: Israel must not chase spiritual power outside God's word."),
      card("🩸 Their Blood Shall Be Upon Them", "This phrase places responsibility on the offenders.", ["🩸 Guilt", "⚖️ Consequence", "🚫 Rebellion owned"], "The final line reminds Israel that occult rebellion is not harmless curiosity. It is serious covenant unfaithfulness."),
    ],
  },
];

export const LEVITICUS_17_20_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = RAW_LEVITICUS_17_20_PERSONAL_SECTIONS.map(polishDay36Section);
