import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import { DAY_61_80_JOSHUA_20_24_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

const note = (lines: string[]) => lines.join("\n\n");

const generatedJoshuaTwentyToTwentyFourPersonalSections = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [20, 21, 22, 23, 24],
  icon: "🛡️",
  fallbackPhrases: [
    "The LORD Also Spake Unto Joshua",
    "The Children Of Israel",
    "The Cities Of Refuge",
    "The Land Rested From War",
    "The Inheritance Of The Levites",
    "Serve The LORD",
    "Made A Covenant With The People",
  ],
});

const day61SectionTitles: Record<string, string> = {
  "Joshua 20:1-6": "🛡️ Appoint Out For You Cities Of Refuge",
  "Joshua 20:7-9": "🏙️ Cities Of Refuge Appointed",
  "Joshua 21:1-6": "🏠 The Levites Ask For Cities",
  "Joshua 21:7-12": "🎲 Lots For The Levite Families",
  "Joshua 21:13-18": "🕊️ Cities Given To Aaron's Children",
  "Joshua 21:19-24": "👨‍👩‍👦 Cities For The Remaining Kohathites",
  "Joshua 21:25-30": "🌿 Cities For Gershon's Families",
  "Joshua 21:31-36": "🏞️ More Cities For Levite Families",
  "Joshua 21:37-42": "🧱 Cities For Merari's Families",
  "Joshua 21:43-45": "✅ Not One Promise Failed",
  "Joshua 22:1-6": "🤝 Joshua Sends The Eastern Tribes Home",
  "Joshua 22:7-12": "🏗️ A Great Altar By Jordan",
  "Joshua 22:13-18": "⚠️ Phinehas Confronts The Eastern Tribes",
  "Joshua 22:19-24": "⛺ Come Over Unto The LORD's Land",
  "Joshua 22:25-30": "🗣️ The Altar Is A Witness",
  "Joshua 22:31-34": "🙌 The LORD Is Among Us",
  "Joshua 23:1-6": "👴 Joshua's Final Charge Begins",
  "Joshua 23:7-12": "🚫 Do Not Cleave To These Nations",
  "Joshua 23:13-16": "⚖️ Know For A Certainty",
};

const day62JoshuaSectionTitles: Record<string, string> = {
  "Joshua 24:1-6": "📜 Joshua Gathers Israel At Shechem",
  "Joshua 24:7-12": "🧱 I Brought You Out",
  "Joshua 24:13-18": "🙏 Fear The LORD And Serve Him",
  "Joshua 24:19-24": "⚖️ Ye Cannot Serve The LORD Lightly",
  "Joshua 24:25-30": "🤝 Joshua Makes A Covenant",
  "Joshua 24:31-33": "🪦 Joshua And Eleazar Are Buried",
};

function stripLeadingEmoji(value: string) {
  return value.replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, "").trim();
}

function getCityContext(reference: string) {
  if (reference === "Joshua 21:13-18") {
    return {
      refugeCity: "Hebron",
      neighboringCity: "Libnah",
      clan: "Aaron's priestly line",
    };
  }
  if (reference === "Joshua 21:25-30") {
    return {
      refugeCity: "Golan",
      neighboringCity: "Bashan's nearby towns",
      clan: "Gershon's line",
    };
  }
  if (reference === "Joshua 21:31-36") {
    return {
      refugeCity: "Kedesh",
      neighboringCity: "Hammoth-dor",
      clan: "another Levite family line",
    };
  }
  return {
    refugeCity: "Ramoth",
    neighboringCity: "Mahanaim",
    clan: "Merari's line",
  };
}

function explainDay61JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  const cityContext = getCityContext(section.reference);
  let opening: [string, string] = [
    "This line is part of Joshua's closing chapters about refuge, inheritance, and covenant faithfulness.",
    "It needs a direct explanation so the phrase itself teaches clearly.",
  ];
  let lead = "🛡️ Joshua 20-23 shows Israel receiving order, rest, and a final warning.";
  let support = ["🏠 The land is being settled", "⚖️ God's law shapes community life", "🙏 Faithfulness still matters after victory"];

  if (section.chapter === 20) {
    lead = "🛡️ Joshua 20 explains the cities of refuge for accidental killing.";
    support = ["⚖️ Justice must be careful", "🏙️ Safe cities are appointed", "🩸 Human life is treated seriously"];
  } else if (section.chapter === 21) {
    lead = "🏠 Joshua 21 gives cities to the Levites and celebrates fulfilled promise.";
    support = ["🎲 Land is assigned by lot", "👨‍👩‍👦 Levite families receive cities", "✅ God's promises are shown to be reliable"];
  } else if (section.chapter === 22) {
    lead = "🤝 Joshua 22 tests Israel's unity through a dangerous misunderstanding.";
    support = ["🏗️ An altar raises alarm", "🗣️ The tribes must explain themselves", "🙏 True worship must stay one-hearted"];
  } else if (section.chapter === 23) {
    lead = "👴 Joshua 23 is an old leader's final warning to remain loyal to the LORD.";
    support = ["⏳ Rest has been given", "🚫 Idolatry must still be refused", "⚖️ Covenant blessing and covenant warning are both real"];
  }

  if (/lord also spake unto joshua saying/.test(lower)) {
    opening = [
      "God is the one opening this law for Joshua to carry out.",
      "The phrase reminds the reader that cities of refuge are God's command, not a human invention.",
    ];
  } else if (/the lord also spake unto joshua/.test(lower)) {
    opening = [
      "The instruction about refuge begins with the LORD speaking directly to Joshua.",
      "That matters because justice in Israel is supposed to follow God's word first.",
    ];
  } else if (/appoint out for you cities of refuge/.test(lower)) {
    opening = [
      "Cities of refuge were safe places for someone who had killed a person accidentally.",
      "The phrase means Joshua must set those cities apart so judgment can happen before revenge does.",
    ];
  } else if (/out for you cities of refuge whereof/.test(lower)) {
    opening = [
      "The wording points to refuge cities that had already been described earlier by God.",
      "Joshua is not making up a new idea here; he is carrying out an older command.",
    ];
  } else if (/for you cities of refuge whereof i/.test(lower)) {
    opening = [
      "The command is being repeated so Israel will actually establish those refuge cities.",
      "The phrase ties the present action to what God had already said before.",
    ];
  } else if (/you cities of refuge whereof i spake/.test(lower)) {
    opening = [
      "The line reaches back to the earlier teaching about refuge for accidental killers.",
      "It shows continuity between Moses' law and Joshua's obedience.",
    ];
  } else if (/cities of refuge whereof i spake unto/.test(lower)) {
    opening = [
      "This wording recalls the same refuge law God had spoken through Moses.",
      "Joshua is now putting that protection into the life of the land.",
    ];
  } else if (/thither and not die by the hand/.test(lower)) {
    opening = [
      "Thither means the manslayer can flee there and avoid immediate revenge.",
      "The basic mercy of the refuge city is protection until the case is heard.",
    ];
  } else if (/not die by the hand of the/.test(lower)) {
    opening = [
      "The refuge city keeps the accused person from being killed too quickly by the avenger.",
      "The phrase protects against bloodshed before a careful judgment is made.",
    ];
  } else if (/die by the hand of the avenger/.test(lower)) {
    opening = [
      "The avenger is the family member seeking justice for the dead relative.",
      "The phrase says that even grief and anger must not outrun due process.",
    ];
  } else if (/by the hand of the avenger of/.test(lower)) {
    opening = [
      "Avenger of blood means the relative responsible to answer a death within the family.",
      "That is why refuge cities were needed in Israel's justice system.",
    ];
  } else if (/hand of the avenger of blood until/.test(lower)) {
    opening = [
      "The manslayer is protected from the avenger of blood until judgment can be made publicly.",
      "The phrase balances mercy with accountability instead of choosing one without the other.",
    ];
  } else if (/and not die by the hand of/.test(lower)) {
    opening = [
      "This line repeats the protection built into the refuge system.",
      "The point is that a life should not be taken before the community has heard the case.",
    ];
  } else if (/the hand of the avenger of blood/.test(lower)) {
    opening = [
      "The hand of the avenger of blood means the reach of family revenge after a killing.",
      "That is the danger the refuge city was meant to stop.",
    ];
  } else if (/land of canaan saying the lord commanded/.test(lower)) {
    opening = [
      "The Levites speak inside Canaan because the land has now been received and can be distributed.",
      "The phrase begins their request for the towns God had already promised them.",
    ];
  } else if (/of canaan saying the lord commanded by/.test(lower)) {
    opening = [
      "The request for Levite cities rests on a command already given earlier by God.",
      "This allotment is obedience, not a late negotiation.",
    ];
  } else if (/canaan saying the lord commanded by the/.test(lower)) {
    opening = [
      "The Levites are reminding Israel that their cities were part of the plan from the start.",
      "The phrase keeps the city request rooted in God's command rather than human preference.",
    ];
  } else if (/saying the lord commanded by the hand/.test(lower)) {
    opening = [
      "By the hand of Moses means God gave this instruction through Moses earlier.",
      "The phrase connects Joshua's land division to the law that came before it.",
    ];
  } else if (/lord commanded by the hand of moses/.test(lower) && section.reference === "Joshua 21:1-6") {
    opening = [
      "The Levites appeal to a command God had given through Moses long before the land was settled.",
      "Israel is now finishing an old obligation instead of starting a new one.",
    ];
  } else if (/lord commanded by the hand of moses/.test(lower) && section.reference === "Joshua 21:7-12") {
    opening = [
      "The lots for these Levite families still rest on a command God had given through Moses.",
      "The city assignments are unfolding as part of that earlier instruction.",
    ];
  } else if (/lord commanded by the hand of moses/.test(lower) && section.chapter === 21) {
    opening = [
      "These Levite cities were commanded by God through Moses long before this moment.",
      "The allotment is completing an old covenant instruction.",
    ];
  } else if (/inheritance at the commandment of the lord/.test(lower)) {
    opening = [
      "The Levites receive cities as an inheritance because the LORD ordered it that way.",
      "Their place in Israel is different from the land-heavy tribes, but it is still a true inheritance.",
    ];
  } else if (/at the commandment of the lord these/.test(lower)) {
    opening = [
      "These cities are being given because the LORD commanded them to be given.",
      "The phrase turns a list of towns into an act of obedience.",
    ];
  } else if (/cities with their suburbs as the lord/.test(lower)) {
    opening = [
      "Suburbs here means the surrounding pastureland that belonged with each city.",
      "The Levites were given room to live and keep their animals, not city names only.",
    ];
  } else if (/their suburbs as the lord commanded by/.test(lower)) {
    opening = [
      "The pasturelands around the cities were included because God had specified that detail.",
      "The phrase makes the Levites' provision practical and complete.",
    ];
  } else if (/suburbs as the lord commanded by the/.test(lower)) {
    opening = [
      "The land around the city matters because Levite life required more than houses alone.",
      "God's command covered both the city and its surrounding support land.",
    ];
  } else if (/as the lord commanded by the hand/.test(lower)) {
    opening = [
      "This city distribution follows a command passed on through Moses.",
      "The phrase keeps the allotment tied to God's prior instruction.",
    ];
  } else if (/with their suburbs as the lord commanded/.test(lower)) {
    opening = [
      "With their suburbs means the cities came with the nearby pasturelands attached to them.",
      "The Levites received workable places to live, not empty labels on a map.",
    ];
  } else if (/the lord commanded by the hand of/.test(lower) && section.reference === "Joshua 21:7-12") {
    opening = [
      "The lot for these Levite families follows the same command God had already given through Moses.",
      "The phrase stresses continuity between God's law and Israel's settlement.",
    ];
  } else if (/suburbs to be a city of refuge/.test(lower)) {
    opening = [
      `${cityContext.refugeCity} is being named as a refuge city together with its surrounding pastureland for ${cityContext.clan}.`,
      "Refuge was tied to an actual settled place, not just a legal idea.",
    ];
  } else if (/to be a city of refuge for/.test(lower)) {
    if (section.reference === "Joshua 21:13-18") {
      opening = [
        "Hebron served as a city of refuge inside Aaron's priestly allotment.",
        "That city gave legal protection while also belonging to the priestly line.",
      ];
    } else if (section.reference === "Joshua 21:19-24") {
      opening = [
        "Shechem in Ephraim served as a city of refuge inside Kohath's city list.",
        "That city gave legal protection while also belonging to a Levite clan.",
      ];
    } else if (section.reference === "Joshua 21:25-30") {
      opening = [
        "Golan in Bashan served as a city of refuge inside Gershon's allotment.",
        "That city gave legal protection while also belonging to a Levite clan.",
      ];
    } else if (section.reference === "Joshua 21:31-36") {
      opening = [
        "Kedesh in Galilee served as a city of refuge inside this northern Levite allotment.",
        "That city gave legal protection while also belonging to a Levite clan.",
      ];
    } else {
      opening = [
        "Ramoth in Gilead served as a city of refuge inside Merari's eastern allotment.",
        "That city gave legal protection while also belonging to a Levite clan.",
      ];
    }
  } else if (/be a city of refuge for the/.test(lower)) {
    opening = [
      `${cityContext.refugeCity} is described as protection for the manslayer until proper judgment.`,
      "The phrase joins geography with justice in one short line.",
    ];
  } else if (/a city of refuge for the slayer/.test(lower)) {
    if (section.reference === "Joshua 21:13-18") {
      opening = [
        "A slayer here means someone responsible for a death, especially one not done on purpose, and Hebron sheltered that person.",
        "That protective role explains why the city mattered so much in Israel's law.",
      ];
    } else if (section.reference === "Joshua 21:31-36") {
      opening = [
        "A slayer here means someone responsible for a death, especially one not done on purpose, and Kedesh sheltered that person.",
        "That protective role explains why the city mattered so much in Israel's law.",
      ];
    } else {
      opening = [
        "A slayer here means someone responsible for a death, especially one not done on purpose, and Ramoth sheltered that person.",
        "That protective role explains why the city mattered so much in Israel's law.",
      ];
    }
  } else if (/city of refuge for the slayer and/.test(lower)) {
    opening = [
      `${cityContext.refugeCity} is listed first because refuge was one of the key reasons this city mattered.`,
      `The phrase then moves on to neighboring towns like ${cityContext.neighboringCity}.`,
    ];
  } else if (/of refuge for the slayer and libnah/.test(lower)) {
    opening = [
      "Libnah is named beside Hebron in the priestly city list.",
      "The refuge city sat within a larger group of towns given to Aaron's line.",
    ];
  } else if (/refuge for the slayer and libnah with/.test(lower)) {
    opening = [
      "Libnah comes with her suburbs, meaning the town includes its surrounding pastureland.",
      "The phrase keeps the priestly inheritance concrete and livable.",
    ];
  } else if (/of the children of kohath the levites/.test(lower)) {
    opening = [
      "Kohath was one of the main Levite family branches.",
      "The phrase introduces the remaining Kohathites as they receive their own towns.",
    ];
  } else if (/children of kohath the levites which remained/.test(lower)) {
    opening = [
      "Which remained means this is the part of Kohath's line not already covered in the priestly allotment.",
      "The phrase keeps the family divisions within Levi clear.",
    ];
  } else if (/of kohath the levites which remained of/.test(lower)) {
    opening = [
      "The wording narrows the allotment to a specific part of Kohath's descendants.",
      "Another city list is still needed after Aaron's cities were named.",
    ];
  } else if (/kohath the levites which remained of the/.test(lower)) {
    opening = [
      "The remaining Kohathites are Levites, but not the priestly branch of Aaron.",
      "The phrase distinguishes one Levite group from another inside the same tribe.",
    ];
  } else if (/levites which remained of the children of/.test(lower)) {
    opening = [
      "This line keeps tracing which Levite family branch is receiving the cities.",
      "The phrase matters because Levi's inheritance is divided by clans, not by one single block of land.",
    ];
  } else if (/ephraim to be a city of refuge/.test(lower)) {
    opening = [
      "Shechem in Ephraim is again marked as a city of refuge.",
      "Refuge cities were spread across the land so people could actually reach them.",
    ];
  } else if (/gershon of the families of the levites/.test(lower)) {
    opening = [
      "Gershon was another major Levite family branch receiving cities.",
      "The phrase begins that family's portion within Israel's tribal map.",
    ];
  } else if (/of the families of the levites out/.test(lower)) {
    opening = [
      "The city allotment is being drawn out for one Levite family from the larger tribe of Levi.",
      "The phrase keeps the reader focused on family distribution, not random geography.",
    ];
  } else if (/families of the levites out of the/.test(lower)) {
    opening = [
      "The phrase continues the division of cities by Levite family lines.",
      "Each branch receives its own set of places rather than sharing everything without order.",
    ];
  } else if (/of the levites out of the other/.test(lower)) {
    opening = [
      "The other half tribe here means the eastern and western split within Manasseh's territory.",
      "Levite cities were being gathered from several tribal regions.",
    ];
  } else if (/levites out of the other half tribe/.test(lower)) {
    opening = [
      "The Levites are receiving towns out of half Manasseh as part of their scattered inheritance.",
      "The phrase reminds the reader that Levite cities were spread throughout Israel.",
    ];
  } else if (/of refuge for the slayer and hammoth-dor/.test(lower)) {
    opening = [
      "Hammoth-dor is named alongside Kedesh in this northern Levite list.",
      "The refuge city stands inside a broader group of assigned towns.",
    ];
  } else if (/refuge for the slayer and hammoth-dor with/.test(lower)) {
    opening = [
      "Hammoth-dor is given with her suburbs, meaning the city came with surrounding land.",
      "The phrase keeps the inheritance practical instead of abstract.",
    ];
  } else if (/of refuge for the slayer and mahanaim/.test(lower)) {
    opening = [
      "Mahanaim is listed near Ramoth in the east-Jordan Levite towns.",
      "The refuge city is surrounded by other real places within the same allotment.",
    ];
  } else if (/refuge for the slayer and mahanai?m with/.test(lower)) {
    opening = [
      "Mahanaim comes with its suburbs, so the city includes the land needed to support life there.",
      "The phrase turns the list into a real inheritance rather than a bare catalog.",
    ];
  } else if (/lord gave unto israel all the land/.test(lower)) {
    opening = [
      "This line says God truly gave Israel the land He had sworn to give.",
      "The phrase is Joshua's big summary after all the city lists and allotments.",
    ];
  } else if (/lord gave them rest round about according/.test(lower)) {
    opening = [
      "Rest round about means Israel had relief from enemies on every side.",
      "The phrase describes a settled peace given by God, not merely a pause in paperwork.",
    ];
  } else if (/all their enemies before them the lord/.test(lower)) {
    opening = [
      "The LORD is the one placed at the center of Israel's victories here.",
      "The phrase reminds the reader that the enemies fell because God acted for His people.",
    ];
  } else if (/their enemies before them the lord delivered/.test(lower)) {
    opening = [
      "Delivered here means handed the enemies over into Israel's power.",
      "Israel's security came from God's intervention.",
    ];
  } else if (/enemies before them the lord delivered all/.test(lower)) {
    opening = [
      "The wording emphasizes the completeness of God's help against Israel's enemies.",
      "The phrase points to victory that matches what God had promised.",
    ];
  } else if (/before them the lord delivered all their/.test(lower)) {
    opening = [
      "The LORD is shown going ahead of Israel and defeating what stood against them.",
      "The phrase keeps the story centered on divine faithfulness rather than human strength.",
    ];
  } else if (/them the lord delivered all their enemies/.test(lower)) {
    opening = [
      "Joshua is summing up Israel's story by saying God gave victory over every enemy in view.",
      "The phrase supports the chapter's larger claim that God's good word did not fail.",
    ];
  } else if (/moses the servant of the lord commanded/.test(lower)) {
    opening = [
      "Joshua begins by reminding the eastern tribes that they finished the duty Moses had assigned them.",
      "The phrase honors obedience that lasted beyond one leader's lifetime.",
    ];
  } else if (/servant of the lord commanded you and/.test(lower)) {
    opening = [
      "Moses is called the LORD's servant because his command carried God's authority.",
      "The phrase praises these tribes for doing what had been required of them.",
    ];
  } else if (/of the lord commanded you and have/.test(lower)) {
    opening = [
      "The eastern tribes are being commended for obedience, not merely for military success.",
      "The phrase says they did what God's servant had charged them to do.",
    ];
  } else if (/lord commanded you and have obeyed my/.test(lower)) {
    opening = [
      "Joshua links Moses' earlier command and his own present leadership in one line.",
      "Steady obedience is being honored across changing leaders.",
    ];
  } else if (/charge of the commandment of the lord/.test(lower)) {
    opening = [
      "Charge means a duty or responsibility laid on someone.",
      "The phrase says these tribes had carefully kept what the LORD required of them.",
    ];
  } else if (/of the commandment of the lord your/.test(lower)) {
    opening = [
      "The wording points to a duty belonging directly to the LORD their God.",
      "That is why Joshua treats their obedience as a serious covenant matter.",
    ];
  } else if (/now the lord your god hath given/.test(lower)) {
    opening = [
      "Joshua says the LORD has now given rest to their brothers in the land.",
      "That means the eastern tribes may finally return home because their mission is complete.",
    ];
  } else if (/according to the word of the lord/.test(lower)) {
    opening = [
      "This line says the eastern inheritance was received exactly as the LORD had spoken.",
      "The phrase makes their possession an act of fulfilled promise.",
    ];
  } else if (/to the word of the lord by/.test(lower)) {
    opening = [
      "By the word of the LORD means the land east of Jordan was not a human shortcut.",
      "The phrase says that inheritance rested on divine instruction.",
    ];
  } else if (/word of the lord by the hand/.test(lower)) {
    opening = [
      "By the hand of Moses means God used Moses as the one who delivered the command.",
      "The phrase ties the eastern tribes' land directly to God's prior word.",
    ];
  } else if (/of the lord by the hand of/.test(lower)) {
    opening = [
      "The line reaches back to Moses as the mediator of God's command about this land.",
      "The phrase keeps the settlement east of Jordan inside the main covenant story.",
    ];
  } else if (/lord by the hand of moses/.test(lower) && section.chapter === 22) {
    opening = [
      "The LORD had already assigned this inheritance through Moses before Joshua's later campaigns.",
      "That is why these tribes can return home without shame.",
    ];
  } else if (/the word of the lord by the/.test(lower)) {
    opening = [
      "The inheritance is being framed as fulfillment of God's spoken word.",
      "The phrase keeps possession tied to promise rather than to tribal self-claim.",
    ];
  } else if (/they were possessed according to the word/.test(lower)) {
    opening = [
      "Possessed means these tribes actually held the land God had assigned them.",
      "The phrase says their eastern territory came in line with God's word, not against it.",
    ];
  } else if (/saith the whole congregation of the lord/.test(lower)) {
    opening = [
      "The western tribes speak as one body because they think a serious covenant breach may be happening.",
      "The phrase gives their accusation a public and solemn weight.",
    ];
  } else if (/whole congregation of the lord what trespass/.test(lower)) {
    opening = [
      "Trespass here means an act of covenant unfaithfulness against God.",
      "The altar by Jordan was being interpreted very seriously.",
    ];
  } else if (/congregation of the lord what trespass is/.test(lower)) {
    opening = [
      "The question is not about a small mistake but about possible rebellion in worship.",
      "The phrase turns the altar into a national spiritual crisis.",
    ];
  } else if (/of the lord what trespass is this/.test(lower)) {
    opening = [
      "The phrase asks what kind of betrayal this altar might represent.",
      "The concern is that a rival worship center would break covenant loyalty.",
    ];
  } else if (/lord what trespass is this that ye/.test(lower)) {
    opening = [
      "The western tribes fear the eastern tribes may have turned away from following the LORD.",
      "That is why they confront them so directly.",
    ];
  } else if (/ye have committed against the god of/.test(lower)) {
    opening = [
      "Committed against the God of Israel means done something that offends covenant worship itself.",
      "The charge is theological before it is political.",
    ];
  } else if (/have committed against the god of israel/.test(lower)) {
    opening = [
      "The accusation is that the altar is not just a bad idea but a sin against Israel's God.",
      "The phrase reveals how dangerous false worship looked to the leaders.",
    ];
  } else if (/possession of the lord wherein the lord s/.test(lower)) {
    opening = [
      "Possession of the LORD means the land where the tabernacle stands and official worship is centered.",
      "The phrase offers a drastic solution: better to move west than to break covenant.",
    ];
  } else if (/of the lord wherein the lord s tabernacle/.test(lower)) {
    opening = [
      "The tabernacle marks the place of recognized worship before the LORD.",
      "The phrase says shared worship matters more than keeping comfortable distance.",
    ];
  } else if (/lord wherein the lord s tabernacle dwelleth and/.test(lower)) {
    opening = [
      "The western leaders are saying, in effect, come live nearer the tabernacle if distance is the problem.",
      "They are guarding one altar and one worship center with great seriousness.",
    ];
  } else if (/wherein the lord s tabernacle dwelleth and take/.test(lower)) {
    opening = [
      "Take possession among us means the western tribes are willing to share land to protect covenant unity.",
      "The phrase is costly because it offers fellowship before convenience.",
    ];
  } else if (/lord s tabernacle dwelleth and take possession among/.test(lower)) {
    opening = [
      "The line offers the eastern tribes a place near the tabernacle rather than separation from it.",
      "The phrase makes clear that worship unity matters more than border lines.",
    ];
  } else if (/land of the possession of the lord/.test(lower)) {
    opening = [
      "This phrase describes the western land as the place especially identified with the LORD's worship.",
      "The point is not that God ignores the east, but that the tabernacle stands in the west.",
    ];
  } else if (/of the possession of the lord wherein/.test(lower)) {
    opening = [
      "The possession of the LORD is the land where covenant worship is visibly centered.",
      "This is why the western tribes think relocation would be better than rebellion.",
    ];
  } else if (/for the lord hath made jordan a/.test(lower)) {
    opening = [
      "The eastern tribes explain that the Jordan could become a future barrier between their children and the rest of Israel.",
      "The phrase begins the reason they built the altar as a witness.",
    ];
  } else if (/lord hath made jordan a border between/.test(lower)) {
    opening = [
      "A border can separate people not only politically but spiritually in the next generation.",
      "Their fear is that geography may one day weaken covenant identity.",
    ];
  } else if (/ye have no part in the lord/.test(lower)) {
    opening = [
      "No part in the LORD means no share in His worship and covenant life.",
      "The phrase names the exclusion the eastern tribes are afraid their children may hear.",
    ];
  } else if (/have no part in the lord so/.test(lower)) {
    opening = [
      "The fear is that one harsh sentence could cut their descendants off from belonging.",
      "That is why they wanted a public witness of unity.",
    ];
  } else if (/no part in the lord so shall/.test(lower)) {
    opening = [
      "The phrase imagines future generations being told they do not belong to the LORD's people.",
      "That is the deeper problem the altar was meant to answer.",
    ];
  } else if (/part in the lord so shall your/.test(lower)) {
    opening = [
      "The concern is about children and grandchildren losing their recognized place in covenant worship.",
      "The phrase makes the altar about memory and identity, not rival sacrifice.",
    ];
  } else if (/in the lord so shall your children/.test(lower)) {
    opening = [
      "The eastern tribes are thinking ahead to their children, not just defending themselves in the present.",
      "That is why a witness altar seemed necessary to them.",
    ];
  } else if (/this day we perceive that the lord/.test(lower)) {
    opening = [
      "Phinehas now recognizes that the LORD is present among them because no rebellion has occurred.",
      "The phrase marks the turning point from suspicion to peace.",
    ];
  } else if (/day we perceive that the lord is/.test(lower)) {
    opening = [
      "Perceive means they now understand the true meaning of the altar.",
      "Careful listening has corrected a dangerous misunderstanding.",
    ];
  } else if (/we perceive that the lord is among/.test(lower)) {
    opening = [
      "The LORD is among us means God has not been pushed away by covenant unfaithfulness here.",
      "The phrase expresses relief that the tribes still stand together under Him.",
    ];
  } else if (/perceive that the lord is among us/.test(lower)) {
    opening = [
      "The leaders conclude that God's presence remains with Israel in this matter.",
      "The phrase is a verdict of restored trust, not merely a polite closing.",
    ];
  } else if (/lord is among us because ye have/.test(lower)) {
    opening = [
      "The eastern tribes are cleared because they did not build the altar as an act of rebellion.",
      "The phrase links God's presence with covenant faithfulness.",
    ];
  } else if (/not committed this trespass against the lord/.test(lower)) {
    opening = [
      "Trespass means a serious breach against the LORD's covenant.",
      "The phrase says that, after hearing them, the leaders no longer believe that sin was committed.",
    ];
  } else if (/committed this trespass against the lord now/.test(lower)) {
    opening = [
      "The crisis ends because the feared trespass turns out not to be real.",
      "The phrase closes the conflict with relief instead of judgment.",
    ];
  } else if (/a long time after that the lord/.test(lower)) {
    opening = [
      "Joshua's final speech comes long after the main wars, when the land has largely settled.",
      "The phrase places his warning in a season of peace, not panic.",
    ];
  } else if (/long time after that the lord had/.test(lower)) {
    opening = [
      "The long stretch of time matters because faith must endure after big victories are over.",
      "The phrase says Joshua is speaking to a people who could now grow comfortable.",
    ];
  } else if (/time after that the lord had given/.test(lower)) {
    opening = [
      "Given rest means God had already done the hard work of securing Israel in the land.",
      "The phrase prepares for Joshua's warning not to waste that gift.",
    ];
  } else if (/after that the lord had given rest/.test(lower)) {
    opening = [
      "Rest does not mean Israel can now ignore the covenant.",
      "The phrase sets up the danger of drifting after peace arrives.",
    ];
  } else if (/lord had given rest unto israel from/.test(lower)) {
    opening = [
      "The LORD is credited with the peace Israel enjoys from surrounding enemies.",
      "The phrase reminds the reader that rest is another gift of covenant faithfulness.",
    ];
  } else if (/for their heads and for their judges/.test(lower)) {
    opening = [
      "Joshua gathers the nation's leaders because this warning must be heard by those who guide the people.",
      "Heads and judges are part of the governing structure of Israel.",
    ];
  } else if (/their heads and for their judges and/.test(lower)) {
    opening = [
      "The line keeps naming leaders to show that Joshua's final words are formally addressed, not casual.",
      "The phrase gives the speech public weight and accountability.",
    ];
  } else if (/mention of the names of their gods/.test(lower)) {
    opening = [
      "Joshua warns Israel not to even bring the pagan gods into normal speech for worship or oath.",
      "The phrase goes after compromise at its earliest stage.",
    ];
  } else if (/of the names of their gods nor/.test(lower)) {
    opening = [
      "The warning is not only against bowing to idols but also against honoring them with speech.",
      "The phrase teaches that loyalty to God includes the tongue as well as the altar.",
    ];
  } else if (/names of their gods nor cause to/.test(lower)) {
    opening = [
      "Cause to swear means binding people with oaths taken in the name of false gods.",
      "The phrase forbids giving idols religious legitimacy.",
    ];
  } else if (/of their gods nor cause to swear/.test(lower)) {
    opening = [
      "Joshua is shutting down shared religious language with the nations around Israel.",
      "The phrase says false gods must not be treated as oath-worthy at all.",
    ];
  } else if (/their gods nor cause to swear by/.test(lower)) {
    opening = [
      "To swear by a god is to treat that god as a real authority over truth.",
      "The phrase forbids that kind of recognition for idols.",
    ];
  } else if (/gods nor cause to swear by them/.test(lower)) {
    opening = [
      "The phrase blocks Israel from mixing covenant faith with pagan religious practice.",
      "Even verbal acts of allegiance to idols are off limits.",
    ];
  } else if (/but cleave unto the lord your god/.test(lower)) {
    opening = [
      "Cleave means hold fast with loyal attachment.",
      "The phrase tells Israel to stay personally and covenantally joined to the LORD.",
    ];
  } else if (/know for a certainty that the lord/.test(lower)) {
    opening = [
      "Joshua wants this warning to be taken as certain, not hypothetical.",
      "The phrase introduces consequences Israel should not doubt.",
    ];
  } else if (/for a certainty that the lord your/.test(lower)) {
    opening = [
      "For a certainty means with full assurance.",
      "The phrase says the covenant consequences will be real if Israel turns back.",
    ];
  } else if (/a certainty that the lord your god/.test(lower)) {
    opening = [
      "The warning rests on the character of the LORD their God, not on empty fear tactics.",
      "The phrase says the same God who gave blessing can also enforce covenant judgment.",
    ];
  } else if (/certainty that the lord your god will/.test(lower)) {
    opening = [
      "Joshua is describing what God will do if Israel clings to the remaining nations.",
      "The phrase turns the warning from abstract principle into coming consequence.",
    ];
  } else if (/lord your god will no more drive/.test(lower)) {
    opening = [
      "No more drive out means God will stop removing those nations for Israel.",
      "The phrase warns that compromise can freeze further help.",
    ];
  } else if (/your god will no more drive out/.test(lower)) {
    opening = [
      "The loss described here is not merely military; it is the withdrawal of covenant help.",
      "This shows how dangerous it is to turn back toward the nations.",
    ];
  } else if (/god will no more drive out any/.test(lower)) {
    opening = [
      "Joshua warns that the nations left in the land will remain if Israel chooses compromise.",
      "The phrase closes the speech with a serious picture of consequences.",
    ];
  }

  return note([opening[0], opening[1], lead, ...support]);
}

function explainDay62JoshuaAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: [string, string] = [
    `Joshua 24 uses the wording "${cleanTitle}" inside Israel's covenant renewal at Shechem.`,
    "The line belongs to Joshua's final effort to make the people remember, choose, and obey the LORD.",
  ];
  const lead = "📜 Joshua 24 retells Israel's story and presses the people to choose whom they will serve.";
  const support = ["🧠 God's past acts are being remembered", "🙏 Covenant loyalty is being demanded", "🪦 Joshua's final days close one generation of leadership"];

  if (/for their heads and for their judges/.test(lower)) {
    opening = ["Joshua gathers Israel's leaders first because covenant responsibility falls heavily on those who guide the people.", "Heads and judges are named so this renewal is public, ordered, and accountable."];
  } else if (/their heads and for their judges and/.test(lower)) {
    opening = ["The list of leaders keeps widening so the whole nation is represented before God.", "Joshua is not speaking to private individuals only but to Israel's public leadership."];
  } else if (/heads and for their judges and for/.test(lower)) {
    opening = ["This wording keeps naming leadership groups because covenant faithfulness reaches into public life.", "Joshua wants the nation's leaders hearing the charge together."];
  } else if (/for their judges and for their officers/.test(lower)) {
    opening = ["Judges and officers were responsible to help order Israel's life under God's law.", "Joshua is placing the covenant call before real decision-makers."];
  } else if (/their judges and for their officers and/.test(lower)) {
    opening = ["The line continues the formal roll call of leaders gathered at Shechem.", "The covenant renewal is meant to be nationally binding, not loosely personal."];
  } else if (/judges and for their officers and they/.test(lower)) {
    opening = ["The leaders are not just present; they are assembled to answer before God.", "Joshua is turning the gathering into a solemn covenant meeting."];
  } else if (/officers and they presented themselves before god/.test(lower)) {
    opening = ["Presented themselves before God means Israel's leaders stood in God's presence for this covenant moment.", "The scene is an act of accountability, not only a political meeting."];
  } else if (/they cried unto the lord he put/.test(lower)) {
    opening = ["Joshua is retelling the moment Israel cried out in Egypt and the LORD answered.", "The line begins a memory of rescue, not a vague history lesson."];
  } else if (/cried unto the lord he put darkness/.test(lower)) {
    opening = ["The darkness points back to God's intervention against Egypt during the exodus.", "Joshua is reminding Israel that their freedom came through the LORD's direct action."];
  } else if (/lord he put darkness between you and/.test(lower)) {
    opening = ["God Himself stood between Israel and the Egyptians in the exodus crisis.", "The wording describes protective separation created by the LORD."];
  } else if (/he put darkness between you and the/.test(lower)) {
    opening = ["The darkness was a barrier God placed between His people and their oppressors.", "Joshua uses the image to make deliverance feel concrete again."];
  } else if (/put darkness between you and the egyptians/.test(lower)) {
    opening = ["The Egyptians could not simply overrun Israel because God intervened between them.", "The line highlights rescue by divine power, not escape by human cleverness."];
  } else if (/darkness between you and the egyptians and/.test(lower)) {
    opening = ["Joshua is still describing the exodus rescue in vivid physical terms.", "The darkness makes clear that God actively shielded His people."];
  } else if (/balak the son of zippor king of/.test(lower)) {
    opening = ["Balak was the Moabite king who tried to use Balaam against Israel.", "Joshua includes him to remind the people that God protected them from curses as well as armies."];
  } else if (/now therefore fear the lord and serve/.test(lower)) {
    opening = ["Now therefore means Joshua is drawing a conclusion from everything God has done for Israel.", "Fear the LORD here means honor Him with reverent loyalty and obedient worship."];
  } else if (/therefore fear the lord and serve him/.test(lower)) {
    opening = ["Joshua says Israel's response to grace must be service, not spiritual drift.", "The line turns remembered mercy into present obligation."];
  } else if (/fear the lord and serve him in/.test(lower)) {
    opening = ["Serving the LORD is not meant to be partial or merely outward.", "Joshua is moving toward wholehearted loyalty."];
  } else if (/lord and serve him in sincerity and/.test(lower)) {
    opening = ["Sincerity means undivided integrity rather than pretending loyalty while keeping idols nearby.", "Joshua is asking for worship that is real all the way through."];
  } else if (/in truth and put away the gods/.test(lower)) {
    opening = ["Truth here means genuine faithfulness rather than mixed worship.", "Putting away false gods is the visible proof that such truth is real."];
  } else if (/truth and put away the gods which/.test(lower)) {
    opening = ["Joshua refuses the idea that Israel can serve the LORD while still keeping inherited idols.", "The line pushes repentance down into household life."];
  } else if (/put away the gods which your fathers/.test(lower)) {
    opening = ["Put away means remove, not merely ignore, the false gods tied to Israel's past.", "Joshua is asking for a clean break from old loyalties."];
  } else if (/people ye cannot serve the lord for/.test(lower)) {
    opening = ["Joshua shocks the people by saying they cannot serve the LORD casually or on their own terms.", "He wants them to feel the weight of the God they are claiming to choose."];
  } else if (/ye cannot serve the lord for he/.test(lower)) {
    opening = ["Ye cannot serve the LORD means covenant loyalty is too serious for empty enthusiasm.", "Joshua is exposing shallow confidence before he confirms their commitment."];
  } else if (/cannot serve the lord for he is/.test(lower)) {
    opening = ["The problem is not that God is impossible to obey, but that He is too holy for divided worship.", "Joshua is warning them against speaking faster than they are willing to live."];
  } else if (/serve the lord for he is an/.test(lower)) {
    opening = ["Joshua grounds the warning in God's character, not in Israel's feelings.", "Service must fit the holiness of the One being served."];
  } else if (/lord for he is an holy god/.test(lower)) {
    opening = ["An holy God means the LORD is morally pure and set apart from all idols.", "That holiness makes covenant rebellion a serious matter."];
  } else if (/for he is an holy god he/.test(lower)) {
    opening = ["Joshua is stacking descriptions of God so the people do not treat this covenant lightly.", "The line keeps pressing the seriousness of God's nature."];
  } else if (/he is an holy god he is/.test(lower)) {
    opening = ["The repetition slows the people down and forces them to face who God really is.", "Joshua wants awe to shape their answer before they speak."];
  } else if (/so joshua made a covenant with the/.test(lower)) {
    opening = ["Joshua does more than end with words; he formalizes Israel's response in a covenant.", "The line turns verbal promise into public commitment."];
  } else if (/joshua made a covenant with the people/.test(lower)) {
    opening = ["A covenant is a binding relationship marked by solemn obligation before God.", "Joshua is fixing Israel's choice into a recognized act of commitment."];
  } else if (/made a covenant with the people that/.test(lower)) {
    opening = ["The covenant is happening on that specific day because Joshua wants the moment remembered.", "Israel is being tied to a concrete act of promise, not a drifting intention."];
  } else if (/a covenant with the people that day/.test(lower)) {
    opening = ["That day matters because covenant renewal is tied to history, memory, and witness.", "Joshua is giving Israel a moment they cannot honestly pretend never happened."];
  } else if (/covenant with the people that day and/.test(lower)) {
    opening = ["Joshua pairs covenant commitment with statutes and ordinances so the promise has real shape.", "The line shows that loving God includes ordered obedience."];
  } else if (/book of the law of god and/.test(lower)) {
    opening = ["The book of the law of God is the written covenant standard Israel is meant to live under.", "Joshua anchors the people's promise in God's already-given word."];
  } else if (/of the law of god and took/.test(lower)) {
    opening = ["Joshua adds a visible witness so later generations will know this covenant was publicly made.", "The line moves from spoken promise to memorial sign."];
  } else if (/israel served the lord all the days/.test(lower)) {
    opening = ["This line gives a brief but precious summary of loyalty during Joshua's lifetime.", "Israel did not instantly collapse while leaders remained who remembered God's mighty works."];
  } else if (/served the lord all the days of/.test(lower)) {
    opening = ["Joshua's generation is remembered for continuing in service to the LORD.", "The line measures faithfulness by the span of a generation."];
  } else if (/lord all the days of joshua and/.test(lower)) {
    opening = ["The wording stretches loyalty beyond Joshua himself to the elders who outlived him.", "Living memory helped preserve covenant faithfulness."];
  } else if (/known all the works of the lord/.test(lower)) {
    opening = ["Known all the works of the LORD means these leaders had firsthand knowledge of what God had done.", "Their obedience was strengthened by remembered experience, not by rumor."];
  } else if (/all the works of the lord that/.test(lower)) {
    opening = ["Joshua ties faithful service to actual knowledge of God's works.", "The line implies that forgetting God opens the door to later drift."];
  } else if (/works of the lord that he had/.test(lower)) {
    opening = ["God's works are the mighty acts by which He rescued and settled His people.", "The line says memory is spiritually protective."];
  } else if (/of the lord that he had done/.test(lower)) {
    opening = ["Joshua ends by pointing back to what God had done rather than to Israel's strength.", "The final emphasis stays on the LORD's deeds, not human achievement."];
  }

  return note([opening[0], opening[1], lead, ...support]);
}

function polishJoshuaSection(section: PersonalLeviticusPhraseSectionInput): PersonalLeviticusPhraseSectionInput {
  if (section.chapter < 20 || section.chapter > 24) return section;

  const title = day61SectionTitles[section.reference] ?? day62JoshuaSectionTitles[section.reference] ?? section.title;
  return {
    ...section,
    title,
    phrases: section.phrases.map(([phraseTitle]) => [
      phraseTitle,
      section.chapter === 24
        ? explainDay62JoshuaAt95(section, stripLeadingEmoji(phraseTitle))
        : explainDay61JoshuaAt95(section, stripLeadingEmoji(phraseTitle)),
    ]) as [string, string][],
  };
}

const day61Day62SupplementalSections = DAY_61_80_JOSHUA_20_24_SUPPLEMENTAL_SECTIONS
  .filter((section) => section.chapter >= 20 && section.chapter <= 24)
  .map(polishJoshuaSection);

export const JOSHUA_20_24_PERSONAL_SECTIONS = [
  ...generatedJoshuaTwentyToTwentyFourPersonalSections.filter((section) => section.chapter < 20 || section.chapter > 24),
  ...day61Day62SupplementalSections,
];
