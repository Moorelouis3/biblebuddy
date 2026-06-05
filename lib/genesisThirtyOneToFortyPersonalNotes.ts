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

export const GENESIS_31_40_PERSONAL_SECTIONS = addGenesisThirtyOneToFortySectionTexture(
  expandSplitSections(RAW_GENESIS_31_40_PERSONAL_SECTIONS),
);
