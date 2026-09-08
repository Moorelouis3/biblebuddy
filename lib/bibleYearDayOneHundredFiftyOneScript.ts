import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 151, written to the Day 1 standard.
 *
 * Psalms 67-69: a short psalm asking for blessing to spread all the way to
 * the nations, a long processional psalm of God marching his people home
 * from war, and a psalm of suffering the Gospels quote more than almost
 * any other chapter in the Old Testament. Seven blocks across the three
 * psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 151,
  title: "Blessing for the Nations and Suffering",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 151. Psalms 67 through 69.", 700],
    ["A short psalm asking God's blessing to spread all the way to the ends of the earth.", 800],
    ["A long psalm remembering God marching his people home from war like a returning king.", 800],
    ["And a psalm so full of suffering that the Gospels keep quoting it on the darkest day of Jesus's life.", 850],
    ["Blessing reaching outward. Then a cry from all the way down in the mud.", 700],
    ["We are in Psalms 67, 68, and 69.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(67, 1, 7, [
      "God be merciful unto us, and bless us; and cause his face to shine upon us. It opens sounding like Aaron's old blessing over Israel, except this time the reason for it comes right away.",
      "That thy way may be known upon earth, thy saving health among all nations. The blessing was never meant to stop at Israel's border. It was always aimed at everyone else too.",
      "Let the people praise thee, O God; let all the people praise thee. That line repeats twice in seven verses. A small nation, praying for the whole world to end up praising the same God.",
      "Then shall the earth yield her increase; and God, even our own God, shall bless us. God shall bless us; and all the ends of the earth shall fear him. The harvest becomes the proof. Ordinary blessing at home, meant to be seen all the way out at the ends of the earth.",
    ]),
    g(68, 1, 10, [
      "Let God arise, let his enemies be scattered. It is the same line Moses used every time the ark set out in the wilderness, borrowed here as the whole psalm's opening battle cry.",
      "As wax melteth before the fire, so let the wicked perish. But let the righteous be glad; let them exceedingly rejoice. Same God, opposite reaction, depending which side a person is standing on.",
      "Then the tone turns tender without warning. A father of the fatherless, and a judge of the widows, is God in his holy habitation. God setteth the solitary in families: he bringeth out those which are bound with chains. The warrior who scatters enemies is also the one who frees the lonely and the chained.",
      "O God, when thou wentest forth before thy people, the earth shook, even Sinai itself was moved. Thou, O God, didst send a plentiful rain, whereby thou didst confirm thine inheritance, when it was weary. The same march that shook mountains ends with rain for a tired, poor people.",
    ]),
    g(68, 11, 19, [
      "The Lord gave the word: great was the company of those that published it. Kings of armies did flee apace: and she that tarried at home divided the spoil. Even the ones who stayed behind end up sharing in the win, pictured as a dove whose wings are covered in silver.",
      "Why leap ye, ye high hills? this is the hill which God desireth to dwell in. A jab aimed at the taller, more impressive mountains. Their size never decided which hill God actually chose to live on.",
      "The chariots of God are twenty thousand, even thousands of angels: the Lord is among them, as in Sinai, in the holy place. One of the most vivid war pictures in the whole psalm, God's own army pictured riding beside him.",
      "Thou hast ascended on high, thou hast led captivity captive: thou hast received gifts for men; yea, for the rebellious also. Paul quotes this exact verse in Ephesians about Christ's ascension. Even people who used to fight him end up receiving gifts from him.",
    ]),
    g(68, 20, 35, [
      "He that is our God is the God of salvation; and unto GOD the Lord belong the issues from death. Even death is not outside what belongs to him, though he still promises to wound the head of the enemies who keep on sinning.",
      "The singers went before, the players on instruments followed after; among them were the damsels playing with timbrels. Little Benjamin is named right alongside the princes of Judah, Zebulun, and Naphtali. A whole nation pictured in one procession, no tribe left out.",
      "Princes shall come out of Egypt; Ethiopia shall soon stretch out her hands unto God. Two lines that reach far past Israel's own borders, picturing Israel's old enemies as future worshippers instead.",
      "The psalm ends handing all the credit away from itself. Ascribe ye strength unto God. The God of Israel is he that giveth strength and power unto his people. Blessed be God.",
    ]),
    g(69, 1, 12, [
      "Save me, O God; for the waters are come in unto my soul. I sink in deep mire, where there is no standing. It is not a metaphor he chose for effect. It is the only way he can describe how long he has been waiting.",
      "They that hate me without a cause are more than the hairs of mine head... then I restored that which I took not away. A strange line tucked into the middle. He is paying for something he never even stole.",
      "O God, thou knowest my foolishness; and my sins are not hid from thee. He does not skip past his own guilt to plead pure innocence. He names it first, then worries his suffering might embarrass everyone else who is also waiting on God.",
      "For the zeal of thine house hath eaten me up. I am become a stranger unto my brethren, and an alien unto my mother's children. Reproach, sackcloth, becoming a proverb people mock at the gate. John's Gospel later quotes that line about the temple and applies it to Jesus.",
    ]),
    g(69, 13, 21, [
      "But as for me, my prayer is unto thee, O LORD, in an acceptable time. He circles back to the same flood image from the opening, except now it is a prayer instead of only a complaint. Let not the waterflood overflow me.",
      "Draw nigh unto my soul, and redeem it. The word for redeem is the same word used for a relative buying back a family member out of trouble. He is asking God to act like family.",
      "Thou hast known my reproach, and my shame, and my dishonour. Reproach hath broken my heart; and I am full of heaviness: and I looked for some to take pity, but there was none. He lists exactly what has been taken from him, and says God has seen all of it in detail.",
      "They gave me also gall for my meat; and in my thirst they gave me vinegar to drink. The exact detail all four Gospels record happening to Jesus on the cross, written centuries before it happened.",
    ]),
    g(69, 22, 36, [
      "A hard stretch follows. Let their table become a snare before them. Let them be blotted out of the book of the living, and not be written with the righteous. Paul quotes part of this in Romans about a hardened remnant. Uncomfortable words, and they are not softened here.",
      "Then the turn, with no transition at all. But I am poor and sorrowful: let thy salvation, O God, set me up on high. I will praise the name of God with a song. Straight from cursing his enemies into praising God in the very next breath.",
      "This also shall please the LORD better than an ox or bullock that hath horns and hoofs. Not the size of a sacrifice. The praise itself, aimed at exactly the kind of person who has nothing else to offer.",
      "For God will save Zion, and will build the cities of Judah... the seed also of his servants shall inherit it. A man drowning in mire in verse one ends the psalm naming who gets to live safely in the land forever.",
    ]),
  ],
  closing: [
    ["So that is Day 151.", 700],
    ["A blessing meant to spread, a king marching home from battle, and a man drowning inside his own prayer.", 800],
    ["Psalm 67 asks for blessing that does not stop at Israel. It is aimed at every nation on earth.", 800],
    ["Psalm 68 pictures God ascending high, leading captivity captive, and giving gifts even to people who used to fight him.", 850],
    ["And Psalm 69 goes lower than almost any other psalm. Gall for food. Vinegar for thirst. Hated for no reason at all.", 850],
    ["The Gospels keep reaching back into that one chapter on the darkest day Jesus ever had.", 800],
    ["Tomorrow, Psalms 70 through 72. A short cry for help, an old man still hoping, and a prayer for a king who never stops caring for the poor.", 850],
    ["For now, hold on to the first line of Psalm 69.", 750],
    ["Save me, O God, for the waters are come in unto my soul.", 800],
    ["Even that one was heard.", 1200],
  ],
};
