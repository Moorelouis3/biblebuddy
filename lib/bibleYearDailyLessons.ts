export type BibleYearLessonVerseBlock = {
  reference: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
};

export type BibleYearLessonSection = {
  heading: string;
  verseBlock: BibleYearLessonVerseBlock;
  teaching: string[];
};

export type BibleYearDailyLesson = {
  dayNumber: number;
  title: string;
  reference: string;
  estimatedListenTime: string;
  opening: string[];
  sections: BibleYearLessonSection[];
  closing: string[];
};

export const GENESIS_DAY_ONE_CREATION_LESSON: BibleYearDailyLesson = {
  dayNumber: 1,
  title: "Creation of the World",
  reference: "Genesis 1-2",
  estimatedListenTime: "18 min",
  opening: [
    "Before there is a nation, before there is a temple, before there is a king, before there is a cross, Genesis opens with God. Not a debate about God. Not a long explanation of where God came from. Just God, already present, already powerful, already speaking.",
    "That matters because the Bible does not begin with human chaos at the center. It begins with God at the center. And if you are coming into this day tired, distracted, overwhelmed, or unsure where your life is headed, Genesis 1 quietly brings you back to the first truth: God is not confused by darkness. God speaks into it.",
    "Today we are walking through Genesis 1 and 2 as one flowing story. We are going to read the Scripture in sections, then pause right there and talk through what is happening. The goal is not to rush. The goal is to feel the beginning of the Bible open up in a way that is clear, beautiful, and easy to follow.",
  ],
  sections: [
    {
      heading: "God Speaks Into the Beginning",
      verseBlock: { reference: "Genesis 1:1-5", chapter: 1, startVerse: 1, endVerse: 5 },
      teaching: [
        "The first sentence is simple, but it is massive: God created the heavens and the earth. The Bible starts by telling us that everything we see, everything we study, everything we love, and everything we wonder about is not random. It comes from God.",
        "Then verse 2 shows the earth as formless, empty, and dark. That is not a throwaway detail. It is the scene God steps into. Before there is beauty, there is disorder. Before there is life, there is emptiness. Before there is sunrise, there is darkness over the deep.",
        "And then God speaks. He does not struggle with the darkness. He does not negotiate with it. He says, Let there be light, and light appears. That is one of the great patterns of Scripture: when God speaks, reality responds.",
        "This is why Genesis 1 feels so comforting. It tells us that darkness is not stronger than God's voice. Confusion is not stronger than God's order. Emptiness is not stronger than God's purpose. The first thing God creates in this story is light, and the first thing He separates is light from darkness.",
        "So already, from the opening lines, Genesis is teaching us how to see the world. God creates. God speaks. God brings order. God names. God sees. And what God sees, He calls good.",
      ],
    },
    {
      heading: "God Forms a World That Can Hold Life",
      verseBlock: { reference: "Genesis 1:6-13", chapter: 1, startVerse: 6, endVerse: 13 },
      teaching: [
        "Now the story slows down and shows God shaping the world into a place where life can flourish. He separates waters. He forms sky. He gathers seas. He brings dry land into view. Then vegetation appears: grass, plants, fruit trees, seeds, and life that can keep multiplying.",
        "This is not just God making things look nice. He is preparing a home. He is making space. He is building a world with structure, rhythm, beauty, and provision. The earth is not treated like an accident. It is treated like a gift.",
        "Notice the repeated phrase: God saw that it was good. That tells us something about the Creator's heart. God is not cold toward the physical world. He delights in what He makes. The land, the seas, the plants, the trees, the fruit, the seed-bearing life, all of it matters to Him.",
        "This also helps us understand why the Bible cares so much about ordinary life. Food matters. work matters. land matters. bodies matter. creation matters. God is not only interested in invisible spiritual things. From the beginning, He creates a physical world and calls it good.",
      ],
    },
    {
      heading: "God Fills the Sky, the Waters, and the Earth",
      verseBlock: { reference: "Genesis 1:14-25", chapter: 1, startVerse: 14, endVerse: 25 },
      teaching: [
        "After forming the spaces, God begins filling them. Lights fill the sky. Birds fill the air. Sea creatures fill the waters. Living creatures fill the land. There is movement now. Sound. Rhythm. Seasons. Days and years. The world is becoming alive.",
        "The sun, moon, and stars are described as lights appointed for signs, seasons, days, and years. That means time itself is being ordered. We are not living in a meaningless blur. The world has rhythm because God gave it rhythm.",
        "Then the waters swarm with living creatures, and birds fly above the earth. God blesses them and tells them to be fruitful and multiply. This is the first blessing spoken over living creatures in Genesis. Life is not just permitted by God. Life is blessed by God.",
        "By the time we reach the land animals, the world is no longer empty. What started as formless and void is now full of light, sky, seas, land, plants, stars, creatures, and motion. God has turned emptiness into abundance.",
        "That is one reason this chapter has so much emotional weight. It is not only telling us what happened at the beginning. It is showing us what God is like. God brings fullness where there was emptiness. God brings movement where there was stillness. God brings life where there was nothing but silence.",
      ],
    },
    {
      heading: "Humanity Is Made in God's Image",
      verseBlock: { reference: "Genesis 1:26-31", chapter: 1, startVerse: 26, endVerse: 31 },
      teaching: [
        "Now the story reaches its first high point. God says, Let us make man in our image, after our likeness. Human beings are not introduced as a mistake, a side project, or another animal with better tools. Humanity is made in the image of God.",
        "That means every person carries a God-given dignity that cannot be erased by status, weakness, age, money, failure, popularity, or pain. Before humans do anything, earn anything, build anything, or prove anything, they are given worth by God.",
        "God creates male and female in His image. Both are included. Both matter. Both reflect something about God into the world. And then God blesses them and gives them a calling: be fruitful, multiply, fill the earth, subdue it, and have dominion.",
        "Dominion here is not permission to destroy. It is a royal responsibility to care for God's world under God's authority. Humanity is meant to represent God in creation, to cultivate what He made, to steward life, and to help the world flourish.",
        "Then God looks at everything He has made and calls it very good. Not just good now. Very good. Creation is full. Humanity is present. The world is blessed. The opening chapter ends with abundance, purpose, dignity, and delight.",
      ],
    },
    {
      heading: "God Rests and Makes the Seventh Day Holy",
      verseBlock: { reference: "Genesis 2:1-3", chapter: 2, startVerse: 1, endVerse: 3 },
      teaching: [
        "Genesis 2 begins by completing the rhythm. The heavens and the earth are finished, and God rests on the seventh day. This does not mean God was tired. God does not rest because He is drained. He rests because the work is complete.",
        "The seventh day is blessed and made holy. That is important. The first thing called holy in the Bible is not a building, not a priest, not a ritual object, but a day. Time with God is woven into creation from the beginning.",
        "This says something our rushed world badly needs to hear: human life was never meant to be nonstop production. Rest is not laziness. Rest is trust. Rest says, I am not God. I do not hold the world together. I receive life from the One who does.",
        "So the creation story does not end with humans working harder. It ends with God inviting creation into rhythm. Work matters, but rest matters too. Purpose matters, but presence matters too. The world is designed for communion with God.",
      ],
    },
    {
      heading: "Genesis 2 Zooms In on the Human Story",
      verseBlock: { reference: "Genesis 2:4-9", chapter: 2, startVerse: 4, endVerse: 9 },
      teaching: [
        "Genesis 2 does not restart the story as a contradiction. It zooms in. Genesis 1 gives us the wide cinematic view of creation. Genesis 2 brings the camera closer and focuses on the human story, the garden, and relationship.",
        "The Lord God forms man from the dust of the ground and breathes into his nostrils the breath of life. That picture is deeply personal. In Genesis 1, God speaks creation into being. Here, God forms and breathes. The Creator is powerful, but He is also near.",
        "Humanity is dust and breath. That is humbling and beautiful at the same time. We are made from the ground, so we are not gods. But we receive the breath of life from God, so we are not meaningless. We are dependent creatures with divine breath.",
        "Then God plants a garden in Eden and places the man there. Again, God is preparing a home. The garden is not pictured as a harsh survival zone. It is beautiful, fruitful, and full of life. God gives humanity a place of provision before giving a command.",
      ],
    },
    {
      heading: "Work, Freedom, and One Boundary",
      verseBlock: { reference: "Genesis 2:10-17", chapter: 2, startVerse: 10, endVerse: 17 },
      teaching: [
        "The garden has rivers, beauty, resources, and abundance. Then God places the man in the garden to cultivate it and keep it. Work is part of the good world before sin enters the story. That means work itself is not a curse. Frustration, thorns, exhaustion, and futility come later, but meaningful work begins in Eden.",
        "God gives freedom before He gives restriction. The man may freely eat from every tree of the garden, except one. Sometimes people imagine God as mainly withholding, but the text shows the opposite. The garden is full of yes before there is one no.",
        "The tree of the knowledge of good and evil introduces trust. Will humanity receive wisdom from God, or try to seize independence from Him? Will they live as creatures under God's word, or define good and evil for themselves?",
        "That question will become central in Genesis 3. But for now, we should feel the goodness of the setup. God gives life, place, work, food, beauty, freedom, and a clear boundary. The boundary is not there to ruin joy. It is there because love and trust are real only when obedience is real.",
      ],
    },
    {
      heading: "It Is Not Good for Man to Be Alone",
      verseBlock: { reference: "Genesis 2:18-25", chapter: 2, startVerse: 18, endVerse: 25 },
      teaching: [
        "For the first time in the creation story, God says something is not good. It is not good for the man to be alone. That line lands differently because everything so far has been called good. The problem is not sin yet. The problem is solitude.",
        "God brings the animals to the man, and the man names them. But no helper comparable to him is found. This builds anticipation. The man is surrounded by living creatures, but none of them correspond to him. He needs someone who is like him and yet distinct from him.",
        "So God causes a deep sleep to fall on the man and forms the woman. When the man sees her, he responds with poetry: This is now bone of my bones, and flesh of my flesh. The first human words recorded in Scripture are not complaint. They are wonder.",
        "The woman is called a helper suitable for him. In modern English, helper can sound lesser, but that is not the idea here. The Bible often uses help language for God Himself. This is about strength, partnership, and correspondence. Humanity is made for relationship.",
        "Genesis 2 ends with the man and his wife naked and not ashamed. That is a picture of innocence, trust, vulnerability, and peace. No hiding. No fear. No pretending. No shame. The story has brought us from darkness to light, from emptiness to fullness, from dust to breath, from solitude to communion.",
        "And that is the world as God made it: good, ordered, blessed, relational, purposeful, and open before Him.",
      ],
    },
  ],
  closing: [
    "So Day 1 is not only about how the world began. It is about who God is and what kind of world He intended. God creates with purpose. God brings order from chaos. God gives dignity to human beings. God blesses life. God gives meaningful work. God gives rest. God creates relationship. And before sin breaks anything, the world is very good.",
    "That is why Genesis 1 and 2 matter so much. They show us the design before the damage. When the rest of the Bible talks about sin, redemption, covenant, Israel, Jesus, new creation, and restored relationship with God, it is reaching back to this beginning.",
    "The Bible starts here because we need to know what we were made for. We were made by God, in God's image, for life with God, in God's world, under God's good word. That is the foundation. Everything else in the story builds from here.",
  ],
};

export const GENESIS_DAY_TWO_FALL_LESSON: BibleYearDailyLesson = {
  dayNumber: 2,
  title: "The Fall of Man",
  reference: "Genesis 3-4",
  estimatedListenTime: "about 15 min",
  opening: [
    "Day 1 showed us the world as God made it.",
    "Good. Ordered. Blessed. Full of life. Full of purpose. No shame. No hiding. No fear.",
    "Day 2 shows us what happens when trust breaks.",
    "Genesis 3 and 4 explain why the world feels the way it does now.",
    "Beautiful, but broken.",
    "Full of life, but marked by death.",
    "Made for relationship, but filled with blame, jealousy, anger, and violence.",
    "This is not just ancient history.",
    "This is the beginning of the human condition.",
  ],
  sections: [
    {
      heading: "The Lie Enters the Garden",
      verseBlock: { reference: "Genesis 3:1-5", chapter: 3, startVerse: 1, endVerse: 5 },
      teaching: [
        "The serpent begins by questioning God's word instead of attacking Him directly.",
        "He makes the command sound unclear and makes God's boundary feel like deprivation.",
        "Eve is surrounded by a garden full of God's generosity, but the serpent draws her attention to the one tree God said not to eat from.",
        "The real temptation is not only about fruit; it is about whether humanity will trust God's wisdom or define good and evil apart from Him.",
        "This is where sin begins to twist the relationship between God and people.",
        "The question underneath the scene is simple and serious: will humans trust what God has said?",
      ],
    },
    {
      heading: "Shame Enters the Story",
      verseBlock: { reference: "Genesis 3:6-7", chapter: 3, startVerse: 6, endVerse: 7 },
      teaching: [
        "The fruit looks good, useful, and desirable, which shows how sin can appear attractive before it destroys.",
        "Eve eats, gives some to Adam, and Adam eats too.",
        "Adam is present in the scene, so he is not innocent or unaware; he is silent and responsible.",
        "Their eyes open, but the result is not freedom like the serpent promised.",
        "They become ashamed, exposed, and afraid.",
        "The first thing humans do after sin is cover themselves, because shame makes people hide what they are afraid someone else will see.",
      ],
    },
    {
      heading: "God Comes Looking",
      verseBlock: { reference: "Genesis 3:8-13", chapter: 3, startVerse: 8, endVerse: 13 },
      teaching: [
        "God asks, Where art thou?, not because He is confused, but because He is drawing Adam out of hiding.",
        "That question is mercy before judgment.",
        "Adam answers with fear, and the God who gave him life is now the God he hides from.",
        "Then blame begins: Adam points to Eve and even hints at blaming God, while Eve points to the serpent.",
        "Nobody simply says, I sinned.",
        "This scene shows that sin does not only break rules; it breaks trust, honesty, and closeness.",
      ],
    },
    {
      heading: "Judgment and the First Promise",
      verseBlock: { reference: "Genesis 3:14-19", chapter: 3, startVerse: 14, endVerse: 19 },
      teaching: [
        "God judges the serpent first, but even that judgment carries hope.",
        "Genesis 3:15 promises conflict between the serpent and the woman, and between their offspring.",
        "The promised seed will be wounded, but the serpent's head will be bruised with a defeating blow.",
        "Before Adam and Eve leave Eden, God is already speaking rescue into the story.",
        "This is the Bible's first major promise that evil will not have the final word.",
        "Christians see this promise pointing forward to Jesus, who is wounded yet defeats sin, death, and the enemy.",
      ],
    },
    {
      heading: "Mercy Outside Eden",
      verseBlock: { reference: "Genesis 3:20-24", chapter: 3, startVerse: 20, endVerse: 24 },
      teaching: [
        "Adam names his wife Eve, a name connected to life, which shows hope even after judgment.",
        "Then God makes garments of skin and clothes them.",
        "Adam and Eve made fig leaves, but God gives a better covering.",
        "They are sent out of Eden, and that is serious, but it also keeps humanity from living forever in a broken state.",
        "The tree of life is guarded and the garden is closed.",
        "Still, the promise remains open, so this is not the end of the story but the beginning of the rescue story.",
      ],
    },
    {
      heading: "Sin Moves Into the Family",
      verseBlock: { reference: "Genesis 4:1-7", chapter: 4, startVerse: 1, endVerse: 7 },
      teaching: [
        "Genesis 4 moves from the garden into the family as Adam and Eve have sons, Cain and Abel.",
        "Both bring offerings, but Cain becomes angry when Abel's offering is received and his is not.",
        "The passage does not explain every detail, but it clearly shows Cain's heart turning bitter.",
        "God warns Cain before the violence happens, giving him a chance to turn back.",
        "Sin is pictured as crouching at the door, ready to master him if he does not resist it.",
        "The murder begins before the field; it begins in Cain's heart.",
      ],
    },
    {
      heading: "The First Murder",
      verseBlock: { reference: "Genesis 4:8-16", chapter: 4, startVerse: 8, endVerse: 16 },
      teaching: [
        "Cain ignores God's warning and kills Abel.",
        "The first recorded death after Eden is not old age, but murder: brother killing brother.",
        "God asks, Where is Abel, your brother?, confronting Cain just as He confronted Adam.",
        "Cain lies and refuses responsibility with the cold question, Am I my brother's keeper?",
        "But Abel's blood cries from the ground, showing that hidden violence is never hidden from God.",
        "Cain is judged, yet God also marks him so revenge does not multiply without limit.",
      ],
    },
    {
      heading: "A Broken World Still Builds",
      verseBlock: { reference: "Genesis 4:17-24", chapter: 4, startVerse: 17, endVerse: 24 },
      teaching: [
        "Cain's line develops cities, livestock work, music, and tools.",
        "That matters because sin does not erase human creativity or ability.",
        "People can still build culture, make beauty, and shape the world.",
        "But the brokenness remains, and Lamech shows it clearly by taking two wives and boasting about violence.",
        "Cain tried to hide murder, but Lamech brags about it.",
        "Genesis shows humanity as gifted and broken, capable of great things and still deeply in need of rescue.",
      ],
    },
    {
      heading: "Hope Keeps Moving",
      verseBlock: { reference: "Genesis 4:25-26", chapter: 4, startVerse: 25, endVerse: 26 },
      teaching: [
        "Genesis 4 does not end with Lamech's violence; it returns to Adam and Eve.",
        "Another son is born, and Eve names him Seth because God has appointed another child.",
        "That matters because Abel is dead and Cain is exiled, but the promise has not died.",
        "Genesis 3 promised the seed of the woman, and Genesis 4 shows hope still moving forward.",
        "Then people begin to call on the name of the Lord.",
        "After shame, exile, murder, and violence, worship still rises because God is not gone.",
      ],
    },
  ],
  closing: [
    "The Fall of Man explains why the world feels so painful.",
    "Sin attacks trust.",
    "Shame makes people hide.",
    "Blame breaks relationships.",
    "Anger becomes violence.",
    "Violence enters families.",
    "Culture grows, but corruption grows with it.",
    "And yet God does not abandon the story.",
    "He comes looking.",
    "He asks questions.",
    "He gives warning.",
    "He covers shame.",
    "He limits revenge.",
    "He gives another son.",
    "He keeps hope alive.",
    "The garden is closed.",
    "But the promise is open.",
    "The serpent wounds.",
    "But the seed will crush.",
    "Evil will not win forever.",
    "That is what Day 2 teaches us.",
    "The world is more broken than we want to admit.",
    "But God is more faithful than we know.",
  ],
};

export const GENESIS_DAY_THREE_NOAH_ARK_LESSON: BibleYearDailyLesson = {
  dayNumber: 3,
  title: "Noah Builds the Ark",
  reference: "Genesis 5-7",
  estimatedListenTime: "about 15 min",
  opening: [
    "Day 1 showed the world as God made it: good, ordered, blessed, full of life, and without shame.",
    "Day 2 showed what happened when trust broke. Sin entered. Shame followed. Blame spread. Violence began.",
    "Now Day 3 shows what happens when that brokenness spreads through generations.",
    "Genesis 5 through 7 is not just a flood story. It is a story about death, corruption, warning, obedience, judgment, and mercy. And right in the middle of it all stands Noah, a man who walked with God when the world around him was falling apart.",
  ],
  sections: [
    {
      heading: "Death Moves Through the Generations",
      verseBlock: { reference: "Genesis 5:1-5", chapter: 5, startVerse: 1, endVerse: 5 },
      teaching: [
        "Genesis 5 begins like a genealogy: a list of names, fathers, sons, and years. But it is not filler. It is showing what life looks like after Eden.",
        "People are still made in God's image. Families still grow. Children are still born. The blessing of life is still moving. But something else is moving too: death.",
        "Verse 1 reaches back to creation. God made humanity in His likeness. That matters because even after sin, human life still has dignity. The flood story is not about God destroying something worthless.",
        "But verse 3 says Adam has a son in his own likeness, after his image. The image of God continues through the family line, but Adam's fallen condition is also now part of human history. People are valuable, and people are wounded.",
        "Adam lives nine hundred thirty years, but Genesis does not end his life by celebrating the number. It ends with: then he died. God warned in Eden that sin would bring death. Now death is entering the family record.",
      ],
    },
    {
      heading: "Seth's Line Keeps Moving",
      verseBlock: { reference: "Genesis 5:6-20", chapter: 5, startVerse: 6, endVerse: 20 },
      teaching: [
        "This section repeats the same rhythm: he lived, he fathered, he had sons and daughters, then he died. Again and again.",
        "That repetition is supposed to be felt. Genesis is letting death ring like a bell through the generations.",
        "Ancient genealogies preserved memory. They told people where they came from and showed how a family line continued. In Genesis, they also show how God is still carrying the story forward.",
        "Cain's line in Genesis 4 moved toward violence and pride. Now Genesis follows Seth's line toward Noah. That does not mean every person in Seth's line is perfect. It means this is the line Genesis wants us to watch.",
        "Nothing dramatic happens here. No murder. No fire. No flood yet. Just family records. But brokenness is not always loud. Sometimes it looks ordinary: birthdays, children, aging, funerals, family history.",
      ],
    },
    {
      heading: "Enoch Walked With God",
      verseBlock: { reference: "Genesis 5:21-24", chapter: 5, startVerse: 21, endVerse: 24 },
      teaching: [
        "Enoch interrupts the chapter. By now, we expect the same ending: then he died. But Enoch's ending is different. Genesis says Enoch walked with God, and then God took him.",
        "Walking with God means nearness, fellowship, trust, direction, and a life moving with God instead of away from Him.",
        "It does not mean Enoch was sinless. It means his life was marked by closeness to God.",
        "That matters because the world is darkening. Death is spreading. Sin is spreading. But Enoch shows that a person can still walk with God in a broken world.",
        "This prepares us for Noah. Genesis 6 will say Noah also walked with God. Before we see Noah obey in a corrupt generation, Genesis shows Enoch walking with God in a dying one.",
      ],
    },
    {
      heading: "Noah Is Born Into a Tired World",
      verseBlock: { reference: "Genesis 5:25-32", chapter: 5, startVerse: 25, endVerse: 32 },
      teaching: [
        "Methuselah is known for the longest lifespan recorded in Scripture. But Genesis still ends his life the same way: then he died. Even the longest human life is not eternal life.",
        "Then Noah is born, and his father names him with hope. Noah's name is connected to comfort, rest, or relief.",
        "Lamech says Noah will comfort them in their work and toil because of the cursed ground. That reaches all the way back to Genesis 3.",
        "After Adam sinned, the ground was cursed. Work became painful. The earth resisted. Life became tiring. Generations later, Lamech is still feeling it.",
        "Noah will not remove the curse completely. Only God can do that. But Noah's life will become a turning point. Through Noah, God will preserve life through judgment.",
        "Genesis 5 ends by naming Noah's sons: Shem, Ham, and Japheth. These names matter because the world after the flood will come through them. The death chapter ends with Noah, and the judgment story is about to begin.",
      ],
    },
    {
      heading: "The Earth Becomes Corrupt",
      verseBlock: { reference: "Genesis 6:1-8", chapter: 6, startVerse: 1, endVerse: 8 },
      teaching: [
        "Genesis 6 opens with difficult language: the sons of God, the daughters of men, the Nephilim, and mighty men of old.",
        "Bible readers have understood this in different ways. Some believe the sons of God refers to rebellious heavenly beings. Some believe it refers to powerful rulers. Some believe it refers to Seth's line mixing with Cain's line.",
        "We do not need to pretend the passage is simple. But we also should not miss the main point. Genesis is not trying to satisfy curiosity. Genesis is showing corruption.",
        "Verse 5 goes straight to the center. Human wickedness is great, and every imagination of the human heart is only evil continually. That is deep corruption. Not just bad actions, but bad desires, bad thoughts, bad intentions, and a heart turned away from God.",
        "This is one of the most emotional lines in early Genesis: God is grieved in His heart. He is not cold toward evil. He is not detached. Violence matters to Him. Corruption matters to Him. The pain of creation matters to Him.",
        "Then verse 8 breaks through: Noah found favor in Yahweh's eyes. Noah is not introduced as a superhero. He is a man who receives favor from God. Grace appears before the ark is built. Mercy appears before the rain falls.",
      ],
    },
    {
      heading: "Noah Walked With God",
      verseBlock: { reference: "Genesis 6:9-13", chapter: 6, startVerse: 9, endVerse: 13 },
      teaching: [
        "Noah walked with God. That connects him to Enoch. Noah lives in a corrupt generation, but he does not move with the crowd. He moves with God.",
        "The world around him is violent. The culture around him is corrupt. But Noah's direction is different.",
        "When Genesis calls Noah righteous and blameless, it does not mean sinless. The Bible will later show Noah's weakness too. But compared to his generation, Noah is marked by integrity. He listens. He trusts. He obeys.",
        "The earth is not only sinful in private. It is filled with violence. Sin has become public, social, and dangerous.",
        "The same sin that began with distrust in the garden and murder in Cain's field has spread across the earth. A question in Eden becomes blood in a field. Blood in a field becomes violence filling the world.",
      ],
    },
    {
      heading: "God Commands the Ark",
      verseBlock: { reference: "Genesis 6:14-22", chapter: 6, startVerse: 14, endVerse: 22 },
      teaching: [
        "God does not only tell Noah judgment is coming. He gives instructions: build the ark, use wood, make rooms, seal it with pitch, add a door, make levels, and gather food.",
        "Noah's faith becomes practical. Boards. Measurements. Labor. Time. Sweat. Construction.",
        "A cubit was an ancient measurement based roughly on the distance from elbow to fingertip. The ark is massive. This is not a cute little boat. It is a rescue vessel, a survival structure, a place of preservation through judgment.",
        "God says: I will establish my covenant with you. Before the flood arrives, God speaks covenant. Before judgment falls, God speaks preservation. God is not only ending corruption. He is preserving life.",
        "Genesis 6 ends with Noah doing all that God commanded. Noah obeys before the sky changes, before rain starts, before people understand, before danger is visible. That is faith. Faith is building because God spoke.",
      ],
    },
    {
      heading: "Entering The Ark",
      verseBlock: { reference: "Genesis 7:1-10", chapter: 7, startVerse: 1, endVerse: 10 },
      teaching: [
        "God says: come with all of your household into the ship. That word feels personal. God is inviting Noah into the place of rescue.",
        "The ark is not Noah's escape plan. It is God's provided refuge.",
        "Noah enters with his family. His obedience affects more than himself. Sometimes one person's faithfulness becomes shelter for others.",
        "Genesis mentions clean and unclean animals before the law of Moses. That can surprise people. But it shows that worship categories already existed in some form. Clean animals will matter after the flood because Noah will offer sacrifice.",
        "Noah enters the ark before the flood comes. Then seven days pass. Inside the ark. Door closed. No rain yet. No flood yet. Just waiting. Faith often has a waiting room.",
      ],
    },
    {
      heading: "The Flood Begins",
      verseBlock: { reference: "Genesis 7:11-17", chapter: 7, startVerse: 11, endVerse: 17 },
      teaching: [
        "The flood does not come only from rain. Genesis says the fountains of the deep burst open and the windows of heaven open.",
        "This feels like creation boundaries being released. Genesis 1 showed God ordering the waters so life could flourish. Genesis 7 shows the waters overwhelming the world because the world has become corrupt.",
        "The flood feels like an undoing.",
        "Then comes one of the most powerful lines in the story: Yahweh shut him in.",
        "That line is tender and terrifying. Tender because God secures Noah inside the ark. Terrifying because the door is now closed. The time for building is over. The time for warning is over. Judgment has begun.",
      ],
    },
    {
      heading: "The Waters Take Over The Earth",
      verseBlock: { reference: "Genesis 7:17-24", chapter: 7, startVerse: 17, endVerse: 24 },
      teaching: [
        "The same waters that judge the world lift the ark. That is one of the deepest pictures in the chapter.",
        "Outside the ark, the waters destroy. Inside the ark, the waters carry. The difference is the refuge God provided.",
        "Genesis 7 is heavy. This is not just animals and a boat. This is judgment. The chapter says living things outside the ark die.",
        "The Bible does not treat sin lightly.",
        "But the ark remains. Noah remains. His family remains. The animals inside remain. God preserves life through judgment. The flood is terrifying, but it is not the end of the story.",
      ],
    },
  ],
  closing: [
    "Noah Builds the Ark is not just about a man building a boat. It is about faith in a corrupt generation.",
    "Genesis 5 shows death moving through generations. Genesis 6 shows corruption filling the earth. Genesis 7 shows the flood beginning.",
    "But through all of it, God preserves a man who walks with Him.",
    "Noah obeys before the sky changes. He builds before rain starts. He trusts before everyone understands. And when judgment rises, the safest place is inside what God has provided.",
    "God sees corruption clearly. God judges evil seriously. God preserves life mercifully. Noah teaches us that obedience before proof is still faith.",
  ],
};

export const GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON: BibleYearDailyLesson = {
  dayNumber: 4,
  title: "Life After the Flood",
  reference: "Genesis 8-10",
  estimatedListenTime: "about 16 min",
  opening: [
    "Day 4 begins with one of the most comforting lines in the flood story: God remembered Noah.",
    "Genesis 8 through 10 moves from water to dry ground, from waiting to worship, from covenant to rainbow, and from one rescued family to the nations.",
  ],
  sections: [
    {
      heading: "The Waters Recede",
      verseBlock: { reference: "Genesis 8:1-3", chapter: 8, startVerse: 1, endVerse: 3 },
      teaching: [
        "God remembered Noah, which means He turned toward Noah with rescuing action.",
        "The flood begins to reverse as the wind passes over the earth and the waters start to subside.",
        "The story shifts from judgment toward restoration and hope.",
      ],
    },
    {
      heading: "The Ark Rests On Ararat",
      verseBlock: { reference: "Genesis 8:4-5", chapter: 8, startVerse: 4, endVerse: 5 },
      teaching: [
        "The ark comes to rest after months of drifting, but Noah still has to wait.",
        "Moses records the exact timing to show God's precision through the flood.",
        "The mountain tops appear gradually as restoration unfolds step by step.",
      ],
    },
    {
      heading: "The Raven And The Dove",
      verseBlock: { reference: "Genesis 8:6-14", chapter: 8, startVerse: 6, endVerse: 14 },
      teaching: [
        "Noah tests the earth carefully by sending out the raven and the dove.",
        "The olive leaf becomes the first visible sign that life is returning.",
        "Even after seeing progress, Noah keeps waiting for God's timing.",
      ],
    },
    {
      heading: "Leaving The Ark",
      verseBlock: { reference: "Genesis 8:15-19", chapter: 8, startVerse: 15, endVerse: 19 },
      teaching: [
        "God finally tells Noah it is time to leave after more than a year in the ark.",
        "The same family and creatures who entered the ark now step into a renewed world.",
        "Life begins again as God commands humanity and the animals to multiply.",
      ],
    },
    {
      heading: "Noah's Sacrifice",
      verseBlock: { reference: "Genesis 8:20-22", chapter: 8, startVerse: 20, endVerse: 22 },
      teaching: [
        "Noah's first recorded action after leaving the ark is worship.",
        "He builds an altar and offers burnt offerings from the clean animals and birds.",
        "God promises that the rhythms of creation will continue while the earth remains.",
      ],
    },
    {
      heading: "God Blesses Noah",
      verseBlock: { reference: "Genesis 9:1-7", chapter: 9, startVerse: 1, endVerse: 7 },
      teaching: [
        "God blesses Noah and his sons for the new world after the flood.",
        "He repeats the command to be fruitful, multiply, and fill the earth.",
        "God also teaches that human life is sacred because people bear His image.",
      ],
    },
    {
      heading: "God's Covenant With Noah",
      verseBlock: { reference: "Genesis 9:8-11", chapter: 9, startVerse: 8, endVerse: 11 },
      teaching: [
        "God establishes a lasting covenant with Noah, his descendants, and every living creature.",
        "He promises that a worldwide flood will never again destroy all flesh.",
        "This covenant gives peace about the future after judgment.",
      ],
    },
    {
      heading: "The Rainbow",
      verseBlock: { reference: "Genesis 9:12-19", chapter: 9, startVerse: 12, endVerse: 19 },
      teaching: [
        "God gives the rainbow as the visible sign of His covenant.",
        "The rainbow appears in the clouds as a reminder of mercy after judgment.",
        "It assures Noah that another worldwide flood will never come.",
      ],
    },
    {
      heading: "Noah Gets Drunk",
      verseBlock: { reference: "Genesis 9:20-24", chapter: 9, startVerse: 20, endVerse: 24 },
      teaching: [
        "Noah settles into ordinary life, plants a vineyard, and becomes drunk.",
        "His shame is exposed, and Ham responds differently than Shem and Japheth.",
        "The flood ended, but sin was still present in the human heart.",
      ],
    },
    {
      heading: "Canaan Cursed",
      verseBlock: { reference: "Genesis 9:25-29", chapter: 9, startVerse: 25, endVerse: 29 },
      teaching: [
        "Noah speaks words over Canaan, Shem, and Japheth that look far into the future.",
        "Shem's line carries the blessing that will move toward Abraham and ultimately Jesus.",
        "Even Noah dies, reminding us that the world still needs deeper rescue.",
      ],
    },
    {
      heading: "Noah's Descendants",
      verseBlock: { reference: "Genesis 10:1", chapter: 10, startVerse: 1, endVerse: 1 },
      teaching: [
        "Genesis 10 explains how the world began filling again after the flood.",
        "The story now shifts from Noah himself to the nations that came from his sons.",
      ],
    },
    {
      heading: "Japheth's Descendants",
      verseBlock: { reference: "Genesis 10:2-5", chapter: 10, startVerse: 2, endVerse: 5 },
      teaching: [
        "Japheth's descendants spread into coastlands, territories, and early nations.",
        "Moses is showing that peoples, places, and languages all grew from real family lines.",
      ],
    },
    {
      heading: "The Sons of Ham",
      verseBlock: { reference: "Genesis 10:6-11", chapter: 10, startVerse: 6, endVerse: 11 },
      teaching: [
        "Ham's line introduces Cush, Mizraim, Put, Canaan, and Nimrod's early kingdom.",
        "Babel first appears here, showing human power and civilization beginning to rise again after the flood.",
      ],
    },
    {
      heading: "The Sons of Ham Continued",
      verseBlock: { reference: "Genesis 10:12-20", chapter: 10, startVerse: 12, endVerse: 20 },
      teaching: [
        "The rest of Ham's line includes Assyria's cities, Egypt's peoples, the Philistines, and the Canaanite tribes.",
        "These names matter because they return throughout the Old Testament as major nations and places.",
      ],
    },
    {
      heading: "The Sons of Shem",
      verseBlock: { reference: "Genesis 10:21-32", chapter: 10, startVerse: 21, endVerse: 32 },
      teaching: [
        "Shem's family line matters because it leads toward Eber, Abraham, Israel, and ultimately Jesus.",
        "Genesis 10 ends by preparing the way for Babel in Genesis 11 and Abram in Genesis 12.",
      ],
    },
  ],
  closing: [
    "God remembers Noah, the waters recede, the ark rests, and the dove brings back an olive leaf.",
    "Noah waits for God's word, leaves the ark, and worships after rescue.",
    "God gives the rainbow as a covenant sign.",
    "The flood did not end God's purpose. It preserved the world for the next movement of the promise.",
  ],
};

export const GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON: BibleYearDailyLesson = {
  dayNumber: 5,
  title: "The Obedience of Abraham",
  reference: "Genesis 11-13",
  estimatedListenTime: "about 16 min",
  opening: [
    "Day 5 begins the story of Abraham.",
    "Genesis 11 through 13 moves from Babel's pride to Abram's call, from unfinished family history to obedient movement, and from grasping for control to trusting God's promise.",
    "Abram is not introduced as perfect. He obeys, stumbles, returns to worship, and learns that God's promise does not need to be protected by selfishness.",
  ],
  sections: [
    {
      heading: "The Tower of Babel",
      verseBlock: { reference: "Genesis 11:1-9", chapter: 11, startVerse: 1, endVerse: 9 },
      teaching: [
        "Babel is humanity trying to build security without surrender.",
        "They want a city, a tower, and a name for themselves.",
        "That matters because Genesis 12 will answer Babel with God's promise to Abram: I will make thy name great.",
        "Human pride gathers and grasps. God's promise calls and gives.",
      ],
    },
    {
      heading: "From Shem to Abram",
      verseBlock: { reference: "Genesis 11:10-26", chapter: 11, startVerse: 10, endVerse: 26 },
      teaching: [
        "After Babel scatters humanity, Genesis narrows the camera to Shem's family line.",
        "These names carry the story toward Abram.",
        "The genealogy follows the promise line from Shem through Terah to Abram.",
      ],
    },
    {
      heading: "Terah's Family",
      verseBlock: { reference: "Genesis 11:27-30", chapter: 11, startVerse: 27, endVerse: 30 },
      teaching: [
        "Terah's family introduces Abram, Sarai, Nahor, Haran, and Lot.",
        "Sarai's barrenness creates the human impossibility that God's promise will answer.",
      ],
    },
    {
      heading: "Terah Moves To Haran",
      verseBlock: { reference: "Genesis 11:31-32", chapter: 11, startVerse: 31, endVerse: 32 },
      teaching: [
        "Terah leads the family away from Ur toward Canaan, but the journey stops in Haran.",
        "Genesis 11 ends with Terah's death and prepares for God's call to Abram.",
      ],
    },
    {
      heading: "God Calls Abram",
      verseBlock: { reference: "Genesis 12:1-3", chapter: 12, startVerse: 1, endVerse: 3 },
      teaching: [
        "God calls Abram to leave country, kindred, and his father's house.",
        "The command is costly, but it comes with promise.",
        "God promises land, nation, blessing, a great name, and blessing for all families of the earth.",
        "This is the beginning of the promise story that will eventually lead to Jesus.",
      ],
    },
    {
      heading: "Abram Enters Canaan",
      verseBlock: { reference: "Genesis 12:4-9", chapter: 12, startVerse: 4, endVerse: 9 },
      teaching: [
        "Abram departs as the LORD had spoken.",
        "He does not have the whole map. He has God's word.",
        "When he reaches Canaan, God repeats the land promise, and Abram builds an altar.",
        "Obedience and worship belong together in Abram's story.",
      ],
    },
    {
      heading: "Abram's Fear In Egypt",
      verseBlock: { reference: "Genesis 12:10-16", chapter: 12, startVerse: 10, endVerse: 16 },
      teaching: [
        "Famine tests Abram almost immediately after obedience.",
        "In Egypt, fear takes over, and Abram tells Sarai to say she is his sister.",
        "The Bible is honest: Abram is chosen, but still afraid.",
      ],
    },
    {
      heading: "God Rescues Sarai",
      verseBlock: { reference: "Genesis 12:17-20", chapter: 12, startVerse: 17, endVerse: 20 },
      teaching: [
        "God protects Sarai and preserves the promise even when Abram fails.",
      ],
    },
    {
      heading: "Abram Returns Home",
      verseBlock: { reference: "Genesis 13:1-4", chapter: 13, startVerse: 1, endVerse: 4 },
      teaching: [
        "Abram comes back from Egypt to the place of the altar.",
        "That feels like a reset after fear.",
        "But blessing brings a new test: Abram and Lot have too many flocks and herds for the land to hold them together.",
        "Sometimes faith is tested by pressure, and sometimes it is tested by abundance.",
      ],
    },
    {
      heading: "Abram And Lot Separate",
      verseBlock: { reference: "Genesis 13:5-13", chapter: 13, startVerse: 5, endVerse: 13 },
      teaching: [
        "Abram chooses peace and lets Lot pick first.",
        "Lot lifts up his eyes and chooses what looks best.",
        "But the well-watered plain is close to Sodom.",
        "Genesis is warning us that what looks good can still move a person toward danger.",
      ],
    },
    {
      heading: "God Renews His Promise To Abram",
      verseBlock: { reference: "Genesis 13:14-18", chapter: 13, startVerse: 14, endVerse: 18 },
      teaching: [
        "After Lot separates from Abram, God tells Abram to lift up his eyes.",
        "Lot looked and chose for himself. Abram looks and receives what God promises.",
        "God repeats the promise of land and descendants.",
        "Abram moves his tent and builds another altar. Faith can let go because God has already spoken.",
      ],
    },
  ],
  closing: [
    "Day 5 shows that obedience begins with God's word.",
    "Babel tries to make a name, but God promises to make Abram's name great.",
    "Abram follows, fails, returns to worship, and learns to trust God enough to let Lot choose first.",
    "The promise is not held together by Abram's perfection.",
    "It is held together by God's faithfulness.",
  ],
};

export const GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON: BibleYearDailyLesson = {
  dayNumber: 6,
  title: "The Rescue of Lot",
  reference: "Genesis 14-15",
  estimatedListenTime: "about 16 min",
  opening: [
    "Day 6 moves Abram from tents and altars into kings, war, rescue, worship, and covenant.",
    "Genesis 14 shows Abram acting with courage when Lot is taken captive. Genesis 15 shows Abram standing before God with honest questions about the promise.",
    "This day matters because faith is not only seen when Abram leaves home. Faith is also seen when he rescues, refuses compromise, believes God's word, and receives covenant assurance in the dark.",
  ],
  sections: [
    {
      heading: "The War Of The Kings",
      verseBlock: { reference: "Genesis 14:1-11", chapter: 14, startVerse: 1, endVerse: 11 },
      teaching: [
        "Genesis 14 opens with a world of kings, alliances, rebellion, and war.",
        "The fighting eventually reaches Sodom, where Lot has settled.",
        "Lot is taken captive with the goods of Sodom.",
        "Genesis is showing us that Lot's direction in Genesis 13 now has consequences in Genesis 14. What looked good by sight has placed him near danger.",
      ],
    },
    {
      heading: "Abram Rescues Lot",
      verseBlock: { reference: "Genesis 14:12-17", chapter: 14, startVerse: 12, endVerse: 17 },
      teaching: [
        "When Abram hears that Lot has been captured, he does not pretend it is not his problem.",
        "He gathers trained servants from his own household and pursues the enemy.",
        "Abram's faith is not passive. It becomes courageous action for the sake of another person.",
        "He brings back Lot, the people, and the goods. Grace moves toward the person who got too close to Sodom.",
      ],
    },
    {
      heading: "Melchizedek Blesses Abram",
      verseBlock: { reference: "Genesis 14:18-24", chapter: 14, startVerse: 18, endVerse: 24 },
      teaching: [
        "After the rescue, Melchizedek appears as king of Salem and priest of the Most High God.",
        "He brings bread and wine, blesses Abram, and blesses God Most High who delivered Abram's enemies into his hand.",
        "This keeps Abram's victory in the right place. Abram fought, but God delivered.",
        "Abram gives Melchizedek a tenth of everything, recognizing that his strength and victory belong under God's authority.",
      ],
    },
    {
      heading: "Abram Has A Vision",
      verseBlock: { reference: "Genesis 15:1-3", chapter: 15, startVerse: 1, endVerse: 3 },
      teaching: [
        "After these things, God's word comes to Abram in a vision.",
        "God says, Fear not, Abram: I am thy shield, and thy exceeding great reward.",
        "Abram is honest about the unresolved ache: he still has no child.",
        "God takes him outside, points him to the stars, and repeats the promise. Abram believes the LORD, and God counts it to him for righteousness.",
      ],
    },
    {
      heading: "Abram Is Promised An Heir",
      verseBlock: { reference: "Genesis 15:4-6", chapter: 15, startVerse: 4, endVerse: 6 },
      teaching: [
        "God promises that Abram's heir will come from his own body.",
        "God points Abram toward the stars and promises descendants beyond counting.",
        "Abram believes the LORD, and God counts his faith as righteousness.",
      ],
    },
    {
      heading: "The Covenant Renewed",
      verseBlock: { reference: "Genesis 15:7-11", chapter: 15, startVerse: 7, endVerse: 11 },
      teaching: [
        "God reminds Abram that He brought him out of Ur to give him the land.",
        "Abram asks, Whereby shall I know that I shall inherit it?",
        "This question is not treated as rebellion. God answers by preparing a covenant ceremony.",
        "Abram lays out the animals and drives away the birds. The promise is being confirmed, but he must still wait in faith.",
      ],
    },
    {
      heading: "Abram's Deep Sleep And Vision",
      verseBlock: { reference: "Genesis 15:12-21", chapter: 15, startVerse: 12, endVerse: 21 },
      teaching: [
        "As the sun goes down, a deep sleep falls on Abram, and great darkness comes over him.",
        "God tells Abram that his descendants will be strangers in a land that is not theirs and will be afflicted for four hundred years.",
        "The promise is real, but the road will not be easy or instant.",
        "God also promises judgment on the oppressing nation, future deliverance, and Abram's own peace. The covenant includes both suffering and rescue.",
      ],
    },
  ],
  closing: [
    "Day 6 shows faith under pressure.",
    "Abram rescues Lot with courage, receives blessing from Melchizedek, refuses to let Sodom define his success, and then brings his honest questions to God.",
    "Genesis 15 teaches that faith is not pretending there are no questions.",
    "Faith hears God's word, believes God's promise, and rests in God's covenant even when the fulfillment is still ahead.",
    "Abram's shield, reward, righteousness, descendants, land, and future are all held by the Lord.",
  ],
};

export const GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON: BibleYearDailyLesson = {
  dayNumber: 7,
  title: "The Covenant Promise",
  reference: "Genesis 16-17",
  estimatedListenTime: "about 14 min",
  opening: [
    "Day 7 moves through one of the most honest stretches in Abraham's story.",
    "Genesis 16 shows what happens when waiting turns into control. Sarai, Abram, and Hagar are pulled into a painful human shortcut.",
    "Genesis 17 answers that pain with covenant clarity. God gives Abram and Sarai new names, marks the covenant, and names Isaac before the promise is visible.",
  ],
  sections: [
    {
      heading: "Abram Marries Hagar",
      verseBlock: { reference: "Genesis 16:1-6", chapter: 16, startVerse: 1, endVerse: 6 },
      teaching: [
        "Sarai has no child, and the waiting has become heavy.",
        "Instead of waiting on God's promise, she tries to solve the problem through Hagar.",
        "Abram listens, and the household steps into a plan God never commanded.",
        "The shortcut looks practical, but it is already moving away from trust.",
      ],
    },
    {
      heading: "Hagar Meets The Angel Of The LORD",
      verseBlock: { reference: "Genesis 16:7-14", chapter: 16, startVerse: 7, endVerse: 14 },
      teaching: [
        "Hagar runs into the wilderness, but she is not invisible to God.",
        "The angel of the LORD finds her by a fountain of water.",
        "God asks where she came from and where she is going, giving dignity to a woman others have mistreated.",
        "Her son is named Ishmael because the LORD has heard her affliction.",
      ],
    },
    {
      heading: "The Birth Of Ishmael",
      verseBlock: { reference: "Genesis 16:15-16", chapter: 16, startVerse: 15, endVerse: 16 },
      teaching: [
        "Hagar names the LORD as the God who sees her.",
        "That is one of the most tender moments in Abraham's story.",
        "Before the covenant sign appears in Genesis 17, God reveals that He sees the person wounded by the shortcut.",
        "Ishmael is born, and Abram is eighty-six years old. The promise is still waiting.",
      ],
    },
    {
      heading: "Abram Becomes Abraham",
      verseBlock: { reference: "Genesis 17:1-8", chapter: 17, startVerse: 1, endVerse: 8 },
      teaching: [
        "Thirteen years pass before Genesis 17 begins.",
        "God appears to Abram as Almighty God and calls him to walk before Him.",
        "Then God changes Abram's name to Abraham, father of many nations.",
        "The name change is not based on what Abraham can see yet. It is based on what God has promised.",
      ],
    },
    {
      heading: "The Covenant Sign",
      verseBlock: { reference: "Genesis 17:9-14", chapter: 17, startVerse: 9, endVerse: 14 },
      teaching: [
        "God gives circumcision as the sign of the covenant.",
        "The covenant is not just an idea Abraham thinks about. It is marked into the life of the household.",
        "Every generation is called to remember that this family belongs to God's promise.",
        "The sign is serious because the covenant is serious.",
      ],
    },
    {
      heading: "Sarah and Isaac Are Named",
      verseBlock: { reference: "Genesis 17:15-22", chapter: 17, startVerse: 15, endVerse: 22 },
      teaching: [
        "God changes Sarai's name to Sarah and speaks blessing over her.",
        "Then God names the promised son before he is born: Isaac.",
        "Abraham laughs and asks that Ishmael might live before God, and God graciously promises blessing for Ishmael too.",
        "But the covenant line will go through Isaac, the son God promised.",
      ],
    },
    {
      heading: "Abraham Obeys That Same Day",
      verseBlock: { reference: "Genesis 17:23-27", chapter: 17, startVerse: 23, endVerse: 27 },
      teaching: [
        "Abraham responds to God's word with obedience that same day.",
        "He circumcises Ishmael and every male in his household.",
        "Faith is not only waiting and believing. Faith also responds when God gives a clear command.",
        "Genesis 17 ends with the promise marked on Abraham's house while Isaac is still unseen.",
      ],
    },
  ],
  closing: [
    "Day 7 shows the danger of trying to force what God promised to give.",
    "Genesis 16 is painful because control wounds real people, but it also reveals the God who sees the wounded.",
    "Genesis 17 brings covenant clarity after years of waiting. God gives new names, a covenant sign, and the promise of Isaac.",
    "The promise is not carried by human shortcuts.",
    "It is carried by God's covenant faithfulness.",
  ],
};

export const GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON: BibleYearDailyLesson = {
  dayNumber: 8,
  title: "Sodom and Gomorrah",
  reference: "Genesis 18-20",
  estimatedListenTime: "about 22 min",
  opening: [
    "Day 8 brings together promise, prayer, mercy, judgment, and God's protection of the covenant promise.",
    "Genesis 18 shows Abraham receiving visitors, Sarah hearing the promise again, and Abraham standing before the Lord in intercession.",
    "Genesis 19 is heavy. It shows Sodom and Gomorrah, Lot's compromised position, mercy pulling him out, and judgment falling on cities that refused righteousness.",
    "Genesis 20 then shows Abraham repeating an old fear in Gerar, but God still protects Sarah and preserves the promise before Isaac is born.",
  ],
  sections: [
    {
      heading: "Abraham Welcomes the Visitors",
      verseBlock: { reference: "Genesis 18:1-8", chapter: 18, startVerse: 1, endVerse: 8 },
      teaching: [
        "Abraham is sitting in the heat of the day when the LORD appears to him.",
        "He sees three visitors and runs to welcome them with water, rest, bread, and a meal.",
        "This is more than politeness. Abraham's tent becomes a place of holy attention.",
        "Genesis shows promise being spoken in the ordinary space of hospitality.",
      ],
    },
    {
      heading: "Sarah Hears the Promise",
      verseBlock: { reference: "Genesis 18:9-15", chapter: 18, startVerse: 9, endVerse: 15 },
      teaching: [
        "The visitors ask where Sarah is, and the promise becomes personal again.",
        "Sarah hears that she will have a son, and she laughs within herself.",
        "God answers the hidden laugh with a question: Is any thing too hard for the LORD?",
        "This is not cruelty toward Sarah. It is an invitation to bring impossible waiting under God's power.",
      ],
    },
    {
      heading: "The Lord Looks Toward Sodom",
      verseBlock: { reference: "Genesis 18:16-21", chapter: 18, startVerse: 16, endVerse: 21 },
      teaching: [
        "The men rise and look toward Sodom, and Abraham walks with them.",
        "God lets Abraham into the conversation about what is coming.",
        "The cry of Sodom and Gomorrah is great, and their sin is very grievous.",
        "Judgment in Genesis is not random anger. God sees, knows, and judges what is truly evil.",
      ],
    },
    {
      heading: "Abraham Intercedes",
      verseBlock: { reference: "Genesis 18:22-33", chapter: 18, startVerse: 22, endVerse: 33 },
      teaching: [
        "Abraham stands before the LORD and draws near with reverent boldness.",
        "He asks whether the Judge of all the earth will do right.",
        "His prayer keeps moving from fifty righteous down to ten.",
        "Abraham does not command God, but he does plead for mercy. Closeness with God makes him both humble and bold.",
      ],
    },
    {
      heading: "Sodom's Violence Is Exposed",
      verseBlock: { reference: "Genesis 19:1-11", chapter: 19, startVerse: 1, endVerse: 11 },
      teaching: [
        "Two angels arrive in Sodom, and Lot is sitting in the gate.",
        "The city quickly reveals its heart through violence, pressure, and wicked desire.",
        "Lot tries to protect the visitors, but his household is already inside a dangerous place.",
        "Genesis is warning us that a life can become deeply entangled with a city it cannot heal.",
      ],
    },
    {
      heading: "Mercy Pulls Lot Out",
      verseBlock: { reference: "Genesis 19:12-22", chapter: 19, startVerse: 12, endVerse: 22 },
      teaching: [
        "The angels tell Lot to bring out anyone he has in the city.",
        "Lot warns his sons-in-law, but they think he is joking.",
        "Even when morning comes, Lot lingers.",
        "The angels take him by the hand because the LORD is merciful. Sometimes mercy has to pull us away from what we are still too attached to.",
      ],
    },
    {
      heading: "Sodom and Gomorrah Fall",
      verseBlock: { reference: "Genesis 19:23-29", chapter: 19, startVerse: 23, endVerse: 29 },
      teaching: [
        "Lot reaches Zoar, and judgment falls on Sodom and Gomorrah.",
        "Fire and brimstone come from the LORD out of heaven.",
        "Lot's wife looks back and becomes a warning about divided affection.",
        "The chapter also says God remembered Abraham and sent Lot out. Judgment is real, and mercy is real too.",
      ],
    },
    {
      heading: "Lot's Family After Sodom",
      verseBlock: { reference: "Genesis 19:30-38", chapter: 19, startVerse: 30, endVerse: 38 },
      teaching: [
        "The ending of Genesis 19 is disturbing and sad.",
        "Lot leaves Zoar and lives in a cave with his daughters.",
        "The family's choices show that leaving Sodom physically did not mean Sodom's damage had fully left them.",
        "Genesis does not soften the ending. It shows the long consequences of compromise and the need for God's mercy at every level.",
      ],
    },
    {
      heading: "Abraham Repeats an Old Fear",
      verseBlock: { reference: "Genesis 20:1-18", chapter: 20, startVerse: 1, endVerse: 18 },
      teaching: [
        "Abraham goes to Gerar and again says Sarah is his sister.",
        "This repeats the fear pattern we saw earlier in Egypt.",
        "God warns Abimelech in a dream and protects Sarah from being taken into another man's house.",
        "The promise is close to fulfillment, and God preserves it even while Abraham is still flawed.",
      ],
    },
  ],
  closing: [
    "Day 8 is not an easy day, but it is an important one.",
    "Genesis 18 reminds us that God's promise can still speak into impossible waiting, and that prayer can draw near with reverent boldness.",
    "Genesis 19 reminds us that wickedness is serious, compromise has consequences, and judgment is not pretend.",
    "Genesis 20 reminds us that God's promise is not fragile, even when Abraham falls back into fear.",
    "But even here, mercy is present.",
    "The Lord heard Abraham's intercession, remembered Abraham, pulled Lot from the overthrow, and protected Sarah before Isaac's birth.",
  ],
};

export const GENESIS_DAY_NINE_ABRAHAMS_TEST_AND_LEGACY_LESSON: BibleYearDailyLesson = {
  dayNumber: 9,
  title: "Abraham's Legacy",
  reference: "Genesis 21-24",
  estimatedListenTime: "about 16 min",
  opening: [
    "Day 9 closes Abraham's journey and prepares the story to move into the next generation.",
    "Isaac is born, Hagar and Ishmael are cared for in the wilderness, Abraham is tested on Mount Moriah, Sarah dies, and Isaac receives Rebekah.",
    "This keeps Day 9 focused on promise fulfilled, costly trust, grief, and God's guidance for the covenant family.",
  ],
  sections: [
    {
      heading: "Isaac Is Born",
      verseBlock: { reference: "Genesis 21:1-7", chapter: 21, startVerse: 1, endVerse: 7 },
      teaching: [
        "The LORD visits Sarah as He said.",
        "Isaac is born at the appointed time.",
        "Sarah's laughter changes from disbelief into joy.",
        "This birth proves that the covenant promise depends on God's faithfulness, not human strength.",
      ],
    },
    {
      heading: "The Household Conflict Breaks Open",
      verseBlock: { reference: "Genesis 21:8-13", chapter: 21, startVerse: 8, endVerse: 13 },
      teaching: [
        "Isaac grows, and the family celebrates his weaning.",
        "Sarah sees Ishmael mocking, and the old wound around Hagar and Ishmael opens again.",
        "God confirms Isaac as the covenant line.",
        "The promise moves forward, but the household still carries consequences from earlier choices.",
      ],
    },
    {
      heading: "God Hears Ishmael In The Wilderness",
      verseBlock: { reference: "Genesis 21:14-21", chapter: 21, startVerse: 14, endVerse: 21 },
      teaching: [
        "Hagar and Ishmael are sent into the wilderness with limited supplies.",
        "When the water runs out, Hagar cannot bear to watch her son die.",
        "God hears the boy, opens Hagar's eyes to a well, and promises Ishmael a future.",
        "Isaac carries the covenant line, but Ishmael is not invisible to God.",
      ],
    },
    {
      heading: "Abimelech Sees God With Abraham",
      verseBlock: { reference: "Genesis 21:22-24", chapter: 21, startVerse: 22, endVerse: 24 },
      teaching: [
        "Abimelech recognizes that God is with Abraham.",
        "He asks for honest peace between their households.",
        "Abraham's blessing is becoming visible to outsiders.",
        "Faithfulness still requires integrity with people nearby.",
      ],
    },
    {
      heading: "The Well Becomes A Witness",
      verseBlock: { reference: "Genesis 21:25-30", chapter: 21, startVerse: 25, endVerse: 30 },
      teaching: [
        "Abraham confronts Abimelech about a seized well.",
        "In a dry land, a well means survival, settlement, and future.",
        "The seven lambs become a public witness that Abraham dug the well.",
        "Peace is pursued with truth, not by hiding the problem.",
      ],
    },
    {
      heading: "Abraham Calls On The Everlasting God",
      verseBlock: { reference: "Genesis 21:31-34", chapter: 21, startVerse: 31, endVerse: 34 },
      teaching: [
        "The place is named Beersheba.",
        "Abraham plants a tree and calls on the everlasting God.",
        "He is still living as a sojourner, but he worships in the land of promise.",
        "Faith worships while it waits.",
      ],
    },
    {
      heading: "The Test Begins",
      verseBlock: { reference: "Genesis 22:1-8", chapter: 22, startVerse: 1, endVerse: 8 },
      teaching: [
        "God tests Abraham by asking for Isaac.",
        "The command touches the son Abraham loves and the son through whom the promise is supposed to continue.",
        "Abraham walks toward Moriah without knowing how God will resolve the tension.",
        "His answer to Isaac carries the heart of the chapter: God will provide.",
      ],
    },
    {
      heading: "The Lord Provides The Ram",
      verseBlock: { reference: "Genesis 22:9-14", chapter: 22, startVerse: 9, endVerse: 14 },
      teaching: [
        "Abraham builds the altar and binds Isaac.",
        "At the final moment, the angel of the LORD stops him.",
        "A ram is provided in Isaac's place.",
        "Abraham names the place The LORD will provide.",
      ],
    },
    {
      heading: "The Promise Is Repeated",
      verseBlock: { reference: "Genesis 22:15-19", chapter: 22, startVerse: 15, endVerse: 19 },
      teaching: [
        "After the test, God repeats the promise.",
        "He swears by Himself because there is no higher authority.",
        "The promise of descendants and blessing to the nations remains secure.",
        "Testing does not cancel God's covenant faithfulness.",
      ],
    },
    {
      heading: "Sarah Dies",
      verseBlock: { reference: "Genesis 23:1-2", chapter: 23, startVerse: 1, endVerse: 2 },
      teaching: [
        "Sarah dies in the land of Canaan.",
        "Abraham mourns and weeps for her.",
        "Faith does not make grief disappear.",
        "Genesis honors Sarah's place in the promise story.",
      ],
    },
    {
      heading: "Abraham Asks For A Burial Place",
      verseBlock: { reference: "Genesis 23:3-7", chapter: 23, startVerse: 3, endVerse: 7 },
      teaching: [
        "Abraham calls himself a stranger and sojourner.",
        "He lives in the promised land, but he does not fully possess it yet.",
        "He asks for a burial place that will belong to his family.",
        "Promise and waiting stand side by side.",
      ],
    },
    {
      heading: "The Cave Of Machpelah",
      verseBlock: { reference: "Genesis 23:8-12", chapter: 23, startVerse: 8, endVerse: 12 },
      teaching: [
        "Abraham asks for the cave of Machpelah.",
        "This place will become the family burial site for the patriarchs and matriarchs.",
        "The negotiation happens publicly so the purchase is witnessed.",
        "Abraham acts with integrity inside grief.",
      ],
    },
    {
      heading: "Abraham Pays The Full Price",
      verseBlock: { reference: "Genesis 23:13-16", chapter: 23, startVerse: 13, endVerse: 16 },
      teaching: [
        "Ephron names the price of four hundred shekels of silver.",
        "Abraham weighs out the silver publicly.",
        "The transaction is clear and legal.",
        "Faith does not need shady shortcuts.",
      ],
    },
    {
      heading: "Sarah Is Buried In Machpelah",
      verseBlock: { reference: "Genesis 23:17-20", chapter: 23, startVerse: 17, endVerse: 20 },
      teaching: [
        "The field, cave, and trees are confirmed as Abraham's possession.",
        "Sarah is buried in the promised land.",
        "The first land Abraham legally owns in Canaan is a burial place.",
        "God's promise keeps moving through grief.",
      ],
    },
    {
      heading: "Abraham Sends His Servant",
      verseBlock: { reference: "Genesis 24:1-5", chapter: 24, startVerse: 1, endVerse: 5 },
      teaching: [
        "Abraham is old, and Isaac's future now matters deeply.",
        "He sends a trusted servant to find a wife from his own family line.",
        "This marriage will shape the next generation of the covenant family.",
        "The servant asks what should happen if the woman will not come.",
      ],
    },
    {
      heading: "Isaac Must Not Go Back",
      verseBlock: { reference: "Genesis 24:6-9", chapter: 24, startVerse: 6, endVerse: 9 },
      teaching: [
        "Abraham insists that Isaac must not return to the old land.",
        "The promise is tied to Canaan.",
        "Abraham trusts that God will send His angel ahead of the servant.",
        "Faith moves forward in God's call, not backward into the old life.",
      ],
    },
    {
      heading: "The Servant Prays At The Well",
      verseBlock: { reference: "Genesis 24:10-14", chapter: 24, startVerse: 10, endVerse: 14 },
      teaching: [
        "The servant reaches the well with Abraham's camels.",
        "He prays for guidance tied to generous character.",
        "The sign is not shallow. Watering camels takes effort and kindness.",
        "The servant is looking for the kind of woman who fits a covenant household.",
      ],
    },
    {
      heading: "Rebekah Appears",
      verseBlock: { reference: "Genesis 24:15-20", chapter: 24, startVerse: 15, endVerse: 20 },
      teaching: [
        "Before the servant finishes praying, Rebekah comes out.",
        "She gives him water and offers to water the camels too.",
        "Her generosity is practical, strong, and costly.",
        "God's guidance is seen through both timing and character.",
      ],
    },
    {
      heading: "The Servant Worships",
      verseBlock: { reference: "Genesis 24:21-27", chapter: 24, startVerse: 21, endVerse: 27 },
      teaching: [
        "The servant watches carefully instead of rushing the moment.",
        "He learns Rebekah is from Abraham's family.",
        "He bows and worships the LORD.",
        "Guidance should lead to gratitude, not pride.",
      ],
    },
    {
      heading: "The Family Receives The Servant",
      verseBlock: { reference: "Genesis 24:28-33", chapter: 24, startVerse: 28, endVerse: 33 },
      teaching: [
        "Rebekah runs to tell her family.",
        "Laban welcomes the servant after seeing the gifts.",
        "The household shows hospitality.",
        "The servant keeps the mission first and will not eat until he explains why he came.",
      ],
    },
    {
      heading: "The Servant Tells Abraham's Story",
      verseBlock: { reference: "Genesis 24:34-41", chapter: 24, startVerse: 34, endVerse: 41 },
      teaching: [
        "The servant identifies himself as Abraham's servant.",
        "He tells how the LORD blessed Abraham and made Isaac the heir.",
        "He explains the oath and the seriousness of the mission.",
        "Isaac's marriage is connected to the future of the promise.",
      ],
    },
    {
      heading: "The Servant Explains The Prayer",
      verseBlock: { reference: "Genesis 24:42-49", chapter: 24, startVerse: 42, endVerse: 49 },
      teaching: [
        "The servant retells the prayer at the well.",
        "He explains how Rebekah appeared before he finished praying.",
        "He asks the family to answer kindly and truly.",
        "Testimony helps others recognize God's guidance.",
      ],
    },
    {
      heading: "The Family Recognizes The Lord",
      verseBlock: { reference: "Genesis 24:50-54", chapter: 24, startVerse: 50, endVerse: 54 },
      teaching: [
        "Laban and Bethuel recognize that the matter is from the LORD.",
        "They agree that Rebekah may become Isaac's wife.",
        "The servant worships again.",
        "Answered guidance should not be treated casually.",
      ],
    },
    {
      heading: "Rebekah Chooses To Go",
      verseBlock: { reference: "Genesis 24:55-61", chapter: 24, startVerse: 55, endVerse: 61 },
      teaching: [
        "The family asks for a delay.",
        "Rebekah is asked directly if she will go.",
        "Her answer is simple and courageous: I will go.",
        "Like Abraham, she leaves what she knows and steps into the promise story.",
      ],
    },
    {
      heading: "Isaac Receives Rebekah",
      verseBlock: { reference: "Genesis 24:62-67", chapter: 24, startVerse: 62, endVerse: 67 },
      teaching: [
        "Isaac is in the field at evening when Rebekah arrives.",
        "The servant tells Isaac everything that happened.",
        "Isaac receives Rebekah, loves her, and is comforted after Sarah's death.",
        "Genesis 24 ends with the promise moving forward through comfort, marriage, and the next generation.",
      ],
    },
  ],
  closing: [
    "Day 9 shows Abraham as both faithful and flawed.",
    "He receives Isaac, sends Hagar away, obeys on Moriah, mourns Sarah, and prepares Isaac's future.",
    "The big movement is legacy.",
    "God keeps His promise through Sarah's laughter, Isaac's birth, Abraham's costly obedience, and Rebekah's arrival.",
    "The story is not held together by perfect people. It is held together by the faithful God who keeps covenant.",
  ],
};
