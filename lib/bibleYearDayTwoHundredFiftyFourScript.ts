import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 254, written to the Day 1 standard.
 *
 * Daniel 4-6: Nebuchadnezzar's pride gets him turned out to eat grass with
 * the animals, his son Belshazzar watches it happen to his father and still
 * drinks out of God's own temple vessels, and a Median king signs a law he
 * cannot undo and nearly loses his best man to it. Six blocks, two per
 * chapter, matching Day 253's pattern.
 */

const dan = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Daniel ${chapter}:${startVerse}-${endVerse}`,
  book: "daniel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 254,
  title: "Proud Kings and the Lions' Den",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 254. Daniel 4 through 6.", 750],
    ["A king who built an empire out of his own strength gets turned out to eat grass like an animal.", 800],
    ["His son watches it happen to his own father, and does the same thing anyway, the same night the empire falls.", 800],
    ["And a new king signs a law he cannot undo, and it lands his best man in a den of lions.", 850],
    ["We are in Daniel 4 through 6.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    dan(4, 1, 18, [
      "Peace be multiplied unto you... his kingdom is an everlasting kingdom, and his dominion is from generation to generation. Nebuchadnezzar opens this chapter praising the true God, before he tells you why he needed to.",
      "I saw a dream which made me afraid... they did not make known unto me the interpretation thereof. Every wise man in his empire fails him again, same as the dream he forgot back in chapter two.",
      "But at the last Daniel came in before me, whose name was Belteshazzar... in whom is the spirit of the holy gods. Even the king admits it. Everyone else has already failed by the time he sends for Daniel.",
      "A tree grown so tall the whole earth can see it, then a voice from heaven orders it cut down to a stump, bound with iron and brass, its heart traded for a beast's. Nebuchadnezzar tells Daniel the whole dream before either of them says whose tree it is.",
    ]),
    dan(4, 19, 37, [
      "Belteshazzar was astonied for one hour... My lord, the dream be to them that hate thee. Before he explains anything, Daniel wishes this dream belonged to someone else. He likes this king.",
      "It is thou, O king, that art grown and become strong... break off thy sins by righteousness, and thine iniquities by shewing mercy to the poor. Daniel does not just predict the fall. He tells him exactly how to avoid it.",
      "At the end of twelve months he walked in the palace... Is not this great Babylon, that I have built... by the might of my power. A whole year passes, nothing happens, and Nebuchadnezzar decides the warning was wrong. Then he says so out loud.",
      "The same hour was the thing fulfilled... his hairs were grown like eagles' feathers... I blessed the most High... those that walk in pride he is able to abase. The most powerful man on earth eats grass until he finally says the one sentence that gets his mind back.",
    ]),
    dan(5, 1, 16, [
      "Belshazzar the king made a great feast... commanded to bring the golden and silver vessels which his father Nebuchadnezzar had taken out of the temple... they drank wine, and praised the gods of gold, and of silver. His own father wrote the last chapter of this book with his own mouth. Belshazzar drinks out of God's cups anyway.",
      "In the same hour came forth fingers of a man's hand, and wrote... the king's countenance was changed... the joints of his loins were loosed, and his knees smote one against another. Mid-party, no warning, a hand starts writing on his own wall.",
      "He offers to make someone third ruler in the kingdom for reading four words, and every wise man in the room fails, same as his father's wise men did, same as it always does in this book.",
      "There is a man in thy kingdom, in whom is the spirit of the holy gods. It is the queen, who was not even at the feast, who remembers Daniel. Belshazzar had him available his whole reign and never called for him until tonight.",
    ]),
    dan(5, 17, 31, [
      "Let thy gifts be to thyself, and give thy rewards to another; yet I will read the writing unto the king. Daniel takes the job and turns down the payment in the same breath.",
      "Thou his son, O Belshazzar, hast not humbled thine heart, though thou knewest all this. Daniel does not explain who Nebuchadnezzar was or what happened to him. He assumes Belshazzar already knows. He does.",
      "MENE, MENE, TEKEL, UPHARSIN. Thou art weighed in the balances, and art found wanting; thy kingdom is divided, and given to the Medes and Persians. Three words. No dream to interpret this time, just a sentence already passed.",
      "In that night was Belshazzar the king of the Chaldeans slain... Darius the Median took the kingdom. Daniel is still being praised for the interpretation when it comes true.",
    ]),
    dan(6, 1, 15, [
      "This Daniel was preferred above the presidents and princes... they could find none occasion nor fault; forasmuch as he was faithful. Under a new king, in a new empire, decades after he arrived as a captive teenager, they go looking for a scandal on Daniel and cannot find one.",
      "We shall not find any occasion against this Daniel, except we find it against him concerning the law of his God. They cannot get him to be a hypocrite, so instead they make it illegal for him to be faithful.",
      "When Daniel knew that the writing was signed, he went into his house... his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed... as he did aforetime. He hears the trap is set and changes nothing. Same window, same hours, same God.",
      "The king was sore displeased with himself, and set his heart on Daniel to deliver him: and he laboured till the going down of the sun to deliver him. Darius spends the whole day trying to outsmart a law he wrote himself, and cannot.",
    ]),
    dan(6, 16, 28, [
      "Thy God whom thou servest continually, he will deliver thee. The king who signed the decree is the one saying this to Daniel as the stone goes over the den.",
      "The king went to his palace, and passed the night fasting... his sleep went from him. Daniel is down in the den with the lions. Darius is the one who cannot rest.",
      "O Daniel, servant of the living God, is thy God able to deliver thee from the lions? My God hath sent his angel, and hath shut the lions' mouths. Daniel's answer is not that the lions turned out friendly. It is that God shut their mouths on purpose.",
      "I make a decree, That in every dominion of my kingdom men tremble and fear before the God of Daniel... He delivereth and rescueth. The same king who nearly killed him ends the chapter making the whole empire honor Daniel's God by law.",
    ]),
  ],
  closing: [
    ["So that is Day 254.", 700],
    ["Two kings, two nights, and the same lesson neither one could skip.", 750],
    ["Nebuchadnezzar built an empire out of his own strength and ate grass until he said so out loud.", 800],
    ["Belshazzar watched it happen to his own father and still drank out of God's cups anyway.", 800],
    ["And Darius signed a law he could not undo, then fasted the whole night for the one man it trapped.", 850],
    ["Daniel did not change through any of it. Same window, same three times a day, whoever was on the throne.", 850],
    ["Tomorrow, Daniel 7 through 9. Daniel stops interpreting other men's dreams and starts having his own, then prays one of the most desperate prayers in the whole book.", 850],
    ["For now, sit with what actually stopped both kings.", 800],
    ["Not armies. Not lions.", 750],
    ["A God who numbers, weighs, and delivers.", 1200],
  ],
};
