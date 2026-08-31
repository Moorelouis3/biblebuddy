import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 57, written to the Day 1 standard.
 *
 * Joshua 4-7 covers the twelve memorial stones at the Jordan and at Gilgal,
 * the circumcision and Passover that reset Israel as a covenant people on
 * enemy soil, the captain of the LORD's host meeting Joshua outside Jericho,
 * the fall of Jericho itself, and Achan's hidden theft that costs Israel the
 * next battle at Ai. Six blocks across the four chapters, matching the shape
 * Day 56 used for the Deuteronomy-to-Joshua turn.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 57,
  title: "Memorial Stones, Jericho, and Achan",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 57. Israel just crossed a riverbed that should have drowned them.", 750],
    ["Today they stop and build a memorial before they do anything else.", 800],
    ["Then a wall falls down without a single sword swung at it.", 800],
    ["And right after that win, a hidden theft costs them the next one.", 900],
    ["We are in Joshua 4 through 7. Two memorials, a fallen wall, and a hidden sin.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(4, 1, 14, [
      "The whole nation is standing in a dry riverbed at flood stage, and the water is piled up somewhere out of sight, upstream.",
      "God tells Joshua to send one man from each tribe back into the middle of the river, where the priests are still standing with the ark, and carry out a stone. Twelve stones for twelve tribes.",
      "Joshua also sets up twelve stones in the riverbed itself, right where the priests' feet stood, buried under water that will cover them again the moment everyone is across.",
      "Forty thousand men cross armed for war, and the text says the LORD magnified Joshua that day, the way He had magnified Moses. Same kind of day. New man.",
    ]),
    josh(4, 15, 24, [
      "The priests finally step out, and the moment their feet clear the riverbed, the Jordan goes back to flooding exactly as it was before anyone touched it.",
      "Joshua sets the twelve stones up at Gilgal, on dry land this time, where people will actually walk past them for generations.",
      "And he tells them exactly why. When your children ask tomorrow what these stones mean, tell them the LORD dried up the Jordan the same way He dried up the Red Sea.",
      "The point was never the stones. It was that all the peoples of the earth would know the hand of the LORD is mighty, and that this generation would fear Him for the rest of their lives.",
    ]),
    josh(5, 1, 12, [
      "Every king west of the Jordan hears the water stopped for Israel, and their hearts melt, and there is no more spirit left in them. Fear does the work an army would have had to do.",
      "Before anything else happens, Joshua circumcises the whole generation born in the wilderness. Not military prep. Covenant, done first, on ground that is still technically enemy territory.",
      "God says, this day have I rolled away the reproach of Egypt from off you. That is why they name the place Gilgal. It sounds like the word for rolled.",
      "They keep Passover at Gilgal, eat the produce of the land, and the manna simply stops the next morning. Forty years of daily bread ends the moment it is no longer needed.",
    ]),
    josh(5, 13, 15, [
      "Joshua looks up near Jericho and sees a man with a drawn sword, and asks whose side he's on. The answer is not yours or theirs. Nay, but as captain of the host of the LORD am I now come.",
      "Joshua falls on his face and asks what his lord wants to say to his servant. He does not get a battle plan. He gets, loose thy shoe from off thy foot, for the place whereon thou standest is holy. The same words told to Moses at the burning bush.",
    ]),
    josh(6, 1, 5, [
      "Jericho, meanwhile, is shut up tight. Nobody goes out, nobody comes in, because of the children of Israel. The city is already afraid before a single soldier appears at the wall.",
      "And God's plan for taking it has no weapons in it at all. March around the city once a day for six days, seven priests carrying rams' horn trumpets, the ark in the middle. That is the whole strategy.",
    ]),
    josh(6, 6, 27, [
      "For six days Israel marches around Jericho in silence except for the trumpets, and nothing happens. Day after day, the same slow lap around a city that is watching them do it.",
      "On the seventh day they march around seven times, and then Joshua gives one order. Shout, for the LORD hath given you the city. The wall falls down flat, and the people go straight in.",
      "Rahab and everyone in her house are pulled out safe, exactly as promised, because she hid two spies and believed before there was any reason to. Everything else is destroyed, and the silver and gold go into the treasury of the LORD's house, not into anyone's pocket.",
      "Joshua puts a curse on whoever rebuilds Jericho, and then the chapter ends with one quiet, ominous line. The children of Israel committed a trespass in the accursed thing. Something has already gone wrong, and the reader knows it before Joshua does.",
    ]),
    josh(7, 1, 26, [
      "Israel sends a small force up against tiny Ai expecting an easy win, and thirty-six men die running from a town they should have flattened. Joshua tears his clothes and falls on his face in front of the ark, asking why God brought them across the Jordan just to hand them to the Amorites.",
      "God's answer is blunt. Get up. Israel has sinned, taken the accursed thing, stolen it, lied about it, and hidden it with their own belongings. One man's theft has become the whole camp's problem.",
      "Lots are cast, tribe by tribe, family by family, until one man is left standing. Achan, of Judah. He confesses exactly what he did. Saw a Babylonish robe, two hundred shekels of silver, a wedge of gold, coveted them, took them, buried them under the floor of his own tent.",
      "Achan and everything tied to him are taken to a valley outside Gilgal and destroyed there, and the place is renamed Achor, meaning trouble. Then the fierce anger of the LORD turns away, and Israel is ready to fight again.",
    ]),
  ],
  closing: [
    ["So that is Day 57.", 700],
    ["Two memorials, a fallen wall, and a hidden sin.", 700],
    ["The stones at Gilgal were never really about the stones. They were so a kid years later would ask a question and get a true answer.", 800],
    ["Jericho fell the same way the Jordan stopped. By walking straight at something impossible until God moved it, not by fighting for it.", 800],
    ["And then Achan shows you the other side. One man, one buried robe, one bag of silver, and the whole camp pays for it until it is dealt with.", 850],
    ["Sin here is not private. What Achan did in the dark reached thirty-six families before anyone even knew his name.", 850],
    ["Tomorrow, Joshua 8 through 11. Israel goes back to Ai and finishes what it started, and the conquest keeps moving.", 850],
    ["For now, sit with the captain of the LORD's host.", 800],
    ["He did not come to take a side.", 750],
    ["He came to take command.", 1200],
  ],
};
