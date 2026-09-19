import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 324, written to the Day 1 standard.
 *
 * First Corinthians 2 through 4: Paul explains why he preached weakness
 * instead of eloquence, rebukes the church for still picking sides between
 * him and Apollos, and closes by asking the question that flattens every
 * claim to being special. Six blocks, two per chapter.
 */

const firstCorinthiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 2:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 3:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 4:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 324,
  title: "Spirit, Foundation, and Stewardship",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 324.", 700],
    ["Paul just told the Corinthians the cross looks like foolishness. Today he explains why that's actually the smartest thing in the universe.", 800],
    ["Then he turns around and rebukes them for still picking sides. I am of Paul. I am of Apollos. Like a construction site is a popularity contest.", 800],
    ["And he ends with one question that ends every argument about being special. What do you have that you did not receive?", 850],
    ["We are in First Corinthians 2, 3, and 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstCorinthiansTwo(1, 9, [
      "Paul reminds them how he first showed up. Not with excellency of speech or of wisdom, but declaring the testimony of God, determined to know nothing among them but Jesus Christ, and him crucified.",
      "He was with them in weakness, and in fear, and in much trembling. The man who planted this church did not walk in acting like he had it all figured out.",
      "His preaching wasn't in the enticing words of man's wisdom, but in demonstration of the Spirit and of power, so their faith would not stand in the wisdom of men, but in the power of God. He wanted nothing standing between them and that power, not even his own skill.",
      "Then he says there is a wisdom after all, just not the kind this world respects. Eye hath not seen, nor ear heard, the things God has prepared for those who love him. The rulers of this world crucified the Lord of glory because they never saw it coming.",
    ]),
    firstCorinthiansTwo(10, 16, [
      "God hath revealed them unto us by his Spirit, Paul says, because the Spirit searcheth all things, yea, the deep things of God. Nobody stumbles into this. It has to be shown to you.",
      "He compares it to knowing another person. What man knoweth the things of a man, save the spirit of man which is in him? Even so, no one knows the things of God but the Spirit of God.",
      "The natural man receiveth not the things of the Spirit of God, because they are foolishness unto him, and he cannot know them, because they are spiritually discerned. It isn't that unbelievers are foolish people. It's that this wisdom isn't studied into. It's received.",
      "And then the line that undercuts every claim to being self-made. Who hath known the mind of the Lord, that he may instruct him? But we have the mind of Christ. Not because they earned it. Because it was given.",
    ]),
    firstCorinthiansThree(1, 9, [
      "Paul says he could not speak to them as spiritual, but as carnal, as babes in Christ. He fed them milk, not meat, because they weren't ready. And he says they still aren't.",
      "Here's his proof. There is envying, and strife, and divisions among you. One says I am of Paul, another I am of Apollos. Are you not carnal, and walking like ordinary men?",
      "So he flattens the whole argument. Who is Paul, and who is Apollos, but ministers through whom you believed? I planted, Apollos watered, but God gave the increase. The planter and the waterer were never the point. The one who makes anything grow is.",
      "Neither he that planteth nor he that watereth is anything, but God that giveth the increase. They picked a team. Paul says there was never a competition to pick.",
    ]),
    firstCorinthiansThree(10, 23, [
      "According to the grace given him, Paul says he laid a foundation as a wise masterbuilder, and warns whoever builds on it to take heed how they build, because no one can lay any other foundation than the one already laid. Jesus Christ.",
      "Build with gold, silver, precious stones, or with wood, hay, stubble, and the day will show which is which, because it will be revealed by fire, and the fire will test every man's work. Some work survives and earns a reward. Some burns, and the builder is saved, but only as one escaping through flame.",
      "Then the sharper warning. Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you? If any man defile that temple, God will destroy him, because the temple of God is holy, and that temple is you.",
      "So let no man deceive himself. If any man thinks he's wise by this world's standard, let him become a fool, so he can actually be wise, because the wisdom of this world is foolishness with God. And then the reversal. All things are yours, Paul or Apollos or the world or life or death, all are yours, and ye are Christ's, and Christ is God's. Nobody needed to pick a side. Everything already belonged to them.",
    ]),
    firstCorinthiansFour(1, 13, [
      "Paul says to think of him and Apollos simply as ministers of Christ, and stewards of the mysteries of God. And it is required of stewards that a man be found faithful. Nothing more glamorous than that.",
      "As for being judged, it's a very small thing to him whether the Corinthians judge him, or any human court does. He doesn't even judge himself. He that judgeth me is the Lord. So judge nothing before the time, until the Lord come, who will bring the hidden things of darkness to light.",
      "Then the question built to end every boasting match. Who maketh thee to differ from another? And what hast thou that thou didst not receive? Now if thou didst receive it, why dost thou glory, as if thou hadst not received it?",
      "And here is the cost behind his authority. Hunger, thirst, nakedness, no certain dwellingplace, laboring with his own hands, being reviled and blessing back, being persecuted and enduring it, made as the filth of the world, the offscouring of all things. That is what it actually looked like to plant the church they are now dividing over.",
    ]),
    firstCorinthiansFour(14, 21, [
      "Paul says he isn't writing to shame them, but to warn them as his own beloved sons. You may have ten thousand instructors in Christ, he says, but not many fathers, because I have begotten you through the gospel.",
      "So he asks them to be followers of him, and that's exactly why he's sending Timotheus, his own beloved and faithful son, to bring them into remembrance of his ways in Christ, the same way he teaches in every church everywhere.",
      "Some of them have gotten puffed up, assuming he isn't coming back. He says he'll come to them shortly, if the Lord will, and when he does he won't bother with the speech of the puffed up, only with their power, because the kingdom of God is not in word, but in power.",
      "Then he leaves the choice with them. What will ye? Shall I come unto you with a rod, or in love, and in the spirit of meekness? Same father, two different ways to show up, and it depends entirely on what he finds when he gets there.",
    ]),
  ],
  closing: [
    ["So that is Day 324.", 700],
    ["Paul spent three chapters taking apart every reason the Corinthians had to feel superior to each other.", 750],
    ["Not enough wisdom, not the right pedigree, not even the right founder to boast about. What do you have that you did not receive?", 800],
    ["And underneath the rebuke is something almost tender. I have begotten you through the gospel. He isn't trying to tear them down. He's trying to get them to grow up.", 850],
    ["The temple of God is holy, and that temple is you. That's not a threat sitting off by itself. It's the reason the divisions matter so much to him.", 850],
    ["Tomorrow, First Corinthians 5 and 6. The church that argues over leaders is about to find out what it's been tolerating in its own back yard.", 850],
    ["For now, sit with the question.", 750],
    ["What do you have,", 700],
    ["that you did not receive?", 1200],
  ],
};
