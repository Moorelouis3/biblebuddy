import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 171, written to the Day 1 standard.
 *
 * Psalms 127-129: three more Songs of Ascents, nineteen verses total. A
 * house and a city that only stand if God builds them, a home blessed
 * around a table, and a back that has been plowed like a field but never
 * broken. Five blocks, split by psalm the way Day 169 and Day 170 were.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 171,
  title: "Home, Labor, and Perseverance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 171. Yesterday ended with a sower carrying seed through tears.", 750],
    ["Today's three songs stay close to home. A house, a table, and a back that has taken real damage.", 800],
    ["One is about children. One is about a quiet family life. One is about surviving abuse without being destroyed by it.", 800],
    ["Three more Songs of Ascents, nineteen verses total.", 850],
    ["We are in Psalms 127, 128, and 129.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(127, 1, 5, [
      "Except the LORD build the house, they labour in vain that build it: except the LORD keep the city, the watchman waketh but in vain. This psalm is credited to Solomon, a man who built the temple and the walls of an entire city. He is the last person you would expect to say the builders are wasting their time.",
      "It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep. Not a case against working hard. A case against the anxious hustle that thinks staying up later is what actually holds things together.",
      "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward. The psalm turns from houses and cities to the smallest building project there is. A family.",
      "As arrows are in the hand of a mighty man; so are children of the youth. Happy is the man that hath his quiver full of them: they shall not be ashamed, but they shall speak with the enemies in the gate. Arrows are not decorations. They are aimed at something. Children raised well become defenders, not just dependents.",
    ]),
    g(128, 1, 3, [
      "Blessed is every one that feareth the LORD; that walketh in his ways. Psalm 127 said God has to build the house. This one describes what it looks like to actually live inside one He has built.",
      "For thou shalt eat the labour of thine hands: happy shalt thou be, and it shall be well with thee. A promise this plain sounds almost too small to be a blessing. That is the point. Ordinary, steady provision is the blessing.",
      "Thy wife shall be as a fruitful vine by the sides of thine house: thy children like olive plants round about thy table. Picture the actual scene. A vine growing up the wall, olive shoots ringed around a low table where everyone eats together.",
      "That image is doing the same work the arrows did in Psalm 127. Not sentiment. Fruitfulness and strength, growing in plain sight, right at the center of the home.",
    ]),
    g(128, 4, 6, [
      "Behold, that thus shall the man be blessed that feareth the LORD. Behold stops you. The psalm wants you to actually look at that family scene before moving on.",
      "The LORD shall bless thee out of Zion: and thou shalt see the good of Jerusalem all the days of thy life. The blessing does not stay inside the house. It reaches out from the city where God is worshiped, all the way back in.",
      "Yea, thou shalt see thy children's children, and peace upon Israel. The psalm ends by zooming out three generations, and then one more time to the whole nation. A quiet home turns out to be connected to everything else.",
      "This is the last purely happy note before the next song. Hold onto that table a moment longer.",
    ]),
    g(129, 1, 4, [
      "Many a time have they afflicted me from my youth, may Israel now say: many a time have they afflicted me from my youth: yet they have not prevailed against me. Said twice again, like Psalm 124 opened. This is a nation looking back at a long, repeated history of being attacked, not one bad season.",
      "The plowers plowed upon my back: they made long furrows. As direct an image of abuse as you will find in the Psalms. Not a bruise. Furrows, the kind a farmer cuts deep and long on purpose.",
      "The LORD is righteous: he hath cut asunder the cords of the wicked. Right after naming the wound, the song names who finally cut the ropes. Not a general comfort. A specific act, undoing what was done.",
      "This is a psalm for anyone whose scars are real and whose story is not over. Afflicted, and still standing, are both true at once.",
    ]),
    g(129, 5, 8, [
      "Let them all be confounded and turned back that hate Zion. The psalm turns from what was done to Israel to what will happen to those who did it. Not personal revenge. A request that cruelty stop winning.",
      "Let them be as the grass upon the housetops, which withereth afore it groweth up. Thin soil on a flat roof looks green for a moment and dies before it can be harvested. That is the kind of success this psalm wishes on injustice. Quick, and then nothing.",
      "Wherewith the mower filleth not his hand; nor he that bindeth sheaves his bosom. No harvest worth gathering. The image stays consistent to the end. Grass that never became a crop.",
      "Neither do they which go by say, The blessing of the LORD be upon you: we bless you in the name of the LORD. Real harvesters in that culture received a blessing from passersby. The wicked get no such blessing, because there is nothing there worth blessing.",
    ]),
  ],
  closing: [
    ["So that is Day 171.", 700],
    ["A house God has to build, a table ringed with children like olive plants, and a back plowed with furrows that never won.", 750],
    ["Psalm 127 says the anxious hustle is not what holds a home together. Rest is not laziness when God is the one building.", 800],
    ["Psalm 128 stays close to the ground. Bread you worked for, a family around your table. That is the blessing, not a bigger one waiting somewhere else.", 800],
    ["And Psalm 129 says something you do not hear often enough. You can be hurt, badly, for a long time, and still not be prevailed against.", 850],
    ["Tomorrow, Psalms 130 through 132. Someone crying out of the depths, and a promise David never stopped chasing.", 850],
    ["For now, hold on to the furrows.", 800],
    ["Real, and long, and deep.", 750],
    ["And still, they have not prevailed against me.", 1200],
  ],
};
