import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 346, written to the Day 1 standard.
 *
 * Titus 1 through 3 - a short letter to a young leader stationed on a rough
 * island. Qualifications for elders, a warning about Crete's own reputation
 * for lying, instructions for every group in the church, and grace that
 * does not just forgive but trains. Six blocks across three chapters.
 */

const titusOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Titus 1:${startVerse}-${endVerse}`,
  book: "titus",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const titusTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Titus 2:${startVerse}-${endVerse}`,
  book: "titus",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const titusThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Titus 3:${startVerse}-${endVerse}`,
  book: "titus",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 346,
  title: "Gospel-Shaped Leadership and Good Works",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 346.", 700],
    ["Paul left Titus behind on Crete to clean up a mess. Crete had a reputation. Even its own people called it a nation of liars.", 850],
    ["So this letter is about leadership. Who qualifies to lead, and what actually changes in a person once grace gets into their life.", 850],
    ["It is short. Three chapters. But it does not waste a line.", 750],
    ["Titus 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    titusOne(1, 9, [
      "Paul opens by naming exactly why he is an apostle. For the faith of God's chosen people, for the truth that leads to godliness, and for the hope of eternal life God promised before time even started.",
      "Then a personal line to Titus. My true son in the faith we share. Grace and peace from God the Father and Christ Jesus our Savior.",
      "Paul left Titus behind in Crete for a reason. To finish what was left unfinished, and to appoint elders in every town, the way Paul told him to.",
      "Then the list. An elder has to be blameless. One wife, kids who actually believe, not wild or out of control. Not stubborn, not quick-tempered, not a drinker, not a bully, not greedy. Instead welcoming, loving what is good, level-headed, fair, holy, in control of himself, holding tight to the word he was taught so he can encourage people and push back on those who argue against it.",
    ]),
    titusOne(10, 16, [
      "There are plenty of loud, empty talkers running around, Paul says, especially ones pushing circumcision. Whole households are getting wrecked by them, and they are doing it for money.",
      "Paul even quotes one of Crete's own prophets on this. Cretans are always liars, cruel animals, lazy gluttons. And Paul says flatly, that statement is true.",
      "So rebuke them sharply, Paul says, so they get healthy in the faith again instead of chasing myths and man-made rules that just pull people away from truth.",
      "Then the line that cuts both ways. To the pure, everything is pure. But to the corrupted and unbelieving, nothing is pure. Their mind and conscience are both stained. They say they know God, but their lives call them liars.",
    ]),
    titusTwo(1, 10, [
      "Titus's job is to teach what actually fits sound doctrine, and give each group in the church something specific. Older men: be sober, dignified, sensible, sound in faith, love, and patience.",
      "Older women: do not be slanderers or heavy drinkers, live in a way worth respecting, and train the younger women. Love your husbands and kids, be sensible, pure, keep a good home, be kind, so your life never gives anyone a reason to trash-talk God's word.",
      "Young men: get some self-control. And Titus, you personally be the example. Good works, integrity in your teaching, dignity, and speech nobody can honestly attack, so anyone against you ends up with nothing bad to say.",
      "Even servants under harsh masters: be obedient, do not argue back, do not steal from them, be fully trustworthy, so you make the teaching about God our Savior look good in everything you do.",
    ]),
    titusTwo(11, 15, [
      "Here is the turn. God's grace showed up, and it did not just save people. It started training them. It teaches you to say no to godless living and to the world's cravings, and to live sensibly, rightly, and godly right now, in this present world.",
      "And it points forward. Waiting for the blessed hope, the appearing in glory of our great God and Savior Jesus Christ.",
      "He gave himself for us, Paul says, for one reason. To buy us back from everything wrong, and to make for himself a people who are his own, eager to do good.",
      "Then Paul tells Titus how to carry all this. Speak it, push it, correct people with it, and use real authority. Do not let anyone look down on you for it.",
    ]),
    titusThree(1, 8, [
      "Remind people, Paul says, to submit to rulers and authorities, be ready for every good work, do not trash-talk anyone, do not pick fights, be gentle, show real humility to everyone.",
      "Because remember what we used to be. Foolish, disobedient, deceived, slaves to our own cravings and pleasures, living mean and jealous, hating each other and being hated back.",
      "But then the kindness and love of God our Savior toward humanity appeared. And he did not save us because of anything good we had done. It was pure mercy. He washed us clean and made us new through the Holy Spirit, poured out generously through Jesus Christ our Savior.",
      "So that being made right by his grace, we would become heirs with hope of eternal life. Paul calls this a trustworthy saying, and he wants Titus to keep insisting on it, so people who believe in God stay focused on doing good. That is what is actually useful for people.",
    ]),
    titusThree(9, 15, [
      "Stay away from foolish arguments, Paul says. Genealogies, fights, quarrels about the law. They do not help anyone. They are just a waste.",
      "If someone keeps causing division after you have warned them twice, have nothing more to do with them. They are the ones condemning themselves, Paul says, not you.",
      "Then it gets practical and personal. Come find me at Nicopolis, Paul says, I have decided to spend the winter there. Help Zenas the lawyer and Apollos get everything they need for their trip.",
      "And let our people learn to spend their lives on good, useful work, so they are not just taking up space. Everyone with Paul sends greetings. Grace be with all of you. That is how the letter ends.",
    ]),
  ],
  closing: [
    ["So that's Day 346.", 700],
    ["Elders who hold the line, false teachers rebuked, older believers training younger ones, and a people made new by mercy, not performance.", 850],
    ["Paul keeps circling back to the same thing. Grace did not just forgive you. It is training you, right now, to live differently.", 850],
    ["And notice who gets addressed. Not just leaders. Old men, old women, young men, young women, even servants under hard masters. Everyone gets something to do with what grace gave them.", 900],
    ["That is what good works are for here. Not to earn anything. To prove something already happened.", 850],
    ["Tomorrow, Philemon, and Hebrews 1 through 2. A short personal letter about a runaway slave, then a book that opens by saying Jesus is greater than anything that came before him.", 900],
    ["For now, carry Paul's line to Titus.", 800],
    ["Not by works of righteousness which we have done, but according to his mercy he saved us.", 900],
    ["Mercy first. Good works after.", 1200],
  ],
};
