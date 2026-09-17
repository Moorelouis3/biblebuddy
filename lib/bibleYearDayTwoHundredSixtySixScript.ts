import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 266, written to the Day 1 standard.
 *
 * Jonah is the shortest story with the loudest turn: a prophet runs the
 * opposite direction from Nineveh, gets thrown into a storm he caused,
 * prays from inside a fish, and then watches the worst city he knows
 * repent in a single day. Five blocks: two in chapter 1, one in chapter 2,
 * two across chapter 3.
 */

const jonah = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jonah ${chapter}:${startVerse}-${endVerse}`,
  book: "jonah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 266,
  title: "Running, Mercy, and Repentance",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 265 ended with a promise that reached past Amos and past Edom entirely. The kingdom shall be the LORD's.", 800],
    ["Today we meet a prophet who already believes that, and hates what it means.", 800],
    ["God tells him to go one direction. He books passage in the exact opposite one.", 800],
    ["Then a storm, a fish, a prayer, and a city that repents faster than the prophet ever wanted it to.", 850],
    ["We are in Jonah 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    jonah(1, 1, 6, [
      "Arise, go to Nineveh, that great city, and cry against it; for their wickedness is come up before me. Nineveh is the capital of Assyria, the empire that will eventually crush Israel. God is sending an Israelite prophet to warn his own nation's future killers.",
      "But Jonah rose up to flee unto Tarshish from the presence of the LORD. Tarshish is the farthest known point in the opposite direction. Jonah does not hesitate or negotiate. He runs immediately and completely.",
      "The LORD sent out a great wind into the sea, and there was a mighty tempest, so that the ship was like to be broken. Jonah does not outrun the command. He just relocates the confrontation to a boat in the middle of a storm.",
      "But Jonah was gone down into the sides of the ship, and he lay, and was fast asleep. Pagan sailors are praying to every god they know while the one man who actually knows the true God is unconscious below deck.",
    ]),
    jonah(1, 7, 17, [
      "They cast lots, and the lot fell upon Jonah. I am an Hebrew, and I fear the LORD, the God of heaven, which hath made the sea and the dry land. Jonah's own confession accuses him. He names God as maker of the very sea trying to kill them.",
      "Take me up, and cast me forth into the sea; so shall the sea be calm unto you: for I know that for my sake this great tempest is upon you. Jonah would rather die than go to Nineveh. That is how much he does not want them saved.",
      "The men rowed hard to bring it to the land, but they could not. Then they cried unto the LORD, we beseech thee, let us not perish for this man's life, and lay not upon us innocent blood. Sailors who worshipped other gods an hour ago are now the ones pleading with the God of Israel for mercy.",
      "The LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights. This is not a punishment on top of the sea. It is the rescue. The fish is how Jonah does not drown.",
    ]),
    jonah(2, 1, 10, [
      "Then Jonah prayed unto the LORD his God out of the fish's belly. I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice. He prays from inside the very thing that saved him, before he knows it will let him out.",
      "I am cast out of thy sight; yet I will look again toward thy holy temple. Even certain he has been thrown away, he keeps looking the same direction he was refusing to walk.",
      "They that observe lying vanities forsake their own mercy. But I will sacrifice unto thee with the voice of thanksgiving. Salvation is of the LORD. Three words settle the whole prayer. He is not the one doing the saving, and he knows it.",
      "The LORD spake unto the fish, and it vomited out Jonah upon the dry land. No ceremony, no fanfare. Just back on solid ground, exactly where the command first found him.",
    ]),
    jonah(3, 1, 4, [
      "The word of the LORD came unto Jonah the second time, saying, Arise, go unto Nineveh. Same city. Same command. No lecture about the storm or the fish. God simply repeats Himself.",
      "So Jonah arose, and went unto Nineveh, according to the word of the LORD. That is the whole verse. No enthusiasm recorded, no change of heart. Just obedience, finally, on the second try.",
      "Now Nineveh was an exceeding great city of three days' journey. This is not a village. It is one of the largest cities on earth, and Jonah walks into the middle of it alone.",
      "Yet forty days, and Nineveh shall be overthrown. Eight words. No altar call, no offer of mercy stated out loud. Just a countdown, delivered by a man who is clearly hoping it comes true.",
    ]),
    jonah(3, 5, 10, [
      "So the people of Nineveh believed God, and proclaimed a fast, from the greatest of them even to the least of them. One sentence, and an entire empire's capital turns. Compare that to how long Israel's own prophets got ignored.",
      "The king arose from his throne, laid his robe from him, covered him with sackcloth, and sat in ashes. The most powerful man in the region sits in the dirt because of eight words from a foreign prophet he never met.",
      "Let man and beast be covered with sackcloth, and cry mightily unto God: yea, let them turn every one from his evil way, and from the violence that is in their hands. The king does not just ask for feeling sorry. He names the actual thing that has to stop. Violence.",
      "God saw their works, that they turned from their evil way; and God repented of the evil that he had said he would do unto them, and he did it not. The forty days never run out. The whole point of the sermon was for it not to come true.",
    ]),
  ],
  closing: [
    ["So that is Day 266.", 700],
    ["A prophet ran the opposite direction from the one job God gave him, and got thrown into the sea for it.", 800],
    ["Then he prayed from inside a fish, and the fish is what saved him, not what punished him.", 800],
    ["And when he finally went, eight words turned an entire empire's capital toward God faster than his own nation ever turned.", 850],
    ["Jonah never argues that the message won't work. He runs because he is afraid it will.", 800],
    ["He knew exactly who God is. Gracious, and merciful, and slow to anger. That is not a guess. He says it out loud tomorrow, and it is the real reason he ran.", 850],
    ["Tomorrow we finish Jonah and start Micah. A prophet furious that mercy worked, and a new book naming what justice actually requires.", 850],
    ["For now, sit with Nineveh.", 750],
    ["The worst city he knew.", 750],
    ["It repented before he finished the sentence.", 1200],
  ],
};
