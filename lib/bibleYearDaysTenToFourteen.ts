import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DayBlueprint = {
  dayNumber: number;
  title: string;
  reference: string;
  listenTime: string;
  opening: string[];
  sections: Array<{
    reference: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    heading: string;
    icon: string;
    summary: string;
    teaching: string[];
  }>;
  closing: string[];
};

function buildLesson(day: DayBlueprint): BibleYearDailyLesson {
  return {
    dayNumber: day.dayNumber,
    title: day.title,
    reference: day.reference,
    estimatedListenTime: day.listenTime,
    opening: day.opening,
    sections: day.sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: section.teaching,
    })),
    closing: day.closing,
  };
}

function buildDeepNotes(day: DayBlueprint) {
  return `${day.reference} continues the Bible in One Year journey with ${day.title}.

${day.opening.join("\n\n")}

Big idea: ${day.closing[day.closing.length - 1]}`;
}

function buildStudySections(day: DayBlueprint): BibleYearDeepStudySection[] {
  return day.sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: section.icon,
    summary: section.summary,
    markdown: `## ${section.reference}

> **${section.startVerse}** This section opens the story movement in ${section.reference}.

## What Is Happening Here?

${section.teaching.join("\n\n")}

## What This Means

This part of the story helps us follow how God's promise moves through real family pressure, weakness, obedience, and mercy.

## Big Idea

${section.summary}`,
  }));
}

const DAY_10: DayBlueprint = {
  dayNumber: 10,
  title: "Covenant Through Isaac",
  reference: "Genesis 25-27",
  listenTime: "about 35 min",
  opening: [
    "Genesis 25-27 follows Abraham's final years and Isaac's household as the covenant promise continues through a very imperfect family.",
    "Abraham's life closes, Jacob and Esau are born, Isaac faces famine, repeats some of Abraham's fear, digs wells, and receives God's promise.",
    "Then Genesis 27 shows deception, favoritism, Jacob, Esau, and the blessing moving forward through weakness.",
  ],
  sections: [
    {
      reference: "Genesis 25:1-18",
      chapter: 25,
      startVerse: 1,
      endVerse: 18,
      heading: "Abraham's Final Years",
      icon: "scroll",
      summary: "Abraham's life closes, and Genesis keeps the covenant line focused through Isaac.",
      teaching: [
        "Abraham has more descendants, gives gifts, and sends other sons away from Isaac.",
        "Then Abraham dies full of years.",
        "Isaac and Ishmael bury him together.",
        "The focus remains clear: the covenant promise continues through Isaac.",
      ],
    },
    {
      reference: "Genesis 25:19-34",
      chapter: 25,
      startVerse: 19,
      endVerse: 34,
      heading: "Jacob and Esau Are Born",
      icon: "twins",
      summary: "Isaac's household begins with waiting, prayer, twins, conflict, and a despised birthright.",
      teaching: [
        "Genesis now turns toward Isaac's family.",
        "Rebekah conceives twins, and the struggle begins before birth.",
        "Jacob and Esau grow into very different men, and Esau despises his birthright.",
        "The next generation begins with conflict, but God's purpose is still moving forward.",
      ],
    },
    {
      reference: "Genesis 26:1-11",
      chapter: 26,
      startVerse: 1,
      endVerse: 11,
      heading: "Isaac Faces Famine and Fear",
      icon: "wheat",
      summary: "Isaac faces famine and repeats Abraham's fear, but God still confirms the covenant promise.",
      teaching: [
        "A famine comes in Isaac's day, just as one came in Abraham's day.",
        "God tells Isaac not to go down to Egypt and repeats the promise of land, descendants, and blessing.",
        "Isaac still acts out of fear and says Rebekah is his sister.",
      ],
    },
    {
      reference: "Genesis 26:12-25",
      chapter: 26,
      startVerse: 12,
      endVerse: 25,
      heading: "Isaac Digs Wells",
      icon: "well",
      summary: "Isaac keeps moving through conflict until God gives him room and he worships.",
      teaching: [
        "Isaac prospers, but conflict rises around the wells.",
        "Instead of fighting over every place, Isaac keeps moving and digging.",
        "At Beersheba, God appears to him and says, Do not be afraid.",
      ],
    },
    {
      reference: "Genesis 27:1-29",
      chapter: 27,
      startVerse: 1,
      endVerse: 29,
      heading: "Jacob Receives the Blessing",
      icon: "hands",
      summary: "Rebekah and Jacob use deception, and Isaac blesses Jacob instead of Esau.",
      teaching: [
        "Isaac plans to bless Esau, but Rebekah and Jacob scheme to secure the blessing.",
        "Jacob wears Esau's clothes and deceives his father.",
        "The blessing lands on Jacob, but the way it happens wounds the family.",
      ],
    },
    {
      reference: "Genesis 27:30-46",
      chapter: 27,
      startVerse: 30,
      endVerse: 46,
      heading: "Esau's Grief and Jacob's Escape",
      icon: "tears",
      summary: "Esau grieves the stolen blessing, and Jacob must flee from the conflict his deception helped create.",
      teaching: [
        "Esau realizes the blessing has been given to Jacob and cries bitterly.",
        "Anger rises, and Jacob's life is now in danger.",
        "The covenant continues, but the family is fractured by favoritism and deception.",
      ],
    },
  ],
  closing: [
    "Day 10 shows that the covenant promise continues as Abraham's life closes and Isaac's household comes into focus.",
    "But Genesis is honest: this family is marked by fear, conflict, favoritism, and deception.",
    "God's promise moves forward, but human sin still leaves real consequences.",
  ],
};

const BIBLE_YEAR_DAY_TEN_DEEP_NOTES_MARKDOWN = `Genesis 25-27 moves the covenant story from Abraham into Isaac's household.

Abraham's life closes, but God's promise does not close with him. Isaac becomes the covenant heir, Rebekah bears twins after prayer, Jacob and Esau begin their struggle, and the family starts carrying both promise and pain into the next generation.

🌅 Abraham dies full of years, but the covenant line continues through Isaac.

👶 Jacob and Esau are born after waiting and prayer, and the conflict between them begins before birth.

🌾 Isaac faces famine, but God tells him to stay in the land and repeats the Abrahamic promise.

💧 Isaac digs wells and keeps moving through conflict until God gives him room.

🎭 Genesis 27 shows favoritism, deception, grief, and a blessing that moves forward through a badly fractured family.

> 🔥 **Big idea:** Genesis 25-27 teaches that God's covenant promise keeps moving, but fear, favoritism, and deception can wound a family deeply. The promise is carried by God's faithfulness, not by a perfect household.`;

const BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS_MANUAL: BibleYearDeepStudySection[] = [
  {
    reference: "Genesis 25:1-11",
    title: "Abraham's Life Comes To A Close",
    icon: "🌅",
    summary: "Abraham dies full of years, but the covenant promise continues through Isaac.",
    markdown: `## Genesis 25:1-11

> 📖 Read Genesis 25:1-11.

## 🌅 What Is Happening Here?

Genesis 25 begins by closing Abraham's earthly life.

Abraham has other children through Keturah, gives gifts, and sends the sons of his concubines eastward. Then the text carefully says that Abraham gave all he had to Isaac.

That detail matters. Genesis is not saying the other children are worthless. It is showing that the covenant line is focused through Isaac, the son God promised to Abraham and Sarah.

Abraham dies "old and full." His story has included faith, fear, obedience, failure, waiting, laughter, grief, and worship. But the promise does not die with him.

Isaac and Ishmael bury Abraham together in the cave of Machpelah, the same burial place Abraham bought after Sarah's death.

## 🧭 What This Means

The Bible lets Abraham's life end, but it does not let God's covenant end.

This is a major generational transition. The focus is moving from Abraham to Isaac, then from Isaac's house toward Jacob. The promise is bigger than one person's lifespan.

That is one of the quiet lessons of Genesis: faithful people die, but God's word keeps going.

## 🔥 Big Idea

God's promise is not held together by Abraham staying alive forever. It is held together by the God who keeps His covenant across generations.`,
  },
  {
    reference: "Genesis 25:12-18",
    title: "Ishmael's Line Is Remembered",
    icon: "📜",
    summary: "Genesis records Ishmael's descendants, showing that God did not forget Hagar's son.",
    markdown: `## Genesis 25:12-18

> 📖 Read Genesis 25:12-18.

## 📜 What Is Happening Here?

Genesis pauses to record Ishmael's family line.

This matters because Ishmael is not the covenant heir through whom the main promise will continue. That role belongs to Isaac. But Ishmael is still seen, named, and remembered.

Back in Genesis 16 and 21, God heard Hagar and promised that Ishmael would become a great nation. Genesis 25 shows that God's word to Hagar was not empty.

Ishmael has twelve princes, and his descendants spread through their settlements and camps.

## 🧭 What This Means

The chosen covenant line does not mean God is careless with everyone outside that line.

Genesis keeps Isaac central, but it also honors the fact that God heard Hagar, preserved Ishmael, and kept His promise concerning him.

This helps us read the Bible with nuance. Election and compassion are not enemies in Genesis. God chooses the covenant line, and He still sees the people wounded around that story.

## 🔥 Big Idea

God's main covenant promise moves through Isaac, but His mercy and attention are wider than the main family line.`,
  },
  {
    reference: "Genesis 25:19-26",
    title: "Jacob And Esau Are Born",
    icon: "👶",
    summary: "Isaac prays, Rebekah conceives twins, and God speaks before the boys are born.",
    markdown: `## Genesis 25:19-26

> 📖 Read Genesis 25:19-26.

## 👶 What Is Happening Here?

Isaac and Rebekah face barrenness.

That should sound familiar. The promise continues, but the next generation also begins with human inability. Isaac prays for Rebekah, and the LORD grants the prayer.

Rebekah conceives twins, but the pregnancy is difficult. The children struggle within her, so she asks the LORD what is happening.

God tells her that two nations are in her womb and that the older will serve the younger.

This word comes before Jacob or Esau has done anything. Genesis is showing that God's purpose is already moving before human strength, status, or birth order can claim control.

## 🧭 What This Means

The covenant family is already complicated before the children are even born.

Esau comes out first, red and hairy. Jacob follows holding Esau's heel. Their names and birth scene prepare us for the conflict that will shape the rest of the chapter.

But the deeper point is that God speaks into the story before the family knows how to handle the story.

## 🔥 Big Idea

God's promise moves forward by His purpose, not by normal human expectations about birth order, strength, or family preference.`,
  },
  {
    reference: "Genesis 25:27-34",
    title: "Esau Sells The Birthright",
    icon: "🥣",
    summary: "Esau trades his birthright for a meal, showing how lightly he treats what should have been precious.",
    markdown: `## Genesis 25:27-34

> 📖 Read Genesis 25:27-34.

## 🥣 What Is Happening Here?

Jacob and Esau grow into very different men.

Esau becomes a skillful hunter, a man of the field. Jacob is described as a quiet man dwelling in tents. The family is already divided by favoritism: Isaac loves Esau because he eats of his game, while Rebekah loves Jacob.

Then Esau comes in exhausted and asks for Jacob's stew. Jacob asks for the birthright in return.

Esau agrees.

The passage ends by saying Esau despised his birthright.

## 🧭 Why The Birthright Matters

The birthright was not just a snack-level trade.

It represented firstborn inheritance, family leadership, and in this family, connection to the covenant future. Esau treats something weighty as if it is worth no more than immediate hunger.

Jacob's behavior is not presented as noble either. He takes advantage of Esau's appetite. Genesis is showing a family where desire, calculation, and favoritism are already working damage.

## 🔥 Big Idea

Esau's appetite and Jacob's grasping both reveal hearts that need God's mercy. The covenant promise is moving through a messy family, not a clean one.`,
  },
  {
    reference: "Genesis 26:1-11",
    title: "Isaac Faces Famine And Fear",
    icon: "🌾",
    summary: "Isaac faces famine, hears God's promise, then repeats Abraham's fear about his wife.",
    markdown: `## Genesis 26:1-11

> 📖 Read Genesis 26:1-11.

## 🌾 What Is Happening Here?

A famine comes in Isaac's day.

That echoes Abraham's earlier famine. Isaac is now facing his own version of the pressure his father faced. God tells Isaac not to go down to Egypt. Instead, Isaac is to stay in the land God shows him.

Then God repeats the promise: land, descendants, blessing, and blessing for all nations through Abraham's offspring.

But Isaac also repeats Abraham's fear. He says Rebekah is his sister because he is afraid the men of the place will kill him for her.

## 🧭 What This Means

Generational patterns can echo.

Isaac has truly inherited the promise, but he has also learned fear. Genesis does not pretend covenant families automatically become healthy families. The same God who keeps the promise must also keep working in the people who carry it.

God protects Rebekah and exposes the lie before deeper damage happens.

## 🔥 Big Idea

The promise is real, but fear can still distort obedience. Isaac needs the same faithful God his father needed.`,
  },
  {
    reference: "Genesis 26:12-25",
    title: "Isaac Digs Wells",
    icon: "💧",
    summary: "Isaac prospers, faces conflict over wells, keeps moving, and worships when God gives him room.",
    markdown: `## Genesis 26:12-25

> 📖 Read Genesis 26:12-25.

## 💧 What Is Happening Here?

Isaac sows in the land and the LORD blesses him.

His prosperity becomes so noticeable that the Philistines envy him. Conflict rises around the wells, which were essential for life, livestock, and settlement.

Isaac reopens wells from Abraham's day, but others quarrel over them. He names one Esek because of contention and another Sitnah because of hostility. Then he moves again and digs another well. This time there is room, so he names it Rehoboth.

Later at Beersheba, the LORD appears and says, "Do not be afraid." Isaac builds an altar, calls on the name of the LORD, pitches his tent, and his servants dig a well.

## 🧭 Why Wells Matter

Wells are not side details.

They show whether Isaac can live in the land under God's promise. They show conflict, patience, and provision. Isaac does not win every argument by force. He keeps moving until God gives him room.

The altar matters too. Isaac's life in the land is not only about survival. It is about worship.

## 🔥 Big Idea

God can make room for His promise even when people oppose, envy, or quarrel over the place where He has called you to live.`,
  },
  {
    reference: "Genesis 26:26-35",
    title: "Peace With Abimelech And Pain At Home",
    icon: "🤝",
    summary: "Isaac makes peace with Abimelech, but Esau's marriages bring grief into the household.",
    markdown: `## Genesis 26:26-35

> 📖 Read Genesis 26:26-35.

## 🤝 What Is Happening Here?

Abimelech comes to Isaac with his adviser and army commander.

They recognize that the LORD is with Isaac and want a covenant of peace. Isaac prepares a feast, and they make an oath.

This shows that God's blessing on Isaac has become visible even to outsiders.

Then the chapter ends with a painful family note: Esau marries Hittite women, and they bring grief to Isaac and Rebekah.

## 🧭 What This Means

Genesis holds public blessing and private grief together.

Isaac can experience God's favor in the land and still have real pain inside his household. The covenant family is not neat. The home is full of tension that will explode in Genesis 27.

The note about Esau's wives prepares us to understand why the question of family, blessing, and covenant direction becomes so intense.

## 🔥 Big Idea

God's blessing can be visible in public while unresolved family pain is still growing in private.`,
  },
  {
    reference: "Genesis 27:1-29",
    title: "Jacob Receives The Blessing",
    icon: "🎭",
    summary: "Rebekah and Jacob use deception, and Isaac blesses Jacob instead of Esau.",
    markdown: `## Genesis 27:1-29

> 📖 Read Genesis 27:1-29.

## 🎭 What Is Happening Here?

Isaac is old and his eyes are dim.

He calls Esau and plans to bless him after Esau prepares the food he loves. Rebekah hears the plan and creates a counter-plan for Jacob.

Jacob wears Esau's clothes and goat skins to deceive his father. Isaac is suspicious, but Jacob lies repeatedly. He even uses God's name in the deception when Isaac asks how he found the game so quickly.

Isaac blesses Jacob.

## 🧭 Why This Is So Painful

Genesis 25 already said the older would serve the younger. But Genesis 27 shows the family trying to handle God's word through secrecy, preference, and manipulation.

Isaac favors Esau. Rebekah favors Jacob. Jacob lies. Esau is about to be devastated.

The blessing moves to Jacob, but the way it happens tears the family apart.

## 🔥 Big Idea

God's purpose moves forward, but deception still wounds everyone involved. Getting the desired outcome in a sinful way is not the same as trusting God.`,
  },
  {
    reference: "Genesis 27:30-46",
    title: "Esau's Grief And Jacob's Escape",
    icon: "💔",
    summary: "Esau grieves the blessing, anger rises, and Jacob must leave home because of the family fracture.",
    markdown: `## Genesis 27:30-46

> 📖 Read Genesis 27:30-46.

## 💔 What Is Happening Here?

Esau comes in right after Jacob leaves.

Isaac realizes what happened and trembles violently. Esau cries out with a bitter cry. The scene is emotionally heavy. Esau had despised his birthright earlier, but his grief here is still real.

Isaac gives Esau a word about his future, but the main blessing has already gone to Jacob.

Esau hates Jacob and plans to kill him after Isaac dies. Rebekah hears this and sends Jacob away to her brother Laban.

Jacob leaves with the blessing, but he also leaves with consequences.

## 🧭 What This Means

Genesis is not celebrating deception.

The covenant line continues through Jacob, but his home breaks. He will not see his mother again in the story. He will spend years away from home. He will later be deceived by Laban, just as he deceived Isaac.

Sin does not stop God's promise, but it does create pain.

## 🔥 Big Idea

The blessing moves forward, but the family fracture is real. God's faithfulness is strong enough to carry the promise through human failure, but human failure still has consequences.`,
  },
];

const DAY_11: DayBlueprint = {
  dayNumber: 11,
  title: "Jacob Meets God at Bethel",
  reference: "Genesis 28-29",
  listenTime: "about 35 min",
  opening: [
    "Genesis 28-29 follows Jacob after the blessing has been given, but the family has been broken.",
    "Jacob leaves home carrying the covenant blessing, his father's command, his mother's protection, Esau's anger, and the consequences of deception.",
    "On the road, God meets Jacob at Bethel and makes the promise personal: land, descendants, blessing, presence, protection, and return.",
    "Then Jacob reaches Haran, meets Rachel at a well, enters Laban's house, serves seven years for love, and discovers what deception feels like from the other side.",
  ],
  sections: [
    {
      reference: "Genesis 28:1-5",
      chapter: 28,
      startVerse: 1,
      endVerse: 5,
      heading: "Isaac Sends Jacob Away",
      icon: "road",
      summary: "Jacob leaves home with the blessing of Abraham, but also with family fracture behind him.",
      teaching: [
        "Isaac sends Jacob to Paddan Aram to marry within the family line instead of taking a wife from Canaan.",
        "This is not only a marriage instruction. It keeps the covenant family distinct and connects Jacob's future to the promise God gave Abraham.",
        "Jacob leaves with blessing, but he does not leave in peace. His departure is also shaped by Esau's anger and the fallout from Genesis 27.",
      ],
    },
    {
      reference: "Genesis 28:6-9",
      chapter: 28,
      startVerse: 6,
      endVerse: 9,
      heading: "Esau Tries to Fix the Problem",
      icon: "family",
      summary: "Esau notices what displeases his parents, but his response shows he still does not understand the covenant clearly.",
      teaching: [
        "Esau sees that Isaac and Rebekah do not want Jacob marrying Canaanite women.",
        "He responds by marrying into Ishmael's line, adding another wife to the wives he already had.",
        "The scene shows Esau reacting to family pressure, but not truly walking in covenant wisdom.",
      ],
    },
    {
      reference: "Genesis 28:10-15",
      chapter: 28,
      startVerse: 10,
      endVerse: 15,
      heading: "Jacob Dreams of the Stairway",
      icon: "ladder",
      summary: "God meets Jacob in the wilderness and repeats the covenant promise personally to him.",
      teaching: [
        "Jacob sleeps outside with a stone for a pillow, far from home and exposed on the road.",
        "In the dream, he sees a stairway between earth and heaven with angels ascending and descending.",
        "God speaks the Abrahamic promise over Jacob: land, offspring, blessing to the nations, presence, protection, and return.",
        "Jacob has known about the God of Abraham and Isaac. Now God speaks to Jacob directly.",
      ],
    },
    {
      reference: "Genesis 28:16-22",
      chapter: 28,
      startVerse: 16,
      endVerse: 22,
      heading: "Jacob Names the Place Bethel",
      icon: "stone",
      summary: "Jacob realizes God was present in the place he thought was only a campsite.",
      teaching: [
        "Jacob wakes with fear and awe, saying that Yahweh was in that place and he did not know it.",
        "He sets up the stone as a pillar, pours oil on it, and names the place Bethel, meaning house of God.",
        "Jacob's vow is still cautious and conditional, but it shows that the promise is beginning to become personal to him.",
      ],
    },
    {
      reference: "Genesis 29:1-14",
      chapter: 29,
      startVerse: 1,
      endVerse: 14,
      heading: "Jacob Meets Rachel at the Well",
      icon: "well",
      summary: "Jacob arrives in Haran, finds Rachel, and is welcomed into Laban's house.",
      teaching: [
        "Genesis 29 begins with movement and hope: Jacob reaches the land of his relatives.",
        "The well scene echoes earlier marriage-at-a-well stories, especially Abraham's servant finding Rebekah for Isaac.",
        "Jacob rolls the stone away, waters Rachel's flock, kisses her, weeps, and tells her who he is.",
        "Laban welcomes Jacob as family, but the warmth of this welcome will soon become complicated.",
      ],
    },
    {
      reference: "Genesis 29:15-20",
      chapter: 29,
      startVerse: 15,
      endVerse: 20,
      heading: "Jacob Serves Seven Years for Rachel",
      icon: "heart",
      summary: "Jacob loves Rachel and agrees to serve seven years for her.",
      teaching: [
        "Laban asks Jacob what his wages should be, and Jacob names Rachel.",
        "Seven years is a serious bride-service agreement, but Genesis says the years seemed like only a few days because of Jacob's love for her.",
        "The story is tender here, but it is also setting up a painful reversal.",
      ],
    },
    {
      reference: "Genesis 29:21-30",
      chapter: 29,
      startVerse: 21,
      endVerse: 30,
      heading: "Laban Deceives Jacob",
      icon: "veil",
      summary: "Jacob the deceiver is deceived, and the family story bends under Laban's manipulation.",
      teaching: [
        "Jacob asks for Rachel after the seven years are complete.",
        "Laban makes a feast, but in the evening he brings Leah to Jacob instead of Rachel.",
        "In the morning Jacob realizes the truth and asks why Laban deceived him.",
        "The man who used disguise and darkness to deceive his father is now deceived through darkness, custom, and family manipulation.",
      ],
    },
    {
      reference: "Genesis 29:31-35",
      chapter: 29,
      startVerse: 31,
      endVerse: 35,
      heading: "God Sees Leah",
      icon: "tears",
      summary: "Leah is unloved by Jacob, but Yahweh sees her affliction and begins building Israel through her.",
      teaching: [
        "Genesis does not hide Leah's pain. She is hated, meaning unloved or treated as rejected compared with Rachel.",
        "Yahweh sees Leah and opens her womb while Rachel is barren.",
        "Leah names her sons out of longing, pain, and hope: Reuben, Simeon, Levi, and Judah.",
        "Judah's birth matters deeply because the royal line and eventually the Messiah will come through Judah, the son born to the overlooked woman.",
      ],
    },
  ],
  closing: [
    "Day 11 shows Jacob leaving home with blessing and consequences tangled together.",
    "God meets him before Jacob has cleaned himself up, grown mature, or proven himself faithful.",
    "Then Jacob enters Laban's house and begins learning what deception does from the other side.",
    "Genesis 28-29 teaches that God's presence can meet us on the road, and God's mercy can see the person everyone else overlooks.",
  ],
};

const DAY_12: DayBlueprint = {
  dayNumber: 12,
  title: "Jacob Leaves Laban",
  reference: "Genesis 30-31",
  listenTime: "about 40 min",
  opening: [
    "Genesis 30-31 follows Jacob deeper into Laban's house, where family growth and family pain happen at the same time.",
    "Rachel and Leah struggle for love, children, honor, and security, while Jacob works under a man who keeps changing the terms.",
    "God blesses Jacob in an unfair place, then calls him to return to the land of his fathers with his wives, children, flocks, and unresolved tension.",
  ],
  sections: [
    {
      reference: "Genesis 30:1-13",
      chapter: 30,
      startVerse: 1,
      endVerse: 13,
      heading: "Rachel and Leah Compete",
      icon: "family",
      summary: "Rachel and Leah's rivalry shows how painful Jacob's household has become.",
      teaching: [
        "Rachel envies Leah because Leah has children and Rachel does not.",
        "Bilhah and Zilpah are brought into the family struggle, and children are born inside rivalry instead of peace.",
        "Genesis is showing growth, but it is not pretending the growth is healthy.",
      ],
    },
    {
      reference: "Genesis 30:14-24",
      chapter: 30,
      startVerse: 14,
      endVerse: 24,
      heading: "God Remembers Rachel",
      icon: "baby",
      summary: "God listens to Leah and remembers Rachel, and Joseph is born after years of pain.",
      teaching: [
        "The mandrake scene shows how tense the relationship between Rachel and Leah has become.",
        "God listens to Leah, and then God remembers Rachel and opens her womb.",
        "Joseph's birth becomes a major turning point, because his story will later carry Genesis toward Egypt.",
      ],
    },
    {
      reference: "Genesis 30:25-43",
      chapter: 30,
      startVerse: 25,
      endVerse: 43,
      heading: "Jacob Prospers Under Pressure",
      icon: "flock",
      summary: "Jacob works under Laban's pressure, but God still increases him.",
      teaching: [
        "After Joseph is born, Jacob asks Laban to send him home.",
        "Laban wants Jacob to stay because he knows Yahweh has blessed him through Jacob.",
        "The flock arrangement is full of tension and strategy, but the larger point is that Jacob increases under God's care even while Laban keeps trying to benefit from him.",
      ],
    },
    {
      reference: "Genesis 31:1-16",
      chapter: 31,
      startVerse: 1,
      endVerse: 16,
      heading: "God Tells Jacob to Return",
      icon: "home",
      summary: "God calls Jacob back to the land of promise after years of pressure under Laban.",
      teaching: [
        "Laban's sons accuse Jacob, and Laban's face is no longer friendly toward him.",
        "Yahweh tells Jacob to return to the land of his fathers and promises to be with him.",
        "Jacob explains to Rachel and Leah how Laban changed his wages, but God protected him.",
        "Rachel and Leah agree that their father has treated them like outsiders, so they are ready to go.",
      ],
    },
    {
      reference: "Genesis 31:17-21",
      chapter: 31,
      startVerse: 17,
      endVerse: 21,
      heading: "Jacob Leaves Secretly",
      icon: "camel",
      summary: "Jacob leaves with his family and possessions, while Rachel secretly takes Laban's household idols.",
      teaching: [
        "Jacob sets his family on camels and leaves for Canaan.",
        "Rachel steals the teraphim, household idols that may have been tied to inheritance or family authority.",
        "Jacob also deceives Laban by leaving without telling him, so the escape carries both obedience and unresolved fear.",
      ],
    },
    {
      reference: "Genesis 31:22-35",
      chapter: 31,
      startVerse: 22,
      endVerse: 35,
      heading: "Laban Pursues Jacob",
      icon: "warning",
      summary: "Laban pursues Jacob, but God warns him not to harm Jacob.",
      teaching: [
        "Laban catches up to Jacob after seven days of pursuit.",
        "God comes to Laban in a dream and warns him not to speak to Jacob either good or bad.",
        "Laban accuses Jacob, but the stolen teraphim are hidden by Rachel, and Jacob does not know they are there.",
      ],
    },
    {
      reference: "Genesis 31:36-42",
      chapter: 31,
      startVerse: 36,
      endVerse: 42,
      heading: "Jacob Confronts Laban",
      icon: "scale",
      summary: "Jacob names twenty years of hard labor, unfair treatment, and God's protection.",
      teaching: [
        "Jacob finally speaks openly about the cost of serving Laban.",
        "He describes heat by day, frost by night, lost sleep, and wages changed ten times.",
        "Jacob says God saw his affliction and protected him from being sent away empty.",
      ],
    },
    {
      reference: "Genesis 31:43-55",
      chapter: 31,
      startVerse: 43,
      endVerse: 55,
      heading: "A Boundary Covenant",
      icon: "stones",
      summary: "Jacob and Laban set up stones as a witness and part ways with a boundary between them.",
      teaching: [
        "Laban still speaks possessively about the daughters, children, and flocks, but he cannot take them back.",
        "Jacob sets up a pillar, and the family gathers stones into a heap of witness.",
        "The covenant is not a warm friendship moment. It is a boundary: neither man will cross this place to harm the other.",
        "Laban returns to his place, and Jacob is finally free to keep moving toward the land God promised.",
      ],
    },
  ],
  closing: [
    "Day 12 shows growth under pressure, but it does not romanticize the pressure.",
    "Jacob's household grows through rivalry and pain, and Jacob prospers while Laban keeps trying to control the situation.",
    "But God sees, God protects, God speaks, and God calls Jacob home.",
    "Genesis 30-31 teaches that God can bless His people in hard places, then lead them out when it is time to return.",
  ],
};

const DAY_13: DayBlueprint = {
  dayNumber: 13,
  title: "Jacob Wrestles With God",
  reference: "Genesis 32-33",
  listenTime: "30-35 min",
  opening: [
    "Genesis 32-33 brings Jacob back toward the wound he has been avoiding for years.",
    "He has left Laban, but now Esau is ahead of him, and the old blessing conflict is no longer just a memory.",
    "Before Jacob can face his brother in the daylight, he has to face God in the dark.",
    "This day moves through fear, prayer, strategy, wrestling, weakness, blessing, reconciliation, and worship.",
  ],
  sections: [
    {
      reference: "Genesis 32:1-2",
      chapter: 32,
      startVerse: 1,
      endVerse: 2,
      heading: "Jacob Meets God's Messengers",
      icon: "angels",
      summary: "Jacob sees angels as he re-enters the land, reminding him that he is not traveling alone.",
      teaching: [
        "Jacob is moving toward danger, but the chapter opens with God's messengers meeting him.",
        "He names the place Mahanaim, which means two camps.",
        "That name matters because Jacob will soon divide his own camp, but Genesis first shows us God's unseen camp around him.",
        "Before Jacob can count Esau's men, he is reminded that God's presence is already there.",
      ],
    },
    {
      reference: "Genesis 32:3-8",
      chapter: 32,
      startVerse: 3,
      endVerse: 8,
      heading: "Jacob Hears Esau Is Coming",
      icon: "warning",
      summary: "Jacob sends messengers to Esau and becomes afraid when he hears Esau is coming with four hundred men.",
      teaching: [
        "Jacob calls Esau lord and calls himself servant, which shows how much the old conflict still weighs on him.",
        "The report comes back: Esau is coming with four hundred men.",
        "Genesis does not say Esau's motive yet. That silence creates tension.",
        "Jacob is greatly afraid and distressed, so he divides the people, flocks, herds, and camels into two camps.",
        "This is practical planning, but it also shows how fear starts shaping his decisions.",
      ],
    },
    {
      reference: "Genesis 32:9-12",
      chapter: 32,
      startVerse: 9,
      endVerse: 12,
      heading: "Jacob Prays the Promise Back to God",
      icon: "prayer",
      summary: "Jacob brings his fear to God and anchors his prayer in what God already promised.",
      teaching: [
        "Jacob addresses God as the God of Abraham and Isaac, but he also remembers that God told him to return.",
        "This prayer is one of Jacob's clearest spiritual moments so far.",
        "He admits he is not worthy of all the mercy and faithfulness God has shown him.",
        "He asks God to deliver him from Esau because he is afraid.",
        "Then he repeats God's promise about descendants, showing that prayer is not pretending fear is gone. Prayer is bringing fear under God's word.",
      ],
    },
    {
      reference: "Genesis 32:13-21",
      chapter: 32,
      startVerse: 13,
      endVerse: 21,
      heading: "Jacob Sends Gifts Ahead",
      icon: "gift",
      summary: "Jacob sends waves of gifts to Esau, hoping to soften the meeting before they come face to face.",
      teaching: [
        "Jacob prepares a large gift from his flocks and herds.",
        "The servants are sent in groups, one after another, so Esau keeps encountering generosity before he sees Jacob.",
        "Jacob says he wants to appease Esau's face before he sees his face.",
        "The word face becomes important because Jacob will soon say he has seen God's face and then Esau's face.",
        "Jacob is still strategizing, but the story is moving him toward a deeper encounter than strategy can control.",
      ],
    },
    {
      reference: "Genesis 32:22-32",
      chapter: 32,
      startVerse: 22,
      endVerse: 32,
      heading: "Jacob Wrestles Through the Night",
      icon: "wrestle",
      summary: "Jacob wrestles, is wounded, receives blessing, and is renamed Israel.",
      teaching: [
        "Jacob sends everyone across the brook and is left alone at night.",
        "A mysterious man wrestles with him until daybreak.",
        "Jacob has spent much of his life grabbing, striving, and trying to secure blessing. Now the struggle becomes physical and spiritual.",
        "The man touches Jacob's hip, and Jacob is wounded, but he still clings and says he will not let go unless he is blessed.",
        "Jacob is asked his name, and he has to say Jacob, the name tied to grasping and deception.",
        "Then he receives a new name: Israel, because he has struggled with God and with men and has prevailed.",
        "Jacob names the place Peniel because he says he has seen God face to face and his life was preserved.",
        "He walks away limping. The blessing does not erase weakness; it marks him through weakness.",
      ],
    },
    {
      reference: "Genesis 33:1-11",
      chapter: 33,
      startVerse: 1,
      endVerse: 11,
      heading: "Jacob and Esau Meet",
      icon: "embrace",
      summary: "Jacob meets Esau, and the feared confrontation becomes a surprising moment of mercy.",
      teaching: [
        "Jacob sees Esau coming and arranges his family behind him.",
        "Jacob bows seven times as he approaches, taking the posture of humility instead of rivalry.",
        "Esau runs to meet him, embraces him, falls on his neck, kisses him, and they weep.",
        "The scene is not what Jacob feared. The brother he expected as a threat meets him with mercy.",
        "Jacob says seeing Esau's face is like seeing the face of God because Esau receives him graciously.",
        "That does not mean Esau is God. It means Jacob recognizes mercy in the face of the person he feared most.",
      ],
    },
    {
      reference: "Genesis 33:12-17",
      chapter: 33,
      startVerse: 12,
      endVerse: 17,
      heading: "Jacob Moves Carefully",
      icon: "road",
      summary: "Jacob and Esau part ways peacefully, but Jacob still moves with caution and care for his household.",
      teaching: [
        "Esau offers to travel with Jacob, but Jacob explains that the children and flocks need a slower pace.",
        "Jacob is not rushing the fragile peace.",
        "The brothers do not suddenly become one household, but the threat of revenge has been lifted.",
        "Jacob journeys to Succoth, builds booths for his cattle, and continues moving forward.",
      ],
    },
    {
      reference: "Genesis 33:18-20",
      chapter: 33,
      startVerse: 18,
      endVerse: 20,
      heading: "Jacob Builds an Altar",
      icon: "altar",
      summary: "Jacob arrives in the land and builds an altar to the God of Israel.",
      teaching: [
        "Jacob comes safely to Shechem in the land of Canaan.",
        "That word safely matters because God promised to bring him back.",
        "Jacob buys a piece of land and builds an altar.",
        "He names it El-elohe-Israel, meaning God, the God of Israel.",
        "The new name Israel is now tied to worship. Jacob's identity is no longer only about what he escaped; it is about the God who met him, wounded him, blessed him, and brought him home.",
      ],
    },
  ],
  closing: [
    "Day 13 shows Jacob changed through fear, prayer, and a night he could not control.",
    "He does not walk away untouched. He limps away blessed.",
    "Then he meets Esau and discovers that the face he feared can become a place where mercy is received.",
    "Genesis 32-33 teaches that God can meet us before the hard conversation, reshape us in weakness, and bring peace where we expected only judgment.",
  ],
};

const DAY_14: DayBlueprint = {
  dayNumber: 14,
  title: "Jacob's Family and Esau's Line",
  reference: "Genesis 34-36",
  listenTime: "40-45 min",
  opening: [
    "Genesis 34-36 closes Jacob's section with a hard mix of family damage, spiritual renewal, grief, and generational history.",
    "This day is not light. Genesis 34 tells a painful story involving Dinah, Shechem, deception, anger, and violence. The Bible does not clean it up or pretend covenant families never face ugly chapters.",
    "Then Genesis 35 shows God calling Jacob back to Bethel, the place where God first met him on the road years earlier. Before Jacob moves forward, the household must put away idols, purify themselves, and return to worship.",
    "Genesis 36 then records Esau's line becoming Edom. That is not just a random family list. It explains how Jacob and Esau's family story grows into the later story of nations.",
  ],
  sections: [
    {
      reference: "Genesis 34:1-31",
      chapter: 34,
      startVerse: 1,
      endVerse: 31,
      heading: "Dinah and Shechem",
      icon: "warning",
      summary: "A painful chapter shows violation, anger, deception, and violence inside Jacob's family story.",
      teaching: [
        "Dinah, Jacob and Leah's daughter, goes out to see the women of the land, and Shechem violates her.",
        "The chapter is heavy because it shows how vulnerable people can become trapped inside the desires and decisions of powerful men.",
        "Shechem says he loves Dinah afterward, but Genesis does not let romantic language erase what he did. Desire after harm is not the same thing as righteousness.",
        "Hamor and Shechem try to negotiate marriage and alliance, but Jacob's sons answer deceitfully because they are furious over what happened to their sister.",
        "They use circumcision, the covenant sign, as a weapon of deception. That is one of the darkest parts of the chapter because something sacred is twisted into a trap.",
        "Simeon and Levi then kill the men of the city, and Jacob is afraid the surrounding peoples will retaliate.",
        "The chapter ends unresolved. Genesis wants us to feel the damage, not rush past it.",
      ],
    },
    {
      reference: "Genesis 35:1-15",
      chapter: 35,
      startVerse: 1,
      endVerse: 15,
      heading: "Jacob Returns to Bethel",
      icon: "house",
      summary: "God calls Jacob back to Bethel, and Jacob puts away idols and worships.",
      teaching: [
        "After Genesis 34, God tells Jacob to go up to Bethel and build an altar there.",
        "Bethel is not a random place. It is where God met Jacob in Genesis 28 when Jacob was running from Esau and sleeping outside with a stone for a pillow.",
        "Jacob tells his household to put away foreign gods, purify themselves, and change their garments.",
        "That shows the household has carried spiritual clutter with them. They are covenant people, but they still have idols that must be buried.",
        "Jacob hides the foreign gods under the oak near Shechem, and the terror of God falls on the surrounding cities so they do not pursue him.",
        "At Bethel, Jacob builds the altar and God repeats his new name, Israel, along with the promise of fruitfulness, nations, kings, and land.",
        "This is renewal after wreckage. God brings Jacob back to worship before the story moves into more loss.",
      ],
    },
    {
      reference: "Genesis 35:16-29",
      chapter: 35,
      startVerse: 16,
      endVerse: 29,
      heading: "Loss in Jacob's Family",
      icon: "tears",
      summary: "Rachel dies, Benjamin is born, and Isaac's life comes to a close.",
      teaching: [
        "The renewed promise at Bethel does not mean Jacob's life becomes painless.",
        "Rachel goes into hard labor and dies giving birth to Benjamin. Jacob gains a son and loses the woman he loved in the same moment.",
        "Rachel names the child Ben-oni, son of my sorrow, but Jacob calls him Benjamin, son of the right hand.",
        "The two names hold the tension of the moment: grief and future, sorrow and strength.",
        "The chapter also records Reuben's serious sin with Bilhah, showing that Jacob's household is still morally fractured.",
        "Then Isaac dies, and Jacob and Esau bury him together.",
        "That burial matters because the brothers who once stood in hatred now stand together at their father's grave.",
      ],
    },
    {
      reference: "Genesis 36:1-43",
      chapter: 36,
      startVerse: 1,
      endVerse: 43,
      heading: "Esau Becomes Edom",
      icon: "scroll",
      summary: "Genesis records Esau's descendants and shows another family line developing outside Jacob.",
      teaching: [
        "Genesis 36 records Esau's wives, sons, chiefs, kings, and settlements.",
        "At first, this can feel like a long list of names, but it is doing important Bible work.",
        "Esau is identified with Edom, and Edom will become a real people group that appears again and again in Israel's later history.",
        "The chapter also explains why Jacob and Esau separate. Their possessions are too great for them to live together in the same land.",
        "That separation is practical, but it is also symbolic. The two brothers become two peoples.",
        "The covenant line continues through Jacob, but Genesis does not erase Esau. His family has land, leaders, cities, and history.",
        "This chapter closes Jacob and Esau's shared family section so Genesis can turn next toward Joseph.",
      ],
    },
  ],
  closing: [
    "Day 14 is heavy, but it is important because Genesis is honest about what covenant families can carry.",
    "There is violation, anger, deceit, violence, idols, grief, death, and generational separation.",
    "But there is also God's call back to Bethel, the putting away of idols, the renewal of promise, and worship in the middle of a wounded family story.",
    "Genesis 34-36 teaches that God can call His people back to worship after painful failure, and His promise can keep moving through a family that still needs deep mercy.",
  ],
};

export const GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON = buildLesson(DAY_10);
export const GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON = buildLesson(DAY_11);
export const GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON = buildLesson(DAY_12);
export const GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON = buildLesson(DAY_13);
export const GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON = buildLesson(DAY_14);

export const BIBLE_YEAR_DAY_TEN_DEEP_NOTES = BIBLE_YEAR_DAY_TEN_DEEP_NOTES_MARKDOWN;
export const BIBLE_YEAR_DAY_ELEVEN_DEEP_NOTES = buildDeepNotes(DAY_11);
export const BIBLE_YEAR_DAY_TWELVE_DEEP_NOTES = buildDeepNotes(DAY_12);
export const BIBLE_YEAR_DAY_THIRTEEN_DEEP_NOTES = buildDeepNotes(DAY_13);
export const BIBLE_YEAR_DAY_FOURTEEN_DEEP_NOTES = buildDeepNotes(DAY_14);

export const BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS = BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS_MANUAL;
export const BIBLE_YEAR_DAY_ELEVEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_11);
export const BIBLE_YEAR_DAY_TWELVE_DEEP_STUDY_SECTIONS = buildStudySections(DAY_12);
export const BIBLE_YEAR_DAY_THIRTEEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_13);
export const BIBLE_YEAR_DAY_FOURTEEN_DEEP_STUDY_SECTIONS = buildStudySections(DAY_14);
