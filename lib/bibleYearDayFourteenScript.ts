import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 14, written to the Day 1 standard.
 *
 * Genesis 34-36 is three chapters and a hard turn in tone: a family crime at
 * Shechem, then Jacob's return to Bethel shadowed by two deaths, then a full
 * chapter of Esau's genealogy. Genesis 36 is almost entirely names, so blocks
 * 5-7 run shorter, two- and three-line teaching, the way Day 9 consolidated
 * its heaviest reading. Seven blocks total.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FOURTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 14,
  title: "Esau's Line",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 14. This one turns dark fast, and then it turns into a list of names.", 750],
    ["Dinah goes out to see the land, and what happens to her breaks the family apart.", 800],
    ["Then Jacob goes back to the place he met God, and loses his father and his wife on the same road.", 800],
    ["And the chapter closes with a genealogy. Esau's whole family, generation by generation.", 900],
    ["Stay with the names. Genesis does not throw people away, even the ones the promise did not go through.", 1000],
    ["We are in Genesis 34, 35, and 36. A city destroyed, a grave, a grave, and a long list of dukes.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(34, 1, 17, [
      "Dinah goes out to see the daughters of the land, and Shechem, the prince of the country, takes her and lies with her and defiles her. That is what the text says, plainly, before anything else.",
      "Then something complicates it without undoing it. His soul clave unto Dinah, and he loved her, and spoke kindly to her, and asked his father to get her for a wife. Genesis records both sentences and does not let one erase the other.",
      "Jacob hears his daughter has been defiled and says nothing until his sons come in from the field. That silence hangs over the whole chapter.",
      "Hamor arrives offering everything. Marry into us, dwell here, trade here, take the land. It sounds generous. The sons are not listening for generous.",
    ]),
    g(34, 18, 31, [
      "Genesis tells you outright how the brothers answer. Deceitfully. They set a condition, that every male in the city be circumcised, and Hamor talks his whole city into it.",
      "On the third day, while the men are still in pain, Simeon and Levi, Dinah's full brothers, take their swords and kill every male, and take Dinah out of Shechem's house.",
      "The rest of the sons come behind them and plunder the city. Flocks, wealth, wives, and children, all taken.",
      "Jacob is furious, not at the cruelty, but at the exposure. You have made me stink among the people of this land. His sons answer with the one line nobody in the chapter can fully argue with. Should he deal with our sister as a harlot?",
    ]),
    g(35, 1, 15, [
      "God speaks again. Arise, go up to Bethel, and dwell there, and make an altar to the God who appeared to you when you fled from your brother. The same place from the stairway and the stone.",
      "And this time Jacob prepares for it. He tells his household to put away the strange gods among them and change their garments. A real cleaning, not just a trip.",
      "They travel, and the terror of God falls on the surrounding cities, so nobody pursues them after what happened at Shechem.",
      "At Bethel, God confirms it again. Your name shall not be called Jacob anymore, but Israel. A nation and a company of nations shall come from you. The promise made in the dark at the Jabbok is now spoken again, in daylight, by God Himself.",
    ]),
    g(35, 16, 29, [
      "They travel on toward Ephrath, and Rachel goes into hard labor and does not survive it. With her last breath she names the boy Ben-oni, son of my sorrow. Jacob renames him Benjamin.",
      "She is buried on the road to Bethlehem, and Jacob sets a pillar over her grave. The woman he worked fourteen years for is gone before they finish the journey home.",
      "Then one more wound, told in a single verse. Reuben lies with Bilhah, his father's concubine, and Israel hears of it. Nothing is said in the moment. It will not be forgotten either.",
      "The chapter ends with Isaac's death at a hundred and eighty years old, and his sons Esau and Jacob bury him together. Two brothers, one more time, standing at the same grave, the way Isaac and Ishmael once stood at Abraham's.",
    ]),
    g(36, 1, 19, [
      "Now these are the generations of Esau, who is Edom. His wives, his sons, the names are given in full, the same care Genesis gives Jacob's line.",
      "Esau takes his whole household and moves away from Jacob, because the land could not support both their herds together. The same reason Abraham and Lot once had to separate.",
      "He settles in Mount Seir, and his sons become the dukes of Edom. A whole nation starts here, outside the promise, and Genesis still writes its history down.",
    ]),
    g(36, 20, 30, [
      "Before Esau's family, the Horites already lived in that land, and their names get recorded too. Lotan, Shobal, Zibeon, Anah, and more.",
      "One small human detail survives inside the list. This Anah is the one who found the mules in the wilderness while feeding his father's donkeys. A whole life, kept alive in one clause.",
      "Even a chapter built almost entirely of names has room for one person to be remembered for one specific thing he did.",
    ]),
    g(36, 31, 43, [
      "The chapter closes with the kings who reigned in Edom before any king reigned over Israel. A nation with a throne long before Jacob's descendants had one of their own.",
      "Then a final roll call of dukes, listed by their territories, closing out the account of Esau completely.",
      "This is the last time Genesis lingers on Esau. He does not carry the promise, and the Bible still gives him a full and honest page before moving on for good.",
    ]),
  ],
  closing: [
    ["So that is Day 14.", 700],
    ["A city destroyed over what was done to one daughter, a return to Bethel, two graves, and a genealogy.", 700],
    ["Notice what Genesis refuses to do with any of it. It does not excuse Shechem, and it does not excuse Simeon and Levi either. It just tells you exactly what each of them did.", 800],
    ["Jacob came back to the place where he first heard I am with you, and immediately buried his wife and his father.", 800],
    ["Faith did not exempt him from grief. It just met him inside it.", 850],
    ["And then a whole chapter for the brother who walked away from the promise, because even he was not written out of the story.", 850],
    ["Tomorrow, Genesis 37 and 38. Jacob's favorite son gets a coat, and his brothers cannot stand him for it.", 850],
    ["For now, hold on to the pillar on the road to Bethlehem.", 800],
    ["Rachel's grave, marked by her husband's own hand.", 750],
    ["Right there on the way home.", 1200],
  ],
};
