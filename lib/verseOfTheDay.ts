import { VERSE_OF_THE_DAY_EXTRA_POOL } from "./verseOfTheDayExtras";

export interface VerseExplanationSection {
  heading: string;
  body: string;
}

export interface VerseOfTheDayEntry {
  id: string;
  reference: string;
  text: string;
  subtitle: string;
  rank?: number;
  explanationSections: VerseExplanationSection[];
}

export const VERSE_OF_THE_DAY_INTROS = [
  "Hey, it's Louis. Here's something for you today.",
  "I'm glad you're back. Let's start with this.",
  "Before you dive in, read this with me.",
  "I picked this verse for today.",
  "Let's begin with something grounding.",
  "Take a breath. Start here.",
  "Here's today's reminder.",
  "This stood out for today.",
  "Let's open with truth.",
  "Start your study here.",
  "A quick word before you begin.",
  "I think this will speak to you today.",
  "Let this guide your reading.",
  "Here's something steady for today.",
  "Begin here.",
  "This is worth sitting with.",
  "Let's focus your heart first.",
  "Before anything else, read this.",
  "Something simple, but powerful.",
  "Keep this in mind today.",
  "Read this slowly.",
  "Let this shape your study today.",
  "A strong place to begin.",
  "This verse matters.",
  "Let this anchor you.",
  "Start here, then build.",
  "A reminder for your journey.",
  "Pause and read this.",
  "Let this settle in.",
  "Here's your verse for today.",
];

const CORE_VERSE_OF_THE_DAY_POOL: VerseOfTheDayEntry[] = [
  {
    id: "psalm-119-105",
    reference: "Psalm 119:105",
    text: "Your word is a lamp to my feet and a light to my path.",
    subtitle: "God's Word guides one step at a time.",
    explanationSections: [
      { heading: "Who Wrote It", body: "David or another psalmist reflected on the steady guidance found in God's Word." },
      { heading: "What Was Happening", body: "Israel depended on God's law to shape daily life, choices, and direction." },
      { heading: "What It Means", body: "Scripture does not always reveal the full road ahead, but it gives enough light for the next faithful step." },
      { heading: "Why It Matters Today", body: "When life feels unclear, the Bible helps you move forward without pretending you need every answer at once." },
    ],
  },
  {
    id: "psalm-119-130",
    reference: "Psalm 119:130",
    text: "The unfolding of your words gives light; it imparts understanding to the simple.",
    subtitle: "Understanding begins when Scripture opens.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist celebrated how God's Word teaches ordinary people." },
      { heading: "What Was Happening", body: "This psalm keeps returning to the life-changing clarity that comes from staying in Scripture." },
      { heading: "What It Means", body: "Understanding grows as God's truth opens up over time, even for people who do not feel naturally wise." },
      { heading: "Why It Matters Today", body: "You do not need to be an expert to grow. Stay with the Word long enough for the light to break through." },
    ],
  },
  {
    id: "psalm-1-1-2",
    reference: "Psalm 1:1-2",
    text: "Blessed is the man who walks not in the counsel of the wicked... but his delight is in the law of the Lord.",
    subtitle: "Joy grows where Scripture is loved.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Psalm 1 opens the Psalms by contrasting two ways to live." },
      { heading: "What Was Happening", body: "God's people were being reminded that lasting blessing is tied to listening to Him, not the crowd." },
      { heading: "What It Means", body: "Real stability comes when your thoughts and desires are shaped by God's Word instead of constant outside noise." },
      { heading: "Why It Matters Today", body: "The more Scripture becomes something you enjoy, not just something you check off, the more grounded you become." },
    ],
  },
  {
    id: "2-timothy-3-16",
    reference: "2 Timothy 3:16",
    text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.",
    subtitle: "Every page has purpose.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Paul wrote this near the end of his life while urging Timothy to stay rooted in truth." },
      { heading: "What Was Happening", body: "The early church was facing pressure, false teaching, and confusion." },
      { heading: "What It Means", body: "Scripture is not filler. God uses it to teach, correct, train, and mature His people." },
      { heading: "Why It Matters Today", body: "Even the passages you do not fully understand yet still have purpose in your growth." },
    ],
  },
  {
    id: "james-1-22",
    reference: "James 1:22",
    text: "Be doers of the word, and not hearers only, deceiving yourselves.",
    subtitle: "Study transforms when it becomes action.",
    explanationSections: [
      { heading: "Who Wrote It", body: "James wrote to believers under pressure who needed practical faith." },
      { heading: "What Was Happening", body: "People were hearing truth but not always living it out." },
      { heading: "What It Means", body: "Bible study is incomplete if it only informs you and never changes how you live." },
      { heading: "Why It Matters Today", body: "Growth happens when what you read starts showing up in your choices, habits, and conversations." },
    ],
  },
  {
    id: "colossians-3-16",
    reference: "Colossians 3:16",
    text: "Let the word of Christ dwell in you richly.",
    subtitle: "Scripture was meant to live in you.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Paul wrote this to a church that needed to stay centered on Christ." },
      { heading: "What Was Happening", body: "False ideas were competing for attention, and the church needed strong foundations." },
      { heading: "What It Means", body: "God's Word should not visit your life occasionally. It should live there deeply and shape the atmosphere." },
      { heading: "Why It Matters Today", body: "The goal is not scattered verses once in a while. It is a life saturated by truth." },
    ],
  },
  {
    id: "psalm-119-11",
    reference: "Psalm 119:11",
    text: "I have stored up your word in my heart, that I might not sin against you.",
    subtitle: "What you store shapes who you become.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist described the protective power of hiding God's Word within." },
      { heading: "What Was Happening", body: "This is part of a long reflection on loving and obeying Scripture." },
      { heading: "What It Means", body: "What you keep close in your heart affects how you respond when temptation comes." },
      { heading: "Why It Matters Today", body: "Internalizing Scripture gives you something solid to reach for in real moments, not just church moments." },
    ],
  },
  {
    id: "john-6-63",
    reference: "John 6:63",
    text: "The words that I have spoken to you are spirit and life.",
    subtitle: "God's Word carries life itself.",
    explanationSections: [
      { heading: "Who Wrote It", body: "John recorded Jesus saying this after difficult teaching that many struggled to accept." },
      { heading: "What Was Happening", body: "People were reacting to Jesus on a surface level and missing the depth of what He was saying." },
      { heading: "What It Means", body: "Jesus' words are not empty ideas. They carry spiritual life and truth." },
      { heading: "Why It Matters Today", body: "When Scripture feels challenging, do not rush past it. Sometimes the deepest life is hidden in the hardest words." },
    ],
  },
  {
    id: "romans-10-17",
    reference: "Romans 10:17",
    text: "So faith comes from hearing, and hearing through the word of Christ.",
    subtitle: "Faith grows through exposure to truth.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Paul wrote to believers in Rome about salvation and the spread of the gospel." },
      { heading: "What Was Happening", body: "He was explaining how people come to believe and why the message of Christ matters so much." },
      { heading: "What It Means", body: "Faith is strengthened when Christ's message is heard, received, and kept in front of you." },
      { heading: "Why It Matters Today", body: "If you want stronger faith, keep putting yourself in range of God's Word." },
    ],
  },
  {
    id: "psalm-119-18",
    reference: "Psalm 119:18",
    text: "Open my eyes, that I may behold wondrous things out of your law.",
    subtitle: "Ask God to help you see more.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist prayed with humility before God's Word." },
      { heading: "What Was Happening", body: "The writer knew that seeing truth clearly requires God's help." },
      { heading: "What It Means", body: "Understanding Scripture is not only an intellectual task. It is also a spiritual one." },
      { heading: "Why It Matters Today", body: "Before you study, ask God to open your eyes. That simple prayer changes how you read." },
    ],
  },
  {
    id: "psalm-19-7",
    reference: "Psalm 19:7",
    text: "The law of the Lord is perfect, reviving the soul.",
    subtitle: "Scripture refreshes the weary heart.",
    explanationSections: [
      { heading: "Who Wrote It", body: "David praised both God's creation and God's Word." },
      { heading: "What Was Happening", body: "He was describing the beauty and reliability of what God has revealed." },
      { heading: "What It Means", body: "God's Word restores and revives people in a way nothing else can." },
      { heading: "Why It Matters Today", body: "When you are drained, Scripture is not just something to analyze. It is something to receive." },
    ],
  },
  {
    id: "matthew-4-4",
    reference: "Matthew 4:4",
    text: "Man shall not live by bread alone, but by every word that comes from the mouth of God.",
    subtitle: "Spiritual hunger needs spiritual food.",
    explanationSections: [
      { heading: "Who Said It", body: "Jesus said this while being tempted in the wilderness." },
      { heading: "What Was Happening", body: "After fasting, Jesus answered temptation with Scripture instead of shortcuts." },
      { heading: "What It Means", body: "Physical needs matter, but human life cannot thrive apart from God's Word." },
      { heading: "Why It Matters Today", body: "Feed your soul with the same seriousness you feed your body." },
    ],
  },
  {
    id: "john-17-17",
    reference: "John 17:17",
    text: "Sanctify them in the truth; your word is truth.",
    subtitle: "Truth shapes identity.",
    explanationSections: [
      { heading: "Who Said It", body: "Jesus prayed this over His followers before the cross." },
      { heading: "What Was Happening", body: "The disciples were about to face confusion, fear, and opposition." },
      { heading: "What It Means", body: "God uses truth to set His people apart and shape them into who they are meant to be." },
      { heading: "Why It Matters Today", body: "If you want a stronger identity in Christ, stay close to the truth of Scripture." },
    ],
  },
  {
    id: "psalm-119-33",
    reference: "Psalm 119:33",
    text: "Teach me, O Lord, the way of your statutes.",
    subtitle: "Study begins with humility.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist prayed like a student before God." },
      { heading: "What Was Happening", body: "This psalm keeps showing what it looks like to depend on God while learning His ways." },
      { heading: "What It Means", body: "The right posture in Bible study is humility, not self-sufficiency." },
      { heading: "Why It Matters Today", body: "Come to Scripture ready to be taught, not just confirmed." },
    ],
  },
  {
    id: "deuteronomy-6-6",
    reference: "Deuteronomy 6:6",
    text: "And these words that I command you today shall be on your heart.",
    subtitle: "Scripture belongs in everyday life.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Moses spoke this to Israel as they prepared to enter the promised land." },
      { heading: "What Was Happening", body: "God's people were being told to keep His commands central in daily life and family rhythms." },
      { heading: "What It Means", body: "God's Word was never meant to stay distant or occasional. It belongs close to the heart." },
      { heading: "Why It Matters Today", body: "The healthiest spiritual life is not built on random moments. It is built on everyday closeness to God's Word." },
    ],
  },
  {
    id: "ezra-7-10",
    reference: "Ezra 7:10",
    text: "Ezra had set his heart to study the Law of the Lord.",
    subtitle: "Intentional study changes generations.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Ezra is introduced as a leader deeply committed to God's Word." },
      { heading: "What Was Happening", body: "Israel was rebuilding after exile and needed spiritual renewal, not just restored routines." },
      { heading: "What It Means", body: "Ezra studied, lived, and taught Scripture in that order. His life was built around it." },
      { heading: "Why It Matters Today", body: "Serious Bible study is not just personal. It often shapes the people around you too." },
    ],
  },
  {
    id: "psalm-119-24",
    reference: "Psalm 119:24",
    text: "Your testimonies are my delight; they are my counselors.",
    subtitle: "The Bible gives wisdom for decisions.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist described Scripture as both joy and guidance." },
      { heading: "What Was Happening", body: "He kept returning to God's Word for direction instead of treating it like background material." },
      { heading: "What It Means", body: "Scripture is not only for doctrine. It is also for daily counsel." },
      { heading: "Why It Matters Today", body: "When you need wisdom, let the Bible speak before panic or pressure does." },
    ],
  },
  {
    id: "psalm-119-36",
    reference: "Psalm 119:36",
    text: "Incline my heart to your testimonies.",
    subtitle: "Ask God to shape your desires.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist prayed for inward change, not just outward obedience." },
      { heading: "What Was Happening", body: "He knew the heart can drift and needs God's help." },
      { heading: "What It Means", body: "This is a prayer for God to redirect desire toward His truth." },
      { heading: "Why It Matters Today", body: "Sometimes the biggest prayer before Bible study is not for more time. It is for a more willing heart." },
    ],
  },
  {
    id: "2-timothy-3-14",
    reference: "2 Timothy 3:14",
    text: "But as for you, continue in what you have learned.",
    subtitle: "Growth comes from consistency.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Paul urged Timothy to stay grounded in what he had already received." },
      { heading: "What Was Happening", body: "Timothy was ministering in a difficult environment with competing voices around him." },
      { heading: "What It Means", body: "Spiritual growth often looks less like constant novelty and more like steady continuation." },
      { heading: "Why It Matters Today", body: "Keep going. Consistency in truth builds deeper roots than spiritual hype." },
    ],
  },
  {
    id: "hosea-6-3",
    reference: "Hosea 6:3",
    text: "Let us know; let us press on to know the Lord.",
    subtitle: "Keep pressing forward.",
    explanationSections: [
      { heading: "Who Wrote It", body: "Hosea called a drifting people back to genuine relationship with God." },
      { heading: "What Was Happening", body: "Israel had mixed shallow religion with deep unfaithfulness." },
      { heading: "What It Means", body: "Knowing God is something to press into, not something to approach casually." },
      { heading: "Why It Matters Today", body: "Even when progress feels slow, keep moving toward deeper knowledge of God." },
    ],
  },
  {
    id: "proverbs-9-10",
    reference: "Proverbs 9:10",
    text: "The fear of the Lord is the beginning of wisdom.",
    subtitle: "Wisdom begins with reverence.",
    explanationSections: [
      { heading: "Who Wrote It", body: "This proverb is part of the Bible's wisdom tradition, often associated with Solomon." },
      { heading: "What Was Happening", body: "God's people were being taught that true wisdom starts in the right relationship with Him." },
      { heading: "What It Means", body: "Reverence for God is the foundation of real understanding." },
      { heading: "Why It Matters Today", body: "You can collect information without becoming wise. Wisdom starts when God is in His proper place." },
    ],
  },
  {
    id: "john-5-39",
    reference: "John 5:39",
    text: "You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me.",
    subtitle: "Seek, don't skim.",
    explanationSections: [
      { heading: "Who Said It", body: "Jesus said this to religious leaders who knew Scripture but resisted Him." },
      { heading: "What Was Happening", body: "They studied the text intensely while missing the One the text was pointing to." },
      { heading: "What It Means", body: "The Bible is not just a collection of facts. It ultimately points to Jesus." },
      { heading: "Why It Matters Today", body: "Read Scripture deeply, but read it in a way that moves you closer to Christ, not just to information." },
    ],
  },
  {
    id: "psalm-119-165",
    reference: "Psalm 119:165",
    text: "Great peace have those who love your law; nothing can make them stumble.",
    subtitle: "Scripture brings stability.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist described the peace found in loving God's ways." },
      { heading: "What Was Happening", body: "This reflection came from a life that saw God's Word as security, not burden." },
      { heading: "What It Means", body: "God's truth brings steadiness that keeps you from constantly being thrown off course." },
      { heading: "Why It Matters Today", body: "The more Scripture anchors you, the less every new pressure gets to define you." },
    ],
  },
  {
    id: "luke-11-28",
    reference: "Luke 11:28",
    text: "Blessed rather are those who hear the word of God and keep it.",
    subtitle: "Hearing is the beginning, not the end.",
    explanationSections: [
      { heading: "Who Said It", body: "Jesus said this while redirecting attention to obedience." },
      { heading: "What Was Happening", body: "A crowd was reacting emotionally, but Jesus brought the focus back to faithful response." },
      { heading: "What It Means", body: "There is blessing not just in hearing truth, but in living under it." },
      { heading: "Why It Matters Today", body: "The goal of Bible study is not just to hear something good. It is to keep it." },
    ],
  },
  {
    id: "psalm-119-140",
    reference: "Psalm 119:140",
    text: "Your promise is well tried, and your servant loves it.",
    subtitle: "God's Word stands uncorrupted.",
    explanationSections: [
      { heading: "Who Wrote It", body: "A psalmist praised the purity and reliability of God's promises." },
      { heading: "What Was Happening", body: "He had learned to trust Scripture through real life, not theory." },
      { heading: "What It Means", body: "God's Word has been tested and proven trustworthy." },
      { heading: "Why It Matters Today", body: "You can build your life on what God has said because His Word holds up under pressure." },
    ],
  },
  {
    id: "joshua-1-8",
    reference: "Joshua 1:8",
    text: "This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night.",
    subtitle: "Depth comes from reflection.",
    explanationSections: [
      { heading: "Who Said It", body: "God spoke this to Joshua as he stepped into leadership after Moses." },
      { heading: "What Was Happening", body: "Joshua was about to lead God's people into a major new season." },
      { heading: "What It Means", body: "Meditation on Scripture was meant to guide courage, leadership, and obedience." },
      { heading: "Why It Matters Today", body: "If you want stronger direction, spend more time reflecting on the Word, not just glancing at it." },
    ],
  },
  {
    id: "psalm-27-11",
    reference: "Psalm 27:11",
    text: "Teach me your way, O Lord, and lead me on a level path.",
    subtitle: "Learning is a lifelong journey.",
    explanationSections: [
      { heading: "Who Wrote It", body: "David prayed this in the middle of fear and opposition." },
      { heading: "What Was Happening", body: "He needed God's direction in a season that was not simple." },
      { heading: "What It Means", body: "The prayer is not just for rescue, but for guidance into God's way." },
      { heading: "Why It Matters Today", body: "Ask God to lead you clearly and patiently as you keep learning how to walk with Him." },
    ],
  },
];

function buildFallbackExplanation(entry: VerseOfTheDayEntry): VerseExplanationSection[] {
  // Derive book name for context
  const book = entry.reference.split(" ").slice(0, -1).join(" ") || entry.reference;
  const isOT = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
    "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
    "Nehemiah","Esther","Job","Psalm","Psalms","Proverbs","Ecclesiastes","Song of Solomon",
    "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah",
    "Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  ].some((b) => entry.reference.startsWith(b));

  return [
    {
      heading: "📖 Who Wrote It",
      body: isOT
        ? `${book} is part of the Old Testament, written by prophets, poets, and leaders whom God used to record His Word for Israel and for all generations. The specific author reflects on God's nature and His relationship with His people.`
        : `${book} is part of the New Testament, written by an apostle or close companion of the early church to encourage believers and explain the life, death, and resurrection of Jesus Christ.`,
    },
    {
      heading: "🕰️ When & What Was Happening",
      body: isOT
        ? `This verse was written during a pivotal moment in Israel's history — a time when God's people needed to be reminded of His promises, His character, or the right way to live. The words in ${entry.reference} were meant to anchor them in truth when circumstances were uncertain.`
        : `This verse was written in the first century A.D. as the early church was forming and spreading across the Roman world. Believers faced pressure, confusion, and persecution, and these words were meant to ground them in the gospel and in how to live as followers of Jesus.`,
    },
    {
      heading: "💡 What It Means",
      body: `${entry.reference} speaks directly to the relationship between God and His people. The words are not abstract theology — they are a living truth meant to change how you think, pray, and act. At its core this verse is saying: God is faithful, His Word is trustworthy, and living according to it leads to a life that matters.`,
    },
    {
      heading: "🌱 Why It Matters Today",
      body: `This verse still applies because human nature, the need for God, and the reality of His love have not changed. Read ${entry.reference} again slowly today. Ask yourself what it reveals about who God is, what it asks of you, and how you can carry that truth into your conversations, decisions, and prayers this week.`,
    },
  ];
}

export const VERSE_OF_THE_DAY_POOL: VerseOfTheDayEntry[] = [
  ...CORE_VERSE_OF_THE_DAY_POOL,
  ...VERSE_OF_THE_DAY_EXTRA_POOL,
].map((entry) => ({
  ...entry,
  explanationSections:
    entry.explanationSections && entry.explanationSections.length > 0
      ? entry.explanationSections
      : buildFallbackExplanation(entry),
}));

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function mulberry32(seed: number) {
  let current = seed >>> 0;
  return () => {
    current += 0x6d2b79f5;
    let t = current;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledVersePool(seedKey = "bible-buddy-verse-rotation"): VerseOfTheDayEntry[] {
  const rand = mulberry32(hashString(seedKey));
  const copy = [...VERSE_OF_THE_DAY_POOL];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function dayNumber(date: Date): number {
  return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
}

export function getVerseIntro(date = new Date()): string {
  return VERSE_OF_THE_DAY_INTROS[dayNumber(date) % VERSE_OF_THE_DAY_INTROS.length];
}

export function getVerseOfTheDay(date = new Date()): VerseOfTheDayEntry {
  const ordered = shuffledVersePool();
  return ordered[dayNumber(date) % ordered.length];
}

export function getVerseExplanation(reference: string): VerseExplanationSection[] {
  return VERSE_OF_THE_DAY_POOL.find((entry) => entry.reference === reference)?.explanationSections ?? [];
}
