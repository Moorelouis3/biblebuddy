import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 21, written to the Day 1 standard.
 *
 * Genesis 49-50 closes the book: Jacob blesses all twelve sons at once,
 * dies, and is buried in Canaan, and then Joseph forgives his brothers
 * outright before dying in Egypt himself. Seven blocks - the twelve
 * blessings are grouped by weight rather than given one block each, so the
 * reading stays covered without pushing past seven.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 21,
  title: "Genesis Ends With Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 21. This is the last day in Genesis.", 750],
    ["Jacob is dying, and he calls all twelve sons to his bed at once.", 800],
    ["What he says to them is not a gentle goodbye. It is judgment, blessing, and old memory, all in the same breath.", 800],
    ["Then Jacob dies. And so, eventually, does Joseph.", 850],
    ["We are in Genesis 49 and 50. The end of one family's story, and a coffin left waiting in Egypt.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(49, 1, 12, [
      "Jacob calls his sons together to tell them what will happen to them in the last days. This is not sentiment. It is judgment, delivered from a deathbed with total clarity.",
      "Reuben goes first, the firstborn, my might, the beginning of my strength. Then the reversal. Unstable as water, thou shalt not excel, because thou wentest up to thy father's bed. One old choice, and the birthright is gone for good.",
      "Simeon and Levi are named together. Instruments of cruelty are in their habitations. Jacob still remembers Shechem, and he curses their anger, not their sons. I will divide them in Jacob, and scatter them in Israel.",
      "Then Judah. Not the oldest, not the favorite, but the one who gets the future. The sceptre shall not depart from Judah, nor a lawgiver from between his feet, until Shiloh come. A promise that outlasts every king Israel will ever crown.",
    ]),
    g(49, 13, 21, [
      "Six brothers move quickly now. Zebulun gets a haven by the sea. Issachar is called a strong ass couching between two burdens, who sees that rest is good, and bows his shoulder, and becomes a servant unto tribute. Comfort chosen over freedom.",
      "Dan will judge his own people. But Jacob pictures him as a serpent by the way, an adder in the path that bites the horse's heels. And right in the middle of the list, the old man breaks from prophecy into prayer. I have waited for thy salvation, O Lord.",
      "Gad gets overcome by a troop, and overcomes at last. Asher's bread is fat, yielding royal dainties. Naphtali is a hind let loose, giving goodly words. One line each, for lives Jacob has watched since the day they were born.",
      "Twelve sons. Twelve very different futures, spoken by a dying man who has known every single one of them since before they could speak.",
    ]),
    g(49, 22, 28, [
      "Joseph gets the longest blessing of all. A fruitful bough by a well, whose branches run over the wall. The archers have sorely grieved him, and shot at him, and hated him. The pit and the prison, folded into one line.",
      "But his bow abode in strength, and the arms of his hands were made strong by the hands of the mighty God of Jacob. Everything that tried to break Joseph made him stronger instead, because God was underneath it the whole time.",
      "Blessings of heaven above, blessings of the deep, blessings of the breasts and of the womb, blessings that prevail above the blessings of my progenitors. The old wanderer piles blessing on top of blessing onto the son he mourned as dead for over twenty years.",
      "Last comes Benjamin, in one hard line. He shall ravin as a wolf. Then Genesis closes the list on its own: these are the twelve tribes of Israel, and this is what their father spake unto them, blessing every one according to his blessing.",
    ]),
    g(49, 29, 33, [
      "Jacob stops blessing and starts commanding. Bury me with my fathers, in the cave that is in the field of Ephron the Hittite, before Mamre, in the land of Canaan.",
      "He names exactly who is already there. Abraham and Sarah, Isaac and Rebekah, and Leah. Not Rachel. He wants to lie next to the wife he never loved the way he loved her, because that is the family plot, and Jacob has stopped arguing with what is real.",
      "When he has made an end of commanding his sons, he gathers up his feet into the bed, and yielded up the ghost, and was gathered unto his people. No drama. Just a man lying down.",
      "The trickster who spent his whole life grabbing dies with everything finally settled. His sons blessed, his burial planned, his God still with him.",
    ]),
    g(50, 1, 14, [
      "Joseph falls upon his father's face, and wept upon him, and kissed him. This is the same man who runs an empire. Here he is just a son.",
      "He commands the physicians to embalm Israel, and it takes the full forty days. Egypt mourns him seventy days, longer than they would mourn one of their own.",
      "Joseph gets Pharaoh's leave to keep his oath, and a great company goes up with him, chariots and horsemen and Egyptian officials and his whole family. At the threshing floor of Atad they mourn so loudly that the Canaanites rename the place Abel-mizraim, the mourning of Egypt.",
      "They carry him to the cave of Machpelah, exactly where he asked, and then they all go back down to Egypt. The promise of the land is still just a grave in someone else's country.",
    ]),
    g(50, 15, 21, [
      "With their father gone, the brothers panic. Joseph will perhaps hate us, and will certainly requite us all the evil which we did unto him. Guilt does not expire just because time has passed.",
      "They send word claiming Jacob's dying instructions to forgive them, and when they finally speak to Joseph face to face, he weeps. Genesis does not say Joseph was tired of forgiving. It says he cried.",
      "They fall down before him and say, behold, we be thy servants. And Joseph answers with the line that holds the whole book together. Fear not: for am I in the place of God?",
      "As for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive. He does not say the evil did not happen. He says God was underneath it the whole time.",
    ]),
    g(50, 22, 26, [
      "Joseph lives a hundred and ten years, long enough to see Ephraim's children of the third generation, and to hold Machir's children on his own knees.",
      "Before he dies he says one thing to his brothers. I die: and God will surely visit you, and bring you out of this land unto the land which he sware to Abraham, to Isaac, and to Jacob. The whole book has been leading to a promise Joseph will not live to see kept.",
      "He makes them swear an oath, not that they will bury him now, but that whenever God does bring them out, they will carry his bones with them.",
      "So Genesis ends with a coffin in Egypt, not a grave in Canaan. The story is not over. It is only paused, waiting four hundred years for someone named Moses.",
    ]),
  ],
  closing: [
    ["So that is Day 21. And that is the end of Genesis.", 700],
    ["Twelve very different blessings, for twelve very different sons.", 700],
    ["Judah gets the scepter. Joseph gets everything else. Reuben, Simeon, and Levi get the truth about what they did.", 800],
    ["Jacob dies asking to be buried next to Leah, the wife he never really chose, because by then he has stopped fighting what is real.", 800],
    ["And Joseph says the line the whole book has been building toward. You meant evil. God meant it for good.", 850],
    ["Then Joseph dies too, a hundred and ten years old, and Genesis ends with his body in a coffin, still in Egypt.", 850],
    ["Tomorrow we leave Genesis behind. Exodus 1 through 4. A new king who never knew Joseph, and a baby in a basket.", 850],
    ["For now, hold on to what Joseph told his brothers.", 800],
    ["Ye thought evil against me.", 750],
    ["But God meant it unto good.", 1200],
  ],
};
