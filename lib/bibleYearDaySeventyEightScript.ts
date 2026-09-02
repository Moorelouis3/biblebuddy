import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 78, written to the Day 1 standard.
 *
 * 2 Samuel 8-11 is the hinge of David's whole story: total military success,
 * covenant kindness to Jonathan's crippled son, a war with Ammon that goes
 * exactly right, and then one spring at home when everything goes wrong.
 * Six blocks across four chapters, the last two carrying Bathsheba and
 * Uriah in full.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 78,
  title: "David's Victories and David's Sin",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 78. David wins on every front. Philistines, Moab, Syria, Edom, all of it.", 750],
    ["He shows kindness to the one man left who could threaten his throne. He wins a war on two fronts at once.", 800],
    ["Then one spring, he stays home instead of going to war, and everything he built starts to come apart.", 850],
    ["We are in 2 Samuel 8 through 11.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(8, 1, 18, [
      "David beats the Philistines, then Moab, then the king of Zobah, then Syria, then Edom, one after another. Every enemy that spent years threatening Israel is suddenly a subject nation instead.",
      "He takes the gold shields of Hadadezer's officers and dedicates them, along with silver and bronze from every nation he subdues, to the Lord. Even the spoils of war end up back in God's hands.",
      "Genesis promised Abraham this exact thing, centuries earlier. A great nation, a name, land from Egypt to the Euphrates. Under David, that promise finally looks like something you could point to on a map.",
      "Then the chapter lists his officials. Recorder, scribe, priests, a commander over his personal guard. A shepherd who once had nothing now runs an actual government. The rise from the sheepfold is complete.",
    ]),
    g(9, 1, 13, [
      "David asks a question nobody in that world asks after winning a throne. Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?",
      "Most new kings hunt down the old dynasty's line to remove every rival. David goes looking for one on purpose, to keep a promise made to a friend who's been dead for years.",
      "He finds Mephibosheth, Jonathan's son, lame in both feet since he was five, when his nurse dropped him while fleeing the news of Saul and Jonathan's deaths. He has spent his whole life hiding, afraid of exactly this kind of visit.",
      "David gives him back all of Saul's land and a permanent seat at the king's own table. Mephibosheth calls himself a dead dog. David treats him like a son. Covenant love outlasts an entire generation.",
    ]),
    g(10, 1, 14, [
      "The king of Ammon dies, and David sends comforters to his son Hanun, remembering kindness Nahash once showed him. It's a simple gesture of respect between two thrones.",
      "Hanun's princes talk him into believing David's men are spies, not mourners. So Hanun shaves off half of each man's beard and cuts their garments off at the hip, and sends them home humiliated.",
      "David tells his men to stay in Jericho until their beards grow back before coming home. He protects their dignity even in defeat, and Ammon knows they've started a war they didn't need to start.",
      "Ammon hires Syrian mercenaries to back them up. Joab splits his own army in two, facing enemies on both sides at once, and tells his brother Abisai the plan simply. Be of good courage, and let us play the men for our people, and for the cities of our God.",
    ]),
    g(10, 15, 19, [
      "The Syrians regroup under Hadarezer's general Shobach after their first defeat, gathering troops from across the Euphrates. This isn't over for them yet.",
      "So David does something he skipped back on Day 77 with the Philistines. He doesn't send Joab this time. He gathers all Israel himself and crosses the Jordan personally.",
      "Israel kills seven hundred charioteers and forty thousand horsemen, and Shobach the commander dies on the field. This is not a border skirmish anymore. It's a decisive end to Syria's threat.",
      "Every king who had been serving Hadarezer makes peace with Israel instead, and Syria stops helping Ammon at all. One battle David leads in person settles an entire regional war.",
    ]),
    g(11, 1, 13, [
      "It is spring, the time when kings go out to battle. David sends Joab and the whole army instead, and stays behind in Jerusalem. The text says exactly where he should have been, and exactly why he wasn't there.",
      "One evening he walks on his roof and sees a woman bathing. He finds out her name, Bathsheba, and that she's married to Uriah, one of his own soldiers, currently away fighting David's war. He sends for her anyway, and she becomes pregnant.",
      "So he sends for Uriah, hoping a night at home with his wife will cover it. Uriah won't go. The ark and Israel and Judah are camped in the field, and my lord Joab, and the servants of my lord, are encamped in the open fields. Shall I then go into mine house?",
      "Uriah sleeps at the palace door instead, loyal to men who are sleeping on the ground while he could be comfortable. David gets him drunk that night, hoping that will do what sobriety wouldn't. It doesn't. Uriah still won't go home.",
    ]),
    g(11, 14, 27, [
      "David writes a letter and sends it by Uriah's own hand. Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die. The man carries his own death warrant back to the war he's been so loyal to.",
      "Joab does it, and other soldiers die alongside Uriah in the process, casualties of a plan that was never really about the battle at all. Joab sends word back carefully, knowing exactly what David will want to hear.",
      "When Bathsheba's mourning ends, David brings her to his house and marries her. From the outside, it could almost look like mercy. A widow, provided for.",
      "The chapter's last line cuts through all of it. But the thing that David had done displeased the Lord. Not the army. Not the palace. Not even Bathsheba's grief. God saw exactly what happened, and said so.",
    ]),
  ],
  closing: [
    ["So that is Day 78.", 700],
    ["Every enemy David faced on a battlefield, he beat.", 750],
    ["He kept a decades-old promise to a dead friend by giving his broken son a permanent seat at the royal table.", 800],
    ["Then one season he stayed home instead of going to war, and a look from a rooftop turned into adultery, a cover-up, and a murder disguised as a casualty of battle.", 850],
    ["Uriah stayed loyal to David's own war even drunk, on the same nights David was betraying him completely sober.", 850],
    ["Tomorrow, 2 Samuel 12 through 15. A prophet walks into the palace with a story, and David's own house starts paying for what he did.", 850],
    ["For now, sit with the line that ends this day.", 750],
    ["The thing that David had done.", 750],
    ["Displeased the Lord.", 1200],
  ],
};
