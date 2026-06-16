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

function replaceElevenToTwentyPhraseOpening(content: string, opening: string) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return content;
  paragraphs[0] = opening;
  return note(paragraphs);
}

const DAY_24_EXODUS_11_12_OPENING_REPLACEMENTS: Record<string, string> = {
  "Eat The Flesh In That Night": "The lamb must be eaten that same night as part of the Passover meal.",
  "Roast With Fire": "The lamb is to be cooked by roasting over fire, not boiled or eaten raw.",
  "In All Your Habitations": "This command applies in every home where Israel lives.",
  "Four Hundred And Thirty Years": "This number marks the long stretch connected to Israel's stay and affliction.",
  "Every Man's Servant": "A household servant could share Passover only after receiving circumcision.",
};

const DAY_26_OPENING_REPLACEMENTS: Record<string, string> = {
  "Wherefore The People Did Chide With Moses": "The people begin quarreling with Moses over their lack of water.",
  "Because Of The Chiding Of The Children Of Israel": "This place name remembers Israel's quarreling at Rephidim.",
  "Then Came Amalek": "Amalek arrives as the first enemy to attack Israel in the wilderness.",
  "Joshua Discomfited Amalek": "Joshua defeats Amalek in battle under the LORD's help.",
  "I Will Utterly Put Out The Remembrance Of Amalek": "God promises to erase Amalek's lasting name and power.",
  "War With Amalek From Generation To Generation": "This conflict with Amalek will continue beyond a single battle.",
  "Moses Built An Altar": "After the battle, Moses responds by building an altar of worship.",
  "An Altar Of Earth Thou Shalt Make": "God tells Israel to build a simple altar made from earth.",
  "If Thou Wilt Make Me An Altar Of Stone": "If Israel uses stone for an altar, it must stay plain and unshaped.",
  "Jethro, The Priest Of Midian": "Jethro enters the story as Moses' father-in-law from Midian.",
  "I Thy Father In Law Jethro Am Come": "Jethro announces his own arrival to Moses in the wilderness.",
  "Jethro Took A Burnt Offering": "Jethro responds to the rescue story by bringing a burnt offering.",
  "Provide Out Of All The People Able Men": "Moses must choose capable men from the people to help judge.",
  "Moses Chose Able Men": "Moses actually appoints the capable men Jethro recommended.",
  "They Came Into The Wilderness Of Sinai": "Israel reaches the wilderness region around Sinai.",
  "Mount Sinai Was Altogether On A Smoke": "Sinai is covered in smoke as the LORD descends in fire.",
  "Moses Called For The Elders": "Moses summons the elders to hear God's covenant words.",
  "The Elders Of The People": "These elders serve as representatives for the people.",
  "Lo, I Come Unto Thee In A Thick Cloud": "God says He will come to Moses in a thick cloud.",
  "A Thick Cloud Upon The Mount": "A heavy cloud settles over the mountain as God draws near.",
  "Sanctify Them To Day And To Morrow": "The people must be set apart and prepared over two days.",
  "Let The Priests Also Sanctify Themselves": "Even the priests must prepare themselves before approaching holy things.",
  "Saying": "This introduces the words that reveal Israel's deeper question.",
  "The LORD Hath Sworn": "The LORD has made a firm promise of ongoing war against Amalek.",
  "Gershom": "This is the name of Moses' son connected with living as a stranger.",
  "Eliezer": "This is the name of Moses' son that points to God's help.",
  "The LORD Delivered Them": "Jethro is hearing that the LORD rescued Israel from danger.",
  "Rulers Of Thousands": "This describes a layered structure of delegated leadership.",
  "The People Cannot Come Up": "The people are not allowed to climb Sinai past the boundary God set.",
  "Before Me": "This means in the LORD's presence, with no rival gods beside Him.",
  "The LORD Blessed The Sabbath Day": "God set the Sabbath apart with His own blessing.",
  "Fear Not": "Moses tells the people not to run from God's covenant word in panic.",
};

function polishDay24Exodus11To12PhraseContent(title: string, content: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  const opening = DAY_24_EXODUS_11_12_OPENING_REPLACEMENTS[cleanTitle];
  if (!opening) return content;
  return replaceElevenToTwentyPhraseOpening(content, opening);
}

function polishDay26PhraseContent(title: string, content: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  const opening = DAY_26_OPENING_REPLACEMENTS[cleanTitle];
  if (!opening) return content;
  return replaceElevenToTwentyPhraseOpening(content, opening);
}

function getExodusElevenToTwentyTitleIcon(title: string) {
  if (/no water|water for the people|drink/i.test(title)) return "\u{1F4A7}";
  if (/chide|chiding|tempted|saying|among us|wherefore/i.test(title)) return "\u{1F5E3}\u{FE0F}";
  if (/cried unto the lord|prayed/i.test(title)) return "\u{1F64F}";
  if (/stone|rock|horeb|smite|massah|meribah/i.test(title)) return "\u{1FAA8}";
  if (/amalek|discomfited|battle|war/i.test(title)) return "\u{2694}\u{FE0F}";
  if (/joshua|choose us out/i.test(title)) return "\u{1F6E1}\u{FE0F}";
  if (/rod of god|staff/i.test(title)) return "\u{1F9AF}";
  if (/held up|hands|aaron and hur|steady/i.test(title)) return "\u{270B}";
  if (/memorial|book|rehearse|remembrance/i.test(title)) return "\u{1F4D6}";
  if (/jehovahnissi|banner/i.test(title)) return "\u{1F6A9}";
  if (/sworn/i.test(title)) return "\u{270B}";
  if (/jethro|father in law|priest of midian|rulers|judge|judged/i.test(title)) return "\u{1F9D1}\u{200D}\u{2696}\u{FE0F}";
  if (/zipporah|wife/i.test(title)) return "\u{1F469}";
  if (/sent her back/i.test(title)) return "\u{1F3D5}\u{FE0F}";
  if (/gershom|eliezer|son|daughter/i.test(title)) return "\u{1F9D2}";
  if (/heard|told|welfare/i.test(title)) return "\u{1F442}";
  if (/obeisance|kissed/i.test(title)) return "\u{1F91D}";
  if (/what is this thing/i.test(title)) return "\u{2753}";
  if (/delivered|brought israel out|brought thee out/i.test(title)) return "\u{1F6E1}\u{FE0F}";
  if (/greater than all gods|no other gods|graven image|bow down|jealous god|gods of silver|before me/i.test(title)) return "\u{1F6AB}";
  if (/shewing mercy|mercy unto thousands/i.test(title)) return "\u{1F496}";
  if (/burnt offering|altar|offerings/i.test(title)) return "\u{1F525}";
  if (/come unto thee/i.test(title)) return "\u{1FAE1}";
  if (/morning unto the evening|wear away|alone/i.test(title)) return "\u{1F613}";
  if (/statutes|ordinances|laws|words|command|spake|hearkened|name of the lord/i.test(title)) return "\u{1F4DC}";
  if (/way wherein|journeys|wilderness|depart/i.test(title)) return "\u{1F9ED}";
  if (/able men|men of truth|covetousness/i.test(title)) return "\u{2705}";
  if (/sinai|mount|mountain/i.test(title)) return "\u{26F0}\u{FE0F}";
  if (/third month|third day/i.test(title)) return "\u{1F4C5}";
  if (/eagles' wings/i.test(title)) return "\u{1F985}";
  if (/peculiar treasure/i.test(title)) return "\u{1F48E}";
  if (/kingdom of priests|holy nation|priests/i.test(title)) return "\u{1F451}";
  if (/elders|all the people|people answered|people cannot|people stood|manservant|maidservant/i.test(title)) return "\u{1F465}";
  if (/cloud|thunder|lightning/i.test(title)) return "\u{1F329}\u{FE0F}";
  if (/trumpet/i.test(title)) return "\u{1F3BA}";
  if (/fire/i.test(title)) return "\u{1F525}";
  if (/sanctify|wash|hallowed/i.test(title)) return "\u{1F9FC}";
  if (/bounds|heed|break through|go down|come up|afar off/i.test(title)) return "\u{1F6A7}";
  if (/house of bondage|egypt/i.test(title)) return "\u{1F3DB}\u{FE0F}";
  if (/sabbath|seventh day|six days|work|labour|rest/i.test(title)) return "\u{1F6D1}";
  if (/father|mother|family/i.test(title)) return "\u{1F46A}";
  if (/kill|adultery|steal|false witness|covet|neighbour/i.test(title)) return "\u{2696}\u{FE0F}";
  if (/fear not|fear may|lest we die|trembled/i.test(title)) return "\u{1F628}";
  if (/passover|lamb|blood|door|hyssop|unleavened|leaven|firstborn|midnight/i.test(title)) return "ðŸ‘";
  if (/plague|wonders|judgment|difference|cut off/i.test(title)) return "âš–ï¸";
  if (/pharaoh|egypt|egyptians|thrust|jewels|silver|gold|mixed multitude/i.test(title)) return "ðŸ›ï¸";
  if (/remember|children|ordinance|generation|sign|memorial|feast/i.test(title)) return "ðŸ§ ";
  if (/pillar|cloud|fire|led|way|wilderness|camp|journey/i.test(title)) return "ðŸ§­";
  if (/sea|waters|wind|dry ground|chariot|horse|rider|fight|stand still|fear/i.test(title)) return "ðŸŒŠ";
  if (/sing|song|strength|who is like|miriam|timbrel|dance/i.test(title)) return "ðŸŽ¶";
  if (/manna|bread|quail|omer|sabbath|murmur|water|marah|elim/i.test(title)) return "ðŸž";
  if (/amalek|joshua|banner|hands|hur/i.test(title)) return "ðŸ³ï¸";
  if (/jethro|judges|rulers|counsel/i.test(title)) return "ðŸ§‘â€âš–ï¸";
  if (/sinai|mount|thunder|lightning|commandments/i.test(title)) return "â›°ï¸";
  if (/joseph|bones|canaan|promise|surely visit/i.test(title)) return "ðŸ¦´";
  if (/fear|afraid|graves|die|death|cry/i.test(title)) return "ðŸ˜¨";
  if (/law|statute|command|word|voice|hear|hearken/i.test(title)) return "ðŸ“œ";
  if (/rock|smite|rephidim|massah|meribah/i.test(title)) return "ðŸª¨";
  if (/tent|camp|congregation|people|children of israel|souls|armies|stranger|born in the land|servant/i.test(title)) return "ðŸ‘¥";
  if (/gold|silver|jewels|raiment|spoiled/i.test(title)) return "ðŸ’";
  if (/wilderness|way|journey|departed|went/i.test(title)) return "ðŸœï¸";
  if (/month|fourteenth|sixth day|seventh day|selfsame day|night|morning|even/i.test(title)) return "ðŸ“…";
  if (/eat|flesh|flocks|herds|loins|girded|shoes|staff|bone|flesh pots/i.test(title)) return "ðŸ½ï¸";
  if (/bring|brought|go|get thee|forth|out|rise up|let you go|tarry|openeth the womb/i.test(title)) return "ðŸš¶";
  if (/right hand|wrath|overthrown|triumphed|excellency|blast|purchased|wonders/i.test(title)) return "ðŸ’ª";
  if (/sanctuary|place|habitation|house/i.test(title)) return "ðŸ•ï¸";
  if (/lord|god|healeth|reign|servant moses|my god/i.test(title)) return "ðŸ™Œ";
  return "ðŸ”Ž";
}

function ensureExodusElevenToTwentyTitleEmoji(title: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  return `${getExodusElevenToTwentyTitleIcon(cleanTitle)} ${cleanTitle}`;
}

function getExodusElevenToTwentySectionIcon(section: PersonalExodusPhraseSectionInput) {
  const text = `${section.title} ${section.reference}`.toLowerCase();
  if (/water from the rock/.test(text)) return "ðŸª¨";
  if (/banner|amalek/.test(text)) return "ðŸ³ï¸";
  if (/jethro hears/.test(text)) return "ðŸ‘‚";
  if (/shared wisdom|shared burden|leadership/.test(text)) return "ðŸ§‘â€âš–ï¸";
  if (/eagles|wings/.test(text)) return "ðŸ¦…";
  if (/mountain|sinai|set apart/.test(text)) return "â›°ï¸";
  if (/no other gods|images|name|sabbath/.test(text)) return "ðŸ“œ";
  if (/life with our neighbor/.test(text)) return "ðŸ¤";
  if (/holy fear|simple worship/.test(text)) return "ðŸ™Œ";
  if (/plague|firstborn|midnight/.test(text)) return "ðŸŒ™";
  if (/passover|lamb|blood/.test(text)) return "ðŸ‘";
  if (/leaves|departure|egypt/.test(text)) return "ðŸŽ’";
  if (/remember|redeemed|firstborn/.test(text)) return "ðŸ§ ";
  if (/cloud|fire|long way|leads/.test(text)) return "ðŸ§­";
  if (/sea|fear|opens/.test(text)) return "ðŸŒŠ";
  if (/song|sings|victory/.test(text)) return "ðŸŽ¶";
  if (/bitter|water|heals|manna|bread|sabbath/.test(text)) return "ðŸž";
  if (/amalek|banner/.test(text)) return "ðŸ³ï¸";
  if (/jethro|leadership/.test(text)) return "ðŸ§‘â€âš–ï¸";
  if (/sinai|commandments|mount/.test(text)) return "â›°ï¸";
  return getExodusElevenToTwentyTitleIcon(section.title);
}

const RAW_EXODUS_11_20_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  {
    chapter: 11,
    startVerse: 1,
    endVerse: 10,
    reference: "Exodus 11:1-10",
    title: "The Final Plague Is Announced",
    icon: "ðŸŒ™",
    phrases: [
      phrase("ðŸŒ™ Yet Will I Bring One Plague More", ["The final plague is announced before it comes.", "God is not acting in confusion or panic.", "ðŸŒ™ One plague more", "ðŸ“£ Warning before judgment", "ðŸ”“ Release coming", "This line tells us the conflict with Pharaoh is reaching its decisive moment."]),
      phrase("ðŸƒ He Shall Surely Thrust You Out", ["Pharaoh will not merely allow Israel to leave.", "He will drive them out.", "ðŸ‘‘ The oppressor releases", "ðŸƒ The people leave", "âš–ï¸ God's judgment breaks the grip", "The king who kept saying no will be forced into the very release he resisted."]),
      phrase("ðŸ’ Jewels Of Silver, And Jewels Of Gold", ["Israel is told to ask Egypt for silver and gold.", "The enslaved people will not leave empty.", "ðŸ’ Silver", "ðŸ‘‘ Gold", "ðŸŽ’ Provision for the journey", "God reverses the exploitation of Egypt and sends His people out supplied."]),
      phrase("ðŸ‘‘ Moses Was Very Great", ["Moses is now respected in Egypt.", "The fugitive shepherd has become God's public messenger.", "ðŸ‘‘ Before Pharaoh's servants", "ðŸ‘¥ Before the people", "ðŸ“£ Carrying God's word", "His greatness is not celebrity; it comes from the LORD's authority on his mission."]),
      phrase("ðŸŒƒ About Midnight", ["The final judgment has an appointed time.", "Midnight makes the scene heavy and unmistakable.", "ðŸŒƒ Night", "â° Appointed hour", "âš–ï¸ Judgment", "Egypt will learn that the LORD rules timing as surely as He rules nature."]),
      phrase("ðŸ‘¶ All The Firstborn", ["The judgment reaches the firstborn of Egypt.", "This is deeply connected to Pharaoh's attack on Hebrew sons in Exodus 1.", "ðŸ‘¶ Firstborn", "ðŸ‘‘ Throne", "ðŸ  Household", "Pharaoh targeted Israel's children; now judgment reaches Egypt's households."]),
      phrase("ðŸ›¡ï¸ The Lord Doth Put A Difference", ["God makes a distinction between Egypt and Israel.", "The rescue is not because Israel is stronger.", "ðŸ›¡ï¸ Difference", "ðŸ‘¥ God's people", "âš–ï¸ Judgment passing by", "God knows how to judge Egypt while preserving His covenant people."]),
      phrase("ðŸ”’ Pharaoh Shall Not Hearken", ["Even after all the signs, Pharaoh will not listen.", "The hard heart is now fully exposed.", "ðŸ”’ Refusal", "ðŸ“£ Clear warning", "âš–ï¸ More wonders", "This prepares the reader for the final blow and the Passover shelter."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 20,
    reference: "Exodus 12:1-20",
    title: "Passover Begins A New Calendar",
    icon: "ðŸ‘",
    phrases: [
      phrase("ðŸ“… The Beginning Of Months", ["God resets Israel's calendar around redemption.", "Their time will now be marked by the night He brought them out.", "ðŸ“… New beginning", "ðŸ©¸ Rescue remembered", "ðŸ‘¥ Identity reshaped", "Freedom changes how Israel counts time."]),
      phrase("ðŸ  According To The House Of Their Fathers", ["Passover is given household by household.", "Deliverance reaches actual families, tables, and doorways.", "ðŸ  Household", "ðŸ½ï¸ Meal", "ðŸ©¸ Door", "The rescue is national, but it is received in homes."]),
      phrase("ðŸ‘ A Lamb For An House", ["Each household takes a lamb.", "The lamb stands at the center of the night of shelter.", "ðŸ‘ Lamb", "ðŸ  House", "ðŸ©¸ Blood", "God gives Israel a specific way to be covered during judgment."]),
      phrase("âœ¨ Without Blemish", ["The lamb must be without blemish.", "Israel does not give God what is defective.", "âœ¨ Whole", "ðŸ‘ Set apart", "ðŸ™ Given under God's command", "The rescue is not invented by Israel; it follows God's provided pattern."]),
      phrase("ðŸ©¸ They Shall Take Of The Blood", ["The blood is placed on the side posts and lintel of the house.", "The doorway becomes the visible boundary of shelter.", "ðŸ©¸ Blood", "ðŸšª Doorway", "ðŸ›¡ï¸ Protection", "The house is not safe because it is Hebrew, but because it is marked according to God's word."]),
      phrase("ðŸ”¥ Roast With Fire", ["The lamb is eaten roasted with fire, unleavened bread, and bitter herbs.", "The meal teaches through taste and memory.", "ðŸ”¥ Roasted lamb", "ðŸž Unleavened bread", "ðŸŒ¿ Bitter herbs", "Israel remembers both suffering and rescue."]),
      phrase("ðŸ‘Ÿ Your Shoes On Your Feet", ["Israel eats ready to leave.", "The meal is not relaxed nostalgia; it is urgent faith.", "ðŸ‘Ÿ Shoes on", "ðŸŽ’ Staff in hand", "ðŸƒ Ready to go", "They must trust that deliverance is close enough to dress for departure."]),
      phrase("ðŸ©¸ When I See The Blood", ["This is one of the clearest rescue lines in Exodus.", "God promises to pass over the marked houses.", "ðŸ©¸ Blood seen", "ðŸ›¡ï¸ Judgment passes over", "ðŸ  Household sheltered", "Safety rests on God's appointed sign."]),
      phrase("ðŸž Seven Days Shall Ye Eat Unleavened Bread", ["Unleavened bread becomes a yearly practice.", "The haste of deliverance is built into Israel's memory.", "ðŸž No leaven", "ðŸ“… Seven days", "ðŸ§  Remember rescue", "God gives the people a rhythm so freedom will not be forgotten."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 21,
    endVerse: 32,
    reference: "Exodus 12:21-32",
    title: "Blood On The Doorposts",
    icon: "ðŸ©¸",
    phrases: [
      phrase("ðŸª´ Hyssop", ["Hyssop is used to apply the blood.", "A simple plant becomes part of the act of obedience.", "ðŸª´ Hyssop", "ðŸ©¸ Blood", "ðŸšª Doorposts", "God's appointed means may look ordinary, but obedience to His word matters."]),
      phrase("ðŸšª None Of You Shall Go Out", ["The people must remain inside the marked house.", "Faith is shown by staying under the shelter God provides.", "ðŸšª Inside", "ðŸ©¸ Blood outside", "ðŸ›¡ï¸ Safety", "They do not survive by bravery in the street, but by trusting God's covering."]),
      phrase("ðŸ‘¶ Your Children Shall Say", ["God expects children to ask about Passover.", "The ritual is meant to teach the next generation.", "ðŸ‘¶ Children ask", "ðŸ“– Parents explain", "ðŸ§  Memory continues", "Deliverance must become family instruction, not just adult memory."]),
      phrase("ðŸ™‡ The People Bowed The Head And Worshipped", ["Israel worships before the final plague falls.", "They receive God's word and bow.", "ðŸ™‡ Worship", "ðŸ“£ Promise heard", "ðŸ©¸ Rescue prepared", "Faith responds before the full deliverance is visible."]),
      phrase("ðŸŒ™ At Midnight", ["The announced hour arrives.", "Egypt's long refusal meets God's final judgment.", "ðŸŒ™ Midnight", "âš–ï¸ Judgment", "ðŸ˜¢ Great cry", "The timing shows that God's warning was true."]),
      phrase("ðŸ˜¢ A Great Cry In Egypt", ["The death of the firstborn brings grief through Egypt.", "This is a terrible and weighty judgment.", "ðŸ˜¢ Cry", "ðŸ  Every house touched", "ðŸ‘‘ Pharaoh's house included", "Exodus does not make judgment feel light. It is holy and severe."]),
      phrase("ðŸƒ Rise Up, And Get You Forth", ["Pharaoh finally tells Israel to go.", "The command he resisted now comes from his own mouth.", "ðŸƒ Leave", "ðŸ”“ Release", "ðŸ‘‘ Pharaoh broken", "God has turned refusal into expulsion."]),
    ],
  },
  {
    chapter: 12,
    startVerse: 33,
    endVerse: 51,
    reference: "Exodus 12:33-51",
    title: "Israel Leaves Egypt",
    icon: "ðŸŽ’",
    phrases: [
      phrase("âš¡ The Egyptians Were Urgent", ["Egypt urges Israel to leave quickly.", "The oppressor now fears delay.", "âš¡ Urgency", "ðŸƒ Departure", "âš–ï¸ Judgment behind them", "God can make the system that held people captive push them out."]),
      phrase("ðŸž Before It Was Leavened", ["Israel carries dough before it rises.", "The food itself tells the story of haste.", "ðŸž Unleavened dough", "ðŸŽ’ Wrapped possessions", "ðŸƒ Quick departure", "Their bread becomes a reminder that God delivered suddenly."]),
      phrase("ðŸ‘¥ About Six Hundred Thousand", ["The small family from Genesis has become a great multitude.", "This shows the promise visibly multiplied.", "ðŸ‘¥ Multitude", "ðŸ“ˆ Growth", "ðŸ“œ Abraham's promise", "God kept His word in Egypt."]),
      phrase("ðŸŒ A Mixed Multitude", ["Non-Israelites leave with Israel.", "The Exodus already has a wider witness.", "ðŸŒ Outsiders", "ðŸ‘¥ Traveling with Israel", "ðŸ“£ God's fame spreading", "God's rescue draws more than one ethnic household into the movement."]),
      phrase("â³ Four Hundred And Thirty Years", ["The timeline shows long waiting.", "Generations lived and died before this night.", "â³ 430 years", "ðŸ˜£ Long affliction", "ðŸ“œ Promise kept", "God's timing can feel long, but Exodus says He did not forget."]),
      phrase("ðŸŒ™ A Night To Be Much Observed", ["The night becomes holy memory.", "Israel must keep watching it through generations.", "ðŸŒ™ Night of rescue", "ðŸ§  Memory", "ðŸ™ Worship", "Freedom needs remembrance so the Rescuer is not forgotten."]),
      phrase("ðŸ½ï¸ The Ordinance Of The Passover", ["God gives rules for the meal after the rescue.", "Deliverance creates ordered worship.", "ðŸ½ï¸ Meal", "ðŸ“œ Ordinance", "ðŸ‘¥ Covenant people", "Passover is not random celebration; it shapes the identity of the redeemed."]),
      phrase("âœ‚ï¸ Circumcised", ["The Passover meal is tied to covenant belonging.", "Outsiders may join, but not casually.", "âœ‚ï¸ Covenant sign", "ðŸŒ Stranger welcomed", "ðŸ“œ Same law", "Grace welcomes people into belonging, not detached religious sampling."]),
      phrase("ðŸª– By Their Armies", ["Israel leaves Egypt by their hosts.", "Former slaves are described as organized people under God's command.", "ðŸª– Hosts", "ðŸ”“ Freed people", "ðŸ§­ Ordered journey", "God is forming a people, not only emptying Egypt of laborers."]),
    ],
  },
  {
    chapter: 13,
    startVerse: 1,
    endVerse: 16,
    reference: "Exodus 13:1-16",
    title: "Redeemed People Remember",
    icon: "ðŸ§ ",
    phrases: [
      phrase("ðŸ‘¶ Sanctify Unto Me All The Firstborn", ["God claims the firstborn because He spared Israel's firstborn.", "Rescue creates belonging.", "ðŸ‘¶ Firstborn", "ðŸ›¡ï¸ Spared by mercy", "ðŸ™ Set apart to God", "The life God protected is now marked as His."]),
      phrase("ðŸ§  Remember This Day", ["God commands memory immediately after deliverance.", "Freed people can forget quickly.", "ðŸ§  Remember", "ðŸ”“ Brought out", "ðŸ’ª Strong hand", "Memory becomes part of worship."]),
      phrase("ðŸž No Leavened Bread", ["Unleavened bread keeps the haste of rescue visible.", "The absence of leaven teaches the story.", "ðŸž Unleavened", "ðŸƒ Haste", "ðŸ“… Repeated feast", "Israel eats memory into the next generation."]),
      phrase("ðŸžï¸ When The Lord Shall Bring Thee", ["The command looks forward to the land.", "Passover memory must continue after the crisis is over.", "ðŸžï¸ Promised land", "ðŸ“œ Old oath", "ðŸ§  Continued remembrance", "God does not want comfort in the land to erase memory of rescue."]),
      phrase("ðŸ‘¶ When Thy Son Asketh Thee", ["Children will ask what the practices mean.", "God wants parents ready with the story.", "ðŸ‘¶ Question", "ðŸ“– Answer", "ðŸ’ª By strength of hand", "Faith is passed on through explained remembrance."]),
      phrase("âœ‹ A Sign Unto Thee Upon Thine Hand", ["The rescue is to shape action and thought.", "Hand and eyes point to daily life and memory.", "âœ‹ Actions", "ðŸ‘€ Attention", "ðŸ“œ God's law", "Deliverance belongs in ordinary life, not only festival days."]),
      phrase("ðŸ‘ Thou Shalt Redeem", ["The firstborn son is redeemed, not sacrificed.", "God teaches that life is claimed by Him and is rescued by provision.", "ðŸ‘ Substitute", "ðŸ‘¶ Firstborn son", "ðŸ¤² Redemption", "The language prepares the Bible's larger theme of rescue through a price."]),
    ],
  },
  {
    chapter: 13,
    startVerse: 17,
    endVerse: 22,
    reference: "Exodus 13:17-22",
    title: "God Leads The Long Way",
    icon: "â˜ï¸",
    phrases: [
      phrase("ðŸ§­ God Led Them Not Through The Way Of The Philistines", ["The shortest route is not the route God chooses.", "Israel is free but not yet battle-ready.", "ðŸ§­ Longer road", "âš”ï¸ War avoided", "ðŸ›¡ï¸ Mercy", "A longer path can still be God's kindness."]),
      phrase("ðŸ” Lest Peradventure The People Repent", ["God knows the people's weakness.", "He leads with patience.", "ðŸ” Turning back", "ðŸ˜¨ Fear of war", "â˜ï¸ Guided mercy", "God's route accounts for what His people can actually bear."]),
      phrase("ðŸª– Harnessed", ["Israel leaves in ordered formation.", "They are no longer a scattered slave population.", "ðŸª– Ordered hosts", "ðŸ”“ Freed people", "ðŸ§­ Journey begins", "God is shaping their identity as His people."]),
      phrase("ðŸ¦´ Moses Took The Bones Of Joseph", ["Joseph's bones connect Exodus back to Genesis 50.", "Joseph believed God would surely visit His people.", "ðŸ¦´ Bones", "ðŸ“œ Promise remembered", "ðŸžï¸ Canaan hope", "Even Joseph's remains preach that Egypt is not the final home."]),
      phrase("â˜ï¸ A Pillar Of Cloud", ["God gives visible guidance by day.", "A newly freed people need more than release; they need direction.", "â˜ï¸ Cloud", "ðŸ§­ Guidance", "ðŸ‘¥ God with them", "Israel is not wandering alone."]),
      phrase("ðŸ”¥ A Pillar Of Fire", ["The fire gives light by night.", "God's presence guides in darkness too.", "ðŸ”¥ Fire", "ðŸŒ™ Night", "ðŸ’¡ Light", "The journey can continue because the LORD leads both day and night."]),
    ],
  },
  {
    chapter: 14,
    startVerse: 1,
    endVerse: 14,
    reference: "Exodus 14:1-14",
    title: "Fear At The Sea",
    icon: "ðŸ˜¨",
    phrases: [
      phrase("ðŸŒŠ Camp Before The Sea", ["God leads Israel to a place that looks trapped.", "The sea is in front and Egypt will come behind.", "ðŸŒŠ Sea", "ðŸœï¸ Wilderness", "ðŸŽ Army coming", "The setup looks impossible, but it is not outside God's plan."]),
      phrase("ðŸª¤ They Are Entangled In The Land", ["Pharaoh thinks Israel is trapped.", "He reads the geography without seeing God.", "ðŸª¤ Trap", "ðŸ‘‘ Pharaoh's confidence", "ðŸŒŠ Sea", "What looks like entanglement to Pharaoh will become deliverance for Israel."]),
      phrase("ðŸŽ Six Hundred Chosen Chariots", ["Egypt brings elite military power.", "The contrast is extreme: chariots against freed slaves.", "ðŸŽ Chariots", "âš”ï¸ Army", "ðŸ˜¨ Fear", "The visible threat is real, which makes God's rescue unmistakable."]),
      phrase("ðŸ˜¨ They Were Sore Afraid", ["Israel's fear is understandable.", "The army is real.", "ðŸ˜¨ Fear", "ðŸŒŠ Sea", "ðŸŽ Pursuit", "But fear becomes dangerous when it rewrites God's rescue as a mistake."]),
      phrase("âš°ï¸ Because There Were No Graves In Egypt", ["The people speak with bitter sarcasm.", "They accuse Moses of bringing them out to die.", "âš°ï¸ Graves", "ðŸ˜£ Panic", "ðŸ” Egypt nostalgia", "Fear can make bondage look safer than faith."]),
      phrase("ðŸ›‘ Fear Ye Not", ["Moses commands the people not to fear.", "This is not because the danger is fake, but because God is real.", "ðŸ›‘ Fear not", "ðŸ‘€ Stand still", "ðŸ›¡ï¸ Salvation coming", "Faith begins by looking away from Egypt's power to the LORD's promise."]),
      phrase("ðŸ‘€ Stand Still, And See", ["Israel cannot save itself at the sea.", "They must watch God act.", "ðŸ‘€ Stand still", "ðŸ›¡ï¸ Salvation", "ðŸ’ª The LORD acts", "This moment teaches salvation before it teaches strategy."]),
      phrase("ðŸ›¡ï¸ The Lord Shall Fight For You", ["God Himself will fight for Israel.", "The Exodus is not Israel's military victory.", "ðŸ›¡ï¸ The LORD fights", "ðŸ¤« Hold peace", "ðŸŽ Egypt defeated", "The people are rescued by divine power, not battle skill."]),
    ],
  },
  {
    chapter: 14,
    startVerse: 15,
    endVerse: 31,
    reference: "Exodus 14:15-31",
    title: "The Sea Opens",
    icon: "ðŸŒŠ",
    phrases: [
      phrase("ðŸš¶ Go Forward", ["After standing still, Israel must move.", "Faith changes posture when God commands.", "ðŸ‘€ Stand still", "ðŸš¶ Go forward", "ðŸŒŠ Path opening", "Waiting and walking both belong with obedience."]),
      phrase("â˜ï¸ The Pillar Removed", ["The cloud moves between Egypt and Israel.", "God's presence becomes a shield behind them.", "â˜ï¸ Cloud", "ðŸ›¡ï¸ Protection", "ðŸŽ Egypt blocked", "The LORD knows where His people need defense."]),
      phrase("ðŸŒ¬ï¸ A Strong East Wind", ["God uses wind to divide the sea.", "Creation obeys the Creator.", "ðŸŒ¬ï¸ Wind", "ðŸŒŠ Waters divided", "ðŸœï¸ Dry ground", "The rescue echoes creation: God brings order and dry land through waters."]),
      phrase("ðŸ§± A Wall Unto Them", ["The waters stand like walls on both sides.", "The sea that looked like death becomes a passage.", "ðŸ§± Water walls", "ðŸš¶ Israel walking", "ðŸ›¡ï¸ God preserving", "The impossible path exists because God commands it."]),
      phrase("âš™ï¸ Took Off Their Chariot Wheels", ["Egypt follows, but their strength breaks down.", "The chariots that terrified Israel become useless.", "âš™ï¸ Wheels off", "ðŸŽ Army troubled", "âš–ï¸ Pride collapsing", "God can dismantle the very power people trust."]),
      phrase("ðŸƒ Let Us Flee", ["Egypt finally recognizes the LORD fights for Israel.", "But the recognition comes too late.", "ðŸƒ Panic", "ðŸ›¡ï¸ The LORD fights", "ðŸŒŠ Waters returning", "The oppressor's confidence collapses inside the place of judgment."]),
      phrase("ðŸ‘€ Israel Saw That Great Work", ["The people see the LORD's deliverance.", "The sight leads to fear of the LORD and belief.", "ðŸ‘€ Saw", "ðŸ™‡ Feared", "ðŸ¤² Believed", "Deliverance becomes a foundation for worship and trust."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 1,
    endVerse: 21,
    reference: "Exodus 15:1-21",
    title: "Israel Sings The Victory",
    icon: "ðŸŽ¶",
    phrases: [
      phrase("ðŸŽ¶ I Will Sing Unto The Lord", ["The first major song rises from deliverance.", "Israel does not merely escape; they worship.", "ðŸŽ¶ Song", "ðŸŒŠ Sea rescue", "ðŸ™Œ Praise", "God's saving work becomes the people's music."]),
      phrase("ðŸŽ Horse And His Rider", ["The song remembers Egypt's military pride thrown into the sea.", "What terrified Israel is gone.", "ðŸŽ Horse", "âš”ï¸ Rider", "ðŸŒŠ Sea", "The line celebrates the LORD's victory over visible power."]),
      phrase("ðŸ’ª The Lord Is My Strength And Song", ["God is not only the One who gives strength.", "He becomes the center of song.", "ðŸ’ª Strength", "ðŸŽ¶ Song", "ðŸ›¡ï¸ Salvation", "The rescued people now have a new source of confidence."]),
      phrase("ðŸ‘‘ The Lord Is A Man Of War", ["The song praises the LORD as warrior.", "He fought for His oppressed people.", "ðŸ‘‘ Warrior", "âš–ï¸ Justice", "ðŸ›¡ï¸ Rescue", "This is not random violence; it is holy deliverance from oppression."]),
      phrase("â“ Who Is Like Unto Thee", ["The question is worship.", "No rival compares to the LORD.", "â“ Who is like", "âœ¨ Glorious in holiness", "ðŸ™Œ Fearful in praises", "Egypt's gods and Pharaoh's power have been exposed as nothing beside Him."]),
      phrase("ðŸžï¸ Thou Shalt Bring Them In", ["The song looks forward to the destination.", "God did not rescue Israel to leave them nowhere.", "ðŸžï¸ Bring them in", "â›°ï¸ Holy habitation", "ðŸ“œ Promise ahead", "Deliverance has a destination: life near God."]),
      phrase("ðŸ¥ Miriam The Prophetess", ["Miriam leads the women in praise.", "Her leadership is visible and named.", "ðŸ¥ Timbrel", "ðŸ’ƒ Dance", "ðŸŽ¶ Answering song", "The victory reaches the whole community, and worship spreads through it."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 22,
    endVerse: 27,
    reference: "Exodus 15:22-27",
    title: "Bitter Water And The God Who Heals",
    icon: "ðŸ’§",
    phrases: [
      phrase("ðŸœï¸ Three Days In The Wilderness", ["The song is followed by thirst.", "Spiritual highs do not remove real needs.", "ðŸœï¸ Wilderness", "â³ Three days", "ðŸ’§ No water", "Israel must learn trust after the sea."]),
      phrase("ðŸ’§ The Waters Of Marah", ["The water exists, but it is bitter.", "Need turns into disappointment.", "ðŸ’§ Water found", "ðŸ˜– Bitter", "ðŸ˜£ Cannot drink", "The wilderness exposes the heart quickly."]),
      phrase("ðŸ˜£ The People Murmured", ["Israel complains against Moses.", "Their thirst is real, but their response turns against God's servant.", "ðŸ˜£ Complaint", "ðŸ’§ Need", "ðŸ§  Short memory", "The people who sang at the sea now struggle at the water."]),
      phrase("ðŸŒ³ The Lord Shewed Him A Tree", ["God shows Moses what to do.", "The tree is God's appointed means for healing the water.", "ðŸŒ³ Tree", "ðŸ’§ Bitter made sweet", "ðŸ¤² Provision", "God can make bitter places livable."]),
      phrase("ðŸ©º I Am The Lord That Healeth Thee", ["God reveals Himself as healer.", "He cares for His people after the dramatic rescue.", "ðŸ©º Healing", "ðŸ’§ Water", "ðŸœï¸ Wilderness", "The LORD is not only the God who defeats Egypt; He heals His people on the road."]),
      phrase("ðŸŒ´ Elim", ["After Marah, Israel comes to Elim with twelve wells and seventy palm trees.", "God gives refreshment after testing.", "ðŸŒ´ Palm trees", "ðŸ’§ Twelve wells", "ðŸ•ï¸ Rest", "The wilderness includes bitter places, but not only bitter places."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 12,
    reference: "Exodus 16:1-12",
    title: "Bread From Heaven",
    icon: "ðŸž",
    phrases: [
      phrase("ðŸœï¸ Wilderness Of Sin", ["This is a wilderness location, not a claim that the place itself is sinful.", "Israel is away from Egypt's food system now.", "ðŸœï¸ Wilderness", "ðŸ½ï¸ Hunger", "ðŸ¤² Dependence", "Freedom requires learning a new source of daily life."]),
      phrase("ðŸ˜£ The Whole Congregation Murmured", ["The complaint spreads through the community.", "Hunger is real, but fear turns into accusation.", "ðŸ˜£ Murmuring", "ðŸ‘¥ Whole congregation", "ðŸ½ï¸ Hunger", "Pressure can make a rescued people speak like Egypt was better."]),
      phrase("ðŸ² Flesh Pots", ["Israel remembers Egypt's food while forgetting Egypt's cruelty.", "Fear edits memory.", "ðŸ² Meat pots", "ðŸž Bread to the full", "ðŸ”’ Slavery minimized", "Hunger can make bondage sound safer than trust."]),
      phrase("ðŸž I Will Rain Bread From Heaven", ["God answers hunger with bread from above.", "Israel cannot produce it or control it.", "ðŸž Bread", "â˜ï¸ From heaven", "ðŸ¤² Gift", "Daily life will become a classroom of trust."]),
      phrase("ðŸ“ A Certain Rate Every Day", ["God gives daily limits.", "The people must gather enough for each day.", "ðŸ“ Measured portion", "ðŸ“… Daily rhythm", "ðŸ¤² Trust", "God is training them out of hoarding and into dependence."]),
      phrase("ðŸ§ª That I May Prove Them", ["The manna is food and a test.", "God is forming a people who listen.", "ðŸ§ª Test", "ðŸž Provision", "ðŸ“œ Law", "Provision is not only survival; it is discipleship."]),
      phrase("ðŸ‘‚ The Lord Heareth Your Murmurings", ["God hears even the complaints.", "The people aim their frustration at Moses and Aaron, but the deeper issue is with the LORD.", "ðŸ‘‚ God hears", "ðŸ˜£ Murmuring", "ðŸ™ Need", "God answers with provision, but He also names the complaint truthfully."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 13,
    endVerse: 36,
    reference: "Exodus 16:13-36",
    title: "Manna And Sabbath Rest",
    icon: "â“",
    phrases: [
      phrase("ðŸ¦ Quails Came Up", ["God provides meat in the evening.", "He answers the people's complaint with real provision.", "ðŸ¦ Quail", "ðŸŒ™ Evening", "ðŸ½ï¸ Food", "The wilderness is not too empty for God to feed His people."]),
      phrase("â“ What Is It", ["Manna is connected to Israel's question.", "They receive provision they do not recognize.", "â“ What is it", "ðŸž Bread from the LORD", "ðŸ¤² Strange gift", "God's provision may be unfamiliar before it becomes daily bread."]),
      phrase("ðŸ“ An Omer For Every Man", ["Each person gathers according to need.", "No one is meant to lack, and no one is meant to hoard.", "ðŸ“ Omer", "ðŸ‘¥ Every person", "âš–ï¸ Enough", "God's economy trains the community in sufficiency."]),
      phrase("ðŸª± It Bred Worms", ["When people keep manna against God's command, it spoils.", "Hoarding disobeys the daily lesson.", "ðŸª± Worms", "ðŸ˜– Stench", "ðŸ›‘ Distrust exposed", "God is teaching trust one morning at a time."]),
      phrase("ðŸ›‘ The Rest Of The Holy Sabbath", ["Sabbath appears before Sinai's tablets.", "Former slaves are taught holy rest.", "ðŸ›‘ Rest", "ðŸž Double portion", "ðŸ“… Seventh day", "Rest is not laziness; it is trust in God's provision."]),
      phrase("ðŸš« There Was None", ["Some still go out looking for manna on Sabbath.", "They struggle to trust rest.", "ðŸš« No manna", "ðŸ›‘ Sabbath", "ðŸ˜Ÿ Slave habits", "A rescued people must learn that God gives enough for rest too."]),
      phrase("ðŸº Lay Up An Omer", ["A portion of manna is kept as a witness for future generations.", "God wants the miracle remembered.", "ðŸº Omer kept", "ðŸ‘¶ Generations", "ðŸ“– Testimony", "The daily bread becomes evidence of God's faithfulness in the wilderness."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 7,
    reference: "Exodus 17:1-7",
    title: "Water From The Rock",
    icon: "ðŸ’§",
    phrases: [
      phrase("ðŸ’§ No Water For The People To Drink", ["The need is real.", "The wilderness has brought Israel to thirst again.", "ðŸ’§ No water", "ðŸœï¸ Rephidim", "ðŸ˜£ Pressure", "Exodus does not pretend the need is small. It shows what need reveals."]),
      phrase("âš–ï¸ The People Did Chide", ["The people quarrel with Moses.", "Fear turns into accusation.", "âš–ï¸ Quarreling", "ðŸ˜£ Thirst", "ðŸ§  Forgetting", "The deeper question is whether they trust the God who has already provided."]),
      phrase("ðŸª¨ Smite The Rock", ["God tells Moses to strike the rock at Horeb.", "Water comes from an unlikely place.", "ðŸª¨ Rock", "ðŸªµ Rod", "ðŸ’§ Water", "The staff used in judgment on Egypt now becomes connected to provision for Israel."]),
      phrase("â“ Is The Lord Among Us, Or Not", ["This question names the heart issue.", "Israel's thirst is real, but they question God's presence.", "â“ Is God here", "ðŸ’§ Need", "ðŸ˜¨ Doubt", "The wilderness tests whether they know the LORD is with them when the next need appears."]),
      phrase("ðŸ“ Massah And Meribah", ["The place is named for testing and quarrelling.", "Place names in Exodus preserve spiritual memory.", "ðŸ“ Massah", "ðŸ“ Meribah", "ðŸ§  Warning", "The map itself becomes a reminder of mistrust and God's provision."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 8,
    endVerse: 16,
    reference: "Exodus 17:8-16",
    title: "The Lord Is My Banner",
    icon: "ðŸ³ï¸",
    phrases: [
      phrase("âš”ï¸ Then Came Amalek", ["The first battle comes after the water crisis.", "Freedom does not mean life becomes battle-free.", "âš”ï¸ Amalek", "ðŸœï¸ Wilderness", "ðŸ›¡ï¸ Need for God", "Israel must learn dependence in conflict as well as thirst."]),
      phrase("ðŸª– Joshua", ["Joshua appears as a battle leader.", "This is an early introduction to someone who will matter later.", "ðŸª– Joshua", "âš”ï¸ Fighting below", "â›°ï¸ Moses above", "God's deliverance uses different servants in different roles."]),
      phrase("ðŸ™Œ When Moses Held Up His Hand", ["The battle is connected to Moses' raised hands.", "Israel's victory is not explained by military strength alone.", "ðŸ™Œ Raised hands", "âš”ï¸ Battle", "ðŸ¤² Dependence", "The scene shows that victory depends on the LORD."]),
      phrase("ðŸ¥€ Moses' Hands Were Heavy", ["Moses is called, but he is still human.", "His weakness is not hidden.", "ðŸ¥€ Heavy hands", "ðŸª¨ Stone seat", "ðŸ¤ Help needed", "Faithful leadership often requires faithful support."]),
      phrase("ðŸ¤ Aaron And Hur Stayed Up His Hands", ["Aaron and Hur support Moses until sunset.", "Their hidden help matters to the victory.", "ðŸ¤ Support", "ðŸ™Œ Steady hands", "âš”ï¸ Victory", "Exodus honors the people who hold up weary servants."]),
      phrase("ðŸ³ï¸ Jehovah-Nissi", ["Moses names the altar The LORD is my banner.", "A banner marks identity and rallying point.", "ðŸ³ï¸ Banner", "ðŸ™Œ Worship", "ðŸ›¡ï¸ Victory comes from God", "Israel must remember whose name stands over the battle."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 12,
    reference: "Exodus 18:1-12",
    title: "Jethro Hears What God Has Done",
    icon: "ðŸ‘‚",
    phrases: [
      phrase("ðŸ‘‚ Jethro Heard", ["The Exodus is becoming testimony beyond Israel.", "Jethro hears what God has done.", "ðŸ‘‚ Heard", "ðŸŒ Outsider listening", "ðŸ“£ God's works spreading", "Deliverance is meant to be known."]),
      phrase("ðŸ  Zipporah", ["Moses' family is brought back into the story.", "The deliverer is also a husband and father.", "ðŸ  Family", "ðŸ‘¥ Reunion", "ðŸ§­ Journey", "Exodus keeps public mission and personal household in view."]),
      phrase("ðŸ—£ï¸ Moses Told His Father In Law All", ["Moses tells the story of deliverance and hardship.", "Good testimony does not hide trouble.", "ðŸ—£ï¸ Told all", "âš–ï¸ What Pharaoh did", "ðŸ›¡ï¸ How the LORD delivered", "The story is for God's glory, not Moses' image."]),
      phrase("ðŸ˜Š Jethro Rejoiced", ["Jethro rejoices over God's goodness to Israel.", "An outsider celebrates the LORD's rescue.", "ðŸ˜Š Joy", "ðŸ™Œ Blessing", "ðŸŒ Wider witness", "God's salvation draws praise from beyond the rescued people."]),
      phrase("ðŸ‘‘ Greater Than All Gods", ["Jethro confesses the LORD's greatness.", "Egypt's gods have been exposed.", "ðŸ‘‘ Greater", "âš–ï¸ Proud enemies judged", "ðŸ™Œ The LORD blessed", "The Exodus reveals supremacy, not merely power."]),
      phrase("ðŸ½ï¸ Eat Bread With Moses' Father In Law Before God", ["The chapter ends with a meal before God.", "Deliverance becomes fellowship and worship.", "ðŸ½ï¸ Meal", "ðŸ‘´ Elders", "ðŸ™Œ Before God", "Testimony leads to shared worship."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 13,
    endVerse: 27,
    reference: "Exodus 18:13-27",
    title: "Jethro Teaches Shared Leadership",
    icon: "ðŸ§‘â€âš–ï¸",
    phrases: [
      phrase("ðŸ§‘â€âš–ï¸ Moses Sat To Judge The People", ["Moses is carrying dispute after dispute.", "The need is real, but the load is too heavy.", "ðŸ§‘â€âš–ï¸ Judging", "ðŸ‘¥ People waiting", "ðŸ˜“ One man overloaded", "Good work can still be unsustainable."]),
      phrase("â“ Why Sittest Thou Thyself Alone", ["Jethro asks a wise question.", "He sees the strain Moses has normalized.", "â“ Why alone", "ðŸ‘€ Outside perspective", "ðŸ§  Wisdom", "Sometimes faithful leaders need someone else to name what is not working."]),
      phrase("ðŸ˜“ Thou Wilt Surely Wear Away", ["Jethro warns Moses that the load will wear him out.", "The people will suffer too.", "ðŸ˜“ Exhaustion", "ðŸ‘¥ People burdened", "âš ï¸ Not sustainable", "Human limits are not failure; they are part of wise leadership."]),
      phrase("ðŸ“– Teach Them Ordinances And Laws", ["Moses must teach the people God's ways, not only solve cases.", "Instruction helps the whole community mature.", "ðŸ“– Teach", "ðŸ§­ Show the way", "ðŸ‘¥ Form the people", "Leadership is not only answering problems; it is shaping understanding."]),
      phrase("ðŸ§‘â€âš–ï¸ Able Men", ["Jethro describes the kind of leaders needed.", "Ability and character both matter.", "ðŸ§‘â€âš–ï¸ Able", "ðŸ™ Fear God", "ðŸ—£ï¸ Truth", "ðŸš« Hating covetousness", "Shared leadership must be trustworthy leadership."]),
      phrase("ðŸ¤ They Shall Bear The Burden With Thee", ["The load is shared.", "Moses does not have to carry every case alone.", "ðŸ¤ Shared burden", "ðŸ‘¥ Ordered people", "ðŸ˜Œ Sustainable service", "God's care can come through wise structure."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 15,
    reference: "Exodus 19:1-15",
    title: "Israel Comes To Sinai",
    icon: "â›°ï¸",
    phrases: [
      phrase("â›°ï¸ Wilderness Of Sinai", ["Israel arrives at the mountain region where God will speak covenant words.", "The rescue from Egypt is moving toward relationship.", "â›°ï¸ Sinai", "ðŸ•ï¸ Camp", "ðŸ“œ Covenant coming", "God brought them out so He could bring them near."]),
      phrase("ðŸ¦… Bare You On Eagles' Wings", ["God describes the Exodus as carrying Israel.", "They did not fly themselves out.", "ðŸ¦… Carried", "ðŸ”“ Brought out", "ðŸ  Brought unto God", "Deliverance is grace before it is responsibility."]),
      phrase("ðŸ’Ž A Peculiar Treasure", ["Israel is called God's treasured possession.", "This is identity before law-keeping is described.", "ðŸ’Ž Treasure", "ðŸŒ All earth is God's", "ðŸ‘¥ Covenant people", "God's commands come to people He has already claimed."]),
      phrase("ðŸ‘‘ A Kingdom Of Priests", ["Israel is called to represent God among the nations.", "Their identity has a priestly purpose.", "ðŸ‘‘ Kingdom", "ðŸ™ Priests", "ðŸ•Šï¸ Holy nation", "Rescue gives Israel a calling, not just relief."]),
      phrase("ðŸ™‹ All That The Lord Hath Spoken We Will Do", ["The people answer covenant words with commitment.", "They agree before hearing all the details.", "ðŸ™‹ We will do", "ðŸ“œ God's words", "ðŸ¤ Covenant response", "The moment is serious because Israel is entering binding relationship with the LORD."]),
      phrase("ðŸ§¼ Sanctify Them", ["The people must prepare to meet God.", "Washing clothes becomes an outward sign of readiness.", "ðŸ§¼ Washed garments", "â³ Third day", "ðŸ”¥ Holy presence", "Grace does not make God's nearness casual."]),
      phrase("ðŸš§ Set Bounds", ["Boundaries are placed around the mountain.", "Nearness to God must be approached God's way.", "ðŸš§ Boundary", "â›°ï¸ Mountain", "âš ï¸ Warning", "The limits are mercy because God's holiness is weighty."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 16,
    endVerse: 25,
    reference: "Exodus 19:16-25",
    title: "The Lord Descends On Sinai",
    icon: "âš¡",
    phrases: [
      phrase("âš¡ Thunders And Lightnings", ["Sinai overwhelms the senses.", "God's arrival is not casual.", "âš¡ Lightning", "ðŸŒ©ï¸ Thunder", "ðŸŽº Trumpet", "The people are encountering the living God, not receiving religious tips."]),
      phrase("ðŸ”¥ The Lord Descended Upon It In Fire", ["Fire marks God's holy presence on the mountain.", "The mountain smokes because the LORD descends.", "ðŸ”¥ Fire", "â›°ï¸ Mountain", "â˜ï¸ Smoke", "God comes near, and creation trembles."]),
      phrase("ðŸŒ‹ The Whole Mount Quaked Greatly", ["The mountain shakes.", "The physical world responds to God's presence.", "ðŸŒ‹ Quaking", "ðŸ˜¨ People trembling", "ðŸ‘‘ Divine majesty", "Sinai teaches reverence before any command is given."]),
      phrase("ðŸŽº The Voice Of The Trumpet", ["The trumpet grows louder and louder.", "The scene builds holy fear.", "ðŸŽº Trumpet", "ðŸ“£ God answering", "â›°ï¸ Moses speaks", "The sound marks the seriousness of covenant encounter."]),
      phrase("âš ï¸ Charge The People", ["God repeats the warning not to break through.", "The boundary matters.", "âš ï¸ Warning", "ðŸš§ Boundary", "ðŸ”¥ Holiness", "God is near, but approach still requires reverence."]),
      phrase("ðŸ‘¥ Let The Priests Also", ["Even priests must sanctify themselves.", "Religious role does not make someone casual before God.", "ðŸ‘¥ Priests", "ðŸ§¼ Sanctified", "ðŸ”¥ Holy God", "The closer the service, the greater the need for reverence."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 11,
    reference: "Exodus 20:1-11",
    title: "Love The Lord Your God",
    icon: "â˜ï¸",
    phrases: [
      phrase("ðŸ—£ï¸ God Spake All These Words", ["The commandments come from God Himself.", "They are not Moses' private leadership ideas.", "ðŸ—£ï¸ God speaks", "ðŸ“œ Covenant words", "ðŸ‘¥ Israel hears", "The law begins with divine speech."]),
      phrase("ðŸ  Out Of The House Of Bondage", ["God begins by reminding Israel of deliverance.", "Obedience is response to rescue.", "ðŸ  Bondage", "ðŸ”“ Brought out", "ðŸ“œ Then command", "The law is given to freed people, not as a ladder to earn freedom."]),
      phrase("â˜ï¸ No Other Gods Before Me", ["The LORD requires exclusive worship.", "Israel has left Egypt's world of many gods.", "â˜ï¸ One LORD", "ðŸš« No rivals", "ðŸ¤ Covenant loyalty", "Freedom begins with worship rightly ordered."]),
      phrase("ðŸªµ Graven Image", ["An idol tries to make the divine manageable.", "God forbids worship through human-made images.", "ðŸªµ Image", "ðŸ‘ï¸ Visible control", "ðŸš« False worship", "The LORD must be received as He reveals Himself, not reduced to what people can handle."]),
      phrase("ðŸ•Šï¸ Name Of The Lord In Vain", ["God's name must not be carried lightly, falsely, or emptily.", "This is bigger than a single careless phrase.", "ðŸ•Šï¸ Name", "âš–ï¸ Weight", "ðŸ‘¥ Representation", "God's people must not claim His name while emptying it of truth."]),
      phrase("ðŸ›‘ Remember The Sabbath Day", ["Former slaves are commanded to rest.", "This command pushes against Pharaoh's endless production.", "ðŸ›‘ Sabbath", "ðŸ˜Œ Rest", "ðŸ™ Holy time", "The LORD gives His people a rhythm Egypt never gave them."]),
      phrase("ðŸŒ For In Six Days The Lord Made Heaven And Earth", ["Sabbath is grounded in creation.", "Israel's weekly rhythm reflects God's ordering of time.", "ðŸŒ Creation", "ðŸ“… Six days", "ðŸ›‘ Seventh day", "Rest is built into the world by the Creator."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 12,
    endVerse: 26,
    reference: "Exodus 20:12-26",
    title: "Life With Neighbor And Holy Fear",
    icon: "ðŸ¤",
    phrases: [
      phrase("ðŸ‘ª Honour Thy Father And Thy Mother", ["God protects family order and generational faithfulness.", "A redeemed community must learn honor.", "ðŸ‘ª Parents", "ðŸ  Household", "ðŸ“œ Covenant life", "Freedom must shape home life."]),
      phrase("ðŸ©¸ Thou Shalt Not Kill", ["Human life is protected by God's command.", "Former slaves must not become people who treat life cheaply.", "ðŸ©¸ Life", "ðŸ›¡ï¸ Protection", "âš–ï¸ Accountability", "The God who judged Egypt's violence now commands His people to honor life."]),
      phrase("ðŸ’ Thou Shalt Not Commit Adultery", ["God protects marriage covenant.", "Faithfulness matters in the life of a redeemed people.", "ðŸ’ Marriage", "ðŸ¤ Faithfulness", "ðŸ  Family stability", "Covenant with God shapes covenant with people."]),
      phrase("ðŸ§¾ Thou Shalt Not Steal", ["God protects a neighbor's property and livelihood.", "The people rescued from exploitation must not exploit one another.", "ðŸ§¾ Property", "ðŸ¤ Neighbor", "âš–ï¸ Justice", "Freedom is not permission to take."]),
      phrase("ðŸ—£ï¸ Thou Shalt Not Bear False Witness", ["Truth matters because lies can destroy justice and community.", "Words are moral actions.", "ðŸ—£ï¸ Witness", "âš–ï¸ Court", "ðŸ¤ Neighbor", "A redeemed people must not use speech as a weapon."]),
      phrase("ðŸ§  Thou Shalt Not Covet", ["The final command reaches desire.", "God cares about what the heart rehearses wanting.", "ðŸ§  Desire", "ðŸ  Neighbor's house", "ðŸ’” Inner disorder", "The law does not stop at behavior; it exposes the heart."]),
      phrase("ðŸ˜¨ The People Stood Afar Off", ["The people tremble at Sinai.", "They feel the weight of God's voice.", "ðŸ˜¨ Fear", "â›°ï¸ Distance", "ðŸ”¥ Holy presence", "Sinai teaches that nearness to God is a gift, not a casual right."]),
      phrase("ðŸ”¥ His Fear May Be Before Your Faces", ["Moses explains holy fear.", "This fear is meant to keep them from sin.", "ðŸ”¥ Reverence", "ðŸ›‘ Guardrail", "ðŸ“œ Obedience", "Biblical fear is not thinking God is cruel; it is taking Him seriously."]),
      phrase("ðŸª¨ An Altar Of Earth", ["God gives simple altar instructions.", "Worship must not become a display of human pride.", "ðŸª¨ Earth altar", "ðŸ™ Sacrifice", "ðŸš« No performance", "The God who thundered at Sinai still teaches humble worship."]),
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
  return phrase(`ðŸ“Œ ${title}`, [
    body,
    summary,
    "The wording is carrying the rescue story forward.",
    "Israel is out of Egypt, but the Lord is still teaching them what freedom, worship, memory, and trust look like.",
    "ðŸŒŠ Rescue",
    "ðŸž Provision",
    "ðŸ§­ Guidance",
    "â›°ï¸ Covenant",
    "The detail helps a beginner see that deliverance is not only escape from Pharaoh; it is formation under God's care.",
  ]);
}

function makeBeginnerExodusPhrase(title: string, section: PersonalExodusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the scene is easier to follow.`,
    focus,
    "For a beginner, the key is to see how ordinary needs become teaching moments.",
    "The Lord is using roads, water, bread, battle, law, and worship to train a newly rescued people.",
    "ðŸŒŠ Fear at the sea",
    "ðŸŽ¶ Songs after rescue",
    "ðŸž Bread in the wilderness",
    "â›°ï¸ Meeting with God",
    `In ${section.title}, Exodus is showing what freedom looks like when God is the one leading.`,
  ]);
}

function ensureBeginnerExodusPhraseDepth(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerExodusPhrase("ðŸ§­ What Is Happening Here?", section, "The wording helps the reader locate the scene: Israel has been rescued, but now they must learn what freedom, worship, and trust look like."),
    makeBeginnerExodusPhrase("ðŸ”Ž Why This Detail Matters", section, "This detail matters because Exodus does not stop at leaving Egypt; it teaches how rescued people remember, obey, and depend on God."),
    makeBeginnerExodusPhrase("ðŸ§  Beginner Connection", section, "A new Bible reader may not know why the story slows down over food, water, bones, songs, or route changes, but those details teach God's care."),
    makeBeginnerExodusPhrase("ðŸ§µ Watch The Pattern", section, "Watch the pattern: God rescues, Israel fears or grumbles, God provides, and the people are invited to trust Him more deeply."),
    makeBeginnerExodusPhrase("â¤ï¸ What This Shows About People", section, "This scene shows how quickly rescued people can become afraid, hungry, forgetful, or unsure when the next need appears."),
    makeBeginnerExodusPhrase("ðŸ™Œ What This Shows About God", section, "This scene shows the LORD as deliverer, guide, warrior, healer, provider, and patient teacher in the wilderness."),
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
  const cardTitle = `ðŸ“Œ ${title}`;
  return [cardTitle, polishDay24Exodus11To12PhraseContent(cardTitle, explainDay24Exodus11To12Phrase(section, title))];
}

function removeDay24RepeatedPhraseTitle(title: string, lines: string[]) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const repeatedTitlePattern = new RegExp(`^${escapedTitle}\\s+(means|explains|describes|shows|names|gives|is|stresses|teaches|captures|announces|pictures|protects|closes|deals with)\\s+`, "i");

  return lines.map((line, index) => {
    if (index !== 0) return line;

    return line.replace(repeatedTitlePattern, (_match, verb: string) => {
      const normalizedVerb = verb.toLowerCase();
      if (normalizedVerb === "means") return "";
      if (normalizedVerb === "is") return "This is ";
      return `This ${normalizedVerb} `;
    }).replace(/^([a-z])/, (letter) => letter.toUpperCase());
  });
}

function explainDay24Exodus11To12Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower === "borrow of his neighbour") {
    add("Borrow Of His Neighbour means Israel is told to ask the Egyptians for valuables before leaving.", "Borrow here does not mean a normal short-term loan that Israel plans to return after a weekend.", "It describes requesting goods from neighbors as God prepares to send His people out with provision.", "The enslaved people will not leave Egypt empty-handed.");
  } else if (lower === "the lord gave the people favour") {
    add("The LORD Gave The People Favour means God changed how the Egyptians responded to Israel.", "Favour means goodwill or positive regard.", "This is a reversal: the people Egypt exploited are now treated with generosity.", "The provision comes because the LORD is acting, not because Egypt suddenly became righteous.");
  } else if (lower === "there shall be a great cry" || lower === "there was a great cry in egypt") {
    add(`${title} means grief will fill Egypt after the death of the firstborn.`, "Earlier Israel cried under slavery.", "Now Egypt cries under judgment.", "The phrase is meant to feel heavy because Pharaoh's rebellion has brought sorrow into households across the land.");
  } else if (lower === "he went out from pharaoh in a great anger") {
    add("He Went Out From Pharaoh In A Great Anger means Moses leaves Pharaoh deeply grieved and angry after the final warning.", "This is not a selfish tantrum.", "Pharaoh has rejected God's word again and again, and now Egypt stands on the edge of terrible judgment.", "Moses' anger fits the seriousness of Pharaoh's stubborn sin.");
  } else if (lower === "in the tenth day of this month") {
    add("In The Tenth Day Of This Month gives Israel the day to choose the Passover lamb.", "The rescue night is not handled in panic or guesswork.", "God gives a careful timetable before the judgment falls.", "The family has time to set apart the lamb and prepare for the night of deliverance.");
  } else if (lower === "a lamb for an house") {
    add("A Lamb For An House means each household needs a lamb for the Passover meal and blood sign.", "The rescue is national, but it is received household by household.", "Parents, children, and everyone in the home are brought under the same marked doorway.", "God's deliverance reaches real families at real tables.");
  } else if (lower === "according to the number of the souls") {
    add("According To The Number Of The Souls means the lamb is shared according to the number of people eating.", "Souls here means persons, not ghostly spirits.", "The instruction makes sure the meal fits the household size.", "Passover is careful, communal, and practical.");
  } else if (lower === "your lamb shall be without blemish") {
    add("Your Lamb Shall Be Without Blemish means the Passover lamb must not be defective.", "Blemish means a flaw, injury, or defect.", "Israel is not to bring God careless leftovers for the night of rescue.", "The lamb must be whole because the rescue sign is holy.");
  } else if (lower === "a male of the first year") {
    add("A Male Of The First Year explains what kind of lamb is required.", "The animal is young, fitting, and specifically chosen for Passover.", "This detail keeps the sacrifice from becoming whatever anyone happens to prefer.", "God defines the rescue sign Himself.");
  } else if (lower === "keep it up until the fourteenth day") {
    add("Keep It Up Until The Fourteenth Day means the chosen lamb is kept until the appointed day of slaughter.", "The family lives with the selected lamb for several days.", "That waiting makes the night feel deliberate, not accidental.", "God is training Israel to receive deliverance with careful obedience.");
  } else if (lower === "they shall take of the blood") {
    add("They Shall Take Of The Blood means the lamb's blood must be used, not merely shed and ignored.", "The blood becomes the sign placed on the house.", "Passover is not only about a meal inside; it is also about a marked doorway outside.", "The blood sign is how the household visibly obeys God's command.");
  } else if (lower === "strike it on the two side posts") {
    add("Strike It On The Two Side Posts means the blood is applied to the vertical doorposts of the house.", "The doorway becomes the visible place of the sign.", "Anyone reading slowly should picture the entrance marked by blood.", "The family is sheltered inside the house God told them to mark.");
  } else if (lower === "the blood shall be to you for a token") {
    add("The Blood Shall Be To You For A Token means the blood is a sign of God's promised protection.", "Token means sign or marker.", "The blood does not decorate the door; it marks the house under God's word.", "The family trusts the promise attached to the sign.");
  } else if (lower === "when i see the blood") {
    add("When I See The Blood means God Himself responds to the sign He commanded.", "The safety of the house rests on God's promise, not on the strength of the door.", "The blood is visible testimony that the household obeyed the Passover command.", "Judgment passes according to God's word.");
  } else if (lower === "this day shall be unto you for a memorial") {
    add("This Day Shall Be Unto You For A Memorial means Israel must remember this rescue every year.", "A memorial is something that keeps a saving act from being forgotten.", "Passover will teach future families what the LORD did in Egypt.", "God builds memory into worship because rescued people need to remember their Rescuer.");
  } else if (lower === "cut off from israel" || lower === "that soul shall be cut off") {
    add(`${title} means the person is removed from the covenant community's shared life.`, "This is serious language.", "The feast of unleavened bread is not optional decoration after Passover.", "God's rescue creates a people who must honor His command.");
  } else if (lower === "i have brought your armies out") {
    add("I Have Brought Your Armies Out means the LORD is bringing Israel out as an ordered people.", "Armies here does not mean they are already a trained military machine.", "It describes them leaving in organized groups under God's command.", "The enslaved people are being formed into the LORD's people.");
  } else if (lower === "no leaven found in your houses") {
    add("No Leaven Found In Your Houses means Israel must remove leaven from their homes during the feast.", "Leaven is what makes dough rise.", "The command turns ordinary bread-making into a reminder of the hurried Exodus.", "Even the house pantry teaches Israel to remember deliverance.");
  } else if (lower === "whether he be a stranger") {
    add("Whether He Be A Stranger means the command also addresses non-Israelites living among the people.", "A stranger is a foreigner or outsider in the community.", "God's worship order is not careless toward outsiders, but it still has holy boundaries.", "The same feast rules guard the whole community.");
  } else if (lower === "or born in the land") {
    add("Or Born In The Land means native-born Israelites are under the same command.", "Being born into Israel does not make someone free to ignore Passover instructions.", "The homeborn and the stranger both stand under God's word.", "Covenant identity includes obedience.");
  } else if (lower === "draw out and take you a lamb") {
    add("Draw Out And Take You A Lamb means the elders must now put the Passover command into action.", "The lamb is selected for slaughter according to God's word.", "This is not symbolic talk anymore; the night of judgment is near.", "Faith responds by doing what God said before the danger passes.");
  } else if (lower === "touch the lintel and the two side posts") {
    add("Touch The Lintel And The Two Side Posts means the blood is applied across the top and sides of the doorway.", "The lintel is the top beam above the door.", "The side posts are the vertical parts of the doorframe.", "The whole entrance is marked as the place where God's promise is trusted.");
  } else if (lower === "the lord will pass through") {
    add("The LORD Will Pass Through means the LORD Himself is moving through Egypt in judgment.", "This is not described as an accident, plague season, or human attack.", "The same LORD who warned Pharaoh now acts.", "The marked houses are safe because God told them how to shelter under His command.");
  } else if (lower === "when your children shall say") {
    add("When Your Children Shall Say means God expects children to ask about Passover.", "The ritual is meant to create questions.", "Parents are supposed to explain the rescue, not merely repeat actions without meaning.", "Bible memory is passed on when children ask and adults teach.");
  } else if (lower === "the people bowed the head and worshipped") {
    add("The People Bowed The Head And Worshipped means Israel receives God's Passover word with reverence.", "They worship before they see the full rescue completed.", "Bowing shows humility, trust, and awe.", "Their response is the opposite of Pharaoh's refusal.");
  } else if (lower === "take your flocks and your herds") {
    add("Take Your Flocks And Your Herds means Pharaoh finally gives up the compromise he tried earlier.", "He had wanted to keep Israel's animals behind.", "Now he tells them to take them too.", "The LORD's command wins over Pharaoh's attempt to control Israel's worship.");
  } else if (lower === "the egyptians were urgent upon the people") {
    add("The Egyptians Were Urgent Upon The People means Egypt pressures Israel to leave quickly.", "Urgent means they strongly push them to go.", "After the death of the firstborn, Egypt wants the Hebrews gone immediately.", "The departure happens with force and haste, just as God had said.");
  } else if (lower === "we be all dead men") {
    add("We Be All Dead Men means the Egyptians fear more death if Israel stays.", "It is old wording for 'we will all die.'", "The final plague has shattered Egypt's confidence.", "The people who once benefited from Israel's labor now beg for Israel's departure.");
  } else if (lower === "the children of israel did according to the word of moses") {
    add("The Children Of Israel Did According To The Word Of Moses means Israel obeyed the instruction God gave through Moses.", "They ask the Egyptians for silver, gold, and clothing as commanded.", "The phrase highlights obedience at the moment of departure.", "They are leaving Egypt by God's word, not by improvising their own escape.");
  } else if (lower === "they spoiled the egyptians") {
    add("They Spoiled The Egyptians means Israel left with wealth from Egypt.", "Spoiled here means plundered or stripped of goods, not ruined like food going bad.", "The enslaved people receive silver, gold, and clothing.", "God reverses years of exploitation as His people leave.");
  } else if (lower === "about six hundred thousand on foot") {
    add("About Six Hundred Thousand On Foot means the departing group was enormous.", "The number refers to men traveling on foot, so the full community with women and children was larger.", "This is not a tiny secret escape.", "God has multiplied Jacob's family into a great people.");
  } else if (lower === "a mixed multitude went up also") {
    add("A Mixed Multitude Went Up Also means others besides ethnic Israelites left Egypt with them.", "The group may include foreigners, servants, or Egyptians who attached themselves to Israel's departure.", "The Exodus is already wider than one bloodline in its visible crowd.", "God's acts in Egypt draw more people than Israel alone.");
  } else if (lower === "they were thrust out of egypt") {
    add("They Were Thrust Out Of Egypt means Israel was pushed out quickly after the final plague.", "Thrust out is forceful language.", "Egypt no longer wants to negotiate or delay.", "The land that held Israel in slavery now drives them out.");
  } else if (lower === "could not tarry") {
    add("Could Not Tarry means Israel could not delay or wait around.", "The departure is too urgent for normal bread preparation.", "This explains why their dough had no time to rise.", "The hurried bread becomes a lasting memory of rescue.");
  } else if (lower === "four hundred and thirty years") {
    add("Four Hundred And Thirty Years marks the long period connected to Israel's stay and affliction.", "The number tells beginners that God's promise endured across generations.", "Israel waited far longer than one lifetime.", "The LORD's timing may feel long, but He brings His people out on the appointed day.");
  } else if (lower === "the selfsame day") {
    add("The Selfsame Day means the departure happened on the exact day God had appointed.", "Selfsame is old wording for the very same day.", "The phrase underlines precision, not coincidence.", "God kept time over centuries and brought Israel out exactly when He intended.");
  } else if (lower === "a night to be much observed") {
    add("A Night To Be Much Observed means Passover night must be carefully remembered and kept.", "Observed means watched, guarded, or commemorated.", "Israel is not supposed to treat the rescue as ordinary history.", "The night becomes holy memory for every generation.");
  } else if (lower === "this is the ordinance of the passover") {
    add("This Is The Ordinance Of The Passover means God now gives the rule for how the meal is to be kept.", "Ordinance means an appointed command or regulation.", "Passover is not a casual family tradition that anyone can reshape however they want.", "The meal belongs under God's instruction because it remembers God's rescue.");
  } else if (lower === "every man's servant") {
    add("Every Man's Servant refers to a household servant who could eat Passover only after circumcision.", "The servant is not ignored, but he does not enter the meal casually.", "Circumcision marks entrance into the covenant sign given to Abraham's family.", "The rule joins welcome with covenant order.");
  } else if (lower === "when thou hast circumcised him") {
    add("When Thou Hast Circumcised Him means the servant must receive the covenant sign before eating Passover.", "Circumcision was the sign God gave Abraham's descendants in Genesis.", "The Passover meal is for the covenant people and those joined to them by the covenant sign.", "God's rescue meal has holy boundaries.");
  } else if (lower === "all the congregation of israel shall keep it") {
    add("All The Congregation Of Israel Shall Keep It means the whole gathered people must observe Passover.", "Congregation means the assembled community of Israel.", "This is not a private custom for a few extra-spiritual families.", "The entire redeemed people are called to remember the LORD's rescue.");
  } else if (lower === "one law shall be to him that is homeborn") {
    add("One Law Shall Be To Him That Is Homeborn means native Israelites do not get a separate Passover standard.", "Homeborn means someone born within Israel.", "The same command governs the covenant community.", "God's worship is ordered by His word, not by social rank.");
  } else if (lower === "and unto the stranger") {
    add("And Unto The Stranger means the same law also applies to the outsider who joins Israel.", "The stranger is not given a looser version of Passover.", "If he enters the covenant community, he comes under the same command.", "The phrase holds together welcome and holiness.");
  } else if (lower === "all the children of israel did") {
    add("All The Children Of Israel Did means the people obeyed the Passover and departure commands.", "After chapters of Pharaoh refusing God's word, Israel's obedience stands out.", "The phrase is simple but important.", "The rescued people respond by doing what the LORD commanded.");
  } else if (lower === "the lord did bring the children of israel out") {
    add("The LORD Did Bring The Children Of Israel Out names the true Deliverer of the Exodus.", "Moses led, Aaron spoke, and Israel walked, but the LORD brought them out.", "The sentence gives God the credit for the rescue.", "Egypt could not keep the people God had decided to free.");
  } else if (lower === "by their armies") {
    add("By Their Armies means Israel left in ordered divisions or organized groups.", "The phrase does not mean they had already become a polished army.", "It shows the enslaved people leaving with structure and identity.", "The LORD is forming them into a people, not scattering them as fugitives.");
  } else if (lower.includes("one plague more")) {
    add(`${title} announces that Pharaoh's long refusal is reaching its final judgment.`, "God has warned Pharaoh again and again.", "Now one last plague will break the grip of Egypt.", "ðŸŒ™ Final night", "âš ï¸ Last warning", "ðŸšª Release coming", "Deliverance for Israel will come through judgment on Egypt.");
  } else if (lower.includes("afterwards") || lower.includes("go hence")) {
    add(`${title} means Israel's release is now certain.`, "Pharaoh has refused every command so far.", "But God says the next act will force the door open.", "ðŸšª Way out", "â³ Almost time", "ðŸ‘‘ Pharaoh's grip breaking", "God is declaring what will happen.");
  } else if (lower.includes("borrow") || lower.includes("favour") || lower.includes("spoiled")) {
    add(`${title} shows God sending enslaved Israel out with provision.`, "The people who were exploited in Egypt will not leave empty-handed.", "Silver, gold, and clothing become signs of reversal.", "ðŸ’ Silver and gold", "ðŸ‘• Clothing", "âš–ï¸ Justice and reversal", "God's rescue includes care for the journey ahead.");
  } else if (lower.includes("midnight")) {
    add(`${title} gives the final plague an appointed hour.`, "Midnight makes the moment feel solemn and unmistakable.", "Egypt will learn that the LORD rules timing as surely as He rules the river, sky, and land.", "ðŸŒ™ Night", "â° Appointed time", "âš–ï¸ Judgment", "The darkness of the hour matches the seriousness of what is coming.");
  } else if (lower.includes("firstborn")) {
    add(`${title} names the heartbreaking reach of the final plague.`, "The firstborn represented a family's future, inheritance, and strength.", "Pharaoh once attacked Israel's sons; now judgment reaches Egypt's households.", "ðŸ‘¶ Firstborn", "ðŸ  Household", "ðŸ’” Deep grief", "This is one of the most sobering places in Exodus.");
  } else if (lower.includes("great cry")) {
    add(`${title} describes the grief that will fill Egypt after the final plague.`, "Earlier Israel groaned under slavery.", "Now Egypt cries out under judgment.", "ðŸ˜­ Cry", "ðŸ  Every household touched", "âš–ï¸ Pharaoh's cruelty answered", "The sound of Egypt's grief shows that Pharaoh's rebellion has brought suffering on his own people.");
  } else if (lower.includes("dog move his tongue")) {
    add(`${title} is a vivid way of saying Israel will be completely protected.`, "Not even a dog will bark against them.", "The picture is ordinary, but the meaning is powerful.", "ðŸ”‡ No barking", "ðŸ›¡ï¸ Protected homes", "âœ… Complete difference", "God can keep His people in peace while Egypt is judged.");
  } else if (lower.includes("put a difference")) {
    add(`${title} explains that God can judge Egypt and shelter Israel at the same time.`, "The difference is not Israel's military power or moral greatness.", "It is the LORD's protecting mercy.", "âš–ï¸ Distinction", "ðŸ  Israel sheltered", "ðŸŒ Egypt judged", "The Exodus rescue is precise, not chaotic.");
  } else if (lower.includes("servants shall come down") || lower.includes("get thee out")) {
    add(`${title} pictures Pharaoh's officials begging Israel to leave.`, "The people who once served Pharaoh's command will soon plead for the Hebrews to go.", "God reverses the power scene.", "ðŸ™‡ Servants come down", "ðŸšª Leave now", "ðŸ” Reversal", "The king who would not listen will watch his own household push toward release.");
  } else if (lower.includes("great anger")) {
    add(`${title} shows Moses leaving Pharaoh with holy seriousness.`, "Pharaoh's refusal has endangered the whole land.", "Moses understands that final judgment is now near.", "ðŸ”¥ Anger", "ðŸ“£ Warning rejected", "âš–ï¸ Judgment near", "Stubborn sin should grieve and anger God's messenger.");
  } else if (lower.includes("not hearken") || lower.includes("wonders may be multiplied")) {
    add(`${title} means Pharaoh's refusal will not stop God's plan.`, "His hard heart makes the judgment story longer, but not stronger than God.", "The LORD will use even Pharaoh's resistance to display His power.", "ðŸ”’ Pharaoh refuses God's word", "âš¡ The LORD multiplies His wonders", "ðŸŒ God's name is made known", "The king's no becomes the place where God's authority is seen more clearly.");
  } else if (lower.includes("beginning of months")) {
    add(`${title} means Israel's calendar is being rebuilt around redemption.`, "God makes their rescue the starting point for how they count sacred time.", "Their year will now remember the night He brought them out.", "ðŸ“… New calendar", "ðŸšª New beginning", "ðŸ™Œ Rescue remembered", "Freedom becomes the center of Israel's worship rhythm.");
  } else if (lower.includes("tenth day") || lower.includes("fourteenth day")) {
    add(`${title} shows that Passover preparation had an exact timetable.`, "The lamb was chosen before the night it was killed.", "The waiting period made the rescue feel deliberate and serious.", "ðŸ“… Tenth day", "ðŸ‘ Lamb selected", "â³ Fourteenth day", "God teaches Israel to receive deliverance carefully, not casually.");
  } else if (lower.includes("lamb") || lower.includes("without blemish") || lower.includes("male of the first year")) {
    add(`${title} describes the Passover sacrifice God required.`, "The lamb was not random leftovers from the flock.", "It had to be whole, fitting, and set apart for this holy night.", "ðŸ‘ Lamb", "âœ… Without blemish", "ðŸ  For the household", "Rescue comes through the sign God provides.");
  } else if (lower === "in one house shall it be eaten") {
    add("In One House Shall It Be Eaten means the Passover lamb is kept within one household setting.", "The meal is not to be scattered casually from place to place.", "The house matters because Passover night centers on shelter under the blood-marked doorway.", "The command keeps the meal gathered, whole, and reverent.");
  } else if (lower.includes("number of the souls") || lower.includes("house")) {
    add(`${title} shows Passover happening household by household.`, "God's rescue reaches families, tables, doors, and ordinary homes.", "No household is meant to treat the night lightly.", "ðŸ  House", "ðŸ‘ª Family", "ðŸ½ï¸ Shared meal", "The Exodus is national rescue received in real homes.");
  } else if (lower.includes("blood") || lower.includes("side posts") || lower.includes("lintel")) {
    add(`${title} points to the visible sign of shelter during judgment.`, "The blood marked the doorway of the house.", "The family inside was safe because they obeyed the sign God gave.", "ðŸ©¸ Blood", "ðŸšª Doorway", "ðŸ›¡ï¸ Shelter", "Passover teaches rescue by trusting God's provided way.");
  } else if (lower.includes("eat the flesh") || lower.includes("roast with fire")) {
    add(`${title} keeps the Passover lamb connected to a real meal.`, "Israel did not only mark the door and stand back.", "They ate the lamb as people ready to leave Egypt.", "ðŸ‘ Lamb", "ðŸ”¥ Roasted", "ðŸ½ï¸ Meal", "The rescue night includes shelter, worship, and readiness all together.");
  } else if (lower.includes("unleavened") || lower.includes("leaven") || lower.includes("dough") || lower.includes("cakes")) {
    add(`${title} teaches Israel to remember the hurry of their departure.`, "Leaven makes dough rise, but Israel would leave too quickly for normal bread-making.", "The simple bread became a yearly reminder of rescue.", "ðŸž Bread", "ðŸƒ Haste", "ðŸ“… Remember every year", "God placed memory into ordinary food so families could taste the story again.");
  } else if (lower.includes("loins girded")) {
    add(`${title} means the people were dressed and ready to move.`, "Long garments had to be tucked up for travel or work.", "Passover was not a slow dinner for people settling into Egypt.", "ðŸ‘ž Shoes on", "ðŸ§¥ Clothes ready", "ðŸƒ Ready to leave", "The meal trained Israel to eat as people whose freedom was about to begin.");
  } else if (lower.includes("lord's passover")) {
    add(`${title} gives the night its name and meaning.`, "The LORD is the One who passes over the marked houses while judging Egypt.", "Israel is not saved because their homes are nicer or stronger.", "ðŸ›¡ï¸ Passed over", "ðŸ©¸ Blood sign", "ðŸ™Œ The LORD saves", "The name keeps the focus on God's mercy and command.");
  } else if (lower.includes("gods of egypt")) {
    add(`${title} explains that the final plague is also a judgment against Egypt's false gods.`, "Egypt trusted many gods connected to life, death, fertility, kingship, and protection.", "The LORD shows that none of them can shield Egypt from Him.", "ðŸ›ï¸ Egypt's gods", "âš–ï¸ Judgment", "ðŸ‘‘ Pharaoh humbled", "The LORD exposes every false refuge.");
  } else if (lower.includes("token") || lower.includes("when i see the blood") || lower.includes("pass over you")) {
    add(`${title} explains how the blood sign functioned on Passover night.`, "God promised to see the blood and pass over that house.", "The safety of the family rested on God's word attached to God's sign.", "ðŸ©¸ Blood seen", "ðŸšª House marked", "âœ… Judgment passes over", "The point is trusting and obeying the rescue God commanded.");
  } else if (lower.includes("memorial") || lower.includes("children") || lower.includes("observed")) {
    add(`${title} shows that Exodus was meant to be taught and remembered.`, "God did not want the rescue to become an old story nobody understood.", "He built memory into meals, questions, calendars, and family teaching.", "ðŸ‘¶ Children ask", "ðŸ“– Parents explain", "ðŸ•¯ï¸ Worship remembers", "Bible faith keeps telling the next generation what the LORD has done.");
  } else if (lower.includes("seven days") || lower.includes("cut off") || lower.includes("soul shall be cut off")) {
    add(`${title} shows the seriousness of the feast after Passover night.`, "Israel was not free to treat God's memorial however they wanted.", "The command shaped the whole community's worship.", "ðŸ“… Seven days", "ðŸš« No leaven", "âš ï¸ Serious command", "God's rescue creates a people who remember Him with obedience.");
  } else if (lower.includes("armies")) {
    add(`${title} describes Israel leaving Egypt in ordered groups under God's command.`, "They are not a mob escaping by luck.", "The enslaved people are being formed into the LORD's organized people.", "ðŸš¶ Israel moves out together", "ðŸ•ï¸ The people leave in ordered groups", "ðŸ™Œ The LORD leads former slaves with purpose", "The Exodus departure has dignity because God is forming Israel into His people.");
  } else if (lower === "there shall no stranger eat thereof") {
    add("There Shall No Stranger Eat Thereof means an uncovenanted outsider may not treat Passover as an ordinary meal.", "Stranger means someone outside Israel's covenant life.", "The rule does not say outsiders are worthless.", "It says the rescue meal is holy and must be entered through God's covenant order.");
  } else if (lower.includes("stranger") || lower.includes("born in the land") || lower.includes("homeborn")) {
    add(`${title} shows that Passover had covenant boundaries and a place for outsiders who joined Israel's sign.`, "A stranger could not treat the meal casually.", "But the law made room for the stranger who entered the covenant through circumcision.", "ðŸ  Homeborn", "ðŸ§ Stranger", "ðŸ“œ One covenant order", "God's people are distinct, but His mercy is not limited to one family line only.");
  } else if (lower.includes("habitations")) {
    add(`${title} brings the command into every place Israel lives.`, "Passover was not only for one public ceremony.", "The memory of rescue had to shape households wherever God's people settled.", "ðŸ  Homes", "ðŸž Food practice", "ðŸ“… Ongoing remembrance", "God wanted the Exodus story to live in daily spaces.");
  } else if (lower.includes("draw out") || lower.includes("kill the passover")) {
    add(`${title} is Moses turning God's command into action for the elders of Israel.`, "The lamb must be selected and killed just as the LORD said.", "Obedience now matters because judgment night is near.", "ðŸ‘ Lamb taken", "ðŸ©¸ Sacrifice", "â³ Night approaching", "Faith is shown by doing what God said before the danger passes.");
  } else if (lower.includes("hyssop")) {
    add(`${title} names the plant used to apply the blood to the doorway.`, "Hyssop was a small plant used for sprinkling or applying liquid in Bible rituals.", "Here it carries the blood to the lintel and side posts.", "ðŸŒ¿ Hyssop", "ðŸ©¸ Blood applied", "ðŸšª Door marked", "A simple plant becomes one visible sign of God's protection.");
  } else if (lower.includes("none of you shall go out")) {
    add(`${title} teaches that the marked house was the place of safety.`, "The people were not told to wander outside and test danger.", "They were to stay under the shelter God provided.", "ðŸ  Stay inside", "ðŸ©¸ Blood-marked door", "ðŸ›¡ï¸ Protection", "Obedience meant remaining where God's mercy had placed them.");
  } else if (lower.includes("bowed") || lower.includes("worshipped")) {
    add(`${title} shows Israel responding to God's Passover command with reverence.`, "Before the rescue is fully visible, the people bow and worship.", "They receive God's word as true and holy.", "ðŸ™‡ Bowed heads", "ðŸ™Œ Worship", "ðŸ“œ Trusted command", "Worship begins before the road out of Egypt opens.");
  } else if (lower.includes("smote")) {
    add(`${title} describes the LORD carrying out the final judgment exactly as warned.`, "The plague is not accidental tragedy.", "It is the promised judgment after Pharaoh's repeated refusal.", "ðŸŒ™ Midnight", "âš–ï¸ Judgment", "ðŸ’” Egypt struck", "The moment shows the weight of resisting God's word.");
  } else if (lower.includes("rise up") || lower.includes("get you forth")) {
    add(`${title} is Pharaoh finally commanding Israel to leave.`, "The king who kept saying no now tells them to go.", "God has broken the hold of Egypt.", "ðŸšª Go out", "ðŸ‘‘ Pharaoh yields", "ðŸƒ Departure begins", "The release comes because the LORD acted, not because Pharaoh became generous.");
  } else if (lower.includes("flocks") || lower.includes("herds")) {
    add(`${title} shows Pharaoh surrendering the compromise he tried to keep earlier.`, "He had wanted to hold Israel's animals back.", "Now he tells them to take the flocks and herds too.", "ðŸ Flocks", "ðŸ„ Herds", "ðŸš« No more bargaining", "God's command wins over Pharaoh's attempt to control Israel's worship.");
  } else if (lower.includes("bless me also")) {
    add(`${title} is a striking request from Pharaoh after judgment falls.`, "The king who dismissed the LORD now asks Moses for blessing.", "But the request comes after terrible loss and long resistance.", "ðŸ‘‘ Humbled king", "ðŸ™ Bless me", "ðŸ’” Too late to avoid the plague", "Pharaoh's words show defeat more than true worship.");
  } else if (lower.includes("urgent") || lower.includes("dead men") || lower.includes("thrust out") || lower.includes("could not tarry")) {
    add(`${title} captures the sudden pressure to leave Egypt immediately.`, "Egypt wants Israel gone because the judgment has become unbearable.", "The departure is not calm or leisurely.", "ðŸƒ Hurry", "ðŸšª Forced out", "ðŸž No time for bread to rise", "God's promised rescue arrives with urgency after years of bondage.");
  } else if (lower.includes("six hundred thousand") || lower.includes("mixed multitude")) {
    add(`${title} shows the size and variety of the people leaving Egypt.`, "Israel's departure is massive, and others go with them too.", "The Exodus is no hidden escape by a few people.", "ðŸ‘¥ Great crowd", "ðŸš¶ On foot", "ðŸ§ Mixed multitude", "God's rescue is public, visible, and bigger than one household.");
  } else if (lower.includes("four hundred and thirty") || lower.includes("selfsame day")) {
    add(`${title} shows God's timing over many generations.`, "The years in Egypt did not make God forget His promise.", "On the exact day appointed, He brought His people out.", "â³ Long waiting", "ðŸ“… Exact timing", "âœ… Promise kept", "God's delays are not the same as God's absence.");
  } else if (lower.includes("ordinance") || lower.includes("stranger eat") || lower.includes("servant") || lower.includes("circumcised") || lower.includes("congregation")) {
    add(`${title} gives covenant boundaries for who may share the Passover meal.`, "The meal is holy because it remembers holy rescue.", "Outsiders and servants are not ignored, but they must enter the covenant sign before eating.", "ðŸ“œ Ordinance", "ðŸ”ª Circumcision sign", "ðŸ½ï¸ Holy meal", "God's welcome has order because Passover marks His redeemed people.");
  } else if (lower.includes("one house")) {
    add(`${title} keeps the Passover meal gathered and whole.`, "The lamb was not to be treated casually or scattered around.", "The household setting helped preserve the meaning of the meal.", "ðŸ  One house", "ðŸ‘ One lamb", "ðŸ½ï¸ Shared meal", "The rescue story was meant to be remembered together.");
  } else if (lower.includes("break a bone")) {
    add(`${title} protects the wholeness of the Passover lamb.`, "The lamb was eaten according to God's instruction, not handled however people wanted.", "The command teaches reverence for the sacrifice God provided on the rescue night.", "ðŸ‘ The lamb is kept whole", "ðŸ“œ The meal follows God's command", "ðŸ™Œ Rescue is received with reverence", "Even small Passover details teach Israel to treat God's rescue as holy.");
  } else if (lower.includes("one law")) {
    add(`${title} teaches that the same covenant rule applies to Israelite and joined stranger.`, "God does not create one holy standard for insiders and another for outsiders who join them.", "The worshiping community is ordered under one command.", "ðŸ“œ One law", "ðŸ  Homeborn", "ðŸ§ Stranger", "The line holds together holiness, welcome, and obedience.");
  } else if (lower.includes("as the lord commanded") || lower.includes("did bring")) {
    add(`${title} closes the chapter by showing God's word fulfilled in action.`, "Israel does what the LORD commanded, and the LORD brings them out.", "The long rescue promise is no longer only spoken; it is happening on the road.", "âœ… Command obeyed", "ðŸšª Brought out", "ðŸ™Œ The LORD saves", "Obedience and deliverance stand together.");
  } else {
    add(`${title} names one concrete part of the Passover and deliverance account.`, "The surrounding verses move through final judgment, blood-marked shelter, worship, memory, and departure.", "ðŸ“– The phrase comes from the Scripture text", "ðŸ” Its meaning belongs to Passover night", "ðŸ§  It clarifies God's rescue", `${title} should be understood as part of the LORD bringing Israel out of Egypt.`);
  }

  return note(removeDay24RepeatedPhraseTitle(title, lines).slice(0, 8));
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
  return [`ðŸ“Œ ${title}`, explainDay25Phrase(section, title)];
}

function buildDay25RevisedExplanation(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  const exact: Record<string, string[]> = {
    "Fear Ye Not": [
      "Moses is telling Israel not to let panic rule the moment.",
      "The danger is real: Pharaoh's army is behind them and the sea is in front of them.",
      "ðŸ˜¨ Fear is taking over",
      "ðŸ‘€ The danger looks visible",
      "ðŸ™ God calls for trust",
      "âš“ Faith must replace panic",
      "Israel's first battle at the sea is not swinging a sword; it is trusting the LORD while afraid.",
    ],
    "Stand Still, And See The Salvation Of The LORD": [
      "Israel must stop trying to create its own escape and watch the LORD rescue them.",
      "They have no road, no army strong enough, and no strategy that can defeat Pharaoh.",
      "ðŸ›‘ Stop panicking",
      "ðŸ‘€ Watch what God will do",
      "âš”ï¸ Victory will not come from Israel",
      "ðŸ™Œ Salvation belongs to the LORD",
      "The command teaches trust before action, because this rescue must be seen as God's work.",
    ],
    "The LORD Shall Fight For You": [
      "God Himself will take the battlefield against Egypt.",
      "Israel does not win this battle through weapons, training, or courage; the LORD defeats the enemy they cannot defeat.",
      "âš”ï¸ God takes the battlefield",
      "ðŸ‘‘ The victory belongs to Him",
      "ðŸš« Israel cannot save itself",
      "ðŸŒŠ Egypt will fall at the sea",
      "The rescue teaches divine victory: the LORD wins what His people cannot win.",
    ],
    "They Were Sore Afraid": [
      "Israel is overwhelmed with intense fear.",
      "The people see Pharaoh's army behind them and cannot yet see the road God will open.",
      "ðŸ˜¨ Fear feels reasonable",
      "ðŸŽ Egypt is near",
      "ðŸŒŠ The sea blocks escape",
      "ðŸ’” Trust is still fragile",
      "The fear is honest, but it is not the final truth of the scene.",
    ],
    "The Children Of Israel Cried Out Unto The LORD": [
      "Their fear becomes a desperate cry to God.",
      "They do not know what to do, so the helpless people appeal to the only One who can save them.",
      "ðŸ™ The cry goes upward",
      "ðŸš« Human options are gone",
      "ðŸŒŠ The sea scene is desperate",
      "ðŸ™Œ God can answer helpless people",
      "The cry shows need before it shows mature faith.",
    ],
    "Because There Were No Graves In Egypt": [
      "Israel speaks with bitter sarcasm because fear has taken over their thinking.",
      "They accuse Moses as if Egypt did not have enough graves and he brought them into the wilderness to die.",
      "ðŸª¦ Death feels close",
      "ðŸ’¬ Panic speaks harshly",
      "â›“ï¸ Egypt sounds safer",
      "ðŸ’” Fear twists memory",
      "The line shows how quickly terror can make bondage look better than faith.",
    ],
    "Wherefore Hast Thou Dealt Thus With Us": [
      "The people are asking why Moses has treated them this way.",
      "Their question comes from panic because they cannot yet see that God positioned them for deliverance.",
      "â“ Fear asks why",
      "ðŸ‘¤ Moses is blamed",
      "ðŸŒŠ The plan is still hidden",
      "ðŸ™ God has not failed",
      "The question exposes confusion before the rescue becomes visible.",
    ],
    "Let Us Alone": [
      "Israel is saying they would rather have been left in slavery.",
      "Fear makes Egypt sound like safety, even though Egypt was the house of bondage.",
      "â›“ï¸ Slavery sounds familiar",
      "ðŸ˜¨ Freedom feels dangerous",
      "ðŸ’” Fear wants to go backward",
      "ðŸšª God is still leading out",
      "The words reveal how bondage can keep shaping the heart after the body is free.",
    ],
    "Sanctify Unto Me All The Firstborn": [
      "Sanctify means set apart as belonging to God.",
      "The firstborn are marked for the LORD because He spared Israel's firstborn on Passover night.",
      "ðŸ‘¶ Firstborn life is remembered",
      "ðŸ©¸ Passover mercy stands behind it",
      "ðŸ™Œ Rescued life belongs to God",
      "ðŸ  The whole family must remember",
      "The command turns one night of mercy into a lasting practice of worship.",
    ],
    "Doing Wonders": [
      "Wonders are acts only God can do.",
      "Israel is praising the LORD because the plagues and the sea crossing were beyond ordinary human power.",
      "âœ¨ God does what no one else can do",
      "ðŸŒŠ The sea obeyed Him",
      "ðŸ‘‘ Egypt's power failed",
      "ðŸ™Œ Praise answers the miracle",
      "The rescue teaches Israel that the LORD's power is not ordinary strength.",
    ],
    "Like Coriander Seed": [
      "Coriander seed is a small seed, so the comparison describes manna's size and look.",
      "A beginner can picture the food as small pieces scattered on the ground each morning.",
      "ðŸž Manna is named",
      "ðŸŒ± Its appearance is described",
      "ðŸ¯ Its taste is remembered",
      "ðŸº An omer is preserved",
      "The detail makes God's wilderness food concrete instead of vague.",
    ],
    "Fill An Omer Of It To Be Kept": [
      "Fill an omer means put one measured amount of manna aside.",
      "Kept means this portion is preserved instead of eaten, so future generations can see what God provided.",
      "ðŸ“ One omer is measured",
      "ðŸž Manna is preserved",
      "ðŸ‘¶ Future children can see it",
      "ðŸ™Œ God's provision is remembered",
      "The saved portion turns daily bread into a lasting witness of God's care.",
    ],
  };

  if (cleanTitle === "The Waters Were A Wall Unto Them" && section.reference === "Exodus 14:29-31") {
    return note([
      "The wall of water is remembered again after Israel has crossed safely.",
      "The same sea that looked impossible became protection on both sides of the people.",
      "ðŸŒŠ Water stood beside them",
      "ðŸš¶ Israel crossed safely",
      "ðŸ›¡ï¸ The path was protected",
      "ðŸ™Œ The LORD controlled the sea",
      "The repeated line confirms that Israel's escape was a real miracle from start to finish.",
    ]);
  }

  if (cleanTitle === "He Hath Triumphed Gloriously" && section.reference === "Exodus 15:19-21") {
    return note([
      "Miriam repeats the victory line so the whole community can answer the song.",
      "Triumphed gloriously means the LORD won completely and magnificently over Egypt.",
      "ðŸ¥ Miriam leads praise",
      "ðŸ‘¥ The women answer",
      "ðŸŒŠ Egypt's army is gone",
      "ðŸ™Œ The LORD receives the song",
      "The repeated phrase turns the Red Sea victory into shared worship.",
    ]);
  }

  if (exact[cleanTitle]) return note(exact[cleanTitle]);

  const exactPhraseExplanation = DAY_25_EXACT_PHRASE_EXPLANATIONS[cleanTitle];
  if (exactPhraseExplanation) {
    return formatDay25PhraseExplanation(section, cleanTitle, exactPhraseExplanation);
  }

  if (cleanTitle === "Speak Unto The Children Of Israel, That They Go Forward") {
    return note([
      "God tells Moses to command Israel forward while the sea is still in front of them.",
      "The command comes before the visible road appears, so obedience must begin with trust.",
      "âž¡ï¸ Israel must move forward",
      "ðŸŒŠ The sea is still blocking them",
      "ðŸ“£ Moses must give the command",
      "ðŸ™Œ God will make the way",
      "Faith moves because God has spoken, not because the path already looks easy.",
    ]);
  }

  if (cleanTitle === "He That Gathered Much Had Nothing Over") {
    return note([
      "Extra gathering did not create extra supply.",
      "God's measured provision kept anyone from turning manna into private advantage.",
      "ðŸ“ The measure stays fair",
      "ðŸ§º More gathering does not mean excess",
      "ðŸ‘¥ The whole camp is cared for",
      "ðŸš« Hoarding cannot control God's gift",
      "Manna teaches that God's provision is enough without becoming selfish possession.",
    ]);
  }

  if (cleanTitle === "He That Gathered Little Had No Lack") {
    return note([
      "Smaller gathering did not leave anyone hungry.",
      "God's provision met each household according to need, not according to competition.",
      "ðŸ¤² Less gathering still receives enough",
      "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§ Each household is supplied",
      "âœ… No one lacks bread",
      "ðŸ™Œ God measures provision with care",
      "Manna teaches sufficiency instead of fear-driven comparison.",
    ]);
  }

  if (cleanTitle === "The People Rested On The Seventh Day") {
    return note([
      "Israel finally follows the Sabbath pattern.",
      "After generations of slave labor, rest becomes an act of obedience.",
      "ðŸž Double portion is already given",
      "ðŸ›‘ Sabbath rest is holy",
      "ðŸ  The people stay in place",
      "ðŸ™Œ Rest depends on trust",
      "Free people learn they are not ruled by endless labor.",
    ]);
  }

  const getOpeningLines = (meaning: string, context: string) => {
    const specific = getDay25SpecificOpening(section, cleanTitle)
      .map((line) => removeDay25OpeningPhraseRepeat(cleanTitle, line))
      .filter(Boolean);
    const genericOpening = /^(This detail adds|The sea scene shows|God is leading newly freed people|The wilderness begins testing trust|The victory song looks beyond|Rescue turns into worship|Hunger exposes fear|God provides food|The manna instructions teach)/i.test(specific[0] ?? "");

    if (!genericOpening && specific.length > 0) {
      return specific.slice(0, 2);
    }

    return [meaning, context];
  };

  const add = (meaning: string, context: string, bullets: string[], takeaway: string) =>
    note([...getOpeningLines(meaning, context), ...bullets, takeaway]);

  if (/sanctify|firstborn|openeth|firstling|redeem|it is mine/.test(lower)) {
    return add(
      /redeem/.test(lower) ? "God is teaching Israel that firstborn sons are bought back, not sacrificed." : "God is claiming the firstborn because He spared Israel's firstborn on Passover night.",
      "The firstborn command turns the rescue from Egypt into a repeated family practice.",
      ["ðŸ‘¶ Firstborn life is remembered", "ðŸ©¸ Passover mercy stands behind it", "ðŸ’° Redemption means bought back", "ðŸ™Œ Spared life belongs to the LORD"],
      "Every firstborn lesson keeps Israel remembering that rescued life belongs to the Rescuer."
    );
  }
  if (/remember this day|bondage|strength of hand|abib|leavened|unleavened/.test(lower)) {
    return add(
      /leaven|unleavened/.test(lower) ? "The bread teaches Israel to remember the hurried rescue from Egypt." : "Moses is turning the Exodus into a memory Israel must keep.",
      "The date, bread, and language of bondage make deliverance concrete instead of vague.",
      ["ðŸ§  Rescue must be remembered", "ðŸž Bread carries the story", "ðŸ“… The calendar marks deliverance", "ðŸ’ª The LORD brought them out"],
      "The practice protects Israel from forgetting what slavery was and who freed them."
    );
  }
  if (/shew thy son|son asketh|sign|memorial|frontlets|mouth|hand|eyes/.test(lower)) {
    return add(
      "Parents must explain the rescue so the next generation understands Israel's worship.",
      "The feast and signs are not empty religious habits; they are teaching tools for children.",
      ["ðŸ‘¶ Children ask questions", "ðŸ—£ï¸ Parents tell the rescue", "âœ‹ Hands remember God's work", "ðŸ‘€ Eyes stay fixed on deliverance"],
      "The Exodus is meant to be taught, spoken, and carried into family life."
    );
  }
  if (/bring thee|set apart|pharaoh would hardly/.test(lower)) {
    return add(
      "The command looks forward to life in the land after God completes the rescue.",
      "Israel must keep practicing firstborn redemption because Pharaoh's refusal and God's deliverance must not be forgotten.",
      ["ðŸžï¸ The land is ahead", "ðŸ‘¶ Firstborn life is marked", "ðŸ‘‘ Pharaoh resisted release", "ðŸ™Œ God finished the rescue"],
      "Future obedience will keep the Exodus alive in Israel's memory."
    );
  }
  if (/philistines|repent|led the people about|harnessed|bones of joseph|pillar/.test(lower)) {
    return add(
      /joseph/.test(lower) ? "Moses carries Joseph's bones because Joseph believed God would bring Israel out of Egypt." : "God is guiding Israel by the route and presence He knows they need.",
      "The shortest road is not always the wisest road for newly freed people learning to trust Him.",
      ["ðŸ§­ God chooses the road", "â›” The shortest path is avoided", "â˜ï¸ Presence guides by day", "ðŸ”¥ Presence guards by night"],
      "The route teaches that God's guidance may look indirect while still being careful and faithful."
    );
  }
  if (/encamp|entangled|harden pharaoh|honoured|egyptians may know|chariot|pihahiroth|baalzephon/.test(lower)) {
    return add(
      /entangled|pihahiroth|baalzephon/.test(lower) ? "The location makes Israel look trapped from Egypt's point of view." : "God is setting the final sea confrontation where Egypt's pride will be exposed.",
      "Pharaoh thinks Israel is vulnerable, but the LORD is preparing to show His power over Egypt one more time.",
      ["ðŸ“ The camp looks trapped", "ðŸŽ Pharaoh prepares pursuit", "ðŸ‘‘ God will be honored", "ðŸ™Œ Egypt will know the LORD"],
      "The scene is not random danger; it is the stage for God's public deliverance."
    );
  }
  if (/chariots|captains|pursued|high hand|pharaoh/.test(lower)) {
    return add(
      /high hand/.test(lower) ? "Israel leaves openly and boldly under God's victory." : "Egypt is bringing organized military power after former slaves.",
      "The details make the threat feel impossible for Israel to overcome by human strength.",
      ["ðŸŽ Chariots show military power", "ðŸ‘‘ Pharaoh wants control again", "ðŸ˜¨ Israel looks outmatched", "ðŸŒŠ The sea will expose Egypt's weakness"],
      "The stronger Egypt looks, the clearer God's rescue will be."
    );
  }
  if (/criest|go forward|rod|divide|dry ground|angel of god|pillar|cloud and darkness|gave light/.test(lower)) {
    return add(
      /go forward/.test(lower) ? "God commands Israel to move before the path looks possible." : "God is opening and guarding the way through the sea.",
      "Prayer gives way to obedience as Moses lifts the rod and the LORD moves between Israel and Egypt.",
      ["âž¡ï¸ Israel must move forward", "ðŸŒŠ The sea will open", "â˜ï¸ God's presence guards the camp", "ðŸ’¡ Light is given to His people"],
      "Faith follows God's command even before the road looks safe."
    );
  }
  if (/stretched out|strong east wind|sea dry land|waters were divided|dry ground|wall unto them/.test(lower)) {
    return add(
      /wall/.test(lower) ? "The waters stand on both sides while Israel passes through." : "The LORD turns the sea itself into a road for His people.",
      "The miracle is not shallow water or lucky timing; the Creator commands wind, sea, and ground.",
      ["ðŸŒŠ Water obeys God", "ðŸ’¨ Wind serves His command", "ðŸš¶ Israel crosses on dry ground", "ðŸ§± Waters stand like walls"],
      "The obstacle that looked like death becomes the path of deliverance."
    );
  }
  if (/morning watch|looked unto|troubled|chariot wheels|flee|returned|overthrew/.test(lower)) {
    return add(
      "Egypt's strength collapses inside God's judgment.",
      "The same sea road that was safe for Israel becomes the place where Pharaoh's army is trapped and overthrown.",
      ["ðŸ‘€ The LORD sees the enemy", "ðŸ›ž Chariot wheels fail", "ðŸ˜¨ Egypt wants to flee", "ðŸŒŠ The sea returns"],
      "God's rescue for His people becomes judgment on the power trying to enslave them again."
    );
  }
  if (/saved israel|egyptians dead|great work|feared the lord|believed/.test(lower)) {
    return add(
      /believed/.test(lower) ? "The visible rescue strengthens Israel's trust in the LORD and in Moses as His servant." : "Israel sees the finished result of the LORD's rescue.",
      "The army that terrified them can no longer drag them back to bondage.",
      ["ðŸ‘€ Israel sees the outcome", "ðŸ›¡ï¸ The LORD saved them", "ðŸŒŠ Egypt is defeated", "ðŸ™Œ Trust grows after rescue"],
      "The sea teaches Israel that the LORD is more trustworthy than what they feared."
    );
  }
  if (/sang|sing|triumphed|horse|rider|strength and song|my god|man of war|right hand|overthrown|wrath|enemy said|blast|sank as lead/.test(lower)) {
    return add(
      /enemy said/.test(lower) ? "The song quotes Egypt's boast so God's victory over that boast is unmistakable." : "Israel is turning deliverance into worship.",
      "The song names what happened at the sea: the LORD defeated Egypt and became the praise of His people.",
      ["ðŸŽ¶ Rescue becomes song", "ðŸŽ Egypt's power falls", "ðŸ’ª God's strength is praised", "ðŸ‘‘ The LORD is the victor"],
      "Worship retells the rescue with God at the center."
    );
  }
  if (/who is like|glorious|fearful|wonders|mercy hast led|people shall hear|pass over|purchased/.test(lower)) {
    return add(
      /purchased/.test(lower) ? "Israel belongs to the LORD because He redeemed them from bondage." : "The song moves from what God did to who God is.",
      "His holiness, mercy, wonders, and redeemed people will make the nations tremble.",
      ["âœ¨ God is unlike all others", "ðŸ•Šï¸ Mercy leads the redeemed", "ðŸŒ Nations will hear", "ðŸ’° Israel has been purchased"],
      "The sea victory reveals God's character, not only His power."
    );
  }
  if (/bring them in|plant them|place|sanctuary|hands have established|reign/.test(lower)) {
    return add(
      /reign/.test(lower) ? "The song ends by declaring the LORD's everlasting kingship." : "The song looks forward to God's destination for His rescued people.",
      "Israel was not freed to wander without a future; God is bringing them toward inheritance and worship.",
      ["ðŸžï¸ God will bring them in", "ðŸŒ± His people will be planted", "â›ª Worship is the goal", "ðŸ‘‘ The LORD reigns forever"],
      "The Exodus points beyond escape toward life with God as King."
    );
  }
  if (/miriam|sister of aaron|timbrels|dances|sing ye/.test(lower)) {
    return add(
      "Miriam leads the women in answering the sea victory with praise.",
      "The rescue becomes a shared song, not only Moses' private worship.",
      ["ðŸ¥ Timbrels join the praise", "ðŸ‘¥ The women answer", "ðŸŽ¶ Victory is repeated", "ðŸ™Œ The LORD receives the song"],
      "The whole community is invited to remember deliverance through worship."
    );
  }
  if (/three days|no water|marah|murmured|tree|statute|healeth|twelve wells/.test(lower)) {
    return add(
      /healeth/.test(lower) ? "The LORD names Himself as the healer of His people." : "The wilderness quickly tests Israel's trust through thirst.",
      "The God who opened the sea also teaches His people to trust Him when the water is bitter or missing.",
      ["ðŸ’§ Thirst is real", "ðŸŒ¿ God provides healing", "ðŸ—£ï¸ Complaining exposes fear", "ðŸï¸ Elim shows generous provision"],
      "The wilderness teaches that the LORD cares for needs after the rescue too."
    );
  }
  if (/wilderness of sin|fifteenth day|murmured|died by the hand|flesh pots|bread to the full|kill this whole assembly/.test(lower)) {
    return add(
      "Hunger makes Israel remember Egypt falsely.",
      "They remember food but forget slavery, and their complaint turns need into accusation.",
      ["ðŸ² Egypt is remembered selectively", "ðŸž Hunger is real", "ðŸ’¬ Complaint grows", "ðŸ’” Fear rewrites the past"],
      "The complaint shows how need can make bondage sound better than trust."
    );
  }
  if (/rain bread|go out and gather|certain rate|prove them|sixth day|\beven\b|morning|murmurings/.test(lower)) {
    return add(
      /prove/.test(lower) ? "The manna will test whether Israel trusts and obeys God's instruction." : "God is giving bread in a way that trains daily dependence.",
      "The provision comes with limits, timing, and commands so Israel learns the Provider's ways.",
      ["ðŸž Bread comes from heaven", "ðŸ“ Each day has a measure", "ðŸ§ª Trust is tested", "ðŸ™Œ Provision reveals the LORD"],
      "Manna is not only food; it is a classroom for obedience."
    );
  }
  if (/aaron spake|looked toward|glory|heard the murmurings|eat flesh|filled with bread|lord your god/.test(lower)) {
    return add(
      "God answers complaint with provision that reveals who He is.",
      "Quail in the evening and bread in the morning show that the LORD has heard and is still caring for His people.",
      ["ðŸ‘‚ God hears the murmuring", "ðŸ— Flesh comes at evening", "ðŸž Bread fills them in morning", "â˜ï¸ Glory appears in the cloud"],
      "The food is meant to lead Israel beyond full stomachs to knowing the LORD."
    );
  }
  if (/quails|dew|small round|what is it|bread which the lord|omer|much had nothing|little had no lack/.test(lower)) {
    return add(
      /what is it/.test(lower) ? "Israel sees unfamiliar food and does not know what to call it." : "God gives enough food for each person according to need.",
      "The manna is strange, measured, and sufficient, so no household has to compete or hoard.",
      ["ðŸŒ… Provision comes in the morning", "â“ Manna is unfamiliar", "ðŸ“ An omer measures enough", "âœ… No one lacks"],
      "Daily bread teaches sufficiency instead of panic."
    );
  }
  if (/leave of it|hearkened not|worms|stank|wroth|every morning|sun waxed hot|melted/.test(lower)) {
    return add(
      "Israel learns that manna must be received God's way.",
      "Keeping it overnight against command leads to spoiled food, while morning gathering teaches fresh dependence.",
      ["ðŸš« Hoarding disobeys", "ðŸª± Stored manna spoils", "ðŸŒ… Morning gathering continues", "â˜€ï¸ The manna melts"],
      "Trust means obeying the Provider instead of trying to control tomorrow."
    );
  }
  if (/twice as much|holy sabbath|bake|did not stink|six days|seventh day|there shall be none|rested/.test(lower)) {
    return add(
      "The Sabbath pattern teaches Israel to stop because God has provided enough.",
      "The double portion before the seventh day trains former slaves to receive rest by faith.",
      ["ðŸž Double portion is given", "ðŸ›‘ Sabbath rest is holy", "ðŸ”¥ Preparation happens beforehand", "ðŸ™Œ Rest depends on trust"],
      "Free people learn they are not ruled by endless labor."
    );
  }
  if (/how long refuse|commandments|abide|go out of his place|people rested/.test(lower)) {
    return add(
      "God confronts the refusal to trust His Sabbath command.",
      "Some people still search for manna when He has already said none will be there.",
      ["ðŸš« Refusal is exposed", "ðŸ“œ The command is clear", "ðŸ  Each person must stay", "ðŸ›‘ Rest is finally practiced"],
      "Stopping becomes obedience when God has promised enough."
    );
  }
  if (/called the name thereof manna|coriander|wafers|honey|omer|kept|testimony|forty years|borders of canaan/.test(lower)) {
    return add(
      /forty years|borders/.test(lower) ? "The manna continued through the whole wilderness journey until Canaan's edge." : "The manna is described and preserved so Israel remembers God's provision.",
      "Taste, appearance, and the kept omer make God's care concrete for future generations.",
      ["ðŸž Manna is named", "ðŸ¯ Its taste is remembered", "ðŸº An omer is preserved", "ðŸžï¸ God fed them until Canaan"],
      "The kept manna witnesses that the LORD sustained Israel day after day."
    );
  }

  return add(
    "This detail names a specific part of Israel's movement after rescue.",
    `In ${section.reference}, the people are learning how memory, guidance, worship, testing, provision, and rest belong to the LORD.`,
    ["ðŸ“œ The detail belongs to the text", "ðŸ§­ Israel is learning the way", "ðŸ™Œ The LORD is forming His people"],
    "Each detail adds one piece to life with the God who brought Israel out."
  );
}

const DAY_25_EXACT_PHRASE_EXPLANATIONS: Record<string, string[]> = {
  "Whatsoever Openeth The Womb": ["Whatsoever Openeth The Womb means the first offspring born from a mother.", "The phrase can refer to firstborn children and firstborn animals.", "After Passover, firstborn life carries a memory: Israel's firstborn were spared by the LORD.", "God uses the firstborn to keep rescue in front of the people."],
  "It Is Mine": ["It Is Mine is the LORD's claim over the firstborn He spared.", "Israel's firstborn lived because God showed mercy on Passover night.", "So the firstborn are not treated as independent possessions.", "The phrase teaches that rescued life is claimed by the Rescuer."],
  "Every Firstling": ["Every Firstling means the firstborn animal from the flock or herd.", "Firstling is old Bible wording for the first animal born from its mother.", "Israel was to treat the firstborn animals as marked for the LORD.", "The command kept Passover mercy tied to daily farm life."],
  "Every Firstborn Of Man Among Thy Children Shalt Thou Redeem": ["Every Firstborn Of Man Among Thy Children Shalt Thou Redeem means firstborn sons are bought back, not sacrificed.", "Redeem means to rescue or buy back through the payment God requires.", "The child lives because God provides a way of redemption.", "This keeps the Passover truth alive: spared life is received by mercy."],
  "God Led Them Not Through The Way Of The Land Of The Philistines": ["God Led Them Not Through The Way Of The Land Of The Philistines means God avoided the shortest military road.", "The Philistine route would have brought Israel quickly toward war.", "The people were free, but they were not yet ready for that kind of fight.", "The longer road is God's care, not God's confusion."],
  "Lest Peradventure The People Repent": ["Lest Peradventure The People Repent means God knew Israel might turn back if war came too soon.", "Repent here means turn around or change direction.", "The LORD understands the weakness of newly freed slaves.", "He leads them with patience because freedom still has to be learned."],
  "God Led The People About": ["God Led The People About means God took Israel by a roundabout route.", "The path may look indirect, but it is guided.", "Israel is not wandering because God lost the way.", "They are being led by a God who knows what they can handle."],
  "A Pillar Of Cloud By Day": ["A Pillar Of Cloud By Day means God's presence guided Israel visibly during the daytime.", "A pillar is a tall visible column.", "The cloud told the people where to go when they had no map, homeland, or army strategy.", "The LORD made His guidance visible for a people learning to follow Him."],
  "A Pillar Of Fire By Night": ["A Pillar Of Fire By Night means God's presence guided and guarded Israel in darkness.", "The fire gave visible direction when nighttime could have made travel frightening.", "God did not only lead when the path was bright.", "He stayed present when the people could not see naturally."],
  "He Took Not Away The Pillar": ["He Took Not Away The Pillar means God did not remove His visible guidance from Israel.", "The cloud by day and fire by night remained with them.", "Newly freed people needed steady direction, not occasional hints.", "The LORD's presence was constant on the road out of Egypt."],
  "I Will Harden Pharaoh's Heart": ["I Will Harden Pharaoh's Heart means Pharaoh's stubborn rebellion will be exposed and used in God's plan.", "Pharaoh has already resisted the LORD again and again.", "Now his continued hardness will lead him into one final confrontation.", "God will turn Pharaoh's pride into a stage for rescue and judgment."],
  "The LORD Hardened The Heart Of Pharaoh": ["The LORD Hardened The Heart Of Pharaoh means Pharaoh's rebellion is now being handed over to judgment.", "Pharaoh still wants control after releasing Israel.", "The LORD does not lose control of Pharaoh's pursuit.", "Even the king's stubborn chase will serve God's rescue at the sea."],
  "He Made Ready His Chariot": ["He Made Ready His Chariot means Pharaoh prepares his war vehicle for pursuit.", "Chariots were fast, frightening military power in the ancient world.", "Pharaoh responds to Israel's freedom by reaching for weapons.", "The old master is trying to drag the rescued people back."],
  "Six Hundred Chosen Chariots": ["Six Hundred Chosen Chariots means Pharaoh brings elite military force after Israel.", "Chosen chariots are not random wagons.", "They are selected instruments of Egypt's strength.", "The detail makes Israel's danger feel humanly impossible."],
  "All The Chariots Of Egypt": ["All The Chariots Of Egypt means Pharaoh throws Egypt's military machinery into the chase.", "Egypt does not send a small patrol.", "The empire's power moves against former slaves near the sea.", "The scene is set so the LORD's rescue will be unmistakable."],
  "Captains Over Every One Of Them": ["Captains Over Every One Of Them means the chariot force is organized under commanders.", "Egypt's pursuit is disciplined, armed, and dangerous.", "Israel is not facing confusion but a real military threat.", "That makes the coming rescue clearly God's work."],
  "The Children Of Israel Went Out With An High Hand": ["The Children Of Israel Went Out With An High Hand means Israel left boldly and openly.", "They were not sneaking away like criminals.", "The LORD had brought them out publicly after breaking Pharaoh's hold.", "The phrase pictures victory, not shame."],
  "The Egyptians Pursued After Them": ["The Egyptians Pursued After Them means Egypt chased Israel after release.", "Pharaoh's army tries to reverse the Exodus.", "The old bondage reaches after the people God has freed.", "The sea will become the place where that pursuit ends."],
  "The Egyptians Pursued": ["The Egyptians Pursued means Pharaoh's army enters the path after Israel.", "They follow the rescued people into the sea road God opened.", "What was safe for Israel becomes deadly for Egypt.", "The phrase shows pride rushing into judgment."],
  "They Were Sore Afraid": ["They Were Sore Afraid means Israel was extremely afraid.", "Sore here means greatly or intensely.", "The people see Pharaoh's army behind them and the sea ahead.", "Their fear is real, but it is about to meet the LORD's salvation."],
  "The Children Of Israel Cried Out Unto The LORD": ["The Children Of Israel Cried Out Unto The LORD means fear turns into a desperate appeal to God.", "They do not have weapons or a visible escape route.", "Their cry is messy, but it is directed toward the only One who can save them.", "The sea scene begins with helpless people crying out."],
  "Because There Were No Graves In Egypt": ["Because There Were No Graves In Egypt is fearful sarcasm from Israel.", "They accuse Moses as if Egypt did not have enough graves and he brought them into the wilderness to die.", "Fear is twisting the rescue story into an accusation.", "The line shows how quickly panic can make slavery sound safer than trust."],
  "Wherefore Hast Thou Dealt Thus With Us": ["Wherefore Hast Thou Dealt Thus With Us means 'Why have you treated us this way?'", "The people aim their fear at Moses.", "They cannot yet see that God positioned them here for deliverance.", "The question comes from panic, not from understanding the LORD's plan."],
  "Let Us Alone": ["Let Us Alone means Israel claims they would rather have stayed enslaved.", "Fear makes Egypt sound like safety.", "The words reveal how bondage can shape a person's imagination even after release.", "God will answer by showing that freedom with Him is better than survival under Pharaoh."],
  "Wherefore Criest Thou Unto Me": ["Wherefore Criest Thou Unto Me means God tells Moses this is the moment to move, not only to cry.", "Prayer is not mocked here.", "The LORD has already given the next command: Israel must go forward.", "There are moments when faith prays and then obeys the road God opens."],
  "Speak Unto The Children Of Israel, That They Go Forward": ["Speak Unto The Children Of Israel, That They Go Forward means the people must move toward the sea by God's command.", "Forward looks impossible before the waters open.", "God's word comes before the visible path.", "Israel learns to move because the LORD speaks, not because the route already looks safe."],
  "Lift Thou Up Thy Rod": ["Lift Thou Up Thy Rod means Moses must raise the staff God has used throughout the plagues.", "The rod is not magic.", "It is the visible sign connected to God's command through Moses.", "The same God who struck Egypt will now open the sea."],
  "Divide It": ["Divide It means the LORD will split the sea so Israel can pass through.", "The water that blocked escape will become two walls around a road.", "Only the Creator can command the sea this way.", "The phrase turns the impossible obstacle into God's doorway."],
  "The Children Of Israel Shall Go On Dry Ground": ["The Children Of Israel Shall Go On Dry Ground means Israel will cross the sea without sinking in mud or drowning.", "Dry ground stresses the completeness of the miracle.", "God does not merely make the water shallow.", "He makes a stable path for His people through the sea."],
  "Upon The Dry Ground": ["Upon The Dry Ground repeats the safety of Israel's path through the sea.", "The people walk where water had been.", "The ground is dry because the LORD has made the way ready.", "The phrase helps the reader picture a real crossing, not a vague escape."],
  "The Angel Of God Removed": ["The Angel Of God Removed means God's messenger-presence moved position in the camp.", "The presence that had led from the front now moves behind Israel.", "God places Himself between His people and the Egyptian army.", "Guidance becomes protection."],
  "The Pillar Of The Cloud Went From Before Their Face": ["The Pillar Of The Cloud Went From Before Their Face means the cloud moved from the front of Israel to the rear.", "Before their face means in front of them.", "The movement is deliberate protection.", "God guards the vulnerable side while opening the way ahead."],
  "It Was A Cloud And Darkness To Them, But It Gave Light By Night": ["It Was A Cloud And Darkness To Them, But It Gave Light By Night means the same presence affected Egypt and Israel differently.", "To Egypt, it blocked and darkened the way.", "To Israel, it gave light through the night.", "God's presence can protect His people while confusing their enemies."],
  "Troubled The Host Of The Egyptians": ["Troubled The Host Of The Egyptians means the LORD threw Egypt's army into confusion.", "Host means army or military force.", "The organized chariot power starts breaking down under God's judgment.", "Egypt's strength cannot stay steady when the LORD fights for Israel."],
  "Took Off Their Chariot Wheels": ["Took Off Their Chariot Wheels means Egypt's strongest vehicles became useless in the sea path.", "The chariots that made Egypt terrifying now fail.", "The army cannot move as it planned.", "God attacks the very tool Pharaoh trusted for pursuit."],
  "Let Us Flee From The Face Of Israel": ["Let Us Flee From The Face Of Israel means the Egyptians finally realize the battle has turned against them.", "They no longer sound confident.", "They see that the LORD is fighting for Israel.", "The pursuers become the ones trying to escape."],
  "The LORD Overthrew The Egyptians": ["The LORD Overthrew The Egyptians means the final defeat at the sea is God's act.", "Overthrew means He brought them down and ruined their attack.", "Israel does not defeat Egypt by sword or strategy.", "The LORD ends Pharaoh's pursuit Himself."],
  "Then Sang Moses And The Children Of Israel": ["Then Sang Moses And The Children Of Israel means worship rises after rescue.", "The people do not move on as if nothing happened.", "They answer salvation with song.", "The first great song of Exodus teaches them how to remember the LORD's victory."],
  "I Will Sing Unto The LORD": ["I Will Sing Unto The LORD means the singer chooses to direct praise to the Rescuer.", "The song is not mainly about Moses, Israel, or the sea.", "It is sung to the LORD because He won the victory.", "Praise gives God the credit rescue deserves."],
  "The Horse And His Rider Hath He Thrown Into The Sea": ["The Horse And His Rider Hath He Thrown Into The Sea means Egypt's military power was cast down by the LORD.", "Horse and rider represent the pursuing army.", "The sea became the place where Pharaoh's strength collapsed.", "The line celebrates God defeating what Israel could never defeat."],
  "The LORD Is My Strength And Song": ["The LORD Is My Strength And Song means God is both the power behind the rescue and the reason for praise.", "Israel's strength did not come from weapons.", "Their song did not come from self-confidence.", "The LORD Himself became their help and their worship."],
  "The Horse Of Pharaoh Went In": ["The Horse Of Pharaoh Went In means Pharaoh's army entered the sea path in pursuit.", "The line recalls the danger Israel faced.", "Egypt's war power followed them into the place God had opened.", "The rescue song remembers the threat so the victory is not minimized."],
  "Miriam The Prophetess": ["Miriam The Prophetess means Miriam is recognized as a woman who leads worship with prophetic authority.", "She is named as Aaron's sister and a leader among the women.", "Her role shows that the victory song spreads through the community.", "The rescue is remembered by men and women together."],
  "Timbrels And With Dances": ["Timbrels And With Dances means the women worship with instruments and movement.", "A timbrel was a hand drum or tambourine-like instrument.", "The celebration is public, embodied, and joyful.", "God's victory at the sea calls for more than quiet relief."],
  "Sing Ye To The LORD": ["Sing Ye To The LORD means Miriam calls others to join the praise.", "The command is plural and communal.", "The victory is not only Moses' testimony.", "All God's rescued people are invited to answer with worship."],
  "Three Days In The Wilderness": ["Three Days In The Wilderness means Israel travels three days after the sea before finding water.", "The joy of victory quickly becomes the pressure of need.", "The wilderness will test whether Israel trusts the God who just saved them.", "Freedom now requires daily dependence."],
  "Found No Water": ["Found No Water means the people face a real survival problem.", "This is not imaginary complaining.", "A large community in the wilderness needs water urgently.", "The test is whether need will lead them to trust or to bitterness."],
  "They Could Not Drink Of The Waters Of Marah": ["They Could Not Drink Of The Waters Of Marah means the water they found was bitter and unusable.", "Marah sounds like the Hebrew word for bitter.", "Finding water and then being unable to drink it deepens the disappointment.", "The scene teaches that even found resources need God's healing."],
  "The People Murmured Against Moses": ["The People Murmured Against Moses means the people grumbled against their leader instead of trusting the LORD.", "Murmuring is low, resentful complaining.", "They aim their frustration at Moses, but the deeper issue is trust in God.", "The wilderness exposes what fear sounds like after rescue."],
  "The LORD Shewed Him A Tree": ["The LORD Shewed Him A Tree means God provided the means for healing the bitter water.", "Moses does not invent the solution.", "The LORD shows him what to use.", "The God who opened the sea now cares for thirsty people at Marah."],
  "I Am The LORD That Healeth Thee": ["I Am The LORD That Healeth Thee means God reveals Himself as Israel's healer.", "Healeth is old wording for heals.", "The bitter water becomes a teaching moment about God's care and Israel's obedience.", "The LORD can heal water, bodies, and the wounded life of a rescued people."],
  "Twelve Wells Of Water": ["Twelve Wells Of Water means God brings Israel from bitter water to abundant supply at Elim.", "Twelve wells would be a generous provision for the tribes of Israel.", "The scene does not end at Marah's bitterness.", "God leads His people onward to refreshment."],
  "The Wilderness Of Sin": ["The Wilderness Of Sin is the name of the wilderness region Israel enters.", "Sin here is a place name, not a statement that the location itself is sinful.", "The chapter will still expose sinful complaining, but the title names the region.", "Beginners should not confuse the place name with the moral word sin."],
  "The Fifteenth Day Of The Second Month": ["The Fifteenth Day Of The Second Month dates the moment after the Exodus.", "Israel has been out of Egypt long enough for food fear to rise.", "The date helps readers see how quickly memory can fade under pressure.", "Recent rescue does not automatically remove the need to trust today."],
  "The Whole Congregation Murmured": ["The Whole Congregation Murmured means the complaint spread through the whole community.", "This is not only one loud person.", "The rescued people are together in fear and frustration.", "The wilderness is beginning to reveal what is inside the congregation."],
  "When We Sat By The Flesh Pots": ["When We Sat By The Flesh Pots means Israel remembers Egypt as a place of meat and full cooking pots.", "Flesh pots were pots of meat.", "Their hunger makes slavery sound comfortable.", "Need can distort memory until bondage looks better than trust."],
  "When We Did Eat Bread To The Full": ["When We Did Eat Bread To The Full means Israel remembers having enough food in Egypt.", "The memory is selective.", "They remember bread but downplay slavery, brick quotas, and oppression.", "The phrase shows how fear can edit the past."],
  "Ye Have Brought Us Forth To Kill This Whole Assembly": ["Ye Have Brought Us Forth To Kill This Whole Assembly is Israel's accusation against Moses and Aaron.", "They claim the rescue has only led them toward death by hunger.", "The charge is false, but it reveals their fear.", "They are still learning that the God who saved them can also feed them."],
  "In The Morning, Then Ye Shall See The Glory Of The LORD": ["In The Morning, Then Ye Shall See The Glory Of The LORD means God's provision will reveal His presence and power.", "The people will not merely receive breakfast.", "They will see that the LORD has heard and is with them.", "Provision becomes revelation."],
  "The Glory Of The LORD Appeared In The Cloud": ["The Glory Of The LORD Appeared In The Cloud means God's visible presence is shown to the congregation.", "The cloud is not just weather.", "It is tied to the LORD's presence with His people.", "God answers their complaint by making His nearness visible."],
  "I Have Heard The Murmurings": ["I Have Heard The Murmurings means God hears the complaints of the people.", "He is not unaware of their fear, hunger, or grumbling.", "The line is both mercy and warning.", "Their words against Moses are heard by the LORD Himself."],
  "At Even Ye Shall Eat Flesh": ["At Even Ye Shall Eat Flesh means God will provide meat in the evening.", "At even means at evening.", "The promise answers the people's memory of Egypt's flesh pots.", "God can feed them in the wilderness without sending them back to slavery."],
  "In The Morning Ye Shall Be Filled With Bread": ["In The Morning Ye Shall Be Filled With Bread means God will provide bread after the night of quail.", "Filled means they will have enough.", "The morning provision will become the manna pattern.", "God gives daily bread where there are no fields or ovens."],
  "Ye Shall Know That I Am The LORD Your God": ["Ye Shall Know That I Am The LORD Your God means the food is meant to teach relationship, not only survival.", "The LORD is showing that He is their God in the wilderness too.", "Egypt is not the only place where He can provide.", "Every meal becomes evidence of who He is."],
  "Let No Man Leave Of It Till The Morning": ["Let No Man Leave Of It Till The Morning means the people must not keep daily manna overnight.", "God is training Israel to receive today's provision and trust Him for tomorrow.", "The command pushes against fear-driven hoarding.", "Daily bread must be gathered with daily trust."],
  "They Hearkened Not Unto Moses": ["They Hearkened Not Unto Moses means some people did not listen to the instruction.", "Hearkened means listened with obedience.", "They tried to keep manna overnight anyway.", "The test reveals that receiving provision is easier than trusting the Provider."],
  "It Bred Worms, And Stank": ["It Bred Worms, And Stank means the kept manna spoiled badly by morning.", "The ugly result teaches the lesson physically.", "Food kept against God's command becomes rotten.", "The people learn that fear-hoarding cannot improve on God's daily care."],
  "When The Sun Waxed Hot, It Melted": ["When The Sun Waxed Hot, It Melted means the manna disappeared as the day grew warm.", "Waxed hot means became hot.", "The people had to gather in the morning instead of delaying.", "God's provision came with a daily rhythm they had to learn."],
  "This Is Done Because Of That Which The LORD Did": ["This Is Done Because Of That Which The LORD Did means the feast has a reason.", "Israel is not keeping a ritual just to keep a ritual.", "The action points back to the LORD's rescue from Egypt.", "\u{1F4DC} The command", "\u{1F6AA} The rescue", "\u{1F9D2} Children taught", "God wants His people to know why they do what they do.", "Worship becomes memory with meaning."],
  "When The LORD Shall Bring Thee": ["When The LORD Shall Bring Thee looks ahead to the land God promised.", "Israel is still on the road, but God speaks as if the promise is sure.", "The people must remember the LORD before they settle into comfort.", "\u{1F5FA}\u{FE0F} Promised land", "\u{1F463} Journey", "\u{1F64C} God's faithfulness", "The phrase teaches that remembrance is needed after blessing, not only during danger."],
  "Pharaoh Would Hardly Let Us Go": ["Pharaoh Would Hardly Let Us Go means Pharaoh resisted letting Israel leave.", "Hardly means stubbornly or with great difficulty.", "The phrase keeps the pain of bondage in the memory of the children.", "\u{1F451} Pharaoh resisted", "\u{1F6AA} Israel released", "\u{1F4AA} The LORD stronger", "Israel's freedom was not easy because Pharaoh was kind.", "They were free because the LORD broke the grip of Egypt."],
  "Speak Unto The Children Of Israel": ["Speak Unto The Children Of Israel means the LORD gives Moses a word for the whole people.", "The next movement is not Moses' private idea.", "Israel must turn and encamp because God commands it.", "\u{1F5E3}\u{FE0F} God speaks", "\u{1F465} The people hear", "\u{1F4CD} The camp moves", "The phrase reminds the reader that the strange route is guided by God's word."],
  "Moses Stretched Out His Hand Over The Sea": ["Moses Stretched Out His Hand Over The Sea shows Moses obeying the LORD's command at the water.", "His hand does not contain power by itself.", "The gesture is the visible sign connected to God's word.", "\u{1F590}\u{FE0F} Moses' hand", "\u{1F30A} The sea", "\u{1F4DC} God's command", "The reader sees obedience before the miracle is seen.", "Moses acts because the LORD has spoken."],
  "The LORD Caused The Sea To Go Back": ["The LORD Caused The Sea To Go Back names the true power behind the crossing.", "Moses stretches out his hand, but the LORD moves the water.", "The sea obeys the Creator who rules over it.", "\u{1F30A} Sea moved", "\u{1F32C}\u{FE0F} Wind used", "\u{1F64C} The LORD acts", "The phrase keeps the miracle from being credited to Moses.", "God Himself makes the way."],
  "In The Morning Watch": ["In The Morning Watch means the LORD acts during the last watch of the night.", "A watch was a period when guards stayed awake and alert.", "Egypt enters the sea road in darkness, but morning brings judgment.", "\u{1F319} Night watch", "\u{1F441}\u{FE0F} Guard time", "\u{1F305} Morning coming", "The timing makes the rescue feel tense and real.", "The long night ends with the LORD fighting for Israel."],
  "The LORD Looked Unto The Host Of The Egyptians": ["The LORD Looked Unto The Host Of The Egyptians means God turns His attention toward Egypt's army.", "Host means an army or fighting force.", "The look of the LORD is not helpless watching.", "\u{1F441}\u{FE0F} The LORD sees", "\u{2694}\u{FE0F} Egypt's army", "\u{26A0}\u{FE0F} Judgment begins", "When God looks toward the oppressor, Egypt's strength starts to collapse."],
  "The Sea Returned To His Strength": ["The Sea Returned To His Strength means the waters came back with their full force.", "The road through the sea was open only by God's command.", "When the LORD releases the waters, the sea is no longer held back.", "\u{1F30A} Waters return", "\u{1F4AA} Full strength", "\u{26D4} Escape closed", "The same sea that became a path for Israel becomes judgment for Egypt."],
  "The Children Of Israel Walked Upon Dry Land": ["The Children Of Israel Walked Upon Dry Land means Israel crossed safely where water had been.", "Dry land shows the miracle was complete.", "God did not give them a muddy scramble or a half-open path.", "\u{1F463} Walking", "\u{1F3DC}\u{FE0F} Dry ground", "\u{1F30A} Sea on both sides", "The phrase helps the reader picture real people crossing through a real deliverance."],
  "The People Feared The LORD": ["The People Feared The LORD means Israel responded with reverent awe.", "Fear here is not only panic.", "It is the holy recognition that the LORD is powerful, present, and faithful.", "\u{1F633} Awe", "\u{1F64C} Reverence", "\u{1F30A} Rescue remembered", "The sea taught Israel that the LORD is not like Pharaoh.", "He is the God who saves and judges."],
  "In The Greatness Of Thine Excellency": ["In The Greatness Of Thine Excellency praises the LORD's overwhelming majesty.", "Excellency means His lifted-up greatness and glory.", "The song says Egypt fell because God's greatness is higher than Egypt's power.", "\u{1F451} Majesty", "\u{1F4AA} Power", "\u{1F3B6} Praise", "Israel is learning to sing about God as greater than every empire."],
  "With The Blast Of Thy Nostrils": ["With The Blast Of Thy Nostrils is picture language for God's powerful breath.", "The song describes the waters responding as if one breath from God can move the sea.", "This is not saying God has a weak human body.", "\u{1F32C}\u{FE0F} Breath", "\u{1F30A} Waters moved", "\u{1F64C} Creator power", "The image helps the reader feel how effortless the sea miracle is for the LORD."],
  "The Floods Stood Upright": ["The Floods Stood Upright means the waters stood like walls.", "Floods here refers to the waters of the sea gathered up by God's power.", "Water does not naturally stand like that.", "\u{1F30A} Waters", "\u{1F9F1} Like walls", "\u{1F6E1}\u{FE0F} Safe path", "The phrase turns the crossing into a picture the reader can see.", "The Creator makes water stand at attention."],
  "Thou Didst Blow With Thy Wind": ["Thou Didst Blow With Thy Wind points to the LORD using wind in the sea judgment.", "The wind is not random weather.", "It serves the command of God.", "\u{1F32C}\u{FE0F} Wind", "\u{1F30A} Sea", "\u{2696}\u{FE0F} Judgment", "The song remembers nature obeying the LORD in Israel's rescue."],
  "They Sank As Lead": ["They Sank As Lead means Egypt's army went down heavily into the sea.", "Lead is a heavy metal.", "The image shows Pharaoh's forces falling with no strength to rise.", "\u{2693} Heavy sinking", "\u{1F30A} Deep waters", "\u{1F451} Egypt defeated", "The phrase makes the defeat feel final.", "The pursuers are not merely delayed; they are overthrown."],
  "Fearful In Praises": ["Fearful In Praises means the LORD is awesome and holy even when His people praise Him.", "Israel's song is joyful, but it is not casual.", "The God who saved them also judged Egypt.", "\u{1F64C} Praise", "\u{1F525} Holy awe", "\u{1F30A} Mighty rescue", "The phrase teaches that worship can be full of joy and reverence at the same time."],
  "The Place, O LORD, Which Thou Hast Made": ["The Place, O LORD, Which Thou Hast Made looks forward to the dwelling place God prepares.", "The song is not satisfied with escape alone.", "God is bringing His people toward a place of worship and belonging.", "\u{1F3D4}\u{FE0F} Place prepared", "\u{1F64F} Worship", "\u{1F3E0} Life with God", "The phrase points beyond leaving Egypt toward living near the LORD."],
  "Thy Hands Have Established": ["Thy Hands Have Established means God Himself makes the place secure.", "Established means set firmly in place.", "Israel's future does not depend on their strength alone.", "\u{1F590}\u{FE0F} God's hands", "\u{1F3D4}\u{FE0F} Secure place", "\u{1F64C} Promise held", "The phrase gives confidence that the LORD can finish what He started."],
  "The LORD Brought Again The Waters": ["The LORD Brought Again The Waters means God returned the sea over Egypt's army.", "The waters do not decide for themselves when to close.", "The LORD controls both the opening and the returning.", "\u{1F30A} Waters return", "\u{2694}\u{FE0F} Egypt covered", "\u{1F64C} The LORD rules", "Israel's rescue and Egypt's judgment both happen under God's command."],
  "The Sister Of Aaron": ["The Sister Of Aaron identifies Miriam through her family connection.", "Aaron is named because the reader already knows him as Moses' brother and spokesman.", "Miriam is not a random singer at the edge of the story.", "\u{1F469} Miriam", "\u{1F46A} Family line", "\u{1F3B6} Worship leader", "Her family connection places her inside Israel's leadership family."],
  "There He Made For Them A Statute And An Ordinance": ["There He Made For Them A Statute And An Ordinance means Marah becomes a place of instruction.", "A statute and an ordinance are commands or rules for God's people.", "The bitter water scene becomes more than a water miracle.", "\u{1F4DC} Instruction", "\u{1F4A7} Water test", "\u{1F9ED} Learning God's ways", "God is teaching rescued people how to listen and obey in the wilderness."],
  "Would To God We Had Died By The Hand Of The LORD": ["Would To God We Had Died By The Hand Of The LORD is Israel's bitter complaint.", "They are saying it would have been better to die in Egypt than hunger in the wilderness.", "Fear is making slavery sound safer than freedom.", "\u{1F62B} Hunger", "\u{1F4AD} Twisted memory", "\u{1F6AA} Egypt behind them", "The phrase shows how quickly fear can make people forget rescue."],
  "At Even, Then Ye Shall Know": ["At Even, Then Ye Shall Know points to evening as the time God will begin answering their hunger.", "At even means at evening.", "The quail will show that the LORD heard their complaint.", "\u{1F307} Evening", "\u{1F357} Flesh provided", "\u{1F441}\u{FE0F} The LORD sees", "God's timing turns the evening meal into a lesson about His presence."],
  "Your Murmurings Are Not Against Us, But Against The LORD": ["Your Murmurings Are Not Against Us, But Against The LORD means the complaint is deeper than Moses and Aaron.", "The people think they are only grumbling at leaders.", "But their words are really challenging the God who led them out.", "\u{1F5E3}\u{FE0F} Complaints", "\u{1F465} Leaders", "\u{1F64C} The LORD", "The phrase helps beginners see that unbelief can hide behind complaints about people."],
  "As Aaron Spake": ["As Aaron Spake means the moment happens while Aaron is speaking to the congregation.", "The people are hearing the message when God shows His glory.", "Aaron's words are immediately backed by the LORD's visible presence.", "\u{1F5E3}\u{FE0F} Aaron speaks", "\u{2601}\u{FE0F} Cloud", "\u{2728} Glory appears", "The phrase connects the spoken message with God's answer."],
  "Who Is Like Unto Thee, O LORD": ["No one can be compared with the LORD.", "Israel has seen Pharaoh's power collapse, Egypt's gods exposed, and the sea obey God's command.", "The question is worship, not confusion.", "\u{1F451} The LORD alone is supreme", "\u{1F30A} The sea obeyed Him", "\u{2728} His holiness stands apart", "\u{1F64C} Rescue leads to praise", "The song teaches Israel that the God who saved them has no rival."],
  "I Will Rain Bread From Heaven": ["God promises to send food from above for His hungry people.", "Israel cannot grow bread in the wilderness, and they cannot return to Egypt for life.", "The bread will come from the LORD's own provision.", "\u{1F35E} God gives bread from heaven", "\u{1F3DC}\u{FE0F} The wilderness cannot stop His care", "\u{1F4CF} Daily provision will train trust", "\u{1F64C} The Provider is teaching His people", "Manna will teach Israel to depend on God one day at a time."],
  "They Looked Toward The Wilderness": ["They Looked Toward The Wilderness means the people turn their eyes toward the empty place.", "The wilderness looks like lack, hunger, and no supply.", "But that is where the glory of the LORD appears.", "\u{1F441}\u{FE0F} They looked", "\u{1F3DC}\u{FE0F} Wilderness", "\u{2728} Glory", "God can reveal His presence in the place that looks least promising."],
  "Moses Was Wroth With Them": ["Moses Was Wroth With Them means Moses was angry with the people.", "Wroth is old wording for deeply angry.", "The anger comes because some Israelites ignored clear instruction about the manna.", "\u{1F621} Moses angry", "\u{1F35E} Manna kept", "\u{1F6AB} Command ignored", "The phrase shows that God's provision still had to be received God's way."],
  "This Is That Which The LORD Hath Said": ["This Is That Which The LORD Hath Said means Moses explains the Sabbath instruction as God's word.", "The double portion is not Moses making up a new rule.", "It is connected to what the LORD already said.", "\u{1F4DC} God's word", "\u{1F35E} Double portion", "\u{1F6D1} Sabbath rest", "The phrase teaches Israel to understand provision through God's command."],
  "It Did Not Stink": ["It Did Not Stink means the Sabbath portion did not spoil overnight.", "Earlier, kept manna bred worms and stank.", "Here, the same kind of bread stays good because God commanded the Sabbath rest.", "\u{1F35E} Manna kept", "\u{2705} No stink", "\u{1F6D1} Sabbath", "The phrase shows that obedience changes the meaning of keeping the manna."],
  "See, For That The LORD Hath Given You The Sabbath": ["See, For That The LORD Hath Given You The Sabbath means the Sabbath is presented as a gift.", "God is not merely stopping Israel from working.", "He is giving them rest after generations of slave labor.", "\u{1F441}\u{FE0F} See", "\u{1F381} Given", "\u{1F6D1} Sabbath rest", "Rest is mercy from the LORD, not a loss of provision."],
  "Abide Ye Every Man In His Place": ["Abide Ye Every Man In His Place means the people are to stay where they are on the Sabbath.", "Abide means remain or stay.", "They do not need to run out searching for food.", "\u{1F3E0} Stay", "\u{1F6D1} Rest", "\u{1F35E} God provides", "The phrase teaches Israel to trust the LORD enough to stop."],
  "Let No Man Go Out Of His Place": ["Let No Man Go Out Of His Place repeats the Sabbath boundary clearly.", "No one needs to go out gathering manna that God said would not be there.", "The command protects rest from anxious searching.", "\u{1F6AB} Do not go out", "\u{1F6D1} Sabbath", "\u{1F64C} Trust", "The phrase presses the lesson home: God's people can rest because God has provided."],
  "That They May See The Bread": ["That They May See The Bread means a sample of manna is kept for future generations to look at.", "The preserved bread becomes a witness.", "Children who did not walk through the wilderness could still learn what God gave.", "\u{1F35E} Bread kept", "\u{1F3FA} Stored witness", "\u{1F9D2} Future children", "The phrase turns daily food into remembered testimony."],
};

function removeDay25RepeatedPhraseTitle(title: string, lines: string[]) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const repeatedTitlePattern = new RegExp(`^${escapedTitle}\\s+(means|explains|describes|shows|names|gives|is|stresses|teaches|captures|announces|pictures|protects|closes|deals with|turns|introduces|exposes|preserves|carries|celebrates|marks|looks|points to|points into|reminds|connects|ties|places|repeats|praises|identifies|becomes|dates|brings|treats|warns|makes|keeps|follows|begins|guards|shapes|joins|prepares|stays|matters because|also becomes|should be read as|helps)\\s+`, "i");

  return lines.map((line, index) => {
    let cleaned = line
      .replace(/\bThe phrase helps the reader\b/gi, "This helps")
      .replace(/\bThe phrase helps readers\b/gi, "This helps")
      .replace(/\bThe repeated image helps the people understand that\b/gi, "The repeated image means ")
      .replace(/\bThe wording helps the reader ask what God is showing through\b/gi, "This points to")
      .replace(/\bThe wording helps beginners see that\b/gi, "This shows that")
      .replace(/\bThe image helps the reader feel\b/gi, "The image shows")
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
      .replace(/\bhelps the people understand that\b/gi, "shows that")
      .replace(/\bthe reader already knows\b/gi, "the surrounding story has already shown")
      .replace(/\bthe reader\b/gi, "a beginner")
      .replace(/\breaders\b/gi, "beginners");

    cleaned = cleaned.replace(repeatedTitlePattern, (_match, verb: string) => {
      const normalizedVerb = verb.toLowerCase();
      if (normalizedVerb === "means") return "";
      if (normalizedVerb === "shows") return "This shows ";
      if (normalizedVerb === "turns") return "This turns ";
      if (normalizedVerb === "is") return "This is ";
      if (normalizedVerb === "looks") return "This looks ";
      if (normalizedVerb === "points to") return "This points to ";
      return `This ${normalizedVerb} `;
    });

    return cleaned
      .replace(/\bThis shows explain\b/gi, "This explains")
      .replace(/\bThis should be read as more than a construction note\b/gi, "This detail belongs to worship before the LORD")
      .replace(/\bThis reminds the reader that\b/gi, "This shows that")
      .replace(/\bThis reminds the reader\b/gi, "This shows")
      .replace(/^([a-z])/, (letter) => letter.toUpperCase());
  });
}

function getDay25TeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.chapter === 13 && (lower.includes("firstborn") || lower.includes("firstling") || lower.includes("openeth") || lower.includes("redeem") || lower.includes("mine"))) {
    return ["ðŸ‘¶ Firstborn life belongs to the LORD", "ðŸ©¸ Passover mercy must be remembered", "ðŸ’° Redeemed life is bought back", "ðŸ™Œ The Rescuer has the right to claim His people"];
  }
  if (section.chapter === 13 && (lower.includes("unleavened") || lower.includes("leaven") || lower.includes("abib") || lower.includes("remember"))) {
    return ["ðŸž Unleavened bread remembers the hurried Exodus", "ðŸ“… Israel's calendar is shaped by rescue", "ðŸƒ The people left Egypt quickly", "ðŸ•¯ï¸ Worship keeps deliverance from being forgotten"];
  }
  if (section.chapter === 13 && (lower.includes("sign") || lower.includes("frontlets") || lower.includes("hand") || lower.includes("eyes") || lower.includes("son") || lower.includes("mouth"))) {
    return ["ðŸ‘¶ Children must hear the rescue story", "âœ‹ God's work shapes Israel's actions", "ðŸ‘€ God's rescue stays before their eyes", "ðŸ“– The next generation learns why Israel worships"];
  }
  if (section.chapter === 13) {
    return ["ðŸ§­ The LORD chooses the road", "ðŸ›¡ï¸ God's route protects weak people", "â˜ï¸ His presence guides by day", "ðŸ”¥ His presence guards by night"];
  }
  if (section.chapter === 14 && (lower.includes("chariot") || lower.includes("captain") || lower.includes("horse") || lower.includes("pursued") || lower.includes("pharaoh"))) {
    return ["ðŸŽ Egypt brings military power", "ðŸ”’ Pharaoh reaches for control again", "ðŸŒŠ The sea will expose Egypt's weakness", "ðŸ™Œ The LORD will fight for Israel"];
  }
  if (section.chapter === 14 && (lower.includes("afraid") || lower.includes("cried") || lower.includes("graves") || lower.includes("alone") || lower.includes("wherefore"))) {
    return ["ðŸ˜¨ Israel feels trapped", "ðŸŒŠ The sea blocks the way forward", "ðŸŽ Egypt presses from behind", "ðŸ™Œ Fear must meet the LORD's salvation"];
  }
  if (section.chapter === 14 && (lower.includes("dry") || lower.includes("waters") || lower.includes("sea") || lower.includes("rod") || lower.includes("divide") || lower.includes("forward"))) {
    return ["ðŸŒŠ The sea becomes God's road", "ðŸš¶ Israel crosses safely", "ðŸ“œ God's command comes before the visible path", "ðŸ™Œ The Creator makes a way through water"];
  }
  if (section.chapter === 14) {
    return ["â˜ï¸ God's presence protects Israel", "ðŸŒ‘ Egypt is confused by judgment", "ðŸ’¡ Israel receives light for the way", "ðŸ›¡ï¸ The LORD guards His people"];
  }
  if (section.chapter === 15 && (lower.includes("sang") || lower.includes("sing") || lower.includes("song") || lower.includes("timbrels") || lower.includes("miriam"))) {
    return ["ðŸŽ¶ Rescue turns into worship", "ðŸ¥ The community joins the song", "ðŸ™Œ Praise gives God the credit", "ðŸŒŠ The sea victory is remembered aloud"];
  }
  if (section.chapter === 15 && (lower.includes("water") || lower.includes("marah") || lower.includes("murmured") || lower.includes("tree") || lower.includes("healeth") || lower.includes("wells"))) {
    return ["ðŸ’§ Thirst tests the rescued people", "ðŸŒ¿ The LORD provides what heals", "ðŸ—£ï¸ Complaining exposes fragile trust", "ðŸ™Œ The God of the sea also cares in the wilderness"];
  }
  if (section.chapter === 15 && (lower.includes("horse") || lower.includes("rider") || lower.includes("war") || lower.includes("right hand") || lower.includes("overthrown") || lower.includes("wrath") || lower.includes("enemy") || lower.includes("blast") || lower.includes("floods") || lower.includes("sank") || lower.includes("wind"))) {
    return ["âš”ï¸ Egypt's army is defeated", "ðŸŒŠ The sea becomes judgment", "ðŸ’ª The LORD's power wins", "ðŸŽ¶ Israel sings the victory"];
  }
  if (section.chapter === 15 && (lower.includes("who is like") || lower.includes("holiness") || lower.includes("fearful") || lower.includes("wonders") || lower.includes("mercy") || lower.includes("purchased") || lower.includes("pass over"))) {
    return ["âœ¨ The LORD is unmatched", "ðŸ”¥ His holiness inspires awe", "ðŸ•Šï¸ Mercy leads the redeemed", "ðŸŒ Nations will hear and fear"];
  }
  if (section.chapter === 15 && (lower.includes("bring") || lower.includes("plant") || lower.includes("place") || lower.includes("sanctuary") || lower.includes("established") || lower.includes("reign") || lower.includes("inheritance"))) {
    return ["ðŸžï¸ God will bring them in", "ðŸŒ± His people will be planted", "â›ª Worship is the goal", "ðŸ‘‘ The LORD reigns forever"];
  }
  if (section.chapter === 15) {
    return ["ðŸ‘‘ The LORD wins the victory", "ðŸŒŠ Egypt's power falls in the sea", "âœ¨ God's holiness stands apart", "ðŸ”ï¸ Rescue is moving toward life with God"];
  }
  if (section.chapter === 16 && (lower.includes("murmured") || lower.includes("flesh") || lower.includes("bread") || lower.includes("kill") || lower.includes("wilderness"))) {
    return ["ðŸž Hunger tests Israel's trust", "ðŸ§± Egypt is remembered wrongly", "ðŸ—£ï¸ Complaints reveal fear", "ðŸ™Œ God answers need with provision"];
  }
  if (section.chapter === 16 && (lower.includes("manna") || lower.includes("omer") || lower.includes("quails") || lower.includes("dew") || lower.includes("what is it") || lower.includes("gather"))) {
    return ["ðŸž God gives daily bread", "ðŸ“ Each person receives enough", "ðŸŒ… Provision comes morning by morning", "ðŸ™Œ Former slaves learn daily dependence"];
  }
  if (section.chapter === 16 && (lower.includes("sabbath") || lower.includes("seventh") || lower.includes("rest") || lower.includes("sixth") || lower.includes("commandments"))) {
    return ["ðŸ›‘ Sabbath rest is God's gift", "ðŸž The double portion teaches trust", "ðŸ“œ Rest comes by command", "ðŸ™Œ Free people are no longer ruled by endless labor"];
  }

  return ["ðŸ“– The phrase comes from the assigned text", "ðŸ” It explains a real detail in the verse", "ðŸ™Œ The LORD is teaching His rescued people", "ðŸ§  The meaning should be clear before moving on"];
}

function isDay25FillerLine(line: string) {
  return /(^this shows\b|^this is repeated after\b|repeated image means|helps the reader|helps picture|gives a real detail|wording helps|the wording of .* keeps|phrase shows|phrase explains|part of the passage means|reminds the reader|teaches the reader|explains one part|assigned text|real detail in the verse|meaning should be clear|helps a beginner|helps beginners|helps readers|is tied to the red sea rescue|the lord is teaching his rescued people)/i.test(line);
}

function getDay25SpecificOpening(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  const exact: Record<string, string[]> = {
    "Fear Ye Not": [
      "Moses commands the people not to let panic rule the moment.",
      "Israel is truly trapped between Pharaoh's army and the sea, but Moses points them away from Egypt's power and toward the LORD's rescue.",
      "The command does not deny the danger. It says the danger is not greater than God.",
    ],
    "Stand Still, And See The Salvation Of The LORD": [
      "Stand Still, And See The Salvation Of The LORD means Israel must watch God deliver them before they can do anything to save themselves.",
      "They have no army strong enough to defeat Pharaoh and no path through the sea.",
      "Salvation here is the LORD's rescue, shown in public where terrified people can see it.",
    ],
    "The LORD Shall Fight For You": [
      "The LORD Shall Fight For You means the battle belongs to God, not to Israel's weapons or courage.",
      "Former slaves cannot overthrow Egypt's chariots, but the LORD can end Pharaoh's pursuit.",
      "Israel's part is to trust and obey while God wins the victory they cannot win.",
    ],
    "Out Of The House Of Bondage": [
      "Egypt was a place of slavery, not merely a place Israel used to live.",
      "Israel must stay honest about what the LORD rescued them from.",
      "Freedom begins with remembering that bondage was real and that Israel could not break it alone.",
    ],
    "Whatsoever Openeth The Womb": [
      "Openeth The Womb means the first child or animal born from its mother.",
      "God is talking about firstborn life: the first son in a family and the first offspring from the animals.",
      "Because the LORD spared Israel's firstborn at Passover, the firstborn now carries a living reminder of His mercy.",
    ],
    "No Leavened Bread Be Eaten": [
      "Leavened bread is bread made with leaven, something like yeast that makes dough rise.",
      "Israel must eat bread without leaven because they left Egypt in haste, before ordinary bread could rise.",
      "Not eating leavened bread turns the rushed rescue into something the people can taste and remember.",
    ],
    "The Month Abib": [
      "Abib is the name of the month or season when Israel left Egypt.",
      "It was connected with spring and new grain, so the rescue is tied to a real time of year.",
      "God puts the Exodus on Israel's calendar so the people will remember when He brought them out.",
    ],
    "Unleavened Bread Shall Be Eaten Seven Days": [
      "Unleavened bread is flat bread made without leaven, so the dough does not rise.",
      "Israel eats it for seven days to remember the hurry of leaving Egypt after Passover.",
      "The full week makes the rescue more than a one-night memory; it becomes a practiced remembrance.",
    ],
    "There Shall No Leavened Bread Be Seen": [
      "Leavened bread is bread with leaven in it, the ingredient that makes dough rise.",
      "For this feast, Israel is not even to keep that bread visible in their homes.",
      "Removing it helps the whole household remember the rushed night when God brought them out of Egypt.",
    ],
    "The LORD's Law May Be In Thy Mouth": [
      "The LORD's Law May Be In Thy Mouth means God's instruction should be spoken, remembered, and taught.",
      "The Exodus is meant to shape Israel's words, not only their calendar.",
      "A rescued people keep God's law near by telling the rescue story clearly.",
    ],
    "This Is Done Because Of That Which The LORD Did": [
      "This Is Done points to the feast and the way Israel keeps it.",
      "The practice has a reason: the LORD brought Israel out of Egypt.",
      "The phrase teaches children that worship actions are meant to be explained, not performed without meaning.",
    ],
    "For A Sign Unto Thee Upon Thine Hand": [
      "A sign upon the hand means the Exodus should shape what Israel does.",
      "The hand points to action, work, and daily life.",
      "God's rescue is not only something to remember once a year; it should mark how His people live.",
    ],
    "For A Memorial Between Thine Eyes": [
      "A memorial between the eyes means the Exodus should stay in Israel's attention and memory.",
      "The image points to what the people keep in front of their minds.",
      "God wants His rescue to shape how Israel sees the world.",
    ],
    "When Thy Son Asketh Thee": [
      "Children are expected to ask why Israel lives this way.",
      "God builds questions into the practice so parents can answer with the story of rescue.",
      "The child's question becomes a doorway for teaching the LORD's strong hand.",
    ],
    "For Frontlets Between Thine Eyes": [
      "Frontlets were reminders worn near the forehead, close to the eyes.",
      "The image means God's rescue should stay in front of Israel's attention and shape how they think.",
      "The Exodus is not meant to sit in the past; it should guide ordinary life.",
    ],
    "By Strength Of Hand The LORD Brought Us Out": [
      "Israel's freedom came from God's power.",
      "Pharaoh did not release them because he became merciful, and Israel did not free itself.",
      "The LORD's strong hand broke the grip that held His people in Egypt.",
    ],
    "Harnessed Out Of The Land Of Egypt": [
      "Harnessed means Israel left in an ordered, arranged way instead of as a confused crowd.",
      "The people had been slaves, but now they are moving as the LORD's rescued people.",
      "The word helps show that God is forming them into a people who can follow Him.",
    ],
    "God Led Them Not Through The Way Of The Land Of The Philistines": [
      "God did not take Israel by the shortest road through Philistine territory.",
      "That route could have brought them quickly into war before they were ready.",
      "The phrase teaches that God's guidance may look longer because He is protecting weak people.",
    ],
    "Lest Peradventure The People Repent": [
      "Lest peradventure means in case, and repent here means turn back.",
      "God knows Israel might turn back toward Egypt if war frightens them too soon.",
      "The phrase explains why the longer road is mercy, not confusion.",
    ],
    "God Led The People About": [
      "God led them about means He took them by a roundabout route.",
      "The path is indirect, but it is not accidental.",
      "The LORD is guiding newly freed people in a way they can survive and learn.",
    ],
    "Moses Took The Bones Of Joseph": [
      "Joseph's bones are his remains, carried because Joseph believed God would bring Israel out of Egypt.",
      "Moses honors Joseph's old request from Genesis.",
      "The phrase shows that the Exodus fulfills promises made long before Moses' generation.",
    ],
    "A Pillar Of Cloud By Day": [
      "A pillar of cloud was a visible column-like cloud that guided Israel during the day.",
      "The people did not have to guess the road through the wilderness.",
      "God gave them visible guidance because freedom still required following Him.",
    ],
    "A Pillar Of Fire By Night": [
      "A pillar of fire was a visible fiery sign of God's presence at night.",
      "It gave light and guidance when the wilderness would have been dark and frightening.",
      "The phrase shows that the LORD leads His people in darkness as well as daylight.",
    ],
    "He Took Not Away The Pillar": [
      "He took not away means God did not remove the pillar from Israel.",
      "The visible cloud and fire stayed with the people on the journey.",
      "The phrase teaches steady guidance: the LORD does not abandon His rescued people after bringing them out.",
    ],
    "Speak Unto The Children Of Israel": [
      "God tells Moses to speak to the whole people of Israel.",
      "Their next movement is not Moses guessing or panicking.",
      "The phrase shows that Israel's strange route comes from the LORD's command.",
    ],
    "That They Turn And Encamp": [
      "Turn and encamp means Israel must change direction and camp where God tells them.",
      "The move will make them look trapped, but it is part of God's plan.",
      "The phrase teaches that God's instructions can look strange before His rescue is visible.",
    ],
    "They Are Entangled In The Land": [
      "Entangled means trapped or boxed in.",
      "Pharaoh thinks Israel is stuck between land, wilderness, and sea.",
      "The phrase shows how Egypt misreads God's setup as Israel's weakness.",
    ],
    "Beside Pihahiroth Before Baalzephon": [
      "Beside Pihahiroth Before Baalzephon gives the location where Egypt catches up to Israel.",
      "The place names make the scene feel fixed and concrete: Israel is camped where escape appears impossible.",
      "That trapped-looking location becomes the stage for the LORD's rescue.",
    ],
    "They Were Sore Afraid": [
      "Sore afraid means extremely afraid.",
      "Israel sees Pharaoh's army behind them and the sea in front of them.",
      "The phrase names real panic before the LORD shows His salvation.",
    ],
    "Wherefore Hast Thou Dealt Thus With Us": [
      "Wherefore means why.",
      "The people are asking Moses why he has treated them this way by bringing them out of Egypt.",
      "The phrase shows fear turning rescue into accusation before they understand God's plan.",
    ],
    "Wherefore Criest Thou Unto Me": [
      "Wherefore criest thou means why are you crying out to Me?",
      "God is not rejecting prayer; He is telling Moses that the time has come to obey and move forward.",
      "The phrase marks the moment when prayer must become action under God's command.",
    ],
    "Lift Thou Up Thy Rod": [
      "Rod means Moses' staff, the same visible sign used in earlier signs and plagues.",
      "Moses must lift it because God is about to divide the sea.",
      "The power is not in the stick; the staff marks obedience to the LORD's command.",
    ],
    "Divide It": [
      "Divide it means split the sea open.",
      "The water blocking Israel's escape will become two sides of a path.",
      "The phrase teaches that only the Creator can turn the sea into a road.",
    ],
    "The Children Of Israel Shall Go On Dry Ground": [
      "Dry ground means Israel will cross without sinking into mud or drowning.",
      "God does not merely make the water shallow.",
      "The phrase shows a complete miracle: a safe road through the sea.",
    ],
    "The Angel Of God Removed": [
      "Removed means moved from one place to another.",
      "God's angel-presence moves from the front of Israel to behind them.",
      "The phrase shows guidance becoming protection between Israel and Egypt.",
    ],
    "The Pillar Of The Cloud Went From Before Their Face": [
      "Before their face means in front of them.",
      "The cloud that had led Israel moves from the front to the rear.",
      "The phrase shows God guarding the vulnerable side where Egypt is approaching.",
    ],
    "It Was A Cloud And Darkness To Them, But It Gave Light By Night": [
      "The same cloud gives darkness to Egypt and light to Israel.",
      "Them refers to the Egyptians, while Israel receives light for the way.",
      "The phrase shows God's presence protecting His people while blocking their enemies.",
    ],
    "By A Strong East Wind": [
      "A strong east wind is the means God uses to drive the sea back.",
      "The wind is not random weather; it serves the LORD's command.",
      "The phrase shows creation obeying God in Israel's rescue.",
    ],
    "The Waters Were Divided": [
      "The waters were divided means the sea split apart.",
      "Israel sees water opened into a path where no human power could make one.",
      "The phrase describes the central miracle of the Red Sea crossing.",
    ],
    "Upon The Dry Ground": [
      "Dry ground means the sea floor became safe enough to walk on.",
      "Israel is not stumbling through swamp or mud.",
      "The phrase stresses how complete God's rescue road was.",
    ],
    "In The Morning Watch": [
      "The morning watch was a late-night or early-morning period when guards kept watch.",
      "God troubles Egypt's army before the full morning arrives.",
      "The phrase gives the timing of judgment inside the tense night crossing.",
    ],
    "The LORD Looked Unto The Host Of The Egyptians": [
      "Host means army.",
      "The LORD turns His attention toward Egypt's fighting force in the sea path.",
      "The phrase shows that Egypt's organized power is now under God's judgment.",
    ],
    "Troubled The Host Of The Egyptians": [
      "Troubled means God threw Egypt's army into confusion and distress.",
      "The chariot force that looked controlled begins to break down.",
      "The phrase shows the LORD fighting without Israel needing to swing a sword.",
    ],
    "Took Off Their Chariot Wheels": [
      "Chariot wheels were part of Egypt's strongest military vehicles.",
      "God makes those vehicles fail inside the sea path.",
      "The phrase shows Egypt's trusted weapon becoming useless under God's judgment.",
    ],
    "Let Us Flee From The Face Of Israel": [
      "Let us flee means the Egyptians now want to run away.",
      "The pursuers realize the LORD is fighting for Israel.",
      "The phrase reverses the scene: Egypt chased Israel, but now Egypt tries to escape.",
    ],
    "The Sea Returned To His Strength": [
      "The sea returned to his strength means the waters came back with full force.",
      "The road stayed open only as long as God held it open.",
      "The phrase shows the same sea becoming rescue for Israel and judgment for Egypt.",
    ],
    "The LORD Overthrew The Egyptians": [
      "Overthrew means the LORD brought Egypt's army down in defeat.",
      "Israel does not win by weapons or military skill.",
      "The phrase gives the final victory at the sea to God Himself.",
    ],
    "The LORD Saved Israel That Day": [
      "The Red Sea miracle has a plain result: Israel is saved by the LORD.",
      "Israel is alive because God delivered them from Pharaoh's army.",
      "The day ends with the oppressor defeated and the rescued people standing free.",
    ],
    "The Waters Were A Wall Unto Them": [
      "The water stood like protective walls while Israel crossed.",
      "The sea was not merely shallow or briefly passable.",
      "God held back the waters on both sides so His people could walk through safely.",
    ],
    "Israel Saw The Egyptians Dead Upon The Sea Shore": [
      "Israel sees that Pharaoh's army can no longer threaten them.",
      "The bodies on the shore make the end of Egypt's pursuit visible and final.",
      "The people who feared being dragged back now see that the LORD has broken Egypt's power.",
    ],
    "Israel Saw That Great Work": [
      "Israel Saw That Great Work means the rescue was visible to the people who had been afraid.",
      "They watched the LORD open the sea, overthrow Egypt, and finish the deliverance.",
      "The sight turned fear into reverence because God's power was no longer only promised.",
    ],
    "Believed The LORD, And His Servant Moses": [
      "Believed The LORD, And His Servant Moses means the sea rescue deepened Israel's trust.",
      "They saw that the LORD's word was true and that Moses really was His appointed servant.",
      "Faith grew because God's saving work confirmed His message.",
    ],
    "He Is My God": [
      "The victory song becomes personal here.",
      "Israel is not only saying that the LORD is powerful in general.",
      "They are confessing that the God who defeated Egypt is their own covenant God.",
    ],
    "The LORD Is A Man Of War": [
      "The LORD is pictured as the warrior who fights for His people.",
      "This image does not make God cruel; it celebrates His power against the oppressor.",
      "At the sea, God defeats the army that came to drag Israel back into slavery.",
    ],
    "Thy Right Hand, O LORD": [
      "God's right hand is a picture of His active power.",
      "In Bible language, the right hand often represents strength, action, and victory.",
      "The song says Egypt fell because the LORD's power shattered the enemy.",
    ],
    "Thou Hast Overthrown Them": [
      "Thou Hast Overthrown Them means the LORD has thrown down Egypt's forces.",
      "The army that looked dominant at the shore is now defeated in the sea.",
      "The phrase gives the victory to God from beginning to end.",
    ],
    "Thou Sentest Forth Thy Wrath": [
      "Thou Sentest Forth Thy Wrath means God's holy judgment went out against Egypt's rebellion.",
      "Wrath here is not uncontrolled anger.",
      "It is the LORD's righteous answer to Pharaoh's violence, pride, and pursuit.",
    ],
    "The Enemy Said, I Will Pursue": [
      "The song quotes Egypt's arrogant plan.",
      "The enemy expects to chase, overtake, divide spoil, and satisfy revenge.",
      "The song remembers that boast so the LORD's victory over it feels unmistakable.",
    ],
    "With The Blast Of Thy Nostrils": [
      "Blast of thy nostrils is poetic language for God's powerful breath.",
      "The song pictures the waters moving as easily as if God breathed on them.",
      "The phrase is not about human anatomy; it is worship language for the LORD's effortless power.",
    ],
    "The Floods Stood Upright": [
      "Floods here means the gathered waters of the sea.",
      "Stood upright means the water stood like walls instead of flowing normally.",
      "The phrase helps a new reader picture the impossible shape of the Red Sea miracle.",
    ],
    "Thou Didst Blow With Thy Wind": [
      "The wind in the song belongs to the LORD's action.",
      "God uses wind in the sea rescue and judgment.",
      "The phrase teaches that nature itself serves the God who delivers Israel.",
    ],
    "They Sank As Lead": [
      "Lead is a heavy metal, so sinking as lead means going down heavily and helplessly.",
      "Egypt's army does not merely slow down; it is swallowed in the sea.",
      "The phrase makes Pharaoh's defeat feel final.",
    ],
    "Glorious In Holiness": [
      "Glorious In Holiness means the LORD's beauty and majesty are tied to His perfect holiness.",
      "He is not merely stronger than Egypt; He is morally set apart from every false god and empire.",
      "Israel praises the God whose power is holy power.",
    ],
    "Doing Wonders": [
      "Doing Wonders praises the LORD for acts only God can do.",
      "The plagues and the sea crossing are not ordinary events with religious language added.",
      "They are wonders that reveal the LORD's unmatched rule over creation and nations.",
    ],
    "The People Shall Hear, And Be Afraid": [
      "The song looks beyond Egypt to the nations ahead.",
      "When other peoples hear what the LORD did at the sea, they will tremble.",
      "Israel's rescue becomes news that prepares the way toward the promised land.",
    ],
    "Till Thy People Pass Over": [
      "The song asks God to bring His redeemed people safely through the journey ahead.",
      "The sea crossing is not the last passage Israel will need.",
      "The song trusts the LORD to keep protecting them until they reach His goal.",
    ],
    "Thou Hast Purchased": [
      "Thou Hast Purchased means the LORD has made Israel His own through redemption.",
      "Purchased language says the people belong to God because He rescued them at great cost.",
      "They are not Pharaoh's property anymore; they are the LORD's redeemed people.",
    ],
    "Thou Shalt Bring Them In": [
      "The song looks forward with confidence after the sea victory.",
      "The LORD did not rescue Israel so they could wander without a future.",
      "The song trusts Him to bring His people into the place He promised.",
    ],
    "Plant Them In The Mountain Of Thine Inheritance": [
      "Plant means God will settle His people securely, like something rooted in place.",
      "Planting means more than arriving; it means being rooted and established.",
      "The rescued people are meant to live securely in the inheritance the LORD gives.",
    ],
    "Timbrels And With Dances": [
      "Timbrels were hand drums or tambourine-like instruments used in celebration.",
      "Miriam and the women use music and movement to praise the LORD after the sea rescue.",
      "The phrase shows public joy: the victory is sung, played, and remembered by the community.",
    ],
    "They Could Not Drink Of The Waters Of Marah": [
      "Marah means bitter, and the water there was too bitter to drink.",
      "Israel finds water after three days, but the water cannot help them unless God heals it.",
      "The phrase explains why the people are distressed and why the LORD's provision matters.",
    ],
    "The People Murmured Against Moses": [
      "Murmured means grumbled or complained in a resentful way.",
      "The people are thirsty, but instead of trusting the LORD, they turn their fear against Moses.",
      "The phrase shows how quickly real need can become unbelieving complaint.",
    ],
    "The LORD Shall Reign For Ever And Ever": [
      "God's kingship does not end with one rescue.",
      "Pharaoh's rule collapses, but the LORD's reign continues forever.",
      "The song ends by placing Israel's future under God's everlasting rule.",
    ],
    "When We Sat By The Flesh Pots": [
      "Flesh pots were cooking pots with meat in them.",
      "Hungry Israel remembers Egypt as if it were mainly a place of full meals.",
      "The phrase exposes selective memory: they remember food but forget slavery.",
    ],
    "A Certain Rate Every Day": [
      "A certain rate means a fixed amount or measured portion for each day.",
      "God will give manna in daily amounts, not unlimited piles for anxious storing.",
      "The phrase teaches Israel to receive enough for today and trust the LORD for tomorrow.",
    ],
    "An Omer For Every Man": [
      "An omer was a measured amount of food.",
      "Each person was to gather that amount of manna, so every household received enough.",
      "The phrase teaches measured provision: no panic, no competition, and no one left lacking.",
    ],
    "To Morrow Is The Rest Of The Holy Sabbath": [
      "To morrow means tomorrow, and Sabbath means a set-apart day of rest.",
      "God gives extra manna before the Sabbath so Israel can stop gathering on the seventh day.",
      "The phrase teaches former slaves that rest is holy because the LORD provides.",
    ],
    "It Did Not Stink": [
      "The Sabbath manna did not rot or smell bad overnight.",
      "Earlier, manna kept against God's command spoiled, but this portion stays good because God commanded the Sabbath rest.",
      "The phrase shows that keeping manna can be distrust in one setting and obedience in another.",
    ],
    "Moses Was Wroth With Them": [
      "Wroth means very angry.",
      "Moses is angry because some Israelites ignored the command and kept manna overnight.",
      "The phrase shows that God's generous provision still had to be received God's way.",
    ],
    "When The Sun Waxed Hot, It Melted": [
      "Waxed hot means became hot.",
      "The manna melted as the sun grew warm, so the people had to gather it in the morning.",
      "The phrase teaches Israel a daily rhythm of receiving God's provision on His terms.",
    ],
    "Like Coriander Seed": [
      "Coriander seed is a small seed, so the comparison helps describe manna's appearance.",
      "The Bible gives this detail so readers can picture the food Israel saw on the ground.",
      "The phrase makes the miracle feel concrete instead of vague.",
    ],
    "Wafers Made With Honey": [
      "Wafers were thin cakes, and honey points to sweetness.",
      "The phrase describes the taste of manna, not only the fact that it existed.",
      "God's provision was enough to sustain Israel, and it was remembered as pleasant food.",
    ],
    "Laid It Up Before The Testimony": [
      "Laid it up means stored it away, and the testimony refers to the covenant witness kept before the LORD.",
      "A portion of manna is preserved so later generations can see what God fed Israel in the wilderness.",
      "The phrase turns daily bread into lasting evidence of God's care.",
    ],
    "This Is The Bread Which The LORD Hath Given You": [
      "Moses identifies the strange morning food as the LORD's gift.",
      "The people asked what it was, and Moses answers by pointing them to the Provider.",
      "The bread is not luck, wilderness discovery, or human achievement; it is God's provision for hungry Israel.",
    ],
    "Thou Shalt Shew Thy Son": [
      "Shew means show or explain.",
      "Parents must tell their children why Israel eats this bread and keeps this feast.",
      "The phrase teaches that children should understand the rescue, not merely watch a ritual happen.",
    ],
    "When The LORD Shall Bring Thee": [
      "When the LORD shall bring thee means when God brings Israel into the promised land.",
      "The command is meant to continue after the crisis of Egypt is over.",
      "The phrase teaches that comfort in the land must not erase the memory of rescue.",
    ],
    "Thou Shalt Set Apart Unto The LORD": [
      "Set apart means mark something as belonging specially to the LORD.",
      "Israel must treat the firstborn as claimed by God because He spared the firstborn at Passover.",
      "The phrase connects rescued life with belonging to the Rescuer.",
    ],
    "I Will Harden Pharaoh's Heart": [
      "Harden Pharaoh's heart means Pharaoh will remain stubborn and resistant.",
      "God will use Pharaoh's rebellion to display His power at the sea.",
      "The phrase prepares the reader for one final confrontation with Egypt.",
    ],
    "I Will Be Honoured Upon Pharaoh": [
      "Be honoured upon Pharaoh means the LORD will receive glory through Pharaoh's defeat.",
      "Pharaoh wants control, but the sea will show that the LORD is greater than Egypt's king.",
      "The phrase explains why God allows the pursuit to continue for one more scene.",
    ],
    "The Egyptians May Know That I Am The LORD": [
      "Know that I am the LORD means Egypt will recognize the LORD's power and identity.",
      "The sea judgment is not random destruction; it reveals who truly rules.",
      "The phrase shows that God's rescue also becomes a witness to Egypt.",
    ],
    "He Made Ready His Chariot": [
      "Made ready his chariot means Pharaoh prepares his war vehicle for pursuit.",
      "A chariot was a fast military vehicle, a symbol of Egypt's strength.",
      "The phrase shows Pharaoh responding to Israel's freedom by reaching for force.",
    ],
    "Six Hundred Chosen Chariots": [
      "Chosen chariots means selected, elite war vehicles.",
      "Pharaoh is not sending a weak or random group after Israel.",
      "The phrase makes the danger clear: former slaves are being chased by Egypt's best military power.",
    ],
    "All The Chariots Of Egypt": [
      "All the chariots of Egypt means Pharaoh brings the full weight of Egypt's military force.",
      "The pursuit is massive, organized, and terrifying.",
      "The phrase sets up the rescue so no one can mistake it for Israel's own strength.",
    ],
    "Captains Over Every One Of Them": [
      "Captains means commanders.",
      "Each chariot group has leadership, so Egypt's pursuit is organized and disciplined.",
      "The phrase shows that Israel faces a real army, not a confused crowd.",
    ],
    "The LORD Hardened The Heart Of Pharaoh": [
      "Pharaoh's hardened heart means he remains locked in rebellion against the LORD.",
      "Even after letting Israel go, he chases them to regain control.",
      "The phrase shows God handing Pharaoh's stubbornness over to judgment at the sea.",
    ],
    "The Children Of Israel Went Out With An High Hand": [
      "With an high hand means Israel left boldly and openly.",
      "They were not sneaking away like criminals.",
      "The phrase shows the people leaving Egypt under God's public victory.",
    ],
    "The Egyptians Pursued After Them": [
      "Pursued means chased.",
      "Egypt's army goes after Israel to drag them back under Pharaoh's power.",
      "The phrase shows the old bondage reaching after the people God has freed.",
    ],
    "Moses Stretched Out His Hand Over The Sea": [
      "Moses stretches his hand over the sea in obedience to God's command.",
      "His hand does not contain the power by itself.",
      "The phrase shows the visible act that goes with the LORD opening the water.",
    ],
    "The LORD Caused The Sea To Go Back": [
      "Caused means the LORD is the One making the sea move.",
      "Moses stretches out his hand, but God moves the water.",
      "The phrase keeps the miracle credited to the LORD, not to Moses.",
    ],
    "Made The Sea Dry Land": [
      "Dry land means ground safe enough for Israel to walk on.",
      "The sea does not merely become shallow or muddy.",
      "The phrase shows that God makes a complete path through the water.",
    ],
    "The Egyptians Pursued": [
      "Pursued means chased.",
      "Egypt follows Israel into the path God opened through the sea.",
      "The phrase shows pride rushing into the place that will become judgment.",
    ],
    "The Children Of Israel Walked Upon Dry Land": [
      "Dry land means the people walked safely where water had been.",
      "God gave Israel a real path, not a muddy scramble.",
      "The phrase helps a new reader see the completeness of the Red Sea rescue.",
    ],
    "The Horse And His Rider Hath He Thrown Into The Sea": [
      "Horse and rider represent Egypt's pursuing military power.",
      "The LORD throws that power into the sea and ends the threat.",
      "The phrase celebrates God defeating what Israel could never defeat alone.",
    ],
    "In The Greatness Of Thine Excellency": [
      "Excellency means lifted-up greatness, majesty, and honor.",
      "The song says Egypt falls because the LORD's greatness is above every earthly power.",
      "The phrase teaches Israel to praise God's majesty, not merely the escape itself.",
    ],
    "Who Is Like Unto Thee, O LORD": [
      "Who is like unto thee is a worship question expecting the answer: no one.",
      "Israel has seen Pharaoh's power collapse and the sea obey the LORD.",
      "The phrase teaches that the LORD has no rival.",
    ],
    "Fearful In Praises": [
      "Fearful here means awesome or worthy of reverent awe.",
      "Israel's praise is joyful, but it is not casual because God has saved and judged.",
      "The phrase teaches worship with both gladness and holy fear.",
    ],
    "Thou In Thy Mercy Hast Led Forth": [
      "Mercy means faithful compassion toward the people God rescued.",
      "The LORD did not only defeat Egypt; He is leading Israel onward with covenant love.",
      "The phrase shows that rescue continues as guidance.",
    ],
    "The LORD Brought Again The Waters": [
      "Brought again means brought back.",
      "The LORD returned the waters over Pharaoh's army after Israel crossed safely.",
      "The phrase shows that God controls both the opening and closing of the sea.",
    ],
    "Three Days In The Wilderness": [
      "Three days in the wilderness means Israel travels three days through desert land after the sea.",
      "The celebration of victory quickly meets the pressure of thirst.",
      "The phrase shows that freedom still requires daily dependence on the LORD.",
    ],
    "Found No Water": [
      "Found no water means Israel could not find drinkable water for the people.",
      "This is a real survival problem in the wilderness.",
      "The phrase explains why trust is tested so quickly after the Red Sea rescue.",
    ],
    "The LORD Shewed Him A Tree": [
      "Shewed means showed.",
      "The LORD points Moses to a tree that becomes part of healing the bitter water.",
      "The phrase shows that the solution comes from God, not Moses' cleverness.",
    ],
    "There He Made For Them A Statute And An Ordinance": [
      "A statute and an ordinance are commands or instructions for God's people.",
      "Marah becomes more than a water miracle; it becomes a place of teaching.",
      "The phrase shows God training rescued people to listen and obey.",
    ],
    "Twelve Wells Of Water": [
      "Twelve wells means an abundant water supply at Elim.",
      "After bitter water at Marah, God brings Israel to real refreshment.",
      "The phrase shows that the wilderness story does not end with lack.",
    ],
    "On The Sixth Day": [
      "The sixth day is the day before the Sabbath rest.",
      "God gives extra provision before the day when Israel must stop gathering.",
      "The phrase prepares the people to trust the LORD's rhythm of work and rest.",
    ],
    "They Gathered It Every Morning": [
      "Every morning describes the daily rhythm of manna.",
      "Israel could not stockpile the ordinary daily portion for tomorrow.",
      "The phrase teaches dependence one day at a time.",
    ],
    "Bake That Which Ye Will Bake": [
      "Bake means cook the manna into bread for eating.",
      "Israel is told to prepare the double portion before the Sabbath.",
      "The phrase shows that rest includes wise preparation under God's command.",
    ],
    "Six Days Ye Shall Gather It": [
      "Six days names the regular work pattern for collecting manna.",
      "God gives bread during those days, then stops the gathering on the seventh.",
      "The phrase teaches Israel a rhythm of work and rest.",
    ],
    "See, For That The LORD Hath Given You The Sabbath": [
      "Given you the Sabbath means rest is a gift from the LORD.",
      "God is not merely taking work away; He is giving former slaves a holy rhythm of rest.",
      "The phrase teaches Israel to see Sabbath as mercy, not loss.",
    ],
    "That They May See The Bread": [
      "That they may see means future generations should be able to look at the preserved manna.",
      "The bread becomes visible evidence of how God fed Israel in the wilderness.",
      "The phrase teaches memory through something concrete, not only through words.",
    ],
    "Until They Came Unto The Borders Of Canaan": [
      "Borders of Canaan means the edge of the promised land.",
      "The manna continued until Israel reached the land God had promised.",
      "The phrase shows that the LORD fed His people all the way to the next stage of the promise.",
    ],
    "He Hath Triumphed Gloriously": [
      "Triumphed gloriously means the LORD won a complete and majestic victory.",
      "Israel is praising God because Egypt's army was defeated at the sea.",
      "The victory belongs to the LORD, not to Israel's weapons or courage.",
    ],
    "The Sanctuary, O Lord": [
      "Sanctuary means a holy dwelling place for worship.",
      "The song looks forward to God bringing His people to a place where He will dwell with them.",
      "Exodus is not only escape from Egypt; it is movement toward life with God.",
    ],
    "Thy Hands Have Established": [
      "Established means firmly set up or made secure.",
      "The song says God's own hands will secure the place He prepares for His people.",
      "Israel can trust the LORD to finish what He started.",
    ],
    "The Whole Congregation Murmured": [
      "Whole congregation means the complaint spread through the whole community.",
      "Murmured means grumbled or complained resentfully.",
      "Hunger becomes a shared crisis of trust, not just one person's bad mood.",
    ],
    "Would To God We Had Died By The Hand Of The LORD": [
      "Would to God means they wish something had happened.",
      "The people are saying it would have been better to die in Egypt than face hunger in the wilderness.",
      "Fear is twisting their memory of rescue into despair.",
    ],
    "I Will Rain Bread From Heaven": [
      "Rain bread from heaven means God will send food down from above.",
      "Israel cannot grow grain or bake normal bread in the wilderness, so the food must come from the LORD.",
      "This introduces manna as God's daily provision for hungry people.",
    ],
    "At Even, Then Ye Shall Know": [
      "At even means in the evening.",
      "God will begin answering their hunger with evening provision so they know He has heard.",
      "A specific time of day becomes part of learning that the LORD is present.",
    ],
    "In The Morning, Then Ye Shall See The Glory Of The LORD": [
      "In the morning points to when the manna will appear.",
      "The glory of the LORD means His presence and power will be made visible through provision.",
      "Breakfast in the wilderness will reveal the Provider.",
    ],
    "Your Murmurings Are Not Against Us, But Against The LORD": [
      "Murmurings are complaints or grumbling words.",
      "Moses says the complaint is deeper than anger at human leaders.",
      "Distrustful complaining is really aimed at the LORD who led them.",
    ],
    "As Aaron Spake": [
      "As Aaron spake means while Aaron was speaking.",
      "The people hear the message, and then God's glory appears in the cloud.",
      "Aaron's words are immediately joined to the LORD's visible answer.",
    ],
    "They Looked Toward The Wilderness": [
      "The people turn their eyes toward the empty wilderness.",
      "That place looks like lack, but it becomes the place where God's glory appears.",
      "God reveals Himself where Israel expects only need.",
    ],
    "The Glory Of The LORD Appeared In The Cloud": [
      "The glory of the LORD means God's visible majesty and presence.",
      "The cloud is not ordinary weather in this scene.",
      "The LORD answers complaint by making His nearness visible.",
    ],
    "I Have Heard The Murmurings": [
      "Murmurings means complaints or grumbling words.",
      "The LORD hears what Israel is saying in hunger and fear.",
      "God knows their need, but He also hears their distrust.",
    ],
    "At Even Ye Shall Eat Flesh": [
      "At even means in the evening, and flesh here means meat.",
      "God promises quail in the evening to answer their hunger.",
      "The wilderness cannot stop the LORD from feeding His people.",
    ],
    "In The Morning Ye Shall Be Filled With Bread": [
      "Filled with bread means they will have enough to satisfy hunger.",
      "God promises morning bread after the evening quail.",
      "This begins the daily pattern of manna provision.",
    ],
    "Ye Shall Know That I Am The LORD Your God": [
      "Know here means recognize by experience, not merely hear information.",
      "The food is meant to teach Israel that the LORD is truly their God in the wilderness.",
      "Provision is also revelation.",
    ],
    "At Even The Quails Came Up": [
      "Quails are small birds that God provides as meat.",
      "They come in the evening, just as the LORD had promised.",
      "God's word becomes food the people can actually eat.",
    ],
    "In The Morning The Dew Lay": [
      "Dew is the moisture that settles on the ground in the morning.",
      "The manna appears with the morning dew around the camp.",
      "This describes where Israel first sees the bread from heaven.",
    ],
    "A Small Round Thing": [
      "A small round thing describes what the manna looked like on the ground.",
      "The food is unfamiliar and humble-looking, not something Israel recognizes at first.",
      "The wording helps a new reader picture the strange bread God provided.",
    ],
    "Let No Man Leave Of It Till The Morning": [
      "Leave of it till the morning means keep some manna overnight.",
      "God tells Israel not to save the daily portion for tomorrow.",
      "Daily bread must be received with daily trust.",
    ],
    "On The Sixth Day They Gathered Twice As Much Bread": [
      "Twice as much means a double portion.",
      "God gives extra manna on the sixth day so Israel can rest on the seventh.",
      "The double portion prepares the people to trust God's Sabbath provision.",
    ],
    "This Is That Which The LORD Hath Said": [
      "Moses is explaining that the double portion matches what the LORD already commanded.",
      "The Sabbath instruction is not Moses inventing a new rule.",
      "Israel must understand the manna through God's word.",
    ],
    "On The Seventh Day, Which Is The Sabbath": [
      "The seventh day is the Sabbath, the set-apart day of rest.",
      "Israel must stop gathering because God has already provided enough.",
      "Former slaves are learning that the LORD builds rest into their week.",
    ],
    "On The Seventh Day": [
      "The seventh day is the Sabbath day of rest.",
      "Israel's week now has a God-given stop built into it.",
      "Trust on this day means resting instead of gathering.",
    ],
    "The House Of Israel Called The Name Thereof Manna": [
      "The house of Israel means the people of Israel, and manna is the name they gave the bread.",
      "The name is connected to their first question, What is it?",
      "The strange food becomes part of Israel's remembered story.",
    ],
  };

  if (exact[title]) return exact[title];

  if (section.reference === "Exodus 16:4-9" && lower.includes("people shall go out")) return ["The People Shall Go Out And Gather means manna will require daily action.", "God provides the bread, but the people must receive it according to His instruction.", "The wilderness meal trains obedience as well as hunger."];
  if (section.reference === "Exodus 16:4-9" && lower.includes("certain rate")) return ["A Certain Rate Every Day means each day has an appointed amount of bread.", "God is not teaching hoarding or panic gathering.", "He is training Israel to trust measured provision from Him."];
  if (section.reference === "Exodus 16:4-9" && lower.includes("prove them")) return ["That I May Prove Them means the manna will test Israel's trust and obedience.", "The issue is not whether God can feed them.", "The test is whether they will walk in His instruction day by day."];
  if (section.reference === "Exodus 16:4-9" && lower.includes("sixth day")) return ["On The Sixth Day introduces the rhythm that will prepare Israel for Sabbath rest.", "God gives extra provision before the day when they must stop gathering.", "The calendar of manna teaches that rest depends on trusting God's word."];
  if (section.reference === "Exodus 16:13-18" && lower.includes("morning the dew")) return ["In The Morning The Dew Lay describes the setting where manna appears.", "The bread from heaven comes with the morning dew across the camp.", "God's provision arrives quietly and daily in the wilderness."];
  if (section.reference === "Exodus 16:13-18" && lower.includes("small round thing")) return ["A Small Round Thing describes what Israel first sees on the ground.", "The manna is unfamiliar, humble-looking, and surprising.", "God's provision does not have to look impressive to sustain His people."];
  if (section.reference === "Exodus 16:13-18" && lower.includes("what is it")) return ["Israel asks this when they first see manna.", "They do not recognize the food God has provided.", "The question becomes part of the name manna and reminds them that God's care can arrive in unfamiliar form."];
  if (section.reference === "Exodus 16:13-18" && lower.includes("much had nothing over")) return ["He That Gathered Much Had Nothing Over means extra gathering did not create excess.", "God's measured provision leveled the community's need.", "No one could turn manna into a private advantage over others."];
  if (section.reference === "Exodus 16:13-18" && lower.includes("little had no lack")) return ["He That Gathered Little Had No Lack means smaller gathering did not leave a person hungry.", "God's provision was enough for each household according to need.", "The manna taught sufficiency rather than competition."];
  if (section.reference === "Exodus 16:19-21" && lower.includes("gathered it every morning")) return ["They Gathered It Every Morning describes the daily rhythm of manna.", "Israel could not stockpile the ordinary daily portion for tomorrow.", "Each morning became a fresh lesson in dependence on the LORD."];
  if (section.reference === "Exodus 16:22-27" && lower.includes("bake")) return ["Bake That Which Ye Will Bake tells Israel to prepare the double portion before Sabbath.", "The people may cook what they need because no manna will be gathered on the seventh day.", "Preparation becomes part of trusting God's rest."];
  if (section.reference === "Exodus 16:22-27" && lower.includes("six days")) return ["Six Days Ye Shall Gather It sets the ordinary work pattern for manna.", "God gives bread across the six days and then stops the gathering on the seventh.", "The rhythm teaches work and rest under the LORD's command."];
  if (section.reference === "Exodus 16:22-27" && lower.includes("there shall be none")) return ["There Shall Be None means manna will not appear on the Sabbath.", "The people must not search for what God said He would not give that day.", "Rest requires believing the double portion was enough."];
  if (section.reference === "Exodus 16:28-30" && lower.includes("people rested")) return ["The People Rested On The Seventh Day means Israel finally follows the Sabbath pattern.", "After generations of slave labor, rest becomes an act of obedience.", "The people stop because God has provided enough."];
  if (section.reference === "Exodus 16:28-30" && lower.includes("seventh day")) return ["On The Seventh Day marks the day God set apart for rest.", "Israel's week is now shaped by the LORD's provision and command.", "The day interrupts anxious labor with trust."];
  if (section.reference === "Exodus 16:31-36" && lower.includes("coriander")) return ["Like Coriander Seed describes manna's appearance by comparing it to a small pale seed.", "The comparison helps us imagine the bread Israel found each morning.", "God's wilderness food is described plainly so the memory can be passed on."];
  if (section.reference === "Exodus 16:31-36" && lower.includes("wafers")) return ["Wafers Made With Honey describes manna's taste.", "The bread from heaven is not only enough; it is remembered as sweet.", "The detail makes God's provision feel tangible rather than abstract."];
  if (section.reference === "Exodus 16:31-36" && lower.includes("laid it up")) return ["Laid It Up Before The Testimony means the kept manna is placed before the covenant witness.", "The preserved omer becomes evidence for future generations.", "Israel is meant to remember that the LORD fed them in the wilderness."];
  if (section.reference === "Exodus 16:31-36" && lower.includes("borders of canaan")) return ["Until They Came Unto The Borders Of Canaan shows how long God's manna care continued.", "The LORD fed Israel through the whole wilderness journey until they reached the land's edge.", "Daily bread became forty years of faithfulness."];

  if (section.chapter === 13 && /(firstborn|firstling|openeth|mine|redeem)/i.test(title)) {
    return ["Firstborn life is being marked as belonging to the LORD.", "Passover mercy is not left as a memory from one night only.", "Israel must remember that the lives God spared are claimed by the God who rescued them."];
  }
  if (section.chapter === 13 && /(bondage|strength of hand|brought|pharaoh)/i.test(title)) {
    return ["Israel's freedom came from the LORD's power, not from Pharaoh's kindness.", "Egypt had been a house of bondage, and the people could not free themselves.", "The wording keeps rescue, slavery, and God's strong hand tied together."];
  }
  if (section.chapter === 13 && /(son|frontlets|sign|mouth|law)/i.test(title)) {
    return ["The Exodus must be taught clearly to the next generation.", "Children are meant to know why Israel remembers, worships, and obeys this way.", "God's rescue is supposed to shape speech, action, memory, and family instruction."];
  }
  if (section.chapter === 13) {
    return ["God is leading newly freed people with patient care.", "The route, the memory of Joseph, and the pillar all show that Israel is not traveling alone.", "Freedom begins with learning to follow the LORD's presence."];
  }
  if (section.chapter === 14 && /(chariot|captain|horse|pursued|pharaoh|egyptian|hardened|heart)/i.test(title)) {
    return ["Egypt is trying to pull Israel back under its power.", "The chariots make the danger real, but they also set the stage for the LORD's victory.", "Pharaoh's pursuit will end where God displays rescue and judgment at the sea."];
  }
  if (section.chapter === 14 && /(sea|waters|dry|wind|rod|divide|forward|ground)/i.test(title)) {
    return ["The blocked sea becomes the road God opens for His people.", "Israel crosses because the LORD rules the water, not because the people find their own escape.", "The impossible place becomes the path of deliverance."];
  }
  if (section.chapter === 14 && /(angel|pillar|cloud|darkness|light)/i.test(title)) {
    return ["God's presence moves to protect Israel from Egypt.", "The same cloud brings light to the rescued people and darkness to their pursuers.", "The LORD guards behind His people while opening the way ahead."];
  }
  if (section.chapter === 14) {
    return ["The sea scene shows the LORD finishing Israel's deliverance from Egypt.", "The people see that Pharaoh's army cannot reclaim them.", "Fear begins to turn into reverence because God's salvation becomes visible."];
  }
  if (section.chapter === 15 && /(sing|song|miriam|timbrel|dance)/i.test(title)) {
    return ["Rescue turns into worship after the sea victory.", "The people answer God's deliverance with song, music, and public praise.", "The victory is remembered by giving the LORD the glory."];
  }
  if (section.chapter === 15 && /(right hand|war|wrath|overthrown|enemy|lead|blast|nostrils|floods|triumphed|rider)/i.test(title)) {
    return ["The song celebrates the LORD's power over Egypt's army.", "Israel does not praise its own strength or battle skill.", "The LORD is the warrior who defeats the oppressor and saves His people."];
  }
  if (section.chapter === 15 && /(holy|wonders|praises|like unto thee|excellency)/i.test(title)) {
    return ["The song moves from what God did to who God is.", "Israel is learning that the LORD is holy, unmatched, and wonderful in power.", "The sea rescue becomes a revelation of God's character."];
  }
  if (section.chapter === 15 && /(mercy|purchased|pass over|bring|plant|inheritance|sanctuary|reign|established)/i.test(title)) {
    return ["The victory song looks beyond escape toward God's future for Israel.", "The LORD has redeemed His people and will keep leading them.", "Rescue has a destination: life with God as King."];
  }
  if (section.chapter === 15) {
    return ["The wilderness begins testing trust almost immediately after the sea.", "The need is real, but the LORD who opened the water can also provide water.", "Israel must learn dependence after deliverance."];
  }
  if (section.chapter === 16 && /(murmur|flesh|bread|kill|died|pots|full|wilderness|congregation)/i.test(title)) {
    return ["Hunger exposes fear inside the rescued community.", "Israel remembers Egypt's food while forgetting Egypt's bondage.", "The LORD will answer their need while training them not to run back to slave-shaped thinking."];
  }
  if (section.chapter === 16 && /(manna|omer|gather|quail|dew|small|what is it|bread|much|little|lack)/i.test(title)) {
    return ["God provides food in a way that trains daily dependence.", "The people receive enough for each household, but not permission to hoard in fear.", "Manna teaches Israel to trust the Provider one morning at a time."];
  }
  if (section.chapter === 16 && /(sabbath|seventh|sixth|rest|commandments|place|stink|worms|morning|sun|bake)/i.test(title)) {
    return ["The manna instructions teach Israel how to trust and rest.", "God provides enough before the Sabbath so the people can stop gathering.", "Former slaves are learning a rhythm shaped by the LORD, not endless labor."];
  }
  return ["This detail adds a concrete piece to Israel's journey after Egypt.", "The surrounding scene shows rescued people learning trust, worship, provision, and obedience.", "The phrase belongs to that movement from deliverance into daily life with the LORD."];
}

function getDay25FallbackSupportLines(section: PersonalExodusPhraseSectionInput) {
  if (section.reference.startsWith("Exodus 13")) {
    return ["Rescue becomes remembered practice", "Firstborn mercy shapes family life", "Children are taught what the LORD did", "Freedom must not be forgotten"];
  }
  if (section.reference.startsWith("Exodus 14")) {
    return ["Israel faces danger at the sea", "The LORD opens the impossible road", "Egypt's pursuit ends in judgment", "The rescued people learn trust"];
  }
  if (section.reference.startsWith("Exodus 15")) {
    return ["Victory becomes worship", "The song names the LORD as Savior", "Egypt's power falls under judgment", "Israel's future rests in God's reign"];
  }
  return ["Daily bread trains trust", "The LORD answers hunger in the wilderness", "Enough is given for each household", "Rest becomes part of freedom"];
}

function removeDay25OpeningPhraseRepeat(title: string, line: string) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return line
    .replace(new RegExp(`^${escapedTitle}\\s+means\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+is\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+names\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+pictures\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+praises\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+states\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+asks\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+looks\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+points\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+declares\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+describes\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+introduces\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+tells\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+sets\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+shows\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+expects\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+says\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+gives\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+belongs\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+makes\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+quotes\\s+`, "i"), "")
    .replace(new RegExp(`^${escapedTitle}\\s+marks\\s+`, "i"), "")
    .replace(/^([a-z])/, (letter) => letter.toUpperCase());
}

function formatDay25PhraseExplanation(section: PersonalExodusPhraseSectionInput, title: string, lines: string[]) {
  const cleaned = removeDay25RepeatedPhraseTitle(title, lines).filter(Boolean);
  const isEmojiLine = (line: string) => /^[^\w\s"']/.test(line.trim());
  const teachingBullets = getDay25TeachingBullets(section, title).filter((line) => !isDay25FillerLine(line));
  const supportLines = teachingBullets.length > 0 ? teachingBullets : getDay25FallbackSupportLines(section);
  const proseLines = cleaned.filter((line) => !isEmojiLine(line) && !isDay25FillerLine(line));

  const opening = (proseLines.length > 0 ? proseLines.slice(0, Math.min(3, proseLines.length)) : getDay25SpecificOpening(section, title))
    .map((line) => removeDay25OpeningPhraseRepeat(title, line));
  const closing = proseLines.slice(opening.length);

  return note([
    ...opening,
    ...supportLines,
    ...closing,
  ].slice(0, 8));
}

function explainDay25Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  return buildDay25RevisedExplanation(section, title);

  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  const exact = DAY_25_EXACT_PHRASE_EXPLANATIONS[title];
  if (exact) return formatDay25PhraseExplanation(section, title, exact);

  if (lower.includes("sanctify") || lower.includes("set apart")) {
    add(`${title} means the firstborn are now marked for the LORD in a special way.`, "God spared Israel's firstborn on Passover night, so rescued life is marked as His.", "This is not random religious paperwork. It teaches Israel that salvation creates belonging.", "ðŸ‘¶ Firstborn", "ðŸ™Œ Set apart", "ðŸ“œ Rescued life is God's gift", "The people who were brought out must now remember who brought them out.");
  } else if (lower.includes("openeth the womb") || lower.includes("firstling") || lower.includes("firstborn")) {
    add(`${title} points to the first life that opens a family or flock.`, "In Israel's world, firstborn language carried inheritance, future, strength, and family hope.", "God claims the first because He rescued the firstborn from death in Egypt.", "ðŸ‘¶ Firstborn child", "ðŸ‘ First animal", "ðŸ©¸ Passover memory", "Every firstborn reminder points back to the night God spared His people.");
  } else if (lower === "it is mine") {
    add(`${title} is God's claim over what He rescued.`, "Israel's firstborn were spared by mercy, not by their own strength.", "So God says plainly that rescued life is claimed by Him.", "ðŸ™Œ Belonging", "ðŸ›¡ï¸ Mercy", "ðŸ“œ God's claim", "Exodus teaches that salvation is not independence from God. It is life given back to God.");
  } else if (lower.includes("remember this day") || lower.includes("shew thy son") || lower.includes("son asketh") || lower.includes("memorial") || lower.includes("mouth")) {
    add(`${title} turns rescue into family memory and teaching.`, "God does not want the Exodus to become a story people forget.", "Parents must explain what the LORD did, and children must grow up hearing why this day matters.", "ðŸ‘¶ Children ask", "ðŸ“– Parents explain", "ðŸ•¯ï¸ Memory becomes worship", "Faith is carried forward when the next generation understands the rescue story.");
  } else if (lower.includes("house of bondage") || lower.includes("brought us out") || lower.includes("brought you out") || lower.includes("land of egypt")) {
    add(`${title} reminds Israel what God rescued them from.`, "Egypt was not just a hard season. It was bondage, forced labor, fear, and Pharaoh's control.", "The LORD brought them out when they could not free themselves.", "ðŸ§± Bondage", "ðŸšª Brought out", "ðŸ™Œ Rescue", "Remembering slavery keeps freedom from becoming pride.");
  } else if (lower.includes("strength of hand")) {
    add(`${title} explains how Israel left Egypt.`, "They did not escape because Pharaoh became kind or Israel became powerful.", "The LORD's strong hand broke the grip of bondage.", "ðŸ’ª Strong hand", "ðŸ‘‘ Pharaoh humbled", "ðŸšª Freedom opened", "The Exodus is God's rescue before it is Israel's journey.");
  } else if (lower.includes("leaven") || lower.includes("unleavened") || lower.includes("abib")) {
    add(`${title} connects Israel's food and calendar to the rescue from Egypt.`, "Unleavened bread reminded the people that they left quickly, before normal bread could rise.", "Abib marks the season when this rescue memory was kept.", "ðŸž Unleavened bread", "ðŸƒ Haste", "ðŸ“… Rescue season", "God put memory into ordinary food so families could taste the story again.");
  } else if (lower.includes("sign") || lower.includes("frontlets") || lower.includes("between thine eyes") || lower.includes("upon thine hand")) {
    add(`${title} means the Exodus memory should shape what Israel does and how Israel thinks.`, "The hand points to action, and the eyes point to attention and thought.", "God's rescue was not supposed to stay hidden in the past.", "âœ‹ Hands", "ðŸ‘€ Eyes", "ðŸ§  Daily remembrance", "The people were to live like rescued people in visible, practical ways.");
  } else if (lower.includes("philistines") || lower.includes("lest peradventure") || lower.includes("god led them not") || lower.includes("god led the people about")) {
    add(`${title} shows God's patient guidance after Egypt.`, "The shortest road was not the wisest road for a people just freed from slavery.", "God knew they were not ready for immediate war and led them another way.", "ðŸ§­ Guidance", "ðŸ›¡ï¸ Protection", "â³ Patient route", "Sometimes God's longer road is mercy, not delay.");
  } else if (lower.includes("harnessed")) {
    add(`${title} means Israel left in an ordered way, ready for the journey ahead.`, "They were no longer a trapped slave people under Pharaoh's quotas.", "They were moving as the LORD's rescued people.", "ðŸš¶ Leaving Egypt", "ðŸ•ï¸ Ordered groups", "ðŸ™Œ New identity", "Freedom begins with God leading them out as a people with purpose.");
  } else if (lower.includes("bones of joseph") || lower.includes("joseph")) {
    add(`${title} ties Exodus directly back to Genesis.`, "Joseph had believed God would visit His people and bring them out of Egypt.", "Moses carrying his bones shows that old promise being honored.", "âš°ï¸ Joseph's bones", "ðŸ“œ Old promise", "ðŸžï¸ Hope for Canaan", "Even Joseph's bones are preaching that God's word came true.");
  } else if (lower.includes("pillar of cloud") || lower.includes("pillar of fire") || lower.includes("took not away the pillar")) {
    add(`${title} shows God's visible guidance for a people learning freedom.`, "The pillar meant Israel was not wandering alone.", "God gave direction by day and protection by night.", "â˜ï¸ Cloud by day", "ðŸ”¥ Fire by night", "ðŸ§­ God leads", "Freedom means learning to follow the presence of the LORD.");
  } else if (lower.includes("turn and encamp") || lower.includes("entangled") || lower.includes("pihahiroth") || lower.includes("baalzephon")) {
    add(`${title} places Israel where escape looks impossible.`, "To Pharaoh, Israel looks trapped by land and sea.", "But the trap is really the stage where God will display His rescue.", "ðŸŒŠ Sea ahead", "ðŸ‘‘ Pharaoh watching", "ðŸ§­ God positioning", "What looks like a dead end can become the place where the LORD acts.");
  } else if (lower.includes("harden pharaoh") || lower.includes("hardened the heart")) {
    add(`${title} shows Pharaoh still locked in rebellion after Israel leaves.`, "He has seen judgment, grief, and release, but his heart still resists God.", "The chase toward the sea exposes one last time that Pharaoh wants control back.", "ðŸ”’ Hard heart", "ðŸ‘‘ Refusing king", "ðŸŒŠ Sea judgment coming", "A hard heart can lose everything and still reach for bondage again.");
  } else if (lower.includes("honoured upon pharaoh") || lower.includes("egyptians may know")) {
    add(`${title} means God will make His identity clear through Pharaoh's defeat.`, "Egypt's king wants glory for himself, but the LORD will be honored over him.", "The sea will show that Pharaoh is not the final power.", "ðŸ‘‘ Pharaoh humbled", "ðŸ™Œ The LORD honored", "ðŸŒ Egypt sees", "God's rescue reveals who truly rules.");
  } else if (lower.includes("chariot") || lower.includes("chariots") || lower.includes("captains") || lower.includes("horse")) {
    add(`${title} shows Egypt bringing its military strength against Israel.`, "Chariots were powerful weapons in the ancient world.", "Israel cannot match Egypt's army, which makes God's rescue at the sea even clearer.", "ðŸŽ Horses", "âš”ï¸ Chariots", "ðŸ˜¨ Real danger", "The threat looks impossible so the LORD's salvation can be seen plainly.");
  } else if (lower.includes("pursued")) {
    add(`${title} shows Egypt trying to pull Israel back into bondage.`, "Pharaoh does not simply regret losing workers. He chases them with force.", "The old master wants the rescued people back under control.", "ðŸƒ Pursuit", "ðŸ‘‘ Pharaoh's army", "ðŸ”’ Bondage reaching back", "God will answer the chase with a rescue Israel could never create.");
  } else if (lower.includes("high hand")) {
    add(`${title} describes Israel leaving openly and boldly.`, "They are not sneaking out like criminals.", "The LORD has brought them out in public victory.", "âœ‹ High hand", "ðŸšª Open departure", "ðŸ™Œ Public rescue", "The people who were crushed by slavery now walk out under God's power.");
  } else if (lower.includes("sore afraid") || lower.includes("cried out") || lower.includes("graves in egypt") || lower.includes("wherefore") || lower.includes("let us alone")) {
    add(`${title} shows fear speaking inside newly freed people.`, "Israel is out of Egypt, but Egypt's army is behind them and the sea is ahead.", "Their panic is real, but fear starts rewriting the rescue story.", "ðŸ˜¨ Fear", "ðŸŒŠ Sea ahead", "ðŸŽ Army behind", "The wilderness will teach Israel to trust the LORD after freedom begins.");
  } else if (lower.includes("fear ye not") || lower.includes("stand still") || lower.includes("salvation") || lower.includes("fight for you")) {
    add(`${title} teaches Israel how to face an impossible moment.`, "They cannot defeat Pharaoh's army or open the sea.", "They must watch the LORD do what only He can do.", "ðŸ˜¨ Fear answered", "ðŸ‘€ Watch God act", "ðŸ›¡ï¸ The LORD fights", "Before Israel learns many commands, they learn that the LORD is the One who saves.");
  } else if (lower.includes("go forward") || lower.includes("lift thou up thy rod") || lower.includes("divide it") || lower.includes("dry ground")) {
    add(`${title} shows God turning a blocked path into a rescue road.`, "The sea looked like the end of the journey.", "God commands Moses forward, and the impossible place becomes the way through.", "ðŸŒŠ Sea", "ðŸš¶ Dry ground", "ðŸ“œ God's command", "Faith moves forward because God makes the road.");
  } else if (lower.includes("angel of god") || lower.includes("pillar of the cloud") || lower.includes("cloud and darkness") || lower.includes("gave light")) {
    add(`${title} shows God's presence standing between Israel and Egypt.`, "The same cloud gives light to Israel and darkness to Egypt.", "God's presence protects His people while confusing their enemies.", "â˜ï¸ Cloud", "ðŸ’¡ Light for Israel", "ðŸŒ‘ Darkness for Egypt", "The LORD is not only ahead of His people; He also guards behind them.");
  } else if (lower.includes("waters were a wall") && section.reference === "Exodus 14:29-31") {
    add(`${title} is repeated after the danger is over so Israel remembers how they crossed safely.`, "The walls of water were not a poetic idea to them.", "They had walked between those waters and survived because God held the path open.", "ðŸŒŠ Water held back", "ðŸš¶ Israel crossed", "ðŸ‘€ Rescue remembered", "The repeated image helps the people understand that the LORD protected every step through the sea.");
  } else if (lower.includes("strong east wind") || lower.includes("waters were divided") || lower.includes("waters were a wall") || lower.includes("sea dry land")) {
    add(`${title} carries the great sea deliverance in a concrete image.`, "The water that looked like death becomes a passage of life.", "God makes dry ground where Israel could never build a road.", "ðŸŒŠ Sea", "ðŸ§± Waters like walls", "ðŸš¶ Dry ground", "The Creator makes a way through what His people cannot cross.");
  } else if (lower.includes("morning watch") || lower.includes("troubled") || lower.includes("chariot wheels") || lower.includes("flee from the face") || lower.includes("overthrew")) {
    add(`${title} shows Egypt's strength collapsing inside God's judgment.`, "The army that looked unstoppable becomes confused, slowed, and trapped.", "Even Egypt's chariot wheels cannot carry them through what God opened for Israel.", "âš”ï¸ Army troubled", "ðŸ›ž Wheels fail", "ðŸŒŠ Sea returns", "The road of rescue for Israel becomes judgment for Pharaoh's army.");
  } else if (lower.includes("lord saved israel") || lower.includes("saw the egyptians dead") || lower.includes("saw that great work") || lower.includes("believed the lord")) {
    add(`${title} marks the visible result of God's rescue at the sea.`, "Israel sees that Pharaoh's army can no longer drag them back.", "The fear of Egypt is replaced by fear of the LORD.", "ðŸ‘€ Israel saw", "ðŸ›¡ï¸ The LORD saved", "ðŸ™Œ Belief grows", "God's work at the sea teaches Israel whom to trust.");
  } else if (lower.includes("sang") || lower.includes("sing") || lower.includes("song") || lower.includes("timbrels") || lower.includes("dances") || lower.includes("miriam")) {
    add(`${title} shows rescue turning into worship.`, "After God saves Israel at the sea, the people sing.", "Praise becomes the first big response to deliverance.", "ðŸŽ¶ Song", "ðŸ¥ Timbrels", "ðŸ™Œ Worship", "The song teaches Israel how to remember the victory: the LORD triumphed.");
  } else if (lower.includes("triumphed gloriously") && section.reference === "Exodus 15:19-21") {
    add(`${title} becomes the chorus Miriam and the women repeat after the sea rescue.`, "The victory is not left as a private memory.", "It is sung back by the community with music and movement.", "ðŸŽ¶ Repeated praise", "ðŸ¥ Timbrels", "ðŸ™Œ Shared worship", "The same rescue truth moves from Moses' song into the people's celebration.");
  } else if (lower.includes("triumphed gloriously") || lower.includes("rider") || lower.includes("right hand") || lower.includes("man of war") || lower.includes("overthrown") || lower.includes("wrath") || lower.includes("enemy said")) {
    add(`${title} celebrates the LORD's victory over Egypt's power.`, "The song does not praise Israel's bravery or strategy.", "It praises the LORD who threw down the horse, rider, army, and pride of Egypt.", "ðŸ‘‘ The LORD wins", "ðŸŽ Egypt defeated", "ðŸŒŠ Sea judgment", "Worship tells the rescue story with God at the center.");
  } else if (lower.includes("strength and song") || lower.includes("he is my god") || lower.includes("who is like") || lower.includes("glorious") || lower.includes("doing wonders")) {
    add(`${title} turns doctrine into worshipful confession.`, "Israel is not only saying God did a powerful act.", "They are confessing who He is: strong, holy, wonderful, and unlike any other.", "ðŸ™Œ Praise", "ðŸ”¥ Holiness", "âœ¨ Wonders", "The sea rescue teaches Israel to know God, not just enjoy escape.");
  } else if (lower.includes("mercy hast led") || lower.includes("people shall hear") || lower.includes("pass over") || lower.includes("purchased")) {
    add(`${title} looks beyond the sea toward the nations and the promised future.`, "The song says other peoples will hear and tremble.", "Israel has been redeemed, and the LORD will keep leading them.", "ðŸ›¡ï¸ Mercy", "ðŸŒ Nations hear", "ðŸ’° Purchased people", "The rescue at the sea is the beginning of a larger journey with God.");
  } else if (lower.includes("bring them in") || lower.includes("plant them") || lower.includes("inheritance") || lower.includes("sanctuary") || lower.includes("reign")) {
    add(`${title} looks forward to God's goal for His rescued people.`, "The Exodus is not only about leaving Egypt.", "God is bringing His people toward a place where He will dwell with them.", "ðŸžï¸ Inheritance", "ðŸŒ± Planted people", "ðŸ‘‘ The LORD reigns", "Rescue has a destination: life with God as King.");
  } else if (lower.includes("three days") || lower.includes("no water") || lower.includes("marah") || lower.includes("murmured") || lower.includes("tree") || lower.includes("healeth") || lower.includes("wells")) {
    add(`${title} shows the wilderness testing Israel's trust quickly after rescue.`, "The need is real: the people are thirsty.", "But the wilderness will teach them to bring need to God instead of letting fear rewrite the story.", "ðŸ’§ Water", "ðŸŒ³ Tree", "ðŸ©º The LORD heals", "The God who opened the sea can also provide in dry places.");
  } else if (lower.includes("wilderness of sin") || lower.includes("fifteenth day") || lower.includes("whole congregation murmured") || lower.includes("flesh pots") || lower.includes("bread to the full") || lower.includes("kill this whole assembly")) {
    add(`${title} shows hunger and fear speaking after the rescue.`, "Israel remembers Egypt's food but forgets Egypt's bondage.", "Need is real, but nostalgia can make slavery look safer than trust.", "ðŸ² Egypt remembered", "ðŸž Hunger", "ðŸ˜Ÿ Fear talking", "God will teach them daily dependence instead of backward-looking panic.");
  } else if (lower.includes("rain bread") || lower.includes("gather") || lower.includes("certain rate") || lower.includes("prove them") || lower.includes("sixth day")) {
    add(`${title} introduces manna as daily training in trust.`, "God gives bread, but He gives it with instructions.", "The people must gather enough for each day and learn that God's provision can be trusted.", "ðŸž Bread from heaven", "ðŸ“ Daily amount", "ðŸ§ª Testing trust", "Provision becomes a classroom where Israel learns obedience.");
  } else if (lower.includes("glory of the lord") || lower.includes("heard the murmurings") || lower.includes("eat flesh") || lower.includes("filled with bread") || lower.includes("lord your god")) {
    add(`${title} shows God answering complaint with mercy and revelation.`, "The LORD hears the murmuring, but He still provides quail and bread.", "The goal is not only full stomachs. The goal is that Israel knows the LORD is their God.", "ðŸ‘‚ God hears", "ðŸ— Flesh at evening", "ðŸž Bread in morning", "Provision reveals the Provider.");
  } else if (lower.includes("quails") || lower.includes("dew") || lower.includes("small round thing") || lower.includes("what is it") || lower.includes("bread which the lord") || lower.includes("omer") || lower.includes("much had nothing over") || lower.includes("little had no lack")) {
    add(`${title} teaches daily dependence on God's measured provision.`, "Manna was strange enough that the people asked what it was.", "Yet God gave enough for each person, with no one lacking when they gathered as commanded.", "ðŸž Manna", "ðŸ“ Omer", "âœ… Enough for each day", "God is reshaping former slaves into people who receive His care one morning at a time.");
  } else if (lower.includes("leave of it") || lower.includes("hearkened not") || lower.includes("worms") || lower.includes("stank") || lower.includes("sun waxed hot") || lower.includes("melted")) {
    add(`${title} shows what happens when Israel tries to control tomorrow without trusting God.`, "Some people keep manna overnight against Moses' command.", "The spoiled manna teaches that God's daily provision must be received God's way.", "ðŸž Manna", "ðŸª± Spoiled food", "â˜€ï¸ Melted away", "Trust means obeying the Provider, not hoarding against His word.");
  } else if (lower.includes("twice as much") || lower.includes("holy sabbath") || lower.includes("bake") || lower.includes("seventh day") || lower.includes("there shall be none") || lower.includes("rested")) {
    add(`${title} teaches rest as part of freedom.`, "Slaves in Egypt were driven by endless quotas, but God gives His people a rhythm of work and rest.", "The double portion trains them to trust God's care even when they stop gathering.", "ðŸ›‘ Rest", "ðŸž Double portion", "ðŸ“… Seventh day", "The Sabbath shows that Israel is the LORD's people, not servants of endless labor.");
  } else if (lower.includes("how long refuse") || lower.includes("commandments")) {
    add(`${title} exposes disobedience after God has clearly provided.`, "Some Israelites still go out looking for manna on the Sabbath.", "The issue is no longer lack of food. It is refusal to trust God's command.", "ðŸš« Refusal", "ðŸ“œ Commandments", "ðŸ›‘ Sabbath lesson", "Freedom with God includes learning to stop when He says stop.");
  } else if (lower.includes("manna") || lower.includes("coriander") || lower.includes("wafers") || lower.includes("honey") || lower.includes("kept") || lower.includes("testimony") || lower.includes("forty years") || lower.includes("borders of canaan")) {
    add(`${title} preserves the memory of God's wilderness provision.`, "Manna was not only food for a hungry morning.", "It became testimony that the LORD fed Israel through the long journey.", "ðŸž Manna", "ðŸº Kept as witness", "ðŸžï¸ Until Canaan", "The bread reminded Israel that God sustained them from Egypt to the promised land.");
  } else {
    add(`${title} explains one part of Israel's journey from rescue into life with God.`, "The wording helps the reader ask what God is showing through memory, guidance, worship, testing, provision, or rest.", "ðŸ“– Scripture wording", "ðŸ” Phrase meaning", "ðŸ§  Trust training", "Every rescued step is training Israel to trust the LORD.");
  }

  return formatDay25PhraseExplanation(section, title, lines);
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

const DAY_26_EXACT_PHRASE_EXPLANATIONS: Record<string, string[]> = {
  "Because Of The Chiding Of The Children Of Israel": ["Because Of The Chiding Of The Children Of Israel explains why the place is named Meribah.", "Chiding means quarreling or arguing.", "The name remembers the people's angry dispute with Moses.", "\u{1F5E3}\u{FE0F} Quarreling", "\u{1F4A7} Thirst", "\u{1F4CD} Place named", "Israel's need was real, but their accusation revealed a deeper struggle to trust the LORD."],
  "After He Had Sent Her Back": ["After He Had Sent Her Back explains why Zipporah is returning with Jethro.", "Moses' family had been away from him for a season.", "The line quietly fills in a family detail after the pressure of Egypt and the Exodus.", "\u{1F469} Zipporah", "\u{1F9D2} Sons", "\u{1F3D5}\u{FE0F} Family reunited", "Moses is a public leader, but he is also a husband and father inside the story."],
  "What Is This Thing That Thou Doest": ["What Is This Thing That Thou Doest is Jethro's honest question to Moses.", "He sees Moses judging cases from morning until evening.", "The question exposes a leadership pattern that is wearing everyone down.", "\u{2753} A wise question", "\u{2696}\u{FE0F} Many cases", "\u{1F613} Heavy burden", "Sometimes wisdom begins when someone close enough asks why the work is being carried that way."],
  "Moses Sanctified The People": ["Moses Sanctified The People means Moses helped the people prepare for the LORD's holy presence.", "Sanctified means set apart or made ready for God.", "The people are not approaching Sinai casually.", "\u{1F9FC} Washed clothes", "\u{26D4} Holy boundaries", "\u{26F0}\u{FE0F} Sinai", "The phrase teaches that God's nearness is a gift, but it must be received with reverence."],
  "Away, Get Thee Down": ["Away, Get Thee Down is the LORD sending Moses back down the mountain.", "Moses must warn the people before they break through the boundary.", "The command sounds urgent because holiness is not something to play with.", "\u{26A0}\u{FE0F} Urgent warning", "\u{26F0}\u{FE0F} Mountain", "\u{1F6A7} Boundary", "Moses goes down because protecting the people is also part of serving God."],
  "Nor Thy Son, Nor Thy Daughter": ["Nor Thy Son, Nor Thy Daughter means the Sabbath command reaches the children too.", "Rest is not only for the head of the household.", "The whole family is included in God's rhythm of work and rest.", "\u{1F9D2} Son", "\u{1F467} Daughter", "\u{1F6D1} Sabbath", "The phrase shows that God's rest is meant to shape the entire home."],
  "Nor Thy Manservant, Nor Thy Maidservant": ["Nor Thy Manservant, Nor Thy Maidservant means servants are included in Sabbath rest.", "Israel must not receive rest from God while denying rest to workers.", "This command pushes against Egypt's slave-labor mindset.", "\u{1F9D1}\u{200D}\u{1F527} Manservant", "\u{1F469}\u{200D}\u{1F527} Maidservant", "\u{1F6D1} Shared rest", "The people rescued from harsh labor must not become harsh masters."],
  "I Will Come Unto Thee": ["I Will Come Unto Thee is God's promise to meet His people where He records His name.", "The altar is not about Israel pulling God down by ritual.", "God Himself promises nearness in the place of obedient worship.", "\u{1FAE1} Nearness", "\u{1FAA8} Altar", "\u{1F64C} Worship", "The phrase makes worship feel personal: the holy LORD comes to bless His people."],
};

function makeDay26PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`ðŸ“Œ ${title}`, explainDay26Phrase(section, title)];
}

function makeDay26PhraseCardShort(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  const cardTitle = ensureExodusElevenToTwentyTitleEmoji(title);
  return [cardTitle, polishDay26PhraseContent(cardTitle, explainDay26Phrase(section, title))];
}

function explainDay26Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  const exact = DAY_26_EXACT_PHRASE_EXPLANATIONS[title];
  if (exact) return note(exact);

  if (lower.includes("after their journeys")) {
    add(`${title} reminds the reader that Israel is moving step by step through the wilderness.`, "They have left Egypt, but they have not yet learned how to live as free people with God.", "Every stop becomes a place where trust is tested.", "ðŸš¶ Journey", "ðŸœï¸ Wilderness", "ðŸ§  Learning trust", "The road after rescue is where God begins training His people.");
  } else if (lower.includes("no water") || lower.includes("chide") || lower.includes("wherefore") || lower.includes("stone me")) {
    add(`${title} means the thirst was real, but the reaction was faithless.`, "The people are thirsty, so the problem is not imaginary.", "But instead of trusting the God who opened the sea, they turn their fear against Moses.", "ðŸ’§ No water", "ðŸ˜¡ Quarreling", "ðŸª¨ Threatening stones", "The wilderness exposes what fear sounds like when trust is weak.");
  } else if (lower.includes("moses cried")) {
    add(`${title} means Moses takes the crisis to the only One who can answer it.`, "The crowd is angry enough that Moses feels in danger.", "His prayer is honest because leadership has become heavy.", "ðŸ™ Moses cries out", "ðŸ˜° Real pressure", "ðŸ™Œ God must answer", "Good leadership learns to carry people's panic to God.");
  } else if (lower.includes("rock in horeb") || lower.includes("smite the rock")) {
    add(`${title} means God chooses an unlikely place to provide life.`, "The people need water, and God gives it from the rock.", "The answer comes by God's command, not by Moses' cleverness.", "ðŸª¨ Rock", "ðŸ’§ Water", "ðŸ“œ God's command", "The LORD can bring life from places that look completely unable to give it.");
  } else if (lower.includes("massah") || lower.includes("meribah")) {
    add(`${title} turns the place name into a memory lesson.`, "Massah is connected with testing, and Meribah is connected with quarreling.", "The name helps Israel remember what unbelief sounded like at Rephidim.", "ðŸ“ Place name", "âš–ï¸ Testing", "ðŸ˜¡ Quarreling", "Bible place names often teach the meaning of what happened there.");
  } else if (lower.includes("tempted the lord") || lower === "saying" || lower.includes("among us")) {
    add(`${title} means Israel's thirst has turned into a question about God's presence.`, "They are not only asking for water.", "They are questioning whether the LORD is really present with them.", "â“ Is God here?", "ðŸ’§ Need", "ðŸ’” Doubt", "The painful irony is that God has been leading them the whole way.");
  } else if (lower.includes("amalek") || lower.includes("joshua") || lower.includes("choose us out")) {
    add(`${title} introduces Israel's first battle after leaving Egypt.`, "The rescued people now face an enemy in the wilderness.", "Joshua appears as a leader while Moses stands with the rod of God.", "âš”ï¸ Battle", "ðŸ§ Joshua", "ðŸœï¸ Wilderness enemy", "Freedom does not mean Israel will never face conflict. It means the LORD is with them in it.");
  } else if (lower.includes("rod of god") || lower.includes("held up his hand") || lower.includes("aaron and hur") || lower.includes("hands were steady")) {
    add(`${title} means the battle is connected to dependence on God, not only swords on the ground.`, "Moses grows tired, so Aaron and Hur help hold up his hands.", "The battle is won through dependence, endurance, and shared support.", "ðŸ™Œ Lifted hands", "ðŸ¤ Aaron and Hur", "âš”ï¸ Battle below", "Even leaders who trust God still need people to help them stand.");
  } else if (lower.includes("discomfited amalek")) {
    add(`${title} means Joshua defeats Amalek in battle.`, "The word sounds old, but it means Amalek was overthrown or beaten back.", "Israel's victory is tied to God's help, not only Joshua's sword.", "âš”ï¸ Joshua fights", "ðŸ™Œ Moses depends on God", "âœ… Amalek defeated", "The scene teaches both action and dependence.");
  } else if (lower.includes("memorial in a book") || lower.includes("rehearse it") || lower.includes("remembrance of amalek")) {
    add(`${title} means this battle was not supposed to disappear from Israel's memory.`, "God tells Moses to write it down and make sure Joshua hears it.", "The fight with Amalek will matter beyond one day.", "ðŸ“– Written memory", "ðŸ‘‚ Joshua hears", "âš”ï¸ Long conflict", "Some moments are recorded because future faithfulness will need them.");
  } else if (lower.includes("altar") || lower.includes("jehovahnissi") || lower.includes("lord hath sworn") || lower.includes("war with amalek")) {
    add(`${title} turns victory into worship and witness.`, "Moses builds an altar and names it Jehovah-nissi, meaning the LORD is my banner.", "The name says Israel's victory flag is not Moses, Joshua, or the army. It is the LORD.", "â›³ Banner", "ðŸ™Œ Worship", "âš”ï¸ Ongoing battle", "After the fight, Moses makes sure the glory goes to God.");
  } else if (lower.includes("jethro") || lower.includes("midian") || lower.includes("father in law")) {
    add(`${title} brings Moses' family connection back into the story.`, "Jethro is Moses' father-in-law from Midian, the place where Moses lived before returning to Egypt.", "His arrival connects the wilderness rescue with Moses' earlier life.", "ðŸ‘´ Jethro", "ðŸœï¸ Midian", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘¦ Family connection", "God's work in Exodus is public, but it also touches real families.");
  } else if (lower.includes("heard of all") || lower.includes("brought israel out") || lower.includes("delivered them")) {
    add(`${title} means the rescue from Egypt has become news outside Israel's camp.`, "Jethro hears what God has done to Pharaoh and for His people.", "Deliverance becomes testimony to someone outside the rescued nation.", "ðŸ‘‚ Heard", "ðŸšª Brought out", "ðŸ™Œ God delivered", "God's rescue is meant to be known, not hidden.");
  } else if (lower.includes("zipporah") || lower.includes("gershom") || lower.includes("eliezer")) {
    add(`${title} names Moses' household and reminds the reader that Moses is not only a public leader.`, "His wife and sons carry pieces of his story: exile, help, and God's rescue from danger.", "These family names keep Moses grounded as a real person.", "ðŸ‘© Zipporah", "ðŸ‘¦ Sons", "ðŸ  Moses' household", "The leader of Israel still has a family story inside God's bigger story.");
  } else if (lower.includes("obeisance") || lower.includes("kissed") || lower.includes("welfare")) {
    add(`${title} means Moses greets Jethro with honor and affection.`, "Moses honors Jethro, greets him warmly, and asks about his peace.", "The scene is tender after the pressure of plagues, escape, thirst, and battle.", "ðŸ™‡ Respect", "ðŸ¤ Greeting", "ðŸ•ï¸ Family reunion", "Exodus includes ordinary human kindness inside the larger rescue story.");
  } else if (lower.includes("greater than all gods") || lower.includes("burnt offering")) {
    add(`${title} is Jethro responding to Israel's rescue with worship.`, "He confesses that the LORD is greater than all gods and brings an offering.", "The Exodus has taught him something about who God is.", "ðŸ™Œ Confession", "ðŸ”¥ Offering", "ðŸ‘‘ The LORD greater", "A rescued story becomes a witness that leads to worship.");
  } else if (lower.includes("sat to judge") || lower.includes("morning unto the evening") || lower.includes("why sittest") || lower.includes("wear away") || lower.includes("not good")) {
    add(`${title} means Moses is carrying more than one man should carry.`, "Moses is trying to judge every case by himself from morning until evening.", "Jethro sees that this will wear Moses down and exhaust the people too.", "âš–ï¸ Judging cases", "â³ All day", "ðŸ˜“ Burnout danger", "Serving God does not mean carrying every burden alone.");
  } else if (lower.includes("enquire of god") || lower.includes("statutes of god")) {
    add(`${title} means Israel's everyday problems need God's wisdom.`, "The people bring matters to Moses because they need guidance from the LORD.", "Moses teaches them God's statutes and laws.", "ðŸ“œ God's instruction", "âš–ï¸ Decisions", "ðŸ§­ Wisdom", "A rescued people must learn God's ways for ordinary life.");
  } else if (lower.includes("god-ward") || lower.includes("teach them") || lower.includes("way wherein")) {
    add(`${title} means Moses is to stand before God for the people.`, "Moses must represent the people before God and teach them the way to walk.", "Delegating cases does not mean abandoning spiritual responsibility.", "ðŸ™ Before God", "ðŸ“œ Teach the law", "ðŸ§­ Show the way", "Healthy leadership keeps the main calling clear.");
  } else if (lower.includes("able men") || lower.includes("fear god") || lower.includes("men of truth") || lower.includes("hating covetousness") || lower.includes("rulers of thousands") || lower.includes("hearkened")) {
    add(`${title} gives the character standard for shared leadership.`, "The leaders must be capable, reverent, truthful, and not greedy.", "God's people need more than talented organizers. They need trustworthy servants.", "ðŸ’ª Able", "ðŸ™ Fear God", "âš–ï¸ Truthful and fair", "Shared leadership protects the people and the leader.");
  } else if (lower.includes("heads over the people") || lower.includes("judged the people") || lower.includes("hard causes") || lower.includes("small matter") || lower.includes("depart")) {
    add(`${title} means the new leadership structure actually begins working.`, "Smaller cases are handled by appointed leaders, while hard cases come to Moses.", "This creates order without pretending Moses can do everything.", "ðŸ‘¥ Shared leaders", "âš–ï¸ Hard cases", "âœ… Wise order", "God's people are helped when responsibility is carried wisely.");
  } else if (lower.includes("third month") || lower.includes("sinai") || lower.includes("camped before the mount")) {
    add(`${title} brings Israel to the mountain where covenant instruction will be given.`, "The people rescued from Egypt now stand before Sinai.", "This is where the LORD will speak and shape them as His holy people.", "â›°ï¸ Sinai", "ðŸ•ï¸ Camped people", "ðŸ“œ Covenant coming", "Rescue leads to relationship, worship, and command.");
  } else if (lower.includes("moses went up") || lower.includes("thick cloud") || lower.includes("people may hear")) {
    add(`${title} means God is drawing near in a way the people can recognize as holy.`, "Moses goes up as mediator, and the cloud marks God's presence.", "The people are meant to hear and learn to trust the word God gives through Moses.", "â›°ï¸ Mountain", "â˜ï¸ Cloud", "ðŸ‘‚ People hear", "God is drawing near, but not casually.");
  } else if (lower.includes("what i did unto the egyptians") || lower.includes("eagles' wings")) {
    add(`${title} reminds Israel that covenant begins with grace.`, "Before God gives commands, He reminds them that He rescued them.", "The image of eagles' wings shows care, strength, and carrying help.", "ðŸ¦… Carried", "ðŸšª Rescued", "ðŸ™Œ Grace first", "Obedience in Exodus comes after deliverance, not before it.");
  } else if (lower.includes("peculiar treasure") || lower.includes("kingdom of priests") || lower.includes("holy nation")) {
    add(`${title} names Israel's calling after rescue.`, "God is making them His treasured people, set apart to represent Him among the nations.", "This is identity before it is assignment.", "ðŸ’Ž Treasured people", "ðŸ™Œ Priests", "âœ¨ Holy nation", "The LORD rescues Israel so they can live near Him and show His ways.");
  } else if (lower.includes("elders") || lower.includes("laid before") || lower.includes("all the people answered") || lower.includes("we will do") || lower.includes("returned the words")) {
    add(`${title} means Israel is answering God's covenant words together.`, "Moses brings God's words to the elders and the people answer together.", "Their response is serious, even though the coming story will show how deeply they still need grace.", "ðŸ“œ God's words", "ðŸ‘¥ People answer", "âœ… We will do", "Covenant response should be wholehearted, not casual.");
  } else if (lower.includes("be ready") && section.reference === "Exodus 19:15-20") {
    add(`${title} is repeated as Sinai gets closer and the people approach the third day.`, "The waiting is almost over, and the signs of God's presence are about to shake the mountain.", "Readiness here means reverence before the LORD descends.", "â³ Third day", "â›°ï¸ Sinai", "ðŸ™‡ Reverence", "The repeated command makes the moment feel serious, not casual.");
  } else if (lower.includes("sanctify") || lower.includes("wash their clothes") || lower.includes("be ready") || lower.includes("set bounds") || lower.includes("take heed")) {
    add(`${title} means the people must prepare before the holy God comes near.`, "The people wash, wait, and stay within the limits God gives.", "God is near, but He is not ordinary or safe to treat lightly.", "ðŸ§¼ Washed clothes", "â³ Ready", "ðŸš§ Boundaries", "Holiness means God's presence is wonderful and serious.");
  } else if (lower.includes("thunders") || lower.includes("lightnings") || lower.includes("trumpet") || lower.includes("trembled") || lower.includes("smoke") || lower.includes("descended") || lower.includes("god answered")) {
    add(`${title} means Sinai has become a holy meeting place filled with fear and majesty.`, "The thunder, lightning, trumpet, smoke, and fire show that the LORD's presence is not small.", "The people tremble because God is drawing near in majesty.", "â›ˆï¸ Thunder", "ðŸ”¥ Fire", "ðŸŽº Trumpet", "The mountain scene teaches reverence before the God who rescued them.");
  } else if (lower.includes("go down") || lower.includes("break through") || lower.includes("priests also") || lower.includes("cannot come up") || lower.includes("aaron with thee")) {
    add(`${title} protects the people from treating God's holiness carelessly.`, "The boundaries around Sinai are not pointless rules.", "They teach that access to God's presence must happen God's way.", "ðŸš§ Boundary", "âš ï¸ Do not break through", "ðŸ™Œ Holy presence", "God's nearness is a gift, but it must be received with reverence.");
  } else if (lower.includes("god spake") || lower.includes("i am the lord") || lower.includes("brought thee out") || lower.includes("house of bondage")) {
    add(`${title} begins the commandments with God's identity and rescue.`, "Before Israel hears what to do, they hear who God is and what He has done.", "The law begins with deliverance, not cold rule-keeping.", "ðŸ“œ God's word", "ðŸšª Brought out", "ðŸ™Œ Rescuer first", "The Ten Commandments are given to a people already rescued by grace.");
  } else if (lower.includes("no other gods") || lower.includes("before me") || lower.includes("graven image") || lower.includes("bow down") || lower.includes("jealous god") || lower.includes("mercy unto thousands") || lower.includes("name of the lord") || lower.includes("vain")) {
    add(`${title} teaches Israel that the LORD alone must receive their worship.`, "God rescued them from Egypt, so they must not give their worship to idols, images, or empty use of His name.", "His jealousy is covenant love that refuses to share His people with false gods.", "ðŸ™Œ One God", "ðŸš« No idols", "ðŸ“› Holy name", "Freedom begins with right worship.");
  } else if (lower.includes("sabbath") || lower.includes("six days") || lower.includes("seventh day") || lower.includes("not do any work") || lower.includes("blessed") || lower.includes("hallowed")) {
    add(`${title} teaches rest as part of covenant life.`, "Israel had known slave labor in Egypt, but God gives them a holy rhythm of work and rest.", "The Sabbath reaches households, servants, animals, and strangers.", "ðŸ›‘ Rest", "ðŸ“… Seventh day", "ðŸŒ Creation pattern", "The LORD's people are not ruled by endless work.");
  } else if (lower.includes("father") || lower.includes("mother") || lower.includes("kill") || lower.includes("adultery") || lower.includes("steal") || lower.includes("false witness") || lower.includes("covet") || lower.includes("neighbour")) {
    add(`${title} means freedom under God must change how people treat one another.`, "God's commands protect family, life, marriage, property, truth, and the heart's desires.", "Freedom is not permission to harm others.", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§ Family", "âš–ï¸ Justice", "ðŸ’­ Heart desires", "Love for the LORD must become love and faithfulness toward neighbors.");
  } else if (lower.includes("thunderings") || lower.includes("afar off") || lower.includes("speak thou") || lower.includes("lest we die") || lower.includes("fear not") || lower.includes("fear may be before")) {
    add(`${title} means the people are overwhelmed by hearing God speak.`, "They are afraid and ask Moses to stand between them and God.", "Moses teaches that the right fear of God should lead them away from sin, not away from obedience.", "ðŸ˜¨ Trembling people", "ðŸ—£ï¸ God's voice", "ðŸ™‡ Holy fear", "The scene teaches reverence without running from God's word.");
  } else if (lower.includes("gods of silver") || lower.includes("altar") || lower.includes("burnt offerings") || lower.includes("record my name") || lower.includes("hewn stone") || lower.includes("steps")) {
    add(`${title} keeps Israel's worship simple and obedient after the commandments.`, "They must not make rival gods or shape worship around human display.", "Even the altar instructions teach humility before the LORD.", "ðŸª¨ Altar", "ðŸš« No idols", "ðŸ™Œ Worship God's way", "The God who spoke from Sinai also teaches how His people may approach Him.");
  } else {
    add(`${title} explains one part of Israel's covenant journey with God.`, "The wording helps the reader see what the LORD is teaching about trust, worship, leadership, holiness, or obedience.", "ðŸ“– Scripture wording", "ðŸ” Phrase meaning", "ðŸ§  Covenant understanding", "Rescued people are learning how to live with the God who saved them.");
  }

  return note(lines.slice(0, 8));
}

function deepenDay26PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_26_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay26PhraseCardShort(section, title)),
  };
}

const EXODUS_11_20_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  11: ["ðŸŒ™ The final plague is announced.", "ðŸ‘¶ Firstborn judgment answers Pharaoh's cruelty.", "ðŸ›¡ï¸ God distinguishes His people."],
  12: ["ðŸ‘ Passover teaches shelter through blood.", "ðŸšª Rescue is received household by household.", "ðŸƒ Israel leaves ready for freedom."],
  13: ["ðŸ§  Redeemed people must remember.", "ðŸ‘¶ The firstborn is claimed by the LORD.", "â˜ï¸ God leads His people by presence."],
  14: ["ðŸŒŠ The sea looks impossible.", "ðŸ›¡ï¸ The LORD fights for Israel.", "ðŸ‘€ Deliverance becomes something the people see."],
  15: ["ðŸŽ¶ Rescue turns into worship.", "ðŸ’§ The wilderness tests trust quickly.", "ðŸ©º The LORD heals and provides."],
  16: ["ðŸž Daily bread trains daily trust.", "ðŸ“ God gives enough, not hoarding.", "ðŸ›‘ Sabbath rest teaches freedom from slave rhythms."],
  17: ["ðŸ’§ Need exposes trust.", "ðŸ™Œ Victory depends on the LORD.", "ðŸ¤ Weary leaders need faithful support."],
  18: ["ðŸ‘‚ Jethro listens to what God has done.", "âš–ï¸ Wise leadership shares the load.", "ðŸ§­ God's people need order, not burnout."],
  19: ["â›°ï¸ Sinai is holy ground for a rescued people.", "ðŸ§¼ The people prepare before God descends.", "ðŸ“œ Covenant begins with grace: God carried them first."],
  20: ["ðŸ“œ God's commands shape free people.", "ðŸ™Œ Worship is for the LORD alone.", "âš–ï¸ Love for God and neighbor becomes covenant life."],
};

function hasExodusElevenToTwentyVisualList(content: string) {
  return content
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function formatExodusElevenToTwentyPhraseExplanation(section: PersonalExodusPhraseSectionInput, content: string) {
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
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(new RegExp("not " + "filler", "g"), "part of the story")
    .replace(new RegExp("not a " + "generic " + "comment card", "g"), "a real part of the passage")
    .replace(/the wording carries a real part of the passage, a real part of the passage/g, "the wording carries a real part of the passage");
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

  return note([...opening, ...cues, ...closing]);
}

function getExodusElevenToTwentyPhraseList(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/passover|lamb|blood|door|hyssop|unleavened|leaven|firstborn|midnight/.test(lower)) {
    return [
      `ðŸ‘ ${cleanTitle}`,
      "ðŸ©¸ Blood marking the house",
      "ðŸ  Families sheltered by God's word",
      "âš–ï¸ Judgment passing through Egypt",
    ];
  }

  if (/egypt|pharaoh|egyptians|thrust|jewels|silver|gold|mixed multitude/.test(lower)) {
    return [
      `ðŸ›ï¸ ${cleanTitle}`,
      "ðŸ‘‘ Egypt losing its grip",
      "ðŸŽ’ Israel leaving supplied",
      "ðŸ™Œ God reversing oppression",
    ];
  }

  if (/remember|children|ordinance|generation|sign|memorial|feast/.test(lower)) {
    return [
      `ðŸ§  ${cleanTitle}`,
      "ðŸ‘¶ Children learning the story",
      "ðŸ“– Rescue remembered",
      "ðŸ™Œ Worship shaped by deliverance",
    ];
  }

  if (/pillar|cloud|fire|led|way|sea|wilderness|camp|journey/.test(lower)) {
    return [
      `ðŸ§­ ${cleanTitle}`,
      "â˜ï¸ God guiding His people",
      "ðŸœï¸ Wilderness path",
      "ðŸ›¡ï¸ Presence on the journey",
    ];
  }

  if (/sea|waters|wind|dry ground|chariot|horse|rider|fight|stand still|fear/.test(lower)) {
    return [
      `ðŸŒŠ ${cleanTitle}`,
      "ðŸ˜¨ Israel facing danger",
      "ðŸ›¡ï¸ The LORD fighting for them",
      "ðŸš¶ A path opened by God",
    ];
  }

  if (/sing|song|lord is my strength|who is like|miriam|timbrel|dance/.test(lower)) {
    return [
      `ðŸŽ¶ ${cleanTitle}`,
      "ðŸ™Œ Praise after rescue",
      "ðŸŒŠ The sea victory remembered",
      "ðŸ‘¥ Worship spreading through the people",
    ];
  }

  if (/manna|bread|quail|omer|sabbath|murmur|wilderness|water|marah|elim/.test(lower)) {
    return [
      `ðŸž ${cleanTitle}`,
      "ðŸœï¸ Need in the wilderness",
      "ðŸ™Œ God providing daily",
      "ðŸ§ª Trust being trained",
    ];
  }

  return [
    `ðŸ”Ž ${cleanTitle}`,
    section.chapter <= 12 ? "ðŸ‘ Rescue through Passover" : "ðŸœï¸ Israel learning trust",
    section.chapter <= 12 ? "ðŸ  God's people sheltered" : "ðŸ™Œ God leading after freedom",
  ];
}

function getExodusElevenToTwentyTeachingLines(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/passover|lamb|blood|door|hyssop|unleavened|leaven|firstborn|midnight/.test(lower)) {
    return [
      `${cleanTitle} points into the Passover rescue.`,
      `In ${cleanTitle}, God gives Israel a concrete way to trust His word during judgment.`,
      `${cleanTitle} teaches shelter, obedience, and deliverance through what God commanded.`,
    ];
  }

  if (/egypt|pharaoh|egyptians|thrust|jewels|silver|gold|mixed multitude/.test(lower)) {
    return [
      `${cleanTitle} shows Egypt's power being reversed.`,
      `Through ${cleanTitle}, the people who were enslaved are now being pushed toward freedom.`,
      `${cleanTitle} shows God breaking the grip Pharaoh refused to release.`,
    ];
  }

  if (/remember|children|ordinance|generation|sign|memorial|feast/.test(lower)) {
    return [
      `${cleanTitle} turns rescue into remembrance.`,
      `With ${cleanTitle}, God does not want the next generation to forget what He did.`,
      `${cleanTitle} shows that the rescue must be explained, repeated, and lived in worship.`,
    ];
  }

  if (/pillar|cloud|fire|led|way|sea|wilderness|camp|journey/.test(lower)) {
    return [
      `${cleanTitle} shows that freedom still needs guidance.`,
      `In ${cleanTitle}, Israel is out of Egypt, but they do not know the road by themselves.`,
      `${cleanTitle} teaches that the LORD leads His people with presence, not just instructions.`,
    ];
  }

  if (/sea|waters|wind|dry ground|chariot|horse|rider|fight|stand still|fear/.test(lower)) {
    return [
      `${cleanTitle} is tied to the Red Sea rescue.`,
      `In ${cleanTitle}, Israel cannot save itself by strength or strategy.`,
      `${cleanTitle} shows the LORD making a way where the people see no way.`,
    ];
  }

  if (/sing|song|lord is my strength|who is like|miriam|timbrel|dance/.test(lower)) {
    return [
      `${cleanTitle} turns deliverance into praise.`,
      `Through ${cleanTitle}, Israel responds because the LORD has rescued them.`,
      `${cleanTitle} shows that victory is remembered through worship, not just history.`,
    ];
  }

  if (/manna|bread|quail|omer|sabbath|murmur|wilderness|water|marah|elim/.test(lower)) {
    return [
      `${cleanTitle} shows Israel learning trust after freedom.`,
      `Around ${cleanTitle}, the wilderness exposes Israel's need quickly.`,
      `${cleanTitle} shows God providing while training His people to depend on Him day by day.`,
    ];
  }

  return [
    `${cleanTitle} gives a real detail in Israel's journey.`,
    `The wording of ${cleanTitle} keeps the reader close to the movement of the passage.`,
    `${cleanTitle} helps show how the Exodus story forms a people who must learn to trust the LORD.`,
  ];
}

function formatRenderedDay25Lines(section: PersonalExodusPhraseSectionInput, cleanTitle: string, lines: string[]) {
  if (section.chapter < 13 || section.chapter > 16) return lines;

  const isEmojiLine = (line: string) => /^[^A-Za-z0-9'"(]/.test(line.trim());
  const cleaned = removeDay25RepeatedPhraseTitle(cleanTitle, lines)
    .map((line) => line.trim())
    .filter(Boolean);
  const proseLines = cleaned.filter((line) => !isEmojiLine(line) && !isDay25FillerLine(line));
  const opening = getDay25SpecificOpening(section, cleanTitle)
    .map((line) => removeDay25OpeningPhraseRepeat(cleanTitle, line));
  const closing = proseLines.slice(opening.length);
  const teachingBullets = getDay25TeachingBullets(section, cleanTitle).filter((line) => !isDay25FillerLine(line));
  const supportLines = teachingBullets.length > 0 ? teachingBullets : getDay25FallbackSupportLines(section);

  return [
    ...opening,
    ...supportLines,
    ...closing,
  ].slice(0, 8);
}

function getDay26TeachingBullets(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 17:1-6" || section.reference === "Exodus 17:7-7") {
    return ["\u{1F4A7} Israel needs real water", "\u{1FAA8} The LORD provides from the rock", "\u{1F5E3}\u{FE0F} Complaining tests trust", "\u{1F64C} God meets need in the wilderness"];
  }

  if (section.chapter === 17 && (lower.includes("water") || lower.includes("rock") || lower.includes("horeb") || lower.includes("chide") || lower.includes("massah") || lower.includes("meribah"))) {
    return ["ðŸ’§ Israel needs real water", "ðŸª¨ The LORD provides from the rock", "ðŸ—£ï¸ Complaining tests trust", "ðŸ™Œ God meets need in the wilderness"];
  }
  if (section.chapter === 17) {
    return ["âš”ï¸ Amalek attacks the rescued people", "ðŸ™Œ Israel depends on the LORD's help", "ðŸ¤ Aaron and Hur support Moses", "ðŸ“– The victory must be remembered"];
  }
  if (section.chapter === 18 && (lower.includes("jethro") || lower.includes("zipporah") || lower.includes("gershom") || lower.includes("eliezer"))) {
    return ["ðŸ‘¨â€ðŸ‘©â€ðŸ‘¦ Moses has a real family story", "ðŸ‘‚ Jethro hears what God has done", "ðŸœï¸ Midian reconnects with the Exodus", "ðŸ™Œ Rescue is being witnessed beyond Israel"];
  }
  if (section.chapter === 18) {
    return ["âš–ï¸ Moses carries too much alone", "ðŸ‘¥ Wise leaders share the burden", "ðŸ“œ God's ways must be taught clearly", "ðŸ§  Leadership protects the people from exhaustion"];
  }
  if (section.reference === "Exodus 19:9-14" || section.reference === "Exodus 19:15-20" || section.reference === "Exodus 19:21-25") {
    return ["\u{1F9FC} The people must prepare", "\u{1F6A7} Boundaries guard the mountain", "\u{26F0}\u{FE0F} Sinai is holy ground", "\u{1F628} God's presence brings reverence"];
  }
  if (section.chapter === 19 && (lower.includes("mount") || lower.includes("sinai") || lower.includes("thunder") || lower.includes("lightning") || lower.includes("quaked"))) {
    return ["â›°ï¸ Sinai is the place of holy meeting", "âš¡ God's presence is not casual", "ðŸ˜¨ The people must approach with reverence", "ðŸ“œ Covenant words come from the LORD"];
  }
  if (section.chapter === 19) {
    return ["ðŸ¦… God carried Israel out of Egypt", "ðŸ’Ž Israel is called His treasured people", "ðŸ‘‘ The rescued people belong to the King", "ðŸ“œ Covenant obedience follows rescue"];
  }
  if (section.reference === "Exodus 20:10-11") {
    return ["\u{1F6D1} Sabbath rest reaches the household", "\u{1F465} Servants and children are included", "\u{1F30D} Creation sets the pattern", "\u{1F64C} Rest belongs to the LORD"];
  }
  if (section.reference === "Exodus 20:1-3") {
    return ["\u{1F6E1}\u{FE0F} The LORD rescued Israel", "\u{1F3DB}\u{FE0F} Egypt was bondage", "\u{1F6AB} No rival gods", "\u{1F64C} Worship belongs to the LORD"];
  }
  if (section.reference === "Exodus 20:4-9") {
    return ["\u{1F6AB} No carved idols", "\u{1F4DB} God's name is holy", "\u{1F496} Mercy reaches thousands", "\u{1F6D1} Sabbath must be remembered"];
  }
  if (section.reference === "Exodus 20:12-17") {
    return ["\u{1F46A} Family honor", "\u{2696}\u{FE0F} Justice with neighbors", "\u{1F5E3}\u{FE0F} Truthful witness", "\u{1F9E0} Desire brought under God"];
  }
  if (section.reference === "Exodus 20:18-23") {
    return ["\u{1F628} The people tremble", "\u{1F5E3}\u{FE0F} God's voice is holy", "\u{1F64F} Moses stands between", "\u{1F6AB} No silver or gold gods"];
  }
  if (section.reference === "Exodus 20:24-26") {
    return ["\u{1FAA8} Simple altar", "\u{1F525} Offerings brought to God", "\u{1FAE1} The LORD promises nearness", "\u{1F6AB} No human display"];
  }
  if (section.chapter === 20 && (lower.includes("god") || lower.includes("lord") || lower.includes("commandment") || lower.includes("sabbath") || lower.includes("honour"))) {
    return ["ðŸ“œ God gives covenant commands", "ðŸ™Œ Worship belongs to the LORD alone", "ðŸ›‘ Rest is part of holy life", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘¦ Family honor matters before God"];
  }

  return ["\u{1F4DC} The command comes from the LORD", "\u{1F9ED} Israel is learning covenant life", "\u{1F64C} Rescue leads into obedience", "\u{2705} Obedience becomes daily practice"];
}

function isDay26FillerLine(line: string) {
  return /(^this gives\b|^this turns\b|^this introduces\b|^this brings\b|^this names\b|^this protects\b|^this teaches\b|^this keeps\b|^this explains one part|helps the reader|reminds the reader|the phrase shows|real detail|assigned text|meaning should be clear|keeps the reader close|wording helps)/i.test(line);
}

function makeDay26OpeningLineUnique(line: string, title: string, section: PersonalExodusPhraseSectionInput) {
  const startsWithTitle = line.toLowerCase().startsWith(title.toLowerCase());
  const adjusted = startsWithTitle ? `The wording ${line.charAt(0).toLowerCase()}${line.slice(1)}` : line;
  return adjusted;
}

function getDay26SpecificOpening(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("chide") || lower.includes("chiding")) return ["Chide means quarrel or argue.", "The people are not only thirsty; they are turning their fear against Moses instead of trusting the LORD."];
  if (lower.includes("after their journeys")) return ["Israel is still moving through the wilderness.", "Each stop is part of the road God is leading them on."];
  if (lower.includes("wherefore")) return ["Wherefore means why.", "The people are asking why Moses brought them from Egypt, but their question accuses rescue as if God meant harm."];
  if (lower.includes("stone me")) return ["Stone me means kill Moses by throwing stones.", "The water crisis has grown so angry that Moses feels physically threatened by the people he is leading."];
  if (lower.includes("no water")) return ["The problem is literal thirst, not a small inconvenience.", "A large camp in the wilderness needs water to survive, so this crisis tests whether need will become trust or accusation."];
  if (lower.includes("rock in horeb")) return ["Horeb is the mountain region where God will provide water from a rock.", "The place that looks hard and lifeless becomes the place where the LORD gives life."];
  if (lower.includes("smite the rock")) return ["Smite means strike.", "Moses must strike the rock because God commands it, and the water comes by the LORD's power rather than Moses' cleverness."];
  if (lower.includes("massah")) return ["Massah is connected with testing.", "The place name remembers that Israel tested the LORD by questioning whether He was really with them."];
  if (lower.includes("meribah")) return ["Meribah is connected with quarreling.", "The name keeps Israel's angry argument in memory so the people do not forget what unbelief sounded like."];
  if (lower.includes("tempted the lord")) return ["Tempted the LORD means tested Him in an unbelieving way.", "Israel is treating God's presence as doubtful even after He has rescued, guided, and fed them."];
  if (lower === "saying") return ["This introduces the words that reveal Israel's deeper question.", "The issue beneath the complaint is not only water, but whether the LORD is truly among them."];
  if (lower.includes("among us")) return ["Among us means present with us.", "Israel is asking whether the LORD is really with the camp, even though His care has already followed them from Egypt."];
  if (lower.includes("amalek")) return ["Amalek was the enemy people who attacked Israel in the wilderness.", "This is Israel's first battle after Egypt, so the rescued people must learn dependence in conflict too."];
  if (lower.includes("choose us out")) return ["Choose us out men means select men for battle.", "Joshua must gather fighters while Moses stands with the rod of God, joining human action with dependence on the LORD."];
  if (lower.includes("rod of god")) return ["The rod of God is Moses' staff connected with God's earlier signs and judgments.", "Holding it during the battle points to dependence on the LORD, not magic in the staff itself."];
  if (lower.includes("held up his hand")) return ["Moses' lifted hand shows dependence during the battle.", "When his hand is raised, Israel prevails, teaching that victory is tied to the LORD's help."];
  if (lower.includes("aaron and hur")) return ["Aaron and Hur support Moses when his strength runs out.", "The battle teaches that even faithful leaders need help from others to keep standing."];
  if (lower.includes("hands were steady")) return ["Steady means firm and held up without dropping.", "Moses remains supported until the battle is finished, showing endurance through shared help."];
  if (lower.includes("discomfited")) return ["Discomfited means defeated or overthrown.", "Joshua beats Amalek in battle, but the scene ties that victory to God's help and Moses' dependence."];
  if (lower.includes("memorial in a book")) return ["A memorial in a book means the battle must be written down for remembrance.", "God does not want this attack and victory to disappear from Israel's memory."];
  if (lower.includes("rehearse it")) return ["Rehearse it means repeat it or tell it carefully.", "Joshua must hear the record because the conflict with Amalek will matter beyond this one battle."];
  if (lower.includes("put out the remembrance")) return ["Put out the remembrance means erase Amalek's lasting name and power.", "The LORD promises judgment against the enemy who attacked His rescued people."];
  if (lower.includes("altar")) return ["An altar is a place of sacrifice and worship.", "Moses builds one after the victory so the battle's glory is given to the LORD."];
  if (lower.includes("jehovahnissi")) return ["Jehovah-nissi means the LORD is my banner.", "A banner was a rallying sign in battle, so the name says Israel's victory comes from the LORD."];
  if (lower.includes("jethro")) return ["Jethro is Moses' father-in-law from Midian.", "His arrival brings Moses' family story back into the wilderness journey after the rescue from Egypt."];
  if (lower.includes("zipporah")) return ["Zipporah is Moses' wife.", "Her return with Jethro shows that Moses is not only Israel's leader; he also has a real family."];
  if (lower.includes("sent her back")) return ["Zipporah had been away from Moses for a time.", "Now she returns with Jethro and Moses' sons."];
  if (lower.includes("gershom")) return ["This is Moses' son whose name is connected with living as a stranger.", "His name remembers Moses' earlier exile before the Exodus mission."];
  if (lower.includes("eliezer")) return ["This is Moses' son whose name points to God's help.", "His name remembers that the LORD delivered Moses from danger."];
  if (lower.includes("obeisance")) return ["Obeisance means a respectful bow.", "Moses greets Jethro with honor, showing family respect inside the larger Exodus story."];
  if (lower.includes("welfare")) return ["Welfare means well-being or peace.", "Moses and Jethro ask about each other's peace after long pressure, danger, and separation."];
  if (lower.includes("burnt offering")) return ["A burnt offering was a sacrifice offered up to God.", "Jethro responds to the LORD's rescue with worship, not only curiosity."];
  if (lower.includes("what is this thing")) return ["Jethro is asking why Moses is judging the people this way.", "The question exposes a leadership pattern that is wearing everyone down."];
  if (lower.includes("why sittest thou thyself alone")) return ["Jethro sees Moses sitting as the only judge.", "One leader carrying every case alone is not wise or sustainable."];
  if (lower.includes("sat to judge")) return ["Sat to judge means Moses was hearing disputes and deciding cases.", "The people bring their problems to him, but one man cannot carry that load all day forever."];
  if (lower.includes("morning unto the evening")) return ["Morning unto the evening means the work lasted all day.", "Jethro sees that the leadership burden is exhausting Moses and the people."];
  if (lower.includes("wear away")) return ["Wear away means become worn out.", "Jethro warns that Moses and the people will be drained if every case depends on one man."];
  if (lower.includes("not good")) return ["Not good means Jethro sees a real problem in the leadership pattern.", "The issue is not Moses' laziness but an unsustainable way of serving the people."];
  if (lower.includes("god-ward")) return ["God-ward means toward God or before God.", "Moses must represent the people before the LORD even while other leaders help carry smaller cases."];
  if (lower.includes("able men")) return ["Able men means capable men who can carry responsibility.", "Shared leadership needs skill, reverence, truthfulness, and freedom from greed."];
  if (lower.includes("fear god")) return ["Fear God means reverence the LORD and take His justice seriously.", "Israel's leaders must be shaped by holy fear, not merely talent or popularity."];
  if (lower.includes("covetousness")) return ["Covetousness means greedy desire for gain.", "Judges who love gain can twist justice, so Israel needs leaders who hate bribery and selfish advantage."];
  if (lower.includes("rulers of thousands")) return ["This describes layered leadership through thousands, hundreds, fifties, and tens.", "The structure spreads responsibility so ordinary cases can be handled wisely."];
  if (lower.includes("hard causes")) return ["Hard causes means difficult cases.", "The hardest matters still come to Moses, while smaller disputes are handled by appointed leaders."];
  if (lower.includes("third month")) return ["The third month marks when Israel arrives near Sinai after leaving Egypt.", "The date shows that the rescued people are now being brought into covenant formation."];
  if (lower.includes("sinai")) return ["Sinai is the mountain where the LORD will speak covenant words to Israel.", "The people rescued from Egypt now camp before the place of holy meeting."];
  if (lower.includes("eagles' wings")) return ["Eagles' wings pictures strong, protective carrying.", "Before giving commands, God reminds Israel that He carried them out of Egypt by grace."];
  if (lower.includes("peculiar treasure")) return ["Peculiar treasure means a special possession treasured by the LORD.", "Israel is being called God's own people among the nations."];
  if (lower.includes("kingdom of priests")) return ["A kingdom of priests means Israel is called to represent the LORD before the nations.", "The whole people are being given a holy identity, not only private rescue."];
  if (lower.includes("holy nation")) return ["Holy nation means a people set apart for the LORD.", "God rescued Israel so their life together would show His character."];
  if (lower.includes("wash their clothes")) return ["Washing clothes is part of preparing for God's holy presence.", "The outward preparation teaches that Sinai is not an ordinary meeting."];
  if (lower.includes("moses sanctified the people")) return ["Moses helps the people prepare for the LORD's holy presence.", "Sanctified means set apart or made ready for God."];
  if (lower.includes("set bounds")) return ["Set bounds means place limits around the mountain.", "The boundary protects the people from treating God's holiness casually."];
  if (lower.includes("thunders") || lower.includes("lightnings")) return ["Thunder and lightning mark the terrifying majesty of God's presence.", "Sinai shakes the people because the LORD is drawing near as holy King."];
  if (lower.includes("trumpet")) return ["The trumpet sound announces the holy meeting at Sinai.", "The growing sound makes the moment feel public, serious, and impossible to ignore."];
  if (lower.includes("away, get thee down")) return ["The LORD sends Moses back down the mountain.", "Moses must warn the people before they cross the holy boundary."];
  if (lower.includes("house of bondage")) return ["The house of bondage means the place of slavery.", "The commandments begin by reminding Israel that the LORD rescued them from Egypt before calling them to obey."];
  if (lower.includes("graven image")) return ["A graven image is a carved or shaped idol.", "Israel must not turn the invisible LORD into an object they can control or bow before."];
  if (lower.includes("vain")) return ["Vain means empty, false, or careless.", "God's name must not be used as if it were weightless or available for lies."];
  if (lower.includes("covet")) return ["Covet means desire what another person has.", "The command reaches beneath outward behavior into the heart's cravings."];

  if (lower.includes("moses cried")) return ["Moses cries out because the people are angry and the need is urgent.", "He brings the pressure to the LORD instead of pretending he can solve it alone."];
  if (lower.includes("lord hath sworn")) return ["God has made a firm promise about the conflict with Amalek.", "The battle will not be forgotten or treated lightly."];
  if (lower.includes("war with amalek")) return ["War with Amalek means this conflict will continue beyond one battle.", "Amalek's attack becomes a remembered enemy pattern in Israel's story."];
  if (lower.includes("heard of all")) return ["Jethro hears the report of what God has done for Moses and Israel.", "The Exodus is becoming known beyond Israel's own camp."];
  if (lower.includes("brought israel out")) return ["The LORD brought Israel out means their freedom came from God.", "Jethro is hearing that Egypt did not release Israel by kindness or accident."];
  if (lower.includes("i thy father in law")) return ["Jethro announces himself as Moses' father-in-law.", "His arrival brings Moses' family back into the wilderness story."];
  if (lower.includes("went out to meet")) return ["Moses goes out to greet Jethro with honor.", "The leader of Israel still shows respect inside his own family."];
  if (lower.includes("moses told")) return ["Moses tells Jethro the story of the LORD's rescue.", "The deliverance is meant to be spoken and remembered."];
  if (lower.includes("lord delivered")) return ["God rescued Israel from danger.", "Their survival is credited to the LORD, not to Moses' strength."];
  if (lower.includes("greater than all gods")) return ["Jethro confesses that the LORD is greater than all gods.", "The rescue from Egypt has shown him the LORD's unmatched power."];
  if (lower.includes("people come unto me")) return ["The people come to Moses because they need judgment and direction.", "Their problems are real, but one man is carrying too much."];
  if (lower.includes("statutes of god")) return ["Statutes are God's instructions.", "Moses teaches the people what God requires, not merely his own opinions."];
  if (lower.includes("teach them ordinances")) return ["Ordinances and laws are instructions for ordered life with God.", "Jethro tells Moses to teach clearly so the people know the way."];
  if (lower.includes("way wherein they must walk")) return ["The way means the path of life God wants Israel to follow.", "The people need more than decisions; they need direction."];
  if (lower.includes("moses hearkened")) return ["Hearkened means listened and obeyed.", "Moses receives wise correction instead of defending his old way."];
  if (lower.includes("heads over the people")) return ["Heads over the people means appointed leaders.", "Moses shares responsibility so the whole camp can be served."];
  if (lower.includes("all seasons")) return ["At all seasons means regularly and continually.", "The people need justice available without exhausting Moses every day."];
  if (lower.includes("small matter")) return ["Small matters are ordinary disputes that appointed leaders can handle.", "Not every problem needs to rise to Moses."];
  if (lower.includes("let his father in law depart")) return ["Moses lets Jethro return home after the counsel is received.", "Jethro's visit leaves Israel with a wiser leadership structure."];
  if (lower.includes("camped before the mount")) return ["Israel camps before the mountain where God will speak.", "The rescued people are now waiting at the place of covenant."];
  if (lower.includes("went up unto god")) return ["Moses goes up to God as the mediator for the people.", "He stands between the camp and the LORD's holy word."];
  if (lower.includes("seen what i did")) return ["God reminds Israel that they saw what He did to Egypt.", "The covenant begins with memory of rescue, not with Israel proving itself first."];
  if (lower.includes("elders")) return ["The elders are the representatives of the people.", "Moses gathers them so the LORD's words can be brought to the whole camp."];
  if (lower.includes("laid before their faces")) return ["Moses lays the LORD's words before the people plainly.", "They are not being asked to respond to something hidden or unclear."];
  if (lower.includes("answered together")) return ["All the people answer together with one voice.", "The whole nation responds to the covenant words."];
  if (lower.includes("we will do")) return ["The people promise to do what the LORD has spoken.", "Their words accept the covenant responsibility before Sinai."];
  if (lower.includes("returned the words")) return ["Moses carries the people's answer back to the LORD.", "He serves as the messenger between God and Israel."];
  if (lower.includes("thick cloud")) return ["The thick cloud hides the fullness of God's glory.", "God draws near in a way the people can recognize but not control."];
  if (lower.includes("people may hear")) return ["God wants the people to hear Him speak with Moses.", "This will help them trust that Moses truly carries the LORD's word."];
  if (lower.includes("sanctify them")) return ["Sanctify means set apart and prepare for God.", "The people must get ready because the LORD is coming near."];
  if (lower.includes("ready against the third day")) return ["Be ready means prepare for the appointed day.", "The third day marks the time when the LORD will descend on Sinai."];
  if (lower.includes("take heed")) return ["Take heed means pay careful attention.", "The people must not rush past the boundaries around God's holy presence."];
  if (lower.includes("people trembled")) return ["The people tremble because God's presence is terrifying and holy.", "Sinai is not casual, quiet, or ordinary."];
  if (lower.includes("descended upon it in fire")) return ["The LORD descends in fire on the mountain.", "The fire shows His holy presence in a way Israel can see and fear."];
  if (lower.includes("moses spake")) return ["Moses speaks, and God answers him.", "The people hear that Moses is not acting on his own authority."];
  if (lower.includes("charge the people")) return ["Charge the people means warn them firmly.", "The boundary around Sinai must be taken seriously."];
  if (lower.includes("break through")) return ["Break through means push past the boundary.", "The people must not force their way toward God's holy presence."];
  if (lower.includes("priests also sanctify")) return ["The priests also must prepare themselves.", "No one gets to treat God's holiness casually, even religious leaders."];
  if (lower.includes("cannot come up")) return ["The people are not allowed to come up the mountain past God's boundary.", "The boundary protects them from approaching in the wrong way."];
  if (lower.includes("aaron with thee")) return ["Aaron is allowed to come up with Moses.", "God names who may approach instead of leaving the moment open to everyone."];
  if (lower.includes("spake all these words")) return ["God speaks the commandments Himself.", "Israel's law begins with the LORD's own voice."];
  if (lower.includes("i am the lord")) return ["God identifies Himself before giving the commands.", "The commandments come from the LORD who already rescued Israel."];
  if (lower.includes("which have brought thee out")) return ["God reminds Israel that He brought them out of Egypt.", "Obedience comes after rescue, not before it."];
  if (lower.includes("no other gods")) return ["Israel must worship no god besides the LORD.", "The God who rescued them alone deserves their trust and worship."];
  if (lower === "before me") return ["This means in the LORD's presence, with no rival beside Him.", "No rival god may stand beside Him in Israel's worship."];
  if (lower.includes("bow down")) return ["Bowing down means worshiping or submitting to an idol.", "Israel must not give worship to something their own hands made."];
  if (lower.includes("jealous god")) return ["Jealous here means covenant love that refuses rivals.", "The LORD will not share His people with false gods."];
  if (lower.includes("mercy unto thousands")) return ["God's mercy reaches far beyond one generation.", "The command warns against idols but also shows the LORD's steadfast kindness."];
  if (lower.includes("remember the sabbath")) return ["Remember means keep the Sabbath in mind and practice.", "Israel must build rest into life with God."];
  if (lower.includes("six days shalt thou labour")) return ["Six days are given for ordinary work.", "God's command honors work while setting a boundary around it."];
  if (lower.includes("seventh day")) return ["The seventh day is set apart as Sabbath.", "Israel's week must include holy rest."];
  if (lower.includes("not do any work")) return ["No work means the Sabbath stops normal labor.", "Rest becomes obedience, not laziness."];
  if (lower.includes("nor thy son")) return ["The Sabbath command includes the children in the household.", "Rest is not only for adults or leaders."];
  if (lower.includes("nor thy manservant")) return ["The Sabbath command includes servants too.", "Israel must not receive rest from God while denying rest to workers."];
  if (lower.includes("heaven and earth")) return ["God made heaven and earth in six days.", "The Sabbath command points back to the creation pattern."];
  if (lower.includes("blessed the sabbath")) return ["God blessed the Sabbath day and set it apart.", "Rest is presented as a gift from God, not only a rule."];
  if (lower.includes("hallowed it")) return ["Hallowed means made holy or set apart.", "The Sabbath belongs to God in a special way."];
  if (lower.includes("honour thy father")) return ["Honour means treat parents with respect and weight.", "Family life is part of covenant obedience."];
  if (lower.includes("not kill")) return ["This command forbids murder.", "Human life must be protected because it belongs under God's rule."];
  if (lower.includes("adultery")) return ["This command protects marriage faithfulness.", "God's people must not betray the covenant of husband and wife."];
  if (lower.includes("steal")) return ["This command forbids taking what belongs to another person.", "Freedom under God does not permit harming a neighbor's life."];
  if (lower.includes("false witness")) return ["False witness means lying against another person.", "God's people must protect truth in the community."];
  if (lower.includes("neighbour")) return ["A neighbor is the person whose life and goods are near you.", "God's commands protect what belongs to others."];
  if (lower.includes("saw the thunderings")) return ["The people see and hear the terrifying signs at Sinai.", "God's presence overwhelms their senses."];
  if (lower.includes("stood afar off")) return ["The people step back and stand at a distance.", "Their fear shows how heavy the moment feels."];
  if (lower.includes("speak thou with us")) return ["The people ask Moses to speak with them instead.", "They want a mediator because God's voice terrifies them."];
  if (lower.includes("lest we die")) return ["The people fear they will die if God keeps speaking directly.", "Sinai makes God's holiness feel dangerously near."];
  if (lower === "fear not") return ["Moses tells them not to run from God's covenant word in panic.", "He is calming panic, not making God seem small."];
  if (lower.includes("fear may be before")) return ["God's fear before their faces means reverence should stay with them.", "Holy fear is meant to keep them from sin."];
  if (lower.includes("gods of silver")) return ["Gods of silver means metal idols.", "Israel must not replace the living LORD with objects they can make."];
  if (lower.includes("burnt offerings")) return ["Burnt offerings are sacrifices given up to God.", "The altar is a place where worship is brought before the LORD."];
  if (lower.includes("i will come unto thee")) return ["God promises to meet His people where He records His name.", "The altar is not magic; the LORD Himself gives the promise of nearness."];
  if (lower.includes("record my name")) return ["God records His name where He chooses to be worshiped.", "His presence is received by His word, not controlled by Israel."];
  if (lower.includes("altar of stone")) return ["An altar of stone is allowed, but only on God's terms.", "Even worship materials must follow His command."];
  if (lower.includes("hewn stone")) return ["Hewn stone means stone cut or shaped by tools.", "God forbids turning the altar into a display of human craftsmanship."];
  if (lower.includes("steps")) return ["Steps could expose the priest as he climbed the altar.", "God's worship must guard holiness and modesty."];

  if (section.chapter === 17) return ["The wilderness exposes another pressure point for Israel.", "The LORD is teaching rescued people to depend on Him in need and conflict."];
  if (section.chapter === 18) return ["This detail belongs to Israel's new life after rescue.", "God is shaping leadership, family, and justice in the wilderness camp."];
  if (section.chapter === 19) return ["This detail prepares Israel for meeting the LORD at Sinai.", "The rescued people must learn reverence before covenant words are given."];
  return ["This command shapes Israel's life with God and neighbor.", "Freedom from Egypt now becomes obedience under the LORD."];
}

function getDay26ClosingLine(section: PersonalExodusPhraseSectionInput, title: string) {
  const lower = title.toLowerCase();

  if (section.reference === "Exodus 17:1-6" || section.reference === "Exodus 17:7-7") return "The water crisis becomes a lesson in trust.";
  if (section.chapter === 17 && /water|rock|horeb|smite|chide|massah|meribah|among us|tempted/.test(lower)) return "The water crisis becomes a lesson in trust.";
  if (section.chapter === 17) return "The battle teaches Israel to depend on the LORD.";
  if (section.chapter === 18 && /jethro|zipporah|gershom|eliezer|father in law|welfare|obeisance/.test(lower)) return "The Exodus story includes real families and real witnesses.";
  if (section.chapter === 18) return "Wise order protects both the leader and the people.";
  if (section.chapter === 19 && /mount|sinai|cloud|thunder|lightning|trumpet|fire|bounds|sanctify|ready|trembled/.test(lower)) return "God's nearness must be treated as holy.";
  if (section.chapter === 19) return "Rescue leads Israel into covenant with God.";
  if (section.chapter === 20 && /sabbath|work|seventh|hallowed|blessed/.test(lower)) return "The LORD builds holy rest into His people's life.";
  if (section.chapter === 20 && /father|mother|kill|adultery|steal|witness|covet|neighbour/.test(lower)) return "God's commands protect life with other people.";
  if (section.chapter === 20 && /altar|offering|stone|steps|name|come unto thee/.test(lower)) return "Worship must follow God's way, not human display.";

  return "The commandments teach rescued people how to live under God's rule.";
}

function formatRenderedDay26Lines(section: PersonalExodusPhraseSectionInput, cleanTitle: string, lines: string[]) {
  if (section.chapter < 17 || section.chapter > 20) return lines;

  const rawOpening = getDay26SpecificOpening(section, cleanTitle);

  return [
    rawOpening[0],
    rawOpening[1],
    ...getDay26TeachingBullets(section, cleanTitle),
    getDay26ClosingLine(section, cleanTitle),
  ].filter(Boolean).slice(0, 7);
}

function normalizeRepeatedExodusElevenToTwentyLines(sections: PersonalExodusPhraseSectionInput[]) {
  const counts = new Map<string, number>();
  const normalizeLine = (line: string) => line.toLowerCase().replace(/[.?!]+$/, "").trim();

  for (const section of sections) {
    if (section.chapter < 11 || section.chapter > 20) continue;
    for (const [, content] of section.phrases) {
      for (const line of content.split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
        const key = normalizeLine(line);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return sections.map((section) => {
    if (section.chapter < 11 || section.chapter > 20) return section;

    return {
      ...section,
      phrases: section.phrases.map(([title, content]) => {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        if (section.chapter >= 13 && section.chapter <= 16) {
          return [ensureExodusElevenToTwentyTitleEmoji(title), content] as [string, string];
        }

        const kept: string[] = [];

        for (const line of formatExodusElevenToTwentyPhraseExplanation(section, content).split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
          const key = normalizeLine(line);
          const isRepeated = (counts.get(key) ?? 0) >= 3;
          const isTitleLine = line.toLowerCase().includes(cleanTitle.toLowerCase());
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          if (isRepeated && !isTitleLine && !isEmojiLine) continue;
          kept.push(line);
        }

        const hasList = kept.filter((line) => /^[^A-Za-z0-9'"(]/.test(line)).length >= 2;
        if (!hasList) {
          kept.splice(Math.min(2, kept.length), 0, ...getExodusElevenToTwentyPhraseList(section, cleanTitle));
        }

        for (const line of getExodusElevenToTwentyTeachingLines(section, cleanTitle)) {
          if (kept.length >= 5) break;
          if (!kept.some((keptLine) => normalizeLine(keptLine) === normalizeLine(line))) {
            kept.push(line);
          }
        }

        while (kept.length < 4) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `${cleanTitle} names something God included in this scene.`,
            `${cleanTitle} should be understood before the reader moves on.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        const finalLines = formatRenderedDay26Lines(section, cleanTitle, formatRenderedDay25Lines(section, cleanTitle, kept));

        return [ensureExodusElevenToTwentyTitleEmoji(title), note(finalLines)] as [string, string];
      }),
    };
  });
}

function formatExodusElevenToTwentySectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return normalizeRepeatedExodusElevenToTwentyLines(sections.map((section) => ({
    ...section,
    icon: getExodusElevenToTwentySectionIcon(section),
    phrases: section.phrases.map(([title, content]) => {
      if (section.chapter >= 13 && section.chapter <= 16) {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        return [
          ensureExodusElevenToTwentyTitleEmoji(title),
          buildDay25RevisedExplanation(section, cleanTitle),
        ] as [string, string];
      }

      return [
        title,
        formatExodusElevenToTwentyPhraseExplanation(section, content),
      ] as [string, string];
    }),
  })));
}

export const EXODUS_11_20_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusElevenToTwentySectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS, [11, 12], "ðŸ‘").map(deepenDay24Exodus11To12PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_STUDY_SECTIONS, [13, 14, 15, 16], "ðŸŒŠ").map(deepenDay25PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS, [17, 18, 19, 20], "â›°ï¸").map(deepenDay26PhraseCards),
  ...RAW_EXODUS_11_20_PERSONAL_SECTIONS.filter((section) => section.chapter < 11 || section.chapter > 20),
]);
