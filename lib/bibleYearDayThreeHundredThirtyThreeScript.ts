import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 333, written to the Day 1 standard.
 *
 * Second Corinthians closes with a call to examine yourselves and a
 * benediction; Galatians opens furious that anyone would trade the gospel
 * for something easier, then shows Paul standing alone against Peter's own
 * hypocrisy. Six blocks across three chapters and two letters.
 */

const secondCorinthiansThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Corinthians 13:${startVerse}-${endVerse}`,
  book: "2 corinthians",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

const galatiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 1:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const galatiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 2:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 333,
  title: "Gospel Grace Defended",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 333.", 700],
    ["Second Corinthians ends today. Not with more defense. With a challenge turned back on the reader.", 800],
    ["Then a new letter opens, and the tone changes completely. Paul isn't hurt this time. He's furious.", 850],
    ["Someone has told the Galatians that grace alone isn't enough. That making the gospel work still needs a little law added in.", 850],
    ["We are in Second Corinthians 13, then Galatians 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondCorinthiansThirteen(1, 10, [
      "This is the third time I am coming to you. In the mouth of two or three witnesses shall every word be established. He's warned them twice already. This time he means to follow through.",
      "Examine yourselves, whether ye be in the faith; prove your own selves. Know ye not your own selves, how that Jesus Christ is in you, except ye be reprobates? After twelve chapters defending his own credentials, he turns the test around on them.",
      "We are glad, when we are weak, and ye are strong: and this also we wish, even your perfection. He would rather look weak and see them healthy than look strong and see them broken.",
      "I write these things being absent, lest being present I should use sharpness, according to the power which the Lord hath given me to edification, and not to destruction. The letter exists so the visit doesn't have to be a fight.",
    ]),
    secondCorinthiansThirteen(11, 14, [
      "Finally, brethren, farewell. Be perfect, be of good comfort, be of one mind, live in peace; and the God of love and peace shall be with you. After everything this letter has carried, he ends simply, almost gently.",
      "Greet one another with an holy kiss. A small, physical instruction, easy to skip past. It's still there because the church is made of bodies in a room, not just an argument on a page.",
      "All the saints salute you. Other believers, in other cities, thinking of this one specific congregation. The letter widens out for a moment before it closes.",
      "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost, be with you all. Amen. Father, Son, and Spirit, named together in a single closing line, and Second Corinthians is finished.",
    ]),
    galatiansOne(1, 10, [
      "Paul, an apostle, not of men, neither by man, but by Jesus Christ, and God the Father. Most of his letters open with warmth. This one opens defending his job title in the very first sentence.",
      "I marvel that ye are so soon removed from him that called you into the grace of Christ unto another gospel. No thanksgiving, no compliment. He goes straight to his alarm.",
      "Though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. He says it twice in three verses. Even a messenger from heaven doesn't outrank the actual message.",
      "Do I now persuade men, or God? or do I seek to please men? for if I yet pleased men, I should not be the servant of Christ. Whoever is unsettling the Galatians is doing it by being agreeable. Paul refuses to compete on those terms.",
    ]),
    galatiansOne(11, 24, [
      "The gospel which was preached of me is not after man. For I neither received it of man, neither was I taught it, but by the revelation of Jesus Christ. He's not defending a theory. He's defending where the message actually came from.",
      "Ye have heard of my conversation in time past in the Jews' religion, how that beyond measure I persecuted the church of God, and wasted it. He doesn't soften his own history to make the story cleaner.",
      "Immediately I conferred not with flesh and blood, neither went I up to Jerusalem to them which were apostles before me; but I went into Arabia. No committee approved this. He's answering the charge that he learned it secondhand.",
      "They had heard only, that he which persecuted us in times past now preacheth the faith which once he destroyed. And they glorified God in me. The churches never met him. They just heard what happened and gave God the credit for it.",
    ]),
    galatiansTwo(1, 10, [
      "Fourteen years after, I went up again to Jerusalem with Barnabas, and took Titus with me also. And I went up by revelation, lest by any means I should run, or had run, in vain. Even meeting with the other apostles, he's careful about why he went.",
      "Neither Titus, who was with me, being a Greek, was compelled to be circumcised. The actual test case walks in the room with him. Nobody forces it on Titus, and that becomes the proof.",
      "Certain false brethren unawares brought in, who came in privily to spy out our liberty which we have in Christ Jesus, that they might bring us into bondage: to whom we gave place by subjection, no, not for an hour. Not stubbornness for its own sake. He knows exactly what was at stake if he'd yielded.",
      "James, Cephas, and John, who seemed to be pillars, gave to me and Barnabas the right hands of fellowship. Only they would that we should remember the poor. The leadership in Jerusalem backs him. The one request they add, he already wanted to do.",
    ]),
    galatiansTwo(11, 21, [
      "When Peter was come to Antioch, I withstood him to the face, because he was to be blamed. Not a private word later. A public correction, to the man's face, in front of the church.",
      "Before that certain came from James, he did eat with the Gentiles: but when they were come, he withdrew and separated himself, fearing them which were of the circumcision. Peter knew better. He caved to the room anyway, and Barnabas got pulled along with him.",
      "A man is not justified by the works of the law, but by the faith of Jesus Christ. This is the sentence the whole confrontation was protecting. Peter's dinner table habits were putting it quietly back up for a vote.",
      "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me. I do not frustrate the grace of God: for if righteousness come by the law, then Christ is dead in vain. If the law could have done it, the cross was unnecessary. That's the whole argument, in one line.",
    ]),
  ],
  closing: [
    ["So that is Day 333.", 700],
    ["One letter ends with a call to examine yourself. The next opens with Paul refusing to let anyone soften the gospel he was given.", 800],
    ["Examine yourselves, whether ye be in the faith. Then, only chapters later, a public rebuke of the very apostle Jesus built the church on.", 800],
    ["Paul doesn't correct Peter because he enjoys conflict. He does it because Peter, of all people, knew better and flinched anyway.", 850],
    ["If righteousness come by the law, then Christ is dead in vain. Every argument in this letter is protecting that one sentence.", 850],
    ["Tomorrow, Galatians 3 through 5. Paul keeps building the case, and gets to what real freedom is actually for.", 850],
    ["For now, sit with a gospel that refused to be improved.", 750],
    ["Not by an angel. Not by a pillar of the church.", 750],
    ["Not by anyone.", 1200],
  ],
};
