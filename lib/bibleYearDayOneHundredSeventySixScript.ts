import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 176, written to the Day 1 standard.
 *
 * Psalms 142-144: a cave prayer with no human refuge, a courtroom-style plea
 * for direction rather than justice, and a king's battle hymn that ends,
 * unexpectedly, on a quiet street with nobody complaining in it. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 176,
  title: "Refuge, Mercy, and Battle",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 176.", 650],
    ["Yesterday ended with a man alone in a cave, and a king asking to be taught how to fight.", 750],
    ["Today gives you both. Refuge when nobody else is looking, and a king who wants God's hand on his sword.", 800],
    ["It ends somewhere you would not expect. Not a throne. A quiet street with nobody complaining in it.", 800],
    ["We are in Psalms 142, 143, and 144.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(142, 1, 7, [
      "I cried unto the Lord with my voice. Not a quiet, composed prayer. Out loud, and poured out as a complaint.",
      "I looked on my right hand, and beheld, but there was no man that would know me: refuge failed me; no man cared for my soul. He says it plainly. Nobody was coming.",
      "Thou art my refuge and my portion in the land of the living. The refuge that failed among people is exactly the word he uses for God.",
      "Bring my soul out of prison, that I may praise thy name. He is still in the cave when he says this. The praise is planned before the rescue arrives.",
    ]),
    g(143, 1, 6, [
      "Enter not into judgment with thy servant: for in thy sight shall no man living be justified. He is not asking to be judged fairly. He knows what fair would cost him.",
      "The enemy hath smitten my life down to the ground; he hath made me to dwell in darkness, as those that have been long dead. My spirit is overwhelmed within me; my heart within me is desolate.",
      "I remember the days of old; I meditate on all thy works; I muse on the work of thy hands. When the present is dark, he goes back through what he already knows is true.",
      "I stretch forth my hands unto thee: my soul thirsteth after thee, as a thirsty land. Not a polished line. A body reaching, and ground that has cracked from lack of water.",
    ]),
    g(143, 7, 12, [
      "Cause me to hear thy lovingkindness in the morning; cause me to know the way wherein I should walk. He is not only asking to be pulled out. He is asking to be shown where to walk next.",
      "Teach me to do thy will; for thou art my God: thy spirit is good; lead me into the land of uprightness. The prayer shifts from rescue to being shaped.",
      "Quicken me, O Lord, for thy name's sake. The reason he gives for wanting to live is not his own comfort. It is God's name.",
      "Of thy mercy cut off mine enemies... for I am thy servant. The last word he leaves on the page for himself is not victim. It is servant.",
    ]),
    g(144, 1, 4, [
      "Blessed be the Lord my strength, which teacheth my hands to war, and my fingers to fight. This is a different voice than the last two psalms. A king, not a man in hiding.",
      "My goodness, and my fortress; my high tower, and my deliverer; my shield... who subdueth my people under me. Every title stacked on top of the last one, then the reason for all of it: rule that God gave him.",
      "Lord, what is man, that thou takest knowledge of him! In the middle of listing his own strength, he stops and asks why God bothers with someone this small.",
      "Man is like to vanity: his days are as a shadow that passeth away. He does not answer his own question. He just lets the size of God sit next to the shortness of a life, without smoothing it over.",
    ]),
    g(144, 5, 11, [
      "Bow thy heavens, O Lord, and come down: touch the mountains, and they shall smoke. Cast forth lightning, and scatter them. He is not asking for a quiet fix. He wants God to move visibly.",
      "Rid me, and deliver me... from the hand of strange children, whose mouth speaketh vanity, and their right hand is a right hand of falsehood. Name the actual danger. Not an army. Liars with a treaty in one hand and a knife in the other.",
      "I will sing a new song unto thee, O God. He starts writing the thank-you song before the rescue has happened.",
      "It is he that giveth salvation unto kings: who delivereth David his servant from the hurtful sword. Then he says the whole request again, almost word for word. Some prayers get said twice on purpose.",
    ]),
    g(144, 12, 15, [
      "That our sons may be as plants grown up in their youth; that our daughters may be as corner stones, polished after the similitude of a palace. The prayer moves from the battlefield to the next generation.",
      "That our garners may be full... that our sheep may bring forth thousands and ten thousands in our streets. Not a throne room. Full storehouses and a street with animals in it.",
      "That there be no breaking in, nor going out; that there be no complaining in our streets. This whole reading started with a man who had no refuge and nobody to care for his soul. It ends with a town where nobody has anything to complain about.",
      "Happy is that people, that is in such a case: yea, happy is that people, whose God is the Lord. That last line is what actually holds the cave and the palace together.",
    ]),
  ],
  closing: [
    ["So that is Day 176.", 700],
    ["A cave, a courtroom prayer, and a king's battle hymn that ends in a peaceful town.", 750],
    ["Psalm 142 has one man with no refuge among people, and a refuge in God instead.", 800],
    ["Psalm 143 turns from rescue to direction. Not just save me, but teach me the way to walk.", 800],
    ["Psalm 144 asks for a king's strength, admits how small a man really is, and asks anyway.", 850],
    ["And it lands somewhere strange for a war psalm. Full barns, strong oxen, and no complaining in the streets.", 850],
    ["Tomorrow, Psalms 145 through 147. Praise gets specific about who God actually is.", 850],
    ["For now, hold on to the last line of today's reading.", 800],
    ["Happy is that people, whose God is the Lord.", 1200],
  ],
};
