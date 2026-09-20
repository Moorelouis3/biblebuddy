import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 362, written to the Day 1 standard.
 *
 * Revelation 11-13: two witnesses prophesy, die, and rise; the seventh
 * trumpet announces a finished kingdom; a woman and a dragon appear in the
 * sky and a war breaks out in heaven; then two beasts, one from the sea and
 * one from the earth, take the dragon's orders. Seven blocks - one more
 * than usual, because three chapters this dense will not compress further
 * without losing a scene the next day's reading assumes you saw.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 362,
  title: "Witness, Beast, and Faithful Endurance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 362.", 700],
    ["Two witnesses preach in sackcloth, get killed in the street, and get up again in front of the people who killed them.", 800],
    ["Then a war breaks out in heaven itself, and a dragon loses it and comes down furious.", 850],
    ["And two beasts rise to take his orders, one from the sea and one from the earth.", 900],
    ["Revelation 11 through 13.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(11, 1, 6, [
      "John is handed a measuring rod and told to measure the temple, the altar, and the worshippers inside, but to leave out the outer court. It has been handed to outsiders who will trample the holy city for forty-two months.",
      "God gives two witnesses power to prophesy for twelve hundred and sixty days, dressed in sackcloth. They are called two olive trees and two lampstands, standing in front of the Lord of the earth.",
      "Anyone who tries to hurt them gets consumed by fire straight out of their mouths. That is exactly how anyone trying to harm them has to die.",
      "They can shut up the sky so it does not rain, turn water to blood, and strike the earth with any plague they choose, for as long as they are preaching.",
    ]),
    rev(11, 7, 14, [
      "The moment their testimony is finished, the beast from the bottomless pit is allowed to make war on them, and this time it wins. It kills them.",
      "Their bodies lie in the street of the city that crucified their Lord, and nobody is allowed to bury them for three and a half days. People celebrate. They send each other gifts, because these two had been tormenting them.",
      "Then breath from God enters the bodies, and they stand up. Everyone watching sees it happen. A voice from heaven says, come up here, and they rise into a cloud while their enemies watch.",
      "That same hour an earthquake levels a tenth of the city and kills seven thousand people, and the ones left standing, out of pure terror, give glory to God.",
    ]),
    rev(11, 15, 19, [
      "The seventh angel sounds, and heaven does not describe a future event. It announces a finished one. The kingdom of the world has become the kingdom of our Lord and of his Christ, and he will reign forever.",
      "The twenty-four elders fall on their faces and thank God for taking his power and beginning to reign, and for the moment when the dead are judged and his servants are finally rewarded.",
      "Then the temple in heaven opens, and inside it John sees the ark of the covenant, the same box that held the law and sat behind a curtain no one was allowed to enter.",
      "Lightning, voices, thunder, an earthquake, hail. The scene closes exactly like Sinai did, because the same God who gave the law is the one enforcing it now.",
    ]),
    rev(12, 1, 6, [
      "A woman appears in the sky clothed with the sun, the moon under her feet, twelve stars in a crown on her head, crying out in labor.",
      "Next to her, a massive red dragon with seven heads and ten horns, sweeping a third of the stars out of the sky with its tail, waiting for the exact moment the child is born so it can devour him.",
      "She gives birth to a son who will rule every nation with an iron rod, and before the dragon can touch him, he is caught up to God and to his throne.",
      "The woman flees into the wilderness, to a place God has already prepared for her, to be kept safe for twelve hundred and sixty days. The child is safe. She still has to run.",
    ]),
    rev(12, 7, 17, [
      "War breaks out in heaven. Michael and his angels fight the dragon and his angels, and the dragon loses, and there is no place left for him in heaven anymore.",
      "He is thrown down to the earth, and Revelation names him plainly here. That old serpent, called the Devil and Satan, the one deceiving the whole world.",
      "A voice in heaven says God's people have already won, and tells you exactly how. By the blood of the Lamb, by the word of their testimony, and because they did not love their own lives enough to hold back from death.",
      "Furious, and knowing his time is short, the dragon chases the woman, and the earth itself opens up to swallow the flood he sends after her. Losing heaven does not make him stop. It just turns him toward everyone who follows her son.",
    ]),
    rev(13, 1, 10, [
      "A beast rises up out of the sea with seven heads and ten horns, part leopard, part bear, part lion, and the dragon hands it his own throne and authority.",
      "One of its heads looks like it took a fatal wound and healed anyway, and the whole world is amazed and follows it. They worship the dragon for giving it power, and worship the beast, and ask who could possibly fight something like this.",
      "It is allowed to talk big and blaspheme for forty-two months, and it is allowed to make war on God's people and actually win, for a while, with authority over every tribe and nation on earth.",
      "Everyone whose name is not written in the Lamb's book of life worships it. Revelation just says, if you have ears, listen. This is where patience and faith have to hold.",
    ]),
    rev(13, 11, 18, [
      "A second beast comes up out of the earth, looking like a lamb but talking like a dragon, and it works for the first beast, using every bit of its power to make the world worship it.",
      "It performs real signs, even fire falling from the sky in front of everyone, and talks people into building an image of the wounded beast, an image it somehow makes speak.",
      "Then it forces everyone, rich and poor, powerful and enslaved, to take a mark on their hand or forehead, and shuts every single person without it out of buying or selling anything at all.",
      "And it ends with a puzzle, not a threat. Here is wisdom, John says. Whoever has understanding, count the number of the beast. It is a man's number. Six hundred sixty-six.",
    ]),
  ],
  closing: [
    ["So that's Day 362.", 700],
    ["Two witnesses, a war in heaven, and two beasts taking their orders from a dragon that just lost everything.", 850],
    ["Every time this chapter shows you power, it shows you where that power actually comes from.", 800],
    ["The witnesses get their fire from God. The dragon gets thrown out by Michael. The beast gets its throne handed to it, secondhand, from a devil that had already lost.", 850],
    ["And right in the middle of it, heaven tells you exactly how anyone wins against this. Not by matching its power. By the blood of the Lamb, and a testimony they would not take back even to save their own lives.", 900],
    ["That is also, quietly, the hardest part to read today, because the beast is allowed to win for a while, and Revelation never pretends otherwise.", 850],
    ["Tomorrow, Revelation 14 through 16. A harvest, and bowls of judgment poured out one after another.", 850],
    ["For now, hold on to how they won.", 750],
    ["By the blood of the Lamb.", 750],
    ["And a testimony they would not take back.", 1200],
  ],
};
