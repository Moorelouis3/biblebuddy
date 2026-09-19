import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 323, written to the Day 1 standard.
 *
 * Romans closes with a long list of names and a warning, then First
 * Corinthians opens on a church already splitting into factions and a cross
 * the world calls foolish. Six blocks across Romans 15, Romans 16, and
 * 1 Corinthians 1.
 */

const romansFifteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 15:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 15,
  startVerse,
  endVerse,
  teaching,
});

const romansSixteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 16:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 16,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 1:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 323,
  title: "Unity, Mission, and the Cross",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 323.", 700],
    ["Romans ends today. And it doesn't end with a big finish. It ends with names.", 800],
    ["Paul closes out a letter to people he's never met by greeting dozens of them like old friends.", 800],
    ["Then we open a new letter, to a church that's already coming apart, arguing over whose team they're on.", 850],
    ["Paul's answer to all of it is the same thing. A cross the world calls foolish.", 850],
    ["We are in Romans 15, Romans 16, and First Corinthians 1.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    romansFifteen(1, 13, [
      "We then that are strong ought to bear the infirmities of the weak, and not to please ourselves. Straight out of chapter fourteen's argument about food and conscience, now stated as a rule for living.",
      "For even Christ pleased not himself. Paul keeps doing this. Every instruction traces back to what Jesus actually did, not just what sounds nice.",
      "He prays that the God of patience and consolation would grant them to be likeminded, so that with one mind and one mouth they might glorify God together.",
      "Wherefore receive ye one another, as Christ also received us. Then he quotes prophecy after prophecy about Gentiles rejoicing alongside Israel. This unity was always the plan, not an accident of history.",
    ]),
    romansFifteen(14, 33, [
      "Paul softens for a moment. I myself am persuaded of you, that ye are full of goodness. He's not writing to Rome because he thinks they're failing. He's writing because of the grace given him to preach to the Gentiles.",
      "I have fully preached the gospel of Christ, from Jerusalem round about unto Illyricum. He describes his whole calling in one line. Not building on another man's foundation, going where Christ hasn't been named yet.",
      "That's why he hasn't come to Rome sooner. He's finally planning to, but only after one stop first. He's carrying a gift from the churches in Macedonia and Achaia to the poor believers in Jerusalem.",
      "He asks for prayer, and you can hear the risk in it. That he'd be delivered from those in Judea who don't believe, and that his service would even be accepted by the saints there. Then, God willing, on to Rome.",
    ]),
    romansSixteen(1, 16, [
      "Paul commends Phebe, a servant of the church, and asks Rome to receive her and help her in whatever business she needs, because she's helped many, himself included.",
      "Then greet Priscilla and Aquila, my helpers in Christ Jesus, who laid down their own necks for my life. Real people who risked real danger for him.",
      "And then the list just keeps going. Andronicus and Junia, Amplias, Urbane, Apelles, the household of Aristobulus, Herodion, Tryphena and Tryphosa, Persis, Rufus and his mother, who was a mother to me also.",
      "It's easy to skim a list like this. Don't. Paul knows names, stories, and specific kindnesses for a church he's never visited. That's what love that isn't performance actually looks like up close.",
    ]),
    romansSixteen(17, 27, [
      "Now I beseech you, brethren, mark them which cause divisions and offences contrary to the doctrine ye have learned, and avoid them. After all those warm greetings, a sharp turn.",
      "For they that are such serve not our Lord Jesus Christ, but their own belly, and by good words and fair speeches deceive the hearts of the simple. Division in a church rarely announces itself. It comes dressed as something reasonable.",
      "And the God of peace shall bruise Satan under your feet shortly. Even the warning ends in confidence, not fear.",
      "Tertius, who actually wrote the letter down, sends his own greeting. Then Paul closes with a doxology. To God only wise, be glory through Jesus Christ for ever. And that's Romans, finished.",
    ]),
    firstCorinthiansOne(1, 17, [
      "New letter, new city. Paul to the church of God at Corinth, sanctified in Christ Jesus, called to be saints, along with everyone else who calls on the name of the Lord.",
      "He thanks God for them first. Enriched in everything, in all utterance and knowledge, waiting for the coming of Christ, who will confirm them to the end. Real gifts, given before he says a hard word.",
      "Then the hard word. I beseech you that ye all speak the same thing, and that there be no divisions among you. It's been reported that there are contentions. Every one of you saith, I am of Paul, and I of Apollos, and I of Cephas, and I of Christ.",
      "Is Christ divided? Was Paul crucified for you? He's genuinely stunned that they'd rally around him at all. For Christ sent me not to baptize, but to preach the gospel, not with wisdom of words, lest the cross of Christ be made of none effect.",
    ]),
    firstCorinthiansOne(18, 31, [
      "For the preaching of the cross is to them that perish foolishness, but unto us which are saved it is the power of God. Paul names the problem before he solves it. This message will sound stupid to some people. That was never going to change.",
      "Where is the wise? Where is the scribe? Where is the disputer of this world? Hath not God made foolish the wisdom of this world? He's not anti-intelligence. He's saying intelligence was never going to get anyone to God on its own.",
      "We preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness. But unto them which are called, Christ the power of God, and the wisdom of God. The same cross, two completely different reactions, depending on what you're looking for.",
      "Not many wise, not many mighty, not many noble are called. But God hath chosen the foolish things of the world to confound the wise, that no flesh should glory in his presence. He that glorieth, let him glory in the Lord. Nobody in that Corinthian church got in on their resume.",
    ]),
  ],
  closing: [
    ["So that is Day 323.", 700],
    ["Romans ends with names, not conclusions. Real people Paul loved by name before he ever met most of them face to face.", 800],
    ["And First Corinthians opens on a church already dividing over leaders they were never supposed to worship.", 800],
    ["Paul's fix for a fractured church isn't a better argument. It's the cross. Something no one can claim credit for.", 850],
    ["He that glorieth, let him glory in the Lord. That line alone could end every argument this church is having.", 850],
    ["Tomorrow, First Corinthians 2 through 4. Paul keeps pressing on what real wisdom looks like, and who gets to claim it.", 850],
    ["For now, sit with why God chose the foolish things.", 750],
    ["So that no one could boast.", 750],
    ["Not even the wise.", 1200],
  ],
};
