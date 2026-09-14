import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 203, written to the Day 1 standard.
 *
 * Isaiah 22-24 turns the prophecy inward on Jerusalem, then out to Tyre's
 * wealth, then all the way out to the whole earth. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 203,
  title: "Jerusalem, Leaders, and World Judgment",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 203.", 700],
    ["Today the prophecy turns two different directions at once.", 750],
    ["First, straight at Jerusalem itself. Not a foreign city this time. Home.", 800],
    ["Then out to Tyre, the wealthiest trading city in the world.", 800],
    ["And then all the way out. The whole earth, and what is coming for it.", 850],
    ["We are in Isaiah 22, 23, and 24.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 14, [
      "Isaiah calls this the burden of the valley of vision, a strange name, because Jerusalem sits on a hill, not in a valley. This chapter is about the gap between how the city sees itself and what is actually happening to it.",
      "The city is under attack, and its people are up on the rooftops throwing a party. Full of stirs, a tumultuous city, a joyous city. Celebrating while the walls come down.",
      "Verse eleven: they gather water, they fortify walls, they do all the smart, careful engineering. And yet ye have not looked unto the maker thereof. All that planning, and not one prayer.",
      "Then the line that names the whole problem. Let us eat and drink, for tomorrow we shall die. Not repentance. Denial dressed up as a celebration. And God says plainly, this sin will not be purged from you until you die.",
    ]),
    g(22, 15, 25, [
      "God zooms in on one man. Shebna the treasurer, who has been carving himself out a fine tomb in the rock, a monument to his own importance.",
      "God says he will be tossed out like a ball into a large country, and everything he built his pride on becomes his shame instead.",
      "Eliakim takes his place, and gets something specific. The key of the house of David laid on his shoulder. He opens what no one can shut, and shuts what no one can open. Real authority, given to him, not seized.",
      "But even that ends by verse twenty-five. The nail fastened in the sure place eventually gets cut down too. No human office, however God-given, is the final answer. Keep that phrase in mind for later in the story.",
    ]),
    g(23, 1, 14, [
      "Now the burden of Tyre, a city that ran the ancient world's shipping and trade. Merchants who were princes. Traffickers who were the honorable of the earth.",
      "And Isaiah says this was not an accident. The Lord of hosts hath purposed it, to stain the pride of all glory. A decision, not chaos.",
      "The reason is stated plainly too. To bring into contempt all the honourable of the earth. Every measure of status that money and trade built gets stripped down to nothing.",
      "Tyre had survived by making itself indispensable to everyone around it. Isaiah shows that indispensable to the world and forgotten by God are two very different things.",
    ]),
    g(23, 15, 18, [
      "Seventy years pass, and Tyre gets remembered again, but the picture is uncomfortable. Take an harp, go about the city, thou harlot that hast been forgotten. Sing yourself back into relevance.",
      "That is the image Isaiah reaches for. A city going back to selling itself the same way it always did.",
      "But then verse eighteen turns it. Her merchandise and her hire shall be holiness to the Lord. The very trade that made Tyre proud gets repurposed to feed and clothe God's people.",
      "Even a city built on nothing but profit is not outside what God can eventually use. That does not make the profit clean. It means nothing here goes entirely to waste.",
    ]),
    g(24, 1, 15, [
      "Isaiah pulls the camera all the way back. Not Egypt now, not Tyre. The whole earth. The Lord maketh the earth empty, and turneth it upside down.",
      "And it is not selective by class. As with the people, so with the priest. As with the servant, so with his master. As with the buyer, so with the seller. Nobody's position buys them out of this.",
      "The reason given is specific. They have transgressed the laws, changed the ordinance, broken the everlasting covenant. This is not random disaster. It is what happens when a whole world decides the rules do not apply to it.",
      "And in the middle of all that collapse, a remnant still sings. They shall lift up their voice, they shall sing for the majesty of the Lord, they shall cry aloud from the sea. Judgment this total, and there is still a song left inside it.",
    ]),
    g(24, 16, 23, [
      "Isaiah hears songs coming from the ends of the earth, and then immediately says, but I said, my leanness, my leanness, woe unto me. He cannot just celebrate. He still sees how much treachery is happening around him.",
      "The earth is described reeling to and fro like a drunkard, removed like a cottage in the wind. Whatever felt permanent and solid turns out to be temporary.",
      "Even the sky gets touched. The moon confounded, and the sun ashamed. Every light people trusted goes dim.",
      "And the last line is the turn the whole chapter has been building toward. When the Lord of hosts shall reign in mount Zion, and in Jerusalem, and before his ancients gloriously. The end of all that collapse is not emptiness. It is a king on a throne.",
    ]),
  ],
  closing: [
    ["So that is Day 203.", 700],
    ["Jerusalem partying instead of praying. A treasurer who carved his own monument and lost it anyway. Tyre, the richest city around, brought down on purpose. And the whole earth, emptied because the everlasting covenant got broken.", 800],
    ["Notice the pattern running under all three. Position does not protect you. Not Shebna's office, not Tyre's trade routes, not anyone's rank when the whole earth stands under judgment.", 800],
    ["And notice what keeps showing up anyway. A remnant singing from the sea. Tyre's own trade eventually turned toward holiness. A king reigning in Zion at the very end of the collapse.", 850],
    ["Judgment this size, and there is still a song in the middle of it.", 850],
    ["Tomorrow, Isaiah 25 through 27. A feast, a resurrection, and a city finally at rest.", 850],
    ["For now, sit with Isaiah's own honesty in the middle of this chapter.", 800],
    ["My leanness, my leanness, woe unto me.", 750],
    ["He is not preaching from a distance. He feels the weight of what he is seeing.", 1200],
  ],
};
