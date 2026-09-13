import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 197, written to the Day 1 standard.
 *
 * Isaiah 4-6 moves from a remnant sheltered after judgment, through a
 * vineyard song and six "woes" naming exactly what's rotten in Judah, to
 * Isaiah's own throne-room vision and call. Six blocks, splitting both
 * chapter 5 and chapter 6 to keep the pacing even.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 197,
  title: "Holiness and Isaiah's Call",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 197.", 650],
    ["Yesterday Isaiah put Jerusalem on trial. Today it gets personal.", 800],
    ["First a vineyard that only grows wild grapes, no matter how well it's tended.", 800],
    ["Then six \"woes\" in a row, naming exactly what's gone wrong.", 800],
    ["And then Isaiah himself, standing in a throne room, undone by what he sees.", 850],
    ["We are in Isaiah 4, 5, and 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(4, 1, 6, [
      "Chapter 4 opens with a strange, desperate image — seven women grabbing hold of one man, willing to feed and clothe themselves just to carry his name and lose the shame of being unmarried. That's what's left of a nation after the war Isaiah just described in chapter 3.",
      "Then the tone flips completely. In that day shall the branch of the LORD be beautiful and glorious. After all that judgment, a remnant survives, and God calls them holy — every one written among the living in Jerusalem.",
      "He washes away the filth... by the spirit of judgment, and by the spirit of burning. The same judgment that felt like punishment in chapter 3 turns out to be the thing that actually cleans the city up.",
      "Then the picture softens all the way: a cloud and smoke by day, a flaming fire by night, and a tabernacle for a shadow from the heat and a refuge from the storm. God goes from judge back to shelter, for whoever is left.",
    ]),
    isa(5, 1, 7, [
      "Isaiah sings a love song about a vineyard. My wellbeloved hath a vineyard in a very fruitful hill — he fenced it, cleared out the stones, planted the choicest vine, even built a tower and a winepress. Nothing was left undone.",
      "Then the twist: he looked that it should bring forth grapes, and it brought forth wild grapes. Every kind of care, and the harvest is worthless anyway.",
      "God asks Jerusalem directly to judge the case: what could have been done more to my vineyard, that I have not done in it? He isn't asking to be answered. He's asking them to see it.",
      "Then Isaiah says plainly what the song means: the vineyard of the LORD of hosts is the house of Israel. He looked for judgment, but found oppression. For righteousness, but found a cry. Two words that sound almost alike, twisted one into the other. That's how close good and evil ended up living together.",
    ]),
    isa(5, 8, 23, [
      "Isaiah lists six woes back to back, like counts on an indictment. Woe unto them that join house to house, that lay field to field, till there be no place — people buying up everything until no one else has room to live.",
      "Woe unto them that rise up early... to follow strong drink, that continue until night till wine inflame them, with harp and wine at their feasts, but they regard not the work of the LORD. A whole lifestyle built around never sobering up long enough to notice God.",
      "Woe unto them that call evil good, and good evil; that put darkness for light, and light for darkness; that put bitter for sweet, and sweet for bitter. That isn't one specific sin. That's a culture that has lost the ability to tell the difference at all.",
      "The last woe names the cost directly: they justify the wicked for reward, and take away the righteousness of the righteous from him. Judges taking bribes to call guilty people innocent, and innocent people guilty.",
    ]),
    isa(5, 24, 30, [
      "Because of all this, their root shall be as rottenness, and their blossom shall go up as dust — like stubble catching fire, gone from the inside out.",
      "Then comes one of the most unsettling lines in the chapter, repeated again later in the book: for all this his anger is not turned away, but his hand is stretched out still. This isn't the end of the judgment. It's only the first wave.",
      "God calls a foreign army from far away with a whistle — he will hiss unto them from the end of the earth, and, behold, they shall come with speed swiftly. None shall be weary nor stumble among them. A nation so disciplined not one soldier trips or falls asleep on the march.",
      "The chapter ends in total darkness — if one look unto the land, behold darkness and sorrow, and the light is darkened in the heavens thereof. No comfort at the end of chapter 5. Just what's coming.",
    ]),
    isa(6, 1, 8, [
      "In the year that king Uzziah died — Isaiah dates this vision to a real national crisis, the death of a strong king everyone had depended on. And in that gap, he sees something bigger. The Lord sitting upon a throne, high and lifted up, his train filling the temple.",
      "Seraphim call to each other, holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory. Said three times, not for style. Repeating a word three times was the loudest possible way to say it.",
      "Isaiah's first response isn't wonder. It's terror. Woe is me, for I am undone, because I am a man of unclean lips. Seeing God clearly doesn't make you feel impressive. It makes you feel exactly how unclean you are.",
      "A seraphim touches a live coal to his mouth — thine iniquity is taken away, and thy sin purged. Only after that does Isaiah hear the question, whom shall I send? And only after that does he answer: here am I. Send me. Cleansing comes before the calling, every time.",
    ]),
    isa(6, 9, 13, [
      "You'd expect the next line to be an inspiring mission. Instead God tells Isaiah exactly how badly this message will go. Go, and tell this people, hear ye indeed, but understand not; and see ye indeed, but perceive not.",
      "Make the heart of this people fat, and make their ears heavy, and shut their eyes. Not because God wants them lost, but because they've already refused to listen so many times that the refusal itself becomes the judgment.",
      "Isaiah asks the only question that makes sense. Lord, how long? And the answer isn't comforting. Until the cities be wasted without inhabitant... and the land be utterly desolate.",
      "But the very last line holds a thread of hope. Yet in it shall be a tenth, and it shall return... so the holy seed shall be the substance thereof. Even inside a call to preach to people who won't listen, God plants a remnant that will still be standing when it's over.",
    ]),
  ],
  closing: [
    ["So that is Day 197.", 700],
    ["A vineyard that had everything and still grew wild grapes. Six woes naming exactly what a comfortable, careless nation looks like.", 800],
    ["And in the middle of all that judgment, God still calls a remnant holy and shelters them like a tabernacle from the storm.", 800],
    ["Then Isaiah sees the throne himself. Holy, holy, holy. And his first reaction isn't wonder. It's woe is me.", 850],
    ["A coal touches his lips before God ever asks him to go anywhere. Cleansing always comes before the calling.", 850],
    ["And when he says here am I, send me, God tells him the truth up front. This message will not be received.", 850],
    ["But even there, at the end of the hardest commission in the book, a tenth remains. A holy seed still standing.", 850],
    ["Tomorrow, Isaiah 7 through 9. A sign about a child named Immanuel, God with us.", 850],
    ["For now, carry Isaiah's answer.", 750],
    ["Here am I. Send me.", 1200],
  ],
};
