import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 152, written to the Day 1 standard.
 *
 * Psalms 70-72: a five-verse cry with no room for anything but urgency, an
 * old man asking God not to leave him now that his strength is failing,
 * and a prayer for a king whose whole reign is measured by how he treats
 * the poor. Six blocks across the three psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 152,
  title: "Help, Aging, and the Righteous King",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 152. Psalms 70 through 72.", 700],
    ["A five-verse cry with no room in it for anything but urgency.", 750],
    ["An old man, asking God not to leave him now that his strength is starting to fail.", 800],
    ["And a prayer for a king, measured entirely by how he treats the poor and the powerless.", 850],
    ["Urgency, then endurance, then a whole reign built on mercy.", 700],
    ["We are in Psalms 70, 71, and 72.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(70, 1, 5, [
      "Make haste, O God, to deliver me; make haste to help me, O LORD. The psalm opens on the word haste and never slows down. There is no long complaint first, just the request.",
      "Let them be ashamed and confounded that seek after my soul... let such as love thy salvation say continually, Let God be magnified. He asks for two opposite outcomes in the same breath. Shame for the ones hunting him, and joy for the ones who love God.",
      "But I am poor and needy: make haste unto me, O God. He does not dress up his situation. Poor and needy is the whole description he gives of himself.",
      "Thou art my help and my deliverer; O LORD, make no tarrying. The last line repeats the first idea one more time. Even the ending is still asking God to hurry.",
    ]),
    g(71, 1, 8, [
      "In thee, O LORD, do I put my trust: let me never be put to confusion. Be thou my strong habitation, whereunto I may continually resort. He is not asking for one rescue. He is asking to be able to keep coming back to the same safe place.",
      "For thou art my hope, O Lord GOD: thou art my trust from my youth. By thee have I been holden up from the womb. This is not a new relationship. He traces his trust in God all the way back before he could have chosen it himself.",
      "I am as a wonder unto many; but thou art my strong refuge. Something about his life has made him strange to the people around him, and his answer for it is not an explanation. It is where he keeps running.",
      "Let my mouth be filled with thy praise and with thy honour all the day. A short line, but it sets up everything the rest of the psalm is actually about.",
    ]),
    g(71, 9, 16, [
      "Cast me not off in the time of old age; forsake me not when my strength faileth. The first plain mention of aging in the psalm, and it is the actual center of his fear. Not death itself, but being set aside before it comes.",
      "For mine enemies speak against me... saying, God hath forsaken him: persecute and take him; for there is none to deliver him. His enemies are betting that his weakness means God has already left. He answers that bet directly.",
      "O God, be not far from me: O my God, make haste for my help. But I will hope continually, and will yet praise thee more and more. He does not argue that he is still strong. He argues that hope does not require strength to keep going.",
      "My mouth shall shew forth thy righteousness and thy salvation all the day; for I know not the numbers thereof. He says he cannot even count everything God has done for him. That is offered as the whole case for hoping again now.",
    ]),
    g(71, 17, 24, [
      "O God, thou hast taught me from my youth: and hitherto have I declared thy wondrous works. Now also when I am old and greyheaded, O God, forsake me not; until I have shewed thy strength unto this generation. He wants one more thing from his old age. Not comfort, but the chance to still be useful to the next generation.",
      "Thou, which hast shewed me great and sore troubles, shalt quicken me again, and shalt bring me up again from the depths of the earth. He does not pretend the troubles were small. He just trusts the same God who allowed them can also bring him back up out of them.",
      "I will also praise thee with the psaltery, even thy truth, O my God: unto thee will I sing with the harp, O thou Holy One of Israel. The fear of being set aside turns into a plan to keep singing anyway, instruments and all.",
      "My tongue also shall talk of thy righteousness all the day long: for they are confounded, for they are brought unto shame, that seek my hurt. The psalm that opened begging not to be forsaken in old age ends still talking, still singing, still not finished.",
    ]),
    g(72, 1, 11, [
      "Give the king thy judgments, O God, and thy righteousness unto the king's son. A prayer for a coming king, most likely written for Solomon but reaching further than any one ruler ever fully lived up to.",
      "He shall judge the poor of the people, he shall save the children of the needy, and shall break in pieces the oppressor. The very first thing named about this king's greatness is not his armies. It is how he treats people who have nothing.",
      "He shall come down like rain upon the mown grass: as showers that water the earth. In his days shall the righteous flourish; and abundance of peace so long as the moon endureth. His reign is pictured as quiet weather, not conquest. Grass growing back after being cut down.",
      "He shall have dominion also from sea to sea... the kings of Tarshish and of the isles shall bring presents... yea, all kings shall fall down before him: all nations shall serve him. The reach grows from one nation's fields to every king on earth bowing to the same throne.",
    ]),
    g(72, 12, 20, [
      "For he shall deliver the needy when he crieth; the poor also, and him that hath no helper. He shall spare the poor and needy, and shall save the souls of the needy. The psalm circles right back to where it started. A king's whole worth measured by his mercy to the powerless.",
      "He shall redeem their soul from deceit and violence: and precious shall their blood be in his sight. Their lives are called precious to him specifically, not just useful or convenient.",
      "His name shall endure for ever... men shall be blessed in him: all nations shall call him blessed. A promise no human king ever fully kept, which is exactly why later generations kept reading this psalm and hearing someone bigger than Solomon in it.",
      "Blessed be the LORD God, the God of Israel, who only doeth wondrous things... The prayers of David the son of Jesse are ended. The last line closes a whole section of the Psalms, David handing off his prayers the same way he is asking to hand off the kingdom.",
    ]),
  ],
  closing: [
    ["So that is Day 152.", 700],
    ["A five-verse cry, an old man refusing to stop singing, and a king whose whole reign is measured by mercy.", 800],
    ["Psalm 70 says urgency itself is allowed to be the whole prayer. Make haste, O God, is enough on its own.", 800],
    ["Psalm 71 says growing old is not the same as being finished. He keeps asking for one more chance to be useful.", 850],
    ["And Psalm 72 says the greatest king is not measured by armies or borders, but by how he treats the person with no helper at all.", 850],
    ["David's own prayers end at the bottom of that psalm. But the king it describes was still coming.", 800],
    ["Tomorrow, Psalms 73 through 75. A man who almost lost his footing watching the wicked prosper, until he saw where they were actually headed.", 850],
    ["For now, hold on to the old man's line.", 750],
    ["Forsake me not when my strength faileth.", 800],
    ["He was still singing at the end of the psalm.", 1200],
  ],
};
