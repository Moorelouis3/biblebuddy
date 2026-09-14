import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 208, written to the Day 1 standard.
 *
 * Isaiah 37-39 closes the Hezekiah narrative: the prayer that ends the
 * Assyrian siege, the sickness that nearly ends the king himself, and the
 * complacent response to Babylon that plants the seed of the exile. Six
 * blocks, two per chapter.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 208,
  title: "Hezekiah's Prayer and Warning",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 208.", 700],
    ["Judah just survived the worst threat of Hezekiah's reign. Now he survives something worse: his own body failing.", 850],
    ["And right after God adds years to his life, Hezekiah does something that will cost his descendants everything.", 800],
    ["This is a day about what a good king does with a second chance.", 750],
    ["We are in Isaiah 37, 38, and 39.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(37, 1, 13, [
      "Hezekiah's reaction to Rabshakeh's speech is immediate. When king Hezekiah heard it, he rent his clothes, and covered himself with sackcloth, and went into the house of the LORD. No counter-speech, no rallying the troops. Straight to the temple.",
      "He sends word to Isaiah calling this a day of trouble, and of rebuke, and of blasphemy, and asks him to lift up prayer for the remnant that is left. He knows Judah's own strength was never the issue.",
      "God's answer comes back through Isaiah: be not afraid of the words that thou hast heard, wherewith the servants of the king of Assyria have blasphemed me. God takes the mockery personally, aimed at Him, not just at Judah.",
      "Rabshakeh doesn't quit. Sennacherib hears that Tirhakah king of Ethiopia is coming against him, and fires off another letter with the same list of conquered gods, dressed up again as a warning.",
    ]),
    g(37, 14, 20, [
      "Hezekiah receives the letter and spreads it before the LORD. Not folded away, not answered with a letter of his own. Laid out in the temple for God to read.",
      "His prayer opens with who God is before what he needs: thou art the God, even thou alone, of all the kingdoms of the earth, thou hast made heaven and earth.",
      "He names exactly why the other nations' gods failed: they were no gods, but the work of men's hands, wood and stone, therefore they have destroyed them. Assyria never beat a god. It beat wood.",
      "His actual request, at the end, is bigger than his own safety: that all the kingdoms of the earth may know that thou art the LORD, even thou only.",
    ]),
    g(37, 21, 38, [
      "God's answer through Isaiah starts by naming who Sennacherib really insulted: against whom hast thou exalted thy voice, and lifted up thine eyes on high? even against the Holy One of Israel.",
      "God quotes the king's own boasting back to him, his chariots, his cedars cut down, rivers dried up with the soles of his feet, and answers only that He already knew. I have digged, and drunk water turns out to be nothing new to the one who did it of ancient times.",
      "The promise is specific enough to be proven wrong: he shall not come into this city, nor shoot an arrow there. Then it happens exactly that way. Not a battle. The angel of the LORD went forth, and smote in the camp of the Assyrians a hundred and fourscore and five thousand.",
      "Sennacherib goes home to Nineveh and is murdered by his own sons while worshipping in the house of Nisroch his god. The empire that mocked Judah's God can't protect him in his own temple.",
    ]),
    g(38, 1, 8, [
      "Right after the biggest victory of his reign, Hezekiah gets the worst news of his life. Set thine house in order: for thou shalt die, and not live. Deliverance from Assyria bought him no exemption from mortality.",
      "He turns his face to the wall and prays, reminding God how I have walked before thee in truth and with a perfect heart. Not a bargain, just an honest appeal, and he wept sore.",
      "God answers before Isaiah is out of the middle court: I have heard thy prayer, I have seen thy tears. Fifteen years are added, on the spot.",
      "The sign given is strange on purpose. The sun's shadow moves backward ten degrees on the dial of Ahaz. God doesn't just promise more years. He bends something nobody controls to prove it.",
    ]),
    g(38, 9, 22, [
      "Hezekiah's own written words about the sickness are stark: I said in the cutting off of my days, I shall go to the gates of the grave. He genuinely believed this was the end.",
      "He describes the waiting as the worst part: I reckoned till morning, that, as a lion, so will he break all my bones. I did mourn as a dove, mine eyes fail with looking upward.",
      "His reason for wanting to live isn't comfort, it's praise. The living, the living, he shall praise thee, as I do this day. The dead can't do that job, so he wants more days to do it.",
      "He closes remembering the ordinary means alongside the miracle: a lump of figs laid on the boil, in the same chapter as a sundial moving backward. God healed him through both a remedy and a wonder.",
    ]),
    g(39, 1, 8, [
      "Babylon sends a gift because they heard Hezekiah had been sick, and was recovered, and his response is to show them everything. There was nothing in his house that Hezekiah shewed them not. No caution at all, right after two chapters of prayer and dependence.",
      "Isaiah's question is simple and pointed: what have they seen in thine house? And Hezekiah's own answer convicts him. All that is in mine house have they seen.",
      "The prophecy that follows is exact. Everything he showed them, and that which thy fathers have laid up in store, will be carried to Babylon, his own sons among them, made eunuchs in a foreign palace.",
      "Hezekiah's reply is the uncomfortable ending. Good is the word of the LORD which thou hast spoken, for there shall be peace and truth in my days. He accepts the judgment because it won't cost him personally.",
    ]),
  ],
  closing: [
    ["So that is Day 208.", 700],
    ["A king who tore his clothes and ran to the temple instead of the battlefield. A prayer that named God before it named the problem.", 800],
    ["An angel who ended a siege without a single Judean sword drawn.", 800],
    ["And then, right after, a sickness that nearly did what Assyria couldn't.", 800],
    ["Hezekiah's prayer for his own life was desperate and honest. His response to Babylon's messengers was neither.", 850],
    ["He showed strangers everything he owned, and when told what it would cost his sons, he was relieved it wouldn't cost him.", 850],
    ["Tomorrow, Isaiah 40 through 42. The tone changes completely. Comfort, ye my people, and a servant who won't break a bruised reed.", 850],
    ["For now, sit with the sundial going backward.", 800],
    ["God didn't just add years.", 750],
    ["He bent something no one controls to prove He meant it.", 1200],
  ],
};
