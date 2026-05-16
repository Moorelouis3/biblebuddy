type IsaacSection = {
  reference: string;
  title: string;
  verses: string[];
  notes: string[];
};

type IsaacChapterNote = {
  chapter: number;
  title: string;
  hook: string;
  setup: string[];
  matters: string[];
  sections: IsaacSection[];
  finalThought: string[];
  pause: string[];
  lesson: string;
};

function verseCallouts(verses: string[]) {
  return verses.map((verse) => `> **${verse}**`).join("\n\n");
}

function buildSection(section: IsaacSection) {
  return `## ${section.reference}\n\n# ${section.title}\n\n${verseCallouts(section.verses)}\n\n${buildIsaacLayeredTeaching(section)}\n\n${section.notes.join("\n\n")}`;
}

function isaacTeachingDetails(section: IsaacSection) {
  const title = section.title.toLowerCase();

  if (title.includes("god speaks") || title.includes("covenant")) {
    return {
      phrase: "`Sojourn`, `I will be with thee`, `seed`, `land`, and `bless` are covenant words.",
      word: "`Sojourn` means Isaac is living as a resident stranger. He has promise from God, but not full possession yet.",
      context: "In the ancient world, land, family line, wells, and blessing were survival realities, not abstract ideas.",
      connection: "God repeats Abraham's promise to Isaac, proving the covenant does not die with Abraham.",
      reflection: "Isaac must trust the God of his father for himself.",
    };
  }

  if (title.includes("lies") || title.includes("rebekah")) {
    return {
      phrase: "`She is my sister` is the painful repeated phrase from Abraham's earlier fear.",
      word: "`Fair to look upon` means Rebekah's beauty becomes the reason Isaac imagines danger.",
      context: "A vulnerable family in a foreign region could fear powerful men, but fear still does not justify deception.",
      connection: "Genesis shows family patterns repeating: Abraham's fear becomes Isaac's fear.",
      reflection: "The promise is real, but Isaac still has to learn not to protect it by lying.",
    };
  }

  if (title.includes("wells") || title.includes("conflict")) {
    return {
      phrase: "`Wells`, `strove`, `digged`, `Esek`, `Sitnah`, and `Rehoboth` show conflict over life-sustaining resources.",
      word: "`Strove` means quarreled or contended. These are not minor disagreements; wells meant survival.",
      context: "Nomadic households needed water for family, servants, and livestock. A well could decide whether a household could stay.",
      connection: "Isaac's well conflicts show covenant blessing attracting jealousy and pressure.",
      reflection: "Sometimes faithfulness looks like refusing to make every conflict your final battlefield.",
    };
  }

  if (title.includes("family") || title.includes("esau")) {
    return {
      phrase: "`Grief of mind`, `wives`, `Beersheba`, `altar`, and `oath` connect worship and family tension.",
      word: "`Grief of mind` means Esau's choices caused deep bitterness and sorrow to Isaac and Rebekah.",
      context: "Marriage choices shaped covenant identity, household alliances, inheritance, and spiritual direction.",
      connection: "Genesis 26 ends by preparing the family wound that will tear open in Genesis 27.",
      reflection: "The covenant line is blessed, but the family carrying it is already hurting.",
    };
  }

  if (title.includes("rebekah") || title.includes("plan")) {
    return {
      phrase: "`Bless`, `venison`, `goodly raiment`, and `obey my voice` are the tension words.",
      word: "`Venison` means hunted game. The meal becomes part of the blessing scene Isaac is trying to control.",
      context: "A father's spoken blessing carried inheritance, authority, destiny, and public family direction.",
      connection: "Favoritism from Genesis 25 now becomes manipulation in Genesis 27.",
      reflection: "Rebekah believes the promise, but she tries to secure it through deception.",
    };
  }

  if (title.includes("jacob receives") || title.includes("deceives")) {
    return {
      phrase: "`I am Esau`, `the voice is Jacob's voice`, `hands`, `smell`, and `blessing` slow the deception down.",
      word: "`Blessing` is not a casual wish. It is covenant direction spoken over the next generation.",
      context: "In an oral culture, spoken words of blessing had weight. They shaped inheritance, status, and future expectation.",
      connection: "Jacob receives the blessing, but he receives it through lies that will haunt him later.",
      reflection: "Genesis lets the blessing matter and the deception hurt at the same time.",
    };
  }

  if (title.includes("esau") || title.includes("grief")) {
    return {
      phrase: "`Exceeding great and bitter cry`, `supplanted`, and `birthright` reveal Esau's pain.",
      word: "`Supplanted` means displaced or tripped up. Esau feels Jacob has taken his place twice.",
      context: "The firstborn blessing affected honor, inheritance, leadership, and family future.",
      connection: "Genesis is not asking us to laugh at Esau's grief. It makes the family damage audible.",
      reflection: "Sin inside a family can turn blessing into heartbreak.",
    };
  }

  if (title.includes("flees")) {
    return {
      phrase: "`Hate`, `slay`, `flee`, and `few days` show consequences arriving fast.",
      word: "`Flee` means Jacob's blessing does not give him peace at home. It sends him into exile.",
      context: "Leaving the household meant leaving protection, familiarity, inheritance space, and family belonging.",
      connection: "Jacob's running sets up Genesis 28-36, where God will transform him slowly.",
      reflection: "Manipulation may get an outcome, but it cannot heal the wound it creates.",
    };
  }

  return {
    phrase: "Read the key words slowly because Genesis teaches through family details, spoken words, food, clothing, fear, and blessing.",
    word: "Older KJV terms often carry emotional and covenant weight, so pause before treating them like decoration.",
    context: "Ancient households were shaped by inheritance, firstborn rights, marriage alliances, wells, livestock, and public blessings.",
    connection: "This passage keeps the covenant moving from Abraham through Isaac toward Jacob.",
    reflection: "Ask where trust is present and where fear is quietly taking over.",
  };
}

function buildIsaacLayeredTeaching(section: IsaacSection) {
  const detail = isaacTeachingDetails(section);
  return [
    "### 📖 What This Section Is Doing",
    `This part of the story teaches through **${section.title.toLowerCase()}**, so slow down and watch the family pressure underneath the event.`,
    "### 🔎 Words And Phrases To Notice",
    detail.phrase,
    detail.word,
    "### 🏺 Ancient Family Context",
    detail.context,
    "### 🧵 Covenant Connection",
    detail.connection,
    "### 💬 Louis Reflection",
    detail.reflection,
  ].join("\n\n");
}

const isaacThreads = [
  "The covenant is moving from Abraham into the next generation, but the next generation is not emotionally simple.",
  "Isaac matters because he is not only Abraham's son. He is the bridge between Abraham's promises and Jacob's future.",
  "Genesis 26-27 shows that God's promise can keep moving forward even when fear, favoritism, and deception damage a family.",
  "The blessing is not a small family wish. In Genesis, blessing carries inheritance, identity, future rule, covenant direction, and family destiny.",
];

const isaacNotes: IsaacChapterNote[] = [
  {
    chapter: 26,
    title: "Isaac Carries the Promise",
    hook: "Genesis 26 is the chapter where Isaac has to stand in the promise for himself.",
    setup: [
      "Abraham is gone, but the covenant is not gone. That is the tension sitting underneath Genesis 26. Isaac is no longer just the promised child in Abraham's story. He is now the man carrying Abraham's covenant line into the next generation.",
      "The chapter opens with famine, which immediately makes the story feel familiar. Abraham faced famine. Abraham went down toward Egypt. Abraham was afraid for his life and lied about Sarah. Now Isaac faces pressure, and the reader watches to see whether the son will repeat the father's fear or trust the God of his father.",
      "Genesis 26 is not as famous as Genesis 22 or Genesis 27, but it is deeply important. It shows God speaking Abraham's promises directly to Isaac. It shows Isaac's fear, his prosperity, conflict over wells, worship at Beersheba, and the beginning of grief through Esau's marriages.",
    ],
    matters: [
      "It shows the covenant promise continuing after Abraham's death.",
      "It makes Isaac more than a passive bridge between Abraham and Jacob.",
      "It shows fear repeating inside a family line.",
      "It explains why wells, land, and blessing mattered for survival.",
      "It quietly prepares the family tension that explodes in Genesis 27.",
    ],
    sections: [
      {
        reference: "Genesis 26:1 to 6",
        title: "God Speaks to Isaac",
        verses: [
          "Genesis 26:1 says there was a famine in the land.",
          "Genesis 26:3 says sojourn in this land, and I will be with thee, and will bless thee.",
          "Genesis 26:4 says in thy seed shall all the nations of the earth be blessed.",
        ],
        notes: [
          "Genesis 26 begins with famine. That detail matters because famine tests faith at the level of survival. This is not abstract theology. Food, family, herds, servants, and future are all under pressure.",
          "The famine also deliberately echoes Abraham's story. In Genesis 12, Abram faced famine and went down into Egypt. There he lied about Sarai being his sister because he feared being killed. Now Isaac faces a similar kind of pressure.",
          "That is one of the deep family patterns in Genesis. Children often inherit more than property. They inherit fears, instincts, coping strategies, and unfinished lessons.",
          "God tells Isaac not to go down into Egypt. Instead, Isaac must sojourn in the land God names.",
          "The KJV word `sojourn` means to live temporarily as a resident stranger. It is not the same as fully owning settled land. Isaac is called to stay in a place that is promised but not fully possessed yet.",
          "That is covenant tension.",
          "God promises the land, but Isaac still lives like a sojourner.",
          "God promises descendants, but the family is already strained.",
          "God promises blessing, but famine is real.",
          "This is how Genesis teaches faith. The promise is true before the circumstances look settled.",
          "God repeats the Abrahamic covenant to Isaac. He promises presence, blessing, land, multiplied seed, and blessing for all nations through Isaac's seed.",
          "This is one of the clearest moments showing that Isaac is not a side character. The covenant does not skip him. God speaks it directly to him.",
          "Ancient readers would hear covenant inheritance in these words. Land, descendants, divine presence, and blessing are not casual encouragements. They are the shape of God's promise to Abraham now being confirmed through Isaac.",
          "The phrase `in thy seed shall all the nations of the earth be blessed` keeps the Bible's big story alive. Genesis is not only about one family becoming important. It is about God choosing one family as the line through which blessing will eventually reach the nations.",
          "That promise keeps moving even when the family carrying it is imperfect.",
          "Isaac obeys and dwells in Gerar. His obedience here is quiet, but important. Before Genesis shows Isaac failing through fear, it first shows him responding to God's direction by staying where God told him to stay.",
        ],
      },
      {
        reference: "Genesis 26:7 to 11",
        title: "Isaac Lies About Rebekah",
        verses: [
          "Genesis 26:7 says Isaac said, She is my sister: for he feared to say, She is my wife.",
          "Genesis 26:9 says Abimelech asked, What is this thou hast done unto us?",
          "Genesis 26:11 says Abimelech charged all his people not to touch Isaac or Rebekah.",
        ],
        notes: [
          "This scene is painful because it sounds so much like Abraham.",
          "Isaac fears the men of the place will kill him for Rebekah. So he says she is his sister. It is the same kind of self-protective deception Abraham used with Sarah.",
          "Genesis wants readers to notice the repetition.",
          "Fear can travel through families.",
          "A survival instinct in one generation can become a repeated pattern in the next.",
          "Isaac has just heard God say, `I will be with thee.` But when danger feels close, Isaac acts as if he must protect himself through deception.",
          "That is spiritually honest. A person can receive a promise from God and still panic under pressure.",
          "The text does not flatten Isaac into a villain. It shows him as human. He believes enough to stay in Gerar, but he fears enough to lie.",
          "Abimelech discovers the truth when he sees Isaac sporting with Rebekah. The KJV wording can sound strange. The idea is that Isaac and Rebekah are behaving with the kind of affection that reveals they are husband and wife, not brother and sister.",
          "Abimelech confronts Isaac. The confrontation is embarrassing because a foreign king sees the moral danger more clearly than Isaac does in the moment.",
          "This happened with Abraham too. Genesis is showing how God's covenant people can still act out of fear in ways that place others at risk.",
          "Abimelech says someone might have lain with Rebekah, bringing guilt on the people. That tells us Isaac's lie was not harmless. Deception creates danger beyond the person telling the lie.",
          "God protects Rebekah and the covenant line, but Genesis does not pretend Isaac's fear was wise.",
          "This matters for Genesis 27 because deception will soon move inside Isaac's own house. The family that uses deception to survive outside pressure will soon use deception against itself.",
          "That is one of the darker threads in these chapters. Sinful strategies do not stay in one room. They echo.",
        ],
      },
      {
        reference: "Genesis 26:12 to 22",
        title: "Conflict Over Wells",
        verses: [
          "Genesis 26:12 says Isaac received in the same year an hundredfold.",
          "Genesis 26:14 says the Philistines envied him.",
          "Genesis 26:22 says Isaac called the well Rehoboth, for the LORD hath made room for us.",
        ],
        notes: [
          "After the fear scene, Genesis shows Isaac prospering. He sows in the land and receives a hundredfold. The blessing of God is visible.",
          "This is important because Isaac is not prospering because he is flawless. He is prospering because God is faithful to the covenant.",
          "But prosperity creates conflict.",
          "The Philistines envy Isaac. They stop up the wells Abraham's servants had dug. In a dry land, wells are not decoration. Wells mean survival.",
          "Water means life for families, servants, flocks, herds, and future settlement. To stop a well is to attack someone's ability to remain in the land.",
          "This is why the well scenes matter. Modern readers may pass over them quickly, but ancient readers would feel the tension immediately. A well was livelihood, security, and claim.",
          "Isaac reopens Abraham's wells and gives them the same names Abraham had given them. That is symbolic. Isaac is not inventing a separate destiny. He is recovering and continuing Abraham's legacy.",
          "But conflict follows him.",
          "The herdsmen of Gerar strive over one well, so Isaac names it Esek, meaning contention. They strive over another, so he names it Sitnah, connected to opposition or hostility.",
          "The names turn conflict into memory.",
          "Isaac does not respond by escalating into violence. He keeps moving. That does not mean he is weak. It shows a different kind of strength. Sometimes covenant faithfulness looks like refusing to let conflict define your spirit.",
          "Finally he digs another well and there is no striving. He names it Rehoboth, meaning broad places or room.",
          "Isaac says the LORD has made room for us.",
          "That statement is quiet worship. Isaac sees space not merely as luck, but as God's provision.",
          "Genesis 26 shows blessing and opposition together. Being blessed does not mean everyone celebrates your life. Sometimes blessing exposes jealousy. Sometimes promise creates pressure. Sometimes God makes room after a season of repeated conflict.",
        ],
      },
      {
        reference: "Genesis 26:23 to 35",
        title: "Covenant Confirmation and Family Tension",
        verses: [
          "Genesis 26:24 says fear not, for I am with thee.",
          "Genesis 26:25 says Isaac builded an altar there, and called upon the name of the LORD.",
          "Genesis 26:35 says Esau's wives were a grief of mind unto Isaac and Rebekah.",
        ],
        notes: [
          "Isaac goes to Beersheba, a place loaded with Abraham memory. There God appears to him again.",
          "God says, `I am the God of Abraham thy father: fear not, for I am with thee.`",
          "That phrase goes straight to Isaac's weakness. Fear has already shaped his lie about Rebekah. God does not merely repeat land and descendants. He speaks to Isaac's fear.",
          "The command `fear not` is not empty comfort. It is grounded in God's presence: `for I am with thee.`",
          "Isaac responds by building an altar and calling on the name of the LORD. This is Abraham-like behavior at its best. Altar, worship, tent, and well all come together in one scene.",
          "An altar says worship.",
          "A tent says sojourning.",
          "A well says provision.",
          "Together they show Isaac living as a covenant heir in a land not fully possessed yet.",
          "Then Abimelech comes to make peace. He can see that the LORD is with Isaac. This is important because even surrounding peoples recognize something unusual about Isaac's blessing.",
          "The covenant with Abimelech is a political peace agreement. It shows that Isaac's life is not only private spirituality. His blessing affects local relationships, power, and fear.",
          "The chapter could have ended peacefully there, but Genesis adds a painful family note: Esau marries Hittite women, and they are a grief of mind to Isaac and Rebekah.",
          "This is not random. It prepares Genesis 27.",
          "Esau's marriages show tension around covenant identity. The family line carrying the promise is not just any family line. Marriage choices matter because covenant direction matters.",
          "The phrase `grief of mind` shows emotional pain. Isaac and Rebekah are not simply annoyed. They are burdened.",
          "Genesis 26 ends with covenant confirmation and family ache sitting side by side.",
          "That is the emotional world of Isaac's house. God is faithful. The family is strained. The promise continues. The home is not healthy.",
        ],
      },
    ],
    finalThought: [
      "Genesis 26 gives Isaac his own covenant moment.",
      "He receives God's promise, repeats family fear, experiences conflict, finds room, worships, and feels grief inside his home.",
      "The chapter teaches that God's promises continue, but family patterns still matter.",
    ],
    pause: [
      "Where do you see fear shaping Isaac's choices?",
      "Why do the wells matter so much in this chapter?",
      "How does God meet Isaac personally, not only as Abraham's son?",
      "What family patterns do you need God to help you break instead of repeat?",
    ],
    lesson:
      "Genesis 26 teaches that God's covenant promise moves personally through Isaac, even while fear, conflict, and family grief reveal how much this chosen family still needs God's mercy.",
  },
  {
    chapter: 27,
    title: "The Blessing Taken Through Deception",
    hook: "Genesis 27 is one of the most emotionally tense family chapters in Genesis.",
    setup: [
      "The covenant family is now divided inside the house. Isaac loves Esau. Rebekah loves Jacob. Esau has already sold his birthright in Genesis 25, but Isaac still intends to bless him. Rebekah overhears, makes a plan, Jacob lies, Isaac trembles, Esau weeps, and the family fractures.",
      "This chapter is not only about a clever trick. It is about favoritism, fear, manipulation, identity, inheritance, and the terrifying power of deception inside a family.",
      "God's promise continues through Jacob, but Genesis refuses to make the path look clean. The blessing moves forward through a wounded household.",
    ],
    matters: [
      "It shows the difference between birthright and blessing.",
      "It reveals the damage caused by favoritism.",
      "It explains why Jacob must flee.",
      "It shows Esau's grief and anger in a deeply human way.",
      "It proves that God's covenant can continue through imperfect people without approving their deception.",
    ],
    sections: [
      {
        reference: "Genesis 27:1 to 17",
        title: "Rebekah's Plan",
        verses: [
          "Genesis 27:1 says Isaac was old, and his eyes were dim.",
          "Genesis 27:4 says Isaac wanted to bless Esau before he died.",
          "Genesis 27:8 says Rebekah told Jacob, obey my voice.",
        ],
        notes: [
          "Genesis 27 opens with Isaac old and nearly blind. His physical blindness becomes part of the emotional tension of the chapter, but there is also a deeper kind of blindness in the family.",
          "Isaac calls Esau and asks for venison. The KJV word `venison` means hunted game meat. Isaac wants Esau to go out with his weapons, hunt, prepare the food Isaac loves, and receive the blessing.",
          "This is not a casual dinner. In the ancient world, a father's blessing carried future, inheritance, authority, and family destiny. Words spoken by the patriarch mattered deeply.",
          "The birthright and the blessing are related, but not identical. The birthright involved the firstborn's inheritance rights and family position. The blessing was the spoken transfer of future favor and destiny. Esau had already despised and sold his birthright in Genesis 25, but Genesis 27 shows the blessing still becoming a crisis.",
          "Isaac's desire to bless Esau is emotionally loaded because Genesis 25 already said the elder would serve the younger. Isaac knows the family story. Rebekah knows it too. Yet each parent acts through preference rather than open trust.",
          "Rebekah overhears and forms a plan. She tells Jacob to obey her voice. That phrase sounds parental, but the plan is deception.",
          "This is where favoritism becomes manipulation.",
          "Rebekah is not wrong to believe Jacob is connected to the promise. But she acts as if God's promise needs her deceit to survive.",
          "That is a major spiritual danger.",
          "When we believe God's outcome but use sinful methods to force it, we reveal that our trust is mixed with fear.",
          "Jacob's first concern is not moral. He worries he will be caught and receive a curse instead of a blessing. That detail is psychologically honest. Deception often begins with fear of consequences, not hatred of sin.",
          "Rebekah takes responsibility for the curse and prepares the disguise. Goat skins will imitate Esau's hairy body. Esau's garments will give Jacob Esau's smell. Food will imitate Esau's hunt.",
          "Everything about the plan is identity theft inside a family.",
          "The tragedy is that everyone knows the household well enough to deceive it. Rebekah knows Isaac's tastes. Jacob knows Isaac's suspicions. They use family closeness as the tool of family betrayal.",
        ],
      },
      {
        reference: "Genesis 27:18 to 29",
        title: "Jacob Receives the Blessing",
        verses: [
          "Genesis 27:19 says Jacob told his father, I am Esau thy firstborn.",
          "Genesis 27:22 says the voice is Jacob's voice, but the hands are the hands of Esau.",
          "Genesis 27:29 says let people serve thee, and nations bow down to thee.",
        ],
        notes: [
          "Jacob enters Isaac's room carrying the false meal, wearing Esau's clothes, and covered with goat skins.",
          "The emotional tension is intense because Isaac is suspicious from the beginning. He asks, `Who art thou, my son?`",
          "That question cuts to the heart of the chapter.",
          "Who is Jacob?",
          "Is he the younger son God chose?",
          "Is he the deceiver?",
          "Is he the man grasping for blessing?",
          "Is he pretending to be Esau because he does not yet know how to receive God's promise as himself?",
          "Jacob answers with a direct lie: `I am Esau thy firstborn.`",
          "This is not subtle. The chapter makes the deception plain. Jacob lies about his name, his birth order, his obedience, and even brings the LORD's name into the lie when Isaac asks how he found the game so quickly.",
          "That is one of the darkest parts of the scene. Jacob uses religious language to support deception.",
          "Isaac hears Jacob's voice but feels Esau's hands. The line is unforgettable: the voice is Jacob's voice, but the hands are the hands of Esau.",
          "This is what deception does. It creates contradiction. Something sounds wrong, but another piece seems convincing enough to continue.",
          "Isaac smells Esau's garments and blesses Jacob. The blessing includes dew of heaven, fatness of the earth, corn and wine, peoples serving, nations bowing, lordship over brothers, and curse/blessing language.",
          "`Dew of heaven` pictures fertility, provision, and life-giving moisture in a dry land. `Fatness of the earth` means richness, abundance, and fruitful land. These are agricultural and covenant images.",
          "The blessing is not merely emotional approval from a father. It carries land, provision, rule, family authority, and covenant echo.",
          "Ancient readers would understand that spoken blessing had weight. Words, inheritance, and destiny were bound together in ways modern readers can easily underestimate.",
          "Jacob receives the blessing, but the room does not feel holy. It feels tense.",
          "That matters. Genesis is not saying deception is good because the blessing goes to Jacob. Genesis is showing that God's promised direction continues even through a family acting in broken ways.",
          "God's sovereignty is not the same as human innocence.",
        ],
      },
      {
        reference: "Genesis 27:30 to 40",
        title: "Esau Learns the Truth",
        verses: [
          "Genesis 27:33 says Isaac trembled very exceedingly.",
          "Genesis 27:34 says Esau cried with a great and exceeding bitter cry.",
          "Genesis 27:36 says is not he rightly named Jacob? for he hath supplanted me these two times.",
        ],
        notes: [
          "This is one of the deepest emotional scenes in Genesis.",
          "Jacob leaves, and Esau comes in with the meal. The timing is brutal. The deception is discovered almost immediately, but too late to undo the spoken blessing.",
          "Isaac trembles very exceedingly. That is not a small reaction. He realizes he has been deceived, but he also seems to recognize that the blessing has gone where God said the family future would go.",
          "Esau cries with a great and exceeding bitter cry. Genesis wants us to hear his grief.",
          "This matters because readers often flatten Esau into only the careless man who sold his birthright. Genesis 27 does not let us do that. Esau is responsible for despising his birthright, but his grief here is still real.",
          "Family consequences are rarely simple.",
          "Esau asks for a blessing too. The pain is not only about property. It is about identity, fatherly favor, future, and being displaced in the family story.",
          "He says Jacob has supplanted him two times.",
          "The KJV word `supplanted` means displaced, tripped up, or taken the place of another through cunning. It connects to Jacob's name, which is related to the heel. Jacob came out grasping Esau's heel, and now Esau feels Jacob has grabbed his place.",
          "This line is emotionally important because Esau interprets his whole relationship with Jacob through loss.",
          "First the birthright.",
          "Now the blessing.",
          "Whether Esau is telling the whole story fairly is another question. He did sell the birthright. But emotionally, he feels robbed.",
          "That is how wounded families often work. People remember the pain that proves the story they already feel.",
          "Isaac gives Esau a secondary word. It is not the covenant blessing Jacob received. It speaks of dwelling away from the fatness of the earth in many translations, living by the sword, serving his brother, and eventually breaking the yoke.",
          "The wording is difficult, but the emotional direction is clear: Esau's future will be marked by struggle, conflict, and a complicated relationship to Jacob's line.",
          "Later Scripture remembers Esau as a warning. Hebrews calls him a `profane person` because he sold his birthright for one meal. `Profane` means treating something sacred as common. That does not erase the sadness of Genesis 27. It explains part of the spiritual tragedy.",
          "Esau wanted the blessing, but earlier he had treated the birthright lightly.",
          "Genesis holds both truths together.",
          "Esau is responsible.",
          "Jacob is deceptive.",
          "Isaac is partial.",
          "Rebekah is manipulative.",
          "The family is breaking.",
          "And somehow the covenant line still moves forward.",
        ],
      },
      {
        reference: "Genesis 27:41 to 46",
        title: "Jacob Flees",
        verses: [
          "Genesis 27:41 says Esau hated Jacob because of the blessing.",
          "Genesis 27:42 says Rebekah heard Esau planned to kill Jacob.",
          "Genesis 27:43 says arise, flee thou to Laban my brother to Haran.",
        ],
        notes: [
          "The blessing does not bring immediate peace to Jacob. It brings danger.",
          "Esau hates Jacob and plans to kill him after Isaac dies. The family has now moved from favoritism to deception to murderous intent. Genesis 4 echoes in the background: brother against brother again.",
          "Rebekah hears and tells Jacob to flee to Laban. The word `flee` becomes part of Jacob's story. He receives the blessing, but he cannot stay home.",
          "This is one of the consequences of manipulation. Even when someone gets what they wanted, the relational cost can be devastating.",
          "Jacob will leave the land, leave his mother, leave his father, and enter years of difficulty under Laban. The deceiver will soon be deceived.",
          "Rebekah says Jacob should stay away a few days, but the separation becomes much longer. Genesis never records Rebekah seeing Jacob again. That possibility makes the chapter even sadder.",
          "The family tried to control the promise, but they could not control the consequences.",
          "Rebekah then speaks to Isaac about Esau's wives and the danger of Jacob marrying local women. That concern is real. Covenant marriage direction matters in Genesis. But it also functions as the doorway to send Jacob away.",
          "Genesis 27 ends with a fractured household.",
          "Isaac has been deceived.",
          "Rebekah has protected Jacob but may lose him.",
          "Jacob has the blessing but must run.",
          "Esau has grief that hardens into hate.",
          "The covenant continues, but the family is wounded.",
          "That is what makes Genesis feel alive. It does not sanitize the chosen family. It shows God's promise moving through people who desperately need grace.",
        ],
      },
    ],
    finalThought: [
      "Genesis 27 is not a simple hero story.",
      "It is a family tragedy wrapped around a covenant moment.",
      "The blessing goes to Jacob, but the way it happens exposes fear, favoritism, manipulation, grief, and consequences.",
    ],
    pause: [
      "Where do you see favoritism damaging this family?",
      "Why did the blessing matter so much to Jacob and Esau?",
      "How do you understand Esau's grief and Jacob's responsibility together?",
      "What does this chapter teach about trying to force God's promise through deception?",
    ],
    lesson:
      "Genesis 27 teaches that God's covenant promise can move forward through deeply imperfect people, but deception and favoritism still wound families and bring painful consequences.",
  },
];

function setIsaacSections(chapterNumber: number, sections: IsaacSection[]) {
  const chapter = isaacNotes.find((item) => item.chapter === chapterNumber);
  if (chapter) chapter.sections = sections;
}

setIsaacSections(26, [
  {
    reference: "Genesis 26:1 to 5",
    title: "Famine Tests Isaac and God Repeats the Covenant",
    verses: [
      "Genesis 26:1 says there was a famine in the land.",
      "Genesis 26:2 says the LORD told Isaac not to go down into Egypt.",
      "Genesis 26:3-4 repeats land, presence, seed, and blessing.",
      "Genesis 26:5 remembers Abraham's obedience.",
    ],
    notes: [
      "The chapter begins with famine, which means Isaac's faith is tested at the level of survival. This is not theory. Food, family, servants, flocks, and future are all under pressure.",
      "The famine also echoes Abraham's story. Isaac is now facing the kind of pressure his father faced, and the reader watches to see whether he will trust God for himself.",
      "God tells Isaac not to go down into Egypt. Instead, he must `sojourn` in the land. The KJV word `sojourn` means to live as a temporary resident or stranger.",
      "The covenant is repeated directly to Isaac: God's presence, land, descendants, and blessing to all nations. Isaac is not just Abraham's son. He is now the covenant carrier.",
    ],
  },
  {
    reference: "Genesis 26:6 to 11",
    title: "Isaac Repeats Abraham's Fear",
    verses: [
      "Genesis 26:6 says Isaac dwelt in Gerar.",
      "Genesis 26:7 says Isaac called Rebekah his sister because he feared for his life.",
      "Genesis 26:9 says Abimelech confronted Isaac.",
      "Genesis 26:11 says Abimelech warned the people not to touch Isaac or Rebekah.",
    ],
    notes: [
      "Isaac obeys by staying in Gerar, but then fear takes over. He lies about Rebekah because he thinks the men of the place may kill him.",
      "This is painful because it repeats Abraham's earlier failure. Genesis is showing that families can pass down fears, not only blessings.",
      "Abimelech discovers the truth and confronts Isaac. The foreign king sees the danger of the deception more clearly than Isaac does in the moment.",
      "Isaac's lie was not harmless. It placed Rebekah and others at risk. Genesis is already preparing us for Genesis 27, where deception will move inside the family.",
    ],
  },
  {
    reference: "Genesis 26:12 to 16",
    title: "Blessing Creates Jealousy",
    verses: [
      "Genesis 26:12 says Isaac received an hundredfold.",
      "Genesis 26:13 says the man waxed great.",
      "Genesis 26:14 says the Philistines envied him.",
      "Genesis 26:15-16 says Abraham's wells were stopped and Isaac was sent away.",
    ],
    notes: [
      "Isaac prospers because God is faithful to the covenant, not because Isaac is flawless.",
      "The blessing becomes visible: crops, flocks, herds, servants, and increasing strength.",
      "But visible blessing creates jealousy. The Philistines envy Isaac and stop up Abraham's wells.",
      "In that world, wells meant survival. Blocking a well was not a small insult. It attacked a family's ability to stay, drink, farm, and live.",
    ],
  },
  {
    reference: "Genesis 26:17 to 22",
    title: "Isaac Reopens Wells and Finds Room",
    verses: [
      "Genesis 26:18 says Isaac digged again the wells of Abraham.",
      "Genesis 26:20 names a well Esek because of strife.",
      "Genesis 26:21 names another well Sitnah because of opposition.",
      "Genesis 26:22 names the final well Rehoboth because the LORD made room.",
    ],
    notes: [
      "Isaac reopens Abraham's wells and gives them the old names. That is symbolic. Isaac is continuing Abraham's legacy, not inventing a separate promise.",
      "The first wells bring conflict. `Esek` is tied to contention, and `Sitnah` is tied to hostility or opposition.",
      "Isaac keeps moving instead of escalating into violence. That does not mean he is weak. It shows patient endurance in a tense land.",
      "`Rehoboth` means broad places or room. Isaac recognizes that God has made space for him after repeated conflict.",
    ],
  },
  {
    reference: "Genesis 26:23 to 25",
    title: "God Meets Isaac at Beersheba",
    verses: [
      "Genesis 26:23 says Isaac went up to Beersheba.",
      "Genesis 26:24 says God told him, Fear not, for I am with thee.",
      "Genesis 26:25 says Isaac built an altar, called on the LORD, pitched his tent, and digged a well.",
    ],
    notes: [
      "Beersheba carries Abraham memory, and there God appears to Isaac again.",
      "God says, `Fear not, for I am with thee.` That speaks directly to Isaac's weakness. Fear has already shaped his lie about Rebekah.",
      "Isaac responds with worship. The altar says worship, the tent says sojourning, and the well says provision.",
      "This is one of Isaac's strongest moments. He is living as a covenant heir in a promised land that is not fully settled yet.",
    ],
  },
  {
    reference: "Genesis 26:26 to 33",
    title: "Abimelech Seeks Peace",
    verses: [
      "Genesis 26:26 says Abimelech came to Isaac.",
      "Genesis 26:28 says they saw the LORD was with Isaac.",
      "Genesis 26:31 says they made an oath.",
      "Genesis 26:33 says Isaac called the well Shebah.",
    ],
    notes: [
      "Abimelech comes with his men because he recognizes God's blessing on Isaac.",
      "This matters because Isaac's covenant life is visible even to outsiders. The surrounding peoples can see that the LORD is with him.",
      "The oath creates peace after conflict. Isaac's story is not only private spirituality; it affects politics, land, and neighbor relationships.",
      "The well at the end confirms provision again. The chapter keeps tying God's promise to water, land, worship, and survival.",
    ],
  },
  {
    reference: "Genesis 26:34 to 35",
    title: "Esau's Marriages Bring Grief",
    verses: [
      "Genesis 26:34 says Esau took Judith and Bashemath as wives.",
      "Genesis 26:35 says they were a grief of mind unto Isaac and Rebekah.",
    ],
    notes: [
      "The chapter ends with a short family note, but it is not random. Esau's marriages prepare the tension of Genesis 27.",
      "`Grief of mind` means deep emotional bitterness or distress. Isaac and Rebekah are burdened by Esau's choices.",
      "Marriage matters in Genesis because covenant direction matters. This family carries a promise that is connected to identity, worship, and future.",
      "Genesis 26 ends with God faithful, Isaac blessed, and the family still hurting.",
    ],
  },
]);

setIsaacSections(27, [
  {
    reference: "Genesis 27:1 to 4",
    title: "Isaac Plans to Bless Esau",
    verses: [
      "Genesis 27:1 says Isaac was old and his eyes were dim.",
      "Genesis 27:3 tells Esau to take his weapons and hunt.",
      "Genesis 27:4 says Isaac wanted to bless Esau before he died.",
    ],
    notes: [
      "Isaac's physical blindness becomes part of the emotional tension, but the family also has spiritual and relational blindness.",
      "The KJV word `venison` means hunted game. Isaac asks Esau to prepare the food he loves.",
      "This meal is tied to blessing, not casual appetite. A father's blessing carried inheritance, authority, identity, and future.",
      "Genesis 25 already said the elder would serve the younger, but Isaac still moves toward Esau. Family preference is colliding with God's earlier word.",
    ],
  },
  {
    reference: "Genesis 27:5 to 10",
    title: "Rebekah Forms a Plan",
    verses: [
      "Genesis 27:5 says Rebekah heard Isaac speak to Esau.",
      "Genesis 27:6-7 repeats Isaac's plan.",
      "Genesis 27:8 says Rebekah told Jacob to obey her voice.",
      "Genesis 27:9-10 gives her instructions for the meal.",
    ],
    notes: [
      "Rebekah overhears and immediately acts. She knows Jacob is connected to the promise, but she chooses manipulation instead of open trust.",
      "Her command `obey my voice` sounds parental, but the plan itself is deceptive.",
      "This is what favoritism does inside a family. Instead of producing trust, it produces secret strategies.",
      "Rebekah believes the right outcome, but she uses sinful methods to force it.",
    ],
  },
  {
    reference: "Genesis 27:11 to 17",
    title: "Jacob Fears Being Caught",
    verses: [
      "Genesis 27:11 says Esau is hairy and Jacob is smooth.",
      "Genesis 27:12 says Jacob fears he will seem like a deceiver and receive a curse.",
      "Genesis 27:13 says Rebekah takes responsibility for the curse.",
      "Genesis 27:15-16 says Rebekah uses Esau's clothes and goat skins.",
    ],
    notes: [
      "Jacob's first concern is not that the plan is wrong. His first concern is that he might get caught.",
      "That is spiritually revealing. Deception often worries about consequences before it worries about sin.",
      "Rebekah covers Jacob with Esau's clothes and goat skins. The whole plan becomes identity theft inside a family.",
      "They know Isaac well enough to deceive him. Family closeness becomes the tool of betrayal.",
    ],
  },
  {
    reference: "Genesis 27:18 to 23",
    title: "Jacob Lies About Who He Is",
    verses: [
      "Genesis 27:18 says Jacob came unto his father.",
      "Genesis 27:19 says Jacob said, I am Esau thy firstborn.",
      "Genesis 27:20 shows Jacob bringing the LORD's name into the lie.",
      "Genesis 27:22 says the voice is Jacob's voice, but the hands are Esau's hands.",
    ],
    notes: [
      "Isaac asks, `Who art thou, my son?` That question cuts to the heart of Jacob's story.",
      "Jacob answers with a direct lie. He lies about his name, his birth order, his obedience, and the source of his success.",
      "The darkest part is that Jacob uses God's name to support the deception.",
      "Isaac senses contradiction: Jacob's voice, Esau's hands. Deception often creates exactly that kind of confusion.",
    ],
  },
  {
    reference: "Genesis 27:24 to 29",
    title: "The Blessing Is Spoken",
    verses: [
      "Genesis 27:24 asks again whether Jacob is Esau.",
      "Genesis 27:27 says Isaac smelled Esau's raiment.",
      "Genesis 27:28 blesses with dew, fatness, corn, and wine.",
      "Genesis 27:29 speaks of nations, lordship, curse, and blessing.",
    ],
    notes: [
      "Isaac asks again, and Jacob lies again. The repeated question makes the scene more tense, not less.",
      "Isaac smells Esau's garments and is convinced. The disguise works because the family knows each other's habits and weaknesses.",
      "`Dew of heaven` and `fatness of the earth` are images of provision, fertility, and abundance in the land.",
      "The blessing includes rule and covenant language. This is not a small family wish. It carries destiny.",
    ],
  },
  {
    reference: "Genesis 27:30 to 33",
    title: "Isaac Trembles",
    verses: [
      "Genesis 27:30 says Jacob had scarcely gone out when Esau came in.",
      "Genesis 27:31 says Esau brought the meal.",
      "Genesis 27:33 says Isaac trembled very exceedingly.",
    ],
    notes: [
      "The timing is brutal. Jacob leaves, and Esau enters almost immediately.",
      "Isaac realizes the deception too late. His trembling is not mild surprise. It is deep shock.",
      "He has been tricked, but he also seems to recognize that the blessing has gone where God's earlier word said it would go.",
      "Genesis is holding two truths together: God is sovereign, and human deception is still real sin.",
    ],
  },
  {
    reference: "Genesis 27:34 to 40",
    title: "Esau's Bitter Cry",
    verses: [
      "Genesis 27:34 says Esau cried with a great and exceeding bitter cry.",
      "Genesis 27:36 says Jacob supplanted him these two times.",
      "Genesis 27:38 says Esau asked, Hast thou but one blessing?",
      "Genesis 27:39-40 gives Isaac's word to Esau.",
    ],
    notes: [
      "Esau's grief is one of the most human moments in Genesis. The text lets us hear his pain.",
      "`Supplanted` means displaced, tripped up, or pushed aside. Esau connects Jacob's name with Jacob's pattern.",
      "Esau is not innocent in the broader story, because he despised his birthright earlier. But Genesis still shows his heartbreak honestly.",
      "Isaac's word to Esau is not the covenant blessing Jacob received. It speaks of struggle, survival, and future conflict.",
    ],
  },
  {
    reference: "Genesis 27:41 to 46",
    title: "Jacob Must Flee",
    verses: [
      "Genesis 27:41 says Esau hated Jacob and planned to kill him.",
      "Genesis 27:42 says Rebekah heard Esau's words.",
      "Genesis 27:43 tells Jacob to flee to Haran.",
      "Genesis 27:46 shows Rebekah speaking to Isaac about Jacob's marriage.",
    ],
    notes: [
      "The blessing has been obtained, but the family is shattered. Esau's grief hardens into hatred.",
      "Jacob must now flee from the brother he deceived. The man who grasped the blessing loses home, safety, and family life.",
      "Rebekah sends Jacob away for a few days, but the separation will become much longer. Her plan costs more than she seems to expect.",
      "Genesis 27 ends with the covenant moving forward, but the household broken by favoritism and deception.",
    ],
  },
]);

function normalizeIsaacVerseFlow() {
  for (const chapter of isaacNotes) {
    chapter.sections = chapter.sections.flatMap((section) => {
      const match = section.reference.match(/^Genesis (\d+):(\d+) to (\d+)$/);
      if (!match) return [section];
      const chapterNumber = Number(match[1]);
      const start = Number(match[2]);
      const end = Number(match[3]);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end - start + 1 <= 5) return [section];

      const chunks: IsaacSection[] = [];
      const totalVerses = end - start + 1;
      const chunkSize = totalVerses <= 8 ? Math.ceil(totalVerses / 2) : 5;
      for (let chunkStart = start; chunkStart <= end; chunkStart += chunkSize) {
        const chunkEnd = Math.min(end, chunkStart + chunkSize - 1);
        const firstChunk = chunkStart === start;
        chunks.push({
          reference: `Genesis ${chapterNumber}:${chunkStart} to ${chunkEnd}`,
          title: firstChunk ? section.title : `${section.title} Continued`,
          verses: [`Genesis ${chapterNumber}:${chunkStart}-${chunkEnd} carries this family and covenant movement.`],
          notes: firstChunk
            ? section.notes
            : [
                "Read this continued section as a real teaching moment inside the blessing story.",
                "Watch what each person says and does here. Genesis is showing how covenant promise moves through real family choices.",
                "The details matter because Isaac, Rebekah, Jacob, and Esau are not symbols only. They are people whose decisions wound, reveal, and redirect the household.",
              ],
        });
      }
      return chunks;
    });
  }
}

normalizeIsaacVerseFlow();

function buildIsaacNotes(chapter: IsaacChapterNote) {
  const chapterFlow = chapter.sections.map((section) => `- 📍 ${section.title}`).join("\n");
  const finalThought = chapter.finalThought.map((item) => `- ${item}`).join("\n");
  const pause = chapter.pause.map((item) => `- ${item}`).join("\n");
  const threads = isaacThreads.map((item) => `- ${item}`).join("\n");

  const base = `# Genesis ${chapter.chapter}\n\n# ${chapter.title}\n\n${chapter.hook}\n\n${chapter.setup.join("\n\n")}\n\n## Why Genesis ${chapter.chapter} Matters\n\n${chapter.matters.map((item) => `- ${item}`).join("\n")}\n\n## Promise Through Isaac Threads To Keep Watching\n\n${threads}\n\n## Chapter Flow\n\n${chapterFlow}\n\n# Deep Chapter Notes\n\n${chapter.sections.map(buildSection).join("\n\n")}`;
  return `${base}\n\n# The Big Lesson of Genesis ${chapter.chapter}\n\n${chapter.lesson}\n\n# Final Thought on Genesis ${chapter.chapter}\n\n${finalThought}\n\n# Pause and Reflect\n\n${pause}`;
}

export const PROMISE_THROUGH_ISAAC_DEEP_NOTES = isaacNotes.map(buildIsaacNotes);
