import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 243, written to the Day 1 standard.
 *
 * Ezekiel 19-21 is a second heavy stretch right after Day 242 - 95 verses,
 * closing on the sword song against Jerusalem and Ammon. Six blocks, each
 * kept to one chapter so the spoken reference and the reading never cross a
 * chapter boundary mid-block.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 243,
  title: "Lament and Sword",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 243. Today is a funeral in three parts.", 750],
    ["A lament for two kings, both dragged off in chains.", 800],
    ["A hard look back at Israel's whole history of rebellion, generation after generation.", 800],
    ["And a sword that God says will not sort the righteous from the wicked when it falls.", 800],
    ["There is one line buried in here worth waiting for. A crown removed, and a throne kept empty on purpose.", 800],
    ["We are in Ezekiel 19 through 21.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(19, 1, 14, [
      "A lioness raises cubs that grow into young lions and learn to hunt men. One is caught and dragged to Egypt in chains. The next is caught and dragged to Babylon, that his voice should no more be heard upon the mountains of Israel. Two actual kings, told as animals.",
      "Then the same mother becomes a vine, planted by good water, strong enough to grow branches fit for a ruler's scepter.",
      "Uprooted anyway. The east wind dries the fruit, the strong branches break, fire finishes what the wind started.",
      "It ends with the line that names exactly what this chapter is. She hath no strong rod to be a sceptre to rule. This is a lamentation, and shall be for a lamentation.",
    ]),
    ez(20, 1, 17, [
      "Elders sit down to inquire of the Lord, and God's answer through Ezekiel is a flat no. As I live, I will not be enquired of by you. A history lesson instead of an oracle.",
      "Back in Egypt, before the exodus even started, God already said cast away the idols of your eyes. And they refused, and kept them anyway.",
      "God says plainly why judgment did not fall there and then. I wrought for my name's sake, that it should not be polluted before the heathen. Mercy with a stated reason, not sentiment.",
      "In the wilderness God gives statutes which if a man do, he shall even live in them, and the sabbath as a sign between them. That generation rebels too, and God spares them again, for the same reason.",
    ]),
    ez(20, 18, 32, [
      "God tells the children not to repeat their parents' path. They walk the same road anyway.",
      "Then one of the hardest lines in Ezekiel. I gave them also statutes that were not good... that I might make them desolate, to the end that they might know that I am the LORD. Persistent rebellion handed the consequence of itself as its own judgment.",
      "Fast forward into the land. High places everywhere, one literally nicknamed Bamah, the shrine, unto this day. The habit outlived the generation that started it.",
      "God turns straight to the people standing in front of Ezekiel right now. Are ye polluted after the manner of your fathers? And refuses again to be inquired of. This history lesson was never really about the past.",
    ]),
    ez(20, 33, 49, [
      "The promise this time comes with a mighty hand, and with fury poured out, not gentle, but still a promise. God will bring them out again and purge the rebels from among them before anyone sets foot back in the land.",
      "Then the strange sarcasm. Go ye, serve ye every one his idols. Let it run its course, so the emptiness of it becomes obvious.",
      "The real turning point, named directly. Then shall ye remember your own evil ways... and shall loathe yourselves in your own sight for all your evils. Not shame imposed from outside, but self-recognition.",
      "And the reason, stated one more time. I have wrought with you for my name's sake, not according to your wicked ways. The chapter ends with an unquenchable fire in the south, and Ezekiel's own complaint that nobody thinks he is saying anything but riddles.",
    ]),
    ez(21, 1, 17, [
      "God tells Ezekiel to face Jerusalem and says something that should stop you cold. I will cut off from thee the righteous and the wicked. This sword does not sort people by merit when it falls on a whole city.",
      "Before Ezekiel says a word of it out loud, he is told to sigh, bitterly, in front of everyone, so his own body preaches the message before his mouth does.",
      "The sword itself gets described like a weapon prepared for inspection. Sharpened, furbished, made to glitter, made ready to be handed to the slayer.",
      "It does not spare the king's own family line either. It contemneth the rod of my son, as every tree. Even what should have been set apart gets tried the same as everything else.",
    ]),
    ez(21, 18, 32, [
      "The king of Babylon stands at a fork in the road and decides which city to attack by shaking arrows and reading a liver. God uses that pagan coin flip to point straight at Jerusalem anyway.",
      "Zedekiah gets named directly, though not by name. Thou profane wicked prince of Israel, whose day is come. Remove the diadem, take off the crown, because the crown itself is about to stop meaning anything.",
      "Then the one line in the whole chapter built to outlast the moment. I will overturn, overturn, overturn it: and it shall be no more, until he come whose right it is; and I will give it him. The throne stays empty on purpose, waiting for somebody specific.",
      "The sword turns on Ammon too before the chapter ends. The same weapon, judged in the very land where it was made, with no future memory left for it.",
    ]),
  ],
  closing: [
    ["So that is Day 243.", 700],
    ["A lioness raising cubs that grow into young lions and get dragged off in chains. A vine with no strong branch left to be anyone's scepter.", 800],
    ["Then the history lesson nobody wanted. Egypt, the wilderness, the children, and the same rebellion showing up in every single generation.", 850],
    ["One line in there is hard to sit with. God handing a stubborn people over to the consequences of their own choices, so they would know exactly who He is.", 850],
    ["And still He says they will remember, and loathe themselves, and He will do it for His name's sake, not because they earned anything.", 850],
    ["Then the sword. Drawn against righteous and wicked both, sharpened, made to glitter, handed to the executioner.", 800],
    ["But even there, one line refuses to end in ashes. The crown comes off, and the throne stays empty. Until he come whose right it is.", 850],
    ["Tomorrow, Ezekiel 22 through 24. Corruption named in full, and the sign of a siege that starts today.", 850],
    ["For now, hold on to the empty throne.", 750],
    ["It was kept that way on purpose.", 1200],
  ],
};
