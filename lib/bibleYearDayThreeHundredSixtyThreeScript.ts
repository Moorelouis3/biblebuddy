import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 363, written to the Day 1 standard.
 *
 * Revelation 14-16: the 144,000 on Mount Zion, three angels' warnings, a
 * double harvest of the earth, then seven angels pour out the seven last
 * plagues. Seven blocks, matching the density of Day 362's three-chapter
 * reading.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 363,
  title: "Harvest, Bowls, and Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 363.", 700],
    ["The Lamb stands on Mount Zion with a hundred forty-four thousand people who would not lie for anyone.", 800],
    ["Three angels fly through the sky shouting warnings nobody asked for.", 750],
    ["Then a harvest. Then a grape harvest, crushed outside the city until blood runs in the street.", 850],
    ["And seven angels walk out of heaven's own temple carrying seven bowls of God's anger, and the door shuts behind them.", 900],
    ["Revelation 14 through 16.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(14, 1, 5, [
      "John sees the Lamb standing on Mount Zion, and with him a hundred forty-four thousand people who have his name and his Father's name written on their foreheads.",
      "They sing a new song in front of the throne, the four living creatures, and the elders, and no one else can learn that song. Only the ones who actually went through what they went through.",
      "Revelation says they follow the Lamb wherever he goes and no lie was found in their mouths. Not perfect people. People who stopped pretending.",
      "They are called firstfruits, the first cut of a harvest still coming. What happens to them here is a preview, not the whole story.",
    ]),
    rev(14, 6, 13, [
      "An angel flies overhead with an everlasting gospel for every nation, tribe, language, and people still on earth. Fear God and give him glory, because the hour of his judgment has come.",
      "A second angel follows shouting one line twice. Babylon is fallen. Babylon is fallen. The great city that got the whole world drunk on what it was selling.",
      "A third angel gives the hardest warning in the chapter. Anyone who worships the beast and takes its mark drinks the wine of God's anger, poured full strength, with nothing to soften it. This is exactly where the patience of the saints and the faith of Jesus gets named out loud.",
      "Then a voice from heaven cuts through all three warnings. Blessed are the dead who die in the Lord from now on. They rest from their labor, and what they did follows them. After three threats, the first comfort in the chapter.",
    ]),
    rev(14, 14, 20, [
      "One like the Son of Man sits on a white cloud, a gold crown on his head, a sharp sickle in his hand. An angel comes out of the temple and tells him the harvest of the earth is ripe. Put in the sickle and reap.",
      "The earth is reaped. One motion, no drama attached to it in the text.",
      "Then a second harvest. Another angel gathers the clusters of the vine of the earth, because the grapes are fully ripe, and throws them into the great winepress of God's anger.",
      "The winepress is trodden outside the city, and blood comes out of it as high as a horse's bridle, for about two hundred miles. Revelation does not soften that image. It just puts it in front of you.",
    ]),
    rev(15, 1, 4, [
      "John sees seven angels with the seven last plagues, and he says plainly, in these God's anger is finished. Not endless. Finished.",
      "Beside a sea of glass mixed with fire stand people who beat the beast, its image, and its number. They are not underground. They are standing, holding harps.",
      "They sing the song of Moses, the servant of God, and the song of the Lamb, the same rescue told twice. Great and marvelous are your works, Lord God Almighty. Just and true are your ways.",
      "The song ends with a question aimed past them, at everyone. Who will not fear you, Lord, and glorify your name? Because you alone are holy, and all nations will come and worship before you.",
    ]),
    rev(15, 5, 8, [
      "The temple in heaven opens, and seven angels come out in clean bright linen, gold sashes across their chests.",
      "One of the four living creatures hands each of them a gold bowl, full of the anger of the God who lives forever.",
      "The temple fills with smoke from God's glory and power, and Revelation says no one could enter it until the seven plagues carried by those angels were finished.",
      "Even heaven's own throne room closes its doors for this. Whatever is about to happen, it is happening because God said so, not because it slipped out of his control.",
    ]),
    rev(16, 1, 11, [
      "A loud voice from the temple tells the seven angels, go, pour out the bowls of God's anger on the earth.",
      "The first bowl breaks out in ugly, painful sores on everyone carrying the beast's mark and worshipping its image. The second turns the sea to blood like a corpse's, and everything living in it dies. The third turns the rivers and springs to blood too.",
      "The angel in charge of the waters says God is right to do this, because these people spilled the blood of God's people and prophets, so blood is what they get to drink. And the altar itself answers back. Yes, Lord God Almighty, your judgments are true and fair.",
      "The fourth bowl lets the sun scorch people with fire, and the fifth plunges the beast's own kingdom into darkness where people gnaw their tongues in pain. Both times, Revelation says the same thing. They cursed God over the pain. They did not turn.",
    ]),
    rev(16, 12, 21, [
      "The sixth bowl dries up the Euphrates to clear a road for kings from the east. Then three foul spirits like frogs come out of the mouths of the dragon, the beast, and the false prophet, and go out to gather every king on earth for one battle.",
      "Right in the middle of that gathering, a voice interrupts. Look, I am coming like a thief. Blessed is the one who stays awake and keeps his clothes on, so he does not end up walking around exposed. The kings never hear it. You just did.",
      "They gather at a place called, in Hebrew, Armageddon.",
      "The seventh bowl pours into the air, and a voice from the throne says one word. Done. Then the worst earthquake in human history splits the great city into three, levels the nations' cities, and stones the weight of a hundred pounds fall from the sky, and people curse God over the hail instead of turning to him.",
    ]),
  ],
  closing: [
    ["So that's Day 363.", 700],
    ["A harvest of the whole earth, a winepress outside the city, and seven bowls poured out one after another.", 800],
    ["Every plague in this reading answers something. Blood for the blood they spilled. Fire for the fire they refused to fear. Darkness for a kingdom that already loved the dark.", 850],
    ["And twice, right in the middle of it, Revelation stops to say God is right. Just and true are your ways. Your judgments are true and fair. Not cruel. Right.", 850],
    ["The line that should stay with you is the smallest one. I am coming like a thief. Not shouted with the plagues. Slipped in between two of them, for whoever is paying attention.", 850],
    ["Tomorrow, Revelation 17 through 19. Babylon falls for good, and heaven throws a wedding.", 850],
    ["For now, hold on to the one line that was actually meant for you.", 800],
    ["Blessed is the one who stays awake.", 750],
    ["And keeps his clothes on.", 1200],
  ],
};
