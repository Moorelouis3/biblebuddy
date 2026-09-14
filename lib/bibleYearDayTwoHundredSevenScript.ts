import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 207, written to the Day 1 standard.
 *
 * Isaiah 34-36 swings from a scene of total judgment on the nations, through
 * ten verses of pure relief, straight into a real historical crisis:
 * Sennacherib's army at the wall and Rabshakeh's speech daring Judah to keep
 * trusting God. Six blocks — 34 and 36 split in half, 35 stays whole.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 207,
  title: "Judgment and Assyria's Threat",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 207.", 700],
    ["This one swings hard. A vision of total judgment on the nations, ten verses of pure relief, and then real history, an actual army standing outside Jerusalem's wall.", 850],
    ["Isaiah stops speaking only in pictures for a moment. Sennacherib's officer is at the gate, and he wants the people on the wall to hear him.", 800],
    ["Every word he says is built to make trusting God sound foolish.", 700],
    ["We are in Isaiah 34, 35, and 36.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(34, 1, 10, [
      "Come near, ye nations, to hear, and hearken, ye people. Isaiah calls the whole earth to witness this, not just Judah. The indignation of the LORD is upon all nations, and his fury upon all their armies.",
      "The image is brutal on purpose. The mountains shall be melted with their blood, and all the host of heaven shall be dissolved, and the heavens rolled together as a scroll. Nothing about this judgment is presented as small or contained.",
      "It lands on one nation by name. My sword shall be bathed in heaven, behold, it shall come down upon Idumea, upon the people of my curse, to judgment. The LORD hath a sacrifice in Bozrah, and a great slaughter in the land of Edom.",
      "Edom stood by while Jacob's family suffered, more than once across the Old Testament. This is not judgment falling out of nowhere. It is judgment answering a long pattern of cruelty toward a brother.",
    ]),
    g(34, 11, 17, [
      "What is left of Edom is described as emptiness with a plumbline and desolation with a level, the stones of emptiness and the line of confusion. Its nobles will have nothing to call a kingdom, and its princes will be nothing.",
      "Thorns come up in her palaces, nettles and brambles in the fortresses. It becomes a habitation of dragons and a court for owls, the wild beasts of the desert meeting the wild beasts of the island, the satyr crying to his fellow.",
      "The screech owl rests there and finds herself a place. Even the creatures nobody wants get somewhere to live in this ruin, which is exactly the point. What was once a fortress is now simply wild.",
      "Isaiah closes with a strange kind of confidence. Seek ye out of the book of the LORD, and read, no one of these shall fail. His mouth commanded it, his spirit gathered them. This devastation is not chaos. It is written down and kept.",
    ]),
    g(35, 1, 10, [
      "The wilderness and the solitary place shall be glad for them, and the desert shall rejoice and blossom as the rose. After the wasteland of Edom, the very next chapter opens with the opposite picture entirely.",
      "Strengthen ye the weak hands, and confirm the feeble knees. Say to them that are of a fearful heart, be strong, fear not, behold, your God will come with vengeance, he will come and save you. Comfort here is not denial. It names the fear first.",
      "Then the eyes of the blind shall be opened, and the ears of the deaf shall be unstopped, the lame man shall leap as an hart, and the tongue of the dumb sing. Waters break out in the wilderness, and streams in the desert.",
      "And an highway shall be there, called the way of holiness, the unclean shall not pass over it. The ransomed of the LORD shall return, and come to Zion with songs, and sorrow and sighing shall flee away. Not just rescued. Given somewhere to walk.",
    ]),
    g(36, 1, 10, [
      "Now it came to pass in the fourteenth year of king Hezekiah, that Sennacherib king of Assyria came up against all the fenced cities of Judah, and took them. This is not vision anymore. This is a dated, named invasion.",
      "Sennacherib sends Rabshakeh with a great army to Jerusalem, and he stands where the whole city can hear him, by the conduit of the upper pool. He is not just delivering a message. He is performing it.",
      "His opening line goes straight for confidence itself. What confidence is this wherein thou trustest. He calls Hezekiah's strategy vain words and mocks him for rebelling against Assyria without the power to back it up.",
      "Then he names Egypt directly. Lo, thou trustest in the staff of this broken reed, on Egypt, whereon if a man lean, it will go into his hand, and pierce it. So is Pharaoh unto all that trust on him. The very warning Isaiah gave two chapters ago is now being thrown back at Judah by an enemy.",
    ]),
    g(36, 11, 17, [
      "Hezekiah's officials, Eliakim, Shebna, and Joah, ask Rabshakeh to speak in Syrian, the diplomats' language, not in the Jews' language, so the people on the wall will not understand and lose heart.",
      "Rabshakeh refuses on purpose. Hath my master sent me to thy master and to thee to speak these words, and not to the men that sit on the wall. He raises his voice deliberately so the ordinary people listening will hear every word.",
      "He mocks their hunger and thirst under siege, then tells them not to let Hezekiah persuade them to trust in the LORD, saying, the LORD will surely deliver us. He is naming the exact thing Judah needs to hold onto, in order to talk them out of it.",
      "Then comes his offer. Make an agreement with me, and come out to me, and eat every man of his own vine, and every one of his fig tree, until I come and take you away to a land like your own land. Comfortable exile, dressed up as peace.",
    ]),
    g(36, 18, 22, [
      "Beware lest Hezekiah persuade you, saying, the LORD will deliver us. Hath any of the gods of the nations delivered his land out of the hand of the king of Assyria. He lists Hamath, Arpad, Sepharvaim, and asks where they were when their gods failed them.",
      "His logic is simple and, on the surface, hard to answer. Every other god has lost to Assyria. Why would the LORD be different. It is the same argument Judah has heard before, dressed up as plain common sense.",
      "But the people's response is total silence. But the people held their peace, and answered him not a word, for the king's commandment was, saying, answer him not. Not agreement. Not panic. Just obedience to what they were told to do.",
      "Eliakim, Shebna, and Joah come to Hezekiah with their clothes torn, and repeat Rabshakeh's words to him. The chapter ends on that image, an entire city holding its silence while its leaders carry the threat straight to the king.",
    ]),
  ],
  closing: [
    ["So that is Day 207.", 700],
    ["It started with a judgment so total the sky itself rolls up like a scroll. It turned, without warning, into a highway where the ransomed walk home singing.", 800],
    ["And then it landed on one afternoon in Jerusalem, one officer standing by a pool, using every argument he can find to make trusting God sound naive.", 850],
    ["Notice what he actually attacks. Not Judah's army. Their confidence. He wants them to believe the LORD will fail exactly like every other god has failed.", 800],
    ["And notice how the people answer him. Not with a clever comeback. With silence, because that is what they were told to do.", 800],
    ["Tomorrow, Isaiah 37 through 39. Hezekiah takes this exact threat straight into the temple, and finds out what happens when a king actually prays instead of just staying quiet.", 850],
    ["For now, sit with Rabshakeh's own words used against him.", 750],
    ["So is Pharaoh unto all that trust on him.", 800],
    ["Watch who Judah is actually trusting instead.", 1200],
  ],
};
