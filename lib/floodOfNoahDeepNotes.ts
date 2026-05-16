type FloodSection = {
  reference: string;
  title: string;
  verses: string[];
  notes: string[];
};

type FloodChapterNote = {
  chapter: number;
  title: string;
  hook: string;
  setup: string[];
  matters: string[];
  sections: FloodSection[];
  finalThought: string[];
  pause: string[];
  lesson: string;
};

function verseCallouts(verses: string[]) {
  return verses.map((verse) => `> **${verse}**`).join("\n\n");
}

function buildSection(section: FloodSection) {
  return `## ${section.reference}\n\n# ${section.title}\n\n${verseCallouts(section.verses)}\n\n${section.notes.join("\n\n")}`;
}

const commonFloodThreads = [
  "Genesis is showing that sin never stays small. What began as distrust in Eden becomes murder in Genesis 4, then becomes an entire world filled with corruption and violence.",
  "The flood is not written like a fairy tale. It is written with weight. The story makes readers feel the seriousness of judgment and the mercy of God preserving life.",
  "Noah matters because he obeys before the sky changes. He builds, gathers, enters, waits, worships, and begins again because God speaks.",
  "The flood chapters also explain the world after the flood: covenant, blood, human dignity, nations, kingdoms, pride, and the long road toward Abraham.",
];

const floodNotes: FloodChapterNote[] = [
  {
    chapter: 5,
    title: "Death Spreads Through the Generations",
    hook: "Genesis 5 can look like a list of names at first, but it is one of the most haunting chapters in early Genesis.",
    setup: [
      "After Eden is lost and violence enters the family through Cain, Genesis 5 slows down and traces the line of Adam through Seth. The chapter sounds repetitive on purpose. A man lives, fathers a son, lives more years, and then the same sentence falls like a bell: and he died.",
      "This is the first long genealogy in Scripture, but it is not filler. It is theology in family-record form. Genesis 5 shows that God's command in Eden was true. Sin brought death into the human story, and now death follows generation after generation.",
      "But the chapter is not only dark. In the middle of the death refrain, Enoch walks with God. At the end, Noah is born with a name connected to comfort and the cursed ground. That means even inside a chapter shaped by death, God keeps a line of hope alive.",
    ],
    matters: [
      "It shows death spreading after the fall.",
      "It connects Adam, Seth, Enoch, Methuselah, Lamech, and Noah.",
      "It teaches readers how genealogies carry theology, not just names.",
      "It makes Enoch's faithful walk stand out in a world moving toward corruption.",
      "It introduces Noah before the flood judgment arrives.",
    ],
    sections: [
      {
        reference: "Genesis 5:1 to 20",
        title: "Adam's Descendants and the Refrain of Death",
        verses: [
          "Genesis 5:1-2 calls this the book of the generations of Adam.",
          "Genesis 5:3 says Adam begat a son in his own likeness, after his image.",
          "Genesis 5 repeats the phrase, and he died.",
        ],
        notes: [
          "Genesis 5 begins by reaching back to creation. The chapter reminds us that humanity was made in the likeness of God. That matters because the flood story is not about God casually destroying something worthless. Humanity is still dignified. Humanity is still made by God. But humanity is now living east of Eden, under the shadow of death.",
          "The phrase `book of the generations` means this is an ordered family record. Ancient readers would not hear this as a boring interruption. They would hear it as the way a family identity, a promise line, and a theological memory are preserved.",
          "Verse 3 says Adam fathers Seth in his own likeness and after his image. Genesis 1 said humanity was made in God's image. Genesis 5 now says Adam passes life forward after the fall. The image of God is not erased, but the brokenness of Adam's fallen condition is now carried through the generations too.",
          "That is why the repeated phrase `and he died` matters so much.",
          "It is not just a death notice.",
          "It is Genesis preaching.",
          "- Adam lived, and he died.",
          "- Seth lived, and he died.",
          "- Enos lived, and he died.",
          "- Cainan lived, and he died.",
          "- Mahalaleel lived, and he died.",
          "- Jared lived, and he died.",
          "The rhythm is intentionally heavy. Genesis wants the reader to feel the curse of Genesis 3 moving through ordinary family history.",
          "The long lifespans can feel strange to modern readers. Bible readers have understood them in different ways, but inside the story they do at least three things. They show the ancient world feeling very different from ours. They show life continuing with unusual strength near the beginning of human history. And they make the tragedy sharper: even lives that stretch for centuries still end in death.",
          "This is one reason Genesis 5 is darker than it first appears. The chapter is not dramatic like Cain murdering Abel. It is quiet. It is names and years. But the quietness makes it feel more realistic. Death is not only in violent moments. Death becomes part of every family record.",
          "Modern readers often rush through genealogies because they do not feel like action scenes. But Genesis 5 is doing emotional and theological work. It is letting us feel that something has gone terribly wrong with humanity, even while families keep growing.",
          "The flood has not arrived yet, but the chapter is already preparing us for it. The world is multiplying. Death is spreading. Hope is narrowing into a line. Noah is coming.",
        ],
      },
      {
        reference: "Genesis 5:21 to 24",
        title: "Enoch Walked With God",
        verses: [
          "Genesis 5:22 says Enoch walked with God.",
          "Genesis 5:24 says Enoch was not, for God took him.",
        ],
        notes: [
          "Enoch interrupts the pattern.",
          "That is the point.",
          "The chapter has trained the reader to expect the same ending: and he died. Then Enoch appears, and the pattern changes. Instead of simply saying he lived and died, Genesis says twice that Enoch walked with God.",
          "`Walked with God` is covenant-life language before the formal covenants are fully developed. It pictures closeness, faithfulness, fellowship, and a life moving in the direction God desires. It is not saying Enoch was sinless. It is saying his life was marked by nearness to God in a world where death was still spreading.",
          "That matters for the flood story because Noah will later be described with similar language. Genesis 6:9 says Noah walked with God. Enoch becomes a preview of faithful life in a darkening world.",
          "The phrase `God took him` is mysterious and beautiful. Enoch does not receive the normal death refrain. Later Scripture remembers Enoch as a man of faith. But even inside Genesis, the point is clear enough: death is real, but death is not stronger than God.",
          "Enoch's life gives the chapter a flash of hope.",
          "It tells us that even under the curse, a person can still walk with God.",
          "That is important because sometimes readers think the early chapters of Genesis are only about collapse. They are not. They are about collapse and mercy together. Sin spreads, death spreads, violence spreads, but God still knows those who walk with Him.",
          "Enoch also makes the reader ask a personal question: what does faithfulness look like when the larger world is not getting better?",
          "The answer in Genesis 5 is simple and deep.",
          "Walk with God.",
          "Not perform for God.",
          "Not manage your image around God.",
          "Walk with Him.",
          "Steady. Near. Obedient. Trusting.",
        ],
      },
      {
        reference: "Genesis 5:25 to 32",
        title: "Noah Is Introduced",
        verses: [
          "Genesis 5:29 says Noah will comfort us concerning our work and toil because of the ground which the LORD hath cursed.",
          "Genesis 5:32 names Noah's sons: Shem, Ham, and Japheth.",
        ],
        notes: [
          "The end of Genesis 5 introduces Noah before the flood begins.",
          "That is not accidental.",
          "Noah's name is connected to comfort, rest, or relief. His father Lamech speaks about the pain of work and the cursed ground. That reaches back to Genesis 3, where the ground is cursed because of Adam's sin.",
          "So Noah is introduced as a child born into a world that is tired.",
          "The ground is cursed.",
          "Death is repeated.",
          "Humanity is multiplying.",
          "Something is wrong everywhere.",
          "Lamech's words do not mean Noah will remove the curse completely. Only God can finally do that. But Noah's life will become a turning point. Through Noah, God will preserve life through judgment and begin the world again on the other side of the waters.",
          "The chapter closes by naming Shem, Ham, and Japheth. Those names matter because Genesis 9 and 10 will trace the post-flood world through them. The nations after the flood do not come out of nowhere. They come through Noah's family.",
          "Genesis 5 ends with the reader standing at the edge of the flood story.",
          "We have felt death.",
          "We have seen one man walk with God.",
          "We have heard a father longing for relief from the cursed ground.",
          "Now the next chapter will show why judgment becomes necessary.",
        ],
      },
    ],
    finalThought: [
      "Genesis 5 teaches that death is not an abstract doctrine. It enters family records, names, ages, and generations.",
      "But Enoch shows that walking with God is still possible, and Noah's birth shows that God is still preserving hope.",
    ],
    pause: [
      "Why do you think Genesis repeats `and he died` so many times?",
      "What does Enoch teach you about faithfulness in a dark world?",
      "How does Noah's name prepare you for the flood story?",
    ],
    lesson:
      "Genesis 5 teaches that the fall has reshaped human history with death, but God still preserves a faithful line and keeps hope alive through people who walk with Him.",
  },
  {
    chapter: 6,
    title: "Corruption Fills the Earth",
    hook: "Genesis 6 is where the darkness becomes impossible to ignore.",
    setup: [
      "Humanity has multiplied, but multiplication has not solved the heart. The earth is not becoming more righteous just because there are more people on it. Instead, wickedness, violence, and corruption spread until the chapter says God is grieved.",
      "This chapter is intense because judgment and mercy stand side by side. God announces that the world cannot continue as it is, but Noah finds grace in the eyes of the LORD. The ark begins as an act of obedience before it becomes a place of rescue.",
      "Genesis 6 teaches that God is not indifferent to violence. He sees what fills the earth, and He responds. But even in judgment, He makes a way to preserve life.",
    ],
    matters: [
      "It explains why the flood happens.",
      "It shows God's grief over human corruption.",
      "It introduces Noah as righteous in his generation.",
      "It gives the ark instructions and the covenant promise.",
      "It holds judgment and grace together.",
    ],
    sections: [
      {
        reference: "Genesis 6:1 to 8",
        title: "Corruption Fills the Earth",
        verses: [
          "Genesis 6:5 says every imagination of the thoughts of man's heart was only evil continually.",
          "Genesis 6:6 says it repented the LORD that he had made man on the earth.",
          "Genesis 6:8 says Noah found grace in the eyes of the LORD.",
        ],
        notes: [
          "Genesis 6 opens with difficult language about the `sons of God`, the `daughters of men`, and `giants` in the earth. Bible readers have discussed these phrases for a long time. Some understand the sons of God as heavenly beings who rebelled. Some understand them as rulers or powerful men. Some understand them as the line of Seth intermarrying with the line of Cain. Bible Buddy should handle this carefully: the main point of the chapter is not curiosity. The main point is corruption.",
          "The KJV word `giants` translates the Hebrew word often rendered Nephilim. The word is debated, but in the story it points to a fearful ancient world of mighty figures, violence, and distorted human power. Genesis is not inviting us to obsess over speculation. It is showing a world where power, desire, and rebellion have become dangerous.",
          "Verse 5 is one of the darkest statements in the Bible about the human heart. God sees that wickedness is great in the earth. The problem is not only behavior. It is imagination, thought, desire, intention, and direction. The inside of humanity is sick.",
          "That is why the flood is not random. Genesis gives the moral reason before it gives the water.",
          "Violence fills the earth because hearts are bent away from God.",
          "The phrase `repented the LORD` can confuse modern readers. It does not mean God sinned or made a mistake. It means God is grieved and moved with sorrow over what humanity has become. The Hebrew idea carries emotional pain. Genesis is showing that judgment comes from a holy God who is not cold toward His creation.",
          "That matters deeply.",
          "God is not amused by evil.",
          "God is not numb to violence.",
          "God is not detached from human ruin.",
          "The chapter says it grieved Him at His heart.",
          "Then verse 8 breaks through like light in a dark room: Noah found grace in the eyes of the LORD.",
          "Grace means favor. Noah is not introduced as the hero who saves himself by being impressive. He is a man who receives grace, walks with God, and obeys what God says. That order matters.",
          "The flood story is terrifying, but it is not hopeless. Grace appears before the ark is built.",
        ],
      },
      {
        reference: "Genesis 6:9 to 22",
        title: "Noah and the Ark",
        verses: [
          "Genesis 6:9 says Noah was a just man and perfect in his generations, and Noah walked with God.",
          "Genesis 6:14 says make thee an ark of gopher wood.",
          "Genesis 6:22 says Noah did according to all that God commanded him.",
        ],
        notes: [
          "Genesis 6 now narrows from the whole earth to one man and his family. Noah is described as just, perfect in his generations, and walking with God. `Perfect` here does not mean sinless perfection. It carries the idea of blamelessness, wholeness, or integrity. Noah is different from the corruption around him.",
          "The earth is described as corrupt and filled with violence. Those words matter. Corruption means something has spoiled, decayed, or become ruined from its intended condition. Violence means harm, bloodshed, oppression, and destructive force. Genesis is saying human society has become unsafe.",
          "God tells Noah to build an ark.",
          "`Gopher wood` is an old phrase for a kind of wood we cannot identify with certainty today. The point is not that modern readers must know the exact tree. The point is that God gives practical instructions for a real vessel of preservation.",
          "`Cubits` are ancient measurements based roughly on the length from elbow to fingertip. A cubit is often estimated around eighteen inches, though exact lengths varied. The ark is described as massive. It is not a little children's boat. It is a survival vessel built for judgment waters.",
          "The ark has rooms, pitch, dimensions, a window, a door, and levels. The details slow the reader down. Salvation in this chapter is not vague inspiration. It looks like obedience with measurements.",
          "That is one of the biggest lessons of Noah's life.",
          "Noah obeys before the flood is visible.",
          "He does not wait until rain begins to take God seriously.",
          "He does not negotiate the ark into a smaller project.",
          "He does according to all that God commands.",
          "God also speaks of covenant in verse 18. This is the first time the word covenant appears in the Bible. A covenant is a solemn relationship promise. Before the flood fully arrives, God already promises relationship and preservation.",
          "That is the heart of Genesis 6: judgment is coming, but God is not abandoning His purpose to preserve life.",
          "The ark becomes a picture of rescue through judgment. The same waters that judge corruption will carry the ark. That does not make the story less terrifying. It makes the mercy more serious.",
        ],
      },
    ],
    finalThought: [
      "Genesis 6 is heavy because God lets us feel how dark humanity has become.",
      "But Noah finding grace shows that judgment is not the only word in the chapter.",
      "God sees corruption clearly, grieves deeply, judges seriously, and preserves life mercifully.",
    ],
    pause: [
      "What does Genesis 6 teach you about how God sees violence?",
      "Why does Noah's obedience matter before any rain begins?",
      "How do judgment and mercy appear together in this chapter?",
    ],
    lesson:
      "Genesis 6 teaches that God judges a world ruined by violence and corruption, yet He gives grace, establishes covenant, and prepares rescue through obedient faith.",
  },
  {
    chapter: 7,
    title: "The Waters of Judgment Rise",
    hook: "Genesis 7 is the moment warning becomes reality.",
    setup: [
      "The ark is finished. The animals come. Noah and his family enter. Then the door closes, the rain falls, the deep breaks open, and the world outside the ark disappears beneath judgment waters.",
      "This chapter should feel unsettling. It is not merely about animals and rainbows. It is about the seriousness of sin, the terror of judgment, and the mercy of being shut inside the place God provided.",
      "Genesis 7 makes readers feel that when God says judgment is coming, His word is not empty.",
    ],
    matters: [
      "It shows Noah entering the ark by faith and obedience.",
      "It explains clean and unclean animals.",
      "It describes the fountains of the deep and the windows of heaven.",
      "It carries the emotional weight of destruction outside the ark.",
      "It shows God preserving the life He chose to save.",
    ],
    sections: [
      {
        reference: "Genesis 7:1 to 10",
        title: "Entering the Ark",
        verses: [
          "Genesis 7:1 says come thou and all thy house into the ark.",
          "Genesis 7:2 mentions clean beasts and beasts that are not clean.",
          "Genesis 7:5 says Noah did according unto all that the LORD commanded him.",
        ],
        notes: [
          "The first word God speaks in this chapter is deeply important: come.",
          "God does not merely say, `Go into the ark.` He says, `Come.` The language pictures God inviting Noah into the place of preservation. The ark is not Noah's clever escape plan. It is God's commanded refuge.",
          "Noah's family enters with him. This matters because God is preserving a household through which the post-flood world will continue. Noah's obedience affects more than Noah.",
          "The mention of clean and unclean beasts can surprise readers because the formal law of clean and unclean animals comes later through Moses. But Genesis already recognizes categories that ancient readers would connect to worship and sacrifice. Clean animals will matter in Genesis 8 when Noah offers sacrifice after leaving the ark.",
          "This means the ark is not only about biological survival. It is about preserving worship too.",
          "The animals come male and female. The wording reaches back to creation. Genesis 7 is a judgment chapter, but it keeps using creation language because God is preserving His creation through judgment, not giving up on it.",
          "Verse 5 repeats Noah's obedience. That repetition matters.",
          "Noah did according to all that the LORD commanded.",
          "Noah's faith is not abstract. It becomes boards, pitch, gathering, entering, waiting, and trusting.",
          "The seven-day waiting period before the flood begins must have been emotionally intense. Imagine being inside the ark while nothing has happened yet. Faith often has a waiting room. Noah enters because God speaks, not because the weather has already proven God right.",
        ],
      },
      {
        reference: "Genesis 7:11 to 24",
        title: "The Flood Begins",
        verses: [
          "Genesis 7:11 says all the fountains of the great deep were broken up, and the windows of heaven were opened.",
          "Genesis 7:16 says the LORD shut him in.",
          "Genesis 7:23 says every living substance was destroyed which was upon the face of the ground.",
        ],
        notes: [
          "Genesis 7:11 is one of the most dramatic flood verses. The waters do not only come from above. The fountains of the great deep break open, and the windows of heaven open.",
          "`Fountains of the deep` refers to subterranean waters or deep water sources in the ancient way of describing the world. Ancient readers pictured waters above, waters below, and dry land held in ordered place by God's power. The flood feels like creation boundaries being loosened.",
          "That is why the flood is so terrifying. It is not just a storm. It is a kind of undoing. Genesis 1 showed God ordering waters so life could flourish. Genesis 7 shows waters overwhelming the ordered world because humanity has filled the earth with corruption.",
          "The phrase `the LORD shut him in` is tender and frightening at the same time.",
          "It is tender because God secures Noah inside the ark.",
          "It is frightening because the door is now closed.",
          "The time for building is over.",
          "The time for warning is over.",
          "The waters rise.",
          "The chapter repeats that the waters prevailed. That word gives the feeling of unstoppable force. The ark is lifted, but everything outside is covered.",
          "This is where the story should feel heavy. The flood is not cute. It is judgment. Genesis says all flesh outside the ark died. Birds, cattle, beasts, creeping things, and humans. The language is broad and devastating.",
          "Modern readers sometimes soften this because the story is familiar from children's books. But Genesis 7 is meant to make us tremble. It teaches that God is patient, but He is not passive. He gives warning, but He also judges.",
          "At the same time, the ark floats.",
          "That is mercy in the middle of terror.",
          "The same water that destroys the corrupt world carries the family God preserves. That picture will echo through Scripture whenever judgment and salvation appear together.",
        ],
      },
    ],
    finalThought: [
      "Genesis 7 should not be rushed.",
      "It is the chapter where obedience enters the ark and judgment covers the earth.",
      "The fear of the flood helps us understand the seriousness of sin and the mercy of God's rescue.",
    ],
    pause: [
      "What do you feel when you read that the LORD shut Noah in?",
      "Why is it important not to turn the flood into a cute story?",
      "Where do you need to obey God before you see the evidence everyone else wants?",
    ],
    lesson:
      "Genesis 7 teaches that God's warnings are serious, His judgment is real, and His provided refuge is the only safe place when the waters rise.",
  },
  {
    chapter: 8,
    title: "The Waters Recede and Worship Returns",
    hook: "Genesis 8 begins with one of the most comforting phrases in the flood story: God remembered Noah.",
    setup: [
      "The flood has covered the earth, but the story does not end in destruction. God remembers Noah, sends a wind over the waters, and the flood begins to recede.",
      "This chapter is about waiting after survival. Noah is alive, but he still cannot leave. The raven goes out. The dove returns. Time passes slowly. Then the door opens, and Noah steps into a washed world.",
      "The first thing Noah builds after leaving the ark is not a house. It is an altar.",
    ],
    matters: [
      "It shows God remembering Noah and the creatures in the ark.",
      "It echoes creation with wind over waters.",
      "It teaches patience while waiting for God's timing.",
      "It shows worship after rescue.",
      "It introduces God's mercy toward the stability of seasons.",
    ],
    sections: [
      {
        reference: "Genesis 8:1 to 14",
        title: "The Waters Recede",
        verses: [
          "Genesis 8:1 says God remembered Noah.",
          "Genesis 8:1 says God made a wind to pass over the earth, and the waters asswaged.",
          "Genesis 8:11 says the dove came back with an olive leaf.",
        ],
        notes: [
          "`God remembered Noah` does not mean God had forgotten him. In Scripture, when God remembers, He acts faithfully according to His covenant care. The phrase means Noah is still held in God's attention, mercy, and purpose.",
          "That matters because the ark has become a world of waiting. Noah survived the beginning of judgment, but survival is not the same as immediate release. Sometimes mercy preserves you before it opens the door.",
          "God sends a wind over the earth, and the waters begin to recede. This echoes Genesis 1, where the Spirit of God moves upon the face of the waters. The flood story is using creation language again. The world is being prepared for a kind of new beginning.",
          "The KJV says the waters `asswaged.` That means they decreased, lessened, or subsided. It is an older word for the slow quieting of the flood.",
          "The ark rests on the mountains of Ararat. The story moves from chaos to stability, from floating to resting. But Noah still waits.",
          "The raven and dove scenes are full of tension. The raven goes back and forth. The dove returns because there is no rest for the sole of her foot. Later the dove returns with an olive leaf. Then finally the dove does not return.",
          "The dove with the olive leaf has become a famous symbol of peace, but inside Genesis it is first a sign that life is appearing again. Leaves are growing. The waters are going down. The earth is becoming habitable.",
          "Noah does not rush out the moment he feels hopeful. He waits until God gives the command. This is important. The man who obeyed by entering must also obey by waiting.",
          "Genesis 8 teaches that waiting can be part of faith after rescue. The storm may be over, but the ground may not be ready. God knows when to close the door, and God knows when to open it.",
        ],
      },
      {
        reference: "Genesis 8:15 to 22",
        title: "Noah Leaves the Ark",
        verses: [
          "Genesis 8:16 says go forth of the ark.",
          "Genesis 8:20 says Noah builded an altar unto the LORD.",
          "Genesis 8:22 promises seedtime and harvest, cold and heat, summer and winter, day and night.",
        ],
        notes: [
          "When God finally tells Noah to leave, the command includes his family and the living creatures. The goal is fruitfulness again. The animals are to breed abundantly. Creation is being sent back into the world.",
          "Noah steps into a world that has survived judgment but is not the same as before. The silence must have been enormous. The old world is gone. The ground is open. Humanity is reduced to one family.",
          "The first recorded act Noah performs outside the ark is worship.",
          "He builds an altar.",
          "That detail matters.",
          "Noah does not make worship an afterthought. After months of confinement, fear, loss, waiting, and mercy, he responds to God with sacrifice.",
          "The clean animals from Genesis 7 now make sense. God preserved enough for sacrifice and continuation. Worship was built into the rescue plan.",
          "God smells a sweet savour. This is sacrificial language. It does not mean God needs food. It means the sacrifice is accepted as worship.",
          "Then God speaks a promise about the stability of the earth: seedtime and harvest, cold and heat, summer and winter, day and night shall not cease while the earth remains.",
          "This does not mean human hearts are suddenly fixed. In fact, God says the imagination of man's heart is evil from his youth. That is sobering. The flood judged a corrupt world, but it did not erase the sin problem from the human heart.",
          "That is why the rest of the Bible is still needed.",
          "The flood can cleanse the earth outwardly, but humanity still needs redemption inwardly.",
          "Genesis 8 ends with mercy and realism together. God stabilizes the world, but the human heart still needs deeper rescue.",
        ],
      },
    ],
    finalThought: [
      "Genesis 8 is hopeful, but not shallow.",
      "God remembers, waters recede, life returns, worship rises, and seasons are promised.",
      "But the chapter also reminds us that humanity still needs more than a fresh start. We need transformed hearts.",
    ],
    pause: [
      "What does `God remembered Noah` teach you about waiting?",
      "Why do you think Noah worshiped before doing anything else?",
      "How does Genesis 8 show both mercy and realism about the human heart?",
    ],
    lesson:
      "Genesis 8 teaches that God faithfully remembers His people, brings them through waiting, receives worship after rescue, and preserves the world even while the human heart still needs redemption.",
  },
  {
    chapter: 9,
    title: "Covenant, Blood, Rainbow, and Noah's Failure",
    hook: "Genesis 9 begins with blessing and covenant, but it ends by reminding us that Noah is still human.",
    setup: [
      "The flood is over. God blesses Noah and his sons, repeats creation language, gives commands about life and blood, and places the rainbow as a covenant sign.",
      "This chapter is full of hope, but it is not naive. Human dignity is reaffirmed because people are made in God's image. Violence is restrained. Blood is treated as sacred. The rainbow becomes a sign that judgment will not come again in the same way.",
      "Then Noah falls into drunkenness and family shame. Genesis refuses to turn Noah into a flawless hero.",
    ],
    matters: [
      "It shows humanity restarting after the flood.",
      "It gives the rainbow covenant.",
      "It teaches the sacredness of blood and life.",
      "It reaffirms the image of God after judgment.",
      "It shows sin continuing even after a new beginning.",
    ],
    sections: [
      {
        reference: "Genesis 9:1 to 17",
        title: "God's Covenant With Noah",
        verses: [
          "Genesis 9:1 says be fruitful, and multiply, and replenish the earth.",
          "Genesis 9:6 says whoso sheddeth man's blood, by man shall his blood be shed: for in the image of God made he man.",
          "Genesis 9:13 says I do set my bow in the cloud.",
        ],
        notes: [
          "Genesis 9 starts like a new creation moment. God blesses Noah and his sons and tells them to be fruitful, multiply, and fill the earth. That echoes Genesis 1. The world after the flood is being restarted under God's blessing.",
          "But the world is not Eden. Fear of humanity will be upon the animals. Food permissions are expanded. Blood is forbidden. Violence is addressed directly.",
          "The command about blood matters because blood represents life. Genesis 9 teaches that life belongs to God. Humans may receive food from God, but they must not treat blood casually.",
          "Verse 6 is foundational for human dignity and justice. The reason murder is so serious is not because some people are useful or powerful. It is because human beings are made in the image of God.",
          "That image language returns after the flood. Judgment did not erase human worth.",
          "This is important for the whole Bible. The same humanity capable of violence is still made in God's image. That means Scripture holds two truths together: humans are deeply fallen, and humans are deeply valuable.",
          "Then God establishes covenant with Noah, his descendants, and every living creature. This covenant is wide. It reaches beyond Noah's family to the living world.",
          "The rainbow is called God's bow in the cloud. A bow can be a weapon image, but here the bow is set in the cloud as a sign of covenant mercy. The sign says God will not again destroy all flesh with floodwaters.",
          "The rainbow is not sentimental decoration in Genesis. It is a covenant sign after judgment.",
          "It means hope has memory.",
          "Every rainbow points back to a world that deserved judgment and a God who promised mercy.",
          "The covenant does not mean sin no longer matters. It means God binds Himself to preserve the world while His redemptive plan continues.",
        ],
      },
      {
        reference: "Genesis 9:18 to 29",
        title: "Noah's Failure and Family Consequences",
        verses: [
          "Genesis 9:20 says Noah began to be an husbandman.",
          "Genesis 9:21 says he drank of the wine, and was drunken.",
          "Genesis 9:25 says cursed be Canaan.",
        ],
        notes: [
          "The second half of Genesis 9 is uncomfortable, and that is part of its purpose.",
          "The KJV calls Noah an `husbandman.` That means a man who works the ground, a farmer, or a cultivator. Noah plants a vineyard. The man preserved through the flood becomes a man working the post-flood ground.",
          "Then Noah becomes drunk and uncovered in his tent. The details are debated, but the story clearly presents shame, dishonor, and family breakdown.",
          "This is important because Genesis does not make Noah into a perfect savior. Noah was faithful. Noah obeyed. Noah found grace. But Noah is still a fallen human being in need of God's mercy.",
          "Ham sees his father's nakedness and tells his brothers. Shem and Japheth respond differently. They cover their father without gazing on his shame. The contrast is about honor, dishonor, and how family members respond to another person's disgrace.",
          "The curse on Canaan must be handled carefully. Genesis says Canaan, not all of Ham's descendants, is cursed. This passage has been horribly misused in history to justify racism and oppression. That use is evil and false. The text is not a license to degrade any people group.",
          "Inside Genesis, the focus moves toward future conflict involving Canaan and the people who will later live in the land of Canaan. The passage is about family consequences and the unfolding biblical story, not about racial hierarchy.",
          "This scene shows that the flood did not remove sin from the human heart. After the rainbow, shame still happens. Dishonor still happens. Family pain still happens.",
          "That keeps Genesis honest.",
          "A new world does not automatically create new hearts.",
          "The Bible is preparing us to see that humanity needs more than survival, more than fresh ground, and more than covenant signs in the sky. Humanity needs redemption that reaches inside.",
        ],
      },
    ],
    finalThought: [
      "Genesis 9 gives one of the Bible's great covenant signs, but it also refuses to hide Noah's weakness.",
      "The rainbow gives hope after judgment, while Noah's failure reminds us the human heart still needs rescue.",
    ],
    pause: [
      "What does the rainbow mean inside Genesis 9?",
      "Why does the image of God make human life sacred?",
      "How does Noah's failure keep the story honest?",
    ],
    lesson:
      "Genesis 9 teaches that God preserves the world by covenant mercy, reaffirms human dignity, restrains violence, and shows that even rescued people still need deeper redemption.",
  },
  {
    chapter: 10,
    title: "The Nations Spread Across the Earth",
    hook: "Genesis 10 may look like another list, but it is the Bible's first wide-angle map of the nations after the flood.",
    setup: [
      "After judgment, covenant, and Noah's family failure, Genesis 10 traces the spreading of peoples through Shem, Ham, and Japheth. The chapter is often called the Table of Nations.",
      "This is not random information. It shows that all nations are connected to the same post-flood family. It also prepares the reader for cities, kingdoms, languages, territories, and eventually the call of Abraham.",
      "Genesis 10 makes the world feel large again.",
    ],
    matters: [
      "It explains the spread of nations after the flood.",
      "It shows the unity of humanity under Noah's family.",
      "It introduces early kingdoms and Nimrod.",
      "It prepares for Babel and Abraham.",
      "It teaches that genealogies can be maps of God's unfolding story.",
    ],
    sections: [
      {
        reference: "Genesis 10:1 to 32",
        title: "The Table of Nations",
        verses: [
          "Genesis 10:1 says these are the generations of the sons of Noah.",
          "Genesis 10:8 says Cush begat Nimrod.",
          "Genesis 10:32 says by these were the nations divided in the earth after the flood.",
        ],
        notes: [
          "Genesis 10 is a genealogy, but it works like a map. It traces peoples, territories, languages, and early powers after the flood.",
          "The chapter begins with Noah's sons: Shem, Ham, and Japheth. Genesis wants readers to understand that the nations are related. Before nations become enemies, empires, neighbors, or threats, they are part of one human family preserved through Noah.",
          "That matters for the whole Bible. Israel's later story happens among nations, but Genesis 10 shows those nations are not outside God's knowledge. God knows their origins. God knows their lands. God knows their languages. God knows their pride and their pain.",
          "The chapter mentions coastlands, peoples, tongues, families, and nations. Those categories show humanity spreading in ordered ways, but the next chapter will show pride and rebellion at Babel.",
          "Nimrod stands out in the chapter. He is described as a mighty one and a mighty hunter before the LORD. His kingdom begins with Babel, Erech, Accad, and Calneh in the land of Shinar.",
          "Nimrod is important because he introduces the theme of organized power after the flood. Cities and kingdoms are not automatically evil, but Genesis is already making us watch power carefully. After a flood caused by violence and corruption, the rise of mighty rulers matters.",
          "Babel appears here before Genesis 11 explains it. That is a storytelling signal. Genesis 10 gives the map; Genesis 11 zooms in on one major rebellion behind the map.",
          "The names in Genesis 10 may feel distant, but many connect to peoples and regions that will matter later in the Old Testament: Egypt, Canaan, Assyria, Babel, Sidon, Philistines, and others.",
          "This means Genesis 10 is not merely ancient trivia. It is foundation work.",
          "The Bible is preparing readers for the world Abraham will enter.",
          "At the end of the chapter, the nations are divided in the earth after the flood. Humanity has spread, but the heart problem has not been solved. The next movement will show people trying to make a name for themselves at Babel.",
          "Genesis 10 should leave us with a wide view of God's world. The flood did not end the human story. It reset it under covenant mercy. Now nations spread, kingdoms rise, and God's plan keeps moving toward a promise that will one day bless all families of the earth.",
        ],
      },
    ],
    finalThought: [
      "Genesis 10 teaches that the nations are not an accident.",
      "The whole world after the flood is known by God, traced by Scripture, and moving toward the promise that will come through Abraham.",
    ],
    pause: [
      "Why does it matter that the nations come from one preserved family?",
      "What does Nimrod teach you about power after the flood?",
      "How does Genesis 10 prepare for Babel and Abraham?",
    ],
    lesson:
      "Genesis 10 teaches that God preserves humanity into nations, sees the rise of peoples and kingdoms, and prepares the stage for the promise that will bless the whole earth.",
  },
];

function buildFloodNotes(chapter: FloodChapterNote) {
  const chapterFlow = chapter.sections.map((section) => `- 📍 ${section.title}`).join("\n");
  const finalThought = chapter.finalThought.map((item) => `- ${item}`).join("\n");
  const pause = chapter.pause.map((item) => `- ${item}`).join("\n");
  const threads = commonFloodThreads.map((item) => `- ${item}`).join("\n");

  return `# Genesis ${chapter.chapter}\n\n# ${chapter.title}\n\n${chapter.hook}\n\n${chapter.setup.join("\n\n")}\n\n## Why Genesis ${chapter.chapter} Matters\n\n${chapter.matters.map((item) => `- ${item}`).join("\n")}\n\n## Flood Story Threads To Keep Watching\n\n${threads}\n\n## Chapter Flow\n\n${chapterFlow}\n\n# Deep Chapter Notes\n\n${chapter.sections.map(buildSection).join("\n\n")}\n\n# The Big Lesson of Genesis ${chapter.chapter}\n\n${chapter.lesson}\n\n# Final Thought on Genesis ${chapter.chapter}\n\n${finalThought}\n\n# Pause and Reflect\n\n${pause}`;
}

export const FLOOD_OF_NOAH_DEEP_NOTES = floodNotes.map(buildFloodNotes);
