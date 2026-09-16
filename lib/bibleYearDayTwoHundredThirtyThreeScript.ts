import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 233, written to the Day 1 standard.
 *
 * Jeremiah 46-48: the prophet turns from Judah to the nations around it.
 * Egypt's army breaks at Carchemish and runs, but Jacob gets a promise of
 * rescue in the same breath Egypt gets a sentence. The Philistines are told
 * to put down a sword they cannot put down. And Moab, comfortable and proud
 * for generations because it never had to move, gets the longest judgment
 * speech in the book - one God says He weeps while giving. Six blocks
 * across three chapters (82 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 233,
  title: "Judgment on the Nations",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 233. Jeremiah stops talking about Judah for a while and starts talking about everyone else.", 750],
    ["Egypt's army breaks and runs at a river called Carchemish, and it becomes the picture for everything that follows.", 800],
    ["The Philistines get a word they cannot obey. Moab, comfortable for generations, finally has to move.", 800],
    ["And in the middle of it, God says the one thing you would not expect Him to say about a nation He is destroying.", 850],
    ["We are in Jeremiah 46, 47, and 48.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(46, 1, 12, [
      "This word comes against Egypt, at the moment its army meets Babylon's at Carchemish, by the river Euphrates, and loses.",
      "The command to arm up gets shouted, and then immediately undercut. Order ye the buckler and shield. Wherefore have I seen them dismayed and turned away back? The army that was told to march is already fleeing before the poem finishes.",
      "Egypt rises like the flood of its own river, boasting, I will go up, and will cover the earth. Then the LORD of hosts has a sacrifice in the north country by the river Euphrates. The boast and the slaughter sit one line apart.",
      "Go up into Gilead, and take balm, O virgin, the daughter of Egypt. In vain shalt thou use many medicines; for thou shalt not be cured. Egypt reaches for the nation's own famous remedy, and it does not work this time.",
    ]),
    g(46, 13, 28, [
      "Now the word turns to what comes next. Nebuchadrezzar king of Babylon will come and smite the land of Egypt itself, not just its army on foreign ground.",
      "Why are thy valiant men swept away? They stood not, because the LORD did drive them. Egypt's soldiers do not just lose a battle. They are actively driven, and Pharaoh gets a nickname for it. Pharaoh king of Egypt is but a noise; he hath passed the time appointed.",
      "The daughter of Egypt shall be confounded; she shall be delivered into the hand of the people of the north. Her hired soldiers, fed and fattened, turn and run with everyone else the moment the day of calamity actually arrives.",
      "Then, in the very next breath, aimed at a completely different people. Fear not thou, O my servant Jacob. I am with thee, to make a full end of all the nations, but I will not make a full end of thee. Egypt gets an ending. Jacob gets correction and a future.",
    ]),
    g(47, 1, 7, [
      "This word against the Philistines comes before Pharaoh strikes Gaza, so Jeremiah is naming a disaster that has not landed yet.",
      "Waters rise up out of the north, an overflowing flood, and the fathers shall not look back to their children for feebleness of hands. Panic so total that parents cannot even turn around for their own kids.",
      "Baldness is come upon Gaza, Ashkelon is cut off. How long wilt thou cut thyself. Grief so physical it shows on the skin.",
      "Then the strangest line in the chapter, spoken to the weapon itself. O thou sword of the LORD, how long will it be ere thou be quiet? Put up thyself into thy scabbard, rest, and be still. Even Jeremiah wants the judgment to stop. It cannot, because the LORD hath given it a charge, and there hath He appointed it.",
    ]),
    g(48, 1, 10, [
      "Now Moab. Woe unto Nebo, for it is spoiled. City after city gets named in the same breath as its coming ruin, Kiriathaim, Horonaim, Luhith, faster than you can picture any of them.",
      "Flee, save your lives, and be like the heath in the wilderness. Because thou hast trusted in thy works and in thy treasures, thou shalt also be taken. The false god Chemosh goes into captivity right alongside his own worshippers.",
      "Then one line that reaches straight past Moab at everyone listening. Cursed be he that doeth the work of the LORD deceitfully, and cursed be he that keepeth back his sword from blood. Half-obedience to a hard assignment gets its own curse here.",
      "The spoiler shall come upon every city, and no city shall escape. Nowhere in Moab gets to sit this one out.",
    ]),
    g(48, 11, 29, [
      "Moab hath been at ease from his youth, settled on his lees, never emptied from vessel to vessel, never gone into captivity. A wine that was never poured out to be refined, so it kept every bit of its old taste and its old scent.",
      "That ease is exactly the problem. I will send unto him wanderers, that shall cause him to wander, and shall empty his vessels. The comfort that felt like blessing was just judgment that had not started yet.",
      "How say ye, we are mighty and strong men for the war? Moab is spoiled, and his chosen young men are gone down to the slaughter. The confidence and the collapse are named back to back, on purpose.",
      "We have heard the pride of Moab, his loftiness, and his arrogancy, and the haughtiness of his heart. Three words piled on top of each other for the same sin, because one was not going to be enough to describe it.",
    ]),
    g(48, 30, 47, [
      "I know his wrath, saith the LORD, but it shall not be so; his lies shall not so effect it. God is not fooled by Moab's bluster even at the end.",
      "And then this, from the one pronouncing the sentence. Therefore will I howl for Moab, and I will cry out for all Moab; mine heart shall mourn for the men of Kir-heres. The judge grieves the verdict He is required to give.",
      "Joy and gladness is taken from the plentiful field. I have caused wine to fail from the winepresses; none shall tread with shouting. Every image of a normal harvest gets shut off, one at a time.",
      "Yet will I bring again the captivity of Moab in the latter days, saith the LORD. Thus far is the judgment of Moab. Even the longest judgment speech in the book does not get the last word. Restoration does.",
    ]),
  ],
  closing: [
    ["So that is Day 233.", 700],
    ["Egypt's army boasted it would cover the earth, and then ran the moment the fighting actually started.", 800],
    ["The Philistines got a sword that could not be sheathed, even when Jeremiah himself wished it could.", 800],
    ["And Moab, comfortable and proud for generations because it never had to move, finally got poured out.", 850],
    ["But in the middle of Egypt's sentence, Jacob got a promise. Fear not, I am with thee, I will not make a full end of thee.", 800],
    ["And over Moab's ruin, God says He howls. The one giving the verdict is not glad to give it.", 800],
    ["Tomorrow, Jeremiah 49 through 51. More nations, and then Babylon itself gets the same word it delivered to everyone else.", 850],
    ["For now, sit with the judge who weeps over the sentence.", 800],
    ["I will howl for Moab.", 750],
    ["Even judgment costs Him something.", 1200],
  ],
};
