import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 325, written to the Day 1 standard.
 *
 * First Corinthians 5 and 6: a scandal the church is proud of instead of
 * grieved by, believers suing each other in pagan courts, and Paul's closing
 * argument that the body itself already belongs to someone else. Five
 * blocks across two chapters.
 */

const firstCorinthiansFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 5:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 6:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 325,
  title: "Purity, Judgment, and the Body",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 325.", 700],
    ["Yesterday Paul told a divided church to grow up. Today he tells them what they've been quietly ignoring while they argued.", 800],
    ["A man is sleeping with his father's wife, and the church is proud of how open-minded it's being about it.", 800],
    ["Then believers start suing each other in pagan courts, and Paul asks if anyone in the room can settle a simple argument.", 850],
    ["We are in First Corinthians 5 and 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstCorinthiansFive(1, 8, [
      "Paul opens with something blunt. It is reported that there is fornication among you, and of a kind not even named among the Gentiles, that a man has his father's wife. Pagan Corinth is looking at the church and finding it worse.",
      "And your glorying is not good, he says. Ye are puffed up, and have not rather mourned, that he that hath done this deed might be taken away from among you. They were proud of their tolerance instead of grieved by it.",
      "Know ye not that a little leaven leaveneth the whole lump? Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. He isn't asking them to be harsher than necessary. He's saying sin this size doesn't stay contained.",
      "For even Christ our passover is sacrificed for us. Therefore let us keep the feast, not with old leaven, neither with the leaven of malice and wickedness, but with the unleavened bread of sincerity and truth. The cross doesn't make sin smaller. It makes tolerating it stranger.",
    ]),
    firstCorinthiansFive(9, 13, [
      "Paul clarifies something they misread from an earlier letter. He never meant avoid every sinner out in the world, or they'd have to leave the world entirely.",
      "What he meant: if a man that is called a brother is a fornicator, or covetous, or an idolater, or a railer, or a drunkard, or an extortioner, do not even eat with him. The line isn't about the world out there. It's about who claims the name and lives however he wants.",
      "For what have I to do to judge them also that are without? Do not ye judge them that are within? But them that are without God judgeth. Paul draws the boundary of church discipline exactly where it belongs, and no wider.",
      "Therefore put away from among yourselves that wicked person. It isn't cruelty. It's refusing to let a name mean nothing.",
    ]),
    firstCorinthiansSix(1, 8, [
      "Dare any of you, having a matter against another, go to law before the unjust, and not before the saints? Believers were dragging each other into pagan courtrooms over ordinary disputes.",
      "Know ye not that the saints shall judge the world? And if the world shall be judged by you, are ye unworthy to judge the smallest matters? Know ye not that we shall judge angels? How much more things that pertain to this life? His logic: if that much is coming, surely someone here can settle a debt.",
      "I speak to your shame. Is it so, that there is not a wise man among you, not one that shall be able to judge between his brethren? But brother goeth to law with brother, and that before unbelievers.",
      "Why do ye not rather take wrong? Why do ye not rather suffer yourselves to be defrauded? Nay, ye do wrong, and defraud, and that your brethren. He would rather they absorb the loss than let outsiders watch the family tear at itself.",
    ]),
    firstCorinthiansSix(9, 11, [
      "Know ye not that the unrighteous shall not inherit the kingdom of God? Be not deceived. He lists it plainly, fornicators, idolaters, adulterers, thieves, drunkards, revilers, extortioners, and says none of it inherits the kingdom.",
      "It's a hard list, and Paul isn't finished. And such were some of you. Not people out there. People in the room reading this letter.",
      "But ye are washed, but ye are sanctified, but ye are justified in the name of the Lord Jesus, and by the Spirit of our God. Three verbs, all past tense, all done to them, not achieved by them.",
      "That's the whole argument of this letter compressed into one verse. Not that sin doesn't matter. That it no longer names them.",
    ]),
    firstCorinthiansSix(12, 20, [
      "All things are lawful unto me, but all things are not expedient. All things are lawful for me, but I will not be brought under the power of any. Paul quotes their own slogan back at them, then narrows it. Freedom that enslaves isn't freedom.",
      "Know ye not that your bodies are the members of Christ? Shall I then take the members of Christ, and make them the members of an harlot? God forbid. He isn't arguing abstract ethics. He's saying the body itself already belongs to somebody.",
      "Flee fornication. Every sin that a man doeth is without the body, but he that committeth fornication sinneth against his own body. Not step back from it. Flee. The same word used for running from real danger.",
      "What? Know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price. Therefore glorify God in your body, and in your spirit, which are God's. Same temple language from chapter three, now pointed at one person's own body.",
    ]),
  ],
  closing: [
    ["So that is Day 325.", 700],
    ["A scandal the church was proud of, and lawsuits it should never have filed.", 750],
    ["Both come from the same mistake. Confusing tolerance for love, and rights for freedom.", 800],
    ["But ye are washed, but ye are sanctified, but ye are justified. Paul never separates the correction from that verse. He names the sin and then names what already happened to them.", 850],
    ["Flee fornication, he says. Not manage it. Not negotiate with it. Run.", 850],
    ["Tomorrow, First Corinthians 7. Paul takes on marriage, singleness, and staying where God called you.", 850],
    ["For now, sit with the temple.", 750],
    ["Your body.", 700],
    ["Bought with a price.", 1200],
  ],
};
