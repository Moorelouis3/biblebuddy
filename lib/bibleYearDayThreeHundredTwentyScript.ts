import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 320, written to the Day 1 standard.
 *
 * Chapter 6 answers yesterday's closing question with a burial, not a rule.
 * Chapter 7 is Paul's own confession of the war that doesn't end just
 * because you're free. Chapter 8 answers that war with no condemnation and
 * a love nothing can separate you from. Six blocks across Romans 6, 7, 8.
 */

const romansSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 6:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const romansSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 7:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const romansEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 8:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 320,
  title: "New Life in the Spirit",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 320.", 700],
    ["Yesterday ended on a question you're probably already asking. If grace covers everything, why not just keep sinning?", 800],
    ["Paul answers it. Not with a rule. With a burial.", 800],
    ["Then he shows you a fight that doesn't end just because you're free.", 800],
    ["And then he tells you what's already true about you, whether you feel it today or not.", 850],
    ["We are in Romans 6, 7, and 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    romansSix(1, 14, [
      "Paul answers his own question head-on. Shall we keep sinning so grace can grow bigger? God forbid. If you were baptized into Christ, you were baptized into his death.",
      "That's the picture he wants you to see. Buried with him, so you could walk in a new kind of life, the same way he was raised from the dead.",
      "Your old self was crucified with him, so sin's grip on you is broken. Not managed down. Broken.",
      "So don't let sin sit on the throne of your body anymore. You're not under law now. You're under grace. That's not permission to sin. It's the reason you don't have to.",
    ]),
    romansSix(15, 23, [
      "Paul pushes the same question one layer deeper. Just because you're not under law, does that mean sin is fine? God forbid, he says again.",
      "Everybody serves something. You used to be a slave to sin. Now, from the heart, you've obeyed the teaching handed to you, and that has made you a slave to righteousness instead.",
      "So look back honestly at what your old life actually paid you. Nothing you're proud of now. The end of that road is death.",
      "But the gift of God is eternal life, in Christ Jesus our Lord. A wage is something you earn. A gift is something you're just given.",
    ]),
    romansSeven(1, 13, [
      "Paul reaches for a picture from marriage law. A woman is bound to her husband as long as he's alive. Once he dies, she's free to belong to someone else, and no one can call that shameful.",
      "Same principle, he says. You died to the law through the body of Christ, so you could belong to someone else now, the one raised from the dead.",
      "Then he heads off the accusation before anyone can make it. Is the law itself sin? No. The law is holy, and the commandment holy, and just, and good.",
      "The problem was never the law. Sin used the commandment as an opening. Paul says it plainly. I had not known lust, except the law had said, thou shalt not covet.",
    ]),
    romansSeven(14, 25, [
      "Here Paul stops explaining and starts confessing. I am carnal, sold under sin. What I want to do, I don't do. What I hate, that's exactly what I do.",
      "He names it without flinching. It is no more I that do it, but sin that dwelleth in me. That's not an excuse. It's a man describing a war he keeps losing on his own strength.",
      "O wretched man that I am, who shall deliver me from this body of death? That's not despair for effect. That's where honesty about yourself actually lands you.",
      "Then the turn, the only way out he names. I thank God, through Jesus Christ our Lord. Not a technique. Not more effort. A rescue from outside himself.",
    ]),
    romansEight(1, 17, [
      "Right where chapter 7 left off, Paul opens with the verdict that changes everything. There is therefore now no condemnation to them which are in Christ Jesus.",
      "The law of the Spirit of life has done what the old law never could, because the flesh made the old law weak. So God did it himself, sending his own Son.",
      "If the Spirit of God lives in you, you're not living in the flesh anymore, you're living in the Spirit. And that same Spirit that raised Jesus will one day give life to your body too.",
      "You didn't get a spirit of fear that goes back into bondage. You got the Spirit of adoption, and you get to cry Abba, Father. That's a son's word. Not a servant's.",
    ]),
    romansEight(18, 39, [
      "Paul doesn't deny the suffering is real. He just says it isn't even worth comparing to what's coming. The whole creation is groaning, waiting to be set free, and so are you.",
      "You don't always know what to pray for. Paul says the Spirit steps in right there, interceding for you with groanings that words can't hold.",
      "Then the promise underneath all of it. All things work together for good to them that love God. Not that everything that happens is good. That God is working even the hard things toward something good.",
      "And then the question that answers itself. He that spared not his own Son for you, how shall he not also freely give you all things? Paul runs the whole list, death, life, angels, powers, height, depth, and lands on one word for every one of them. Nothing can separate you from the love of God in Christ Jesus.",
    ]),
  ],
  closing: [
    ["So that is Day 320.", 700],
    ["Three chapters, and Paul takes you from a burial to a war to a rescue to a verdict that can't be appealed.", 800],
    ["You're dead to sin, but you'll still feel it fighting for the wheel. Paul felt exactly that, and said so out loud instead of hiding it.", 850],
    ["Then chapter 8 answers chapter 7 directly. No condemnation. No fear. A Father who calls you son.", 850],
    ["And if he didn't spare his own Son to get you here, nothing left in all creation is strong enough to take you back out.", 850],
    ["Tomorrow, Romans 9 through 11. Paul turns to a harder question. What about the people who were promised all this first, and didn't believe it?", 850],
    ["For now, hold on to the line that ends this chapter.", 750],
    ["Who shall separate us from the love of Christ?", 800],
    ["Nothing can.", 1200],
  ],
};
