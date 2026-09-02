import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 84, written to the Day 1 standard.
 *
 * 1 Kings 8-11: the temple filled with the glory of God, Solomon's prayer
 * and the queen of Sheba's visit, then the same king building shrines to
 * other gods on the hill facing it. Seven blocks across four chapters,
 * matching the shape Day 83 used for the temple build.
 */

const kings = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 84,
  title: "Temple Glory and Solomon's Fall",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 84. Today the temple gets filled with the glory of God.", 750],
    ["By the end of this same reading, Solomon is burning incense to someone else's gods, on a hill facing that very temple.", 800],
    ["In between: the longest prayer in the Old Testament, a queen who travels a thousand miles just to see if the rumors are true, and more gold than anyone bothers to count.", 850],
    ["It doesn't fall apart all at once. It happens one wife, one high place, at a time.", 900],
    ["We are in 1 Kings 8 through 11.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings(8, 1, 21, [
      "Solomon assembles Israel's elders and brings the ark up from Zion into the finished temple, with sheep and oxen sacrificed in numbers nobody even tries to count.",
      "The priests set the ark under the wings of the cherubim, and when they step back out, the cloud fills the house of the Lord — so thick the priests can't even stand to minister. Solomon says the line: the Lord said he would dwell in thick darkness.",
      "He turns and reminds everyone how this started. God never asked for a house. David wanted to build one, and God told him no — your son will. Solomon is standing inside a promise made to his father before he was even born.",
      "I have surely built thee an house to dwell in, a settled place for thee to abide in for ever. Forever is a big word for a building. Solomon means it, and the rest of this book will test whether it holds.",
    ]),
    kings(8, 22, 66, [
      "Solomon kneels in front of the whole nation, hands spread to heaven, and starts by admitting something huge. Will God indeed dwell on the earth? The heaven and heaven of heavens cannot contain thee — how much less this house that I have built.",
      "Then he prays through every way Israel could fail — defeat in war, drought, famine, exile in a foreign land — and asks God to do the same thing every single time. Hear thou in heaven, and forgive.",
      "He even prays for the stranger who isn't part of Israel at all, who hears about God's name from far away and comes to pray toward this house. Solomon wants the whole earth to know this God, not just his own people.",
      "Then the sacrifice — twenty-two thousand oxen, a hundred twenty thousand sheep, so many the regular altar can't hold them. The feast runs fourteen days, and the people go home joyful and glad of heart for all the goodness the Lord had done.",
    ]),
    kings(9, 1, 9, [
      "God appears to Solomon a second time, the same way he did at Gibeon, and answers that huge prayer directly. I have heard thy prayer. I have hallowed this house, to put my name there for ever.",
      "Then comes the condition, stated as plainly as it can be stated. If thou wilt walk before me as David thy father walked, I will establish the throne of thy kingdom forever.",
      "But if ye shall at all turn from following me and go serve other gods, I will cut off Israel out of the land, and this house shall become a proverb and a byword among all people.",
      "Everyone who passes by this same building will ask why God did this to it. And the answer God gives in advance is: because they forsook the Lord. Solomon hears this while the temple is still new.",
    ]),
    kings(9, 10, 28, [
      "Twenty years into building both houses, Solomon pays Hiram back with twenty cities in Galilee. Hiram comes to see them and isn't impressed — he calls the land Cabul, and it stays a sore point between the two kings.",
      "The forced levy raised earlier wasn't only for the temple. It also built the wall of Jerusalem, Millo, and fortified cities like Hazor, Megiddo, and Gezer. Solomon is building an empire now, not just a sanctuary.",
      "The text is careful here — of the children of Israel did Solomon make no bondmen. The forced labor falls on the peoples left over from Canaan, not on Israel itself. It's still a workforce built on people who never chose it.",
      "Solomon also builds a navy at Ezion-geber, and with Hiram's sailors it brings back four hundred twenty talents of gold from Ophir in a single trip. The kingdom isn't just secure now. It's rich beyond anything Israel has seen.",
    ]),
    kings(10, 1, 29, [
      "The queen of Sheba hears about Solomon and comes to test him with hard questions, and Solomon has an answer for every one of them. There was not any thing hid from the king which he told her not.",
      "She sees the wisdom, the house he built, the meals, the servants, and says: the half was not told me. Then she blesses the God who put him on the throne — a foreign queen recognizing what Israel's own kings so often miss.",
      "Then the chapter turns into raw numbers. Six hundred sixty-six talents of gold in a single year. Two hundred shields of beaten gold. A throne of ivory with lions on every step. Silver treated like ordinary stone, because there's simply too much of it.",
      "So king Solomon exceeded all the kings of the earth for riches and for wisdom. Read that twice. Both halves are true, and both halves are about to matter for what happens next.",
    ]),
    kings(11, 1, 13, [
      "Solomon loved many strange women — seven hundred wives, three hundred concubines — from exactly the nations God told Israel not to intermarry with, because they will turn away your heart after their gods. That is exactly what happens.",
      "When Solomon was old, his wives turned away his heart after other gods, and his heart was not perfect with the Lord his God, as was the heart of David his father. He builds high places for Chemosh and Molech, right on the hill facing Jerusalem, in view of the temple he built for the Lord.",
      "The man who asked God for wisdom instead of riches now burns incense to gods that demand child sacrifice, to please the women he married for politics. The Lord was angry with Solomon, because his heart was turned from the Lord God of Israel, who had appeared unto him twice.",
      "God's judgment is real but not immediate. I will rend the kingdom from thee — but not in your lifetime, for David's sake, and not all of it, for Jerusalem's sake. One tribe stays with his son. Grace tucked inside the judgment.",
    ]),
    kings(11, 14, 43, [
      "God raises up Hadad the Edomite, a survivor of Joab's massacre years earlier who grew up in Pharaoh's own house, and Rezon, a former captain who seizes Damascus — two enemies stirred up out of Solomon's own father's old wars.",
      "Then comes Jeroboam, one of Solomon's own officials. The prophet Ahijah meets him alone in a field, tears a new garment into twelve pieces, and hands him ten. The Lord will tear the kingdom out of Solomon's son's hand, and give ten tribes to you.",
      "Solomon tries to kill Jeroboam the moment he hears it, the same way Saul once tried to kill David. Jeroboam runs to Egypt and waits there until Solomon is dead.",
      "And the time that Solomon reigned in Jerusalem over all Israel was forty years. Solomon slept with his fathers, and Rehoboam his son reigned in his stead. Forty years of peace, wisdom, and glory — and it ends with a torn garment and a king waiting in Egypt for his chance.",
    ]),
  ],
  closing: [
    ["So that is Day 84.", 700],
    ["The glory of God filled a building today. By the end of the same four chapters, Solomon was building shrines for gods that demanded child sacrifice.", 800],
    ["He prayed the most honest prayer of his life — will God indeed dwell on the earth, the heavens can't even contain you — and then let seven hundred wives turn his own heart in the opposite direction.", 850],
    ["God's answer wasn't total destruction. It was a torn garment, and ten pieces handed to a man named Jeroboam.", 800],
    ["Even in judgment, God kept His word to David. One tribe stayed in the family. Grace tucked inside consequences.", 850],
    ["Tomorrow, 1 Kings 12 through 15. The kingdom Solomon built actually splits in two.", 800],
    ["For now, hold on to how it happened.", 750],
    ["Not one big collapse.", 700],
    ["One compromise at a time.", 1200],
  ],
};
