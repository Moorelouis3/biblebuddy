export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  canonicalPath: string;
  // ISO date (YYYY-MM-DD) the post went live; drives sitemap lastModified
  // and article schema. New posts must set this to their real publish day.
  publishedAt: string;
  // Set only when a post gets a real content overhaul after publishing;
  // becomes dateModified in the article schema.
  updatedAt?: string;
  // The pre-migration URL path (e.g. /bible-study-hub/...). Likes, comments,
  // and view rows in the database are keyed by this string, so it stays as
  // the storage key even though readers now see /blog/<slug>. New posts
  // never set it.
  legacyPath?: string;
  readTime: string;
  image: string;
  // When present, the blog-group-post cron auto-shares this article into
  // the Bible Buddy Study Group (once per article) with this teaser text.
  groupPost?: {
    title: string;
    content: string;
  };
  // Set only on Bible in One Year Study Notes posts (2026-09-19). Drives
  // BibleYearNotesNav's previous/next day links and lets the reading show
  // in the meta row. bibleYearDay is 1-365; bibleYearReading is the day's
  // Scripture range exactly as it reads in docs/bible-in-one-year-master-plan.md
  // (e.g. "Genesis 1-2").
  bibleYearDay?: number;
  bibleYearReading?: string;
  // When true, app/api/cron/blog-group-post skips this article: it never
  // becomes tonight's random pick for the Study Group promo. For a post
  // still waiting on Louis's review (e.g. a new series' Day 1 test
  // article), not being in BLOG_ARTICLES at all would also hide it from
  // the site; this flag keeps the page live and reviewable while keeping
  // it out of the live group. Remove the flag once Louis approves it.
  excludeFromGroupShare?: boolean;
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "bible-insights",
    name: "Bible Insights",
    description: "Clear answers for common Bible questions and study challenges.",
  },
  {
    slug: "bible-study-tips",
    name: "Bible Study Tips",
    description: "Practical ways to read, study, highlight, and understand Scripture.",
  },
  {
    slug: "christian-foundations",
    name: "Christian Foundations",
    description: "Simple explanations of core Christian beliefs.",
  },
  {
    slug: "verse-breakdowns",
    name: "Verse Breakdowns",
    description: "Deeper explanations of important Bible verses.",
  },
  {
    slug: "character-studies",
    name: "Character Studies",
    description: "Learn from the lives, failures, and faith of people in Scripture.",
  },
  {
    slug: "christian-history",
    name: "Christian History",
    description: "Stories and turning points from the history of the Church.",
  },
  {
    slug: "bible-in-one-year",
    name: "Bible in One Year",
    description: "Day by day study notes that walk through the whole Bible in a year.",
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "exodus-4-explained",
    title: "Exodus 4 Explained: Moses's Excuses and the Return to Egypt",
    description:
      "Exodus 4 explained verse by verse: God gives Moses three signs, appoints Aaron as his spokesman, and sends him back to Egypt to confront Pharaoh.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/exodus-4-explained",
    publishedAt: "2026-10-08",
    readTime: "13 min read",
    image: "/blog-banners/exodus-4-explained.jpg",
    groupPost: {
      title: "Exodus 4 Explained 📖",
      content:
        "God already answered Moses twice.\nMoses keeps arguing anyway.\n\n📌 God answers every excuse except one: send someone else.\n\n📖 A shepherd's staff turns into a snake, then back again.\n📖 Moses says he is not **eloquent**. God says He made his mouth.\n📖 Aaron is given as a spokesman, already walking to meet him.\n\nNew article on:\n🟢 why God only gets angry at **one** of Moses's excuses\n🟢 what really happens at the inn with Zipporah\n🟢 why Israel believes the moment they hear it\n\nHave you ever kept arguing with God after He already answered you? 🙏",
    },
  },
  {
    slug: "exodus-3-explained",
    title: "Exodus 3 Explained: The Burning Bush and the Name of God",
    description:
      "Exodus 3 explained verse by verse: Moses meets God at the burning bush, hears the name I AM THAT I AM, and is sent back to Egypt to free Israel.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/exodus-3-explained",
    publishedAt: "2026-10-08",
    readTime: "13 min read",
    image: "/blog-banners/exodus-3-explained.jpg",
    groupPost: {
      title: "Exodus 3 Explained 📖",
      content:
        "A shepherd sees a bush on fire that never burns up.\nGod speaks from inside it.\n\n📌 God answers **who am I** with a promise, not a resume.\n\n📖 Moses is told to take off his shoes on holy ground.\n📖 God reveals His name: **I AM THAT I AM**.\n📖 He warns Moses that Pharaoh will say no, before Moses even asks.\n\nNew article on:\n🟢 what **I AM THAT I AM** actually means\n🟢 why Jesus later claims this exact name for Himself\n🟢 why God tells Moses the hard part in advance\n\nHave you ever felt unqualified for something God was clearly asking of you? 🙏",
    },
  },
  {
    slug: "exodus-2-explained",
    title: "Exodus 2 Explained: Baby Moses in the Basket and the Flight to Midian",
    description:
      "Exodus 2 explained verse by verse: a mother hides baby Moses in a basket, Pharaoh's daughter adopts him, and he flees to Midian after killing an Egyptian.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/exodus-2-explained",
    publishedAt: "2026-10-08",
    readTime: "13 min read",
    image: "/blog-banners/exodus-2-explained.jpg",
    groupPost: {
      title: "Exodus 2 Explained 📖",
      content:
        "Pharaoh orders every Hebrew son thrown in the river.\nOne mother uses that same river to save hers.\n\n📌 The basket word matches Noah's ark word exactly.\n\n📖 Pharaoh's own daughter adopts the baby anyway.\n📖 Grown Moses kills a man and flees to Midian.\n📖 Forty silent years pass in a single verse.\n\nNew article on:\n🟢 why Moses is named for being **drawn out**\n🟢 what **Hebrews 11** says his parents' hiding really was\n🟢 why God is barely named until the chapter's last lines\n\nHave you ever had to decide which side you truly belonged to? 🙏",
    },
  },
  {
    slug: "exodus-1-explained",
    title: "Exodus 1 Explained: Slavery in Egypt and the Midwives Who Feared God",
    description:
      "Exodus 1 explained verse by verse: Jacob's family multiplies in Egypt, a new king enslaves them, and two midwives defy orders to kill Hebrew sons.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/exodus-1-explained",
    publishedAt: "2026-10-08",
    readTime: "13 min read",
    image: "/blog-banners/exodus-1-explained.jpg",
    groupPost: {
      title: "Exodus 1 Explained 📖",
      content:
        "Genesis ends in a coffin.\nExodus opens with a graveyard growing anyway.\n\n📌 A new king forgets everything Joseph did for Egypt.\n\n📖 Jacob's seventy people become a nation of slaves.\n📖 Pharaoh orders two midwives to kill baby boys.\n📖 They say no, and God blesses them for it.\n\nNew article on:\n🟢 why Pharaoh feared a nation he could not see\n🟢 who **Shiphrah and Puah** really were\n🟢 what it means that they **feared God** more than a king\n\nHave you ever had to choose between obeying a rule and doing what you knew was right? 🙏",
    },
  },
  {
    slug: "can-god-forgive-what-ive-done",
    title: "Can God Forgive What I've Done?",
    description:
      "Can God forgive what you have done? See how Paul, David, Peter, and a dying thief were all forgiven completely, and why 1 John 1:9 means you can be too.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/can-god-forgive-what-ive-done",
    publishedAt: "2026-10-08",
    readTime: "16 min read",
    image: "/can-god-forgive-what-ive-done-banner.png",
    groupPost: {
      title: "Can God Forgive What I've Done? 📖",
      content:
        "You have never said it out loud.\nNot to anyone.\n\n📌 Yes, God can forgive it. All of it.\n\n📖 Paul approved a murder, then wrote half the New Testament.\n📖 David arranged a killing, and was still forgiven.\n📖 A dying thief had nothing left to offer but a breath.\n\nNew article on:\n🟢 what **1 John 1:9** actually promises you\n🟢 the fear that your sin is **too far gone**\n🟢 the real difference between **guilt** and shame\n\nWhat is the thing you have never told anyone? 🙏",
    },
  },
  {
    slug: "genesis-50-explained",
    title: "Genesis 50 Explained: Joseph's Forgiveness and a Coffin in Egypt",
    description:
      "Genesis 50 explained verse by verse: Joseph buries Jacob, forgives his fearful brothers with God meant it unto good, and Genesis ends with his death.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-50-explained",
    publishedAt: "2026-10-07",
    readTime: "14 min read",
    image: "/blog-banners/genesis-50-explained.jpg",
    groupPost: {
      title: "Genesis 50 Explained 📖",
      content:
        "Jacob is gone.\nNow his sons are afraid of their own brother.\n\n📌 Joseph answers with one famous line.\n\n📖 A massive funeral crosses two countries.\n📖 The brothers beg to be forgiven again.\n📖 Genesis ends with a coffin, and an oath.\n\nNew article on:\n🟢 why Joseph says **God meant it unto good**\n🟢 what the brothers' message from Jacob really was\n🟢 why Joseph makes Israel swear about his **bones**\n\nHave you ever wondered if someone's forgiveness of you was actually real? 🙏",
    },
  },
  {
    slug: "genesis-49-explained",
    title: "Genesis 49 Explained: Jacob's Final Blessing Over His Twelve Sons",
    description:
      "Genesis 49 explained verse by verse: Jacob blesses each of his twelve sons before he dies, naming Reuben's loss, Judah's sceptre, and Joseph's reward.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-49-explained",
    publishedAt: "2026-10-07",
    readTime: "16 min read",
    image: "/blog-banners/genesis-49-explained.jpg",
    groupPost: {
      title: "Genesis 49 Explained 📖",
      content:
        "A dying man calls for all twelve sons.\nHe has something to say to every one of them.\n\n📌 Some get corrected. Some get crowned.\n\n📖 Reuben loses his place as firstborn.\n📖 Judah gets the blessing that leads to kings.\n📖 Jacob cries out to God in the middle of it all.\n\nNew article on:\n🟢 what the **sceptre shall not depart** really means\n🟢 why **Simeon and Levi** get scattered, not cursed alike\n🟢 why Jacob's last words are about a **burial plot**\n\nHave you ever wondered if something from years ago still follows you into how people see you now? 🙏",
    },
  },
  {
    slug: "genesis-48-explained",
    title: "Genesis 48 Explained: Jacob Blesses Ephraim Over Manasseh",
    description:
      "Genesis 48 explained verse by verse: Jacob adopts Ephraim and Manasseh as his own sons, then crosses his hands to bless the younger over the firstborn.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-48-explained",
    publishedAt: "2026-10-07",
    readTime: "13 min read",
    image: "/blog-banners/genesis-48-explained.jpg",
    groupPost: {
      title: "Genesis 48 Explained 📖",
      content:
        "Jacob is dying, and nearly blind.\nHe still knows exactly where to put his hands.\n\n📌 He crosses them on purpose, not by mistake.\n\n📖 He adopts both grandsons as his own sons.\n📖 He blesses the younger over the firstborn.\n📖 Joseph tries to correct him. Jacob refuses.\n\nNew article on:\n🟢 why Jacob suddenly mentions **Rachel's death**\n🟢 what **wittingly** tells us about his hands\n🟢 the strange verse about a **sword and a bow**\n\nHave you ever made a call everyone around you thought was backward? 🙏",
    },
  },
  {
    slug: "genesis-47-explained",
    title: "Genesis 47 Explained: Jacob Settles in Goshen and Joseph Feeds Egypt",
    description:
      "Genesis 47 explained verse by verse: Jacob meets Pharaoh, Joseph feeds Egypt through famine, and the people trade land and freedom to survive.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-47-explained",
    publishedAt: "2026-10-07",
    readTime: "13 min read",
    image: "/blog-banners/genesis-47-explained.jpg",
    groupPost: {
      title: "Genesis 47 Explained 📖",
      content:
        "Five brothers stand before Pharaoh.\nThey tell him the truth: we are shepherds.\n\n📌 Pharaoh gives them the best land anyway.\n\n📖 Jacob blesses Pharaoh before Pharaoh blesses him.\n📖 The famine gets worse, not better.\n📖 Egypt trades its own land just to eat.\n\nNew article on:\n🟢 why Jacob calls his long life **few and evil**\n🟢 how a **fifth part tax** becomes permanent law\n🟢 the one thing Jacob asks for that Egypt cannot give\n\nHave you ever been comfortable somewhere that still was not quite home? 🙏",
    },
  },
  {
    slug: "genesis-46-explained",
    title: "Genesis 46 Explained: Jacob Goes Down to Egypt",
    description:
      "Genesis 46 explained verse by verse: God tells Jacob not to fear Egypt, the family of seventy is counted, and Joseph finally meets his father again.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-46-explained",
    publishedAt: "2026-10-07",
    readTime: "14 min read",
    image: "/blog-banners/genesis-46-explained.jpg",
    groupPost: {
      title: "Genesis 46 Explained 📖",
      content:
        "The wagons are loaded. The road is ready.\nJacob stops anyway, before he crosses the border.\n\n📌 God meets him there, by name, in the night.\n\n📖 He tells Jacob plainly: fear not.\n📖 A list counts every soul who makes the trip.\n📖 Joseph drives out himself to meet his father.\n\nNew article on:\n🟢 why the family is counted at exactly **seventy**\n🟢 why Joseph scripts what his brothers tell **Pharaoh**\n🟢 what Jacob says the moment he sees Joseph's face\n\nHave you ever needed one more word from God before taking a step you had already decided on? 🙏",
    },
  },
  {
    slug: "genesis-45-explained",
    title: "Genesis 45 Explained: Joseph Reveals Himself to His Brothers",
    description:
      "Genesis 45 explained verse by verse: Joseph tells his brothers who he is, forgives them, and sends wagons racing ahead to bring Jacob to Egypt.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-45-explained",
    publishedAt: "2026-10-06",
    readTime: "13 min read",
    image: "/blog-banners/genesis-45-explained.jpg",
    groupPost: {
      title: "Genesis 45 Explained 📖",
      content:
        "Judah is mid sentence, still pleading.\nThen Joseph cannot hold it back anymore.\n\n📌 Every Egyptian is sent out of the room.\n\n📖 Joseph says four words: I am Joseph.\n📖 He names what they did before he forgives it.\n📖 Jacob refuses to believe it, until he sees the wagons.\n\nNew article on:\n🟢 how Joseph explains **God's hand** in what they did\n🟢 why **Benjamin** gets gifts fifteen times his own price\n🟢 why it takes more than words to convince Jacob\n\nHave you ever held back a truth so long that saying it finally broke you open? 🙏",
    },
  },
  {
    slug: "genesis-44-explained",
    title: "Genesis 44 Explained: The Cup, the Trap, and Judah's Plea",
    description:
      "Genesis 44 explained verse by verse: Joseph's silver cup is planted in Benjamin's sack, and Judah offers himself in Benjamin's place to save him.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-44-explained",
    publishedAt: "2026-10-06",
    readTime: "13 min read",
    image: "/blog-banners/genesis-44-explained.jpg",
    groupPost: {
      title: "Genesis 44 Explained 📖",
      content:
        "The brothers leave Egypt with full sacks.\nThey do not make it a mile.\n\n📌 Joseph plants his own cup in Benjamin's sack.\n\n📖 The cup turns up in the youngest brother's grain.\n📖 All ten brothers go back, not just Benjamin.\n📖 Judah gives the longest speech in Genesis.\n\nNew article on:\n🟢 why **Judah** offers himself as a slave instead\n🟢 why he confesses guilt for a **crime he did not commit**\n🟢 what happens right before Joseph finally breaks\n\nHave you ever had to find out if a promise would hold once it actually cost you something? 🙏",
    },
  },
  {
    slug: "genesis-43-explained",
    title: "Genesis 43 Explained: Judah Stands Surety for Benjamin",
    description:
      "Genesis 43 explained verse by verse: Judah offers himself for Benjamin, the brothers return to Egypt, and Joseph nearly breaks down at the table.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-43-explained",
    publishedAt: "2026-10-06",
    readTime: "13 min read",
    image: "/blog-banners/genesis-43-explained.jpg",
    groupPost: {
      title: "Genesis 43 Explained 📖",
      content:
        "One brother once sold Joseph for silver.\nNow he offers his own life for another one.\n\n📌 Judah tells Jacob: let me bear the blame forever.\n\n📖 Jacob sends the same goods Joseph was sold for.\n📖 A steward tells terrified men not to fear.\n📖 Joseph leaves the room just to keep from breaking.\n\nNew article on:\n🟢 why **Judah** succeeds where Reuben failed\n🟢 how Joseph knew their exact **birth order**\n🟢 why **Benjamin** gets five times the food\n\nHave you ever watched someone finally step up, long after you stopped expecting it? 🙏",
    },
  },
  {
    slug: "genesis-42-explained",
    title: "Genesis 42 Explained: Face to Face With the Brother They Sold",
    description:
      "Genesis 42 explained verse by verse: Joseph's brothers bow before him as spies, Simeon is held hostage, and the brothers' guilt finally surfaces.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-42-explained",
    publishedAt: "2026-10-06",
    readTime: "18 min read",
    image: "/blog-banners/genesis-42-explained.jpg",
    groupPost: {
      title: "Genesis 42 Explained 📖",
      content:
        "Ten brothers bow to a stranger for grain.\nThe stranger is not a stranger.\n\n📌 Joseph recognizes them instantly. They see nothing.\n\n📖 He calls his own brothers spies.\n📖 Their old guilt spills out, unasked.\n📖 He weeps where they cannot see it.\n\nNew article on:\n🟢 why Joseph keeps **Simeon** behind in Egypt\n🟢 the guilt that surfaces after **20+ years** of silence\n🟢 why found money makes them **afraid**, not relieved\n\nHave you ever carried a guilt so long you assumed it would never catch up with you? 🙏",
    },
  },
  {
    slug: "genesis-41-explained",
    title: "Genesis 41 Explained: Pharaoh's Dreams and Joseph's Rise to Power",
    description:
      "Genesis 41 explained verse by verse: Pharaoh's dreams, Joseph's interpretation, and his sudden rise to rule all of Egypt.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-41-explained",
    publishedAt: "2026-10-06",
    readTime: "15 min read",
    image: "/blog-banners/genesis-41-explained.jpg",
    groupPost: {
      title: "Genesis 41 Explained 📖",
      content:
        "Pharaoh dreams the same thing twice in one night.\nNo one in Egypt can explain it.\n\n📌 A forgotten prisoner solves it, and rules Egypt by nightfall.\n\n📖 Joseph credits God before he hears a single detail.\n📖 Seven good years, then seven years of famine.\n📖 He names his own sons after his pain, not his promotion.\n\nNew article on:\n🟢 what the **doubled dream** actually meant\n🟢 how Joseph went from **prisoner to ruler** in one day\n🟢 why the whole world ends up coming to **him** for bread\n\nHave you ever waited so long for a door to open that you stopped expecting it to? 🙏",
    },
  },
  {
    slug: "what-is-sin",
    title: "What Is Sin, Really? A Complete Guide for Christians",
    description:
      "What is sin, really? Not just broken rules, but a broken relationship with God. A clear, honest biblical guide to sin, the heart, and grace.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-is-sin",
    publishedAt: "2026-10-06",
    readTime: "23 min read",
    image: "/what-is-sin-banner.png",
    groupPost: {
      title: "What Is Sin, Really? 📖",
      content:
        "Sin is not first a rule you broke.\nIt is a relationship broken.\n\n📌 Most people get sin wrong before they ever get grace wrong.\n\n📖 Adam and Eve hid from God, not a rulebook.\n📖 Jesus said anger and lust count before they're ever seen.\n📖 Christ died for you while you were still a sinner.\n\nNew article on:\n🟢 why sin means **missing the mark**, not just breaking a rule\n🟢 the difference between sins of **doing** and sins of **not doing**\n🟢 why **\"I'm a good person\"** misses the real question\n\nWhere have you been hiding instead of bringing it into the light? 🙏",
    },
  },
  {
    slug: "genesis-40-explained",
    title: "Genesis 40 Explained: Joseph, the Butler, and the Baker",
    description:
      "Genesis 40 explained verse by verse: the butler and baker's dreams, Joseph's interpretations, his one request, and the butler who forgets him.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-40-explained",
    publishedAt: "2026-10-05",
    readTime: "13 min read",
    image: "/blog-banners/genesis-40-explained.jpg",
    groupPost: {
      title: "Genesis 40 Explained 📖",
      content:
        "Two prisoners dream on the same night.\nJoseph reads both dreams exactly right.\n\n📌 One man walks free. One man does not.\n\n📖 Joseph credits God before he hears a single detail.\n📖 He asks the butler for one small favor.\n📖 The chapter ends with that favor forgotten.\n\nNew article on:\n🟢 what **\"lift up his head\"** really means in this chapter\n🟢 why the **baker's** dream turns out so differently\n🟢 why the butler **forgets** Joseph right after he helps him\n\nHave you ever helped someone who forgot you the moment they didn't need you anymore? 🙏",
    },
  },
  {
    slug: "proverbs-31-explained",
    title: "Proverbs 31 Explained: King Lemuel and the Virtuous Woman",
    description:
      "Proverbs 31 explained verse by verse: a mother's warning to King Lemuel about women and wine, and the virtuous woman's life from dawn to dusk.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-31-explained",
    publishedAt: "2026-10-05",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-31-explained.jpg",
    groupPost: {
      title: "Proverbs 31 Explained 📖",
      content:
        "The book of Proverbs ends on two voices.\nNeither one is Solomon.\n\n📌 A mother teaches a king, then a poem praises a woman.\n\n📖 Open thy mouth for those who cannot speak.\n📖 Her price is far above rubies.\n📖 Favour is deceitful, beauty is vain.\n\nNew article on:\n🟢 who **King Lemuel** actually was\n🟢 why his mother warns him about **wine**\n🟢 what the **virtuous woman** poem is really praising\n\nWhat is one way you could speak up for someone this week? 🙏",
    },
  },
  {
    slug: "proverbs-30-explained",
    title: "Proverbs 30 Explained: Agur's Confession and Four Things Too Wonderful",
    description:
      "Proverbs 30 explained verse by verse: Agur's confession, a prayer for neither poverty nor riches, and riddles about mystery and wisdom.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-30-explained",
    publishedAt: "2026-10-05",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-30-explained.jpg",
    groupPost: {
      title: "Proverbs 30 Explained 📖",
      content:
        "A new voice shows up in Proverbs 30.\nFirst thing he does is call himself brutish.\n\n📌 Agur admits what he does not know, then keeps teaching anyway.\n\n📖 Every word of God is pure, add nothing to it.\n📖 He prays for neither poverty nor riches.\n📖 Four small creatures praised for pure wisdom, not strength.\n\nNew article on:\n🟢 who **Agur** actually was\n🟢 the riddle of **Ithiel and Ucal**\n🟢 what **the way of a man with a maid** means\n\nWhat is one thing about God you honestly do not fully understand? 🙏",
    },
  },
  {
    slug: "proverbs-29-explained",
    title: "Proverbs 29 Explained: Hardened Necks, Kings, and No Vision",
    description:
      "Proverbs 29 explained verse by verse: a hardened neck against correction, kings and bribes, raising a child, and the fear of man vs trusting the LORD.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-29-explained",
    publishedAt: "2026-10-05",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-29-explained.jpg",
    groupPost: {
      title: "Proverbs 29 Explained 📖",
      content:
        "He was corrected.\nAgain and again.\n\n📌 Proverbs 29 asks what happens the next time.\n\n📖 Often reproved hardeneth his neck.\n📖 Where there is no vision, the people perish.\n📖 The fear of man bringeth a snare.\n\nNew article on:\n🟢 what **vision** actually means in verse 18\n🟢 why kings get **four whole verses** in this chapter\n🟢 trading the **fear of man** for trust in the LORD\n\nWhen were you last corrected, and did your neck soften or harden? 🙏",
    },
  },
  {
    slug: "proverbs-28-explained",
    title: "Proverbs 28 Explained: Bold as a Lion and Covering vs Confessing Sin",
    description:
      "Proverbs 28 explained verse by verse: the wicked fleeing with no one chasing them, covering sin vs confessing it, blood guilt, and trusting your own heart.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-28-explained",
    publishedAt: "2026-10-05",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-28-explained.jpg",
    groupPost: {
      title: "Proverbs 28 Explained 📖",
      content:
        "Nobody is chasing him.\nHe runs anyway.\n\n📌 Proverbs 28 asks what you do when no one is watching.\n\n📖 The wicked flee when no man pursueth.\n📖 He that covereth his sins shall not prosper.\n📖 He that trusteth in his own heart is a fool.\n\nNew article on:\n🟢 why a guilty conscience **invents its own danger**\n🟢 the two conditions mercy actually requires\n🟢 why trusting your own heart is called **foolish**\n\nWhat have you been covering instead of confessing? 🙏",
    },
  },
  {
    slug: "proverbs-27-explained",
    title: "Proverbs 27 Explained: Iron Sharpens Iron and the Wounds of a Friend",
    description:
      "Proverbs 27 explained verse by verse: the wounds of a friend vs an enemy's kiss, iron sharpening iron, boasting about tomorrow, and a man tested by his own praise.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-27-explained",
    publishedAt: "2026-10-04",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-27-explained.jpg",
    groupPost: {
      title: "Proverbs 27 Explained 📖",
      content:
        "A friend wounds you with truth.\nAn enemy kisses you with a lie.\n\n📌 Proverbs 27 keeps testing what is real and what only looks real.\n\n📖 Faithful are the wounds of a friend.\n📖 Iron sharpeneth iron, so a man sharpeneth his friend.\n📖 As in water face answereth to face, so the heart of man to man.\n\nNew article on:\n🟢 why verse 1 warns against **boasting about tomorrow**\n🟢 what it means to be tested by your own **praise**\n🟢 why the chapter ends with advice about **flocks and herds**\n\nWhich friend in your life gives you honest wounds instead of empty kisses? 🙏",
    },
  },
  {
    slug: "proverbs-26-explained",
    title: "Proverbs 26 Explained: Fools, Sluggards, and Answering Both Ways",
    description:
      "Proverbs 26 explained verse by verse: the fool, the sluggard's lion excuse, a dog returning to its vomit, talebearers, and answering a fool both ways.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-26-explained",
    publishedAt: "2026-10-04",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-26-explained.jpg",
    groupPost: {
      title: "Proverbs 26 Explained 📖",
      content:
        "A dog returns to its own vomit.\nSolomon says that is exactly what a fool does.\n\n📌 Proverbs 26 holds up mirror after mirror to show you what foolishness looks like.\n\n📖 Answer not a fool according to his folly... answer a fool according to his folly.\n📖 As a dog returneth to his vomit, so a fool returneth to his folly.\n📖 Where there is no talebearer, the strife ceaseth.\n\nNew article on:\n🟢 why verses 4 and 5 seem to **contradict** each other\n🟢 the sluggard's excuse about a **lion in the street**\n🟢 why a **flattering mouth** works the same ruin as a lie\n\nWhat excuse have you been treating like a real lion? 🙏",
    },
  },
  {
    slug: "proverbs-25-explained",
    title: "Proverbs 25 Explained: Apples of Gold and a City Without Walls",
    description:
      "Proverbs 25 explained verse by verse: wisdom in a king's court, a word fitly spoken, feeding your enemy, and a city with no walls left standing.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-25-explained",
    publishedAt: "2026-10-04",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-25-explained.jpg",
    groupPost: {
      title: "Proverbs 25 Explained 📖",
      content:
        "Your enemy is hungry.\nSolomon tells you to feed him anyway.\n\n📌 Proverbs 25 keeps testing what you do with power, words, and enemies.\n\n📖 A word fitly spoken is like apples of gold in pictures of silver.\n📖 If thine enemy be hungry, give him bread to eat.\n📖 He that hath no rule over his own spirit is like a city broken down.\n\nNew article on:\n🟢 what it really means to **heap coals of fire** on someone's head\n🟢 why God gets glory from **concealing** a thing\n🟢 what a **troubled fountain** has to do with a good man falling\n\nWho in your life needs kindness instead of payback today? 🙏",
    },
  },
  {
    slug: "proverbs-24-explained",
    title: "Proverbs 24 Explained: The House Wisdom Builds and the Field Folly Loses",
    description:
      "Proverbs 24 explained verse by verse: a house built by wisdom, a duty to rescue the endangered, gloating over an enemy's fall, and the sluggard's ruined vineyard.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-24-explained",
    publishedAt: "2026-10-04",
    readTime: "13 min read",
    image: "/blog-banners/proverbs-24-explained.jpg",
    groupPost: {
      title: "Proverbs 24 Explained 📖",
      content:
        "One man builds a house.\nAnother man lets his field's wall fall down.\n\n📌 Proverbs 24 keeps asking which one you're doing right now.\n\n📖 Through wisdom is an house builded.\n📖 A just man falleth seven times, and riseth up again.\n📖 Yet a little sleep, a little slumber, a little folding of the hands.\n\nNew article on:\n🟢 whether God spares your enemy if you **celebrate their fall**\n🟢 who gets **drawn unto death** in verse 11, and why it's your job\n🟢 why verse 29 is not a contradiction of eye for eye\n\nWhat's one broken stone in your own wall before it becomes the whole thing? 🙏",
    },
  },
  {
    slug: "proverbs-23-explained",
    title: "Proverbs 23 Explained: The Wine That Bites Like a Serpent",
    description:
      "Proverbs 23 explained verse by verse: self control at a ruler's table, the rod that corrects a child, buying the truth, and the wine that bites like a serpent.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-23-explained",
    publishedAt: "2026-10-04",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-23-explained.jpg",
    groupPost: {
      title: "Proverbs 23 Explained 📖",
      content:
        "You sit at a ruler's table.\nThe very next verse says put a knife to your throat.\n\n📌 Proverbs 23 keeps asking what you just swallowed.\n\n📖 Riches certainly make themselves wings and fly away.\n📖 Buy the truth, and sell it not.\n📖 Look not thou upon the wine when it is red.\n\nNew article on:\n🟢 whether verse 13 really commands **physical punishment**\n🟢 what **deliver his soul from hell** actually means\n🟢 why the chapter ends on a man planning his **next drink**\n\nWhat appetite has been getting the final word lately? 🙏",
    },
  },
  {
    slug: "proverbs-22-explained",
    title: "Proverbs 22 Explained: A Good Name and the Child You Train",
    description:
      "Proverbs 22 explained verse by verse: a good name over riches, training up a child, the rich and poor meet together, and the landmark you must not move.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-22-explained",
    publishedAt: "2026-10-03",
    readTime: "17 min read",
    image: "/blog-banners/proverbs-22-explained.jpg",
    groupPost: {
      title: "Proverbs 22 Explained 📖",
      content:
        "A good name is worth more than gold.\nThat is only the opening line.\n\n📌 Proverbs 22 keeps asking: what did you actually build, and what did you just borrow?\n\n📖 The rich and poor meet together, made by the same LORD.\n📖 Train up a child in the way he should go.\n📖 Remove not the ancient landmark your fathers set.\n\nNew article on:\n🟢 whether **train up a child** is really a guarantee\n🟢 what it costs to **strike hands** as surety for a debt\n🟢 why moving a boundary stone mattered enough to curse it\n\nWhat line have you been quietly nudging lately? 🙏",
    },
  },
  {
    slug: "proverbs-21-explained",
    title: "Proverbs 21 Explained: The King's Heart and the LORD Who Weighs It",
    description:
      "Proverbs 21 explained verse by verse: the king's heart in the LORD's hand, a brawling woman named twice, the wicked as a ransom, and safety that is of the LORD.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-21-explained",
    publishedAt: "2026-10-03",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-21-explained.jpg",
    groupPost: {
      title: "Proverbs 21 Explained 📖",
      content:
        "A king thinks he rules his own heart.\nThis chapter says someone else is steering it.\n\n📌 Proverbs 21 keeps asking: who is actually in control?\n\n📖 The king's heart is in the hand of the LORD, like a river.\n📖 A brawling woman gets named twice, ten verses apart.\n📖 The horse is prepared for battle, but safety is of the LORD.\n\nNew article on:\n🟢 what it means that the **wicked become a ransom** for the righteous\n🟢 why Solomon repeats the same **warning twice** in one chapter\n🟢 what you are really trusting when you prepare for battle\n\nWhat have you been trusting to keep you safe this week? 🙏",
    },
  },
  {
    slug: "proverbs-20-explained",
    title: "Proverbs 20 Explained: The Candle of the LORD",
    description:
      "Proverbs 20 explained verse by verse: wine as a mocker, divers weights, a clean heart no one can claim, and the spirit as the candle of the LORD.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-20-explained",
    publishedAt: "2026-10-03",
    readTime: "17 min read",
    image: "/blog-banners/proverbs-20-explained.jpg",
    groupPost: {
      title: "Proverbs 20 Explained 📖",
      content:
        "Wine makes a mocker out of the one who trusts it.\nThat is just the opening line.\n\n📌 Proverbs 20 keeps asking: can you actually see your own heart clearly?\n\n📖 Who can say, I have made my heart clean?\n📖 Divers weights are an abomination to the LORD, named twice in one chapter.\n📖 The spirit of man is the candle of the LORD, searching the inward parts.\n\nNew article on:\n🟢 what it means to take a **pledge** for a stranger's debt\n🟢 why cursing a parent gets such severe language\n🟢 what the **candle of the LORD** actually searches\n\nWhat has that candle been searching in you lately? 🙏",
    },
  },
  {
    slug: "proverbs-19-explained",
    title: "Proverbs 19 Explained: The Counsel of the LORD That Stands",
    description:
      "Proverbs 19 explained verse by verse: integrity over cleverness, a false witness warned twice, mercy as a loan to the LORD, and the counsel that stands.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-19-explained",
    publishedAt: "2026-10-03",
    readTime: "13 min read",
    image: "/blog-banners/proverbs-19-explained.jpg",
    groupPost: {
      title: "Proverbs 19 Explained 📖",
      content:
        "A poor man with integrity beats a rich liar.\nThat ranking opens this whole chapter.\n\n📌 Proverbs 19 warns twice: a false witness will not go free.\n\n📖 Wealth buys friends. Poverty loses them fast.\n📖 Mercy to the poor is called lending to the LORD.\n📖 Many plans form in your heart, but His counsel stands.\n\nNew article on:\n🟢 why a **false witness** gets warned about twice\n🟢 what it means to **lend to the LORD**\n🟢 why a servant ruling a prince is called **unseemly**\n\nWhich plan are you most sure of this week? 🙏",
    },
  },
  {
    slug: "proverbs-18-explained",
    title: "Proverbs 18 Explained: Deep Waters and a True Friend",
    description:
      "Proverbs 18 explained verse by verse: a man who isolates himself, two towers of safety, hearing both sides first, and a friend closer than a brother.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-18-explained",
    publishedAt: "2026-10-03",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-18-explained.jpg",
    groupPost: {
      title: "Proverbs 18 Explained 📖",
      content:
        "Some days you want to talk it through.\nOther days you just want to be left alone.\n\n📌 Proverbs 18 names two towers of safety, and only one is actually safe.\n\n📖 The tongue holds death and life in the same breath.\n📖 A rich man's wealth is only a strong wall in his own mind.\n📖 A friend can stick closer than a brother.\n\nNew article on:\n🟢 whether verse 1 is really praising **isolation**\n🟢 what a gift in verse 16 is actually **buying**\n🟢 why finding a wife in verse 22 is not a verdict on **singleness**\n\nWhich tower are you actually running to this week? 🙏",
    },
  },
  {
    slug: "why-christians-leave-the-faith",
    title: "Why Do Christians Leave the Faith?",
    description:
      "Why do Christians leave the faith? The real reasons, from hypocrisy to doubt to church hurt, and the line between leaving Jesus and leaving a flawed church.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/why-christians-leave-the-faith",
    publishedAt: "2026-10-03",
    readTime: "23 min read",
    image: "/why-christians-leave-the-faith-banner.png",
    groupPost: {
      title: "Why Do Christians Leave the Faith? 📖",
      content:
        "Someone you love just said they are done with church.\nOr maybe it was you, at two in the morning.\n\n📌 Most people who leave are not rebelling against God.\n\n📖 Peter stayed when a whole crowd walked away.\n📖 Thomas doubted and Jesus still met him.\n📖 A desperate father believed and asked for help anyway.\n\nNew article on:\n🟢 the real reasons people walk away, without **contempt**\n🟢 why doubt is not the same as **unbelief**\n🟢 how to talk to someone who is **leaving**\n\nWhat would you say to someone walking away? 🙏",
    },
  },
  {
    slug: "proverbs-17-explained",
    title: "Proverbs 17 Explained: A Dry Morsel and a House Full of Strife",
    description:
      "Proverbs 17 explained verse by verse: a quiet meal over a feast full of strife, the LORD who tries the heart, and whether a gift is a bribe or a blessing.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-17-explained",
    publishedAt: "2026-10-02",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-17-explained.jpg",
    groupPost: {
      title: "Proverbs 17 Explained 📖",
      content:
        "A dry crust eaten in peace.\nA feast eaten in the middle of a fight.\n\n📌 Proverbs 17 keeps weighing quiet against loud, all chapter long.\n\n📖 A reproof lands deeper in a wise man than a hundred stripes in a fool.\n📖 A friend loves at all times, a brother is born for adversity.\n📖 Even a fool who holds his peace is counted wise.\n\nNew article on:\n🟢 whether Proverbs 17:8 actually approves of **bribery**\n🟢 what it means to **become surety** for someone\n🟢 why a merry heart is called **medicine** for the body\n\nWhat conversation do you need to leave off before it floods? 🙏",
    },
  },
  {
    slug: "proverbs-16-explained",
    title: "Proverbs 16 Explained: The LORD Who Directs Every Step",
    description:
      "Proverbs 16 explained verse by verse: why your heart plans the way but the LORD directs the steps, pride before destruction, and the lot cast into the lap.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-16-explained",
    publishedAt: "2026-10-02",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-16-explained.jpg",
    groupPost: {
      title: "Proverbs 16 Explained 📖",
      content:
        "You make a plan.\nGod directs where it actually lands.\n\n📌 The chapter opens and closes on the same 4 words: of the LORD.\n\n📖 A man's heart plans his way, the LORD directs his steps.\n📖 Pride goes before destruction, not just a fall.\n📖 A lot cast in the lap is still the LORD's to dispose.\n\nNew article on:\n🟢 what Proverbs 16:4 really says about the **wicked**\n🟢 why verse 25 repeats **Proverbs 14:12** almost word for word\n🟢 whether casting a lot is the same as **fortune telling**\n\nWhat plan are you still holding onto too tightly? 🙏",
    },
  },
  {
    slug: "proverbs-15-explained",
    title: "Proverbs 15 Explained: A Soft Answer and a Watching God",
    description:
      "Proverbs 15 explained verse by verse: the soft answer that turns away wrath, the eyes of the LORD in every place, and why humility comes before honour.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-15-explained",
    publishedAt: "2026-10-02",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-15-explained.jpg",
    groupPost: {
      title: "Proverbs 15 Explained 📖",
      content:
        "One word can calm a room.\nThe next word can wreck it.\n\n📌 This chapter names the LORD 9 times in 33 verses.\n\n📖 A soft answer turns away wrath.\n📖 The eyes of the LORD are in every place.\n📖 Before honour comes humility.\n\nNew article on:\n🟢 what **Hell and destruction** actually means in verse 11\n🟢 why God defends the **widow's border** in verse 25\n🟢 why the days of the afflicted are called **evil**\n\nWhat is the first sentence you reach for when you're upset? 🙏",
    },
  },
  {
    slug: "proverbs-14-explained",
    title: "Proverbs 14 Explained: Wisdom's House and a Nation's Reproach",
    description:
      "Proverbs 14 explained verse by verse: the wise woman who builds her house, fear of the LORD as a fountain of life, and why oppressing the poor reproaches God.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-14-explained",
    publishedAt: "2026-10-02",
    readTime: "17 min read",
    image: "/blog-banners/proverbs-14-explained.jpg",
    groupPost: {
      title: "Proverbs 14 Explained 📖",
      content:
        "A wise woman builds her house with her hands.\nA fool tears hers down with hers.\n\n📌 The LORD is named 3 times in this chapter.\nEvery time, the word next to His name is fear.\n\n📖 A scorner searches for wisdom and never finds it.\n📖 A path can feel right and still end in death.\n📖 Oppressing the poor reproaches God Himself.\n\nNew article on:\n🟢 why Proverbs 14:12 repeats itself in **chapter 16**\n🟢 what the **fountain of life** actually means\n🟢 why a king with no people has no **honour** left\n\nWhat is your own house being built on right now? 🙏",
    },
  },
  {
    slug: "proverbs-13-explained",
    title: "Proverbs 13 Explained: The Mouth, the Rod, and True Riches",
    description:
      "Proverbs 13 explained verse by verse: the wise son, the mouth that keeps life, the paradox of riches, and why withholding correction is called a failure to love.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-13-explained",
    publishedAt: "2026-10-02",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-13-explained.jpg",
    groupPost: {
      title: "Proverbs 13 Explained 📖",
      content:
        "A man who acts rich and owns nothing.\nA man who looks poor and holds real wealth.\n\n📌 This chapter names life or death 4 times in 25 verses.\n\n📖 Keeping your mouth keeps your life.\n📖 Hope deferred makes the heart sick.\n📖 Sparing the rod is called hating your son.\n\nNew article on:\n🟢 what Proverbs 13:7 means by **rich yet nothing**\n🟢 why the poor man never hears a **rebuke**\n🟢 what **betimes** actually means in verse 24\n\nWhich verse from this chapter caught you off guard? 🙏",
    },
  },
  {
    slug: "proverbs-12-explained",
    title: "Proverbs 12 Explained: Roots That Hold and Lips That Snare",
    description:
      "Proverbs 12 explained verse by verse: a root nothing can move, a virtuous woman, mercy for animals, and the tongue that heals or wounds.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-12-explained",
    publishedAt: "2026-10-01",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-12-explained.jpg",
    groupPost: {
      title: "Proverbs 12 Explained 📖",
      content:
        "A root nothing can move.\nA tongue that heals or wounds like a sword.\n\n📌 Eight of this chapter's 28 verses are about the mouth.\n\n📖 The righteous man cares for his animals.\n📖 A good word lifts a heavy heart.\n📖 Lying lips close the chapter the same way chapter 11 opened.\n\nNew article on:\n🟢 what a **virtuous woman** meant in verse 4\n🟢 does verse 21 promise **no evil** ever touches you\n🟢 why a lazy hunter never **eats** what he caught\n\nWhich line in this chapter hits closest to home? 🙏",
    },
  },
  {
    slug: "proverbs-11-explained",
    title: "Proverbs 11 Explained: Honest Scales and a Righteousness That Delivers",
    description:
      "Proverbs 11 explained verse by verse: honest scales, a stranger's debt, a city's blessing or ruin, and the generosity that multiplies instead of shrinks.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-11-explained",
    publishedAt: "2026-10-01",
    readTime: "16 min read",
    image: "/blog-banners/proverbs-11-explained.jpg",
    groupPost: {
      title: "Proverbs 11 Explained 📖",
      content:
        "A crooked scale. A gold ring on a pig.\nThis chapter weighs honesty like nothing before it.\n\n📌 Righteousness shows up twelve times. Wicked shows up nine.\n\n📖 A false balance is an abomination to God.\n📖 Scattering generously leads to increase, not loss.\n📖 Trusting riches ends in a fall.\n\nNew article on:\n🟢 what **surety for a stranger** actually means\n🟢 why verse 4 **repeats** a line from chapter 10\n🟢 does verse 16 really **rank** men above women\n\nWhich line in this chapter hits closest to home? 🙏",
    },
  },
  {
    slug: "proverbs-10-explained",
    title: "Proverbs 10 Explained: Wisdom, Work, and the Tongue",
    description:
      "Proverbs 10 explained verse by verse: where Solomon's long speeches end and 32 short proverbs on work, speech, love, and the righteous life begin.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-10-explained",
    publishedAt: "2026-10-01",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-10-explained.jpg",
    groupPost: {
      title: "Proverbs 10 Explained 📖",
      content:
        "Nine chapters of speeches just ended.\nThis one opens with 32 short sayings instead.\n\n📌 Love covereth all sins, hatred stirs up strife.\n\n📖 A wise son makes a glad father.\n📖 The diligent hand makes rich, the slack hand poor.\n📖 Two lines repeat word for word on purpose.\n\nNew article on:\n🟢 why the chapter suddenly feels so **different**\n🟢 what **love covereth all sins** really means\n🟢 does wealth actually prove **righteousness**\n\nWhich of these 32 sayings hits closest to home? 🙏",
    },
  },
  {
    slug: "proverbs-9-explained",
    title: "Proverbs 9 Explained: Wisdom and Folly Both Call to You",
    description:
      "Proverbs 9 explained verse by verse: wisdom's costly feast, folly's copycat invitation, why a scorner can't be corrected, and what stolen water really costs.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-9-explained",
    publishedAt: "2026-10-01",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-9-explained.jpg",
    groupPost: {
      title: "Proverbs 9 Explained 📖",
      content:
        "Two women. Two houses. Nearly the same words.\nOnly one of them tells the truth.\n\n📌 Folly copies Wisdom's exact invitation, almost word for word.\n\n📖 Wisdom built her house before inviting a single guest.\n📖 A scorner can't be corrected, but a wise man gets wiser.\n📖 Her guests don't know the dead are already there.\n\nNew article on:\n🟢 what the **seven pillars** of wisdom's house mean\n🟢 why **stolen water** tastes sweeter than it should\n🟢 what **the fear of the LORD** actually starts\n\nWhich table are you really sitting at this week? 🙏",
    },
  },
  {
    slug: "proverbs-8-explained",
    title: "Proverbs 8 Explained: Wisdom's Call Before the World Began",
    description:
      "Proverbs 8 explained verse by verse: wisdom's public call, her worth beyond rubies, her reach into kings, and her claim to stand beside God before creation.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-8-explained",
    publishedAt: "2026-10-01",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-8-explained.jpg",
    groupPost: {
      title: "Proverbs 8 Explained 📖",
      content:
        "Wisdom stops whispering in this chapter.\nShe stands at the gates and calls out loud.\n\n📌 She claims to have been there before the mountains existed.\n\n📖 She stands in the highest, busiest places in the city.\n📖 Her worth is set above rubies and gold.\n📖 One verse here fueled a major early church argument.\n\nNew article on:\n🟢 what it means that the LORD **possessed** wisdom\n🟢 why kings and judges are said to **rule by her**\n🟢 the mysterious phrase **brought up with him**\n\nWhere is wisdom calling to you right now? 🙏",
    },
  },
  {
    slug: "proverbs-7-explained",
    title: "Proverbs 7 Explained: The Young Man Watched From a Window",
    description:
      "Proverbs 7 explained verse by verse: the young man watched from a window, the woman's calculated pitch, and why even strong men have fallen to her.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-7-explained",
    publishedAt: "2026-10-01",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-7-explained.jpg",
    groupPost: {
      title: "Proverbs 7 Explained 📖",
      content:
        "One scene. One window. One warning worth remembering.\nSolomon watched the whole thing happen.\n\n📌 Flattery can work like force on a man who never decided his limits.\n\n📖 A young man walks toward a corner in the dark.\n📖 Her pitch sounds religious. It is not.\n📖 Even strong men have fallen to her, not just the foolish.\n\nNew article on:\n🟢 what it means to call wisdom your **sister**\n🟢 why she mentions **peace offerings** and paid vows\n🟢 why Solomon compares him to an **ox** going to slaughter\n\nWhich part of this scene hits closest to home? 🙏",
    },
  },
  {
    slug: "proverbs-6-explained",
    title: "Proverbs 6 Explained: The Sluggard, the Ant, and Six Things God Hates",
    description:
      "Proverbs 6 explained verse by verse: the trap of cosigning a debt, the ant's lesson for the lazy, the seven things God hates, and the return to the warning against adultery.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-6-explained",
    publishedAt: "2026-09-27",
    readTime: "14 min read",
    image: "/blog-banners/proverbs-6-explained.jpg",
    groupPost: {
      title: "Proverbs 6 Explained 📖",
      content:
        "Five short warnings, packed into one chapter.\nEach one lands on its own.\n\n📌 One promise made carelessly can snare you for years.\n\n📖 Go to the ant, Solomon says, and watch her work unsupervised.\n📖 Seven things the LORD names as hated outright.\n📖 Fire in the bosom, a picture of what adultery always does.\n\nNew article on:\n🟢 what it really means to be **surety** for someone\n🟢 why Solomon numbers it **six things, yea seven**\n🟢 whether hunger ever **excuses** stealing\n\nWhich of these five warnings hits closest to home this week? 🙏",
    },
  },
  {
    slug: "proverbs-5-explained",
    title: "Proverbs 5 Explained: The Warning Against the Strange Woman",
    description:
      "Proverbs 5 explained verse by verse: the honey that turns bitter, what an affair actually costs, drinking from your own well, and why nothing here is hidden from God.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-5-explained",
    publishedAt: "2026-09-26",
    readTime: "13 min read",
    image: "/blog-banners/proverbs-5-explained.jpg",
    groupPost: {
      title: "Proverbs 5 Explained 📖",
      content:
        "Her lips drop honey. Her end is bitter as wormwood.\nThat is the whole chapter in one line.\n\n📌 Solomon spends all 23 verses on one warning.\n\n📖 A path so unstable Solomon says you cannot even map it.\n📖 What it actually costs: your honour, your years, your wealth.\n📖 Then a command to actually enjoy the marriage you already have.\n\nNew article on:\n🟢 what it means to **drink from your own cistern**\n🟢 why the old word **ravished** shows up in this chapter\n🟢 whether verse 22 means **God sets the trap**\n\nWhat do you already have that is worth being glad in today? 🙏",
    },
  },
  {
    slug: "proverbs-4-explained",
    title: "Proverbs 4 Explained: Get Wisdom, Guard Your Heart",
    description:
      "Proverbs 4 explained verse by verse: the wisdom David passed to Solomon, why wisdom outranks everything else, the path of the wicked, and guarding your heart above all.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-4-explained",
    publishedAt: "2026-09-26",
    readTime: "13 min read",
    image: "/blog-banners/proverbs-4-explained.jpg",
    groupPost: {
      title: "Proverbs 4 Explained 📖",
      content:
        "A father passes down what his own father once taught him.\nTwo generations of one lesson.\n\n📌 Get wisdom is repeated more than once for a reason.\n\n📖 Solomon recalls the words David spoke to him as a boy.\n📖 Wisdom is called the principal thing, above every other gain.\n📖 One verse says guard your heart, because life flows from it.\n\nNew article on:\n🟢 what it means that wisdom is the **principal thing**\n🟢 why the wicked in this chapter **cannot rest**\n🟢 how to actually **guard your heart** all day long\n\nWhat are you guarding less carefully than your heart right now? 🙏",
    },
  },
  {
    slug: "proverbs-3-explained",
    title: "Proverbs 3 Explained: Trust the LORD With All Your Heart",
    description:
      "Proverbs 3 explained verse by verse: trusting God over your own understanding, honoring Him with money, His discipline, wisdom's worth, and how it treats your neighbor.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-3-explained",
    publishedAt: "2026-09-26",
    readTime: "12 min read",
    image: "/blog-banners/proverbs-3-explained.jpg",
    groupPost: {
      title: "Proverbs 3 Explained 📖",
      content:
        "Two verses from this chapter get quoted everywhere.\nThe other thirty three barely get read.\n\n📌 Trust in the Lord only makes sense next to the rest of the chapter.\n\n📖 Solomon ties loyalty and truth to a promise of favor.\n📖 God's discipline is proof of love, not proof of distance.\n📖 The chapter ends on neighbors, not theology.\n\nNew article on:\n🟢 what it means to **lean not on your own understanding**\n🟢 whether honoring God with money **guarantees** wealth\n🟢 why wisdom is called **more precious than rubies**\n\nHave you read past verse 6 lately? 🙏",
    },
  },
  {
    slug: "proverbs-2-explained",
    title: "Proverbs 2 Explained: Wisdom That Protects You From Two Dangers",
    description:
      "Proverbs 2 explained verse by verse: searching for wisdom like silver, the LORD who gives it, and the two dangers, the evil man and the strange woman, it rescues you from.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-2-explained",
    publishedAt: "2026-09-26",
    readTime: "13 min read",
    image: "/blog-banners/proverbs-2-explained.jpg",
    groupPost: {
      title: "Proverbs 2 Explained 📖",
      content:
        "One sentence. Twenty two verses. One promise at the end.\n\nThat is the whole shape of this chapter.\n\n📌 Wisdom is searched for, like buried silver, not stumbled into.\n\n📖 Solomon tells his son exactly how hard to search.\n📖 Wisdom rescues him from a man who delights in evil.\n📖 Wisdom rescues him from a woman who flatters her way into an affair.\n\nNew article on:\n🟢 why the search matters even though **God gives the gift**\n🟢 who the **strange woman** in this chapter actually is\n🟢 what it means to actually **remain** somewhere good\n\nWhich path are you walking right now? 🙏",
    },
  },
  {
    slug: "proverbs-1-explained",
    title: "Proverbs 1 Explained: Why Wisdom Begins With Fearing God",
    description:
      "Proverbs 1 explained verse by verse: the purpose of the book, the fear of the LORD, a father's warning against violent men, and wisdom crying out in the street.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/proverbs-1-explained",
    publishedAt: "2026-09-26",
    readTime: "15 min read",
    image: "/blog-banners/proverbs-1-explained.jpg",
    groupPost: {
      title: "Proverbs 1 Explained 📖",
      content:
        "A father warns his son before trouble ever finds him.\nNot after. Before.\n\n📌 Wisdom begins with fearing God, not with being smart.\n\n📖 Solomon asked God for wisdom instead of riches.\n📖 A violent gang tries to recruit his son.\n📖 Wisdom herself cries out in the streets, calling anyone who will listen.\n\nNew article on:\n🟢 what the **fear of the LORD** actually means\n🟢 why greed for gain **destroys its own chaser**\n🟢 the promise waiting for anyone who **turns and listens**\n\nWhich voice have you been listening to this week? 🙏",
    },
  },
  {
    slug: "genesis-39-explained",
    title: "Genesis 39 Explained: Joseph, Potiphar's Wife, and Prison",
    description:
      "Genesis 39 explained verse by verse: Joseph's rise in Potiphar's house, his refusal of Potiphar's wife, the false accusation, and his unjust imprisonment.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-39-explained",
    publishedAt: "2026-09-25",
    readTime: "12 min read",
    image: "/blog-banners/genesis-39-explained.jpg",
    groupPost: {
      title: "Genesis 39 Explained 📖",
      content:
        "He said no. Not once. Every single day.\nThen the lie that followed nearly buried him.\n\n📌 Joseph goes from trusted slave to falsely accused prisoner in one afternoon.\n\n📖 Potiphar's wife propositions Joseph day after day.\n📖 Joseph runs and leaves his own garment behind.\n📖 He is punished for the very thing he refused to do.\n\nNew article on:\n🟢 why Joseph calls this sin against **God**, not just Potiphar\n🟢 whether Potiphar even believed his wife's story\n🟢 how the LORD stays with Joseph in the **prison** too\n\nHave you ever done the right thing and still paid for it? 🙏",
    },
  },
  {
    slug: "genesis-38-explained",
    title: "Genesis 38 Explained: Judah, Tamar, and the Twins Pharez and Zarah",
    description:
      "Genesis 38 explained verse by verse: Judah's broken promise, Tamar's disguise, the trial by fire, and the twins Pharez and Zarah born into Jesus' line.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-38-explained",
    publishedAt: "2026-09-25",
    readTime: "13 min read",
    image: "/blog-banners/genesis-38-explained.jpg",
    groupPost: {
      title: "Genesis 38 Explained 📖",
      content:
        "Judah sends his daughter in law away.\nHe never plans to keep his promise to her.\n\n📌 She disguises herself, and Judah is the one exposed.\n\n📖 Two of Judah's sons die for what they refuse to do.\n📖 Tamar asks for proof instead of payment.\n📖 Judah orders her death before he learns the truth.\n\nNew article on:\n🟢 what **Onan's sin** actually was\n🟢 why Judah calls Tamar **more righteous** than himself\n🟢 how this messy story reaches all the way to **Jesus**\n\nHave you ever judged someone else for the very thing you were hiding yourself? 🙏",
    },
  },
  {
    slug: "genesis-37-explained",
    title: "Genesis 37 Explained: Joseph's Dreams and the Brothers Who Sold Him",
    description:
      "Genesis 37 explained verse by verse: Jacob's favoritism, Joseph's two dreams, his brothers' plot, Reuben's rescue attempt, and the sale to Egypt.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-37-explained",
    publishedAt: "2026-09-24",
    readTime: "13 min read",
    image: "/blog-banners/genesis-37-explained.jpg",
    groupPost: {
      title: "Genesis 37 Explained 📖",
      content:
        "One coat. Two dreams. Ten brothers who hate him.\nBy the end of the chapter, Joseph is gone.\n\n📌 His own brothers sell him for the price of a slave.\n\n📖 Jacob's favoritism splits the family wide open.\n📖 Joseph's dreams only make his brothers hate him more.\n📖 Reuben tries a quiet rescue, and it still fails.\n\nNew article on:\n🟢 what the **coat of many colours** really meant\n🟢 who actually **sold** Joseph, brothers or traders\n🟢 the **deception** that comes back on Jacob himself\n\nHave you ever been pushed out by the people who should have protected you? 🙏",
    },
  },
  {
    slug: "genesis-36-explained",
    title: "Genesis 36 Explained: Esau's Family and the Kings of Edom",
    description:
      "Genesis 36 explained verse by verse: Esau's wives, sons, and grandsons, the Horites of Seir, and the kings of Edom who reigned before Israel had one.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-36-explained",
    publishedAt: "2026-09-24",
    readTime: "14 min read",
    image: "/blog-banners/genesis-36-explained.jpg",
    groupPost: {
      title: "Genesis 36 Explained 📖",
      content:
        "Esau lost the birthright and the blessing.\nGenesis still gives him a whole chapter.\n\n📌 A hard blessing from Isaac comes true here, kings and all.\n\n📖 Both brothers grow too wealthy to share the same land.\n📖 His family marries into the Horites already living there.\n📖 Edom gets eight kings before Israel ever crowns one.\n\nNew article on:\n🟢 why the name **Korah** shows up twice in one list\n🟢 the one clause that births **Amalek**\n🟢 what Esau's wives' different names actually mean\n\nHave you ever felt passed over, still wondering God was not done with you? 🙏",
    },
  },
  {
    slug: "genesis-35-explained",
    title: "Genesis 35 Explained: Bethel, Rachel's Death, and Israel's Twelve Sons",
    description:
      "Genesis 35 explained verse by verse: Jacob's return to Bethel, the household's hidden idols, Rachel's death giving birth to Benjamin, and Reuben's sin.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-35-explained",
    publishedAt: "2026-09-24",
    readTime: "13 min read",
    image: "/blog-banners/genesis-35-explained.jpg",
    groupPost: {
      title: "Genesis 35 Explained 📖",
      content:
        "Jacob's sons just wiped out a city.\nGod's answer is one word: go back to Bethel.\n\n📌 Jacob finally finishes a vow he made twenty years earlier.\n\n📖 The household buries its hidden idols before the altar.\n📖 Rachel dies giving birth to Benjamin on the road.\n📖 Esau and Jacob bury their father Isaac together.\n\nNew article on:\n🟢 why God renames Jacob **Israel** a second time\n🟢 what Reuben's sin actually cost him\n🟢 the son Jacob renamed with his own words\n\nHave you ever had to finish a promise you had put off for years? 🙏",
    },
  },
  {
    slug: "genesis-34-explained",
    title: "Genesis 34 Explained: Dinah, Shechem, and the Massacre",
    description:
      "Genesis 34 explained verse by verse: Shechem's assault of Dinah, Jacob's silence, the deceitful demand for circumcision, and the massacre by Simeon and Levi.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-34-explained",
    publishedAt: "2026-09-24",
    readTime: "14 min read",
    image: "/blog-banners/genesis-34-explained.jpg",
    groupPost: {
      title: "Genesis 34 Explained 📖",
      content:
        "Dinah goes out to visit some local girls.\nBy the end of the chapter, a whole city is dead.\n\n📌 The brothers' peace deal was a trap from the very first word.\n\n📖 Shechem assaults Dinah, then asks his father to get her as a wife.\n📖 Jacob's sons demand every man in the city be circumcised.\n📖 Simeon and Levi kill them all on the third day.\n\nNew article on:\n🟢 why Genesis calls the brothers' plan **deceitful**\n🟢 what Jacob's silence actually says\n🟢 Jacob's real verdict on the massacre, given **decades later**\n\nHave you seen real pain answered with something that made it worse? 🙏",
    },
  },
  {
    slug: "genesis-33-explained",
    title: "Genesis 33 Explained: Jacob and Esau Meet Again",
    description:
      "Genesis 33 explained verse by verse: Jacob and Esau's reunion after twenty years, Esau's forgiveness, and why Jacob settles in Shechem instead of returning to Bethel.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-33-explained",
    publishedAt: "2026-09-23",
    readTime: "13 min read",
    image: "/blog-banners/genesis-33-explained.jpg",
    groupPost: {
      title: "Genesis 33 Explained 📖",
      content:
        "Jacob spent all night bracing to meet the brother who once wanted him dead.\nThen Esau just runs to him and weeps.\n\n📌 The fear that filled the last chapter is gone before Jacob says a word.\n\n📖 Jacob bows to the ground seven times before Esau ever reaches him.\n📖 Esau tries twice to refuse the gift Jacob sends ahead.\n📖 Jacob settles in Shechem instead of finishing the journey home.\n\nNew article on:\n🟢 why Jacob compares Esau's face to the **face of God**\n🟢 what **El-elohe-Israel** means\n🟢 the vow Jacob still had not kept\n\nHave you ever braced for a hard conversation that went nothing like you feared? 🙏",
    },
  },
  {
    slug: "genesis-32-explained",
    title: "Genesis 32 Explained: Jacob Wrestles with God at Peniel",
    description:
      "Genesis 32 explained verse by verse: Jacob's prayer before meeting Esau, the gift sent ahead in waves, and the night he wrestles a man at the Jabbok and is renamed Israel.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-32-explained",
    publishedAt: "2026-09-23",
    readTime: "16 min read",
    image: "/blog-banners/genesis-32-explained.jpg",
    groupPost: {
      title: "Genesis 32 Explained 📖",
      content:
        "Jacob is finally free of Laban.\nThen he hears his brother is coming with four hundred men.\n\n📌 Before Jacob faces Esau, a stranger wrestles him all night at a river.\n\n📖 Jacob prays and sends a fortune ahead of him in careful waves.\n📖 He wrestles a man until daybreak and will not let go.\n📖 He walks away with a new name, Israel, and a permanent limp.\n\nNew article on:\n🟢 who Jacob was really **wrestling** with\n🟢 what the name **Israel** actually means\n🟢 why the **blessing** came with an injury\n\nHave you ever had to face someone you wronged, with nowhere left to hide? 🙏",
    },
  },
  {
    slug: "genesis-31-explained",
    title: "Genesis 31 Explained: Jacob Flees Laban and Makes a Covenant",
    description:
      "Genesis 31 explained verse by verse: God calls Jacob home, Rachel steals Laban's household gods, Laban's pursuit, and the covenant at Galeed and Mizpah.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-31-explained",
    publishedAt: "2026-09-23",
    readTime: "14 min read",
    image: "/blog-banners/genesis-31-explained.jpg",
    groupPost: {
      title: "Genesis 31 Explained 📖",
      content:
        "Twenty years of service, and Jacob finally slips away while his uncle is three days off shearing sheep.\nThen his own wife steals something on the way out.\n\n📌 An angel already told Jacob in a dream that the flock trick was never his doing.\n\n📖 God tells Jacob it is time to go home.\n📖 Rachel steals her father's household gods and lies about it to his face.\n📖 Two men who no longer trust each other build a boundary of stones between them.\n\nNew article on:\n🟢 what the **household gods** actually were\n🟢 the truth behind the famous **Mizpah** blessing\n🟢 why Jacob's **twenty years** finally come out at once\n\nHave you ever finally worked up the nerve to leave something that used you for years? 🙏",
    },
  },
  {
    slug: "genesis-30-explained",
    title: "Genesis 30 Explained: Rachel, Leah, and Jacob's Growing Flocks",
    description:
      "Genesis 30 explained verse by verse: Rachel and Leah bargain through their maids, the mandrakes trade, Joseph's birth, and Jacob's deal with Laban's flocks.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-30-explained",
    publishedAt: "2026-09-23",
    readTime: "15 min read",
    image: "/blog-banners/genesis-30-explained.jpg",
    groupPost: {
      title: "Genesis 30 Explained 📖",
      content:
        "Two sisters at war, and both hand over their own servants to win.\nOne plant becomes the strangest bargain in Genesis.\n\n📌 Rachel finally gets a son, years after her sister's first four.\n\n📖 Rachel and Leah both give their maids to Jacob for more sons.\n📖 A trade over mandrakes decides who sleeps with Jacob that night.\n📖 Jacob grows rich off Laban's own speckled flocks.\n\nNew article on:\n🟢 what **mandrakes** actually were\n🟢 why these **names** still matter today\n🟢 the trick with the **rods** and what really caused it\n\nHave you ever waited years for something while someone else seemed to get it easy? 🙏",
    },
  },
  {
    slug: "genesis-29-explained",
    title: "Genesis 29 Explained: Jacob Meets Rachel and Is Deceived by Laban",
    description:
      "Genesis 29 explained verse by verse: Jacob meets Rachel at the well, Laban's wedding night deception, and the birth of Leah's first four sons.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-29-explained",
    publishedAt: "2026-09-23",
    readTime: "15 min read",
    image: "/blog-banners/genesis-29-explained.jpg",
    groupPost: {
      title: "Genesis 29 Explained 📖",
      content:
        "A man who tricked his blind father just got tricked himself.\nOn his own wedding night.\n\n📌 Jacob works seven years, then wakes up married to the wrong sister.\n\n📖 He meets Rachel at a well and rolls the stone alone.\n📖 Laban swaps Leah in under cover of darkness.\n📖 Leah names her fourth son pure praise, no bargaining.\n\nNew article on:\n🟢 why Jacob's **wedding night** goes wrong\n🟢 what **tender eyed** actually means\n🟢 how this chapter leads straight to **Jesus**\n\nHave you ever gotten back the exact thing you once gave out? 🙏",
    },
  },
  {
    slug: "genesis-28-explained",
    title: "Genesis 28 Explained: Jacob's Ladder and the Vow at Bethel",
    description:
      "Genesis 28 explained verse by verse: Isaac's blessing, Jacob's dream of a ladder to heaven, God renewing the covenant, and the vow he makes at Bethel.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-28-explained",
    publishedAt: "2026-09-22",
    readTime: "16 min read",
    image: "/blog-banners/genesis-28-explained.jpg",
    groupPost: {
      title: "Genesis 28 Explained 📖",
      content:
        "A runaway with a rock for a pillow.\nThis is who God chooses to speak to first.\n\n📌 Jacob had done nothing yet to earn what happens next.\n\n📖 He dreams of a ladder reaching to heaven.\n📖 Angels are already moving on it, before he wakes.\n📖 God renews the whole covenant right there.\n\nNew article on:\n🟢 what Jacob's **ladder** actually was\n🟢 why he named the place **Bethel**\n🟢 the **vow** Jacob makes before taking one step\n\nHas God ever met you in a season that felt empty? 🙏",
    },
  },
  {
    slug: "genesis-27-explained",
    title: "Genesis 27 Explained: Jacob Steals Esau's Blessing",
    description:
      "Genesis 27 explained verse by verse: Isaac's plan to bless Esau, Rebekah and Jacob's deception, Esau's bitter cry, and the lesser blessing Isaac still gives him.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-27-explained",
    publishedAt: "2026-09-22",
    readTime: "17 min read",
    image: "/blog-banners/genesis-27-explained.jpg",
    groupPost: {
      title: "Genesis 27 Explained 📖",
      content:
        "A blind father is tricked into blessing the wrong son.\nHis own mother helped plan it.\n\n📌 God already promised this outcome. The lie was never needed.\n\n📖 Jacob disguises himself as his own brother.\n📖 Esau lets out a bitter cry when he finds out.\n📖 Isaac still won't take the blessing back.\n\nNew article on:\n🟢 the **goat skins** that fooled a blind man\n🟢 why Isaac says **he shall be blessed** anyway\n🟢 the different blessing Esau **still** receives\n\nHave you ever tried to force something God already promised? 🙏",
    },
  },
  {
    slug: "genesis-26-explained",
    title: "Genesis 26 Explained: Isaac's Famine, a Repeated Lie, and Three Wells",
    description:
      "Genesis 26 explained verse by verse: God's covenant renewed to Isaac, his repeated lie about Rebekah, the wells named Esek, Sitnah, and Rehoboth, and the peace treaty at Beersheba.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-26-explained",
    publishedAt: "2026-09-22",
    readTime: "15 min read",
    image: "/blog-banners/genesis-26-explained.jpg",
    groupPost: {
      title: "Genesis 26 Explained 📖",
      content:
        "Isaac tells the exact same lie his father told, twice.\nIn the same city, to the same kind of king.\n\n📌 God still renews His whole covenant with Isaac anyway.\n\n📖 Isaac digs two wells and gives both of them up.\n📖 The third well finally goes uncontested.\n📖 A former enemy shows up asking for peace.\n\nNew article on:\n🟢 the wells named **Contention**, **Hostility**, and **Room**\n🟢 why God says **fear not** right when Isaac needs it\n🟢 the peace treaty made at Beersheba\n\nWhat old family fear keeps showing up in your own life? 🙏",
    },
  },
  {
    slug: "genesis-25-explained",
    title: "Genesis 25 Explained: Abraham's Death and Esau's Traded Birthright",
    description:
      "Genesis 25 explained verse by verse: Abraham's death and burial, Ishmael's line fulfilled, the birth of Esau and Jacob, and the birthright Esau traded away for a bowl of stew.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-25-explained",
    publishedAt: "2026-09-22",
    readTime: "16 min read",
    image: "/blog-banners/genesis-25-explained.jpg",
    groupPost: {
      title: "Genesis 25 Explained 📖",
      content:
        "Abraham dies in one calm verse.\nA few verses later, his grandson trades away his future for soup.\n\n📌 God tells Rebekah the outcome before her twins are even born.\n\n📖 Isaac and Ishmael bury their father together.\n📖 Esau calls himself \"at the point to die\" over a bowl of stew.\n📖 Jacob makes him swear an oath before he'll even feed him.\n\nNew article on:\n🟢 the **birthright** Esau gave away in thirty seconds\n🟢 why **Ishmael's** promise gets kept in full\n🟢 the prayer that finally breaks Rebekah's barrenness\n\nWhat have you traded away when you were just tired and hungry? 🙏",
    },
  },
  {
    slug: "genesis-24-explained",
    title: "Genesis 24 Explained: The Servant's Prayer and Rebekah at the Well",
    description:
      "Genesis 24 explained verse by verse: Abraham's servant sent to find Isaac a wife, his prayer at the well, Rebekah's answer, and the journey that ends in the field where Isaac meets her.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-24-explained",
    publishedAt: "2026-09-22",
    readTime: "13 min read",
    image: "/blog-banners/genesis-24-explained.jpg",
    groupPost: {
      title: "Genesis 24 Explained 📖",
      content:
        "Abraham sends a servant a thousand miles to find his son a wife.\nHe never even tells him her name.\n\n📌 The servant prays for a sign, and God answers before he even finishes.\n\n📖 Rebekah waters ten camels by hand without being asked.\n📖 The servant worships right there at the well.\n📖 Rebekah's family says one line settles it all.\n\nNew article on:\n🟢 the **prayer** that gets answered mid sentence\n🟢 why **Rebekah** still gets asked for her own answer\n🟢 how Isaac meets his wife in a quiet field\n\nHave you ever prayed for a sign this specific? 🙏",
    },
  },
  {
    slug: "genesis-23-explained",
    title: "Genesis 23 Explained: Sarah's Death and the Cave of Machpelah",
    description:
      "Genesis 23 explained verse by verse: Sarah's death at Hebron, Abraham's negotiation with the Hittites, the price named for the cave of Machpelah, and Sarah's burial.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-23-explained",
    publishedAt: "2026-09-21",
    readTime: "13 min read",
    image: "/blog-banners/genesis-23-explained.jpg",
    groupPost: {
      title: "Genesis 23 Explained 📖",
      content:
        "Sarah dies, and Abraham owns nothing to bury her in.\nThe man God promised a whole country has to buy a grave.\n\n📌 Abraham refuses free land twice and insists on paying in full.\n\n📖 The Hittites offer any tomb in the area at no cost.\n📖 Ephron names a steep price dressed up as small.\n📖 Abraham weighs out four hundred shekels of silver in public.\n\nNew article on:\n🟢 why Abraham calls himself a **stranger and a sojourner**\n🟢 what the **cave of Machpelah** becomes for his family\n🟢 how this ties to **Acts 7:5** and Abraham's real inheritance\n\nHave you ever had to take one small step toward a promise you have not fully received yet? 🙏",
    },
  },
  {
    slug: "genesis-22-explained",
    title: "Genesis 22 Explained: The Binding of Isaac",
    description:
      "Genesis 22 explained verse by verse: God's test of Abraham, the three day walk to Moriah, Isaac's question, the ram provided in his place, and the covenant oath that follows.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-22-explained",
    publishedAt: "2026-09-21",
    readTime: "14 min read",
    image: "/blog-banners/genesis-22-explained.jpg",
    groupPost: {
      title: "Genesis 22 Explained 📖",
      content:
        "God asks Abraham for the son every promise ran through.\nNo explanation comes with the command.\n\n📌 Abraham raises the knife before God raises His voice to stop him.\n\n📖 Isaac asks his father where the lamb is, on the way up.\n📖 A ram is caught in a thicket at the exact moment it is needed.\n📖 God swears an oath on His own name over Abraham's obedience.\n\nNew article on:\n🟢 what **Jehovahjireh** actually means\n🟢 how old Isaac really was on that mountain\n🟢 how this chapter points straight at **the Lamb of God**\n\nWhat is the one thing you would struggle to hand back to God? 🙏",
    },
  },
  {
    slug: "genesis-21-explained",
    title: "Genesis 21 Explained: Isaac's Birth and Hagar Sent Away",
    description:
      "Genesis 21 explained verse by verse: Isaac's long promised birth, Sarah's demand to cast out Hagar and Ishmael, God's provision in the wilderness, and Abraham's covenant with Abimelech.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-21-explained",
    publishedAt: "2026-09-21",
    readTime: "12 min read",
    image: "/blog-banners/genesis-21-explained.jpg",
    groupPost: {
      title: "Genesis 21 Explained 📖",
      content:
        "Isaac is finally born, twenty five years after the promise.\nThe same chapter sends another son into the wilderness.\n\n📌 God hears Ishmael's voice the moment Hagar runs out of water.\n\n📖 Sarah demands Hagar and Ishmael be sent away.\n📖 God provides a well in the desert just in time.\n📖 Abraham makes a peace covenant with Abimelech at Beersheba.\n\nNew article on:\n🟢 what Ishmael's **mocking** actually means\n🟢 why God tells Abraham to **listen to Sarah**\n🟢 how Paul uses this story in **Galatians 4**\n\nHave you ever watched someone else's answered prayer land right beside your own pain? 🙏",
    },
  },
  {
    slug: "genesis-20-explained",
    title: "Genesis 20 Explained: Abraham's Second Lie About Sarah",
    description:
      "Genesis 20 explained verse by verse: Abraham lies about Sarah again, Abimelech's dream warning, the price of the lie, and the prayer that heals his household.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-20-explained",
    publishedAt: "2026-09-21",
    readTime: "11 min read",
    image: "/blog-banners/genesis-20-explained.jpg",
    groupPost: {
      title: "Genesis 20 Explained 📖",
      content:
        "Abraham already tried this lie once in Egypt.\nHere he tries it again on a new king.\n\n📌 God warned the king in a dream before any sin happened.\n\n📖 Abraham says Sarah is his sister, again.\n📖 Abimelech takes her, not knowing she is married.\n📖 Abraham's own prayer heals the household his fear harmed.\n\nNew article on:\n🟢 why Abraham repeats his **oldest fear**\n🟢 what **a covering of the eyes** means\n🟢 why he is called a **prophet** in this chapter\n\nHave you ever repeated a fear you thought you had already outgrown? 🙏",
    },
  },
  {
    slug: "genesis-19-explained",
    title: "Genesis 19 Explained: Sodom's Destruction and Lot's Escape",
    description:
      "Genesis 19 explained verse by verse: the mob at Lot's door, the angels who pull him out, the fire on Sodom, his wife's pillar of salt, and the cave above Zoar.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-19-explained",
    publishedAt: "2026-09-21",
    readTime: "14 min read",
    image: "/blog-banners/genesis-19-explained.jpg",
    groupPost: {
      title: "Genesis 19 Explained 📖",
      content:
        "Two angels walk into Sodom at evening.\nBy morning the whole city is gone.\n\n📌 Mercy pulled Lot out while he was still lingering.\n\n📖 A mob surrounds Lot's house demanding his guests.\n📖 Fire falls the same day Lot reaches safety.\n📖 His wife looks back once, and that is enough.\n\nNew article on:\n🟢 what **Sodom's sin** actually was\n🟢 why Lot's **wife looked back**\n🟢 what happened to Abraham's **ten righteous people**\n\nHave you ever lingered somewhere mercy was already pulling you away from? 🙏",
    },
  },
  {
    slug: "genesis-18-explained",
    title: "Genesis 18 Explained: Sarah's Laugh and the Bargain for Sodom",
    description:
      "Genesis 18 explained verse by verse: the LORD visits Abraham, promises Isaac by name, Sarah's laugh gets caught, and Abraham bargains for Sodom's righteous.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-18-explained",
    publishedAt: "2026-09-20",
    readTime: "14 min read",
    image: "/blog-banners/genesis-18-explained.jpg",
    groupPost: {
      title: "Genesis 18 Explained 📖",
      content:
        "Three strangers show up at Abraham's tent.\nOne of them already knows his wife's name.\n\n📌 Nothing is too hard for the LORD.\n\n📖 Sarah laughs at the promise, quietly, alone.\n📖 God repeats her private thought back to her.\n📖 Abraham bargains God down from fifty to ten.\n\nNew article on:\n🟢 who the **three visitors** really were\n🟢 why God caught **Sarah's laugh** but not Abraham's\n🟢 how Abraham's **bold prayer** for Sodom actually worked\n\nHave you ever laughed quietly at a promise that felt impossible? 🙏",
    },
  },
  {
    slug: "genesis-17-explained",
    title: "Genesis 17 Explained: A New Name and the Sign of Circumcision",
    description:
      "Genesis 17 explained verse by verse: Abram becomes Abraham, Sarai becomes Sarah, God gives circumcision as the covenant sign, and Isaac is promised by name.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-17-explained",
    publishedAt: "2026-09-20",
    readTime: "15 min read",
    image: "/blog-banners/genesis-17-explained.jpg",
    groupPost: {
      title: "Genesis 17 Explained 📖",
      content:
        "Thirteen years of silence.\nThen God shows up and changes his name.\n\n📌 God can rename you before the promise looks true.\n\n📖 Abram becomes Abraham, Sarai becomes Sarah.\n📖 Circumcision becomes the sign of the covenant.\n📖 Abraham laughs, and God names the son after it.\n\nNew article on:\n🟢 why God chose **circumcision** as the sign\n🟢 why Abraham **laughed** at God's own promise\n🟢 what happens to **Ishmael** once Isaac is named\n\nHave you ever doubted a promise right before obeying it anyway? 🙏",
    },
  },
  {
    slug: "genesis-16-explained",
    title: "Genesis 16 Explained: Hagar, Ishmael, and the God Who Sees",
    description:
      "Genesis 16 explained verse by verse: Sarai's plan with Hagar, Ishmael's birth, and the angel of the LORD who tells a fleeing servant that God sees her.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-16-explained",
    publishedAt: "2026-09-20",
    readTime: "15 min read",
    image: "/blog-banners/genesis-16-explained.jpg",
    groupPost: {
      title: "Genesis 16 Explained 📖",
      content:
        "Ten years of waiting, and still no son.\nSo Sarai builds her own shortcut.\n\n📌 God still sees the one everyone else overlooked.\n\n📖 Hagar flees into the wilderness alone.\n📖 The angel of the LORD finds her by a well.\n📖 She becomes the first person in the Bible to name God.\n\nNew article on:\n🟢 why Sarai's **plan** cost more than it solved\n🟢 who the **angel of the LORD** actually is\n🟢 what **Thou God seest me** really means\n\nHave you ever felt forgotten in the middle of someone else's story? 🙏",
    },
  },
  {
    slug: "genesis-15-explained",
    title: "Genesis 15 Explained: The Covenant God Cuts Alone",
    description:
      "Genesis 15 explained verse by verse: Abram's honest doubt, faith counted as righteousness, the 400 year prophecy, and the covenant of the pieces.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-15-explained",
    publishedAt: "2026-09-20",
    readTime: "14 min read",
    image: "/blog-banners/genesis-15-explained.jpg",
    groupPost: {
      title: "Genesis 15 Explained 📖",
      content:
        "Abram just turned down a fortune.\nThen God asks him to trust for something bigger.\n\n📌 Believing God is what He counts as righteousness.\n\n📖 Abram tells God he still has no son.\n📖 God promises stars too many to count.\n📖 God alone walks through the covenant, Abram sleeps through it.\n\nNew article on:\n🟢 what **counted for righteousness** really means\n🟢 the strange ceremony behind the **covenant of the pieces**\n🟢 why God let Abram **sleep** through his own covenant\n\nWhat part of Abram's honesty with God stood out to you? 🙏",
    },
  },
  {
    slug: "genesis-14-explained",
    title: "Genesis 14 Explained: The War of the Kings and Melchizedek",
    description:
      "Genesis 14 explained verse by verse: the war of four kings against five, Abram's rescue of Lot, and the meeting with Melchizedek.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-14-explained",
    publishedAt: "2026-09-20",
    readTime: "14 min read",
    image: "/blog-banners/genesis-14-explained.jpg",
    groupPost: {
      title: "Genesis 14 Explained 📖",
      content:
        "Four kings against five. A nephew taken captive.\nAbram becomes a soldier overnight.\n\n📌 A blessing worth having is not one you let someone else take credit for.\n\n📖 Abram rescues Lot with 318 men born in his own house.\n📖 A mysterious priest named Melchizedek blesses him.\n📖 Abram refuses a reward from the king of Sodom.\n\nNew article on:\n🟢 who **Melchizedek** really was\n🟢 why Abram gave him a **tithe**\n🟢 why Abram turned down the **king of Sodom**\n\nWhat part of Abram's rescue of Lot stood out to you? 🙏",
    },
  },
  {
    slug: "bible-in-one-year-day-4-study-notes",
    title: "Bible in One Year Day 4 Study Notes: Genesis 8-10",
    description:
      "Bible in One Year Day 4 Study Notes: a full walkthrough of Genesis 8-10, the flood receding, Noah's altar, the rainbow covenant, and the table of nations.",
    category: "Bible in One Year",
    categorySlug: "bible-in-one-year",
    canonicalPath: "/blog/bible-in-one-year-day-4-study-notes",
    publishedAt: "2026-09-20",
    readTime: "14 min read",
    image: "/blog-banners/bible-in-one-year-day-4-study-notes.jpg",
    bibleYearDay: 4,
    bibleYearReading: "Genesis 8-10",
    excludeFromGroupShare: true,
  },
  {
    slug: "bible-in-one-year-day-3-study-notes",
    title: "Bible in One Year Day 3 Study Notes: Genesis 5-7",
    description:
      "Bible in One Year Day 3 Study Notes: a full walkthrough of Genesis 5-7, the generations before the flood, Noah building the ark, and the flood beginning.",
    category: "Bible in One Year",
    categorySlug: "bible-in-one-year",
    canonicalPath: "/blog/bible-in-one-year-day-3-study-notes",
    publishedAt: "2026-09-19",
    readTime: "13 min read",
    image: "/blog-banners/bible-in-one-year-day-3-study-notes.jpg",
    bibleYearDay: 3,
    bibleYearReading: "Genesis 5-7",
    excludeFromGroupShare: true,
  },
  {
    slug: "bible-in-one-year-day-2-study-notes",
    title: "Bible in One Year Day 2 Study Notes: Genesis 3-4",
    description:
      "Bible in One Year Day 2 Study Notes: a full walkthrough of Genesis 3-4, the fall of man, the first promise of a Savior, and the first murder.",
    category: "Bible in One Year",
    categorySlug: "bible-in-one-year",
    canonicalPath: "/blog/bible-in-one-year-day-2-study-notes",
    publishedAt: "2026-09-19",
    readTime: "13 min read",
    image: "/blog-banners/bible-in-one-year-day-2-study-notes.jpg",
    bibleYearDay: 2,
    bibleYearReading: "Genesis 3-4",
    excludeFromGroupShare: true,
  },
  {
    slug: "bible-in-one-year-day-1-study-notes",
    title: "Bible in One Year Day 1 Study Notes: Genesis 1-2",
    description:
      "Bible in One Year Day 1 Study Notes: a full walkthrough of Genesis 1-2, creation, being made in God's image, the first rest, and the garden of Eden.",
    category: "Bible in One Year",
    categorySlug: "bible-in-one-year",
    canonicalPath: "/blog/bible-in-one-year-day-1-study-notes",
    publishedAt: "2026-09-19",
    readTime: "16 min read",
    image: "/blog-banners/bible-in-one-year-day-1-study-notes.jpg",
    bibleYearDay: 1,
    bibleYearReading: "Genesis 1-2",
    // Test article for the new Study Notes series, held for Louis's review
    // (see docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md). Remove this flag
    // once he approves Day 1.
    excludeFromGroupShare: true,
  },
  {
    slug: "genesis-13-explained",
    title: "Genesis 13 Explained: Abram, Lot, and the Land Promise Renewed",
    description:
      "Genesis 13 explained verse by verse: Abram and Lot separate, Lot chooses Sodom, and God renews His land promise to Abram at Hebron.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-13-explained",
    publishedAt: "2026-09-19",
    readTime: "14 min read",
    image: "/blog-banners/genesis-13-explained.jpg",
    groupPost: {
      title: "Genesis 13 Explained 📖",
      content:
        "Too much wealth. Not enough land.\nAbram and Lot have to split up.\n\n📌 Giving up your first pick is not the same as losing.\n\n📖 Abram lets Lot choose the land first.\n📖 Lot picks the plain toward Sodom by sight.\n📖 God renews the promise the moment Abram has less.\n\nNew article on:\n🟢 why Abram gave **Lot** the first choice\n🟢 what Lot's choice of **Sodom** really cost him\n🟢 how God's promise grew once Abram had less\n\nWhat part of Abram and Lot's split stood out to you? 🙏",
    },
  },
  {
    slug: "genesis-12-explained",
    title: "Genesis 12 Explained: The Call of Abram and the Promise That Changes Everything",
    description:
      "Genesis 12 explained verse by verse: God's call to Abram, the Abrahamic covenant, and the famine in Egypt that nearly cost him his wife.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-12-explained",
    publishedAt: "2026-09-19",
    readTime: "13 min read",
    image: "/blog-banners/genesis-12-explained.jpg",
    groupPost: {
      title: "Genesis 12 Explained 📖",
      content:
        "One man. One command. One promise big enough for the whole world.\nGod calls Abram, and everything narrows to this one family.\n\n📌 The promise never depended on Abram getting it right.\n\n📖 God calls a 75 year old man to leave everything he knows.\n📖 Abram builds altars in a land he does not yet own.\n📖 Fear leads him to a half truth that nearly costs him Sarai.\n\nNew article on:\n🟢 what the **Abrahamic covenant** actually promises\n🟢 why Abram lied about **Sarai** being his sister\n🟢 how this chapter points forward to **Jesus**\n\nWhat part of Abram's story stood out to you? 🙏",
    },
  },
  {
    slug: "genesis-11-explained",
    title: "Genesis 11 Explained: The Tower of Babel and the Road to Abram",
    description:
      "Genesis 11 explained verse by verse: the Tower of Babel, why God confused the languages, and the ten generations from Shem to Abram.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-11-explained",
    publishedAt: "2026-09-19",
    readTime: "14 min read",
    image: "/blog-banners/genesis-11-explained.jpg",
    groupPost: {
      title: "Genesis 11 Explained 📖",
      content:
        "One language. One tower. One act of pride.\nThis chapter ends the story of one united humanity.\n\n📌 Unity is not the same thing as being right.\n\n📖 The builders wanted a name for themselves.\n📖 God confused their language and scattered them.\n📖 Ten generations later, the chapter ends on Abram.\n\nNew article on:\n🟢 what the **Tower of Babel** was really about\n🟢 why the name **Babel** means confusion\n🟢 how this chapter sets up **Abram's** call\n\nWhat part of the Babel story stood out to you? 🙏",
    },
  },
  {
    slug: "genesis-10-explained",
    title: "Genesis 10 Explained: The Table of Nations After the Flood",
    description:
      "Genesis 10 explained verse by verse: the sons of Noah, Nimrod's kingdom of Babel, the Table of Nations, and how it sets up the Tower of Babel.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-10-explained",
    publishedAt: "2026-09-18",
    readTime: "12 min read",
    image: "/blog-banners/genesis-10-explained.jpg",
    groupPost: {
      title: "Genesis 10 Explained 📖",
      content:
        "Genesis 10 looks like a list of names.\nIt is actually a map of every nation on earth.\n\n📌 Every nation traces back to one family, Noah's.\n\n📖 Nimrod builds the kingdom of Babel.\n📖 Canaan's descendants are the nations Israel later faces.\n📖 One line quietly gets set apart, leading to Abraham.\n\nNew article on:\n🟢 who **Nimrod** really was\n🟢 where the **Philistines** actually came from\n🟢 how this chapter sets up the **Tower of Babel**\n\nWhich nation's backstory surprised you most? 🙏",
    },
  },
  {
    slug: "genesis-9-explained",
    title: "Genesis 9 Explained: The Rainbow Covenant and the Curse of Canaan",
    description:
      "Genesis 9 explained verse by verse: the new permission to eat meat, why human life carries weight, the rainbow covenant, and the curse of Canaan.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-9-explained",
    publishedAt: "2026-09-18",
    readTime: "13 min read",
    image: "/blog-banners/genesis-9-explained.jpg",
    groupPost: {
      title: "Genesis 9 Explained 📖",
      content:
        "Noah survived the flood.\nThis chapter shows he did not survive being human.\n\n📌 Human life carries weight because it is made in God's image.\n\n📖 God allows meat for the first time, with one limit on blood.\n📖 The rainbow becomes a sign of an everlasting covenant.\n📖 A family scene ends in a curse that still gets misused today.\n\nNew article on:\n🟢 why **eating meat** was new after the flood\n🟢 what the **rainbow covenant** actually promises\n🟢 the truth behind the **curse of Canaan**\n\nWhat part of Noah's story after the flood surprised you? 🙏",
    },
  },
  {
    slug: "genesis-8-explained",
    title: "Genesis 8 Explained: The Flood Ends and Noah Leaves the Ark",
    description:
      "Genesis 8 explained verse by verse: the raven and dove, dry ground after the flood, and God's promise that seedtime and harvest will never cease.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-8-explained",
    publishedAt: "2026-09-18",
    readTime: "12 min read",
    image: "/blog-banners/genesis-8-explained.jpg",
    groupPost: {
      title: "Genesis 8 Explained 📖",
      content:
        "The rain stopped. The waiting did not.\nNoah still has months to go.\n\n📌 God remembered Noah before the water ever moved.\n\n📖 A raven never comes back, a dove finally does.\n📖 Noah sees dry ground, then waits two more months.\n📖 God promises seedtime and harvest will never cease.\n\nNew article on:\n🟢 why the **raven and dove** got different jobs\n🟢 why Noah waited for a **word from God** to leave\n🟢 the very first **altar** in the whole Bible\n\nWhat part of Noah's long wait stands out to you? 🙏",
    },
  },
  {
    slug: "genesis-7-explained",
    title: "Genesis 7 Explained: The Flood Begins and the Ark Door Shuts",
    description:
      "Genesis 7 explained verse by verse: Noah boards the ark, the LORD shuts the door, and the flood covers the earth for forty days and 150 more.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-7-explained",
    publishedAt: "2026-09-18",
    readTime: "11 min read",
    image: "/blog-banners/genesis-7-explained.jpg",
    groupPost: {
      title: "Genesis 7 Explained 📖",
      content:
        "The ark door finally shuts in this chapter.\nNo one outside gets back in.\n\n📌 God shuts the door Himself, not Noah.\n\n📖 Sevens of clean animals, only two of unclean.\n📖 Forty days of rain, then 150 days of water.\n📖 Only eight people survive the whole flood.\n\nNew article on:\n🟢 why God asked for **sevens** of some animals\n🟢 what it means that the **LORD shut the door**\n🟢 how many people actually **survived the flood**\n\nWhich detail in this chapter surprised you most? 🙏",
    },
  },
  {
    slug: "genesis-6-explained",
    title: "Genesis 6 Explained: Wickedness, Noah, and the Ark",
    description:
      "Genesis 6 explained verse by verse: the sons of God, the Nephilim, God's grief over human wickedness, and the grace that saved Noah before the flood.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-6-explained",
    publishedAt: "2026-09-17",
    readTime: "14 min read",
    image: "/blog-banners/genesis-6-explained.jpg",
    groupPost: {
      title: "Genesis 6 Explained 📖",
      content:
        "The world goes fully dark in this chapter.\nOne family stays right side up.\n\n📌 Grace shows up before the flood does, not after.\n\n📖 Every thought of man's heart was only evil, continually.\n📖 Noah walked with God, the same words used for Enoch.\n📖 God gives Noah exact blueprints for the ark.\n\nNew article on:\n🟢 who the mysterious **sons of God** actually were\n🟢 why God says He **regretted** making mankind\n🟢 the **covenant** God made before a drop of rain fell\n\nWhat stands out most to you about Noah's obedience? 🙏",
    },
  },
  {
    slug: "genesis-5-explained",
    title: "Genesis 5 Explained: The Genealogy From Adam to Noah",
    description:
      "Genesis 5 explained verse by verse: the genealogy from Adam to Noah, the repeated word 'and he died,' and the one man, Enoch, who never dies at all.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-5-explained",
    publishedAt: "2026-09-17",
    readTime: "11 min read",
    image: "/blog-banners/genesis-5-explained.jpg",
    groupPost: {
      title: "Genesis 5 Explained 📖",
      content:
        "Ten names. Ten lifespans. Nine deaths.\nOne name breaks the pattern completely.\n\n📌 Enoch walked with God, and he never died at all.\n\n📖 The same word closes name after name: \"and he died.\"\n📖 Methuselah lived longer than anyone else in Scripture.\n📖 A tired father named his son Noah, hoping for comfort.\n\nNew article on:\n🟢 why the whole chapter repeats **\"and he died\"**\n🟢 what it means that **Enoch walked with God**\n🟢 the striking math behind **Methuselah's death and the flood**\n\nWhich name in this genealogy surprised you most? 🙏",
    },
  },
  {
    slug: "genesis-4-explained",
    title: "Genesis 4 Explained: Cain, Abel, and the First Murder",
    description:
      "Genesis 4 explained verse by verse: the two offerings, God's warning at the door, the first murder, and the surprising mercy shown to Cain afterward.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-4-explained",
    publishedAt: "2026-09-17",
    readTime: "15 min read",
    image: "/blog-banners/genesis-4-explained.jpg",
    groupPost: {
      title: "Genesis 4 Explained 📖",
      content:
        "Two brothers. Two offerings. One walks away furious.\nIt ends in the first murder in history.\n\n📌 God warns Cain by name before anything happens.\n\n📖 Sin is pictured as an animal crouching at the door.\n📖 \"Am I my brother's keeper\" is the oldest excuse in the book.\n📖 God protects Cain from revenge even after the murder.\n\nNew article on:\n🟢 why God accepted **Abel's offering** and not Cain's\n🟢 what the **mark of Cain** actually was for\n🟢 how **Seth's line** answers Cain's violence\n\nHave you ever felt what Cain felt before he acted on it? 🙏",
    },
  },
  {
    slug: "genesis-3-explained",
    title: "Genesis 3 Explained: The Fall of Man and the First Promise of a Savior",
    description:
      "Genesis 3 explained verse by verse: the serpent's temptation, the first sin, the curses, and the first promise of a Savior hidden inside them.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-3-explained",
    publishedAt: "2026-09-17",
    readTime: "15 min read",
    image: "/blog-banners/genesis-3-explained.jpg",
    groupPost: {
      title: "Genesis 3 Explained 📖",
      content:
        "One conversation. One bite. Paradise ends.\nBut the chapter does not end in despair.\n\n📌 God promises a Rescuer the same day sin enters the world.\n\n📖 The serpent's first move was a question, not a lie.\n📖 Adam stood right there and said nothing.\n📖 God made the first sacrifice Himself, to cover their shame.\n\nNew article on:\n🟢 the real meaning of the **first gospel promise** in Genesis 3:15\n🟢 why God asked Adam **\"where art thou\"** when He already knew\n🟢 what the **coats of skins** actually cost\n\nWhich part of Genesis 3 hits you hardest? 🙏",
    },
  },
  {
    slug: "when-you-dont-feel-god-anymore",
    title: "What to Do When You Don't Feel God Anymore",
    description:
      "You don't feel God anymore, and it scares you. See what the Bible actually says about dry seasons of faith, why they happen, and what to do while you wait.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/when-you-dont-feel-god-anymore",
    publishedAt: "2026-09-08",
    readTime: "16 min read",
    image: "/when-you-dont-feel-god-anymore-banner.png",
    groupPost: {
      title: "What to Do When You Don't Feel God Anymore 📖",
      content:
        "You used to feel Him.\nNow you pray and it hits the ceiling.\n\n📌 Feeling nothing does not mean God left.\n\n📖 David wrote whole psalms from inside this.\n📖 Job searched every direction and found nothing.\n📖 Jesus cried \"why hast thou forsaken me\" on the cross.\n\nNew article on:\n🟢 why **feelings** were never the measure of faith\n🟢 the ordinary causes nobody names, like **exhaustion and grief**\n🟢 what to actually do while you **wait on God**\n\nHave you ever gone through a dry season like this? 🙏",
    },
  },
  {
    slug: "who-was-mary-mother-of-jesus",
    title: "Who Was Mary, the Mother of Jesus? The Woman God Chose to Carry His Son",
    description:
      "A teenage girl said yes to carrying the Son of God. The full story of Mary, from the angel Gabriel to the cross, told in order from Scripture.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-mary-mother-of-jesus",
    publishedAt: "2026-09-06",
    readTime: "14 min read",
    image: "/blog-banners/who-was-mary.jpg",
    groupPost: {
      title: "Who Was Mary, the Mother of Jesus? 📖",
      content:
        "A teenage girl got the hardest assignment in history.\nShe said yes before she had any of the answers.\n\n📌 Her yes cost her socially, then it cost her at the cross.\n\n📖 An angel visits a poor girl from Nazareth.\n📖 Simeon warns her a sword will pierce her soul.\n📖 She stands at the cross and watches her son die.\n\nNew article on:\n🟢 The full story of **Mary**, told in order from Luke to Acts.\n🟢 What the Bible actually says about her, and what tradition added.\n🟢 What her yes still asks of us today.\n\nHave you ever said yes to something before you had any answers? 🙏",
    },
  },
  {
    slug: "who-was-mary-magdalene",
    title: "Who Was Mary Magdalene in the Bible? The First Person to See Jesus Risen",
    description:
      "Mary Magdalene was not a prostitute. Discover the real Bible story of the woman Jesus healed and the first person to see Him risen from the dead.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-mary-magdalene",
    publishedAt: "2026-09-06",
    readTime: "17 min read",
    image: "/blog-banners/who-was-mary-magdalene.jpg",
    groupPost: {
      title: "Who Was Mary Magdalene in the Bible? 📖",
      content:
        "She was called a prostitute for centuries.\n\nThe Bible never once says it.\n\n📌 Jesus healed her, and she was first to see Him risen.\n\n📖 She helped fund Jesus's ministry after He healed her.\n📖 She stayed at the cross when His own disciples fled.\n📖 She was the very first witness of the resurrection.\n\nNew article on:\n🟢 Where the **prostitute myth** actually came from\n🟢 Her real story from **all four Gospels**, verse by verse\n🟢 What Jesus calling her by name still means for you\n\nWere you ever taught the myth about her too? 🙏",
    },
  },
  {
    slug: "who-was-esther",
    title: "Who Was Esther in the Bible? The Queen Who Risked Her Life to Save Her People",
    description:
      "Esther's full story from orphan to queen, the plot against her people, and the courage it took to say if I perish, I perish.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-esther",
    publishedAt: "2026-09-06",
    readTime: "12 min read",
    image: "/blog-banners/who-was-esther.jpg",
    groupPost: {
      title: "Who Was Esther in the Bible? 📖",
      content:
        "An orphan girl became queen overnight.\nThen her whole people got a death sentence.\n\n📌 She had to risk her life to save them, knowing she might die for speaking up.\n\n📖 Mordecai raised her and told her to hide she was Jewish.\n📖 Haman built gallows for the man who would not bow to him.\n📖 God's name never appears once in the whole book.\n\nNew article on:\n🟢 How an **orphan** became queen of Persia\n🟢 What **for such a time as this** really means\n🟢 Why hidden moments still count as **faith**\n\nEver had to choose between staying quiet and doing the scary right thing? 🙏",
    },
  },
  {
    slug: "who-was-ruth",
    title: "Who Was Ruth in the Bible? The Widow Who Refused to Leave",
    description:
      "Ruth was a poor Moabite widow who chose loyalty over safety, gleaned in a stranger's field, and became King David's great grandmother.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-ruth",
    publishedAt: "2026-09-06",
    readTime: "12 min read",
    image: "/blog-banners/who-was-ruth.jpg",
    groupPost: {
      title: "Who Was Ruth in the Bible? 📖",
      content:
        "A foreign widow with nothing left.\nShe still chose loyalty over safety.\n\n📌 Ruth gave up her own people and her own gods for Naomi's God.\n\n📖 She gleaned grain in a stranger's field to survive.\n📖 That field belonged to a man named Boaz.\n📖 Her great grandson became King David.\n\nNew article on:\n🟢 The full story of **Ruth**, in order from Scripture\n🟢 What a **kinsman redeemer** actually was\n🟢 How Ruth ends up in the family line of **Jesus**\n\nEver had to choose loyalty when leaving would have been easier? 🙏",
    },
  },
  {
    slug: "who-was-sarah",
    title: "Who Was Sarah in the Bible? The Woman Who Laughed at God",
    description:
      "Sarah waited decades for God's promise, laughed when it seemed impossible, and became the mother of a nation. Her full story, verse by verse.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-sarah",
    publishedAt: "2026-09-06",
    readTime: "13 min read",
    image: "/blog-banners/who-was-sarah.jpg",
    groupPost: {
      title: "Who Was Sarah in the Bible? 📖",
      content:
        "She waited decades for a promise that seemed impossible.\nThen she laughed when God said it was finally time.\n\n📌 Her story shows faith and doubt can live together.\n\n📖 She was barren for most of her life.\n📖 She once let fear talk her into a lie in Egypt.\n📖 She held her promised son at ninety years old.\n\nNew article on:\n🟢 Sarah's long **wait** on God's promise.\n🟢 The **laugh** that started in disbelief.\n🟢 What her story teaches about **faith**.\n\nHave you ever laughed at a promise from God? 🙏",
    },
  },
  {
    slug: "who-was-delilah",
    title: "Who Was Delilah in the Bible? The Woman Who Betrayed the Strongest Man Alive",
    description:
      "Who was Delilah in the Bible? The full story of the woman who betrayed Samson, told in order from Judges 16, with lessons for who you let close.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-delilah",
    publishedAt: "2026-09-06",
    readTime: "14 min read",
    image: "/blog-banners/who-was-delilah.jpg",
    groupPost: {
      title: "Who Was Delilah in the Bible? 📖",
      content:
        "She never fought Samson with an army.\nShe just kept asking one question.\n\n📌 She wore him down daily until he told her the truth.\n\n📖 Philistine lords bribed her with silver to find his secret.\n📖 Samson lied to her three times before finally telling her.\n📖 He woke up and did not know the LORD had left him.\n\nNew article on:\n🟢 The **three lies** Samson told before the truth came out\n🟢 What his **Nazarite vow** actually meant\n🟢 Why God still answered his **final prayer**\n\nHave you ever ignored a warning sign because someone felt too close to walk away from? 🙏",
    },
  },
  {
    slug: "who-was-hannah",
    title: "Who Was Hannah in the Bible? The Mother Who Gave Her Son Back to God",
    description:
      "Hannah waited years for a child while a rival wife mocked her every year. See her full story: the vow, the prayer mistaken for drunkenness, and Samuel's birth.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-hannah",
    publishedAt: "2026-09-06",
    readTime: "16 min read",
    image: "/blog-banners/who-was-hannah.jpg",
    groupPost: {
      title: "Who Was Hannah in the Bible? 📖",
      content:
        "Years of waiting for a child.\nA rival wife who mocked her every single year.\n\n📌 Hannah poured out her pain to God, then gave her answered prayer right back to Him.\n\n📖 She wept so hard a priest thought she was drunk.\n📖 She vowed to give her future son to the LORD forever.\n📖 She got five more children after keeping that promise.\n\nNew article on:\n🟢 How **Hannah's vow** shaped her whole story\n🟢 What **pouring out your soul** in prayer really looks like\n🟢 The **prayer of praise** that echoes all the way to Mary\n\nHave you ever prayed through years of waiting? What kept you going? 🙏",
    },
  },
  {
    slug: "who-was-bathsheba",
    title: "Who Was Bathsheba in the Bible? The Woman a King Killed For",
    description:
      "The true story of Bathsheba: what David did, what it cost Uriah, and why Scripture blames the king, not her.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-bathsheba",
    publishedAt: "2026-09-06",
    readTime: "14 min read",
    image: "/blog-banners/who-was-bathsheba.jpg",
    groupPost: {
      title: "Who Was Bathsheba in the Bible? 📖",
      content:
        "A king saw her from his roof.\nHer whole life changed after that.\n\n📌 Scripture blames David for what happened, not her.\n\n📖 David sent for her, then tried to hide the pregnancy.\n📖 He had her husband Uriah killed in battle to cover it up.\n📖 Years later she spoke up and helped her son Solomon become king.\n\nNew article on:\n🟢 The full story of **Bathsheba**, told in order from 2 Samuel.\n🟢 Why **Nathan** told David \"Thou art the man.\"\n🟢 How grace showed up even in her family line to **Jesus**.\n\nHave you ever been blamed for something someone else did to you? 🙏",
    },
  },
  {
    slug: "who-was-deborah",
    title: "Who Was Deborah in the Bible? The Woman Who Led a Nation to War",
    description:
      "Deborah led Israel out of twenty years of oppression. Discover her full story, from the palm tree of judgment to the battle and the Song of Deborah.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-deborah",
    publishedAt: "2026-09-06",
    readTime: "13 min read",
    image: "/blog-banners/who-was-deborah.jpg",
    groupPost: {
      title: "Who Was Deborah in the Bible? 📖",
      content:
        "Israel suffered twenty years under a cruel king.\nNo man would step up to fight.\n\n📌 A woman named Deborah finally led the war herself.\n\n📖 She was a prophetess who judged Israel under a palm tree.\n📖 A general refused to fight unless she went too.\n📖 Another woman, Jael, finished the battle in her own tent.\n\nNew article on:\n🟢 How **Deborah** led an army when no man would.\n🟢 Why **Barak** needed her beside him to go to war.\n🟢 What **Jael** did that fulfilled Deborah's prophecy.\n\nHave you ever had to lead when nobody else would step up? 🙏",
    },
  },
  {
    slug: "who-was-rebekah",
    title: "Who Was Rebekah in the Bible? The Mother Who Tricked Her Own Husband",
    description:
      "Rebekah said yes to a stranger's marriage proposal in one word, then years later lied to secure God's own promise about her sons.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-rebekah",
    publishedAt: "2026-09-06",
    readTime: "14 min read",
    image: "/blog-banners/who-was-rebekah.jpg",
    groupPost: {
      title: "Who Was Rebekah in the Bible? 📖",
      content:
        "She said yes to a total stranger's proposal.\nThen years later she lied to her own husband.\n\n📌 She believed God's promise but would not wait on His timing.\n\n📖 She watered ten camels for a stranger at a well.\n📖 God told her before birth that her younger son would lead.\n📖 She dressed Jacob in goat skins to steal his father's blessing.\n\nNew article on:\n🟢 The **well test** that changed her whole future\n🟢 The **twin sons** who fought before they were even born\n🟢 The **stolen blessing** that cost her twenty years with Jacob\n\nHave you ever tried to force a promise instead of waiting on it? 🙏",
    },
  },
  {
    slug: "who-was-rahab",
    title: "Who Was Rahab in the Bible? The Harlot in the Family Line of Jesus",
    description:
      "Rahab was a harlot in Jericho who hid two spies and became an ancestor of Jesus. Her full story, in order, from Joshua to Matthew.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-rahab",
    publishedAt: "2026-09-06",
    readTime: "12 min read",
    image: "/blog-banners/who-was-rahab.jpg",
    groupPost: {
      title: "Who Was Rahab in the Bible? 📖",
      content:
        "She ran a house built into Jericho's wall.\nOne brave choice changed everything for her.\n\n📌 Faith moved her to act, not just believe.\n\n📖 She hid two spies and lied to protect them.\n📖 She hung a scarlet cord in her window as a sign.\n📖 She is named as an ancestor of Jesus in Matthew 1.\n\nNew article on:\n🟢 How **one honest choice** can change your whole story.\n🟢 What the **scarlet cord** in her window really meant.\n🟢 Why her past never got the final word.\n\nEver felt like your past disqualifies you? Reply and let's talk 🙏",
    },
  },
  {
    slug: "who-was-rachel",
    title: "Who Was Rachel in the Bible? The Woman Jacob Worked Fourteen Years For",
    description:
      "The full story of Rachel in the Bible: fourteen years of love, years of longing, the birth of Joseph, stolen idols, and her death near Bethlehem.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-rachel",
    publishedAt: "2026-09-06",
    readTime: "16 min read",
    image: "/blog-banners/who-was-rachel.jpg",
    groupPost: {
      title: "Who Was Rachel in the Bible? 📖",
      content:
        "Everyone wanted Rachel. Jacob worked 14 years for her.\n\nBut love never gave her peace.\n\n📌 Having what everyone envies did not mean she had what she needed.\n\n📖 She envied her sister Leah for years over children.\n📖 God finally opened her womb and gave her Joseph.\n📖 She died in childbirth on the road, naming her son 'son of my sorrow.'\n\nNew article on:\n🟢 The **wedding night** that betrayed her without her ever agreeing to it\n🟢 Why she stole her father's **household idols** and hid them\n🟢 What her death says about beauty, love, and never finding peace\n\nHave you ever gotten the thing you wanted most, only to find it didn't fix what you thought it would? 🙏",
    },
  },
  {
    slug: "who-was-hagar",
    title: "Who Was Hagar in the Bible? The Slave Girl Who Gave God a Name",
    description:
      "Hagar was a slave used by Sarai and Abram, then cast into the wilderness twice. See how God found her both times and what her story means for you.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-hagar",
    publishedAt: "2026-09-06",
    readTime: "12 min read",
    image: "/blog-banners/who-was-hagar.jpg",
    groupPost: {
      title: "Who Was Hagar in the Bible? 📖",
      content:
        "She was a slave with no say over her own life.\nHer owners used her, then threw her away twice.\n\n📌 Both times she was cast out, God found her first.\n\n📖 Sarai gave her to Abram to have a child.\n📖 She fled to the desert and an angel met her there.\n📖 She named God herself, the first person in the Bible to do it.\n\nNew article on:\n🟢 How Hagar became a **surrogate**, then was driven away.\n🟢 The **wilderness** meeting that changed her whole story.\n🟢 What God did the second time she was cast out.\n\nEver felt used by people who were supposed to care for you? 🙏",
    },
  },
  {
    slug: "who-was-tamar",
    title: "Who Was Tamar in the Bible? The Widow Judah Called More Righteous",
    description:
      "Tamar was denied the family she was legally owed, so she took a bold risk to force out the truth. See how her story ends in the family line of Jesus.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-tamar",
    publishedAt: "2026-09-06",
    readTime: "14 min read",
    image: "/blog-banners/who-was-tamar.jpg",
    groupPost: {
      title: "Who Was Tamar in the Bible? 📖",
      content:
        "Tamar buried two husbands before she got justice.\nJudah promised her a third one, then never kept it.\n\n📌 She was denied what she was legally owed by the man who should have protected her.\n\n📖 Her two husbands died for their own sin, not hers.\n📖 She waited years on a broken promise from Judah.\n📖 She took a huge risk to force the truth into the open.\n\nNew article on:\n🟢 Why **Judah** called her more righteous than himself.\n🟢 How her son **Pharez** ends up in the family line of Jesus.\n🟢 What it means to fight for justice inside a broken system.\n\nHave you ever been denied what you were rightfully owed by someone who should have protected you? 🙏",
    },
  },
  {
    slug: "who-were-martha-and-mary",
    title: "Who Were Martha and Mary of Bethany? The Sisters Who Saw Jesus Cry",
    description:
      "Martha served. Mary listened. Both grieved their brother Lazarus and watched Jesus weep before He raised him from the dead.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-were-martha-and-mary",
    publishedAt: "2026-09-06",
    readTime: "16 min read",
    image: "/blog-banners/who-was-martha-and-mary.jpg",
    groupPost: {
      title: "Who Were Martha and Mary of Bethany? 📖",
      content:
        "Two sisters loved Jesus in totally different ways.\nOne served. One sat and listened.\n\n📌 Jesus loved them both, and He wept before He worked the miracle.\n\n📖 Martha welcomed Jesus into her home while Mary sat at His feet.\n📖 Their brother Lazarus died, and Jesus waited two days anyway.\n📖 Mary anointed Jesus with costly perfume before His burial.\n\nNew article on:\n🟢 Whether **serving** God can crowd out sitting with Him\n🟢 Why **Jesus wept** even knowing a miracle was coming\n🟢 What Mary's costly gift teaches about quiet devotion\n\nWhich sister do you relate to more, Martha or Mary? 🙏",
    },
  },
  {
    slug: "who-was-the-samaritan-woman",
    title: "Who Was the Samaritan Woman? Five Husbands and One Savior",
    description:
      "The Samaritan woman came to draw water alone at noon to avoid people. See her full story from John 4 and what Jesus told her that changed everything.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-the-samaritan-woman",
    publishedAt: "2026-09-06",
    readTime: "17 min read",
    image: "/blog-banners/who-was-the-samaritan-woman.jpg",
    groupPost: {
      title: "Who Was the Samaritan Woman? 📖",
      content:
        "She came to the well alone at noon.\nThe hottest hour, so nobody would see her.\n\n📌 A tired stranger spoke to her anyway, and He already knew everything about her.\n\n📖 Jesus asked a Samaritan woman for a drink of water.\n📖 He knew about her five husbands without her saying a word.\n📖 She ran into town and told everyone about Him.\n\nNew article on:\n🟢 What **living water** actually means.\n🟢 Why Jews and Samaritans avoided each other.\n🟢 What it looks like to stop hiding from people.\n\nHave you ever avoided people because of your past? 🙏",
    },
  },
  {
    slug: "who-was-elizabeth",
    title: "Who Was Elizabeth in the Bible? The Woman Who Waited a Lifetime for a Miracle",
    description:
      "Elizabeth waited decades for a child in a culture that measured her worth by it. See her full story from Luke 1 and the miracle that finally came.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-elizabeth",
    publishedAt: "2026-09-06",
    readTime: "17 min read",
    image: "/blog-banners/who-was-elizabeth.jpg",
    groupPost: {
      title: "Who Was Elizabeth in the Bible? 📖",
      content:
        "She waited decades for a child that never came.\nThen God answered in the most surprising way.\n\n📌 Her miracle arrived at the exact same time as an even bigger one.\n\n📖 An angel struck her husband silent in the temple.\n📖 Her baby leaped inside her when Mary greeted her.\n📖 She insisted on the name John against her whole family.\n\nNew article on:\n🟢 What it felt like to carry a hope that long.\n🟢 Why her cousin **Mary's** visit mattered so much.\n🟢 What her story says about waiting on God's timing.\n\nHave you ever waited on a hope you almost gave up on? 🙏",
    },
  },
  {
    slug: "who-was-miriam",
    title: "Who Was Miriam in the Bible? The Sister Who Saved Moses",
    description:
      "Miriam saved baby Moses, led Israel in worship as a prophetess, then stumbled badly with jealousy. Her full story from Exodus and Numbers.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-miriam",
    publishedAt: "2026-09-06",
    readTime: "17 min read",
    image: "/blog-banners/who-was-miriam.jpg",
    groupPost: {
      title: "Who Was Miriam in the Bible? 📖",
      content:
        "A young girl saved her baby brother's life.\nShe grew up to lead a nation in worship.\n\n📌 Years of faithful service did not stop one bitter mistake.\n\n📖 She watched over baby Moses hidden in a basket.\n📖 She led the women in song after the Red Sea.\n📖 She was struck with disease after speaking against Moses.\n\nNew article on:\n🟢 How **Miriam** protected her brother as a young girl.\n🟢 Why she is called a **prophetess** in Exodus 15.\n🟢 What her fall teaches about pride and jealousy.\n\nHave you ever stumbled badly after years of faithful service? 🙏",
    },
  },
  {
    slug: "is-it-a-sin-to-doubt-god",
    title: "Is It a Sin to Doubt God?",
    description:
      "Is it a sin to doubt God? See what Thomas, John the Baptist, and the father in Mark 9 teach about honest doubt, and how it differs from unbelief.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/is-it-a-sin-to-doubt-god",
    publishedAt: "2026-09-05",
    readTime: "16 min read",
    image: "/blog-banners/is-it-a-sin-to-doubt-god.jpg",
    groupPost: {
      title: "Is It a Sin to Doubt God? 📖",
      content:
        "You typed a question into your phone at night.\nIs it a sin to doubt God.\n\n📌 Doubt is not the same thing as unbelief.\n\n📖 Thomas said he would not believe until he saw the nails.\n📖 John the Baptist doubted from inside a prison cell.\n📖 A desperate father said Lord I believe, help my unbelief.\n\nNew article on:\n🟢 the real difference between **doubt** and **unbelief**\n🟢 why Jesus never shamed a single honest question\n🟢 what to do the next time doubt shows up\n\nHave you ever been afraid to say your doubts out loud? 🙏",
    },
  },
  {
    slug: "who-was-joseph",
    title: "Who Was Joseph? From the Pit to the Palace",
    description:
      "Joseph's story from Genesis: sold into slavery by his own brothers, falsely accused, forgotten in prison, then raised to save the nation that betrayed him.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-joseph",
    publishedAt: "2026-09-01",
    readTime: "14 min read",
    image: "/who-was-joseph-banner-v2.jpg",
    groupPost: {
      title: "Who Was Joseph? From the Pit to the Palace 📖",
      content:
        "His own brothers sold him into slavery.\nYears later, he had the power to destroy every one of them.\n\n📌 God meant it unto good, even when people meant it for evil.\n\n📖 Joseph was thrown in a pit before he was ever thrown in prison.\n📖 He stayed faithful in Potiphar's house and paid for it anyway.\n📖 Pharaoh raised him from prisoner to ruler in a single day.\n\nNew article on:\n🟢 how **God's providence** worked through every unfair turn\n🟢 what real **forgiveness** looked like when Joseph had all the power\n🟢 the verse the whole story was written to deliver\n\nHave you ever seen God use your worst season for good? 🙏",
    },
  },
  {
    slug: "names-of-god-meanings",
    title: "The Names of God and What They Mean",
    description:
      "What do Elohim, Yahweh, El Shaddai, El Elyon, El Roi, and Adonai actually mean? A clear, accurate guide to every major name of God in Scripture.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/names-of-god-meanings",
    publishedAt: "2026-09-01",
    readTime: "16 min read",
    image: "/names-of-god-meanings-banner-v2.jpg",
    groupPost: {
      title: "The Names of God and What They Mean 📖",
      content:
        "God has a lot of names in the Bible.\nNot one of them is decoration.\n\n📌 Every name of God is a promise with His character attached.\n\n📖 Elohim spoke a universe into being.\n📖 El Shaddai kept a promise Abraham thought was impossible.\n📖 Gideon named an altar Jehovah Shalom after God calmed his fear.\n\nNew article on:\n🟢 what **Yahweh**, **Elohim**, and **El Shaddai** actually mean\n🟢 the honest truth about the popular **Jehovah names**\n🟢 why the King James Bible mostly says **LORD**, not Yahweh\n\nWhich name of God do you need to remember today? 🙏",
    },
  },
  {
    slug: "armor-of-god-explained",
    title: "The Armor of God Explained",
    description:
      "The Armor of God from Ephesians 6:10 to 18 explained piece by piece: the belt of truth, breastplate of righteousness, shoes of peace, shield of faith, helmet of salvation, sword of the Spirit, and prayer.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/armor-of-god-explained",
    publishedAt: "2026-09-01",
    readTime: "16 min read",
    image: "/armor-of-god-explained-banner-v2.jpg",
    groupPost: {
      title: "The Armor of God Explained 📖",
      content:
        "The armor of God is not a costume.\nIt is six real pieces for a real fight.\n\n📌 Paul names the fight before he names the gear, and it is not against people.\n\n📖 The belt of truth holds everything else together.\n📖 The shield of faith quenches fiery darts before they land.\n📖 Paul does not stop at the sword. He ends with prayer.\n\nNew article on:\n🟢 what each piece of the **armor of God** actually represents\n🟢 why the real battle is not against **flesh and blood**\n🟢 why prayer, not the sword, finishes the passage\n\nWhich piece of the armor do you need most today? 🙏",
    },
  },
  {
    slug: "genesis-1-explained",
    title: "Genesis 1 Explained: The Creation of the World",
    description:
      "Genesis 1 explained in plain English: the six days of creation, humanity made in God's image, top Bible verses, and common FAQs answered.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-1-explained",
    publishedAt: "2026-09-01",
    readTime: "17 min read",
    image: "/blog-banners/genesis-1-explained.jpg",
    groupPost: {
      title: "Genesis 1 Explained 📖",
      content:
        "Genesis 1 is not just ancient history.\nIt is the account of how everything you can see got here.\n\n📌 God speaks, and it happens exactly as He said, every single time.\n\n📖 Light shows up on day one, the sun not until day four.\n📖 Humans alone are called made in God's image.\n📖 The seventh day rest actually opens Genesis 2, not chapter 1.\n\nNew article on:\n🟢 the real order of the **six days of creation**\n🟢 what being made in **God's image** actually means\n🟢 the one detail most graphics get wrong about **day seven**\n\nWhich day of creation surprises you most? 🙏",
    },
  },
  {
    slug: "who-was-adam",
    title: "Who Was Adam?",
    description:
      "Who was Adam in the Bible? His creation from the dust, life in Eden, the Fall, and why Paul calls Jesus the last Adam. A complete overview.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-adam",
    publishedAt: "2026-09-01",
    readTime: "9 min read",
    image: "/blog-banners/who-was-adam.jpg",
    groupPost: {
      title: "Who Was Adam? 📖",
      content:
        "He was formed from dust, and given a name people still call insults today.\n\n📌 Adam's story is not really about how far back history goes.\n\n📖 God formed him from the dust and breathed life into him.\n📖 He worked in paradise before sin ever touched anything.\n📖 One bad choice broke it all, and God still came looking for him.\n\nNew article on:\n🟢 what **being made in God's image** actually means\n🟢 the popular details about the Fall that are not really in the Bible\n🟢 why Paul calls Jesus the **last Adam**\n\nWhere do you see yourself in Adam's story? 🙏",
    },
  },
  {
    slug: "who-was-eve",
    title: "Who Was Eve in the Bible? The Woman Who Lost Paradise",
    description:
      "Who was Eve in the Bible? Her creation, the serpent's three moves, the fall, the promise of a Savior, and how she trusted God again after losing both her sons.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-was-eve",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-06",
    readTime: "18 min read",
    image: "/blog-banners/who-was-eve.jpg",
    groupPost: {
      title: "Who Was Eve in the Bible? 📖",
      content:
        "Eve gets blamed for the worst chapter in the Bible.\nMost people have never read the rest of her story.\n\n📌 God promised her a rescuer before He ever announced her punishment.\n\n📖 The serpent used three moves, not one lie.\n📖 Adam stood right beside her the whole time and said nothing.\n📖 She lost one son to murder and one to exile in a single day.\n\nNew article on:\n🟢 the serpent's **three moves** against Eve\n🟢 why the **coats of skins** were the first sacrifice in the Bible\n🟢 how Eve trusted God again after losing **Abel and Cain**\n\nDoes one failure feel like it defines you too? 🙏",
    },
  },
  {
    slug: "genesis-2-explained",
    title: "Genesis 2 Explained: Eden, Adam, Eve & God's Design",
    description:
      "A full walkthrough of Genesis 2: God forming Adam from dust, the one command about the tree, Adam naming the animals, and God's design for marriage in Eve's creation.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-2-explained",
    publishedAt: "2026-09-01",
    readTime: "17 min read",
    image: "/blog-banners/genesis-2-explained.jpg",
    groupPost: {
      title: "Genesis 2 Explained 📖",
      content:
        "God did not speak the first man into being from a distance.\nHe knelt in the dust and breathed.\n\n📌 Genesis 2 is where creation gets personal.\n\n📖 Adam was given work before anything ever went wrong.\n📖 One tree, out of a whole garden, was off limits.\n📖 God called being alone the first not good thing in the Bible.\n\nNew article on:\n🟢 how **Genesis 1 and 2** fit together, not contradict\n🟢 the real meaning of **help meet**\n🟢 what the garden actually asked of Adam\n\nWhat stands out most to you in Genesis 2? 🙏",
    },
  },
  {
    slug: "garden-of-eden-four-rivers",
    title: "The Garden of Eden & the Four Rivers Explained",
    description:
      "Genesis 2 names four rivers flowing out of Eden. See what is confirmed, what is still debated, and how the tree of life reappears in Revelation 22.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/garden-of-eden-four-rivers",
    publishedAt: "2026-09-01",
    readTime: "15 min read",
    image: "/blog-banners/garden-of-eden-four-rivers.jpg",
    groupPost: {
      title: "The Garden of Eden & the Four Rivers Explained 📖",
      content:
        "Four rivers flowed out of one garden.\nOnly two of them can be found on a map today.\n\n📌 Genesis is far more specific about Eden than most graphics ever show you.\n\n📖 Adam had a real job in the garden, before sin ever entered.\n📖 The command not to eat was given to Adam alone, before Eve was formed.\n📖 Two rivers, the Tigris and Euphrates, still flow today.\n\nNew article on:\n🟢 what Genesis actually says about Eden's **four rivers**\n🟢 the two trees, and why they are not the same tree\n🟢 where the text stops and the guesswork begins\n\nWhich detail about Eden surprised you most? 🙏",
    },
  },
  {
    slug: "biblical-numbers-meanings",
    title: "Biblical Numbers and Their Meanings",
    description:
      "What do biblical numbers like 7, 12, 40, and 666 really mean? A clear guide that separates real Bible patterns from popular numerology myths.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/biblical-numbers-meanings",
    publishedAt: "2026-09-01",
    readTime: "10 min read",
    image: "/blog-banners/biblical-numbers-meanings.jpg",
    groupPost: {
      title: "Biblical Numbers and Their Meanings 📖",
      content:
        "Numbers are not random in the Bible.\nSome of them show up again and again, on purpose.\n\n📌 Scripture uses numbers with real intention, not hidden codes.\n\n📖 Seven marks something finished.\n📖 Forty marks a season of testing.\n📖 Twelve marks God's own people.\n\nNew article on:\n🟢 which numbers Scripture actually repeats on purpose\n🟢 what **666** really says, straight from Revelation\n🟢 the popular numerology claims that do not hold up\n\nWhich number in the Bible surprises you most? 🙏",
    },
  },
  {
    slug: "who-is-god-as-a-father",
    title: "Who Is God as a Father?",
    description:
      "What does it mean that God is a Father? See what Scripture says about His compassion, provision, discipline, and adoption, even if your earthly father let you down.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/who-is-god-as-a-father",
    publishedAt: "2026-09-01",
    readTime: "6 min read",
    image: "/blog-banners/who-is-god-as-a-father.jpg",
    groupPost: {
      title: "Who Is God as a Father? 📖",
      content:
        "Father is not a safe word for everyone.\nFor some it means absence. For some it means fear.\n\n📌 Scripture says God as Father is not bound by what your earthly father was.\n\n📖 The Bible ties His discipline directly to His love.\n📖 Paul says believers are legally adopted, crying \"Abba, Father.\"\n📖 Psalm 68:5 calls Him a father to the fatherless.\n\nNew article on:\n🟢 what it really means that God is **compassionate**\n🟢 the truth behind **Abba Father** and what it actually says\n🟢 how **adoption** changes your standing with God\n\nWhat part of God's fatherhood is hardest for you to believe? 🙏",
    },
  },
  {
    slug: "men-who-walked-with-god",
    title: "Every Man Who Walked With God in the Bible",
    description:
      "Only two men in the Bible are described as walking with God: Enoch and Noah. See what the phrase means and who else lived that out.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/men-who-walked-with-god",
    publishedAt: "2026-09-01",
    readTime: "8 min read",
    image: "/blog-banners/men-who-walked-with-god.jpg",
    groupPost: {
      title: "Every Man Who Walked With God in the Bible 📖",
      content:
        "Scripture only names two men this way.\nEnoch and Noah both walked with God, but almost everyone else gets grouped in with them.\n\n📌 Walking with God means ongoing, close, obedient closeness, not one good day.\n\n📖 Enoch walked with God for three hundred years before God took him.\n📖 Noah kept walking with God while his whole generation had stopped.\n📖 Abraham is called God's friend instead, in different words entirely.\n\nNew article on:\n🟢 the only two men Scripture calls **walked with God**\n🟢 why **Abraham and Moses** get different wording, not the same title\n🟢 what Micah 6:8 asks of every one of us today\n\nWho in the Bible do you most want to walk like? 🙏",
    },
  },
  {
    slug: "lessons-from-the-life-of-jesus",
    title: "15 Lessons From the Life of Jesus",
    description:
      "Fifteen practical lessons from the life of Jesus, each grounded in a real Gospel moment, from loving enemies to facing the cross.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/lessons-from-the-life-of-jesus",
    publishedAt: "2026-09-01",
    readTime: "13 min read",
    image: "/blog-banners/lessons-from-the-life-of-jesus.jpg",
    groupPost: {
      title: "15 Lessons From the Life of Jesus 📖",
      content:
        "A pretty Pinterest graphic gives you a list.\nThe Bible gives you the actual moments behind it.\n\n📌 Jesus did not just teach these things. He lived them under real pressure.\n\n📖 He washed His disciples' feet the night before He died.\n📖 He forgave His executioners while still on the cross.\n📖 He faced the devil in the wilderness with nothing but Scripture.\n\nNew article on:\n🟢 fifteen lessons from the life of Jesus, each tied to a real Gospel moment\n🟢 the difference between **quote graphics** and what actually happened\n🟢 where to read each story for yourself, verse by verse\n\nWhich of these fifteen do you need most this week? 🙏",
    },
  },
  {
    slug: "inspiring-biblical-characters",
    title: "Inspiring Biblical Characters and What We Can Learn From Them",
    description:
      "The real stories of Noah, David, Esther, Daniel, Ruth, Jonah, Mary, and Paul, and the one lesson in faith each of them actually teaches.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/inspiring-biblical-characters",
    publishedAt: "2026-09-01",
    readTime: "9 min read",
    image: "/blog-banners/inspiring-biblical-characters.jpg",
    groupPost: {
      title: "Inspiring Biblical Characters 📖",
      content:
        "Most Bible characters were not superheroes.\nThey were ordinary people God used anyway.\n\n📌 Eight different lives, eight different struggles, one faithful God.\n\n📖 Noah obeyed for decades before it ever rained.\n📖 Esther risked her life with no promise of the outcome.\n📖 Paul went from persecutor to preacher overnight.\n\nNew article on:\n🟢 the real stories behind 8 **inspiring biblical characters**\n🟢 the one detail in each story pop culture usually gets wrong\n🟢 which face of faith matches where you are right now\n\nWhich one sounds the most like your story right now? 🙏",
    },
  },
  {
    slug: "could-you-sacrifice-your-isaac",
    title: "Could You Sacrifice Your Isaac?",
    description:
      "God asked Abraham to sacrifice the son He promised him. The full story of Abraham and Isaac, and the question it asks every believer.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/could-you-sacrifice-your-isaac",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/could-you-sacrifice-your-isaac.jpg",
    groupPost: {
      title: "Could You Sacrifice Your Isaac? 📖",
      content:
        "God asked Abraham to sacrifice the son he prayed decades for.\nNot a stranger. His only son, the one God Himself had promised.\n\n📌 Faith isn't knowing what God will do. It's trusting what He already said.\n\n📖 Abraham got the command with no explanation attached.\n📖 He walked three full days before he ever reached the mountain.\n📖 God provided a ram at the exact last second, not a moment before.\n\nNew article on:\n🟢 the part of the story everyone skips: the **three day walk**\n🟢 how God's promise and God's command seemed to contradict each other\n🟢 the question this story leaves you with: could you sacrifice **your Isaac**?\n\nWhat is the one thing you'd struggle to hand back to God? 🙏",
    },
  },
  {
    slug: "how-god-heals-a-lust-damaged-heart",
    title: "6 Ways God Heals a Lust-Damaged Heart",
    description:
      "How to overcome lust: 6 biblical ways God heals a lust-damaged heart, renews your mind, and restores what shame and secrecy took.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/how-god-heals-a-lust-damaged-heart",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/how-god-heals-a-lust-damaged-heart.jpg",
    groupPost: {
      title: "6 Ways God Heals a Lust-Damaged Heart 📖",
      content:
        "Lust does not just tempt you once.\nIt reshapes what your heart wants.\n\n📌 God does not just forgive you. He restores you.\n\n📖 David prayed for a clean heart after his worst failure.\n📖 Jesus said cut off whatever keeps pulling you back.\n📖 James promised God draws near the moment you take one step toward Him.\n\nNew article on:\n🟢 6 ways **God heals** a lust damaged heart\n🟢 why **self control** is something the Spirit grows, not something you force\n🟢 how to cut off what feeds temptation without any shame\n\nWhat verse helps you most when the old pattern shows back up? 🙏",
    },
  },
  {
    slug: "genesis-1-1-2-explained",
    title: "Genesis 1:1-2 Explained",
    description:
      "Genesis 1:1-2 explained verse by verse: what without form and void, the deep, and the Spirit hovering over the waters actually mean before day one.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/genesis-1-1-2-explained",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/genesis-1-1-2-explained.jpg",
    groupPost: {
      title: "Genesis 1:1-2 Explained 📖",
      content:
        "Genesis 1:1-2 might only be two verses.\nBut before the first light, there is a whole world unformed and dark.\n\n📌 Darkness in Genesis 1:2 never meant God had lost control.\n\n📖 The earth was without form, and void.\n📖 The deep was covered in darkness.\n📖 The Spirit of God was already hovering over the waters.\n\nNew article on:\n🟢 what **without form and void** actually means\n🟢 why **the deep** is not a symbol of chaos\n🟢 what it means that the **Spirit moved** upon the waters\n\nWhere in your own story are you still waiting on verse three? 🙏",
    },
  },
  {
    slug: "is-wanting-money-a-sin",
    title: "Is Wanting Money a Sin?",
    description:
      "Is wanting money a sin? See what 1 Timothy 6:10 really means in Greek and context, and why God calls you to stewardship, not poverty.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/is-wanting-money-a-sin",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/is-wanting-money-a-sin.jpg",
    groupPost: {
      title: "Is Wanting Money a Sin? 📖",
      content:
        "\"For the love of money is the root of all evil.\"\nEveryone quotes it. Almost nobody quotes it right.\n\n📌 Paul was warning a young pastor about greedy false teachers, not banning wanting more.\n\n📖 Abraham was very rich, and Scripture never apologizes for it.\n📖 Job ended richer than he started.\n📖 Jesus said whoever is faithful with little gets trusted with much.\n\nNew article on:\n🟢 what the Greek word behind **love of money** actually means\n🟢 the difference between **wanting** money and **loving** it\n🟢 why God cares about your **stewardship**, not your poverty\n\nHave you ever felt guilty for wanting to provide? 🙏",
    },
  },
  {
    slug: "why-does-god-allow-suffering",
    title: "Why Does God Allow Suffering?",
    description:
      "An honest, biblical answer to why God allows suffering: free will, a groaning creation, the cross, Job, and Jesus weeping at Lazarus's tomb.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/why-does-god-allow-suffering",
    publishedAt: "2026-09-01",
    readTime: "22 min read",
    image: "/blog-banners/why-does-god-allow-suffering.jpg",
    groupPost: {
      title: "Why Does God Allow Suffering? 📖",
      content:
        "Some suffering has no explanation.\nNot now. Maybe not ever, this side of heaven.\n\n📌 \"Everything happens for a reason\" is not a Bible verse.\n\n📖 Job never got his answer. He got God instead.\n📖 The cross is not God watching you suffer. It's God suffering.\n📖 Jesus wept at a tomb, seconds before He was going to raise it.\n\nNew article on:\n🟢 what the Bible actually says about **why God allows suffering**\n🟢 free will, a **groaning creation**, and the honest cost of both\n🟢 why your grief is never an inconvenience to Him\n\nWhat verse has carried you through your hardest season? 🙏",
    },
  },
  {
    slug: "how-do-we-know-the-bible-is-true",
    title: "How Do We Know the Bible Is True?",
    description:
      "Manuscripts, fulfilled prophecy, archaeology, and the Bible's own honesty about its heroes. The real evidence for a trustworthy Bible, explained plainly.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/how-do-we-know-the-bible-is-true",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/how-do-we-know-the-bible-is-true.jpg",
    groupPost: {
      title: "How Do We Know the Bible Is True? 📖",
      content:
        "The evidence for the Bible is stronger than most people realize.\nManuscripts. Prophecy. Archaeology. Honesty.\n\n📌 Evidence can prove the Bible trustworthy. Only trust can make it faith.\n\n📖 The New Testament has more manuscript copies than any other ancient book, by far.\n📖 Bethlehem was named as the Messiah's birthplace 700 years early.\n📖 The Bible records David's worst sin and Peter's denial, in full.\n\nNew article on:\n🟢 how the **manuscript count** compares to Homer and Caesar\n🟢 **fulfilled prophecy** written centuries in advance\n🟢 what evidence can and cannot do for your faith\n\nWhat convinced you the Bible is trustworthy? 🙏",
    },
  },
  {
    slug: "is-jesus-the-only-way-to-god",
    title: "Is Jesus Really the Only Way to God?",
    description:
      "Is Jesus really the only way to God? An honest look at John 14:6 and Acts 4:12, and why exclusive does not mean arrogant.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/is-jesus-the-only-way-to-god",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/is-jesus-the-only-way-to-god.jpg",
    groupPost: {
      title: "Is Jesus Really the Only Way to God? 📖",
      content:
        "Is Jesus the only way to God?\nIt is the most narrow sounding claim in the whole Bible.\n\n📌 Jesus did not offer a way. He claimed to be the way.\n\n📖 John 14:6 says it plainly, on the last night of His life.\n📖 Peter repeated it to the men who crucified Jesus.\n📖 A merely good teacher does not say things like this.\n\nNew article on:\n🟢 why **exclusive does not mean arrogant**\n🟢 the honest logic behind Jesus's claim\n🟢 how to hold this warmly around people you love who don't believe it\n\nWho comes to mind when you read this? 🙏",
    },
  },
  {
    slug: "are-there-contradictions-in-the-bible",
    title: "Are There Contradictions in the Bible?",
    description:
      "Genesis 1 and 2, the resurrection accounts, and Jesus's two genealogies, examined honestly. A practical method for handling any hard Bible passage.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/are-there-contradictions-in-the-bible",
    publishedAt: "2026-09-01",
    readTime: "25 min read",
    image: "/blog-banners/are-there-contradictions-in-the-bible.jpg",
    groupPost: {
      title: "Are There Contradictions in the Bible? 📖",
      content:
        "Somebody said the Bible contradicts itself.\nAnd you did not have an answer ready.\n\n📌 Most apparent contradictions dissolve the moment you check the context.\n\n📖 Genesis 1 and 2 are one story told at two distances, not two rivals.\n📖 The four resurrection accounts are independent eyewitness testimony, and that strengthens them.\n📖 The two genealogies of Jesus serve two honest, different purposes.\n\nNew article on:\n🟢 how to test whether something is a real **contradiction** or just a **difference**\n🟢 the honest scholarly debate behind Jesus's **two genealogies**\n🟢 why a few open questions do not undo a **mountain of evidence**\n\nWhich hard passage has thrown you off the most? 🙏",
    },
  },
  {
    slug: "christian-and-science",
    title: "Can You Be a Christian and Believe in Science?",
    description:
      "Can a Christian believe in science? Yes. See why the faith vs. science conflict is newer than you think, and how sincere Christians view creation.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/christian-and-science",
    publishedAt: "2026-09-01",
    readTime: "17 min read",
    image: "/blog-banners/christian-and-science.jpg",
    groupPost: {
      title: "Can You Be a Christian and Believe in Science? 📖",
      content:
        "You were never supposed to choose.\nNot your faith. Not your field.\n\n📌 Yes, you can be a Christian and believe in science.\n\n📖 Newton wrote more theology than physics.\n📖 Kepler called his discoveries \"thinking God's thoughts after Him.\"\n📖 Francis Collins led the Human Genome Project as a believer.\n\nNew article on:\n🟢 why the **faith vs science** war is newer than you think\n🟢 how to read **Genesis honestly**\n🟢 the three real Christian views on **creation**, with no winner picked\n\nWhich camp did you grow up in? 🙏",
    },
  },
  {
    slug: "people-who-never-heard-of-jesus",
    title: "What Happens to People Who Never Heard of Jesus?",
    description:
      "What happens to those who never heard of Jesus? An honest look at Romans 1-2, general revelation, conscience, and trusting God's character.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/people-who-never-heard-of-jesus",
    publishedAt: "2026-09-01",
    readTime: "17 min read",
    image: "/blog-banners/people-who-never-heard-of-jesus.jpg",
    groupPost: {
      title: "What Happens to People Who Never Heard of Jesus? 📖",
      content:
        "This question has a face, not just a theory.\nA grandfather. A friend. Someone who died before you ever got to share the gospel.\n\n📌 Scripture does not give a full, certain answer here.\n\n📖 Creation itself testifies to God, so no one has zero witness.\n📖 Even without the law, conscience shows its work within us.\n📖 Abraham asked God the same question you're asking.\n\nNew article on:\n🟢 what **general revelation** actually means\n🟢 why **Genesis 18:25** is the anchor, not a formula\n🟢 why this question makes **missions** more urgent, not less\n\nWho came to mind when you read this question? 🙏",
    },
  },
  {
    slug: "why-does-god-feel-silent",
    title: "Why Does God Feel Silent?",
    description:
      "Why is God silent? See what Scripture says about David's laments, the 400 silent years, and Jesus at Gethsemane and the cross.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/why-does-god-feel-silent",
    publishedAt: "2026-09-01",
    readTime: "18 min read",
    image: "/blog-banners/why-does-god-feel-silent.jpg",
    groupPost: {
      title: "Why Does God Feel Silent? 📖",
      content:
        "God's silence is not a scolding.\nIt shows up next to the most faithful people in the whole Bible.\n\n📌 Silence is not the same thing as absence.\n\n📖 David asked \"how long, O Lord\" out loud.\n📖 God's people waited 400 years between Malachi and Matthew.\n📖 Jesus felt forsaken on the cross and it was still the plan.\n\nNew article on:\n🟢 the wrong assumption almost everyone makes about **silent seasons**\n🟢 why obedience with no felt reward counts for **more, not less**\n🟢 what to actually do while you wait on **God to speak**\n\nWhat do you do when heaven feels quiet? 🙏",
    },
  },
  {
    slug: "did-jesus-really-exist",
    title: "Did Jesus Really Exist? The Evidence Outside the Bible",
    description:
      "Did Jesus really exist? See what Tacitus, Josephus, Pliny, and the Talmud say, plus why historians agree He lived and died on a Roman cross.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/did-jesus-really-exist",
    publishedAt: "2026-09-01",
    readTime: "15 min read",
    image: "/blog-banners/did-jesus-really-exist.jpg",
    groupPost: {
      title: "Did Jesus Really Exist? 📖",
      content:
        "Someone told you Jesus never existed.\nRome wrote otherwise.\n\n📌 Almost no serious historian, believer or not, denies a man named Jesus lived and died on a cross.\n\n📖 A Roman historian who hated Christianity recorded His execution under Pilate.\n📖 A Jewish historian mentioned Him as a known public figure.\n📖 Even hostile rabbis never denied He lived.\n\nNew article on:\n🟢 what **Tacitus, Josephus, and Pliny** actually wrote about Jesus\n🟢 why the real debate is **who He was**, not whether He existed\n🟢 the next question every skeptic has to answer: the empty tomb\n\nDo you know the history behind what you believe? 🙏",
    },
  },
  {
    slug: "how-do-you-know-you-are-saved",
    title: "How Do You Know You Are Saved?",
    description:
      "How do you know you are saved? 6 biblical signs from Scripture that reveal real, saving faith, and honest answers for anyone who doubts.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/how-do-you-know-you-are-saved",
    publishedAt: "2026-09-01",
    readTime: "23 min read",
    image: "/blog-banners/how-do-you-know-you-are-saved.jpg",
    groupPost: {
      title: "How Do You Know You Are Saved? 📖",
      content:
        "It's late. The house is quiet.\nAnd one question won't let you sleep. Am I really saved?\n\n📌 Real faith always leaves evidence, even when you can't feel it.\n\n📖 Salvation is a gift, not a wage you earn.\n📖 Struggling with sin isn't the same as being ruled by it.\n📖 Six biblical signs reveal what God is already doing in you.\n\nNew article on:\n🟢 the **six signs** your faith is real\n🟢 what it means to have a **new heart**\n🟢 honest answers for anyone who **doubts their salvation**\n\nDo you ever lie awake wondering if you're really saved? 🙏",
    },
  },
  {
    slug: "how-to-defend-your-faith-in-jesus",
    title: "How to Defend Your Faith in Jesus",
    description:
      "How to defend your faith in Jesus: the resurrection evidence in 1 Corinthians 15, why the first witnesses were women, and 1 Peter 3:15.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/how-to-defend-your-faith-in-jesus",
    publishedAt: "2026-08-29",
    readTime: "23 min read",
    image: "/blog-banners/how-to-defend-your-faith-in-jesus.jpg",
    groupPost: {
      title: "How to Defend Your Faith in Jesus 📖",
      content:
        "Someone asks why you believe in Jesus.\nAnd you freeze.\n\n📌 Faith is not blind. It is built on real evidence.\n\n📖 Over 500 people saw Jesus alive after the resurrection.\n📖 The first witnesses were women, who couldn't testify in court.\n📖 Frightened disciples became bold enough to die for what they saw.\n\nNew article on:\n🟢 how to explain the **resurrection evidence**\n🟢 why 1 Peter 3:15 is your **whole game plan**\n🟢 how to answer hard questions with **gentleness**\n\nHave you ever frozen when someone asked why you believe? 🙏",
    },
  },
  {
    slug: "what-does-selah-mean",
    title: "What Does Selah Mean in the Bible?",
    description:
      "What does Selah mean in the Bible? Why it appears 74 times in Psalms, what it likely means, and how it teaches you to pause and reflect as you read.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/what-does-selah-mean",
    publishedAt: "2026-08-27",
    readTime: "16 min read",
    image: "/blog-banners/what-does-selah-mean.jpg",
    groupPost: {
      title: "What Does Selah Mean in the Bible? 📖",
      content:
        "You're reading the Psalms.\nThen you hit it. Selah.\nNo explanation. So you skip it.\n\n📌 That word shows up 74 times, and it's not filler.\n\n📖 It only appears in worship and prayer.\n📖 It likely means pause, or lift up.\n📖 It marks the exact spot to stop and feel the verse.\n\nNew article on:\n🟢 what **Selah** most likely means\n🟢 why it shows up right where **David** was most honest\n🟢 how to build the **pause** into your own reading\n\nDo you usually skip over words like this when you read? 🙏",
    },
  },
  {
    slug: "is-anxiety-a-sin",
    title: "Is Anxiety a Sin? What the Bible Actually Teaches",
    description:
      "Is anxiety a sin? A pastoral, Bible based answer that separates temptation from sin, including what Jesus felt in Gethsemane, and where anxiety can actually cross a line.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/is-anxiety-a-sin",
    publishedAt: "2026-08-23",
    readTime: "15 min read",
    image: "/blog-banners/is-anxiety-a-sin.jpg",
    groupPost: {
      title: "Is Anxiety a Sin? 📖",
      content:
        "Somebody told you anxiety is a sin.\nNow you're carrying the fear, plus the guilt for having it.\n\n📌 Here's the truth: a feeling is not the same as a sin.\n\n📖 Jesus was in anguish in Gethsemane.\n📖 His sweat fell like drops of blood.\n📖 Scripture calls Him without sin the whole time.\n\nNew article on:\n🟢 the real **difference between temptation and sin**\n🟢 where anxiety can actually **cross a line**\n🟢 what God asks of you instead of **shame**\n\nHave you ever been told anxiety means weak faith? 🙏",
    },
  },
  {
    slug: "what-does-the-bible-say-about-fear",
    title: "What Does the Bible Say About Fear?",
    description:
      "What does the Bible say about fear? Why God repeats fear not so often, the difference between fear and faith, and the top Bible verses about fear.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-does-the-bible-say-about-fear",
    publishedAt: "2026-08-22",
    readTime: "16 min read",
    image: "/blog-banners/what-does-the-bible-say-about-fear.jpg",
    groupPost: {
      title: "What Does the Bible Say About Fear? 📖",
      content:
        "Fear does not knock first.\nIt shows up at 3am. In the waiting room. When the phone rings at the wrong hour.\n\n📌 The Bible never scolds the afraid. It meets them.\n\n📖 Moses was afraid.\n📖 The disciples were afraid in the storm.\n📖 Peter was afraid with his feet still on the water.\n\nNew article on:\n🟢 why **fear not** is one of God's most repeated commands\n🟢 the real difference between **fear and faith**\n🟢 the verses to hold onto when fear is loudest\n\nWhat verse helps you most when you're afraid? 🙏",
    },
  },
  {
    slug: "how-to-spend-1-hour-with-god",
    title: "How to Spend 1 Hour With God: A Simple Guide",
    description:
      "A simple hour-by-hour plan for spending real time with God: settle your heart, worship, read Scripture, pray and listen, then close in gratitude.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/how-to-spend-1-hour-with-god",
    publishedAt: "2026-08-16",
    readTime: "16 min read",
    image: "/blog-banners/how-to-spend-1-hour-with-god.jpg",
    groupPost: {
      title: "How to Spend 1 Hour With God: A Simple Guide 📖",
      content:
        "You want to spend time with God. You just don't know what that hour is supposed to look like once you sit down.\n\n📌 New article breaks it into 5 simple parts for one full hour: settle your heart, worship, read the Word, pray and listen, then close in gratitude.\n\nEach part comes with the verses behind it and exactly how many minutes to spend there.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/how-to-spend-1-hour-with-god\n\nWhich part of spending time with God is hardest for you to stick with? 🙏",
    },
  },
  {
    slug: "can-you-lose-your-salvation",
    title: "Can You Lose Your Salvation? What the Bible Says",
    description:
      "Can you lose your salvation? The Bible verses on both sides explained honestly, where sincere Christians disagree, and how to find real assurance in Christ.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/can-you-lose-your-salvation",
    publishedAt: "2026-08-15",
    readTime: "23 min read",
    image: "/blog-banners/can-you-lose-your-salvation.jpg",
    groupPost: {
      title: "Can You Lose Your Salvation? What the Bible Says 📖",
      content:
        "You did the thing again.\n\nThe sin you promised God you were done with. And now there's a voice asking: can you lose your salvation over this?\n\n📌 Here's the honest truth: sincere, Bible believing Christians read the same verses and land in different places on this one. I'm not going to pretend otherwise.\n\nNew article walking through the promises (John 10:28-29, Romans 8:38-39), the warnings (Hebrews 6:4-6, Hebrews 10:26-27), where good Christians honestly disagree, and where your assurance is actually supposed to rest.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/can-you-lose-your-salvation\n\nWhere do you land on this one, and why? 🙏",
    },
  },
  {
    slug: "what-is-the-fruit-of-the-spirit",
    title: "What Is the Fruit of the Spirit? All 9 Explained",
    description:
      "What is the fruit of the Spirit? All 9 parts from Galatians 5:22-23 explained, why it is fruit singular not a menu to pick from, and how it actually grows.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-is-the-fruit-of-the-spirit",
    publishedAt: "2026-08-12",
    readTime: "16 min read",
    image: "/blog-banners/what-is-the-fruit-of-the-spirit.jpg",
    groupPost: {
      title: "What Is the Fruit of the Spirit? All 9 Explained 📖",
      content:
        "You know the list.\n\nLove, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self control.\n\n📌 Here's what most people miss: in Galatians 5 it's fruit, singular. One fruit with nine parts, not a menu where you get to pick your favorites and skip the rest.\n\nNew article walking through all 9 parts straight from the King James Version, one at a time, plus how the fruit actually grows in a real, imperfect life (hint: it's not by trying harder).\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/what-is-the-fruit-of-the-spirit\n\nWhich one of the 9 is hardest for you to grow? 🙏",
    },
  },
  {
    slug: "what-does-the-bible-say-about-zodiac-signs",
    title: "What Does the Bible Say About Zodiac Signs?",
    description:
      "What does the Bible say about zodiac signs? The real reason God warns against astrology, and what to do if you love your horoscope.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-does-the-bible-say-about-zodiac-signs",
    publishedAt: "2026-08-09",
    readTime: "17 min read",
    image: "/blog-banners/what-does-the-bible-say-about-zodiac-signs.jpg",
    groupPost: {
      title: "What Does the Bible Say About Zodiac Signs? 📖",
      content:
        "You know your sign.\n\nYou've read your horoscope before your coffee finished brewing. Maybe you check it for fun. Maybe more than that.\n\n📌 Most Christians have never been told this: astrology is one of the only practices Scripture names directly and calls an abomination. Not because God wants you to have less fun - because of where it sends you looking for answers.\n\nNew article on what the Bible actually says about zodiac signs, why the wise men following a star to Jesus is the opposite of astrology, and what to do if you've been into your sign without ever thinking twice about it.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/what-does-the-bible-say-about-zodiac-signs\n\nDid you grow up checking your horoscope? What changed for you? 🙏",
    },
  },
  {
    slug: "who-is-leah",
    title: "Who Is Leah? The Wife Her Husband Didn't Want",
    description:
      "Leah was the unloved wife of Jacob - but God saw her. Her story in Genesis 29 is for everyone who has ever felt overlooked, second-best, or unwanted.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-is-leah",
    legacyPath: "/bible-study-hub/character-studies/who-is-leah",
    publishedAt: "2026-08-07",
    readTime: "7 min read",
    image: "/blog-banners/who-is-leah.jpg",
    groupPost: {
      title: "Who Is Leah? The Wife Her Husband Didn't Want 📖",
      content:
        "Some people in the Bible get statues.\n\nLeah got a footnote.\n\nHer wedding was a trick. Her husband loved her sister. Her whole life, she was the one who wasn't chosen.\n\n📌 But God saw her - and the Messiah Himself came through her son, not her sister's.\n\nNew article on the woman who learned to say \"Now will I praise the LORD\" while her heart was still breaking.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/who-is-leah\n\nHave you ever felt overlooked like Leah? What helped you? 🙏",
    },
  },
  {
    slug: "who-is-jezebel",
    title: "Who Is Jezebel? The Queen Who Led Israel Into Idol Worship",
    description:
      "Jezebel was the queen who led Israel into Baal worship, hunted God's prophets, and defied God to the end. A warning about influence and compromise.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/who-is-jezebel",
    legacyPath: "/bible-study-hub/character-studies/who-is-jezebel",
    publishedAt: "2026-08-05",
    readTime: "7 min read",
    image: "/blog-banners/who-is-jezebel.jpg",
    groupPost: {
      title: "Who Is Jezebel? The Queen Who Led Israel Into Idol Worship 📖",
      content:
        "Her name is still an insult three thousand years later.\n\nBut most people can't tell you what she actually did.\n\n📌 Jezebel wasn't just a wicked queen. She was the most dangerous kind of influence: the kind that makes evil look normal.\n\nNew article on the queen who led a nation into idolatry, the prophet who stood against her, and why Jesus brought her name up again in Revelation.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/who-is-jezebel\n\nWho is influencing you - and who are you influencing? 🙏",
    },
  },
  {
    slug: "what-does-the-bible-say-about-anxiety",
    title: "What Does the Bible Say About Anxiety?",
    description:
      "What the Bible says about anxiety: what Jesus taught about worry, the top anxiety verses, and honest answers to the questions Christians actually ask.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-does-the-bible-say-about-anxiety",
    legacyPath: "/bible-study-hub/christian-foundations/what-does-the-bible-say-about-anxiety",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-09",
    readTime: "22 min read",
    image: "/blog-banners/what-does-the-bible-say-about-anxiety.jpg",
    groupPost: {
      title: "What Does the Bible Say About Anxiety? 📖",
      content:
        "Anxiety does not knock first.\n\nIt shows up in the middle of the night. Before the doctor calls back. When the bank account is low and the bills are not.\n\n📌 If you struggle with anxious thoughts, you are not a bad Christian. You are a human being.\n\nI just published a new article walking through what God's Word actually says about anxiety — what Jesus taught about worry, the promise in Philippians 4:6-7, and 6 practical ways to fight anxious thoughts with Scripture.\n\nRead it here:\nhttps://www.mybiblebuddy.net/blog/what-does-the-bible-say-about-anxiety\n\nWhich verse helps you most when you feel anxious? Share it below 🙏",
    },
  },
  {
    slug: "5-things-holding-men-back-from-god",
    title: "5 Things Holding Men Back From God",
    description: "A clear look at five common struggles that quietly pull men away from God and how Scripture calls us to fight back.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/5-things-holding-men-back-from-god",
    legacyPath: "/bible-study-hub/christian-foundations/5-things-holding-men-back-from-god",
    publishedAt: "2026-07-31",
    readTime: "16 min read",
    image: "/blog-banners/5-things-holding-men-back-from-god.jpg",
  },
  {
    slug: "how-to-defend-the-bible",
    title: "How to Defend the Bible",
    description: "How to respond when people say the Bible was changed, written by men, or fake.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/how-to-defend-the-bible",
    legacyPath: "/bible-study-hub/bible-insights/how-to-defend-the-bible",
    publishedAt: "2026-07-29",
    readTime: "8 min read",
    image: "/blog-banners/how-to-defend-the-bible.jpg",
  },
  {
    slug: "what-is-the-bible",
    title: "What Is the Bible?",
    description: "Understand the Bible's origin, structure, authors, and why it matters.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/what-is-the-bible",
    legacyPath: "/bible-study-hub/bible-insights/what-is-the-bible",
    publishedAt: "2026-07-27",
    readTime: "7 min read",
    image: "/blog-banners/what-is-the-bible.jpg",
  },
  {
    slug: "why-so-many-bible-translations",
    title: "Why So Many Bible Translations?",
    description: "Why the Bible has so many translations, what KJV, NIV, ESV, and NLT really mean, and how to pick one.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/why-so-many-bible-translations",
    legacyPath: "/bible-study-hub/bible-insights/why-so-many-bible-translations",
    publishedAt: "2026-07-24",
    readTime: "15 min read",
    image: "/blog-banners/why-so-many-bible-translations.jpg",
  },
  {
    slug: "why-bible-study-is-hard",
    title: "Why Bible Study Is Hard",
    description: "Five reasons studying the Bible can feel difficult and how to keep going.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/why-bible-study-is-hard",
    legacyPath: "/bible-study-tips/why-bible-study-is-hard",
    publishedAt: "2026-07-22",
    readTime: "7 min read",
    image: "/blog-banners/why-bible-study-is-hard.jpg",
  },
  {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible: A Simple Way to Study Scripture So It Actually Sticks",
    description: "Reading the Bible and understanding it are not the same thing. A simple, practical way to study Scripture so it actually sticks, starting tonight.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/how-to-read-the-bible",
    legacyPath: "/bible-study-tips/how-to-read-the-bible",
    publishedAt: "2026-07-20",
    updatedAt: "2026-09-17",
    readTime: "16 min read",
    image: "/blog-banners/how-to-read-the-bible.jpg",
  },
  {
    slug: "a-simple-bible-highlighting-system",
    title: "A Simple Bible Highlighting System",
    description:
      "A simple four color Bible highlighting system, with a real verse by verse walkthrough of John 3:16 and Psalm 23, so your highlights actually mean something later.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/a-simple-bible-highlighting-system",
    legacyPath: "/bible-study-tips/a-simple-bible-highlighting-system",
    publishedAt: "2026-07-17",
    readTime: "17 min read",
    image: "/blog-banners/a-simple-bible-highlighting-system.jpg",
  },
  {
    slug: "what-is-hell",
    title: "What Is Hell?",
    description:
      "What the Bible actually says about Sheol, Hades, Gehenna, and the lake of fire, and how it should change the way you live.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-is-hell",
    legacyPath: "/bible-study-hub/christian-foundations/what-is-hell",
    publishedAt: "2026-07-15",
    readTime: "18 min read",
    image: "/blog-banners/what-is-hell.jpg",
  },
  {
    slug: "what-is-heaven",
    title: "What Is Heaven?",
    description: "A clear look at what the Bible teaches about heaven.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-is-heaven",
    legacyPath: "/bible-study-hub/christian-foundations/what-is-heaven",
    publishedAt: "2026-07-13",
    readTime: "7 min read",
    image: "/blog-banners/what-is-heaven.jpg",
  },
  {
    slug: "why-so-many-denominations",
    title: "Why So Many Denominations?",
    description: "The real history behind Christian denominations, why they split, and how to choose a church home without picking a fight.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/why-so-many-denominations",
    legacyPath: "/bible-study-hub/christian-foundations/why-so-many-denominations",
    publishedAt: "2026-07-10",
    readTime: "16 min read",
    image: "/blog-banners/why-so-many-denominations.jpg",
  },
  {
    slug: "your-body-is-a-temple",
    title: "Your Body Is a Temple",
    description: "1 Corinthians 6:19-20 explained with the history and culture behind Corinth.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/your-body-is-a-temple",
    legacyPath: "/bible-study-hub/verse-breakdowns/your-body-is-a-temple",
    publishedAt: "2026-07-08",
    readTime: "12 min read",
    image: "/blog-banners/your-body-is-a-temple.jpg",
  },
  {
    slug: "building-self-control",
    title: "Building Self Control",
    description: "Proverbs 25:28 explained for real life and spiritual discipline.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/building-self-control",
    legacyPath: "/bible-study-hub/verse-breakdowns/building-self-control",
    publishedAt: "2026-07-06",
    readTime: "6 min read",
    image: "/blog-banners/building-self-control.jpg",
  },
  {
    slug: "salt-and-light",
    title: "Salt and Light",
    description: "Matthew 5:13-16 explained in a way that is clear and practical.",
    category: "Verse Breakdowns",
    categorySlug: "verse-breakdowns",
    canonicalPath: "/blog/salt-and-light",
    legacyPath: "/bible-study-hub/verse-breakdowns/salt-and-light",
    publishedAt: "2026-07-03",
    readTime: "6 min read",
    image: "/blog-banners/salt-and-light.jpg",
  },
  {
    slug: "luke",
    title: "Luke",
    description: "The Gentile doctor, Gospel writer, and companion of Paul.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/luke",
    legacyPath: "/bible-study-hub/character-studies/luke",
    publishedAt: "2026-07-01",
    readTime: "7 min read",
    image: "/blog-banners/luke.jpg",
  },
  {
    slug: "moses",
    title: "Moses",
    description: "The man God drew out to draw His people out.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/moses",
    legacyPath: "/bible-study-hub/character-studies/moses",
    publishedAt: "2026-06-29",
    readTime: "7 min read",
    image: "/blog-banners/moses.jpg",
  },
  {
    slug: "paul",
    title: "Paul",
    description: "From persecutor to missionary apostle.",
    category: "Character Studies",
    categorySlug: "character-studies",
    canonicalPath: "/blog/paul",
    legacyPath: "/bible-study-hub/character-studies/paul",
    publishedAt: "2026-06-26",
    readTime: "7 min read",
    image: "/blog-banners/paul.jpg",
  },
  {
    slug: "the-man-who-legalized-christianity",
    title: "The Man Who Legalized Christianity",
    description: "Constantine and the turning point of the Church.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/blog/the-man-who-legalized-christianity",
    legacyPath: "/bible-study-hub/christian-history/the-man-who-legalized-christianity",
    publishedAt: "2026-06-24",
    readTime: "8 min read",
    image: "/blog-banners/the-man-who-legalized-christianity.jpg",
  },
  {
    slug: "st-patrick",
    title: "St. Patrick",
    description: "The story of the man connected with bringing Christianity to Ireland.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/blog/st-patrick",
    legacyPath: "/bible-study-hub/christian-history/st-patrick",
    publishedAt: "2026-06-22",
    readTime: "8 min read",
    image: "/blog-banners/st-patrick.jpg",
  },
  {
    slug: "st-valentine",
    title: "St. Valentine",
    description:
      "Was St. Valentine a real person? The honest history behind Valentine's Day: what is verified, what is legend, and what his martyrdom says about love that costs something.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/blog/st-valentine",
    legacyPath: "/bible-study-hub/christian-history/st-valentine",
    publishedAt: "2026-06-19",
    readTime: "15 min read",
    image: "/blog-banners/st-valentine.jpg",
  },
];

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug) || null;
}

// Single source of truth for per-post SEO tags. Every /blog/<slug> page
// exports `metadata = buildBlogArticleMetadata("<slug>")` so titles,
// descriptions, canonicals, and share cards can never drift back to the
// generic site-wide defaults. Overrides are for pages whose on-page title
// is intentionally richer than the listing title.
export function buildBlogArticleMetadata(
  slug: string,
  overrides?: { title?: string; description?: string },
) {
  const article = getBlogArticle(slug);
  if (!article) return { title: "Blog Article | Bible Buddy" };

  const title = overrides?.title ?? article.title;
  const description = overrides?.description ?? article.description;
  const url = `/blog/${article.slug}`;

  return {
    title: `${title} | Bible Buddy`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article" as const,
      images: [{ url: article.image, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [article.image],
    },
  };
}

// Database key for likes/comments/views. Migrated posts keep their old
// path so existing engagement rows still match; new posts key by /blog URL.
export function getArticleEngagementKey(article: BlogArticle) {
  return article.legacyPath ?? `/blog/${article.slug}`;
}

export function getBlogCategory(slug: string) {
  return BLOG_CATEGORIES.find((category) => category.slug === slug) || null;
}

export function getArticlesByCategory(categorySlug: string) {
  return BLOG_ARTICLES.filter((article) => article.categorySlug === categorySlug);
}
