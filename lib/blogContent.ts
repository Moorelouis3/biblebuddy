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
];

export const BLOG_ARTICLES: BlogArticle[] = [
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
    image: "/could-you-sacrifice-your-isaac-banner.png",
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
    image: "/how-god-heals-a-lust-damaged-heart-banner.png",
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
    image: "/genesis-1-1-2-explained-banner.png",
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
    image: "/is-wanting-money-a-sin-banner.png",
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
    image: "/why-does-god-allow-suffering-banner.png",
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
    image: "/how-do-we-know-the-bible-is-true-banner.png",
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
    image: "/is-jesus-the-only-way-to-god-banner.png",
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
    image: "/are-there-contradictions-in-the-bible-banner.png",
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
    image: "/christian-and-science-banner.png",
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
    image: "/people-who-never-heard-of-jesus-banner.png",
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
    image: "/why-does-god-feel-silent-banner.png",
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
    image: "/did-jesus-really-exist-banner.png",
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
    image: "/how-do-you-know-you-are-saved-banner.png",
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
    image: "/defend-your-faith-banner.png",
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
    image: "/Whatisthebiblebanner.png",
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
    image: "/anxietyarticlebanner.jpg",
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
    image: "/fear-banner.png",
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
    image: "/one-hour-banner.png",
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
    image: "/salvation-banner.png",
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
    image: "/fruit-banner.png",
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
    image: "/zodiac-banner.png",
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
    image: "/leahbanner.jpg",
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
    image: "/jezebelbanner.jpg",
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
    image: "/anxietyarticlebanner.jpg",
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
    readTime: "7 min read",
    image: "/5thingsholdingmenback.png",
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
    image: "/Defenthebiblebanner.png",
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
    image: "/Whatisthebiblebanner.png",
  },
  {
    slug: "why-so-many-bible-translations",
    title: "Why So Many Bible Translations?",
    description: "A simple guide to understanding modern Bible versions.",
    category: "Bible Insights",
    categorySlug: "bible-insights",
    canonicalPath: "/blog/why-so-many-bible-translations",
    legacyPath: "/bible-study-hub/bible-insights/why-so-many-bible-translations",
    publishedAt: "2026-07-24",
    readTime: "6 min read",
    image: "/Translationsbanner.png",
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
    image: "/Biblestudyhardbanner.png",
  },
  {
    slug: "how-to-read-the-bible",
    title: "How to Read the Bible",
    description: "A simple way to read Scripture with understanding instead of just checking a box.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/how-to-read-the-bible",
    legacyPath: "/bible-study-tips/how-to-read-the-bible",
    publishedAt: "2026-07-20",
    readTime: "8 min read",
    image: "/Biblereadingbanner.png",
  },
  {
    slug: "a-simple-bible-highlighting-system",
    title: "A Simple Bible Highlighting System",
    description: "How to highlight Scripture with purpose so your notes actually help you study.",
    category: "Bible Study Tips",
    categorySlug: "bible-study-tips",
    canonicalPath: "/blog/a-simple-bible-highlighting-system",
    legacyPath: "/bible-study-tips/a-simple-bible-highlighting-system",
    publishedAt: "2026-07-17",
    readTime: "5 min read",
    image: "/Biblehighlightingbanner.png",
  },
  {
    slug: "what-is-hell",
    title: "What Is Hell?",
    description: "A biblical explanation of hell without confusion or shallow answers.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/what-is-hell",
    legacyPath: "/bible-study-hub/christian-foundations/what-is-hell",
    publishedAt: "2026-07-15",
    readTime: "8 min read",
    image: "/Whatishell.png",
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
    image: "/Whatisheaven.png",
  },
  {
    slug: "why-so-many-denominations",
    title: "Why So Many Denominations?",
    description: "Understanding Christian divisions and why so many church traditions exist.",
    category: "Christian Foundations",
    categorySlug: "christian-foundations",
    canonicalPath: "/blog/why-so-many-denominations",
    legacyPath: "/bible-study-hub/christian-foundations/why-so-many-denominations",
    publishedAt: "2026-07-10",
    readTime: "8 min read",
    image: "/Whydenominations.png",
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
    image: "/Bodytemplebanner.png",
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
    image: "/Selfcontrolbanner.png",
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
    image: "/Saltearthbanner.png",
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
    image: "/Lukebanner.png",
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
    image: "/Mosesbanner.png",
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
    image: "/Paulbanner.png",
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
    image: "/Legalized.png",
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
    readTime: "6 min read",
    image: "/Irelandbanner.png",
  },
  {
    slug: "st-valentine",
    title: "St. Valentine",
    description: "The martyr behind the modern holiday.",
    category: "Christian History",
    categorySlug: "christian-history",
    canonicalPath: "/blog/st-valentine",
    legacyPath: "/bible-study-hub/christian-history/st-valentine",
    publishedAt: "2026-06-19",
    readTime: "6 min read",
    image: "/Valentinebanner.png",
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
