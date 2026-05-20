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
  estimatedListenTime: "15-20 min",
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
