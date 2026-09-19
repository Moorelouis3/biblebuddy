import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 332, written to the Day 1 standard.
 *
 * Second Corinthians 10 through 12: Paul defends his apostleship against
 * polished newcomers, and the only credential he finally offers is a list of
 * what has been done to his body and a thorn God refused to remove. Six
 * blocks across three chapters.
 */

const secondCorinthiansTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 10:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 11:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

const secondCorinthiansTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 12:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 332,
  title: "Weakness and True Apostleship",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 332.", 700],
    ["Yesterday Paul finished writing about money. Today he has to defend himself.", 800],
    ["New teachers have shown up in Corinth. Polished, confident, and Paul looks unimpressive standing next to them.", 850],
    ["So instead of matching their resume, he does something strange. He boasts about a thorn he begged God to take away.", 850],
    ["We are in Second Corinthians 10, 11, and 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondCorinthiansTen(1, 11, [
      "Now I Paul myself beseech you by the meekness and gentleness of Christ, who in presence am base among you, but being absent am bold toward you. He opens by repeating exactly what people say about him, before he answers a word of it.",
      "The weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds. He isn't describing how to win an argument. He's describing what tears down whatever stands between a mind and the truth.",
      "Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, bringing into captivity every thought to the obedience of Christ. Even a private thought gets taken prisoner and marched somewhere new.",
      "Do ye look on things after the outward appearance? His critics are judging by how a man carries himself in a room. Paul is about to argue that's exactly the wrong measurement.",
    ]),
    secondCorinthiansTen(12, 18, [
      "We dare not make ourselves of the number, or compare ourselves with some that commend themselves: but they measuring themselves by themselves, and comparing themselves among themselves, are not wise. Grading yourself against people who also grade themselves proves nothing at all.",
      "We will not boast of things without our measure, but according to the measure of the rule which God hath distributed to us. He only claims credit for ground God actually sent him to.",
      "Not he that commendeth himself is approved, but whom the Lord commendeth. A resume a man writes about himself was never the point.",
      "He that glorieth, let him glory in the Lord. One line, and it undercuts every comparison in the chapter, his own included.",
    ]),
    secondCorinthiansEleven(1, 15, [
      "I am jealous over you with godly jealousy: for I have espoused you to one husband, that I may present you as a chaste virgin to Christ. He isn't protecting his reputation here. He's protecting a marriage he arranged and doesn't want ruined.",
      "I fear, lest by any means, as the serpent beguiled Eve through his subtilty, so your minds should be corrupted from the simplicity that is in Christ. He reaches back to Eden for the pattern. The lie was never shouted. It was offered gently.",
      "Though I be rude in speech, yet not in knowledge. He concedes the one insult that's actually true and refuses the rest.",
      "Satan himself is transformed into an angel of light. Therefore it is no great thing if his ministers also be transformed as the ministers of righteousness. The most dangerous counterfeit never looks like the enemy. It looks like the real thing, slightly improved.",
    ]),
    secondCorinthiansEleven(16, 33, [
      "I speak as it were foolishly, I am bold also. He warns you before he does it. What comes next is going to sound like bragging, and he hates that it has come to this.",
      "Are they Hebrews? so am I. Are they Israelites? so am I... are they ministers of Christ? I speak as a fool, I am more. He matches every credential they're waving and then keeps going past it.",
      "In labours more abundant, in stripes above measure, in prisons more frequent, in deaths oft. Thrice was I beaten with rods, once was I stoned, thrice I suffered shipwreck, a night and a day I have been in the deep. His resume isn't achievements. It's a list of what was done to him for staying faithful.",
      "Besides those things that are without, that which cometh upon me daily, the care of all the churches. Who is weak, and I am not weak? The public suffering is heavy. The private worry for people he loves is heavier.",
    ]),
    secondCorinthiansTwelve(1, 10, [
      "I knew a man in Christ above fourteen years ago... such an one caught up to the third heaven. He talks about himself in the third person, like the experience is too strange to claim directly.",
      "Lest I should be exalted above measure through the abundance of the revelations, there was given to me a thorn in the flesh, the messenger of Satan to buffet me. A vision of paradise, and then something painful attached to it on purpose.",
      "For this thing I besought the Lord thrice, that it might depart from me. He prayed the obvious prayer. God did not answer it the obvious way.",
      "My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me. The thorn stays. The answer isn't removal. It's presence.",
    ]),
    secondCorinthiansTwelve(11, 21, [
      "I am become a fool in glorying; ye have compelled me: for I ought to have been commended of you. He's worn out from having to say any of this at all. They should have defended him without being asked.",
      "I will very gladly spend and be spent for you; though the more abundantly I love you, the less I be loved. He states the trade plainly and doesn't pretend it feels fair.",
      "Did Titus make a gain of you? walked we not in the same spirit? He answers a specific accusation of fraud with a specific, checkable fact.",
      "I fear, lest, when I come, I shall not find you such as I would... lest there be debates, envyings, wraths, strifes, backbitings, whisperings, swellings, tumults. He isn't afraid of enemies outside the church. He's afraid of what he'll find inside it.",
    ]),
  ],
  closing: [
    ["So that is Day 332.", 700],
    ["A man defending himself, not with credentials, but with scars.", 750],
    ["Every time his critics hand him a measuring stick, he answers with a list of things that happened to his body, not things he accomplished.", 850],
    ["And in the middle of it, the line this whole letter has been building toward. My strength is made perfect in weakness.", 850],
    ["He asked three times for the thorn to leave. It never did. The grace did instead.", 850],
    ["Tomorrow, Second Corinthians 13, then Galatians 1 and 2. One letter ends with a warning to examine yourselves. A new one opens furious that anyone would trade the gospel for something easier.", 850],
    ["For now, sit with the thorn that stayed.", 750],
    ["Not because God couldn't remove it.", 750],
    ["Because His strength fits exactly where yours runs out.", 1200],
  ],
};
