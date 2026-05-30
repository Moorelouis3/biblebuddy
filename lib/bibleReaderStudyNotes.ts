export type BibleReaderStudyNoteCategory = {
  id: string;
  icon: string;
  title: string;
  content: string[];
  list?: boolean;
};

export type BibleReaderStudySection = {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  summary: string;
  categories: BibleReaderStudyNoteCategory[];
};

function normalizeBook(book: string | null | undefined) {
  return (book || "").toLowerCase().trim().replace(/\s+/g, " ");
}

export const BIBLE_READER_STUDY_SECTIONS: BibleReaderStudySection[] = [
  {
    book: "genesis",
    chapter: 1,
    startVerse: 1,
    endVerse: 5,
    reference: "Genesis 1:1-5",
    title: "God Speaks Into The Beginning",
    icon: "📖",
    summary: "God creates, the earth is unfinished, and His first recorded words bring light into darkness.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis opens before there is a nation, a temple, a law, a king, or a human problem to solve. The first thing the Bible wants us to see is God already existing and already acting. He is not introduced with an origin story because Scripture presents Him as the One everything else comes from.\n🌌 God creates the heavens and the earth, which means the whole story begins with Him as Creator, not with human effort.\n🌊 The earth is real, but it is not ready yet: it is unformed, empty, dark, and covered by deep waters.\n🕊️ God's Spirit is already present over the unfinished world, showing that unfinished does not mean abandoned.\n💡 God speaks light into the darkness, and creation begins moving from chaos toward order.\nThe point is not only that light appears. The point is that God's presence and God's word begin turning an unfinished world into an ordered, livable place.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"In The Beginning\"\nThis is the beginning of creation, not the beginning of God. Genesis is not saying God came into existence here; it is saying time, space, matter, and history begin here.\nThat is important because everything else in the Bible rests on this starting point. God is not one character inside creation trying to control it. He stands before it, above it, and outside of it.\nSo when the Bible starts with these words, it is teaching us how to read the whole story. Creation is not self-made, human life is not random, and history has a source.",
          "\"God Created\"\nThe word created points to a kind of power that belongs to God alone. People can build, shape, invent, paint, write, and design, but we always work with something already there.\nGenesis presents God differently. He does not need raw materials, a workshop, or help from another power. He creates because He wills to create.\nThat gives the Bible a direct answer to a question people still ask: where did everything come from? Genesis does not begin with an argument; it begins with a claim. Everything exists because God is the Creator.",
          "\"The Heavens And The Earth\"\nThis phrase is a Bible way of saying the whole created order. It means everything above and everything below, the skies and the land, the visible world and the vast universe beyond human reach.\nThat matters because Genesis is not saying God only made spiritual things or religious places. The ordinary world belongs to Him too: soil, water, stars, bodies, animals, food, time, and human life.\nA helpful way to hear it is this: there is no part of reality that sits outside God's ownership. The Bible begins by putting the entire world under His authorship.",
          "\"Formless And Empty\"\nThis phrase describes creation before God shapes it into an ordered home. It does not mean the earth is evil or ruined; it means it is not yet arranged for life.\nThe phrase gives us one of the main patterns of Genesis 1. What is formless, God will form. What is empty, God will fill.\nThat is why the chapter has such a careful rhythm. God is not randomly making objects. He is turning an unfinished world into a place where life can flourish.",
          "\"The Deep\"\nDeep water was frightening in the ancient world because it represented danger, chaos, and the unknown. People knew the sea could not be controlled by human strength.\nGenesis uses that scary image, but it does not make the deep God's enemy. The waters are not a rival god. They are simply part of creation waiting under God's authority.\nThat is an important aha moment. The Bible begins with the things humans fear already beneath God's rule.",
          "\"The Spirit Of God Was Hovering\"\nThis line brings life and nearness into a dark scene. The earth is unfinished, but it is not abandoned.\nThe word picture feels active, watchful, and ready. God's Spirit is present over the waters before the world looks beautiful, which means God's presence comes before the finished product.\nChristians also notice something beautiful in the first three verses: God creates, the Spirit hovers, and God's word goes forth. The full doctrine of the Trinity is revealed later, but Genesis already gives us a rich glimpse of God's personal presence and action.",
          "\"Let There Be Light\"\nThese are the first recorded words God speaks in Scripture. That alone makes the phrase worth slowing down for.\nThe surprising detail is that this light appears before the sun, moon, and stars are created on Day 4. Genesis is teaching that light does not ultimately come from the sun; it comes from God.\nThat would have been powerful in the ancient world, where many people worshiped the sun and moon. Genesis quietly puts those heavenly bodies in their place. They are useful creations, but they are not gods.",
          "\"God Saw That It Was Good\"\nGood means more than pretty. It means fitting, ordered, pleasing, useful, and working the way God intends.\nThis matters because some people imagine the physical world as unimportant or less spiritual. Genesis does the opposite. God looks at material creation and approves it.\nThe Bible begins by telling us that creation is not a mistake, a prison, or an accident. It is God's good world, even though sin will later damage it.",
          "\"Evening And Morning\"\nGenesis counts the day from evening to morning: darkness first, then light. That rhythm is easy to miss because most of us describe a day from morning to night.\nIn Genesis, the movement keeps preaching a pattern. God brings light after darkness, order after chaos, and morning after night.\nThat does not mean every hard season ends instantly. But from the first page, Scripture is teaching us the direction of God's work. Darkness is real, but it does not get the final word.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "God is not part of creation.\nGenesis places God before everything else so we do not confuse Him with the world He made.\nHe is not the strongest piece of creation. He is the Creator of creation.\nThat means creation depends on God, but God does not depend on creation.",
          "Creation has meaning because it has a Maker.\nIf the world begins with God, then the world is not a meaningless accident.\nThere is wisdom, intention, and authority behind existence.\nGenesis does not answer every science question a reader may have, but it gives the most important starting point: reality begins with God.",
          "God's word does more than describe.\nWhen God speaks, creation responds.\nHis word is not commentary from the sidelines. His word carries authority to bring about what He commands.\nThat prepares us for the rest of Scripture, where God's word creates, calls, judges, promises, heals, and saves.",
          "God is present in unfinished places.\nThe Spirit of God is present while the earth is still formless, empty, dark, and covered by waters.\nThat matters because we often assume God shows up after things are fixed.\nGenesis shows the opposite: God is present before the beauty is visible.",
          "God brings order without panic.\nThe passage moves from darkness and deep waters toward light, naming, separation, and rhythm.\nGod is not threatened by disorder. He does not rush, struggle, or compete.\nHe calmly brings shape to what is unformed and purpose to what is empty.",
          "The first page teaches God's character.\nGenesis 1 is not only about what God made. It is about what God is like.\nHe speaks, forms, names, separates, sees, and declares good.\nBefore the Bible tells us what humans are like, it shows us the God we are dealing with.",
          "Hope begins with God's pattern.\nThe movement from evening to morning teaches a quiet kind of hope.\nDarkness appears first, but darkness is not final.\nGenesis begins the Bible with a God who brings light, and that pattern will echo all the way through Scripture.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 1:1-5 matters because it teaches us what God does with dark and unfinished places. He does not avoid them. He speaks into them.\n🕯️ If God brings light before the sun exists, then darkness is not stronger than His word.\n🏗️ If God works with an unfinished world, then unfinished parts of life are not hopeless to Him.\n🕊️ If God's Spirit is present before the beauty is visible, then God's presence is not limited to cleaned-up places.\n📖 If creation begins by listening to God's voice, then real clarity starts with what God says.\nThe same God who brought light into the first darkness still brings light through His word. Genesis begins with creation, but it also gives us a way to recognize God's work in every place that still needs His order and life.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 1,
    startVerse: 6,
    endVerse: 13,
    reference: "Genesis 1:6-13",
    title: "God Forms A World That Can Hold Life",
    icon: "🌱",
    summary: "God separates waters, brings out dry land, and fills the land with plants, seeds, and fruit.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "In this section, God starts turning the unfinished earth into a place where life can actually live. He is not only making things; He is preparing spaces where life can flourish.\n🌤️ God separates the waters and creates the expanse, the sky-space between waters above and waters below.\n🌊 God gathers the waters so the dry land can appear, giving creation stable ground.\n🌱 Once the land appears, God commands vegetation, plants, fruit trees, and seed-bearing life to grow.\n🏡 The pattern matters: God forms places before He fills them with life.\nSo God is not making random objects in random order. He creates spaces, sets boundaries, and brings fruitfulness out of the ground, showing that preparation is part of His good work.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Let There Be An Expanse\"\nThe expanse is the sky, the spread-out space between waters above and waters below.\nBefore God fills the sky with birds on Day 5, He first creates the place where birds can fly. That is part of the pattern: God forms spaces before He fills them.\nThis shows a God who prepares. He does not rush straight to the final picture. He builds the world in ordered steps.",
          "\"Let It Divide\"\nGod divides light from darkness, waters above from waters below, and later sea from dry land. Division here is not bad. It is order.\nLife needs boundaries. A world where everything runs together is not a world where life can flourish.\nGenesis shows boundaries as part of God's good design.",
          "\"Let The Waters Be Gathered\"\nThe waters do not choose their own place. God gathers them.\nTo ancient people, the sea could feel terrifying and uncontrollable. Genesis says the waters are not ultimate. They answer to God.\nThat is a powerful comfort because the Bible often uses waters as a picture of trouble. God can put boundaries around what feels overwhelming.",
          "\"Let The Dry Land Appear\"\nDry land means stability. It is the place where gardens will grow, people will walk, families will live, and the story of Scripture will unfold.\nThis is not just geography. It is God making a home.\nCreation is becoming habitable, like God is preparing a place for life before placing life there.",
          "\"Let The Earth Sprout Vegetation\"\nThe earth responds to God's word by becoming fruitful.\nGod does not treat the physical world as worthless. Soil, plants, trees, fruit, and food matter to Him.\nThis also shows that life comes by God's command. Creation is fruitful because God speaks fruitfulness into it.",
          "\"Seed\"\nSeed is a small word with a huge future in Genesis. Seeds mean life can continue.\nLater, Genesis will keep talking about offspring, family lines, promise, and the seed through whom blessing will come.\nSo even here, before people are created, Genesis is training us to notice future life hidden inside what God makes.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "God forms places before He fills them.\nThis is one of the most helpful patterns in Genesis 1. God does not fill chaos. He first forms spaces.\nThen He fills those spaces with life.\nThat tells us preparation matters to God.",
          "Boundaries can be a gift from God.\nGod separates light from darkness, waters above from waters below, and waters from dry land.\nThose boundaries are not harsh. They make life possible.\nA world with no boundaries is not freedom. It is disorder.",
          "God has authority over what feels uncontrollable.\nThe waters are gathered because God commands them.\nTo ancient readers, deep water could represent danger, chaos, and death.\nGenesis shows that even the waters have to obey God's voice.",
          "The third day brings life from the ground.\nAfter darkness and waters, dry land appears and vegetation grows.\nThat movement is beautiful because life comes after what looked like death and chaos.\nIt quietly prepares us for the Bible's larger resurrection pattern.",
          "God creates with future fruitfulness in mind.\nThe plants are made with seed in them.\nThat means creation is built to continue, grow, and multiply.\nGod is not only thinking about the first moment. He is building future life into what He makes.",
          "The physical world is part of God's good design.\nSoil, water, plants, fruit, and seeds matter to God.\nGenesis does not treat the physical world as worthless or unspiritual.\nGod made a real world and called it good.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 1:6-13 shows that preparation is part of God's work. God does not only care about the final fruit. He cares about the space, structure, and boundaries that make fruit possible.\n🌱 Fruitfulness usually needs formed ground before visible growth appears.\n🚧 Boundaries are not always punishment; sometimes they are how God makes life possible.\n🏡 God prepares a home before He fills it, which shows care, wisdom, and patience.\n⏳ Waiting seasons may be formation seasons, not wasted seasons.\nThis matters because we often want fruit before roots. Genesis reminds us that God is not wasting time when He prepares; He is making room for life.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 1,
    startVerse: 14,
    endVerse: 25,
    reference: "Genesis 1:14-25",
    title: "God Fills The Sky, Waters, And Land",
    icon: "🐦",
    summary: "God fills the created spaces with lights, sea creatures, birds, and land animals.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Now God begins filling the spaces He formed earlier. The chapter is showing a clear pattern: God forms the world, then fills it with life and purpose.\n☀️ The lights fill the heavens and are assigned to mark days, seasons, and years.\n🐟 The waters that once looked dark and threatening now swarm with living creatures.\n🐦 The sky fills with birds, turning empty space into movement and sound.\n🦌 The land fills with animals according to their kinds, showing variety without confusion.\nThis is one of the beautiful patterns of Genesis 1: God does not leave creation empty. He fills His world with rhythm, movement, blessing, and life.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Lights In The Expanse\"\nThe lights are placed in the heavens to serve creation. They are not random decorations.\nThey give light, mark time, and help creation live with rhythm.\nGod's world is not a meaningless blur. It has days, seasons, years, and patterns.",
          "\"For Signs And For Seasons\"\nThis does not mean astrology. It means the lights help mark appointed times and rhythms.\nFarmers, travelers, worshipers, and families would all depend on the regular patterns God built into the sky.\nTime itself is part of God's ordered creation.",
          "\"God Set Them\"\nThis phrase is easy to pass over. God set the lights where they belong.\nThe sun's place matters. The moon's place matters. The rhythms of the heavens matter.\nGenesis wants us to see placement, wisdom, and design, not accident.",
          "\"Let The Waters Swarm\"\nThe waters that once looked like the scene of danger now become full of living creatures.\nThat is a beautiful reversal. What looked empty and threatening becomes abundant.\nGod can fill places we only knew as fear.",
          "\"According To Their Kinds\"\nThis phrase repeats again and again. Genesis is emphasizing order, distinction, and boundaries within living things.\nCreation has variety, but not confusion. God delights in many kinds of life, but each has its place.\nThe repeated phrase also prepares us for humanity, because humans will not be described merely as another animal kind. They will be made in God's image.",
          "\"God Blessed Them\"\nBefore humans are created, God blesses living creatures. That tells us something about His generosity.\nGod delights in life multiplying. He wants the waters and skies full.\nCreation is not stingy. It is overflowing because God is generous.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "God fills what He forms.\nDays 1-3 form spaces, and Days 4-6 fill those spaces.\nThat pattern shows wisdom and intention.\nGod is not throwing things randomly into existence. He is building a world with structure and fullness.",
          "The sun, moon, and stars are created servants.\nAncient people often treated heavenly bodies like gods.\nGenesis does the opposite. The lights are made by God, placed by God, and assigned work by God.\nThey are powerful, but they are not ultimate.",
          "God built rhythm into creation.\nDays, seasons, and years are part of God's ordered world.\nTime is not meaningless. It has structure.\nThe sky helps creation live with rhythm, memory, worship, farming, travel, and rest.",
          "God can turn places of fear into places of life.\nThe waters that looked dark and threatening earlier now swarm with living creatures.\nThat is a beautiful reversal.\nGod does not only restrain what is frightening. He can fill it with life.",
          "God delights in abundance and variety.\nBirds, sea creatures, livestock, creeping things, and wild animals all appear in their kinds.\nCreation is not flat or boring.\nGod fills the world with movement, color, sound, difference, and life.",
          "Living creatures receive blessing from God.\nBefore humans are created, God blesses the animals of the sea and sky.\nThat shows His generosity toward life.\nGod's world is meant to be fruitful, multiplying, and full.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "This section shows that God's order is not cold or lifeless. His order creates room for beauty, movement, rhythm, and abundance.\n🌈 God delights in variety, not a flat or boring world.\n⏱️ Days, seasons, and years show that rhythm is part of creation's goodness.\n🌊 The waters that looked threatening become full of life, which is a beautiful reversal.\n🙌 Blessing appears before humans do, showing that God's generosity is built into creation.\nThat matters because some parts of life can feel empty for a long time. Genesis reminds us that God is not only able to clear space; He is able to fill it with life.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 1,
    startVerse: 26,
    endVerse: 31,
    reference: "Genesis 1:26-31",
    title: "Humanity Is Made In God's Image",
    icon: "👑",
    summary: "God creates humanity in His image, blesses them, and gives them responsibility over creation.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "This is the high point of Genesis 1. Everything has been moving toward a world where human life can flourish, and the language slows down when God creates humanity.\n👑 Humans are made in God's image, which gives them a dignity no other creature is given in this chapter.\n🤝 Male and female both share that image, so both carry God-given worth and calling.\n🌍 God gives humans dominion, meaning responsibility to represent His wise care in the world.\n🙌 God blesses them before He gives them work, showing that human calling begins with blessing.\nBy the end of the sixth day, creation is formed, filled, blessed, and called very good. Humanity is not an accident in the story; humanity is placed in God's world with identity, purpose, and responsibility.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Let Us Make\"\nThe plural language is important. It is not God asking angels to create humans, because humans are not made in the image of angels.\nChristians have long seen this as fitting with the fullness of God later revealed as Father, Son, and Holy Spirit.\nEven before creation, God is not lonely. God has eternal fellowship within Himself.",
          "\"In Our Image\"\nIn the ancient world, an image represented someone. Kings placed images in territories to show their authority.\nGenesis says human beings are made as God's image-bearers in His world. That gives humans royal dignity, but it also gives humans responsibility.\nWe are made to reflect God's character into creation.",
          "\"After Our Likeness\"\nThis does not mean humans become God. It means humans are made to resemble and represent Him in creaturely ways.\nWe can love, create, think, choose, relate, worship, speak, work, and care in ways that reflect something of God.\nNo animal is described this way in Genesis 1.",
          "\"Male And Female\"\nBoth man and woman are created by God and both share the image of God.\nThe image of God is not limited to one sex, one personality type, one social class, or one level of ability.\nThis gives every human being dignity before any cultural label gets added.",
          "\"Have Dominion\"\nDominion means stewardship under God's authority. It is not domination without limits.\nGod gives humanity real responsibility in the world He made. People are meant to cultivate creation, protect life, and bring God's wise order into the earth.\nThis is a calling, not an ego trip.",
          "\"Be Fruitful And Multiply\"\nGod blesses human life and tells it to spread. Family, work, culture, building, learning, growing food, making music, raising children, and caring for the earth all fit inside humanity's original calling.\nGod gives people a mission before sin enters the world.\nThe first human assignment is blessing, not punishment.",
          "\"Very Good\"\nThis is the strongest statement of goodness in the chapter.\nGod looks at the whole formed and filled creation with humanity in it and calls it very good.\nThat means shame, violence, death, and fear are not part of the original design. They come later as intruders.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "Human identity begins with God, not culture.\nGenesis tells us who we are before society, success, failure, politics, pain, or personal confusion gets to define us.\nWe begin with God as Creator.\nThat means identity is received before it is achieved.",
          "Every person has God-given dignity.\nHumans are made in the image of God.\nThat gives value to every human life before that person can contribute, perform, or prove anything.\nThis is the foundation for the sanctity of human life.",
          "Men and women both carry the image of God.\nGenesis specifically says male and female are created by God.\nBoth share the image. Both receive dignity. Both are part of God's good design.\nThe image of God is not limited to one sex or one social role.",
          "Humans are distinct from animals.\nAnimals are created according to their kinds, but humanity is made in God's image.\nThat does not mean animals do not matter. It means humans have a unique calling.\nPeople are made to represent God in the world.",
          "Dominion means stewardship under God's rule.\nDominion is not permission to be cruel, selfish, or careless.\nIt is responsibility.\nHuman beings are meant to rule creation in a way that reflects God's wisdom, care, and goodness.",
          "Work and responsibility existed before sin.\nGod gives humans a mission before Genesis 3.\nThat means work itself is not a curse.\nFrustration and futility come later, but meaningful responsibility belongs to the good world God made.",
          "God's original design was blessing and goodness.\nBefore shame, hiding, violence, and death, God blesses humanity and calls creation very good.\nThat matters because the rest of the Bible is not God giving up on creation.\nIt is God working to restore what sin damages.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 1 tells you who you are before the world gets to label you. Human value starts with God, not usefulness, success, beauty, popularity, or performance.\n🪞 You are made in God's image, which means your life has dignity before you achieve anything.\n🤝 Other people are image-bearers too, even when they are difficult, weak, different, or easy to overlook.\n🌍 Responsibility is part of human purpose; we are meant to care for the world in a way that reflects God.\n✝️ The rest of Scripture will show how sin damages that image and how Christ restores what sin broke.\nThis changes how we see ourselves and other people. Every person is more than a personality, problem, opinion, or background character; every person carries God-given worth.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 2,
    startVerse: 1,
    endVerse: 3,
    reference: "Genesis 2:1-3",
    title: "God Rests And Blesses The Seventh Day",
    icon: "📖",
    summary: "God finishes creation, rests from His work, and blesses the seventh day as holy.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis 2 begins by showing that creation is complete. God is not stopping because He is tired; He is resting because the work is finished, ordered, and good.\n✅ The heavens and the earth are finished, meaning creation has reached the goal God intended for it.\n🛑 God rests from His work, not because He ran out of strength, but because nothing is missing from what He made.\n🌿 God blesses the seventh day, making rest part of creation before Israel ever receives the law.\n✨ God makes the day holy, which means He sets it apart for a special purpose.\nThis teaches us that rest is not an afterthought. From the beginning, God builds a rhythm into life: work has meaning, and rest has meaning too.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"The Heavens And The Earth Were Finished\"\nThis means the whole created order is complete. Genesis 1 showed God forming and filling the world, and now Genesis 2 tells us the work has reached its intended finish.\nThat does not mean nothing will ever grow, change, or develop. It means the world God made is fully prepared for life to continue inside His design.\nThis phrase matters because it shows God finishes what He starts. Creation is not half-built, abandoned, or left for someone else to complete.",
          "\"God Rested\"\nGod's rest does not mean He was exhausted. The Bible presents God as all-powerful, so this rest is not recovery from weakness.\nIt is the rest of completion. Like an artist stepping back from a finished work, God stops because the work is whole, ordered, and good.\nThat gives rest a deeper meaning. Rest is not just doing nothing; it is receiving, enjoying, and trusting the finished work of God.",
          "\"The Seventh Day\"\nThe seventh day is different from the first six days because no new created thing is made. Instead, the focus shifts from making to enjoying what has been made.\nThis is important because Genesis is teaching a rhythm. Human life was never meant to be endless production with no pause.\nBefore sin enters the world, before stress and survival become part of life, rest is already built into creation.",
          "\"God Blessed The Seventh Day\"\nGod blesses living creatures in Genesis 1, and now He blesses a day. That is a surprising detail because it means time itself can become a gift.\nThe seventh day is not empty time. It is blessed time, meant to remind people that life is more than work, achievement, and output.\nThis is one reason Sabbath becomes so important later in the Bible. It points back to creation and teaches people to live by trust, not constant striving.",
          "\"Made It Holy\"\nHoly means set apart for God. The seventh day is separated from ordinary days and given a special purpose.\nThis is the first time the idea of holiness appears in the Bible. Before a holy place, a holy nation, or holy objects, there is holy time.\nThat teaches something beautiful: God meets people not only in sacred buildings, but also in rhythms of life that help them remember Him.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "✅ God finishes what He starts.\nCreation ends with completion, not confusion.\nGod does not begin a good work and then lose control of it.\nThis becomes a pattern of hope throughout Scripture.",
          "🛏️ Rest is part of God's good design.\nRest existed before sin, exhaustion, and frustration entered the world.\nThat means rest is not weakness or laziness.\nIt is part of how God designed life to work.",
          "🕯️ Holy time matters to God.\nThe first thing called holy in the Bible is not a building or object, but a day.\nGod sets apart time so people can remember, worship, and receive.\nThis shows that our rhythms shape our hearts.",
          "🙌 God invites people to enjoy His finished work.\nThe seventh day comes after God completes creation.\nThat means humanity enters a world already filled with God's provision.\nBefore people work, they receive.",
          "🌿 Creation was made with rhythm.\nGenesis does not present life as endless motion.\nThere is work, completion, blessing, and rest.\nHealthy life needs all of those rhythms.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 2:1-3 matters because it teaches that rest is not wasted time. God built rest into the world before anyone had a job problem, money problem, family problem, or stress problem.\n🧠 You are not only valuable when you are producing something.\n🛑 Rest reminds you that God runs the world, not your nonstop effort.\n📅 A rhythm of rest helps you remember that time belongs to God.\n🙏 Worship begins with receiving what God has done, not proving what you can do.\nThis passage quietly pushes back against the pressure to always be busy. God made a world where work is good, but work was never meant to become your master.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 2,
    startVerse: 4,
    endVerse: 9,
    reference: "Genesis 2:4-9",
    title: "God Forms Man And Plants A Garden",
    icon: "📖",
    summary: "Genesis zooms in as God forms the man from dust, breathes life into him, and places him near Eden's garden.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis 2 slows the camera down. Genesis 1 showed the big picture of creation, but now the story zooms in on human life and the garden where the first people will live.\n🔎 The phrase \"these are the generations\" begins a new section and helps connect creation to the human story.\n🌧️ The land is described before cultivated plants and rain, showing that God is preparing the conditions for human life.\n👤 God forms the man from dust, reminding us that humans are made from the ground and are not self-made.\n🌬️ God breathes life into him, showing that human life is more than biology; it is a gift from God.\n🌳 God plants a garden in Eden, which means the first human home is a place of provision, beauty, and purpose.\nThis passage teaches both humility and honor. Humans are dust, but dust touched by the breath of God.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"These Are The Generations\"\nThis phrase is used throughout Genesis to begin a new section of the story. It works like a heading that says, \"Here is what came from this.\"\nHere it connects the creation of the heavens and earth to the story of humanity. Genesis is moving from the whole universe to the personal details of human life.\nThat is helpful because Genesis 2 is not fighting Genesis 1. It is zooming in on the human story inside the creation story.",
          "\"No Man To Work The Ground\"\nBefore the garden is described, Genesis mentions that there is no man to work the ground. That detail prepares us for Adam's purpose.\nHuman beings are not created to sit in a finished world with nothing to do. They are made to participate in God's good world.\nThis also shows that work is not a punishment. The frustration of work comes after sin, but meaningful work belongs to creation before the fall.",
          "\"Formed The Man Of Dust\"\nThe word formed gives the picture of careful shaping, like a potter working with clay. God does not treat human life as accidental or disposable.\nDust reminds us of humility. Human beings are made from the ground, and our bodies belong to the same created world as everything else.\nBut the next phrase changes everything. The dust becomes living because God gives breath.",
          "\"Breathed Into His Nostrils\"\nThis is one of the most personal pictures in Genesis. God gives life directly to the man.\nThe verse teaches that human life is not just matter arranged in a useful way. Life is a gift that comes from God.\nIt also gives human beings deep dignity. We are earth-made, but God-breathed.",
          "\"A Living Creature\"\nAfter God breathes into the man, he becomes a living creature. This means human life is embodied life, not a soul trapped in a body.\nGenesis treats the body as part of God's good creation. Dust is not shameful when God is the one who formed it.\nThat matters because the Bible does not begin with humans escaping the physical world. It begins with God making embodied life good.",
          "\"A Garden In Eden\"\nGod plants a garden, which means the first human home is prepared by God. Eden is not just wilderness; it is cultivated beauty and provision.\nThe garden is a place where life, food, beauty, work, and relationship come together.\nThat tells us something about God's generosity. He does not merely give Adam survival. He gives him a place filled with goodness.",
          "\"Pleasant To The Sight And Good For Food\"\nThe trees are beautiful and useful. God cares about both.\nThis is easy to miss, but Genesis says the trees are pleasing to look at and good to eat. Creation is not only functional; it is delightful.\nGod made a world where beauty matters, not because it keeps us alive, but because it helps us enjoy His goodness.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🪨 Humans are humble and honored.\nAdam is made from dust, so human life begins with humility.\nBut God breathes life into him, so human life also carries deep honor.\nGenesis holds both truths together.",
          "🌬️ Life is a gift from God.\nThe man does not animate himself.\nGod gives breath, and dust becomes living.\nEvery human life depends on God more deeply than we usually realize.",
          "🧱 Work existed before sin.\nThe ground needs someone to work it before the fall happens.\nThat means work is not the curse.\nThe curse later makes work painful, but work itself is part of God's good design.",
          "🌳 God provides more than bare survival.\nThe garden includes trees that are good for food and pleasant to the sight.\nGod gives beauty along with provision.\nHe made people to receive both nourishment and delight.",
          "🏡 God prepares a place for people.\nThe first human does not create his own world from nothing.\nGod forms him and places him in a prepared environment.\nHuman life begins inside God's care.",
          "👀 Genesis 2 explains Genesis 1 up close.\nThe two chapters are not two competing creation stories.\nGenesis 1 gives the wide view, and Genesis 2 gives the close view.\nTogether they teach that the Creator is also personal and near.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 2:4-9 matters because it tells you what human life is made of. You are dust, which keeps you humble, and you are God-breathed, which gives you dignity.\n🪨 Your body matters because God formed embodied life on purpose.\n🌬️ Your life is not self-made; breath is a gift from God.\n🛠️ Your work can be meaningful because work belongs to creation before sin.\n🌳 God cares about beauty, not just survival.\nThis passage helps us avoid two mistakes. We should not think too highly of ourselves, because we are dust; and we should not think too lowly of ourselves, because God gives breath.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 2,
    startVerse: 10,
    endVerse: 17,
    reference: "Genesis 2:10-17",
    title: "God Gives Work, Freedom, And A Boundary",
    icon: "📖",
    summary: "God places the man in the garden, gives him meaningful work, generous freedom, and one serious command.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "This section shows Eden as a real place of abundance and responsibility. A river flows from the garden, valuable resources are named, and Adam is placed there with work to do.\n💧 The river flowing from Eden shows life and provision spreading outward from the garden.\n🛠️ God puts the man in the garden to work it and keep it, giving him purpose before sin enters the story.\n🍎 God gives generous freedom: Adam may eat from every tree except one.\n🚧 God gives one boundary around the tree of the knowledge of good and evil.\n⚠️ God warns that disobedience brings death, so the command is not random; it is a matter of trust and life.\nThe main point is that God's world includes both gift and command. Freedom is real, but it is not meant to be separated from trust in God.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"A River Flowed Out Of Eden\"\nThe river shows that Eden is a place of life and abundance. Water is one of the clearest Bible pictures of provision and flourishing.\nThe river does not stay still. It flows outward and becomes connected to lands beyond the garden.\nThat detail gives the garden a bigger feeling. Eden is not a tiny private escape; it is a center of life meant to overflow.",
          "\"Gold Of That Land Is Good\"\nGenesis names gold, bdellium, and onyx stone. That may feel random at first, but it shows that the world God made contains beauty, value, and material richness.\nLater in the Bible, precious materials appear in the tabernacle and temple. The resources of creation can be used in worship and beauty.\nThis is another reminder that physical creation is not worthless. God made a world filled with good things.",
          "\"Put Him In The Garden\"\nAdam does not wander into Eden by accident. God places him there.\nThat placement matters because purpose often begins with where God puts you. Adam receives a location, a calling, and a responsibility.\nThe garden is gift, but it is also assignment.",
          "\"To Work It And Keep It\"\nThese words mean Adam is meant to cultivate and guard the garden. Work and protection are part of his calling.\nThis is before sin, so work is not bad. The pain, sweat, and frustration of work come later, but purposeful labor is already good.\nThe word keep can also carry the sense of guarding. Adam is not only farming; he is responsible for protecting what God entrusted to him.",
          "\"You May Surely Eat\"\nBefore God gives the warning, He gives wide permission. Adam is free to eat from every tree except one.\nThat order matters. God's command begins in generosity, not restriction.\nSometimes people remember the one forbidden tree and forget the whole garden of allowed trees. Genesis wants us to see both.",
          "\"The Tree Of The Knowledge Of Good And Evil\"\nThis tree represents a boundary around moral authority. The question is not whether Adam will learn facts; the question is whether he will trust God to define good and evil.\nTo eat from it is to reach for independence from God's wisdom. It is humanity saying, \"I will decide good and evil for myself.\"\nThat makes the tree a test of trust, not a trap.",
          "\"You Shall Surely Die\"\nThis warning is serious and direct. Death is introduced as the consequence of rebellion before it becomes human experience.\nGod is not being harsh by warning Adam. A loving warning tells the truth about danger.\nThe rest of the Bible will show that death is not part of the good design; it enters through sin and becomes the enemy God must overcome.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "💧 God's provision overflows.\nEden is pictured with water, trees, food, beauty, and valuable resources.\nGod's first environment for humanity is generous.\nHe is not stingy with life.",
          "🛠️ Purpose comes before the fall.\nAdam has work before sin enters the world.\nThat means responsibility is not a punishment.\nPurposeful work is part of human dignity.",
          "🚧 Freedom needs boundaries.\nAdam is given many trees and one clear limit.\nThe boundary is not there to ruin freedom.\nIt teaches Adam to live as a creature who trusts the Creator.",
          "🍽️ God's first command is surrounded by generosity.\nGod says Adam may surely eat from every tree except one.\nThe permission is wider than the prohibition.\nThis helps us see God's heart clearly.",
          "⚖️ God defines good and evil.\nThe tree raises the question of moral authority.\nWill humans trust God to define what is good, or will they seize that role for themselves?\nThat question still sits under every act of sin.",
          "⚠️ Death is an enemy, not part of the original good.\nGod warns Adam about death before the fall.\nDeath is connected to disobedience, not to creation's goodness.\nThis prepares us for why redemption is needed.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 2:10-17 matters because it shows that God's commands are given inside God's generosity. Adam is not placed in a bare room with one rule; he is placed in a garden full of provision.\n🌳 God gives abundance before He gives a boundary.\n🛠️ Your work can be part of your calling, not just your paycheck.\n🚧 A limit from God is not always rejection; sometimes it is protection.\n⚖️ Real faith trusts God to define good and evil.\nThis passage helps us see obedience differently. Obedience is not God trying to steal joy; it is the way created people live safely inside the goodness He gives.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 2,
    startVerse: 18,
    endVerse: 25,
    reference: "Genesis 2:18-25",
    title: "God Creates Woman And Establishes Marriage",
    icon: "📖",
    summary: "God shows that the man should not be alone, forms the woman, and establishes the first marriage.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "For the first time in the Bible, God says something is not good. The world is good, the garden is good, the work is good, but the man being alone is not good.\n🤝 God says the man needs a helper fit for him, someone who corresponds to him in a way no animal can.\n🐾 God brings the animals to Adam, and Adam names them, but none is found as a suitable partner.\n💤 God causes the man to sleep and forms the woman from his side, showing shared humanity and deep connection.\n😍 Adam receives the woman with joy, recognizing her as bone of his bones and flesh of his flesh.\n💍 The passage ends by explaining marriage as a one-flesh union and describes a world without shame.\nThis is not just about Adam needing company. Genesis is teaching that human life is relational, and that marriage is rooted in God's created design.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"It Is Not Good\"\nThis phrase should surprise us because Genesis 1 kept repeating that creation was good. Now God names something incomplete.\nThe problem is not sin yet. The problem is aloneness. Adam has a garden, work, food, and animals, but he does not yet have a human partner.\nThat teaches that people need more than a task and a place. We are made for relationship.",
          "\"A Helper Fit For Him\"\nHelper does not mean inferior. The same word is often used in the Old Testament for God as the helper of His people.\nThe idea is strength, support, and partnership. The woman is not created as an afterthought or servant-class human.\nFit for him means corresponding to him. She is like him and different from him in a way that makes partnership possible.",
          "\"God Brought Them To The Man\"\nGod brings the animals to Adam, and Adam names them. This shows Adam exercising the authority and wisdom God gave him.\nBut the scene also teaches by contrast. The animals are good, but none can answer Adam's aloneness.\nAdam needs someone who shares his humanity, not just another living creature nearby.",
          "\"The Rib\"\nThe woman is formed from the man's side, not from his head to rule over him or from his feet to be trampled by him.\nThat old observation is not a verse quote, but it captures the picture well: she is made from his side, near his heart, as his companion.\nGenesis is showing unity, equality of humanity, and difference at the same time.",
          "\"Bone Of My Bones And Flesh Of My Flesh\"\nThese are Adam's first recorded words, and they sound like joy and recognition. He sees that the woman is not another animal and not a stranger.\nShe is like him. She shares his humanity.\nThis is the first human celebration in the Bible, and it happens when Adam receives the person God made for relationship.",
          "\"One Flesh\"\nOne flesh describes the deep union of marriage. It includes physical union, but it is bigger than that.\nMarriage creates a new family bond where two people are joined in loyalty, life, and covenant love.\nJesus later points back to this passage when teaching about marriage, which shows how foundational Genesis 2 is for the rest of Scripture.",
          "\"Naked And Not Ashamed\"\nBefore sin, there is openness without fear. Adam and the woman are fully seen and not hiding.\nThat is hard for us to imagine because shame becomes so normal after Genesis 3.\nThis phrase gives us a glimpse of God's original design: relationship without hiding, fear, comparison, or self-protection.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🤝 Humans are made for relationship.\nAdam has a perfect garden and meaningful work, but God still says aloneness is not good.\nThat means relationship is not a luxury add-on.\nIt belongs to God's design for human life.",
          "💪 Helper means strength, not inferiority.\nThe woman is called a helper, but that word often describes God's help in Scripture.\nThe point is partnership and support.\nGenesis does not present the woman as lesser.",
          "🧍‍♀️ Woman shares the same humanity as man.\nAdam recognizes her as bone of his bones and flesh of his flesh.\nShe is not a different class of creature.\nShe is fully human and personally received as God's gift.",
          "💍 Marriage is rooted in creation.\nGenesis explains why a man leaves father and mother and holds fast to his wife.\nMarriage is not invented later by society.\nIt is grounded in God's created order.",
          "🧩 Difference can serve unity.\nThe man and woman are not identical, but they belong together.\nTheir difference is not a problem to erase.\nIt is part of how one-flesh union works.",
          "🌿 Shame was not part of God's original design.\nThe chapter ends with nakedness and no shame.\nThat means hiding, fear, and self-protection are not how human relationships were meant to be.\nSin will damage this, but Genesis shows what was good first.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 2:18-25 matters because it shows that people are not made to live as isolated individuals. Even in a good world, Adam needed relationship.\n🤝 Needing people is not weakness; it is part of being human.\n💪 Biblical help is strong, valuable, and necessary.\n💍 Marriage is meant to be covenant union, not just attraction or convenience.\n🫶 God's original design included openness without shame.\nThis passage helps us understand why loneliness hurts so deeply and why trust matters so much. We were made for relationship, but the safest relationships are the ones shaped by God's design, not selfishness or control.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    startVerse: 1,
    endVerse: 5,
    reference: "Genesis 3:1-5",
    title: "The Lie Enters The Garden",
    icon: "📖",
    summary: "The serpent questions God's word and makes God's boundary look like something unfair.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis 3 opens with a new voice in the garden. The serpent does not begin by denying God exists; he begins by questioning whether God's word can be trusted.\n🐍 The serpent makes God's command sound unclear and restrictive.\n🌳 Eve is standing in a garden full of permission, but the conversation pulls her attention toward the one forbidden tree.\n🧠 The temptation is not only about fruit; it is about who gets to define good and evil.\n⚠️ The serpent promises freedom, but he does it by making distrust look wise.\nThis is how sin often begins in Scripture. It does not always start with open rebellion; sometimes it starts with a quiet suspicion that God is holding something good back.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"The Serpent\"\nThe serpent appears as a crafty creature who challenges God's word. Genesis does not pause to explain everything about him yet; it shows what he does.\nHis strategy is to twist trust. He takes a clear command from God and turns it into a conversation about suspicion.\nLater Scripture connects the serpent with Satan, but Genesis first wants us to notice the pattern: evil speaks by questioning God's goodness.",
          "\"Did God Really Say\"\nThis is the first question recorded from the serpent, and it is aimed directly at God's word.\nHe does not begin with a bold rejection. He begins with doubt, making Eve reconsider what God actually said.\nThat is important because temptation often works by loosening confidence before it pushes disobedience.",
          "\"You Shall Not Eat Of Any Tree\"\nThe serpent exaggerates God's command. God gave Adam freedom to eat from every tree except one, but the serpent makes God sound restrictive.\nThat is a major trick in the passage. The garden is full of God's generosity, but the serpent frames God as if He mostly says no.\nSin grows when we forget the many gifts of God and focus only on the boundary.",
          "\"You Will Not Surely Die\"\nHere the serpent directly contradicts God's warning. This is not confusion anymore; it is a lie.\nGod said disobedience would bring death, but the serpent promises safety apart from God.\nThis is the first false gospel in the Bible: you can rebel against God and still live.",
          "\"You Will Be Like God\"\nThis is the heart of the temptation. Adam and Eve were already made in God's image, but the serpent tempts them to reach for God-likeness on their own terms.\nThe issue is not that wisdom is bad. The issue is trying to seize independence from God.\nThe serpent makes rebellion sound like growth, freedom, and maturity.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🐍 Temptation often starts by questioning God's word.\nThe serpent does not begin with fruit.\nHe begins with a question about what God said.\nIf trust in God's word weakens, obedience becomes easier to abandon.",
          "🌳 Sin makes God's generosity look small.\nThe serpent focuses attention on the one forbidden tree.\nThat makes the whole garden fade into the background.\nA grateful heart sees the garden before it stares at the boundary.",
          "🧠 The fall is about trust and authority.\nThe tree raises the question of who defines good and evil.\nWill humans receive wisdom from God, or decide for themselves?\nThat question still sits under every human sin.",
          "⚠️ Evil often promises life while leading toward death.\nThe serpent says they will not die.\nBut God's warning is true.\nSin can sound like freedom while quietly carrying destruction.",
          "🪞 Humans were already image-bearers.\nThe promise to be like God is twisted because Adam and Eve already bear God's image.\nThe temptation is to grasp apart from God what should be received from God.\nThat pattern repeats throughout Scripture.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 3:1-5 matters because it shows how distrust gets planted. The serpent does not need Adam and Eve to hate God; he only needs them to question God's goodness.\n🧠 Not every thought that sounds wise is actually true.\n🌳 When you forget God's generosity, His boundaries can start to look cruel.\n📖 Trusting God's word is not small; it is the center of faithful life.\n⚠️ Temptation often sells independence as freedom.\nThis passage helps us recognize the voice of temptation. Anything that makes God look stingy, His word look unreliable, and sin look harmless is following the old pattern from the garden.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    startVerse: 6,
    endVerse: 7,
    reference: "Genesis 3:6-7",
    title: "Shame Enters The Story",
    icon: "📖",
    summary: "Adam and Eve eat from the tree, and the promised freedom turns into shame.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "The temptation moves from conversation to action. Eve sees the fruit as good, delightful, and desirable, then she eats and gives some to Adam, who is with her.\n👀 Sin looks attractive before it shows its cost.\n🤐 Adam is present, but he does not guard, lead, or speak God's word into the moment.\n🍎 They both eat, so both share responsibility for the rebellion.\n🫣 Their eyes open, but not into the freedom the serpent promised; they open into shame.\nThe first result of sin is not power. It is hiding, covering, and the painful feeling of being exposed.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Good For Food\"\nThe fruit appears useful and harmless. That matters because sin does not always look ugly at first.\nTemptation often attaches itself to something that seems reasonable, practical, or beneficial.\nGenesis is showing that human desire can misread reality when it is separated from God's word.",
          "\"A Delight To The Eyes\"\nThe fruit is visually appealing. The problem is not that beauty is bad; God filled the garden with beautiful things.\nThe problem is desire moving outside trust and obedience.\nSomething can look good and still lead away from God.",
          "\"Desired To Make One Wise\"\nWisdom is good when it comes from God. Proverbs will later tell people to seek wisdom like treasure.\nBut this is wisdom seized apart from God. It is an attempt to gain moral independence instead of receiving instruction.\nThat is why the tree is so serious. It represents the human desire to define good and evil without the Creator.",
          "\"She Also Gave Some To Her Husband\"\nAdam is not far away in this scene. The text says he is with her.\nThat means Adam's silence matters. He was given the command first, but he does not protect the garden or his wife from the lie.\nSin spreads through passive failure as well as active choice.",
          "\"They Knew That They Were Naked\"\nIn Genesis 2, nakedness meant openness without shame. After sin, the same nakedness feels threatening.\nNothing about their bodies changed, but their relationship to God, each other, and themselves changed.\nShame enters because innocence has been lost.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "👀 Sin can look desirable before it destroys.\nThe fruit appears good, beautiful, and wise.\nThat is part of the danger.\nTemptation often hides the end of the story.",
          "🤐 Silence can become failure.\nAdam is with Eve, but he does not speak or guard.\nPassivity matters in Genesis 3.\nLove should protect truth, not stand quietly while lies grow.",
          "🍎 Disobedience is shared responsibility.\nEve eats and Adam eats.\nThe chapter does not let either one become innocent.\nBoth step outside God's command.",
          "🫣 Sin produces shame.\nThe serpent promised opened eyes and freedom.\nThe first thing they experience is exposure.\nSin never gives exactly what it advertises.",
          "🧵 Humans try to cover what sin exposes.\nThey sew fig leaves together.\nThat is the first human attempt to manage shame without God.\nThe rest of Scripture will show that only God can truly cover sin.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 3:6-7 matters because it explains why shame feels so deeply human. The first sinners immediately try to cover themselves.\n👀 Desire needs truth, because not everything attractive is good.\n🤐 Silence in the face of temptation can become part of the problem.\n🫣 Shame makes people hide before anyone even asks a question.\n🧵 Self-made coverings can manage appearances, but they cannot heal the heart.\nThis passage helps us be honest about sin's pattern. It promises more than it gives, takes more than it admits, and leaves people trying to cover what only God can restore.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    startVerse: 8,
    endVerse: 13,
    reference: "Genesis 3:8-13",
    title: "God Comes Looking",
    icon: "📖",
    summary: "God seeks Adam and Eve in their hiding and exposes the blame that sin creates.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "After Adam and Eve sin, they hear God in the garden and hide. The relationship that once had openness now has fear.\n🌿 God comes into the garden, and the sinners hide from the One who gave them life.\n❓ God asks, \"Where are you?\" not because He lacks information, but because He is drawing Adam into confession.\n😨 Adam says he was afraid because he was naked.\n👉 When confronted, Adam blames Eve and even hints at blaming God.\n🐍 Eve blames the serpent, and nobody simply says, \"I sinned.\"\nThis scene shows that sin does more than break a rule. It breaks honesty, trust, courage, and closeness.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"They Hid Themselves\"\nThis is the first hiding in Scripture. Before sin, Adam and Eve were naked and unashamed; after sin, they hide from God.\nHiding is one of shame's first instincts. It says, \"If I can stay unseen, maybe I can stay safe.\"\nBut hiding from God never heals what is broken. It only shows how broken trust has become.",
          "\"Where Are You\"\nGod's question is not about geography. He knows where Adam is.\nThe question is an invitation to step out of hiding and tell the truth.\nThat makes this moment merciful. Judgment is coming, but God begins by seeking the sinners.",
          "\"I Was Afraid\"\nFear now enters the human relationship with God. The God who gave Adam breath is now the God Adam avoids.\nThat is one of sin's deepest damages. It makes the presence of God feel threatening instead of life-giving.\nThe rest of Scripture will keep answering this fear with God's mercy and rescue.",
          "\"The Woman Whom You Gave\"\nAdam blames Eve, but his words also point back toward God. It is as if he says, \"This happened because of the woman You gave me.\"\nThat is how blame works. It avoids honest confession by shifting responsibility outward.\nThe first broken human relationship after sin includes accusation.",
          "\"The Serpent Deceived Me\"\nEve tells part of the truth: she was deceived. But the statement still shifts responsibility away from her own choice.\nGenesis does not deny deception, but it also does not remove human responsibility.\nBeing tempted explains the battle; it does not erase the disobedience.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🌿 God seeks sinners before they seek Him.\nAdam and Eve hide, but God comes looking.\nThat is mercy before judgment.\nThe rescue story begins with God moving toward the guilty.",
          "❓ God's questions invite truth.\nGod asks where Adam is and what he has done.\nHe is not confused.\nHe is drawing hidden sin into the light.",
          "😨 Sin turns closeness into fear.\nAdam once lived openly before God.\nNow he hides from God's presence.\nSin damages our sense of safety with the One who made us.",
          "👉 Blame is one of sin's first languages.\nAdam blames Eve and hints at blaming God.\nEve blames the serpent.\nNobody rushes to confession.",
          "🧭 Confession is different from explanation.\nAdam and Eve explain what happened, but they do not fully own it.\nTrue repentance does not only describe events.\nIt tells the truth about personal responsibility.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 3:8-13 matters because it shows the human instinct to hide and blame. That pattern did not start with us, but it still lives in us.\n🌿 God is not absent when people are hiding.\n❓ His questions can be mercy because they call us back into truth.\n👉 Blame may protect pride for a moment, but it cannot restore relationship.\n😨 Fear grows when sin stays hidden.\nThis passage helps us see why honesty with God matters. God already knows the truth, but He invites us out of hiding because truth is where healing begins.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    startVerse: 14,
    endVerse: 19,
    reference: "Genesis 3:14-19",
    title: "Judgment And The First Promise",
    icon: "📖",
    summary: "God judges the serpent, the woman, and the man, but He also gives the first promise of victory over evil.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "God now speaks judgment, but the first judgment also contains hope. The serpent is cursed, and God announces conflict between the serpent and the woman, and between their offspring.\n🐍 The serpent is judged as the deceiver who brought death into the garden.\n🌱 God promises a future offspring of the woman who will crush the serpent's head.\n💔 The woman will experience pain and tension where there was meant to be fruitfulness and partnership.\n🌾 The man will experience painful toil as the ground resists him.\n⚰️ Death is named clearly: humanity will return to the dust.\nThis section is heavy, but it is not hopeless. Before Adam and Eve leave Eden, God is already speaking about evil's defeat.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Cursed Are You\"\nThe serpent receives a direct curse. Adam and Eve face consequences, but the serpent is addressed as the enemy.\nThis shows that God does not treat deception as a small thing. Evil is judged by the Creator.\nThe curse begins the Bible's long story of conflict between God and the powers that oppose His life.",
          "\"Her Offspring\"\nThis phrase becomes one of the most important hopes in Genesis. A child from the woman's line will one day defeat the serpent.\nAt this point, the promise is not fully explained. It is like a seed planted early in the story.\nChristians have long seen Genesis 3:15 as the first gospel promise, pointing forward to Jesus.",
          "\"He Shall Bruise Your Head\"\nA head wound against the serpent means final defeat. The serpent will wound, but he will not win.\nThat matters because the promise comes immediately after sin enters. God does not wait centuries to hint at rescue.\nJudgment and mercy appear together in the same scene.",
          "\"Pain\"\nPain enters the areas most connected to life, family, work, and fruitfulness.\nThe woman will experience pain connected to childbearing and relational tension.\nThis is not God calling pain good. It is describing how sin damages the good design.",
          "\"By The Sweat Of Your Face\"\nWork existed before sin, but now work becomes painful and resistant.\nThe ground that was meant to be cultivated will now produce thorns and thistles.\nThe curse does not make work meaningless, but it makes work frustrating.",
          "\"To Dust You Shall Return\"\nAdam was formed from dust, and now death means he will return to dust.\nThis is the fulfillment of God's warning in Genesis 2.\nDeath is not presented as natural beauty here; it is the consequence of sin and an enemy in God's good world.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🐍 God judges evil.\nThe serpent is not allowed to deceive without answer.\nGod names evil and curses it.\nThis matters because injustice is never invisible to God.",
          "🌱 God promises rescue immediately.\nGenesis 3:15 gives hope before Adam and Eve leave the garden.\nThe story is broken, but it is not abandoned.\nGod speaks promise into judgment.",
          "💔 Sin damages relationships.\nThe woman and man will experience tension where there should have been trust and partnership.\nSin does not stay private.\nIt bends the way people relate to one another.",
          "🌾 Sin makes work painful.\nWork itself was good before the fall.\nBut now the ground resists, and labor becomes frustrating.\nThe curse touches ordinary life.",
          "⚰️ Death enters as judgment.\nGod warned that disobedience would bring death.\nNow that warning becomes reality.\nThe rest of Scripture will move toward God's answer to death.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 3:14-19 matters because it explains both the pain of the world and the hope of the Bible. The world is cursed, but the promise is already alive.\n🐍 Evil is real, but it is not equal to God.\n🌱 Hope begins before the sinners can fix anything.\n💔 Relationship pain is part of the fall, not part of the original design.\n🌾 Frustrating work is not proof your life is meaningless.\nThis passage helps us understand why life feels beautiful and painful at the same time. The curse is real, but so is the promise that evil will not have the final word.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    startVerse: 20,
    endVerse: 24,
    reference: "Genesis 3:20-24",
    title: "Mercy Outside Eden",
    icon: "📖",
    summary: "God clothes Adam and Eve, sends them out of Eden, and guards the way to the tree of life.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "The chapter ends with both mercy and exile. Adam names his wife Eve, God clothes them, and then they are sent out of the garden.\n👩 Eve's name is connected to life, which shows hope after judgment.\n🧥 God makes garments of skin, giving them a better covering than their fig leaves.\n🚪 Adam and Eve are sent out of Eden, so sin brings real loss.\n🌳 The tree of life is guarded, keeping humanity from living forever in a broken condition.\n🔥 Cherubim and a flaming sword mark the seriousness of the separation.\nThis is not the end of the Bible's story. Eden closes, but God's promise remains open.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Eve\"\nAdam names his wife Eve because she will be the mother of all living. That is a surprising note of hope after judgment.\nDeath has entered, but life will continue.\nThis name quietly connects back to the promise that offspring from the woman will matter in the battle against the serpent.",
          "\"Garments Of Skin\"\nAdam and Eve made fig leaves, but God provides a stronger covering.\nThe text does not explain every detail, but it clearly shows God caring for guilty people.\nThis becomes a pattern in Scripture: human coverings are not enough, and God provides what shame cannot make for itself.",
          "\"Like One Of Us\"\nGod says the man has become like one of us in knowing good and evil. This does not mean humanity became divine.\nIt means they have entered moral knowledge through rebellion instead of trust.\nThey now know evil by experience, and that knowledge brings ruin rather than freedom.",
          "\"Tree Of Life\"\nThe tree of life represents ongoing life with God. After sin, access to it is blocked.\nThat is judgment, but also mercy. Living forever in a corrupted state would not be salvation.\nThe Bible will bring the tree of life back in Revelation, when God restores what sin broke.",
          "\"He Drove Out The Man\"\nThis is painful language. Eden is no longer humanity's home.\nSin brings exile, distance, and loss.\nBut exile is not abandonment. God sends them out clothed and with a promise still alive.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "👩 Hope continues after judgment.\nEve's name points to life.\nThe story does not end with death alone.\nGod keeps the human family moving forward.",
          "🧥 God covers shame better than people can.\nFig leaves were Adam and Eve's covering.\nGarments of skin were God's provision.\nThis shows mercy in the middle of consequences.",
          "🚪 Sin brings real loss.\nAdam and Eve are sent out of Eden.\nThe fall is not symbolic only; it changes human life deeply.\nAccess to the garden is lost.",
          "🌳 Eternal life in sin would not be mercy.\nThe tree of life is guarded.\nThat prevents humanity from living forever in a broken state.\nGod's judgment is severe, but it is not cruel.",
          "🔥 The way back must be opened by God.\nCherubim guard the garden.\nHumans cannot force their way back into Eden.\nThe rest of the Bible will show God making the way through redemption.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 3:20-24 matters because it shows that consequences and mercy can exist together. Adam and Eve lose Eden, but they do not lose God's care.\n🧥 God covers what human effort cannot heal.\n🚪 Some consequences are real even when God is merciful.\n🌳 God blocks the tree of life because broken immortality would not be rescue.\n🔥 The closed garden makes us long for the way back to God.\nThis passage helps us understand the rest of Scripture. The Bible is not only about guilty people trying to return to paradise; it is about God making a way back to Himself.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 4,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 4:1-7",
    title: "Sin Moves Into The Family",
    icon: "📖",
    summary: "Cain and Abel bring offerings, and God warns Cain before anger becomes violence.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis 4 moves from the garden into the family. Adam and Eve have sons, and the brokenness from Genesis 3 begins showing up between brothers.\n👶 Cain and Abel are born, showing that life continues outside Eden.\n🎁 Both brothers bring offerings to God, but Abel's offering is received and Cain's is not.\n😡 Cain becomes angry, and his face falls.\n❓ God asks Cain questions that invite him to examine his heart.\n🚪 God warns that sin is crouching at the door, ready to master him.\nThis passage shows that sin does not stay in one moment. It grows in the heart before it becomes visible in action.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Cain And Abel\"\nThese are the first children named in the Bible. Their story shows that the fall immediately affects family life.\nCain works the ground, and Abel keeps sheep. Both are living in the world outside Eden.\nThe first family story after the fall becomes a story about worship, anger, warning, and violence.",
          "\"An Offering\"\nBoth brothers bring something to the Lord. The passage does not answer every question about the offering system yet.\nWhat it does show clearly is that worship exposes the heart.\nCain's reaction becomes the window into what is happening inside him.",
          "\"Cain Was Very Angry\"\nCain's anger is the turning point. The issue is not only that his offering was not regarded; it is what happens inside him afterward.\nAnger becomes dangerous when it refuses correction.\nGod addresses Cain before Cain acts, which shows mercy in the warning.",
          "\"Why Has Your Face Fallen\"\nGod questions Cain the way He questioned Adam. The question invites Cain to stop and look honestly at his condition.\nA fallen face shows the inner anger has become visible.\nGod is giving Cain a chance to bring the hidden thing into the light.",
          "\"Sin Is Crouching At The Door\"\nThis is one of the strongest pictures of sin in Genesis. Sin is pictured like a predator waiting at the entrance.\nIt desires Cain, but Cain must rule over it.\nThat means sin is not passive. If it is not resisted, it seeks mastery.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "👨‍👩‍👦 Sin enters family life quickly.\nGenesis moves from Eden to brothers.\nThe first family outside the garden is already dealing with anger and rivalry.\nBrokenness spreads into ordinary relationships.",
          "🎁 Worship reveals the heart.\nBoth brothers bring offerings.\nCain's response shows that the deeper issue is not only the gift, but the heart behind it.\nGod cares about worshipers, not only worship acts.",
          "😡 Anger must be addressed early.\nGod warns Cain before the murder happens.\nThat means anger is not harmless just because it is still inside.\nUnruled anger can grow into destruction.",
          "🚪 Sin wants mastery.\nGod describes sin as crouching and desiring Cain.\nThis makes sin personal and aggressive in its effect.\nPeople must not treat it casually.",
          "🛑 Warning is mercy.\nGod could have let Cain run straight into judgment.\nInstead, He speaks first.\nA warning from God is an invitation to turn back.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 4:1-7 matters because it teaches that sin often grows before anyone else sees it. Cain's murder begins with anger that he refuses to master.\n😡 Your inner life matters to God before it becomes an outer action.\n🚪 Sin does not stay politely outside; it wants rule.\n❓ God's questions can interrupt a dangerous path.\n🛑 A warning is grace when it gives you time to turn.\nThis passage helps us take anger seriously without pretending we are helpless. God tells Cain the truth before the damage is done, and that same mercy calls people to deal with sin early.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 4,
    startVerse: 8,
    endVerse: 16,
    reference: "Genesis 4:8-16",
    title: "The First Murder",
    icon: "📖",
    summary: "Cain kills Abel, lies to God, and is judged, yet God limits revenge against him.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Cain ignores God's warning and kills his brother Abel. The first recorded human death after Eden is not old age; it is murder.\n🩸 Abel's blood cries from the ground, showing that hidden violence is not hidden from God.\n❓ God asks Cain where his brother is, giving Cain a chance to tell the truth.\n😐 Cain answers coldly, \"Am I my brother's keeper?\"\n🌾 Cain is cursed from the ground, the very ground that received Abel's blood.\n🛡️ God marks Cain so revenge does not multiply without limit.\nThis scene shows how quickly sin moves from distrust to shame, from shame to anger, and from anger to violence.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Cain Rose Up Against His Brother\"\nThe language is direct and painful. Brother kills brother.\nGenesis wants us to feel the horror of violence inside the first family.\nThe sin crouching at the door has now mastered Cain.",
          "\"Where Is Abel Your Brother\"\nGod's question echoes His question to Adam in Genesis 3. Again, God confronts sin with a question.\nHe is not asking because He lacks knowledge. He is drawing Cain into responsibility.\nCain's answer will show how hard his heart has become.",
          "\"Am I My Brother's Keeper\"\nCain's reply is cold, defensive, and evasive. He refuses responsibility for the brother he has killed.\nThe question is ugly because the answer should be yes. Humans are meant to care for one another.\nSin turns brotherhood into indifference.",
          "\"Your Brother's Blood Is Crying\"\nAbel is dead, but his blood has a voice before God.\nThis means injustice does not disappear just because the victim cannot speak.\nGod hears what the ground has received.",
          "\"A Fugitive And A Wanderer\"\nCain's judgment fits his sin. He is driven from stable life and becomes restless.\nThe ground will no longer yield strength to him, and he will wander.\nSin promised mastery, but it leaves Cain displaced and afraid.",
          "\"The Lord Put A Mark On Cain\"\nGod judges Cain, but He also limits vengeance against him.\nThis is mercy, not approval.\nGod refuses to let violence multiply without restraint.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🩸 Sin can escalate quickly.\nCain moves from anger to murder.\nThe warning was real because the danger was real.\nUnmastered sin does not stay small.",
          "❓ God confronts violence.\nGod asks Cain where Abel is.\nHe brings hidden sin into the open.\nNo act of violence is invisible to Him.",
          "👥 People are responsible for one another.\nCain asks if he is his brother's keeper.\nGenesis lets us hear how wrong that question is.\nHuman life is not meant to be treated with indifference.",
          "🌾 Sin affects our relationship to the ground.\nCain is cursed from the ground that received Abel's blood.\nGenesis keeps showing that human sin touches creation.\nThe world bears the weight of human violence.",
          "🛡️ God restrains revenge.\nCain is judged, but God marks him for protection.\nGod does not let justice become endless retaliation.\nMercy limits the spread of violence.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 4:8-16 matters because it shows where unaddressed sin can lead. Cain's anger becomes violence, and his violence becomes denial.\n🩸 God hears the blood of victims, even when people try to bury the truth.\n👥 You are your brother's keeper more than Cain wanted to admit.\n🌾 Violence damages more than one person; it wounds families, land, and future life.\n🛡️ God's mercy can restrain judgment without pretending sin is small.\nThis passage helps us see that God takes both justice and mercy seriously. He confronts Cain's murder, but He also stops revenge from becoming the next chapter.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 4,
    startVerse: 17,
    endVerse: 24,
    reference: "Genesis 4:17-24",
    title: "A Broken World Still Builds",
    icon: "📖",
    summary: "Cain's line builds culture and technology, but Lamech shows violence becoming proud.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Cain's family line begins to develop cities, livestock work, music, and tools. Human creativity continues, even outside Eden.\n🏙️ Cain builds a city, showing the beginning of organized human settlement.\n🐄 Jabal is connected with livestock and tent-dwelling life.\n🎵 Jubal is connected with music and instruments.\n🛠️ Tubal-cain is connected with bronze and iron tools.\n⚔️ Lamech boasts about violence, showing that culture can grow while sin grows too.\nThis section is honest about humanity. People can build beautiful and useful things, but human progress does not automatically fix the heart.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Built A City\"\nCain becomes associated with city-building. That shows human beings still carry creativity, order-making, and culture-building ability.\nEven after judgment, the image of God is not erased.\nBut the city also reminds us that building something impressive does not mean the heart is healed.",
          "\"Father Of Those Who Dwell In Tents And Have Livestock\"\nJabal represents a way of life connected to animals, movement, provision, and work.\nGenesis is showing the development of culture and skills through family lines.\nOrdinary human crafts and labor matter in the story.",
          "\"Father Of All Those Who Play The Lyre And Pipe\"\nJubal is connected with music. That is a beautiful detail in a chapter full of pain.\nEven in a broken world, humans make art and sound and beauty.\nSin damages creation, but it does not remove the human ability to create.",
          "\"Forger Of All Instruments Of Bronze And Iron\"\nTubal-cain is connected with metalwork and tools. This points to technology, craft, and skill.\nTools can serve life, work, and creativity.\nBut in a violent world, tools can also become weapons, which makes Lamech's speech feel even darker.",
          "\"I Have Killed A Man\"\nLamech does not hide violence like Cain did. He boasts about it.\nThat shows sin becoming bolder across generations.\nWhat Cain tried to avoid admitting, Lamech turns into a song of pride.",
          "\"Seventy-Sevenfold\"\nLamech twists the idea of protection into revenge. God limited vengeance against Cain, but Lamech multiplies vengeance as a threat.\nThis shows how mercy can be distorted by a violent heart.\nThe line of Cain is building culture, but it is also normalizing pride and violence.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🏙️ Culture can develop in a broken world.\nCities, livestock, music, and tools appear in Cain's line.\nHuman creativity continues after sin.\nThe image of God is damaged, but not erased.",
          "🎵 Beauty can still exist outside Eden.\nMusic appears in a family line marked by brokenness.\nThat is a realistic picture of the world.\nBeauty and sin often exist side by side.",
          "🛠️ Human skill is not the same as holiness.\nCain's descendants develop useful tools and crafts.\nBut progress in skill does not automatically mean progress in character.\nThe heart still needs redemption.",
          "⚔️ Violence can become a source of pride.\nLamech boasts about killing.\nSin has moved from hiding to bragging.\nThat is a frightening development.",
          "🧭 Civilization cannot save humanity by itself.\nCities, tools, music, and work are good gifts.\nBut none of them removes sin.\nGenesis shows the need for deeper rescue than human progress can provide.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 4:17-24 matters because it shows that human progress is complicated. People can create music, cities, tools, and systems while still carrying violence in the heart.\n🏙️ Building something impressive does not automatically make people righteous.\n🎵 Beauty in a broken world is real, and it is still a gift.\n🛠️ Skill and technology need wisdom, humility, and moral direction.\n⚔️ A culture can become proud of what it should repent of.\nThis passage helps us look at the world honestly. Human beings are gifted and broken at the same time, so culture can be beautiful and dangerous without God's rescue.",
        ],
      },
    ],
  },
  {
    book: "genesis",
    chapter: 4,
    startVerse: 25,
    endVerse: 26,
    reference: "Genesis 4:25-26",
    title: "Hope Keeps Moving",
    icon: "📖",
    summary: "God gives another son, Seth, and people begin to call on the name of the Lord.",
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [
          "Genesis 4 does not end with Lamech's violence. The story returns to Adam and Eve, and another son is born.\n👶 Eve names him Seth because God has appointed another offspring in place of Abel.\n🌱 That matters because Abel is dead and Cain is exiled, but the promise from Genesis 3 has not died.\n👪 Seth has a son named Enosh, showing the family line continuing.\n🙏 Then people begin to call on the name of the Lord.\n✨ After shame, exile, murder, and violence, worship still rises.\nThis ending is small, but it is powerful. Genesis is teaching that God keeps hope moving through ordinary births, fragile families, and people who call on Him.",
        ],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: [
          "\"Another Offspring\"\nEve sees Seth as appointed by God after Abel's death. This connects back to the promised offspring in Genesis 3:15.\nThe family has suffered death and exile, but God has not let the line of hope disappear.\nThat phrase keeps the reader watching for how God's promise will continue.",
          "\"Instead Of Abel\"\nAbel's death mattered. Seth is not a replacement in the sense that Abel did not count.\nThe phrase means God is continuing the story after real grief.\nGenesis does not ignore loss, but it also does not let loss be the final word.",
          "\"Seth\"\nSeth's name is connected with being appointed or granted. Eve recognizes God's hand in this birth.\nThat is beautiful because Eve is living outside Eden after enormous pain.\nYet she can still name God's provision.",
          "\"Enosh\"\nEnosh's name is connected to humanity, frailty, or mortal man. It reminds readers that human life is weak and dependent.\nThat fits the next line about calling on the Lord.\nWeak people need the strong name of God.",
          "\"Call Upon The Name Of The Lord\"\nThis phrase points to worship, prayer, dependence, and public turning toward God.\nAfter a chapter full of sin, this ending matters deeply.\nPeople are not only building cities and boasting about violence; some are calling on the Lord.",
        ],
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: [
          "🌱 God's promise keeps moving.\nAbel is dead and Cain is exiled, but hope does not die.\nGod appoints another offspring.\nThe promise from Genesis 3 continues.",
          "😭 Hope does not erase grief.\nSeth is given after Abel's murder.\nThe text remembers Abel even while showing new life.\nGod's mercy meets real loss, not pretend loss.",
          "👶 God works through ordinary births.\nGenesis often carries huge promises through simple family lines.\nA child is born, and the story moves forward.\nGod can work through quiet beginnings.",
          "🙏 Worship rises in a broken world.\nPeople begin to call on the name of the Lord.\nThat means sin and violence do not have the only voice.\nDependence on God is still alive.",
          "✨ Day 2 ends with hope, not only damage.\nGenesis 3-4 show sin, shame, exile, murder, and violence.\nBut the final note is not Lamech's boast.\nIt is people calling on the Lord.",
        ],
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [
          "Genesis 4:25-26 matters because it shows that God keeps the promise alive after terrible failure. The chapter could have ended with violence, but it ends with worship.\n🌱 God's hope can continue through families that have known deep pain.\n😭 New mercy does not mean old grief never mattered.\n🙏 Calling on the Lord is still possible outside Eden.\n✨ The story is broken, but God is not finished.\nThis ending gives Day 2 its hope. The garden is closed, Abel is gone, Cain is wandering, and Lamech is boasting, but people still call on the name of the Lord.",
        ],
      },
    ],
  },
];

export function getBibleReaderStudySections(book: string | null | undefined, chapter: number | null | undefined) {
  const normalizedBook = normalizeBook(book);
  const chapterNumber = Number(chapter);
  return BIBLE_READER_STUDY_SECTIONS.filter(
    (section) => section.book === normalizedBook && section.chapter === chapterNumber,
  );
}
