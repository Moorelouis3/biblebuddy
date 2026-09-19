import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 336, written to the Day 1 standard.
 *
 * Ephesians 3 opens with the mystery Paul was entrusted to preach, then a
 * prayer worth praying over yourself. Ephesians 4 turns to the one body -
 * gifts given so it can grow up together, and the old life put off for the
 * new. Ephesians 5 closes the day with walking as children of light and
 * love defined by the cross. Six blocks across three chapters.
 */

const ephesiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 3:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const ephesiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 4:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const ephesiansFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 5:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 336,
  title: "Mystery, Unity, and New Life",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 336.", 700],
    ["Yesterday closed with grace stacked on grace. Today Paul explains why he even gets to say any of it.", 800],
    ["A mystery kept hidden for ages, and now Paul is the one entrusted to say it out loud.", 850],
    ["Then he prays a prayer worth praying over yourself, and turns to something practical. What one body actually looks like on an ordinary day.", 850],
    ["By the end, he is talking about marriage, and grounding all of it in the cross.", 800],
    ["We are in Ephesians 3 through 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ephesiansThree(1, 13, [
      "Paul calls himself the prisoner of Jesus Christ for you Gentiles. Not a victim of Rome. A prisoner because of what he is doing for people who were never his own family.",
      "He says God gave him a mystery by revelation, hidden in ages past, now finally out in the open. That the Gentiles are fellow heirs, of the same body, sharing the same promise in Christ, through the gospel.",
      "Then he calls himself less than the least of all saints. The man writing half the New Testament thinks of himself as the smallest one in the room.",
      "And the point was never just saving individuals. It was so the wisdom of God, in all its many colors, would be shown through the church, even to rulers and powers you cannot see.",
    ]),
    ephesiansThree(14, 21, [
      "Paul bows his knees to the Father and prays for something you cannot fake. That you would be strengthened with power in your inner man, by His Spirit.",
      "That Christ would dwell in your heart by faith. Not visit. Dwell. And that being rooted and grounded in love, you would grasp how wide, and long, and deep, and high that love actually is.",
      "He prays you would know a love that passes knowledge. Which sounds like a contradiction, and he prays it anyway, so that you would be filled with all the fullness of God.",
      "Then the doxology. Now unto him who is able to do exceeding abundantly above all that we ask or think, according to the power that works in us. Whatever you just prayed for, God's ceiling is higher than that.",
    ]),
    ephesiansFour(1, 16, [
      "Paul begs you to walk worthy of the calling you received. With lowliness, meekness, patience, bearing with one another in love.",
      "Then he stacks it. One body. One Spirit. One hope. One Lord. One faith. One baptism. One God and Father of all, above all, through all, in you all. Seven ones, holding the whole church together.",
      "Christ gave gifts to people. Some apostles, some prophets, some evangelists, some pastors and teachers. Not so they could run the church alone, but to equip the saints for the work, until the body is built up.",
      "So you are no longer children, tossed back and forth by every wind of teaching. You grow up by speaking the truth in love, and the whole body builds itself, joint by joint, as each part does its own work.",
    ]),
    ephesiansFour(17, 32, [
      "Paul draws a hard line. You did not learn Christ this way. The old way had a darkened understanding, a hard heart, past feeling, given over to whatever it wanted.",
      "Put off the old man, he says, corrupt and deceitful. Be renewed in the spirit of your mind. Put on the new man, created after God in righteousness and true holiness.",
      "Then it gets specific. Put away lying, speak truth to your neighbor. Be angry, and do not sin. Do not let the sun go down on your wrath. Do not give the devil room to work.",
      "Let no corrupt word come out of your mouth, only what builds up. And do not grieve the Holy Spirit of God, who sealed you for the day of redemption. Put away bitterness and rage. Be kind, tenderhearted, forgiving one another, the way God forgave you.",
    ]),
    ephesiansFive(1, 14, [
      "Be imitators of God, Paul says, as dear children. Walk in love, the way Christ loved you and gave himself up as an offering.",
      "Then the line gets drawn again. Sexual sin, impurity, greed, should not even be named among you. No filthy talk, no foolish joking. Instead, thankfulness.",
      "No one who lives that way has any inheritance in the kingdom of Christ and God. Do not let anyone talk you out of that with empty words.",
      "You were darkness once. Now you are light in the Lord. So walk like it. Wake up, sleeper, rise from the dead, and Christ will shine on you.",
    ]),
    ephesiansFive(15, 33, [
      "Walk carefully, Paul says, not as fools but as wise, making the most of the time, because the days are evil. Do not get drunk on wine, that leads to reckless living. Be filled with the Spirit instead.",
      "Speak to each other in psalms and hymns and spiritual songs. Give thanks always, for everything, in the name of the Lord Jesus. Submit to one another, out of reverence for Christ.",
      "Then Paul turns to marriage, and grounds the whole thing in the cross. Husbands, love your wives the way Christ loved the church and gave himself for her, to make her holy, to present her without a single flaw.",
      "A man leaves his father and mother and is joined to his wife, and the two become one flesh. Paul calls it a great mystery, and says he is really talking about Christ and the church the whole time.",
    ]),
  ],
  closing: [
    ["So that is Day 336.", 700],
    ["A mystery Paul was entrusted to carry, a prayer worth praying over yourself, and a picture of what one body is supposed to look like.", 800],
    ["One Spirit. One hope. One Lord. One faith. One baptism. One God over all of it. That is the argument for why you put up with each other at all.", 850],
    ["Put off the old man. Put on the new. Do not let the sun go down on your anger. Do not grieve the Spirit who sealed you.", 800],
    ["Then love gets defined by the cross. Christ gave himself up for her. That is the measure Paul hands to every husband in the room.", 850],
    ["You were darkness. Now you are light. Walk like it.", 800],
    ["Tomorrow, Ephesians 6, then Philippians 1 and 2. Armor for a fight, and joy written from a prison cell.", 850],
    ["For now, hold onto Paul's prayer for you.", 800],
    ["That you would know a love that passes knowledge, and be filled with all the fullness of God.", 1200],
  ],
};
