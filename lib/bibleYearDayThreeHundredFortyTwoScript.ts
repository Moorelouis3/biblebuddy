import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 342, written to the Day 1 standard.
 *
 * The rest of 2 Thessalonians, then the opening of 1 Timothy. Paul calms a
 * church spooked into thinking the day of the Lord had already come, tells
 * them to keep working while they wait, then turns to Timothy and warns him
 * off false teachers before landing on the gospel itself: Christ Jesus came
 * to save sinners, of whom Paul says he is chief. Seven blocks across three
 * chapters and two letters.
 */

const secondThessTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Thessalonians 2:${startVerse}-${endVerse}`,
  book: "2 thessalonians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const secondThessThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Thessalonians 3:${startVerse}-${endVerse}`,
  book: "2 thessalonians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const timothyOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 1:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 342,
  title: "Stand Firm and Guard the Gospel",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 342.", 700],
    ["Somebody has told the Thessalonians the day of the Lord already happened, and they missed it.", 800],
    ["Paul writes back to settle them down, then hands them something to do while they wait: keep working.", 850],
    ["And then a new letter starts. Paul to Timothy, a young pastor he loves, warning him about teachers who love arguments more than the truth.", 850],
    ["2 Thessalonians 2 and 3, then the start of 1 Timothy.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    secondThessTwo(1, 12, [
      "Don't be shaken, Paul says, whether by a spirit, a message, or a letter claiming to be from us, saying the day of the Lord has already come.",
      "It won't come, he says, until the falling away comes first, and a man of sin is revealed, the son of perdition, who opposes and exalts himself above everything called God, and even sits in God's temple claiming to be God.",
      "You already know what's holding him back, Paul says, remember, I told you this in person. Something restrains him for now, until it's taken out of the way, and then he's revealed, and the Lord will destroy him with the breath of His mouth at His coming.",
      "That man's coming is powered by Satan, Paul says, full of false signs and wonders and every kind of evil deception aimed at people who refused to love the truth that could have saved them. So God lets them believe the lie they wanted.",
    ]),
    secondThessTwo(13, 17, [
      "But we're bound to thank God for you always, he says, because from the beginning God chose you for salvation through the Spirit's sanctifying work and your belief in the truth.",
      "That's what He called you to, through our gospel, to share in the glory of our Lord Jesus Christ.",
      "So stand fast, he says, and hold on to what you were taught, whether by word or by our letter.",
      "Then a prayer: may our Lord Jesus Christ Himself, and God our Father who loved us and gave us everlasting comfort and good hope through grace, comfort your hearts and establish you in every good word and work.",
    ]),
    secondThessThree(1, 5, [
      "Finally, pray for us, Paul says, that the Lord's word would run free and be honored, just like it has been with you.",
      "And pray we'd be delivered from wicked and unreasonable men, because not everyone has faith.",
      "But the Lord is faithful, he says. He'll establish you and guard you from the evil one.",
      "We're confident in the Lord about you, that you're doing what we commanded and will keep doing it. May the Lord direct your hearts into God's love and into Christ's patient endurance.",
    ]),
    secondThessThree(6, 13, [
      "Now Paul gets specific. Withdraw, he says, from every believer walking in idleness, not living by the tradition you received from us.",
      "You know how we lived among you, he says. We didn't eat anyone's bread for free. We worked, night and day, labor and toil, so we wouldn't be a burden to any of you.",
      "Not because we didn't have the right to your support, but to give you an example to follow. When we were with you, we gave you this rule: if a man won't work, he doesn't eat.",
      "We hear some of you are walking in idleness, doing no work, just being busybodies. To people like that we say: settle down, get to work, and eat your own bread. And you, don't grow weary of doing good.",
    ]),
    secondThessThree(14, 18, [
      "If anyone won't obey what we've written here, Paul says, mark that person and stop keeping company with him, so he feels the shame of it.",
      "But don't treat him as an enemy, he adds quickly. Warn him like a brother.",
      "Now may the Lord of peace Himself give you peace, always, in every way. The Lord be with you all.",
      "Paul signs it in his own hand, the mark of every genuine letter of his. Grace be with you all. That's how 2 Thessalonians ends.",
    ]),
    timothyOne(1, 11, [
      "New letter. Paul, an apostle by the command of God our Savior and Christ Jesus our hope, writing to Timothy, his true son in the faith.",
      "He'd left Timothy behind in Ephesus with a job: charge certain people to stop teaching a different doctrine, and to stop chasing myths and endless genealogies, which just stir up arguments instead of building faith.",
      "The goal of this instruction, he says, is love, out of a pure heart, a clear conscience, and sincere faith. Some have missed that and wandered off into empty talk, wanting to be teachers of the law without understanding a word of what they're so confident about.",
      "The law is good, Paul says, if you use it the way it's meant to be used, not for the righteous but for the lawless, the ungodly, murderers, the sexually immoral, liars, and whatever else stands against sound teaching, in line with the glorious gospel of the blessed God, which He put in Paul's trust.",
    ]),
    timothyOne(12, 20, [
      "I thank Christ Jesus our Lord, Paul says, who considered me faithful enough to put me into ministry, even though I used to blaspheme and persecute and act like a violent man. I was shown mercy, because I did it in ignorance, in unbelief.",
      "And the grace of our Lord overflowed for me, with faith and love in Christ Jesus. Here's a saying you can trust completely, worth everything: Christ Jesus came into the world to save sinners, and I am the worst of them.",
      "But that's exactly why I was shown mercy, he says, so Christ could display His full patience in me first, as an example for everyone who would come to believe in Him afterward for eternal life. To the King eternal, immortal, invisible, the only God, be honor and glory forever. Amen.",
      "I'm handing you this charge, son Timothy, he says, so you can fight the good fight, holding on to faith and a good conscience, which some have thrown away and made a wreck of their faith. Hymenaeus and Alexander are two of them, and I've handed them over to Satan so they'll learn not to blaspheme.",
    ]),
  ],
  closing: [
    ["So that's Day 342.", 700],
    ["A church scared into thinking they'd missed the Lord's return, told to calm down and get back to work.", 800],
    ["And a young pastor, told to stand guard over what he'd been given, because not everyone teaching in his church was telling the truth.", 850],
    ["Notice what Paul does with the man he calls chief of sinners. Himself.", 800],
    ["Not to wallow in it. To prove mercy has no floor.", 800],
    ["Tomorrow, 1 Timothy 2 through 4. How the church prays, how it's led, and how godliness actually gets trained into a life.", 850],
    ["For now, carry the line Paul hands Timothy, and hands you.", 800],
    ["Christ Jesus came into the world to save sinners.", 800],
    ["Of whom I am chief.", 1200],
  ],
};
