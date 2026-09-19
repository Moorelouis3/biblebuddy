import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 334, written to the Day 1 standard.
 *
 * Galatians 3-5: Paul argues faith came before the law through Abraham, the
 * law was a guardian for the meantime, and the freedom Christ bought is not
 * license but the ground for real love. Six blocks across three chapters.
 */

const galatiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 3:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const galatiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 4:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const galatiansFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Galatians 5:${startVerse}-${endVerse}`,
  book: "galatians",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 334,
  title: "Promise, Freedom, and the Spirit",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 334.", 700],
    ["Paul just called out Peter to his face. Now he turns back to the Galatians themselves, and he does not calm down.", 800],
    ["Foolish Galatians, he calls them. Who has bewitched you?", 800],
    ["The question underneath the whole letter. If faith got you in, why would you finish some other way?", 850],
    ["By the end of these three chapters he gets to what the freedom is actually for.", 850],
    ["We are in Galatians 3, 4, and 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    galatiansThree(1, 14, [
      "He opens furious. Foolish Galatians, who has bewitched you? Jesus Christ was set before your eyes, crucified, and you are turning away from that.",
      "Then he asks the one question that decides everything. Did you receive the Spirit by keeping the law, or by hearing and believing? They already know the answer. They lived it.",
      "He goes back to Abraham, before the law existed at all. Abraham believed God, and it was counted to him as righteousness. Faith came first. The law came four hundred years later.",
      "Christ redeemed us from the curse of the law, being made a curse for us. Whatever the law demanded and could not deliver, he absorbed himself, on a tree.",
    ]),
    galatiansThree(15, 29, [
      "The promise was made to Abraham and to his seed, singular, one offspring, and Paul says that seed is Christ. The whole promise was always pointed at one person.",
      "So why was the law even given? It was added because of transgressions, until that one offspring came. Not the main plan. A guardian for the years in between.",
      "The law was a schoolmaster, walking us to Christ, so that once faith arrived we would not need the schoolmaster anymore.",
      "There is neither Jew nor Greek, bond nor free, male nor female, for you are all one in Christ Jesus. Everything that used to sort people into ranks stops mattering at the cross.",
    ]),
    galatiansFour(1, 11, [
      "An heir who is still a child is no different from a servant, even though one day everything will belong to him. He is under guardians until the time his father set.",
      "When the fullness of time came, God sent his Son, born of a woman, born under the law, to buy back everyone who was under it.",
      "Because you are sons, God sent the Spirit of his Son into your hearts, crying Abba, Father. Not servant language. Family language, in your own mouth.",
      "And then the hard question. Why are you turning back to the weak, beggarly rules you used to be enslaved to? They had already been set free and were reaching for the chains again.",
    ]),
    galatiansFour(12, 31, [
      "He gets personal. He first preached to them sick, weak in the body, and they did not reject him for it. They received him like an angel, like Christ himself. That is how close this used to be.",
      "Where is that feeling now, he asks. You would have torn out your own eyes and given them to me. Have I become your enemy just because I told you the truth?",
      "My little children, he says, I am in labor again until Christ is formed in you. Not a title. A father in real pain over people drifting.",
      "Then the allegory. Hagar the slave stands for the old covenant, born to bondage. Sarah stands for the Jerusalem above, and she is free, and so are her children.",
    ]),
    galatiansFive(1, 15, [
      "Stand fast in the freedom Christ set you free in, and do not get tangled back into slavery. He says it like a command, not a suggestion.",
      "If you go back to circumcision as the thing that saves you, Christ profits you nothing. You have fallen from grace, not because grace failed, but because you traded it for something you thought was safer.",
      "What actually counts is faith working through love. Not the rule kept. The love behind it.",
      "You were called to freedom, but do not use freedom as an excuse for the flesh. Serve each other through love, because the whole law comes down to one line. Love your neighbor as yourself.",
    ]),
    galatiansFive(16, 26, [
      "Walk in the Spirit, and you will not carry out what the flesh wants. Paul names the war plainly. Flesh against Spirit, Spirit against flesh, pulling in opposite directions inside the same person.",
      "He lists the works of the flesh without flinching. Adultery, hatred, strife, envy, drunkenness, and more, and says plainly that people who live like this will not inherit the kingdom.",
      "Then the fruit of the Spirit, one list, nine words, growing together, not competing for space. Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Against that, there is no law.",
      "Those who belong to Christ have crucified the flesh, with its passions and desires. If you live by the Spirit, keep walking in step with the Spirit. It is not a one-time decision. It is a daily pace.",
    ]),
  ],
  closing: [
    ["So that is Day 334.", 700],
    ["Foolish Galatians, who bewitched you, all the way to walk in the Spirit and you will not fulfill the lust of the flesh.", 800],
    ["Paul spends three chapters taking apart one idea. That freedom earned by keeping rules was ever real freedom at all.", 800],
    ["Faith came before the law, through Abraham. The law was a guardian for the meantime, not the main event.", 800],
    ["And the freedom Christ bought was never permission to do whatever you want. It was permission to actually love your neighbor without keeping score.", 850],
    ["The fruit of the Spirit is not something you perform. It is what grows when you stop fighting the Spirit and start walking with it.", 850],
    ["Tomorrow, Galatians 6, then Ephesians 1 and 2. One letter ends with sowing and reaping. The next opens with who you were before Christ found you.", 850],
    ["For now, hold on to one list.", 750],
    ["Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.", 750],
    ["Against that, there is no law.", 1200],
  ],
};
