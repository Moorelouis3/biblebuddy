import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 253, written to the Day 1 standard.
 *
 * Daniel 1-3: we leave Ezekiel behind and open Daniel. Four teenagers get
 * dragged to Babylon and refuse to be reprogrammed one bite at a time, a
 * king's forgotten dream nearly gets every wise man in the empire killed,
 * and a gold statue in a field turns into the furnace three of them walk
 * out of untouched. Six blocks, two per chapter, matching Day 251-252's
 * pattern.
 */

const dan = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Daniel ${chapter}:${startVerse}-${endVerse}`,
  book: "daniel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 253,
  title: "Faithfulness in Babylon",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 253. We leave Ezekiel behind today. Daniel starts now.", 750],
    ["Four teenagers get taken from Jerusalem, renamed, and put through years of Babylonian reprogramming.", 800],
    ["One of them decides, on the very first page, exactly what he will and will not let them take.", 800],
    ["By the end of today a king forgets his own dream and a gold statue turns into a furnace three men just walk out of.", 850],
    ["We are in Daniel 1 through 3.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    dan(1, 1, 16, [
      "In the third year of the reign of Jehoiakim king of Judah came Nebuchadnezzar king of Babylon unto Jerusalem, and besieged it. This is the exile Ezekiel already showed you from the inside. Here is where it started.",
      "Children in whom was no blemish, but well favoured, and skilful in all wisdom... whom they might teach the learning and the tongue of the Chaldeans. Babylon is not just taking hostages. It is trying to make new Babylonians out of them, one class at a time.",
      "Daniel purposed in his heart that he would not defile himself with the portion of the king's meat, nor with the wine which he drank... he requested... that he might not defile himself. He does not fight the whole exile. He picks one line, and he holds it.",
      "Let them give us pulse to eat, and water to drink... at the end of ten days their countenances appeared fairer and fatter in flesh than all the children which did eat the portion of the king's meat. He asked for a test, not a rescue. And the test was enough.",
    ]),
    dan(1, 17, 21, [
      "As for these four children, God gave them knowledge and skill in all learning and wisdom: and Daniel had understanding in all visions and dreams. Every bit of it is named as a gift, not a personal achievement.",
      "Among them all was found none like Daniel, Hananiah, Mishael, and Azariah: therefore stood they before the king. The boys who ate vegetables are the ones standing in front of Nebuchadnezzar.",
      "He found them ten times better than all the magicians and astrologers that were in all his realm. They do not just survive Babylon's system. They outperform it, on its own terms.",
      "And Daniel continued even unto the first year of king Cyrus. He is still standing when the whole empire that dragged him there is gone.",
    ]),
    dan(2, 1, 23, [
      "Nebuchadnezzar dreamed dreams, wherewith his spirit was troubled... tell thy servants the dream, and we will shew the interpretation. The dream is gone from him, and he demands the wise men recover it before they even try to explain it.",
      "There is not a man upon the earth that can shew the king's matter... except the gods, whose dwelling is not with flesh. The Chaldeans say it to save themselves. It turns out to be exactly true.",
      "For this cause the king was angry and very furious, and commanded to destroy all the wise men of Babylon. Daniel is about to be executed for a test he was never even given a chance to take.",
      "Daniel went to his house, and made the thing known to Hananiah, Mishael, and Azariah... that they would desire mercies of the God of heaven. His first move is not cleverness. It is four friends praying together.",
    ]),
    dan(2, 24, 49, [
      "But there is a God in heaven that revealeth secrets. Before he says a word of the dream, Daniel makes sure the king knows exactly where it came from.",
      "This image's head was of fine gold, his breast and his arms of silver, his belly and his thighs of brass, his legs of iron, his feet part of iron and part of clay. One statue, one body, four kingdoms getting weaker as they go down.",
      "A stone was cut out without hands... smote the image upon his feet... and the stone that smote the image became a great mountain, and filled the whole earth. Every empire in that statue falls to something no human hand built.",
      "The God of heaven set up a kingdom, which shall never be destroyed... it shall stand for ever. Then the king who could have killed him falls on his face and calls Daniel's God a God of gods.",
    ]),
    dan(3, 1, 18, [
      "Nebuchadnezzar the king made an image of gold, whose height was threescore cubits. The dream said his kingdom was gold for now, and only for now. He responds by building something that never has to end.",
      "There are certain Jews... Shadrach, Meshach, and Abed-nego; these men, O king, have not regarded thee: they serve not thy gods, nor worship the golden image. The very men the last chapter promoted are the ones now accused.",
      "Who is that God that shall deliver you out of my hands? The king who bowed to Daniel's God one chapter ago is daring that same God to try him.",
      "Our God whom we serve is able to deliver us from the burning fiery furnace... but if not, be it known unto thee, O king, that we will not serve thy gods. Notice what their courage does not depend on. Not on being rescued. Just on being right.",
    ]),
    dan(3, 19, 30, [
      "He commanded that they should heat the furnace one seven times more than it was wont to be heated... the flame of the fire slew those men that took up Shadrach, Meshach, and Abed-nego. The furnace kills the guards before it even touches the three men walking into it.",
      "Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God. Nebuchadnezzar counts wrong on purpose. Three went in bound. Four are walking free.",
      "Upon whose bodies the fire had no power, nor was an hair of their head singed, neither were their coats changed, nor the smell of fire had passed on them. Not scorched. Not even smelling of smoke. The fire left no mark at all.",
      "Blessed be the God of Shadrach, Meshach, and Abed-nego, who hath sent his angel, and delivered his servants that trusted in him. The king who built the statue ends the chapter praising the one God who never bowed to it.",
    ]),
  ],
  closing: [
    ["So that is Day 253.", 700],
    ["Four exiles, a forgotten dream, and a furnace nobody walked into alone.", 750],
    ["Daniel draws one line on his very first day in Babylon, over food, and it holds for the rest of his life.", 800],
    ["A statue built out of the very dream that told Nebuchadnezzar his kingdom would not last forever.", 800],
    ["And three men who would not bow, who told the king plainly that his power to kill them changed nothing about who they would serve.", 850],
    ["Then a fourth man in the fire with them, and not one hair singed when they walked back out.", 850],
    ["Tomorrow, Daniel 4 through 6. A proud king humbled into an animal, and another one who cannot undo his own law fast enough to save a friend from the lions.", 850],
    ["For now, sit with what they said before anyone knew how the story would end.", 800],
    ["Our God is able to deliver us.", 800],
    ["But if not, we still will not bow.", 1200],
  ],
};
