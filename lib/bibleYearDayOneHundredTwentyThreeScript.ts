import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 123, written to the Day 1 standard.
 *
 * Job's third answer to Bildad turns into the highest point of the whole
 * book: in the middle of total isolation, he says I know that my redeemer
 * liveth. Then Zophar answers with the shortest, harshest speech yet, Job
 * dismantles their whole theory by pointing out the wicked often prosper,
 * and Eliphaz closes the day by inventing crimes against Job that never
 * happened. Seven blocks across four chapters, matching Day 122.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 123,
  title: "Job's Redeemer and Continued Accusation",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 123.", 700],
    ["Job has lost everything, and now he loses his family too.", 800],
    ["And right in the middle of that, he says the most famous line in the whole book.", 800],
    ["Then Zophar fires back short and hard, and Job answers with a question none of them can solve.", 800],
    ["Eliphaz closes the day by accusing Job of crimes he never committed.", 800],
    ["We are in Job 19 through 22. Abandonment, hope, and an old friend who has run out of patience.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 19, 1, 22, [
      "Job asks his friends how long they will vex his soul and break him in pieces with words. Ten times now, he says, you have reproached me.",
      "He says it is God who has wronged him, hedged up his way so he cannot pass, stripped him of his glory, and taken the crown from his head.",
      "Then comes the part that hurts more than any of it. My kinsfolk have failed, and my familiar friends have forgotten me. My servants call me a stranger. My wife is estranged from my breath. Even young children despise me.",
      "So he says the only thing left to ask. Have pity upon me, have pity upon me, O ye my friends, for the hand of God hath touched me. That is a man asking to simply be seen.",
    ]),
    g("job", 19, 23, 29, [
      "Job wishes his words were written down, graven with an iron pen and lead in the rock forever. He wants this on record, permanently, no matter what happens to him.",
      "And then he says it. I know that my redeemer liveth, and that he shall stand at the latter day upon the earth. And though after my skin worms destroy this body, yet in my flesh shall I see God.",
      "Whom I shall see for myself, and mine eyes shall behold, and not another. He is not describing a theory. He expects to see this himself, with his own eyes, after death.",
      "That hope comes from a man who just said his wife can't stand to be near him. He has nothing left to hold onto except this. And he holds onto it anyway.",
    ]),
    g("job", 20, 1, 19, [
      "Zophar answers, and he does not even pretend to be gentle anymore. He says his spirit compels him to answer, and he speaks fast, without waiting.",
      "His whole argument: the triumphing of the wicked is short, and the joy of the hypocrite but for a moment. Though his excellency mount up to the heavens, he shall perish forever like his own dung.",
      "Zophar says wickedness is sweet in the wicked man's mouth, he hides it under his tongue and savors it. But it turns to the gall of asps within him.",
      "He shall suck the poison of asps, the viper's tongue shall slay him. Whatever he swallowed down, he vomits back up. God casts it out of his belly.",
    ]),
    g("job", 20, 20, 29, [
      "Zophar keeps going. Because he felt no quietness in his belly, he shall not save anything he desired. Nothing shall be left him to eat, so his prosperity will not endure.",
      "In the fullness of his sufficiency he shall be in straits, every hand of the wicked shall come upon him. Right when it looks most secure, it collapses.",
      "The heaven shall reveal his iniquity, and the earth shall rise up against him. The increase of his house shall depart, flowing away in the day of God's wrath.",
      "This, Zophar says, is the portion of a wicked man from God, and the heritage appointed unto him. A tidy answer, delivered with total certainty, aimed straight at a man in ashes.",
    ]),
    g("job", 21, 1, 21, [
      "Job answers, and this time he does not defend himself first. He goes straight at their theory. Mark me, he says, and let that be your comfort.",
      "Wherefore do the wicked live, become old, yea, are mighty in power? Their seed is established in their sight, their houses are safe from fear, no rod of God is upon them.",
      "They spend their days in wealth, and in a moment go down to the grave. And they say unto God, depart from us, we desire not the knowledge of thy ways. What is the Almighty, that we should serve him?",
      "Job is not making this up to be difficult. He is describing what everyone can see and nobody wants to say out loud. The wicked do not always suffer. Sometimes they die comfortable.",
    ]),
    g("job", 21, 22, 34, [
      "Job asks, shall any teach God knowledge, seeing he judgeth those that are high? He is not attacking God here. He is attacking the confidence his friends have in their own formula for how God must act.",
      "One man dies in his full strength, wholly at ease and quiet. Another dies in the bitterness of his soul, never having eaten with pleasure. They lie down alike in the dust, and the worms cover them both.",
      "He tells his friends plainly, I know your thoughts, and the devices which ye wrongfully imagine against me. Ask anyone who has traveled and seen the world. They will tell you the wicked are spared in the day of destruction.",
      "How then comfort ye me in vain, seeing in your answers there remaineth falsehood? He is not asking them to feel sorry for him anymore. He is telling them their whole argument is wrong.",
    ]),
    g("job", 22, 1, 30, [
      "Eliphaz speaks a third time, and this is his harshest speech yet. Is it any pleasure to the Almighty that thou art righteous, he asks, as if Job's suffering must mean something was owed.",
      "Then he does something new. He invents specific crimes. Thou hast stripped the naked of their clothing. Thou hast not given water to the weary. Thou hast sent widows away empty, and the arms of the fatherless have been broken.",
      "None of that has been shown to be true anywhere in this book. Eliphaz needs Job to be guilty of something this size, so he manufactures it, because the alternative, that a good man is suffering for no visible reason, is more than his theology can hold.",
      "And then he turns to mercy. Acquaint now thyself with him, and be at peace. Receive the law from his mouth. Then thou shalt lay up gold as dust, and the Almighty shall be thy defense. Real comfort, offered on top of a lie.",
    ]),
  ],
  closing: [
    ["So that is Day 123.", 700],
    ["Job lost his family's affection in this chapter. His wife pulls away. Children who once knew him despise him now.", 750],
    ["And in the middle of that exact moment, he says the words that have outlasted every one of his friends' speeches. I know that my redeemer liveth.", 800],
    ["He does not say it because his life got better. He says it while everything is still gone.", 800],
    ["Then Zophar answers with a short, hard poem, and Job pushes back with something true and uncomfortable. The wicked do not always suffer. Sometimes they die at ease.", 850],
    ["Eliphaz cannot accept that, so he makes up sins Job never committed, just to keep his theory standing.", 800],
    ["Tomorrow, Job 23 through 26. Job goes looking for God and cannot find him anywhere he searches.", 850],
    ["For now, hold on to Job's line, not Eliphaz's.", 750],
    ["I know that my redeemer liveth.", 800],
    ["He said it in the dark, before he saw anything.", 1200],
  ],
};
