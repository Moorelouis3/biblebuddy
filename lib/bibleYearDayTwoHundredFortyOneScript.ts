import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 241, written to the Day 1 standard.
 *
 * Now that the glory has left the building, Ezekiel is shown part of why:
 * prophets who saw nothing and said Peace anyway, elders who wanted a word
 * from God while still loyal to their idols, and a city that turns out to
 * have never been more than a vine branch. Six blocks across three
 * chapters (54 verses), no gaps.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 241,
  title: "False Prophets and Fruitless Vines",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 241. Yesterday the glory left the building. Today we find out part of why.", 750],
    ["Prophets who never saw a vision, and said God said it anyway.", 800],
    ["Elders who came to inquire of the Lord with idols already set up in their own hearts.", 800],
    ["And a picture of Jerusalem that has nothing to do with how strong the walls are.", 800],
    ["We are in Ezekiel 13 through 15.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(13, 1, 9, [
      "Woe unto the foolish prophets, that follow their own spirit, and have seen nothing! The charge is not wickedness dressed up as prophecy. It is men speaking with total confidence about a vision they never actually had.",
      "O Israel, thy prophets are like the foxes in the deserts. Foxes dig dens in loose sand for themselves. They never build anything that holds a wall together for anyone else.",
      "Ye have not gone up into the gaps, neither made up the hedge for the house of Israel to stand in the battle in the day of the Lord. A real prophet stands in the breach when trouble is coming. These men were never even near the wall.",
      "Behold, I am against you, saith the Lord God. Not indifferent to false comfort. Actively opposed to it, because it got people killed believing there was nothing left to prepare for.",
    ]),
    ez(13, 10, 16, [
      "Because they have seduced my people, saying, Peace; and there was no peace; and one built up a wall, and, lo, others daubed it with untempered morter. A flimsy wall gets plastered smooth so it looks finished. It was never actually going to hold.",
      "Say unto them which daub it with untempered morter, that it shall fall: there shall be an overflowing shower... and a stormy wind shall rend it. The first real weather, not even a siege yet, is enough to bring the whole thing down.",
      "Lo, when the wall is fallen, shall it not be said unto you, Where is the daubing wherewith ye have daubed it? Every reassurance these prophets gave becomes a question people ask standing in the rubble.",
      "The prophets of Israel... which see visions of peace for her, and there is no peace. The lie was never really about theology. It was telling people what they wanted to hear instead of what was actually coming.",
    ]),
    ez(13, 17, 23, [
      "Set thy face against the daughters of thy people, which prophesy out of their own heart. Not just male prophets running this. Women working the same con with a different set of props.",
      "Woe to the women that sew pillows to all armholes, and make kerchiefs upon the head of every stature to hunt souls! Charms and wrappings, sold to make people feel protected. The text calls it exactly what it is. Hunting.",
      "Will ye pollute me among my people for handfuls of barley and for pieces of bread, to slay the souls that should not die, and to save the souls alive that should not live? Scraps of food and a little status, in exchange for telling doomed people they are fine and frightened people they should be terrified.",
      "I will tear them from your arms, and will let the souls go, even the souls that ye hunt to make them fly. God pictures it like freeing trapped birds. The people were never props to be caught. They were souls to be let go.",
    ]),
    ez(14, 1, 11, [
      "Certain of the elders of Israel... sat before me. Son of man, these men have set up their idols in their heart... should I be enquired of at all by them? Men who came to ask God a question while still privately loyal to something else entirely.",
      "I the Lord will answer him that cometh according to the multitude of his idols... that I may take the house of Israel in their own heart. God's answer to a divided heart is to let it get exactly the counsel that heart deserves, not to be tricked by it, but to expose it.",
      "Repent, and turn yourselves from your idols; and turn away your faces from all your abominations. Before any of the consequences, the actual ask is still that simple. Turn around.",
      "If the prophet be deceived when he hath spoken a thing, I the Lord have deceived that prophet... the punishment of the prophet shall be even as the punishment of him that seeketh unto him. Asking a corrupted source for truth and getting a corrupted answer is not bad luck. Both sides answer for it.",
    ]),
    ez(14, 12, 23, [
      "When the land sinneth against me by trespassing grievously... though these three men, Noah, Daniel, and Job, were in it, they should deliver but their own souls by their righteousness. Three of the most righteous men in Scripture, and even they could not save the city by proxy. Righteousness was never transferable at that scale.",
      "Sword, and the famine, and the noisome beast, and the pestilence. Four ways this ends, named one at a time, so no one can say later they were not warned of the specifics.",
      "Yet, behold, therein shall be left a remnant that shall be brought forth, both sons and daughters... and ye shall be comforted concerning the evil that I have brought upon Jerusalem. The exiles will meet actual survivors and hear, firsthand, exactly how bad it was.",
      "Ye shall know that I have not done without cause all that I have done in it. The remnant's testimony is not there to console. It is there as evidence, so no one can call this arbitrary.",
    ]),
    ez(15, 1, 8, [
      "Son of man, what is the vine tree more than any tree, or than a branch which is among the trees of the forest? Shall wood be taken thereof to do any work? A vine is not lumber. Every other tree gets used for something. A vine only ever grows fruit or gets burned.",
      "Behold, when it was whole, it was meet for no work: how much less shall it be meet yet for any work, when the fire hath devoured it. Even healthy, a vine branch was never good for building. Scorched at both ends, it is not even good for that little.",
      "As the vine tree among the trees of the forest, which I have given to the fire for fuel, so will I give the inhabitants of Jerusalem. Jerusalem's whole value was always the fruit, the worship, the covenant life. Strip that away and there is nothing structural left to fall back on.",
      "They shall go out from one fire, and another fire shall devour them. Already singed by the first judgments and still not bearing fruit. What is coming is not a new problem. It is the same fire, finishing the job.",
    ]),
  ],
  closing: [
    ["So that is Day 241.", 700],
    ["Prophets who saw nothing and said Peace anyway. Women selling charms to hunt souls for a handful of barley.", 800],
    ["Elders who wanted a word from God while still privately loyal to their idols, and God answered them in a way that exposed exactly that.", 850],
    ["Noah, Daniel, and Job could not save the city by proxy. Righteousness was never something you could lend to someone else.", 850],
    ["But a remnant survives, on purpose, just so the exiles would have someone to hear the truth from firsthand.", 800],
    ["And Jerusalem, at the end of it, is just a vine branch. Never lumber. Only ever good for fruit or fire.", 850],
    ["Tomorrow, Ezekiel 16 through 18. The whole relationship gets told as one long, hard story.", 850],
    ["For now, sit with the vine.", 700],
    ["It was never meant to be strong. It was only ever meant to bear fruit.", 750],
    ["That was the part that was missing.", 1200],
  ],
};
