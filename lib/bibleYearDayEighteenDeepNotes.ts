import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_18_SECTIONS = [
  {
    reference: "Genesis 43:1-14",
    chapter: 43,
    startVerse: 1,
    endVerse: 14,
    heading: "Jacob Releases Benjamin",
    summary: "The famine forces Jacob's family to face the condition they avoided: Benjamin must go to Egypt.",
    teaching: [
      "Genesis 43 begins with pressure. The famine is severe, the grain is gone, Simeon is still in Egypt, and Jacob's fear about Benjamin has not disappeared.",
      "Jacob wants the sons to buy a little food, but Judah names the reality clearly: they cannot return unless Benjamin goes with them.",
      "This is where Judah begins sounding different. In Genesis 37 he suggested selling Joseph; now he offers himself as surety for Benjamin.",
      "Surety means Judah becomes personally responsible. Reuben offered Jacob his sons in Genesis 42, but Judah offers himself, which is a deeper kind of responsibility.",
      "Jacob sends gifts, double money, and Benjamin. His prayer to God Almighty shows that he is surrendering what he cannot control.",
      "When Jacob says, If I be bereaved, I am bereaved, it is not cheerful faith. It is painful surrender from a father who has already carried years of loss.",
    ],
  },
  {
    reference: "Genesis 43:15-25",
    chapter: 43,
    startVerse: 15,
    endVerse: 25,
    heading: "Fear Enters Joseph's House",
    summary: "The brothers are brought into Joseph's house, but guilt makes hospitality feel like danger.",
    teaching: [
      "When Joseph sees Benjamin, he orders a meal. The brothers do not know this is mercy, so they assume the house is a trap because of the money returned in their sacks.",
      "That is what unresolved guilt does. It makes kindness feel suspicious and blessing feel dangerous.",
      "The steward tells them, Peace be to you, fear not. He even says their God and the God of their father gave them treasure in their sacks.",
      "This is surprising because an Egyptian servant speaks words that calm covenant fear. God can send reassurance through unexpected mouths.",
      "Simeon is brought out, water is given, feet are washed, and their animals are fed. The scene is full of welcome, but the brothers are still trying to understand what is happening.",
      "They prepare the present for Joseph because they know they will eat bread there. The family that once refused to eat with Joseph in peace is now about to sit at Joseph's table without knowing it.",
    ],
  },
  {
    reference: "Genesis 43:26-34",
    chapter: 43,
    startVerse: 26,
    endVerse: 34,
    heading: "Benjamin At Joseph's Table",
    summary: "Joseph sees Benjamin, weeps privately, and tests the brothers with special favor at the meal.",
    teaching: [
      "The brothers bow again, and Joseph asks about Jacob. The dreams from Genesis 37 keep unfolding, but Joseph's heart is not cold.",
      "When Joseph sees Benjamin, his mother's son, he is overwhelmed. Benjamin is the living link to Rachel and to the home Joseph lost.",
      "Joseph leaves the room to weep, washes his face, and returns. This shows how much emotional restraint he is carrying.",
      "The seating arrangement amazes the brothers because they are placed from oldest to youngest. Joseph knows more about them than they realize.",
      "Benjamin receives a portion five times larger than the others. This recreates the old family test: can the brothers see special favor shown to Rachel's son without hatred taking over again?",
      "Genesis 43 ends with the brothers drinking and being merry with Joseph. For the first time in a long time, they are at a table with Joseph, but the final test has not come yet.",
    ],
  },
  {
    reference: "Genesis 44:1-13",
    chapter: 44,
    startVerse: 1,
    endVerse: 13,
    heading: "The Silver Cup Test",
    summary: "Joseph plants the cup in Benjamin's sack to recreate the old moral choice around Rachel's son.",
    teaching: [
      "Joseph commands the steward to return the money again and place his silver cup in Benjamin's sack. This creates a crisis around the protected youngest brother.",
      "The accusation asks why they repaid evil for good. That language presses on the old wound because they once repaid Joseph's life with betrayal.",
      "The brothers are so confident they did not steal that they make a reckless vow: whoever has the cup should die, and the rest will become servants.",
      "The steward softens the penalty, saying only the guilty one will become a servant. This makes the test very clear: will they abandon Benjamin and go home free?",
      "The search moves from oldest to youngest, building tension until the cup is found in Benjamin's sack.",
      "This time the brothers do not leave Rachel's son behind. They tear their clothes and return together, which is already different from Genesis 37.",
    ],
  },
  {
    reference: "Genesis 44:14-17",
    chapter: 44,
    startVerse: 14,
    endVerse: 17,
    heading: "Judah Confesses The Weight",
    summary: "Judah admits that God has found out their iniquity, though Benjamin did not steal the cup.",
    teaching: [
      "The brothers fall before Joseph again. The dream is fulfilled again, but now the issue is not bowing; it is truth.",
      "Judah speaks for the brothers and says, What shall we say? He knows there is no easy defense.",
      "When Judah says God has found out the iniquity of your servants, he is not confessing that Benjamin stole the cup. He is recognizing that old guilt has caught up with them.",
      "This is how conscience works in the story. The cup is the immediate crisis, but Joseph's sale is the deeper wound underneath it.",
      "Joseph says only the man with the cup must stay as servant, and the rest can go home in peace.",
      "That offer recreates Genesis 37 in a sharp way: one favored son can be lost, and the rest can walk away. What will they do this time?",
    ],
  },
  {
    reference: "Genesis 44:18-34",
    chapter: 44,
    startVerse: 18,
    endVerse: 34,
    heading: "Judah Stands In The Gap",
    summary: "Judah offers himself in Benjamin's place, showing that real change has begun.",
    teaching: [
      "Judah comes near to Joseph and gives one of the most important speeches in Genesis. He does not blame Benjamin, run away, or protect himself.",
      "He tells the story through Jacob's grief. Judah has finally learned to care about what losing Rachel's son would do to his father.",
      "That is a huge reversal. In Genesis 37, Judah helped create Jacob's grief. In Genesis 44, Judah is willing to suffer so Jacob will not be crushed again.",
      "Judah says he became surety for the lad. He is not speaking in theory; he is standing on the promise he made in Genesis 43.",
      "Then Judah offers himself as a bondman instead of Benjamin. This is substitution: let me stay, and let the lad go.",
      "This is the moment Joseph has been testing for. The brothers are not perfect, but they are not the same. Judah is now willing to lose himself to save the brother he once might have abandoned.",
    ],
  },
] as const;

export const GENESIS_DAY_EIGHTEEN_JUDAH_STANDS_IN_THE_GAP_LESSON: BibleYearDailyLesson = {
  dayNumber: 18,
  title: "Judah Stands in the Gap",
  reference: "Genesis 43-44",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 18 continues Joseph's test of his brothers, but now Benjamin is at the center.",
    "Genesis 43 brings Benjamin to Joseph's table, and Genesis 44 recreates the old question from Genesis 37: will the brothers abandon Rachel's favored son again?",
    "This day teaches that repentance becomes visible when people face a similar test and choose differently.",
  ],
  sections: DAY_18_SECTIONS.map((section) => ({
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
    "Day 18 ends before Joseph reveals himself, but the turning point has happened.",
    "Judah, the brother who once suggested selling Joseph, now offers himself in Benjamin's place.",
    "Genesis 43-44 teaches that real change is seen when love accepts cost, responsibility replaces self-protection, and someone stands in the gap for another.",
  ],
};

export const BIBLE_YEAR_DAY_EIGHTEEN_DEEP_NOTES = `Genesis 43-44 is the final test before Joseph reveals himself.

Benjamin is brought to Egypt, Joseph's emotions rise, the brothers sit at Joseph's table, and Benjamin receives special favor.

Then Joseph's silver cup is placed in Benjamin's sack, creating a crisis that mirrors the old Joseph wound.

The brothers have a chance to abandon Rachel's son and save themselves, but this time they return together.

Big idea: repentance is not only feeling bad about the past. It becomes visible when the old test returns and someone chooses differently.`;

export const BIBLE_YEAR_DAY_EIGHTEEN_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_18_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Benjamin is now standing where Joseph once stood: Rachel's favored son is vulnerable.
- Joseph is not testing trivia or memory; he is testing character.
- The old wound is being reopened so truth, responsibility, and restoration can begin.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### I Will Be Surety For Him
Judah makes himself responsible for Benjamin. This matters because Judah once helped separate Jacob from Joseph, but now he promises to bring Benjamin back.

### Benjamin's Portion Was Five Times So Much
Joseph gives Benjamin obvious special favor. This quietly tests whether the brothers still hate Rachel's favored son when he receives more than they do.

### The Cup Was Found In Benjamin's Sack
The cup creates the crisis. The brothers can leave Benjamin behind and save themselves, which is exactly the kind of moral failure they committed against Joseph.

### Let Thy Servant Abide Instead Of The Lad
This is Judah's turning point. He offers himself in Benjamin's place, showing that real repentance has become costly love.

## What This Means

Genesis 43-44 helps readers understand what changed lives actually look like.

- Judah does not merely say he is sorry; he becomes willing to suffer for Benjamin.
- The brothers do not abandon the vulnerable son this time; they return together.
- Joseph sees the evidence he has been waiting for: the family is not healed yet, but repentance is becoming visible.

This section reminds us that God often reveals growth by letting us face a familiar test again with a new heart.

## Big Idea

${section.summary}`,
}));
