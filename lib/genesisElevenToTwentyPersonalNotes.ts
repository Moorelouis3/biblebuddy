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

export const GENESIS_11_20_PERSONAL_SECTIONS = [
  ...addGenesisElevenTwelveSectionTexture(GENESIS_11_PERSONAL_REWRITE_SECTIONS),
  ...addGenesisElevenTwelveSectionTexture(GENESIS_12_PERSONAL_REWRITE_SECTIONS),
  ...addGenesisElevenTwelveSectionTexture(GENESIS_13_PERSONAL_REWRITE_SECTIONS),
  ...addGenesisElevenTwelveSectionTexture(GENESIS_14_PERSONAL_REWRITE_SECTIONS),
  ...addGenesisElevenTwelveSectionTexture(GENESIS_15_20_PERSONAL_REWRITE_SECTIONS),
  ...expandSplitSections(RAW_GENESIS_11_20_PERSONAL_SECTIONS).filter(
    (section) => section.chapter < 11 || section.chapter > 20,
  ),
].sort((a, b) => a.chapter - b.chapter || a.startVerse - b.startVerse || a.endVerse - b.endVerse);
