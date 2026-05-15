// lib/seriesContent.ts
// Hardcoded content for Bible study series

import { TESTING_OF_JOSEPH } from "./testingOfJosephSeries";

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
  notes?: string;
  triviaQuestions: SeriesTriviaQuestion[];
  reflectionQuestion: string;
}

export const TEMPTATION_OF_JESUS: SeriesWeekLesson[] = [
  {
    weekNumber: 1,
    title: "Into the Wilderness",
    subtitle: "Preparation before the battle",
    readingReference: "Luke 4:1â€“2",
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

> "I myself have carefully investigated everything from the beginning… so that you may know the certainty of the things you've been taught." — Luke 1:3â€“4

Luke wasn't guessing. He was investigating.

📌 **Quick facts about Luke:**

- ðŸ©º He was a **doctor** (Colossians 4:14).
- âœˆï¸ He traveled with Paul — you can see the narration switch from "they" to "we" in Acts 16:10.
- ðŸŒ He was likely a **Gentile**, so he explains Jewish customs for readers who didn't grow up with Torah.
- ðŸ“„ By word count, **Luke + Acts** make him the largest contributor to the NT.
- ðŸ•Šï¸ His Gospel is Spirit-led. Jesus promised the Spirit would guide the apostles to all truth (John 16:13).

## Eighteen Years of Silence

Luke doesn't jump straight into the desert. He shows us who Jesus was becoming.

When Jesus was twelve years old, His family traveled from Nazareth to Jerusalem for the Passover festival.

👉 **What's Passover?**

- 📖 It celebrated how God "passed over" the houses of Israel in Egypt during the final plague (Exodus 12).
- ðŸ§‘ All Jewish men were required by law to attend the feast in Jerusalem.
- ðŸš¶ Families traveled in big caravans — extended relatives, neighbors, sometimes 80â€“100 people.
- 📖 Distance: about **65â€“70 miles** from Nazareth â†’ Jerusalem = 3â€“5 days on foot.

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

> "Jesus, full of the Holy Spirit, left the Jordan and was led by the Spirit into the wilderness, where for forty days He was tempted by the devil. He ate nothing during those days, and at the end of them He was hungry." — Luke 4:1â€“2

Notice two things:

- He was *full of the Spirit*
- He was *led* — not wandering, not running. Purposefully directed.

The number **forty** echoes throughout Scripture as a pattern of testing and preparation:

- ðŸŒŠ 40 days of rain for Noah
- â›°ï¸ 40 days for Moses on Sinai
- ðŸœï¸ 40 years for Israel in the wilderness

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
    readingReference: "Luke 4:3â€“4",
    readingApiQuery: "luke+4:3-4",
    reflectionQuestion:
      "When the devil tempted Jesus to turn stones into bread, he was appealing to His physical hunger — the lust of the flesh. But Jesus refused to satisfy a real need in a wrong way. What \"stones\" has the enemy been trying to get you to turn into \"bread\"? In other words — what desires, habits, or fleshly cravings have been pulling you away from trusting God's timing and provision?",

    intro: `In Week 1, we set the stage.

We looked at Jesus as a 12-year-old in the Temple, His baptism in the Jordan, the Trinity showing up all at once, and the Spirit leading Him into the wilderness.

Now in Week 2, we finally get to the **first temptation** itself. The devil waits until Jesus is at His weakest — and then goes straight for His flesh.

Let's walk through it.

## ðŸŒµ Why Did Jesus Go Into the Wilderness?

Luke writes:

> "And Jesus, full of the Holy Spirit, returned from the Jordan and was led by the Spirit in the wilderness, for forty days, being tempted by the devil. And He ate nothing during those days. And when they were ended, He was hungry." — Luke 4:1â€“2

Here's the thing: Jesus didn't just wander into the wilderness. **He was led there by the Spirit.**

This wasn't a vacation. It wasn't downtime after baptism. It was a mission.

👉 In the Bible, the wilderness is always a testing ground:

- ðŸŒ¿ **John the Baptist** lived in the wilderness until his ministry began (Luke 1:80).
- ðŸ”¼ **Moses** spent 40 years there with Israel.
- 🔥 **Elijah** met God in the wilderness.
- ðŸŽ¯ **David** hid in the wilderness when Saul was chasing him.

The wilderness is where God strips away comfort and builds character. It's where He forges people for their calling.

**Here are 2 big reasons Jesus was led into the wilderness:**

1. **To fully live the human experience.** He came to walk the same road we walk and show us how to endure temptation God's way. Where Israel failed for 40 years, Jesus would succeed in 40 days.

2. **To prove the devil can be defeated.** Not by raw willpower — but by total dependence on God.

This wasn't a detour. It was preparation — for ministry, for mission, and for us.

## ðŸ The Devil Waits for Weakness

Matthew adds an important detail:

> "After fasting forty days and forty nights, He was hungry. And the tempter came and said to Him…" — Matthew 4:2â€“3

Notice: **the devil doesn't show up on Day 1.**

He waits until Jesus is weak, hungry, and at His lowest point.

That's how temptation works with us, too. It waits. It lurks. It hits hardest when your guard is down.

Think about it:

- You start a new diet. Morning is fine. Afternoon is fine. But late at night, when you're tired — that's when the craving screams.
- You swear off a bad habit. You're solid all day. But then you're alone, the house is quiet, and the whispers start.

The devil doesn't rush. He's patient. He waits until you're empty, tired, and distracted. **Then he whispers.**

That's exactly what happened to Jesus.

## ðŸž The First Temptation

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

- ðŸž Shortcut over trust.
- ðŸž Comfort over obedience.
- ðŸž Flesh over faith.

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

## ðŸ’¡ What "Bread Alone" Means for Us

You can swap "bread" with anything:

- Weed. Porn. Control.
- Fear. Ego. Comfort.

Your flesh says, "I need this right now." But Jesus shows us — **no. What you really need is the Word of God.**

The flesh says: satisfy yourself. The Spirit says: trust God.

If Jesus had turned the stone into bread, He would've placed His flesh above His Father. But He didn't. He passed the test. And now He shows us how to do the same.

## ðŸ“ Real Talk + Application

Here's what this first temptation teaches us:

- ðŸ‘€ **The devil attacks your flesh first.**
- ðŸ•°ï¸ **He waits until you're weak.**
- ðŸž **He offers shortcuts that cost more later.**
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

ðŸ‘£ **Next week in Week 3**, we'll look at the second temptation — when Satan shows Jesus all the kingdoms of the world and offers Him power and glory if He'll just bow down.`,

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
        explanation: "Matthew 4:2â€“3 says 'After fasting forty days and forty nights, He was hungry. And the tempter came…'",
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
        explanation: "Matthew 4:2â€“3 shows the devil waited until after 40 days of fasting — when Jesus was at His weakest. That's how temptation works: it waits for the cracks.",
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
  {
    weekNumber: 3,
    title: "The Crown Without the Cross",
    subtitle: "The temptation of ambition",
    readingReference: "Luke 4:5â€“8",
    readingApiQuery: "luke+4:5-8",
    reflectionQuestion:
      "The devil offered Jesus glory without obedience — a crown without the cross. He still works that way today, whispering 'take the easy road' or 'just one compromise.' Where in your life are you tempted to chase shortcuts instead of God's will? What would it look like to choose the cross over the crown this week?",

    intro: `In Week 2, we saw how the devil tempted Jesus through His flesh — hunger after 40 days of fasting.

It was about comfort, control, and quick fixes.

Jesus stood firm: "It is written..."

Now in Week 3, the devil changes his playbook.
This time, he's not coming for Jesus' stomach.

👉 He's coming for His **ambition**.

His calling.
His ego.

## 📖 The Second Temptation

> "The devil led him up to a high place and showed him in an instant all the kingdoms of the world. And he said to him, 'I will give you all their authority and splendor; it has been given to me, and I can give it to anyone I want to. If you worship me, it will all be yours.'" — Luke 4:5â€“7

Picture this moment:

- A high mountain or vision.
- All the kingdoms of the world flashing before Him.
- The throne, the crown, the stage.

The devil basically says:

ðŸ’¬ "Why go to the cross when you can have the crown now?"

This is the temptation of **shortcuts**.

âœ¨ Glory without obedience.
ðŸ‘‘ Power without sacrifice.
🏆 A crown without the cross.

## â“ Could Satan Really Offer That?

Let's pause. How could the devil even claim to give away kingdoms?

📌 Bible context:

- Called "the prince of this world" (John 12:31).
- Called "the god of this age" (2 Cor 4:4).
- He influences systems, cultures, and hearts apart from God.

âš ï¸ But he doesn't own them.

> "The earth is the Lord's, and everything in it." — Psalm 24:1

What Satan offers is always a counterfeit.
He flashes the blessing without mentioning the chains.

## ðŸ™‡ What Worship Really Means

The devil says: "If you worship me, it will all be yours."

But worship isn't just music on Sunday.
It's:

- Who you trust ðŸ›
- Who you obey ðŸ‘‚
- Who you center your life around ðŸ’“
- Who shapes your decisions âš–ï¸

👉 Whatever you bow to — even without your knees — that's your god.

The enemy was really saying:
"Switch loyalty. Skip obedience. Bow once, and I'll give you the world."

## ðŸ“œ Israel's Failure vs Jesus' Faithfulness

Jesus answers by quoting Deuteronomy 6:

> "Worship the Lord your God and serve Him only." — Luke 4:8

Moses told Israel the same thing as they entered the Promised Land: don't forget the One who brought you here.

But Israel failed that test —

- Golden calf in Exodus 32 ðŸ„
- Chasing the gods of Canaan 🔥
- Forgetting God once life got good ðŸ‡

Jesus succeeds where they fell.

He's rewriting the story — showing faithfulness in the wilderness where Israel showed rebellion.

## ðŸ‘€ How This Hits Us

This temptation comes through what we **see**.
The "lust of the eyes."

Think about it:

- ðŸ˜¡ Envy when someone else wins.
- ðŸ˜ Lust when scrolling late at night.
- ðŸ’¼ Chasing the bag at any cost.
- ðŸ“¸ Living for the applause, clout, or lifestyle.

And the devil's slick with it.
He won't say, "Bow to me."
He'll say:

- "Take the easy road, you deserve it."
- "Skip God's timing, I've got a shortcut."
- "Just one compromise, no one will notice."

It looks like a blessing...
But it's really a trap.

## ðŸ—¡ï¸ Jesus' Response

> "It is written: Worship the Lord your God and serve Him only." — Luke 4:8

No debates. No flexing power. No long speeches.

Just Scripture.
Just truth.
Just loyalty.

Jesus shows us: **Worship is about loyalty — and that belongs to God alone.**

## ðŸ’¡ The Promise

Jesus resisted the shortcut. He chose the hard road — the cross.
And because of that, He secured the true crown.

And here's His promise to us:

> "Seek first the Kingdom of God and His righteousness, and all these things will be added to you." — Matthew 6:33

Bow to God first, and He'll give you everything you truly need.
Bow to false gods, and you'll always be starving.`,

    triviaQuestions: [
      {
        id: "w3q1",
        question: "What did the devil show Jesus during the second temptation?",
        options: [
          { label: "A", text: "The Temple in Jerusalem" },
          { label: "B", text: "All the kingdoms of the world" },
          { label: "C", text: "A vision of angels" },
          { label: "D", text: "The Garden of Eden" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:5 records: 'The devil led him up to a high place and showed him in an instant all the kingdoms of the world.'",
      },
      {
        id: "w3q2",
        question: "What did the devil offer Jesus in exchange for worship?",
        options: [
          { label: "A", text: "Freedom from suffering" },
          { label: "B", text: "All the authority and splendor of the world's kingdoms" },
          { label: "C", text: "Bread and water" },
          { label: "D", text: "Protection from death" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:6â€“7 records the devil saying: 'I will give you all their authority and splendor... If you worship me, it will all be yours.'",
      },
      {
        id: "w3q3",
        question: "What Scripture did Jesus quote to resist the second temptation?",
        options: [
          { label: "A", text: "Psalm 91" },
          { label: "B", text: "Isaiah 40" },
          { label: "C", text: "Deuteronomy 6" },
          { label: "D", text: "Proverbs 3" },
        ],
        correctAnswer: "C",
        explanation: "Jesus quoted Deuteronomy 6:13 — 'Worship the Lord your God and serve Him only' — the same command Moses gave Israel before they entered the Promised Land.",
      },
      {
        id: "w3q4",
        question: "What title does John 12:31 give to Satan that relates to his claim over the kingdoms?",
        options: [
          { label: "A", text: "The king of darkness" },
          { label: "B", text: "The ruler of the air" },
          { label: "C", text: "The prince of this world" },
          { label: "D", text: "The father of lies" },
        ],
        correctAnswer: "C",
        explanation: "John 12:31 calls Satan 'the prince of this world.' He influences systems and cultures — but he does not own them. 'The earth is the Lord's, and everything in it' (Psalm 24:1).",
      },
      {
        id: "w3q5",
        question: "According to the lesson, what does worship really mean beyond Sunday music?",
        options: [
          { label: "A", text: "Attending church regularly" },
          { label: "B", text: "Knowing a lot of Scripture" },
          { label: "C", text: "Who you trust, obey, center your life around, and let shape your decisions" },
          { label: "D", text: "Tithing and giving offerings" },
        ],
        correctAnswer: "C",
        explanation: "The lesson defines worship as loyalty — who you trust, who you obey, who you center your life around, and who shapes your decisions. Whatever you bow to, even without your knees, is your god.",
      },
      {
        id: "w3q6",
        question: "What does the lesson call this second temptation?",
        options: [
          { label: "A", text: "The temptation of the flesh" },
          { label: "B", text: "The temptation of doubt" },
          { label: "C", text: "The temptation of fear" },
          { label: "D", text: "The temptation of shortcuts" },
        ],
        correctAnswer: "D",
        explanation: "The lesson calls it the temptation of shortcuts — glory without obedience, power without sacrifice, a crown without the cross.",
      },
      {
        id: "w3q7",
        question: "How did Israel fail the test that Jesus passed in the wilderness?",
        options: [
          { label: "A", text: "They refused to pray or read Scripture" },
          { label: "B", text: "They worshipped idols like the golden calf and the gods of Canaan" },
          { label: "C", text: "They turned back before entering the Promised Land" },
          { label: "D", text: "They doubted Moses was sent by God" },
        ],
        correctAnswer: "B",
        explanation: "Israel bowed to the golden calf (Exodus 32), chased the gods of Canaan, and forgot God once life got comfortable. Jesus succeeded where they fell — showing faithfulness where Israel showed rebellion.",
      },
      {
        id: "w3q8",
        question: "What does 2 Corinthians 4:4 call Satan in relation to worldly influence?",
        options: [
          { label: "A", text: "The king of lies" },
          { label: "B", text: "The god of this age" },
          { label: "C", text: "The destroyer" },
          { label: "D", text: "The accuser" },
        ],
        correctAnswer: "B",
        explanation: "2 Corinthians 4:4 calls Satan 'the god of this age' — he influences systems, cultures, and hearts apart from God, which is why he could claim authority over the kingdoms he showed Jesus.",
      },
      {
        id: "w3q9",
        question: "What promise did Jesus secure by resisting the shortcut and choosing the cross?",
        options: [
          { label: "A", text: "He would return to heaven immediately" },
          { label: "B", text: "He secured the true crown and the promise of Matthew 6:33" },
          { label: "C", text: "He proved He didn't need Satan's help" },
          { label: "D", text: "He earned the right to judge the world" },
        ],
        correctAnswer: "B",
        explanation: "By rejecting the devil's shortcut, Jesus chose obedience and the cross — securing the true crown. Matthew 6:33 promises: 'Seek first the Kingdom of God and His righteousness, and all these things will be added to you.'",
      },
      {
        id: "w3q10",
        question: "What Psalm verse does the lesson quote to show that Satan doesn't truly own the world's kingdoms?",
        options: [
          { label: "A", text: "Psalm 23:1 — 'The Lord is my shepherd'" },
          { label: "B", text: "Psalm 46:1 — 'God is our refuge and strength'" },
          { label: "C", text: "Psalm 24:1 — 'The earth is the Lord's, and everything in it'" },
          { label: "D", text: "Psalm 91:1 — 'Whoever dwells in the shelter of the Most High'" },
        ],
        correctAnswer: "C",
        explanation: "Psalm 24:1 — 'The earth is the Lord's, and everything in it.' What Satan offers is always a counterfeit. He flashes the blessing without mentioning the chains.",
      },
    ],
  },
  {
    weekNumber: 4,
    title: "The Pride of Life",
    subtitle: "The devil's final trick",
    readingReference: "Luke 4:9â€“12",
    readingApiQuery: "luke+4:9-12",
    reflectionQuestion:
      "Lord, show me where I've been living reckless. Show me the places where pride has taken over. Show me where I've been expecting You to protect me while I'm the one jumping off the ledge. Where in your life have you been acting like nothing can touch you, ignoring warning signs, treating sin casually, or thinking 'God will protect me anyway'?",

    intro: `At the end of Week 3, we left off on the devil trying to tempt Jesus with the lust of the eye.

He offered Him all the power and glory in the world.

But Jesus replied, reminding the devil He doesn't need his shortcuts —

You should only worship God.

Now the devil has tempted Jesus twice...

And don't forget that Jesus is at His weakest right now. He has been in the hot, dry wilderness for 40 days and has beaten the temptation of the devil twice.

But the devil is not done.

He has one more trick up his sleeve...

And in this Bible study, we are going to really break it down.

But before we talk about the Pride of Life — that's his last trick — let's really talk about who the devil is.

## ðŸ‘º Who Is the Devil?

Let's take it all the way back.

Before Jesus.
Before Moses.
Before Adam and Eve.
Before the world was even created.

God created angels — spiritual beings — before He ever created us. And one of those angels? He wasn't just any angel.

He was the most beautiful, the most gifted, the most powerful one. God made him with no flaws.

He wasn't just good-looking — he was the most beautiful thing God had created at the time. He was intelligent — maybe even the smartest being God ever made. Plus, he had power — he likely had a leadership role, overseeing worship or guarding God's throne. Some believe he literally led heaven's worship.

His name was **Lucifer**.

But somewhere along the way... Lucifer started believing his own hype. Started feeling himself a little too much. Started thinking maybe he was the one who deserved the throne.

> "I will ascend... I will make myself like the Most High." — Isaiah 14:13â€“14

And boom — pride was found in him.

> "Your heart became proud on account of your beauty, and you corrupted your wisdom because of your splendor." — Ezekiel 28:17

## ðŸ’¥ The Great Rebellion

Lucifer didn't just feel pride — he took a shot at God's throne. He started recruiting angels. Whispering lies.

And before long, a rebellion started. Michael and the loyal angels fought back.

> "Michael and his angels fought against the dragon, and the dragon and his angels fought back. But he was not strong enough... and he was hurled to the earth." — Revelation 12:7â€“9

God cast Lucifer out of heaven. He lost his place. He lost his name. And from that point on — he's called **Satan**.

In Hebrew, "Satan" means adversary, opponent, enemy of God.

But Lucifer didn't fall alone.

> "He dragged a third of the stars with him." — Revelation 12:4

That means a third of heaven's angels followed him in his rebellion. That's who we now call demons — fallen angels with the same twisted mission.

## ðŸ˜ˆ Satan's Final Trick: The Pride of Life

This is why the third temptation — the Pride of Life — hits different.

This ain't just a random sin.

This is **Lucifer's original sin**.

His go-to. His specialty. His downfall.

He knows what it's like to think you don't need God. To believe you're good without Him. To be so caught up in your success, your body, your beauty, your ideas... that you stop submitting and start self-glorifying.

The Pride of Life is that final trap he sets — because it's how he fell. And it's how he wants you to fall, too.

## ðŸ›ï¸ The Temple Temptation

> "And he took him to Jerusalem and set him on the pinnacle of the temple and said to him, 'If you are the Son of God, throw yourself down from here.'" — Luke 4:9

📍 **What Was "The Temple"?**

The Temple in Jerusalem was the most sacred place in all of Jewish life. This is where people came to worship God, offer sacrifices, experience God's presence, and celebrate festivals. It was considered God's dwelling place on earth.

The specific one Jesus was brought to? That was Herod's Temple — the second temple — rebuilt and expanded in massive, glorious detail. One of the most awe-inspiring structures of that time.

So when Satan brought Jesus to the top of the Temple, he wasn't just tempting Him in private. He was saying:

"Jump from the center of your people's faith. Show off your power. Let them see who You really are."

He was basically saying: "Bro, you want these people to believe in you and trust you... just jump off this temple and the angels will catch you. That'll prove to them that you are who you say you are."

But it's a trick.

God's grace doesn't mean we can just be reckless and expect God to come through and save us.

Now today we aren't standing on the ledge of a high building daring God to save us...

Or are we?

- That half a pizza you killed last night?
- The last two workouts you skipped?
- That decision you made knowing it was wrong?

A lot of us treat our lives recklessly and then beg God for help when it goes left — just like the devil was telling Jesus to do.

God loves you... so you think you can do whatever you want and He'll be there to clean up the mess?

**That's the Pride of Life.**

## ðŸ’­ When We Start "Smelling Ourselves"

But this temptation means something even deeper.

Sometimes we get in the position where we start smelling ourselves:

"I did this..."
"I got this..."
"I'm the best at that..."

And we start to forget about who we prayed to for the things we're now getting.

We can be like Lucifer sometimes — when things are going good, we fall back from God. And the wild thing is... when things start going bad again, we're right back to praying for better days.

The third temptation is about testing God — but also about removing God from the head of our lives, thinking we can do better on our own.

## 🙏 Jesus' Reply

> "And Jesus answered him, 'It is said, You shall not put the Lord your God to the test.'" — Luke 4:12

Jesus shut it down quick.

He was quoting Moses — from Deuteronomy 6:16. Moses was giving that speech to the new generation of Israelites before they entered the Promised Land. He said:

> "Do not put the Lord your God to the test, as you did at Massah." — Deuteronomy 6:16

When the Israelites first left Egypt, they were in the wilderness — just like Jesus is now. They got thirsty. They started complaining. They started doubting if God was even with them anymore. They literally said:

> "Is the Lord among us or not?" — Exodus 17:7

Like... God just split the Red Sea. He just brought you out of slavery. But the moment it got uncomfortable, they panicked.

So when Moses said "Don't test God," he meant: **don't demand a sign to prove He's still with you.**

Now fast-forward back to Jesus. Satan says: "Jump off this temple. If God's really with You, He'll catch You."

And Jesus is like: "Nah. I don't need to test Him. I trust Him."

That's real faith.

## ðŸ”š Final Thoughts

That's why the devil saves this one for last. He's tried the hunger. He's tried the shortcut. But when that doesn't work — he pulls out his ace.

The other two — the lust of the flesh and the lust of the eyes — those hit you when you're **down**. When you're craving something. When your body's empty. When your heart is desperate.

But this one? **This one hits you when you're up.**

When you just got the job. When the money's flowing. When the prayers are getting answered. When you're walking in the blessing.

And you think, "I'm good now. I made it."

But the danger is — you start to forget who brought you there. You start thinking you did it. You worked hard. You showed up. You stayed disciplined. You sacrificed.

And you did.

But who gave you the strength? Who gave you the breath? Who opened the doors?

And little by little — without even realizing it — you start to block God out. You don't mean to. You just stop depending. Stop praying. Stop asking.

**That's the Pride of Life. It's spiritual amnesia.**

You forget who got you there. You start thinking you are the answer.

And Jesus said it clear:

> "Do not test the Lord your God." — Luke 4:12

So maybe this whole temptation wasn't about jumping off the temple. Maybe it's about how we live day to day.

Do we live like God is in control? Or do we only call on Him once the damage is done?

The Pride of Life is dangerous because it convinces you that you don't need God — right when you're most blessed.

But real faith sounds like this:

**Even when I'm winning... I still need Him.**
**Even when I'm thriving... I still obey Him.**
**Even when I don't feel desperate... I still depend on Him.**`,

    triviaQuestions: [
      {
        id: "w4q1",
        question: "Where did the devil take Jesus for the third temptation?",
        options: [
          { label: "A", text: "A high mountain overlooking Galilee" },
          { label: "B", text: "The pinnacle of the Temple in Jerusalem" },
          { label: "C", text: "The wilderness of Judea" },
          { label: "D", text: "The banks of the Jordan River" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:9 records: 'He took him to Jerusalem and set him on the pinnacle of the temple.' The Temple was the most sacred place in all of Jewish life — considered God's dwelling place on earth.",
      },
      {
        id: "w4q2",
        question: "What did the devil dare Jesus to do at the Temple?",
        options: [
          { label: "A", text: "Turn water into wine to impress the crowd" },
          { label: "B", text: "Call down fire from heaven" },
          { label: "C", text: "Throw Himself down so angels would catch Him" },
          { label: "D", text: "Declare Himself king from the Temple steps" },
        ],
        correctAnswer: "C",
        explanation: "Luke 4:9 records the devil saying: 'If you are the Son of God, throw yourself down from here.' He was daring Jesus to force God's hand and prove His identity through a public spectacle.",
      },
      {
        id: "w4q3",
        question: "What Scripture did Jesus quote to resist the third temptation?",
        options: [
          { label: "A", text: "Psalm 91 — 'He will command his angels'" },
          { label: "B", text: "Deuteronomy 6:16 — 'Do not put the Lord your God to the test'" },
          { label: "C", text: "Isaiah 40 — 'Those who hope in the Lord will renew their strength'" },
          { label: "D", text: "Exodus 20 — 'You shall have no other gods before me'" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:12 records Jesus quoting Deuteronomy 6:16 — 'You shall not put the Lord your God to the test.' Moses first said this to warn Israel not to repeat the sin of Massah, where they demanded a sign from God.",
      },
      {
        id: "w4q4",
        question: "According to the lesson, what is the original sin that made Lucifer fall from heaven?",
        options: [
          { label: "A", text: "Lust of the flesh" },
          { label: "B", text: "Rebellion against Michael" },
          { label: "C", text: "Pride" },
          { label: "D", text: "Envy of God's creation" },
        ],
        correctAnswer: "C",
        explanation: "Ezekiel 28:17 says: 'Your heart became proud on account of your beauty, and you corrupted your wisdom because of your splendor.' Pride was found in Lucifer — and it led to his fall. That's why the Pride of Life is his specialty.",
      },
      {
        id: "w4q5",
        question: "What does the Hebrew word 'Satan' mean?",
        options: [
          { label: "A", text: "Deceiver and liar" },
          { label: "B", text: "Adversary, opponent, enemy of God" },
          { label: "C", text: "The fallen one" },
          { label: "D", text: "Prince of darkness" },
        ],
        correctAnswer: "B",
        explanation: "The lesson explains that in Hebrew, 'Satan' means adversary, opponent, enemy of God. He lost his name 'Lucifer' when he was cast out of heaven after his rebellion.",
      },
      {
        id: "w4q6",
        question: "According to Revelation 12:4, what happened when Lucifer rebelled against God?",
        options: [
          { label: "A", text: "He fell alone into the earth" },
          { label: "B", text: "He dragged a third of heaven's angels with him" },
          { label: "C", text: "Half of the angels were destroyed" },
          { label: "D", text: "He was locked away until the end of time" },
        ],
        correctAnswer: "B",
        explanation: "Revelation 12:4 says he 'dragged a third of the stars with him' — a third of heaven's angels followed Lucifer in his rebellion. These fallen angels are what we now call demons.",
      },
      {
        id: "w4q7",
        question: "In Exodus 17:7, what did the Israelites say that showed they were 'testing God' in the wilderness?",
        options: [
          { label: "A", text: "'Why did you bring us here to die?'" },
          { label: "B", text: "'Is the Lord among us or not?'" },
          { label: "C", text: "'Give us water or we will return to Egypt'" },
          { label: "D", text: "'Moses has abandoned us'" },
        ],
        correctAnswer: "B",
        explanation: "Exodus 17:7 records Israel saying: 'Is the Lord among us or not?' — this after God had already split the Red Sea and freed them from slavery. That's exactly the kind of demanding-a-sign attitude Moses warned against in Deuteronomy 6:16.",
      },
      {
        id: "w4q8",
        question: "According to the lesson, what makes the Pride of Life the most dangerous temptation of the three?",
        options: [
          { label: "A", text: "It attacks when you are physically weak" },
          { label: "B", text: "It comes when you are at your lowest and most desperate" },
          { label: "C", text: "It hits when you are up, blessed, and thriving — and makes you forget God" },
          { label: "D", text: "It is impossible to resist without special spiritual gifts" },
        ],
        correctAnswer: "C",
        explanation: "The lesson explains that the first two temptations hit you when you're down. But the Pride of Life hits when you're winning — when life is good, blessings are flowing, and you start thinking you did it on your own, slowly blocking God out.",
      },
      {
        id: "w4q9",
        question: "Isaiah 14:13â€“14 records Lucifer saying 'I will ascend' and 'I will make myself like the Most High.' What does this tell us about the root of his fall?",
        options: [
          { label: "A", text: "He wanted to be worshipped by humans" },
          { label: "B", text: "He was jealous of Jesus specifically" },
          { label: "C", text: "His pride drove him to seek God's throne for himself" },
          { label: "D", text: "He disagreed with how God was running heaven" },
        ],
        correctAnswer: "C",
        explanation: "Isaiah 14:13â€“14 shows Lucifer's internal declaration — 'I will ascend... I will make myself like the Most High.' His pride wasn't passive. It drove him to actively pursue God's throne, which led directly to the angel war and his expulsion from heaven.",
      },
      {
        id: "w4q10",
        question: "How does the lesson describe 'spiritual amnesia' in relation to the Pride of Life?",
        options: [
          { label: "A", text: "Forgetting Scripture when temptation comes" },
          { label: "B", text: "Forgetting who brought you to where you are and starting to think you did it yourself" },
          { label: "C", text: "Losing your faith during seasons of suffering" },
          { label: "D", text: "Forgetting to pray or read the Bible regularly" },
        ],
        correctAnswer: "B",
        explanation: "The lesson calls the Pride of Life 'spiritual amnesia' — little by little you stop depending on God, stop praying, stop asking, and start thinking you are the answer. You forget who gave you the strength, the breath, and opened the doors.",
      },
    ],
  },
  {
    weekNumber: 5,
    title: "Coming Out Stronger",
    subtitle: "The wilderness prepares you for the mission",
    readingReference: "Luke 4:13â€“15",
    readingApiQuery: "luke+4:13-15",
    reflectionQuestion:
      "Jesus came out of the wilderness stronger than He went in. He didn't chase fame — He chased obedience. And because He passed the test in private, God elevated Him in public. Are you in a wilderness season right now? What would it look like to stop rushing through it and trust that God is preparing you for something bigger than you realize?",

    intro: `At the end of Week 4, we left off with the devil trying his final trick on Jesus.

He tempted Him at the pinnacle of the temple. Told Him to jump. Told Him to force God's hand.

But Jesus shut him down again.

And now we are at the final moment in Luke's wilderness story.

Today we finish the Temptation of Jesus.

## ðŸ§  The Devil Leaves Jesus

> "When the devil had ended every temptation, he departed from Him until an opportune time." — Luke 4:13

For three temptations straight, the devil came with everything he had.

He said:

- Turn these stones into bread.
- Worship me and I will give you everything you see.
- Throw Yourself from this temple and make God catch You.

And three times, Jesus refused to bend.

He did not argue.
He did not negotiate.
He did not entertain the suggestion.

He just stood firm on what God said.

And because Jesus stood firm — the devil left.

But pay attention to the wording. It does not say he left forever. It says:

**"Until an opportune time."**

That one line tells you everything you need to know about temptation.

## ðŸ‘€ Temptation Does Not End… It Circles Back

People ask all the time: "How do I beat lust?" "How do I stop being lazy?" "How do I kill this addiction once and for all?"

Here is the truth:

**You do not beat temptation like it is a final boss in a video game.**

Even Jesus — the Son of God — did not defeat temptation once and never face it again. The devil simply ran out of plays for that moment. He stepped back and waited.

He watches. He studies. He waits for your weak moments. Just like he did with Jesus.

## ðŸ˜« When Is the "Opportune Time"?

It is never when you are strong.
It is never when you are praying.
It is never when you are close to God.

The "opportune time" is when you are weak, lonely, hungry, tired, angry, isolated, or frustrated.

That is when he slides back in. Jesus had been fasting forty days — no food, no comfort, no support. Just Him and the wilderness. And that is when Satan showed up. That is how he does us too.

## ðŸ”‘ Do Not Rely on Willpower

Jesus did not beat temptation with motivation. He did not beat it with discipline. He did not beat it with "trying harder."

He used one thing: **the Word of God.**

He quoted Scripture.
He stood on truth.
He stayed submitted to God.

If Jesus — the most powerful person who ever lived — did not try to fight temptation in His own strength... why do we think we can?

You cannot rely on willpower alone. You cannot just "say no." You have to **stay close to God daily.**

- Get in the Word
- Remember what God said
- Fill your heart with truth before temptation hits

Because the devil will always return. And when he does, you need something stronger than emotion.

Jesus did not panic. He did not hesitate. He did not negotiate. He said: "It is written..."

The devil had nothing left.

## ðŸŒ… Coming Out of the Wilderness

> "And Jesus returned in the power of the Spirit to Galilee, and a report about Him went out through all the surrounding country. And He taught in their synagogues, being glorified by all." — Luke 4:14â€“15

After Jesus defeated the devil, He came out of the wilderness **stronger than He went in.**

He entered hungry, alone, and under attack.
He left filled with the Spirit, focused, and ready for His mission.

**That is what the wilderness does when you walk through it with God.**

The devil thought the desert would break Him. But Jesus walked out with power, clarity, and authority. He did not just survive. He came out ready.

## ðŸ  Back to Galilee

And where does Jesus go after the wilderness? Back to Galilee. Back to the region He grew up in.

Not the capital.
Not the temple.
Not the spotlight.

He goes home.

📖 **Quick Background:**

- Jesus was born in Bethlehem
- Joseph and Mary fled to Egypt after Herod's order
- They eventually moved to Nazareth in Galilee
- Nazareth was a simple, working-class town — that is where Jesus grew up

## âš¡ New Power… Same Region

Now He returns. But He is not the same.

He is not Mary's little boy. He is not the carpenter's apprentice. He is the man who defeated Satan face to face.

And what happens? People notice. Word spreads. He begins teaching. He begins moving with purpose.

But notice something important:

**He did not chase fame. He chased obedience.**

Because He passed the test in private — God elevated Him in public.

## 🔥 What About You?

Are you in a wilderness season right now?

Dry? Hard? Confusing? Lonely?

Do not tap out. Do not rush it.

Because when God brings you out, you will not come out the same. You will come out stronger, sharper, more focused, more anointed, and more dangerous to the enemy.

The wilderness is not punishment. It is **preparation**.

Let God refine you. He is preparing you for something bigger than you realize.

## 🙏 Thanks for Walking Through This With Me

This is the end of our 5-week study on the Temptation of Jesus.

If you made it this far — I'm proud of you. Most people never study these passages beyond a quick Sunday school version. But you took time to really understand:

- How Jesus fought the devil
- Why the wilderness matters
- How temptation works
- And how God strengthens us through struggle

My prayer is that this series didn't just teach you something — but **formed something in you.**

A hunger for the Word.
A desire to fight differently.
A confidence in what God has placed inside you.

This is just the beginning. We're building something special here in Hope Nation — and even more is coming.`,

    triviaQuestions: [
      {
        id: "w5q1",
        question: "According to Luke 4:13, what did the devil do after finishing all three temptations?",
        options: [
          { label: "A", text: "He was cast into the pit" },
          { label: "B", text: "He departed until an opportune time" },
          { label: "C", text: "He attacked Jesus again immediately" },
          { label: "D", text: "He went to tempt the disciples" },
        ],
        correctAnswer: "B",
        explanation: "Luke 4:13 says the devil 'departed from Him until an opportune time.' He didn't leave forever — he stepped back, waited, and watched for a future moment of weakness.",
      },
      {
        id: "w5q2",
        question: "What does 'until an opportune time' tell us about how temptation works?",
        options: [
          { label: "A", text: "Temptation can be permanently defeated through willpower" },
          { label: "B", text: "The devil only attacks once and moves on" },
          { label: "C", text: "Temptation circles back — it watches for your weak moments" },
          { label: "D", text: "Every temptation has an expiration date" },
        ],
        correctAnswer: "C",
        explanation: "The lesson teaches that you don't beat temptation like a final boss. The devil steps back, waits, watches, and returns when you're weak, lonely, tired, or isolated. Even Jesus faced this reality.",
      },
      {
        id: "w5q3",
        question: "Where did Jesus go after leaving the wilderness, according to Luke 4:14?",
        options: [
          { label: "A", text: "Jerusalem" },
          { label: "B", text: "Bethlehem" },
          { label: "C", text: "The Jordan River" },
          { label: "D", text: "Galilee" },
        ],
        correctAnswer: "D",
        explanation: "Luke 4:14 says Jesus 'returned in the power of the Spirit to Galilee.' He went back to the region He grew up in — not the spotlight, not the capital. Back home, but completely transformed.",
      },
      {
        id: "w5q4",
        question: "According to the lesson, what is the one weapon Jesus used to defeat every temptation?",
        options: [
          { label: "A", text: "Willpower and discipline" },
          { label: "B", text: "Prayer and fasting" },
          { label: "C", text: "The Word of God" },
          { label: "D", text: "His divine power as the Son of God" },
        ],
        correctAnswer: "C",
        explanation: "Every time the devil tempted Him, Jesus quoted Scripture — 'It is written.' He did not fight in His own strength. The Word of God was His only weapon, and it was enough.",
      },
      {
        id: "w5q5",
        question: "What does the lesson say about Jesus' state when He entered vs. when He exited the wilderness?",
        options: [
          { label: "A", text: "He entered strong and left broken" },
          { label: "B", text: "He entered and exited the same" },
          { label: "C", text: "He entered hungry, alone, and under attack — He left filled with the Spirit and ready for mission" },
          { label: "D", text: "He entered in faith and left in doubt" },
        ],
        correctAnswer: "C",
        explanation: "Luke 4:14 says He returned 'in the power of the Spirit.' The wilderness didn't break Him — it forged Him. He left stronger, sharper, and more prepared for ministry than when He entered.",
      },
      {
        id: "w5q6",
        question: "According to the lesson, when is the devil's 'opportune time' to attack?",
        options: [
          { label: "A", text: "When you are at your strongest spiritually" },
          { label: "B", text: "When you are in church or praying" },
          { label: "C", text: "When you are close to God and reading Scripture daily" },
          { label: "D", text: "When you are weak, lonely, hungry, tired, angry, or isolated" },
        ],
        correctAnswer: "D",
        explanation: "The lesson explains that temptation never arrives when you're strong. It waits for the cracks — when you're emotionally drained, physically weak, or spiritually dry. That's how it worked with Jesus and how it works with us.",
      },
      {
        id: "w5q7",
        question: "What key observation does the lesson make about Jesus after the wilderness — regarding fame vs. obedience?",
        options: [
          { label: "A", text: "He immediately went to Jerusalem to announce His mission" },
          { label: "B", text: "He did not chase fame — He chased obedience, and God elevated Him publicly because He passed the test privately" },
          { label: "C", text: "He avoided people and continued fasting" },
          { label: "D", text: "He sought out the Pharisees to debate Scripture" },
        ],
        correctAnswer: "B",
        explanation: "Jesus went back to Galilee — not the spotlight, not the capital. He chased obedience, not fame. And because He passed the test in private, God elevated Him in public: 'a report about him went out through all the surrounding country.'",
      },
      {
        id: "w5q8",
        question: "According to the lesson, what is the wilderness — punishment or preparation?",
        options: [
          { label: "A", text: "Punishment for past sins" },
          { label: "B", text: "A random trial with no purpose" },
          { label: "C", text: "A sign that God has abandoned you" },
          { label: "D", text: "Preparation — God is refining you for something bigger" },
        ],
        correctAnswer: "D",
        explanation: "The lesson is clear: 'The wilderness is not punishment. It is preparation.' Just as Jesus came out stronger, sharper, and more anointed — God uses your hard seasons to forge you for your calling.",
      },
      {
        id: "w5q9",
        question: "The lesson says the devil 'had nothing left' after Jesus responded with 'It is written.' What does this teach us about Scripture?",
        options: [
          { label: "A", text: "Scripture is only effective for Jesus, not ordinary believers" },
          { label: "B", text: "Scripture filled with truth before temptation hits is stronger than any emotion or temptation" },
          { label: "C", text: "Scripture should only be used in formal prayer settings" },
          { label: "D", text: "Memorizing a lot of verses is what matters most" },
        ],
        correctAnswer: "B",
        explanation: "The lesson teaches: fill your heart with truth before temptation hits. The Word of God is not just information — it's a weapon. When Jesus spoke it, the devil ran out of moves. That same power is available to us.",
      },
      {
        id: "w5q10",
        question: "What is the central takeaway of this entire 5-week series on the Temptation of Jesus?",
        options: [
          { label: "A", text: "Jesus was uniquely divine and His experience has little application to our daily lives" },
          { label: "B", text: "Temptation can be avoided if you are disciplined enough" },
          { label: "C", text: "The wilderness breaks you — so avoid it at all costs" },
          { label: "D", text: "Jesus shows us how to fight — with the Word, in submission to God, trusting that the wilderness is preparation not punishment" },
        ],
        correctAnswer: "D",
        explanation: "The whole series builds to this: Jesus is our blueprint. He fought with the Word, not willpower. He stayed submitted to God through hunger and attack. And He came out of the wilderness stronger — ready for His mission. So will you.",
      },
    ],
  },
];

const WEEK_ONE_INTRO = `## The Story Before the Wilderness

The story of Jesus in the wilderness shows up in three of the four Gospels, but Luke's version hits me the deepest. Luke writes like someone who did the work. In Luke 1 he says he carefully investigated everything from the beginning so we could know with certainty what we've been taught. He was a doctor, a careful observer, and a writer who slows the moment down so we do not miss Jesus.

## Why Luke Matters Here

- 👨🏽‍⚕️ Luke writes with detail, clarity, and purpose.
- 🕊️ He wants us to understand what happened, not just rush past it.
- 📖 He shows the build-up before the battle starts.

And that build-up matters.

Before the desert, there was the Jordan.
Before the testing, there was baptism.
Before the hunger, there was the Father's voice.

## The Build-Up to Luke 4

Jesus steps into the water with John, not because He needs cleansing, but because He is stepping fully into the mission the Father sent Him to do.

- 🌊 John baptizes Him in the Jordan.
- 🕊️ The Spirit descends.
- 🗣️ The Father speaks.
- 👑 Heaven publicly declares who Jesus is.

So when Luke 4:1-2 says Jesus was full of the Holy Spirit and led into the wilderness, we are watching the beloved Son move from the water into the desert on purpose. This is not random. This is the beginning of the battle.`;

const WEEK_ONE_PREMIUM_NOTES = `## Why Luke's Version Hits Different

The temptation story shows up in three Gospels: Matthew, Mark, and Luke.

Mark barely gives you two verses. Matthew gives more detail. But Luke's account is my favorite because Luke tells you up front what he is doing.

> "I myself have carefully investigated everything from the beginning... so that you may know the certainty of the things you have been taught." - Luke 1:3-4

Luke was not guessing. He was investigating. He writes like an investigator and a pastor at the same time. He slows the story down, explains the world around the story, and helps us see Jesus clearly.

- 👨🏽‍⚕️ He was a doctor according to Colossians 4:14.
- ✈️ He traveled with Paul, and in Acts you can actually see the narration shift into "we."
- 🌍 He was likely a Gentile, so he often explains Jewish customs for readers who did not grow up with Torah.
- 📝 By word count, Luke and Acts together make him the largest contributor to the New Testament.
- 🕊️ His Gospel is Spirit-led. Jesus promised the Spirit would guide His people into truth, and Luke writes with that careful, guided clarity.

That is why I trust Luke's version when it comes to the wilderness. It is investigated, Spirit-led, and written for people like us who need the story explained clearly.

## Before the Wilderness: Jesus at Twelve

Luke does not jump straight into the desert. He shows us who Jesus was becoming.

When Jesus was twelve, His family traveled from Nazareth to Jerusalem for Passover. That already matters because Passover was the great remembrance meal of deliverance. It looked back to Exodus 12, when God passed over Israelite homes in Egypt and brought His people out.

- 📖 Passover celebrated God's rescue from Egypt.
- 👨 Jewish men were expected to go up to Jerusalem for the feast.
- 🚶 Families often traveled in large caravans with relatives and neighbors.
- 🗺️ The trip from Nazareth to Jerusalem was around 65 to 70 miles, usually several days on foot.

After the feast, Mary and Joseph start heading home, and then the panic hits: Jesus is missing.

At first they probably assumed He was somewhere in the group, maybe with cousins or family friends. But when night came and He still was not there, fear took over. They rushed back to Jerusalem and searched for three days.

Then they found Him in the temple, listening, asking questions, and amazing the teachers with His understanding.

> "Everyone who heard him was amazed at his understanding and his answers." - Luke 2:47

Mary asks why He would do this to them, and Jesus answers with a line that gives away everything:

> "Didn't you know I had to be in my Father's house?" - Luke 2:49

That is the last recorded thing Jesus says until He is about thirty. Eighteen years of silence. No miracles. No public sermons. Just ordinary obedience, hidden preparation, and growing in wisdom. But even at twelve, He knows who He is: the Son, living for His Father's will.

## John the Baptist: The Voice in the Desert

Then Luke fast-forwards through those silent years, and the next major voice we hear is not Jesus. It is John.

John is wild, bold, and impossible to ignore. He is out in the wilderness, away from polished religion, calling people to repent because the King is coming.

- 📣 John is the forerunner, the messenger preparing the way.
- 🐍 He confronts religious pride and calls people a brood of vipers.
- 🌊 Crowds come out from Judea and the surrounding region to be baptized in the Jordan.
- 🏜️ His location matters. The desert is already becoming the setting where God prepares hearts.

Luke also wants us to remember that John is not random.

- 👶 John and Jesus are connected before birth through Mary and Elizabeth.
- 🕊️ When Mary greets Elizabeth, John leaps in the womb and Elizabeth is filled with the Holy Spirit.
- 📜 John's life fulfills passages like Malachi 3:1 and Isaiah 40:3 about a voice preparing the way for the Lord.

Before Jesus ever stands face to face with Satan in the wilderness, God has already raised up a voice in the wilderness to announce Him.

## The Baptism of Jesus

Then Jesus steps into the Jordan, and this moment is massive.

John knows who Jesus is, so naturally he hesitates. In Matthew's account he basically says, "I need You to baptize me." That makes sense, because Jesus is not coming for repentance. He has no sin to confess.

So why does He get baptized?

- ✅ To obey the Father's plan and fulfill all righteousness.
- 🤝 To identify with the people He came to save.
- 🚀 To step publicly into His ministry.
- 🔭 To fulfill the pattern and promises God had already spoken.
- 🧭 To model obedient surrender.

Jesus is not entering the water because He needs cleansing. He is entering the water because He is stepping into our story.

And then heaven opens.

- 🕊️ The Spirit descends like a dove.
- 🗣️ The Father speaks over the Son.
- 👑 Jesus is publicly affirmed before His ministry begins.

Luke 3:22 is one of those moments where you can almost hear the scene:

> "You are my Son, whom I love; with you I am well pleased."

The Trinity is right there in the open. The Father speaking. The Son obeying. The Spirit descending.

And this is what matters for Luke 4: Jesus enters the wilderness already loved, already affirmed, already filled.

## From the Water to the Wilderness

Luke writes:

> "Jesus, full of the Holy Spirit, left the Jordan and was led by the Spirit into the wilderness..." - Luke 4:1

That means the wilderness was not a detour. It was part of the path.

- 🧭 Jesus did not wander into the desert by accident.
- 🕊️ He was full of the Spirit, not empty.
- 🏜️ He was led by the Spirit, not abandoned by God.
- ⚔️ The testing comes after affirmation, not before it.

That is huge, because a lot of us assume hard seasons must mean we missed God. Luke shows the opposite. Sometimes the wilderness is not punishment. Sometimes it is preparation.

The Greek idea behind "full" carries the sense of being filled up completely. Jesus is not dragging Himself into the desert running on fumes. He goes in with spiritual fullness.

And then Luke adds one more earthy detail:

> "He ate nothing during those days, and at the end of them he was hungry." - Luke 4:2

That matters because Luke wants us to feel the humanity of Jesus. He is not floating above the pain of the moment. He is weak in body, hungry in a real way, and still faithful.

## Why the Wilderness Matters

In Scripture, the wilderness is never just background scenery. It is the place where God strips things down and exposes what is really there.

- 🌵 Israel was tested in the wilderness after coming through the water.
- ⛰️ Moses spent years in the wilderness before leading God's people.
- 🔥 Elijah moved through wilderness weakness before hearing God's voice afresh.

That pattern matters because Jesus is stepping into a story Israel already lived.

Israel passed through the sea and then failed in the wilderness.
Jesus comes through the waters of baptism and enters the wilderness as the faithful Son.

Where Israel grumbled, Jesus trusts.
Where Israel fell, Jesus stands.

This is why some people call Him the true Israel and the better Adam.

- 🌿 Adam was tempted in a garden full of provision and failed.
- 🏕️ Israel was tested with daily manna and failed again and again.
- 🍞 Jesus stands in hunger and isolation, and He does not give in.

He is not just our example. He is our representative, succeeding where humanity kept collapsing.

## Why Forty Keeps Showing Up

The number forty is not random in the Bible. It is one of those patterns Scripture keeps using in moments of testing, waiting, and preparation.

- 🌧️ Noah experienced forty days of rain in Genesis 7:12.
- ⛰️ Moses spent forty days on Sinai in Exodus 24:18.
- 🧭 Israel wandered forty years in the wilderness in Deuteronomy 8:2.
- 🍞 Jesus fasts forty days here in Luke 4.

Forty is the number of the long test. The stretching season. The place where God forms dependence and exposes what is in the heart.

So when Luke tells us Jesus was in the wilderness for forty days, he is connecting Jesus to that whole biblical pattern. Only this time the Son passes the test.

## People, Places, and Events Behind the Passage

- 👤 John the Baptist: the prophetic voice who prepares the way, calls people to repentance, and points Israel to Jesus.
- 📍 The Jordan: a place of crossing and transition. Israel crossed into promise, and Jesus comes up out of the water and moves toward spiritual battle.
- 🎉 Passover: the feast of deliverance already sitting in the background of Luke's story, reminding us that Jesus is the greater Deliverer.
- 🏜️ The wilderness: the place where comfort falls away and dependence on God gets tested.

When you hold all of that together, Luke 4:1-2 stops feeling small. These are not throwaway setup verses. They are loaded.

## What This Means for You

This is where the passage gets personal.

The enemy often waits for vulnerable moments. Not when everything feels easy, but when you are tired, lonely, hungry, disappointed, or worn down.

- ⚠️ Temptation gets loud when you feel empty.
- ⚠️ Temptation loves isolation.
- ⚠️ Temptation often offers quick relief instead of real obedience.

That is why being full of the Spirit matters so much. Willpower runs out. Presence holds.

I know what it is like to want quick comfort in a wilderness season. A lot of us reach for whatever numbs the ache fastest. But that is just another version of trying to turn stones into bread. Relief now, regret later.

What I have learned is this: the wilderness can become the place where God deepens you if you stay with Him in it.

- 📖 Stay in Scripture, even if it is ten honest minutes a day.
- 🗣️ Memorize one verse that speaks to your weak spot.
- 🧠 Name the temptation honestly instead of dressing it up.
- 🙏 Pray, "Lord, fill me with Your Spirit and lead me through this."

You do not need to be stronger by yourself. You need to be closer. Rooted in the Word. Filled with the Spirit. Grounded in the love the Father has already spoken over His Son and now pours out on those who are in Him.

That is why Luke's version hits different. He does not just show us a test. He shows us the beloved Son walking into the wilderness on purpose, and that changes how we read the whole chapter.`;

const WEEK_TWO_INTRO = `## The First Real Attack

Week 1 gave us the build-up. Jesus was baptized, the Spirit descended, and the Father spoke His love over the Son. Then the Spirit led Jesus into the wilderness.

Now Luke slows the moment down even more. After forty days without food, Jesus is hungry. Not pretend hungry. Not symbolic hungry. Real, human, painful hunger.

And that is when the enemy speaks.

## Why This Temptation Matters

- 🍞 Satan starts with appetite.
- 🧠 He targets a real need in a wrong way.
- ⚔️ He tempts Jesus to use power apart from trust.

Luke 4:3-4 is about more than bread. It is about whether Jesus will trust the Father when His body is screaming for relief.

That is why this week hits so close to home. A lot of temptation does not begin with obviously evil things. It begins with real desires, real pain, real weakness, and the whisper to satisfy them outside of God's way.

So before we move on, sit in the scene for a second: the wilderness is silent, Jesus is weak from fasting, and the first voice to break that silence is the devil trying to pull the Son off mission.`;

const WEEK_TWO_PREMIUM_NOTES = `## Why This First Temptation Goes Straight for the Body

Luke writes:

> "The devil said to him, 'If you are the Son of God, tell this stone to become bread.' Jesus answered, 'It is written: Man shall not live on bread alone.'" - Luke 4:3-4

This is the first direct temptation Luke records, and it is not random that Satan begins here. He starts with hunger. He starts with the body. He starts with a legitimate need.

That is what makes this temptation so important. The issue is not that bread is bad. Bread is good. Hunger is real. The issue is whether Jesus will meet a real need in a way the Father has not led Him to.

- 🍞 Bread itself is not the sin.
- 🧭 Acting outside the Father's will is the issue.
- ⚠️ Satan loves to twist a real need into a wrong response.

This is why the first temptation speaks so directly to us. A lot of our battles do not begin with obviously dark things. They begin with desire, appetite, loneliness, stress, exhaustion, or hunger, and then the suggestion comes: "Handle it now. Satisfy it now. Do not wait on God."

## The Build-Up Still Matters

We cannot read Luke 4:3-4 like it dropped out of nowhere. The context from Week 1 still matters.

- 🌊 Jesus has just come from the Jordan.
- 🕊️ He is full of the Holy Spirit.
- 🗣️ The Father has already said, "You are my Son, whom I love."
- 🏜️ The Spirit has led Him into the wilderness on purpose.

That means this temptation comes after affirmation, not before it. Jesus is not trying to earn sonship. He is resisting from sonship.

That is a huge difference.

A lot of us live like we have to obey God so He will finally love us. Jesus shows the opposite order. The Father speaks love first, and then the testing comes. That matters because temptation often tries to make you forget what God has already said.

## Why the Devil Waited Until Jesus Was Hungry

Luke 4:2 says Jesus ate nothing during those days, and at the end of them He was hungry. Matthew adds that after fasting forty days and forty nights, "the tempter came."

That detail matters. Satan waits.

- ⏳ He does not rush in on day one.
- 🥀 He waits for weakness.
- 🕳️ He looks for the worn-down moment.

That is how temptation often works in real life too.

- Late at night when your guard is down.
- After a hard conversation when your emotions are raw.
- In a lonely moment when you just want comfort.
- In stress when quick relief feels more attractive than obedience.

The enemy studies timing. He loves vulnerable moments. That is why spiritual formation matters so much. If we only rely on willpower, we will break. Jesus shows us something deeper: a life rooted in the Spirit and anchored in the Word.

## "If You Are the Son of God"

The devil says, "If you are the Son of God, tell this stone to become bread."

That line is loaded.

On one level, Satan is challenging identity. He is echoing the very truth the Father just declared at Jesus' baptism and trying to poison it.

- 🗣️ The Father said, "You are my Son."
- 🐍 Satan says, "If you are the Son..."

That is how the enemy works. He questions what God has already made clear.

And in the flow of the sentence, the challenge is basically this:

"Since You are God's Son, why should You suffer like this? Why stay hungry? Why trust? Why not use Your power and fix it Yourself?"

That is the deeper temptation. Not just eat bread. Separate Yourself from dependence. Use divine power independently. Step outside the pattern of obedient trust.

Jesus came not only to save us, but to fully live the human life of obedience before the Father. If He turns stones to bread at Satan's suggestion, He is no longer resisting as the faithful Son in our place. He would be stepping outside the path the Father gave Him.

## Why Bread Matters So Much in Scripture

Bread is never just bread in the Bible. It is one of the most common pictures of daily provision.

- 🌾 Bread represents sustenance, survival, and everyday need.
- 🙏 In the Lord's Prayer, Jesus teaches us to ask for "daily bread."
- 📖 In Israel's wilderness story, manna becomes a daily lesson in dependence.

So when Satan says, "Turn this stone into bread," he is aiming at more than food. He is pressing on the question of provision.

Will Jesus trust the Father to provide, or will He grasp for relief on His own terms?

That same question shows up in our lives all the time.

- Will I trust God with desire, or satisfy it immediately?
- Will I trust God with money, or compromise to get ahead?
- Will I trust God with loneliness, or run back to what I know is unhealthy?
- Will I trust God with pain, or numb it in a way that pulls me farther from Him?

The temptation of the flesh usually comes dressed as urgency.

## Israel in the Wilderness and Jesus in the Wilderness

Jesus answers Satan by quoting Deuteronomy 8:3:

> "Man shall not live on bread alone."

That is not a random verse. Jesus is reaching back to Israel's wilderness story.

In Deuteronomy 8, Moses reminds Israel that God humbled them and let them hunger, then fed them with manna so they would learn something deeper:

> "...that man does not live on bread alone but on every word that comes from the mouth of the Lord." - Deuteronomy 8:3

That means the lesson of manna was never just food. It was trust.

- 📦 Israel had to gather manna daily.
- 🚫 They could not hoard it in fear.
- 🙌 They had to depend on God's word and provision one day at a time.

But Israel often failed that test. They grumbled. They doubted. They longed for Egypt. They wanted visible provision without obedient trust.

Now Jesus stands in the wilderness as the faithful Son.

- 🌊 Israel passed through the sea and then failed in the wilderness.
- 🕊️ Jesus passes through baptism and then stands firm in the wilderness.
- 🍞 Israel complained about food.
- ✝️ Jesus refuses to step outside the Father's will even in hunger.

He is reliving Israel's story, but this time the Son gets it right.

## The Lust of the Flesh

This week is called "The Lust of the Flesh" because this temptation hits bodily desire head-on.

The language of 1 John 2:16 helps here:

> "For everything in the world - the lust of the flesh, the lust of the eyes, and the pride of life - comes not from the Father but from the world."

The lust of the flesh is not only sexual temptation. It is broader than that. It is the pull of disordered appetite.

- 🍔 Hunger that becomes control.
- 🍷 Desire that becomes indulgence.
- 💬 Stress that becomes a sharp tongue.
- 🔥 Sexual desire pursued outside God's design.
- 😶 Emptiness that reaches for fast relief instead of faithful surrender.

The flesh says, "I feel it, so I need it now."

But not every strong feeling deserves obedience.

That is one of the clearest lessons in Luke 4:3-4. Jesus feels real hunger, but He does not let hunger become his master.

## Jesus Answers with Scripture

Jesus does not argue with Satan. He does not perform for Satan. He does not explain Himself to Satan. He answers with Scripture.

> "It is written..."

That line matters because Jesus is showing us how spiritual warfare works.

- 📖 He meets temptation with truth.
- 🧠 He fights with what God has said.
- 🫀 He shows that Scripture is not decorative. It is survival.

This is simple, but it is not shallow. The Word of God reshapes what we believe in the moment of pressure.

When temptation says, "You need this now," truth says, "God is enough."
When temptation says, "You will die without this," truth says, "Man shall not live on bread alone."
When temptation says, "Take control," truth says, "Trust the Father."

That is why hiding Scripture in your heart matters before the crisis hits. In the moment of temptation, you usually do not rise to the level of your intentions. You fall to the level of your formation.

## What Jesus Refuses to Do

It helps to notice what Jesus refuses here.

- ❌ He refuses to let hunger define Him.
- ❌ He refuses to act independently of the Father.
- ❌ He refuses to use power for self-serving relief.
- ❌ He refuses the shortcut.

That is powerful because Jesus is not resisting something obviously disgusting. He is resisting something that could easily be justified.

"You are starving."
"You are the Son of God."
"Bread would solve the problem."

But obedience is not just about avoiding obviously evil things. Sometimes obedience means refusing the seemingly reasonable thing because the Father has not spoken it.

## Daily Bread and Daily Dependence

There is a pastoral lesson here that hits everyday life.

Most of us are not going to be tempted to miraculously turn stones into bread. But we are tempted all the time to satisfy ourselves outside of trust.

We try to turn:

- 🪨 loneliness into unhealthy attachment
- 🪨 stress into addiction
- 🪨 boredom into indulgence
- 🪨 pain into escape
- 🪨 insecurity into control

That is what the enemy still whispers: "Take the stone. Make your own bread. Meet your need your own way."

Jesus shows a better path. Dependence is not weakness. Dependence on the Father is strength.

This is why the Lord's Prayer says, "Give us this day our daily bread." It trains us to live open-handed. Not hoarding. Not panicking. Not forcing. Receiving.

## What This Means for Your Own Wilderness Season

This passage gets real fast if you let it.

Maybe your wilderness right now is:

- 💔 heartbreak
- 😔 isolation
- 💼 financial stress
- 😩 mental exhaustion
- 🙏 prayers that feel unanswered

Those are the moments when the flesh gets loud. The urge to self-medicate, self-protect, lash out, scroll endlessly, go back to an old person, or make a compromise can feel overwhelming.

That does not make you uniquely broken. It makes you human.

But Luke 4 reminds us that being human does not mean being mastered by appetite.

Jesus shows us:

- 🕊️ stay full of the Spirit
- 📖 stay grounded in the Word
- ⏳ trust God's timing
- 🙏 bring real hunger to the Father instead of to the shortcut

## A Few Simple Ways to Fight This Temptation

- 📖 Read one passage each day before your phone shapes your mind.
- 🗣️ Memorize a verse for the place you are weakest.
- 🧠 Name the real hunger under the temptation. Is it comfort? control? attention? escape?
- 🤝 Tell one safe person where you are struggling so temptation does not grow in secrecy.
- 🙏 Pray honestly: "Father, teach me to trust You more than my cravings."

You do not need to pretend the hunger is not real. Jesus was genuinely hungry. The question is what you do with that hunger.

## Final Thought

The first temptation is not really about bread. It is about trust.

Will the Son live by appetite, or by the Father's word?

Jesus chooses trust. He chooses obedience. He chooses the long road over the shortcut.

And that matters for us because when we are tempted by the lust of the flesh, we are not looking at a distant Savior who cannot relate. We are looking at a faithful Savior who knows what pressure feels like and still shows us the way through.

He does not just tell us to resist. He models it.

And in Him, we learn that the deepest life is not found in feeding every craving. It is found in trusting the Father, even in the wilderness.`;

const WEEK_THREE_INTRO = `## The Offer That Looked Like Success

The first temptation came through hunger. The second temptation comes through sight.

Luke says the devil showed Jesus the kingdoms of the world in an instant. Power. Glory. Influence. The kind of vision that could make anyone think the mission was finally within reach.

## What Satan Is Really Offering

- 👀 something dazzling to look at
- 👑 glory without suffering
- 🛣️ a crown without the cross

That is what makes this temptation so dangerous. Satan is not offering Jesus something random. He is offering a twisted version of Jesus' real mission.

And that is still how temptation works. It flashes the reward, hides the chains, and whispers, "Take it now. Skip the hard part. Compromise a little."`;

const WEEK_THREE_PREMIUM_NOTES = `## The Lust of the Eyes

Luke 4:5-8 moves from appetite to vision. Satan shows Jesus the kingdoms of the world and offers Him authority and splendor in exchange for worship.

That is the heart of this temptation:

- 👀 visible glory
- 👑 fast success
- ⚠️ hidden compromise

The offer sounds close to Jesus' mission, but the path is corrupt. Jesus will receive the nations, but not from Satan and not through disobedience.

## Why This Matters

The enemy loves shortcuts. He offers the reward without the refining, influence without integrity, and the crown without the cross.

That is why this temptation reaches beyond ambition. It is really about worship and loyalty. Who will Jesus trust? Who will Jesus bow to? Who will define how the kingdom comes?

## Could Satan Really Offer This?

Scripture calls Satan the ruler of this world in a limited sense, meaning he exercises real influence in fallen systems. But he is still a creature, not the Creator.

- 🌍 God is still the true owner of the world
- 🐍 Satan only offers counterfeits
- 🔗 every shortcut he offers comes with bondage attached

He flashes splendor but hides slavery.

## Jesus Refuses the Shortcut

Jesus answers with Deuteronomy 6:13:

> "Worship the Lord your God and serve him only."

That is a straight loyalty verse. Jesus does not debate the devil. He does not negotiate with the offer. He does not say, "Let me think about it." He brings the moment back to worship.

## Israel Failed Here Too

This answer matters because Deuteronomy was spoken to Israel before they entered the land. They were warned not to forget the Lord once they saw blessing, cities, fields, and abundance.

But Israel often did forget.

- 🐄 they made the golden calf
- 🔥 they chased other gods
- 🍇 they enjoyed the gift and forgot the Giver

Jesus succeeds where Israel failed. He sees what is offered, and still chooses obedience.

## The Lust of the Eyes Today

This temptation still shows up through what we see:

- money without integrity
- attraction without holiness
- platform without character
- applause without submission

The eyes can make a shortcut look wise when it is actually poison.

## What This Means for You

Sometimes the hardest temptations are not the ones that feel dark. They are the ones that look blessed.

- 👀 the relationship that pulls you from God
- 💼 the opportunity that costs your integrity
- 📱 the image you start living for
- 🛣️ the shortcut that promises quick results

Jesus shows us the way through: worship first, truth first, loyalty first.

If the price of getting something is bowing away from God, it is too expensive.

## A Simple Prayer

"Lord, keep my eyes clean. Help me see through what only looks good. Teach me to want Your way more than quick success."`;

const WEEK_FOUR_INTRO = `## The Final Attack

By the third temptation, Satan has already tried hunger and shortcuts. Jesus has answered with Scripture both times.

Now the enemy goes after something even deeper: pride, public display, and the temptation to force God's hand.

He takes Jesus to the temple in Jerusalem, the center of worship, and tells Him to jump.

## Why This Scene Matters

- 🏛️ it happens at the temple
- 📣 it invites public spectacle
- 🧠 it tries to twist trust into testing God

This is not just about jumping. It is about using God's promises recklessly, turning faith into performance, and acting like sonship means you can demand signs whenever you want.`;

const WEEK_FOUR_PREMIUM_NOTES = `## The Pride of Life

Luke 4:9-12 brings us to the final temptation. Satan takes Jesus to the pinnacle of the temple and tells Him to throw Himself down. Then he quotes Psalm 91, trying to use Scripture itself as bait.

That is what makes this temptation so dangerous. The devil is not only tempting with pride. He is tempting with distorted Bible language.

## What Satan Is Really Saying

- 🏛️ prove Yourself publicly
- 📣 make God rescue You dramatically
- 👑 use sonship for self-display

This is the pride of life. It is the urge to put self at the center, to demand proof, and to act as if God's care gives us permission to live recklessly.

## Why the Temple Matters

The temple was the holiest public space in Jewish life. It represented God's presence, worship, sacrifice, and covenant life.

So this temptation is not random. Satan is bringing Jesus into a deeply religious place and trying to turn trust into theater.

That still happens today. People can use spiritual language, Bible verses, and religious environments while still feeding ego.

## Testing God vs Trusting God

Jesus answers with Deuteronomy 6:16:

> "Do not put the Lord your God to the test."

That points back to Massah in Exodus 17, when Israel questioned whether God was really with them.

- they had already seen God's power
- they had already received deliverance
- but in discomfort they demanded proof

Jesus refuses that path. He does not need to force the Father to prove His love.

## Pride Is Lucifer's Pattern

Pride has always been Satan's language.

- "I will ascend"
- "I will exalt myself"
- "I will make myself like the Most High"

That is why this temptation cuts so deep. The enemy wants Jesus to use identity for self-exaltation instead of humble obedience.

## The Pride of Life Today

This temptation still shows up in subtle ways:

- acting like success means you no longer need prayer
- assuming gifting means you can ignore character
- living recklessly and expecting God to clean up everything
- wanting spiritual attention more than spiritual depth

Pride says, "I am good. I have this. I can push the limits."

Faith says, "I still need God. I still obey. I still trust."

## What This Means for You

The first two temptations often hit when you feel empty. This one often hits when you feel strong.

- when things are working
- when prayers are being answered
- when doors are opening
- when you start thinking you got here by yourself

That is why it is so dangerous. Pride can grow in blessing if we stop remembering the One who carried us there.

## A Simple Prayer

"Lord, keep me humble. Do not let blessing make me careless. Teach me to trust You without trying to test You."`;

const WEEK_FIVE_INTRO = `## After the Battle

The wilderness story does not end with Jesus barely surviving. It ends with Jesus standing.

Luke says the devil finished every temptation and then left Him until an opportune time. Then Jesus returned in the power of the Spirit.

## Why This Ending Matters

- 🏜️ the wilderness did not break Jesus
- 🕊️ the Spirit was still with Him
- 🚪 the battle became a doorway into ministry

Week 5 is about what happens after obedience. Jesus comes out of the wilderness stronger, clearer, and ready for the mission in front of Him.`;

const WEEK_FIVE_PREMIUM_NOTES = `## Coming Out Stronger

Luke 4:13-15 shows us the end of the wilderness scene, and it is full of hope.

First, Satan leaves. But Luke is careful with the wording: he leaves "until an opportune time." That means temptation is not gone forever. It circles back, looks for weakness, and tries again later.

## The Enemy Leaves, But Not Forever

- ⏳ temptation often retreats before it returns
- 🕳️ the enemy looks for vulnerable moments
- 📖 that is why daily dependence matters

Jesus did not beat temptation with hype or raw willpower. He answered with Scripture, stayed submitted to the Father, and walked in the Spirit.

## Jesus Returns in the Power of the Spirit

Luke says Jesus returned in the power of the Spirit to Galilee.

That is beautiful because He entered the wilderness full of the Spirit, and He leaves it empowered for ministry. The wilderness was not wasted. It became preparation.

- 🏜️ testing produced clarity
- 🕊️ obedience deepened power
- 🚀 private victory prepared public ministry

## Why the Wilderness Is Not Pointless

We usually want out of wilderness seasons as fast as possible. But Scripture keeps showing that God uses hidden places to form people before public assignments.

- Moses had wilderness years before leadership
- David had wilderness seasons before the throne
- Elijah met God in wilderness weakness
- Jesus faced testing before ministry opened wide

The wilderness is where God strips away illusions and teaches trust.

## What Happens Next

Luke says word about Jesus spread through the region and He taught in their synagogues. In other words, the mission moved forward.

That matters because obedience in private is never meaningless. God often builds things in secret before He reveals them in public.

## What This Means for You

If you are in a hard season right now, do not assume it is empty.

- 💔 God can use heartbreak
- 😔 God can use loneliness
- 💼 God can use uncertainty
- 🙏 God can use waiting

The goal is not just to get out. The goal is to walk through it with God and let Him form something deeper in you.

## A Few Takeaways

- stay close to Scripture before the next battle comes
- do not confuse retreating temptation with permanent victory
- trust that obedience in hidden places matters
- remember that God can turn wilderness seasons into ministry preparation

## Final Thought

Jesus did not come out of the wilderness smaller. He came out stronger.

That does not mean the wilderness felt easy. It means faithful obedience produced something solid. And that same God still uses wilderness seasons to prepare His people for what is next.`;

export function getSeriesKeyFromTitle(seriesTitle?: string | null) {
  const normalized = (seriesTitle || "").toLowerCase();
  if (normalized.includes("joseph")) return "testing_of_joseph" as const;
  if (normalized.includes("abraham")) return "obedience_of_abraham" as const;
  if (normalized.includes("esther")) return "rise_of_esther" as const;
  if (normalized.includes("daniel")) return "courage_of_daniel" as const;
  if (normalized.includes("proverbs")) return "wisdom_of_proverbs" as const;
  return "temptation_of_jesus" as const;
}

export function getSeriesTotalWeeks(seriesTitle?: string | null) {
  return getSeriesKeyFromTitle(seriesTitle) === "testing_of_joseph"
    ? TESTING_OF_JOSEPH.length
    : TEMPTATION_OF_JESUS.length;
}

export function getSeriesWeekLesson(
  weekNumber: number,
  seriesTitle?: string | null,
): SeriesWeekLesson | undefined {
  if (getSeriesKeyFromTitle(seriesTitle) === "testing_of_joseph") {
    return TESTING_OF_JOSEPH.find((w) => w.weekNumber === weekNumber);
  }

  const lesson = TEMPTATION_OF_JESUS.find((w) => w.weekNumber === weekNumber);
  if (!lesson) return undefined;
  if (weekNumber === 1) {
    return {
      ...lesson,
      intro: WEEK_ONE_INTRO,
      notes: WEEK_ONE_PREMIUM_NOTES,
      readingReference: "Luke 4:1-2",
      readingApiQuery: "luke+4:1-2",
      reflectionQuestion:
        "Before Jesus faced the devil in the wilderness, He was baptized - not because He needed cleansing, but to fully identify with us and fulfill God's plan. What stands out to you most about Jesus' baptism? What does His obedience in that moment teach you about your own walk with God?",
    };
  }
  if (weekNumber === 2) {
    return {
      ...lesson,
      title: "The Lust of the Flesh",
      intro: WEEK_TWO_INTRO,
      notes: WEEK_TWO_PREMIUM_NOTES,
      readingReference: "Luke 4:3-4",
      readingApiQuery: "luke+4:3-4",
      reflectionQuestion:
        "When the devil tempted Jesus to turn stones into bread, he was appealing to a real physical hunger. Jesus refused to satisfy a real need in a wrong way. What 'stones' has the enemy been trying to get you to turn into 'bread'? Where do you feel tempted to reach for quick relief instead of trusting God's timing and provision?",
    };
  }
  if (weekNumber === 3) {
    return {
      ...lesson,
      title: "The Lust of the Eyes",
      intro: WEEK_THREE_INTRO,
      notes: WEEK_THREE_PREMIUM_NOTES,
      readingReference: "Luke 4:5-8",
      readingApiQuery: "luke+4:5-8",
      reflectionQuestion:
        "The devil offered Jesus visible glory without the cross. Where do you feel tempted to chase what looks impressive instead of what God is asking of you? What would it look like to choose worship and loyalty over the shortcut this week?",
    };
  }
  if (weekNumber === 4) {
    return {
      ...lesson,
      title: "The Pride of Life",
      intro: WEEK_FOUR_INTRO,
      notes: WEEK_FOUR_PREMIUM_NOTES,
      readingReference: "Luke 4:9-12",
      readingApiQuery: "luke+4:9-12",
      reflectionQuestion:
        "The final temptation was about pride, public display, and testing God instead of trusting Him. Where are you most tempted to rely on yourself, demand control, or drift into spiritual pride? What would humble trust look like for you right now?",
    };
  }
  if (weekNumber === 5) {
    return {
      ...lesson,
      intro: WEEK_FIVE_INTRO,
      notes: WEEK_FIVE_PREMIUM_NOTES,
      readingReference: "Luke 4:13-30",
      readingApiQuery: "luke+4:13-30",
      reflectionQuestion:
        "Jesus came out of the wilderness in the power of the Spirit, ready for what was next. If you are in a hard season, how might God be using it to prepare you instead of just punish you? What would it look like to trust Him with that process?",
    };
  }
  return lesson;
}

export const TOTAL_WEEKS = TEMPTATION_OF_JESUS.length;


