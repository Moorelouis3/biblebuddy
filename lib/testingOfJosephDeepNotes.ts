type JosephSection = {
  range: string;
  heading: string;
  focus: string[];
  breakdown: string[];
};

type JosephChapterNotes = {
  chapter: number;
  title: string;
  intro: string[];
  flow: string[];
  sections: JosephSection[];
  lesson: string[];
};

const sectionIcons = ["🔎", "🧭", "⚠️", "🌱", "🙏"];

function renderEmojiList(items: string[]) {
  return items.map((item, index) => `- ${sectionIcons[index % sectionIcons.length]} ${item}`).join("\n");
}

function renderSection(chapter: number, section: JosephSection) {
  return `## 📖 Genesis ${chapter}:${section.range}

## ${section.heading}

${renderEmojiList(section.focus)}

${section.breakdown.join("\n\n")}`;
}

function renderJosephNotes(notes: JosephChapterNotes) {
  return `# ${notes.title}

${notes.intro.join("\n\n")}

## 📍 The Chapter Flow

${notes.flow.map((item) => `- ${item}`).join("\n")}

${notes.sections.map((section) => renderSection(notes.chapter, section)).join("\n\n")}

## 💡 The Big Lesson of Genesis ${notes.chapter}

${notes.lesson.join("\n\n")}
`;
}

const josephNotes: JosephChapterNotes[] = [
  {
    chapter: 37,
    title: "🌙 Genesis 37 — The Coat, The Dreams, And The Pit",
    intro: [
      "Genesis 37 begins the Testing of Joseph by pulling us into a family that is already carrying tension. Joseph does not start in Egypt. He starts at home, surrounded by favoritism, jealousy, silence, resentment, and dreams nobody around him knows how to receive.",
      "This chapter is not only about a young man being sold by his brothers. It is about how a wound grows before it becomes an action. The hatred does not appear out of nowhere. It builds through favoritism, comparison, misunderstood calling, and the slow hardening of hearts.",
      "Like the Proverbs notes, we need to slow down and watch the path. Genesis 37 shows that a person can be marked by God and still be misunderstood by people. It also shows that family sin can become a road that carries everyone farther than they meant to go.",
    ],
    flow: [
      "🏠 Verses 1-4: Favoritism creates visible tension in Jacob's house",
      "💭 Verses 5-11: Joseph's dreams reveal purpose but increase hatred",
      "🛣️ Verses 12-17: Joseph walks toward the brothers who resent him",
      "🕳️ Verses 18-28: The brothers move from hatred to betrayal",
      "🩸 Verses 29-36: The coat becomes a cover for grief and deception",
    ],
    sections: [
      {
        range: "1-4",
        heading: "🏠 Favor Becomes Visible In A Broken House",
        focus: ["Jacob is living in the land of promise but his home is not healthy", "Joseph is loved openly in a way his brothers can see", "the coat becomes a symbol before the pit ever appears"],
        breakdown: [
          "Genesis 37 opens with Jacob in Canaan, the land tied to God's promise. That matters because the family is in the right land, but not everything inside the family is right. Scripture is honest enough to show both things at the same time.",
          "Jacob loves Joseph more than his other sons, and the special coat makes that love visible. Favoritism does not stay private when it is worn in public. Every time Joseph appears in the coat, the family wound is being touched again.",
          "This does not mean Joseph is the villain. It means Joseph is living inside a family system he did not create. He is favored by his father, resented by his brothers, and placed in the middle of tensions older than he is.",
          "That is one of the first deep lessons of Joseph's story: sometimes your test begins in dynamics you inherited. Joseph did not choose Jacob's favoritism, but he had to live with the pressure it created.",
        ],
      },
      {
        range: "5-11",
        heading: "💭 True Dreams Can Still Be Hard To Carry",
        focus: ["Joseph dreams of future elevation", "his brothers hear the dreams as a threat", "Jacob rebukes Joseph but still keeps the matter in mind"],
        breakdown: [
          "Joseph's dreams are not random imagination. They point toward a future God will eventually bring to pass. But at this point in the story, Joseph does not have the maturity, timing, or context to understand how costly those dreams will be.",
          "The brothers hear the dreams through the wound already inside them. Because they already hate Joseph, they do not receive the dreams as revelation. They receive them as another reason to resent him.",
          "This is where the chapter becomes emotionally realistic. A true calling does not always make relationships easier. Sometimes what God is doing in one person exposes jealousy in another person.",
          "Jacob's response is mixed. He rebukes Joseph, but he also observes the saying. That small detail matters. Jacob does not fully understand the dream, but something in him knows this may be more than youthful arrogance.",
        ],
      },
      {
        range: "12-17",
        heading: "🛣️ Joseph Walks Toward The Place Of Testing",
        focus: ["Jacob sends Joseph to check on his brothers", "Joseph obeys and searches until he finds them", "the path to Dothan becomes the path to the pit"],
        breakdown: [
          "This section feels ordinary, but it is full of movement. Joseph is sent. He goes. He wanders. He asks. He keeps looking. The story slows down so we can feel him walking toward a moment he cannot see.",
          "That is how many tests begin. They do not announce themselves as life-changing. They look like normal obedience, a normal errand, a normal day, a normal road.",
          "Joseph is not walking toward Egypt on purpose. He is trying to find his brothers. But the road toward his brothers becomes the road toward the pit, the caravan, Egypt, prison, and eventually the palace.",
          "This is why Genesis 37 has to be read with patience. God is not mentioned loudly in every verse, but the story is already being carried forward in ways Joseph cannot control.",
        ],
      },
      {
        range: "18-28",
        heading: "🕳️ Hatred Turns Into A Plan",
        focus: ["the brothers see Joseph before he reaches them", "they mock him as the dreamer", "Reuben tries to slow the evil but does not fully stop it", "Judah suggests selling Joseph instead of killing him"],
        breakdown: [
          "The brothers see Joseph from far off, and before he gets near enough to speak, they have already decided what he means to them. That is dangerous. Bitterness can make a person interpret someone before they ever arrive.",
          "They call him the dreamer. The word becomes a way to reduce him. They are not thinking of him as their brother. They are thinking of him as the symbol of everything they resent.",
          "Reuben's intervention matters, but it is incomplete. He keeps Joseph from being killed immediately, but he does not bring full righteousness into the moment. Delayed evil is not the same as courage.",
          "Judah's idea to sell Joseph shows how sin can look for a practical version of itself. They avoid murder, but they still betray. They spare his blood, but sell his life. The pit becomes the place where hatred becomes action.",
        ],
      },
      {
        range: "29-36",
        heading: "🩸 The Coat Is Used To Hide The Crime",
        focus: ["Reuben returns too late", "the brothers use blood and the coat to deceive Jacob", "Jacob grieves without knowing the truth", "Joseph is carried into Egypt"],
        breakdown: [
          "The coat that once displayed favoritism now becomes evidence in a lie. That is painfully fitting. The symbol that stirred jealousy becomes the tool used to hide what jealousy did.",
          "Jacob is deceived by his sons in a way that echoes his own earlier life of deception. Genesis often shows that sin does not stay isolated. It moves through families, patterns, habits, and consequences.",
          "Joseph disappears from the family's view, but he does not disappear from God's story. The chapter ends with Joseph in Egypt, sold to Potiphar. From the brothers' perspective, the dreamer is gone. From God's perspective, the road has just opened.",
          "That is the tension of Genesis 37. The chapter ends in grief, but not in hopelessness. The pit is real. The betrayal is real. The pain is real. But the story is not finished.",
        ],
      },
    ],
    lesson: [
      "Genesis 37 teaches that testing often begins before anyone can name it. Joseph's test begins in a home marked by favoritism, jealousy, and misunderstood dreams.",
      "The chapter warns us to take resentment seriously. Hatred rarely stays still. If it is fed, it begins to plan. If it plans long enough, it eventually acts.",
      "But Genesis 37 also teaches hope. People can strip the coat, hide the evidence, and sell Joseph away, but they cannot cancel what God is carrying forward.",
    ],
  },
  {
    chapter: 38,
    title: "⚖️ Genesis 38 — Judah, Tamar, And The Truth That Interrupts",
    intro: [
      "Genesis 38 feels like a sudden interruption, but it is placed here on purpose. Right after Joseph is sold, the story turns to Judah so we can see what is happening inside the family that betrayed him.",
      "This chapter is uncomfortable because it deals with responsibility, hypocrisy, sexual sin, injustice, and exposure. But it is also deeply important because Judah will later become the brother who offers himself for Benjamin. Before that change is visible, this chapter shows the truth confronting him.",
      "Like Proverbs, Genesis 38 teaches that wisdom is not just knowing the right thing. It is allowing truth to expose what is crooked before the damage spreads further.",
    ],
    flow: [
      "🌫️ Verses 1-11: Judah drifts from his brothers and Tamar is left unprotected",
      "🕯️ Verses 12-23: Tamar acts from a place of injustice and Judah acts from hidden desire",
      "⚖️ Verses 24-26: Judah's hypocrisy is exposed by his own pledge",
      "🌱 Verses 27-30: Perez and Zerah are born, and the covenant story keeps moving",
    ],
    sections: [
      {
        range: "1-11",
        heading: "🌫️ Drifting Creates A House Without Protection",
        focus: ["Judah separates from his brothers", "his sons are marked by wickedness", "Tamar is promised protection but left waiting"],
        breakdown: [
          "The chapter begins with Judah going down from his brothers. That movement is not only geography. It feels like spiritual and relational drift. After the betrayal of Joseph, Judah is not moving toward healing. He is moving away.",
          "Judah builds a household, but the house is not healthy. His sons are described in severe terms, and Tamar becomes trapped in a family system where responsibility is avoided.",
          "The levirate custom was meant to preserve a widow's place and future inside the family. Tamar should have been protected. Instead, she is delayed, controlled, and left waiting with no real intention of justice.",
          "This section shows that neglect can be a form of harm. Judah may not look violent here, but he is still failing to protect someone vulnerable.",
        ],
      },
      {
        range: "12-23",
        heading: "🕯️ Hidden Sin Meets Hidden Injustice",
        focus: ["Tamar disguises herself", "Judah acts on desire without recognizing her", "the pledge becomes evidence"],
        breakdown: [
          "This is a morally tangled scene. Tamar's actions come out of a situation where justice has been withheld from her, while Judah's actions expose desire without discernment or accountability.",
          "The details of the pledge matter: signet, bracelets, and staff. These are identity markers. Judah gives away symbols of himself while trying to keep his sin hidden.",
          "That is how hidden compromise often works. A person thinks they are controlling the moment, but they are actually leaving pieces of their character behind.",
          "The scene is not written to make sin look clever. It is written to show that what is hidden can become the very thing God uses to bring truth into the open.",
        ],
      },
      {
        range: "24-26",
        heading: "⚖️ Truth Interrupts Hypocrisy",
        focus: ["Judah condemns Tamar quickly", "Tamar sends the evidence", "Judah admits she is more righteous than he is"],
        breakdown: [
          "Judah is severe when he thinks Tamar is guilty and he is safe. That is the shape of hypocrisy. It judges strongly when the cost belongs to someone else.",
          "Then Tamar sends the pledge. She does not give a speech. She simply lets the evidence speak. The man who thought he was hidden is now confronted by his own identity.",
          "Judah's confession is one of the most important moments in the chapter. He says Tamar is more righteous than he is. That does not make the whole situation clean, but it means Judah finally stops defending himself.",
          "This matters for the larger Joseph story. The Judah who once helped sell a brother is beginning to become a man who can face truth.",
        ],
      },
      {
        range: "27-30",
        heading: "🌱 God Keeps Working Through A Messy Family",
        focus: ["twins are born", "Perez breaks out unexpectedly", "the covenant line continues through unexpected circumstances"],
        breakdown: [
          "The birth scene reminds us that God is still working, even in a chapter full of human failure. Scripture does not hide the mess, but it also does not make the mess ultimate.",
          "Perez means breaking through, and that image fits the chapter. Truth breaks through hypocrisy. Responsibility begins breaking through Judah's old character. God's promise keeps breaking through family brokenness.",
          "This does not excuse sin. It shows grace. God can carry His plan through people who have been exposed, humbled, corrected, and changed.",
          "Genesis 38 prepares us to watch Judah differently when he returns later in Joseph's story.",
        ],
      },
    ],
    lesson: [
      "Genesis 38 teaches that God does not only test Joseph in Egypt. He also exposes Judah at home.",
      "The chapter is serious because hidden sin, avoided responsibility, and hypocrisy all damage people. But it is hopeful because truth can become the beginning of change.",
      "Judah's story reminds us that a person can be confronted by their own failure and still become different by the time the next test comes.",
    ],
  },
  {
    chapter: 39,
    title: "🛡️ Genesis 39 — Faithfulness When Life Is Unfair",
    intro: [
      "Genesis 39 brings Joseph into Egypt, far from home and stripped of every familiar support. He has lost the coat, his family, his freedom, and any clear control over his future.",
      "But the chapter repeats the most important sentence: the Lord was with Joseph. That does not mean Joseph's life becomes easy. It means God's presence follows him into the place he never wanted to be.",
      "This chapter is about integrity under pressure. Joseph is tested by success, temptation, false accusation, and prison. In every setting, wisdom looks like faithfulness before God.",
    ],
    flow: [
      "🏠 Verses 1-6: Joseph serves faithfully in Potiphar's house",
      "⚠️ Verses 7-12: Temptation comes with pressure, secrecy, and repetition",
      "🧥 Verses 13-20: Joseph's integrity is twisted into a false accusation",
      "🔒 Verses 21-23: God's presence follows Joseph into prison",
    ],
    sections: [
      {
        range: "1-6",
        heading: "🏠 Faithfulness Starts Before Promotion",
        focus: ["Joseph is enslaved but not abandoned", "Potiphar sees that God is with him", "Joseph handles responsibility well before he has power"],
        breakdown: [
          "Joseph arrives in Egypt as property, not as a guest. That is important. The chapter does not soften the injustice. Joseph's situation is wrong, painful, and humiliating.",
          "Yet the text says the Lord was with Joseph. God's presence is not limited to comfortable places. The same God who was with him in Canaan is with him in Egypt.",
          "Joseph serves with excellence in a place he did not choose. That is deep wisdom. Faithfulness is not only what a person does when life feels fair. It is what they become when God is with them in unfair circumstances.",
          "Potiphar trusts Joseph because Joseph's life produces visible fruit. The blessing on Joseph begins affecting the house around him.",
        ],
      },
      {
        range: "7-12",
        heading: "⚠️ Temptation Keeps Speaking Until Wisdom Runs",
        focus: ["Potiphar's wife pressures Joseph repeatedly", "Joseph frames the sin before God", "Joseph flees instead of negotiating"],
        breakdown: [
          "The temptation in Genesis 39 is not a one-time moment. It is repeated pressure. That matters because many people fall not because the temptation spoke once, but because it kept speaking until their resistance became tired.",
          "Joseph's answer is wise because he names the relational cost and the spiritual cost. He would sin against Potiphar, but even deeper, he would sin against God.",
          "That is the center of integrity. Joseph is not only avoiding consequences. He is living before the Lord, even when nobody else is in the room.",
          "When the pressure becomes physical, Joseph runs. That is not weakness. That is wisdom. Some temptations are not defeated by standing close and proving strength. They are defeated by distance.",
        ],
      },
      {
        range: "13-20",
        heading: "🧥 Doing Right Does Not Always Look Rewarded At First",
        focus: ["the garment becomes false evidence", "Joseph is accused with a twisted story", "obedience leads to prison instead of immediate rescue"],
        breakdown: [
          "This is one of the hardest parts of Joseph's story. He does the right thing and suffers for it. The garment he leaves behind to escape sin becomes the evidence used against him.",
          "That should sober us. Wisdom does not promise that every righteous choice will be understood immediately. Sometimes obedience costs a person before it vindicates them.",
          "Potiphar's wife controls the story publicly, but she does not control the truth before God. Joseph may not be able to defend himself in the moment, but his character is still seen by the Lord.",
          "The chapter refuses shallow faith. It shows that faithfulness can lead through prison before it leads to promotion.",
        ],
      },
      {
        range: "21-23",
        heading: "🔒 Prison Is Not Outside God's Presence",
        focus: ["the Lord is with Joseph in prison", "Joseph receives mercy and favor", "his gifts keep serving others in the hidden place"],
        breakdown: [
          "The wording repeats: the Lord was with Joseph. That repetition is the anchor of the chapter. God was with him in Potiphar's house, and God is with him in prison.",
          "Joseph's circumstances change, but God's presence does not. That is the chapter's deep comfort.",
          "Even in prison, Joseph is entrusted with responsibility. The hidden place is still a place of formation. God is shaping Joseph's wisdom, steadiness, leadership, and endurance.",
          "Genesis 39 ends without Joseph being free, but it does not end without hope. The Lord is still with him, and that means the story is still moving.",
        ],
      },
    ],
    lesson: [
      "Genesis 39 teaches that God's presence is not proven by easy circumstances. Joseph is with God in slavery, temptation, accusation, and prison.",
      "The chapter also teaches that integrity is built before pressure arrives. Joseph can resist temptation because he already knows whose presence he is living in.",
      "Faithfulness may not be rewarded immediately, but it is never wasted before God.",
    ],
  },
];

const remaining: JosephChapterNotes[] = [
  {
    chapter: 40,
    title: "⏳ Genesis 40 — Serving While Forgotten",
    intro: [
      "Genesis 40 shows Joseph still in prison, but not spiritually shut down. He notices other people's sadness while he is still carrying his own unanswered pain.",
      "This chapter teaches waiting with tenderness. Joseph is not free yet, but he is still available to serve. He still believes interpretations belong to God. He still uses his gift in a hidden place.",
    ],
    flow: ["🔒 Verses 1-4: Two officials enter Joseph's prison", "💭 Verses 5-19: Joseph interprets two dreams by pointing to God", "🍷 Verses 20-23: One man is restored, one is judged, and Joseph is forgotten"],
    sections: [
      {
        range: "1-4",
        heading: "🔒 God Brings People Into Joseph's Waiting Room",
        focus: ["the cupbearer and baker fall from Pharaoh's court", "Joseph is assigned to serve them", "prison becomes a place of divine appointment"],
        breakdown: [
          "The cupbearer and baker enter the prison because they offended Pharaoh, but from the larger view of Genesis, their arrival is not random. God is placing Joseph near the connection that will later open the palace door.",
          "Joseph cannot see that yet. All he sees is another day in prison and two new people to serve.",
          "That is often how providence feels while we are living it. It does not feel dramatic. It feels like another responsibility, another conversation, another chance to be faithful.",
        ],
      },
      {
        range: "5-19",
        heading: "💭 Joseph Uses His Gift Without Taking God's Place",
        focus: ["both men are troubled by dreams", "Joseph notices their faces", "Joseph says interpretations belong to God"],
        breakdown: [
          "Joseph's first act is not interpretation. It is attention. He sees that the men are sad. That matters because suffering has not made him blind to other people.",
          "He also refuses to make his gift about himself. He says interpretations belong to God. Joseph has dreams in his own story, but he does not claim control over dreams.",
          "The interpretations are different: one restoration, one judgment. Joseph is faithful with both. Wisdom does not only speak comforting truth. It speaks honest truth.",
          "This section teaches that gifts can still be used in seasons that feel unfinished. Joseph is not waiting until life makes sense before serving.",
        ],
      },
      {
        range: "20-23",
        heading: "🍷 Remember Me Becomes He Forgot Him",
        focus: ["the dreams come true", "the cupbearer is restored", "Joseph asks to be remembered", "Joseph is forgotten"],
        breakdown: [
          "Everything Joseph said happens exactly. That confirms the gift was real and that God was with him. But then the chapter ends with a painful sentence: the cupbearer forgot him.",
          "That line carries emotional weight. Joseph served well. Joseph spoke truth. Joseph asked for help. And still, nothing changes immediately.",
          "The delay is not proof that God has stopped working. It means the timing is not finished. The cupbearer's forgetfulness will later become the very memory God uses at the right moment.",
        ],
      },
    ],
    lesson: ["Genesis 40 teaches that forgotten seasons are not wasted seasons.", "Joseph keeps serving, noticing, and pointing to God while his own story is still unresolved.", "Waiting does not cancel calling. Sometimes it becomes the place where calling is refined."],
  },
  {
    chapter: 41,
    title: "👑 Genesis 41 — From Prison To Purpose",
    intro: [
      "Genesis 41 is the turning point, but it does not arrive quickly. Two full years pass after the cupbearer forgets Joseph.",
      "When the door opens, Joseph is not only gifted. He is ready. This chapter shows the difference between sudden promotion and slow preparation.",
    ],
    flow: ["⏰ Verses 1-13: Pharaoh dreams and the cupbearer remembers", "🙏 Verses 14-32: Joseph gives God credit before giving interpretation", "🌾 Verses 33-45: Wisdom turns revelation into preparation", "👶 Verses 46-57: Joseph leads through abundance before famine"],
    sections: [
      {
        range: "1-13",
        heading: "⏰ God's Timing Can Feel Late Until It Opens",
        focus: ["two full years pass", "Pharaoh's wise men cannot interpret", "the cupbearer finally remembers Joseph"],
        breakdown: [
          "The phrase two full years is heavy. It means Joseph waited longer after doing the right thing. The story wants us to feel that delay.",
          "Then Pharaoh dreams, and no expert in Egypt can help him. The palace has power, but it does not have the answer. That creates the moment where Joseph's hidden gift is needed.",
          "The cupbearer remembers late, but not too late. Human delay does not defeat divine timing.",
        ],
      },
      {
        range: "14-32",
        heading: "🙏 Joseph Stands Before Pharaoh Without Stealing God's Glory",
        focus: ["Joseph is brought quickly from prison", "he says God will answer Pharaoh", "the dreams reveal abundance and famine"],
        breakdown: [
          "Joseph's life changes in one day, but his posture does not. Before Pharaoh, he still says the answer belongs to God.",
          "That humility matters. Promotion can reveal whether a person has been formed by waiting or poisoned by it.",
          "Joseph explains the dreams clearly. Seven years of abundance will be followed by seven years of famine. Wisdom sees the future warning and takes it seriously before the crisis arrives.",
        ],
      },
      {
        range: "33-45",
        heading: "🌾 Wisdom Builds A Plan Before The Famine",
        focus: ["Joseph moves from interpretation to administration", "Pharaoh recognizes the Spirit of God in Joseph", "Joseph is raised to authority"],
        breakdown: [
          "Joseph does more than explain the dream. He gives a plan. Biblical wisdom is not only insight. It is faithful action based on what God has revealed.",
          "Pharaoh sees that Joseph carries a wisdom beyond Egypt's system. The prisoner becomes the ruler because God has been preparing him in hidden places.",
          "This is not a random success story. Joseph's leadership has been formed through Potiphar's house, prison responsibility, and years of endurance.",
        ],
      },
      {
        range: "46-57",
        heading: "👶 Joseph Names Both Pain And Mercy",
        focus: ["Joseph stores grain", "Manasseh and Ephraim are born", "the famine reaches beyond Egypt"],
        breakdown: [
          "Joseph's sons' names reveal his inner life. Manasseh speaks of God helping him forget the sharpness of his toil. Ephraim speaks of fruitfulness in the land of affliction.",
          "That is a mature testimony. Joseph does not pretend the affliction was not real, but he also recognizes fruitfulness inside it.",
          "When famine comes, Egypt has bread because Joseph listened before the crisis. Wisdom prepares when others are still comfortable.",
        ],
      },
    ],
    lesson: ["Genesis 41 teaches that God can open a door suddenly after forming a person slowly.", "Joseph's gift brings him before Pharaoh, but his tested character makes him ready to serve.", "The chapter reminds us that wisdom does not waste warning. It prepares before the famine arrives."],
  },
  {
    chapter: 42,
    title: "🪞 Genesis 42 — When The Past Walks Back Into The Room",
    intro: ["Genesis 42 brings Joseph's brothers to Egypt because famine has reached Canaan.", "They bow before the brother they do not recognize, and the dreams from Genesis 37 begin to unfold in a way nobody expected."],
    flow: ["🌾 Verses 1-6: Hunger brings the brothers to Joseph", "🧠 Verses 7-20: Joseph tests them without revealing himself", "💔 Verses 21-28: guilt rises from the past", "🏠 Verses 29-38: Jacob's fear tightens around Benjamin"],
    sections: [
      { range: "1-6", heading: "🌾 Need Drives The Brothers Toward The Dream", focus: ["famine humbles the family", "the brothers bow before Joseph", "God's old dream begins to appear"], breakdown: ["The brothers travel to Egypt for grain, not reconciliation. They are trying to survive.", "Yet their need brings them into the very scene Joseph dreamed years earlier. They bow, but they do not understand what they are fulfilling.", "This is one of the quiet wonders of the story. God can use famine, distance, and need to bring buried things back into the light."] },
      { range: "7-20", heading: "🧠 Joseph Tests Character, Not Just Memory", focus: ["Joseph recognizes them", "he speaks roughly and hides his identity", "the test centers on whether Benjamin is safe"], breakdown: ["Joseph's restraint is important. He has power now, but he does not use it for quick revenge.", "He tests his brothers because reconciliation without truth would be shallow. The question is not simply whether they are sorry. The question is whether they are changed.", "Benjamin becomes the center of the test because Benjamin represents the same vulnerable place Joseph once occupied: the favored son of Rachel."] },
      { range: "21-28", heading: "💔 Guilt Speaks Before Joseph Reveals Anything", focus: ["the brothers remember Joseph's distress", "Reuben reopens old blame", "Joseph turns aside and weeps"], breakdown: ["The brothers connect their trouble in Egypt to what they did to Joseph. That tells us the guilt has been living inside them for years.", "They remember his anguish. That detail matters. The sin they once hardened themselves to has not disappeared from their conscience.", "Joseph hears everything and weeps privately. He is not cold. He is carrying pain, wisdom, and restraint at the same time."] },
      { range: "29-38", heading: "🏠 Fear Still Rules Jacob's House", focus: ["the brothers report what happened", "the returned money terrifies them", "Jacob refuses to release Benjamin"], breakdown: ["Back home, fear spreads. The returned money should look like mercy, but because guilt is awake, it feels like danger.", "Jacob still speaks as a father ruled by loss. He believes Joseph is gone, Simeon is gone, and Benjamin may be taken too.", "The family is not healed yet. Genesis 42 ends with the pressure unresolved because truth has only begun to surface."] },
    ],
    lesson: ["Genesis 42 teaches that time alone does not heal hidden sin.", "The past can walk back into the room through need, pressure, and providence.", "Joseph shows wisdom by refusing both revenge and cheap reconciliation."],
  },
  {
    chapter: 43,
    title: "🍽️ Genesis 43 — Mercy At The Table",
    intro: ["Genesis 43 increases the pressure. The family needs food again, but returning to Egypt means taking Benjamin.", "This chapter slows down around fear, responsibility, unexpected kindness, and a meal that tests whether old jealousy still rules the brothers."],
    flow: ["🍞 Verses 1-14: Judah takes responsibility for Benjamin", "🏛️ Verses 15-25: the brothers enter Joseph's house afraid", "😭 Verses 26-31: Joseph is overcome when he sees Benjamin", "🍽️ Verses 32-34: the table tests the brothers' hearts"],
    sections: [
      { range: "1-14", heading: "🍞 Judah Begins To Sound Different", focus: ["hunger forces a decision", "Judah pledges himself", "Jacob releases Benjamin with fear"], breakdown: ["Judah's voice in this chapter matters because it is not the same Judah we saw earlier. He accepts responsibility for Benjamin.", "He cannot control everything that will happen in Egypt, but he offers himself as accountable. That is a sign of change.", "Jacob finally releases Benjamin, but the release is painful. Faith often has to move while fear is still present."] },
      { range: "15-25", heading: "🏛️ Mercy Feels Suspicious To Guilty Hearts", focus: ["the brothers are brought into Joseph's house", "they fear accusation over the money", "the steward speaks peace"], breakdown: ["The brothers cannot easily receive kindness because guilt has trained them to expect judgment.", "The steward tells them peace and points to God. That moment matters because mercy is entering the story before Joseph reveals himself.", "Sometimes a guilty heart interprets grace as a setup because it has not yet learned how to stand in truth."] },
      { range: "26-31", heading: "😭 Joseph's Heart Is Not Hard", focus: ["the brothers bow again", "Joseph asks about Jacob", "Joseph sees Benjamin and weeps"], breakdown: ["Joseph is powerful, but he is not emotionally untouched. Seeing Benjamin opens a deep place in him.", "He leaves the room to weep because wisdom sometimes requires restraint without denying feeling.", "This is not revenge theater. It is a wounded brother trying to move carefully toward truth."] },
      { range: "32-34", heading: "🍽️ The Meal Recreates The Old Test", focus: ["the brothers are seated in order", "Benjamin receives five times more", "the brothers eat and drink with him"], breakdown: ["Benjamin receives special favor at the table. That is not a random detail. Joseph is watching whether the brothers will resent another favored son of Rachel.", "This is the old wound in a new form. Years earlier, Joseph's favor stirred hatred. Now Benjamin's favor exposes whether jealousy still rules them.", "The chapter ends with fellowship, but the final test is still ahead."] },
    ],
    lesson: ["Genesis 43 teaches that changed character is revealed under repeated pressure.", "Judah begins taking responsibility, Joseph shows restrained mercy, and the brothers are tested by favor again.", "God is moving the family toward reconciliation, but He does it through truth, not shortcuts."],
  },
  {
    chapter: 44,
    title: "🛡️ Genesis 44 — The Test Comes Back Around",
    intro: ["Genesis 44 is the final test before Joseph reveals himself. Benjamin is placed in danger, and the brothers face the same kind of choice they failed in Genesis 37.", "This chapter is one of the clearest pictures of repentance becoming visible. The old situation returns, but this time the brothers choose differently."],
    flow: ["🥤 Verses 1-13: Joseph's cup is found in Benjamin's sack", "⚖️ Verses 14-17: the brothers return together", "🗣️ Verses 18-29: Judah retells the family pain", "🛡️ Verses 30-34: Judah offers himself in Benjamin's place"],
    sections: [
      { range: "1-13", heading: "🥤 The Old Test Is Recreated", focus: ["Benjamin appears guilty", "the brothers could abandon him", "they tear their clothes and return"], breakdown: ["Joseph's test recreates the old moral question: what will they do when Rachel's son is vulnerable?", "In Genesis 37, they abandoned Joseph. Here, they do not abandon Benjamin.", "Their grief is immediate. Their unity is visible. Something has changed."] },
      { range: "14-17", heading: "⚖️ They Return Together", focus: ["the brothers fall before Joseph", "Judah speaks for the group", "Joseph says only Benjamin must stay"], breakdown: ["Joseph gives them a way out. They can leave Benjamin and save themselves.", "That offer exposes the heart. Repentance is not proven when there is no cost. It is proven when the old escape route appears and a person refuses it.", "Judah steps forward, and the story begins to show the fruit of real change."] },
      { range: "18-29", heading: "🗣️ Judah Carries The Family Story Honestly", focus: ["Judah speaks respectfully", "he names Jacob's grief", "he shows concern for his father and brother"], breakdown: ["Judah's speech is long because the pain is layered. He is not making a quick excuse. He is carrying the family story before Joseph.", "He speaks about Jacob's attachment to Benjamin without resentment. That matters because the old jealousy is not controlling him in the same way.", "Judah now feels the weight of another person's grief. That is part of wisdom: the heart becomes able to care about the pain its choices may cause."] },
      { range: "30-34", heading: "🛡️ Judah Offers Himself", focus: ["Judah cannot bear Jacob's sorrow", "he asks to stay instead of Benjamin", "the brother who sold Joseph now offers himself"], breakdown: ["This is the turning point in Judah's character. The man who once helped sell a brother is now willing to become a slave to save a brother.", "That is more than regret. That is repentance with action.", "Joseph has finally seen what he needed to see. The brothers are not the same men who threw him into the pit."] },
    ],
    lesson: ["Genesis 44 teaches that repentance is revealed when the old test returns and the person chooses differently.", "Judah's offer does not erase the past, but it shows that God has been changing him.", "This prepares the way for forgiveness because truth has finally come into the open."],
  },
  {
    chapter: 45,
    title: "😭 Genesis 45 — I Am Joseph",
    intro: ["Genesis 45 is the emotional release of the Joseph story. After years of silence, testing, and hidden tears, Joseph finally reveals himself.", "This chapter teaches forgiveness without pretending evil was good. Joseph names what happened, but he also sees God's larger purpose."],
    flow: ["😭 Verses 1-4: Joseph reveals himself with loud weeping", "🙏 Verses 5-8: Joseph sees God's purpose beyond their sin", "🚚 Verses 9-20: Joseph sends for Jacob", "🏠 Verses 21-28: Jacob hears that Joseph is alive"],
    sections: [
      { range: "1-4", heading: "😭 Truth Breaks The Silence", focus: ["Joseph can no longer restrain himself", "he weeps aloud", "the brothers are terrified"], breakdown: ["Joseph's reveal is not calm and polished. It is deeply emotional. Years of grief, love, memory, and pain come out at once.", "The brothers are troubled because truth has finally caught up with them. The one they wronged is alive, powerful, and standing before them.", "Joseph's first invitation is not revenge. He says, Come near to me. That is mercy moving toward fearful people."] },
      { range: "5-8", heading: "🙏 God Was Working Without Excusing The Evil", focus: ["Joseph tells them not to be grieved in despair", "he says God sent him to preserve life", "human evil and divine purpose are held together"], breakdown: ["Joseph does not say, You did nothing wrong. He says God was working beyond what they did.", "That distinction matters. Biblical forgiveness does not call evil good. It sees that evil is not ultimate when God is sovereign.", "Joseph understands his suffering through the lens of preservation. God used the road to Egypt to keep many alive."] },
      { range: "9-20", heading: "🚚 Forgiveness Begins Making Room", focus: ["Joseph wants Jacob near", "Goshen becomes a place of provision", "Pharaoh supports the move"], breakdown: ["Forgiveness in this chapter is not only a feeling. It becomes provision, invitation, movement, and a future.", "Joseph wants his family close enough to be protected during the famine. The brother who was rejected now becomes the means of their survival.", "That is grace with practical hands."] },
      { range: "21-28", heading: "🏠 The News Revives Jacob's Heart", focus: ["the brothers return with gifts", "Jacob struggles to believe", "his spirit revives when he sees the wagons"], breakdown: ["Jacob has lived for years under a false story. Now truth comes with evidence.", "At first his heart faints because the news feels too impossible. Then he sees the wagons and his spirit revives.", "The chapter ends with a father moving from grief toward reunion. God is restoring what seemed permanently lost."] },
    ],
    lesson: ["Genesis 45 teaches that forgiveness can be honest, emotional, and deeply practical.", "Joseph does not erase the evil, but he sees God's hand above it.", "The chapter invites us to believe that God can preserve life through roads we would never have chosen."],
  },
  {
    chapter: 46,
    title: "🛤️ Genesis 46 — Do Not Be Afraid To Go Down",
    intro: ["Genesis 46 follows Jacob as he leaves Canaan for Egypt. The joy of Joseph being alive is real, but the move is still frightening.", "God meets Jacob at Beersheba and promises that Egypt will not cancel the covenant story."],
    flow: ["🙏 Verses 1-7: God speaks to Jacob on the way", "👨‍👩‍👧‍👦 Verses 8-27: the family goes down together", "😭 Verses 28-30: Jacob and Joseph are reunited", "🐑 Verses 31-34: Joseph prepares the family for Goshen"],
    sections: [
      { range: "1-7", heading: "🙏 God Meets Jacob At The Border Of Change", focus: ["Jacob worships at Beersheba", "God tells him not to fear Egypt", "God promises presence and return"], breakdown: ["Jacob is moving toward joy, but also toward uncertainty. Egypt has food, but it is not the land of promise.", "God speaks directly into that fear. Do not be afraid to go down. That line matters because obedience can still feel scary when it leads somewhere unfamiliar.", "The promise is presence: I will go down with thee. God does not abandon His people when the next step leads into strange territory."] },
      { range: "8-27", heading: "👨‍👩‍👧‍👦 God Counts The Family Because The Promise Is Still Alive", focus: ["the names are listed", "Israel moves as a family", "the covenant line is preserved"], breakdown: ["The genealogy may feel slow, but it is doing important work. God is showing that this family matters.", "These are not random names. They are the seed of the nation God promised Abraham.", "The family is going down to Egypt, but they are not disappearing into Egypt. God knows them, counts them, and carries them."] },
      { range: "28-30", heading: "😭 The Reunion Carries Years Of Grief", focus: ["Judah leads the way", "Joseph meets Jacob", "they weep a long time"], breakdown: ["The reunion between Jacob and Joseph is one of the tenderest moments in Genesis. Years of grief meet one embrace.", "Joseph weeps on Jacob's neck a good while. Scripture lets the moment breathe because restoration is not small.", "Jacob can now say he is ready to die because he has seen Joseph's face. The lie that shaped his grief has finally been broken."] },
      { range: "31-34", heading: "🐑 Wisdom Prepares For Life In A Foreign Land", focus: ["Joseph gives practical counsel", "the family will settle in Goshen", "identity must be preserved in Egypt"], breakdown: ["Joseph does not only celebrate. He prepares. That is wisdom. The family needs a place where they can survive without losing who they are.", "Goshen becomes provision and separation. They will live in Egypt, but they are still Israel.", "This prepares the larger biblical story: God's people will grow in Egypt before God later brings them out."] },
    ],
    lesson: ["Genesis 46 teaches that restoration can lead into unfamiliar territory.", "God's promise is not threatened by Egypt because God's presence goes with His people.", "The chapter invites us to trust God when joy and uncertainty arrive together."],
  },
  {
    chapter: 47,
    title: "🌾 Genesis 47 — Provision In A Temporary Place",
    intro: ["Genesis 47 shows Joseph stewarding famine while Jacob's family settles in Goshen.", "The chapter holds two truths together: God provides in Egypt, but Egypt is not the final home."],
    flow: ["🏛️ Verses 1-12: Jacob's family receives land and provision", "🌾 Verses 13-26: Joseph manages the famine with authority", "🗺️ Verses 27-31: Jacob remembers the land of promise"],
    sections: [
      { range: "1-12", heading: "🏛️ God Gives Room To Survive", focus: ["Pharaoh receives Joseph's family", "Jacob blesses Pharaoh", "the family settles in Goshen"], breakdown: ["Joseph brings his family before Pharaoh with wisdom and clarity. He does not hide who they are.", "Jacob blesses Pharaoh, which is striking. The aged pilgrim stands before the powerful king and still carries covenant dignity.", "Goshen becomes a mercy. God provides space for the family to live, grow, and be sustained through famine."] },
      { range: "13-26", heading: "🌾 Leadership Carries Weight During Crisis", focus: ["the famine is severe", "Joseph administers food and land", "Egypt's structure changes under pressure"], breakdown: ["This section shows Joseph as a serious leader. Wisdom is not only private character; it becomes public stewardship.", "The famine affects money, livestock, land, and labor. Crisis reveals how dependent people are on wise administration.", "The passage is not romantic. It shows the complexity of governing in scarcity. Joseph's role is heavy because leadership during famine touches real lives."] },
      { range: "27-31", heading: "🗺️ Provision Is Not The Same As Final Home", focus: ["Israel grows in Egypt", "Jacob asks to be buried with his fathers", "the promise still points to Canaan"], breakdown: ["Israel prospers in Goshen, but Jacob refuses to let Egypt become the family's final identity.", "His burial request is an act of faith. He is saying, We are provided for here, but God's promise is still tied to the land He swore to our fathers.", "That is wise memory. Comfort in a temporary place should not make God's people forget the promise."] },
    ],
    lesson: ["Genesis 47 teaches that God can provide richly in a temporary place.", "Joseph models responsible leadership, and Jacob models faith that remembers the promise.", "Provision is good, but it should not make the heart forget where God is ultimately leading."],
  },
  {
    chapter: 48,
    title: "🙌 Genesis 48 — Blessing The Next Generation",
    intro: ["Genesis 48 slows down around a blessing. Jacob is near death, Joseph brings his sons, and the covenant story reaches into the next generation.", "This chapter is about memory, adoption, reversal, and grace moving beyond one lifetime."],
    flow: ["🛏️ Verses 1-7: Jacob remembers God's promise", "👦 Verses 8-16: Jacob blesses Ephraim and Manasseh", "🔁 Verses 17-22: the younger is placed before the older"],
    sections: [
      { range: "1-7", heading: "🛏️ Blessing Begins With Remembering God", focus: ["Jacob is sick", "Joseph brings his sons", "Jacob recalls God's promise at Luz"], breakdown: ["Jacob does not begin with nostalgia. He begins with what God said.", "That matters because blessing is not wishful thinking. It is rooted in God's covenant faithfulness.", "Jacob receives Joseph's sons as his own, which means Joseph's pain in Egypt will not be the final word over his family line."] },
      { range: "8-16", heading: "👦 Grace Reaches Joseph's Children", focus: ["Jacob sees the boys", "he speaks of God's shepherding care", "he blesses them in covenant language"], breakdown: ["Jacob's words are deeply personal. He speaks of the God who fed him all his life and the Angel who redeemed him from evil.", "This is lived theology. Jacob is not repeating a formula; he is blessing the boys out of a long life of being carried by God.", "Ephraim and Manasseh become part of Israel's story. Joseph's years of affliction now bear generational fruit."] },
      { range: "17-22", heading: "🔁 God's Blessing Does Not Always Follow Human Order", focus: ["Joseph tries to correct Jacob's crossed hands", "Jacob insists the younger will be greater", "reversal appears again in Genesis"], breakdown: ["Joseph expects the firstborn order to control the blessing, but Jacob crosses his hands.", "Genesis has shown this pattern again and again: Isaac over Ishmael, Jacob over Esau, now Ephraim over Manasseh. God is free in how He gives grace.", "Joseph has to learn that even after all he has seen, God's ways still cannot be managed by human expectation."] },
    ],
    lesson: ["Genesis 48 teaches that God's grace reaches beyond one generation.", "Jacob blesses from memory, Joseph receives a future for his sons, and God's pattern of unexpected grace continues.", "The chapter invites us to trust that God can turn affliction into inheritance."],
  },
  {
    chapter: 49,
    title: "🗣️ Genesis 49 — Final Words And Future Direction",
    intro: ["Genesis 49 gathers Jacob's sons around his deathbed. These are not casual goodbye words. They carry character, consequence, promise, and prophecy.", "The chapter teaches that choices shape legacy, but God's covenant promise keeps moving through imperfect people."],
    flow: ["⚖️ Verses 1-7: Reuben, Simeon, and Levi face consequences", "🦁 Verses 8-12: Judah receives royal promise", "🧭 Verses 13-21: the tribes receive varied words", "🌿 Verses 22-28: Joseph is fruitful through affliction", "🪦 Verses 29-33: Jacob gives burial instructions"],
    sections: [
      { range: "1-7", heading: "⚖️ Character Leaves A Trail", focus: ["Reuben loses preeminence", "Simeon and Levi are marked by violence", "past choices affect future direction"], breakdown: ["Jacob's words show that sin has consequences beyond the moment it happens.", "Reuben, Simeon, and Levi are not erased from the family, but their actions have shaped their future.", "This is sobering wisdom. Grace does not mean choices are weightless."] },
      { range: "8-12", heading: "🦁 Judah's Line Carries A Royal Promise", focus: ["Judah is praised by his brothers", "the scepter belongs to Judah", "the imagery points toward kingship"], breakdown: ["Judah's story has moved from failure to responsibility, and now his line receives royal language.", "The lion imagery gives strength, rule, and future hope. This is bigger than Judah himself.", "Christians read this with eyes toward Jesus, the Lion of the tribe of Judah. The promise is already stretching beyond Genesis."] },
      { range: "13-21", heading: "🧭 Every Son Receives A Different Word", focus: ["the sayings vary by tribe", "each future has a distinct shape", "God's people are not flattened into sameness"], breakdown: ["This middle section can feel quick, but it matters because every tribe has a place in the unfolding story.", "Some words are brief, some vivid, some surprising. Together they show that Israel's future will be complex.", "Wisdom pays attention to the fact that God works through a whole people, not only one personality type."] },
      { range: "22-28", heading: "🌿 Joseph Is Fruitful Though Attacked",
        focus: ["Joseph is a fruitful bough", "archers attacked him", "his strength came from the Mighty God of Jacob"],
        breakdown: ["Joseph's blessing is full of imagery: fruitfulness, water, branches, arrows, strength, blessing.", "Jacob does not deny that Joseph was attacked. The archers grieved him and shot at him. That names the pain honestly.", "But Joseph's bow remained strong because his strength came from God. That is the testimony of his life: afflicted, but fruitful."] },
      { range: "29-33", heading: "🪦 Jacob Dies Holding The Promise", focus: ["Jacob asks to be buried in Canaan", "he gathers his feet into the bed", "he dies with covenant hope"], breakdown: ["Jacob's final instruction again points away from Egypt as the final home.", "He wants to be buried with Abraham, Sarah, Isaac, Rebekah, and Leah. The promise still matters at death.", "Genesis 49 closes with Jacob dying, but not with the promise dying. The story continues."] },
    ],
    lesson: ["Genesis 49 teaches that legacy is shaped by character, consequence, and promise.", "Joseph's life is named honestly: attacked but fruitful.", "The chapter reminds us that God's covenant moves through real families with real history, not polished people without wounds."],
  },
  {
    chapter: 50,
    title: "🌅 Genesis 50 — God Meant It For Good",
    intro: ["Genesis 50 closes Joseph's story with grief, fear, forgiveness, and hope.", "Jacob dies, the brothers fear revenge, and Joseph gives the sentence that explains the whole journey: ye thought evil against me; but God meant it unto good."],
    flow: ["😭 Verses 1-14: Jacob is mourned and buried", "😨 Verses 15-18: the brothers fear revenge", "🙏 Verses 19-21: Joseph names evil and God's good purpose", "🦴 Verses 22-26: Joseph dies looking toward the Exodus"],
    sections: [
      { range: "1-14", heading: "😭 Grief And Faith Walk Together", focus: ["Joseph mourns Jacob", "Egypt honors the burial", "Jacob is buried in Canaan"], breakdown: ["Joseph's grief is public and deep. Faith does not make mourning fake or small.", "The burial journey back to Canaan matters because Jacob's hope is still tied to God's promise.", "The family returns to Egypt after the burial, but the land of promise remains in view."] },
      { range: "15-18", heading: "😨 Fear Remains Where Guilt Has Lived", focus: ["the brothers fear Joseph will repay them", "they send a message appealing to Jacob", "they fall before Joseph again"], breakdown: ["Even after forgiveness has been shown, the brothers still fear revenge. Guilt can make mercy hard to trust.", "Their fear shows how deeply the old sin has marked them. They know what they deserve, so they struggle to believe Joseph's kindness will remain.", "Once again they bow before Joseph, but now the issue is not grain. It is fear, guilt, and forgiveness."] },
      { range: "19-21", heading: "🙏 Joseph Refuses God's Seat And Trusts God's Story", focus: ["Joseph says he is not in God's place", "he names their evil honestly", "he says God meant it for good", "he comforts and provides"],
        breakdown: ["Joseph's answer is one of the clearest statements of providence in Scripture. He does not deny evil. He names it: ye thought evil against me.", "But he also refuses to make evil ultimate. God meant it for good, to save much people alive.", "Joseph also refuses to sit in God's place. That is humility. He will not become judge over the story God has already governed.", "Forgiveness becomes practical again: he comforts them and promises provision."] },
      { range: "22-26", heading: "🦴 Joseph Dies With Hope Beyond Egypt", focus: ["Joseph lives to see generations", "he says God will surely visit Israel", "he asks that his bones be carried up"], breakdown: ["Joseph ends his life in Egypt, but his faith is not buried in Egypt.", "He speaks of a future visitation from God. That phrase points forward to the Exodus before Exodus has even begun.", "His bones become a testimony. Joseph dies believing that God will keep His promise after Joseph is gone."] },
    ],
    lesson: ["Genesis 50 teaches that human evil is real, but it is not ultimate.", "Joseph's faith is mature enough to name the wrong, release revenge, and trust God's larger purpose.", "The story ends with a coffin in Egypt, but also with hope. The pit was not the end, prison was not the end, Egypt was not the end, and death itself does not cancel God's promise."],
  },
];

export const TESTING_OF_JOSEPH_DEEP_NOTES = [...josephNotes, ...remaining].map(renderJosephNotes);
