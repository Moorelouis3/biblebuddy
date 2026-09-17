import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 255, written to the Day 1 standard.
 *
 * Daniel 7-9: Daniel stops interpreting other men's dreams and starts
 * having his own. Four beasts and a courtroom in heaven, a ram and a goat
 * fighting it out under a countdown Daniel can't yet place, and finally a
 * prayer of confession that gets answered before Daniel even finishes
 * asking. Six blocks, two per chapter, matching Day 253-254's pattern.
 */

const dan = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Daniel ${chapter}:${startVerse}-${endVerse}`,
  book: "daniel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 255,
  title: "Kingdoms, Son of Man, and Prayer",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 255. Daniel 7 through 9.", 750],
    ["Daniel has spent his whole life explaining other men's dreams. Tonight he has one of his own, and it terrifies him.", 800],
    ["Two more visions follow, each one further out than the last, each one still unexplained by the time the chapter ends.", 800],
    ["Then Daniel stops watching visions and starts praying, and what he asks for is answered before he even finishes saying it.", 850],
    ["We are in Daniel 7 through 9.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    dan(7, 1, 14, [
      "The four winds of the heaven strove upon the great sea... four great beasts came up from the sea, diverse one from another. The same night Belshazzar throws his last party, Daniel is watching kingdoms come up out of chaos.",
      "A lion with eagle's wings, lifted up and made to stand like a man; a bear raised on one side and told, Arise, devour much flesh; a four-headed leopard given dominion. Three empires, three shapes, none of them named yet, but you already know two of them from a statue Nebuchadnezzar saw long before this.",
      "A fourth beast, dreadful and terrible, and strong exceedingly... it had ten horns, and among them a little horn comes up with eyes like the eyes of man, and a mouth speaking great things. This one gets no animal name at all. It is too much to compare to anything else Daniel has seen.",
      "Then the scene changes completely. The Ancient of days did sit... one like the Son of man came with the clouds of heaven, and there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him. Every beast in this chapter is temporary. He is not.",
    ]),
    dan(7, 15, 28, [
      "I Daniel was grieved in my spirit... I came near unto one of them that stood by, and asked him the truth of all this. Daniel does not pretend to understand his own vision. He asks.",
      "These great beasts, which are four, are four kings... but the saints of the most High shall take the kingdom, and possess the kingdom for ever. That is the whole answer in two sentences, before any of the frightening detail gets explained at all.",
      "The same horn made war with the saints, and prevailed against them... he shall wear out the saints of the most High, and think to change times and laws. Daniel is told plainly this power wins for a while. The vision promises a certain ending, not an easy road.",
      "Until the Ancient of days came, and judgment was given to the saints of the most High... the kingdom and dominion...shall be given to the people of the saints of the most High. The horn's whole war ends with the very people it was crushing sitting on the throne instead.",
    ]),
    dan(8, 1, 14, [
      "A ram which had two horns... pushing westward, and northward, and southward; so that no beasts might stand before him. A new vision, still in Belshazzar's reign, and still no interpretation yet.",
      "An he goat came from the west on the face of the whole earth, and touched not the ground... smote the ram, and brake his two horns. Daniel watches something move so fast it looks like it never touches the earth at all.",
      "The great horn was broken; and for it came up four notable ones... and out of one of them came forth a little horn, which waxed exceeding great, toward the south, and toward the east, and toward the pleasant land. Power in this book keeps breaking at its peak, never at its weakest point.",
      "He magnified himself even to the prince of the host, and by him the daily sacrifice was taken away... Unto two thousand and three hundred days; then shall the sanctuary be cleansed. Not vague comfort. An actual number Daniel can hold onto.",
    ]),
    dan(8, 15, 27, [
      "There stood before me as the appearance of a man... Gabriel, make this man to understand the vision. Daniel falls on his face the moment the angel comes near. Understanding this vision costs him something physically before it costs him anything else.",
      "The ram which thou sawest...are the kings of Media and Persia. And the rough goat is the king of Grecia. No riddle left standing. The angel just names the empires outright.",
      "A king of fierce countenance, and understanding dark sentences, shall stand up... he shall also stand up against the Prince of princes; but he shall be broken without hand. A ruler who looks unstoppable is told, in the same breath, exactly how his story ends. Not by an army.",
      "I Daniel fainted, and was sick certain days... I was astonished at the vision, but none understood it. The chapter does not end on triumph. It ends with Daniel sick in bed, and nobody around him with any idea what he just saw.",
    ]),
    dan(9, 1, 19, [
      "I Daniel understood by books the number of the years... I set my face unto the Lord God, to seek by prayer and supplications, with fasting, and sackcloth, and ashes. Daniel does not go looking for a new vision. He goes looking in Jeremiah's actual words, and prays about what he finds there.",
      "We have sinned, and have committed iniquity, and have done wickedly, and have rebelled... to us belongeth confusion of face, to our kings, to our princes, and to our fathers. Daniel has done nothing in this book but stay faithful in Babylon, and he still prays we, not they.",
      "To the Lord our God belong mercies and forgivenesses, though we have rebelled against him... we do not present our supplications before thee for our righteousnesses, but for thy great mercies. He does not ask God to notice how good he personally has been.",
      "O Lord, hear; O Lord, forgive; O Lord, hearken and do; defer not, for thine own sake. Four short commands in a row. No more theology. Just a man asking God to move.",
    ]),
    dan(9, 20, 27, [
      "Whiles I was speaking, and praying, and confessing... the man Gabriel...touched me about the time of the evening oblation. The answer arrives while the prayer is still in his mouth. Daniel does not have to wait to find out he was heard.",
      "At the beginning of thy supplications the commandment came forth, and I am come to shew thee; for thou art greatly beloved. Gabriel tells him exactly when the answer left heaven. It was already on its way before Daniel finished the first sentence.",
      "Seventy weeks are determined upon thy people and upon thy holy city... unto the Messiah the Prince shall be seven weeks, and threescore and two weeks. A prayer about seventy years of exile gets answered with a countdown to something far bigger than getting to go home.",
      "After threescore and two weeks shall Messiah be cut off, but not for himself. In the middle of a chapter about numbers and weeks, one line names exactly what the whole countdown was always pointing toward.",
    ]),
  ],
  closing: [
    ["So that is Day 255.", 700],
    ["Three visions, and Daniel understood none of them on his own.", 750],
    ["Four beasts rise out of the sea, and then a courtroom opens in heaven and hands the kingdom to someone who is not a beast at all.", 800],
    ["A ram and a goat fight it out, and a little horn reaches high enough to touch the very sacrifice offered to God.", 800],
    ["And after all of that, Daniel does not ask for another vision. He opens Jeremiah, finds a promise, and prays it back to God word for word.", 850],
    ["The answer reaches him before his own sentence is even finished.", 800],
    ["Tomorrow, Daniel 10 through 12. Daniel's last vision, and an angel who tells him exactly what was fighting to keep the answer from arriving even one day sooner.", 850],
    ["For now, sit with what actually moved heaven tonight.", 800],
    ["Not a vision. A prayer.", 750],
    ["Before he finished asking, the answer was already on its way.", 1200],
  ],
};
