import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 54, written to the Day 1 standard.
 *
 * Deuteronomy 26-29: the firstfruits basket and the recited creed, the
 * third-year tithe and Israel's mutual vow with God, the stones plastered
 * with the law and the altar on Mount Ebal, the twelve curses recited
 * antiphonally between two mountains, the blessings of chapter 28, then
 * its long list of curses condensed into one block the way Leviticus 26
 * was on Day 38, and Moses renewing the covenant in Moab. Seven blocks,
 * with chapter 28 split across two of them because it runs to 68 verses
 * on its own — the heaviest single chapter in the reading so far.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 54,
  title: "Blessing, Curse, and Covenant Renewal",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 54. Yesterday was the small stuff. Today Moses steps back and shows the whole shape of the covenant at once.", 750],
    ["A basket of firstfruits and a creed you speak out loud. Stones set up on a mountain, plastered and written on in plain sight.", 800],
    ["Then a long list of blessings, and a much longer list of curses, read out between two mountains with the whole nation answering amen.", 800],
    ["It is the most exposed Moses gets in this whole book about what obedience actually costs, and what it actually pays.", 850],
    ["We are in Deuteronomy 26 through 29.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(26, 1, 11, [
      "Once Israel is in the land, the first fruit of every harvest goes into a basket, straight to the priest, straight to the altar. Nothing kept back to see how the rest of the year goes first.",
      "And with it, a whole speech gets recited out loud. A Syrian ready to perish was my father. Slaves in Egypt, crying out, and the Lord hearing. Brought out with a mighty hand into a land flowing with milk and honey. Every farmer in Israel says this, every year, over his own basket.",
      "So the harvest never gets to feel like something a man grew by himself. Every single time he brings it in, he has to say out loud where it actually came from.",
      "And then he eats and rejoices, and so does the Levite and the stranger among them. Gratitude here is not private and it is not silent. It gets spoken, and it gets shared.",
    ]),
    deut(26, 12, 19, [
      "Every third year, the tithe stays home and feeds the Levite, the stranger, the fatherless, and the widow until they are full. Then comes another recited line, almost a report card to God. I have not transgressed. I have not forgotten.",
      "Look down from heaven and bless your people, the prayer ends. Obedience here is not shy about asking for the blessing it was promised.",
      "Then Moses describes something almost like a wedding vow, said both directions at once. Thou hast avouched the Lord this day to be thy God. And the Lord hath avouched thee this day to be his peculiar people.",
      "Two sides choosing each other out loud, on the same day, in the same breath. That word avouched is doing the work of a covenant handshake.",
    ]),
    deut(27, 1, 10, [
      "The moment Israel crosses the Jordan, they are told to set up large stones, plaster them, and write this whole law on them in plain sight. Not buried in a scroll somewhere. Posted where anyone walking by could read it.",
      "An altar goes up on Mount Ebal, built of whole, unworked stones. No iron tool touches them. Even the altar is not allowed to be a display of human skill.",
      "Burnt offerings and peace offerings both happen there, and Moses adds one word that is easy to miss in a chapter about curses. Rejoice. Eat there, and rejoice before the Lord your God.",
      "Then the flattest line in the whole passage. This day thou art become the people of the Lord thy God. Not someday. This day. The stones make it permanent and public at the same moment.",
    ]),
    deut(27, 11, 26, [
      "Six tribes climb Gerizim to bless, six climb Ebal to curse, and the Levites stand between them and call out each curse one at a time, loud enough for the whole nation to hear.",
      "Secret idolatry, disrespecting a parent, moving a boundary stone, misleading a blind man, twisting justice against the stranger, the fatherless, or the widow, several forms of sexual sin, murder by stealth, taking a bribe to kill an innocent person. And after every single one, all the people say amen.",
      "Notice what almost every curse targets. Not the crimes anyone would catch you at. The ones done in secret, or against someone too weak to fight back. This is a curse list built for what a courtroom cannot see.",
      "And the last curse covers everything the first eleven missed. Cursed be he that confirms not all the words of this law to do them. Amen. A whole nation just agreed out loud to its own accountability.",
    ]),
    deut(28, 1, 14, [
      "If Israel actually listens, the blessing language turns almost rhythmic. Blessed in the city, blessed in the field, blessed coming in, blessed going out. Blessed basket, blessed store, blessed body, blessed ground.",
      "Enemies who attack scatter seven ways. Rain falls in its season. Israel lends to other nations instead of borrowing from them. The head, not the tail. Above only, not beneath.",
      "All people of the earth shall see that thou art called by the name of the Lord, and be afraid of thee. The blessing was never meant to stay private. Other nations were supposed to notice.",
      "And the condition sits right in the middle of all of it, plain as anything. If thou shalt hearken diligently unto the voice of the Lord thy God. Every blessing in this list has that one hinge underneath it.",
    ]),
    deut(28, 15, 68, [
      "Then the same list, reversed, and stretched out far longer. Cursed in the city, cursed in the field, cursed basket, cursed body. Every blessing from the first half gets its mirror image here, word for word in structure.",
      "But it does not stop at mirroring. It builds. Pestilence, fever, drought, a sky like brass and ground like iron, betrothal to a wife another man takes, a house built and never lived in, sons and daughters watched being carried off with no strength left to stop it.",
      "Moses names the reason plainly, and it is not really about the disobedience itself. Because thou servedst not the Lord thy God with joyfulness, and with gladness of heart, for the abundance of all things. The curse is what happens when a full life stops feeling like a gift.",
      "The chapter ends somewhere almost too heavy to read out loud. Sold back into Egypt, and no man will buy you. Not annihilation. Something closer to being erased of value, in the very place freedom started. This is Leviticus 26's blessing-and-curse pattern from Day 38, said again here at far greater length, because this generation is the one about to actually live it out.",
    ]),
    deut(29, 1, 29, [
      "Moses gathers everyone again, one more time, and reminds them of everything their own eyes already saw. The plagues, the miracles, forty years where their clothes did not wear out and their shoes did not wear out.",
      "And then a strange, honest admission. Yet the Lord hath not given you an heart to perceive, and eyes to see, and ears to hear, unto this day. Even after watching all of it, understanding was never automatic. It had to be given.",
      "The covenant being renewed here is not just for the people standing in front of Moses. Neither with you only, he says, but with him that is not here with us this day. Future generations are written into this agreement before they exist.",
      "The chapter, and this whole reading, ends on a line worth carrying. The secret things belong unto the Lord our God. But those things which are revealed belong unto us and to our children, that we may do the words of this law. Not everything is yours to know. What has already been shown to you is yours to do something with.",
    ]),
  ],
  closing: [
    ["So that is Day 54.", 700],
    ["A basket of firstfruits with a whole story spoken over it. Stones on a mountain, written in plain sight for anyone to read.", 800],
    ["Two mountains, one blessing and one curse, and a whole nation answering amen to both.", 800],
    ["Chapter 28 is the longest single stretch we have read in this whole plan, and it earns that length. Blessing that reaches into the field and the body. Curse that reaches into the same places and does not stop there.", 850],
    ["Underneath both lists sits the same hinge. If thou shalt hearken. Everything else in the chapter follows from that one condition.", 850],
    ["Tomorrow, Deuteronomy 30 through 33. Moses sets life and death in front of them plainly, then blesses every tribe by name before he goes.", 850],
    ["For now, hold on to the line about secret things.", 800],
    ["What is revealed belongs to you and your children.", 750],
    ["So do something with it.", 1200],
  ],
};
