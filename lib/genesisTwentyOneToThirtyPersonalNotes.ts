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
  extraPhrases?: Array<[string, string]>;
};

const SECTION_SPLITS: Record<string, PersonalSectionSplit[]> = {
  "Genesis 21:22-34": [
    { startVerse: 22, endVerse: 30, reference: "Genesis 21:22-30", title: "Abimelech Makes A Covenant", phraseIndexes: [0, 1] },
    {
      startVerse: 31,
      endVerse: 34,
      reference: "Genesis 21:31-34",
      title: "Abraham Calls On The Everlasting God",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "💧 Beersheba",
          note([
            "Beersheba is connected to the oath Abraham makes with Abimelech.",
            "The name is tied to the well and the promise made there.",
            "This matters because places in Genesis often carry memory.",
            "A location is not just a dot on a map.",
            "It becomes a reminder of what happened between people and before God.",
            "Beersheba will keep showing up as an important place in the family story.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 22:9-19": [
    { startVerse: 9, endVerse: 14, reference: "Genesis 22:9-14", title: "The Lord Provides The Ram", phraseIndexes: [0, 1, 2] },
    {
      startVerse: 15,
      endVerse: 19,
      reference: "Genesis 22:15-19",
      title: "The Promise Is Repeated",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🤲 By Myself Have I Sworn",
          note([
            "God swears by Himself because there is no one greater for Him to swear by.",
            "People make oaths by appealing to someone higher than themselves.",
            "But God is the highest authority.",
            "This phrase shows how serious the promise is.",
            "God is binding the promise to His own character.",
            "Abraham's hope rests on who God is, not on Abraham's ability to control the future.",
          ]),
        ],
        [
          "⭐ As The Stars Of The Heaven",
          note([
            "God repeats the promise that Abraham's descendants will become incredibly many.",
            "The stars picture a number too large for Abraham to count.",
            "This is powerful because Abraham almost gave up the very son through whom that family would come.",
            "God reminds him that Isaac's life is still tied to a future bigger than Abraham can see.",
            "The promise is not shrinking after the test.",
            "It is being confirmed again.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 23:10-20": [
    {
      startVerse: 10,
      endVerse: 16,
      reference: "Genesis 23:10-16",
      title: "Abraham Buys The Field",
      phraseIndexes: [0],
      extraPhrases: [
        [
          "🧾 Ephron Answered Abraham",
          note([
            "Ephron answers Abraham in front of the people at the city gate.",
            "That public setting matters because legal business was often handled with witnesses.",
            "Abraham is not making a private handshake deal in a corner.",
            "He is making sure the purchase is clear and recognized.",
            "The burial place for Sarah will not be something anyone can easily dispute later.",
            "The promise family is gaining a real, witnessed place in Canaan.",
          ]),
        ],
      ],
    },
    { startVerse: 17, endVerse: 20, reference: "Genesis 23:17-20", title: "Sarah Is Buried In The Land", phraseIndexes: [1, 2] },
  ],
  "Genesis 24:10-20": [
    { startVerse: 10, endVerse: 14, reference: "Genesis 24:10-14", title: "The Prayer At The Well", phraseIndexes: [0, 1] },
    {
      startVerse: 15,
      endVerse: 20,
      reference: "Genesis 24:15-20",
      title: "Rebekah Appears",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "👧 Rebekah Came Out",
          note([
            "Rebekah appears at the exact moment the servant is praying.",
            "She does not know she is walking into a major turning point in the covenant story.",
            "To her, this is probably an ordinary trip to draw water.",
            "To the reader, it is God's guidance unfolding in real time.",
            "Genesis often shows God working through ordinary daily moments.",
            "A normal walk to the well becomes the doorway into Isaac's future.",
          ]),
        ],
        [
          "🏃 She Hasted",
          note([
            "Rebekah moves quickly to serve.",
            "The repeated speed in this scene shows eagerness, not laziness.",
            "Drawing water for camels was hard work because camels could drink a lot.",
            "She does more than the minimum.",
            "Her actions reveal kindness, strength, and hospitality.",
            "That is why the servant pays such close attention to her.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 24:21-33": [
    { startVerse: 21, endVerse: 27, reference: "Genesis 24:21-27", title: "The Servant Worships", phraseIndexes: [0, 1] },
    {
      startVerse: 28,
      endVerse: 33,
      reference: "Genesis 24:28-33",
      title: "Rebekah's Family Responds",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🍽️ I Will Not Eat Until",
          note([
            "The servant refuses to eat until he explains why he came.",
            "That shows how serious his mission is.",
            "Food and rest can wait because the covenant family matter comes first.",
            "He is not treating Isaac's marriage like casual travel business.",
            "He has been sent with an oath, and he wants the family to understand the whole story.",
            "His focus shows loyalty to Abraham and reverence for God's guidance.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 24:34-49": [
    { startVerse: 34, endVerse: 41, reference: "Genesis 24:34-41", title: "The Servant Tells The Mission", phraseIndexes: [0, 1] },
    {
      startVerse: 42,
      endVerse: 49,
      reference: "Genesis 24:42-49",
      title: "The Servant Retells The Prayer",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🤝 Deal Kindly And Truly",
          note([
            "The servant asks the family to deal kindly and truly with Abraham.",
            "Kindness here is covenant loyalty, not just being polite.",
            "Truth means honesty and faithfulness in the decision.",
            "He is asking them to respond clearly to what God appears to be doing.",
            "This matters because delay or manipulation would put the mission in danger.",
            "The servant wants a straight answer before he continues the journey.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 24:50-67": [
    {
      startVerse: 50,
      endVerse: 54,
      reference: "Genesis 24:50-54",
      title: "The Family Agrees",
      phraseIndexes: [0],
      extraPhrases: [
        [
          "🎁 Jewels Of Silver, And Jewels Of Gold",
          note([
            "The gifts show that the agreement is being honored seriously.",
            "They are not bribes in the cheap sense.",
            "They are part of the marriage arrangement and a sign of the servant's master's wealth.",
            "The gifts also confirm that Rebekah is being received with honor.",
            "This family decision is now becoming a real covenant-family union.",
            "The mission that began with prayer at a well is moving toward completion.",
          ]),
        ],
      ],
    },
    {
      startVerse: 55,
      endVerse: 61,
      reference: "Genesis 24:55-61",
      title: "Rebekah Chooses To Go",
      phraseIndexes: [1],
      extraPhrases: [
        [
          "🙌 They Blessed Rebekah",
          note([
            "Rebekah's family sends her away with a blessing.",
            "Their words speak of descendants, strength, and victory.",
            "This matters because Rebekah is leaving her home to join the promise family.",
            "The blessing looks forward to a future she cannot yet see.",
            "She is not just traveling to marry Isaac.",
            "She is stepping into the family through whom God will continue His covenant plan.",
          ]),
        ],
      ],
    },
    {
      startVerse: 62,
      endVerse: 67,
      reference: "Genesis 24:62-67",
      title: "Isaac Receives Rebekah",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🧕 She Took A Veil",
          note([
            "Rebekah takes a veil when she sees Isaac.",
            "This was a gesture of modesty and respect in that setting.",
            "It also marks the seriousness of meeting the man who will become her husband.",
            "The scene slows down after a long chapter of travel, prayer, and family decisions.",
            "Now the focus becomes personal.",
            "Rebekah and Isaac are finally brought together.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 25:1-11": [
    {
      startVerse: 1,
      endVerse: 6,
      reference: "Genesis 25:1-6",
      title: "Abraham Provides For His Sons",
      phraseIndexes: [0],
      extraPhrases: [
        [
          "🎁 Gave Gifts",
          note([
            "Abraham gives gifts to the sons of his concubines while Isaac receives the main inheritance.",
            "This helps the reader understand that Abraham is making a distinction.",
            "The other sons are acknowledged, but Isaac remains the covenant heir.",
            "The gifts may have helped them establish their own lives away from Isaac.",
            "This reduces future conflict over the promise line.",
            "Genesis is showing Abraham ordering his household before his death.",
          ]),
        ],
      ],
    },
    { startVerse: 7, endVerse: 11, reference: "Genesis 25:7-11", title: "Abraham Is Buried By His Sons", phraseIndexes: [1, 2] },
  ],
  "Genesis 26:1-11": [
    { startVerse: 1, endVerse: 6, reference: "Genesis 26:1-6", title: "God Repeats The Promise To Isaac", phraseIndexes: [0, 1, 2] },
    {
      startVerse: 7,
      endVerse: 11,
      reference: "Genesis 26:7-11",
      title: "Isaac Repeats Abraham's Fear",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "👀 Isaac Was Sporting With Rebekah",
          note([
            "Abimelech sees Isaac acting with Rebekah in a way that shows she is not really his sister.",
            "The word carries the idea of affectionate or playful closeness.",
            "That exposes Isaac's lie.",
            "His fear has put Rebekah and the people around him in danger.",
            "The scene is uncomfortable because Isaac is repeating a family failure instead of learning from it.",
            "God protects the promise, but Isaac still has to face the truth.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 26:12-22": [
    { startVerse: 12, endVerse: 17, reference: "Genesis 26:12-17", title: "Isaac Prospers In Gerar", phraseIndexes: [0, 1] },
    { startVerse: 18, endVerse: 22, reference: "Genesis 26:18-22", title: "Isaac Reopens The Wells", phraseIndexes: [2, 3] },
  ],
  "Genesis 26:23-35": [
    { startVerse: 23, endVerse: 25, reference: "Genesis 26:23-25", title: "God Meets Isaac At Beersheba", phraseIndexes: [0, 1] },
    {
      startVerse: 26,
      endVerse: 33,
      reference: "Genesis 26:26-33",
      title: "Abimelech Makes Peace With Isaac",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🤲 Let There Be An Oath",
          note([
            "Abimelech wants a formal oath with Isaac.",
            "He has seen Isaac's prosperity and recognizes that conflict with him is dangerous.",
            "An oath creates a clear agreement between the two households.",
            "This is similar to Abraham's earlier covenant with Abimelech.",
            "The promise family keeps living among outsiders, and peace matters.",
            "God's blessing on Isaac affects the way others negotiate with him.",
          ]),
        ],
      ],
    },
    {
      startVerse: 34,
      endVerse: 35,
      reference: "Genesis 26:34-35",
      title: "Esau Grieves His Parents",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "💍 Judith And Bashemath",
          note([
            "Esau marries Hittite women from the land.",
            "This matters because the covenant family has been careful about marriage choices.",
            "Abraham did not want Isaac marrying Canaanite women, and Isaac will later warn Jacob the same way.",
            "Esau's marriages show another way he is not valuing the covenant direction of the family.",
            "The issue is not only romance.",
            "It is worship, identity, and the future shape of the household.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 27:11-29": [
    { startVerse: 11, endVerse: 17, reference: "Genesis 27:11-17", title: "Jacob Puts On The Disguise", phraseIndexes: [0, 1] },
    {
      startVerse: 18,
      endVerse: 25,
      reference: "Genesis 27:18-25",
      title: "Isaac Questions Jacob",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🙋 I Am Esau Thy Firstborn",
          note([
            "Jacob does not simply let Isaac misunderstand.",
            "He directly claims to be Esau.",
            "That makes the deception personal and deliberate.",
            "He is taking the identity of his brother to receive the blessing meant for him.",
            "Genesis wants us to feel the moral weight of this moment.",
            "Jacob may be the chosen line, but he is not acting honorably here.",
          ]),
        ],
      ],
    },
    {
      startVerse: 26,
      endVerse: 29,
      reference: "Genesis 27:26-29",
      title: "Jacob Receives The Blessing",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "👑 Let People Serve Thee",
          note([
            "Isaac gives Jacob authority language in the blessing.",
            "This connects to what God told Rebekah before the twins were born.",
            "The older would serve the younger.",
            "The blessing is now moving in that direction, even though the scene is full of deception.",
            "God's purpose is not caused by Jacob's lie.",
            "But God is still able to carry His purpose through a broken family situation.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 27:30-46": [
    { startVerse: 30, endVerse: 36, reference: "Genesis 27:30-36", title: "Esau Realizes The Blessing Is Gone", phraseIndexes: [0, 1] },
    {
      startVerse: 37,
      endVerse: 40,
      reference: "Genesis 27:37-40",
      title: "Esau Receives A Hard Word",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🧭 Thou Shalt Break His Yoke",
          note([
            "Isaac says Esau's line will eventually break free from Jacob's rule.",
            "This points forward to the long tension between Israel and Edom.",
            "The relationship will not be simple or peaceful.",
            "Esau does not receive the covenant blessing, but he is not erased from history.",
            "His descendants will become a people with their own strength and conflict.",
            "Genesis is showing that family choices can echo for generations.",
          ]),
        ],
      ],
    },
    {
      startVerse: 41,
      endVerse: 46,
      reference: "Genesis 27:41-46",
      title: "Jacob Must Flee",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "😡 Esau Hated Jacob",
          note([
            "Esau's grief turns into hatred.",
            "He plans to kill Jacob after Isaac dies.",
            "This shows how the family conflict has moved from rivalry to danger.",
            "Jacob's deception did not create peace or security.",
            "It created fear, separation, and the threat of bloodshed.",
            "The blessing is real, but sin has made the path forward painful.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 28:10-22": [
    { startVerse: 10, endVerse: 15, reference: "Genesis 28:10-15", title: "Jacob Dreams At Bethel", phraseIndexes: [0, 1, 2] },
    {
      startVerse: 16,
      endVerse: 22,
      reference: "Genesis 28:16-22",
      title: "Jacob Names The Place Bethel",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "😳 Surely The Lord Is In This Place",
          note([
            "Jacob wakes up realizing he was not as alone as he thought.",
            "He had been sleeping in a place where God was present and speaking.",
            "This phrase is powerful because Jacob did not create the encounter.",
            "God came to him while he was running, tired, and uncertain.",
            "Jacob's fear turns into awe.",
            "The ordinary place becomes holy because God met him there.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 29:1-14": [
    {
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 29:1-8",
      title: "Jacob Arrives At The Well",
      phraseIndexes: [0],
      extraPhrases: [
        [
          "🐑 Three Flocks",
          note([
            "The three flocks show that this well serves more than one shepherd group.",
            "Water access had to be managed because everyone depended on it.",
            "The shepherds wait until the flocks gather before moving the stone.",
            "That detail helps us picture the scene.",
            "Jacob arrives at a real working well, not an empty romantic backdrop.",
            "The everyday world of shepherding becomes the place where the family story moves forward.",
          ]),
        ],
      ],
    },
    { startVerse: 9, endVerse: 14, reference: "Genesis 29:9-14", title: "Jacob Meets Rachel", phraseIndexes: [1, 2] },
  ],
  "Genesis 29:15-30": [
    {
      startVerse: 15,
      endVerse: 20,
      reference: "Genesis 29:15-20",
      title: "Jacob Serves Seven Years",
      phraseIndexes: [0],
      extraPhrases: [
        [
          "❤️ For The Love He Had To Her",
          note([
            "Jacob's love for Rachel shapes the way he experiences the seven years.",
            "The text says the years seemed like only a few days because of his love.",
            "That does not mean the work was easy.",
            "It means his desire for Rachel gave the labor meaning.",
            "This is one of the tender lines in a chapter that will soon become painful.",
            "Jacob's love is real, but Laban will use it against him.",
          ]),
        ],
      ],
    },
    { startVerse: 21, endVerse: 30, reference: "Genesis 29:21-30", title: "Laban Deceives Jacob", phraseIndexes: [1, 2] },
  ],
  "Genesis 30:1-13": [
    { startVerse: 1, endVerse: 8, reference: "Genesis 30:1-8", title: "Rachel's Pain And Bilhah", phraseIndexes: [0, 1, 2] },
    {
      startVerse: 9,
      endVerse: 13,
      reference: "Genesis 30:9-13",
      title: "Leah Gives Zilpah",
      phraseIndexes: [2],
      extraPhrases: [
        [
          "🏠 Leah Took Zilpah Her Maid",
          note([
            "Leah follows Rachel's strategy by giving her maid Zilpah to Jacob.",
            "This shows how rivalry spreads through the household.",
            "Instead of healing the pain, each woman tries to keep up with the other.",
            "Zilpah becomes part of the family conflict in a way that modern readers should not overlook.",
            "Genesis records the custom, but it also shows the emotional cost.",
            "The future tribes of Israel are being born inside a very strained home.",
          ]),
        ],
      ],
    },
  ],
  "Genesis 30:14-24": [
    { startVerse: 14, endVerse: 21, reference: "Genesis 30:14-21", title: "Mandrakes And More Sons", phraseIndexes: [0, 1] },
    { startVerse: 22, endVerse: 24, reference: "Genesis 30:22-24", title: "God Remembers Rachel", phraseIndexes: [2, 3] },
  ],
  "Genesis 30:25-43": [
    { startVerse: 25, endVerse: 34, reference: "Genesis 30:25-34", title: "Jacob Asks To Go Home", phraseIndexes: [0, 1, 2] },
    {
      startVerse: 35,
      endVerse: 43,
      reference: "Genesis 30:35-43",
      title: "Jacob's Flocks Increase",
      phraseIndexes: [3],
      extraPhrases: [
        [
          "🐑 The Feebler Were Laban's",
          note([
            "The story shows Jacob's flocks becoming stronger while Laban's become weaker.",
            "The details can be confusing, but the direction is clear.",
            "Jacob is gaining wealth while Laban's control begins to fail.",
            "This matters because Laban has been using Jacob for years.",
            "God is beginning to shift the situation.",
            "Jacob will not leave Laban's house empty-handed.",
          ]),
        ],
      ],
    },
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
      phrases: [
        ...split.phraseIndexes.map((index) => section.phrases[index]).filter(Boolean),
        ...(split.extraPhrases ?? []),
      ],
    }));
  });
}

const RAW_GENESIS_21_30_PERSONAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 21,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 21:1-7",
    title: "Isaac Is Born",
    icon: "👶",
    phrases: [
      [
        "⏳ As He Had Said",
        note([
          "This phrase is the heartbeat of Isaac's birth.",
          "God did exactly what He promised Abraham and Sarah He would do.",
          "The promise looked impossible because Abraham and Sarah were both old, but age was never stronger than God's word.",
          "Genesis wants us to notice that the birth of Isaac is not random good luck.",
          "It is promise turning into reality.",
          "When God says something, time may pass, people may laugh, and circumstances may look closed, but His word still stands.",
        ]),
      ],
      [
        "📅 At The Set Time",
        note([
          "Isaac is born at the exact time God had spoken about.",
          "That matters because God's promises do not only have power; they also have timing.",
          "Abraham and Sarah waited for years, and the waiting probably felt confusing and painful.",
          "But the delay did not mean God forgot.",
          "The phrase shows that God was not late and He was not guessing.",
          "He was working according to His own appointed time.",
        ]),
      ],
      [
        "😂 God Hath Made Me To Laugh",
        note([
          "Sarah laughed earlier because the promise sounded impossible.",
          "Now she laughs because God actually did it.",
          "The same word that once carried disbelief now carries joy.",
          "Isaac's name is connected to laughter, so every time his name is spoken it reminds the family of what God did.",
          "God turned an embarrassing moment of doubt into a testimony.",
          "Sarah's laughter says, 'I could not make this happen, but God did.'",
        ]),
      ],
    ],
  },
  {
    chapter: 21,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 21:8-13",
    title: "The Household Conflict Breaks Open",
    icon: "🏠",
    phrases: [
      [
        "👀 Sarah Saw The Son Of Hagar Mocking",
        note([
          "The celebration around Isaac does not remove the tension already living in Abraham's house.",
          "Ishmael's mocking shows that the earlier family choices are still creating pain.",
          "This is not just a small sibling issue.",
          "Isaac is the promised son, and Ishmael's place in the family has become complicated.",
          "Sarah sees a threat to Isaac's future.",
          "Genesis is showing how shortcuts taken in fear can create problems years later.",
        ]),
      ],
      [
        "🚪 Cast Out This Bondwoman And Her Son",
        note([
          "Sarah's words sound harsh, and the story does not ask us to pretend they are easy to hear.",
          "Hagar and Ishmael are being pushed out of the household.",
          "The word bondwoman reminds us that Hagar never had the same power or protection Sarah had.",
          "This moment is painful because real people are caught inside a messy family decision.",
          "At the same time, God will not abandon Hagar or Ishmael.",
          "The Bible can show human pain honestly while still showing God's care.",
        ]),
      ],
      [
        "🌱 In Isaac Shall Thy Seed Be Called",
        note([
          "God makes clear that the covenant line will continue through Isaac.",
          "This does not mean God hates Ishmael or forgets him.",
          "It means Isaac is the son connected to the specific promise God made to Abraham.",
          "The Bible often follows one chosen line while still showing compassion to others.",
          "Isaac carries the covenant story forward.",
          "Ishmael will still become a nation, but he is not the line through which the promised blessing continues.",
        ]),
      ],
    ],
  },
  {
    chapter: 21,
    startVerse: 14,
    endVerse: 21,
    reference: "Genesis 21:14-21",
    title: "God Hears Ishmael",
    icon: "🌵",
    phrases: [
      [
        "🌵 She Departed, And Wandered",
        note([
          "Hagar is sent into the wilderness with limited food and water.",
          "This is one of the loneliest scenes in Genesis.",
          "She is not walking into a clear future; she is wandering.",
          "The wilderness often becomes the place where people feel forgotten, exposed, and desperate.",
          "But in Genesis, the wilderness is also a place where God sees people.",
          "Hagar may be outside Abraham's camp, but she is not outside God's care.",
        ]),
      ],
      [
        "👂 God Heard The Voice Of The Lad",
        note([
          "The name Ishmael means 'God hears.'",
          "So this line is deeply personal.",
          "The boy's very name is now becoming true in the story.",
          "God hears Ishmael crying in the wilderness.",
          "This reminds us that God does not only hear the powerful people in the covenant family.",
          "He hears the child who has been pushed away and left with no strength.",
        ]),
      ],
      [
        "👁️ God Opened Her Eyes",
        note([
          "The well was there, but Hagar could not see it until God opened her eyes.",
          "Sometimes provision is not God creating something new in the moment.",
          "Sometimes it is God helping a person see what they could not see before.",
          "Hagar needed water, but she also needed hope.",
          "God gives both.",
          "This phrase shows God's mercy in a very practical way: He helps a desperate mother keep her child alive.",
        ]),
      ],
    ],
  },
  {
    chapter: 21,
    startVerse: 22,
    endVerse: 34,
    reference: "Genesis 21:22-34",
    title: "A Well Becomes A Witness",
    icon: "💧",
    phrases: [
      [
        "🤝 God Is With Thee",
        note([
          "Abimelech can see that Abraham's life is marked by God's presence.",
          "This is important because Abraham is living among people who do not share his covenant story.",
          "Even outsiders can recognize that something is different about him.",
          "Abraham still has flaws, but God's hand on his life is visible.",
          "The phrase shows that covenant blessing is not hidden in private only.",
          "It begins to affect how surrounding people understand Abraham.",
        ]),
      ],
      [
        "💧 A Well Of Water",
        note([
          "A well was a major issue in the ancient world.",
          "Water meant survival for families, servants, animals, and future generations.",
          "So when Abraham argues over a well, he is not being petty.",
          "He is protecting life, stability, and his place in the land.",
          "This matters because Abraham still owns very little in Canaan.",
          "A well becomes one of the first signs that his family is putting roots down in the promised land.",
        ]),
      ],
      [
        "🌳 The Everlasting God",
        note([
          "Abraham calls on the Lord as the everlasting God.",
          "That title points to a God who is not temporary, weak, or tied to one short moment.",
          "Abraham's life has been full of waiting, moving, conflict, and uncertainty.",
          "But the God he worships is steady across generations.",
          "This matters because God's promises will outlive Abraham himself.",
          "The everlasting God can keep a covenant even after one generation passes away.",
        ]),
      ],
    ],
  },
  {
    chapter: 22,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 22:1-8",
    title: "The Test Begins",
    icon: "⛰️",
    phrases: [
      [
        "🧪 God Did Tempt Abraham",
        note([
          "In older English, tempt can mean test.",
          "This does not mean God is trying to make Abraham sin.",
          "It means God is testing what Abraham trusts most.",
          "Abraham waited decades for Isaac, and now the promised son is being placed on the altar of obedience.",
          "The test is painful because it touches the very promise God gave.",
          "Genesis is showing whether Abraham trusts the gift more than the Giver.",
        ]),
      ],
      [
        "❤️ Thine Only Son Isaac, Whom Thou Lovest",
        note([
          "God names Isaac in the most emotional way possible.",
          "Isaac is Abraham's beloved son and the child of promise.",
          "This phrase slows the reader down so we feel the weight of the command.",
          "Abraham is not being asked to give up something small.",
          "He is being asked to surrender the future he waited for.",
          "This scene later echoes forward to the language of a beloved Son in the story of Jesus.",
        ]),
      ],
      [
        "🐏 God Will Provide Himself A Lamb",
        note([
          "Abraham's answer to Isaac is one of the most important lines in the chapter.",
          "Isaac asks where the lamb is, and Abraham says God will provide.",
          "Abraham may not understand how everything will happen, but he is holding onto God's faithfulness.",
          "The phrase points beyond this moment because God really will provide the sacrifice.",
          "In Genesis 22 it is a ram.",
          "In the larger Bible story, Christians see this pointing toward Christ, the Lamb God provides.",
        ]),
      ],
    ],
  },
  {
    chapter: 22,
    startVerse: 9,
    endVerse: 19,
    reference: "Genesis 22:9-19",
    title: "The Lord Provides The Ram",
    icon: "🐏",
    phrases: [
      [
        "🪵 Bound Isaac His Son",
        note([
          "This is the moment where the test reaches its highest point.",
          "Isaac is placed on the altar, and the story becomes almost unbearable to read.",
          "The Bible does not give us every emotion, but it makes us feel the silence and seriousness.",
          "Abraham's obedience has moved from words to action.",
          "This does not make the command easy.",
          "It shows how deeply Abraham has come to trust the God who gave the promise.",
        ]),
      ],
      [
        "🛑 Lay Not Thine Hand Upon The Lad",
        note([
          "God stops Abraham before Isaac is harmed.",
          "This is important because the story is not teaching that God desires child sacrifice.",
          "In the ancient world, some nations did offer children to false gods.",
          "Genesis shows that the Lord is different.",
          "He tests Abraham, but He does not take Isaac.",
          "God provides a substitute instead of allowing the promised son to die.",
        ]),
      ],
      [
        "📍 Jehovah-Jireh",
        note([
          "This name means the Lord will provide.",
          "Abraham names the place after what God revealed there.",
          "The mountain becomes a memory of God's provision in the hardest moment of Abraham's life.",
          "God did not provide early enough to remove the test, but He provided in time to save Isaac.",
          "That detail matters.",
          "Sometimes God's provision is not early, but it is faithful.",
        ]),
      ],
    ],
  },
  {
    chapter: 22,
    startVerse: 20,
    endVerse: 24,
    reference: "Genesis 22:20-24",
    title: "Rebekah Enters The Family Story",
    icon: "🌱",
    phrases: [
      [
        "🧭 After These Things",
        note([
          "This phrase moves the story forward after the intense test on the mountain.",
          "Genesis now quietly introduces the family line where Rebekah will come from.",
          "At first, the list may look like a random genealogy.",
          "But it is preparing the reader for Isaac's future wife.",
          "The promise line needs to continue beyond Isaac.",
          "God is already placing the next part of the story in view.",
        ]),
      ],
      [
        "👨‍👩‍👧 Bethuel Begat Rebekah",
        note([
          "Rebekah is mentioned before we know her story because she will become very important.",
          "She will marry Isaac and become the mother of Jacob and Esau.",
          "That means her name is connected to the next generation of the covenant family.",
          "Genesis often introduces people quietly before they become central.",
          "This is one of those moments.",
          "The future of the promise is already being prepared in another household.",
        ]),
      ],
    ],
  },
  {
    chapter: 23,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 23:1-9",
    title: "Abraham Seeks A Burial Place",
    icon: "🪦",
    phrases: [
      [
        "🪦 Sarah Was An Hundred And Seven And Twenty Years Old",
        note([
          "Sarah is the only woman in the Bible whose age at death is listed this way.",
          "That shows her importance in the story.",
          "She was not just Abraham's wife; she was the mother of the promised son.",
          "Her life carried pain, waiting, laughter, doubt, and fulfilled promise.",
          "Her death marks the end of a major chapter in Abraham's life.",
          "The promise continues, but Abraham now has to grieve.",
        ]),
      ],
      [
        "😭 Abraham Came To Mourn For Sarah",
        note([
          "Abraham is a man of faith, but he still mourns.",
          "Faith does not erase grief.",
          "The Bible lets us see Abraham weeping over the woman who walked through the promise journey with him.",
          "This matters because Scripture does not treat grief like weakness.",
          "Even people who trust God feel loss deeply.",
          "Abraham believes God's promises and still has to bury someone he loves.",
        ]),
      ],
      [
        "🚶 A Stranger And A Sojourner",
        note([
          "Abraham lives in the promised land, but he does not fully possess it yet.",
          "He describes himself as a stranger and a sojourner.",
          "That means he is living there without permanent ownership like the local people have.",
          "This phrase shows the tension of Abraham's life.",
          "God promised the land, but Abraham still has to buy a burial place.",
          "The promise is real, but it is not fully completed in his lifetime.",
        ]),
      ],
    ],
  },
  {
    chapter: 23,
    startVerse: 10,
    endVerse: 20,
    reference: "Genesis 23:10-20",
    title: "Sarah Is Buried In The Land",
    icon: "📜",
    phrases: [
      [
        "💰 Four Hundred Shekels Of Silver",
        note([
          "Abraham pays the full price for the field and cave.",
          "He does not want the burial place to be a vague favor that could later be challenged.",
          "In the ancient world, public transactions protected ownership.",
          "The amount is large, but Abraham accepts it because he wants the purchase settled clearly.",
          "This becomes the first piece of the promised land Abraham legally owns.",
          "It is bought for burial, but it still points to faith in God's promise.",
        ]),
      ],
      [
        "📜 Made Sure Unto Abraham",
        note([
          "This means the field became legally secured to Abraham.",
          "Genesis repeats the details because the purchase matters.",
          "The land, the cave, the trees, and the location are all named.",
          "This is not a symbolic dream; it is a real property transfer.",
          "Abraham now has a permanent family burial place in Canaan.",
          "Even in death, the family is being tied to the land God promised.",
        ]),
      ],
      [
        "🪦 Abraham Buried Sarah His Wife",
        note([
          "This line closes Sarah's earthly story.",
          "Abraham honors her by burying her in Canaan, not back in Mesopotamia.",
          "That matters because Canaan is the land of promise.",
          "Sarah dies before seeing the promise fully completed, but she is buried in the land connected to that promise.",
          "Her grave becomes a quiet testimony of faith.",
          "The family is still waiting, but they are waiting in the place God chose.",
        ]),
      ],
    ],
  },
  {
    chapter: 24,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 24:1-9",
    title: "Abraham Sends His Servant",
    icon: "🧳",
    phrases: [
      [
        "🙌 The Lord Had Blessed Abraham In All Things",
        note([
          "This line looks back over Abraham's long life.",
          "He has faced famine, family conflict, war, fear, waiting, and grief.",
          "Still, Genesis says the Lord blessed him in all things.",
          "That does not mean Abraham's life was easy.",
          "It means God's faithfulness covered the whole journey.",
          "Now Abraham is old, and the next concern is Isaac's future.",
        ]),
      ],
      [
        "🤝 Put Thy Hand Under My Thigh",
        note([
          "This was an ancient way of making a serious oath.",
          "It feels strange to modern readers, but it showed that the promise being made was solemn and personal.",
          "Abraham is asking his servant to swear carefully about Isaac's wife.",
          "Marriage is not treated like a small family preference here.",
          "It is connected to the covenant future.",
          "The next generation must not be pulled away from the promise God gave.",
        ]),
      ],
      [
        "🚫 Not Take A Wife Of The Canaanites",
        note([
          "Abraham does not want Isaac to marry into the Canaanite families around them.",
          "This is not about ethnicity as much as covenant faithfulness.",
          "The Canaanites worshiped other gods and lived by different values.",
          "Isaac's marriage will shape the future household of the promise.",
          "Abraham wants a wife from his own family line, but he also refuses to send Isaac back permanently.",
          "The promise belongs in Canaan, even while the wife is found elsewhere.",
        ]),
      ],
    ],
  },
  {
    chapter: 24,
    startVerse: 10,
    endVerse: 20,
    reference: "Genesis 24:10-20",
    title: "Rebekah Appears At The Well",
    icon: "💧",
    phrases: [
      [
        "💧 By A Well Of Water",
        note([
          "The well is the meeting place in this story.",
          "In the ancient world, wells were places of survival, community, and conversation.",
          "Women often came to draw water, so the servant waits where he is likely to meet someone from the city.",
          "This is practical wisdom, not random wandering.",
          "The servant places himself where the answer could appear.",
          "Genesis often uses ordinary places like wells to move the promise story forward.",
        ]),
      ],
      [
        "🙏 Let It Come To Pass",
        note([
          "The servant prays for guidance before making a decision.",
          "He is not only looking for a wife who looks right.",
          "He is looking for a sign of character.",
          "The test he asks for is based on hospitality and generosity.",
          "Giving water to a man is kind; giving water to camels is a lot of work.",
          "The servant wants to recognize the kind of woman who would fit the covenant family.",
        ]),
      ],
      [
        "🏃 Before He Had Done Speaking",
        note([
          "Rebekah arrives before the servant even finishes praying.",
          "This is not filler detail.",
          "It shows God's providence moving faster than the servant can finish his request.",
          "The answer is already walking toward the well.",
          "Genesis wants us to feel the timing.",
          "God has been working before the servant could see the solution.",
        ]),
      ],
    ],
  },
  {
    chapter: 24,
    startVerse: 21,
    endVerse: 33,
    reference: "Genesis 24:21-33",
    title: "The Servant Worships",
    icon: "🙌",
    phrases: [
      [
        "👀 The Man Wondering At Her",
        note([
          "The servant watches Rebekah carefully before speaking too quickly.",
          "He is trying to understand whether this is really the Lord's answer.",
          "Faith does not mean turning off wisdom.",
          "He sees her generosity, her speed, and her willingness to serve.",
          "Those actions matter because character is being revealed in ordinary work.",
          "Rebekah's kindness at the well becomes the first sign that she belongs in this story.",
        ]),
      ],
      [
        "🙌 Blessed Be The Lord",
        note([
          "The servant worships as soon as he recognizes God's guidance.",
          "He does not congratulate himself for a successful trip.",
          "He gives credit to the Lord.",
          "This matters because the chapter is not really about luck or clever matchmaking.",
          "It is about God faithfully guiding Abraham's family.",
          "The servant sees mercy and truth in the way God led him.",
        ]),
      ],
      [
        "🏠 Come In, Thou Blessed Of The Lord",
        note([
          "Laban welcomes the servant into the house with religious language.",
          "He can see that this visitor is connected to blessing.",
          "Hospitality was a serious duty in the ancient world.",
          "Travelers needed food, water, shelter, and safety.",
          "The welcome gives the servant a chance to explain why he has come.",
          "The private prayer at the well is now becoming a family conversation.",
        ]),
      ],
    ],
  },
  {
    chapter: 24,
    startVerse: 34,
    endVerse: 49,
    reference: "Genesis 24:34-49",
    title: "The Servant Tells The Mission",
    icon: "🗣️",
    phrases: [
      [
        "🧳 I Am Abraham's Servant",
        note([
          "The servant begins by identifying himself under Abraham's household.",
          "He does not make the story about his own importance.",
          "His mission is to represent Abraham and seek a wife for Isaac.",
          "That matters because marriage negotiations involved families, not only two individuals.",
          "The servant must explain the covenant family's story clearly.",
          "He is carrying Abraham's request with loyalty and seriousness.",
        ]),
      ],
      [
        "🙌 The Lord Hath Blessed My Master",
        note([
          "The servant explains Abraham's wealth as the result of God's blessing.",
          "He lists possessions, but the point is not bragging.",
          "He is showing that Isaac is not a random man without a future.",
          "He is the son of a family marked by God's promise and provision.",
          "This helps Rebekah's family understand the seriousness of the marriage request.",
          "The covenant blessing is moving toward the next generation.",
        ]),
      ],
      [
        "🧭 I Being In The Way, The Lord Led Me",
        note([
          "This phrase shows how the servant understands the whole journey.",
          "He was walking in obedience, and the Lord guided him as he went.",
          "He did not receive every detail before leaving home.",
          "He obeyed the mission, prayed on the road, and watched God provide.",
          "That is often how guidance works in Genesis.",
          "God leads people step by step while they are already moving in faithfulness.",
        ]),
      ],
    ],
  },
  {
    chapter: 24,
    startVerse: 50,
    endVerse: 67,
    reference: "Genesis 24:50-67",
    title: "Rebekah Goes To Isaac",
    icon: "👰",
    phrases: [
      [
        "🙌 The Thing Proceedeth From The Lord",
        note([
          "Rebekah's family recognizes that this situation is bigger than human planning.",
          "The timing, the prayer, the well, and Rebekah's response all point to God's hand.",
          "They admit they cannot speak against it.",
          "This matters because the marriage is not treated as a random arrangement.",
          "It is part of God's covenant story.",
          "The Lord is guiding Isaac's future before Isaac even appears in the scene.",
        ]),
      ],
      [
        "🚶 Wilt Thou Go With This Man? And She Said, I Will Go",
        note([
          "Rebekah is given a voice in the decision.",
          "Her answer is short, but it is brave.",
          "She is leaving home, family, and everything familiar to join Isaac in Canaan.",
          "Her journey echoes Abraham's earlier call to leave his country and go to the land God would show.",
          "Rebekah steps into the promise by faith.",
          "She does not know every detail, but she chooses to go.",
        ]),
      ],
      [
        "❤️ He Loved Her",
        note([
          "The chapter ends with Isaac receiving Rebekah as his wife and loving her.",
          "This is tender because Isaac has just lost his mother, Sarah.",
          "Rebekah's arrival brings comfort into a grieving household.",
          "The promise continues, but the story also remembers human emotion.",
          "Marriage here is not only covenant continuation.",
          "It is also companionship, love, and comfort after loss.",
        ]),
      ],
    ],
  },
  {
    chapter: 25,
    startVerse: 1,
    endVerse: 11,
    reference: "Genesis 25:1-11",
    title: "Abraham's Final Years",
    icon: "🌅",
    phrases: [
      [
        "🎁 Abraham Gave All That He Had Unto Isaac",
        note([
          "Abraham has other children later in life, but Isaac remains the covenant heir.",
          "This phrase does not mean the other sons receive nothing at all.",
          "The next verses say Abraham gives them gifts.",
          "But the inheritance connected to the promise belongs to Isaac.",
          "Genesis is carefully protecting the line of the covenant.",
          "The blessing God promised Abraham will continue through Isaac.",
        ]),
      ],
      [
        "🪦 Gathered To His People",
        note([
          "This phrase means Abraham dies and joins the generations who died before him.",
          "It is more than saying his body was buried.",
          "It points to death as joining one's people in the realm beyond earthly life.",
          "Abraham's journey of tents, altars, failures, promises, and faith comes to an end.",
          "But God's promise does not end with Abraham's death.",
          "The covenant story keeps moving through Isaac.",
        ]),
      ],
      [
        "🤝 Isaac And Ishmael His Sons Buried Him",
        note([
          "Isaac and Ishmael come together to bury their father.",
          "That is a quiet but meaningful detail after years of family pain.",
          "The two sons had different roles in the story, but both are Abraham's sons.",
          "Genesis does not erase the brokenness between the households.",
          "But it lets us see a moment of shared honor at Abraham's death.",
          "The family is complicated, but Abraham is remembered by both sons.",
        ]),
      ],
    ],
  },
  {
    chapter: 25,
    startVerse: 12,
    endVerse: 18,
    reference: "Genesis 25:12-18",
    title: "Ishmael's Line",
    icon: "🏕️",
    phrases: [
      [
        "📜 These Are The Generations Of Ishmael",
        note([
          "Genesis pauses to record Ishmael's family line.",
          "That matters because God promised Hagar and Abraham that Ishmael would become a great nation.",
          "The Bible is showing that God kept that promise too.",
          "Ishmael is not the covenant line through Isaac, but he is not forgotten.",
          "His descendants have names, families, and places.",
          "God's care reaches beyond the main line Genesis is following.",
        ]),
      ],
      [
        "👑 Twelve Princes",
        note([
          "Ishmael's descendants become twelve princes according to their nations.",
          "This fulfills God's word that Ishmael would become a great people.",
          "The number twelve also shows fullness and structure in his family line.",
          "Ishmael's story began with rejection and wilderness tears.",
          "Now Genesis shows growth, leadership, and nations.",
          "God heard Ishmael, and God kept His word.",
        ]),
      ],
      [
        "🏜️ He Died In The Presence Of All His Brethren",
        note([
          "This phrase describes Ishmael's death and the location of his people.",
          "His descendants live in relation to surrounding family groups.",
          "The line can also carry the sense of living over against or before his brothers.",
          "That fits the earlier word that Ishmael's life would include conflict and independence.",
          "Genesis is connecting his ending back to what God had already said.",
          "His life unfolds under the word God spoke before he was born.",
        ]),
      ],
    ],
  },
  {
    chapter: 25,
    startVerse: 19,
    endVerse: 26,
    reference: "Genesis 25:19-26",
    title: "Jacob And Esau Are Born",
    icon: "👶",
    phrases: [
      [
        "🙏 Isaac Intreated The Lord",
        note([
          "Rebekah is barren, just like Sarah was for many years.",
          "This shows that the promise line continues only by God's help.",
          "Isaac prays for his wife instead of trying to force the promise another way.",
          "That matters because the family has already seen what human shortcuts can do.",
          "The promised family is not growing because everything is easy.",
          "It grows because God answers prayer.",
        ]),
      ],
      [
        "🌍 Two Nations Are In Thy Womb",
        note([
          "Rebekah is not only carrying twins.",
          "She is carrying the beginnings of two peoples.",
          "Jacob will become connected to Israel, and Esau will become connected to Edom.",
          "Their conflict starts before birth and continues through their descendants.",
          "This phrase helps the reader understand that the family struggle is also a national story.",
          "Genesis is showing how big future history can begin inside one household.",
        ]),
      ],
      [
        "🔄 The Elder Shall Serve The Younger",
        note([
          "This reverses normal ancient expectations.",
          "Usually the firstborn son received the main family status and inheritance.",
          "But God says the older will serve the younger.",
          "This prepares us for Jacob receiving the covenant blessing instead of Esau.",
          "Genesis often shows God working through the person people would not naturally choose.",
          "The promise moves by God's decision, not human birth order.",
        ]),
      ],
    ],
  },
  {
    chapter: 25,
    startVerse: 27,
    endVerse: 34,
    reference: "Genesis 25:27-34",
    title: "Esau Sells The Birthright",
    icon: "🥣",
    phrases: [
      [
        "🏹 Esau Was A Cunning Hunter",
        note([
          "Esau is described as a skilled outdoorsman.",
          "He is active, rugged, and connected to the field.",
          "That kind of strength would have looked impressive in a family that needed food and protection.",
          "Isaac loves Esau because of the venison he brings.",
          "The description sets Esau apart from Jacob.",
          "Genesis is preparing us to see two very different brothers.",
        ]),
      ],
      [
        "🏕️ Jacob Was A Plain Man",
        note([
          "Plain here does not mean boring.",
          "It can carry the idea of being quiet, settled, or complete in contrast with Esau's field life.",
          "Jacob stays around the tents, which means he is closer to the household world.",
          "This does not make Jacob innocent, because he will still act selfishly.",
          "But it shows the difference between the brothers' lives.",
          "Their personalities are already pulling them in different directions.",
        ]),
      ],
      [
        "🥣 Esau Despised His Birthright",
        note([
          "The birthright was the privilege and responsibility of the firstborn.",
          "It involved inheritance, family leadership, and in this family, connection to the covenant blessing.",
          "Esau trades it for one meal because he is driven by immediate hunger.",
          "The word despised means he treated something holy and valuable as if it were small.",
          "This is the real problem in the story.",
          "Esau does not simply lose the birthright; he shows he does not value it.",
        ]),
      ],
    ],
  },
  {
    chapter: 26,
    startVerse: 1,
    endVerse: 11,
    reference: "Genesis 26:1-11",
    title: "God Repeats The Promise To Isaac",
    icon: "📜",
    phrases: [
      [
        "🌾 There Was A Famine",
        note([
          "Isaac faces famine just like Abraham did.",
          "This reminds us that being in the promise does not mean life becomes problem-free.",
          "The land God promised can still experience hunger and pressure.",
          "Isaac must learn to trust God in his own generation.",
          "He cannot live only from Abraham's faith.",
          "The promise is continuing, but Isaac has to walk with God himself.",
        ]),
      ],
      [
        "📍 Sojourn In This Land",
        note([
          "God tells Isaac to stay in the land instead of going down to Egypt.",
          "Sojourn means to live as a temporary resident.",
          "Isaac still does not own the whole land, but God wants him present in it.",
          "The command teaches Isaac that safety is not only found by running to the strongest place.",
          "Safety is found where God tells him to be.",
          "God's promise is tied to obedience in the land.",
        ]),
      ],
      [
        "🙌 I Will Be With Thee",
        note([
          "This is one of the most comforting promises God gives Isaac.",
          "God does not only promise land and descendants.",
          "He promises His presence.",
          "Isaac is living in famine, surrounded by foreign people, and repeating some of Abraham's fears.",
          "God's answer is not a long explanation.",
          "It is the assurance that Isaac will not be alone.",
        ]),
      ],
      [
        "😨 She Is My Sister",
        note([
          "Isaac repeats the same kind of fear Abraham showed with Sarah.",
          "He lies about Rebekah because he is afraid the men of the place will kill him.",
          "This shows how family patterns can repeat when fear is not surrendered to God.",
          "Isaac has just heard God's promise, but fear still shapes his behavior.",
          "Genesis is honest about the weakness of the covenant family.",
          "God's faithfulness continues even when His people act out of fear.",
        ]),
      ],
    ],
  },
  {
    chapter: 26,
    startVerse: 12,
    endVerse: 22,
    reference: "Genesis 26:12-22",
    title: "Isaac Prospers And Reopens Wells",
    icon: "💧",
    phrases: [
      [
        "🌾 The Lord Blessed Him",
        note([
          "Isaac plants in the land during a hard season, and God blesses the harvest.",
          "The blessing is not presented as Isaac being smarter than everyone else.",
          "It is the Lord's favor on the son of the promise.",
          "This would have been a visible sign to the people around him.",
          "Even in famine, God can provide.",
          "Isaac's prosperity becomes evidence that God's word to him is active.",
        ]),
      ],
      [
        "😒 The Philistines Envied Him",
        note([
          "Isaac's blessing creates jealousy around him.",
          "This is a pattern in Genesis: blessing often brings attention, and attention can bring conflict.",
          "The Philistines see his flocks, herds, and servants increasing.",
          "Instead of celebrating, they feel threatened.",
          "This teaches that God's blessing does not always make life peaceful.",
          "Sometimes it exposes the insecurity of people nearby.",
        ]),
      ],
      [
        "💧 Digged Again The Wells",
        note([
          "Isaac reopens wells that had belonged to Abraham's household.",
          "Wells were life sources in dry land.",
          "By digging them again, Isaac is reconnecting with the inheritance and work of his father.",
          "The Philistines had stopped the wells, but Isaac does not abandon them.",
          "He restores what had been blocked.",
          "This is both practical survival and a sign that the promise line is continuing in the land.",
        ]),
      ],
      [
        "🌾 Rehoboth",
        note([
          "Rehoboth means open spaces or room.",
          "After conflict over other wells, Isaac finally reaches a place where there is no argument.",
          "He names the well from the relief of having room to flourish.",
          "This matters because Isaac does not win by fighting everyone.",
          "He keeps moving until God provides space.",
          "The name becomes a testimony that the Lord made room for him.",
        ]),
      ],
    ],
  },
  {
    chapter: 26,
    startVerse: 23,
    endVerse: 35,
    reference: "Genesis 26:23-35",
    title: "Peace At Beersheba",
    icon: "🤝",
    phrases: [
      [
        "🛡️ Fear Not",
        note([
          "God tells Isaac not to fear because fear has been a real struggle in this chapter.",
          "Isaac lied about Rebekah because he was afraid.",
          "He also faced conflict over wells and pressure from surrounding people.",
          "God speaks directly to the emotion underneath his choices.",
          "The reason Isaac does not need to fear is not that life is easy.",
          "It is that God is with him and remains faithful to Abraham's promise.",
        ]),
      ],
      [
        "⛺ He Builded An Altar",
        note([
          "Isaac responds to God's promise with worship.",
          "An altar marks a place where someone meets with God and calls on His name.",
          "This connects Isaac to Abraham, who also built altars in the land.",
          "Isaac is not just inheriting property or family stories.",
          "He is continuing the worship of the Lord.",
          "The promise line is spiritual before it is political or social.",
        ]),
      ],
      [
        "🤝 We Saw Certainly That The Lord Was With Thee",
        note([
          "Abimelech and his men recognize God's presence with Isaac.",
          "This is similar to what happened with Abraham.",
          "The surrounding people may not fully understand the covenant, but they can see that Isaac is protected and blessed.",
          "They want peace because they recognize the Lord's hand on him.",
          "This matters because God's presence becomes visible even to outsiders.",
          "Isaac's life is bearing witness beyond his own family.",
        ]),
      ],
      [
        "💔 A Grief Of Mind",
        note([
          "Esau's marriages bring grief to Isaac and Rebekah.",
          "This ending prepares the reader for the family conflict in the next chapter.",
          "Esau is already making choices that trouble the covenant household.",
          "Marriage in Genesis is not only romance; it affects worship, family direction, and future generations.",
          "The grief shows that Esau is drifting from the values of the promise line.",
          "The family tension is getting heavier.",
        ]),
      ],
    ],
  },
  {
    chapter: 27,
    startVerse: 1,
    endVerse: 10,
    reference: "Genesis 27:1-10",
    title: "Rebekah Plans The Deception",
    icon: "🎭",
    phrases: [
      [
        "👴 I Am Old, I Know Not The Day Of My Death",
        note([
          "Isaac believes his life may be near its end.",
          "That pushes him to prepare the blessing for Esau.",
          "The blessing was not a casual prayer.",
          "It carried family authority, inheritance, and covenant direction.",
          "Isaac knows God had spoken about the older serving the younger, but he still moves toward Esau.",
          "The scene begins with spiritual responsibility mixed with family favoritism.",
        ]),
      ],
      [
        "🥩 Make Me Savoury Meat",
        note([
          "Isaac asks Esau to prepare the food he loves before giving the blessing.",
          "Food is tied to Isaac's affection for Esau earlier in Genesis.",
          "This detail shows how personal preference is shaping a serious spiritual moment.",
          "Isaac's appetite is not the main issue, but it reveals his attachment.",
          "He is preparing to bless the son he prefers.",
          "The family problem is not only deception from Jacob; it is favoritism from everyone.",
        ]),
      ],
      [
        "👂 Rebekah Heard",
        note([
          "Rebekah hears Isaac's plan and immediately acts.",
          "She knows God's word about Jacob, but she chooses manipulation instead of trust.",
          "Her goal may line up with what God said, but her method is full of deception.",
          "Genesis is not praising her behavior.",
          "It shows a family trying to force the promise through control.",
          "When people use lies to protect God's promise, they reveal they do not fully trust God to keep it.",
        ]),
      ],
    ],
  },
  {
    chapter: 27,
    startVerse: 11,
    endVerse: 29,
    reference: "Genesis 27:11-29",
    title: "Jacob Receives The Blessing",
    icon: "👑",
    phrases: [
      [
        "🎭 I Shall Seem To Him As A Deceiver",
        note([
          "Jacob is worried about getting caught, not about whether the deception is wrong.",
          "That tells us something important about his heart in this moment.",
          "He understands the risk, but he does not refuse the plan.",
          "The word deceiver fits Jacob's story because his name is connected with grasping or supplanting.",
          "Jacob is becoming the kind of person his name suggests.",
          "God will still work through him, but not because Jacob is morally clean here.",
        ]),
      ],
      [
        "👕 Goodly Raiment",
        note([
          "Rebekah dresses Jacob in Esau's clothes.",
          "This is part of the disguise because Isaac's senses are weak, but smell and touch still matter.",
          "The clothing makes Jacob seem like someone he is not.",
          "That detail captures the whole scene.",
          "Jacob is receiving a blessing while covered in another man's identity.",
          "The family blessing is being passed through a moment filled with disguise.",
        ]),
      ],
      [
        "🗣️ The Voice Is Jacob's Voice, But The Hands Are The Hands Of Esau",
        note([
          "Isaac senses that something is wrong.",
          "He hears Jacob's voice but feels Esau's hands.",
          "The line creates tension because the deception is almost exposed.",
          "Isaac is physically blind, but the whole family is spiritually clouded in different ways.",
          "Jacob lies, Rebekah manipulates, Isaac pushes toward Esau, and Esau has already despised the birthright.",
          "Genesis lets us feel how messy the covenant family has become.",
        ]),
      ],
      [
        "🌾 God Give Thee Of The Dew Of Heaven",
        note([
          "The blessing includes fertility, abundance, authority, and family rule.",
          "Dew mattered in a dry land because it helped crops survive.",
          "Isaac is blessing Jacob with provision from heaven and fruitfulness from the earth.",
          "The words echo the larger promise of land, seed, and blessing.",
          "Even though the situation is messy, the blessing itself points to covenant future.",
          "God's plan continues through a deeply flawed family moment.",
        ]),
      ],
    ],
  },
  {
    chapter: 27,
    startVerse: 30,
    endVerse: 46,
    reference: "Genesis 27:30-46",
    title: "Esau Loses The Blessing",
    icon: "💔",
    phrases: [
      [
        "😭 A Great And Exceeding Bitter Cry",
        note([
          "Esau's reaction is heartbreaking.",
          "He finally feels the weight of what has happened.",
          "Earlier he treated the birthright lightly, but now he desperately wants the blessing.",
          "The cry shows grief, shock, and anger all at once.",
          "Genesis does not make Esau a flat villain.",
          "He is responsible for his choices, but his pain is still real.",
        ]),
      ],
      [
        "🙏 Hast Thou But One Blessing?",
        note([
          "Esau begs for another blessing from Isaac.",
          "In that culture, a spoken blessing from the father carried serious meaning.",
          "It was not treated like a casual wish that could simply be repeated the same way.",
          "Esau realizes the main family blessing has gone to Jacob.",
          "His question shows the ache of feeling shut out.",
          "This moment is the painful result of years of favoritism, appetite, and rivalry.",
        ]),
      ],
      [
        "⚔️ By Thy Sword Shalt Thou Live",
        note([
          "Isaac's words over Esau describe a harder future.",
          "Esau's descendants, the Edomites, will often live in tension with Israel.",
          "The sword points to conflict, struggle, and survival by strength.",
          "This is not the same covenant blessing Jacob received.",
          "It shows that Esau will have a future, but not the same role in the promise line.",
          "The family conflict will echo through generations.",
        ]),
      ],
      [
        "🏃 Jacob Must Flee",
        note([
          "Jacob gets the blessing, but he does not get peace.",
          "His deception forces him to leave home.",
          "This is one of the deep ironies of the chapter.",
          "Jacob receives what he wanted, but he loses his family life for years.",
          "Sin often gives a person the thing they chased while taking more than they expected.",
          "The promise continues, but Jacob's path will now include exile and consequences.",
        ]),
      ],
    ],
  },
  {
    chapter: 28,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 28:1-9",
    title: "Jacob Leaves Home",
    icon: "🧳",
    phrases: [
      [
        "🚫 Take Not A Wife Of The Daughters Of Canaan",
        note([
          "Isaac sends Jacob away with a command about marriage.",
          "This repeats the concern Abraham had for Isaac.",
          "The covenant family must not be shaped by the worship and values of the Canaanites.",
          "Marriage is connected to the future of the promise.",
          "Jacob is leaving because of danger, but he is also being sent toward the family line where a wife can be found.",
          "God is using even this messy situation to move the story forward.",
        ]),
      ],
      [
        "🙌 God Almighty Bless Thee",
        note([
          "Isaac now knowingly blesses Jacob.",
          "This is different from the deception scene in chapter 27.",
          "Here Isaac speaks directly over Jacob with covenant language.",
          "God Almighty is the name connected to God's power to fulfill what He promises.",
          "Jacob is leaving home with family conflict behind him, but he is not leaving without blessing.",
          "The promise is being confirmed over him.",
        ]),
      ],
      [
        "👀 Esau Saw",
        note([
          "Esau notices that Isaac does not want Jacob marrying Canaanite women.",
          "He tries to respond by marrying into Ishmael's family.",
          "But the action feels like an attempt to fix his standing after the fact.",
          "Esau understands part of the problem, but not the deeper covenant issue.",
          "He is still reacting instead of walking in real spiritual wisdom.",
          "Genesis shows how people can try to repair consequences without truly changing direction.",
        ]),
      ],
    ],
  },
  {
    chapter: 28,
    startVerse: 10,
    endVerse: 22,
    reference: "Genesis 28:10-22",
    title: "Jacob Dreams At Bethel",
    icon: "🪜",
    phrases: [
      [
        "🪨 A Certain Place",
        note([
          "Jacob stops for the night in what seems like an ordinary place.",
          "He is away from home, vulnerable, and probably unsure of his future.",
          "Nothing about the place looks special at first.",
          "But God meets him there.",
          "This matters because God's presence is not limited to safe or familiar places.",
          "Jacob is running from consequences, and God still comes near.",
        ]),
      ],
      [
        "🪜 A Ladder Set Up On The Earth",
        note([
          "Jacob sees a stairway or ladder reaching between earth and heaven.",
          "Angels are moving on it, showing connection between God's realm and Jacob's world.",
          "Jacob may feel alone, but heaven is not closed over him.",
          "God is showing that His care and activity reach into Jacob's journey.",
          "Later, Jesus uses similar language in John 1, pointing to Himself as the true meeting place between heaven and earth.",
          "The dream shows that God is present and active even when Jacob is displaced.",
        ]),
      ],
      [
        "🌍 All Families Of The Earth",
        note([
          "God repeats the promise given to Abraham.",
          "Jacob's family will not be blessed only for itself.",
          "Through this family, blessing will reach all families of the earth.",
          "That is much bigger than Jacob's personal survival.",
          "God is carrying forward a worldwide purpose through one messy family line.",
          "The promise keeps pointing beyond Genesis toward the blessing that will come through Christ.",
        ]),
      ],
      [
        "📍 Bethel",
        note([
          "Bethel means house of God.",
          "Jacob names the place because he realizes God was there.",
          "He thought he was sleeping in a random location, but he had been standing at a holy meeting place.",
          "The name becomes a memory marker.",
          "Jacob's journey away from home begins with a reminder that the Lord has not left him.",
          "God's house can appear in the wilderness of a person's life.",
        ]),
      ],
    ],
  },
  {
    chapter: 29,
    startVerse: 1,
    endVerse: 14,
    reference: "Genesis 29:1-14",
    title: "Jacob Meets Rachel",
    icon: "💧",
    phrases: [
      [
        "💧 A Well In The Field",
        note([
          "Once again, a well becomes an important meeting place in Genesis.",
          "Abraham's servant met Rebekah at a well, and now Jacob meets Rachel near a well.",
          "Wells were social places because people needed water for families and flocks.",
          "This setting connects Jacob's story to Isaac's marriage story.",
          "But this time Jacob is not represented by a servant.",
          "He is alone, far from home, and stepping into his own future.",
        ]),
      ],
      [
        "🐑 Rachel Came With Her Father's Sheep",
        note([
          "Rachel is introduced while working.",
          "She is caring for her father's flock, which shows responsibility and daily labor.",
          "Genesis often reveals character through ordinary actions before giving long descriptions.",
          "Rachel is not introduced in a palace or dramatic speech.",
          "She appears in the rhythm of real life.",
          "This is where Jacob's next chapter begins.",
        ]),
      ],
      [
        "😭 Jacob Kissed Rachel, And Lifted Up His Voice, And Wept",
        note([
          "Jacob's reaction is emotional and intense.",
          "He has traveled far, left home under threat, and finally found family.",
          "The tears may carry relief, exhaustion, hope, and loneliness all together.",
          "This moment is not only romantic.",
          "It is the feeling of a displaced man realizing he has reached the household connected to his future.",
          "Genesis lets us feel the human side of the promise story.",
        ]),
      ],
    ],
  },
  {
    chapter: 29,
    startVerse: 15,
    endVerse: 30,
    reference: "Genesis 29:15-30",
    title: "Laban Deceives Jacob",
    icon: "🎭",
    phrases: [
      [
        "⏳ I Will Serve Thee Seven Years",
        note([
          "Jacob agrees to work seven years for Rachel.",
          "In that culture, marriage involved family arrangements and bride price.",
          "Jacob has little to offer after leaving home, so his labor becomes the payment.",
          "Seven years is a long commitment, but Jacob's love for Rachel makes it feel light to him.",
          "The line shows both devotion and vulnerability.",
          "Jacob is now in someone else's household, depending on Laban's honesty.",
        ]),
      ],
      [
        "🌅 In The Morning, Behold, It Was Leah",
        note([
          "This is one of the strongest reversals in Jacob's life.",
          "The deceiver is now deceived.",
          "Jacob once used darkness, clothing, and blindness to take Esau's blessing.",
          "Now Laban uses the darkness of the wedding night to switch Leah for Rachel.",
          "Genesis is not saying every suffering is direct punishment, but it clearly lets us see the irony.",
          "Jacob is tasting the pain of deception from the other side.",
        ]),
      ],
      [
        "💔 He Loved Rachel More Than Leah",
        note([
          "This phrase sets up years of family pain.",
          "Jacob has two wives, but his heart is clearly fixed on Rachel.",
          "Leah is in the marriage, but she is not loved the same way.",
          "That emotional imbalance will shape the births, rivalries, and household tension that follow.",
          "Genesis does not romanticize polygamy.",
          "It shows the grief, competition, and wounds that grow inside it.",
        ]),
      ],
    ],
  },
  {
    chapter: 29,
    startVerse: 31,
    endVerse: 35,
    reference: "Genesis 29:31-35",
    title: "God Sees Leah",
    icon: "👀",
    phrases: [
      [
        "👀 When The Lord Saw Leah Was Hated",
        note([
          "Hated here means Leah is unloved or loved less compared with Rachel.",
          "The Lord sees what Jacob's household has made painful for her.",
          "Leah may feel unwanted, but she is not invisible to God.",
          "This is important because Genesis often shows God noticing the overlooked person.",
          "He saw Hagar in distress, and now He sees Leah in rejection.",
          "God's compassion reaches the person the family system pushes aside.",
        ]),
      ],
      [
        "👶 He Opened Her Womb",
        note([
          "Children were deeply important in the ancient world.",
          "They carried family future, security, honor, and inheritance.",
          "God gives Leah sons in the middle of her pain.",
          "This does not erase the hurt of being unloved by Jacob.",
          "But it shows that God is dealing kindly with her.",
          "The rejected wife becomes a major mother in the story of Israel.",
        ]),
      ],
      [
        "🙌 Judah",
        note([
          "Judah's name is connected to praise.",
          "Leah's earlier sons are named with language about hoping Jacob will love her.",
          "But with Judah, her words turn toward praising the Lord.",
          "That shift matters.",
          "Judah will later become one of the most important tribes in the Bible.",
          "Kings will come from Judah, and Christians see Jesus Himself coming from Judah's line.",
        ]),
      ],
    ],
  },
  {
    chapter: 30,
    startVerse: 1,
    endVerse: 13,
    reference: "Genesis 30:1-13",
    title: "Rachel's Pain And Household Rivalry",
    icon: "💔",
    phrases: [
      [
        "💔 Give Me Children, Or Else I Die",
        note([
          "Rachel's words show deep pain, not calm theology.",
          "She is loved by Jacob, but she is barren while Leah is having sons.",
          "In that culture, childlessness carried emotional pain and social pressure.",
          "Rachel feels desperate because the one thing she wants most is not happening.",
          "The phrase helps us see that jealousy often grows from a real wound.",
          "Rachel's pain is real, but it begins to turn into rivalry.",
        ]),
      ],
      [
        "⚖️ Am I In God's Stead?",
        note([
          "Jacob's response points out that only God can give life.",
          "He cannot open Rachel's womb by force or frustration.",
          "The words are true, but the tone of the scene is tense.",
          "Jacob is angry, Rachel is desperate, and the household is strained.",
          "Genesis shows how painful it becomes when people demand from each other what only God can give.",
          "The family needs God, but they keep turning on one another.",
        ]),
      ],
      [
        "👶 She Shall Bear Upon My Knees",
        note([
          "Rachel gives Bilhah to Jacob so children born through Bilhah can be counted in Rachel's household.",
          "This was an ancient custom, but that does not make it emotionally healthy.",
          "It echoes Sarah giving Hagar to Abraham.",
          "Once again, a family tries to solve barrenness through a human arrangement.",
          "The result is more rivalry, not peace.",
          "Genesis is showing the damage that grows when people use others to secure what they fear losing.",
        ]),
      ],
    ],
  },
  {
    chapter: 30,
    startVerse: 14,
    endVerse: 24,
    reference: "Genesis 30:14-24",
    title: "God Remembers Rachel",
    icon: "🌿",
    phrases: [
      [
        "🌿 Mandrakes",
        note([
          "Mandrakes were plants people in the ancient world often connected with fertility or desire.",
          "That is why Rachel wants them so badly.",
          "The detail may sound strange, but it shows how desperate Rachel is to have a child.",
          "She is reaching for anything that might help.",
          "Genesis includes this because the household has become full of bargaining and competition.",
          "But the birth that matters most will come because God remembers Rachel, not because mandrakes have power.",
        ]),
      ],
      [
        "👂 God Hearkened Unto Leah",
        note([
          "God continues to hear Leah in the middle of the family struggle.",
          "Leah is not the favored wife, but she is still cared for by the Lord.",
          "The births of Issachar and Zebulun show that God is still active in her story.",
          "This matters because people often measure worth by who loves them most.",
          "Genesis shows that God's attention is not controlled by human favoritism.",
          "Leah is seen, heard, and included in the future of Israel.",
        ]),
      ],
      [
        "🧠 God Remembered Rachel",
        note([
          "When the Bible says God remembered, it does not mean He had forgotten.",
          "It means God turned His covenant care into action.",
          "Rachel's waiting had been long and painful.",
          "Now God opens her womb and Joseph is born.",
          "This phrase teaches that God's remembering is active and merciful.",
          "Rachel's story changes because God acts, not because the rivalry finally worked.",
        ]),
      ],
      [
        "👶 Joseph",
        note([
          "Joseph's name is connected with the idea of adding.",
          "Rachel says the Lord shall add another son to her.",
          "That longing will later be fulfilled in Benjamin, but Joseph himself will become one of the biggest figures in Genesis.",
          "His birth may look like one more child in a crowded family story.",
          "But God is quietly introducing the son He will use to preserve the family during famine.",
          "Joseph's story begins inside pain, prayer, and God's mercy.",
        ]),
      ],
    ],
  },
  {
    chapter: 30,
    startVerse: 25,
    endVerse: 43,
    reference: "Genesis 30:25-43",
    title: "Jacob's Flocks Increase",
    icon: "🐑",
    phrases: [
      [
        "🏠 Send Me Away",
        note([
          "After Joseph is born, Jacob wants to return to his own land.",
          "He has served Laban for many years and now has a large family.",
          "The promise given at Bethel still points Jacob back toward Canaan.",
          "This phrase shows that Jacob is not meant to stay forever in Laban's house.",
          "His time there has shaped him, humbled him, and grown his household.",
          "But the covenant story belongs back in the land God promised.",
        ]),
      ],
      [
        "🙌 The Lord Hath Blessed Me For Thy Sake",
        note([
          "Laban admits that his own prosperity is connected to Jacob's presence.",
          "This echoes God's promise that Abraham's family would be a source of blessing.",
          "Even Laban benefits because the covenant line is in his household.",
          "But Laban also wants to keep Jacob for his own gain.",
          "The phrase shows both God's blessing and Laban's self-interest.",
          "People can recognize blessing and still try to use it selfishly.",
        ]),
      ],
      [
        "🐐 Speckled And Spotted",
        note([
          "Jacob asks for the unusually marked animals as his wages.",
          "This seems like a modest request because most animals would have been solid-colored.",
          "Laban likely thinks he is getting the better deal.",
          "But Jacob's flocks increase anyway.",
          "The details of the breeding scene can feel strange to modern readers, but the main point is clear.",
          "God is making Jacob prosper even under a difficult and controlling employer.",
        ]),
      ],
      [
        "📈 The Man Increased Exceedingly",
        note([
          "Jacob becomes very prosperous with flocks, servants, camels, and donkeys.",
          "This fulfills the pattern of blessing God has been placing on Abraham's family.",
          "Jacob is not morally perfect, and his methods are not always easy to understand.",
          "But Genesis is showing that Laban cannot stop God's purpose.",
          "The man who arrived with almost nothing is now leaving with abundance.",
          "God is preparing Jacob to return to the land as the father of a growing household.",
        ]),
      ],
    ],
  },
];

export const GENESIS_21_30_PERSONAL_SECTIONS = expandSplitSections(RAW_GENESIS_21_30_PERSONAL_SECTIONS);
