import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 149, written to the Day 1 standard.
 *
 * Psalms 61-63: a cry from the end of the earth for a rock higher than the
 * trouble, a soul told twice to wait only on God, and a man thirsty in a
 * dry land who reaches for God before he reaches for water. Six blocks
 * across the three psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 149,
  title: "Longing for God's Presence",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 149. Psalms 61 through 63.", 700],
    ["A prayer from the end of the earth, asking to be set on a rock higher than the trouble.", 800],
    ["A soul that keeps telling itself to wait, because waiting is not the same as giving up.", 800],
    ["And a man in a dry land, thirsty, who reaches for God before he reaches for water.", 850],
    ["Three psalms, one longing running under all of them.", 700],
    ["We are in Psalms 61, 62, and 63.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(61, 1, 4, [
      "Hear my cry, O God; attend unto my prayer. He starts as far from eloquent as a person can get. A cry, and a plea to just be listened to.",
      "From the end of the earth will I cry unto thee, when my heart is overwhelmed: lead me to the rock that is higher than I. He is not asking to be lifted out of trouble. He is asking to be set somewhere trouble cannot reach.",
      "For thou hast been a shelter for me, and a strong tower from the enemy. Past tense on purpose. He is not guessing at what God might do. He is remembering what God already did.",
      "I will abide in thy tabernacle for ever: I will trust in the covert of thy wings. Selah. From the end of the earth to under God's wings, in four verses. That is the whole shape of the psalm already.",
    ]),
    g(61, 5, 8, [
      "For thou, O God, hast heard my vows: thou hast given me the heritage of those that fear thy name. He shifts from asking to remembering being answered. The prayer changes its own mood halfway through.",
      "Thou wilt prolong the king's life: and his years as many generations. A prayer for the king, likely David himself or the throne he sits on. His own safety was never separate from the nation's.",
      "He shall abide before God for ever: O prepare mercy and truth, which may preserve him. What keeps a king safe is not an army. It is mercy and truth standing guard.",
      "So will I sing praise unto thy name for ever, that I may daily perform my vows. The psalm ends where a lot of these do. Not with the trouble solved, just with the singing already started.",
    ]),
    g(62, 1, 6, [
      "Truly my soul waiteth upon God: from him cometh my salvation. He only is my rock and my salvation; he is my defence; I shall not be greatly moved. Waiting is doing something here. It is where he has put his whole weight.",
      "How long will ye imagine mischief against a man? ye shall be slain all of you: as a bowing wall shall ye be, and as a tottering fence. He turns to the men plotting against him and tells them plainly what they actually are. Not strong. Already falling.",
      "They only consult to cast him down from his excellency: they delight in lies: they bless with their mouth, but they curse inwardly. Selah. Friendly words on the outside, plotting underneath. He names the gap between what they say and what they mean.",
      "My soul, wait thou only upon God; for my expectation is from him. He repeats the opening line to himself, almost like a command. Waiting on God is not passive. It has to be chosen again.",
    ]),
    g(62, 7, 12, [
      "In God is my salvation and my glory: the rock of my strength, and my refuge, is in God. Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us. Selah. He stops talking to himself and turns to talk to everyone listening. What was private becomes an invitation.",
      "Surely men of low degree are vanity, and men of high degree are a lie: to be laid in the balance, they are altogether lighter than vanity. Status does not weigh anything on God's scale. Low or high, people alone cannot hold the weight he is putting on God.",
      "Trust not in oppression, and become not vain in robbery: if riches increase, set not your heart upon them. Taking from others will not save you, and neither will simply having more. Neither one can carry what only God can carry.",
      "God hath spoken once; twice have I heard this; that power belongeth unto God. Also unto thee, O Lord, belongeth mercy: for thou renderest to every man according to his work. Power and mercy in the same God, doing different things. Power backs up what mercy promises.",
    ]),
    g(63, 1, 5, [
      "O God, thou art my God; early will I seek thee: my soul thirsteth for thee, my flesh longeth for thee in a dry and thirsty land, where no water is. He is not in the sanctuary right now. He is in a wilderness, and the thirst is what makes him say God's name first.",
      "To see thy power and thy glory, so as I have seen thee in the sanctuary. He is not asking for something new. He wants to see again what he has already seen before, in a place he cannot currently get to.",
      "Because thy lovingkindness is better than life, my lips shall praise thee. Thus will I bless thee while I live: I will lift up my hands in thy name. A strange thing to say in a dry land with your life actually at risk. He means it anyway.",
      "My soul shall be satisfied as with marrow and fatness; and my mouth shall praise thee with joyful lips. He is hungry and dry, and still reaches for the richest image he has. Satisfaction, not just relief.",
    ]),
    g(63, 6, 11, [
      "When I remember thee upon my bed, and meditate on thee in the night watches. Because thou hast been my help, therefore in the shadow of thy wings will I rejoice. The wilderness by day becomes a sleepless night. He fills both with the same God.",
      "My soul followeth hard after thee: thy right hand upholdeth me. He is not the only one holding on here. While he chases after God, God's hand is already under him.",
      "But those that seek my soul, to destroy it, shall go into the lower parts of the earth. They shall fall by the sword: they shall be a portion for foxes. A hard turn, and he does not apologize for it. The people hunting him will end up as food for animals.",
      "But the king shall rejoice in God; every one that sweareth by him shall glory: but the mouth of them that speak lies shall be stopped. The psalm closes with the same reversal Psalm 61 did. Trouble is not gone, but the singing is already happening.",
    ]),
  ],
  closing: [
    ["So that is Day 149.", 700],
    ["A cry from far away, a soul told to wait, and a thirst that praise did not wait to satisfy.", 750],
    ["Psalm 61 says the rock you need is often higher than you can climb to on your own.", 800],
    ["Psalm 62 says waiting on God is not doing nothing. It is where he put his whole weight.", 800],
    ["And Psalm 63 says you can be dry and thirsty and still call his lovingkindness better than life.", 850],
    ["Tomorrow, Psalms 64 through 66. Enemies plotting in secret, and a whole nation learning what it means to be tried like silver.", 850],
    ["For now, hold on to the thirst.", 800],
    ["It found God before it found water.", 750],
    ["That is not weakness. That is where he wanted you looking.", 1200],
  ],
};
