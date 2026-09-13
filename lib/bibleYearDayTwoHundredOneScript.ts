import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 201, written to the Day 1 standard.
 *
 * Isaiah 16-18 keeps working through the burdens: Moab pleads for shelter
 * from Judah, Damascus and Ephraim fall together as the allies they were,
 * and the oracle reaches all the way to Ethiopia. Five blocks, since the
 * reading is lighter than yesterday's.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 201,
  title: "Pride, Refuge, and the Nations",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 201.", 650],
    ["Moab is still reeling from yesterday, and today it goes looking for somewhere to hide.", 750],
    ["Then the burden moves to Damascus, and Ephraim gets swept up in it too.", 800],
    ["Then, strangest of all, Isaiah has something to say to Ethiopia.", 800],
    ["Every nation in these chapters is scrambling. One king is not.", 850],
    ["We are in Isaiah 16, 17, and 18.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(16, 1, 5, [
      "Moab, already reeling from chapter 15, gets one instruction. Send ye the lamb to the ruler of the land... unto the mount of the daughter of Zion. Send tribute, and go looking for cover, before it is too late.",
      "The plea for asylum is blunt. Let mine outcasts dwell with thee, Moab; be thou a covert to them from the face of the spoiler. Moab is asked to shelter the very refugees it usually looks down on.",
      "And right in the middle of a chapter about a collapsing pagan nation, a promise about a different throne shows up. In mercy shall the throne be established: and he shall sit upon it in truth in the tabernacle of David, judging, and seeking judgment, and hasting righteousness. While every other throne in this section falls, one throne is built on mercy and never comes down.",
      "That is the pattern running under this whole nations section. Every empire that trusts itself collapses. The one king Isaiah keeps circling back to governs by mercy and righteousness instead.",
    ]),
    isa(16, 6, 14, [
      "Isaiah names exactly why Moab falls. We have heard of the pride of Moab; he is very proud: even of his haughtiness, and his pride, and his wrath: but his lies shall not be so. Not a lack of strength. Pride that outran the truth.",
      "The mourning that follows reads like a farmer grieving his own land. I will bewail with the weeping of Jazer the vine of Sibmah; I will water thee with my tears, O Heshbon. Isaiah writes himself into the poem, crying over crops that used to feed a whole nation.",
      "Moab's religion gets one blunt verdict. When it is seen that Moab is weary on the high place, that he shall come to his sanctuary to pray; but he shall not prevail. All that worship, and it does not work, because it was never aimed at the true God.",
      "Then Isaiah adds a timestamp that makes it undeniable. Within three years, as the years of an hireling, the glory of Moab shall be contemned... and the remnant shall be very small and feeble. This is not vague poetry. It is a countdown.",
    ]),
    isa(17, 1, 6, [
      "The burden shifts to Damascus, Syria's capital, and it starts as blunt as it gets. Damascus is taken away from being a city, and it shall be a ruinous heap. No slow decline. A city erased from the list of cities.",
      "The oracle turns and includes Israel too. The fortress also shall cease from Ephraim, and the kingdom from Damascus... they shall be as the glory of the children of Israel. Syria and Israel had allied against Judah back in chapter 7. Isaiah judges the alliance as one unit.",
      "Ephraim's fall gets pictured as a body wasting away. The glory of Jacob shall be made thin, and the fatness of his flesh shall wax lean. A kingdom that looked strong and healthy from the outside is actually starving from within.",
      "And what is left afterward is deliberately small. As the gleaning grapes when the vintage is done. Two or three berries in the top of the uppermost bough, four or five in the outmost fruitful branches. Not annihilation. A remnant, thin as the last fruit left on a picked tree.",
    ]),
    isa(17, 7, 14, [
      "Out of that thinning comes an actual turn. At that day shall a man look to his Maker, and his eyes shall have respect to the Holy One of Israel. Loss is what finally gets Ephraim looking in the right direction.",
      "What he stops looking to is named directly. He shall not look to the altars, the work of his hands... either the groves, or the images. Man-made religion gets abandoned the moment it is exposed as useless.",
      "Isaiah gives the reason for all of it in one line. Thou hast forgotten the God of thy salvation, and hast not been mindful of the rock of thy strength. Not ignorance. Forgetting something they once knew.",
      "Then the chapter ends with a picture of invading armies that seemed unstoppable. At eveningtide trouble; and before the morning he is not. Whatever roars like the sea at night can be gone completely by sunrise, once God says so.",
    ]),
    isa(18, 1, 7, [
      "Isaiah turns south, to a land shadowing with wings beyond the rivers of Ethiopia, sending swift messengers by sea in vessels of bulrushes. Cush is scrambling for alliances against Assyria, and Isaiah watches the diplomacy happen in real time.",
      "God's response to all that frantic maneuvering is almost unsettling. I will take my rest, and I will consider in my dwelling place like a clear heat upon herbs. While nations race around building coalitions, God simply watches, unhurried.",
      "Then He explains why waiting is not the same as doing nothing. Afore the harvest, when the bud is perfect... he shall both cut off the sprigs with pruning hooks, and take away and cut down the branches. God intervenes right before a threat fully ripens, not after.",
      "The chapter closes with a picture that answers every empire in this section. A present shall be brought unto the LORD of hosts... to the place of the name of the LORD of hosts, mount Zion. Nations that once terrified Judah end up bringing gifts to the same mountain Isaiah called a refuge back in chapter 16.",
    ]),
  ],
  closing: [
    ["So that is Day 201.", 700],
    ["Moab pleading for shelter, Damascus erased overnight, Ephraim thinned to a few berries on a picked tree, and Ethiopia sending messengers nobody asked for.", 800],
    ["Every single one of them is moving. Scrambling, mourning, negotiating, trying to save something.", 800],
    ["And God says, I will take my rest, and I will consider in my dwelling place.", 850],
    ["Not because He does not care what happens. Because He already knows how it ends.", 850],
    ["The throne established in mercy back in chapter 16 is still standing at the end of chapter 18, and it never once had to scramble.", 850],
    ["Tomorrow, Isaiah 19 through 21. Egypt, Babylon, and the nations keep learning the same lesson.", 850],
    ["For now, carry the picture of harvest.", 750],
    ["God cuts off the branch before it ever finishes ripening.", 1200],
  ],
};
