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

## Why This Matters

This part of the story helps us follow how God's promise moves through real family pressure, weakness, obedience, and mercy.

## Big Idea

${section.summary}`,
  }));
}

const DAY_10: DayBlueprint = {
  dayNumber: 10,
  title: "Covenant Through Isaac",
  reference: "Genesis 25-27",
  listenTime: "about 20 min",
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

## 🧭 Why This Matters

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

## 🧭 Why This Matters

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

## 🧭 Why This Matters

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

## 🧭 Why This Matters

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

## 🧭 Why This Matters

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

## 🧭 Why This Matters

Genesis is not celebrating deception.

The covenant line continues through Jacob, but his home breaks. He will not see his mother again in the story. He will spend years away from home. He will later be deceived by Laban, just as he deceived Isaac.

Sin does not stop God's promise, but it does create pain.

## 🔥 Big Idea

The blessing moves forward, but the family fracture is real. God's faithfulness is strong enough to carry the promise through human failure, but human failure still has consequences.`,
  },
];

const DAY_11: DayBlueprint = {
  dayNumber: 11,
  title: "Jacob's Journey Begins",
  reference: "Genesis 28-29",
  listenTime: "about 16 min",
  opening: [
    "Genesis 28-29 begins Jacob's exile from home.",
    "Jacob leaves with fear and uncertainty, but God meets him at Bethel and repeats the covenant promise.",
    "Then Jacob arrives in Haran, meets Rachel, works for Laban, and experiences deception inside his own family story.",
  ],
  sections: [
    {
      reference: "Genesis 28:1-9",
      chapter: 28,
      startVerse: 1,
      endVerse: 9,
      heading: "Jacob Leaves Home",
      icon: "road",
      summary: "Jacob leaves home under family pressure, carrying both blessing and consequences.",
      teaching: ["Jacob is sent away to find a wife from the family line.", "He leaves with the blessing, but also because conflict with Esau has made home unsafe.", "The promise is moving, but Jacob is also facing consequences."],
    },
    {
      reference: "Genesis 28:10-22",
      chapter: 28,
      startVerse: 10,
      endVerse: 22,
      heading: "God Meets Jacob at Bethel",
      icon: "ladder",
      summary: "God meets Jacob in a dream and promises presence, land, descendants, and return.",
      teaching: ["Jacob dreams of a ladder reaching to heaven.", "God repeats the promise given to Abraham and Isaac.", "Jacob wakes up realizing God was present in a place he did not expect."],
    },
    {
      reference: "Genesis 29:1-20",
      chapter: 29,
      startVerse: 1,
      endVerse: 20,
      heading: "Jacob Meets Rachel",
      icon: "heart",
      summary: "Jacob reaches Haran, meets Rachel at the well, and agrees to work seven years for her.",
      teaching: ["Jacob arrives among his relatives and meets Rachel at a well.", "His love for Rachel shapes the next part of his life.", "He agrees to serve Laban seven years to marry her."],
    },
    {
      reference: "Genesis 29:21-35",
      chapter: 29,
      startVerse: 21,
      endVerse: 35,
      heading: "Jacob Is Deceived",
      icon: "veil",
      summary: "Jacob the deceiver is deceived by Laban, and family pain grows through Leah and Rachel.",
      teaching: ["Laban gives Leah to Jacob instead of Rachel.", "Jacob experiences deception from the other side.", "Leah is unloved, but God sees her pain and gives her children."],
    },
  ],
  closing: [
    "Day 11 shows God meeting Jacob on the road.",
    "Jacob is not yet mature, but God is already faithful to the promise.",
    "God's presence can meet us even in exile, uncertainty, and consequences.",
  ],
};

const DAY_12: DayBlueprint = {
  dayNumber: 12,
  title: "Jacob Leaves Laban",
  reference: "Genesis 30-31",
  listenTime: "about 16 min",
  opening: [
    "Genesis 30-31 follows Jacob's growing household, painful rivalry, hard labor, and conflict with Laban.",
    "The family grows, but the growth is messy.",
    "Eventually God tells Jacob to leave, and Jacob begins the journey back toward the land of promise.",
  ],
  sections: [
    {
      reference: "Genesis 30:1-24",
      chapter: 30,
      startVerse: 1,
      endVerse: 24,
      heading: "Jacob's Household Grows",
      icon: "family",
      summary: "Jacob's children are born in the middle of rivalry, longing, and pain.",
      teaching: ["Rachel and Leah struggle with jealousy and longing.", "Children are born through a painful family situation.", "God is still building the family line, but Genesis does not hide the brokenness."],
    },
    {
      reference: "Genesis 30:25-43",
      chapter: 30,
      startVerse: 25,
      endVerse: 43,
      heading: "Jacob Prospers Under Pressure",
      icon: "flock",
      summary: "Jacob works under Laban's pressure, but God still increases him.",
      teaching: ["Jacob wants to return home, but Laban wants to keep benefiting from him.", "The flocks increase, and Jacob becomes prosperous.", "The story shows God providing even under unfair conditions."],
    },
    {
      reference: "Genesis 31:1-21",
      chapter: 31,
      startVerse: 1,
      endVerse: 21,
      heading: "God Tells Jacob to Return",
      icon: "home",
      summary: "God calls Jacob to leave Laban and return to the land of his fathers.",
      teaching: ["Laban's household turns against Jacob.", "God tells Jacob to return to the land of promise.", "Jacob leaves with his family, possessions, and unresolved tension."],
    },
    {
      reference: "Genesis 31:22-55",
      chapter: 31,
      startVerse: 22,
      endVerse: 55,
      heading: "Jacob and Laban Make a Covenant",
      icon: "stones",
      summary: "Laban pursues Jacob, but God restrains him and the conflict ends with a boundary covenant.",
      teaching: ["Laban pursues Jacob, but God warns him in a dream.", "Jacob and Laban confront years of tension.", "They set up a heap of stones as a witness and part ways."],
    },
  ],
  closing: [
    "Day 12 shows growth under pressure.",
    "Jacob's family is messy, but God is still guiding him back toward promise.",
    "God can lead His people out of unhealthy places and back toward the road of obedience.",
  ],
};

const DAY_13: DayBlueprint = {
  dayNumber: 13,
  title: "Jacob Wrestles With God",
  reference: "Genesis 32-33",
  listenTime: "about 16 min",
  opening: [
    "Genesis 32-33 brings Jacob face to face with fear, prayer, God, and Esau.",
    "Jacob is returning home, but the old wound with Esau still waits ahead of him.",
    "Before Jacob meets Esau, he wrestles through the night and receives a new name.",
  ],
  sections: [
    {
      reference: "Genesis 32:1-21",
      chapter: 32,
      startVerse: 1,
      endVerse: 21,
      heading: "Jacob Prepares to Meet Esau",
      icon: "shield",
      summary: "Jacob is afraid to meet Esau and brings his fear to God in prayer.",
      teaching: ["Jacob hears that Esau is coming with four hundred men.", "He divides the camp and prays honestly.", "Fear pushes Jacob toward both planning and prayer."],
    },
    {
      reference: "Genesis 32:22-32",
      chapter: 32,
      startVerse: 22,
      endVerse: 32,
      heading: "Jacob Wrestles Through the Night",
      icon: "wrestle",
      summary: "Jacob wrestles, is wounded, receives blessing, and is renamed Israel.",
      teaching: ["Jacob is left alone at night and wrestles with a mysterious man.", "He is wounded but refuses to let go without blessing.", "His name becomes Israel, marking a new identity."],
    },
    {
      reference: "Genesis 33:1-17",
      chapter: 33,
      startVerse: 1,
      endVerse: 17,
      heading: "Jacob and Esau Reconcile",
      icon: "embrace",
      summary: "Jacob meets Esau, and the feared confrontation becomes a surprising moment of mercy.",
      teaching: ["Jacob bows as he approaches Esau.", "Esau runs, embraces him, and weeps.", "The meeting is not everything Jacob feared; mercy meets him on the road."],
    },
    {
      reference: "Genesis 33:18-20",
      chapter: 33,
      startVerse: 18,
      endVerse: 20,
      heading: "Jacob Builds an Altar",
      icon: "altar",
      summary: "Jacob arrives in the land and builds an altar to the God of Israel.",
      teaching: ["Jacob comes safely to Shechem.", "He buys land and builds an altar.", "The new name Israel is now connected with worship."],
    },
  ],
  closing: [
    "Day 13 shows Jacob changed through struggle.",
    "He limps away from the wrestling match, but he also carries a new name.",
    "God can use fear, prayer, and even weakness to reshape a person.",
  ],
};

const DAY_14: DayBlueprint = {
  dayNumber: 14,
  title: "Jacob Returns to Bethel",
  reference: "Genesis 34-36",
  listenTime: "about 18 min",
  opening: [
    "Genesis 34-36 closes Jacob's section with grief, violence, renewal, loss, and family lines.",
    "Genesis 34 is painful and shows the deep brokenness around Jacob's household.",
    "Then God calls Jacob back to Bethel, where worship and promise are renewed before the story records loss and the line of Esau.",
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
      teaching: ["Dinah is violated by Shechem.", "Jacob's sons respond with deception and violence.", "Genesis does not make this chapter neat; it shows how brokenness spreads through families and cities."],
    },
    {
      reference: "Genesis 35:1-15",
      chapter: 35,
      startVerse: 1,
      endVerse: 15,
      heading: "Jacob Returns to Bethel",
      icon: "house",
      summary: "God calls Jacob back to Bethel, and Jacob puts away idols and worships.",
      teaching: ["God tells Jacob to go back to Bethel.", "Jacob calls his household to put away foreign gods.", "At Bethel, God repeats Jacob's new name and the covenant promise."],
    },
    {
      reference: "Genesis 35:16-29",
      chapter: 35,
      startVerse: 16,
      endVerse: 29,
      heading: "Loss in Jacob's Family",
      icon: "tears",
      summary: "Rachel dies, Benjamin is born, and Isaac's life comes to a close.",
      teaching: ["Rachel dies while giving birth to Benjamin.", "The family keeps moving through grief.", "Isaac dies, and Jacob and Esau bury him."],
    },
    {
      reference: "Genesis 36:1-43",
      chapter: 36,
      startVerse: 1,
      endVerse: 43,
      heading: "The Line of Esau",
      icon: "scroll",
      summary: "Genesis records Esau's descendants and shows another family line developing outside Jacob.",
      teaching: ["Genesis pauses to list Esau's family line.", "Esau becomes connected with Edom.", "This prepares later Bible history where Edom and Israel will appear again."],
    },
  ],
  closing: [
    "Day 14 is heavy, but it is important.",
    "Jacob's family story includes violence, grief, worship, promise, and generational consequences.",
    "God calls Jacob back to worship so the promise can keep moving through a broken but chosen family.",
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
