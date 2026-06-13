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

type PersonalTextureRule = {
  matches: string[];
  lines: string[];
};

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

const GENESIS_21_30_TEXTURE_RULES: PersonalTextureRule[] = [
  {
    matches: ["as he had said", "set time", "made me to laugh"],
    lines: [
      "Let the birth scene land with its full joy:",
      "⏳ Long wait.",
      "👵 Impossible body.",
      "👶 Promised son.",
      "😂 Laughter turned from doubt into worship.",
      "Isaac is not just a baby in the story. He is proof that God's word can outlive every human limit.",
    ],
  },
  {
    matches: ["son of hagar", "bondwoman", "god heard", "opened her eyes"],
    lines: [
      "Watch how God treats the pushed-out people:",
      "🚪 Sent away.",
      "🏜️ Out of water.",
      "😭 Crying in the wilderness.",
      "💧 Shown a well.",
      "The household fails Hagar and Ishmael, but God does not abandon them in the empty place.",
    ],
  },
  {
    matches: ["only son", "moriah", "god will provide", "ram", "jehovahjireh"],
    lines: [
      "This chapter moves with holy tension:",
      "❤️ Isaac is loved.",
      "⛰️ Moriah is costly.",
      "🪵 The wood is carried.",
      "🐏 The substitute is provided.",
      "Genesis is teaching sacrifice and mercy in the same breath.",
    ],
  },
  {
    matches: ["buryingplace", "machpelah", "ephron", "field"],
    lines: [
      "The legal details matter more than they first look:",
      "💔 Sarah dies.",
      "🧾 Abraham negotiates publicly.",
      "⚖️ The silver is weighed.",
      "📍 The field becomes sure.",
      "The promise family owns only a burial place, but even that grave says Canaan is still the land of promise.",
    ],
  },
  {
    matches: ["hand under", "well", "rebekah", "i will go", "veil"],
    lines: [
      "Follow the providence in ordinary steps:",
      "🤝 A servant is sent.",
      "🙏 A prayer is made.",
      "💧 A woman draws water.",
      "🎁 A family answers.",
      "🚶 Rebekah chooses to go.",
      "God guides the covenant family through faithful action, not through flashy noise.",
    ],
  },
  {
    matches: ["two nations", "elder shall serve", "birthright", "red pottage"],
    lines: [
      "The twins carry a family conflict before they can even speak:",
      "🤰 Struggle in the womb.",
      "🌍 Two nations.",
      "🔁 The older-younger order reversed.",
      "🍲 A birthright treated like a snack.",
      "Genesis is showing that appetite, promise, and character are already colliding.",
    ],
  },
  {
    matches: ["gerar", "my sister", "rehoboth", "beersheba", "grieved"],
    lines: [
      "Isaac's chapter has a pattern worth seeing:",
      "🌾 Famine tests him.",
      "😨 Fear exposes him.",
      "💧 Wells are contested.",
      "🕊️ Room is finally made.",
      "🪨 An altar anchors the promise.",
      "The son of promise still has to learn trust in ordinary pressure.",
    ],
  },
  {
    matches: ["venison", "voice", "hands", "bitter cry", "flee"],
    lines: [
      "The blessing scene is painfully layered:",
      "👁️ Isaac cannot see.",
      "🍲 Rebekah schemes.",
      "🐐 Jacob disguises himself.",
      "😭 Esau breaks when he learns the truth.",
      "🏃 The family fractures and Jacob has to run.",
      "Genesis does not hide the damage caused when people try to force blessing through deceit.",
    ],
  },
  {
    matches: ["ladder", "bethel", "god is in this place", "pillar", "tithe"],
    lines: [
      "Jacob's lonely night becomes holy ground:",
      "🪨 A stone for a pillow.",
      "🪜 A ladder between heaven and earth.",
      "📣 God repeats the promise.",
      "📍 Bethel gets its name.",
      "Jacob is not chasing God here. God meets him while he is running.",
    ],
  },
  {
    matches: ["seven years", "leah", "rachel", "mandrakes", "joseph", "increased exceedingly"],
    lines: [
      "The household keeps getting more complicated:",
      "💍 Love and deception.",
      "💔 Leah seen and unloved.",
      "😣 Rachel envying.",
      "👶 Sons being named out of pain and hope.",
      "📈 Jacob prospering under pressure.",
      "God is building Israel's family through real people, not polished statues.",
    ],
  },
];

function addGenesisTwentyOneToThirtyTexture(section: PersonalGenesisPhraseSectionInput, title: string, content: string) {
  if (section.chapter >= 25) {
    return content;
  }

  const lower = title.toLowerCase();
  const rule = GENESIS_21_30_TEXTURE_RULES.find((item) => item.matches.some((match) => lower.includes(match)));

  if (!rule) {
    return content;
  }

  return `${content}\n\n${note(rule.lines)}`;
}

function addGenesisTwentyOneToThirtySectionTexture(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [title, addGenesisTwentyOneToThirtyTexture(section, title, content)] as [string, string]),
  }));
}

const GENESIS_21_30_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  25: ["🧬 The family line is moving forward.", "👶 The promise is passing to the next generation.", "⚖️ Choices reveal what people value."],
  26: ["🌾 Famine tests trust.", "💧 Wells show conflict and provision.", "🤝 God keeps the promise He made."],
  27: ["👂 Secret plans shape the scene.", "🎭 Deception wounds the family.", "🙏 The blessing still matters."],
  28: ["🪜 God meets Jacob on the road.", "📍 A place becomes a memory of worship.", "🧭 The promise travels with Jacob."],
  29: ["💧 The well becomes a meeting place.", "💔 Love, labor, and rejection mix together.", "👶 God sees the overlooked."],
  30: ["💔 Comparison keeps hurting the family.", "👶 Children are named inside pain and hope.", "🐑 God provides through ordinary work."],
};

function hasVisualList(content: string) {
  return content
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function stripGenesisTwentyOneToThirtyPhraseEmoji(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getGenesisTwentyOneToTwentyFourStudyTheme(section: PersonalGenesisPhraseSectionInput) {
  if (section.chapter === 21) {
    return {
      matters: "Genesis 21 shows the promised child arriving after years of waiting.",
      theme: "God keeps His covenant promises while also showing mercy to people who feel cast out and afraid.",
    };
  }

  if (section.chapter === 22) {
    return {
      matters: "Genesis 22 tests whether Abraham trusts the Giver more than the gift he waited so long to receive.",
      theme: "The chapter teaches faith, surrender, substitution, and the LORD providing what His people cannot provide for themselves.",
    };
  }

  if (section.chapter === 23) {
    return {
      matters: "Sarah's death turns the land promise into something Abraham must still believe while standing beside a grave.",
      theme: "God's promises remain true even when His people are grieving and waiting for fulfillment.",
    };
  }

  if (section.chapter === 24) {
    return {
      matters: "Genesis 24 shows the promise moving to the next generation through prayer, providence, character, and willing obedience.",
      theme: "God guides ordinary decisions while preserving His covenant promise from one generation to the next.",
    };
  }

  return {
    matters: "The promise story moves forward through real decisions, family tension, and God's steady faithfulness.",
    theme: "God's plan keeps moving through ordinary people who must learn to trust His word.",
  };
}

function getGenesisTwentyOneToTwentyFourPhraseFocus(section: PersonalGenesisPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (lower.includes("visited") || lower.includes("as he had said") || lower.includes("set time") || lower.includes("isaac")) {
    return "\u{23F3} Long wait\n\n\u{1F475} Impossible body\n\n\u{1F476} Promised son\n\n\u{1F602} Laughter turned from doubt into worship\n\nIsaac is proof that God's word can outlive every human limit.";
  }

  if (lower.includes("laug") || lower.includes("mock")) {
    return "\u{1F602} Joy and laughter\n\n\u{1F494} Family tension\n\n\u{1F476} The promised child\n\nThe wording uses emotion to show what is happening inside the family.";
  }

  if (lower.includes("hagar") || lower.includes("ishmael") || lower.includes("lad") || lower.includes("water")) {
    return "\u{1F3DC}\u{FE0F} Wilderness\n\n\u{1F4A7} Water needed\n\n\u{1F442} God hears\n\n\u{1F440} God sees\n\nHagar and Ishmael do not become side characters who disappear; God provides for them in the wilderness.";
  }

  if (lower.includes("covenant") || lower.includes("oath") || lower.includes("swear") || lower.includes("beersheba")) {
    return "\u{1F91D} Public agreement\n\n\u{1F4DC} Spoken promise\n\n\u{1F4CD} A place remembered\n\nThe words show peace being made through public commitment.";
  }

  if (lower.includes("tempt") || lower.includes("prove") || lower.includes("offer") || lower.includes("only son") || lower.includes("moriah")) {
    return "\u{2764}\u{FE0F} Isaac is loved\n\n\u{26F0}\u{FE0F} Moriah is costly\n\n\u{1FAB5} The wood is carried\n\n\u{1F40F} The substitute will be provided\n\nThe test touches the very promise Abraham has been trusting.";
  }

  if (lower.includes("lamb") || lower.includes("ram") || lower.includes("provided") || lower.includes("instead")) {
    return "\u{1F40F} A substitute\n\n\u{1FAB5} An altar\n\n\u{1F64C} The LORD provides\n\nThe LORD provides a substitute in the place where death seemed certain.";
  }

  if (lower.includes("blessing") || lower.includes("seed") || lower.includes("stars") || lower.includes("sand")) {
    return "\u{1F30C} Stars\n\n\u{1F3D6}\u{FE0F} Sand\n\n\u{1F476} Descendants\n\n\u{1F30D} Blessing for nations\n\nThe promise stretches far beyond one family moment.";
  }

  if (lower.includes("sarah") || lower.includes("died") || lower.includes("mourn") || lower.includes("bury")) {
    return "\u{1F494} Grief\n\n\u{26B0}\u{FE0F} Burial\n\n\u{1F4CD} The promised land\n\nGrief is part of the covenant story, not an interruption of it.";
  }

  if (lower.includes("field") || lower.includes("cave") || lower.includes("machpelah") || lower.includes("possession")) {
    return "\u{1F4CD} Land\n\n\u{26B0}\u{FE0F} A burial place\n\n\u{1F9FE} A public purchase\n\nAbraham owns only a burial place, yet he still believes God will give the land to his descendants.";
  }

  if (lower.includes("servant") || lower.includes("pray") || lower.includes("lord god") || lower.includes("kindness")) {
    return "\u{1F64F} Prayer\n\n\u{1F6B6} Obedience\n\n\u{1F4A7} A well\n\n\u{1F64C} God's guidance\n\nThe servant depends on God in an ordinary decision.";
  }

  if (lower.includes("rebekah") || lower.includes("damsel") || lower.includes("draw water") || lower.includes("camels")) {
    return "\u{1F4A7} Water drawn\n\n\u{1F42A} Camels served\n\n\u{1F4AA} Generous action\n\nRebekah's character is revealed through what she does.";
  }

  if (lower.includes("go with this man") || lower.includes("i will go") || lower.includes("blessed rebekah")) {
    return "\u{1F6B6} Leaving home\n\n\u{1F932} Willing response\n\n\u{1F4DC} Promise moving forward\n\nThe promise moves forward through willing response, not only through family arrangement.";
  }

  return "\u{1F50E} A detail to notice\n\n\u{1F4D6} A piece of the story\n\n\u{1F9ED} A clue for understanding the passage\n\nThe wording explains how this moment carries the promise story forward instead of merely filling space.";
}
function hasGenesisTwentyOneToThirtyTeachingLayer(content: string) {
  return /matters|important|reveals|shows|teaches|connects|larger bible|covenant|promise|faith|obedience|judgment|mercy|worship|blessing|sin|redemption|identity|reader sees|reader understands/i.test(content);
}

function hasGenesisTwentyOneToThirtyVisualBlock(content: string) {
  return content
    .split("\n\n")
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function getGenesisTwentyFiveToThirtyPhraseFocus(section: PersonalGenesisPhraseSectionInput, cleanTitle: string) {
  const lower = `${section.title} ${cleanTitle}`.toLowerCase();

  if (lower.includes("abraham") || lower.includes("isaac") || lower.includes("buried") || lower.includes("died")) {
    return "\u{1F4DC} Promise history\n\n\u{26B0}\u{FE0F} Death and burial\n\n\u{1F476} The next generation\n\nGenesis shows the covenant story moving forward after Abraham's death.";
  }

  if (lower.includes("rebekah") || lower.includes("womb") || lower.includes("twins") || lower.includes("jacob") || lower.includes("esau")) {
    return "\u{1F476} Children in the promise family\n\n\u{1F494} Family tension beginning early\n\n\u{1F4DC} God's word before the outcome is visible\n\nThe story is showing that the next generation will also need God's promise and mercy.";
  }

  if (lower.includes("birthright") || lower.includes("blessing") || lower.includes("firstborn") || lower.includes("sold")) {
    return "\u{1F35E} Immediate hunger\n\n\u{1F4DC} A family inheritance\n\n\u{2696}\u{FE0F} A choice that reveals value\n\nGenesis is showing what each son values when pressure exposes the heart.";
  }

  if (lower.includes("famine") || lower.includes("gerar") || lower.includes("philistines") || lower.includes("egypt")) {
    return "\u{26A0}\u{FE0F} Pressure in the land\n\n\u{1F4CD} A real place\n\n\u{1F6E1}\u{FE0F} God guarding the promise\n\nThe promise family is tested by need, fear, and life among other peoples.";
  }

  if (lower.includes("well") || lower.includes("water") || lower.includes("digged") || lower.includes("rehoboth")) {
    return "\u{1F4A7} Water for life\n\n\u{26CF}\u{FE0F} Work and conflict\n\n\u{1F4CD} Room in the land\n\nThe wells show ordinary survival, dispute, and God's provision in the promised land.";
  }

  if (lower.includes("dream") || lower.includes("ladder") || lower.includes("bethel") || lower.includes("angels")) {
    return "\u{1F4AD} A dream in the night\n\n\u{1FA9C} Heaven and earth connected\n\n\u{1F4CD} A place renamed by encounter\n\nGod meets Jacob while he is on the road, not after he has become impressive.";
  }

  if (lower.includes("laban") || lower.includes("rachel") || lower.includes("leah") || lower.includes("served") || lower.includes("seven years")) {
    return "\u{1F494} Love and disappointment\n\n\u{23F3} Years of labor\n\n\u{1F3E0} Family complexity\n\nJacob enters a household where desire, deception, and waiting shape the story.";
  }

  if (lower.includes("bare") || lower.includes("conceived") || lower.includes("son") || lower.includes("daughter") || lower.includes("maid")) {
    return "\u{1F476} Children being born\n\n\u{1F494} Pain and rivalry\n\n\u{1F64C} God seeing the overlooked\n\nGenesis is building Israel's family through real people with real wounds.";
  }

  if (lower.includes("flock") || lower.includes("cattle") || lower.includes("speckled") || lower.includes("ringstraked")) {
    return "\u{1F411} Flocks and wages\n\n\u{1F4C8} Increase under pressure\n\n\u{1F6E1}\u{FE0F} God providing despite Laban\n\nJacob's prosperity is not just cleverness; Genesis later connects it to God's care.";
  }

  return "\u{1F4D6} The story keeps moving\n\n\u{1F9ED} The wording gives direction\n\n\u{1F64C} God is still carrying the promise\n\nThis phrase helps the reader follow how ordinary details become part of the larger Genesis story.";
}
function cleanGenesisTwentyOneToThirtyBoilerplate(content: string) {
  const seen = new Set<string>();
  return note(
    content
      .split("\n\n")
      .map((line) =>
        line
          .replace(/^This phrase matters because /, "")
          .replace(/^This matters because /, "")
          .replace(/^That matters because /, "")
          .replace(/^It connects to the larger Bible theme that /, "")
          .replace(/^It connects to the larger Bible theme of /, "")
          .replace(/^The wording deserves attention because /, "")
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

function deepenGenesisTwentyOneToTwentyFourPhraseExplanation(
  section: PersonalGenesisPhraseSectionInput,
  title: string,
  content: string,
) {
  if (section.chapter < 21 || section.chapter > 24) return content;

  const cleanedContent = cleanGenesisTwentyOneToThirtyBoilerplate(content);
  const lines = cleanedContent.split("\n\n").filter(Boolean);
  const hasTeachingLayer = hasGenesisTwentyOneToThirtyTeachingLayer(cleanedContent);
  const hasVisualBlock = hasGenesisTwentyOneToThirtyVisualBlock(cleanedContent);
  if (lines.length >= 6 && hasTeachingLayer && hasVisualBlock) return cleanedContent;

  const cleanTitle = stripGenesisTwentyOneToThirtyPhraseEmoji(title);
  const focus = getGenesisTwentyOneToTwentyFourPhraseFocus(section, cleanTitle);
  const additions = [
    hasVisualBlock ? "" : focus,
  ].filter((line) => line && !cleanedContent.includes(line));

  return note([...lines, ...additions]);
}

function deepenGenesisTwentyFiveToThirtyPhraseExplanation(
  section: PersonalGenesisPhraseSectionInput,
  title: string,
  content: string,
) {
  if (section.chapter < 25 || section.chapter > 30) return content;

  const cleanedContent = cleanGenesisTwentyOneToThirtyBoilerplate(content);
  const hasVisualBlock = hasGenesisTwentyOneToThirtyVisualBlock(cleanedContent);
  if (hasVisualBlock) return cleanedContent;

  const cleanTitle = stripGenesisTwentyOneToThirtyPhraseEmoji(title);
  const focus = getGenesisTwentyFiveToThirtyPhraseFocus(section, cleanTitle);
  return note([cleanedContent, focus].filter(Boolean));
}

function formatGenesisTwentyOneToThirtyPhraseExplanation(
  section: PersonalGenesisPhraseSectionInput,
  title: string,
  content: string,
) {
  return deepenGenesisTwentyFiveToThirtyPhraseExplanation(
    section,
    title,
    deepenGenesisTwentyOneToTwentyFourPhraseExplanation(section, title, content),
  );
}

function formatGenesisTwentyOneToThirtySectionExplanations(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [
      title,
      formatGenesisTwentyOneToThirtyPhraseExplanation(section, title, content),
    ] as [string, string]),
  }));
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

const EXPANDED_GENESIS_21_24_PERSONAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 21,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 21:1-7",
    title: "Isaac Is Born",
    icon: "👶",
    phrases: [
      phrase("👑 The LORD Visited Sarah", ["The birth of Isaac begins with God's action, not human ability.", "Visited means the Lord turned toward Sarah with faithful care.", "God did not forget the woman who laughed, waited, and wondered if the promise was too late."]),
      phrase("🗣️ As He Had Said", ["Genesis ties Isaac's birth directly to God's word.", "The promise looked impossible, but the Lord did exactly what He said.", "This phrase teaches readers to connect fulfillment back to God's speech."]),
      phrase("📜 As He Had Spoken", ["The repetition is intentional.", "God's promise was not vague hope; it was spoken commitment.", "Isaac is proof that God's word can survive long waiting and impossible circumstances."]),
      phrase("🤰 Sarah Conceived", ["Sarah's body becomes the place where promise becomes visible.", "The once-barren woman now carries the covenant son.", "God's faithfulness enters real family life, not just religious language."]),
      phrase("👴 In His Old Age", ["Abraham's age makes the miracle louder.", "The story wants us to know Isaac cannot be explained by ordinary strength.", "The older Abraham is, the clearer God's power appears."]),
      phrase("⏳ At The Set Time", ["God's promises have timing.", "The waiting was long, but the birth was not late.", "Isaac arrives when God had appointed, not when Abraham and Sarah could control it."]),
      phrase("👶 Called His Son's Name Isaac", ["Isaac means laughter.", "The name keeps the family's story in their mouths.", "Every time they say Isaac, they remember that God turned impossible promise into joy."]),
      phrase("✂️ Abraham Circumcised His Son Isaac", ["Abraham marks Isaac with the covenant sign.", "The promised son is not only celebrated; he is placed under God's covenant command.", "Joy and obedience belong together here."]),
      phrase("📅 Eight Days Old", ["The timing matters because God commanded circumcision on the eighth day.", "Abraham obeys precisely after receiving the miracle.", "God's gift does not make God's command optional."]),
      phrase("✅ As God Had Commanded Him", ["Abraham responds to fulfilled promise with obedience.", "The text keeps God's command in view.", "Faith receives what God gives and does what God says."]),
      phrase("💯 Abraham Was An Hundred Years Old", ["The number makes the promise unforgettable.", "A hundred-year-old father holding the promised child is a living sermon.", "God's power is not embarrassed by impossible odds."]),
      phrase("😂 God Hath Made Me To Laugh", ["Sarah's laughter changes meaning.", "Earlier laughter carried disbelief; now it carries wonder.", "God can redeem even the places where we once doubted Him."]),
      phrase("👂 All That Hear Will Laugh With Me", ["Sarah's joy becomes public testimony.", "Others will hear and join her laughter.", "God's fulfilled promise is not only private relief; it becomes shared praise."]),
      phrase("❓ Who Would Have Said Unto Abraham?", ["Sarah is amazed by the ordinary details of fulfilled promise.", "Who would have imagined her nursing Abraham's son?", "The question invites readers to feel the shock of grace."]),
      phrase("🍼 Sarah Should Have Given Children Suck", ["The chapter lands in a deeply human image.", "Sarah is not holding a symbol; she is nursing a real baby.", "God's covenant faithfulness enters feeding, family, and daily life."]),
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
      phrase("🌱 The Child Grew", ["Isaac does not stay a birth announcement.", "The promised son grows, and his future begins to press on the household.", "Genesis moves from miracle birth to inheritance tension."]),
      phrase("🍽️ The Child Was Weaned", ["Weaning was a major family milestone.", "Abraham makes a great feast because Isaac has survived infancy and is growing strong.", "The promise child is being celebrated publicly."]),
      phrase("👀 Sarah Saw", ["Sarah notices what is happening in the household.", "The conflict is not hidden from her.", "Her seeing becomes the trigger for a painful family decision."]),
      phrase("😏 The Son Of Hagar Mocking", ["The celebration exposes old tension.", "Ishmael's mocking is not treated as harmless background noise.", "The promised line is surrounded by conflict from inside the household."]),
      phrase("🚪 Cast Out This Bondwoman", ["Sarah's words are hard and painful.", "Hagar is described by status, not tenderness.", "Scripture lets us feel the harshness of human conflict without pretending everyone is gentle."]),
      phrase("👦 The Son Of This Bondwoman", ["Sarah sees Ishmael as a threat to Isaac's inheritance.", "Two sons live in Abraham's house, but only one is the covenant heir.", "The family division is now unavoidable."]),
      phrase("💔 Grievous In Abraham's Sight", ["Abraham is not emotionally untouched.", "Ishmael is his son too.", "Obedience here is not clean and painless; it cuts into Abraham's own heart."]),
      phrase("👂 Hearken Unto Sarah", ["God tells Abraham to listen to Sarah in this matter.", "That does not make every word Sarah said gentle.", "It means God is protecting the covenant line through Isaac while still caring for Ishmael."]),
      phrase("🌿 In Isaac Shall Thy Seed Be Called", ["This is the covenant center of the section.", "The promised line will be counted through Isaac.", "God's choice gives shape to the family story, even when the emotions are painful."]),
      phrase("🌍 I Will Make A Nation", ["God does not erase Ishmael.", "He is not the covenant heir, but he is still seen by God.", "The Lord's care reaches beyond the chosen line."]),
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
      phrase("🍞 Bread And A Bottle Of Water", ["Abraham sends Hagar away with basic provision, but it is not enough for the wilderness.", "The small supplies make the scene feel fragile.", "Human provision runs out quickly when the wilderness is too much."]),
      phrase("🌵 She Departed, And Wandered", ["Hagar is outside Abraham's camp with no clear path forward.", "Wandering is the right word for her situation.", "She has movement, but not security."]),
      phrase("💧 The Water Was Spent", ["The crisis becomes life-threatening.", "The bottle is empty, and Hagar has no way to keep Ishmael alive by her own strength.", "This is where helplessness becomes visible."]),
      phrase("🏹 Cast The Child Under One Of The Shrubs", ["Hagar cannot bear to watch her son die.", "The scene is devastating because it shows a mother at the end of her strength.", "Genesis does not rush past her pain."]),
      phrase("😭 She Lift Up Her Voice, And Wept", ["Hagar's tears matter in the story.", "She is not invisible to God.", "Her grief becomes part of the scene where God will show mercy."]),
      phrase("👂 God Heard The Voice Of The Lad", ["Ishmael's name means God hears.", "Now his name becomes true in the wilderness.", "God hears the pushed-away child, not only the chosen household."]),
      phrase("🕊️ Fear Not", ["The angel's first word answers Hagar's terror.", "Fear is natural in the wilderness, but God speaks into it.", "He does not scold her despair; He gives her hope."]),
      phrase("🤲 Lift Up The Lad", ["God sends Hagar back toward her son with hope.", "She is not told to abandon him to death.", "She is called to hold him because God still has a future for him."]),
      phrase("🌍 I Will Make Him A Great Nation", ["God repeats Ishmael's future.", "The promise does not remove the hardship immediately, but it tells Hagar that the boy's story is not over.", "God's word gives future where the wilderness looked final."]),
      phrase("👁️ God Opened Her Eyes", ["The well was there, but Hagar could not see it until God opened her eyes.", "Sometimes mercy is not only new provision.", "Sometimes mercy is God helping us see the provision already near."]),
      phrase("💧 A Well Of Water", ["Water means life in this scene.", "God's care is practical, not abstract.", "He gives what Hagar and Ishmael need to survive the day."]),
      phrase("🤝 God Was With The Lad", ["Ishmael grows because God is with him.", "He is outside Abraham's tent, but not outside God's attention.", "The rejected son still lives under divine care."]),
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
      phrase("🧑‍✈️ Abimelech And Phichol", ["A king and his military leader come to Abraham.", "This is not a casual neighborly chat.", "Political power is now taking Abraham seriously."]),
      phrase("🤝 God Is With Thee", ["Abimelech recognizes God's presence with Abraham.", "Even outsiders can see that Abraham's life is marked by blessing.", "Covenant faithfulness becomes visible in public life."]),
      phrase("✋ Swear Unto Me", ["Abimelech wants a formal oath because Abraham's growing strength matters.", "The relationship needs boundaries and trust.", "Genesis shows faith interacting with real-world agreements."]),
      phrase("⚖️ Abraham Reproved Abimelech", ["Abraham does not avoid the conflict over the well.", "He names the wrong that was done.", "Peacemaking in Scripture can include honest confrontation."]),
      phrase("💧 A Well Of Water", ["A well meant survival, stability, and a future in the land.", "Abraham is not arguing over a small luxury.", "Water is life for family, servants, and flocks."]),
      phrase("🐑 Seven Ewe Lambs", ["The lambs become a witness that Abraham dug the well.", "The gift marks the agreement publicly.", "A physical sign helps preserve the truth of what happened."]),
      phrase("📍 Beer-sheba", ["The name is tied to oath and seven.", "The place becomes memory.", "Genesis often attaches meaning to locations so later readers understand why they matter."]),
      phrase("🌳 Planted A Grove", ["Abraham plants something that suggests settled life.", "He is still a sojourner, but he is also putting down roots.", "The promised land is becoming part of the family's lived story."]),
      phrase("🙏 Called There On The Name Of The LORD", ["Abraham worships in the land.", "The well agreement is not merely business; it becomes a setting for calling on God.", "Public life and worship meet here."]),
      phrase("♾️ The Everlasting God", ["This title looks beyond Abraham's lifetime.", "The God who kept the promise of Isaac can also keep promises after Abraham dies.", "The covenant rests on the everlasting God, not on one man's lifespan."]),
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
      phrase("🧪 God Did Tempt Abraham", ["In older English, tempt can mean test.", "God is not enticing Abraham to evil.", "He is revealing and refining what Abraham trusts most."]),
      phrase("🙋 Here Am I", ["Abraham answers with readiness before he knows the cost.", "The phrase sounds simple, but it opens the door to one of the hardest commands in Genesis.", "Availability comes before explanation."]),
      phrase("👦 Take Now Thy Son", ["The command touches Abraham's own heart.", "This is not an abstract sacrifice.", "God names the relationship that makes the test so costly."]),
      phrase("💔 Thine Only Son Isaac", ["Isaac is the unique son of promise.", "Ishmael exists, but Isaac carries the covenant line.", "The phrase highlights the impossible tension between God's promise and God's command."]),
      phrase("❤️ Whom Thou Lovest", ["God names Abraham's love for Isaac.", "The test is not cold or mechanical.", "It reaches the dearest gift Abraham has received."]),
      phrase("📍 Land Of Moriah", ["The destination matters because Abraham must walk toward obedience over time.", "He is not making a quick emotional decision.", "The journey gives space for the weight of the command to settle."]),
      phrase("🔥 Offer Him There", ["This command is meant to feel shocking.", "Genesis makes the reader feel the tension.", "The promised son is being placed under the demand of obedience."]),
      phrase("🌅 Abraham Rose Up Early", ["Abraham obeys without delay.", "The early morning detail shows resolve.", "He does not wait around hoping the command will disappear."]),
      phrase("👀 The Third Day", ["The journey lasts long enough for Abraham to feel the cost.", "The third day also lets the story breathe with suspense.", "Obedience here is sustained, not impulsive."]),
      phrase("🙏 We Will Come Again To You", ["Abraham speaks as though both he and Isaac will return.", "This hints at faith that God can preserve the promise somehow.", "He cannot see the answer yet, but he still speaks hope."]),
      phrase("🐑 God Will Provide Himself A Lamb", ["Abraham's answer to Isaac is one of the chapter's great lines.", "He does not know all the details, but he trusts God's provision.", "The whole chapter turns on this truth: the Lord will provide."]),
      phrase("👣 They Went Both Of Them Together", ["The repeated line slows the story down.", "Father and son walk together toward the altar.", "The closeness makes the test more painful, not less."]),
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
      phrase("🪨 Built An Altar There", ["Abraham arrives at the place God named.", "The altar makes the command concrete.", "The test has moved from words to action."]),
      phrase("🪵 Laid The Wood In Order", ["The details slow the scene.", "Everything is prepared carefully.", "Genesis makes us feel the seriousness of obedience step by step."]),
      phrase("🪢 Bound Isaac His Son", ["This is the moment where the test reaches its highest point.", "Isaac is placed on the altar, and the scene becomes almost unbearable.", "The promised son is completely surrendered."]),
      phrase("🔪 Stretched Forth His Hand", ["Abraham has gone all the way to the edge of the command.", "The story is not pretending obedience was symbolic only.", "The intervention must come from God."]),
      phrase("🛑 Lay Not Thine Hand Upon The Lad", ["God stops Abraham before Isaac is harmed.", "The Lord is not like pagan gods who delight in child sacrifice.", "He provides a substitute instead of taking the promised son."]),
      phrase("🔥 Now I Know That Thou Fearest God", ["The test reveals Abraham's reverence openly.", "This does not mean God lacked information.", "It means Abraham's faith is brought into the light through costly obedience."]),
      phrase("🤲 Withheld Not Thy Son", ["Abraham did not cling to Isaac above God.", "The phrase names the depth of surrender.", "The gift was precious, but the Giver was supreme."]),
      phrase("🐏 A Ram Caught In A Thicket", ["God's provision appears at the exact moment of need.", "The ram becomes the substitute for Isaac.", "Abraham obeys, but God supplies what saves the son."]),
      phrase("📍 Jehovah-jireh", ["Abraham names the place The LORD will provide.", "The mountain becomes a memory of God's faithful provision.", "The name teaches the lesson of the whole chapter."]),
      phrase("📣 By Myself Have I Sworn", ["God swears by Himself because there is no greater authority.", "The promise is anchored in God's own character.", "Abraham's future rests on who God is."]),
      phrase("⭐ As The Stars Of The Heaven", ["God repeats the promise of many descendants.", "This matters because Abraham almost gave up the son through whom those descendants would come.", "The promise is not weakened by the test; it is confirmed."]),
      phrase("🌊 As The Sand Upon The Sea Shore", ["The image stretches Abraham's imagination again.", "God's future for the family is bigger than Abraham can count.", "The covenant is moving toward a multitude."]),
      phrase("🌍 All The Nations Of The Earth", ["The blessing is never only for Abraham's private family comfort.", "God's purpose reaches the nations.", "Genesis keeps widening the promise beyond one household."]),
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
      phrase("🧭 After These Things", ["The story moves forward after the mountain test.", "Genesis now quietly prepares the next generation.", "The covenant line will need more than Isaac's survival; it will need Isaac's family."]),
      phrase("👨‍👩‍👧 Nahor", ["Abraham receives news from his brother's household.", "The family line outside Canaan is still important.", "God is preparing connections Abraham cannot yet see."]),
      phrase("👶 Bethuel", ["Bethuel matters because he is Rebekah's father.", "A name in a genealogy can look small until the next chapter reveals why it was included.", "Genesis plants future story seeds early."]),
      phrase("👰 Bethuel Begat Rebekah", ["Rebekah is introduced before she becomes central.", "She will marry Isaac and carry the promise into the next generation.", "The future of Genesis 24 is already being placed on the page."]),
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
      phrase("🪦 An Hundred And Seven And Twenty Years", ["Sarah is the only woman in Scripture whose age at death is recorded this way.", "That detail honors her importance.", "Her life carried waiting, doubt, laughter, motherhood, and promise fulfilled."]),
      phrase("📖 The Life Of Sarah", ["Genesis pauses over Sarah's life.", "She is not treated as a side character to Abraham only.", "Her story matters in the covenant family."]),
      phrase("📍 Kirjath-arba", ["The place is identified carefully.", "Genesis is tying grief to a real location in Canaan.", "The promised land is now also the place of family loss."]),
      phrase("😭 Abraham Came To Mourn", ["Abraham is a man of faith, and he still grieves.", "Faith does not erase mourning.", "Scripture lets the promise bearer weep."]),
      phrase("💧 To Weep For Her", ["The line is tender and human.", "Abraham's tears honor Sarah's life.", "The Bible does not treat grief as weakness."]),
      phrase("🧍 I Am A Stranger And A Sojourner", ["Abraham lives in the promised land, but he does not fully possess it yet.", "He is still dependent on others for a burial place.", "The promise is real, but not complete in his lifetime."]),
      phrase("🪦 A Possession Of A Buryingplace", ["Abraham wants legal ownership, not a temporary favor.", "A burial place gives his family a lasting tie to Canaan.", "Even death is being connected to promise."]),
      phrase("👑 A Mighty Prince Among Us", ["The sons of Heth honor Abraham publicly.", "They recognize his dignity and God's blessing on his life.", "Abraham is a sojourner, but not insignificant."]),
      phrase("🫱 Bury Thy Dead", ["The repeated phrase shows respect in negotiation.", "The community is willing to make room for Abraham's grief.", "The scene is both legal and deeply personal."]),
      phrase("🕳️ The Cave Of Machpelah", ["Abraham asks for a specific cave.", "The promise family needs a specific, recognized place.", "This cave will become one of Genesis's most important family burial sites."]),
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
      phrase("🏛️ Ephron Dwelt Among The Children Of Heth", ["The negotiation happens publicly at the city gate.", "Witnesses matter for ancient legal business.", "Abraham wants the purchase settled clearly."]),
      phrase("🌾 The Field And The Cave", ["Ephron offers both the field and the cave.", "The property is described carefully because ownership matters.", "Genesis wants the reader to know exactly what Abraham buys."]),
      phrase("💰 Four Hundred Shekels Of Silver", ["Abraham pays the full price.", "He does not want Sarah's burial place to depend on a favor that could later be disputed.", "The cost makes the purchase public and secure."]),
      phrase("⚖️ Current Money With The Merchant", ["The silver is weighed according to recognized standards.", "This is not a vague emotional exchange.", "It is a real legal purchase in the land of promise."]),
      phrase("📜 The Field Was Made Sure", ["The field becomes legally secured to Abraham.", "The phrase matters because Abraham finally owns a piece of Canaan.", "It is small, but it is real."]),
      phrase("🌳 All The Trees That Were In The Field", ["Genesis lists the trees too.", "The detail shows the fullness of the property transfer.", "Nothing about the ownership is left blurry."]),
      phrase("👥 Before All That Went In At The Gate", ["The city gate witnesses the transaction.", "Public recognition protects the burial place.", "Abraham's family claim is now known in the community."]),
      phrase("🪦 Abraham Buried Sarah His Wife", ["The legal details lead back to love and grief.", "Abraham buries Sarah in Canaan.", "Her grave becomes a quiet testimony that the family belongs to the land God promised."]),
      phrase("📍 Before Mamre", ["The location connects Sarah's burial to Abraham's earlier life in the land.", "The place is not random.", "Memory, promise, grief, and land are tied together."]),
      phrase("🔒 Made Sure Unto Abraham For A Possession", ["Genesis repeats the security of the purchase.", "The burial place cannot easily be challenged.", "The first owned piece of the promised land is connected to faith in death."]),
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
      phrase("👴 Abraham Was Old", ["Abraham's life is moving toward its final stage.", "The promise must pass to the next generation.", "Isaac needs a wife because the covenant story must continue."]),
      phrase("📆 Well Stricken In Age", ["The phrase emphasizes Abraham's age again.", "He cannot personally control the future forever.", "He must act faithfully and entrust the next generation to God."]),
      phrase("🙌 The LORD Had Blessed Abraham", ["Genesis looks back over Abraham's whole journey.", "His life included hardship, waiting, conflict, and grief.", "Still, the Lord's blessing covered the story."]),
      phrase("🤝 Put Thy Hand Under My Thigh", ["This was an ancient oath gesture.", "It feels strange to modern readers, but it showed solemn commitment.", "Abraham is making the servant swear seriously about Isaac's future."]),
      phrase("🚫 Take Not A Wife Of The Canaanites", ["Marriage is tied to covenant faithfulness.", "Abraham does not want Isaac pulled into the surrounding Canaanite way of life.", "The wife of the promise son matters deeply."]),
      phrase("🏠 Go Unto My Country", ["Abraham sends the servant back toward his relatives.", "The wife must come from outside Canaan, but Isaac must not return there permanently.", "The promise belongs in the land God gave."]),
      phrase("🌌 The LORD God Of Heaven", ["Abraham grounds the mission in God's rule.", "The God who called him from his father's house can guide this servant too.", "Isaac's marriage is placed under divine authority."]),
      phrase("🪽 He Shall Send His Angel Before Thee", ["Abraham believes God will guide the mission ahead of the servant.", "The servant travels, but God goes before him.", "This gives the journey confidence without removing obedience."]),
      phrase("⚠️ Beware Thou", ["Abraham is firm that Isaac must not be taken back.", "The covenant future is in Canaan.", "A wife may come from Abraham's family, but the son of promise must remain in the promised land."]),
    ],
  },
  {
    chapter: 24,
    startVerse: 10,
    endVerse: 20,
    reference: "Genesis 24:10-20",
    title: "Prayer At The Well",
    icon: "💧",
    phrases: [
      phrase("🐪 Ten Camels", ["The servant travels with visible evidence of Abraham's household wealth.", "Camels also make Rebekah's later service more impressive.", "Giving water to ten camels is no small kindness."]),
      phrase("🌆 At Evening Time", ["The servant arrives when women came out to draw water.", "He uses practical wisdom while depending on God.", "Faith and wise timing work together in the scene."]),
      phrase("🙏 O LORD God Of My Master Abraham", ["The servant prays to Abraham's God.", "He understands the mission is covenant business, not mere matchmaking.", "Prayer leads the search."]),
      phrase("🤲 Show Kindness Unto My Master", ["Kindness here means covenant loyalty and faithful care.", "The servant asks God to be merciful to Abraham's household.", "The mission depends on God's loyal love."]),
      phrase("🏺 Let Down Thy Pitcher", ["The sign begins with a simple request for water.", "A small act will reveal a large amount about character.", "The servant is watching for hospitality."]),
      phrase("🐪 I Will Give Thy Camels Drink Also", ["This is the key test of generosity.", "Watering ten camels would take effort and time.", "The servant is looking for someone who goes beyond minimum politeness."]),
      phrase("⚡ Before He Had Done Speaking", ["Rebekah arrives before the prayer is finished.", "The timing is meant to stand out.", "God's answer is already walking toward the well."]),
      phrase("👰 Rebekah Came Out", ["Rebekah enters the story through an ordinary chore.", "She does not know she is stepping into covenant history.", "God often works through ordinary daily moments."]),
      phrase("✨ Very Fair To Look Upon", ["Genesis notes Rebekah's beauty, but the scene will emphasize her character even more.", "Beauty introduces her, but service reveals her.", "The servant needs more than appearance."]),
      phrase("🏃 She Hasted", ["Rebekah moves quickly to serve.", "Her speed shows eagerness and strength.", "She does not treat kindness like a burden."]),
      phrase("💪 Drew For All His Camels", ["This is a lot of work.", "Rebekah's generosity is practical, costly, and visible.", "Her actions answer the servant's prayer."]),
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
      phrase("👀 The Man Wondering At Her", ["The servant watches carefully before speaking too quickly.", "Faith does not mean turning off discernment.", "He is trying to see whether the Lord has prospered his journey."]),
      phrase("💍 Golden Earring And Bracelets", ["The gifts honor Rebekah and signal the seriousness of the mission.", "This is not casual flirting at a well.", "A family covenant discussion is beginning."]),
      phrase("❓ Whose Daughter Art Thou?", ["The servant needs to know her family line.", "The answer matters because Abraham sent him to his relatives.", "Guidance is confirmed through details, not feelings only."]),
      phrase("🏠 Room To Lodge In", ["Rebekah offers more than water.", "Her household has room and supplies for the travelers.", "Hospitality continues beyond the first act of kindness."]),
      phrase("🙇 Bowed Down His Head", ["The servant responds to guidance with worship.", "He does not celebrate his own cleverness.", "He recognizes God's hand in the answered prayer."]),
      phrase("🙌 Blessed Be The LORD", ["Praise comes before negotiation.", "The servant names the Lord as the one who has led him.", "The mission is being interpreted through worship."]),
      phrase("🧭 The LORD Led Me", ["This phrase summarizes the journey.", "The servant walked in obedience, prayed, watched, and God guided.", "Guidance unfolded as he went."]),
      phrase("🏃 Laban Ran Out", ["Rebekah's report moves the family into action.", "Laban runs to meet the servant at the well.", "The private answer to prayer now becomes a public family matter."]),
      phrase("🍽️ I Will Not Eat Until", ["The servant refuses to eat until he tells his errand.", "The mission matters more than comfort.", "He is loyal to Abraham's charge and focused on God's guidance."]),
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
      phrase("🧳 I Am Abraham's Servant", ["The servant begins with his identity under Abraham.", "He does not make himself the center.", "His job is to represent the covenant household faithfully."]),
      phrase("🙌 The LORD Hath Blessed My Master", ["Abraham's wealth is explained as God's blessing.", "The servant is not merely bragging about possessions.", "He is showing that Isaac belongs to a family marked by divine promise."]),
      phrase("👦 Unto Him Hath He Given All", ["Isaac is the heir.", "This matters for Rebekah's family because the marriage request concerns the son who carries Abraham's household forward.", "The covenant future is at stake."]),
      phrase("🚫 Thou Shalt Not Take A Wife", ["The servant repeats Abraham's command.", "The mission has boundaries.", "God's guidance does not erase the instructions already given."]),
      phrase("🙏 I Came This Day Unto The Well", ["The servant retells the moment of prayer.", "He wants the family to see how specific the guidance was.", "The well becomes the place where God's direction became visible."]),
      phrase("🏺 Let Down Thy Pitcher", ["He repeats the requested sign.", "The details matter because Rebekah matched the prayer before she knew about it.", "God's providence is shown in exactness."]),
      phrase("⚡ Before I Had Done Speaking", ["The servant highlights the timing again.", "Rebekah appeared before the prayer was finished.", "The family is meant to feel that this was not random."]),
      phrase("🙌 I Bowed Down My Head", ["The servant's testimony includes worship.", "He did not just receive guidance; he praised the God who gave it.", "Answered prayer should lead to gratitude."]),
      phrase("🧭 Led Me In The Right Way", ["This is the servant's conclusion.", "God guided him to the right person and the right house.", "The mission is now asking for a faithful response."]),
      phrase("🤝 Deal Kindly And Truly", ["The servant asks the family to answer honestly.", "Kindness and truth mean covenant loyalty and straight dealing.", "Delay or manipulation would cloud what God has made clear."]),
    ],
  },
  {
    chapter: 24,
    startVerse: 50,
    endVerse: 61,
    reference: "Genesis 24:50-61",
    title: "Rebekah Agrees To Go",
    icon: "👣",
    phrases: [
      phrase("🙌 The Thing Proceedeth From The LORD", ["Rebekah's family recognizes God's hand.", "The timing, prayer, well, and response point beyond human planning.", "They cannot honestly deny what the Lord appears to be doing."]),
      phrase("🗣️ We Cannot Speak Bad Or Good", ["They admit the matter is beyond their control.", "This does not mean they have no feelings.", "It means God's leading is too clear to argue against."]),
      phrase("👰 Take Her, And Go", ["The family agrees to the marriage.", "The servant's mission moves from request to answer.", "Isaac's future wife is now being released toward Canaan."]),
      phrase("🎁 Jewels Of Silver, And Jewels Of Gold", ["The gifts honor Rebekah and her family.", "They show the seriousness of the agreement.", "This marriage is being treated with weight and dignity."]),
      phrase("🌅 Send Me Away Unto My Master", ["The servant does not want unnecessary delay.", "His loyalty remains fixed on completing the mission.", "Answered prayer still requires follow-through."]),
      phrase("⏳ Abide With Us A Few Days", ["Rebekah's family naturally wants time before she leaves.", "The request feels human.", "Major obedience often touches real family emotions."]),
      phrase("❓ Wilt Thou Go With This Man?", ["Rebekah is given a voice in the decision.", "Her answer matters.", "The story does not move her like luggage from one house to another."]),
      phrase("🚶 I Will Go", ["Rebekah's answer is short and brave.", "She leaves home, family, and familiarity for a future she has not seen.", "Her journey echoes Abraham's earlier call to go."]),
      phrase("🙌 They Blessed Rebekah", ["Her family sends her with blessing.", "The words look toward descendants, strength, and victory.", "Rebekah leaves with hope spoken over her future."]),
      phrase("🏰 Possess The Gate", ["The blessing imagines strength over enemies.", "This language connects Rebekah to the larger covenant future.", "Her children will matter in the unfolding promise."]),
    ],
  },
  {
    chapter: 24,
    startVerse: 62,
    endVerse: 67,
    reference: "Genesis 24:62-67",
    title: "Isaac Marries Rebekah",
    icon: "❤️",
    phrases: [
      phrase("🌾 Isaac Came From The Way", ["Isaac finally enters the chapter near the end.", "The whole mission has been moving toward him.", "The promised son is about to receive the wife God guided to him."]),
      phrase("🌅 Isaac Went Out To Meditate", ["Isaac is alone in the field at evening.", "The scene is quiet after a long chapter of travel and negotiation.", "Genesis slows the story into a reflective moment."]),
      phrase("👀 Rebekah Lifted Up Her Eyes", ["Rebekah sees Isaac before she knows him fully.", "The journey now becomes personal.", "The woman who said I will go is arriving at the future she chose."]),
      phrase("🐪 She Lighted Off The Camel", ["Rebekah gets down when she sees Isaac.", "The action shows respect and readiness for the meeting.", "The long travel is ending."]),
      phrase("❓ What Man Is This?", ["Rebekah asks about Isaac.", "The question is tender because she is about to meet the man she left home to marry.", "A covenant mission becomes a human introduction."]),
      phrase("🧕 She Took A Veil", ["The veil marks modesty and seriousness in that cultural setting.", "Rebekah prepares to meet Isaac with honor.", "The scene is personal, not merely transactional."]),
      phrase("🗣️ The Servant Told Isaac", ["Isaac hears the whole story.", "The servant's testimony connects Isaac to the prayer, the well, and God's guidance.", "Their marriage begins under the memory of providence."]),
      phrase("⛺ Sarah's Tent", ["Isaac brings Rebekah into Sarah's tent.", "This is emotionally significant because Sarah has died.", "Rebekah enters the household where the promise must continue."]),
      phrase("👰 She Became His Wife", ["The mission is completed.", "Rebekah becomes Isaac's wife, and the next generation of the covenant family is formed.", "Genesis 24 ends with the promise line secured for the future."]),
      phrase("❤️ He Loved Her", ["The chapter ends with love, not only arrangement.", "Isaac receives Rebekah with affection.", "The promise continues through a real marriage."]),
      phrase("🕊️ Isaac Was Comforted", ["Isaac's grief over Sarah is not ignored.", "Rebekah's arrival brings comfort after loss.", "God's providence cares for covenant future and human sorrow."]),
    ],
  },
];

const DAY_9_RESTRUCTURED_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 21, startVerse: 1, endVerse: 2, reference: "Genesis 21:1-2", title: "God Visits Sarah As He Promised", icon: "👑", phrases: [
    phrase("👑 The LORD Visited Sarah", ["Isaac's birth begins with God's action.", "Sarah does not force the promise into existence; the Lord visits her with faithful care.", "The promise moves because God keeps His word."]),
    phrase("🗣️ As He Had Said", ["The text ties fulfillment directly to God's speech.", "What God said earlier is now happening in real life.", "Genesis wants readers to trust the Lord's word over impossible circumstances."]),
    phrase("📜 As He Had Spoken", ["The repetition matters.", "God had not spoken vaguely or carelessly.", "Isaac's birth shows that God's spoken promise survives time, age, barrenness, and doubt."]),
    phrase("🤰 Sarah Conceived", ["Sarah's body becomes the place where promise becomes visible.", "The woman once barren now carries the covenant son.", "God's faithfulness enters real family life."]),
    phrase("👴 In His Old Age", ["Abraham's age makes the miracle louder.", "This cannot be explained by normal human strength.", "The older Abraham is, the clearer God's power appears."]),
    phrase("⏳ At The Set Time", ["God's promise has timing.", "The wait was long, but Isaac was not late.", "The child arrives at the appointed time God had spoken."]),
  ] },
  { chapter: 21, startVerse: 3, endVerse: 5, reference: "Genesis 21:3-5", title: "Isaac Is Named And Circumcised", icon: "👶", phrases: [
    phrase("👶 Called His Son's Name Isaac", ["Isaac means laughter.", "The name turns the family's history into a daily reminder.", "God transformed impossible promise into joy."]),
    phrase("✂️ Abraham Circumcised Isaac", ["Abraham marks Isaac with the covenant sign.", "The promised son is not only celebrated; he is placed under God's command.", "Joy and obedience belong together here."]),
    phrase("📅 Eight Days Old", ["The timing follows God's command from Genesis 17.", "Abraham does not improvise the covenant sign.", "He obeys in the way God required."]),
    phrase("✅ As God Had Commanded Him", ["The miracle does not make obedience optional.", "Abraham receives the promise and still obeys the command.", "Faith responds to God's gift with submission."]),
    phrase("💯 Abraham Was An Hundred Years Old", ["The number makes the promise unforgettable.", "A hundred-year-old father holding Isaac is a living sermon.", "God's power is not embarrassed by impossible odds."]),
  ] },
  { chapter: 21, startVerse: 6, endVerse: 7, reference: "Genesis 21:6-7", title: "Sarah Laughs With Joy", icon: "😂", phrases: [
    phrase("😂 God Hath Made Me To Laugh", ["Sarah's laughter changes meaning.", "Earlier laughter carried disbelief; now it carries wonder.", "God can redeem even the places where we once doubted Him."]),
    phrase("👂 All That Hear Will Laugh With Me", ["Sarah's joy becomes public testimony.", "Others will hear and join her laughter.", "God's fulfilled promise becomes shared praise."]),
    phrase("❓ Who Would Have Said Unto Abraham?", ["Sarah is amazed by the ordinary details of fulfilled promise.", "Who would have imagined this after so many years?", "The question invites readers to feel the shock of grace."]),
    phrase("🍼 Sarah Should Have Given Children Suck", ["The promise becomes deeply human.", "Sarah is not holding a symbol; she is nursing a real baby.", "God's covenant faithfulness enters feeding, family, and daily life."]),
  ] },
  { chapter: 21, startVerse: 8, endVerse: 10, reference: "Genesis 21:8-10", title: "Ishmael Mocks Isaac", icon: "🏠", phrases: [
    phrase("🌱 The Child Grew", ["Isaac grows beyond the birth miracle.", "The promised son is becoming the visible heir in the household.", "His growth brings old tensions to the surface."]),
    phrase("🍽️ A Great Feast", ["Abraham celebrates Isaac's weaning.", "This is a public family milestone.", "The joy around Isaac also exposes unresolved conflict."]),
    phrase("👀 Sarah Saw", ["Sarah notices what is happening.", "The conflict is not hidden from her.", "Her seeing triggers the painful decision that follows."]),
    phrase("😏 Mocking", ["Ishmael's behavior is treated as serious.", "The promised line is being mocked inside Abraham's own house.", "Genesis shows that shortcuts and family sin can echo for years."]),
    phrase("🚪 Cast Out This Bondwoman", ["Sarah's words are harsh and painful.", "Hagar is described by her vulnerable status.", "The Bible lets readers feel the human cost of the household conflict."]),
    phrase("👦 He Shall Not Be Heir", ["Sarah's concern centers on inheritance.", "Isaac and Ishmael cannot both carry the covenant line.", "The family conflict has become a covenant crisis."]),
  ] },
  { chapter: 21, startVerse: 11, endVerse: 13, reference: "Genesis 21:11-13", title: "God Confirms Isaac As The Promised Seed", icon: "🌿", phrases: [
    phrase("💔 Grievous In Abraham's Sight", ["Abraham is deeply troubled.", "Ishmael is his son too.", "Obedience here is not clean or painless."]),
    phrase("👂 Hearken Unto Sarah", ["God tells Abraham to listen to Sarah in this matter.", "That does not make every word gentle.", "It means God is protecting the covenant line through Isaac."]),
    phrase("🌿 In Isaac Shall Thy Seed Be Called", ["This is the covenant center.", "The promised line will be counted through Isaac.", "God's choice gives shape to the family story."]),
    phrase("🌍 Also Of The Son Of The Bondwoman", ["God does not erase Ishmael.", "He is not the covenant heir, but he is still seen by God.", "The Lord's care reaches beyond the chosen line."]),
    phrase("📈 I Will Make A Nation", ["Ishmael receives a real future.", "The promise does not remove the pain of separation, but it refuses to leave Ishmael without hope.", "God's mercy remains active."]),
  ] },
  { chapter: 21, startVerse: 14, endVerse: 16, reference: "Genesis 21:14-16", title: "Hagar And Ishmael Wander In The Wilderness", icon: "🌵", phrases: [
    phrase("🍞 Bread And A Bottle Of Water", ["Abraham sends basic provision, but it is not enough for the wilderness.", "The small supplies make the scene fragile.", "Human provision runs out quickly when the wilderness is too much."]),
    phrase("🌵 Wandered In The Wilderness", ["Hagar has movement, but not security.", "She is outside Abraham's camp with no clear future.", "The wilderness becomes the place of desperation."]),
    phrase("💧 The Water Was Spent", ["The crisis becomes life-threatening.", "The bottle is empty.", "Hagar cannot keep Ishmael alive by her own strength."]),
    phrase("🏹 Cast The Child Under One Of The Shrubs", ["Hagar cannot bear to watch her son die.", "This is a mother at the end of her strength.", "Genesis does not rush past her pain."]),
    phrase("😭 Let Me Not See The Death Of The Child", ["Her words are devastating.", "She is not making theology; she is grieving.", "The Bible gives room for the cry of a desperate parent."]),
  ] },
  { chapter: 21, startVerse: 17, endVerse: 19, reference: "Genesis 21:17-19", title: "God Hears Ishmael And Opens Hagar's Eyes", icon: "👁️", phrases: [
    phrase("👂 God Heard The Voice Of The Lad", ["Ishmael means God hears.", "Now his name becomes true in the wilderness.", "God hears the pushed-away child."]),
    phrase("🕊️ Fear Not", ["God speaks into Hagar's terror.", "He does not scold her despair.", "He gives hope where she saw only death."]),
    phrase("🤲 Lift Up The Lad", ["God sends Hagar back toward her son.", "She is called to hold him because God still has a future for him.", "Mercy gives her strength to rise."]),
    phrase("🌍 I Will Make Him A Great Nation", ["God repeats Ishmael's future.", "The wilderness is not the end of his story.", "God's word gives future where everything looked final."]),
    phrase("👁️ God Opened Her Eyes", ["The well was there, but Hagar could not see it.", "Sometimes mercy is God helping us see provision already near.", "God gives both water and hope."]),
    phrase("💧 A Well Of Water", ["Water means life.", "God's care is practical, not abstract.", "He provides what mother and child need to survive."]),
  ] },
  { chapter: 21, startVerse: 20, endVerse: 21, reference: "Genesis 21:20-21", title: "God Is With Ishmael", icon: "🏹", phrases: [
    phrase("🤝 God Was With The Lad", ["Ishmael is outside Abraham's tent, but not outside God's care.", "His growth is tied to God's presence.", "The rejected son is still watched by the Lord."]),
    phrase("🌱 He Grew", ["Ishmael survives and grows.", "The wilderness does not erase him.", "God's promise begins to take shape in his life."]),
    phrase("🏹 Became An Archer", ["The archer detail shows strength and survival.", "Ishmael learns to live in the wilderness world.", "God's care does not always mean an easy setting, but it means a real future."]),
    phrase("🌵 Wilderness Of Paran", ["The place becomes Ishmael's home region.", "His story continues outside the covenant line.", "Genesis still gives him location, development, and dignity."]),
    phrase("👩 His Mother Took Him A Wife", ["Hagar continues caring for Ishmael's future.", "The family line continues.", "The boy who almost died now moves toward his own household."]),
  ] },
  { chapter: 21, startVerse: 22, endVerse: 24, reference: "Genesis 21:22-24", title: "Abimelech Recognizes God Is With Abraham", icon: "🤝", phrases: [
    phrase("🧑‍✈️ Abimelech And Phichol", ["A king and his military leader come to Abraham.", "This is a serious political visit.", "Abraham's presence in the land now matters to surrounding powers."]),
    phrase("🤝 God Is With Thee", ["Abimelech recognizes God's presence with Abraham.", "Even outsiders can see that Abraham is marked by blessing.", "Covenant faithfulness becomes visible publicly."]),
    phrase("✋ Swear Unto Me", ["Abimelech asks for a formal oath.", "He wants stability with Abraham's growing household.", "Faith has to live in real relationships and agreements."]),
    phrase("🕊️ I Will Swear", ["Abraham agrees to the oath.", "He is willing to pursue peace with his neighbors.", "The promise family is learning to live in the land without constant conflict."]),
  ] },
  { chapter: 21, startVerse: 25, endVerse: 31, reference: "Genesis 21:25-31", title: "Abraham And Abimelech Make A Covenant", icon: "💧", phrases: [
    phrase("⚖️ Abraham Reproved Abimelech", ["Abraham names the wrong done over the well.", "Peacemaking does not mean pretending nothing happened.", "Honest confrontation can be part of a faithful covenant."]),
    phrase("💧 A Well Of Water", ["Water meant survival for family, servants, and flocks.", "This dispute is not petty.", "A well is stability and future in the land."]),
    phrase("❓ I Wot Not Who Hath Done This Thing", ["Abimelech denies knowing who took the well.", "The dispute needs public clarity.", "Genesis lets the conflict be addressed through witnesses and agreement."]),
    phrase("🐑 Sheep And Oxen", ["Abraham gives animals as part of the covenant-making scene.", "The agreement becomes visible.", "Peace is marked with concrete action."]),
    phrase("🐑 Seven Ewe Lambs", ["The seven lambs serve as a witness.", "They mark Abraham's claim that he dug the well.", "A physical sign helps preserve the truth."]),
    phrase("📍 Beer-sheba", ["The name is tied to oath and seven.", "The place becomes a memory of covenant agreement.", "Genesis often names places so readers remember what God did there."]),
  ] },
  { chapter: 21, startVerse: 32, endVerse: 34, reference: "Genesis 21:32-34", title: "Abraham Calls On The Everlasting God", icon: "♾️", phrases: [
    phrase("🤝 Made A Covenant At Beer-sheba", ["The well dispute ends with a covenant.", "A tense relationship is given public structure.", "Abraham's life in the land includes worship and diplomacy."]),
    phrase("🌳 Abraham Planted A Grove", ["Planting suggests settlement and future.", "Abraham is still a sojourner, but he is putting down roots.", "The promised land is becoming part of his lived story."]),
    phrase("🙏 Called There On The Name Of The LORD", ["Abraham worships in the land.", "The business of wells and treaties leads into calling on God.", "Public life and worship belong together."]),
    phrase("♾️ The Everlasting God", ["This title looks beyond Abraham's lifetime.", "The God who gave Isaac can keep promises after Abraham dies.", "The covenant rests on the everlasting Lord."]),
    phrase("📍 Many Days In The Philistines' Land", ["Abraham remains in the region for a long period.", "The promise journey includes ordinary settled time.", "God is faithful in long seasons, not only dramatic moments."]),
  ] },
  { chapter: 22, startVerse: 1, endVerse: 2, reference: "Genesis 22:1-2", title: "God Tests Abraham", icon: "🧪", phrases: [
    phrase("🧪 God Did Tempt Abraham", ["In older English, tempt can mean test.", "God is not enticing Abraham to evil.", "He is revealing and refining what Abraham trusts most."]),
    phrase("🙋 Here Am I", ["Abraham answers with readiness before he knows the cost.", "Availability comes before explanation.", "The simple answer opens one of Genesis's hardest scenes."]),
    phrase("👦 Take Now Thy Son", ["The command touches Abraham's own heart.", "This is not an abstract sacrifice.", "God names the relationship that makes the test costly."]),
    phrase("💔 Thine Only Son Isaac", ["Isaac is the unique son of promise.", "The phrase highlights the impossible tension between God's promise and God's command.", "The covenant heir is now being surrendered."]),
    phrase("❤️ Whom Thou Lovest", ["God names Abraham's love for Isaac.", "The test is not cold or mechanical.", "It reaches Abraham's dearest gift."]),
    phrase("📍 Land Of Moriah", ["The command includes a journey.", "Abraham must walk toward obedience over time.", "The test is sustained, not instant."]),
  ] },
  { chapter: 22, startVerse: 3, endVerse: 5, reference: "Genesis 22:3-5", title: "Abraham Obeys And Travels To Moriah", icon: "🌅", phrases: [
    phrase("🌅 Abraham Rose Up Early", ["Abraham obeys without delay.", "The early morning detail shows resolve.", "He does not wait around hoping the command will vanish."]),
    phrase("🪵 Clave The Wood", ["Abraham prepares for the sacrifice himself.", "The practical detail makes the scene heavier.", "Obedience is moving from hearing to action."]),
    phrase("👣 Went Unto The Place", ["Abraham walks toward the place God named.", "Faithfulness is now measured step by step.", "He obeys even before he understands the outcome."]),
    phrase("👀 The Third Day", ["The journey lasts long enough for Abraham to feel the cost.", "This is not impulsive obedience.", "The suspense stretches over time."]),
    phrase("🙏 We Will Worship", ["Abraham frames the journey as worship.", "Even the hardest obedience is directed toward God.", "The altar is not separate from faith."]),
    phrase("🔙 We Will Come Again To You", ["Abraham speaks as though both he and Isaac will return.", "This hints at faith that God can preserve the promise somehow.", "He cannot see the answer, but he speaks hope."]),
  ] },
  { chapter: 22, startVerse: 6, endVerse: 8, reference: "Genesis 22:6-8", title: "God Will Provide Himself A Lamb", icon: "🐑", phrases: [
    phrase("🪵 Isaac Took The Wood", ["Isaac carries the wood for the offering.", "The detail makes him active in the scene.", "The promised son moves toward the altar with his father."]),
    phrase("🔥 Fire In His Hand", ["Abraham carries the fire and knife.", "The tools of sacrifice are present.", "The story lets the reader feel the seriousness of the moment."]),
    phrase("👣 Both Of Them Together", ["The repeated line is tender and painful.", "Father and son walk together.", "Their closeness makes the test heavier."]),
    phrase("❓ Where Is The Lamb?", ["Isaac's question names the missing piece.", "He understands enough to know something is absent.", "The question creates the doorway for Abraham's confession of faith."]),
    phrase("🐑 God Will Provide Himself A Lamb", ["This is one of the chapter's great lines.", "Abraham does not know every detail, but he trusts God's provision.", "The Lord will provide becomes the heartbeat of the chapter."]),
  ] },
  { chapter: 22, startVerse: 9, endVerse: 10, reference: "Genesis 22:9-10", title: "Abraham Lays Isaac On The Altar", icon: "🪨", phrases: [
    phrase("🪨 Built An Altar There", ["Abraham reaches the place God named.", "The altar makes the command concrete.", "The test has moved from words to action."]),
    phrase("🪵 Laid The Wood In Order", ["The scene slows down through details.", "Everything is prepared carefully.", "Genesis makes the reader feel obedience step by step."]),
    phrase("🪢 Bound Isaac His Son", ["This is the height of the test.", "Isaac is placed on the altar.", "The promised son is completely surrendered."]),
    phrase("🔪 Stretched Forth His Hand", ["Abraham goes all the way to the edge of the command.", "This is not symbolic obedience only.", "The intervention must come from God."]),
    phrase("⏸️ Took The Knife", ["The scene pauses at the most unbearable moment.", "Genesis forces the reader to feel the cost.", "God's promise and God's command seem impossible to reconcile."]),
  ] },
  { chapter: 22, startVerse: 11, endVerse: 12, reference: "Genesis 22:11-12", title: "The Angel Of The LORD Stops Abraham", icon: "🛑", phrases: [
    phrase("📣 Abraham, Abraham", ["The repeated name interrupts the scene urgently.", "God stops the action at the exact moment needed.", "The Lord sees the obedience and intervenes."]),
    phrase("🙋 Here Am I", ["Abraham answers again with availability.", "The same response that began the test now receives the rescue.", "He remains attentive to God's voice."]),
    phrase("🛑 Lay Not Thine Hand Upon The Lad", ["God stops Abraham before Isaac is harmed.", "The Lord is not like false gods who delight in child sacrifice.", "He provides a substitute instead."]),
    phrase("🔥 Now I Know That Thou Fearest God", ["The test reveals Abraham's reverence openly.", "God is not learning information He lacked.", "Abraham's faith is being brought into the light."]),
    phrase("🤲 Hast Not Withheld Thy Son", ["Abraham does not cling to Isaac above God.", "The gift is precious, but the Giver is supreme.", "This is costly surrender."]),
  ] },
  { chapter: 22, startVerse: 13, endVerse: 14, reference: "Genesis 22:13-14", title: "The LORD Provides A Ram", icon: "🐏", phrases: [
    phrase("👀 Abraham Lifted Up His Eyes", ["After the command is stopped, Abraham sees the provision.", "The answer comes from God, not Abraham's planning.", "The scene turns from surrender to rescue."]),
    phrase("🐏 A Ram Caught In A Thicket", ["The ram becomes the substitute for Isaac.", "God provides what obedience cannot produce.", "The promised son lives because the Lord supplies another offering."]),
    phrase("🔥 Offered Him Up For A Burnt Offering", ["The sacrifice still happens, but Isaac is spared.", "The substitute dies in the son's place.", "This is the center of the provision scene."]),
    phrase("📍 Jehovah-jireh", ["Abraham names the place The LORD will provide.", "The mountain becomes a memory of God's faithful provision.", "The name teaches the lesson of the whole chapter."]),
    phrase("⛰️ In The Mount Of The LORD", ["The place of testing becomes the place of provision.", "God's rescue is remembered where obedience was hardest.", "The Lord is seen as the provider."]),
  ] },
  { chapter: 22, startVerse: 15, endVerse: 18, reference: "Genesis 22:15-18", title: "God Reaffirms The Covenant Blessing", icon: "⭐", phrases: [
    phrase("📣 The Angel Called The Second Time", ["After provision, God speaks promise again.", "The test does not end with silence.", "God confirms the covenant blessing."]),
    phrase("🤲 Because Thou Hast Done This Thing", ["Abraham's obedience is named.", "The test revealed faith in action.", "God connects the reaffirmed promise to Abraham's costly trust."]),
    phrase("📜 By Myself Have I Sworn", ["God swears by Himself because there is no greater authority.", "The promise rests on God's own character.", "Abraham's hope is anchored in who God is."]),
    phrase("⭐ Stars Of Heaven", ["God repeats the promise of many descendants.", "This matters because Abraham almost gave up the son through whom they would come.", "The promise is not weakened by the test."]),
    phrase("🌊 Sand Upon The Sea Shore", ["The image stretches the future beyond counting.", "God's plan is larger than Abraham can see.", "The covenant is moving toward a multitude."]),
    phrase("🏰 Possess The Gate Of His Enemies", ["The promise includes victory and strength.", "Abraham's seed will not merely survive.", "God promises a future of overcoming opposition."]),
    phrase("🌍 All Nations Of The Earth", ["The blessing reaches beyond Abraham's family.", "God's purpose is global.", "The covenant line is meant to bring blessing to the nations."]),
  ] },
  { chapter: 22, startVerse: 19, endVerse: 19, reference: "Genesis 22:19", title: "Abraham Returns To Beersheba", icon: "🔙", phrases: [
    phrase("👣 Abraham Returned", ["The test has ended, and Abraham comes back from the mountain.", "Life continues after the hardest obedience.", "The promise family moves forward."]),
    phrase("👥 Unto His Young Men", ["The servants who waited now see Abraham return.", "The words Abraham spoke earlier are fulfilled: he comes back.", "The journey closes with return, not death for Isaac."]),
    phrase("📍 Beersheba", ["Abraham returns to the place tied to oath, well, and worship.", "The story comes down from the mountain into ordinary life again.", "Faith must continue after the crisis."]),
  ] },
  { chapter: 22, startVerse: 20, endVerse: 24, reference: "Genesis 22:20-24", title: "Rebekah Is Introduced", icon: "🌱", phrases: [
    phrase("🧭 After These Things", ["The story moves forward after the test.", "Genesis quietly prepares the next generation.", "Isaac survived, and now Isaac's future wife is being introduced."]),
    phrase("👨‍👩‍👧 Nahor", ["Abraham receives news from his brother's household.", "The family line outside Canaan still matters.", "God is preparing connections Abraham cannot yet see."]),
    phrase("👶 Bethuel", ["Bethuel matters because he is Rebekah's father.", "A genealogy name can look small until the next chapter reveals its purpose.", "Genesis plants future story seeds early."]),
    phrase("👰 Bethuel Begat Rebekah", ["Rebekah is introduced before she becomes central.", "She will marry Isaac and carry the promise into the next generation.", "Genesis 24 is already being prepared."]),
  ] },
  { chapter: 23, startVerse: 1, endVerse: 2, reference: "Genesis 23:1-2", title: "Sarah Dies In Hebron", icon: "🪦", phrases: [
    phrase("🪦 One Hundred And Twenty Seven Years", ["Sarah is the only woman in Scripture whose age at death is recorded this way.", "That detail honors her importance.", "Her life carried waiting, doubt, laughter, motherhood, and promise fulfilled."]),
    phrase("📖 The Life Of Sarah", ["Genesis pauses over Sarah's life.", "She is not treated as a side character only.", "Her story matters in the covenant family."]),
    phrase("📍 Kirjath-arba; The Same Is Hebron", ["The location is named carefully.", "Sarah dies in the land connected to promise.", "Grief is tied to a real place in Canaan."]),
    phrase("😭 Abraham Came To Mourn", ["Abraham is a man of faith, and he still grieves.", "Faith does not erase mourning.", "Scripture lets the promise bearer weep."]),
    phrase("💧 To Weep For Her", ["The line is tender and human.", "Abraham's tears honor Sarah's life.", "The Bible does not treat grief as weakness."]),
  ] },
  { chapter: 23, startVerse: 3, endVerse: 4, reference: "Genesis 23:3-4", title: "Abraham Seeks A Burial Place", icon: "🧍", phrases: [
    phrase("🧍 Abraham Stood Up", ["After mourning, Abraham rises to handle what must be done.", "Grief and responsibility sit together.", "He must secure a burial place for Sarah."]),
    phrase("🧳 Stranger And Sojourner", ["Abraham lives in the promised land, but does not fully possess it yet.", "He is still dependent on others for burial ground.", "The promise is real, but not complete in his lifetime."]),
    phrase("🪦 Give Me A Possession", ["Abraham wants ownership, not a temporary favor.", "A burial place gives the family a lasting tie to Canaan.", "Even death is connected to promise."]),
    phrase("👁️ Bury My Dead Out Of My Sight", ["The phrase shows the pain of burial.", "Abraham loves Sarah, but he must entrust her body to the earth.", "The Bible lets the practical side of grief be seen."]),
  ] },
  { chapter: 23, startVerse: 5, endVerse: 6, reference: "Genesis 23:5-6", title: "The Hittites Honor Abraham", icon: "👑", phrases: [
    phrase("👂 Hear Us, My Lord", ["The Hittites answer Abraham with respect.", "They recognize his dignity among them.", "The sojourner is not treated as insignificant."]),
    phrase("👑 A Mighty Prince Among Us", ["This title shows Abraham's honored position.", "God's blessing on his life is visible to surrounding people.", "He owns little land, but carries great weight."]),
    phrase("🪦 Choice Of Our Sepulchres", ["They offer burial space from among their best tombs.", "The response is generous and respectful.", "Sarah's burial is treated with honor."]),
    phrase("🚫 None Shall Withhold", ["The community is willing to make room for Abraham's grief.", "This gives Abraham freedom to negotiate.", "The promised family receives public favor."]),
  ] },
  { chapter: 23, startVerse: 7, endVerse: 9, reference: "Genesis 23:7-9", title: "Abraham Requests The Cave Of Machpelah", icon: "🕳️", phrases: [
    phrase("🙇 Abraham Stood Up, And Bowed", ["Abraham responds with humility.", "He is honored by the people, but he does not act arrogantly.", "Faithful negotiation includes respect."]),
    phrase("🗣️ Intreat For Me", ["Abraham asks them to speak to Ephron.", "He works through public community channels.", "The purchase must be recognized by witnesses."]),
    phrase("🕳️ The Cave Of Machpelah", ["Abraham asks for a specific cave.", "The promise family needs a recognized place.", "This cave will become one of Genesis's most important burial sites."]),
    phrase("💰 For As Much Money As It Is Worth", ["Abraham wants to pay full value.", "He does not want a vague favor that could later be disputed.", "The burial place must be legally secure."]),
  ] },
  { chapter: 23, startVerse: 10, endVerse: 13, reference: "Genesis 23:10-13", title: "Ephron Offers The Field", icon: "🌾", phrases: [
    phrase("🏛️ Ephron Dwelt Among The Children Of Heth", ["The negotiation happens publicly.", "The city gate setting matters for legal business.", "Witnesses will hear the agreement."]),
    phrase("👥 In The Audience", ["Genesis emphasizes that many people hear the offer.", "This protects the transaction from later dispute.", "The purchase is public, not hidden."]),
    phrase("🌾 The Field Give I Thee", ["Ephron speaks generously, but Abraham still wants to pay.", "Ancient negotiation could sound like gifting while still expecting formal exchange.", "Abraham refuses ambiguity."]),
    phrase("🙇 Abraham Bowed Down", ["Abraham continues to show respect.", "He does not use pressure or entitlement.", "He seeks the land honorably."]),
    phrase("💰 I Will Give Thee Money", ["Abraham insists on payment.", "He wants Sarah's burial place to be secure.", "Faith does not avoid practical legal clarity."]),
  ] },
  { chapter: 23, startVerse: 14, endVerse: 16, reference: "Genesis 23:14-16", title: "Abraham Pays Full Price", icon: "💰", phrases: [
    phrase("💰 Four Hundred Shekels Of Silver", ["The price is named clearly.", "Abraham accepts the cost.", "The burial place will not be a questionable favor."]),
    phrase("⚖️ What Is That Betwixt Me And Thee?", ["Ephron presents the price as if it is no obstacle.", "The polite language still leads to a real amount.", "Genesis shows the negotiation in public detail."]),
    phrase("👂 Abraham Hearkened Unto Ephron", ["Abraham agrees to the stated price.", "He does not bargain the burial place down in the text.", "His priority is secure possession."]),
    phrase("⚖️ Weighed To Ephron The Silver", ["Payment is measured formally.", "This is a legal transaction.", "The promise family gains land through recognized purchase."]),
    phrase("🏪 Current Money With The Merchant", ["The silver is paid by accepted standards.", "The detail removes doubt about legitimacy.", "Abraham's ownership is publicly secure."]),
  ] },
  { chapter: 23, startVerse: 17, endVerse: 18, reference: "Genesis 23:17-18", title: "The Field Is Made Sure To Abraham", icon: "📜", phrases: [
    phrase("📜 The Field Was Made Sure", ["The field becomes legally secured to Abraham.", "This is the first clear piece of Canaan he owns.", "The promise touches actual property."]),
    phrase("🕳️ The Cave Which Was Therein", ["The cave is included specifically.", "Sarah's burial place is not vague.", "The family tomb is named and secured."]),
    phrase("🌳 All The Trees", ["Genesis even lists the trees.", "The full property transfer is being described.", "Nothing about the ownership is left blurry."]),
    phrase("👥 Before All That Went In At The Gate", ["Witnesses confirm the transaction.", "The gate was a public legal setting.", "Abraham's possession is recognized by the community."]),
  ] },
  { chapter: 23, startVerse: 19, endVerse: 20, reference: "Genesis 23:19-20", title: "Sarah Is Buried In The Promised Land", icon: "🪦", phrases: [
    phrase("🪦 Abraham Buried Sarah His Wife", ["The legal details lead back to love and grief.", "Abraham honors Sarah in burial.", "The story is not only about land; it is about loss."]),
    phrase("📍 Cave Of Machpelah Before Mamre", ["The place is named again.", "Memory, promise, grief, and land are tied together.", "Sarah's burial becomes part of the geography of faith."]),
    phrase("🌍 In The Land Of Canaan", ["Sarah is buried in the promised land, not back in Mesopotamia.", "Her grave testifies that the family belongs to God's promised future.", "They are still waiting, but they wait in Canaan."]),
    phrase("🔒 Made Sure Unto Abraham", ["Genesis repeats the legal security.", "The burial place cannot easily be challenged.", "The first owned piece of the promised land is connected to faith in death."]),
  ] },
  { chapter: 24, startVerse: 1, endVerse: 4, reference: "Genesis 24:1-4", title: "Abraham Commands His Servant", icon: "🧳", phrases: [
    phrase("👴 Abraham Was Old", ["Abraham's life is moving toward its final stage.", "The promise must pass to the next generation.", "Isaac needs a wife because the covenant story must continue."]),
    phrase("📆 Well Stricken In Age", ["Abraham cannot personally control the future forever.", "He must act faithfully and entrust what comes next to God.", "The chapter is about legacy."]),
    phrase("🙌 The LORD Had Blessed Abraham", ["Genesis looks back over Abraham's whole journey.", "His life included hardship, waiting, conflict, and grief.", "Still, the Lord's blessing covered the story."]),
    phrase("🤝 Put Thy Hand Under My Thigh", ["This was an ancient oath gesture.", "It showed solemn commitment.", "Abraham is making the servant swear seriously about Isaac's future."]),
    phrase("🚫 Not Take A Wife Of The Canaanites", ["Marriage is tied to covenant faithfulness.", "Abraham does not want Isaac pulled into the surrounding Canaanite way of life.", "The wife of the promise son matters deeply."]),
    phrase("🏠 Go Unto My Country", ["The wife must come from Abraham's relatives.", "Yet Isaac must not leave the promised land permanently.", "The mission holds family connection and covenant place together."]),
  ] },
  { chapter: 24, startVerse: 5, endVerse: 9, reference: "Genesis 24:5-9", title: "The Servant Questions The Mission", icon: "❓", phrases: [
    phrase("❓ Peradventure The Woman Will Not Be Willing", ["The servant asks a practical question.", "Faithful service still thinks through possible obstacles.", "The mission needs clarity before he leaves."]),
    phrase("⚠️ Beware Thou", ["Abraham is firm that Isaac must not return.", "The covenant future belongs in Canaan.", "A wife may come from elsewhere, but Isaac must remain in the land."]),
    phrase("🌌 The LORD God Of Heaven", ["Abraham grounds the mission in God's rule.", "The God who called him can guide the servant.", "Isaac's marriage is placed under divine authority."]),
    phrase("🪽 He Shall Send His Angel", ["Abraham believes God will guide ahead of the servant.", "The servant travels, but God goes before him.", "Confidence rests on God's providence."]),
    phrase("🆓 If The Woman Will Not Be Willing", ["Abraham does not tell the servant to force the woman.", "The oath has boundaries.", "Obedience does not mean manipulation."]),
    phrase("🤝 The Servant Swore", ["The servant accepts the mission solemnly.", "His journey begins under oath.", "The search for Rebekah is treated as sacred responsibility."]),
  ] },
  { chapter: 24, startVerse: 10, endVerse: 14, reference: "Genesis 24:10-14", title: "The Servant Prays At The Well", icon: "🙏", phrases: [
    phrase("🐪 Ten Camels", ["The camels show Abraham's household wealth.", "They also make Rebekah's later service more impressive.", "Giving water to ten camels is hard work."]),
    phrase("💧 Well Of Water", ["The well is a practical place to meet women drawing water.", "The servant uses wisdom while depending on God.", "Ordinary places become settings for providence."]),
    phrase("🌆 At Evening Time", ["The timing fits the daily rhythm of drawing water.", "The servant positions himself where the answer may appear.", "Faith and practical wisdom work together."]),
    phrase("🙏 O LORD God Of My Master Abraham", ["The servant prays to Abraham's God.", "He understands this is covenant business, not mere matchmaking.", "Prayer leads the mission."]),
    phrase("🤲 Show Kindness Unto My Master", ["Kindness means faithful covenant care.", "The servant asks God to show loyal love to Abraham's household.", "The mission depends on mercy."]),
    phrase("🐪 I Will Give Thy Camels Drink Also", ["The sign tests generosity and diligence.", "Watering camels takes time and strength.", "The servant is looking for character, not appearance only."]),
  ] },
  { chapter: 24, startVerse: 15, endVerse: 16, reference: "Genesis 24:15-16", title: "Rebekah Comes To The Well", icon: "👰", phrases: [
    phrase("⚡ Before He Had Done Speaking", ["Rebekah arrives before the prayer is finished.", "The timing is meant to stand out.", "God's answer is already walking toward the well."]),
    phrase("👰 Rebekah Came Out", ["Rebekah enters through an ordinary chore.", "She does not know she is stepping into covenant history.", "God often works through ordinary daily moments."]),
    phrase("👨‍👩‍👧 Bethuel", ["Her family connection matters.", "She belongs to Abraham's kin.", "The servant's mission is already being confirmed through details."]),
    phrase("✨ Very Fair To Look Upon", ["Genesis notes her beauty, but the scene will emphasize her character more.", "Beauty introduces her; service reveals her.", "The servant needs more than appearance."]),
    phrase("🏺 Pitcher Upon Her Shoulder", ["Rebekah is working when she appears.", "She is not introduced in a royal hall.", "Her character will be seen in ordinary responsibility."]),
  ] },
  { chapter: 24, startVerse: 17, endVerse: 21, reference: "Genesis 24:17-21", title: "Rebekah Serves The Servant And The Camels", icon: "💪", phrases: [
    phrase("🏃 The Servant Ran To Meet Her", ["The servant responds quickly when Rebekah appears.", "He asks for the very thing he prayed about.", "The test begins in real time."]),
    phrase("💧 Let Me Drink", ["The request is simple.", "A small act will reveal a large amount about character.", "Hospitality begins with water."]),
    phrase("⚡ She Hasted", ["Rebekah moves quickly to serve.", "Her speed shows eagerness and kindness.", "She does not treat help as a burden."]),
    phrase("🐪 I Will Draw Water For Thy Camels Also", ["Rebekah offers exactly what the servant prayed for.", "She goes beyond the minimum.", "Her generosity answers the prayer before she knows it."]),
    phrase("💪 Drew For All His Camels", ["This is serious work.", "Rebekah's kindness is costly and practical.", "Her actions reveal strength and diligence."]),
    phrase("👀 The Man Wondering At Her", ["The servant watches quietly.", "Faith does not turn off discernment.", "He wants to know whether the Lord has prospered his journey."]),
  ] },
  { chapter: 24, startVerse: 22, endVerse: 27, reference: "Genesis 24:22-27", title: "The Servant Worships The LORD", icon: "🙌", phrases: [
    phrase("💍 Golden Earring And Bracelets", ["The gifts honor Rebekah and signal the seriousness of the mission.", "This is not casual conversation at a well.", "A family covenant discussion is beginning."]),
    phrase("❓ Whose Daughter Art Thou?", ["The servant needs to know her family line.", "The answer matters because Abraham sent him to his relatives.", "Guidance is confirmed through details."]),
    phrase("🏠 Room In Thy Father's House", ["Rebekah's answer opens the door for hospitality.", "The mission can now move from the well to the household.", "Private prayer becomes family conversation."]),
    phrase("🙇 Bowed Down His Head", ["The servant responds with worship.", "He does not congratulate himself for clever planning.", "He recognizes God's hand."]),
    phrase("🙌 Blessed Be The LORD", ["Praise comes before negotiation.", "The servant names God as the source of guidance.", "Answered prayer should lead to worship."]),
    phrase("🧭 The LORD Led Me", ["This summarizes the servant's journey.", "He walked in obedience, prayed, watched, and God guided.", "Guidance unfolded as he went."]),
  ] },
  { chapter: 24, startVerse: 28, endVerse: 31, reference: "Genesis 24:28-31", title: "Rebekah Runs To Tell Her Family", icon: "🏃", phrases: [
    phrase("🏃 The Damsel Ran", ["Rebekah moves quickly again.", "Her speed marks the whole scene.", "The answer to prayer now reaches her household."]),
    phrase("🗣️ Told Them Of Her Mother's House", ["Rebekah reports what happened.", "The family must now respond to the servant's arrival.", "The story moves from well to home."]),
    phrase("👀 Laban Saw The Earring And Bracelets", ["Laban notices the gifts.", "The visible signs show this visitor is important.", "His response may include hospitality and interest in wealth."]),
    phrase("🏃 Laban Ran Out", ["Laban hurries to meet the servant.", "The household is stirred by Rebekah's report.", "The private encounter becomes public."]),
    phrase("🏠 Come In, Thou Blessed Of The LORD", ["Laban welcomes the servant with religious language.", "Hospitality opens the door for testimony.", "The servant will now explain the mission."]),
  ] },
  { chapter: 24, startVerse: 32, endVerse: 33, reference: "Genesis 24:32-33", title: "The Servant Refuses To Eat Before Speaking", icon: "🍽️", phrases: [
    phrase("🐪 He Ungirded His Camels", ["The household cares for the travelers and animals.", "Hospitality is practical.", "The camels that Rebekah watered are still part of the scene."]),
    phrase("🧼 Water To Wash His Feet", ["Travelers needed refreshment after the road.", "The welcome is real and concrete.", "Ancient hospitality provided rest, washing, and food."]),
    phrase("🍽️ There Was Set Meat Before Him", ["The servant is offered food.", "The household receives him properly.", "But his mission weighs heavier than his appetite."]),
    phrase("🗣️ I Will Not Eat Until I Have Told Mine Errand", ["The servant refuses to eat before explaining.", "His loyalty to Abraham's mission comes first.", "Answered prayer must be followed by faithful testimony."]),
  ] },
  { chapter: 24, startVerse: 34, endVerse: 41, reference: "Genesis 24:34-41", title: "The Servant Explains Abraham's Command", icon: "🗣️", phrases: [
    phrase("🧳 I Am Abraham's Servant", ["The servant begins with his identity under Abraham.", "He does not make himself the center.", "His role is faithful representation."]),
    phrase("🙌 The LORD Hath Blessed My Master", ["Abraham's wealth is explained as God's blessing.", "The servant is not merely bragging.", "He is showing that Isaac belongs to a family marked by promise."]),
    phrase("👦 Unto Him Hath He Given All", ["Isaac is the heir.", "This matters because the marriage request concerns the covenant son.", "Rebekah's family must understand Isaac's place."]),
    phrase("🤝 My Master Made Me Swear", ["The servant explains the oath.", "His mission carries solemn responsibility.", "He is not acting casually."]),
    phrase("🚫 Thou Shalt Not Take A Wife", ["Abraham's boundary is repeated.", "The covenant line must not be pulled into Canaanite household life.", "Marriage is spiritually significant."]),
    phrase("🪽 He Will Send His Angel", ["Abraham's confidence in divine guidance is repeated.", "The mission depends on the Lord going before the servant.", "The servant's story is framed by God's providence."]),
  ] },
  { chapter: 24, startVerse: 42, endVerse: 49, reference: "Genesis 24:42-49", title: "The Servant Retells God's Guidance", icon: "🧭", phrases: [
    phrase("💧 I Came This Day Unto The Well", ["The servant retells the key moment.", "He wants the family to see how the guidance unfolded.", "The well became the place of answered prayer."]),
    phrase("🙏 O LORD God Of My Master Abraham", ["He repeats the prayer to show dependence.", "The mission was entrusted to God.", "This is testimony, not just explanation."]),
    phrase("🏺 Let Down Thy Pitcher", ["He repeats the sign exactly.", "Rebekah matched the prayer before she knew it.", "Providence is shown through precise details."]),
    phrase("⚡ Before I Had Done Speaking", ["The timing is highlighted again.", "Rebekah came before the prayer was finished.", "The family is meant to feel this was not random."]),
    phrase("🙌 I Bowed Down My Head", ["The servant includes his worship in the story.", "He did not merely receive guidance; he praised the Lord.", "Answered prayer deserves gratitude."]),
    phrase("🧭 Led Me In The Right Way", ["This is the servant's conclusion.", "God guided him to the right house and person.", "Now the family must respond faithfully."]),
    phrase("🤝 Deal Kindly And Truly", ["The servant asks for a clear answer.", "Kindness and truth mean loyal, honest dealing.", "Delay or manipulation would cloud what God made clear."]),
  ] },
  { chapter: 24, startVerse: 50, endVerse: 53, reference: "Genesis 24:50-53", title: "Rebekah's Family Recognizes The LORD's Will", icon: "🙌", phrases: [
    phrase("🙌 The Thing Proceedeth From The LORD", ["Rebekah's family recognizes God's hand.", "The prayer, timing, well, and response point beyond human planning.", "They cannot honestly deny the Lord's guidance."]),
    phrase("🗣️ We Cannot Speak Bad Or Good", ["They admit the matter is beyond their control.", "God's leading is too clear to argue against.", "The family yields to the Lord's direction."]),
    phrase("👰 Rebekah Is Before Thee", ["The decision moves from discussion to action.", "Rebekah is presented as the answer to the mission.", "The servant's prayer is becoming a marriage arrangement."]),
    phrase("🎁 Jewels Of Silver And Gold", ["The gifts honor Rebekah and her family.", "They show the seriousness of the agreement.", "The marriage is treated with weight and dignity."]),
    phrase("👗 Raiment", ["Clothing is included among the gifts.", "The agreement becomes tangible.", "Rebekah is being prepared and honored for her new household."]),
  ] },
  { chapter: 24, startVerse: 54, endVerse: 58, reference: "Genesis 24:54-58", title: "Rebekah Chooses To Go", icon: "🚶", phrases: [
    phrase("🌅 Send Me Away Unto My Master", ["The servant does not want unnecessary delay.", "His loyalty remains fixed on completing the mission.", "Answered prayer still requires follow-through."]),
    phrase("⏳ Abide With Us A Few Days", ["Rebekah's family naturally wants time before she leaves.", "The request feels human.", "Major obedience touches real family emotions."]),
    phrase("🚫 Hinder Me Not", ["The servant sees God's guidance and wants to obey promptly.", "Delay could become resistance.", "He asks them not to slow what the Lord has prospered."]),
    phrase("❓ Wilt Thou Go With This Man?", ["Rebekah is given a voice in the decision.", "Her answer matters.", "The story does not move her like property."]),
    phrase("🚶 I Will Go", ["Rebekah's answer is short and brave.", "She leaves home, family, and familiarity for a future she has not seen.", "Her journey echoes Abraham's earlier call to go."]),
  ] },
  { chapter: 24, startVerse: 59, endVerse: 61, reference: "Genesis 24:59-61", title: "Rebekah Leaves Her Family", icon: "👣", phrases: [
    phrase("👋 They Sent Away Rebekah", ["The family releases Rebekah to the journey.", "A major transition happens in a few words.", "The covenant story moves forward through departure."]),
    phrase("👩 Her Nurse", ["Rebekah does not travel alone.", "Her nurse going with her adds tenderness and realism.", "Family support accompanies her into the unknown."]),
    phrase("🙌 They Blessed Rebekah", ["Her family sends her with blessing.", "The words look toward descendants, strength, and victory.", "Rebekah leaves with hope spoken over her future."]),
    phrase("👨‍👩‍👧 Be Thou The Mother Of Thousands", ["The blessing imagines a large future family.", "This connects Rebekah to the covenant theme of multiplication.", "Her life will matter for generations."]),
    phrase("🏰 Possess The Gate", ["The blessing speaks of victory over enemies.", "Rebekah is connected to a strong future.", "The promise family will face opposition, but not be erased."]),
    phrase("🐪 They Rode Upon The Camels", ["The journey begins physically.", "The camels that framed the servant's arrival now carry Rebekah away.", "The answer to prayer is on the road to Isaac."]),
  ] },
  { chapter: 24, startVerse: 62, endVerse: 65, reference: "Genesis 24:62-65", title: "Isaac And Rebekah See Each Other", icon: "👀", phrases: [
    phrase("🌾 Isaac Came From The Way", ["Isaac finally enters the chapter near the end.", "The whole mission has been moving toward him.", "The promised son is about to receive the wife God guided to him."]),
    phrase("🌅 Isaac Went Out To Meditate", ["Isaac is alone in the field at evening.", "The scene is quiet after a long chapter of travel and negotiation.", "Genesis slows the story into reflection."]),
    phrase("👀 Rebekah Lifted Up Her Eyes", ["Rebekah sees Isaac before she knows him fully.", "The journey now becomes personal.", "The woman who said I will go is arriving at the future she chose."]),
    phrase("🐪 She Lighted Off The Camel", ["Rebekah gets down when she sees Isaac.", "The action shows respect and readiness for the meeting.", "The long travel is ending."]),
    phrase("❓ What Man Is This?", ["Rebekah asks about Isaac.", "The question is tender because she is about to meet the man she left home to marry.", "A covenant mission becomes a human introduction."]),
    phrase("🧕 She Took A Veil", ["The veil marks modesty and seriousness in that setting.", "Rebekah prepares to meet Isaac with honor.", "The scene is personal, not merely transactional."]),
  ] },
  { chapter: 24, startVerse: 66, endVerse: 67, reference: "Genesis 24:66-67", title: "Isaac Marries Rebekah", icon: "❤️", phrases: [
    phrase("🗣️ The Servant Told Isaac", ["Isaac hears the whole story.", "The servant's testimony connects Isaac to the prayer, the well, and God's guidance.", "Their marriage begins under the memory of providence."]),
    phrase("⛺ Sarah's Tent", ["Isaac brings Rebekah into Sarah's tent.", "This is emotionally significant because Sarah has died.", "Rebekah enters the household where the promise must continue."]),
    phrase("👰 She Became His Wife", ["The mission is completed.", "Rebekah becomes Isaac's wife.", "The next generation of the covenant family is formed."]),
    phrase("❤️ He Loved Her", ["The chapter ends with love, not only arrangement.", "Isaac receives Rebekah with affection.", "The promise continues through a real marriage."]),
    phrase("🕊️ Isaac Was Comforted", ["Isaac's grief over Sarah is not ignored.", "Rebekah's arrival brings comfort after loss.", "God's providence cares for covenant future and human sorrow."]),
  ] },
];

function getDay9TeachingTexture(section: PersonalGenesisPhraseSectionInput, heading: string) {
  const lower = `${section.reference} ${section.title} ${heading}`.toLowerCase();

  if (section.chapter === 21 && section.startVerse <= 7) {
    return [
      "Genesis keeps tying this moment back to what God already said.",
      "Isaac's birth is not just a happy family event; it is proof that God's promise can outlive delay, age, and doubt.",
      "When the Bible repeats promise language, it is teaching us to trust God's word more than what looks possible in the moment.",
    ];
  }

  if (section.chapter === 21 && section.startVerse >= 8 && section.endVerse <= 13) {
    return [
      "The joy around Isaac does not erase the damage already inside Abraham's household.",
      "Genesis is showing both covenant direction and real family pain at the same time.",
      "God's promise moves forward, but human shortcuts, favoritism, and fear can still leave wounds that must be faced.",
    ];
  }

  if (section.chapter === 21 && section.startVerse >= 14 && section.endVerse <= 21) {
    return [
      "Hagar and Ishmael are outside Abraham's tent, but they are not outside God's sight.",
      "The wilderness scene teaches that God hears the vulnerable, the rejected, and the desperate.",
      "Bible Buddy readers should not rush past this pain; God's mercy here is practical, personal, and life-saving.",
    ];
  }

  if (section.chapter === 21) {
    return [
      "Wells, oaths, and place names are not random background details in Genesis.",
      "Abraham is learning to live in the promised land through worship, public agreements, and real-world conflict.",
      "Faith is not only private belief; it shapes how God's people handle property, peace, neighbors, and worship.",
    ];
  }

  if (section.chapter === 22 && section.endVerse <= 8) {
    return [
      "Genesis slows the test down so the reader feels the weight of every step.",
      "Abraham's faith is being brought into the open through the son he loves most.",
      "This passage is not about God enjoying pain; it is about whether Abraham trusts the Giver even with the gift.",
    ];
  }

  if (section.chapter === 22 && section.startVerse >= 9 && section.endVerse <= 14) {
    return [
      "The scene reaches the edge of loss before God reveals the substitute.",
      "Abraham obeys, but the Lord provides what saves Isaac.",
      "The point is not heroic self-sufficiency; the mountain teaches that the Lord Himself provides.",
    ];
  }

  if (section.chapter === 22 && section.startVerse >= 15 && section.endVerse <= 19) {
    return [
      "After the test, God repeats and strengthens the covenant promise.",
      "The promise is not weakened by Abraham's surrender; it is confirmed by God's own oath.",
      "God's plan for blessing the nations rests on His faithfulness, not on Abraham controlling the future.",
    ];
  }

  if (section.chapter === 22) {
    return [
      "This genealogy is placed right after Isaac is spared.",
      "Genesis is quietly preparing Isaac's future wife before Genesis 24 begins.",
      "Even lists of names can carry story movement when God is preparing the next generation.",
    ];
  }

  if (section.chapter === 23 && section.endVerse <= 9) {
    return [
      "Genesis treats Sarah's death, Abraham's grief, and the land question with real care.",
      "Abraham believes God's promise, but he still has to mourn and still has to buy a burial place.",
      "Faith does not make grief fake; it teaches us to grieve while still holding onto God's future.",
    ];
  }

  if (section.chapter === 23) {
    return [
      "The purchase details are repeated because legal ownership matters in the promise story.",
      "Abraham's first secured piece of Canaan is a burial place, which ties hope to the land even in death.",
      "The promise is not fully possessed yet, but Sarah's grave becomes a quiet marker of faith.",
    ];
  }

  if (section.chapter === 24 && section.endVerse <= 9) {
    return [
      "Abraham's concern is not only that Isaac gets married, but that the covenant future is protected.",
      "The servant's oath, the family line, and the promised land all matter together.",
      "Genesis treats marriage as spiritually serious because households shape future faithfulness.",
    ];
  }

  if (section.chapter === 24 && section.startVerse >= 10 && section.endVerse <= 21) {
    return [
      "The servant prays, watches, and tests for character, not just appearance.",
      "Rebekah's kindness is shown through ordinary work that costs time and strength.",
      "God's guidance often becomes clear through prayer, wisdom, timing, and visible character.",
    ];
  }

  if (section.chapter === 24 && section.startVerse >= 22 && section.endVerse <= 49) {
    return [
      "The servant keeps retelling the details because he wants the family to recognize God's hand.",
      "Answered prayer becomes testimony, and testimony calls for a faithful response.",
      "When God guides clearly, the right response is worship, honesty, and obedience without manipulation.",
    ];
  }

  if (section.chapter === 24 && section.startVerse >= 50 && section.endVerse <= 61) {
    return [
      "Rebekah is not moved like an object; the family asks her, and she answers.",
      "Her 'I will go' is a brave step from the familiar into the covenant future.",
      "Faith sometimes sounds simple, but it can require leaving comfort, family, and certainty behind.",
    ];
  }

  return [
    "This detail is part of the larger covenant movement from Abraham to Isaac.",
    "Genesis is teaching through small phrases, not only through big dramatic scenes.",
    "Slowing down over the phrase helps the reader see promise, character, and consequence more clearly.",
  ];
}

function deepenDay9Phrase(section: PersonalGenesisPhraseSectionInput, entry: [string, string]): [string, string] {
  const [heading, content] = entry;
  const lines = content.split("\n\n").filter(Boolean);
  if (lines.length >= 6) return entry;

  const texture = getDay9TeachingTexture(section, heading);
  const needed = Math.max(0, 6 - lines.length);
  return [heading, note([...lines, ...texture.slice(0, needed)])];
}

function cleanDay9PhraseTitle(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function renameDay9WeakPhraseTitle(section: PersonalGenesisPhraseSectionInput, title: string) {
  const cleanTitle = cleanDay9PhraseTitle(title);
  const key = `${section.reference}|${cleanTitle}`;

  const replacements: Record<string, string> = {
    "Genesis 21:8-10|Mocking": "The Son Of Hagar The Egyptian, Which She Had Born Unto Abraham, Mocking",
    "Genesis 21:25-31|Beer-sheba": "Wherefore He Called That Place Beer-sheba",
    "Genesis 22:13-14|Jehovah-jireh": "Called The Name Of That Place Jehovah-jireh",
    "Genesis 22:19|Beersheba": "Abraham Dwelt At Beer-sheba",
    "Genesis 22:20-24|Nahor": "Milcah, She Hath Also Born Children Unto Thy Brother Nahor",
    "Genesis 22:20-24|Bethuel": "Bethuel Begat Rebekah",
    "Genesis 24:15-16|Bethuel": "Daughter Of Bethuel The Son Of Milcah",
    "Genesis 24:50-53|Raiment": "Jewels Of Silver, And Jewels Of Gold, And Raiment",
  };

  return replacements[key] ?? cleanTitle;
}

function normalizeDay9Phrase(section: PersonalGenesisPhraseSectionInput, entry: [string, string]): [string, string] {
  const [heading, content] = deepenDay9Phrase(section, entry);
  const title = renameDay9WeakPhraseTitle(section, heading);
  return [titleHasDay9Emoji(title) ? title : `${getDay9PhraseEmoji(title)} ${title}`, content];
}

function completeDay9MinimumPhraseDensity(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  if (section.reference !== "Genesis 22:19" || section.phrases.length >= 4) {
    return section;
  }

  return {
    ...section,
    phrases: [
      ...section.phrases,
      phrase("🚶 Rose Up And Went Together To Beer-sheba", [
        "Abraham and the young men leave the mountain and return together.",
        "The test is over, but Abraham still has to walk back into ordinary life.",
        "Beer-sheba becomes the place where the family continues after surrender, provision, and worship.",
        "The promise has survived the altar because the LORD provided.",
        "Genesis moves from the mountain back to the road.",
        "Faith must keep walking after the crisis has passed.",
      ]),
    ],
  };
}

function titleHasDay9Emoji(title: string) {
  return /^[^A-Za-z0-9']/.test(title.trim());
}

function getDay9PhraseEmoji(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("lord") || lower.includes("god") || lower.includes("angel")) return "🙌";
  if (lower.includes("bless") || lower.includes("covenant") || lower.includes("oath") || lower.includes("sworn")) return "📜";
  if (lower.includes("isaac") || lower.includes("son") || lower.includes("child") || lower.includes("seed") || lower.includes("born")) return "👶";
  if (lower.includes("sarah") || lower.includes("rebekah") || lower.includes("hagar")) return "👩";
  if (lower.includes("abraham") || lower.includes("servant") || lower.includes("esau") || lower.includes("ishmael")) return "👤";
  if (lower.includes("water") || lower.includes("well") || lower.includes("drink") || lower.includes("camels")) return "💧";
  if (lower.includes("land") || lower.includes("field") || lower.includes("cave") || lower.includes("moriah") || lower.includes("beersheba")) return "📍";
  if (lower.includes("altar") || lower.includes("offering") || lower.includes("ram") || lower.includes("lamb")) return "🐏";
  if (lower.includes("died") || lower.includes("buried") || lower.includes("bury") || lower.includes("dead")) return "🪦";
  if (lower.includes("laughed") || lower.includes("laugh")) return "😂";
  if (lower.includes("saw") || lower.includes("eyes") || lower.includes("look")) return "👀";
  if (lower.includes("heard") || lower.includes("hearken")) return "👂";
  if (lower.includes("went") || lower.includes("go") || lower.includes("journey") || lower.includes("came")) return "🚶";
  if (lower.includes("wife") || lower.includes("marry") || lower.includes("veil")) return "💍";
  return "🔎";
}

const DAY_9_FINAL_SECTIONS = DAY_9_RESTRUCTURED_SECTIONS.map((section) => ({
  ...section,
  phrases: section.phrases.map((entry) => normalizeDay9Phrase(section, entry)),
})).map(completeDay9MinimumPhraseDensity);


function makeGenesis25To30BeginnerPhrase(title: string, section: PersonalGenesisPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the family story is easier to follow.`,
    focus,
    "Genesis is not giving random family drama.",
    "It is showing promise, pressure, choices, and consequences inside Abraham's family line.",
    "👥 Family",
    "📜 Promise",
    "⚖️ Consequences",
    `In ${section.title}, the reader is meant to notice how ordinary decisions shape the covenant story.`,
    "That makes the phrase worth pausing over instead of rushing past it.",
  ]);
}

function ensureGenesis25To30PhraseDepth(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  if (section.chapter < 25 || section.chapter > 30 || section.phrases.length >= 7) {
    return section;
  }

  const additions: Array<[string, string]> = [
    makeGenesis25To30BeginnerPhrase("🧭 What Is Happening Here?", section, "This phrase helps the reader know who is acting, what is at stake, and where the family line is moving."),
    makeGenesis25To30BeginnerPhrase("🔎 Why This Detail Matters", section, "This detail matters because Genesis often teaches through names, places, gifts, wells, meals, blessings, and family tension."),
    makeGenesis25To30BeginnerPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why the story slows down here, but the slowdown helps explain the next conflict or blessing."),
    makeGenesis25To30BeginnerPhrase("🧵 Watch The Pattern", section, "Watch the pattern of promise and pressure: God speaks, people choose, families react, and the covenant line keeps moving."),
    makeGenesis25To30BeginnerPhrase("❤️ What This Shows About People", section, "This scene shows people wanting blessing, security, love, control, or relief, sometimes in faithful ways and sometimes in broken ways."),
    makeGenesis25To30BeginnerPhrase("🙌 What This Shows About God", section, "This scene shows God staying faithful while the family learns slowly, makes costly choices, and still depends on His promise."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

const DAY_10_RESTRUCTURED_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 25, startVerse: 1, endVerse: 6, reference: "Genesis 25:1-6", title: "Abraham Provides For His Sons", icon: "🎁", phrases: [
    phrase("👰 Abraham Took A Wife", ["Abraham's story does not end immediately after Sarah's death.", "Keturah enters the family story and Abraham has more children.", "Genesis shows that Abraham becomes the father of many nations in more ways than one."]),
    phrase("👶 She Bare Him", ["These sons become family lines of their own.", "The names may feel like a list, but they show God's word about Abraham's many descendants taking shape.", "God's promise is becoming history."]),
    phrase("🎁 Abraham Gave All That He Had Unto Isaac", ["Isaac remains the covenant heir.", "Abraham has other sons, but the promise line is protected through Isaac.", "This keeps Genesis focused on the son God chose."]),
    phrase("🧭 Sent Them Away From Isaac", ["Abraham gives gifts to his other sons and sends them eastward.", "This creates separation so Isaac's role is clear.", "The family is large, but the covenant line is specific."]),
    phrase("🌅 Eastward", ["Eastward often signals movement away from the main promise line in Genesis.", "These sons have futures, but the narrative will follow Isaac.", "God can care for many lines while still tracing one covenant story."]),
  ] },
  { chapter: 25, startVerse: 7, endVerse: 11, reference: "Genesis 25:7-11", title: "Abraham Dies And Isaac Is Blessed", icon: "🪦", phrases: [
    phrase("📅 An Hundred Threescore And Fifteen Years", ["Abraham dies at 175.", "Genesis gives the number because his long life matters.", "The man who left home by faith reaches the end of his earthly journey."]),
    phrase("🌅 A Good Old Age", ["This phrase honors the fullness of Abraham's life.", "His life was not easy, but it was held by God's promise.", "Faithful lives can still include waiting, failure, grief, and blessing."]),
    phrase("🪦 Gathered To His People", ["This means more than the physical burial that follows.", "Abraham joins those who died before him.", "The covenant story continues, but Abraham's personal journey is complete."]),
    phrase("🤝 Isaac And Ishmael Buried Him", ["The two sons come together to bury their father.", "After years of family pain, this is a quiet moment of shared honor.", "Genesis does not erase brokenness, but it lets us see this solemn reunion."]),
    phrase("🕳️ Cave Of Machpelah", ["Abraham is buried in the family burial place he bought for Sarah.", "His body rests in the land of promise.", "Even death is tied to faith in God's future."]),
    phrase("🙌 God Blessed His Son Isaac", ["After Abraham dies, God's blessing continues with Isaac.", "The promise does not die with the first generation.", "God remains faithful beyond Abraham's lifetime."]),
  ] },
  { chapter: 25, startVerse: 12, endVerse: 18, reference: "Genesis 25:12-18", title: "Ishmael's Line Becomes A Nation", icon: "🏕️", phrases: [
    phrase("📜 Generations Of Ishmael", ["Genesis pauses to record Ishmael's family.", "He is not the covenant line, but he is not forgotten.", "God keeps the promise He made about Ishmael too."]),
    phrase("👩 Hagar The Egyptian", ["Hagar is named again in connection with Ishmael.", "Her painful wilderness story is not erased.", "The boy God heard becomes the father of a named people."]),
    phrase("👑 Twelve Princes", ["Ishmael's descendants become twelve leaders.", "This fulfills God's word that Ishmael would become a great nation.", "The rejected child grows into a structured people."]),
    phrase("🏘️ Towns And Castles", ["Ishmael's line has settlements and places of strength.", "Genesis shows real development, not a vague afterthought.", "God's promises create visible history."]),
    phrase("🪦 He Gave Up The Ghost And Died", ["Ishmael's life is also brought to a close.", "Genesis honors his line before returning to Isaac.", "The wider Abraham family is acknowledged."]),
    phrase("⚔️ In The Presence Of All His Brethren", ["This connects back to earlier words about Ishmael's independence and tension.", "His descendants live in relation to surrounding peoples.", "God's word about him unfolds across generations."]),
  ] },
  { chapter: 25, startVerse: 19, endVerse: 23, reference: "Genesis 25:19-23", title: "Rebekah Carries Two Nations", icon: "🤰", phrases: [
    phrase("📜 Generations Of Isaac", ["The story now turns fully to Isaac.", "Abraham's life has closed, and the covenant line moves forward.", "Genesis is handing the focus to the next generation."]),
    phrase("💔 Rebekah Was Barren", ["The promise line again faces barrenness.", "Like Sarah before her, Rebekah cannot produce the future by human strength.", "The family grows only by God's help."]),
    phrase("🙏 Isaac Intreated The LORD", ["Isaac prays for his wife.", "This matters because he turns to God instead of forcing the promise through a shortcut.", "The next generation must learn dependence too."]),
    phrase("👂 The LORD Was Intreated Of Him", ["God answers Isaac's prayer.", "The promised family continues because God responds with mercy.", "Prayer becomes part of how the covenant moves forward."]),
    phrase("🤼 The Children Struggled Together", ["The conflict begins before birth.", "Jacob and Esau are not simply different personalities later.", "Their struggle is woven into the story from the womb."]),
    phrase("❓ Why Am I Thus?", ["Rebekah seeks understanding from the Lord.", "Her painful pregnancy drives her to ask God what is happening.", "Confusion becomes a doorway to revelation."]),
    phrase("🌍 Two Nations Are In Thy Womb", ["Rebekah is carrying more than twins.", "She is carrying the beginnings of two peoples: Israel and Edom.", "One household conflict will become national history."]),
    phrase("🔄 The Elder Shall Serve The Younger", ["God reverses normal firstborn expectations.", "The promise will not move by ordinary birth order.", "God chooses the younger before either child can earn the role."]),
  ] },
  { chapter: 25, startVerse: 24, endVerse: 28, reference: "Genesis 25:24-28", title: "Jacob And Esau Are Born", icon: "👶", phrases: [
    phrase("👶 There Were Twins", ["The word from God is now visible.", "Rebekah gives birth to two sons who will carry a deep rivalry.", "The story of Jacob and Esau begins at birth."]),
    phrase("🔴 Red, All Over Like An Hairy Garment", ["Esau's appearance is memorable from the start.", "His name and identity are connected to his physical traits.", "Genesis makes the brothers feel distinct immediately."]),
    phrase("✋ His Hand Took Hold On Esau's Heel", ["Jacob is born grasping.", "The image fits his later story as one who struggles and supplants.", "Before he speaks, his posture already hints at conflict."]),
    phrase("📛 His Name Was Called Jacob", ["Jacob's name is connected with heel-grabbing and supplanting.", "The name becomes a window into his story.", "He will spend much of his life grasping for blessing."]),
    phrase("🏹 Esau Was A Cunning Hunter", ["Esau grows into a skilled man of the field.", "He is active, rugged, and impressive.", "His identity pulls him toward appetite, game, and outdoor strength."]),
    phrase("⛺ Jacob Was A Plain Man", ["Plain can mean quiet, settled, or complete.", "Jacob lives around the tents.", "The brothers are different in temperament and daily life."]),
    phrase("🍖 Isaac Loved Esau", ["Isaac's love is tied to venison.", "This exposes favoritism in the household.", "A father's appetite becomes connected to family division."]),
    phrase("❤️ Rebekah Loved Jacob", ["Rebekah favors Jacob.", "The parents are divided over the sons.", "Genesis is preparing the emotional fracture that explodes in chapter 27."]),
  ] },
  { chapter: 25, startVerse: 29, endVerse: 34, reference: "Genesis 25:29-34", title: "Esau Sells The Birthright", icon: "🥣", phrases: [
    phrase("🥣 Jacob Sod Pottage", ["The scene begins with ordinary food.", "A bowl of stew becomes the setting for a major spiritual failure.", "Genesis often places big decisions inside everyday moments."]),
    phrase("😩 Esau Came From The Field, And He Was Faint", ["Esau is driven by immediate hunger.", "His body feels urgent, and he lets that urgency lead him.", "The scene tests what he values when appetite is loud."]),
    phrase("🔴 That Same Red Pottage", ["The red stew connects to Esau's identity and later name Edom.", "The detail makes the moment memorable.", "A meal becomes attached to a family destiny."]),
    phrase("💰 Sell Me This Day Thy Birthright", ["Jacob exploits Esau's hunger.", "He sees a chance to gain advantage.", "The promised family is already full of grasping and weakness."]),
    phrase("⚰️ I Am At The Point To Die", ["Esau exaggerates his hunger.", "He treats the present moment as if it is everything.", "Short-term desire makes long-term blessing seem worthless."]),
    phrase("🤝 He Sold His Birthright", ["The birthright involved inheritance, leadership, and family responsibility.", "In Abraham's family, it also touches the covenant future.", "Esau trades something weighty for something temporary."]),
    phrase("🥣 Bread And Pottage Of Lentiles", ["The text lists the simple meal so we feel the smallness of the trade.", "Bread and stew are not evil, but they are not worth the birthright.", "Esau's values are exposed."]),
    phrase("🚫 Esau Despised His Birthright", ["This is the verdict of the passage.", "Esau did not merely lose the birthright; he treated it as small.", "Genesis wants readers to feel the danger of despising holy things."]),
  ] },
  { chapter: 26, startVerse: 1, endVerse: 5, reference: "Genesis 26:1-5", title: "God Speaks To Isaac In Famine", icon: "🌾", phrases: [
    phrase("🌾 There Was A Famine", ["Isaac faces famine just like Abraham did.", "Being in the promise does not mean life becomes problem-free.", "Isaac must learn trust in his own generation."]),
    phrase("📍 Unto Gerar", ["Isaac moves under pressure.", "The location places him among the Philistines.", "The promise is being tested in a foreign setting."]),
    phrase("🚫 Go Not Down Into Egypt", ["God gives Isaac a clear boundary.", "Egypt may look like survival, but God calls Isaac to stay where He commands.", "Safety is found in obedience, not just in strategy."]),
    phrase("⛺ Sojourn In This Land", ["Isaac is to live as a temporary resident in the land.", "He does not yet possess everything, but he must remain present.", "The promise requires patient faith."]),
    phrase("🙌 I Will Be With Thee", ["God promises presence before explaining outcomes.", "Isaac is not alone in famine.", "The Lord's presence is the foundation of courage."]),
    phrase("📜 I Will Perform The Oath", ["God ties Isaac's future to the oath made to Abraham.", "The covenant does not restart from zero.", "God keeps promises across generations."]),
    phrase("⭐ As The Stars Of Heaven", ["The descendant promise is repeated to Isaac.", "God's plan is still expansive.", "Famine cannot cancel fruitfulness promised by God."]),
    phrase("👂 Abraham Obeyed My Voice", ["God remembers Abraham's obedience.", "Isaac inherits promise, but he is also called into covenant faithfulness.", "The family story is built on hearing and obeying God."]),
  ] },
  { chapter: 26, startVerse: 6, endVerse: 11, reference: "Genesis 26:6-11", title: "Isaac Lies About Rebekah", icon: "😨", phrases: [
    phrase("📍 Isaac Dwelt In Gerar", ["Isaac stays where God told him to sojourn.", "But staying in the right place does not automatically remove fear.", "Obedience and weakness can exist in the same person."]),
    phrase("❓ The Men Asked Him Of His Wife", ["The pressure becomes personal.", "Isaac must decide whether to trust God's protection.", "The question exposes his fear."]),
    phrase("😨 She Is My Sister", ["Isaac repeats Abraham's fear pattern.", "He lies because he is afraid of being killed.", "Family weaknesses can repeat when fear is not surrendered to God."]),
    phrase("👀 Abimelech Looked Out At A Window", ["The deception is discovered by observation.", "Private fear becomes public exposure.", "Sin rarely stays as hidden as people think."]),
    phrase("❤️ Sporting With Rebekah", ["Abimelech realizes Rebekah is Isaac's wife.", "The lie falls apart through ordinary affection.", "The truth becomes visible."]),
    phrase("⚠️ What Is This Thou Hast Done?", ["Abimelech rebukes Isaac.", "A foreign king sees the danger of Isaac's lie.", "Genesis is honest when covenant people act wrongly."]),
    phrase("🛡️ He That Toucheth This Man Or His Wife", ["Rebekah is protected despite Isaac's fear.", "God's mercy keeps the situation from becoming worse.", "The Lord protects the promise even through human weakness."]),
  ] },
  { chapter: 26, startVerse: 12, endVerse: 16, reference: "Genesis 26:12-16", title: "Isaac Prospers And Is Envied", icon: "📈", phrases: [
    phrase("🌱 Isaac Sowed In That Land", ["Isaac plants in the land during a vulnerable season.", "Faith is not passive here.", "He works while trusting the promise."]),
    phrase("💯 Received An Hundredfold", ["The harvest is extraordinary.", "Genesis directly connects Isaac's increase to God's blessing.", "Famine does not have the final word."]),
    phrase("🙌 The LORD Blessed Him", ["The blessing is not credited to Isaac's brilliance.", "It is the Lord's favor on the covenant son.", "God's word in verses 3-4 is becoming visible."]),
    phrase("📈 The Man Waxed Great", ["Isaac becomes increasingly powerful.", "The promise is producing visible abundance.", "God's blessing affects ordinary life and resources."]),
    phrase("🐑 Possession Of Flocks", ["The text names the wealth so readers can see the scale.", "Isaac's household is becoming large.", "The blessing is tangible."]),
    phrase("😒 The Philistines Envied Him", ["Blessing brings jealousy.", "The people around Isaac feel threatened by his growth.", "God's favor does not always create peace with others."]),
    phrase("🚪 Go From Us", ["Abimelech asks Isaac to leave because he has become too mighty.", "Isaac's prosperity creates pressure and displacement.", "The promise continues, but not without conflict."]),
  ] },
  { chapter: 26, startVerse: 17, endVerse: 22, reference: "Genesis 26:17-22", title: "Isaac Reopens The Wells", icon: "💧", phrases: [
    phrase("🏞️ Valley Of Gerar", ["Isaac moves from the city area into the valley.", "He does not respond to conflict by forcing his way back.", "His path forward is patient and practical."]),
    phrase("💧 Digged Again The Wells", ["Isaac reopens wells from Abraham's days.", "Wells were sources of life in dry land.", "He restores what had been blocked."]),
    phrase("📛 Called Their Names", ["Isaac keeps the names Abraham gave.", "This honors continuity with his father.", "The covenant story is being carried forward through memory and work."]),
    phrase("⚔️ Esek", ["The first well is named for contention.", "Provision is met with argument.", "Isaac's life in the promise still includes conflict."]),
    phrase("⚔️ Sitnah", ["The second well is also disputed.", "The conflict does not end immediately.", "Isaac must keep trusting and moving."]),
    phrase("🌾 Rehoboth", ["Rehoboth means room or open spaces.", "After conflict, Isaac finally reaches a place without dispute.", "He names the well as testimony that the Lord made room for him."]),
    phrase("📈 We Shall Be Fruitful In The Land", ["Isaac sees room as a gift from the Lord.", "Fruitfulness is not only about crops; it is about God giving space to live.", "The promise breathes again after pressure."]),
  ] },
  { chapter: 26, startVerse: 23, endVerse: 25, reference: "Genesis 26:23-25", title: "God Appears To Isaac At Beersheba", icon: "⛺", phrases: [
    phrase("📍 Went Up To Beer-sheba", ["Isaac comes to a place already important in Abraham's story.", "The covenant memory of the family continues.", "God meets Isaac in the land of promise."]),
    phrase("🌙 The Same Night", ["God speaks at a specific moment.", "The timing feels personal after conflict and movement.", "Isaac receives reassurance when he needs it."]),
    phrase("🛡️ Fear Not", ["God speaks directly to Isaac's fear.", "Fear has shaped Isaac's lie and his pressure among the Philistines.", "God answers the emotion beneath the behavior."]),
    phrase("🙌 I Am With Thee", ["God repeats the promise of presence.", "Isaac's courage rests on God being with him.", "The Lord does not abandon him after weakness."]),
    phrase("📜 For My Servant Abraham's Sake", ["God ties Isaac's blessing to the covenant with Abraham.", "Isaac is living inside a promise bigger than himself.", "Grace is carrying the family forward."]),
    phrase("⛺ He Builded An Altar", ["Isaac responds with worship.", "He continues Abraham's altar-building pattern.", "The covenant line is spiritual before it is social or political."]),
    phrase("💧 Isaac's Servants Digged A Well", ["Worship and practical life sit side by side.", "Isaac calls on the Lord and his servants dig for water.", "Faith meets daily needs."]),
  ] },
  { chapter: 26, startVerse: 26, endVerse: 33, reference: "Genesis 26:26-33", title: "Isaac Makes Peace With Abimelech", icon: "🤝", phrases: [
    phrase("🧑‍✈️ Abimelech Went To Him", ["The king comes to Isaac with officials.", "Isaac's life has become impossible to ignore.", "Outsiders recognize something weighty about him."]),
    phrase("❓ Wherefore Come Ye To Me?", ["Isaac remembers that they sent him away.", "He names the tension honestly.", "Peace does not require pretending the past was harmless."]),
    phrase("👀 We Saw Certainly", ["Abimelech's group admits what they have seen.", "God's presence with Isaac is visible.", "The covenant blessing becomes public witness."]),
    phrase("🙌 The LORD Was With Thee", ["This repeats a key Genesis theme.", "Outsiders can see God's hand on the promise family.", "Isaac's life points beyond himself."]),
    phrase("🤝 Let There Be An Oath", ["They seek a formal peace agreement.", "Conflict over land and wells needs covenant structure.", "Faithful living includes wise agreements."]),
    phrase("🍽️ He Made Them A Feast", ["Isaac receives them peacefully.", "A meal seals the movement from hostility toward peace.", "Hospitality becomes part of reconciliation."]),
    phrase("💧 We Have Found Water", ["The servants find water after the oath.", "The scene ends with provision.", "Peace, worship, and water all gather at Beersheba."]),
    phrase("📍 Shebah / Beer-sheba", ["The place name connects oath and well.", "Isaac's story echoes Abraham's earlier Beersheba moment.", "The family memory deepens across generations."]),
  ] },
  { chapter: 26, startVerse: 34, endVerse: 35, reference: "Genesis 26:34-35", title: "Esau's Marriages Bring Grief", icon: "💔", phrases: [
    phrase("👤 Esau Was Forty Years Old", ["Esau is now making adult family decisions.", "His choices matter for the covenant household.", "Genesis places this before the blessing crisis for a reason."]),
    phrase("👰 Took To Wife", ["Marriage shapes family direction in Genesis.", "It is not treated as a private choice with no spiritual effect.", "Esau's marriages affect the whole household."]),
    phrase("🏘️ Daughters Of Heth", ["Esau marries Hittite women from the land.", "This contrasts with Abraham's concern that Isaac not marry Canaanite women.", "Esau's choices show distance from the covenant priorities."]),
    phrase("💔 Grief Of Mind", ["Isaac and Rebekah are deeply troubled.", "The phrase prepares the reader for Genesis 27.", "Family grief is already heavy before the blessing deception begins."]),
  ] },
  { chapter: 27, startVerse: 1, endVerse: 4, reference: "Genesis 27:1-4", title: "Isaac Prepares To Bless Esau", icon: "👴", phrases: [
    phrase("👴 Isaac Was Old", ["Isaac senses the end of life approaching.", "That gives the blessing scene urgency.", "A father's final blessing carried serious weight."]),
    phrase("👁️ His Eyes Were Dim", ["Isaac's physical blindness shapes the whole chapter.", "But the family also shows moral and spiritual confusion.", "The scene begins in limited sight."]),
    phrase("👦 Esau His Eldest Son", ["Isaac calls the firstborn son he favors.", "This matters because God already said the elder would serve the younger.", "Isaac's preference is moving against the revealed word."]),
    phrase("🏹 Take Thy Weapons", ["Isaac sends Esau into the field.", "The blessing is tied to the son Isaac enjoys as hunter.", "Family affection and appetite are tangled together."]),
    phrase("🍖 Make Me Savoury Meat", ["Food has shaped Isaac's love for Esau since Genesis 25.", "A meal becomes connected to a spiritual blessing.", "Personal preference is clouding a sacred moment."]),
    phrase("🙏 My Soul May Bless Thee", ["The blessing is not casual.", "Isaac intends to speak family future over Esau.", "This is why the deception that follows is so serious."]),
  ] },
  { chapter: 27, startVerse: 5, endVerse: 10, reference: "Genesis 27:5-10", title: "Rebekah Makes A Plan", icon: "🎭", phrases: [
    phrase("👂 Rebekah Heard", ["Rebekah knows Isaac's plan.", "She also knows God's word about Jacob.", "But she chooses manipulation instead of trust."]),
    phrase("🗣️ Spake Unto Jacob Her Son", ["Rebekah moves quickly to Jacob.", "The parents' favoritism is visible again: Isaac has Esau, Rebekah has Jacob.", "The household is divided."]),
    phrase("🍖 Savoury Meat", ["Rebekah plans to imitate Esau's meal.", "The deception uses Isaac's appetite.", "What Isaac loves becomes the doorway for the trick."]),
    phrase("🎯 That He May Bless Thee", ["Rebekah's goal is the blessing for Jacob.", "The outcome lines up with God's earlier word, but the method is deceit.", "Right outcomes do not make sinful methods faithful."]),
    phrase("👂 Obey My Voice", ["Rebekah gives Jacob commands that echo obedience language.", "But she is leading him into deception.", "Not every voice demanding obedience is aligned with God's way."]),
  ] },
  { chapter: 27, startVerse: 11, endVerse: 17, reference: "Genesis 27:11-17", title: "Jacob Fears Getting Caught", icon: "🐐", phrases: [
    phrase("🧔 Esau My Brother Is A Hairy Man", ["Jacob immediately sees the practical problem.", "He knows he does not match Esau.", "The plan requires more layers of disguise."]),
    phrase("🎭 I Shall Seem To Him As A Deceiver", ["Jacob is afraid of being exposed, not clearly grieved over lying.", "His concern is consequence more than righteousness.", "Genesis lets us see the crookedness inside the plan."]),
    phrase("⚠️ I Shall Bring A Curse", ["Jacob knows the blessing could become a curse if the deception fails.", "He understands the spiritual danger.", "Still, he does not walk away."]),
    phrase("🙋 Upon Me Be Thy Curse", ["Rebekah takes responsibility, but that does not make the deception clean.", "Her confidence pushes Jacob forward.", "The family is trying to manage God's promise by control."]),
    phrase("🐐 Two Good Kids Of The Goats", ["The goats become tools of deception.", "Later Genesis will use goats again when Jacob's sons deceive him about Joseph.", "Family deception echoes forward."]),
    phrase("👕 Goodly Raiment", ["Rebekah dresses Jacob in Esau's clothes.", "Jacob will receive the blessing covered in another man's identity.", "The scene is full of disguise."]),
    phrase("✋ Skins Upon His Hands", ["The goat skins imitate Esau's hair.", "The trick targets Isaac's weak eyesight.", "Deception grows more deliberate with every detail."]),
  ] },
  { chapter: 27, startVerse: 18, endVerse: 25, reference: "Genesis 27:18-25", title: "Jacob Lies To Isaac", icon: "🗣️", phrases: [
    phrase("🙋 I Am Esau Thy Firstborn", ["Jacob's first words to Isaac are a direct lie.", "He takes Esau's name and status for himself.", "The blessing scene is built on false identity."]),
    phrase("❓ How Is It That Thou Hast Found It So Quickly?", ["Isaac senses something is unusual.", "The speed raises suspicion.", "Deception often creates details that do not quite fit."]),
    phrase("🙏 The LORD Thy God Brought It To Me", ["Jacob brings God's name into the lie.", "This makes the deception even darker.", "Using religious language to cover sin is spiritually dangerous."]),
    phrase("✋ Come Near, That I May Feel Thee", ["Isaac tries to verify the son by touch.", "His sight is weak, so he relies on another sense.", "The disguise is tested."]),
    phrase("🗣️ The Voice Is Jacob's Voice", ["Isaac hears something true.", "Jacob sounds like Jacob.", "Truth is pressing through the lie."]),
    phrase("🤲 The Hands Are The Hands Of Esau", ["The disguise wins against Isaac's uncertainty.", "Touch overrules voice.", "The family blessing passes through confusion and deceit."]),
    phrase("❓ Art Thou My Very Son Esau?", ["Isaac asks one more direct question.", "Jacob has one more opportunity to stop.", "He chooses the lie again."]),
    phrase("🍽️ He Did Eat", ["The meal seals the deception further.", "Isaac receives the food he desired.", "Appetite and blessing remain tragically tangled."]),
  ] },
  { chapter: 27, startVerse: 26, endVerse: 29, reference: "Genesis 27:26-29", title: "Jacob Receives The Blessing", icon: "👑", phrases: [
    phrase("💋 Come Near Now, And Kiss Me", ["Isaac draws Jacob close.", "The intimacy of the moment makes the deception more painful.", "Family closeness is being used inside a lie."]),
    phrase("👃 Smelled The Smell Of His Raiment", ["Isaac trusts the scent of Esau's clothes.", "The disguise works because it imitates what Isaac expects.", "The blessing is given under sensory confusion."]),
    phrase("🌾 Smell Of A Field", ["The smell reminds Isaac of Esau's outdoor life.", "This connects back to Isaac's love for Esau's hunting.", "The father's affection is being manipulated."]),
    phrase("💧 Dew Of Heaven", ["The blessing asks for provision from above.", "Dew mattered in dry land.", "Isaac speaks abundance over Jacob."]),
    phrase("🌍 Fatness Of The Earth", ["The blessing includes fruitfulness and land provision.", "It echoes covenant themes of life, place, and abundance.", "Jacob receives words tied to future flourishing."]),
    phrase("👑 Let People Serve Thee", ["Authority is spoken over Jacob.", "This matches God's earlier word that the elder would serve the younger.", "The promise moves forward, though through a wounded path."]),
    phrase("🙇 Thy Mother's Sons Bow Down", ["Family rule is included in the blessing.", "This will deepen the conflict with Esau.", "The words Jacob wanted will cost the family dearly."]),
    phrase("🌍 Blessed Be He That Blesseth Thee", ["This echoes the Abrahamic promise.", "Jacob receives covenant language.", "God's plan continues, even through human failure."]),
  ] },
  { chapter: 27, startVerse: 30, endVerse: 33, reference: "Genesis 27:30-33", title: "Esau Returns Too Late", icon: "⏱️", phrases: [
    phrase("⏱️ As Soon As Isaac Had Made An End", ["The timing is painfully close.", "Jacob leaves and Esau arrives.", "Genesis makes the loss feel immediate."]),
    phrase("🍖 Savoury Meat", ["Esau brings the meal Isaac asked for.", "He has done what his father requested.", "But the blessing has already been given."]),
    phrase("❓ Who Art Thou?", ["Isaac's question shows the deception breaking open.", "The truth arrives suddenly.", "The blind father now sees what has happened."]),
    phrase("😨 Isaac Trembled Very Exceedingly", ["Isaac is shaken deeply.", "He realizes he has blessed Jacob and cannot simply undo it.", "The spiritual weight of the blessing hits him."]),
    phrase("✅ Yea, And He Shall Be Blessed", ["Isaac confirms the blessing will stand.", "Even though it came through deception, God's earlier word is moving forward.", "Human sin does not overturn God's purpose."]),
  ] },
  { chapter: 27, startVerse: 34, endVerse: 40, reference: "Genesis 27:34-40", title: "Esau's Bitter Cry", icon: "😭", phrases: [
    phrase("😭 Great And Exceeding Bitter Cry", ["Esau's grief is real and intense.", "Genesis does not ask us to laugh at him.", "The pain of lost blessing is devastating."]),
    phrase("🙏 Bless Me, Even Me Also", ["Esau begs for blessing from his father.", "He now wants what he earlier treated lightly.", "Desire arrives after the main blessing is gone."]),
    phrase("🎭 Thy Brother Came With Subtilty", ["Isaac names Jacob's deception.", "The blessing was taken through craftiness.", "The family wound is now out in the open."]),
    phrase("📛 Is Not He Rightly Named Jacob?", ["Esau connects Jacob's name to his actions.", "Jacob has supplanted him twice: birthright and blessing.", "The name becomes accusation."]),
    phrase("❓ Hast Thou Not Reserved A Blessing?", ["Esau searches for any remaining word.", "His question is full of desperation.", "The scene shows the cost of despising and losing holy things."]),
    phrase("⚔️ By Thy Sword Shalt Thou Live", ["Esau receives a harder word.", "His line will be marked by struggle and conflict.", "This points toward the later tension between Edom and Israel."]),
    phrase("🔗 Thou Shalt Break His Yoke", ["Esau's line will not remain under Jacob forever.", "There is future resistance in the word.", "Genesis traces family conflict into national history."]),
  ] },
  { chapter: 27, startVerse: 41, endVerse: 46, reference: "Genesis 27:41-46", title: "Jacob Must Flee", icon: "🏃", phrases: [
    phrase("😡 Esau Hated Jacob", ["Grief turns into hatred.", "The family conflict has moved from rivalry to danger.", "The blessing did not create peace in the home."]),
    phrase("⚔️ I Will Slay My Brother Jacob", ["Esau plans murder after Isaac dies.", "The story echoes Cain and Abel: brother against brother.", "Sin is again threatening family bloodshed."]),
    phrase("👂 Rebekah Was Told", ["Rebekah hears the danger and acts again.", "Her earlier plan got Jacob the blessing, but now she must protect him from the consequences.", "Control creates more crisis."]),
    phrase("🏃 Flee Thou To Laban", ["Jacob must leave home.", "He receives the blessing but loses safety and family closeness.", "Sin often takes more than expected."]),
    phrase("⏳ A Few Days", ["Rebekah thinks the separation may be short.", "In reality, Jacob will be gone for many years.", "The consequences of deception last longer than she expects."]),
    phrase("💔 Why Should I Be Deprived Also Of You Both?", ["Rebekah fears losing both sons.", "Her plan has placed the whole family at risk.", "Favoritism has become grief."]),
    phrase("👰 Daughters Of Heth", ["Rebekah uses Esau's marriages as a reason to send Jacob away.", "This connects back to Genesis 26:34-35.", "Marriage and covenant direction remain central as Jacob exits toward Genesis 28."]),
  ] },
];

const GENESIS_25_30_PERSONAL_SECTIONS = RAW_GENESIS_21_30_PERSONAL_SECTIONS.filter(
  (section) => false,
);

function getDay10Section(reference: string) {
  const section = DAY_10_RESTRUCTURED_SECTIONS.find((item) => item.reference === reference);
  if (!section) throw new Error(`Missing Day 10 section: ${reference}`);
  return section;
}

function splitDay10Section(
  sourceReference: string,
  splits: Array<{
    startVerse: number;
    endVerse: number;
    reference: string;
    title: string;
    icon: string;
    phraseIndexes: number[];
  }>,
) {
  const source = getDay10Section(sourceReference);
  return splits.map((split): PersonalGenesisPhraseSectionInput => ({
    chapter: source.chapter,
    startVerse: split.startVerse,
    endVerse: split.endVerse,
    reference: split.reference,
    title: split.title,
    icon: split.icon,
    phrases: split.phraseIndexes.map((index) => source.phrases[index]).filter((phrase): phrase is [string, string] => Boolean(phrase)),
  }));
}

const DAY_10_LONG_SECTION_REFERENCES = new Set([
  "Genesis 25:12-18",
  "Genesis 26:26-33",
  "Genesis 27:11-17",
  "Genesis 27:18-25",
  "Genesis 27:34-40",
]);

const DAY_10_FINAL_SECTIONS = [
  ...DAY_10_RESTRUCTURED_SECTIONS.filter((section) => !DAY_10_LONG_SECTION_REFERENCES.has(section.reference)),
  ...splitDay10Section("Genesis 25:12-18", [
    { startVerse: 12, endVerse: 16, reference: "Genesis 25:12-16", title: "Ishmael's Sons Become Princes", icon: "👑", phraseIndexes: [0, 1, 2, 3] },
    { startVerse: 17, endVerse: 18, reference: "Genesis 25:17-18", title: "Ishmael Dies Before His Brethren", icon: "🪦", phraseIndexes: [4, 5] },
  ]),
  ...splitDay10Section("Genesis 26:26-33", [
    { startVerse: 26, endVerse: 29, reference: "Genesis 26:26-29", title: "Abimelech Seeks Peace With Isaac", icon: "🤝", phraseIndexes: [0, 1, 2, 3, 4] },
    { startVerse: 30, endVerse: 33, reference: "Genesis 26:30-33", title: "The Oath And The Well At Beersheba", icon: "💧", phraseIndexes: [5, 6, 7] },
  ]),
  ...splitDay10Section("Genesis 27:11-17", [
    { startVerse: 11, endVerse: 13, reference: "Genesis 27:11-13", title: "Jacob Fears The Curse", icon: "⚠️", phraseIndexes: [0, 1, 2, 3] },
    { startVerse: 14, endVerse: 17, reference: "Genesis 27:14-17", title: "Rebekah Dresses Jacob As Esau", icon: "🐐", phraseIndexes: [4, 5, 6] },
  ]),
  ...splitDay10Section("Genesis 27:18-25", [
    { startVerse: 18, endVerse: 20, reference: "Genesis 27:18-20", title: "Jacob Uses Esau's Name", icon: "🗣️", phraseIndexes: [0, 1, 2] },
    { startVerse: 21, endVerse: 25, reference: "Genesis 27:21-25", title: "Isaac Tests The Disguise", icon: "✋", phraseIndexes: [3, 4, 5, 6, 7] },
  ]),
  ...splitDay10Section("Genesis 27:34-40", [
    { startVerse: 34, endVerse: 38, reference: "Genesis 27:34-38", title: "Esau Begs For A Blessing", icon: "😭", phraseIndexes: [0, 1, 2, 3, 4] },
    { startVerse: 39, endVerse: 40, reference: "Genesis 27:39-40", title: "Esau Receives A Hard Word", icon: "⚔️", phraseIndexes: [5, 6] },
  ]),
].sort((left, right) => left.chapter - right.chapter || left.startVerse - right.startVerse || left.endVerse - right.endVerse);

const day10Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_10_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 25:1-6": [
    day10Phrase("Keturah", ["Keturah is named because Abraham's later family is real history, not a throwaway detail.", "Her children become peoples connected to Abraham, even though the promise line stays with Isaac.", "Genesis lets the reader see abundance around Abraham without confusing the covenant heir."]),
    day10Phrase("Zimran, Jokshan, Medan, Midian, Ishbak, And Shuah", ["These names can feel hard for a beginner, but they show Abraham becoming the father of many peoples.", "Midian especially will matter later in the Bible story.", "A list of names is showing God's old promise taking shape in actual families."]),
    day10Phrase("The Sons Of Dedan", ["Genesis slows down inside Abraham's wider family line.", "This helps readers see that these sons grow into clans, not just single people.", "The promise to Abraham is spreading into geography, households, and future nations."]),
    day10Phrase("Asshurim, Letushim, And Leummim", ["These are family groups that come from Dedan.", "A new reader may not know what to do with the names, but the point is growth and structure.", "Abraham's household is becoming many branches, just as God said."]),
    day10Phrase("The Sons Of The Concubines", ["Concubines were women connected to a household with lower status than a wife.", "Their sons are acknowledged, provided for, and sent out, but they do not replace Isaac.", "Genesis is careful about inheritance because the covenant line must remain clear."]),
    day10Phrase("While He Yet Lived", ["Abraham handles the family inheritance before he dies.", "That means the separation is intentional, not confusion after his death.", "He is protecting Isaac's place while still giving gifts to the other sons."]),
    day10Phrase("Unto The East Country", ["The movement eastward creates distance from Isaac.", "In Genesis, eastward often signals movement away from the main line the story will follow.", "These sons still matter, but the camera now stays with Isaac and the covenant promise."]),
  ],
  "Genesis 25:7-11": [
    day10Phrase("The Days Of The Years Of Abraham's Life", ["Genesis counts Abraham's life because his story has carried so much promise, waiting, failure, worship, and mercy.", "The number is not just trivia.", "It tells us the pilgrim who left home by faith has reached the end of his earthly road."]),
    day10Phrase("Abraham Gave Up The Ghost", ["This old phrase means Abraham breathed his last and died.", "The Bible speaks plainly about death, even for people deeply loved by God.", "The promise does not make Abraham immortal on earth, but it does continue after him."]),
    day10Phrase("An Old Man", ["Abraham dies after a long journey with God.", "He has watched impossible promises begin to become visible.", "The phrase carries the feeling of a life that has been stretched across decades of faith."]),
    day10Phrase("Full Of Years", ["This means Abraham's life was full, complete, and brought to its appointed end.", "It does not mean every moment was easy or clean.", "It means God carried him through the whole length of his story."]),
    day10Phrase("Field Of Ephron", ["This points back to the land Abraham purchased for Sarah's burial.", "A beginner may miss that Abraham owns only a burial field in the promised land.", "Even his grave is an act of faith that God will give the land later."]),
    day10Phrase("Before Mamre", ["Mamre is connected with Abraham's earlier life of tents, altars, and promise.", "The burial place is tied to memory.", "Genesis keeps Abraham's death inside the land God promised him."]),
    day10Phrase("Isaac Dwelt By The Well Lahairoi", ["This well is connected to the God who sees.", "Isaac living there after Abraham's death feels tender because the next generation is near a place of divine care.", "The promise continues beside a well already marked by God's attention."]),
  ],
  "Genesis 25:12-16": [
    day10Phrase("These Are The Generations Of Ishmael", ["Genesis gives Ishmael his own family record before returning to Isaac.", "That matters because Ishmael is outside the covenant line, but not outside God's notice.", "The boy God heard in the wilderness becomes the father of a named people."]),
    day10Phrase("Abraham's Son", ["Ishmael is still called Abraham's son.", "The Bible does not erase his place in the family.", "This keeps the story honest about both blessing and separation."]),
    day10Phrase("Hagar The Egyptian", ["Hagar's name brings her painful story back into view.", "She was vulnerable, mistreated, seen by God, and connected to Abraham's house.", "Her son now stands as a line with real descendants."]),
    day10Phrase("Sarah's Handmaid", ["This reminds the reader of the complicated household story behind Ishmael's birth.", "Ishmael's line begins in a painful human shortcut, yet God still shows mercy.", "Genesis refuses to make people disappear just because their beginning was messy."]),
    day10Phrase("Nebajoth, Kedar, Adbeel, And Mibsam", ["These names begin the list of Ishmael's sons.", "For a beginner, the main point is not memorizing each name.", "The point is that God's word about Ishmael becoming a great people is happening in real families."]),
    day10Phrase("Mishma, Dumah, Massa, Hadar, And Tema", ["The list keeps building, name after name.", "Genesis is showing that Ishmael's future is not vague.", "God's promises are specific enough to become names, households, and places."]),
    day10Phrase("Jetur, Naphish, And Kedemah", ["These finish the twelve sons of Ishmael.", "The number twelve shows structure and fullness in his line.", "Before the story returns to Isaac, Genesis lets Ishmael's branch stand clearly."]),
    day10Phrase("By Their Towns", ["Ishmael's descendants have settled communities.", "They are not just wandering names on a page.", "God's promise about Ishmael has become visible social life."]),
    day10Phrase("By Their Castles", ["Castles means encampments, strongholds, or protected settlements.", "The phrase shows strength and organization.", "Ishmael's line grows into peoples with places, defenses, and identity."]),
    day10Phrase("According To Their Nations", ["The family line becomes nations.", "This helps a beginner see how Genesis moves from household stories to world history.", "One family tree begins to fill the map."]),
  ],
  "Genesis 25:17-18": [
    day10Phrase("The Years Of The Life Of Ishmael", ["Ishmael's age is recorded because his life matters in the story.", "Genesis does not only count the covenant heir.", "God had promised to preserve Ishmael, and the record shows that his life reached its full span."]),
    day10Phrase("An Hundred And Thirty And Seven Years", ["Ishmael lives 137 years.", "The number anchors him in real time and history.", "The Bible lets the reader feel that Ishmael's line had its own long story under God's watch."]),
    day10Phrase("They Dwelt From Havilah Unto Shur", ["This gives the region where Ishmael's descendants lived.", "A beginner may not know the geography, but the point is spread and settlement.", "The promised growth now has a footprint on the land."]),
    day10Phrase("Before Egypt", ["Egypt becomes a boundary marker for Ishmael's territory.", "Genesis often uses familiar places to help the reader locate family lines.", "The story is moving from one tent family into whole regions of people."]),
    day10Phrase("Toward Assyria", ["Assyria points the reader northeastward into a wider map.", "Ishmael's descendants stretch across a broad area.", "The family of Abraham is already touching future Bible geography."]),
    day10Phrase("In The Presence Of All His Brethren", ["This fulfills the earlier word that Ishmael would live before, or over against, his brothers.", "The phrase carries independence, tension, and survival.", "God's word about Ishmael does not vanish; it unfolds across generations."]),
  ],
  "Genesis 25:19-23": [
    day10Phrase("Abraham Begat Isaac", ["The story resets around Isaac because he is the covenant son.", "After Ishmael's line is honored, Genesis returns to the promised line.", "This simple phrase keeps the reader oriented inside the family tree."]),
    day10Phrase("Isaac Was Forty Years Old", ["Isaac is not a child when this next stage begins.", "The detail shows time passing between his marriage and the birth struggle that follows.", "God's promises often move through long ordinary seasons."]),
    day10Phrase("Daughter Of Bethuel The Syrian", ["Rebekah's family background is named so readers can follow the household connections.", "She comes from the family Abraham's servant visited in Genesis 24.", "The covenant story is still moving through chosen family ties."]),
    day10Phrase("Sister To Laban The Syrian", ["Laban is named here before he becomes major in Jacob's story.", "Genesis plants him early so the reader recognizes him later.", "A small family detail becomes important when Jacob has to flee."]),
    day10Phrase("Rebekah His Wife Conceived", ["After barrenness and prayer, life begins.", "The child does not arrive because the family can force the promise.", "The next generation comes as an answer from God."]),
    day10Phrase("She Went To Enquire Of The LORD", ["Rebekah takes her confusion to God.", "This is a beautiful moment because pain becomes prayer instead of silence.", "She does not understand the struggle inside her, so she seeks the One who does."]),
    day10Phrase("Two Manner Of People", ["The twins are not only two boys with different personalities.", "They represent two kinds of people and two future nations.", "The family conflict will grow into a much larger story."]),
    day10Phrase("One People Shall Be Stronger", ["God tells Rebekah that the brothers' future will not be equal or simple.", "Power, rivalry, and reversal are already in the word before birth.", "The household drama has national weight."]),
  ],
  "Genesis 25:24-28": [
    day10Phrase("Her Days To Be Delivered Were Fulfilled", ["The pregnancy reaches its appointed time.", "The struggle in the womb now becomes visible in the world.", "God's word to Rebekah is about to be seen with eyes."]),
    day10Phrase("The First Came Out Red", ["Esau's red appearance becomes tied to his identity and later to Edom.", "Genesis uses physical details to help readers remember who is who.", "The story gives Esau a strong visual entrance."]),
    day10Phrase("They Called His Name Esau", ["Names in Genesis often carry story meaning.", "Esau's name is connected with his rough, hairy appearance.", "From birth, he is marked as distinct from Jacob."]),
    day10Phrase("Isaac Was Threescore Years Old", ["Isaac is sixty when the twins are born.", "That means he and Rebekah waited many years.", "The promise line again grows through delay and prayer, not instant ease."]),
    day10Phrase("The Boys Grew", ["Genesis moves from birth to character.", "The brothers do not stay symbols; they become young men with habits, skills, and preferences.", "Their differences begin shaping the family atmosphere."]),
    day10Phrase("A Man Of The Field", ["Esau belongs to open country, hunting, and movement.", "This helps explain why Isaac enjoys what Esau brings home.", "The field becomes part of Esau's identity."]),
    day10Phrase("Dwelling In Tents", ["Jacob's world is closer to the household and camp.", "This does not make him weak; it shows a different kind of life.", "Genesis is setting two brothers side by side so the contrast is impossible to miss."]),
    day10Phrase("Because He Did Eat Of His Venison", ["Isaac's favoritism is tied to appetite.", "That is a painful detail because a father's love should not be driven by what one son provides for his taste.", "The family fracture begins around preference, food, and blindness long before chapter 27."]),
  ],
  "Genesis 25:29-34": [
    day10Phrase("Feed Me, I Pray Thee", ["Esau's words are urgent and bodily.", "He is not thinking like a man guarding inheritance.", "He is thinking like a hungry man who wants relief now."]),
    day10Phrase("Therefore Was His Name Called Edom", ["Edom connects Esau to the red stew and to the future nation that comes from him.", "A small meal becomes tied to a long national identity.", "Genesis wants readers to remember that this moment echoes beyond one kitchen scene."]),
    day10Phrase("What Profit Shall This Birthright Do To Me?", ["Esau measures the birthright by immediate usefulness.", "Because he feels hungry now, a future inheritance seems worthless.", "This is the danger of letting the urgent moment define what is valuable."]),
    day10Phrase("Swear To Me This Day", ["Jacob makes the bargain formal.", "He is not just joking or teasing his brother.", "He wants the birthright locked down with an oath."]),
    day10Phrase("He Sware Unto Him", ["Esau confirms the trade with an oath.", "That makes the moment serious and binding.", "The careless appetite now becomes a spoken decision."]),
    day10Phrase("He Did Eat And Drink", ["The text slows down to show the ordinary satisfaction after the terrible trade.", "Esau gets what he wanted in the moment.", "The food is gone quickly, but the loss remains."]),
    day10Phrase("Rose Up And Went His Way", ["Esau simply leaves after selling the birthright.", "There is no grief, prayer, or fear recorded in the moment.", "That casual exit is part of why the final verdict feels so heavy."]),
  ],
  "Genesis 26:1-5": [
    day10Phrase("Beside The First Famine", ["The Bible connects Isaac's famine to Abraham's earlier famine.", "A beginner should notice the pattern: the next generation faces old kinds of tests.", "Faith is not inherited as comfort; it must be lived in real pressure."]),
    day10Phrase("Abimelech King Of The Philistines", ["Abimelech is a royal title or name connected with the Philistine region.", "Isaac is now among powerful outsiders.", "The covenant son is vulnerable in someone else's territory."]),
    day10Phrase("Dwell In The Land Which I Shall Tell Thee Of", ["God does not only tell Isaac where not to go; He tells him to live under divine direction.", "Isaac's survival must be guided by God's word.", "The promise land is learned one command at a time."]),
    day10Phrase("Unto Thee, And Unto Thy Seed", ["God speaks to Isaac and to the generations after him.", "The promise is personal, but it is never only private.", "Isaac is standing inside a future bigger than his own lifetime."]),
    day10Phrase("I Will Give All These Countries", ["God speaks of land while Isaac is living like a sojourner.", "The words are larger than what Isaac can currently hold.", "Faith means trusting a promise that is bigger than the present situation."]),
    day10Phrase("In Thy Seed Shall All The Nations Of The Earth Be Blessed", ["The promise is not only about Isaac's family winning land.", "God's plan through Abraham's line is meant to bless all nations.", "This keeps the reader's eyes on God's global purpose."]),
    day10Phrase("Kept My Charge", ["This phrase gathers Abraham's faithful response to God's commands.", "Isaac is reminded that covenant life includes obedience.", "Promise and faithful walking belong together in Genesis."]),
    day10Phrase("My Commandments, My Statutes, And My Laws", ["These words show that Abraham's faith was not empty belief.", "He listened, obeyed, and ordered his life around God's word.", "Isaac now has to learn the same kind of trust."]),
  ],
  "Genesis 26:6-11": [
    day10Phrase("He Feared To Say, She Is My Wife", ["Isaac's lie grows out of fear.", "He is in the land God told him to stay in, but he still feels unsafe.", "The scene helps beginners see that obedience can still expose hidden fear."]),
    day10Phrase("Lest The Men Of The Place Should Kill Me", ["Isaac imagines the worst outcome and builds his decision around it.", "Fear makes him protect himself by putting Rebekah at risk.", "The covenant son acts like his life depends more on lying than on God."]),
    day10Phrase("Because She Was Fair To Look Upon", ["Rebekah's beauty becomes the reason Isaac feels threatened.", "Like Abraham before him, he fears another man will want his wife.", "Genesis shows old family fear repeating itself."]),
    day10Phrase("When He Had Been There A Long Time", ["The lie does not end immediately.", "Isaac lives under this false story for a long stretch.", "Hidden fear can become a settled way of life if God does not expose it."]),
    day10Phrase("Behold, Of A Surety She Is Thy Wife", ["Abimelech sees enough to know the truth.", "The king recognizes what Isaac tried to hide.", "The deception unravels through ordinary observation."]),
    day10Phrase("How Saidst Thou, She Is My Sister?", ["Abimelech asks the question the reader is already feeling.", "Isaac's lie endangered others, not just himself.", "Sin often spreads risk beyond the person who chooses it."]),
    day10Phrase("Might Lightly Have Lien With Thy Wife", ["The old wording means someone could easily have slept with Rebekah.", "Abimelech understands the moral danger Isaac created.", "A foreign king speaks with more clarity than Isaac did in his fear."]),
    day10Phrase("Brought Guiltiness Upon Us", ["Abimelech knows that touching another man's wife would bring guilt.", "The passage does not treat marriage lightly.", "God protects Rebekah and keeps the promise line from deeper damage."]),
  ],
  "Genesis 26:12-16": [
    day10Phrase("In The Same Year", ["The timing matters because Isaac prospers during the very season of famine pressure.", "God's blessing is not waiting for ideal conditions.", "The Lord can make abundance appear where the setting looks weak."]),
    day10Phrase("Went Forward", ["Isaac's growth keeps moving.", "The phrase gives the feeling of steady increase, not one lucky harvest.", "God's promise is building momentum around him."]),
    day10Phrase("Grew Until He Became Very Great", ["The repetition makes Isaac's prosperity feel undeniable.", "Genesis wants the reader to see that God's blessing is becoming visible to everyone nearby.", "That visibility is what provokes envy."]),
    day10Phrase("Possession Of Herds", ["Herds add to the picture of wealth and stability.", "In Isaac's world, animals meant food, work, trade, and household strength.", "The promise is touching everyday resources."]),
    day10Phrase("Great Store Of Servants", ["Isaac's household has grown large enough to require many workers.", "This is not just personal success; it is a whole camp expanding.", "His strength begins to look threatening to the Philistines."]),
    day10Phrase("The Wells Which His Father's Servants Had Digged", ["The wells connect Isaac's prosperity to Abraham's earlier life.", "Water rights mattered deeply in dry land.", "The conflict is about survival, inheritance, and memory."]),
    day10Phrase("Filled Them With Earth", ["The Philistines stop up the wells by filling them with dirt.", "That is not a small insult; it attacks life in the land.", "Envy tries to bury the very places where blessing has flowed."]),
    day10Phrase("Thou Art Much Mightier Than We", ["Abimelech admits Isaac has become too strong for them.", "This shows how visible God's blessing has become.", "But it also shows how blessing can make others afraid."]),
  ],
  "Genesis 26:17-22": [
    day10Phrase("Isaac Departed Thence", ["Isaac leaves instead of fighting to stay near Abimelech.", "His strength does not make him reckless.", "He keeps moving with patience while God continues to provide."]),
    day10Phrase("Pitched His Tent", ["Isaac still lives like a sojourner.", "Even with wealth, he has not become settled king over the land.", "The tent reminds readers that the promise is real but not yet fully possessed."]),
    day10Phrase("After The Death Of Abraham", ["The Philistines stopped the wells after Abraham died.", "The next generation must reclaim what was blocked.", "Isaac is learning that inherited blessing still requires faithful labor."]),
    day10Phrase("We Have Found Water", ["The servants find life-giving water in a dry region.", "That should feel like provision and relief.", "But even provision becomes contested in a world of envy."]),
    day10Phrase("They Strove With Isaac's Herdmen", ["The conflict comes through the workers around Isaac.", "This is not abstract tension; it affects daily labor and survival.", "The promised life includes practical disputes over resources."]),
    day10Phrase("For Now The LORD Hath Made Room For Us", ["Isaac names the open space as God's gift.", "He does not say his patience alone solved everything.", "He sees room, peace, and fruitfulness as mercy from the Lord."]),
  ],
  "Genesis 26:23-25": [
    day10Phrase("The LORD Appeared Unto Him", ["God comes near again after Isaac's conflict over wells.", "The promise is not only remembered from Abraham; Isaac hears it personally.", "God strengthens the heir in the middle of his own story."]),
    day10Phrase("I Am The God Of Abraham Thy Father", ["God identifies Himself through the covenant already made.", "Isaac is not following an unknown God.", "The Lord who held Abraham now speaks to Abraham's son."]),
    day10Phrase("I Will Bless Thee", ["God repeats blessing when Isaac needs courage.", "The conflict with the Philistines has not canceled God's favor.", "The Lord's word is stronger than the pressure around him."]),
    day10Phrase("Multiply Thy Seed", ["The promise of descendants continues through Isaac.", "God speaks future fruitfulness to a man who has already waited through barrenness.", "The family line is secure because God says so."]),
    day10Phrase("Called Upon The Name Of The LORD", ["Isaac responds with worship and dependence.", "Calling on the Lord means he is not treating the promise like mere family inheritance.", "He is personally turning toward God."]),
    day10Phrase("Pitched His Tent There", ["After worship, Isaac settles for a season at Beersheba.", "The tent shows pilgrim life continuing.", "God's presence gives him a place to stand, even before full possession."]),
  ],
  "Genesis 26:26-29": [
    day10Phrase("Ahuzzath One Of His Friends", ["Abimelech comes with a companion or adviser.", "This is a formal visit, not casual conversation.", "The king approaches Isaac carefully because Isaac's strength now matters."]),
    day10Phrase("Phichol The Chief Captain", ["The military leader comes too.", "That detail shows the seriousness of the meeting.", "Isaac's household has become important enough for political and military attention."]),
    day10Phrase("Seeing Ye Hate Me", ["Isaac names the wound plainly.", "They sent him away, stopped wells, and created pressure.", "Peace begins with honesty, not pretending the conflict never happened."]),
    day10Phrase("We Saw Certainly That The LORD Was With Thee", ["Abimelech's group admits that God's presence with Isaac is visible.", "They may not understand the covenant deeply, but they can see the result.", "A life blessed by God becomes hard for outsiders to ignore."]),
    day10Phrase("Let Us Make A Covenant With Thee", ["The visitors want a formal agreement because Isaac's strength affects their security.", "Covenant here means a binding peace arrangement.", "The promise family is now being treated as a serious neighbor."]),
    day10Phrase("Thou Art Now The Blessed Of The LORD", ["This is the confession sitting at the center of the meeting.", "The people who envied and pushed Isaac away now recognize the Lord's blessing on him.", "God has made Isaac's life a witness."]),
  ],
  "Genesis 26:30-33": [
    day10Phrase("They Did Eat And Drink", ["The meal seals peace in a very human way.", "People who had been in conflict sit at a table together.", "Genesis lets reconciliation have a practical, embodied shape."]),
    day10Phrase("They Rose Up Betimes In The Morning", ["The agreement is completed early and intentionally.", "This is not a vague good feeling.", "The oath is treated with seriousness and order."]),
    day10Phrase("Sware One To Another", ["Both sides bind themselves by oath.", "Words matter in Genesis because they shape relationships and future obligations.", "The well scene becomes a covenant scene."]),
    day10Phrase("Isaac Sent Them Away", ["Isaac lets them go in peace.", "He is not clinging to revenge.", "The son who was pushed away now sends others away safely."]),
    day10Phrase("They Departed From Him In Peace", ["The conflict cycle pauses with peace instead of violence.", "This is a mercy after envy, blocked wells, and displacement.", "God gives Isaac room not only in land, but also in relationships."]),
    day10Phrase("We Have Found Water", ["The discovery of water lands right after the oath.", "Provision follows the peace scene like a quiet confirmation.", "The Lord is still making room for Isaac."]),
  ],
  "Genesis 26:34-35": [
    day10Phrase("Judith The Daughter Of Beeri The Hittite", ["Judith is one of Esau's Hittite wives.", "Her naming shows Esau marrying into the local Canaanite peoples.", "This matters because Genesis has been careful about covenant family marriages."]),
    day10Phrase("Bashemath The Daughter Of Elon The Hittite", ["Bashemath is also from the Hittites.", "Esau's marriages are not isolated mistakes; they show a pattern of direction.", "The household is being pulled toward a world Abraham tried to keep Isaac from marrying into."]),
    day10Phrase("Which Were A Grief Of Mind", ["The marriages bring deep bitterness and distress to Isaac and Rebekah.", "This is more than ordinary parental preference.", "The covenant household feels the spiritual weight of Esau's choices."]),
    day10Phrase("Unto Isaac And To Rebekah", ["Both parents are wounded by Esau's decisions.", "Even though Isaac favors Esau, his choices still grieve Isaac.", "Favoritism does not protect the family from spiritual sorrow."]),
  ],
  "Genesis 27:1-4": [
    day10Phrase("He Called Esau His Eldest Son", ["Isaac moves toward the son he prefers as firstborn.", "But the reader remembers God's word that the elder would serve the younger.", "The scene begins with tension between family custom, fatherly desire, and divine promise."]),
    day10Phrase("Behold Now, I Am Old", ["Isaac believes death may be near, so the blessing feels urgent.", "The old father's words create pressure in the room.", "Everyone acts as if the family's future is about to be spoken."]),
    day10Phrase("I Know Not The Day Of My Death", ["Isaac is aware of human uncertainty.", "He cannot control the length of his life.", "That fear of running out of time pushes the blessing scene forward."]),
    day10Phrase("Go Out To The Field", ["Esau is sent into the place that fits his identity as hunter.", "Isaac wants the blessing wrapped in the food and world he associates with Esau.", "The field, the bow, and the meal all carry favoritism into the holy moment."]),
    day10Phrase("Before I Die", ["Isaac wants to bless Esau while he still can.", "The phrase makes the scene feel final, even though Isaac will live longer.", "Fear of death can make people rush decisions they should bring before God."]),
  ],
  "Genesis 27:5-10": [
    day10Phrase("When Isaac Spake To Esau His Son", ["Rebekah hears the private blessing plan.", "The family is not acting together in trust.", "A holy blessing is already wrapped in secrecy and favoritism."]),
    day10Phrase("Esau Went To The Field", ["Esau obeys Isaac and leaves to hunt.", "His absence gives Rebekah the opening she uses.", "The whole deception begins while one son is out trying to please his father."]),
    day10Phrase("Now Therefore, My Son, Obey My Voice", ["Rebekah asks Jacob to follow her command quickly.", "Her words sound strong and motherly, but they lead into deception.", "A beginner should notice that authority can be used wrongly inside a family."]),
    day10Phrase("Go Now To The Flock", ["Rebekah replaces the hunt with animals from the household.", "She is recreating Esau's role without Esau.", "The blessing will be pursued through imitation rather than truth."]),
    day10Phrase("Such As He Loveth", ["Rebekah knows Isaac's taste exactly.", "She uses that knowledge to shape the deception.", "The family's emotional weaknesses are now being weaponized."]),
    day10Phrase("That He May Bless Thee Before His Death", ["The goal is clear: Jacob must receive the blessing before Esau returns.", "Rebekah is trying to secure what God already said, but by human manipulation.", "The story shows how fear can make people try to help God's promise in crooked ways."]),
  ],
  "Genesis 27:11-13": [
    day10Phrase("My Father Peradventure Will Feel Me", ["Jacob knows Isaac may touch him to test the truth.", "The word peradventure means perhaps or maybe.", "Jacob is calculating the risk instead of asking whether the plan is right."]),
    day10Phrase("A Deceiver", ["Jacob uses the very word that names the moral problem.", "He understands how he might appear if the disguise fails.", "But he fears being caught more than becoming false."]),
    day10Phrase("Not A Blessing", ["Jacob knows the plan could reverse into disaster.", "A blessing gained through deception might become a curse if exposed.", "The sacred moment is being treated like a dangerous scheme."]),
    day10Phrase("Only Obey My Voice", ["Rebekah presses forward and silences Jacob's hesitation.", "Her confidence does not make the action faithful.", "She takes charge, but the family is still moving in deceit."]),
  ],
  "Genesis 27:14-17": [
    day10Phrase("He Went, And Fetched", ["Jacob chooses to participate.", "He is not merely dragged by the plan; he walks into it.", "The deception becomes his action too."]),
    day10Phrase("His Mother Made Savoury Meat", ["Rebekah prepares the food Isaac loves.", "The home kitchen becomes the stage for a spiritual theft.", "Ordinary skill is being used for dishonest gain."]),
    day10Phrase("She Put The Skins", ["The disguise becomes physical and detailed.", "Rebekah covers Jacob so Isaac will feel Esau instead.", "The lie now has texture, smell, and clothing."]),
    day10Phrase("The Smooth Of His Neck", ["Jacob's natural body would expose him.", "The goat skins cover the difference between the brothers.", "The blessing scene depends on hiding who Jacob really is."]),
    day10Phrase("She Gave The Savoury Meat", ["Rebekah hands Jacob everything he needs to finish the lie.", "The mother and son are now fully joined in the plan.", "The meal moves from preparation to deception."]),
  ],
  "Genesis 27:18-20": [
    day10Phrase("My Father", ["Jacob enters with intimacy on his lips.", "That makes the lie feel even more painful.", "He is using the closeness of sonship to deceive his father."]),
    day10Phrase("Here Am I", ["Jacob answers like a faithful son, but his identity is false in the scene.", "The words sound innocent while the situation is crooked.", "Genesis lets the reader feel the tension between language and truth."]),
    day10Phrase("I Have Done According As Thou Badest Me", ["Jacob claims obedience to Isaac's command, though Isaac never gave that command to him.", "He borrows Esau's assignment as if it belongs to him.", "The lie is not small; it rewrites the whole situation."]),
    day10Phrase("Sit And Eat Of My Venison", ["Jacob calls the goat meat venison.", "Every sentence has to keep building the false world.", "Deception rarely stays one lie; it needs a whole supporting story."]),
    day10Phrase("Because The LORD Thy God Brought It To Me", ["Jacob uses God's name to explain the suspicious speed.", "This is one of the darkest lines in the chapter.", "He drags holy language into a lie to make deception sound like blessing."]),
  ],
  "Genesis 27:21-25": [
    day10Phrase("Come Near, I Pray Thee", ["Isaac is unsure and asks Jacob to come closer.", "The blessing is suspended in suspicion.", "Truth is close enough to be tested, but the disguise is ready."]),
    day10Phrase("Whether Thou Be My Very Son Esau Or Not", ["Isaac names the exact question under the scene.", "Is this really Esau?", "The reader knows the answer, which makes the moment ache."]),
    day10Phrase("He Discerned Him Not", ["Isaac fails to recognize Jacob because the disguise works.", "His dim eyes and the goat skins combine against him.", "The father blesses under confusion."]),
    day10Phrase("Because His Hands Were Hairy", ["The touch test points Isaac toward the wrong conclusion.", "The evidence he trusts has been manufactured.", "This is how deception bends perception."]),
    day10Phrase("He Blessed Him", ["The blessing begins to pass to Jacob.", "This is the moment everyone wanted, but it is soaked in deceit.", "God's larger purpose stands, yet the family's way of reaching it is broken."]),
    day10Phrase("Bring It Near To Me", ["Isaac proceeds with the meal despite his unease.", "He allows appetite and touch to quiet the warning in Jacob's voice.", "The scene shows how desire can dull discernment."]),
  ],
  "Genesis 27:26-29": [
    day10Phrase("He Came Near, And Kissed Him", ["Jacob comes close enough to kiss the father he is deceiving.", "The tenderness of the action makes the betrayal heavier.", "Genesis does not let this feel like a clever trick; it feels like family fracture."]),
    day10Phrase("See, The Smell Of My Son", ["Isaac trusts what he smells in Esau's clothing.", "The disguise has reached even the atmosphere around Jacob.", "The false identity feels convincing to the blind father."]),
    day10Phrase("Which The LORD Hath Blessed", ["Isaac connects the field smell to the Lord's blessing.", "He imagines Esau's outdoor world under divine favor.", "The blessing language is beautiful, even though the scene is broken."]),
    day10Phrase("God Give Thee", ["Isaac speaks blessing as a prayer for God to provide.", "The words ask for heaven's favor, not just human inheritance.", "That makes the deception even more serious because sacred speech is involved."]),
    day10Phrase("Plenty Of Corn And Wine", ["Corn and wine picture agricultural abundance.", "This blessing imagines a fruitful life in the land.", "Jacob receives words of provision that will shape the family future."]),
    day10Phrase("Cursed Be Every One That Curseth Thee", ["This echoes God's promise to Abraham.", "The blessing Jacob receives is covenant-shaped.", "Even through human failure, the old promise is still moving forward."]),
  ],
  "Genesis 27:30-33": [
    day10Phrase("Jacob Was Yet Scarce Gone Out", ["The timing is almost unbearable.", "Jacob has barely left when Esau returns.", "Genesis makes the deception feel like it is caught in the doorway."]),
    day10Phrase("Esau His Brother Came In From His Hunting", ["Esau comes back doing exactly what Isaac asked.", "He is late, but not because he refused his father.", "The heartbreak is that the blessing has already been taken."]),
    day10Phrase("Let My Father Arise", ["Esau speaks with expectation, not knowing what has happened.", "He thinks the promised moment with Isaac is still ahead.", "The reader feels the crash coming before Esau does."]),
    day10Phrase("Who? Where Is He?", ["Isaac's question breaks the scene open.", "He realizes another person has already received the blessing.", "The truth rushes into the room all at once."]),
    day10Phrase("Before Thou Camest", ["Those words mark the irreversible timing.", "Esau arrived after the blessing was spoken.", "Some moments in Genesis carry consequences that cannot simply be rewound."]),
  ],
  "Genesis 27:34-38": [
    day10Phrase("When Esau Heard The Words Of His Father", ["The loss lands through Isaac's words.", "Esau hears that the blessing is gone, and grief erupts.", "The scene is emotionally raw because the family damage is now undeniable."]),
    day10Phrase("Bless Me, Even Me Also, O My Father", ["Esau's cry is deeply personal.", "He is not only asking for land or wealth; he is begging his father not to leave him empty.", "The repeated plea makes the reader feel the ache of being passed over."]),
    day10Phrase("He Took Away Thy Blessing", ["Isaac names what Jacob has done.", "The blessing was taken, not peacefully received.", "The family now has to live with the truth of how it happened."]),
    day10Phrase("He Took Away My Birthright", ["Esau blames Jacob for the birthright too, though Genesis showed Esau selling it.", "His grief is real, but his memory is selective.", "Regret can make people see only what was taken and not what they despised."]),
    day10Phrase("Hast Thou Not Reserved A Blessing For Me?", ["Esau hopes there is still something left.", "The question is full of desperation.", "It helps a beginner understand how weighty the spoken blessing was."]),
    day10Phrase("Hast Thou But One Blessing?", ["Esau cannot accept that the main blessing is gone.", "He wants his father to find another word that can undo the loss.", "The cry shows the pain of wanting too late what once seemed small."]),
  ],
  "Genesis 27:39-40": [
    day10Phrase("The Fatness Of The Earth", ["Esau receives a word about earthly dwelling and provision, but it is not the same covenant blessing Jacob received.", "The language sounds similar, yet the direction is harder.", "Genesis distinguishes between a remaining future and the chosen promise line."]),
    day10Phrase("The Dew Of Heaven From Above", ["Dew pictures life-giving moisture in a dry land.", "Even Esau's line is not spoken into nothingness.", "But the blessing is mixed with struggle rather than covenant rule."]),
    day10Phrase("Thy Brother Shalt Thou Serve", ["This fulfills the word given before the twins were born.", "The elder serving the younger becomes painful family reality.", "God's word stands, but the path there has been full of human sin."]),
    day10Phrase("When Thou Shalt Have The Dominion", ["Esau's line will not be passive forever.", "There will be moments of resistance and strength.", "The family conflict becomes a long national tension between Edom and Israel."]),
    day10Phrase("Break His Yoke From Off Thy Neck", ["The yoke is a picture of subjection or rule.", "Breaking it means throwing off domination.", "Esau's story is not the covenant line, but it still has movement, struggle, and future."]),
  ],
  "Genesis 27:41-46": [
    day10Phrase("The Days Of Mourning For My Father Are At Hand", ["Esau plans to wait until Isaac dies before killing Jacob.", "His grief has hardened into calculated revenge.", "The blessing scene now threatens to become another brother-murder story like Cain and Abel."]),
    day10Phrase("These Words Of Esau Were Told To Rebekah", ["The danger becomes known to Rebekah.", "Her earlier plan did not end the crisis; it created a new one.", "Now she has to act to preserve the son she favored."]),
    day10Phrase("Doth Comfort Himself, Purposing To Kill Thee", ["Esau finds comfort in the idea of revenge.", "That is a chilling picture of grief turning poisonous.", "When bitterness becomes comfort, the heart is in real danger."]),
    day10Phrase("Tarry With Him A Few Days", ["Rebekah thinks Jacob's exile will be brief.", "A beginner should know it will become many years.", "Sin often promises short consequences and delivers long sorrow."]),
    day10Phrase("Until Thy Brother's Fury Turn Away", ["Rebekah hopes Esau's anger will cool with time.", "But time alone does not always heal what deception has broken.", "The family wound is deeper than a passing mood."]),
    day10Phrase("Then I Will Send, And Fetch Thee", ["Rebekah expects to bring Jacob home later.", "The tragedy is that she may never see him again.", "The plan that gained the blessing also costs her the presence of the son she loved."]),
    day10Phrase("I Am Weary Of My Life", ["Rebekah speaks from exhaustion and dread.", "Esau's marriages and Jacob's danger have made the household feel unbearable.", "The chapter ends with the cost of divided love, deception, and covenant concern pressing on one mother's heart."]),
  ],
};

function deepenDay10PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  const additions = DAY_10_REAL_PHRASE_ADDITIONS[section.reference] ?? [];
  const withAdditions = [...section.phrases, ...additions];
  return {
    ...section,
    phrases: withAdditions.map((entry) => normalizeDay10Phrase(section, entry)),
  };
}

function cleanDay10PhraseTitle(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function renameDay10WeakPhraseTitle(section: PersonalGenesisPhraseSectionInput, title: string) {
  const cleanTitle = cleanDay10PhraseTitle(title);
  const key = `${section.reference}|${cleanTitle}`;

  const replacements: Record<string, string> = {
    "Genesis 25:1-6|Eastward": "Sent Them Away From Isaac His Son, Eastward",
    "Genesis 25:1-6|Keturah": "His Wife's Name Was Keturah",
    "Genesis 26:17-22|Esek": "He Called The Name Of The Well Esek",
    "Genesis 26:17-22|Sitnah": "He Called The Name Of It Sitnah",
    "Genesis 26:17-22|Rehoboth": "He Called The Name Of It Rehoboth",
  };

  return replacements[key] ?? cleanTitle;
}

function normalizeDay10Phrase(section: PersonalGenesisPhraseSectionInput, entry: [string, string]): [string, string] {
  const [heading, content] = entry;
  return [renameDay10WeakPhraseTitle(section, heading), content];
}

const DAY_11_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 28, startVerse: 1, endVerse: 5, reference: "Genesis 28:1-5", title: "Isaac Sends Jacob Away", icon: "🧳", phrases: [
    phrase("👴 Isaac Called Jacob", ["This moment is different from the deception scene in Genesis 27.", "Isaac now speaks to Jacob openly and knowingly.", "The blessing is no longer hidden under disguise.", "The father who was deceived now sends Jacob with covenant direction.", "Jacob is leaving home, but he is not leaving without a spoken blessing.", "Promise and consequence are both traveling with him."]),
    phrase("🚫 Take Not A Wife Of The Daughters Of Canaan", ["Isaac repeats the marriage concern that shaped Abraham's servant mission in Genesis 24.", "The covenant family is not supposed to be absorbed into the surrounding Canaanite way of life.", "Marriage is not treated as a random private choice in Genesis.", "It shapes worship, household direction, and the next generation.", "Jacob needs a wife, but he also needs a household connected to the promise.", "The command protects the future of the covenant family."]),
    phrase("🏠 Go To Padan-aram", ["Jacob is sent toward Rebekah's family line.", "This is practical because Esau wants to kill him, but it is also covenant-shaped.", "The road away from home becomes the road toward the next stage of the promise.", "God often works through tangled situations without approving the sin that created them.", "Jacob's exile is painful, but it will also become formative.", "The family story is moving eastward for a season."]),
    phrase("🙌 God Almighty Bless Thee", ["Isaac uses covenant language over Jacob.", "God Almighty is the God powerful enough to fulfill what He promises.", "Jacob is not merely receiving family advice; he is being placed under divine blessing.", "This matters because Jacob is leaving as a flawed man, not a polished hero.", "The promise rests on God's faithfulness, not Jacob's maturity.", "Grace is already ahead of him on the road."]),
    phrase("🌱 Make Thee Fruitful, And Multiply Thee", ["The old promise of descendants is now spoken over Jacob.", "This reaches back to Abraham and Isaac.", "Jacob is one man leaving home, but God is speaking about a whole people coming from him.", "The lonely road does not cancel the future God has planned.", "The family line will grow through hardship, labor, love, and conflict.", "Genesis keeps showing that God's promise grows in messy soil."]),
    phrase("📜 The Blessing Of Abraham", ["This phrase makes the covenant connection explicit.", "Jacob is receiving the same promise thread that began with Abraham.", "Land, descendants, and blessing are still the major pieces.", "The blessing is bigger than Jacob's personal success.", "It is about God's plan to bless the nations through this family.", "Jacob carries a holy promise even while carrying family consequences."]),
  ] },
  { chapter: 28, startVerse: 6, endVerse: 9, reference: "Genesis 28:6-9", title: "Esau Tries To Respond", icon: "👀", phrases: [
    phrase("👀 Esau Saw", ["Esau is watching what happens to Jacob.", "He notices the blessing, the command, and the marriage concern.", "This is important because Esau is not completely unaware of the family's values.", "He can see that Canaanite marriages displeased Isaac and Rebekah.", "But seeing the outside problem is not the same as understanding the heart of obedience.", "Genesis shows Esau reacting after the damage is already deep."]),
    phrase("🚫 Daughters Of Canaan Pleased Not Isaac", ["Esau finally recognizes that his marriages have grieved the household.", "This connects back to Genesis 26, where his Hittite wives were a grief of mind.", "Marriage is again shown as spiritually serious.", "The issue is not merely parental preference.", "The covenant family is being shaped by the people brought into it.", "Esau has been careless with what his family treats as weighty."]),
    phrase("➕ In Addition To The Wives Which He Had", ["Esau adds another wife instead of truly changing direction.", "That little phrase matters.", "He does not undo the earlier problem; he layers a new action on top of it.", "Sometimes people make a religious-looking adjustment without dealing with the deeper heart issue.", "Esau seems to be trying to repair his standing from the outside in.", "Genesis lets the action feel incomplete."]),
    phrase("🏕️ Mahalath The Daughter Of Ishmael", ["Esau marries into Ishmael's line, which is closer to Abraham's family than the Canaanites.", "But this still does not make him the covenant heir.", "The move feels like an attempt to regain favor after losing the blessing.", "Ishmael's family is real and significant, but the promise line is moving through Isaac and Jacob.", "Esau is close to the covenant story, yet keeps missing its center.", "The chapter contrasts Jacob leaving under blessing with Esau reacting from regret."]),
  ] },
  { chapter: 28, startVerse: 10, endVerse: 12, reference: "Genesis 28:10-12", title: "Jacob Sleeps In The Wilderness", icon: "🪨", phrases: [
    phrase("🏃 Jacob Went Out From Beer-sheba", ["Jacob leaves the place connected to family, wells, and covenant memory.", "He is not leaving as a calm traveler on vacation.", "He is leaving because the home has fractured and Esau is dangerous.", "The blessing is with him, but peace is not.", "This line begins Jacob's exile.", "The promised heir is now alone on the road."]),
    phrase("🌙 The Sun Was Set", ["Night comes while Jacob is away from home.", "The detail makes the scene feel lonely and exposed.", "He is not sleeping in a tent surrounded by family protection.", "He has no comfortable bed, no household safety, and no clear idea of what the road will bring.", "Genesis lets the darkness match Jacob's situation.", "This is where God chooses to meet him."]),
    phrase("🪨 Stones For His Pillows", ["Jacob uses a stone where a pillow should be.", "That one detail tells us how uncomfortable and vulnerable he is.", "He is carrying the blessing, but he is not living in comfort.", "God's promise does not mean the road immediately feels easy.", "The stone also becomes important later, because God will turn the place of discomfort into a memory of worship.", "What begins as a pillow will become a pillar."]),
    phrase("🪜 A Ladder Set Up On The Earth", ["Jacob sees a stairway connecting earth and heaven.", "The dream shows that heaven is not closed over his lonely road.", "Angels are moving, which means God's activity reaches into Jacob's world.", "Jacob may feel cut off from home, but he is not cut off from God.", "The place that looked ordinary is full of divine presence.", "God is showing Jacob that the covenant is not trapped inside his father's tent."]),
    phrase("👼 Angels Ascending And Descending", ["The angels move between heaven and earth.", "This pictures connection, care, and divine activity.", "Jacob is not told every detail of what the angels are doing.", "The point is that God's world and Jacob's road are connected.", "Later Scripture will echo this kind of language when Jesus speaks of heaven opened.", "For Jacob, the dream means he is not abandoned in the wilderness."]),
  ] },
  { chapter: 28, startVerse: 13, endVerse: 15, reference: "Genesis 28:13-15", title: "God Repeats The Covenant Promise", icon: "📜", phrases: [
    phrase("🙌 The LORD Stood Above It", ["The dream is not only about angels.", "The Lord Himself speaks to Jacob.", "That matters because Jacob has grown up around the God of Abraham and Isaac, but now God addresses him directly.", "The covenant promise becomes personal on the road.", "Jacob did not climb up to find God.", "God comes near and speaks first."]),
    phrase("📛 I Am The LORD God Of Abraham", ["God identifies Himself through the covenant family story.", "Jacob is hearing the same Lord who called Abraham and blessed Isaac.", "The promise is not a new religion invented for Jacob's crisis.", "It is the faithful continuation of God's old word.", "Jacob's identity is being anchored in God's covenant, not in his deception.", "The God of his fathers is now meeting him personally."]),
    phrase("🌍 The Land Whereon Thou Liest", ["God promises Jacob the land beneath his vulnerable body.", "This is powerful because Jacob owns none of it in the moment.", "He is sleeping outside with a stone for a pillow.", "Yet God speaks inheritance over the very ground where he lies.", "The promise is larger than what Jacob can currently hold.", "God names future possession in the place of present weakness."]),
    phrase("🌫️ As The Dust Of The Earth", ["God promises descendants too many to count.", "Jacob is alone, but God speaks of a multitude.", "The contrast is meant to be felt.", "One displaced man will become the father of tribes.", "The promise is not limited by Jacob's current loneliness.", "God sees generations where Jacob sees only the next step."]),
    phrase("🌍 All Families Of The Earth", ["The Abrahamic promise widens again to the nations.", "Jacob's family is not blessed only for private comfort.", "God intends blessing to reach all families of the earth through this line.", "That keeps Genesis from becoming a small family success story.", "The covenant is global in purpose.", "Christians hear this as part of the long road toward Christ."]),
    phrase("🤝 I Am With Thee", ["This is the deeply personal promise in the passage.", "Jacob is leaving home, but not leaving God's reach.", "God does not say Jacob has earned this presence by being wise or honest.", "He says it because He is faithful to His promise.", "Presence is what Jacob needs more than a map.", "The road ahead will be hard, but he will not walk it alone."]),
    phrase("🛡️ I Will Keep Thee", ["God promises protection wherever Jacob goes.", "This does not mean Jacob will avoid every hardship.", "It means God will preserve him through the road ahead.", "Jacob will face Laban, family tension, labor, fear, and return.", "But God's keeping will hold the story together.", "The promise gives courage before the difficulty is removed."]),
    phrase("🔙 Bring Thee Again Into This Land", ["God promises Jacob return before Jacob even reaches exile.", "That matters because the covenant land is still central.", "Haran will shape Jacob, but it is not his final home.", "God's promise includes both going and coming back.", "This gives the whole Jacob story a direction.", "The Lord begins by telling Jacob he will not be lost forever."]),
  ] },
  { chapter: 28, startVerse: 16, endVerse: 19, reference: "Genesis 28:16-19", title: "Jacob Names The Place Bethel", icon: "📍", phrases: [
    phrase("😳 Surely The LORD Is In This Place", ["Jacob wakes up with a new awareness.", "The place was holy before he knew it.", "That is the surprise of the scene.", "God was present while Jacob thought he was simply sleeping outdoors.", "This teaches that God's presence is not always obvious at first.", "Sometimes a person only realizes afterward that God was near."]),
    phrase("❓ I Knew It Not", ["Jacob admits he did not recognize the place for what it was.", "He arrived tired, displaced, and unaware.", "God was not absent because Jacob was unaware.", "This is comforting for readers who look back and realize God was working before they understood.", "Jacob's ignorance did not stop God's mercy.", "The Lord was present before Jacob had language for it."]),
    phrase("😨 He Was Afraid", ["Jacob's fear here is holy awe, not only terror.", "He realizes he has encountered the living God.", "The ordinary campsite has become overwhelming.", "A true encounter with God does not make Jacob casual.", "It awakens reverence.", "The dream changes how he sees the ground beneath him."]),
    phrase("🏠 House Of God", ["Jacob calls the place God's house.", "He does not mean there is a building there yet.", "He means God has made Himself known there.", "The name Bethel will become a major memory marker in Jacob's life.", "This place will call him back later.", "A lonely night becomes a holy landmark."]),
    phrase("🚪 Gate Of Heaven", ["Jacob realizes the place is connected to heaven's activity.", "The dream showed angels moving between heaven and earth.", "Now Jacob names the meaning of what he saw.", "The road is not spiritually empty.", "God's world has opened over Jacob's wilderness.", "The gate language shows access, presence, and awe."]),
    phrase("🪨 Set It Up For A Pillar", ["The stone that held Jacob's head becomes a memorial.", "What was used in weakness is now set apart for worship.", "Jacob marks the place so he will remember what God did there.", "Bible memory often attaches truth to places, objects, and names.", "The pillar does not contain God.", "It helps Jacob remember God's mercy on the road."]),
    phrase("🫗 Poured Oil On The Top", ["Pouring oil marks the stone as set apart.", "Jacob is responding physically to a spiritual encounter.", "His faith is still young, but he knows this moment matters.", "The action says, this place is not ordinary to me anymore.", "Worship begins where God reveals Himself.", "Jacob's road now has a holy marker."]),
  ] },
  { chapter: 28, startVerse: 20, endVerse: 22, reference: "Genesis 28:20-22", title: "Jacob Makes A Vow", icon: "🤲", phrases: [
    phrase("🤲 Jacob Vowed A Vow", ["Jacob responds to God's promise with a vow.", "His response is real, but it also shows he is still growing.", "He is not yet the mature Israel he will become.", "He is a fearful man beginning to answer the God who met him.", "That makes the scene feel honest.", "A real encounter can begin transformation without completing it in one night."]),
    phrase("🍞 Bread To Eat", ["Jacob asks for basic provision.", "After the huge covenant promises, his mind still goes to survival needs.", "That is not hard to understand.", "He is away from home and unsure of the road.", "God's large promises do not erase the need for daily bread.", "Jacob is learning to trust God with both destiny and dinner."]),
    phrase("👕 Raiment To Put On", ["Jacob asks for clothing too.", "These are ordinary needs, not grand spiritual language.", "The request shows how vulnerable he feels.", "He has received a vision of heaven, but he still needs provision on earth.", "Bible faith is not disconnected from practical life.", "God's care reaches the body as well as the promise."]),
    phrase("🏠 Come Again To My Father's House In Peace", ["Jacob longs to return home safely.", "This request carries the pain of Genesis 27.", "He left because home was dangerous and broken.", "Jacob wants more than travel success; he wants restoration and peace.", "God has already promised return, and Jacob is beginning to hold onto it.", "The road away is now tied to hope for coming back."]),
    phrase("🙌 Then Shall The LORD Be My God", ["Jacob's words sound conditional because his faith is still young.", "He is responding to God, but he is still learning what trust means.", "Genesis does not hide that growth takes time.", "God has already committed Himself to Jacob before Jacob fully knows how to commit himself to God.", "That is grace.", "Jacob's vow is a beginning, not the finish line."]),
    phrase("🔟 I Will Surely Give The Tenth", ["Jacob promises a tenth of what God gives him.", "This is a worship response to God's promised provision.", "He recognizes that what he receives will come from the Lord.", "The vow shows gratitude, but also Jacob's developing faith.", "He is starting to think of his future as something lived before God.", "Bethel becomes the first marker of that awakening."]),
  ] },
  { chapter: 29, startVerse: 1, endVerse: 3, reference: "Genesis 29:1-3", title: "Jacob Comes To The Well", icon: "💧", phrases: [
    phrase("👣 Jacob Went On His Journey", ["After Bethel, Jacob keeps walking.", "The holy dream does not teleport him to the answer.", "He still has to travel the road ahead.", "This matters because spiritual encounters do not remove the need for endurance.", "God promised to be with him, and now Jacob must live forward under that promise.", "Faith continues one step at a time."]),
    phrase("🌅 People Of The East", ["Jacob arrives in the region connected with his mother's family.", "He is now far from home and entering a new household world.", "The phrase signals a new stage of the story.", "The covenant heir is outside Canaan for a season.", "God's promise is still with him, but the setting has changed.", "This is where Jacob will be shaped through love, labor, and deception."]),
    phrase("💧 A Well In The Field", ["Once again, a well becomes an important meeting place in Genesis.", "Abraham's servant met Rebekah at a well, and now Jacob comes to a well.", "Wells were places of life, work, and conversation.", "This setting connects Jacob's story to the earlier marriage story.", "But Jacob is not represented by a servant this time.", "He is alone, stepping into his own future."]),
    phrase("🐑 Three Flocks", ["The flocks show that the well serves a working community.", "This is not a decorative backdrop for romance.", "It is an ordinary place where shepherds manage water and animals.", "Genesis grounds the promise story in daily labor.", "People, animals, stones, and water all matter.", "God's guidance often unfolds in regular work settings."]),
    phrase("🪨 A Great Stone", ["The large stone controls access to the water.", "It has to be moved before the flocks can drink.", "That detail will matter when Rachel arrives.", "The stone creates a problem in the scene.", "Jacob will soon act with unusual strength and urgency.", "The physical setting prepares the emotional moment."]),
  ] },
  { chapter: 29, startVerse: 4, endVerse: 6, reference: "Genesis 29:4-6", title: "Jacob Asks About Laban", icon: "❓", phrases: [
    phrase("👥 My Brethren", ["Jacob addresses the shepherds warmly.", "He is a stranger, but he seeks connection.", "That matters because Jacob is far from home and looking for family.", "His question opens the way to Laban's household.", "The road from Bethel is becoming specific.", "God's guidance is moving through ordinary conversation."]),
    phrase("📍 Whence Be Ye?", ["Jacob asks where the shepherds are from.", "This is practical, but it is also how the story narrows toward the right family.", "He is not wandering blindly anymore.", "Step by step, he is getting closer to the people connected to his future.", "God's promise does not cancel practical questions.", "Jacob still has to ask, listen, and learn."]),
    phrase("🏠 Know Ye Laban?", ["Laban's name enters the scene before Laban appears.", "For Jacob, this is the family connection he has been sent to find.", "For the reader, Laban's name will soon carry both welcome and danger.", "He is family, but he will also become a deceiver.", "Genesis often introduces people before revealing their full character.", "This question opens a complicated chapter in Jacob's life."]),
    phrase("🕊️ He Is Well", ["The shepherds answer that Laban is well.", "This gives Jacob immediate relief.", "The family he seeks is alive and reachable.", "After fleeing home, even this simple news matters.", "God's keeping is showing up in small confirmations.", "Jacob's road is not random."]),
    phrase("👧 Rachel His Daughter Cometh", ["Rachel enters before she speaks.", "She is connected directly to Laban's household.", "Her arrival is the answer Jacob needs and the beginning of a major love story.", "But the reader should remember Genesis rarely gives simple romance without family complexity.", "Rachel's appearance brings hope.", "It also brings Jacob to the house where he will be tested."]),
  ] },
  { chapter: 29, startVerse: 7, endVerse: 8, reference: "Genesis 29:7-8", title: "Jacob Questions The Shepherds", icon: "🐑", phrases: [
    phrase("☀️ It Is Yet High Day", ["Jacob notices the work rhythm at the well.", "He questions why the shepherds are waiting instead of watering the flocks.", "This shows Jacob engaging the practical world around him.", "He is not passive on the road.", "The detail also builds tension before Rachel arrives.", "The well is ready, but the stone has not been moved."]),
    phrase("💧 Water Ye The Sheep", ["Jacob urges the shepherds to water the animals and keep moving.", "He may be confused by their custom or impatient with delay.", "Either way, the line reveals his active personality.", "Jacob is a man who pushes toward outcomes.", "That trait can become useful or dangerous depending on his heart.", "Genesis lets us see his energy in ordinary conversation."]),
    phrase("🪨 Roll The Stone", ["The shepherds explain that the stone cannot be moved until all the flocks gather.", "The community has a shared water practice.", "The stone is not only heavy; it is part of an agreed system.", "Jacob is entering a world with customs he does not control.", "This matters because Laban's household will also run by customs Jacob does not fully understand.", "The well quietly prepares us for cultural tension."]),
  ] },
  { chapter: 29, startVerse: 9, endVerse: 12, reference: "Genesis 29:9-12", title: "Jacob Meets Rachel", icon: "❤️", phrases: [
    phrase("🐑 Rachel Came With Her Father's Sheep", ["Rachel is introduced while working.", "She is caring for her father's flock.", "Genesis often reveals people through ordinary responsibility before dramatic speeches.", "Rachel is not introduced in a palace.", "She appears in the rhythm of daily labor.", "This is where Jacob's next chapter begins."]),
    phrase("🏃 Jacob Went Near", ["Jacob acts as soon as Rachel arrives.", "The scene suddenly becomes energetic.", "He has found the family connection he was seeking.", "His movement shows relief, excitement, and urgency.", "The lonely traveler is no longer just asking directions.", "He is meeting his mother's kin."]),
    phrase("🪨 Rolled The Stone", ["Jacob moves the stone from the well's mouth.", "Earlier the shepherds said they waited until all the flocks gathered.", "Jacob breaks through the delay when Rachel arrives.", "The action shows strength and emotion.", "It also hints that Jacob can be forceful when desire is awakened.", "The well becomes the place where his future opens."]),
    phrase("💧 Watered The Flock", ["Jacob serves Rachel by watering the sheep.", "This echoes Rebekah's well scene, but with the roles reversed.", "At Isaac's marriage story, Rebekah watered the camels.", "Here Jacob waters Rachel's flock.", "The connection is intentional and memorable.", "Genesis is linking generations through repeated well scenes."]),
    phrase("😭 Lifted Up His Voice, And Wept", ["Jacob's tears are intense and human.", "He has fled home, traveled far, and finally found family.", "The tears may carry relief, exhaustion, hope, and loneliness all together.", "This moment is not only romantic.", "It is the emotion of a displaced man realizing he has reached the household connected to his future.", "Genesis lets readers feel the human side of the promise story."]),
    phrase("🗣️ Told Rachel That He Was Her Father's Brother", ["Jacob explains the family connection.", "He is not a random stranger at the well.", "He belongs to the extended family line.", "This matters because kinship gives him a place to be received.", "The promise story is moving into Rebekah's household.", "Rachel now carries the news home."]),
  ] },
  { chapter: 29, startVerse: 13, endVerse: 15, reference: "Genesis 29:13-15", title: "Laban Welcomes Jacob", icon: "🏠", phrases: [
    phrase("🏃 Laban Ran To Meet Him", ["Laban runs when he hears about Jacob.", "The welcome looks warm and eager.", "Readers who remember Laban from Genesis 24 may also sense his interest in opportunity.", "He is family, but Genesis will soon show his complicated character.", "The welcome is real, but it is not the whole story.", "Jacob has entered a house where he will both belong and be used."]),
    phrase("🤗 Embraced Him, And Kissed Him", ["The gestures show family hospitality.", "Jacob is received into the household after his lonely journey.", "This must have felt like relief after fleeing home.", "But closeness in Genesis does not always mean safety.", "Family love and family manipulation can exist in the same space.", "Jacob is about to learn that painfully."]),
    phrase("🗣️ Told Laban All These Things", ["Jacob tells Laban his story.", "The text does not record every detail, but Jacob has much to explain.", "He has come from a fractured household with blessing and danger behind him.", "Laban now knows enough to take him in.", "Information creates relationship, but it can also create leverage.", "Jacob's vulnerability is now inside Laban's house."]),
    phrase("🦴 My Bone And My Flesh", ["Laban claims Jacob as close family.", "The phrase sounds protective and warm.", "But the next verses will show that family language does not prevent exploitation.", "Jacob is kin, not a stranger.", "That makes Laban's later deception feel even heavier.", "The one who should protect him will use him."]),
    phrase("📅 Abode With Him The Space Of A Month", ["Jacob stays with Laban for a month before wages are discussed.", "This gives time for the household relationship to form.", "It also gives Laban time to observe Jacob's usefulness.", "Jacob has found shelter, but he has also entered dependence.", "The road from Bethel has led to a place of both provision and testing.", "God is with Jacob, but Laban will not be easy."]),
  ] },
  { chapter: 29, startVerse: 16, endVerse: 20, reference: "Genesis 29:16-20", title: "Jacob Serves Seven Years For Rachel", icon: "⏳", phrases: [
    phrase("👭 Laban Had Two Daughters", ["Leah and Rachel are introduced together.", "The family structure matters because both sisters will shape Israel's future.", "Genesis is setting up love, rivalry, grief, and motherhood.", "This is not only Jacob's romance story.", "It is the beginning of a deeply complicated household.", "Two sisters will become central to the tribes of Israel."]),
    phrase("👀 Leah Was Tender Eyed", ["This phrase has been understood in different ways, but it contrasts Leah with Rachel's beauty.", "Genesis immediately places the sisters in comparison.", "That comparison will become painful.", "Leah will live under the shadow of being less desired.", "The text prepares us to feel her vulnerability.", "God will later see the pain others overlook."]),
    phrase("✨ Rachel Was Beautiful", ["Rachel's beauty is stated plainly.", "Jacob's love for her becomes the emotional engine of the next scene.", "Beauty is not treated as evil.", "But desire will make Jacob vulnerable to Laban's manipulation.", "Genesis shows how love can be sincere and still exist inside a broken family system.", "Rachel is loved, but that does not mean the household will be healthy."]),
    phrase("❤️ Jacob Loved Rachel", ["This is direct and tender.", "Jacob's heart is fixed on Rachel.", "After fleeing home, he finds someone he deeply wants.", "Love gives meaning to his labor.", "But the same love also gives Laban power over him.", "Jacob's desire will become the place where he is deceived."]),
    phrase("🤝 I Will Serve Thee Seven Years", ["Jacob offers labor as the bride price.", "He likely has little wealth after leaving home, so his work becomes the payment.", "Seven years is a serious commitment.", "This shows devotion, but also dependence.", "Jacob is trusting Laban to honor the agreement.", "That trust will be broken."]),
    phrase("⏳ They Seemed Unto Him But A Few Days", ["Jacob's love changes how he experiences the years.", "The work is long, but affection gives it meaning.", "This is one of the tenderest lines in the chapter.", "Genesis lets the reader feel Jacob's genuine love before the deception hits.", "The beauty of the line makes Laban's later betrayal feel worse.", "Love is real here, even though the household is flawed."]),
  ] },
  { chapter: 29, startVerse: 21, endVerse: 25, reference: "Genesis 29:21-25", title: "Laban Deceives Jacob", icon: "🎭", phrases: [
    phrase("👰 Give Me My Wife", ["Jacob asks for Rachel after completing the seven years.", "He has fulfilled his side of the agreement.", "The request is direct because the time is complete.", "Jacob expects honesty from Laban.", "The deceiver from Genesis 27 is now depending on someone else's truthfulness.", "That irony is about to become painful."]),
    phrase("🍽️ Laban Made A Feast", ["The wedding feast looks like celebration.", "But the joyful setting becomes the cover for deception.", "Genesis often lets sin happen inside ordinary family events.", "A feast should mark covenant joy.", "Here it becomes the stage for a switch.", "The celebration hides betrayal."]),
    phrase("🌙 In The Evening", ["The timing matters.", "Evening darkness creates the setting where the deception can happen.", "Jacob once used his father's blindness and disguise to take a blessing.", "Now darkness helps Laban deceive Jacob.", "Genesis lets the poetic justice sit in the story.", "The man who deceived is now deceived."]),
    phrase("👰 He Took Leah His Daughter", ["Laban gives Leah instead of Rachel.", "Leah is also being placed into a painful situation.", "She is not just a plot device; she is a real woman entering a marriage without being Jacob's chosen bride.", "Laban's deception wounds Jacob, Rachel, and Leah.", "Family manipulation spreads pain in every direction.", "Genesis refuses to make this a simple trick story."]),
    phrase("😳 In The Morning, Behold, It Was Leah", ["The shock lands in the morning light.", "Jacob discovers that he has been deceived.", "The phrase is famous because it captures sudden reversal.", "Jacob's old sin comes back with forceful irony.", "He knows what it feels like to be tricked in a family blessing/marriage moment.", "The Bible is showing that deception multiplies grief."]),
    phrase("❓ Wherefore Then Hast Thou Beguiled Me?", ["Jacob names Laban's action as deception.", "The word stings because Jacob himself deceived Isaac.", "He is now tasting the pain from the other side.", "This does not make Laban right.", "It shows that sin creates patterns that come back with bitter force.", "Jacob still has much to learn."]),
  ] },
  { chapter: 29, startVerse: 26, endVerse: 30, reference: "Genesis 29:26-30", title: "Jacob Receives Rachel Also", icon: "💔", phrases: [
    phrase("📜 It Must Not Be So Done In Our Country", ["Laban appeals to local custom after deceiving Jacob.", "He uses a rule Jacob did not know to justify what he did.", "This is manipulation dressed in cultural explanation.", "Jacob has entered a household where the rules can be used against him.", "The excuse does not erase the betrayal.", "It exposes Laban's control."]),
    phrase("📅 Fulfil Her Week", ["Jacob must complete Leah's wedding week before receiving Rachel.", "Leah is now bound to Jacob in a painful arrangement.", "Rachel is delayed, but not removed.", "The household becomes complicated immediately.", "Genesis shows the emotional cost of arrangements made through deception.", "No one leaves this clean."]),
    phrase("⏳ Serve With Me Yet Seven Other Years", ["Laban gains another seven years of labor from Jacob.", "The deception gives Laban exactly what benefits him.", "Jacob's love is used as leverage.", "This is exploitation inside family language.", "The one who came seeking refuge is now trapped in obligation.", "God is with Jacob, but Laban is shaping the road through hardship."]),
    phrase("👰 He Gave Him Rachel", ["Jacob finally receives Rachel too.", "The desired marriage happens, but not in a healthy way.", "The joy is mixed with betrayal, rivalry, and future pain.", "Genesis does not present this as an ideal family structure.", "It shows how broken choices create broken households.", "The promise will move forward through this family, but not because the family is peaceful."]),
    phrase("❤️ He Loved Also Rachel More Than Leah", ["This phrase sets up years of pain.", "Jacob's love for Rachel is real, but Leah is left wounded by comparison.", "Favoritism has already damaged Jacob's childhood home.", "Now favoritism begins shaping his own household.", "The pattern is repeating.", "Genesis is preparing the birth rivalry that follows."]),
  ] },
  { chapter: 29, startVerse: 31, endVerse: 35, reference: "Genesis 29:31-35", title: "God Sees Leah", icon: "👀", phrases: [
    phrase("👀 The LORD Saw Leah Was Hated", ["Hated here means Leah is unloved or loved less compared with Rachel.", "The Lord sees the pain Jacob's household creates for her.", "Leah may be unwanted by her husband, but she is not invisible to God.", "This matters because Genesis often shows God noticing the overlooked person.", "He saw Hagar in distress, and now He sees Leah in rejection.", "God's compassion reaches the person the family system pushes aside."]),
    phrase("👶 He Opened Her Womb", ["Children were deeply important in the ancient world.", "They carried family future, security, honor, and inheritance.", "God gives Leah sons in the middle of her pain.", "This does not erase the hurt of being unloved by Jacob.", "But it shows that God is dealing kindly with her.", "The rejected wife becomes a major mother in Israel's story."]),
    phrase("👁️ Reuben", ["Reuben's name is connected to seeing.", "Leah says the Lord has looked upon her affliction.", "That name is a testimony from a wounded woman.", "She wants Jacob's love, but she also knows God has seen her.", "The child becomes a marker of divine attention.", "God notices what the household overlooks."]),
    phrase("👂 Simeon", ["Simeon's name is connected to hearing.", "Leah says the Lord heard that she was hated.", "This repeats the theme that God responds to hidden pain.", "People may measure Leah by Jacob's affection, but God hears her grief.", "Her son is named out of sorrow and mercy.", "The family of Israel is being born through complicated tears."]),
    phrase("🔗 Levi", ["Leah hopes Jacob will now be joined to her.", "The name carries her longing for attachment.", "This is heartbreaking because each birth is mixed with hope for love.", "Leah is not just producing children; she is aching to be wanted.", "Genesis lets readers feel that emotional hunger.", "God will later use Levi's line in priestly service, even though the name begins in pain."]),
    phrase("🙌 Judah", ["Judah's name is connected to praise.", "With Judah, Leah's words turn toward the Lord in a new way.", "This does not mean all her pain disappears.", "But the naming shifts from chasing Jacob's affection to praising God.", "Judah will become one of the most important tribes in Scripture.", "Kings will come from Judah, and Christians see Jesus coming from Judah's line."]),
  ] },
];

const day11Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_11_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 28:1-5": [
    day11Phrase("Blessed Him", ["Isaac blesses Jacob openly this time.", "The blessing is no longer hidden behind goat skins and a borrowed name.", "Jacob leaves home carrying a real spoken blessing, even though the family wound is still fresh."]),
    day11Phrase("Arise", ["Isaac's command means Jacob cannot stay where the family has broken apart.", "The blessing now sends him onto the road.", "Sometimes the next step of God's story begins with leaving a place that has become dangerous."]),
    day11Phrase("House Of Bethuel", ["Bethuel is Rebekah's father, so this sends Jacob back into his mother's family line.", "A beginner may miss that this connects directly to Genesis 24.", "Jacob is being sent toward the same household from which Isaac received Rebekah."]),
    day11Phrase("Daughters Of Laban", ["Laban is Rebekah's brother, so Jacob is being directed toward close kin.", "That sounds safe at first, but Genesis will show Laban as complicated and manipulative.", "The road of obedience will still include testing."]),
    day11Phrase("A Multitude Of People", ["Isaac speaks a future over Jacob that is much bigger than one man fleeing home.", "The lonely traveler will become the father of a whole people.", "God's promise can speak crowds over a person who currently looks alone."]),
    day11Phrase("To Thee And To Thy Seed", ["The blessing reaches Jacob and the generations after him.", "Genesis keeps showing that covenant promises are never only private comfort.", "Jacob's choices and God's mercy will shape children, tribes, and nations."]),
    day11Phrase("Land Wherein Thou Art A Stranger", ["Jacob does not yet own the promised land in the settled way the promise describes.", "He is still a stranger, a pilgrim, and now an exile.", "Faith has to hold God's future while living in present uncertainty."]),
    day11Phrase("Which God Gave Unto Abraham", ["The land promise is anchored in God's gift to Abraham.", "Jacob is not inventing a new destiny for himself.", "He is being folded into the same covenant story God began before he was born."]),
  ],
  "Genesis 28:6-9": [
    day11Phrase("Isaac Had Blessed Jacob", ["Esau sees that Jacob has received the blessing he wanted.", "This detail keeps the family tension alive after Genesis 27.", "The blessing has moved forward, but the pain around it has not disappeared."]),
    day11Phrase("Sent Him Away To Padan-aram", ["Esau notices Jacob is being sent away with purpose, not merely running.", "Padan-aram is the region tied to Rebekah's family.", "Jacob's exile is also being shaped into a marriage journey."]),
    day11Phrase("Jacob Obeyed His Father And His Mother", ["Jacob leaves under his parents' instruction.", "After a chapter filled with deception, obedience is now named directly.", "The story is not saying Jacob is perfect; it is showing him stepping into the next direction."]),
    day11Phrase("Seeing That The Daughters Of Canaan Pleased Not Isaac", ["Esau finally reads the household grief around his marriages.", "He understands the outside issue, but he does not fully grasp covenant faithfulness.", "Seeing displeasure is not the same thing as having a changed heart."]),
    day11Phrase("Esau Went Unto Ishmael", ["Esau turns toward Ishmael's family, which is closer to Abraham's line than the Canaanites.", "The move looks like an attempt to fix his standing.", "But it is reaction after loss, not quiet obedience from the beginning."]),
    day11Phrase("Sister Of Nebajoth", ["Nebajoth was Ishmael's firstborn, so this phrase identifies Mahalath inside Ishmael's line.", "Genesis uses family details to show exactly where Esau is reaching.", "He is trying to attach himself to Abraham's wider family branch."]),
  ],
  "Genesis 28:10-12": [
    day11Phrase("Went Toward Haran", ["Haran is where Jacob is headed to find Rebekah's family.", "It is also the place where his life will be reshaped through labor, love, and conflict.", "The road away from home is becoming the road into his future household."]),
    day11Phrase("Lighted Upon A Certain Place", ["Jacob arrives at a place that seems ordinary at first.", "He does not yet know it will become holy memory.", "Genesis loves moments where God is present before the person realizes it."]),
    day11Phrase("Tarried There All Night", ["Jacob stops because night has come.", "The promised heir is sleeping outdoors with no family tent around him.", "The scene feels lonely so the dream of God's presence will feel even more powerful."]),
    day11Phrase("Took Of The Stones Of That Place", ["Jacob uses what the place provides.", "There is no comfort, only stones and open ground.", "The roughness of the scene makes God's tenderness in the dream stand out."]),
    day11Phrase("Lay Down In That Place To Sleep", ["Jacob's body rests in the very place God is about to claim with promise.", "He is vulnerable, tired, and unaware.", "God meets him while he is not performing, planning, or proving anything."]),
    day11Phrase("Top Of It Reached To Heaven", ["The ladder or stairway reaches all the way into heaven.", "This shows connection between God's world and Jacob's lonely ground.", "The exile road is not sealed off from divine care."]),
  ],
  "Genesis 28:13-15": [
    day11Phrase("God Of Isaac", ["God names Isaac too, not only Abraham.", "The covenant has already passed through one generation and now reaches Jacob.", "The Lord is showing that the promise did not die with Abraham or stop with Isaac."]),
    day11Phrase("Will I Give It", ["God speaks of giving land while Jacob owns none of it in the moment.", "That contrast matters because faith often begins with a word before possession.", "Jacob is lying on promised ground as a homeless traveler."]),
    day11Phrase("Thou Shalt Spread Abroad", ["God promises expansion in every direction.", "Jacob is one man leaving home, but God sees a people spreading across the land.", "The promise is bigger than Jacob's current fear."]),
    day11Phrase("To The West, And To The East", ["The promise stretches across directions, not just one small place.", "God is giving Jacob a wide future.", "The lonely campsite is being opened into a horizon."]),
    day11Phrase("To The North, And To The South", ["The language keeps widening the map.", "Jacob cannot see these generations yet, but God speaks them with certainty.", "Divine promise sees farther than human eyes."]),
    day11Phrase("Be Blessed In Thee And In Thy Seed", ["The blessing through Jacob is meant to reach beyond Jacob.", "God's covenant is not small family favoritism.", "It is part of His plan to bring blessing to all families of the earth."]),
    day11Phrase("I Will Not Leave Thee", ["This is mercy for a man who has left home under a cloud of deception and fear.", "God promises presence before Jacob has matured into Israel.", "The Lord's faithfulness is stronger than Jacob's instability."]),
    day11Phrase("Until I Have Done That Which I Have Spoken", ["God commits Himself to finishing what He promised.", "Jacob's future will include hard years, but God's word will not evaporate.", "The promise has a destination because God Himself guards it."]),
  ],
  "Genesis 28:16-19": [
    day11Phrase("Jacob Awaked Out Of His Sleep", ["Jacob wakes up changed by what he has seen.", "The same ground looks different after God's revelation.", "A place can become holy in a person's memory because God met them there."]),
    day11Phrase("How Dreadful Is This Place", ["Dreadful here means awe-filled and overwhelming, not evil.", "Jacob feels the holy seriousness of God's presence.", "This is not casual spirituality; it is trembling wonder."]),
    day11Phrase("This Is None Other", ["Jacob realizes the place is not ordinary.", "What looked like a random overnight stop is connected to heaven.", "God was near before Jacob knew how to name it."]),
    day11Phrase("Rose Up Early In The Morning", ["Jacob responds quickly after the dream.", "He does not treat the encounter like a strange night he can ignore.", "The morning becomes a moment of worshipful action."]),
    day11Phrase("Took The Stone", ["The same stone that supported his head becomes a memorial.", "God turns the object of discomfort into a marker of mercy.", "Jacob's hard night becomes something he wants to remember."]),
    day11Phrase("Called The Name Of That Place Bethel", ["Bethel means house of God.", "Jacob gives the place a name that matches what God revealed there.", "Naming the place helps preserve the encounter for the future."]),
    day11Phrase("The Name Of That City Was Called Luz", ["Luz was the earlier name of the place.", "Genesis tells us the old name so we feel the transformation.", "God's meeting with Jacob gives the place a new meaning in the covenant story."]),
  ],
  "Genesis 28:20-22": [
    day11Phrase("If God Will Be With Me", ["Jacob repeats the promise of God's presence, but as a young man's vow.", "His faith is real and still developing.", "He is learning to trust the God who has already promised to be with him."]),
    day11Phrase("Keep Me In This Way", ["Jacob asks God to guard him on the road ahead.", "The way includes travel, danger, Laban's house, and eventual return.", "He needs more than directions; he needs divine keeping."]),
    day11Phrase("This Stone Which I Have Set For A Pillar", ["Jacob points back to the memorial he just raised.", "The stone becomes a witness to the vow.", "It ties his future response to the place where God met him."]),
    day11Phrase("Shall Be God's House", ["Jacob marks Bethel as a place of worship and memory.", "He is not building a temple yet, but he is naming the place as belonging to God.", "His lonely campsite has become a holy landmark."]),
    day11Phrase("Of All That Thou Shalt Give Me", ["Jacob recognizes that future provision will come from God.", "He does not yet have much, but he is already speaking about received gifts.", "Faith learns to see possessions as entrusted, not self-made."]),
  ],
  "Genesis 29:1-3": [
    day11Phrase("Came Into The Land Of The People Of The East", ["Jacob arrives in the broader region where his mother's family lives.", "The phrase signals that he has crossed into a different world.", "The promise is traveling outside the familiar land for a season."]),
    day11Phrase("Out Of That Well They Watered The Flocks", ["The well is the center of life and work in this scene.", "Without water, the flocks cannot survive.", "God's guidance meets Jacob in a place of ordinary daily need."]),
    day11Phrase("A Great Stone Was Upon The Well's Mouth", ["The stone blocks access to the water until the right time.", "It creates tension and expectation in the scene.", "When Rachel arrives, this stone will become part of Jacob's emotional response."]),
    day11Phrase("Gathered All The Flocks", ["The shepherds wait for the full group before opening the well.", "This shows a shared custom and community rhythm.", "Jacob is entering a place with rules and habits he does not yet know."]),
    day11Phrase("Put The Stone Again Upon The Well's Mouth", ["After watering, the stone is returned to protect the water source.", "This detail shows order and repetition in shepherd life.", "Genesis grounds big covenant events inside real work routines."]),
  ],
  "Genesis 29:4-6": [
    day11Phrase("We Be Of Haran", ["The shepherds answer with the place Jacob is seeking.", "This is a quiet confirmation that he has reached the right region.", "God's keeping is showing up through a simple conversation."]),
    day11Phrase("The Son Of Nahor", ["Laban is identified through the older family line.", "This connects Jacob's journey back to Abraham's kin.", "The family tree is not background noise; it guides the covenant story."]),
    day11Phrase("Behold, Rachel His Daughter", ["Rachel appears as the answer to Jacob's search before she even speaks.", "The moment gathers family, future, and emotion into one arrival.", "Jacob is about to meet the woman he will love deeply."]),
    day11Phrase("Cometh With The Sheep", ["Rachel comes as a shepherdess at work.", "She is introduced through responsibility, not decoration.", "The future family story begins beside ordinary labor."]),
  ],
  "Genesis 29:7-8": [
    day11Phrase("Lo, It Is Yet High Day", ["Jacob notices that much of the workday remains.", "He wonders why the shepherds are waiting instead of watering and grazing.", "The line shows his practical, active nature."]),
    day11Phrase("Neither Is It Time That The Cattle Should Be Gathered Together", ["Jacob thinks the animals should still be out feeding.", "He is reading the scene through his own expectations.", "A stranger is already trying to understand the customs of a new place."]),
    day11Phrase("We Cannot", ["The shepherds answer with a boundary Jacob did not know.", "The custom of the well controls what they can do.", "Jacob is learning that this new household world has rules he cannot simply assume."]),
    day11Phrase("Until All The Flocks Be Gathered Together", ["The well opens when the whole group is present.", "That keeps the water use communal and ordered.", "The detail prepares us for Jacob's surprising action when Rachel arrives."]),
    day11Phrase("Then We Water The Sheep", ["Watering is the goal of the whole gathering.", "The animals wait, the shepherds wait, and the stone waits.", "The scene builds anticipation before Jacob acts."]),
  ],
  "Genesis 29:9-12": [
    day11Phrase("For She Kept Them", ["Rachel is responsible for her father's sheep.", "This small phrase gives her dignity and agency in the scene.", "She is working when Jacob meets her."]),
    day11Phrase("Laban His Mother's Brother", ["The phrase repeats the family connection so readers understand Jacob's emotion.", "Rachel is not only beautiful to him; she is kin from his mother's house.", "After exile and loneliness, family is suddenly in front of him."]),
    day11Phrase("The Sheep Of Laban His Mother's Brother", ["Jacob waters the flock because it belongs to the family he came to find.", "Service becomes his first action toward Laban's house.", "This begins the long story of Jacob working around Laban's animals."]),
    day11Phrase("Jacob Kissed Rachel", ["The kiss is part family greeting, part emotional overflow, and part the opening of love.", "The scene is intense because Jacob has finally reached his mother's kin.", "Genesis lets this meeting feel human and immediate."]),
    day11Phrase("Rebekah's Son", ["Jacob identifies himself through his mother.", "That matters because Rebekah is Rachel's aunt and Laban's sister.", "The family connection makes Rachel run with the news."]),
    day11Phrase("She Ran And Told Her Father", ["Rachel carries the news home quickly.", "The well scene now moves into Laban's house.", "Jacob's private arrival becomes a family event."]),
  ],
  "Genesis 29:13-15": [
    day11Phrase("When Laban Heard The Tidings", ["News of Jacob reaches Laban before Jacob does.", "This echoes Genesis 24, where Laban responded quickly when Abraham's servant came.", "The family welcome begins with information moving fast."]),
    day11Phrase("He Rehearsed The Matter To Laban", ["Jacob tells the story in detail.", "He likely explains why he has come, what happened at home, and how he found them.", "That vulnerability gives Laban both knowledge and opportunity."]),
    day11Phrase("Surely Thou Art My Bone And My Flesh", ["Laban's words sound deeply welcoming.", "He claims Jacob as close family.", "But the coming chapters will test whether family language will be matched by faithful treatment."]),
    day11Phrase("Because Thou Art My Brother", ["Brother here means close relative, not literal brother.", "Laban uses kinship language as he begins discussing Jacob's labor.", "The sentence sounds generous, but it opens the door to wages and control."]),
    day11Phrase("Serve Me For Nought", ["Laban recognizes Jacob has been working without formal wages.", "The word nought means nothing.", "This sounds fair on the surface, but Laban is already calculating what Jacob's service is worth to him."]),
    day11Phrase("Tell Me, What Shall Thy Wages Be?", ["Laban asks Jacob to name payment.", "That question shapes the next seven years of Jacob's life.", "A family welcome now becomes a labor negotiation."]),
  ],
  "Genesis 29:16-20": [
    day11Phrase("The Name Of The Elder Was Leah", ["Leah is named first because she is the older daughter.", "That birth order will become Laban's excuse later.", "Genesis places the detail early so the later deception lands with bitter irony."]),
    day11Phrase("The Name Of The Younger Was Rachel", ["Rachel is the younger daughter, and she is the one Jacob loves.", "The younger/elder pattern has already mattered in Jacob's life.", "Now that same kind of family order will be used against him."]),
    day11Phrase("Well Favoured", ["This phrase means Rachel was attractive in form and appearance.", "The text highlights why Jacob is drawn to her.", "But beauty also becomes part of the desire Laban can exploit."]),
    day11Phrase("For Rachel Thy Younger Daughter", ["Jacob names the exact woman he wants.", "He is not making a vague agreement.", "That clarity makes Laban's later switch even more dishonest."]),
    day11Phrase("It Is Better That I Give Her To Thee", ["Laban's answer sounds agreeable without being fully direct.", "He never plainly says, yes, Rachel will be yours after seven years.", "The careful wording leaves room for the manipulation that follows."]),
    day11Phrase("Abide With Me", ["Laban keeps Jacob close through the agreement.", "Jacob gains a path toward Rachel, but Laban gains years of labor.", "The household bond is becoming a labor trap."]),
  ],
  "Genesis 29:21-25": [
    day11Phrase("My Days Are Fulfilled", ["Jacob has completed the seven years he promised.", "He comes to Laban with the confidence of a man who kept his word.", "The sentence makes Laban's betrayal feel even sharper."]),
    day11Phrase("Laban Gathered Together All The Men Of The Place", ["The wedding involves the local community.", "That public setting makes the deception more complex.", "Many people are gathered around a celebration built on hidden betrayal."]),
    day11Phrase("Brought Her To Him", ["Laban brings Leah to Jacob under cover of the wedding night.", "The wording is simple, but the act is devastating.", "A father uses his daughter and deceives his nephew at the same time."]),
    day11Phrase("Laban Gave Unto His Daughter Leah Zilpah", ["Zilpah enters the story as Leah's maid.", "This detail matters because Zilpah will later become part of the childbearing rivalry.", "Genesis is planting names that will matter in Israel's family tree."]),
    day11Phrase("For A Handmaid", ["A handmaid was a female servant attached to the household.", "In this family system, servants could be pulled into the struggles of the main family.", "The phrase prepares the reader for later painful arrangements."]),
    day11Phrase("Did Not I Serve With Thee For Rachel?", ["Jacob appeals to the original agreement.", "He knows exactly what he worked for.", "The question exposes Laban's deception and Jacob's shock."]),
  ],
  "Genesis 29:26-30": [
    day11Phrase("The Younger Before The Firstborn", ["Laban claims local custom forbids giving the younger daughter first.", "The line is loaded because Jacob, the younger brother, had taken the firstborn blessing.", "Now the younger/firstborn issue returns against him."]),
    day11Phrase("We Will Give Thee This Also", ["Laban offers Rachel too, but only under more conditions.", "He speaks as if he is being reasonable after creating the crisis.", "Manipulators often present the second trap as a solution to the first wound."]),
    day11Phrase("For The Service Which Thou Shalt Serve", ["Rachel is tied to another period of labor.", "Jacob's love is turned into seven more years of work.", "Laban's deception becomes a profit system."]),
    day11Phrase("Seven Other Years", ["The number doubles Jacob's obligation.", "Fourteen years of service now stand behind his marriages.", "The cost of Laban's deception will shape Jacob's whole adult life."]),
    day11Phrase("Laban Gave To Rachel His Daughter Bilhah", ["Bilhah is introduced as Rachel's maid.", "Like Zilpah, she will later be drawn into the sisters' rivalry.", "Genesis names her now because she will matter in the birth of Israel's tribes."]),
    day11Phrase("Jacob Did So", ["Jacob accepts the painful terms.", "He has little power in Laban's house and still deeply loves Rachel.", "The sentence carries resignation, desire, and entrapment all at once."]),
  ],
  "Genesis 29:31-35": [
    day11Phrase("Rachel Was Barren", ["Rachel has Jacob's love, but she does not yet have children.", "Leah has children, but not Jacob's full affection.", "Genesis sets up a painful contrast where each sister carries a different ache."]),
    day11Phrase("Leah Conceived", ["God gives Leah a child in the place of rejection.", "This birth is mercy, but it is also mixed with longing.", "Leah's motherhood begins inside an emotionally divided marriage."]),
    day11Phrase("The LORD Hath Looked Upon My Affliction", ["Leah names her pain honestly.", "Affliction means distress, misery, or humiliation.", "She believes God has seen what Jacob has not loved."]),
    day11Phrase("Now Therefore My Husband Will Love Me", ["Leah hopes a son will win Jacob's affection.", "That hope is deeply human and deeply sad.", "The child is a gift, but Leah is still reaching for love."]),
    day11Phrase("Because The LORD Hath Heard", ["With Simeon, Leah says God heard her pain.", "The Lord is not distant from the unloved wife.", "Her sons become living witnesses that God listens where people overlook."]),
    day11Phrase("Now This Time Will My Husband Be Joined Unto Me", ["Leah keeps hoping each child will close the emotional distance.", "The line helps readers feel that repeated blessing has not erased her wound.", "She wants attachment, not just children."]),
    day11Phrase("She Left Bearing", ["The chapter pauses Leah's childbearing after Judah.", "That pause will matter in the next chapter's rivalry.", "Genesis ends the section with Leah praising God, but the family struggle is not finished."]),
  ],
};

function deepenDay11PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  const additions = DAY_11_REAL_PHRASE_ADDITIONS[section.reference] ?? [];
  const withAdditions = [...section.phrases, ...additions];
  return {
    ...section,
    phrases: withAdditions.map((entry) => normalizeDay11Phrase(section, entry)),
  };
}

function cleanDay11PhraseTitle(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function renameDay11WeakPhraseTitle(section: PersonalGenesisPhraseSectionInput, title: string) {
  const cleanTitle = cleanDay11PhraseTitle(title);
  const key = `${section.reference}|${cleanTitle}`;

  const replacements: Record<string, string> = {
    "Genesis 28:1-5|Arise": "Arise, Go To Padan-aram",
    "Genesis 29:31-35|Reuben": "She Called His Name Reuben",
    "Genesis 29:31-35|Simeon": "She Called His Name Simeon",
    "Genesis 29:31-35|Levi": "Therefore Was His Name Called Levi",
    "Genesis 29:31-35|Judah": "She Called His Name Judah",
  };

  return replacements[key] ?? cleanTitle;
}

function normalizeDay11Phrase(section: PersonalGenesisPhraseSectionInput, entry: [string, string]): [string, string] {
  const [heading, content] = entry;
  return [renameDay11WeakPhraseTitle(section, heading), content];
}

const DAY_12_GENESIS_30_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 30, startVerse: 1, endVerse: 6, reference: "Genesis 30:1-6", title: "Rachel's Pain And Bilhah", icon: "💔", phrases: [
    phrase("💔 Rachel Envied Her Sister", ["Rachel is loved by Jacob, but Leah has the children Rachel longs for.", "That mix makes the household emotionally painful because each sister has something the other desperately wants.", "Envy turns another person's blessing into a personal wound.", "Genesis is honest enough to show that covenant families can still be full of comparison.", "Rachel does not only want a child; she feels like Leah's children are proof that she is losing.", "Blessing without peace can still become rivalry when hearts are measuring themselves against each other."]),
    phrase("😢 Give Me Children, Or Else I Die", ["Rachel's words sound extreme, but they reveal how deeply motherhood, status, and hope were tied together in her world.", "She feels trapped in the one grief Jacob's love cannot fix.", "The sentence is not calm theology; it is pain speaking at full volume.", "Jacob cannot heal her wound by romance, money, or anger.", "Genesis lets Rachel sound desperate instead of making her look neatly spiritual.", "People in pain often speak from the ache before they speak from clarity."]),
    phrase("🔥 Jacob's Anger Burned Against Rachel", ["Jacob gives a true answer in a harsh way.", "He is right that he is not God and cannot open the womb by command.", "But being technically right does not mean he is tender.", "Rachel needs compassion, and Jacob answers like a man frustrated by pressure he cannot control.", "Genesis shows the limits of Jacob's love here.", "Truth without gentleness can still wound someone who is already hurting."]),
    phrase("🙏 Am I In God's Place", ["Jacob recognizes that life comes from God, not from human control.", "That matters because Genesis has already shown God opening and closing wombs in the promise family.", "Still, Jacob's tone exposes how helpless he feels.", "He cannot make the covenant future happen by force.", "The question points the reader back to God's authority over birth and promise.", "Some parts of our lives can only be received from God, not seized from people."]),
    phrase("👩‍🍼 Behold, My Maid Bilhah", ["Rachel reaches for a household solution that resembles Sarah and Hagar earlier in Genesis.", "In that world, a servant's child could be counted within the mistress's household.", "But Genesis does not pretend this solves the deeper wound.", "It adds another woman and more complexity into a marriage already full of rivalry.", "Human shortcuts keep repeating in the family story.", "Culturally normal does not always mean spiritually healthy."]),
    phrase("⚖️ God Has Judged Me", ["Rachel names Dan with the language of judgment and being heard.", "She reads the birth as God answering her side of the conflict.", "But the family atmosphere is still competitive, not healed.", "A baby becomes part of the struggle between sisters instead of simply being received with peace.", "Rachel uses God-language inside a rivalry.", "We need to be careful not to turn God's gifts into proof that we beat someone else."]),
  ] },
  { chapter: 30, startVerse: 7, endVerse: 8, reference: "Genesis 30:7-8", title: "Rachel Names Naphtali", icon: "🥀", phrases: [
    phrase("🤼 Mighty Wrestlings", ["Naphtali's name comes out of Rachel's feeling that she has wrestled with her sister and prevailed.", "That phrase tells us how Rachel sees the household: not as shared family, but as contest.", "The children are being named inside emotional conflict.", "Genesis slows down enough for us to feel how painful this is.", "The future tribes of Israel are being born in a home full of tension.", "God can work through wounded beginnings without calling the wounds good."]),
  ] },
  { chapter: 30, startVerse: 9, endVerse: 13, reference: "Genesis 30:9-13", title: "Leah Gives Zilpah", icon: "👩‍🍼", phrases: [
    phrase("👀 Leah Saw That She Had Finished Bearing", ["Leah responds to Rachel's move by making a move of her own.", "When her own bearing seems to pause, she gives Zilpah to Jacob.", "The sisters are not simply building a family; they are answering each other.", "Every birth feels like a score in a rivalry that no one is truly winning.", "Insecurity spreads through the whole household.", "Comparison rarely stays private; it starts shaping decisions that affect everyone nearby."]),
    phrase("👩‍🍼 Zilpah Her Servant", ["Zilpah is pulled into the family conflict the way Bilhah was.", "Her body and future are now tied to Leah's attempt to keep standing in the rivalry.", "Genesis names her, which helps us remember she is not just a tool in the story.", "The household system may be ancient, but the emotional cost is very real.", "The weaker people in the household carry much of the pressure created by the powerful.", "Sin and insecurity often press hardest on people with the least control."]),
    phrase("🍀 How Fortunate", ["Leah names Gad with the language of fortune or troop-like increase.", "She sees another son as a sign that her side is gaining strength.", "The birth is good, but the way the birth is interpreted is tangled with rivalry.", "This is one of the sad patterns in Genesis 30: good gifts enter a strained home.", "More children do not automatically mean more peace.", "Family growth is not the same thing as family health."]),
    phrase("😊 Happy Am I", ["Asher's name is connected to happiness and being called happy by others.", "Leah longs for public recognition, not only private joy.", "She wants others to look at her life and say she is blessed.", "That desire makes sense after years of feeling unwanted by Jacob.", "Leah's words still carry the ache of wanting to be seen.", "People can speak of happiness while still reaching for love they have not received."]),
  ] },
  { chapter: 30, startVerse: 14, endVerse: 18, reference: "Genesis 30:14-18", title: "Mandrakes And A Bargain", icon: "🌿", phrases: [
    phrase("🌾 In The Days Of Wheat Harvest", ["The scene opens in an ordinary season of work and gathering.", "Reuben finds mandrakes in the field, and suddenly a small object becomes loaded with hope.", "Mandrakes were associated in the ancient world with fertility and desire.", "Rachel's request shows how deeply she is still longing for a child.", "Genesis places emotional pain inside everyday family moments.", "Ordinary objects can become symbols when people are desperate for what they lack."]),
    phrase("🌿 Please Give Me Some Of Your Son's Mandrakes", ["Rachel wants the mandrakes because she hopes they might help her conceive.", "The request sounds small, but Leah hears it through years of rejection.", "To Leah, Rachel already has Jacob's heart, and now Rachel wants what Leah's son found.", "The sisters are speaking from wounds that have been building for years.", "Neither woman is emotionally neutral in this conversation.", "Unresolved hurt can make even small requests feel like another loss."]),
    phrase("💬 Is It A Small Matter", ["Leah's answer exposes her grief with sharp honesty.", "She says Rachel has taken her husband, because Leah experiences the marriage as emotional abandonment.", "Even though Leah has children, she does not feel chosen.", "Her words remind us that the household is not only unfair to Rachel.", "Both sisters have real pain, but they are fighting each other instead of naming the broken system around them.", "Rivalry often hides the fact that more than one person is wounded."]),
    phrase("🤝 He Will Lie With You Tonight", ["Rachel trades a night with Jacob for the mandrakes.", "That sentence shows how damaged the marriage arrangement has become.", "Jacob is being scheduled between sisters as they negotiate for hope, status, and affection.", "The Bible records this plainly without making it romantic.", "Genesis does not sanitize the covenant family.", "God's plan can move through messy homes, but the mess still matters."]),
    phrase("👂 God Listened To Leah", ["The surprising center of this section is not the mandrakes, but God listening.", "Rachel sought fertility through the plant, but Leah conceives because God hears.", "The text quietly shifts attention away from superstition and bargaining.", "Life still comes from the Lord.", "Leah is not forgotten by God even when she feels unwanted by Jacob.", "Divine attention reaches the person who feels overlooked in the household."]),
  ] },
  { chapter: 30, startVerse: 19, endVerse: 24, reference: "Genesis 30:19-24", title: "God Remembers Rachel", icon: "👶", phrases: [
    phrase("🎁 God Has Endowed Me", ["Leah names Zebulun with the language of being endowed or honored.", "She still hopes Jacob will finally dwell with her because she has borne him sons.", "Her words are heartbreaking because her blessings have not erased her longing for love.", "She has children, but she still wants her husband to stay.", "Leah keeps interpreting births through the hope of being valued.", "Success in one area does not automatically heal rejection in another."]),
    phrase("👧 She Bore A Daughter", ["Dinah is named briefly here, but she will matter deeply later in Genesis.", "Her mention reminds us that the family is larger than the sons who become tribes.", "Genesis often plants names before their later significance becomes clear.", "Dinah's presence also keeps the family story personal, not just tribal.", "A single verse can prepare a future chapter.", "The Bible's family lists are not filler; they carry story threads forward."]),
    phrase("🕊️ God Remembered Rachel", ["This does not mean God had forgotten Rachel and then suddenly recalled her.", "In Genesis, when God remembers, He moves in faithful attention toward someone.", "Rachel's long pain is not invisible to Him.", "The timing has been hard, but the text says God listened and opened her womb.", "Remembrance in the Bible is active compassion, not mental recovery.", "Delay is not proof that God has lost sight of a person."]),
    phrase("👂 God Listened To Her", ["Rachel's story turns because God hears her, not because the mandrakes control the outcome.", "Genesis lets us see the difference between human attempts to manage pain and God's power to answer.", "Rachel is not saved by rivalry, bargaining, or household strategy.", "She receives a child because God acts.", "The same God who listened to Leah now listens to Rachel.", "God's mercy is not trapped inside the sisters' competition."]),
    phrase("➕ May Yahweh Add Another Son", ["Joseph's name carries both relief and longing.", "Rachel says God has taken away her reproach, but she also asks for another son.", "Even answered prayer does not always end every desire in the heart.", "Joseph will become one of the most important figures in Genesis.", "A baby born after long waiting becomes central to the next major movement of the story.", "God can answer a private sorrow in a way that later blesses far beyond one household."]),
  ] },
  { chapter: 30, startVerse: 25, endVerse: 30, reference: "Genesis 30:25-30", title: "Jacob Asks To Go Home", icon: "🏠", phrases: [
    phrase("🏠 Send Me Away", ["After Joseph is born, Jacob asks Laban to release him so he can return to his own place and country.", "The birth of Joseph marks a turning point in Jacob's sense of timing.", "He has wives, children, and years of service behind him.", "Now the promise land begins pulling on the story again.", "Jacob's life in Laban's house was never meant to be permanent.", "God can use a season of staying, but covenant direction eventually calls Jacob home."]),
    phrase("👨‍👩‍👧‍👦 My Wives And My Children", ["Jacob does not ask to leave alone.", "He asks for the family for whom he served Laban.", "This matters because Laban has benefited from Jacob's work and could treat the household as leverage.", "Jacob is naming responsibility for the people now attached to him.", "Leaving Laban is not only a personal move; it is a family move.", "Obedience often involves caring for the people God has placed in our charge."]),
    phrase("🧾 For Whom I Have Served Thee", ["Jacob frames his request around service already completed.", "He has worked many years under Laban's terms.", "The sentence carries both patience and pressure: Jacob has paid what was asked.", "Laban has no moral reason to keep squeezing more from him.", "Genesis is preparing us to see the unfairness in Laban's household.", "Faithful service does not mean a person should be endlessly exploited."]),
    phrase("🔍 I Have Learned By Experience", ["Laban admits that Jacob's presence has brought blessing to his house.", "He recognizes that the Lord has blessed him because of Jacob.", "But his response is not worshipful surrender; it becomes another negotiation.", "Laban sees the benefit and wants to keep it close.", "Laban can recognize blessing without becoming generous.", "Some people value what God brings through you while still trying to control you."]),
    phrase("📈 The LORD Hath Blessed Thee Since My Coming", ["Jacob also knows Laban's prosperity has increased through his labor.", "He is not bragging; he is stating the reality Laban already admitted.", "God's blessing on Jacob has spilled over into Laban's flocks.", "But now Jacob asks when he can provide for his own house.", "Blessing others does not cancel Jacob's responsibility to his family.", "There is a time to serve faithfully and a time to build what God has entrusted to you."]),
  ] },
  { chapter: 30, startVerse: 31, endVerse: 36, reference: "Genesis 30:31-36", title: "Jacob Names His Wages", icon: "🐐", phrases: [
    phrase("💰 What Shall I Give Thee", ["Laban asks about wages because he wants Jacob to stay.", "The question sounds generous, but Laban's history makes us cautious.", "He has already used family custom and labor terms to benefit himself.", "Jacob must answer wisely because this is not a simple friendship conversation.", "The negotiation happens inside a relationship marked by manipulation.", "When trust is thin, clear terms matter."]),
    phrase("🙅 Thou Shalt Not Give Me Any Thing", ["Jacob refuses a normal gift or direct payment from Laban.", "Instead, he proposes a system tied to the unusual animals in the flock.", "This reduces Laban's ability to claim he made Jacob rich by generosity.", "Jacob is trying to work in a way that leaves evidence in the animals themselves.", "Jacob wants wages that can be seen and separated.", "Wisdom sometimes means arranging work so manipulation has less room to hide."]),
    phrase("🐑 Speckled And Spotted", ["Jacob names the speckled, spotted, and dark animals as his wages.", "These would be visually distinct from the more common animals Laban keeps.", "The plan creates a built-in way to identify what belongs to Jacob.", "That matters in a house where Laban keeps changing terms.", "The marks on the animals become a kind of living receipt.", "Clear boundaries are important when dealing with someone who benefits from confusion."]),
    phrase("✅ So Shall My Righteousness Answer For Me", ["Jacob says the flock itself will testify whether he has acted honestly.", "He wants his integrity to be checkable, not merely claimed.", "This is important because Laban is suspicious and controlling.", "Jacob's answer says, let the evidence speak.", "Righteousness here is connected to honest handling of property.", "Faithfulness includes practical integrity in work, wages, and accountability."]),
    phrase("🧤 Laban Removed That Day", ["Laban immediately removes the marked animals and puts distance between them and Jacob.", "He is trying to tilt the agreement in his own favor before Jacob even begins.", "The move exposes Laban's heart more clearly than his polite words did.", "Jacob is left working with what looks like a weaker starting point.", "Unfair people may agree out loud while quietly protecting their own advantage.", "Genesis shows God can provide even when someone else stacks the terms against you."]),
  ] },
  { chapter: 30, startVerse: 37, endVerse: 39, reference: "Genesis 30:37-39", title: "Jacob Works The Flocks", icon: "🌳", phrases: [
    phrase("🌳 Jacob Took Him Rods", ["The peeled rods are one of the strangest details in this chapter.", "Jacob uses a breeding practice from his world, and the text reports it without pausing to explain the biology.", "The bigger point is not that readers should imitate the method.", "The bigger point is that Jacob is working inside Laban's unfair system while God is still able to increase him.", "Genesis often describes ancient practices without making them the main lesson.", "The story is about God's providence, not a farming manual."]),
    phrase("💧 Before The Flocks In The Gutters", ["Jacob places the rods where the flocks come to drink and breed.", "The scene shows him paying close attention to timing, animals, and conditions.", "Jacob is not passive; he works carefully and strategically.", "But Genesis 31 will make clear that God is the deeper reason Jacob prospers.", "Human diligence and divine provision are not enemies in this story.", "Trusting God does not mean refusing to work wisely."]),
  ] },
  { chapter: 30, startVerse: 40, endVerse: 43, reference: "Genesis 30:40-43", title: "Jacob's Flocks Increase", icon: "📈", phrases: [
    phrase("💪 The Stronger Cattle", ["Jacob separates the stronger animals from the weaker ones.", "The detail shows that he is building a durable flock, not merely collecting numbers.", "His wealth grows through attention, patience, and repeated practice.", "Laban's unfairness has not stopped Jacob's increase.", "God can bless Jacob through ordinary work rhythms over time.", "Provision often comes through repeated faithful labor, not only sudden miracles."]),
    phrase("🐑 The Feebler Were Laban's", ["The outcome reverses Laban's attempt to control the agreement.", "Laban tried to begin with the advantage, but Jacob's flocks keep strengthening.", "The text does not present Laban as the final power over Jacob's future.", "God's promise is stronger than Laban's strategy.", "The manipulator does not get the last word.", "Unfair systems are real, but they are not bigger than God's ability to provide."]),
    phrase("📈 The Man Increased Exceedingly", ["Jacob becomes very prosperous with flocks, servants, camels, and donkeys.", "This is a major turn from the lonely man who slept with a stone at Bethel.", "God promised to be with Jacob, and now we see evidence of preservation and provision.", "The increase also creates new tension with Laban's household.", "Blessing can bring pressure as well as relief.", "God's provision moves Jacob toward departure, not comfort under Laban forever."]),
  ] },
];

const day12Genesis30Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_12_GENESIS_30_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 30:1-6": [
    day12Genesis30Phrase("Give Me Children", ["Rachel's demand is raw pain spoken out loud.", "She has Jacob's love, but Leah has the children Rachel longs for.", "Genesis lets the reader feel how unmet longing can become pressure placed on another person."]),
    day12Genesis30Phrase("Or Else I Die", ["Rachel speaks as if life cannot continue without children.", "The sentence is not calm theology; it is despair talking.", "A beginner should feel the emotional weight of barrenness in this family world."]),
    day12Genesis30Phrase("Am I In God's Stead?", ["Jacob knows he cannot open Rachel's womb.", "The old wording means, am I in God's place?", "He says something true, but the harshness of the moment shows how helplessness can turn into anger."]),
    day12Genesis30Phrase("Bilhah My Maid", ["Rachel turns to her servant Bilhah as a household solution.", "This echoes Sarah and Hagar earlier in Genesis.", "The family repeats old patterns when pain feels unbearable."]),
    day12Genesis30Phrase("She Shall Bear Upon My Knees", ["This phrase describes a birth being counted into Rachel's household line.", "It shows an ancient custom that can confuse modern readers.", "Genesis records the custom while still letting us feel the emotional mess underneath it."]),
    day12Genesis30Phrase("I May Also Have Children By Her", ["Rachel wants Bilhah's child to answer her own grief.", "The child becomes part of a rivalry before he is even born.", "The promise family is growing, but the home is full of wounded desire."]),
    day12Genesis30Phrase("Dan", ["Dan's name is tied to Rachel's claim that God has judged and heard her.", "She receives the birth as an answer in the struggle with Leah.", "Even the names of the tribes are born inside family pain and prayer language."]),
  ],
  "Genesis 30:7-8": [
    day12Genesis30Phrase("Bilhah Conceived Again", ["Bilhah bears another son for Jacob.", "The family is growing, but through a painful arrangement created by rivalry.", "Genesis is honest about growth that happens inside broken household choices."]),
    day12Genesis30Phrase("Rachel Said", ["Rachel interprets the birth with her own words.", "The naming speeches reveal the heart of the family conflict.", "A baby is born, but the mother language around him is wrestling and competition."]),
    day12Genesis30Phrase("Great Wrestlings", ["Rachel describes her life with Leah as a hard contest.", "This is not a peaceful sisterhood; it is emotional combat inside one household.", "The phrase helps a beginner feel how rivalry has taken over the family story."]),
    day12Genesis30Phrase("I Have Wrestled With My Sister", ["Rachel names Leah as the person she is fighting against.", "The tragedy is that both sisters are wounded by the same broken marriage structure.", "Instead of healing, their pain keeps turning sideways toward each other."]),
    day12Genesis30Phrase("I Have Prevailed", ["Rachel believes this birth gives her a kind of victory.", "That shows how deeply the household has become a scoreboard.", "Genesis lets the reader see how comparison can twist even good gifts into proof of winning."]),
    day12Genesis30Phrase("Naphtali", ["Naphtali's name carries the memory of Rachel's wrestling.", "A future tribe begins with a name shaped by sisterly conflict.", "God can work through wounded beginnings without calling the wounds healthy."]),
  ],
  "Genesis 30:9-13": [
    day12Genesis30Phrase("Leah Left Bearing", ["Leah sees that her own childbearing has paused.", "Instead of rest, the pause becomes another trigger in the rivalry.", "The sisters keep responding to each other's moves."]),
    day12Genesis30Phrase("Zilpah Her Maid", ["Zilpah is drawn into Leah's side of the competition.", "Like Bilhah, she is a servant whose body becomes part of the household struggle.", "Genesis names her so readers remember she is not invisible."]),
    day12Genesis30Phrase("A Troop Cometh", ["Leah names Gad with language connected to fortune, troop, or increase.", "The phrase sounds like another gain in the family contest.", "Children are being received through the lens of rivalry."]),
    day12Genesis30Phrase("Gad", ["Gad's name preserves Leah's interpretation of the birth.", "Names in Genesis are little windows into the heart of the moment.", "This son carries a name born in the pressure between sisters."]),
    day12Genesis30Phrase("The Daughters Will Call Me Blessed", ["Leah longs for public recognition.", "She wants other women to look at her life and call her blessed.", "After years of feeling unwanted, being seen by others matters deeply to her."]),
    day12Genesis30Phrase("Asher", ["Asher's name is tied to happiness and blessing.", "The name sounds joyful, but the context is still complicated.", "Genesis often gives us joy and ache in the same sentence."]),
  ],
  "Genesis 30:14-18": [
    day12Genesis30Phrase("Mandrakes", ["Mandrakes were plants associated in the ancient world with fertility and desire.", "That is why Rachel wants them so badly.", "The object is small, but it carries huge emotional weight in a home desperate for children."]),
    day12Genesis30Phrase("Give Me, I Pray Thee", ["Rachel's request sounds polite, but it touches Leah's deepest wound.", "To Leah, Rachel already has Jacob's affection and now wants what Leah's son found.", "Small requests can feel large when old pain is underneath them."]),
    day12Genesis30Phrase("Thou Hast Taken My Husband", ["Leah speaks from years of feeling displaced in Jacob's heart.", "Even with children, she does not feel chosen.", "The sentence exposes how both sisters are hurting in different ways."]),
    day12Genesis30Phrase("He Shall Lie With Thee Tonight", ["Rachel trades a night with Jacob for the mandrakes.", "The marriage has become something negotiated between wounded sisters.", "Genesis records this plainly so we feel how damaged the household has become."]),
    day12Genesis30Phrase("God Hath Given Me My Hire", ["Leah names the birth as wages or hire from God.", "The language is tied to the bargain over Jacob and the mandrakes.", "Even blessing is being interpreted through the strange economy of this home."]),
    day12Genesis30Phrase("Issachar", ["Issachar's name is connected to reward or hire.", "The name preserves the story of bargaining, longing, and divine hearing.", "A future tribe begins inside a complicated family night."]),
  ],
  "Genesis 30:19-24": [
    day12Genesis30Phrase("Leah Conceived Again", ["Leah continues bearing sons in the household where she still longs for love.", "The births are real gifts, but they do not erase the ache under her words.", "Genesis keeps both mercy and pain in view."]),
    day12Genesis30Phrase("Zebulun", ["Zebulun's name is tied to honor or dwelling.", "Leah still hopes Jacob will finally dwell with her because she has borne him children.", "The name carries her longing to be valued."]),
    day12Genesis30Phrase("Afterwards She Bare A Daughter", ["Dinah is named briefly, but she will matter later in Genesis.", "This reminds readers that the family includes daughters too, even when the tribal focus is on sons.", "A short mention can prepare a future chapter."]),
    day12Genesis30Phrase("God Hearkened To Her", ["God listens to Rachel after long barrenness.", "The text shifts attention from rivalry and mandrakes to divine mercy.", "Rachel's answer comes because God hears, not because the household has figured out control."]),
    day12Genesis30Phrase("Opened Her Womb", ["This phrase shows God giving life where Rachel could not create it herself.", "Genesis has repeatedly shown that the promise family depends on God's power over the womb.", "The long ache finally turns into birth."]),
    day12Genesis30Phrase("Taken Away My Reproach", ["Rachel feels her shame lifted through Joseph's birth.", "In her world, childlessness carried public pain and private grief.", "God's mercy meets the place where she felt exposed and diminished."]),
    day12Genesis30Phrase("She Called His Name Joseph", ["Joseph's name carries both relief and request.", "Rachel rejoices that God has taken away reproach and asks the Lord to add another son.", "This child will become central to the rest of Genesis."]),
  ],
  "Genesis 30:25-30": [
    day12Genesis30Phrase("When Rachel Had Born Joseph", ["Joseph's birth becomes a turning point in Jacob's desire to return home.", "The arrival of this son changes the emotional timing of the story.", "Jacob begins looking back toward the land of promise."]),
    day12Genesis30Phrase("Mine Own Place", ["Jacob does not see Laban's house as his final home.", "He has lived there for years, but his identity is still tied to the promise land.", "The phrase carries homesickness and covenant direction together."]),
    day12Genesis30Phrase("Mine Own Country", ["Jacob wants to return to the land connected to Abraham and Isaac.", "This is not just personal preference.", "The covenant story is pulling him home."]),
    day12Genesis30Phrase("Appoint Me Thy Wages", ["Laban wants Jacob to stay, so he asks him to name wages.", "The question sounds generous, but Laban's history makes it dangerous.", "Jacob must negotiate with a man who benefits from keeping him close."]),
    day12Genesis30Phrase("I Have Learned By Experience", ["Laban admits he has recognized God's blessing through Jacob.", "The phrase suggests observation, calculation, or divination-like discernment.", "Laban sees the benefit of God's favor, but he wants to keep the benefit under his roof."]),
    day12Genesis30Phrase("Since My Coming", ["Jacob reminds Laban that the household increased after Jacob arrived.", "He is not bragging; he is naming the fruit of God's blessing on his labor.", "The years with Laban have produced visible increase."]),
  ],
  "Genesis 30:31-36": [
    day12Genesis30Phrase("What Shall I Give Thee?", ["Laban asks again about payment because he wants Jacob's labor to continue.", "The question creates the next agreement between them.", "In this family, wages are never just wages; they become the arena of trust and manipulation."]),
    day12Genesis30Phrase("Pass Through All Thy Flock", ["Jacob proposes a way to separate his wages from Laban's animals.", "The plan is visual and checkable.", "Marked animals will show what belongs to Jacob."]),
    day12Genesis30Phrase("All The Speckled And Spotted Cattle", ["The marked animals become Jacob's wages.", "These differences matter because they make ownership visible.", "In a house full of shifting terms, visible boundaries matter."]),
    day12Genesis30Phrase("Every Brown Cattle Among The Sheep", ["Jacob includes darker animals among the sheep as part of the agreement.", "A beginner may miss that color markings are the whole wage system here.", "The flock itself will become the record."]),
    day12Genesis30Phrase("Laban Said, Behold, I Would It Might Be According To Thy Word", ["Laban agrees quickly, but his next move shows he is still protecting himself.", "His words sound cooperative while his actions create disadvantage for Jacob.", "Genesis teaches readers to watch what people do after they agree."]),
    day12Genesis30Phrase("Set Three Days' Journey Betwixt Himself And Jacob", ["Laban creates distance between the marked animals and Jacob.", "That makes Jacob's starting point look weaker.", "The agreement begins with Laban already tilting the field."]),
  ],
  "Genesis 30:37-39": [
    day12Genesis30Phrase("Green Poplar", ["Jacob uses fresh rods from trees in his flock strategy.", "The detail feels strange to modern readers because it comes from ancient shepherding practice.", "Genesis reports the method, but the larger story will point to God's provision."]),
    day12Genesis30Phrase("Hazel And Chestnut Tree", ["The tree names make the scene concrete and earthy.", "Jacob is working with ordinary materials in the field.", "The Bible's promise story often moves through practical labor, not only altar moments."]),
    day12Genesis30Phrase("Pilled White Strakes", ["Pilled means peeled, and strakes are streaks or stripes.", "Jacob peels the rods so white streaks show.", "The phrase explains why the rods visually match the streaked animals he hopes to receive."]),
    day12Genesis30Phrase("Made The White Appear", ["Jacob exposes the lighter wood under the bark.", "The image matters because this whole wage arrangement is about visible markings.", "The scene is strange, but it is deeply tied to what can be seen in the flock."]),
    day12Genesis30Phrase("Set The Rods Before The Flocks", ["Jacob places the rods where the animals come together.", "He is deliberate, observant, and strategic.", "The story does not present him as passive under Laban's unfairness."]),
    day12Genesis30Phrase("In The Gutters", ["Gutters are channels or troughs where the flocks drank.", "The setting is the working place of shepherd life.", "Jacob's increase happens around water, animals, timing, and daily labor."]),
    day12Genesis30Phrase("Watering Troughs", ["The watering troughs are where the flocks gather and breed.", "A beginner should see this as the practical center of the method.", "God's provision is going to work through the ordinary rhythms of the flock."]),
    day12Genesis30Phrase("The Flocks Conceived", ["The animals breed in the setting Jacob has arranged.", "Genesis 31 will make clear that God is the deeper reason Jacob prospers.", "Human strategy is present, but God's rule is not absent."]),
    day12Genesis30Phrase("Ringstraked", ["Ringstraked means streaked or striped.", "The word is old and easy to skip.", "It describes the marked animals that will count as Jacob's wages."]),
    day12Genesis30Phrase("Spotted", ["Spotted animals have visible marks that separate them from the plain-colored flock.", "That matters because the marks prove ownership under the agreement.", "The animals carry the evidence of God's provision under unfair terms."]),
  ],
  "Genesis 30:40-43": [
    day12Genesis30Phrase("Jacob Did Separate The Lambs", ["Jacob keeps his growing flock distinct from Laban's.", "Separation protects the agreement from confusion.", "The man who has lived under manipulation is learning to create visible boundaries."]),
    day12Genesis30Phrase("Faces Of The Flocks", ["The phrase describes how Jacob positions the animals before the marked ones.", "The scene is visual and practical.", "Jacob is carefully managing what happens in the flocks."]),
    day12Genesis30Phrase("His Own Flocks", ["Jacob finally has flocks that are clearly his.", "This matters after years of serving another man's house.", "God is building Jacob's household for the return journey."]),
    day12Genesis30Phrase("The Feebler Were Laban's", ["The weaker animals remain with Laban.", "The outcome reverses Laban's attempt to keep advantage.", "The manipulator does not control the final result."]),
    day12Genesis30Phrase("The Stronger Jacob's", ["Jacob's flock becomes stronger despite Laban's stacked arrangement.", "The story is preparing us to hear Jacob say God saw and provided.", "Blessing grows under pressure."]),
    day12Genesis30Phrase("Maidservants, And Menservants", ["Jacob's household now includes servants along with animals.", "His wealth has become a whole traveling camp.", "The lonely man from Bethel is being prepared to return with a large family and household."]),
    day12Genesis30Phrase("Camels, And Asses", ["Camels and donkeys show the scale of Jacob's increase.", "These animals matter for movement, work, and wealth.", "God's provision is becoming visible enough to provoke Genesis 31's conflict."]),
  ],
};

function deepenDay12Genesis30PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  const additions = DAY_12_GENESIS_30_REAL_PHRASE_ADDITIONS[section.reference] ?? [];
  return {
    ...section,
    phrases: [...section.phrases, ...additions],
  };
}

export const GENESIS_21_30_PERSONAL_SECTIONS = formatGenesisTwentyOneToThirtySectionExplanations(
  addGenesisTwentyOneToThirtySectionTexture([
    ...DAY_9_FINAL_SECTIONS,
    ...DAY_10_FINAL_SECTIONS.map(deepenDay10PhraseCards),
    ...DAY_11_FINAL_SECTIONS.map(deepenDay11PhraseCards),
    ...DAY_12_GENESIS_30_FINAL_SECTIONS.map(deepenDay12Genesis30PhraseCards),
    ...expandSplitSections(GENESIS_25_30_PERSONAL_SECTIONS),
  ]),
);
