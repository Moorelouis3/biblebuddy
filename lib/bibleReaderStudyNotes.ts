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
        id: "why-this-matters",
        icon: "❤️",
        title: "What This Means",
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
      chapter: 34,
      startVerse: 1,
      endVerse: 7,
      reference: "Genesis 34:1-7",
      title: "Dinah Is Violated",
      icon: "⚠️",
      summary: "Dinah is harmed by Shechem, and Jacob's household is pulled into a painful crisis.",
      movement: ["👧 Dinah goes out to see the women of the land.", "⚠️ Shechem takes and violates her.", "💬 Shechem speaks tenderly but does not erase the harm.", "😡 Jacob's sons are grieved and furious."],
      phrases: [["👧 Dinah", "Dinah is Jacob and Leah's daughter. Genesis names her because her suffering matters, not because she is a side detail."], ["⚠️ Took Her", "The wording is forceful and painful. The Bible is showing violation, not a harmless romance."], ["💔 Wrought Folly In Israel", "This phrase means a disgraceful evil has been done among God's covenant people. It names the act morally, not casually."]],
      truths: [["⚠️ The Bible does not ignore harm.", "Genesis includes this painful chapter because God sees what happens to vulnerable people."], ["💔 Tender words cannot undo violation.", "Shechem's later affection does not make his action righteous."], ["😡 Anger over injustice is understandable.", "Jacob's sons are furious because a real wrong has happened. The question becomes what they will do with that anger."]],
      application: ["⚠️ Do not minimize harm because the story is uncomfortable.", "💔 Let truth name wrong clearly.", "😡 Bring anger under God's wisdom before it becomes destructive.", "👧 Remember that people wounded in the story are not footnotes."],
    }),
    makeCompactGenesisStudySection({
      chapter: 34,
      startVerse: 8,
      endVerse: 24,
      reference: "Genesis 34:8-24",
      title: "A Covenant Sign Is Misused",
      icon: "🔪",
      summary: "Jacob's sons use circumcision as a deceptive condition for alliance with Shechem's city.",
      movement: ["🤝 Hamor asks for intermarriage and trade.", "🗣️ Shechem offers bride price and gifts.", "🔪 Jacob's sons demand circumcision.", "🏙️ The city agrees because they expect gain."],
      phrases: [["🤝 Make Marriages With Us", "Hamor wants the crisis turned into alliance. In the ancient world, marriages could join families, land, wealth, and protection."], ["💰 Ask Me Never So Much Dowry", "Shechem offers to pay heavily, but payment cannot purchase righteousness after harm."], ["🔪 Be Circumcised", "Circumcision was the covenant sign given to Abraham's family. Jacob's sons twist a holy sign into a trap."]],
      truths: [["🔪 Sacred things can be misused by angry hearts.", "A covenant sign becomes a weapon when separated from covenant faithfulness."], ["💰 Restitution cannot replace repentance.", "Money and gifts do not automatically heal what was done."], ["🏙️ Self-interest can blind whole communities.", "The men of Shechem agree partly because they expect Jacob's wealth to become theirs."]],
      application: ["🔪 Do not use spiritual language as a cover for revenge.", "💰 Do not confuse payment with true repair.", "🏙️ Watch how self-interest can make people approve what they should question.", "🤝 Seek justice without corrupting what belongs to God."],
    }),
    makeCompactGenesisStudySection({
      chapter: 34,
      startVerse: 25,
      endVerse: 31,
      reference: "Genesis 34:25-31",
      title: "Simeon And Levi Take Revenge",
      icon: "⚔️",
      summary: "Simeon and Levi answer evil with deception and violence, leaving Jacob afraid of wider consequences.",
      movement: ["⚔️ Simeon and Levi attack the weakened city.", "🏙️ The men are killed.", "💰 The brothers plunder the city.", "😨 Jacob fears retaliation.", "🗣️ The brothers answer with Dinah's dishonor."],
      phrases: [["⚔️ Slew All The Males", "Their anger is connected to a real wrong, but the response becomes excessive and devastating."], ["💰 Spoiled The City", "The revenge expands into plunder. The brothers take wealth, livestock, women, and children."], ["😨 Ye Have Troubled Me", "Jacob sees the danger of retaliation from surrounding peoples. His concern is survival, but the moral damage is also serious."]],
      truths: [["⚔️ Revenge can multiply evil.", "Simeon and Levi respond to wickedness, but their method spreads more violence."], ["😡 Anger needs righteousness, not just intensity.", "Being angry about a real wrong does not make every response right."], ["🧬 Family damage can shape future generations.", "This moment will be remembered later when Jacob speaks over Simeon and Levi in Genesis 49."]],
      application: ["⚔️ Refuse revenge that becomes its own evil.", "😡 Ask God to govern anger before anger governs you.", "🧬 Remember that today's reactions can become tomorrow's family legacy.", "💔 Care about justice and holiness together."],
    }),
    makeCompactGenesisStudySection({
      chapter: 35,
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 35:1-8",
      title: "Jacob Returns To Bethel",
      icon: "🏠",
      summary: "God calls Jacob back to Bethel, and Jacob leads his household to put away idols.",
      movement: ["🧭 God tells Jacob to go to Bethel.", "🧺 Jacob calls the household to put away strange gods.", "🌳 The idols are buried under an oak.", "🛡️ God protects Jacob's family as they travel."],
      phrases: [["🏠 Go Up To Bethel", "Bethel is where God met Jacob when he was running from Esau. Returning there is a spiritual reset."], ["🧺 Put Away The Strange Gods", "Jacob's household has carried idols even while walking in the covenant story. Renewal requires dealing with hidden loyalties."], ["🛡️ The Terror Of God", "God protects the family from surrounding cities after the violence of Genesis 34. Jacob's safety comes from God, not from his sons' strength."]],
      truths: [["🏠 God calls His people back to places of worship.", "After a dark chapter, God does not abandon Jacob. He redirects him."], ["🧺 Renewal involves removal.", "The household cannot simply add worship while keeping idols."], ["🛡️ God can protect even after messy failure.", "Jacob's family is vulnerable, but God restrains the surrounding cities."]],
      application: ["🏠 Return to worship when life has become chaotic.", "🧺 Bury what competes with God.", "🛡️ Trust God's protection more than human intimidation.", "🧭 Let God redirect you after painful chapters."],
    }),
    makeCompactGenesisStudySection({
      chapter: 35,
      startVerse: 9,
      endVerse: 15,
      reference: "Genesis 35:9-15",
      title: "God Renews Jacob's Name",
      icon: "✨",
      summary: "God repeats Jacob's new name and renews the covenant promise at Bethel.",
      movement: ["✨ God appears to Jacob again.", "🏷️ God repeats the name Israel.", "🌱 God promises fruitfulness, nations, kings, and land.", "🪨 Jacob sets up a pillar and worships."],
      phrases: [["🏷️ Thy Name Shall Not Be Called Any More Jacob", "God repeats the name change from Genesis 32. Jacob's identity is not built on old grasping but on God's transforming word."], ["👑 Kings Shall Come Out Of Thy Loins", "The promise looks beyond Jacob's immediate family toward future royal lines."], ["🪨 A Pillar Of Stone", "Jacob marks the place where God spoke. Worship creates memory so the promise is not forgotten."]],
      truths: [["✨ God reaffirms identity.", "Jacob needs the name Israel repeated after family chaos and grief."], ["🌱 God's promise outlives the current mess.", "Nations, kings, and land are still promised even though the family is deeply imperfect."], ["🪨 Worship helps remember what God said.", "Jacob marks Bethel because God's word needs to be carried forward."]],
      application: ["✨ Let God repeat truth over you when life shakes you.", "🌱 Do not measure God's promise only by today's family chaos.", "🪨 Build habits that help you remember God's word.", "🏷️ Live from the name God gives, not only the pattern you came from."],
    }),
    makeCompactGenesisStudySection({
      chapter: 35,
      startVerse: 16,
      endVerse: 29,
      reference: "Genesis 35:16-29",
      title: "Rachel Dies And Isaac Is Buried",
      icon: "💔",
      summary: "Jacob gains Benjamin, loses Rachel, faces more family sin, and buries Isaac with Esau.",
      movement: ["👶 Benjamin is born through hard labor.", "💔 Rachel dies on the way.", "⚠️ Reuben sins with Bilhah.", "👥 Jacob's sons are listed.", "⚰️ Isaac dies and is buried by Jacob and Esau."],
      phrases: [["👶 Ben-Oni And Benjamin", "Rachel names the child son of my sorrow, but Jacob calls him son of the right hand. The two names hold grief and future together."], ["⚠️ Reuben Went And Lay With Bilhah", "This is more than sexual sin; in the ancient family world it challenges honor and authority inside Jacob's household."], ["⚰️ Esau And Jacob Buried Him", "The brothers stand together at Isaac's burial. Their relationship is not simple, but the hatred of Genesis 27 is no longer the final scene."]],
      truths: [["💔 Promise does not remove grief.", "Bethel renewal is followed by Rachel's death. Faith and sorrow can sit close together."], ["⚠️ Sin inside the family still matters.", "Reuben's act will affect his future standing."], ["⚰️ Reconciliation can show up quietly.", "Jacob and Esau bury Isaac together after years of conflict."]],
      application: ["💔 Do not assume grief means God has stopped working.", "⚠️ Take hidden family sin seriously.", "⚰️ Notice small signs of healing, even when the story is not perfect.", "👶 Let God hold sorrow and future together."],
    }),
    makeCompactGenesisStudySection({
      chapter: 36,
      startVerse: 1,
      endVerse: 8,
      reference: "Genesis 36:1-8",
      title: "Esau Moves To Seir",
      icon: "🏔️",
      summary: "Esau's household grows, and he separates from Jacob because the land cannot hold both households.",
      movement: ["📜 Esau's generations are introduced.", "👨‍👩‍👧‍👦 His wives and children are named.", "🐪 His possessions are great.", "🏔️ Esau settles in Mount Seir."],
      phrases: [["📜 Esau, Who Is Edom", "Genesis connects Esau with Edom because his descendants become the Edomites, a later people group connected to Israel's history."], ["🐪 Their Riches Were More Than That They Might Dwell Together", "The separation is practical. Both brothers have become too large to share the same space."], ["🏔️ Mount Seir", "Seir becomes Esau's settled territory. The family conflict is becoming geography."]],
      truths: [["📜 God remembers more than the main covenant line.", "Esau is not the chosen heir, but his story is still recorded."], ["🏔️ Separation can become part of history.", "Jacob and Esau part into different territories and peoples."], ["🐪 Blessing can create new limits.", "Their growth means they can no longer live together in the same land."]],
      application: ["📜 Do not skip genealogies; they often explain later Bible history.", "🏔️ Accept that some peaceful separations still matter.", "🐪 Recognize when growth requires new boundaries.", "🧭 Watch how family stories become larger histories."],
    }),
    makeCompactGenesisStudySection({
      chapter: 36,
      startVerse: 9,
      endVerse: 43,
      reference: "Genesis 36:9-43",
      title: "Edom Becomes A People",
      icon: "📜",
      summary: "Esau's descendants become chiefs and kings, preparing the later story of Edom and Israel.",
      movement: ["👥 Esau's descendants are listed.", "🏕️ Chiefs and clans develop.", "👑 Kings are named before Israel has kings.", "📍 The chapter closes with Edom's chiefs by place and family."],
      phrases: [["🏕️ Dukes", "In the KJV, dukes means chiefs or clan leaders. This is political organization, not medieval royalty."], ["👑 Kings That Reigned In Edom", "Edom has kings before Israel does. Genesis is showing that Esau's line becomes organized and powerful."], ["📜 Father Of The Edomites", "The repeated label makes the main point clear: Esau becomes Edom, and Edom will matter later."]],
      truths: [["📜 Genealogy is theology with names.", "Genesis is showing how family lines become peoples in God's world."], ["👑 Power outside the covenant line is still real.", "Edom develops chiefs and kings while Jacob's family remains the covenant focus."], ["🧭 The Bible prepares future conflict early.", "Later Israel-Edom tension begins with family roots in Genesis."]],
      application: ["📜 Read names as part of the story, not as filler.", "👑 Do not assume visible power equals covenant priority.", "🧭 Let Genesis teach you the backstory before later Bible conflicts appear.", "🌍 Remember that God sees every nation, even when the main promise follows one line."],
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

BIBLE_READER_STUDY_SECTIONS.push(
  ...[
    makeCompactGenesisStudySection({
      chapter: 32,
      startVerse: 1,
      endVerse: 2,
      reference: "Genesis 32:1-2",
      title: "Jacob Meets God's Messengers",
      icon: "👼",
      summary: "Jacob sees God's messengers as he re-enters the land and moves toward Esau.",
      movement: ["👼 God's messengers meet Jacob.", "🏕️ Jacob names the place Mahanaim.", "🛡️ God's camp is present before Jacob faces Esau."],
      phrases: [["👼 Angels Of God", "Jacob is reminded that he is not traveling alone."], ["🏕️ Mahanaim", "The name means two camps."], ["🛣️ Met Him", "God's messengers meet Jacob before Jacob meets Esau."]],
      truths: [["👼 God meets His people before fear does.", "Jacob sees God's messengers before hearing the next threat."], ["🏕️ There is more than one camp in the story.", "Jacob's camp is not the only presence on the road."], ["🛡️ God's protection can be unseen before it is understood.", "Jacob is being guarded before he fully grasps it."]],
      application: ["👼 Remember that God may already be ahead of the hard meeting.", "🏕️ Look for God's presence before counting threats.", "🛡️ Let God's unseen care steady visible fear."],
    }),
    makeCompactGenesisStudySection({
      chapter: 32,
      startVerse: 3,
      endVerse: 8,
      reference: "Genesis 32:3-8",
      title: "Jacob Hears Esau Is Coming",
      icon: "⚠️",
      summary: "Jacob sends messengers to Esau and becomes afraid when he hears Esau is coming with four hundred men.",
      movement: ["📨 Jacob sends messengers.", "⚠️ Esau comes with four hundred men.", "😨 Jacob is afraid.", "🏕️ Jacob divides the camp."],
      phrases: [["📨 My Lord Esau", "Jacob speaks humbly to the brother he wronged."], ["⚠️ Four Hundred Men", "The number sounds like a fighting force."], ["😨 Greatly Afraid", "Jacob's old wound becomes present fear."]],
      truths: [["😨 Fear can return when old wounds are ahead.", "Jacob has left Laban but must still face Esau."], ["🧠 Planning is not wrong, but fear can drive it.", "Jacob divides the camp for survival."], ["📨 Humility matters when facing someone you wronged.", "Jacob approaches Esau as servant, not rival."]],
      application: ["😨 Bring old fear into the open.", "🧠 Plan wisely without letting fear rule.", "📨 Approach wounded relationships with humility."],
    }),
    makeCompactGenesisStudySection({
      chapter: 32,
      startVerse: 9,
      endVerse: 12,
      reference: "Genesis 32:9-12",
      title: "Jacob Prays The Promise Back To God",
      icon: "🙏",
      summary: "Jacob brings fear to God and anchors his prayer in God's promise.",
      movement: ["🙏 Jacob addresses God.", "🧎 He admits unworthiness.", "🛟 He asks for deliverance.", "📜 He remembers God's promise."],
      phrases: [["🙏 God Of My Father Abraham", "Jacob prays from the covenant story."], ["🧎 I Am Not Worthy", "Jacob speaks with humility."], ["📜 You Said", "Jacob prays God's promise back to Him."]],
      truths: [["🙏 Prayer brings fear under God's word.", "Jacob is afraid and prays anyway."], ["🧎 Humility strengthens prayer.", "Jacob does not bargain from entitlement."], ["📜 God's promises give prayer language.", "Jacob repeats what God already said."]],
      application: ["🙏 Pray honestly from inside fear.", "🧎 Let gratitude humble you.", "📜 Use God's promises as anchors in prayer."],
    }),
    makeCompactGenesisStudySection({
      chapter: 32,
      startVerse: 13,
      endVerse: 21,
      reference: "Genesis 32:13-21",
      title: "Jacob Sends Gifts Ahead",
      icon: "🎁",
      summary: "Jacob sends waves of gifts to Esau, hoping to soften the meeting before they come face to face.",
      movement: ["🎁 Jacob prepares a large gift.", "🐐 The animals are sent in waves.", "🙂 Jacob hopes to appease Esau's face.", "🌙 Jacob spends the night in the camp."],
      phrases: [["🎁 A Present For Esau", "The gift is meant to repair the relationship."], ["🙂 Appease His Face", "Jacob wants Esau's anger softened before the meeting."], ["👀 Face", "The word prepares for Jacob seeing God's face and Esau's face."]],
      truths: [["🎁 Repair can require costly humility.", "Jacob does not come empty-handed."], ["🧠 Strategy cannot replace transformation.", "Jacob plans, but God will still meet him in the night."], ["👀 Faces matter in reconciliation.", "Jacob must face both God and Esau."]],
      application: ["🎁 Consider what repair may cost.", "🧠 Do your part, but do not trust strategy more than God.", "👀 Do not avoid every face you fear."],
    }),
    makeCompactGenesisStudySection({
      chapter: 32,
      startVerse: 22,
      endVerse: 32,
      reference: "Genesis 32:22-32",
      title: "Jacob Wrestles Through The Night",
      icon: "🤼",
      summary: "Jacob wrestles, is wounded, receives blessing, and is renamed Israel.",
      movement: ["🌙 Jacob is left alone.", "🤼 A man wrestles him until daybreak.", "🦵 Jacob's hip is touched.", "🏷️ Jacob is renamed Israel.", "🌅 Jacob limps away blessed."],
      phrases: [["🤼 Wrestled", "Jacob's inner struggle becomes physical."], ["🏷️ Israel", "Jacob receives a new name."], ["🦵 Limped", "The blessing leaves him marked by weakness."]],
      truths: [["🤼 God meets Jacob in struggle.", "The night becomes transformation."], ["🏷️ God can rename a person beyond their old pattern.", "Jacob is no longer only Jacob."], ["🦵 Blessing can leave a limp.", "Weakness and blessing travel together."]],
      application: ["🤼 Do not assume struggle means God is absent.", "🏷️ Let God tell you who you are becoming.", "🦵 Do not despise the limp that came with blessing."],
    }),
    makeCompactGenesisStudySection({
      chapter: 33,
      startVerse: 1,
      endVerse: 11,
      reference: "Genesis 33:1-11",
      title: "Jacob And Esau Meet",
      icon: "🤝",
      summary: "Jacob meets Esau, and the feared confrontation becomes a surprising moment of mercy.",
      movement: ["👀 Jacob sees Esau.", "🙇 Jacob bows seven times.", "🤝 Esau runs and embraces him.", "😭 The brothers weep.", "🎁 Esau accepts the gift."],
      phrases: [["🙇 Bowed Seven Times", "Jacob approaches with humility."], ["🤝 Esau Ran", "Esau's response surprises Jacob."], ["👀 Face Of God", "Jacob recognizes mercy in Esau's face."]],
      truths: [["🕊️ Mercy can surprise fear.", "Esau is not what Jacob expected."], ["🙇 Humility helps reconciliation.", "Jacob comes low, not proud."], ["👀 Receiving grace changes how we see others.", "Jacob sees mercy in Esau's face."]],
      application: ["🕊️ Leave room for mercy to surprise you.", "🙇 Approach repair with humility.", "👀 Notice grace when it comes through a person you feared."],
    }),
    makeCompactGenesisStudySection({
      chapter: 33,
      startVerse: 12,
      endVerse: 17,
      reference: "Genesis 33:12-17",
      title: "Jacob Moves Carefully",
      icon: "🛣️",
      summary: "Jacob and Esau part ways peacefully, and Jacob moves at the pace of his household.",
      movement: ["🛣️ Esau offers to travel together.", "🐑 Jacob asks to move slowly.", "👋 Esau returns to Seir.", "🏕️ Jacob goes to Succoth."],
      phrases: [["🐑 The Flocks And Herds Are Nursing", "Jacob considers the vulnerable pace of his household."], ["🛣️ Lead On Slowly", "Jacob chooses careful movement."], ["🏕️ Succoth", "Jacob builds booths and pauses."]],
      truths: [["🐑 Wise leadership considers the vulnerable.", "Jacob will not drive the household too hard."], ["🕊️ Peace does not always require immediate closeness.", "The brothers part without revenge."], ["🏕️ Moving forward may still happen slowly.", "Jacob's journey continues by stages."]],
      application: ["🐑 Let care set the pace.", "🕊️ Do not force closeness faster than wisdom allows.", "🏕️ Give fragile peace room to breathe."],
    }),
    makeCompactGenesisStudySection({
      chapter: 33,
      startVerse: 18,
      endVerse: 20,
      reference: "Genesis 33:18-20",
      title: "Jacob Builds An Altar",
      icon: "🪨",
      summary: "Jacob arrives safely in the land and builds an altar to the God of Israel.",
      movement: ["🏠 Jacob comes safely to Shechem.", "📍 He buys a piece of land.", "🪨 He builds an altar.", "🙌 He names it El-Elohe-Israel."],
      phrases: [["🏠 Came Safely", "God kept the promise to bring Jacob back."], ["📍 Bought A Parcel Of A Field", "Jacob begins to have a foothold in the land."], ["🙌 El-Elohe-Israel", "The altar names God as the God of Israel."]],
      truths: [["🏠 God keeps return promises.", "Jacob comes safely after years away."], ["📍 Promise touches real land and life.", "Jacob buys a field."], ["🙌 New identity should lead to worship.", "Israel builds an altar to Israel's God."]],
      application: ["🏠 Thank God for safe arrivals.", "📍 Mark the places where promise becomes concrete.", "🙌 Let changed identity become worship."],
    }),
  ],
);

const DAY_THIRTEEN_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 32:1-2": {
    phrases: [
      "👼 Angels Of God Met Him\nJacob has just left Laban and is moving toward Esau, the brother he has feared for years. Before Jacob sees Esau's men, he sees God's messengers. That order matters. Genesis places divine presence before human threat.\nReading tip: angels in Genesis often appear at key transition points. Here they remind Jacob that the road home is not only filled with danger; it is also watched by heaven.",
      "🏕️ This Is God's Camp\nJacob names what he sees: God's camp. The word camp matters because Jacob himself is traveling with a vulnerable camp of wives, children, servants, and flocks. His camp is not the only camp in the story.\nThis is meant to steady the reader before fear rises. Jacob may feel exposed, but God's presence is already positioned on the road.",
      "🪧 Mahanaim\nMahanaim means two camps. The name becomes a memory marker for the place where Jacob saw that his visible camp was accompanied by God's unseen camp. It is a short name with a big message.\nThis will matter immediately because Jacob will soon divide his own people into two camps out of fear. Before Jacob divides his camp, God shows him another camp.",
      "🛣️ As Jacob Went On His Way\nJacob is not standing still; he is moving toward the hard meeting. God's messengers meet him while he is on the way, not after everything is resolved.\nThat is important because God's reassurance often comes in motion. Jacob must still face Esau, but he does not face that road without heavenly reminder.",
    ],
    truths: [
      "👼 God meets Jacob before the crisis fully appears.\nThe angels come before the report about Esau's four hundred men. God gives Jacob a sign of presence before the fear peaks.\nThis teaches that God often prepares His people before they know exactly what they will face.",
      "🏕️ There is an unseen camp around the visible camp.\nJacob has people, flocks, and fear. But God's camp is also present.\nGenesis trains readers to see more than visible numbers. The spiritual reality around Jacob is larger than what his eyes can count.",
      "🛣️ God's presence does not remove the road.\nJacob still has to meet Esau. The angels do not cancel the hard conversation.\nThis is mature comfort. God may reassure us before obedience, but we still have to walk into what He is leading us through.",
      "🪧 Naming places helps faith remember.\nJacob names the place Mahanaim so the encounter is not forgotten. The name preserves the lesson.\nFaith often needs memory markers because fear makes us forget what God has shown us.",
      "🛡️ Protection can be present before we feel safe.\nJacob is not calm yet, but God's messengers have already met him. Safety begins with God's presence, not Jacob's emotional state.\nThis helps readers who still feel afraid even after God has encouraged them.",
    ],
  },
  "Genesis 32:3-8": {
    phrases: [
      "📨 Jacob Sent Messengers Before Him\nJacob takes initiative before meeting Esau face to face. He does not simply walk into the conflict blindly. Sending messengers lets him communicate humility and learn Esau's posture.\nThis is practical wisdom. Faith does not mean ignoring relational damage. Jacob knows there is history here, and he approaches carefully.",
      "🙇 My Lord Esau...Your Servant Jacob\nJacob reverses the old rivalry language by calling Esau lord and himself servant. The younger brother who took the blessing now comes low. His words show fear, but also humility.\nThis matters because reconciliation often begins with a changed posture. Jacob cannot undo the past, but he can stop approaching Esau as a rival.",
      "🐂 I Have Oxen, Donkeys, Flocks, Servants\nJacob tells Esau he has wealth, but the message may also communicate that he is not coming to take anything from Esau. He is returning with his own household and goods.\nThis detail speaks into the old blessing conflict. Jacob is trying to show that he is not arriving to plunder or compete.",
      "⚠️ Esau Comes To Meet You With Four Hundred Men\nFour hundred men sounds like a fighting force. Genesis does not tell us Esau's motive yet, so the silence creates tension. Jacob only knows the number, not Esau's heart.\nThis is exactly how fear often works. It receives partial information and fills in the worst possible meaning.",
      "😨 Jacob Was Greatly Afraid And Distressed\nThe Bible does not hide Jacob's fear. He has God's promise, God's angels, and God's command to return, yet he is still terrified. Faith and fear are wrestling inside him before the night wrestling ever begins.\nThis honesty matters. Genesis does not shame Jacob for feeling fear; it shows what he does with it.",
      "🏕️ He Divided The People Into Two Camps\nJacob creates a survival plan. If Esau attacks one camp, the other may escape. This is strategy born from fear, but it is also protective leadership.\nThe irony is that Jacob names the place two camps after seeing God's camp, then divides his own camp in fear. The story holds divine reassurance and human anxiety together.",
    ],
    truths: [
      "🙇 Humility matters when facing someone we wronged.\nJacob approaches Esau as servant, not as a man entitled to easy peace. He lowers himself before the brother he deceived.\nThis is an important reconciliation lesson. Repair often begins by giving up the posture that helped create the wound.",
      "⚠️ Fear often interprets partial information negatively.\nJacob hears four hundred men and assumes danger. The report is real, but its meaning is not yet clear.\nThis teaches emotional wisdom. Fear may be responding to facts, but it often adds conclusions the facts have not proven.",
      "🧠 Planning is wise, but planning cannot save the heart from fear.\nJacob divides the camp to reduce loss. That is practical, but he is still distressed.\nStrategy has limits. It can prepare a situation, but it cannot provide the deep peace only God can give.",
      "🏕️ Human fear can forget divine reassurance quickly.\nJacob has just seen God's camp, yet he immediately divides his camp in fear. That is very human.\nGenesis shows that spiritual encouragement does not always erase anxiety instantly. Faith may need to keep returning to what God has shown.",
      "🛣️ Old wounds must eventually be faced.\nJacob escaped Laban, but Esau is ahead. The past has not disappeared.\nThis is one of Day 13's big movements. God brings Jacob back toward the relationship he has avoided for years.",
    ],
  },
  "Genesis 32:9-12": {
    phrases: [
      "🙏 God Of My Father Abraham And God Of My Father Isaac\nJacob prays from inside the covenant story. He calls on the God who has been faithful before him, not a new god he invented in panic. His prayer is rooted in family promise.\nThis matters because Jacob is learning to stand in the faith personally. The God of Abraham and Isaac is now the God Jacob must trust before Esau.",
      "🔙 Yahweh, Who Said To Me, Return\nJacob reminds God of God's own command. He returned because God told him to return. That gives his prayer weight: he is not asking God to bless random self-will; he is asking God to protect obedience.\nReading tip: this is a strong model of prayer. Jacob brings God's word back to God, not because God forgot, but because promise anchors faith.",
      "🧎 I Am Not Worthy Of The Least Of All The Mercies\nThis is one of Jacob's most humble lines. He admits that God's mercy and faithfulness have exceeded what he deserves. The former grasper is learning gratitude.\nThe phrase shows real growth. Jacob is not boasting about how clever he was with Laban. He knows he crossed the Jordan with only a staff and now returns with two camps because God has been kind.",
      "🪵 With My Staff I Passed Over This Jordan\nJacob remembers how little he had when he left. A staff was the traveler's simple tool. He was alone, vulnerable, and empty-handed.\nNow he returns with family and possessions. This contrast helps him see grace. Memory becomes fuel for humility.",
      "🛟 Deliver Me From The Hand Of My Brother\nJacob names his fear directly. He does not hide behind vague religious words. He asks God to rescue him from Esau because he is afraid.\nThis is emotionally healthy prayer. Jacob does not pretend fear is gone; he brings fear to God and asks for help.",
      "📜 You Said, I Will Surely Do You Good\nJacob ends by repeating God's promise. He places fear under the word God already spoke. The promise about descendants becomes the anchor when Jacob imagines his family being destroyed.\nThis is what prayer does at its best: it brings the real fear and the real promise into the same room.",
    ],
    truths: [
      "🙏 Prayer can hold fear and faith together.\nJacob is terrified, but he prays. His fear does not stop him from turning to God.\nThis helps readers understand that prayer is not proof we feel calm. Prayer is bringing panic under God's presence and promise.",
      "📜 God's promises give language for prayer.\nJacob repeats what God said. He anchors his request in God's own word.\nThis is a powerful prayer practice. We do not pray from empty emotion only; we pray from what God has revealed.",
      "🧎 Humility grows from remembering mercy.\nJacob remembers crossing with only a staff and returning with two camps. He sees that God has been generous.\nGratitude lowers pride. The more Jacob remembers mercy, the less he can pretend he earned everything.",
      "🛟 Honest prayer names the actual fear.\nJacob asks to be delivered from Esau. He does not keep the fear vague.\nGod can handle specific fear. Naming it before Him is often the beginning of deeper trust.",
      "🔙 Obedience can still need protection.\nJacob is returning because God told him to, but obedience has led him toward danger. He still needs God to keep him.\nThis is important: being in God's will does not mean we stop depending on God's help.",
    ],
  },
  "Genesis 32:13-21": {
    phrases: [
      "🎁 A Present For Esau His Brother\nJacob prepares a massive gift from his flocks and herds. The gift is not random generosity; it is part humility, part restitution, part strategy, and part fear. He is trying to soften the meeting.\nReading tip: gifts in reconciliation can matter, but they cannot replace truth, humility, and changed posture. Jacob still has to face Esau.",
      "🐐 Goats, Sheep, Camels, Cows, Donkeys\nThe list of animals shows the size and seriousness of the gift. This is wealth on the move. Jacob is sending real value ahead of himself.\nThat matters because Jacob once took blessing through grasping. Now he is releasing possessions to the brother he wronged. His hands are opening, even if fear is still mixed in.",
      "🌊 Drove By Drove\nJacob spaces the gift in waves so Esau encounters generosity again and again before seeing Jacob. This is careful emotional strategy. Jacob knows the first impression may shape the meeting.\nThe detail shows Jacob's old strategic mind still working. But this time his strategy is not to steal; it is to survive and possibly repair.",
      "🙂 I Will Appease Him With The Present\nThe word appease can carry the idea of covering or pacifying anger. Jacob hopes the gift will turn Esau's face toward him favorably. He wants wrath softened before presence.\nThis phrase reveals both wisdom and fear. Jacob knows harm was done, but he is also trying to manage an outcome he cannot control.",
      "👀 Afterward I Will See His Face\nThe word face becomes a major thread. Jacob wants to see Esau's face peacefully, but first he will see God in the wrestling night. Genesis is preparing a face-to-face transformation.\nThat is an aha connection. Jacob thinks Esau's face is the main crisis, but God's face will become the deeper encounter.",
      "🌙 He Himself Stayed That Night In The Camp\nAfter sending the gift ahead, Jacob remains in the night. The external strategy is complete, but the internal struggle is not. The night becomes the doorway to wrestling.\nThis placement matters. Jacob can send gifts, divide camps, and plan speeches, but he cannot strategy his way around what God is about to do in him.",
    ],
    truths: [
      "🎁 Repair can require costly humility.\nJacob sends real wealth ahead to Esau. Reconciliation is not treated as cheap words only.\nThis teaches that repentance and repair may involve tangible acts, especially when past harm involved taking or grasping.",
      "🧠 Strategy has limits.\nJacob plans carefully, but the deepest change comes in the night with God. His planning cannot replace transformation.\nThis is a major Day 13 truth. We can prepare wisely, but God may still need to deal with us beneath our strategies.",
      "👀 Reconciliation requires facing the person.\nJacob wants to see Esau's face. The gifts go ahead, but Jacob must eventually show up.\nThis matters because avoidance can delay a wound, but it cannot heal it. At some point, faces matter.",
      "👐 The grasper is learning to release.\nJacob sends animals away instead of clutching everything for himself. His hands are opening.\nThis does not make him fearless or perfect, but it shows movement. God is changing the man who spent years grabbing.",
      "🌙 God may meet us after our plans run out.\nJacob stays in the camp at night after arranging everything he can arrange. Then comes the wrestling.\nThis teaches that God often addresses the person behind the plan, not only the situation outside them.",
    ],
  },
  "Genesis 32:22-32": {
    phrases: [
      "🌙 Jacob Was Left Alone\nJacob sends his family and possessions across the stream, and then he is alone. After years of movement, schemes, family conflict, and fear, the night strips everything down to Jacob before God.\nReading tip: this is the turning point of Jacob's life. Before he can face Esau in the morning, he must face God in the dark.",
      "🤼 A Man Wrestled With Him Until Daybreak\nThe mysterious man wrestles Jacob through the night. The passage begins with 'a man,' but Jacob later says he has seen God face to face. The identity is mysterious on purpose.\nThe wrestling fits Jacob's whole life. He has struggled in the womb, with Esau, with Isaac, with Laban, and now with God. His inner life becomes a physical struggle.",
      "🦵 He Touched The Socket Of His Hip\nThe touch disables Jacob. The mysterious wrestler can wound him with a touch, showing Jacob is not ultimately in control. The grasper is made weak.\nThis matters because the blessing will not come through Jacob overpowering God. It comes as Jacob clings in weakness.",
      "🤲 I Will Not Let You Go Unless You Bless Me\nJacob refuses to let go, but now his grasping has changed. Earlier he grabbed to take. Here he clings because he knows he needs blessing from the One greater than him.\nThis is one of the most human lines in Genesis. Jacob is wounded, desperate, and still holding on.",
      "🏷️ What Is Your Name\nThe question forces Jacob to say his name. He must say 'Jacob,' the name tied to heel-grabbing, striving, and supplanting. Before the new name comes, the old name is confessed.\nThat is powerful. Transformation begins with truth. Jacob cannot receive Israel without first naming Jacob.",
      "🇮🇱 Israel\nIsrael is connected with struggling with God. Jacob's new name does not erase struggle; it redefines him through encounter with God. His identity is no longer only deceiver or grasper.\nThe name will become the name of the nation. Israel begins as a wounded man who wrestled with God and lived.",
      "👀 Peniel\nJacob names the place Peniel because he says he has seen God face to face and his life was preserved. The feared face of Esau is coming, but first Jacob meets the face of God.\nThis makes Genesis 33 deeper. When Jacob later sees mercy in Esau's face, he has already survived the face of God.",
      "🦯 He Limped Because Of His Hip\nJacob leaves blessed, renamed, and limping. The limp is not a failure of the blessing; it is part of the blessing's mark. Jacob's future walk carries memory of the night God changed him.\nThis is one of Genesis's greatest images: God blesses Jacob, but Jacob does not walk away untouched.",
    ],
    truths: [
      "🌙 God meets Jacob in the lonely night.\nJacob is alone when the wrestling begins. The deepest work happens away from the crowd.\nThis teaches that God may deal with a person beneath all their roles, possessions, and strategies. Jacob must become honest before God before facing Esau.",
      "🤼 Struggle is not always absence of God.\nJacob wrestles the mysterious man and later says he has seen God. The struggle itself becomes encounter.\nThis is a deep truth. Some nights that feel like conflict may also be places where God is transforming us.",
      "🏷️ Transformation requires truth about the old name.\nJacob must say his name before he receives a new one. He has to face who he has been.\nGod does not rename Jacob by pretending the past did not happen. He brings the truth into the light and then speaks a new identity.",
      "🦵 Blessing can come with weakness.\nJacob receives a new name and a limp. The weakness is not removed from the story.\nThis teaches that God's blessing is not always making us look stronger. Sometimes He blesses us in a way that makes dependence permanent.",
      "👀 Seeing God changes how Jacob faces people.\nJacob sees God face to face before seeing Esau. That order matters.\nThe vertical encounter prepares him for the horizontal reconciliation. God deals with Jacob before Jacob meets the brother he fears.",
    ],
  },
  "Genesis 33:1-11": {
    phrases: [
      "👀 Jacob Lifted Up His Eyes And Looked\nJacob finally sees Esau coming. The feared moment is no longer imagination; it is in front of him. He cannot avoid the face he has been preparing to meet.\nReading tip: Genesis has been building toward this sight. Jacob saw angels, prayed, sent gifts, wrestled with God, and now lifts his eyes to see his brother.",
      "🙇 Bowed Himself To The Ground Seven Times\nJacob approaches Esau with deep humility. Bowing seven times was an extreme gesture of honor and submission in the ancient world. Jacob is not coming as a rival demanding status.\nThis posture matters because the old conflict involved grasping for priority. Jacob now comes low before the brother he wronged.",
      "🏃 Esau Ran To Meet Him\nEsau's running is the great surprise of the scene. Jacob expected danger, but Esau runs with embrace. The brother feared as a threat becomes the brother who moves toward him with mercy.\nThis does not erase the past, but it changes the meeting. Genesis lets mercy interrupt fear.",
      "🤝 Embraced Him, Fell On His Neck, Kissed Him\nThe physical language is full of reconciliation: embrace, neck, kiss, weeping. This is not the posture of attack. It is a family reunion beyond what Jacob expected.\nThe scene echoes later biblical reconciliation moments, including the emotional language of forgiveness and return. It is one of Genesis's tenderest reversals.",
      "👨‍👩‍👧 Who Are These With You\nEsau sees Jacob's family, the living evidence of the years away. The conflict that began before Jacob's exile now meets the household that formed during that exile.\nThis question slows the scene down. Reconciliation is not only between two brothers; families and futures are standing there too.",
      "🎁 What Do You Mean By All This Company\nEsau asks about the gift Jacob sent. Jacob explains it was to find favor. The gift now becomes part of a face-to-face conversation, not a substitute for it.\nThis matters because repair cannot remain anonymous. The gift opened the way, but Jacob still has to speak.",
      "👀 I Have Seen Your Face As One Sees The Face Of God\nJacob is not saying Esau is God. He is saying Esau's gracious reception felt like mercy after judgment. The face he feared became a face of grace.\nThis line connects directly to Peniel. Jacob saw God's face and lived; now he sees Esau's face and is received.",
      "🙌 Please Accept My Blessing\nJacob calls the gift a blessing. This word matters because Jacob once took blessing from Esau. Now he gives blessing toward Esau.\nThe reversal is beautiful. The taker becomes a giver. The man who grasped now presses a gift into his brother's hands.",
    ],
    truths: [
      "🕊️ Mercy can surprise fear.\nJacob expected possible violence, but Esau runs, embraces, kisses, and weeps. The meeting becomes mercy, not revenge.\nThis teaches that fear's predictions are not always prophecy. God can prepare a face of grace where we expected judgment.",
      "🙇 Humility helps repair what pride damaged.\nJacob bows repeatedly before Esau. He approaches low, not demanding.\nReconciliation does not begin with self-defense. Jacob's posture shows that he knows the old wound matters.",
      "🎁 The taker becomes a giver.\nJacob once took blessing from Esau. Now he urges Esau to receive a blessing from him.\nThis is a sign of transformation. Jacob's hands are no longer only grasping; they are giving.",
      "👀 Reconciliation happens face to face.\nJacob's gifts went ahead, but the healing moment happens when the brothers see each other. Faces matter.\nThis reminds readers that repair often requires presence. Messages and gifts can help, but they cannot fully replace encounter.",
      "😭 Grace can release grief.\nThe brothers weep. Years of fear, anger, and distance break open in a surprising embrace.\nGenesis shows that mercy is not emotionless. Reconciliation can touch deep places words alone cannot reach.",
    ],
  },
  "Genesis 33:12-17": {
    phrases: [
      "🛣️ Let Us Take Our Journey\nEsau offers to travel with Jacob. After the fear of attack, this offer sounds generous. But Jacob does not immediately merge his household with Esau's company.\nReading tip: reconciliation has happened, but wisdom is still needed. Peace does not mean every boundary disappears instantly.",
      "🐑 The Children Are Tender, And The Flocks And Herds Are Nursing\nJacob explains the vulnerable condition of his household. Children and nursing animals cannot be driven hard. A leader must pace the journey according to the weakest members.\nThis is practical and pastoral. Jacob is learning to lead with care, not only survival strategy.",
      "⚠️ If They Overdrive Them One Day, All The Flocks Will Die\nJacob knows that moving too fast can destroy what has been preserved. Speed is not always faithfulness. Sometimes going slower is the wise way to protect life.\nThis phrase is a leadership lesson hiding in travel details. The pace must fit the people and animals entrusted to him.",
      "🚶 I Will Lead On Slowly\nJacob chooses a careful pace. The Hebrew idea includes gentleness or slow guidance. He is not trying to prove strength by moving fast.\nThis matters after the wrestling night. Jacob now limps, and his household is tender. The journey forward must honor weakness.",
      "👋 Esau Returned That Day To Seir\nThe brothers part peacefully. Esau goes his way, and Jacob goes his. This is not full household reunion, but it is no longer revenge.\nThat is a realistic ending. Reconciliation may remove hostility without creating immediate closeness or shared life.",
      "🏕️ Jacob Journeyed To Succoth\nSuccoth means booths or shelters. Jacob builds booths for his livestock, giving the place its name. The man who fled and wrestled now pauses to shelter what is his.\nThis is a gentle landing after intense chapters. Jacob is learning to preserve life under his care.",
    ],
    truths: [
      "🐑 Wise leadership moves at the pace of the vulnerable.\nJacob considers children and nursing flocks. He refuses to drive them too hard.\nThis is a beautiful leadership truth. The strongest do not get to set the only pace when vulnerable lives are involved.",
      "🕊️ Peace does not always require instant closeness.\nJacob and Esau part ways without violence. They are reconciled enough to separate peacefully.\nThis helps readers with real relationships. Some peace is genuine even when boundaries remain.",
      "🚶 Slow can be faithful.\nJacob says he will lead slowly. That is not weakness; it is care.\nIn a world that praises speed, Genesis shows that wise movement protects what God has entrusted to us.",
      "🦵 Weakness can reshape leadership.\nJacob has just been wounded, and now he speaks about gentle pace. The limp may be teaching him how to lead differently.\nGod's work in us can change how we treat those who depend on us.",
      "🏕️ Shelter matters after conflict.\nJacob builds booths at Succoth. After fear, wrestling, and reconciliation, the household needs rest and protection.\nGenesis reminds us that recovery and shelter are part of the journey too.",
    ],
  },
  "Genesis 33:18-20": {
    phrases: [
      "🏠 Jacob Came Safely\nThis phrase fulfills God's promise at Bethel: God said He would keep Jacob and bring him back. Jacob left home with a staff; now he returns with family, flocks, wounds, and a new name.\nReading tip: safely does not mean untouched. Jacob is safe, but he limps. God's faithfulness brought him home through pain, not around it.",
      "📍 City Of Shechem In The Land Of Canaan\nJacob is back in the promised land. Shechem is a real place that will become important later in Genesis, especially in the painful events of Genesis 34.\nFor now, the location marks return. Jacob is no longer only on the road from Laban; he is in the land connected to the covenant.",
      "💰 He Bought The Parcel Of Ground\nJacob purchases land, like Abraham purchased Machpelah. Buying land creates a small legal foothold in the promise land. It is not full possession, but it is a concrete step.\nThis matters because God's promises often become visible in small pieces before full fulfillment. A parcel of ground can preach future hope.",
      "🪨 He Erected An Altar\nJacob builds an altar, just as Abraham and Isaac did. Worship marks the land and acknowledges the God who brought him back. The deceiver, wrestler, and reconciled brother now worships.\nThis is one of the signs that Jacob's identity is being reshaped. His story is not only escape; it is worship.",
      "🙌 El-Elohe-Israel\nThe altar name means God, the God of Israel. This is huge because Jacob's new name is now tied to worship. He is not only Jacob the grasper; he is Israel, and God is his God.\nThe name makes the identity shift public. The God who renamed him is now honored in the land.",
    ],
    truths: [
      "🏠 God keeps His return promise.\nJacob comes safely to Canaan after years away. Bethel's promise has not failed.\nThis teaches that God's faithfulness can span long, complicated chapters. He brings Jacob home through Laban, fear, wrestling, and reconciliation.",
      "🦵 Safe does not always mean unscarred.\nJacob arrives safely, but he is limping. God's protection did not mean the journey left no mark.\nThis is mature hope. God's faithfulness may preserve us while also changing us through wounds.",
      "📍 Promise becomes concrete in small places.\nJacob buys a parcel of ground. It is not the whole land, but it is real.\nFaith often receives foretastes before fullness. Small footholds can still testify to a large promise.",
      "🙌 New identity should lead to worship.\nJacob builds an altar called El-Elohe-Israel. His new name turns into praise.\nThe point of transformation is not self-improvement alone. It is deeper belonging to God.",
      "🪨 Worship marks the journey's mercy.\nThe altar says God brought Jacob through. It turns arrival into remembrance.\nGenesis keeps showing that people of promise build altars because they know they did not carry themselves.",
    ],
  },
};

const DAY_THIRTEEN_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 32:1-2": {
    phraseNote: "Reading tip: Mahanaim comes before the fear report. Genesis wants the reader to see God's camp before Jacob counts Esau's men.",
    truthNote: "This section teaches unseen reassurance. God may show His presence before He removes the situation that scares us.",
  },
  "Genesis 32:3-8": {
    phraseNote: "Reading tip: Jacob's humility is real, but his fear is real too. Genesis lets both sit together without forcing the scene to be simple.",
    truthNote: "This section teaches that old wounds can still shape present fear. Jacob needs more than a plan; he needs God to reshape him.",
  },
  "Genesis 32:9-12": {
    phraseNote: "Reading tip: Jacob's prayer has three anchors: God's identity, Jacob's humility, and God's promise. That is why this prayer is so strong.",
    truthNote: "This section teaches promise-shaped prayer. Jacob does not pray from confidence in himself; he prays from confidence in what God said.",
  },
  "Genesis 32:13-21": {
    phraseNote: "Reading tip: watch the word face. Jacob wants to appease Esau's face, then he will see God's face, then Esau's face. The repetition ties the whole day together.",
    truthNote: "This section teaches that repair takes more than strategy. Jacob sends gifts, but God still deals with Jacob himself in the night.",
  },
  "Genesis 32:22-32": {
    phraseNote: "Reading tip: Jacob has to say his old name before receiving his new name. The truth about who he has been comes before the blessing of who he is becoming.",
    truthNote: "This section teaches transformation through weakness. Jacob does not win by overpowering God; he prevails by clinging while wounded.",
  },
  "Genesis 33:1-11": {
    phraseNote: "Reading tip: Esau's embrace is the reversal Jacob never expected. The feared face becomes a place where Jacob recognizes grace.",
    truthNote: "This section teaches surprising mercy. God can prepare reconciliation in places where fear has imagined only judgment.",
  },
  "Genesis 33:12-17": {
    phraseNote: "Reading tip: this is not anticlimax. Jacob's slow pace shows care for children, nursing animals, and fragile peace.",
    truthNote: "This section teaches careful peace. Reconciliation may be real while still needing wisdom, boundaries, and a gentle pace.",
  },
  "Genesis 33:18-20": {
    phraseNote: "Reading tip: safely does not mean untouched. Jacob arrives in the land with a limp, a new name, and a testimony.",
    truthNote: "This section teaches arrival with worship. Jacob's journey ends this day not with self-congratulation, but with an altar to the God of Israel.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_THIRTEEN_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_THIRTEEN_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

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

const DAY_FOUR_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 8:1-5": {
    phrases: [
      "🧠 God Remembered Noah\nThis does not mean God forgot Noah and suddenly remembered him. In the Bible, when God remembers, it means He turns His covenant attention toward someone and acts for them. God remembered Noah, and then the waters began to go down.\nThat is important because Noah is still inside the ark when this is said. Nothing may look fully fixed yet, but God is already moving the story from judgment toward restoration.",
      "🌬️ God Made A Wind Pass Over The Earth\nThe word for wind can also connect with breath or spirit, which makes this line echo creation. In Genesis 1, God's Spirit hovered over the waters before order came. Here, after flood waters cover the earth, God sends wind and the waters begin to subside.\nThat is an aha moment: the flood story is not only destruction. It is also a kind of new creation scene, where God begins making the world livable again.",
      "🌊 The Waters Subsided\nThe waters do not vanish instantly. They recede in stages. Genesis slows the process down so the reader feels the waiting, the patience, and the gradual return of dry ground.\nThis matters because rescue in the Bible is not always instant. Noah is safe, but he is still waiting. The ark is floating, but the world is not ready yet.",
      "⛰️ The Ark Rested\nThe ark resting on the mountains of Ararat is the first major sign that the flood is moving toward its end. The word rested fits the larger Bible theme of rest after judgment, wandering, or labor.\nNoah cannot leave yet, but the ark is no longer drifting aimlessly. God has brought the refuge to a resting place, which means the next stage of restoration is beginning.",
      "👀 The Tops Of The Mountains Were Seen\nThe appearance of mountain tops is a visible sign that the covered world is reemerging. The highest places appear first, like creation slowly coming back into view.\nGenesis wants us to notice the order. First God remembers, then the wind moves, then the waters recede, then the ark rests, then land appears. Hope returns step by step.",
    ],
    truths: [
      "🕯️ God can be working before the situation looks solved.\nNoah is still in the ark when God remembers him. The waters are still present, but God's mercy has already begun moving.\nThis helps readers who are waiting. A situation can still look unfinished while God is already turning it toward restoration.",
      "🌱 The flood story includes new creation language.\nWind over waters, land reappearing, and life preparing to come out of the ark all echo Genesis 1. God is not merely ending a disaster; He is preparing a renewed world.\nThat teaches us to read Genesis 8 as restoration, not just survival.",
      "⏳ Restoration often happens in stages.\nThe waters recede slowly. The ark rests before Noah exits. Mountain tops appear before the ground is ready.\nGod's timing can include process. Slow restoration does not mean God is absent.",
      "🛟 Safety and waiting can happen at the same time.\nNoah is safe in the ark, but he is not free to walk on dry ground yet. That tension is real.\nSometimes God has truly preserved someone, but the next door has not opened yet. Genesis teaches patience inside protection.",
      "🤝 God keeps covenant attention on His people.\nGod remembering Noah shows faithful commitment. Noah is not forgotten inside the ark.\nThe same God who shut Noah in is the God who brings him through. Judgment does not erase God's care for those He preserves.",
    ],
  },
  "Genesis 8:6-12": {
    phrases: [
      "🪟 Noah Opened The Window\nNoah opens the window after many days, which shows him beginning to look for signs of a habitable world. He has been preserved, but he still needs wisdom about timing.\nThis little detail makes the story feel human. Noah is not pretending waiting is easy. He is watching carefully, trying to discern when the next step is actually ready.",
      "🐦 He Sent Out A Raven\nThe raven goes back and forth until the waters dry. Ravens can feed on a wider range of things, including carrion, so it makes sense that it could survive differently than the dove.\nThis is a practical detail, but it also shows Noah testing the condition of the earth. He is not rushing out because he is tired of waiting. He is paying attention to reality.",
      "🕊️ He Sent Out A Dove\nThe dove is different from the raven. It needs a place to rest and is a gentler sign of whether life has truly returned. When the dove finds no resting place, Noah knows the earth is not ready.\nThe dove becomes a picture of patient discernment. Sometimes the first sign we want is not the final answer we need.",
      "🌿 An Olive Leaf\nThe olive leaf is one of the first visible signs that plant life is returning. Olive trees are hardy, and in the biblical world olives later become connected with oil, provision, anointing, and peace.\nHere, the leaf is small but powerful. It tells Noah the waters are going down and the earth is beginning to produce life again.",
      "🗓️ He Waited Seven More Days\nNoah waits seven days more than once. That repeated waiting matters because he does not move simply because he is eager. He waits for confirmation.\nThe number seven often carries a sense of completion or ordered time in Genesis. Noah's waiting is not wasted time; it is disciplined trust.",
      "🙌 He Reached Out His Hand\nNoah brings the dove back into the ark when it has no place to rest. It is a tender moment inside a massive judgment story.\nThis detail reminds us that preservation includes care for creatures too. The ark is still a place of refuge until the world outside is ready for life.",
    ],
    truths: [
      "🧭 Faith pays attention.\nNoah sends birds, watches results, and waits. He is not passive, but he is not reckless either.\nThis teaches a balanced kind of faith. Trusting God does not mean ignoring signs, timing, wisdom, or reality.",
      "⏳ Waiting can be obedience.\nNoah has survived the flood, but he still waits. That waiting is part of his faithfulness.\nA lot of people think obedience only means moving. Sometimes obedience means staying until God makes the next step clear.",
      "🌿 Small signs can carry big hope.\nThe olive leaf is tiny compared with the flood, but it means the world is changing. It is proof that life is returning.\nGenesis teaches us not to despise small signs of renewal. A little leaf can preach hope after a world of water.",
      "🕊️ Restoration requires discernment.\nThe dove's first return means the earth is not ready. Later, the olive leaf means things are changing. Finally, the dove does not return.\nNoah learns in stages. Wisdom often comes by watching patiently, not forcing the timeline.",
      "🛶 The ark remains refuge until God opens the world again.\nEven when signs of life appear, Noah remains where God preserved him. He does not abandon refuge too early.\nThat matters because impatience can make people step out before the ground is ready. Noah waits for more than wishful thinking.",
    ],
  },
  "Genesis 8:13-19": {
    phrases: [
      "🌍 The Face Of The Ground Was Dry\nThe ground drying signals that the flood judgment is ending. This phrase echoes the creation story, where dry land appears after waters are gathered. Genesis is showing the earth becoming livable again.\nBut Noah still does not rush out immediately. Seeing dry ground is important, but Noah waits for God's word before stepping into the renewed world.",
      "👂 God Spoke To Noah\nThis is the real turning point. Noah leaves the ark because God tells him to go out. His life has been shaped by listening: build the ark, enter the ark, and now leave the ark.\nThat pattern matters. Noah is not guided mainly by panic, boredom, or impatience. He is guided by God's voice.",
      "🚪 Go Out Of The Ark\nThe command to leave is as important as the command to enter. The ark was the place of safety during judgment, but it was never meant to become Noah's permanent home.\nGod saves Noah for renewed life and responsibility. Rescue is not only about being kept from death; it is about being sent back into God's world.",
      "👨‍👩‍👦 You And Your Wife, Your Sons And Their Wives\nGenesis highlights the family leaving together. The future of humanity is being carried through this household. Noah's obedience affected more than himself.\nThis is a major Bible theme. God often works through families and generations, and one person's faithfulness can become shelter for others.",
      "🐾 Bring Out Every Living Thing\nThe animals leave with Noah because God's purpose includes creation. The flood judged a corrupt world, but it did not mean God was done with animals, land, and ordinary creaturely life.\nThis helps us see God's care for the whole created order. The renewed earth is not for humans alone; it is a world filled with living creatures.",
      "🌱 Be Fruitful And Multiply\nThis phrase reaches back to Genesis 1. After the flood, God restarts the creation blessing. Life is meant to spread again.\nThe world has been judged, but God's original purpose is not canceled. The blessing moves forward into a scarred but preserved creation.",
    ],
    truths: [
      "👂 Noah waits for God's word.\nEven after seeing dry ground, Noah does not leave until God speaks. That is a beautiful picture of disciplined trust.\nThe lesson is not fear. It is dependence. Noah has learned that life after judgment still needs God's direction.",
      "🚪 Rescue leads to mission.\nGod does not preserve Noah so he can stay in the ark forever. He sends him out into the world.\nThis matters because biblical rescue often leads into responsibility. Saved people are sent people.",
      "🌍 God renews His purposes after judgment.\nThe command to be fruitful and multiply echoes creation. God is continuing the calling He gave in the beginning.\nThe flood did not make God abandon creation. It made way for a renewed start under His mercy.",
      "🐾 Creation matters to God.\nAnimals are brought out to multiply on the earth. God preserves more than human survival.\nGenesis gives a large view of mercy. God's care reaches the living world He made, not just one family.",
      "🏠 Faithfulness can bless a household.\nNoah's family leaves the ark with him. His obedience has a wider impact.\nThis does not remove each person's responsibility before God, but it shows that faithfulness is rarely private in its effects.",
    ],
  },
  "Genesis 8:20-22": {
    phrases: [
      "🪨 Noah Built An Altar\nNoah's first recorded act after leaving the ark is worship. He builds an altar before he builds a house, a city, or a farm. That order tells us something about his heart.\nThe altar says rescue should lead to gratitude. Noah steps into a washed world and responds by honoring the God who preserved him.",
      "🔥 Burnt Offerings\nA burnt offering was completely offered up to God. The law of Moses has not been given yet, but sacrifice is already present as worship. Noah gives from the clean animals that God had preserved.\nThis shows that worship costs something. Noah is not just saying thank you with words; he offers something valuable from the life God carried through the flood.",
      "🌫️ Yahweh Smelled The Pleasant Aroma\nThis is picture language that helps us understand God's acceptance of Noah's worship. It does not mean God needed smoke. It means the sacrifice was pleasing to Him.\nThe phrase also prepares us for later sacrificial language in the Bible, where offerings are described as pleasing aromas when given in faith and obedience.",
      "🫀 The Imagination Of Man's Heart Is Evil From His Youth\nThis line is shocking because it comes after the flood. God knows the flood judged evil, but it did not erase sin from the human heart. Humanity's deepest problem remains internal.\nThat is an important theological point. The world can be washed on the outside while the heart still needs redemption on the inside.",
      "🌾 Seedtime And Harvest\nGod promises the regular rhythms of creation will continue. Planting and harvesting will not disappear. The world will have stability under God's mercy.\nThis promise matters because civilization depends on predictable seasons. Farming, food, family life, and human society all need God's sustaining faithfulness.",
      "🌗 Day And Night Shall Not Cease\nThis closes the promise with creation rhythm. Day and night continuing means God is upholding the world even though human hearts remain sinful.\nThat is mercy. God knows humanity is still broken, yet He commits to sustaining the world instead of destroying it again by flood.",
    ],
    truths: [
      "🙌 Worship is the right response to rescue.\nNoah leaves the ark and builds an altar. Gratitude becomes worship before anything else.\nThis teaches that deliverance should not make us self-focused. It should turn our attention back to the God who preserved us.",
      "🔥 True worship costs something.\nNoah offers clean animals, which were valuable in a world just beginning again. Worship is not treated as leftover religion.\nThe passage teaches that gratitude can become tangible. Love for God often shows up in what we give back to Him.",
      "🫀 The flood did not cure the human heart.\nGod says the imagination of the heart is evil from youth. That is after Noah's rescue.\nThis is one of the clearest reasons the Bible keeps moving forward. Humanity needs more than judgment; humanity needs inner transformation.",
      "🌍 God's mercy sustains the world.\nGod promises seasons, harvest, cold, heat, day, and night. This is common grace, the mercy that lets life continue.\nEvery ordinary sunrise is part of a world God is faithfully upholding, even while people still need redemption.",
      "🤝 God commits Himself to creation's stability.\nThe promise is not based on humanity becoming perfect. It is based on God's merciful decision.\nThat matters because our hope rests on God's faithfulness, not human reliability.",
    ],
  },
  "Genesis 9:1-7": {
    phrases: [
      "🌱 God Blessed Noah And His Sons\nThis blessing echoes Genesis 1. After the flood, God speaks fruitfulness over humanity again. The world has been judged, but God's original purpose for human life continues.\nThat is good news. God does not restart the world with suspicion only; He restarts it with blessing, calling, and responsibility.",
      "📈 Be Fruitful And Multiply\nThis command repeats the creation calling. Humanity is meant to fill the earth with life, families, culture, and stewardship. The flood has not canceled God's design.\nBut now this calling happens in a world that knows judgment. Multiplying life must not become multiplying violence again.",
      "🍖 Every Moving Thing Shall Be Food\nThis is a change from the earlier focus on plants for food in Genesis 1. God now gives animals as food, but He adds a boundary about blood. The permission is generous, but it is not careless.\nThat balance matters. The created world may be used, but it must still be treated under God's authority.",
      "🩸 You Shall Not Eat Flesh With Its Life, That Is, Its Blood\nBlood represents life in the Bible. This command teaches reverence for life even when animals are given as food. People may eat, but they must not treat life as meaningless.\nThis becomes a major biblical theme later, especially in the sacrificial system, where blood is connected with life, atonement, and belonging to God.",
      "⚖️ Whoever Sheds Man's Blood\nAfter a world filled with violence, God directly addresses murder. Human bloodshed is not treated as a small offense. It demands justice because it attacks a life made by God.\nThe point is not personal revenge. The point is that human life has sacred value, and the new world must not normalize the violence that ruined the old one.",
      "🪞 In The Image Of God\nThis phrase is the foundation for human dignity after the flood. Even after sin, judgment, and Noah's failure that will come later, human beings still bear God's image.\nThat means the value of human life is not based on strength, age, usefulness, race, wealth, or status. It is based on God's mark on humanity.",
    ],
    truths: [
      "🌱 God renews the creation blessing.\nGenesis 9 sounds like Genesis 1 because God is giving humanity a renewed start. Fruitfulness, life, and multiplication continue.\nThe flood judged corruption, but it did not erase God's desire for human life to flourish under His blessing.",
      "🩸 Life belongs to God.\nThe command about blood teaches reverence for life. People are not allowed to treat living creatures as if life is cheap.\nThis prepares readers for later biblical teaching about blood, sacrifice, and atonement. Life is sacred because God is the giver of life.",
      "🪞 Human dignity survives the fall and flood.\nGenesis 9 still says people are made in God's image. That is a massive truth.\nThe image of God is not lost because humans are sinful. It remains the reason murder is so serious and every human life must be honored.",
      "⚖️ Justice matters in the renewed world.\nGod addresses bloodshed because the old world was filled with violence. The new start must take human life seriously.\nThis teaches that mercy does not mean ignoring evil. A world under God's blessing must also care about justice.",
      "🎁 Permission still comes with boundaries.\nGod gives animals as food, but He also gives a command about blood. His generosity has moral shape.\nThat is a repeated Bible pattern. God's gifts are good, but they are meant to be received with reverence and obedience.",
    ],
  },
  "Genesis 9:8-17": {
    phrases: [
      "🤝 I Establish My Covenant\nGod establishes the covenant Himself. Noah receives it; he does not negotiate it. This covenant is God's commitment to preserve the world from another flood of this kind.\nThat matters because the promise rests on God's character. The stability of the world is not grounded in human goodness, but in divine mercy.",
      "👶 Your Descendants After You\nThe covenant reaches beyond Noah's lifetime. God is speaking to future generations who were not yet born. The promise is bigger than one man and one moment.\nThis helps us see how the Bible thinks generationally. God's mercy often covers people who will only understand the promise much later.",
      "🐾 Every Living Creature\nThe covenant includes animals too. Birds, livestock, and every creature from the ark are named. God's promise is creation-wide.\nThis is easy to miss because people often make the story only about Noah. Genesis says God's mercy is large enough to include the living world He made.",
      "🌈 My Bow In The Cloud\nThe rainbow is the sign of the covenant. The word bow can also refer to a battle bow, which makes the image powerful: the bow is set in the cloud, not aimed at the earth.\nWhether or not the reader catches that layer, the main point is clear. God gives a visible sign that storms do not mean He has abandoned His promise.",
      "☁️ When I Bring A Cloud\nGod does not promise there will never be storms again. He promises that the covenant sign will appear in the clouds. The rainbow is seen in the very place where fear might rise.\nThat is pastorally beautiful. God's reminder appears not in a cloudless sky, but in the middle of storm conditions.",
      "🧠 I Will Remember My Covenant\nAgain, remembering means covenant action and faithfulness, not God jogging His memory. The rainbow is a sign connected to God's promise.\nThis does not mean the rainbow is mainly for humans to remind God. It means God is revealing His faithful commitment in a way creation can see.",
      "🌊 Never Again Shall The Waters Become A Flood To Destroy All Flesh\nThis is the heart of the promise. God is not saying judgment will never happen in any form. He is saying the flood will not be repeated as a total destruction of all flesh.\nThis gives the post-flood world stability. Humanity can build, plant, marry, and live under the mercy of God's restraint.",
    ],
    truths: [
      "🤝 Covenant is God's committed promise.\nThe covenant begins with God's 'I establish.' That means the promise is anchored in Him.\nThis teaches readers that biblical hope is not wishful thinking. It rests on the God who binds Himself to His word.",
      "🌍 God's mercy reaches creation-wide.\nThe covenant includes Noah, his descendants, and every living creature. God's concern is bigger than one family.\nGenesis gives us a broad view of mercy. The Creator cares about the world He made.",
      "🌈 Signs help people remember promises.\nThe rainbow gives a visible marker of an invisible commitment. It turns a stormy sky into a reminder of mercy.\nGod knows people need tangible reminders. Biblical signs often help faith hold onto what God has said.",
      "☁️ God's promise stands inside storms.\nThe rainbow appears in clouds, not apart from them. That matters.\nThe sign does not deny storms. It tells us that storms do not cancel God's covenant faithfulness.",
      "🕊️ God restrains judgment so life can continue.\nThe covenant gives the world stability after the flood. Human hearts are still sinful, but God chooses not to destroy all flesh again by flood.\nThis restraint is mercy. It gives space for the story of redemption to keep moving.",
    ],
  },
  "Genesis 9:18-29": {
    phrases: [
      "🍇 Noah Began To Be A Farmer\nNoah moves from ark-builder to farmer. This is normal life restarting: soil, vines, work, harvest, and family. The renewed world is not just spiritual talk; it includes ordinary labor.\nBut the vineyard scene also reminds us that ordinary blessings can become places of failure. The ground is producing again, but the human heart is still vulnerable.",
      "🍷 He Drank Of The Wine And Was Drunk\nGenesis does not hide Noah's failure. The man who walked with God and survived the flood is still capable of sin. That honesty is part of the Bible's trustworthiness.\nThis line also proves the flood did not remove the problem inside humanity. The waters judged the world, but they did not wash sin out of the heart.",
      "🫣 Uncovered Inside His Tent\nNoah's nakedness echoes Eden in a sad way. After Adam and Eve sinned, nakedness was connected with shame and covering. Here, after the flood, shame appears again.\nGenesis is showing that the post-flood world is not a return to perfect Eden. Rescue has happened, but human brokenness is still present.",
      "👀 Ham Saw The Nakedness Of His Father\nThe issue is not merely that Ham accidentally noticed something. The passage suggests dishonor, exposure, and failure to protect his father's dignity. In the ancient world, honoring parents was deeply serious.\nHam's response contrasts with Shem and Japheth, who cover their father without looking. The difference is not information; it is honor.",
      "🧥 Shem And Japheth Took A Garment\nShem and Japheth act carefully and respectfully. They cover Noah while refusing to gaze on his shame. Their backward walking is the story's way of showing intentional honor.\nThis is a practical moment. Love does not expose shame for entertainment. Love protects dignity while still knowing wrong has happened.",
      "⚠️ Cursed Be Canaan\nThis curse has been horribly misused in history, especially to justify racism and slavery. The text curses Canaan, not all Hamites and not people of African descent. That must be said clearly.\nIn Genesis, Canaan matters because the Canaanites will later become a major people group in the promised land story. This is about a future biblical conflict line, not a license to oppress anyone.",
      "⚰️ Noah Died\nEven after rescue, altar, blessing, covenant, and long life, Noah dies. Genesis keeps telling the truth about death. Noah is important, but he is not the final Savior.\nHis death pushes the reader forward. The world needs someone greater than Noah, someone who can do more than survive judgment.",
    ],
    truths: [
      "🫀 The flood did not remove sin from the heart.\nNoah's drunkenness after the flood is sobering. Judgment has passed, but human weakness remains.\nThis is why Genesis must keep moving toward deeper redemption. Humanity needs more than a cleaned-up world; we need changed hearts.",
      "📖 The Bible tells the truth about its heroes.\nGenesis honors Noah's faith but does not hide his failure. That honesty matters.\nBiblical characters are not polished myths. They are real people who show both faith and weakness, which keeps our hope fixed on God, not flawless humans.",
      "🧥 Honor protects dignity.\nShem and Japheth cover Noah instead of exposing him. They respond to shame with care.\nThis does not mean pretending sin is fine. It means love does not use another person's weakness as entertainment, gossip, or power.",
      "⚠️ Scripture must not be twisted to support oppression.\nThe curse on Canaan has been misused, but the text does not curse all descendants of Ham or authorize racism.\nGood Bible reading pays attention to what the passage actually says. Misusing Scripture can create terrible harm.",
      "⚰️ Noah is not the final answer.\nNoah is righteous, obedient, and preserved, but he still sins and dies. Genesis does not let us stop with him.\nThe story keeps creating longing for a greater deliverer who can deal with sin at the heart level and defeat death itself.",
    ],
  },
  "Genesis 10:1-5": {
    phrases: [
      "🌍 The Generations Of The Sons Of Noah\nGenesis 10 is often called the Table of Nations. It traces peoples and places after the flood. This may look like a list, but it is actually a map of humanity spreading across the world.\nThe chapter matters because the Bible is showing where the nations come from. Before Genesis narrows to Abram, it first lets us see the wider human family.",
      "🧭 Shem, Ham, And Japheth\nNoah's three sons become the starting point for the post-flood nations. Their families will spread into different regions and become connected with names that appear later in the Bible.\nThis helps readers understand that Genesis is not only telling private family stories. It is explaining the shape of the world Israel will later live in.",
      "🏝️ Coastlands Of The Nations\nThis phrase likely points to distant maritime peoples and regions. It gives the sense of nations spreading outward, including lands across waters and far-off territories.\nFor ancient readers, this would have sounded like the edges of the known world. Genesis is saying the spread of humanity reaches far beyond one small location.",
      "🗣️ According To Their Languages\nLanguages are mentioned before the Babel story is told in Genesis 11. Genesis 10 gives the organized result, then Genesis 11 zooms in and explains how the scattering happened.\nThat is a helpful Bible-reading tip. Genesis does not always arrange material in strict modern timeline order; sometimes it gives the big picture first, then tells the key event behind it.",
      "👨‍👩‍👧 Families, Lands, Nations\nThese three words show the development from households to territories to peoples. Humanity is becoming organized into groups with identity, place, and language.\nThis matters because the Bible cares about peoples, not just isolated individuals. God's later promise to bless all families of the earth grows out of this kind of world.",
    ],
    truths: [
      "🌍 The nations are part of God's story.\nGenesis 10 shows that God sees the whole human family. The Bible narrows to Abram later, but it does not forget the nations.\nThis matters because God's plan for one family is ultimately meant to bless many families.",
      "📜 Genealogies can function like maps.\nThis chapter is not only listing names. It is showing peoples, places, languages, and future Bible connections.\nWhen readers slow down, they see Genesis building the world that later stories will happen inside.",
      "🧭 God knows people by family, place, and language.\nGenesis names lands and languages because embodied human life matters. People live somewhere, speak something, and belong to families.\nThe Bible's view of humanity is concrete, not abstract. God sees real peoples in real places.",
      "🔎 Genesis sometimes gives the overview before the explanation.\nGenesis 10 mentions languages and nations, while Genesis 11 explains Babel. That can confuse readers if they expect strict modern sequence.\nA helpful reading habit is to notice when the Bible zooms out, then zooms back in.",
      "🤝 The wide world prepares us for a global promise.\nThe Table of Nations comes before God's promise to Abram that all families of the earth will be blessed.\nThat order is meaningful. Genesis first shows the scattered families, then introduces the family through whom blessing will come.",
    ],
  },
  "Genesis 10:6-20": {
    phrases: [
      "🌍 Cush, Egypt, Put, And Canaan\nThese names become important later in the Bible. Egypt will become a place of both refuge and bondage. Canaan will become central to the promised land story. Cush and Put represent broader regions connected with the ancient world.\nGenesis is planting names that will matter later. The Bible often introduces people groups before their major role appears.",
      "💪 Nimrod\nNimrod is singled out as a mighty one on the earth. That makes him stand out in a genealogy where most names are simply listed. He represents power, reputation, and early kingdom-building.\nThe text does not give us every detail about him, but it wants us to notice him. His name is tied to cities and kingdoms that will echo through biblical history.",
      "🏹 Mighty Hunter Before Yahweh\nThis phrase can sound positive at first, but it may carry an edge. 'Before Yahweh' can mean in God's sight, but Nimrod's city-building connections include places that later symbolize pride and opposition to God.\nThe safest reading is to notice the complexity: Nimrod is impressive, but impressive power is not automatically righteous power. Genesis is making us pay attention to human greatness after the flood.",
      "🏙️ The Beginning Of His Kingdom Was Babel\nThis is the first clear kingdom language in Genesis. Babel appears before the tower story in Genesis 11, preparing the reader for a city associated with human pride and confusion.\nThat is a major Bible connection. Babel/Babylon will later become a symbol of human empire organized against God.",
      "🧱 Nineveh\nNineveh appears here as one of the great cities connected with this early world. Later, it becomes the capital associated with Assyria and the setting of Jonah's mission.\nThis is why Genesis 10 matters. Names that feel random now become huge later. The Bible is building a long memory.",
      "📍 The Border Of The Canaanites\nGenesis gives Canaan's borders because this land will matter deeply in the Abraham and Israel story. The promised land does not appear out of nowhere later; Genesis has already introduced its people and geography.\nThis helps readers connect the early chapters to the rest of the Bible. Genesis 10 is quietly setting the stage for covenant history.",
    ],
    truths: [
      "🏙️ Power appears quickly after the flood.\nKingdom language shows up not long after the renewed start. Humanity begins organizing cities, territories, and influence.\nThat can be good or dangerous depending on the heart. Genesis teaches that civilization needs righteousness, not just strength.",
      "💪 Being mighty is not the same as being godly.\nNimrod is impressive, but the passage does not tell us to equate impressive with righteous.\nThis is important in every age. The Bible teaches us to evaluate power by its relationship to God, not merely by size, fame, or success.",
      "🧭 Early names become later Bible themes.\nEgypt, Canaan, Babel, Nineveh, and the Philistines all matter later. Genesis is laying groundwork.\nReaders who slow down here will understand later stories better. The Bible often teaches through repeated names and places.",
      "⚠️ Human kingdoms can become centers of pride.\nBabel is connected with early kingdom-building and will soon become the tower city. Later Babylon becomes a major symbol of human arrogance.\nGenesis is preparing us to ask whether human organization is serving God or trying to replace dependence on Him.",
      "📍 Geography matters in the promise story.\nCanaan's borders are named because the land will become central to Abraham's descendants.\nThe Bible's promises are not floating ideas. They unfold in real places, among real peoples, with real historical tensions.",
    ],
  },
  "Genesis 10:21-32": {
    phrases: [
      "🧬 Shem\nShem's line matters because Genesis will move from Shem toward Abram. The story is narrowing again. After showing many nations, Genesis begins guiding the reader toward the covenant line.\nThis does not mean the other nations do not matter. It means God will choose one line for the sake of blessing all the families introduced in this chapter.",
      "👴 The Elder Brother Of Japheth\nThis family note helps locate Shem among Noah's sons. Genesis is careful with family relationships because the promise story moves through families.\nThese details may feel small, but they remind us that God's work happens through real households, births, brothers, and generations.",
      "🏘️ All The Children Of Eber\nEber is important because his name is connected with the later term Hebrew. Genesis is moving the reader toward the family identity that will become central in the Abraham story.\nThis is one of those quiet aha details. The name may not feel big yet, but it becomes part of the background for Israel's identity later.",
      "✂️ In His Days The Earth Was Divided\nPeleg's name is connected with division. This likely prepares the reader for Babel, where humanity is divided by language and scattered over the earth.\nGenesis 10 gives the family map, and Genesis 11 explains the major event behind the scattering. The division is not just geography; it is part of the story of human pride and God's intervention.",
      "🗣️ By Their Families, Languages, Lands, And Nations\nThe repeated categories show humanity organized after the flood. Families become peoples with languages and lands. This is the world stage for the rest of Genesis.\nThe repetition also makes the reader feel the breadth of humanity. God's promise will not unfold in a tiny vacuum; it will unfold among nations.",
      "🌎 From These The Nations Spread Abroad\nThis closes the Table of Nations. Humanity spreads after the flood, just as God commanded. But the next chapter will show that this spread involved judgment at Babel too.\nThat tension matters. People are filling the earth, but not always from pure obedience. God can still move His purpose forward even through human failure.",
    ],
    truths: [
      "🧬 The promise line is narrowing toward Abram.\nShem's genealogy prepares the way for Genesis 11 and 12. The camera is moving from all nations toward one family.\nThat narrowing is not favoritism without purpose. God will choose Abram's line to bring blessing back to the nations.",
      "🌍 God cares about both the many and the one.\nGenesis 10 shows many nations, then focuses toward Shem's line. The Bible can hold both together.\nGod sees the whole world and also works through a specific family. The specific promise is meant to serve the global purpose.",
      "✂️ Division becomes part of the post-flood world.\nPeleg's name points toward division. Humanity is spreading, but the story is not simple peace.\nGenesis prepares readers for Babel, where scattering comes through judgment on human pride. The nations are real, but their division reveals brokenness too.",
      "📚 Small genealogy details can carry big meaning.\nNames like Eber and Peleg may seem minor at first, but they connect to major biblical themes. Genesis rewards slow reading.\nThe Bible often plants seeds before the reader knows why they matter. Later stories help those seeds grow.",
      "🌅 Genesis 10 prepares Genesis 12.\nThe Table of Nations shows the families of the earth. Soon God will promise Abram that all families of the earth will be blessed through him.\nThat means Genesis 10 is not a detour. It is the setup for the mission of blessing.",
    ],
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_FOUR_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

const DAY_FOUR_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 8:1-5": {
    phraseNote:
      "Reading tip: this section is built like a slow reversal of the flood. Pay attention to movement words: remembered, wind, subsided, rested, seen. Genesis is teaching that restoration is not random; God is personally guiding the world back toward life.",
    truthNote:
      "This keeps the reader from treating Genesis 8 like a simple weather report. The deeper lesson is that God's mercy can be active before the full outcome is visible. Noah's world changes because God acts first.",
  },
  "Genesis 8:6-12": {
    phraseNote:
      "Reading tip: the birds are not random details. They help Noah discern whether the world outside the ark can sustain life again. The raven, dove, and olive leaf turn the waiting season into a lesson about patience, evidence, and hope.",
    truthNote:
      "This helps regular readers see that faith is not reckless. Noah trusts God, but he also pays attention to signs of readiness. Biblical patience can include watching, testing, waiting, and refusing to rush the next step.",
  },
  "Genesis 8:13-19": {
    phraseNote:
      "Reading tip: Noah sees dry ground before God tells him to leave. That detail matters because sight alone is not the final authority in Noah's life. He has learned to move when God speaks, not merely when he feels ready.",
    truthNote:
      "This section teaches that rescue is not the end of discipleship. Noah still needs God's direction after surviving the flood. Being preserved by God leads into a new assignment, not independence from God.",
  },
  "Genesis 8:20-22": {
    phraseNote:
      "Reading tip: this altar scene explains why Genesis 7 cared about clean animals. God had already provided what Noah would need for worship after rescue. The details connect backward and forward, showing that God was preparing worship before Noah ever stepped onto dry ground.",
    truthNote:
      "The big theological point is that judgment alone does not fix humanity. Noah worships, God shows mercy, and God speaks honestly about the human heart. The world continues because of divine mercy, not because people have become perfect.",
  },
  "Genesis 9:1-7": {
    phraseNote:
      "Reading tip: Genesis 9 sounds like Genesis 1 on purpose. Blessing, fruitfulness, animals, food, and image language all make this feel like a restart. But the command about blood reminds us this is not Eden restored; it is a renewed world still marked by death and violence.",
    truthNote:
      "This section teaches a middle layer between simple and theological: human life is sacred because it reflects God, and animal life should still be treated with reverence because life belongs to God. The renewed world needs dignity, justice, and restraint.",
  },
  "Genesis 9:8-17": {
    phraseNote:
      "Reading tip: the rainbow covenant is not only a sweet symbol. It is a public sign that God has chosen restraint after judgment. The bow appears in the clouds, which means God's promise is remembered in the very place people might fear another flood.",
    truthNote:
      "This section teaches that covenant is stronger than human instability. God knows the human heart is still broken, yet He binds Himself to preserve the world. The rainbow is a sign of mercy standing over a world that still needs redemption.",
  },
  "Genesis 9:18-29": {
    phraseNote:
      "Reading tip: this story intentionally feels disappointing after the rainbow. Genesis wants the reader to realize that a rescued person can still fail. Noah's vineyard scene proves the flood changed the world outside the ark, but it did not remove sin inside the human heart.",
    truthNote:
      "This section keeps the reader from turning Noah into the final hero. He is faithful, but he is still fallen. The Bible honors what God did through Noah while still showing why humanity needs a greater rescue than the ark.",
  },
  "Genesis 10:1-5": {
    phraseNote:
      "Reading tip: Genesis 10 is a table of peoples, not just a list of names. It helps ancient readers understand where nations, coastlands, languages, and families came from. The Bible is building the map for the stories that will come later.",
    truthNote:
      "This section teaches that God sees the nations before Abram is even called. That matters because Genesis will soon promise blessing for all families of the earth. The global mission is already being prepared in the genealogy.",
  },
  "Genesis 10:6-20": {
    phraseNote:
      "Reading tip: slow down when you see names like Egypt, Canaan, Babel, Nineveh, and Philistines. These are not throwaway details. They become major places and peoples in the rest of the Bible, so Genesis is planting future context early.",
    truthNote:
      "This section teaches that power and progress are spiritually complicated. Kingdoms, cities, and strong leaders can organize society, but they can also become centers of pride. Genesis wants us to evaluate greatness by relationship to God, not just by influence.",
  },
  "Genesis 10:21-32": {
    phraseNote:
      "Reading tip: Shem's line is where the story begins to narrow toward Abram. After showing the wide world of nations, Genesis quietly guides us toward one family line. That narrowing is not because God forgot the nations; it is how He plans to bless them.",
    truthNote:
      "This section teaches the shape of Genesis: wide world, chosen line, blessing for the world. The Bible narrows the focus so the promise can move forward, but the end goal remains bigger than one tribe or one family.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_FOUR_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_FIVE_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 11:1-9": {
    phrases: [
      "🗣️ One Language\nGenesis begins Babel by saying the whole earth had one language and one speech. That means humanity has a shared ability to communicate, organize, and build together. Unity itself is not the problem; unity can be a gift.\nThe problem is what their unity is being used for. Instead of filling the earth under God's blessing, they use shared language to gather around self-protection, pride, and a name for themselves. Babel shows that togetherness without surrender to God can become dangerous, not automatically holy.",
      "🧱 Let Us Make Brick\nBrick-making shows human skill and technology. In Mesopotamia, stone was not always available the way it was in other regions, so baked brick and bitumen became major building materials. The builders are not primitive or foolish; they are organized and capable.\nThat is part of the point. Genesis is not against tools, cities, or building. It is warning that human ability can become rebellion when it is used to create security apart from God. Skill needs humility, or progress becomes pride with better materials.",
      "🏙️ A City And A Tower\nThe city represents settled security, and the tower represents human ambition reaching upward. In the ancient world, massive temple-towers called ziggurats were built in Mesopotamia as religious and civic centers. Babel sounds like humanity trying to create a center that reaches heaven on human terms.\nThis is not just architecture. It is a spiritual statement. They want a world organized around their own greatness instead of God's command. The building project reveals the heart behind it.",
      "🏷️ Let Us Make A Name\nThis is the clearest window into Babel's motive. They are not asking God for a name; they are trying to manufacture one. In the Bible, a name is connected to identity, reputation, legacy, and significance.\nThe irony is powerful because in the next chapter God tells Abram, 'I will make your name great.' Babel grasps for a name, but Abram receives one by promise. Genesis is contrasting self-made glory with God-given blessing.",
      "🌍 Lest We Be Scattered\nThis phrase shows they are resisting God's creation command to fill the earth. They fear scattering, so they build a city to keep themselves gathered. What sounds like safety is actually disobedience.\nGenesis is teaching that fear can dress itself up as wisdom. The builders probably thought they were protecting their future, but they were protecting themselves from the very mission God had given humanity.",
      "⬇️ Yahweh Came Down\nThis line is almost humorous. Humanity builds a tower to reach the heavens, but God still has to come down to see it. The story shrinks human pride without needing a long argument.\nThe phrase teaches that human greatness is never as high as it thinks it is. What feels enormous from the ground is small before God. Babel's tower cannot force access to heaven.",
      "🔀 Confuse Their Language\nGod's judgment fits the sin. They used one language to unite in rebellion, so God confuses their language and scatters them. This is not random punishment; it directly answers the project.\nThe scattering also becomes mercy. A unified humanity committed to pride can multiply evil quickly. God interrupts the project so human rebellion does not become even more concentrated.",
    ],
    truths: [
      "🏙️ Unity is not automatically righteousness.\nThe people at Babel are unified, organized, and motivated, but their unity is turned inward toward pride. The Bible does not treat togetherness as good if the direction is rebellion.\nThis matters today because groups, movements, churches, companies, and nations can be highly unified around the wrong thing. The question is not only, 'Are we together?' The question is, 'Are we surrendered to God?'",
      "🏷️ God-given identity is better than self-made glory.\nBabel says, 'Let us make a name.' Genesis 12 answers with God saying, 'I will make your name great.' That contrast is the heart of the transition from Babel to Abram.\nHuman pride tries to seize significance. Faith receives significance from God. The Bible is teaching that the deepest security comes from promise, not self-promotion.",
      "🧱 Technology needs humility.\nBrick, bitumen, city-building, and towers show real human ability. The problem is not that they can build; the problem is why they build.\nGenesis helps readers avoid two shallow reactions. It does not worship progress, and it does not reject skill. It asks whether human ability is being used under God or against Him.",
      "🌍 Fear can resist God's mission.\nThe people fear being scattered, but filling the earth was part of God's command. Their fear makes obedience look dangerous.\nThis still happens. People often build lives around avoiding risk, change, or dependence on God. Babel warns that self-protection can become disobedience when it keeps us from God's calling.",
      "⬇️ God humbles pride to protect the future.\nThe confusion of languages is judgment, but it is also restraint. God stops a proud project before it becomes worse.\nSometimes God's interruption is mercy. He may block what people are building because the finished version would damage them and others even more.",
    ],
  },
  "Genesis 11:10-32": {
    phrases: [
      "🧬 These Are The Generations Of Shem\nThis heading tells us Genesis is narrowing the camera again. After the Table of Nations and Babel, the story returns to Shem's family line because Abram will come from this line. The wide world is still important, but the promise story is now taking a specific road.\nThis is how Genesis often works: it shows the many, then traces the one line through which God will bless the many. The genealogy is not filler; it is the bridge from scattered nations to Abram's call.",
      "👨‍👦 Terah Became The Father Of Abram\nAbram is introduced inside a family, not as a floating hero. His father, brothers, wife, nephew, and homeland all matter. God's call will come into a real household with real attachments.\nThis helps us understand the cost of Genesis 12. When God tells Abram to leave his country and father's house, those words are not abstract. Genesis 11 has just shown us the family world Abram is being called out from.",
      "🏙️ Ur Of The Chaldeans\nUr was a significant city in ancient Mesopotamia, known for wealth, trade, and religious life. Abram does not come from nowhere; he comes from a real cultural world with gods, family identity, and settled life.\nThat background makes his call more striking. God will call Abram away from familiar security into a promise he cannot yet see. Faith begins inside a real place, then moves because God speaks.",
      "👩 Sarai Was Barren\nThis is one of the most important details in the whole chapter. Before God promises Abram descendants, Genesis tells us Sarai has no child. The promise will begin in a place that looks humanly impossible.\nThat is not a side note. It sets up the tension of the Abraham story. God promises life through a family where life cannot naturally come. The problem is introduced before the promise so we feel the miracle when it arrives.",
      "🛣️ They Went Forth Toward Canaan\nTerah's family begins moving toward Canaan before Abram's call is fully told. The destination is important because Canaan will become the land of promise. The journey has already begun, but it is unfinished.\nGenesis is showing movement before fulfillment. Sometimes the road toward God's purpose starts before everyone understands what God is doing.",
      "⏸️ They Settled In Haran\nThe family starts toward Canaan but stops in Haran. Haran becomes a pause point, a halfway place. The journey has direction, but it is not completed yet.\nThis is a powerful setup for Genesis 12. Abram's call comes in the context of an unfinished journey. God will tell him to keep moving toward what his family began but did not finish.",
    ],
    truths: [
      "🧬 God works through generations.\nAbram's story is connected to Shem, Terah, Sarai, Lot, Ur, and Haran. God does not erase family history when He calls someone.\nThis teaches that calling often meets people inside an existing story. God can use history, move through it, and also call people beyond it.",
      "🌍 The promise line exists for the nations.\nGenesis narrows from Babel to Abram, but the nations are still in view. The narrowing is for the sake of future blessing.\nThis helps readers understand election in Genesis. God chooses one family not because He hates the world, but because He intends to bless the world through that family.",
      "👩 Barrenness creates space for promise.\nSarai's barrenness makes the coming promise impossible by human strength. That is exactly where God's power will be displayed.\nGenesis often begins hope in impossible places. The problem is not a threat to the promise; it becomes the stage where God proves the promise is His.",
      "🛣️ Faith often begins before everything is clear.\nTerah's family moves toward Canaan but stops in Haran. The road is partial and unfinished.\nThis is honest to real life. People often have movement, delay, confusion, and incomplete obedience before God's next word becomes clear.",
      "⏸️ A pause is not the end of the story.\nHaran is a stopping place, but not the final destination for Abram. Genesis 12 will move the story forward again.\nThis matters for readers who feel stuck. A delayed road can still become the place where God's call is heard.",
    ],
  },
  "Genesis 12:1-3": {
    phrases: [
      "🚪 Go From Your Country\nGod's call begins with leaving. Abram must leave land, relatives, and his father's house, moving from broad identity to the deepest family security. In the ancient world, family and land were survival, status, and belonging.\nThat means Abram's obedience is costly. God is not calling him to a small religious feeling; He is calling him to trust God's promise more than the visible structures that once gave him security.",
      "🧭 To The Land That I Will Show You\nGod does not hand Abram a full map. He gives direction through promise. Abram has to move with enough information to obey, but not enough to control the whole outcome.\nThis is one of the classic pictures of faith in Genesis. Faith is not knowing every detail ahead of time. Faith is trusting the God who speaks while the next stage is still unseen.",
      "🏛️ I Will Make Of You A Great Nation\nThis promise sounds impossible because Sarai is barren and Abram has no child. God promises a nation from a family that cannot produce even one heir by natural ability.\nThat tension is the engine of the Abraham story. Every time the promise is repeated, the reader remembers the obstacle. The promise will have to be fulfilled by God, not human strength.",
      "🙌 I Will Bless You\nBlessing in Genesis means life under God's favor, fruitfulness, protection, provision, and purpose. After Babel's self-made name, God offers Abram blessing as a gift.\nThis is important because Abram is not called only away from something; he is called into blessing. God's commands are costly, but they are not empty. They come with promise.",
      "🏷️ Make Your Name Great\nThis directly answers Babel. Babel tried to make a name for itself by human pride. God promises to make Abram's name great by divine grace.\nThe difference is everything. A self-made name becomes fragile and defensive. A God-given name becomes part of blessing for others. Abram's greatness is not meant to end with Abram.",
      "🌍 All Families Of The Earth Will Be Blessed\nThis is the global purpose of Abram's call. God chooses one man and one family, but the goal is blessing for all families of the earth. The promise is both particular and universal.\nThis line points forward through Israel and ultimately to Jesus. Genesis 12 is not a small tribal promise; it is the beginning of God's rescue plan for the nations.",
    ],
    truths: [
      "🚪 God's call can be costly.\nAbram must leave country, kindred, and father's house. Faith requires real trust because it touches identity, safety, and relationships.\nThis keeps us from making obedience sound cheap. Abram's story begins with a God who is worth trusting more than the visible securities of life.",
      "🧭 Faith moves with promise, not full control.\nGod tells Abram to go to a land He will show him. Abram does not get every detail first.\nThis teaches a middle-level theology of faith: faith is not blind nonsense, because God has spoken. But it is not control, because Abram must move before seeing everything.",
      "🎁 Blessing is given before it is achieved.\nGod says 'I will' again and again. The promise rests on God's initiative.\nThis matters because Genesis is not presenting Abram as a self-made founder. God creates the future Abram could never create on his own.",
      "🏷️ God answers pride with promise.\nBabel grasped for a name; God gives Abram a name. That contrast is one of the most important links in Genesis 11-12.\nThe Bible is teaching that the human hunger for significance is real, but it must be received from God instead of seized against God.",
      "🌍 Election serves mission.\nGod chooses Abram, but the goal is blessing for all families of the earth. The chosen line exists for a global purpose.\nThis helps readers avoid a narrow reading. Abram's blessing is never meant to stop with Abram; it is meant to flow outward.",
    ],
  },
  "Genesis 12:4-9": {
    phrases: [
      "✅ Abram Went As Yahweh Had Spoken\nThis is obedience in one simple sentence. Abram does not understand everything yet, but he responds to God's word. The text is not saying Abram is perfect; it is showing the direction of his faith.\nThat matters because faith in Genesis is active. Abram's trust becomes movement. He leaves, travels, and rearranges life around what God said.",
      "👥 Lot Went With Him\nLot's presence matters because he will become part of Abram's story in complicated ways. He is family, and Abram brings him along. Later, Lot's choices will create tension and danger.\nGenesis often introduces details quietly before they become important. Lot is not just a travel note; he is a person whose direction will test Abram's faith.",
      "📍 To The Land Of Canaan\nAbram arrives in the land God will promise, but he does not own it yet. He is present in the promise, but not possessing it fully. That creates a life of waiting.\nThis is a major Abraham theme. God can bring someone into the place of promise while the fulfillment still remains future. Faith often lives between arrival and possession.",
      "🌳 The Oak Of Moreh\nSacred trees or notable trees often served as landmarks in the ancient world. The oak of Moreh marks a real place where God appears to Abram. The promise is attached to geography, not vague spirituality.\nThis helps us see that Genesis is grounded. God's promise enters real land, real routes, and real locations.",
      "👀 The Canaanites Were Then In The Land\nThis sentence creates tension. God promises land, but the land is already occupied. Abram's faith must hold God's word while facing visible obstacles.\nThat detail is not accidental. The promise is real, but it will not be simple. Genesis is teaching us to notice the gap between what God promises and what circumstances currently show.",
      "🪨 He Built An Altar\nAbram responds to God's appearance and promise with worship. He marks the land with altars before he owns it. Worship becomes a way of saying, 'God's promise is true here.'\nAltars will become a pattern in Abram's life. He is not only a traveler; he is a worshiper moving through the land by faith.",
    ],
    truths: [
      "✅ Obedience gives faith a body.\nAbram believes God by going. Faith is not only agreement in his mind.\nThis helps readers see that biblical faith moves into decisions, locations, relationships, and habits. Abram's feet reveal what he trusts.",
      "⏳ Promise can begin before possession.\nAbram reaches Canaan, but the Canaanites are there and he owns none of it yet. He is living in the promise before holding the deed.\nThat is a deep faith lesson. God's word may be true even while fulfillment is still future and visible obstacles remain.",
      "🪨 Worship anchors the journey.\nAbram builds altars as he moves through the land. Worship keeps his journey centered on God, not just destination.\nThis matters because obedience without worship can become dry striving. Abram's story holds movement and worship together.",
      "👀 Obstacles do not cancel promise.\nThe Canaanites are in the land, but God still promises it. The obstacle is named, but it is not treated as stronger than God's word.\nGenesis teaches readers not to pretend obstacles are unreal. It teaches them to place obstacles under the promise of God.",
      "👥 Faith journeys affect other people.\nLot goes with Abram, and that relationship will matter later. Abram's obedience is personal, but not private.\nWhen someone follows God, family systems, relationships, and future choices can all be pulled into the story.",
    ],
  },
  "Genesis 12:10-20": {
    phrases: [
      "🌾 There Was A Famine\nThe famine comes after Abram obeys. That is important because obedience does not mean life becomes easy immediately. Abram is in the land of promise, and the land cannot currently feed him.\nThis is a test. Will Abram trust God in scarcity, or will fear take over? Genesis is realistic: following God's call can lead straight into pressure.",
      "⬇️ Abram Went Down To Egypt\nEgypt is a place of food and survival during famine, but it also becomes a place of danger and compromise. Later in the Bible, Egypt will be both refuge and bondage for Abram's descendants.\nHere, Abram's movement to Egypt is understandable, but the story quickly shows fear shaping his decisions. A practical need becomes a spiritual test.",
      "👩 Say You Are My Sister\nAbram's plan is half-truth and self-protection. Sarai was related to him, but the statement hides the covenant marriage relationship. The problem is not only the words; it is the motive and risk.\nAbram is trying to preserve his own life by placing Sarai in danger. Genesis lets us feel the ugliness of fear when it uses another person as a shield.",
      "😨 That It May Go Well With Me\nThis phrase exposes Abram's motive. He wants things to go well for him, but his plan puts Sarai at risk. Fear has made him self-focused.\nThis is painfully human. Abram has received huge promises, but under pressure he acts as if his survival depends on manipulation. Chosen people can still make fearful choices.",
      "🏛️ Pharaoh's House\nSarai is taken into Pharaoh's house, which means Abram's lie has created a crisis for the promise. If Sarai is absorbed into Pharaoh's household, what happens to the promised descendants?\nThe story is not merely about personal embarrassment. The covenant future is in danger, and Abram caused the danger through fear.",
      "⚡ Yahweh Plagued Pharaoh\nGod intervenes to protect Sarai and the promise. The plagues show that God is defending the covenant line even when Abram has failed badly.\nThis also foreshadows Exodus, where God will again plague Pharaoh's house to deliver Abram's descendants from Egypt. Genesis is planting patterns that later become huge.",
      "🚪 Pharaoh Sent Him Away\nAbram leaves Egypt with goods, Sarai, and Lot. It is an awkward deliverance because Abram is rescued from a mess he helped create. God preserves the promise, but Abram does not look heroic here.\nThat is the point. The promise survives because God is faithful, not because Abram is flawless.",
    ],
    truths: [
      "🌾 Obedience can be followed by testing.\nAbram obeys God's call and then faces famine. That surprises many readers, but Genesis is honest.\nFaith does not mean every circumstance immediately confirms the promise. Sometimes the first thing after obedience is pressure that reveals what we fear.",
      "😨 Fear can make faith act selfishly.\nAbram's fear leads him to protect himself at Sarai's expense. He is chosen, but he is still capable of serious failure.\nThis helps readers avoid fake hero stories. The Bible shows faith growing in flawed people who still need God's mercy.",
      "🧩 Half-truths can still be lies.\nSarai is connected to Abram by family, but Abram uses that partial truth to hide the full truth. The result is deception.\nGenesis teaches that truth is not only about technical accuracy. It is also about honesty, motive, and whether words are being used to manipulate reality.",
      "🛡️ God protects the promise even when people fail.\nAbram endangers Sarai and the covenant future, but God intervenes. The promise does not collapse because Abram panics.\nThis is not permission to sin. It is comfort that God's faithfulness is stronger than human weakness.",
      "🔁 Egypt becomes a pattern.\nAbram goes to Egypt during famine, Pharaoh's house is struck by plagues, and Abram leaves with possessions. Later, Israel's story will echo these themes on a much larger scale.\nGenesis is teaching through patterns. What happens to the father foreshadows what will happen to his descendants.",
    ],
  },
  "Genesis 13:1-7": {
    phrases: [
      "⬆️ Abram Went Up Out Of Egypt\nAbram returns from Egypt after fear and failure. The direction upward is geographical, but it also feels like a return to the promise road. He is leaving the place where he compromised.\nThis movement matters because Genesis does not end Abram's story at his failure. God brings him back, and Abram returns to the land connected with God's promise.",
      "🐄 Very Rich In Livestock, Silver, And Gold\nAbram leaves Egypt with increased wealth. Blessing is present, but wealth will create a new test. The issue is not whether possessions are bad; the issue is what abundance does to relationships and trust.\nGenesis is wise about prosperity. Scarcity tested Abram in chapter 12, and abundance tests him in chapter 13. Both can reveal the heart.",
      "🪨 To The Place Of The Altar\nAbram returns to the altar he had built earlier. This feels like spiritual reset. After Egypt, he comes back to the place where he had called on the Lord.\nThat is a beautiful pattern. When faith has stumbled, returning to worship matters. Abram does not fix everything by pretending Egypt never happened; he returns to the place of dependence.",
      "📣 Abram Called On The Name Of Yahweh\nCalling on the name of the Lord means worship, prayer, and renewed dependence. Abram is back in the posture he should have had all along.\nThis phrase connects him with the worship line from Genesis 4:26. The story of faith is not only movement and land; it is calling on God.",
      "⛺ The Land Was Not Able To Bear Them\nAbram and Lot have grown so wealthy that the land cannot support both households together. This is not famine; it is abundance creating pressure.\nThat is an important life lesson. Problems do not only come from lack. Sometimes growth, blessing, and success create tension that requires wisdom.",
      "⚔️ There Was Strife\nStrife appears between the herdsmen of Abram and Lot. The conflict is practical, but it threatens family unity. Abram has to respond before the conflict becomes deeper.\nGenesis shows that faithful people still face relational tension. The question is not whether conflict happens, but whether faith responds with peace, generosity, and trust.",
    ],
    truths: [
      "🔄 Failure does not have to be the final chapter.\nAbram leaves Egypt and returns to the altar. His story continues after fear.\nThis matters because Genesis is showing growth, not perfection. A stumble can become a return when a person comes back to worship and dependence.",
      "🙌 Worship resets direction.\nAbram returns to the place where he called on the Lord. Worship re-centers him after a compromised season.\nThis is practical and theological. When fear has pulled someone off course, returning to God is not a small thing; it is the beginning of restored direction.",
      "💰 Blessing can create new tests.\nAbram's wealth contributes to conflict with Lot. Abundance brings pressure just as famine did.\nThe Bible does not treat prosperity as spiritually neutral. It can reveal whether people will grasp, fight, share, or trust God.",
      "🕊️ Peace requires early wisdom.\nAbram sees strife and addresses it before it destroys the family relationship. That is wise leadership.\nConflict ignored often grows. Genesis shows Abram handling tension differently here than he handled fear in Egypt.",
      "⛺ Faith has to work in practical problems.\nThis conflict is about land, livestock, herdsmen, and space. It is ordinary life.\nGenesis teaches that faith is not only tested in dramatic spiritual moments. It is tested in property, family, work, resources, and decisions.",
    ],
  },
  "Genesis 13:8-13": {
    phrases: [
      "🤝 Let There Be No Strife\nAbram takes initiative for peace. He does not wait for the herdsmen's conflict to explode. He values family relationship over winning the best land.\nThis shows growth from Genesis 12. In Egypt, fear made Abram self-protective. Here, trust makes him open-handed. Faith is starting to shape how he handles pressure.",
      "👐 Is Not The Whole Land Before You\nAbram gives Lot the first choice. That is surprising because Abram is the elder and the one who received the promise. Culturally, he could have claimed priority.\nInstead, he releases control. Abram can be generous because the promise does not depend on grabbing the best-looking land. God has already spoken.",
      "👀 Lot Lifted Up His Eyes\nLot chooses by sight. He looks at the well-watered plain and makes a decision based on visible advantage. The phrase is important because God will later tell Abram to lift up his eyes too, but Abram will see through promise.\nGenesis is contrasting two kinds of seeing. Lot sees opportunity; Abram learns to see promise.",
      "🌿 Like The Garden Of Yahweh\nThe plain looks like Eden, lush and watered. That makes Lot's choice understandable. It looks like life, abundance, and security.\nBut Genesis adds warning signs. Something can look like Eden and still be near Sodom. Beauty and danger can sit closer together than people expect.",
      "🏙️ Toward Sodom\nLot does not begin by living inside Sodom; he moves toward it. That direction matters. Genesis often shows drift before disaster.\nThis is a powerful reading tip. Pay attention not only to where someone is, but where they are facing. Lot's choice by sight starts moving him toward a morally dangerous place.",
      "⚠️ The Men Of Sodom Were Wicked\nGenesis gives the reader information Lot either ignores or underestimates. The land looks good, but the people nearby are deeply wicked. This creates tension for everything that follows.\nThe verse teaches discernment. A decision should not be judged only by resources, beauty, or opportunity. Spiritual environment matters too.",
    ],
    truths: [
      "🕊️ Trust can make a person generous.\nAbram lets Lot choose first because Abram is not desperate to control the outcome. God's promise gives him freedom to release the first pick.\nThis is a real sign of faith. People who trust God do not have to grasp every advantage.",
      "👀 Sight is not the same as wisdom.\nLot chooses what looks best. The land is well-watered, but it is spiritually dangerous.\nGenesis teaches that visible opportunity must be tested by moral and spiritual reality. Not every open door leads toward life.",
      "🧭 Direction matters before destination.\nLot moves toward Sodom before he is fully caught in Sodom's story. The drift begins with a choice that seems practical.\nThis matters because many destructive paths begin gradually. The question is not only, 'Where am I?' but, 'What am I moving toward?'",
      "🌿 Good-looking options can hide danger.\nThe plain looks like the garden of the Lord, but the nearby city is wicked. Genesis refuses shallow decision-making.\nThis helps regular readers. A job, relationship, opportunity, or place can look fruitful and still pull the heart toward compromise.",
      "🤝 Peace may require letting go.\nAbram chooses peace over possession. He gives Lot room.\nThis does not mean avoiding all hard boundaries. It means Abram trusts God enough not to fight for what God has already promised to give in His way.",
    ],
  },
  "Genesis 13:14-18": {
    phrases: [
      "👀 Lift Up Your Eyes\nAfter Lot lifts his eyes and chooses by sight, God tells Abram to lift his eyes and receive by promise. The repetition is intentional. Genesis contrasts self-directed seeing with God-directed seeing.\nAbram does not look in order to take; he looks in order to trust. The land is shown to him as gift, not as something he must seize.",
      "🧭 Northward, Southward, Eastward, And Westward\nGod tells Abram to look in every direction. This makes the promise feel expansive and concrete. The land is not a vague spiritual idea; it has directions, space, and geography.\nThis matters because biblical promises often enter real life. God is not only shaping Abram's inner feelings. He is speaking about place, descendants, and future history.",
      "🎁 I Will Give It To You\nThe land is gift language. Abram just let Lot choose first, and now God reminds Abram that the promise depends on divine giving, not human grabbing.\nThat is the key contrast with Lot's choice. Lot takes what looks good. Abram receives what God gives. Genesis is teaching a different way to live.",
      "👶 Your Offspring As The Dust Of The Earth\nThis promise sounds impossible because Abram and Sarai still have no child. Dust is countless, ordinary, everywhere, and impossible to number. God uses that image to describe descendants beyond Abram's ability to imagine.\nThe promise stretches faith. Abram must believe in a future that his current household cannot produce.",
      "🚶 Arise, Walk Through The Land\nGod invites Abram to walk through the land as a sign of promise. In the ancient world, walking land could symbolize taking survey or possession. Abram walks not because he owns it fully yet, but because God has pledged it.\nThis is faith with feet again. Abram's movement becomes a way of living inside God's promise before full fulfillment.",
      "🪨 He Built An Altar\nAbram ends the section with worship again. After God repeats the promise, Abram builds another altar. Promise leads to worship, not pride.\nThis is Abram's better pattern. He hears God, moves his tent, and marks the place with worship. The promise is held in the presence of God.",
    ],
    truths: [
      "👀 Faith learns to see by promise.\nLot looked and chose by visible advantage. Abram looks after God speaks.\nThis is a major contrast in Genesis 13. Faith does not ignore what the eyes see, but it lets God's word interpret what the eyes see.",
      "🎁 God's gifts do not need to be seized by fear.\nAbram lets Lot choose, and God repeats the promise. The promise was never in Lot's control.\nThis teaches that trust can release anxiety. If God is the giver, His promise does not depend on our grasping.",
      "⏳ Promise can be real before it is fully possessed.\nGod promises land and descendants while Abram still has no child and owns no settled territory. The promise is true before fulfillment is complete.\nThat is one of the deepest lessons of Abraham's life. Faith lives in the gap between God's word and the visible outcome.",
      "🚶 Faith responds with movement and worship.\nGod says arise and walk, and Abram later builds an altar. The promise shapes his steps and his worship.\nBiblical faith is not passive waiting only. It moves through the world in response to what God has said.",
      "🌍 Abram's story keeps pointing beyond Abram.\nLand and offspring will become the road toward Israel, Scripture, and ultimately blessing for the nations. This moment is bigger than one man's private future.\nGenesis is building the promise story piece by piece. Abram's tent and altar sit inside God's global plan.",
    ],
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_FIVE_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

const DAY_FIVE_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 11:1-9": {
    phraseNote:
      "Reading tip: Babel is meant to be read beside Abram's call. Babel says, 'Let us make a name,' while God tells Abram, 'I will make your name great.' That contrast helps the reader see the difference between grasped glory and received blessing.",
    truthNote:
      "The deeper lesson is not simply that pride is bad. Babel shows a whole society trying to secure identity, safety, and legacy without trusting God. Genesis answers that with promise, not with another human project.",
  },
  "Genesis 11:10-32": {
    phraseNote:
      "Reading tip: this family list is the runway into Abraham's story. Watch for three details: Shem's line, Sarai's barrenness, and the unfinished journey to Canaan. Those details become the soil where God's promise is planted.",
    truthNote:
      "This keeps the genealogy from feeling flat. Genesis is showing that God's call meets people inside family history, real limitations, and unfinished roads. Abram's story begins before Abram understands the whole story.",
  },
  "Genesis 12:1-3": {
    phraseNote:
      "Reading tip: count how many times God says 'I will.' The center of Abram's call is not Abram's ability but God's commitment. Abram must obey, but the future rests on what God promises to do.",
    truthNote:
      "This is one of the most important promise texts in the Bible. It connects land, nation, name, blessing, and the future blessing of all families of the earth. The rest of Scripture keeps unfolding this promise.",
  },
  "Genesis 12:4-9": {
    phraseNote:
      "Reading tip: Abram's altars are like spiritual markers in the land. He does not own Canaan yet, but he worships there because God's promise has claimed the future. Worship becomes Abram's way of living in a promise not fully possessed.",
    truthNote:
      "This section teaches faith in the gap. Abram is in the land, but the Canaanites are there. God has spoken, but fulfillment is still future. Faith keeps obeying and worshiping in that in-between space.",
  },
  "Genesis 12:10-20": {
    phraseNote:
      "Reading tip: Egypt is not just a random travel stop. This scene foreshadows Israel's later story: famine, Egypt, Pharaoh, plagues, and leaving with possessions. Genesis often lets the family founder's life preview the later life of his descendants.",
    truthNote:
      "This section teaches that God's promise survives human weakness. Abram's fear creates real danger, especially for Sarai, but God protects the covenant line. The promise is held by God's faithfulness, not Abram's perfect courage.",
  },
  "Genesis 13:1-7": {
    phraseNote:
      "Reading tip: Abram faces two opposite tests back to back. Famine tested him through lack, and abundance tests him through conflict. Genesis is showing that both need faith because both can expose what the heart trusts.",
    truthNote:
      "This section teaches that returning to worship matters after failure. Abram comes back to the altar before he handles the conflict with Lot. The reset with God comes before the practical decision.",
  },
  "Genesis 13:8-13": {
    phraseNote:
      "Reading tip: Lot's choice is written with warning lights. It looks watered like Eden, but it points toward Sodom. Genesis is training the reader to look beneath appearance and ask where a choice is spiritually leading.",
    truthNote:
      "This section teaches discernment. Lot does not choose something ugly; he chooses something attractive and dangerous. That is why the passage is so useful for real life: not every good-looking option is a wise direction.",
  },
  "Genesis 13:14-18": {
    phraseNote:
      "Reading tip: Lot lifted his eyes first and chose for himself. Then God tells Abram to lift his eyes and receive by promise. The repeated phrase is a contrast between sight-led grasping and promise-led trust.",
    truthNote:
      "This section teaches that letting go does not make God's promise smaller. Abram gives Lot first choice, and God immediately reaffirms the land and descendants. Faith can release control because God remains the giver.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_FIVE_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_SIX_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 14:1-12": {
    phrases: [
      "⚔️ In The Days Of Amraphel, Arioch, Chedorlaomer, And Tidal\nGenesis suddenly sounds like an ancient war report because Abram's family story is now touching international politics. These kings represent alliances, tribute, rebellion, and military power in the ancient Near East. The Bible is showing that Abram's promise does not happen in a quiet bubble.\nReading tip: do not get stuck trying to memorize every king name. Notice the world Abram lives in. It is a world of power struggles, cities, rulers, and conflict, and Lot's choice to live near Sodom pulls him into that world.",
      "🏙️ Sodom And Gomorrah\nSodom and Gomorrah are already known as morally dangerous from Genesis 13, but now they are also politically vulnerable. They are part of a coalition of cities that rebel against a stronger king. Lot's location places him near both spiritual danger and military danger.\nThis is important because Genesis connects choices over time. Lot moved toward Sodom because it looked good, but now Sodom's troubles become his troubles. A direction that begins by sight can eventually create consequences the person did not expect.",
      "⛓️ Twelve Years They Served\nThis phrase shows the political background. These cities had been under the power of Chedorlaomer for twelve years before rebelling in the thirteenth. Ancient kings often demanded tribute, and rebellion could lead to brutal military response.\nGenesis is helping us understand why the battle happens. This is not random violence; it is the ancient world of empires, taxes, alliances, and retaliation. Abram's family is about to be affected by forces much bigger than one household.",
      "🪨 The Valley Of Siddim Was Full Of Tar Pits\nThe tar pits are a real battlefield detail. Bitumen or tar was useful for building, but here the landscape becomes dangerous in battle. Some kings fall there as they flee.\nThis little detail makes the scene feel grounded. Genesis is not giving a vague 'bad things happened' summary. It is describing terrain, strategy, and panic. The physical place becomes part of the defeat.",
      "🎒 They Took All The Goods Of Sodom And Gomorrah\nThe victorious kings plunder the cities. In ancient warfare, taking goods, food, and captives was part of victory. War was not only about winning territory; it was about stripping wealth and power from the defeated.\nThat matters because Lot is not simply inconvenienced. His home, possessions, and freedom are swept up into the consequences of Sodom's defeat. Genesis is showing how fragile worldly security can be.",
      "👤 They Also Took Lot\nThis is the emotional center of the section. Lot has moved from looking toward Sodom, to dwelling near Sodom, to being captured with Sodom. The text wants us to connect the dots.\nLot is Abram's nephew, and his capture pulls Abram into the story. Even though Lot made foolish choices, Abram will not treat him as disposable. Grace is about to move toward the person who got too close to danger.",
    ],
    truths: [
      "🧭 Direction has consequences.\nLot's earlier choice to move toward Sodom now bears fruit. He is captured because he is living in the wrong neighborhood when war arrives.\nGenesis is not saying every hardship is caused by one bad choice, but it is teaching that direction matters. Where we settle, who we attach to, and what we value can place us near dangers we did not plan for.",
      "🌍 God's promise unfolds in the real world.\nGenesis 14 includes kings, alliances, battles, tribute, and geography. Abram's faith is not removed from history.\nThis helps readers understand that biblical faith is not only private spirituality. God's people must learn to trust Him inside political, social, economic, and relational pressure.",
      "🏙️ Worldly security can collapse quickly.\nSodom looked attractive in Genesis 13, but now it is defeated and plundered. What looked safe and prosperous was not as secure as it appeared.\nThis is a major warning. A place can look fruitful and still be spiritually and practically unstable.",
      "⛓️ Power without righteousness becomes oppression.\nThe kings in Genesis 14 rule through dominance, tribute, and war. Their power creates fear and captivity.\nGenesis contrasts this world of grasping kings with Abram, who will soon act courageously and then refuse corrupt gain. The Bible is teaching us to evaluate power morally.",
      "🛟 Grace can move toward people in trouble.\nLot's capture is partly tied to his own direction, but Abram still rescues him. Genesis does not celebrate Lot's choices, but it also does not abandon him.\nThis gives the story a merciful edge. God often works through faithful people to help those who are suffering from dangerous decisions.",
    ],
  },
  "Genesis 14:13-16": {
    phrases: [
      "🏃 One Who Had Escaped Came And Told Abram\nNews reaches Abram because someone survives the battle and reports Lot's capture. This moment turns Abram from a distant relative into an active rescuer. He now has to decide whether Lot's crisis is his concern.\nReading tip: this is where Abram's faith becomes practical courage. He does not only build altars. He responds when family is in danger.",
      "🌳 Abram The Hebrew\nThis is the first time Abram is called 'the Hebrew' in Scripture. The term may connect him with Eber's line or mark him as an outsider/sojourner among the peoples of Canaan. Either way, it identifies Abram as distinct in the land.\nThat matters because Abram is not a king with a city-state army. He is a pilgrim household leader living by promise, yet he acts with courage inside a world of kings.",
      "🏠 Trained Men Born In His House\nAbram's household is larger and more organized than many readers imagine. He has trained men, servants, resources, and responsibility. His family is more like a mobile clan than a modern small household.\nThis detail helps explain how Abram can respond militarily. Faith does not mean Abram is helpless or passive. God has given him resources, and he uses them to rescue Lot.",
      "🌙 By Night\nAbram attacks by night, likely using surprise and strategy instead of brute force. He is outnumbered compared with the larger armies, so wisdom matters.\nThis is a helpful detail because courage in the Bible is not the same as recklessness. Abram acts boldly, but he also acts thoughtfully. Faith can include planning.",
      "🔙 He Brought Back All The Goods\nAbram's rescue is complete. He recovers Lot, goods, women, and people. The victory reverses the plunder from the previous section.\nThat matters because Abram does not fight merely for personal revenge. His action restores what had been stolen and frees captives. This is courage used for rescue, not self-glory.",
      "👥 His Brother Lot\nLot is technically Abram's nephew, but the text uses family language. This highlights loyalty and kinship. Lot's choices strained things, but Abram still treats him like family.\nThis phrase teaches something beautiful. Grace does not mean ignoring foolishness, but it may still move toward the person in danger because relationship matters.",
    ],
    truths: [
      "🛡️ Faith can become courageous action.\nAbram does not hear about Lot and do nothing. He gathers his trained men and acts.\nThis expands our view of faith. Faith is not only waiting quietly. Sometimes faith risks, moves, fights for rescue, and takes responsibility when someone vulnerable is in danger.",
      "🧠 Courage should include wisdom.\nAbram attacks by night and divides his forces. He is brave, but not careless.\nBiblical courage is not trying to look fearless. It is faithful action guided by wisdom, timing, and concern for others.",
      "🏠 God can use ordinary resources for rescue.\nAbram uses trained men from his own household. These are resources already in his life.\nThis teaches that God often works through what He has already placed in someone's hands: relationships, skills, people, experience, and courage.",
      "🤝 Covenant people should not be passive about suffering.\nLot's trouble could have been treated as 'his problem.' Abram refuses that posture.\nGenesis shows faith moving toward need. The promise does not make Abram selfish; it calls him to act with responsibility.",
      "🛟 Grace can rescue without approving every choice.\nAbram rescues Lot even though Lot's direction placed him near Sodom. Rescue does not mean Lot made wise decisions.\nThis is a helpful middle truth. Love can help someone in danger while still recognizing that their direction needs correction.",
    ],
  },
  "Genesis 14:17-20": {
    phrases: [
      "👑 Melchizedek King Of Salem\nMelchizedek appears suddenly as both king and priest. Salem is commonly connected with Jerusalem, and his name is often understood to mean 'king of righteousness.' He becomes one of the most mysterious and important figures in Genesis.\nLater Scripture, especially Psalm 110 and Hebrews, reflects deeply on Melchizedek. For the reader here, the first point is simple: after battle, Abram is met by a righteous priest-king who blesses him in God's name.",
      "🍞 Bread And Wine\nMelchizedek brings bread and wine, likely as refreshment after battle and a gesture of hospitality. The passage does not directly say this is communion, but later Christian readers naturally hear echoes because bread and wine become so important in the story of Jesus.\nAt the Genesis level, the detail shows honor, fellowship, and blessing after conflict. Abram's victory is met not by greed first, but by priestly blessing.",
      "⛪ Priest Of God Most High\nMelchizedek serves El Elyon, God Most High. This title emphasizes God's supremacy over heaven and earth. It shows that true knowledge of God exists outside Abram's immediate household.\nThat is an important aha moment. Abram is chosen, but God is not a tribal deity trapped inside Abram's family. God Most High is Lord over all, and Melchizedek recognizes Him.",
      "🙌 Blessed Be Abram\nMelchizedek blesses Abram after the victory. A blessing is not just a nice sentence; it is a spoken recognition of God's favor and purpose. Abram's success is placed under God's authority.\nThis matters because Abram has just won a major rescue. Blessing keeps victory from turning into pride. Abram is reminded that his life is held by God Most High.",
      "🌌 Possessor Of Heaven And Earth\nThis phrase means God owns everything: sky, land, armies, kings, goods, victory, and future. Abram is not dealing with a small local god who controls one territory. He is blessed by the Maker and Owner of all.\nThat title prepares Abram to refuse Sodom's wealth. If God possesses heaven and earth, Abram does not need a corrupt king to define his blessing.",
      "🎁 Abram Gave Him A Tenth\nAbram gives Melchizedek a tenth of everything, recognizing Melchizedek's priestly role and God's hand in the victory. This happens before the law of Moses, so it is not a Levitical tithe command yet.\nThe action shows honor and worshipful acknowledgment. Abram knows the victory is not just military success; it belongs under the blessing of God Most High.",
    ],
    truths: [
      "👑 God can reveal His greatness through surprising people.\nMelchizedek appears outside Abram's family line, yet he blesses Abram in the name of God Most High.\nThis keeps readers humble. God's work is bigger than the people we already know, and His witness can appear in unexpected places.",
      "🙌 Victory should lead to worship, not ego.\nAbram has just won a dangerous rescue mission, but Melchizedek blesses God as the deliverer.\nThis reframes success. Abram fought, but God delivered. Faith learns to give God credit instead of turning victory into self-glory.",
      "🌌 God is possessor of heaven and earth.\nThis title is huge. It means every king, battlefield, city, and possession exists under God's ownership.\nThat truth gives Abram freedom. If God owns all, Abram does not need to compromise for wealth from Sodom.",
      "⛪ Priesthood appears before Israel's priesthood.\nMelchizedek is a priest before Levi, Aaron, or the tabernacle. Genesis is showing that priestly mediation is older and wider than the Mosaic system.\nThis becomes important later when Scripture speaks of a priest forever after the order of Melchizedek.",
      "🎁 Giving can confess where victory came from.\nAbram's tenth is not a tax payment in this context. It is an act of recognition.\nHe is saying, through action, that the rescue and goods are not ultimately his achievement. They belong under God Most High.",
    ],
  },
  "Genesis 14:21-24": {
    phrases: [
      "🏙️ The King Of Sodom Said\nAfter Melchizedek blesses Abram, the king of Sodom speaks. The order matters. Abram hears blessing from the priest of God Most High before he hears an offer from Sodom.\nThis creates a spiritual test after military victory. Abram must decide whose voice will define the meaning of success: God's priestly blessing or Sodom's reward.",
      "💰 Give Me The People, And Take The Goods\nThe king of Sodom offers Abram the goods from the rescue. In normal ancient warfare, Abram may have had a right to spoils. The offer is not random; it fits the customs of victory.\nBut Abram sees a deeper issue. If he accepts, Sodom might later claim credit for making him rich. Abram refuses because some gains are not worth the spiritual confusion they create.",
      "✋ I Have Lifted Up My Hand To Yahweh\nLifting the hand can signal an oath. Abram has made a solemn commitment before the Lord, God Most High. His decision is not emotional reaction; it is worship-shaped resolve.\nThis phrase shows that Abram's refusal is grounded in theology. Because Yahweh is possessor of heaven and earth, Abram does not need Sodom's wealth to secure his future.",
      "🧵 Not A Thread Or A Sandal Strap\nAbram refuses even the smallest item. A thread and sandal strap are tiny, ordinary things. He is saying he will not accept even a token that lets Sodom claim ownership over his prosperity.\nThat is strong discernment. Sometimes compromise begins with small things that seem harmless. Abram draws the line clearly.",
      "🏷️ Lest You Should Say, I Have Made Abram Rich\nThis is the heart of Abram's refusal. He cares about the story that will be told about his blessing. God promised to bless Abram, so Abram will not let a corrupt king claim that role.\nThis links directly to Genesis 12. Abram's name, blessing, and future must be defined by God, not Sodom. He refuses a shortcut to wealth that would confuse the promise.",
      "🍽️ Except What The Young Men Have Eaten\nAbram's refusal is firm but fair. He does not force his personal conviction in a way that cheats others. The men who fought may keep what they need, and his allies may take their share.\nThis is mature leadership. Abram refuses compromise for himself while respecting the legitimate rights of those who joined him.",
    ],
    truths: [
      "⚠️ Victory can be followed by temptation.\nAbram wins the battle, then faces the offer from Sodom. The test after success may be subtler than the test during danger.\nThis is very practical. People often prepare for struggle but forget to guard their hearts after success, when reward, pride, and compromise appear.",
      "💰 Not every gain is worth receiving.\nAbram refuses goods he may have had a right to take. The issue is not the money alone; it is the source and the story attached to it.\nFaith asks more than, 'Can I have this?' It asks, 'What will this do to my witness, dependence, and relationship with God?'",
      "🏷️ God's promise should define Abram's blessing.\nGod said He would bless Abram. Abram refuses to let Sodom say it made him rich.\nThis is a major faith moment. Abram chooses a clean story over quick wealth because he trusts the promise more than opportunity.",
      "🧵 Small compromises can create big claims.\nAbram refuses even a thread or sandal strap. He does not want Sodom to have any claim over his prosperity.\nThis teaches discernment. Sometimes the small thing is not small because of what it represents.",
      "🤝 Conviction can be firm and fair.\nAbram refuses for himself but allows others their share. He is not careless with other people's rights.\nThis is mature faith. Strong conviction does not have to become controlling leadership.",
    ],
  },
  "Genesis 15:1-6": {
    phrases: [
      "👁️ The Word Of Yahweh Came In A Vision\nGenesis 15 begins with God's word coming to Abram after the events of Genesis 14. Abram has fought kings, refused Sodom's reward, and now God speaks into the aftermath. The promise continues through revelation, not human momentum.\nThis matters because faith needs God's word again and again. Abram had already received promises, but God meets him with fresh assurance in a new season.",
      "🛡️ Fear Not, Abram\nGod addresses Abram's fear before Abram even explains it. After battle and refusal of Sodom's reward, Abram may feel vulnerable, childless, and uncertain. God does not shame him for fear; He speaks to it.\nThis is tender and important. The father of faith still needs 'fear not.' Faith is not the absence of fear; it is fear brought under God's word.",
      "🎁 I Am Your Shield And Your Very Great Reward\nGod does not merely promise to give Abram protection and reward; He says He Himself is Abram's shield and reward. That is deeper than goods from Sodom or security from armies.\nThis phrase answers Genesis 14. Abram refused Sodom's riches, and God says, in effect, 'You did not lose. I am your reward.' The giver is greater than the gift.",
      "👶 I Continue Childless\nAbram is honest about the unresolved ache in the promise. God has promised descendants, but Abram still has no child. Faith does not pretend the tension is not there.\nThis line is one reason Genesis feels so human. Abram believes God, but he also brings the painful gap between promise and reality into conversation with God.",
      "🌌 Look Toward Heaven And Number The Stars\nGod takes Abram outside and gives him a picture larger than his present limitation. The stars become a visual sermon of promise. Abram has no child, but God points him to countless descendants.\nThis is not motivational decoration. God attaches His word to a created sign Abram can see. The night sky becomes a reminder that the promise depends on God's power.",
      "✅ He Believed Yahweh\nThis is one of the most important sentences in the Bible. Abram trusts God's promise while the visible evidence is still missing. He believes the Lord, not because the circumstances are easy, but because God has spoken.\nLater Scripture, especially Romans and Galatians, returns to this verse to explain faith and righteousness. Genesis 15:6 becomes a cornerstone for understanding trust in God's promise.",
      "⚖️ He Counted It To Him For Righteousness\nGod counts Abram's faith as righteousness. This does not mean Abram earned righteousness by performing a work. It means God regards Abram as right with Him through faith in His promise.\nThis is huge theology in simple story form. Abram is accepted by trusting God, before circumcision, before Sinai, and before Israel's law. Faith receives what God promises.",
    ],
    truths: [
      "🛡️ God speaks to fear with Himself.\nGod tells Abram, 'I am your shield and reward.' The answer is not only a changed circumstance; it is God's own presence and faithfulness.\nThis helps readers understand comfort biblically. God may give things, but His deepest assurance is Himself.",
      "💬 Honest questions can belong inside faith.\nAbram asks about his childlessness. God does not treat the question as rebellion.\nThis is important for regular people. Faith is not pretending there are no painful gaps. Faith brings the ache to God and listens for His word.",
      "🌌 God can enlarge vision through promise.\nAbram sees no heir, so God shows him the stars. The promise stretches Abram beyond what his present situation can prove.\nBiblical faith lets God's word enlarge what the heart can imagine. It learns to see more than the immediate limitation.",
      "✅ Faith trusts the promiser before fulfillment appears.\nAbram believes while still childless. Nothing visible has changed yet.\nThat is why this verse matters so much. Faith is not waiting until the promise is obvious; faith receives God's word while fulfillment is still ahead.",
      "⚖️ Righteousness is received by faith.\nGod counts Abram's faith as righteousness. This becomes one of Scripture's central truths.\nBefore circumcision or the law, Abram stands right with God by trusting the promise. The relationship rests on God's gracious counting, not Abram's flawless record.",
    ],
  },
  "Genesis 15:7-11": {
    phrases: [
      "🚪 I Am Yahweh Who Brought You Out Of Ur\nGod identifies Himself by His saving action in Abram's life. Before He talks about the land, He reminds Abram who called him out and brought him this far.\nThis matters because assurance often begins with remembering. The God who started the journey is the God who can finish the promise.",
      "📍 To Give You This Land\nThe land promise is repeated again. Abram has walked in the land, built altars, and heard the promise, but he still does not possess it fully. God keeps naming the promise because Abram still needs assurance.\nThis is a helpful reading point. Repetition in Genesis is not wasted. God repeats promises because people need to hear again what circumstances make hard to believe.",
      "❓ How Shall I Know\nAbram's question asks for assurance, not escape. He is not mocking God. He wants to know how the promise will be confirmed.\nGod's response shows that the question is welcomed. Instead of rebuking Abram, God moves into a covenant ceremony. Faith can ask for assurance without abandoning trust.",
      "🐄 Bring Me A Heifer, A Goat, And A Ram\nThe animals prepare for an ancient covenant ceremony. In that world, covenants could be confirmed through symbolic actions involving animals, oaths, and serious consequences. This is not random ritual; it is legal and relational language in Abram's culture.\nGod speaks to Abram in a form Abram can understand. The promise is being made tangible.",
      "✂️ He Cut Them In Half\nCutting animals in half sounds strange to modern readers, but it fits ancient covenant imagery. Passing between pieces could symbolize, 'May this happen to me if I break the covenant.' The ceremony dramatizes the seriousness of the oath.\nThis helps us understand the weight of Genesis 15. God is not giving Abram a vague encouragement. He is binding Himself with covenant seriousness.",
      "🦅 Birds Of Prey Came Down\nThe birds come down on the carcasses, and Abram drives them away. The covenant is being prepared, but interference appears before completion. Abram must wait and guard the pieces.\nThis little scene matches the larger story. The promise is real, but the road will involve delay, threat, and persistence. Abram is learning to wait around a promise not yet finished.",
    ],
    truths: [
      "🧠 Assurance often remembers God's past faithfulness.\nGod reminds Abram that He brought him out of Ur. The past calling supports present trust.\nWhen the future feels uncertain, remembering what God has already done can strengthen faith for what He has promised next.",
      "❓ Faith can ask for confirmation.\nAbram asks, 'How shall I know?' and God answers with covenant. The question is not treated as unbelief.\nThis helps readers who think faith means never asking anything. The Bible shows a trusting question brought honestly to God.",
      "🤝 Covenant is serious commitment.\nThe animal ceremony communicates oath-level seriousness. God's promise is not casual.\nGenesis uses covenant imagery so Abram can understand that the promise rests on a binding commitment from God.",
      "⏳ Waiting may include guarding hope.\nAbram drives away birds while the covenant moment unfolds. He is waiting, but not careless.\nSometimes faith has to protect hope from distractions, fears, and threats while waiting for God to finish what He has begun.",
      "📍 The land promise is grounded in God's identity.\nGod says He brought Abram out to give him the land. The promise rests on who God is and what God has done.\nThis is important because Abram's assurance is not grounded in Abram's control. It is grounded in Yahweh's faithful purpose.",
    ],
  },
  "Genesis 15:12-16": {
    phrases: [
      "🌙 A Deep Sleep Fell On Abram\nThis deep sleep places Abram in a passive position while God reveals the future. The same kind of deep sleep language appears when God forms Eve in Genesis 2. Here, Abram is not controlling the covenant moment; he is receiving revelation.\nThat matters because covenant assurance comes from God. Abram is not manufacturing certainty. God is showing him what only God can know.",
      "🌑 Terror And Great Darkness\nThe promise includes a dark revelation. Abram experiences dread because God is about to tell him the road ahead will include suffering. The covenant is not sentimental; it is honest.\nThis helps readers understand biblical promise. God's promise does not always mean the path will be easy. Sometimes God gives assurance by telling the truth about hardship and rescue.",
      "🏚️ Your Offspring Will Be Strangers\nGod tells Abram his descendants will live as strangers in a land not theirs. This points forward to Israel's future in Egypt. The promise will pass through displacement before fulfillment.\nThis is a huge Bible connection. Genesis 15 gives the outline of Exodus before Exodus happens: sojourning, affliction, judgment, deliverance, and return.",
      "⛓️ Afflicted Four Hundred Years\nThe number marks a long season of oppression. The promise will not be fulfilled quickly from a human perspective. Generations will live and die before the land promise reaches its next major stage.\nThis is sobering. God is faithful, but His timeline is larger than Abram's lifetime. The covenant includes a long road.",
      "⚖️ I Will Judge The Nation\nGod promises that the oppressing nation will not have the final word. The same God who allows the long road also commits to judge injustice. Egypt's power will be real, but temporary.\nThis matters because biblical patience is not the same as God ignoring evil. God may wait, but He does not forget oppression.",
      "🕊️ You Shall Go To Your Fathers In Peace\nGod gives Abram a personal word of peace. Abram will not see every part of the promise fulfilled in his lifetime, but he will die under God's care.\nThat is a different kind of assurance. God's faithfulness to the promise is bigger than what Abram personally gets to witness. Abram can rest because the future is in God's hands.",
      "🧱 The Iniquity Of The Amorites Is Not Yet Complete\nThis line shows God's patience even toward the peoples in Canaan. The land will not be given to Abram's descendants until the moral situation reaches its appointed point. God is not impulsive in judgment.\nThis is an important theological balance. God promises land to Abram, but He also judges with patience and timing. The conquest is not presented as random greed.",
    ],
    truths: [
      "⏳ God's promise can include a long timeline.\nAbram hears that fulfillment will involve generations of waiting and affliction. The promise is real, but not quick.\nThis helps readers understand that God's faithfulness is not measured only by immediate results. His purposes can stretch across centuries.",
      "🌑 God tells the truth about suffering.\nThe covenant vision includes darkness, fear, slavery, and affliction. God does not hide the hard road.\nThis is actually mercy. God gives Abram a realistic promise, not a shallow one. Hope in the Bible can face darkness honestly.",
      "⚖️ God sees oppression and will judge it.\nThe nation that afflicts Abram's descendants will be judged. Egypt's future power is not ultimate.\nThis truth matters for anyone reading from pain. God's patience is not indifference, and injustice does not get the last word.",
      "🕊️ Personal peace can coexist with unfinished promise.\nAbram will die in peace before seeing the full land promise completed. That does not mean God failed.\nSometimes faith means trusting a future God will fulfill beyond our own lifetime. Abram's peace rests in God's covenant, not in seeing everything finished.",
      "🧭 God's judgment has timing and patience.\nThe Amorites' iniquity is not yet complete. God does not judge before the appointed time.\nThis gives moral depth to the land promise. God's plan includes patience, justice, and timing that humans cannot fully control.",
    ],
  },
  "Genesis 15:17-21": {
    phrases: [
      "🌘 When The Sun Went Down\nThe covenant moment happens in darkness. Abram has heard about future affliction, and now the scene becomes solemn and mysterious. Darkness does not mean God is absent; it becomes the setting where God binds Himself to the promise.\nThis matters because some of God's deepest assurances come in dark places. The night becomes the place of covenant, not abandonment.",
      "🔥 A Smoking Furnace And A Burning Torch\nThese fiery symbols represent God's presence passing through the pieces. Smoke and fire later appear in major moments of God's presence, including Sinai and the wilderness. Genesis 15 gives an early picture of holy, covenant-making presence.\nThe imagery is intense because the covenant is serious. God is not simply giving Abram an encouraging thought. He is pledging Himself.",
      "🚶 Passed Between The Pieces\nIn an ancient covenant ceremony, passing between the pieces could symbolize taking the covenant curse if the promise is broken. The shocking part is that Abram does not pass through. God alone passes through.\nThis is the heart of Genesis 15. God takes the covenant obligation on Himself. The promise rests finally on God's faithfulness, not Abram's ability to carry the whole weight.",
      "🤝 Yahweh Made A Covenant With Abram\nThis is the formal covenant moment. God binds His promise to Abram in a solemn way. The promises of land and offspring are not casual hopes; they are covenant commitments.\nThis gives Abram assurance after his question, 'How shall I know?' The answer is not a paragraph of explanation only. It is God pledging Himself in covenant.",
      "📍 To Your Offspring I Give This Land\nThe land is promised to Abram's offspring, even though Abram currently owns none of it in the way the promise describes. This keeps the future orientation clear.\nThe promise is concrete: descendants and land. But it is also theological: God is the giver, and His timing will govern fulfillment.",
      "🗺️ From The River Of Egypt To The Great River\nThese boundary markers describe the scope of the promised land in broad terms. The promise is not vague; it has geography. Ancient readers would hear real territorial language.\nThis reminds us that God's covenant promises in Genesis are not only inner spiritual feelings. They unfold in history, land, families, nations, and real places.",
    ],
    truths: [
      "🔥 God binds Himself to His promise.\nThe fire passes between the pieces while Abram watches. God is the active covenant maker.\nThis is the anchor of the chapter. Abram's assurance comes from God's self-commitment, not Abram's ability to guarantee the future.",
      "🚶 The covenant rests on God first.\nAbram does not walk between the pieces. God does.\nThat detail teaches grace at a deep level. Abram will obey and stumble and grow, but the covenant's foundation is Yahweh's faithfulness.",
      "🌘 Darkness is not absence.\nThe covenant happens after sunset, in a heavy and mysterious scene. Yet God is powerfully present.\nThis helps readers who associate darkness only with abandonment. In Genesis 15, the dark becomes the place where God gives assurance.",
      "📍 God's promises enter real history.\nThe land boundaries and named peoples show that the promise is concrete. It touches geography, nations, and future generations.\nBiblical faith is not vague optimism. It trusts a God who works in real places and real timelines.",
      "🤝 Covenant assurance answers honest faith.\nAbram asked how he would know, and God answered with covenant. God does not crush Abram for needing assurance.\nThis shows God's kindness. He strengthens faith by binding His word to a solemn promise.",
    ],
  },
};

const DAY_SIX_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 14:1-12": {
    phraseNote:
      "Reading tip: Genesis 14 is where Lot's choice in Genesis 13 becomes a real-world problem. Watch how the story moves from attractive land to dangerous location to captivity. The Bible is teaching consequences through narrative, not a lecture.",
    truthNote:
      "This section is not just ancient war trivia. It teaches that faith has to live in a world of politics, conflict, danger, and consequences. Lot's trouble sets the stage for Abram's courage.",
  },
  "Genesis 14:13-16": {
    phraseNote:
      "Reading tip: Abram's household is larger and more organized than a modern reader may imagine. He is a sojourner, but he is also a clan leader with trained men and real responsibility. That makes his rescue both courageous and practical.",
    truthNote:
      "This section teaches that faith is not passive. Abram trusts God, but he still acts with strategy, risk, and loyalty. Biblical trust can pick up responsibility when someone else is in danger.",
  },
  "Genesis 14:17-20": {
    phraseNote:
      "Reading tip: Melchizedek matters beyond this scene. Psalm 110 and Hebrews later use him to help explain a priest-king pattern that points beyond the Levitical priesthood. Genesis introduces the mystery; later Scripture unfolds it.",
    truthNote:
      "This section teaches that victory must be interpreted by worship. Melchizedek names God as the deliverer, so Abram's success is not left to ego or military pride. God Most High gets the glory.",
  },
  "Genesis 14:21-24": {
    phraseNote:
      "Reading tip: compare Sodom's offer with Melchizedek's blessing. One voice blesses Abram under God Most High; the other offers goods from a corrupt city. Abram has to discern not only what is available, but what story the gift will tell.",
    truthNote:
      "This section teaches clean dependence. Abram refuses a reward that would let Sodom claim credit for his blessing. Faith sometimes says no to a benefit because the source would confuse the witness.",
  },
  "Genesis 15:1-6": {
    phraseNote:
      "Reading tip: this is one of the Bible's key faith passages. Abram's belief is not vague religious optimism; it is trust in a specific promise from Yahweh while Abram is still childless. Faith is tied to God's spoken word.",
    truthNote:
      "This section teaches the foundation of righteousness by faith. Abram is counted righteous before circumcision and before the law of Moses. Later Scripture uses this moment to show that people are made right with God by trusting His promise.",
  },
  "Genesis 15:7-11": {
    phraseNote:
      "Reading tip: the covenant ceremony may feel strange, but it was meaningful in Abram's world. God uses a serious ancient oath form to make His promise visible. The ritual is the answer to Abram's request for assurance.",
    truthNote:
      "This section teaches that God is kind to faith that needs strengthening. Abram asks how he will know, and God does not dismiss him. God gives covenant assurance in a form Abram can understand.",
  },
  "Genesis 15:12-16": {
    phraseNote:
      "Reading tip: this passage gives a preview of Exodus before Exodus happens. Strangers in another land, affliction, judgment on the oppressor, coming out with possessions, and returning later are all planted here.",
    truthNote:
      "This section teaches that promise and suffering are not always opposites. God can reveal a hard road and still be faithful. The future difficulty is held inside the covenant, not outside God's control.",
  },
  "Genesis 15:17-21": {
    phraseNote:
      "Reading tip: the most important detail is who passes between the pieces. Abram does not. God does. That visual tells the reader where the covenant's final weight rests.",
    truthNote:
      "This section teaches covenant grace. Abram receives assurance because God binds Himself to the promise. The future rests on Yahweh's faithfulness before it rests on Abram's performance.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_SIX_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_SIX_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_SEVEN_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 16:1-3": {
    phrases: [
      "⏳ Sarai Bore Him No Children\nThis line brings the main tension of Abram's story back to the surface. God promised descendants, but Sarai is still barren. The promise is real, but the visible situation has not changed.\nThat matters because waiting is the pressure point of Genesis 16. Sarai is not making a random decision; she is responding to years of disappointment. The chapter shows what can happen when long waiting turns into control.",
      "👩‍🦱 Hagar The Egyptian\nHagar is introduced as Sarai's Egyptian servant. Her Egyptian identity may connect back to Abram and Sarai's time in Egypt in Genesis 12, where Abram's fear created trouble and wealth came into the household.\nThis detail is important because Hagar is not just a tool in the story. She is a real woman, from another people, with little power in the household. Genesis will soon show that God sees her too.",
      "🗣️ The Lord Has Prevented Me From Bearing Children\nSarai interprets her barrenness as something the Lord has allowed. She is not an atheist in this moment; she knows God is involved. But she moves from acknowledging God's sovereignty to trying to solve the problem her own way.\nThis is a subtle but important lesson. A person can believe God is real and still try to force an outcome when waiting becomes painful. Theology without trust can still become control.",
      "🤲 Go In To My Servant\nIn the ancient world, using a servant as a surrogate was a known practice for producing an heir. That cultural background helps explain why Sarai's plan may have sounded practical or socially understandable.\nBut understandable does not mean faithful. Genesis is not approving the plan just because it was culturally available. The Bible often shows a common custom while also revealing the damage it causes.",
      "👶 That I May Obtain Children By Her\nSarai wants the promised family, but she tries to obtain it through her own arrangement. The desire for a child is deeply human, but the method treats Hagar's body as a solution to someone else's pain.\nThis phrase helps us see the moral danger of forcing promise. When people try to control what God promised to give, other people often get used, pressured, or wounded.",
      "👂 Abram Listened To The Voice Of Sarai\nThis phrase echoes Adam listening to Eve in Genesis 3. The point is not that listening to a wife is bad; the point is that Abram follows a plan God did not command. The echo tells readers to be alert.\nAbram is passive here. He does not bring the promise back before God, protect Hagar, or lead with faith. He simply goes along with the shortcut, and the household begins to fracture.",
    ],
    truths: [
      "⏳ Waiting can tempt people to control.\nSarai's pain is real, but her plan moves ahead of God's promise. Waiting exposes whether trust is still alive.\nThis is one of the main lessons of Genesis 16. When God's timing feels slow, the temptation is to create a shortcut that looks practical but is not faithful.",
      "🧍 People must not become tools for someone else's promise.\nHagar is treated as the means to solve Sarai and Abram's problem. Genesis lets us see the human cost of that decision.\nThis truth matters deeply. A plan can look efficient and still be wrong if it uses a person instead of loving them.",
      "📜 Culture does not decide faithfulness.\nSurrogacy through a servant may have been culturally known in Abram's world. But Genesis shows the damage of the plan.\nThe Bible teaches readers to evaluate customs under God's promise and character, not merely by what society allows.",
      "👂 Passive leadership can still be failure.\nAbram listens and goes along. He does not appear violent or dramatic, but his passivity causes harm.\nGenesis shows that failure is not only doing the wrong thing loudly. It can also be refusing to lead with trust when it matters.",
      "🤝 God's promise does not need human manipulation.\nGod promised descendants, but Sarai and Abram try to force the timeline. The result is pain, not peace.\nThis teaches that the promise is carried by God's faithfulness. Human schemes cannot improve what God has pledged to do.",
    ],
  },
  "Genesis 16:4-6": {
    phrases: [
      "🤰 She Conceived\nHagar conceives quickly, which makes Sarai's barrenness feel even sharper. The plan seems successful on the surface, but the household immediately becomes more painful. What looked like a solution becomes a new wound.\nThis is important because Genesis often shows shortcuts producing visible results. The question is not only, 'Did it work?' The deeper question is, 'What kind of fruit did it produce?'",
      "👀 Her Mistress Was Despised In Her Eyes\nHagar's new status changes the household dynamics. Pregnancy gives her a kind of honor Sarai does not have, and contempt enters the relationship. The powerless servant now has something the powerful mistress lacks.\nThe phrase reveals how quickly a plan built on control turns into rivalry. When people are placed in unhealthy roles, resentment can grow in every direction.",
      "⚖️ My Wrong Be On You\nSarai blames Abram for the pain that came from the plan she proposed and he accepted. This is painfully human. When shortcuts produce damage, people often look for someone else to carry the guilt.\nThe phrase shows the household unraveling. Instead of repentance, there is accusation. Instead of trust, there is blame.",
      "👨‍⚖️ May Yahweh Judge Between You And Me\nSarai brings God's name into the conflict, but the situation itself came from not waiting on God's promise. This makes the moment tense. She wants God to judge the pain, but the household needs God's correction too.\nThis is a warning about using spiritual language during conflict. Invoking God's name does not automatically mean our hearts are aligned with Him.",
      "🤷 Behold, Your Servant Is In Your Hand\nAbram hands Hagar back to Sarai's control. He avoids responsibility instead of protecting the vulnerable person now caught in the household conflict. His words may sound neutral, but they leave Hagar exposed.\nThis is another moment of passive failure. Abram has power, but he uses it to step back instead of making peace or justice.",
      "🏃 She Fled From Her Face\nHagar runs away because the situation has become unbearable. Flight is her only visible option. The woman used in the shortcut is now the one carrying the deepest cost.\nThis detail matters because Genesis follows Hagar into the wilderness. The household may push her out of sight, but God will not.",
    ],
    truths: [
      "🌱 Shortcuts can produce results and still produce damage.\nHagar conceives, so the plan appears to work. But the emotional and relational fruit is bitter.\nGenesis teaches that success cannot be measured only by whether we got the desired outcome. We must ask what the shortcut did to people and to trust.",
      "🔥 Control often creates rivalry.\nSarai's plan places Hagar in a painful role, and contempt grows. The household becomes divided.\nWhen people try to force promise through control, relationships often become battlegrounds. Genesis shows the cost honestly.",
      "🪞 Blame often follows manipulation.\nSarai blames Abram, Abram shifts responsibility, and Hagar suffers. Nobody handles the conflict well.\nThis is realistic. When people act from fear and control, they often protect themselves with accusation instead of repentance.",
      "🛡️ Power should protect the vulnerable.\nAbram has authority in the household, but he does not protect Hagar. Sarai has power over Hagar and uses it harshly.\nGenesis forces the reader to notice the vulnerable person in the room. God's later response to Hagar shows that He notices her too.",
      "👁️ People pushed out of sight are not out of God's sight.\nHagar flees, but the story follows her. That means she matters.\nThis is one of the beautiful turns in Genesis 16. Human households may discard people, but God sees them in the wilderness.",
    ],
  },
  "Genesis 16:7-12": {
    phrases: [
      "👼 The Angel Of Yahweh Found Her\nThis is the first appearance of the angel of the Lord in Scripture. The language is striking because Hagar is not looking for God in a temple or altar scene; she is fleeing in distress. Yet God finds her.\nThe phrase matters because Hagar is an Egyptian servant woman, pregnant and mistreated. Genesis shows God's attention reaching the person with the least power in the situation.",
      "💧 By A Fountain Of Water In The Wilderness\nThe location is tender and practical. Hagar is in the wilderness, where survival is fragile, but she is found near water. Water in the wilderness often becomes a sign of God's care and preservation.\nThis setting tells a story by itself. Hagar is outside the household, but not outside God's reach. She is in a dangerous place, but God meets her where life can still be sustained.",
      "❓ Where Have You Come From And Where Are You Going\nGod's messenger asks Hagar a question that gives her dignity. The question invites her to name her story: where she came from and where she is going. It treats her as a person with a past and a future.\nThis is a beautiful contrast to how she has been used. In Abram and Sarai's plan, Hagar was treated like a means. Here, God engages her as someone whose story matters.",
      "🏠 Return To Your Mistress\nThis command is difficult for modern readers because Hagar is being sent back to a painful household. The passage does not excuse Sarai's harshness, and it does not erase Hagar's suffering. It shows God preserving Hagar and her child in a complicated world.\nThe key is that Hagar does not return unseen or unnamed. She returns with God's word, God's promise, and a future spoken over her son.",
      "👶 Ishmael\nThe name Ishmael means 'God hears.' Before the child is born, God names him according to Hagar's affliction. His name will forever testify that God heard his mother's suffering.\nThat is powerful. The child produced by human control is still seen by God. The pain around his conception does not make him invisible or worthless.",
      "👂 Yahweh Has Heard Your Affliction\nThis is one of the clearest statements of God's compassion in the chapter. God does not only see Hagar; He hears her affliction. Her pain has reached heaven.\nThe phrase teaches that God listens to the voice of the oppressed, even when powerful people have ignored them. Hagar's tears are not background noise to God.",
      "🏹 He Shall Be A Wild Donkey Of A Man\nThis description sounds strange, but it likely pictures Ishmael as strong, free, untamed, and difficult to dominate. His future will involve conflict, independence, and life outside easy control.\nThe prophecy is not saying Ishmael is worthless. God gives him a future and later promises to make him a great nation. His life will be complicated, but he is still under God's notice.",
    ],
    truths: [
      "👁️ God finds people in the wilderness.\nHagar is fleeing, vulnerable, and outside the household, yet God meets her. She is not too far away to be found.\nThis truth is central to Genesis 16. God does not only speak to Abram. He also finds the wounded person affected by Abram and Sarai's shortcut.",
      "💬 God gives dignity by asking and naming.\nThe angel asks Hagar where she came from and where she is going, then gives her son a name. God treats her story as important.\nThis matters because wounded people are often talked about instead of spoken to. God speaks to Hagar directly.",
      "👂 God hears affliction.\nIshmael's name becomes a permanent reminder that God hears. Hagar's suffering is not ignored.\nThis is a deep comfort and a serious warning. God hears people whom households, systems, and powerful people may overlook.",
      "🌿 God's mercy can meet people inside messy consequences.\nThe situation came from human control, but God still enters it with care and promise. He does not wait for the family to become clean before showing mercy.\nThis helps readers understand grace. God can bring protection and future into painful situations people should never have created.",
      "🧭 God's instructions can be hard and still come with promise.\nHagar is told to return, but she returns with God's word over her and her son. The command is not bare abandonment.\nGenesis holds complexity here. God's care does not always remove every hard circumstance immediately, but He does not send Hagar back unseen.",
    ],
  },
  "Genesis 16:13-16": {
    phrases: [
      "👁️ You Are El Roi\nHagar names God as El Roi, often understood as 'the God who sees me.' This is one of the most personal God-names in Genesis. It comes from an Egyptian servant woman in the wilderness, not from a powerful patriarch at an altar.\nThat is an aha fact worth noticing. The first person in Scripture to give God a name like this is Hagar. The wounded outsider becomes a theologian of God's seeing.",
      "🗣️ Have I Even Here Looked After Him Who Sees Me\nHagar is amazed that she has encountered the God who sees her and lived. The wording is difficult, but the sense is wonder: she has been seen by God in her affliction and has survived the encounter.\nThis matters because being seen by people has brought Hagar pain, use, and contempt. Being seen by God brings dignity, promise, and life.",
      "💧 Beer Lahai Roi\nThe well receives a name connected with the living One who sees. Places in Genesis often get named after encounters with God. The geography becomes a memory marker.\nThis well will matter again later in Genesis. The name keeps Hagar's encounter from disappearing. A wounded woman's meeting with God becomes part of the map.",
      "👶 Hagar Bore Abram A Son\nThe child is born, and the shortcut now has a living result. Ishmael is not an idea, argument, or problem to solve. He is a son with a future.\nGenesis wants us to see that human schemes create real lives, real relationships, and real consequences. God will care for Ishmael, even though he is not the covenant son promised through Sarah.",
      "🏷️ Abram Called The Name Of His Son Ishmael\nAbram names the child what God had told Hagar. That means Hagar's wilderness word is recognized inside Abram's household. The name 'God hears' enters the family story.\nThis is important because it validates that God truly spoke to Hagar. Her encounter was not private imagination; it shapes the child's identity.",
      "⌛ Abram Was Eighty-Six Years Old\nThis age marker reminds us that time keeps passing. Abram is eighty-six when Ishmael is born, and Genesis 17 will not begin until he is ninety-nine. There will be thirteen more years before the next major covenant moment.\nThe promise is still not fulfilled through Sarah. Genesis is making us feel the long waiting and the consequences of trying to manage that wait.",
    ],
    truths: [
      "👁️ God sees the person others use or overlook.\nHagar has been treated as a tool in someone else's plan, but God sees her as a person. She receives one of the most tender encounters in Genesis.\nThis truth matters because the Bible refuses to let powerful people's stories erase vulnerable people's pain. God sees the hidden person.",
      "🧠 Suffering people can become deep witnesses.\nHagar names God El Roi. Her pain becomes the place where she learns something true about God.\nThis does not make the mistreatment good. It means God can reveal Himself powerfully to people in places they never should have been forced to enter.",
      "📍 Encounters with God create memory.\nThe well is named after Hagar's encounter. The place remembers what God did there.\nGenesis often names places because faith needs memory markers. Remembering where God met someone helps future readers trust His character.",
      "👶 Ishmael matters to God.\nIshmael is not the covenant child through Sarah, but he is still named, heard, and given a future. The Bible can distinguish roles without denying value.\nThis is important. Being outside the covenant line does not mean being invisible to God's compassion.",
      "⏳ The promise is still waiting.\nIshmael's birth does not solve the promise through Sarah. Abram is eighty-six, and more waiting is ahead.\nGenesis teaches that shortcuts may create new realities, but they do not replace God's intended promise.",
    ],
  },
  "Genesis 17:1-8": {
    phrases: [
      "⏳ Abram Was Ninety-Nine Years Old\nThirteen years pass between Ishmael's birth and Genesis 17. That silence matters. Abram has lived for years with the result of the shortcut, while the promised son through Sarah is still unseen.\nGod appears when human possibility is even smaller. Abram is older, Sarai is still barren, and the promise now looks impossible by every normal measure. That is exactly where God speaks covenant clarity.",
      "💪 I Am God Almighty\nGod reveals Himself as El Shaddai, often translated God Almighty. The title emphasizes God's power and sufficiency. Abram's body, Sarah's barrenness, and the long delay are not stronger than God.\nThis name fits the moment. Abram needs to know that the promise rests on the Almighty, not on human fertility, age, strategy, or strength.",
      "🚶 Walk Before Me And Be Blameless\nGod calls Abram to live his whole life before Him with integrity. Blameless does not mean sinless perfection; it means wholehearted covenant faithfulness. Abram is called away from shortcuts into a life openly lived before God.\nThis is important because grace and obedience belong together. God gives covenant promise, and Abram is called to walk in covenant loyalty.",
      "🤝 I Will Make My Covenant Between Me And You\nGod takes the initiative again. He says 'my covenant,' reminding Abram that the promise belongs to God's commitment. Abram receives it and must respond, but God establishes it.\nThis is covenant language of relationship, obligation, and promise. God is not merely giving Abram advice; He is binding Abram's future to His word.",
      "🏷️ Your Name Shall Be Abraham\nAbram means exalted father, but Abraham is connected with father of a multitude. The name change speaks promise over him before the visible reality exists. He is renamed according to God's future, not his present circumstances.\nImagine carrying the name 'father of many' while still waiting for Isaac. Every time the name is spoken, the promise is being preached.",
      "🌍 Father Of A Multitude Of Nations\nThe promise is bigger than one child. Abraham will become connected to nations, kings, and a long covenant future. God is expanding Abram's imagination beyond a private family dream.\nThis phrase connects back to the nations scattered in Genesis 10-11. God is forming one family, but the scope of the promise is wide.",
      "📍 The Land Of Canaan For An Everlasting Possession\nThe land promise is repeated and deepened. Canaan is named as the land where Abraham is currently a sojourner, but God promises it to his offspring. The word everlasting ties the promise to covenant endurance.\nThis is not abstract spirituality. God's covenant includes people, generations, and place. Abraham's tent life is being held by a promise bigger than what he owns.",
    ],
    truths: [
      "💪 God's power answers human impossibility.\nGenesis 17 opens when Abraham is ninety-nine and the promise through Sarah still has not happened. Human ability has weakened, but God's ability has not.\nThis teaches that delay can make the promise look less possible to us while making God's power more visible when He fulfills it.",
      "🏷️ God names people by promise.\nAbram becomes Abraham before the multitude is visible. God speaks identity from the future He will create.\nThis matters because God's word can define someone more deeply than present evidence. Abraham's new name is a daily reminder that God sees what He has promised.",
      "🚶 Covenant grace calls for covenant walking.\nGod establishes the covenant, then calls Abraham to walk before Him and be blameless. Promise does not remove obedience.\nThe Bible holds these together. Abraham does not earn the covenant, but he is called to live faithfully inside it.",
      "🌍 The promise is larger than one household.\nAbraham will be father of many nations. The covenant has a wide horizon.\nGenesis keeps connecting Abraham's family to the world. God's plan is moving toward blessing beyond one tent, one tribe, or one generation.",
      "🤝 The covenant rests on God's initiative.\nGod says 'I will' throughout this section. Abraham responds, but God establishes the future.\nThis anchors the story. Human waiting, weakness, and even prior shortcuts do not cancel God's covenant faithfulness.",
    ],
  },
  "Genesis 17:9-14": {
    phrases: [
      "🧾 You Shall Keep My Covenant\nGod's covenant includes a response from Abraham and his household. Keeping the covenant means living as people marked by God's promise. It is not just a thought Abram carries privately.\nThis matters because biblical covenant is relational. God commits Himself, and His people are called to live in a way that remembers and honors that commitment.",
      "✂️ Every Male Among You Shall Be Circumcised\nCircumcision becomes the physical sign of the covenant for Abraham's household. It marks the male reproductive organ because the covenant promise is tied to offspring, generations, and the promised seed.\nThis is not random. The sign is placed on the part of the body connected with fatherhood because God is promising descendants Abraham cannot produce by strength alone.",
      "👶 Eight Days Old\nThe sign is given to baby boys at eight days old, before they can understand or choose the covenant for themselves. This shows the generational nature of the promise. Children are born into a household marked by God's covenant.\nThat does not mean personal faith becomes unnecessary. It means the family line is being visibly claimed by God's promise from the beginning of life.",
      "🏠 Born In The House Or Bought With Money\nThe covenant sign includes not only Abraham's biological descendants, but also males in his household. Servants and household members are brought under the covenant sign too.\nThis shows that Abraham's household is larger than a modern nuclear family. It also shows that the covenant mark reaches everyone under his household authority, not only the most privileged family members.",
      "🩸 In Your Flesh\nThe covenant is marked in the body. It is not only a spoken idea or a written document. Abraham's household carries the sign physically.\nThat tells us the covenant touches real life. God's promise is not detached from bodies, family, sexuality, generations, and daily identity. The sign makes the promise visible and costly.",
      "⚠️ Shall Be Cut Off\nThe warning is serious because the covenant is serious. To reject the sign is to reject the covenant identity God gave Abraham's household.\nThis phrase shows that grace is not casual. God's promise is a gift, but treating the covenant as meaningless is not presented as a small issue.",
    ],
    truths: [
      "✂️ Covenant signs teach memory and identity.\nCircumcision marks Abraham's household as belonging to God's promise. The sign helps every generation remember who they are.\nBiblical signs are not magic by themselves. They point to God's covenant and call people to live faithfully before Him.",
      "👶 God's promise is generational.\nThe sign is given to children at eight days old. The covenant reaches into the next generation before they can understand its full meaning.\nGenesis teaches that God's work is bigger than one adult's private spirituality. Families and future generations are in view.",
      "🩸 The promise is marked in embodied life.\nCircumcision is physical, personal, and connected to offspring. The covenant is not abstract.\nThis reminds readers that biblical faith involves bodies, households, practices, and visible obedience. God's promise enters real human life.",
      "🏠 The household is included.\nServants and those bought with money are included in the sign. Abraham's covenant responsibility extends to the people under his care.\nThis challenges a purely individual view of faith. In Genesis, the household is a place where covenant identity is taught and marked.",
      "⚠️ Rejecting the covenant sign is serious.\nThe warning about being cut off shows that the sign cannot be treated lightly. It represents belonging to God's covenant people.\nGrace does not mean indifference. The God who gives the covenant also calls for reverent response.",
    ],
  },
  "Genesis 17:15-22": {
    phrases: [
      "👑 Sarai Shall Be Sarah\nGod changes Sarai's name too. Sarah is connected with princess, and the new name fits the promise that kings and nations will come from her. She is not a background character in the covenant.\nThis matters because Genesis 16 showed people trying to work around Sarah's barrenness. Genesis 17 makes clear that Sarah herself is central to the promised line.",
      "🙌 I Will Bless Her\nGod speaks blessing directly over Sarah. The promised son will not come through Hagar as a replacement plan; he will come through Sarah by God's power. Her barrenness is not the end of her story.\nThis is a strong correction to the shortcut of Genesis 16. God's promise does not bypass the woman He intended to bless.",
      "😂 Abraham Fell On His Face And Laughed\nAbraham's laughter is a mix of amazement, disbelief, and the absurdity of the promise from a human viewpoint. He is nearly one hundred, and Sarah is ninety. The promise sounds impossible.\nGenesis does not hide this reaction. Faith is growing in a man who still struggles to imagine how God's word can happen. The laughter sets up Isaac's name, which means laughter.",
      "👦 Oh That Ishmael Might Live Before You\nAbraham loves Ishmael and asks God to bless him. This is a tender moment. Abraham is not simply rejecting Ishmael; he wants his son to live under God's care.\nGod answers with mercy for Ishmael, but also with clarity. Ishmael will be blessed, but Isaac will carry the covenant line. Love for Ishmael does not change God's chosen promise through Sarah.",
      "🏷️ You Shall Call His Name Isaac\nGod names Isaac before he is conceived. Isaac means laughter, turning the laughter of impossibility into the name of the promised child. Every time Isaac's name is spoken, it remembers the unbelievable nature of God's promise.\nThis is beautiful. God does not erase the laughter; He redeems it into testimony. The impossible promise will become a child people can call by name.",
      "🤝 I Will Establish My Covenant With Him\nGod clearly identifies Isaac as the covenant son. Ishmael receives blessing, multiplication, and a future, but the covenant line goes through Isaac. Genesis is careful to distinguish blessing from covenant role.\nThat distinction matters. God can show real mercy to Ishmael while still choosing Isaac for a specific purpose in the promise story.",
      "⬆️ God Went Up From Abraham\nThe encounter ends with God going up from Abraham. The conversation is over, the promise is clear, and Abraham now has a command to obey. Revelation leads to response.\nThis closing line moves the scene from divine speech to human action. Abraham must now mark the covenant in his household.",
    ],
    truths: [
      "👑 Sarah is central to the promise.\nGod changes Sarah's name and blesses her directly. The covenant child will come through her.\nThis corrects the shortcut of Genesis 16. God's plan does not erase Sarah because her body seems impossible. He names and includes her.",
      "😂 God can turn impossible laughter into testimony.\nAbraham laughs because the promise sounds impossible. God names the child Isaac, which means laughter.\nThis is not shallow humor. The name will forever remind the family that God's promise was beyond human ability from the start.",
      "👦 God can bless someone without making them the covenant line.\nIshmael is loved, heard, and blessed, but Isaac carries the covenant. Genesis holds both truths.\nThis helps readers avoid flattening the story. Different roles do not mean different levels of human value before God.",
      "🤝 Covenant clarity matters.\nGod names Isaac and identifies him as the covenant son before he is born. The promise is not left vague.\nAfter the confusion of Genesis 16, Genesis 17 brings precision. God's word clarifies what human shortcuts blurred.",
      "⏳ God's promise may wait until it is humanly impossible.\nAbraham and Sarah are far beyond normal childbearing expectations. That is the point.\nThe covenant child will arrive as a work of God, not the achievement of human planning. The impossible setting magnifies the giver.",
    ],
  },
  "Genesis 17:23-27": {
    phrases: [
      "✅ That Very Same Day\nAbraham obeys immediately. He does not delay, debate, or wait for Isaac to appear first. The covenant sign is applied while the promised child is still unseen.\nThis detail shows faith in action. Abraham believes God's word enough to obey before the visible fulfillment arrives. Same-day obedience matters in this scene.",
      "👦 Ishmael His Son\nIshmael is included in the circumcision of the household. Though he is not the covenant line through whom Isaac's promise will come, he is still part of Abraham's household and receives the sign.\nThis is another reminder that Ishmael is not discarded. His role is different, but he is included in Abraham's immediate obedience.",
      "🏠 All Born In His House\nThe whole household is marked, not only Abraham. His obedience has communal reach. Everyone under his covenant responsibility is brought into the sign.\nThis shows the scale of Abraham's leadership. Faith is not only a private feeling in his heart; it reshapes the identity of his house.",
      "💰 Bought With His Money\nThis phrase refers to servants or household members acquired in the social structures of the ancient world. Modern readers should not flatten ancient household systems into one simple category, but we should notice that these people are included in the covenant sign.\nThe promise mark reaches beyond biological descent. Abraham's covenant household includes people who are socially connected to him, not only blood relatives.",
      "✂️ Circumcised The Flesh\nThe physical act marks the covenant in the body. It is costly, visible within the household, and impossible to reduce to a mere idea. Abraham's faith takes embodied form.\nThis is important because Genesis does not separate belief from obedience. The man counted righteous by faith in Genesis 15 obeys the covenant command in Genesis 17.",
      "⌛ Abraham Was Ninety-Nine Years Old\nThe chapter ends reminding us of Abraham's age. He is old, Isaac is still unborn, and yet the covenant sign is now on his household. The promise is marked before it is seen.\nThat is the tension of faith. Abraham's body carries the sign of a future only God can bring.",
    ],
    truths: [
      "✅ Faith responds when God speaks.\nAbraham obeys that same day. He does not wait until the promise looks easier.\nThis shows mature faith. Believing God's promise does not cancel obedience; it fuels obedience.",
      "🏠 Covenant obedience affects the household.\nAbraham's whole house is marked. His response to God shapes the people under his care.\nGenesis presents faith as communal and generational. One person's obedience can create a new identity for a household.",
      "✂️ The sign comes before visible fulfillment.\nIsaac has not been born yet, but Abraham obeys the covenant sign. He acts on God's word before seeing the child.\nThis is a deep faith lesson. Sometimes obedience marks our lives before the promise has appeared in our hands.",
      "👦 Ishmael is included, though Isaac is promised.\nIshmael receives the sign in Abraham's household, even though Isaac will carry the covenant line. Genesis keeps showing God's care for Ishmael while maintaining covenant clarity.\nThis matters because the Bible can be specific about promise without being careless about people outside that specific role.",
      "🧍 Faith is embodied.\nCircumcision shows that covenant life touches the body, family, and daily identity. Abraham's faith is not invisible only.\nThe Bible's view of faith includes trust, worship, obedience, signs, and practices. What Abraham believes changes how his household lives.",
    ],
  },
};

const DAY_SEVEN_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 16:1-3": {
    phraseNote:
      "Reading tip: Genesis 16 is not just about impatience; it is about what impatience does to people. Sarai and Abram try to solve a promise problem with a household custom, but Hagar becomes the one who carries the cost.",
    truthNote:
      "This section teaches that practical does not always mean faithful. A plan can make sense culturally and still move against trust in God's promise. The Bible asks what the plan does to people and whether God commanded it.",
  },
  "Genesis 16:4-6": {
    phraseNote:
      "Reading tip: watch the emotional chain: conception, contempt, blame, avoidance, harsh treatment, flight. Genesis shows how quickly a shortcut can become relational collapse.",
    truthNote:
      "This section teaches that control spreads damage. Sarai is wounded, Hagar is mistreated, and Abram avoids responsibility. Human schemes often create more pain than the waiting they tried to escape.",
  },
  "Genesis 16:7-12": {
    phraseNote:
      "Reading tip: this is the first angel of the Lord scene, and it happens with Hagar. That placement matters. Genesis centers God's attention on the vulnerable person most people in the household failed to protect.",
    truthNote:
      "This section teaches that God hears affliction before the powerful fix anything. Hagar's encounter shows that God's compassion reaches people caught in the consequences of someone else's choices.",
  },
  "Genesis 16:13-16": {
    phraseNote:
      "Reading tip: do not rush past Hagar naming God. This is one of the most remarkable moments in Genesis: a mistreated Egyptian servant becomes the person who confesses God as the One who sees.",
    truthNote:
      "This section teaches that being seen by God gives dignity human systems may deny. Hagar's story becomes part of the Bible's theology, not a side note to Abraham's family drama.",
  },
  "Genesis 17:1-8": {
    phraseNote:
      "Reading tip: Genesis 17 happens after thirteen years of silence. The long gap makes God's appearance as God Almighty more powerful. The promise has not weakened with time, even though Abraham's body has.",
    truthNote:
      "This section teaches that God defines identity by covenant promise. Abram becomes Abraham before the evidence arrives. God's word names the future before the future can be seen.",
  },
  "Genesis 17:9-14": {
    phraseNote:
      "Reading tip: circumcision is tied to offspring because the promise is tied to descendants. The sign is placed in the body right where Abraham needs to remember that life and future come from God's promise.",
    truthNote:
      "This section teaches that covenant is not only believed privately; it is remembered visibly and generationally. God's promise marks a people and calls them to live as belonging to Him.",
  },
  "Genesis 17:15-22": {
    phraseNote:
      "Reading tip: Sarah's name change is covenant clarity. After Genesis 16 tried to route the promise around her, Genesis 17 says the promised son will come through Sarah herself.",
    truthNote:
      "This section teaches that God does not need to bypass impossibility. Sarah's barrenness is not a reason to replace her in the promise; it is the place where God's power will be shown.",
  },
  "Genesis 17:23-27": {
    phraseNote:
      "Reading tip: the timing matters. Abraham obeys the same day, before Isaac exists. The sign of the promise is placed on the household while the promise still has to be trusted.",
    truthNote:
      "This section teaches that faith and obedience belong together. Abraham was counted righteous by faith in Genesis 15, and that same faith now responds with concrete obedience in Genesis 17.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_SEVEN_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_SEVEN_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_EIGHT_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 18:1-8": {
    phrases: [
      "🌳 The Oaks Of Mamre\nMamre is a real place connected with Abraham's life in Canaan. Abraham has built altars, moved tents, and lived as a sojourner, and now the Lord meets him in the ordinary setting of his tent. The promise story keeps happening in real places, not in vague religious space.\nReading tip: Genesis often uses location as memory. Mamre becomes part of Abraham's walk with God, a place where promise, hospitality, and divine visitation meet.",
      "☀️ The Heat Of The Day\nAbraham is sitting at the tent door during the hottest part of the day, when people would naturally slow down and seek shade. The visitors arrive in a normal daily scene, not during a formal worship service.\nThat matters because God often enters ordinary rhythms. Abraham's tent becomes the setting for holy encounter, showing that divine promise can meet people in the middle of regular life.",
      "🏃 Abraham Ran To Meet Them\nAbraham's running shows urgency, honor, and hospitality. In ancient culture, welcoming travelers mattered deeply because travel could be dangerous and tiring. Abraham does not treat the visitors as interruptions.\nThe detail is striking because Abraham is an older man and a household leader. He humbles himself by running, bowing, and serving. Hospitality becomes a place where reverence is practiced.",
      "🍞 A Little Bread\nAbraham modestly offers a little bread, but then prepares a generous meal. That kind of understatement is common hospitality language: he offers simply, then gives abundantly. The meal includes bread, curds, milk, and a tender calf.\nThis shows more than politeness. Abraham's welcome is costly, attentive, and generous. The scene teaches that receiving others can become a way of honoring God.",
      "👥 Three Men\nThe passage begins with three men, but the chapter also says the Lord appeared to Abraham. Genesis lets the scene unfold slowly, with mystery around the visitors. Later, two go toward Sodom while Abraham remains before the Lord.\nThis is one of those moments where the text invites careful reading. The visitors are not ordinary guests only; divine revelation is happening through this encounter.",
      "🧈 Curds, Milk, And The Calf\nThe meal is rich and generous. Abraham gives fresh bread, dairy, and meat, which would be a significant act of hospitality. He is offering the best available from his household.\nThis matters because covenant faith is not only spoken in prayers. Abraham's faith is embodied in welcome, generosity, preparation, and service.",
    ],
    truths: [
      "🏠 God can meet people in ordinary spaces.\nThe Lord appears while Abraham is by his tent in the heat of the day. This is not a temple scene.\nGenesis teaches that God's promise can enter ordinary life: home, food, visitors, work, and conversation. Holy moments are not always announced by dramatic settings.",
      "🤲 Hospitality can become worshipful attention.\nAbraham welcomes the visitors with urgency and generosity. He treats them as worthy of honor.\nThe Bible often treats hospitality as spiritually serious because it reveals how people receive others. In this scene, Abraham's open tent becomes the place where promise is renewed.",
      "🙇 Greatness in God's story includes humility.\nAbraham is the covenant man, yet he runs, bows, serves, and waits. He is not too important to honor guests.\nThis shows a different kind of greatness than Babel or Sodom. Covenant greatness bends low in service.",
      "🍽️ Generosity gives more than the minimum.\nAbraham offers a little bread but provides a full meal. His actions exceed his words.\nThat teaches a practical truth. Love and honor often show up in the extra care people take, not only in what they say.",
      "👁️ Divine encounters may be recognized gradually.\nThe visitors first appear as men, but the scene becomes a meeting with the Lord. Abraham's welcome opens into revelation.\nGenesis trains readers to pay attention. Sometimes the significance of a moment becomes clear as the story unfolds.",
    ],
  },
  "Genesis 18:9-15": {
    phrases: [
      "❓ Where Is Sarah Your Wife\nThe visitors ask for Sarah by name. That matters because the promise is not only about Abraham. Sarah is central to the covenant child, and God brings her directly into the conversation.\nAfter Genesis 16, where people tried to work around Sarah's barrenness, this question brings Sarah back into focus. The promised son will not bypass her.",
      "⏰ At The Set Time\nGod gives the promise a time marker. The long waiting has not been random; there is an appointed time. Sarah's son will come according to God's timing, not human panic.\nThis phrase teaches that delay is not the same as forgetfulness. God has a set time even when people only feel the years passing.",
      "👶 Sarah Shall Have A Son\nThis is the impossible promise spoken plainly. Sarah is old, and the text makes sure we know childbearing is humanly impossible. The promise now depends completely on God's power.\nThat is the point. Isaac will not be the result of manipulation, youth, or natural likelihood. He will be the child of promise.",
      "🚪 Sarah Was Listening At The Tent Door\nSarah hears the promise from inside the tent. She is not absent from the scene; she is listening at the edge of it. Genesis lets us hear her private reaction.\nThis detail makes the story feel honest. The promise is not received in a perfectly polished spiritual moment. It lands in the heart of a woman who has waited a very long time.",
      "😂 Sarah Laughed Within Herself\nSarah's laugh is internal, quiet, and deeply human. The promise sounds impossible after decades of barrenness and old age. Her laughter is not cartoon unbelief; it is the ache of hope that has learned to protect itself.\nThis is important because God engages even the hidden laugh. The Lord addresses what Sarah never said out loud.",
      "💪 Is Anything Too Hard For Yahweh\nThis is the theological center of the section. The question asks whether age, barrenness, and human impossibility are stronger than the Lord. The answer is no.\nThis phrase becomes a lens for the whole Abraham story. The promise rests on the power of God, not on the normal limits of human ability.",
      "🙈 I Did Not Laugh\nSarah denies laughing because she is afraid. Fear often makes people hide their honest reactions. But the Lord gently tells the truth: 'No, but you did laugh.'\nThis is not cruelty. It is God's way of bringing the hidden heart into truth. Promise does not grow by pretending; it grows where God tells the truth and remains faithful.",
    ],
    truths: [
      "👑 Sarah is not a side character in the promise.\nThe visitors ask for Sarah and announce that she will have a son. God centers the woman people tried to work around.\nThis matters because God's covenant promise includes Sarah's body, story, waiting, and future. She is not replaceable.",
      "⏳ God's timing can be appointed even when it feels late.\nThe phrase 'set time' shows that the promise has a divine schedule. Sarah's long wait has not placed the promise outside God's control.\nThis teaches that late to us is not late to God. His appointed time can arrive after human hope feels exhausted.",
      "😂 God can handle honest weakness.\nSarah laughs, and God confronts it truthfully. He does not cancel the promise because her reaction is mixed.\nThat is comforting. Faith can be small, wounded, and afraid, yet God's promise remains stronger than the weakness of the receiver.",
      "💪 God's power is the answer to impossibility.\n'Is anything too hard for Yahweh?' is the question hanging over Isaac's birth. Human biology says no; God's promise says yes.\nGenesis teaches that the covenant line will continue by divine power. The impossible setting is not a problem for the story; it is the point.",
      "🕯️ Truth is part of mercy.\nGod does not let Sarah hide behind denial. He names the laugh.\nMercy does not always mean avoiding uncomfortable truth. Sometimes God loves people by bringing hidden fear into the light while still keeping His promise.",
    ],
  },
  "Genesis 18:16-21": {
    phrases: [
      "👀 Looked Toward Sodom\nThe visitors turn their attention toward Sodom, and the story shifts from promise to judgment. This creates a sharp contrast: Sarah's tent receives a promise of life, while Sodom faces investigation and judgment.\nReading tip: Day 8 holds both mercy and judgment side by side. Genesis does not separate God's kindness from His justice.",
      "🚶 Abraham Went With Them\nAbraham walks with the visitors as they move toward Sodom. This shows closeness and hospitality continuing beyond the meal. It also places Abraham near the conversation about judgment.\nThe detail matters because Abraham is about to intercede. He is not detached from the fate of the cities; he walks with God long enough to plead.",
      "🤔 Shall I Hide From Abraham\nGod lets Abraham into the conversation because Abraham is part of the covenant plan. This is not because God needs advice. It is because Abraham's role will include teaching justice and righteousness to his household.\nThis phrase shows relational depth. God is forming Abraham not only as a receiver of promise, but as someone who learns God's ways.",
      "🌍 All Nations Of The Earth Shall Be Blessed\nThe global promise returns in the middle of a judgment scene. Abraham's family is meant to become a blessing to the nations, not merely a private religious tribe.\nThat makes the Sodom conversation heavier. Abraham must learn how God's blessing relates to righteousness, justice, mercy, and judgment in the wider world.",
      "⚖️ Keep The Way Of Yahweh By Doing Righteousness And Justice\nThis phrase shows what covenant life is supposed to produce. Abraham's household must learn righteousness and justice, not only rituals or family identity.\nThe two words matter. Righteousness means right relationship and moral faithfulness; justice means doing what is right in social and legal life. God's promise has ethical shape.",
      "📣 The Outcry Against Sodom And Gomorrah\nOutcry language often points to the cry of victims, oppression, or severe injustice. God hears the cry rising from Sodom's evil. Judgment is not random anger; it responds to real wickedness.\nThis is important because Genesis presents God as a judge who investigates and knows. Sodom is not destroyed because of rumor, but because its sin is grievous before God.",
      "⬇️ I Will Go Down And See\nGod uses human-style language to show careful judgment. He does not act rashly. The Lord 'goes down' to examine the situation, much like He came down at Babel.\nThis phrase teaches that divine judgment is deliberate and truthful. God sees fully before judgment falls.",
    ],
    truths: [
      "⚖️ God's promise includes righteousness and justice.\nAbraham's household is called to keep the way of the Lord by doing righteousness and justice. Covenant identity has ethical fruit.\nThis matters because faith is not only receiving blessing. It is learning the character of the God who blesses.",
      "👂 God hears the cry of evil and suffering.\nThe outcry against Sodom reaches the Lord. Hidden evil is not hidden from Him.\nThis gives comfort to victims and warning to oppressors. God hears what powerful people may try to silence.",
      "🌍 Blessing is meant for the nations.\nGod repeats that all nations will be blessed through Abraham. The promise has a global horizon.\nThis keeps Abraham's story from becoming small. God is forming a family that will carry blessing into a broken world.",
      "🧑‍⚖️ God's judgment is careful, not impulsive.\nThe language of going down and seeing shows deliberate justice. God does not judge from ignorance.\nThis teaches readers to trust God's justice even when judgment scenes are heavy. He knows the truth fully.",
      "🤝 Friendship with God forms moral concern.\nAbraham is brought near the conversation about Sodom, and he will soon intercede. Closeness to God does not make him careless about people.\nTrue covenant relationship should deepen concern for righteousness, justice, and mercy.",
    ],
  },
  "Genesis 18:22-33": {
    phrases: [
      "🧍 Abraham Still Stood Before Yahweh\nAbraham remains before the Lord while the others go toward Sodom. This posture becomes the setting for intercession. He stands near God and speaks about the fate of others.\nThis is a major moment in Abraham's growth. The man who once acted from fear now draws near with reverent courage.",
      "🙏 Abraham Drew Near\nDrawing near shows boldness and humility together. Abraham is not casual, but he is not silent either. He approaches God with concern for justice and mercy.\nThis phrase teaches something about prayer. Real prayer can come close enough to ask hard questions while still honoring God's authority.",
      "⚖️ Will You Sweep Away The Righteous With The Wicked\nAbraham's question is about justice. He is asking whether God will treat righteous and wicked people the same in judgment. The question reveals Abraham's confidence that God's justice must be morally right.\nThis matters because biblical faith does not require people to pretend justice questions do not matter. Abraham brings the question to God.",
      "🌍 Shall Not The Judge Of All The Earth Do Right\nThis is one of the strongest statements about God's justice in Genesis. Abraham names God as Judge of all the earth, not a local tribal deity. Then he appeals to God's own righteous character.\nThe phrase is not Abraham correcting God. It is Abraham praying from what he knows must be true of God: the Judge of all the earth will do right.",
      "🔢 Fifty...Forty-Five...Forty...Thirty...Twenty...Ten\nAbraham keeps lowering the number of righteous people. The repeated negotiation shows persistent intercession, but also humility. Abraham asks, waits, and asks again.\nThis pattern teaches that prayer can be patient and bold. Abraham is not manipulating God; he is pleading for mercy within the framework of God's justice.",
      "🧱 I Am Dust And Ashes\nAbraham remembers his place before God. He draws near boldly, but he knows he is a creature. Dust and ashes express humility, mortality, and dependence.\nThis is the balance of biblical prayer: bold enough to speak, humble enough to know who God is.",
      "🕊️ I Will Not Destroy It For The Ten's Sake\nGod shows willingness to spare the city for ten righteous people. The problem will not be that Abraham is more merciful than God. The problem will be that Sodom is truly corrupt.\nThis answer shows the seriousness of the city's condition while also revealing God's mercy. God is not eager to destroy righteous people.",
    ],
    truths: [
      "🙏 Prayer can be reverently bold.\nAbraham draws near and asks hard questions. He does not treat God casually, but he does speak honestly.\nThis teaches a mature view of prayer. Closeness with God creates humility and courage, not silence or arrogance.",
      "⚖️ God's justice is central to faith.\nAbraham appeals to the Judge of all the earth doing right. He trusts God's character enough to ask from it.\nBiblical faith is not anti-justice. It is rooted in the conviction that God is perfectly just.",
      "🕊️ Intercession pleads for mercy.\nAbraham is not praying for himself here. He is pleading for others, including a city connected to Lot.\nThis matters because covenant friendship with God should turn outward. People who know God should care about the fate of others.",
      "🧱 Humility and boldness belong together.\nAbraham says he is dust and ashes, yet he keeps asking. That balance is beautiful.\nPrayer becomes unhealthy when it loses either side. Boldness without humility becomes presumption; humility without boldness may never intercede.",
      "🔎 Judgment reveals reality.\nGod is willing to spare for ten righteous, but Sodom's corruption will be exposed. Abraham's prayer does not make God unjust.\nThis prepares readers for Genesis 19. The coming judgment is not because God refused mercy; it is because the city is truly wicked.",
    ],
  },
  "Genesis 19:1-11": {
    phrases: [
      "🌆 Lot Sat In The Gate Of Sodom\nThe city gate was a place of leadership, business, and public decisions. Lot is not merely near Sodom now; he is settled into its public life. This is a long way from simply pitching tents near the city.\nReading tip: track Lot's movement. He looked toward Sodom, moved near Sodom, lived in Sodom, and now sits in the gate. Compromise often moves by stages.",
      "👼 Two Angels Came To Sodom\nThe visitors who were with Abraham now arrive as angels in Sodom. The city is being examined, just as God said. Their arrival tests the city and reveals its character.\nThis matters because judgment is not falling without exposure. Sodom's response to the visitors will show what kind of city it has become.",
      "🏠 Turn Aside To Your Servant's House\nLot offers hospitality, which contrasts with Sodom's violence. He knows the city is dangerous enough that the visitors should not spend the night in the square.\nLot's action shows some moral concern, but it also reveals how compromised his situation is. He is trying to protect guests inside a city he chose to inhabit.",
      "🚪 The Men Of The City Surrounded The House\nThe whole scene becomes terrifying. The city gathers in violent pressure against Lot's house. Genesis is exposing public, aggressive wickedness, not a private misunderstanding.\nThis is why Sodom becomes a symbol of deep corruption. The city does not protect strangers; it threatens them. Hospitality is replaced by violence.",
      "😨 Bring Them Out To Us\nThe demand is violent, degrading, and wicked. It shows the city's desire to dominate and abuse vulnerable visitors. The issue is not merely sexuality in the abstract; it is violent, predatory evil.\nThis distinction matters. Genesis 19 is about a society so corrupt that strangers are not safe from group violence. The city has become morally dangerous at the public level.",
      "💔 I Have Two Daughters\nLot's offer of his daughters is horrifying. Genesis is not presenting this as righteous. It shows how compromised Lot's moral judgment has become while living in Sodom.\nThis is a painful but important point. Lot tries to protect his guests, but his solution sacrifices the vulnerable women in his own house. Compromise distorts moral instincts.",
      "🧑‍🦯 They Struck The Men With Blindness\nThe angels intervene and protect the doorway. The blindness is both judgment and rescue: it stops the violent crowd and exposes their moral blindness physically.\nThe men still wear themselves out trying to find the door, showing how deep their corruption is. Even judgment does not immediately produce repentance.",
    ],
    truths: [
      "🧭 Compromise can move gradually.\nLot's journey toward Sodom happened in stages, and now he is sitting in the gate. The story shows drift over time.\nThis is a serious warning. People rarely wake up fully entangled overnight; direction becomes location, and location becomes participation.",
      "🏠 Hospitality reveals moral character.\nLot receives the visitors, while Sodom tries to harm them. The contrast exposes the city.\nIn Genesis, how people treat vulnerable strangers matters. Sodom's failure is not small discourtesy; it is violent injustice.",
      "⚠️ Evil can become public and organized.\nThe men of the city surround the house together. Wickedness has become communal pressure.\nThis matters because sin is not only individual. Whole cultures can normalize intimidation, violence, and abuse.",
      "💔 Compromise damages moral judgment.\nLot tries to do one right thing while proposing something horrifying with his daughters. His values are tangled.\nGenesis does not let readers romanticize Lot. Living too long inside corruption can deform even the instincts that should protect family.",
      "🛡️ God can protect when human protection fails.\nLot cannot stop the crowd, but the angels can. They pull him in and strike the men with blindness.\nThis shows mercy in a terrible scene. Human weakness is real, but God's power is not absent.",
    ],
  },
  "Genesis 19:12-22": {
    phrases: [
      "👨‍👩‍👧 Whoever You Have In The City\nThe angels tell Lot to bring out his family. Judgment is coming, but mercy gives warning first. Lot is allowed to call others out before destruction falls.\nThis is important because God is not sneaking judgment in without warning. The door of escape is opened, even if people refuse to take it seriously.",
      "😂 He Seemed To His Sons-In-Law To Be Joking\nLot's warning sounds like a joke to the men connected to his household. That detail is tragic. Lot has lived so long in Sodom that his urgent spiritual warning carries no weight with them.\nReading tip: credibility matters. A compromised life can make true warnings sound unbelievable to the people closest to us.",
      "⏰ As Morning Dawned\nMorning brings urgency. The time for delay is over. The angels press Lot to leave before judgment falls.\nThis detail creates tension. Lot knows danger is coming, yet leaving is still hard. The city has a pull on him even when it is under judgment.",
      "⏳ But He Lingered\nThis is one of the saddest phrases in the chapter. Lot has been warned, but he hesitates. His feet move slower than the mercy being offered.\nThe phrase is painfully relatable. People can know something is dangerous and still linger because attachment, fear, comfort, and confusion hold them in place.",
      "🤝 The Men Seized Him By The Hand\nThe angels grab Lot, his wife, and his daughters and bring them out. This is forceful mercy. Lot is not rescued because he is decisive; he is rescued because the Lord is merciful.\nThat matters deeply. Sometimes mercy does not merely invite; it pulls. God saves Lot from a place he is too slow to leave.",
      "🕊️ Yahweh Being Merciful To Him\nThis phrase explains the rescue. The angels pull Lot out because of the Lord's mercy. Lot's hesitation is real, but mercy is stronger.\nThis prevents us from making Lot the hero of the scene. The hero is God's mercy acting before judgment falls.",
      "🏃 Escape For Your Life\nThe command is urgent and clear. Lot must not look back or stop in the plain. He must flee to live.\nThe language teaches that judgment requires decisive separation. There are moments when slow negotiation with danger is not wisdom; escape is.",
    ],
    truths: [
      "🚨 Warning is mercy before judgment.\nLot's family is warned before Sodom falls. God gives opportunity to flee.\nThis teaches that biblical warning is not cruelty. It is mercy telling the truth before consequences arrive.",
      "⏳ Attachment can make people linger in danger.\nLot knows judgment is coming, but he delays. Sodom still has a grip on him.\nThis is one of the most practical truths in the chapter. People can be attached to what is destroying them.",
      "🤝 Mercy sometimes pulls what hesitation cannot move.\nThe angels seize Lot by the hand and bring him out. Lot is rescued by mercy, not decisiveness.\nThis is humbling and comforting. God's mercy can be stronger than our slow obedience.",
      "📣 A compromised life can weaken a true warning.\nLot's sons-in-law think he is joking. His words have little weight in Sodom.\nThis matters because how we live affects how people hear what we say. Credibility is built before the crisis.",
      "🏃 Some moments require urgent separation.\nThe angels tell Lot to escape for his life. This is not a season for gradual adjustment.\nThe Bible teaches patience in many places, but here it teaches urgency. Some danger must be left quickly.",
    ],
  },
  "Genesis 19:23-29": {
    phrases: [
      "🌅 The Sun Had Risen\nJudgment falls in daylight, not hidden darkness. The morning that should bring normal life becomes the moment Sodom's judgment arrives.\nThis detail makes the scene sobering. Life can feel ordinary right up to the moment God's warning becomes reality.",
      "🔥 Sulfur And Fire\nFire and sulfur communicate total judgment. The destruction is severe, visible, and remembered throughout Scripture. Sodom becomes a warning image in later biblical texts.\nThis is not a decorative disaster scene. Genesis wants the reader to feel the seriousness of entrenched wickedness and divine judgment.",
      "🏙️ Overthrew Those Cities\nThe language suggests a complete overturning. Sodom and Gomorrah are not merely damaged; their world is brought down. The judgment answers the depth of corruption shown earlier.\nThis matters because Genesis 19 has already exposed the city's violence. The overthrow is not random; it is judgment after the city's character has been revealed.",
      "🧂 His Wife Looked Back\nLot's wife looks back and becomes a warning. The issue is more than turning her head; the story presents a backward attachment to what God was rescuing her from.\nThis phrase teaches divided affection. Her body leaves Sodom, but her heart still looks back. Jesus later tells readers to remember Lot's wife.",
      "🧱 A Pillar Of Salt\nThe pillar of salt becomes a physical warning sign. Salt is connected to the region around the Dead Sea, where the landscape itself feels like a memorial of judgment.\nThe image is haunting because it freezes the danger of looking back. The rescue path requires leaving what God has judged.",
      "👀 Abraham Looked Toward Sodom\nAbraham sees the smoke rising from the land. The intercessor now witnesses the aftermath. He does not control the outcome, but he has stood before God in prayer.\nThis is heavy. Prayer does not always mean the city is spared, but it does place Abraham near God's heart for justice and mercy.",
      "🧠 God Remembered Abraham\nLot's rescue is connected to God remembering Abraham. This does not mean Lot earned rescue through Abraham, but it shows intercession and covenant relationship matter in the story.\nThe phrase is tender. In judgment, God remembers the covenant man and sends Lot out of the overthrow.",
    ],
    truths: [
      "⚖️ Judgment is real.\nSodom and Gomorrah fall under severe judgment. Genesis does not make evil imaginary or consequence-free.\nThis is hard, but important. A good God does not forever ignore violent, entrenched wickedness.",
      "🛟 Mercy can be present inside judgment.\nLot is brought out before the overthrow. The same chapter shows both fire and rescue.\nThis keeps the reader from flattening God's character. He is holy in judgment and merciful in rescue.",
      "🧂 Divided affection is dangerous.\nLot's wife leaves physically but looks back. The story presents her as a warning.\nThis truth reaches beyond geography. It is possible to be moved away from a destructive place while still longing for it inside.",
      "🙏 Intercession matters even when outcomes are heavy.\nAbraham prayed, and Lot was rescued. The cities are judged, but prayer is not meaningless.\nGenesis teaches that standing before God for others matters, even when we do not control exactly how mercy will appear.",
      "🌅 Ordinary mornings can become moments of reckoning.\nThe sun rises before judgment falls. The day begins like a day, then everything changes.\nThis teaches sobriety. God's warnings should not be dismissed because life still feels normal for the moment.",
    ],
  },
  "Genesis 19:30-38": {
    phrases: [
      "⛰️ Lot Went Up Out Of Zoar\nLot begged to flee to Zoar, but then he becomes afraid and moves to the mountains. His life after Sodom is unstable. He was rescued, but he is not whole.\nReading tip: rescue from a place does not automatically heal the damage of that place. Lot's family carries confusion and fear into the cave.",
      "🕳️ Lived In A Cave\nThe cave is a lonely, diminished setting compared with Abraham's tents and altars. Lot once chose the well-watered plain; now he ends up isolated in a cave.\nThis contrast is painful. The path that looked like abundance has led to fear, loss, and moral darkness. Genesis is showing the long tail of compromise.",
      "👭 The Firstborn Said To The Younger\nLot's daughters take initiative in a disturbing plan. Their words show desperation and distorted thinking. They believe there is no man to preserve the family line.\nThis may reflect trauma after judgment and isolation, but Genesis does not excuse the act. It shows how deeply damaged the family world has become.",
      "🍷 Let Us Make Our Father Drink Wine\nWine becomes the means of control, just as Noah's drunkenness led to shame in Genesis 9. Genesis is linking stories of family breakdown after major judgment scenes.\nThis detail warns that intoxication can become a doorway to vulnerability, manipulation, and sin. The daughters use their father's weakness to execute their plan.",
      "👶 Preserve Seed From Our Father\nThe phrase reveals their motive: preserving offspring. In the ancient world, family line and descendants mattered deeply. Their fear of extinction drives their plan.\nBut the motive does not make the method righteous. Genesis repeatedly teaches that forcing a future through sinful means creates pain and confusion.",
      "🏷️ Moab And Ben-Ammi\nThe children born from this scene become connected with the Moabites and Ammonites, peoples who later interact with Israel in complicated ways. This is origin-story material for nations Israel would know.\nThe Bible is honest about messy beginnings. It does not sanitize the origins of peoples, but it also later shows mercy can still work through unexpected lines, as with Ruth the Moabite.",
    ],
    truths: [
      "🩹 Rescue is not the same as healing.\nLot is saved from Sodom, but his family remains deeply damaged. The cave scene shows unresolved fear and moral confusion.\nThis is a sobering truth. Leaving danger is necessary, but healing and discipleship still matter after rescue.",
      "🧭 Compromise can shape the next generation.\nLot's daughters act from a distorted moral world. Their choices did not appear from nowhere.\nGenesis warns that where a family lives, what it normalizes, and what it survives can deeply affect the next generation.",
      "🍷 Weakness can be exploited.\nThe daughters use wine to control Lot. The scene is disturbing because vulnerability becomes the doorway to sin.\nThe Bible does not treat intoxication lightly here. It shows how impaired judgment can bring devastating consequences.",
      "👶 Fear of the future can lead to sinful control.\nThe daughters want offspring, but their method is wrong. Like Sarai's shortcut, this is another attempt to secure a future by human manipulation.\nGenesis keeps repeating the lesson: the future must be trusted to God, not forced through sin.",
      "🌱 God can still work beyond messy origins.\nMoab and Ammon come from this tragic story, yet later Scripture includes Ruth the Moabite in the line leading to David and Jesus.\nThis does not make the sin good. It shows that God's mercy can reach farther than family brokenness.",
    ],
  },
  "Genesis 20:1-18": {
    phrases: [
      "🔁 Sarah Is My Sister\nAbraham repeats the same fear-driven pattern from Egypt. This is painful because he has heard promises, received covenant signs, and still falls back into an old survival strategy.\nReading tip: Genesis shows spiritual growth honestly. People can have real faith and still revisit old fears. The Bible does not hide repeated weakness.",
      "👑 Abimelech King Of Gerar\nAbimelech is a Philistine-region ruler in Gerar. He is not part of Abraham's covenant family, yet God speaks to him in a dream. The scene complicates easy assumptions about insiders and outsiders.\nAbimelech acts with more integrity in this moment than Abraham does. Genesis lets an outsider rebuke the covenant man, which should humble the reader.",
      "💭 God Came To Abimelech In A Dream\nGod intervenes directly to protect Sarah and the promise. Isaac has not yet been born, so Sarah being taken into another household would threaten the covenant line.\nThis dream is mercy for Abimelech and protection for Sarah. God stops the situation before it becomes worse, even though Abraham created the danger.",
      "🫀 In The Integrity Of My Heart\nAbimelech defends himself by saying he acted without knowing the truth. God acknowledges that He knows Abimelech acted in integrity and that He kept him from sinning.\nThis is important because God judges with knowledge. He sees motives, ignorance, and action clearly. Abimelech is not treated as guilty in the same way Abraham would be.",
      "🛡️ I Also Kept You From Sinning Against Me\nGod says He restrained Abimelech. This is a powerful picture of preventative mercy. God not only forgives sin; sometimes He blocks people from walking into it.\nThe phrase also shows that sin against Sarah would be sin against God. Human relationships matter before Him.",
      "😨 I Thought Surely The Fear Of God Is Not In This Place\nAbraham explains that he acted from fear. Ironically, Abimelech shows more fear of God in the scene than Abraham expected. Abraham misjudged the place and endangered Sarah.\nThis phrase exposes prejudice and fear. Abraham assumed the worst and used deception to protect himself.",
      "🙏 He Is A Prophet, And He Will Pray For You\nGod calls Abraham a prophet even in a chapter where Abraham has failed. That is surprising grace. Abraham's role is real, but his behavior has been compromised.\nAbraham must pray for Abimelech, the man he wronged. This is humbling: the prophet needs correction, and then he intercedes for the household affected by his sin.",
    ],
    truths: [
      "🔁 Old fears can return.\nAbraham repeats the sister lie. His failure is not new; it is an old pattern resurfacing.\nThis is honest and helpful. Spiritual growth does not mean old fears never knock again. It means God keeps confronting and preserving despite human weakness.",
      "🛡️ God protects the promise from human failure.\nAbraham endangers Sarah again, but God intervenes before the covenant line is compromised. The promise is not fragile in Abraham's hands.\nThis is not permission for deception. It is comfort that God's faithfulness is stronger than the failures of His people.",
      "👑 Outsiders may act with more integrity than insiders.\nAbimelech responds to God's warning seriously, while Abraham has acted deceptively. Genesis lets the outsider rebuke the covenant man.\nThis warns religious people against arrogance. Being chosen by grace does not make someone's behavior automatically righteous.",
      "💭 God can restrain sin before it happens.\nGod tells Abimelech He kept him from sinning. That is preventative mercy.\nSometimes God's grace is not only seen in forgiveness after sin, but in barriers, warnings, dreams, interruptions, and closed doors before sin is completed.",
      "🙏 Calling does not erase accountability.\nAbraham is called a prophet, but he is also confronted. His role remains, yet his sin matters.\nThis is a mature Bible truth. God can use flawed people, but being used by God does not mean correction is unnecessary.",
    ],
  },
};

const DAY_EIGHT_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 18:1-8": {
    phraseNote: "Reading tip: Abraham's hospitality is the doorway into the promise conversation. The scene teaches that ordinary welcome, food, and attention can become holy ground when God is at work.",
    truthNote: "This section teaches embodied faith. Abraham's trust is not only in his beliefs; it shows in humility, service, and open-handed welcome.",
  },
  "Genesis 18:9-15": {
    phraseNote: "Reading tip: Sarah's laugh is not a throwaway reaction. Isaac's name will mean laughter, so God turns the impossible laugh into the child's identity.",
    truthNote: "This section teaches that God's promise can meet honest doubt without being defeated by it. The question is not Sarah's strength, but whether anything is too hard for Yahweh.",
  },
  "Genesis 18:16-21": {
    phraseNote: "Reading tip: this section explains why Abraham is invited into the Sodom conversation. He must teach righteousness and justice, so God lets him learn how divine justice works.",
    truthNote: "This section teaches that covenant blessing has moral purpose. Abraham's family is chosen to become a people of righteousness and justice, not just a family with promises.",
  },
  "Genesis 18:22-33": {
    phraseNote: "Reading tip: Abraham's intercession is not bargaining like God is reluctant to be good. It is prayer built on God's own justice and mercy.",
    truthNote: "This section teaches reverent boldness. Abraham asks deeply because he trusts that the Judge of all the earth will do what is right.",
  },
  "Genesis 19:1-11": {
    phraseNote: "Reading tip: Lot sitting in the gate shows how far he has moved into Sodom's life. The gate was a place of public standing, not casual visiting.",
    truthNote: "This section teaches that proximity can become entanglement. Lot is distressed by Sodom, but he is also woven into the city.",
  },
  "Genesis 19:12-22": {
    phraseNote: "Reading tip: the phrase 'he lingered' is the emotional center. Lot knows the truth, but attachment makes him slow to obey.",
    truthNote: "This section teaches forceful mercy. Lot is saved because the Lord is merciful, not because Lot is spiritually sharp in the moment.",
  },
  "Genesis 19:23-29": {
    phraseNote: "Reading tip: 'God remembered Abraham' connects Lot's rescue with intercession. Abraham's prayer did not save Sodom, but mercy still reached Lot.",
    truthNote: "This section teaches judgment and mercy together. The cities fall, Lot is pulled out, and Abraham's intercession is not forgotten.",
  },
  "Genesis 19:30-38": {
    phraseNote: "Reading tip: the cave scene is meant to feel ugly and sad. Genesis is showing that Sodom's damage follows Lot's family even after they leave the city.",
    truthNote: "This section teaches that rescue must be followed by healing. Lot escaped judgment, but his family still carries deep distortion.",
  },
  "Genesis 20:1-18": {
    phraseNote: "Reading tip: this repeats the Egypt pattern right before Isaac's birth. The promise is close, and Abraham's old fear resurfaces at the worst possible time.",
    truthNote: "This section teaches that God's faithfulness protects the promise even when the promise-bearer is still flawed. Abraham fails, but God does not.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_EIGHT_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_EIGHT_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_NINE_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 21:1-7": {
    phrases: [
      "👁️ Yahweh Visited Sarah\nThis phrase means God acted for Sarah just as He promised. The focus is not on Abraham's strength or Sarah's ability, but on the Lord personally keeping His word. Sarah's body had become the place where impossibility met divine faithfulness.\nReading tip: notice that Genesis says the Lord visited Sarah, not merely Abraham. Sarah is not a side character. The promised birth happens through the woman God named and blessed.",
      "🗣️ As He Had Said\nGenesis repeats this idea because Isaac's birth is the fulfillment of God's spoken promise. God said it, and then God did it. The repetition teaches the reader to connect promise and fulfillment.\nThis is one of the big patterns of Scripture. God's word may wait through years of silence, but it does not become weak with age. What God says remains alive until the appointed time.",
      "⏰ At The Set Time\nIsaac is born at the time God had appointed. From Sarah's view, the promise felt late. From God's view, the timing was set. That difference matters for understanding the whole Abraham story.\nThis phrase teaches that divine timing is not the same as human impatience. The promise arrives when God chooses, and the waiting becomes part of the testimony.",
      "😂 Isaac\nIsaac's name means laughter. Abraham laughed, Sarah laughed, and now the child himself carries the memory of impossible joy. The name turns earlier disbelief and amazement into celebration.\nThat is beautiful because God does not erase the laughter; He redeems it. Every time Isaac's name is spoken, it reminds the family that God made the impossible laughable in the best way.",
      "✂️ Abraham Circumcised His Son Isaac\nAbraham marks Isaac with the covenant sign on the eighth day, just as God commanded. The promised child is immediately placed under the covenant identity of Genesis 17.\nThis matters because Isaac is not only a miracle baby; he is the covenant son. His birth is joy, but it also carries calling, identity, and responsibility.",
      "😄 God Has Made Laughter For Me\nSarah's words show the emotional reversal of the promise. Her earlier laughter came from disbelief and pain, but now laughter becomes joy. Others will laugh with her, not at her.\nThis phrase teaches that God can transform the meaning of a person's deepest ache. Sarah's barrenness had carried shame, but Isaac's birth turns the story into shared wonder.",
    ],
    truths: [
      "🎯 God keeps His promise exactly.\nIsaac is born as God said and at the set time. The fulfillment is not vague.\nThis teaches readers to trust God's word even when fulfillment takes longer than expected. Delay did not weaken the promise.",
      "👑 Sarah is honored in the fulfillment.\nThe Lord visits Sarah, and Sarah speaks her joy. The promise does not bypass her.\nGenesis makes sure we see Sarah's place in the covenant story. The woman who waited in pain becomes the woman whose laughter witnesses to God's faithfulness.",
      "😂 God can turn painful laughter into joyful laughter.\nSarah's laughter changes meaning across the story. What once sounded impossible now becomes testimony.\nThis is not shallow happiness. It is the joy of seeing God act where human hope had been exhausted.",
      "✂️ Promise and covenant identity belong together.\nIsaac is circumcised on the eighth day. The miracle child is marked by the covenant sign.\nThis shows that God's gift brings identity and responsibility. Isaac belongs to the promise God gave Abraham.",
      "⏳ God's timing becomes part of the testimony.\nIf Isaac had come quickly, the story would feel different. The long wait makes God's power unmistakable.\nGenesis teaches that waiting can become the stage where God's faithfulness is seen more clearly.",
    ],
  },
  "Genesis 21:8-21": {
    phrases: [
      "🎉 The Child Grew And Was Weaned\nWeaning was a major milestone in the ancient world because child mortality was high. Families often celebrated when a child survived infancy and moved into the next stage of life. Isaac's feast is a public celebration of promise continuing.\nThat context helps the scene make sense. This is not a small family snack; it is a joyful marker that the promised child is growing.",
      "👀 Sarah Saw The Son Of Hagar\nSarah notices Ishmael in a way that troubles her. The passage is painful because old wounds from Genesis 16 are still alive. The shortcut has created a lasting household fracture.\nReading tip: Genesis does not let people escape the consequences of earlier control. Ishmael is loved by God, but the household tension remains real.",
      "📤 Cast Out This Servant Woman And Her Son\nSarah's words are harsh, and the scene is heavy. She wants Hagar and Ishmael removed so Isaac's inheritance is not threatened. Ancient inheritance concerns were serious, but the human pain here is also serious.\nGenesis lets us feel the grief. Hagar and Ishmael are not treated as disposable by God, even when the household conflict pushes them away.",
      "💔 The Thing Was Very Grievous To Abraham\nAbraham is deeply distressed because Ishmael is his son. This matters because Ishmael is not just a problem in the narrative. He is Abraham's child, and Abraham loves him.\nThe phrase keeps the story from becoming cold theology. Covenant clarity and family pain exist together in the same scene.",
      "👂 God Heard The Voice Of The Boy\nThis repeats the meaning of Ishmael's name: God hears. In Genesis 16, God heard Hagar's affliction. Here, God hears the boy in the wilderness.\nThat is not accidental. Ishmael's name becomes true in his life again. God hears the child outside the covenant line and moves with compassion.",
      "👀 God Opened Her Eyes\nHagar could not see the well until God opened her eyes. The provision was there, but despair had closed her vision. God's mercy helps her perceive what she needs to live.\nThis phrase is tender and practical. Sometimes rescue comes not by creating something new, but by opening someone's eyes to provision they could not see.",
      "🏹 God Was With The Boy\nIshmael grows, lives in the wilderness, and becomes an archer. God is with him, even though Isaac carries the covenant line. That distinction is crucial.\nGenesis teaches that Isaac's chosen role does not mean Ishmael is abandoned. God's care reaches beyond the main covenant line.",
    ],
    truths: [
      "🧩 Covenant clarity can coexist with real grief.\nIsaac is the covenant son, but Abraham still grieves over Ishmael. The Bible holds both truths without pretending the situation is easy.\nThis helps readers avoid flattening the story. God's chosen line matters, and the pain of the household also matters.",
      "👂 God hears those outside the center of the story.\nGod hears Ishmael in the wilderness. The child pushed away from Abraham's house is not pushed away from God's attention.\nThis is a major Genesis truth. God sees and hears people who may not carry the central role in the covenant story.",
      "👀 Despair can hide provision.\nHagar cannot see the well until God opens her eyes. Her situation is desperate, but mercy is near.\nThis is deeply human. Pain can narrow vision until help feels impossible. God can open eyes to life-giving provision.",
      "🌱 God's blessing has different roles.\nIsaac carries the covenant line, but Ishmael receives care and a future. Difference of role does not mean difference of worth.\nThis is important theology for regular people. God's specific calling for one person does not mean He has forgotten another.",
      "🏜️ God can sustain life in the wilderness.\nHagar and Ishmael survive outside the household because God provides water and future. The wilderness is dangerous, but not godless.\nGenesis keeps teaching that God's mercy can meet people in lonely, displaced places.",
    ],
  },
  "Genesis 21:22-34": {
    phrases: [
      "🤝 God Is With You In All That You Do\nAbimelech recognizes God's presence with Abraham. This comes after Abraham previously failed in Gerar, which makes the statement striking. God remains faithful to Abraham despite Abraham's weakness.\nThis phrase also shows that outsiders can notice God's hand. Abraham's life is becoming visible testimony, even in complicated relationships.",
      "🧾 Swear To Me Here By God\nAbimelech wants a covenant of honesty and peace with Abraham. Oaths mattered deeply in the ancient world because they called on divine witness. This is about trust, boundaries, and future stability.\nThe scene shows Abraham living as a sojourner among other peoples. Promise does not remove the need for wise relationships and clear agreements.",
      "💧 A Well Of Water\nWells were vital in a land where water meant survival for people and animals. A well was not a minor possession; it could determine whether a household could remain in a region.\nThis explains why the dispute matters. Abraham's future in the land requires practical provision, and water rights become part of living faithfully in the promise.",
      "🐑 Seven Ewe Lambs\nAbraham sets apart seven female lambs as a witness that he dug the well. The gift functions like evidence in the covenant agreement. It marks the well as connected to Abraham's rightful claim.\nThis is a cultural detail that helps the story. Abraham is not only praying about the promise; he is also handling property disputes with public signs and wise agreements.",
      "📍 Beersheba\nBeersheba is connected with oath and seven, both themes present in the story. The place name preserves the memory of the covenant and the well. In Genesis, names often turn events into lasting markers.\nBeersheba will become an important location in the patriarch stories. Abraham's worship and agreement leave a mark on the land.",
      "🌳 Abraham Planted A Tamarisk Tree\nPlanting a tree suggests settlement, shade, future, and long-term presence. Abraham still does not own the whole land, but he plants something living in it. This is a quiet act of hope.\nThe tree says Abraham is living toward the future God promised. Faith sometimes looks like planting in a place you do not fully possess yet.",
      "♾️ The Everlasting God\nAbraham calls on Yahweh as El Olam, the everlasting God. This title fits a man still waiting on promises that stretch beyond his lifetime. Abraham needs a God whose faithfulness outlasts human years.\nThis name teaches that the covenant is held by the eternal God. Abraham's life is temporary, but God's promise is not.",
    ],
    truths: [
      "👀 God's presence can become visible to outsiders.\nAbimelech says God is with Abraham. Even with Abraham's flaws, God's hand is recognizable.\nThis teaches that testimony is not built on human perfection. It is built on God's faithfulness working through imperfect people.",
      "🤝 Faith includes wise public relationships.\nAbraham makes a covenant with Abimelech and addresses the well dispute. He does not avoid practical matters.\nGenesis shows that faith lives in real community life: agreements, resources, boundaries, and peace.",
      "💧 Practical provision matters in the promise land.\nThe well is about survival. Abraham needs water for household and flocks.\nGod's promise does not float above ordinary needs. Land, water, animals, and daily stability all matter in the story.",
      "🌳 Faith plants for a future it has not fully received.\nAbraham plants a tamarisk tree while still living as a sojourner. That is hopeful patience.\nThis is a beautiful picture of faith. It invests in the promised future before full possession arrives.",
      "♾️ The everlasting God holds long promises.\nAbraham calls on the everlasting God because the promise is bigger than one moment. God's faithfulness stretches beyond Abraham's lifespan.\nThis helps readers trust God with timelines they cannot control. The eternal God is not rushed by human clocks.",
    ],
  },
  "Genesis 22:1-19": {
    phrases: [
      "🧪 God Tested Abraham\nA test in Scripture reveals and refines faith; it is not the same as tempting someone to evil. God is bringing Abraham's trust into the open in the most costly way imaginable. The test concerns Isaac, the child of promise.\nReading tip: Genesis 22 is meant to feel heavy. The point is not that God enjoys pain, but that Abraham's trust in God's promise is being revealed at the deepest level.",
      "👦 Your Son, Your Only Son Isaac, Whom You Love\nThe wording slows down and presses on Abraham's heart. Isaac is not Abraham's only biological son, but he is the only covenant son through Sarah, the son of promise. The phrase highlights love, promise, and cost.\nThis language also echoes forward for Christian readers because the beloved son offered on a mountain becomes a major biblical pattern.",
      "⛰️ The Land Of Moriah\nMoriah becomes the place of testing and provision. Later biblical tradition connects this region with Jerusalem and the temple mount. Whether readers know that or not, the location becomes a place where sacrifice and provision meet.\nThe journey to Moriah turns the promise into a question: can Abraham trust God when obedience seems to threaten the very promise God gave?",
      "🐑 God Will Provide For Himself The Lamb\nAbraham's answer to Isaac is full of faith, even if Abraham does not yet know exactly how God will provide. He trusts that God Himself will supply what is needed.\nThis phrase becomes the heart of the chapter. The story is not finally about Abraham providing for God, but God providing what Abraham cannot.",
      "🔪 Abraham Reached Out His Hand\nThe scene slows at the moment of obedience. Abraham is not pretending. He has gone all the way to the edge of the command, trusting God with the impossible tension.\nThis is why Genesis 22 is so powerful. Abraham believes God's promise so deeply that he trusts God even when he cannot see how obedience and promise can both survive.",
      "🛑 Do Not Lay Your Hand On The Boy\nGod stops Abraham. Isaac is not ultimately taken. The test reveals Abraham's fear of God and trust, but God provides another sacrifice.\nThis matters because the chapter rejects the idea that God needs Isaac's death. The Lord reveals faith, stops the knife, and provides the ram.",
      "🐏 A Ram Caught In A Thicket\nThe ram becomes the substitute offered instead of Isaac. Abraham receives the sacrifice he could not create at the exact moment he needs it.\nThis is one of the clearest provision moments in Genesis. Isaac lives because God provides another offering.",
      "🏷️ Yahweh Will Provide\nAbraham names the place after God's provision. The name does not only remember the test; it remembers the God who supplied. The mountain becomes a testimony.\nThis phrase points beyond the immediate moment. In the mount of the Lord, provision will be seen. The Bible keeps building hope around God's provision.",
    ],
    truths: [
      "🧪 Testing reveals what faith trusts.\nGenesis 22 reveals Abraham's trust in God and God's promise. The test does not inform God as if He lacks knowledge; it brings faith into the open.\nThis helps readers understand testing biblically. Tests expose, refine, and teach dependence.",
      "👦 The promise must be trusted back to God.\nIsaac is the promised son, yet Abraham must surrender him to the God who gave him. The gift cannot become greater than the giver.\nThis is one of the deepest faith lessons in Abraham's life. Trust means God remains God even over the most precious promise.",
      "🐑 God provides what obedience cannot produce.\nAbraham obeys, but God supplies the ram. The final provision comes from the Lord.\nGenesis 22 is not about heroic self-sufficiency. It is about trusting until God's provision appears.",
      "🛑 God stops the death of Isaac.\nThe angel stops Abraham before Isaac is harmed. The test reaches its point without Isaac being sacrificed.\nThis matters because the story is not approving child sacrifice. It reveals faith and then shows God's provision in place of Isaac.",
      "⛰️ The mountain becomes a place of provision.\nAbraham names the place Yahweh will provide. The memory is not only terror; it is mercy.\nThe chapter teaches that the place of greatest testing can become the place where God's provision is most clearly seen.",
    ],
  },
  "Genesis 23:1-20": {
    phrases: [
      "⚰️ Sarah Lived One Hundred Twenty-Seven Years\nSarah is the only woman in Scripture whose age at death is recorded this way. That detail honors her place in the covenant story. Her life mattered enough for Genesis to pause and mark it.\nThis is not just a transition to Isaac's future. Sarah's death is a real moment of grief in the promised land.",
      "😭 Abraham Came To Mourn For Sarah\nAbraham mourns and weeps. The father of faith does not treat grief as a lack of faith. He trusts God's promise and still cries at the death of his wife.\nThis matters because biblical faith makes room for sorrow. The promise is real, but death still hurts.",
      "🧳 I Am A Stranger And A Sojourner Among You\nAbraham describes his status in the land. God has promised Canaan, but Abraham still lives there without full possession. He needs to buy a burial place from the people of the land.\nThis phrase captures the tension of Abraham's life. He belongs to God's promise, but he still lives as a resident outsider waiting for fuller inheritance.",
      "🪦 Give Me A Possession Of A Burying Place\nAbraham asks for a burial possession, not free charity. He wants a secure, recognized place to bury Sarah. Burial places mattered because they connected family, memory, land, and future generations.\nThe request is practical and theological. The first piece of land Abraham secures in Canaan is not a palace or battlefield, but a grave.",
      "🌾 The Field Of Ephron\nThe negotiation for Ephron's field is formal and public. Ancient land deals happened at the city gate before witnesses. Abraham insists on paying full price so the ownership cannot be disputed later.\nThis helps readers see Abraham's integrity. He does not take the land by pressure or manipulation. He receives the promise by faith while acting honorably in public.",
      "⚖️ Four Hundred Shekels Of Silver\nThe price is named and weighed according to the merchants. This makes the purchase legally clear. Genesis is emphasizing that Abraham truly buys the field and cave.\nThe detail matters because this burial plot becomes the first owned piece of the promised land in the family story. Grief and promise meet in a legal transaction.",
      "🕳️ The Cave Of Machpelah\nMachpelah becomes the family burial place. Sarah is buried there, and later Abraham, Isaac, Rebekah, Leah, and Jacob are connected with the same site. It becomes a memory anchor for the patriarch family.\nThis cave says the family has a future in the land, even in death. The promise is not complete yet, but it has a foothold.",
    ],
    truths: [
      "😭 Faith does not cancel grief.\nAbraham mourns Sarah. His tears are not treated as unbelief.\nThis is deeply important. Biblical hope does not require pretending death is painless. Faith can grieve honestly before God.",
      "🧳 Promise can coexist with sojourning.\nAbraham has God's promise, but he still calls himself a stranger and sojourner. He lives between promise and possession.\nThis tension shapes much of biblical faith. God's word is true even when the full inheritance is still future.",
      "🪦 The first owned land is a burial place.\nAbraham's first secured possession in Canaan is a grave for Sarah. That is quiet but powerful.\nThe promise takes root in grief, not glamour. God is still moving the story forward through mourning and burial.",
      "⚖️ Integrity matters in public dealings.\nAbraham pays full price before witnesses. He does not manipulate the situation.\nFaith shows up in contracts, money, negotiations, and how people handle practical business in front of others.",
      "📍 Memory anchors faith.\nMachpelah becomes a family burial site and a physical reminder of the promise. The grave points both backward to loss and forward to hope.\nGenesis teaches that places of grief can also become places where faith remembers God's future.",
    ],
  },
  "Genesis 24:1-67": {
    phrases: [
      "👴 Abraham Was Old, Well Advanced In Age\nAbraham's life is moving toward its final stage, so the promise must pass to the next generation. Isaac needs a wife, and the covenant family must continue. This chapter is about legacy.\nReading tip: Genesis 24 is long because the transfer of the promise matters. God is not only the God of Abraham's beginning; He is guiding the future after Abraham.",
      "🤲 Put Your Hand Under My Thigh\nThis oath gesture sounds strange today, but it was connected with solemn family and covenant seriousness in the ancient world. It likely relates to descendants and the continuation of the family line.\nThe gesture fits the chapter because the mission concerns Isaac's future wife and the covenant offspring. Abraham treats the task as sacred, not casual matchmaking.",
      "🚫 Do Not Take A Wife From The Daughters Of The Canaanites\nAbraham does not want Isaac absorbed into Canaanite religious and moral life. This is not about ethnic pride as much as covenant identity and worship. The family line must not be pulled away from the Lord.\nThis helps readers understand the concern. Marriage in Genesis is not merely romance; it affects worship, household direction, and covenant future.",
      "🧭 He Will Send His Angel Before You\nAbraham trusts that God will guide the servant's journey. The mission is practical, but it is also under divine direction. The servant must travel, ask, observe, and pray, but God goes before him.\nThis phrase gives the chapter its confidence. Guidance does not erase action; it goes with faithful action.",
      "💧 Let Down Your Pitcher\nThe servant prays for a sign involving hospitality and generosity. Drawing water for camels was hard work, so the sign is not random prettiness. It tests character, kindness, and willingness to serve.\nRebekah's response will reveal more than availability. It reveals a generous spirit strong enough to water a caravan.",
      "🏃 Rebekah Ran\nRebekah runs to draw water, showing energy, initiative, and hospitality. She does not do the bare minimum. Her actions echo Abraham's hospitality in Genesis 18.\nThis matters because Rebekah is not passive in the story. She is active, generous, courageous, and later willing to go.",
      "🙌 Blessed Be Yahweh\nThe servant worships when he sees God's guidance. He recognizes that the journey has been led by covenant faithfulness, not luck.\nThis phrase is one of the spiritual centers of the chapter. Prayer turns into praise when God's guidance becomes visible.",
      "🚶 I Will Go\nRebekah's willingness is crucial. Her family asks if she will go, and she says yes. Like Abraham, she leaves family and homeland to enter the promise story.\nThis is a major parallel. Rebekah becomes part of the covenant future by a faith-shaped departure. She is not dragged into the story; she responds.",
      "❤️ Isaac Loved Her\nThe chapter ends with Isaac receiving Rebekah and loving her. After Sarah's death, this brings comfort and continuity. The promise moves forward through a real marriage, not just a legal arrangement.\nThis ending is tender. Genesis shows God's guidance not only preserving a covenant line, but also bringing comfort to Isaac's grief.",
    ],
    truths: [
      "🧭 God guides the promise into the next generation.\nGenesis 24 is about Isaac's future and the continuation of the covenant family. Abraham will not live forever, but God's promise will continue.\nThis teaches that God's faithfulness is generational. He is not finished when one servant's life ends.",
      "🙏 Prayer and action belong together.\nThe servant prays, travels, observes, asks, and worships. He does not use prayer as an excuse for passivity.\nThis is a practical model of guidance. Faith prays while also taking responsible steps.",
      "💧 Character matters in covenant decisions.\nRebekah's kindness at the well reveals generosity and strength. The sign is about character, not superficial appearance.\nGenesis teaches that the future of a household should be shaped by faithful character, hospitality, and willingness to serve.",
      "🚶 Rebekah responds with courageous faith.\n'I will go' echoes Abraham's own leaving. Rebekah steps away from family into an unknown future connected to God's promise.\nThis shows that covenant faith is not only Abraham's story. Rebekah becomes an active participant in the promise.",
      "❤️ God's guidance can bring comfort after grief.\nIsaac receives Rebekah after Sarah's death, and he is comforted. The covenant continues through real human love and healing.\nThis matters because God's plan is not cold machinery. He guides history while also caring for wounded people.",
    ],
  },
};

const DAY_NINE_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 21:1-7": {
    phraseNote: "Reading tip: count the promise-fulfillment words: visited, as He had said, as He had spoken, set time. Genesis wants the reader to feel that Isaac exists because God kept His word.",
    truthNote: "This section teaches promise fulfilled after impossible waiting. Isaac is not just a baby; he is living proof that God's word outlasts age, barrenness, laughter, and delay.",
  },
  "Genesis 21:8-21": {
    phraseNote: "Reading tip: do not make Ishmael invisible because Isaac is the covenant son. Genesis carefully shows God hearing Ishmael and providing for Hagar, even while Isaac remains the promise line.",
    truthNote: "This section teaches that God's specific covenant choice does not erase His compassion for others. Isaac has a role, but Ishmael has dignity, future, and God's attention.",
  },
  "Genesis 21:22-34": {
    phraseNote: "Reading tip: Beersheba combines ordinary life and worship: wells, oaths, disputes, trees, and calling on God. Abraham's faith is lived in land agreements as much as altar moments.",
    truthNote: "This section teaches patient settlement. Abraham does not possess the whole land yet, but he acts with integrity, secures a well, plants a tree, and worships the everlasting God.",
  },
  "Genesis 22:1-19": {
    phraseNote: "Reading tip: Genesis 22 is built around tension: the son God promised is the son God asks Abraham to surrender. The chapter only makes sense if the reader feels that impossible tension.",
    truthNote: "This section teaches that God Himself provides. Abraham's obedience is real, but the final word is not Abraham's sacrifice. The final word is the Lord's provision.",
  },
  "Genesis 23:1-20": {
    phraseNote: "Reading tip: land purchase details may feel slow, but they matter. The first owned piece of the promised land is tied to Sarah's burial, so grief becomes connected with promise.",
    truthNote: "This section teaches faith inside grief. Abraham mourns honestly and acts faithfully, buying a burial place that becomes a small foothold in the promised land.",
  },
  "Genesis 24:1-67": {
    phraseNote: "Reading tip: this long chapter is about more than finding a wife. It shows God's guidance moving the covenant promise from Abraham to Isaac and Rebekah.",
    truthNote: "This section teaches generational guidance. God leads through prayer, character, hospitality, family decisions, and Rebekah's courageous yes.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_NINE_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_NINE_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_TEN_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 25:1-18": {
    phrases: [
      "👵 Abraham Took Another Wife\nAfter Sarah's death, Abraham's life continues. Keturah bears him more children, which reminds us that Abraham's household becomes larger than the covenant line through Isaac. Genesis is careful to honor these descendants while keeping the promise line clear.\nReading tip: more descendants does not mean the covenant path has changed. Genesis can acknowledge Abraham's wider family while still showing that God's specific promise continues through Isaac.",
      "🎁 Abraham Gave Gifts\nAbraham gives gifts to the sons of his concubines and sends them away from Isaac. In the ancient world, inheritance arrangements mattered deeply because they protected the main heir's future. This is Abraham acting to preserve clarity around Isaac's covenant role.\nThis detail may sound harsh, but the purpose is narrative focus. Abraham provides for the other sons while making sure the covenant inheritance is not confused.",
      "👦 Isaac His Son\nIsaac is singled out because he is the promised son through Sarah. Abraham has other children, but Isaac carries the covenant promise of land, offspring, and blessing. The story is narrowing to the next generation.\nThis matters because Genesis repeatedly distinguishes value from role. Other sons matter, but Isaac has a specific covenant calling.",
      "🌅 Abraham Breathed His Last\nAbraham dies after a long life, and Genesis describes him as old, full, and gathered to his people. The father of the promise does not live to see everything fulfilled, but he dies inside God's faithfulness.\nThat is important. Abraham's death does not mean the promise failed. God's covenant is bigger than one man's lifespan.",
      "⚰️ Isaac And Ishmael Buried Him\nIsaac and Ishmael come together to bury Abraham. After years of family tension, this moment quietly brings both sons to their father's grave. The Bible does not over-explain the emotion, but the detail is tender.\nIt reminds us that complicated family stories can still have moments of shared grief, honor, and dignity.",
      "🏜️ These Are The Generations Of Ishmael\nGenesis gives Ishmael's line before moving forward with Isaac. This fulfills God's promise that Ishmael would become a great people. He is not the covenant son, but he is not forgotten.\nThe genealogy is mercy in list form. God heard Hagar, blessed Ishmael, and gave him a future.",
    ],
    truths: [
      "🧬 The covenant line remains clear.\nAbraham has other descendants, but Isaac is the covenant heir. Genesis keeps the promise focused.\nThis teaches that God's plan can include many people with dignity while still assigning a specific role to one line.",
      "🎁 Provision and inheritance are not the same thing.\nAbraham gives gifts to other sons, but the covenant inheritance belongs to Isaac. That distinction matters.\nThe Bible is showing careful family leadership. Abraham provides while protecting the promise God gave.",
      "⚰️ God's promise outlives God's servants.\nAbraham dies before seeing the full land and nation promise completed. Yet the promise continues.\nThis helps readers understand generational faith. A person may die before seeing everything, but God's covenant does not die with them.",
      "🤝 Grief can gather complicated families.\nIsaac and Ishmael bury Abraham together. Their stories have tension, but they share this moment of honor.\nGenesis is honest about family pain, but it also leaves room for dignity and shared mourning.",
      "👂 God keeps His word to Ishmael too.\nIshmael's genealogy shows that God's promise to Hagar and Abraham about Ishmael came true.\nIsaac carries the covenant line, but Ishmael's future still matters to God. Specific election does not erase divine compassion.",
    ],
  },
  "Genesis 25:19-34": {
    phrases: [
      "📜 These Are The Generations Of Isaac\nThe story now shifts from Abraham to Isaac. This heading tells readers that the covenant promise is moving into the next generation. Abraham is gone, but God's story is not finished.\nReading tip: Genesis uses these headings like chapter doors. When you see 'generations,' ask whose line the promise is following now.",
      "🙏 Isaac Prayed To Yahweh For His Wife\nRebekah is barren, just like Sarah was. Isaac responds by praying, and the Lord answers. The next generation begins with the same lesson: the covenant family exists by God's gift, not natural strength.\nThis is important because barrenness keeps appearing in Genesis. God repeatedly brings promise through impossible or delayed birth so no one can mistake the covenant for human ability.",
      "🤼 The Children Struggled Together Within Her\nThe conflict between Jacob and Esau begins before birth. This is not normal sibling rivalry only; Genesis is showing that the family struggle is woven into the story from the womb.\nRebekah senses that something significant is happening and asks the Lord. That makes her more spiritually alert here than a passive observer.",
      "🌍 Two Nations Are In Your Womb\nGod tells Rebekah that the twins represent two peoples and two futures. Jacob and Esau are not just individual brothers; they become the ancestors of Israel and Edom.\nThis helps readers understand why the birth story has so much weight. Family conflict will become national conflict later in Scripture.",
      "👶 The Older Shall Serve The Younger\nThis reverses normal ancient expectations. Usually the firstborn son held priority, inheritance, and leadership. God announces that the younger will be chosen for the covenant line.\nThis is a major Genesis theme: God is free to choose in ways that overturn human custom. The promise moves by grace, not by birth order alone.",
      "🍲 Red Stew\nEsau comes in exhausted and wants Jacob's stew. The ordinary meal becomes the setting for a major spiritual decision. Hunger exposes Esau's values.\nThis scene is intentionally earthy. A bowl of food becomes the price of a birthright because Esau treats future covenant privilege like it is worth less than immediate appetite.",
      "📜 Birthright\nThe birthright was the firstborn's special inheritance and family position. In this family, it is even more serious because covenant promise is involved. Esau is not merely trading property; he is despising a sacred future.\nJacob is manipulative, but Esau is also responsible. Genesis wants us to see both: Jacob grasps, and Esau treats holy privilege as common.",
    ],
    truths: [
      "🙏 The promise continues through prayer and God's answer.\nIsaac prays, and Rebekah conceives. The covenant future depends on God's mercy again.\nThis teaches that every generation must depend on God for itself. Abraham's faith does not remove Isaac's need to pray.",
      "🔄 God often overturns human expectations.\nThe older will serve the younger. Birth order does not control God's promise.\nGenesis repeatedly shows God choosing in surprising ways. His purpose is not trapped inside cultural assumptions.",
      "🍲 Appetite can expose what we value.\nEsau trades his birthright for a meal. His hunger is real, but his decision reveals spiritual carelessness.\nThis is practical and serious. Temporary desire can make eternal or long-term gifts seem cheap.",
      "🧠 Manipulation and contempt can exist in the same scene.\nJacob takes advantage of Esau's hunger, and Esau despises the birthright. The Bible does not need one brother to be innocent for the story to work.\nGenesis is honest about messy families. God's promise moves forward through people who still need deep transformation.",
      "📜 Covenant privilege should not be treated as common.\nEsau's birthright is connected with family future and promise, but he treats it lightly.\nThis warns readers not to despise holy things because immediate desires feel louder. What God gives should be valued with reverence.",
    ],
  },
  "Genesis 26:1-11": {
    phrases: [
      "🌾 There Was A Famine In The Land\nIsaac faces famine just as Abraham did. This creates a deliberate father-son echo. The covenant heir must learn trust under pressure, not only inherit promises on paper.\nReading tip: Genesis often repeats patterns across generations. The repetition helps us see both inherited faith and inherited weakness.",
      "🚫 Do Not Go Down To Egypt\nGod tells Isaac not to go to Egypt. Unlike Abraham in Genesis 12, Isaac is told to stay in the land. The promise is tied to God's presence in the place God appoints.\nThis command teaches that survival instincts must submit to God's word. The obvious practical option is not always the faithful path.",
      "🏕️ Sojourn In This Land\nIsaac is called to live as a sojourner, staying in the land without full ownership. Sojourning means temporary residence, dependence, and vulnerability. He must trust God's presence while not fully possessing the promise.\nThis is Abraham's life repeated in Isaac. The covenant family lives between promise and fulfillment.",
      "🤝 I Will Be With You And Bless You\nGod repeats the core promise: presence and blessing. Isaac does not merely inherit Abraham's story; he receives God's word personally.\nThat matters because every generation needs its own encounter with God's promise. Isaac cannot live only on Abraham's memories.",
      "🌍 In Your Offspring All Nations Of The Earth Shall Be Blessed\nThe Abrahamic promise is repeated to Isaac. The covenant is still global in scope. God's purpose is not only to protect one family, but to bring blessing to the nations.\nThis line keeps Genesis from becoming small. Isaac's life matters because the promise through him is for the world.",
      "👩 She Is My Sister\nIsaac repeats Abraham's fear pattern by lying about Rebekah. The same family weakness appears in the next generation. The covenant line is protected by God, but the family still has patterns that need healing.\nThis phrase is sobering because Isaac had heard the promises and still acts out of fear. Promise does not automatically erase old survival strategies.",
      "👑 Abimelech Looked Out A Window\nAbimelech discovers Isaac's deception when he sees Isaac and Rebekah behaving like husband and wife. The outsider again sees what the covenant man tried to hide.\nThis detail exposes the lie and protects Rebekah. Once more, God prevents the promise from being endangered by fear.",
    ],
    truths: [
      "🔁 Faith patterns and fear patterns can both repeat.\nIsaac receives Abraham's promise, but he also repeats Abraham's lie. The next generation inherits both legacy and weakness.\nThis helps readers think honestly about family. We can receive good patterns and still need God to heal broken ones.",
      "📍 God's word can call us to stay when fear says run.\nIsaac is told not to go to Egypt but to sojourn in the land. Trust means staying where God commands.\nThis is not passivity. It is obedience under pressure, when self-protection wants to choose another road.",
      "🤝 Each generation needs God's promise personally.\nGod speaks the Abrahamic promise directly to Isaac. Isaac's faith cannot only be secondhand.\nThis is a major generational truth. Children of faith still need their own encounter with God's word.",
      "🛡️ God protects the promise from repeated failure.\nIsaac endangers Rebekah through fear, but God exposes the lie before disaster. The promise survives because God is faithful.\nThis is comfort, not excuse. Human failure is serious, but God's covenant faithfulness is stronger.",
      "🌍 The promise remains global.\nGod repeats that all nations will be blessed through Isaac's offspring. The family story still serves the world.\nGenesis keeps reminding us that covenant blessing is not meant to terminate on the family that receives it.",
    ],
  },
  "Genesis 26:12-25": {
    phrases: [
      "🌱 Isaac Sowed In That Land\nIsaac plants during a famine season and receives a hundredfold because the Lord blesses him. This is not luck; Genesis directly connects his fruitfulness to God's blessing.\nReading tip: Isaac's obedience to stay in the land is followed by provision in that land. God's blessing meets him where God's word placed him.",
      "📈 The Man Became Great\nIsaac's wealth grows until the Philistines envy him. Blessing creates visibility, and visibility creates tension. Prosperity is not presented as a problem by itself, but it attracts conflict.\nThis is realistic. God's blessing can bring provision and still make relationships more complicated.",
      "😒 The Philistines Envied Him\nEnvy drives the conflict. The Philistines see Isaac's increase and respond by stopping up wells. Envy often attacks what it cannot celebrate.\nThis phrase helps explain the well conflicts. The issue is not only water; it is resentment toward blessing.",
      "💧 Wells Of Water\nWells were life sources in the ancient world. A household with flocks, herds, servants, and fields needed water to survive. To stop up wells was to attack someone's future in the land.\nThis is why Isaac's well story matters. It is a practical conflict over survival and a spiritual picture of making room in the promise land.",
      "⛏️ Isaac Dug Again The Wells Of His Father\nIsaac reopens Abraham's wells and gives them the same names. This is a quiet act of continuity. He is not inventing a new covenant story; he is walking in the path of promise before him.\nThis detail shows honor for the previous generation while still requiring Isaac's own labor. Inherited promise still has to be dug into.",
      "⚔️ Esek And Sitnah\nThe well names mean strife and opposition. Isaac names the conflict instead of pretending it is not happening. These wells become memory markers of resistance.\nThat matters because faith does not deny conflict. Isaac keeps moving without letting every conflict become the final word.",
      "広 Rehoboth\nRehoboth means room or broad places. After conflict over wells, Isaac finally reaches a place where he says the Lord has made room for them. The name turns relief into testimony.\nThis phrase teaches that God can make space after seasons of opposition. Isaac does not win by constant fighting; he keeps trusting and moving until there is room.",
      "🪨 He Built An Altar There\nAt Beersheba, after God says not to fear, Isaac builds an altar, calls on the Lord, pitches his tent, and digs a well. Worship, home, and water all come together.\nThis is a beautiful order. Isaac's life is being centered again around God's presence, then practical life continues.",
    ],
    truths: [
      "🌱 God's blessing can flourish in hard conditions.\nIsaac sows during famine and receives a hundredfold because the Lord blesses him. The land is difficult, but God is faithful.\nThis does not make hardship easy. It shows that God's provision is not limited by the environment.",
      "😒 Blessing can attract envy.\nThe Philistines envy Isaac and attack the wells. Prosperity creates conflict.\nGenesis teaches that favor does not remove opposition. Sometimes blessing reveals what is in other people's hearts.",
      "💧 Practical resources matter to covenant life.\nWells are about water, survival, animals, and settlement. The promise is lived in practical realities.\nFaith does not float above daily needs. Water, work, land, and conflict are part of the story.",
      "🕊️ Peaceful persistence can be strength.\nIsaac keeps moving and digging instead of escalating every conflict. That is not weakness.\nSometimes faith refuses to let strife define the future. Isaac's patience eventually reaches Rehoboth, a place of room.",
      "🪨 Worship anchors provision.\nIsaac builds an altar after God's reassurance. He does not only enjoy the room God gives; he worships the God who gave it.\nThis teaches that relief should lead to remembrance. The well and the altar belong together.",
    ],
  },
  "Genesis 27:1-29": {
    phrases: [
      "👁️ Isaac Was Old, And His Eyes Were Dim\nIsaac's physical blindness becomes part of the deception scene. He cannot see clearly, and the family also lacks spiritual clarity. Favoritism, secrecy, and manipulation fill the household.\nReading tip: Genesis often lets physical details mirror deeper problems. Isaac's dim eyes set the stage for a chapter where almost everyone is acting in the dark.",
      "🍖 Make Me Delicious Food\nIsaac wants Esau to hunt and prepare the food he loves before receiving the blessing. The meal is tied to favoritism because Genesis already told us Isaac loved Esau because of his game.\nThis detail matters because appetite and preference are shaping a spiritual moment. Isaac is about to bless according to his desire, even though God had already spoken about the younger son.",
      "👂 Rebekah Was Listening\nRebekah overhears Isaac's plan and acts quickly. She knows the oracle from Genesis 25, but she tries to secure the outcome through deception rather than trust. Her knowledge of the promise does not make her method faithful.\nThis is important. Being right about what God promised does not justify doing wrong to force it.",
      "🎭 Obey My Voice\nRebekah tells Jacob to obey her voice, and the phrase stands out because covenant life is supposed to be shaped by God's voice. Jacob follows his mother's scheme instead of righteousness.\nThis phrase shows family pressure. Jacob is not only a villain acting alone; he is pulled into a household web of favoritism and manipulation.",
      "🐐 Skins Of The Young Goats\nThe goat skins are used to imitate Esau's hairy body. The deception becomes physical and theatrical: clothing, touch, smell, food, and words all become tools in the lie.\nGenesis slows the details so we feel the layers of deception. This is not a small misunderstanding; it is a planned performance.",
      "🙋 I Am Esau Your Firstborn\nJacob directly lies to his father. His name is already connected with grasping or supplanting, and now that pattern becomes explicit. He claims an identity that is not his.\nThe tragedy is that Jacob is chasing a blessing God already said would be his. He grasps through deceit what should have been received by faith.",
      "🙏 Because Yahweh Your God Gave Me Success\nJacob brings God's name into the lie. This is one of the ugliest parts of the scene. He uses religious language to make deception sound credible.\nThat is a serious warning. Using God's name to support dishonesty does not sanctify the lie; it makes the sin heavier.",
      "🌾 The Blessing\nIsaac blesses Jacob with dew, fatness of the earth, grain, wine, lordship, and protection. The blessing carries family authority and future significance. It is not just a sentimental prayer.\nThis is why the deception matters so much. In this family, blessing is tied to covenant future, inheritance, and the direction of generations.",
    ],
    truths: [
      "👁️ Spiritual blindness can be a family problem.\nIsaac cannot see physically, but the whole household is morally clouded. Favoritism and secrecy have damaged the family.\nGenesis teaches that deception rarely appears out of nowhere. It often grows in homes where trust has already been weakened.",
      "🎭 A right promise should not be pursued by wrong methods.\nRebekah knows Jacob is connected to the promise, but she uses deception to secure it. The method wounds the family.\nThis is a major lesson. God's promise does not need sin to help it succeed.",
      "🙏 Religious language can be misused.\nJacob uses God's name to support his lie. That is deeply serious.\nThe Bible warns us that spiritual words can be used in unspiritual ways. God's name must not be used to cover manipulation.",
      "🍖 Appetite and favoritism distort judgment.\nIsaac's desire for Esau's food is tied to his preference for Esau. Personal appetite shapes a covenant decision.\nThis is painfully practical. When preference rules the heart, people can ignore what God has already made clear.",
      "💔 Deception can carry the promise forward while still damaging people.\nJacob receives the blessing, but the family is fractured. God's plan continues, but sin leaves consequences.\nGenesis refuses a simplistic lesson. God remains faithful, and human deception is still destructive.",
    ],
  },
  "Genesis 27:30-46": {
    phrases: [
      "⏱️ As Soon As Isaac Had Finished Blessing Jacob\nThe timing is dramatic. Jacob has barely left when Esau arrives. Genesis wants the reader to feel how close the deception came to exposure.\nThis detail increases the grief of the scene. The blessing has been spoken, and the family cannot simply rewind the moment.",
      "😨 Isaac Trembled Very Violently\nIsaac's trembling shows shock, fear, and the realization that something bigger than his own plan has happened. He had intended to bless Esau, but Jacob received the blessing.\nThis moment may also reveal Isaac recognizing that God's earlier word about the younger son has prevailed despite his preference. The blessing stands.",
      "😭 Esau Cried Out With An Exceedingly Great And Bitter Cry\nEsau's grief is intense and real. Even though he despised the birthright earlier, the loss of blessing devastates him now. Genesis lets us hear the pain.\nThis is important because consequences can hurt deeply even when they are connected to earlier choices. Esau is responsible, but his grief is still human and heavy.",
      "🏷️ Is He Not Rightly Named Jacob\nEsau connects Jacob's name with supplanting or grasping. Jacob's character pattern is now visible to the family. He has taken the birthright and the blessing through grasping methods.\nThe phrase captures the wound of betrayal. Jacob's name becomes a painful summary of how Esau experiences him.",
      "🙏 Have You Not Reserved A Blessing For Me\nEsau longs for a blessing from his father. In the ancient family world, a father's blessing carried weight, identity, and future. This is not a casual request for encouragement.\nThe scene shows the emotional cost of favoritism and deception. Esau wants what cannot be given in the same way now.",
      "⚔️ By Your Sword You Shall Live\nIsaac's word over Esau describes a harder, more restless future. Esau will live by the sword and serve his brother, though there will be a time of breaking loose.\nThis points ahead to the later relationship between Edom and Israel. The family conflict becomes a national story.",
      "💢 Esau Hated Jacob\nThe chapter ends with hatred and a murder plan. The deception did not simply transfer a blessing; it shattered the family. Jacob must flee for his life.\nThis phrase connects back to Cain and Abel. Brotherly conflict again moves toward bloodshed, and the promise family is in danger from within.",
      "🏃 Flee To Laban My Brother In Haran\nRebekah sends Jacob away to her brother Laban. The escape saves Jacob's life, but it also means exile from home. The deceiver will soon enter a household where he himself will be deceived.\nGenesis is preparing the next stage. Jacob receives the blessing, but he will now learn through consequences, distance, and discipline.",
    ],
    truths: [
      "💔 Sin leaves real consequences even when God's plan continues.\nJacob receives the blessing, but the family breaks apart. God's promise moves forward, but nobody is unharmed.\nThis is one of Genesis's clearest lessons. Divine faithfulness does not make human deception painless.",
      "😭 Grief can awaken after despising what mattered.\nEsau despised the birthright earlier, but now cries bitterly over the blessing. The pain is real, even if his earlier values were wrong.\nThis warns readers not to treat spiritual inheritance lightly until it is too late. Some losses are only felt fully after the moment has passed.",
      "😨 God's purpose can overrule human preference.\nIsaac intended to bless Esau, but the blessing lands on Jacob, in line with God's earlier word. Human favoritism cannot overturn divine purpose.\nThat does not justify the deception. It means God's sovereignty can prevail even through a sinful family situation.",
      "⚔️ Family conflict can become generational conflict.\nJacob and Esau's struggle points ahead to Israel and Edom. The family wound becomes a larger story.\nGenesis helps readers see how private sin can ripple outward. Household brokenness can shape generations.",
      "🏃 Deception can win the moment and lose the home.\nJacob gets the blessing but must flee. He gains what he wanted and loses the life he knew.\nThis is sobering. Sin may secure an outcome, but it often creates exile, fear, and long consequences.",
    ],
  },
};

const DAY_TEN_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 25:1-18": {
    phraseNote: "Reading tip: Genesis honors Abraham's wider family but keeps repeating the covenant focus through Isaac. That helps readers separate human value from covenant role.",
    truthNote: "This section teaches generational handoff. Abraham dies, Ishmael's line is remembered, and Isaac remains the covenant heir. God's promise continues beyond Abraham's lifetime.",
  },
  "Genesis 25:19-34": {
    phraseNote: "Reading tip: the birthright scene is not only about soup. It is about appetite, inheritance, covenant privilege, and how immediate desire can make sacred things look cheap.",
    truthNote: "This section teaches that God's choice and human responsibility stand together. God speaks before the twins are born, but Jacob still manipulates and Esau still despises the birthright.",
  },
  "Genesis 26:1-11": {
    phraseNote: "Reading tip: Isaac's story intentionally echoes Abraham's. Famine, Gerar, Abimelech, wife-sister fear, and divine protection show both promise continuity and repeated weakness.",
    truthNote: "This section teaches that every generation needs both inherited promise and personal trust. Isaac receives God's word himself, but he also has to face fear himself.",
  },
  "Genesis 26:12-25": {
    phraseNote: "Reading tip: wells are survival, not decoration. The well conflicts show whether Isaac will fight, flee, or keep trusting God for room in the land.",
    truthNote: "This section teaches peaceful endurance. Isaac's strength is not shown by winning every argument, but by continuing until God makes room and then worshiping.",
  },
  "Genesis 27:1-29": {
    phraseNote: "Reading tip: watch the senses in this scene: sight, taste, touch, smell, and hearing. The whole deception works by manipulating Isaac's senses.",
    truthNote: "This section teaches that deception can use very ordinary things: food, clothes, family loyalty, and even religious language. The promise does not need those tools.",
  },
  "Genesis 27:30-46": {
    phraseNote: "Reading tip: the blessing is given, but nobody is at peace. That is the Bible's way of showing that getting the outcome through sin still fractures the people involved.",
    truthNote: "This section teaches that God's sovereignty is not permission for manipulation. God carries the covenant forward, but Jacob's deception still produces grief, hatred, and exile.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_TEN_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_TEN_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_ELEVEN_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 28:1-5": {
    phrases: [
      "🧓 Isaac Called Jacob And Blessed Him\nIsaac now knowingly blesses Jacob. Genesis 27 was filled with deception, but here Isaac intentionally sends Jacob away under the blessing. The family is still fractured, but the covenant direction is now clear.\nReading tip: this does not erase the sin of Genesis 27. It shows that God can keep the promise moving while the family still has to live with consequences.",
      "🚫 Do Not Take A Wife From The Daughters Of Canaan\nMarriage in Genesis is tied to worship, identity, and covenant future. Isaac does not want Jacob absorbed into Canaanite family life because the promise line must remain distinct. This is not a shallow dating preference; it is about the direction of the household.\nThe same concern appeared when Abraham sent for Rebekah. The covenant family is called to live in the land without becoming spiritually shaped by the land's corrupt patterns.",
      "🛣️ Go To Paddan Aram\nJacob is sent back toward the family region connected with Rebekah and Laban. The trip protects him from Esau's anger, but it also moves him toward the place where his own family story will begin. The road is both escape and providence.\nThis is important because Jacob leaves home with blessing and consequences tangled together. God will meet him on the way, but the journey begins because the family has broken badly.",
      "👨‍👩‍👧 Take A Wife From There\nJacob is instructed to marry within the extended family line. In the ancient world, marriage shaped alliances, inheritance, worship, and family future. Isaac is trying to preserve covenant continuity.\nThis phrase also prepares us for Genesis 29, where Jacob meets Rachel and Leah. The instruction sounds simple here, but the way it unfolds under Laban will become painful and complicated.",
      "💪 God Almighty Bless You\nIsaac invokes El Shaddai, God Almighty, the same covenant title connected with Abraham. The blessing rests on God's power, not Jacob's character. Jacob is leaving as a blessed man, but not yet a mature man.\nThat is a key tension. God is faithful to the covenant while Jacob still needs deep formation.",
      "📜 The Blessing Of Abraham\nThis phrase makes the covenant transfer explicit. Jacob is not receiving a random family blessing; he is receiving the promise of Abraham: offspring, land, and covenant future. The story has moved from Abraham to Isaac to Jacob.\nThis helps readers see the big Bible thread. The blessing is bigger than Jacob's personal success. It carries God's plan for the nations.",
    ],
    truths: [
      "🧭 God's promise keeps moving through fractured families.\nJacob leaves under blessing, but the family is not healthy. Esau is angry, Rebekah is planning, and Isaac is sending Jacob away.\nGenesis teaches that God's faithfulness is not dependent on a perfect household. But it also shows that sin still leaves painful consequences.",
      "🏠 Marriage affects covenant direction.\nIsaac's warning about Canaanite wives is about spiritual identity and future. The spouse Jacob chooses will shape the household that carries the promise.\nThe Bible treats family formation seriously because worship, values, children, and inheritance are all involved.",
      "🛣️ Exile can become formation.\nJacob is leaving home partly because of danger he helped create. But God will use the road to shape him.\nThis is a major Jacob theme. The journey away from home becomes the place where God begins changing the deceiver into a man who knows dependence.",
      "💪 The blessing rests on God's power.\nIsaac speaks God Almighty's blessing over Jacob. Jacob does not deserve confidence in himself.\nThis helps readers see grace. The promise is secure because God is mighty, not because Jacob is morally impressive.",
      "📜 The Abrahamic promise is now focused on Jacob.\nThe blessing of Abraham is spoken over Jacob. The covenant line is moving forward.\nThis is why Genesis keeps following Jacob even when Jacob is messy. The promise line is not about rewarding perfect people; it is about God's chosen plan.",
    ],
  },
  "Genesis 28:6-9": {
    phrases: [
      "👀 Esau Saw\nEsau notices Isaac blessing Jacob and warning him not to marry Canaanite women. This is an important phrase because Esau is reacting to what he sees, but he still does not seem to understand the deeper covenant issue. He notices the surface problem without fully grasping the heart of it.\nReading tip: Genesis often shows Esau responding late. He sees consequences after the moment has already passed.",
      "😔 The Daughters Of Canaan Did Not Please Isaac\nEsau realizes his Canaanite wives grieved his parents. Marriage choices had already become part of the family pain in Genesis 26. Now Esau tries to respond, but his response feels reactive instead of spiritually discerning.\nThis detail reminds us that choices made earlier keep shaping the family. Esau cannot fix years of direction with one quick adjustment.",
      "👰 Mahalath The Daughter Of Ishmael\nEsau marries into Ishmael's line, probably trying to move closer to Abraham's family identity. Ishmael is Abraham's son, so the choice may look like an attempt to repair his standing with his parents.\nBut Genesis presents this as another added wife, not a true return to covenant wisdom. Esau is trying to solve the appearance of the problem more than the heart.",
      "➕ Besides The Wives That He Had\nThis phrase shows Esau does not undo the earlier issue; he adds another marriage on top of it. The family complication grows. His solution is more addition than repentance.\nThat is a subtle but powerful lesson. Sometimes people try to fix spiritual problems by adding religious-looking choices without addressing the deeper pattern.",
      "🏹 Ishmael's Line\nIshmael's line has already been blessed by God, but it is not the covenant line through Isaac. Esau's marriage into that line does not make him the covenant heir. Genesis keeps distinguishing blessing, family relation, and covenant role.\nThis helps readers avoid confusion. Being near the promise family is not the same as valuing the promise.",
    ],
    truths: [
      "👀 Seeing the problem is not the same as understanding it.\nEsau notices that Canaanite wives displeased his parents, but his response is still shallow. He reacts to family pressure more than covenant truth.\nThis is very human. People can recognize consequences without fully understanding what their choices revealed.",
      "🔁 Reactive decisions rarely heal deep patterns.\nEsau adds another wife instead of truly addressing his direction. The surface changes, but the heart remains unclear.\nGenesis teaches that real repentance is deeper than image repair. It is not just doing something that looks closer to the right thing.",
      "🏠 Family choices carry spiritual weight.\nEsau's marriages affect Isaac and Rebekah and shape the household. Genesis refuses to treat marriage as isolated from faith.\nThis matters because covenant life is lived through families, values, loyalties, and future generations.",
      "🧩 Nearness to the covenant is not the same as covenant wisdom.\nIshmael is Abraham's son, but marrying into Ishmael's line does not restore Esau's spiritual priorities.\nThe Bible keeps showing that external connection is not enough. The heart must value what God values.",
      "😔 Delayed awareness can be painful.\nEsau seems to realize too late how his choices affected the family. Genesis lets us feel that sadness.\nThe story warns readers to value wisdom before consequences force attention.",
    ],
  },
  "Genesis 28:10-15": {
    phrases: [
      "🌙 Jacob Left Beersheba\nJacob leaves the safety of home and begins the road toward Haran. He is blessed, but he is also fleeing. The man who grasped for blessing now sleeps outside, vulnerable and alone.\nReading tip: this is Jacob's wilderness moment. He is between home and future, carrying both promise and consequence.",
      "🪨 He Took One Of The Stones\nJacob uses a stone for his head, showing how exposed and uncomfortable the journey is. This is not a royal departure. The blessed son is sleeping on the ground.\nThe stone will later become a pillar, which is beautiful. What begins as a hard pillow becomes a worship marker after God meets him.",
      "🪜 A Stairway Set Up On The Earth\nJacob dreams of a stairway or ladder connecting earth and heaven. The image shows that heaven is not cut off from earth. God is able to reach Jacob in the wilderness.\nThis matters because Jacob is not at an altar or family tent. He is on the road, and God reveals that the road is still under heaven's attention.",
      "👼 Angels Ascending And Descending\nThe angels show movement between heaven and earth. God's messengers are active, and Jacob's lonely campsite is actually a place of divine activity.\nThis is an aha moment. Jacob thought he was alone, but the unseen world is not empty. God's care is moving even where Jacob did not expect it.",
      "👑 Yahweh Stood Above It\nThe Lord stands over the stairway and speaks. The dream is not mainly about angels; it is about God revealing Himself and repeating the promise. The center is the Lord's word.\nThat word turns Jacob's night from fear and exile into covenant encounter. God meets Jacob before Jacob has cleaned himself up.",
      "📜 The Land On Which You Lie\nGod promises Jacob the very land where he is sleeping as a homeless traveler. Jacob owns none of it, yet God speaks it as promise. The contrast is powerful.\nHe is lying on the ground like a fugitive, and God says that ground belongs inside the covenant future.",
      "🤝 I Am With You And Will Keep You\nThis is the heart of the dream. God promises presence, protection, return, and faithfulness. Jacob is leaving home, but he is not leaving God's reach.\nThis phrase will carry Jacob through Laban's house. The road ahead will be hard, but the promise is not only land and offspring; it is God's presence with him.",
    ],
    truths: [
      "🛣️ God can meet people on the road of consequence.\nJacob is fleeing because of family fracture, yet God meets him. Grace appears on the road, not after Jacob becomes mature.\nThis teaches that God can begin forming people even while they are living with consequences.",
      "🌌 Heaven is closer than Jacob knows.\nThe stairway and angels show divine activity in the place Jacob thought was ordinary and lonely.\nThe Bible often opens our eyes to unseen reality. God's care is not limited to places that feel sacred.",
      "📜 God repeats the covenant personally.\nJacob has heard family blessing, but now God speaks directly to him. The promise becomes personal.\nEvery generation needs this. The God of Abraham and Isaac becomes the God who addresses Jacob on the road.",
      "🤝 Presence is part of the promise.\nGod says He will be with Jacob and keep him. The covenant is not only future land and descendants.\nThis is deeply comforting. God's promise includes companionship in the difficult middle.",
      "🔙 God promises return before Jacob even arrives.\nJacob is leaving, and God already promises to bring him back. The ending is held by God from the beginning.\nThis gives the journey a frame of hope. Jacob's exile will not be endless.",
    ],
  },
  "Genesis 28:16-22": {
    phrases: [
      "😮 Surely Yahweh Is In This Place\nJacob wakes and realizes God was present where he did not expect Him. His first response is surprise. The wilderness campsite was not empty after all.\nThis phrase matters because Jacob is learning that God's presence is not trapped in his father's house. The Lord is with him on the road.",
      "🙈 I Did Not Know It\nJacob admits he was unaware. God was present before Jacob recognized it. This is one of the tender truths of the scene.\nSometimes people think God arrives only when they feel Him. Genesis shows God can already be present before the person has the awareness to name it.",
      "🚪 The Gate Of Heaven\nJacob calls the place the gate of heaven because he has seen heaven and earth connected there. It becomes a place of access, awe, and revelation.\nThis is the opposite of Babel. At Babel, humans tried to build upward to reach heaven. At Bethel, God opens heaven downward by grace.",
      "🪨 Stone For A Pillar\nThe stone that served as Jacob's pillow becomes a pillar of remembrance. Jacob takes the hard object from his night of vulnerability and turns it into a marker of encounter.\nThis is beautiful because God can transform the meaning of a place. The stone no longer only says lonely road; it says God met me here.",
      "🫒 Poured Oil On Top Of It\nPouring oil marks the stone as set apart. Oil was used in consecration, dedication, and marking something as significant before God. Jacob treats the place as holy because of God's revelation there.\nThis action is early and simple, but it shows worship forming in Jacob. He is responding physically to what God showed him.",
      "🏠 Bethel\nBethel means house of God. Jacob renames the place because his experience of it has changed. What was once just Luz becomes a memory of divine presence.\nIn Genesis, naming places matters. A name preserves theology in geography. Bethel becomes a landmark in Jacob's spiritual story.",
      "🤲 If God Will Be With Me\nJacob's vow sounds cautious and conditional. God has promised, but Jacob's faith is still developing. He is responding, but not yet with the mature confidence we might expect.\nThis honesty matters. Jacob is not instantly transformed into a spiritual giant. He is at the beginning of a long walk with God.",
    ],
    truths: [
      "👁️ God may be present before we recognize Him.\nJacob says the Lord was there and he did not know it. His awareness came after God's presence.\nThis comforts readers who feel spiritually dull or surprised by grace. God is not limited by our immediate perception.",
      "⬇️ Bethel answers Babel.\nBabel was humans trying to reach heaven by pride. Bethel is God opening heaven to a fugitive by grace.\nThis contrast is rich. The way to God is not human achievement climbing upward, but divine mercy coming down.",
      "🪨 Memory markers help faith remember.\nJacob sets up the stone as a pillar. He does not want to forget what happened.\nFaith often needs reminders: places, practices, stories, and names that help us remember God's mercy.",
      "🌱 Faith can begin immature and still be real.\nJacob's vow is cautious, but it is a beginning. He is responding to God with the faith he has.\nGenesis lets us watch formation over time. God does not wait for Jacob to be fully mature before beginning with him.",
      "🏠 God's house can appear in unexpected places.\nJacob names a wilderness campsite Bethel, house of God. The sacred place was not where he expected.\nThis teaches that God's presence can turn ordinary, lonely, or hard places into places of encounter.",
    ],
  },
  "Genesis 29:1-14": {
    phrases: [
      "🛣️ Jacob Went On His Journey\nAfter Bethel, Jacob continues toward the east with God's promise behind him. The phrase suggests renewed movement. He is still away from home, but he is no longer traveling without a word from God.\nReading tip: Genesis places Bethel before Haran so we know Jacob enters Laban's world under God's promise, not merely under family pressure.",
      "💧 A Well In The Field\nThe well scene echoes earlier Genesis marriage stories, especially the servant finding Rebekah for Isaac at a well. Wells are meeting places, survival places, and often turning points in family stories.\nThis creates expectation. The reader has seen God guide a marriage at a well before, so Jacob's arrival at a well feels providential.",
      "🪨 The Stone On The Well's Mouth Was Large\nThe stone protects the water and controls access. Shepherds wait until flocks gather before rolling it away. Water is shared by community timing, not individual impulse.\nJacob's later rolling of the stone shows strength and urgency, but it also marks the moment Rachel enters the story. The obstacle at the well becomes the doorway to relationship.",
      "🐑 Rachel Came With Her Father's Sheep\nRachel appears as a shepherdess, actively caring for her father's flock. She is not introduced first by beauty only, but by work and responsibility.\nThis detail matters because Genesis often shows women in active roles at wells. Rachel is part of the household economy, and her arrival changes Jacob's story.",
      "💪 Jacob Rolled The Stone\nJacob rolls the stone away when he sees Rachel and waters Laban's flock. The action is dramatic and emotional. It shows energy, strength, and eagerness.\nThis is not only romance. Jacob is entering a household where labor, flocks, and family ties will define the next major season of his life.",
      "😭 Jacob Kissed Rachel And Wept\nJacob's tears show relief, emotion, and the weight of reaching family after exile. He has left home under threat, slept in the wilderness, and now finds his mother's kin.\nThe kiss is a family greeting in this context, not modern dating language. Jacob is overwhelmed by arrival, kinship, and hope.",
      "🦴 My Bone And My Flesh\nLaban welcomes Jacob as family with kinship language. It sounds warm and safe, but readers will soon learn Laban is complicated. The welcome is real, but it is not the whole story.\nThis phrase prepares tension. Jacob has found family, but he has also entered the house of a man who knows how to use family for advantage.",
    ],
    truths: [
      "🛣️ Promise does not remove the need to keep walking.\nJacob receives God's promise at Bethel, then continues the journey. Revelation leads to movement.\nThis teaches that spiritual encounters are not meant to freeze life. They strengthen people to keep walking into the next assignment.",
      "💧 God can guide through ordinary settings.\nA well, shepherds, flocks, and conversation become the setting for Jacob meeting Rachel. Nothing looks spectacular at first.\nGenesis shows providence working through normal life. Guidance often comes through ordinary roads and ordinary conversations.",
      "🔁 Family patterns repeat at wells.\nRebekah was found at a well for Isaac, and Rachel is met at a well by Jacob. Genesis uses echoes to connect generations.\nThese patterns help readers see continuity. The covenant family keeps moving through repeated scenes of guidance and provision.",
      "😭 Arrival can carry grief and hope together.\nJacob weeps when he meets Rachel. He has found family, but he is still away from home because of conflict.\nGenesis is emotionally honest. Hope does not erase the ache that brought someone there.",
      "⚠️ Warm welcomes still require discernment.\nLaban calls Jacob bone and flesh, but his later actions will be manipulative. The greeting sounds safe, but character will be revealed over time.\nThis warns readers not to confuse kinship language with trustworthy behavior.",
    ],
  },
  "Genesis 29:15-20": {
    phrases: [
      "💼 What Shall Your Wages Be\nLaban turns Jacob's family presence into a labor arrangement. The question sounds fair, but it introduces Laban's habit of negotiating relationships for advantage. Jacob is now inside a household where work, love, and bargaining mix together.\nReading tip: pay attention to Laban's questions. They often sound reasonable while serving his interests.",
      "👩 Leah's Eyes Were Tender\nThis phrase has been translated and understood in different ways. It may describe Leah's eyes as weak, delicate, or gentle. Genesis contrasts Leah and Rachel, but it does not invite us to despise Leah.\nThe detail matters because Leah will become the overlooked woman in the household. The Bible will soon show that God sees her pain even if Jacob does not.",
      "💃 Rachel Was Beautiful In Form And Appearance\nRachel is described as physically beautiful, and Jacob loves her. The attraction is real and powerful. Genesis does not pretend beauty is meaningless.\nBut the story will also show that beauty does not protect a household from pain. Rachel will be loved and still suffer barrenness, envy, and rivalry.",
      "❤️ Jacob Loved Rachel\nThis is the emotional center of the section. Jacob's love is strong enough that he offers seven years of service. His attachment to Rachel shapes the next fourteen years of his life.\nThis phrase is tender, but it also sets up family imbalance. Jacob's love for Rachel will leave Leah wounded and create rivalry in the household.",
      "🗓️ Seven Years\nSeven years of bride-service is a serious commitment. Jacob is poor or displaced, so labor becomes the bride price. He pays with time and work instead of wealth.\nThis helps modern readers understand the arrangement. Jacob is not casually waiting; he is binding years of labor to his desire to marry Rachel.",
      "⏳ They Seemed To Him But A Few Days\nGenesis presents Jacob's love for Rachel as making the years feel light. This is one of the most romantic lines in Genesis. But the beauty of the line sits right before betrayal.\nThat contrast matters. A tender love story is about to enter Laban's world of manipulation, and the reader is meant to feel the reversal.",
    ],
    truths: [
      "💼 Work and family can become tangled.\nJacob works for Laban as both relative and employee. The arrangement is personal and economic at once.\nGenesis shows how family systems can become complicated when love, labor, money, and power are mixed without integrity.",
      "👁️ God sees the overlooked person before the family does.\nLeah is introduced in contrast to Rachel, and she will soon be unloved. But God will see her.\nThis prepares readers to pay attention to Leah. The person treated as secondary in the household may be central in God's mercy.",
      "❤️ Love is powerful but not automatically wise.\nJacob's love for Rachel is real and strong. But love in this family will still be surrounded by favoritism and pain.\nGenesis helps readers avoid shallow romance. Strong affection can be beautiful, but a household also needs justice, truth, and care.",
      "⏳ Costly commitment can reveal desire.\nJacob serves seven years for Rachel. His love is not merely words.\nThis shows that real desire can endure labor and delay. But the story will also ask whether desire can survive disappointment and deception.",
      "⚠️ Tender moments can exist before painful turns.\nThe seven years seem like a few days, but Laban's deception is coming. Genesis lets beauty and pain stand close together.\nThis is honest to life. A story can be genuinely tender and still become complicated by sin.",
    ],
  },
  "Genesis 29:21-30": {
    phrases: [
      "👰 Give Me My Wife\nJacob asks for Rachel after completing the seven years. He has fulfilled his side of the agreement and expects Laban to honor his word. The request is direct because the time of service is complete.\nReading tip: Jacob, who once took by deception, now stands in the place of someone expecting fairness from another.",
      "🍽️ Laban Gathered All The Men And Made A Feast\nThe wedding feast creates a public celebration, but Laban uses the setting to hide his deception. Public joy becomes the cover for private manipulation.\nThis is painful because the feast should be a place of honor. Instead, it becomes the stage where Jacob is tricked.",
      "🌙 In The Evening He Took Leah\nThe deception happens under cover of evening. Darkness mattered in Genesis 27 when Jacob deceived blind Isaac, and now darkness becomes part of Jacob being deceived. The story is full of reversal.\nThis is not karma in a shallow sense, but narrative justice is hard to miss. Jacob is tasting the kind of deception he once practiced.",
      "😳 In The Morning, Behold, It Was Leah\nMorning reveals what darkness concealed. The word 'behold' makes the shock land. Jacob wakes to find he has been deceived.\nThis is one of the most dramatic reversals in Genesis. The deceiver discovers what it feels like to be deceived.",
      "❓ Why Then Have You Deceived Me\nJacob's question is painfully ironic. He asks Laban why he deceived him, using language that fits Jacob's own earlier actions toward Isaac and Esau. Genesis wants the reader to feel the mirror.\nThis does not make Laban innocent. It shows that Jacob is entering a season where his own patterns will be exposed through another man's manipulation.",
      "📜 It Is Not Done So In Our Place\nLaban appeals to local custom, saying the younger cannot be given before the firstborn. This is a brutal reversal for Jacob, the younger son who received what the older expected. Laban weaponizes custom for his own advantage.\nThe irony is sharp. Jacob's life has been shaped by the younger/older reversal, and now that theme is used against him.",
      "🗓️ Serve Me Another Seven Years\nLaban extracts fourteen years of labor for Rachel. He turns Jacob's love into leverage. The family welcome from earlier now reveals its cost.\nThis phrase shows Laban's character. He uses daughters, custom, and Jacob's desire to secure more labor.",
    ],
    truths: [
      "🪞 Deceivers may learn through being deceived.\nJacob is tricked by Laban in a way that mirrors his own deception. Genesis lets Jacob feel the pain from the other side.\nThis is not God approving Laban's sin. It is God using a hard situation to expose and shape Jacob.",
      "🌙 Darkness can hide what morning reveals.\nLaban's deception works at night, but morning exposes the truth. Genesis often uses light and darkness meaningfully.\nThis teaches that deception may succeed for a moment, but it cannot create lasting truth.",
      "💔 People can be used inside family schemes.\nLeah and Rachel are both caught in Laban's manipulation. Jacob is deceived, but the women are also treated as pieces in a deal.\nGenesis makes the household pain visible. Sin rarely wounds only one person.",
      "📜 Culture can be used as a tool of control.\nLaban appeals to custom after he has already deceived Jacob. He uses tradition to justify manipulation.\nThis warns readers that cultural rules can be twisted by selfish people. The issue is not custom alone, but character.",
      "⏳ God's formation can happen through painful reversal.\nJacob's years under Laban will shape him. The deceiver is being confronted with deception.\nThe process is painful, but God is not absent from it. Jacob is being changed in Laban's house.",
    ],
  },
  "Genesis 29:31-35": {
    phrases: [
      "👁️ Yahweh Saw That Leah Was Hated\nHated here means unloved or rejected in comparison with Rachel. Leah is not invisible to God. Jacob may prefer Rachel, but Yahweh sees Leah's pain.\nReading tip: this is the emotional center of Leah's story. The household ranks her second, but God moves toward her affliction.",
      "🤰 He Opened Her Womb\nGod gives Leah children while Rachel remains barren. This does not mean Leah's pain disappears, but it does show God honoring the unloved woman with fruitfulness.\nThe phrase connects with Genesis's repeated theme of wombs opened by God. Children in this family are not merely biology; they are bound up with divine mercy and covenant future.",
      "👶 Reuben\nReuben's name sounds connected with seeing: 'See, a son.' Leah hopes that because the Lord has seen her affliction, Jacob will now love her. The name carries both faith and longing.\nThis is heartbreaking. Leah receives a son from God, but she is still reaching for her husband's love.",
      "👂 Simeon\nSimeon's name connects with hearing. Leah says the Lord has heard that she is hated. God is not only seeing her pain; He hears it.\nThis echoes Hagar's story in a different household. God hears women in affliction, whether they are servants in the wilderness or unloved wives in the promise family.",
      "🤝 Levi\nLevi's name is connected with attachment. Leah hopes Jacob will become attached to her because she has borne him three sons. Her naming reveals how deeply she wants relationship, not only status.\nThis matters because children are being born inside emotional hunger. The future tribes of Israel begin in a household full of longing and pain.",
      "🙌 Judah\nWith Judah, Leah says, 'This time I will praise the Lord.' The focus shifts from trying to win Jacob's love to praising Yahweh. Judah's name is connected with praise.\nThis is huge because Judah will become the line of kings, David, and ultimately the Messiah. The royal line begins with the overlooked woman praising God.",
    ],
    truths: [
      "👁️ God sees the unloved.\nLeah is rejected in the household, but Yahweh sees her. Her pain matters to Him.\nThis is one of the most tender truths in Genesis. God's attention moves toward the person human love has overlooked.",
      "👂 God hears household pain.\nLeah's names show that God sees and hears. Her suffering is not dismissed because the family is part of the covenant line.\nThis reminds readers that chosen families can still be broken families. God's mercy enters the brokenness.",
      "👶 The tribes of Israel begin in a messy home.\nReuben, Simeon, Levi, and Judah are born into rivalry and longing. The future nation begins in real family pain.\nGenesis refuses to sanitize origins. God's people are built by mercy, not perfect family health.",
      "🙌 Praise can rise before every ache is fixed.\nLeah praises the Lord when Judah is born, even though her marriage pain is not fully solved. Praise does not mean life is painless.\nThis is deep faith. Leah's focus lifts toward God in the middle of unresolved longing.",
      "👑 God can bring royal promise through the overlooked.\nJudah comes through Leah, the unloved wife. Later the kingly line will come through him.\nThis is God's pattern again: He sees the one others undervalue and brings promise through unexpected places.",
    ],
  },
};

const DAY_ELEVEN_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 28:1-5": {
    phraseNote: "Reading tip: Jacob leaves with the blessing of Abraham, but he also leaves because the family is broken. Hold both together: promise and consequence are traveling with him.",
    truthNote: "This section teaches that God's covenant keeps moving, but sin still sends people down painful roads. Jacob is blessed, but he is not leaving in peace.",
  },
  "Genesis 28:6-9": {
    phraseNote: "Reading tip: Esau's response is reactive. He sees what displeases his parents and tries to adjust, but Genesis does not present this as deep covenant wisdom.",
    truthNote: "This section teaches that surface-level correction cannot replace true understanding. Esau changes something outward, but the deeper issue is still his relationship to the promise.",
  },
  "Genesis 28:10-15": {
    phraseNote: "Reading tip: Jacob's dream is a grace scene. God meets him before Jacob has become mature, honest, or settled. The promise comes to him on the road.",
    truthNote: "This section teaches presence before performance. God promises to be with Jacob and keep him while Jacob is still very much in process.",
  },
  "Genesis 28:16-22": {
    phraseNote: "Reading tip: Bethel is the opposite of Babel. Babel was human pride trying to reach heaven; Bethel is God opening heaven to a lonely fugitive.",
    truthNote: "This section teaches that God's presence can transform an ordinary hard place into a holy memory. Jacob did not build his way up; God revealed Himself down.",
  },
  "Genesis 29:1-14": {
    phraseNote: "Reading tip: the well scene should remind readers of Rebekah's story. Genesis uses repeated well scenes to show guidance, family connection, and covenant movement.",
    truthNote: "This section teaches providence through ordinary meetings. A road, a well, some shepherds, and a conversation become the next step in God's promise story.",
  },
  "Genesis 29:15-20": {
    phraseNote: "Reading tip: the beauty of Jacob's love for Rachel is real, but Genesis places it inside Laban's world of bargaining. Tender desire is about to meet manipulation.",
    truthNote: "This section teaches that love needs truth around it. Strong affection is beautiful, but without integrity in the household, love can become tangled in pain.",
  },
  "Genesis 29:21-30": {
    phraseNote: "Reading tip: Jacob deceived through disguise and darkness; now Laban deceives Jacob through darkness and custom. Genesis wants you to feel the mirror.",
    truthNote: "This section teaches painful formation. God is not approving Laban's deception, but Jacob is learning what deception feels like from the other side.",
  },
  "Genesis 29:31-35": {
    phraseNote: "Reading tip: slow down over Leah's sons' names. They are not random labels. Each name opens a window into Leah's pain, hope, and changing focus.",
    truthNote: "This section teaches that God sees the overlooked and can bring future promise through them. Judah, the line of kings, comes from Leah's praise.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_ELEVEN_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_ELEVEN_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

const DAY_TWELVE_READER_NOTE_DEPTH_UPDATES: Record<string, { phrases: string[]; truths: string[] }> = {
  "Genesis 30:1-13": {
    phrases: [
      "😔 Rachel Envied Her Sister\nRachel is loved by Jacob, but Leah has children, and envy grows in the space where love does not solve barrenness. Genesis is honest: Rachel has what Leah longs for, and Leah has what Rachel longs for. Both women are hurting in different ways.\nReading tip: do not flatten this into simple jealousy. This is a household where worth, motherhood, love, and status are tangled together.",
      "💔 Give Me Children, Or Else I Die\nRachel's words reveal desperation. In the ancient world, bearing children affected honor, security, inheritance, and a woman's perceived place in the family. Rachel's pain is emotional, social, and spiritual.\nThe phrase also shows how dangerous comparison has become. Rachel is loved, but she feels as if life is impossible without the one thing Leah has.",
      "🔥 Jacob's Anger Was Kindled\nJacob reacts sharply, asking whether he is in God's place. His theology is technically true: God opens and closes the womb. But his tone does not sound tender toward Rachel's pain.\nThis is a helpful human detail. Someone can say a true thing in a way that does not heal the person suffering in front of them.",
      "👩‍🦱 Bilhah My Servant\nRachel gives Bilhah to Jacob, echoing Sarai giving Hagar to Abram. The family is repeating an old shortcut pattern. A servant woman is again pulled into someone else's pain and plan.\nThat connection matters. Genesis is showing that unhealthy family strategies can repeat across generations when they are not healed.",
      "⚖️ God Has Judged Me\nRachel names Dan from the idea of judgment or vindication. She interprets the birth through competition with Leah. The child is received, but the language around him is shaped by rivalry.\nThis teaches us to listen to the names. The children's names become windows into the emotional battlefield of the household.",
      "🤼 With Mighty Wrestlings\nNaphtali's name is connected with wrestling. Rachel describes her relationship with Leah as a struggle she has won. The household is growing, but not peacefully.\nThat is the tension of Genesis 30. The future tribes of Israel are being born, but they are being born into competition, pain, and grasping.",
      "🍀 Gad And Asher\nWhen Leah gives Zilpah to Jacob, Gad and Asher are born, and their names connect with fortune and happiness. Leah also uses the birth of sons to interpret her standing and joy.\nThe names reveal that the women are trying to find security and identity through children. God is building the future nation, but the family system is deeply wounded.",
    ],
    truths: [
      "👁️ Loved people can still carry deep pain.\nRachel is loved by Jacob, yet she is suffering because she has no children. Love from a person does not automatically heal every ache.\nGenesis is emotionally honest. It lets us see that different kinds of pain can exist in the same household at the same time.",
      "🔁 Unhealed patterns repeat.\nRachel giving Bilhah to Jacob echoes Sarai and Hagar. The same kind of shortcut returns in the next generation.\nThis is a serious family lesson. What is not healed often gets replayed, sometimes with new names but the same damage.",
      "🧍 Servants are not tools for family pain.\nBilhah and Zilpah are drawn into the rivalry. The household grows, but vulnerable women are being used in the struggle.\nGenesis does not romanticize this. It shows the cost of trying to solve insecurity through control.",
      "🏷️ Names reveal the heart of the household.\nDan, Naphtali, Gad, and Asher are not random labels. They carry words of judgment, wrestling, fortune, and happiness.\nThe names teach us what the mothers are feeling. The future tribes begin inside very human longing.",
      "🌱 God can build His future through messy beginnings.\nIsrael's tribes begin in rivalry and pain, not a perfect home. This does not make the rivalry good.\nIt shows that God's mercy can work through broken family systems while still exposing how broken they are.",
    ],
  },
  "Genesis 30:14-24": {
    phrases: [
      "🌿 Mandrakes\nMandrakes were plants associated in the ancient world with fertility and desire. Reuben finds them, and the sisters' conflict turns even this plant into a bargaining tool. The detail shows how desperate the household has become around children and love.\nReading tip: the mandrakes are not the hero of the scene. Genesis places folk fertility hopes beside the real God who opens wombs.",
      "💬 Is It A Small Matter That You Have Taken Away My Husband\nLeah's words show how unloved she feels. Rachel has Jacob's affection, while Leah has sons. Each sister feels robbed by the other.\nThis is not a healthy family argument. It is the sound of years of comparison, favoritism, and emotional hunger coming out in one sharp sentence.",
      "🛏️ I Have Hired You\nLeah says she has hired Jacob with her son's mandrakes. The marriage relationship has become transactional and painful. Jacob is being moved between wives through negotiation.\nThis phrase is supposed to feel sad. Genesis is showing what happens when family life becomes competition for affection, children, and status.",
      "👂 God Listened To Leah\nGod listens to Leah and gives her another son. This is tender because Leah is still carrying pain, but God is not indifferent to her. He hears the unloved woman again.\nThe phrase also corrects superstition. The mandrakes do not control the womb; God listens and gives life.",
      "🎁 Issachar And Zebulun\nLeah names Issachar with language of reward or wages, and Zebulun with language of honor or dwelling. Her names still reveal her desire for Jacob's regard.\nThe sons are blessings, but the names show unresolved longing. Leah keeps hoping that bearing children will finally secure love.",
      "👧 Dinah\nDinah is named briefly, but her presence matters because she will become central in Genesis 34. Genesis often introduces people quietly before their story becomes important later.\nThis is a reading tip: do not skip names just because they are brief. Dinah's name is a seed planted for a later painful chapter.",
      "🧠 God Remembered Rachel\nGod remembering Rachel does not mean He forgot her. In the Bible, God remembering means He turns faithful attention toward someone and acts. Rachel's long barrenness is met by divine mercy.\nThis phrase echoes earlier moments where God remembers Noah or remembers covenant promises. It marks a turning point.",
      "👶 Joseph\nJoseph's name is connected with adding or taking away. Rachel says God has taken away her reproach and asks the Lord to add another son. Joseph's birth is a major turning point because his story will later carry Genesis into Egypt.\nThe child born out of long waiting will become central to the survival of the family.",
    ],
    truths: [
      "🌿 Human fertility hopes cannot replace God.\nMandrakes enter the story, but God is the one who listens and remembers. The plant does not control the promise.\nGenesis teaches readers to see beneath folk practices. Life comes from God, not from magical techniques.",
      "💔 Rivalry turns gifts into bargaining chips.\nMandrakes, time with Jacob, and even children become pieces in the sisters' struggle. The household is growing, but the relationships are hurting.\nThis shows that blessing without peace can still feel painful. Growth is not the same as health.",
      "👂 God listens to the unloved and remembers the barren.\nGod listens to Leah and remembers Rachel. Both women are seen by Him in different forms of pain.\nThis is beautiful theology. God's compassion is not limited to one side of a family conflict.",
      "🏷️ Names keep telling the emotional story.\nIssachar, Zebulun, and Joseph all reveal longing, reward, honor, reproach, and hope. The names are mini testimonies.\nGenesis uses naming to teach us what is happening inside the people, not only around them.",
      "🌅 Joseph's birth turns the story toward the future.\nJoseph seems like one more child in a crowded household, but he will become central later. Genesis is quietly preparing the next major movement.\nGod often plants the future in a birth that looks ordinary at first.",
    ],
  },
  "Genesis 30:25-43": {
    phrases: [
      "🏠 Send Me Away, That I May Go To My Own Place\nAfter Joseph is born, Jacob asks to return home. Joseph's birth seems to awaken the next stage of Jacob's journey. He has wives, children, and years of labor behind him.\nThis phrase matters because Jacob is still living away from the land God promised to bring him back to. The desire to return is part of the Bethel promise beginning to move.",
      "👀 I Have Learned By Divination\nLaban says he has learned that the Lord blessed him because of Jacob. The word points to pagan or superstitious ways of trying to gain knowledge. Laban recognizes blessing, but not with a healthy covenant heart.\nThis is an important contrast. Laban wants the benefits of God's blessing without surrendering to the God who blesses.",
      "💰 Name Your Wages\nLaban offers wages again, but readers already know Laban's deals are not clean. He has used labor, family, and negotiation for his own advantage. The phrase sounds fair, but the relationship is full of distrust.\nJacob has lived long enough with Laban to know that a wage agreement can become another trap.",
      "🐐 Speckled And Spotted\nJacob asks for the marked animals as his wages. This creates a visible way to separate what belongs to Jacob from what belongs to Laban. In a flock economy, livestock meant wealth, survival, and future independence.\nThe details may feel strange, but the issue is simple: Jacob needs a fair way to build his own household after years of serving Laban.",
      "🔀 Laban Removed The Animals\nLaban immediately removes the animals that should have become Jacob's starting flock. This shows his character again. He agrees, then manipulates the conditions.\nGenesis wants us to see that Jacob is working under a man who keeps changing the field. The conflict is not only family drama; it is economic exploitation.",
      "🌿 Peeled Rods\nJacob's breeding strategy with rods sounds strange to modern readers. The text does not require us to turn the rods into modern genetics. The larger point is that Jacob acts within the flock practices of his world while God is the one who ultimately prospers him.\nLater Jacob will say God took Laban's livestock and gave them to him. Genesis keeps the deeper credit with God.",
      "📈 The Man Increased Exceedingly\nJacob becomes wealthy with flocks, servants, camels, and donkeys. This fulfills God's promise to be with him and bless him away from home.\nThe increase is not cleanly separated from tension, strategy, and Laban's manipulation. Genesis shows blessing happening in an unfair workplace.",
    ],
    truths: [
      "🏠 God's promise creates a pull toward home.\nJacob asks to leave after Joseph is born. The Bethel promise of return is beginning to stir in the story.\nThis teaches that God's earlier word may reawaken at the right time. Jacob's life is moving back toward the land.",
      "💰 Some people want God's blessing without God's rule.\nLaban knows he has been blessed because of Jacob, but he still manipulates Jacob. He wants benefit without surrender.\nThis is a very modern warning. People can appreciate the fruit of God's presence while resisting God's character.",
      "⚖️ God can bless people under unfair systems.\nLaban keeps shifting things, but Jacob still increases. God sees more than the contract on paper.\nThis does not make exploitation good. It means exploiters do not have the final word over God's care.",
      "🧠 Strategy and providence can work together.\nJacob uses flock strategy, but the story ultimately credits God with his increase. Human action and divine provision are not enemies here.\nGenesis teaches that people can work wisely while still confessing that blessing comes from God.",
      "📈 Increase can create new tension.\nJacob's wealth grows, but that growth will soon make Laban's household suspicious. Blessing can change relationships.\nThe story prepares us for Genesis 31, where prosperity under pressure becomes the reason Jacob must leave.",
    ],
  },
  "Genesis 31:1-16": {
    phrases: [
      "🗣️ Jacob Heard The Words Of Laban's Sons\nLaban's sons accuse Jacob of taking what belonged to their father. The atmosphere has changed. Jacob's blessing is now being interpreted as theft.\nReading tip: when God blesses Jacob under Laban, the people benefiting from control become resentful. The conflict is moving from private tension to public accusation.",
      "😠 Laban's Face Was Not Toward Him As Before\nLaban's expression reveals that the relationship has shifted. Jacob can see that he is no longer welcome in the same way. The emotional climate has become dangerous.\nThis phrase is practical and human. Sometimes God uses changed faces, closed doors, and relational tension to show that a season is ending.",
      "🔙 Return To The Land Of Your Fathers\nGod speaks clearly: it is time to go home. This directly echoes the Bethel promise that God would bring Jacob back. The return is not merely Jacob's preference; it is God's command.\nThis matters because Jacob's departure will look messy, but the call to return is rooted in God's word.",
      "🤝 I Will Be With You\nGod repeats the promise of presence. Jacob is leaving Laban, but he is not traveling alone. The God who met him at Bethel is still with him.\nThis phrase is the anchor. Jacob faces Laban behind him and Esau ahead of him, but God's presence travels with him.",
      "🔟 Your Father Has Cheated Me And Changed My Wages Ten Times\nJacob names years of unfair treatment. 'Ten times' communicates repeated mistreatment, whether exact or idiomatic. Laban's pattern has been exploitation.\nThis is important because Jacob is not imagining the injustice. Genesis lets him name the pressure he has lived under.",
      "👼 The Angel Of God Said To Me In The Dream\nJacob explains that God has been watching the flocks and Laban's actions. The dream shows that God was not absent from the confusing details of Jacob's work.\nThis helps interpret Genesis 30. The flock increase was not merely superstition or cleverness; God was defending Jacob under unfair treatment.",
      "🪨 I Am The God Of Bethel\nGod identifies Himself by the place where He first met Jacob on the road. Bethel becomes a memory anchor. The God who promised presence then is calling Jacob home now.\nThis phrase ties Jacob's journey together. The God of the lonely stone is the God of the return.",
      "👭 Rachel And Leah Answered\nRachel and Leah agree with Jacob. They say their father has treated them like foreigners and consumed their money. The women are not silent props; they interpret their own experience of Laban's household.\nTheir response matters because Jacob's departure includes the whole family recognizing that Laban's house is no longer home.",
    ],
    truths: [
      "🧭 God can use tension to signal transition.\nLaban's sons accuse Jacob, and Laban's face changes. Then God tells Jacob to return.\nThis does not mean every conflict is a sign to leave, but here God uses the pressure to move Jacob toward the promise.",
      "🔙 God's old promises can become present commands.\nAt Bethel, God promised return. In Genesis 31, He commands return.\nThis teaches readers to remember God's earlier words. What God promised before may guide the next step when the time comes.",
      "👁️ God sees unfair labor.\nJacob says Laban changed his wages repeatedly, and God protected him. The workplace injustice is not invisible to God.\nThis is deeply practical. God cares about exploitation, wages, pressure, and years of hard service.",
      "🪨 Memory strengthens obedience.\nGod says He is the God of Bethel. Jacob is called to remember where the journey began.\nFaith often needs to look back so it can move forward. Remembering God's past presence helps Jacob obey the present call.",
      "👭 The women understand the cost too.\nRachel and Leah speak about their father's treatment. They are not merely being carried along by Jacob.\nGenesis lets their voices matter. Leaving Laban is a family decision shaped by shared recognition of injustice.",
    ],
  },
  "Genesis 31:17-21": {
    phrases: [
      "🐫 Jacob Rose Up And Set His Sons And Wives On Camels\nJacob moves from conversation to action. His whole household is now mobile: wives, children, livestock, and possessions. This is not a small trip; it is a major family migration.\nReading tip: the promise is traveling with a messy, growing household. Jacob is no longer the lone man with a stone pillow.",
      "📦 All His Goods Which He Had Gathered\nJacob leaves with the wealth acquired in Paddan Aram. These goods represent years of labor under Laban and God's protection through unfairness.\nThe phrase matters because Jacob is not leaving empty. God has preserved him and increased him, even in a hard place.",
      "🏠 To Go To Isaac His Father In The Land Of Canaan\nJacob's destination is covenantal: back to his father and back to Canaan. The return is personal, family-based, and tied to the promised land.\nThis shows that the journey is not random escape. It is a move back toward the promise God spoke at Bethel.",
      "🗿 Rachel Stole The Household Gods\nThe household gods, or teraphim, may have been tied to family religion, inheritance claims, or household authority. Rachel's theft shows that leaving Laban's house is spiritually messy.\nThis is a major warning detail. Jacob is obeying God's call, but idolatry and deception are traveling in the caravan.",
      "🤫 Jacob Deceived Laban\nJacob leaves without telling Laban. The word has the sense of stealing Laban's heart, meaning he acts secretly. Jacob is obeying God's command to return, but he does so in a way shaped by fear and old habits.\nThis is classic Jacob. The direction is right, but the method is still tangled.",
      "🌊 He Crossed The River\nCrossing the river marks a boundary in the journey away from Laban and toward Canaan. It is a physical movement with spiritual meaning: Jacob is leaving one world and returning to the land of promise.\nGenesis often gives travel details because movement matters. Crossing lines changes the story.",
    ],
    truths: [
      "🛣️ Obedience can still be messy.\nJacob is going where God told him to go, but secrecy and stolen idols are part of the departure. The right direction is mixed with flawed method.\nThis helps readers be honest. God may be leading someone forward while still exposing patterns that need transformation.",
      "🗿 Idolatry can travel with people leaving bad places.\nRachel steals household gods. Physically leaving Laban does not mean every part of Laban's world has been left behind.\nThis is a strong spiritual lesson. Deliverance also requires dealing with what the heart carries.",
      "📦 God can bring people out with provision.\nJacob leaves with family, flocks, and goods. Years of labor were not wasted.\nGod's care in hard places can become provision for the next stage. Laban's control did not stop God's increase.",
      "🤫 Fear can shape obedience in unhealthy ways.\nJacob leaves secretly. His fear of Laban is understandable, but secrecy also continues the deception pattern.\nGenesis shows growth without pretending Jacob is fully healed. He is moving, but still being formed.",
      "🔙 Return is part of God's faithfulness.\nJacob heads back toward Canaan, just as God promised at Bethel. The return journey is covenant fulfillment in motion.\nThis reminds readers that God keeps long promises across complicated years.",
    ],
  },
  "Genesis 31:22-35": {
    phrases: [
      "🏃 Laban Pursued Him Seven Days' Journey\nLaban chases Jacob with determination. This is not a mild family check-in. It is a pursuit that could become dangerous if God does not intervene.\nReading tip: Jacob may be leaving Laban, but Laban is not ready to release control. The old household still reaches after him.",
      "🌙 God Came To Laban In A Dream\nGod warns Laban before he reaches Jacob. This is protective mercy. Jacob is vulnerable, and God restrains the man who could harm him.\nThe phrase shows God's sovereignty over outsiders too. Laban may not be covenant-hearted, but God can still speak and limit him.",
      "⚠️ Do Not Speak To Jacob Either Good Or Bad\nThis warning means Laban must not manipulate, threaten, or harm Jacob. God places a boundary around Jacob before Laban arrives.\nThis is important because Jacob's safety rests not on his secrecy, but on God's protection. God controls the confrontation before it starts.",
      "🎶 Why Did You Flee Secretly\nLaban accuses Jacob of leaving without allowing celebration or goodbye. His speech sounds wounded and reasonable, but readers know Laban's history of manipulation.\nThis is what makes Laban complicated. He uses family language and emotional appeal, but his behavior has not been trustworthy.",
      "🗿 Why Did You Steal My Gods\nLaban's question exposes the absurdity of household gods that can be stolen and hidden. If a god can be packed into a saddle, Genesis is quietly mocking its power.\nAt the same time, the theft is serious because Rachel has brought idolatry into Jacob's camp. The scene exposes Laban's gods and Rachel's deception at once.",
      "☠️ Anyone With Whom You Find Your Gods Shall Not Live\nJacob speaks rashly because he does not know Rachel stole the idols. His confidence could have endangered Rachel if the truth came out.\nThis is another example of Jacob's words running ahead of full knowledge. The family still contains hidden danger.",
      "🐪 Rachel Hid Them In The Camel's Saddle\nRachel hides the household gods and deceives her father. The deceiver's household is still full of deception. She is leaving Laban, but acting in Laban-like ways.\nThe detail is both tense and ironic. Laban searches for his gods, but they are hidden under his daughter.",
    ],
    truths: [
      "🛡️ God can restrain people who intend harm.\nGod warns Laban before the confrontation. Jacob is protected before he can defend himself.\nThis shows God's care in conflict. Protection may come through God limiting what another person is allowed to do.",
      "🎭 Manipulative people may sound wounded when control is challenged.\nLaban speaks as if Jacob has robbed him of a sweet goodbye. But his history complicates his words.\nGenesis teaches discernment. Emotional language is not always the same as honest love.",
      "🗿 False gods are powerless and portable.\nLaban's gods can be stolen, hidden, and searched for. Genesis exposes their weakness.\nThis contrasts sharply with Yahweh, who appears in dreams, protects Jacob, and commands the future. The true God cannot be packed or lost.",
      "🤐 Hidden sin creates danger in the family.\nJacob does not know what Rachel has done, and his rash vow could have deadly consequences. Secrets make the whole household unsafe.\nThis is a practical truth. Hidden wrongdoing can place people at risk who do not even know the full story.",
      "🔁 Deception still needs healing.\nRachel deceives Laban, Jacob deceives Laban, and Laban has deceived Jacob. The whole family system is soaked in deception.\nGod is leading Jacob out, but He is also exposing how much transformation is still needed.",
    ],
  },
  "Genesis 31:36-42": {
    phrases: [
      "🔥 Jacob Was Angry And Argued With Laban\nJacob finally speaks openly after years of pressure. His anger is not random; it comes after exploitation, pursuit, accusation, and the search through his belongings.\nReading tip: this is one of Jacob's most direct speeches. The quiet worker under Laban finally names what the last twenty years cost.",
      "🔎 What Is My Offense\nJacob asks Laban to produce evidence. Laban searched everything and found nothing. Jacob pushes the issue into public accountability.\nThis matters because accusations can control people when they are never examined. Jacob demands that Laban's claims be tested.",
      "🐑 These Twenty Years I Have Been With You\nThe phrase marks the length of Jacob's service. Twenty years is not a short conflict; it is a long season of labor, pressure, and family entanglement.\nGenesis wants us to feel the weight of time. Jacob's prosperity did not come through ease; it came through endurance under unfair conditions.",
      "☀️ By Day The Heat Consumed Me, And The Cold By Night\nJacob describes the physical cost of shepherding. Ancient shepherd work involved exposure, danger, lost sleep, and responsibility for animals in harsh conditions.\nThis detail helps modern readers. Jacob's wealth came through real labor, not easy blessing.",
      "🔟 You Changed My Wages Ten Times\nJacob repeats the charge of Laban's instability and exploitation. The exact number may express repeated action, but the point is clear: Laban kept changing terms to benefit himself.\nThis is workplace injustice in an ancient family business. Genesis takes it seriously.",
      "👁️ God Saw My Affliction\nJacob says God saw his affliction and labor. That phrase is powerful because it means the hard years were not invisible to God. God was witness when Laban was unfair.\nThis connects Jacob's story with Leah, Hagar, and others God sees in distress. The Lord notices exploited people.",
      "⚖️ God Rebuked You Last Night\nJacob interprets Laban's dream correctly: God intervened to protect him. The confrontation is not merely family argument; divine judgment has already limited Laban.\nThis phrase brings the speech back to God's protection. Jacob's safety rests on God's rebuke, not Jacob's strength.",
    ],
    truths: [
      "👁️ God sees long-term unfair treatment.\nJacob's twenty years were not invisible. God saw the labor, changed wages, and affliction.\nThis is a strong comfort for people under pressure. Exploitation may be ignored by people, but it is not ignored by God.",
      "🗣️ Naming injustice can be necessary.\nJacob finally names what Laban has done. He does not stay silent forever.\nThis teaches that peace is not pretending harm did not happen. There are moments when truth must be spoken clearly.",
      "💼 Work matters to God.\nJacob talks about heat, cold, animals, loss, and wages. The Bible includes the details of labor.\nGod cares about ordinary work conditions, fairness, and the cost people carry to provide for a household.",
      "🛡️ God's protection may be seen in what did not happen.\nLaban had power to harm Jacob, but God rebuked him. Protection came through restraint.\nSometimes God's care is visible not only in dramatic rescue, but in the harm He prevents.",
      "⏳ Endurance does not mean the pain was imaginary.\nJacob endured twenty years, but he still names the hardship. Faithfulness under pressure does not erase the pressure.\nGenesis honors both: Jacob worked hard, and Laban treated him unjustly.",
    ],
  },
  "Genesis 31:43-55": {
    phrases: [
      "👐 The Daughters Are My Daughters\nLaban speaks possessively about daughters, children, and flocks. Even after mistreating them, he still talks as if everything belongs to him. His words reveal his desire to control the family narrative.\nReading tip: Laban's speech sounds relational, but it is also possessive. Genesis has already shown that Rachel and Leah feel sold and consumed by him.",
      "🤝 Let Us Make A Covenant\nLaban proposes a covenant, but this is not a warm friendship covenant. It is a boundary agreement between people who do not trust each other. The covenant limits harm and marks separation.\nThis matters because not every biblical covenant scene feels intimate. Some covenants create necessary boundaries.",
      "🪨 Jacob Took A Stone And Set It Up As A Pillar\nJacob again uses a stone as a marker, like Bethel. But this stone marks a boundary, not a dream. It says: this conflict has reached a line.\nThe stone becomes witness that the relationship is changing. Jacob is no longer under Laban's control.",
      "🪨 Heap Of Witness\nThe heap of stones is a public memory marker. Both sides can point to it as evidence of the agreement. In a world without written contracts for every situation, physical markers mattered.\nThis heap says the past cannot simply be rewritten. The boundary has a witness.",
      "👀 Mizpah\nMizpah means watchtower or lookout. People sometimes quote this phrase romantically, but in context it is more cautious than cozy. It means the Lord watch between us because we do not fully trust each other.\nThat is an aha fact. Mizpah is not mainly a sweet friendship slogan here; it is a boundary prayer between tense relatives.",
      "🚫 This Heap Is A Witness\nThe heap marks that neither Jacob nor Laban should cross to harm the other. This is a protective boundary. The relationship needs limits because trust has been damaged.\nThe covenant does not pretend everything is healed. It creates space for separation without further harm.",
      "🌅 Laban Rose Up Early And Departed\nLaban kisses his family, blesses them, and returns home. The long season under Laban is finally over. Jacob is free to continue toward the land God promised.\nThis ending is not perfect reconciliation, but it is release. The boundary holds, and the story can move forward.",
    ],
    truths: [
      "🧱 Boundaries can be faithful.\nJacob and Laban make a covenant that limits harm. It is not warm intimacy; it is a necessary boundary.\nThis is an important practical truth. Peace sometimes requires clear lines, not pretending trust exists where it has been broken.",
      "👀 God is witness when trust is damaged.\nMizpah calls on the Lord to watch between them. The relationship needs divine witness because human trust is thin.\nThis teaches that God sees what happens after people separate. Distance does not remove accountability.",
      "🪨 Memory markers can protect truth.\nThe heap and pillar serve as witnesses. They keep the agreement visible.\nGenesis values tangible reminders because people forget, deny, and rewrite. A marker can help preserve truth.",
      "🚪 Leaving control is part of Jacob's deliverance.\nLaban can no longer claim Jacob's household as his own. The boundary breaks the old control dynamic.\nThis is a major step in Jacob's journey. He leaves not only a location, but a system of manipulation.",
      "🌅 Closure is not always full reconciliation.\nLaban departs, but the relationship is not magically healed. Still, the conflict has a boundary and Jacob can move forward.\nGenesis gives a realistic picture of peace. Sometimes the faithful ending is separation with limits and accountability.",
    ],
  },
};

const DAY_TWELVE_READER_NOTE_TEACHING_BOOSTS: Record<string, { phraseNote: string; truthNote: string }> = {
  "Genesis 30:1-13": {
    phraseNote: "Reading tip: the names of the children are the emotional subtitles of the chapter. They reveal rivalry, longing, wrestling, fortune, and the painful search for worth.",
    truthNote: "This section teaches that growth is not always health. Jacob's family is increasing, but the household is full of envy, comparison, and women being used in rivalry.",
  },
  "Genesis 30:14-24": {
    phraseNote: "Reading tip: mandrakes show human attempts to manage fertility, but the key phrases are that God listened and God remembered. Genesis points past superstition to God's mercy.",
    truthNote: "This section teaches that God sees both sisters differently but compassionately. Leah is heard, Rachel is remembered, and Joseph's birth quietly turns Genesis toward the future.",
  },
  "Genesis 30:25-43": {
    phraseNote: "Reading tip: the flock details can feel strange, but the story is about unfair labor, Laban's manipulation, Jacob's strategy, and God's blessing under pressure.",
    truthNote: "This section teaches that God can prosper someone in an unfair place without approving the unfairness of that place. Laban manipulates, but God still provides.",
  },
  "Genesis 31:1-16": {
    phraseNote: "Reading tip: the God of Bethel connects Jacob's past encounter to his present command. The God who promised return now says it is time to return.",
    truthNote: "This section teaches that God sees labor, wages, and mistreatment. The call to leave is not random; it comes after years of pressure and divine protection.",
  },
  "Genesis 31:17-21": {
    phraseNote: "Reading tip: Jacob is obeying the return command, but he leaves with secrecy and Rachel's stolen idols. Genesis is showing right direction mixed with unresolved brokenness.",
    truthNote: "This section teaches that leaving a harmful place does not automatically remove every harmful pattern. Jacob's family still carries deception and idolatry with them.",
  },
  "Genesis 31:22-35": {
    phraseNote: "Reading tip: Laban's gods are stolen, hidden, and searched for. Genesis quietly contrasts powerless household idols with the living God who speaks in dreams and protects Jacob.",
    truthNote: "This section teaches that God can restrain danger before it reaches us. Laban pursues, but God gets to him first.",
  },
  "Genesis 31:36-42": {
    phraseNote: "Reading tip: Jacob's speech is a work-history testimony. Heat, frost, lost sleep, changed wages, and God's protection all show what twenty years under Laban cost.",
    truthNote: "This section teaches that God sees the grind. Long labor, unfair treatment, and hidden affliction are not invisible to Him.",
  },
  "Genesis 31:43-55": {
    phraseNote: "Reading tip: Mizpah is not mainly romantic here. It is a watch-boundary between relatives who do not trust each other.",
    truthNote: "This section teaches realistic peace. Sometimes the faithful outcome is not closeness, but a clear boundary that prevents further harm.",
  },
};

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const update = DAY_TWELVE_READER_NOTE_DEPTH_UPDATES[section.reference];
  if (!update) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") return { ...category, content: update.phrases };
    if (category.id === "key-truths") return { ...category, content: update.truths };
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  const boost = DAY_TWELVE_READER_NOTE_TEACHING_BOOSTS[section.reference];
  if (!boost) continue;

  section.categories = section.categories.map((category) => {
    if (category.id === "key-phrases") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.phraseNote}`) };
    }
    if (category.id === "key-truths") {
      return { ...category, content: category.content.map((item) => `${item}\n${boost.truthNote}`) };
    }
    return category;
  });
}

for (const section of BIBLE_READER_STUDY_SECTIONS) {
  section.categories = section.categories
    .filter((category) => category.id !== "key-truths")
    .map((category) =>
      category.id === "why-this-matters" ? { ...category, title: "What This Means" } : category,
    );
}

export function getBibleReaderStudySections(book: string | null | undefined, chapter: number | null | undefined) {
  const normalizedBook = normalizeBook(book);
  const chapterNumber = Number(chapter);
  return BIBLE_READER_STUDY_SECTIONS.filter(
    (section) => section.book === normalizedBook && section.chapter === chapterNumber,
  );
}
