// lib/seriesContent.ts
// Hardcoded content for "The Temptation of Jesus" 5-week series

export interface SeriesTriviaQuestion {
  id: string;
  question: string;
  options: { label: "A" | "B" | "C" | "D"; text: string }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface SeriesWeekLesson {
  weekNumber: number;
  title: string;
  subtitle: string;
  readingReference: string;
  readingApiQuery: string; // passed to bible-api.com
  intro: string; // paragraphs separated by \n\n; **Header** = bold heading
  triviaQuestions: SeriesTriviaQuestion[];
  reflectionQuestion: string;
}

export const TEMPTATION_OF_JESUS: SeriesWeekLesson[] = [
  {
    weekNumber: 1,
    title: "Into the Wilderness",
    subtitle: "Preparation before the battle",
    readingReference: "Luke 4:1–2",
    readingApiQuery: "luke+4:1-2",
    reflectionQuestion:
      "Before Jesus faced the devil in the wilderness, He was baptized — not because He needed cleansing, but to fully identify with us and fulfill God's plan. What stands out to you most about Jesus' baptism? What does His obedience in that moment teach you about your own walk with God?",

    intro: `This is one of my favorite stories in the whole Bible.

**Why?**

Because it shows us the only person who ever faced the devil head-on and walked away undefeated.

Jesus didn't argue.
He didn't flex His power.
He didn't compromise.

👉 He answered every temptation with **"It is written…"**

That's why this story matters so much. It's not just Jesus' story — it's our **blueprint**.

## Why Luke's Version Hits Different

The temptation story shows up in three Gospels: Matthew, Mark, and Luke. Mark barely gives two verses. Matthew gives more detail.

But Luke? Luke's account is my favorite.

Here's why. Luke tells you up front what he's doing:

> "I myself have carefully investigated everything from the beginning… so that you may know the certainty of the things you've been taught." — Luke 1:3–4

Luke wasn't guessing. He was investigating.

📌 **Quick facts about Luke:**

- 🩺 He was a **doctor** (Colossians 4:14).
- ✈️ He traveled with Paul — you can see the narration switch from "they" to "we" in Acts 16:10.
- 🌍 He was likely a **Gentile**, so he explains Jewish customs for readers who didn't grow up with Torah.
- 📄 By word count, **Luke + Acts** make him the largest contributor to the NT.
- 🕊️ His Gospel is Spirit-led. Jesus promised the Spirit would guide the apostles to all truth (John 16:13).

## Eighteen Years of Silence

Luke doesn't jump straight into the desert. He shows us who Jesus was becoming.

When Jesus was twelve years old, His family traveled from Nazareth to Jerusalem for the Passover festival.

👉 **What's Passover?**

- 📖 It celebrated how God "passed over" the houses of Israel in Egypt during the final plague (Exodus 12).
- 🧑 All Jewish men were required by law to attend the feast in Jerusalem.
- 🚶 Families traveled in big caravans — extended relatives, neighbors, sometimes 80–100 people.
- 📖 Distance: about **65–70 miles** from Nazareth → Jerusalem = 3–5 days on foot.

So Joseph, Mary, and Jesus make the journey. They celebrate Passover, then the family packs up to return home. But one night on the way back, they realize something terrifying: **Jesus isn't there.**

They searched for three days. They found Him in the Temple — not lost, not hiding — but discussing Scripture with the teachers.

> "Everyone who heard Him was amazed at His understanding and His answers." — Luke 2:47

Mary, exhausted, asks: "Son, why have You treated us like this? We've been anxiously searching for You!"

And Jesus responds with a line that sums up His entire mission:

> "Didn't you know I had to be in My Father's house?" — Luke 2:49

That's the last recorded thing He says until He's thirty. **Eighteen years of silence.** No miracles. No crowds.

Just obedience and preparation. But that one sentence already shows us who He knew Himself to be: the Son, walking in His Father's will.

## John the Baptist: The Voice in the Desert

Before Jesus stepped into public ministry, someone had to prepare the way.

John the Baptist was that man. He and Jesus were family — Elizabeth (John's mother) was a relative of Mary (Luke 1:36). Even before birth, when pregnant Mary visited Elizabeth, John leaped in the womb in recognition of Jesus (Luke 1:41).

John's whole life had one mission: *"Prepare the way of the Lord."*

He preached in the desert, confronted crowds and religious leaders alike, and called everyone to real repentance. He didn't try to blend in.

## The Baptism That Opened Heaven

When Jesus finally stepped into public ministry at thirty years old, He didn't start with a sermon. He started with baptism.

John tried to refuse. But Jesus insisted — He needed to "fulfill all righteousness" (Matthew 3:15). He wasn't baptized because He needed cleansing. He stepped into the water to fully identify with us and to launch His public ministry.

The moment He came up from the water, heaven opened:

> "You are my Son, whom I love; with You I am well pleased." — Luke 3:22

Father, Son, and Holy Spirit — all present in one extraordinary moment.

## Led Into the Wilderness

Instead of applause, the Spirit led Jesus straight into the desert.

> "Jesus, full of the Holy Spirit, left the Jordan and was led by the Spirit into the wilderness, where for forty days He was tempted by the devil. He ate nothing during those days, and at the end of them He was hungry." — Luke 4:1–2

Notice two things:

- He was *full of the Spirit*
- He was *led* — not wandering, not running. Purposefully directed.

The number **forty** echoes throughout Scripture as a pattern of testing and preparation:

- 🌊 40 days of rain for Noah
- ⛰️ 40 days for Moses on Sinai
- 🏜️ 40 years for Israel in the wilderness

Every time, something was being **forged**.

The enemy waited until Jesus was at His weakest — hungry, alone, at the end of forty days. That is how temptation operates. It does not arrive when you are strong. **It waits for the cracks.**

These two verses carry the weight of everything that came before — the baptism, the years of preparation, the Father's declaration. Read them slowly. That changes how we think about our own wilderness seasons.`,

    triviaQuestions: [
      {
        id: "w1q1",
        question: "According to Luke 4:1, what was Jesus full of when He was led into the wilderness?",
        options: [
          { label: "A", text: "Faith and courage" },
          { label: "B", text: "The Holy Spirit" },
          { label: "C", text: "Prayer and fasting" },
          { label: "D", text: "Joy and peace" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:1 states: 'Jesus, full of the Holy Spirit, left the Jordan and was led by the Spirit into the wilderness.'",
      },
      {
        id: "w1q2",
        question: "How many days did Jesus spend in the wilderness being tempted?",
        options: [
          { label: "A", text: "7 days" },
          { label: "B", text: "30 days" },
          { label: "C", text: "40 days" },
          { label: "D", text: "3 days" },
        ],
        correctAnswer: "C",
        explanation: "Luke 4:2 records that Jesus was in the wilderness for forty days.",
      },
      {
        id: "w1q3",
        question: "Who led Jesus into the wilderness according to Luke 4:1?",
        options: [
          { label: "A", text: "John the Baptist" },
          { label: "B", text: "An angel" },
          { label: "C", text: "The Holy Spirit" },
          { label: "D", text: "The Father" },
        ],
        correctAnswer: "C",
        explanation: "Luke 4:1 says Jesus 'was led by the Spirit into the wilderness.'",
      },
      {
        id: "w1q4",
        question: "What did Jesus eat during His forty days in the wilderness?",
        options: [
          { label: "A", text: "Bread and water" },
          { label: "B", text: "Locusts and honey" },
          { label: "C", text: "Manna from heaven" },
          { label: "D", text: "Nothing — He fasted the entire time" },
        ],
        correctAnswer: "D",
        explanation: "Luke 4:2 says 'He ate nothing during those days, and at the end of them He was hungry.'",
      },
      {
        id: "w1q5",
        question: "From where did Jesus depart just before being led into the wilderness?",
        options: [
          { label: "A", text: "Nazareth" },
          { label: "B", text: "Jerusalem" },
          { label: "C", text: "The Jordan River" },
          { label: "D", text: "Galilee" },
        ],
        correctAnswer: "C",
        explanation: "Luke 4:1 states Jesus 'left the Jordan and was led by the Spirit into the wilderness.'",
      },
      {
        id: "w1q6",
        question: "What was Luke's profession that makes his investigative approach unique?",
        options: [
          { label: "A", text: "A fisherman" },
          { label: "B", text: "A tax collector" },
          { label: "C", text: "A doctor" },
          { label: "D", text: "A carpenter" },
        ],
        correctAnswer: "C",
        explanation: "Colossians 4:14 calls Luke 'the beloved physician.' He traveled with Paul and carefully investigated his Gospel from eyewitness accounts.",
      },
      {
        id: "w1q7",
        question: "What happened immediately after Jesus was baptized in the Jordan?",
        options: [
          { label: "A", text: "He began preaching to the crowd" },
          { label: "B", text: "The Spirit descended like a dove and the Father spoke from heaven" },
          { label: "C", text: "John anointed Him with oil" },
          { label: "D", text: "The crowd proclaimed Him king" },
        ],
        correctAnswer: "B",
        explanation: "Luke 3:22 records the Spirit descending like a dove and the Father declaring, 'You are my Son, whom I love; with You I am well pleased.'",
      },
      {
        id: "w1q8",
        question: "How old was Jesus when He amazed the teachers in the Jerusalem Temple?",
        options: [
          { label: "A", text: "8 years old" },
          { label: "B", text: "10 years old" },
          { label: "C", text: "12 years old" },
          { label: "D", text: "18 years old" },
        ],
        correctAnswer: "C",
        explanation: "Luke 2:42 records that Jesus was twelve years old when His family traveled to Jerusalem and He stayed behind in the Temple.",
      },
      {
        id: "w1q9",
        question: "How are Jesus and John the Baptist related?",
        options: [
          { label: "A", text: "Brothers" },
          { label: "B", text: "No relation — John was a stranger" },
          { label: "C", text: "Cousins — their mothers were relatives" },
          { label: "D", text: "Teacher and student" },
        ],
        correctAnswer: "C",
        explanation: "Luke 1:36 calls Elizabeth a 'relative' of Mary, making Jesus and John cousins. Even before birth, John recognized Jesus and leaped in Elizabeth's womb (Luke 1:41).",
      },
      {
        id: "w1q10",
        question: "In Scripture, what theme does the number forty consistently represent?",
        options: [
          { label: "A", text: "Celebration and blessing" },
          { label: "B", text: "Mourning and grief" },
          { label: "C", text: "Sabbath rest and peace" },
          { label: "D", text: "Testing and preparation" },
        ],
        correctAnswer: "D",
        explanation: "The pattern repeats throughout Scripture: Noah's 40 days of rain, Moses' 40 days on Sinai, Israel's 40 years in the wilderness. Every instance marks a season where something is being forged through testing.",
      },
    ],
  },
  {
    weekNumber: 2,
    title: "Bread From Stones",
    subtitle: "The temptation of the flesh",
    readingReference: "Luke 4:3–4",
    readingApiQuery: "luke+4:3-4",
    reflectionQuestion:
      "When the devil tempted Jesus to turn stones into bread, he was appealing to His physical hunger — the lust of the flesh. But Jesus refused to satisfy a real need in a wrong way. What "stones" has the enemy been trying to get you to turn into "bread"? In other words — what desires, habits, or fleshly cravings have been pulling you away from trusting God's timing and provision?",

    intro: `In Part 1, we set the stage.

We looked at Jesus as a 12-year-old in the Temple, His baptism in the Jordan, the Trinity showing up all at once, and the Spirit leading Him into the wilderness.

Now in Part 2, we finally get to the **first temptation** itself. The devil waits until Jesus is at His weakest — and then goes straight for His flesh.

Let's walk through it.

## 🌵 Why Did Jesus Go Into the Wilderness?

Luke writes:

> "And Jesus, full of the Holy Spirit, returned from the Jordan and was led by the Spirit in the wilderness, for forty days, being tempted by the devil. And He ate nothing during those days. And when they were ended, He was hungry." — Luke 4:1–2

Here's the thing: Jesus didn't just wander into the wilderness. **He was led there by the Spirit.**

This wasn't a vacation. It wasn't downtime after baptism. It was a mission.

👉 In the Bible, the wilderness is always a testing ground:

- 🌿 **John the Baptist** lived in the wilderness until his ministry began (Luke 1:80).
- 🔼 **Moses** spent 40 years there with Israel.
- 🔥 **Elijah** met God in the wilderness.
- 🎯 **David** hid in the wilderness when Saul was chasing him.

The wilderness is where God strips away comfort and builds character. It's where He forges people for their calling.

**Here are 2 big reasons Jesus was led into the wilderness:**

1. **To fully live the human experience.** He came to walk the same road we walk and show us how to endure temptation God's way. Where Israel failed for 40 years, Jesus would succeed in 40 days.

2. **To prove the devil can be defeated.** Not by raw willpower — but by total dependence on God.

This wasn't a detour. It was preparation — for ministry, for mission, and for us.

## 🐍 The Devil Waits for Weakness

Matthew adds an important detail:

> "After fasting forty days and forty nights, He was hungry. And the tempter came and said to Him…" — Matthew 4:2–3

Notice: **the devil doesn't show up on Day 1.**

He waits until Jesus is weak, hungry, and at His lowest point.

That's how temptation works with us, too. It waits. It lurks. It hits hardest when your guard is down.

Think about it:

- You start a new diet. Morning is fine. Afternoon is fine. But late at night, when you're tired — that's when the craving screams.
- You swear off a bad habit. You're solid all day. But then you're alone, the house is quiet, and the whispers start.

The devil doesn't rush. He's patient. He waits until you're empty, tired, and distracted. **Then he whispers.**

That's exactly what happened to Jesus.

## 🍞 The First Temptation

Luke writes:

> "The devil said to Him, 'If you are the Son of God, command this stone to become bread.'" — Luke 4:3

On the surface, it sounds harmless. Jesus is starving. Bread would help. Why not?

But this is **deeper than food.**

The devil starts with: *"If you are the Son of God…"*

In the Greek, that "if" really means **"since."** In other words:

> "Since You're God's Son, why suffer? Use Your power. Fix this Yourself."

👉 **This is the temptation of the flesh.**

- Your stomach says, "I need this."
- Your body says, "Just one hit."
- Your feelings say, "I deserve this."

But it's a lie. **The flesh exaggerates need and minimizes cost.**

Paul said:

> "The mind governed by the flesh is hostile to God." — Romans 8:7

And that's exactly what the devil is pushing here:

- 🍞 Shortcut over trust.
- 🍞 Comfort over obedience.
- 🍞 Flesh over faith.

## 📖 Jesus' Response

Jesus doesn't argue. He doesn't debate. He fires back with Scripture:

> "It is written: Man shall not live by bread alone, but by every word that comes from the mouth of God." — Matthew 4:4

That's **Deuteronomy 8:3** — Moses speaking to Israel's children as they were about to enter the Promised Land.

The backstory:

- Israel complained about food in the wilderness.
- God provided manna — bread from heaven.
- Rule: only take enough for the day. If you tried to store it, it rotted.
- Why? It was **training** — to teach them to trust God daily.

But they still complained. They still doubted. They still built idols.

So Moses told their kids: *"It's not about bread. It's about obedience. Not about cravings. About trust."*

And Jesus throws that same Word right back at Satan:

> "Yes, I'm hungry. But I'd rather trust My Father's Word than feed My cravings."

🔥 **That's the blueprint.**

## 💡 What "Bread Alone" Means for Us

You can swap "bread" with anything:

- Weed. Porn. Control.
- Fear. Ego. Comfort.

Your flesh says, "I need this right now." But Jesus shows us — **no. What you really need is the Word of God.**

The flesh says: satisfy yourself. The Spirit says: trust God.

If Jesus had turned the stone into bread, He would've placed His flesh above His Father. But He didn't. He passed the test. And now He shows us how to do the same.

## 📝 Real Talk + Application

Here's what this first temptation teaches us:

- 👀 **The devil attacks your flesh first.**
- 🕰️ **He waits until you're weak.**
- 🍞 **He offers shortcuts that cost more later.**
- 📖 **The Word of God is your only real defense.**

So here's the question: **What "stone" in your life are you tempted to turn into bread?**

- That late-night scroll?
- That "one more" drink?
- That text thread you should've deleted?
- That easy shortcut instead of God's way?

👉 The way to fight it isn't more willpower. **It's more Word.** Fill yourself with Scripture before the temptation hits.

> "Trust in the LORD with all your heart, and lean not on your own understanding." — Proverbs 3:5

## 📌 Closing

Jesus was starving, weak, and alone — but He still **trusted the Father over His flesh.**

That's the pattern. That's how you fight back.

So whatever your craving is, don't believe the lie that you "need" it. **You need God more.**

- Not that late-night click.
- Not that text.
- Not that extra slice.
- Not that blunt.

**The Word > The craving.**

👣 **Next week in Part 3**, we'll look at the second temptation — when Satan shows Jesus all the kingdoms of the world and offers Him power and glory if He'll just bow down.`,

    triviaQuestions: [
      {
        id: "w2q1",
        question: "What did the devil challenge Jesus to turn into bread?",
        options: [
          { label: "A", text: "Sand" },
          { label: "B", text: "A stone" },
          { label: "C", text: "Water" },
          { label: "D", text: "Wood" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:3 records: 'The devil said to Him, If you are the Son of God, command this stone to become bread.'",
      },
      {
        id: "w2q2",
        question: "How long had Jesus fasted before the devil approached Him with the first temptation?",
        options: [
          { label: "A", text: "7 days and nights" },
          { label: "B", text: "30 days and nights" },
          { label: "C", text: "40 days and nights" },
          { label: "D", text: "3 days and nights" },
        ],
        correctAnswer: "C",
        explanation: "Matthew 4:2–3 says 'After fasting forty days and forty nights, He was hungry. And the tempter came…'",
      },
      {
        id: "w2q3",
        question: "Which Old Testament book did Jesus quote when He rebuked the first temptation?",
        options: [
          { label: "A", text: "Psalms" },
          { label: "B", text: "Proverbs" },
          { label: "C", text: "Isaiah" },
          { label: "D", text: "Deuteronomy" },
        ],
        correctAnswer: "D",
        explanation: "'Man shall not live by bread alone' is from Deuteronomy 8:3 — Moses speaking to Israel's children before they entered the Promised Land.",
      },
      {
        id: "w2q4",
        question: "What does Jesus' response to the first temptation tell us about how to fight temptation?",
        options: [
          { label: "A", text: "Use willpower and discipline" },
          { label: "B", text: "Argue back with logic" },
          { label: "C", text: "Fight with the Word of God" },
          { label: "D", text: "Walk away and stay silent" },
        ],
        correctAnswer: "C",
        explanation: "Jesus didn't argue or debate — He answered every temptation with 'It is written.' The Word of God is our primary weapon against temptation.",
      },
      {
        id: "w2q5",
        question: "According to the lesson, why did God give Israel manna in the wilderness one day at a time?",
        options: [
          { label: "A", text: "To conserve food and prevent waste" },
          { label: "B", text: "To train them to trust God daily" },
          { label: "C", text: "Because the manna would spoil within hours" },
          { label: "D", text: "To keep them from eating too much" },
        ],
        correctAnswer: "B",
        explanation: "The manna system was training — if Israel tried to store it, it rotted. God designed it to build daily dependence and trust in His provision.",
      },
      {
        id: "w2q6",
        question: "What is the significance of the Greek word 'if' in the devil's phrase 'If you are the Son of God'?",
        options: [
          { label: "A", text: "The devil was genuinely uncertain about Jesus' identity" },
          { label: "B", text: "In Greek, it actually means 'since' — the devil was acknowledging who Jesus was" },
          { label: "C", text: "It was a direct denial that Jesus was God's Son" },
          { label: "D", text: "It was a respectful question, not a challenge" },
        ],
        correctAnswer: "B",
        explanation: "In Greek, the 'if' used here carries the meaning of 'since.' The devil wasn't doubting Jesus' identity — he was using it as leverage: 'Since You are God's Son, why suffer? Use Your power.'",
      },
      {
        id: "w2q7",
        question: "What does Paul say about 'the mind governed by the flesh' in Romans 8:7?",
        options: [
          { label: "A", text: "It is weak but redeemable" },
          { label: "B", text: "It is hostile to God" },
          { label: "C", text: "It leads to confusion" },
          { label: "D", text: "It craves worldly things" },
        ],
        correctAnswer: "B",
        explanation: "Romans 8:7 states: 'The mind governed by the flesh is hostile to God.' The devil's first temptation was designed to get Jesus to govern Himself by flesh rather than faith.",
      },
      {
        id: "w2q8",
        question: "According to the lesson, why didn't the devil attack Jesus on Day 1 of the fast?",
        options: [
          { label: "A", text: "The devil needed time to prepare his strategy" },
          { label: "B", text: "He was afraid of the Holy Spirit at the start" },
          { label: "C", text: "He waited until Jesus was weak, hungry, and at His lowest point" },
          { label: "D", text: "He didn't know Jesus was in the wilderness until later" },
        ],
        correctAnswer: "C",
        explanation: "Matthew 4:2–3 shows the devil waited until after 40 days of fasting — when Jesus was at His weakest. That's how temptation works: it waits for the cracks.",
      },
      {
        id: "w2q9",
        question: "What is the core lie behind the temptation of the flesh, according to this lesson?",
        options: [
          { label: "A", text: "That God doesn't care about your needs" },
          { label: "B", text: "That the flesh exaggerates need and minimizes cost" },
          { label: "C", text: "That shortcuts are always sinful" },
          { label: "D", text: "That physical hunger is spiritually dangerous" },
        ],
        correctAnswer: "B",
        explanation: "The flesh exaggerates need ('I have to have this') and minimizes cost ('just this once won't hurt'). That's the lie behind every temptation of the flesh.",
      },
      {
        id: "w2q10",
        question: "In the wilderness, which of these figures did NOT encounter God or face a major test?",
        options: [
          { label: "A", text: "Elijah" },
          { label: "B", text: "David" },
          { label: "C", text: "Solomon" },
          { label: "D", text: "Moses" },
        ],
        correctAnswer: "C",
        explanation: "The lesson highlights John the Baptist, Moses, Elijah, and David as wilderness figures tested and forged by God. Solomon is not among them — his testing came through wealth and power, not the wilderness.",
      },
    ],
  },
  // Weeks 3–5 coming soon
];

export function getSeriesWeekLesson(weekNumber: number): SeriesWeekLesson | undefined {
  return TEMPTATION_OF_JESUS.find((w) => w.weekNumber === weekNumber);
}

export const TOTAL_WEEKS = 5;
