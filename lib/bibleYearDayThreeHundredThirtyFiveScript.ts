import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 335, written to the Day 1 standard.
 *
 * Galatians closes with bearing burdens, sowing and reaping, and a final
 * boast in nothing but the cross. Ephesians opens with a run of gifts the
 * reader did nothing to earn, then the wall between people and God, and
 * between people and each other, torn down. Six blocks across two letters.
 */

const galatiansSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 6:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const ephesiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 1:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const ephesiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 2:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 335,
  title: "New Creation and Grace",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 335.", 700],
    ["Galatians ends today, and Paul takes the pen himself for the last word.", 800],
    ["Then a new letter opens, and the tone changes completely. No argument to win. Just gift after gift, stacked up in one long sentence.", 850],
    ["Chosen before the world existed. Dead in sin, and made alive anyway.", 850],
    ["We are in Galatians 6, then Ephesians 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    galatiansSix(1, 10, [
      "If someone is caught in a sin, restore him gently, watching yourself, because you could be next. The freedom he just spent three chapters defending is not a license to look down on people who stumble.",
      "Bear one another's burdens, and that is how you actually keep the law of Christ. Then two verses later, every man shall bear his own burden. Both are true. Carry what is too heavy for your neighbor, and still own what is actually yours.",
      "Be not deceived, God is not mocked. Whatever a man sows, that is what he reaps. It sounds like a warning because it is one.",
      "Let us not grow weary in doing good, for in due season we will reap, if we do not give up. Do good to everyone, especially to the household of faith.",
    ]),
    galatiansSix(11, 18, [
      "He takes the pen himself for the ending, in large letters, so they know these last words are his, not a scribe's.",
      "The people pushing circumcision are doing it to avoid persecution for the cross, not out of conviction. Paul sees straight through the motive.",
      "God forbid that I should boast in anything except the cross, he says. The world is dead to me, and I am dead to it. Circumcision does not matter anymore, and neither does uncircumcision. What matters is being a new creature.",
      "I carry the marks of the Lord Jesus in my body, he says, scars from beatings and stoning, proof enough of which side he is on. Then he ends simply. Grace be with your spirit.",
    ]),
    ephesiansOne(1, 14, [
      "Paul opens with one long sentence of blessing, piling one gift on top of another. Blessed with every spiritual blessing in the heavenly places, in Christ.",
      "Chosen before the foundation of the world. Not chosen once you cleaned up. Chosen before there was a world to clean up in.",
      "Predestined to adoption as sons, through Jesus Christ, according to the good pleasure of his will. Not because you earned a place in the family. Because he wanted you in it.",
      "Redemption through his blood, forgiveness of sins, and then sealed with the promised Holy Spirit, a down payment on everything still coming. Every step of that sentence is something done to you, not by you.",
    ]),
    ephesiansOne(15, 23, [
      "Paul hears about their faith and love and cannot stop praying for them. He asks God to give them the spirit of wisdom and revelation, so they would actually know him, not just know about him.",
      "He prays their eyes would be opened to three things. The hope you were called to. The riches of what you will inherit. And the size of the power available to you right now, while you believe.",
      "And that power is not abstract. It is the exact same power that raised Christ from the dead and seated him at God's right hand, far above every ruler and authority.",
      "God put everything under Christ's feet, and made him head over everything, for the church. You are called his body, the fullness of the one who fills everything in every way.",
    ]),
    ephesiansTwo(1, 10, [
      "You were dead, he says, not sick, not struggling. Dead in trespasses and sins, walking the same path as everyone else, by nature children of wrath.",
      "But God, who is rich in mercy, made you alive together with Christ even while you were dead. Two words carry the whole chapter. But God.",
      "By grace you are saved, through faith, and that is not from yourselves. It is a gift. Not from works, so nobody gets to boast about it.",
      "You are his workmanship, created in Christ Jesus for good works, which God prepared ahead of time for you to walk in. The works come after the grace. Never before it.",
    ]),
    ephesiansTwo(11, 22, [
      "Remember what you were, he tells the Gentile believers. Without Christ, outside Israel's covenants, strangers to the promises, with no hope and without God in the world.",
      "But now, in Christ Jesus, you who were far off have been brought near, by the blood of Christ. Distance was the whole problem. Blood is what closed it.",
      "He is our peace, who made both sides one, and tore down the wall that stood between them. Not a truce between two groups. One new people, where there used to be two.",
      "You are no longer strangers, but citizens with the saints, part of God's household, built on the foundation of the apostles and prophets, with Christ himself as the cornerstone. The whole building grows into a temple. And you are part of the wall.",
    ]),
  ],
  closing: [
    ["So that is Day 335.", 700],
    ["Galatians ends with sowing and reaping. Ephesians opens with a list of gifts you did nothing to earn.", 800],
    ["Bear one another's burdens, and still carry your own load. Do good while there is time, because the harvest is coming either way.", 800],
    ["Then the tone shifts completely. Chosen before the world existed. Dead in sin, and made alive anyway. Not of works, so nobody gets to boast.", 850],
    ["And the wall that used to separate people from God, and people from each other, is gone. Torn down, not patched over.", 850],
    ["You are not visiting this house. You are part of what it is built out of.", 850],
    ["Tomorrow, Ephesians 3 through 5. Paul prays again, and then tells you what love looks like in an actual marriage and an actual church.", 850],
    ["For now, remember the two words that carry the whole chapter.", 800],
    ["But God.", 750],
    ["That is where every good thing in this letter starts.", 1200],
  ],
};
