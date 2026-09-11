import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 170, written to the Day 1 standard.
 *
 * Psalms 124-126: three more Songs of Ascents, nineteen verses total. A bird
 * escaping a snare, a mountain that cannot be moved, and tears turning into
 * a harvest. Five blocks, split by psalm the way Day 169 split its three.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 170,
  title: "Rescue and Restoration",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 170. Yesterday's psalms ended with a servant watching a master's hand, waiting for mercy.", 750],
    ["Today opens with the answer to that kind of waiting. A trap that did not close in time.", 800],
    ["Then a mountain that will not move, and a captivity that turns into a harvest.", 800],
    ["Three more Songs of Ascents, nineteen verses total.", 850],
    ["We are in Psalms 124, 125, and 126.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(124, 1, 5, [
      "If it had not been the LORD who was on our side, now may Israel say. Said twice, almost word for word. This is a song that wants you to sit in the if before it moves on.",
      "If it had not been the LORD... when men rose up against us: then they had swallowed us up quick, when their wrath was kindled against us. Quick here means alive. Swallowed whole, while still breathing.",
      "Then the waters had overwhelmed us, the stream had gone over our soul. The danger gets described twice more, as a flood this time. Whatever actually happened, it felt like drowning.",
      "This whole psalm is written backward on purpose. It names the disaster that almost happened before it ever says what God actually did.",
    ]),
    g(124, 6, 8, [
      "Blessed be the LORD, who hath not given us as a prey to their teeth. Only now does the psalm turn to thanks, after four verses of what could have happened.",
      "Our soul is escaped as a bird out of the snare of the fowlers: the snare is broken, and we are escaped. This is the line from yesterday's tease. A trap set to catch a bird, and the bird gets out anyway.",
      "The snare is broken, and we are escaped. Not just opened. Broken. Whatever was hunting them cannot be reset and used again.",
      "Our help is in the name of the LORD, who made heaven and earth. The same closing line as Psalm 121. Two different songs, same one answer.",
    ]),
    g(125, 1, 5, [
      "They that trust in the LORD shall be as mount Zion, which cannot be removed, but abideth for ever. Not a feeling. A mountain. Something you could not move if you tried.",
      "As the mountains are round about Jerusalem, so the LORD is round about his people from henceforth even for ever. Picture the actual geography. Jerusalem sits in a ring of hills. That ring is the picture of God around His people.",
      "For the rod of the wicked shall not rest upon the lot of the righteous; lest the righteous put forth their hands unto iniquity. Even under pressure, that rod will not stay resting there. Long enough to make a good man start cutting corners just to survive it, and no longer.",
      "As for such as turn aside unto their crooked ways, the LORD shall lead them forth with the workers of iniquity: but peace shall be upon Israel. Two roads named at the end. Crooked ways lead somewhere. Trust leads somewhere else.",
    ]),
    g(126, 1, 3, [
      "When the LORD turned again the captivity of Zion, we were like them that dream. Not just relieved. Disoriented. Like waking up and needing a second to believe it is real.",
      "Then was our mouth filled with laughter, and our tongue with singing: then said they among the heathen, The LORD hath done great things for them. Even the watching nations noticed. The joy was loud enough to be seen from outside.",
      "The LORD hath done great things for us; whereof we are glad. They say it themselves this time, agreeing with what the nations already said about them.",
      "This is a short psalm about a long wait finally ending. Everything after this verse is about the waits that have not ended yet.",
    ]),
    g(126, 4, 6, [
      "Turn again our captivity, O LORD, as the streams in the south. The same word, captivity, used again, but now as a request instead of a memory. They know God has done it before. So they ask again.",
      "As the streams in the south is the Negev, a desert that stays dry for months and then floods without warning when the rain finally comes. That is the kind of turnaround they are asking for.",
      "They that sow in tears shall reap in joy. A farmer plants seed he needs to eat, trusting a harvest he cannot see yet. That is what grief looks like when it still has faith attached to it.",
      "He that goeth forth and weepeth, bearing precious seed, shall doubtless come again with rejoicing, bringing his sheaves with him. Doubtless. Not maybe. The one who kept sowing through the tears is the one who comes home carrying something.",
    ]),
  ],
  closing: [
    ["So that is Day 170.", 700],
    ["A bird out of a snare, a mountain that will not move, and tears that turn into a harvest.", 750],
    ["Psalm 124 spends four verses on what could have happened before it says one word of thanks.", 800],
    ["Psalm 125 says trust is not a feeling. It is something as solid as the hills around Jerusalem.", 800],
    ["And Psalm 126 remembers one deliverance while asking for another. That is what faith usually sounds like. Not certainty. Memory, doing the work certainty can't.", 850],
    ["Tomorrow, Psalms 127 through 129. A house God has to build, and a back that has been plowed like a field.", 850],
    ["For now, hold on to the sower.", 800],
    ["Weeping, but still carrying the seed.", 750],
    ["Doubtless coming home with the harvest.", 1200],
  ],
};
