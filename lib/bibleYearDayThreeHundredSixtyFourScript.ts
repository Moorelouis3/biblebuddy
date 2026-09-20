import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 364, written to the Day 1 standard.
 *
 * Revelation 17-19: the great prostitute riding the beast, Babylon's fall in
 * a single hour, then heaven's hallelujahs, the marriage of the Lamb, and the
 * rider on the white horse who ends the war Babylon started. Seven blocks,
 * matching the density of Day 362 and Day 363's three-chapter readings.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 364,
  title: "Babylon Falls and the King Returns",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 364.", 700],
    ["Babylon the great falls in a single hour, and the whole world that got rich off her stands at a distance and watches her burn.", 850],
    ["Then heaven throws a wedding, for the first time in the whole Bible.", 800],
    ["And a rider comes out on a white horse to finish a war that started three chapters ago.", 850],
    ["Revelation 17 through 19.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(17, 1, 6, [
      "One of the angels holding a bowl takes John to see the judgment of a woman he calls the great prostitute, the one sitting on many waters, the one the kings of the earth have been sleeping with.",
      "She rides a scarlet beast covered in blasphemous names, seven heads and ten horns, dressed in purple and scarlet, gold and jewels, holding a golden cup full of the filth of what she has been selling.",
      "Her name is written right on her forehead. Mystery, Babylon the Great, the mother of prostitutes and of everything vile on earth.",
      "John says she is drunk. Not with wine. With the blood of God's people and the martyrs of Jesus. And when he sees her, he says he was amazed, not impressed.",
    ]),
    rev(17, 7, 18, [
      "The angel explains the puzzle. The beast was, and is not, and is about to come up out of the bottomless pit, and everyone whose name is not in the book of life will be amazed at it.",
      "Seven heads are seven mountains, and also seven kings. Ten horns are ten kings who have not taken power yet, but will, for one hour, alongside the beast, and they will hand it everything they have.",
      "Together they make war on the Lamb. And the Lamb wins, because he is Lord of lords and King of kings, and the ones standing with him are called, chosen, and faithful. Three words, and each one has to be true before the fight.",
      "Then the turn nobody sees coming. The same ten kings who propped her up will hate her, strip her, eat her flesh, and burn her with fire. Whatever she is, she was never actually safe with the beast she was riding.",
    ]),
    rev(18, 1, 8, [
      "A different angel comes down and the earth lights up with his glory. He shouts one line twice. Babylon is fallen, is fallen. A city so corrupt it has become a home for every unclean spirit and hated bird.",
      "Kings slept with her. Merchants got rich selling to her. A voice from heaven cuts through the whole arrangement. Come out of her, my people, so you do not share her sins and her plagues.",
      "Her sins are stacked up to heaven, and God has not forgotten one of them. Pay her back double for what she did, the voice says. She poured judgment on others, so pour it back into her own cup.",
      "She told herself, I sit like a queen, I am no widow, I will never grieve. Her plagues arrive in a single day. Death, grief, famine, fire. Because the Lord who judges her is strong.",
    ]),
    rev(18, 9, 19, [
      "The kings who slept with her stand at a distance, watching the smoke, weeping for themselves as much as for her. In one hour, they keep saying, your judgment came.",
      "The merchants weep too, but for a different reason. Nobody is buying their cargo anymore, and Revelation lists it out. Gold, silver, jewels, silk, spices, wine, oil, wheat, animals, and, at the very end of the list, human bodies and souls.",
      "That last item is not a slip. It is the point. Everything else on the list was a good she sold. People were just one more.",
      "Even the sea captains and sailors stand far off, throw dust on their heads, and cry that a city this wealthy could burn in a single hour. Every one of them mourns what her fall cost them. Not one of them mourns her.",
    ]),
    rev(18, 20, 24, [
      "Then the mood flips completely. Heaven, and God's people, and the apostles and prophets, are told to rejoice, because God has judged her for what she did to them.",
      "A mighty angel picks up a stone the size of a millstone and throws it into the sea. This is how violently Babylon the great will be thrown down, he says, and never found again.",
      "The sound of music will never be heard in her again. No craftsman, no millstone grinding grain, no lamp lit at night, no wedding celebration. A city can look alive right up until it goes completely silent.",
      "And the last line names the actual charge. In her was found the blood of prophets and saints, and everyone who has ever been killed on the earth. That is what all the wealth was standing on.",
    ]),
    rev(19, 1, 10, [
      "A huge crowd in heaven shouts Hallelujah, because God's judgments are true and right, and he has avenged the blood of his people that Babylon spilled. Her smoke goes up forever.",
      "The twenty-four elders and the four living creatures fall down and worship, and then a voice from the throne calls everyone who fears God, small and great, to praise him.",
      "The crowd answers back like the roar of a huge waterfall. The Lord God, the Almighty, reigns. Let us rejoice, because the marriage of the Lamb has come, and his bride has made herself ready.",
      "She is given fine linen, bright and clean, and John is told plainly what the linen actually is. The righteous acts of God's people. Then John falls down to worship the angel telling him this, and the angel stops him cold. Do not. Worship God.",
    ]),
    rev(19, 11, 21, [
      "Heaven opens, and a rider comes out on a white horse, called Faithful and True, judging and making war in righteousness. His eyes are fire, many crowns sit on his head, and he has a name written that no one else knows.",
      "His robe is already dipped in blood before the battle even starts, and his name is the Word of God. The armies of heaven follow him on white horses, dressed in the same fine linen just given to the bride.",
      "A sword comes out of his mouth to strike the nations, and he will rule them with an iron rod and tread the winepress of God's furious anger. Everything Babylon dressed up in gold, he wears as truth.",
      "The beast and the kings of the earth gather to fight him and lose instantly. The beast and the false prophet are thrown alive into the lake of fire, and the rest are killed by the sword from his mouth. The war Babylon started back in chapter seventeen finally finishes here.",
    ]),
  ],
  closing: [
    ["So that's Day 364.", 700],
    ["A prostitute empire built on blood and cargo, burned down in an hour, and a wedding on the other side of it.", 850],
    ["Notice what actually gets mourned in this reading. Not Babylon. Her music, her wealth, her ships, her buyers. Nobody grieves her. They grieve what they were getting from her.", 850],
    ["And notice what the list of her cargo ends on. After the gold and the silk and the spices, the very last items are human bodies and souls. That is what the whole system was actually built on.", 900],
    ["Then, without any transition, heaven starts singing. The Lord God reigns. The marriage of the Lamb has come. It is the first wedding in the entire Bible that heaven itself throws.", 850],
    ["Tomorrow, Revelation 20 through 22, the last chapters in the whole book. Judgment, and then a new heaven and a new earth.", 900],
    ["For now, hold on to the line the angel would not let John forget.", 800],
    ["Do not worship me.", 750],
    ["Worship God.", 1200],
  ],
};
