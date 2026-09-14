import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 209, written to the Day 1 standard.
 *
 * Isaiah 40-42 is the hinge of the book: comfort after judgment, God's case
 * against the idols, and the first Servant Song. Seven blocks - these three
 * chapters run dense with argument rather than narrative, so each block
 * stays tight to keep the runtime in line.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 209,
  title: "Comfort and the Servant",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 209.", 700],
    ["The tone changes completely today. No more sieges, no more sickbeds. Just comfort, said twice at the start.", 800],
    ["But comfort here doesn't mean easy. It means a voice crying in the wilderness, and a servant who refuses to break what's already cracked.", 850],
    ["And by the end, the very people comfort was spoken to get called blind.", 800],
    ["We are in Isaiah 40, 41, and 42.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(40, 1, 11, [
      "Comfort ye, comfort ye my people, saith your God. No new law before comfort. God's first word after two brutal chapters about Assyria is exactly that, said twice.",
      "The comfort has real content, not just a warmer tone. Her warfare is accomplished, her iniquity is pardoned, she has received of the LORD's hand double for all her sins. A debt actually paid, not smoothed over.",
      "Then a voice crying in the wilderness calls for a highway, the crooked made straight and the rough places plain. Centuries later, John the Baptist stands in an actual wilderness quoting this exact line about himself.",
      "The chapter sets two pictures side by side on purpose. The grass withereth, the flower fadeth, but the word of our God shall stand for ever. And that enduring God is then pictured as a shepherd who shall gently lead those that are with young.",
    ]),
    g(40, 12, 26, [
      "God measures all of creation against His own hand. He hath measured the waters in the hollow of his hand, and meted out heaven with the span, and weighed the mountains in scales. Nothing about creation strains Him.",
      "Nations that feel enormous to the people living inside them are, from where God stands, as a drop of a bucket, and counted as the small dust of the balance. Not an insult. A correction to the scale.",
      "Isaiah then describes an idol being built, step by step. A workman melts it, a goldsmith spreads it over with gold, someone chooses a tree that will not rot so the god they made won't fall over.",
      "To whom then will ye liken me, or shall I be equal? saith the Holy One. He calls the stars out by names, and not one of them fails to answer. That is who Judah was tempted to trade for wood.",
    ]),
    g(40, 27, 31, [
      "Israel's actual complaint gets quoted directly. My way is hid from the LORD, and my judgment is passed over from my God. Not defiant unbelief. Exhaustion, the feeling of being forgotten.",
      "The answer isn't a rebuke. It's a reminder. The everlasting God, the Creator of the ends of the earth, fainteth not, neither is weary, and there is no searching of his understanding.",
      "And the promise is specifically for the tired, not the strong. He giveth power to the faint, and to them that have no might he increaseth strength. Even young men shall utterly fall.",
      "They that wait upon the LORD shall renew their strength, mount up with wings as eagles, run and not be weary, walk and not faint. Notice the order. Eagles, then running, then just walking. Sometimes the miracle is getting through an ordinary day without quitting.",
    ]),
    g(41, 1, 16, [
      "God calls the nations into a courtroom. Let them come near, then let them speak, let us come near together to judgment. He is willing to make His case in the open.",
      "He names what He has already done, raising up a conqueror from the east who scatters kings like dust, and claims it before it fully happens. I the LORD, the first, and with the last, I am he.",
      "Then He turns from world history to one exhausted nation. Fear thou not, for I am with thee, I will strengthen thee, I will help thee, I will uphold thee with the right hand of my righteousness.",
      "The tenderest line calls Israel by the smallest name on purpose. Fear not, thou worm Jacob, I will help thee, saith the LORD, and thy redeemer. He doesn't deny how small they feel. He just says it changes nothing about what He'll do.",
    ]),
    g(41, 17, 29, [
      "God answers real thirst with real water. The poor and needy seek water, and there is none, I the LORD will hear them. Then trees planted in the desert, cedar, myrtle, fir, just so people will know that the hand of the LORD hath done this.",
      "He puts the idols on trial directly. Produce your cause, shew us what shall happen, that we may know that ye are gods. Not a philosophical argument. A dare to predict anything at all.",
      "Nothing answers. I beheld, and there was no man, even among them there was no counsellor that could answer a word. The silence itself is the verdict.",
      "Behold, they are all vanity, their works are nothing. Not because Isaiah says it louder than before. Because when actually tested, they had nothing to say.",
    ]),
    g(42, 1, 9, [
      "The Servant is introduced. Behold my servant, whom I uphold, mine elect, in whom my soul delighteth. No throne, no army mentioned first, just God's own pleasure in him.",
      "His method is the opposite of Rabshakeh's a few chapters back. He shall not cry, nor lift up, nor cause his voice to be heard in the street. No performance, no shouting people down.",
      "A bruised reed shall he not break, and the smoking flax shall he not quench. Two pictures of something almost finished, cracked or nearly out, and he is the one who won't be what finishes them off.",
      "He is given for a covenant of the people, for a light of the Gentiles, to open the blind eyes, to bring out the prisoners from the prison. The line from Assyria's siege to this servant runs straight through everything in between.",
    ]),
    g(42, 10, 25, [
      "The response called for is a new song from the end of the earth, sung by the sea, the wilderness, the villages that Kedar doth inhabit. The whole map invited into the same song.",
      "Then the tone turns violent on purpose. The LORD shall go forth as a mighty man, he shall cry, yea, roar, I will destroy and devour at once. The same God who won't break a bruised reed will still act like a travailing woman when it's time to act.",
      "Then the hard turn. Who is blind, but my servant? or deaf, as my messenger that I sent? Israel itself is called blind here, the very nation meant to carry the light unable to see.",
      "The chapter doesn't soften the reason. For they would not walk in his ways, neither were they obedient unto his law, yet he knew not, and it burned him, yet he laid it not to heart. Judgment walked into without even noticing.",
    ]),
  ],
  closing: [
    ["So that is Day 209.", 700],
    ["Comfort ye, comfort ye my people. The first words after two chapters about armies and sickness.", 750],
    ["And underneath the comfort, one argument runs the whole way through. No idol can predict anything, no nation is too big for God to weigh, and no one who waits on Him stays exhausted forever.", 850],
    ["Then the servant shows up, and he doesn't match any king Judah has seen yet. He goes looking for a bruised reed instead of stepping on it.", 800],
    ["And the chapter ends by turning that same question on Israel. The one meant to carry the light is called blind and deaf.", 800],
    ["That's not a contradiction. It's the whole reason a servant like this has to come at all.", 800],
    ["Tomorrow, Isaiah 43 through 45. God names a foreign king before he's even born, and calls him by name to do it.", 850],
    ["For now, hold on to the reed.", 800],
    ["Bruised, not broken.", 750],
    ["That's who He came for.", 1200],
  ],
};
