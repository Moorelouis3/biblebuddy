import { BIBLE_YEAR_DAY_THIRTY_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyDeepNotes";
import { BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_STUDY_SECTIONS } from "./bibleYearDayThirtyOneDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyNineDeepNotes";

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

const RAW_EXODUS_31_40_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  {
    chapter: 31,
    startVerse: 1,
    endVerse: 11,
    reference: "Exodus 31:1-11",
    title: "Bezalel And Oholiab Are Filled With Skill",
    icon: "🛠️",
    phrases: [
      phrase("👤 See, I Have Called By Name", ["God names Bezalel personally.", "The craftsman is not a random worker.", "👤 Called by name", "🛠️ Assigned work", "🏕️ Holy purpose", "God sees skilled makers as part of His worship plan."]),
      phrase("🕊️ Filled Him With The Spirit Of God", ["This Spirit-filling is for craftsmanship.", "That matters.", "🕊️ Spirit of God", "🧠 Wisdom", "🛠️ Workmanship", "The first explicit Spirit-filling in Exodus is tied to making holy things with skill."]),
      phrase("🧠 Wisdom, Understanding, And Knowledge", ["Skill is described as wisdom from God.", "Craft is not treated as spiritually small.", "🧠 Wisdom", "👀 Understanding", "📚 Knowledge", "The tabernacle requires minds, hands, and hearts shaped by God."]),
      phrase("🎨 To Devise Cunning Works", ["Bezalel is gifted for design.", "Holy beauty requires imagination under God's command.", "🎨 Design", "🛠️ Craft", "✨ Beauty", "Creativity can be obedience when it follows God's pattern."]),
      phrase("🤝 I Have Given With Him Aholiab", ["Bezalel is not alone.", "God provides co-laborers.", "🤝 Partnership", "🛠️ Shared work", "🏕️ One sanctuary", "Holy work is often a team calling, not a solo performance."]),
      phrase("🧡 In The Hearts Of All That Are Wise Hearted", ["God gives wisdom to many workers.", "The tabernacle is built through a community of gifted people.", "🧡 Wise hearts", "👥 Many workers", "🛠️ Shared skill", "God distributes ability for the sake of worship."]),
    ],
  },
  {
    chapter: 31,
    startVerse: 12,
    endVerse: 18,
    reference: "Exodus 31:12-18",
    title: "Sabbath Sign And Stone Tablets",
    icon: "🛑",
    phrases: [
      phrase("🛑 My Sabbaths Ye Shall Keep", ["Even tabernacle work must stop for Sabbath.", "Holy work does not erase holy rest.", "🛑 Sabbath", "🛠️ Work paused", "🙏 Trust", "The God who commands skilled labor also commands rest."]),
      phrase("📍 A Sign Between Me And You", ["Sabbath marks covenant belonging.", "Israel's time belongs to the LORD.", "📍 Sign", "👥 Generations", "🧠 Remembering God", "Rest becomes a visible marker that Israel is not Pharaoh's slave people anymore."]),
      phrase("🧼 That Ye May Know That I Am The Lord That Doth Sanctify You", ["God is the One who sanctifies His people.", "Sabbath reminds Israel that holiness is received from Him.", "🧼 Sanctified", "👑 The LORD", "🛑 Rest", "They stop because God is their Maker and Sanctifier."]),
      phrase("🌍 In Six Days The Lord Made Heaven And Earth", ["Sabbath reaches back to creation.", "Israel's weekly rhythm reflects God's own pattern.", "🌍 Creation", "📅 Six days", "😌 Rested", "The redeemed life is rooted in the Creator's order."]),
      phrase("🪨 Two Tables Of Testimony", ["The stone tablets carry God's covenant testimony.", "These are not human suggestions.", "🪨 Stone", "📜 Testimony", "👑 Divine authority", "Israel receives words written by God."]),
      phrase("☝️ Written With The Finger Of God", ["The tablets are written by God's finger.", "This gives the commandments divine weight.", "☝️ Finger of God", "📜 Written word", "🔥 Holy authority", "The same God who showed power in Egypt now gives His people covenant instruction."]),
    ],
  },
  {
    chapter: 32,
    startVerse: 1,
    endVerse: 14,
    reference: "Exodus 32:1-14",
    title: "The Golden Calf And Moses' Plea",
    icon: "🐂",
    phrases: [
      phrase("⏳ Moses Delayed", ["The people see delay and panic.", "Waiting exposes the heart.", "⏳ Delay", "😟 Fear", "🐂 Idolatry forming", "Their problem is not that Moses is gone too long; it is that trust collapses while they wait."]),
      phrase("🐂 Make Us Gods", ["The people demand something visible to go before them.", "They want worship they can control.", "🐂 Visible god", "👁️ Manageable worship", "💔 Covenant betrayal", "This is the opposite of waiting for the unseen LORD."]),
      phrase("💍 Break Off The Golden Earrings", ["The gold given by Egypt becomes material for an idol.", "A gift connected to deliverance is twisted into rebellion.", "💍 Gold", "🐂 Calf", "💔 Corrupted gift", "Blessing can be misused when hearts turn from God."]),
      phrase("🗣️ These Be Thy Gods, O Israel", ["The people attach Exodus rescue language to an idol.", "That is spiritual corruption.", "🗣️ Religious words", "🐂 False image", "🔓 True rescue stolen", "False worship can use true-sounding language while betraying the LORD."]),
      phrase("🎉 Rose Up To Play", ["The worship becomes a feast of rebellion.", "The scene is not harmless celebration.", "🎉 Feast", "🐂 Idol", "💔 Covenant broken", "They are celebrating near Sinai while violating the God of Sinai."]),
      phrase("⚠️ Thy People Have Corrupted Themselves", ["God names the sin truthfully.", "The people have turned aside quickly.", "⚠️ Corruption", "🔁 Turned aside", "🐂 Molten calf", "Idolatry is not a small mistake; it corrupts the covenant relationship."]),
      phrase("🙏 Moses Besought The Lord", ["Moses intercedes for the people.", "He appeals to God's name, rescue, and promise.", "🙏 Intercession", "📜 Promise", "🌍 God's reputation", "Moses does not excuse the sin, but he pleads from who God is."]),
      phrase("📜 Remember Abraham, Isaac, And Israel", ["Moses appeals to covenant promises.", "Israel's hope rests on God's faithfulness.", "📜 Patriarchs", "🌟 Seed", "🏞️ Land", "When the people fail, Moses pleads the promise God made before they existed."]),
    ],
  },
  {
    chapter: 32,
    startVerse: 15,
    endVerse: 35,
    reference: "Exodus 32:15-35",
    title: "The Tablets Are Broken",
    icon: "💔",
    phrases: [
      phrase("🪨 Tables Written On Both Their Sides", ["Moses carries God's covenant testimony down the mountain.", "The written words meet a camp already breaking them.", "🪨 Tablets", "📜 God's writing", "🐂 Idol below", "The contrast is painful and deliberate."]),
      phrase("💔 He Cast The Tables Out Of His Hands", ["The broken tablets visibly show the broken covenant.", "Israel has shattered what they just promised to keep.", "💔 Broken tablets", "🐂 Golden calf", "⚖️ Covenant violation", "The action makes the spiritual reality visible."]),
      phrase("🔥 Burnt It In The Fire", ["Moses destroys the calf.", "The idol is not preserved as art or memory.", "🔥 Burned", "🪨 Ground to powder", "🚫 No compromise", "False gods must be destroyed, not managed."]),
      phrase("🗣️ What Did This People Unto Thee", ["Moses confronts Aaron.", "Leadership failure matters.", "🗣️ Question", "👥 People", "⚠️ Aaron's failure", "Aaron does not get to hide behind the crowd."]),
      phrase("🪓 Consecrate Yourselves Today", ["The crisis demands public allegiance to the LORD.", "Judgment enters the camp.", "🪓 Separation", "⚖️ Judgment", "🔥 Holiness", "The golden calf is not treated as harmless confusion."]),
      phrase("🗣️ This People Have Sinned A Great Sin", ["Moses confesses the sin plainly before God.", "True intercession does not minimize guilt.", "🗣️ Confession", "🐂 Idol", "💔 Great sin", "Mercy is sought in truth, not denial."]),
      phrase("📖 Blot Me, I Pray Thee, Out Of Thy Book", ["Moses offers himself for the people.", "He cannot finally atone for them, but the plea is deeply sacrificial.", "📖 Book", "🙏 Mediator", "💔 Costly love", "The scene points forward to the need for a greater mediator."]),
      phrase("⚖️ I Will Visit Their Sin", ["God continues the story, but sin remains serious.", "Mercy does not mean the calf was imaginary.", "⚖️ Consequence", "🐂 Sin remembered", "🛡️ Journey continues", "God's mercy and justice both remain in view."]),
    ],
  },
  {
    chapter: 33,
    startVerse: 1,
    endVerse: 11,
    reference: "Exodus 33:1-11",
    title: "The Crisis Of Presence",
    icon: "⛺",
    phrases: [
      phrase("🏞️ A Land Flowing With Milk And Honey", ["The promised land is still ahead.", "But the chapter shows that the land alone is not enough.", "🏞️ Good land", "⚠️ Presence crisis", "💔 Sin's consequence", "Blessing without God's nearness would be hollow."]),
      phrase("⚠️ I Will Not Go Up In The Midst Of Thee", ["This is the crisis after the golden calf.", "God's holiness makes betrayal dangerous.", "⚠️ Warning", "👥 Stiff-necked people", "🔥 Holy God", "Sin damages nearness."]),
      phrase("😔 The People Mourned", ["Israel begins to feel the weight of what they have done.", "This is not celebration anymore.", "😔 Mourning", "💍 Ornaments removed", "💔 Conviction", "The loss of God's nearness is the real disaster."]),
      phrase("⛺ Without The Camp", ["Moses pitches the tent outside the camp.", "The location shows disrupted fellowship.", "⛺ Tent outside", "👥 Camp", "💔 Distance", "God is still meeting Moses, but the camp's sin has consequences."]),
      phrase("☁️ The Cloudy Pillar Descended", ["The cloud shows God's real presence meeting with Moses.", "Mercy is still visible.", "☁️ Cloud", "⛺ Tent", "🙏 Worship", "God has not abandoned the story."]),
      phrase("🗣️ Face To Face", ["The LORD speaks with Moses directly.", "This means close covenant communication.", "🗣️ Direct speech", "🤝 Friendship language", "🙏 Intercession", "Moses' nearness becomes crucial for the people."]),
    ],
  },
  {
    chapter: 33,
    startVerse: 12,
    endVerse: 23,
    reference: "Exodus 33:12-23",
    title: "Show Me Thy Glory",
    icon: "✨",
    phrases: [
      phrase("🧭 Shew Me Now Thy Way", ["Moses asks to know God's way.", "He needs more than a destination.", "🧭 God's way", "🙏 Prayer", "🤝 Relationship", "Moses wants guidance rooted in knowing God."]),
      phrase("🤝 My Presence Shall Go With Thee", ["God promises His presence.", "This is the answer Moses needs.", "🤝 Presence", "😌 Rest", "🧭 Journey", "God Himself is better than any travel plan."]),
      phrase("🛑 If Thy Presence Go Not With Me", ["Moses refuses to move without God.", "The land is not enough.", "🛑 Do not carry us up", "🏞️ Land not enough", "✨ Presence needed", "The greatest gift in Exodus is God with His people."]),
      phrase("✨ Shew Me Thy Glory", ["Moses asks for deeper revelation.", "He wants to know God more fully.", "✨ Glory", "🙏 Bold prayer", "👑 Divine goodness", "God answers by revealing His goodness and proclaiming His name."]),
      phrase("🤲 I Will Make All My Goodness Pass Before Thee", ["God connects His glory with His goodness.", "Glory is not raw brightness only.", "🤲 Goodness", "📣 Name proclaimed", "🕊️ Mercy", "God reveals His character, not just a spectacle."]),
      phrase("🪨 A Clift Of The Rock", ["God hides Moses in the rock while revealing Himself.", "Revelation comes with protection.", "🪨 Rock", "✋ Covered by God", "👀 Limited sight", "Even Moses cannot handle the full unveiled glory of God."]),
    ],
  },
  {
    chapter: 34,
    startVerse: 1,
    endVerse: 9,
    reference: "Exodus 34:1-9",
    title: "The Lord Proclaims His Name",
    icon: "📣",
    phrases: [
      phrase("🪨 Hew Thee Two Tables Of Stone", ["New tablets show covenant renewal.", "God does not pretend the first tablets were never broken.", "🪨 New tablets", "💔 Broken covenant", "🤲 Mercy", "The relationship continues by God's mercy."]),
      phrase("☁️ The Lord Descended In The Cloud", ["God comes down again.", "The cloud marks holy presence.", "☁️ Cloud", "⛰️ Mountain", "📣 Name proclaimed", "God meets Moses with revelation after failure."]),
      phrase("📣 The Lord, The Lord God", ["God proclaims His own name.", "This is one of the Bible's clearest self-revelations.", "📣 Name", "👑 The LORD", "✨ Character revealed", "God tells Moses who He is."]),
      phrase("🕊️ Merciful And Gracious", ["Mercy is not forced out of God.", "It belongs to His character.", "🕊️ Merciful", "🤲 Gracious", "⏳ Longsuffering", "After the calf, this revelation is breathtaking."]),
      phrase("📜 Keeping Mercy For Thousands", ["God's mercy reaches far beyond the immediate failure.", "His covenant love is abundant.", "📜 Mercy kept", "👥 Thousands", "🤲 Forgiveness", "Israel's hope rests on God's overflowing covenant mercy."]),
      phrase("⚖️ By No Means Clear The Guilty", ["God's mercy is not moral carelessness.", "He forgives, but He is just.", "⚖️ Justice", "🚫 Guilt not ignored", "🔥 Holiness", "The LORD is merciful and righteous together."]),
      phrase("🙇 Moses Made Haste", ["Moses quickly bows and worships.", "Revelation of God's name leads to humility.", "🙇 Worship", "⛰️ Bowed to earth", "🙏 Plea for presence", "True theology turns into worship and prayer."]),
    ],
  },
  {
    chapter: 34,
    startVerse: 10,
    endVerse: 35,
    reference: "Exodus 34:10-35",
    title: "The Covenant Is Renewed",
    icon: "🤝",
    phrases: [
      phrase("🤝 Behold, I Make A Covenant", ["God renews covenant after the calf.", "Mercy leads back into obedience.", "🤝 Covenant", "✨ Marvels", "👥 People", "God's forgiveness restores relationship and responsibility."]),
      phrase("🚫 Thou Shalt Worship No Other God", ["This warning lands hard after the golden calf.", "Israel must not mix worship.", "🚫 No other god", "🐂 Calf memory", "🙏 Exclusive loyalty", "The renewed covenant directly confronts their recent failure."]),
      phrase("🔥 Whose Name Is Jealous", ["God's jealousy is holy covenant love.", "He will not share His people with idols that destroy them.", "🔥 Jealous", "🤝 Covenant", "🚫 Idols", "God's jealousy protects the relationship He alone deserves."]),
      phrase("📅 The Feast Of Unleavened Bread Shalt Thou Keep", ["The renewed covenant returns Israel to rescue-memory.", "They must remember the night God brought them out.", "📅 Feast", "🍞 Unleavened bread", "🧠 Remember Exodus", "After idolatry, God calls them back to the story of mercy."]),
      phrase("🛑 Six Days Thou Shalt Work", ["Sabbath is repeated again.", "Even busy seasons bow to God's rhythm.", "🛑 Sabbath", "🌾 Harvest", "🙏 Trust", "Covenant renewal includes renewed rest."]),
      phrase("⏳ Forty Days And Forty Nights", ["Moses remains with the LORD again.", "The waiting is repeated, but this time the outcome is renewed covenant.", "⏳ Forty days", "🍞 No bread", "💧 No water", "God sustains Moses in the place of intercession and revelation."]),
      phrase("🌟 The Skin Of His Face Shone", ["Moses' face shines after speaking with God.", "Nearness changes him visibly.", "🌟 Shining face", "🗣️ God's word", "😨 People afraid", "The mediator carries reflected glory from God's presence."]),
      phrase("🧣 Moses Put The Vail Upon His Face", ["Moses veils his face when speaking to the people.", "The glory is real and weighty.", "🧣 Veil", "🌟 Glory", "👥 People", "Even reflected glory must be handled with reverence."]),
    ],
  },
  {
    chapter: 35,
    startVerse: 1,
    endVerse: 19,
    reference: "Exodus 35:1-19",
    title: "Sabbath And Willing Gifts",
    icon: "🤲",
    phrases: [
      phrase("🛑 Six Days Shall Work Be Done", ["Sabbath is repeated before construction begins.", "Holy work still stops for holy rest.", "🛑 Sabbath", "🛠️ Work", "🔥 No fire kindled", "Obedience in building starts with obedience in resting."]),
      phrase("🤲 Whosoever Is Of A Willing Heart", ["The tabernacle offering comes from willing hearts.", "God's dwelling is not funded like Pharaoh's forced projects.", "🤲 Willing heart", "🏕️ Tabernacle", "💛 Free gift", "This is the opposite of Egypt's coerced labor."]),
      phrase("🧵 Blue, Purple, And Scarlet", ["The materials are named again.", "The people bring what is needed for beauty and holiness.", "🧵 Colors", "✨ Beauty", "🏕️ Holy dwelling", "Every material has a place in God's pattern."]),
      phrase("🫒 Oil For The Light", ["The offering includes oil for the lamp.", "The people contribute to ongoing holy service.", "🫒 Oil", "🕯️ Light", "⏳ Continual worship", "Their gifts will help keep light burning before the LORD."]),
      phrase("💎 Onyx Stones", ["Precious stones are brought for priestly garments.", "The people provide what will carry their names before God.", "💎 Stones", "👕 Ephod", "❤️ Breastplate", "Their gifts become part of representation before the LORD."]),
      phrase("🧠 Every Wise Hearted Among You", ["Skilled workers are called to make what God commanded.", "Wisdom becomes action.", "🧠 Wise hearts", "🛠️ Work", "📐 Pattern", "The tabernacle is built by willing gifts and wise labor together."]),
    ],
  },
  {
    chapter: 35,
    startVerse: 20,
    endVerse: 35,
    reference: "Exodus 35:20-35",
    title: "The People Bring And The Workers Build",
    icon: "🛠️",
    phrases: [
      phrase("💛 Every One Whose Heart Stirred Him Up", ["The giving comes from stirred hearts.", "The people respond freely.", "💛 Stirred heart", "🤲 Willing spirit", "🏕️ Offering", "God's dwelling is supplied by hearts moved toward Him."]),
      phrase("💍 Bracelets, Earrings, Rings", ["Gold jewelry is brought for the tabernacle.", "This matters after the golden calf.", "💍 Gold", "🐂 Former misuse", "🏕️ Now holy use", "The same kind of material once used for idolatry is now offered for God's dwelling."]),
      phrase("🧵 Women That Were Wise Hearted", ["Women spin materials for the tabernacle.", "Their skill is named and valued.", "🧵 Spinning", "👩 Wise hearted women", "🏕️ Holy work", "The sanctuary is built through the gifts of the whole community."]),
      phrase("👑 The Rulers Brought Onyx Stones", ["Leaders bring costly stones and spices.", "Their resources serve worship.", "👑 Rulers", "💎 Stones", "🌿 Spices", "Leadership gives toward God's presence, not self-display."]),
      phrase("🕊️ The Spirit Of God", ["Bezalel is filled with the Spirit for craftsmanship.", "Skill is spiritual service.", "🕊️ Spirit", "🧠 Wisdom", "🎨 Workmanship", "God's Spirit equips hands as well as mouths."]),
      phrase("📚 To Teach", ["Bezalel and Oholiab can teach others.", "Skill multiplies through instruction.", "📚 Teaching", "🛠️ Craft", "👥 Community", "God gives wisdom that can be shared and passed on."]),
    ],
  },
  {
    chapter: 36,
    startVerse: 1,
    endVerse: 7,
    reference: "Exodus 36:1-7",
    title: "More Than Enough",
    icon: "📦",
    phrases: [
      phrase("🛠️ Every Wise Hearted Man", ["The skilled workers begin the work.", "They do what the LORD commanded.", "🛠️ Skill", "🧠 Wisdom", "📐 God's pattern", "The tabernacle moves from instruction to faithful construction."]),
      phrase("🎒 They Brought Yet Unto Him Free Offerings Every Morning", ["The people keep bringing gifts.", "Their willingness overflows.", "🎒 Morning gifts", "🤲 Free offerings", "💛 Generous hearts", "After the golden calf, this generosity is a sign of renewed obedience."]),
      phrase("🛑 The People Bring Much More Than Enough", ["The workers have to stop the giving.", "That is a beautiful reversal.", "🛑 Stop bringing", "📦 More than enough", "🏕️ Work supplied", "God's dwelling is not lacking because the people respond freely."]),
      phrase("📣 Let Neither Man Nor Woman Make Any More Work", ["Moses restrains the offering because the supply is enough.", "Generosity is ordered, not chaotic.", "📣 Command", "🤲 Giving paused", "📦 Enough", "Even abundance is stewarded wisely."]),
    ],
  },
  {
    chapter: 36,
    startVerse: 8,
    endVerse: 38,
    reference: "Exodus 36:8-38",
    title: "The Tabernacle Is Made",
    icon: "🧵",
    phrases: [
      phrase("🧵 Fine Twined Linen", ["The workers make the curtains as commanded.", "Beauty and obedience come together.", "🧵 Linen", "🎨 Colors", "🪽 Cherubim", "The dwelling begins to take visible form."]),
      phrase("🔗 Coupled The Curtains One Unto Another", ["Separate curtains are joined into one tabernacle.", "The pieces belong together.", "🔗 Loops", "✨ Clasps", "🏕️ One tent", "Faithful construction makes many parts into one holy dwelling."]),
      phrase("🐐 Curtains Of Goats' Hair", ["The outer tent coverings are made.", "The dwelling needs protection as well as beauty.", "🐐 Goats' hair", "🏕️ Tent", "🛡️ Covering", "God's design includes both glory and durability."]),
      phrase("🪵 Boards For The Tabernacle", ["The frames provide structure.", "Holy space is stable and ordered.", "🪵 Boards", "🥈 Sockets", "📐 Measurements", "Obedience shows up in exact, patient work."]),
      phrase("🚪 A Vail", ["The veil is made with cherubim.", "It marks the boundary of the most holy place.", "🚪 Veil", "🪽 Cherubim", "🔥 Guarded nearness", "God is dwelling near, but His holiness remains weighty."]),
      phrase("🌈 An Hanging For The Door", ["The entrance hanging is made with colored yarn and needlework.", "Approach to God is marked by beauty.", "🌈 Blue, purple, scarlet", "🚪 Door", "🎨 Needlework", "Even the doorway teaches ordered access."]),
    ],
  },
  {
    chapter: 37,
    startVerse: 1,
    endVerse: 16,
    reference: "Exodus 37:1-16",
    title: "The Ark And Table Are Made",
    icon: "📦",
    phrases: [
      phrase("📦 Bezaleel Made The Ark", ["The ark is constructed according to the instructions.", "The central covenant furniture is now made.", "📦 Ark", "🪵 Wood", "👑 Gold", "God's commanded pattern becomes visible obedience."]),
      phrase("🩸 The Mercy Seat", ["The mercy seat is made of pure gold.", "It belongs above the ark.", "🩸 Mercy seat", "📦 Ark", "🪽 Cherubim", "The place of meeting and atonement is crafted carefully."]),
      phrase("🪽 Cherubims Spread Out Their Wings", ["The cherubim overshadow the mercy seat.", "The image marks holy, guarded presence.", "🪽 Wings", "🩸 Mercy", "🔥 Holiness", "Mercy is real, but it is holy mercy."]),
      phrase("🍞 The Table", ["The table for the bread is made.", "Provision and fellowship have a place in the sanctuary.", "🍞 Table", "👑 Gold", "🏕️ Holy place", "God's dwelling includes continual remembrance of provision."]),
      phrase("🥣 Dishes, Spoons, Bowls", ["The table utensils are made too.", "Small service pieces matter.", "🥣 Utensils", "🍞 Table service", "🛠️ Obedience", "The details are part of faithful worship."]),
    ],
  },
  {
    chapter: 37,
    startVerse: 17,
    endVerse: 29,
    reference: "Exodus 37:17-29",
    title: "Lampstand And Incense Altar Are Made",
    icon: "🕯️",
    phrases: [
      phrase("🕯️ The Candlestick Of Pure Gold", ["The lampstand is made from pure gold.", "Holy light is given a beautiful crafted form.", "🕯️ Lampstand", "👑 Gold", "🏕️ Holy place", "The sanctuary is not dark; God provides light for service."]),
      phrase("🌸 Bowls Made Like Almonds", ["The lampstand includes blossom-like design.", "Creation beauty is woven into holy worship.", "🌸 Almond bowls", "🎨 Beauty", "🕯️ Light", "God's worship space includes artistry, not bare utility."]),
      phrase("7️⃣ Seven Lamps", ["The seven lamps are made for the lampstand.", "The light is full and ordered.", "7️⃣ Lamps", "🔥 Light", "🙏 Service", "Holy service happens in God-given light."]),
      phrase("🌫️ The Incense Altar", ["The incense altar is made of wood overlaid with gold.", "Fragrance has a holy place.", "🌫️ Incense", "🔥 Altar", "🙏 Worship", "The sanctuary includes rising fragrance before the LORD."]),
      phrase("🫒 The Holy Anointing Oil", ["The oil is prepared as commanded.", "It will mark people and things as holy.", "🫒 Oil", "✨ Consecration", "🏕️ Holy service", "What belongs to God is set apart."]),
      phrase("🌿 The Pure Incense Of Sweet Spices", ["The incense is made from sweet spices.", "Its fragrance belongs to worship alone.", "🌿 Spices", "🌫️ Incense", "🙏 Holy use", "Even scent is brought under God's holiness."]),
    ],
  },
  {
    chapter: 38,
    startVerse: 1,
    endVerse: 20,
    reference: "Exodus 38:1-20",
    title: "The Altar, Laver, And Court Are Made",
    icon: "🔥",
    phrases: [
      phrase("🔥 The Altar Of Burnt Offering", ["The altar is built for sacrifice.", "Approach to God requires atonement.", "🔥 Altar", "🩸 Sacrifice", "🏕️ Court", "The courtyard begins with the place where offerings rise."]),
      phrase("🥉 All The Vessels Of The Altar", ["The altar tools are made of brass.", "Practical service is part of holy worship.", "🥉 Vessels", "🔥 Fire", "🛠️ Priestly work", "The details support the daily work of sacrifice."]),
      phrase("💧 The Laver Of Brass", ["The laver is made for washing.", "Priestly service requires cleansing.", "💧 Laver", "👐 Hands", "🦶 Feet", "The priests must be washed before serving near the LORD."]),
      phrase("🪞 Lookingglasses Of The Women", ["The laver is made from mirrors given by women who served.", "Their gifts become part of priestly cleansing.", "🪞 Mirrors", "👩 Women serving", "💧 Laver", "Personal objects are transformed into holy service."]),
      phrase("🏕️ The Court", ["The court is built around the tabernacle.", "Boundaries define the place of approach.", "🏕️ Court", "🧵 Hangings", "📐 Measurements", "God gives His people ordered space for worship."]),
      phrase("🥉 Pins Of Brass", ["Even the pins are counted in the construction.", "Small pieces hold the court in place.", "🥉 Pins", "🏕️ Stability", "🛠️ Faithfulness", "Little parts matter when they serve God's dwelling."]),
    ],
  },
  {
    chapter: 38,
    startVerse: 21,
    endVerse: 31,
    reference: "Exodus 38:21-31",
    title: "The Materials Are Counted",
    icon: "🧾",
    phrases: [
      phrase("🧾 This Is The Sum", ["The materials are counted.", "Holy work includes honest accounting.", "🧾 Sum", "🥇 Gold", "🥈 Silver", "Faithful worship includes transparent stewardship."]),
      phrase("👥 By The Hand Of Ithamar", ["Ithamar oversees the accounting of tabernacle materials.", "Priestly service includes administration.", "👥 Ithamar", "🧾 Records", "🏕️ Tabernacle", "God's work needs trustworthy handling."]),
      phrase("🛠️ Bezaleel Made All", ["Bezalel's obedience is named again.", "The craftsman completes what God commanded.", "🛠️ Bezalel", "📐 Commanded pattern", "✅ Faithful work", "Skill becomes worship through obedience."]),
      phrase("🥈 A Bekah For Every Man", ["The silver comes from the numbered people.", "Each life is represented equally.", "🥈 Silver", "👤 Every man", "⚖️ Same amount", "The tabernacle sockets are literally grounded in ransom silver."]),
      phrase("🏕️ Sockets Of The Sanctuary", ["The silver is used for the sanctuary sockets.", "Atonement money supports the dwelling structure.", "🏕️ Sanctuary", "🥈 Silver sockets", "📜 Memorial", "Redemption undergirds the place where God dwells with His people."]),
      phrase("🥉 Brass Of The Offering", ["The brass is counted and used for altar, sockets, and pins.", "Every material is assigned.", "🥉 Brass", "🔥 Altar", "🏕️ Court", "Nothing given to God disappears into vagueness. It is stewarded."]),
    ],
  },
  {
    chapter: 39,
    startVerse: 1,
    endVerse: 31,
    reference: "Exodus 39:1-31",
    title: "The Priestly Garments Are Made",
    icon: "👕",
    phrases: [
      phrase("👕 Cloths Of Service", ["The priestly garments are made for service in the holy place.", "They are not costumes.", "👕 Garments", "🙏 Service", "✨ Holy place", "The clothing fits the weight of priestly ministry."]),
      phrase("💎 Onyx Stones", ["The stones carry Israel's names.", "The priest bears the people before God.", "💎 Stones", "👥 Names", "💪 Shoulders", "Representation is built into the garments."]),
      phrase("❤️ The Breastplate", ["The breastplate carries the names over the heart.", "Priestly representation is close and personal.", "❤️ Heart", "👥 Tribes", "⚖️ Judgment", "The priest brings the people before God, not as numbers only, but as named tribes."]),
      phrase("🔗 Chains At The Ends", ["The breastplate is fastened carefully.", "The holy garments are secure and ordered.", "🔗 Chains", "💎 Breastplate", "🛠️ Detail", "Faithfulness appears in small connections too."]),
      phrase("🔔 Bells And Pomegranates", ["The robe includes bells and pomegranates.", "Sound and symbol belong to priestly service.", "🔔 Bells", "🍎 Pomegranates", "👕 Robe", "The priest's movement in service is marked and meaningful."]),
      phrase("✨ Holiness To The Lord", ["The gold plate is made for the holy crown.", "The priest is marked as belonging to the LORD.", "✨ Holiness", "👑 Crown", "🙏 Ministry", "Service before God is holy identity, not personal status."]),
      phrase("✅ As The Lord Commanded Moses", ["This phrase repeats again and again.", "The garments are made by obedience, not invention.", "✅ As commanded", "📜 God's word", "🛠️ Faithful work", "This is the opposite of the golden calf."]),
    ],
  },
  {
    chapter: 39,
    startVerse: 32,
    endVerse: 43,
    reference: "Exodus 39:32-43",
    title: "Moses Inspects The Finished Work",
    icon: "✅",
    phrases: [
      phrase("🏁 Thus Was All The Work Finished", ["The tabernacle work reaches completion.", "What God commanded has been made.", "🏁 Finished work", "🏕️ Tabernacle", "🛠️ Obedience", "The long list of details becomes a completed dwelling."]),
      phrase("📦 They Brought The Tabernacle Unto Moses", ["The completed pieces are brought for inspection.", "The work is not assumed; it is examined.", "📦 Brought to Moses", "👀 Inspection", "📐 Pattern checked", "Faithful work can be looked at closely."]),
      phrase("👀 Moses Did Look Upon All The Work", ["Moses inspects the work.", "Obedience is concrete enough to see.", "👀 Looked", "✅ As commanded", "🛠️ All the work", "The people did not merely mean well; they made what God said."]),
      phrase("✅ They Had Done It", ["The repeated obedience is confirmed.", "After the golden calf, this matters deeply.", "✅ Done", "📜 As commanded", "💔 Failure answered by obedience", "The people who failed in worship now complete worship according to God's word."]),
      phrase("🙌 Moses Blessed Them", ["Moses blesses the workers after faithful completion.", "Their willing work has become worship.", "🙌 Blessing", "🛠️ Faithful labor", "🏕️ God's dwelling", "God's people are blessed in obedient service."]),
    ],
  },
  {
    chapter: 40,
    startVerse: 1,
    endVerse: 16,
    reference: "Exodus 40:1-16",
    title: "The Tabernacle Is Set Up",
    icon: "📅",
    phrases: [
      phrase("📅 The First Day Of The First Month", ["The tabernacle is set up at a new beginning.", "Israel's worship life is being ordered around God's dwelling.", "📅 First day", "🏕️ Tabernacle", "✨ New stage", "The calendar now holds the reality of God's presence among them."]),
      phrase("📦 Put Therein The Ark", ["The ark is placed inside the tabernacle.", "The covenant testimony belongs at the center.", "📦 Ark", "📜 Testimony", "🚪 Veil", "God's word and mercy are central to His dwelling."]),
      phrase("🍞 Bring In The Table", ["The holy furniture is arranged as commanded.", "Each piece has its place.", "🍞 Table", "🕯️ Lampstand", "🌫️ Incense altar", "God's house is ordered by His word."]),
      phrase("🫒 Anoint The Tabernacle", ["The tabernacle and its contents are anointed.", "They are set apart as holy.", "🫒 Oil", "✨ Consecration", "🏕️ Dwelling", "What belongs to God's service is not common."]),
      phrase("🧼 Wash Them With Water", ["Aaron and his sons are washed.", "Priestly ministry begins with cleansing.", "🧼 Washing", "👥 Priests", "🙏 Service", "No one serves near God's presence by natural worthiness."]),
      phrase("👕 Put Upon Aaron The Holy Garments", ["Aaron is clothed for priestly service.", "The garments mark his role before God.", "👕 Holy garments", "👑 Priesthood", "🙏 Ministry", "The priest stands before God in what God provided."]),
      phrase("✅ Thus Did Moses", ["Moses obeys all that the LORD commanded.", "The setup is faithful, not improvised.", "✅ Moses obeyed", "📜 Command", "🏕️ Tabernacle raised", "Exodus slows down so we feel the beauty of careful obedience."]),
    ],
  },
  {
    chapter: 40,
    startVerse: 17,
    endVerse: 33,
    reference: "Exodus 40:17-33",
    title: "Moses Finishes The Work",
    icon: "🏁",
    phrases: [
      phrase("🏕️ Moses Reared Up The Tabernacle", ["The dwelling is finally raised.", "The instructions become a visible tent among the people.", "🏕️ Raised tabernacle", "📐 Sockets and boards", "🛠️ Work completed", "God's commanded dwelling now stands in the camp."]),
      phrase("📦 He Took And Put The Testimony Into The Ark", ["The testimony is placed inside the ark.", "God's covenant word is at the heart of the dwelling.", "📦 Ark", "📜 Testimony", "🩸 Mercy seat above", "God's presence among Israel is tied to His covenant word."]),
      phrase("🚪 He Put Up The Vail", ["The veil is set in place.", "The most holy place is guarded.", "🚪 Veil", "📦 Ark hidden", "🔥 Holy boundary", "Nearness and holiness remain together."]),
      phrase("🕯️ He Lighted The Lamps", ["The lamps are lit before the LORD.", "Holy service begins in light.", "🕯️ Lamps", "✨ Holy place", "👀 Before the LORD", "The sanctuary is not left dark."]),
      phrase("🌫️ He Burnt Sweet Incense", ["Incense rises on the golden altar.", "The holy place is filled with commanded fragrance.", "🌫️ Incense", "🔥 Altar", "🙏 Before the LORD", "Worship begins according to God's pattern."]),
      phrase("💧 He Set The Laver", ["The laver is placed for washing.", "Cleansing remains necessary in service.", "💧 Laver", "👐 Washing", "🔥 Altar service", "The priests must keep coming clean before serving."]),
      phrase("🏁 So Moses Finished The Work", ["The work reaches completion.", "What began in command ends in obedience.", "🏁 Finished", "✅ As commanded", "🏕️ Dwelling ready", "The stage is set for glory to fill the tabernacle."]),
    ],
  },
  {
    chapter: 40,
    startVerse: 34,
    endVerse: 38,
    reference: "Exodus 40:34-38",
    title: "The Glory Fills The Tabernacle",
    icon: "☁️",
    phrases: [
      phrase("☁️ The Cloud Covered The Tent", ["The cloud covers the tent of meeting.", "God's presence visibly comes to the completed dwelling.", "☁️ Cloud", "🏕️ Tent", "✨ Presence", "The God who led Israel now fills the place He commanded them to build."]),
      phrase("✨ The Glory Of The Lord Filled The Tabernacle", ["This is the climax of Exodus.", "The LORD dwells among the people He rescued.", "✨ Glory", "🏕️ Tabernacle filled", "👥 God among Israel", "Redemption aims at presence."]),
      phrase("🚫 Moses Was Not Able To Enter", ["Even Moses cannot casually enter when glory fills the tent.", "God's nearness remains weighty.", "🚫 Cannot enter", "✨ Glory", "🔥 Holiness", "The ending is beautiful and reverent, not casual."]),
      phrase("🧭 When The Cloud Was Taken Up", ["The cloud guides Israel's journeys.", "God's presence directs movement.", "🧭 Guidance", "☁️ Cloud lifted", "🚶 Journey", "The people move when God moves."]),
      phrase("🛑 If The Cloud Were Not Taken Up", ["Israel stays when the cloud stays.", "Guidance includes waiting.", "🛑 Stay", "☁️ Cloud resting", "⏳ Waiting", "Faith follows God's pace, not only God's direction."]),
      phrase("🔥 Fire Was On It By Night", ["The cloud has fire by night.", "God gives visible presence in darkness.", "🔥 Fire", "🌙 Night", "👥 All Israel sees", "Exodus ends with the people still on a journey, but not alone."]),
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
    "This phrase matters because Exodus is now focused on God's presence with His people.",
    "The tabernacle, Sabbath, golden calf, mercy, offerings, and construction details all show what nearness to a holy God requires.",
    "⛺ Dwelling",
    "🐂 False worship",
    "☁️ Glory",
    "🛠️ Obedient work",
    "The detail helps a beginner see the difference between worship shaped by God's word and worship shaped by human fear.",
  ]);
}

function makeBeginnerExodusPhrase(title: string, section: PersonalExodusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the worship scene is easier to follow.`,
    focus,
    "For a beginner, the key is to ask what this detail shows about worship, idolatry, intercession, God's presence, or obedience after failure.",
    "Exodus is teaching how a holy God can dwell with a rescued but sinful people.",
    "🪨 Tablets",
    "⛺ Tabernacle",
    "☁️ Presence",
    "🙌 Mercy",
    `In ${section.title}, the detail helps explain worship God's way instead of worship controlled by human fear.`,
  ]);
}

function ensureBeginnerExodusPhraseDepth(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerExodusPhrase("🧭 What Is Happening Here?", section, "This phrase helps the reader locate the scene: God is either preparing holy worship, confronting false worship, renewing mercy, or building the place of His presence."),
    makeBeginnerExodusPhrase("🔎 Why This Detail Matters", section, "This detail matters because Exodus is showing the difference between worship shaped by God's word and worship shaped by human fear or impatience."),
    makeBeginnerExodusPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why materials, garments, tablets, clouds, and construction details matter, but they all point to God dwelling among His people."),
    makeBeginnerExodusPhrase("🧵 Watch The Pattern", section, "Watch the pattern: God gives a command, people either corrupt worship or obey it, Moses intercedes, and God's presence remains the greatest gift."),
    makeBeginnerExodusPhrase("❤️ What This Shows About People", section, "This scene shows that people can receive rescue and still drift into impatience, idolatry, forgetfulness, or careless worship."),
    makeBeginnerExodusPhrase("🙌 What This Shows About God", section, "This scene shows the LORD as holy, merciful, present, patient, and serious about being worshiped according to His word."),
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

const DAY_29_EXODUS_31_32_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 31:1-6": ["I Have Called By Name Bezaleel", "The Son Of Uri", "The Tribe Of Judah", "I Have Filled Him With The Spirit Of God", "In Wisdom, And In Understanding", "In All Manner Of Workmanship", "I Have Given With Him Aholiab"],
  "Exodus 31:7-11": ["The Tabernacle Of The Congregation", "The Ark Of The Testimony", "The Mercy Seat", "The Pure Candlestick", "The Altar Of Incense", "The Cloths Of Service", "According To All That I Have Commanded Thee"],
  "Exodus 31:12-17": ["Verily My Sabbaths Ye Shall Keep", "It Is A Sign Between Me And You", "That Ye May Know", "I Am The LORD That Doth Sanctify You", "Every One That Defileth It", "Six Days May Work Be Done", "The Seventh Is The Sabbath Of Rest"],
  "Exodus 31:18-18": ["Two Tables Of Testimony", "Tables Of Stone", "Written With The Finger Of God", "When He Had Made An End Of Communing"],
  "Exodus 32:1-6": ["When The People Saw That Moses Delayed", "Up, Make Us Gods", "As For This Moses", "Break Off The Golden Earrings", "He Made It A Molten Calf", "These Be Thy Gods, O Israel", "Rose Up To Play"],
  "Exodus 32:7-12": ["Go, Get Thee Down", "Thy People Have Corrupted Themselves", "They Have Turned Aside Quickly", "A Stiffnecked People", "Let Me Alone", "I May Consume Them", "Why Doth Thy Wrath Wax Hot"],
  "Exodus 32:13-14": ["Remember Abraham, Isaac, And Israel", "To Whom Thou Swarest", "I Will Multiply Your Seed", "They Shall Inherit It For Ever", "The LORD Repented Of The Evil"],
  "Exodus 32:15-20": ["The Two Tables Of The Testimony", "Written On Both Their Sides", "The Writing Was The Writing Of God", "The Noise Of War In The Camp", "He Cast The Tables Out Of His Hands", "Burnt It In The Fire", "Made The Children Of Israel Drink Of It"],
  "Exodus 32:21-26": ["What Did This People Unto Thee", "Thou Knowest The People", "They Are Set On Mischief", "There Came Out This Calf", "The People Were Naked", "Who Is On The LORD'S Side", "All The Sons Of Levi"],
  "Exodus 32:27-29": ["Thus Saith The LORD God Of Israel", "Put Every Man His Sword By His Side", "Slay Every Man His Brother", "About Three Thousand Men", "Consecrate Yourselves To Day", "That He May Bestow Upon You A Blessing"],
  "Exodus 32:30-35": ["Ye Have Sinned A Great Sin", "Peradventure I Shall Make An Atonement", "This People Have Sinned A Great Sin", "Made Them Gods Of Gold", "Blot Me, I Pray Thee, Out Of Thy Book", "Whosoever Hath Sinned Against Me", "The LORD Plagued The People"],
};

function explainExodusThirtyOneToFortyMinedPhrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("bezaleel") || lower.includes("aholiab") || lower.includes("wisdom") || lower.includes("understanding") || lower.includes("workmanship") || lower.includes("wise hearted")) {
    add(`${title} points to skill that God Himself provides.`, "The tabernacle is not built by panic, pride, or random creativity. God gives wisdom, understanding, and skilled hands for His dwelling place.", "\u{1F528} Skilled hands", "\u{1F9E0} Wisdom", "\u{1F64C} Spirit-given ability", "Craftsmanship becomes worship when it follows God's command.");
  } else if (lower.includes("sabbath") || lower.includes("six days") || lower.includes("seventh") || lower.includes("sign")) {
    add(`${title} teaches that rest is part of covenant identity.`, "Even holy work does not cancel the Sabbath. Israel must remember that they belong to the LORD, not to endless labor.", "\u{1F6D1} Rest", "\u{1F4DC} Covenant sign", "\u{1F9ED} Identity", "After slavery in Egypt, Sabbath rest teaches God's people that Pharaoh no longer owns their time.");
  } else if (lower.includes("tables") || lower.includes("stone") || lower.includes("finger of god") || lower.includes("writing")) {
    add(`${title} points to God's own covenant word.`, "The tablets are not human ideas about religion. They come from God, written as covenant testimony for His people.", "\u{1FAA8} Stone tablets", "\u{270D}\u{FE0F} God's writing", "\u{1F4DC} Covenant word", "That makes the golden calf even more serious: Israel breaks covenant while God's word is still being given.");
  } else if (lower.includes("calf") || lower.includes("gods") || lower.includes("earrings") || lower.includes("rose up to play") || lower.includes("molten")) {
    add(`${title} is part of the golden calf disaster.`, "Israel tries to make worship visible and controllable, but the result is idolatry. They use gifts from Egypt to shape a false god.", "\u{1F402} Golden calf", "\u{26A0}\u{FE0F} False worship", "\u{1F494} Covenant betrayal", "Worship becomes dangerous when people invent it instead of receiving God's way.");
  } else if (lower.includes("stiffnecked") || lower.includes("corrupted") || lower.includes("mischief") || lower.includes("naked")) {
    add(`${title} exposes the people's stubborn sin.`, "The Bible does not soften what happened. Israel was rescued by God, but their hearts could still turn quickly toward rebellion.", "\u{1F512} Stubborn heart", "\u{1F4A5} Corruption", "\u{1F622} Shame", "Mercy is needed because the covenant people cannot heal themselves.");
  } else if (lower.includes("abraham") || lower.includes("isaac") || lower.includes("israel") || lower.includes("swarest") || lower.includes("multiply") || lower.includes("inherit")) {
    add(`${title} shows Moses praying from God's promises.`, "Moses does not pretend Israel deserves mercy. He appeals to God's covenant with Abraham, Isaac, and Jacob.", "\u{1F4DC} Promise remembered", "\u{1F64F} Intercession", "\u{1F3DE}\u{FE0F} Inheritance", "This helps a beginner see prayer rooted in who God is and what God has promised.");
  } else if (lower.includes("atonement") || lower.includes("blot me") || lower.includes("book") || lower.includes("plagued")) {
    add(`${title} shows the seriousness of sin and the need for a mediator.`, "Moses stands between guilty Israel and the holy LORD, but even Moses cannot erase sin by pretending it did not happen.", "\u{1F64F} Mediator", "\u{1FA78} Atonement needed", "\u{1F4D6} God's book", "The scene points forward to the Bible's larger need for a better mediator.");
  } else if (lower.includes("presence") || lower.includes("glory") || lower.includes("goodness") || lower.includes("face") || lower.includes("clift") || lower.includes("rock")) {
    add(`${title} comes from Moses' plea for God's presence and glory.`, "After the golden calf, the land is not enough if the LORD does not go with them. Moses wants God Himself, not merely God's gifts.", "\u{2601}\u{FE0F} Presence", "\u{2728} Glory", "\u{1FAA8} Hidden in the rock", "God reveals His goodness while protecting Moses from seeing more than a human can bear.");
  } else if (lower.includes("merciful") || lower.includes("gracious") || lower.includes("longsuffering") || lower.includes("goodness") || lower.includes("truth") || lower.includes("forgiving") || lower.includes("guilty") || lower.includes("jealous")) {
    add(`${title} reveals the LORD's character.`, "God is not only powerful. He names Himself as merciful, gracious, patient, faithful, forgiving, and just.", "\u{1F64C} Mercy", "\u{23F3} Patience", "\u{2696}\u{FE0F} Justice", "A beginner should hold these together: God's mercy is real, and His holiness is real.");
  } else if (lower.includes("offering") || lower.includes("willing") || lower.includes("heart") || lower.includes("gold") || lower.includes("onyx") || lower.includes("spun") || lower.includes("brought")) {
    add(`${title} marks a beautiful turn in Israel's worship.`, "This is the opposite of the golden calf. The people now bring gifts for worship according to God's pattern, not an idol shaped by fear.", "\u{1F381} Willing gifts", "\u{1F9F5} Skilled work", "\u{1F3D5}\u{FE0F} Dwelling place", "God can turn a people from false worship toward obedient generosity.");
  } else if (lower.includes("ark") || lower.includes("mercy seat") || lower.includes("table") || lower.includes("candlestick") || lower.includes("altar") || lower.includes("laver") || lower.includes("court") || lower.includes("curtains") || lower.includes("boards") || lower.includes("vail") || lower.includes("garments")) {
    add(`${title} is one of the holy details in God's dwelling place.`, "The tabernacle details teach Israel how God's presence is approached: mercy, sacrifice, cleansing, light, priesthood, and holy boundaries.", "\u{1F3D5}\u{FE0F} Holy dwelling", "\u{1FA78} Sacrifice and mercy", "\u{1F56F}\u{FE0F} Ordered worship", "These are not random construction notes. A holy God is preparing to live among His people.");
  } else if (lower.includes("commanded") || lower.includes("finished") || lower.includes("set up") || lower.includes("reared up") || lower.includes("anointed")) {
    add(`${title} emphasizes obedience after the chaos of idolatry.`, "The repeated obedience matters because Israel once invented worship with the calf. Now the work follows the LORD's command.", "\u{2705} Obedience", "\u{1F4CF} God's pattern", "\u{1F9F4} Holy anointing", "A beginner should notice that renewed worship is built by listening to God.");
  } else if (lower.includes("cloud") || lower.includes("filled") || lower.includes("journeys") || lower.includes("fire")) {
    add(`${title} brings Exodus to its goal: God's presence among His people.`, "The book began with groaning under Pharaoh. It ends with the LORD's glory filling the tabernacle and guiding Israel's journeys.", "\u{2601}\u{FE0F} Cloud", "\u{1F525} Fire", "\u{1F3D5}\u{FE0F} Glory in the camp", "God did not only rescue Israel from Egypt. He came to dwell with them.");
  } else {
    add(`${title} gives a concrete detail from ${section.reference}.`, `${section.title} is showing worship being rebuilt through God's pattern, not through Israel's guesses.`, "The phrase may name a measurement, object, material, action, or priestly detail.", "Each detail helps the reader see that God's presence is a gift and must be honored His way.");
  }

  return note(lines.slice(0, 8));
}

function explainDay29Exodus31To32Phrase(title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("bezaleel") || lower.includes("aholiab") || lower.includes("uri") || lower.includes("tribe of judah")) {
    add(`${title} names one of the people God chose for the tabernacle work.`, "God does not leave His dwelling place to chance. He calls real people, from real families, for real service.", "\u{1F528} Skilled worker", "\u{1F465} Named by God", "\u{1F3D5}\u{FE0F} Building for worship", "A beginner should see that spiritual work can include craftsmanship, planning, design, and careful hands.");
  } else if (lower.includes("spirit of god") || lower.includes("wisdom") || lower.includes("understanding") || lower.includes("workmanship") || lower.includes("cunning") || lower.includes("work in gold") || lower.includes("work in silver") || lower.includes("work in brass") || lower.includes("cut stones") || lower.includes("carve timber")) {
    add(`${title} means the skill for the tabernacle came from God.`, "The LORD gave more than commands. He also gave ability to obey those commands.", "\u{1F9E0} Wisdom", "\u{1F440} Understanding", "\u{1F590}\u{FE0F} Skilled hands", "This teaches that beautiful work can be holy work when it follows God's purpose.");
  } else if (lower.includes("tabernacle") || lower.includes("ark") || lower.includes("testimony") || lower.includes("mercy seat") || lower.includes("candlestick") || lower.includes("altar") || lower.includes("cloths of service")) {
    add(`${title} names part of the holy worship space God commanded.`, "Each object had a role in helping Israel approach the LORD with reverence.", "\u{1F3D5}\u{FE0F} God's dwelling", "\u{1FA78} Sacrifice and mercy", "\u{1F56F}\u{FE0F} Light and worship", "The tabernacle was not random religious decoration. It was a teaching place where Israel learned holiness, mercy, and nearness.");
  } else if (lower.includes("commanded thee") || lower.includes("all that i have commanded")) {
    add(`${title} reminds the workers that worship follows God's word.`, "The builders were gifted, but they were not free to invent a different tabernacle.", "\u{1F4CF} God's pattern", "\u{2705} Obedience", "\u{1F3D5}\u{FE0F} Holy work", "Skill matters, but obedience matters too.");
  } else if (lower.includes("sabbath") || lower.includes("six days") || lower.includes("seventh") || lower.includes("rest") || lower.includes("sign") || lower.includes("perpetual covenant") || lower.includes("generations")) {
    add(`${title} teaches that rest was part of Israel's covenant life.`, "Even the holy work of building the tabernacle did not erase the Sabbath.", "\u{1F6D1} Stop", "\u{1F4DC} Covenant sign", "\u{1F305} Time belongs to God", "After slavery in Egypt, this mattered deeply. Pharaoh demanded endless labor, but the LORD gave His people holy rest.");
  } else if (lower.includes("sanctify you") || lower.includes("that ye may know")) {
    add(`${title} means the LORD Himself makes His people holy.`, "Israel's rest was not laziness. It was a weekly reminder that they belonged to God.", "\u{1F64C} Set apart", "\u{1F4DC} Covenant identity", "\u{1F6D1} Holy rest", "The Sabbath taught them to trust the LORD instead of living like slaves to work.");
  } else if (lower.includes("defileth")) {
    add(`${title} warns that treating holy rest as common was serious sin.`, "The Sabbath was not a small preference in Israel's covenant. It was a sign that they belonged to the LORD.", "\u{26A0}\u{FE0F} Holy boundary", "\u{1F6D1} Rest commanded", "\u{1F4DC} Covenant sign", "God was teaching His people that time can be holy too.");
  } else if (lower.includes("tables") || lower.includes("stone") || lower.includes("finger of god") || lower.includes("writing") || lower.includes("communing")) {
    add(`${title} shows that the covenant words came from God, not from human opinion.`, "The tablets were stone testimony for Israel. They carried God's own covenant instruction.", "\u{1FAA8} Stone tablets", "\u{270D}\u{FE0F} God's writing", "\u{1F4DC} Covenant words", "That makes the golden calf even more tragic: Israel is breaking covenant while the covenant words are being given.");
  } else if (lower.includes("moses delayed") || lower.includes("as for this moses") || lower.includes("gathered themselves")) {
    add(`${title} reveals how quickly fear can turn into rebellion.`, "Moses was still with God on the mountain, but the people acted as if waiting was impossible.", "\u{23F3} Delay", "\u{1F628} Fear", "\u{26A0}\u{FE0F} Rebellion", "A beginner should see that impatience can become dangerous when people stop trusting God.");
  } else if (lower.includes("make us gods") || lower.includes("thy gods") || lower.includes("golden earrings") || lower.includes("graving tool") || lower.includes("molten calf") || lower.includes("built an altar") || lower.includes("feast to the lord") || lower.includes("sat down to eat") || lower.includes("rose up to play")) {
    add(`${title} is part of the golden calf sin, where Israel tried to control worship.`, "They used gold to make something visible, but visible did not mean true.", "\u{1F402} Golden calf", "\u{1F6AB} False worship", "\u{1F494} Covenant betrayal", "Calling the feast by the LORD's name did not make the idol acceptable. Worship must come from God's command, not human fear.");
  } else if (lower.includes("corrupted") || lower.includes("turned aside") || lower.includes("stiffnecked") || lower.includes("mischief") || lower.includes("naked")) {
    add(`${title} describes how serious Israel's rebellion had become.`, "The people were not just confused. They had turned from the LORD who rescued them.", "\u{26A0}\u{FE0F} Corruption", "\u{1F512} Stubborn hearts", "\u{1F622} Shame", "Exodus is honest about sin because real mercy must deal with real guilt.");
  } else if (lower.includes("let me alone") || lower.includes("consume") || lower.includes("wrath")) {
    add(`${title} shows the danger of sin before a holy God.`, "The golden calf was not a tiny mistake. It was covenant betrayal soon after Israel promised to obey.", "\u{1F525} Judgment", "\u{1F4DC} Broken covenant", "\u{1F64F} Need for mercy", "The scene helps beginners understand why Moses' prayer matters so much.");
  } else if (lower.includes("remember abraham") || lower.includes("isaac") || lower.includes("israel") || lower.includes("swarest") || lower.includes("multiply") || lower.includes("inherit")) {
    add(`${title} shows Moses praying from God's promises.`, "Moses does not argue that Israel deserves mercy. He appeals to what the LORD swore to Abraham, Isaac, and Jacob.", "\u{1F4DC} Covenant promise", "\u{1F64F} Intercession", "\u{1F3DE}\u{FE0F} Inheritance", "This is a strong lesson in prayer: hold on to God's character and God's word.");
  } else if (lower.includes("repented of the evil")) {
    add(`${title} means the LORD turned from the announced disaster after Moses interceded.`, "The Bible is not saying God sinned or became better. It is showing His real response to covenant prayer.", "\u{1F64F} Moses prayed", "\u{1F6E1}\u{FE0F} Mercy shown", "\u{1F4DC} Promise remembered", "God's judgment is real, and His mercy is real.");
  } else if (lower.includes("noise of war") || lower.includes("anger waxed hot") || lower.includes("cast the tables") || lower.includes("burnt it") || lower.includes("ground it") || lower.includes("drink of it")) {
    add(`${title} shows Moses confronting the idol instead of treating it lightly.`, "The calf had to be destroyed because false worship cannot share space with covenant faithfulness.", "\u{1F4A5} Idol destroyed", "\u{1FAA8} Tablets broken", "\u{26A0}\u{FE0F} Sin exposed", "Moses' actions show that idolatry is not something to decorate, excuse, or keep nearby.");
  } else if (lower.includes("what did this people") || lower.includes("thou knowest the people") || lower.includes("there came out this calf")) {
    add(`${title} exposes Aaron's weak excuse after the golden calf.`, "Aaron talks as if the idol simply appeared, but the passage already showed his choices.", "\u{1F5E3}\u{FE0F} Excuse", "\u{1F402} Calf made by people", "\u{26A0}\u{FE0F} Leadership failure", "A beginner should notice that blaming the crowd does not erase responsibility.");
  } else if (lower.includes("lord's side") || lower.includes("sons of levi") || lower.includes("gate")) {
    add(`${title} calls for a clear break from the rebellion.`, "Moses stands at the camp gate and draws a line between loyalty to the LORD and loyalty to the idol.", "\u{1F6AA} Camp gate", "\u{270B} Choose allegiance", "\u{1F4DC} Covenant loyalty", "The moment is painful because sin has damaged the whole community.");
  } else if (lower.includes("sword") || lower.includes("slay") || lower.includes("three thousand") || lower.includes("consecrate yourselves") || lower.includes("blessing")) {
    add(`${title} shows judgment falling inside the covenant community.`, "This is a hard scene because Israel's rebellion was public, serious, and destructive.", "\u{2696}\u{FE0F} Judgment", "\u{1F4DC} Covenant seriousness", "\u{1F622} Cost of sin", "The blessing is not cheap comfort. It comes through loyalty to the LORD when the camp has turned toward an idol.");
  } else if (lower.includes("great sin") || lower.includes("atonement") || lower.includes("gods of gold") || lower.includes("blot me") || lower.includes("book") || lower.includes("whosoever") || lower.includes("plagued")) {
    add(`${title} shows Moses standing between guilty Israel and the holy LORD.`, "Moses does not pretend the calf was harmless. He names the sin and seeks mercy.", "\u{1F64F} Intercession", "\u{1FA78} Atonement needed", "\u{1F4D6} God's book", "This points forward to the Bible's larger need for a greater mediator who can truly deal with sin.");
  } else {
    add(`${title} names an important detail in the tabernacle, Sabbath, or golden calf story.`, "The phrase helps a beginner stay close to the Bible's own words.", "\u{1F3D5}\u{FE0F} Worship", "\u{1F4DC} Covenant", "\u{26A0}\u{FE0F} Sin and mercy", "Exodus is showing both sides clearly: God gives a way to dwell with His people, and His people still need mercy.");
  }

  return note(lines.slice(0, 8));
}

function makeDay29Exodus31To32PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainDay29Exodus31To32Phrase(title)];
}

function appendMinedExodusPhraseCards(
  section: PersonalExodusPhraseSectionInput,
  desiredCount: number,
  poolsByChapter: Record<string | number, string[]>,
  explainPhrase: (section: PersonalExodusPhraseSectionInput, title: string) => string = explainExodusThirtyOneToFortyMinedPhrase,
): PersonalExodusPhraseSectionInput {
  if (section.phrases.length >= desiredCount) return section;

  const existing = new Set(section.phrases.map(([phraseTitle]) => phraseTitle.replace(/^📌\s*/, "").trim().toLowerCase()));
  const pool = poolsByChapter[section.reference] ?? poolsByChapter[section.chapter] ?? [];
  const additions = pool
    .filter((phraseTitle) => !existing.has(phraseTitle.toLowerCase()))
    .slice(0, desiredCount - section.phrases.length)
    .map((phraseTitle) => [`\u{1F4CC} ${phraseTitle}`, explainPhrase(section, phraseTitle)] as [string, string]);

  return { ...section, phrases: [...section.phrases, ...additions] };
}

function deepenDay29Exodus31To32PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_29_EXODUS_31_32_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay29Exodus31To32PhraseCard(section, title)),
  };
}

const DAY_30_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 33:1-6": ["Depart, And Go Up Hence", "Unto The Land Which I Sware", "I Will Send An Angel Before Thee", "I Will Not Go Up In The Midst Of Thee", "A Stiffnecked People", "The People Heard These Evil Tidings", "Put Off Thy Ornaments"],
  "Exodus 33:7-11": ["Moses Took The Tabernacle", "Pitched It Without The Camp", "The Tabernacle Of The Congregation", "Every One Which Sought The LORD", "The Cloudy Pillar Descended", "The LORD Spake Unto Moses Face To Face", "As A Man Speaketh Unto His Friend"],
  "Exodus 33:12-17": ["Thou Hast Not Let Me Know Whom Thou Wilt Send", "I Know Thee By Name", "Thou Hast Also Found Grace In My Sight", "Shew Me Now Thy Way", "Consider That This Nation Is Thy People", "My Presence Shall Go With Thee", "I Will Give Thee Rest"],
  "Exodus 33:18-23": ["I Beseech Thee, Shew Me Thy Glory", "I Will Make All My Goodness Pass Before Thee", "I Will Proclaim The Name Of The LORD", "Thou Canst Not See My Face", "There Is A Place By Me", "I Will Put Thee In A Clift Of The Rock", "Thou Shalt See My Back Parts"],
  "Exodus 34:1-6": ["Hew Thee Two Tables Of Stone", "Like Unto The First", "I Will Write Upon These Tables", "Be Ready In The Morning", "The LORD Descended In The Cloud", "Proclaimed The Name Of The LORD", "The LORD, The LORD God"],
  "Exodus 34:7-9": ["Merciful And Gracious", "Longsuffering", "Abundant In Goodness And Truth", "Keeping Mercy For Thousands", "Forgiving Iniquity And Transgression And Sin", "By No Means Clear The Guilty", "Let My Lord, I Pray Thee, Go Among Us"],
  "Exodus 34:10-15": ["Behold, I Make A Covenant", "I Will Do Marvels", "Observe Thou That Which I Command Thee", "Take Heed To Thyself", "Throw Down Their Altars", "The LORD, Whose Name Is Jealous", "Make No Covenant With The Inhabitants"],
  "Exodus 34:16-21": ["Take Of Their Daughters Unto Thy Sons", "They Go A Whoring After Their Gods", "Make Thee No Molten Gods", "The Feast Of Unleavened Bread", "All That Openeth The Matrix Is Mine", "None Shall Appear Before Me Empty", "On The Seventh Day Thou Shalt Rest"],
  "Exodus 34:22-27": ["The Feast Of Weeks", "The Feast Of Ingathering", "Thrice In The Year", "Neither Shall The Sacrifice Of The Feast", "The First Of The Firstfruits", "Write Thou These Words", "After The Tenor Of These Words"],
  "Exodus 34:28-28": ["Forty Days And Forty Nights", "He Did Neither Eat Bread, Nor Drink Water", "He Wrote Upon The Tables", "The Words Of The Covenant", "The Ten Commandments"],
  "Exodus 34:29-34": ["The Two Tables Of Testimony", "The Skin Of His Face Shone", "While He Talked With Him", "They Were Afraid To Come Nigh Him", "Moses Called Unto Them", "He Gave Them In Commandment", "Moses Put A Vail On His Face"],
  "Exodus 34:35-35": ["The Children Of Israel Saw The Face Of Moses", "The Skin Of Moses' Face Shone", "Moses Put The Vail Upon His Face", "Until He Went In To Speak With Him"],
  "Exodus 35:1-6": ["Moses Gathered All The Congregation", "These Are The Words", "Six Days Shall Work Be Done", "The Seventh Day", "An Holy Day", "Kindle No Fire", "Take Ye From Among You An Offering"],
  "Exodus 35:7-12": ["Ram Skins Dyed Red", "Shittim Wood", "Oil For The Light", "Spices For Anointing Oil", "Onyx Stones", "Every Wise Hearted Among You", "The Tabernacle, His Tent, And His Covering"],
  "Exodus 35:13-18": ["The Table, And His Staves", "The Shewbread", "The Candlestick Also For The Light", "The Incense Altar", "The Hanging For The Door", "The Altar Of Burnt Offering", "The Pins Of The Tabernacle"],
  "Exodus 35:19-19": ["The Cloths Of Service", "To Do Service In The Holy Place", "The Holy Garments For Aaron", "The Garments Of His Sons", "To Minister In The Priest's Office"],
  "Exodus 35:20-25": ["All The Congregation Departed", "Every One Whose Heart Stirred Him Up", "Every One Whom His Spirit Made Willing", "They Came, Both Men And Women", "As Many As Were Willing Hearted", "An Offering Of Gold Unto The LORD", "All The Women That Were Wise Hearted"],
  "Exodus 35:26-29": ["All The Women Whose Heart Stirred Them Up", "Spun Goats' Hair", "The Rulers Brought Onyx Stones", "Spice, And Oil", "Every Man And Woman", "Whose Heart Made Them Willing", "A Willing Offering Unto The LORD"],
  "Exodus 36:8-13": ["Every Wise Hearted Man", "Made Ten Curtains", "Fine Twined Linen", "Blue, And Purple, And Scarlet", "Cherubims Of Cunning Work", "Fifty Loops", "Coupled The Curtains One Unto Another"],
  "Exodus 36:14-19": ["Curtains Of Goats' Hair", "A Covering Over The Tabernacle", "Eleven Curtains", "Taches Of Brass", "A Covering For The Tent", "Rams' Skins Dyed Red", "Badgers' Skins Above That"],
  "Exodus 36:20-25": ["Boards For The Tabernacle", "Shittim Wood, Standing Up", "Ten Cubits Was The Length", "Two Tenons", "Forty Sockets Of Silver", "Twenty Boards", "For The Other Side"],
  "Exodus 36:26-31": ["Two Boards Made He For The Corners", "Coupled Beneath", "Coupled Together At The Head", "Eight Boards", "Sixteen Sockets Of Silver", "Bars Of Shittim Wood", "For The Boards Of The Tabernacle"],
  "Exodus 36:32-37": ["The Middle Bar", "Shot Through The Boards", "Overlaid The Boards With Gold", "A Vail Of Blue, And Purple, And Scarlet", "Cherubims Made He It", "Four Pillars Of Shittim Wood", "An Hanging For The Tabernacle Door"],
  "Exodus 36:38-38": ["Five Pillars Of It", "Their Hooks", "He Overlaid Their Chapiters", "Their Fillets With Gold", "Their Five Sockets Were Of Brass"],
};

function explainDay30Phrase(title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("depart") || lower.includes("go up hence") || lower.includes("land which i sware") || lower.includes("flowing with milk and honey")) {
    add(`${title} keeps God's promise to bring Israel toward the land.`, "Even after the golden calf, the LORD has not forgotten what He swore to Abraham, Isaac, and Jacob.", "\u{1F3DE}\u{FE0F} Promised land", "\u{1F4DC} Covenant promise", "\u{1F6B6} Journey continues", "The land is still a gift, but the next question is whether God's presence will go with them.");
  } else if (lower.includes("angel") || lower.includes("not go up") || lower.includes("presence") || lower.includes("rest") || lower.includes("separated")) {
    add(`${title} shows that God's presence is the real treasure, not just the destination.`, "Moses understands that Canaan without the LORD would not be enough.", "\u{2601}\u{FE0F} God's presence", "\u{1F6B6} Guidance", "\u{1F3D5}\u{FE0F} God with His people", "A beginner should see the heart of Exodus here: God rescues His people so He can dwell with them.");
  } else if (lower.includes("stiffnecked") || lower.includes("evil tidings") || lower.includes("ornaments")) {
    add(`${title} shows Israel grieving after the golden calf.`, "The people are learning that sin damages nearness with God.", "\u{1F622} Grief", "\u{1F4A5} Covenant damage", "\u{1F4FF} Ornaments removed", "Taking off ornaments is a visible sign that this is not a celebration moment. It is a moment for humility.");
  } else if (lower.includes("moses took the tabernacle") || lower.includes("without the camp") || lower.includes("door of the tabernacle") || lower.includes("sought the lord") || lower.includes("all the people rose up")) {
    add(`${title} shows people seeking the LORD while the camp is under covenant tension.`, "The tent outside the camp reminds the reader that the golden calf has created distance.", "\u{1F3D5}\u{FE0F} Tent of meeting", "\u{1F6AA} Outside the camp", "\u{1F64F} Seeking God", "God is still approachable, but the people must not pretend nothing happened.");
  } else if (lower.includes("cloudy pillar") || lower.includes("face to face") || lower.includes("friend") || lower.includes("joshua")) {
    add(`${title} describes unusual nearness between the LORD and Moses.`, "Moses speaks with God in a direct, personal way as Israel's mediator.", "\u{2601}\u{FE0F} Cloud", "\u{1F5E3}\u{FE0F} Speaking with God", "\u{1F9CD} Mediator", "Joshua staying near the tent also quietly prepares the reader for his future leadership.");
  } else if (lower.includes("not let me know") || lower.includes("know thee by name") || lower.includes("found grace") || lower.includes("shew me now thy way") || lower.includes("this nation is thy people")) {
    add(`${title} shows Moses pleading for more than information.`, "He wants assurance that the LORD Himself will lead His people.", "\u{1F64F} Prayer", "\u{1F4DB} Grace", "\u{1F9ED} God's way", "Moses is not bargaining with pride. He is leaning on God's grace and God's claim on Israel.");
  } else if (lower.includes("shew me thy glory") || lower.includes("goodness") || lower.includes("proclaim the name") || lower.includes("face") || lower.includes("place by me") || lower.includes("clift") || lower.includes("back parts") || lower.includes("cover thee")) {
    add(`${title} shows Moses asking to know God more deeply.`, "The LORD answers with goodness, His name, and protected nearness.", "\u{2728} Glory", "\u{1FAA8} Hidden in the rock", "\u{1F64C} God's goodness", "God reveals Himself truly, but He also protects Moses from seeing more than a human can bear.");
  } else if (lower.includes("hew thee") || lower.includes("two tables") || lower.includes("like unto the first") || lower.includes("write upon these tables") || lower.includes("be ready") || lower.includes("no man shall come")) {
    add(`${title} begins the renewal of the covenant after the tablets were broken.`, "The first tablets were shattered after the calf, but God makes a way for the covenant words to be given again.", "\u{1FAA8} Stone tablets", "\u{1F4DC} Covenant words", "\u{26F0}\u{FE0F} Holy mountain", "This is mercy with seriousness: the covenant is renewed, but the mountain is still holy.");
  } else if (lower.includes("lord descended") || lower.includes("passed by") || lower.includes("lord, the lord god")) {
    add(`${title} marks one of the clearest revelations of God's character in Exodus.`, "After Israel's failure, the LORD does not reveal Himself as weak or careless. He reveals holy mercy.", "\u{2601}\u{FE0F} Cloud", "\u{1F64C} The LORD's name", "\u{2728} Glory revealed", "The story slows down so the reader hears who God says He is.");
  } else if (lower.includes("merciful") || lower.includes("gracious") || lower.includes("longsuffering") || lower.includes("goodness and truth") || lower.includes("keeping mercy") || lower.includes("forgiving")) {
    add(`${title} teaches that mercy is part of who the LORD is.`, "God is not forced into compassion. He names Himself as merciful, gracious, patient, faithful, and forgiving.", "\u{1F64C} Mercy", "\u{23F3} Patience", "\u{1F91D} Faithfulness", "This matters after the golden calf because Israel's survival depends on God's character, not their perfect record.");
  } else if (lower.includes("by no means") || lower.includes("guilty") || lower.includes("visiting the iniquity") || lower.includes("terrible thing")) {
    add(`${title} teaches that God's mercy does not erase His justice.`, "The LORD forgives sin, but He does not call evil harmless.", "\u{2696}\u{FE0F} Justice", "\u{26A0}\u{FE0F} Sin is serious", "\u{1F64C} Holy mercy", "A beginner should hold both truths together: God is deeply merciful and completely holy.");
  } else if (lower.includes("make a covenant") || lower.includes("do marvels") || lower.includes("command thee") || lower.includes("take heed") || lower.includes("write thou") || lower.includes("tenor")) {
    add(`${title} shows the covenant being renewed with clear commands.`, "God's mercy does not mean Israel can worship however they want.", "\u{1F4DC} Covenant", "\u{2705} Obedience", "\u{1F9ED} Clear direction", "Renewed relationship with God includes listening to His words.");
  } else if (lower.includes("altars") || lower.includes("jealous") || lower.includes("no covenant") || lower.includes("daughters") || lower.includes("whoring") || lower.includes("molten gods") || lower.includes("worship no other")) {
    add(`${title} warns Israel against idolatry after the golden calf.`, "The LORD will not share His people with false gods.", "\u{1F6AB} No idols", "\u{1F494} Spiritual unfaithfulness", "\u{1F525} God's holy jealousy", "Jealous here means covenant love that refuses to treat betrayal as normal.");
  } else if (lower.includes("feast") || lower.includes("unleavened") || lower.includes("weeks") || lower.includes("ingathering") || lower.includes("thrice") || lower.includes("firstfruits") || lower.includes("empty") || lower.includes("seventh day")) {
    add(`${title} shapes Israel's calendar around rescue, rest, and worship.`, "The feasts taught Israel to remember deliverance and bring the first of their increase to the LORD.", "\u{1F4C5} Holy calendar", "\u{1F35E} Unleavened bread", "\u{1F33E} Harvest worship", "God's people learn faith through repeated rhythms, not only dramatic miracles.");
  } else if (lower.includes("openeth the matrix") || lower.includes("redeem with a lamb") || lower.includes("firstling")) {
    add(`${title} teaches that firstborn life belongs to the LORD.`, "This reaches back to the Passover, when God spared Israel's firstborn and brought them out of Egypt.", "\u{1F411} Lamb", "\u{1F476} Firstborn", "\u{1FA78} Redemption", "Redeem means something is bought back or rescued by the substitute God allows.");
  } else if (lower.includes("forty days") || lower.includes("neither eat bread") || lower.includes("wrote upon the tables") || lower.includes("words of the covenant") || lower.includes("ten commandments")) {
    add(`${title} shows Moses receiving the renewed covenant words on the mountain.`, "Forty days and nights marks a long, holy meeting with the LORD.", "\u{26F0}\u{FE0F} Mountain", "\u{1F4DC} Covenant words", "\u{23F3} Forty days", "The covenant is not being rebuilt by human energy. It is received from God.");
  } else if (lower.includes("face shone") || lower.includes("afraid") || lower.includes("vail") || lower.includes("while he talked") || lower.includes("commandment") || lower.includes("saw the face")) {
    add(`${title} shows that time with the LORD changed Moses in a visible way.`, "Moses' shining face reflected God's glory, but it also made the people afraid.", "\u{2728} Shining face", "\u{1F64C} God's glory", "\u{1F6AA} Veil", "The veil reminds beginners that God's glory is wonderful, but also weighty and holy.");
  } else if (lower.includes("gathered all") || lower.includes("these are the words") || lower.includes("six days") || lower.includes("seventh day") || lower.includes("holy day") || lower.includes("kindle no fire")) {
    add(`${title} brings the people back under God's spoken instruction.`, "Even while building the tabernacle, Israel must remember the Sabbath.", "\u{1F6D1} Rest", "\u{1F4DC} God's words", "\u{1F3D5}\u{FE0F} Holy work", "The LORD does not want holy work done with a slave-driver spirit.");
  } else if (lower.includes("offering") || lower.includes("willing") || lower.includes("heart stirred") || lower.includes("spirit made willing") || lower.includes("men and women") || lower.includes("rulers brought") || lower.includes("bracelets") || lower.includes("jewels")) {
    add(`${title} shows Israel giving freely for the LORD's dwelling place.`, "This is the opposite of the golden calf scene. Now gifts are brought for worship according to God's command.", "\u{1F381} Willing gifts", "\u{1F465} Men and women", "\u{1F48D} Precious materials", "God is forming a worshiping people, not a forced labor camp.");
  } else if (lower.includes("wise hearted") || lower.includes("spun") || lower.includes("cunning work") || lower.includes("made ten curtains") || lower.includes("coupled") || lower.includes("he made")) {
    add(`${title} shows skill being used for worship.`, "The tabernacle required careful hands, patient work, and obedient craftsmanship.", "\u{1F9E0} Wisdom", "\u{1F9F5} Fabric work", "\u{1F528} Skilled labor", "In Exodus, practical skill can become holy service when it follows God's pattern.");
  } else if (lower.includes("ram skins") || lower.includes("shittim") || lower.includes("oil") || lower.includes("spices") || lower.includes("onyx") || lower.includes("linen") || lower.includes("blue") || lower.includes("purple") || lower.includes("scarlet") || lower.includes("goats' hair") || lower.includes("badgers")) {
    add(`${title} names materials used for the tabernacle.`, "These materials were not random craft supplies. They were given and shaped for God's dwelling place.", "\u{1F9F5} Fabric", "\u{1FAB5} Wood", "\u{1F48E} Precious stones", "The details teach care, beauty, order, and reverence in worship.");
  } else if (lower.includes("table") || lower.includes("shewbread") || lower.includes("candlestick") || lower.includes("incense altar") || lower.includes("altar of burnt") || lower.includes("pins") || lower.includes("boards") || lower.includes("sockets") || lower.includes("bars") || lower.includes("pillars") || lower.includes("hooks") || lower.includes("chapiters") || lower.includes("fillets")) {
    add(`${title} names a real part of the tabernacle structure or furniture.`, "Each piece helped form a place where God's presence could dwell among His people.", "\u{1F3D5}\u{FE0F} Holy dwelling", "\u{1F4CF} Careful construction", "\u{1F56F}\u{FE0F} Ordered worship", "Small details matter because the whole dwelling place follows God's pattern.");
  } else if (lower.includes("cloths of service") || lower.includes("holy garments") || lower.includes("minister in the priest")) {
    add(`${title} points to priestly service inside the holy place.`, "The priests needed garments and cloths for work connected to God's presence.", "\u{1F455} Garments", "\u{1F64C} Service", "\u{1F3D5}\u{FE0F} Holy place", "Worship in Exodus includes beauty, order, and responsibility.");
  } else if (lower.includes("people bring much") || lower.includes("restrained") || lower.includes("sufficient") || lower.includes("more than enough")) {
    add(`${title} shows that willing generosity overflowed.`, "The people brought so much that Moses had to stop the donations.", "\u{1F381} Generous giving", "\u{1F4E6} Enough supplies", "\u{270B} Restrained from bringing", "This is a beautiful turn after the golden calf: hearts that once gave gold for an idol now give freely for God's dwelling.");
  } else if (lower.includes("vail") || lower.includes("hanging") || lower.includes("door")) {
    add(`${title} marks a boundary or entrance in the tabernacle.`, "The curtains and hangings taught Israel that God's presence is near, but still holy.", "\u{1F6AA} Entrance", "\u{1F3D5}\u{FE0F} Holy space", "\u{26A0}\u{FE0F} Reverent boundary", "God makes a way to dwell with His people without making His holiness casual.");
  } else {
    add(`${title} names a concrete part of covenant renewal, holy worship, or tabernacle construction.`, "The phrase helps a beginner stay close to the Bible's own words.", "\u{1F4DC} Covenant", "\u{1F3D5}\u{FE0F} Tabernacle", "\u{1F64C} Worship", "Exodus is showing mercy after failure and careful obedience after the golden calf.");
  }

  return note(lines.slice(0, 8));
}

function makeDay30PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainDay30Phrase(title)];
}

function deepenDay30PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_30_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay30PhraseCard(section, title)),
  };
}

const EXODUS_31_40_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  31: ["🛠️ God gives skill for holy work.", "🛑 Sabbath guards covenant identity.", "🪨 The tablets come from God, not human invention."],
  32: ["🐂 The golden calf corrupts worship.", "🙏 Moses intercedes for guilty people.", "🩹 Mercy does not pretend covenant sin is small."],
  33: ["☁️ God's presence is the real gift.", "🙏 Moses pleads for the people.", "✨ God's glory is revealed with mercy and holiness."],
  34: ["📜 The covenant is renewed after failure.", "🙌 The LORD reveals His character.", "🧭 Israel must not drift back into idolatry."],
  35: ["🛑 Sabbath still matters during holy work.", "🎁 Willing hearts bring offerings.", "🛠️ God uses skilled hands for worship."],
  36: ["🏕️ The tabernacle begins to take shape.", "📏 Obedience follows God's pattern.", "🎁 The people give more than enough."],
  37: ["📦 The holy furniture is built.", "🩸 The mercy seat points to atonement.", "🕯️ God's house is ordered for presence and worship."],
  38: ["🩸 The altar and courtyard shape approach.", "💧 Washing matters before service.", "🧾 The tabernacle work is counted carefully."],
  39: ["👕 Priestly garments are finished.", "💎 Israel's names are carried before God.", "✅ The work is checked against the LORD's command."],
  40: ["🏕️ The tabernacle is set up.", "🧴 Holy things are anointed and arranged.", "☁️ God's glory fills the dwelling place."],
};

const EXODUS_31_40_BANNED_FILLER_TITLES = [
  "What Is Happening Here",
  "Why This Detail Matters",
  "Why This Matters",
  "Beginner Connection",
  "Watch The Pattern",
  "Watch This Pattern",
  "What This Shows About People",
  "What This Shows About God",
];

function formatExodusThirtyOneToFortyPhraseExplanation(section: PersonalExodusPhraseSectionInput, content: string) {
  const cleaned = content.replace(/in Day 29/g, "in Exodus");
  if (section.chapter >= 31 && section.chapter <= 40) {
    return cleaned;
  }

  if (section.chapter < 31 || section.chapter > 40 || cleaned.includes("What to notice:")) {
    return cleaned;
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = EXODUS_31_40_MOBILE_FORMAT_CUES[section.chapter];

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

function formatExodusThirtyOneToFortySectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases
      .filter(([title]) =>
        section.chapter < 37 ||
        !EXODUS_31_40_BANNED_FILLER_TITLES.some((bannedTitle) => title.includes(bannedTitle)),
      )
      .map(([title, content]) => [
        title,
        formatExodusThirtyOneToFortyPhraseExplanation(section, content),
      ] as [string, string]),
  }));
}

const DAY_29_EXODUS_31_32_EXTRA_PHRASES: Record<string, string[]> = {
  "Exodus 31:1-6": ["To Devise Cunning Works", "To Work In Gold"],
  "Exodus 31:7-11": ["The Table And His Furniture", "The Pure Candlestick With All His Furniture"],
  "Exodus 31:12-17": ["Throughout Your Generations", "A Perpetual Covenant"],
  "Exodus 31:18-18": ["Upon Mount Sinai", "He Gave Unto Moses", "Two Tables", "The Tables Of Testimony", "The Finger Of God"],
  "Exodus 32:1-6": ["Moses Delayed To Come Down", "Gathered Themselves Together Unto Aaron"],
  "Exodus 32:7-12": ["Out Of The Land Of Egypt", "Fierce Wrath"],
  "Exodus 32:13-14": ["All This Land", "The LORD Turned", "Which He Thought To Do", "Unto Thy Seed"],
  "Exodus 32:15-20": ["The Tables Were The Work Of God", "Moses' Anger Waxed Hot"],
  "Exodus 32:21-26": ["Set On Mischief", "Moses Stood In The Gate"],
  "Exodus 32:27-29": ["From Gate To Gate", "Every Man Upon His Son"],
  "Exodus 32:30-35": ["On The Morrow", "Against The Day When I Visit"],
};

const DAY_30_EXODUS_33_36_EXTRA_PHRASES: Record<string, string[]> = {
  "Exodus 33:1-6": ["Flowing With Milk And Honey", "No Man Did Put On Him His Ornaments"],
  "Exodus 33:7-11": ["The Door Of The Tabernacle", "All The People Rose Up"],
  "Exodus 33:12-17": ["If Thy Presence Go Not With Me", "So Shall We Be Separated"],
  "Exodus 33:18-23": ["I Will Be Gracious", "I Will Cover Thee With My Hand"],
  "Exodus 34:1-6": ["No Man Shall Come Up With Thee", "The LORD Passed By Before Him"],
  "Exodus 34:7-9": ["Visiting The Iniquity", "Pardon Our Iniquity And Our Sin"],
  "Exodus 34:10-15": ["For It Is A Terrible Thing", "Thou Shalt Worship No Other God"],
  "Exodus 34:16-21": ["Redeem With A Lamb", "The Firstling Of An Ass"],
  "Exodus 34:22-27": ["Neither Shall The Sacrifice Of The Feast", "All Thy Men Children", "The Land Whither Thou Goest", "The First Of The Firstfruits"],
  "Exodus 34:28-28": ["With The LORD", "Neither Eat Bread", "Nor Drink Water", "Upon The Tables", "The Ten Commandments"],
  "Exodus 34:29-34": ["When He Came Down From The Mount", "Till Moses Had Done Speaking"],
  "Exodus 34:35-35": ["They Saw The Face Of Moses", "Moses' Face Shone", "He Went In To Speak With Him", "The Vail Upon His Face", "The Children Of Israel Saw"],
  "Exodus 35:1-6": ["Whosoever Is Of A Willing Heart", "Gold, And Silver, And Brass"],
  "Exodus 35:7-12": ["Fine Linen", "The LORD Commanded To Be Made"],
  "Exodus 35:13-18": ["The Pins Of The Court", "Their Cords"],
  "Exodus 35:19-19": ["To Do Service", "For Aaron The Priest", "His Sons' Garments", "Priest's Office"],
  "Exodus 35:20-25": ["Bracelets, And Earrings, And Rings", "All Manner Of Jewels Of Gold"],
  "Exodus 35:26-29": ["The Children Of Israel Brought A Willing Offering", "The LORD Commanded By The Hand Of Moses"],
  "Exodus 36:8-13": ["The Curtains Were One Tabernacle", "Taches Of Gold"],
  "Exodus 36:14-19": ["A Covering Above", "Made He It", "Taches Of Brass", "Badgers' Skins Above That"],
  "Exodus 36:20-25": ["He Made Boards", "For One Side", "The South Side Southward", "Twenty Boards"],
  "Exodus 36:26-31": ["The Two Sides Westward", "Five Bars For The Boards"],
  "Exodus 36:32-37": ["He Overlaid Their Pillars With Gold", "Five Pillars Of Shittim Wood"],
  "Exodus 36:38-38": ["For The Hanging", "Their Hooks", "Their Chapiters", "He Overlaid Their Chapiters", "Their Fillets", "Their Fillets With Gold", "Their Five Sockets Were Of Brass"],
};

const DAY_31_EXODUS_37_40_EXTRA_PHRASES: Record<number, string[]> = {
  37: ["Bezalel Made The Ark", "Two Cubits And A Half", "Pure Gold Within And Without", "The Cherubims Spread Out Their Wings", "The Table Of Shittim Wood", "The Candlestick Of Pure Gold", "A Talent Of Pure Gold", "The Holy Anointing Oil", "The Pure Incense"],
  38: ["The Altar Of Burnt Offering", "The Horns Thereof", "The Laver Of Brass", "The Lookingglasses Of The Women", "The Hangings Of The Court", "The Sockets Were Of Brass", "This Is The Sum Of The Tabernacle", "A Bekah For Every Man", "The Brass Of The Offering"],
  39: ["The Cloths Of Service", "As The LORD Commanded Moses", "They Did Beat The Gold Into Thin Plates", "The Curious Girdle", "The Breastplate Was Foursquare", "The Robe Of The Ephod", "A Bell And A Pomegranate", "The Plate Of The Holy Crown", "Moses Did Look Upon All The Work", "Moses Blessed Them"],
  40: ["On The First Day Of The First Month", "Set The Ark Of The Testimony", "Put Therein The Ark", "Set The Bread In Order", "Lighted The Lamps", "Washed Their Hands And Their Feet", "So Moses Finished The Work", "The Cloud Covered The Tent", "The Glory Of The LORD Filled The Tabernacle", "In The Sight Of All The House Of Israel"],
};
export const EXODUS_31_40_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusThirtyOneToFortySectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS, [31, 32], "🐂").map(deepenDay29Exodus31To32PhraseCards).map((section) => appendMinedExodusPhraseCards(section, 9, DAY_29_EXODUS_31_32_EXTRA_PHRASES, (_section, title) => explainDay29Exodus31To32Phrase(title))),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_DEEP_STUDY_SECTIONS, [33, 34, 35, 36], "☁️").map(deepenDay30PhraseCards).map((section) => appendMinedExodusPhraseCards(section, 9, DAY_30_EXODUS_33_36_EXTRA_PHRASES, (_section, title) => explainDay30Phrase(title))),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_STUDY_SECTIONS, [37, 38, 39, 40], "🏁").map(ensureBeginnerExodusPhraseDepth).map((section) => appendMinedExodusPhraseCards(section, 10, DAY_31_EXODUS_37_40_EXTRA_PHRASES)),
  ...RAW_EXODUS_31_40_PERSONAL_SECTIONS.filter((section) => section.chapter < 31 || section.chapter > 40),
]);
