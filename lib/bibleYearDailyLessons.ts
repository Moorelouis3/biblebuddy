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
  estimatedListenTime: "about 18 min",
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
        "The garden has rivers, beauty, resources, and abundance. Then God places the man in the garden to dress it and keep it. Work is part of the good world before sin enters the story. That means work itself is not a curse. Frustration, thorns, exhaustion, and futility come later, but meaningful work begins in Eden.",
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
        "God brings the animals to the man, and the man names them. But no suitable helper is found for him. This builds anticipation. The man is surrounded by living creatures, but none of them correspond to him. He needs someone who is like him and yet distinct from him.",
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
  estimatedListenTime: "about 10 min",
  opening: [
    "Day 1 showed the world as God made it: good, ordered, blessed, full of life, and without shame.",
    "Day 2 shows what happens when trust breaks. Genesis 3 and 4 explain why shame feels familiar, why blame comes naturally, why anger grows fast, and why the world feels beautiful and broken at the same time.",
    "Creation was good. Trust was attacked. Sin entered. Shame followed. Violence spread. Hope remained.",
  ],
  sections: [
    {
      heading: "The Lie Enters the Garden",
      verseBlock: { reference: "Genesis 3:1-5", chapter: 3, startVerse: 1, endVerse: 5 },
      teaching: [
        "The serpent starts with a question: has God really said? Temptation often begins by making God's word feel unclear.",
        "God gave Adam and Eve a garden full of yes. The serpent makes them focus on the one no. Every tree was provision. One tree was boundary. The lie was about trust.",
        "The temptation is not just fruit. It is whether humans can define good and evil without God.",
      ],
    },
    {
      heading: "Shame Enters the Story",
      verseBlock: { reference: "Genesis 3:6-7", chapter: 3, startVerse: 6, endVerse: 7 },
      teaching: [
        "The tree looks useful, beautiful, and desirable for wisdom. Sin does not always look ugly at first. Sometimes it looks like control or freedom.",
        "Adam is with her, and he eats too. He is present, silent, and responsible.",
        "Their eyes open, but they do not become free. They become ashamed. Fig leaves. Shame. Opened eyes. Broken trust. Sin promised glory and delivered hiding.",
      ],
    },
    {
      heading: "God Comes Looking",
      verseBlock: { reference: "Genesis 3:8-13", chapter: 3, startVerse: 8, endVerse: 13 },
      teaching: [
        "God asks, Where are you? He is not confused. He is drawing Adam out of hiding. This is mercy before judgment.",
        "Adam is afraid of the God who gave him life. Then blame begins. Adam blames Eve and indirectly blames God. Eve blames the serpent.",
        "Fear enters. Hiding begins. Blame spreads. Relationship breaks.",
      ],
    },
    {
      heading: "Judgment and the First Promise",
      verseBlock: { reference: "Genesis 3:14-19", chapter: 3, startVerse: 14, endVerse: 19 },
      teaching: [
        "God judges the serpent first, but inside the judgment He gives hope. The promised seed will be wounded, but He will crush the serpent.",
        "That is the first promise that evil will not win forever. Before Adam and Eve leave Eden, God already speaks rescue.",
        "Pain touches childbirth, marriage, work, the ground, and human life. Work becomes painful. Thorns grow. Dust returns to dust. Promise still lives.",
      ],
    },
    {
      heading: "Mercy Outside Eden",
      verseBlock: { reference: "Genesis 3:20-24", chapter: 3, startVerse: 20, endVerse: 24 },
      teaching: [
        "Adam names his wife Eve because she will be the mother of all living. That name carries hope.",
        "Adam and Eve made fig leaves. God gives a better covering. Even after sin, God provides.",
        "Eden is closed and the tree of life is guarded, but there is mercy in it. God does not allow humanity to live forever in a broken state. The garden is closed, but the promise is open.",
      ],
    },
    {
      heading: "Sin Moves Into the Family",
      verseBlock: { reference: "Genesis 4:1-7", chapter: 4, startVerse: 1, endVerse: 7 },
      teaching: [
        "Adam and Eve have sons. Cain works the ground. Abel keeps sheep. Both bring offerings.",
        "Cain becomes angry, and God confronts his anger before murder happens. The murder does not begin in the field. It begins in the heart.",
        "Sin is crouching at the door like a predator. Anger. Jealousy. Warning before destruction. This is mercy.",
      ],
    },
    {
      heading: "The First Murder",
      verseBlock: { reference: "Genesis 4:8-16", chapter: 4, startVerse: 8, endVerse: 16 },
      teaching: [
        "Cain ignores the warning and kills Abel. God asks, Where is Abel, your brother? That echoes Eden: Where are you?",
        "Cain lies, but Abel's blood cries from the ground. Hidden violence is not hidden from God.",
        "Cain is judged and becomes a wanderer. But God marks Cain so revenge does not multiply without limit. Judgment and mercy stand together.",
      ],
    },
    {
      heading: "A Broken World Still Builds",
      verseBlock: { reference: "Genesis 4:17-24", chapter: 4, startVerse: 17, endVerse: 24 },
      teaching: [
        "Cain's line builds. Cities, livestock work, music, and tools appear. Fallen humans are still creative.",
        "But sin is still there. Lamech takes two wives, bending the one-flesh pattern from Genesis 2, then brags about violence.",
        "City. Music. Tools. Pride. Violence. Humanity is gifted and deeply broken.",
      ],
    },
    {
      heading: "Hope Keeps Moving",
      verseBlock: { reference: "Genesis 4:25-26", chapter: 4, startVerse: 25, endVerse: 26 },
      teaching: [
        "Genesis does not end with Lamech bragging. It returns to Adam and Eve. Seth is born.",
        "Abel is dead and Cain is exiled, but the promise continues. Genesis 3 promised the seed of the woman. Genesis 4 shows the line of hope still moving.",
        "Then people begin to call on Yahweh's name. After shame, exile, murder, and violence, worship still rises.",
      ],
    },
  ],
  closing: [
    "The Fall of Man shows why the world feels broken. Sin attacks trust, shame grows, blame spreads, anger becomes violence, and violence enters culture.",
    "But God does not abandon the story. God comes looking, asks questions, warns Cain, covers Adam and Eve, protects Cain from endless revenge, gives Seth, and keeps hope alive.",
    "The garden is closed, but the promise is open. The serpent wounds, but the seed will crush. Evil will not win forever.",
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
      heading: "Come Into the Ark",
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
      verseBlock: { reference: "Genesis 7:11-16", chapter: 7, startVerse: 11, endVerse: 16 },
      teaching: [
        "The flood does not come only from rain. Genesis says the fountains of the deep burst open and the windows of heaven open.",
        "This feels like creation boundaries being released. Genesis 1 showed God ordering the waters so life could flourish. Genesis 7 shows the waters overwhelming the world because the world has become corrupt.",
        "The flood feels like an undoing.",
        "Then comes one of the most powerful lines in the story: Yahweh shut him in.",
        "That line is tender and terrifying. Tender because God secures Noah inside the ark. Terrifying because the door is now closed. The time for building is over. The time for warning is over. Judgment has begun.",
      ],
    },
    {
      heading: "The Waters Prevail",
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
