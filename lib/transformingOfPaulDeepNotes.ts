type PaulReading = {
  book: string;
  chapter: number;
};

type PaulSection = {
  reference: string;
  title: string;
  verseCallouts: string[];
  points: string[];
};

type PaulChapterNote = {
  day: number;
  title: string;
  reading: PaulReading;
  opening: string;
  previous: string;
  whyMatters: string;
  history: string;
  watchFor: string[];
  words: string[];
  sections: PaulSection[];
  callbacks: string[];
  emotionalWeight: string;
  application: string;
  bridge: string;
  reflection: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^(.+?)\s+\d+:(.+)$/);
  return match ? `**${match[2]}**` : reference;
}

function renderList(items: string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function renderSection(section: PaulSection) {
  return `# 📍 ${renderVerseRange(section.reference)} - ${section.title}

${section.verseCallouts.length ? `## Key Verse${section.verseCallouts.length > 1 ? "s" : ""}

${section.verseCallouts.map((verse) => `> ${verse}`).join("\n>\n")}` : ""}

Let's slow down here because this detail matters.

## What Happened

${section.points[0]}

## What It Meant Then

${section.points[1]}

In their world, synagogue authority, Roman law, citizenship, public honor, travel, prison, patronage, and religious identity all carried weight. Paul's story is never only private.

## Where We Have Seen This Before

${section.points[2]}

The Bible keeps showing us that God can interrupt a person, redirect a life, and use suffering as a road the gospel travels on.

## What Is Happening Emotionally

${section.points[3]}

Picture the scene. Paul is not born as Paul the apostle in a clean spotlight. He begins as Saul the persecutor, then becomes a man learning grace, courage, humility, endurance, and mission.

## What This Teaches Us Now

${section.points[4]}`;
}

function renderNote(note: PaulChapterNote) {
  return `${note.opening}

${note.previous}

${note.whyMatters}

Paul's story is one of the most dramatic transformations in Scripture.

But it is not dramatic only because a bright light flashed on the Damascus road.

It is dramatic because of who Saul was before that light.

He was not spiritually lazy.

He was intense.

Educated.

Zealous.

Certain.

And wrong.

That matters.

Because Paul's life proves that sincerity is not the same as truth.

Passion is not the same as obedience.

Religious confidence is not the same as knowing Jesus.

And grace is strong enough to stop a dangerous man and remake him into a servant.

---

# 🏛️ The World Behind ${note.reading.book} ${note.reading.chapter}

${note.history}

Paul lived at the crossing point of Jewish Scripture, Roman power, Greek language, synagogue life, and early Christian mission.

That made his story unique.

He knew the Old Testament deeply.

He understood Pharisee training.

He had Roman citizenship.

He could reason in synagogues, speak in public courts, write letters to churches, and carry the gospel across Gentile cities.

But none of that made him right with God.

Jesus did.

That is the center of Paul's transformation.

---

# 🔎 What To Watch For

${renderList(note.watchFor)}

---

# 📖 Words And Details That Matter

${renderList(note.words)}

These are not random facts.

They help us understand the world Paul moved through.

Paul's transformation is not only emotional.

It is theological.

It changes his mission, his view of Jesus, his view of righteousness, his view of Gentiles, his view of suffering, and his view of his own past.

---

${note.sections.map(renderSection).join("\n\n---\n\n")}

---

# 🔁 Bible Callbacks

${renderList(note.callbacks)}

Paul's story connects backward to Israel's Scriptures and forward to the church's mission.

He becomes one of the clearest examples that the gospel is not earned by religious performance.

It is received by grace through faith in Jesus.

---

# 💔 The Emotional Weight

${note.emotionalWeight}

Paul's life is easy to turn into a highlight reel.

But up close, it is costly.

He loses status.

He gains enemies.

He is misunderstood.

He is beaten.

He waits in prison.

He is abandoned by some.

And still, he keeps preaching Christ.

That is transformation with scars on it.

---

# 🧠 What This Teaches Us Now

${note.application}

Paul teaches us that Jesus does not only improve people.

Jesus resurrects people into a new direction.

The old mission dies.

The old pride gets exposed.

The old confidence gets reinterpreted.

And the whole life becomes about Christ.

---

# 🧠 Pause And Reflect

${note.reading.book} ${note.reading.chapter} is not meant to be rushed.

It reveals another layer of Paul's transformation and another part of the early church story.

${note.bridge}

Before moving on, sit with the chapter.

Where is Saul wrong?

Where is Paul courageous?

Where does grace interrupt, redirect, strengthen, or send him?`;
}

const PAUL_JOURNEY: Array<{
  title: string;
  reading: PaulReading;
  focus: string;
  emotion: string;
  application: string;
  reflection: string;
}> = [
  {
    title: "Standing At Stephen's Death",
    reading: { book: "Acts", chapter: 7 },
    focus: "Stephen testifies before the council and is killed while Saul stands nearby approving the execution.",
    emotion: "Paul's story begins in a dark place: religious certainty standing beside violence.",
    application: "Sincerity does not make a wrong mission holy.",
    reflection: "Where might you be convinced you are right while still needing God to search your heart more deeply?",
  },
  {
    title: "Breathing Threats",
    reading: { book: "Acts", chapter: 8 },
    focus: "Saul ravages the church, believers scatter, and the gospel begins moving through persecution.",
    emotion: "The chapter feels dangerous because Saul is not passive. He is actively hurting the people of Jesus.",
    application: "Grace is shocking because Jesus saves enemies, not only confused observers.",
    reflection: "What parts of your passion still need to be brought under the control of Jesus?",
  },
  {
    title: "The Road To Damascus",
    reading: { book: "Acts", chapter: 9 },
    focus: "Jesus stops Saul on the road, blinds him, sends Ananias, restores his sight, and begins his new mission.",
    emotion: "The hunter becomes helpless. The man dragging believers now has to be led by the hand.",
    application: "One encounter with Jesus can break the entire direction of a life.",
    reflection: "What would have to change in you if Jesus interrupted your plans instead of simply blessing them?",
  },
  {
    title: "Barnabas Makes Room",
    reading: { book: "Acts", chapter: 11 },
    focus: "The Antioch church grows, Barnabas brings Saul into ministry, and disciples are first called Christians.",
    emotion: "This feels like trust slowly being rebuilt after a violent past.",
    application: "Transformation can happen quickly, but trust often has to be rebuilt patiently.",
    reflection: "Are you patient enough to let God rebuild trust over time instead of demanding instant acceptance?",
  },
  {
    title: "Set Apart For The Work",
    reading: { book: "Acts", chapter: 13 },
    focus: "The Holy Spirit sends Barnabas and Saul from Antioch, and Paul's missionary work opens wide.",
    emotion: "The chapter feels like the road finally opening under the Spirit's direction.",
    application: "Calling is not self-promotion. It is Spirit-sent obedience.",
    reflection: "What has God already set apart in your life that needs less hesitation and more obedience?",
  },
  {
    title: "Driven Out But Still Moving",
    reading: { book: "Acts", chapter: 14 },
    focus: "Paul and Barnabas preach, face opposition, are mistaken for gods, and Paul is stoned and left for dead.",
    emotion: "This is mission with bruises, dust, and endurance.",
    application: "The man who once caused suffering now carries suffering for Jesus.",
    reflection: "When obedience gets painful, do you start backing away, or do you keep moving with God?",
  },
  {
    title: "The Fight For Grace",
    reading: { book: "Acts", chapter: 15 },
    focus: "The Jerusalem council decides Gentiles do not need to become Jews to belong to Jesus.",
    emotion: "The pressure is doctrinal, but the stakes are deeply personal for Gentile believers.",
    application: "Grace must be defended when people try to add earning to belonging.",
    reflection: "Do you live like grace is truly a gift, or do you keep trying to earn what Jesus already gave?",
  },
  {
    title: "Singing In The Prison",
    reading: { book: "Acts", chapter: 16 },
    focus: "Paul enters Macedonia, Lydia believes, a slave girl is delivered, and Paul and Silas worship in prison.",
    emotion: "The midnight songs are powerful because they rise before the doors open.",
    application: "Worship is not only a response to freedom. Sometimes it is faith inside chains.",
    reflection: "What comes out of you under pressure first, panic or worship?",
  },
  {
    title: "Reasoning In Athens",
    reading: { book: "Acts", chapter: 17 },
    focus: "Paul reasons in Athens and speaks at Mars Hill about the unknown God and the risen Christ.",
    emotion: "Paul is provoked by idolatry but still thoughtful in how he speaks.",
    application: "Courage and clarity can work together.",
    reflection: "Can you speak truth into the culture around you without losing either courage or clarity?",
  },
  {
    title: "Do Not Be Afraid",
    reading: { book: "Acts", chapter: 18 },
    focus: "Paul works with Aquila and Priscilla, preaches in Corinth, and receives a vision from the Lord.",
    emotion: "The command not to fear reminds us Paul was bold but still human.",
    application: "Courage is not pretending fear is absent. Courage listens when Jesus speaks into fear.",
    reflection: "Where do you need to hear Jesus say, 'Do not be afraid,' instead of pretending fear is not there?",
  },
  {
    title: "Revival In Ephesus",
    reading: { book: "Acts", chapter: 19 },
    focus: "The gospel shakes Ephesus through the Spirit, miracles, repentance, burned magic books, and public uproar.",
    emotion: "This chapter feels explosive because Jesus is challenging worship, money, fear, and spiritual darkness.",
    application: "Real transformation eventually touches habits, loyalties, and old powers.",
    reflection: "If Jesus fully took over your habits and loyalties, what old things would have to burn out of your life?",
  },
  {
    title: "You Will See My Face No More",
    reading: { book: "Acts", chapter: 20 },
    focus: "Paul says farewell to the Ephesian elders with tears, warnings, humility, and love.",
    emotion: "This is one of Paul's most tender scenes. He is not just a preacher. He is a shepherd.",
    application: "Truth lands differently when people know you have poured your life into them.",
    reflection: "Are you only trying to say true things, or are you actually pouring your heart into the people God gave you?",
  },
  {
    title: "Bound For Jerusalem",
    reading: { book: "Acts", chapter: 21 },
    focus: "Paul keeps walking toward Jerusalem even though chains and suffering are being warned ahead.",
    emotion: "The road is full of tears because obedience is clearly costly.",
    application: "Sometimes obedience does not lead away from hardship. It leads straight through it.",
    reflection: "What if obedience does not lead away from hardship, but straight through it?",
  },
  {
    title: "His Story Before The Crowd",
    reading: { book: "Acts", chapter: 22 },
    focus: "Paul tells his testimony before an angry crowd, naming his past and the mercy of Jesus.",
    emotion: "The chapter carries the force of a man who never forgets what grace rescued him from.",
    application: "A redeemed testimony does not hide the past. It shows the strength of Jesus.",
    reflection: "Do you let your testimony show people how strong Jesus is, or do you still try to hide what He brought you out of?",
  },
  {
    title: "Take Courage",
    reading: { book: "Acts", chapter: 23 },
    focus: "Paul faces the council, survives a murder plot, and hears the Lord tell him to take courage.",
    emotion: "Jesus stands near Paul inside danger, not only after it.",
    application: "The presence of Jesus changes pressure from abandonment into assignment.",
    reflection: "What changes when you remember Jesus is with you in the pressure, not just waiting at the end of it?",
  },
  {
    title: "Two Years Waiting",
    reading: { book: "Acts", chapter: 24 },
    focus: "Paul is accused before Felix and remains imprisoned for two years because politics delays justice.",
    emotion: "This is slow pressure: waiting, delay, and unresolved accusation.",
    application: "Some chapters of calling are about staying faithful when nothing moves quickly.",
    reflection: "How do you respond when God's will includes waiting longer than feels fair?",
  },
  {
    title: "Almost Persuaded",
    reading: { book: "Acts", chapter: 26 },
    focus: "Paul tells his story before Agrippa, explaining the heavenly vision and the call to preach light.",
    emotion: "Almost feels haunting because almost is still not surrender.",
    application: "Clarity about Jesus should call for response, not admiration from a distance.",
    reflection: "Is there any area where you are still almost surrendered instead of fully obedient?",
  },
  {
    title: "The Storm And The Shipwreck",
    reading: { book: "Acts", chapter: 27 },
    focus: "Paul sails into a violent storm, hears from God, steadies the crew, and survives shipwreck.",
    emotion: "The chapter is chaos around one steady man who believes what God said.",
    application: "Your confidence cannot be in the ship if God already told you the ship may break.",
    reflection: "When everything around you feels unstable, what are you actually trusting to hold you steady?",
  },
  {
    title: "Still Preaching In Chains",
    reading: { book: "Acts", chapter: 28 },
    focus: "Paul reaches Rome, survives Malta, welcomes people, and preaches the kingdom under restriction.",
    emotion: "Acts ends unfinished on purpose, with the gospel still moving even while Paul is confined.",
    application: "Chains do not have to stop witness when Christ is still the message.",
    reflection: "What would it look like for you to stay faithful even if life no longer looked free or easy?",
  },
  {
    title: "I Count It All Loss",
    reading: { book: "Philippians", chapter: 3 },
    focus: "Paul looks back on his old religious confidence and counts it as loss because Christ is better.",
    emotion: "This is the old Saul reinterpreted through the worth of Jesus.",
    application: "Transformation changes what you count as gain.",
    reflection: "What old confidence, status, or achievement do you need to count differently because of Jesus?",
  },
  {
    title: "I Have Finished The Race",
    reading: { book: "2 Timothy", chapter: 4 },
    focus: "Paul writes near the end, charging Timothy to preach and saying he has fought, finished, and kept the faith.",
    emotion: "The ending feels tired but clear, wounded but steady, abandoned by some but held by Christ.",
    application: "A transformed life is not proven only by how it starts. It is proven by finishing faithful.",
    reflection: "If your life ended with the words 'they kept the faith,' what would need to stay true between now and then?",
  },
];

const VERSE_COUNTS: Record<string, number> = {
  "Acts 7": 60,
  "Acts 8": 40,
  "Acts 9": 43,
  "Acts 11": 30,
  "Acts 13": 52,
  "Acts 14": 28,
  "Acts 15": 41,
  "Acts 16": 40,
  "Acts 17": 34,
  "Acts 18": 28,
  "Acts 19": 41,
  "Acts 20": 38,
  "Acts 21": 40,
  "Acts 22": 30,
  "Acts 23": 35,
  "Acts 24": 27,
  "Acts 26": 32,
  "Acts 27": 44,
  "Acts 28": 31,
  "Philippians 3": 21,
  "2 Timothy 4": 22,
};

function getRanges(book: string, chapter: number) {
  const total = VERSE_COUNTS[`${book} ${chapter}`] ?? 30;
  const firstEnd = Math.max(1, Math.ceil(total / 3));
  const secondEnd = Math.max(firstEnd + 1, Math.ceil((total * 2) / 3));

  return [
    { start: 1, end: firstEnd },
    { start: Math.min(firstEnd + 1, total), end: Math.min(secondEnd, total) },
    { start: Math.min(secondEnd + 1, total), end: total },
  ];
}

function buildNote(item: (typeof PAUL_JOURNEY)[number], index: number): PaulChapterNote {
  const day = index + 1;
  const { book, chapter } = item.reading;
  const ranges = getRanges(book, chapter);
  const isActs = book === "Acts";
  const isLetter = !isActs;

  return {
    day,
    title: item.title,
    reading: item.reading,
    opening: `${book} ${chapter} brings us into a major chapter of Paul's transformation. ${item.focus}`,
    previous:
      day === 1
        ? "Before Paul becomes the apostle to the Gentiles, Scripture shows us Saul standing on the wrong side of Stephen's death."
        : "Paul's story keeps moving from violent certainty to surrendered mission, from control to obedience, and from self-made righteousness to grace.",
    whyMatters: `This chapter matters because ${item.application.toLowerCase()}`,
    history: isActs
      ? "Acts was written by Luke and traces the spread of the gospel from Jerusalem to Rome. Paul's story unfolds across synagogues, Roman roads, cities, prisons, courts, storms, and churches."
      : "Paul's letters were written to real churches and leaders dealing with real pressure. They are not abstract essays. They are pastoral, theological, emotional, and grounded in lived ministry.",
    watchFor: [
      "🔥 how Jesus redirects Saul's zeal",
      "🧭 how mission moves through pressure",
      "⛓️ how suffering becomes part of Paul's calling",
      "💬 how Paul uses testimony, Scripture, and reason",
      "✝️ how grace becomes the center of everything",
    ],
    words: [
      "🧑‍🏫 **Pharisee** means Saul came from a serious Jewish teaching tradition devoted to law, purity, and zeal.",
      "🌍 **Gentiles** means the nations outside ethnic Israel, the people Paul is especially sent to reach.",
      "✈️ **Apostle** means sent one. Paul's apostleship is rooted in the risen Jesus calling him.",
      "⛓️ **Prisoner** becomes part of Paul's identity, but never stronger than his identity in Christ.",
    ],
    sections: [
      {
        reference: `${book} ${chapter}:${ranges[0].start}-${ranges[0].end}`,
        title: "The Scene Opens",
        verseCallouts: [`**${ranges[0].start}** ${book} ${chapter} opens another window into Paul's transformation.`],
        points: [
          item.focus,
          "The early church lived under real religious and political pressure. Following Jesus was not a private hobby.",
          "Abraham was called out from one life into another. Moses was interrupted by God in the wilderness. Paul is interrupted on the road and sent into a new mission.",
          item.emotion,
          item.application,
        ],
      },
      {
        reference: `${book} ${chapter}:${ranges[1].start}-${ranges[1].end}`,
        title: "The Gospel Moves Through Pressure",
        verseCallouts: [`**${ranges[1].start}** The middle of ${book} ${chapter} shows that transformation is not soft or shallow.`],
        points: [
          "The chapter presses deeper into the cost and clarity of Paul's calling.",
          "In the Roman world, roads, cities, legal systems, and prisons all became unexpected pathways for the gospel.",
          "Joseph's suffering moved him toward Egypt's salvation story. Paul's suffering moves him toward the Gentile mission.",
          "Emotionally, Paul keeps having to live with the consequences of a changed life. New obedience creates new opposition.",
          "Transformation is not only what God brings you out of. It is what God sends you into.",
        ],
      },
      {
        reference: `${book} ${chapter}:${ranges[2].start}-${ranges[2].end}`,
        title: "What This Adds To Paul's Journey",
        verseCallouts: [`**${ranges[2].start}** By the end of ${book} ${chapter}, we see another layer of Paul's new life.`],
        points: [
          "The chapter adds another piece to the story of a man remade by Jesus.",
          "Paul's world is full of Scripture debates, city crowds, officials, prisoners, churches, letters, and mission teams.",
          "Jesus sends the disciples to the nations. Paul becomes one of the clearest pictures of that mission reaching the Gentile world.",
          "This chapter helps us feel Paul as a real person, not just a doctrine machine.",
          "The gospel does not only change where Paul will go. It changes what he loves, what he counts as gain, and what he is willing to suffer for.",
        ],
      },
    ],
    callbacks: [
      "🔥 Moses interrupted by God at the burning bush.",
      "⛓️ Joseph's suffering becoming a road toward purpose.",
      "🌍 Jesus sending witnesses to the ends of the earth in Acts 1.",
    ],
    emotionalWeight: item.emotion,
    application: item.application,
    bridge:
      day === PAUL_JOURNEY.length
        ? "Paul's journey closes with faithfulness, but the mission continues through the church he helped strengthen."
        : "The next chapter keeps tracing how grace turns Saul's old zeal into Paul's surrendered mission.",
    reflection: item.reflection,
  };
}

const PAUL_NOTES = PAUL_JOURNEY.map(buildNote);

export const TRANSFORMING_OF_PAUL_CHAPTERS = PAUL_NOTES.map(({ day, title, reading, reflection }) => ({
  day,
  title,
  reading,
  reflection,
}));

export const TRANSFORMING_OF_PAUL_DEEP_NOTES = PAUL_NOTES.map(renderNote);
