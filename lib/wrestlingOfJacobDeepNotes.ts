type JacobSection = {
  reference: string;
  title: string;
  verses: string[];
  notes: string[];
};

type JacobChapterNote = {
  chapter: number;
  title: string;
  hook: string;
  setup: string[];
  matters: string[];
  sections: JacobSection[];
  finalThought: string[];
  pause: string[];
  lesson: string;
};

function verseCallouts(verses: string[]) {
  return verses.map((verse) => `> **${verse}**`).join("\n\n");
}

function buildSection(section: JacobSection) {
  return `## ${section.reference}\n\n# ${section.title}\n\n${verseCallouts(section.verses)}\n\n${buildJacobLayeredTeaching(section)}\n\n${section.notes.join("\n\n")}`;
}

function jacobTeachingDetails(section: JacobSection) {
  const title = section.title.toLowerCase();

  if (title.includes("leaves") || title.includes("flee")) {
    return {
      phrase: "`Sent away`, `charged`, `flee`, and `Canaan` show Jacob leaving with blessing but not peace.",
      word: "`Charge` means a serious command. Isaac is directing Jacob's marriage path because covenant identity matters.",
      context: "Leaving home in Genesis means leaving protection, land, household identity, and family stability.",
      connection: "Jacob's journey begins as a consequence of Genesis 27, but God will turn the road into formation.",
      reflection: "Jacob has the blessing, but he still has to face what deception has broken.",
    };
  }

  if (title.includes("ladder") || title.includes("bethel") || title.includes("dream")) {
    return {
      phrase: "`Ladder`, `angels`, `I am with thee`, and `Bethel` turn a lonely night into a holy place.",
      word: "`Bethel` means house of God. Jacob names the place after realizing God was present there.",
      context: "Ancient sacred places were often marked with stones, vows, and remembered encounters.",
      connection: "God repeats the Abrahamic covenant to Jacob: land, seed, presence, and blessing to the families of the earth.",
      reflection: "God meets Jacob before Jacob is fully changed. That is grace, not approval of deception.",
    };
  }

  if (title.includes("rachel") || title.includes("leah") || title.includes("marriage")) {
    return {
      phrase: "`Loved Rachel`, `Leah was tender eyed`, `serve seven years`, and `handmaid` carry emotional weight.",
      word: "`Handmaid` means a female servant attached to a household. In this story, servants are pulled into family rivalry.",
      context: "Marriage arrangements involved family negotiation, bride price or service, public feasting, and household alliances.",
      connection: "Jacob the deceiver is deceived by Laban. Genesis lets consequences echo through the story.",
      reflection: "The covenant family is being built, but it is being built inside real pain.",
    };
  }

  if (title.includes("birth") || title.includes("sons") || title.includes("rivalry")) {
    return {
      phrase: "`Bilhah`, `Zilpah`, `mandrakes`, `conceived`, and the sons' names show longing, jealousy, and identity.",
      word: "The sons' names often sound like the mothers' prayers, pain, or claims. Names become emotional testimony.",
      context: "In the ancient world, fertility affected honor, security, inheritance, and a woman's standing in the household.",
      connection: "The tribes of Israel are forming through a family that is deeply wounded.",
      reflection: "God works through messy people without pretending the mess is good.",
    };
  }

  if (title.includes("laban") || title.includes("flees")) {
    return {
      phrase: "`Changed my wages`, `stolen away`, `images`, `heap`, and `covenant` show distrust finally reaching a breaking point.",
      word: "`Images` refers to household idols. Rachel's theft shows spiritual confusion inside the family.",
      context: "Household gods could be tied to inheritance claims, protection, and family identity in the ancient world.",
      connection: "Jacob leaves Laban the way he left Esau: under tension, fear, and unfinished conflict.",
      reflection: "God is moving Jacob home, but the road home forces hidden things into the open.",
    };
  }

  if (title.includes("wrestles") || title.includes("israel")) {
    return {
      phrase: "`Wrestled`, `prevailed`, `thy name`, `Israel`, and `halted upon his thigh` are transformation words.",
      word: "`Prevailed` means endured or held on. Jacob does not overpower God; he clings through the night.",
      context: "A name change in Genesis marks identity and destiny. Jacob the grasper becomes Israel, the one who struggles with God.",
      connection: "This is one of the deepest covenant identity moments in Genesis. The nation will carry Jacob's new name.",
      reflection: "Jacob enters the night afraid of Esau and leaves limping with a new name.",
    };
  }

  if (title.includes("esau") || title.includes("reconcile")) {
    return {
      phrase: "`Bowed`, `embraced`, `kissed`, `wept`, and `grace` make reconciliation feel physical and emotional.",
      word: "`Grace` here means favor. Jacob sees mercy where he expected revenge.",
      context: "Bowing repeatedly showed humility, submission, and an attempt to lower hostility.",
      connection: "The brother conflict that began before birth finds a moment of mercy, even if the relationship remains complicated.",
      reflection: "Sometimes the person you fear becomes the place where God surprises you with mercy.",
    };
  }

  if (title.includes("dinah") || title.includes("shechem") || title.includes("revenge")) {
    return {
      phrase: "`Defiled`, `wrought folly`, `deceitfully`, and `sword` show trauma turning into vengeance.",
      word: "`Folly` in this context means a disgraceful, morally outrageous act, not mere foolishness.",
      context: "Family honor, sexual violence, marriage negotiation, and tribal retaliation were deadly serious in the ancient world.",
      connection: "Genesis refuses to make the covenant family look clean. Simeon and Levi's violence will echo later in Jacob's words.",
      reflection: "This chapter needs careful reading: evil is real, grief is real, and revenge can create more ruin.",
    };
  }

  if (title.includes("return") || title.includes("renewal") || title.includes("rachel")) {
    return {
      phrase: "`Put away strange gods`, `arise`, `altar`, `El-bethel`, and `Benjamin` hold renewal and grief together.",
      word: "`Altar` is a worship place, a marker of encounter, sacrifice, gratitude, and covenant memory.",
      context: "Returning to Bethel means Jacob returns to the place where God first met him in the wilderness.",
      connection: "God reaffirms Jacob's name Israel and the covenant promises, even as the family experiences death and sorrow.",
      reflection: "Spiritual renewal does not mean life stops hurting. Bethel and burial can stand in the same chapter.",
    };
  }

  if (title.includes("edom") || title.includes("descendants")) {
    return {
      phrase: "`Dukes`, `generations`, `Edom`, and `Seir` show Esau becoming a people with territory and rulers.",
      word: "`Duke` in the KJV means chief, clan leader, or tribal ruler.",
      context: "Genealogies explained neighboring nations and reminded Israel that family stories became national histories.",
      connection: "Jacob and Esau separate into two peoples. The family conflict becomes part of the Bible's larger national story.",
      reflection: "Genesis tracks Esau's line because God sees the whole family story, not only the chosen line.",
    };
  }

  return {
    phrase: "Watch the key words, names, places, and repeated actions. Jacob's story teaches through details.",
    word: "Older KJV terms often carry emotional, family, or covenant meaning that needs to be slowed down.",
    context: "Ancient family life involved inheritance, labor agreements, marriage customs, household gods, honor, land, and clan identity.",
    connection: "This passage belongs to Jacob's slow movement from grasping and running toward dependence on God.",
    reflection: "Ask where Jacob is running, where he is clinging, and where God is changing him.",
  };
}

function buildJacobLayeredTeaching(section: JacobSection) {
  const detail = jacobTeachingDetails(section);
  return [
    "### 📖 What This Section Is Doing",
    `This movement teaches through **${section.title.toLowerCase()}**. Let the scene breathe before jumping to the next event.`,
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

const jacobThreads = [
  "Jacob's story is not instant transformation. It is slow, painful, and full of consequences.",
  "The covenant keeps moving, but Genesis never pretends the chosen family is emotionally healthy.",
  "Jacob spends much of this journey running: from Esau, from Laban, from fear, and finally into the night where he wrestles with God.",
  "God changes Jacob without erasing the real damage caused by favoritism, deception, rivalry, and family wounds.",
];

const jacobNotes: JacobChapterNote[] = [
  {
    chapter: 28,
    title: "Jacob Meets God at Bethel",
    hook: "Genesis 28 begins with Jacob alone, carrying both the blessing and the consequences of how he received it.",
    setup: [
      "Jacob has the blessing, but he does not have peace. Esau wants him dead, Rebekah has sent him away, and Isaac now sends him toward Padan-aram to find a wife from the family line.",
      "This chapter is the beginning of Jacob's personal journey with God. Before this, Jacob has been surrounded by covenant language through Abraham and Isaac. At Bethel, God speaks directly to Jacob.",
    ],
    matters: [
      "It shows Jacob fleeing from the consequences of deception.",
      "It gives Jacob his first personal covenant encounter with God.",
      "It introduces Bethel as a sacred place in Jacob's story.",
      "It shows Jacob responding with awe, but also with an imperfect vow.",
    ],
    sections: [
      {
        reference: "Genesis 28:1 to 9",
        title: "Jacob Leaves Home",
        verses: [
          "Genesis 28:1 says Isaac called Jacob, blessed him, and charged him not to take a wife of the daughters of Canaan.",
          "Genesis 28:5 says Isaac sent away Jacob.",
          "Genesis 28:8 says Esau saw that the daughters of Canaan pleased not Isaac his father.",
        ],
        notes: [
          "Jacob leaves home under a complicated blessing. Isaac blesses him openly now, but the family wound from Genesis 27 is still fresh. Jacob is not leaving as a peaceful heir taking a joyful trip. He is leaving because the household has fractured.",
          "Marriage matters here because covenant identity matters. Isaac tells Jacob not to marry from the daughters of Canaan. This does not mean Genesis is despising women as people. It means the covenant line is spiritually significant, and marriage choices shape the direction of the family.",
          "Esau notices that Canaanite women displease Isaac, so he marries into Ishmael's line. This feels like Esau trying to repair standing in the family, but it also shows how deeply the blessing conflict has affected him.",
          "Genesis keeps all of this emotionally realistic. Nobody is untouched. Isaac, Rebekah, Jacob, and Esau are all living with the consequences of favoritism and deception.",
        ],
      },
      {
        reference: "Genesis 28:10 to 17",
        title: "The Ladder Dream",
        verses: [
          "Genesis 28:12 says Jacob dreamed of a ladder set up on the earth, and the top of it reached to heaven.",
          "Genesis 28:13 says the LORD stood above it.",
          "Genesis 28:15 says I am with thee, and will keep thee in all places whither thou goest.",
        ],
        notes: [
          "Jacob sleeps in the wilderness with a stone for a pillow. The man who grasped for blessing is now alone, exposed, and uncertain.",
          "Then God meets him.",
          "The ladder, or stairway, reaches from earth to heaven, with angels ascending and descending. The image shows that Jacob's lonely place is not cut off from God's presence. Heaven is not distant from the covenant story. God is actively involved.",
          "God repeats the Abrahamic covenant: land, seed, blessing, and blessing to all families of the earth. This is huge. God does not wait until Jacob is fully mature to speak promise over him.",
          "That does not excuse Jacob's deception. It reveals God's grace.",
          "God promises presence: `I am with thee.` For a man leaving home in fear, that is the word he most needs. Jacob is running from Esau, but he cannot outrun God.",
          "Jacob wakes afraid and says the place is the house of God and the gate of heaven. His fear here is holy awe. He realizes the ordinary wilderness has become sacred because God met him there.",
        ],
      },
      {
        reference: "Genesis 28:18 to 22",
        title: "The Pillar and the Vow",
        verses: [
          "Genesis 28:18 says Jacob set the stone for a pillar.",
          "Genesis 28:19 says he called the name of that place Bethel.",
          "Genesis 28:20 says Jacob vowed a vow.",
        ],
        notes: [
          "The KJV says Jacob set up a `pillar.` A pillar is a standing stone used as a memorial marker. Jacob takes the stone from his night of vulnerability and turns it into a witness of God's presence.",
          "`Bethel` means house of God. Jacob names the place according to what he discovered there.",
          "Jacob also `vowed a vow.` That means he made a solemn promise. But his vow sounds conditional: if God will be with me, keep me, give me bread and clothing, and bring me home, then the LORD shall be my God.",
          "This is not the most mature faith in Genesis. Jacob is still Jacob. He responds to grace with a bargain-like structure.",
          "But this is the beginning of transformation. God has met him personally, and Jacob will never be able to say again that the covenant is only his father's story.",
        ],
      },
    ],
    finalThought: [
      "Genesis 28 shows Jacob running from home, but not running beyond God's reach.",
      "God meets Jacob before Jacob is fully changed, and that is the beginning of the long wrestling journey.",
    ],
    pause: [
      "Where have consequences made you feel alone?",
      "What does Bethel teach you about God meeting people in wilderness places?",
      "How does Jacob's imperfect vow feel honest to you?",
    ],
    lesson:
      "Genesis 28 teaches that God can meet a flawed, fearful person in the wilderness and begin making the covenant promise personal.",
  },
  {
    chapter: 29,
    title: "Jacob Meets Rachel and Is Deceived by Laban",
    hook: "Genesis 29 turns Jacob's story with a painful reversal: the deceiver is deceived.",
    setup: [
      "Jacob arrives in the east and meets Rachel at a well. The scene begins with hope, movement, and love, but it soon becomes tangled in Laban's manipulation.",
      "The family tension deepens as Jacob loves Rachel, Laban gives Leah first, and two sisters are placed into a rivalry that will shape the tribes of Israel.",
    ],
    matters: [
      "It introduces Rachel and Leah.",
      "It shows Laban deceiving Jacob in a way that echoes Jacob's own deception.",
      "It explains the beginning of rivalry inside Jacob's household.",
      "It shows God seeing Leah's pain.",
    ],
    sections: [
      {
        reference: "Genesis 29:1 to 14",
        title: "Jacob Meets Rachel",
        verses: [
          "Genesis 29:10 says Jacob rolled the stone from the well's mouth.",
          "Genesis 29:11 says Jacob kissed Rachel and lifted up his voice and wept.",
          "Genesis 29:14 says Laban said, Surely thou art my bone and my flesh.",
        ],
        notes: [
          "The well scene feels like a new beginning. Wells in Genesis are places of provision, meeting, and future marriage. Abraham's servant met Rebekah at a well. Now Jacob meets Rachel at a well.",
          "Jacob's emotion is intense. He kisses Rachel and weeps. The tears likely carry relief, exhaustion, family memory, and the weight of finally reaching his mother's people.",
          "But the reader should stay alert. Laban's welcome sounds warm, yet Laban will soon use family closeness for advantage. Genesis is preparing us to see Jacob inside another complicated household.",
        ],
      },
      {
        reference: "Genesis 29:15 to 30",
        title: "Laban Deceives Jacob",
        verses: [
          "Genesis 29:18 says Jacob loved Rachel.",
          "Genesis 29:23 says Laban took Leah his daughter, and brought her to Jacob.",
          "Genesis 29:25 says Jacob asked, Wherefore then hast thou beguiled me?",
        ],
        notes: [
          "Jacob agrees to serve seven years for Rachel. The text says the years seemed like only a few days because of his love for her. That line is beautiful, but it sits inside a story about exploitation.",
          "Laban switches Leah for Rachel. The deceiver is now deceived in the dark. Jacob once used clothing and blindness to deceive Isaac. Now Jacob is deceived through darkness, wedding customs, and Laban's control.",
          "The KJV word `beguiled` means deceived, tricked, or misled. Jacob's question to Laban sounds like poetic justice: why have you deceived me?",
          "Marriage customs in the ancient world involved family arrangements, bride service, feasting, and strong household authority. Laban uses the system to benefit himself.",
          "Leah and Rachel are not props. Leah is placed into a marriage where she is not loved the way Rachel is loved. Rachel is delayed and then brought into a household already wounded by comparison. The rivalry is being built by the adults' choices.",
        ],
      },
      {
        reference: "Genesis 29:31 to 35",
        title: "Leah Bears Sons",
        verses: [
          "Genesis 29:31 says when the LORD saw that Leah was hated, he opened her womb.",
          "Genesis 29:32 says Leah called his name Reuben.",
          "Genesis 29:35 says she called his name Judah.",
        ],
        notes: [
          "`Hated` here means unloved or less loved in comparison. It does not require Jacob actively despising Leah, but it does mean Leah is living with painful rejection.",
          "God sees Leah. That is one of the most important lines in the chapter. The family may organize itself around Jacob's love for Rachel, but God sees the woman who feels unwanted.",
          "Leah's sons' names reveal her heart. Reuben connects to being seen. Simeon connects to being heard. Levi connects to longing for attachment. Judah finally turns toward praise.",
          "Judah's birth matters far beyond Leah's immediate pain. From Judah will come the royal line and eventually the Messiah. Genesis is quietly showing God working through the unloved place.",
        ],
      },
    ],
    finalThought: [
      "Genesis 29 is romantic, painful, and morally complicated.",
      "Jacob finds Rachel, but he also meets consequences through Laban and begins a household marked by rivalry.",
    ],
    pause: [
      "How does Laban's deception echo Jacob's past?",
      "What does it mean to you that God saw Leah?",
      "Where can comparison quietly damage a family?",
    ],
    lesson:
      "Genesis 29 teaches that deception comes back with painful force, but God sees the wounded and keeps His promise moving through unexpected people.",
  },
  {
    chapter: 30,
    title: "Rivalry, Sons, and Jacob's Growing Wealth",
    hook: "Genesis 30 shows Jacob's household growing, but not peacefully.",
    setup: [
      "Rachel and Leah are locked in a painful rivalry. Children become tied to identity, status, attention, and grief.",
      "At the same time, the sons who will become tribes of Israel are being born inside a deeply wounded family system.",
    ],
    matters: [
      "It shows the birth of many sons of Jacob.",
      "It exposes jealousy between Rachel and Leah.",
      "It introduces Bilhah and Zilpah as handmaids drawn into the rivalry.",
      "It shows Jacob's wealth increasing under Laban's watch.",
    ],
    sections: [
      {
        reference: "Genesis 30:1 to 13",
        title: "Rachel, Leah, and the Handmaids",
        verses: [
          "Genesis 30:1 says Rachel envied her sister.",
          "Genesis 30:3 says Rachel gave Bilhah her handmaid to Jacob.",
          "Genesis 30:9 says Leah gave Zilpah her maid to Jacob.",
        ],
        notes: [
          "Rachel's words are raw: give me children, or else I die. This is emotional desperation. In the ancient world, children were tied to household security, inheritance, honor, and future.",
          "`Handmaid` means a female servant within the household. Bilhah and Zilpah are pulled into the rivalry as surrogate mothers. Genesis records this honestly, but recording something is not the same as celebrating it.",
          "The names of the children reveal the emotional battlefield: judgment, wrestling, fortune, happiness. These are not only baby names. They are Leah and Rachel's pain speaking out loud.",
          "The tribes of Israel are forming, but they are forming in a home marked by jealousy. That is deeply important. God's people begin through grace, not through a perfect family origin story.",
        ],
      },
      {
        reference: "Genesis 30:14 to 24",
        title: "Mandrakes, Longing, and God Remembering Rachel",
        verses: [
          "Genesis 30:14 mentions mandrakes in the field.",
          "Genesis 30:22 says God remembered Rachel.",
          "Genesis 30:24 says Rachel called his name Joseph.",
        ],
        notes: [
          "The mandrake scene feels strange to modern readers. Mandrakes were plants associated in the ancient world with fertility and desire. Rachel wants them because she longs for a child.",
          "The scene shows how painful the rivalry has become. Even time with Jacob is negotiated. The household is not emotionally healthy.",
          "Then the text says God remembered Rachel. As with Noah, `remembered` does not mean God forgot. It means God acts with care and covenant attention.",
          "Joseph is born, and Rachel's shame begins to lift. But even this joy sits inside a family system already full of comparison.",
        ],
      },
      {
        reference: "Genesis 30:25 to 43",
        title: "Jacob Grows Wealthy",
        verses: [
          "Genesis 30:25 says Jacob asked to return to his own place.",
          "Genesis 30:27 says Laban recognized the LORD had blessed him for Jacob's sake.",
          "Genesis 30:43 says Jacob increased exceedingly.",
        ],
        notes: [
          "Jacob wants to go home, but Laban wants to keep him because Jacob's presence has brought blessing. This is covenant overflow. Even Laban can see that Jacob is blessed.",
          "The flock arrangement is complicated, and readers debate the details. What matters in the story is that Jacob is trying to build provision for his own household while still dealing with Laban's self-interest.",
          "Jacob increases greatly. But prosperity does not resolve the deeper tension. Wealth is growing, sons are growing, resentment is growing, and Jacob's return home is getting closer.",
        ],
      },
    ],
    finalThought: [
      "Genesis 30 is full of births, but also full of pain.",
      "The tribes of Israel are being born in a household that desperately needs healing.",
    ],
    pause: [
      "What does Rachel's envy reveal about unmet longing?",
      "How do the children's names expose the emotional state of the family?",
      "Why does God forming Israel through this family give you hope?",
    ],
    lesson:
      "Genesis 30 teaches that God can build His covenant people through a family full of rivalry, longing, jealousy, and imperfect survival.",
  },
  {
    chapter: 31,
    title: "Jacob Flees Laban",
    hook: "Genesis 31 shows Jacob running again, but this time he is running from the household that once sheltered him.",
    setup: [
      "Jacob has spent years under Laban's manipulation. His wealth has grown, but trust has collapsed.",
      "God tells Jacob to return, Rachel steals the household idols, Laban pursues, and the chapter ends with a boundary covenant.",
    ],
    matters: [
      "It shows Jacob leaving Laban under God's direction.",
      "It exposes years of manipulation and mistrust.",
      "It shows Rachel stealing the images.",
      "It creates a covenant boundary between Jacob and Laban.",
    ],
    sections: [
      {
        reference: "Genesis 31:1 to 21",
        title: "God Tells Jacob to Return",
        verses: [
          "Genesis 31:3 says return unto the land of thy fathers.",
          "Genesis 31:7 says Laban changed Jacob's wages ten times.",
          "Genesis 31:19 says Rachel had stolen the images.",
        ],
        notes: [
          "Jacob sees Laban's face is no longer toward him as before. That means the relational atmosphere has changed. The blessing that made Jacob useful to Laban now makes him threatening.",
          "God tells Jacob to return. This matters because Jacob's journey began with exile, and now God begins moving him back toward the land of promise.",
          "Jacob explains to Rachel and Leah that Laban has changed his wages repeatedly. The family has been living inside manipulation for years.",
          "Rachel steals the household images. These may have been family gods or inheritance-linked objects. The act shows that Laban's household is spiritually mixed and that Rachel's own heart is complicated.",
        ],
      },
      {
        reference: "Genesis 31:22 to 42",
        title: "Laban Pursues Jacob",
        verses: [
          "Genesis 31:24 says God warned Laban in a dream.",
          "Genesis 31:30 says Laban asked why Jacob stole his gods.",
          "Genesis 31:42 says God saw Jacob's affliction and rebuked Laban.",
        ],
        notes: [
          "Laban pursues Jacob, but God warns him not to speak good or bad to Jacob. Even now, God protects Jacob.",
          "The scene with Rachel hiding the idols is tense and morally messy. She deceives her father, just as deception has been woven through this family story.",
          "Jacob does not know Rachel has the idols, so he speaks boldly. That creates dramatic irony. The reader knows what Jacob does not.",
          "Jacob finally names years of exploitation: heat by day, frost by night, lost sleep, changed wages, and hard service. Genesis lets us feel how long Jacob has lived under pressure.",
        ],
      },
      {
        reference: "Genesis 31:43 to 55",
        title: "A Covenant Boundary",
        verses: [
          "Genesis 31:44 says let us make a covenant.",
          "Genesis 31:46 says they made an heap.",
          "Genesis 31:49 says the LORD watch between me and thee.",
        ],
        notes: [
          "The covenant heap is not a warm friendship bracelet. It is a boundary marker between two men who do not fully trust each other.",
          "`Heap` means a pile of stones set up as a witness. The stones say: this far and no farther.",
          "Sometimes peace requires boundaries. Jacob and Laban do not solve all emotional damage. They mark a limit and part ways.",
          "Jacob's past with Laban is closing. But the harder meeting is still ahead: Esau.",
        ],
      },
    ],
    finalThought: [
      "Genesis 31 shows Jacob escaping manipulation, but not escaping all consequences.",
      "God is bringing him home, and home means facing the brother he once fled.",
    ],
    pause: [
      "Where do you see manipulation in Laban's relationship with Jacob?",
      "Why does returning home require courage for Jacob?",
      "What can a boundary protect when trust is broken?",
    ],
    lesson:
      "Genesis 31 teaches that God can call His people out of manipulation, protect them on the way, and use boundaries to close a painful season.",
  },
  {
    chapter: 32,
    title: "Jacob Wrestles With God",
    hook: "Genesis 32 is the night Jacob stops running and wrestles.",
    setup: [
      "Jacob is about to face Esau. The old wound is ahead of him, and the fear is real.",
      "He divides his camp, prays honestly, sends gifts, and then spends the night wrestling with a mysterious man until he receives a new name: Israel.",
    ],
    matters: [
      "It shows Jacob's fear before meeting Esau.",
      "It records one of Jacob's most honest prayers.",
      "It gives the wrestling scene where Jacob becomes Israel.",
      "It shows transformation through weakness.",
    ],
    sections: [
      {
        reference: "Genesis 32:1 to 12",
        title: "Jacob's Fear and Prayer",
        verses: [
          "Genesis 32:6 says Esau comes with four hundred men.",
          "Genesis 32:7 says Jacob was greatly afraid and distressed.",
          "Genesis 32:10 says I am not worthy of the least of all the mercies.",
        ],
        notes: [
          "Jacob hears Esau is coming with four hundred men. That sounds like threat, not reunion. His fear is understandable. The last clear memory is Esau wanting to kill him.",
          "Jacob divides the people into two camps. This is survival thinking. He is still strategizing, still calculating loss, still trying to manage fear.",
          "But Jacob also prays. This prayer is one of the most honest moments in his life. He appeals to God's command, God's promise, and God's mercy.",
          "Jacob admits he is not worthy. That is growth. The man who once grasped for blessing now confesses dependence.",
        ],
      },
      {
        reference: "Genesis 32:13 to 21",
        title: "Jacob Sends Gifts Ahead",
        verses: [
          "Genesis 32:13 says Jacob lodged there that same night.",
          "Genesis 32:20 says I will appease him with the present.",
          "Genesis 32:21 says the present went over before him.",
        ],
        notes: [
          "Jacob sends gifts ahead to Esau. This is diplomacy, apology, fear management, and survival strategy all together.",
          "The KJV word connected to appeasing carries the idea of covering or seeking favor. Jacob hopes the gifts will soften Esau's face before Jacob sees him.",
          "Jacob is changing, but he is not suddenly fearless. Genesis is realistic about transformation. Faith and fear can exist in the same chapter.",
        ],
      },
      {
        reference: "Genesis 32:22 to 32",
        title: "The Wrestling and the New Name",
        verses: [
          "Genesis 32:24 says there wrestled a man with him until the breaking of the day.",
          "Genesis 32:28 says thy name shall be called no more Jacob, but Israel.",
          "Genesis 32:31 says Jacob halted upon his thigh.",
        ],
        notes: [
          "Jacob is left alone, and a man wrestles with him until daybreak. The scene is mysterious on purpose. By the end, Jacob knows he has encountered God in some profound way.",
          "`Wrestled` means physical struggle, but the scene is also spiritual. Jacob has been wrestling his whole life: with Esau, Isaac, Laban, Rachel, Leah, fear, blessing, and identity. Now he wrestles with God.",
          "`Prevail` means to overcome or endure in the struggle. Jacob does not overpower God like a stronger opponent. He clings and refuses to let go without blessing.",
          "The man touches Jacob's thigh, and Jacob is wounded. The new name comes with a limp.",
          "`Israel` is connected to striving with God. Jacob is no longer only the heel-grabber. His identity is being renamed through encounter.",
          "`Halted upon his thigh` means he limped because of the injury. That limp matters. Jacob walks into reconciliation marked by weakness, not swagger.",
          "This is one of the deepest pictures of transformation in Genesis. God does not merely give Jacob information. He touches his strength, changes his name, and sends him forward limping.",
        ],
      },
    ],
    finalThought: [
      "Genesis 32 is the heart of Jacob's transformation.",
      "He enters the night as Jacob, afraid of Esau, and leaves as Israel, limping from an encounter with God.",
    ],
    pause: [
      "What are you wrestling with God about right now?",
      "Why does Jacob receive a limp with his new name?",
      "How does weakness prepare Jacob for reconciliation?",
    ],
    lesson:
      "Genesis 32 teaches that God transforms Jacob not by removing struggle, but by meeting him in it, renaming him, wounding his pride, and making him dependent.",
  },
  {
    chapter: 33,
    title: "Jacob and Esau Meet Again",
    hook: "Genesis 33 carries the tension of a lifetime into one meeting.",
    setup: [
      "Jacob has wrestled through the night. Now he must face Esau in the morning.",
      "The chapter is full of humility, fear, bowing, embrace, and cautious peace.",
    ],
    matters: [
      "It shows Jacob facing the brother he wronged.",
      "It gives one of Genesis's most emotional reconciliation scenes.",
      "It shows Esau receiving Jacob with surprising grace.",
      "It shows Jacob moving forward carefully after years of fear.",
    ],
    sections: [
      {
        reference: "Genesis 33:1 to 11",
        title: "The Brothers Meet",
        verses: [
          "Genesis 33:3 says Jacob bowed himself to the ground seven times.",
          "Genesis 33:4 says Esau ran to meet him, embraced him, and kissed him.",
          "Genesis 33:10 says Jacob saw Esau's face as though he had seen the face of God.",
        ],
        notes: [
          "Jacob bows seven times. This is humility, fear, and honor. The brother who once took the blessing now approaches low to the ground.",
          "Esau runs, embraces, kisses, and weeps. The scene is unexpectedly tender. Genesis lets Esau be more than Jacob's threat.",
          "Jacob says seeing Esau's face is like seeing the face of God. After Peniel, this line matters. Jacob has encountered God and now receives mercy through the face of the brother he feared.",
          "Reconciliation does not erase the past, but it changes the future.",
        ],
      },
      {
        reference: "Genesis 33:12 to 20",
        title: "Peace, Caution, and an Altar",
        verses: [
          "Genesis 33:14 says Jacob asks to lead on softly.",
          "Genesis 33:17 says Jacob journeyed to Succoth.",
          "Genesis 33:20 says he erected an altar and called it El-elohe-Israel.",
        ],
        notes: [
          "Jacob and Esau do not simply become roommates. There is peace, but also distance. This feels realistic. Some reconciliations are genuine but still cautious.",
          "Jacob moves slowly because of the children and flocks. The whole household has to move at a pace that preserves life.",
          "Jacob eventually builds an altar. The name means God, the God of Israel. That name matters because Jacob is learning to live under his new identity.",
        ],
      },
    ],
    finalThought: [
      "Genesis 33 is a mercy chapter.",
      "The brother Jacob feared becomes the brother who embraces him.",
    ],
    pause: [
      "What does Jacob's humility teach you about reconciliation?",
      "Why might peace still need wisdom and boundaries?",
      "Where do you need courage to face a hard conversation?",
    ],
    lesson:
      "Genesis 33 teaches that God can bring mercy into the very relationship we fear most, while still calling us to walk forward with humility and wisdom.",
  },
  {
    chapter: 34,
    title: "Dinah, Shechem, and Violent Revenge",
    hook: "Genesis 34 is one of the hardest chapters in Jacob's story.",
    setup: [
      "Dinah is violated, Shechem wants to marry her, Jacob's sons answer deceitfully, and Simeon and Levi carry out violent revenge.",
      "This chapter must be handled carefully. It deals with sexual violence, family dishonor, rage, deception, and moral chaos.",
    ],
    matters: [
      "It shows the danger and vulnerability around Jacob's household.",
      "It names sexual violence without minimizing it.",
      "It exposes revenge and deceit inside the family.",
      "It shows Simeon and Levi's violence becoming part of the family's future memory.",
    ],
    sections: [
      {
        reference: "Genesis 34:1 to 12",
        title: "Dinah and Shechem",
        verses: [
          "Genesis 34:1 says Dinah went out to see the daughters of the land.",
          "Genesis 34:2 says Shechem took her and lay with her.",
          "Genesis 34:7 says the sons of Jacob were grieved and very wroth.",
        ],
        notes: [
          "The text describes a violation. Dinah is not responsible for what Shechem does. The chapter should not be used to blame her.",
          "Shechem's later desire to marry Dinah does not erase the wrong. Genesis presents the act as folly and a thing that ought not to be done.",
          "Jacob's sons are grieved and angry. Their anger over harm done to their sister is understandable. But what they do with that anger becomes morally serious.",
        ],
      },
      {
        reference: "Genesis 34:13 to 24",
        title: "Deceptive Negotiation",
        verses: [
          "Genesis 34:13 says the sons of Jacob answered Shechem and Hamor deceitfully.",
          "Genesis 34:15 says they demanded circumcision.",
          "Genesis 34:23 shows the men of the city thinking about possessions and cattle.",
        ],
        notes: [
          "Jacob's sons use covenant sign language deceitfully. Circumcision was a sacred sign of covenant identity, but they weaponize it as part of a revenge plan.",
          "This is spiritually disturbing. Sacred things can be misused by angry people.",
          "The men of Shechem also reveal mixed motives. They talk about acquiring Jacob's cattle and goods. Nobody in the negotiation feels clean.",
        ],
      },
      {
        reference: "Genesis 34:25 to 31",
        title: "Simeon and Levi's Revenge",
        verses: [
          "Genesis 34:25 says Simeon and Levi slew all the males.",
          "Genesis 34:30 says Jacob feared being made to stink among the inhabitants of the land.",
          "Genesis 34:31 says should he deal with our sister as with an harlot?",
        ],
        notes: [
          "Simeon and Levi kill the men of the city while they are vulnerable. Their revenge is excessive and brutal.",
          "Jacob responds with fear about consequences. His sons respond with outrage over Dinah's dishonor. Both concerns reveal something, but neither fully heals the wound.",
          "This chapter leaves readers unsettled because sin has multiplied in every direction: violation, deceit, revenge, fear, and family fracture.",
          "Later, Jacob will remember Simeon and Levi's violence in Genesis 49. This moment becomes part of their legacy.",
        ],
      },
    ],
    finalThought: [
      "Genesis 34 is painful because it refuses easy answers.",
      "It shows real harm, real anger, and real moral danger when revenge takes control.",
    ],
    pause: [
      "Why is it important not to blame Dinah?",
      "How can righteous anger become destructive revenge?",
      "What does this chapter show about misusing sacred things?",
    ],
    lesson:
      "Genesis 34 teaches that violence and revenge do not heal family wounds, and that God's people must not use sacred signs to cover deceit.",
  },
  {
    chapter: 35,
    title: "Return to Bethel",
    hook: "Genesis 35 brings Jacob back to the place where God first met him.",
    setup: [
      "After the violence at Shechem, God calls Jacob back to Bethel. The family must put away strange gods, purify themselves, and return to worship.",
      "The chapter includes renewal, covenant reaffirmation, Rachel's death, Benjamin's birth, Reuben's sin, and Isaac's death.",
    ],
    matters: [
      "It shows spiritual renewal after a dark chapter.",
      "It brings Jacob back to Bethel.",
      "It reaffirms Jacob's name Israel and the covenant promise.",
      "It records Rachel's death and Benjamin's birth.",
    ],
    sections: [
      {
        reference: "Genesis 35:1 to 15",
        title: "God Calls Jacob Back to Bethel",
        verses: [
          "Genesis 35:1 says arise, go up to Bethel.",
          "Genesis 35:2 says put away the strange gods.",
          "Genesis 35:10 says thy name shall not be called any more Jacob, but Israel.",
        ],
        notes: [
          "God calls Jacob back to Bethel, the place of the ladder dream. This is return language. Jacob is being brought back to worship and identity.",
          "Jacob tells his household to put away strange gods. That connects back to Rachel's stolen images and the spiritual mixture in the family.",
          "Spiritual renewal involves leaving things behind. Bethel is not only a place to remember. It is a place to recommit.",
          "God repeats Jacob's new name, Israel, and reaffirms fruitfulness, nations, kings, and land. The covenant is still alive after all the mess.",
        ],
      },
      {
        reference: "Genesis 35:16 to 29",
        title: "Rachel, Benjamin, Reuben, and Isaac",
        verses: [
          "Genesis 35:18 says Rachel called his name Benoni, but Jacob called him Benjamin.",
          "Genesis 35:22 says Reuben lay with Bilhah.",
          "Genesis 35:29 says Isaac gave up the ghost and died.",
        ],
        notes: [
          "Rachel dies giving birth to Benjamin. The joy of another son is wrapped in grief. `Benoni` means son of my sorrow, while Benjamin is connected to son of the right hand.",
          "Jacob buries Rachel and sets a pillar on her grave. Again, a pillar marks memory, grief, and sacred history.",
          "Reuben's sin with Bilhah is another family wound. This will matter later when Jacob speaks over his sons.",
          "Isaac dies, and Jacob and Esau bury him together. That detail quietly shows the brothers standing together at their father's death after years of pain.",
        ],
      },
    ],
    finalThought: [
      "Genesis 35 is renewal mixed with grief.",
      "Jacob returns to Bethel, but the family story still carries sorrow, sin, and loss.",
    ],
    pause: [
      "What strange gods or old attachments need to be buried before renewal?",
      "Why does God repeat Jacob's new name?",
      "How does Rachel's death shape the emotional weight of the chapter?",
    ],
    lesson:
      "Genesis 35 teaches that God calls Jacob back to worship, reaffirms covenant identity, and remains faithful even as the family walks through grief and more brokenness.",
  },
  {
    chapter: 36,
    title: "Esau's Line Becomes Edom",
    hook: "Genesis 36 slows down to show that Esau's story does not disappear.",
    setup: [
      "The chapter traces Esau's descendants, chiefs, kings, and territory in Seir.",
      "It may look like a list, but it explains Edom and shows the brothers' lines separating into future peoples.",
    ],
    matters: [
      "It shows Esau becoming Edom.",
      "It traces a nation outside Jacob's covenant line.",
      "It explains the separation of Jacob and Esau's households.",
      "It prepares later Old Testament history involving Edom.",
    ],
    sections: [
      {
        reference: "Genesis 36:1 to 8",
        title: "Esau Moves to Seir",
        verses: [
          "Genesis 36:1 says these are the generations of Esau, who is Edom.",
          "Genesis 36:6 says Esau took his wives, sons, daughters, cattle, and goods.",
          "Genesis 36:8 says Esau dwelt in mount Seir.",
        ],
        notes: [
          "Genesis identifies Esau as Edom. This matters because Edom becomes a major neighbor and sometimes enemy of Israel later in Scripture.",
          "Esau moves away because the land cannot bear both brothers' possessions. The separation is practical, but it is also symbolic. The two brothers become two peoples.",
          "Jacob carries the covenant line, but Esau still has a real history, family, and territory. Genesis gives him space in the record.",
        ],
      },
      {
        reference: "Genesis 36:9 to 43",
        title: "Chiefs, Kings, and Edom's Future",
        verses: [
          "Genesis 36:9 says these are the generations of Esau the father of the Edomites.",
          "Genesis 36:31 says kings reigned in Edom before any king reigned over Israel.",
          "Genesis 36:43 closes with Esau, the father of the Edomites.",
        ],
        notes: [
          "The repeated names, chiefs, and kings show that Esau's line develops into organized power. The KJV word `dukes` means chiefs or clan leaders.",
          "Genesis notes that Edom had kings before Israel had kings. That detail prepares readers for later history and reminds us that worldly political development is not the same as covenant calling.",
          "Genealogies teach patience. They show that God knows the nations and remembers family lines beyond the main covenant focus.",
          "Genesis 36 gives closure before the Joseph story begins. Jacob's family remains the covenant line, but Esau's line becomes Edom, and the brothers' paths now move separately.",
        ],
      },
    ],
    finalThought: [
      "Genesis 36 is not filler.",
      "It shows Esau's line becoming Edom and prepares the Bible's later story of nations around Israel.",
    ],
    pause: [
      "Why does Genesis preserve Esau's genealogy?",
      "How does separation between Jacob and Esau become larger than one family?",
      "What does this chapter teach about God knowing nations and histories?",
    ],
    lesson:
      "Genesis 36 teaches that Esau's family becomes Edom, showing that family conflict can grow into national history while God's covenant story continues through Jacob.",
  },
];

function setJacobSections(chapterNumber: number, sections: JacobSection[]) {
  const chapter = jacobNotes.find((item) => item.chapter === chapterNumber);
  if (chapter) chapter.sections = sections;
}

setJacobSections(28, [
  {
    reference: "Genesis 28:1 to 5",
    title: "Jacob Is Sent Away With the Covenant Blessing",
    verses: [
      "Genesis 28:1 says Isaac blessed Jacob and charged him not to marry a daughter of Canaan.",
      "Genesis 28:3-4 speaks the blessing of Abraham over Jacob.",
      "Genesis 28:5 says Jacob went to Padan-aram.",
    ],
    notes: [
      "Jacob leaves home with a real blessing, but he does not leave with peace. Genesis 27 has fractured the family.",
      "Isaac now openly gives Jacob language connected to Abraham: fruitfulness, multiplication, land, and covenant inheritance.",
      "Marriage matters because covenant identity matters. Jacob is sent toward the family line rather than Canaanite marriage.",
      "The promise is moving forward, but Jacob is leaving as a man carrying consequences.",
    ],
  },
  {
    reference: "Genesis 28:6 to 9",
    title: "Esau Tries to Respond",
    verses: [
      "Genesis 28:6 says Esau saw Isaac bless Jacob.",
      "Genesis 28:8 says Esau saw that Canaanite daughters pleased not Isaac.",
      "Genesis 28:9 says Esau married Mahalath from Ishmael's line.",
    ],
    notes: [
      "Esau notices what displeases his parents and tries to respond through another marriage.",
      "This feels like an attempt to repair standing in the family, but it also shows how wounded and reactive the household has become.",
      "Genesis does not pause to explain Esau's motives fully. It simply shows a man responding after the blessing has already passed to Jacob.",
      "The family consequences of favoritism and deception continue to ripple.",
    ],
  },
  {
    reference: "Genesis 28:10 to 15",
    title: "Jacob Dreams of the Ladder",
    verses: [
      "Genesis 28:10-11 says Jacob left Beersheba and slept with stones for pillows.",
      "Genesis 28:12 says he saw a ladder reaching to heaven.",
      "Genesis 28:13-15 records God's covenant promise and presence.",
    ],
    notes: [
      "Jacob is alone in the wilderness. The man who grasped for blessing is now exposed, away from home, and uncertain.",
      "The ladder, or stairway, shows heaven and earth connected. Jacob's lonely place is not outside God's reach.",
      "God repeats land, seed, blessing, and presence. Jacob hears the Abrahamic promise personally.",
      "God says, `I am with thee.` Jacob is running from Esau, but he cannot outrun God.",
    ],
  },
  {
    reference: "Genesis 28:16 to 19",
    title: "Jacob Names the Place Bethel",
    verses: [
      "Genesis 28:16 says Jacob woke and realized the LORD was in that place.",
      "Genesis 28:17 calls the place the house of God and gate of heaven.",
      "Genesis 28:18-19 says Jacob set up the stone and called the place Bethel.",
    ],
    notes: [
      "Jacob wakes with holy fear. The wilderness has become sacred because God met him there.",
      "`Bethel` means house of God. Jacob names the place according to what he discovered.",
      "The stone becomes a `pillar`, a memorial marker. Jacob turns the place of vulnerability into a witness.",
      "This is the beginning of Jacob's personal walk with God, but it is not the end of his transformation.",
    ],
  },
  {
    reference: "Genesis 28:20 to 22",
    title: "Jacob Vows a Vow",
    verses: [
      "Genesis 28:20 says Jacob vowed a vow.",
      "Genesis 28:21 says if God brings him home, the LORD shall be his God.",
      "Genesis 28:22 says Jacob promises a tenth.",
    ],
    notes: [
      "`Vowed a vow` means Jacob made a solemn promise.",
      "His vow sounds conditional. Jacob is still learning to trust. He responds to God's promise with language that feels like negotiation.",
      "That honesty matters. Genesis does not pretend Jacob becomes mature overnight.",
      "God has begun the work, but Jacob's wrestling journey is only starting.",
    ],
  },
]);

setJacobSections(29, [
  {
    reference: "Genesis 29:1 to 8",
    title: "Jacob Arrives at the Well",
    verses: [
      "Genesis 29:1 says Jacob came into the land of the people of the east.",
      "Genesis 29:2-3 describes the well and the stone.",
      "Genesis 29:4-8 records Jacob speaking with the shepherds.",
    ],
    notes: [
      "The well scene feels like a new beginning. Wells in Genesis are places of provision, meeting, and future marriage.",
      "Jacob has left home in fear, but now the story opens a door of hope.",
      "The stone over the well creates tension because water is available, but not yet opened.",
      "The scene prepares us for Rachel's arrival and for Jacob's emotional response.",
    ],
  },
  {
    reference: "Genesis 29:9 to 14",
    title: "Jacob Meets Rachel",
    verses: [
      "Genesis 29:9 says Rachel came with her father's sheep.",
      "Genesis 29:10 says Jacob rolled the stone away.",
      "Genesis 29:11 says Jacob kissed Rachel and wept.",
      "Genesis 29:13-14 says Laban welcomed Jacob.",
    ],
    notes: [
      "Rachel enters as a shepherdess, and Jacob responds with sudden strength and emotion.",
      "His weeping likely carries relief, exhaustion, family memory, and the weight of finally reaching his mother's people.",
      "Laban welcomes Jacob with family language: bone and flesh.",
      "But readers should stay alert. Laban's warmth will soon become manipulation.",
    ],
  },
  {
    reference: "Genesis 29:15 to 20",
    title: "Jacob Serves for Rachel",
    verses: [
      "Genesis 29:15 says Laban asks what Jacob's wages should be.",
      "Genesis 29:17 contrasts Leah and Rachel.",
      "Genesis 29:18 says Jacob loved Rachel.",
      "Genesis 29:20 says seven years seemed like a few days for love.",
    ],
    notes: [
      "Jacob agrees to serve seven years for Rachel. The line about love is beautiful, but it sits inside a household where Laban holds the power.",
      "Leah is introduced in comparison to Rachel, which already places the sisters in a painful frame.",
      "Jacob's love for Rachel is clear and intense.",
      "Genesis is setting up both romance and rivalry at the same time.",
    ],
  },
  {
    reference: "Genesis 29:21 to 25",
    title: "Laban Deceives Jacob",
    verses: [
      "Genesis 29:21 says Jacob asks for his wife.",
      "Genesis 29:23 says Laban brought Leah to Jacob.",
      "Genesis 29:25 says Jacob asked why Laban beguiled him.",
    ],
    notes: [
      "The deceiver is deceived. Jacob, who deceived Isaac in blindness and disguise, is now deceived in darkness and wedding custom.",
      "The KJV word `beguiled` means deceived, tricked, or misled.",
      "Laban uses family authority and social custom to control the situation.",
      "Leah is also wounded by this deception. She is placed into a marriage where she is not loved as Rachel is loved.",
    ],
  },
  {
    reference: "Genesis 29:26 to 30",
    title: "Rachel Enters a Wounded Marriage",
    verses: [
      "Genesis 29:26 says Laban appeals to local custom.",
      "Genesis 29:27 says Jacob must fulfill Leah's week.",
      "Genesis 29:28-30 says Jacob also receives Rachel and loves Rachel more than Leah.",
    ],
    notes: [
      "Laban sounds reasonable, but his custom explanation comes after the deception, not before.",
      "Jacob receives Rachel too, but the home is already damaged.",
      "The phrase that Jacob loved Rachel more than Leah sets up years of comparison.",
      "The tribes of Israel will be born inside a family system already marked by manipulation and unequal love.",
    ],
  },
  {
    reference: "Genesis 29:31 to 35",
    title: "God Sees Leah",
    verses: [
      "Genesis 29:31 says the LORD saw Leah was hated and opened her womb.",
      "Genesis 29:32-34 names Reuben, Simeon, and Levi.",
      "Genesis 29:35 says Leah bore Judah and praised the LORD.",
    ],
    notes: [
      "`Hated` means unloved or less loved in comparison. Leah lives with painful rejection.",
      "God sees Leah. That is one of the most important lines in the chapter.",
      "The sons' names reveal Leah's heart: seen, heard, longing for attachment, and finally praise.",
      "Judah's birth matters far beyond this moment because the royal line will come through Judah.",
    ],
  },
]);

setJacobSections(30, [
  {
    reference: "Genesis 30:1 to 8",
    title: "Rachel's Envy and Bilhah's Sons",
    verses: [
      "Genesis 30:1 says Rachel envied Leah.",
      "Genesis 30:3 says Rachel gave Bilhah to Jacob.",
      "Genesis 30:6 names Dan.",
      "Genesis 30:8 names Naphtali.",
    ],
    notes: [
      "Rachel's words are raw: give me children, or else I die. This is desperation, not calm theology.",
      "In the ancient world, children were tied to honor, inheritance, security, and future.",
      "`Handmaid` means a female servant in the household. Bilhah is pulled into the sisters' rivalry.",
      "The names Dan and Naphtali speak Rachel's pain: judgment, vindication, and wrestling with her sister.",
    ],
  },
  {
    reference: "Genesis 30:9 to 13",
    title: "Leah Gives Zilpah",
    verses: [
      "Genesis 30:9 says Leah gave Zilpah to Jacob.",
      "Genesis 30:10-11 names Gad.",
      "Genesis 30:12-13 names Asher.",
    ],
    notes: [
      "Leah responds to Rachel's strategy with a strategy of her own. The rivalry pulls another servant woman, Zilpah, into the family conflict.",
      "Genesis records this honestly, but recording something is not the same as approving it.",
      "Gad and Asher are named with language of fortune and happiness.",
      "The tribes are forming, but they are forming inside a deeply wounded household.",
    ],
  },
  {
    reference: "Genesis 30:14 to 21",
    title: "Mandrakes and Leah's Longing",
    verses: [
      "Genesis 30:14 mentions mandrakes in the field.",
      "Genesis 30:15 shows Rachel and Leah negotiating.",
      "Genesis 30:17-20 names Issachar and Zebulun.",
      "Genesis 30:21 says Leah bore Dinah.",
    ],
    notes: [
      "Mandrakes were plants associated in the ancient world with fertility and desire. The detail shows how desperate the sisters' competition has become.",
      "Rachel and Leah negotiate over Jacob, which is heartbreaking. Marriage has become a battlefield.",
      "Leah keeps hoping that children will secure Jacob's affection.",
      "Dinah is named briefly here, but her story will become central and painful in Genesis 34.",
    ],
  },
  {
    reference: "Genesis 30:22 to 24",
    title: "God Remembers Rachel",
    verses: [
      "Genesis 30:22 says God remembered Rachel.",
      "Genesis 30:23 says Rachel conceived and bore a son.",
      "Genesis 30:24 says she called his name Joseph.",
    ],
    notes: [
      "`God remembered Rachel` means God acted with covenant care. It does not mean He forgot her before.",
      "Joseph's birth is a turning point. His name is tied to God adding another son.",
      "Rachel's shame is lifted, but the family rivalry is not magically healed.",
      "Joseph will later become central to the Genesis story, but he is born here into a home full of tension.",
    ],
  },
  {
    reference: "Genesis 30:25 to 34",
    title: "Jacob Wants to Leave and Laban Bargains",
    verses: [
      "Genesis 30:25 says Jacob asks to return home.",
      "Genesis 30:27 says Laban learned the LORD blessed him for Jacob's sake.",
      "Genesis 30:31-34 records the wage agreement.",
    ],
    notes: [
      "After Joseph is born, Jacob wants to go home. The longing for return begins to rise.",
      "Laban knows Jacob's presence has brought blessing, but he tries to keep control through wages.",
      "The agreement over speckled and spotted animals sounds strange to modern readers, but it is about wealth, labor, and ownership.",
      "Jacob is still living under Laban's manipulation, but he is beginning to seek his own household future.",
    ],
  },
  {
    reference: "Genesis 30:35 to 43",
    title: "Jacob's Flocks Increase",
    verses: [
      "Genesis 30:35-36 says Laban separates the animals.",
      "Genesis 30:37-42 describes Jacob's breeding strategy.",
      "Genesis 30:43 says Jacob increased exceedingly.",
    ],
    notes: [
      "This section is ancient livestock strategy, but the story point is clear: Jacob grows wealthy despite Laban's control.",
      "Genesis does not ask us to copy Jacob's method. It shows the conflict between two men who are both shrewd.",
      "Jacob's increase is another sign that God's promise is still moving.",
      "But wealth does not resolve the family tension. It will make Laban's household more suspicious in Genesis 31.",
    ],
  },
]);

setJacobSections(31, [
  {
    reference: "Genesis 31:1 to 3",
    title: "Laban's House Turns Against Jacob",
    verses: [
      "Genesis 31:1 says Laban's sons accuse Jacob of taking their father's glory.",
      "Genesis 31:2 says Laban's countenance changed.",
      "Genesis 31:3 says the LORD told Jacob to return.",
    ],
    notes: [
      "Jacob's prosperity creates resentment. Laban's sons see Jacob's wealth as loss for their own family.",
      "`Countenance` means face or expression. Laban's face tells Jacob the relationship has changed.",
      "God speaks into the tension and tells Jacob to return home.",
      "The same God who met Jacob at Bethel now calls him back toward the land of promise.",
    ],
  },
  {
    reference: "Genesis 31:4 to 13",
    title: "Jacob Explains God's Protection",
    verses: [
      "Genesis 31:4 says Jacob called Rachel and Leah to the field.",
      "Genesis 31:7 says Laban changed his wages ten times.",
      "Genesis 31:11-13 says God identified Himself as the God of Bethel.",
    ],
    notes: [
      "Jacob speaks privately with Rachel and Leah because the break with Laban is becoming serious.",
      "He names Laban's manipulation: wages changed again and again.",
      "God has protected Jacob despite Laban's schemes. The dream about the animals reminds Jacob that his increase was not merely cleverness.",
      "God calls Himself the God of Bethel, tying this moment to Jacob's earlier vow and encounter.",
    ],
  },
  {
    reference: "Genesis 31:14 to 21",
    title: "Rachel and Leah Agree to Leave",
    verses: [
      "Genesis 31:14-16 says Rachel and Leah feel treated like strangers.",
      "Genesis 31:17-18 says Jacob sets his family and goods on camels.",
      "Genesis 31:19 says Rachel stole Laban's images.",
      "Genesis 31:20-21 says Jacob fled secretly.",
    ],
    notes: [
      "Rachel and Leah agree that Laban has used them. Their words reveal years of hurt inside their father's house.",
      "Jacob leaves with wives, children, livestock, and goods. This is not a small move; it is a whole household departure.",
      "Rachel steals the household idols. This detail introduces spiritual and family tension that will follow them.",
      "Jacob flees secretly. Running is still part of his pattern.",
    ],
  },
  {
    reference: "Genesis 31:22 to 29",
    title: "Laban Pursues and God Warns Him",
    verses: [
      "Genesis 31:22-23 says Laban pursued Jacob.",
      "Genesis 31:24 says God warned Laban in a dream.",
      "Genesis 31:29 says Laban had power to hurt Jacob but God restrained him.",
    ],
    notes: [
      "Laban pursues Jacob like a threat. The family break becomes dangerous.",
      "God warns Laban not to speak good or bad to Jacob. That means Laban must not manipulate or harm him.",
      "Laban admits he has power, but God has limited him.",
      "Jacob is not protected because he is perfect. He is protected because God is faithful.",
    ],
  },
  {
    reference: "Genesis 31:30 to 35",
    title: "The Stolen Images",
    verses: [
      "Genesis 31:30 says Laban asks why his gods were stolen.",
      "Genesis 31:32 says Jacob does not know Rachel stole them.",
      "Genesis 31:34-35 says Rachel hides the images.",
    ],
    notes: [
      "The household images may have been tied to family religion, inheritance, or household authority. Whatever their exact role, Laban cares deeply about them.",
      "Jacob speaks strongly because he does not know Rachel has them.",
      "Rachel hides the idols and deceives her father. Deception is still active in this family system.",
      "The scene shows that leaving Laban's house physically is not the same as leaving every broken pattern behind.",
    ],
  },
  {
    reference: "Genesis 31:36 to 42",
    title: "Jacob Confronts Laban",
    verses: [
      "Genesis 31:36 says Jacob was wroth and chode with Laban.",
      "Genesis 31:38-40 describes Jacob's twenty years of labor.",
      "Genesis 31:41 says Laban changed his wages ten times.",
      "Genesis 31:42 says God saw Jacob's affliction.",
    ],
    notes: [
      "Jacob finally names the injustice he has endured. Years of pressure come out in one speech.",
      "His labor was costly: heat by day, cold by night, and constant responsibility for the flocks.",
      "Laban changed the terms repeatedly, but God saw Jacob's affliction.",
      "This matters because Genesis shows God seeing not only dramatic altar moments, but long seasons of unfair labor.",
    ],
  },
  {
    reference: "Genesis 31:43 to 55",
    title: "A Boundary Covenant",
    verses: [
      "Genesis 31:44 says Laban proposes a covenant.",
      "Genesis 31:45-49 describes the heap and witness.",
      "Genesis 31:52 says the heap is a boundary.",
      "Genesis 31:55 says Laban departs.",
    ],
    notes: [
      "This covenant is not warm reconciliation. It is a boundary agreement between people who do not trust each other.",
      "The heap of stones becomes a witness. It says: you stay on your side, and I will stay on mine.",
      "Sometimes peace requires boundaries, especially after manipulation.",
      "Jacob is free from Laban, but now he must face the brother he ran from years earlier.",
    ],
  },
]);

setJacobSections(32, [
  {
    reference: "Genesis 32:1 to 5",
    title: "Jacob Sends Word to Esau",
    verses: [
      "Genesis 32:1 says angels of God met Jacob.",
      "Genesis 32:3 says Jacob sent messengers to Esau.",
      "Genesis 32:4-5 records Jacob's humble message.",
    ],
    notes: [
      "God's angels meet Jacob as he returns toward danger. Heaven is still near the road.",
      "Jacob sends word to Esau because the old wound cannot be avoided forever.",
      "His message is humble. He calls Esau lord and himself servant.",
      "The man who once took the blessing by deception now approaches with fear and caution.",
    ],
  },
  {
    reference: "Genesis 32:6 to 8",
    title: "Jacob Is Greatly Afraid",
    verses: [
      "Genesis 32:6 says Esau is coming with four hundred men.",
      "Genesis 32:7 says Jacob was greatly afraid and distressed.",
      "Genesis 32:7-8 says Jacob divided the people into two bands.",
    ],
    notes: [
      "Four hundred men sounds like a fighting force. Jacob's fear is understandable.",
      "The words `greatly afraid and distressed` show inner panic, not mild concern.",
      "Jacob divides the camp as a survival strategy.",
      "This is Jacob under pressure: planning, calculating, and trying to survive the consequences of his past.",
    ],
  },
  {
    reference: "Genesis 32:9 to 12",
    title: "Jacob Prays Honestly",
    verses: [
      "Genesis 32:9 calls on the God of Abraham and Isaac.",
      "Genesis 32:10 says Jacob is not worthy of God's mercies.",
      "Genesis 32:11 asks God for deliverance.",
      "Genesis 32:12 remembers God's promise.",
    ],
    notes: [
      "This is one of Jacob's most honest prayers. He names God, remembers the command to return, confesses unworthiness, asks for rescue, and holds onto the promise.",
      "Jacob admits he is not worthy of God's mercy. That is growth.",
      "He is afraid of Esau, but he brings that fear to God.",
      "The prayer shows Jacob beginning to depend on God instead of only on schemes.",
    ],
  },
  {
    reference: "Genesis 32:13 to 21",
    title: "Jacob Sends Gifts Ahead",
    verses: [
      "Genesis 32:13-15 lists the gift for Esau.",
      "Genesis 32:16-20 spaces the droves apart.",
      "Genesis 32:20 says Jacob hopes to appease Esau.",
      "Genesis 32:21 says the present went before him.",
    ],
    notes: [
      "Jacob sends a massive gift ahead of him. The animals are not random; they are a carefully arranged peace offering.",
      "He spaces the servants and animals in waves, hoping repeated generosity will soften Esau.",
      "`Appease` means to cover, calm, or turn away anger. Jacob knows he wronged Esau and fears revenge.",
      "His prayer was real, but he is still Jacob. He prays and plans at the same time.",
    ],
  },
  {
    reference: "Genesis 32:22 to 26",
    title: "Jacob Wrestles in the Night",
    verses: [
      "Genesis 32:22-23 says Jacob sends his family across the brook.",
      "Genesis 32:24 says Jacob was left alone and wrestled with a man.",
      "Genesis 32:25 says his thigh was touched.",
      "Genesis 32:26 says Jacob refused to let go without blessing.",
    ],
    notes: [
      "Jacob is left alone. That detail matters. The man who has spent his life managing people and outcomes now meets God in the dark.",
      "`Wrestled` means real struggle. Jacob's transformation is not gentle and instant. It is intense.",
      "The touch on Jacob's thigh shows the mysterious man has power Jacob cannot match.",
      "Jacob clings and asks for blessing. This time he does not steal blessing by disguise. He limps into blessing through surrender.",
    ],
  },
  {
    reference: "Genesis 32:27 to 32",
    title: "Jacob Becomes Israel",
    verses: [
      "Genesis 32:27 asks Jacob his name.",
      "Genesis 32:28 gives him the name Israel.",
      "Genesis 32:30 says Jacob saw God face to face.",
      "Genesis 32:31 says Jacob halted upon his thigh.",
    ],
    notes: [
      "God asks Jacob's name. Years earlier, Jacob answered Isaac by saying he was Esau. Now he must say the truth: Jacob.",
      "The new name Israel marks transformation. Jacob is still Jacob, but God is naming a new future.",
      "`Halted upon his thigh` means Jacob limped. The wound becomes a reminder of the encounter.",
      "Jacob leaves changed, blessed, and weakened. That is the paradox of this chapter.",
    ],
  },
]);

setJacobSections(33, [
  {
    reference: "Genesis 33:1 to 4",
    title: "Esau Runs to Jacob",
    verses: [
      "Genesis 33:1 says Jacob saw Esau coming with four hundred men.",
      "Genesis 33:3 says Jacob bowed seven times.",
      "Genesis 33:4 says Esau ran, embraced him, and wept.",
    ],
    notes: [
      "The feared moment finally arrives. Esau is in front of Jacob.",
      "Jacob bows repeatedly, showing humility and vulnerability.",
      "Then Esau runs to him. The brother Jacob feared becomes the brother who embraces him.",
      "The scene is full of mercy. Years of fear meet a moment of unexpected tenderness.",
    ],
  },
  {
    reference: "Genesis 33:5 to 11",
    title: "Jacob Offers the Gift",
    verses: [
      "Genesis 33:5 says Esau sees the women and children.",
      "Genesis 33:8 asks what Jacob means by the drove.",
      "Genesis 33:10 says Jacob saw Esau's face as the face of God.",
      "Genesis 33:11 says Esau accepted the gift.",
    ],
    notes: [
      "Esau sees Jacob's family, not only Jacob's wealth. This makes the reconciliation deeply personal.",
      "Jacob insists Esau receive the gift. The gift is not just generosity; it is Jacob's attempt to acknowledge the wrong and seek peace.",
      "When Jacob says Esau's face is like the face of God, he means mercy met him where he expected judgment.",
      "Esau accepting the gift helps release the tension between them.",
    ],
  },
  {
    reference: "Genesis 33:12 to 17",
    title: "The Brothers Separate Peacefully",
    verses: [
      "Genesis 33:12 says Esau offers to journey with Jacob.",
      "Genesis 33:13-14 says Jacob asks to move slowly.",
      "Genesis 33:16 says Esau returned to Seir.",
      "Genesis 33:17 says Jacob journeyed to Succoth.",
    ],
    notes: [
      "Reconciliation is real, but the brothers do not merge households.",
      "Jacob moves cautiously because of the children and flocks. The pace of the vulnerable matters.",
      "Esau returns to Seir, and Jacob goes to Succoth.",
      "This is important emotionally: forgiveness can be real even when distance remains wise.",
    ],
  },
  {
    reference: "Genesis 33:18 to 20",
    title: "Jacob Builds an Altar",
    verses: [
      "Genesis 33:18 says Jacob came to Shalem near Shechem.",
      "Genesis 33:19 says he bought a parcel of a field.",
      "Genesis 33:20 says he built an altar called El-elohe-Israel.",
    ],
    notes: [
      "Jacob arrives back in the land and buys a piece of ground. The promise is still moving from sojourning toward possession.",
      "He builds an altar. Worship marks the return.",
      "`El-elohe-Israel` means God, the God of Israel. Jacob is using the new name God gave him.",
      "The chapter ends with worship after fear, wrestling, and reconciliation.",
    ],
  },
]);

setJacobSections(34, [
  {
    reference: "Genesis 34:1 to 4",
    title: "Dinah Is Violated",
    verses: [
      "Genesis 34:1 says Dinah went out to see the daughters of the land.",
      "Genesis 34:2 says Shechem took her and lay with her.",
      "Genesis 34:3-4 says Shechem desired Dinah and asked to marry her.",
    ],
    notes: [
      "Genesis 34 is one of the hardest chapters in Jacob's story and must be handled carefully.",
      "Dinah is not to blame for what happens to her. The text places the action on Shechem.",
      "Shechem's desire after the violation does not erase the wrong. Wanting marriage afterward does not undo harm.",
      "The chapter begins with trauma, and everything that follows responds to that trauma in broken ways.",
    ],
  },
  {
    reference: "Genesis 34:5 to 12",
    title: "Jacob Hears and Hamor Negotiates",
    verses: [
      "Genesis 34:5 says Jacob heard Dinah was defiled.",
      "Genesis 34:7 says Jacob's sons were grieved and very wroth.",
      "Genesis 34:8-10 records Hamor's proposal.",
      "Genesis 34:11-12 records Shechem offering bride price and gift.",
    ],
    notes: [
      "Jacob hears, but he waits for his sons. His quietness is troubling in a chapter where Dinah has been harmed.",
      "The brothers are grieved and angry. Their anger is understandable, though their later revenge becomes morally dangerous.",
      "Hamor speaks in terms of intermarriage and economic connection between peoples.",
      "Shechem offers payment, but money cannot heal violation or erase guilt.",
    ],
  },
  {
    reference: "Genesis 34:13 to 17",
    title: "The Brothers Answer Deceitfully",
    verses: [
      "Genesis 34:13 says Jacob's sons answered deceitfully.",
      "Genesis 34:14 says they cannot give Dinah to an uncircumcised man.",
      "Genesis 34:15-17 sets circumcision as the condition.",
    ],
    notes: [
      "The text tells us plainly that the brothers speak deceitfully.",
      "Circumcision is the covenant sign given to Abraham, but here it is used as a weapon in a plan of revenge.",
      "That is spiritually serious. A holy sign is being twisted into a trap.",
      "Genesis is not approving the brothers' strategy. It is exposing how grief and rage can become deception.",
    ],
  },
  {
    reference: "Genesis 34:18 to 24",
    title: "The Men of the City Agree",
    verses: [
      "Genesis 34:18-19 says Hamor and Shechem were pleased.",
      "Genesis 34:21-23 presents the agreement as profitable.",
      "Genesis 34:24 says the men were circumcised.",
    ],
    notes: [
      "Hamor and Shechem present the agreement to the city in economic terms: land, trade, livestock, and wealth.",
      "This reveals that the negotiations are not only about Dinah. They are also about power and gain.",
      "The men of the city agree, unaware that they are entering a trap.",
      "The whole scene is filled with exploitation, calculation, and hidden motives.",
    ],
  },
  {
    reference: "Genesis 34:25 to 31",
    title: "Simeon and Levi Take Revenge",
    verses: [
      "Genesis 34:25 says Simeon and Levi killed the males while they were sore.",
      "Genesis 34:26 says they took Dinah out of Shechem's house.",
      "Genesis 34:27-29 says Jacob's sons spoiled the city.",
      "Genesis 34:30-31 records Jacob's fear and the brothers' answer.",
    ],
    notes: [
      "Simeon and Levi rescue Dinah from Shechem's house, but they also slaughter and plunder the city.",
      "Genesis does not ask us to choose between ignoring Dinah's violation and excusing revenge. Both the violation and the revenge are morally weighty.",
      "Jacob's response focuses on danger to himself and the household, which again feels inadequate in light of Dinah's suffering.",
      "The brothers' final question is piercing: should he deal with our sister as with an harlot? The chapter ends unresolved, painful, and morally tense.",
    ],
  },
]);

setJacobSections(35, [
  {
    reference: "Genesis 35:1 to 5",
    title: "Return to Bethel",
    verses: [
      "Genesis 35:1 says God told Jacob to go to Bethel and make an altar.",
      "Genesis 35:2 says Jacob told his household to put away strange gods.",
      "Genesis 35:4 says they gave Jacob the strange gods and earrings.",
      "Genesis 35:5 says the terror of God protected them.",
    ],
    notes: [
      "After the darkness of Genesis 34, God calls Jacob back to Bethel, the place where He first met him.",
      "Jacob tells his household to put away strange gods. Spiritual renewal requires removing rival loyalties.",
      "The buried idols show that Jacob's household still carried spiritual compromise.",
      "God protects them as they move. Grace is still holding this family together.",
    ],
  },
  {
    reference: "Genesis 35:6 to 8",
    title: "The Altar and Deborah's Death",
    verses: [
      "Genesis 35:6 says Jacob came to Luz, which is Bethel.",
      "Genesis 35:7 says he built an altar.",
      "Genesis 35:8 says Deborah died and was buried.",
    ],
    notes: [
      "Jacob obeys and builds the altar. Bethel is no longer only a memory; it becomes a renewed place of worship.",
      "The name El-bethel means God of Bethel. Jacob is honoring the God who met him when he fled.",
      "Deborah's death adds grief to the renewal scene. Genesis often holds worship and sorrow together.",
      "Returning to God does not mean the story becomes painless.",
    ],
  },
  {
    reference: "Genesis 35:9 to 15",
    title: "God Reaffirms Jacob's Name and Promise",
    verses: [
      "Genesis 35:9 says God appeared to Jacob again.",
      "Genesis 35:10 says his name shall be Israel.",
      "Genesis 35:11-12 repeats fruitfulness, nations, kings, and land.",
      "Genesis 35:14-15 says Jacob set up a pillar and called the place Bethel.",
    ],
    notes: [
      "God reaffirms Jacob's new name. Israel is not a one-night label; it is Jacob's covenant identity.",
      "The promise expands with language of nations and kings. The family story is moving toward a people and a kingdom.",
      "Land is repeated because the covenant is still tied to God's promise to Abraham and Isaac.",
      "Jacob marks the place again. Memory matters in a long transformation journey.",
    ],
  },
  {
    reference: "Genesis 35:16 to 20",
    title: "Rachel Dies as Benjamin Is Born",
    verses: [
      "Genesis 35:16 says Rachel travailed and had hard labour.",
      "Genesis 35:18 says she named him Ben-oni, but Jacob called him Benjamin.",
      "Genesis 35:19-20 says Rachel died and was buried.",
    ],
    notes: [
      "This is one of the most heartbreaking moments in Jacob's story. Rachel, the woman Jacob loved deeply, dies giving birth.",
      "Ben-oni means son of my sorrow. Benjamin means son of the right hand.",
      "Jacob renames the child without erasing the grief. The birth carries both sorrow and future.",
      "Rachel's burial marker becomes a memory of love, loss, and the cost carried inside this family.",
    ],
  },
  {
    reference: "Genesis 35:21 to 26",
    title: "Reuben's Sin and Jacob's Sons",
    verses: [
      "Genesis 35:21 says Israel journeyed.",
      "Genesis 35:22 says Reuben lay with Bilhah.",
      "Genesis 35:23-26 lists the sons of Jacob.",
    ],
    notes: [
      "Reuben's sin is a serious violation inside the family. It is not a random scandal; it affects honor, authority, and future blessing.",
      "Jacob hears of it, and later Genesis 49 will return to Reuben's failure.",
      "The list of sons reminds us that the tribes of Israel are now formed.",
      "Genesis does not hide the family's sin even while showing that God is building a people through them.",
    ],
  },
  {
    reference: "Genesis 35:27 to 29",
    title: "Isaac Dies",
    verses: [
      "Genesis 35:27 says Jacob came to Isaac at Mamre.",
      "Genesis 35:28 says Isaac lived one hundred and eighty years.",
      "Genesis 35:29 says Isaac died and Esau and Jacob buried him.",
    ],
    notes: [
      "Jacob returns to his father before Isaac dies. This gives closure to the Isaac generation.",
      "Esau and Jacob bury Isaac together. The brothers are no longer in the same covenant role, but they share this grief.",
      "Isaac's death marks the transition from the Isaac story to the sons of Jacob.",
      "The promise continues, but another generation has passed.",
    ],
  },
]);

setJacobSections(36, [
  {
    reference: "Genesis 36:1 to 8",
    title: "Esau Moves Away from Jacob",
    verses: [
      "Genesis 36:1 introduces the generations of Esau.",
      "Genesis 36:2-5 names Esau's wives and sons.",
      "Genesis 36:6-8 says Esau moved to Seir because their possessions were too great.",
    ],
    notes: [
      "Genesis 36 gives Esau's genealogy before the Joseph story begins. Esau is not the covenant heir, but he is not erased.",
      "His marriages and sons show his family becoming a people.",
      "Esau moves away from Jacob because the land cannot bear both households.",
      "The separation between brothers now becomes geographical and eventually national.",
    ],
  },
  {
    reference: "Genesis 36:9 to 14",
    title: "The Sons of Esau in Edom",
    verses: [
      "Genesis 36:9 calls Esau the father of the Edomites.",
      "Genesis 36:10-14 lists sons and grandsons.",
    ],
    notes: [
      "Esau becomes Edom. This matters because Edom will appear later in Israel's story.",
      "The genealogy turns family conflict into national history.",
      "Names that feel distant here become part of the Bible's later map of peoples around Israel.",
      "Genesis is showing that God knows the nations, not only the main covenant line.",
    ],
  },
  {
    reference: "Genesis 36:15 to 19",
    title: "Chiefs from Esau",
    verses: [
      "Genesis 36:15 introduces dukes, or chiefs, of Esau.",
      "Genesis 36:16-18 lists chiefs from Eliphaz, Reuel, and Aholibamah.",
      "Genesis 36:19 summarizes the chiefs of Edom.",
    ],
    notes: [
      "The KJV word `dukes` means chiefs or clan leaders. Esau's family is becoming politically organized.",
      "This shows growth, structure, and power outside the Jacob line.",
      "Genesis is not saying only Jacob's family has history. Esau's family has leaders, clans, and territory.",
      "But the covenant storyline will continue through Jacob.",
    ],
  },
  {
    reference: "Genesis 36:20 to 30",
    title: "The Horites of Seir",
    verses: [
      "Genesis 36:20 introduces the sons of Seir the Horite.",
      "Genesis 36:21-28 lists Horite clans.",
      "Genesis 36:29-30 summarizes the Horite chiefs.",
    ],
    notes: [
      "The Horites were connected to the land of Seir before Edom's rise.",
      "Genesis includes them because Esau's story is tied to real peoples and places.",
      "This section helps explain the world around Edom and later Israel.",
      "The Bible is building a historical map, not just a family tree.",
    ],
  },
  {
    reference: "Genesis 36:31 to 39",
    title: "Kings in Edom",
    verses: [
      "Genesis 36:31 says kings reigned in Edom before any king over Israel.",
      "Genesis 36:32-39 lists Edomite kings.",
    ],
    notes: [
      "Edom has kings before Israel has kings. That detail matters.",
      "It shows Edom developing political strength while Jacob's family is still moving toward Egypt and later nationhood.",
      "Power can rise outside the covenant line, but power is not the same as covenant promise.",
      "Genesis is preparing readers for future relationships between Israel and Edom.",
    ],
  },
  {
    reference: "Genesis 36:40 to 43",
    title: "Esau's Chiefs and the Close of His Line",
    verses: [
      "Genesis 36:40-43 lists chiefs according to families and places.",
      "Genesis 36:43 calls Esau the father of the Edomites.",
    ],
    notes: [
      "The chapter closes by summarizing Esau's chiefs according to their families and places.",
      "The repeated title `father of the Edomites` makes the main point clear: Esau's family has become Edom.",
      "This gives closure before Genesis turns to Joseph and Jacob's sons.",
      "Jacob carries the covenant line, but Esau's line remains part of the world God sees and the Bible remembers.",
    ],
  },
]);

function normalizeJacobVerseFlow() {
  for (const chapter of jacobNotes) {
    chapter.sections = chapter.sections.flatMap((section) => {
      const match = section.reference.match(/^Genesis (\d+):(\d+) to (\d+)$/);
      if (!match) return [section];
      const chapterNumber = Number(match[1]);
      const start = Number(match[2]);
      const end = Number(match[3]);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end - start + 1 <= 5) return [section];

      const chunks: JacobSection[] = [];
      const totalVerses = end - start + 1;
      const chunkSize = totalVerses <= 8 ? Math.ceil(totalVerses / 2) : 5;
      for (let chunkStart = start; chunkStart <= end; chunkStart += chunkSize) {
        const chunkEnd = Math.min(end, chunkStart + chunkSize - 1);
        const firstChunk = chunkStart === start;
        chunks.push({
          reference: `Genesis ${chapterNumber}:${chunkStart} to ${chunkEnd}`,
          title: firstChunk ? section.title : `${section.title} Continued`,
          verses: [`Genesis ${chapterNumber}:${chunkStart}-${chunkEnd} carries this step in Jacob's story.`],
          notes: firstChunk
            ? section.notes
            : [
                "Read this continued section as its own movement in Jacob's transformation.",
                "Watch the action closely here: Jacob's fear, family conflict, manipulation, grief, worship, or transformation develops one step at a time.",
                "Genesis is showing slow change. Each unit helps you see how God works through consequences, struggle, and covenant mercy.",
              ],
        });
      }
      return chunks;
    });
  }
}

normalizeJacobVerseFlow();

function buildJacobNotes(chapter: JacobChapterNote) {
  const chapterFlow = chapter.sections.map((section) => `- 📍 ${section.title}`).join("\n");
  const finalThought = chapter.finalThought.map((item) => `- ${item}`).join("\n");
  const pause = chapter.pause.map((item) => `- ${item}`).join("\n");
  const threads = jacobThreads.map((item) => `- ${item}`).join("\n");

  const base = `# Genesis ${chapter.chapter}\n\n# ${chapter.title}\n\n${chapter.hook}\n\n${chapter.setup.join("\n\n")}\n\n## Why Genesis ${chapter.chapter} Matters\n\n${chapter.matters.map((item) => `- ${item}`).join("\n")}\n\n## Wrestling of Jacob Threads To Keep Watching\n\n${threads}\n\n## Chapter Flow\n\n${chapterFlow}\n\n# Deep Chapter Notes\n\n${chapter.sections.map(buildSection).join("\n\n")}`;
  return `${base}\n\n# The Big Lesson of Genesis ${chapter.chapter}\n\n${chapter.lesson}\n\n# Final Thought on Genesis ${chapter.chapter}\n\n${finalThought}\n\n# Pause and Reflect\n\n${pause}`;
}

export const WRESTLING_OF_JACOB_DEEP_NOTES = jacobNotes.map(buildJacobNotes);
