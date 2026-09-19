import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 322, written to the Day 1 standard.
 *
 * Eleven chapters of doctrine land here as instruction: the living sacrifice,
 * love without hypocrisy, submission to authority, and the call to stop
 * judging a brother over disputable things. Six blocks across Romans 12-14.
 */

const romansTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 12:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const romansThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 13:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

const romansFourteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 14:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 14,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 322,
  title: "Living Sacrifices and Love",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 322.", 700],
    ["Paul just spent eleven chapters explaining what God has done.", 750],
    ["Now he turns a corner. Therefore. Here's what to do with it.", 800],
    ["A body laid down instead of an animal. Love with no pretending. A government you didn't choose. A brother you keep judging over dinner.", 850],
    ["It's the most practical stretch of the letter, and it starts with your own body on the altar.", 850],
    ["We are in Romans 12, 13, and 14.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    romansTwelve(1, 8, [
      "Paul opens with I beseech you, by the mercies of God. Not a command from a distance. A plea, built on everything he just spent eleven chapters proving.",
      "Present your bodies a living sacrifice, holy, acceptable unto God. The old sacrifices died on the altar. This one stays alive, and keeps offering itself, every day.",
      "Be not conformed to this world, but be transformed by the renewing of your mind. Not gritting your teeth harder. A mind made new, so you actually want something different.",
      "Then he lists gifts scattered across the body. Prophecy, ministry, teaching, exhorting, giving, ruling, showing mercy. Nobody gets all of them. Nobody is left with none.",
    ]),
    romansTwelve(9, 21, [
      "Let love be without dissimulation. No performance. Abhor what is evil, cleave to what is good, and mean both.",
      "Rejoicing in hope, patient in tribulation, continuing instant in prayer. Three postures for a life that doesn't get easy.",
      "Bless them which persecute you. Bless, and curse not. Recompense to no man evil for evil. This isn't about people who are hard to like. It's about people who are hurting you.",
      "If thine enemy hunger, feed him. Be not overcome of evil, but overcome evil with good. Not passive. An active move, aimed at the person who least deserves it.",
    ]),
    romansThirteen(1, 7, [
      "Let every soul be subject unto the higher powers. For there is no power but of God. Paul writes this under an empire that will eventually kill him. He still says it.",
      "Whoever resists the authority resists what God has ordained, and will bring judgment on himself. Government, for Paul, isn't an accident. It's a tool, even in the hands of people who don't know God.",
      "Rulers are not a terror to good works, but to evil. Do good, and you'll have praise from it. He's not describing every government that has ever existed. He's describing what the office is for.",
      "Render to all their dues. Tribute, custom, fear, honor, to whom they're owed. Pay what you owe. Simple, and harder than it sounds.",
    ]),
    romansThirteen(8, 14, [
      "Owe no man any thing, but to love one another. The one debt you never finish paying off.",
      "He loveth another hath fulfilled the law. Then he runs through the commandments, adultery, killing, stealing, coveting, and says love does no harm to a neighbor. Love is the fulfilling of the law.",
      "The night is far spent, the day is at hand. Let us cast off the works of darkness, and put on the armor of light. He's telling them what time it is, not just what to do.",
      "Put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof. Don't leave the door open for the old life and expect it to stay shut.",
    ]),
    romansFourteen(1, 12, [
      "Him that is weak in the faith receive ye, but not to doubtful disputations. He starts with a real conflict in the church. Some ate meat freely. Some, out of conscience, ate only vegetables.",
      "Let not him that eateth despise him that eateth not, and let not him which eateth not judge him that eateth. Neither side gets to look down on the other.",
      "One man esteemeth one day above another. Another esteemeth every day alike. Let every man be fully persuaded in his own mind. This isn't Paul settling the question. It's Paul telling them the question isn't the point.",
      "None of us liveth to himself, and no man dieth to himself. Whether we live or die, we are the Lord's. Why dost thou judge thy brother? We shall all stand before the judgment seat of Christ. That's His job, not yours.",
    ]),
    romansFourteen(13, 23, [
      "Let us not therefore judge one another any more, but judge this rather, that no man put a stumblingblock in his brother's way. The one judgment call you do get to make is about your own effect on someone else.",
      "For the kingdom of God is not meat and drink, but righteousness, and peace, and joy in the Holy Ghost. He keeps pulling them back to what actually matters, away from what's on the plate.",
      "It is good neither to eat flesh, nor drink wine, nor any thing whereby thy brother stumbleth. Your freedom is real. It's still not worth more than his conscience.",
      "Happy is he that condemneth not himself in that thing which he alloweth. And then the line underneath the whole chapter. Whatsoever is not of faith is sin. Not every gray area is the same for every person.",
    ]),
  ],
  closing: [
    ["So that is Day 322.", 700],
    ["A living sacrifice, a mind made new, love with no performance in it.", 800],
    ["An empire to live under, a debt of love that never closes out, and a brother you don't get to judge over what he eats.", 800],
    ["Notice where Paul starts all of it. Not with rules. With mercy. Therefore, by the mercies of God.", 850],
    ["Everything in these three chapters is a response, not a bill coming due.", 800],
    ["Tomorrow, Romans 15 and 16, then into First Corinthians. Paul closes one letter and opens another to a church that can't stop fighting.", 850],
    ["For now, sit with the line about the day and the night.", 750],
    ["The night is far spent.", 750],
    ["The day is at hand.", 1200],
  ],
};
