import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 206, written to the Day 1 standard.
 *
 * Isaiah 31-33 moves from a warning against trusting Egypt, through a vision
 * of a king who actually reigns in righteousness, to a city under threat that
 * God himself steps in to judge and to rule. Six blocks across three
 * chapters — 31 is short, so it stays whole; 32 and 33 split at their turn.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 206,
  title: "Woe, Rescue, and the Coming King",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 206.", 700],
    ["Yesterday ended with a nation that would not sit still and trust God. Today opens with exactly where that leads.", 800],
    ["Judah is looking at Egypt's horses and chariots instead of the Holy One of Israel. Isaiah has to say it plainly, twice, before this day is over.", 850],
    ["But in the middle of it, something breaks through. A king who actually reigns in righteousness. A city where the LORD himself is judge, lawgiver, and king.", 850],
    ["We are in Isaiah 31, 32, and 33.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(31, 1, 9, [
      "Woe to them that go down to Egypt for help, and stay on horses. They trust in chariots because they are many, but they look not unto the Holy One of Israel, neither seek the LORD. The problem is never that they are afraid. It is where they run with the fear.",
      "Isaiah's answer is sharp. The Egyptians are men, and not God, and their horses flesh, and not spirit. When the LORD stretches out his hand, both he that helps and he that is helped shall fail together. Borrowed strength cannot save anyone, because it was never strength that could stand on its own.",
      "Then the picture flips completely. As the lion roaring over its prey is not scared off by a crowd of shepherds shouting at it, so the LORD of hosts will come down to fight for mount Zion. As birds flying, so will the LORD of hosts defend Jerusalem, defending, delivering, passing over and preserving it.",
      "The chapter ends with Assyria falling, but not by a mighty man's sword. The same God who tells Judah to stop trusting Egypt is already planning to rescue them from the enemy they were so afraid of in the first place.",
    ]),
    g(32, 1, 8, [
      "Behold, a king shall reign in righteousness, and princes shall rule in judgment. After a whole book of failed kings and false securities, Isaiah finally names what real leadership looks like.",
      "That king becomes a hiding place from the wind, a covert from the tempest, rivers of water in a dry place, the shadow of a great rock in a weary land. Not a ruler who takes from his people. One who shelters them.",
      "Under him, the eyes of them that see shall not be dim, and the ears of them that hear shall hearken. The heart of the rash shall understand knowledge, and the stammerers shall speak plainly. Clarity itself becomes possible again.",
      "Then the contrast lands hard. The vile person will still speak villainy, work hypocrisy, utter error against the LORD, and make the hungry soul empty. The liberal deviseth liberal things. Two very different kinds of leadership sit side by side in eight verses.",
    ]),
    g(32, 9, 20, [
      "Isaiah turns straight at the women who are at ease, careless, confident that nothing will touch them. Many days and years shall ye be troubled, he warns, because the harvest will fail and the vintage will not come.",
      "Tremble, ye women that are at ease. Strip yourselves and gird sackcloth upon your loins. Upon the land of my people shall come up thorns and briers. Comfort built on nothing but not noticing danger yet is not real comfort.",
      "Then, without transition, everything turns. Until the spirit be poured upon us from on high, and the wilderness be a fruitful field. Judgment settles into the wilderness, righteousness into what was fruitful. And the work of righteousness shall be peace, and the effect of righteousness, quietness and assurance for ever.",
      "The chapter closes gently. My people shall dwell in a peaceable habitation, in sure dwellings, and in quiet resting places. Blessed are ye that sow beside all waters. Even after the warning, the last word here is rest, not fear.",
    ]),
    g(33, 1, 9, [
      "Woe to thee that spoilest, and thou wast not spoiled, and dealest treacherously, and they dealt not treacherously with thee. This is aimed at a betrayer who has gotten away with it so far. When thou shalt cease to spoil, thou shalt be spoiled.",
      "Right after that warning comes a prayer, not a threat. O LORD, be gracious unto us, we have waited for thee. Be thou their arm every morning, our salvation also in the time of trouble. Judgment on the oppressor and mercy for the waiting people sit in the same breath.",
      "Then the land itself grieves. The highways lie waste, the wayfaring man ceaseth. The earth mourneth and languisheth. Lebanon is ashamed and hewn down. Sharon is like a wilderness, and Bashan and Carmel shake off their fruits.",
      "This is not poetry for its own sake. War breaks more than armies. It breaks roads, travelers, farmland, and the ordinary rhythm of a whole country trying to live.",
    ]),
    g(33, 10, 16, [
      "Now will I rise, saith the LORD, now will I be exalted, now will I lift up myself. Ye shall conceive chaff, ye shall bring forth stubble. Your breath, as fire, shall devour you. Every scheme built on treachery eventually produces nothing but what it was made of.",
      "Then the fear turns inward. The sinners in Zion are afraid, fearfulness hath surprised the hypocrites. Who among us shall dwell with the devouring fire, who among us shall dwell with everlasting burnings. It is not only the foreign spoiler asking that question now.",
      "The answer is not about performance. He that walketh righteously, and speaketh uprightly, that despiseth the gain of oppressions, that shaketh his hands from holding bribes, that stoppeth his ears from hearing of blood, and shutteth his eyes from seeing evil.",
      "That person, Isaiah says, shall dwell on high, his place of defense the munitions of rocks. Bread shall be given him, his waters shall be sure. Not because he earned safety, but because that is simply what an honest life next to God looks like.",
    ]),
    g(33, 17, 24, [
      "Thine eyes shall see the king in his beauty, they shall behold the land that is very far off. After chapters of siege and threat, the promise turns to something worth actually seeing.",
      "Look upon Zion, the city of our solemnities. A quiet habitation, a tabernacle that shall not be taken down, not one of the stakes ever removed, not one cord broken. Whatever instability the rest of the book describes, this city is described as finally still.",
      "For the LORD is our judge, the LORD is our lawgiver, the LORD is our king, he will save us. Three offices, all filled by the same person. Nothing about how Judah is governed is left to guesswork or to another failed human ruler.",
      "The chapter ends almost tenderly. The inhabitant shall not say, I am sick. The people that dwell therein shall be forgiven their iniquity. The last word of this whole reading is not judgment. It is forgiveness.",
    ]),
  ],
  closing: [
    ["So that is Day 206.", 700],
    ["It opened with woe. A nation trusting Egypt's horses instead of God, a spoiler getting away with treachery, sinners in Zion afraid of a fire they finally noticed.", 800],
    ["And it kept turning toward rescue anyway. A lion defending Zion instead of destroying it. A king sheltering his people instead of taking from them. A city with every stake driven in for good.", 850],
    ["Notice what actually qualifies someone to stand in that city. Not standing that comes from strength or cleverness. Walking uprightly, refusing bribes, shutting your eyes to evil on purpose.", 800],
    ["And even then, the last line is not about earning it. The people that dwell therein shall be forgiven their iniquity.", 800],
    ["Tomorrow, Isaiah 34 through 36. A hard picture of judgment on the nations, then a sudden turn toward joy, then the first rumble of an army standing right outside Jerusalem's wall.", 850],
    ["For now, sit with what this king actually does with his power.", 800],
    ["A hiding place from the wind. A shadow in a weary land.", 800],
    ["That is who is coming.", 1200],
  ],
};
