export type PersonalGenesisPhraseSectionInput = {
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

type PersonalSectionSplit = {
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  phraseIndexes: number[];
};

const SECTION_SPLITS: Record<string, PersonalSectionSplit[]> = {
  "Genesis 11:10-26": [
    { startVerse: 10, endVerse: 17, reference: "Genesis 11:10-17", title: "Shem's Line Continues", phraseIndexes: [0, 1] },
    { startVerse: 18, endVerse: 26, reference: "Genesis 11:18-26", title: "The Line Reaches Abram", phraseIndexes: [1, 2] },
  ],
  "Genesis 12:10-20": [
    { startVerse: 10, endVerse: 13, reference: "Genesis 12:10-13", title: "Abram Acts Out Of Fear", phraseIndexes: [0, 1] },
    { startVerse: 14, endVerse: 20, reference: "Genesis 12:14-20", title: "God Protects Sarai In Egypt", phraseIndexes: [2] },
  ],
  "Genesis 13:8-18": [
    { startVerse: 8, endVerse: 13, reference: "Genesis 13:8-13", title: "Lot Chooses The Plain", phraseIndexes: [0, 1] },
    { startVerse: 14, endVerse: 18, reference: "Genesis 13:14-18", title: "God Repeats The Land Promise", phraseIndexes: [2] },
  ],
  "Genesis 14:1-12": [
    { startVerse: 1, endVerse: 9, reference: "Genesis 14:1-9", title: "Kings Go To War", phraseIndexes: [0] },
    { startVerse: 10, endVerse: 12, reference: "Genesis 14:10-12", title: "Lot Is Taken Captive", phraseIndexes: [1, 2] },
  ],
  "Genesis 14:13-24": [
    { startVerse: 13, endVerse: 16, reference: "Genesis 14:13-16", title: "Abram Rescues Lot", phraseIndexes: [0] },
    { startVerse: 17, endVerse: 24, reference: "Genesis 14:17-24", title: "Melchizedek Blesses Abram", phraseIndexes: [1, 2] },
  ],
  "Genesis 15:7-21": [
    { startVerse: 7, endVerse: 11, reference: "Genesis 15:7-11", title: "Abram Asks For Assurance", phraseIndexes: [0] },
    { startVerse: 12, endVerse: 21, reference: "Genesis 15:12-21", title: "God Cuts The Covenant", phraseIndexes: [1, 2] },
  ],
  "Genesis 17:15-27": [
    { startVerse: 15, endVerse: 22, reference: "Genesis 17:15-22", title: "Sarah And Isaac Are Promised", phraseIndexes: [0, 1, 2] },
    { startVerse: 23, endVerse: 27, reference: "Genesis 17:23-27", title: "Abraham Obeys The Covenant Sign", phraseIndexes: [2] },
  ],
  "Genesis 18:1-15": [
    { startVerse: 1, endVerse: 8, reference: "Genesis 18:1-8", title: "Abraham Welcomes The Visitors", phraseIndexes: [0] },
    { startVerse: 9, endVerse: 15, reference: "Genesis 18:9-15", title: "Sarah Laughs At The Promise", phraseIndexes: [1, 2] },
  ],
  "Genesis 18:16-33": [
    { startVerse: 16, endVerse: 22, reference: "Genesis 18:16-22", title: "The Lord Reveals Sodom's Judgment", phraseIndexes: [0] },
    { startVerse: 23, endVerse: 28, reference: "Genesis 18:23-28", title: "Abraham Begins Pleading For Sodom", phraseIndexes: [0, 1] },
    { startVerse: 29, endVerse: 33, reference: "Genesis 18:29-33", title: "Abraham Pleads Down To Ten", phraseIndexes: [2] },
  ],
  "Genesis 19:1-11": [
    { startVerse: 1, endVerse: 3, reference: "Genesis 19:1-3", title: "Lot Welcomes The Angels", phraseIndexes: [0] },
    { startVerse: 4, endVerse: 11, reference: "Genesis 19:4-11", title: "Sodom Shows Its Wickedness", phraseIndexes: [1, 2] },
  ],
  "Genesis 19:12-22": [
    { startVerse: 12, endVerse: 16, reference: "Genesis 19:12-16", title: "Lot Lingers As Judgment Comes", phraseIndexes: [1, 2] },
    { startVerse: 17, endVerse: 22, reference: "Genesis 19:17-22", title: "Lot Is Told To Escape", phraseIndexes: [0] },
  ],
  "Genesis 19:23-38": [
    { startVerse: 23, endVerse: 29, reference: "Genesis 19:23-29", title: "Sodom Falls", phraseIndexes: [0, 1] },
    { startVerse: 30, endVerse: 38, reference: "Genesis 19:30-38", title: "Lot's Family Breaks", phraseIndexes: [2] },
  ],
  "Genesis 20:8-18": [
    { startVerse: 8, endVerse: 13, reference: "Genesis 20:8-13", title: "Abimelech Confronts Abraham", phraseIndexes: [0, 1] },
    { startVerse: 14, endVerse: 18, reference: "Genesis 20:14-18", title: "Sarah Is Restored", phraseIndexes: [2] },
  ],
};

function expandSplitSections(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.flatMap((section) => {
    const splits = SECTION_SPLITS[section.reference];
    if (!splits) {
      return [section];
    }

    return splits.map((split) => ({
      ...section,
      startVerse: split.startVerse,
      endVerse: split.endVerse,
      reference: split.reference,
      title: split.title,
      phrases: split.phraseIndexes.map((index) => section.phrases[index]).filter(Boolean),
    }));
  });
}

const RAW_GENESIS_11_20_PERSONAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 11,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 11:1-4",
    title: "The Tower Of Babel Begins",
    icon: "🏙️",
    phrases: [
      [
        "🗣️ The Whole Earth Was Of One Language",
        note([
          "Before Babel, humanity is described as having one language and one speech.",
          "That means people could communicate easily and work together quickly.",
          "Unity itself was not the problem.",
          "The problem was what they decided to do with that unity.",
          "Instead of spreading over the earth as God had commanded, they gathered around their own project.",
          "Genesis is showing that people can be united and still be moving in the wrong direction.",
        ]),
      ],
      [
        "🧱 Let Us Make Brick",
        note([
          "The builders make bricks because they are settling in a flat land without natural stone for building.",
          "This detail shows human skill and planning.",
          "They know how to organize materials, labor, and a city project.",
          "The Bible is not saying technology is evil.",
          "It is showing that human ability becomes dangerous when it is used for pride and independence from God.",
          "The bricks become part of a project built around human greatness.",
        ]),
      ],
      [
        "🏷️ Let Us Make Us A Name",
        note([
          "This is the heart of Babel.",
          "The people want a name for themselves.",
          "In plain terms, they want identity, security, and greatness without receiving it from God.",
          "That matters because Genesis 12 will immediately show God promising to make Abram's name great.",
          "Babel grasps for a name; Abram receives one from God.",
          "Genesis is teaching that lasting significance is not seized by pride, but given by God.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 5,
    endVerse: 9,
    reference: "Genesis 11:5-9",
    title: "God Scatters Babel",
    icon: "🔀",
    phrases: [
      [
        "⬇️ The Lord Came Down",
        note([
          "The people build a tower they think reaches toward heaven, but Genesis says God came down to see it.",
          "That line has a little irony in it.",
          "The tower looked huge to people, but it was not impressive from God's view.",
          "Human pride often feels massive to us and small before God.",
          "The Lord is not threatened by Babel.",
          "He comes down as the true authority over human plans.",
        ]),
      ],
      [
        "🗣️ Confound Their Language",
        note([
          "God confuses their language so they cannot keep building together.",
          "This judgment directly touches the thing that made their project possible: shared speech.",
          "The confusion stops their pride from growing into something worse.",
          "God is not being random.",
          "He is breaking the unity they were using for rebellion.",
          "The scattered languages explain why the nations of Genesis 10 are divided by tongues.",
        ]),
      ],
      [
        "🏙️ Babel",
        note([
          "Babel is connected with confusion.",
          "The name becomes a memory of human pride and God's scattering.",
          "Later in the Bible, Babylon grows from this same idea into a symbol of human empire against God.",
          "That makes Babel more than an old building story.",
          "It becomes a pattern.",
          "Whenever people build their lives around their own name instead of God's glory, Babel is still alive in the human heart.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 10,
    endVerse: 26,
    reference: "Genesis 11:10-26",
    title: "The Story Narrows Toward Abram",
    icon: "📜",
    phrases: [
      [
        "📜 These Are The Generations Of Shem",
        note([
          "Genesis now narrows from all the nations back to Shem's family line.",
          "This matters because Abram will come from this line.",
          "After Babel scatters humanity, God begins preparing one family through whom blessing will come.",
          "The genealogy may look slow, but it is moving the story toward the call of Abram.",
          "God's plan does not appear out of nowhere in Genesis 12.",
          "It is being carried quietly through generations.",
        ]),
      ],
      [
        "👶 Begat Sons And Daughters",
        note([
          "This repeated phrase reminds us that the promise story moves through ordinary family life.",
          "Most of these people do not get dramatic stories.",
          "They live, have children, and pass the line forward.",
          "That may feel small, but it matters deeply.",
          "God often works through generations that look ordinary from the outside.",
          "The future of Abram is being preserved through names many readers skip.",
        ]),
      ],
      [
        "👨‍👦 Terah Begat Abram",
        note([
          "Abram is introduced before God speaks to him in Genesis 12.",
          "He is part of a real family with a father, brothers, a wife, and a homeland.",
          "That matters because God's call will ask him to leave much of that behind.",
          "Abram does not float into the story as a religious idea.",
          "He comes from a household with history, grief, and attachments.",
          "Genesis 11 gives us the ground under Abram's obedience.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 27,
    endVerse: 32,
    reference: "Genesis 11:27-32",
    title: "Abram's Family Stops In Haran",
    icon: "🧳",
    phrases: [
      [
        "💔 Haran Died Before His Father",
        note([
          "Abram's brother Haran dies before Terah.",
          "This detail matters because Lot is Haran's son.",
          "When Abram later travels with Lot, he is traveling with a nephew who has already lost his father.",
          "Genesis is quietly giving emotional background.",
          "Abram's family story includes grief before it includes calling.",
          "God's call often comes into families that already carry wounds.",
        ]),
      ],
      [
        "🚫 Sarai Was Barren",
        note([
          "Sarai's barrenness is one of the most important details in Abram's story.",
          "God will promise Abram descendants, but his wife cannot have children.",
          "That means the promise begins in an impossible situation.",
          "Genesis wants the reader to feel the tension early.",
          "The family line God chooses cannot continue by human strength alone.",
          "From the start, Abram's future will depend on God's power.",
        ]),
      ],
      [
        "⏸️ They Came Unto Haran, And Dwelt There",
        note([
          "Terah's family begins moving toward Canaan but stops in Haran.",
          "That unfinished journey matters because Genesis 12 will begin with God calling Abram to keep going.",
          "The story pauses in an in-between place.",
          "They have left Ur, but they have not reached Canaan.",
          "Abram's call will meet him in the middle of an unfinished road.",
          "Sometimes God's next word comes where a family journey has stalled.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 12:1-9",
    title: "God Calls Abram",
    icon: "🚶",
    phrases: [
      [
        "🚶 Get Thee Out",
        note([
          "God calls Abram to leave country, family, and father's house.",
          "That is not a small request in the ancient world.",
          "Family and land were security, identity, and future.",
          "Abram is being called away from what is familiar into a future God will show him.",
          "The call requires trust before Abram knows the whole map.",
          "Faith begins with God's word, not with full information.",
        ]),
      ],
      [
        "🌍 In Thee Shall All Families Of The Earth Be Blessed",
        note([
          "God's promise to Abram is bigger than Abram's private life.",
          "After Babel scattered the nations, God chooses one man through whom blessing will reach all families.",
          "That means election has a mission.",
          "God is not choosing Abram so everyone else is forgotten.",
          "He is choosing Abram as the channel of blessing for the world.",
          "The rest of the Bible keeps moving toward this promise.",
        ]),
      ],
      [
        "⛪ There Builded He An Altar",
        note([
          "Abram responds to God's promise by building an altar.",
          "An altar marks worship, gratitude, and meeting with God.",
          "Abram is not only traveling through the land; he is worshiping in it.",
          "This matters because Canaan is still occupied by others, but Abram is already calling on the Lord there.",
          "The altar becomes a witness that Abram belongs to God.",
          "Where God speaks, Abram worships.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 10,
    endVerse: 20,
    reference: "Genesis 12:10-20",
    title: "Abram Goes Down To Egypt",
    icon: "😨",
    phrases: [
      [
        "🌾 There Was A Famine",
        note([
          "Abram reaches the land of promise and immediately faces famine.",
          "That is important because obedience does not mean life becomes easy.",
          "The promised land can still have pressure.",
          "Abram goes down to Egypt to survive, but fear begins shaping his choices.",
          "Genesis is showing that Abram is a man of faith, but still a man learning faith.",
          "The promise is real even when the land is hard.",
        ]),
      ],
      [
        "👩 Say, I Pray Thee, Thou Art My Sister",
        note([
          "Abram asks Sarai to say she is his sister because he fears being killed.",
          "Genesis 20 later explains there is a family connection, but the point here is still deception.",
          "Abram uses a half-truth to protect himself.",
          "That choice puts Sarai in danger.",
          "Fear can make people protect themselves while exposing someone else.",
          "Genesis does not hide Abram's failure.",
        ]),
      ],
      [
        "🛡️ The Lord Plagued Pharaoh",
        note([
          "God intervenes to protect Sarai and the promise.",
          "Abram's fear created danger, but God did not let Pharaoh keep Sarai.",
          "This matters because the promise depends on the family God is forming.",
          "God is faithful even when Abram acts foolishly.",
          "The rescue does not excuse Abram's deception.",
          "It shows that God's promise is stronger than Abram's weakness.",
        ]),
      ],
    ],
  },
  {
    chapter: 13,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 13:1-7",
    title: "Abram And Lot Outgrow The Land",
    icon: "🐑",
    phrases: [
      [
        "🔙 Abram Went Up Out Of Egypt",
        note([
          "Abram returns from Egypt to the land where he had built an altar.",
          "This feels like a recovery moment after his fearful choices in Egypt.",
          "He comes back to the place of worship.",
          "That matters because failure does not have to be the end of the journey.",
          "Abram returns to the land and calls on the Lord again.",
          "The story moves him back toward promise.",
        ]),
      ],
      [
        "📈 Abram Was Very Rich",
        note([
          "Abram has grown wealthy in animals, silver, and gold.",
          "Wealth in Genesis is often shown through flocks, herds, servants, and metals.",
          "But blessing also creates new challenges.",
          "Abram and Lot have so many possessions that the land cannot support them together.",
          "This phrase teaches that increase can bring pressure too.",
          "The next test is not poverty, but conflict in abundance.",
        ]),
      ],
      [
        "⚔️ There Was A Strife",
        note([
          "The herdsmen of Abram and Lot begin fighting.",
          "The conflict is practical: too many animals need water and grazing land.",
          "But the spiritual test is how Abram will handle it.",
          "He could demand first choice because he is the older and greater figure.",
          "Instead, he will choose peace.",
          "Genesis is showing Abram grow in trust after the fear of Egypt.",
        ]),
      ],
    ],
  },
  {
    chapter: 13,
    startVerse: 8,
    endVerse: 18,
    reference: "Genesis 13:8-18",
    title: "Lot Chooses The Plain",
    icon: "👀",
    phrases: [
      [
        "🤝 Let There Be No Strife",
        note([
          "Abram seeks peace with Lot before the conflict grows.",
          "This matters because family conflict can become destructive if no one steps down.",
          "Abram does not cling to control.",
          "He gives Lot the choice of land.",
          "That is a major act of trust because land is tied to survival and future.",
          "Abram can be generous because he believes God is his provider.",
        ]),
      ],
      [
        "👀 Lot Lifted Up His Eyes",
        note([
          "Lot chooses by what looks good to his eyes.",
          "The plain is well-watered and attractive.",
          "But Genesis also tells us Sodom is nearby and morally wicked.",
          "That tension matters.",
          "Lot sees opportunity, but does not seem to weigh the spiritual danger.",
          "The choice that looks best on the surface will pull him toward trouble.",
        ]),
      ],
      [
        "🌍 All The Land Which Thou Seest",
        note([
          "After Lot separates, God repeats the land promise to Abram.",
          "That timing matters.",
          "Abram gave Lot first choice, but he did not lose God's promise.",
          "God tells Abram to look in every direction because the land will belong to his offspring.",
          "Abram's future does not depend on grabbing the best-looking option.",
          "It depends on God's word.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 1,
    endVerse: 12,
    reference: "Genesis 14:1-12",
    title: "Lot Is Taken Captive",
    icon: "⚔️",
    phrases: [
      [
        "⚔️ Four Kings With Five",
        note([
          "Genesis 14 opens with regional conflict between kings.",
          "This can feel like a sudden war report, but it shows the dangerous world around Abram.",
          "The promised land is not peaceful empty space.",
          "It is full of politics, alliances, rebellion, and violence.",
          "Abram's family is living inside real ancient power struggles.",
          "The covenant promise is unfolding in a messy world.",
        ]),
      ],
      [
        "🏙️ Sodom And Gomorrah",
        note([
          "Sodom and Gomorrah appear here before their judgment in Genesis 19.",
          "Lot has moved near Sodom, and now he is caught in Sodom's trouble.",
          "This is important because Lot's earlier choice is beginning to have consequences.",
          "The place that looked prosperous also places him in danger.",
          "Genesis is not random in naming Sodom here.",
          "It is showing the cost of drifting toward a wicked city.",
        ]),
      ],
      [
        "⛓️ They Took Lot",
        note([
          "Lot is captured because he is living in Sodom.",
          "This is the first major danger connected to his choice of location.",
          "Abram's nephew is now pulled into a war he did not start.",
          "The phrase reminds us that where we settle can shape what we get caught in.",
          "Lot's trouble becomes Abram's rescue mission.",
          "Family ties still matter even after separation.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 13,
    endVerse: 24,
    reference: "Genesis 14:13-24",
    title: "Abram Rescues Lot",
    icon: "🛡️",
    phrases: [
      [
        "🏃 Abram The Hebrew",
        note([
          "This is the first time Abram is called the Hebrew.",
          "It marks him as distinct among the peoples around him.",
          "Abram is not a king like the others in the chapter, but he acts with courage and loyalty.",
          "He hears Lot is captured and moves to rescue him.",
          "The title reminds us that Abram is a stranger in the land, yet God is with him.",
          "His identity is tied to the promise, not to local power.",
        ]),
      ],
      [
        "🍞 Melchizedek King Of Salem",
        note([
          "Melchizedek appears suddenly as king of Salem and priest of the Most High God.",
          "His name is connected with righteousness, and Salem is connected with peace.",
          "He blesses Abram after the rescue.",
          "This is important because Abram meets a priest-king who honors the same Most High God.",
          "Later Scripture, especially Psalm 110 and Hebrews, looks back to Melchizedek as deeply significant.",
          "Genesis gives us a mysterious glimpse of priestly kingship before Israel exists.",
        ]),
      ],
      [
        "🙌 I Have Lift Up Mine Hand Unto The Lord",
        note([
          "Abram refuses to take wealth from the king of Sodom.",
          "He does not want Sodom's king to claim he made Abram rich.",
          "This is a strong contrast with Egypt, where Abram received gifts in a messy situation.",
          "Here Abram is careful about where his increase comes from.",
          "He wants the Lord alone to be seen as his provider.",
          "Faith is growing in Abram's choices.",
        ]),
      ],
    ],
  },
  {
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 15:1-6",
    title: "Abram Believes God",
    icon: "⭐",
    phrases: [
      [
        "🛡️ I Am Thy Shield",
        note([
          "God speaks to Abram after the battle and tells him not to fear.",
          "A shield protects a person in danger.",
          "Abram has just faced kings, rescued Lot, and refused Sodom's reward.",
          "God Himself promises to be Abram's protection and reward.",
          "This matters because Abram's security is not in armies or wealth.",
          "His safety rests in the Lord.",
        ]),
      ],
      [
        "👶 I Go Childless",
        note([
          "Abram honestly tells God the problem he still feels.",
          "God has promised descendants, but Abram has no child.",
          "This is not unbelief pretending to be prayer.",
          "It is honest faith bringing the tension to God.",
          "Abram's life is blessed in many ways, but the central promise still seems impossible.",
          "Genesis lets us hear the ache under his faith.",
        ]),
      ],
      [
        "⭐ Tell The Stars",
        note([
          "God takes Abram outside and tells him to look at the stars.",
          "The stars become a picture of descendants too many to count.",
          "God does not answer Abram with a child immediately.",
          "He answers with a renewed promise.",
          "Abram believes the Lord, and God counts it to him as righteousness.",
          "This becomes one of the most important faith texts in the whole Bible.",
        ]),
      ],
    ],
  },
  {
    chapter: 15,
    startVerse: 7,
    endVerse: 21,
    reference: "Genesis 15:7-21",
    title: "God Makes A Covenant With Abram",
    icon: "🔥",
    phrases: [
      [
        "📍 To Give Thee This Land",
        note([
          "God connects Abram's faith to the land promise again.",
          "Abram asks how he will know he will inherit it.",
          "This question matters because Abram believes God, but still needs assurance.",
          "Faith can ask for help understanding the promise.",
          "God does not shame Abram for asking.",
          "He gives him a covenant ceremony.",
        ]),
      ],
      [
        "🔥 A Smoking Furnace, And A Burning Lamp",
        note([
          "The smoking furnace and burning lamp pass between the pieces of the sacrifice.",
          "This is covenant imagery.",
          "In that world, passing between cut animals could symbolize a serious oath.",
          "What is stunning is that God alone passes through.",
          "Abram is asleep while God binds Himself to the promise.",
          "The covenant rests on God's faithfulness before it rests on Abram's strength.",
        ]),
      ],
      [
        "🧳 Thy Seed Shall Be A Stranger",
        note([
          "God tells Abram his descendants will be strangers and afflicted before receiving the land.",
          "This points forward to Israel in Egypt.",
          "The promise includes delay, suffering, and deliverance.",
          "That matters because God's plan is not shallow or instant.",
          "Abram is being told that the road to fulfillment will be long.",
          "But God also promises judgment on the oppressor and return to the land.",
        ]),
      ],
    ],
  },
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 16:1-6",
    title: "Sarai And Abram Try To Force The Promise",
    icon: "😔",
    phrases: [
      [
        "🚫 Sarai Bare Him No Children",
        note([
          "The chapter begins by repeating Sarai's barrenness.",
          "This is the pressure under the whole story.",
          "God promised descendants, but years have passed with no child through Sarai.",
          "Waiting has become painful.",
          "The problem is real, but the solution Sarai proposes will wound the household.",
          "Genesis is showing what happens when people try to force God's promise through fear.",
        ]),
      ],
      [
        "👩 Hagar The Egyptian",
        note([
          "Hagar is an Egyptian servant in Sarai's household.",
          "She is vulnerable because she does not have the same power Abram and Sarai have.",
          "Sarai gives her to Abram to produce a child.",
          "This may have been a known ancient custom, but Genesis shows the pain it creates.",
          "Hagar is not just a tool in the story.",
          "She is a real person who will be seen by God.",
        ]),
      ],
      [
        "💔 Sarai Dealt Hardly With Her",
        note([
          "After Hagar becomes pregnant, tension erupts in the household.",
          "Sarai feels dishonored, Abram avoids responsibility, and Hagar suffers.",
          "The plan that was supposed to solve the problem creates a new wound.",
          "This matters because human shortcuts often produce pain people did not expect.",
          "Genesis does not romanticize the decision.",
          "It shows the brokenness that grows from trying to control the promise.",
        ]),
      ],
    ],
  },
  {
    chapter: 16,
    startVerse: 7,
    endVerse: 16,
    reference: "Genesis 16:7-16",
    title: "God Sees Hagar",
    icon: "👁️",
    phrases: [
      [
        "🌵 The Angel Of The Lord Found Her",
        note([
          "Hagar runs into the wilderness, but the Lord finds her there.",
          "That word found matters because Hagar is not forgotten or invisible.",
          "She is away from Abram's household, but not away from God's sight.",
          "The wilderness becomes the place where God meets a mistreated servant.",
          "This is one of the most tender scenes in Genesis.",
          "God sees the person the household failed to protect.",
        ]),
      ],
      [
        "👶 Thou Shalt Call His Name Ishmael",
        note([
          "Ishmael means God hears.",
          "The name is connected to Hagar's affliction.",
          "Every time the name is spoken, it testifies that God heard her pain.",
          "This matters because Hagar has very little power in the human story.",
          "But God gives her child a name rooted in divine attention.",
          "Her suffering has reached God's ears.",
        ]),
      ],
      [
        "👁️ Thou God Seest Me",
        note([
          "Hagar names God as the God who sees her.",
          "This is remarkable because she is not the central covenant figure like Abram.",
          "Yet she has a direct encounter with God's care.",
          "The phrase teaches something deeply personal about the Lord.",
          "He sees people in places where others may ignore them.",
          "Hagar's testimony becomes one of the clearest statements of God's compassion in Genesis.",
        ]),
      ],
    ],
  },
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 17:1-8",
    title: "God Renames Abram",
    icon: "🆕",
    phrases: [
      [
        "🙌 I Am The Almighty God",
        note([
          "God introduces Himself to Abram as Almighty God.",
          "That title matters because Abram's situation still looks impossible.",
          "He is old, Sarai is barren, and the promised son has not come.",
          "God's power is the foundation for the command and promise that follow.",
          "Abram's hope is not in human possibility.",
          "It is in the Almighty God who can do what people cannot.",
        ]),
      ],
      [
        "🚶 Walk Before Me, And Be Thou Perfect",
        note([
          "God calls Abram to live before Him faithfully.",
          "Perfect here carries the idea of wholeness, integrity, or blamelessness.",
          "God is not asking Abram to pretend he has no weakness.",
          "He is calling him to wholehearted covenant life.",
          "The promise does not remove obedience.",
          "Grace and calling belong together in Abram's story.",
        ]),
      ],
      [
        "🆕 Abraham",
        note([
          "Abram's name is changed to Abraham, connected with being father of many nations.",
          "This is powerful because he still does not have the promised son through Sarah.",
          "God names him according to the promise before the promise is visible.",
          "The new name asks Abraham to live under what God has said.",
          "Every time the name is spoken, it points to God's future.",
          "Identity is being shaped by promise.",
        ]),
      ],
    ],
  },
  {
    chapter: 17,
    startVerse: 9,
    endVerse: 14,
    reference: "Genesis 17:9-14",
    title: "The Sign Of Circumcision",
    icon: "✂️",
    phrases: [
      [
        "✂️ Every Man Child Among You Shall Be Circumcised",
        note([
          "Circumcision becomes the covenant sign for Abraham's household.",
          "It marks the males of the family as belonging to the covenant God made with Abraham.",
          "The sign is physical because the promise involves real descendants, real bodies, and real generations.",
          "It is not a private feeling only.",
          "The covenant is marked into the family line.",
          "This sign will later become a major identity marker for Israel.",
        ]),
      ],
      [
        "🏠 Born In The House, Or Bought With Money",
        note([
          "The sign includes more than Abraham's biological children.",
          "Servants and those attached to his household are included too.",
          "That matters because the covenant household is wider than one nuclear family.",
          "Everyone under Abraham's house is brought under the sign.",
          "Genesis is showing a whole household being marked by God's covenant.",
          "The promise begins with Abraham but reaches through his community.",
        ]),
      ],
      [
        "⚠️ That Soul Shall Be Cut Off",
        note([
          "Rejecting the covenant sign is treated seriously.",
          "To be cut off means to be removed from covenant belonging.",
          "This shows that God's covenant is not casual.",
          "The sign does not save by itself, but rejecting it rejects the covenant command God gave.",
          "The relationship with God includes both promise and responsibility.",
          "Genesis wants the reader to feel the weight of belonging to the Lord.",
        ]),
      ],
    ],
  },
  {
    chapter: 17,
    startVerse: 15,
    endVerse: 27,
    reference: "Genesis 17:15-27",
    title: "Sarah Is Named And Isaac Is Promised",
    icon: "👶",
    phrases: [
      [
        "🆕 Sarah",
        note([
          "Sarai's name is changed to Sarah.",
          "God does not only rename Abraham.",
          "He also marks Sarah as central to the promise.",
          "That matters because the promised son will not come through Hagar or another woman.",
          "He will come through Sarah.",
          "Her new name stands beside Abraham's as part of the covenant future.",
        ]),
      ],
      [
        "😂 Abraham Fell Upon His Face, And Laughed",
        note([
          "Abraham laughs because the promise sounds impossible.",
          "He is nearly one hundred, and Sarah is ninety.",
          "The laughter is not ignored by the story.",
          "It shows the human shock of hearing God promise something beyond natural possibility.",
          "God does not change the promise because Abraham laughs.",
          "Instead, He names the child Isaac, a name connected with laughter.",
        ]),
      ],
      [
        "👶 Sarah Shall Bear Unto Thee Isaac",
        note([
          "God names the promised child before he is born.",
          "Isaac will be the son of covenant promise.",
          "Ishmael will be blessed, but Isaac is the line through whom the covenant continues.",
          "This distinction matters for the rest of Genesis.",
          "God is not rejecting compassion for Ishmael.",
          "He is clarifying the specific promise line through Sarah's son.",
        ]),
      ],
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 15,
    reference: "Genesis 18:1-15",
    title: "The Lord Visits Abraham And Sarah",
    icon: "⛺",
    phrases: [
      [
        "⛺ The Lord Appeared Unto Him",
        note([
          "Genesis says the Lord appeared to Abraham by the oaks of Mamre.",
          "The scene begins like a visit from travelers, but the text tells us something deeper is happening.",
          "Abraham responds with urgent hospitality.",
          "In the ancient world, hospitality was a serious act of honor and care.",
          "This visit becomes the setting for another promise about Sarah's son.",
          "God comes near to Abraham's tent before the promise is fulfilled.",
        ]),
      ],
      [
        "📅 At The Time Appointed",
        note([
          "God gives a specific time for Sarah to have a son.",
          "The promise is no longer distant and vague.",
          "It is moving toward fulfillment.",
          "This matters because Abraham and Sarah have waited for years.",
          "God's promise has timing, even when the waiting feels long.",
          "The appointed time belongs to the Lord.",
        ]),
      ],
      [
        "😂 Sarah Laughed Within Herself",
        note([
          "Sarah laughs quietly because the promise sounds impossible to her body and age.",
          "The Bible does not flatten her into a simple villain of unbelief.",
          "It lets us see how hard the promise is to receive after years of barrenness.",
          "God answers her hidden laughter with a question: Is anything too hard for the Lord?",
          "That question is the point of the scene.",
          "The promise depends on God's power, not Sarah's ability.",
        ]),
      ],
    ],
  },
  {
    chapter: 18,
    startVerse: 16,
    endVerse: 33,
    reference: "Genesis 18:16-33",
    title: "Abraham Intercedes For Sodom",
    icon: "🙏",
    phrases: [
      [
        "⚖️ Shall Not The Judge Of All The Earth Do Right?",
        note([
          "Abraham asks one of the most important justice questions in Genesis.",
          "He knows the Lord is judge over the whole earth.",
          "His concern is whether the righteous will be swept away with the wicked.",
          "This matters because biblical justice is not random anger.",
          "Abraham appeals to God's own character.",
          "He believes God's judgment must be righteous.",
        ]),
      ],
      [
        "🙏 Peradventure There Be Fifty Righteous",
        note([
          "Abraham begins interceding for Sodom by asking about fifty righteous people.",
          "He is not defending Sodom's wickedness.",
          "He is pleading for mercy if righteous people are present there.",
          "The conversation shows Abraham acting like a mediator.",
          "He stands before God and asks for mercy on behalf of others.",
          "This is a major growth moment after Abraham's earlier fear-driven failures.",
        ]),
      ],
      [
        "🔟 For Ten's Sake",
        note([
          "Abraham's intercession moves from fifty down to ten.",
          "The Lord agrees not to destroy the city if ten righteous are found.",
          "That shows God's patience and willingness to hear Abraham's plea.",
          "But it also prepares the reader for how corrupt Sodom really is.",
          "The problem is not that God is unwilling to spare.",
          "The tragedy is that the city does not even have ten righteous people.",
        ]),
      ],
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 11,
    reference: "Genesis 19:1-11",
    title: "Sodom Shows Its Wickedness",
    icon: "🏙️",
    phrases: [
      [
        "🏙️ Lot Sat In The Gate Of Sodom",
        note([
          "The city gate was a place of public life, leadership, and decisions.",
          "Lot is no longer just near Sodom; he is sitting in its gate.",
          "That suggests he has become part of the city's life.",
          "This matters because his earlier choice to move toward Sodom has gone deeper over time.",
          "Small steps toward a place can become deep entanglement.",
          "Lot is righteous, but he is living in a dangerous environment.",
        ]),
      ],
      [
        "🚪 Bring Them Out Unto Us",
        note([
          "The men of Sodom surround Lot's house and demand the visitors.",
          "The scene exposes the violence and corruption of the city.",
          "This is not only private sin; it is public, aggressive wickedness.",
          "The whole crowd participates in the threat.",
          "Genesis wants us to see why judgment is coming.",
          "Sodom's evil is not hidden anymore.",
        ]),
      ],
      [
        "👁️ They Smote The Men With Blindness",
        note([
          "The angels strike the men with blindness to protect the household.",
          "Even then, the men keep wearing themselves out trying to find the door.",
          "That detail shows how hardened they are.",
          "Judgment has begun, but their desire is still violent.",
          "The blindness is both protection and warning.",
          "Sodom is spiritually blind before it is physically struck blind.",
        ]),
      ],
    ],
  },
  {
    chapter: 19,
    startVerse: 12,
    endVerse: 22,
    reference: "Genesis 19:12-22",
    title: "Lot Is Pulled Out Of Sodom",
    icon: "🏃",
    phrases: [
      [
        "🏃 Escape For Thy Life",
        note([
          "The angels command Lot to flee because judgment is coming.",
          "This is urgent language.",
          "Lot cannot negotiate a comfortable exit from a condemned city.",
          "He must leave quickly and not look back.",
          "The phrase matters because rescue sometimes requires separation.",
          "God's mercy pulls Lot out, but Lot still has to leave Sodom behind.",
        ]),
      ],
      [
        "⏳ While He Lingered",
        note([
          "Lot delays even after being warned.",
          "That is one of the saddest details in the chapter.",
          "He knows danger is coming, but he still struggles to leave.",
          "Sodom has a hold on him and his family.",
          "The angels seize their hands because the Lord is merciful.",
          "Lot's rescue is not because he moves quickly, but because God shows compassion.",
        ]),
      ],
      [
        "🖐️ The Lord Being Merciful Unto Him",
        note([
          "This phrase explains why Lot survives.",
          "The angels pull him, his wife, and his daughters out because of God's mercy.",
          "Lot is not presented as heroic in this moment.",
          "He is hesitant and afraid.",
          "God's mercy is stronger than Lot's hesitation.",
          "The rescue shows that deliverance can be deeply gracious even when people are slow to obey.",
        ]),
      ],
    ],
  },
  {
    chapter: 19,
    startVerse: 23,
    endVerse: 38,
    reference: "Genesis 19:23-38",
    title: "Sodom Falls And Lot's Family Breaks",
    icon: "🔥",
    phrases: [
      [
        "🔥 Brimstone And Fire",
        note([
          "The Lord rains judgment on Sodom and Gomorrah.",
          "This is the answer to the outcry against the city.",
          "Genesis shows judgment as serious and terrifying.",
          "God is patient in the conversation with Abraham, but Sodom's evil is real.",
          "The destruction becomes one of the Bible's major examples of judgment.",
          "It warns that wickedness does not continue forever unchecked.",
        ]),
      ],
      [
        "🧂 His Wife Looked Back",
        note([
          "Lot's wife looks back and becomes a pillar of salt.",
          "The look is more than a glance over the shoulder.",
          "It shows attachment to the city God was judging.",
          "She was brought out of Sodom, but her heart still turned back toward it.",
          "This detail becomes a warning later in Scripture.",
          "Being physically removed from danger is not the same as fully letting go.",
        ]),
      ],
      [
        "💔 Moab And Ammon",
        note([
          "The chapter ends with the disturbing origin of Moab and Ammon.",
          "Lot's daughters act out of fear and desperation after the destruction.",
          "The scene is morally broken and painful.",
          "Moab and Ammon will later become important neighbors and enemies of Israel.",
          "Genesis is showing how damaged choices can echo into future nations.",
          "Lot escapes Sodom, but his family story remains deeply wounded.",
        ]),
      ],
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 20:1-7",
    title: "Abraham Repeats The Lie",
    icon: "🔁",
    phrases: [
      [
        "👩 She Is My Sister",
        note([
          "Abraham repeats the same fear-driven plan he used in Egypt.",
          "This is painful because he has walked with God for years by now.",
          "Old fear can return even after real growth.",
          "The statement has some family truth behind it, but it is used deceptively.",
          "Abraham is again protecting himself while putting Sarah at risk.",
          "Genesis is honest that people of faith can repeat old failures.",
        ]),
      ],
      [
        "🌙 God Came To Abimelech In A Dream",
        note([
          "God intervenes before Abimelech touches Sarah.",
          "This protects Sarah, Abimelech, and the promised child who will soon come.",
          "The dream shows that God is guarding the promise even when Abraham is acting out of fear.",
          "Abimelech is not part of Abraham's covenant line, but God still speaks to him.",
          "The Lord is working beyond Abraham's household.",
          "God's protection is wider than Abraham's wisdom.",
        ]),
      ],
      [
        "🙏 He Is A Prophet",
        note([
          "God calls Abraham a prophet even in a chapter where Abraham fails.",
          "That is surprising.",
          "It does not excuse Abraham's deception, but it shows his calling remains real.",
          "Abraham will pray for Abimelech, and God will heal his household.",
          "This matters because God's gifts and callings are not based on people being flawless.",
          "Abraham still needs correction, but he also still carries a role before God.",
        ]),
      ],
    ],
  },
  {
    chapter: 20,
    startVerse: 8,
    endVerse: 18,
    reference: "Genesis 20:8-18",
    title: "Sarah Is Restored",
    icon: "🛡️",
    phrases: [
      [
        "😳 What Hast Thou Done Unto Us?",
        note([
          "Abimelech confronts Abraham directly.",
          "The question exposes how Abraham's fear endangered other people.",
          "Abraham may have thought he was only managing his own survival.",
          "But his deception nearly brought guilt on an entire household.",
          "This matters because fear often feels private, but its choices can hurt others.",
          "Abraham has to face the damage his half-truth caused.",
        ]),
      ],
      [
        "😨 I Thought, Surely The Fear Of God Is Not In This Place",
        note([
          "Abraham explains that he lied because he assumed the people of Gerar did not fear God.",
          "That assumption was wrong.",
          "Abimelech acts with more integrity in this chapter than Abraham does.",
          "Genesis is challenging Abraham's fear and prejudice.",
          "He judged the place before he knew the people.",
          "Fear made him see danger everywhere and act deceptively.",
        ]),
      ],
      [
        "🙏 Abraham Prayed Unto God",
        note([
          "Abraham prays, and God heals Abimelech's household.",
          "This closes the chapter with mercy after correction.",
          "Sarah is restored, Abimelech is protected, and Abraham intercedes.",
          "The promise is preserved again by God's faithfulness.",
          "This matters because Isaac's birth is about to happen in Genesis 21.",
          "Before the promised son arrives, God protects the promised mother.",
        ]),
      ],
    ],
  },
];

const GENESIS_11_PERSONAL_REWRITE_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 11,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 11:1-4",
    title: "The Tower Of Babel Begins",
    icon: "🏙️",
    phrases: [
      [
        "🗣️ The Whole Earth Was Of One Language",
        note([
          "Before Babel, humanity is described as having one language and one speech.",
          "This means the people shared the same words and could understand each other without translation.",
          "That made communication fast and cooperation easy.",
          "Unity itself was not evil.",
          "God had already blessed humanity and told them to fill the earth.",
          "The problem is what they chose to do with their unity.",
          "They used a shared language to gather around pride, control, and self-protection.",
          "Genesis is showing that people can be united and still be moving in the wrong direction.",
        ]),
      ],
      [
        "🧭 As They Journeyed From The East",
        note([
          "This phrase tells us the people are moving after the flood and after the nations begin spreading.",
          "The direction matters because Genesis often uses movement to show where people are going physically and spiritually.",
          "They are not simply taking a walk; they are relocating and settling together.",
          "Instead of continuing to spread over the earth, they find a place where they can stop and build.",
          "A brand-new reader might wonder why Genesis mentions the direction at all.",
          "It helps place the story in real geography and real movement.",
          "The people are on the move, but their hearts are about to move toward pride.",
          "Genesis is setting up the tension between God's command to fill the earth and humanity's desire to gather in one place.",
        ]),
      ],
      [
        "🌅 From The East",
        note([
          "The words from the east are a location marker.",
          "Genesis is not telling a floating story with no place attached to it.",
          "It is describing people moving across real land after the flood.",
          "In Genesis, directions often help us follow movement, separation, exile, return, and settlement.",
          "Here the main point is that humanity is gathering into a region where the Babel project can begin.",
          "The phrase also reminds us that the nations are still in motion after Noah's family leaves the ark.",
          "God wanted humanity to fill the earth, but this group chooses to stop and centralize their life.",
          "That decision prepares the reader for the rebellion that follows.",
        ]),
      ],
      [
        "🏜️ A Plain",
        note([
          "A plain is a wide, flat stretch of land.",
          "That matters because flat land is easier for settling, farming, organizing people, and building a city.",
          "The people are not choosing a random spot.",
          "They find a place that can support a large shared project.",
          "For a new reader, this explains why a city and tower can be imagined here.",
          "The geography helps the story make sense.",
          "A plain gives them room to build outward and upward.",
          "The problem is not the plain itself; the problem is the pride that shapes what they build there.",
        ]),
      ],
      [
        "🗺️ The Land Of Shinar",
        note([
          "Shinar is the region connected with ancient Mesopotamia, the area around the great river systems of the ancient world.",
          "This matters because Mesopotamia was known for early cities, organized building, and large temple-tower structures.",
          "Later in the Bible, Shinar is also connected with Babylon.",
          "That means this location is not just background scenery.",
          "It becomes part of a larger Bible theme: human empire trying to organize life apart from God.",
          "Babel begins here, and Babylon later becomes a major symbol of proud human power.",
          "Genesis is planting a seed that the rest of Scripture will keep developing.",
          "When readers see Shinar, they should think of a real place and a spiritual pattern beginning to form.",
        ]),
      ],
      [
        "🏠 They Dwelt There",
        note([
          "To dwell means to settle, remain, or make a home.",
          "This matters because God's blessing after creation and after the flood was connected to filling the earth.",
          "The people are not merely resting for a moment.",
          "They are choosing to settle together in one place.",
          "That decision explains why they soon build a city.",
          "They want permanence, safety, and control.",
          "Settling is not always wrong, but here it becomes part of resisting God's purpose.",
          "Genesis shows that the problem begins before the tower reaches upward; it begins when the people choose security over obedience.",
        ]),
      ],
      [
        "🧱 Let Us Make Brick",
        note([
          "The builders make bricks because they are settling in a flat land where natural stone was not the normal building material.",
          "In Mesopotamia, baked brick was common because good stone was harder to find.",
          "This detail shows human skill, planning, and technology.",
          "They know how to organize labor, gather materials, and build something large.",
          "Genesis is not saying technology is evil.",
          "The problem is not that they know how to make bricks.",
          "The problem is the purpose their skill is serving.",
          "Human ability becomes dangerous when it is used for pride and independence from God.",
        ]),
      ],
      [
        "🔥 Burn Them Thoroughly",
        note([
          "Burning the bricks thoroughly means they baked them hard so they would be stronger and more durable.",
          "Sun-dried bricks were common, but fired bricks could last longer and support bigger projects.",
          "This tells the reader the builders are serious and organized.",
          "They are not throwing together a small shelter.",
          "They are preparing materials for a lasting city and tower.",
          "The phrase helps us see the ambition behind Babel.",
          "They want something permanent enough to protect their name and hold their people together.",
          "The stronger the brick, the clearer the desire for lasting human glory.",
        ]),
      ],
      [
        "🧱 Brick For Stone",
        note([
          "This phrase explains the building materials in a place where stone was not the normal resource.",
          "The people substitute brick where others might have used stone.",
          "A new reader might wonder why Genesis pauses to explain this.",
          "It shows that the project is tied to the land of Shinar and its culture.",
          "The builders are adapting to their environment with real skill.",
          "Again, the Bible is not mocking their intelligence.",
          "It is showing that smart people can still build foolishly when pride leads the way.",
          "The material is strong, but the spiritual foundation is weak.",
        ]),
      ],
      [
        "🛢️ Slime Had They For Mortar",
        note([
          "The word slime in the KJV refers to bitumen, a tar-like substance used as mortar.",
          "Mortar is what holds bricks together.",
          "In ancient Mesopotamia, bitumen was used in building because it helped seal and bind materials.",
          "This detail gives cultural and historical texture to the story.",
          "Genesis is showing a real kind of ancient construction.",
          "The people have bricks and binding material, so they have everything needed for a major project.",
          "But the deeper issue is that strong mortar cannot hold together a rebellious heart.",
          "Babel may be well-built physically, but spiritually it is already cracking.",
        ]),
      ],
      [
        "🏙️ Let Us Build Us A City",
        note([
          "A city in the ancient world meant more than buildings.",
          "It meant protection, identity, economy, leadership, and a shared center of life.",
          "The people want a place that can hold them together.",
          "That desire makes sense on one level because scattering can feel unsafe.",
          "But Genesis has already shown that God wanted humanity to fill the earth.",
          "The city becomes a way to resist that calling.",
          "They are building a center around themselves instead of trusting God's rule over the whole earth.",
          "Babel is not just construction; it is a community organized around self-made security.",
        ]),
      ],
      [
        "🗼 A Tower Whose Top May Reach Unto Heaven",
        note([
          "This phrase does not mean the people could literally build into God's throne room.",
          "It means they wanted a tower that reached upward and looked spiritually impressive.",
          "In Mesopotamia, large temple-towers called ziggurats were built as religious and civic centers.",
          "They were connected with worship, power, and the idea of linking earth and heaven.",
          "That background helps explain why Babel is such a serious story.",
          "The people are not only building tall; they are trying to establish access, greatness, and security on human terms.",
          "Genesis answers their pride with irony: God still has to come down to see it.",
          "No human tower can force its way into heaven.",
        ]),
      ],
      [
        "🏷️ Let Us Make Us A Name",
        note([
          "This is the heart of Babel.",
          "The people want a name for themselves.",
          "In the Bible, a name is connected to identity, reputation, legacy, and significance.",
          "They want to secure their own greatness instead of receiving their identity from God.",
          "This is why Babel connects so strongly to Genesis 12.",
          "Right after Babel, God will tell Abram, I will make thy name great.",
          "Babel grasps for a name; Abram receives one by promise.",
          "Lasting significance is not seized by pride; it is given by God.",
        ]),
      ],
      [
        "🌍 Lest We Be Scattered Abroad",
        note([
          "This phrase tells us what the builders fear.",
          "They do not want to be scattered across the earth.",
          "But spreading across the earth was part of God's command to humanity after creation and after the flood.",
          "That means their fear is pulling them away from obedience.",
          "They build to keep control, stay together, and protect their own future.",
          "A new reader might think the city sounds wise, but Genesis shows the deeper problem.",
          "Safety can become disobedience when it keeps us from what God has said.",
          "Babel is what happens when fear and pride work together.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 5,
    endVerse: 9,
    reference: "Genesis 11:5-9",
    title: "God Scatters Babel",
    icon: "🔀",
    phrases: [
      [
        "⬇️ The Lord Came Down",
        note([
          "This phrase is one of the most important lines in the Babel story.",
          "The people build a tower they think reaches toward heaven, but Genesis says the Lord came down to see it.",
          "That is intentional irony.",
          "From the ground, the tower may have looked massive and impressive.",
          "From God's view, it is so small that He must come down to inspect it.",
          "The phrase humbles human pride without needing a long argument.",
          "God is not threatened by Babel.",
          "He stands above every human project, city, empire, and tower.",
        ]),
      ],
      [
        "👥 The Children Of Men",
        note([
          "Genesis calls the builders the children of men.",
          "That phrase reminds us that Babel is a human project, not a God-commanded one.",
          "It also links the story to humanity as a whole after the flood.",
          "This is not only one family's private mistake.",
          "It represents the wider human tendency to organize life around pride and independence.",
          "The phrase helps the reader see Babel as a mirror.",
          "The issue is not only ancient builders in Shinar.",
          "It is the human heart trying to build identity without surrendering to God.",
        ]),
      ],
      [
        "🗣️ One People And One Language",
        note([
          "God notices that the people are united in speech and purpose.",
          "Again, unity by itself is not the problem.",
          "The problem is that unity is being used to resist God's command and magnify human pride.",
          "Shared language makes the project possible because everyone can plan, command, and cooperate easily.",
          "This explains why God's judgment touches their language.",
          "He disrupts the tool they are using for rebellion.",
          "The phrase teaches that power becomes dangerous when many people share one sinful purpose.",
          "Unity needs truth and humility, not just agreement.",
        ]),
      ],
      [
        "🚧 Nothing Will Be Restrained From Them",
        note([
          "This does not mean humans can overpower God.",
          "It means their united rebellion will keep growing if God does not intervene.",
          "The phrase shows God's concern over what sinful humanity can become when pride is organized and unchecked.",
          "After the flood, the human heart is still bent toward evil.",
          "Babel proves that judgment has not removed the sin problem.",
          "God sees that the project is only the beginning of a deeper direction.",
          "Stopping Babel is judgment, but it is also restraint.",
          "God limits evil before it spreads even further.",
        ]),
      ],
      [
        "🔽 Go To, Let Us Go Down",
        note([
          "Go to is an older way of saying come, let us act now.",
          "The phrase echoes the builders' own words, because they said, let us make brick and let us build.",
          "Humanity says, let us build upward.",
          "God says, let us go down.",
          "That contrast is powerful.",
          "The builders organize themselves in pride, but God answers as the true ruler.",
          "Many Christians also notice the plural language here and connect it with the fullness of God's counsel.",
          "The main point is clear: God responds directly to the proud plan.",
        ]),
      ],
      [
        "🗣️ Confound Their Language",
        note([
          "To confound means to confuse or mix up.",
          "God confuses their language so they can no longer understand one another.",
          "This judgment fits the sin exactly.",
          "They used one speech to build a proud center, so God breaks the shared speech that made the project possible.",
          "A new reader might wonder why God does not simply knock the tower down.",
          "Instead, He touches the deeper system holding the rebellion together.",
          "The project stops because communication breaks.",
          "Language confusion becomes the way God scatters pride.",
        ]),
      ],
      [
        "🌍 The Lord Scattered Them Abroad",
        note([
          "This is the result the builders were trying to avoid.",
          "They built the city because they did not want to be scattered, but God scatters them anyway.",
          "This shows that resisting God's purpose cannot finally succeed.",
          "God's command to fill the earth still stands.",
          "The scattering is judgment because their proud project is broken.",
          "But it also moves humanity back toward the purpose they were avoiding.",
          "Sometimes God's mercy comes through disruption.",
          "He tears down what would keep people trapped in rebellion.",
        ]),
      ],
      [
        "🏙️ Babel",
        note([
          "Babel is connected with confusion.",
          "The name becomes a memory of human pride, confused language, and scattering.",
          "Later in Scripture, Babylon grows from this same idea into a symbol of proud human empire against God.",
          "That makes Babel more than an old tower story.",
          "It becomes a pattern that runs through the Bible.",
          "Whenever people build life around their own name instead of God's glory, Babel is still alive in the human heart.",
          "Genesis 11 prepares us for the next answer: God will call Abram and promise blessing for all families of the earth.",
          "Human pride scatters, but God's promise will begin a rescue plan.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 10,
    endVerse: 17,
    reference: "Genesis 11:10-17",
    title: "Shem's Line Continues",
    icon: "📜",
    phrases: [
      [
        "📜 These Are The Generations Of Shem",
        note([
          "This phrase introduces the family line Genesis wants us to follow.",
          "After Babel scatters humanity, the story narrows back to Shem's descendants.",
          "That narrowing is important because Abram will come from this line.",
          "The genealogy may look slow, but it is moving the Bible story toward the next major promise.",
          "Genesis often gives family lines to show how God's plan is being preserved.",
          "This is not filler.",
          "It is the bridge from the scattered nations to the call of Abram.",
          "God is preparing blessing through one family for the sake of many families.",
        ]),
      ],
      [
        "👨 Shem Was An Hundred Years Old",
        note([
          "This detail connects the genealogy back to Noah's family after the flood.",
          "Shem is not a random name in a list.",
          "He is one of Noah's sons, and Genesis is showing how the post-flood world continues through him.",
          "The ages remind readers that the story is moving across generations.",
          "God's plan is not rushed.",
          "It passes through births, years, families, and ordinary life.",
          "A new reader may want to skip the numbers, but the numbers show continuity.",
          "The promise story has a real family timeline behind it.",
        ]),
      ],
      [
        "👶 Begat Arphaxad",
        note([
          "Begat means became the father of.",
          "The repeated word can feel boring, but it is how Genesis traces the promise line.",
          "Arphaxad matters because his line will keep moving toward Abram.",
          "Most of these names do not get long stories, but they still carry the line forward.",
          "That teaches something important about how God works.",
          "Not every faithful generation gets a dramatic chapter.",
          "Some people matter because they preserve the road for what God will do later.",
          "The quiet names are part of the promise story too.",
        ]),
      ],
      [
        "👪 Sons And Daughters",
        note([
          "This repeated phrase reminds us that these families were larger than the one named son in the promise line.",
          "Genesis names the person needed to trace the story, but it also acknowledges broader family life.",
          "These were real households with many people, not just names on a chart.",
          "The phrase helps readers avoid thinking the Bible only cares about one individual at a time.",
          "God is guiding a line, but that line exists inside real families and communities.",
          "The repetition also shows life continuing after Babel.",
          "Human pride was judged, but human life was not erased.",
          "God's mercy keeps generations moving.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 18,
    endVerse: 26,
    reference: "Genesis 11:18-26",
    title: "The Line Reaches Abram",
    icon: "🧬",
    phrases: [
      [
        "🧵 Peleg",
        note([
          "Peleg was already mentioned in Genesis 10, where his name is connected with division.",
          "That matters because Genesis 10 and 11 work together.",
          "Genesis 10 gives the spread of nations, and Genesis 11 explains the Babel event behind the scattering.",
          "Peleg's place in the family line keeps that connection in view.",
          "A reader may wonder why the Bible repeats names from earlier lists.",
          "It is helping us connect the map of nations with the story of Babel and the line to Abram.",
          "The world is divided, but God's promise line is still being preserved.",
          "Division does not stop God's plan.",
        ]),
      ],
      [
        "👴 Lived After He Begat",
        note([
          "This repeated phrase shows life continuing after each named son is born.",
          "The father does not disappear from the story the moment the next generation arrives.",
          "Genesis is showing overlapping generations, family continuity, and the slow passing of time.",
          "For a new Bible reader, this helps explain why the genealogy feels repetitive.",
          "The repetition is part of the rhythm.",
          "It shows that God's plan is moving through normal human life.",
          "Birth, age, family, and death all sit under God's larger purpose.",
          "The promise line is being carried forward one generation at a time.",
        ]),
      ],
      [
        "👨‍👦 Terah Lived Seventy Years",
        note([
          "Terah is Abram's father, so his name marks the final step before Abram appears.",
          "The genealogy is now almost at the person Genesis has been preparing us to meet.",
          "Terah's age and family details show that Abram's call has a real family setting.",
          "God does not call Abram out of nowhere.",
          "He calls a man with a father, brothers, a wife, a nephew, and a homeland.",
          "That matters because Genesis 12 will ask Abram to leave his father's house.",
          "Genesis 11 lets us feel what Abram will be called to trust God beyond.",
          "The call of faith begins inside real family history.",
        ]),
      ],
      [
        "👤 Abram",
        note([
          "Abram appears at the end of the genealogy because the whole section has been moving toward him.",
          "He is not yet called Abraham here.",
          "His name will be changed later when God confirms the covenant and gives him a new identity.",
          "At this point, he is introduced before the major promise is spoken.",
          "That helps the reader see that Abram's story has a background.",
          "He comes from a line, a father, a place, and a family.",
          "The Bible is preparing us to see God's call enter an ordinary human story.",
          "Genesis 12 will turn Abram's life into one of the most important stories in Scripture.",
        ]),
      ],
    ],
  },
  {
    chapter: 11,
    startVerse: 27,
    endVerse: 32,
    reference: "Genesis 11:27-32",
    title: "Abram's Family Stops In Haran",
    icon: "🧳",
    phrases: [
      [
        "🧾 These Are The Generations Of Terah",
        note([
          "This phrase opens a new focus in Genesis.",
          "The story is now moving from Shem's broad line to Terah's household.",
          "That matters because Abram is Terah's son.",
          "Genesis is zooming in closer and closer until Abram stands in the center of the story.",
          "The phrase generations does not only mean children.",
          "It means the family history or account that follows.",
          "Genesis uses this phrase to introduce major sections of the book.",
          "Here it prepares us for the family background behind Abram's call.",
        ]),
      ],
      [
        "👨‍👦 Abram, Nahor, And Haran",
        note([
          "These are Terah's sons and Abram's immediate family circle.",
          "The names matter because the next chapters will keep referring to this household.",
          "Nahor's family will later matter when Isaac and Jacob's wives come from the wider family line.",
          "Haran matters because he is Lot's father.",
          "Abram is not being introduced as a lonely spiritual hero.",
          "He stands inside a family with relationships, grief, and history.",
          "When God calls Abram to leave, the reader now knows there are real ties involved.",
          "Obedience will touch the people and places that shaped him.",
        ]),
      ],
      [
        "💔 Haran Died Before His Father",
        note([
          "Abram's brother Haran dies before Terah.",
          "This means Terah outlives his own son, which is a deep family grief.",
          "It also matters because Lot is Haran's son.",
          "When Abram later travels with Lot, he is traveling with a nephew who has already lost his father.",
          "Genesis is quietly giving emotional background.",
          "Abram's family story includes loss before it includes calling.",
          "That helps us read the next chapters with more tenderness.",
          "God's call often comes into families that already carry wounds.",
        ]),
      ],
      [
        "🏙️ Ur Of The Chaldees",
        note([
          "Ur of the Chaldees was a major city in ancient Mesopotamia.",
          "It was known for wealth, trade, organized city life, and pagan worship.",
          "This tells us Abram came from a real cultural world, not an empty background.",
          "He had a homeland, a family identity, and a settled place.",
          "Later Scripture connects Abram's family background with life among other gods.",
          "That makes God's call in Genesis 12 even more powerful.",
          "Abram will be called away from familiar security into a promise he cannot yet see.",
          "Faith begins in a real place before it walks into the unknown.",
        ]),
      ],
      [
        "👩 Sarai",
        note([
          "Sarai is introduced before God gives Abram the promise of descendants.",
          "That matters because she is not a side character in Abram's story.",
          "The promise of offspring will involve her body, her waiting, her pain, and eventually God's miracle.",
          "Genesis names her here so the reader knows Abram's family situation before the call begins.",
          "Sarai will later be renamed Sarah, just as Abram will become Abraham.",
          "Her story is tied to covenant promise, not just marriage background.",
          "A new reader should notice her early because the whole promise story will soon press against her barrenness.",
          "God's plan will move through this woman the text has just introduced.",
        ]),
      ],
      [
        "🚫 Sarai Was Barren",
        note([
          "This is one of the most important details in Abram's story.",
          "Barren means Sarai could not have children.",
          "That detail appears before God promises Abram descendants.",
          "So the promise begins in a situation that looks humanly impossible.",
          "Genesis wants the reader to feel that tension from the start.",
          "The chosen family line cannot continue by human strength alone.",
          "Abram's future will depend on God's power and God's word.",
          "This phrase sets up years of waiting, testing, faith, failure, and miracle.",
        ]),
      ],
      [
        "🛣️ To Go Into The Land Of Canaan",
        note([
          "Terah takes his family out of Ur with Canaan named as the destination.",
          "That matters because Canaan will become the land of promise.",
          "The family is already moving toward the place that will dominate Abram's story.",
          "A new reader might wonder why Canaan is named before Genesis 12.",
          "It shows that the journey toward the promised land has already begun in some way.",
          "But the family does not complete the journey yet.",
          "Genesis is building tension between direction and completion.",
          "They are moving toward Canaan, but they will stop short.",
        ]),
      ],
      [
        "⏸️ They Came Unto Haran, And Dwelt There",
        note([
          "Terah's family begins moving toward Canaan but stops in Haran.",
          "Haran becomes an in-between place.",
          "They have left Ur, but they have not reached Canaan.",
          "This unfinished journey matters because Genesis 12 will begin with God calling Abram to keep going.",
          "The story pauses before the next act of obedience.",
          "Abram's call will meet him in the middle of an unfinished road.",
          "Sometimes God's next word comes where a family journey has stalled.",
          "Haran is not the final destination, but it becomes the place right before the call.",
        ]),
      ],
      [
        "⚰️ Terah Died In Haran",
        note([
          "Genesis 11 ends with Terah's death in Haran.",
          "That means Abram's next chapter begins after family loss and an unfinished journey.",
          "The death of Terah closes one part of the family story.",
          "Genesis 12 will open with God's call to Abram.",
          "This order matters because calling often begins after an ending.",
          "Abram does not start with a clean, simple life.",
          "He starts with family history, grief, barrenness, movement, and delay.",
          "God's promise enters that real and unfinished place.",
        ]),
      ],
    ],
  },
];

const GENESIS_12_PERSONAL_REWRITE_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 12:1-3",
    title: "God Calls Abram",
    icon: "📣",
    phrases: [
      [
        "📣 The LORD Had Said Unto Abram",
        note([
          "Genesis 12 begins with God's word.",
          "Abram's story does not begin with Abram having a dream for himself.",
          "It begins with the Lord speaking.",
          "That matters because faith in Genesis is a response to God's initiative.",
          "Abram is not inventing a spiritual journey.",
          "He is answering a call.",
        ]),
      ],
      [
        "🚪 Get Thee Out",
        note([
          "God tells Abram to leave.",
          "This is a command, not just an invitation to consider something new.",
          "Abram must step away from the familiar world that shaped him.",
          "Faith begins with movement because God has spoken.",
          "This does not mean Abram understands everything yet.",
          "It means God's word is enough for the next step.",
        ]),
      ],
      [
        "🌍 Thy Country",
        note([
          "Country means Abram's homeland.",
          "A homeland gave people identity, safety, language, customs, and belonging.",
          "Leaving it was costly.",
          "Abram is not being asked to make a small religious adjustment.",
          "He is being called away from the world he knows.",
          "God's promise will become his new security.",
        ]),
      ],
      [
        "👪 Thy Kindred",
        note([
          "Kindred means relatives or extended family.",
          "In the ancient world, family networks were protection and survival.",
          "To leave kindred meant leaving the people who normally helped provide identity and support.",
          "This shows how deep Abram's call is.",
          "God is asking him to trust the Lord more than the visible safety of family ties.",
          "Obedience touches real relationships.",
        ]),
      ],
      [
        "🏠 Thy Father's House",
        note([
          "The father's house was the center of family authority, inheritance, and identity.",
          "Abram is being called away from the deepest layer of human security.",
          "Genesis 11 just introduced Terah's household so readers would feel the weight of this command.",
          "God's call is not abstract.",
          "It reaches into Abram's home story.",
          "Faith will mean trusting God beyond the household that formed him.",
        ]),
      ],
      [
        "🧭 Unto A Land That I Will Shew Thee",
        note([
          "God does not hand Abram the full map at the beginning.",
          "He promises to show him the land.",
          "That means Abram must move with direction, but without total control.",
          "This is one of the Bible's classic pictures of faith.",
          "Faith is not pretending there are no questions.",
          "Faith is trusting the God who speaks before every detail is visible.",
        ]),
      ],
      [
        "🏛️ I Will Make Of Thee A Great Nation",
        note([
          "This promise sounds impossible because Genesis 11 already said Sarai was barren.",
          "Abram has no child, yet God promises a nation.",
          "That tension is important.",
          "The promise will not be produced by human strength.",
          "God is promising a future Abram cannot create by himself.",
          "The nation begins as a word from God before it exists in history.",
        ]),
      ],
      [
        "🙌 I Will Bless Thee",
        note([
          "Blessing in Genesis means life under God's favor, care, provision, and purpose.",
          "God is not only calling Abram away from something.",
          "He is calling Abram into blessing.",
          "That blessing is a gift, not a wage Abram has earned.",
          "After Babel's self-made name, Genesis shows blessing coming from God.",
          "The future rests on God's generosity.",
        ]),
      ],
      [
        "🏷️ Make Thy Name Great",
        note([
          "This phrase directly answers Babel.",
          "Babel said, let us make us a name.",
          "God says He will make Abram's name great.",
          "The difference is everything.",
          "Babel grasps for greatness through pride.",
          "Abram receives significance through promise.",
        ]),
      ],
      [
        "🎁 Thou Shalt Be A Blessing",
        note([
          "Abram is blessed so that blessing can move through him.",
          "God's promise is not meant to stop with Abram's private life.",
          "He becomes a channel of blessing for others.",
          "This helps readers understand election in Genesis.",
          "God chooses one family for the sake of many families.",
          "Blessing is given with mission attached.",
        ]),
      ],
      [
        "🛡️ I Will Bless Them That Bless Thee",
        note([
          "God promises to deal with people according to how they treat Abram and the promise line.",
          "This does not make Abram powerful by himself.",
          "It shows that God is guarding His promise.",
          "The future of Abram's family matters because God's plan will move through them.",
          "Those who align with God's blessing will be blessed.",
          "The promise has divine protection around it.",
        ]),
      ],
      [
        "⚖️ Curse Him That Curseth Thee",
        note([
          "To curse here means to oppose, dishonor, or treat with contempt.",
          "God warns that opposition to Abram will not be ignored.",
          "This is about God's commitment to His promise.",
          "Abram will face danger, kings, famine, and conflict.",
          "But the promise is not fragile.",
          "God Himself stands behind it.",
        ]),
      ],
      [
        "🌍 In Thee Shall All Families Of The Earth Be Blessed",
        note([
          "This is the global purpose of Abram's call.",
          "After Babel scatters the nations, God promises blessing for all families of the earth.",
          "That means Genesis 12 is not a small tribal story.",
          "God chooses one man with the whole world still in view.",
          "The rest of the Bible keeps unfolding this promise.",
          "Christians see its deepest fulfillment in Jesus, the promised blessing for the nations.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 4,
    endVerse: 6,
    reference: "Genesis 12:4-6",
    title: "Abram Enters Canaan",
    icon: "🚶",
    phrases: [
      [
        "🚶 Abram Departed",
        note([
          "Abram responds to God's word by leaving.",
          "Genesis does not make obedience sound complicated here.",
          "God speaks, and Abram goes.",
          "That simple movement is a major act of faith.",
          "He leaves behind familiar security.",
          "His trust becomes visible through his steps.",
        ]),
      ],
      [
        "📣 As The LORD Had Spoken",
        note([
          "Abram's departure is tied directly to God's word.",
          "He is not wandering because he is restless.",
          "He is moving because the Lord has spoken.",
          "This phrase teaches that biblical faith is not random risk-taking.",
          "Faith has a word from God underneath it.",
          "Abram's obedience is anchored in what God said.",
        ]),
      ],
      [
        "👥 Lot Went With Him",
        note([
          "Lot is Abram's nephew, the son of Haran who died in Genesis 11.",
          "His presence matters because he will become important in later chapters.",
          "Abram's obedience affects more than Abram alone.",
          "Family members are drawn into the journey.",
          "Lot's choices will later create tension and danger.",
          "Genesis introduces him early so readers will keep watching him.",
        ]),
      ],
      [
        "🎂 Seventy And Five Years Old",
        note([
          "Abram is seventy-five when he leaves Haran.",
          "That detail reminds readers that God's call can come late in life.",
          "Abram is not a young man starting with nothing.",
          "He has history, family, possessions, and responsibilities.",
          "Faith does not only belong to the young or unattached.",
          "God can call someone into a new chapter after many years of ordinary life.",
        ]),
      ],
      [
        "📍 Out Of Haran",
        note([
          "Haran was the place where Terah's family stopped in Genesis 11.",
          "Abram now leaves that pause point.",
          "This matters because the journey toward Canaan had begun but stalled.",
          "God's call moves Abram beyond the unfinished road of his father.",
          "Haran is not the final destination.",
          "Faith means continuing when God speaks.",
        ]),
      ],
      [
        "🐪 All Their Substance",
        note([
          "Substance means possessions, goods, livestock, and household resources.",
          "Abram does not leave as a lone traveler with nothing.",
          "He moves with a household and real responsibility.",
          "This helps the reader picture the scale of the journey.",
          "Obedience includes managing people, animals, supplies, and risk.",
          "Faith happens in practical life, not only in private feelings.",
        ]),
      ],
      [
        "👤 The Souls That They Had Gotten",
        note([
          "Souls here refers to the people connected to Abram's household.",
          "This may include servants and dependents gathered in Haran.",
          "Abram's household is already larger than one small family.",
          "That matters because his decisions affect many lives.",
          "The promise journey is communal.",
          "When Abram obeys, a whole household moves with him.",
        ]),
      ],
      [
        "🗺️ Into The Land Of Canaan",
        note([
          "Canaan is the land God will promise to Abram's descendants.",
          "The family had already started toward Canaan in Genesis 11 but stopped in Haran.",
          "Now Abram actually enters the land.",
          "This is a major step in the promise story.",
          "The land is not yet possessed.",
          "But Abram is now standing where God's promise will unfold.",
        ]),
      ],
      [
        "📍 The Place Of Sichem",
        note([
          "Sichem, often called Shechem, is a real location in the land of Canaan.",
          "It will matter again later in Genesis and in Israel's story.",
          "Genesis is grounding Abram's faith in actual geography.",
          "God's promise is not vague spirituality.",
          "It involves real places, journeys, and land.",
          "A new reader should notice these place names because they often return later.",
        ]),
      ],
      [
        "🌳 The Plain Of Moreh",
        note([
          "The plain or oak of Moreh was likely a notable landmark near Shechem.",
          "Large trees often served as recognizable meeting places or markers in the ancient world.",
          "The location gives the scene a concrete setting.",
          "Abram arrives at a known place in Canaan.",
          "Soon the Lord will appear to him there.",
          "The promise meets Abram in a real landscape.",
        ]),
      ],
      [
        "👀 The Canaanite Was Then In The Land",
        note([
          "This sentence creates tension.",
          "Abram has reached the land, but other people already live there.",
          "The promise is real, but it is not simple or immediate.",
          "Abram must trust God's word while visible obstacles remain.",
          "Genesis does not hide the difficulty.",
          "Faith often lives between promise and possession.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 7,
    endVerse: 9,
    reference: "Genesis 12:7-9",
    title: "God Promises The Land",
    icon: "⛪",
    phrases: [
      [
        "👁️ The LORD Appeared Unto Abram",
        note([
          "God does not only speak to Abram from a distance.",
          "The Lord appears to him in the land.",
          "This confirms that Abram's journey is under God's personal care.",
          "The promise is not merely an idea Abram carries.",
          "God meets him along the way.",
          "The place of obedience becomes a place of revelation.",
        ]),
      ],
      [
        "👶 Unto Thy Seed",
        note([
          "Seed means offspring or descendants.",
          "This is striking because Abram still has no child.",
          "Sarai's barrenness has already been named.",
          "God speaks about descendants before Abram can see how descendants are possible.",
          "The promise asks Abram to trust beyond present evidence.",
          "The future family exists first in God's word.",
        ]),
      ],
      [
        "🗺️ Will I Give This Land",
        note([
          "God promises the land to Abram's descendants.",
          "The land is gift language.",
          "Abram does not seize it, buy it here, or conquer it.",
          "God says He will give it.",
          "That matters because the promise depends on God's faithfulness.",
          "Abram must live in the land by faith before his family possesses it.",
        ]),
      ],
      [
        "⛪ There Builded He An Altar",
        note([
          "Abram responds to God's promise with worship.",
          "An altar is a place of sacrifice, prayer, and surrender.",
          "Abram is not only traveling through Canaan.",
          "He is marking the land with worship.",
          "The altar says that the promise belongs to the Lord.",
          "Where God speaks, Abram worships.",
        ]),
      ],
      [
        "✨ Who Appeared Unto Him",
        note([
          "Genesis repeats that the Lord appeared to Abram.",
          "That repetition helps readers connect the altar to the encounter with God.",
          "Abram is not building an altar to a vague religious feeling.",
          "He is responding to the Lord who met him.",
          "Worship in Genesis is grounded in God's self-revelation.",
          "God acts first, and Abram responds.",
        ]),
      ],
      [
        "🏠 Bethel On The West",
        note([
          "Bethel means house of God, though that name becomes especially important later.",
          "Here it marks a location near Abram's camp.",
          "The west side helps place the scene geographically.",
          "Genesis often uses place details so readers can follow the movement through the land.",
          "Bethel will become a major worship location in Jacob's story.",
          "Abram's journey is laying groundwork for later Genesis scenes.",
        ]),
      ],
      [
        "🏙️ Hai On The East",
        note([
          "Hai, often called Ai, is another location near Abram's camp.",
          "Together with Bethel, it helps readers picture where Abram settled for a time.",
          "These details may feel small, but they make the promise concrete.",
          "Abram is walking through actual land.",
          "Later Israel's story will also move through these places.",
          "Genesis is quietly building a map for future readers.",
        ]),
      ],
      [
        "🙏 Called Upon The Name Of The LORD",
        note([
          "Calling on the name of the Lord means worship, prayer, and public dependence on God.",
          "This phrase connects Abram with the worshiping line in Genesis.",
          "He is not only receiving promises.",
          "He is learning to live as a worshiper.",
          "In a land filled with other peoples and gods, Abram calls on the Lord.",
          "Faith becomes visible in worship.",
        ]),
      ],
      [
        "🚶 Abram Journeyed",
        note([
          "Abram keeps moving through the land.",
          "The life of faith is not frozen in one moment.",
          "He receives promise, worships, and continues the journey.",
          "Genesis shows faith as movement over time.",
          "Abram is learning the land step by step.",
          "The promise will unfold through repeated obedience.",
        ]),
      ],
      [
        "🏜️ Going On Still Toward The South",
        note([
          "The south refers to the Negev region, the southern part of the land.",
          "Abram is moving through Canaan from place to place.",
          "This helps readers follow the geography of the chapter.",
          "He is not yet settled permanently.",
          "He lives as a traveler under promise.",
          "The next verse will show pressure rising through famine.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 10,
    endVerse: 13,
    reference: "Genesis 12:10-13",
    title: "Abram Acts Out Of Fear",
    icon: "😨",
    phrases: [
      [
        "🌾 There Was A Famine In The Land",
        note([
          "A famine means the land did not have enough food.",
          "This is surprising because Abram has just entered the land of promise.",
          "The promised land is real, but it is not immediately easy.",
          "Obedience does not remove pressure.",
          "Genesis is showing that faith will be tested.",
          "Abram must learn to trust God when the land feels hard.",
        ]),
      ],
      [
        "⬇️ Abram Went Down Into Egypt",
        note([
          "Egypt had the Nile River and could often survive famine better than Canaan.",
          "Going down is partly geographical language.",
          "It also begins a pattern that will matter later in the Bible.",
          "Abram goes to Egypt during famine, and later Israel will do the same.",
          "Egypt can be a place of survival, but also danger.",
          "This trip becomes a test of Abram's faith and fear.",
        ]),
      ],
      [
        "⛺ To Sojourn There",
        note([
          "To sojourn means to stay temporarily as a foreigner.",
          "Abram is not moving to Egypt as his permanent home.",
          "He is seeking survival during famine.",
          "The word reminds readers that Abram is still a pilgrim.",
          "He has no settled possession yet.",
          "His life is marked by movement, dependence, and vulnerability.",
        ]),
      ],
      [
        "⚠️ The Famine Was Grievous",
        note([
          "Grievous means severe or heavy.",
          "The famine is not a small inconvenience.",
          "It is serious enough to push Abram toward Egypt.",
          "This helps readers understand why he goes.",
          "The pressure is real.",
          "But real pressure can still expose fear and weak trust.",
        ]),
      ],
      [
        "🚪 Near To Enter Into Egypt",
        note([
          "Abram's fear rises as he gets close to Egypt.",
          "Sometimes anxiety grows strongest right before entering a risky situation.",
          "He begins imagining what might happen.",
          "The coming danger may be real, but Abram's response becomes wrong.",
          "Genesis lets us watch fear form before the lie is spoken.",
          "The failure starts in his fearful imagination.",
        ]),
      ],
      [
        "👩 Fair Woman To Look Upon",
        note([
          "Abram says Sarai is beautiful.",
          "In this situation, her beauty makes him afraid.",
          "He thinks powerful Egyptians may desire her and kill him to take her.",
          "The phrase helps explain Abram's fear.",
          "But it also shows how fear turns Sarai into part of Abram's survival plan.",
          "Genesis wants readers to feel the danger she is being placed in.",
        ]),
      ],
      [
        "👀 The Egyptians Shall See Thee",
        note([
          "Abram is worried about how the Egyptians will respond when they see Sarai.",
          "He assumes danger before anything happens.",
          "Fear often builds a whole future in the mind.",
          "Abram may be facing real risk, but he does not seek God's direction here.",
          "Instead, he begins planning through fear.",
          "This is a turning point in the story.",
        ]),
      ],
      [
        "🩸 They Will Kill Me",
        note([
          "Abram fears for his own life.",
          "That fear is understandable, but it begins to rule him.",
          "He has just received promises from God, but danger makes those promises feel distant.",
          "This is painfully human.",
          "Faith can be real and still immature under pressure.",
          "Genesis shows Abram honestly.",
        ]),
      ],
      [
        "🛡️ They Will Save Thee Alive",
        note([
          "Abram believes Sarai will survive while he may be killed.",
          "That fear leads him to protect himself through deception.",
          "The plan treats Sarai's safety as secondary to his own.",
          "This is one of Abram's clearest failures.",
          "Fear can make people use others as shields.",
          "Genesis does not excuse that.",
        ]),
      ],
      [
        "👩 Say, I Pray Thee, Thou Art My Sister",
        note([
          "Abram asks Sarai to identify herself as his sister.",
          "Genesis 20 later shows there is some family connection, but here the statement hides the truth that she is his wife.",
          "That makes it deceptive.",
          "A half-truth can still function as a lie.",
          "Abram is trying to control danger with misleading words.",
          "His fear places Sarai in danger.",
        ]),
      ],
      [
        "😟 That It May Be Well With Me",
        note([
          "This phrase exposes Abram's motive.",
          "He wants things to go well for him.",
          "The problem is that his plan puts Sarai at risk.",
          "Fear has turned Abram inward.",
          "Instead of protecting his wife, he asks her to protect him.",
          "Genesis shows how fear can bend love toward self-preservation.",
        ]),
      ],
      [
        "💓 My Soul Shall Live Because Of Thee",
        note([
          "Soul here means life.",
          "Abram says his life will be spared because of Sarai.",
          "That is a heavy burden to place on her.",
          "He is depending on her deception to keep him alive.",
          "The phrase reveals how far fear has taken him from trusting God's promise.",
          "Abram's survival plan is morally broken.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 14,
    endVerse: 16,
    reference: "Genesis 12:14-16",
    title: "Sarai Is Taken Into Pharaoh's House",
    icon: "🏛️",
    phrases: [
      [
        "👀 The Egyptians Beheld The Woman",
        note([
          "Abram's fear starts coming true.",
          "The Egyptians notice Sarai.",
          "Genesis shows that his concern was not completely imaginary.",
          "But the real issue is how he responded to that fear.",
          "He chose deception instead of trust.",
          "Now Sarai is exposed to danger.",
        ]),
      ],
      [
        "✨ Very Fair",
        note([
          "Very fair means very beautiful.",
          "The text repeats Sarai's beauty because it drives the crisis.",
          "Powerful men notice her.",
          "Abram's plan does not protect her from being taken.",
          "It actually helps create the danger.",
          "Genesis lets readers see the cost of fear-driven choices.",
        ]),
      ],
      [
        "👑 The Princes Also Of Pharaoh Saw Her",
        note([
          "Pharaoh's officials notice Sarai and bring word to the palace.",
          "This moves the problem from ordinary Egyptians to royal power.",
          "Abram and Sarai are now caught in a much larger system.",
          "Pharaoh is the king of Egypt.",
          "His house has power Abram cannot control.",
          "The deception has opened a door Abram cannot easily close.",
        ]),
      ],
      [
        "🗣️ Commended Her Before Pharaoh",
        note([
          "To commend her means they praised or recommended her to Pharaoh.",
          "Sarai is spoken about before the king as desirable.",
          "This is a frightening moment because she is being moved by other people's decisions.",
          "Abram's lie has not kept the situation small.",
          "It has carried Sarai into Pharaoh's attention.",
          "The promise family is now in danger.",
        ]),
      ],
      [
        "🏛️ The Woman Was Taken Into Pharaoh's House",
        note([
          "This is the crisis point.",
          "Sarai is taken into Pharaoh's house.",
          "That means Abram's wife is now inside another man's royal household.",
          "The promise of descendants is threatened.",
          "Abram's fear has placed the covenant future in danger.",
          "God will have to intervene to protect Sarai and the promise.",
        ]),
      ],
      [
        "🎁 He Entreated Abram Well For Her Sake",
        note([
          "Pharaoh treats Abram well because of Sarai.",
          "Abram receives benefits from the very deception that endangers his wife.",
          "This makes the scene morally uncomfortable.",
          "Genesis does not present Abram as heroic here.",
          "He profits while Sarai is vulnerable.",
          "The Bible is honest about the failures of its main characters.",
        ]),
      ],
      [
        "🐑 Sheep, Oxen, Asses, Servants, Camels",
        note([
          "These gifts show wealth in the ancient world.",
          "Livestock, servants, and camels represented status and resources.",
          "Abram becomes richer in Egypt.",
          "But the gain comes in a compromised situation.",
          "This helps readers see that material increase is not always a sign that everything is spiritually healthy.",
          "Abram needs rescue more than riches here.",
        ]),
      ],
    ],
  },
  {
    chapter: 12,
    startVerse: 17,
    endVerse: 20,
    reference: "Genesis 12:17-20",
    title: "God Protects Sarai In Egypt",
    icon: "🛡️",
    phrases: [
      [
        "🛡️ The LORD Plagued Pharaoh",
        note([
          "God intervenes directly.",
          "Abram has failed to protect Sarai, but the Lord protects her.",
          "The plagues show that Pharaoh's house cannot simply absorb Abram's wife.",
          "God is guarding the promise line.",
          "This rescue does not excuse Abram's deception.",
          "It shows that God's faithfulness is stronger than Abram's fear.",
        ]),
      ],
      [
        "⚡ Great Plagues",
        note([
          "The plagues are serious enough for Pharaoh to realize something is wrong.",
          "This also foreshadows later Bible history.",
          "In Exodus, God will again strike Pharaoh's house with plagues to deliver Abram's descendants.",
          "Genesis is planting an early pattern.",
          "Egypt, Pharaoh, plagues, and deliverance will return in a bigger way.",
          "God is already showing Himself as defender of His people.",
        ]),
      ],
      [
        "👩 Because Of Sarai Abram's Wife",
        note([
          "This phrase explains why the plagues come.",
          "Sarai is Abram's wife, not merely his sister.",
          "Her true relationship to Abram matters for the promise.",
          "God's judgment protects her from being kept in Pharaoh's house.",
          "Genesis centers Sarai's importance here.",
          "The promise cannot be separated from the woman God will use in Abram's family.",
        ]),
      ],
      [
        "📣 Pharaoh Called Abram",
        note([
          "Pharaoh confronts Abram.",
          "This is striking because the pagan king speaks the truth Abram avoided.",
          "Abram is the one called by God, but Pharaoh exposes the deception.",
          "Genesis does not flatter Abram.",
          "Sometimes correction comes from an unexpected mouth.",
          "Abram must face what his fear has done.",
        ]),
      ],
      [
        "❓ What Is This That Thou Hast Done Unto Me?",
        note([
          "Pharaoh asks a question of moral shock.",
          "Abram's deception has harmed more than his own household.",
          "It has brought danger onto Pharaoh's house too.",
          "Sin often spreads consequences beyond the person who chooses it.",
          "The question forces Abram's actions into the open.",
          "Fearful secrecy is exposed.",
        ]),
      ],
      [
        "🤐 Why Didst Thou Not Tell Me That She Was Thy Wife?",
        note([
          "Pharaoh names the hidden truth.",
          "Sarai was Abram's wife.",
          "Abram's half-truth concealed the most important fact.",
          "This helps readers understand why half-truths can still be deeply dishonest.",
          "The missing truth changed how others acted.",
          "Abram's silence created danger.",
        ]),
      ],
      [
        "💍 I Might Have Taken Her To Me To Wife",
        note([
          "Pharaoh explains how serious the danger was.",
          "Sarai could have become his wife.",
          "That would have created a major crisis for Abram's marriage and the promise.",
          "God's intervention prevented the situation from going further.",
          "The phrase shows what Abram's fear nearly allowed.",
          "The promise survives because God steps in.",
        ]),
      ],
      [
        "👩 Now Therefore Behold Thy Wife",
        note([
          "Pharaoh returns Sarai to Abram.",
          "This is mercy Abram did not deserve.",
          "Sarai is restored, and the promise line is protected.",
          "The command also publicly identifies her correctly as Abram's wife.",
          "The truth is brought back into the open.",
          "God's rescue restores what fear had endangered.",
        ]),
      ],
      [
        "👮 Pharaoh Commanded His Men Concerning Him",
        note([
          "Pharaoh gives orders about Abram.",
          "Abram does not leave Egypt because he has managed the situation well.",
          "He leaves because Pharaoh sends him away.",
          "This is an uncomfortable rescue.",
          "Abram is preserved, but he is also exposed.",
          "God's mercy does not make Abram's actions look noble.",
        ]),
      ],
      [
        "🚪 They Sent Him Away",
        note([
          "Abram leaves Egypt with Sarai and his possessions.",
          "The episode ends with deliverance, but not with Abram looking heroic.",
          "He is rescued from danger his own fear helped create.",
          "This teaches that God's promise is carried by grace.",
          "Abram will continue learning faith.",
          "The Lord remains faithful even when Abram is weak.",
        ]),
      ],
    ],
  },
];

const GENESIS_13_PERSONAL_REWRITE_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 13,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 13:1-7",
    title: "Abram And Lot Outgrow The Land",
    icon: "🐑",
    phrases: [
      [
        "🔙 Abram Went Up Out Of Egypt",
        note([
          "Abram leaves Egypt and returns toward the land of promise.",
          "This feels like a recovery movement after the fear and deception of Genesis 12.",
          "Egypt was the place where Abram compromised.",
          "Now he is moving back toward the place God called him.",
          "Genesis does not leave Abram stuck in his failure.",
          "The story keeps pulling him back toward promise, worship, and trust.",
        ]),
      ],
      [
        "👩 He And His Wife",
        note([
          "Sarai is still with Abram after the danger in Egypt.",
          "That matters because Genesis 12 placed her in Pharaoh's house through Abram's fear.",
          "God protected and restored her.",
          "Now the family leaves Egypt together.",
          "The phrase quietly shows mercy after a dangerous failure.",
          "The promise line has been preserved.",
        ]),
      ],
      [
        "👥 And Lot With Him",
        note([
          "Lot continues traveling with Abram.",
          "He is Abram's nephew, and he has been part of the journey since Haran.",
          "His presence matters because the next conflict will involve him directly.",
          "Genesis keeps Lot close in the story so readers can watch his direction.",
          "He shares Abram's journey for now.",
          "But Genesis 13 will show their paths beginning to separate.",
        ]),
      ],
      [
        "🏜️ Into The South",
        note([
          "The south refers to the Negev region, the southern part of Canaan.",
          "Abram is returning through the land after Egypt.",
          "The place detail helps readers follow his movement.",
          "He is not wandering in a vague spiritual space.",
          "He is moving through real geography.",
          "Faith keeps happening on actual roads.",
        ]),
      ],
      [
        "💰 Very Rich In Cattle, Silver, And Gold",
        note([
          "Abram has become very wealthy.",
          "Cattle, silver, and gold were major signs of wealth in the ancient world.",
          "But Genesis is about to show that wealth brings pressure too.",
          "The problem in this chapter is not famine, but abundance.",
          "Too much livestock and household growth will strain the land.",
          "Blessing still requires wisdom.",
        ]),
      ],
      [
        "🧭 He Went On His Journeys",
        note([
          "Abram keeps moving through the land.",
          "His life is still not settled in one permanent place.",
          "He is wealthy, but he is still a pilgrim under promise.",
          "This phrase reminds readers that possessions do not equal arrival.",
          "Abram has resources, but he still lives by faith.",
          "The promise is real, but not fully possessed yet.",
        ]),
      ],
      [
        "🏠 Bethel",
        note([
          "Bethel is the place near where Abram had earlier built an altar.",
          "The name means house of God, and it will become very important later in Genesis.",
          "Abram's return to this area matters because it brings him back near a worship marker.",
          "After Egypt, he returns to the place connected with calling on the Lord.",
          "This feels like a spiritual reset.",
          "The map is also carrying memory.",
        ]),
      ],
      [
        "🏙️ Hai",
        note([
          "Hai, often called Ai, marks the other side of Abram's camp near Bethel.",
          "Genesis names both places to locate Abram's return.",
          "This helps readers see that he is coming back to a known place in the land.",
          "Small place names often matter later in the Bible.",
          "They help build the biblical map.",
          "Abram's worship and movement are tied to real locations.",
        ]),
      ],
      [
        "⛪ The Place Of The Altar",
        note([
          "Abram comes back to the altar he had made earlier.",
          "That matters after the failure in Egypt.",
          "The altar represents worship, surrender, and dependence on God.",
          "Abram does not fix the past by pretending it never happened.",
          "He returns to the place of worship.",
          "That is the right direction after failure.",
        ]),
      ],
      [
        "🙏 Called On The Name Of The LORD",
        note([
          "Calling on the name of the Lord means worship, prayer, and dependence.",
          "Abram had acted out of fear in Egypt.",
          "Now he is back in a worship posture.",
          "This phrase shows spiritual recovery.",
          "Faith is not perfection.",
          "Faith returns to the Lord after failure.",
        ]),
      ],
      [
        "🐑 Lot Also Had Flocks, And Herds, And Tents",
        note([
          "Lot has grown wealthy too.",
          "He has animals and tents, which means his household has expanded.",
          "This sets up the conflict.",
          "Abram and Lot are both blessed with possessions.",
          "But their growth creates practical pressure.",
          "Sometimes increase creates problems that require wisdom.",
        ]),
      ],
      [
        "🌾 The Land Was Not Able To Bear Them",
        note([
          "The land cannot support both Abram's and Lot's households together.",
          "Too many animals need grazing land and water.",
          "This is a practical problem, not a mysterious one.",
          "But practical problems can become spiritual tests.",
          "Abram must decide how to handle pressure inside the family.",
          "Genesis is moving from famine pressure to abundance pressure.",
        ]),
      ],
      [
        "📦 Their Substance Was Great",
        note([
          "Substance means possessions and resources.",
          "Abram and Lot have so much that staying together becomes difficult.",
          "This phrase shows that blessing can create strain.",
          "More resources can mean more responsibility, more decisions, and more possible conflict.",
          "Genesis is realistic about wealth.",
          "Increase does not automatically make relationships easier.",
        ]),
      ],
      [
        "⚔️ There Was A Strife",
        note([
          "Strife means conflict or quarrel.",
          "The conflict begins between the herdsmen of Abram and Lot.",
          "This is not yet Abram and Lot yelling at each other, but tension is growing around them.",
          "Wise leadership notices conflict before it destroys the relationship.",
          "Abram will step in before the strife gets worse.",
          "Faith has to work in ordinary family tension too.",
        ]),
      ],
      [
        "👀 The Canaanite And The Perizzite Dwelled Then In The Land",
        note([
          "Genesis reminds us that Abram and Lot are not alone in the land.",
          "Other peoples are already living there.",
          "That means grazing space and settlement space are limited.",
          "The promise land is occupied and complicated.",
          "This detail helps explain why the conflict matters.",
          "Abram must practice faith in a crowded, contested land.",
        ]),
      ],
    ],
  },
  {
    chapter: 13,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 13:8-13",
    title: "Lot Chooses The Plain",
    icon: "👀",
    phrases: [
      [
        "🤝 Let There Be No Strife",
        note([
          "Abram takes initiative to stop the conflict.",
          "He does not wait for the problem to explode.",
          "He values peace with Lot more than winning the best land.",
          "This shows growth after Egypt.",
          "Fear made Abram self-protective in Genesis 12.",
          "Trust now makes him open-handed in Genesis 13.",
        ]),
      ],
      [
        "👨‍👦 We Be Brethren",
        note([
          "Abram reminds Lot that they are family.",
          "The word brethren can refer to close relatives, not only biological brothers.",
          "This matters because conflict is not only about land.",
          "It is about preserving relationship.",
          "Abram refuses to treat Lot like an enemy.",
          "Family peace matters more than getting the first advantage.",
        ]),
      ],
      [
        "🗺️ Is Not The Whole Land Before Thee?",
        note([
          "Abram gives Lot room to choose.",
          "This is surprising because Abram is the older man and the one God called.",
          "He could have insisted on priority.",
          "Instead, he releases control.",
          "Abram can be generous because God's promise does not depend on Lot's choice.",
          "Trust makes him less desperate to grab.",
        ]),
      ],
      [
        "↔️ Separate Thyself, I Pray Thee, From Me",
        note([
          "Abram recognizes that the households need space.",
          "Separation here is not hatred.",
          "It is a practical way to preserve peace.",
          "Sometimes wisdom means creating distance before conflict ruins relationship.",
          "Abram is not abandoning Lot.",
          "He is handling a real problem with humility.",
        ]),
      ],
      [
        "👀 Lot Lifted Up His Eyes",
        note([
          "Lot chooses by what he sees.",
          "The phrase matters because seeing becomes part of the decision.",
          "He notices the well-watered plain and makes his choice based on visible advantage.",
          "Genesis is not saying eyesight is evil.",
          "It is warning that sight without spiritual discernment can mislead.",
          "Lot sees opportunity, but not the danger attached to it.",
        ]),
      ],
      [
        "💧 Well Watered Every Where",
        note([
          "Water means life, food, pasture, and prosperity.",
          "For someone with flocks and herds, the well-watered plain would look like the obvious choice.",
          "Lot's choice makes practical sense on the surface.",
          "That is what makes the story so useful.",
          "Not every dangerous choice looks dangerous at first.",
          "Some choices look fruitful while quietly pulling the heart toward compromise.",
        ]),
      ],
      [
        "🌿 Like The Garden Of The LORD",
        note([
          "This comparison makes the plain sound beautiful and fruitful.",
          "It reminds readers of Eden.",
          "Lot sees a place that looks like life, abundance, and blessing.",
          "But Genesis is about to connect the area with Sodom.",
          "That contrast is the warning.",
          "Something can look like Eden and still lead toward danger.",
        ]),
      ],
      [
        "⬇️ Like The Land Of Egypt",
        note([
          "Egypt had just appeared as a place of survival and danger in Genesis 12.",
          "The comparison makes Lot's choice feel attractive, but also uneasy.",
          "Egypt was fertile, but Abram's time there was spiritually messy.",
          "Lot is choosing what looks lush.",
          "Genesis wants readers to remember that appearance is not the whole story.",
          "Fruitfulness without discernment can become a trap.",
        ]),
      ],
      [
        "🏙️ As Thou Comest Unto Zoar",
        note([
          "Zoar locates the region Lot is looking toward.",
          "It will matter later in the story of Sodom and Gomorrah.",
          "Genesis is quietly placing Lot near the geography of coming judgment.",
          "A new reader may pass over the name quickly.",
          "But the location is a clue.",
          "Lot's choice is moving him toward a dangerous neighborhood.",
        ]),
      ],
      [
        "🧭 Lot Chose Him All The Plain Of Jordan",
        note([
          "Lot chooses the whole plain for himself.",
          "Abram gave him the first choice, and Lot takes the attractive option.",
          "The decision reveals what Lot values in the moment.",
          "He chooses by visible advantage.",
          "Genesis will show that the best-looking land is not always the safest place for the soul.",
          "This is the beginning of Lot's drift toward Sodom.",
        ]),
      ],
      [
        "🌅 Lot Journeyed East",
        note([
          "Lot moves east after choosing the plain.",
          "In Genesis, eastward movement often carries a sense of distance, separation, or movement toward danger.",
          "Adam and Eve go east of Eden.",
          "Cain goes east after judgment.",
          "Babel's people are connected with eastern movement too.",
          "Lot's eastward journey fits that pattern of spiritual warning.",
          "The direction is telling us more than where his feet went.",
        ]),
      ],
      [
        "↔️ They Separated Themselves",
        note([
          "Abram and Lot now go different ways.",
          "The separation solves the immediate strife.",
          "But it also sets up two different paths.",
          "Abram remains connected to the promise.",
          "Lot moves toward the cities of the plain.",
          "Genesis is contrasting trust and sight-driven choice.",
        ]),
      ],
      [
        "⛺ Abram Dwelled In The Land Of Canaan",
        note([
          "Abram stays in Canaan, the land connected to God's promise.",
          "He does not chase after the best-looking plain.",
          "This matters because Abram's future rests on God's word, not on grabbing visible advantage.",
          "Canaan is still complicated and occupied.",
          "But it is the land God named.",
          "Abram remains in the place of promise.",
        ]),
      ],
      [
        "🏙️ Lot Dwelled In The Cities Of The Plain",
        note([
          "Lot settles among the cities of the plain.",
          "This is a step closer to Sodom.",
          "Genesis often shows drift before disaster.",
          "Lot does not begin by being described as wicked.",
          "He begins by choosing what looks profitable and moving near danger.",
          "The direction of a choice matters before the destination fully appears.",
        ]),
      ],
      [
        "⛺ Pitched His Tent Toward Sodom",
        note([
          "This is one of the most important warning phrases in the chapter.",
          "Lot is not yet described as living in Sodom, but his tent is facing that direction.",
          "His life is oriented toward the city.",
          "That matters because direction shapes destination.",
          "Many bad endings begin as small adjustments of direction.",
          "Genesis is asking readers to notice what Lot is moving toward.",
        ]),
      ],
      [
        "⚠️ The Men Of Sodom Were Wicked",
        note([
          "Genesis gives the reader information Lot does not seem to weigh properly.",
          "Sodom is not only a city with opportunity.",
          "It is a place of serious wickedness.",
          "This warning changes how we read Lot's choice.",
          "The land may be well-watered, but the moral environment is dangerous.",
          "Spiritual danger can hide beside material opportunity.",
        ]),
      ],
      [
        "💔 Sinners Before The LORD Exceedingly",
        note([
          "This phrase emphasizes the seriousness of Sodom's sin.",
          "The issue is not reputation only.",
          "Their wickedness is before the Lord.",
          "God sees what is happening in the city.",
          "Lot's movement toward Sodom is therefore deeply concerning.",
          "Genesis is preparing the reader for later judgment.",
        ]),
      ],
    ],
  },
  {
    chapter: 13,
    startVerse: 14,
    endVerse: 18,
    reference: "Genesis 13:14-18",
    title: "God Repeats The Land Promise",
    icon: "🌍",
    phrases: [
      [
        "📣 The LORD Said Unto Abram",
        note([
          "God speaks after Lot separates from Abram.",
          "That timing matters.",
          "Abram has just released control and let Lot choose first.",
          "Now the Lord reminds Abram of the promise.",
          "Abram's future has not been damaged by generosity.",
          "God's word still stands.",
        ]),
      ],
      [
        "👀 Lift Up Now Thine Eyes",
        note([
          "God tells Abram to look.",
          "This contrasts with Lot lifting his eyes earlier.",
          "Lot looked and chose by visible advantage.",
          "Abram looks after God speaks.",
          "Both men see land, but the heart posture is different.",
          "Faith learns to see through promise.",
        ]),
      ],
      [
        "🧭 Northward, Southward, Eastward, And Westward",
        note([
          "God tells Abram to look in every direction.",
          "The promise is broad and concrete.",
          "This is not a vague spiritual feeling.",
          "It is land with directions, borders, and future history.",
          "Abram can look around and remember God's word.",
          "The whole scene teaches promise through geography.",
        ]),
      ],
      [
        "🌍 All The Land Which Thou Seest",
        note([
          "God promises Abram the land he can see.",
          "This comes after Abram allowed Lot to choose first.",
          "Abram did not lose the promise by refusing to grasp.",
          "God's gift is not threatened by Lot's decision.",
          "The land belongs to God's promise, not Abram's anxiety.",
          "Faith can be open-handed because God is faithful.",
        ]),
      ],
      [
        "🎁 To Thee Will I Give It",
        note([
          "The land is described as God's gift.",
          "Abram does not seize it in this moment.",
          "He receives the promise from the Lord.",
          "That matters because Genesis keeps contrasting grasping and receiving.",
          "Babel grasped for a name.",
          "Lot grasped for the best-looking land.",
          "Abram learns to receive what God gives.",
        ]),
      ],
      [
        "👶 To Thy Seed For Ever",
        note([
          "God repeats that Abram's descendants will inherit the land.",
          "This is still remarkable because Abram and Sarai have no child.",
          "The promise keeps speaking beyond what Abram can currently see.",
          "Seed means offspring or descendants.",
          "God is tying land and family together.",
          "The future is still held by God's word.",
        ]),
      ],
      [
        "🌫️ As The Dust Of The Earth",
        note([
          "Dust is impossible to count.",
          "God uses that image to describe Abram's future descendants.",
          "The picture is huge, earthy, and everywhere.",
          "It stretches Abram's imagination.",
          "Right now he has no son.",
          "But God speaks of descendants beyond numbering.",
        ]),
      ],
      [
        "🚶 Arise, Walk Through The Land",
        note([
          "God tells Abram to walk through the land.",
          "This turns the promise into embodied faith.",
          "Abram is invited to move through what God has promised.",
          "He still does not possess it fully.",
          "But his steps become a way of trusting God's word.",
          "Faith walks before fulfillment is complete.",
        ]),
      ],
      [
        "📏 The Length Of It And The Breadth Of It",
        note([
          "Length and breadth describe the full scope of the land.",
          "God is making the promise feel expansive and concrete.",
          "Abram is not being given a tiny corner in vague terms.",
          "He is told to walk the land's dimensions.",
          "The promise has size, space, and future.",
          "God's word gives Abram a map for hope.",
        ]),
      ],
      [
        "🌳 The Plain Of Mamre",
        note([
          "Mamre becomes an important location in Abram's story.",
          "Abram settles near the trees of Mamre in Hebron.",
          "This place will appear again when the Lord visits Abraham in Genesis 18.",
          "Genesis is planting another location that will matter later.",
          "Abram's journey is marked by places of promise and encounter.",
          "The map keeps gathering meaning.",
        ]),
      ],
      [
        "🏙️ Hebron",
        note([
          "Hebron is one of the major places in the patriarch stories.",
          "It becomes connected with Abraham, Sarah, Isaac, Rebekah, Jacob, and Leah through the family burial place later in Genesis.",
          "Here it marks Abram's settlement after separating from Lot.",
          "The place will carry covenant memory.",
          "A new reader should notice Hebron because it returns with deep family significance.",
          "Genesis is quietly building future context.",
        ]),
      ],
      [
        "⛪ Built There An Altar Unto The LORD",
        note([
          "Abram ends this section with worship again.",
          "After Lot chooses, after God repeats the promise, Abram builds an altar.",
          "This is his better pattern.",
          "He answers promise with worship.",
          "He marks the land with dependence on the Lord.",
          "Abram's life is becoming a journey of tents and altars.",
        ]),
      ],
    ],
  },
];

const GENESIS_14_PERSONAL_REWRITE_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 14,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 14:1-9",
    title: "Kings Go To War",
    icon: "⚔️",
    phrases: [
      [
        "👑 Amraphel, Arioch, Chedorlaomer, And Tidal",
        note([
          "Genesis 14 opens with a list of kings.",
          "The names can feel confusing, but they show Abram's world was politically complicated.",
          "This is not a peaceful empty land.",
          "There are rulers, alliances, wars, and power struggles.",
          "Abram's family is living inside real ancient history.",
          "The promise is unfolding in a messy world.",
        ]),
      ],
      [
        "📍 Shinar, Ellasar, Elam, And Nations",
        note([
          "These place names show that the conflict reaches beyond one small town.",
          "Shinar connects back to the region of Babel.",
          "Elam was east of Mesopotamia.",
          "The word nations may refer to a group of peoples under Tidal.",
          "Genesis is showing a wider regional war.",
          "Lot's neighborhood is about to be pulled into something much bigger than itself.",
        ]),
      ],
      [
        "⚔️ These Made War",
        note([
          "This phrase tells us Genesis 14 is a war chapter.",
          "That may feel sudden after Abram's altars and promises.",
          "But the promised land is not insulated from violence.",
          "Faith does not happen in a calm bubble.",
          "Abram's promise journey will touch conflict, danger, and rescue.",
          "Genesis is widening the world around him.",
        ]),
      ],
      [
        "🏙️ Bera King Of Sodom",
        note([
          "The king of Sodom enters the story here.",
          "Sodom has already been described as wicked in Genesis 13.",
          "Now Sodom is part of a political conflict.",
          "This matters because Lot has pitched his tent toward Sodom.",
          "The place Lot moved toward is not only morally dangerous.",
          "It is also politically unstable.",
        ]),
      ],
      [
        "🏙️ Sodom, Gomorrah, Admah, Zeboiim, And Bela",
        note([
          "These are the cities of the plain involved in the battle.",
          "Sodom and Gomorrah will become the most famous because of Genesis 19.",
          "But here they are part of a group of allied cities.",
          "Genesis is showing the region Lot chose was tied to a network of city power.",
          "The beautiful plain had danger under the surface.",
          "Lot's choice is getting more complicated.",
        ]),
      ],
      [
        "🌊 The Vale Of Siddim, Which Is The Salt Sea",
        note([
          "The vale of Siddim is the battle location.",
          "Genesis identifies it with the Salt Sea region, often connected with the Dead Sea area.",
          "This helps readers place the story geographically.",
          "The battle is not abstract.",
          "It happens in the region near the cities of the plain.",
          "The place Lot chose is now a battlefield.",
        ]),
      ],
      [
        "⛓️ Twelve Years They Served Chedorlaomer",
        note([
          "The cities of the plain had been under Chedorlaomer's power for twelve years.",
          "Served here means they were subject to him, likely paying tribute or living under his control.",
          "This explains why war breaks out.",
          "The conflict is about domination and rebellion.",
          "Genesis is not dropping random names.",
          "It is explaining the pressure behind the battle.",
        ]),
      ],
      [
        "✊ In The Thirteenth Year They Rebelled",
        note([
          "After twelve years of service, the cities rebel.",
          "That rebellion triggers the military response in the next year.",
          "The phrase helps readers understand the timeline.",
          "War comes because power is being challenged.",
          "Lot is living near a city caught inside that conflict.",
          "The choice of location now has consequences.",
        ]),
      ],
      [
        "🗡️ In The Fourteenth Year",
        note([
          "The fourteenth year is when Chedorlaomer and his allies strike back.",
          "This shows the war has a history before the battle near Sodom.",
          "The invading kings are not wandering randomly.",
          "They are reasserting control over rebellious territories.",
          "Genesis gives enough timing to show cause and effect.",
          "The conflict has been building for years.",
        ]),
      ],
      [
        "👥 Rephaims, Zuzims, Emims, And Horites",
        note([
          "These are peoples defeated by the invading kings before the battle with Sodom's alliance.",
          "The names may be unfamiliar, but they show how powerful the invading army is.",
          "They sweep through multiple peoples and regions.",
          "This builds tension.",
          "By the time they reach Sodom's area, they have already won several victories.",
          "Lot is caught near a dangerous military force.",
        ]),
      ],
      [
        "🌴 Enmishpat, Which Is Kadesh",
        note([
          "Genesis gives an older name and a later-known name for the location.",
          "That helps readers connect ancient place names with places known later.",
          "Kadesh will matter again in Israel's wilderness story.",
          "The Bible often preserves these location links because geography carries memory.",
          "The war path moves through real places.",
          "Genesis is building a map that later readers can recognize.",
        ]),
      ],
      [
        "⚔️ The Amalekites And The Amorites",
        note([
          "These peoples will matter later in the Old Testament.",
          "The Amalekites become enemies of Israel in the wilderness period.",
          "The Amorites become one of the major peoples in the land.",
          "Genesis is planting names before they become large themes.",
          "A new reader may not know them yet, but the Bible is building future context.",
          "The land Abram walks through already contains peoples with long stories ahead.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 10,
    endVerse: 12,
    reference: "Genesis 14:10-12",
    title: "Lot Is Taken Captive",
    icon: "⛓️",
    phrases: [
      [
        "🛢️ The Vale Of Siddim Was Full Of Slimepits",
        note([
          "Slimepits were bitumen pits.",
          "Bitumen is the same kind of tar-like material connected with ancient building.",
          "Here the landscape itself becomes dangerous.",
          "The battlefield is not only full of soldiers.",
          "It is full of traps in the ground.",
          "Genesis gives the detail so the defeat feels vivid and real.",
        ]),
      ],
      [
        "🏃 The Kings Of Sodom And Gomorrah Fled",
        note([
          "The kings of Sodom and Gomorrah lose the battle and run.",
          "The city powers that looked strong cannot protect themselves.",
          "This matters because Lot had moved toward Sodom's world.",
          "The strength of that world collapses quickly.",
          "Genesis is showing the insecurity beneath impressive cities.",
          "Lot's chosen place cannot save him.",
        ]),
      ],
      [
        "🕳️ They Fell There",
        note([
          "Some of the fleeing men fall into the slimepits.",
          "The battlefield turns chaotic.",
          "This small phrase helps readers picture the panic of defeat.",
          "Human power can unravel fast.",
          "The kings who rebelled cannot stand against the invading force.",
          "The scene prepares us for Lot's capture.",
        ]),
      ],
      [
        "📦 They Took All The Goods Of Sodom And Gomorrah",
        note([
          "The victors take the goods of the defeated cities.",
          "This was common in ancient warfare.",
          "Conquerors plundered wealth, supplies, and possessions.",
          "The phrase shows how total the defeat is.",
          "Sodom and Gomorrah lose not only the battle, but their resources.",
          "The beautiful plain becomes a place of loss.",
        ]),
      ],
      [
        "🍞 All Their Victuals",
        note([
          "Victuals means food or provisions.",
          "The invading kings take the supplies too.",
          "That detail matters because food is survival.",
          "The cities are stripped of what they need to keep going.",
          "War in Genesis is not clean or distant.",
          "It touches homes, tables, and daily life.",
        ]),
      ],
      [
        "⛓️ They Took Lot",
        note([
          "This is the personal crisis in the middle of the war report.",
          "Lot is captured with the people and goods of Sodom.",
          "His earlier choice now bears painful fruit.",
          "He moved toward Sodom, and now Sodom's trouble reaches him.",
          "Genesis is not saying every hardship is simple punishment.",
          "But it is showing that direction matters.",
        ]),
      ],
      [
        "👨‍👦 Abram's Brother's Son",
        note([
          "Genesis reminds us Lot is Abram's nephew.",
          "That family connection matters because Abram will not ignore him.",
          "Even though Lot separated from Abram, he is still family.",
          "The phrase pulls the reader's heart back to the relationship.",
          "This is not only a political capture.",
          "It is Abram's nephew in danger.",
        ]),
      ],
      [
        "🏙️ Who Dwelt In Sodom",
        note([
          "This is a major step from Genesis 13.",
          "Lot had pitched his tent toward Sodom.",
          "Now he is dwelling in Sodom.",
          "The drift has continued.",
          "That detail is quietly devastating.",
          "Lot has moved from facing the city to living inside its trouble.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 13,
    endVerse: 16,
    reference: "Genesis 14:13-16",
    title: "Abram Rescues Lot",
    icon: "🛡️",
    phrases: [
      [
        "🏃 There Came One That Had Escaped",
        note([
          "Someone escapes the battle and brings news to Abram.",
          "This is how Abram learns Lot has been captured.",
          "The phrase moves the story from regional war to family rescue.",
          "Abram was not part of the battle at first.",
          "But the report draws him in.",
          "Lot's danger becomes Abram's responsibility.",
        ]),
      ],
      [
        "🏃 Abram The Hebrew",
        note([
          "This is the first time Abram is called the Hebrew.",
          "The title marks him as distinct among the peoples around him.",
          "Abram is a stranger in the land, but he is not powerless.",
          "He belongs to the promise of God.",
          "The name reminds readers that Abram's identity is different from the kings around him.",
          "He is not just another local ruler chasing power.",
        ]),
      ],
      [
        "🌳 The Plain Of Mamre The Amorite",
        note([
          "Abram is dwelling near Mamre, an Amorite ally.",
          "Mamre has already become part of Abram's map in Genesis 13.",
          "This place will matter again later.",
          "The detail also shows Abram has relationships in the land.",
          "He is a sojourner, but not isolated.",
          "God's promise is unfolding through real places and real neighbors.",
        ]),
      ],
      [
        "🤝 Confederates With Abram",
        note([
          "Mamre, Eshcol, and Aner are allied with Abram.",
          "A confederate is a covenant ally or partner.",
          "This helps readers understand how Abram can respond to the crisis.",
          "He has local support.",
          "Abram is not a king in this chapter, but he can act with organized strength.",
          "The promise life includes wise relationships.",
        ]),
      ],
      [
        "👂 Abram Heard That His Brother Was Taken Captive",
        note([
          "Brother here refers to Lot as close family.",
          "Abram hears, and he acts.",
          "He does not say Lot made his own choice and deserves the consequences.",
          "He moves toward rescue.",
          "This shows loyalty and courage.",
          "Grace goes after family even after separation.",
        ]),
      ],
      [
        "🛡️ Armed His Trained Servants",
        note([
          "Abram has trained men in his household.",
          "This shows his household is large, organized, and capable.",
          "The word trained suggests readiness, not panic.",
          "Abram is a man of faith, but he also uses practical preparation.",
          "Trusting God does not mean refusing wise action.",
          "He gathers what has been entrusted to him for a rescue mission.",
        ]),
      ],
      [
        "🏠 Born In His Own House",
        note([
          "These servants were born within Abram's household.",
          "That means they are not random hired soldiers picked up at the last moment.",
          "They belong to his household structure.",
          "This gives us a picture of Abram's growing community.",
          "The promise family already includes many lives under Abram's care.",
          "His household moves, worships, and now fights to rescue Lot.",
        ]),
      ],
      [
        "🔢 Three Hundred And Eighteen",
        note([
          "Genesis gives the exact number of trained men.",
          "That detail makes the rescue concrete.",
          "Abram is not leading a giant empire army.",
          "He has a household force.",
          "The number also shows how large and organized his household has become.",
          "God's promise is already giving Abram weight in the land.",
        ]),
      ],
      [
        "🧭 Pursued Them Unto Dan",
        note([
          "Abram pursues the enemy far north.",
          "Dan is a later-known name for a northern location in the land.",
          "The pursuit shows courage and urgency.",
          "Abram does not make a symbolic gesture.",
          "He goes after Lot until he reaches the enemy.",
          "The rescue requires distance, risk, and resolve.",
        ]),
      ],
      [
        "🌙 Divided Himself Against Them By Night",
        note([
          "Abram uses a night strategy.",
          "He divides his forces and attacks when the enemy is vulnerable.",
          "This shows wisdom and courage together.",
          "Abram's faith is not passive.",
          "He thinks, acts, and takes risk.",
          "The rescue is both brave and strategic.",
        ]),
      ],
      [
        "🏃 Pursued Them Unto Hobah",
        note([
          "Abram keeps pursuing after the first strike.",
          "He does not stop halfway.",
          "The detail shows the rescue is thorough.",
          "Hobah is north of Damascus, showing how far the chase goes.",
          "Abram is willing to go the distance for Lot.",
          "Family rescue costs energy and courage.",
        ]),
      ],
      [
        "🎒 He Brought Back All The Goods",
        note([
          "Abram recovers what was taken.",
          "The rescue is not partial.",
          "Goods, people, and Lot are brought back.",
          "This reverses the plundering of Sodom and Gomorrah.",
          "Abram becomes an instrument of restoration.",
          "The promised man brings blessing into a broken situation.",
        ]),
      ],
      [
        "👨‍👦 His Brother Lot",
        note([
          "Genesis again calls Lot Abram's brother or close kinsman.",
          "The family bond is emphasized at the moment of rescue.",
          "Lot had chosen away from Abram.",
          "Abram still rescues him.",
          "That is generous and costly.",
          "The phrase keeps the rescue personal.",
        ]),
      ],
      [
        "👩 The Women Also, And The People",
        note([
          "Abram rescues more than Lot and the goods.",
          "Women and other people are also brought back.",
          "This matters because war captures whole communities, not just leaders.",
          "Abram's action blesses many people.",
          "The promise to be a blessing is already being seen in his life.",
          "His courage brings restoration beyond his own household.",
        ]),
      ],
    ],
  },
  {
    chapter: 14,
    startVerse: 17,
    endVerse: 24,
    reference: "Genesis 14:17-24",
    title: "Melchizedek Blesses Abram",
    icon: "🍞",
    phrases: [
      [
        "👑 The King Of Sodom Went Out To Meet Him",
        note([
          "After Abram's victory, the king of Sodom comes to meet him.",
          "This sets up a test after success.",
          "Abram has just won a great rescue.",
          "Now he must decide how to handle honor, reward, and influence.",
          "Victory can test the heart as much as danger can.",
          "Genesis places two kings before Abram: Sodom's king and Melchizedek.",
        ]),
      ],
      [
        "📍 The Valley Of Shaveh, Which Is The King's Dale",
        note([
          "This is the meeting place after the battle.",
          "Genesis gives the location so the scene feels public and official.",
          "Abram is returning as a rescuer.",
          "Kings now come out to meet him.",
          "The promise man is being recognized in the land.",
          "But recognition will bring choices.",
        ]),
      ],
      [
        "🍞 Melchizedek King Of Salem",
        note([
          "Melchizedek appears suddenly in the story.",
          "He is king of Salem, a name connected with peace.",
          "His own name is often understood as king of righteousness.",
          "This makes him stand out from the other kings in the chapter.",
          "He does not come to exploit Abram.",
          "He comes with blessing.",
        ]),
      ],
      [
        "🍷 Brought Forth Bread And Wine",
        note([
          "Melchizedek brings bread and wine to Abram.",
          "These are signs of provision and fellowship.",
          "After battle, bread and wine feel like refreshment.",
          "The scene is peaceful after violence.",
          "Christians often notice later echoes here, though Genesis itself simply presents a priest-king blessing Abram.",
          "The moment feels holy and generous.",
        ]),
      ],
      [
        "⛪ Priest Of The Most High God",
        note([
          "Melchizedek is both king and priest.",
          "That is unusual and important.",
          "He serves the Most High God before Israel's priesthood exists.",
          "This shows that knowledge of the true God is not limited to Abram's household.",
          "Later Scripture looks back to Melchizedek as deeply significant.",
          "Genesis gives us a mysterious priest-king who blesses Abram.",
        ]),
      ],
      [
        "🙌 Blessed Be Abram",
        note([
          "Melchizedek blesses Abram after the rescue.",
          "The blessing recognizes Abram as connected to the Most High God.",
          "Abram's victory is not treated as mere military success.",
          "It is placed under God's authority.",
          "Blessing reminds Abram where his help comes from.",
          "Victory should lead to worship, not pride.",
        ]),
      ],
      [
        "🌌 Possessor Of Heaven And Earth",
        note([
          "This title describes God as owner of everything.",
          "Heaven and earth belong to Him.",
          "That matters after a chapter full of kings fighting over territory and goods.",
          "Human rulers battle over land and wealth.",
          "But the Most High God owns heaven and earth.",
          "Abram's promise rests under the rule of the true Owner.",
        ]),
      ],
      [
        "🛡️ Delivered Thine Enemies Into Thy Hand",
        note([
          "Melchizedek says God delivered Abram's enemies into his hand.",
          "That means Abram's victory is credited to God's help.",
          "Abram acted bravely, but God gave the success.",
          "This keeps Abram from taking the glory for himself.",
          "The rescue came through courage, strategy, and divine mercy.",
          "Faith remembers the Giver after the victory.",
        ]),
      ],
      [
        "🔟 He Gave Him Tithes Of All",
        note([
          "Abram gives Melchizedek a tenth of the recovered goods.",
          "A tithe means a tenth.",
          "This act honors Melchizedek's priestly role and acknowledges God Most High.",
          "Abram responds to blessing with giving.",
          "The scene happens long before the law of Moses.",
          "It shows worshipful gratitude before Israel's formal priesthood exists.",
        ]),
      ],
      [
        "👥 Give Me The Persons, And Take The Goods",
        note([
          "The king of Sodom tells Abram to return the people and keep the goods.",
          "This offer could make Abram richer.",
          "But it comes from Sodom's king.",
          "That matters because Sodom has already been marked as wicked.",
          "Abram must decide whether to receive wealth from that source.",
          "Not every reward is worth taking.",
        ]),
      ],
      [
        "✋ I Have Lift Up Mine Hand Unto The LORD",
        note([
          "Abram speaks like someone who has made a solemn oath.",
          "Lifting the hand can signal a serious vow before God.",
          "Abram is not making a casual preference.",
          "He is drawing a line before the Lord.",
          "The victory will not become a way for Sodom to claim him.",
          "Abram belongs to the Most High God.",
        ]),
      ],
      [
        "🧵 From A Thread Even To A Shoelatchet",
        note([
          "Abram says he will not take even the smallest item.",
          "A thread and a shoelatchet are tiny things.",
          "The phrase means he will not take anything for himself from Sodom's goods.",
          "Abram is being very clear.",
          "He does not want even a small connection that lets Sodom claim credit.",
          "Faith sometimes says no down to the smallest detail.",
        ]),
      ],
      [
        "💰 Lest Thou Shouldest Say, I Have Made Abram Rich",
        note([
          "This is Abram's reason for refusing the reward.",
          "He does not want the king of Sodom to say he made Abram wealthy.",
          "Abram wants the Lord alone to be known as his provider.",
          "This is a major contrast with Genesis 12, where Abram received gifts in Egypt during a compromised situation.",
          "Here Abram shows growth.",
          "He refuses wealth that would confuse the source of his blessing.",
        ]),
      ],
      [
        "🍽️ Save Only That Which The Young Men Have Eaten",
        note([
          "Abram makes a fair exception for what the men have already eaten.",
          "He is not being showy or unreasonable.",
          "Basic provisions used during the mission are allowed.",
          "This shows practical wisdom.",
          "Abram refuses personal enrichment without denying legitimate needs.",
          "Faith can be both principled and fair.",
        ]),
      ],
      [
        "🤝 Aner, Eshcol, And Mamre",
        note([
          "Abram also protects the rights of his allies.",
          "He refuses a reward for himself, but he does not force his vow onto the men who helped him.",
          "Aner, Eshcol, and Mamre should receive their portion.",
          "This shows humility and fairness.",
          "Abram's conviction is personal, but he honors his partners.",
          "Good leadership does not use spiritual conviction to cheat others.",
        ]),
      ],
    ],
  },
];

const GENESIS_15_20_PERSONAL_REWRITE_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 15:1-6",
    title: "Abram Believes God",
    icon: "⭐",
    phrases: [
      phrase("⏳ After These Things", ["This phrase connects Genesis 15 to the rescue of Lot and Abram's refusal of Sodom's reward.", "Abram has just faced danger, kings, and temptation.", "Now God speaks into the quiet after the crisis.", "Sometimes the deepest questions come after obedience, not before it."]),
      phrase("📣 The Word Of The LORD Came", ["God's word comes to Abram in a vision.", "Abram's faith is built on God speaking, not on Abram inventing confidence.", "This matters because Genesis keeps showing promise as God's initiative.", "The Lord keeps the conversation alive with Abram."]),
      phrase("🛡️ Fear Not", ["God tells Abram not to fear because fear is still near him.", "Abram has enemies, no child, and no visible possession of the land.", "God does not shame the fear; He answers it.", "The first word after the battle is comfort from the Lord."]),
      phrase("🛡️ I Am Thy Shield", ["A shield protects someone in danger.", "God Himself promises to be Abram's protection.", "Abram's safety is not finally in armies, allies, or wealth.", "The Lord is his defense."]),
      phrase("🎁 Thy Exceeding Great Reward", ["Abram refused Sodom's reward in Genesis 14.", "Now God says He Himself is Abram's reward.", "That is a huge contrast.", "Abram does not lose by refusing corrupted gain; the Lord is better than the reward Sodom offered."]),
      phrase("❓ Lord GOD, What Wilt Thou Give Me?", ["Abram speaks honestly to God.", "He has promises, wealth, and protection, but still no child.", "This is not fake faith pretending everything is easy.", "It is real faith bringing an unresolved ache to the Lord."]),
      phrase("👶 I Go Childless", ["Abram names the pain directly.", "God has promised descendants, but Abram has no son.", "The tension is the heart of the Abraham story.", "Faith does not erase the ache of waiting."]),
      phrase("🏠 Eliezer Of Damascus", ["Eliezer appears as Abram's possible heir.", "In the ancient world, a trusted household servant could inherit if there was no son.", "Abram is thinking through the promise with the reality he can see.", "God will answer with a promise beyond Abram's plan."]),
      phrase("🏠 One Born In Mine House Is Mine Heir", ["Abram assumes the heir may have to come from inside his household system.", "This shows how impossible the promise feels to him.", "He is not denying God; he is asking how God's word will happen.", "The Lord will clarify that the promised heir will come from Abram's own body."]),
      phrase("📣 This Shall Not Be Thine Heir", ["God directly rejects Abram's fallback plan.", "Eliezer is not the promised heir.", "The promise will not be fulfilled through a workaround.", "God is narrowing Abram's hope back to what He said."]),
      phrase("👶 He That Shall Come Forth Out Of Thine Own Bowels", ["This means the heir will be Abram's own physical descendant.", "God is making the promise more specific.", "The future son will not merely be adopted into the household plan.", "He will come from Abram's own line."]),
      phrase("⭐ Look Now Toward Heaven", ["God takes Abram's eyes upward.", "Abram has been looking at his childlessness; God tells him to look at the stars.", "The sky becomes a classroom of promise.", "God gives Abram an image bigger than his present emptiness."]),
      phrase("⭐ Tell The Stars", ["Tell here means count.", "The stars are too many for Abram to number.", "God uses the uncountable sky to picture Abram's descendants.", "The promise stretches Abram's imagination past what his house currently contains."]),
      phrase("👨‍👩‍👧‍👦 So Shall Thy Seed Be", ["Seed means offspring or descendants.", "Abram has no child yet, but God speaks of descendants beyond counting.", "The promise is still invisible, but it is not uncertain.", "God's word creates hope before circumstances explain it."]),
      phrase("🙌 He Believed In The LORD", ["This is one of the most important faith lines in Scripture.", "Abram trusts the Lord's promise.", "He does not receive the child in this moment; he receives the word.", "Faith rests on God's character before the outcome is visible."]),
      phrase("⚖️ Counted It To Him For Righteousness", ["God counts Abram's faith as righteousness.", "This becomes a major Bible text for understanding faith and grace.", "Abram is accepted by trusting God, not by proving he can make the promise happen.", "The New Testament returns to this verse when teaching justification by faith."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 17:1-8",
    title: "God Renames Abram",
    icon: "🆕",
    phrases: [
      phrase("📆 Ninety Years Old And Nine", ["Abram is ninety-nine years old.", "The promised son through Sarah still has not come.", "The age detail makes the promise feel humanly impossible.", "Genesis wants the reader to feel the weight of waiting."]),
      phrase("🙌 I Am The Almighty God", ["God reveals Himself as Almighty God.", "That title matters because Abram's body and Sarah's barrenness look impossible.", "The promise rests on God's power, not human ability.", "God names His strength before renewing the covenant."]),
      phrase("🚶 Walk Before Me", ["God calls Abram to live in His presence.", "The promise does not cancel obedience.", "Abram is called to order his life before God.", "Faith is a walk, not a single moment."]),
      phrase("🕊️ Be Thou Perfect", ["Perfect here means whole, blameless, or complete in covenant faithfulness.", "God is not telling Abram to pretend he has no weakness.", "He is calling him to wholehearted loyalty.", "The covenant life is meant to be undivided."]),
      phrase("📜 I Will Make My Covenant", ["God speaks of covenant again.", "A covenant is a serious pledged relationship.", "God is binding Abram's future to His promise.", "This is not casual encouragement; it is covenant commitment."]),
      phrase("🙇 Abram Fell On His Face", ["Abram responds with reverence.", "Falling on the face shows humility before God.", "The Almighty God is speaking, and Abram bows low.", "Promise should produce worship, not arrogance."]),
      phrase("👨‍👩‍👧‍👦 Father Of Many Nations", ["God expands Abram's identity.", "He will not only father one family line, but many nations.", "This sounds impossible before Isaac is born.", "God names the future before Abram can see it."]),
      phrase("🆕 Thy Name Shall Be Abraham", ["Abram becomes Abraham.", "The new name is tied to God's promise that he will be father of many nations.", "Identity is being reshaped by God's word.", "Every time the name is spoken, the promise is remembered."]),
      phrase("👑 Kings Shall Come Out Of Thee", ["God promises royal descendants.", "The Abraham promise will grow into nations and kings.", "This points forward to Israel's monarchy and beyond.", "The family promise has kingdom weight inside it."]),
      phrase("♾️ An Everlasting Covenant", ["God calls the covenant everlasting.", "The promise is not a short-term arrangement.", "It reaches through generations.", "God is binding Himself to Abraham and his seed after him."]),
      phrase("🗺️ All The Land Of Canaan", ["The land promise is repeated again.", "Canaan remains central to Abraham's story.", "The promise is spiritual and geographical.", "God's covenant enters real land and history."]),
      phrase("🙏 I Will Be Their God", ["This is the heart of covenant relationship.", "God promises not only land and descendants, but Himself.", "The deepest gift is belonging to God.", "The covenant is personal before it is political."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 9,
    endVerse: 14,
    reference: "Genesis 17:9-14",
    title: "The Sign Of Circumcision",
    icon: "✂️",
    phrases: [
      phrase("🧾 Thou Shalt Keep My Covenant", ["God gives Abraham covenant responsibility.", "Promise and obedience belong together.", "Abraham does not create the covenant, but he must keep its sign.", "Grace calls for faithful response."]),
      phrase("✂️ Every Man Child Among You Shall Be Circumcised", ["Circumcision becomes the covenant sign for Abraham's household.", "It marks the males as belonging to the promise line.", "The sign is physical because the promise involves bodies, birth, and generations.", "God's covenant is marked into family life."]),
      phrase("📍 Flesh Of Your Foreskin", ["Genesis is specific because the sign is bodily and concrete.", "The covenant is not only an inward idea.", "It touches real bodies and future descendants.", "This is one reason circumcision becomes such a major identity marker for Israel."]),
      phrase("🪧 A Token Of The Covenant", ["Token means sign.", "Circumcision points to the covenant God made.", "The sign does not replace faith, but it visibly marks covenant belonging.", "God gives His people a remembered sign."]),
      phrase("👶 Eight Days Old", ["The sign is given to male children on the eighth day.", "This means covenant identity begins before a child can earn anything.", "The household is marked by God's promise from the beginning.", "The timing shows grace surrounding the next generation."]),
      phrase("🏠 Born In The House", ["The covenant sign includes those born in Abraham's household.", "The household is larger than Abraham, Sarah, and a future son.", "Many lives are connected to the promise community.", "God's covenant reaches the household structure."]),
      phrase("💰 Bought With Money", ["Servants bought into the household are also included.", "This means covenant belonging extends beyond biological descent inside Abraham's house.", "Everyone under Abraham's household is marked.", "The promise creates a visible community."]),
      phrase("♾️ In Your Flesh For An Everlasting Covenant", ["The covenant sign is placed in the flesh.", "It is meant to be remembered across generations.", "God's promise is not vague or invisible only.", "The covenant has a lasting sign in Abraham's family."]),
      phrase("⚠️ That Soul Shall Be Cut Off", ["Rejecting the covenant sign is serious.", "To be cut off means removed from covenant belonging.", "The sign does not save by itself, but refusing God's command rejects the covenant marker.", "Genesis wants readers to feel the weight of belonging to the Lord."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 15,
    endVerse: 22,
    reference: "Genesis 17:15-22",
    title: "Sarah And Isaac Are Promised",
    icon: "👶",
    phrases: [
      phrase("🆕 Thou Shalt Not Call Her Name Sarai", ["God renames Sarai too.", "The covenant promise does not move through Abraham alone.", "Sarah is central to the promised son.", "God gives her a name inside the covenant future."]),
      phrase("👑 Kings Of People Shall Be Of Her", ["Sarah will be mother of nations and kings.", "This honors her place in the promise.", "Her barrenness is not the final word over her story.", "God speaks fruitfulness over the woman who has waited in pain."]),
      phrase("😂 Abraham Fell Upon His Face, And Laughed", ["Abraham laughs because the promise sounds impossible.", "He is nearly one hundred, and Sarah is ninety.", "The laughter reveals human shock in front of divine promise.", "God does not cancel the promise because Abraham laughs."]),
      phrase("👴 Shall A Child Be Born Unto Him That Is An Hundred Years Old?", ["Abraham names the impossibility plainly.", "His body is old, and Sarah is old.", "Genesis does not hide the obstacle.", "The promise will have to be God's miracle."]),
      phrase("🙏 O That Ishmael Might Live Before Thee", ["Abraham loves Ishmael and asks God to bless him.", "This is not a cold theological conversation.", "A real father is thinking about a real son.", "God will bless Ishmael, but he will not be the covenant heir."]),
      phrase("👶 Sarah Thy Wife Shall Bear Thee A Son", ["God makes the promise unmistakably specific.", "The son will come through Sarah.", "This corrects every attempt to route the promise another way.", "The impossible promise is now tied to Sarah's own body."]),
      phrase("📛 Isaac", ["God names the child Isaac before he is born.", "Isaac is connected with laughter.", "The name will carry the memory of impossible joy.", "What sounded laughable will become the child's name."]),
      phrase("📜 I Will Establish My Covenant With Him", ["Isaac will carry the covenant line.", "Ishmael will be blessed, but Isaac is the promised heir.", "This distinction shapes the rest of Genesis.", "God is clarifying the promise path."]),
      phrase("🐪 Twelve Princes Shall He Beget", ["God promises blessing for Ishmael too.", "Ishmael will become a great people with leaders of his own.", "God's specific covenant line through Isaac does not erase His care for Ishmael.", "The Lord hears Abraham's concern."]),
      phrase("📆 At This Set Time In The Next Year", ["God gives a time marker.", "The promise is no longer open-ended in the same way.", "After years of waiting, fulfillment is now near.", "God's timing has arrived."]),
      phrase("⬆️ God Went Up From Abraham", ["The encounter ends after God gives the covenant word.", "Abraham is left with command, promise, and a time marker.", "Now obedience must follow revelation.", "The next verses show Abraham acting immediately."]),
    ],
  },
  {
    chapter: 17,
    startVerse: 23,
    endVerse: 27,
    reference: "Genesis 17:23-27",
    title: "Abraham Obeys The Covenant Sign",
    icon: "✅",
    phrases: [
      phrase("✅ Abraham Took Ishmael His Son", ["Abraham obeys with the son already in his household.", "Ishmael is included in the covenant sign of the household.", "This shows Abraham responding seriously to God's command.", "Obedience begins close to home."]),
      phrase("🏠 All That Were Born In His House", ["Abraham includes the whole household.", "The covenant sign is not private to Abraham alone.", "Everyone under his care is brought into the command.", "The promise household is visible and communal."]),
      phrase("⏱️ In The Selfsame Day", ["Abraham obeys the same day God speaks.", "He does not delay or negotiate.", "Immediate obedience shows the weight of the encounter.", "Faith responds when God's word is clear."]),
      phrase("👴 Abraham Was Ninety Years Old And Nine", ["Genesis repeats Abraham's age.", "Obedience is happening late in life.", "The covenant sign comes when the promise still looks impossible.", "Abraham obeys before Isaac is conceived."]),
      phrase("👦 Ishmael Was Thirteen Years Old", ["Ishmael's age is also given.", "He is old enough for this moment to be remembered.", "His inclusion matters because he belongs to Abraham's household.", "Genesis keeps Ishmael visible even while clarifying Isaac's future role."]),
      phrase("✂️ Circumcised With Him", ["The household obeys together.", "The covenant sign marks Abraham, Ishmael, servants, and household males.", "God's command reshapes the whole community.", "The chapter ends with obedience in the flesh."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 18:1-8",
    title: "Abraham Welcomes The Visitors",
    icon: "⛺",
    phrases: [
      phrase("👁️ The LORD Appeared Unto Him", ["Genesis tells us from the start that this visit is more than ordinary travel.", "The Lord appears to Abraham near Mamre.", "The promise comes close to Abraham's tent.", "God meets him in ordinary daily space."]),
      phrase("🌳 Plains Of Mamre", ["Mamre is a repeated place in Abraham's story.", "It is where Abraham settled and built an altar.", "Now it becomes the setting for divine visitation.", "Places in Genesis gather memory as God meets people there."]),
      phrase("🔥 Heat Of The Day", ["Abraham is sitting during the hot part of the day.", "This detail makes the scene feel real and physical.", "Hospitality in such heat would involve care and effort.", "The visit interrupts ordinary rest."]),
      phrase("👥 Three Men Stood By Him", ["Abraham sees three visitors.", "The scene has mystery because Genesis has already said the Lord appeared.", "The visitors are more than they first seem.", "Abraham responds with honor and urgency."]),
      phrase("🏃 He Ran To Meet Them", ["Abraham moves quickly to welcome the visitors.", "This shows eagerness and humility.", "A wealthy elder runs to serve.", "Hospitality becomes a sign of reverence."]),
      phrase("🙇 Bowed Himself Toward The Ground", ["Abraham bows in respect.", "The action shows honor before the visitors.", "Genesis slows down so we feel the seriousness of the meeting.", "Abraham receives the visit with humility."]),
      phrase("💧 Let A Little Water Be Fetched", ["Water is basic hospitality in a hot land.", "Washing feet refreshed travelers after dusty roads.", "Abraham offers practical care.", "Faith shows up in embodied kindness."]),
      phrase("🌳 Rest Yourselves Under The Tree", ["Abraham gives them shade and rest.", "Hospitality is not rushed or cold.", "He creates space for weary travelers.", "The tree becomes a place of refreshment and holy conversation."]),
      phrase("🍞 A Morsel Of Bread", ["Abraham modestly offers bread, but the meal becomes generous.", "Hospitality often speaks humbly while giving richly.", "The visitors are honored with food and care.", "The scene prepares for a promise spoken over a shared meal."]),
      phrase("🐄 Tender And Good", ["Abraham prepares a calf for the visitors.", "This is more than a snack.", "It is generous hospitality.", "The promised family becomes a household that welcomes and serves."]),
      phrase("🧈 Butter, Milk, And The Calf", ["The meal includes rich provisions.", "Genesis lets us see the table.", "The visit is spiritual, but also beautifully ordinary.", "God's promise is discussed near food, shade, and household service."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 9,
    endVerse: 15,
    reference: "Genesis 18:9-15",
    title: "Sarah Laughs At The Promise",
    icon: "😂",
    phrases: [
      phrase("❓ Where Is Sarah Thy Wife?", ["The visitors ask for Sarah by name.", "This shows the promise concerns her directly.", "Sarah is not background furniture in Abraham's story.", "The Lord's word is coming for her too."]),
      phrase("⛺ Behold, In The Tent", ["Sarah is nearby in the tent.", "She hears what is spoken.", "The promise enters domestic space.", "God's word reaches the place where she has waited and ached."]),
      phrase("📆 According To The Time Of Life", ["The promise now has a time frame.", "A son will come at the appointed season.", "The long wait is nearing fulfillment.", "God's timing is becoming specific."]),
      phrase("👶 Sarah Thy Wife Shall Have A Son", ["The promise is direct: Sarah herself will have a son.", "This removes ambiguity.", "The child will not come through another woman.", "God's promise will touch Sarah's impossible body."]),
      phrase("👂 Sarah Heard It", ["Sarah hears the promise from the tent door.", "She is not absent from the moment.", "The text lets us watch her internal response.", "God's word is confronting her long disappointment."]),
      phrase("👵 Abraham And Sarah Were Old", ["Genesis names the obstacle plainly.", "Both Abraham and Sarah are beyond normal childbearing age.", "The miracle is not subtle.", "The promise stands against visible impossibility."]),
      phrase("🚫 It Ceased To Be With Sarah After The Manner Of Women", ["Sarah is past the years of childbearing.", "This explains why the promise sounds impossible to her.", "Genesis is not asking readers to ignore biology.", "It is showing that God's power exceeds it."]),
      phrase("😂 Sarah Laughed Within Herself", ["Sarah laughs privately.", "Her laughter comes from years of disappointment and the impossibility of the promise.", "The Bible lets us see the honest reaction.", "God will answer the laugh, not abandon her."]),
      phrase("❓ Shall I Of A Surety Bear A Child?", ["Sarah's question carries disbelief and ache.", "She is old, and the promise sounds too wonderful to believe.", "This is not cartoon doubt.", "It is the laugh of a woman who has waited too long."]),
      phrase("💪 Is Any Thing Too Hard For The LORD?", ["This is the central question of the scene.", "The answer is no.", "Sarah's body is impossible ground, but not for the Lord.", "The promise depends on God's power, not human timing."]),
      phrase("🙈 Sarah Denied", ["Sarah is afraid and denies laughing.", "Fear enters the moment after God exposes her hidden response.", "The Lord gently but firmly tells the truth.", "God's promise can handle honest weakness better than fearful hiding."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 16,
    endVerse: 22,
    reference: "Genesis 18:16-22",
    title: "The Lord Reveals Sodom's Judgment",
    icon: "⚖️",
    phrases: [
      phrase("🏙️ Looked Toward Sodom", ["The visitors turn their attention toward Sodom.", "This connects the promise scene with the judgment scene.", "Genesis moves from Sarah's promised son to Sodom's wickedness.", "The chapter holds mercy and judgment side by side."]),
      phrase("🤔 Shall I Hide From Abraham?", ["The Lord chooses to reveal His plan to Abraham.", "This shows Abraham's covenant relationship with God.", "Abraham is not treated as a stranger to God's purposes.", "The promise brings him into deeper responsibility."]),
      phrase("🌍 All The Nations Of The Earth Shall Be Blessed In Him", ["God repeats the global purpose of Abraham's calling.", "The Sodom conversation is not separate from mission.", "Abraham's family is meant to learn justice and righteousness for the blessing of nations.", "Election is tied to God's world-sized purpose."]),
      phrase("🏠 He Will Command His Children And His Household", ["God speaks about Abraham teaching his household.", "The promise is meant to shape generations.", "Faith is not only personal; it becomes family instruction.", "Abraham's house is called to walk in God's way."]),
      phrase("⚖️ Justice And Judgment", ["These words show what Abraham's family must learn.", "The promise line is not meant to copy Sodom's ways.", "God's people must practice righteousness and justice.", "The chosen family is called to reflect God's character."]),
      phrase("📣 The Cry Of Sodom And Gomorrah", ["A cry has risen before the Lord.", "This suggests suffering, violence, and serious wrong.", "God is not judging from ignorance.", "He hears what happens in the city."]),
      phrase("⬇️ I Will Go Down Now", ["God speaks in human terms of investigating Sodom.", "This shows careful justice.", "The Lord does not act carelessly.", "Judgment in Genesis is measured, knowing, and righteous."]),
      phrase("👣 Abraham Stood Yet Before The LORD", ["The men move toward Sodom, but Abraham remains before the Lord.", "This sets up Abraham's intercession.", "He stands in the space between judgment and mercy.", "The promised man begins pleading for a wicked city."]),
    ],
  },
  {
    chapter: 18,
    startVerse: 23,
    endVerse: 33,
    reference: "Genesis 18:23-33",
    title: "Abraham Pleads For Sodom",
    icon: "🙏",
    phrases: [
      phrase("🙏 Abraham Drew Near", ["Abraham approaches the Lord in prayerful boldness.", "He does not run from the subject of judgment.", "He draws near to plead.", "Intercession begins with nearness to God."]),
      phrase("❓ Wilt Thou Also Destroy The Righteous With The Wicked?", ["Abraham asks whether righteous people will be swept away with the wicked.", "The question is about God's justice.", "Abraham knows the Judge of all the earth must do right.", "His prayer is bold but reverent."]),
      phrase("🔢 Fifty Righteous", ["Abraham begins with fifty righteous people.", "He asks whether the city would be spared for their sake.", "The number starts the repeated pattern of intercession.", "Abraham is appealing to mercy within justice."]),
      phrase("⚖️ Shall Not The Judge Of All The Earth Do Right?", ["This is one of Genesis's great statements about God's justice.", "Abraham anchors his plea in God's character.", "The Lord is not a tribal deity or local ruler.", "He is Judge of all the earth."]),
      phrase("🌫️ Dust And Ashes", ["Abraham calls himself dust and ashes.", "That is humility.", "He is bold in prayer, but he knows he is small before God.", "True intercession can be both courageous and lowly."]),
      phrase("🔢 Forty And Five, Forty, Thirty, Twenty, Ten", ["Abraham keeps lowering the number.", "The repeated requests show persistent intercession.", "He is not bargaining casually; he is pleading for mercy.", "The rhythm lets readers feel his concern for the city."]),
      phrase("🕊️ I Will Not Destroy It For Ten's Sake", ["God says He would spare the city for ten righteous people.", "This reveals the Lord's mercy.", "The problem is not that God is eager to destroy.", "The tragedy is that Sodom's corruption is so deep."]),
      phrase("🚶 The LORD Went His Way", ["The conversation ends when the Lord finishes speaking.", "Abraham's intercession has reached its final number.", "Now the story moves toward Sodom itself.", "Genesis leaves us wondering what will be found there."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 19:1-3",
    title: "Lot Welcomes The Angels",
    icon: "🏙️",
    phrases: [
      phrase("🌆 There Came Two Angels To Sodom", ["The visitors now arrive in Sodom.", "Genesis 18 had shown them with Abraham; Genesis 19 brings them into the city.", "The investigation has reached the place of judgment.", "The mood changes immediately."]),
      phrase("🚪 Lot Sat In The Gate", ["The city gate was a place of business, judgment, and public life.", "Lot is no longer merely near Sodom; he is positioned inside its civic space.", "This shows how deeply he has settled there.", "His drift has become involvement."]),
      phrase("🙇 Lot Rose Up To Meet Them", ["Lot shows hospitality to the visitors.", "This creates contrast between Lot and the city around him.", "He recognizes their vulnerability in Sodom's streets.", "His response shows some righteousness in a dark place."]),
      phrase("🏠 Turn In, I Pray You, Into Your Servant's House", ["Lot urges the visitors to stay in his house.", "He seems to know the city is unsafe at night.", "Hospitality here is also protection.", "Lot's urgency hints at Sodom's danger before the crowd appears."]),
      phrase("🌙 Nay; But We Will Abide In The Street All Night", ["The visitors first say they will stay in the street.", "That would expose the city for what it is.", "Lot presses them because he knows the risk.", "The tension rises before the wickedness is openly shown."]),
      phrase("🍞 He Made Them A Feast", ["Lot provides food and shelter.", "His hospitality echoes Abraham's, but the setting is darker.", "A feast inside the house contrasts with danger outside the door.", "Genesis shows light and darkness very close together."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 4,
    endVerse: 11,
    reference: "Genesis 19:4-11",
    title: "Sodom Shows Its Wickedness",
    icon: "⚠️",
    phrases: [
      phrase("🏙️ The Men Of Sodom", ["The city gathers around Lot's house.", "Genesis emphasizes the public nature of the wickedness.", "This is not one hidden private sin.", "The city shows itself openly."]),
      phrase("👥 Both Old And Young", ["The corruption spans generations.", "Old and young are involved.", "This shows how deep Sodom's wickedness has become.", "The city is not healthy at any level."]),
      phrase("🚪 Compassed The House Round", ["The crowd surrounds the house.", "The image is threatening and claustrophobic.", "Lot's guests are trapped inside.", "Sodom's danger is now fully visible."]),
      phrase("❓ Where Are The Men?", ["The crowd demands the visitors.", "Hospitality is being violently attacked.", "The question exposes the city's intent.", "The strangers are not safe in Sodom."]),
      phrase("💔 That We May Know Them", ["In this context, the phrase points to sexual violence.", "Sodom's sin includes attempted abuse and domination.", "Genesis is showing a city where desire and power have become cruel.", "The scene is meant to horrify the reader."]),
      phrase("🚪 Lot Went Out At The Door", ["Lot steps outside to speak to the mob.", "He tries to protect the visitors, but he is in a terrible situation.", "His position in Sodom has trapped his family in danger.", "The compromise of location now becomes crisis."]),
      phrase("🙏 Do Not So Wickedly", ["Lot names the crowd's desire as wicked.", "He still has moral awareness.", "But his influence over the city is almost nothing.", "Sodom does not listen to righteousness."]),
      phrase("😢 I Have Two Daughters", ["Lot's offer of his daughters is deeply disturbing.", "Genesis records it without approving it.", "The scene shows how broken Lot's judgment has become inside Sodom.", "Trying to manage evil with another evil is not righteousness."]),
      phrase("👊 This One Fellow Came In To Sojourn", ["The crowd mocks Lot as an outsider.", "Even though Lot sits in the gate, Sodom still treats him as a foreigner when he resists them.", "Compromise has not earned him true belonging.", "The city turns on him quickly."]),
      phrase("🧑‍🦯 They Smote The Men With Blindness", ["The visitors strike the crowd with blindness.", "This protects Lot and reveals divine power.", "The men of Sodom are physically blinded, but the scene also shows spiritual blindness.", "Even judgment at the door does not soften them."]),
      phrase("😵 Wearied Themselves To Find The Door", ["The crowd still tries to reach the door after being struck blind.", "That detail is chilling.", "Their desire for evil is stubborn even under judgment.", "Genesis shows why Sodom's judgment is righteous."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 12,
    endVerse: 22,
    reference: "Genesis 19:12-22",
    title: "Lot Is Pulled Out Of Sodom",
    icon: "🏃",
    phrases: [
      phrase("👨‍👩‍👧 Hast Thou Here Any Besides?", ["The angels ask about Lot's family.", "Judgment is coming, but mercy is making room for rescue.", "Lot is told to gather those who belong to him.", "God remembers the household in the middle of judgment."]),
      phrase("🔥 We Will Destroy This Place", ["The angels announce Sodom's destruction.", "The city's wickedness has reached judgment.", "This is not random disaster.", "The Lord has heard the cry against Sodom."]),
      phrase("📣 The Cry Of Them Is Waxen Great", ["The cry against Sodom has grown great before the Lord.", "This points to victims, violence, and deep corruption.", "God's judgment answers real evil.", "Sodom's sin has not been unseen."]),
      phrase("😂 He Seemed As One That Mocked", ["Lot warns his sons-in-law, but they think he is joking.", "This is tragic.", "People close to Lot do not take judgment seriously.", "Delay and unbelief sit inside the rescue story."]),
      phrase("🌅 When The Morning Arose", ["Morning brings urgency.", "Judgment is near.", "The night of danger is ending, but Sodom's final day has come.", "The angels press Lot to leave."]),
      phrase("⏳ While He Lingered", ["Lot delays even after being warned.", "This is one of the saddest phrases in the chapter.", "He knows enough to leave, but his heart is slow.", "Sodom still has a pull on him."]),
      phrase("🤝 The Men Laid Hold Upon His Hand", ["The angels physically pull Lot and his family out.", "This is mercy that grabs.", "Lot is not rescued because he moves quickly.", "He is rescued because the Lord is merciful."]),
      phrase("🕊️ The LORD Being Merciful Unto Him", ["Genesis explains the rescue clearly.", "Mercy is the reason Lot escapes.", "Not strength. Not wisdom. Not quick obedience.", "The Lord's mercy carries him out of the city."]),
      phrase("🏃 Escape For Thy Life", ["The command is urgent.", "Lot must flee without looking back or stopping.", "Judgment requires separation from the doomed city.", "Half-hearted distance is not enough."]),
      phrase("⛰️ Escape To The Mountain", ["The mountain is the place of safety.", "Lot is told to flee upward and away.", "The command contrasts with the low plain he chose in Genesis 13.", "The attractive plain has become a place to escape."]),
      phrase("🏙️ Is It Not A Little One?", ["Lot asks to flee to Zoar instead of the mountain.", "Even in rescue, he negotiates.", "His fear is still shaping him.", "God shows mercy again by allowing the smaller city."]),
      phrase("📛 Zoar", ["Zoar means small or little.", "The name fits Lot's request.", "It becomes the place where he first escapes.", "Even the place name remembers Lot's plea for a smaller refuge."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 23,
    endVerse: 29,
    reference: "Genesis 19:23-29",
    title: "Sodom Falls",
    icon: "🔥",
    phrases: [
      phrase("☀️ The Sun Was Risen", ["The destruction happens in daylight.", "Sodom's final morning arrives like an ordinary day.", "Judgment comes into the real world, not a dream.", "The city that felt secure is about to fall."]),
      phrase("🔥 Brimstone And Fire", ["Brimstone and fire describe devastating judgment.", "The destruction is from the Lord, not merely human war.", "Sodom's wickedness is answered by holy judgment.", "Genesis wants the reader to feel the seriousness of evil."]),
      phrase("⬇️ From The LORD Out Of Heaven", ["The source of judgment is the Lord.", "This is divine action after careful investigation and warning.", "Sodom is not destroyed by accident.", "The Judge of all the earth is acting."]),
      phrase("🏙️ Overthrew Those Cities", ["The cities of the plain are overturned.", "What looked prosperous to Lot in Genesis 13 is now destroyed.", "The reversal is sobering.", "A place can look fruitful and still be headed toward judgment."]),
      phrase("👀 His Wife Looked Back", ["Lot's wife looks back despite the warning.", "The look reveals attachment to what she was commanded to leave.", "This is a tragic pause between rescue and judgment.", "Her body leaves Sodom, but her heart turns back."]),
      phrase("🧂 A Pillar Of Salt", ["Lot's wife becomes a pillar of salt.", "The judgment is severe and memorable.", "Genesis turns her backward look into a warning sign.", "Deliverance must not be met with longing for the place of destruction."]),
      phrase("🌄 Abraham Gat Up Early", ["Abraham returns to the place where he stood before the Lord.", "He had interceded for Sodom.", "Now he looks toward the result.", "The intercessor sees the smoke of judgment."]),
      phrase("💨 Smoke Of A Furnace", ["The smoke rises like a furnace.", "The image echoes total destruction.", "It also recalls fiery judgment language from Genesis 15.", "The land of Lot's choice is now smoke."]),
      phrase("🙏 God Remembered Abraham", ["Lot's rescue is connected to God remembering Abraham.", "This does not mean God forgot and then recalled.", "It means God acted in faithfulness to covenant relationship.", "Abraham's intercession mattered."]),
      phrase("🛡️ Sent Lot Out", ["God sends Lot out before destroying the cities.", "Lot is rescued from the overthrow.", "The mercy is real, even though Lot's life is deeply damaged.", "Judgment and mercy stand side by side."]),
    ],
  },
  {
    chapter: 19,
    startVerse: 30,
    endVerse: 38,
    reference: "Genesis 19:30-38",
    title: "Lot's Family Breaks",
    icon: "💔",
    phrases: [
      phrase("⛰️ Lot Went Up Out Of Zoar", ["Lot leaves the small city he asked for.", "Fear drives him into the mountain after all.", "His path is unstable and fearful.", "The man who chose the plain now hides in a cave."]),
      phrase("🕳️ Dwelt In A Cave", ["Lot ends in a cave with his daughters.", "This is a devastating contrast to the well-watered plain he chose.", "His story has moved from opportunity to isolation.", "Genesis shows the bitter fruit of his direction."]),
      phrase("🌍 There Is Not A Man In The Earth", ["Lot's daughters believe their family line has no future.", "Their perspective is shaped by fear and isolation.", "They may think the destruction was wider than it was.", "Fear can make the world feel smaller than it is."]),
      phrase("🍷 Let Us Make Our Father Drink Wine", ["The daughters plan to use wine to control Lot.", "This echoes earlier Genesis scenes where drunkenness leads to shame.", "The family is acting out of desperation, not faith.", "The cave becomes a place of moral collapse."]),
      phrase("💔 Lie With Him", ["The plan is incestuous and deeply broken.", "Genesis records it without approving it.", "The scene shows how far Lot's family has fallen after Sodom.", "Survival without trust becomes twisted."]),
      phrase("🌱 Preserve Seed Of Our Father", ["The daughters want to preserve descendants.", "The desire for family continuation is understandable, but the method is sinful and destructive.", "Genesis keeps showing that forcing a future creates wounds.", "Human desperation cannot create righteousness."]),
      phrase("😶 He Perceived Not", ["Lot is so drunk that he does not understand what happens.", "This shows his passivity and degradation.", "The father who once sat in Sodom's gate is now unaware in a cave.", "The story is heartbreaking, not humorous."]),
      phrase("👶 Moab", ["Moab becomes the ancestor of the Moabites.", "The origin story is painful and morally broken.", "Moabites will appear later in Israel's story.", "Even broken origins can later be touched by God's mercy, as Ruth the Moabite will show."]),
      phrase("👶 Benammi", ["Benammi becomes connected with the Ammonites.", "Like Moab, this people group comes from a painful family collapse.", "Genesis is explaining later nations through Lot's broken story.", "The consequences of this cave reach into future history."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 20:1-7",
    title: "Abraham Repeats The Lie",
    icon: "🔁",
    phrases: [
      phrase("🧭 Abraham Journeyed From Thence", ["Abraham moves again after the Sodom story.", "The promise journey continues.", "But the next scene shows an old weakness returning.", "Movement does not automatically mean growth in every area."]),
      phrase("📍 Gerar", ["Gerar is in Philistine territory in the southern region.", "Abraham is again living among foreign rulers.", "The setting creates another fear test.", "A new place exposes an old pattern."]),
      phrase("👩 She Is My Sister", ["Abraham repeats the same kind of deception from Genesis 12.", "This is painful because he has already seen the danger of this lie.", "Old fear can return even after real faith.", "Genesis is honest about repeated weakness."]),
      phrase("👑 Abimelech King Of Gerar", ["Abimelech is the local king.", "He takes Sarah into his household because Abraham has hidden the truth.", "Another ruler is pulled into danger by Abraham's deception.", "The promise line is threatened again."]),
      phrase("🌙 God Came To Abimelech In A Dream", ["God intervenes before Abimelech touches Sarah.", "The Lord protects the promise and warns the king.", "This is mercy for Sarah and for Abimelech.", "God acts where Abraham failed to act rightly."]),
      phrase("⚠️ Thou Art But A Dead Man", ["God's warning is severe.", "Taking Sarah would bring judgment because she is Abraham's wife.", "The seriousness protects the marriage and the promise.", "God does not treat Abraham's lie as harmless."]),
      phrase("🕊️ In The Integrity Of My Heart", ["Abimelech says he acted without knowing the truth.", "The king's conscience is engaged.", "This is striking because the outsider speaks with moral seriousness.", "Genesis complicates easy assumptions about insiders and outsiders."]),
      phrase("🛡️ I Withheld Thee From Sinning Against Me", ["God says He kept Abimelech from sinning.", "This shows prevention as mercy.", "Abimelech's restraint was not only his own wisdom; God was protecting him.", "The Lord can guard people from sins they do not fully understand."]),
      phrase("📣 He Is A Prophet", ["God calls Abraham a prophet despite his failure.", "This is surprising and humbling.", "Abraham's calling is real, but he still needs correction.", "God's gifts do not excuse sin."]),
      phrase("🙏 He Shall Pray For Thee", ["Abraham must pray for Abimelech.", "The guilty man becomes intercessor by God's command.", "This shows grace and responsibility together.", "Abraham must stand again as prophet after being exposed."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 20:8-13",
    title: "Abimelech Confronts Abraham",
    icon: "📣",
    phrases: [
      phrase("🌅 Abimelech Rose Early", ["Abimelech responds quickly to God's warning.", "He does not delay.", "The outsider king shows urgency after hearing from God.", "Genesis lets his response challenge Abraham's failure."]),
      phrase("😨 The Men Were Sore Afraid", ["Abimelech's servants are afraid when they hear the dream.", "They understand the danger is serious.", "The whole court feels the weight of Abraham's deception.", "Sin has spread fear into another household."]),
      phrase("❓ What Hast Thou Done Unto Us?", ["Abimelech confronts Abraham directly.", "The question echoes Pharaoh's confrontation in Genesis 12.", "Abraham is facing the same failure again.", "Repeated sin often brings repeated exposure."]),
      phrase("⚠️ A Great Sin", ["Abimelech names the danger as a great sin.", "This is morally clear language from a foreign king.", "Abraham's deception nearly led others into guilt.", "The Bible does not soften the seriousness."]),
      phrase("❓ What Sawest Thou?", ["Abimelech asks what Abraham saw that made him act this way.", "This question exposes Abraham's fear-based assumptions.", "Abraham judged the place before knowing the people.", "Fear can make us see danger everywhere."]),
      phrase("😨 Surely The Fear Of God Is Not In This Place", ["Abraham assumed Gerar had no fear of God.", "That assumption was wrong.", "Abimelech has shown more integrity in this chapter than Abraham.", "Genesis challenges Abraham's fear and prejudice."]),
      phrase("🩸 They Will Slay Me For My Wife's Sake", ["Abraham admits he was afraid of being killed.", "This is the same fear pattern from Egypt.", "The promise has grown, but this fear remains unresolved.", "Genesis shows that God keeps working with flawed people."]),
      phrase("👩 She Is The Daughter Of My Father", ["Abraham explains the half-truth.", "Sarah is related to him, but she is also his wife.", "The problem is not technical wording only.", "The problem is using partial truth to hide the truth that matters."]),
      phrase("🧳 When God Caused Me To Wander", ["Abraham describes his life as wandering under God's call.", "The journey has made him vulnerable among foreign peoples.", "But vulnerability does not excuse deception.", "Faith must learn truthfulness on the road."]),
      phrase("🤝 This Is Thy Kindness", ["Abraham had asked Sarah to show kindness by calling him brother.", "That request placed her in danger for his protection.", "Genesis lets us feel how distorted fear can become.", "What Abraham called kindness became a burden for Sarah."]),
    ],
  },
  {
    chapter: 20,
    startVerse: 14,
    endVerse: 18,
    reference: "Genesis 20:14-18",
    title: "Sarah Is Restored",
    icon: "🛡️",
    phrases: [
      phrase("🎁 Sheep, Oxen, Menservants, And Womenservants", ["Abimelech gives gifts to Abraham.", "This echoes Egypt, but the context is correction and restoration.", "The gifts do not make Abraham look heroic.", "They show the complicated mercy of God preserving the promise again."]),
      phrase("👩 Restored Him Sarah His Wife", ["Sarah is returned to Abraham.", "This is the crucial rescue.", "The promised mother is protected again.", "God preserves Sarah before Isaac's birth in the very next chapter."]),
      phrase("🗺️ My Land Is Before Thee", ["Abimelech allows Abraham to dwell where he pleases.", "This is generous after Abraham's deception.", "God turns a dangerous situation into protected space.", "Mercy comes through an unexpected ruler."]),
      phrase("👀 A Covering Of The Eyes", ["This difficult phrase likely refers to a public vindication or settlement that protects Sarah's honor.", "Abimelech gives silver as a visible answer to the wrong done.", "Sarah is not quietly returned as if nothing happened.", "Her restoration is made public."]),
      phrase("🙏 Abraham Prayed Unto God", ["Abraham prays, and God heals Abimelech's household.", "This is humbling because Abraham caused the crisis.", "Yet God still uses him as an intercessor.", "Grace restores responsibility after exposure."]),
      phrase("🩺 God Healed Abimelech", ["God removes the judgment from Abimelech's house.", "The healing shows that the warning was real and the mercy is real.", "God protects Sarah and restores the household affected by Abraham's lie.", "The Lord is just and merciful."]),
      phrase("🚫 The LORD Had Fast Closed Up All The Wombs", ["The closed wombs in Abimelech's house connect sharply with Sarah's long barrenness.", "God controls fertility and protects the promise line.", "Genesis 21 will soon open with Isaac's birth.", "The timing reminds readers that life comes by God's power."]),
      phrase("👩 Because Of Sarah Abraham's Wife", ["Sarah's true identity matters.", "She is Abraham's wife and the promised mother.", "The whole chapter turns on protecting her place in the covenant story.", "God guards Sarah even when Abraham's fear endangers her."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 7,
    endVerse: 11,
    reference: "Genesis 15:7-11",
    title: "Abram Asks For Assurance",
    icon: "📍",
    phrases: [
      phrase("📣 I Am The LORD", ["God identifies Himself before repeating the land promise.", "The promise rests on who God is.", "Abram's assurance begins with the Lord's own name.", "The giver matters as much as the gift."]),
      phrase("🏙️ Brought Thee Out Of Ur Of The Chaldees", ["God reminds Abram where the journey began.", "Ur was Abram's old homeland in Mesopotamia.", "The call of Genesis 12 was not random; God has been leading from the start.", "Memory becomes fuel for trust."]),
      phrase("🗺️ To Give Thee This Land", ["God repeats the land promise.", "Abram is in the land, but he does not possess it yet.", "The promise remains future.", "Faith has to hold what God says while waiting for visible fulfillment."]),
      phrase("❓ Whereby Shall I Know?", ["Abram asks for assurance.", "This is not treated as rebellion.", "He believes God, yet he still asks how he will know the inheritance is secure.", "Faith can ask honest questions in God's presence."]),
      phrase("🐄 An Heifer, A She Goat, And A Ram", ["God gives Abram animals for a covenant ceremony.", "These are not random animals.", "They belong to a serious oath-making scene.", "God is about to answer Abram's question with covenant, not just explanation."]),
      phrase("🕊️ A Turtledove, And A Young Pigeon", ["The birds complete the sacrifice list.", "Later Israel's worship laws will also include birds in offerings.", "Genesis is showing ancient sacrificial imagery before Sinai.", "The scene feels solemn because covenant is serious."]),
      phrase("✂️ Divided Them In The Midst", ["Abram cuts the animals in two and places the pieces opposite each other.", "In ancient covenant ceremonies, passing between cut pieces could symbolize a solemn oath.", "The picture is weighty: covenant promises are not casual words.", "God is preparing a visible sign of commitment."]),
      phrase("🕊️ The Birds Divided He Not", ["Abram does not cut the birds in half.", "The detail may feel small, but it shows careful obedience to the ceremony God gave.", "Genesis wants us to slow down and see the scene.", "Every part is deliberate."]),
      phrase("🦅 Fowls Came Down Upon The Carcases", ["Birds of prey descend on the sacrifice.", "The covenant scene is interrupted by threat and decay.", "Abram has to guard what has been prepared.", "The promise will be opposed, but Abram stays watchful."]),
      phrase("🛡️ Abram Drove Them Away", ["Abram protects the covenant pieces from the birds.", "This small action shows waiting, guarding, and endurance.", "He has asked for assurance, but he must remain present in the process.", "Faith sometimes waits while driving away what would spoil the altar."]),
    ],
  },
  {
    chapter: 15,
    startVerse: 12,
    endVerse: 21,
    reference: "Genesis 15:12-21",
    title: "God Cuts The Covenant",
    icon: "🔥",
    phrases: [
      phrase("🌙 A Deep Sleep Fell Upon Abram", ["Abram is placed into a deep sleep as the covenant vision continues.", "He is not the active hero of the ceremony.", "God is about to reveal and pledge what only God can secure.", "Abram receives more than he performs."]),
      phrase("😨 An Horror Of Great Darkness", ["The scene becomes heavy and frightening.", "God's covenant word includes hard truth, not only comfort.", "Abram is about to hear of future suffering for his descendants.", "Promise does not mean the road will be painless."]),
      phrase("🧳 Thy Seed Shall Be A Stranger", ["God says Abram's descendants will live as strangers in a land not theirs.", "This points forward to Israel's time in Egypt.", "The promise line will experience displacement before inheritance.", "God tells Abram the hard road ahead before it happens."]),
      phrase("⛓️ Serve Them", ["Abram's descendants will be enslaved.", "This is one of the earliest previews of the Exodus story.", "Genesis is already preparing readers for Israel's later bondage.", "God's plan includes deliverance, but not instant ease."]),
      phrase("📆 Four Hundred Years", ["The suffering will last a long time.", "The number shows that God's promise unfolds across generations.", "Abram will not personally see every stage.", "Faith trusts a God whose timeline is larger than one lifetime."]),
      phrase("⚖️ That Nation Will I Judge", ["God promises to judge the nation that oppresses Abram's descendants.", "This points forward to judgment on Egypt.", "Oppression will not have the final word.", "God sees suffering and holds nations accountable."]),
      phrase("🎒 Come Out With Great Substance", ["God promises deliverance with provision.", "Israel will later leave Egypt with wealth from the Egyptians.", "The future rescue will reverse the years of oppression.", "God can bring His people out with more than survival."]),
      phrase("🕊️ Go To Thy Fathers In Peace", ["God tells Abram he will die in peace before these later events unfold.", "Abram will not see the oppression himself.", "His life will end before the full promise is fulfilled.", "The covenant stretches beyond Abram's lifetime."]),
      phrase("👴 A Good Old Age", ["Abram is promised a long life.", "This is mercy in the middle of a heavy prophecy.", "God's plan for later generations does not erase His care for Abram personally.", "The Lord holds both the man and the future."]),
      phrase("🔁 In The Fourth Generation", ["God gives a generational marker for return.", "The promise has timing and order.", "Israel's return to the land will not be random.", "God is already ruling the timeline."]),
      phrase("⚖️ The Iniquity Of The Amorites Is Not Yet Full", ["God delays judgment because the Amorites' sin has not reached its full measure.", "This shows God's patience and justice.", "Israel will not receive the land through random violence.", "Judgment has moral timing under God's rule."]),
      phrase("🔥 A Smoking Furnace, And A Burning Lamp", ["These fiery images pass between the pieces.", "They represent God's presence in the covenant ceremony.", "Abram does not walk between the pieces; God does.", "The covenant rests on God's own commitment."]),
      phrase("📜 The LORD Made A Covenant", ["God formally binds Himself to the promise.", "A covenant is a serious pledged relationship.", "This answers Abram's question about assurance.", "The promise is sealed by God's word and oath-like action."]),
      phrase("🌊 From The River Of Egypt Unto The Great River", ["God describes the scope of the promised land.", "The promise has geography, not just emotion.", "The river of Egypt and Euphrates mark a wide territory.", "God's promise is concrete and historical."]),
      phrase("🏘️ Kenites, Kenizzites, Kadmonites, And Others", ["The listed peoples show the land is already inhabited.", "God names the peoples connected to the future inheritance.", "This reminds readers that fulfillment will involve real nations and history.", "The promise is specific, not vague."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 16:1-6",
    title: "Sarai And Abram Try To Force The Promise",
    icon: "😔",
    phrases: [
      phrase("🚫 Sarai Bare Him No Children", ["The chapter opens with the pressure point again.", "God promised descendants, but Sarai still has no child.", "Waiting has become painful.", "The problem is real, but what they do next will wound the household."]),
      phrase("👩 Hagar The Egyptian", ["Hagar is Sarai's Egyptian handmaid.", "She is a vulnerable person in the household.", "Her nationality may connect back to Abram's time in Egypt.", "Genesis wants us to see her as a person, not a prop."]),
      phrase("🤲 The LORD Hath Restrained Me From Bearing", ["Sarai recognizes that she has not conceived.", "But her interpretation moves toward control instead of trust.", "She names the pain honestly, then tries to solve it by human arrangement.", "This is waiting under pressure."]),
      phrase("🛏️ Go In Unto My Maid", ["Sarai proposes that Abram have a child through Hagar.", "This may reflect an ancient household custom, but Genesis shows the damage it creates.", "Cultural permission does not mean spiritual wisdom.", "A shortcut can still be a wound."]),
      phrase("👂 Abram Hearkened To The Voice Of Sarai", ["Abram listens and agrees.", "The wording echoes earlier Genesis patterns where listening to the wrong voice leads to trouble.", "Abram does not lead the household toward trust here.", "He participates in forcing the promise."]),
      phrase("📆 Ten Years In The Land Of Canaan", ["A decade has passed since Abram entered Canaan.", "The wait is not small.", "This detail helps readers feel why the pressure is intense.", "Delayed promise can expose impatience and fear."]),
      phrase("👩‍🍼 Hagar Conceived", ["The plan appears to work at first.", "Hagar becomes pregnant.", "But immediate success does not mean the decision was wise.", "Genesis quickly shows relational damage."]),
      phrase("👀 Her Mistress Was Despised", ["Hagar looks down on Sarai after conceiving.", "The household order begins to fracture.", "Pain turns into contempt.", "The forced solution creates new bitterness."]),
      phrase("💔 My Wrong Be Upon Thee", ["Sarai blames Abram for the pain now unfolding.", "The plan was shared, but the wound becomes relational conflict.", "This is how shortcuts often work.", "They promise relief and produce blame."]),
      phrase("✋ Thy Maid Is In Thy Hand", ["Abram refuses to take strong responsibility.", "He gives Hagar back into Sarai's power.", "The vulnerable person bears the weight of the household's failure.", "Genesis does not make this look noble."]),
      phrase("😢 Sarai Dealt Hardly With Her", ["Sarai treats Hagar harshly.", "The promised family is now marked by mistreatment.", "Waiting has turned into harm.", "Genesis shows the human cost of trying to control God's promise."]),
      phrase("🏃 She Fled From Her Face", ["Hagar runs away.", "She is pregnant, vulnerable, and mistreated.", "Her flight shows how broken the household has become.", "But the wilderness will become the place where God sees her."]),
    ],
  },
  {
    chapter: 16,
    startVerse: 7,
    endVerse: 16,
    reference: "Genesis 16:7-16",
    title: "God Sees Hagar",
    icon: "👁️",
    phrases: [
      phrase("🌵 The Angel Of The LORD Found Her", ["Hagar runs, but she is not lost to God.", "The Lord's messenger finds her in the wilderness.", "Found is a tender word here.", "God sees the person the household failed to protect."]),
      phrase("💧 By A Fountain Of Water", ["God meets Hagar near water in the wilderness.", "That location matters because she is pregnant and vulnerable.", "The scene carries mercy.", "God meets her where survival is fragile."]),
      phrase("❓ Whence Camest Thou? And Whither Wilt Thou Go?", ["The question invites Hagar to name her story.", "God knows, but He lets her speak.", "She is not treated as invisible.", "The Lord addresses her personally."]),
      phrase("🏃 I Flee From The Face Of My Mistress Sarai", ["Hagar tells the truth about her flight.", "She is running from Sarai's harshness.", "Genesis allows the wounded person to speak.", "Her suffering is not hidden from God."]),
      phrase("↩️ Return To Thy Mistress", ["This command is difficult to read.", "God sends Hagar back, but not because her suffering is ignored.", "He also gives her promise, identity, and future.", "The text must be handled with tenderness because Hagar's vulnerability is real."]),
      phrase("👨‍👩‍👧‍👦 I Will Multiply Thy Seed Exceedingly", ["God gives Hagar a promise about descendants.", "She is not the covenant wife, but she is still seen and blessed.", "Her child has a future before God.", "The Lord's care reaches outside the center of the promise line."]),
      phrase("👶 Thou Shalt Bear A Son", ["God speaks directly about the child Hagar carries.", "Her pregnancy is not invisible to Him.", "The child is named before birth.", "God enters Hagar's future with knowledge and care."]),
      phrase("📛 Ishmael", ["Ishmael means God hears.", "The name is tied to Hagar's affliction.", "Every time the name is spoken, it testifies that God heard her pain.", "This is one of Genesis's most tender naming moments."]),
      phrase("👂 The LORD Hath Heard Thy Affliction", ["God hears Hagar's suffering.", "She may have little power in Abram's household, but heaven has heard her.", "This phrase reveals God's compassion.", "Affliction does not disappear into silence before Him."]),
      phrase("🐎 A Wild Man", ["This describes Ishmael's future as strong, independent, and conflict-marked.", "The words are not a throwaway insult.", "They forecast a hard and rugged life.", "Genesis is telling the reader Ishmael's line will have its own story."]),
      phrase("👁️ Thou God Seest Me", ["Hagar names God as the God who sees.", "This is remarkable because she is a marginalized Egyptian servant.", "Yet she receives a direct encounter with God's care.", "Her testimony becomes one of the clearest statements of God's personal attention in Genesis."]),
      phrase("💧 Beerlahairoi", ["The well name is connected to the God who lives and sees.", "Place names in Genesis often preserve encounters with God.", "This location becomes a memory of Hagar's rescue.", "The wilderness has become holy ground."]),
      phrase("📆 Abram Was Fourscore And Six Years Old", ["Abram is eighty-six when Ishmael is born.", "The timeline matters because the promised son through Sarah still has not come.", "Years are passing.", "Genesis wants readers to feel the long wait and the complicated consequences."]),
    ],
  },
];

function addGenesisElevenTwelveTexture(title: string, content: string) {
  const lower = title.toLowerCase();

  const add = (lines: string[]) => `${content}\n\n${note(lines)}`;

  if (lower.includes("one language") || lower.includes("one speech")) {
    return add([
      "Watch the gift and the danger side by side:",
      "🗣️ Same words.",
      "🤝 Same understanding.",
      "🏗️ Same project.",
      "⚠️ Same proud direction.",
      "Unity is powerful, but Genesis wants us to ask what that unity is serving.",
    ]);
  }

  if (lower.includes("journeyed") || lower.includes("from the east") || lower.includes("plain") || lower.includes("shinar") || lower.includes("dwelt there")) {
    return add([
      "Slow down over the movement:",
      "🧭 They travel.",
      "🌾 They find a useful place.",
      "🏠 They settle.",
      "🏙️ They start building a world around themselves.",
      "The geography is doing more than giving directions. It is showing the path toward Babel's heart.",
    ]);
  }

  if (lower.includes("brick") || lower.includes("slime") || lower.includes("mortar") || lower.includes("burn them")) {
    return add([
      "The materials tell a story:",
      "🧱 Skill is present.",
      "🔥 Planning is present.",
      "🛢️ Strong binding is present.",
      "💔 Humility is missing.",
      "That is the ache of Babel: the outside is sturdy, but the inside is proud.",
    ]);
  }

  if (lower.includes("city") || lower.includes("tower") || lower.includes("heaven")) {
    return add([
      "This is bigger than architecture:",
      "🏙️ The city says, We can secure ourselves.",
      "🗼 The tower says, We can rise by ourselves.",
      "👑 The project says, We can define ourselves.",
      "Genesis is letting the building expose the heart.",
    ]);
  }

  if (lower.includes("make us a name") || lower.includes("make thy name")) {
    return add([
      "Put Babel and Abram beside each other:",
      "👑 Babel: Let us make a name.",
      "🎁 God: I will make thy name great.",
      "One grabs identity.",
      "The other receives identity.",
      "That contrast is one of the hinges of Genesis 11 and 12.",
    ]);
  }

  if (lower.includes("scattered") || lower.includes("confound") || lower.includes("babel")) {
    return add([
      "Notice the reversal:",
      "🌍 They fear scattering.",
      "🏗️ They build to prevent it.",
      "🗣️ God touches their speech.",
      "🚶 The people scatter anyway.",
      "God's purpose keeps moving, even when human pride tries to hold it back.",
    ]);
  }

  if (lower.includes("lord came down") || lower.includes("children of men") || lower.includes("nothing will be restrained") || lower.includes("let us go down")) {
    return add([
      "Genesis almost lets you feel the irony:",
      "⬆️ Humanity builds upward.",
      "⬇️ The Lord comes down.",
      "🏗️ The tower looks huge from earth.",
      "👑 It is small before God.",
      "The story humbles pride without shouting.",
    ]);
  }

  if (lower.includes("generations") || lower.includes("begat") || lower.includes("sons and daughters") || lower.includes("lived after")) {
    return add([
      "Genealogies can look quiet, but they are carrying weight:",
      "👶 Births continue.",
      "🏠 Families keep forming.",
      "⏳ Time keeps passing.",
      "🌱 The promise line keeps moving.",
      "The Bible is whispering, God has not lost the thread.",
    ]);
  }

  if (lower.includes("terah") || lower.includes("abram, nahor") || lower.includes("haran died") || lower.includes("ur of the chaldees") || lower.includes("sarai")) {
    return add([
      "This is the family soil under Abram's call:",
      "🏠 A real household.",
      "💔 Real grief.",
      "🚫 Real impossibility.",
      "🛣️ A real unfinished road.",
      "God does not call Abram out of a clean, simple background. He calls him from ordinary family complexity.",
    ]);
  }

  if (lower.includes("get thee out") || lower.includes("thy country") || lower.includes("thy kindred") || lower.includes("father's house") || lower.includes("land that i will shew")) {
    return add([
      "Feel the layers of leaving:",
      "🌍 Country: the familiar world.",
      "👪 Kindred: the family network.",
      "🏠 Father's house: the deepest security.",
      "🧭 Unknown land: the promise still ahead.",
      "Abram is not just changing locations. He is learning to let God's word become home.",
    ]);
  }

  if (lower.includes("great nation") || lower.includes("i will bless") || lower.includes("be a blessing") || lower.includes("all families")) {
    return add([
      "The promise keeps widening:",
      "👤 One man.",
      "🏠 One family.",
      "🏛️ One nation.",
      "🌍 All families of the earth.",
      "God narrows the story through Abram so blessing can widen to the world.",
    ]);
  }

  if (lower.includes("abram departed") || lower.includes("as the lord had spoken") || lower.includes("lot went") || lower.includes("seventy") || lower.includes("haran") || lower.includes("substance") || lower.includes("souls")) {
    return add([
      "Obedience has feet here:",
      "🚶 Abram goes.",
      "👥 Lot comes with him.",
      "🐪 The household moves.",
      "📦 The possessions move.",
      "Faith is not just a thought in Abram's heart. It becomes a whole life in motion.",
    ]);
  }

  if (lower.includes("canaan") || lower.includes("sichem") || lower.includes("moreh") || lower.includes("canaanite")) {
    return add([
      "The land is both promise and pressure:",
      "🗺️ Abram arrives.",
      "📍 Real places are named.",
      "👀 The Canaanite is still there.",
      "⏳ Fulfillment is not instant.",
      "Genesis is teaching faith in the gap between God's word and visible possession.",
    ]);
  }

  if (lower.includes("appeared") || lower.includes("thy seed") || lower.includes("give this land") || lower.includes("altar") || lower.includes("called upon")) {
    return add([
      "This scene has a beautiful rhythm:",
      "👁️ God appears.",
      "🎁 God promises.",
      "⛪ Abram builds.",
      "🙏 Abram calls.",
      "Promise leads Abram into worship, not self-importance.",
    ]);
  }

  if (lower.includes("bethel") || lower.includes("hai") || lower.includes("south")) {
    return add([
      "The place names are not throwaway details:",
      "📍 They locate Abram's steps.",
      "🗺️ They build the Bible's map.",
      "⛺ They show Abram living as a traveler.",
      "🌱 They prepare places that will matter later.",
      "Genesis is teaching through geography as well as speech.",
    ]);
  }

  if (lower.includes("famine") || lower.includes("egypt") || lower.includes("sojourn")) {
    return add([
      "The test comes fast:",
      "🌾 Promise land.",
      "⚠️ Real famine.",
      "⬇️ Egypt for survival.",
      "😨 Fear close behind.",
      "Abram's faith is real, but Genesis is honest that real faith can still panic under pressure.",
    ]);
  }

  if (lower.includes("fair woman") || lower.includes("egyptians shall see") || lower.includes("kill me") || lower.includes("save thee alive") || lower.includes("my sister") || lower.includes("well with me") || lower.includes("my soul")) {
    return add([
      "Fear starts rearranging the room:",
      "😨 Abram imagines danger.",
      "🤐 He hides the truth.",
      "👩 Sarai carries the risk.",
      "💔 Self-protection wins the moment.",
      "Genesis lets us feel how fear can make a faithful person act in a deeply harmful way.",
    ]);
  }

  if (lower.includes("egyptians beheld") || lower.includes("very fair") || lower.includes("princes") || lower.includes("commended") || lower.includes("pharaoh's house") || lower.includes("entreated") || lower.includes("sheep")) {
    return add([
      "The consequences unfold step by step:",
      "👀 Sarai is noticed.",
      "🏛️ Pharaoh's house gets involved.",
      "🎁 Abram receives gain.",
      "⚠️ Sarai is endangered.",
      "This is why the story feels uncomfortable. Abram's plan works for Abram, but it puts Sarai in harm's way.",
    ]);
  }

  if (lower.includes("plagued pharaoh") || lower.includes("great plagues") || lower.includes("sarah") || lower.includes("sari") || lower.includes("called abram") || lower.includes("what is this") || lower.includes("why didst") || lower.includes("taken her") || lower.includes("behold thy wife") || lower.includes("sent him away")) {
    return add([
      "God's rescue is mercy with exposure:",
      "🛡️ Sarai is protected.",
      "⚡ Pharaoh is stopped.",
      "📣 Abram is confronted.",
      "🚪 The family is sent away.",
      "The promise survives because God is faithful, not because Abram handled fear well.",
    ]);
  }

  if (lower.includes("went up out of egypt") || lower.includes("he and his wife") || lower.includes("lot with him") || lower.includes("into the south")) {
    return add([
      "This return has a quiet grace in it:",
      "⬅️ Abram leaves the place of compromise.",
      "👩 Sarai is still with him.",
      "👥 Lot is still on the journey.",
      "🗺️ The family moves back toward promise.",
      "Genesis lets failure be real without making it final.",
    ]);
  }

  if (lower.includes("very rich") || lower.includes("substance was great") || lower.includes("flocks") || lower.includes("herds") || lower.includes("tents")) {
    return add([
      "Abundance brings its own test:",
      "🐑 More animals.",
      "⛺ More household movement.",
      "📦 More possessions.",
      "⚠️ More pressure.",
      "Genesis is honest: blessing can create problems that require wisdom.",
    ]);
  }

  if (lower.includes("journeys") || lower.includes("bethel") || lower.includes("hai") || lower.includes("place of the altar") || lower.includes("called on the name")) {
    return add([
      "Abram is retracing worship ground:",
      "🗺️ Back through the land.",
      "⛪ Back near the altar.",
      "🙏 Back to calling on the Lord.",
      "🌱 Back toward promise.",
      "After Egypt, the best direction is not denial. It is return.",
    ]);
  }

  if (lower.includes("land was not able") || lower.includes("strife") || lower.includes("canaanite") || lower.includes("perizzite")) {
    return add([
      "The pressure is practical and spiritual:",
      "🌾 Limited land.",
      "🐑 Many animals.",
      "👥 Other peoples nearby.",
      "⚔️ Tension in the household.",
      "Faith is tested in ordinary logistics as much as in dramatic moments.",
    ]);
  }

  if (lower.includes("let there be no strife") || lower.includes("we be brethren") || lower.includes("whole land before thee") || lower.includes("separate thyself")) {
    return add([
      "Abram chooses peace with open hands:",
      "🤝 Relationship over winning.",
      "🗺️ Space over strife.",
      "🙌 Trust over control.",
      "🕊️ Peace before the conflict hardens.",
      "This is Abram acting more like a man who believes God will provide.",
    ]);
  }

  if (lower.includes("lot lifted up") || lower.includes("well watered") || lower.includes("garden of the lord") || lower.includes("land of egypt") || lower.includes("zoar") || lower.includes("plain of jordan")) {
    return add([
      "Lot's choice looks good on the surface:",
      "💧 Watered land.",
      "🌿 Garden-like beauty.",
      "👀 Visible opportunity.",
      "⚠️ Hidden danger.",
      "Genesis is training readers to ask where a choice is leading, not only how it looks.",
    ]);
  }

  if (lower.includes("journeyed east") || lower.includes("separated themselves") || lower.includes("cities of the plain") || lower.includes("pitched his tent") || lower.includes("sodom")) {
    return add([
      "Watch the drift:",
      "👀 Lot sees.",
      "🧭 Lot chooses.",
      "🌅 Lot moves east.",
      "⛺ Lot faces Sodom.",
      "Small directions can become serious destinations.",
    ]);
  }

  if (lower.includes("lord said unto abram") || lower.includes("lift up now thine eyes") || lower.includes("northward") || lower.includes("all the land") || lower.includes("to thee will i give")) {
    return add([
      "God answers Abram's open hand with promise:",
      "📣 God speaks after the separation.",
      "👀 Abram looks after God speaks.",
      "🗺️ The land is still promised.",
      "🎁 The gift is still secure.",
      "Abram did not lose the future by refusing to grab the present.",
    ]);
  }

  if (lower.includes("thy seed") || lower.includes("dust of the earth") || lower.includes("arise, walk") || lower.includes("length") || lower.includes("breadth")) {
    return add([
      "The promise gets bigger than Abram's present life:",
      "👶 Descendants he cannot yet see.",
      "🌫️ Dust he cannot count.",
      "🚶 Land he can walk but not yet own.",
      "📏 Space God promises before Abram possesses it.",
      "Faith keeps moving inside promises that are still larger than the moment.",
    ]);
  }

  if (lower.includes("mamre") || lower.includes("hebron") || lower.includes("built there an altar")) {
    return add([
      "Genesis keeps tying promise to place and worship:",
      "🌳 Mamre becomes a remembered place.",
      "🏙️ Hebron will matter again.",
      "⛪ Abram builds another altar.",
      "🙏 The journey stays centered on the Lord.",
      "Abram's map is slowly becoming a map of worship.",
    ]);
  }

  if (lower.includes("amraphel") || lower.includes("shinar, ellasar") || lower.includes("made war") || lower.includes("bera king") || lower.includes("sodom, gomorrah") || lower.includes("vale of siddim") || lower.includes("chedorlaomer") || lower.includes("rebelled") || lower.includes("fourteenth year") || lower.includes("rephaims") || lower.includes("enmishpat") || lower.includes("amalekites")) {
    return add([
      "This war report is setting the stage:",
      "👑 Kings are competing.",
      "📍 Regions are colliding.",
      "⚔️ Power is being challenged.",
      "🏙️ Sodom is in the middle of it.",
      "Lot's chosen direction has placed him near a dangerous world.",
    ]);
  }

  if (lower.includes("slimepits") || lower.includes("kings of sodom") || lower.includes("fell there") || lower.includes("goods of sodom") || lower.includes("victuals") || lower.includes("they took lot") || lower.includes("brother's son") || lower.includes("dwelt in sodom")) {
    return add([
      "The cost of Lot's direction becomes visible:",
      "🏙️ Sodom loses.",
      "📦 Goods are taken.",
      "🍞 Food is taken.",
      "⛓️ Lot is taken.",
      "Genesis is showing how a place that looked profitable can pull a person into its trouble.",
    ]);
  }

  if (lower.includes("escaped") || lower.includes("abram the hebrew") || lower.includes("plain of mamre") || lower.includes("confederates") || lower.includes("heard that his brother") || lower.includes("trained servants") || lower.includes("born in his own house") || lower.includes("three hundred") || lower.includes("pursued them") || lower.includes("divided himself") || lower.includes("brought back") || lower.includes("women also")) {
    return add([
      "Abram's rescue has courage and mercy in it:",
      "👂 He hears.",
      "🛡️ He arms trained men.",
      "🌙 He moves wisely by night.",
      "⛓️ He rescues Lot.",
      "🎒 He restores what was taken.",
      "This is Abram becoming a blessing in the middle of another city's disaster.",
    ]);
  }

  if (lower.includes("king of sodom went") || lower.includes("valley of shaveh")) {
    return add([
      "Victory brings a new test:",
      "👑 Kings come out.",
      "🏆 Abram has honor.",
      "💰 Rewards are possible.",
      "⚠️ Motives will be revealed.",
      "After danger comes the question: who gets credit for Abram's success?",
    ]);
  }

  if (lower.includes("melchizedek") || lower.includes("bread and wine") || lower.includes("priest of the most high") || lower.includes("blessed be abram") || lower.includes("possessor of heaven") || lower.includes("delivered thine enemies") || lower.includes("tithes")) {
    return add([
      "Melchizedek changes the atmosphere:",
      "🍞 Provision after battle.",
      "🍷 Fellowship after violence.",
      "⛪ Priesthood before Israel's priesthood.",
      "🙌 Blessing instead of bargaining.",
      "He helps Abram see the victory under God's hand.",
    ]);
  }

  if (lower.includes("give me the persons") || lower.includes("lift up mine hand") || lower.includes("thread") || lower.includes("shoelatchet") || lower.includes("made abram rich") || lower.includes("young men") || lower.includes("aner, eshcol")) {
    return add([
      "Abram draws a clean line:",
      "✋ No personal reward from Sodom.",
      "🧵 Not even a thread.",
      "👟 Not even a shoelatchet.",
      "🙌 The Lord alone gets credit.",
      "Abram has learned that some gain is not worth the confusion it creates.",
    ]);
  }

  if (lower.includes("fear not") || lower.includes("shield") || lower.includes("reward") || lower.includes("childless") || lower.includes("eliezer") || lower.includes("stars") || lower.includes("believed") || lower.includes("righteousness")) {
    return add([
      "Genesis 15 lets faith breathe honestly:",
      "😨 Fear is named.",
      "👶 Childlessness is named.",
      "⭐ Promise is repeated.",
      "🙌 Abram believes.",
      "Faith here is not loud confidence. It is trust holding onto God's word while the ache is still real.",
    ]);
  }

  if (lower.includes("heifer") || lower.includes("covenant") || lower.includes("deep sleep") || lower.includes("stranger") || lower.includes("four hundred") || lower.includes("smoking furnace") || lower.includes("burning lamp") || lower.includes("amorites")) {
    return add([
      "The covenant scene is heavy with meaning:",
      "🔥 God gives assurance.",
      "🌙 Abram is made still.",
      "⛓️ Future suffering is named.",
      "📜 The promise is sealed.",
      "God is not offering shallow comfort. He is binding Himself to a long, costly promise.",
    ]);
  }

  if (lower.includes("hagar") || lower.includes("sarai bare") || lower.includes("restrained") || lower.includes("maid") || lower.includes("hearkened") || lower.includes("conceived") || lower.includes("despised") || lower.includes("dealt hardly") || lower.includes("fled")) {
    return add([
      "This is what forced promise does to a household:",
      "⏳ Waiting hurts.",
      "🤲 Control takes over.",
      "👩 Hagar is used.",
      "💔 Relationships fracture.",
      "Genesis is not rushing past the damage. It wants us to see the cost of unbelieving shortcuts.",
    ]);
  }

  if (lower.includes("angel of the lord") || lower.includes("fountain") || lower.includes("whence") || lower.includes("ishmael") || lower.includes("heard thy affliction") || lower.includes("seest me") || lower.includes("beerlahairoi")) {
    return add([
      "Hagar's wilderness becomes a place of mercy:",
      "🌵 She is alone.",
      "💧 She is vulnerable.",
      "👁️ God sees.",
      "👂 God hears.",
      "The household may have failed her, but the Lord does not lose sight of her.",
    ]);
  }

  if (lower.includes("almighty god") || lower.includes("walk before") || lower.includes("be thou perfect") || lower.includes("abraham") || lower.includes("many nations") || lower.includes("everlasting covenant") || lower.includes("i will be their god")) {
    return add([
      "Genesis 17 reshapes identity by promise:",
      "🙌 God names His power.",
      "🚶 God calls for faithful walking.",
      "🆕 God gives a new name.",
      "♾️ God speaks covenant across generations.",
      "Abraham is learning to live under a future only God can create.",
    ]);
  }

  if (lower.includes("circumcised") || lower.includes("foreskin") || lower.includes("token") || lower.includes("eight days") || lower.includes("born in the house") || lower.includes("bought with money") || lower.includes("cut off")) {
    return add([
      "The covenant sign is concrete:",
      "✂️ Marked in the body.",
      "👶 Given to the next generation.",
      "🏠 Applied to the whole household.",
      "⚠️ Treated seriously.",
      "God's promise is not an idea floating above life. It marks a people.",
    ]);
  }

  if (lower.includes("sarah") || lower.includes("isaac") || lower.includes("laughed") || lower.includes("hundred years") || lower.includes("ishmael might live") || lower.includes("set time")) {
    return add([
      "The promise is becoming painfully specific:",
      "👩 Sarah is named.",
      "😂 Laughter rises.",
      "👶 Isaac is promised.",
      "📆 The time is set.",
      "God is moving the impossible promise from someday to soon.",
    ]);
  }

  if (lower.includes("lord appeared") || lower.includes("mamre") || lower.includes("three men") || lower.includes("ran to meet") || lower.includes("water") || lower.includes("bread") || lower.includes("calf") || lower.includes("butter")) {
    return add([
      "The holy visit arrives in ordinary hospitality:",
      "⛺ A tent.",
      "🌳 A tree.",
      "💧 Water.",
      "🍞 Bread.",
      "🐄 A meal.",
      "Genesis lets divine promise sit at a real table.",
    ]);
  }

  if (lower.includes("where is sarah") || lower.includes("time of life") || lower.includes("sarah heard") || lower.includes("old") || lower.includes("too hard") || lower.includes("sarah denied")) {
    return add([
      "Sarah's laugh is met by God's question:",
      "👂 She hears.",
      "😂 She laughs.",
      "🙈 She hides.",
      "💪 God asks what is too hard for Him.",
      "The Lord does not mock her ache. He confronts unbelief with power.",
    ]);
  }

  if (lower.includes("sodom") || lower.includes("judge of all") || lower.includes("righteous") || lower.includes("fifty") || lower.includes("dust and ashes") || lower.includes("ten's sake") || lower.includes("cry of sodom")) {
    return add([
      "Genesis holds justice and mercy together:",
      "⚖️ God investigates evil.",
      "🙏 Abraham pleads.",
      "🕊️ Mercy is possible.",
      "🏙️ Sodom is still accountable.",
      "The Judge of all the earth is not careless with judgment.",
    ]);
  }

  if (lower.includes("angels to sodom") || lower.includes("lot sat") || lower.includes("men of sodom") || lower.includes("compassed") || lower.includes("know them") || lower.includes("daughters") || lower.includes("blindness")) {
    return add([
      "Sodom's darkness comes into the street:",
      "🏙️ The city gathers.",
      "🚪 The house is surrounded.",
      "💔 Violence is demanded.",
      "🧑‍🦯 Judgment begins at the door.",
      "Genesis wants readers to feel why Sodom's judgment is righteous.",
    ]);
  }

  if (lower.includes("destroy this place") || lower.includes("mocked") || lower.includes("lingered") || lower.includes("laid hold") || lower.includes("merciful") || lower.includes("escape") || lower.includes("zoar")) {
    return add([
      "Lot's rescue is mercy dragging hesitation out of danger:",
      "🔥 Judgment is near.",
      "⏳ Lot lingers.",
      "🤝 Angels take his hand.",
      "🏃 He is pulled out.",
      "Sometimes mercy feels like being forced away from what would destroy us.",
    ]);
  }

  if (lower.includes("brimstone") || lower.includes("overthrew") || lower.includes("looked back") || lower.includes("pillar of salt") || lower.includes("smoke") || lower.includes("remembered abraham")) {
    return add([
      "The plain Lot chose becomes a warning:",
      "🔥 The cities fall.",
      "👀 Lot's wife looks back.",
      "🧂 The warning becomes visible.",
      "🙏 Abraham is remembered.",
      "Judgment is real, and mercy is real too.",
    ]);
  }

  if (lower.includes("cave") || lower.includes("not a man") || lower.includes("drink wine") || lower.includes("lie with him") || lower.includes("moab") || lower.includes("benammi")) {
    return add([
      "Lot's story ends in heartbreak:",
      "⛰️ Away from the plain.",
      "🕳️ Inside a cave.",
      "🍷 Under drunkenness.",
      "💔 Family brokenness.",
      "Genesis is showing the bitter harvest of a long drift toward Sodom.",
    ]);
  }

  if (lower.includes("gerar") || lower.includes("she is my sister") || lower.includes("abimelech") || lower.includes("dream") || lower.includes("dead man") || lower.includes("integrity") || lower.includes("withheld thee") || lower.includes("prophet")) {
    return add([
      "Genesis 20 is painful because the old fear returns:",
      "🔁 Abraham repeats the lie.",
      "👑 Another king is endangered.",
      "🛡️ God protects Sarah.",
      "📣 Abraham is exposed.",
      "The promise survives by God's faithfulness, not Abraham's perfect courage.",
    ]);
  }

  if (lower.includes("what hast thou done") || lower.includes("great sin") || lower.includes("what sawest") || lower.includes("fear of god") || lower.includes("slay me") || lower.includes("daughter of my father") || lower.includes("kindness")) {
    return add([
      "Abimelech's questions uncover Abraham's fear:",
      "❓ What did you do?",
      "⚠️ What danger did you bring?",
      "😨 What did you assume?",
      "🤐 What truth did you hide?",
      "Sometimes the outsider sees the believer's compromise more clearly than the believer does.",
    ]);
  }

  if (lower.includes("restored") || lower.includes("covering of the eyes") || lower.includes("abraham prayed") || lower.includes("god healed") || lower.includes("closed up all the wombs") || lower.includes("because of sarah")) {
    return add([
      "The chapter ends with restoration before Isaac's birth:",
      "👩 Sarah is returned.",
      "🛡️ Her place is protected.",
      "🙏 Abraham prays.",
      "🩺 God heals.",
      "The promised mother is guarded by God right before the promised son arrives.",
    ]);
  }

  return content;
}

function addGenesisElevenTwelveSectionTexture(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [title, addGenesisElevenTwelveTexture(title, content)] as [string, string]),
  }));
}

const DAY_5_QUALITY_REVIEW_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 11,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 11:1-4",
    title: "The Tower Of Babel Begins",
    icon: "🏙️",
    phrases: [
      phrase("The Whole Earth Was Of One Language", [
        "Before Babel, humanity is described as having one language and one speech.",
        "That means people could understand each other, plan together, and move quickly as one group.",
        "Unity itself is not the problem.",
        "The problem is what they do with that unity.",
        "Instead of filling the earth under God's command, they gather around a project built on pride and control.",
        "Genesis shows that people can be united and still be moving in the wrong direction.",
      ]),
      phrase("As They Journeyed From The East", [
        "This phrase shows people moving after the flood and after the nations have begun to spread.",
        "They are not floating in a story with no geography.",
        "They are traveling across real land toward a place where they will settle.",
        "The movement matters because God's purpose was for humanity to fill the earth.",
        "Their journey becomes dangerous when it turns into a refusal to keep spreading.",
      ]),
      phrase("They Found A Plain In The Land Of Shinar", [
        "A plain is a wide, flat place that could support settlement and building.",
        "Shinar is connected with ancient Mesopotamia, a region known for cities, organized building, and temple towers.",
        "This helps the reader picture why a city and tower could be built there.",
        "The land is not evil by itself.",
        "But the place becomes the setting where human skill is used for self-made greatness.",
      ]),
      phrase("They Dwelt There", [
        "To dwell means to settle and remain.",
        "This is important because the people are choosing a fixed center instead of continuing to spread over the earth.",
        "They want stability, control, and security.",
        "Those desires can sound normal, but here they become part of resisting God's purpose.",
        "Babel begins with a settled heart before it becomes a tall tower.",
      ]),
      phrase("Let Us Make Brick", [
        "The builders know how to work with the materials of Shinar.",
        "In Mesopotamia, baked brick was common because natural building stone was not as available.",
        "This detail shows planning, technology, and organization.",
        "Genesis is not saying skill is evil.",
        "It is showing that human ability becomes dangerous when pride tells it what to build.",
      ]),
      phrase("Burn Them Throughly", [
        "The builders bake the bricks hard so the structure can last.",
        "This tells us they are not making a temporary shelter.",
        "They want something strong, durable, and impressive.",
        "The phrase helps readers feel the ambition behind the project.",
        "They are trying to build a future they can control.",
      ]),
      phrase("They Had Brick For Stone", [
        "This phrase explains how the builders substitute brick for stone.",
        "It gives cultural detail about ancient construction in Shinar.",
        "The people are resourceful and practical.",
        "But Genesis wants us to look deeper than materials.",
        "The bricks may be strong, but the purpose of the project is spiritually weak.",
      ]),
      phrase("Slime Had They For Morter", [
        "Slime refers to bitumen, a tar-like substance used to hold bricks together.",
        "Morter is the binding material between the bricks.",
        "This detail makes the building project feel real and serious.",
        "They have the materials to hold the tower together.",
        "But no mortar can hold together a community built against God's purpose.",
      ]),
      phrase("Let Us Build Us A City And A Tower", [
        "The people want a city and a tower.",
        "A city gave ancient people protection, identity, trade, leadership, and a shared center.",
        "The tower likely carried religious and civic meaning, reaching upward as a sign of greatness.",
        "The problem is not building itself.",
        "The problem is a community organizing itself around pride instead of God's word.",
      ]),
      phrase("Whose Top May Reach Unto Heaven", [
        "This does not mean humans could literally climb into God's throne room.",
        "It means the tower was meant to look spiritually and socially impressive.",
        "Ancient temple towers were often connected with ideas of access between earth and heaven.",
        "Genesis answers this pride with irony: the LORD still has to come down to see it.",
        "No human tower can force its way to God.",
      ]),
      phrase("Let Us Make Us A Name", [
        "This is the heart of Babel.",
        "A name means reputation, identity, legacy, and significance.",
        "The people want to secure their own greatness.",
        "Genesis 12 will answer this directly when God promises to make Abram's name great.",
        "Babel grasps for a name; Abram receives one from God.",
      ]),
      phrase("Lest We Be Scattered Abroad", [
        "This phrase reveals their fear.",
        "They do not want to be scattered over the earth.",
        "But spreading over the earth was part of God's command to humanity after creation and after the flood.",
        "Their city is built to resist the future God intended.",
        "Babel shows how fear and pride can work together.",
      ]),
    ],
  },
  {
    chapter: 11,
    startVerse: 5,
    endVerse: 9,
    reference: "Genesis 11:5-9",
    title: "The LORD Scatters Babel",
    icon: "🔀",
    phrases: [
      phrase("The LORD Came Down To See The City", [
        "The builders think their tower reaches toward heaven, but the LORD comes down to see it.",
        "That is intentional irony.",
        "From the ground, Babel may look huge.",
        "Before God, it is not threatening at all.",
        "This phrase humbles human pride without needing a long speech.",
      ]),
      phrase("The City And The Tower", [
        "Genesis names both parts of the project because Babel is more than one tall building.",
        "The city represents a centralized human society.",
        "The tower represents upward pride and religious-looking ambition.",
        "Together they show people building a world around their own name.",
        "God sees the whole project clearly.",
      ]),
      phrase("Which The Children Of Men Builded", [
        "The phrase children of men reminds us that Babel is a human project.",
        "It is not commanded by God.",
        "It represents humanity after the flood trying to organize life without humble trust.",
        "This matters because Babel is not only ancient history.",
        "It shows a repeated human pattern: building identity apart from God.",
      ]),
      phrase("The People Is One, And They Have All One Language", [
        "God sees that the builders are unified in people and speech.",
        "Unity can be beautiful when it serves truth and obedience.",
        "Here, unity is serving pride.",
        "Their shared language makes cooperation easy because they can plan, command, organize, and build without communication barriers.",
        "That explains why God's judgment touches their language.",
        "He disrupts the tool they are using for rebellion.",
        "The phrase teaches that agreement is not automatically good.",
        "People can be deeply united around the wrong purpose.",
      ]),
      phrase("Nothing Will Be Restrained From Them", [
        "This does not mean humans can overpower God.",
        "It means their united rebellion will keep growing if God does not restrain it.",
        "After the flood, the human heart is still broken.",
        "Babel proves that a washed world is not the same as a changed heart.",
        "God limits evil before it spreads further.",
      ]),
      phrase("Let Us Go Down", [
        "This phrase answers the builders' own words.",
        "They said, let us build.",
        "God says, let us go down.",
        "The contrast shows who truly rules the story.",
        "Humanity organizes pride from below, but God answers from above.",
      ]),
      phrase("Confound Their Language", [
        "To confound means to confuse or mix up.",
        "God confuses their speech so they cannot understand one another.",
        "He does not merely knock down the tower.",
        "He breaks the shared communication that holds the rebellion together.",
        "Language confusion becomes the means of scattering pride.",
      ]),
      phrase("They May Not Understand One Another's Speech", [
        "The builders lose the ability to coordinate as one group.",
        "The phrase helps explain why the project stops.",
        "Their hands may still have bricks, but their speech can no longer hold the work together.",
        "The judgment reaches the practical center of the project.",
        "A proud city cannot stand when communication collapses.",
      ]),
      phrase("The LORD Scattered Them Abroad", [
        "This is the very thing the builders feared.",
        "They built to avoid being scattered, but the LORD scatters them anyway.",
        "God's purpose to fill the earth cannot be defeated by human pride.",
        "The scattering is judgment, but it also pushes humanity back toward the spread they resisted.",
        "God can break a project that keeps people from His purpose.",
      ]),
      phrase("They Left Off To Build The City", [
        "The project stops unfinished.",
        "The city that was meant to secure their name cannot secure itself.",
        "This phrase shows the limits of human ambition apart from God.",
        "Strong bricks, shared plans, and human pride are not enough.",
        "When God interrupts Babel, the work cannot continue.",
      ]),
      phrase("Therefore Is The Name Of It Called Babel", [
        "The name Babel becomes tied to confusion.",
        "The place that was meant to make a great name becomes remembered for judgment and scattering.",
        "Later Scripture will build on this theme through Babylon.",
        "Babel becomes a pattern for human empire organized against God.",
        "Genesis 11 prepares the need for God's promise in Genesis 12.",
      ]),
    ],
  },
  {
    chapter: 11,
    startVerse: 10,
    endVerse: 17,
    reference: "Genesis 11:10-17",
    title: "Shem's Line Continues",
    icon: "📜",
    phrases: [
      phrase("These Are The Generations Of Shem", [
        "This phrase begins the family line Genesis wants us to follow after Babel.",
        "The story has just shown humanity scattered among languages and lands.",
        "Now it narrows to Shem's descendants.",
        "That matters because Abram will come from this line.",
        "The genealogy is not filler; it is the road from the nations to the promise.",
      ]),
      phrase("Shem Was An Hundred Years Old", [
        "The age connects this line back to Noah's family after the flood.",
        "Genesis is showing real generations passing through time.",
        "God's plan does not move only through dramatic miracles.",
        "It also moves through births, years, households, and ordinary family history.",
      ]),
      phrase("Begat Arphaxad Two Years After The Flood", [
        "This phrase places Arphaxad's birth in relation to the flood.",
        "Life continues soon after judgment.",
        "The world has been scattered and reset, but the promise line keeps moving.",
        "Arphaxad matters because the family line toward Abram will pass through him.",
      ]),
      phrase("Lived After He Begat Arphaxad", [
        "This phrase shows that Shem's life continued after the named son was born.",
        "Genealogies often focus on the son who carries the main line, but the father remains part of a living family.",
        "Genesis is showing overlapping generations and long family continuity.",
        "The promise line is carried through real households, not isolated names.",
      ]),
      phrase("Begat Sons And Daughters", [
        "This repeated phrase reminds us that these families were larger than the one named son.",
        "Genesis names the line it wants us to follow, but it does not pretend nobody else existed.",
        "There were sons, daughters, households, marriages, and communities.",
        "The Bible's promise story moves through real human families.",
      ]),
      phrase("Arphaxad Lived Five And Thirty Years", [
        "The ages show the line moving one generation at a time.",
        "A new reader may want to skip the numbers, but they show continuity.",
        "Genesis is tracing the road carefully from Shem toward Abram.",
        "God's promise is being carried through time.",
      ]),
      phrase("Salah Lived Thirty Years, And Begat Eber", [
        "Eber becomes important because his name is often connected with the word Hebrew.",
        "Genesis is not ready to introduce Abram yet, but it is quietly moving closer.",
        "This phrase helps readers see that the genealogy has direction.",
        "The line is narrowing toward the people through whom the promise will unfold.",
      ]),
      phrase("Eber Lived Four And Thirty Years, And Begat Peleg", [
        "Peleg was already connected with division in Genesis 10.",
        "Here he appears inside the family line toward Abram.",
        "That links the Table of Nations, Babel's scattering, and the promise line together.",
        "The world is divided, but God's plan is still moving.",
      ]),
    ],
  },
  {
    chapter: 11,
    startVerse: 18,
    endVerse: 26,
    reference: "Genesis 11:18-26",
    title: "The Line Reaches Abram",
    icon: "🧬",
    phrases: [
      phrase("Peleg Lived Thirty Years, And Begat Reu", [
        "The line continues after Peleg, the name connected with division.",
        "Genesis is showing that the scattering of humanity does not stop God's purpose.",
        "The family line keeps moving through ordinary births and years.",
        "God is preserving the road to Abram one generation at a time.",
      ]),
      phrase("Peleg Lived After He Begat Reu", [
        "This repeated wording shows family continuity beyond the named son.",
        "The genealogy is not only a list of replacements.",
        "It describes fathers living, households growing, and generations overlapping.",
        "The rhythm teaches patience: God's plan often moves slowly through ordinary family life.",
      ]),
      phrase("Reu Lived Two And Thirty Years, And Begat Serug", [
        "This phrase carries the family line forward toward Terah and Abram.",
        "Reu and Serug do not receive long stories here.",
        "Still, their place matters because the promise line passes through them.",
        "Some names in Scripture are quiet links in a very important chain.",
      ]),
      phrase("Serug Lived Thirty Years, And Begat Nahor", [
        "Nahor's name will matter again in Abram's wider family story.",
        "Genesis is moving closer to the household that will shape Abram's background.",
        "The genealogy is no longer only ancient names far away from the main story.",
        "It is approaching the family circle of Abram himself.",
      ]),
      phrase("Nahor Lived Nine And Twenty Years, And Begat Terah", [
        "Terah is Abram's father.",
        "This phrase brings the genealogy to the doorway of Abram's story.",
        "God will call Abram in Genesis 12, but Genesis first gives his family background.",
        "Abram is not dropped into the Bible from nowhere.",
      ]),
      phrase("Nahor Lived After He Begat Terah", [
        "The repeated phrase keeps showing the slow passing of generations.",
        "Terah is born, but Nahor's household continues.",
        "Genesis is tracing one main line while reminding us that family life is wider than the named heir.",
        "The promise line moves inside real homes and real time.",
      ]),
      phrase("Terah Lived Seventy Years", [
        "Terah's age marks the final generation before Abram is introduced.",
        "The genealogy has almost reached the man God will call.",
        "This matters because Genesis 12 will ask Abram to leave his father's house.",
        "Genesis 11 first makes sure we know that father's house exists.",
      ]),
      phrase("Begat Abram, Nahor, And Haran", [
        "This phrase introduces Abram with his brothers.",
        "Abram belongs to a real family with relationships, history, and later tensions.",
        "Nahor's family will matter later when Isaac and Jacob's wives come from the extended family.",
        "Haran matters because he is Lot's father.",
        "The call of Abram begins inside an actual household.",
      ]),
    ],
  },
  {
    chapter: 11,
    startVerse: 27,
    endVerse: 32,
    reference: "Genesis 11:27-32",
    title: "Abram's Family Stops In Haran",
    icon: "🧳",
    phrases: [
      phrase("These Are The Generations Of Terah", [
        "This phrase opens a new focus in Genesis.",
        "The story is no longer tracing Shem's line broadly.",
        "It is zooming in on Terah's household because Abram is coming to the center.",
        "In Genesis, generations means the family account or history that follows.",
        "Here it prepares the reader for Abram's background before God's call.",
      ]),
      phrase("Terah Begat Abram, Nahor, And Haran", [
        "The family circle is named again because these relationships matter.",
        "Abram's story will include his wife, nephew, brother's line, and father's house.",
        "God's call will not happen in a vacuum.",
        "It will touch family, place, inheritance, memory, and grief.",
      ]),
      phrase("Haran Begat Lot", [
        "Lot is introduced as Haran's son.",
        "That matters because Lot will travel with Abram and become important in Genesis 13, 14, and 19.",
        "Genesis is planting his connection early.",
        "Lot is not just a random companion; he is Abram's nephew from a family marked by loss.",
      ]),
      phrase("Haran Died Before His Father", [
        "Haran dies while his father Terah is still alive.",
        "This is a painful family detail.",
        "It also explains why Lot's relationship to Abram will matter.",
        "Abram's family story includes death and grief before it includes the great promise.",
        "God's call enters a real wounded household.",
      ]),
      phrase("In Ur Of The Chaldees", [
        "Ur of the Chaldees was Abram's original homeland.",
        "It was a major city in Mesopotamia, associated with wealth, trade, organized life, and pagan worship.",
        "This place matters because Genesis 12 will call Abram away from what is familiar.",
        "Faith begins in a real place before it walks into the unknown.",
      ]),
      phrase("Abram And Nahor Took Them Wives", [
        "The family line now includes marriages.",
        "This matters because the promise of descendants will soon press directly against Abram and Sarai's situation.",
        "Genesis is not only listing men.",
        "It is preparing the household setting where the covenant story will unfold.",
      ]),
      phrase("The Name Of Abram's Wife Was Sarai", [
        "Sarai is introduced before the promise of descendants is given.",
        "That is important because she is not a side character.",
        "The promised offspring will involve her waiting, pain, faith, and God's miracle.",
        "Genesis names her here so the reader feels the tension in the next verse.",
      ]),
      phrase("Sarai Was Barren", [
        "This is one of the most important details in Abram's story.",
        "Barren means Sarai had no child.",
        "Genesis gives this detail before God promises Abram a great nation.",
        "That means the promise begins in a situation that looks impossible.",
        "The chosen family cannot continue by human strength alone.",
      ]),
      phrase("She Had No Child", [
        "The verse repeats the barrenness in plain words.",
        "Sarai was barren, and she had no child.",
        "Genesis wants the reader to feel the obstacle clearly.",
        "When God later promises seed, the reader already knows the human problem.",
        "The promise will require God's power.",
      ]),
      phrase("To Go Into The Land Of Canaan", [
        "Canaan is named as the destination before Genesis 12 begins.",
        "That matters because Canaan will become the land of promise.",
        "Terah's family starts moving toward that land, but the journey is not completed here.",
        "The story builds tension between direction and arrival.",
      ]),
      phrase("They Came Unto Haran", [
        "Haran becomes the stopping place on the way to Canaan.",
        "The family has left Ur, but they have not reached the destination.",
        "This makes Haran an in-between place.",
        "Genesis 12 will begin with Abram being called to continue beyond this pause.",
      ]),
      phrase("Dwelt There", [
        "The family settles in Haran.",
        "That matters because the journey toward Canaan has stalled.",
        "They are no longer in Ur, but they are not yet in the promised land.",
        "God's call to Abram will come into this unfinished movement.",
        "Faith will mean going forward from the place where the family stopped.",
      ]),
      phrase("Terah Died In Haran", [
        "Genesis 11 ends with Terah's death in Haran.",
        "Abram's next chapter begins after family history, delay, barrenness, and loss.",
        "That makes Genesis 12 feel more human.",
        "God's promise enters a life that is already complicated.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 12:1-3",
    title: "God Calls Abram",
    icon: "📣",
    phrases: [
      phrase("The LORD Had Said Unto Abram", [
        "Genesis 12 begins with the LORD speaking.",
        "Abram's story does not begin with Abram creating a dream for himself.",
        "It begins with God's word.",
        "Faith in Genesis is a response to God's initiative.",
        "Abram is not inventing a spiritual journey; he is answering a call.",
      ]),
      phrase("Get Thee Out", [
        "This is a command to leave.",
        "Abram must step away from the familiar world that shaped him.",
        "The call is costly because it involves movement, separation, and trust.",
        "God does not give Abram every detail first.",
        "He gives him the next step.",
      ]),
      phrase("Thy Country", [
        "Country means Abram's homeland.",
        "A homeland gave people identity, customs, language, security, and belonging.",
        "Leaving it was not a small religious adjustment.",
        "God is calling Abram away from the world he knows.",
      ]),
      phrase("Thy Kindred", [
        "Kindred means relatives or extended family.",
        "In the ancient world, family networks were protection and survival.",
        "Abram is being asked to trust the LORD beyond the visible safety of family ties.",
        "Obedience touches real relationships.",
      ]),
      phrase("Thy Father's House", [
        "The father's house was the deepest layer of family identity, authority, and inheritance.",
        "Genesis 11 just introduced Terah's household so readers would feel the weight of this command.",
        "God's call reaches into Abram's home story.",
        "Faith will mean trusting God beyond the household that formed him.",
      ]),
      phrase("Unto A Land That I Will Shew Thee", [
        "God does not hand Abram the full map at the beginning.",
        "He promises to show him the land.",
        "Abram must move with direction, but without total control.",
        "Faith is trusting the God who speaks before every detail is visible.",
      ]),
      phrase("I Will Make Of Thee A Great Nation", [
        "This promise sounds impossible because Genesis 11 already said Sarai was barren.",
        "Abram has no child, yet God promises a nation.",
        "The nation begins as God's word before it exists in history.",
        "The promise will depend on God's power, not human ability.",
      ]),
      phrase("I Will Bless Thee", [
        "Blessing means life under God's favor, care, provision, and purpose.",
        "God is not only calling Abram away from something.",
        "He is calling Abram into blessing.",
        "The future rests on God's generosity.",
      ]),
      phrase("I Will Make Thy Name Great", [
        "This phrase directly answers Babel.",
        "Babel said, let us make us a name.",
        "God says He will make Abram's name great.",
        "Babel grasps for greatness through pride.",
        "Abram receives significance through promise.",
      ]),
      phrase("Thou Shalt Be A Blessing", [
        "Abram is blessed so that blessing can move through him.",
        "God's promise is not meant to stop with Abram's private life.",
        "He becomes a channel of blessing for others.",
        "God chooses one family for the sake of many families.",
      ]),
      phrase("I Will Bless Them That Bless Thee", [
        "God promises to guard the line of promise.",
        "Those who bless Abram align themselves with what God is doing.",
        "This does not make Abram powerful by himself.",
        "It shows that God's promise has divine protection around it.",
      ]),
      phrase("Curse Him That Curseth Thee", [
        "To curse means to oppose, dishonor, or treat with contempt.",
        "God warns that opposition to Abram will not be ignored.",
        "Abram will face danger and conflict, but the promise is not fragile.",
        "God Himself stands behind it.",
      ]),
      phrase("In Thee Shall All Families Of The Earth Be Blessed", [
        "This is the global purpose of Abram's call.",
        "After Babel scatters the nations, God promises blessing for all families of the earth.",
        "Genesis 12 is not a small tribal story.",
        "God chooses one man with the whole world still in view.",
        "Christians see the deepest fulfillment of this promise in Jesus.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 4,
    endVerse: 6,
    reference: "Genesis 12:4-6",
    title: "Abram Enters Canaan",
    icon: "🚶",
    phrases: [
      phrase("Abram Departed", [
        "Abram responds to God's word by leaving.",
        "The sentence is simple, but the obedience is costly.",
        "He leaves the place where his family had settled.",
        "Faith becomes visible in movement.",
      ]),
      phrase("As The LORD Had Spoken Unto Him", [
        "This phrase explains why Abram departs.",
        "He is not moving because of restlessness or ambition.",
        "He goes because the LORD has spoken.",
        "Obedience in this passage is anchored in God's word.",
      ]),
      phrase("Lot Went With Him", [
        "Lot travels with Abram.",
        "Genesis 11 already told us Lot is Haran's son, Abram's nephew.",
        "His presence matters because Lot will soon create tension in Genesis 13.",
        "The promise journey includes family complexity.",
      ]),
      phrase("Seventy And Five Years Old", [
        "Abram is seventy-five when he leaves Haran.",
        "God's call comes to a man with years, history, possessions, and responsibility.",
        "Faith is not only for the young or unattached.",
        "God can open a new chapter late in life.",
      ]),
      phrase("Departed Out Of Haran", [
        "Haran was where Terah's family stopped.",
        "Abram now leaves that pause point.",
        "The family had begun toward Canaan but had not completed the journey.",
        "God's call moves Abram beyond the unfinished road of his father.",
      ]),
      phrase("Abram Took Sarai His Wife", [
        "Sarai is part of the journey.",
        "That matters because the promise of a great nation will involve her directly.",
        "Genesis has already told us she is barren.",
        "The impossible promise travels with the impossible situation.",
      ]),
      phrase("All Their Substance That They Had Gathered", [
        "Substance means possessions, goods, livestock, and household resources.",
        "Abram does not travel as a lone figure with nothing to manage.",
        "He moves with a real household and real responsibility.",
        "Faith happens in practical life.",
      ]),
      phrase("The Souls That They Had Gotten In Haran", [
        "Souls here refers to the people connected to Abram's household.",
        "This may include servants and dependents gathered in Haran.",
        "Abram's obedience affects more than himself.",
        "A whole household moves with him.",
      ]),
      phrase("Into The Land Of Canaan", [
        "Canaan is the land God is leading Abram toward.",
        "The family had aimed for Canaan in Genesis 11 but stopped in Haran.",
        "Now Abram enters the land where the promise will unfold.",
        "He is walking into the geography of God's covenant story.",
      ]),
      phrase("They Came Into The Land Of Canaan", [
        "This phrase marks arrival.",
        "Abram has not possessed the land yet, but he has entered it.",
        "The promise is beginning to touch real soil.",
        "Faith often reaches the place of promise before it sees full possession.",
      ]),
      phrase("The Place Of Sichem", [
        "Sichem, often called Shechem, is a real location in Canaan.",
        "It will matter again later in Genesis and in Israel's story.",
        "The place name shows that God's promise is not vague spirituality.",
        "It happens in real geography.",
      ]),
      phrase("The Plain Of Moreh", [
        "The plain or oak of Moreh was likely a known landmark near Sichem.",
        "Large trees often served as recognizable places in the ancient world.",
        "The detail gives the scene a concrete setting.",
        "Abram arrives at a real place where God will soon speak promise.",
      ]),
      phrase("The Canaanite Was Then In The Land", [
        "This sentence creates tension.",
        "Abram has reached the land, but other people already live there.",
        "The promise is real, but it is not simple or immediate.",
        "Abram must trust God's word while visible obstacles remain.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 7,
    endVerse: 9,
    reference: "Genesis 12:7-9",
    title: "The LORD Promises The Land",
    icon: "⛪",
    phrases: [
      phrase("The LORD Appeared Unto Abram", [
        "The LORD does not only call Abram from far away.",
        "He appears to him in the land.",
        "This confirms that Abram's journey is under God's personal care.",
        "The place of obedience becomes a place of revelation.",
      ]),
      phrase("Unto Thy Seed", [
        "Seed means offspring or descendants.",
        "This is striking because Abram still has no child.",
        "Sarai's barrenness has already been named.",
        "God speaks about descendants before Abram can see how descendants are possible.",
      ]),
      phrase("Will I Give This Land", [
        "The land is described as God's gift.",
        "Abram does not seize it here.",
        "God says He will give it to Abram's seed.",
        "The promise depends on God's faithfulness, not Abram's power.",
      ]),
      phrase("There Builded He An Altar", [
        "Abram responds to God's promise with worship.",
        "An altar is a place of sacrifice, prayer, and surrender.",
        "Abram marks the land with worship before he owns it.",
        "Where God speaks, Abram worships.",
      ]),
      phrase("Who Appeared Unto Him", [
        "Genesis repeats that the LORD appeared to Abram.",
        "That connects the altar directly to God's self-revelation.",
        "Abram is not worshiping a vague feeling.",
        "He is responding to the LORD who met him.",
      ]),
      phrase("He Builded An Altar Unto The LORD", [
        "Abram builds another altar as he moves through the land.",
        "His journey is marked by worship, not only travel.",
        "This shows that the promise is shaping Abram's public life.",
        "He is learning to live in Canaan as a worshiper of the LORD.",
      ]),
      phrase("Called Upon The Name Of The LORD", [
        "Calling on the name of the LORD means worship, prayer, and dependence.",
        "Abram is in a land filled with other peoples and gods.",
        "He publicly calls on the LORD.",
        "Faith becomes visible through worship.",
      ]),
      phrase("Abram Journeyed", [
        "Abram keeps moving through the land.",
        "The life of faith is not frozen in one moment.",
        "He receives promise, worships, and continues the journey.",
        "Genesis shows faith as movement over time.",
      ]),
      phrase("Going On Still Toward The South", [
        "The south refers to the Negev region, the southern part of the land.",
        "Abram is still a traveler under promise.",
        "He is not settled permanently yet.",
        "The next verse will show pressure rising through famine.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 10,
    endVerse: 13,
    reference: "Genesis 12:10-13",
    title: "Abram Acts Out Of Fear",
    icon: "😨",
    phrases: [
      phrase("There Was A Famine In The Land", [
        "A famine means the land did not have enough food.",
        "This is surprising because Abram has just entered the land of promise.",
        "Obedience does not remove pressure.",
        "Genesis shows that faith will be tested even in the place God leads.",
      ]),
      phrase("Abram Went Down Into Egypt", [
        "Egypt had the Nile and could often survive famine better than Canaan.",
        "Going down is partly geographical language.",
        "It also begins a Bible pattern: Egypt can be a place of survival, but also danger.",
        "Abram's fear will be exposed there.",
      ]),
      phrase("To Sojourn There", [
        "To sojourn means to stay temporarily as a foreigner.",
        "Abram is not moving to Egypt as his permanent home.",
        "He is seeking survival during famine.",
        "The word reminds readers that Abram is still a pilgrim.",
      ]),
      phrase("The Famine Was Grievous In The Land", [
        "Grievous means severe or heavy.",
        "The famine is not a small inconvenience.",
        "It is serious enough to push Abram toward Egypt.",
        "Real pressure can still expose fear and weak trust.",
      ]),
      phrase("Near To Enter Into Egypt", [
        "Abram's fear rises as he gets close to Egypt.",
        "He begins imagining what might happen.",
        "The danger may be real, but his response becomes wrong.",
        "Genesis lets us watch fear form before the lie is spoken.",
      ]),
      phrase("A Fair Woman To Look Upon", [
        "Abram says Sarai is beautiful.",
        "In this situation, her beauty makes him afraid.",
        "He thinks powerful Egyptians may desire her and kill him.",
        "The phrase explains his fear, but it also shows how Sarai is being pulled into his survival plan.",
      ]),
      phrase("They Will Kill Me", [
        "Abram fears for his own life.",
        "That fear is understandable, but it begins to rule him.",
        "He has received promises from God, but danger makes those promises feel distant.",
        "Genesis shows Abram honestly, with real faith and real weakness.",
      ]),
      phrase("They Will Save Thee Alive", [
        "Abram believes Sarai will survive while he may be killed.",
        "That fear leads him to protect himself through deception.",
        "The plan treats Sarai's safety as secondary to his own.",
        "Fear can make people use others as shields.",
      ]),
      phrase("Thou Art My Sister", [
        "Abram asks Sarai to identify herself as his sister.",
        "Genesis 20 later shows there is some family connection, but here the statement hides that she is his wife.",
        "A half-truth can still function as deception.",
        "Abram is trying to control danger with misleading words.",
      ]),
      phrase("That It May Be Well With Me", [
        "This phrase exposes Abram's motive.",
        "He wants things to go well for him.",
        "The problem is that his plan puts Sarai at risk.",
        "Fear has turned Abram inward.",
      ]),
      phrase("My Soul Shall Live Because Of Thee", [
        "Soul here means life.",
        "Abram says his life will be spared because of Sarai.",
        "That is a heavy burden to place on her.",
        "The phrase reveals how far fear has taken him from resting in God's promise.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 14,
    endVerse: 16,
    reference: "Genesis 12:14-16",
    title: "Sarai Is Taken Into Pharaoh's House",
    icon: "🏛️",
    phrases: [
      phrase("The Egyptians Beheld The Woman", [
        "Abram's fear starts coming true.",
        "The Egyptians notice Sarai.",
        "His concern was not completely imaginary.",
        "But his response to fear has placed Sarai in danger.",
      ]),
      phrase("That She Was Very Fair", [
        "Very fair means very beautiful.",
        "The text repeats Sarai's beauty because it drives the crisis.",
        "Abram's plan does not protect her from being taken.",
        "It helps create the danger.",
      ]),
      phrase("The Princes Also Of Pharaoh Saw Her", [
        "Pharaoh's officials notice Sarai and bring word to the palace.",
        "This moves the problem from ordinary Egyptians to royal power.",
        "Abram's fear has now entered a system much stronger than his own household.",
        "The phrase matters because it shows how quickly deception can grow beyond the person who started it.",
        "Sarai is not simply in an awkward conversation; she is being pulled toward the throne of Egypt.",
        "A beginner should notice that Abram tried to manage danger with a half-truth, but the half-truth placed the promise family in deeper danger.",
      ]),
      phrase("Commended Her Before Pharaoh", [
        "To commend her means they praised or recommended her to Pharaoh.",
        "Sarai is spoken about before the king as desirable.",
        "The deception has carried her into Pharaoh's attention.",
        "The promise family is now in danger.",
      ]),
      phrase("The Woman Was Taken Into Pharaoh's House", [
        "This is the crisis point.",
        "Sarai is taken into Pharaoh's house.",
        "Abram's wife is now inside another man's royal household.",
        "The promise of descendants is threatened, and God must intervene.",
      ]),
      phrase("He Entreated Abram Well For Her Sake", [
        "Pharaoh treats Abram well because of Sarai.",
        "Abram receives benefits from the deception that endangers his wife.",
        "Genesis does not present Abram as heroic here.",
        "It lets the moral discomfort remain.",
      ]),
      phrase("Sheep, And Oxen, And He Asses", [
        "These animals represent wealth in the ancient world.",
        "Abram becomes richer in Egypt.",
        "But the gain comes through a compromised situation.",
        "Material increase is not always proof that everything is spiritually healthy.",
      ]),
      phrase("Menservants, And Maidservants, And She Asses, And Camels", [
        "The gift list shows Abram receiving a large increase in household wealth.",
        "Servants and camels point to status, labor, and resources.",
        "But Abram's household is growing while Sarai is vulnerable.",
        "Genesis wants readers to see the tension.",
      ]),
    ],
  },
  {
    chapter: 12,
    startVerse: 17,
    endVerse: 20,
    reference: "Genesis 12:17-20",
    title: "God Protects Sarai In Egypt",
    icon: "🛡️",
    phrases: [
      phrase("The LORD Plagued Pharaoh", [
        "God intervenes directly.",
        "Abram has failed to protect Sarai, but the LORD protects her.",
        "The plagues show that Pharaoh's house cannot simply absorb Abram's wife.",
        "God is guarding the promise line.",
      ]),
      phrase("With Great Plagues", [
        "The plagues are serious enough for Pharaoh to realize something is wrong.",
        "This also foreshadows later Bible history.",
        "In Exodus, God will again strike Pharaoh's house with plagues to deliver Abram's descendants.",
        "Genesis is planting an early pattern.",
      ]),
      phrase("Because Of Sarai Abram's Wife", [
        "This phrase explains why the plagues come.",
        "Sarai is Abram's wife, and she belongs in the promise family.",
        "God acts because the covenant future is at risk.",
        "Sarai is not invisible to God inside Pharaoh's house.",
      ]),
      phrase("What Is This That Thou Hast Done Unto Me", [
        "Pharaoh confronts Abram.",
        "The pagan king sees the wrong Abram has done.",
        "This is humbling because Abram is the one called by God, yet Pharaoh is the one naming the deception.",
        "Genesis does not hide Abram's failure.",
      ]),
      phrase("Why Didst Thou Not Tell Me That She Was Thy Wife", [
        "Pharaoh exposes the hidden truth.",
        "Sarai was not merely Abram's sister in the way Abram presented it.",
        "She was his wife.",
        "The question shows that Abram's silence created danger for everyone involved.",
      ]),
      phrase("Behold Thy Wife, Take Her, And Go Thy Way", [
        "Pharaoh returns Sarai to Abram and sends him away.",
        "This restores the marriage situation that Abram's fear endangered.",
        "God's protection is working even through Pharaoh's command.",
        "The promise line is preserved.",
      ]),
      phrase("They Sent Him Away, And His Wife, And All That He Had", [
        "Abram leaves Egypt with Sarai and his possessions.",
        "God has protected the promise family despite Abram's failure.",
        "The exit from Egypt also foreshadows Israel's later story.",
        "God can bring His people out with what they need, even after danger and judgment.",
      ]),
    ],
  },
  {
    chapter: 13,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 13:1-7",
    title: "Abram Returns To The Altar",
    icon: "⛺",
    phrases: [
      phrase("Abram Went Up Out Of Egypt", [
        "Abram leaves Egypt after God's intervention protected Sarai.",
        "The phrase marks a return from the place where fear led him into deception.",
        "He went down into Egypt because of famine, but he comes up out of Egypt because God preserved the promise family.",
        "This matters because Abram is not leaving as a hero who solved the problem.",
        "He is leaving as a man who needed rescue from the consequences of his own fear.",
        "Genesis is teaching that God's faithfulness is stronger than Abram's failure, but Abram still has to walk back from the place where his fear took him.",
      ]),
      phrase("He, And His Wife, And All That He Had", [
        "Sarai leaves Egypt with Abram.",
        "That matters because the promise family is intact after a dangerous failure.",
        "Abram also leaves with possessions, but the most important mercy is that Sarai has been restored to him.",
        "The promise of descendants cannot move forward if Sarai is lost in Pharaoh's house.",
        "This phrase helps the reader see that God protected the covenant future, not merely Abram's comfort.",
        "The family comes out together because the LORD guarded what Abram's fear endangered.",
      ]),
      phrase("Lot With Him", [
        "Lot continues traveling with Abram after Egypt.",
        "His presence keeps the family complexity in the story.",
        "He is not just a background relative; the next conflict will grow around the size of their households and herds.",
        "This phrase matters because Genesis is preparing the reader for the separation between Abram and Lot.",
        "The promise line will continue through Abram, but Lot's choices will still affect the story deeply.",
        "A small travel detail becomes important because the people who walk with Abram can bring both blessing and tension into the journey.",
      ]),
      phrase("Abram Was Very Rich In Cattle, In Silver, And In Gold", [
        "Abram now has great wealth.",
        "Wealth is not presented as evil by itself.",
        "But Genesis will immediately show that abundance can create new pressure.",
        "Egypt tested Abram through fear; prosperity will test him through conflict.",
      ]),
      phrase("Unto The Place Where His Tent Had Been At The Beginning", [
        "Abram returns to an earlier place in the land.",
        "This feels like a return after failure.",
        "He is coming back to the path of promise after the Egypt episode.",
        "Genesis often marks faith through movement back toward worship.",
      ]),
      phrase("Unto The Place Of The Altar", [
        "Abram returns to the altar he had made before.",
        "That is important because worship is where his journey is re-centered.",
        "Egypt exposed fear, deception, and danger, but the altar brings Abram back to the LORD.",
        "The phrase matters because Genesis does not move Abram forward by pretending nothing happened.",
        "He comes back to the place where he had called on God's name.",
        "For a reader, this shows that failure should not make a person run from worship; it should draw them back to the God who restores and leads.",
      ]),
      phrase("There Abram Called On The Name Of The LORD", [
        "Abram calls on the LORD again.",
        "This phrase means worship, prayer, and renewed dependence.",
        "Abram's failure in Egypt does not end his walk with God.",
        "He returns to worship.",
      ]),
      phrase("Lot Also, Which Went With Abram, Had Flocks, And Herds, And Tents", [
        "Lot also has growing wealth and a large household.",
        "The word also matters because Lot's prosperity now parallels Abram's.",
        "Two large households are traveling together in limited land.",
        "The coming conflict is being set up.",
      ]),
      phrase("The Land Was Not Able To Bear Them", [
        "The land cannot support both households together.",
        "This is a practical problem caused by abundance.",
        "Not every test comes through lack.",
        "Sometimes blessing creates decisions that reveal character.",
      ]),
      phrase("Their Substance Was Great", [
        "Their possessions are large enough to create pressure.",
        "The same word substance appeared when Abram left Haran.",
        "Now that substance has grown.",
        "Genesis shows that increased resources require wisdom and humility.",
      ]),
      phrase("There Was A Strife Between The Herdmen", [
        "The conflict begins among the workers caring for the animals.",
        "Large flocks need water and pasture.",
        "When resources feel tight, tension rises.",
        "Genesis shows that family conflict can grow from practical pressure.",
      ]),
      phrase("The Canaanite And The Perizzite Dwelled Then In The Land", [
        "Abram and Lot are not alone in the land.",
        "Other peoples already live there.",
        "That makes the conflict more serious because the family of promise is being watched in a land not yet theirs.",
        "Their unity matters.",
      ]),
    ],
  },
  {
    chapter: 13,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 13:8-13",
    title: "Lot Chooses The Plain",
    icon: "👀",
    phrases: [
      phrase("Let There Be No Strife", [
        "Abram takes the initiative to stop the conflict.",
        "He does not let wealth or land pressure destroy the relationship.",
        "The phrase shows peacemaking before the quarrel becomes worse.",
        "Abram has failed in fear before, but here he acts with humility.",
      ]),
      phrase("For We Be Brethren", [
        "Abram appeals to family relationship.",
        "The bond matters more than winning the best land.",
        "This phrase helps readers see Abram's values in this moment.",
        "Peace between brothers matters more than grasping for advantage.",
      ]),
      phrase("Is Not The Whole Land Before Thee", [
        "Abram gives Lot the first choice.",
        "That is striking because Abram is the one who received the promise.",
        "He does not need to grab control to protect God's word.",
        "He can be generous because he trusts the promise.",
      ]),
      phrase("Separate Thyself, I Pray Thee, From Me", [
        "Abram recognizes that separation is needed.",
        "The word is not cold or hateful here.",
        "It is a practical way to preserve peace.",
        "Sometimes wisdom means creating space before conflict ruins relationship.",
      ]),
      phrase("Lot Lifted Up His Eyes", [
        "Lot makes his decision by what he sees.",
        "This phrase invites readers to watch his vision and values.",
        "He looks at the land's appearance before the text reminds us about Sodom's wickedness.",
        "Sight without spiritual wisdom can be dangerous.",
      ]),
      phrase("All The Plain Of Jordan", [
        "Lot sees a wide, attractive region.",
        "The plain looks useful for flocks and prosperity.",
        "On the surface, it seems like the obvious choice.",
        "Genesis is about to show that what looks good can still carry danger.",
      ]),
      phrase("Well Watered Every Where", [
        "Water meant life, pasture, and prosperity.",
        "Lot sees what will benefit his herds and household.",
        "The choice makes economic sense.",
        "But Genesis wants readers to ask whether good-looking opportunity is always spiritually wise.",
      ]),
      phrase("Before The LORD Destroyed Sodom And Gomorrah", [
        "This comment warns the reader.",
        "Lot sees beauty, but the narrator knows judgment is coming.",
        "The land looks like opportunity, but it is near a place marked for destruction.",
        "Genesis teaches readers to look deeper than surface appearance.",
      ]),
      phrase("Even As The Garden Of The LORD", [
        "The plain looks like Eden in its abundance.",
        "That comparison makes Lot's choice feel attractive.",
        "But this is not Eden restored.",
        "A place can look fruitful and still be spiritually dangerous.",
      ]),
      phrase("Then Lot Chose Him All The Plain Of Jordan", [
        "Lot chooses the best-looking land for himself.",
        "Abram releases control; Lot takes what appears desirable.",
        "The contrast matters.",
        "One man trusts promise, while the other chooses by sight.",
      ]),
      phrase("Lot Journeyed East", [
        "Eastward movement in Genesis often carries a feeling of moving away from a place of promise or blessing.",
        "Lot's movement east is not just geography.",
        "It begins a drift toward Sodom.",
        "The direction helps readers feel the spiritual movement of the story.",
      ]),
      phrase("Pitched His Tent Toward Sodom", [
        "Lot does not live in Sodom yet, but he moves toward it.",
        "That phrase is important because compromise often moves by stages.",
        "The tent points in the direction his life is beginning to lean.",
        "Genesis is warning us before the danger fully arrives.",
      ]),
      phrase("The Men Of Sodom Were Wicked And Sinners Before The LORD Exceedingly", [
        "This sentence reveals what Lot's eyes did not weigh properly.",
        "Sodom is not only politically or socially dangerous.",
        "It is morally corrupt before the LORD.",
        "The word exceedingly makes the warning strong.",
        "Lot has chosen prosperity near deep wickedness.",
      ]),
    ],
  },
  {
    chapter: 13,
    startVerse: 14,
    endVerse: 18,
    reference: "Genesis 13:14-18",
    title: "The LORD Repeats The Land Promise",
    icon: "🌄",
    phrases: [
      phrase("After That Lot Was Separated From Him", [
        "God speaks after Lot separates from Abram.",
        "That timing matters.",
        "Abram has let Lot choose, and now God reaffirms the promise.",
        "The promise was never dependent on Abram controlling Lot's choice.",
      ]),
      phrase("Lift Up Now Thine Eyes", [
        "God tells Abram to lift his eyes.",
        "Lot lifted his eyes and chose by sight.",
        "Now Abram lifts his eyes under God's command.",
        "The contrast is beautiful: sight guided by desire is different from sight guided by promise.",
      ]),
      phrase("Northward, And Southward, And Eastward, And Westward", [
        "God tells Abram to look in every direction.",
        "The promise is broad and generous.",
        "Abram had just released the first choice to Lot.",
        "God now reminds him that the land promise remains wide in God's hands.",
      ]),
      phrase("All The Land Which Thou Seest", [
        "God connects Abram's view to His promise.",
        "Abram sees land he does not yet possess.",
        "Faith must live with that tension.",
        "The land is visible, but the fulfillment is still future.",
      ]),
      phrase("To Thee Will I Give It", [
        "The land is God's gift.",
        "Abram does not need to take it from Lot by force or fear.",
        "God Himself promises to give it.",
        "This frees Abram from grasping.",
      ]),
      phrase("To Thy Seed For Ever", [
        "The promise extends to Abram's descendants.",
        "That is powerful because Abram still has no child.",
        "God keeps speaking future where Abram sees impossibility.",
        "The promise is bigger than Abram's lifetime.",
      ]),
      phrase("I Will Make Thy Seed As The Dust Of The Earth", [
        "Dust is too many grains to count.",
        "God uses that picture to describe the abundance of Abram's future offspring.",
        "This directly answers the problem of Sarai's barrenness.",
        "God promises a family too large to number.",
      ]),
      phrase("Arise, Walk Through The Land", [
        "God tells Abram to walk through the land.",
        "This is a faith action.",
        "Abram walks through what God promises before he owns it.",
        "His steps become a way of receiving the promise by trust.",
      ]),
      phrase("In The Length Of It And In The Breadth Of It", [
        "God wants Abram to see the land's full scope.",
        "Length and breadth describe the promise as wide and real.",
        "This is not a vague spiritual blessing only.",
        "It involves actual land, direction, and future inheritance.",
      ]),
      phrase("I Will Give It Unto Thee", [
        "God repeats the gift language.",
        "The repetition strengthens Abram's faith after separation from Lot.",
        "God's promise does not shrink because Abram acted generously.",
        "What God gives is safer than what fear grabs.",
      ]),
      phrase("Abram Removed His Tent", [
        "Abram moves again in response to the promise.",
        "He is still a pilgrim, living in tents rather than settled possession.",
        "The promise is sure, but his lifestyle is still one of waiting and trust.",
        "This phrase matters because Abram does not yet own the land in the way his descendants will later possess it.",
        "He lives by faith in the land God has promised, moving his tent while God speaks future over him.",
        "A beginner should see the tension: God's word is firm, but Abram's daily life still requires patience, movement, worship, and trust.",
      ]),
      phrase("Built There An Altar Unto The LORD", [
        "Abram ends the scene with worship.",
        "After conflict, separation, and renewed promise, he builds an altar.",
        "The altar shows that Abram's future is held before the LORD.",
        "Promise leads him back to worship.",
      ]),
    ],
  },
];

const DAY_6_QUALITY_REVIEW_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 14,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 14:1-4",
    title: "Kings Go To War",
    icon: "⚔️",
    phrases: [
      phrase("It Came To Pass In The Days Of Amraphel King Of Shinar", [
        "Genesis 14 opens like a historical record with named kings and places.",
        "The promise story is now touching the politics of the wider ancient world.",
        "Abram is not living in an empty spiritual bubble.",
        "He is in a land surrounded by real kingdoms, alliances, war, and danger.",
      ]),
      phrase("Chedorlaomer King Of Elam", [
        "Chedorlaomer becomes the lead power in this conflict.",
        "Verse 4 explains that other kings served him for twelve years.",
        "That matters because Genesis is showing a world of domination and tribute.",
        "Abram's family will be pulled into a conflict much larger than themselves.",
      ]),
      phrase("These Made War", [
        "This phrase announces the main action of the first half of the chapter.",
        "Genesis moves from family promise into international conflict.",
        "War is not background noise here.",
        "It becomes the event that endangers Lot and draws Abram into rescue.",
      ]),
      phrase("The King Of Sodom", [
        "Sodom is already appearing again after Genesis 13 warned us about its wickedness.",
        "Lot had pitched his tent toward Sodom, and now Sodom is caught in war.",
        "This detail shows how Lot's direction is placing him near danger.",
        "The choice that looked prosperous is becoming costly.",
      ]),
      phrase("All These Were Joined Together", [
        "The kings form an alliance for battle.",
        "Ancient war often involved coalitions of city-kings and regional powers.",
        "This phrase helps the reader understand that the chapter is not one man fighting another man.",
        "It is a large conflict with organized sides.",
      ]),
      phrase("The Vale Of Siddim", [
        "The vale of Siddim is the battlefield where the kings gather.",
        "Genesis gives the location because the place will matter in the outcome.",
        "Later the text says the vale was full of slimepits.",
        "The battlefield itself becomes part of the defeat.",
      ]),
      phrase("Which Is The Salt Sea", [
        "This phrase connects the ancient name to a place later readers would recognize.",
        "The Salt Sea is associated with the Dead Sea region.",
        "Genesis is anchoring the battle in real geography.",
        "The promise story is happening in real land with real danger around it.",
      ]),
      phrase("Twelve Years They Served Chedorlaomer", [
        "Serving Chedorlaomer means these kings were under his power.",
        "They likely owed tribute, loyalty, or submission.",
        "The number twelve shows this was not a quick disagreement.",
        "The rebellion grows out of years of being dominated.",
      ]),
      phrase("In The Thirteenth Year They Rebelled", [
        "The rebellion explains why war breaks out.",
        "The kings of the plain try to throw off Chedorlaomer's control.",
        "Genesis is showing the instability of human kingdoms.",
        "Power creates resentment, and resentment erupts into conflict.",
      ]),
    ],
  },
  {
    chapter: 14,
    startVerse: 5,
    endVerse: 9,
    reference: "Genesis 14:5-9",
    title: "The Battle Reaches The Plain",
    icon: "🛡️",
    phrases: [
      phrase("In The Fourteenth Year Came Chedorlaomer", [
        "Chedorlaomer responds one year after the rebellion.",
        "He does not ignore the revolt.",
        "The chapter shows how ancient power answers defiance with military force.",
        "This sets the stage for the kings of Sodom and Gomorrah to be defeated.",
      ]),
      phrase("The Kings That Were With Him", [
        "Chedorlaomer is not alone.",
        "He comes with allied kings, which makes his campaign stronger and more dangerous.",
        "Genesis wants readers to feel the size of the threat.",
        "Lot will be taken by a powerful coalition, not by a small local argument.",
      ]),
      phrase("Smote The Rephaims", [
        "The campaign strikes several peoples before reaching Sodom.",
        "This phrase shows the invading kings sweeping through the region with force.",
        "The names may feel unfamiliar, but they communicate a widening military campaign.",
        "The war is spreading across lands and peoples.",
      ]),
      phrase("The Horites In Their Mount Seir", [
        "Mount Seir will matter later in biblical geography, especially with Edom.",
        "Here it shows the campaign reaching mountain peoples and regions.",
        "Genesis is building a map of conflict around the land of promise.",
        "Abram's world is surrounded by nations with their own histories.",
      ]),
      phrase("Unto Elparan, Which Is By The Wilderness", [
        "The campaign reaches toward wilderness territory.",
        "This phrase helps readers see the geographic range of the war.",
        "The invading kings are moving through a broad region, not one tiny valley.",
        "Their strength looks overwhelming before Abram enters the story.",
      ]),
      phrase("They Returned, And Came To Enmishpat", [
        "The army turns back and continues striking places on its route.",
        "This gives the campaign a sweeping, relentless feeling.",
        "Genesis is showing organized military pressure moving closer to the cities of the plain.",
        "The danger is approaching Lot's chosen world.",
      ]),
      phrase("The King Of Sodom, And The King Of Gomorrah", [
        "The kings connected to Lot's region now go out to battle.",
        "Genesis 13 already warned us that Sodom was spiritually dangerous.",
        "Now Sodom is also politically vulnerable.",
        "Lot's nearness to Sodom has placed him near both wickedness and war.",
      ]),
      phrase("They Joined Battle With Them In The Vale Of Siddim", [
        "The conflict finally gathers at the vale of Siddim.",
        "This is where the rebellion meets the invading power.",
        "The phrase helps the reader follow the story from political tension to battlefield crisis.",
        "The next verses will show the defeat that sweeps Lot away.",
      ]),
      phrase("Four Kings With Five", [
        "Genesis summarizes the battle as four kings against five.",
        "The phrase is memorable because it captures the scale and imbalance of the conflict.",
        "Abram is not mentioned yet, but his family will be affected by this war.",
        "The promise story is about to collide with world politics.",
      ]),
    ],
  },
  {
    chapter: 14,
    startVerse: 10,
    endVerse: 12,
    reference: "Genesis 14:10-12",
    title: "Lot Is Taken Captive",
    icon: "⛓️",
    phrases: [
      phrase("The Vale Of Siddim Was Full Of Slimepits", [
        "The battlefield is full of pits of bitumen, a tar-like substance.",
        "This detail matters because the land itself becomes dangerous in the defeat.",
        "The place chosen for battle is unstable and costly.",
        "Genesis is showing defeat through both enemy power and hazardous terrain.",
      ]),
      phrase("The Kings Of Sodom And Gomorrah Fled", [
        "The kings of the plain lose the battle and run.",
        "Their rebellion against Chedorlaomer fails.",
        "This matters because Lot is attached to the losing side's region.",
        "The safety he seemed to gain near Sodom is falling apart.",
      ]),
      phrase("They That Remained Fled To The Mountain", [
        "The survivors scatter to the mountain for safety.",
        "The image is one of collapse and panic.",
        "The cities of the plain cannot protect themselves.",
        "Genesis prepares us to see Abram's rescue as courageous and surprising.",
      ]),
      phrase("They Took All The Goods Of Sodom And Gomorrah", [
        "The victorious kings plunder the defeated cities.",
        "Goods means possessions, wealth, and supplies.",
        "War in the ancient world often meant taking resources from the defeated.",
        "Sodom's wealth cannot save it when judgment-like danger arrives.",
      ]),
      phrase("All Their Victuals", [
        "Victuals means food or provisions.",
        "The invaders take what the cities need to live.",
        "This makes the defeat more severe than losing valuables.",
        "They take the supplies that sustain daily life.",
      ]),
      phrase("They Took Lot", [
        "This is the personal crisis inside the larger war.",
        "Lot is no longer just near Sodom; he is swept away with Sodom's loss.",
        "Genesis slows the story from kingdoms and goods to one family member in danger.",
        "Abram will act because Lot has been taken.",
      ]),
      phrase("Abram's Brother's Son", [
        "Genesis reminds us that Lot is Abram's nephew.",
        "The family connection matters.",
        "Abram will not treat Lot as someone else's problem.",
        "Even after Lot chose the plain, Abram responds to him as family.",
      ]),
      phrase("Who Dwelt In Sodom", [
        "Lot is now described as dwelling in Sodom.",
        "Earlier he pitched his tent toward Sodom.",
        "Now he is living there.",
        "Genesis shows movement by stages, and Lot's nearness has become residence.",
      ]),
      phrase("And His Goods, And Departed", [
        "Lot loses both freedom and possessions.",
        "The life that looked prosperous near Sodom is carried away by war.",
        "This phrase helps readers see the cost of choices made by sight.",
        "Lot's story is becoming a warning.",
      ]),
    ],
  },
  {
    chapter: 14,
    startVerse: 13,
    endVerse: 16,
    reference: "Genesis 14:13-16",
    title: "Abram Rescues Lot",
    icon: "🏃",
    phrases: [
      phrase("One That Had Escaped", [
        "The news reaches Abram through someone who survives the battle.",
        "This turns a distant war into Abram's personal responsibility.",
        "The escaped messenger becomes the link between Lot's captivity and Abram's rescue.",
        "Genesis shows how one report can call faith into action.",
      ]),
      phrase("Abram The Hebrew", [
        "This is the first time Abram is called the Hebrew.",
        "The title marks him as distinct among the peoples of the land.",
        "Abram belongs to the promise of God, but he is also a recognizable outsider in the region.",
        "The phrase helps readers see his identity in a world of kings and tribes.",
      ]),
      phrase("The Plain Of Mamre The Amorite", [
        "Abram is living near Mamre the Amorite.",
        "This shows Abram has relationships and alliances in the land.",
        "He is a sojourner, but he is not invisible.",
        "His household is connected enough to respond when Lot is taken.",
      ]),
      phrase("These Were Confederate With Abram", [
        "Abram has allies.",
        "Confederate means joined in alliance or agreement.",
        "This matters because the rescue is not reckless isolation.",
        "Abram acts with household strength and local support.",
      ]),
      phrase("Abram Heard That His Brother Was Taken Captive", [
        "Lot is called Abram's brother here in the broader family sense.",
        "The phrase emphasizes kinship and loyalty.",
        "Abram hears that family has been captured, and he acts.",
        "His response contrasts with Lot's earlier self-focused choice.",
      ]),
      phrase("Armed His Trained Servants", [
        "Abram has trained men in his household.",
        "This shows his household is large, organized, and capable.",
        "He is not a helpless wanderer.",
        "God's promise has not made Abram passive; he can act with courage and wisdom.",
      ]),
      phrase("Born In His Own House", [
        "These servants are part of Abram's household community.",
        "They are not random hired soldiers gathered at the last moment.",
        "The phrase shows Abram's household has depth, loyalty, and structure.",
        "His family mission includes people who live under his care.",
      ]),
      phrase("Pursued Them Unto Dan", [
        "Abram pursues the invading kings a long distance.",
        "The rescue is costly and determined.",
        "He does not simply mourn Lot's captivity.",
        "He goes after him.",
      ]),
      phrase("He Divided Himself Against Them", [
        "Abram uses strategy in the rescue.",
        "Dividing his forces by night shows planning, courage, and surprise.",
        "Faith does not mean refusing practical wisdom.",
        "Abram trusts God while acting with careful strategy.",
      ]),
      phrase("He Brought Back All The Goods", [
        "Abram recovers what had been taken.",
        "The rescue reaches beyond Lot to the plundered goods of the region.",
        "This makes Abram a deliverer in the story.",
        "He brings restoration after war's loss.",
      ]),
      phrase("Brought Again His Brother Lot", [
        "Lot is restored by Abram's action.",
        "This is grace toward a family member whose choices led him into danger.",
        "Abram's rescue does not erase Lot's poor direction, but it shows faithful family love.",
        "The promise man becomes a rescuer.",
      ]),
      phrase("The Women Also, And The People", [
        "Abram's rescue includes vulnerable people, not only goods and family.",
        "The women and people are brought back too.",
        "This widens the mercy of the scene.",
        "Abram's victory restores lives, not just possessions.",
      ]),
    ],
  },
  {
    chapter: 14,
    startVerse: 17,
    endVerse: 20,
    reference: "Genesis 14:17-20",
    title: "Melchizedek Blesses Abram",
    icon: "🍞",
    phrases: [
      phrase("After His Return From The Slaughter Of Chedorlaomer", [
        "Abram returns from defeating the kings who had taken Lot.",
        "The scene after victory matters because victory can become a spiritual test.",
        "Two kings will meet Abram, and their responses will pull in different directions.",
        "Genesis slows down so we can watch Abram's heart after success.",
      ]),
      phrase("The King Of Sodom Went Out To Meet Him", [
        "The king of Sodom comes out after Abram's victory.",
        "Sodom has been rescued through Abram's action.",
        "This meeting prepares the later offer of goods.",
        "Abram will have to decide what kind of reward he will accept.",
      ]),
      phrase("Melchizedek King Of Salem", [
        "Melchizedek appears suddenly as both king and priest.",
        "Salem is often connected with Jerusalem.",
        "His arrival is mysterious and important because he blesses Abram in the name of the Most High God.",
        "Later Scripture will return to Melchizedek as a major priestly figure.",
      ]),
      phrase("Brought Forth Bread And Wine", [
        "Bread and wine are gifts of refreshment after battle.",
        "Melchizedek does not first ask Abram for tribute.",
        "He brings provision and blessing.",
        "For Christian readers, bread and wine also echo forward beautifully, though Genesis first presents them as royal-priestly hospitality.",
      ]),
      phrase("Priest Of The Most High God", [
        "Melchizedek is called priest before Israel's priesthood exists.",
        "This shows that worship of the true God is not limited to Abram's household alone.",
        "The title Most High God emphasizes God's supreme rule over every earthly king.",
        "Abram's victory is interpreted under God's authority.",
      ]),
      phrase("He Blessed Him", [
        "Melchizedek blesses Abram after the rescue.",
        "The blessing teaches Abram how to understand the victory.",
        "Abram is not self-made and not merely lucky.",
        "His life and victory belong under God's blessing.",
      ]),
      phrase("Blessed Be Abram Of The Most High God", [
        "Abram is named as belonging to the Most High God.",
        "That matters after a chapter full of earthly kings.",
        "Abram's true security is not in kings, armies, or plunder.",
        "He belongs to the God who rules above all.",
      ]),
      phrase("Possessor Of Heaven And Earth", [
        "This title means God owns everything.",
        "Heaven and earth are not outside His rule.",
        "That becomes important when the king of Sodom offers Abram goods.",
        "Abram can refuse Sodom's wealth because God is the true possessor.",
      ]),
      phrase("Delivered Thine Enemies Into Thy Hand", [
        "Melchizedek gives God credit for Abram's victory.",
        "Abram fought, planned, and pursued, but God delivered the enemies.",
        "The phrase holds human action and divine help together.",
        "Abram's success should lead to worship, not pride.",
      ]),
      phrase("He Gave Him Tithes Of All", [
        "Abram gives Melchizedek a tenth of everything.",
        "This act honors the priest of the Most High God.",
        "It shows Abram receiving the blessing humbly.",
        "The victory becomes an occasion for worshipful giving.",
      ]),
    ],
  },
  {
    chapter: 14,
    startVerse: 21,
    endVerse: 24,
    reference: "Genesis 14:21-24",
    title: "Abram Refuses The Wealth Of Sodom",
    icon: "✋",
    phrases: [
      phrase("Give Me The Persons", [
        "The king of Sodom asks for the people back.",
        "His words come after Abram has rescued both people and goods.",
        "The request sounds simple, but it introduces a test.",
        "Abram must decide how much connection he will accept with Sodom's king.",
      ]),
      phrase("Take The Goods To Thyself", [
        "The king of Sodom offers Abram the goods as reward.",
        "This could make Abram wealthier and more honored.",
        "But receiving Sodom's wealth would create a dangerous story about who made Abram rich.",
        "Abram refuses to let Sodom take credit for God's blessing.",
      ]),
      phrase("I Have Lift Up Mine Hand Unto The LORD", [
        "Abram speaks like a man under oath before God.",
        "Lifting the hand is a solemn way of declaring commitment.",
        "Abram's decision about money is tied to worship.",
        "He refuses the offer because he has already pledged himself to the LORD.",
      ]),
      phrase("The Most High God", [
        "Abram uses Melchizedek's title for God.",
        "This shows that Abram receives the truth of the blessing.",
        "The Most High God stands above Sodom's king and every other earthly power.",
        "Abram's allegiance is clear.",
      ]),
      phrase("The Possessor Of Heaven And Earth", [
        "Abram repeats the title that God owns heaven and earth.",
        "If God owns all things, Abram does not need Sodom's reward to secure his future.",
        "This title gives Abram freedom from grasping.",
        "The God who promised blessing is enough.",
      ]),
      phrase("I Will Not Take From A Thread Even To A Shoelatchet", [
        "Abram refuses even the smallest item from Sodom's goods.",
        "A thread and a shoelatchet represent tiny, ordinary things.",
        "His refusal is complete, not symbolic only.",
        "Abram will not let Sodom claim any part in making him rich.",
      ]),
      phrase("Lest Thou Shouldest Say, I Have Made Abram Rich", [
        "Abram explains his concern.",
        "He does not want the king of Sodom to say Abram's prosperity came from him.",
        "God has promised to bless Abram.",
        "Abram protects the testimony of that promise by refusing compromised gain.",
      ]),
      phrase("Save Only That Which The Young Men Have Eaten", [
        "Abram makes a fair exception for what his men already ate.",
        "His refusal is principled, not performative.",
        "He is not trying to look spiritual by denying ordinary needs.",
        "Integrity still includes practical fairness.",
      ]),
      phrase("Let Them Take Their Portion", [
        "Abram's personal conviction does not force his allies to refuse their rightful share.",
        "He distinguishes his own vow from their portion.",
        "This shows wisdom and fairness.",
        "Abram refuses Sodom's wealth for himself while honoring those who helped him.",
      ]),
    ],
  },
  {
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 15:1-6",
    title: "Abram Believes The LORD",
    icon: "⭐",
    phrases: [
      phrase("The Word Of The LORD Came Unto Abram", [
        "Genesis 15 begins with God's word again.",
        "Abram's faith is not based on vague feelings.",
        "The LORD speaks into Abram's fear, questions, and future.",
        "Faith has something solid to hold because God has spoken.",
      ]),
      phrase("In A Vision", [
        "God communicates with Abram in a vision.",
        "This marks the chapter as a special revelation moment.",
        "The promise is not Abram talking himself into hope.",
        "God is making His word known.",
      ]),
      phrase("Fear Not, Abram", [
        "God speaks directly to Abram's fear.",
        "After battle and after refusing Sodom's reward, Abram may feel vulnerable.",
        "The first word God gives is comfort.",
        "The promise story includes God's care for Abram's inner life.",
      ]),
      phrase("I Am Thy Shield", [
        "God Himself is Abram's protection.",
        "Abram has just fought kings, but his deepest security is not military strength.",
        "The LORD is his shield.",
        "This phrase teaches that God's presence is safer than any earthly defense.",
      ]),
      phrase("Thy Exceeding Great Reward", [
        "God is not only Abram's protector; He is Abram's reward.",
        "That matters after Abram refused the goods of Sodom.",
        "Abram does not lose by refusing compromised wealth.",
        "The LORD Himself is better than what Sodom could offer.",
      ]),
      phrase("Lord GOD, What Wilt Thou Give Me", [
        "Abram brings his question honestly to God.",
        "The promise of blessing has been spoken, but Abram still has no child.",
        "Faith here is not silent pretending.",
        "Abram trusts God enough to speak the ache plainly.",
      ]),
      phrase("I Go Childless", [
        "This is Abram's central pain.",
        "God has promised seed, but Abram has no child.",
        "The phrase makes the tension of the chapter clear.",
        "The promise and Abram's visible life do not yet match.",
      ]),
      phrase("One Born In Mine House Is Mine Heir", [
        "Abram sees a household servant as the likely heir under the customs of the time.",
        "This shows he is thinking practically about inheritance.",
        "But God's promise will not be fulfilled through a backup plan Abram can manage.",
        "God will give the heir He promised.",
      ]),
      phrase("This Shall Not Be Thine Heir", [
        "God corrects Abram's assumption.",
        "The servant born in Abram's house will not be the promised heir.",
        "The LORD narrows the promise again.",
        "Abram's future will come by God's word, not by human workaround.",
      ]),
      phrase("He That Shall Come Forth Out Of Thine Own Bowels", [
        "God promises Abram a son from his own body.",
        "This is direct and personal.",
        "The promise is not only that Abram will have a legal heir.",
        "He will have his own offspring by God's power.",
      ]),
      phrase("Look Now Toward Heaven", [
        "God takes Abram outside and turns his eyes upward.",
        "The promise becomes attached to the night sky.",
        "Abram's small household problem is placed under a vast heaven.",
        "God gives him a picture larger than his fear.",
      ]),
      phrase("Tell The Stars", [
        "Tell means count.",
        "God asks Abram to count what cannot be counted.",
        "The stars become a visual lesson in promise.",
        "Abram's future seed will be beyond his ability to measure.",
      ]),
      phrase("So Shall Thy Seed Be", [
        "God compares Abram's descendants to the uncountable stars.",
        "This sounds impossible to a childless man.",
        "That impossibility is the point.",
        "The promise rests on the God who speaks, not on Abram's present ability.",
      ]),
      phrase("He Believed In The LORD", [
        "Abram trusts the LORD's word.",
        "This is one of the most important faith statements in Scripture.",
        "Abram does not yet hold the child or possess the land.",
        "He believes the God who promises before the visible fulfillment arrives.",
      ]),
      phrase("He Counted It To Him For Righteousness", [
        "God counts Abram's faith as righteousness.",
        "This becomes a major Bible theme later, especially in Paul and James.",
        "Abram is accepted by trusting God's promise.",
        "The verse shows that right standing with God is rooted in faith, not human achievement.",
      ]),
    ],
  },
  {
    chapter: 15,
    startVerse: 7,
    endVerse: 11,
    reference: "Genesis 15:7-11",
    title: "Abram Asks For Assurance",
    icon: "🕯️",
    phrases: [
      phrase("I Am The LORD", [
        "God identifies Himself as the covenant LORD.",
        "The assurance begins with who God is.",
        "Abram's confidence must rest on the character of the One speaking.",
        "The promise is secure because the LORD is faithful.",
      ]),
      phrase("Brought Thee Out Of Ur Of The Chaldees", [
        "God reminds Abram of the journey already begun by His hand.",
        "Abram did not arrive at this point by accident.",
        "The LORD brought him out of his old homeland.",
        "Past grace becomes a reason to trust future promise.",
      ]),
      phrase("To Give Thee This Land", [
        "God repeats the purpose of Abram's journey.",
        "The land is a gift God intends to give.",
        "Abram is not wandering without meaning.",
        "His movement is tied to God's covenant plan.",
      ]),
      phrase("Whereby Shall I Know", [
        "Abram asks for assurance.",
        "This is not presented as unbelief that rejects God.",
        "It is a faith-filled question asking how the promise will be confirmed.",
        "Genesis shows that believers can bring honest questions to God.",
      ]),
      phrase("Take Me An Heifer", [
        "God answers Abram with covenant ceremony language.",
        "The animals are not random objects.",
        "They prepare for a solemn covenant sign Abram would understand in his world.",
        "God meets Abram's need for assurance through a visible covenant act.",
      ]),
      phrase("A She Goat", [
        "The she goat is part of the group of animals used in the covenant scene.",
        "Each animal contributes to the solemn weight of the ceremony.",
        "The promise of land is being confirmed in a serious, embodied way.",
        "God's word is not casual.",
      ]),
      phrase("A Ram", [
        "The ram joins the heifer and she goat in the covenant preparation.",
        "These larger animals will be divided in the midst.",
        "The divided pieces create the path where the covenant sign will happen.",
        "The scene is preparing readers for verse 17.",
      ]),
      phrase("A Turtledove, And A Young Pigeon", [
        "The birds complete the list of covenant animals.",
        "Later Israel's sacrificial system will also use birds in certain offerings.",
        "Here they are part of Abram's assurance ceremony.",
        "God gives Abram a visible sign using familiar sacrificial creatures.",
      ]),
      phrase("Divided Them In The Midst", [
        "Abram cuts the larger animals in two and lays the pieces opposite each other.",
        "In ancient covenant ceremonies, passing between pieces could symbolize a solemn oath.",
        "The scene is heavy because covenant promises deal with life, death, and faithfulness.",
        "God is preparing to confirm His word in a way Abram can see.",
      ]),
      phrase("The Birds Divided He Not", [
        "Abram does not divide the birds.",
        "The detail shows that he follows the ceremony carefully.",
        "Genesis is precise because the covenant scene matters.",
        "The reader is meant to slow down and feel the seriousness of the moment.",
      ]),
      phrase("Abram Drove Them Away", [
        "Birds of prey come down on the carcasses, and Abram drives them away.",
        "This small action shows Abram guarding the covenant preparation.",
        "It also fits the chapter's tension: the promise will face threat and delay.",
        "Abram waits and watches before God completes the sign.",
      ]),
    ],
  },
  {
    chapter: 15,
    startVerse: 12,
    endVerse: 16,
    reference: "Genesis 15:12-16",
    title: "God Reveals The Long Road Ahead",
    icon: "🌑",
    phrases: [
      phrase("A Deep Sleep Fell Upon Abram", [
        "Abram falls into a deep sleep before the covenant sign is completed.",
        "This echoes earlier deep sleep language in Genesis, where God acts while the human receives.",
        "Abram will not walk the covenant path himself.",
        "God is about to reveal and confirm what only God can secure.",
      ]),
      phrase("An Horror Of Great Darkness", [
        "The scene becomes frightening and weighty.",
        "God's covenant is full of promise, but the future will include suffering.",
        "The darkness prepares Abram for hard prophecy.",
        "The promise is real, but the road will not be easy.",
      ]),
      phrase("Thy Seed Shall Be A Stranger", [
        "God tells Abram his descendants will live as foreigners.",
        "This points ahead to Israel in Egypt.",
        "The promise line will not move straight from Abram to easy possession.",
        "God reveals exile before inheritance.",
      ]),
      phrase("In A Land That Is Not Theirs", [
        "Abram's descendants will live outside the land of promise for a season.",
        "This explains why the land promise will take generations to unfold.",
        "God is not surprised by the delay.",
        "He tells Abram beforehand.",
      ]),
      phrase("Shall Serve Them", [
        "Abram's descendants will be forced into service.",
        "This points toward bondage in Egypt.",
        "Genesis is already preparing the Exodus story before Isaac is even born.",
        "The Bible's rescue story is being planted early.",
      ]),
      phrase("Four Hundred Years", [
        "The suffering will last a long time.",
        "This number helps readers understand that God's promises can span generations.",
        "Delay does not mean God has forgotten.",
        "The timeline is already known to Him.",
      ]),
      phrase("That Nation, Whom They Shall Serve, Will I Judge", [
        "God promises judgment on the nation that oppresses Abram's descendants.",
        "This points ahead to Egypt and the plagues of Exodus.",
        "Oppression will not have the final word.",
        "God sees the suffering before it happens and promises justice.",
      ]),
      phrase("Come Out With Great Substance", [
        "God promises that Abram's descendants will leave with wealth.",
        "This also points ahead to the Exodus, when Israel leaves Egypt with goods.",
        "The rescue will not be empty-handed.",
        "God will turn bondage into deliverance and provision.",
      ]),
      phrase("Thou Shalt Go To Thy Fathers In Peace", [
        "Abram will die before the whole promise is fulfilled.",
        "That is important because faith must trust beyond one's own lifetime.",
        "God's covenant plan is bigger than Abram's personal timeline.",
        "Abram can rest because God's promise will continue.",
      ]),
      phrase("In The Fourth Generation", [
        "God gives a generational marker for the return.",
        "The promise has timing, but the timing belongs to God.",
        "Abram's descendants will come back when God appoints.",
        "The delay is not meaningless.",
      ]),
      phrase("The Iniquity Of The Amorites Is Not Yet Full", [
        "God delays judgment on the Amorites because their sin has not yet reached its full measure.",
        "This shows God's patience and justice.",
        "The land promise is not a careless land grab.",
        "God will judge wickedness at the right time, not before.",
      ]),
    ],
  },
  {
    chapter: 15,
    startVerse: 17,
    endVerse: 21,
    reference: "Genesis 15:17-21",
    title: "The LORD Makes The Covenant",
    icon: "🔥",
    phrases: [
      phrase("When The Sun Went Down", [
        "The covenant sign happens in darkness.",
        "The setting matches the weight of the promise and prophecy Abram has received.",
        "God is about to confirm the covenant in a dramatic way.",
        "The darkness makes the fire imagery stand out.",
      ]),
      phrase("A Smoking Furnace", [
        "The smoking furnace is one of the visible signs that passes between the pieces.",
        "Smoke often signals God's holy presence and judgment in Scripture.",
        "The image is mysterious and serious.",
        "God Himself is represented in the covenant ceremony.",
      ]),
      phrase("A Burning Lamp", [
        "The burning lamp gives light in the darkness.",
        "Together with the smoking furnace, it marks God's presence passing through the covenant pieces.",
        "Abram does not pass between the pieces.",
        "God takes the covenant burden upon Himself.",
      ]),
      phrase("Passed Between Those Pieces", [
        "This is the key action in the covenant ceremony.",
        "In ancient covenant imagery, passing between pieces signaled a solemn oath.",
        "Here God alone passes through.",
        "That teaches that the covenant rests on God's commitment, not Abram's ability to hold everything together.",
      ]),
      phrase("The LORD Made A Covenant With Abram", [
        "This phrase names what the whole scene has been building toward.",
        "God formally makes covenant with Abram.",
        "Genesis 15 is one of the foundation chapters of the Bible's promise story.",
        "The future of the land, seed, and blessing is being solemnly confirmed.",
      ]),
      phrase("Unto Thy Seed Have I Given This Land", [
        "God speaks of the land as given, even though Abram's descendants do not yet possess it.",
        "That is the certainty of God's promise.",
        "What God pledges is so sure that it can be spoken as given.",
        "Faith learns to trust God's completed word before visible completion arrives.",
      ]),
      phrase("From The River Of Egypt", [
        "The river of Egypt marks one boundary in the land promise.",
        "God gives Abram more than a vague idea of blessing.",
        "The promise has geography.",
        "The covenant is tied to real land and real future inheritance.",
      ]),
      phrase("Unto The Great River, The River Euphrates", [
        "The Euphrates marks the far boundary named in the promise.",
        "This makes the land promise feel large and concrete.",
        "Abram is one man with no child, but God speaks of a vast future inheritance.",
        "The size of the promise reveals the size of God's faithfulness.",
      ]),
      phrase("The Kenites, And The Kenizzites, And The Kadmonites", [
        "The listed peoples show that the land is already inhabited.",
        "God's promise does not ignore reality.",
        "The inheritance will unfold in a real world with real peoples and real moral history.",
        "The names remind readers that covenant promise and divine justice meet in history.",
      ]),
      phrase("The Amorites, And The Canaanites, And The Girgashites, And The Jebusites", [
        "The final names connect the promise to peoples Israel will later encounter.",
        "Genesis is setting up the long story of the land.",
        "These names are not random labels.",
        "They show that God's covenant promise is moving toward future conflict, judgment, and inheritance.",
      ]),
    ],
  },
];

const DAY_7_QUALITY_REVIEW_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 16,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 16:1-3",
    title: "Sarai Gives Hagar To Abram",
    icon: "🧺",
    phrases: [
      phrase("Sarai Abram's Wife Bare Him No Children", [
        "This is the pressure sitting underneath the whole scene.",
        "God has promised Abram offspring, but Sarai still has no child.",
        "In that world, barrenness could feel painful, shameful, and frightening.",
        "The promise is real, but waiting is exposing fear inside the family.",
      ]),
      phrase("An Handmaid, An Egyptian, Whose Name Was Hagar", [
        "Hagar is not just background furniture in the story.",
        "She is an Egyptian servant living inside Abram and Sarai's household.",
        "That means she has very little power in what happens next.",
        "Genesis names her because God will see her as a real person, not only as part of someone else's plan.",
      ]),
      phrase("The LORD Hath Restrained Me From Bearing", [
        "Sarai knows the closed womb is connected to God's rule.",
        "But she draws a dangerous conclusion from her pain.",
        "Instead of waiting for God to fulfill His promise, she starts designing a shortcut.",
        "The phrase shows how true theology can still be handled with anxious control.",
      ]),
      phrase("Go In Unto My Maid", [
        "Sarai suggests that Abram have a child through Hagar.",
        "This was a known ancient custom, but Genesis does not present it as spiritually healthy.",
        "The family tries to force the promise through human arrangement.",
        "The plan may look practical, but it creates pain almost immediately.",
      ]),
      phrase("Obtain Children By Her", [
        "Sarai hopes Hagar's child can count as her child.",
        "This reveals how badly she wants the promised family to move forward.",
        "But the wording also shows the danger of treating another person as a tool for someone else's dream.",
        "God's promise does not need to be manufactured by using people.",
      ]),
      phrase("Abram Hearkened To The Voice Of Sarai", [
        "Abram listens and goes along with the plan.",
        "The wording echoes Genesis 3, where Adam listened to the voice of his wife in disobedience.",
        "The point is not that husbands should ignore wives.",
        "The warning is that God's word must lead the household when fear offers a shortcut.",
      ]),
      phrase("After Abram Had Dwelt Ten Years In The Land Of Canaan", [
        "Ten years of waiting is a long time.",
        "This detail helps readers feel why Sarai and Abram are struggling.",
        "The delay does not excuse the decision, but it explains the pressure behind it.",
        "Faith often gets tested most deeply when God's promise takes longer than expected.",
      ]),
      phrase("Gave Her To Her Husband Abram To Be His Wife", [
        "Hagar is moved into a wife-like role in the household.",
        "The family structure becomes complicated because they are trying to solve promise by pressure.",
        "What looks like a solution will soon bring jealousy, blame, and suffering.",
        "Genesis shows that forcing God's timing can wound everyone involved.",
      ]),
    ],
  },
  {
    chapter: 16,
    startVerse: 4,
    endVerse: 6,
    reference: "Genesis 16:4-6",
    title: "The Shortcut Brings Strife",
    icon: "⚠️",
    phrases: [
      phrase("She Conceived", [
        "The plan appears to work at first.",
        "Hagar becomes pregnant, and the promise problem seems solved from a human viewpoint.",
        "But conception does not mean the plan was wise or obedient.",
        "Genesis quickly shows that success without trust can still produce sorrow.",
      ]),
      phrase("When She Saw That She Had Conceived", [
        "Hagar now knows something has changed in her status.",
        "Pregnancy gives her a new place in the household, at least in her own eyes.",
        "The emotional balance between Sarai and Hagar begins to shift.",
        "The shortcut has created rivalry instead of peace.",
      ]),
      phrase("Her Mistress Was Despised In Her Eyes", [
        "Hagar looks down on Sarai after becoming pregnant.",
        "The servant now carries what the mistress could not have.",
        "This does not make Sarai innocent, but it shows how the arrangement damages relationships.",
        "When people are used to force an outcome, bitterness often grows on every side.",
      ]),
      phrase("My Wrong Be Upon Thee", [
        "Sarai turns her pain toward Abram.",
        "She helped create the plan, but now she feels the wrong of it landing on her.",
        "The phrase is full of blame, grief, and broken trust.",
        "The household that tried to control the promise is now fighting inside itself.",
      ]),
      phrase("I Was Despised In Her Eyes", [
        "Sarai names the humiliation she feels.",
        "Her barrenness was already painful, and Hagar's contempt makes it sharper.",
        "This helps beginners see that Genesis is not flattening people into heroes and villains.",
        "Sinful choices create real emotional wounds.",
      ]),
      phrase("The LORD Judge Between Me And Thee", [
        "Sarai appeals to the LORD as witness and judge.",
        "She wants God to decide where the wrong belongs.",
        "The tragic part is that God was the One they should have trusted before creating the crisis.",
        "Calling on God's judgment after ignoring His promise exposes the disorder in the home.",
      ]),
      phrase("Thy Maid Is In Thy Hand", [
        "Abram gives Sarai control over Hagar.",
        "Instead of leading the household toward repentance and care, he steps back.",
        "The phrase shows another failure of responsibility.",
        "Hagar remains vulnerable because powerful people are managing their own pain through her.",
      ]),
      phrase("Sarai Dealt Hardly With Her", [
        "Sarai treats Hagar harshly.",
        "Genesis does not hide the cruelty that comes from jealousy and fear.",
        "Hagar may have despised Sarai, but Sarai's response becomes oppressive.",
        "The promise family is already showing why it needs God's mercy.",
      ]),
      phrase("She Fled From Her Face", [
        "Hagar runs away from Sarai.",
        "This is the action of a desperate woman escaping mistreatment.",
        "The household plan has ended with a pregnant servant alone in the wilderness.",
        "The next scene matters because God meets the person everyone else has mishandled.",
      ]),
    ],
  },
  {
    chapter: 16,
    startVerse: 7,
    endVerse: 10,
    reference: "Genesis 16:7-10",
    title: "The Angel Of The LORD Finds Hagar",
    icon: "💧",
    phrases: [
      phrase("The Angel Of The LORD Found Her", [
        "Hagar is fleeing, but she is not unseen.",
        "The angel of the LORD finds her before she finds a safe future.",
        "That word found is tender and important.",
        "God moves toward the vulnerable woman outside the household of promise.",
      ]),
      phrase("By A Fountain Of Water In The Wilderness", [
        "Hagar is in the wilderness, but she is near water.",
        "The location feels lonely and dangerous, yet God meets her where life can still be sustained.",
        "Water in the wilderness becomes a mercy detail.",
        "God's care reaches into places that look abandoned.",
      ]),
      phrase("By The Fountain In The Way To Shur", [
        "The text gives a real travel location.",
        "Hagar may be heading back toward Egypt, the place connected with her background.",
        "She is caught between the painful household behind her and an uncertain road ahead.",
        "God interrupts that road with a personal word.",
      ]),
      phrase("Hagar, Sarai's Maid", [
        "The angel calls her by name and also names her position.",
        "God knows both who she is and what situation she is in.",
        "She is Hagar, not an object.",
        "She is also Sarai's maid, which means the conflict she fled is still part of the issue God addresses.",
      ]),
      phrase("Whence Camest Thou? And Whither Wilt Thou Go?", [
        "The questions ask where Hagar has come from and where she is going.",
        "God is drawing her story into the open.",
        "She has pain behind her and no clear future ahead of her.",
        "Good Bible study should feel this moment: God invites the runaway to speak truthfully.",
      ]),
      phrase("I Flee From The Face Of My Mistress Sarai", [
        "Hagar answers honestly.",
        "She is not wandering for adventure; she is fleeing mistreatment.",
        "The phrase keeps the emotional reality of the story clear.",
        "God's next words are not spoken to an imaginary problem, but to Hagar's real suffering.",
      ]),
      phrase("Return To Thy Mistress", [
        "This command is difficult to read because Hagar's situation has been painful.",
        "God sends her back, but not because her suffering is invisible.",
        "He sends her back with promise, identity, and assurance that He has heard her.",
        "The command belongs inside a larger word of care, not cold dismissal.",
      ]),
      phrase("Submit Thyself Under Her Hands", [
        "Hagar is told to return under Sarai's authority.",
        "The phrase does not excuse Sarai's harshness.",
        "It shows that God is guiding Hagar into a hard path with His promise over her future.",
        "The Bible often gives comfort without pretending obedience will be easy.",
      ]),
      phrase("I Will Multiply Thy Seed Exceedingly", [
        "God gives Hagar a promise about her descendants.",
        "This is stunning because Hagar is not the main covenant heir, yet God still speaks future over her child.",
        "Her life is not erased by Abram and Sarai's failure.",
        "The God who sees also gives hope beyond the present wound.",
      ]),
      phrase("That It Shall Not Be Numbered For Multitude", [
        "Hagar's descendants will become too many to count.",
        "This language sounds like abundance and future.",
        "God does not treat Hagar's child as disposable.",
        "Even outside the chosen covenant line, God sees, hears, and rules over generations.",
      ]),
    ],
  },
  {
    chapter: 16,
    startVerse: 11,
    endVerse: 12,
    reference: "Genesis 16:11-12",
    title: "Ishmael Is Named Before Birth",
    icon: "👶",
    phrases: [
      phrase("Thou Art With Child", [
        "God speaks directly about Hagar's pregnancy.",
        "The child inside her is known to God before birth.",
        "This matters because the people around Hagar have turned the pregnancy into conflict.",
        "God treats the child as a real life with a named future.",
      ]),
      phrase("Shalt Bear A Son", [
        "The angel tells Hagar she will give birth to a son.",
        "Her future is not only wilderness and fear.",
        "There will be birth, survival, and a continuing family line.",
        "God speaks certainty into a moment that feels unstable.",
      ]),
      phrase("Shalt Call His Name Ishmael", [
        "God gives the child's name before he is born.",
        "Ishmael means God hears.",
        "The name will forever carry the memory that God heard Hagar's affliction.",
        "This turns her pain into testimony.",
      ]),
      phrase("The LORD Hath Heard Thy Affliction", [
        "This is one of the most tender lines in the chapter.",
        "Affliction means Hagar's suffering, distress, and mistreatment.",
        "God does not only see the promise family from a distance.",
        "He hears the cry of the wounded person inside their broken choices.",
      ]),
      phrase("He Will Be A Wild Man", [
        "This describes Ishmael's future character and way of life.",
        "The wording points to independence, conflict, and untamed strength.",
        "It is not a neat, comfortable future.",
        "God tells the truth about the hard road ahead while still preserving Ishmael's life.",
      ]),
      phrase("His Hand Will Be Against Every Man", [
        "Ishmael's line will be marked by conflict.",
        "The child born from household strife will live in a world of strife.",
        "This does not mean he is outside God's knowledge.",
        "It shows that human attempts to force the promise can create long-lasting consequences.",
      ]),
      phrase("Every Man's Hand Against Him", [
        "The conflict will go both directions.",
        "Ishmael will struggle against others, and others will struggle against him.",
        "The phrase helps readers understand the painful future tied to this birth.",
        "God is honest about consequences, even while being merciful to Hagar.",
      ]),
      phrase("He Shall Dwell In The Presence Of All His Brethren", [
        "Ishmael will remain near his relatives, not vanish from the story.",
        "Presence here means his line will live in relation to the wider family, even with tension.",
        "Genesis is preparing readers for a complicated family future.",
        "God's promise to Isaac will not mean God forgets Ishmael.",
      ]),
    ],
  },
  {
    chapter: 16,
    startVerse: 13,
    endVerse: 16,
    reference: "Genesis 16:13-16",
    title: "Hagar Names The God Who Sees",
    icon: "👁️",
    phrases: [
      phrase("She Called The Name Of The LORD That Spake Unto Her", [
        "Hagar responds to God's word with worshipful naming.",
        "This is remarkable because she is an Egyptian servant woman in the wilderness.",
        "She has received a personal encounter with the LORD.",
        "The wounded outsider becomes a witness to God's seeing care.",
      ]),
      phrase("Thou God Seest Me", [
        "This is the heart of Hagar's testimony.",
        "She learns that God sees the person others have used, blamed, or mistreated.",
        "For a beginner, this phrase means God is not blind to hidden suffering.",
        "Hagar's life matters before Him.",
      ]),
      phrase("Have I Also Here Looked After Him That Seeth Me?", [
        "Hagar is amazed that she has encountered the God who sees her.",
        "The phrase carries wonder, surprise, and reverence.",
        "She did not expect the wilderness to become a place of divine attention.",
        "God turns her place of escape into a place of revelation.",
      ]),
      phrase("The Well Was Called Beerlahairoi", [
        "The well receives a name connected to Hagar's encounter.",
        "Beerlahairoi points to the living One who sees.",
        "A location becomes a memory marker.",
        "Every time the well is named, Hagar's testimony is remembered.",
      ]),
      phrase("Between Kadesh And Bered", [
        "Genesis anchors the encounter in geography.",
        "This was not a vague feeling or private idea only.",
        "The story happened in a place that could be named.",
        "God's care meets people in real locations, on real roads, in real distress.",
      ]),
      phrase("Hagar Bare Abram A Son", [
        "Hagar returns and gives birth to Abram's son.",
        "The child survives because God has seen and heard.",
        "The verse also keeps the family complexity in view.",
        "The son is real, but he is born out of a painful human shortcut.",
      ]),
      phrase("Abram Called His Son's Name, Which Hagar Bare, Ishmael", [
        "Abram names the child Ishmael, just as the angel had said.",
        "The name keeps God's message attached to the boy's identity.",
        "Every time Ishmael is named, the meaning whispers: God hears.",
        "This preserves Hagar's wilderness encounter inside the family story.",
      ]),
      phrase("Abram Was Fourscore And Six Years Old", [
        "Abram is eighty-six years old when Ishmael is born.",
        "The detail helps readers track the long wait for the promised child.",
        "Years are passing, but God's covenant promise is not yet fulfilled through Isaac.",
        "Genesis is teaching patience by making us feel the timeline.",
      ]),
      phrase("When Hagar Bare Ishmael To Abram", [
        "The chapter closes by tying Ishmael's birth to Abram and Hagar.",
        "Sarai's plan produced a son, but not the covenant son God will later name.",
        "This ending leaves tension in the story.",
        "Human effort has produced a real child and real consequences, while God's promise still waits.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 17:1-4",
    title: "God Renews The Covenant With Abram",
    icon: "📜",
    phrases: [
      phrase("Abram Was Ninety Years Old And Nine", [
        "Abram is now ninety-nine years old.",
        "Many years have passed since Ishmael's birth.",
        "The age detail makes the promise feel even more impossible from a human viewpoint.",
        "God often lets the story reach the end of human strength before showing His power.",
      ]),
      phrase("The LORD Appeared To Abram", [
        "God takes the initiative again.",
        "Abram does not restart the covenant story by his own effort.",
        "The LORD appears and speaks into the long waiting season.",
        "Promise continues because God is faithful, not because Abram has managed everything well.",
      ]),
      phrase("I Am The Almighty God", [
        "God introduces Himself as Almighty God.",
        "That title matters because Abram's body, Sarai's barrenness, and their ages all look impossible.",
        "The promise depends on God's power.",
        "Before God gives commands, He reminds Abram who is speaking.",
      ]),
      phrase("Walk Before Me", [
        "God calls Abram to live his whole life before Him.",
        "This means daily faithfulness under God's eye, not occasional religious moments.",
        "Abram must not live by fear, shortcuts, or divided trust.",
        "The God who sees Hagar also sees Abram's walk.",
      ]),
      phrase("Be Thou Perfect", [
        "Perfect here carries the idea of wholeness, integrity, and complete devotion.",
        "God is not asking Abram to pretend he has never failed.",
        "He is calling him to an undivided covenant life.",
        "After Genesis 16, the call is clear: no more forcing the promise through crooked trust.",
      ]),
      phrase("I Will Make My Covenant Between Me And Thee", [
        "God again speaks covenant language.",
        "A covenant is a serious promise relationship, not a casual agreement.",
        "The bond is between God and Abram, anchored in God's word.",
        "This chapter will give the covenant a sign in circumcision.",
      ]),
      phrase("Will Multiply Thee Exceedingly", [
        "God repeats the promise of abundant offspring.",
        "Abram is old, but God's word is not weak.",
        "Exceedingly means the promise is larger than Abram could produce or count.",
        "The future family will come by divine faithfulness.",
      ]),
      phrase("Abram Fell On His Face", [
        "Abram responds with reverence and humility.",
        "Falling on his face shows that he knows he is standing before God.",
        "The covenant promise does not make Abram casual.",
        "God's grace leads him low in worship.",
      ]),
      phrase("My Covenant Is With Thee", [
        "God makes the promise personal.",
        "The covenant is not an abstract idea floating above Abram's life.",
        "It is with him, spoken to him, and shaping his future.",
        "God binds His promise to a real person in history.",
      ]),
      phrase("Thou Shalt Be A Father Of Many Nations", [
        "Abram's future is bigger than one household.",
        "God promises nations from him.",
        "This widens the promise beyond Abram's immediate family problem.",
        "The blessing plan is moving toward peoples, kings, and eventually all families of the earth.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 5,
    endVerse: 8,
    reference: "Genesis 17:5-8",
    title: "Abram Becomes Abraham",
    icon: "✨",
    phrases: [
      phrase("Neither Shall Thy Name Any More Be Called Abram", [
        "God closes the old name as the covenant promise expands.",
        "Names in Scripture often carry identity and calling.",
        "Abram has lived under promise for years, but now God marks him with a new name.",
        "His identity must match what God is making him, not only what he has been.",
      ]),
      phrase("Thy Name Shall Be Abraham", [
        "God renames Abram as Abraham.",
        "The new name is tied to fatherhood and nations.",
        "Abraham still does not have Isaac yet, but God names him according to the promise.",
        "God's word gives identity before the visible evidence arrives.",
      ]),
      phrase("A Father Of Many Nations Have I Made Thee", [
        "God speaks as if the future is already secured.",
        "Abraham is not merely hoping to become something by chance.",
        "God says He has made him a father of many nations.",
        "The certainty rests on God's power, not Abraham's age.",
      ]),
      phrase("I Will Make Thee Exceeding Fruitful", [
        "Fruitfulness answers the barrenness and waiting in the story.",
        "God promises life, growth, and multiplication.",
        "This is not Abraham forcing fruit through Hagar anymore.",
        "This is God pledging fruitfulness by covenant grace.",
      ]),
      phrase("I Will Make Nations Of Thee", [
        "The promise spreads from a son to nations.",
        "God's covenant plan is larger than Abraham's immediate longing.",
        "Through this family, entire peoples will enter the Bible's story.",
        "God is building history out of one impossible promise.",
      ]),
      phrase("Kings Shall Come Out Of Thee", [
        "God promises royal descendants from Abraham.",
        "This points forward to Israel's kings and ultimately to the greater King in the biblical story.",
        "The old childless man is being promised a royal future.",
        "God sees generations Abraham cannot yet imagine.",
      ]),
      phrase("I Will Establish My Covenant", [
        "Establish means God will set the covenant firmly in place.",
        "The promise will continue beyond Abraham himself.",
        "God is not making a temporary arrangement.",
        "He is anchoring a multi-generation covenant story.",
      ]),
      phrase("An Everlasting Covenant", [
        "The covenant is described as everlasting.",
        "That means the promise reaches beyond one season or one crisis.",
        "Abraham's family will carry God's covenant purposes through generations.",
        "The word gives weight and permanence to the promise.",
      ]),
      phrase("To Be A God Unto Thee", [
        "This is the heart of the covenant.",
        "God does not only promise land, descendants, and kings.",
        "He promises Himself.",
        "The greatest covenant gift is belonging to the LORD.",
      ]),
      phrase("All The Land Of Canaan", [
        "The land promise becomes specific again.",
        "Canaan is the place where Abraham is currently a stranger.",
        "God promises that the land of wandering will become the land of inheritance.",
        "The covenant includes real geography, not only private spirituality.",
      ]),
      phrase("An Everlasting Possession", [
        "God speaks of the land as a lasting inheritance.",
        "Abraham does not yet own it, but God's promise gives it future certainty.",
        "The phrase helps readers see why Canaan matters so much later in the Bible.",
        "The land is tied to God's covenant faithfulness.",
      ]),
      phrase("I Will Be Their God", [
        "God extends the covenant promise to Abraham's seed after him.",
        "This is personal relationship language.",
        "The promise is not just that Abraham will have descendants, but that God will claim them as His people.",
        "The Bible's covenant story keeps returning to this heartbeat: I will be their God.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 9,
    endVerse: 14,
    reference: "Genesis 17:9-14",
    title: "Circumcision Becomes The Covenant Sign",
    icon: "🔖",
    phrases: [
      phrase("Thou Shalt Keep My Covenant", [
        "God's covenant promise calls for covenant obedience.",
        "Abraham is not earning the promise, but he is called to keep it faithfully.",
        "The relationship has responsibilities.",
        "Grace does not make obedience optional.",
      ]),
      phrase("Thy Seed After Thee In Their Generations", [
        "The command reaches Abraham's descendants.",
        "The covenant sign will mark the family line generation after generation.",
        "God is building a people, not only blessing one man privately.",
        "This phrase helps readers see why family and generations matter in Genesis.",
      ]),
      phrase("Every Man Child Among You Shall Be Circumcised", [
        "Circumcision becomes the visible sign for the males in Abraham's household.",
        "It marked the covenant people in their bodies.",
        "This was not merely a private belief in the heart.",
        "God gave Abraham's family a physical sign that they belonged to His covenant.",
      ]),
      phrase("Circumcise The Flesh Of Your Foreskin", [
        "The command is specific and physical.",
        "The covenant sign touches the part of the body connected to future offspring.",
        "That matters because the promise is about seed, generations, and family line.",
        "The sign points to God's claim over the future of Abraham's house.",
      ]),
      phrase("A Token Of The Covenant Betwixt Me And You", [
        "Token means sign.",
        "Circumcision is not the covenant itself; it is the sign of the covenant.",
        "It visibly marks the relationship between God and Abraham's household.",
        "The sign helps the people remember who they belong to.",
      ]),
      phrase("Eight Days Old", [
        "The sign is given to baby boys at eight days old.",
        "This means the covenant identity begins before the child can understand or perform anything.",
        "The family receives the child under God's covenant claim.",
        "Grace surrounds the child before personal achievement enters the story.",
      ]),
      phrase("Born In The House", [
        "The covenant sign includes males born inside Abraham's household.",
        "The household is larger than the immediate nuclear family.",
        "Servants and household members are drawn under the covenant sign.",
        "God's dealings with Abraham affect everyone under his care.",
      ]),
      phrase("Bought With Money Of Any Stranger", [
        "Even males brought into the household from outside must receive the sign.",
        "The covenant mark is not limited to bloodline only inside the household structure.",
        "If someone belongs to Abraham's house, the sign applies.",
        "This shows the covenant shaping the whole community around Abraham.",
      ]),
      phrase("My Covenant Shall Be In Your Flesh", [
        "The covenant sign is carried in the body.",
        "God wanted Abraham's family to remember the promise in a visible, physical way.",
        "Faith was not meant to stay abstract.",
        "Their bodies would bear a reminder of God's claim and promise.",
      ]),
      phrase("An Everlasting Covenant", [
        "God repeats the lasting nature of the covenant.",
        "The sign belongs to a promise that reaches through generations.",
        "This repetition slows the reader down.",
        "God is making clear that His covenant is not temporary or casual.",
      ]),
      phrase("That Soul Shall Be Cut Off From His People", [
        "Rejecting the covenant sign carried serious consequences.",
        "To be cut off means being removed from the covenant community.",
        "The sign was not optional decoration.",
        "Refusing it meant refusing the covenant identity God had given.",
      ]),
      phrase("He Hath Broken My Covenant", [
        "The issue is covenant-breaking.",
        "God treats refusal of the sign as rejection of His command.",
        "This helps readers understand the seriousness of covenant membership.",
        "The promise is gracious, but it is also holy.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 15,
    endVerse: 19,
    reference: "Genesis 17:15-19",
    title: "Sarai Becomes Sarah",
    icon: "👑",
    phrases: [
      phrase("Thou Shalt Not Call Her Name Sarai", [
        "God now addresses Sarai's identity too.",
        "The covenant promise is not only about Abraham.",
        "The woman who was barren and wounded in Genesis 16 is brought directly into God's word.",
        "God refuses to let Sarah be treated as a side note to the promise.",
      ]),
      phrase("Sarah Shall Her Name Be", [
        "God gives Sarai the name Sarah.",
        "The new name marks her place in the covenant future.",
        "She is not replaced by Hagar and not erased by years of barrenness.",
        "God names her according to what He will do.",
      ]),
      phrase("I Will Bless Her", [
        "God speaks blessing over Sarah personally.",
        "This matters after the pain of infertility and the broken plan with Hagar.",
        "Sarah's future rests on God's blessing, not on her ability to fix the delay.",
        "The promise will come through God's mercy to her.",
      ]),
      phrase("Give Thee A Son Also Of Her", [
        "God makes the promise unmistakable.",
        "The covenant son will come through Sarah herself.",
        "This corrects the idea that Ishmael can simply replace the promised child.",
        "God's promise will be fulfilled through the woman who seemed unable to bear.",
      ]),
      phrase("She Shall Be A Mother Of Nations", [
        "Sarah's future is larger than one child.",
        "God gives her a role in the nations promise.",
        "The barren woman will become a mother in the covenant story.",
        "This phrase restores dignity and destiny to Sarah.",
      ]),
      phrase("Kings Of People Shall Be Of Her", [
        "Royal descendants will come through Sarah.",
        "This connects her directly to the kingly promise given to Abraham.",
        "God's plan does not treat her as merely useful for childbirth.",
        "She is named as part of the royal covenant future.",
      ]),
      phrase("Abraham Fell Upon His Face, And Laughed", [
        "Abraham's laughter shows how impossible the promise feels.",
        "He is reverent, but he is also stunned.",
        "Genesis lets us see the mixture of worship and weakness in his response.",
        "God's promise can be true even when His people struggle to imagine it.",
      ]),
      phrase("Said In His Heart", [
        "Abraham's question happens inwardly.",
        "God knows the thoughts that never become public speech.",
        "The phrase reminds readers that faith struggles can happen inside the heart.",
        "God answers Abraham's hidden doubt with a clearer promise.",
      ]),
      phrase("Shall A Child Be Born Unto Him That Is An Hundred Years Old?", [
        "Abraham is thinking about the impossibility of his age.",
        "A hundred-year-old father sounds impossible naturally.",
        "That is exactly why the promise must be understood as God's work.",
        "The covenant child will be a miracle, not a human achievement.",
      ]),
      phrase("Shall Sarah, That Is Ninety Years Old, Bear?", [
        "Abraham also thinks about Sarah's age.",
        "The promise seems impossible from both sides of the marriage.",
        "Genesis makes the impossibility plain so God's power will be plain too.",
        "Sarah's barrenness and age are not stronger than the Almighty God.",
      ]),
      phrase("O That Ishmael Might Live Before Thee", [
        "Abraham loves Ishmael and asks God to bless him.",
        "He may also be struggling to understand why God is promising another son.",
        "The request is heartfelt, but it does not redefine the covenant plan.",
        "God will bless Ishmael, but the covenant line will come through Isaac.",
      ]),
      phrase("Sarah Thy Wife Shall Bear Thee A Son Indeed", [
        "God answers Abraham with clarity.",
        "Indeed means this will really happen.",
        "The covenant child will come through Sarah, not through another workaround.",
        "God's promise stands over every impossibility Abraham can name.",
      ]),
      phrase("Thou Shalt Call His Name Isaac", [
        "God names the promised son before birth.",
        "Isaac is connected to laughter, which fits Abraham's response and later Sarah's joy.",
        "The name will carry the memory of impossibility turned into promise.",
        "God turns doubtful laughter into covenant testimony.",
      ]),
      phrase("I Will Establish My Covenant With Him", [
        "Isaac is named as the covenant son.",
        "This does not mean Ishmael is unloved or unseen.",
        "It means God's covenant line will continue through the child He promised through Sarah.",
        "The promise is specific, not vague.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 20,
    endVerse: 22,
    reference: "Genesis 17:20-22",
    title: "God Blesses Ishmael But Establishes Isaac",
    icon: "🌿",
    phrases: [
      phrase("As For Ishmael", [
        "God answers Abraham's concern for Ishmael directly.",
        "Ishmael is not ignored when Isaac is promised.",
        "The phrase shows that God can distinguish blessing from covenant line without forgetting either person.",
        "God's care is more precise than human favoritism.",
      ]),
      phrase("I Have Heard Thee", [
        "God hears Abraham's prayer for Ishmael.",
        "This also echoes Ishmael's name, which means God hears.",
        "The family story keeps circling back to God's hearing mercy.",
        "God heard Hagar's affliction, and now He hears Abraham's request.",
      ]),
      phrase("I Have Blessed Him", [
        "God promises blessing for Ishmael.",
        "Ishmael will not carry the covenant line through Isaac, but he is still under God's providential care.",
        "This helps readers avoid thinking the Bible treats him as worthless.",
        "God's chosen plan does not cancel His compassion.",
      ]),
      phrase("Will Make Him Fruitful", [
        "Ishmael will have descendants and a future.",
        "Fruitfulness is God's gift, not only Abraham's achievement.",
        "This blessing fulfills what God had already spoken to Hagar.",
        "The LORD keeps His word to the vulnerable and to their children.",
      ]),
      phrase("Will Multiply Him Exceedingly", [
        "The language is abundant.",
        "Ishmael's line will grow greatly.",
        "God is generous even while keeping the covenant line specific.",
        "The reader should see both mercy and distinction in the same promise.",
      ]),
      phrase("Twelve Princes Shall He Beget", [
        "Ishmael will father twelve princes.",
        "This points to organized peoples and leadership from his line.",
        "His future is not small or forgotten.",
        "God gives him a real place in the nations story.",
      ]),
      phrase("I Will Make Him A Great Nation", [
        "God promises national greatness to Ishmael.",
        "This fulfills the earlier word that his descendants would be numerous.",
        "The phrase shows God's faithfulness outside the Isaac covenant line too.",
        "Ishmael receives blessing, even though Isaac receives the covenant establishment.",
      ]),
      phrase("My Covenant Will I Establish With Isaac", [
        "God makes the distinction clear.",
        "Ishmael will be blessed, but Isaac will carry the covenant promise.",
        "This is not based on human strength, age, or convenience.",
        "It is God's chosen way of fulfilling what He promised through Sarah.",
      ]),
      phrase("At This Set Time In The Next Year", [
        "God gives a specific time marker.",
        "After years of waiting, the promise now has a near appointment.",
        "The phrase helps readers feel the movement from delay to fulfillment.",
        "God's timing may feel slow, but it is never vague to Him.",
      ]),
      phrase("God Went Up From Abraham", [
        "The conversation ends with God's departure.",
        "Abraham has received command, promise, names, sign, and timing.",
        "Now the covenant word must be obeyed.",
        "Revelation moves toward response.",
      ]),
    ],
  },
  {
    chapter: 17,
    startVerse: 23,
    endVerse: 27,
    reference: "Genesis 17:23-27",
    title: "Abraham Obeys In The Selfsame Day",
    icon: "✅",
    phrases: [
      phrase("Abraham Took Ishmael His Son", [
        "Abraham begins obedience with his own son.",
        "Ishmael is included in the covenant sign given to Abraham's household.",
        "This matters because God had just spoken blessing over Ishmael too.",
        "The whole household is being brought under the sign of God's covenant command.",
      ]),
      phrase("All That Were Born In His House", [
        "The command reaches everyone born inside Abraham's household.",
        "His obedience is not private or symbolic only.",
        "The covenant reshapes the entire community under his care.",
        "Leadership means bringing the household under God's word.",
      ]),
      phrase("All That Were Bought With His Money", [
        "Those brought into the household from outside are included too.",
        "The covenant sign applies to the full household structure described by God.",
        "This shows Abraham obeying the command in detail.",
        "No group under his authority is left out of the response.",
      ]),
      phrase("Every Male Among The Men Of Abraham's House", [
        "The obedience is complete.",
        "Every male in Abraham's house receives the sign.",
        "The phrase mirrors God's earlier command and shows Abraham following it fully.",
        "Covenant faith responds with careful obedience.",
      ]),
      phrase("Circumcised The Flesh Of Their Foreskin", [
        "Abraham carries out the physical sign God commanded.",
        "This is not merely agreement in thought.",
        "He obeys in action, in the exact matter God named.",
        "The promise is received by faith, and faith shows itself in obedience.",
      ]),
      phrase("In The Selfsame Day", [
        "Abraham obeys on the very same day God speaks.",
        "He does not delay, negotiate, or wait for the command to feel easier.",
        "This phrase is one of the strongest obedience markers in the chapter.",
        "When God's word is clear, Abraham moves.",
      ]),
      phrase("As God Had Said Unto Him", [
        "Abraham's action matches God's instruction.",
        "This is the kind of alignment Bible Buddy notes should help readers notice: word and response fit together.",
        "He does not invent a different sign or partial obedience.",
        "He does what God said.",
      ]),
      phrase("Abraham Was Ninety Years Old And Nine", [
        "The text repeats Abraham's age.",
        "Obedience is not only for the young or for easy seasons.",
        "At ninety-nine, Abraham receives a new name, a covenant sign, and a command to obey.",
        "God can call people into fresh obedience late in life.",
      ]),
      phrase("Ishmael His Son Was Thirteen Years Old", [
        "Ishmael's age is also recorded.",
        "He is old enough to be clearly marked in the story, not hidden in the background.",
        "The detail helps readers track both family lines.",
        "Isaac is not born yet, but Ishmael is already living under Abraham's household sign.",
      ]),
      phrase("In The Selfsame Day Was Abraham Circumcised, And Ishmael His Son", [
        "The phrase repeats the immediacy of obedience.",
        "Abraham does not only command others to obey while avoiding the sign himself.",
        "He and Ishmael both receive it that day.",
        "True covenant leadership begins with personal obedience.",
      ]),
      phrase("All The Men Of His House", [
        "The final verse widens the view to the whole household again.",
        "Genesis wants readers to see the complete scope of Abraham's response.",
        "The covenant sign now marks the community connected to him.",
        "God's promise is moving from one man into a people.",
      ]),
      phrase("Were Circumcised With Him", [
        "Abraham does not obey alone.",
        "His household participates with him in the covenant sign.",
        "The phrase closes the chapter with unity under God's command.",
        "The promise family is now visibly marked as belonging to the covenant LORD.",
      ]),
    ],
  },
];

const DAY_8_QUALITY_REVIEW_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 18,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 18:1-8",
    title: "Abraham Welcomes The Visitors",
    icon: "🏕️",
    phrases: [
      phrase("The LORD Appeared Unto Him", [
        "Genesis tells us from the start that this visit is not ordinary.",
        "The LORD is coming near to Abraham in a personal way.",
        "Before the promise of Isaac is repeated, God draws close.",
        "The scene teaches that covenant faith is built on God's presence, not only on information.",
      ]),
      phrase("In The Plains Of Mamre", [
        "Mamre is the place where Abraham has lived, worshiped, and built an altar.",
        "God meets him in the ordinary place of his life.",
        "The promise story is not floating above real geography.",
        "It is unfolding in tents, trees, meals, roads, and named places.",
      ]),
      phrase("He Sat In The Tent Door", [
        "Abraham is sitting at the entrance of his tent.",
        "This shows him as a sojourner, still living in temporary shelter.",
        "He has God's promise, but he has not yet settled into full possession.",
        "Faith often waits in a tent while holding a promise from God.",
      ]),
      phrase("Three Men Stood By Him", [
        "The visitors appear suddenly near Abraham.",
        "Genesis lets the reader feel the mystery of the moment.",
        "Abraham sees men, but the chapter will show that this visit carries the voice and presence of the LORD.",
        "The ordinary appearance hides holy significance.",
      ]),
      phrase("He Ran To Meet Them", [
        "Abraham responds with urgency and honor.",
        "In the heat of the day, running to guests shows eager hospitality.",
        "He does not treat the visitors as interruptions.",
        "He receives them as people worthy of attention and care.",
      ]),
      phrase("Bowed Himself Toward The Ground", [
        "Abraham's posture shows humility and respect.",
        "Bowing was a common way to honor important guests.",
        "Here it also fits the sacred weight of the encounter.",
        "Abraham welcomes with his body before he speaks with his mouth.",
      ]),
      phrase("If Now I Have Found Favour In Thy Sight", [
        "Abraham speaks like a servant asking permission to serve.",
        "Favour means kindness, acceptance, or gracious regard.",
        "He is not demanding honor from the visitors.",
        "He humbly asks them to receive his hospitality.",
      ]),
      phrase("Wash Your Feet", [
        "Foot washing was practical hospitality in a dusty land.",
        "Travelers walked in sandals, and rest began with cleansing the feet.",
        "This small act shows care for real human weariness.",
        "Bible hospitality is not vague warmth; it notices actual needs.",
      ]),
      phrase("Comfort Ye Your Hearts", [
        "Abraham offers food as refreshment for the whole person.",
        "In Scripture, the heart can refer to inner strength, courage, and life.",
        "He wants the visitors restored before they continue their journey.",
        "A simple meal becomes part of sacred welcome.",
      ]),
      phrase("Abraham Hastened", [
        "Abraham moves quickly to serve.",
        "The repeated hurry in this scene shows eagerness, not annoyance.",
        "He gives generous attention to the visitors.",
        "Hospitality here is active, thoughtful, and costly.",
      ]),
      phrase("Make Ready Quickly Three Measures Of Fine Meal", [
        "Sarah is asked to prepare a generous amount of fine flour.",
        "This is not a bare-minimum snack.",
        "The household gives the best they can offer.",
        "The scene shows Abraham and Sarah working together in costly hospitality.",
      ]),
      phrase("A Calf Tender And Good", [
        "Abraham chooses a good calf for the meal.",
        "Meat was not casual everyday food for many households.",
        "This detail shows honor and generosity.",
        "The visitors receive a feast, not leftovers.",
      ]),
      phrase("He Stood By Them Under The Tree", [
        "Abraham stands nearby as a servant while the visitors eat.",
        "The promised patriarch does not act too important to serve.",
        "His greatness is shown through humility.",
        "Genesis lets hospitality become a window into faithful character.",
      ]),
    ],
  },
  {
    chapter: 18,
    startVerse: 9,
    endVerse: 15,
    reference: "Genesis 18:9-15",
    title: "Sarah Hears The Promise",
    icon: "👂",
    phrases: [
      phrase("Where Is Sarah Thy Wife?", [
        "The visitors ask for Sarah by name.",
        "This matters because the promise is not only about Abraham.",
        "Sarah must hear that she is personally included in what God will do.",
        "The question brings her from the background into the promise conversation.",
      ]),
      phrase("I Will Certainly Return Unto Thee", [
        "The promise now comes with certainty and timing.",
        "God is no longer speaking only in broad future language.",
        "He gives Abraham a definite word that the promised birth is near.",
        "Waiting is moving toward fulfillment.",
      ]),
      phrase("According To The Time Of Life", [
        "This phrase points to the appointed time connected with birth.",
        "God is speaking about real life coming into Sarah's body.",
        "The promise is not symbolic only.",
        "A real child will be born at God's appointed time.",
      ]),
      phrase("Sarah Thy Wife Shall Have A Son", [
        "This is the key promise of the scene.",
        "Sarah herself will have the son.",
        "God removes any confusion after the Hagar and Ishmael story.",
        "The covenant child will come through Sarah, just as God said.",
      ]),
      phrase("Sarah Heard It In The Tent Door", [
        "Sarah hears the promise from inside the tent.",
        "She is close enough to listen, even if she is not standing in front of the visitors.",
        "The word of promise reaches her where she is.",
        "God's promise is meant for her ears too.",
      ]),
      phrase("Old And Well Stricken In Age", [
        "Genesis makes the impossibility plain.",
        "Abraham and Sarah are both far beyond normal childbearing years.",
        "The Bible does not pretend the promise looks easy.",
        "The point is that God's power is greater than human limits.",
      ]),
      phrase("Sarah Laughed Within Herself", [
        "Sarah's laugh happens inside her.",
        "It is not public mockery; it is the inward reaction of someone hearing what seems impossible.",
        "Genesis is honest about the gap between God's promise and human imagination.",
        "God can hear even the laugh that stays hidden.",
      ]),
      phrase("After I Am Waxed Old Shall I Have Pleasure", [
        "Sarah is thinking about her age and physical condition.",
        "Pleasure here points toward the joy and intimacy connected with having a child.",
        "Her question is deeply human.",
        "She is measuring the promise by what her body says is possible.",
      ]),
      phrase("Wherefore Did Sarah Laugh", [
        "The LORD exposes Sarah's hidden laughter.",
        "This is not to crush her, but to confront unbelief with truth.",
        "God knows the inner response behind polite silence.",
        "His promise is personal enough to address the heart.",
      ]),
      phrase("Is Any Thing Too Hard For The LORD?", [
        "This is the theological center of the section.",
        "The issue is not whether Sarah is too old.",
        "The issue is whether anything is beyond the LORD's power.",
        "The question teaches beginners how to read the impossible promise: start with God, not with human limits.",
      ]),
      phrase("At The Time Appointed", [
        "God has an appointed time for the promise.",
        "The delay has not been random.",
        "Sarah and Abraham could not control the timing, but God has never lost track of it.",
        "The promise will arrive on God's calendar.",
      ]),
      phrase("She Was Afraid", [
        "Sarah denies laughing because fear rises in her.",
        "Being exposed by God can feel frightening.",
        "Yet God is drawing her into truth, not abandoning her.",
        "The same woman who laughs in fear will later laugh with joy when Isaac is born.",
      ]),
    ],
  },
  {
    chapter: 18,
    startVerse: 16,
    endVerse: 22,
    reference: "Genesis 18:16-22",
    title: "The LORD Reveals Sodom's Judgment",
    icon: "⚖️",
    phrases: [
      phrase("Looked Toward Sodom", [
        "The scene turns from promise to judgment.",
        "Sodom has already been connected with wickedness and danger in Genesis.",
        "Now the visitors look toward the city directly.",
        "The Bible moves from Abraham's tent to the moral crisis of the plain.",
      ]),
      phrase("Shall I Hide From Abraham That Thing Which I Do", [
        "God chooses to reveal His purposes to Abraham.",
        "This shows Abraham's role as covenant partner and future teacher of his household.",
        "God is not asking Abraham for permission.",
        "He is drawing Abraham into understanding His justice.",
      ]),
      phrase("Abraham Shall Surely Become A Great And Mighty Nation", [
        "God repeats Abraham's future while preparing to discuss judgment.",
        "The covenant promise is not only about family size.",
        "A great nation must learn the difference between righteousness and wickedness.",
        "Abraham's future people must understand God's ways.",
      ]),
      phrase("All The Nations Of The Earth Shall Be Blessed In Him", [
        "Abraham's calling is global in scope.",
        "God's blessing through him is meant to reach the nations.",
        "That makes the Sodom scene more serious, because Abraham's family must become a witness of righteousness.",
        "Blessing and justice belong together in the covenant story.",
      ]),
      phrase("He Will Command His Children And His Household After Him", [
        "God expects Abraham to teach his household.",
        "Faith is meant to be passed forward through instruction and example.",
        "The promise family must not only receive blessing; they must learn God's way.",
        "This phrase is a major parenting and discipleship verse in Genesis.",
      ]),
      phrase("Keep The Way Of The LORD", [
        "The way of the LORD is a pattern of life shaped by God's character.",
        "Abraham's descendants are called to walk differently from violent, corrupt cities.",
        "Faith is not only believing promises.",
        "It is learning the LORD's way.",
      ]),
      phrase("To Do Justice And Judgment", [
        "Justice and judgment describe right action and fair moral order.",
        "This is the opposite of Sodom's violence and abuse.",
        "God's people are supposed to reflect God's concern for what is right.",
        "The phrase shows that covenant life has ethical weight.",
      ]),
      phrase("The Cry Of Sodom And Gomorrah Is Great", [
        "A cry in Scripture often means the outcry of suffering, violence, or injustice.",
        "Sodom's sin has produced a cry that reaches God.",
        "The city is not judged because of rumor or irritation.",
        "Its evil has become loud before the LORD.",
      ]),
      phrase("Their Sin Is Very Grievous", [
        "God names the seriousness of Sodom's sin.",
        "Grievous means heavy, severe, and deeply wrong.",
        "Genesis prepares readers to understand the coming judgment as moral, not random.",
        "God sees the weight of evil clearly.",
      ]),
      phrase("I Will Go Down Now, And See", [
        "God speaks in a way that shows careful judgment.",
        "He is not reckless, impulsive, or uninformed.",
        "The language helps human readers understand that divine judgment is examined and just.",
        "God does not punish without perfect knowledge.",
      ]),
      phrase("Abraham Stood Yet Before The LORD", [
        "The men turn toward Sodom, but Abraham remains before the LORD.",
        "This sets up Abraham's intercession.",
        "He is about to plead from the place of relationship with God.",
        "The covenant man learns to care about mercy and justice together.",
      ]),
    ],
  },
  {
    chapter: 18,
    startVerse: 23,
    endVerse: 28,
    reference: "Genesis 18:23-28",
    title: "Abraham Asks About Justice And Mercy",
    icon: "🙏",
    phrases: [
      phrase("Abraham Drew Near", [
        "Abraham approaches the LORD with reverence and courage.",
        "Drawing near is the posture of intercession.",
        "He does not run from the judgment conversation.",
        "He steps closer to ask how God's justice will work.",
      ]),
      phrase("Wilt Thou Also Destroy The Righteous With The Wicked?", [
        "Abraham's question focuses on God's justice.",
        "He is asking whether the righteous will be swept away with the wicked.",
        "This is not Abraham being more merciful than God.",
        "It is Abraham learning to reason from God's righteous character.",
      ]),
      phrase("Fifty Righteous Within The City", [
        "Abraham begins with fifty righteous people.",
        "He is searching for mercy inside judgment.",
        "The number matters because he is asking whether a righteous remnant could spare the city.",
        "Intercession looks for reasons mercy might triumph.",
      ]),
      phrase("That Be Far From Thee", [
        "Abraham appeals to what would be unthinkable for God.",
        "He knows the LORD cannot act unjustly.",
        "This phrase is bold, but it is rooted in reverence.",
        "True prayer can speak honestly because it trusts God's character.",
      ]),
      phrase("Shall Not The Judge Of All The Earth Do Right?", [
        "This is one of Genesis's great statements about God.",
        "The LORD is Judge of all the earth, not only one tribe or location.",
        "Abraham anchors his prayer in God's righteousness.",
        "God's judgment must always be right because God Himself is right.",
      ]),
      phrase("I Will Spare All The Place For Their Sakes", [
        "God answers with mercy.",
        "If fifty righteous are found, He will spare the whole place for their sake.",
        "This shows that God is not eager to destroy.",
        "He is willing to spare many because of a righteous few.",
      ]),
      phrase("I Am But Dust And Ashes", [
        "Abraham remembers his smallness before God.",
        "Dust and ashes describe humility, frailty, and mortality.",
        "His bold prayer is not proud.",
        "He pleads while knowing he stands before the holy Judge.",
      ]),
      phrase("Peradventure There Shall Lack Five", [
        "Abraham lowers the number from fifty to forty-five.",
        "He is carefully asking whether mercy would still be shown if the righteous number is slightly smaller.",
        "The question reveals his desire for the city to be spared if any righteous remnant is there.",
        "His intercession is bold, but still humble.",
      ]),
      phrase("If I Find There Forty And Five, I Will Not Destroy It", [
        "God answers Abraham's second request with mercy.",
        "Even forty-five righteous people would be enough for the city to be spared.",
        "This shows again that God is not looking for an excuse to destroy.",
        "The problem will be Sodom's lack of righteousness, not God's lack of compassion.",
      ]),
    ],
  },
  {
    chapter: 18,
    startVerse: 29,
    endVerse: 33,
    reference: "Genesis 18:29-33",
    title: "Abraham Pleads Down To Ten",
    icon: "🙏",
    phrases: [
      phrase("Peradventure There Shall Be Forty Found There", [
        "Abraham continues pleading for Sodom.",
        "He moves from forty-five to forty.",
        "The repeated pattern shows patient intercession before God.",
        "Abraham is learning the wideness of God's mercy without forgetting God's justice.",
      ]),
      phrase("I Will Not Destroy It", [
        "God again says He will not destroy the city if the righteous are found.",
        "The repetition matters.",
        "God's answer keeps showing restraint and willingness to spare.",
        "Judgment will not fall because mercy was unavailable.",
      ]),
      phrase("Oh Let Not The Lord Be Angry", [
        "Abraham knows he is asking boldly.",
        "His words show reverence and caution.",
        "He is persistent, but not casual.",
        "This teaches a humble way to bring hard questions before God.",
      ]),
      phrase("Peradventure There Shall Thirty Be Found There", [
        "Abraham lowers the number again to thirty.",
        "He keeps searching for a reason the city might be spared.",
        "This is not cold math.",
        "It is a prayerful search for mercy inside a terrible judgment scene.",
      ]),
      phrase("I Will Not Do It, If I Find Thirty There", [
        "God agrees again.",
        "Thirty righteous people would be enough for the city to be spared.",
        "The LORD's patience in the conversation is striking.",
        "He lets Abraham ask and answers each request with clarity.",
      ]),
      phrase("Peradventure There Shall Be Twenty Found There", [
        "Abraham asks about twenty righteous people.",
        "The number is getting very small for an entire city.",
        "The question makes Sodom's condition feel more serious.",
        "If even twenty cannot be found, the city's corruption is deep.",
      ]),
      phrase("I Will Not Destroy It For Twenty's Sake", [
        "God would spare the city for twenty righteous people.",
        "This reveals the value God places on righteousness.",
        "A small righteous presence can matter greatly before Him.",
        "The coming judgment will show that Sodom does not even meet this small measure.",
      ]),
      phrase("I Will Speak Yet But This Once", [
        "Abraham prepares to ask one final time.",
        "His words show humility and awareness that he is standing before the Lord.",
        "He is persistent, but he does not treat God casually.",
        "This is reverent boldness.",
      ]),
      phrase("Peradventure Ten Shall Be Found There", [
        "Abraham finally asks about ten righteous people.",
        "The number is small, but God still agrees to spare for ten.",
        "This makes the moral condition of Sodom stand out sharply.",
        "If even ten cannot be found, the judgment is shown to be just.",
      ]),
      phrase("The LORD Went His Way", [
        "The conversation ends when the LORD finishes speaking with Abraham.",
        "Abraham has pleaded, and God has revealed His justice and mercy.",
        "The next chapter will show the truth about Sodom.",
        "Prayer has not changed God's character; it has revealed it.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 19:1-3",
    title: "Lot Receives The Angels",
    icon: "🌆",
    phrases: [
      phrase("There Came Two Angels To Sodom At Even", [
        "The visitors now arrive in Sodom at evening.",
        "Genesis 18 looked toward the city; Genesis 19 enters it.",
        "The investigation has reached the place of judgment.",
        "The time of day gives the scene a darker, more dangerous feeling.",
      ]),
      phrase("Lot Sat In The Gate Of Sodom", [
        "The city gate was a public place for leaders, business, and legal matters.",
        "Lot is no longer merely near Sodom; he is seated in its gate.",
        "This suggests he has become deeply connected to the city.",
        "His earlier choice has pulled him further into Sodom's world.",
      ]),
      phrase("Lot Seeing Them Rose Up To Meet Them", [
        "Lot notices the visitors and responds quickly.",
        "Like Abraham, he shows hospitality at first.",
        "But the setting is very different.",
        "In Sodom, welcoming strangers will soon expose the city's danger.",
      ]),
      phrase("Turn In, I Pray You, Into Your Servant's House", [
        "Lot urges the visitors to stay in his house.",
        "He seems to know that the street is not safe at night.",
        "His invitation is protective hospitality.",
        "The need for protection already tells us something is wrong in Sodom.",
      ]),
      phrase("We Will Abide In The Street All Night", [
        "The angels first say they will stay in the street.",
        "This tests or exposes the city environment.",
        "A healthy city should be safe for travelers.",
        "Sodom's public space will soon reveal its corruption.",
      ]),
      phrase("He Pressed Upon Them Greatly", [
        "Lot strongly urges them not to stay outside.",
        "His pressure shows that he understands the danger.",
        "He may live in Sodom, but he knows its wickedness.",
        "The phrase creates tension before the mob arrives.",
      ]),
      phrase("Did Bake Unleavened Bread", [
        "Lot prepares a quick meal for the visitors.",
        "Unleavened bread could be made quickly because it did not need time to rise.",
        "The detail fits the urgency of the night.",
        "Hospitality is happening under pressure.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 4,
    endVerse: 11,
    reference: "Genesis 19:4-11",
    title: "Sodom Shows Its Wickedness",
    icon: "🚨",
    phrases: [
      phrase("The Men Of The City, Even The Men Of Sodom", [
        "Genesis identifies the public character of the threat.",
        "This is not one private sinner hidden in a corner.",
        "The men of the city gather around Lot's house.",
        "Sodom's corruption is communal and visible.",
      ]),
      phrase("Both Old And Young", [
        "The wickedness spans generations.",
        "Old and young are both included in the mob.",
        "This shows a city culture shaped by shared corruption.",
        "Sin has become normal across age groups.",
      ]),
      phrase("All The People From Every Quarter", [
        "The crowd comes from every part of the city.",
        "Genesis wants readers to feel the breadth of the evil.",
        "This explains why the earlier search for righteousness matters.",
        "The city is not merely troubled; it is saturated with violence.",
      ]),
      phrase("Bring Them Out Unto Us", [
        "The demand is aggressive and predatory.",
        "The visitors are not safe in the city.",
        "Sodom wants to dominate and abuse strangers instead of protecting them.",
        "This exposes the moral horror behind the city's outcry.",
      ]),
      phrase("That We May Know Them", [
        "In this context, know carries sexual meaning.",
        "The demand is about violent sexual abuse, not mutual relationship.",
        "The issue is domination, humiliation, and wickedness toward vulnerable guests.",
        "Genesis shows why Sodom's sin is grievous.",
      ]),
      phrase("Do Not So Wickedly", [
        "Lot names the action as wicked.",
        "Even from inside Sodom, he knows this demand is evil.",
        "The phrase gives moral clarity to the reader.",
        "The city is not misunderstood; it is doing wickedness.",
      ]),
      phrase("I Have Two Daughters Which Have Not Known Man", [
        "Lot's offer is deeply disturbing.",
        "He tries to protect his guests by endangering his daughters.",
        "Genesis does not present this as righteous wisdom.",
        "It shows how morally confused Lot has become while living in Sodom.",
      ]),
      phrase("Under The Shadow Of My Roof", [
        "Lot feels responsible for guests who came under his protection.",
        "Ancient hospitality carried serious obligations.",
        "But his attempt to protect guests by offering his daughters reveals broken priorities.",
        "The phrase shows both hospitality duty and moral failure.",
      ]),
      phrase("This One Fellow Came In To Sojourn", [
        "The mob turns on Lot as an outsider.",
        "Even though he sits in the gate, he is still not truly one of them.",
        "Sodom uses his outsider status against him.",
        "Living close to wickedness does not make a person safe from it.",
      ]),
      phrase("He Will Needs Be A Judge", [
        "The men resent Lot's moral objection.",
        "They do not want anyone telling them their actions are wicked.",
        "Sin often rejects correction by attacking the person who speaks.",
        "The phrase shows a city hostile to moral judgment.",
      ]),
      phrase("Pulled Lot Into The House", [
        "The angels rescue Lot when the mob presses in.",
        "Lot cannot control the danger he invited by living in Sodom.",
        "God's messengers must pull him back from destruction.",
        "Mercy steps in where Lot is overwhelmed.",
      ]),
      phrase("Smote The Men That Were At The Door With Blindness", [
        "The angels strike the attackers with blindness.",
        "This is both protection and judgment.",
        "The men are physically blinded after already showing moral blindness.",
        "God restrains evil before it destroys the guests and Lot's house.",
      ]),
      phrase("Wearied Themselves To Find The Door", [
        "Even blindness does not make the mob repent.",
        "They keep trying to reach the door.",
        "The phrase shows stubborn wickedness continuing under judgment.",
        "Sodom's corruption is being fully exposed.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 12,
    endVerse: 16,
    reference: "Genesis 19:12-16",
    title: "Lot Lingers As Mercy Pulls Him Out",
    icon: "⏳",
    phrases: [
      phrase("Hast Thou Here Any Besides?", [
        "The angels ask Lot about family still in the city.",
        "Mercy is giving warning before judgment falls.",
        "Lot is invited to gather anyone who will listen.",
        "God's judgment is serious, but the warning is also real.",
      ]),
      phrase("Bring Them Out Of This Place", [
        "The command is urgent and simple.",
        "The danger is not something to manage from inside Sodom.",
        "Lot's family must leave.",
        "Some places are not to be negotiated with; they must be fled.",
      ]),
      phrase("We Will Destroy This Place", [
        "The angels clearly announce the coming judgment.",
        "Sodom's time is ending.",
        "This is not a vague threat or symbolic warning.",
        "The city that has filled up its wickedness will be destroyed.",
      ]),
      phrase("The Cry Of Them Is Waxen Great Before The Face Of The LORD", [
        "The outcry has grown great before God.",
        "This connects Genesis 19 back to the LORD's words in Genesis 18.",
        "God has seen the evil and heard the cry connected to it.",
        "The judgment answers real corruption and suffering.",
      ]),
      phrase("The LORD Hath Sent Us To Destroy It", [
        "The angels are acting under the LORD's authority.",
        "This is not personal anger from the messengers.",
        "God Himself has sent them for judgment.",
        "The destruction is divine judgment, not random disaster.",
      ]),
      phrase("Up, Get You Out Of This Place", [
        "Lot warns his sons in law with urgent words.",
        "He tries to pass on the rescue message.",
        "The command is clear: get out.",
        "But clear warning still has to be believed.",
      ]),
      phrase("He Seemed As One That Mocked", [
        "Lot's sons in law think he is joking.",
        "They do not take the warning seriously.",
        "This is tragic because the danger is real.",
        "A warning ignored becomes mercy rejected.",
      ]),
      phrase("Arise, Take Thy Wife, And Thy Two Daughters", [
        "The angels narrow the rescue to those present with Lot.",
        "Morning has come, and delay is dangerous.",
        "The rescue now requires immediate movement.",
        "Lot cannot save everyone, but he must obey for those with him.",
      ]),
      phrase("Lest Thou Be Consumed In The Iniquity Of The City", [
        "Lot's danger is being swept away with Sodom's iniquity.",
        "Iniquity means deep moral crookedness and guilt.",
        "The city is under judgment because of its sin.",
        "Remaining in it means sharing its destruction.",
      ]),
      phrase("While He Lingered", [
        "Lot delays even after hearing the warning.",
        "This is one of the saddest phrases in the chapter.",
        "He knows danger is coming, yet he hesitates.",
        "Attachment to a sinful place can make escape feel strangely hard.",
      ]),
      phrase("The LORD Being Merciful Unto Him", [
        "This explains why Lot survives.",
        "The angels do not wait for Lot to become decisive.",
        "The LORD's mercy pulls him out when he is lingering.",
        "Rescue is grace, not Lot's strength.",
      ]),
      phrase("Set Him Without The City", [
        "Lot is placed outside the city before judgment falls.",
        "God's mercy physically removes him from the place of destruction.",
        "The phrase makes rescue concrete.",
        "Mercy does not only warn; it brings him out.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 17,
    endVerse: 22,
    reference: "Genesis 19:17-22",
    title: "Lot Is Told To Escape",
    icon: "🏃",
    phrases: [
      phrase("Escape For Thy Life", [
        "The command is urgent because Lot's life is at stake.",
        "This is not a time for comfort, possessions, or looking back.",
        "The only safe response is escape.",
        "God's mercy can sound severe when danger is deadly.",
      ]),
      phrase("Look Not Behind Thee", [
        "Lot is warned not to look back.",
        "Looking back would reveal attachment to the city being judged.",
        "The command teaches total separation from what God is overthrowing.",
        "Rescue requires leaving with the heart, not only the feet.",
      ]),
      phrase("Neither Stay Thou In All The Plain", [
        "Lot must not remain anywhere in the plain.",
        "The judgment will reach the whole area connected to Sodom.",
        "Halfway obedience is not safe.",
        "God's warning draws a clear boundary.",
      ]),
      phrase("Escape To The Mountain", [
        "The mountain is the place of safety appointed for Lot.",
        "God gives direction, not only warning.",
        "Escape is not random panic; it follows the word given.",
        "Lot's life depends on trusting the path of mercy.",
      ]),
      phrase("Thy Servant Hath Found Grace In Thy Sight", [
        "Lot knows he has received grace.",
        "He has not earned this rescue.",
        "The angels have pulled him out because God is merciful.",
        "Lot's words admit that his survival rests on favor.",
      ]),
      phrase("Thou Hast Magnified Thy Mercy", [
        "Lot recognizes that mercy has been made great toward him.",
        "He was lingering, yet God still rescued him.",
        "This phrase should make readers feel the generosity of God in the middle of judgment.",
        "Mercy is not small in this chapter.",
      ]),
      phrase("I Cannot Escape To The Mountain", [
        "Lot is still afraid after being rescued.",
        "He asks for a smaller, easier place than the command first gave.",
        "His fear continues to shape his response.",
        "Even saved people can struggle to trust the full path God gives.",
      ]),
      phrase("It Is A Little One", [
        "Lot pleads for the small city of Zoar.",
        "He argues that it is little, hoping it can be spared.",
        "The phrase shows him still negotiating for life near the plain.",
        "Lot's heart is not fully free from the region he is leaving.",
      ]),
      phrase("I Have Accepted Thee Concerning This Thing Also", [
        "The angel grants Lot's request.",
        "This is another mercy, even though Lot's faith is weak.",
        "God's rescue is patient with him.",
        "The chapter shows mercy bending low to pull a hesitant man out.",
      ]),
      phrase("Haste Thee, Escape Thither", [
        "The urgency remains.",
        "Lot may go to Zoar, but he still must move quickly.",
        "Mercy does not remove the seriousness of judgment.",
        "Delayed obedience is dangerous when God says escape.",
      ]),
      phrase("The Name Of The City Was Called Zoar", [
        "Zoar is connected to Lot's plea for a little city.",
        "The name helps the place carry the memory of the rescue.",
        "Genesis often uses names to preserve meaning.",
        "Here the place remembers Lot's fearful request and God's mercy.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 23,
    endVerse: 29,
    reference: "Genesis 19:23-29",
    title: "Sodom Falls",
    icon: "🔥",
    phrases: [
      phrase("The Sun Was Risen Upon The Earth", [
        "Judgment comes in daylight.",
        "The city is not destroyed in hidden darkness.",
        "The rising sun makes the scene feel exposed and final.",
        "What Sodom is has been brought into the open.",
      ]),
      phrase("Lot Entered Into Zoar", [
        "Lot reaches the place of mercy before the judgment falls.",
        "The timing matters.",
        "God does not overthrow the area until Lot is safely outside Sodom.",
        "Mercy and judgment are both active in the same moment.",
      ]),
      phrase("The LORD Rained Upon Sodom And Upon Gomorrah", [
        "The destruction comes from the LORD.",
        "Sodom and Gomorrah are named together as the judged cities.",
        "The judgment is not natural disaster described without God.",
        "Genesis presents it as divine action against grievous wickedness.",
      ]),
      phrase("Brimstone And Fire From The LORD Out Of Heaven", [
        "Brimstone and fire describe terrifying judgment from above.",
        "The language is severe because the sin has been severe.",
        "This becomes one of the Bible's lasting pictures of divine judgment.",
        "God is patient, but He is not indifferent to evil.",
      ]),
      phrase("He Overthrew Those Cities", [
        "Overthrew means the cities are turned down and brought to ruin.",
        "Sodom's power, pride, and violence collapse under God's judgment.",
        "The city that was unsafe for strangers is now unable to stand.",
        "Genesis shows evil reaching an end.",
      ]),
      phrase("All The Plain", [
        "The judgment reaches beyond one city center.",
        "The plain Lot chose by sight in Genesis 13 is now devastated.",
        "What looked like the best land became the place of greatest danger.",
        "The phrase warns readers not to choose only by appearance.",
      ]),
      phrase("His Wife Looked Back From Behind Him", [
        "Lot's wife disobeys the warning not to look back.",
        "The look reveals a heart still turned toward what God is judging.",
        "This is more than curiosity.",
        "It is a tragic picture of divided attachment during rescue.",
      ]),
      phrase("She Became A Pillar Of Salt", [
        "Her judgment becomes a lasting warning.",
        "She was brought out of the city, but her heart looked back.",
        "The phrase teaches that physical escape is not the same as surrendered trust.",
        "Jesus later tells readers to remember Lot's wife.",
      ]),
      phrase("The Place Where He Stood Before The LORD", [
        "Abraham returns to the place of intercession.",
        "He had stood before the LORD and pleaded for the righteous.",
        "Now he looks toward the outcome.",
        "The scene connects prayer, judgment, and sober witnessing.",
      ]),
      phrase("The Smoke Of The Country Went Up As The Smoke Of A Furnace", [
        "Abraham sees smoke rising over the judged land.",
        "The image is heavy and terrifying.",
        "It shows that the judgment was real, visible, and complete.",
        "The furnace-like smoke also echoes serious judgment imagery elsewhere in Scripture.",
      ]),
      phrase("God Remembered Abraham", [
        "Lot's rescue is connected to God's covenant relationship with Abraham.",
        "Remembered does not mean God had forgotten.",
        "It means God acted faithfully in view of His promise and Abraham's intercession.",
        "Mercy toward Lot is tied to covenant faithfulness.",
      ]),
      phrase("Sent Lot Out Of The Midst Of The Overthrow", [
        "God removed Lot from the destruction.",
        "Lot did not rescue himself by wisdom or strength.",
        "He was sent out by divine mercy.",
        "The final word over Lot's survival is God's action.",
      ]),
    ],
  },
  {
    chapter: 19,
    startVerse: 30,
    endVerse: 38,
    reference: "Genesis 19:30-38",
    title: "Lot's Family Breaks In The Cave",
    icon: "🕳️",
    phrases: [
      phrase("Lot Went Up Out Of Zoar", [
        "Lot leaves the city he had begged to enter.",
        "His fear continues even after God spared Zoar for him.",
        "The movement shows instability after Sodom's fall.",
        "Lot has been rescued, but his life is deeply fractured.",
      ]),
      phrase("He Feared To Dwell In Zoar", [
        "Fear still rules Lot's decisions.",
        "He was afraid of the mountain, then afraid of Zoar.",
        "Genesis shows the spiritual damage of living too close to Sodom for too long.",
        "Rescue does not instantly repair every fear-shaped habit.",
      ]),
      phrase("He Dwelt In A Cave", [
        "Lot ends up isolated in a cave with his daughters.",
        "This is a tragic contrast to Abraham's tent of hospitality.",
        "Lot's path from choosing the plain has led to loss, fear, and isolation.",
        "The cave feels like the collapse of his household story.",
      ]),
      phrase("There Is Not A Man In The Earth", [
        "Lot's daughters speak as if no future is possible.",
        "Their words are shaped by fear and distorted understanding.",
        "They may think the destruction has ended their chances for family.",
        "Panic begins to sound like planning.",
      ]),
      phrase("Let Us Make Our Father Drink Wine", [
        "The daughters form a sinful plan involving drunkenness and abuse.",
        "Wine becomes a tool for control.",
        "The phrase shows how broken fear can produce deeply broken action.",
        "Genesis does not sanitize the moral ugliness of the scene.",
      ]),
      phrase("That We May Preserve Seed Of Our Father", [
        "They want to preserve the family line.",
        "The goal may sound like survival, but the method is wicked.",
        "Genesis often warns that trying to secure the future through sin brings pain.",
        "Fear of losing a future does not make evil choices righteous.",
      ]),
      phrase("He Perceived Not When She Lay Down, Nor When She Arose", [
        "Lot is so drunk that he does not understand what is happening.",
        "The repeated phrase shows his vulnerability and the depth of family disorder.",
        "This is not romance or blessing.",
        "It is a tragic scene of exploitation inside a shattered household.",
      ]),
      phrase("Both The Daughters Of Lot With Child By Their Father", [
        "Genesis states the result plainly.",
        "The family line continues, but through a deeply broken act.",
        "The Bible tells the truth about origins, even when the truth is painful.",
        "This prepares readers to understand later tensions with Moab and Ammon.",
      ]),
      phrase("Called His Name Moab", [
        "Moab becomes the ancestor of the Moabites.",
        "Later Israel will have a complicated history with Moab.",
        "The name is not a random detail.",
        "Genesis is explaining the origin of a neighboring people through Lot's tragic story.",
      ]),
      phrase("Called His Name Benammi", [
        "Benammi becomes connected to the children of Ammon.",
        "Like Moab, Ammon's origin is tied to the cave scene.",
        "Genesis is preparing readers for later biblical history.",
        "Painful family choices can echo into future generations.",
      ]),
    ],
  },
  {
    chapter: 20,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 20:1-7",
    title: "God Warns Abimelech",
    icon: "🌙",
    phrases: [
      phrase("Abraham Journeyed From Thence Toward The South Country", [
        "Abraham moves again after the Sodom story.",
        "The journey continues, but movement does not automatically mean maturity in every area.",
        "A new place will expose an old fear.",
        "Genesis is honest that faith can grow while weakness still needs correction.",
      ]),
      phrase("Sojourned In Gerar", [
        "Abraham lives as a foreign resident in Gerar.",
        "Sojourning means he is not settled as a permanent owner.",
        "That vulnerable position helps explain his fear.",
        "But vulnerability still does not excuse deception.",
      ]),
      phrase("She Is My Sister", [
        "Abraham repeats the old sister lie from Genesis 12.",
        "This is painful because God has already protected him and promised Isaac.",
        "The phrase shows a repeated fear pattern.",
        "Old sins can return if they are not brought fully under trust in God.",
      ]),
      phrase("Abimelech King Of Gerar Sent, And Took Sarah", [
        "Abimelech takes Sarah because Abraham hides the truth.",
        "Sarah is again placed in danger by Abraham's fear.",
        "This is especially serious because Isaac has not yet been born.",
        "God must protect the promised mother from Abraham's failure.",
      ]),
      phrase("God Came To Abimelech In A Dream By Night", [
        "God intervenes directly with the foreign king.",
        "The dream is mercy to Abimelech and protection for Sarah.",
        "Abraham created the danger, but God steps in before it goes further.",
        "The promise is not fragile in human hands.",
      ]),
      phrase("Thou Art But A Dead Man", [
        "God's warning is severe.",
        "Abimelech is in real danger if he keeps Sarah.",
        "The seriousness shows that Sarah's marriage and the covenant promise matter to God.",
        "God does not treat Abraham's lie as harmless.",
      ]),
      phrase("She Is A Man's Wife", [
        "God states the truth Abraham hid.",
        "Sarah is not available for Abimelech's household.",
        "Her identity as Abraham's wife must be protected.",
        "The promise line depends on truth God Himself defends.",
      ]),
      phrase("Abimelech Had Not Come Near Her", [
        "The text makes clear that Abimelech had not touched Sarah.",
        "This protects Sarah's honor and the coming promise of Isaac.",
        "It also shows that God intervened before sin was completed.",
        "Preventing evil can be one of God's mercies.",
      ]),
      phrase("In The Integrity Of My Heart", [
        "Abimelech says he acted without knowing the full truth.",
        "Integrity means his conscience was not knowingly rebelling in this matter.",
        "God acknowledges the difference between deception and deliberate wrongdoing.",
        "The Judge of all the earth sees motives clearly.",
      ]),
      phrase("I Also Withheld Thee From Sinning Against Me", [
        "God says He restrained Abimelech from sin.",
        "This is preventative mercy.",
        "Abimelech did not avoid disaster by wisdom alone; God held him back.",
        "The phrase teaches that sin against people is also sin against God.",
      ]),
      phrase("He Is A Prophet", [
        "God still calls Abraham a prophet.",
        "That is surprising because Abraham has failed badly in the scene.",
        "Calling does not erase accountability, but failure does not erase God's calling either.",
        "Grace restores responsibility after correction.",
      ]),
      phrase("He Shall Pray For Thee", [
        "Abraham must pray for the man affected by his deception.",
        "This is humbling.",
        "The prophet who caused the crisis must become an intercessor for healing.",
        "God's mercy brings correction and responsibility together.",
      ]),
    ],
  },
  {
    chapter: 20,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 20:8-13",
    title: "Abimelech Confronts Abraham",
    icon: "📣",
    phrases: [
      phrase("Abimelech Rose Early In The Morning", [
        "Abimelech responds quickly to God's warning.",
        "He does not delay until the danger gets worse.",
        "The foreign king treats God's word seriously.",
        "His urgency exposes Abraham's failure even more clearly.",
      ]),
      phrase("The Men Were Sore Afraid", [
        "Abimelech's servants are deeply afraid when they hear what happened.",
        "The whole household feels the seriousness of the warning.",
        "Abraham's private fear has created public danger.",
        "Sin rarely stays as private as people imagine.",
      ]),
      phrase("What Hast Thou Done Unto Us?", [
        "Abimelech confronts Abraham directly.",
        "The question is similar to Pharaoh's rebuke in Genesis 12.",
        "Abraham is facing the same kind of exposure again.",
        "Repeated fear often leads to repeated correction.",
      ]),
      phrase("What Have I Offended Thee", [
        "Abimelech asks what wrong he had done to deserve this danger.",
        "He recognizes that Abraham's deception has treated him like an enemy.",
        "The question exposes the unfairness of fear-based assumptions.",
        "Abraham judged Gerar before knowing Abimelech's heart.",
      ]),
      phrase("A Great Sin", [
        "Abimelech names the danger morally.",
        "He understands that taking another man's wife would be a great sin.",
        "This is striking because the outsider speaks with clear moral seriousness.",
        "Genesis lets the covenant man be rebuked by a foreign king.",
      ]),
      phrase("Deeds Unto Me That Ought Not To Be Done", [
        "Abimelech says Abraham's actions were wrong.",
        "The phrase removes any excuse that the half-truth was harmless.",
        "Abraham's fear put others in danger.",
        "The Bible does not protect Abraham's reputation by softening the sin.",
      ]),
      phrase("What Sawest Thou", [
        "Abimelech asks what Abraham saw that led to this choice.",
        "The question goes beneath the action to the assumption.",
        "Fear often begins with what we think we see.",
        "Abraham's view of Gerar shaped his deception.",
      ]),
      phrase("Surely The Fear Of God Is Not In This Place", [
        "Abraham admits he assumed Gerar had no fear of God.",
        "The irony is sharp because Abimelech has just responded seriously to God's warning.",
        "Abraham's fear made him misjudge people.",
        "The phrase warns readers against making sinful decisions from imagined danger.",
      ]),
      phrase("They Will Slay Me For My Wife's Sake", [
        "Abraham names his fear of being killed because of Sarah.",
        "Self-protection drives the deception.",
        "The fear is understandable in a dangerous world, but it is not faithful.",
        "God's promise should have taught Abraham that his life was in God's hands.",
      ]),
      phrase("She Is The Daughter Of My Father", [
        "Abraham explains the partial truth behind the lie.",
        "Sarah is related to him, but she is also his wife.",
        "The problem is not that every word was technically false.",
        "The problem is that he used partial truth to hide the truth that mattered.",
      ]),
      phrase("When God Caused Me To Wander", [
        "Abraham describes his life as wandering under God's call.",
        "His calling has made him a sojourner among foreign peoples.",
        "But the journey of faith must still be marked by truthfulness.",
        "Being vulnerable does not make deception righteous.",
      ]),
      phrase("This Is Thy Kindness Which Thou Shalt Shew Unto Me", [
        "Abraham had asked Sarah to call him brother as an act of kindness to him.",
        "But that request placed Sarah in danger for Abraham's safety.",
        "Fear can twist selfishness until it sounds reasonable.",
        "Genesis lets readers see how costly Abraham's plan was for Sarah.",
      ]),
    ],
  },
  {
    chapter: 20,
    startVerse: 14,
    endVerse: 18,
    reference: "Genesis 20:14-18",
    title: "Sarah Is Restored And The Household Is Healed",
    icon: "🛡️",
    phrases: [
      phrase("Abimelech Took Sheep, And Oxen, And Menservants, And Womenservants", [
        "Abimelech gives significant gifts to Abraham.",
        "The gifts show public seriousness after the danger Abraham caused.",
        "This scene echoes Egypt, but Abraham does not look heroic here.",
        "God is preserving the promise through messy mercy.",
      ]),
      phrase("Restored Him Sarah His Wife", [
        "Sarah is returned to Abraham.",
        "This is the crucial rescue in the chapter.",
        "The promised mother is protected before Isaac's birth.",
        "God restores what Abraham's fear endangered.",
      ]),
      phrase("My Land Is Before Thee", [
        "Abimelech gives Abraham freedom to dwell in the land.",
        "This is generous after Abraham's deception.",
        "God turns a dangerous moment into protected space.",
        "Mercy comes through an unexpected ruler.",
      ]),
      phrase("A Thousand Pieces Of Silver", [
        "The silver functions as a public settlement.",
        "It shows that the wrong has been addressed openly.",
        "Sarah is not quietly returned as if nothing happened.",
        "The payment helps protect her honor in front of others.",
      ]),
      phrase("A Covering Of The Eyes", [
        "This difficult phrase points to public vindication or protection from shame.",
        "Abimelech's gift covers the situation before the eyes of others.",
        "The point is that Sarah's honor is defended.",
        "God does not let her be treated as disposable in Abraham's fear story.",
      ]),
      phrase("Thus She Was Reproved", [
        "The wording is difficult, but it shows the situation is publicly corrected.",
        "The chapter does not sweep the danger under the rug.",
        "Everyone involved must face the truth of what happened.",
        "Correction is part of mercy.",
      ]),
      phrase("Abraham Prayed Unto God", [
        "Abraham prays for Abimelech's household.",
        "This is humbling because Abraham helped create the crisis.",
        "Yet God still uses him as an intercessor.",
        "Grace restores Abraham to responsibility after exposing his failure.",
      ]),
      phrase("God Healed Abimelech", [
        "God removes the judgment from Abimelech.",
        "The healing shows the warning was real and the mercy is real.",
        "God protects Sarah and restores the household touched by the crisis.",
        "The LORD is both just and merciful.",
      ]),
      phrase("They Bare Children", [
        "The household's fertility is restored.",
        "This detail matters because Genesis 21 will immediately move to Sarah's child.",
        "God controls life, wombs, and timing.",
        "The chapter ends by reminding readers that children come by God's power.",
      ]),
      phrase("The LORD Had Fast Closed Up All The Wombs", [
        "God had closed the wombs in Abimelech's house because of Sarah.",
        "That connects sharply with Sarah's long barrenness and coming miracle.",
        "The LORD guards the promised mother and controls the womb.",
        "Isaac's birth in the next chapter will be clearly God's work.",
      ]),
      phrase("Because Of Sarah Abraham's Wife", [
        "Sarah's identity matters at the end of the chapter.",
        "She is Abraham's wife, not Abimelech's possession.",
        "She is also the woman through whom God has promised Isaac.",
        "God protects her place in the covenant story even when Abraham fails.",
      ]),
    ],
  },
];

function getGenesisElevenToTwentyPhraseEmoji(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("toward") || lower.includes("northward") || lower.includes("southward") || lower.includes("eastward") || lower.includes("westward")) return "📍";
  if (lower.includes("lord") || lower.includes("god") || lower.includes("almighty")) return "🙌";
  if (lower.includes("covenant") || lower.includes("promise") || lower.includes("bless")) return "📜";
  if (lower.includes("land") || lower.includes("canaan") || lower.includes("plain") || lower.includes("mountain")) return "📍";
  if (lower.includes("altar") || lower.includes("called upon")) return "⛪";
  if (lower.includes("seed") || lower.includes("son") || lower.includes("child") || lower.includes("born") || lower.includes("bare")) return "👶";
  if (lower.includes("name") || lower.includes("called")) return "🏷️";
  if (lower.includes("king") || lower.includes("pharaoh") || lower.includes("princes")) return "👑";
  if (lower.includes("war") || lower.includes("battle") || lower.includes("smote") || lower.includes("sword")) return "⚔️";
  if (lower.includes("famine") || lower.includes("bread") || lower.includes("food") || lower.includes("water") || lower.includes("well") || lower.includes("fountain")) return "💧";
  if (lower.includes("went") || lower.includes("departed") || lower.includes("journey") || lower.includes("return") || lower.includes("escape")) return "🚶";
  if (lower.includes("sodom") || lower.includes("gomorrah") || lower.includes("fire") || lower.includes("brimstone") || lower.includes("destroy")) return "🔥";
  if (lower.includes("fear") || lower.includes("afraid") || lower.includes("wrong") || lower.includes("sin") || lower.includes("wicked")) return "⚠️";
  if (lower.includes("saw") || lower.includes("eyes") || lower.includes("looked")) return "👀";
  if (lower.includes("heard") || lower.includes("hearken")) return "👂";
  if (lower.includes("wife") || lower.includes("sarah") || lower.includes("sarai") || lower.includes("hagar")) return "👩";
  if (lower.includes("abraham") || lower.includes("abram") || lower.includes("lot")) return "👤";
  return "🔎";
}

function titleHasEmoji(title: string) {
  return /^[^A-Za-z0-9']/.test(title.trim());
}

function getGenesisElevenToTwentyStudyTheme(section: PersonalGenesisPhraseSectionInput) {
  if (section.chapter === 11 && section.endVerse <= 9) {
    return {
      matters: "Babel is not mainly about architecture.",
      theme: "It is about human pride trying to build life apart from humble dependence on God.",
    };
  }

  if (section.chapter === 11) {
    return {
      matters: "The genealogy carries the story from the scattered nations toward Abram's family.",
      theme: "God keeps the promise line moving through ordinary births, deaths, names, and generations.",
    };
  }

  if (section.chapter === 12 && section.startVerse <= 9) {
    return {
      matters: "Abram's call is where God's rescue plan begins to narrow onto one family.",
      theme: "Through that one family, God is preparing blessing for many families.",
    };
  }

  if (section.chapter === 12) {
    return {
      matters: "The pressure exposes whether Abram is trusting God's promise or trying to protect himself by fear.",
      theme: "God's faithfulness protects His promise even when His people act weakly, foolishly, or fearfully.",
    };
  }

  if (section.chapter === 13) {
    return {
      matters: "Abram and Lot's separation reveals the difference between choosing by sight and trusting what God has promised.",
      theme: "The best-looking place is not always the safest place for the heart.",
    };
  }

  if (section.chapter === 14) {
    return {
      matters: "Abram's family is now caught inside the conflicts of real kingdoms, wealth, rescue, and power.",
      theme: "God's promised people have to live with courage, worship, integrity, and trust in a broken world.",
    };
  }

  if (section.chapter === 15) {
    return {
      matters: "Genesis 15 teaches Abram to rest on God's promise before the promise is visible.",
      theme: "God binds the future to His own word and calls His people to believe Him.",
    };
  }

  if (section.chapter === 16) {
    return {
      matters: "Genesis 16 shows the pain that comes when people try to force God's promise by human control.",
      theme: "God still sees the afflicted, hears the vulnerable, and remains faithful inside a wounded family.",
    };
  }

  if (section.chapter === 17) {
    return {
      matters: "Genesis 17 marks covenant identity.",
      theme: "Abram becomes Abraham, Sarai becomes Sarah, and the household receives the covenant sign.",
    };
  }

  if (section.chapter === 18) {
    return {
      matters: "Genesis 18 holds together promise, hospitality, divine presence, justice, and mercy.",
      theme: "The LORD comes near, keeps impossible promises, and judges evil with perfect righteousness.",
    };
  }

  if (section.chapter === 19) {
    return {
      matters: "Genesis 19 shows the seriousness of sin and the reality of judgment.",
      theme: "It also shows mercy pulling Lot out before destruction falls.",
    };
  }

  return {
    matters: "Genesis is showing God's promise moving forward through real people, real danger, and real moral choices.",
    theme: "God's faithfulness is stronger than human weakness.",
  };
}

function stripGenesisElevenToTwentyPhraseEmoji(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getGenesisElevenToTwentyPhraseFocus(section: PersonalGenesisPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (lower.includes("toward") || lower.includes("northward") || lower.includes("southward") || lower.includes("eastward") || lower.includes("westward")) {
    return "The direction language helps the reader follow Abram through the land God has promised but not yet fully given.";
  }

  if (lower.includes("let us make us a name") || lower.includes("name")) {
    return "🏙️ A city for security\n\n🗼 A tower for greatness\n\n🏷️ A name for themselves";
  }

  if (lower.includes("language") || lower.includes("confound") || lower.includes("scattered")) {
    return "The detail helps explain why the story moves from one gathered human project into many peoples spread across the earth.";
  }

  if (lower.includes("generations") || lower.includes("begat") || lower.includes("sons and daughters") || lower.includes("lived after")) {
    return "The genealogy is not filler; it is tracing the promise line through ordinary family history until the story reaches Abram.";
  }

  if (lower.includes("angel") || lower.includes("seen") || lower.includes("heard") || lower.includes("affliction")) {
    return "🏜️ In the wilderness\n\n🤰 Carrying a child\n\n💔 Hurt by the household\n\n👀 Seen by God";
  }

  if (lower.includes("laugh") || lower.includes("impossible") || lower.includes("hundred") || lower.includes("too hard")) {
    return "👵 Sarah was old\n\n👴 Abraham was old\n\n👶 The promise still stood\n\n🙌 The LORD was able";
  }

  if (lower.includes("lord") || lower.includes("god") || lower.includes("almighty")) {
    return "God's character is the center of the scene.";
  }

  if (lower.includes("covenant") || lower.includes("promise") || lower.includes("bless") || lower.includes("seed")) {
    return "The words carry covenant weight because God is tying the future of His people to His own promise.";
  }

  if (lower.includes("land") || lower.includes("canaan") || lower.includes("plain") || lower.includes("haran") || lower.includes("ur")) {
    return "The location matters because Genesis is showing where God's promise is moving and what kind of place the people are choosing or leaving.";
  }

  if (lower.includes("altar") || lower.includes("called upon")) {
    return "The action shows worship entering the story, where Abram responds to God's promise by honoring the LORD in the land.";
  }

  if (lower.includes("famine") || lower.includes("egypt") || lower.includes("pharaoh") || lower.includes("fear") || lower.includes("sister")) {
    return "The pressure in the scene reveals the difference between trusting God's promise and trying to survive by fear or half-truths.";
  }

  if (lower.includes("lot") || lower.includes("sodom") || lower.includes("gomorrah")) {
    return "Lot's choices slowly move him closer to danger, showing how a good-looking path can still pull the heart toward ruin.";
  }

  if (lower.includes("king") || /\bwar\b/.test(lower) || lower.includes("battle") || lower.includes("captiv")) {
    return "Abram's family is moving into the world of kingdoms and conflict, where faith has to face real danger and real power.";
  }

  if (lower.includes("melchizedek") || lower.includes("bread and wine") || lower.includes("most high")) {
    return "This moment lifts Abram's rescue story into worship, blessing, and the confession that victory belongs to God Most High.";
  }

  if (lower.includes("hagar") || lower.includes("sarai") || lower.includes("sarah") || lower.includes("ishmael") || lower.includes("isaac")) {
    return "The family detail matters because the promise is moving through real pain, real people, and God's careful choice of the promised child.";
  }

  if (lower.includes("circumcis") || lower.includes("token")) {
    return "The covenant sign makes God's promise visible in the household, turning belief into an embodied mark of belonging.";
  }

  if (lower.includes("laugh") || lower.includes("impossible") || lower.includes("hundred")) {
    return "The reaction exposes how impossible the promise feels from a human point of view, which makes God's power and timing stand out more clearly.";
  }

  if (lower.includes("righteous") || lower.includes("judge") || lower.includes("wicked")) {
    return "God's mercy never cancels His justice, and His justice is never careless or cruel.";
  }

  if (section.chapter === 12 && section.startVerse <= 9) {
    return "Abram is being called to obey before he can see the whole path ahead.";
  }

  return "The wording carries one piece of the passage's meaning instead of merely adding background information.";
}

function hasGenesisElevenToTwentyTeachingLayer(body: string) {
  return /matters|important|reveals|shows|teaches|connects|larger bible|covenant|promise|faith|obedience|judgment|mercy|worship|blessing|sin|redemption|identity|reader understands/i.test(body);
}

function cleanGenesisElevenToTwentyBoilerplate(body: string) {
  const seen = new Set<string>();
  return note(
    body
      .split("\n\n")
      .map((line) =>
        line
          .replace(/^This phrase matters because /, "")
          .replace(/^This matters because /, "")
          .replace(/^That matters because /, "")
          .replace(/^It connects to the larger Bible theme that /, "")
          .replace(/^It connects to the larger Bible theme of /, "")
          .replace(/^The wording is worth noticing because /, "")
          .replace(/^This phrase shows /, "")
          .replace(/^This phrase means /, "")
          .replace(/^This phrase points to /, "")
          .replace(/^This phrase invites readers to /, "")
          .replace(/^This phrase helps readers /, "")
          .replace(/^This phrase\s*$/, "")
          .replace(/^The phrase\s*$/, "")
          .replace(/^This phrase /, "")
          .replace(/^The phrase /, "")
          .replace(/^This phrase$/, "")
          .replace(/^The phrase$/, "")
          .trim(),
      )
      .map((line) => line ? `${line.charAt(0).toUpperCase()}${line.slice(1)}` : line)
      .filter((line) => {
        if (!line) return false;
        const key = line.toLowerCase().replace(/[.?!]+$/, "");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
  );
}

function deepenGenesisElevenToTwentyPhraseExplanation(
  section: PersonalGenesisPhraseSectionInput,
  title: string,
  body: string,
) {
  const cleanedBody = cleanGenesisElevenToTwentyBoilerplate(body);
  const lines = cleanedBody.split("\n\n").filter(Boolean);
  const cleanTitle = stripGenesisElevenToTwentyPhraseEmoji(title);
  const hasTeachingLayer = hasGenesisElevenToTwentyTeachingLayer(cleanedBody);
  if (lines.length >= 6 && hasTeachingLayer) return cleanedBody;

  const theme = getGenesisElevenToTwentyStudyTheme(section);
  const additions = [
    getGenesisElevenToTwentyPhraseFocus(section, cleanTitle),
    theme.matters,
    theme.theme,
  ].filter((line) => !cleanedBody.includes(line));
  const neededAdditions = hasTeachingLayer ? additions.slice(0, Math.max(1, 6 - lines.length)) : additions;

  return note([
    ...lines,
    ...neededAdditions,
  ]);
}

function addGenesisElevenToTwentyPhraseTitleEmojis(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, body]): [string, string] => {
      const heading = titleHasEmoji(title) ? title : `${getGenesisElevenToTwentyPhraseEmoji(title)} ${title}`;
      return [heading, deepenGenesisElevenToTwentyPhraseExplanation(section, heading, body)];
    }),
  }));
}

export const GENESIS_11_20_PERSONAL_SECTIONS = [
  ...addGenesisElevenToTwentyPhraseTitleEmojis(DAY_5_QUALITY_REVIEW_SECTIONS),
  ...addGenesisElevenToTwentyPhraseTitleEmojis(DAY_6_QUALITY_REVIEW_SECTIONS),
  ...addGenesisElevenToTwentyPhraseTitleEmojis(DAY_7_QUALITY_REVIEW_SECTIONS),
  ...addGenesisElevenToTwentyPhraseTitleEmojis(DAY_8_QUALITY_REVIEW_SECTIONS),
  ...addGenesisElevenTwelveSectionTexture(GENESIS_15_20_PERSONAL_REWRITE_SECTIONS).filter((section) => section.chapter > 20),
  ...expandSplitSections(RAW_GENESIS_11_20_PERSONAL_SECTIONS).filter(
    (section) => section.chapter < 11 || section.chapter > 20,
  ),
].sort((a, b) => a.chapter - b.chapter || a.startVerse - b.startVerse || a.endVerse - b.endVerse);
