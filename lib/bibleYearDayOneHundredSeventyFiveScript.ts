import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 175, written to the Day 1 standard.
 *
 * Psalms 139-141: the most personal psalm in the book, being fully known
 * and unable to hide, then two psalms asking for protection from violent,
 * scheming men, the second one turning that same request inward on David's
 * own mouth. Seven blocks, splitting Psalm 139's twenty-four verses across
 * its four turns.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 175,
  title: "Known by God and Kept From Evil",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 175.", 650],
    ["Yesterday ended with a small prayer. He answered when I cried.", 750],
    ["Today opens with the most personal psalm in the whole book. O Lord, thou hast searched me, and known me.", 800],
    ["Then two psalms asking God for something much harder. Protection from people who want you dead.", 800],
    ["We are in Psalms 139, 140, and 141.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(139, 1, 6, [
      "O Lord, thou hast searched me, and known me. Not just seen. Searched. Like someone who went looking on purpose.",
      "Thou knowest my downsitting and mine uprising. The smallest things you do, sitting down, standing up, are already known before you explain them.",
      "Verse four goes further. There is not a word in my tongue, but, lo, O Lord, thou knowest it altogether. Known before the sentence even finishes leaving your mouth.",
      "Verse six is the honest reaction to all of it. Such knowledge is too wonderful for me. Not comfortable yet. Just true, and almost too much to hold.",
    ]),
    g(139, 7, 12, [
      "Whither shall I go from thy spirit? or whither shall I flee from thy presence? This sounds like a question from someone trying to run, not someone at peace.",
      "Heaven, the grave, the far side of the sea. Every place he names, God is already there before him.",
      "Even the darkness gets named directly. If I say, surely the darkness shall cover me, even the night shall be light about me. The one place people hide from everyone else does not hide anyone from God.",
      "Read together with the last block, this stops sounding like comfort alone. Being fully known and being unable to run from God are the same fact, felt two different ways depending on what you are carrying.",
    ]),
    g(139, 13, 18, [
      "Thou hast possessed my reins: thou hast covered me in my mother's womb. Before birth, before a name, God was already forming this specific person.",
      "I am fearfully and wonderfully made. Not generic praise about bodies in general. This psalm is about one particular body, made on purpose.",
      "In thy book all my members were written, which in continuance were fashioned, when as yet there was none of them. God's knowledge of this life reaches back before the life itself existed.",
      "Then verse seventeen shifts from being known to God being thought about constantly. How precious also are thy thoughts unto me. The searching from the start of the psalm turns out to run both directions.",
    ]),
    g(139, 19, 24, [
      "Surely thou wilt slay the wicked, O God: depart from me therefore, ye bloody men. After eighteen verses of wonder, the tone turns hard without warning.",
      "I hate them with perfect hatred: I count them mine enemies. This project will not soften that line. It says exactly what it says. Sit with the fact that Scripture includes prayers this raw.",
      "But watch what happens right after. The psalm does not end on hatred of others. It turns the search inward. Search me, O God, and know my heart: try me, and know my thoughts.",
      "The same searching from verse one, asked for again on purpose. And see if there be any wicked way in me. The man who just condemned the wicked asks to be checked for the same thing.",
    ]),
    g(140, 1, 8, [
      "Deliver me, O Lord, from the evil man: preserve me from the violent man. After searching his own heart, David now asks to be protected from someone else's.",
      "They have sharpened their tongues like a serpent; adders' poison is under their lips. The danger here is not a weapon. It is what people say.",
      "The proud have hid a snare for me, and cords; they have spread a net by the wayside. This is a trap laid quietly, not a fight out in the open.",
      "In the middle of all that, one plain line. I said unto the Lord, thou art my God. Simple, stated fact, right in the middle of real danger.",
    ]),
    g(140, 9, 13, [
      "As for the head of those that compass me about, let the mischief of their own lips cover them. David asks for their own words to be the thing that catches them.",
      "Let burning coals fall upon them. This is not gentle language, and the psalm does not apologize for it.",
      "Then verse twelve turns the whole prayer around. I know that the Lord will maintain the cause of the afflicted, and the right of the poor. Underneath the anger is a conviction that God actually cares who wins.",
      "Surely the righteous shall give thanks unto thy name: the upright shall dwell in thy presence. The psalm ends expecting to still be standing when this is over.",
    ]),
    g(141, 1, 10, [
      "Lord, I cry unto thee: make haste unto me. After two psalms about other people's mouths, this one turns the attention to David's own.",
      "Set a watch, O Lord, before my mouth; keep the door of my lips. He is not asking to avoid danger. He is asking to not become dangerous himself.",
      "Verse five is one of the harder lines in the psalms. Let the righteous smite me; it shall be a kindness. He would rather be corrected by someone honest than flattered by someone dangerous.",
      "The last verse turns the trap from Psalm 140 back on the people who set it. Let the wicked fall into their own nets, whilst that I withal escape. The same snares from yesterday's block show up again, and this time they catch the wrong person.",
    ]),
  ],
  closing: [
    ["So that is Day 175.", 700],
    ["A psalm about being fully known, and two psalms about asking God to guard you from people who mean harm.", 750],
    ["Psalm 139 will not let you think of yourself as random. Every member was written in the book before one of them existed.", 800],
    ["Psalm 140 does not pretend the danger is small. Sharpened tongues, hidden snares, real enemies.", 800],
    ["And Psalm 141 turns the same request inward. Guard my mouth before you guard me from anyone else's.", 850],
    ["Tomorrow, Psalms 142 through 144. A man alone in a cave, and a king asking to be taught how to fight.", 850],
    ["For now, hold on to the line from the middle of Psalm 139.", 800],
    ["Search me, O God, and know my heart.", 850],
    ["Try me, and know my thoughts.", 1200],
  ],
};
