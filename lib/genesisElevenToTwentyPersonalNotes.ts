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

export const GENESIS_11_20_PERSONAL_SECTIONS = expandSplitSections(RAW_GENESIS_11_20_PERSONAL_SECTIONS);
