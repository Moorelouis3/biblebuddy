import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 345, written to the Day 1 standard.
 *
 * 2 Timothy 2 through 4 - Paul's last letter, written from a Roman prison
 * he does not expect to leave. A charge to endure, a warning about the
 * last days, the value of Scripture, and then Paul's own farewell: the
 * fight finished, the course run, and a very human list of who stayed and
 * who left. Six blocks across three chapters.
 */

const secondTimothyTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Timothy 2:${startVerse}-${endVerse}`,
  book: "2 timothy",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const secondTimothyThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Timothy 3:${startVerse}-${endVerse}`,
  book: "2 timothy",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const secondTimothyFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Timothy 4:${startVerse}-${endVerse}`,
  book: "2 timothy",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 345,
  title: "Endurance and Finishing Faithfully",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 345.", 700],
    ["This is Paul's last letter. He knows it. He's in a Roman prison, and this time he does not expect to walk out.", 850],
    ["So everything he writes to Timothy now carries extra weight. He is handing off what he cannot finish carrying himself.", 850],
    ["2 Timothy 2, 3, and 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondTimothyTwo(1, 13, [
      "Be strong in the grace that is in Christ Jesus, Paul tells him, and take what you've heard from me and hand it to faithful people who can teach it to others too. Truth is meant to keep moving through hands, not stop with you.",
      "Then three pictures. A soldier doesn't get tangled up in civilian life, because he's trying to please the one who enlisted him. An athlete only gets the prize by competing within the rules. A farmer who does the hard work gets the first share of the crop.",
      "Remember Jesus Christ, raised from the dead, from David's line, Paul says. That's my gospel, and it's why I'm suffering right now, chained up like a criminal. But God's word isn't chained. I put up with all of this for the sake of the people God has chosen.",
      "Then a saying he trusts completely. If we died with him, we'll live with him. If we endure, we'll reign with him. If we deny him, he'll deny us. But if we're faithless, he stays faithful, because he can't deny who he is.",
    ]),
    secondTimothyTwo(14, 26, [
      "Remind people of this, Paul says, and warn them plainly not to fight over words. It does no good and just wrecks the people listening. Work hard to present yourself to God as someone approved, a worker with nothing to be ashamed of, handling the word of truth accurately.",
      "Avoid empty, godless chatter, he says, because it just leads to more ungodliness, and it spreads like an infection. Hymenaeus and Philetus are already teaching that the resurrection has already happened, and it's wrecking some people's faith. But God's foundation still stands firm.",
      "In a large house there are gold and silver dishes, but also wood and clay ones, some for special use, some for ordinary use. Paul tells Timothy that a person who cleanses himself from what's dishonorable becomes a vessel fit for special use, ready for the master.",
      "So run from youthful passions, he says, and chase righteousness, faith, love, and peace with people who call on the Lord from a clean heart. Don't get pulled into foolish arguments. Instead be gentle, teachable, patient, correcting opponents with humility, hoping God grants them a way back to the truth.",
    ]),
    secondTimothyThree(1, 9, [
      "Know this, Paul says: hard times are coming in the last days. He gives a long, brutal list of what people will be like. Lovers of themselves, lovers of money, boastful, proud, abusive, disobedient to parents, ungrateful, unholy, without natural affection, unforgiving, reckless.",
      "He keeps going. Lovers of pleasure rather than lovers of God, having a form of godliness while denying its power. From these, Paul says plainly, turn away.",
      "These are the ones who worm their way into houses and take advantage of vulnerable people weighed down by sin, always learning and never able to arrive at the truth. Just as Jannes and Jambres opposed Moses, these people oppose the truth too.",
      "But they won't get very far, Paul says. Their foolishness will become obvious to everyone eventually, just like it did with Jannes and Jambres.",
    ]),
    secondTimothyThree(10, 17, [
      "You, though, Paul says to Timothy, have followed my teaching, my conduct, my purpose, my faith, patience, love, and endurance. You know the persecutions I went through at Antioch, Iconium, and Lystra, and the Lord rescued me out of every one of them.",
      "In fact, everyone who wants to live a godly life in Christ Jesus will be persecuted. Meanwhile evil people and impostors will go from bad to worse, deceiving others and being deceived themselves. This is simply how it works, not a sign that something's gone wrong.",
      "But you, continue in what you've learned and become convinced of, Paul says, knowing who you learned it from. And from childhood you've known the sacred writings, which are able to make you wise for salvation through faith in Christ Jesus.",
      "All Scripture is God-breathed, and useful for teaching, rebuking, correcting, and training in righteousness, so that the person who belongs to God may be fully equipped for every good work. That's what Timothy's whole life has been built on since he was a boy.",
    ]),
    secondTimothyFour(1, 8, [
      "I charge you, Paul says, before God and Christ Jesus, who will judge the living and the dead, and because of his appearing and his kingdom: preach the word. Be ready in season and out of season. Correct, rebuke, and encourage, with the utmost patience and careful teaching.",
      "The time is coming, he warns, when people won't put up with sound teaching. Instead they'll gather teachers who tell them what their itching ears want to hear, and they'll turn away from the truth toward myths. So keep a clear head, endure hardship, do the work of an evangelist, and complete the ministry you've been given.",
      "Then Paul turns to himself. I am already being poured out as a drink offering, he says, and the time of my departure has come. I have fought the good fight. I have finished the race. I have kept the faith.",
      "Now there is a crown of righteousness waiting for me, which the Lord, the righteous judge, will give me on that day, and not only to me, but to everyone who has loved his appearing. A man about to be executed, and this is how he describes it.",
    ]),
    secondTimothyFour(9, 22, [
      "Then the letter turns intensely personal. Come quickly, Paul asks Timothy, because Demas has deserted me, in love with this present world, and gone to Thessalonica. Crescens has gone to Galatia, Titus to Dalmatia. Only Luke is with me.",
      "Bring Mark with you, he says, because he's useful to me for ministry. Bring the cloak I left at Troas, and the scrolls, especially the parchments. He's cold, and he's asking for his books. Alexander the coppersmith did me a great deal of harm, he adds. The Lord will repay him for what he did.",
      "At my first defense, Paul says, no one stood by me. Everyone deserted me. May it not be counted against them. But the Lord stood at my side and gave me strength, so that through me the message might be fully proclaimed, and I was delivered from the lion's mouth. The Lord will rescue me from every evil attack and bring me safely to his heavenly kingdom.",
      "He closes with names. Greet Prisca and Aquila, and the household of Onesiphorus. Erastus stayed in Corinth, and I left Trophimus sick at Miletus. Do your best to get here before winter. Then the last line of the last letter he ever wrote: the Lord be with your spirit. Grace be with you all.",
    ]),
  ],
  closing: [
    ["So that's Day 345.", 700],
    ["A soldier, an athlete, a farmer, hard times ahead, and then a man closing out his life one instruction at a time.", 800],
    ["Paul spends this whole letter handing things off. The gospel, to Timothy. The books and the cloak, back to himself, because he's cold and alone.", 800],
    ["Almost everyone left him. Demas for the world, others just scattered. And Paul still says the Lord stood by me.", 850],
    ["That's not a man pretending it didn't hurt. It's a man who has decided abandonment doesn't get the last word.", 850],
    ["Tomorrow, Titus 1 through 3. A short letter about what leadership and good works are supposed to look like in a place as rough as Crete.", 850],
    ["For now, carry the line Paul wrote on his way out.", 800],
    ["I have fought the good fight. I have finished the race. I have kept the faith.", 1200],
  ],
};
