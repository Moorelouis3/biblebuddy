import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 277, written to the Day 1 standard.
 *
 * Zechariah closes with Jerusalem as an immovable stone, God pouring out
 * grace so the people mourn one they pierced, a fountain opened for sin, a
 * shepherd struck so the sheep scatter, and then the Lord's own feet on the
 * Mount of Olives ending in a kingdom where every pot in Jerusalem is holy.
 * Six blocks across Zechariah 12, 13, and 14.
 */

const zechariahTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 12:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const zechariahThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 13:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

const zechariahFourteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 14:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 14,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 277,
  title: "Pierced One and the Lord's Reign",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 277. Zechariah's last three chapters, and they hold both the worst day and the best one.", 800],
    ["Jerusalem becomes a stone nobody can lift without getting cut.", 750],
    ["Then, in the same breath, God says He will pour out grace on the very people who pierced someone he calls His own.", 850],
    ["A shepherd gets struck, and the sheep scatter. Then the Lord's own feet stand on a mountain, and it splits in two.", 900],
    ["This book has been building to this the whole time.", 850],
    ["We are in Zechariah 12, 13, and 14.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    zechariahTwelve(1, 8, [
      "God introduces himself before saying anything else. He who stretched out the heavens, laid the foundation of the earth, and formed the spirit of man within him. Whatever comes next carries that weight behind it.",
      "I will make Jerusalem a cup of trembling to all the people round about, and a burdensome stone for all people. Anyone who tries to lift that stone and carry it off gets cut in pieces, even with the whole earth gathered against it.",
      "In that day I will smite every horse with astonishment, and his rider with madness. The armies that come against the city lose their nerve and their weapons at the same moment.",
      "The Lord shall save the tents of Judah first, so the glory of David's house does not outshine the rest of the people. Then he that is feeble among them at that day shall be as David. Weakness, given the strength of the strongest king they ever had.",
    ]),
    zechariahTwelve(9, 14, [
      "I will pour upon the house of David, and upon the inhabitants of Jerusalem, the spirit of grace and of supplications. Grace comes first, before anything else in the verse happens.",
      "And they shall look upon me whom they have pierced, and they shall mourn for him, as one mourneth for his only son. God speaks in the first person, then says they pierced him. The two are the same one.",
      "The mourning is not one crowd weeping together. It is family by family, house of David apart, house of Nathan apart, house of Levi apart, every remaining family apart, and their wives apart. Grief too personal to share, even with your own household.",
      "This is the same city Zechariah just called an unliftable stone and a cup of trembling to the nations. Now it is a house in mourning over the one it pierced.",
    ]),
    zechariahThirteen(1, 6, [
      "In that day there shall be a fountain opened to the house of David and the inhabitants of Jerusalem, for sin and for uncleanness. The mourning of chapter 12 does not stay mourning. It opens straight into cleansing.",
      "I will cut off the names of the idols out of the land, and they shall no more be remembered. Along with the idols go the prophets and the unclean spirit, swept out of the land in the same sentence.",
      "It gets so serious that if anyone tries to prophesy falsely again, his own father and mother thrust him through. A parent choosing truth over their own child, once idolatry is finally taken seriously.",
      "And one shall say unto him, What are these wounds in thine hands? Then he shall answer, those with which I was wounded in the house of my friends. Wounds from the very people who should have stood with him.",
    ]),
    zechariahThirteen(7, 9, [
      "Awake, O sword, against my shepherd, and against the man that is my fellow, saith the Lord of hosts. God calls the sword against his own shepherd, someone he names as his equal, his fellow.",
      "Smite the shepherd, and the sheep shall be scattered. One blow against one man breaks apart an entire flock. That is how tightly the sheep depend on him.",
      "Two parts in all the land are cut off and die, but the third is left. Not everyone survives what is coming. A remnant does, on purpose.",
      "I will bring the third part through the fire, and refine them as silver, and try them as gold. They will call on my name, and I will hear them. Fire that purifies rather than just destroys, ending in a people who can finally say, the Lord is my God.",
    ]),
    zechariahFourteen(1, 11, [
      "Behold, the day of the Lord cometh. All nations gathered against Jerusalem, the city taken, half the people led into captivity. Then, without transition, the Lord himself goes forth and fights, the way he fought in the day of battle.",
      "His feet shall stand in that day upon the mount of Olives, and the mount of Olives shall cleave in the midst thereof. A literal mountain splits into a valley, a way of escape opened for people who thought they had nowhere left to run.",
      "It shall be one day known to the Lord, not day nor night, but at evening time it shall be light. Time itself stops behaving normally once he is actually here.",
      "Living waters go out from Jerusalem, half toward one sea and half toward the other, in summer and in winter. And the Lord shall be king over all the earth. In that day there shall be one Lord, and his name one.",
    ]),
    zechariahFourteen(12, 21, [
      "This is the plague on the nations that fought against Jerusalem. Their flesh consumes away while they stand on their feet. Judgment that does not even wait for them to fall down.",
      "But past the plague, the chapter turns toward welcome. Every one that is left of all the nations shall go up from year to year to worship the King, the Lord of hosts, and to keep the feast of tabernacles. Former enemies, invited to the same feast.",
      "Whoever refuses to come gets no rain, Egypt included, river or no river. Worship is not optional in this kingdom, even for the nation that once enslaved Israel.",
      "Then the smallest detail closes the whole book. Upon the bells of the horses, HOLINESS UNTO THE LORD. Every pot in Jerusalem as holy as the bowls before the altar. Nothing set apart, nothing common, because there is no more Canaanite in the house of the Lord.",
    ]),
  ],
  closing: [
    ["So that is Day 277.", 700],
    ["Jerusalem became a stone too heavy to lift and a cup that makes the nations tremble, and God said he would fight for it himself.", 800],
    ["Then he poured out grace, and the people looked on the one they pierced and mourned him family by family, house by house, too personal to grieve together.", 850],
    ["A fountain opened for sin. The idols and the false prophets went out of the land. And then God called a sword against his own shepherd, a man he named his equal, and the flock scattered when he fell.", 850],
    ["Two thirds did not survive what came next. The third that did came out of the fire like refined silver, finally able to say, the Lord is my God.", 800],
    ["Then his feet stood on a mountain, and it split in two, and light came at evening, and living water flowed out of Jerusalem in every season.", 850],
    ["By the end, even the bells on the horses read holy to the Lord. Nothing left over, nothing common, and nations that once fought the city now climbing up to worship in it.", 850],
    ["Tomorrow, Malachi 1 through 3. The last prophet before four hundred years of silence.", 850],
    ["For now, sit with the wounds in his hands.", 750],
    ["Those with which I was wounded in the house of my friends.", 1200],
  ],
};
