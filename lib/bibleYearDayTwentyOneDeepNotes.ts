import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_21_SECTIONS = [
  {
    reference: "Genesis 49:1-7",
    chapter: 49,
    startVerse: 1,
    endVerse: 7,
    heading: "Jacob Speaks Over Reuben, Simeon, And Levi",
    summary: "Jacob gathers his sons and begins with exposed character, lost privilege, and the consequences of violence.",
    teaching: [
      "Genesis 49 is not a soft farewell speech. Jacob gathers his sons to speak about what will come in the days ahead, and his words connect character, consequence, and future direction.",
      "Reuben is the firstborn, but his instability and sexual sin with Bilhah cost him the privilege normally attached to firstborn status.",
      "Simeon and Levi are remembered for their violence at Shechem. Jacob does not pretend their anger was righteous just because Dinah had been wronged.",
      "The words over these sons teach that legacy is not built by position alone. Character matters, and private choices can shape public future.",
      "Even here, Genesis is not saying God's covenant has failed. It is showing that God's promise moves through real families where sin still has consequences.",
    ],
  },
  {
    reference: "Genesis 49:8-12",
    chapter: 49,
    startVerse: 8,
    endVerse: 12,
    heading: "Judah Receives The Scepter Promise",
    summary: "Jacob speaks royal language over Judah, pointing toward rule, praise, and a future kingly line.",
    teaching: [
      "Judah's words are surprising because Judah's story has included serious failure. He suggested selling Joseph, left the family, and was exposed by Tamar.",
      "But Judah also changed. He confessed his wrong in Genesis 38 and offered himself for Benjamin in Genesis 44.",
      "Jacob says Judah's brothers will praise him and bow before him. The language points beyond Judah the man toward Judah the tribe.",
      "The scepter and ruler's staff will not depart from Judah. This becomes one of the major royal promises in Genesis, preparing the Bible's later focus on the line of David and ultimately the Messiah.",
      "The lion image shows strength, rule, and settled authority. Judah is not praised because he was flawless, but because God's purpose is moving through his line by grace.",
    ],
  },
  {
    reference: "Genesis 49:13-21",
    chapter: 49,
    startVerse: 13,
    endVerse: 21,
    heading: "The Other Sons Receive Their Words",
    summary: "Jacob speaks brief but meaningful words over Zebulun, Issachar, Dan, Gad, Asher, and Naphtali.",
    teaching: [
      "These shorter sayings can feel harder to understand because they are poetic, tribal, and future-facing.",
      "Jacob is not giving equal-length speeches to each son. He is giving images that will later help Israel remember the tribes' character, territory, pressure, and role.",
      "Zebulun is linked with the coast, Issachar with burden-bearing, Dan with judgment and danger, Gad with attack and victory, Asher with rich food, and Naphtali with freedom and beauty.",
      "In the middle of these words, Jacob pauses and says, I have waited for thy salvation, O LORD. That prayer interrupts the tribal sayings like a cry of dependence.",
      "The future of these tribes is not held together by their strength alone. Jacob is still waiting on the Lord's salvation.",
    ],
  },
  {
    reference: "Genesis 49:22-28",
    chapter: 49,
    startVerse: 22,
    endVerse: 28,
    heading: "Joseph Is Fruitful Though Attacked",
    summary: "Jacob names Joseph's affliction, fruitfulness, strength, and blessing.",
    teaching: [
      "Jacob describes Joseph as a fruitful bough by a well. The picture is of life, growth, and abundance even after years of pressure.",
      "The archers attacked Joseph, hated him, and shot at him. That poetic line gathers the hostility Joseph experienced from brothers, false accusation, prison, and pain.",
      "But Joseph's bow remained strong because the mighty God of Jacob helped him. The chapter does not present Joseph as self-made; his endurance came from God's help.",
      "Jacob piles blessing language over Joseph: blessings of heaven, the deep, the breasts, the womb, and the everlasting hills. Joseph's life becomes a testimony of fruitfulness through affliction.",
      "Genesis 49 ends the sons' words by calling them the twelve tribes of Israel. The family of Jacob is now being framed as the future people of Israel.",
    ],
  },
  {
    reference: "Genesis 49:29-33",
    chapter: 49,
    startVerse: 29,
    endVerse: 33,
    heading: "Jacob Dies Holding Canaan",
    summary: "Jacob gives burial instructions, remembers the family tomb, and dies with the promise still in view.",
    teaching: [
      "Jacob's final instruction is about burial in Canaan. Even at death, he refuses to let Egypt become the family's final identity.",
      "He names the cave of Machpelah, where Abraham, Sarah, Isaac, Rebekah, and Leah were buried. This is family memory tied to covenant hope.",
      "The burial place matters because Abraham bought it as a small piece of the promised land. It was a down payment of hope before the whole land was possessed.",
      "Jacob gathers his feet into the bed and dies. The scene is quiet, but not hopeless.",
      "Genesis wants us to feel that Jacob dies before the full promise is fulfilled, but he dies trusting the promise is still alive.",
    ],
  },
  {
    reference: "Genesis 50:1-14",
    chapter: 50,
    startVerse: 1,
    endVerse: 14,
    heading: "Jacob Is Mourned And Buried",
    summary: "Joseph mourns Jacob, Egypt honors him, and the family carries him back to Canaan.",
    teaching: [
      "Genesis 50 opens with Joseph falling on his father's face, weeping, and kissing him. The governor of Egypt is still a grieving son.",
      "Jacob is embalmed according to Egyptian practice, and Egypt mourns him for seventy days. This shows the honor connected to Joseph's position and Jacob's family.",
      "Joseph asks Pharaoh for permission to bury Jacob in Canaan, and Pharaoh honors the oath Joseph made to his father.",
      "The funeral procession is large, public, and weighty. Egyptian servants, elders, chariots, horsemen, and Jacob's household all travel together.",
      "When Jacob is buried in Machpelah, the family acts out the hope Jacob confessed. Egypt preserved them, but Canaan still holds the promise.",
    ],
  },
  {
    reference: "Genesis 50:15-21",
    chapter: 50,
    startVerse: 15,
    endVerse: 21,
    heading: "Joseph Refuses Revenge",
    summary: "After Jacob dies, the brothers fear revenge, but Joseph answers with forgiveness and providence.",
    teaching: [
      "The brothers fear that Joseph's forgiveness may have only lasted while Jacob was alive. Their guilt still interprets Joseph through the lens of possible revenge.",
      "They send a message claiming Jacob asked Joseph to forgive them. Whether Jacob gave that exact command or they are speaking from fear, the point is clear: they still do not fully trust mercy.",
      "Joseph weeps when he hears it. Their fear wounds him because years after his kindness, they still wonder if revenge is hiding underneath.",
      "Joseph says, Am I in the place of God? That is one of the clearest statements of humility in the Joseph story. Revenge would require Joseph to sit in God's seat.",
      "Then he says the sentence that explains the whole story: Ye thought evil against me; but God meant it unto good. Human evil was real, but God's saving purpose was greater.",
    ],
  },
  {
    reference: "Genesis 50:22-26",
    chapter: 50,
    startVerse: 22,
    endVerse: 26,
    heading: "Joseph Dies Looking Forward",
    summary: "Joseph dies in Egypt, but his final words point to God's future visit and the promised land.",
    teaching: [
      "Joseph lives to see several generations, which gives his story a sense of fullness. The boy sold into Egypt becomes an old man surrounded by descendants.",
      "But Joseph knows Egypt is not the end of the story. Like Jacob, he speaks about the future return to the land God promised.",
      "He says, God will surely visit you. That phrase becomes a seed of hope for Exodus, where God sees, hears, remembers, and comes down to deliver His people.",
      "Joseph makes the children of Israel swear to carry his bones up from Egypt. His bones become a witness that God's promise outlives Joseph's death.",
      "Genesis ends with a coffin in Egypt. That sounds heavy, but it is actually a hopeful ending because the coffin is waiting for resurrection-shaped movement: God will visit, and the people will go up.",
    ],
  },
] as const;

export const GENESIS_DAY_TWENTY_ONE_GENESIS_ENDS_WITH_HOPE_LESSON: BibleYearDailyLesson = {
  dayNumber: 21,
  title: "Genesis Ends With Hope",
  reference: "Genesis 49-50",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 21 closes the book of Genesis with final words, exposed legacy, grief, forgiveness, providence, and hope.",
    "Jacob speaks over his sons, dies holding the promise of Canaan, and is buried in the land of his fathers.",
    "Then Joseph reassures his fearful brothers and dies in Egypt while pointing forward to the day God will visit His people.",
  ],
  sections: DAY_21_SECTIONS.map((section) => ({
    heading: section.heading,
    verseBlock: {
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
    },
    teaching: [...section.teaching],
  })),
  closing: [
    "Genesis ends with death, but not with defeat.",
    "Jacob dies, Joseph dies, and the family remains in Egypt, but God's promise is still alive.",
    "Genesis 49-50 teaches that human evil, grief, guilt, and death do not get the final word over the God who promises, preserves, forgives, and will surely visit His people.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_NOTES = `Genesis 49-50 closes Genesis with final words, family legacy, grief, forgiveness, and future hope.

Jacob gathers his sons and speaks over them with honesty. Some words expose sin and consequence. Some words point toward blessing and future promise.

Judah receives the royal promise, Joseph is described as fruitful though attacked, and Jacob dies still holding onto Canaan.

Then Genesis 50 shows Jacob's burial, the brothers' lingering fear, Joseph's refusal to take revenge, and Joseph's final hope that God will surely visit His people.

Big idea: Genesis ends with a coffin in Egypt, but the promise is still alive because God is not finished with His people.`;

export const BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_21_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Final words in Genesis are not sentimental only; they reveal character, consequences, and promise.
- Jacob and Joseph both die in faith, looking beyond Egypt toward God's promised future.
- Genesis closes with grief, but also with providence and hope.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### Gather Yourselves Together
Jacob's sons are not only hearing a father's goodbye. They are receiving words that frame the future tribes of Israel.

### The Sceptre Shall Not Depart From Judah
This is one of the biggest promise lines in Genesis. It points toward royal rule coming through Judah, preparing the Bible's later focus on David's line and the promised King.

### A Fruitful Bough
Joseph's life is described with growth after attack. He was hated, sold, and afflicted, but God made him fruitful instead of letting the attacks define him.

### Am I In The Place Of God?
Joseph refuses the throne of revenge. He knows judgment belongs to God, and that humility frees him to comfort the brothers who hurt him.

### God Will Surely Visit You
Joseph's final hope points forward to Exodus. Genesis ends in Egypt, but Joseph believes God will come, act, and bring His people up.

## What This Means

Genesis 49-50 helps readers understand legacy, consequence, providence, forgiveness, and hope.

- Character shapes legacy, even when grace is still present.
- God's promise can move through imperfect families without pretending sin does not matter.
- Forgiveness refuses revenge because God is the judge.
- Human evil is real, but it is not ultimate.
- Faith can die in Egypt while still looking toward God's future deliverance.

This section reminds us that Genesis does not end with everything fixed. It ends with a promise still alive, waiting for God to continue the story.

## Big Idea

${section.summary}`,
}));
