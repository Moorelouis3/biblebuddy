import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 229, written to the Day 1 standard.
 *
 * Jeremiah 34-36: Zedekiah gets a precise, personal answer about his own
 * capture; a covenant to free Hebrew slaves is kept for a matter of days
 * before it is quietly reversed; the Rechabites keep a human ancestor's
 * command for generations while the kingdom will not keep God's; and
 * Jehoiakim burns Jeremiah's scroll column by column, only for it to come
 * back rewritten and longer. Six blocks across three chapters (73 verses),
 * no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 229,
  title: "Broken Promises and God's Written Word",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 229. Zedekiah gets a direct answer about exactly how his own capture will go.", 750],
    ["Then a covenant to free slaves gets kept for a few days before everyone quietly changes their mind.", 800],
    ["A family that refuses wine on principle ends up outlasting a king who burns Scripture with a penknife.", 800],
    ["And when that king throws God's word into the fire, it comes back longer than it was before.", 850],
    ["We are in Jeremiah 34, 35, and 36.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(34, 1, 7, [
      "Nebuchadnezzar's whole army, and every kingdom under his hand, is already fighting against Jerusalem and its cities when this word comes. That is the setting for everything Zedekiah is about to hear.",
      "He gets an answer about as specific as prophecy gets. Thine eyes shall behold the eyes of the king of Babylon, and he shall speak with thee mouth to mouth, and thou shalt go to Babylon. Not a symbol. A face he will actually see.",
      "But it is not pure doom. Thou shalt not die by the sword, but thou shalt die in peace, and with the burnings of thy fathers they will lament thee, saying, Ah lord! Even inside this judgment there is a smaller mercy attached to it.",
      "Then one quiet detail closes the block. Lachish and Azekah are named as the only fortified cities of Judah still standing. The whole kingdom has shrunk down to two names on a list.",
    ]),
    g(34, 8, 22, [
      "Zedekiah makes a real covenant with the people, that every Hebrew slave should go free, exactly what the law commanded after six years of service. And at first it works. All the princes and all the people heard it, and they obeyed, and let them go.",
      "Then, afterward, they turned, and caused the servants and the handmaids to return, and brought them into subjection again. The obedience did not even last long enough to be tested.",
      "God names what that actually was. Ye turned and polluted my name. This was not a broken business arrangement. It was a covenant made in his own house, in his own name.",
      "So the sentence plays on their own word. Behold, I proclaim a liberty for you, saith the LORD, to the sword, to the pestilence, and to the famine. And the men who cut a calf in two and walked between the pieces to seal that covenant will be given to their enemies exactly like that severed animal.",
    ]),
    g(35, 1, 11, [
      "Jeremiah brings the entire house of the Rechabites into a chamber inside the temple itself and sets pots of wine and cups right in front of them. It is a direct, staged test.",
      "They refuse outright. Jonadab the son of Rechab our father commanded us, saying, Ye shall drink no wine, neither ye, nor your sons for ever. No houses, no farming, no vineyards, tents for life.",
      "And they have actually kept it, for generations, with nothing forcing them to. We have dwelt in tents, and have obeyed, and done according to all that Jonadab our father commanded us.",
      "The only thing that ever moved them off that life was Babylon's invasion, and even then they only came inside Jerusalem's walls for safety. They never adopted the settled life they had refused for so long.",
    ]),
    g(35, 12, 19, [
      "God draws the comparison himself, out loud. The sons of Jonadab have performed the commandment of their father. This people hath not hearkened unto me. A human father's word outweighing God's own.",
      "He underlines just how much effort was on his side of it. I have sent also unto you all my servants the prophets, rising up early and sending them. The same relentless persistence, met the whole time with silence.",
      "So the judgment already spoken finally lands. I will bring upon Judah and upon all the inhabitants of Jerusalem all the evil that I have pronounced against them, because I have spoken unto them, but they have not heard.",
      "Then the Rechabites get their own answer, just as specific as the judgment. Jonadab the son of Rechab shall not want a man to stand before me for ever. A strict, obscure family rule outlives the whole kingdom sitting around it.",
    ]),
    g(36, 1, 26, [
      "God tells Jeremiah to write down everything spoken against Israel and Judah since the days of Josiah, on the chance, it may be, that the house of Judah will hear and turn, so that I may forgive their iniquity. A scroll as one last opportunity, not just a record.",
      "Jeremiah is shut up and cannot go to the temple himself, so Baruch writes it all from his mouth and reads it publicly on a fast day. The officials who hear it are genuinely afraid and go straight to warn the king.",
      "Jehoiakim is sitting in his winter house by a fire on the hearth when the scroll is read to him. As soon as Jehudi finishes three or four columns, the king cuts them off with his own penknife and throws them into the fire, column after column, until the whole roll is gone.",
      "Three of his own officials beg him not to burn it. He will not hear them. And the sentence that follows says everything by itself. Yet they were not afraid, nor rent their garments, neither the king, nor any of his servants that heard all these words.",
    ]),
    g(36, 27, 32, [
      "God's response to a burned scroll is not an argument. It is a second scroll, with instructions to write in it all the former words that were in the first roll, which Jehoiakim the king of Judah hath burned. Fire does not undo what was already said.",
      "The king gets a personal, private sentence for a personal, private act. He shall have none to sit upon the throne of David, and his dead body cast out in the day to the heat, and in the night to the frost.",
      "Jeremiah dictates the entire thing again to Baruch, from memory, word for word, and then something is added that was not there the first time. There were added besides unto them many like words.",
      "Burning God's word did not make it smaller. The copy that came back was longer than the one that went into the fire.",
    ]),
  ],
  closing: [
    ["So that is Day 229.", 700],
    ["A covenant to free slaves, kept for a few days, then quietly undone.", 800],
    ["A family that has held a stranger's command for generations, doing better with a human father's word than a kingdom did with God's.", 850],
    ["A king cutting a scroll into a fire, column by column, without so much as tearing his own clothes.", 800],
    ["And a second scroll, dictated from memory, longer than the one he burned.", 800],
    ["Fire was never going to be the end of that sentence.", 800],
    ["Tomorrow, Jeremiah 37 through 39. Jerusalem finally falls.", 850],
    ["For now, hold the smaller, stranger promise.", 750],
    ["Jonadab's sons never wanted a kingdom. They just kept their word.", 1200],
  ],
};
