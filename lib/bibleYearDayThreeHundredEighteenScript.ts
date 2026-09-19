import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 318, written to the Day 1 standard.
 *
 * Paul finally reaches Rome after the shipwreck, is healed on Malta, and
 * preaches unhindered for two years under house arrest - and Acts ends
 * there. Then the reading turns from narrative to argument: Romans opens
 * with Paul's thesis and the case that every human being, Jew and Gentile
 * alike, stands guilty and needs exactly what he has been preaching this
 * whole time. Seven blocks across Acts 28, Romans 1, and Romans 2.
 */

const actsTwentyEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts 28:${startVerse}-${endVerse}`,
  book: "acts",
  chapter: 28,
  startVerse,
  endVerse,
  teaching,
});

const romansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 1:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const romansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 2:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 318,
  title: "Rome and the Gospel's Need",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 318.", 700],
    ["Every person on that wrecked ship made it to land alive, exactly like the angel told Paul they would.", 800],
    ["Today he finally reaches Rome — the city he has been trying to get to since the middle of Acts.", 800],
    ["And once he is there, Scripture changes shape entirely.", 850],
    ["We move from the story of what Paul did to the letter explaining why any of it matters.", 850],
    ["We are in Acts 28, and Romans 1 and 2. A viper, a welcome, and a case nobody wants made against them.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    actsTwentyEight(1, 10, [
      "After the storm that swallowed the ship, an island called Melita, and a fire lit by strangers before they even ask who these people are.",
      "A viper fastens onto Paul's hand, pulled up out of the sticks he gathered for that fire. He shakes it into the flames and keeps standing.",
      "The islanders' verdict flips inside one scene. First he must be a murderer justice finally caught. Then, when nothing happens to him, he must be a god. Neither one is true.",
      "Paul goes to Publius's sick father, prays, lays hands on him, and he is healed. Word spreads, and the whole island brings him its sick.",
    ]),
    actsTwentyEight(11, 22, [
      "Three months on Malta, then a ship named for Castor and Pollux, twin gods of sailors, carries the man who trusts one God the rest of the way toward Rome.",
      "Believers hear he is coming and walk out to meet him, some as far as Appii Forum, some to the Three Taverns. Paul thanks God and takes courage. Even an apostle needs a friendly face on a hard road.",
      "In Rome he is a prisoner but not in a cell. Chained to a soldier, in his own rented house, free to receive anyone. That arrangement is about to become his pulpit.",
      "He calls the Jewish leaders first, before anyone else, and tells them plainly: I did nothing against our people, and I am bound in this chain for the hope of Israel. They say they have had no letters against him, only that this sect gets spoken against everywhere.",
    ]),
    actsTwentyEight(23, 31, [
      "A whole day, morning to evening, one man walking a room of strangers through Moses and the prophets to get them to Jesus. Some believe. Some do not. Acts does not pretend everyone always says yes.",
      "When they cannot agree among themselves, Paul lets Isaiah say the hard part for him. Hearing ye shall hear, and shall not understand. Seeing ye shall see, and not perceive. A hardened heart is not cured by a better argument.",
      "So the sentence lands where it has been aimed the whole book long. The salvation of God is sent unto the Gentiles, and they will hear it. Rejection in one place has never once stopped this gospel from moving to the next.",
      "Acts ends on Paul in his own hired house, two years, preaching the kingdom of God with all confidence, no man forbidding him. Chained to a soldier is the closest Rome ever gets to shutting him up.",
    ]),
    romansOne(1, 17, [
      "Paul opens with his job description. A servant, called to be an apostle, set apart for a gospel that was promised long before he showed up, through the prophets, in the holy scriptures.",
      "He says he has been longing to see Rome for years and still has not gotten there. Not because he does not care, but because the door kept staying shut. He wants to give something and receive something, in the same breath.",
      "Then he says the line the whole letter stands on. I am not ashamed of the gospel of Christ, for it is the power of God unto salvation to every one that believeth, to the Jew first, and also to the Greek.",
      "The just shall live by faith. Four words pulled from an obscure line in Habakkuk, about to carry the weight of this entire letter.",
    ]),
    romansOne(18, 32, [
      "Before Paul gets specific, he draws the circle as wide as it goes. The wrath of God is revealed from heaven against all ungodliness and unrighteousness of men, who hold the truth in unrighteousness.",
      "His case is that God was never hidden. The invisible things of him are clearly seen in what he made, plainly enough that nobody gets to claim they never had a clue. Not seeing is not the failure Paul names. Refusing to honor what they saw is.",
      "So the fall he describes is a trade, three times over. Glory for an image. The truth of God for a lie. The Creator for the creature. Each time, Paul says, God's response is the same two words. Gave them up. Letting people have exactly what they insisted on wanting.",
      "The chapter closes with a list of what that looks like lived out — envy, murder, deceit, pride, disobedience to parents, and more — and one line that cuts deeper than the list itself. They not only do these things, but have pleasure in them that do them too.",
    ]),
    romansTwo(1, 16, [
      "Chapter 2 turns the mirror around. Whoever you are, if you are standing there judging the people in chapter 1, Paul says you have already condemned yourself, because thou that judgest doest the same things.",
      "He asks the real question underneath religious confidence. Despisest thou the riches of his goodness and forbearance and longsuffering, not knowing that the goodness of God leadeth thee to repentance? Kindness was never permission. It was meant to lead somewhere.",
      "God judges by what is actually done, not by which side of a line a person was born on. Patient continuance in well doing gets eternal life. Contentious disobedience gets indignation and wrath. To the Jew first, and also to the Gentile. There is no respect of persons with God.",
      "Even people who never had the law can show its work written in their hearts, their own conscience arguing it out with them. Having the law was never the safety Israel assumed it was.",
    ]),
    romansTwo(17, 29, [
      "Paul zeroes in on one specific man. Confident, trained in the law, sure he is a guide of the blind and a teacher of babes. Then he lists the gap between what that man teaches and what he does. Thou that preachest a man should not steal, dost thou steal?",
      "The circumcision meant to mark this man out as God's does not close that gap for him. Paul says it plainly. If thou be a breaker of the law, thy circumcision is made uncircumcision.",
      "Then he flips it the other way. Someone with no circumcision at all, who actually keeps what the law asks, ends up judging the one who carries the mark and does not live it.",
      "So he redraws the line completely. He is not a Jew which is one outwardly, Paul says. Circumcision is that of the heart, in the spirit, and not in the letter, whose praise is not of men, but of God.",
    ]),
  ],
  closing: [
    ["So that is Day 318.", 700],
    ["A viper that could not kill him, an island that could not decide if he was a criminal or a god, and finally, Rome.", 800],
    ["Acts ends with Paul chained to a soldier, in his own rented house, preaching to anyone who walks in, and nobody stopping him.", 850],
    ["Then the story changes shape completely. Romans does not tell you what Paul did. It tells you why any of it was necessary.", 850],
    ["Not ashamed of the gospel. That is the line the whole letter stands on, before he has even explained what the gospel does.", 850],
    ["Then he draws the circle as wide as it goes. Jew and Gentile both, guilty of the same trade. Truth for a lie.", 850],
    ["And the man most sure he is exempt from that verdict gets named directly. The mark on his body was never the thing that mattered. The heart was always the real address.", 850],
    ["Tomorrow, Romans 3 through 5. Every excuse runs out, and Paul shows what faith does with the guilt he just proved.", 850],
    ["For now, hold on to the line Paul leads with.", 750],
    ["Not ashamed of the gospel.", 1200],
  ],
};
