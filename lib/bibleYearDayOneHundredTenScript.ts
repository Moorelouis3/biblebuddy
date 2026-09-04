import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 110, written to the Day 1 standard.
 *
 * 2 Chronicles 36 closes the book of Kings-and-Chronicles narrative with four
 * kings in rapid collapse, the temple burned, and the land in exile - then
 * hands off mid-sentence into Ezra 1, where a pagan king finishes Chronicles'
 * own closing line and sends the exiles home. Six blocks across four chapters.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const ezra = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezra ${chapter}:${startVerse}-${endVerse}`,
  book: "ezra",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 110,
  title: "Exile Ends and Worship Returns",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 110. The kingdom finally ends today.", 750],
    ["Four kings in a row, each one worse than the reforms could fix, until there is nothing left to reform.", 800],
    ["The temple burns. The walls come down. The people go to Babylon in chains.", 800],
    ["Then, seventy years later, a pagan king writes a letter, and it starts all over again.", 850],
    ["We are in 2 Chronicles 36, and Ezra 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(36, 1, 14, [
      "Four kings take the throne in this chapter, one after another, and none of them lasts long. Jehoahaz reigns three months before Egypt deposes him. Jehoiakim gets bound in bronze chains by Babylon. Jehoiachin reigns three months and ten days before Babylon takes him too, along with the temple's own vessels.",
      "Then comes Zedekiah, the last king Judah will have, and Chronicles sums him up in one line. He humbled not himself before Jeremiah the prophet, and stiffened his neck, and hardened his heart from turning to the Lord.",
      "It isn't only the kings anymore either. The chief priests and the people transgress after the abominations of the nations, and pollute the very house of the Lord that Josiah had reopened one generation earlier.",
      "Four kings, and the pattern only speeds up. Each reign is shorter than the last. This is what a slow-motion collapse looks like from the inside — not one dramatic fall, but momentum nobody stops.",
    ]),
    chron2(36, 15, 23, [
      "God does not do this without warning. He sends messengers rising up early, again and again, because he had compassion on his people and on his dwelling place. Every disaster in this chapter follows warnings nobody wanted to hear.",
      "So the wrath arises, till there was no remedy. Chronicles doesn't say God ran out of patience on a whim. It says the warnings ran out first.",
      "The Babylonians kill without mercy on young and old alike, and the temple, the palaces, and the wall all go up in flame. Everything Hezekiah defended and Josiah rebuilt ends as ash and rubble in the same afternoon.",
      "But watch the last line. The land finally keeps the Sabbaths it was owed, for seventy exact years, and then God stirs up a pagan king named Cyrus to send the people home. Judgment has a shape here, and an end date God set before anyone was ever exiled.",
    ]),
    ezra(1, 1, 11, [
      "Cyrus's decree is almost word for word what just closed 2 Chronicles, and that is not an accident. One book ends mid-sentence, and this one opens by finishing it. One story, split across two scrolls, with no gap in between.",
      "Cyrus is a Persian king with no covenant with Israel's God, and he still credits that God with giving him every kingdom on earth, then sends the exiles home to build him a house. God moves a foreign throne to keep a seventy-year-old promise.",
      "Not everyone goes. Only those whose spirit God had raised get up and leave settled, comfortable lives in Babylon for a ruined city most of them have never seen.",
      "And Cyrus hands back the exact gold and silver vessels Nebuchadnezzar looted from the temple decades earlier. Nothing taken from God's house stays lost forever. It waits in storage until the right king shows up to give it back.",
    ]),
    ezra(2, 1, 70, [
      "This whole chapter is a list. Family after family, name after name, counted down to the last few dozen people, because it matters to Ezra that this was not a symbolic remnant. These were real households walking home.",
      "Forty-two thousand three hundred and sixty people make the trip, plus servants and singers. A nation had shrunk down to a list you could read out loud in one sitting, and it still made the trip anyway.",
      "Some priests can't even prove their lineage, and get barred from serving until someone can consult God directly about it. Coming home didn't mean everything simply resumed. Identity and calling both had to be re-established, not assumed.",
      "A list like this reads like paperwork. It is actually a roll call of everyone Babylon didn't manage to erase.",
    ]),
    ezra(3, 1, 7, [
      "Before a single stone of the temple goes up, the people rebuild the altar first, and the text tells you why. Fear was upon them because of the people of those countries. They restart worship in the middle of real danger, not after it's gone.",
      "They keep the feast of tabernacles exactly as it is written, and start the daily burnt offerings again, morning and evening. The rhythm comes back before the building does. Worship does not wait for ideal circumstances.",
      "Once again cedar comes down from Lebanon to Joppa, the same route Solomon's builders used centuries earlier. This second temple starts exactly the way the first one did, materials and all.",
      "Verse 6 says it plainly. They started offering before the foundation of the temple was even laid. Obedience did not wait for the whole plan to be finished. It started with whatever could be done that day.",
    ]),
    ezra(3, 8, 13, [
      "In the second year, they finally lay the foundation, and they do it exactly the way David ordained it generations earlier. Priests in their robes, trumpets, Levites with cymbals, everyone praising because he is good, for his mercy endures forever.",
      "Then Ezra records something no one plans for. The people can't tell the shouting from the weeping. Old men who remember Solomon's temple see how much smaller this one is and weep. Everyone else shouts for joy that it exists at all.",
      "Both sounds are real. Both sounds are true. Something can be a massive comeback and a massive comedown in the same building, on the same day, for two different groups of people standing right next to each other.",
      "That noise, weeping and rejoicing tangled together so nobody could tell them apart, was heard a long way off. That is often exactly what restoration sounds like up close.",
    ]),
  ],
  closing: [
    ["So that is Day 110.", 700],
    ["Four kings, a burned temple, and seventy years of silence. Then a letter from a pagan king, and it all starts again.", 750],
    ["Notice what God used to bring His people home. Not a prophet from inside Israel. A Persian emperor who had never worshipped Him a day in his life.", 850],
    ["The altar goes up before the temple does. The offerings start before the building is finished. Obedience did not wait for perfect conditions, in Babylon's exile or in Jerusalem's rubble.", 850],
    ["And when the foundation finally goes down, some of them weep and some of them shout, at the exact same sound.", 800],
    ["That is what a homecoming looks like after seventy years. Not simple. Still real.", 800],
    ["Tomorrow, Ezra 4 through 7. The building stalls under opposition for years before anyone finishes it.", 850],
    ["For now, hold on to the vessels.", 750],
    ["Every one Babylon took, Cyrus counted out and gave back.", 750],
    ["Nothing taken from God's house stays gone forever.", 1200],
  ],
};
