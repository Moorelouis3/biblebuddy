import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_20_SECTIONS = [
  {
    reference: "Genesis 47:1-12",
    chapter: 47,
    startVerse: 1,
    endVerse: 12,
    heading: "Jacob's Family Settles In Goshen",
    summary: "Joseph brings his family before Pharaoh, and Jacob's household receives a place to live in Egypt.",
    teaching: [
      "Genesis 47 opens with Joseph wisely introducing his family to Pharaoh. He does not hide who they are. They are shepherds, outsiders, and dependent on Egypt for survival during the famine.",
      "Pharaoh gives them the land of Goshen, which matters because it provides food and space while also keeping the covenant family distinct inside Egypt.",
      "Jacob blesses Pharaoh, which is a surprising reversal. The hungry old shepherd stands before the king of Egypt, yet Jacob still carries the covenant blessing of Abraham.",
      "When Pharaoh asks Jacob about his age, Jacob describes his years as few and evil. He is not denying God's faithfulness; he is honestly naming a life marked by conflict, grief, exile, and loss.",
      "Joseph then nourishes his father, brothers, and all his father's household. The boy once sold away from the family now becomes the means God uses to keep the family alive.",
    ],
  },
  {
    reference: "Genesis 47:13-26",
    chapter: 47,
    startVerse: 13,
    endVerse: 26,
    heading: "Joseph Manages The Famine",
    summary: "The famine grows severe, and Joseph administers Egypt's food, money, livestock, land, and seed.",
    teaching: [
      "This section shows how severe the famine becomes. The problem is not only hunger in one household; it is economic collapse across Egypt and Canaan.",
      "Joseph's leadership moves through stages: money is exchanged for grain, then livestock, then land, then seed for the future harvest. The passage is showing administration under crisis.",
      "Modern readers may feel tension in this section because the people become servants to Pharaoh. Genesis does not pause to explain every moral question, but it does show Joseph preserving life in a world where famine has stripped people of normal options.",
      "The priests' land is treated differently because Egypt already has an established religious and political system. That detail reminds us Joseph is working inside a foreign empire, not inside Israel's later law.",
      "The people themselves say Joseph has saved their lives. The story's emphasis is preservation: in a deadly famine, Joseph's wisdom keeps the nation alive and creates a system for planting again.",
    ],
  },
  {
    reference: "Genesis 47:27-31",
    chapter: 47,
    startVerse: 27,
    endVerse: 31,
    heading: "Jacob Looks Toward The Promise",
    summary: "Israel grows in Goshen, but Jacob asks Joseph to bury him in the promised land.",
    teaching: [
      "Jacob's family settles, gains possessions, and multiplies in Egypt. That growth matters because God told Jacob He would make him a great nation there.",
      "But Jacob knows Egypt is not the final home. Near the end of his life, he makes Joseph swear not to bury him in Egypt.",
      "Burial in the ancestral tomb is not only sentimental. It is a faith statement that Canaan still matters because God's promise still stands.",
      "Jacob has lived many years with grief, mistakes, and family trouble, but at the end he is still looking toward the land God promised.",
      "His worship at the bed's head shows an old man responding to God's faithfulness. Even before the Exodus, Jacob believes the story will not end in Egypt.",
    ],
  },
  {
    reference: "Genesis 48:1-7",
    chapter: 48,
    startVerse: 1,
    endVerse: 7,
    heading: "Jacob Remembers God's Promise",
    summary: "Joseph brings his sons to Jacob, and Jacob recalls God's covenant promise at Luz.",
    teaching: [
      "Genesis 48 begins with Joseph hearing that Jacob is sick. He brings Manasseh and Ephraim, which means this chapter is about the promise moving into another generation.",
      "Jacob strengthens himself and sits up. The scene is tender: an aging father gathers strength to bless the next generation before he dies.",
      "Jacob remembers God appearing to him at Luz, which is Bethel. That memory reaches back to the lonely night when Jacob was fleeing from Esau and God promised land, descendants, and presence.",
      "Then Jacob adopts Ephraim and Manasseh as his own. This is why Joseph receives a double portion through his two sons becoming tribal heads in Israel.",
      "Jacob also remembers Rachel's death near Bethlehem. Blessing and grief sit together in the same speech because Jacob's life has always carried both promise and pain.",
    ],
  },
  {
    reference: "Genesis 48:8-16",
    chapter: 48,
    startVerse: 8,
    endVerse: 16,
    heading: "Jacob Blesses Ephraim And Manasseh",
    summary: "Jacob sees Joseph's sons, embraces them, and blesses them in the name of the God who shepherded him.",
    teaching: [
      "Jacob's eyesight is weak, which reminds readers of Isaac in Genesis 27. But this blessing scene will not be ruled by deception the way Isaac's was.",
      "Jacob says he had not expected to see Joseph's face again, yet God has allowed him to see Joseph's children too. That is one of the sweetest grace moments in Genesis.",
      "When Jacob blesses the boys, he describes God as the God before whom Abraham and Isaac walked, the God who fed or shepherded him all his life, and the Angel who redeemed him from all evil.",
      "That language is deeply personal. Jacob is not only repeating family religion. He is naming the God who stayed with him through fear, exile, loss, wrestling, and return.",
      "The blessing asks that Abraham and Isaac's name continue through the boys and that they grow into a multitude. Jacob is passing covenant identity forward.",
    ],
  },
  {
    reference: "Genesis 48:17-22",
    chapter: 48,
    startVerse: 17,
    endVerse: 22,
    heading: "The Younger Is Set Before The Older",
    summary: "Jacob crosses his hands, gives Ephraim the greater blessing, and points Joseph toward the land God will give his family.",
    teaching: [
      "Joseph tries to correct Jacob because Manasseh is the firstborn. In the normal family order, the older son would be expected to receive the greater blessing.",
      "Jacob refuses and says he knows what he is doing. Ephraim, the younger, will become greater, though Manasseh will also become a people.",
      "This repeats a major Genesis pattern: God often moves His promise in ways that overturn normal human expectations. Isaac over Ishmael, Jacob over Esau, Joseph over his brothers, and now Ephraim before Manasseh.",
      "The crossed hands are not confusion. They are a visible sign that blessing comes by God's choosing, not merely by birth order or human custom.",
      "Jacob ends by telling Joseph that God will be with him and bring the family back to the land of their fathers. Even in Egypt, Jacob's final vision is still promise, presence, and return.",
    ],
  },
] as const;

export const GENESIS_DAY_TWENTY_JACOB_BLESSES_JOSEPHS_SONS_LESSON: BibleYearDailyLesson = {
  dayNumber: 20,
  title: "Jacob Blesses Joseph's Sons",
  reference: "Genesis 47-48",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 20 follows Jacob's family settling in Egypt while famine continues around them.",
    "Joseph provides for the family and manages the crisis in Egypt, but Jacob keeps looking toward the land God promised.",
    "Genesis 48 then slows down around blessing, memory, adoption, and the surprising way God's promise moves to the next generation.",
  ],
  sections: DAY_20_SECTIONS.map((section) => ({
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
    "Day 20 shows the covenant family preserved in Egypt, but not defined by Egypt.",
    "Jacob receives provision, blesses Pharaoh, asks to be buried in Canaan, and passes blessing to Joseph's sons.",
    "Genesis 47-48 teaches that God's promise can continue through famine, foreign land, old age, grief, and the next generation.",
  ],
};

export const BIBLE_YEAR_DAY_TWENTY_DEEP_NOTES = `Genesis 47-48 follows Jacob's family as they settle in Egypt and begin living under Joseph's provision.

The famine remains severe, Joseph manages the crisis, and Jacob's household grows in Goshen.

But Jacob never treats Egypt as the final destination. Near death, he asks Joseph to bury him in the land of promise.

Then Jacob blesses Ephraim and Manasseh, adopts them into the covenant family, and crosses his hands so the younger receives the greater blessing.

Big idea: God's promise keeps moving through provision, memory, blessing, and surprising grace even while the family lives far from home.`;

export const BIBLE_YEAR_DAY_TWENTY_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_20_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Egypt becomes a place of provision, but not the final home of the promise.
- Jacob's old age is full of both honest grief and living faith.
- Blessing moves forward through sons, grandsons, memory, worship, and God's surprising choice.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### In The Best Of The Land
Goshen gives Jacob's family real provision during famine. It also gives them space to remain distinct as shepherds while living inside Egypt.

### Few And Evil Have The Days Of The Years Of My Life Been
Jacob is not being dramatic. His life has included exile, deception, family conflict, Rachel's death, Joseph's loss, and years of grief. The line lets readers hear an old man tell the truth about the cost of his journey.

### Bury Me Not, I Pray Thee, In Egypt
Jacob's burial request is a faith statement. He is saying with his body that Egypt is not the final home and God's promise to Abraham, Isaac, and Jacob still matters.

### God, Before Whom My Fathers Did Walk
Jacob connects his own blessing to the God of Abraham and Isaac. The promise is not a private feeling; it is a covenant story moving through generations.

### Guiding His Hands Wittingly
Jacob crosses his hands on purpose. The younger receiving the greater blessing is not a mistake; it shows that God's choosing can overturn normal human expectations.

## What This Means

Genesis 47-48 helps readers understand provision, pilgrimage, and generational blessing.

- God can provide in a foreign place without making that place the final destination.
- Faith remembers God's promises at the end of life, not only at the beginning.
- Blessing is not controlled by age, custom, or human expectation.
- The next generation needs more than inheritance; they need covenant identity.

This section reminds us that God's promise can keep moving even when life is far from what we pictured, and faith can still look forward when the body is nearing the end.

## Big Idea

${section.summary}`,
}));
