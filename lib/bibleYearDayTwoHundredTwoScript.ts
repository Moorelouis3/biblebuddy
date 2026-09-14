import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 202, written to the Day 1 standard.
 *
 * Isaiah 19-21 moves outward from Judah: Egypt's judgment turns into an
 * unexpected mercy, Isaiah becomes a living sign for three years, and a
 * watchman finally gets to announce Babylon's fall. Five blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 202,
  title: "Egypt, Babylon, and Trust",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 202.", 700],
    ["Today the prophecy leaves Judah's own borders and goes out into the nations around it.", 750],
    ["Egypt first. Then a strange sign Isaiah has to wear on his own body for three years.", 800],
    ["Then Babylon, watched from a tower until the report finally comes.", 800],
    ["And two smaller nations, easy to skip past, that still get their own word from God.", 850],
    ["We are in Isaiah 19, 20, and 21.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 15, [
      "God is coming into Egypt riding on a swift cloud, and the first thing that happens is the idols of Egypt shake at his presence. Not the army first. The gods first.",
      "Then the description turns specific and brutal. Brother against brother, city against city, kingdom against kingdom. A nation famous for order tears itself apart from the inside.",
      "The Nile fails. Fishermen mourn. Weavers lose their work. Egypt built its whole life on that one river, and Isaiah shows what happens when the thing you built your life on dries up.",
      "And the wise men Pharaoh paid to be clever have nothing to say. Isaiah asks it straight out: where are your wise men now? Let them tell you what the Lord of hosts has planned. They can't.",
    ]),
    g(19, 16, 25, [
      "Egypt shakes with fear just at the mention of Judah, because of what the Lord has determined against it. That is where this chapter seems headed the whole way through.",
      "Then, starting at verse eighteen, something nobody would have expected. Cities inside Egypt start speaking the language of Canaan and swearing loyalty to the Lord. An altar goes up in the middle of Egypt.",
      "A highway opens between Egypt and Assyria. Two empires that spent generations trying to destroy each other, now traveling back and forth to worship the same God.",
      "And then the line that is the whole point of the chapter. Blessed be Egypt my people, and Assyria the work of my hands, and Israel mine inheritance. Egypt gets called my people. Nobody outside Israel had ever heard that word used on them before.",
    ]),
    g(20, 1, 6, [
      "God tells Isaiah to strip off his sackcloth and his sandals and walk around like that. Not for a day. For three years.",
      "This is not a story Isaiah is telling. He is living it, in public, the whole time, as a sign of what is about to happen to Egypt and Ethiopia when Assyria conquers them.",
      "Verse four says exactly what that means: prisoners marched off naked and barefoot, even with their buttocks uncovered, to the shame of Egypt. Isaiah's own body became the preview.",
      "And verse five is the actual point. The people who were counting on Egypt for help say, how shall we escape? They find out the hard way who they should have trusted.",
    ]),
    g(21, 1, 10, [
      "Isaiah calls this one the burden of the desert of the sea, a strange name for a vision about Babylon, and he says it hit him like labor pains. This one costs him something to see.",
      "God tells him to set a watchman and report what he sees. So a man stands on a tower, watching the horizon, day and night.",
      "Chariots finally appear, and the watchman shouts the word he was given to say. Babylon is fallen, is fallen, and all the graven images of her gods he hath broken unto the ground. Said twice. That is not decoration. That is certainty.",
      "Then Isaiah turns straight to his own people. O my threshing, and the corn of my floor. What I have heard from the Lord, I am telling you. He does not sit on the vision. He threshes it out for them.",
    ]),
    g(21, 11, 17, [
      "A voice calls out of Seir, watchman, what of the night, watchman, what of the night. Asked twice, like someone who cannot sleep.",
      "The answer is strange and honest. The morning cometh, and also the night. Relief is coming. So is more darkness. Both, not just one.",
      "Then the burden of Arabia: refugees running from war, and the text stops to notice something small. People bringing water and bread to the ones who are thirsty and fleeing. Kindness, right in the middle of a chapter about collapse.",
      "And the last oracle sets an actual deadline. Within a year, exactly like a hired man counts his year, Kedar's glory will be gone. God's timing here is not vague. It has a clock on it.",
    ]),
  ],
  closing: [
    ["So that is Day 202.", 700],
    ["Egypt torn apart and then somehow called God's people. Isaiah walking barefoot for three years as a living warning. Babylon's fall, watched for and finally announced. And two small nations that still mattered enough to name.", 800],
    ["Notice where trust kept failing today. Egypt trusted its river. The coastal nations trusted Egypt. Neither one held.", 800],
    ["But notice too where God's reach went further than expected. Blessed be Egypt my people. Nobody in Isaiah's audience expected to hear that sentence.", 850],
    ["Isaiah did not just deliver this message. He wore it. Three years of his own body being the sign.", 850],
    ["Tomorrow, Isaiah 22 through 24. Jerusalem itself comes under that same kind of scrutiny.", 850],
    ["For now, sit with the watchman's line.", 800],
    ["Watchman, what of the night?", 750],
    ["The morning comes. So does the night. Both are true, and you are told anyway.", 1200],
  ],
};
