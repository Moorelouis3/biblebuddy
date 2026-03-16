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
  // Weeks 2–5 coming soon
];

export function getSeriesWeekLesson(weekNumber: number): SeriesWeekLesson | undefined {
  return TEMPTATION_OF_JESUS.find((w) => w.weekNumber === weekNumber);
}

export const TOTAL_WEEKS = 5;
