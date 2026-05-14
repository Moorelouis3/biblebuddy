type AbrahamSection = {
  reference: string;
  title: string;
  points: string[];
};

type AbrahamChapterNote = {
  chapter: number;
  title: string;
  intro: string;
  flow: string[];
  sections: AbrahamSection[];
  lesson: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^Genesis\s+\d+:(.+)$/);
  return match ? `**${match[1]}**` : reference;
}

const ABRAHAM_CHAPTER_NOTES: AbrahamChapterNote[] = [
  {
    chapter: 11,
    title: "🧳 Genesis 11 — The Road Before The Call",
    intro:
      "Genesis 11 sets the ground under Abraham's story. Before Abram hears God say, \"Go,\" the chapter shows a world trying to build its own security at Babel and then narrows into one family line moving toward Canaan but stopping in Haran. That matters because Abraham's obedience does not appear out of nowhere. It rises out of a real family, a real world, and an unfinished road.",
    flow: ["Babel shows pride trying to make a name without God.", "Shem's line narrows the story toward Abram.", "Terah's family begins moving toward Canaan but settles short of the destination."],
    sections: [
      {
        reference: "Genesis 11:1-9",
        title: "🏙️ A world trying to build without God",
        points: [
          "Babel is not just a building project. It is a picture of humanity trying to create safety, fame, and unity without surrender. They say, \"let us make us a name,\" and that line sits in sharp contrast to Genesis 12, where God says He will make Abram's name great.",
          "That contrast is important. Human pride tries to climb upward and secure itself. Faith receives identity from God. Babel reaches for heaven on its own terms, but Abraham will be called to walk with God on God's terms.",
          "The scattering at Babel is judgment, but it also keeps human pride from hardening into one massive rebellion. God interrupts a false unity so that His redemptive plan can move forward through promise instead of human self-glory.",
        ],
      },
      {
        reference: "Genesis 11:10-26",
        title: "🧬 The story narrows toward one family",
        points: [
          "The genealogy can feel slow, but it is doing something important. Scripture is tracing the line forward until Abram comes into view. The Bible is teaching us that God works through generations, names, families, and time.",
          "This reminds us that Abraham's story is connected to a bigger story. God is not making a random choice. He is carrying forward His plan through ordinary human history.",
          "Genealogies can feel like lists, but they are also witnesses. They say, \"God has not lost the thread.\" Even when history looks scattered, God knows exactly where the promise is moving.",
        ],
      },
      {
        reference: "Genesis 11:27-32",
        title: "🛣️ An unfinished journey",
        points: [
          "Terah's household leaves Ur and heads toward Canaan, but they settle in Haran. The destination is named before the calling is fully spoken. That gives Genesis 12 a sense of holy continuation. God will call Abram to finish a road already begun.",
          "Sarai's barrenness is also named here. That detail is not random. The very promise God will give Abram will press against the deepest impossibility in his household.",
          "Genesis 11 ends in an in-between place. That is often where calling begins. God steps into unfinished stories, old grief, family movement, delayed hopes, and places where people have stopped short.",
        ],
      },
    ],
    lesson:
      "Genesis 11 teaches that God's call often begins before we recognize it. Abraham's story starts with pride being scattered, a family line being preserved, and an unfinished road waiting for God's voice.",
  },
  {
    chapter: 12,
    title: "📣 Genesis 12 — The Call To Leave",
    intro:
      "Genesis 12 is the great turning point. God speaks to Abram and calls him away from the familiar into a future that depends entirely on God's promise. But the same chapter also shows Abram's fear in Egypt, so the Bible introduces him honestly: obedient, chosen, and still deeply in need of growth.",
    flow: ["God calls Abram to leave and promises blessing.", "Abram enters the land and builds altars.", "Famine exposes fear and self-protection."],
    sections: [
      {
        reference: "Genesis 12:1-9",
        title: "🛣️ Obedience before the full map",
        points: [
          "God tells Abram to leave country, kindred, and father's house. That is not a small request. God is asking Abram to loosen his grip on identity, security, inheritance, and the world he understands.",
          "The promise is bigger than Abram's personal comfort. God promises land, nation, blessing, a great name, and blessing for all families of the earth. Abram's obedience becomes part of God's mercy reaching outward.",
          "Abram goes. That simple obedience is powerful. He does not have every detail, but he has God's word. Faith begins when God's voice becomes weightier than our demand for complete control.",
        ],
      },
      {
        reference: "Genesis 12:10-16",
        title: "🌾 Famine after obedience",
        points: [
          "The famine matters because it comes after Abram obeys. Sometimes people assume obedience should immediately make life easier, but Abram's first chapter of faith includes pressure.",
          "In Egypt, fear bends Abram's judgment. He tells Sarai to say she is his sister, protecting himself while placing her at risk. The Bible does not hide this. Abram is a man of faith, but fear still knows how to speak loudly in him.",
          "This is a serious reminder that obedience in one area does not mean every part of the heart is mature. God may call a person forward while still needing to heal the fears they carry with them.",
        ],
      },
      {
        reference: "Genesis 12:17-20",
        title: "🛡️ God protects the promise",
        points: [
          "God intervenes to protect Sarai and the promise. Abram's failure could have caused deep damage, but God's faithfulness is stronger than Abram's poor decision.",
          "This does not excuse Abram. It magnifies God's mercy. The future of the promise rests on God, not on Abram's perfect performance.",
          "Genesis 12 gives us a realistic beginning. Faith has begun, but formation has only started. Abram will keep learning what it means to trust God with more than the journey. He must learn to trust God with fear.",
        ],
      },
    ],
    lesson:
      "Genesis 12 teaches that obedience starts with God's word, not a complete map. Abram follows, stumbles, and is preserved by grace, showing that the life of faith is both real obedience and real formation.",
  },
  {
    chapter: 13,
    title: "🤝 Genesis 13 — Faith That Does Not Have To Grab",
    intro:
      "Genesis 13 brings Abram back from Egypt and places him in a quieter but very real test. Blessing has grown, space is limited, and conflict is rising. This chapter shows whether Abram believes God's promise enough to choose peace instead of grasping.",
    flow: ["Abram returns to the place of worship.", "Conflict rises between Abram and Lot's households.", "Lot chooses by sight while Abram receives the renewed promise."],
    sections: [
      {
        reference: "Genesis 13:1-7",
        title: "🪨 Returning to the altar",
        points: [
          "Abram comes back to the place where he had built an altar. That detail matters after Egypt. The story quietly brings him back to worship, back to the place of calling, back to dependence on God.",
          "But blessing creates pressure. Abram and Lot both have possessions, herds, and households. The land cannot carry them together easily. Sometimes the test is not lack. Sometimes the test is what blessing does to relationships.",
          "Strife between the herdsmen shows that outward prosperity does not automatically create inward peace. Wisdom is needed to steward blessing without letting it turn into division.",
        ],
      },
      {
        reference: "Genesis 13:8-13",
        title: "👀 Lot chooses by sight",
        points: [
          "Abram gives Lot the first choice. This is beautiful because Abram is the elder and the one who received the promise, yet he refuses to force his advantage.",
          "Lot lifts his eyes and sees the well-watered plain. The land looks like Eden and Egypt. That comparison is not accidental. Lot is drawn by what looks immediately profitable, but the text warns us that Sodom is spiritually dangerous.",
          "This is how many bad paths begin. They look practical, beautiful, and obvious. But wisdom asks a deeper question: where is this direction taking my soul?",
        ],
      },
      {
        reference: "Genesis 13:14-18",
        title: "📜 Promise after surrender",
        points: [
          "After Lot separates, God tells Abram to lift his eyes. Lot lifted his eyes to choose for himself. Abram lifts his eyes because God is showing him promise.",
          "God expands the promise in every direction. Abram gave up the right to grab, but he did not lose the future. Faith can be generous because it trusts God to provide what selfishness cannot secure.",
          "Abram responds by moving and building another altar. The chapter ends with worship because surrender has not made him poorer. It has made his dependence clearer.",
        ],
      },
    ],
    lesson:
      "Genesis 13 teaches that faith does not have to grab. Abram can choose peace because he trusts that God's promise is safer than selfish control.",
  },
  {
    chapter: 14,
    title: "⚔️ Genesis 14 — Courage Under God Most High",
    intro:
      "Genesis 14 feels different from the chapters around it. Kings go to war, Lot is captured, and Abram acts with courage. But the chapter is not only about battle. It is about rescue, worship, and refusing to let anyone but God define Abram's blessing.",
    flow: ["War reaches Lot's life near Sodom.", "Abram rescues Lot with courage.", "Melchizedek blesses Abram, and Abram refuses Sodom's reward."],
    sections: [
      {
        reference: "Genesis 14:1-12",
        title: "🌃 Lot's direction creates danger",
        points: [
          "Lot had moved toward Sodom in Genesis 13. Now the consequences of that direction begin to show. He is swept into a conflict larger than himself.",
          "This is one of Proverbs' themes before Proverbs is ever written: paths matter. Where Lot chose to settle shaped the dangers that reached his household.",
          "The chapter reminds us that decisions are rarely isolated. A place, a friendship, a pattern, or a compromise can quietly position a person near trouble before the crisis appears.",
        ],
      },
      {
        reference: "Genesis 14:13-16",
        title: "🛡️ Abram acts to rescue",
        points: [
          "Abram does not shrug and say Lot made his choice. He gathers trained men and moves to rescue him. Faith is not passive when love requires action.",
          "This shows a strong side of Abram. He is not merely a pilgrim building altars. He is also responsible, brave, and willing to risk himself for family.",
          "Obedience can look like leaving, waiting, surrendering, or fighting for what is right. The faithful life is responsive to God in the moment in front of it.",
        ],
      },
      {
        reference: "Genesis 14:17-24",
        title: "🙌 Victory stays under worship",
        points: [
          "Melchizedek appears as priest of God Most High and blesses Abram. Abram gives him a tenth, recognizing that victory belongs under God's authority.",
          "Then Abram refuses the king of Sodom's offer. He does not want Sodom to say, \"I made Abram rich.\" That refusal protects the clarity of his testimony.",
          "This is wisdom after success. Victory can become dangerous if it feeds pride or compromise. Abram receives blessing from God Most High and refuses gain that would tie his future to Sodom.",
        ],
      },
    ],
    lesson:
      "Genesis 14 teaches that courage must stay under worship. Abram rescues boldly, worships humbly, and refuses compromise after victory.",
  },
  {
    chapter: 15,
    title: "🌌 Genesis 15 — Believing God In The Waiting",
    intro:
      "Genesis 15 brings us inside Abram's heart. He has obeyed, fought, worshiped, and refused compromise, but he still has no son. This chapter shows faith not as fake confidence, but as honest trust placed in God's word.",
    flow: ["God comforts Abram's fear.", "Abram names the ache of delay.", "God gives stars, righteousness, covenant, and future hope."],
    sections: [
      {
        reference: "Genesis 15:1-6",
        title: "🛡️ Do not fear",
        points: [
          "God begins with comfort: \"Fear not.\" That tells us Abram's courage in chapter 14 did not erase every fear inside him. Brave people can still need reassurance.",
          "Abram answers honestly. He has no child. The promise of descendants is beautiful, but his house still feels empty. Biblical faith has room to bring that ache before God.",
          "God brings him outside and points to the stars. Abram believes the Lord, and it is counted to him as righteousness. He is not righteous because he has seen the fulfillment. He is counted righteous because he trusts the God who speaks.",
        ],
      },
      {
        reference: "Genesis 15:7-16",
        title: "📜 Promise with a long timeline",
        points: [
          "God promises land, but He also reveals that Abram's descendants will suffer in a foreign land before deliverance. This is a wide view of history.",
          "That means God's promise does not avoid all pain. The promise is not shallow. It moves through time, suffering, judgment, deliverance, and return.",
          "Abram is learning that faith may outlive his own ability to see everything completed. Some promises are bigger than one lifetime, but they are not bigger than God's faithfulness.",
        ],
      },
      {
        reference: "Genesis 15:17-21",
        title: "🔥 God binds Himself to the promise",
        points: [
          "The covenant ceremony is powerful because God passes through as smoking fire and flame. Abram is not the one walking through to prove he can hold everything together.",
          "God takes the weight of the promise upon Himself. The future rests on divine commitment, not human strength.",
          "This is why Genesis 15 is so central. Faith is not confidence in our own ability to make God's promise happen. Faith trusts the God who binds Himself to His word.",
        ],
      },
    ],
    lesson:
      "Genesis 15 teaches that faith believes God in the waiting. Abram still has questions, but God's promise becomes the ground beneath him.",
  },
  {
    chapter: 16,
    title: "⚠️ Genesis 16 — When Waiting Turns Into Control",
    intro:
      "Genesis 16 is one of the most painful chapters in Abraham's story because delay becomes pressure and pressure becomes human control. The chapter is honest about how impatience can harm real people.",
    flow: ["Sarai and Abram try to force the promise.", "Hagar suffers inside the household conflict.", "God sees Hagar in the wilderness."],
    sections: [
      {
        reference: "Genesis 16:1-6",
        title: "⏳ A shortcut that wounds",
        points: [
          "Sarai's pain is real. She is barren, the promise is delayed, and the years are heavy. But pain does not make every plan wise.",
          "Abram listens and takes Hagar. The result is not peace but contempt, jealousy, blame, and harsh treatment. A human shortcut creates a household wound.",
          "This chapter warns us that trying to help God in ways God did not command can produce consequences that last far longer than the moment of impatience.",
        ],
      },
      {
        reference: "Genesis 16:7-12",
        title: "👁️ God sees the mistreated",
        points: [
          "Hagar runs into the wilderness, and the Angel of the Lord finds her. That word matters. People may overlook her, use her, or mistreat her, but God sees her.",
          "God speaks to Hagar personally about her child and her future. She is not a disposable side character to Him.",
          "The chapter refuses to let us talk about Abraham's faith without also seeing the pain caused by Abraham's failure. God cares about the people wounded by someone else's impatience.",
        ],
      },
      {
        reference: "Genesis 16:13-16",
        title: "🏜️ The God who sees",
        points: [
          "Hagar names God, \"You are the God who sees me.\" This is one of the most tender moments in Genesis.",
          "The promise to Abraham is still moving, but Genesis makes space to show God's mercy toward Hagar and Ishmael too.",
          "This chapter teaches a serious lesson: waiting is spiritually dangerous when the heart stops trusting. But even in the damage, God remains compassionate and attentive.",
        ],
      },
    ],
    lesson:
      "Genesis 16 teaches that forced promises create real wounds, but God sees the wounded. Waiting must be guarded with trust, not control.",
  },
  {
    chapter: 17,
    title: "🪪 Genesis 17 — New Names And Covenant Identity",
    intro:
      "Genesis 17 gives Abram and Sarai new names. God is not only promising a future; He is naming them according to that future while the evidence still looks impossible.",
    flow: ["God reveals Himself as Almighty.", "Abram becomes Abraham and Sarai becomes Sarah.", "Circumcision marks the covenant, and Isaac is promised."],
    sections: [
      {
        reference: "Genesis 17:1-8",
        title: "🙇 Walk before Me",
        points: [
          "God introduces Himself as God Almighty and calls Abram to walk before Him. Covenant is not just receiving promises. It is living before God with a whole life.",
          "Abram falls on his face. That posture fits the moment. God is speaking identity, nations, kings, land, and everlasting covenant over a man who still cannot produce the promised son.",
          "Abram becomes Abraham, father of many nations. The name is a daily sermon before the child arrives. Every time someone says his name, they are speaking God's promise over visible impossibility.",
        ],
      },
      {
        reference: "Genesis 17:9-14",
        title: "📜 A covenant marked in the body",
        points: [
          "Circumcision marks the covenant physically. This is not casual spirituality. God is placing covenant identity on Abraham's household in a visible and costly way.",
          "The sign does not create the promise, but it marks belonging to the promise. Abraham's family is being set apart.",
          "This teaches that faith is not merely an idea in the mind. Covenant touches identity, household, obedience, and the way life is carried forward.",
        ],
      },
      {
        reference: "Genesis 17:15-27",
        title: "😂 Promise that sounds impossible",
        points: [
          "Sarai becomes Sarah, and God says she will bear Isaac. Abraham laughs because the promise feels biologically impossible.",
          "God does not cancel the promise because Abraham struggles to grasp it. He names Isaac and fixes the time. The promise rests on God's power, not Abraham's imagination.",
          "Abraham obeys the covenant sign that same day. That matters. Even while he is still trying to understand the impossible promise, he responds to the command he has been given.",
        ],
      },
    ],
    lesson:
      "Genesis 17 teaches that God names His people according to promise before they can see the outcome. Covenant identity is received, marked, and obeyed.",
  },
  {
    chapter: 18,
    title: "🏕️ Genesis 18 — Near Enough To Hear And Pray",
    intro:
      "Genesis 18 shows Abraham in closeness with God. He welcomes visitors, hears the promise of Isaac again, and then stands before the Lord in bold intercession for Sodom.",
    flow: ["Abraham receives divine visitors.", "Sarah hears the impossible promise.", "Abraham intercedes for Sodom."],
    sections: [
      {
        reference: "Genesis 18:1-8",
        title: "🤲 Hospitality as holy attention",
        points: [
          "Abraham runs to welcome the visitors. The chapter moves with urgency, honor, food, water, and rest. This is not cold religion. It is a life ready to receive what God is doing.",
          "Hospitality in Scripture is often more than manners. It is openness, humility, and attention to the person in front of you.",
          "Abraham's tent becomes a place where promise is spoken again. Ordinary welcome becomes the setting for divine conversation.",
        ],
      },
      {
        reference: "Genesis 18:9-15",
        title: "❓ Is anything too hard for the Lord?",
        points: [
          "Sarah laughs inside the tent. Her laughter is quiet, but God hears it. Hidden reactions are not hidden from Him.",
          "The question, \"Is anything too hard for the Lord?\" is the heart of the chapter. It confronts the limits Sarah has placed around possibility.",
          "This does not shame Sarah as if waiting has been easy. It calls her to see that God's promise is not trapped inside human timelines or human biology.",
        ],
      },
      {
        reference: "Genesis 18:16-33",
        title: "🙏 Reverent boldness",
        points: [
          "God lets Abraham into the conversation about Sodom. That is astonishing. Abraham is being treated as a covenant friend, not merely a servant receiving orders.",
          "Abraham pleads with humility and courage. He cares about justice, mercy, and the righteous caught in a wicked place.",
          "This is prayer shaped by nearness. Abraham does not command God, but he does draw near and speak. Real friendship with God deepens reverence and boldness at the same time.",
        ],
      },
    ],
    lesson:
      "Genesis 18 teaches that obedience matures into closeness. Abraham's walk with God includes welcome, honest promise, and bold intercession.",
  },
  {
    chapter: 19,
    title: "🔥 Genesis 19 — Mercy Pulling People From Judgment",
    intro:
      "Genesis 19 is heavy. It shows Sodom's wickedness, Lot's compromised position, God's mercy, and the serious reality of judgment. It sits near Abraham's story as a warning about direction and holiness.",
    flow: ["The angels enter Sodom.", "Lot is rescued by mercy.", "The chapter ends with painful consequences."],
    sections: [
      {
        reference: "Genesis 19:1-11",
        title: "🌃 A city showing its heart",
        points: [
          "The wickedness of Sodom is not vague in this chapter. The city reveals a violent, predatory heart, and Lot's home becomes the pressure point.",
          "Lot is called righteous elsewhere in Scripture, but Genesis shows him deeply entangled in a dangerous place. Sitting in the gate suggests belonging and influence, yet he cannot heal the city.",
          "This warns us that proximity to corruption can reshape a household long before a person admits it. Lot is distressed, but also settled.",
        ],
      },
      {
        reference: "Genesis 19:12-22",
        title: "🤲 Mercy that drags the hesitant",
        points: [
          "Lot warns his family, but his sons-in-law think he is joking. That is tragic. A compromised witness can make urgent truth sound unbelievable.",
          "Lot lingers even as judgment approaches. The angels seize him and his family by the hand because the Lord is merciful.",
          "That detail is powerful. Sometimes mercy does not feel gentle in the moment. Sometimes mercy pulls us away from what we are still too attached to.",
        ],
      },
      {
        reference: "Genesis 19:23-38",
        title: "💔 Rescue does not erase damage",
        points: [
          "Sodom falls. Lot's wife looks back and becomes a warning. The chapter wants us to feel the seriousness of divided affection.",
          "The ending with Lot's daughters is disturbing and sad. It shows that leaving Sodom physically did not mean Sodom's damage had fully left the family.",
          "Genesis 19 is not written for easy reading. It teaches that compromise has consequences, judgment is real, and mercy should never be treated lightly.",
        ],
      },
    ],
    lesson:
      "Genesis 19 teaches that God's mercy is real and God's holiness is serious. The direction of a life matters before the crisis arrives.",
  },
  {
    chapter: 20,
    title: "🔁 Genesis 20 — The Fear That Came Back",
    intro:
      "Genesis 20 is sobering because Abraham repeats an old failure. After years of walking with God, receiving covenant, and interceding for Sodom, fear still bends his behavior.",
    flow: ["Abraham repeats the sister lie.", "God protects Sarah through a dream.", "Abraham is corrected and restored."],
    sections: [
      {
        reference: "Genesis 20:1-7",
        title: "😟 Old fear in a new place",
        points: [
          "Abraham says Sarah is his sister again. The pattern from Egypt returns, showing that old fears can survive many spiritual experiences if they are not deeply healed.",
          "Abimelech takes Sarah, but God intervenes in a dream. Once again, God protects the promise from Abraham's fear-driven failure.",
          "The seriousness is clear. Abraham's self-protection puts Sarah, Abimelech, and an entire household at risk. Private fear can create public damage.",
        ],
      },
      {
        reference: "Genesis 20:8-13",
        title: "🪞 A painful explanation",
        points: [
          "Abraham explains that he thought there was no fear of God in the place. The irony is sharp because Abimelech acts with more integrity in the moment than Abraham does.",
          "Abraham's explanation reveals a settled strategy of fear. This was not a one-time panic. It was a plan he and Sarah had carried from place to place.",
          "That is how hidden patterns often work. They travel with us until God brings them into the light.",
        ],
      },
      {
        reference: "Genesis 20:14-18",
        title: "🩹 Grace that corrects",
        points: [
          "Abimelech restores Sarah and gives gifts, and Abraham prays for his household. The chapter ends with healing, but it does not pretend the failure was small.",
          "God's grace protects the promise and corrects Abraham at the same time. Grace is not permission to stay careless. It is mercy that keeps forming the person God called.",
          "This chapter gives hope to people who see old fears resurface. The point is not to hide them. The point is to let God expose, heal, and mature them.",
        ],
      },
    ],
    lesson:
      "Genesis 20 teaches that old fear can return, but God's faithfulness can still correct and preserve. Abraham needs grace as much as he needs promise.",
  },
  {
    chapter: 21,
    title: "👶 Genesis 21 — Promise In The Arms",
    intro:
      "Genesis 21 finally places Isaac in Abraham and Sarah's arms. The promise becomes visible, laughter changes tone, and the story proves that delay was never denial.",
    flow: ["Isaac is born just as God said.", "Hagar and Ishmael are sent away but not abandoned by God.", "Abraham worships the everlasting God."],
    sections: [
      {
        reference: "Genesis 21:1-7",
        title: "😂 Laughter turned to joy",
        points: [
          "The repeated phrase is that God did as He had spoken. That is the foundation of the scene. Isaac's birth is not luck, biology, or human achievement. It is promise fulfilled.",
          "Sarah laughs again, but now the laughter is joy. The very place of disbelief becomes a place of praise.",
          "This moment carries decades of waiting. Genesis wants us to feel that God's word can look delayed for a long time and still arrive exactly alive.",
        ],
      },
      {
        reference: "Genesis 21:8-21",
        title: "💔 Fulfillment with complicated pain",
        points: [
          "The celebration around Isaac does not erase the pain connected to Hagar and Ishmael. Earlier compromise has consequences that now have to be faced.",
          "Hagar is sent away, and the scene in the wilderness is heartbreaking. Yet God hears the boy and opens Hagar's eyes to water.",
          "This teaches that God's covenant focus on Isaac does not mean God is careless with others. He sees Hagar again. He hears Ishmael. Mercy is still present in the painful edges of the promise story.",
        ],
      },
      {
        reference: "Genesis 21:22-34",
        title: "🌳 Calling on the everlasting God",
        points: [
          "Abraham makes peace with Abimelech and plants a tree at Beersheba. The chapter ends with stability, worship, and the name of the Everlasting God.",
          "That name matters after a chapter about long waiting. Abraham has learned that God's timeline is larger than his own impatience.",
          "Isaac is born, but the story is still moving. Abraham worships the God whose faithfulness stretches beyond one moment of fulfillment.",
        ],
      },
    ],
    lesson:
      "Genesis 21 teaches that God keeps His word in His time. The promise arrives with joy, and God's mercy is still present in the complicated aftermath.",
  },
  {
    chapter: 22,
    title: "⛰️ Genesis 22 — The Promise On The Altar",
    intro:
      "Genesis 22 is the deepest test in Abraham's life. Isaac is not only Abraham's beloved son; he is the visible future of the promise. God asks Abraham to surrender the gift back to the Giver.",
    flow: ["God tests Abraham.", "Abraham walks the long road of surrender.", "God provides the ram and renews the promise."],
    sections: [
      {
        reference: "Genesis 22:1-8",
        title: "🪵 The long walk",
        points: [
          "The chapter names Isaac with emotional weight: your son, your only son, whom you love. The test is not abstract. God names what Abraham treasures most.",
          "Abraham rises early. That does not mean the command was easy. It means his obedience is serious enough to move even when the emotional weight is crushing.",
          "Isaac asks, \"Where is the lamb?\" Abraham answers, \"God will provide.\" That sentence holds the chapter together. Abraham does not understand everything, but he trusts the Provider.",
        ],
      },
      {
        reference: "Genesis 22:9-14",
        title: "🐏 Provision at the point of surrender",
        points: [
          "The altar scene is tense because obedience has reached the edge. Abraham stretches out his hand, and then God stops him.",
          "The ram appears in the thicket. God provides the sacrifice. Isaac is spared, and Abraham names the place, \"The Lord will provide.\"",
          "This is not about God needing information. It is about Abraham's faith being revealed, tested, and deepened. The promise is safer in God's hands than in Abraham's control.",
        ],
      },
      {
        reference: "Genesis 22:15-24",
        title: "📜 Promise after surrender",
        points: [
          "After the test, God reaffirms the blessing. Abraham's surrender did not destroy the promise. It clarified that the promise belongs to God.",
          "This chapter also points forward. The beloved son, the wood, the mountain, and the substitute all prepare the reader to recognize deeper patterns of sacrifice and provision in Scripture.",
          "Genesis 22 teaches that the hardest obedience is often about whether we trust God with what we love most.",
        ],
      },
    ],
    lesson:
      "Genesis 22 teaches that true faith can place even the promise on the altar because it trusts the Provider more than the gift.",
  },
  {
    chapter: 23,
    title: "🪦 Genesis 23 — Grief Inside The Promise",
    intro:
      "Genesis 23 slows the story down. Sarah dies, Abraham mourns, and the first clear piece of land he owns in Canaan is a burial place. The chapter is quiet, but it is deeply important.",
    flow: ["Sarah dies and Abraham mourns.", "Abraham buys Machpelah honorably.", "Sarah is buried in the land of promise."],
    sections: [
      {
        reference: "Genesis 23:1-2",
        title: "😭 Faith still weeps",
        points: [
          "The Bible says Abraham came to mourn and weep for Sarah. It does not rush past his grief because he is a man of faith.",
          "That matters. Faith does not make a person less human. Abraham has walked with God for years, but death still hurts.",
          "Genesis gives dignity to sorrow. Promise and grief can exist in the same room.",
        ],
      },
      {
        reference: "Genesis 23:3-16",
        title: "⚖️ Honorable dealings",
        points: [
          "Abraham negotiates publicly and respectfully for the cave of Machpelah. He refuses to take the land as a vague favor and insists on paying the full price.",
          "This shows integrity. Abraham's faith affects how he handles business, grief, and public reputation.",
          "He is still a stranger in the land, but he acts with dignity because he trusts God's promise without becoming manipulative.",
        ],
      },
      {
        reference: "Genesis 23:17-20",
        title: "📍 A grave in the promised land",
        points: [
          "The first owned piece of the promised land is not a palace, field, or city. It is a tomb.",
          "That is emotionally powerful. Abraham owns a burial place before he sees the land filled with descendants.",
          "Faith sometimes plants hope in the soil of grief. Sarah's burial in Canaan says the family still belongs to the promise, even in death.",
        ],
      },
    ],
    lesson:
      "Genesis 23 teaches that faith does not deny grief. Abraham mourns honestly while anchoring his family in the promise God gave.",
  },
  {
    chapter: 24,
    title: "💧 Genesis 24 — Guidance For The Promise",
    intro:
      "Genesis 24 turns toward the next generation. Abraham is old, Isaac needs a wife, and the promise must continue without Isaac being pulled back to the old life.",
    flow: ["Abraham sends his servant with covenant priorities.", "The servant prays and watches for God's guidance.", "Rebekah responds, and Isaac's future is established."],
    sections: [
      {
        reference: "Genesis 24:1-9",
        title: "🧭 The next generation must not go backward",
        points: [
          "Abraham is clear that Isaac must not return to the land Abraham left. The promise is tied to God's direction, not nostalgia.",
          "This is mature faith. Abraham is thinking beyond his own lifetime and protecting Isaac's future direction.",
          "Obedience becomes legacy when a person cares about the spiritual path of those who come after them.",
        ],
      },
      {
        reference: "Genesis 24:10-27",
        title: "🙏 Prayer beside the well",
        points: [
          "The servant prays specifically and humbly. He is not trying to control God; he is asking for guidance that matches covenant kindness.",
          "Rebekah's response reveals character. She offers water not only to the servant but also to the camels, showing generosity, strength, and hospitality.",
          "The servant worships before the mission is even fully finished. Guidance should lead to worship, not self-congratulation.",
        ],
      },
      {
        reference: "Genesis 24:28-67",
        title: "💍 A willing step into the promise",
        points: [
          "The story is retold in the household because testimony matters. The servant explains how God led him.",
          "Rebekah is asked whether she will go, and she says yes. Her willingness echoes Abraham's earlier obedience in a new generation.",
          "Isaac receives Rebekah, and the promise story moves forward. Genesis 24 is long because guidance, character, family, and covenant all matter deeply.",
        ],
      },
    ],
    lesson:
      "Genesis 24 teaches that God's promise continues through prayerful guidance, wise priorities, and willing obedience in the next generation.",
  },
  {
    chapter: 25,
    title: "🌅 Genesis 25 — Full Of Years",
    intro:
      "Genesis 25 closes Abraham's earthly story. He dies old and full of years, but the promise does not die with him. The chapter moves from Abraham's final family lines into Isaac's generation.",
    flow: ["Abraham's later descendants are named.", "Abraham dies and is buried by Isaac and Ishmael.", "The story turns toward Jacob and Esau."],
    sections: [
      {
        reference: "Genesis 25:1-11",
        title: "🕊️ A life completed, not a promise completed",
        points: [
          "Abraham has more descendants through Keturah, but Isaac remains the covenant son. Genesis is careful to distinguish family expansion from covenant line.",
          "Abraham dies at a good old age, full of years. That phrase carries a sense of completion. His life was not perfect, but it was deeply lived before God.",
          "Isaac and Ishmael bury him together. That moment is quiet and moving. The family story has pain, but Abraham's death gathers both sons at the cave of Machpelah.",
        ],
      },
      {
        reference: "Genesis 25:12-18",
        title: "📜 God remembers Ishmael",
        points: [
          "Ishmael's line is recorded. This matters because God had promised Hagar and Abraham that Ishmael would become a great nation.",
          "The covenant line goes through Isaac, but Scripture still pauses to show that God kept His word concerning Ishmael.",
          "This teaches us to read God's faithfulness carefully. His chosen covenant purpose does not make Him forget other promises He has spoken.",
        ],
      },
      {
        reference: "Genesis 25:19-34",
        title: "🌱 The next generation begins with tension",
        points: [
          "Isaac and Rebekah face barrenness, and Isaac prays. The next generation immediately learns that promise still requires dependence.",
          "Jacob and Esau struggle even before birth. The story of promise continues, but it is not simple or tidy.",
          "Abraham's life closes, but Genesis keeps moving. Faithfulness is bigger than one person's lifespan. The God who called Abraham is still guiding the story.",
        ],
      },
    ],
    lesson:
      "Genesis 25 teaches that a life of faith can end while God's promise keeps moving. Abraham is gone, but God's covenant faithfulness continues.",
  },
];

function renderNote(note: AbrahamChapterNote) {
  return `${note.title}

${note.intro}

📍 The Chapter Flow

${note.flow.map((item) => `* ${item}`).join("\n\n")}

${note.sections
  .map(
    (section) => `## ${renderVerseRange(section.reference)} ${section.title}

${section.points.join("\n\n")}`,
  )
  .join("\n\n")}

💡 The Big Lesson of Genesis ${note.chapter}

${note.lesson}`;
}

export const OBEDIENCE_OF_ABRAHAM_DEEP_NOTES = ABRAHAM_CHAPTER_NOTES.map(renderNote);
