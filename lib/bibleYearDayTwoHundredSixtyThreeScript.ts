import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 263, written to the Day 1 standard.
 *
 * Amos finishes the eight-nation list by landing on Israel itself, then
 * spends two chapters showing exactly why: privilege that became
 * entitlement, worship that never touched behavior, and a refrain - "yet
 * have ye not returned unto me" - repeated five times over five different
 * disasters. Six blocks, two per chapter across Amos 2, 3, and 4.
 */

const amos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Amos ${chapter}:${startVerse}-${endVerse}`,
  book: "amos",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 263,
  title: "Justice and Accountability",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 263. Yesterday Amos named five foreign nations for their war crimes.", 750],
    ["Today he adds two more, and the eighth name on the list is the one nobody in the room expected.", 800],
    ["Israel. God's own people, held to the same standard, in the same tone.", 850],
    ["Then Amos spends two more chapters explaining exactly why. Privilege that turned into entitlement, and worship that never once changed a single behavior.", 850],
    ["We are in Amos 2, 3, and 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    amos(2, 1, 8, [
      "For three transgressions of Moab, and for four... because he burned the bones of the king of Edom into lime. Amos adds a sixth nation, judged for a cruelty that did not even touch a living person, just the dead king's bones, burned out of pure spite.",
      "Then a seventh. For three transgressions of Judah, and for four... because they have despised the law of the LORD, and have not kept his commandments. The list finally reaches people who actually had the law. Their crime is different in kind, not just degree.",
      "Then the eighth, and everyone listening would have been nodding along until this one. For three transgressions of Israel, and for four... because they sold the righteous for silver, and the poor for a pair of shoes. The very people Amos is speaking to.",
      "A man and his father will go in unto the same maid, to profane my holy name. They lay themselves down upon clothes taken in pledge from the poor, right beside the altar. Amos names the exact address. This corruption is happening at the place of worship, not somewhere else.",
    ]),
    amos(2, 9, 16, [
      "Yet destroyed I the Amorite before them, whose height was like the height of the cedars. God reminds Israel who cleared the land for them before he lists anything they owe him. The accusation is built on a real relationship, not a stranger's grudge.",
      "I raised up of your sons for prophets, and of your young men for Nazarites. God did not just rescue Israel once. He kept sending voices to keep them honest, generation after generation.",
      "But ye gave the Nazarites wine to drink, and commanded the prophets, saying, Prophesy not. They took the very gifts sent to correct them and used them to silence the correction instead.",
      "He that is courageous among the mighty shall flee away naked in that day. Amos ends the block with total reversal. Every kind of strength Israel is trusting in, speed, courage, weapons, horses, will fail on the day this comes due.",
    ]),
    amos(3, 1, 8, [
      "You only have I known of all the families of the earth: therefore I will punish you for all your iniquities. This is the key that unlocks the whole chapter. Being chosen was never a shield from judgment. Amos says it made the judgment more certain, not less.",
      "Can two walk together, except they be agreed? Will a lion roar in the forest, when he hath no prey? Amos stacks up plain cause-and-effect questions from ordinary life. Nothing happens without a reason, and neither does what is about to happen to Israel.",
      "Shall there be evil in a city, and the LORD hath not done it? Amos is not saying God causes sin. He is saying nothing overtakes this nation that God did not already see coming and allow to run its course.",
      "The lion hath roared, who will not fear? the Lord GOD hath spoken, who can but prophesy? Amos answers, in advance, anyone who asks why he keeps saying these hard things. He is not choosing to. He cannot stay quiet once God has spoken.",
    ]),
    amos(3, 9, 15, [
      "Publish in the palaces at Ashdod, and in the palaces in the land of Egypt. Amos calls in outsiders, Israel's own historic enemies, as witnesses. Even Egypt would recognize the chaos and oppression sitting inside Samaria's walls.",
      "They know not to do right, saith the LORD, who store up violence and robbery in their palaces. The crime is not one bad decision. It is a whole system built and stored up over time, sitting inside the nicest houses in the country.",
      "As the shepherd taketh out of the mouth of the lion two legs, or a piece of an ear; so shall the children of Israel be taken out. A shepherd rescuing scraps from a lion's mouth is not a success story. It is proof of how much has already been lost.",
      "I will smite the winter house with the summer house; and the houses of ivory shall perish. Amos names the specific luxury, seasonal homes, ivory paneling, built on the wealth described two chapters earlier. What was gained by crushing the poor will not outlast the poor's complaint.",
    ]),
    amos(4, 1, 5, [
      "Hear this word, ye kine of Bashan, that are in the mountain of Samaria, which oppress the poor, which crush the needy. Amos compares the wealthy women of the capital to fattened cattle from a region famous for its rich pasture. It is not a compliment.",
      "Which say to their masters, Bring, and let us drink. Their whole complaint against the men who run their households is that the drinks are not arriving fast enough, while people outside are being crushed to pay for the lifestyle.",
      "He will take you away with hooks, and your posterity with fishhooks. Cattle led out with hooks through the nose. Amos takes his own insult all the way to its logical, humiliating end.",
      "Come to Bethel, and transgress; at Gilgal multiply transgression. Bring your sacrifices every morning. Amos turns fully sarcastic here. Go on, he says, keep up the religious routine. It was never the problem you thought it was solving.",
    ]),
    amos(4, 6, 13, [
      "And I also have given you cleanness of teeth in all your cities, and want of bread in all your places: yet have ye not returned unto me, saith the LORD. Famine, and no return.",
      "I have withholden the rain from you... yet have ye not returned unto me, saith the LORD. Drought, and no return. Amos repeats this exact refrain five times across this chapter, each time naming a different disaster God sent to get their attention.",
      "I have smitten you with blasting and mildew... I have sent among you the pestilence... I have overthrown some of you, as God overthrew Sodom and Gomorrah, and ye were as a firebrand plucked out of the burning: yet have ye not returned unto me, saith the LORD. Crop disease, plague, and a disaster survived by inches. Every single time, the same result.",
      "Prepare to meet thy God, O Israel. For, lo, he that formeth the mountains, and createth the wind... The LORD, The God of hosts, is his name. Amos closes by naming exactly who they have been ignoring through all five warnings. Not a force. Not luck. The one who made the mountains they are standing on.",
    ]),
  ],
  closing: [
    ["So that is Day 263.", 700],
    ["Eight nations, and the eighth one was Israel itself.", 750],
    ["Not a stranger's crime this time. Selling the righteous for silver, the poor for a pair of shoes.", 800],
    ["You only have I known of all the families of the earth: therefore I will punish you for all your iniquities. Being chosen raised the standard. It did not lower it.", 850],
    ["And then that refrain, five separate disasters, the same six words after every one of them. Yet have ye not returned unto me.", 850],
    ["God was not silent while all of this built up. He sent famine, drought, blight, plague, and a near miss, trying to get their attention before he had to speak this plainly.", 850],
    ["Tomorrow, Amos 5 through 7. Seek the Lord and live becomes the actual invitation inside all of this warning.", 850],
    ["For now, sit with the refrain.", 750],
    ["Yet have ye not returned unto me.", 800],
    ["Prepare to meet thy God.", 1200],
  ],
};
