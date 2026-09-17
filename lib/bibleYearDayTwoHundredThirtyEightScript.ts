import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 238, written to the Day 1 standard.
 *
 * Ezekiel stops describing the siege and starts performing it: a clay
 * model, a body pinned on its side for over a year, rationed bread baked
 * over dung, a shaved head divided three ways. Six blocks across three
 * chapters (48 verses), no gaps.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 238,
  title: "Signs of Jerusalem's Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 238. Yesterday Ezekiel saw the vision. Today God gives him the job.", 750],
    ["And it is not a sermon. It is street theater with his own body as the set.", 800],
    ["A clay model of Jerusalem under siege. Over a year lying on his side. Bread baked over dung, eaten in rationed bites.", 800],
    ["Then a razor to his own head, the hair divided three ways, each part meeting a different end.", 800],
    ["We are in Ezekiel 4 through 6.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(4, 1, 8, [
      "Take thee a tile, and lay it before thee, and pourtray upon it the city, even Jerusalem. God has Ezekiel build a model siege out of a clay tablet before anyone in Jerusalem believes a siege is coming.",
      "Fort, mount, camp, battering rams round about - every piece of siegecraft, in miniature, on a tile on the floor of an exile's house in Babylon.",
      "Then it stops being a model. Lie thou also upon thy left side, and lay the iniquity of the house of Israel upon it. Three hundred and ninety days on one side, forty more on the other. Ezekiel's own body becomes the sign, not just his hands.",
      "I will lay bands upon thee, and thou shalt not turn thee from one side to another. This is not a quick object lesson. It is over a year of a man pinned in place so a message can be seen instead of just heard.",
    ]),
    ez(4, 9, 17, [
      "Wheat, barley, beans, lentiles, millet, fitches, one vessel, one loaf - whatever is left when nothing is enough on its own gets thrown together, because that is what siege food actually looks like.",
      "Twenty shekels of bread a day, a sixth of a hin of water, measured out and eaten from time to time. Ezekiel does not just describe scarcity. He lives on it in front of people who can watch him shrink.",
      "Thou shalt bake it with dung that cometh out of man, in their sight. When Ezekiel objects - my soul hath not been polluted, no abominable flesh came into my mouth - God relents to cow's dung instead. Even here, there is a line God will move for him.",
      "I will break the staff of bread in Jerusalem, and they shall eat bread by weight, and with care. The sign is not cruelty for its own sake. It is Jerusalem's real future, acted out early enough that someone might still turn.",
    ]),
    ez(5, 1, 4, [
      "Take thee a sharp knife, take thee a barber's razor, and cause it to pass upon thine head and upon thy beard. In that world a shaved head and beard is public grief and public shame at once. Ezekiel does it to himself, on command.",
      "Then take thee balances to weigh, and divide the hair. Not thrown away carelessly. Weighed out, deliberate, into three exact portions - because what happens to each portion is the actual message.",
      "A third burned in the midst of the city, a third struck with a knife round about, a third scattered in the wind with a sword drawn out after it. Fire, sword, and exile - the three ways Jerusalem's people are about to leave this world or this land.",
      "Take thereof a few in number, and bind them in thy skirts. A remnant, kept close, spared even from the thirds. Before judgment falls, God has already made room for who survives it.",
    ]),
    ez(5, 5, 12, [
      "This is Jerusalem: I have set it in the midst of the nations. God names the city plainly, so no one listening can pretend the model tile means somewhere else.",
      "She hath changed my judgments into wickedness more than the nations round about her. The charge is not just sin. It is sin worse than the pagan nations she was supposed to be different from.",
      "Because ye multiplied more than the nations... and have not walked in my statutes. More privilege, less obedience. The city that had the most reason to know better did the least with it.",
      "The fathers shall eat the sons, and the sons shall eat their fathers. God does not soften what siege actually does to people. This is Scripture refusing to look away from its own horror.",
    ]),
    ez(5, 13, 17, [
      "Mine anger shall be accomplished, and I will cause my fury to rest upon them, and I will be comforted. Strange word for God to use here - comforted - as if the judgment itself is not appetite but resolution.",
      "I will make thee waste, and a reproach among the nations round about thee, in the sight of all that pass by. The fall of Jerusalem will not happen quietly. It will happen where everyone can see it.",
      "So will I send upon you famine and evil beasts, and they shall bereave thee: and pestilence and blood shall pass through thee. Sword, famine, plague, wild animals - every category of ancient disaster named in one verse, none of them left out.",
      "I the Lord have spoken it. Twice in this chapter alone. Whatever else the vision has been - wheels, wings, a scroll, a razor - the point of all of it is that this word is not Ezekiel's. It is God's, said plainly, and it will hold.",
    ]),
    ez(6, 1, 14, [
      "Son of man, set thy face toward the mountains of Israel, and prophesy against them. The target widens. Not just the city now. Every hill and valley where the land itself has hosted the worship of something else.",
      "I will destroy your high places... and I will cast down your slain men before your idols. The judgment lands exactly where the sin happened - the altars people built to feel safe become the place they fall.",
      "Yet will I leave a remnant, that ye may have some that shall escape the sword among the nations. In the middle of total desolation, God repeats the same promise from the razor scene. Judgment this complete still is not the end of the story.",
      "They shall lothe themselves for the evils which they have committed. Not just punished - eventually sick of what they did, once every idol they trusted has failed to save them from any of it.",
    ]),
  ],
  closing: [
    ["So that is Day 238.", 700],
    ["A model city on a tile. A body pinned on its side for over a year. Bread measured out like a countdown.", 800],
    ["Ezekiel does not just tell Jerusalem what is coming. He becomes the sign so they can watch it happen small before it happens for real.", 850],
    ["Even God baking cruelty into the sign has a limit - He moves on the dung when Ezekiel pushes back. This is exact judgment, not careless judgment.", 850],
    ["And twice in one chapter, the same line: I the Lord have spoken it. Whatever else is happening, that is the ground none of this moves off of.", 800],
    ["Even in total desolation, God keeps naming a remnant before the desolation lands. The end of the chapter is never just the end.", 800],
    ["Tomorrow, Ezekiel 7 through 9. The end Ezekiel has been acting out finally has a date on it.", 850],
    ["For now, sit with the razor and the thirds.", 750],
    ["Take thereof a few in number, and bind them in thy skirts.", 800],
    ["Before judgment fell, God had already made room for who would carry the story forward.", 1200],
  ],
};
