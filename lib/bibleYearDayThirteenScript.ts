import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 13, written to the Day 1 standard.
 *
 * Genesis 32-33 is the reckoning Jacob has been running from since Day 10:
 * twenty years and a stolen blessing later, Esau is coming with four hundred
 * men. The night alone at the Jabbok, and the brother he actually meets in
 * the morning, are two very different answers to the same fear. Six blocks,
 * matching the shape of Days 11 and 12.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 13,
  title: "Jacob Wrestles With God",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 13. Jacob is finally about to face the brother he ran from.", 750],
    ["Twenty years with Laban are over. He is heading home. And Esau is heading toward him with four hundred men.", 800],
    ["The night before that meeting, alone in the dark, a man grabs him and will not let go until sunrise.", 800],
    ["He walks out of that fight with a new name and a permanent limp.", 900],
    ["Then, in the morning, he finally has to face the brother.", 1000],
    ["We are in Genesis 32 and 33. A wrestling match with no clear opponent, and a reunion nobody expected.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(32, 1, 8, [
      "Jacob is on his way home when angels of God meet him, and he names the place Mahanaim. Two camps. Even the geography is telling him he is not alone.",
      "But he still sends messengers ahead to Esau, laying out everything he owns, hoping to find favor in his sight.",
      "The messengers come back with one line that changes everything. Esau is coming to meet you, and four hundred men with him.",
      "Jacob is greatly afraid and distressed, so he splits everyone and everything he owns into two companies. If Esau destroys one camp, the other might still get away.",
    ]),
    g(32, 9, 21, [
      "Jacob prays, and it is the most honest thing he has said yet. I am not worthy of the least of all the mercies and of all the truth which thou hast shewed unto thy servant.",
      "He remembers crossing this same river once with nothing but a staff. Now he has two companies and is still terrified. Wealth never fixed the fear underneath it.",
      "He asks God plainly for deliverance, because Esau might come and smite the mother with the children. Then he goes and plans anyway. Goats, ewes, camels, cows, donkeys, sent ahead in separate droves with space between each one.",
      "He tells his servants exactly what to say when Esau asks whose animals these are. A present sent to find grace in the sight of my lord. Jacob is praying with one hand and negotiating with the other.",
    ]),
    g(32, 22, 32, [
      "That night he sends his wives, his children, and everything he owns across the ford Jabbok. And Jacob was left alone.",
      "And a man wrestled with him until the breaking of the day. No name given. No explanation. Just a fight in the dark that will not end.",
      "When the man sees he cannot win, he touches Jacob's hip and puts it out of joint, mid-fight, and still Jacob will not stop. I will not let thee go, except thou bless me.",
      "So he gets a new name. Thy name shall be called no more Jacob, but Israel, for as a prince hast thou power with God and with men, and hast prevailed. He calls the place Peniel. I have seen God face to face, and my life is preserved. And he limps into the sunrise.",
    ]),
    g(33, 1, 7, [
      "Jacob looks up and there is Esau, coming with four hundred men. He arranges his family by how much he can bear to lose. Maids and their children first, then Leah and hers, then Rachel and Joseph last, farthest from danger.",
      "Then he goes ahead of all of them himself and bows to the ground seven times as he walks toward his brother.",
      "And Esau runs to meet him, and embraces him, and falls on his neck, and kisses him. And they wept.",
      "Twenty years of fear, and the brother who was supposed to kill him just puts his arms around him instead.",
    ]),
    g(33, 8, 16, [
      "Esau asks about all those droves he passed along the way. Jacob says it plainly. These are to find grace in the sight of my lord.",
      "Esau says, I have enough, my brother, keep that thou hast unto thyself. But Jacob presses the gift on him anyway. I have seen thy face, as though I had seen the face of God, and thou wast pleased with me.",
      "Esau offers to travel alongside him, or leave some of his men to help. Jacob turns both down gently, saying the children are tender and the flocks with young cannot keep that pace, and that he will follow at his own speed.",
      "Esau heads back to Seir that day. Jacob does not actually follow him there. The peace between them is real. It still does not mean Jacob trusts him enough to travel together.",
    ]),
    g(33, 17, 20, [
      "Jacob goes to Succoth instead, builds a house for himself, and makes booths for his cattle. That is where the name comes from. Booths.",
      "From there he comes to Shalem, a city of Shechem, in the land of Canaan itself. He is finally home.",
      "He buys a piece of land from the sons of Hamor for a hundred pieces of money. Not conquered. Bought, fair and plain.",
      "And he raises an altar there and calls it El-elohe-Israel. God, the God of Israel. The name he was given at the Jabbok is now the name he worships by.",
    ]),
  ],
  closing: [
    ["So that is Day 13.", 700],
    ["A night wrestling a stranger in the dark, and a morning embrace from the brother he was sure would kill him.", 700],
    ["Notice which one actually changed Jacob. Not the gifts sent ahead. Not the careful planning. The fight he could not win his way out of.", 800],
    ["He asked for a blessing and got a limp with it. Both were real. He carried both for the rest of his life.", 800],
    ["And then Esau, who had every reason to still be angry, just ran to him instead.", 850],
    ["Sometimes the reconciliation you spend years dreading turns out softer than the years of dread.", 850],
    ["Tomorrow, Genesis 34 through 36. A different kind of violence enters the family, and Esau's line gets its own long account.", 850],
    ["For now, hold on to the name Peniel.", 800],
    ["I have seen God face to face.", 750],
    ["And my life is preserved.", 1200],
  ],
};
