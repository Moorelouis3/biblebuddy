import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 349, written to the Day 1 standard.
 *
 * Hebrews 6-8: a hard warning about falling away, then Melchizedek as the
 * key to a priesthood that outlasts Levi's, then the new covenant promised
 * through Jeremiah, written on the heart instead of stone. Six blocks
 * across three chapters.
 */

const hebrewsSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 6:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 7:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 8:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 349,
  title: "Better Hope and Better Covenant",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 349.", 700],
    ["Yesterday the writer said Jesus is a priest forever, in the line of Melchizedek. Today he explains exactly what that means, and why it changes everything.", 800],
    ["There's a hard warning early on, about people who fall away after tasting everything true. Then a strange king from Genesis becomes the key to the whole argument.", 850],
    ["By the end, God himself promises a new covenant, one written on the heart instead of on stone.", 800],
    ["Hebrews 6 through 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hebrewsSix(1, 8, [
      "Stop going over the basics again and again, the writer says. Repentance from dead works, faith in God, baptisms, laying on of hands, resurrection, eternal judgment. Push on toward maturity instead.",
      "Then a hard warning. People who were once given light, who tasted the heavenly gift, who shared in the Holy Spirit, who tasted the good word of God and the power of the age to come — if they fall away after all that, there's no bringing them back to repentance a second time. They're crucifying the Son of God all over again, holding him up to shame.",
      "The writer pictures two fields. One soaks up the rain and grows crops worth having, and it gets blessed for it. The other soaks up the same rain and grows nothing but thorns. That field gets rejected, close to being cursed, and ends up burned.",
      "Same rain on both fields. Completely different harvest. That's the whole warning in one picture.",
    ]),
    hebrewsSix(9, 20, [
      "But then the tone softens. We're convinced better things are true of you, the writer says, things that go along with salvation, even after a warning like that. God isn't going to forget the work and the love you've already shown, serving other believers.",
      "Keep that same effort up all the way to the end, he says, so the hope stays certain. Don't get lazy. Follow the example of people who inherited the promises through faith and patience.",
      "Look at Abraham. God promised him something, and since there was nobody greater to swear by, God swore by himself. Surely I will bless you, surely I will multiply you. Abraham waited it out and got what was promised.",
      "So God backed his promise with both his word and an oath, two things that can't lie, so you could have real confidence. That hope is like an anchor for your soul, sure and steady, reaching into the place behind the curtain, where Jesus has already gone ahead of you, made a high priest forever in the line of Melchizedek.",
    ]),
    hebrewsSeven(1, 10, [
      "Now the writer goes back to a strange figure from way back in Genesis. Melchizedek, king of Salem and priest of God Most High, met Abraham coming back from rescuing some kings, and blessed him. Abraham gave him a tenth of everything.",
      "His name means king of righteousness. King of Salem means king of peace. And Genesis never records his father, his mother, his birth, or his death. So the writer treats him as a picture of Christ, a priest with no beginning and no end.",
      "Think about how big that is, the writer says. Abraham himself, the father of the whole nation, gave this man a tenth of the plunder.",
      "The regular priests, descended from Levi, collect tithes from their own relatives because the law says so. Melchizedek wasn't even related to them, and he collected tithes from Abraham and blessed him. The lesser always gets blessed by the greater, never the other way around. In a sense, even Levi paid tithes to Melchizedek, because Levi was still inside Abraham's body when that meeting happened.",
    ]),
    hebrewsSeven(11, 19, [
      "So if the old priesthood, the Levites, could actually make anyone perfect, why would God need to raise up a completely different priest, one not even from that line?",
      "Because when the priesthood changes, the law underneath it has to change too. Jesus came from the tribe of Judah, a tribe Moses never once connected to the priesthood.",
      "So this new priest doesn't get the job through bloodline rules. He gets it through the power of a life that never ends. You are a priest forever, in the line of Melchizedek, God says of him.",
      "The old system gets set aside because it was weak and couldn't finish the job. The law never made anyone perfect. But now there's a better hope, and through that hope people actually get to come near to God.",
    ]),
    hebrewsSeven(20, 28, [
      "And this priest didn't just get appointed. He got sworn in. The Lord has sworn and will not change his mind, you are a priest forever. No other priest ever got a guarantee like that. That's how much better a covenant Jesus stands behind.",
      "The old priests kept dying, one after another, so there had to be a constant stream of replacements. This priest never dies. His priesthood doesn't pass to anyone else.",
      "That's why he can save completely, all the way, anyone who comes to God through him. He's alive right now, still speaking up on their behalf.",
      "This is exactly the kind of high priest that was needed. Holy, blameless, uncontaminated by sin, lifted above the heavens. He doesn't have to offer sacrifices every single day, first for his own sin and then for everyone else's, the way the old priests did. He did it once, for good, by offering himself.",
    ]),
    hebrewsEight(1, 13, [
      "Here's the main point of everything so far, the writer says. We have a high priest like that, sitting at the right hand of God's throne, serving in the true, heavenly place of worship, the one God set up, not people.",
      "Every high priest has to offer something, so this one has something to offer too. He's not copying a shadow of the real thing on earth, the way Moses was told to build the old tabernacle exactly to the pattern shown him on the mountain. He's the real thing, mediating a better covenant, resting on better promises.",
      "If the first covenant had worked, there would have been no need for a second one. God himself said it was flawed. Through Jeremiah he says it plainly. The days are coming when I'll make a new covenant, not like the one I made with their ancestors, the one they broke, the one I finally turned away from.",
      "Here's the new one, God says. I'll put my laws inside them, write them on their hearts. I'll be their God, they'll be my people. Nobody will have to teach his neighbor to know the Lord, because everyone will already know me, from the least of them to the greatest. I'll forgive what they've done wrong, and I won't remember their sins anymore. By calling it new, God made the first one old. And anything old and worn out is already on its way out.",
    ]),
  ],
  closing: [
    ["So that's Day 349.", 700],
    ["A warning about falling away, a king with no recorded beginning or end, a priest sworn in by oath, and a new covenant God promises to write on the heart.", 850],
    ["The line to hold onto is the anchor. Hope as an anchor for the soul, sure and steadfast, reaching into the place behind the curtain where Jesus already stands.", 850],
    ["Every priest before him kept dying, kept getting replaced. He doesn't. He's still there, still speaking up for the people who come to God through him.", 850],
    ["And the covenant he mediates isn't rules carved on stone anymore. It's God's law written straight into the heart, and sins God says he won't even remember.", 850],
    ["That's the trade this whole letter keeps making. Old for new. Shadow for the real thing. Death for a priesthood that never ends.", 850],
    ["Tomorrow, Hebrews 9 through 11. The once-for-all sacrifice, and what faith actually is.", 850],
    ["For now, carry the anchor.", 750],
    ["Sure and steadfast.", 750],
    ["Reaching all the way behind the curtain.", 1200],
  ],
};
