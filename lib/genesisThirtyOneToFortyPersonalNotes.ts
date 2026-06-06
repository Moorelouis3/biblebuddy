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
};

const SECTION_SPLITS: Record<string, PersonalSectionSplit[]> = {
  "Genesis 31:10-21": [
    { startVerse: 10, endVerse: 16, reference: "Genesis 31:10-16", title: "God Shows Jacob What Laban Has Done", phraseIndexes: [0, 1] },
    { startVerse: 17, endVerse: 21, reference: "Genesis 31:17-21", title: "Jacob Leaves Secretly", phraseIndexes: [2] },
  ],
  "Genesis 31:22-32": [
    { startVerse: 22, endVerse: 29, reference: "Genesis 31:22-29", title: "God Warns Laban In A Dream", phraseIndexes: [0, 1] },
    { startVerse: 30, endVerse: 32, reference: "Genesis 31:30-32", title: "Laban Accuses Jacob", phraseIndexes: [2] },
  ],
  "Genesis 31:43-55": [
    { startVerse: 43, endVerse: 50, reference: "Genesis 31:43-50", title: "Laban And Jacob Set A Boundary", phraseIndexes: [0, 1] },
    { startVerse: 51, endVerse: 55, reference: "Genesis 31:51-55", title: "The Covenant At Mizpah", phraseIndexes: [2] },
  ],
  "Genesis 32:9-21": [
    { startVerse: 9, endVerse: 12, reference: "Genesis 32:9-12", title: "Jacob Prays In Fear", phraseIndexes: [0, 1] },
    { startVerse: 13, endVerse: 21, reference: "Genesis 32:13-21", title: "Jacob Sends Gifts To Esau", phraseIndexes: [2] },
  ],
  "Genesis 32:22-32": [
    { startVerse: 22, endVerse: 25, reference: "Genesis 32:22-25", title: "Jacob Wrestles Through The Night", phraseIndexes: [0, 1] },
    { startVerse: 26, endVerse: 32, reference: "Genesis 32:26-32", title: "Jacob Is Renamed Israel", phraseIndexes: [2, 3] },
  ],
  "Genesis 33:1-11": [
    { startVerse: 1, endVerse: 7, reference: "Genesis 33:1-7", title: "Jacob Comes Low Before Esau", phraseIndexes: [0] },
    { startVerse: 8, endVerse: 11, reference: "Genesis 33:8-11", title: "Esau Receives Jacob", phraseIndexes: [1, 2] },
  ],
  "Genesis 34:18-31": [
    { startVerse: 18, endVerse: 24, reference: "Genesis 34:18-24", title: "Shechem's City Agrees", phraseIndexes: [0] },
    { startVerse: 25, endVerse: 31, reference: "Genesis 34:25-31", title: "Simeon And Levi Take Revenge", phraseIndexes: [1, 2] },
  ],
  "Genesis 35:16-29": [
    { startVerse: 16, endVerse: 22, reference: "Genesis 35:16-22", title: "Rachel Dies Giving Birth", phraseIndexes: [0, 1, 2] },
    { startVerse: 23, endVerse: 29, reference: "Genesis 35:23-29", title: "Jacob's Sons And Isaac's Death", phraseIndexes: [2] },
  ],
  "Genesis 36:31-43": [
    { startVerse: 31, endVerse: 39, reference: "Genesis 36:31-39", title: "Kings In Edom", phraseIndexes: [0] },
    { startVerse: 40, endVerse: 43, reference: "Genesis 36:40-43", title: "The Chiefs Of Edom", phraseIndexes: [1] },
  ],
  "Genesis 36:9-19": [
    { startVerse: 9, endVerse: 14, reference: "Genesis 36:9-14", title: "Esau's Sons In Seir", phraseIndexes: [0] },
    { startVerse: 15, endVerse: 19, reference: "Genesis 36:15-19", title: "The Chiefs Of Esau", phraseIndexes: [1] },
  ],
  "Genesis 36:20-30": [
    { startVerse: 20, endVerse: 25, reference: "Genesis 36:20-25", title: "The Sons Of Seir", phraseIndexes: [0] },
    { startVerse: 26, endVerse: 30, reference: "Genesis 36:26-30", title: "The Horite Chiefs", phraseIndexes: [1] },
  ],
  "Genesis 37:12-24": [
    { startVerse: 12, endVerse: 17, reference: "Genesis 37:12-17", title: "Joseph Searches For His Brothers", phraseIndexes: [0] },
    { startVerse: 18, endVerse: 24, reference: "Genesis 37:18-24", title: "Joseph Is Thrown Into The Pit", phraseIndexes: [1, 2] },
  ],
  "Genesis 37:25-36": [
    { startVerse: 25, endVerse: 30, reference: "Genesis 37:25-30", title: "Joseph Is Sold", phraseIndexes: [0, 1] },
    { startVerse: 31, endVerse: 36, reference: "Genesis 37:31-36", title: "Jacob Is Deceived", phraseIndexes: [2] },
  ],
  "Genesis 38:1-11": [
    { startVerse: 1, endVerse: 5, reference: "Genesis 38:1-5", title: "Judah Separates From His Brothers", phraseIndexes: [0] },
    { startVerse: 6, endVerse: 11, reference: "Genesis 38:6-11", title: "Tamar Is Left Waiting", phraseIndexes: [1, 2] },
  ],
  "Genesis 38:12-23": [
    { startVerse: 12, endVerse: 18, reference: "Genesis 38:12-18", title: "Tamar Takes Judah's Pledge", phraseIndexes: [0, 1] },
    { startVerse: 19, endVerse: 23, reference: "Genesis 38:19-23", title: "Judah Tries To Recover The Pledge", phraseIndexes: [2] },
  ],
  "Genesis 39:7-18": [
    { startVerse: 7, endVerse: 12, reference: "Genesis 39:7-12", title: "Joseph Refuses Potiphar's Wife", phraseIndexes: [0, 1, 2] },
    { startVerse: 13, endVerse: 18, reference: "Genesis 39:13-18", title: "Joseph Is Falsely Accused", phraseIndexes: [2] },
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

const GENESIS_31_40_TEXTURE_RULES: PersonalTextureRule[] = [
  {
    matches: ["laban's sons", "laban's countenance", "god of bethel", "stole away"],
    lines: [
      "Feel the pressure building around Jacob:",
      "👂 Accusations in the household.",
      "😠 Laban's face changing.",
      "📍 God reminding Jacob of Bethel.",
      "🏃 A secret departure.",
      "The leaving is messy, but God is still moving Jacob back toward the promise.",
    ],
  },
  {
    matches: ["mizpah", "heap", "pillar", "god judge"],
    lines: [
      "The covenant with Laban is not warm and cozy:",
      "🪨 Stones mark the boundary.",
      "👀 God is called as witness.",
      "🚧 The men agree not to cross for harm.",
      "🤝 Peace is made, but trust is thin.",
      "Genesis lets reconciliation be honest when a relationship still needs distance.",
    ],
  },
  {
    matches: ["deliver me", "two bands", "face of esau", "appease"],
    lines: [
      "Jacob's fear is doing several things at once:",
      "🙏 He prays.",
      "📦 He plans.",
      "🎁 He sends gifts.",
      "😰 He imagines Esau's anger.",
      "Faith is not shown here as numb courage. Jacob is scared, and he brings that fear into God's promise.",
    ],
  },
  {
    matches: ["wrestled", "let me go", "israel", "peniel"],
    lines: [
      "The night at Jabbok changes Jacob:",
      "🌙 Alone in the dark.",
      "🤼 Wrestling until daybreak.",
      "🦴 A wounded thigh.",
      "🪪 A new name.",
      "🌅 A new limp in the morning.",
      "Jacob leaves blessed, but he does not leave untouched.",
    ],
  },
  {
    matches: ["bowed himself", "ran to meet", "face of god", "succoth"],
    lines: [
      "The reunion with Esau carries real relief:",
      "🙇 Jacob comes low.",
      "🏃 Esau runs forward.",
      "😭 The brothers weep.",
      "🎁 The gift is received.",
      "The story does not erase the past, but it shows mercy can meet people after years of fear.",
    ],
  },
  {
    matches: ["dinah", "shechem", "simeon and levi", "troubled me"],
    lines: [
      "Genesis 34 is heavy and should be read carefully:",
      "💔 Dinah is violated.",
      "🗣️ Men negotiate around her.",
      "⚔️ Simeon and Levi answer with violence.",
      "🏚️ A whole city is devastated.",
      "The chapter is not asking us to admire the chaos. It is showing how sin spreads damage through families and communities.",
    ],
  },
  {
    matches: ["bethel", "strange gods", "elbethel", "benoni", "benjamin"],
    lines: [
      "Genesis 35 feels like return and loss braided together:",
      "🧹 Idols are buried.",
      "📍 Bethel is revisited.",
      "📣 God repeats the name Israel.",
      "😭 Rachel dies.",
      "👶 Benjamin is born.",
      "The promise continues, but not without grief along the road.",
    ],
  },
  {
    matches: ["esau is edom", "dukes", "chiefs", "kings"],
    lines: [
      "Do not let the genealogy blur past you:",
      "🏔️ Esau has a land.",
      "👨‍👩‍👦 His family grows.",
      "👑 Chiefs and kings arise.",
      "🧭 Edom becomes a real neighbor in Israel's story.",
      "Genesis is tracking more than Jacob's line; it is showing how related nations take shape around the promise family.",
    ],
  },
  {
    matches: ["coat", "dream", "pit", "sold", "many colours"],
    lines: [
      "Joseph's fall happens through family sin, not random tragedy:",
      "🎽 A coat marks favoritism.",
      "💤 Dreams stir hatred.",
      "🕳️ A pit hides violence.",
      "💰 Silver changes hands.",
      "💔 Jacob is deceived by his own sons.",
      "The chosen family is still deeply broken, and God will work without pretending it is clean.",
    ],
  },
  {
    matches: ["tamar", "pledge", "more righteous", "judah"],
    lines: [
      "Judah's chapter exposes what everyone would rather hide:",
      "🚶 Judah separates from his brothers.",
      "⏳ Tamar is left waiting.",
      "🧾 A pledge becomes evidence.",
      "⚖️ Judah is forced to confess.",
      "Genesis is not sanitizing the family line. It is showing truth breaking through hypocrisy.",
    ],
  },
  {
    matches: ["lord was with joseph", "potiphar", "sin against god", "prison", "butler"],
    lines: [
      "Joseph's integrity is tested in places he did not choose:",
      "🏠 Faithful in Potiphar's house.",
      "🚪 Running from temptation.",
      "⛓️ Falsely imprisoned.",
      "🧠 Interpreting dreams.",
      "😔 Forgotten by the butler.",
      "The Lord being with Joseph does not mean the path is easy. It means Joseph is not abandoned on it.",
    ],
  },
];

function addGenesisThirtyOneToFortyTexture(title: string, content: string) {
  const lower = title.toLowerCase();
  const rule = GENESIS_31_40_TEXTURE_RULES.find((item) => item.matches.some((match) => lower.includes(match)));

  if (!rule) {
    return content;
  }

  return `${content}\n\n${note(rule.lines)}`;
}

function addGenesisThirtyOneToFortySectionTexture(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [title, addGenesisThirtyOneToFortyTexture(title, content)] as [string, string]),
  }));
}

const RAW_GENESIS_31_40_PERSONAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 31,
    startVerse: 1,
    endVerse: 9,
    reference: "Genesis 31:1-9",
    title: "Jacob Knows It Is Time To Leave",
    icon: "🏠",
    phrases: [
      [
        "👂 Jacob Heard The Words Of Laban's Sons",
        note([
          "Jacob hears Laban's sons accusing him of taking what belonged to their father.",
          "That matters because the mood around Jacob has changed.",
          "For years Laban benefited from Jacob's work, but now Jacob's success creates resentment.",
          "The family conflict is not hidden anymore.",
          "Jacob realizes he is no longer welcome in the same way.",
          "This is the pressure that begins pushing him back toward the land God promised.",
        ]),
      ],
      [
        "😠 Laban's Countenance Was Not Toward Him",
        note([
          "Countenance means face, mood, or attitude.",
          "Jacob can read Laban's face and knows something is different.",
          "Sometimes the Bible explains tension by showing the look on someone's face.",
          "Laban may not have said everything out loud yet, but his attitude is visible.",
          "Jacob is living in a household where trust has broken down.",
          "That makes God's next command even more important.",
        ]),
      ],
      [
        "🧭 Return Unto The Land Of Thy Fathers",
        note([
          "God tells Jacob to go back home.",
          "This connects directly to the promise God gave him at Bethel.",
          "Jacob was never meant to stay in Laban's house forever.",
          "The land of his fathers is Canaan, the land tied to Abraham, Isaac, and the covenant promise.",
          "God is moving Jacob out of survival mode and back toward his calling.",
          "The journey home begins because God speaks.",
        ]),
      ],
    ],
  },
  {
    chapter: 31,
    startVerse: 10,
    endVerse: 21,
    reference: "Genesis 31:10-21",
    title: "Jacob Leaves With His Household",
    icon: "🐑",
    phrases: [
      [
        "👁️ I Have Seen All That Laban Doeth",
        note([
          "God tells Jacob that He has seen Laban's treatment of him.",
          "This matters because Jacob has been cheated and controlled for years.",
          "Laban changed his wages again and again, but God was not blind to it.",
          "The phrase reminds the reader that injustice may feel unseen by people, but it is not unseen by God.",
          "Jacob's increase was not because Laban was generous.",
          "It was because God protected him.",
        ]),
      ],
      [
        "📍 I Am The God Of Bethel",
        note([
          "God identifies Himself by the place where He met Jacob years earlier.",
          "Bethel was where Jacob saw the ladder, heard the promise, and vowed to follow the Lord.",
          "Now God reminds him of that moment.",
          "This is personal, not generic.",
          "God is saying, in effect, 'I am the same God who met you when you were alone and afraid.'",
          "The promise from Bethel is still guiding Jacob's life.",
        ]),
      ],
      [
        "🏃 Jacob Stole Away Unawares",
        note([
          "Jacob leaves without telling Laban.",
          "The wording shows secrecy and fear.",
          "Jacob has good reason to leave, but the way he leaves still reflects the tension and mistrust in the household.",
          "He has spent years dealing with a manipulator, and now he chooses escape over confrontation.",
          "Genesis does not clean up the family drama.",
          "It shows how messy the journey home becomes.",
        ]),
      ],
    ],
  },
  {
    chapter: 31,
    startVerse: 22,
    endVerse: 32,
    reference: "Genesis 31:22-32",
    title: "Laban Chases Jacob",
    icon: "⚠️",
    phrases: [
      [
        "🏃 Laban Pursued After Him",
        note([
          "Laban chases Jacob for seven days.",
          "This shows how serious the situation has become.",
          "Jacob is not simply moving away peacefully; he is fleeing a powerful relative who feels wronged.",
          "The pursuit creates danger for Jacob's whole household.",
          "But before Laban reaches him, God intervenes.",
          "The promise family is vulnerable, but not abandoned.",
        ]),
      ],
      [
        "🌙 God Came To Laban In A Dream",
        note([
          "God warns Laban before he confronts Jacob.",
          "This is important because Laban is not the covenant heir, but God still speaks to restrain him.",
          "God protects Jacob by limiting what Laban can do.",
          "The dream shows that God can step into the plans of people who might harm His people.",
          "Laban may have power, anger, and a pursuing group.",
          "But God has authority over the encounter.",
        ]),
      ],
      [
        "🧳 Wherefore Hast Thou Stolen My Gods?",
        note([
          "Laban accuses Jacob of stealing his household gods.",
          "Rachel has secretly taken them, but Jacob does not know it.",
          "These household gods may have been connected to family religion, inheritance claims, or household protection.",
          "The accusation adds spiritual and family tension to the escape story.",
          "Jacob is leaving the house of Laban, but Laban's idols are still being dragged into the journey.",
          "The promised family still has things to leave behind.",
        ]),
      ],
    ],
  },
  {
    chapter: 31,
    startVerse: 33,
    endVerse: 42,
    reference: "Genesis 31:33-42",
    title: "Jacob Finally Speaks",
    icon: "🗣️",
    phrases: [
      [
        "🙈 Rachel Had Taken The Images",
        note([
          "Rachel hides the household gods from Laban.",
          "This is a troubling detail because Rachel belongs to Jacob's household now, yet she is still carrying objects from Laban's world.",
          "Genesis is honest about how hard it can be to fully leave an old household behind.",
          "The covenant family is moving toward Canaan, but not every heart issue is settled.",
          "Rachel's action also creates danger because Jacob has unknowingly spoken a death sentence over the thief.",
          "The escape is protected by God, but still full of human weakness.",
        ]),
      ],
      [
        "😤 What Is My Trespass?",
        note([
          "Jacob finally confronts Laban after years of being mistreated.",
          "He asks what wrong Laban can actually prove.",
          "This moment matters because Jacob has spent much of his life avoiding direct conflict.",
          "Now he speaks openly about the injustice he has endured.",
          "He names the long labor, the changed wages, and the way Laban used him.",
          "The deceiver has also been deceived, and he knows the pain of it.",
        ]),
      ],
      [
        "🛡️ The God Of My Father Hath Been With Me",
        note([
          "Jacob gives God credit for his survival and prosperity.",
          "He knows Laban would have sent him away empty if God had not protected him.",
          "This is a major growth moment for Jacob.",
          "He is not only talking about his cleverness or hard work.",
          "He recognizes that God's presence is the reason he still has a future.",
          "The promise has been guarded by God through years of unfair treatment.",
        ]),
      ],
    ],
  },
  {
    chapter: 31,
    startVerse: 43,
    endVerse: 55,
    reference: "Genesis 31:43-55",
    title: "Jacob And Laban Make A Covenant",
    icon: "🤝",
    phrases: [
      [
        "🪨 This Heap Be Witness",
        note([
          "Jacob and Laban set up stones as a witness between them.",
          "In the ancient world, physical markers helped people remember agreements.",
          "The heap is not decoration.",
          "It is a boundary marker and a testimony that both men made promises there.",
          "This matters because trust between them is low.",
          "The stones stand as a visible reminder when personal trust is not enough.",
        ]),
      ],
      [
        "👁️ The Lord Watch Between Me And Thee",
        note([
          "People often quote this phrase like it is sweet and sentimental.",
          "In context, it is more serious than that.",
          "Laban and Jacob do not fully trust each other, so they call on God to watch them when they are apart.",
          "It is a covenant warning, not just a friendship blessing.",
          "They are asking God to be the witness neither of them can escape.",
          "The phrase matters because God sees what people do when no one else is watching.",
        ]),
      ],
      [
        "📍 Mizpah",
        note([
          "Mizpah means watchtower or lookout.",
          "The name fits the agreement because God is being called to watch between Jacob and Laban.",
          "This place marks the end of Jacob's years under Laban's control.",
          "The relationship is not healed into warm friendship, but a boundary is established.",
          "Jacob can now move forward toward Canaan.",
          "Sometimes leaving well means setting a clear boundary before continuing the journey.",
        ]),
      ],
    ],
  },
  {
    chapter: 32,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 32:1-8",
    title: "Jacob Prepares To Meet Esau",
    icon: "😨",
    phrases: [
      [
        "👼 The Angels Of God Met Him",
        note([
          "Jacob meets angels as he returns toward the land.",
          "This reminds us of Bethel, where he saw angels moving between heaven and earth.",
          "God is quietly showing Jacob that he is not alone on the road home.",
          "That matters because Jacob is about to face Esau, the brother he wronged.",
          "Fear is rising, but heaven is also present.",
          "God's protection surrounds the journey before the danger is resolved.",
        ]),
      ],
      [
        "📍 Mahanaim",
        note([
          "Mahanaim means two camps.",
          "Jacob names the place after recognizing God's camp around him.",
          "Later in the chapter, Jacob divides his own people into two camps out of fear.",
          "That contrast matters.",
          "God's camp is present, but Jacob still struggles to feel safe.",
          "The name reminds the reader that Jacob's fear is happening under God's unseen protection.",
        ]),
      ],
      [
        "⚔️ Four Hundred Men With Him",
        note([
          "Esau coming with four hundred men sounds threatening.",
          "Jacob has every reason to remember how he left home: Esau wanted to kill him.",
          "The number creates tension because it feels like a military force.",
          "Jacob does not know whether Esau is coming for peace or revenge.",
          "This is the past catching up with him.",
          "Before Jacob can fully return home, he has to face the brother he deceived.",
        ]),
      ],
    ],
  },
  {
    chapter: 32,
    startVerse: 9,
    endVerse: 21,
    reference: "Genesis 32:9-21",
    title: "Jacob Prays And Sends Gifts",
    icon: "🙏",
    phrases: [
      [
        "🙏 O God Of My Father Abraham",
        note([
          "Jacob prays by appealing to the God of Abraham and Isaac.",
          "He is not inventing a new god for the crisis.",
          "He is calling on the God of the covenant promise.",
          "This matters because fear pushes Jacob toward prayer.",
          "He reminds God of what He already said: return to your country, and I will deal well with you.",
          "Jacob's prayer is rooted in God's promise, not in Jacob's confidence.",
        ]),
      ],
      [
        "🤲 I Am Not Worthy",
        note([
          "Jacob admits he is not worthy of all God's mercy and faithfulness.",
          "This is a very different tone from the younger Jacob who grasped and schemed for blessing.",
          "He remembers crossing the Jordan with only his staff.",
          "Now he returns with a large household.",
          "The phrase shows humility growing in Jacob.",
          "He knows his life is bigger than what he deserved.",
        ]),
      ],
      [
        "🎁 A Present For Esau",
        note([
          "Jacob sends gifts ahead of him to Esau.",
          "The gifts are meant to soften Esau's anger and show humility.",
          "This is not only strategy; it is also Jacob acknowledging the damage between them.",
          "He once took from Esau, and now he sends abundance toward him.",
          "The action cannot erase the past, but it shows Jacob trying to approach differently.",
          "Reconciliation often requires humility before it requires explanation.",
        ]),
      ],
    ],
  },
  {
    chapter: 32,
    startVerse: 22,
    endVerse: 32,
    reference: "Genesis 32:22-32",
    title: "Jacob Wrestles With God",
    icon: "🤼",
    phrases: [
      [
        "🌙 Jacob Was Left Alone",
        note([
          "Jacob is alone at night before meeting Esau.",
          "This is more than a travel detail.",
          "The man who spent his life surrounded by schemes, family tension, flocks, and plans is now isolated.",
          "Before he faces his brother, he has to face God.",
          "The quiet night becomes the place where Jacob's identity is confronted.",
          "Sometimes God deals with a person privately before they walk into a public moment.",
        ]),
      ],
      [
        "🤼 There Wrestled A Man With Him",
        note([
          "The text says a man wrestles with Jacob, but the rest of the passage shows this is no ordinary man.",
          "Jacob later says he has seen God face to face.",
          "This mysterious encounter is one of the most important moments in his life.",
          "Jacob has wrestled people for years through grasping and deception.",
          "Now he wrestles with God Himself.",
          "The struggle becomes the turning point where Jacob is changed.",
        ]),
      ],
      [
        "🆕 Thy Name Shall Be Called No More Jacob, But Israel",
        note([
          "Jacob's name is changed to Israel.",
          "Jacob's old name carried the idea of grasping or supplanting.",
          "Israel is connected with striving or struggling with God.",
          "This does not mean Jacob becomes instantly perfect.",
          "It means God marks him with a new identity after the struggle.",
          "The nation of Israel will carry the name of a man who wrestled, limped, and was blessed by God.",
        ]),
      ],
      [
        "🦵 He Halted Upon His Thigh",
        note([
          "Jacob leaves the encounter with a limp.",
          "That is important because the blessing does not make him look stronger in the usual way.",
          "He receives a new name, but also a lasting weakness.",
          "The limp becomes a reminder that Jacob did not win by overpowering God.",
          "He was touched, humbled, and changed.",
          "From this point forward, Jacob walks differently because of the night he met God.",
        ]),
      ],
    ],
  },
  {
    chapter: 33,
    startVerse: 1,
    endVerse: 11,
    reference: "Genesis 33:1-11",
    title: "Jacob And Esau Meet Again",
    icon: "🤝",
    phrases: [
      [
        "🙇 Bowed Himself To The Ground Seven Times",
        note([
          "Jacob approaches Esau with deep humility.",
          "Bowing seven times was a strong sign of submission and respect.",
          "This is very different from the younger Jacob who took what belonged to Esau.",
          "Jacob is not coming with arguments first.",
          "He is coming low, hoping for mercy.",
          "The posture of his body shows the change in his approach.",
        ]),
      ],
      [
        "😭 Esau Ran To Meet Him",
        note([
          "Esau's response is surprising after all the fear built up in the story.",
          "He runs, embraces Jacob, kisses him, and weeps.",
          "Jacob expected danger, but he receives mercy.",
          "This does not erase everything that happened in the past.",
          "But it shows a moment of grace between brothers who had been separated by betrayal.",
          "Genesis lets us feel the relief of reconciliation.",
        ]),
      ],
      [
        "👁️ I Have Seen Thy Face, As Though I Had Seen The Face Of God",
        note([
          "Jacob connects Esau's welcome with the mercy of God.",
          "After seeing God's face at Peniel, he now sees forgiveness on his brother's face.",
          "That is a powerful connection.",
          "Jacob feared judgment, but Esau receives him kindly.",
          "The phrase shows how human reconciliation can feel like a reflection of God's mercy.",
          "Jacob is learning that grace can meet him where he expected revenge.",
        ]),
      ],
    ],
  },
  {
    chapter: 33,
    startVerse: 12,
    endVerse: 20,
    reference: "Genesis 33:12-20",
    title: "Jacob Settles Near Shechem",
    icon: "⛺",
    phrases: [
      [
        "🐑 The Flocks And Herds With Young Are With Me",
        note([
          "Jacob explains that his household cannot move at Esau's speed.",
          "He has children, nursing animals, and a large vulnerable camp.",
          "This detail reminds us that Jacob is now responsible for many lives.",
          "He is not the single man who left home with only a staff.",
          "God has made him into a household.",
          "His pace must now account for the weak and dependent.",
        ]),
      ],
      [
        "📍 Jacob Came To Shalem",
        note([
          "Jacob arrives safely near Shechem in Canaan.",
          "This matters because God promised to bring him back.",
          "The return is not just geography.",
          "It is promise fulfilled after years of exile, labor, fear, and conflict.",
          "Jacob is back in the land, but the story is not finished.",
          "Being in the right place does not mean every danger is gone.",
        ]),
      ],
      [
        "⛪ El-Elohe-Israel",
        note([
          "Jacob builds an altar and names it El-Elohe-Israel, meaning God, the God of Israel.",
          "This is a major moment because Jacob uses his new name.",
          "He is worshiping the God who met him, renamed him, and brought him home.",
          "The altar marks gratitude and identity.",
          "Jacob is not only back in the land.",
          "He is beginning to live under the name God gave him.",
        ]),
      ],
    ],
  },
  {
    chapter: 34,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 34:1-7",
    title: "Dinah Is Violated",
    icon: "💔",
    phrases: [
      [
        "💔 He Took Her, And Lay With Her, And Defiled Her",
        note([
          "This phrase describes violence done to Dinah.",
          "The Bible does not treat it as romance or a harmless relationship.",
          "The word defiled shows that something deeply wrong has happened.",
          "Dinah is the person harmed, even though much of the chapter focuses on the men responding around her.",
          "This is one of the painful stories where Genesis shows the danger and brokenness outside Eden.",
          "The reader should not rush past Dinah's suffering.",
        ]),
      ],
      [
        "😶 Jacob Held His Peace",
        note([
          "Jacob stays silent until his sons return.",
          "That silence feels heavy.",
          "The text does not fully explain his reason, but the reader can feel the tension.",
          "Dinah has been harmed, and the household must decide how to respond.",
          "Jacob's quietness contrasts with the anger of his sons.",
          "Genesis is setting up a conflict between passivity, outrage, and revenge.",
        ]),
      ],
      [
        "🔥 The Men Were Grieved, And They Were Very Wroth",
        note([
          "Dinah's brothers are deeply grieved and furious.",
          "Their anger is understandable because a terrible wrong has been done.",
          "But the chapter will show that anger can move in a destructive direction.",
          "Being right to be upset does not mean every response is righteous.",
          "The brothers will use covenant language as a weapon.",
          "Genesis forces us to sit with both the evil done to Dinah and the danger of revenge.",
        ]),
      ],
    ],
  },
  {
    chapter: 34,
    startVerse: 8,
    endVerse: 17,
    reference: "Genesis 34:8-17",
    title: "A Deceptive Marriage Offer",
    icon: "🎭",
    phrases: [
      [
        "💍 Make Ye Marriages With Us",
        note([
          "Hamor proposes joining the families through marriage and trade.",
          "On the surface, it sounds like a peaceful agreement.",
          "But it comes after Dinah has already been violated.",
          "That matters because the proposal tries to move quickly from harm to arrangement without true justice.",
          "The offer is not simply about love.",
          "It is about absorbing Jacob's family into Shechem's city.",
        ]),
      ],
      [
        "🎭 The Sons Of Jacob Answered Deceitfully",
        note([
          "Jacob's sons answer with deception.",
          "This is important because deception keeps showing up in Jacob's family line.",
          "Jacob deceived Isaac, Laban deceived Jacob, Rachel hid the gods, and now the sons deceive Shechem.",
          "The family of promise is still carrying patterns of manipulation.",
          "Their anger may have a real cause, but their method is dangerous.",
          "Genesis is showing that pain can become sin when revenge takes over.",
        ]),
      ],
      [
        "✂️ Except Ye Be Circumcised",
        note([
          "Circumcision was the covenant sign God gave Abraham's family.",
          "Jacob's sons use that holy sign as part of a trap.",
          "That is deeply disturbing.",
          "Something meant to mark covenant relationship with God is being used as a tool for revenge.",
          "This shows how religious language can be twisted when the heart is ruled by anger.",
          "The problem is not the covenant sign; the problem is how they misuse it.",
        ]),
      ],
    ],
  },
  {
    chapter: 34,
    startVerse: 18,
    endVerse: 31,
    reference: "Genesis 34:18-31",
    title: "Simeon And Levi Take Revenge",
    icon: "⚔️",
    phrases: [
      [
        "🏙️ Shall Not Their Cattle And Their Substance Be Ours?",
        note([
          "The men of the city agree to circumcision because they expect profit.",
          "They are not seeking the God of Abraham.",
          "They are calculating how Jacob's wealth could become theirs.",
          "This makes the whole agreement corrupt on both sides.",
          "Jacob's sons are deceiving them, and Shechem's men are motivated by gain.",
          "Genesis shows a city and a family both acting from broken motives.",
        ]),
      ],
      [
        "⚔️ Simeon And Levi Took Each Man His Sword",
        note([
          "Simeon and Levi attack the city while the men are weakened.",
          "Their revenge is violent and excessive.",
          "They kill not only Shechem but the males of the city.",
          "The chapter does not invite us to admire this as heroic justice.",
          "Later, Jacob will remember this act as cruel and dangerous.",
          "The brothers defend their sister, but they do it in a way that stains the family.",
        ]),
      ],
      [
        "💬 Should He Deal With Our Sister As With An Harlot?",
        note([
          "The brothers end with a question that exposes their grief and anger.",
          "They are right that Dinah should not have been treated with shame.",
          "Their concern for her dignity is real.",
          "But the chapter leaves the reader with tension because their response was also wrong.",
          "Genesis does not give an easy ending.",
          "It shows how a family can be wounded by evil and then create more damage through revenge.",
        ]),
      ],
    ],
  },
  {
    chapter: 35,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 35:1-8",
    title: "Jacob Returns To Bethel",
    icon: "⛪",
    phrases: [
      [
        "📍 Arise, Go Up To Bethel",
        note([
          "God sends Jacob back to Bethel, the place where He first met him on the run.",
          "This matters because Jacob's household has just come through a dark and dangerous chapter.",
          "The family needs more than relocation.",
          "They need spiritual renewal.",
          "Bethel reminds Jacob of God's promise, presence, and faithfulness.",
          "God brings him back to the place where the journey began.",
        ]),
      ],
      [
        "🧹 Put Away The Strange Gods",
        note([
          "Jacob tells his household to remove foreign gods from among them.",
          "This shows that idolatry is still present in the family.",
          "Rachel had carried household gods from Laban, and the family has been living among pagan peoples.",
          "Before worship at Bethel, Jacob calls for cleansing.",
          "The covenant family cannot carry every idol into the place of worship.",
          "God's people need to leave behind what does not belong with Him.",
        ]),
      ],
      [
        "🛡️ The Terror Of God Was Upon The Cities",
        note([
          "After the violence at Shechem, Jacob's family could have been attacked by surrounding cities.",
          "But God protects them.",
          "The terror of God means the surrounding peoples were restrained by fear from pursuing Jacob.",
          "This protection matters because Jacob's sons created real danger.",
          "God's mercy keeps the family from being destroyed by the consequences of that danger.",
          "The promise continues because God guards it.",
        ]),
      ],
    ],
  },
  {
    chapter: 35,
    startVerse: 9,
    endVerse: 15,
    reference: "Genesis 35:9-15",
    title: "God Confirms Jacob's New Name",
    icon: "🆕",
    phrases: [
      [
        "🆕 Thy Name Shall Not Be Called Any More Jacob",
        note([
          "God confirms the name Israel again.",
          "Jacob had already received this name after wrestling with God.",
          "Now God repeats it at Bethel as part of covenant renewal.",
          "That matters because Jacob still needs to live into the identity God gave him.",
          "New names in Genesis are not decoration.",
          "They mark God's work in a person's life and future.",
        ]),
      ],
      [
        "👑 Kings Shall Come Out Of Thy Loins",
        note([
          "God promises that kings will come from Jacob's line.",
          "This points beyond Jacob's immediate family to Israel's future as a nation.",
          "Later, kings like David will come from this family.",
          "For Christians, this promise also points forward to Jesus, the King from Israel.",
          "Jacob's messy household does not look royal yet.",
          "But God sees the future He is building through them.",
        ]),
      ],
      [
        "📍 The Land Which I Gave Abraham And Isaac",
        note([
          "God ties Jacob's promise to Abraham and Isaac.",
          "This shows continuity across generations.",
          "Jacob is not receiving a brand-new unrelated promise.",
          "He is being brought into the same covenant story.",
          "The land promise is repeated because Jacob has returned from exile and needs to remember where he belongs.",
          "God's promise is bigger than one person's lifetime.",
        ]),
      ],
    ],
  },
  {
    chapter: 35,
    startVerse: 16,
    endVerse: 29,
    reference: "Genesis 35:16-29",
    title: "Loss In Jacob's Family",
    icon: "🪦",
    phrases: [
      [
        "👶 She Called His Name Benoni",
        note([
          "Rachel names her son Benoni as she is dying.",
          "The name is connected to sorrow.",
          "This is heartbreaking because Rachel had longed for children so deeply.",
          "Her final childbirth brings both life and death into the same moment.",
          "Genesis does not soften the pain of the scene.",
          "The family receives another son, but Jacob loses the woman he loved most.",
        ]),
      ],
      [
        "👶 His Father Called Him Benjamin",
        note([
          "Jacob renames the child Benjamin.",
          "Instead of letting the child carry only the name of sorrow, Jacob gives him a name connected to strength or favor.",
          "This does not erase Rachel's death.",
          "But it shows Jacob refusing to let the boy's whole identity be defined by tragedy.",
          "Benjamin's birth completes the twelve sons of Jacob.",
          "The future tribes of Israel are now all present.",
        ]),
      ],
      [
        "💔 Reuben Went And Lay With Bilhah",
        note([
          "Reuben's act is a serious family violation.",
          "Bilhah was connected to Rachel and to Jacob's household.",
          "In that culture, taking a father's concubine could also be seen as a challenge to family authority.",
          "This sin will affect Reuben's future blessing later in Genesis.",
          "The family of Israel is growing, but it is also deeply broken.",
          "Genesis keeps showing that God's promise moves through people who still need mercy and correction.",
        ]),
      ],
    ],
  },
  {
    chapter: 36,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 36:1-8",
    title: "Esau Moves Away",
    icon: "🏔️",
    phrases: [
      [
        "📜 These Are The Generations Of Esau",
        note([
          "Genesis pauses to give Esau's family line.",
          "This matters because Esau is not the covenant heir, but he is still part of Isaac's family.",
          "The Bible does not simply erase him.",
          "His descendants become Edom, a people who will matter later in Israel's story.",
          "Genealogies can feel slow, but they show how family lines become nations.",
          "Esau's story continues outside the main promise line.",
        ]),
      ],
      [
        "🏔️ Esau Is Edom",
        note([
          "This phrase connects Esau personally to the nation of Edom.",
          "Edom will later become one of Israel's difficult neighbors.",
          "The family tension between Jacob and Esau grows into national tension between Israel and Edom.",
          "Genesis is helping the reader understand where that later conflict comes from.",
          "A brother story becomes a nation story.",
          "The roots of later history are planted in this family.",
        ]),
      ],
      [
        "🐄 Their Riches Were More Than That They Might Dwell Together",
        note([
          "Jacob and Esau both have large households and many animals.",
          "The land cannot support them living closely together.",
          "This echoes Abraham and Lot separating earlier because of their possessions.",
          "Esau moves to Mount Seir.",
          "The separation helps create space for Jacob's line in Canaan.",
          "Even practical problems like grazing land can move the larger story forward.",
        ]),
      ],
    ],
  },
  {
    chapter: 36,
    startVerse: 9,
    endVerse: 19,
    reference: "Genesis 36:9-19",
    title: "The Chiefs Of Esau",
    icon: "👑",
    phrases: [
      [
        "🏔️ Father Of The Edomites In Mount Seir",
        note([
          "Esau becomes the father of the Edomites in Mount Seir.",
          "This gives Esau's descendants a land identity.",
          "They are not wandering randomly; they become established as a people.",
          "Mount Seir becomes connected to Edom throughout the Old Testament.",
          "This helps readers understand later references to Edom.",
          "Genesis is building the map of Israel's future neighbors.",
        ]),
      ],
      [
        "👑 Dukes Of The Sons Of Esau",
        note([
          "Dukes here means chiefs or clan leaders.",
          "Esau's family becomes organized and powerful.",
          "This matters because Esau's line develops leadership before Israel has kings.",
          "Genesis is showing that other nations can look established while the promise family still looks fragile.",
          "But visible power is not the same as covenant calling.",
          "God's promise is moving through Jacob, even while Esau's line grows strong.",
        ]),
      ],
    ],
  },
  {
    chapter: 36,
    startVerse: 20,
    endVerse: 30,
    reference: "Genesis 36:20-30",
    title: "The People Of Seir",
    icon: "📍",
    phrases: [
      [
        "📍 The Sons Of Seir The Horite",
        note([
          "Genesis lists the people who lived in Seir before or alongside Esau's descendants.",
          "This matters because Edom's land has a history before Esau's family dominates it.",
          "The Bible is showing real peoples, places, and family lines.",
          "These names may feel distant, but they give texture to the world around Israel.",
          "The promised family is not living in an empty world.",
          "They are surrounded by nations with their own stories.",
        ]),
      ],
      [
        "🗺️ According To Their Dukes",
        note([
          "The repeated chiefs show organized clans in Seir.",
          "This is political and family structure.",
          "Genesis is not only interested in individual heroes.",
          "It also shows how peoples are arranged in lands and leadership groups.",
          "That matters because Israel's later story will involve tribes, chiefs, kings, and nations.",
          "Genesis is laying the groundwork for that world.",
        ]),
      ],
    ],
  },
  {
    chapter: 36,
    startVerse: 31,
    endVerse: 43,
    reference: "Genesis 36:31-43",
    title: "Kings In Edom",
    icon: "👑",
    phrases: [
      [
        "👑 Before There Reigned Any King Over The Children Of Israel",
        note([
          "Edom has kings before Israel does.",
          "That may surprise readers because Israel is the covenant line.",
          "But God's promise does not always look impressive early on.",
          "Edom appears politically developed while Jacob's family is still a household, not a kingdom.",
          "This phrase helps us see the difference between worldly timing and covenant timing.",
          "God's chosen line may look slower, but His promise is still moving.",
        ]),
      ],
      [
        "📜 These Are The Dukes Of Edom",
        note([
          "Genesis closes Esau's genealogy by naming Edomite chiefs.",
          "This wraps up Esau's line before the story returns to Jacob's family.",
          "The long list shows that God kept His word that Esau would become a people.",
          "But the main story will now focus on the sons of Jacob.",
          "Edom has power and structure.",
          "Israel's story is about to move into the Joseph narrative, where God's hidden providence becomes central.",
        ]),
      ],
    ],
  },
  {
    chapter: 37,
    startVerse: 1,
    endVerse: 4,
    reference: "Genesis 37:1-4",
    title: "Joseph Is Loved And Hated",
    icon: "🧥",
    phrases: [
      [
        "👴 Israel Loved Joseph More",
        note([
          "Israel is Jacob, the same man God renamed after wrestling with him.",
          "The text uses Israel here while showing his family life and favoritism.",
          "Joseph is loved more because he is the son of Jacob's old age and the son of Rachel, the woman Jacob loved most.",
          "That does not make the favoritism right.",
          "It helps us understand why it happened.",
          "The pain in Jacob's love story now affects the next generation.",
        ]),
      ],
      [
        "🧥 A Coat Of Many Colours",
        note([
          "The coat marks Joseph as special in a visible way.",
          "This was not ordinary work clothing for a shepherd.",
          "It likely signaled status, favor, or special position in the family.",
          "Every time the brothers saw it, they were reminded that Joseph was treated differently.",
          "The coat did not create the whole problem, but it became a symbol of the problem.",
          "Favoritism became something Joseph wore in front of everyone.",
        ]),
      ],
      [
        "😡 They Hated Him",
        note([
          "The brothers' hatred is repeated because it keeps growing.",
          "They do not simply find Joseph annoying.",
          "They cannot even speak peacefully to him.",
          "That shows the relationship has become deeply poisoned.",
          "Genesis is preparing us for betrayal by showing that the violence starts in the heart long before it becomes action.",
          "Unresolved jealousy can become dangerous over time.",
        ]),
      ],
    ],
  },
  {
    chapter: 37,
    startVerse: 5,
    endVerse: 11,
    reference: "Genesis 37:5-11",
    title: "Joseph's Dreams",
    icon: "🌙",
    phrases: [
      [
        "🌾 We Were Binding Sheaves",
        note([
          "Joseph's first dream uses harvest imagery.",
          "His sheaf stands upright while his brothers' sheaves bow down.",
          "The meaning is clear enough that the brothers understand it immediately.",
          "They hear the dream as Joseph claiming future authority over them.",
          "The harvest image will matter later because Joseph's rise in Egypt will be connected to grain and famine.",
          "God is hinting at the future before anyone understands the whole path.",
        ]),
      ],
      [
        "☀️ The Sun And The Moon And The Eleven Stars",
        note([
          "The second dream expands the picture beyond the brothers.",
          "Now father, mother, and brothers are pictured bowing.",
          "Jacob rebukes Joseph, but he also keeps the saying in mind.",
          "That detail matters because Jacob has experience with God speaking through dreams.",
          "He may not like what Joseph says, but he senses it should not be dismissed too quickly.",
          "The dream is strange, but it is pointing toward God's plan.",
        ]),
      ],
      [
        "🧠 His Father Observed The Saying",
        note([
          "Jacob does not fully understand Joseph's dream, but he stores it away.",
          "To observe the saying means to keep it in mind.",
          "This is different from the brothers, who only respond with envy and hatred.",
          "Jacob has learned that God can speak in ways that are uncomfortable at first.",
          "The phrase teaches readers not to throw away every confusing word too quickly.",
          "Some things make sense only after God unfolds the story.",
        ]),
      ],
    ],
  },
  {
    chapter: 37,
    startVerse: 12,
    endVerse: 24,
    reference: "Genesis 37:12-24",
    title: "Joseph Is Thrown Into The Pit",
    icon: "🕳️",
    phrases: [
      [
        "📍 Come, And I Will Send Thee Unto Them",
        note([
          "Jacob sends Joseph to check on his brothers.",
          "Joseph obeys and goes looking for them, even though the family tension is already serious.",
          "This small errand becomes the doorway into the next major part of Genesis.",
          "The story turns through ordinary obedience.",
          "Joseph is not setting out to become powerful in Egypt.",
          "He is simply sent by his father into a dangerous family situation.",
        ]),
      ],
      [
        "😈 Behold, This Dreamer Cometh",
        note([
          "The brothers mock Joseph by calling him the dreamer.",
          "They do not realize that the dreams they hate are part of the plan God will use to save them.",
          "Their insult shows how deeply they resent him.",
          "They want to kill not only Joseph, but also the future his dreams suggest.",
          "This phrase matters because people can mock what God is using.",
          "The brothers think they can stop the dream by removing the dreamer.",
        ]),
      ],
      [
        "🕳️ They Cast Him Into A Pit",
        note([
          "Joseph is stripped of his coat and thrown into an empty pit.",
          "The coat, the symbol of favor, is taken away first.",
          "The pit becomes a place of helplessness and betrayal.",
          "Joseph has no power in this moment.",
          "The one who dreamed of rising is now pushed down.",
          "Genesis is showing how God's path upward can begin in a place that looks like total loss.",
        ]),
      ],
    ],
  },
  {
    chapter: 37,
    startVerse: 25,
    endVerse: 36,
    reference: "Genesis 37:25-36",
    title: "Joseph Is Sold",
    icon: "🐪",
    phrases: [
      [
        "🍽️ They Sat Down To Eat Bread",
        note([
          "This detail is chilling.",
          "Joseph is in the pit, and his brothers sit down to eat.",
          "Their ability to eat while he suffers shows how hard their hearts have become.",
          "The Bible does not need to over-explain the cruelty because the scene itself says enough.",
          "They can enjoy a meal while ignoring their brother's cries.",
          "Sin can make people strangely comfortable with another person's pain.",
        ]),
      ],
      [
        "💰 Twenty Pieces Of Silver",
        note([
          "Joseph is sold for silver.",
          "His brothers turn their hatred into profit.",
          "They decide not to kill him, but selling him is still a terrible betrayal.",
          "The price shows Joseph being treated like property instead of a brother.",
          "Later in the Bible, betrayal for silver will echo in the story of Jesus and Judas.",
          "Joseph's suffering becomes part of a larger pattern of the rejected righteous one.",
        ]),
      ],
      [
        "🩸 They Took Joseph's Coat",
        note([
          "The brothers use Joseph's coat to deceive Jacob.",
          "The same coat that represented favoritism now becomes the tool of a lie.",
          "They dip it in blood and let Jacob draw the wrong conclusion.",
          "This is painful irony because Jacob once deceived his father with clothing.",
          "Now his sons deceive him with clothing.",
          "The family pattern of deception has come back with devastating force.",
        ]),
      ],
    ],
  },
  {
    chapter: 38,
    startVerse: 1,
    endVerse: 11,
    reference: "Genesis 38:1-11",
    title: "Judah's Family Falls Apart",
    icon: "💔",
    phrases: [
      [
        "⬇️ Judah Went Down From His Brethren",
        note([
          "Judah separates from his brothers after Joseph is sold.",
          "The phrase went down feels like more than geography.",
          "Judah is moving away from the family and into a morally troubled chapter.",
          "Genesis 38 may feel like an interruption, but it is important.",
          "Judah's story will become central later.",
          "Before he can stand in the gap for Benjamin, we need to see who he was.",
        ]),
      ],
      [
        "⚰️ Er Was Wicked In The Sight Of The Lord",
        note([
          "This is a serious statement because Genesis does not give every detail of Er's sin.",
          "It simply tells us the Lord saw his wickedness.",
          "That matters because God sees what the narrator does not fully describe.",
          "Er's death leaves Tamar vulnerable as a widow without a child.",
          "In that culture, a child carried inheritance, protection, and future.",
          "Tamar's situation becomes desperate because the men responsible for justice fail her.",
        ]),
      ],
      [
        "🚫 Onan Knew That The Seed Should Not Be His",
        note([
          "Onan refuses to provide offspring for his dead brother's line.",
          "This was not mainly about sex in general; it was about selfishly refusing family responsibility.",
          "He takes the benefits of the arrangement while denying Tamar the protection and future she should receive.",
          "His sin is cruel because it uses Tamar while withholding justice from her.",
          "God sees that too.",
          "Genesis is showing a household where the vulnerable woman is being failed repeatedly.",
        ]),
      ],
    ],
  },
  {
    chapter: 38,
    startVerse: 12,
    endVerse: 23,
    reference: "Genesis 38:12-23",
    title: "Tamar Forces The Truth Into The Open",
    icon: "🎭",
    phrases: [
      [
        "🧕 She Covered Her With A Veil",
        note([
          "Tamar disguises herself because Judah has not kept his word to give her Shelah.",
          "Her action is shocking, but the story has already shown that Judah left her trapped.",
          "She is a widow with no child, no husband, and no justice from the family responsible for her.",
          "The veil hides her identity so Judah will not recognize her.",
          "Genesis is not pretending the situation is clean.",
          "It is showing a broken world where Tamar uses a desperate plan to expose Judah's failure.",
        ]),
      ],
      [
        "🪪 Thy Signet, And Thy Bracelets, And Thy Staff",
        note([
          "Tamar asks for Judah's personal items as a pledge.",
          "These were identity markers, not random accessories.",
          "A signet could identify a man officially, and a staff could be personally recognizable.",
          "Tamar is making sure she has proof.",
          "That matters because Judah has already failed to honor his promise.",
          "The items will later force him to face the truth.",
        ]),
      ],
      [
        "🔎 Where Is The Harlot?",
        note([
          "Judah sends someone to find the woman and recover his pledge.",
          "The search exposes how little he understands what has happened.",
          "He thinks this is a private shame he can clean up quietly.",
          "But Tamar has the evidence, and the real issue is bigger than embarrassment.",
          "Judah is about to learn that his hidden sin is tied to his public injustice.",
          "Genesis often brings concealed things into the light.",
        ]),
      ],
    ],
  },
  {
    chapter: 38,
    startVerse: 24,
    endVerse: 30,
    reference: "Genesis 38:24-30",
    title: "Judah Is Confronted",
    icon: "⚖️",
    phrases: [
      [
        "🔥 Bring Her Forth, And Let Her Be Burnt",
        note([
          "Judah reacts harshly when he hears Tamar is pregnant.",
          "His response exposes hypocrisy.",
          "He is ready to condemn Tamar without admitting his own role.",
          "The scene is meant to feel unfair because Judah is judging a situation he helped create.",
          "This is how sin often works: people can become severe toward others while hiding themselves.",
          "Judah's judgment is about to turn back on him.",
        ]),
      ],
      [
        "🪪 Discern, I Pray Thee",
        note([
          "Tamar sends Judah's own items back to him and asks him to recognize them.",
          "This phrase echoes Genesis 37, where Jacob was asked to recognize Joseph's bloody coat.",
          "Judah helped deceive his father with evidence.",
          "Now evidence confronts Judah.",
          "The echo is powerful.",
          "Genesis is showing Judah being brought face to face with his own pattern of deception.",
        ]),
      ],
      [
        "✅ She Hath Been More Righteous Than I",
        note([
          "Judah admits Tamar is more righteous than he is.",
          "That does not mean everything Tamar did was simple or ideal.",
          "It means Judah recognizes that he failed her first.",
          "This confession is a major turning point in Judah's life.",
          "He stops defending himself and names his guilt.",
          "That matters because Judah's growth will become very important later in Joseph's story.",
        ]),
      ],
    ],
  },
  {
    chapter: 39,
    startVerse: 1,
    endVerse: 6,
    reference: "Genesis 39:1-6",
    title: "The Lord Is With Joseph",
    icon: "🏠",
    phrases: [
      [
        "⬇️ Joseph Was Brought Down To Egypt",
        note([
          "Joseph is taken down to Egypt as a slave.",
          "This is the result of betrayal, not his own choice.",
          "He has gone from favored son to foreign servant.",
          "The phrase matters because Egypt will become central to the rest of Genesis and Exodus.",
          "Joseph's suffering is moving him into the place where God will later use him.",
          "What looks like a detour is becoming part of God's hidden plan.",
        ]),
      ],
      [
        "🙌 The Lord Was With Joseph",
        note([
          "This is the most important phrase in Joseph's suffering.",
          "Joseph is far from his father, far from home, and far from the coat that marked his favor.",
          "But he is not far from God.",
          "The Lord's presence does not mean Joseph avoids hardship.",
          "It means God is with him inside the hardship.",
          "This phrase becomes the anchor of Joseph's story.",
        ]),
      ],
      [
        "📈 A Prosperous Man",
        note([
          "Joseph prospers even as a servant.",
          "That does not mean slavery is good or easy.",
          "It means God's hand is on Joseph in a place meant to reduce him.",
          "Potiphar can see that Joseph's work is blessed.",
          "Joseph's faithfulness becomes visible in ordinary responsibilities.",
          "God is preparing him through service before raising him to leadership.",
        ]),
      ],
    ],
  },
  {
    chapter: 39,
    startVerse: 7,
    endVerse: 18,
    reference: "Genesis 39:7-18",
    title: "Joseph Resists Temptation",
    icon: "🚫",
    phrases: [
      [
        "👀 His Master's Wife Cast Her Eyes Upon Joseph",
        note([
          "Potiphar's wife begins pursuing Joseph.",
          "The phrase shows desire turning into temptation and pressure.",
          "Joseph is vulnerable because he is a slave in her household.",
          "She has power, and he has limited protection.",
          "This is not a simple private temptation story.",
          "It is a test of integrity inside an unfair power situation.",
        ]),
      ],
      [
        "🚫 How Then Can I Do This Great Wickedness",
        note([
          "Joseph refuses by naming the sin clearly.",
          "He does not treat it as a harmless opportunity.",
          "He sees betrayal against Potiphar, but even more, sin against God.",
          "That matters because Joseph's morality is not based only on who is watching.",
          "He knows God is present even in Egypt.",
          "Joseph's refusal shows a heart trained by reverence for the Lord.",
        ]),
      ],
      [
        "🏃 He Fled",
        note([
          "Joseph does not stay to debate temptation.",
          "He runs.",
          "Sometimes faithfulness looks like leaving the room.",
          "Joseph loses his garment, but keeps his integrity.",
          "That detail echoes earlier when his brothers took his coat.",
          "Once again Joseph's clothing is used against him, but this time he has done what is right.",
        ]),
      ],
    ],
  },
  {
    chapter: 39,
    startVerse: 19,
    endVerse: 23,
    reference: "Genesis 39:19-23",
    title: "Joseph Is Put In Prison",
    icon: "⛓️",
    phrases: [
      [
        "🔥 His Wrath Was Kindled",
        note([
          "Potiphar becomes angry after hearing his wife's accusation.",
          "Joseph has no real defense in the story.",
          "He is a foreign slave accused by a powerful woman in an Egyptian household.",
          "The situation is deeply unfair.",
          "Joseph did the right thing and still suffered.",
          "Genesis is honest that righteousness does not always bring immediate reward.",
        ]),
      ],
      [
        "⛓️ Joseph's Master Took Him, And Put Him Into The Prison",
        note([
          "Joseph goes from pit to slavery to prison.",
          "His life keeps moving downward, even though he has been faithful.",
          "This matters because God's plan is not obvious from Joseph's circumstances.",
          "If we judged only by location, we would think Joseph was abandoned.",
          "But the next phrase tells us otherwise.",
          "God is still with Joseph in the place that looks like the end.",
        ]),
      ],
      [
        "🙌 The Lord Was With Joseph",
        note([
          "The same phrase from Potiphar's house appears again in prison.",
          "Joseph's circumstances change, but God's presence does not.",
          "This is one of the deepest lessons in Joseph's life.",
          "God is with him when he prospers, and God is with him when he is falsely accused.",
          "The prison becomes another place of preparation.",
          "Joseph is not forgotten just because he is confined.",
        ]),
      ],
    ],
  },
  {
    chapter: 40,
    startVerse: 1,
    endVerse: 8,
    reference: "Genesis 40:1-8",
    title: "Two Prisoners Have Dreams",
    icon: "🌙",
    phrases: [
      [
        "🍷 The Butler And The Baker",
        note([
          "The butler and baker were officials connected to Pharaoh's household.",
          "They were not random prisoners.",
          "Their work brought them close to the king's table, which was a place of trust and danger.",
          "God brings these men into the same prison as Joseph.",
          "That matters because Joseph's next step toward Pharaoh begins with serving two forgotten prisoners.",
          "Providence often starts in small, hidden assignments.",
        ]),
      ],
      [
        "😔 Wherefore Look Ye So Sadly Today?",
        note([
          "Joseph notices their sadness.",
          "That is important because Joseph is suffering too, yet he still pays attention to others.",
          "He does not become so consumed by his own pain that he cannot see someone else's burden.",
          "This question opens the door for the dream interpretations.",
          "Joseph's compassion becomes part of God's plan.",
          "A small act of noticing matters in the story.",
        ]),
      ],
      [
        "🙌 Do Not Interpretations Belong To God?",
        note([
          "Joseph gives God credit before interpreting the dreams.",
          "He does not present himself as a magical expert.",
          "In Egypt, dreams were often treated as messages needing skilled interpreters.",
          "Joseph makes clear that true interpretation belongs to God.",
          "This shows his faith in a foreign land.",
          "Even in prison, Joseph is still bearing witness to the Lord.",
        ]),
      ],
    ],
  },
  {
    chapter: 40,
    startVerse: 9,
    endVerse: 15,
    reference: "Genesis 40:9-15",
    title: "The Butler's Dream",
    icon: "🍇",
    phrases: [
      [
        "🍇 Three Branches",
        note([
          "The butler dreams of a vine with three branches.",
          "Joseph explains that the three branches mean three days.",
          "The dream language is symbolic, but God gives Joseph the meaning.",
          "This matters because Joseph is not guessing from human cleverness.",
          "God is revealing what will happen.",
          "The dream points to the butler being restored to his position.",
        ]),
      ],
      [
        "⬆️ Pharaoh Shall Lift Up Thine Head",
        note([
          "To lift up the head means Pharaoh will restore the butler.",
          "The phrase can sound strange, but here it means favor and reinstatement.",
          "The butler will stand again in Pharaoh's court.",
          "Joseph gives him good news, but then asks to be remembered.",
          "This is a human moment.",
          "Joseph trusts God, but he also longs to get out of prison.",
        ]),
      ],
      [
        "🕳️ I Was Stolen Away",
        note([
          "Joseph finally describes his own situation.",
          "He says he was stolen from the land of the Hebrews and has done nothing deserving prison.",
          "This is not self-pity; it is the truth.",
          "Joseph has been betrayed, trafficked, falsely accused, and confined.",
          "The phrase helps the reader remember the injustice under the surface of his faithfulness.",
          "Joseph's trust in God does not mean he pretends the wrong done to him was right.",
        ]),
      ],
    ],
  },
  {
    chapter: 40,
    startVerse: 16,
    endVerse: 23,
    reference: "Genesis 40:16-23",
    title: "The Baker's Dream And The Butler's Forgetfulness",
    icon: "🧺",
    phrases: [
      [
        "🧺 Three White Baskets",
        note([
          "The baker also has a dream with the number three.",
          "But his dream has a very different meaning.",
          "The birds eating from the baskets point to judgment, not restoration.",
          "This shows that not every message from God is comforting.",
          "Joseph tells the truth even when the interpretation is hard.",
          "Faithful interpretation does not change the message to make it easier.",
        ]),
      ],
      [
        "⚖️ Pharaoh's Birthday",
        note([
          "On Pharaoh's birthday, both dreams come true.",
          "The butler is restored, and the baker is judged.",
          "This proves that God truly gave Joseph the interpretation.",
          "The prison dreams are not random details.",
          "They confirm Joseph as someone through whom God reveals truth.",
          "That will matter when Pharaoh himself has dreams in the next chapter.",
        ]),
      ],
      [
        "😔 Yet Did Not The Chief Butler Remember Joseph",
        note([
          "The chapter ends with painful forgetfulness.",
          "Joseph helped the butler, but the butler forgets him.",
          "This means Joseph remains in prison longer.",
          "The delay feels unfair, but it also keeps Joseph in place until Pharaoh's dreams come at the right time.",
          "God's plan is still moving even when people forget.",
          "Joseph is forgotten by man, but not forgotten by God.",
        ]),
      ],
    ],
  },
];

const DAY_12_GENESIS_31_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 31, startVerse: 1, endVerse: 6, reference: "Genesis 31:1-6", title: "Laban's House Turns Against Jacob", icon: "👂", phrases: [
    phrase("👂 Jacob Heard The Words Of Laban's Sons", ["The pressure around Jacob becomes public through the complaints of Laban's sons.", "They frame Jacob's blessing as theft, even though Laban's own terms created the work arrangement.", "Jealousy rewrites the story so another person's increase looks like personal loss.", "This is the first sign that Jacob's season with Laban is becoming unsafe.", "Accusation often starts before direct confrontation.", "When God blesses Jacob under unfair conditions, Laban's household still interprets it through resentment."]),
    phrase("💰 Jacob Hath Taken Away All That Was Our Father's", ["Laban's sons exaggerate what happened because they feel their inheritance shrinking.", "Jacob has not taken everything, but his visible prosperity bothers them.", "Their words reveal how wealth can turn family members against one another.", "The blessing that helped Laban's house now becomes the reason Laban's house turns suspicious.", "The same prosperity once welcomed is now resented.", "People may celebrate your usefulness until your growth feels costly to them."]),
    phrase("😠 Laban's Countenance Was Not Toward Him", ["Jacob reads Laban's face and knows the relationship has changed.", "Sometimes the danger is not only in words, but in the atmosphere around a person.", "The uncle who once welcomed him now looks at him differently.", "Genesis shows emotional tension before it shows the escape.", "God often moves Jacob after the environment reveals its true condition.", "Discernment includes paying attention when a place that once sheltered you becomes controlling."]),
    phrase("🧭 Return Unto The Land Of Thy Fathers", ["God gives Jacob clear direction to return to the land of promise.", "This is not only Jacob reacting to workplace tension; it is God calling him home.", "The command reconnects Jacob's present conflict to the covenant story.", "Laban's house was a season, not Jacob's destination.", "God does not just say leave; He says where to go.", "Obedience is not escape without direction; it is movement toward God's call."]),
    phrase("🤲 I Will Be With Thee", ["God repeats the promise of presence Jacob first heard at Bethel.", "Jacob is not being sent back alone, even though the journey will be risky.", "The same God who kept him in exile will keep him on the road home.", "This promise matters because obedience will involve conflict with Laban and fear of Esau later.", "God's presence is the anchor under the command.", "When God calls someone into a hard return, He also promises Himself for the road."]),
  ] },
  { chapter: 31, startVerse: 7, endVerse: 12, reference: "Genesis 31:7-12", title: "God Saw Laban's Unfairness", icon: "👀", phrases: [
    phrase("🔁 Changed My Wages Ten Times", ["Jacob tells Rachel and Leah that Laban repeatedly changed the terms of his labor.", "The phrase shows a pattern, not a one-time misunderstanding.", "Jacob has lived for years under shifting rules that always seem to benefit Laban.", "This explains why he no longer trusts the household.", "Unfairness becomes clearer when it keeps repeating.", "Faithfulness does not require pretending manipulation is normal."]),
    phrase("🛡️ God Suffered Him Not To Hurt Me", ["Jacob sees God's protection behind his survival in Laban's house.", "Laban had power, but not ultimate power.", "God limited what Laban could do, even while Jacob remained in a hard system.", "That does not make Laban's actions right; it shows God preserving Jacob through them.", "God's protection can be quiet and long-term.", "Sometimes deliverance begins with God restraining harm before He removes you from the place."]),
    phrase("🐐 Speckled", ["Jacob explains that whenever Laban changed the wages, the flocks produced according to the new terms.", "The unusual animals became evidence that God was providing despite Laban's strategy.", "This reframes Genesis 30: the increase was not merely Jacob's cleverness.", "God was overruling Laban's control through the very flocks under dispute.", "God can turn changing rules into changing provision.", "No human system is too slippery for God to see and answer."]),
    phrase("🌙 In A Dream", ["Jacob says God showed him what was happening through a dream.", "Dreams have already mattered in Genesis, especially around covenant direction and divine warning.", "Here the dream helps Jacob interpret his work situation spiritually.", "He is not leaving only because he feels irritated; he is responding to revealed guidance.", "God speaks into ordinary labor and family pressure.", "The workplace conflict is part of the covenant story, not separate from it."]),
    phrase("👀 I Have Seen All That Laban Doeth", ["This is one of the strongest comfort lines in the chapter.", "God tells Jacob that Laban's treatment has not been hidden from Him.", "Years of unfairness may have felt buried inside family business, but heaven saw it clearly.", "Jacob's pain and labor are not invisible.", "God names Laban's actions before calling Jacob home.", "Being unseen by people does not mean being unseen by God."]),
  ] },
  { chapter: 31, startVerse: 13, endVerse: 16, reference: "Genesis 31:13-16", title: "Rachel And Leah Agree To Leave", icon: "🧳", phrases: [
    phrase("🪨 I Am The God Of Bethel", ["God identifies Himself by the place where Jacob made his vow and saw the ladder.", "Bethel was not just a memory; it was a marker of God's promise and Jacob's worship.", "By naming Bethel, God ties this return to the earlier promise of presence.", "Jacob is being reminded that his story has been guided from the beginning.", "God brings Jacob back to the altar moment before sending him home.", "Spiritual memories can become anchors when obedience gets costly."]),
    phrase("🕯️ Where Thou Anointedst The Pillar", ["The anointed pillar points back to Jacob's response after meeting God in the wilderness.", "Jacob had marked the place because God met him when he was alone and afraid.", "Now God reminds him of that encounter at another turning point.", "The memory says, I was with you then, and I am with you now.", "Worship moments are not throwaway scenes in Genesis.", "What God showed you earlier may strengthen you for the next hard step."]),
    phrase("🚶 Get Thee Out From This Land", ["The command becomes direct and urgent.", "Jacob must leave the place where he has built wealth, family, and years of routine.", "Obedience will not feel simple because Laban is controlling and the road home carries old fears.", "Still, staying would mean resisting God's clear direction.", "God calls Jacob out before everything around him is easy.", "God-led transitions often require courage before comfort arrives."]),
    phrase("💸 Sold Us", ["Rachel and Leah answer with painful honesty about their father.", "They say Laban has treated them as if they were sold and then consumed the money.", "Their agreement shows that Jacob is not imagining the household's brokenness.", "Even Laban's daughters feel used by him.", "Laban's control has wounded his own children too.", "Manipulative leadership damages more than the obvious target."]),
    phrase("✅ Whatsoever God Hath Said Unto Thee, Do", ["Rachel and Leah support Jacob's obedience to God's command.", "This matters because leaving their father and homeland is a major step for them too.", "They are not passive baggage in the story; they give spoken agreement.", "Their response helps the household move together.", "God is aligning the family for departure.", "Obedience becomes stronger when the people affected by it recognize God's hand too."]),
  ] },
  { chapter: 31, startVerse: 17, endVerse: 21, reference: "Genesis 31:17-21", title: "Jacob Leaves Secretly", icon: "🏃", phrases: [
    phrase("🐪 Jacob Rose Up", ["Jacob acts on the command and begins moving his household.", "The story shifts from discussion to departure.", "He places his children and wives on camels, gathers livestock and goods, and heads toward Canaan.", "This is obedience with logistics, not just emotion.", "Leaving requires practical steps after spiritual clarity.", "Faith often becomes visible in packed bags, hard conversations, and real movement."]),
    phrase("🧳 All His Goods Which He Had Gotten", ["Jacob leaves with what God had provided during his years with Laban.", "The goods are not random wealth; they are evidence of God's keeping promise.", "The man who arrived with almost nothing now carries a large household and many possessions.", "The increase belongs to the return story, not to permanent comfort in Haran.", "Provision becomes preparation.", "God may bless a person in one place so they can obey Him in the next place."]),
    phrase("🪆 Rachel Had Stolen The Images", ["Rachel steals Laban's household gods before the family leaves.", "This is a troubling detail because it brings hidden sin into the escape.", "The family is obeying God's call, but not every heart and action is clean.", "Genesis refuses to make the departure look perfectly spiritual.", "Obedience and unresolved idolatry can appear in the same household.", "Leaving a bad place does not automatically remove every bad attachment."]),
    phrase("🤫 Jacob Stole Away Unawares", ["Jacob leaves without telling Laban.", "The phrase shows secrecy, fear, and strategy all at once.", "Given Laban's history, Jacob likely expects interference if he announces the departure.", "Still, the secret leaving will trigger pursuit and confrontation.", "The escape is messy even though God commanded the return.", "Obeying God does not always mean the process looks calm or tidy."]),
    phrase("🌊 Passed Over The River", ["Crossing the river marks a real break from Laban's territory.", "Jacob is no longer just thinking about return; he is physically moving toward the promised land.", "The geography matters because Genesis often uses journeys to show spiritual direction.", "The family is leaving exile and heading back toward covenant ground.", "Movement on the map matches movement in the promise story.", "Some obedience has a crossing point where the old arrangement is truly behind you."]),
  ] },
  { chapter: 31, startVerse: 22, endVerse: 24, reference: "Genesis 31:22-24", title: "Laban Pursues Jacob", icon: "⚠️", phrases: [
    phrase("🏃 Laban Pursued After Him", ["Laban does not quietly accept Jacob's departure.", "He gathers his relatives and chases Jacob for seven days.", "The pursuit shows why Jacob feared telling him in the first place.", "Laban wants control over the exit, the possessions, and the story.", "Controlling people often react strongly when someone leaves their reach.", "Jacob's return home requires God's protection, not just Jacob's decision."]),
    phrase("⛰️ Overtook Him In The Mountain", ["Laban catches up to Jacob in the hill country of Gilead.", "The confrontation can no longer be avoided.", "Jacob has left secretly, Laban is angry, and the stolen household gods are still hidden.", "Everything is set for a dangerous meeting.", "Delayed conflict still arrives.", "God may call someone to leave, but there may still be a hard conversation on the road."]),
    phrase("🌙 God Came To Laban In A Dream", ["God intervenes before Laban reaches Jacob.", "This is mercy because Laban's anger could have turned violent or coercive.", "The dream shows that God can speak even to the person pursuing His servant.", "Jacob is asleep somewhere ahead, but God is already managing what Jacob cannot control.", "Divine protection happens before Jacob hears about it.", "God is often guarding situations before we know danger has been restrained."]),
  ] },
  { chapter: 31, startVerse: 25, endVerse: 29, reference: "Genesis 31:25-29", title: "God Restrains Laban", icon: "🛑", phrases: [
    phrase("🚫 Speak Not To Jacob Either Good Or Bad", ["God warns Laban not to pressure Jacob with either threat or persuasion.", "Good or bad means Laban is not free to manipulate the outcome in any direction.", "The boundary comes from God Himself.", "Laban may chase, but he is not sovereign over Jacob's future.", "God's warning limits both violence and sweet-talking control.", "God's protection can include stopping someone from using charm as well as force."]),
    phrase("💪 It Is In The Power Of My Hand", ["Laban later admits he has power to harm Jacob, but also admits God restrained him.", "That confession exposes both Laban's attitude and God's authority.", "Human power is real in the scene, but it is not ultimate.", "Jacob is protected because God stands between him and Laban's intentions.", "Laban knows exactly why he cannot act freely.", "God can put a boundary around someone who thinks they hold all the cards."]),
  ] },
  { chapter: 31, startVerse: 30, endVerse: 35, reference: "Genesis 31:30-35", title: "The Hidden Household Gods", icon: "🔎", phrases: [
    phrase("🏠 Thou Sore Longedst After Thy Father's House", ["Laban acknowledges that Jacob wanted to return home.", "He can understand homesickness, but he still frames the departure as betrayal.", "His words sound wounded, yet they sit beside years of exploitation.", "Genesis lets us hear Laban's complaint without forgetting his behavior.", "Laban uses emotional language after losing control.", "Not every wounded-sounding speech tells the whole truth."]),
    phrase("🪆 Wherefore Hast Thou Stolen My Gods", ["Laban's sharpest accusation is about the household gods Rachel stole.", "The question is tragic because gods that can be stolen are powerless objects.", "Still, the idols matter socially, spiritually, and possibly legally in the household.", "Rachel's secret has given Laban a real charge to bring.", "One hidden sin creates danger for the whole traveling family.", "Idols may look small enough to hide, but they still bring trouble."]),
    phrase("⚖️ Let Him Not Live", ["Jacob answers strongly because he does not know Rachel has taken the gods.", "His rash sentence puts Rachel in danger without him realizing it.", "The moment shows how ignorance inside a family can make confident words dangerous.", "Jacob thinks he is defending his integrity, but he does not know the whole truth.", "Jacob speaks before he has full information.", "Strong words can become reckless when hidden facts are still in the room."]),
    phrase("🔍 Laban Searched", ["Laban searches the tents but cannot find the household gods.", "The scene is tense because the reader knows they are there.", "Rachel's concealment keeps the family from immediate exposure, but it does not make the theft righteous.", "Genesis is showing rescue and moral mess at the same time.", "Not being caught is not the same as being clean.", "God's larger protection of Jacob does not approve every action in Jacob's household."]),
    phrase("🐪 Rachel Had Taken The Images", ["Rachel hides the images in the camel's furniture and sits on them.", "The detail shows cleverness, but also spiritual confusion.", "She is leaving with Jacob toward the God of Bethel while carrying symbols from Laban's world.", "This tension matters because Genesis keeps exposing mixed loyalties.", "Rachel's body blocks the search, but her heart is harder to read.", "People can physically leave an old house while still carrying pieces of it with them."]),
  ] },
  { chapter: 31, startVerse: 36, endVerse: 37, reference: "Genesis 31:36-37", title: "Jacob Challenges Laban", icon: "🗣️", phrases: [
    phrase("🔥 Jacob Was Wroth", ["After Laban finds nothing, Jacob's anger rises.", "For years he has endured Laban's changing terms and suspicion.", "Now the false accusation becomes the moment Jacob finally names the injustice.", "His anger is not random; it has history behind it.", "Jacob's speech gathers twenty years of pressure.", "Long endurance does not mean the wrong was small."]),
    phrase("❓ What Is My Trespass", ["Jacob challenges Laban to identify the actual wrongdoing.", "The question pushes against vague suspicion and controlling accusation.", "Jacob wants evidence, not atmosphere.", "That matters because Laban has treated him as guilty while benefiting from his labor.", "Asking for truth is part of resisting manipulation.", "Honest confrontation brings accusations into the light where they can be tested."]),
  ] },
  { chapter: 31, startVerse: 38, endVerse: 42, reference: "Genesis 31:38-42", title: "Twenty Years Of Service", icon: "🐑", phrases: [
    phrase("🐑 Twenty Years", ["Jacob summarizes two decades of service.", "He has cared for the flocks through loss, weather, danger, sleeplessness, and changing wages.", "The number helps readers feel the length of the burden.", "This was not a short frustrating job; it was a life season under pressure.", "Genesis honors the cost of ordinary labor.", "God sees years of faithfulness that other people may treat as disposable."]),
    phrase("🥶 Frost By Night", ["Jacob describes heat by day, frost by night, and sleep leaving his eyes.", "The words make the labor physical, not abstract.", "He has paid with his body, time, and rest.", "Laban's prosperity was built on Jacob's costly care.", "The shepherd's work involved real suffering.", "Scripture does not ignore the exhaustion behind faithful provision."]),
    phrase("🛡️ God Hath Seen Mine Affliction", ["Jacob ends by saying God saw his affliction and rebuked Laban.", "This matches God's earlier statement that He had seen all Laban was doing.", "Jacob's defense finally rests not on his own cleverness, but on God's witness.", "The dream warning becomes proof that God has judged the situation.", "God is both protector and witness.", "When people distort the story, God's sight remains true."]),
  ] },
  { chapter: 31, startVerse: 43, endVerse: 48, reference: "Genesis 31:43-48", title: "A Heap Becomes A Witness", icon: "🪨", phrases: [
    phrase("👨‍👧 These Daughters Are My Daughters", ["Laban's answer still sounds possessive.", "He claims the daughters, children, flocks, and all that he sees as connected to him.", "Even at the end, his language reveals how hard it is for him to release control.", "Yet he also knows he cannot take them back by force.", "Laban speaks ownership language after God has already limited him.", "Some people surrender control only after God blocks their ability to keep it."]),
    phrase("🤝 Let Us Make A Covenant", ["Laban proposes a covenant to settle the conflict.", "This is not a warm family reunion; it is a boundary agreement.", "The covenant creates a witness between men who do not fully trust each other.", "Peace here means defined limits, not restored closeness.", "Genesis allows boundaries to be part of peace.", "Reconciliation sometimes needs structure because trust has been damaged."]),
    phrase("🪨 Jacob Took A Stone", ["Jacob sets up a stone pillar, echoing earlier moments where stones marked encounters with God.", "Here the stone marks a boundary and a witness in a strained family relationship.", "The physical marker makes the agreement visible.", "No one has to rely only on memory or emotion.", "Genesis uses stones to make invisible commitments visible.", "Serious agreements often need concrete reminders."]),
    phrase("📍 Galeed", ["The heap receives a name connected to witness.", "Naming the place turns the conflict into a remembered boundary.", "Future readers can see that this family story left marks on the land.", "The place name says, something important happened here.", "Names in Genesis often preserve theology and family history.", "Memory matters when people need to remember what was promised."]),
  ] },
  { chapter: 31, startVerse: 49, endVerse: 50, reference: "Genesis 31:49-50", title: "Mizpah Watches Between Them", icon: "👀", phrases: [
    phrase("👀 Mizpah", ["Mizpah is connected to watching or lookout.", "Laban says the Lord watch between them when they are absent from one another.", "This line is sometimes treated like a sweet blessing, but in context it carries distrust.", "They are asking God to watch because they will not be together to monitor each other.", "This is a guarded covenant, not a sentimental goodbye.", "Bible phrases must be understood in their story context."]),
    phrase("⚖️ God Is Witness Betwixt Me And Thee", ["God is called as witness because neither man fully trusts the other.", "The covenant puts their behavior under divine accountability.", "Laban cannot watch Jacob forever, and Jacob cannot trust Laban's words alone.", "So the agreement appeals to the God who sees.", "The God who saw Jacob's affliction is now named as witness over the boundary.", "God's sight gives weight to promises people might otherwise break."]),
  ] },
  { chapter: 31, startVerse: 51, endVerse: 55, reference: "Genesis 31:51-55", title: "The Covenant Boundary Holds", icon: "🚧", phrases: [
    phrase("🚧 This Heap Be Witness", ["The heap and pillar mark a line neither side should cross for harm.", "That is important because peace here includes distance.", "The story does not pretend every relationship becomes safe just because words were spoken.", "The boundary protects the future journey.", "The stones say, this far and no farther.", "Some peace is maintained by clear limits, not constant access."]),
    phrase("🙏 Jacob Offered A Sacrifice", ["Jacob responds with worship and a shared meal on the mountain.", "The sacrifice turns the boundary moment toward God.", "Even after conflict, Jacob acknowledges the Lord's presence and preservation.", "The meal gives the departure a formal close.", "Worship belongs at the end of deliverance, not only at the beginning of fear.", "When God carries you through conflict, pause to mark His faithfulness."]),
    phrase("🌅 Laban Departed", ["The chapter ends with Laban blessing his children and returning to his place.", "Jacob's long season under Laban's control is finally ending.", "The separation is real, and the road ahead now points toward Esau and Canaan.", "God has kept His word: Jacob is leaving with family, flocks, and protection.", "Laban goes back, but Jacob continues forward.", "Obedience sometimes closes one hard chapter before opening the next frightening one."]),
  ] },
];

const DAY_13_GENESIS_32_33_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 32, startVerse: 1, endVerse: 2, reference: "Genesis 32:1-2", title: "God's Army Meets Jacob", icon: "🪽", phrases: [
    phrase("🪽 The Angels Of God Met Him", ["Jacob has just left Laban behind, but he is not walking into the next fear alone.", "Before Esau appears, God's messengers appear.", "That order matters because God gives Jacob a sign of heavenly presence before the human threat becomes visible.", "This connects back to Bethel, where Jacob saw angels as he left the land.", "Angels frame both the leaving and the returning parts of Jacob's journey.", "God is quietly surrounding Jacob's road even when Jacob feels exposed."]),
    phrase("⚔️ This Is God's Army", ["Jacob recognizes that the camp around him is not only his family, servants, and flocks.", "There is a heavenly company present with him.", "The word picture matters because Jacob is about to divide his own people into camps out of fear.", "Before Jacob counts his vulnerable camp, God lets him glimpse God's stronger camp.", "The spiritual reality is shown before the crisis intensifies.", "Fear often makes us count what we can see, but faith remembers God is present beyond what we can measure."]),
    phrase("⛺ Mahanaim", ["Mahanaim means two camps or two companies.", "The name becomes a bridge into the next scene, where Jacob divides his household into two camps.", "The place name reminds readers that Jacob's fearful strategy is happening under a larger sign of divine protection.", "Jacob may feel outnumbered by Esau, but heaven has already met him on the road.", "Genesis often uses place names to teach the meaning of a moment.", "The name says Jacob's camp is not the only camp in the story."]),
  ] },
  { chapter: 32, startVerse: 3, endVerse: 8, reference: "Genesis 32:3-8", title: "Jacob Fears Esau", icon: "😰", phrases: [
    phrase("📨 Jacob Sent Messengers Before Him", ["Jacob does not wait passively for Esau to appear.", "He sends messengers ahead because the old wound between the brothers must be faced.", "This is not random travel anxiety; Jacob is approaching the brother he deceived.", "The message is careful, respectful, and full of pressure.", "Going home means facing unfinished history.", "Obedience may lead us toward conversations we avoided for years."]),
    phrase("🙇 Thy Servant Jacob", ["Jacob calls Esau lord and calls himself servant.", "That is a striking reversal because Jacob once stole the blessing connected to rule over his brother.", "His language now comes low instead of grasping high.", "The words may be strategic, but they also show how fear and guilt have humbled him.", "Jacob is not approaching Esau with swagger.", "The man who grabbed now sends words of deference."]),
    phrase("🐂 I Have Oxen", ["Jacob tells Esau about his wealth, but not to boast.", "He is trying to show that he is not coming to take anything from Esau.", "The message says, I have enough; I am not arriving as a threat to your household.", "Jacob is trying to reduce Esau's suspicion before they meet face to face.", "Property details can carry relational meaning in Genesis.", "Wise peacemaking often considers what the other person may fear."]),
    phrase("⚔️ Four Hundred Men", ["The messengers return with a terrifying report: Esau is coming with four hundred men.", "Genesis does not tell Jacob Esau's motive yet, so the uncertainty lands hard.", "Four hundred men sounds like a fighting force, not a casual greeting party.", "Jacob's fear is understandable because the last known Esau wanted him dead.", "Fear grows in the gap between facts and interpretation.", "Jacob must now live between God's promise and a report that sounds dangerous."]),
    phrase("✂️ Divided The People", ["Jacob divides his household into two camps so one might escape if Esau attacks.", "This is practical crisis planning, but it also shows how afraid he is.", "The man who just saw God's camp now divides his own camp.", "Genesis is honest about the way faith and fear can exist in the same person.", "Jacob plans before he prays in the next section.", "Fear often tries to preserve life by controlling every possible outcome."]),
  ] },
  { chapter: 32, startVerse: 9, endVerse: 12, reference: "Genesis 32:9-12", title: "Jacob Prays In Fear", icon: "🙏", phrases: [
    phrase("🙏 O God Of My Father Abraham", ["Jacob's prayer begins by naming the God of Abraham and Isaac.", "He anchors his fear in the covenant story, not in his own strength.", "This matters because Esau's approach makes Jacob feel small and exposed.", "Prayer helps him remember that his life is tied to promises older than his panic.", "Jacob prays history before he asks for rescue.", "Remembering who God has been can steady us when fear is loud."]),
    phrase("🧭 Return Unto Thy Country", ["Jacob reminds God of the command that sent him home.", "This is not manipulation; it is covenant prayer.", "Jacob is saying, I am on this road because You told me to return.", "That gives his fear a place to stand before God.", "Obedience does not make Jacob fearless.", "When the path God commanded becomes frightening, we can bring the command back to Him in prayer."]),
    phrase("🧎 I Am Not Worthy", ["Jacob confesses that he is not worthy of all God's mercy and faithfulness.", "This is a very different tone from the younger Jacob who grasped for advantage.", "He knows he crossed the Jordan with only his staff and now returns as two camps.", "Humility rises as he remembers how much God has given him.", "Gratitude and fear meet in the same prayer.", "Honest prayer can admit need without pretending we deserve mercy."]),
    phrase("🪵 With My Staff", ["The staff represents Jacob's earlier poverty and vulnerability.", "He left home with almost nothing, sleeping under the open sky at Bethel.", "Now he returns with family, servants, and flocks.", "The contrast shows how thoroughly God has kept him through the years.", "Jacob measures the journey from one staff to two camps.", "Looking back can remind us that God has carried us through more than we realized."]),
    phrase("🛡️ Deliver Me, I Pray Thee", ["Jacob finally names his fear plainly: he is afraid Esau will strike him and the family.", "This is not polished religious language hiding panic.", "He asks directly for rescue because the threat feels real.", "Prayer becomes the place where fear is told the truth before God.", "Jacob does not pretend courage he does not have.", "Bible faith can sound like trembling honesty."]),
    phrase("✨ Thou Saidst, I Will Surely Do Thee Good", ["Jacob ends by holding onto God's promise to do him good and multiply his descendants.", "The promise does not erase the danger, but it gives Jacob something stronger than the danger to hold.", "He is learning to argue from God's word, not from his own record.", "That is important because Jacob's record with Esau is complicated.", "Jacob's hope rests on what God said.", "When guilt and fear speak loudly, God's promise must speak louder."]),
  ] },
  { chapter: 32, startVerse: 13, endVerse: 16, reference: "Genesis 32:13-16", title: "Jacob Prepares A Gift", icon: "🎁", phrases: [
    phrase("🎁 Took Of That Which Came To His Hand", ["Jacob prepares a large gift from what God has given him.", "The gift is not tiny or symbolic; it is costly and carefully selected.", "He is trying to meet old anger with visible humility and restitution-like generosity.", "This does not undo the deception, but it shows he is not coming empty-handed.", "Peacemaking may require more than words.", "Jacob's wealth becomes a tool for repair instead of only a sign of success."]),
    phrase("🐐 Two Hundred She Goats", ["Genesis lists the animals slowly so readers feel the size of the gift.", "Goats, sheep, camels, cattle, and donkeys are all part of Jacob's offering.", "This is a major portion of mobile wealth in that world.", "Jacob is sending abundance ahead of himself because he fears Esau's face.", "The detailed list makes the gift concrete.", "Real reconciliation often costs something visible."]),
    phrase("📦 Every Drove By Themselves", ["Jacob separates the animals into different droves.", "The arrangement creates repeated waves of generosity before he arrives.", "He is not only giving a gift; he is shaping the encounter Esau will experience.", "Jacob is thinking carefully about how anger might soften over time.", "Strategy is part of Jacob's response, even after prayer.", "Trusting God does not mean refusing wise preparation."]),
  ] },
  { chapter: 32, startVerse: 17, endVerse: 21, reference: "Genesis 32:17-21", title: "The Present Goes Before Jacob", icon: "📦", phrases: [
    phrase("❓ Whose Art Thou", ["Jacob anticipates Esau's questions and coaches his servants carefully.", "He knows the first words Esau hears will shape the meeting.", "The repeated script is designed to communicate humility, peace, and distance from threat.", "Jacob is trying to answer suspicion before it hardens.", "Careful words matter when relationships are fragile.", "Repair often requires thoughtfulness before the face-to-face moment."]),
    phrase("🙇 Thy Servant Jacob's", ["Again Jacob takes the lower position in the language he sends to Esau.", "The gift is from Jacob the servant to Esau the lord.", "This reverses the old pattern of grabbing for status.", "Whether from fear, humility, or both, Jacob is no longer speaking like a man entitled to dominate.", "Repeated humility becomes part of the message.", "Jacob is learning that blessing does not have to be held with arrogance."]),
    phrase("🕊️ I Will Appease Him", ["Jacob hopes the gift will cover or soften Esau's anger.", "The word carries the idea of turning away wrath.", "Jacob knows he cannot demand forgiveness; he can only approach humbly and seek peace.", "The scene is emotionally honest because guilt makes the meeting feel dangerous.", "Jacob wants Esau's face to change toward him.", "When we have wronged someone, we cannot control their response, but we can approach with humility."]),
    phrase("🌙 Lodged That Night In The Company", ["Jacob sends the present ahead, but he remains behind for the night.", "The delay creates space before the most important encounter.", "He has prayed, planned, and sent gifts, but something deeper still has to happen.", "Genesis is slowing the story because Jacob himself is about to be confronted by God.", "Before Jacob faces Esau, he must face God.", "The night is not empty waiting; it becomes the doorway to transformation."]),
  ] },
  { chapter: 32, startVerse: 22, endVerse: 25, reference: "Genesis 32:22-25", title: "Jacob Wrestles At Night", icon: "🤼", phrases: [
    phrase("🌙 Rose Up That Night", ["Jacob moves his family across the ford under cover of night.", "The scene feels tense, private, and vulnerable.", "He is still managing danger, but the story is moving him toward solitude.", "Everything and everyone will be sent across until Jacob is left alone.", "The wrestling scene begins with separation.", "Some encounters with God happen when our supports are out of reach."]),
    phrase("🌊 The Ford Jabbok", ["The Jabbok crossing is both a real place and a turning point.", "Jacob is between Laban behind him and Esau ahead of him.", "Crossing water often marks movement into a new stage of the journey.", "Here the crossing leads into a night that will rename him.", "Geography and transformation meet at the river.", "God often meets people at thresholds, when the old season is ending and the next one is frightening."]),
    phrase("🧍 Jacob Was Left Alone", ["This is one of the most important lines in Jacob's story.", "The schemer, planner, husband, father, and wealthy shepherd is now alone in the dark.", "No servant can speak for him and no gift can protect him here.", "The deeper issue is not Esau yet; it is Jacob before God.", "God strips the scene down to one man.", "Transformation often begins when we cannot hide inside roles or strategies."]),
    phrase("🤼 There Wrestled A Man With Him", ["A mysterious man wrestles Jacob until daybreak.", "Genesis does not explain everything immediately, which makes the scene feel holy and strange.", "Jacob is not merely thinking about God; he is physically struggling through the night.", "The struggle fits his whole life: Jacob has been wrestling since the womb.", "The Bible lets mystery remain in the encounter.", "God can meet a person in struggle, not only in quiet comfort."]),
    phrase("🦵 The Hollow Of Jacob's Thigh", ["The man touches Jacob's hip and disables his strength.", "Jacob can no longer rely on the same physical power with which he wrestled.", "The wound is not random cruelty; it marks the limit of Jacob's self-reliance.", "He will leave blessed, but also limping.", "The blessing comes with weakness.", "Sometimes God changes us by touching the place we thought made us strong."]),
  ] },
  { chapter: 32, startVerse: 26, endVerse: 29, reference: "Genesis 32:26-29", title: "Jacob Receives A New Name", icon: "✨", phrases: [
    phrase("🌅 Let Me Go, For The Day Breaketh", ["The struggle lasts until morning light.", "Jacob has endured the night, but he is now wounded and clinging.", "The request to let go reveals that the encounter is not ordinary.", "Jacob senses that blessing is at stake in this mysterious struggle.", "Daybreak arrives after a night of weakness.", "Some blessings are received through persevering when escape would be easier."]),
    phrase("🙌 I Will Not Let Thee Go", ["Jacob refuses to release the man without a blessing.", "This is not the old grasping for stolen blessing from his father.", "Now Jacob clings openly, wounded and dependent.", "He knows he needs what only God can give.", "Jacob is still tenacious, but the posture has changed.", "God can redeem a person's stubbornness into desperate faith."]),
    phrase("❓ What Is Thy Name", ["The question forces Jacob to say his own name.", "Jacob means heel-grabber or supplanter, and his name carries the story of his striving.", "Before he receives a new name, he must speak the old one.", "This moment brings his identity into the light.", "God does not rename Jacob by pretending the past never happened.", "Transformation begins with truth, not denial."]),
    phrase("🇮🇱 Thy Name Shall Be Called No More Jacob, But Israel", ["The new name Israel marks a new stage in Jacob's life and in the Bible's story.", "He has struggled with God and with men, and he has prevailed by clinging, not by controlling.", "The nation will carry this name, so this private night becomes a public identity for God's people.", "Israel's story begins with a wounded man blessed by God.", "The name is born out of struggle.", "God's people are not named after ease, but after wrestling with God and being held by grace."]),
    phrase("🙈 Wherefore Is It That Thou Dost Ask After My Name", ["Jacob asks for the man's name, but the answer stays mysterious.", "The focus remains on the blessing and the encounter rather than giving Jacob control through a label.", "In the next verses Jacob understands he has encountered God in a profound way.", "The mystery protects the holiness of the moment.", "Jacob receives blessing, not full explanation.", "God may truly meet us without answering every question we want to ask."]),
  ] },
  { chapter: 32, startVerse: 30, endVerse: 32, reference: "Genesis 32:30-32", title: "Peniel And The Limp", icon: "🌅", phrases: [
    phrase("👀 Peniel", ["Jacob names the place Peniel because he says he has seen God face to face.", "This does not mean he has mastered God or fully comprehended Him.", "It means the encounter was real, personal, and life-changing.", "The place name preserves the wonder of surviving holy contact.", "Jacob names the place after God's face, not after his own victory.", "The deepest memory of the night is not pain, but God's presence."]),
    phrase("🛟 My Life Is Preserved", ["Jacob is amazed that he lives after the encounter.", "The line carries relief, awe, and humility.", "He entered the night fearing Esau's violence, but he leaves knowing God has dealt with him first.", "Survival itself feels like mercy.", "Jacob does not treat the encounter casually.", "Real meetings with God produce reverence, not spiritual bragging."]),
    phrase("🦯 He Halted Upon His Thigh", ["Jacob walks into the sunrise limping.", "The limp is a visible reminder that the blessing changed his body and his walk.", "He will meet Esau as a wounded man, not as the untouchable schemer of old.", "The weakness becomes part of his testimony.", "Genesis lets the wound remain after the blessing.", "God may heal our direction while leaving a mark that keeps us humble."]),
    phrase("🍖 The Sinew Which Shrank", ["The final note explains why Israel remembered this part of the hip.", "A personal encounter becomes a community memory.", "The people who descend from Jacob remember that their name began with a wound and a blessing.", "Even eating customs can carry story and theology.", "Israel's memory is tied to Jacob's weakness.", "God's people are meant to remember that their story depends on mercy, not muscle."]),
  ] },
  { chapter: 33, startVerse: 1, endVerse: 4, reference: "Genesis 33:1-4", title: "Esau Runs To Jacob", icon: "😭", phrases: [
    phrase("👀 Jacob Lifted Up His Eyes", ["The feared moment finally arrives: Jacob sees Esau coming.", "The four hundred men are real, not imagined.", "Jacob must now step from planning into encounter.", "Everything he prayed about is standing in front of him.", "Faith eventually has to face the thing it feared.", "Prayer prepares Jacob, but it does not remove the need to walk forward."]),
    phrase("🛡️ Divided The Children", ["Jacob arranges the family as Esau approaches.", "The order reflects both fear and favoritism, with Rachel and Joseph placed last.", "Even after wrestling with God, Jacob is still a complicated man.", "Transformation has begun, but old patterns are not magically erased in one morning.", "Genesis is honest about gradual growth.", "A real encounter with God changes us, but we may still need to confront old habits."]),
    phrase("🙇 Bowed Himself To The Ground Seven Times", ["Jacob bows repeatedly as he approaches Esau.", "This is a dramatic posture of humility.", "The brother who once grasped for superiority now lowers himself before the one he wronged.", "His body speaks apology before the conversation begins.", "Jacob approaches with lowered posture, not demands.", "Humility is often the first language of repair."]),
    phrase("🏃 Esau Ran To Meet Him", ["Esau's response is shockingly tender after years of fear.", "He runs, embraces Jacob, falls on his neck, kisses him, and they weep.", "The scene releases tension built since Genesis 27.", "The brother Jacob feared as executioner meets him like family.", "Esau's embrace is more generous than Jacob expected.", "Fear can imagine only punishment, but God can prepare mercy we did not see coming."]),
  ] },
  { chapter: 33, startVerse: 5, endVerse: 7, reference: "Genesis 33:5-7", title: "Jacob's Family Comes Near", icon: "👨‍👩‍👧‍👦", phrases: [
    phrase("👨‍👩‍👧‍👦 Who Are Those With Thee", ["Esau sees the family Jacob gained during the years away.", "The question brings Jacob's hidden life into Esau's view.", "Jacob did not return as the same young man who fled home.", "He returns with wives, children, servants, wounds, wealth, and a limp.", "Time has changed both brothers' circumstances.", "Reconciliation often happens between people who are not exactly who they were when the wound began."]),
    phrase("🎁 The Children Which God Hath Graciously Given", ["Jacob describes his children as gracious gifts from God.", "That language matters after Genesis 30's painful rivalry around birth.", "The family was formed through messy circumstances, but Jacob still recognizes grace.", "He does not present the children as trophies of his success.", "Jacob names grace over a complicated household.", "God's gifts can be real even when the family story around them is painful."]),
    phrase("🙇 They Bowed Themselves", ["The mothers and children come near and bow before Esau.", "The whole household participates in the humble approach.", "This is not only Jacob's private repair; the family future is affected by this meeting.", "If Esau responds violently, everyone is in danger.", "Family conflict rarely stays between only two people.", "Peace between brothers can protect generations standing behind them."]),
  ] },
  { chapter: 33, startVerse: 8, endVerse: 11, reference: "Genesis 33:8-11", title: "The Gift Is Received", icon: "🎁", phrases: [
    phrase("🎁 What Meanest Thou By All This Drove", ["Esau asks about the waves of gifts Jacob sent ahead.", "The question lets Jacob explain the purpose openly.", "The animals were not random wealth; they were a peace offering in motion.", "Jacob wanted favor because he feared the old anger.", "The gift now becomes conversation.", "Repair sometimes needs clear words after costly action."]),
    phrase("🕊️ To Find Grace In The Sight Of My Lord", ["Jacob says the gift was meant to find grace in Esau's eyes.", "He is seeking favor, not demanding rights.", "The phrase shows the emotional center of the scene: Jacob wants Esau's face to turn toward him kindly.", "This matters because Jacob has just named Peniel after seeing God's face.", "Face language connects the God encounter and the brother encounter.", "After meeting God, Jacob can face Esau with humility and hope."]),
    phrase("🤲 I Have Enough", ["Esau first refuses the gift because he says he has enough.", "That answer is surprising because Jacob feared Esau would come as an enemy.", "Esau does not appear desperate for Jacob's goods.", "His refusal suggests that the meeting is not driven by greed.", "Esau is more free than Jacob expected.", "The story allows Esau to show real generosity in this moment."]),
    phrase("👀 I Have Seen Thy Face, As Though I Had Seen The Face Of God", ["Jacob compares Esau's gracious face to seeing God's face.", "This is not saying Esau is God, but that Esau's mercy feels like divine kindness breaking into the moment.", "Jacob expected death and received welcome.", "The phrase connects Peniel to reconciliation.", "God's mercy is reflected through a brother's unexpected embrace.", "Sometimes God's grace reaches us through the face of someone we feared."]),
    phrase("✅ He Took It", ["Esau finally accepts the gift.", "That acceptance matters because it gives Jacob's peace offering a landing place.", "The gift does not buy forgiveness, but receiving it helps seal the restored relationship in that moment.", "Jacob's fear begins to settle because Esau does not reject him.", "Acceptance can communicate peace where words alone might feel thin.", "Reconciliation often needs both humble giving and gracious receiving."]),
  ] },
  { chapter: 33, startVerse: 12, endVerse: 17, reference: "Genesis 33:12-17", title: "Jacob Moves Carefully Forward", icon: "🧭", phrases: [
    phrase("🚶 Let Us Take Our Journey", ["Esau offers to travel with Jacob.", "The invitation sounds friendly after the emotional reunion.", "But Jacob moves carefully because his household includes children, nursing flocks, and many vulnerable people.", "Peace has happened, but Jacob still chooses a measured pace.", "Reconciliation does not require rushing every boundary.", "Wisdom can receive peace and still move carefully."]),
    phrase("🐑 The Flocks And Herds With Young Are With Me", ["Jacob explains that the pace must fit the weakest members of the group.", "The young animals and children cannot be driven hard.", "This is a tender leadership moment after many scenes of fear and strategy.", "Jacob is thinking like a shepherd and father.", "The strong must not set a pace that crushes the vulnerable.", "Godly movement considers who might be harmed by hurry."]),
    phrase("🎖️ Let Me Leave With Thee Some Of The Folk", ["Esau offers some of his people to accompany Jacob.", "Jacob declines politely, asking only to find grace in Esau's sight.", "The brothers part peacefully, but they do not merge households.", "That distance may be wise given their history and Jacob's responsibilities.", "Peace does not erase distinct paths.", "Some reconciled relationships still need space to remain healthy."]),
    phrase("🏕️ Succoth", ["Jacob journeys to Succoth and builds himself a house and shelters for his livestock.", "The name is connected to booths or shelters.", "After so much movement, hiding, and fear, the word feels like temporary rest.", "Jacob is still not fully settled, but he is no longer running from Laban or Esau.", "God gives Jacob a pause after the fearful meeting.", "After intense conflict, shelter can be a mercy."]),
  ] },
  { chapter: 33, startVerse: 18, endVerse: 20, reference: "Genesis 33:18-20", title: "Jacob Builds An Altar", icon: "⛺", phrases: [
    phrase("🏙️ Came In Peace To The City Of Shechem", ["Jacob reaches Shechem in the land of Canaan in peace.", "That phrase matters because the return journey could have ended in violence with Laban or Esau.", "God has brought Jacob back into the land alive.", "The promise of presence has held through conflict, fear, wrestling, and reunion.", "Peace is named after a journey full of danger.", "God's faithfulness becomes clearer when we remember what He carried Jacob through."]),
    phrase("💰 Bought A Parcel Of A Field", ["Jacob buys land near Shechem, echoing Abraham's purchase of a burial field earlier in Genesis.", "The promise family still does not own the whole land, but they gain a real foothold.", "The purchase shows Jacob acting responsibly in the land of promise.", "It also prepares the setting for the next chapter's painful events.", "Land details in Genesis are covenant details.", "Small footholds can matter deeply in God's long story."]),
    phrase("⛪ Erected There An Altar", ["Jacob builds an altar after arriving in the land.", "Worship marks the end of this return movement.", "The man who met God at Bethel and Peniel now publicly honors God in Canaan.", "The altar says the journey is not merely about survival; it is about belonging to God.", "Arrival leads to worship.", "When God brings us through fear, the right response is not just relief, but worship."]),
    phrase("💪 El Elohe Israel", ["The altar name means God, the God of Israel.", "This is powerful because Israel is Jacob's new name.", "Jacob is now worshiping the God who renamed him in the night.", "The name ties identity, worship, and covenant together.", "Jacob's new name becomes part of his altar confession.", "The God who changes our walk also teaches us to worship with a changed identity."]),
  ] },
];

const DAY_14_GENESIS_34_36_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 34, startVerse: 1, endVerse: 4, reference: "Genesis 34:1-4", title: "Dinah Is Violated", icon: "💔", phrases: [
    phrase("💔 Dinah The Daughter Of Leah", ["Genesis names Dinah as Leah's daughter, which matters after Leah's long story of feeling unloved.", "Dinah is not a background detail or a prop in the brothers' anger.", "She is a daughter inside Jacob's household, and what happens to her is treated as serious harm.", "The chapter should be read slowly and carefully because Scripture is showing family brokenness without hiding it.", "The text begins with Dinah, not with the men's negotiations.", "Bible Buddy should help readers see the harmed person before the political fallout."]),
    phrase("🚶 Went Out To See The Daughters Of The Land", ["The verse says Dinah went out, but it does not blame Dinah for what follows.", "The focus of the passage falls on Shechem's action, not on accusing Dinah.", "That matters because readers can sometimes rush to ask what a victim did instead of naming what was done to them.", "Genesis keeps the moral weight on the violation.", "Going out to see the women of the land is not presented as sin.", "We should be careful not to place blame where Scripture does not place it."]),
    phrase("⚠️ He Took Her", ["The verbs are forceful: Shechem saw, took, lay with, and humbled Dinah.", "This is not romantic pursuit first; it is violation first.", "Later tender words do not erase the harm already done.", "Genesis is honest about the confusion of sin, desire, power, and speech after damage has happened.", "The text names action before emotion.", "Affection after harm does not make the harm righteous."]),
    phrase("🗣️ Spoke Kindly Unto The Damsel", ["Shechem speaks tenderly after violating Dinah, and that can feel jarring.", "The Bible is not telling us the words fixed what happened.", "It is showing how someone can mix wrong actions with soft language.", "This helps readers avoid confusing tenderness with justice.", "Kind-sounding speech can appear after serious evil.", "Repentance and repair require more than affectionate words."]),
  ] },
  { chapter: 34, startVerse: 5, endVerse: 7, reference: "Genesis 34:5-7", title: "Jacob's Sons Hear The News", icon: "😡", phrases: [
    phrase("🤐 Jacob Held His Peace", ["Jacob hears that Dinah has been defiled, but he waits until his sons return.", "The silence is uncomfortable because the reader wants protection, clarity, and care for Dinah.", "Genesis does not explain all Jacob's motives here.", "It simply lets the quiet sit heavily in the story.", "Silence can become part of the pain in a wounded family.", "The chapter is showing more than Shechem's sin; it is showing a household under strain."]),
    phrase("😡 The Men Were Grieved, And Very Wroth", ["Jacob's sons respond with grief and anger.", "Their anger has a real reason because Dinah has been seriously wronged.", "But Genesis will soon show that justified anger can still become sinful revenge.", "The emotion begins in moral outrage, but it does not stay pure.", "Grief and wrath are paired together.", "Anger over evil must still be governed by righteousness."]),
    phrase("🏠 Folly In Israel", ["This phrase gives moral weight to what Shechem did.", "The act is not treated as ordinary romance, local custom, or a private misunderstanding.", "Calling it folly in Israel means it is disgraceful and covenantally serious.", "Even before Israel is a nation, Genesis is using language that points toward the holiness of God's people.", "The Bible names the evil plainly.", "Scripture does not minimize sexual violation."]),
  ] },
  { chapter: 34, startVerse: 8, endVerse: 12, reference: "Genesis 34:8-12", title: "Hamor And Shechem Negotiate", icon: "🤝", phrases: [
    phrase("💬 Hamor Communed With Them", ["Hamor steps into the crisis as a negotiator for his son.", "His words try to turn a moral wrong into a family arrangement.", "That is one of the disturbing movements in the chapter: damage becomes a deal to be discussed by men.", "Dinah's harm risks being swallowed by politics, marriage, and economics.", "Negotiation can hide the person who was hurt.", "Practical solutions must never erase justice and care."]),
    phrase("❤️ His Soul Longeth For Your Daughter", ["Hamor describes Shechem's desire as longing for Dinah.", "But the language of desire comes after the violation, so it cannot redefine the act as love.", "The Bible is showing a man who wants possession after doing harm.", "Wanting someone is not the same as honoring them.", "Shechem's desire is not enough to make the situation right.", "Love cannot be measured by intensity if it ignores righteousness."]),
    phrase("🏙️ The Land Shall Be Before You", ["Hamor offers intermarriage, land access, trade, and possessions.", "He presents the crisis as an opportunity for partnership between peoples.", "But the offer comes without first addressing the evil done to Dinah.", "Economic opportunity is being placed beside moral injury.", "Prosperity language can become a distraction from justice.", "A profitable arrangement is not righteous if it walks past the wounded."]),
    phrase("💰 Ask Me Never So Much Dowry", ["Shechem offers to pay whatever bride price and gift they request.", "The offer sounds generous, but money cannot undo violation.", "Payment may belong to marriage customs, but this situation is not clean courtship.", "Genesis keeps the tension between cultural negotiation and moral wrong.", "Shechem wants the outcome without truly reckoning with the harm.", "Restitution cannot be reduced to a transaction when a person has been dishonored."]),
  ] },
  { chapter: 34, startVerse: 13, endVerse: 17, reference: "Genesis 34:13-17", title: "Jacob's Sons Answer Deceitfully", icon: "🕳️", phrases: [
    phrase("🕳️ Answered Shechem And Hamor Deceitfully", ["The narrator tells us plainly that Jacob's sons answer with deceit.", "Their anger may have a cause, but their method is already morally crooked.", "This is another echo of Jacob's family pattern: deception keeps appearing across generations.", "They are responding to sin with sin.", "Genesis does not let the brothers' motive excuse their deceit.", "Being wronged does not give us permission to become false."]),
    phrase("✂️ Be Circumcised", ["The brothers use circumcision as the condition for agreement.", "Circumcision was the sign of God's covenant with Abraham's family.", "Using that holy sign as part of a trap is deeply serious.", "They take something sacred and weaponize it for revenge.", "Religious language can be misused by angry hearts.", "A covenant sign should never be turned into a tool of manipulation."]),
    phrase("👥 We Will Become One People", ["The brothers speak as if full union with Shechem's city is possible.", "But the reader already knows they are speaking deceitfully.", "Their words promise community while their hearts plan destruction.", "This doubles the wrong because trust is being invited and then exploited.", "The outside words and inside intent do not match.", "False peace can be more dangerous than open conflict."]),
  ] },
  { chapter: 34, startVerse: 18, endVerse: 20, reference: "Genesis 34:18-20", title: "Hamor And Shechem Persuade The City", icon: "🏙️", phrases: [
    phrase("✅ Their Words Pleased Hamor", ["Hamor and Shechem accept the proposal because they think it will secure the marriage and alliance.", "They do not know the brothers are setting a trap.", "The scene shows how deception can sound reasonable when the hidden motive is concealed.", "Everyone is moving toward disaster under the appearance of agreement.", "Pleasing words are not always truthful words.", "Genesis is letting the reader feel the danger of hidden intent."]),
    phrase("⚡ He Was More Honourable Than All The House", ["Shechem is described as honored in his father's house, but the chapter has already shown his serious sin.", "Social honor does not equal moral innocence.", "A person can have status in the city and still do what is evil.", "Genesis keeps social reputation and righteousness separate.", "The text can acknowledge status without excusing wrongdoing.", "We should not confuse public importance with godly character."]),
  ] },
  { chapter: 34, startVerse: 21, endVerse: 24, reference: "Genesis 34:21-24", title: "The Men Of The City Agree", icon: "💼", phrases: [
    phrase("💼 Shall Not Their Cattle And Substance Be Ours", ["Hamor and Shechem persuade the men of the city by pointing to economic gain.", "The alliance is sold as a way to access Jacob's livestock and possessions.", "That exposes greed beneath the proposal.", "The city agrees partly because the arrangement sounds profitable.", "Both sides are using the covenant family for their own aims.", "When people become a path to possessions, injustice multiplies."]),
    phrase("🚪 All That Went Out Of The Gate", ["The city gate was a place of public decision and civic agreement.", "The men of the city collectively accept the condition of circumcision.", "What began as one man's sin now involves a whole community's vulnerability.", "The public decision will lead to public disaster.", "Leaders can move a whole city into danger.", "Community decisions made for greedy reasons can carry heavy consequences."]),
  ] },
  { chapter: 34, startVerse: 25, endVerse: 29, reference: "Genesis 34:25-29", title: "Simeon And Levi Take Revenge", icon: "⚔️", phrases: [
    phrase("⚔️ Simeon And Levi", ["Simeon and Levi, Dinah's full brothers, become the main actors in the revenge.", "Their connection to Dinah explains the intensity of their anger.", "But Genesis will not present the massacre as righteous justice.", "The brothers move from defending honor to destroying a city.", "Closeness to the victim does not make every response holy.", "Grief can be real and vengeance can still be wrong."]),
    phrase("🩸 Slew All The Males", ["The violence is sweeping and terrible.", "Simeon and Levi kill the men while they are weakened from the circumcision they agreed to under deceit.", "The covenant sign has been turned into the setup for bloodshed.", "This is one of the darkest examples of religion being misused in Genesis.", "The text records the violence without celebrating it.", "Revenge can become its own injustice."]),
    phrase("🏠 Took Dinah Out", ["The brothers remove Dinah from Shechem's house.", "That action shows they have not forgotten her, but the method around it is devastating.", "Dinah's rescue is surrounded by deceit, murder, plunder, and future shame.", "Genesis keeps the scene morally complicated rather than simple.", "Helping someone cannot justify every action taken in their name.", "Righteous concern must be carried by righteous means."]),
    phrase("💰 Spoiled The City", ["The sons of Jacob plunder the city after the killings.", "The revenge expands into taking flocks, goods, wives, and children.", "This goes far beyond confronting Shechem's sin.", "The brothers become agents of widespread harm.", "Anger that begins with justice can become appetite.", "Unchecked wrath often takes more than it first claimed to defend."]),
  ] },
  { chapter: 34, startVerse: 30, endVerse: 31, reference: "Genesis 34:30-31", title: "Jacob Fears The Consequences", icon: "😨", phrases: [
    phrase("😨 Ye Have Troubled Me", ["Jacob responds by focusing on the danger his sons have created for the family.", "He fears the surrounding peoples will gather against them.", "His concern is practical and real, but his words can also feel painfully limited after Dinah's harm.", "The family is now morally and politically exposed.", "Sin creates consequences beyond the first act.", "Jacob's household is not healthy simply because Jacob has a new name."]),
    phrase("🗡️ Should He Deal With Our Sister As With A Harlot", ["Simeon and Levi answer with a piercing question about Dinah's dishonor.", "Their question names the wrong that Jacob's response did not center.", "Yet the question does not justify everything they did.", "Genesis leaves readers holding both truths: Dinah was wronged, and the brothers' revenge was also wrong.", "The chapter ends unresolved.", "The Bible is mature enough to show pain without wrapping it in a neat answer."]),
  ] },
  { chapter: 35, startVerse: 1, endVerse: 4, reference: "Genesis 35:1-4", title: "Put Away The Strange Gods", icon: "🧹", phrases: [
    phrase("⬆️ Arise, Go Up To Bethel", ["After the disaster of Genesis 34, God calls Jacob back to Bethel.", "Bethel is where God met Jacob when he fled from Esau years earlier.", "The call is not only geographical; it is spiritual return.", "Jacob must lead his household back toward worship after a chapter of violence and defilement.", "God calls Jacob upward after family collapse.", "Renewal begins by returning to the place of God's promise."]),
    phrase("🧹 Put Away The Strange Gods", ["Jacob finally addresses the foreign gods in the household.", "This connects back to Rachel stealing Laban's household idols in Genesis 31.", "The problem has been traveling with them, and now it must be buried.", "Going to Bethel requires cleansing, not just movement.", "Worship and idolatry cannot be comfortably carried together.", "Returning to God often means letting go of what we kept hidden."]),
    phrase("🧼 Be Clean, And Change Your Garments", ["Jacob calls for outward actions that express inward preparation.", "Cleanliness and changed garments signal a fresh approach to God.", "The family cannot undo Genesis 34, but they can respond to God's call with repentance and reverence.", "The scene feels like a household reset.", "God does not abandon Jacob's family, but He does call them to purification.", "Grace does not ignore uncleanness; it invites cleansing."]),
    phrase("🌳 Hid Them Under The Oak", ["The idols and earrings are buried under the oak by Shechem.", "The hiding place marks a break with the old objects they had carried.", "This is not merely storage; it is a symbolic burial of false loyalties.", "The family leaves behind what should not go to Bethel with them.", "Repentance becomes visible in what they surrender.", "Some spiritual turning points need a clear burial of the old attachments."]),
  ] },
  { chapter: 35, startVerse: 5, endVerse: 8, reference: "Genesis 35:5-8", title: "God Protects The Journey To Bethel", icon: "🛡️", phrases: [
    phrase("🛡️ The Terror Of God", ["As Jacob's family travels, God puts fear on the surrounding cities.", "That protection matters because Genesis 34 made the family vulnerable to retaliation.", "Jacob feared being attacked, but God restrains the peoples around them.", "The family reaches Bethel because God guards the road.", "God protects them even after their household's failure.", "Mercy can preserve people who still need deep correction."]),
    phrase("📍 Came To Luz, Which Is Bethel", ["Jacob arrives at the place where God first appeared to him during exile.", "The old place now becomes a place of return.", "God's faithfulness has carried Jacob through Laban, Esau, Shechem, and family chaos.", "Bethel reminds the reader that God has kept His word.", "The story circles back to a holy memory.", "Returning to worship helps us remember how long God has been faithful."]),
    phrase("⛪ Built There An Altar", ["Jacob builds an altar at Bethel as God commanded.", "This is the right response after protection and return.", "The altar marks worship, gratitude, and renewed obedience.", "Jacob's household needs more than survival; it needs God at the center again.", "The altar comes after the idols are buried.", "True worship is not an add-on to repentance; it follows it."]),
    phrase("😭 Deborah Rebekah's Nurse Died", ["The death of Deborah adds grief to the return to Bethel.", "She connects Jacob's story back to Rebekah's household and the older generation.", "Her burial under the oak of weeping reminds us that covenant journeys include sorrow.", "Even holy places can hold tears.", "Genesis places worship and mourning close together.", "Returning to God does not mean grief disappears."]),
  ] },
  { chapter: 35, startVerse: 9, endVerse: 12, reference: "Genesis 35:9-12", title: "God Confirms Jacob's Name", icon: "✨", phrases: [
    phrase("✨ God Appeared Unto Jacob Again", ["God meets Jacob again after the return from Padan-aram.", "This confirms that Jacob's story is still held by divine grace.", "After family failure, buried idols, and grief, God does not disappear from the narrative.", "He comes again and blesses Jacob.", "God's renewed appearance is mercy.", "Failure is not the end of Jacob's covenant story."]),
    phrase("🇮🇱 Thy Name Shall Not Be Called Any More Jacob", ["God confirms the name Israel that Jacob received after wrestling in Genesis 32.", "The new name is not just a private experience at Peniel; God repeats it publicly in the covenant line.", "Jacob's identity is being reshaped by God's word.", "Still, the chapters show that living into the new name takes time.", "God names Jacob before Jacob fully lives like Israel.", "God often speaks identity over us before our life looks fully healed."]),
    phrase("👑 A Nation And A Company Of Nations", ["God repeats the promise of growth, kings, and peoples from Jacob's line.", "This matters after Genesis 34 because the family looked endangered and morally broken.", "God's promise is not canceled by the mess, but the mess is not ignored either.", "The future of Israel rests on God's faithfulness.", "Promise is spoken over a damaged family.", "God's plan can continue through people who still need correction and grace."]),
    phrase("🌍 The Land Which I Gave Abraham And Isaac", ["The land promise is repeated to Jacob in continuity with Abraham and Isaac.", "This ties Jacob's troubled household to the long covenant story.", "The family may feel unstable, but God's promise remains steady.", "Bethel becomes a place where identity, descendants, and land are reaffirmed.", "God repeats old promises at new turning points.", "When life feels fractured, God's word can reconnect us to the bigger story."]),
  ] },
  { chapter: 35, startVerse: 13, endVerse: 15, reference: "Genesis 35:13-15", title: "Jacob Marks Bethel Again", icon: "🪨", phrases: [
    phrase("⬆️ God Went Up From Him", ["The language shows that Jacob has experienced another real encounter with God.", "The meeting ends, but the place remains marked by memory.", "Genesis treats divine encounters as moments that shape geography and identity.", "Jacob is not left with an idea only; he is left with a place and a promise.", "God's presence turns ordinary ground into remembered ground.", "Worship remembers where God met us."]),
    phrase("🪨 Jacob Set Up A Pillar", ["Jacob sets up a pillar again, echoing Genesis 28.", "The repeated action shows continuity between the fearful young man leaving home and the changed man returning.", "He pours a drink offering and oil on it as worship.", "The old vow scene has come full circle.", "Jacob's worship matures across the journey.", "God can bring us back to earlier promises with deeper understanding."]),
    phrase("📍 Bethel", ["Jacob names the place Bethel, house of God.", "The name holds his first dream, God's promise, his return, and this renewed blessing together.", "Bethel becomes a spiritual landmark in the family story.", "It says God has been faithful from flight to return.", "Place names preserve testimony.", "Bethel reminds readers that God's house is where God graciously meets His people."]),
  ] },
  { chapter: 35, startVerse: 16, endVerse: 20, reference: "Genesis 35:16-20", title: "Rachel Dies Giving Birth", icon: "😭", phrases: [
    phrase("👶 Rachel Travailed", ["Rachel's long story of longing for children reaches a painful final scene.", "She gives birth on the road, not in calm comfort.", "The woman who once cried for children now dies bringing another son into the family.", "Genesis is tender and tragic here.", "Blessing and grief arrive together.", "The promise family grows, but the growth is not painless."]),
    phrase("💔 Benoni", ["Rachel names the child Benoni, son of my sorrow.", "The name comes from the pain of her final moments.", "It lets Rachel's grief speak before Jacob renames the child.", "Her voice is not erased from the story.", "Rachel names the sorrow honestly.", "The Bible gives room for grief to speak truthfully."]),
    phrase("🤲 Benjamin", ["Jacob names the child Benjamin, son of the right hand.", "The new name gives the child a future beyond the sorrow of his birth.", "This does not cancel Rachel's pain, but it refuses to let death be the only word over the child.", "Benjamin will become the youngest son in Jacob's family.", "Sorrow and hope are both present in the naming.", "God can carry future purpose out of a moment marked by loss."]),
    phrase("🪦 The Pillar Of Rachel's Grave", ["Jacob sets a pillar over Rachel's grave.", "Like other stones in Genesis, it preserves memory.", "Rachel's death becomes part of the geography of the promise family.", "The family continues, but the road now carries a permanent wound.", "Jacob marks grief, not only worship.", "Faithful people remember losses instead of pretending they did not matter."]),
  ] },
  { chapter: 35, startVerse: 21, endVerse: 22, reference: "Genesis 35:21-22", title: "Reuben's Sin", icon: "⚠️", phrases: [
    phrase("⛺ Israel Journeyed", ["After Rachel's burial, Jacob continues moving.", "The text calls him Israel here, reminding us of his new name.", "But the next event shows the family is still deeply broken.", "A changed name does not mean a painless household.", "The journey continues through grief and sin.", "Spiritual identity does not remove the need for family holiness."]),
    phrase("⚠️ Reuben Went And Lay With Bilhah", ["Reuben's act is a serious sexual and family violation.", "Bilhah was Rachel's servant and Jacob's concubine, so this is not a small private sin.", "In ancient family terms, it also challenges his father's household authority.", "Genesis states it briefly, but the damage is heavy.", "The firstborn son brings shame into the family line.", "Unaddressed family disorder keeps producing new wounds."]),
    phrase("👂 Israel Heard It", ["The verse says Israel heard, but gives no immediate speech from him.", "That silence feels heavy, especially after the silence in Genesis 34.", "Later Scripture will remember Reuben's sin when Jacob blesses his sons.", "The consequence is delayed, not erased.", "Brief lines can carry long shadows.", "Some sins are named quickly in the moment but echo later in the story."]),
  ] },
  { chapter: 35, startVerse: 23, endVerse: 26, reference: "Genesis 35:23-26", title: "The Twelve Sons Of Jacob", icon: "📜", phrases: [
    phrase("👥 The Sons Of Jacob Were Twelve", ["Genesis gathers Jacob's sons into a list after many painful birth stories.", "These twelve sons will become the roots of Israel's tribes.", "The list is not clean or idealized; it includes sons born through rivalry, pain, servants, favoritism, and sin.", "Yet God is still forming the people of Israel through them.", "The twelve are named after chapters of family complexity.", "God's covenant people begin with grace, not perfection."]),
  ] },
  { chapter: 35, startVerse: 27, endVerse: 29, reference: "Genesis 35:27-29", title: "Isaac Dies Full Of Days", icon: "🪦", phrases: [
    phrase("🏕️ Jacob Came Unto Isaac His Father", ["Jacob finally returns to Isaac, the father he deceived years earlier.", "The text does not give a long reunion scene, but the return matters.", "The exile that began with deception has now come full circle.", "Jacob is back in the land and back near the family line.", "Genesis quietly closes a long arc.", "God's faithfulness can bring a person back after years of consequence."]),
    phrase("🪦 Isaac Gave Up The Ghost", ["Isaac dies old and full of days.", "His story has stretched from miraculous birth to old age.", "The death marks a generational transition: Abraham and Isaac are gone, and Jacob's line moves forward.", "Genesis keeps showing that the promise survives the death of each patriarch.", "Covenant promises outlive covenant people.", "God's plan does not die when one generation finishes its race."]),
    phrase("🤝 Esau And Jacob Buried Him", ["Esau and Jacob bury Isaac together.", "After years of fear and separation, the brothers stand at their father's grave.", "This small detail matters because it shows a measure of peace between them.", "The family story remains complicated, but not without mercy.", "Burial becomes a shared act between once-divided brothers.", "God can leave signs of reconciliation even in families with painful histories."]),
  ] },
  { chapter: 36, startVerse: 1, endVerse: 5, reference: "Genesis 36:1-5", title: "The Generations Of Esau", icon: "📜", phrases: [
    phrase("📜 These Are The Generations Of Esau", ["Genesis now turns to Esau's line before moving toward Joseph.", "This is not filler; it shows that Esau also becomes a real people with land, chiefs, and history.", "The Bible tracks related nations because Israel's story is lived among neighbors and relatives.", "Esau's line will matter later as Edom.", "Genesis gives Esau a genealogy, not silence.", "People outside the main covenant line still matter in the biblical story."]),
    phrase("🏷️ Esau, Who Is Edom", ["The phrase connects the person Esau to the nation Edom.", "A family story is becoming a national story.", "This helps readers understand later Bible conflict between Israel and Edom.", "The roots of that relationship begin here in Genesis.", "Names prepare readers for future Scripture.", "Genealogies often explain why later nations relate the way they do."]),
  ] },
  { chapter: 36, startVerse: 6, endVerse: 8, reference: "Genesis 36:6-8", title: "Esau Settles In Seir", icon: "🏔️", phrases: [
    phrase("🐄 Their Substance Was Too Great", ["Esau and Jacob both have so many possessions that they cannot dwell together.", "This echoes Abraham and Lot, where wealth created separation pressure.", "The separation is practical, not necessarily hostile in this moment.", "God has provided abundantly for both brothers.", "Blessing can require boundaries and separate space.", "Peace sometimes means living apart without hatred."]),
    phrase("⛰️ Mount Seir", ["Esau settles in Mount Seir, outside Jacob's direct line in Canaan.", "His land becomes associated with Edom.", "This shows God's earlier word that the brothers would become distinct peoples.", "Esau's story has a place, direction, and future.", "Geography turns family separation into national identity.", "Where people settle in Genesis often shapes what they become later."]),
  ] },
  { chapter: 36, startVerse: 9, endVerse: 14, reference: "Genesis 36:9-14", title: "Esau's Sons In Seir", icon: "👨‍👩‍👦", phrases: [
    phrase("🏔️ Father Of The Edomites In Mount Seir", ["Esau is called father of the Edomites in Mount Seir.", "This makes the genealogy more than a family list; it is nation-building language.", "The descendants are being located in a real place with a future identity.", "Genesis wants readers to know where Edom came from.", "Family, land, and nation are tied together.", "Genesis is preparing the map for later biblical history."]),
    phrase("👶 The Sons Of Esau", ["The names of Esau's sons show his household taking shape across different family lines.", "These names can feel distant, but they represent real branches of a people group.", "Genesis records them because Esau's story does not vanish when Jacob's story continues.", "The covenant line is focused, but the wider family tree is still remembered.", "God allows the non-chosen brother to grow into a people.", "Election in Genesis is not the same thing as pretending everyone else is unreal."]),
    phrase("🌿 Timna Was Concubine", ["Timna appears in the genealogy as connected to Eliphaz and Amalek.", "This small note matters because Amalek later becomes a major enemy of Israel.", "Genesis plants seeds that later books will develop.", "A name that looks minor now becomes important in biblical memory.", "Genealogies can hide future storylines in plain sight.", "Slow reading helps readers catch connections that quick reading misses."]),
  ] },
  { chapter: 36, startVerse: 15, endVerse: 19, reference: "Genesis 36:15-19", title: "The Chiefs Of Esau", icon: "👑", phrases: [
    phrase("👑 Dukes Of The Sons Of Esau", ["The word dukes or chiefs shows organized leadership among Esau's descendants.", "The family is not staying small and private.", "It is becoming structured, tribal, and politically recognizable.", "Edom is growing into a people with leaders.", "Genesis is showing development from household to nation.", "Family choices can become community structures over time."]),
    phrase("📍 According To Their Places", ["The chiefs are named according to their places.", "That means the genealogy is also mapping territory and settlement.", "People and land belong together in this record.", "The Bible is helping later readers understand Edom's roots.", "This is not random name-dropping.", "Genealogies often preserve geography as well as ancestry."]),
    phrase("🏷️ These Are The Sons Of Esau, Who Is Edom", ["The repeated statement keeps reminding readers that Esau and Edom are connected.", "Genesis repeats it because it matters for later Scripture.", "The brother of Jacob becomes the ancestor of a neighboring nation.", "That future relationship will carry both kinship and conflict.", "Repetition signals importance.", "When Genesis repeats a name connection, it is asking us to remember it."]),
  ] },
  { chapter: 36, startVerse: 20, endVerse: 25, reference: "Genesis 36:20-25", title: "The Sons Of Seir", icon: "🗺️", phrases: [
    phrase("🗺️ The Sons Of Seir The Horite", ["Genesis also lists the people of Seir who were in the land.", "This shows Edom's territory had a history before Esau's descendants dominated it.", "The Bible is not flattening the map into one family only.", "It remembers earlier peoples connected to the region.", "Land stories often include more than one people group.", "Genesis gives readers a layered view of history."]),
    phrase("🏘️ Inhabitants Of The Land", ["Calling them inhabitants emphasizes that Seir was already occupied.", "Esau's settlement is part of a broader regional story.", "This prepares readers for the way nations rise, mix, and replace one another in biblical history.", "The genealogy is doing historical work, not just ancestry work.", "The land has a past before Edom's future.", "Scripture often uses names to preserve the memory of peoples who might otherwise be forgotten."]),
  ] },
  { chapter: 36, startVerse: 26, endVerse: 30, reference: "Genesis 36:26-30", title: "The Horite Chiefs", icon: "👑", phrases: [
    phrase("👑 These Are The Dukes Of The Horites", ["The Horites also have chiefs, showing their own social structure.", "Genesis gives dignity and specificity to these groups instead of treating them as faceless background.", "This matters because Edom's story intersects with theirs.", "The chapter is mapping relationships between peoples.", "Leadership lists show organized communities.", "Even difficult genealogies help us see the world of Genesis as populated and real."]),
  ] },
  { chapter: 36, startVerse: 31, endVerse: 35, reference: "Genesis 36:31-35", title: "Kings Begin In Edom", icon: "👑", phrases: [
    phrase("👑 Kings That Reigned In Edom", ["Edom has kings before Israel has a human king.", "That detail matters because it compares Edom's political development with Israel's later story.", "Genesis is showing that nations around Israel may appear organized and powerful sooner.", "But God's promise does not depend on Israel looking impressive first.", "Edom's kingship is recorded before Israel's monarchy.", "Worldly structure can develop quickly while God's covenant plan moves at God's pace."]),
    phrase("⏳ Before There Reigned Any King Over The Children Of Israel", ["This phrase points readers forward to Israel's future kings.", "Genesis is written with awareness of where the story is going.", "The line helps connect early family history to later national history.", "It also reminds readers that Jacob's family will become a people with its own kings in time.", "Genealogy can contain prophecy-like orientation toward the future.", "The Bible's lists often look backward and forward at the same time."]),
  ] },
  { chapter: 36, startVerse: 36, endVerse: 39, reference: "Genesis 36:36-39", title: "Edom's Kings Continue", icon: "🔁", phrases: [
    phrase("🔁 And He Died, And Another Reigned", ["The repeated pattern of death and succession shows the limits of human kingship.", "Each ruler has a name, a place, and an ending.", "Power passes from one person to another, but no human king lasts forever.", "Genesis records authority without making it ultimate.", "Every king in the list is temporary.", "Human rule is real, but it is not eternal."]),
  ] },
  { chapter: 36, startVerse: 40, endVerse: 43, reference: "Genesis 36:40-43", title: "The Chiefs Of Edom", icon: "📜", phrases: [
    phrase("📜 Names Of The Dukes Of Esau", ["The chapter closes by listing Edomite chiefs according to families and places.", "This final section gathers Esau's line into a settled identity.", "The names may be hard to pronounce, but they represent clans, regions, and leadership.", "Genesis is finishing Esau's branch before turning fully toward Jacob's sons and Joseph.", "The genealogy gives Esau's line a real conclusion.", "Scripture slows down to account for people even when they are not the main storyline."]),
    phrase("🏕️ According To Their Habitations", ["The chiefs are tied to their dwelling places.", "This reinforces that Edom is not abstract; it is a people rooted in locations.", "Genesis is building the world around Israel before Joseph's story begins.", "The map matters because later conflicts happen in real territories.", "Habitation language turns names into geography.", "Biblical history is grounded in families living in places."]),
    phrase("🏷️ He Is Esau The Father Of The Edomites", ["The final line repeats the key identity: Esau is the father of Edom.", "That repetition closes the chapter with the connection readers must remember.", "Jacob and Esau's brother story has now widened into Israel and Edom's national story.", "Genesis is ready to move forward, but it does not leave Esau unexplained.", "The chapter ends with identity, not trivia.", "Genealogies teach readers how family wounds and blessings echo into nations."]),
  ] },
];

const DAY_15_GENESIS_37_38_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 37, startVerse: 1, endVerse: 4, reference: "Genesis 37:1-4", title: "Joseph Is Loved And Hated", icon: "🎽", phrases: [
    phrase("🏕️ Jacob Dwelt In The Land", ["Jacob is in Canaan, the land tied to God's promise.", "But being in the right land does not mean the family is healthy.", "Genesis now turns from Jacob's personal journey to what is coming out of Jacob's house.", "Joseph's testing begins inside a family already shaped by favoritism, rivalry, and grief.", "The promise land holds a troubled household.", "Location can be right while the heart of the home still needs healing."]),
    phrase("📜 These Are The Generations Of Jacob", ["This phrase signals a new major movement in Genesis.", "The story is now focusing on Jacob's sons, especially Joseph and Judah.", "What happens next grows out of the family patterns we have already watched.", "Genesis is not starting a random new story; it is showing the fruit of Jacob's household.", "Generations means consequences, continuity, and future.", "Family choices do not stay frozen in one generation."]),
    phrase("🧑 Joseph Being Seventeen Years Old", ["Joseph is young when the conflict begins.", "He is old enough to work with the flocks but still vulnerable inside the family order.", "His youth matters because the dreams and robe make him stand out before he has the maturity to carry the tension wisely.", "Genesis lets us see both Joseph's calling and his difficult family setting.", "God can be working in a young person before the person understands the weight of it.", "Calling often begins before character is fully tested."]),
    phrase("🎽 Coat Of Many Colours", ["Jacob gives Joseph a visible sign of special affection.", "The robe tells the brothers what they already feel: Joseph is preferred.", "Favoritism has damaged Jacob's family before, and now Jacob repeats the pattern with his own sons.", "Every time the robe appears, the family wound becomes visible.", "Love expressed unwisely can provoke pain instead of peace.", "Preference inside a family can become a garment everyone is forced to look at."]),
    phrase("😡 Could Not Speak Peaceably Unto Him", ["The brothers' hatred has reached the point where normal peaceable speech breaks down.", "Before Joseph is thrown into a pit, the relationship is already broken in conversation.", "This shows how sin grows inwardly before it becomes outwardly violent.", "Their mouths reveal what their hearts are becoming.", "The pit begins long before Dothan.", "When peaceable speech dies, danger is already growing."]),
  ] },
  { chapter: 37, startVerse: 5, endVerse: 8, reference: "Genesis 37:5-8", title: "The First Dream", icon: "🌾", phrases: [
    phrase("💤 Joseph Dreamed A Dream", ["Dreams become one of the major ways God moves Joseph's story.", "At this point, Joseph reports the dream without knowing how much it will inflame the household.", "The dream is not just private imagination; it carries the future direction of the story.", "But truth arriving in a wounded family can still be received with anger.", "Revelation does not always produce welcome.", "God can reveal a future that people around you are not ready to accept."]),
    phrase("🌾 My Sheaf Arose", ["The image is agricultural and simple: Joseph's sheaf stands upright while the brothers' sheaves bow.", "The dream points toward future authority, but no explanation is given yet.", "The brothers understand enough to feel threatened.", "Joseph will later rise in Egypt in a way none of them can imagine.", "The dream speaks in symbols before the story reveals the fulfillment.", "God's future can be announced before the road toward it makes sense."]),
    phrase("🙇 Made Obeisance To My Sheaf", ["The bowing image strikes the family wound directly.", "The brothers already resent Joseph's favored place, and now his dream pictures them bowing to him.", "The dream is true, but it lands in a house full of pride and pain.", "Their response shows they are hearing the dream as humiliation.", "The dream exposes what the brothers fear losing.", "Envy can turn God's purpose into a personal insult."]),
    phrase("👑 Shalt Thou Indeed Reign Over Us", ["The brothers interpret the dream as Joseph ruling over them.", "Their question sounds mocking, but it also names the future more clearly than they know.", "They fight against the dream because they cannot imagine God using Joseph's elevation for their preservation.", "What feels like a threat will later become the means of rescue.", "Opponents sometimes speak the shape of God's plan while resisting it.", "People can hate the dream, but they cannot cancel the God behind it."]),
  ] },
  { chapter: 37, startVerse: 9, endVerse: 11, reference: "Genesis 37:9-11", title: "The Second Dream", icon: "⭐", phrases: [
    phrase("☀️ The Sun And The Moon", ["Joseph's second dream expands the picture beyond the brothers.", "The sun, moon, and eleven stars point to the whole family bowing before him.", "This makes the dream feel even more impossible and offensive.", "The scope of Joseph's future is larger than sibling rivalry.", "The second dream confirms and widens the first.", "When God repeats a message in Genesis, readers should pay attention."]),
    phrase("🌟 Eleven Stars", ["The eleven stars represent Joseph's brothers.", "The image pulls the whole family into a heavenly-looking pattern.", "Joseph's future role will not be small or private.", "The brothers hear destiny as dominance because their hearts are already hostile.", "Symbols can be true even when people respond wrongly to them.", "A calling from God may still create tension before it becomes understood."]),
    phrase("⚠️ His Father Rebuked Him", ["Jacob rebukes Joseph because the dream sounds outrageous even to him.", "Yet Jacob has also lived a life shaped by dreams and divine encounters.", "His rebuke does not mean he dismisses the dream completely.", "The story keeps Jacob in tension between correction and curiosity.", "Jacob questions Joseph but does not forget the saying.", "Wise people may test a word while still holding it carefully."]),
    phrase("🧠 His Father Observed The Saying", ["Jacob stores the dream in his mind, like Mary later treasures things about Jesus in Luke.", "He does not understand it fully, but he does not throw it away.", "This matters because the fulfillment will take years and much suffering.", "The dream becomes a seed buried in memory.", "Observation is different from immediate understanding.", "Some things from God have to be carried before they can be explained."]),
  ] },
  { chapter: 37, startVerse: 12, endVerse: 17, reference: "Genesis 37:12-17", title: "Joseph Searches For His Brothers", icon: "🔎", phrases: [
    phrase("🐑 His Brethren Went To Feed Their Father's Flock", ["The brothers are away with the flocks, doing ordinary family work.", "The scene looks normal on the surface, but hatred is already underneath it.", "Joseph is about to walk into danger without knowing what is in their hearts.", "Genesis often lets ordinary travel become the setting for major turning points.", "Evil can be waiting inside a normal errand.", "The story turns through everyday obedience."]),
    phrase("🙋 Here Am I", ["Joseph answers Jacob with readiness.", "He does not know the errand will lead to the pit, slavery, and Egypt.", "The phrase shows his willingness before the cost is revealed.", "Many biblical servants begin hard paths with a simple response of availability.", "Joseph's road to exaltation begins with being sent.", "Obedience can carry us into tests we could not predict."]),
    phrase("🧭 See Whether It Be Well With Thy Brethren", ["Jacob sends Joseph to check on the welfare of his brothers and the flocks.", "The errand is framed as care, not conflict.", "This deepens the tragedy because Joseph comes seeking peace and information, while the brothers plan harm.", "The distance between Joseph's mission and their hatred is painful.", "Joseph is sent toward brothers who cannot speak peaceably to him.", "Innocence in the errand does not prevent suffering on the road."]),
    phrase("📍 They Are Departed Hence", ["Joseph does not find them at Shechem and keeps searching until he hears they went to Dothan.", "This delay shows his persistence.", "He could have turned back, but he follows the trail.", "That persistence brings him to the very place where the brothers will seize him.", "Even the detour is part of the path to Egypt.", "God's providence can include details that feel accidental in the moment."]),
  ] },
  { chapter: 37, startVerse: 18, endVerse: 22, reference: "Genesis 37:18-22", title: "The Brothers Plot Against Joseph", icon: "🕳️", phrases: [
    phrase("👀 They Saw Him Afar Off", ["The brothers recognize Joseph before he reaches them.", "Distance gives their hatred time to form a plan.", "They do not respond like brothers preparing welcome, but like enemies preparing violence.", "The robe may have made him visible even from far away.", "Sight becomes the trigger for hatred.", "What they see on Joseph's body reminds them of what they resent in their father."]),
    phrase("💤 Behold, This Dreamer Cometh", ["They reduce Joseph to the dreams they hate.", "The phrase is mocking, but it reveals what most threatens them.", "They do not merely dislike Joseph's personality; they want to destroy the future his dreams imply.", "Their nickname turns revelation into ridicule.", "Contempt often labels a person by the thing God is doing in them.", "Mockery cannot make God's word powerless."]),
    phrase("🩸 Let Us Slay Him", ["The brothers' hatred moves toward murder.", "This is how far envy has grown from the earlier inability to speak peaceably.", "They are willing to kill their own brother to avoid bowing before him.", "Genesis shows envy as a deadly force when it is not restrained.", "Family proximity does not automatically protect against sin.", "Bitterness can make a brother look like an enemy."]),
    phrase("❓ We Shall See What Will Become Of His Dreams", ["The brothers think killing Joseph will kill the dreams.", "That line is full of irony because their actions will actually move Joseph toward the dream's fulfillment.", "They cannot see that God can use even their evil without approving it.", "The pit becomes the road to Egypt, and Egypt becomes the road to rescue.", "They challenge the dream, but the dream outlives their plan.", "Human resistance can become the very path God overrules."]),
    phrase("🛑 Reuben Heard It", ["Reuben intervenes to keep Joseph from being killed immediately.", "His motives may include responsibility as firstborn, fear, or genuine concern.", "He suggests the pit instead of bloodshed, planning to rescue Joseph later.", "Reuben's partial courage delays death but does not fully protect Joseph.", "Partial intervention can reduce harm without ending danger.", "Doing less evil is not the same as doing full righteousness."]),
  ] },
  { chapter: 37, startVerse: 23, endVerse: 28, reference: "Genesis 37:23-28", title: "Joseph Is Sold", icon: "💰", phrases: [
    phrase("🎽 They Stript Joseph Out Of His Coat", ["The brothers attack the symbol of Jacob's favoritism first.", "Taking the robe is emotionally loaded because it is the visible sign of the love they resent.", "They strip Joseph of status before selling him away.", "The robe that marked him as favored becomes evidence in their deception later.", "They cannot remove God's purpose, but they can tear away the garment.", "People may strip symbols from you, but they cannot strip God's hidden plan."]),
    phrase("🕳️ Cast Him Into A Pit", ["Joseph is thrown into an empty pit with no water.", "The detail makes the scene feel helpless and frightening.", "He is alive, but trapped below his brothers' power.", "The pit becomes Joseph's first descent on the long road to Egypt.", "The dreamer goes down before he is ever lifted up.", "God's path to exaltation may pass through humiliation."]),
    phrase("🍞 They Sat Down To Eat Bread", ["The brothers eat while Joseph is in the pit.", "That detail is chilling because it shows how hardened they have become.", "Their ordinary meal sits beside extraordinary cruelty.", "Genesis wants readers to feel the moral numbness of the scene.", "Sin can become calm enough to eat beside.", "A quiet conscience is not always a clean conscience."]),
    phrase("🐪 Ishmeelites Came From Gilead", ["A caravan appears at just the moment Joseph is in the pit.", "The brothers see a way to profit without directly shedding his blood.", "From their view, this is convenience; from the larger story, it moves Joseph toward Egypt.", "God's providence is hidden beneath human greed.", "The caravan is not random in the final shape of the story.", "God can steer history through events people treat as opportunity."]),
    phrase("💰 Twenty Pieces Of Silver", ["Joseph is sold for silver and taken to Egypt.", "A brother becomes merchandise in the hands of his own family.", "This is betrayal, trafficking, and family sin all at once.", "Yet the destination, Egypt, is where God will later raise him up.", "The sale is evil, even though God will overrule it for good.", "Providence never means the sin was okay."]),
  ] },
  { chapter: 37, startVerse: 29, endVerse: 32, reference: "Genesis 37:29-32", title: "The Bloody Coat", icon: "🩸", phrases: [
    phrase("😱 Reuben Returned Unto The Pit", ["Reuben comes back expecting to rescue Joseph, but Joseph is gone.", "His plan failed because he did not stay present enough to protect him.", "His distress is real, but it is too late to undo the sale.", "Genesis shows the cost of delayed courage.", "Reuben wanted rescue without direct confrontation.", "Private good intentions may fail when public action is needed."]),
    phrase("🧥 The Child Is Not", ["Reuben's words show panic and grief.", "Joseph has disappeared from the pit, and Reuben feels responsible as the oldest brother.", "The phrase will echo the language of loss later in Genesis.", "A family built on deception is about to be torn by a false death story.", "The brothers now have to manage the consequences of their own sin.", "Hidden evil usually demands more lies to keep it covered."]),
    phrase("🐐 Killed A Kid Of The Goats", ["The brothers use goat's blood to deceive Jacob.", "This is a sharp echo of Jacob deceiving Isaac with goatskins in Genesis 27.", "The deceiver is now deceived by his own sons.", "Genesis is showing family sin returning in painful form.", "The goat becomes a symbol of generational deception.", "Patterns we plant can grow up in the next generation."]),
    phrase("🩸 Dipped The Coat In The Blood", ["The robe that once displayed favoritism now becomes the tool of grief.", "The brothers do not need to say Joseph is dead; they stage the evidence so Jacob will say it himself.", "Their deception is cruel because it makes their father participate in the conclusion.", "The bloody coat becomes a false witness.", "The symbol of special love is twisted into a symbol of loss.", "Sin often corrupts the very things that once carried meaning."]),
  ] },
  { chapter: 37, startVerse: 33, endVerse: 36, reference: "Genesis 37:33-36", title: "Jacob Mourns Joseph", icon: "😭", phrases: [
    phrase("🐺 An Evil Beast Hath Devoured Him", ["Jacob interprets the coat exactly as the brothers intended.", "He imagines Joseph torn by a beast, not sold by his brothers.", "The lie works because the evidence was crafted to lead him there.", "This is manipulation through grief.", "Jacob's conclusion is sincere but false.", "People can be deeply convinced by evidence someone else arranged deceitfully."]),
    phrase("😭 Refused To Be Comforted", ["Jacob's grief is overwhelming and long-lasting.", "He believes his beloved son is dead, and no family comfort can reach him.", "The brothers have not only removed Joseph; they have broken their father.", "Genesis lets grief be heavy instead of rushing past it.", "Deception creates real sorrow even when the death is not real.", "Lies can produce wounds as painful as visible loss."]),
    phrase("⬇️ I Will Go Down Into The Grave", ["Jacob speaks as if he will carry this sorrow until death.", "The word down fits the whole Joseph story, where Joseph goes down to the pit and Egypt while Jacob feels pulled down into mourning.", "The family is descending through grief and sin.", "Yet God is still working underneath what they cannot see.", "Genesis uses descent language before later lifting.", "The story may feel buried before God's purpose becomes visible."]),
    phrase("🇪🇬 Potiphar", ["The chapter ends by quietly telling us Joseph is sold to Potiphar in Egypt.", "Jacob thinks the story is over, but the narrator shows Joseph is alive and placed in a new setting.", "Egypt is not an accident; it is the next stage of God's hidden work.", "The family sees loss, but the reader sees movement.", "The final verse keeps hope alive beneath grief.", "God can be advancing the story where people only see an ending."]),
  ] },
  { chapter: 38, startVerse: 1, endVerse: 5, reference: "Genesis 38:1-5", title: "Judah Goes Down", icon: "⬇️", phrases: [
    phrase("⬇️ Judah Went Down From His Brethren", ["Genesis 38 begins with Judah going down from his brothers.", "The phrase matters because Judah has just helped sell Joseph, and now his own story is exposed.", "This chapter is not a random interruption; it turns the spotlight onto one of the brothers.", "Judah's descent is moral and relational, not only geographical.", "After Joseph goes down to Egypt, Judah goes down too.", "God is dealing with the family on more than one front."]),
    phrase("🤝 Turned In To A Certain Adullamite", ["Judah connects himself closely with Hirah the Adullamite.", "The friendship is part of his movement away from his brothers and covenant household.", "Genesis often shows that relationships shape direction.", "Judah's choices begin forming a separate path.", "Who Judah turns in to matters.", "Companionship can either steady us or carry us farther from wisdom."]),
    phrase("👰 Took Her", ["Judah sees a Canaanite woman and takes her as wife.", "The language is brief, but it shows Judah making major life choices away from the family line's earlier caution about marriage.", "This does not automatically make every detail simple, but the direction is concerning.", "Judah is drifting from covenant wisdom.", "Genesis pays attention to marriage direction.", "Family lines are shaped by private choices that seem ordinary at the time."]),
    phrase("👶 Er, Onan, And Shelah", ["Judah has three sons: Er, Onan, and Shelah.", "These names set up the crisis Tamar will face.", "The chapter is moving quickly from Judah's choices to the next generation's consequences.", "A household is being built, but serious trouble is coming.", "Names in Genesis often prepare the next conflict.", "A short family list can be the doorway into a major moral test."]),
  ] },
  { chapter: 38, startVerse: 6, endVerse: 11, reference: "Genesis 38:6-11", title: "Tamar Is Left Waiting", icon: "⏳", phrases: [
    phrase("👰 Tamar", ["Tamar enters the story as the wife Judah gets for Er.", "She will become the central figure through whom Judah's failure is exposed.", "Genesis gives her a name and keeps her in view while the men around her act wrongly.", "Her future is placed at risk by the sins of Judah's household.", "Tamar is not a side note; she carries the chapter's moral weight.", "God sees the vulnerable person inside the family system."]),
    phrase("⚖️ Er Was Wicked In The Sight Of The LORD", ["Er's wickedness is named directly, though the details are not given.", "The important point is that the Lord sees and judges him.", "Judah's line is already in spiritual danger.", "The chapter is showing that the family carrying promise still needs judgment and mercy.", "The Lord's sight governs this hidden household story.", "What is not explained to us is still fully known to God."]),
    phrase("🌱 Raise Up Seed To Thy Brother", ["Judah tells Onan to fulfill the duty of raising offspring for his dead brother.", "This custom protected the dead brother's name and the widow's future.", "Tamar's security is tied to whether the family will act faithfully toward her.", "The issue is not merely inheritance; it is justice for a vulnerable widow.", "Family duty was meant to protect the exposed person.", "Biblical law and custom often aim to guard those who could be discarded."]),
    phrase("🛑 Onan Knew That The Seed Should Not Be His", ["Onan refuses the responsibility while still using the relationship for himself.", "His sin is selfishness, exploitation, and refusal to provide what duty required.", "He wants benefit without obligation.", "The Lord judges his action as evil.", "Onan's wrong is not reduced to one physical detail; it is covenantal selfishness.", "Using people while refusing responsibility is serious evil."]),
    phrase("🏠 Remain A Widow At Thy Father's House", ["Judah sends Tamar away to wait for Shelah, but he has no real intention of giving him to her.", "Tamar is left in limbo: not free, not provided for, and not honored.", "Judah hides fear behind delay.", "This sets up Tamar's later action.", "Waiting can become injustice when the person in power never intends to act.", "Delayed obedience can function like denial."]),
  ] },
  { chapter: 38, startVerse: 12, endVerse: 14, reference: "Genesis 38:12-14", title: "Tamar Acts At Timnath", icon: "🧕", phrases: [
    phrase("⏳ In Process Of Time", ["Time passes, and Tamar remains unresolved.", "Judah's wife dies, Judah mourns, and life moves on for him.", "But Tamar's future is still blocked by Judah's failure to keep his word.", "The phrase reminds us that injustice can stretch across years quietly.", "Time passing does not mean the wrong has been fixed.", "Unresolved responsibility does not disappear because life continues."]),
    phrase("🐑 Sheep Shearers", ["Judah goes up to his sheep shearers, a setting often connected with feasting and vulnerability to temptation.", "The movement creates the opportunity Tamar uses.", "Judah is on the road, away from home, and Tamar knows the pattern.", "The scene is being set for exposure.", "Genesis often places moral tests in ordinary social settings.", "Character is revealed in the places people think are private."]),
    phrase("🧕 Covered Her With A Vail", ["Tamar changes her garments and covers herself because she knows Judah has failed to give Shelah to her.", "Her action is risky and morally complicated, but it arises from Judah's injustice.", "She is seeking the family line and future that were withheld from her.", "Genesis will later show Judah recognizing that she was more righteous than he.", "Tamar acts from a position of vulnerability, not power.", "Desperate action often exposes the failure of those who should have protected."]),
  ] },
  { chapter: 38, startVerse: 15, endVerse: 18, reference: "Genesis 38:15-18", title: "Judah Gives His Pledge", icon: "🧾", phrases: [
    phrase("👀 Judah Saw Her", ["Judah sees Tamar but does not recognize her.", "The scene is full of irony because Judah, who deceived his father with a garment, is now misled by changed garments.", "His desire moves faster than his discernment.", "Genesis is exposing Judah through his own choices.", "Seeing does not mean perceiving truth.", "Uncontrolled desire can make a person blind to what is really happening."]),
    phrase("❓ What Wilt Thou Give Me", ["Tamar presses Judah for a pledge before the encounter.", "She understands that Judah's word alone is not enough because he has already failed her.", "The negotiation creates evidence that will later prove the truth.", "Tamar is protecting herself inside a situation where Judah has power.", "The pledge exists because trust has been broken.", "When someone has failed to act rightly, evidence may matter."]),
    phrase("🧾 Thy Signet, And Thy Bracelets, And Thy Staff", ["Judah gives personal identifiers as pledge: signet, cord or bracelets, and staff.", "These are not random objects; they point directly to his identity.", "The man who helped use Joseph's robe as false evidence now hands over true evidence against himself.", "Genesis is turning the tools of deception back toward exposure.", "Judah's own belongings will speak the truth later.", "God can expose hidden sin through the very things people leave behind."]),
  ] },
  { chapter: 38, startVerse: 19, endVerse: 23, reference: "Genesis 38:19-23", title: "The Pledge Cannot Be Found", icon: "🔎", phrases: [
    phrase("👗 Garments Of Her Widowhood", ["Tamar returns to her widow's garments after the encounter.", "Outwardly, she goes back to the place Judah left her.", "But now she carries the evidence and eventually the pregnancy that will expose the truth.", "The scene shows how hidden realities can sit beneath familiar appearances.", "Tamar looks like a widow again, but the story has changed.", "God can be moving beneath what everyone assumes is unchanged."]),
    phrase("🔎 Where Is The Harlot", ["Judah sends his friend to recover the pledge, but the woman cannot be found.", "His attempt to clean up the situation quietly fails.", "The people of the place say no such woman was there.", "The secrecy around Judah begins to unravel.", "Sin often tries to retrieve its evidence before anyone notices.", "Hidden wrong creates anxious cleanup."]),
    phrase("😶 Lest We Be Shamed", ["Judah decides to let Tamar keep the pledge because he fears public shame.", "He is more concerned with reputation than righteousness.", "This is the same Judah who participated in hiding Joseph's fate from Jacob.", "Genesis is showing his pattern before his confession.", "Shame management is not repentance.", "Wanting a problem hidden is not the same as wanting the heart changed."]),
  ] },
  { chapter: 38, startVerse: 24, endVerse: 26, reference: "Genesis 38:24-26", title: "Judah Is Exposed", icon: "⚖️", phrases: [
    phrase("🔥 Bring Her Forth, And Let Her Be Burnt", ["Judah reacts harshly when he hears Tamar is pregnant.", "His judgment is severe and hypocritical because he does not yet know his own sin is involved.", "He is quick to condemn the vulnerable woman he failed to protect.", "The scene exposes how power can judge loudly while hiding its own guilt.", "Judah's anger outruns his self-awareness.", "We should be careful when we are eager to punish sins connected to our own failure."]),
    phrase("🧾 Discern, I Pray Thee", ["Tamar sends Judah the pledge and asks him to discern whose items they are.", "This echoes the brothers asking Jacob to know whether Joseph's bloody coat was his son's.", "Judah is now forced to recognize evidence, just as Jacob was forced to interpret a garment.", "The deceiver is confronted through recognition.", "Genesis repeats discernment language with poetic justice.", "Hidden sin often comes back in a form the sinner must identify."]),
    phrase("✅ She Hath Been More Righteous Than I", ["Judah's confession is the turning point of the chapter.", "He admits Tamar is more righteous because he failed to give her Shelah.", "This does not make every detail neat, but it names Judah's responsibility clearly.", "Judah stops hiding and tells the truth about himself.", "Judah's first major step forward is confession.", "Transformation begins when a person stops defending themselves and names the wrong."]),
  ] },
  { chapter: 38, startVerse: 27, endVerse: 30, reference: "Genesis 38:27-30", title: "Perez Breaks Forth", icon: "👶", phrases: [
    phrase("👶 Twins Were In Her Womb", ["Tamar gives birth to twins, continuing the Genesis pattern of surprising birth stories.", "Twin conflict has appeared before with Jacob and Esau.", "Now another birth scene carries future significance.", "The family line is moving forward through a complicated and exposed story.", "Genesis keeps showing God's purposes through unlikely births.", "God can bring future promise through situations marked by human failure."]),
    phrase("🧵 The Scarlet Thread", ["The midwife marks Zerah's hand with a scarlet thread because he appears first.", "But the birth order does not unfold as expected.", "Genesis often pays attention to reversals around firstborn status.", "The thread shows human marking, but the final outcome surprises everyone.", "The expected first does not finally come first.", "God's story often unsettles human assumptions about order and status."]),
    phrase("💥 How Hast Thou Broken Forth", ["Perez breaks forth and is born before Zerah.", "His name is connected to breach or breaking through.", "This child will become important in the line of Judah.", "The chapter that exposed Judah ends with a birth that carries future hope.", "Breakthrough comes out of a messy chapter.", "God's grace can carry promise through exposed sin and painful truth."]),
    phrase("🌱 Perez", ["Perez becomes part of the line that later leads to David and, for Christians, to Jesus.", "That makes Genesis 38 deeply important, not a side road to skip.", "Judah's failure and Tamar's struggle become part of a larger redemption story.", "The Bible does not hide the mess in the Messiah's family line.", "Grace does not require a polished family tree.", "God can weave redemption through stories people might prefer to omit."]),
  ] },
];

const deepPhrase = (
  title: string,
  scene: string,
  notice: string,
  meaning: string,
  lesson: string,
): [string, string] => phrase(title, [
  scene,
  notice,
  meaning,
  "This detail is not filler.",
  "It helps the reader see how God's story is moving through real choices, real pressure, and real consequences.",
  lesson,
]);

function makeBeginnerGenesisPhrase(title: string, section: PersonalGenesisPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the scene is easier to follow.`,
    focus,
    "A beginner should not have to guess why this matters.",
    "Genesis is showing more than movement from one place to another.",
    "👕 Garments",
    "⛓️ Low places",
    "💭 Dreams",
    "⏳ Waiting",
    `In ${section.title}, God is still working through ordinary details that would be easy to skip.`,
    "The point is to understand the text, not to rush past it.",
  ]);
}

function ensureBeginnerGenesisPhraseDepth(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerGenesisPhrase("🧭 What Is Happening Here?", section, "This phrase helps locate the scene so the reader knows who is under pressure, who has power, and what problem is being revealed."),
    makeBeginnerGenesisPhrase("🔎 Why This Detail Matters", section, "This detail matters because Joseph's story is built through small turns: a house, a garment, a dream, a prison, a forgotten request, or a sudden opening."),
    makeBeginnerGenesisPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why the story slows down here, but Genesis is showing how character is formed before public purpose is revealed."),
    makeBeginnerGenesisPhrase("🧵 Watch The Pattern", section, "Watch for repeated patterns: Joseph is lowered, God remains with him, people notice his faithfulness, and the next door opens through service."),
    makeBeginnerGenesisPhrase("❤️ What This Shows About People", section, "This scene shows that people can be faithful and still suffer, gifted and still hidden, or helpful and still forgotten."),
    makeBeginnerGenesisPhrase("🙌 What This Shows About God", section, "This scene shows that God is not absent in low places; He can work through prison, dreams, service, delay, and even another person's forgetfulness."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

function makeGenesis31To38BeginnerPhrase(title: string, section: PersonalGenesisPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the reader can stay oriented.`,
    focus,
    "Genesis is tracing a family that carries God's promise, but the family is still messy, fearful, wounded, and responsible for real choices.",
    "🏠 Household pressure",
    "🧭 Direction",
    "⚖️ Consequences",
    "🙌 God's faithfulness",
    `In ${section.title}, the details help explain why the story moves the way it does.`,
    "The point is not to memorize a detail, but to understand what the detail shows.",
  ]);
}

function ensureGenesis31To38PhraseDepth(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  if (section.chapter < 31 || section.chapter > 38 || section.phrases.length >= 7) {
    return section;
  }

  const additions: Array<[string, string]> = [
    makeGenesis31To38BeginnerPhrase("🧭 What Is Happening Here?", section, "This phrase helps identify the pressure in the scene: fear, travel, family conflict, grief, deception, violence, or responsibility."),
    makeGenesis31To38BeginnerPhrase("🔎 Why This Detail Matters", section, "This detail matters because Genesis often uses small clues to show a person's heart, a family's pattern, or the next turn in the promise story."),
    makeGenesis31To38BeginnerPhrase("🧠 Beginner Connection", section, "A beginner may not know why this scene belongs here, but it helps connect Jacob's return, Esau's line, Joseph's suffering, and Judah's change."),
    makeGenesis31To38BeginnerPhrase("🧵 Watch The Pattern", section, "Watch the pattern: deception creates sorrow, fear seeks control, blessing brings responsibility, and God keeps moving the story forward."),
    makeGenesis31To38BeginnerPhrase("❤️ What This Shows About People", section, "This scene shows that people can be afraid, protective, jealous, grieving, selfish, brave, or honest, sometimes all within the same family story."),
    makeGenesis31To38BeginnerPhrase("🙌 What This Shows About God", section, "This scene shows that God does not abandon the promise when the family becomes complicated; He keeps working through truth, discipline, mercy, and time."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

const DAY_16_GENESIS_39_40_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 39, startVerse: 1, endVerse: 6, reference: "Genesis 39:1-6", title: "The Lord Is With Joseph In Potiphar's House", icon: "🏠", phrases: [
    deepPhrase("🇪🇬 Joseph Was Brought Down To Egypt", "Joseph's life has gone down from favored son to slave in a foreign land.", "The text names the descent plainly so readers do not skip the pain.", "God's presence does not mean Joseph avoided betrayal, sale, or displacement.", "God can be with someone even when their circumstances look like loss."),
    deepPhrase("🤲 The LORD Was With Joseph", "This is the heartbeat of Genesis 39.", "Joseph has lost robe, home, and freedom, but he has not lost the Lord.", "The chapter measures Joseph's life by God's presence more than by Joseph's position.", "Do not judge God's nearness only by whether life feels comfortable."),
    deepPhrase("📈 He Was A Prosperous Man", "Joseph prospers inside slavery, which is both encouraging and painful.", "The blessing is real, but the bondage is also real.", "Genesis is showing God's favor without pretending the injustice is good.", "God can bear fruit through a faithful person in a hard place."),
    deepPhrase("👀 His Master Saw", "Potiphar notices that the Lord is with Joseph.", "Joseph's faithfulness becomes visible in ordinary work.", "The blessing on Joseph affects the whole household around him.", "Integrity in hidden labor can become public testimony."),
    deepPhrase("🔑 Overseer Over His House", "Joseph is entrusted with responsibility because he proves faithful.", "This prepares him for later leadership in Egypt.", "The house becomes a training ground before the palace.", "Small stewardship can prepare a person for larger assignment."),
  ] },
  { chapter: 39, startVerse: 7, endVerse: 10, reference: "Genesis 39:7-10", title: "Joseph Refuses Temptation", icon: "🛑", phrases: [
    deepPhrase("👀 His Master's Wife Cast Her Eyes", "Temptation comes after Joseph has been trusted and elevated.", "The danger is not outside the workplace only; it enters the house where he serves.", "Genesis shows that success can bring new tests.", "Do not assume blessing removes the need for vigilance."),
    deepPhrase("🛑 He Refused", "Joseph's first response is clear refusal.", "He does not flirt with the boundary or treat sin like a harmless possibility.", "His resistance begins before the pressure becomes repeated.", "Strong obedience often starts with a firm early no."),
    deepPhrase("🤝 My Master Wotteth Not", "Joseph thinks about the trust Potiphar has placed in him.", "He sees sin as betrayal of both God and neighbor.", "Temptation tries to shrink the moment to desire, but Joseph widens it to responsibility.", "Remembering trust can strengthen resistance."),
    deepPhrase("🙏 How Then Can I Do This Great Wickedness", "Joseph names the temptation as great wickedness, not private pleasure.", "He refuses to soften sin with excuses.", "His conscience is trained by God's sight even in Egypt.", "Call sin what it is before it teaches you to rename it."),
    deepPhrase("👂 Day By Day", "The pressure does not happen once; it keeps coming.", "Joseph's faithfulness is repeated obedience under repeated temptation.", "The test is not only dramatic courage but daily endurance.", "Godly character is often proven through consistency."),
  ] },
  { chapter: 39, startVerse: 11, endVerse: 12, reference: "Genesis 39:11-12", title: "Joseph Flees", icon: "🏃", phrases: [
    deepPhrase("🏠 None Of The Men Of The House", "Joseph is isolated when the temptation becomes aggressive.", "The absence of witnesses increases the danger.", "Genesis shows that private moments reveal what a person truly fears.", "Live before God when no one else can see."),
    deepPhrase("🧥 She Caught Him By His Garment", "Joseph loses another garment in Genesis.", "The robe was taken by brothers; this garment is held by a false accuser.", "Clothing again becomes evidence in someone else's deception.", "People may misuse evidence, but God still knows the truth."),
    deepPhrase("🏃 He Fled", "Joseph chooses escape over image management.", "He leaves the garment but keeps his integrity.", "Sometimes the holiest choice is not to debate, but to run.", "Do not preserve appearances at the cost of obedience."),
  ] },
  { chapter: 39, startVerse: 13, endVerse: 18, reference: "Genesis 39:13-18", title: "Joseph Is Falsely Accused", icon: "🧥", phrases: [
    deepPhrase("🧥 She Saw That He Had Left His Garment", "The garment becomes the tool of accusation.", "Joseph's righteous flight is twisted into a false story.", "Genesis is painfully honest that doing right can still be misrepresented.", "Faithfulness does not guarantee people will tell the truth about you."),
    deepPhrase("🗣️ She Called Unto The Men", "Potiphar's wife turns quickly from temptation to public accusation.", "Her speech controls the first version of the story others hear.", "The person who sinned now presents herself as the victim.", "Be slow to believe the loudest narrative without truth."),
    deepPhrase("⚠️ The Hebrew Servant", "She labels Joseph by ethnicity and status to make him look dangerous and low.", "Her words stir household prejudice and shame.", "Joseph is not only accused; he is framed as an outsider threat.", "Sin often recruits social pressure to protect itself."),
    deepPhrase("📖 According To These Words", "She repeats the false account to Potiphar.", "The repeated lie becomes the official story in the household.", "Joseph has no recorded defense here, but God remains with him.", "When your voice is not heard, God's witness still stands."),
  ] },
  { chapter: 39, startVerse: 19, endVerse: 23, reference: "Genesis 39:19-23", title: "The Lord Is With Joseph In Prison", icon: "⛓️", phrases: [
    deepPhrase("🔥 His Wrath Was Kindled", "Potiphar becomes angry when he hears his wife's report.", "The text does not give Joseph a courtroom scene.", "A false accusation changes Joseph's life again.", "Injustice can move fast when power believes a lie."),
    deepPhrase("⛓️ Put Him Into The Prison", "Joseph goes down again, from slavery into prison.", "The dreamer keeps descending, but the Lord does not depart.", "Genesis is preparing readers to see that prison is also part of the path to Pharaoh.", "A low place may become the hallway to God's next door."),
    deepPhrase("🤲 The LORD Was With Joseph", "The chapter repeats the line from Potiphar's house.", "God's presence is not limited to success or comfort.", "The same Lord is with Joseph in prison as in promotion.", "Measure your situation by God's faithfulness, not only by your chains."),
    deepPhrase("🗝️ Keeper Of The Prison", "Joseph again receives trust and responsibility.", "His character remains steady even after betrayal and false accusation.", "The prison becomes another place where God trains him to steward people.", "Do not let injustice make you abandon faithfulness."),
  ] },
  { chapter: 40, startVerse: 1, endVerse: 4, reference: "Genesis 40:1-4", title: "Two Officers Join Joseph In Prison", icon: "🏛️", phrases: [
    deepPhrase("🍷 Butler And Baker", "Two royal officers enter Joseph's prison story.", "Their arrival looks like another ordinary prison detail, but it is part of God's hidden setup.", "These men connect Joseph's prison to Pharaoh's court.", "God can bring future doors through people who enter your hard place."),
    deepPhrase("😠 Pharaoh Was Wroth", "The officers are imprisoned because Pharaoh is angry with them.", "Their fall from court brings them into Joseph's care.", "Human conflict at the palace becomes providence in the prison.", "God can use someone else's disruption to move His plan."),
    deepPhrase("🤲 Joseph Served Them", "Joseph serves the officers instead of sinking into bitterness.", "He remains attentive to people while carrying his own pain.", "This service becomes the setting for interpreting dreams.", "Faithfulness in another person's need may become part of your calling."),
  ] },
  { chapter: 40, startVerse: 5, endVerse: 8, reference: "Genesis 40:5-8", title: "The Prisoners Dream", icon: "💭", phrases: [
    deepPhrase("💭 They Dreamed A Dream", "Dreams return to Joseph's story inside prison.", "The gift that helped create family hatred now becomes a way to serve others.", "God has not wasted Joseph's earlier dream history.", "The thing connected to your pain may still become ministry."),
    deepPhrase("😟 Wherefore Look Ye So Sadly", "Joseph notices the sadness on their faces.", "This is remarkable because Joseph is suffering too.", "He is not so consumed by his pain that he cannot see someone else's distress.", "Compassion can remain alive even in confinement."),
    deepPhrase("🙏 Do Not Interpretations Belong To God", "Joseph gives God the credit before interpreting anything.", "He does not present himself as a magical expert.", "His confidence is in God's ability to reveal meaning.", "Use your gift in a way that points beyond yourself."),
  ] },
  { chapter: 40, startVerse: 9, endVerse: 11, reference: "Genesis 40:9-11", title: "The Butler's Dream", icon: "🍷", phrases: [
    deepPhrase("🍇 A Vine Was Before Me", "The butler's dream uses images from his old work near Pharaoh.", "God speaks in symbols connected to the man's world.", "Joseph listens carefully before giving meaning.", "Pay attention to the details God gives, not only the outcome you want."),
    deepPhrase("⬆️ Pharaoh Shall Lift Up Thine Head", "Joseph explains that the butler will be restored in three days.", "The interpretation is good news, but it comes from God, not flattery.", "Joseph tells the truth as it has been revealed.", "Faithful encouragement should still be truthful."),
  ] },
  { chapter: 40, startVerse: 12, endVerse: 15, reference: "Genesis 40:12-15", title: "Joseph Asks To Be Remembered", icon: "🙏", phrases: [
    deepPhrase("🙏 Think On Me", "Joseph asks the butler to remember him when restored.", "This is deeply human: Joseph trusts God, but he also longs for justice.", "He names his wrongful kidnapping and imprisonment plainly.", "Faith does not require pretending injustice did not hurt."),
    deepPhrase("🕳️ I Have Done Nothing", "Joseph speaks the truth about his innocence.", "He was stolen from the land of the Hebrews and imprisoned unjustly.", "The statement matters because patience is not the same as silence about wrong.", "You can trust God and still name the truth of what happened."),
  ] },
  { chapter: 40, startVerse: 16, endVerse: 19, reference: "Genesis 40:16-19", title: "The Baker's Dream", icon: "🧺", phrases: [
    deepPhrase("🧺 Three White Baskets", "The baker also shares a dream with the number three.", "The similar pattern raises expectation, but the meaning is very different.", "Joseph must interpret hard truth, not only comforting truth.", "A servant of God must be faithful with messages people do not want."),
    deepPhrase("🐦 The Birds Did Eat Them", "The birds eating from the baskets point toward judgment.", "The image is unsettling because the baker's end will not be restoration.", "Genesis places life and death side by side in the prison dreams.", "Not every interpretation brings relief."),
    deepPhrase("⚖️ Pharaoh Shall Lift Up Thy Head From Off Thee", "The same phrase about lifting the head becomes judgment here.", "Words can sound similar while carrying opposite outcomes.", "Joseph does not soften the meaning to protect himself from discomfort.", "Truth should not be edited to keep everyone comfortable."),
  ] },
  { chapter: 40, startVerse: 20, endVerse: 23, reference: "Genesis 40:20-23", title: "The Butler Forgets Joseph", icon: "😔", phrases: [
    deepPhrase("🎂 Pharaoh's Birthday", "On Pharaoh's birthday, both dreams come true exactly as Joseph said.", "The timing confirms that God truly gave the interpretations.", "Joseph's gift is validated even while Joseph remains imprisoned.", "God's truth can be confirmed before your deliverance arrives."),
    deepPhrase("🍷 Restored The Chief Butler", "The butler returns to his place in Pharaoh's service.", "Joseph's word of restoration proves true.", "This should have been Joseph's opening, but the chapter delays relief.", "Answered interpretation does not always mean immediate rescue."),
    deepPhrase("😔 Yet Did Not The Chief Butler Remember Joseph", "The chapter ends with painful forgetfulness.", "Joseph served well, interpreted truly, and asked to be remembered, but he is forgotten.", "The delay feels cruel, yet it keeps Joseph in place until Pharaoh's dreams.", "Being forgotten by people is not the same as being forgotten by God."),
  ] },
];

export const GENESIS_31_40_PERSONAL_SECTIONS = addGenesisThirtyOneToFortySectionTexture(
  [
    ...DAY_12_GENESIS_31_FINAL_SECTIONS.map(ensureGenesis31To38PhraseDepth),
    ...DAY_13_GENESIS_32_33_FINAL_SECTIONS.map(ensureGenesis31To38PhraseDepth),
    ...DAY_14_GENESIS_34_36_FINAL_SECTIONS.map(ensureGenesis31To38PhraseDepth),
    ...DAY_15_GENESIS_37_38_FINAL_SECTIONS.map(ensureGenesis31To38PhraseDepth),
    ...DAY_16_GENESIS_39_40_FINAL_SECTIONS.map(ensureBeginnerGenesisPhraseDepth),
    ...expandSplitSections(RAW_GENESIS_31_40_PERSONAL_SECTIONS.filter((section) => section.chapter !== 31 && section.chapter !== 32 && section.chapter !== 33 && section.chapter !== 34 && section.chapter !== 35 && section.chapter !== 36 && section.chapter !== 37 && section.chapter !== 38 && section.chapter !== 39 && section.chapter !== 40)),
  ],
);
