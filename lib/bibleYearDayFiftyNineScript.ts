import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 59, written to the Day 1 standard.
 *
 * Joshua 12-15 turns from conquest to inventory: the roll call of thirty-one
 * defeated kings, the land still remaining to be possessed, the eastern
 * tribes' inheritance and Levi's portion, Caleb's request for Hebron, and
 * Judah's border and city lists closing on the Jebusites Judah could not
 * remove from Jerusalem. Six blocks, splitting chapters 13 and 15 in two
 * each so the narrative beats (Caleb, Achsah) get their own room apart from
 * the surrounding lists.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 59,
  title: "The Land Is Distributed",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 59. The fighting just ended. Joshua 11 closed with the land resting from war.", 750],
    ["Now comes the part nobody puts in the highlight reel. Giving it all away.", 800],
    ["Every tribe, every family, gets an actual line drawn on an actual map.", 800],
    ["And in the middle of all that paperwork, one eighty-five-year-old man asks for the one mountain nobody else wants.", 850],
    ["We are in Joshua 12 through 15. A roll call of defeated kings, an old soldier's request, and a daughter who asks her father for water.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(12, 1, 24, [
      "This chapter reads like a receipt, thirty-one lines long, one king struck down at a time, on both sides of the Jordan.",
      "It splits into two halves on purpose. First the kings Moses defeated years ago east of the river, Sihon and Og, the last of the giants. Then the kings Joshua defeated west of it, starting with Jericho and Ai.",
      "Notice the two names doing the heavy lifting. Moses started this. Joshua finished it. Neither one gets to claim the whole win.",
      "Every king on this list was once a real threat standing between Israel and a promise God made to Abraham long before there was an Israel to inherit it.",
    ]),
    josh(13, 1, 7, [
      "Joshua is old now. Stricken in years, said twice in the same verse, like the text wants to make sure it lands.",
      "And God's assessment doesn't flatter him. There remains very much land yet to be possessed. The conquest everyone just celebrated is not actually finished.",
      "But instead of sending Joshua back out to fight, God tells him to divide the land anyway, by lot, including territory still full of Philistines and Geshurites Israel has not touched.",
      "That is a strange kind of faith. Writing your name on ground you do not control yet, because the God who promised it is more reliable than your own progress.",
    ]),
    josh(13, 8, 33, [
      "This whole stretch already belongs to Reuben, Gad, and half of Manasseh, the two and a half tribes who asked to settle east of the Jordan before anyone else crossed it.",
      "One name buried in the middle of the list is worth catching. Balaam, the prophet money could not buy to curse Israel outright, is now counted among the slain. He found another way to hurt them, and it caught up with him.",
      "And twice this chapter repeats the same line about Levi. No inheritance of land, because the LORD God of Israel is their inheritance.",
      "Everyone else on this list gets a plot with borders. Levi gets God Himself, and the text treats that as the better portion, not the missing one.",
    ]),
    josh(14, 1, 15, [
      "Caleb steps forward at eighty-five and holds Joshua to a promise from forty-five years earlier, made at Kadesh-barnea when he was the one spy besides Joshua who came back believing God.",
      "Listen to how he describes himself. As my strength was then, even so is my strength now, for war, both to go out and to come in. He is not asking to rest. He is asking to fight.",
      "And what he asks for is not easy ground. It is Hebron, hill country still full of Anakim, the very giants everyone else has been afraid of since the spies first saw them.",
      "The phrase wholly followed the LORD gets used for Caleb three times in this one chapter. Forty-five years of waiting never wore it down.",
    ]),
    josh(15, 1, 19, [
      "Most of this chapter draws Judah's border, point to point, name after name around the compass. Underneath it, Caleb is still working.",
      "He personally drives the three sons of Anak out of Hebron, Sheshai, Ahiman, and Talmai, the same giants that made an entire generation want to turn back.",
      "Then he offers his daughter Achsah to whoever takes Kirjath-sepher. Othniel does it and marries her. But she is the one who asks for more, coming to her father and requesting springs of water on top of the land she was already given.",
      "Caleb gives her both the upper springs and the lower springs. A daughter negotiating for water rights, inside a chapter that is mostly a list of place names, is not a small detail.",
    ]),
    josh(15, 20, 63, [
      "The rest of the chapter is nothing but city names, grouped by region and counted by number. Twenty-nine here, sixteen there. The text is genuinely doing arithmetic.",
      "This is inheritance up close. Not a feeling, an actual list of actual towns where actual families would raise children for generations.",
      "But it does not close clean. The last verse admits that Judah could not drive the Jebusites out of Jerusalem. They are still there, it says, unto this day.",
      "A conquest that just finished triumphantly in chapter eleven already has an exception written into its own paperwork.",
    ]),
  ],
  closing: [
    ["So that is Day 59.", 700],
    ["Thirty-one dead kings, a divided map, an old man who asked for a mountain, and a daughter who asked for springs.", 750],
    ["Land in this book is never just real estate. It is a promise God made long ago, finally converted into an address.", 800],
    ["Caleb is the one to hold onto here. Everyone else from his generation is gone. He is still fighting at eighty-five, still asking God for hard ground instead of a rest.", 850],
    ["And Jerusalem's stubborn Jebusites are worth remembering too. Even a finished conquest leaves loose threads.", 850],
    ["Tomorrow, Joshua 16 through 19. Five sisters ask for what they were promised, and a tribe with no room left just goes and takes more.", 850],
    ["For now, hold on to what Caleb asked for.", 800],
    ["Not rest. A mountain full of giants.", 750],
    ["He asked for the hard ground.", 1200],
  ],
};
