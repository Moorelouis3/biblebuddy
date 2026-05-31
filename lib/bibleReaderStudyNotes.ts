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

type ReaderStudySectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  summary: string;
  what: string;
  phrases: string[];
  truths: string[];
  why: string;
};

function makeGenesisStudySection(section: ReaderStudySectionInput): BibleReaderStudySection {
  return {
    book: "genesis",
    chapter: section.chapter,
    startVerse: section.startVerse,
    endVerse: section.endVerse,
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.summary,
    categories: [
      {
        id: "what-is-happening",
        icon: "🧭",
        title: "What Is Happening Here?",
        content: [section.what],
      },
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: section.phrases,
      },
      {
        id: "key-truths",
        icon: "🔑",
        title: "Key Truths",
        content: section.truths,
      },
      {
        id: "why-this-matters",
        icon: "❤️",
        title: "Why This Matters",
        content: [section.why],
      },
    ],
  };
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
          "\"Did God Really Say\"\nThis is the first question recorded from the serpent, and it is aimed directly at God's word. He does not begin by saying God is not real. He begins by making God's command sound uncertain.\nThat matters because temptation often loosens confidence before it pushes disobedience. If God's word becomes blurry, obedience starts to feel negotiable.\nThe question also sounds thoughtful, almost harmless, which is part of the danger. Eve is not being invited to worship another god yet; she is being invited to reconsider whether the true God can be trusted.\nA helpful Bible-reading tip: watch how often sin begins with a distorted question, not an obvious attack.",
          "\"You Shall Not Eat Of Any Tree\"\nThe serpent exaggerates God's command. God gave Adam freedom to eat from every tree except one, but the serpent talks as if God has forbidden everything.\nThis is one of temptation's oldest tricks: shrink God's generosity and magnify His boundary. The garden is full of gifts, but the serpent trains Eve's attention on the one limit.\nGod's commands are easiest to resent when we forget the context of His goodness. The forbidden tree was surrounded by allowed trees.\nThis phrase teaches us to ask, \"Am I seeing God's whole generosity, or only staring at the one thing He has said no to?\"",
          "\"You Will Not Surely Die\"\nHere the serpent directly contradicts God's warning. At first he questions God; now he denies God.\nThis is not a small misunderstanding anymore. It is a rival message about life and death. God says rebellion brings death, but the serpent says rebellion has no real consequence.\nThat makes this the first false gospel in the Bible. It offers life without trust, freedom without obedience, and safety without God.\nThe rest of Genesis will prove God's word true. Death will enter the family story, first through shame and exile, then through Abel's murder, then through the repeated deaths in Genesis 5.",
          "\"Your Eyes Will Be Opened\"\nThe serpent promises a higher kind of sight. He makes disobedience sound like awakening, maturity, and hidden knowledge.\nThere is a cruel half-truth here. Their eyes will open, but not in the way they hope. They will not wake up into freedom; they will wake up into shame.\nTemptation often advertises insight while hiding the cost of that insight. It says, \"You will finally know,\" but it does not say, \"You will also lose innocence, peace, and trust.\"\nGenesis teaches that not every opened door leads to life, and not every opened eye sees truth clearly.",
          "\"Knowing Good And Evil\"\nThis phrase is about moral authority, not just learning facts. Adam and Eve already knew good by living in God's good world and hearing God's good command.\nThe temptation is to know good and evil independently, as if humans can define reality without receiving it from God. It is the desire to move from trusting God's wisdom to becoming self-appointed judges.\nThat is why this phrase still feels so modern. Every age is tempted to say, \"I will decide good and evil for myself.\"\nGenesis says that road does not make humans more alive. It cuts them off from the God who is life.",
          "\"You Will Be Like God\"\nThis is the heart of the temptation. Adam and Eve were already made in God's image, but the serpent tempts them to reach for God-likeness on their own terms.\nThe lie works because it sounds close to something true. Humans really are meant to reflect God. But image-bearing is received as a gift, not seized as a replacement for God.\nThe serpent makes rebellion sound like growth, freedom, and maturity. He presents dependence on God as childish and independence from God as wise.\nThis is why the fall is so serious: humanity tries to become like God by distrusting God, and that breaks the very relationship that made them fully alive.",
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
          "\"Good For Food\"\nThe fruit appears useful and harmless. That matters because sin does not always look ugly at first.\nEve sees something practical: food. Temptation often attaches itself to a real appetite or a normal human desire, then pulls that desire outside trust in God.\nThe problem is not that food is bad. God filled the garden with food. The problem is desire judging reality without listening to God's word.\nGenesis is teaching that something can look useful and still be spiritually dangerous if God has said no.",
          "\"A Delight To The Eyes\"\nThe fruit is visually appealing. The problem is not beauty itself, because God made trees that were pleasant to the sight back in Genesis 2.\nThe danger is beauty separated from obedience. Eve's eyes are now evaluating the tree through the serpent's lie instead of through God's command.\nThat gives us a practical Bible-study insight: the senses are good gifts, but they are not meant to be our highest authority.\nSomething can look beautiful and still lead away from God if desire is no longer guided by truth.",
          "\"Desired To Make One Wise\"\nWisdom is good when it comes from God. Later books like Proverbs will tell people to seek wisdom like treasure.\nBut this is wisdom seized apart from God. It is an attempt to gain moral independence instead of receiving instruction from the Creator.\nThat is why the tree is so serious. It represents the human desire to define good and evil without God.\nThere is an aha moment here: the Bible is not anti-wisdom. It is against a kind of wisdom that begins by distrusting God.",
          "\"She Took Of Its Fruit And Ate\"\nThe fall moves from listening, to looking, to taking, to eating. Genesis slows the moment down so we can see sin becoming action.\nTaking is important language in the Bible. Sometimes God gives, and humans receive. But here the human reaches for what God has not given.\nThe act may look small from the outside. It is just fruit. But spiritually, it is a declaration that the creature will no longer live under the Creator's word.\nThis is why sin cannot be measured only by the size of the object involved. It must be measured by the relationship it breaks.",
          "\"She Also Gave Some To Her Husband\"\nAdam is not far away in this scene. The text says he is with her.\nThat means Adam's silence matters. He was given the command first, but he does not guard the garden, speak truth, or protect the relationship from the lie.\nGenesis is not letting Adam off the hook. Sin spreads through passive failure as well as active choice.\nThis phrase teaches that love should not stand quietly while falsehood grows.",
          "\"They Knew That They Were Naked\"\nIn Genesis 2, nakedness meant openness without shame. After sin, the same nakedness feels threatening.\nNothing about their bodies changed, but their relationship to God, each other, and themselves changed. Innocence has been lost, and self-protection begins.\nThat is why shame is deeper than embarrassment. Shame is the feeling that being fully seen is no longer safe.\nGenesis shows shame entering immediately after sin because sin breaks the trust that made openness possible.",
          "\"Fig Leaves\"\nThe fig leaves are the first human-made covering. Adam and Eve try to manage exposure with whatever they can make quickly.\nThis is a powerful picture because people still do this. We cover with image, excuses, performance, humor, denial, success, or blame.\nThe leaves may hide their bodies for a moment, but they cannot heal the relationship with God.\nLater in the chapter, God will make a better covering, which shows that human coverings cannot do what divine mercy can.",
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
  ...[
    makeGenesisStudySection({
      chapter: 5,
      startVerse: 1,
      endVerse: 5,
      reference: "Genesis 5:1-5",
      title: "Death Moves Through The Generations",
      icon: "🧬",
      summary: "Adam's family line continues, but the sentence of death now enters the family record.",
      what: `Genesis 5 may look like a list of names, but it is teaching what life is like after Eden. People are still made in God's image, families still grow, and the blessing of life still moves forward, but death now travels through the family line too.
🧬 The chapter reaches back to creation and reminds us that humanity still carries God-given dignity.
👶 Adam has a son in his own likeness, showing both family resemblance and the fallen condition now passed through human history.
⏳ Adam lives a very long life, but long life is not eternal life.
⚰️ The section ends with the words "and he died," proving that God's warning in Eden was real.
This is not boring family history. Genesis is slowing us down so we feel the weight of death while still noticing that God keeps the human story moving.`,
      phrases: [
        `🧬 Book Of The Generations
This phrase introduces a family record. In Genesis, genealogies are not filler; they show how the story moves from one generation to the next.
After the chaos of Genesis 3 and 4, this line tells us God has not lost track of the family. Names matter, lives matter, and history is still being carried forward.
The Bible often uses family lines to show promise moving quietly through ordinary people.`,
        `👤 In The Likeness Of God
Genesis reminds us that humans were made in God's likeness before it talks about Adam's descendants. That means sin has damaged humanity, but it has not erased human worth.
This matters for the flood story because judgment is not coming on worthless creatures. It is coming on image-bearers who have become corrupt.
Human beings are valuable, and that makes sin more tragic, not less.`,
        `⚰️ And He Died
This phrase becomes the drumbeat of Genesis 5. Adam lived 930 years, but the final word over his earthly life is still death.
The long ages can sound impressive, but Genesis is not mainly impressed by the numbers. It wants us to hear that the Eden warning came true.
Sin promised freedom, but it brought mortality into the family record.`,
      ],
      truths: [
        `🧬 Human dignity remains after the fall.
Genesis still connects humanity to God's likeness.
Sin changes the human condition, but it does not make people worthless.
That is why human life should still be treated with seriousness and honor.`,
        `⚰️ Death is now part of human history.
Genesis 5 shows the result of Genesis 3.
The curse is not an idea anymore; it is showing up in fathers, sons, years, and funerals.
The Bible wants us to feel that death is an enemy, not a normal friend.`,
        `🌱 God keeps the story moving.
Even though death is repeated, births are repeated too.
Children are born, names are remembered, and the line continues.
God is preserving the story even in a dying world.`,
      ],
      why: `Genesis 5:1-5 matters because it teaches us to read genealogies as theology, not just lists. This family record shows dignity, damage, and death all at once.
🧬 You are not random; human life still carries God-given worth.
⚰️ Death is real, and the Bible does not pretend it is small.
👶 God can carry hope through ordinary family lines.
📖 Slow passages can teach deep truths if we pay attention.
This section helps us understand why the rest of the Bible keeps moving toward rescue. The problem is not only bad choices; the problem is death spreading through the human family.`,
    }),
    makeGenesisStudySection({
      chapter: 5,
      startVerse: 6,
      endVerse: 20,
      reference: "Genesis 5:6-20",
      title: "The Same Sentence Keeps Falling",
      icon: "🔔",
      summary: "Seth's line continues, but the repeated pattern keeps showing that death has entered every generation.",
      what: `This section repeats the rhythm of life after Eden: someone lives, fathers children, has sons and daughters, and dies. The repetition is the point, because Genesis wants the reader to feel death echoing through generations.
📜 Names are preserved, which shows that individual lives are not forgotten.
👶 Children are born, which shows that God's blessing of life has not stopped.
🔔 The same pattern keeps ringing: life, family, years, death.
🌱 Seth's line keeps moving toward Noah, the man who will become central in the flood story.
Nothing dramatic happens on the surface, but the theology is loud. Brokenness is not always explosive; sometimes it is ordinary life lived under the shadow of death.`,
      phrases: [
        `📜 He Lived
Genesis keeps telling us that these people lived real lives. They were not placeholders in a chart.
They had homes, work, families, griefs, hopes, and memories. The Bible gives only a few details, but the repeated phrase reminds us that these were actual human lives.
God's story moves through real people, not abstract symbols.`,
        `👶 Sons And Daughters
The genealogy names one son in the main line, but it also mentions sons and daughters. That detail keeps the family record from feeling too thin.
There were many lives around the named line, even when the Bible focuses on one path.
Genesis is tracing the promise line, but it does not mean the unnamed lives were unimportant.`,
        `🔔 Then He Died
The repeated ending is supposed to wear on us. Again and again, the sentence falls.
This is how Genesis teaches the seriousness of sin without pausing to preach a sermon.
The rhythm itself becomes the lesson: death has entered, and no human lifespan can outrun it.`,
      ],
      truths: [
        `📖 Repetition is teaching.
Genesis repeats the pattern so the reader feels the weight of it.
The Bible often teaches by rhythm, structure, and repeated words.
When a phrase keeps appearing, it is usually asking us to slow down.`,
        `🌱 Hope can move quietly.
There are no big miracles in this section.
Still, God is preserving a line that will lead toward Noah.
Quiet faithfulness matters even when the story feels ordinary.`,
        `⚰️ Long life cannot solve death.
These lifespans are enormous compared to ours.
But each life still ends.
Genesis is showing that humanity needs more than extra years; humanity needs rescue from death itself.`,
      ],
      why: `Genesis 5:6-20 matters because it helps us feel the ordinary weight of a fallen world. Life keeps going, but death keeps interrupting it.
📜 Your life matters even when only a few details are seen.
🔔 Repeated patterns in Scripture are invitations to pay attention.
🌱 God can be working through quiet generations.
⚰️ More time is not the same as eternal life.
This section makes us ready to notice Enoch, because in the middle of the same death rhythm, one man will have a different ending.`,
    }),
    makeGenesisStudySection({
      chapter: 5,
      startVerse: 21,
      endVerse: 24,
      reference: "Genesis 5:21-24",
      title: "Enoch Walked With God",
      icon: "🚶",
      summary: "Enoch interrupts the death pattern by walking with God and being taken by God.",
      what: `Enoch is the surprise in Genesis 5. By now we expect every life to end with "and he died," but Enoch's story interrupts the rhythm.
🚶 Enoch walks with God, which points to closeness, trust, direction, and fellowship.
✨ Instead of saying Enoch died, Genesis says God took him.
🌑 Enoch lives in a world where death is spreading, but his life shows that fellowship with God is still possible.
🕊️ This prepares us for Noah, because Genesis 6 will also say Noah walked with God.
The point is not that Enoch escaped ordinary life by being strange. The point is that he lived near God in a dying world, and God gave his story a different ending.`,
      phrases: [
        `🚶 Walked With God
Walking with God is relationship language. It pictures a life moving with God instead of away from Him.
It does not mean Enoch was sinless or never struggled. It means his life was marked by nearness, trust, and direction.
Genesis is showing that life outside Eden can still include real fellowship with God.`,
        `✨ God Took Him
This phrase breaks the expected pattern. Everyone else dies, but Enoch is taken by God.
The Bible does not explain every detail, and that mystery is part of the power of the line.
It tells us that death is not stronger than God's authority over a person's life.`,
        `🌑 After He Fathered Methuselah
Enoch's walk with God happens in ordinary family life. He has a son, lives years, and has sons and daughters.
That matters because walking with God is not only for isolated religious moments.
Faithfulness can happen in family, work, aging, and daily responsibility.`,
      ],
      truths: [
        `🚶 A person can walk with God in a dying world.
Genesis 5 is full of death, but Enoch is full of fellowship.
The surrounding culture does not have to define a person's direction.
Nearness to God is still possible after Eden.`,
        `✨ God has authority over death.
Enoch's ending shows that death does not have the final power.
Genesis gives a small flash of hope inside a dark chapter.
God can write an ending that breaks the expected pattern.`,
        `🕊️ Enoch prepares us for Noah.
Before Noah walks with God in a corrupt generation, Enoch walks with God in a death-filled genealogy.
Genesis is connecting faithful lives across generations.
Walking with God becomes a major theme in the Noah story.`,
      ],
      why: `Genesis 5:21-24 matters because it shows that faithfulness is possible even when the world feels spiritually heavy. Enoch's life is a quiet but powerful interruption.
🚶 You can walk with God before everything around you is fixed.
🌑 A dark generation does not have to decide your direction.
✨ God is not trapped by the normal ending everyone expects.
🕊️ One faithful life can prepare the way for another.
Enoch's story is short, but it gives hope. Death is loud in Genesis 5, but God is still able to draw people near and keep them for Himself.`,
    }),
    makeGenesisStudySection({
      chapter: 5,
      startVerse: 25,
      endVerse: 32,
      reference: "Genesis 5:25-32",
      title: "Noah Is Born Into A Tired World",
      icon: "👶",
      summary: "Noah's birth brings hope into a world tired from the cursed ground and the spread of death.",
      what: `Genesis 5 ends by moving toward Noah. The chapter has repeated death again and again, but now a child is named with hope.
⏳ Methuselah lives the longest recorded life in Scripture, but even he dies.
😮‍💨 Lamech names Noah with longing for comfort and relief.
🌾 The curse on the ground from Genesis 3 is still being felt generations later.
👶 Noah's birth points forward to preservation through judgment.
Genesis is not saying Noah will remove the curse completely. It is showing that God is preparing a turning point through a child born into a tired world.`,
      phrases: [
        `⏳ Methuselah
Methuselah is famous because of his long life. But Genesis still ends his story with death.
That is an important lesson: even the longest human life is temporary.
The Bible is not trying to make us worship longevity. It is showing that humanity needs something deeper than more years.`,
        `😮‍💨 This Same Shall Comfort Us
Lamech names Noah with hope for relief. The world is tired, work is painful, and the ground is cursed.
This reaches back to Genesis 3, where sin made labor frustrating and painful.
Noah's name carries the ache of generations who are tired of life under the curse.`,
        `🌾 The Ground Which The Lord Has Cursed
Genesis keeps connecting human sin to creation. The ground is not neutral background; it bears the effects of the fall.
Lamech's words show that the curse is still part of daily life.
The need for comfort is not sentimental. It comes from real toil in a damaged world.`,
      ],
      truths: [
        `⏳ Long life is not salvation.
Methuselah lives longer than anyone else recorded in Scripture.
Still, he dies.
Genesis teaches that time cannot defeat the deeper problem of death.`,
        `😮‍💨 People long for relief from the curse.
Lamech's words are full of exhaustion.
Human beings were made for fruitful work, but the fall made work painful and resistant.
Noah is born into that ache.`,
        `👶 God prepares hope before judgment arrives.
Noah appears before the flood begins.
God is already preparing preservation before the waters come.
That is mercy moving ahead of judgment.`,
      ],
      why: `Genesis 5:25-32 matters because it shows hope appearing inside weariness. The world is tired, the ground is cursed, and death keeps repeating, but God is preparing Noah.
😮‍💨 God sees tired people and cursed-ground labor.
👶 Hope can enter the story as something small at first.
⏳ A long life is still not enough without God's mercy.
🛟 Before judgment comes, God is already preparing preservation.
This section helps us read Noah correctly. He is not just a boat builder; he is introduced as hope in a world that needs comfort.`,
    }),
    makeGenesisStudySection({
      chapter: 6,
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 6:1-8",
      title: "The Earth Becomes Corrupt",
      icon: "🌑",
      summary: "Human wickedness fills the earth, God's heart is grieved, and Noah finds favor.",
      what: `Genesis 6 shows the spread of sin becoming global and deep. The passage includes difficult details, but the main point is clear: corruption has reached the human heart.
🌑 Humanity multiplies, but sin multiplies with it.
🧠 The thoughts and intentions of the heart are described as evil continually.
💔 God is grieved, which shows He is not cold or detached from evil.
⚖️ Judgment is announced because violence and corruption cannot be ignored forever.
🛟 Then verse 8 breaks through: Noah finds favor in the eyes of the Lord.
The passage is heavy, but it is not hopeless. Grace appears before the ark, before the rain, and before Noah does anything impressive in the story.`,
      phrases: [
        `🌑 Sons Of God And Daughters Of Men
Bible readers have understood this phrase in different ways. Some see heavenly beings, some see powerful rulers, and some see the line of Seth mixing with the line of Cain.
Genesis does not pause to settle every curiosity for us.
The main point is that human life is becoming disordered, proud, and corrupt before God.`,
        `🧠 Every Imagination Of The Thoughts Of His Heart
Genesis goes beneath behavior into desire and imagination. The problem is not only bad actions; it is a heart turned away from God.
This is a deep diagnosis of sin.
The flood story is not treating evil as a few mistakes. It is showing corruption at the center of human life.`,
        `🛟 Noah Found Grace
This is one of the brightest lines in the flood story. Before Noah builds, before Noah enters, before Noah survives, he receives favor.
Grace comes first.
Noah's obedience matters, but his story begins with God's favor, not human greatness.`,
      ],
      truths: [
        `🧠 Sin is deeper than behavior.
Genesis 6 talks about thoughts, imagination, and heart.
God sees what is forming inside people before it becomes visible outside.
That is why the problem is so serious.`,
        `💔 God grieves evil.
The Lord is not indifferent to violence and corruption.
The grief language shows that evil wounds what God made good.
Judgment comes from a holy God who truly sees the damage.`,
        `🛟 Grace appears before judgment falls.
Noah finds favor before the flood begins.
God's mercy is already present in the story.
Even in judgment, God is preparing rescue.`,
      ],
      why: `Genesis 6:1-8 matters because it explains why the flood happens. God is not reacting randomly; He is responding to deep corruption that has filled the earth.
🧠 What happens in the heart matters to God.
💔 God is grieved by evil, not entertained by it.
⚖️ Judgment means God takes violence seriously.
🛟 Grace can appear in the darkest paragraph.
This section teaches us to take sin seriously without losing sight of mercy. The same passage that shows God's grief also introduces the favor that will preserve life.`,
    }),
    makeGenesisStudySection({
      chapter: 6,
      startVerse: 9,
      endVerse: 13,
      reference: "Genesis 6:9-13",
      title: "Noah Walked With God",
      icon: "🛡️",
      summary: "Noah stands apart from a corrupt and violent generation because he walks with God.",
      what: `Genesis now focuses on Noah's life in contrast to the world around him. The earth is corrupt and filled with violence, but Noah is described as righteous, blameless in his generation, and walking with God.
🛡️ Noah is not presented as sinless, but as a man whose direction is different.
🚶 Walking with God connects Noah to Enoch from Genesis 5.
🩸 Violence has filled the earth, showing sin has become public and social.
👀 God sees the corruption clearly before He announces judgment.
This section shows that faithful living is possible in a corrupt generation. Noah's difference begins with his walk with God, not with his boat-building skills.`,
      phrases: [
        `🚶 Noah Walked With God
This phrase is the center of Noah's life. Like Enoch, Noah lives near God in a world moving away from Him.
Walking with God means trust, nearness, obedience, and direction.
Before Noah builds anything with his hands, Genesis shows the direction of his heart.`,
        `🛡️ Righteous And Blameless
These words do not mean Noah never sinned. Later Genesis will show Noah's weakness too.
The point is that Noah is marked by integrity in comparison with his generation.
He lives differently because he walks with God differently.`,
        `🩸 Filled With Violence
Violence is one of the clearest reasons for the flood. Sin has moved from private distrust to public destruction.
Genesis has traced this movement from Eden to Cain to the whole earth.
God's judgment is connected to real harm being done in His world.`,
      ],
      truths: [
        `🚶 Faith begins with walking with God.
Noah's obedience flows from relationship.
He is not merely a moral exception; he is a man moving with God.
The ark will come from that walk.`,
        `🩸 God cares about violence.
The earth being filled with violence is not a side detail.
God sees the suffering and disorder violence creates.
Judgment shows that human harm matters to Him.`,
        `🛡️ A generation does not have to define a person.
Noah lives differently in a corrupt world.
He shows that faithfulness can stand out even when the culture around it collapses.
God notices that kind of life.`,
      ],
      why: `Genesis 6:9-13 matters because it shows what faithfulness looks like before the flood. Noah is surrounded by corruption, but his direction is not controlled by his surroundings.
🚶 Walk with God before you try to build something for God.
🩸 Violence and corruption are never invisible to the Lord.
🛡️ You can live differently even when everyone around you normalizes sin.
👀 God's seeing is both comfort and warning.
This section helps us understand Noah's obedience. He does not build the ark because he is naturally impressive; he builds because he walks with the God who speaks.`,
    }),
    makeGenesisStudySection({
      chapter: 6,
      startVerse: 14,
      endVerse: 22,
      reference: "Genesis 6:14-22",
      title: "God Commands The Ark",
      icon: "🛠️",
      summary: "God gives Noah detailed instructions for the ark and promises covenant preservation.",
      what: `God does not only announce judgment; He gives Noah a way of preservation. The ark is not Noah's clever idea. It is God's commanded refuge.
🛠️ Noah receives practical instructions: wood, rooms, pitch, measurements, levels, a window, and a door.
📏 Faith becomes obedience in details, not vague religious feeling.
🛟 The ark will preserve Noah, his family, and living creatures through judgment.
🤝 God speaks covenant before the flood arrives.
✅ Noah does according to all that God commanded him.
This section shows faith becoming construction. Noah obeys before rain starts, before danger is visible, and before the world understands what he is doing.`,
      phrases: [
        `🛠️ Make Thee An Ark
The ark is God's rescue plan given to Noah. Noah must build, but God provides the instructions.
That matters because biblical faith is not passive.
Trusting God often means doing the specific thing He has commanded, even when the reason is not yet visible to everyone else.`,
        `📏 Cubits
A cubit was an ancient measurement roughly based on the distance from elbow to fingertip. The ark's size shows this was not a children's picture-book boat.
It was a massive survival vessel.
Genesis gives measurements because God's rescue is practical, physical, and detailed.`,
        `🤝 I Will Establish My Covenant
Before the flood comes, God speaks covenant. That means judgment is not the only word in the passage.
God commits Himself to preservation.
The covenant language points forward to the rainbow promise in Genesis 9.`,
      ],
      truths: [
        `🛟 God provides refuge before judgment.
The ark is commanded before the waters arrive.
God gives Noah a place of preservation before the crisis begins.
Mercy is built into the warning.`,
        `📏 Obedience has details.
Noah does not get to invent his own ark.
God gives dimensions, materials, and instructions.
Faith listens closely enough to obey specifically.`,
        `✅ Faith acts before proof appears.
Noah builds before the rain starts.
That is faith in motion.
He trusts God's word before circumstances make it obvious.`,
      ],
      why: `Genesis 6:14-22 matters because it shows what trust looks like when God's warning sounds strange to everyone else. Noah's faith becomes boards, measurements, pitch, rooms, and obedience.
🛠️ Faith is not only what you feel; it is what you build because God spoke.
📏 Details matter when God gives them.
🛟 God's refuge is provided before judgment arrives.
✅ Obedience before proof is still real faith.
This section helps us respect Noah's obedience. He does not wait until the sky changes. He moves because God's word is enough.`,
    }),
    makeGenesisStudySection({
      chapter: 7,
      startVerse: 1,
      endVerse: 10,
      reference: "Genesis 7:1-10",
      title: "Come Into The Ark",
      icon: "🚪",
      summary: "God calls Noah, his family, and the animals into the ark before the flood begins.",
      what: `Genesis 7 begins with God calling Noah into the ark. The ark has been built, the warning has been given, and now the place of refuge must be entered.
🚪 God says "come," which makes the ark feel like an invitation into safety.
👨‍👩‍👦 Noah's household enters with him, showing his obedience affects more than himself.
🐾 Animals are gathered and preserved according to God's command.
⏳ Seven days pass before the flood comes, creating a waiting space between obedience and visible judgment.
🌧️ The rain has not fallen yet, but Noah enters because God spoke.
This section teaches that refuge must be received. The ark is available, but Noah must step inside the place God provided.`,
      phrases: [
        `🚪 Come Into The Ark
The wording feels personal. God is not only saying "go"; He is calling Noah into refuge.
The ark is not Noah's escape plan. It is God's provided shelter.
That makes the invitation both gracious and urgent.`,
        `🐾 Clean And Unclean
Clean and unclean animals appear before the law of Moses, which surprises many readers.
This shows that some worship categories already existed in some form.
The clean animals will matter after the flood when Noah offers sacrifice.`,
        `⏳ Seven Days
Noah enters the ark, and then there is a waiting period before the flood begins.
That waiting must have felt strange: inside the ark, door closing soon, no rain yet.
Faith often includes waiting after obedience but before fulfillment.`,
      ],
      truths: [
        `🚪 God's refuge must be entered.
The ark was built, but Noah still had to come in.
Hearing about rescue is not the same as receiving it.
Faith responds to God's invitation.`,
        `👨‍👩‍👦 Obedience can shelter others.
Noah's household comes with him.
One person's faithfulness can bless more than one life.
Genesis shows family preservation tied to Noah's obedience.`,
        `⏳ Waiting is part of faith.
Noah enters before the flood begins.
He waits inside what God provided before the evidence appears outside.
Trust often has a waiting room.`,
      ],
      why: `Genesis 7:1-10 matters because it moves from building refuge to entering refuge. Noah does not only believe the ark matters; he steps inside.
🚪 God's invitation into safety should be taken seriously.
⏳ Waiting after obedience does not mean obedience was wrong.
👨‍👩‍👦 Faithfulness can affect the people around you.
🐾 God preserves more life than Noah alone.
This section reminds us that God's warnings are not meant to scare people for no reason. They are meant to move people into the refuge He provides.`,
    }),
    makeGenesisStudySection({
      chapter: 7,
      startVerse: 11,
      endVerse: 16,
      reference: "Genesis 7:11-16",
      title: "The Flood Begins",
      icon: "🌧️",
      summary: "The waters break open, Noah enters with the living creatures, and the Lord shuts him in.",
      what: `The flood begins with water from below and above. Genesis describes the fountains of the deep breaking open and the windows of heaven opening.
🌊 The creation boundaries that held back the waters now give way.
🌧️ Rain falls for forty days and forty nights.
🐾 Noah, his family, and the creatures enter the ark as God commanded.
🚪 The Lord shuts Noah in, securing the place of refuge.
⚖️ The time for warning has become the time of judgment.
This is one of the most sobering moments in Genesis. The same God who patiently gave instruction now closes the door, and the flood begins.`,
      phrases: [
        `🌊 Fountains Of The Great Deep
This phrase points to waters bursting from below, not only rain from above.
Genesis wants us to feel the flood as a cosmic undoing, like the ordered world is being overwhelmed.
The waters that God ordered in creation now become instruments of judgment.`,
        `🌧️ Windows Of Heaven
The rain is described as heaven opening. Water comes from above as well as below.
This makes the flood feel total and terrifying.
The whole created order is involved in the judgment scene.`,
        `🚪 The Lord Shut Him In
This line is both tender and serious. God Himself secures Noah inside the ark.
It is tender because Noah is protected. It is serious because the door is closed.
The time for entering has ended, and judgment has begun.`,
      ],
      truths: [
        `⚖️ God's warnings are serious.
The flood begins after long warning and preparation.
Genesis teaches that God's patience should not be mistaken for empty talk.
When God speaks, His word stands.`,
        `🛟 God secures His refuge.
The Lord shuts Noah in.
Noah is not left to hold the door closed himself.
The safety of the ark rests on God's action.`,
        `🌊 Judgment can look like creation being undone.
Genesis 1 ordered the waters for life.
Genesis 7 shows waters overwhelming a corrupt world.
Sin attacks creation's purpose, and judgment reveals the seriousness of that damage.`,
      ],
      why: `Genesis 7:11-16 matters because it shows the moment warning becomes reality. This is not a cute boat scene; it is judgment and rescue happening at the same time.
🌧️ God's word about judgment should be taken seriously.
🚪 There is mercy in being shut inside God's refuge.
🌊 Sin can bring creation-level consequences.
🐾 God remembers living creatures even in judgment.
This section teaches holy seriousness. The door that protects Noah also marks the end of delay.`,
    }),
    makeGenesisStudySection({
      chapter: 7,
      startVerse: 17,
      endVerse: 24,
      reference: "Genesis 7:17-24",
      title: "The Waters Prevail",
      icon: "🌊",
      summary: "The waters rise over the earth, judge life outside the ark, and carry the ark above the flood.",
      what: `Genesis 7 ends with the waters prevailing over the earth. The language is heavy because the flood is judgment, not background scenery.
🌊 The waters rise and cover even the mountains.
🛟 The same waters that judge the world lift the ark.
⚖️ Life outside the ark dies, showing that God's judgment is real.
🐾 Life inside the ark is preserved because God provided refuge.
⏳ The waters prevail for 150 days, so this rescue includes a long season of waiting.
This section is hard to read, but it matters. Genesis shows that God judges corruption seriously while also preserving life through the refuge He commanded.`,
      phrases: [
        `🌊 The Waters Prevailed
The repeated idea of prevailing shows the flood's strength. The waters dominate the landscape.
Genesis wants the reader to feel that this is not a small local inconvenience in the story.
It is a judgment scene where the corrupt world is overwhelmed.`,
        `🛟 The Ark Went Upon The Face Of The Waters
The waters destroy outside the ark, but they carry the ark.
That contrast is one of the deepest images in the flood story.
The difference is not the water; the difference is being inside the refuge God provided.`,
        `⚖️ All Flesh Died
This is the hardest phrase in the chapter. Genesis does not soften the reality of judgment.
The Bible wants us to understand that violence and corruption are not light things.
Judgment is terrible because sin has become terrible.`,
      ],
      truths: [
        `⚖️ God does not treat evil as harmless.
The flood is a severe judgment on severe corruption.
Genesis will not let us make sin small.
Violence, corruption, and rebellion matter to God.`,
        `🛟 Refuge changes the meaning of the waters.
Outside the ark, the waters judge.
Inside the ark, the waters lift.
God's provided refuge is the difference between destruction and preservation.`,
        `⏳ Rescue can include waiting.
The waters prevail for many days.
Noah is saved, but he is not instantly settled on dry ground.
Being preserved by God can still involve patience.`,
      ],
      why: `Genesis 7:17-24 matters because it makes us take the flood seriously. This is judgment, but it is also preservation.
⚖️ Evil is not ignored by God.
🛟 Safety is found inside what God provides.
⏳ Being saved does not always mean the waiting ends quickly.
🌱 God preserves life so the story can continue.
The flood is heavy, but it is not the end. The ark remains, and that means mercy is still floating above the judgment.`,
    }),
    makeGenesisStudySection({
      chapter: 8,
      startVerse: 1,
      endVerse: 5,
      reference: "Genesis 8:1-5",
      title: "God Remembers Noah",
      icon: "🌬️",
      summary: "God turns His faithful attention toward Noah, and the flood waters begin to recede.",
      what: `Genesis 8 begins with one of the most comforting lines in the flood story: God remembered Noah. That does not mean God forgot and suddenly recalled him; it means God turns His covenant attention toward Noah and acts.
🌬️ God sends a wind over the earth, echoing creation language and beginning a new-creation movement.
🌊 The waters stop increasing and begin to recede.
⛰️ The ark rests on the mountains of Ararat, but Noah is not out yet.
🌱 Hope returns in stages: water lowers, the ark rests, and mountain tops appear.
This section teaches patient hope. God is acting, but Noah still has to wait inside the ark while restoration unfolds little by little.`,
      phrases: [
        `🕊️ God Remembered Noah
Remembering in the Bible often means God turns toward someone with faithful action. Noah has been enclosed in the ark through judgment, but he has not been abandoned.
This phrase is the hinge between flood judgment and restoration. The waters are still there, but God's mercy is already moving.`,
        `🌬️ A Wind Over The Earth
The wind language echoes the Spirit hovering over the waters in Genesis 1. The flooded world is beginning to move toward order again.
Genesis is showing a kind of new creation after judgment. God can bring a livable world back from waters of chaos.`,
        `⛰️ The Ark Rested
The ark resting is not the end of the story, but it is a sign that the worst has passed. Noah is still waiting, but he is no longer drifting endlessly.
Hope sometimes arrives as a resting place before it becomes an open door.`,
      ],
      truths: [
        `🕊️ God remembers His people.
Noah is not forgotten inside the ark.
God's remembering means faithful attention and action.
The flood is powerful, but it does not erase God's care.`,
        `🌱 Restoration often comes in stages.
The waters do not disappear all at once.
The ark rests before Noah exits.
God's rescue can be real even while the waiting continues.`,
        `🌬️ God can begin creation again after judgment.
The wind over the waters feels like Genesis 1.
God is bringing order back from watery chaos.
The story is moving from destruction toward renewed life.`,
      ],
      why: `Genesis 8:1-5 matters because it speaks to the fear of being forgotten in a long season. Noah is still inside the ark, but God is already moving.
🕊️ God's silence does not mean God's absence.
🌊 Waters can recede even before doors open.
⛰️ A resting place can be the first sign of mercy.
🌱 Hope often comes back in stages, not all at once.
This passage helps us trust God's timing. The ark has not opened yet, but the God who remembered Noah is already turning the story toward life.`,
    }),
    makeGenesisStudySection({
      chapter: 8,
      startVerse: 6,
      endVerse: 12,
      reference: "Genesis 8:6-12",
      title: "The Raven, The Dove, And The Olive Leaf",
      icon: "🕊️",
      summary: "Noah sends out birds, waits patiently, and receives a small sign that life is returning.",
      what: `Noah begins looking for signs that the earth is ready again. He opens the window and sends out birds, but even when he sees progress, he does not rush ahead of God.
🪟 Noah opens the window and sends out a raven.
🕊️ The dove searches for a resting place but returns because the earth is not ready.
🌿 The olive leaf becomes a small but powerful sign that life is returning.
⏳ Noah waits seven more days more than once.
The passage is quiet, but it is deeply human. Noah is saved, but he is still waiting, watching, testing, and learning patience in the middle of restoration.`,
      phrases: [
        `🪟 Noah Opened The Window
This small action shows Noah beginning to look outward again. After months inside the ark, the window becomes a place of watching and hope.
Faith is not pretending nothing changed. It is watching for God's timing with patience.`,
        `🕊️ The Dove Found No Rest
The dove's first return means the earth is not ready yet. That must have been disappointing, but Noah receives the information and waits.
Sometimes a closed door is not rejection. Sometimes it is timing.`,
        `🌿 An Olive Leaf
The olive leaf is small, but it carries huge meaning. It shows that plant life is appearing again and the world is becoming habitable.
God often gives hope in small signs before the full door opens.`,
      ],
      truths: [
        `⏳ Faith knows how to wait.
Noah does not force the door open.
He tests, watches, and waits.
Patience is part of obedience.`,
        `🌿 Small signs of life matter.
The olive leaf is not the whole restored world.
But it is enough to show that restoration has begun.
God can encourage faith with small evidence of coming life.`,
        `🕊️ Rest has to come in God's timing.
The dove cannot rest until the ground is ready.
Noah cannot settle until God opens the way.
Real restoration is received, not grabbed.`,
      ],
      why: `Genesis 8:6-12 matters because it teaches patience after survival. Noah is no longer facing rising waters, but he still has to wait for a world he can actually step into.
🪟 It is okay to look for signs of what God is doing.
🕊️ Not every return means failure; sometimes it means wait.
🌿 Small hope is still real hope.
⏳ Faith does not have to rush restoration.
This section is for the space between rescue and full renewal. The olive leaf says life is coming, even before Noah can walk on dry ground.`,
    }),
    makeGenesisStudySection({
      chapter: 8,
      startVerse: 13,
      endVerse: 19,
      reference: "Genesis 8:13-19",
      title: "God Says Go Forth",
      icon: "🚪",
      summary: "Noah waits for God's word, leaves the ark, and life begins spreading again.",
      what: `Noah sees that the ground is dry, but he still waits for God to speak. That detail matters because Noah's life has been marked by listening.
🌍 The earth is drying, and a new world is emerging after judgment.
🗣️ God tells Noah to go out of the ark.
🚪 Noah leaves with his family, not as an escapee, but as someone sent by God.
🐾 The animals go out by their families, echoing the order of creation.
🌱 Life is meant to spread again on the earth.
This is rescue turning into responsibility. God preserved life in the ark so life could begin again outside it.`,
      phrases: [
        `🌍 The Face Of The Ground Was Dry
The phrase signals that the flooded world is becoming livable again. It also echoes creation, where dry land appeared so life could flourish.
Genesis is showing the earth moving from judgment toward a renewed beginning.`,
        `🗣️ God Spoke Unto Noah
Noah does not simply leave because he thinks the timing looks good. He waits for God's word.
That pattern has defined Noah from the start: God speaks, Noah obeys.`,
        `🐾 After Their Kinds
This phrase echoes Genesis 1. The animals leave in ordered family groups, showing that creation order continues after the flood.
God preserved life so it could multiply again.`,
      ],
      truths: [
        `🗣️ God's word directs the next step.
Noah waits even after seeing dry ground.
He does not mistake evidence for permission.
Faith listens for God's direction.`,
        `🚪 Rescue leads to responsibility.
Noah is preserved so he can step into a renewed calling.
The ark was not the final home.
God saves life so life can move forward.`,
        `🌱 God continues His creation purpose.
Animals leave by kind and life spreads again.
The flood did not cancel God's purpose for the earth.
God is renewing what judgment did not destroy.`,
      ],
      why: `Genesis 8:13-19 matters because it shows that survival is not the end of the story. God brings Noah out so life can continue.
🗣️ A dry-looking path still needs God's direction.
🚪 There is a time to stay and a time to go.
🐾 God cares about the continuation of life.
🌱 Rescue becomes a new assignment.
This passage helps us think about what comes after hard seasons. God does not only bring people through; He also sends them forward.`,
    }),
    makeGenesisStudySection({
      chapter: 8,
      startVerse: 20,
      endVerse: 22,
      reference: "Genesis 8:20-22",
      title: "Worship After Rescue",
      icon: "🔥",
      summary: "Noah's first recorded act after the ark is worship, and God promises creation's rhythms will continue.",
      what: `Noah's first recorded act after leaving the ark is worship. Before he builds a house, plants a vineyard, or reorganizes life, he builds an altar.
🔥 Noah offers burnt offerings from the clean animals.
🙏 Rescue becomes worship, not self-congratulation.
🌾 God promises the rhythms of seedtime and harvest will continue.
☀️ Day and night, cold and heat, summer and winter will not cease while the earth remains.
💔 God also acknowledges that the human heart is still sinful from youth.
This section is honest and hopeful at the same time. The flood judged evil, but it did not erase sin from the heart, so the world needs God's mercy to continue.`,
      phrases: [
        `🔥 Built An Altar
This is the first altar mentioned in the Bible. Noah responds to rescue with worship.
That tells us the right response to mercy is not pride, but gratitude and surrender.`,
        `🙏 A Sweet Savor
This phrase means the offering is accepted by God. It does not mean God needs food or smoke.
It shows that worship offered in faith is pleasing to Him.`,
        `🌾 Seedtime And Harvest
God promises stable rhythms for the earth. After a flood that disrupted everything, this promise matters deeply.
It means the world will continue with dependable seasons because God chooses mercy.`,
      ],
      truths: [
        `🙏 Rescue should lead to worship.
Noah's first recorded act is not building for himself.
He builds an altar to the Lord.
Gratitude is the right response to preservation.`,
        `💔 Judgment does not cure the human heart.
God says the imagination of man's heart is evil from youth.
The flood removed a corrupt world, but it did not remove sin from humanity.
That prepares us to long for deeper redemption.`,
        `🌾 God's mercy sustains ordinary life.
Seedtime, harvest, seasons, and day-night rhythm continue.
Ordinary stability is a gift from God.
Every harvest is mercy continuing.`,
      ],
      why: `Genesis 8:20-22 matters because it shows worship and mercy after judgment. Noah steps into a washed world, but humanity still needs grace.
🔥 Worship belongs at the beginning of a new season.
🙏 Rescue should make us grateful, not self-important.
💔 The heart problem still needs more than a flood.
🌾 Ordinary seasons are a sign of God's sustaining mercy.
This passage teaches that a fresh start is not enough by itself. We need a faithful God who continues to show mercy while He moves the story toward full redemption.`,
    }),
    makeGenesisStudySection({
      chapter: 9,
      startVerse: 1,
      endVerse: 7,
      reference: "Genesis 9:1-7",
      title: "Blessing, Blood, And Human Dignity",
      icon: "🩸",
      summary: "God blesses Noah, renews the creation calling, and protects human life because people bear His image.",
      what: `Genesis 9 begins like a second start. God blesses Noah and his sons and repeats the command to be fruitful and fill the earth.
🙌 Blessing comes before responsibility, just like in Genesis 1.
🌍 Humanity is called to spread life across the earth again.
🩸 Blood becomes central because blood represents life.
👤 Human life is protected because people are made in the image of God.
⚖️ The new world must not be ruled by the violence that filled the old one.
This section shows that God's purpose for humanity continues after the flood. But it also shows that human life must be treated with holy seriousness.`,
      phrases: [
        `🙌 God Blessed Noah
God begins the renewed world with blessing, not suspicion. Noah's family steps out of the ark under God's spoken favor.
Responsibility in Scripture often begins with gift. God blesses first, then sends humanity forward.`,
        `🩸 The Blood Thereof
Blood represents life in the Bible. God teaches Noah that life is not casual or disposable.
This prepares for later biblical themes of sacrifice, atonement, and the seriousness of taking life.`,
        `👤 In The Image Of God
Genesis repeats the image of God after the flood. Sin and judgment have not erased human dignity.
Every human life still carries sacred worth because every person is connected to God's image.`,
      ],
      truths: [
        `🙌 God's blessing continues after judgment.
The flood does not cancel God's original purpose for human life.
God blesses Noah and calls humanity to fruitfulness again.
Mercy gives the world a renewed beginning.`,
        `👤 Human life has sacred value.
People bear God's image.
That is why murder and violence are treated so seriously.
Human dignity is rooted in God, not usefulness or status.`,
        `🩸 Life belongs to God.
Blood represents life, and God sets boundaries around it.
Humans may receive provision, but they do not become owners of life in an ultimate sense.
Life is a holy gift.`,
      ],
      why: `Genesis 9:1-7 matters because it shows how God wants the post-flood world to treat life. The old world was filled with violence, but the renewed world must honor human dignity.
🙌 God's blessing gives humanity a fresh start.
👤 Every person matters because every person bears God's image.
🩸 Life is sacred, not disposable.
⚖️ Violence is not normal in God's world.
This passage helps us see why the Bible takes human life so seriously. Human dignity is not a cultural opinion; it is grounded in creation.`,
    }),
    makeGenesisStudySection({
      chapter: 9,
      startVerse: 8,
      endVerse: 17,
      reference: "Genesis 9:8-17",
      title: "The Rainbow Covenant",
      icon: "🌈",
      summary: "God gives the rainbow as the sign of His covenant with Noah, his descendants, and every living creature.",
      what: `God now gives a covenant sign. The rainbow is not mainly about human promise to God; it is about God's promise to creation.
🤝 God establishes covenant with Noah, his descendants, and every living creature.
🌈 The bow in the clouds becomes the sign of that covenant.
☁️ Clouds may still come, but they now carry a reminder of mercy.
🕊️ God promises not to destroy all flesh by flood again.
📖 The covenant is worldwide, reaching beyond one family to the living earth.
This section is beautiful because the sign appears in the place storms appear. God puts a promise in the clouds.`,
      phrases: [
        `🤝 I Establish My Covenant
The covenant begins with God's action. He is the One who establishes, speaks, and gives the sign.
That means the rainbow covenant rests on God's faithfulness, not human ability to control the future.`,
        `🌈 My Bow In The Cloud
The bow may connect to the image of a warrior's bow, now set in the clouds as a sign of peace.
The weapon image becomes a mercy sign. God is saying judgment will not continue without restraint forever.`,
        `🐾 Every Living Creature
The covenant includes animals too. That detail shows God's care for the whole living creation.
The flood story is not only about humans; God preserves and promises concerning the creatures He made.`,
      ],
      truths: [
        `🤝 God binds Himself by promise.
The covenant is God's commitment.
He gives creation a word to trust.
The future of the earth rests on His faithfulness.`,
        `🌈 Mercy can be remembered in storm clouds.
The sign appears in the clouds, not in a cloudless sky.
That means reminders of mercy can appear in the same place we fear trouble.
God turns the storm scene into a promise scene.`,
        `🐾 God cares for all living creatures.
The covenant includes every living creature.
God's mercy is wider than human survival alone.
Creation remains under His care.`,
      ],
      why: `Genesis 9:8-17 matters because it gives the world a sign of God's restraint and mercy. The rainbow says the flood was not the final word over creation.
🌈 God's promise stands even when clouds gather.
🤝 Covenant means the future depends on God's faithfulness.
🐾 God cares for the living world He made.
☁️ Mercy can be remembered in places that once felt threatening.
This passage helps us read the rainbow as more than a pretty symbol. It is a reminder that God has spoken peace over the continued life of the earth.`,
    }),
    makeGenesisStudySection({
      chapter: 9,
      startVerse: 18,
      endVerse: 29,
      reference: "Genesis 9:18-29",
      title: "Noah's Failure After The Flood",
      icon: "🍇",
      summary: "Noah's drunkenness and family shame show that the flood did not remove sin from the human heart.",
      what: `Genesis does not hide Noah's weakness. After the altar, blessing, and rainbow, Noah plants a vineyard, becomes drunk, and lies uncovered in his tent.
🍇 Noah's failure shows that rescued people still need grace.
👀 Ham exposes shame instead of honoring his father.
🧥 Shem and Japheth cover their father's nakedness with care.
⚠️ The curse falls on Canaan, and this passage must not be twisted into racism or slavery.
⚰️ Noah still dies, returning us to the death rhythm of Genesis 5.
This section is uncomfortable, but it is important. The flood judged a corrupt world, but humanity still needs a deeper rescue than water can provide.`,
      phrases: [
        `🍇 He Drank Of The Wine
Noah's drunkenness is a sad turn after such a powerful rescue story. Genesis is honest about its main characters.
Being used by God does not mean a person no longer needs humility, boundaries, and grace.`,
        `👀 Saw The Nakedness
Ham's response is not described as care or protection. The scene centers on shame, exposure, and dishonor in the family.
Genesis is showing sin reappearing inside the rescued family itself.`,
        `🧥 Covered The Nakedness
Shem and Japheth act differently. They refuse to stare at shame and instead cover it.
The contrast shows two ways to respond to another person's failure: exposure or honorable covering.`,
      ],
      truths: [
        `🍇 A fresh start does not remove sin by itself.
The world has been washed, but Noah still fails.
External judgment cannot fully cure the inner human problem.
Genesis keeps showing our need for deeper redemption.`,
        `👀 Shame can be handled wickedly or honorably.
Ham exposes; Shem and Japheth cover.
The passage contrasts dishonor with reverent care.
How we handle another person's shame reveals something about our own heart.`,
        `⚠️ Scripture must not be twisted.
The curse is on Canaan, not a blanket curse on all Ham's descendants.
This passage has been abused in history, but that abuse is not faithful reading.
Genesis is not permission for racism or oppression.`,
      ],
      why: `Genesis 9:18-29 matters because it keeps us from thinking the flood solved the heart. Noah is rescued, but Noah still fails.
🍇 Spiritual history does not make a person immune to weakness.
👀 Exposing shame can become its own sin.
🧥 Honor can cover what curiosity wants to stare at.
⚠️ Hard Bible passages must be handled carefully and honestly.
This section reminds us why Genesis keeps moving toward a greater Savior. Humanity needs more than survival; humanity needs a heart-level redemption.`,
    }),
    makeGenesisStudySection({
      chapter: 10,
      startVerse: 1,
      endVerse: 5,
      reference: "Genesis 10:1-5",
      title: "The Nations After The Flood",
      icon: "🗺️",
      summary: "Noah's sons begin spreading into families, lands, languages, and nations.",
      what: `Genesis 10 is often called the Table of Nations. It can look like a list, but it is showing the world widening after the flood.
👨‍👦 Noah's sons become the starting points for peoples after the flood.
🗺️ Lands and coastlands are named, showing humanity spreading geographically.
🗣️ Languages are mentioned, preparing us for Babel in Genesis 11.
🏘️ Families become peoples, and peoples become nations.
🌍 God sees the whole map, not just one small family story.
This section matters because Genesis is preparing us for a worldwide promise. When God later says all families of the earth will be blessed, Genesis has already shown us those families spreading.`,
      phrases: [
        `🗺️ Isles Of The Gentiles
This phrase points to distant coastlands or maritime peoples. Genesis is widening the reader's imagination beyond the ark.
The story is moving from one rescued family toward many peoples across the earth.`,
        `🗣️ Every One After His Tongue
Languages are mentioned before the tower story explains the scattering. Genesis 10 gives the map, while Genesis 11 explains the rebellion behind the division.
This is a reminder that Genesis often gives a wide view before zooming in.`,
        `🏘️ Families In Their Nations
Nations begin as families and clans. That makes the table feel more personal than a political map.
Behind nations are human families known by God.`,
      ],
      truths: [
        `🌍 God sees all peoples.
Genesis names nations because they matter in God's story.
No people group is invisible to Him.
The Bible's vision is wider than one tribe from the beginning.`,
        `🧭 Geography can carry theology.
Lands, languages, and families are not random details.
They prepare for later promises, conflicts, and missions.
The map of Genesis becomes the stage for redemption.`,
        `🌱 The flood did not end human fruitfulness.
Noah's family multiplies.
Families become nations.
God's creation purpose continues after judgment.`,
      ],
      why: `Genesis 10:1-5 matters because it teaches us that the nations are part of God's story from the beginning. The Bible is not only interested in one private family.
🗺️ God knows the map of humanity.
🏘️ Nations begin with families, not statistics.
🗣️ Language and culture matter in the biblical story.
🌍 The promise to bless all families will be as wide as the world.
This section helps us care about names and places. God is preparing a global story of blessing, even through a genealogy.`,
    }),
    makeGenesisStudySection({
      chapter: 10,
      startVerse: 6,
      endVerse: 20,
      reference: "Genesis 10:6-20",
      title: "Ham, Nimrod, And Early Kingdoms",
      icon: "🏙️",
      summary: "Ham's line introduces Egypt, Canaan, Nimrod, Babel, Nineveh, and early kingdom power.",
      what: `This section traces Ham's descendants and introduces names that will matter throughout the Bible. Egypt, Canaan, Babel, Nineveh, and the Philistines all appear in seed form here.
🏛️ Egypt and Canaan come into view, both becoming major places in Israel's future story.
👑 Nimrod is singled out as a mighty figure connected with early kingdoms.
🏙️ Babel appears here before Genesis 11 explains the tower.
⚠️ Human power is rising again after the flood.
🧭 The map is already preparing future conflict, promise, and rescue.
Genesis is showing that culture and kingdoms develop quickly, but the human heart still needs God.`,
      phrases: [
        `🏛️ Mizraim And Canaan
Mizraim is commonly associated with Egypt, and Canaan becomes the land central to Israel's story. These names are not random.
Genesis is introducing places that will shape the rest of the Bible.`,
        `👑 Nimrod A Mighty One
Nimrod is described with unusual attention. He is connected to strength, hunting, kingdom beginnings, and important cities.
The language makes readers watch carefully because power after the flood is already becoming organized.`,
        `🏙️ Babel
Babel appears in Genesis 10 before the tower story in Genesis 11. Genesis gives the location on the map before explaining the spiritual problem there.
Babel will become a Bible symbol for proud human society resisting God.`,
      ],
      truths: [
        `🏙️ Human culture grows after judgment.
Cities, kingdoms, and peoples develop after the flood.
Judgment did not erase human creativity or ambition.
The question is whether power will serve God or exalt itself.`,
        `⚠️ Power can become dangerous quickly.
Nimrod and early kingdom language make the reader alert.
Strength is not automatically evil, but it can become proud and violent.
Genesis is preparing us for Babel's spirit.`,
        `🧭 Genealogies prepare future stories.
Egypt, Canaan, Babel, Nineveh, and Philistine names will matter later.
Genesis plants seeds for the rest of Scripture.
Paying attention here helps later stories make more sense.`,
      ],
      why: `Genesis 10:6-20 matters because it shows the world after the flood becoming organized, powerful, and complicated. The names here will echo through the rest of the Bible.
🏛️ Places in genealogies become places of promise, danger, and rescue later.
👑 Human might needs humility under God.
🏙️ Babel's shadow appears before the tower is explained.
🧭 Scripture often prepares us before we realize what it is doing.
This section helps us see that the Bible is building a connected world. The map is not random; it is preparing the stage for God's promise.`,
    }),
    makeGenesisStudySection({
      chapter: 10,
      startVerse: 21,
      endVerse: 32,
      reference: "Genesis 10:21-32",
      title: "Shem And The Line Toward Promise",
      icon: "🌱",
      summary: "Shem's line is traced, the nations spread, and the story quietly moves toward Abram.",
      what: `Genesis turns attention to Shem because the promise story will move through his family line toward Abram. The chapter still has a worldwide view, but one line is beginning to matter in a special way.
🌱 Shem's descendants are named as the story narrows toward future promise.
🧵 Eber is highlighted, and his line becomes important for the Hebrew people.
🌍 Peleg is connected with division, preparing the reader for Babel.
🗣️ Families, languages, lands, and nations are repeated.
✨ Genesis 10 ends with the world spread out and ready for the Babel explanation in Genesis 11.
This section is a bridge. It looks like a genealogy, but it is quietly moving the story toward Abram and the promise that all families of the earth will be blessed.`,
      phrases: [
        `🌱 Shem
Shem matters because Abram will come through his line. Genesis is not saying God only cares about Shem's family, but it is showing where the covenant focus will narrow.
Through one line, blessing will eventually be announced for all families.`,
        `🧵 Eber
Eber is highlighted in Shem's line and is often connected with the word Hebrew. That makes this detail important for the identity of Abram's descendants.
Genesis is quietly preparing the reader for Israel's story.`,
        `🌍 In His Days Was The Earth Divided
Peleg's name is connected with division. This likely points toward the scattering connected with Babel.
Genesis 10 gives the spread of nations, and Genesis 11 will explain the pride and judgment behind that spread.`,
      ],
      truths: [
        `🌱 God narrows the story without forgetting the world.
Genesis focuses on Shem's line, but the chapter still names many nations.
God's covenant plan will move through one family for the sake of many families.
The narrowing is for worldwide blessing.`,
        `🧵 Small names can carry big futures.
Eber may look like one name in a list.
But that line will matter deeply later.
Scripture often hides major future meaning in quiet details.`,
        `✨ Genesis is preparing Abram.
The world has spread, languages and lands are named, and Shem's line is highlighted.
Everything is moving toward Genesis 12.
God's promise is getting closer.`,
      ],
      why: `Genesis 10:21-32 matters because it closes the Table of Nations by pointing us toward the promise line. The world is wide, but the story is about to narrow.
🌱 God's plan can move through one family while aiming at all families.
🧵 Names that seem small can matter later.
🌍 Division and scattering prepare the need for blessing.
✨ Abram's story is almost here.
This passage helps us see the Bible's big design. Genesis is not wandering through names; it is setting up the promise that will answer the scattered world.`,
    }),
    makeGenesisStudySection({
      chapter: 11,
      startVerse: 1,
      endVerse: 9,
      reference: "Genesis 11:1-9",
      title: "Babel Tries To Make A Name",
      icon: "🏙️",
      summary: "Humanity gathers, builds upward, and tries to secure identity and safety without trusting God.",
      what: `Babel is humanity using unity, creativity, and ambition in the wrong direction. The people want a city, a tower, and a name for themselves.
🧱 They make bricks and begin building a city.
🗼 The tower reaches upward, showing human greatness being used for self-exaltation.
👑 They want to make a name for themselves instead of receiving identity from God.
🌍 They do not want to be scattered, even though God's creation blessing was to fill the earth.
🗣️ God confuses their language and scatters them.
This is not a story against building. It is a story against pride that uses building to avoid trusting and obeying God.`,
      phrases: [
        `🧱 Let Us Build
The phrase shows human cooperation and creativity. Those are not bad gifts by themselves.
The problem is the purpose under the project.
Babel uses human strength to resist God's command instead of serving God's purpose.`,
        `👑 Let Us Make Us A Name
This is the heart of Babel. They want identity, greatness, and security on their own terms.
Genesis 12 will answer this directly when God tells Abram, "I will make thy name great."
Babel grasps for a name; Abram receives one by promise.`,
        `🗣️ Confound Their Language
God's judgment slows down human pride. The confusion of languages scatters the people and restrains united rebellion.
It is judgment, but it is also mercy because unchecked pride would spread corruption faster.
God breaks the project to protect the world from a worse unity.`,
      ],
      truths: [
        `🏙️ Unity is not automatically holy.
The people of Babel are united, but they are united around pride.
Togetherness can still be rebellion if the purpose is self-exaltation.
God cares about the heart under the project.`,
        `👑 Identity is received better than seized.
Babel wants to make a name.
God will make Abram's name great by promise.
Genesis contrasts self-made identity with God-given blessing.`,
        `🌍 God scatters pride to preserve His purpose.
The scattering is painful, but it moves humanity toward filling the earth.
God's judgment stops rebellion from becoming even more entrenched.
Mercy can sometimes look like disruption.`,
      ],
      why: `Genesis 11:1-9 matters because Babel is still a mirror. People still try to build lives that feel impressive, safe, and meaningful without surrendering to God.
🧱 Building is not wrong, but building for pride is dangerous.
👑 A name you grab can become a tower you are trapped inside.
🌍 God's purpose is bigger than our desire to control the map.
🗣️ Sometimes God disrupts what would destroy us.
This passage prepares us for Abram. Human beings say, "Let us make a name," and God answers by calling one man into promise.`,
    }),
    makeGenesisStudySection({
      chapter: 11,
      startVerse: 10,
      endVerse: 32,
      reference: "Genesis 11:10-32",
      title: "The Story Narrows Toward Abram",
      icon: "🧬",
      summary: "After Babel, Genesis traces Shem's line to Abram and ends with an unfinished road in Haran.",
      what: `After Babel scatters humanity, Genesis narrows the camera to Shem's family line. The genealogy may feel slow, but it is carrying the story toward Abram.
🧬 Shem's line continues, showing God guiding history after Babel.
👤 Abram appears, and the next major movement of Genesis comes into view.
💔 Sarai is barren, which makes the coming promise humanly impossible.
🛤️ Terah's family leaves Ur and heads toward Canaan.
⏸️ The journey stops in Haran before the call of Genesis 12.
This section shows that God's call often has a background. Abram's obedience begins in a real family, a real journey, real grief, and an unfinished road.`,
      phrases: [
        `🧬 The Generations Of Shem
Genesis is tracing the line that will lead to Abram.
After the wide map of nations, the story narrows to one family.
That narrowing matters because God will bless many families through this one family.`,
        `💔 Sarai Was Barren
This detail appears before God's promise of descendants. That means the promise begins where human ability is already blocked.
Abram and Sarai cannot manufacture the future God will promise.
The story is setting us up to see that the promise depends on God.`,
        `🛤️ They Went Forth To Go Into Canaan
Terah's family starts moving toward Canaan but stops in Haran.
That unfinished road creates tension.
Genesis 12 will begin with God's call to keep moving by faith.`,
      ],
      truths: [
        `🧬 God works through long family lines.
Genealogies can feel slow, but they show God's patience.
He is guiding history across generations.
Abram's call is not random; it has a background.`,
        `💔 God's promise often begins at impossibility.
Sarai's barrenness is named before the promise comes.
That detail makes clear that the future cannot rest on human strength.
Faith will have to depend on God's word.`,
        `⏸️ Calling can begin from unfinished places.
The family stops in Haran.
The road is not complete.
God often speaks into stories that are already in motion but not yet whole.`,
      ],
      why: `Genesis 11:10-32 matters because it shows the road before the call. Abram's story begins with family history, barrenness, movement, delay, and an unfinished destination.
🧬 God can be working before we know the call clearly.
💔 Human impossibility is not the end of divine promise.
🛤️ An unfinished road can become the place where God speaks.
⏸️ Stopping short is not stronger than God's ability to call again.
This passage slows us down before Genesis 12. It teaches that faith often begins in ordinary family stories that only later reveal God's bigger plan.`,
    }),
    makeGenesisStudySection({
      chapter: 12,
      startVerse: 1,
      endVerse: 3,
      reference: "Genesis 12:1-3",
      title: "God Calls Abram",
      icon: "📣",
      summary: "God calls Abram to leave the familiar and promises land, nation, name, blessing, and worldwide impact.",
      what: `Genesis 12 is one of the biggest turns in the Bible. After Babel's pride and scattering, God calls Abram and speaks promise.
📣 God tells Abram to leave country, kindred, and his father's house.
🏠 The call touches Abram's security, identity, land, family, and future.
✨ God promises to make Abram a great nation, bless him, and make his name great.
🌍 The promise is not only for Abram; all families of the earth will be blessed through him.
🧭 Abram is called before he receives the map.
This is the beginning of the covenant family story that will shape the rest of Scripture and eventually lead to Jesus.`,
      phrases: [
        `📣 Get Thee Out
God's call requires Abram to leave what is familiar.
In the ancient world, family and land meant security, identity, and protection.
Faith begins with trusting God's word more than the world Abram already knows.`,
        `✨ I Will Make Thy Name Great
This directly contrasts Babel. Babel said, "Let us make a name."
God says to Abram, "I will make thy name great."
Genesis is teaching the difference between grasped greatness and received blessing.`,
        `🌍 All Families Of The Earth
The promise is global from the beginning.
God is not choosing Abram because He stopped caring about the nations.
He chooses Abram as the path through which blessing will reach the nations.`,
      ],
      truths: [
        `📣 Faith begins with God's word.
Abram does not invent the mission.
God speaks first.
Obedience is a response to the God who calls.`,
        `✨ God's promise answers human pride.
Babel tried to make a name.
God promises to give Abram a name.
The Bible contrasts self-made identity with grace-given identity.`,
        `🌍 Election is for blessing.
God chooses Abram, but the goal includes all families of the earth.
The promise is personal and worldwide.
God's plan narrows so blessing can widen.`,
      ],
      why: `Genesis 12:1-3 matters because it launches the promise story. God answers a scattered world by calling Abram into blessing.
📣 God's call may require leaving familiar security.
✨ What Babel tried to seize, God gives by promise.
🌍 God's blessing was never meant to stop with one person.
🧭 Faith can begin before the whole route is clear.
This section helps us understand the rest of the Bible. Abram's call is not a side story; it is the start of God's rescue plan moving toward all nations.`,
    }),
    makeGenesisStudySection({
      chapter: 12,
      startVerse: 4,
      endVerse: 9,
      reference: "Genesis 12:4-9",
      title: "Abram Goes",
      icon: "🚶",
      summary: "Abram obeys God's call, enters Canaan, receives the land promise, and builds altars.",
      what: `Abram responds to God's call by going. The passage is simple, but the obedience is costly.
🚶 Abram departs as the Lord had spoken to him.
👨‍👩‍👧 Lot and the household go with him, showing obedience affects real family movement.
⛺ Abram enters Canaan as a sojourner, not as someone who owns the land yet.
🌍 God appears and promises the land to Abram's offspring.
🔥 Abram builds altars and calls on the name of the Lord.
This section shows faith taking steps. Abram does not have possession yet, but he has God's word, and worship becomes the rhythm of his journey.`,
      phrases: [
        `🚶 Abram Departed
Abram's faith becomes movement.
He does not only admire the promise; he leaves in response to it.
Obedience begins before all the details are explained.`,
        `🌍 Unto Thy Seed Will I Give This Land
Abram is in the land, but he does not own it yet.
God promises the land to his offspring while Sarai is still barren.
The promise is bigger than what Abram can presently see.`,
        `🔥 Built He An Altar
Abram marks the journey with worship.
Altars show that the land promise is not only about property; it is about relationship with God.
Where Abram goes, worship goes with him.`,
      ],
      truths: [
        `🚶 Obedience moves.
Abram responds to God's word with action.
Faith is not only agreement in the mind.
It becomes steps in the real world.`,
        `⛺ Promise can come before possession.
Abram hears the land promise while still living as a sojourner.
God's word comes before visible ownership.
Faith lives between promise and fulfillment.`,
        `🔥 Worship belongs on the journey.
Abram builds altars as he moves.
He does not wait until everything is settled to worship.
Faith marks uncertain places with dependence on God.`,
      ],
      why: `Genesis 12:4-9 matters because it shows faith becoming movement and worship. Abram goes because God spoke.
🚶 Obedience may start before certainty arrives.
⛺ You can be in the promised direction before you possess the promise.
🔥 Worship can anchor a life in transition.
🌍 God's word is stronger than what the present moment can prove.
This passage teaches ordinary faith. Abram walks, pitches tents, builds altars, and keeps moving under the promise of God.`,
    }),
    makeGenesisStudySection({
      chapter: 12,
      startVerse: 10,
      endVerse: 20,
      reference: "Genesis 12:10-20",
      title: "Fear Takes Abram To Egypt",
      icon: "🌾",
      summary: "A famine tests Abram, fear takes over, Sarai is endangered, and God protects the promise.",
      what: `Almost immediately after Abram obeys, famine comes. That is important because obedience does not mean the road becomes easy.
🌾 Famine pushes Abram down into Egypt.
😟 Fear takes over, and Abram tells Sarai to say she is his sister.
👑 Sarai is taken into Pharaoh's house, putting the promise in danger.
🛡️ God protects Sarai and afflicts Pharaoh's house.
🚪 Abram leaves Egypt exposed, corrected, and preserved.
This section is honest about faith. Abram is called and blessed, but he is still capable of fear, compromise, and failure.`,
      phrases: [
        `🌾 There Was A Famine
The famine comes after Abram obeys, not before.
That teaches us not to assume difficulty means we heard God wrong.
Faith can be tested immediately after a real step of obedience.`,
        `😟 Say, I Pray Thee, Thou Art My Sister
Abram's plan is driven by fear and self-protection.
He puts Sarai at risk to protect himself.
Genesis does not hide the weakness of the man God called.`,
        `🛡️ The Lord Plagued Pharaoh
God protects Sarai and the promise even when Abram fails.
That does not excuse Abram's fear, but it magnifies God's faithfulness.
The promise survives because God guards it.`,
      ],
      truths: [
        `🌾 Obedience can still meet famine.
Abram is in God's story, and famine still comes.
Hard circumstances do not automatically mean disobedience.
Faith must learn to trust God under pressure.`,
        `😟 Fear can make faith compromise.
Abram's fear leads him to use Sarai for self-protection.
The Bible is honest about how fear can bend our choices.
Chosen people still need formation.`,
        `🛡️ God's promise is stronger than human failure.
Abram endangers the promise, but God protects Sarai.
God's faithfulness does not depend on Abram's perfection.
That is mercy, not permission to sin.`,
      ],
      why: `Genesis 12:10-20 matters because it keeps Abram human. He obeys God, but he also fails under pressure.
🌾 A hard season after obedience is still possible.
😟 Fear can make us protect ourselves in harmful ways.
🛡️ God can preserve His promise even when we make a mess.
🚪 Correction can be part of mercy.
This passage helps us avoid fake hero stories. Abram is not the Savior; he is a man learning to trust the faithful God who called him.`,
    }),
    makeGenesisStudySection({
      chapter: 13,
      startVerse: 1,
      endVerse: 7,
      reference: "Genesis 13:1-7",
      title: "Abram Returns To The Altar",
      icon: "🔥",
      summary: "Abram returns from Egypt to the place of worship, but growing abundance creates tension with Lot.",
      what: `Abram returns from Egypt and comes back to the place where he had built an altar. That feels like a spiritual reset after fear and failure.
🇪🇬 Abram leaves Egypt with Sarai, Lot, and great possessions.
🔥 He returns to the altar and calls on the name of the Lord.
🐑 Abram and Lot both have many flocks, herds, and tents.
⚠️ The land cannot support them together, and strife begins between their herdsmen.
🌍 Blessing creates a new kind of test.
This section shows that faith is not only tested by lack. Sometimes faith is tested by abundance, space, conflict, and how we handle relationships.`,
      phrases: [
        `🔥 Unto The Place Of The Altar
Abram returns to the place of worship after the Egypt failure.
That is a beautiful movement back toward dependence.
Failure does not have to be the end if it leads us back to calling on the Lord.`,
        `🐑 Their Substance Was Great
Abram and Lot are both wealthy in livestock and tents.
Blessing is real, but it creates pressure in the relationship.
Genesis is honest that abundance can bring complications.`,
        `⚠️ There Was Strife
The conflict begins among herdsmen, but it reveals a larger problem of space and direction.
Strife is not always caused by obvious evil.
Sometimes wise separation is needed when life can no longer be carried together peacefully.`,
      ],
      truths: [
        `🔥 Worship can be a reset.
Abram returns to the altar after Egypt.
The story moves him back to dependence on God.
Coming back to worship matters after failure.`,
        `🐑 Blessing can create pressure.
The flocks and herds are not bad.
But abundance creates a practical problem.
Faith has to handle prosperity wisely too.`,
        `⚠️ Conflict needs discernment.
Abram and Lot cannot keep moving the same way.
Ignoring strife would not make it holy.
Peace sometimes requires wise decisions about space and direction.`,
      ],
      why: `Genesis 13:1-7 matters because it shows Abram coming back to worship and facing a new test. Egypt tested him through fear; abundance now tests him through conflict.
🔥 Returning to the altar is possible after failure.
🐑 More blessing can mean more responsibility.
⚠️ Conflict should be handled before it becomes deeper damage.
🌍 Faith has to be practiced in practical situations.
This passage teaches that spiritual growth is not only dramatic. Sometimes it looks like returning to worship and dealing honestly with crowded tents and strained relationships.`,
    }),
    makeGenesisStudySection({
      chapter: 13,
      startVerse: 8,
      endVerse: 13,
      reference: "Genesis 13:8-13",
      title: "Lot Chooses By Sight",
      icon: "👀",
      summary: "Abram chooses peace, Lot chooses what looks good, and his choice moves him toward Sodom.",
      what: `Abram responds to conflict with generosity. Instead of grabbing first, he lets Lot choose the land.
🤝 Abram values peace between brothers.
👀 Lot lifts up his eyes and chooses the well-watered plain.
🌿 The land looks like Eden and Egypt, which makes it attractive.
🏙️ Lot moves his tents toward Sodom.
⚠️ Genesis warns that Sodom's people are wicked before the Lord.
This section is about sight and trust. Lot chooses what looks best, but Genesis quietly shows that what looks good can still move a person toward danger.`,
      phrases: [
        `🤝 Let There Be No Strife
Abram takes initiative to protect peace.
He does not use his status to crush Lot.
Faith can be strong enough to choose peace instead of winning every advantage.`,
        `👀 Lot Lifted Up His Eyes
Lot chooses by sight.
The plain looks fertile, watered, and promising.
But Genesis wants us to ask whether visible advantage is the same as spiritual wisdom.`,
        `🏙️ Toward Sodom
This phrase is the warning light in the passage.
Lot does not appear to move fully into Sodom at first; he moves toward it.
Danger often begins with direction before it becomes destination.`,
      ],
      truths: [
        `🤝 Faith does not have to grab.
Abram can let Lot choose first because Abram has God's promise.
He does not need to control every outcome.
Trust in God frees him from grasping.`,
        `👀 What looks good may not be good.
Lot sees fertile land.
Genesis sees spiritual danger near Sodom.
Discernment looks deeper than appearance.`,
        `🏙️ Direction matters.
Lot moves toward Sodom before later trouble develops.
Small directional choices can shape future danger.
Genesis teaches us to pay attention to where our desires are taking us.`,
      ],
      why: `Genesis 13:8-13 matters because it shows two ways to make decisions. Abram trusts enough to release control, while Lot chooses by what looks best.
🤝 Peace can be more valuable than getting first pick.
👀 Sight is useful, but it is not enough for wisdom.
🏙️ Moving toward danger is still dangerous.
🌿 A place can look like Eden and still pull the heart toward Sodom.
This passage helps us ask better questions. Not only, "Does this look good?" but, "Where will this choice take me?"`,
    }),
    makeGenesisStudySection({
      chapter: 13,
      startVerse: 14,
      endVerse: 18,
      reference: "Genesis 13:14-18",
      title: "God Repeats The Promise",
      icon: "🌄",
      summary: "After Lot separates, God tells Abram to look, walk, receive the promise, and build another altar.",
      what: `After Lot chooses by sight and separates, God speaks to Abram again. Abram let Lot choose first, but he did not lose the promise.
🌄 God tells Abram to lift up his eyes and look in every direction.
🌍 The land is promised to Abram and his offspring.
🌱 God promises descendants like the dust of the earth.
🚶 Abram is told to arise and walk through the land.
🔥 Abram moves to Hebron and builds another altar.
This section is God's answer to Abram's open hands. Lot looked and took what seemed best. Abram looks and receives what God gives.`,
      phrases: [
        `🌄 Lift Up Now Thine Eyes
Lot lifted his eyes earlier to choose for himself. Now God tells Abram to lift his eyes to receive a promise.
The contrast is beautiful.
One looks to take; the other looks because God is giving.`,
        `🌱 As The Dust Of The Earth
The promise of descendants is huge, especially because Sarai is barren.
God uses an impossible image on purpose.
Abram's future will be measured by God's power, not present circumstances.`,
        `🔥 Built There An Altar
Abram responds to promise with worship again.
The altar shows that the land promise is still tied to relationship with God.
Faith receives, moves, and worships.`,
      ],
      truths: [
        `🌄 Letting go does not cancel God's promise.
Abram gives Lot the first choice, but God repeats the promise afterward.
Faith does not have to panic when it releases control.
God's word is not threatened by generosity.`,
        `🌱 God's promises can be bigger than visible evidence.
Sarai is barren, but God promises descendants like dust.
The visible situation is not the final authority.
God's word defines the future.`,
        `🔥 Promise should lead to worship.
Abram builds another altar.
He receives God's word with dependence and gratitude.
Worship keeps the promise centered on God, not possession.`,
      ],
      why: `Genesis 13:14-18 matters because it shows God reaffirming promise after separation. Abram lets Lot choose, and God reminds Abram that the promise was never in Lot's hands.
🌄 God can show you more after you release control.
🌍 What God gives is better than what fear grabs.
🌱 Impossible promises are still safe when God speaks them.
🔥 Worship is the right response to repeated grace.
This passage ends Day 5 with steadiness. Abram is still in tents, still waiting, still childless, but God's promise is still alive.`,
    }),
  ],
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

type CompactReaderStudySectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  summary: string;
  movement: string[];
  phrases: Array<[string, string]>;
  truths: Array<[string, string]>;
  application: string[];
};

function makeCompactGenesisStudySection(section: CompactReaderStudySectionInput) {
  return makeGenesisStudySection({
    chapter: section.chapter,
    startVerse: section.startVerse,
    endVerse: section.endVerse,
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.summary,
    what: `${section.reference} ${section.summary}\n${section.movement.join("\n")}\nThis section is not just moving the story forward. It is teaching how God's promise keeps moving through pressure, weakness, waiting, and real people.`,
    phrases: section.phrases.map(([heading, body]) => `${heading}\n${body}`),
    truths: section.truths.map(([heading, body]) => `${heading}\n${body}`),
    why: `${section.reference} matters because it helps us understand God's promise in ordinary, messy life.\n${section.application.join("\n")}\nThis keeps the reader from only asking what happened. It helps them ask what this passage reveals about God, people, faith, and the promise moving forward.`,
  });
}

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 14,
      startVerse: 1,
      endVerse: 12,
      reference: "Genesis 14:1-12",
      title: "War Reaches Lot",
      icon: "⚔️",
      summary: "Kings go to war, Sodom is pulled into the conflict, and Lot is taken captive.",
      movement: ["⚔️ A regional war breaks out among kings and alliances.", "🏙️ Sodom is caught inside the conflict.", "⛓️ Lot is captured because he has settled near danger.", "📦 Goods and people are taken as spoils of war."],
      phrases: [["⚔️ Four Kings Against Five", "Genesis suddenly moves from tents and altars into international conflict. Abram's family story is now touching the larger political world around him."], ["🏙️ Sodom", "Lot chose the well-watered plain near Sodom in Genesis 13. Now that direction has consequences because Sodom's trouble becomes Lot's trouble."], ["⛓️ They Took Lot", "Lot is not the main villain here, but his location matters. Genesis is quietly showing that where we pitch our tents can place us near dangers we did not expect."]],
      truths: [["🧭 Direction matters.", "Lot's earlier choice keeps shaping his story. A decision that looked good by sight has moved him closer to harm."], ["⚔️ Faith lives in a violent world.", "Abram's story is not protected from political chaos. God's promise moves through a real world with kings, war, and loss."], ["⚠️ Consequences can arrive later.", "Genesis 13 looked like a land choice. Genesis 14 shows the cost of that direction. The Bible teaches us to think past the first impression."]],
      application: ["🧭 Ask where a choice is taking you, not only how it looks today.", "🏙️ Getting close to danger can make danger feel normal.", "⚔️ God's people still need wisdom in a broken world.", "⛓️ Mercy may be needed even after foolish direction."],
    }),
    makeCompactGenesisStudySection({
      chapter: 14,
      startVerse: 13,
      endVerse: 16,
      reference: "Genesis 14:13-16",
      title: "Abram Rescues Lot",
      icon: "🛡️",
      summary: "Abram gathers trained servants, pursues the enemy, and rescues Lot.",
      movement: ["📣 Abram hears that his nephew has been captured.", "🛡️ He gathers trained men from his own household.", "🌙 He pursues at night with courage and strategy.", "🤝 He brings back Lot, the people, and the goods."],
      phrases: [["📣 Abram Heard", "Abram does not pretend Lot's trouble is none of his business. Love moves toward a person in danger."], ["🛡️ Trained Servants", "Abram is a man of faith, but he is also prepared. His household has structure, resources, and people ready for action."], ["🤝 Brought Back Lot", "Lot moved toward Sodom, but Abram still moves toward Lot. This is rescue, not lecture first."]],
      truths: [["🛡️ Faith can be courageous.", "Abram's faith is not passive. It moves into danger to rescue someone else."], ["🤝 Grace moves toward the compromised.", "Lot's choices helped place him near danger, but Abram still rescues him. Mercy does not wait for a perfect victim."], ["📣 Responsibility hears need.", "Abram responds when he hears. Sometimes love begins with refusing to ignore the news."]],
      application: ["🛡️ Faith may call for brave action, not only private belief.", "🤝 People who chose poorly may still need rescue.", "📣 Do not ignore a need because the person had a role in the mess.", "🌙 Courage often includes wise strategy."],
    }),
    makeCompactGenesisStudySection({
      chapter: 14,
      startVerse: 17,
      endVerse: 20,
      reference: "Genesis 14:17-20",
      title: "Melchizedek Blesses Abram",
      icon: "🍞",
      summary: "Melchizedek blesses Abram and points the victory back to God Most High.",
      movement: ["🍞 Melchizedek brings bread and wine.", "👑 He is king of Salem and priest of God Most High.", "🙌 He blesses Abram.", "🛡️ He says God delivered Abram's enemies into his hand."],
      phrases: [["👑 King Of Salem", "Melchizedek appears suddenly as both king and priest. Salem is connected with peace and later with Jerusalem."], ["🙌 God Most High", "This title lifts Abram's victory above local politics. The God who called Abram is Lord over heaven and earth."], ["🔟 Tithes Of All", "Abram gives a tenth, recognizing that victory and possessions belong under God's authority."]],
      truths: [["🙌 Victory belongs to God.", "Abram fought, but Melchizedek says God delivered. Faith gives God credit after success."], ["🍞 Blessing can meet us after battle.", "After conflict, Abram receives bread, wine, and blessing. God strengthens His servant after pressure."], ["👑 God's priestly witness appears outside Abram's household.", "Melchizedek reminds us that God is not limited by what Abram can see. The Most High already has witnesses in the world."]],
      application: ["🙌 Do not let success make you forget who delivered you.", "🍞 After hard battles, receive strengthening with humility.", "🔟 Giving can be a way of confessing that God owns the victory.", "👑 God may have faithful witnesses where you did not expect them."],
    }),
    makeCompactGenesisStudySection({
      chapter: 14,
      startVerse: 21,
      endVerse: 24,
      reference: "Genesis 14:21-24",
      title: "Abram Refuses Sodom's Reward",
      icon: "🚫",
      summary: "Abram refuses Sodom's goods so no corrupt king can claim he made Abram rich.",
      movement: ["🏙️ The king of Sodom offers Abram the goods.", "✋ Abram refuses the reward.", "🧵 He will not take even a thread or sandal strap.", "🙌 He wants God alone credited as his source."],
      phrases: [["🏙️ King Of Sodom", "Sodom's king offers wealth after the rescue. The offer may look practical, but Abram sees the spiritual danger."], ["🧵 From A Thread Even To A Shoelatchet", "Abram's refusal is detailed and strong. He will not leave room for Sodom to claim ownership over his success."], ["🙌 Lest Thou Shouldest Say", "Abram is protecting the testimony of God's blessing. He wants no confusion about who makes him rich."]],
      truths: [["🧭 Discernment is needed after victory.", "Temptation can come after courage. Abram wins the battle, then must refuse a polluted reward."], ["🙌 God's blessing must stay clean.", "Abram does not want success if it lets Sodom claim credit. The source of blessing matters."], ["🚫 Not every open door should be taken.", "The offer is available, but Abram refuses it. Faith sometimes says no to what would be easy to accept."]],
      application: ["🧭 Ask what a reward will attach you to.", "🚫 Some gains are not worth the spiritual confusion they create.", "🙌 Let God be clearly seen as your source.", "🧵 Small compromises can create big claims later."],
    }),
    makeCompactGenesisStudySection({
      chapter: 15,
      startVerse: 1,
      endVerse: 6,
      reference: "Genesis 15:1-6",
      title: "God Speaks To Abram's Fear",
      icon: "🌌",
      summary: "God meets Abram's fear, repeats the promise, and Abram believes the Lord.",
      movement: ["🛡️ God calls Himself Abram's shield and reward.", "💬 Abram honestly names the ache of having no child.", "🌌 God points him to the stars.", "✅ Abram believes, and it is counted to him for righteousness."],
      phrases: [["🛡️ I Am Thy Shield", "God does not only give Abram protection. He says He Himself is Abram's shield, which makes God's presence the deepest security."], ["💬 What Wilt Thou Give Me", "Abram's question is honest, not fake. Faith can bring real ache into conversation with God."], ["✅ Counted It To Him For Righteousness", "This becomes one of the Bible's major faith texts. Abram is counted righteous by believing God's promise, not by controlling the outcome."]],
      truths: [["💬 Faith can speak honestly.", "Abram believes, but he still has questions. Biblical faith is not pretending the ache is gone."], ["🌌 God's promise can be bigger than visible evidence.", "Abram sees no son, but God shows him stars. The promise rests on God's word."], ["✅ Righteousness is received by faith.", "Abram trusts the Lord, and God counts it as righteousness. This truth echoes through the rest of Scripture."]],
      application: ["💬 Bring the real ache to God.", "🛡️ Remember that God Himself is better than any reward He gives.", "🌌 Let God's promise stretch your imagination beyond what you can count.", "✅ Faith rests on the One who speaks."],
    }),
    makeCompactGenesisStudySection({
      chapter: 15,
      startVerse: 7,
      endVerse: 11,
      reference: "Genesis 15:7-11",
      title: "Abram Asks For Assurance",
      icon: "🕊️",
      summary: "Abram asks how he will know, and God prepares a covenant ceremony.",
      movement: ["🏜️ God reminds Abram He brought him from Ur.", "❓ Abram asks how he can know he will inherit the land.", "🐐 Animals are prepared for covenant making.", "🕊️ Abram waits and drives away birds from the pieces."],
      phrases: [["❓ Whereby Shall I Know", "Abram's question is not treated as rebellion. God answers by giving covenant assurance."], ["🐐 Bring Me An Heifer", "The animals prepare for an ancient covenant ceremony. God is about to confirm His promise in a serious, visible way."], ["🕊️ The Birds Came Down", "Abram has to guard the pieces while he waits. Even in a covenant moment, waiting can include resistance and patience."]],
      truths: [["❓ Honest questions can meet covenant grace.", "God does not crush Abram for asking how he will know. He gives assurance."], ["🤝 God confirms what He promises.", "The covenant ceremony shows God stooping to strengthen Abram's faith."], ["⏳ Waiting may require guarding hope.", "Abram waits and drives away birds. Faith sometimes protects what God has spoken while fulfillment is still ahead."]],
      application: ["❓ Ask honest questions without turning away from God.", "🤝 Let God's covenant faithfulness be stronger than your uncertainty.", "🕊️ Guard hope when discouragement tries to land on it.", "⏳ Assurance does not always remove waiting."],
    }),
    makeCompactGenesisStudySection({
      chapter: 15,
      startVerse: 12,
      endVerse: 16,
      reference: "Genesis 15:12-16",
      title: "God Tells Abram The Long Road",
      icon: "🌑",
      summary: "God reveals that Abram's descendants will suffer, be delivered, and return in God's timing.",
      movement: ["🌑 Darkness falls over Abram.", "⛓️ God reveals future affliction in another land.", "⚖️ God promises to judge the oppressor.", "🕊️ Abram is promised peace, and his descendants will return."],
      phrases: [["🌑 Horror Of Great Darkness", "The covenant promise includes a heavy vision. God's plan is true, but it will pass through suffering."], ["⛓️ A Stranger In A Land", "This points ahead to Israel's bondage in Egypt. Genesis is already preparing the Exodus story."], ["⏳ The Iniquity Of The Amorites", "God's timing includes justice and patience. The land promise waits while God gives time before judgment is full."]],
      truths: [["⏳ Promise does not mean instant.", "God's promise is sure, but the road will be long. Faith must learn time."], ["⚖️ God sees oppression.", "The affliction of Abram's descendants will not be ignored. God promises judgment and deliverance."], ["🕊️ God can tell hard truth with mercy.", "Abram hears about suffering, but also peace, deliverance, and return. God does not abandon the future to darkness."]],
      application: ["⏳ Do not confuse delay with denial.", "🌑 Some promises pass through dark seasons.", "⚖️ God sees oppression even before deliverance arrives.", "🕊️ The long road can still be held by God."],
    }),
    makeCompactGenesisStudySection({
      chapter: 15,
      startVerse: 17,
      endVerse: 21,
      reference: "Genesis 15:17-21",
      title: "God Makes Covenant",
      icon: "🔥",
      summary: "God passes between the pieces and binds Himself to the promise.",
      movement: ["🌑 Darkness falls.", "🔥 A smoking furnace and burning lamp pass between the pieces.", "🤝 The Lord makes covenant with Abram.", "🌍 The land boundaries are named."],
      phrases: [["🔥 Smoking Furnace And Burning Lamp", "The symbols represent God's own presence passing through the covenant pieces. Abram watches while God acts."], ["🤝 Made A Covenant", "This is not a casual promise. God solemnly binds Himself to His word."], ["🌍 Unto Thy Seed Have I Given This Land", "The land promise is spoken as certain because it rests on God's covenant commitment."]],
      truths: [["🔥 God carries the covenant.", "Abram does not pass between the pieces. God does. The promise rests on God's faithfulness."], ["🤝 Covenant gives assurance.", "God meets Abram's question with a binding promise. Faith is strengthened by God's commitment."], ["🌍 The future belongs to God's word.", "The land is not possessed yet, but it is promised. God's covenant defines the future before Abram can see it."]],
      application: ["🔥 Rest in the God who carries what you cannot.", "🤝 Let God's commitment be stronger than your fear.", "🌍 Do not measure the promise only by present possession.", "🙌 Covenant faithfulness is the backbone of Abram's story."],
    }),
  ],
);

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 16,
      startVerse: 1,
      endVerse: 3,
      reference: "Genesis 16:1-3",
      title: "Sarai Tries To Force The Promise",
      icon: "⚠️",
      summary: "Waiting turns into control as Sarai gives Hagar to Abram.",
      movement: ["💔 Sarai still has no child.", "👤 Hagar is brought into the promise problem.", "⏳ The delay feels unbearable.", "⚠️ The household chooses a shortcut God did not command."],
      phrases: [["💔 Bare Him No Children", "This is not a small detail. Sarai's barrenness sits directly against the promise of descendants."], ["👤 My Maid", "Hagar is treated as a solution to someone else's ache. Genesis wants us to feel the human cost of control."], ["⚠️ Abram Hearkened", "Abram listens to Sarai's plan instead of leading the household back to God's promise. The echo of Eden is hard to miss."]],
      truths: [["⏳ Waiting can tempt people to control.", "The promise has not arrived, so Sarai tries to force an outcome."], ["👤 Shortcuts can use people.", "Hagar becomes part of a plan that treats her like a tool, not merely a person."], ["⚠️ Practical does not always mean faithful.", "The plan may have made cultural sense, but it was not what God commanded."]],
      application: ["⏳ Delayed promises can expose where we want control.", "👤 Never treat people like tools for your fear.", "⚠️ A practical shortcut can still wound a household.", "🙏 Waiting should drive faith toward God, not manipulation."],
    }),
    makeCompactGenesisStudySection({
      chapter: 16,
      startVerse: 4,
      endVerse: 6,
      reference: "Genesis 16:4-6",
      title: "Hagar Is Mistreated",
      icon: "💔",
      summary: "The shortcut creates contempt, blame, harsh treatment, and Hagar's flight.",
      movement: ["👶 Hagar conceives.", "💔 Tension grows between Sarai and Hagar.", "😠 Sarai blames Abram.", "🚪 Hagar flees from harsh treatment."],
      phrases: [["👶 When She Saw That She Had Conceived", "Pregnancy changes the household's power dynamics. What looked like a solution now exposes deeper pain."], ["😠 My Wrong Be Upon Thee", "Sarai's pain turns outward in blame. Control has not brought peace."], ["🚪 She Fled", "Hagar's flight shows how severe the situation has become. The shortcut has created a wounded person in the wilderness."]],
      truths: [["💔 Control creates collateral damage.", "The plan does not only affect Abram and Sarai. Hagar is deeply wounded by it."], ["😠 Blame often follows manipulation.", "When human plans produce pain, people often start accusing each other."], ["🚪 God sees the one pushed out.", "Hagar leaves the household, but she does not leave God's sight."]],
      application: ["💔 Forced solutions can create real victims.", "😠 Blame is not repentance.", "🚪 Pay attention to who gets wounded by your shortcut.", "🙏 God sees people others push aside."],
    }),
    makeCompactGenesisStudySection({
      chapter: 16,
      startVerse: 7,
      endVerse: 12,
      reference: "Genesis 16:7-12",
      title: "God Finds Hagar",
      icon: "🕊️",
      summary: "The angel of the Lord finds Hagar in the wilderness and names her son Ishmael.",
      movement: ["🏜️ Hagar is alone in the wilderness.", "🕊️ The angel of the Lord finds her.", "❓ God asks where she came from and where she is going.", "👂 Her son is named Ishmael because the Lord hears affliction."],
      phrases: [["🕊️ Found Her", "Hagar is not the one searching for God in the scene. God finds her first."], ["❓ Whence Camest Thou", "The question gives Hagar dignity. God lets her speak her story."], ["👂 Ishmael", "Ishmael means God hears. The child's name becomes a living reminder that Hagar's affliction reached God."]],
      truths: [["👀 God sees the mistreated.", "Hagar is vulnerable, but not invisible. God meets her in the wilderness."], ["👂 God hears affliction.", "The name Ishmael turns Hagar's pain into testimony. Her suffering has reached heaven."], ["🕊️ God speaks future to the wounded.", "Hagar receives a word about her son's future. God does not treat her as a side character."]],
      application: ["👀 Being overlooked by people is not the same as being unseen by God.", "👂 Your affliction is not silent before Him.", "❓ God can meet you with questions that restore dignity.", "🕊️ The wilderness can become a place of encounter."],
    }),
    makeCompactGenesisStudySection({
      chapter: 16,
      startVerse: 13,
      endVerse: 16,
      reference: "Genesis 16:13-16",
      title: "The God Who Sees",
      icon: "👀",
      summary: "Hagar names the Lord as the God who sees her, and Ishmael is born.",
      movement: ["👀 Hagar names God as the One who sees.", "💧 The well is remembered.", "👶 Ishmael is born.", "⏳ Abram is eighty-six, and the promised Isaac has still not come."],
      phrases: [["👀 Thou God Seest Me", "This is one of the most tender names for God in Genesis. Hagar knows God has personally seen her."], ["💧 Beer-lahai-roi", "The well name preserves the encounter. A place of flight becomes a place of testimony."], ["⏳ Abram Was Fourscore And Six", "The timestamp reminds us that time is still passing. The shortcut has produced a son, but not the covenant son God promised."]],
      truths: [["👀 God gives dignity through being seen.", "Hagar's encounter tells mistreated people that they are visible to God."], ["💧 Places of pain can become places of testimony.", "The well remembers what God did there."], ["⏳ A shortcut does not end the waiting.", "Ishmael is born, but Isaac is still future. Control did not replace God's promise."]],
      application: ["👀 Let God's seeing speak louder than people's misuse.", "💧 Remember the places where God met you.", "⏳ Do not mistake a shortcut outcome for the promised fulfillment.", "🕊️ God can show compassion inside a complicated story."],
    }),
    makeCompactGenesisStudySection({
      chapter: 17,
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 17:1-8",
      title: "Abram Becomes Abraham",
      icon: "🪞",
      summary: "God appears after years of waiting, gives Abram a new name, and restates the covenant.",
      movement: ["⏳ Thirteen years pass.", "🙇 Abram falls on his face before God.", "🪞 Abram becomes Abraham.", "🌍 God promises many nations and an everlasting covenant."],
      phrases: [["⏳ Ninety Years Old And Nine", "The age matters because the promise looks even more impossible. God speaks when human strength is fading."], ["🪞 Abraham", "Abram's new name means father of many. God names him according to promise before the visible evidence arrives."], ["🤝 Everlasting Covenant", "God's promise is not temporary mood or vague encouragement. It is covenant commitment across generations."]],
      truths: [["🪞 God names people by promise.", "Abraham receives an identity based on God's future, not present appearance."], ["⏳ Delay does not cancel covenant.", "Thirteen years pass, but God has not forgotten what He said."], ["🌍 The promise is bigger than one household.", "Many nations are in view. God's plan keeps widening."]],
      application: ["🪞 Let God define you by His promise, not your current evidence.", "⏳ Years of waiting do not make God unfaithful.", "🙇 Worship is the right posture before impossible promise.", "🤝 Covenant is stronger than delay."],
    }),
    makeCompactGenesisStudySection({
      chapter: 17,
      startVerse: 9,
      endVerse: 14,
      reference: "Genesis 17:9-14",
      title: "The Covenant Sign",
      icon: "✂️",
      summary: "Circumcision becomes the sign marking Abraham's household as belonging to the covenant.",
      movement: ["🤝 God commands Abraham to keep the covenant.", "✂️ Circumcision is given as the sign.", "👶 The sign reaches future generations.", "⚠️ The covenant sign is treated seriously."],
      phrases: [["✂️ Circumcised", "The covenant is marked in the body. God's promise is not just an idea Abraham thinks about; it marks the household."], ["👶 Eight Days Old", "The sign is generational. Children are brought under the covenant identity from the beginning."], ["⚠️ Cut Off", "The warning shows that covenant membership is serious. God's promise should not be treated casually."]],
      truths: [["🤝 Covenant creates belonging.", "The sign marks Abraham's household as set apart under God's promise."], ["✂️ Faith has visible obedience.", "The covenant is not only believed inwardly. It is obeyed outwardly."], ["👶 God's promise thinks generationally.", "The sign reaches beyond Abraham into the future family line."]],
      application: ["🤝 Belonging to God should shape visible life.", "✂️ Do not treat covenant signs like empty symbols.", "👶 God's work often reaches generations beyond us.", "⚠️ Holy things should be handled seriously."],
    }),
    makeCompactGenesisStudySection({
      chapter: 17,
      startVerse: 15,
      endVerse: 22,
      reference: "Genesis 17:15-22",
      title: "Sarah And Isaac Are Named",
      icon: "👑",
      summary: "God renames Sarah, promises Isaac, and clarifies that the covenant line will come through him.",
      movement: ["👑 Sarai becomes Sarah.", "😄 Abraham laughs at the promise.", "👶 Isaac is named before birth.", "🙏 Ishmael is blessed, but covenant will go through Isaac."],
      phrases: [["👑 Sarah", "God gives Sarai a covenant name too. She is not background to Abraham's story; she is central to the promised birth."], ["😄 Abraham Laughed", "Abraham's laughter shows the promise still feels impossible. God meets the laughter with clarity, not confusion."], ["👶 Isaac", "Isaac's name is tied to laughter. The impossible promise will carry a name that remembers how impossible it sounded."]],
      truths: [["👑 Sarah matters to the covenant.", "God names and blesses Sarah directly. The promise will come through her."], ["🙏 God can bless without changing the covenant line.", "Ishmael is blessed, but Isaac carries the covenant. God's compassion and God's chosen promise both stand."], ["👶 God names the future before it is visible.", "Isaac is named before Sarah conceives. God's word gets there first."]],
      application: ["👑 Do not treat Sarah as a side note; God does not.", "😄 Bring impossible feelings to God honestly.", "🙏 God's care can be wider than the main covenant line.", "👶 Trust the future God names before you see it."],
    }),
    makeCompactGenesisStudySection({
      chapter: 17,
      startVerse: 23,
      endVerse: 27,
      reference: "Genesis 17:23-27",
      title: "Abraham Obeys That Same Day",
      icon: "✅",
      summary: "Abraham responds to God's covenant command immediately and marks his household.",
      movement: ["✅ Abraham obeys that same day.", "👦 Ishmael is included in the household sign.", "🏠 Every male in the household is circumcised.", "🤝 The promise is marked before Isaac is seen."],
      phrases: [["✅ The Selfsame Day", "Abraham does not delay obedience once God gives the command. Faith responds promptly."], ["🏠 All The Men Of His House", "The covenant sign affects the whole household. Abraham's obedience has community impact."], ["👦 Ishmael His Son", "Ishmael is included in the sign, even though Isaac will carry the covenant line. The family story remains complex and compassionate."]],
      truths: [["✅ Faith responds when God speaks.", "Waiting is part of faith, but so is immediate obedience when the command is clear."], ["🏠 Leadership affects a household.", "Abraham's response brings his house under the covenant sign."], ["🤝 Promise can be marked before it is visible.", "Isaac has not been born, but the covenant sign is already on the household."]],
      application: ["✅ Do not delay clear obedience.", "🏠 Your faithfulness can shape your household.", "🤝 Mark the promise before the evidence arrives.", "👦 Remember that complicated families still sit under God's care."],
    }),
  ],
);

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 18,
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 18:1-8",
      title: "Abraham Welcomes The Visitors",
      icon: "🏕️",
      summary: "The Lord appears near Abraham's tent, and Abraham receives the visitors with generous hospitality.",
      movement: ["🏕️ Abraham sits by the tent in the heat of the day.", "👀 Three visitors appear.", "🏃 Abraham runs to welcome them.", "🍞 A meal is prepared, and holy promise comes near ordinary hospitality."],
      phrases: [["🏕️ The Lord Appeared", "The passage begins by telling us more than Abraham can fully see at first. This visit is more than ordinary company."], ["🏃 Ran To Meet Them", "Abraham's welcome is eager and humble. He does not treat the moment casually."], ["🍞 A Morsel Of Bread", "Abraham speaks modestly, but prepares generously. Hospitality becomes the setting where God's promise will be heard again."]],
      truths: [["🏕️ God can meet people in ordinary spaces.", "The scene is a tent, a meal, and a hot day. God brings promise near normal life."], ["🍞 Hospitality can become holy ground.", "Abraham's welcome opens a space where divine conversation unfolds."], ["🙇 Reverence can look practical.", "Water, rest, bread, and a meal become expressions of honor."]],
      application: ["🏕️ Do not despise ordinary places where God may meet you.", "🍞 Hospitality is more spiritual than we often think.", "🏃 Eagerness to honor others matters.", "✨ Promise can arrive in the middle of daily life."],
    }),
    makeCompactGenesisStudySection({
      chapter: 18,
      startVerse: 9,
      endVerse: 15,
      reference: "Genesis 18:9-15",
      title: "Sarah Hears The Promise",
      icon: "😄",
      summary: "Sarah hears the promise of a son, laughs within herself, and God asks whether anything is too hard for Him.",
      movement: ["👂 Sarah listens from the tent.", "😄 She laughs because the promise sounds impossible.", "❓ God asks the central question: Is anything too hard for the Lord?", "👶 The promised son is still coming at the appointed time."],
      phrases: [["👂 Where Is Sarah", "God brings Sarah personally into the promise conversation. She is not an accessory to Abraham's faith."], ["😄 Sarah Laughed Within Herself", "Sarah's laugh is hidden, but God sees it. The Bible is honest about the gap between promise and human feeling."], ["❓ Is Any Thing Too Hard For The Lord", "This question is the theological center of the scene. The issue is not Sarah's age; it is God's power."]],
      truths: [["👑 Sarah is central to the promise.", "God addresses the promise through Sarah, not around her."], ["❓ God's power is the answer to impossibility.", "The passage does not deny the situation is humanly impossible. It asks whether that limits the Lord."], ["⏳ God works at the appointed time.", "The promise has timing. Delay does not mean God lost control."]],
      application: ["❓ Put impossible situations under the question God asks.", "😄 God can handle the laugh you hide inside.", "👂 Let the promise become personal, not only something you hear for others.", "⏳ Appointed time matters to God."],
    }),
    makeCompactGenesisStudySection({
      chapter: 18,
      startVerse: 16,
      endVerse: 21,
      reference: "Genesis 18:16-21",
      title: "The Lord Looks Toward Sodom",
      icon: "🌆",
      summary: "God brings Abraham near as He reveals that the cry against Sodom and Gomorrah is great.",
      movement: ["🌆 The visitors look toward Sodom.", "🤝 Abraham is brought into the conversation.", "📣 The cry against Sodom and Gomorrah is great.", "⚖️ God judges with knowledge, not rumor."],
      phrases: [["🤝 Shall I Hide From Abraham", "God draws Abraham into His purposes. Covenant relationship includes knowing God's heart for righteousness and justice."], ["📣 The Cry Of Sodom", "The cry suggests suffering and grievous evil reaching God. Judgment is connected to real wrong, not divine moodiness."], ["👁️ I Will Go Down Now And See", "This language shows careful judgment. God is not careless or uninformed."]],
      truths: [["⚖️ God judges with perfect knowledge.", "Sodom is not judged by gossip or exaggeration. God sees truly."], ["📣 Evil creates a cry before God.", "Human wickedness is not invisible. The suffering it causes reaches heaven."], ["🤝 Covenant people learn God's justice.", "Abraham is being formed to understand righteousness, justice, and mercy."]],
      application: ["⚖️ Trust that God's judgment is never careless.", "📣 The cries of victims matter to Him.", "🤝 Knowing God should shape our concern for righteousness.", "🌆 Cities and cultures are accountable to God."],
    }),
    makeCompactGenesisStudySection({
      chapter: 18,
      startVerse: 22,
      endVerse: 33,
      reference: "Genesis 18:22-33",
      title: "Abraham Intercedes",
      icon: "🙏",
      summary: "Abraham draws near and pleads for mercy while trusting the Judge of all the earth to do right.",
      movement: ["🙏 Abraham stands before the Lord.", "⚖️ He asks whether the Judge of all the earth will do right.", "🔢 He pleads from fifty down to ten.", "🙇 His prayer is bold but humble."],
      phrases: [["🙏 Abraham Drew Near", "Prayer here is closeness with reverence. Abraham approaches God, but he knows he is dust and ashes."], ["⚖️ Judge Of All The Earth", "Abraham appeals to God's own justice. He does not ask God to be less holy, but to act according to perfect righteousness."], ["🔢 Peradventure Ten", "The shrinking numbers show persistent intercession. Abraham keeps asking for mercy without pretending evil is harmless."]],
      truths: [["🙏 Intercession is bold humility.", "Abraham draws near, but he does not command God. True prayer can be both courageous and reverent."], ["⚖️ God's justice is the foundation of mercy.", "Abraham's hope rests on the Judge doing right."], ["🕊️ Mercy is worth asking for.", "Abraham keeps pleading because he knows God is righteous and merciful."]],
      application: ["🙏 Draw near for others, not only yourself.", "⚖️ Anchor prayer in God's character.", "🙇 Boldness and humility belong together.", "🕊️ Keep asking for mercy while honoring justice."],
    }),
    makeCompactGenesisStudySection({
      chapter: 19,
      startVerse: 1,
      endVerse: 11,
      reference: "Genesis 19:1-11",
      title: "Sodom's Violence Is Exposed",
      icon: "🌃",
      summary: "The angels enter Sodom, and the city's violent wickedness is revealed at Lot's door.",
      movement: ["🌃 Two angels arrive in Sodom.", "🚪 Lot brings them into his house.", "⚠️ The men of the city surround the house.", "👁️ The attackers are struck with blindness."],
      phrases: [["🚪 Lot Sat In The Gate", "The gate was a place of influence. Lot is not just near Sodom anymore; he is woven into city life."], ["⚠️ Both Old And Young", "The language shows widespread corruption. The city is not being judged for one private mistake."], ["👁️ Smote The Men With Blindness", "The physical blindness matches the moral blindness already on display. The city cannot find the door because it has already lost its way."]],
      truths: [["⚠️ Wickedness can become communal.", "Sodom's sin is public and aggressive. Genesis shows a culture united around violence."], ["🚪 Compromise can entangle a household.", "Lot is in the gate and his family is inside the city. His location has shaped his household's danger."], ["👁️ God exposes what a city is.", "The visitors reveal the truth of Sodom's condition before judgment falls."]],
      application: ["⚠️ Do not normalize a violent culture because it feels familiar.", "🚪 Where you settle can shape your household.", "👁️ Moral blindness can be worse than physical blindness.", "🛡️ God can protect His messengers in hostile places."],
    }),
    makeCompactGenesisStudySection({
      chapter: 19,
      startVerse: 12,
      endVerse: 22,
      reference: "Genesis 19:12-22",
      title: "Mercy Pulls Lot Out",
      icon: "🤲",
      summary: "Lot lingers, but the angels take him by the hand because the Lord is merciful.",
      movement: ["📣 Lot warns his family, but they think he is joking.", "⏳ Morning comes, and Lot lingers.", "🤲 The angels seize his hand.", "🏃 Lot is commanded to escape."],
      phrases: [["😶 As One That Mocked", "Lot's warning has no weight with his sons-in-law. A compromised witness can sound unbelievable when urgency finally comes."], ["⏳ He Lingered", "Lot knows judgment is coming, but he hesitates. Attachment can make danger hard to leave."], ["🤲 The Lord Being Merciful", "This line explains the rescue. Lot escapes because mercy grabs him when he is slow to move."]],
      truths: [["🤲 Mercy can be forceful.", "God's mercy does not merely suggest escape. It pulls Lot out of danger."], ["⏳ Lingering is dangerous.", "Lot's hesitation shows how attached the heart can become to a place under judgment."], ["📣 Compromise weakens witness.", "Lot's warning sounds like a joke to his own family. That is tragic."]],
      application: ["🏃 When God says flee, do not negotiate with the danger.", "🤲 Thank God for mercy that pulls when we linger.", "📣 Live so your warnings carry weight.", "⏳ Do not confuse delay with safety."],
    }),
    makeCompactGenesisStudySection({
      chapter: 19,
      startVerse: 23,
      endVerse: 29,
      reference: "Genesis 19:23-29",
      title: "Sodom And Gomorrah Fall",
      icon: "🔥",
      summary: "Judgment falls on Sodom and Gomorrah, Lot's wife looks back, and God remembers Abraham.",
      movement: ["☀️ Lot reaches Zoar as the sun rises.", "🔥 Fire and brimstone fall on Sodom and Gomorrah.", "🧂 Lot's wife looks back and becomes a warning.", "🤲 God remembers Abraham and sends Lot out."],
      phrases: [["🔥 Brimstone And Fire", "The judgment is severe because the corruption is severe. Genesis does not treat wickedness lightly."], ["🧂 Looked Back", "Lot's wife becomes a warning about divided attachment. Her body leaves, but her heart looks back."], ["🤲 God Remembered Abraham", "Lot's rescue is connected to God's covenant relationship with Abraham. Intercession and mercy are both in view."]],
      truths: [["⚖️ Judgment is real.", "Sodom's fall shows that God does not ignore grievous evil forever."], ["🧂 The heart can remain attached to what the body leaves.", "Lot's wife warns us that escape requires more than movement."], ["🤲 Mercy remembers covenant.", "God remembers Abraham and rescues Lot. Judgment does not erase mercy."]],
      application: ["🔥 Take evil seriously because God does.", "🧂 Do not keep longing for what God is rescuing you from.", "🤲 Prayer for others matters more than we may see.", "⚖️ Mercy and judgment can appear in the same story."],
    }),
    makeCompactGenesisStudySection({
      chapter: 19,
      startVerse: 30,
      endVerse: 38,
      reference: "Genesis 19:30-38",
      title: "Lot's Family After Sodom",
      icon: "💔",
      summary: "Lot's family survives Sodom, but the damage of fear and compromise continues in the cave.",
      movement: ["⛰️ Lot leaves Zoar and lives in a cave.", "💔 His daughters act out of fear and distorted thinking.", "🍷 Wine and deception return in a dark family scene.", "👶 Moab and Ammon begin from this broken story."],
      phrases: [["⛰️ Dwelt In A Cave", "Lot leaves the city, but his life has shrunk into fear and isolation. Survival is not the same as wholeness."], ["🍷 Made Their Father Drink Wine", "The scene is disturbing on purpose. Genesis refuses to sanitize the effects of a damaged household."], ["👶 Moab And Ammon", "The children born here become peoples who will matter later in Israel's story. Genesis shows painful origins without hiding them."]],
      truths: [["💔 Rescue does not erase damage instantly.", "Lot is out of Sodom, but Sodom's shadow remains over the family."], ["⚠️ Compromise can leave generational scars.", "The choices around Sodom continue to affect the next generation."], ["📖 The Bible tells hard truth.", "Genesis does not hide disturbing family damage. It teaches honestly."]],
      application: ["💔 Do not assume leaving danger means all healing is done.", "⚠️ Compromise can wound people after the crisis passes.", "📖 Let Scripture's honesty teach sober wisdom.", "🕊️ Broken origins are not hidden from God."],
    }),
    makeCompactGenesisStudySection({
      chapter: 20,
      startVerse: 1,
      endVerse: 18,
      reference: "Genesis 20:1-18",
      title: "Abraham Repeats An Old Fear",
      icon: "🔁",
      summary: "Abraham again says Sarah is his sister, but God protects Sarah and preserves the promise.",
      movement: ["🔁 Abraham repeats the sister lie in Gerar.", "👑 Abimelech takes Sarah.", "🌙 God warns Abimelech in a dream.", "🛡️ Sarah is protected before Isaac is born."],
      phrases: [["🔁 She Is My Sister", "Abraham repeats an old fear pattern from Egypt. Growth is real in his life, but weakness is still present."], ["🌙 God Came In A Dream", "God intervenes with Abimelech directly. The promise is too important to leave unprotected."], ["🛡️ He Is A Prophet", "God still calls Abraham a prophet even while correcting the situation. Calling does not erase accountability."]],
      truths: [["🔁 Old fears can return.", "Abraham has walked with God for years, but fear still resurfaces. Scripture is honest about repeated weakness."], ["🛡️ God protects the promise.", "Sarah must be protected because Isaac is coming. God's plan is not fragile."], ["🙏 Grace can include correction.", "God corrects Abimelech and Abraham's situation. Mercy does not pretend the lie was harmless."]],
      application: ["🔁 Pay attention to old fear patterns that repeat.", "🛡️ God's promise is stronger than your weakness.", "🙏 Correction can be mercy.", "👑 God can protect others from the damage our fear might cause."],
    }),
  ],
);

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 21,
      startVerse: 1,
      endVerse: 7,
      reference: "Genesis 21:1-7",
      title: "Isaac Is Born",
      icon: "👶",
      summary: "God visits Sarah as He said, and Isaac is born at the appointed time.",
      movement: ["👶 Sarah gives birth to Isaac.", "⏳ The child comes at the appointed time.", "😄 Sarah's laughter becomes joy.", "🤝 God's long promise proves faithful."],
      phrases: [["📖 As He Had Said", "The wording repeats that God did exactly what He promised. Isaac's birth is not luck; it is fulfilled word."], ["⏳ Set Time", "God's promise had timing. The delay was painful, but not uncontrolled."], ["😄 God Hath Made Me To Laugh", "Sarah's earlier laughter of disbelief becomes laughter of joy. God transforms the meaning of the laugh."]],
      truths: [["🤝 God keeps His word.", "The chapter emphasizes promise fulfilled. What God said, God did."], ["⏳ God's timing is part of faith.", "Isaac arrives at the appointed time, not the convenient time."], ["😄 God can turn disbelief into joy.", "Sarah's laughter is redeemed by fulfillment. The impossible becomes testimony."]],
      application: ["🤝 Let fulfilled promises teach you to trust the next one.", "⏳ Delay is not proof that God forgot.", "😄 God can turn painful waiting into worshipful laughter.", "👶 Promise can arrive after human strength is gone."],
    }),
    makeCompactGenesisStudySection({
      chapter: 21,
      startVerse: 8,
      endVerse: 21,
      reference: "Genesis 21:8-21",
      title: "God Hears Hagar And Ishmael",
      icon: "💧",
      summary: "Hagar and Ishmael are sent away, but God hears the boy and opens Hagar's eyes to water.",
      movement: ["🏠 Tension rises in Abraham's household.", "🏜️ Hagar and Ishmael are sent into the wilderness.", "👂 God hears the boy.", "💧 God opens Hagar's eyes to a well."],
      phrases: [["👂 God Heard The Voice Of The Lad", "Ishmael's name means God hears, and now Genesis shows that name becoming reality again."], ["💧 God Opened Her Eyes", "The well is present, but Hagar needs God to help her see provision. Despair can blind people to mercy nearby."], ["🌍 A Great Nation", "Isaac carries the covenant line, but Ishmael is not abandoned. God keeps His word concerning him too."]],
      truths: [["👂 God hears outside the covenant line.", "Ishmael is not the chosen covenant son, but God hears him."], ["💧 God provides in the wilderness.", "The wilderness is frightening, but not godless."], ["🤝 God's promises are specific.", "Isaac and Ishmael have different roles, but God is faithful to what He said about each."]],
      application: ["👂 People outside the main storyline are still heard by God.", "💧 Ask God to open your eyes to provision.", "🏜️ Wilderness does not mean abandonment.", "🤝 Trust God to keep every promise rightly."],
    }),
    makeCompactGenesisStudySection({
      chapter: 21,
      startVerse: 22,
      endVerse: 34,
      reference: "Genesis 21:22-34",
      title: "Abraham Lives As A Sojourner",
      icon: "🌳",
      summary: "Abraham makes peace at Beersheba, plants a tree, and calls on the everlasting God.",
      movement: ["🤝 Abraham and Abimelech make a covenant.", "🐑 Seven ewe lambs witness the well dispute.", "🌳 Abraham plants a tree.", "🙏 He calls on the name of the everlasting God."],
      phrases: [["🤝 God Is With Thee", "Even outsiders can recognize God's hand on Abraham's life. The promise is becoming visible."], ["🐑 Seven Ewe Lambs", "The lambs serve as witness that the well belongs to Abraham. Small legal details matter in the land promise."], ["🙏 Everlasting God", "Abraham worships God as the One whose faithfulness outlasts his temporary sojourning."]],
      truths: [["🤝 Faith can pursue peace.", "Abraham handles conflict through covenant, witness, and clarity."], ["🌍 The land promise grows through small steps.", "A well is not the whole land, but it is a real foothold in the promise story."], ["🙏 Worship continues while waiting.", "Abraham still lives as a sojourner, yet he calls on the everlasting God."]],
      application: ["🤝 Make peace with clarity, not confusion.", "🌳 Mark God's faithfulness in places where you are still waiting.", "🙏 Worship the everlasting God while your life still feels temporary.", "🐑 Details can matter in promise stories."],
    }),
    makeCompactGenesisStudySection({
      chapter: 22,
      startVerse: 1,
      endVerse: 19,
      reference: "Genesis 22:1-19",
      title: "Abraham Is Tested On Moriah",
      icon: "🐏",
      summary: "God tests Abraham, Isaac is spared, and the Lord provides a ram.",
      movement: ["🧪 God tests Abraham with Isaac, the son of promise.", "⛰️ Abraham goes to Moriah.", "🪵 Isaac asks about the lamb.", "🐏 God provides a ram in Isaac's place."],
      phrases: [["🧪 God Did Tempt Abraham", "Here tempt means test. God is exposing and refining Abraham's trust, not tempting him to evil."], ["👶 Thine Only Son Isaac", "The wording presses the emotional weight. Isaac is the beloved promise son."], ["🐏 The Lord Will Provide", "Abraham's statement becomes the heartbeat of the chapter. God provides what Abraham could not."]],
      truths: [["🧪 Faith can be tested at the place of deepest promise.", "The test touches Isaac, not something small. Trust is brought to the center."], ["🐏 God provides the substitute.", "Isaac is spared because God provides the ram. Provision stands at the center of the story."], ["🤝 The promise belongs to God.", "Abraham cannot control the covenant future. He must trust the God who gave Isaac."]],
      application: ["🧪 Tests reveal what trust is resting on.", "🐏 Look for the God who provides, not only the thing you fear losing.", "⛰️ Obedience can be costly and confusing.", "🤝 God's promise is safest in God's hands."],
    }),
    makeCompactGenesisStudySection({
      chapter: 23,
      startVerse: 1,
      endVerse: 20,
      reference: "Genesis 23:1-20",
      title: "Sarah Dies And Abraham Buys A Burial Place",
      icon: "🪦",
      summary: "Sarah dies, Abraham mourns, and he buys the cave of Machpelah in the promised land.",
      movement: ["🪦 Sarah dies in Canaan.", "😭 Abraham mourns and weeps.", "⚖️ He negotiates honestly for a burial place.", "🌍 Machpelah becomes the first owned family foothold in the land."],
      phrases: [["😭 Abraham Came To Mourn", "Faith does not erase grief. Abraham believes the promise and still weeps over Sarah."], ["🌍 A Possession Of A Buryingplace", "The first owned piece of the promised land is a grave. That is sobering, but deeply meaningful."], ["⚖️ Four Hundred Shekels", "Abraham pays publicly and legally. The promise does not make him manipulative; he acts with integrity."]],
      truths: [["😭 Faith grieves.", "Abraham mourns Sarah honestly. Trusting God does not mean pretending death does not hurt."], ["🌍 Promise can begin with a burial place.", "The land promise moves forward through a grave before full possession."], ["⚖️ Integrity matters in waiting.", "Abraham buys the field openly. Faith does not need shady shortcuts."]],
      application: ["😭 Let grief be honest before God.", "🌍 Small footholds can matter in long promises.", "⚖️ Handle practical matters with integrity.", "🪦 Death is real, but it does not cancel God's promise."],
    }),
    makeCompactGenesisStudySection({
      chapter: 24,
      startVerse: 1,
      endVerse: 67,
      reference: "Genesis 24:1-67",
      title: "Isaac Receives Rebekah",
      icon: "💍",
      summary: "Abraham's servant prays, God guides, Rebekah responds, and Isaac receives a wife.",
      movement: ["🧓 Abraham sends his servant to find a wife for Isaac.", "🙏 The servant prays for guidance at the well.", "💧 Rebekah appears with generous character.", "💍 Rebekah willingly goes, and Isaac is comforted."],
      phrases: [["🙏 O Lord God Of My Master Abraham", "The servant's mission is soaked in prayer. He knows the promise needs God's guidance."], ["💧 She Gave The Camels Drink Also", "Rebekah's generosity is costly and practical. Character is revealed at the well."], ["💍 I Will Go", "Rebekah's response matters. She steps into the covenant family with willingness and courage."]],
      truths: [["🙏 God guides through prayer and providence.", "The servant prays, watches, and worships as God directs the journey."], ["💧 Character matters in covenant movement.", "Rebekah is not chosen only for family connection. Her generosity and courage are highlighted."], ["🌱 The promise moves to the next generation.", "Genesis 24 gently carries the story from Abraham and Sarah toward Isaac and Rebekah."]],
      application: ["🙏 Pray over decisions that shape the future.", "💧 Watch for character, not only circumstances.", "💍 Courage may sound like, 'I will go.'", "🌱 God's guidance can carry grief into comfort."],
    }),
  ],
);

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 25,
      startVerse: 1,
      endVerse: 18,
      reference: "Genesis 25:1-18",
      title: "Abraham's Final Years",
      icon: "📜",
      summary: "Abraham's life closes, other family lines are named, and the covenant focus stays on Isaac.",
      movement: ["📜 Abraham has other sons.", "🎁 He gives gifts but separates them from Isaac.", "🪦 Abraham dies full of years.", "🌍 Ishmael's line is also recorded as God promised."],
      phrases: [["🎁 Gave Gifts", "Abraham provides for other sons, but distinguishes them from Isaac. The covenant line remains clear."], ["🪦 Full Of Years", "Abraham's death is presented as a completed life, not a failed promise."], ["🌍 Generations Of Ishmael", "God's promise to Hagar and Ishmael is remembered. Ishmael's line becomes history, not empty words."]],
      truths: [["🌱 The promise continues after Abraham.", "Abraham dies, but the covenant does not die with him."], ["🎁 Blessing and covenant role are not identical.", "Other sons receive gifts, but Isaac carries the covenant line."], ["🤝 God keeps promises outside the main line too.", "Ishmael's generations show God's faithfulness to Hagar's story."]],
      application: ["🌱 Your death does not end God's work.", "🎁 Be clear about what God has assigned.", "🤝 Remember that God can keep multiple promises at once.", "🪦 A faithful life can end while the promise keeps moving."],
    }),
    makeCompactGenesisStudySection({
      chapter: 25,
      startVerse: 19,
      endVerse: 34,
      reference: "Genesis 25:19-34",
      title: "Jacob And Esau Are Born",
      icon: "👶",
      summary: "Isaac prays, Rebekah bears twins, and Esau despises his birthright.",
      movement: ["🙏 Isaac prays for barren Rebekah.", "👶 Twins struggle before birth.", "🔁 God says the older will serve the younger.", "🍲 Esau sells his birthright for a meal."],
      phrases: [["🙏 Isaac Intreated The Lord", "Isaac's family begins with the same kind of impossibility Abraham faced: barrenness. Prayer stands at the doorway of the next generation."], ["🔁 The Elder Shall Serve The Younger", "God's word overturns normal expectation. The promise will move by God's choice, not simply birth order."], ["🍲 Despised His Birthright", "Esau treats a holy inheritance like it is worth less than his appetite. Genesis wants us to feel the foolishness of that trade."]],
      truths: [["🙏 The next generation still needs prayer.", "Covenant family does not remove dependence. Isaac must seek the Lord."], ["🔁 God's choice can overturn custom.", "The older serving the younger shows God's promise is not trapped by social expectation."], ["🍲 Appetite can make holy things look cheap.", "Esau's hunger becomes a window into what he values."]],
      application: ["🙏 Pray for what you cannot produce.", "🔁 Let God's word correct cultural assumptions.", "🍲 Do not trade long-term calling for short-term relief.", "👶 Family conflict can begin early, but God is still at work."],
    }),
    makeCompactGenesisStudySection({
      chapter: 26,
      startVerse: 1,
      endVerse: 11,
      reference: "Genesis 26:1-11",
      title: "Isaac Faces Famine And Fear",
      icon: "🌾",
      summary: "Isaac faces famine, receives the promise, but repeats Abraham's fear about his wife.",
      movement: ["🌾 Famine comes in Isaac's day.", "🗣️ God tells Isaac not to go to Egypt.", "🤝 God repeats the Abrahamic promise.", "🔁 Isaac says Rebekah is his sister out of fear."],
      phrases: [["🌾 There Was A Famine", "Isaac faces a test similar to Abraham's. The next generation has to learn trust personally."], ["🗣️ Go Not Down Into Egypt", "God gives Isaac a specific command for this famine. Trust means staying where God says stay."], ["🔁 She Is My Sister", "Isaac repeats Abraham's fear pattern. Family weaknesses can echo if they are not healed."]],
      truths: [["🤝 The promise is confirmed to Isaac.", "God repeats land, descendants, and blessing. Isaac is now carrying the covenant story."], ["🔁 Fear can be inherited as a pattern.", "Isaac repeats a family sin. Genesis is honest about generational weakness."], ["🌾 Famine tests trust.", "Scarcity forces the question: will Isaac obey God's word or run by instinct?"]],
      application: ["🌾 Famine moments reveal where trust lives.", "🔁 Watch for family fear patterns repeating in you.", "🗣️ Stay where God says, even when Egypt looks safer.", "🤝 God's promise must become personal in each generation."],
    }),
    makeCompactGenesisStudySection({
      chapter: 26,
      startVerse: 12,
      endVerse: 25,
      reference: "Genesis 26:12-25",
      title: "Isaac Digs Wells",
      icon: "💧",
      summary: "Isaac prospers, faces conflict over wells, keeps moving, and worships when God makes room.",
      movement: ["🌾 Isaac reaps a hundredfold.", "😠 The Philistines envy him.", "💧 He reopens and digs wells.", "🙏 At Beersheba, God says fear not, and Isaac builds an altar."],
      phrases: [["🌾 Hundredfold", "Isaac's prosperity shows God's blessing in the land during famine pressure."], ["💧 Rehoboth", "The name means room or broad places. After conflict, Isaac recognizes the Lord has made room."], ["🙏 Builded An Altar", "Isaac responds to God's reassurance with worship, just like Abraham marked promise places with altars."]],
      truths: [["💧 Faith can keep digging without constant fighting.", "Isaac faces strife but continues moving until God makes room."], ["😠 Blessing can attract envy.", "Prosperity does not remove conflict. Sometimes it provokes it."], ["🙏 God's reassurance leads to worship.", "When God says fear not, Isaac builds an altar."]],
      application: ["💧 Keep digging faithfully when one place becomes conflict.", "😠 Do not be shocked when blessing brings envy.", "🙏 Mark God's reassurance with worship.", "🌱 Trust that God can make room without you forcing every fight."],
    }),
    makeCompactGenesisStudySection({
      chapter: 27,
      startVerse: 1,
      endVerse: 29,
      reference: "Genesis 27:1-29",
      title: "Jacob Receives The Blessing",
      icon: "🤲",
      summary: "Favoritism and deception collide as Jacob receives Isaac's blessing instead of Esau.",
      movement: ["👴 Isaac plans to bless Esau.", "👂 Rebekah overhears and forms a plan.", "🎭 Jacob disguises himself.", "🤲 Isaac blesses Jacob."],
      phrases: [["👴 His Eyes Were Dim", "Isaac's physical blindness matches the confusion in the household. The family is spiritually tangled too."], ["👂 Rebekah Heard", "Rebekah acts on what she hears, but through manipulation instead of open trust."], ["🎭 I Am Esau", "Jacob's lie is direct. The promise moves forward, but the method wounds the family deeply."]],
      truths: [["🎭 Deception damages even when the promise continues.", "Jacob receives the blessing, but the way it happens fractures the household."], ["👨‍👩‍👦 Favoritism feeds manipulation.", "Isaac loves Esau, Rebekah loves Jacob, and the divided loves become divided actions."], ["🤝 God's promise is not dependent on clean family behavior.", "God's word about Jacob stands, but Genesis does not excuse the sin used in the scene."]],
      application: ["🎭 Do not use deception to help God's promise.", "👨‍👩‍👦 Favoritism can poison a family.", "🤲 Blessing should not be handled through secrecy and manipulation.", "⚠️ God's faithfulness does not make our methods harmless."],
    }),
    makeCompactGenesisStudySection({
      chapter: 27,
      startVerse: 30,
      endVerse: 46,
      reference: "Genesis 27:30-46",
      title: "Esau's Grief And Jacob's Escape",
      icon: "😭",
      summary: "Esau grieves bitterly, anger rises, and Jacob must flee from the family fracture.",
      movement: ["😭 Esau returns and discovers the blessing is gone.", "😨 Isaac trembles greatly.", "⚔️ Esau plans to kill Jacob.", "🏃 Rebekah sends Jacob away to Haran."],
      phrases: [["😨 Isaac Trembled", "Isaac realizes something irreversible has happened. The blessing cannot simply be reset."], ["😭 Exceeding Bitter Cry", "Esau's grief is real, even though he despised the birthright earlier. Genesis lets us feel the pain."], ["🏃 Flee Thou To Laban", "Jacob receives blessing, but he loses home. Deception may get what it wants and still cost more than expected."]],
      truths: [["😭 Sin leaves grief behind.", "The blessing scene ends with tears, trembling, anger, and exile."], ["🏃 Getting the blessing wrongly can still bring consequences.", "Jacob carries the promise, but he must flee. God's plan continues through painful discipline."], ["⚔️ Family wounds can become dangerous.", "Esau's grief turns toward murder. The family fracture is severe."]],
      application: ["😭 Do not ignore the grief deception causes.", "🏃 A gained advantage can still come with painful loss.", "⚔️ Deal with family wounds before anger becomes violence.", "🤝 God's promise continues, but sin still scars the journey."],
    }),
  ],
);

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 28,
      startVerse: 1,
      endVerse: 5,
      reference: "Genesis 28:1-5",
      title: "Isaac Sends Jacob Away",
      icon: "🧳",
      summary: "Jacob leaves home with the blessing of Abraham, but also with family fracture behind him.",
      movement: ["🧳 Isaac sends Jacob away to Paddan Aram.", "💍 Jacob is told not to marry a Canaanite woman.", "🤝 Isaac repeats the blessing of Abraham over him.", "🏠 Jacob leaves with promise, but not with peace."],
      phrases: [["🧳 Arise, Go To Padanaram", "Jacob is not leaving for a vacation or a fresh adventure. He is leaving because the blessing scene broke the family and Esau wants him dead. The road becomes both protection and discipline."], ["💍 Take Thee A Wife From Thence", "Marriage is tied to covenant direction here. Isaac wants Jacob's household connected to the promise line, not absorbed into Canaanite life around them."], ["🤝 The Blessing Of Abraham", "This phrase makes the handoff clear. The promise God gave Abraham is now being spoken over Jacob: land, descendants, and covenant identity." ]],
      truths: [["🧳 Blessing can come with consequences.", "Jacob carries the covenant promise, but he also carries the fallout of deception. Genesis lets both be true at the same time."], ["💍 Covenant choices shape the future.", "The wife Jacob takes will affect the next generation. Genesis treats family formation as spiritually serious."], ["🤝 God's promise keeps moving.", "Isaac's household is messy, but the Abrahamic blessing is not canceled. God's covenant is stronger than family fracture." ]],
      application: ["🧳 Sometimes the road ahead includes both mercy and discipline.", "💍 Big life choices should be made with covenant wisdom, not impulse.", "🏠 Leaving a broken place does not mean God has left you.", "🤝 God's promise can keep moving even when your family story feels tangled."],
    }),
    makeCompactGenesisStudySection({
      chapter: 28,
      startVerse: 6,
      endVerse: 9,
      reference: "Genesis 28:6-9",
      title: "Esau Tries To Fix The Problem",
      icon: "🪞",
      summary: "Esau notices what displeases his parents, but his response shows he still does not understand the covenant clearly.",
      movement: ["👀 Esau sees that Canaanite wives displease Isaac.", "🪞 He reacts after watching Jacob be sent away.", "💍 He marries into Ishmael's family line.", "⚠️ His response is religious-looking, but still confused."],
      phrases: [["👀 Esau Seeing", "Esau is paying attention, but late. He notices what his parents value after years of treating his birthright lightly."], ["💍 Went Unto Ishmael", "Marrying into Ishmael's line may look like an attempt to choose Abrahamic family connection. But it does not show real repentance or a clear grasp of the covenant promise."], ["➕ Unto The Wives Which He Had", "Esau adds another wife instead of dealing with the deeper issue. Sometimes people try to fix spiritual problems by adding a religious-looking move on top of unchanged patterns." ]],
      truths: [["🪞 Reaction is not the same as repentance.", "Esau responds to family disapproval, but Genesis does not show him humbly seeking God's promise."], ["⚠️ Religious-looking choices can still miss the point.", "A move can look closer to the family of Abraham and still not be covenant faith."], ["👀 Delayed attention has consequences.", "Esau cared about the birthright too late. Genesis keeps warning us not to treat holy things as small." ]],
      application: ["🪞 Ask whether you are changing because you see truth or only because you feel consequences.", "💍 Do not cover old disobedience with a new religious-looking decision.", "👀 Pay attention before loss teaches the lesson harder.", "⚠️ The outside move matters less than the heart behind it."],
    }),
    makeCompactGenesisStudySection({
      chapter: 28,
      startVerse: 10,
      endVerse: 15,
      reference: "Genesis 28:10-15",
      title: "Jacob Dreams Of The Stairway",
      icon: "🪜",
      summary: "God meets Jacob in the wilderness and repeats the covenant promise personally to him.",
      movement: ["🌙 Jacob sleeps outside with a stone for a pillow.", "🪜 He sees a stairway between earth and heaven.", "👼 Angels ascend and descend on it.", "🗣️ God promises land, offspring, blessing, presence, protection, and return."],
      phrases: [["🪜 Ladder Set Up On The Earth", "The stairway shows heaven and earth connected by God's initiative. Jacob is not climbing up to find God; God is revealing access and presence to Jacob."], ["👼 Angels Ascending And Descending", "The messengers show that Jacob's lonely road is not empty. God's world is active even where Jacob only sees wilderness."], ["🗣️ I Am With Thee", "This is the heart of the dream. God does not only promise land and descendants; He promises His presence on the road until Jacob returns." ]],
      truths: [["🪜 God meets people before they are polished.", "Jacob has not become a mature hero yet. God meets him while he is running from a damaged home."], ["👼 Heaven is nearer than Jacob realized.", "The wilderness looks ordinary, but God opens Jacob's eyes to spiritual reality."], ["🗣️ God's promise becomes personal.", "Jacob has heard of Abraham and Isaac's God. Now the Lord speaks the promise directly over Jacob." ]],
      application: ["🌙 A lonely place can become a meeting place with God.", "🪜 You do not have to climb into God's attention; He comes down in mercy.", "🗣️ Hold tightly to God's presence when the road is uncertain.", "👼 There may be more happening around your life than your eyes can see."],
    }),
    makeCompactGenesisStudySection({
      chapter: 28,
      startVerse: 16,
      endVerse: 22,
      reference: "Genesis 28:16-22",
      title: "Jacob Names The Place Bethel",
      icon: "🪨",
      summary: "Jacob realizes God was present in the place he thought was only a campsite.",
      movement: ["😮 Jacob wakes with awe and fear.", "🏠 He calls the place the house of God.", "🪨 He sets up the stone as a pillar.", "🛢️ He pours oil on it and makes a vow."],
      phrases: [["😮 I Knew It Not", "Jacob thought he was simply stopping for the night. The line teaches readers that God can be present in places we did not recognize as holy."], ["🏠 Bethel", "Bethel means house of God. Jacob renames the place because God's presence changed the meaning of the location."], ["🛢️ Poured Oil Upon The Top Of It", "Pouring oil marks the stone as set apart. Jacob is responding physically to a spiritual encounter he does not want to forget." ]],
      truths: [["🏠 God's presence changes ordinary ground.", "A campsite becomes Bethel because God reveals Himself there."], ["😮 Awe is a right response to God.", "Jacob does not wake casual. He realizes he has been near the Lord's presence."], ["🪨 Remembering matters.", "Jacob sets up a marker because faith needs memory. Places of encounter should not be treated like nothing happened." ]],
      application: ["😮 Ask God to help you notice where He has been present.", "🪨 Mark the moments you do not want your soul to forget.", "🏠 An ordinary place can become holy because God met you there.", "🛢️ Let worship respond when God wakes you up spiritually."],
    }),
    makeCompactGenesisStudySection({
      chapter: 29,
      startVerse: 1,
      endVerse: 14,
      reference: "Genesis 29:1-14",
      title: "Jacob Meets Rachel At The Well",
      icon: "💧",
      summary: "Jacob arrives in Haran, finds Rachel, and is welcomed into Laban's house.",
      movement: ["💧 Jacob reaches a well near Haran.", "🐑 Rachel arrives with Laban's sheep.", "🪨 Jacob rolls away the stone and waters the flock.", "😭 He kisses Rachel, weeps, and is welcomed by Laban."],
      phrases: [["💧 A Well In The Field", "Wells are meeting places in Genesis. This scene echoes the earlier moment when Abraham's servant met Rebekah at a well for Isaac."], ["🪨 Rolled The Stone", "Jacob's strength and eagerness are on display. The man who left home vulnerable suddenly moves with energy when Rachel arrives."], ["😭 Jacob Wept", "The tears show the emotional weight of arrival. Jacob has been alone on the road, and now he has found family connection." ]],
      truths: [["💧 God can guide through ordinary places.", "A well, sheep, and conversation become the setting where Jacob's next chapter begins."], ["🧭 Providence often looks normal while it happens.", "No voice from heaven speaks here, but the timing still carries the story forward."], ["🏠 Welcome can be complicated.", "Laban receives Jacob warmly, but Genesis will soon show that not every welcome is simple or safe." ]],
      application: ["💧 Pay attention to ordinary places where God may be opening the next step.", "😭 Arrival after a hard road can release hidden emotion.", "🧭 Do not despise normal-looking guidance.", "🏠 Warm welcomes still need wisdom over time."],
    }),
    makeCompactGenesisStudySection({
      chapter: 29,
      startVerse: 15,
      endVerse: 20,
      reference: "Genesis 29:15-20",
      title: "Jacob Serves Seven Years For Rachel",
      icon: "❤️",
      summary: "Jacob loves Rachel and agrees to serve seven years for her.",
      movement: ["💬 Laban asks Jacob to name his wages.", "❤️ Jacob asks to serve for Rachel.", "⏳ He serves seven years.", "🌅 The years seem like a few days because of his love."],
      phrases: [["💬 What Shall Thy Wages Be", "Laban sounds fair, but readers should stay alert. His questions often serve his own advantage."], ["❤️ I Will Serve Thee Seven Years", "Jacob names a costly commitment. His love is not only emotion; it becomes years of labor."], ["🌅 But A Few Days", "Genesis gives us one of its tender lines here. Love changes how Jacob experiences the weight of time, even though seven years is still a long sacrifice." ]],
      truths: [["❤️ Love is shown through costly patience.", "Jacob's love for Rachel takes the shape of years, not only words."], ["⏳ Waiting can be filled with purpose.", "These seven years are not empty time. Jacob is working toward a covenant future."], ["⚠️ Tender moments can still sit near danger.", "The sweetness of Jacob's love is real, but Laban's character is about to turn the scene painful." ]],
      application: ["❤️ Real love can serve without needing everything instantly.", "⏳ A long wait can still have meaning.", "💬 Be wise when someone else controls the terms.", "🌅 Let love make sacrifice faithful, not foolish."],
    }),
    makeCompactGenesisStudySection({
      chapter: 29,
      startVerse: 21,
      endVerse: 30,
      reference: "Genesis 29:21-30",
      title: "Laban Deceives Jacob",
      icon: "🎭",
      summary: "Jacob the deceiver is deceived, and the family story bends under Laban's manipulation.",
      movement: ["🍽️ Laban makes a feast.", "🌙 In the evening, Leah is brought to Jacob.", "😳 In the morning, Jacob sees the deception.", "🎭 Laban uses custom to justify manipulation."],
      phrases: [["🌙 In The Evening", "The darkness matters. Jacob once used blindness and disguise to deceive Isaac, and now he is deceived in the cover of night."], ["😳 In The Morning, Behold, It Was Leah", "This is one of Genesis's sharp reversals. Jacob wakes into the pain of being tricked by family."], ["🎭 Wherefore Then Hast Thou Beguiled Me", "Jacob names the very thing he himself has done. The story is not mocking him; it is showing how deception comes back with a bitter taste." ]],
      truths: [["🎭 Deception teaches pain from the other side.", "Jacob now feels what it is like to be manipulated by someone close."], ["⚖️ Sin can echo through consequences.", "This does not mean every hard thing is payback, but Genesis clearly links Jacob's deceptive past with this painful reversal."], ["💔 People can be used inside someone else's scheme.", "Leah and Rachel are not just plot pieces. Laban's manipulation wounds both daughters too." ]],
      application: ["🎭 Do not excuse manipulation because it gets a desired result.", "💔 Notice who gets hurt when powerful people scheme.", "⚖️ Let painful consequences teach humility, not bitterness.", "🌙 What is done in darkness still comes into morning."],
    }),
    makeCompactGenesisStudySection({
      chapter: 29,
      startVerse: 31,
      endVerse: 35,
      reference: "Genesis 29:31-35",
      title: "God Sees Leah",
      icon: "👁️",
      summary: "Leah is unloved by Jacob, but Yahweh sees her affliction and begins building Israel through her.",
      movement: ["👁️ Yahweh sees that Leah is unloved.", "👶 Leah bears sons while Rachel is barren.", "💔 Leah names sons out of pain and longing.", "🦁 Judah is born, and his line will become deeply important."],
      phrases: [["👁️ When The Lord Saw", "This is the comfort of the passage. Leah may feel unseen by Jacob, but she is not unseen by Yahweh."], ["💔 Hated", "The word can mean unloved or rejected by comparison. Leah lives inside a marriage where she knows she is not the chosen love."], ["🦁 Judah", "Judah's birth is easy to pass over, but it is huge. Kings will come through Judah, and ultimately Jesus will be called the Lion of Judah." ]],
      truths: [["👁️ God sees the overlooked.", "Leah's pain is visible to God even when her husband fails to love her rightly."], ["💔 Fruitfulness does not erase emotional pain.", "Leah has children, but her names show she still longs to be loved."], ["🦁 God can bring major purpose through an unloved person.", "Judah comes from Leah, not Rachel. Genesis keeps showing God lifting the overlooked." ]],
      application: ["👁️ Being overlooked by people does not make you invisible to God.", "💔 Let God tell the truth about pain instead of pretending blessing fixes everything.", "🦁 Do not assume your hidden story cannot carry future purpose.", "🙏 Worship can grow even from a wounded place."],
    }),
    makeCompactGenesisStudySection({
      chapter: 30,
      startVerse: 1,
      endVerse: 13,
      reference: "Genesis 30:1-13",
      title: "Rachel And Leah Compete",
      icon: "🥀",
      summary: "Rachel and Leah's rivalry shows how painful Jacob's household has become.",
      movement: ["🥀 Rachel envies Leah because she has no children.", "👤 Bilhah is brought into the rivalry.", "⚔️ Leah answers through Zilpah.", "👶 Children are born inside competition instead of peace."],
      phrases: [["🥀 Rachel Envied Her Sister", "Rachel has Jacob's love, but Leah has children. Each sister has something the other longs for, and envy turns their pain against each other."], ["👤 Bilhah My Maid", "Bilhah is pulled into Rachel's pain as a solution. Genesis is showing family growth, but not pretending this system is healthy."], ["⚔️ With Great Wrestlings", "Rachel describes the family as a wrestling match. The language reveals the emotional combat happening inside the household." ]],
      truths: [["🥀 Envy can make blessing feel invisible.", "Rachel is loved by Jacob, but envy over Leah's children consumes her."], ["👤 Broken systems often use vulnerable people.", "Bilhah and Zilpah are caught in a rivalry they did not create."], ["⚔️ Family growth is not always family health.", "More children are born, but the household is full of competition and pain." ]],
      application: ["🥀 Do not let someone else's blessing erase what God has given you.", "👤 Watch who gets used when your pain starts making decisions.", "⚔️ Winning a rivalry is not the same as healing a heart.", "🙏 Bring envy to God before it starts shaping the house."],
    }),
    makeCompactGenesisStudySection({
      chapter: 30,
      startVerse: 14,
      endVerse: 24,
      reference: "Genesis 30:14-24",
      title: "God Remembers Rachel",
      icon: "👶",
      summary: "God listens to Leah and remembers Rachel, and Joseph is born after years of pain.",
      movement: ["🌿 Mandrakes become part of the sister conflict.", "👂 God listens to Leah.", "🕊️ God remembers Rachel.", "👶 Joseph is born, and the Genesis story turns toward its next major figure."],
      phrases: [["🌿 Mandrakes", "Mandrakes were associated in the ancient world with fertility and desire. The scene shows how desperate and transactional the sisters' relationship has become."], ["👂 God Hearkened Unto Leah", "Leah is still heard by God. Even inside an unhealthy household, the Lord listens to the overlooked wife."], ["🕊️ God Remembered Rachel", "Remembered does not mean God had forgotten. In the Bible, it often means God turns toward someone in faithful action." ]],
      truths: [["🕊️ God's timing is not forgetfulness.", "Rachel waits painfully, but the text says God remembers her. Delay is not proof of abandonment."], ["👂 God hears complicated people.", "Leah and Rachel are both wounded and flawed, but God is still active toward them."], ["👶 One birth can turn the story.", "Joseph's arrival will eventually carry Genesis toward preservation, Egypt, and a much larger rescue." ]],
      application: ["🕊️ Do not confuse waiting with being forgotten.", "👂 God can hear you even when your household story is messy.", "🌿 Be careful when desperation makes people transactional.", "👶 Small beginnings may become major turning points later."],
    }),
    makeCompactGenesisStudySection({
      chapter: 30,
      startVerse: 25,
      endVerse: 43,
      reference: "Genesis 30:25-43",
      title: "Jacob Prospers Under Pressure",
      icon: "🐑",
      summary: "Jacob works under Laban's pressure, but God still increases him.",
      movement: ["🏠 Jacob asks to return home after Joseph is born.", "💰 Laban wants him to stay because blessing follows Jacob.", "🐑 The flock agreement becomes tense and strategic.", "📈 Jacob increases greatly under pressure."],
      phrases: [["🏠 Send Me Away", "Joseph's birth makes Jacob think about home again. The promise is pulling him back toward the land, even while Laban wants to keep him useful."], ["💰 The Lord Hath Blessed Me For Thy Sake", "Laban recognizes blessing, but mainly because it benefits him. He sees God's hand as profit."], ["🐑 Speckled And Spotted", "The flock arrangement sounds strange to modern readers, but the point is clear: Jacob is trying to build a future under unfair control." ]],
      truths: [["📈 God can prosper His people in unfair places.", "Laban keeps trying to control the situation, but Jacob still increases."], ["💰 Some people value blessing only when it benefits them.", "Laban wants Jacob near because Jacob is profitable, not because he loves him well."], ["🏠 Prosperity is not the same as home.", "Jacob grows wealthy, but his heart is being turned back toward the land God promised." ]],
      application: ["📈 Do not assume unfair pressure means God cannot bless you.", "💰 Be careful around people who only value you for what comes through you.", "🏠 Success in a hard place may still not be your final place.", "🐑 Ask God for wisdom when the terms keep shifting."],
    }),
    makeCompactGenesisStudySection({
      chapter: 31,
      startVerse: 1,
      endVerse: 16,
      reference: "Genesis 31:1-16",
      title: "God Tells Jacob To Return",
      icon: "🏡",
      summary: "God calls Jacob back to the land of promise after years of pressure under Laban.",
      movement: ["😠 Laban's sons resent Jacob's increase.", "🏡 God tells Jacob to return to his fathers' land.", "⚖️ Jacob explains Laban's unfair treatment.", "👭 Rachel and Leah agree that it is time to go."],
      phrases: [["😠 Laban's Countenance", "Jacob can read the change in Laban's face. Sometimes a relationship shifts before anyone says the truth out loud."], ["🏡 Return Unto The Land", "God's command reconnects Jacob to the promise. Leaving Laban is not only escape; it is obedience toward covenant direction."], ["⚖️ Changed My Wages Ten Times", "Jacob names years of manipulation. The number emphasizes repeated unfairness, not a one-time misunderstanding." ]],
      truths: [["🏡 God calls His people in the right time.", "Jacob did not leave the moment things got hard. God speaks when it is time to return."], ["⚖️ God sees unfair treatment.", "Jacob says God saw what Laban was doing. Human exploitation is not hidden from the Lord."], ["👭 Shared clarity can confirm the next step.", "Rachel and Leah recognize their father's treatment and agree with Jacob's direction." ]],
      application: ["🏡 Move when God calls, not only when frustration peaks.", "⚖️ Trust that God sees repeated unfairness.", "😠 Pay attention when the face of a situation changes.", "👭 Wise agreement can help a family step into obedience together."],
    }),
    makeCompactGenesisStudySection({
      chapter: 31,
      startVerse: 17,
      endVerse: 21,
      reference: "Genesis 31:17-21",
      title: "Jacob Leaves Secretly",
      icon: "🐪",
      summary: "Jacob leaves with his family and possessions, while Rachel secretly takes Laban's household idols.",
      movement: ["🐪 Jacob sets his family on camels.", "🏃 He leaves for Canaan without telling Laban.", "🗿 Rachel steals the household gods.", "🌊 Jacob crosses the river and heads toward Gilead."],
      phrases: [["🐪 Set His Sons And His Wives Upon Camels", "The scene is practical and urgent. Jacob is moving an entire household, not simply taking a private trip."], ["🗿 Rachel Had Stolen The Images", "The household idols may have been tied to family authority, inheritance, or protection. Rachel's act shows that leaving Laban's house is spiritually messy too."], ["🏃 Stole Away Unawares", "Jacob obeys God's call to return, but he still leaves through secrecy. Genesis shows obedience mixed with fear, not a perfectly clean departure." ]],
      truths: [["🏃 Obedience can still need cleansing from fear.", "Jacob is going the right direction, but his method still carries old patterns of secrecy."], ["🗿 Leaving a place does not mean leaving every idol behind.", "Rachel physically carries Laban's gods into the journey. The family needs more than a change of location."], ["🐪 God moves whole households.", "Jacob's call affects wives, children, possessions, and future generations." ]],
      application: ["🏃 Ask whether you are obeying God with old fearful habits still driving you.", "🗿 Do not carry idols from the place God is calling you out of.", "🐪 Family obedience often involves practical, costly movement.", "🌊 A new direction may still need spiritual cleanup."],
    }),
    makeCompactGenesisStudySection({
      chapter: 31,
      startVerse: 22,
      endVerse: 35,
      reference: "Genesis 31:22-35",
      title: "Laban Pursues Jacob",
      icon: "⚠️",
      summary: "Laban pursues Jacob, but God warns him not to harm Jacob.",
      movement: ["🏇 Laban chases Jacob for seven days.", "⚠️ God warns Laban in a dream.", "💬 Laban confronts Jacob with accusation.", "🗿 Rachel hides the stolen idols."],
      phrases: [["⚠️ Take Heed", "God steps between Laban and Jacob before the confrontation. The warning limits what Laban can do."], ["💬 Wherefore Didst Thou Flee Secretly", "Laban's question sounds wounded, but readers know he has been controlling and unfair. Manipulative people can still sound offended when control is broken."], ["🗿 The Images", "The search for the idols exposes hidden trouble in Jacob's camp. Jacob does not even know Rachel has brought them." ]],
      truths: [["⚠️ God can restrain powerful people.", "Laban catches up, but God has already warned him. Jacob's safety is not resting on Laban's kindness."], ["💬 Accusations can hide control.", "Laban frames himself as wronged, but Genesis has already shown his pattern."], ["🗿 Hidden sin can travel with the family.", "Rachel's theft creates danger Jacob does not see. Secret actions can put others at risk." ]],
      application: ["⚠️ Trust God to set limits on people who want control.", "💬 Listen carefully when an accusation comes from someone losing power over you.", "🗿 Hidden choices can endanger the whole camp.", "🙏 Ask God to expose what needs to be dealt with before it grows."],
    }),
    makeCompactGenesisStudySection({
      chapter: 31,
      startVerse: 36,
      endVerse: 42,
      reference: "Genesis 31:36-42",
      title: "Jacob Confronts Laban",
      icon: "⚖️",
      summary: "Jacob names twenty years of hard labor, unfair treatment, and God's protection.",
      movement: ["🔥 Jacob becomes angry and answers Laban.", "🥶 He names heat, frost, lost sleep, and hard labor.", "🔁 He says Laban changed his wages again and again.", "🛡️ He says God saw his affliction and protected him."],
      phrases: [["🥶 Drought Consumed Me, And The Frost By Night", "Jacob's speech shows the physical cost of those years. This was not an easy success story; it was exhausting labor."], ["🔁 Changed My Wages Ten Times", "Laban's unfairness was repeated. Jacob is naming a pattern, not complaining about one inconvenience."], ["🛡️ God Hath Seen Mine Affliction", "Jacob's confidence is that God noticed what Laban tried to take. This is the same God who saw Hagar and Leah." ]],
      truths: [["⚖️ Naming injustice can be right.", "Jacob finally speaks plainly about what happened. Honesty is not always bitterness."], ["🛡️ God sees exploited labor.", "The Lord noticed Jacob's hard years and protected him from leaving empty."], ["🔥 Anger needs truth, not revenge.", "Jacob confronts Laban with facts and God's protection, not violence." ]],
      application: ["⚖️ Tell the truth about patterns of unfairness.", "🛡️ Let God's seeing steady you when people rewrite the story.", "🥶 Do not minimize what hard seasons cost you.", "🔥 Confrontation should aim at truth, not uncontrolled revenge."],
    }),
    makeCompactGenesisStudySection({
      chapter: 31,
      startVerse: 43,
      endVerse: 55,
      reference: "Genesis 31:43-55",
      title: "A Boundary Covenant",
      icon: "🪨",
      summary: "Jacob and Laban set up stones as a witness and part ways with a boundary between them.",
      movement: ["🗣️ Laban still talks possessively about the family and flocks.", "🪨 Jacob sets up a pillar and stones as witness.", "🤝 They make a covenant boundary.", "🌅 Laban leaves, and Jacob keeps moving toward the promise."],
      phrases: [["🪨 This Heap Be Witness", "The stones are not decoration. They stand as public memory that a boundary has been made."], ["👀 The Lord Watch Between Me And Thee", "People often quote this warmly, but in context it is more like a warning. Laban and Jacob do not trust each other, so they call God as witness between them."], ["🌅 Laban Departed", "The chapter ends with separation. Sometimes peace is not closeness; sometimes peace is a God-witnessed boundary." ]],
      truths: [["🪨 Boundaries can be biblical.", "Jacob and Laban do not pretend everything is fine. They mark a line neither should cross for harm."], ["👀 God witnesses hidden motives.", "The covenant calls God to watch what people might do when others cannot see."], ["🌅 Separation can be part of moving forward.", "Jacob cannot return to the promise while remaining under Laban's control." ]],
      application: ["🪨 Some relationships need clear boundaries, not vague hopes.", "👀 Let God's witness make you honest when no one else is watching.", "🤝 Peace does not always require renewed closeness.", "🌅 Moving forward may require leaving controlling patterns behind."],
    }),
  ],
);

const DAY_TWO_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 3:1-5": {
    phrases: [
      "\"The Serpent\"\nThe serpent is introduced as crafty, which means shrewd, subtle, and skilled at twisting a conversation. Genesis does not stop to explain everything about him yet; it wants us to watch what he does.\nHe does not begin by denying God exists. He begins by challenging whether God's word and goodness can be trusted.\nLater Scripture connects the serpent with Satan, but Genesis first teaches the pattern of evil: it makes distrust sound reasonable.\nThat is why this scene matters so much. The first temptation is not only about fruit; it is about whether humans will live by God's voice or by a rival voice.",
      "\"Did God Really Say\"\nThis is the first question recorded from the serpent, and it is aimed directly at God's word. He does not start with open rebellion; he starts with uncertainty.\nThat matters because temptation often loosens confidence before it pushes disobedience. If God's word becomes blurry, obedience starts to feel negotiable.\nThe question also sounds thoughtful, almost harmless, which is part of the danger. Eve is not being invited to worship another god yet; she is being invited to reconsider whether the true God can be trusted.\nA helpful Bible-reading tip: watch how often sin begins with a distorted question, not an obvious attack.",
      "\"You Shall Not Eat Of Any Tree\"\nThe serpent exaggerates God's command. God gave Adam freedom to eat from every tree except one, but the serpent talks as if God has forbidden everything.\nThis is one of temptation's oldest tricks: shrink God's generosity and magnify His boundary. The garden is full of gifts, but the serpent trains Eve's attention on the one limit.\nGod's commands are easiest to resent when we forget the context of His goodness. The forbidden tree was surrounded by allowed trees.\nThis phrase teaches us to ask, \"Am I seeing God's whole generosity, or only staring at the one thing He has said no to?\"",
      "\"You Will Not Surely Die\"\nHere the serpent directly contradicts God's warning. At first he questions God; now he denies God.\nThis is not a small misunderstanding anymore. It is a rival message about life and death. God says rebellion brings death, but the serpent says rebellion has no real consequence.\nThat makes this the first false gospel in the Bible. It offers life without trust, freedom without obedience, and safety without God.\nThe rest of Genesis will prove God's word true. Death enters the family story through shame, exile, Abel's murder, and the repeated deaths in Genesis 5.",
      "\"Your Eyes Will Be Opened\"\nThe serpent promises a higher kind of sight. He makes disobedience sound like awakening, maturity, and hidden knowledge.\nThere is a cruel half-truth here. Their eyes will open, but not in the way they hope. They will not wake up into freedom; they will wake up into shame.\nTemptation often advertises insight while hiding the cost of that insight. It says, \"You will finally know,\" but it does not say, \"You will also lose innocence, peace, and trust.\"\nGenesis teaches that not every opened door leads to life, and not every opened eye sees truth clearly.",
      "\"Knowing Good And Evil\"\nThis phrase is about moral authority, not just learning facts. Adam and Eve already knew good by living in God's good world and hearing God's good command.\nThe temptation is to know good and evil independently, as if humans can define reality without receiving it from God. It is the desire to move from trusting God's wisdom to becoming self-appointed judges.\nThat is why this phrase still feels so modern. Every age is tempted to say, \"I will decide good and evil for myself.\"\nGenesis says that road does not make humans more alive. It cuts them off from the God who is life.",
      "\"You Will Be Like God\"\nThis is the heart of the temptation. Adam and Eve were already made in God's image, but the serpent tempts them to reach for God-likeness on their own terms.\nThe lie works because it sounds close to something true. Humans really are meant to reflect God. But image-bearing is received as a gift, not seized as a replacement for God.\nThe serpent makes rebellion sound like growth, freedom, and maturity. He presents dependence on God as childish and independence from God as wise.\nThis is why the fall is so serious: humanity tries to become like God by distrusting God, and that breaks the very relationship that made them fully alive.",
    ],
    truths: [
      "Temptation often starts by questioning God's word.\nThe serpent does not begin with fruit. He begins with a question about what God said.\nThat matters because obedience rests on trust. If God's word becomes uncertain in our minds, disobedience starts to look reasonable.\nGenesis teaches us to pay attention to voices that make God's command sound unclear, unfair, or outdated.",
      "Sin makes God's generosity look small.\nThe serpent focuses attention on the one forbidden tree until the whole garden fades into the background.\nThis is one reason gratitude is spiritually powerful. Gratitude keeps God's gifts visible when temptation wants the boundary to feel like the whole story.\nA grateful heart sees the garden before it stares at the limit.",
      "The fall is about trust and authority.\nThe issue is not only fruit. The deeper issue is who has the right to define good and evil.\nAdam and Eve are being invited to move from receiving wisdom to ruling themselves without God.\nThat same question sits under every sin: will I trust God's definition of life, or will I create my own?",
      "Evil often promises life while leading toward death.\nThe serpent says they will not die, but God's warning is true.\nSin often works by separating the action from the consequence. It tells the beginning of the story and hides the ending.\nGenesis teaches that anything promising freedom apart from God is already lying about what life is.",
      "Humans were already image-bearers.\nThe promise to be like God is twisted because Adam and Eve already bear God's image.\nThe temptation is to grasp apart from God what should be received from God. That is different from humble growth; it is rebellion dressed up as maturity.\nThe Bible will keep showing this pattern: when people seize blessing instead of receiving it from God, the result is fracture.",
    ],
  },
  "Genesis 3:6-7": {
    phrases: [
      "\"Good For Food\"\nThe fruit appears useful and harmless. That matters because sin does not always look ugly at first.\nEve sees something practical: food. Temptation often attaches itself to a real appetite or a normal human desire, then pulls that desire outside trust in God.\nThe problem is not that food is bad. God filled the garden with food. The problem is desire judging reality without listening to God's word.\nGenesis is teaching that something can look useful and still be spiritually dangerous if God has said no.",
      "\"A Delight To The Eyes\"\nThe fruit is visually appealing. The problem is not beauty itself, because God made trees that were pleasant to the sight back in Genesis 2.\nThe danger is beauty separated from obedience. Eve's eyes are now evaluating the tree through the serpent's lie instead of through God's command.\nThat gives us a practical Bible-study insight: the senses are good gifts, but they are not meant to be our highest authority.\nSomething can look beautiful and still lead away from God if desire is no longer guided by truth.",
      "\"Desired To Make One Wise\"\nWisdom is good when it comes from God. Later books like Proverbs will tell people to seek wisdom like treasure.\nBut this is wisdom seized apart from God. It is an attempt to gain moral independence instead of receiving instruction from the Creator.\nThat is why the tree is so serious. It represents the human desire to define good and evil without God.\nThere is an aha moment here: the Bible is not anti-wisdom. It is against a kind of wisdom that begins by distrusting God.",
      "\"She Took Of Its Fruit And Ate\"\nThe fall moves from listening, to looking, to taking, to eating. Genesis slows the moment down so we can see sin becoming action.\nTaking is important language in the Bible. Sometimes God gives, and humans receive. But here the human reaches for what God has not given.\nThe act may look small from the outside. It is just fruit. But spiritually, it is a declaration that the creature will no longer live under the Creator's word.\nThis is why sin cannot be measured only by the size of the object involved. It must be measured by the relationship it breaks.",
      "\"She Also Gave Some To Her Husband\"\nAdam is not far away in this scene. The text says he is with her.\nThat means Adam's silence matters. He was given the command first, but he does not guard the garden, speak truth, or protect the relationship from the lie.\nGenesis is not letting Adam off the hook. Sin spreads through passive failure as well as active choice.\nThis phrase teaches that love should not stand quietly while falsehood grows.",
      "\"They Knew That They Were Naked\"\nIn Genesis 2, nakedness meant openness without shame. After sin, the same nakedness feels threatening.\nNothing about their bodies changed, but their relationship to God, each other, and themselves changed. Innocence has been lost, and self-protection begins.\nThat is why shame is deeper than embarrassment. Shame is the feeling that being fully seen is no longer safe.\nGenesis shows shame entering immediately after sin because sin breaks the trust that made openness possible.",
      "\"Fig Leaves\"\nThe fig leaves are the first human-made covering. Adam and Eve try to manage exposure with whatever they can make quickly.\nThis is a powerful picture because people still do this. We cover with image, excuses, performance, humor, denial, success, or blame.\nThe leaves may hide their bodies for a moment, but they cannot heal the relationship with God.\nLater in the chapter, God will make a better covering, which shows that human coverings cannot do what divine mercy can.",
    ],
    truths: [
      "Sin can look desirable before it destroys.\nThe fruit appears good, beautiful, and wise. That is part of the danger.\nTemptation rarely begins by showing the wound it will leave. It shows the appetite, the beauty, and the imagined benefit.\nGenesis teaches us to ask not only, \"Do I want this?\" but, \"Where will this desire lead if it is detached from God's word?\"",
      "Silence can become failure.\nAdam is with Eve, but he does not speak or guard. Passivity matters in Genesis 3.\nThe Bible does not only warn against doing evil. It also warns against refusing to act when truth and love require action.\nLove should protect truth, not stand quietly while lies grow.",
      "Disobedience is shared responsibility.\nEve eats and Adam eats. The chapter does not let either one become innocent.\nThe serpent deceives, Eve takes, Adam receives, and both step outside God's command.\nGenesis gives us a serious view of responsibility: influence matters, deception matters, and personal choice still matters.",
      "Sin produces shame.\nThe serpent promised opened eyes and freedom, but the first thing they experience is exposure.\nThat is a major lesson about false promises. Sin may open the eyes, but it cannot give peace with what is seen.\nSin never gives exactly what it advertises; it gives knowledge without innocence and exposure without covering.",
      "Humans try to cover what sin exposes.\nThey sew fig leaves together. That is the first human attempt to manage shame without God.\nThis becomes a pattern through Scripture and through life: people try to hide, perform, excuse, and decorate what needs mercy.\nThe rest of the Bible will show that only God can truly cover sin.",
    ],
  },
  "Genesis 3:8-13": {
    phrases: [
      "\"They Hid Themselves\"\nThis is the first hiding in Scripture. Before sin, Adam and Eve were naked and unashamed; after sin, they hide from God.\nHiding is one of shame's first instincts. It says, \"If I can stay unseen, maybe I can stay safe.\"\nBut hiding from God never heals what is broken. It only shows how broken trust has become.\nThis phrase helps explain why people still avoid prayer, truth, and honest confession when guilt is heavy.",
      "\"Where Are You\"\nGod's question is not about geography. He knows where Adam is.\nThe question is an invitation to step out of hiding and tell the truth. God confronts sin, but He begins by calling the sinner into the open.\nThat makes this moment merciful. Judgment is coming, but God does not begin by abandoning them.\nA Bible-study tip: when God asks questions in Scripture, He is often exposing the heart, not looking for information.",
      "\"I Was Afraid\"\nFear now enters the human relationship with God. The God who gave Adam breath is now the God Adam avoids.\nThat is one of sin's deepest damages. It makes the presence of God feel threatening instead of life-giving.\nAdam's fear is not because God changed. It is because Adam changed.\nThe rest of Scripture keeps answering this fear by showing God making a way for guilty people to come near again.",
      "\"Who Told You\"\nGod's question presses beneath Adam's fear. Adam's shame did not come from God's original design; it came from listening to another voice.\nThis is important because shame often carries a message: you are exposed, unsafe, unwanted, ruined. God is asking Adam to trace where that message came from.\nThe question helps us see that not every voice in our head is telling the truth.\nGod brings Adam back to the real issue: did you eat from the tree I commanded you not to eat from?",
      "\"The Woman Whom You Gave\"\nAdam blames Eve, but his words also point back toward God. It is as if he says, \"This happened because of the woman You gave me.\"\nThat is how blame works. It avoids honest confession by shifting responsibility outward.\nThe first broken human relationship after sin includes accusation, not protection.\nInstead of saying, \"I sinned,\" Adam tries to spread the blame across Eve and even God.",
      "\"The Serpent Deceived Me\"\nEve tells part of the truth: she was deceived. But the statement still shifts responsibility away from her own choice.\nGenesis does not deny deception, but it also does not remove human responsibility. Being lied to explains the battle; it does not make disobedience harmless.\nThis phrase gives a balanced view of sin. There is a real tempter, and there is still real human accountability.\nThe Bible is honest enough to hold both together.",
    ],
    truths: [
      "God seeks sinners before they seek Him.\nAdam and Eve hide, but God comes looking. That is mercy before judgment.\nThe rescue story begins with God moving toward the guilty, not with guilty people finding their way back.\nThis pattern will keep showing up through the Bible: God calls, seeks, comes near, and makes the first move.",
      "God's questions invite truth.\nGod asks where Adam is and what he has done. He is not confused.\nThe questions draw hidden sin into the light, because healing cannot happen while people stay buried in denial.\nGod's questions can feel uncomfortable, but they are a form of mercy when they call us back to reality.",
      "Sin turns closeness into fear.\nAdam once lived openly before God. Now he hides from God's presence.\nSin damages our sense of safety with the One who made us. It teaches the heart to run from the only One who can heal it.\nThat is why grace has to restore not only behavior, but trust.",
      "Blame is one of sin's first languages.\nAdam blames Eve and hints at blaming God. Eve blames the serpent.\nNobody rushes to confession. Everyone tries to move responsibility away from themselves.\nGenesis shows that blame may protect pride for a moment, but it cannot restore relationship.",
      "Confession is different from explanation.\nAdam and Eve explain what happened, but they do not fully own it.\nTrue repentance does not only describe events. It tells the truth about personal responsibility before God.\nThis is why the Bible keeps calling people not just to admit facts, but to confess sin.",
    ],
  },
  "Genesis 3:14-19": {
    phrases: [
      "\"Cursed Are You\"\nThe serpent receives a direct curse. Adam and Eve face consequences, but the serpent is addressed as the enemy.\nThis shows that God does not treat deception as a small thing. Evil is judged by the Creator.\nThe curse begins the Bible's long story of conflict between God and the powers that oppose His life.\nThis matters because evil is real, but it is not equal to God. It stands under God's judgment.",
      "\"I Will Put Enmity\"\nEnmity means hostility or deep opposition. God announces that there will be ongoing conflict between the serpent and the woman, and between their offspring.\nThis means the story after Eden will not be neutral. There will be a line of rebellion and a line of promise.\nGenesis is preparing us to watch family lines carefully. Cain and Abel, Seth's line, Noah, Abraham, and eventually Israel all matter because the promise is moving through history.\nThe Bible's rescue story begins here, inside the judgment scene.",
      "\"Her Offspring\"\nThis phrase becomes one of the most important hopes in Genesis. A child from the woman's line will one day defeat the serpent.\nAt this point, the promise is not fully explained. It is like a seed planted early in the story.\nChristians have long seen Genesis 3:15 as the first gospel promise, pointing forward to Jesus.\nThe important point for any reader is this: God promises rescue before Adam and Eve can repair anything themselves.",
      "\"He Shall Bruise Your Head\"\nA head wound against the serpent means final defeat. The serpent will wound, but he will not win.\nThe promised offspring will be hurt, but the serpent's head will be crushed. That gives the promise both suffering and victory.\nThis pattern becomes deeply important for the whole Bible: victory over evil comes through a wounded deliverer.\nGenesis gives hope immediately after sin enters, so the curse is not the last word.",
      "\"Your Desire Will Be For Your Husband\"\nThis phrase is difficult, but in context it describes tension entering the marriage relationship. The partnership of Genesis 2 is now damaged by the fall.\nThe next chapter uses similar language when sin desires Cain, which suggests a pull toward control, conflict, or domination.\nThe point is not that marriage itself is cursed as evil. The point is that sin now distorts relationships that were created for trust and unity.\nGenesis helps us understand why love can be beautiful and painful in the same broken world.",
      "\"By The Sweat Of Your Face\"\nWork existed before sin, but now work becomes painful and resistant.\nThe ground that was meant to be cultivated will now produce thorns and thistles. Adam will still work, but the work will fight back.\nThis explains why ordinary life can feel frustrating even when the work itself is meaningful.\nThe curse does not make work worthless; it makes work weary.",
      "\"To Dust You Shall Return\"\nAdam was formed from dust, and now death means he will return to dust.\nThis is the fulfillment of God's warning in Genesis 2. Death is not presented as natural beauty here; it is the consequence of sin.\nThat is why the Bible later calls death an enemy. It is not part of the original peace of Eden.\nThe rest of Scripture moves toward God's answer to dust, death, and the grave.",
    ],
    truths: [
      "God judges evil.\nThe serpent is not allowed to deceive without answer. God names evil and curses it.\nThis matters because injustice is never invisible to God. He does not shrug at the voice that pulled humanity into death.\nJudgment may sound severe, but a God who never judges evil would not be good.",
      "God promises rescue immediately.\nGenesis 3:15 gives hope before Adam and Eve leave the garden.\nThe story is broken, but it is not abandoned. God speaks promise into judgment.\nThat means grace is not God's backup plan after humans improve; grace begins while humans are still guilty.",
      "Sin damages relationships.\nThe woman and man will experience tension where there should have been trust and partnership.\nSin does not stay private. It bends desire, leadership, love, work, family, and the way people relate to one another.\nGenesis 3 explains why relationships can carry both longing and conflict.",
      "Sin makes work painful, but not meaningless.\nWork itself was good before the fall. Adam had purpose in the garden before rebellion happened.\nAfter sin, the ground resists and labor becomes frustrating. That means work can still matter even when it feels hard.\nThe pain of work is part of the fall, but the dignity of work comes from creation.",
      "Death enters as judgment.\nGod warned that disobedience would bring death. Now that warning becomes reality.\nDeath is not treated as a friend in Genesis. It is the dark consequence of humanity turning from the God of life.\nThe rest of Scripture will move toward resurrection because the Bible's answer to death is not acceptance; it is redemption.",
    ],
  },
  "Genesis 3:20-24": {
    phrases: [
      "\"Eve\"\nAdam names his wife Eve because she will be the mother of all living. That is a surprising note of hope after judgment.\nDeath has entered, but life will continue. The human story does not end at the tree.\nThis name quietly connects back to the promise that offspring from the woman will matter in the battle against the serpent.\nEven outside Eden, Adam is speaking a life-word over the woman through whom future generations will come.",
      "\"Garments Of Skin\"\nAdam and Eve made fig leaves, but God provides a stronger covering.\nThe text does not explain every detail, but it clearly shows God caring for guilty people. They are judged, but they are not left naked in shame.\nMany readers also notice that skin implies the death of an animal, which introduces the idea that covering shame is costly.\nThis becomes a pattern in Scripture: human coverings are not enough, and God provides what shame cannot make for itself.",
      "\"Like One Of Us\"\nGod says the man has become like one of us in knowing good and evil. This does not mean humanity became divine.\nIt means they have entered moral knowledge through rebellion instead of trust. They now know evil by experience, and that knowledge brings ruin rather than freedom.\nThe phrase also reminds us that the problem was never wisdom itself. The problem was grasping wisdom apart from God.\nHumanity has gained a terrible kind of knowledge: the knowledge of evil from the inside.",
      "\"Tree Of Life\"\nThe tree of life represents ongoing life with God. After sin, access to it is blocked.\nThat is judgment, but it is also mercy. Living forever in a corrupted state would not be rescue.\nThe Bible will bring the tree of life back in Revelation, when God restores what sin broke.\nSo the guarded tree creates longing. The story now moves toward the day when access to life is opened again by God's redemption.",
      "\"Cherubim And A Flaming Sword\"\nCherubim are heavenly guardians associated later with God's holy presence, including the tabernacle and temple imagery.\nHere they guard the way to the tree of life. The flaming sword shows that humans cannot stroll back into Eden by effort, regret, or force.\nThis is a holy barrier, not just a locked gate. Sin has created a real separation between humanity and the fullness of God's life.\nThe rest of the Bible asks the big question: who can open the way back?",
      "\"He Drove Out The Man\"\nThis is painful language. Eden is no longer humanity's home.\nSin brings exile, distance, and loss. Adam and Eve leave the garden clothed, but they still leave.\nThat helps us hold mercy and consequence together. God cares for them, but He does not pretend nothing happened.\nExile is not abandonment, though. They leave with a promise still alive.",
    ],
    truths: [
      "Hope continues after judgment.\nEve's name points to life. The story does not end with death alone.\nGod keeps the human family moving forward, and the promised offspring remains possible.\nThis matters because biblical hope often begins in small signs before the full rescue is visible.",
      "God covers shame better than people can.\nFig leaves were Adam and Eve's covering. Garments of skin were God's provision.\nThis shows mercy in the middle of consequences. God does not leave the guilty exposed exactly as they are.\nThe covering does not erase every consequence, but it shows God's care for people who cannot fix their shame.",
      "Sin brings real loss.\nAdam and Eve are sent out of Eden. The fall is not symbolic only; it changes human life deeply.\nAccess to the garden is lost, and the human story moves into exile.\nThis helps us understand why the Bible treats sin as more than a private mistake. Sin separates people from the life they were made for.",
      "Eternal life in sin would not be mercy.\nThe tree of life is guarded so humanity does not live forever in a broken state.\nThat means even the closed gate has mercy inside it. God refuses to let corruption become endless immortality.\nRedemption will not mean preserving the fall forever; it will mean healing what the fall broke.",
      "The way back must be opened by God.\nCherubim guard the garden. Humans cannot force their way back into Eden.\nThat sets up the whole Bible's rescue story. We need more than regret, effort, religion, or self-improvement.\nThe way back to life must be given by God Himself.",
    ],
  },
  "Genesis 4:1-7": {
    phrases: [
      "\"Cain And Abel\"\nThese are the first children named in the Bible. Their story shows that the fall immediately affects family life.\nCain works the ground, and Abel keeps sheep. Both are living in the world outside Eden, where work continues but sin is now present.\nThe first family story after the fall becomes a story about worship, anger, warning, and violence.\nThat is sobering because Genesis moves from a broken relationship with God to broken relationships between people.",
      "\"An Offering\"\nBoth brothers bring something to the Lord. The passage does not answer every question about the offering system yet, because the law of Moses has not been given.\nWhat it does show clearly is that worship exposes the heart. The offering is not only about the object brought; it reveals the worshiper.\nAbel brings from the firstborn and fat portions, language that suggests honor and priority. Cain brings from the ground, but the text quickly moves to his reaction.\nCain's response becomes the window into what is happening inside him.",
      "\"The Firstborn Of His Flock\"\nAbel's offering is described with care: firstborn and fat portions. In the ancient world, the first and best belonged to honor, not leftovers.\nThis does not mean God randomly prefers shepherds over farmers. The issue is not job category; the issue is worship.\nAbel's gift seems to communicate trust and honor toward God.\nThe New Testament later points to Abel as a man of faith, which helps us read the offering as more than ritual.",
      "\"Cain Was Very Angry\"\nCain's anger is the turning point. The issue is not only that his offering was not regarded; it is what happens inside him afterward.\nAnger becomes dangerous when it refuses correction. Cain could have learned, repented, and brought what was right.\nInstead, his anger turns inward and downward until his face falls.\nGod addresses Cain before Cain acts, which shows mercy in the warning.",
      "\"Why Has Your Face Fallen\"\nGod questions Cain the way He questioned Adam. The question invites Cain to stop and look honestly at his condition.\nA fallen face shows the inner anger has become visible. Cain's body is telling the truth his mouth has not confessed.\nGod is giving Cain a chance to bring the hidden thing into the light.\nThis is an important pattern: God often confronts people early, before sin reaches its worst outcome.",
      "\"Sin Is Crouching At The Door\"\nThis is one of the strongest pictures of sin in Genesis. Sin is pictured like a predator waiting at the entrance.\nIt desires Cain, but Cain must rule over it. That means sin is not passive or harmless.\nThe language is personal and urgent. Cain is not being told to manage a small mood; he is being warned about a power that wants mastery.\nThis phrase teaches that unaddressed sin does not stay politely outside. It waits for opportunity.",
    ],
    truths: [
      "Sin enters family life quickly.\nGenesis moves from Eden to brothers. The first family outside the garden is already dealing with anger and rivalry.\nBrokenness spreads into ordinary relationships, not only religious moments.\nThat helps us understand why the Bible cares so deeply about the heart, the home, and how people treat one another.",
      "Worship reveals the heart.\nBoth brothers bring offerings, but Cain's response shows that the deeper issue is not only the gift.\nGod cares about worshipers, not only worship acts. The heart behind the offering matters.\nReligious activity can expose humility, faith, resentment, or pride.",
      "Anger must be addressed early.\nGod warns Cain before the murder happens. That means anger is not harmless just because it is still inside.\nUnruled anger can grow into destruction. The earlier it is brought into truth, the more room there is for repentance.\nGod's warning is not rejection; it is mercy before disaster.",
      "Sin wants mastery.\nGod describes sin as crouching and desiring Cain. This makes sin aggressive in its effect.\nPeople must not treat it casually. Sin is not only a mistake we make; it is also a power that seeks to rule us.\nCain is told he must rule over it, which means responsibility and resistance are still possible.",
      "Warning is mercy.\nGod could have let Cain run straight into judgment. Instead, He speaks first.\nA warning from God is an invitation to turn back. It may feel uncomfortable, but it is kinder than silence.\nGenesis teaches that conviction is a gift when it interrupts the road to destruction.",
    ],
  },
  "Genesis 4:8-16": {
    phrases: [
      "\"Cain Rose Up Against His Brother\"\nThe language is direct and painful. Brother kills brother.\nGenesis wants us to feel the horror of violence inside the first family. The promised offspring line is already surrounded by death and conflict.\nThe sin crouching at the door has now mastered Cain because he refused God's warning.\nThis phrase shows how quickly hidden anger can become visible destruction.",
      "\"Where Is Abel Your Brother\"\nGod's question echoes His question to Adam in Genesis 3. Again, God confronts sin with a question.\nHe is not asking because He lacks knowledge. He is drawing Cain into responsibility.\nThe repeated pattern matters: God questions the guilty before announcing judgment, giving space for truth.\nCain's answer will show how hard his heart has become.",
      "\"Am I My Brother's Keeper\"\nCain's reply is cold, defensive, and evasive. He refuses responsibility for the brother he has killed.\nThe question is ugly because the answer should be yes. Humans are meant to care for one another.\nThe word keeper connects painfully with the calling to keep or guard what God entrusts. Cain should have protected life, but he destroyed it.\nSin turns brotherhood into indifference.",
      "\"Your Brother's Blood Is Crying\"\nAbel is dead, but his blood has a voice before God.\nThis means injustice does not disappear just because the victim cannot speak. God hears what the ground has received.\nThe image is powerful because Cain buried the evidence in the earth, but the earth becomes a witness against him.\nThe Bible is teaching that hidden violence is never hidden from God.",
      "\"Cursed From The Ground\"\nCain's judgment is tied to the ground because the ground received Abel's blood.\nThis connects back to Adam's curse in Genesis 3, but Cain's situation is even darker. Adam struggled with resistant ground; Cain is driven from the ground's strength.\nGenesis keeps showing that human sin touches creation.\nViolence is not just a private act. It pollutes the world people live in.",
      "\"A Fugitive And A Wanderer\"\nCain's judgment fits his sin. He is driven from stable life and becomes restless.\nHe broke family peace, and now he loses settled place. He spilled blood on the ground, and now the ground will not yield strength to him.\nSin promised mastery, but it leaves Cain displaced and afraid.\nThe phrase also prepares us to see exile as one of sin's recurring consequences in Scripture.",
      "\"The Lord Put A Mark On Cain\"\nGod judges Cain, but He also limits vengeance against him.\nThis is mercy, not approval. Cain is guilty, but God refuses to let violence multiply without restraint.\nThe mark shows that human revenge is not allowed to become its own law.\nEven in judgment, God remains the One who governs justice.",
    ],
    truths: [
      "Sin can escalate quickly.\nCain moves from anger to murder. The warning was real because the danger was real.\nUnmastered sin does not stay small. It grows from inner resentment into outer harm when it is fed and protected.\nGenesis is teaching us to treat the heart seriously before damage becomes irreversible.",
      "God confronts violence.\nGod asks Cain where Abel is and brings hidden sin into the open.\nNo act of violence is invisible to Him. The blood that humans bury still cries before God.\nThis gives dignity to victims and warning to oppressors: God hears what people try to silence.",
      "People are responsible for one another.\nCain asks if he is his brother's keeper. Genesis lets us hear how wrong that question is.\nHuman life is not meant to be treated with indifference. The image of God in people creates moral responsibility.\nLove of neighbor begins much earlier than the law of Moses; it is rooted in creation and family life.",
      "Sin affects our relationship to the ground.\nCain is cursed from the ground that received Abel's blood.\nGenesis keeps showing that human sin touches creation. The world bears the weight of human violence.\nThis helps explain why the Bible does not separate spiritual evil from real-world damage.",
      "God restrains revenge.\nCain is judged, but God marks him for protection.\nGod does not let justice become endless retaliation. He limits vengeance so violence does not keep multiplying.\nThis is a major truth: God's mercy can restrain evil without pretending evil is innocent.",
    ],
  },
  "Genesis 4:17-24": {
    phrases: [
      "\"Built A City\"\nCain becomes associated with city-building. That shows human beings still carry creativity, order-making, and culture-building ability.\nEven after judgment, the image of God is not erased. People can organize, build, name, plan, and create.\nBut the city also reminds us that building something impressive does not mean the heart is healed.\nGenesis gives a realistic view of civilization: it can be useful and brilliant, while still carrying deep spiritual brokenness.",
      "\"Father Of Those Who Dwell In Tents And Have Livestock\"\nJabal represents a way of life connected to animals, movement, provision, and work.\nGenesis is showing the development of culture and skills through family lines. Human history is beginning to take shape in trades, crafts, and ways of living.\nThis is not treated as meaningless. Ordinary human labor matters in the story.\nBut the context also reminds us that skill can develop in a world that still needs redemption.",
      "\"Father Of All Those Who Play The Lyre And Pipe\"\nJubal is connected with music. That is a beautiful detail in a chapter full of pain.\nEven in a broken world, humans make art, sound, beauty, rhythm, and expression. Sin damages creation, but it does not remove the human ability to create.\nThis helps us avoid a shallow view of fallen people. People can be morally broken and still produce real beauty.\nThe Bible is honest enough to say both: music is a gift, and the human heart still needs God.",
      "\"Forger Of All Instruments Of Bronze And Iron\"\nTubal-cain is connected with metalwork and tools. This points to technology, craft, and skill.\nTools can serve life, work, farming, protection, and creativity. Human ability to shape materials is part of culture-building.\nBut in a violent world, tools can also become weapons, which makes Lamech's speech feel even darker.\nGenesis is teaching that technology needs moral direction. Skill without wisdom can become dangerous.",
      "\"I Have Killed A Man\"\nLamech does not hide violence like Cain did. He boasts about it.\nThat shows sin becoming bolder across generations. What Cain tried to avoid admitting, Lamech turns into a song of pride.\nThe speech sounds like a victory poem, but it is really a sign of moral decay.\nA culture is in danger when people begin celebrating what they should be repenting of.",
      "\"Seventy-Sevenfold\"\nLamech twists the idea of protection into revenge. God limited vengeance against Cain, but Lamech multiplies vengeance as a threat.\nThis shows how mercy can be distorted by a violent heart. What God gave as restraint, Lamech turns into intimidation.\nThe number communicates excess: if Cain is avenged sevenfold, Lamech wants vengeance far beyond that.\nThe line of Cain is building culture, but it is also normalizing pride and violence.",
    ],
    truths: [
      "Culture can develop in a broken world.\nCities, livestock, music, and tools appear in Cain's line. Human creativity continues after sin.\nThe image of God is damaged, but not erased. People still build, organize, invent, and beautify.\nThat helps us read the world honestly: cultural gifts are real gifts, even when people need redemption.",
      "Beauty can still exist outside Eden.\nMusic appears in a family line marked by brokenness. That is a realistic picture of the world.\nBeauty and sin often exist side by side. A song can be beautiful while the singer's world is morally confused.\nGenesis teaches us to receive beauty as a gift without pretending beauty can save the heart.",
      "Human skill is not the same as holiness.\nCain's descendants develop useful tools and crafts. Progress in skill does not automatically mean progress in character.\nThis is one of the most important truths for reading history and modern life. Technology, art, cities, and systems can grow while pride and violence grow too.\nThe heart still needs redemption.",
      "Violence can become a source of pride.\nLamech boasts about killing. Sin has moved from hiding to bragging.\nThat is a frightening development because it means conscience is being trained in the wrong direction.\nWhen people celebrate violence, the culture is not merely making mistakes; it is learning to love darkness.",
      "Civilization cannot save humanity by itself.\nCities, tools, music, and work are good gifts. But none of them removes sin.\nGenesis shows the need for deeper rescue than human progress can provide.\nHumanity can build impressive things and still be spiritually lost.",
    ],
  },
  "Genesis 4:25-26": {
    phrases: [
      "\"Another Offspring\"\nEve sees Seth as appointed by God after Abel's death. This connects back to the promised offspring in Genesis 3:15.\nThe family has suffered death and exile, but God has not let the line of hope disappear.\nThat phrase keeps the reader watching for how God's promise will continue.\nIt also teaches that God can keep His promise alive through ordinary family moments, not only dramatic miracles.",
      "\"Instead Of Abel\"\nAbel's death mattered. Seth is not a replacement in the sense that Abel did not count.\nThe phrase means God is continuing the story after real grief. New mercy does not erase the pain of old loss.\nGenesis does not ignore death, but it also does not let death be the final word.\nThis is a tender balance: grief is honored, and hope is still given.",
      "\"Seth\"\nSeth's name is connected with being appointed or granted. Eve recognizes God's hand in this birth.\nThat is beautiful because Eve is living outside Eden after enormous pain. She has known sin, exile, the death of Abel, and the wandering of Cain.\nYet she can still name God's provision.\nSeth's birth is a small sign that God's promise is still moving through the wounded family.",
      "\"Enosh\"\nEnosh's name is connected to humanity, frailty, or mortal man. It reminds readers that human life is weak and dependent.\nThat fits the next line about calling on the Lord. Frail people need the strong name of God.\nGenesis is not presenting humanity as self-sufficient heroes. It is showing people who need God to preserve hope.\nThe name prepares us for worship that rises from weakness.",
      "\"Call Upon The Name Of The Lord\"\nThis phrase points to worship, prayer, dependence, and public turning toward God.\nAfter a chapter full of sin, this ending matters deeply. People are not only building cities and boasting about violence; some are calling on the Lord.\nCalling on the name of the Lord means seeking God as God, not hiding from Him like Adam or defying Him like Cain.\nThe chapter ends with worship because God's promise is still alive outside Eden.",
    ],
    truths: [
      "God's promise keeps moving.\nAbel is dead and Cain is exiled, but hope does not die. God appoints another offspring.\nThe promise from Genesis 3 continues through a fragile family line.\nThis teaches that God's plan is not easily destroyed by human sin, grief, or violence.",
      "Hope does not erase grief.\nSeth is given after Abel's murder, and the text still says he is given instead of Abel.\nThat means Abel is remembered. God does not treat new mercy as if old sorrow never happened.\nBiblical hope is not denial. It is God's faithfulness meeting real loss.",
      "God works through ordinary births.\nGenesis often carries huge promises through simple family lines.\nA child is born, and the story moves forward. That may look ordinary, but in Genesis it is often how God preserves the future.\nGod can work through quiet beginnings that do not look impressive yet.",
      "Worship rises in a broken world.\nPeople begin to call on the name of the Lord. That means sin and violence do not have the only voice.\nDependence on God is still alive outside Eden.\nThis is a major ending for Day 2: after shame, exile, murder, and boasting, worship still rises.",
      "Day 2 ends with hope, not only damage.\nGenesis 3-4 show sin, shame, exile, murder, and violence.\nBut the final note is not Lamech's boast. It is people calling on the Lord.\nThe story is broken, but God is not finished.",
    ],
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_TWO_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

const DAY_THREE_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 5:1-5": {
    phrases: [
      "📘 Book Of The Generations\nThis phrase tells us Genesis is opening a family record, but it is doing more than saving names. In the Bible, genealogies teach theology. They show where the promise is moving, who belongs to the story, and how God keeps working through real families.\nThis genealogy comes right after Cain's violence and Seth's worship, so it helps us track the line of hope. Genesis wants us to see that even outside Eden, God is still carrying His promise forward through ordinary births and generations.",
      "🪞 In The Likeness Of God\nGenesis repeats the image-of-God language after the fall, and that matters. Sin damaged humanity, but it did not erase human dignity. Adam's descendants are still human beings made to reflect God, not disposable creatures.\nThis is important for regular Bible reading because Genesis refuses to treat fallen people as worthless. People are broken, but they still matter deeply because they still carry the mark of their Creator.",
      "👶 In His Own Likeness\nAdam's son is born in Adam's likeness, which means the family resemblance now includes life in a fallen world. The image of God remains, but Adam also passes on a human story marked by sin, weakness, and death.\nThat helps explain why Genesis 5 feels both beautiful and heavy. The blessing to be fruitful is still happening, but the damage from Genesis 3 is also spreading through the family line.",
      "🌱 Male And Female\nThis phrase reaches back to Genesis 1 and reminds us that the creation design has not disappeared. Men and women together bear God's image and share the calling to fill the earth. The fall has made life painful, but creation's original dignity still stands.\nGenesis is quietly reminding the reader that God's good design is older than sin. Brokenness is real, but it is not the first word God spoke over humanity.",
      "⚰️ And He Died\nThis repeated line becomes the drumbeat of Genesis 5. No matter how long each person lives, the ending keeps coming back: and he died. It is meant to make us feel the truth of God's warning in Eden.\nThe long lifespans can sound impressive, but the passage will not let us confuse long life with victory over death. Genesis is teaching that death has entered the human story, and only God can break that pattern.",
    ],
    truths: [
      "📖 Genealogies are not filler.\nGenesis uses family records to teach us how God's promise moves through history. The names may feel slow at first, but they show that God works across generations, not only in dramatic moments.\nWhen we read a genealogy, we should ask what line is being traced, what promise is being preserved, and what pattern the writer wants us to notice.",
      "🧍 Human dignity remains after the fall.\nGenesis 5 repeats that people are made in God's likeness. That means sin does not make people worthless.\nThis truth matters because the Bible can be brutally honest about human evil while still protecting human value. We are fallen, but we are not trash. We are damaged image-bearers who need redemption.",
      "🧬 Sin affects the family story.\nAdam's descendants inherit a world where death is now normal. The problem is bigger than one bad decision in the past; it becomes part of the human condition.\nGenesis 5 helps us feel that sin does not stay private. It enters families, generations, bodies, history, and eventually every grave.",
      "⏳ Long life is not the same as eternal life.\nSome of these people live for hundreds of years, which sounds almost impossible to modern ears. But every long life still bends toward the same ending.\nThe passage teaches that the real problem is not simply that life is too short. The deeper problem is death itself, and that problem requires God's rescue.",
      "🕯️ God keeps hope alive in ordinary generations.\nThere are no giant miracles in the first part of Genesis 5. People are born, live, have children, and die.\nBut that ordinary rhythm is still where God is preserving the promised line. Sometimes God's faithfulness looks like the next generation still being here.",
    ],
  },
  "Genesis 5:6-20": {
    phrases: [
      "🔁 He Lived...And Became The Father\nThe repeated rhythm of living and becoming a father shows life continuing outside Eden. People are marrying, having children, working, and building families. The world is fallen, but it has not stopped.\nThat repetition is not boring by accident. It helps the reader feel the steady march of generations and the faithfulness of God preserving human life even in a cursed world.",
      "👨‍👩‍👧 Sons And Daughters\nGenesis names the main line it wants us to follow, but it also reminds us that many other sons and daughters existed. Their names are not listed, but their lives mattered. The Bible often focuses on one covenant line without saying everyone else is meaningless.\nThis is a helpful reading tip: when Scripture narrows the camera, it is usually tracing a promise, not denying the value of everyone outside the frame.",
      "📅 All The Days\nThis phrase counts the whole span of a person's life. It reminds us that God sees a life from beginning to end, not only the famous parts. Most people in this section do not get a story, speech, or dramatic scene.\nStill, their days are numbered and remembered in Scripture. That teaches us that quiet lives are not invisible to God.",
      "🧱 Mahalalel, Jared, Enoch\nThese names may feel unfamiliar, but they form a bridge from Adam to Noah. Genesis is building a historical and theological road. The flood story does not appear out of nowhere; it comes through a line of real generations.\nThe point is not that every name needs a long biography. The point is that God is carrying the story forward step by step.",
      "⚰️ Then He Died\nAgain and again, the line returns. People live, have children, and die. Genesis wants the reader to feel death as an enemy, not as a natural friend.\nThis repeated ending prepares us for Enoch, whose story suddenly breaks the pattern. You will only feel the surprise of Enoch if you first feel the weight of everyone else dying.",
    ],
    truths: [
      "🔂 Repetition is teaching.\nGenesis repeats the same pattern because it wants the truth to sink in. Life continues, families grow, and death keeps arriving.\nThe repetition trains the reader to feel the world after Eden. Something is still blessed, but something is also deeply wrong.",
      "🏠 Ordinary generations matter to God.\nMost of the people in this section are not famous Bible characters. They are part of the line because they received life and passed it on.\nThat matters for regular people. God often works through faithful, ordinary lives that do not look dramatic while they are happening.",
      "⚰️ Death is the great interruption.\nThe passage does not treat death as normal in the emotional sense. It treats death as the repeated consequence of the fall.\nEvery 'then he died' echoes Genesis 2 and 3. God's warning was true, and humanity cannot educate, build, or age its way out of death.",
      "🧭 God is guiding the story even when it feels slow.\nGenealogies can feel like the Bible has paused, but the story is actually moving. The line from Adam to Noah is being carefully preserved.\nThis teaches us that God's plan often moves through long stretches of ordinary history. Slow does not mean God is absent.",
      "🌿 Life and loss exist side by side.\nChildren are born, families grow, and yet death remains. Genesis lets both realities stand together.\nThat is honest to human experience. We can celebrate births, marriages, and family blessings while still knowing the world needs deeper redemption.",
    ],
  },
  "Genesis 5:21-24": {
    phrases: [
      "🚶 Enoch Walked With God\nThis is one of the most beautiful phrases in Genesis. Walking with God means a life of fellowship, trust, direction, and daily nearness. It is not describing one religious moment, but a pattern of life.\nThe phrase also reaches back to Eden, where humanity was made to live with God. Enoch's life shows that even outside the garden, close fellowship with God is still possible.",
      "👨‍👦 After He Became The Father Of Methuselah\nGenesis says Enoch walked with God after Methuselah was born. That little detail matters because walking with God did not pull Enoch out of normal family life. He followed God as a father, inside the responsibilities of ordinary life.\nThis helps regular readers because holiness is not only for quiet mountains or church services. Walking with God happens in parenting, work, meals, pressure, and daily choices.",
      "✨ Three Hundred Years\nEnoch's walk with God lasted a long time. This is not a quick spiritual high or one good season. Genesis presents him as someone whose fellowship with God endured.\nThat gives weight to the phrase. A walk is not a sprint. It is step after step, direction after direction, year after year.",
      "🕊️ He Was Not\nThis phrase interrupts the death pattern in Genesis 5. Everyone else is introduced, lives, has children, and dies, but Enoch's ending is different. The text becomes short, mysterious, and surprising.\nThe point is not to answer every question about what Enoch experienced. The point is to show that death is not ultimate over God. God can interrupt the pattern.",
      "🙌 God Took Him\nGod taking Enoch shows divine action. Enoch does not escape death by human power, secret knowledge, or moral achievement. God takes him.\nThis gives the passage its hope. The answer to death is not human strength; it is God's authority and mercy. Enoch becomes a small window of hope in a chapter full of graves.",
    ],
    truths: [
      "🚶 Faith is a walk, not just a moment.\nEnoch's life is described as walking with God. That means faith has direction, relationship, and endurance.\nThis helps us understand spiritual life in everyday language. God is not only interested in dramatic decisions; He is forming people who keep walking with Him.",
      "🏡 Holiness can happen in ordinary life.\nEnoch walked with God after becoming a father. His faith did not require escaping responsibility.\nThat matters because many people think spiritual depth only happens when life is quiet. Genesis shows a man walking with God inside family life and normal human responsibilities.",
      "⚰️ God has authority over death.\nGenesis 5 repeats death again and again, but Enoch's story interrupts it. God takes him.\nThis does not mean Enoch is the full answer to death, but it is a signpost. Death is powerful in the fallen world, but it is not more powerful than God.",
      "🕯️ One faithful life can shine in a dark pattern.\nEnoch stands out because the chapter has trained us to expect death. His life becomes a testimony inside the repetition.\nThat teaches us something important. Faithfulness does not need a crowd to be meaningful. One person walking with God can become a witness to everyone reading the story.",
      "🌅 Genesis gives hope before the flood.\nBefore the world becomes filled with violence in Genesis 6, Genesis 5 gives us Enoch. That is not random.\nThe Bible is showing that corruption is real, but fellowship with God is also real. Darkness never gets the only testimony.",
    ],
  },
  "Genesis 5:25-32": {
    phrases: [
      "⏳ Methuselah\nMethuselah is known for the longest lifespan recorded in Scripture. That fact is interesting, but Genesis still ends his life with the same truth: he died. Long life is not the same as victory over death.\nHis name also sits close to the flood timeline, which makes the section feel like history is moving toward a major turning point. The long patience of God does not mean judgment will never come.",
      "🧔 Lamech\nThis is not the same Lamech from Cain's line who boasted about violence. Genesis now shows a different Lamech in Seth's line, and his words sound weary instead of proud. He is looking for comfort, not revenge.\nThat contrast matters. Cain's line gave us a Lamech who multiplied violence; Seth's line gives us a Lamech who longs for relief from the curse.",
      "🛟 Noah\nNoah's name is connected with rest or comfort. His father names him with hope that this child will bring relief in a world burdened by cursed ground. Before Noah ever builds an ark, his name is already carrying expectation.\nThis helps us read Noah as more than a boat builder. He enters the story as a sign that people are aching for rescue from the broken world they inherited.",
      "🌾 The Ground Which Yahweh Has Cursed\nThis phrase reaches back to Genesis 3. The curse on the ground made human work painful, frustrating, and sweaty. Lamech feels that burden generations later.\nGenesis is showing that sin has long-term effects. Adam's rebellion did not only affect Adam; the ground itself became part of the human struggle.",
      "😮‍💨 Comfort Us In Our Work\nLamech is not asking for luxury. He is longing for relief from exhausting labor in a cursed world. That makes the verse deeply human.\nPeople still understand this feeling. Life can be beautiful and blessed, but it can also feel heavy, repetitive, and tiring. Noah's name becomes a prayer for God to bring rest into that weariness.",
    ],
    truths: [
      "😮‍💨 People long for relief from the curse.\nLamech's words show the ache of life outside Eden. Work is not evil, but work has become painful because of sin.\nThis truth helps readers connect Genesis to real life. Human exhaustion, frustration, and longing for rest are not random feelings; they belong to a world that needs redemption.",
      "🧵 God prepares hope before judgment.\nNoah is introduced before the flood begins. That matters because God is already preparing rescue before the waters come.\nGenesis often works this way. Before judgment reaches its full moment, God is already preserving a line of mercy.",
      "🏷️ Names can carry theology.\nNoah's name is not just a label. It carries hope, longing, and interpretation.\nBiblical names often help us understand what a parent believes, fears, or hopes God will do. Here, Noah's name tells us the world is weary and looking for comfort.",
      "⚰️ Even the longest life cannot solve death.\nMethuselah's life is incredibly long, but it still ends. Genesis will not let age become salvation.\nThat is a sobering truth. Humanity needs more than extra years. We need deliverance from the death pattern itself.",
      "🌅 God keeps the promise moving through weary people.\nLamech is tired, but he still speaks hope over his son. The promised line does not move through perfect people with easy lives.\nIt moves through families who feel the curse and still look for God's mercy. That is part of the beauty of Genesis.",
    ],
  },
  "Genesis 6:1-8": {
    phrases: [
      "🧩 Sons Of God And Daughters Of Men\nThis phrase has been interpreted in more than one way. Some readers understand the sons of God as heavenly beings, while others understand them as powerful rulers or the line of Seth mixing with the line of Cain. Genesis does not slow down to settle every debate here.\nThe main point is clear: human society is becoming deeply disordered. Power, desire, and corruption are spreading, and the story is moving toward a world that can no longer continue as it is.",
      "⏳ My Spirit Will Not Strive With Man Forever\nThis shows that God's patience has a limit. He has been patient with human sin, but He will not allow corruption to go on forever without judgment. That is not cruelty; it is justice.\nThe phrase also teaches that judgment is not random. God sees, waits, warns, and sets a boundary. The flood comes after divine patience, not before it.",
      "💪 Mighty Men Who Were Of Old\nThese figures are remembered as impressive, powerful, and famous. But Genesis is not impressed by fame the way humans often are. A society can have mighty people and still be morally ruined.\nThat is an important Bible-reading tip. Scripture often looks past reputation and asks what is happening in the heart, in justice, and in relationship to God.",
      "🧠 Every Imagination Of The Thoughts Of His Heart\nThis is one of the strongest descriptions of human corruption in Genesis. The problem is not only bad actions; it has reached the imagination, thoughts, and heart. Sin is shaping what people desire, plan, and dream about.\nIn the Bible, the heart is not just emotions. It is the control center of desire, thought, will, and worship. Genesis is saying the problem has gone deep.",
      "💔 Yahweh Was Sorry...And Grieved\nThis language helps us see that God is not cold toward human evil. The passage speaks in human terms so we can understand divine grief. God is not surprised, but He is truly opposed to and grieved by what sin does to His world.\nThat matters because judgment in the Bible is not God losing His temper. It is the holy response of a good God whose creation has become filled with evil.",
      "🌧️ I Will Destroy Man\nThis is heavy language, and it should feel heavy. The flood is not a children's decoration; it is judgment against a world saturated with corruption and violence. Genesis wants us to take evil seriously.\nAt the same time, this verse sits right before Noah finding favor. Judgment is real, but God is also preserving mercy inside the story.",
      "🕊️ Noah Found Favor\nFavor means grace. Noah does not appear because humanity is mostly fine; he appears because God is merciful. The first note about Noah is not his boat-building skill but the favor he finds with the Lord.\nThat matters because obedience will come next, but grace comes first. Noah's life becomes the place where God's mercy continues the human story.",
    ],
    truths: [
      "🫀 Sin grows from the heart outward.\nGenesis 6 says human thoughts and imagination had become evil continually. That means the flood story is not only about external behavior.\nThe Bible diagnoses sin at the root. Actions matter, but actions grow from desires, thoughts, loves, fears, and worship. God sees the whole tree, not only the fruit.",
      "🏆 Human greatness cannot cover corruption.\nThe world has mighty men and people of renown, but it is still under judgment. Fame, strength, and achievement do not equal righteousness.\nThis is a truth every generation needs. A culture can admire powerful people while God sees a heart-level collapse underneath the applause.",
      "💔 God grieves evil.\nThe passage shows God's sorrow over what humanity has become. He is not detached from His creation.\nThis gives us a fuller picture of God. His holiness judges sin, and His goodness grieves what sin destroys. Judgment and grief are not opposites here; they belong together.",
      "⚖️ Judgment is not random.\nGod sees the depth of evil before the flood comes. He is patient, but He is not indifferent.\nThat helps us understand biblical judgment. God does not act from ignorance or impulse. He judges with full knowledge of what is happening.",
      "🕊️ Grace appears before the ark.\nNoah finds favor before the instructions for the ark. That order matters.\nThe rescue story begins with God's grace, then moves into Noah's obedience. The ark is built by faith, but the foundation underneath the story is mercy.",
    ],
  },
  "Genesis 6:9-13": {
    phrases: [
      "📜 These Are The Generations Of Noah\nThis phrase opens a new section in Genesis. The camera narrows from the whole corrupt world to one man and his family. That does not mean Noah is the hero apart from God; it means God is preserving the story through him.\nGenesis uses these generation headings to move the promise forward. Here, the heading tells us to watch Noah closely because the future of humanity will pass through his household.",
      "⚖️ Righteous And Blameless\nThese words do not mean Noah was sinless. The Bible is clear that only God is perfectly righteous in Himself. In context, Noah stands out as a man of integrity in a violent generation.\nBlameless means whole, sound, or above reproach in the way he lives before God. Noah is not perfect, but his life has a different direction from the corruption around him.",
      "🚶 Noah Walked With God\nThis phrase connects Noah with Enoch. In a world moving away from God, Noah moves with God. The focus is relationship before activity.\nNoah will build, obey, gather, and endure, but the root of all that is this: he walks with God. His obedience is not random rule-keeping; it grows out of fellowship and trust.",
      "🌍 The Earth Was Corrupt\nCorrupt means spoiled, ruined, or morally damaged. Genesis is saying the problem is not isolated. The whole social world has become rotten before God.\nThis word is important because the flood is described as God destroying what has already become destructive. Humanity is ruining the earth, and judgment answers that corruption.",
      "🩸 Filled With Violence\nViolence is one of the clearest reasons given for the flood. Genesis is not vague here. The world has become full of harm, bloodshed, oppression, and destruction.\nThat tells us something about God's heart. Violence against people matters to Him because people bear His image. A world full of violence is a world attacking what God made precious.",
      "👀 God Saw The Earth\nGod's judgment begins with seeing. He is not guessing, overreacting, or acting from rumor. He sees what the earth has become.\nThis phrase should comfort victims and sober the violent. Nothing is hidden from God. He sees public evil and private corruption with perfect clarity.",
    ],
    truths: [
      "🧍 Faithfulness can stand out in a corrupt generation.\nNoah is not described as righteous because his world was easy. He is righteous in contrast to a generation filled with violence.\nThat matters for readers today. The Bible never says we need a perfect environment before we can walk with God. Faithfulness can grow in spiritually dark times.",
      "🚶 Walking with God is the root of obedience.\nNoah's actions flow from his relationship with God. He does not simply build an ark because he likes construction.\nThis is important because obedience without relationship becomes empty duty. Noah's obedience is the fruit of trust, listening, and walking with God.",
      "🩸 Violence matters deeply to God.\nGenesis names violence as a defining problem before the flood. God is not indifferent to harm done between people.\nThis truth protects human dignity. Violence is not merely a social issue; it is a spiritual offense against the Creator who made people in His image.",
      "👁️ God judges with clear sight.\nThe text says God saw the corruption of the earth. His judgment is based on reality.\nThat means nobody is forgotten, and nobody successfully hides. God's justice is never confused by appearances, popularity, or power.",
      "🌱 Righteousness is direction, not sinless perfection.\nNoah being blameless does not mean he never sinned. It means his life is whole toward God compared with the corruption around him.\nThis helps readers avoid despair and pride. God calls people to real faithfulness, but the foundation is still grace.",
    ],
  },
  "Genesis 6:14-22": {
    phrases: [
      "🛶 Make An Ark\nThe ark is not a random boat project. It is God's appointed refuge from coming judgment. Noah does not invent his own rescue plan; he receives one from God.\nThat matters because the ark teaches trust. The way of rescue may look strange to the world, but safety is found where God says safety will be found.",
      "🪵 Gopher Wood\nWe do not know with certainty what exact wood this refers to. That is okay; the main point is not the species of tree but the specificity of God's instruction. God gives Noah concrete details for a real act of obedience.\nThis reminds us that faith is not vague inspiration. It often becomes practical obedience with materials, measurements, time, and cost.",
      "🏠 Rooms In The Ark\nThe ark has rooms, which means the rescue is ordered and prepared. God is not only saving Noah in a general way; He is making space for life to be preserved through the flood.\nThis detail helps us see that God's rescue includes structure. Mercy is not chaotic. God makes room for the life He intends to carry through judgment.",
      "🧴 Cover It With Pitch\nPitch sealed the ark so the waters could not enter. The word gives the picture of covering, protection, and preservation. Noah and his family are safe not because the flood is weak, but because the refuge is sealed.\nThis is a helpful image. Judgment is real outside, but God provides covering inside. The safety of the ark depends on God's design, not Noah's feelings.",
      "📏 This Is How You Shall Make It\nGod gives measurements. That may feel technical, but it shows that Noah's faith had to become careful obedience. He could not simply say, 'I believe,' and then build whatever he wanted.\nThe details teach that trusting God includes listening to what He actually says. Obedience is not creativity with God's commands; it is surrender to God's wisdom.",
      "🤝 I Will Establish My Covenant\nThis is the first explicit use of covenant language in the Bible. A covenant is a binding commitment God makes, and here it appears before the flood arrives. That means the coming judgment will not erase God's promise or God's purpose.\nThis phrase is huge because the flood story is not only about destruction. It is also about God committing Himself to preserve life and continue His plan.",
      "✅ Noah Did Everything\nThis line shows Noah's faith becoming action. He does not merely agree with God's warning; he responds with obedience. That obedience likely took time, labor, and endurance.\nNoah's example is practical. Real faith eventually picks up tools, changes schedules, obeys instructions, and keeps going when the assignment feels strange.",
    ],
    truths: [
      "🛟 God provides the way of rescue.\nNoah does not design the ark on his own. God gives the plan before the flood comes.\nThis shows mercy inside warning. God does not only announce judgment; He provides a refuge for those who trust Him.",
      "🔨 Faith becomes practical obedience.\nNoah's faith is measured in boards, pitch, rooms, and long labor. It is not just a feeling inside him.\nThis matters because biblical faith is never only mental agreement. Trust in God eventually takes shape in real decisions and visible obedience.",
      "🤝 Covenant stands in the middle of judgment.\nGod speaks covenant before the waters rise. That means judgment does not cancel His commitment to preserve the promise.\nThis is a major theological point. The flood is severe, but God's covenant mercy is already present before the first drop falls.",
      "🏠 God's rescue preserves more than one individual.\nThe ark includes Noah's family and living creatures. God's purpose is bigger than private survival.\nHe is preserving a future for humanity and creation. Rescue in Genesis often has a mission attached to it.",
      "⏱️ Obedience may take a long time before results are visible.\nNoah builds before the rain. That means he obeys while the warning still has to be trusted by faith.\nThis truth is deeply practical. Sometimes following God means preparing faithfully before anyone else can see why it matters.",
    ],
  },
  "Genesis 7:1-10": {
    phrases: [
      "🚪 Come Into The Ark\nGod does not merely tell Noah to build the ark; He calls him into it. The language feels personal and protective. Noah must enter the refuge God provided.\nThat matters because knowing about rescue is not the same as being inside it. The ark only saves those who actually come in.",
      "👀 I Have Seen Your Righteousness\nGod sees Noah's life in the middle of his generation. This does not mean Noah earned salvation by perfection. It means God recognizes Noah's faithful direction and covenant loyalty.\nThis phrase is encouraging because hidden faithfulness is not hidden from God. Noah may look strange to his world, but God sees clearly.",
      "🕊️ Clean Animals\nClean and unclean categories appear before the law of Moses. That surprises many readers. It shows that some kind of worship distinction was already understood in the story world of Genesis.\nThe extra clean animals will matter after the flood because Noah offers sacrifice. God is preserving not only animals for survival, but also the possibility of worship.",
      "⏳ Seven Days\nGod gives a final seven-day window before the flood begins. This pause creates tension, but it also shows patience. Judgment is announced, the ark is ready, and still there is a short waiting period.\nIn Scripture, waiting periods often test trust. Noah has obeyed, but he still has to wait for God's word to happen exactly when God says.",
      "✅ Noah Did All That Yahweh Commanded\nThis repeated statement is important. Noah's obedience is not partial or selective. He does what God commands.\nThe repetition teaches that faithfulness is not flashy here. It is steady obedience to God's word in a world that does not share Noah's urgency.",
    ],
    truths: [
      "🚪 Rescue must be entered.\nThe ark exists, but Noah still has to go in. God's provision calls for response.\nThis truth is simple but important. It is possible to know the right facts about God's rescue and still need to personally entrust yourself to what God has provided.",
      "👁️ God sees faithfulness in dark times.\nNoah's generation is corrupt, but God sees Noah. The faithful life is not lost in the crowd.\nThat matters for readers who feel outnumbered. God is not confused by the majority. He sees the person walking with Him.",
      "🕯️ Worship is preserved through judgment.\nThe clean animals point forward to sacrifice after the flood. God is not only preserving biological life; He is preserving worship.\nThat shows the heart of the story. Humanity needs more than survival. Humanity needs restored relationship with God.",
      "⏳ God's patience does not mean His warning is empty.\nThe seven days show patience, but the flood still comes. Delay is not denial.\nThis is a serious truth. God's mercy gives space, but His word remains true. Waiting should lead to repentance and trust, not carelessness.",
      "✅ Obedience is often repeated before it is rewarded.\nNoah obeys, then waits, then obeys again. The visible result comes later.\nGenesis teaches that faithfulness often looks like doing the next commanded thing before the outcome arrives.",
    ],
  },
  "Genesis 7:11-16": {
    phrases: [
      "📅 The Six Hundredth Year Of Noah's Life\nGenesis gives a specific time marker, which grounds the flood in the flow of Noah's life. This is not written like a vague myth floating outside history. The writer wants the reader to feel the moment arriving.\nThe date also slows us down. After years of warning and preparation, there is a real day when the door closes and the waters begin.",
      "🌊 Fountains Of The Great Deep\nThe waters come from below as well as above. This sounds like creation being undone, because in Genesis 1 God ordered the waters so dry land could appear. Now those boundaries are breaking open.\nThat is an important aha moment. The flood is not just bad weather. It is a judgment scene where the ordered world is overwhelmed by the waters God once restrained.",
      "🌧️ Windows Of Heaven\nThe waters also pour from above. Ancient readers pictured the heavens as holding waters that God could restrain or release. Genesis uses that image to show God ruling over the whole created order.\nThe point is not that nature is out of control. The point is that the Creator is in control, and creation itself responds to His judgment.",
      "⏱️ Forty Days And Forty Nights\nForty often becomes a period of testing, judgment, or preparation in Scripture. Moses, Israel, Elijah, and Jesus are all connected with forty-day or forty-year periods later in the Bible.\nHere, the number marks the intensity and completeness of the flood rains. It is long enough to show this is not a passing storm; it is a world-changing judgment.",
      "🐾 Two By Two\nThe animals entering the ark show God's concern for preserving creaturely life. The flood is judgment, but not annihilation of creation's future. God carries life through the waters.\nThis detail helps us remember that the ark is not only about Noah's family. It is about God's commitment to continue the created world after judgment.",
      "🔒 Yahweh Shut Him In\nThis is one of the most powerful lines in the flood story. Noah enters, but God shuts the door. Safety is finally sealed by the Lord Himself.\nThat means Noah's security rests on God's action, not merely Noah's construction skill. The same God who warned him now protects him inside the refuge.",
    ],
    truths: [
      "🌊 Judgment can look like creation unraveling.\nThe flood waters reverse the ordered boundaries of Genesis 1. The deep breaks open, the heavens pour down, and dry land disappears.\nThis teaches that sin is anti-creation. When humanity fills the world with corruption, judgment shows how serious it is to rebel against the Creator's order.",
      "👑 God rules over the waters.\nThe deep and the heavens are not independent powers. God commands and restrains them.\nThat matters because ancient people often feared chaotic waters. Genesis says even the most terrifying waters are still under the authority of Yahweh.",
      "🔒 God's protection is personal.\nThe Lord shuts Noah in. That is a tender detail in a terrifying scene.\nNoah obeyed by entering, but God secured the door. The passage holds human obedience and divine protection together.",
      "🐾 God's mercy includes creation.\nAnimals are preserved in the ark. God is not throwing creation away.\nThe flood judges corruption, but God's rescue carries forward life, blessing, and the possibility of a renewed world after the waters.",
      "⏳ A warning can become a day on the calendar.\nFor a long time, the flood was a future warning. Then Genesis gives the exact moment it began.\nThis truth sobers the reader. God's words are not vague religious ideas. What He says will happen truly happens.",
    ],
  },
  "Genesis 7:17-24": {
    phrases: [
      "📈 The Waters Prevailed\nThis phrase is repeated to show the overwhelming power of the flood. The waters rise, increase, and dominate the landscape. Human strength, buildings, and normal life cannot stand against them.\nGenesis wants the reader to feel the seriousness of judgment. The world that ignored God is now covered by waters no one can control.",
      "⛰️ Covered All The High Mountains\nThe highest places are covered, which means there is no natural refuge outside the ark. Mountains often feel like places of safety, but here even they disappear beneath the waters.\nThat detail teaches that when God's judgment comes, human escape routes fail. Safety is not found in height, strength, or strategy, but in the refuge God provided.",
      "🫁 All Flesh Died\nThis is intentionally sobering. The flood is about real death, not just dramatic scenery. Genesis names humans, animals, creeping things, and birds to show the scope of the judgment.\nThe phrase should not be softened into a cartoon. It teaches that sin is deadly, and a world filled with violence brings devastation to the whole created order.",
      "🛶 Only Noah Was Left\nThis phrase highlights preservation by grace. Noah survives because he is in the ark God commanded and God sealed. The point is not that Noah is naturally stronger than everyone else.\nThe wording also creates a remnant theme that will appear again in the Bible. God preserves a people through judgment so His promise can continue.",
      "📆 One Hundred Fifty Days\nThe waters prevail for a long time. Noah is rescued, but he is not immediately released. Salvation from judgment includes a season of waiting inside the ark.\nThat is a helpful detail for real life. Being safe in God's will does not always mean the situation changes quickly. Sometimes rescue has a waiting room.",
    ],
    truths: [
      "⚖️ Sin's judgment is severe.\nGenesis 7 does not let us treat evil lightly. The flood shows that corruption and violence matter to God.\nThis is uncomfortable, but it is part of understanding God's holiness. A good God cannot be endlessly indifferent to a world destroying itself.",
      "🛟 The ark is the only refuge in the passage.\nThe mountains are covered, the land disappears, and every other place fails. The ark alone carries life through judgment.\nThat makes the ark a powerful picture of God-provided rescue. Safety comes from trusting the refuge God gives, not inventing our own.",
      "🌱 God preserves a remnant.\nOnly Noah and those with him remain. That sounds small, but it is enough for God to continue the story.\nThe Bible often works through a preserved remnant. God does not need the majority to keep His promise alive.",
      "⏳ Waiting can continue after rescue begins.\nNoah is safe, but the waters remain for 150 days. Rescue does not instantly become normal life.\nThis truth helps readers understand seasons where God has protected them, but they are still waiting for the next step. Waiting inside the ark is still part of faith.",
      "🕊️ Judgment and mercy stand together.\nGenesis 7 is severe, but it is not hopeless. The same flood that judges corruption also carries the ark.\nThis is the tension of the passage. God is holy enough to judge evil and merciful enough to preserve life for a new beginning.",
    ],
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_THREE_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

export function getBibleReaderStudySections(book: string | null | undefined, chapter: number | null | undefined) {
  const normalizedBook = normalizeBook(book);
  const chapterNumber = Number(chapter);
  return BIBLE_READER_STUDY_SECTIONS.filter(
    (section) => section.book === normalizedBook && section.chapter === chapterNumber,
  );
}
