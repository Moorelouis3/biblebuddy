import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 341, written to the Day 1 standard.
 *
 * 1 Thessalonians 4 and 5, then the opening of 2 Thessalonians. Paul moves
 * from sanctification, to grief that has hope in it, to the day of the
 * Lord coming like a thief, then picks up a second letter to the same
 * church, still under persecution, still growing. Six blocks across three
 * chapters and two letters.
 */

const thessFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Thessalonians 4:${startVerse}-${endVerse}`,
  book: "1 thessalonians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const thessFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Thessalonians 5:${startVerse}-${endVerse}`,
  book: "1 thessalonians",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const secondThessOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Thessalonians 1:${startVerse}-${endVerse}`,
  book: "2 thessalonians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 341,
  title: "Holiness and the Lord's Return",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 341.", 700],
    ["Paul finishes his first letter to Thessalonica, then almost right away writes a second one.", 800],
    ["Same church. Same worries, mostly, plus one new one: some of them think the Lord has already come and gone.", 850],
    ["Today it's holiness, grief that still has hope in it, and what actually happens when Jesus returns.", 850],
    ["1 Thessalonians 4 and 5, then the start of 2 Thessalonians.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    thessFour(1, 12, [
      "Paul starts from what's already true. You know how to walk and please God, he says. Now abound more and more.",
      "Then he names it directly. This is the will of God, your sanctification. Abstain from sexual sin, and know how to possess your own body in sanctification and honor, not in the lust the Gentiles live by, the ones who don't know God.",
      "Let no one defraud his brother in this, because the Lord avenges all of it, just as we warned you. God didn't call you to uncleanness but to holiness. Reject this, and you're not rejecting a man, you're rejecting God.",
      "On brotherly love, he says, you don't need me to write you, God Himself taught you to love one another, and you already do it across all of Macedonia. Just do it more. Live quietly, mind your own business, work with your hands, so you walk honestly in front of outsiders and lack nothing.",
    ]),
    thessFour(13, 18, [
      "I don't want you ignorant, brethren, about those who sleep, so you don't grieve like people with no hope. If Jesus died and rose, God will bring with Him those who sleep in Jesus the same way.",
      "By the Lord's own word, Paul says: the living won't go ahead of the dead. The Lord Himself descends from heaven with a shout, the archangel's voice, the trumpet of God, and the dead in Christ rise first.",
      "Then the living are caught up together with them in the clouds, to meet the Lord in the air. And so we will always be with the Lord.",
      "Comfort one another with these words, he says. Not a scare tactic. A man handing grieving people a reason to breathe.",
    ]),
    thessFive(1, 11, [
      "On the times and seasons, you don't need me to write you either, he says. You already know the day of the Lord comes like a thief in the night.",
      "When people are saying peace and safety, sudden destruction hits them, like labor pains on a pregnant woman, and there's no escaping it.",
      "But you're not in the dark for that day to catch you like a thief. You're children of light, children of the day.",
      "So stay awake, stay sober, put on faith and love like a breastplate, the hope of salvation like a helmet. God didn't appoint you to wrath but to salvation through Jesus, who died so that whether we're awake or asleep, we live together with Him. Comfort each other. Build each other up.",
    ]),
    thessFive(12, 22, [
      "Know the ones who labor among you and lead you in the Lord, he says. Esteem them highly, in love, for their work's sake. Be at peace with one another.",
      "Warn the ones who won't fall in line. Comfort the discouraged. Support the weak. Be patient with everyone. Don't repay evil for evil, chase what's good toward each other and toward everyone.",
      "Rejoice always. Pray without ceasing. Give thanks in everything, because this is God's will for you in Christ Jesus.",
      "Don't quench the Spirit. Don't treat prophecy with contempt. Test everything, hold on to what's good, stay away from every kind of evil.",
    ]),
    thessFive(23, 28, [
      "May the God of peace sanctify you completely, he prays, and keep your whole spirit, soul, and body blameless until Christ comes. The one who calls you is faithful. He will do it.",
      "Brethren, pray for us, Paul says. Greet all the brothers with a holy kiss.",
      "Then he charges them by the Lord that this letter be read to every one of the holy brothers. He didn't want anyone left out of it.",
      "Grace be with you. Amen. A short goodbye after two long chapters about staying awake.",
    ]),
    secondThessOne(1, 12, [
      "A second letter now, same greeting. Paul, Silvanus, and Timothy to the same church. And Paul says we're bound to thank God for you, because your faith is growing beyond measure, and your love for one another keeps increasing.",
      "We boast about you in the churches of God, he says, for the patience and faith you're showing in every persecution and trouble you're enduring. That endurance is evidence of God's righteous judgment, that you'll be counted worthy of the kingdom you're suffering for.",
      "It's a righteous thing for God to repay trouble to the ones troubling you, he says, and to give rest to you who are troubled, when the Lord Jesus is revealed from heaven with His mighty angels, in flaming fire, dealing out justice to those who don't know God and don't obey the gospel.",
      "They'll pay with everlasting destruction, shut out from the Lord's presence and the glory of His power, on the day He's glorified in His people and admired by everyone who believed. Paul prays God counts them worthy of this calling and finishes the work of faith with power, so Christ's name is glorified in them, and them in Him.",
    ]),
  ],
  closing: [
    ["So that's Day 341.", 700],
    ["Two letters, one church, and Paul keeps circling back to the same question. Are you ready?", 800],
    ["Not ready like a test you cram for. Ready like someone already awake when the knock comes.", 800],
    ["He tells grieving people they're not without hope, then tells everyone else to just keep working, loving, and waiting.", 850],
    ["And in the second letter, the persecution hasn't stopped. Neither has their faith.", 800],
    ["Tomorrow, 2 Thessalonians 2 and 3, and the start of 1 Timothy. Standing firm, and guarding what's been handed to him.", 850],
    ["For now, carry the line Paul writes right after the trumpet and the clouds.", 800],
    ["Comfort one another.", 800],
    ["With these words.", 1200],
  ],
};
