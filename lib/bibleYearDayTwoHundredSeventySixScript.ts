import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 276, written to the Day 1 standard.
 *
 * Zechariah's night visions are over; three oracles follow. A King rides in
 * on a donkey instead of a war horse, God says He will personally gather
 * both scattered houses of Israel, and then Zechariah acts out a rejected
 * shepherd who gets paid off in thirty pieces of silver and hands the flock
 * to a worthless one instead. Seven blocks across Zechariah 9, 10, and 11.
 */

const zechariahNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 9:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const zechariahTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 10:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

const zechariahEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 11:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 276,
  title: "The Coming King and Rejected Shepherd",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 276. A king is coming, and he is not riding what anyone expects.", 750],
    ["Not a war horse. A donkey. Not demanding peace from the nations, bringing it to them himself.", 800],
    ["Then, in the same book, a shepherd gets hired to feed a flock that is already marked for slaughter.", 800],
    ["He does the job. And they pay him off. Thirty pieces of silver, thrown to a potter.", 900],
    ["Watch how much of this you have heard before, in a very different story.", 850],
    ["We are in Zechariah 9, 10, and 11.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    zechariahNine(1, 8, [
      "Zechariah names real cities on a real map. Damascus, Tyre, Sidon, Ashkelon, Gaza, Ekron. This is not vague poetry. It is a word about the nations Israel actually feared.",
      "Tyre built herself a stronghold and heaped up silver like dust, gold like mud in the street. All of it gets called smoke before the chapter is finished with her.",
      "Even inside the judgment there is a strange mercy. He that remaineth, even he, shall be for our God. A remnant of Philistines, Israel's oldest enemy on the coast, folded into God's own people like a Jebusite living in Judah.",
      "Then God gives the reason for all of it in four words. Now have I seen with mine eyes. He is not managing this from a distance.",
    ]),
    zechariahNine(9, 17, [
      "Rejoice greatly, O daughter of Zion. That command comes before anything visible has happened. The joy comes first, on credit.",
      "Behold, thy King cometh unto thee. Just, and having salvation, lowly, and riding upon an ass, and upon a colt the foal of an ass. Kings rode horses to war and donkeys in peace. This King arrives already at peace.",
      "His dominion shall be from sea even to sea, and from the river even to the ends of the earth. Bigger than anything David or Solomon ever held. And he gets there with the chariot and the battle bow cut off in the very next breath.",
      "By the blood of thy covenant I have sent forth thy prisoners out of the pit wherein is no water. Prisoners of hope, God calls them. Still shut in the pit, but already told exactly what their freedom is worth.",
    ]),
    zechariahTen(1, 5, [
      "Ask ye of the Lord rain, Zechariah says, instead of turning to idols. For the idols have spoken vanity, and the diviners have seen a lie, and comfort in vain.",
      "Without a real shepherd, the flock goes its own way, troubled and scattered, because there was no shepherd. Israel's whole history since the kings failed, in a single line.",
      "Mine anger was kindled against the shepherds, and I punished the goats. The men who were supposed to lead let the flock wander, so God visits his own flock himself.",
      "Out of him came forth the corner, the nail, the battle bow, every oppressor together. Everything Judah needs comes from inside Judah now, because this time God is building the leadership himself.",
    ]),
    zechariahTen(6, 12, [
      "I will strengthen the house of Judah, and I will save the house of Joseph. Both halves of a divided, scattered nation, named together in the same sentence.",
      "I will hiss for them, and gather them, for I have redeemed them. Not a threat. A whistle, calling something home that wandered far.",
      "He brings them again out of Egypt, gathers them out of Assyria, into Gilead and Lebanon, until place shall not be found for them. Two of Israel's worst captivities, both reversed on purpose.",
      "He shall pass through the sea with affliction, and the deeps of the river shall dry up. The exodus, replayed. And the pride of Assyria, the sceptre of Egypt, both brought down together.",
    ]),
    zechariahEleven(1, 8, [
      "Open thy doors, O Lebanon, that the fire may devour thy cedars. The tone turns completely. Fire, howling, a whole forest coming down.",
      "There is a voice of the howling of the shepherds, for their glory is spoiled. The very leaders promised strength two chapters ago now wail over what they have lost.",
      "God tells Zechariah to act it out himself. Feed the flock of the slaughter. A flock already marked to die, sold by shepherds who feel no guilt and call themselves blessed for the money.",
      "Three shepherds cut off in one month, and my soul lothed them, and their soul also abhorred me. Whoever they stand for, the bond between shepherd and flock has broken all the way down.",
    ]),
    zechariahEleven(9, 14, [
      "I will not feed you, Zechariah says, playing the shepherd walking away from a flock that never wanted him. That that dieth, let it die. That that is to be cut off, let it be cut off.",
      "Then he asks for wages. If ye think good, give me my price, and if not, forbear. They weigh out thirty pieces of silver, the price the law set for a gored slave. That is what they decided the good shepherd was worth.",
      "Cast it unto the potter, God says, a goodly price that I was prised at of them. Zechariah throws thirty silver coins into the house of the Lord, to a potter. Centuries later Judas throws back the same thirty pieces, and the priests use it to buy a potter's field.",
      "Then he cuts his staff called Beauty, breaking the covenant God had kept over the nations. And cuts the staff called Bands, breaking the brotherhood between Judah and Israel. Whatever was holding them together snaps in his own hands.",
    ]),
    zechariahEleven(15, 17, [
      "Take unto thee yet the instruments of a foolish shepherd, God says next. Zechariah has just played the good shepherd, rejected. Now he plays the one they get instead.",
      "This shepherd will not visit those cut off, will not seek the young, will not heal the broken, will not feed the healthy. He eats the flesh of the fat and tears their claws in pieces. Everything a shepherd owes the flock, refused on purpose.",
      "Woe to the idol shepherd that leaveth the flock. A sword against his arm and his right eye, the two things a shepherd needs to fight for sheep and to see where they have wandered, both struck useless.",
      "Reject the King who rides in on a donkey, and you do not end up with no shepherd at all. You end up with this one.",
    ]),
  ],
  closing: [
    ["So that is Day 276.", 700],
    ["A King rode into this chapter on a donkey, not a war horse, bringing peace instead of demanding it, with a kingdom reaching farther than any king before him ever held.", 850],
    ["Then a shepherd stepped in to feed a flock already marked for slaughter, and did the job anyway, even though the flock hated him for it.", 800],
    ["When he finally asked for wages, they weighed out thirty pieces of silver. The price of a slave. He threw it into the house of the Lord, to a potter.", 850],
    ["Centuries later a disciple threw back that same thirty pieces of silver, and the priests bought a potter's field with it. Zechariah wrote this down five hundred years early.", 850],
    ["Then he broke his own staff in half. Beauty, cut. Bands, cut. The covenant and the brotherhood, both snapped in his hands, because the flock never wanted a real shepherd.", 850],
    ["Reject him, and the next shepherd who shows up will not heal you, feed you, or look for you when you wander. That one just takes.", 800],
    ["Tomorrow, Zechariah 12 through 14. The one they pierced, and the Lord who reigns over the whole earth in the end.", 850],
    ["For now, sit with the donkey and the silver.", 750],
    ["A King who came in peace, and a price nobody wanted to pay for him.", 1200],
  ],
};
