import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 35, written to the Day 1 standard.
 *
 * Leviticus 13-16: the longest, strangest stretch of the book so far - a
 * manual for diagnosing skin disease, a ritual for welcoming the healed back
 * in, rules for ordinary bodily life, and then the one day a year the whole
 * system points toward. Seven blocks, one per natural unit.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 35,
  title: "The Day of Atonement",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 35. This is the longest stretch of rules yet, and the most physical.", 800],
    ["Skin disease. Mildew in a garment or a wall. What your body does on an ordinary day.", 800],
    ["It reads small. It is not small. It is a whole nation being taught to notice what is wrong before it spreads.", 850],
    ["And then the chapter that all of it was pointing toward. One day a year, one man, behind one curtain.", 850],
    ["We are in Leviticus 13 through 16.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 17, [
      "A rising, a scab, a bright spot. Any of it shows up on someone's skin, and they don't self-diagnose. They go to the priest.",
      "The priest doesn't guess. He looks, and if it's not clear yet, he shuts the person up for seven days and looks again. Sometimes seven more after that.",
      "Nobody gets labeled unclean on a hunch. But nobody gets waved through on a hunch either. The waiting is part of the mercy.",
      "And here's the strange line at the end of this section. If the disease covers the entire body, head to foot, the person is clean. Total, visible, undeniable is somehow less frightening than a spot still spreading in secret.",
    ]),
    g(13, 18, 46, [
      "The same process runs again for a boil that never fully healed, and again for a burn. Different cause, same question. Is this spreading, or is this settled.",
      "Then it moves to the scalp and the beard, and finally to a bald head, because disease doesn't ask where hair does or doesn't grow.",
      "And then the verse that turns this from procedure into a life sentence. The leper's clothes get torn, his head goes bare, and he has to cover his lip and cry out, unclean, unclean, so no one gets close by accident.",
      "He lives outside the camp, alone, for as long as the disease stays on him. Not punishment. Protection for everyone else. But try sitting inside that sentence for a minute. Alone is the whole diagnosis.",
    ]),
    g(13, 47, 59, [
      "Then the same watching eye turns to fabric. Wool, linen, leather, anything with a greenish or reddish streak that won't wash out.",
      "Same rhythm as the skin. Shut it up seven days, look again. If it spreads, burn it. If it fades after washing, cut the spot out and keep the rest.",
      "It sounds excessive for cloth. But the point was never really the cloth. Israel was learning to treat corruption the same way whether it showed up on a person or a shirt. Watch it, name it, deal with it before it spreads.",
      "This is the law of leprosy, the text says, closing the section. Not a superstition about mildew. A law, given the same weight as the offerings.",
    ]),
    g(14, 1, 32, [
      "Now the mood flips. This is the law of the leper in the day of his cleansing. Someone got well, and the book slows down to celebrate it properly.",
      "Two birds. One is killed over running water. The other is dipped in its blood along with cedar wood, scarlet thread, and hyssop, then let loose into the open field. One life given, one set free.",
      "On the eighth day, blood goes on the man's right ear, right thumb, right big toe. Everything he hears, everything he does, everywhere he walks, marked as brought back under God on purpose.",
      "And if he's poor and can't afford the standard offering, the law says so plainly. Two birds instead of a lamb. Same atonement, same welcome home, priced for whoever is asking.",
    ]),
    g(14, 33, 57, [
      "Then the law reaches somewhere stranger still. A house, once Israel is settled in the land, can have the same plague. Greenish or reddish streaks eating into the walls.",
      "The owner doesn't hide it. He goes and tells the priest, it seems to me there is a plague in my house. Before the priest even confirms it, the man names the possibility out loud.",
      "If it's spreading, the stones get pulled out and dumped outside the city, the house gets scraped down to bare wall, replastered. If it comes back anyway, the whole house comes down.",
      "A home isn't sacred just because you live in it. If corruption gets into the structure, tearing it down is mercy, not loss.",
    ]),
    g(15, 1, 33, [
      "This chapter is the most ordinary one in the whole book. Bodily discharges, a man's or a woman's, the kind every human body produces at some point.",
      "None of it is called sin anywhere in this text. It's called unclean, and uncleanness has a process. Wash, wait until evening, and for the longer cases, offer two birds on the eighth day.",
      "Even a monthly cycle, even the ordinary meeting of a husband and wife, shows up here, matter-of-fact, with its own short waiting period. Nothing about being human is treated as shameful. It's just treated as real.",
      "And then the reason, stated flat out. So they will not die in their uncleanness by defiling my tabernacle that is among them. God's presence was camped in the middle of an ordinary, bleeding, sweating, aging people. The rules exist so that closeness stays possible.",
    ]),
    g(16, 1, 34, [
      "The chapter opens with a reminder nobody needed. This comes right after the death of the two sons of Aaron, who offered fire the LORD had not commanded.",
      "So God tells Aaron plainly, don't come into the holy place whenever you feel like it, or you'll die the same way they did. Access to God was never casual, not even for the high priest.",
      "One day a year he goes in. First a bull for his own sin, because even the man making atonement needs it made for him first. Then two goats, chosen by lot. One is sacrificed. Its blood goes on the mercy seat itself.",
      "The other goat, still alive, gets both of Aaron's hands pressed onto its head while he confesses every sin of the whole nation out loud. Then it's led out into the wilderness and let go, carrying all of it away where no one will ever see it again.",
    ]),
  ],
  closing: [
    ["So that is Day 35.", 700],
    ["Skin, cloth, houses, ordinary bodies. All of it watched, all of it capable of being made clean again.", 800],
    ["The leper who had to cry unclean, unclean is the same book that later hands a poor man two birds instead of a lamb so cleansing never depends on what he can afford.", 850],
    ["And then the one day it was all leading to. A goat that dies, and a goat that walks away carrying what nobody wanted to look at anymore.", 850],
    ["That second goat has a name most Bibles keep in the margin. Scapegoat. Sin, sent somewhere it will never come back from.", 800],
    ["Once a year was never going to be enough. Aaron had to walk back through that curtain every single year for the rest of his life.", 800],
    ["Tomorrow, Leviticus 17 through 20. What holy living looks like once the ceremony is over and real life starts again.", 850],
    ["For now, sit with the goat in the wilderness.", 800],
    ["Carrying it away.", 700],
    ["Somewhere you will never have to see it again.", 1200],
  ],
};
