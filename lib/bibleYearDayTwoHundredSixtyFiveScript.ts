import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 265, written to the Day 1 standard.
 *
 * Amos closes his book with a pun that turns into the bleakest verse he has
 * written, a vision where nowhere is far enough to hide, and then - with no
 * warning - a restoration promise that reaches past judgment entirely.
 * Obadiah follows immediately after, one chapter settling one grudge: Edom
 * stood at the border and watched Jerusalem fall. Seven blocks: two in
 * Amos 8, two in Amos 9, three across Obadiah's twenty-one verses.
 */

const amos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Amos ${chapter}:${startVerse}-${endVerse}`,
  book: "amos",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const obadiah = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Obadiah 1:${startVerse}-${endVerse}`,
  book: "obadiah",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 265,
  title: "Famine of the Word and Edom's Fall",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 264 ended with a priest trying to make Amos disappear, and Amos answering back with his own name and history instead.", 800],
    ["Today Amos finishes his book, and it ends two ways nobody would expect. First a famine unlike any other, then a promise nobody saw coming.", 850],
    ["Then a completely different, much shorter book starts, and it exists to settle exactly one grudge.", 800],
    ["We are in Amos 8 and 9, then all of Obadiah.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    amos(8, 1, 6, [
      "Thus hath the Lord GOD shewed unto me: and behold a basket of summer fruit. Amos, what seest thou? And I said, A basket of summer fruit. Then said the LORD, The end is come upon my people of Israel. In Hebrew the word for summer fruit and the word for end sound almost identical. God builds a whole vision out of a pun, and it lands like a verdict.",
      "The songs of the temple shall be howlings in that day. Worship music does not stop in this vision. It just changes into something nobody wants to sing.",
      "Hear this, O ye that swallow up the needy... making the ephah small, and the shekel great, and falsifying the balances by deceit. Amos gets specific again. Rigged scales, shrunk measures, every transaction quietly cheating the poorest person in the room.",
      "That we may buy the poor for silver, and the needy for a pair of shoes; yea, and sell the refuse of the wheat. The exact accusation from chapter two, repeated almost word for word. Nothing has changed since then except how much closer the end has gotten.",
    ]),
    amos(8, 7, 14, [
      "The LORD hath sworn by the excellency of Jacob, Surely I will never forget any of their works. God swearing by Israel's own pride turns their boast into the evidence against them.",
      "I will cause the sun to go down at noon, and I will darken the earth in the clear day. Not a normal night. A day that breaks its own rules, because what is coming does not fit inside ordinary time.",
      "Behold, the days come, saith the Lord GOD, that I will send a famine in the land, not a famine of bread... but of hearing the words of the LORD. This is the verse the whole book has been walking toward. Not silence from God as punishment for nothing. Silence as the last thing left after they refused every word already sent.",
      "They shall wander from sea to sea... to seek the word of the LORD, and shall not find it. Picture that. The very thing Amos could not get anyone to sit still and listen to becomes the thing people run every direction searching for, too late.",
    ]),
    amos(9, 1, 6, [
      "I saw the LORD standing upon the altar: and he said, Smite the lintel of the door, that the posts may shake... he that fleeth of them shall not flee away. The temple itself, the safest place anyone could imagine running to, is where the judgment starts.",
      "Though they dig into hell, thence shall mine hand take them; though they climb up to heaven, thence will I bring them down. Amos names the two farthest points anyone could imagine, straight down and straight up, and closes off both.",
      "Though they hide themselves in the top of Carmel... though they be hid from my sight in the bottom of the sea, thence will I command the serpent, and he shall bite them. A mountain and an ocean floor, the two places you would actually try to disappear into in that world. Neither one works either.",
      "The Lord GOD of hosts is he that toucheth the land, and it shall melt. The vision was never really about geography. It was always about whose hand is actually reaching everywhere.",
    ]),
    amos(9, 7, 15, [
      "Are ye not as children of the Ethiopians unto me, O children of Israel? Have not I brought up Israel out of the land of Egypt? and the Philistines from Caphtor, and the Syrians from Kir? God says He has moved nations before, not just this one. Being rescued once does not make a people exempt from everything after.",
      "I will sift the house of Israel among all nations, like as corn is sifted in a sieve, yet shall not the least grain fall upon the earth. Even inside the harshest image in the chapter, something survives the process on purpose. Sifting is violent, but nothing real gets lost in it.",
      "In that day will I raise up the tabernacle of David that is fallen, and close up the breaches thereof... that they may possess the remnant of Edom, and of all the heathen, which are called by my name. After a whole book of collapse, the very last section is rebuilding, and it reaches all the way to a fallen king's house standing again.",
      "I will bring again the captivity of my people of Israel, and they shall build the waste cities, and inhabit them... and I will plant them upon their land, and they shall no more be pulled up. Amos began by describing a nation about to be uprooted. He ends by promising a planting nobody will ever tear out again.",
    ]),
    obadiah(1, 9, [
      "The vision of Obadiah. Thus saith the Lord GOD concerning Edom. One verse of introduction, and then this entire short book aims at a single target, a nation with one specific history with Israel worth settling.",
      "The pride of thine heart hath deceived thee, thou that dwellest in the clefts of the rock, whose habitation is high; that saith in his heart, Who shall bring me down to the ground? Edom's capital sat carved into literal cliffs, nearly impossible to reach. Their safety became their whole theology.",
      "If thieves came to thee, if robbers by night, would they not have stolen till they had enough? if the grapegatherers came to thee, would they not leave some grapes? Even criminals and harvesters leave something behind. Obadiah says what is coming for Edom will not.",
      "How are the things of Esau searched out! how are his hidden things sought up! Edom is Esau's descendants, so this judgment carries an old family name with it, not just a foreign policy grievance.",
    ]),
    obadiah(10, 16, [
      "For thy violence against thy brother Jacob shame shall cover thee, and thou shalt be cut off for ever. The word brother is doing the work in this whole book. This was never a stranger's crime.",
      "In the day that the strangers carried away captive his forces... even thou wast as one of them. Edom's sin was not attacking directly. It was standing at the border doing nothing while Jerusalem fell, and Obadiah counts that the same as joining in.",
      "Thou shouldest not have looked on the day of thy brother... neither shouldest thou have rejoiced over the children of Judah in the day of their destruction... neither shouldest thou have stood in the crossway, to cut off those of his that did escape. Four separate should-nots, each one naming a moment Edom could have simply not done something, and did it anyway.",
      "For the day of the LORD is near upon all the heathen: as thou hast done, it shall be done unto thee: thy reward shall return upon thine own head. The one-line law of this whole book. Watching, mocking, and blocking the escape all come back around, measure for measure.",
    ]),
    obadiah(17, 21, [
      "But upon mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions. Obadiah turns from Edom's sentence to Israel's recovery in a single verse, no transition needed.",
      "The house of Jacob shall be a fire, and the house of Joseph a flame, and the house of Esau for stubble... and there shall not be any remaining of the house of Esau. History bore this out. Edom disappeared from the map centuries before Israel did.",
      "They shall possess the mount of Esau; and they of the plain the Philistines... and saviours shall come up on mount Zion to judge the mount of Esau. Every place that once threatened or mocked Israel gets listed as territory restored, one by one.",
      "And the kingdom shall be the LORD'S. Twenty-one verses about one very old grudge end on the only line that actually matters past it. Whatever nations rise or fall in between, the last word belongs to God, not Edom.",
    ]),
  ],
  closing: [
    ["So that is Day 265.", 700],
    ["Amos ends his own book with a famine of hearing the word, people running in every direction looking for what they refused to sit still for.", 800],
    ["And right after that, the same book promises a fallen house rebuilt and a planting that will never be pulled up again. Judgment was never the last chapter.", 850],
    ["Then Obadiah, twenty-one verses about a brother nation that just stood at the border and watched. Not an attacker. A bystander who cheered.", 850],
    ["As thou hast done, it shall be done unto thee. That line is not petty. It is Obadiah's whole case, stated once, plainly.", 800],
    ["And the very last line of the book reaches past Edom entirely. The kingdom shall be the LORD's.", 800],
    ["Tomorrow we start Jonah, and a prophet who runs the opposite direction from the one job he is actually good at.", 850],
    ["For now, sit with the famine.", 750],
    ["Not of bread. Of hearing.", 750],
    ["They looked everywhere but where it had already been offered.", 1200],
  ],
};
