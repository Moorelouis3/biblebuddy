import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 27, written to the Day 1 standard.
 *
 * Exodus 21-24: the Ten Commandments worked out into daily law - servants,
 * injuries, theft, courts, rest, the promised land - and then the covenant
 * sealed in blood while seventy elders see God and eat. Six blocks, teaching
 * kept to four lines so a four-chapter day still lands in range.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 27,
  title: "The Covenant Law",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 27. The thunder from yesterday has stopped, but God is not finished talking.", 750],
    ["The Ten Commandments told Israel who not to be. Today tells them what that looks like on an ordinary day.", 800],
    ["Servants, injuries, a stolen ox, a widow's cry, a court case with a lying witness.", 800],
    ["This is what it means to belong to God when nobody is watching but Him.", 850],
    ["We are in Exodus 21 through 24. Law becomes life, and then the covenant gets sealed in blood.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(21, 1, 11, [
      "Right after the Ten Commandments, the very first law God gives is about servants. Not sacrifice, not worship. Servants.",
      "A Hebrew who sells himself into service goes free in the seventh year, no charge, no debt hanging over him. Israel just left slavery. God will not let them rebuild it.",
      "If a man loves his master and his family enough to stay, he can choose to, and they mark it by piercing his ear at the door. Even a servant's choice gets protected.",
      "And the law makes room for a vulnerable woman in that household too, so nobody with power gets to treat her like she does not count. God starts with the people easiest to ignore.",
    ]),
    g(21, 12, 36, [
      "The next laws are about violence. A man who kills on purpose cannot hide, even at God's own altar.",
      "But a man who kills by accident gets a place to run to. God builds a difference between a murderer and a man whose axe head flew off the handle.",
      "Eye for eye, tooth for tooth. That sounds harsh until you notice what it actually does. It caps the punishment. You cannot kill a man for knocking out your tooth.",
      "Even an ox that gores someone gets a hearing, and the owner is responsible if he knew it was dangerous and did nothing anyway. God will not let anyone say, that is just how things are.",
    ]),
    g(22, 1, 31, [
      "Steal an ox, pay back five. Steal a sheep, pay back four. The punishment for theft in Israel is not prison. It is repair.",
      "If your fire spreads and burns your neighbor's field, you pay for it. If you borrow an animal and it dies while the owner is not there, you pay for that too. Carelessness has a cost.",
      "Then the law turns and says the thing that sets Israel apart from every nation around it. Do not afflict the widow or the fatherless. If you do, and they cry to me, I will surely hear their cry.",
      "The God who heard Israel groaning in Egypt is now telling Israel to hear that same cry when it comes from someone weaker than them.",
    ]),
    g(23, 1, 19, [
      "Do not follow a crowd to do evil, and do not testify falsely just because everyone else is saying it. Truth does not get to lose a vote.",
      "Do not favor the poor man because he is poor, and do not favor the rich man because he pays. Justice is not supposed to bend either direction.",
      "If you see your enemy's donkey collapsed under its load, you help him lift it up. God will not let hatred turn into an excuse for cruelty.",
      "Then comes rest. The land rests every seventh year, the day rests every seventh turn. Even the ox and the stranger get to stop. Freedom that never rests is not really freedom.",
    ]),
    g(23, 20, 33, [
      "God says, Behold, I send an angel before thee, to keep thee in the way, and to bring thee into the place I have prepared.",
      "Beware of him, and obey his voice. My name is in him. Whoever this angel is, he carries God's own authority.",
      "God promises to clear the nations out ahead of them, but warns them hard. Do not bow to their gods. Do not let their gods stay in your land, lest they make you sin against me.",
      "And He says He will not do it all at once. Little by little, until Israel is strong enough to hold what is given. God's promises often come on a timeline you did not choose.",
    ]),
    g(24, 1, 18, [
      "Moses writes down every word God has spoken, builds an altar, and sets up twelve stone pillars, one for each tribe.",
      "He reads the covenant out loud, and the people answer together. All that the Lord hath said will we do, and be obedient. Then Moses takes the blood and throws it on the people. Behold the blood of the covenant.",
      "After that, Moses, Aaron, and seventy elders go up the mountain, and they see the God of Israel. Under His feet was something like a paved work of sapphire stone. And they did eat and drink.",
      "The God who thundered loud enough to shake the whole camp also let seventy men sit down and eat in front of Him. Then Moses goes higher still, into the cloud, for forty days and nights.",
    ]),
  ],
  closing: [
    ["So that is Day 27.", 700],
    ["Servants set free, an eye for an eye that actually limits violence, a stolen ox paid back fivefold, and a widow's cry God says He will hear.", 750],
    ["None of this is random. It is the Ten Commandments worked out into an ordinary day.", 800],
    ["Every law in these chapters answers one question. What does it look like to belong to a God who already rescued you?", 800],
    ["And then the blood. Moses throws it on the people and calls it the blood of the covenant. Write that phrase down.", 850],
    ["Centuries later, a man hands His friends a cup at a final meal and uses those same words.", 850],
    ["Tomorrow, Exodus 25 through 28. God starts giving instructions for a tent where He can actually live among them.", 850],
    ["For now, hold on to what seventy elders got to do on that mountain.", 800],
    ["They saw God.", 750],
    ["And they ate.", 1200],
  ],
};
