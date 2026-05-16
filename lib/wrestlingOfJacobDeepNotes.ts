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
  return `## ${section.reference}\n\n# ${section.title}\n\n${verseCallouts(section.verses)}\n\n${section.notes.join("\n\n")}`;
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

function buildJacobNotes(chapter: JacobChapterNote) {
  const chapterFlow = chapter.sections.map((section) => `- 📍 ${section.title}`).join("\n");
  const finalThought = chapter.finalThought.map((item) => `- ${item}`).join("\n");
  const pause = chapter.pause.map((item) => `- ${item}`).join("\n");
  const threads = jacobThreads.map((item) => `- ${item}`).join("\n");

  return `# Genesis ${chapter.chapter}\n\n# ${chapter.title}\n\n${chapter.hook}\n\n${chapter.setup.join("\n\n")}\n\n## Why Genesis ${chapter.chapter} Matters\n\n${chapter.matters.map((item) => `- ${item}`).join("\n")}\n\n## Wrestling of Jacob Threads To Keep Watching\n\n${threads}\n\n## Chapter Flow\n\n${chapterFlow}\n\n# Deep Chapter Notes\n\n${chapter.sections.map(buildSection).join("\n\n")}\n\n# The Big Lesson of Genesis ${chapter.chapter}\n\n${chapter.lesson}\n\n# Final Thought on Genesis ${chapter.chapter}\n\n${finalThought}\n\n# Pause and Reflect\n\n${pause}`;
}

export const WRESTLING_OF_JACOB_DEEP_NOTES = jacobNotes.map(buildJacobNotes);
