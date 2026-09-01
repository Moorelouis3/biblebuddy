import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 70, written to the Day 1 standard.
 *
 * 1 Samuel 7-10 moves from twenty quiet years of repentance and one real
 * victory, straight into Israel demanding a king it was warned not to want,
 * and closes with Saul, who came looking for lost donkeys, hiding among the
 * baggage when his own name is called. Six blocks across four chapters.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 70,
  title: "Israel Asks for a King",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 70. The ark comes home to Israel today, but the real story is what Israel does next.", 750],
    ["Twenty years of quiet repentance leads to one battle Israel actually wins.", 800],
    ["Then the very next generation looks at Samuel's corrupt sons and asks for something no judge ever had. A king.", 850],
    ["God warns them exactly what it will cost. They ask anyway.", 800],
    ["We are in 1 Samuel 7 through 10.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(7, 1, 6, [
      "The ark sits at Kirjath-jearim for twenty years, no fanfare, while all Israel simply mourns after the Lord. Twenty years is a long time to just sit with what you lost.",
      "Samuel finally speaks, and he doesn't offer a quick fix. Put away the strange gods first, then serve Him only. Repentance for him isn't a feeling. It's putting your hands on the actual idols and getting rid of them.",
      "They do it. Then they gather at Mizpeh, pour out water on the ground, fast, and say the plainest sentence in the chapter. We have sinned against the Lord.",
      "No sacrifice yet, no ritual to hide behind first. Just the truth said out loud, in front of everyone.",
    ]),
    sam(7, 7, 17, [
      "The Philistines hear Israel is gathered and attack at the worst possible moment, right when the nation is most exposed. Israel's fear makes sense. They just lost a war and the ark to these same men.",
      "Samuel is mid-sacrifice when the enemy closes in, and he doesn't stop to fight. He keeps offering the lamb and crying out to the Lord. God answers with actual thunder that throws the Philistine army into panic.",
      "Samuel sets up a stone afterward and names it Ebenezer. Hitherto hath the Lord helped us. Not a monument to one win. A marker for everything up to that point.",
      "For the rest of Samuel's life, the Philistines stay off Israel's land. One honest confession and one battle turn twenty years of oppression around.",
    ]),
    sam(8, 1, 9, [
      "Samuel gets old and does the one thing you'd think he learned not to do. He hands his sons the job, and they turn out just like Eli's sons. Bribes, twisted judgment, using the position for money.",
      "So the elders come to Samuel with a request that sounds reasonable on the surface. Make us a king, like all the nations have. Your sons are corrupt, so give us something else to hang our hope on.",
      "It wounds Samuel personally, but God tells him something Samuel probably didn't expect. This was never about you. They have not rejected thee, but they have rejected me.",
      "Wanting a king wasn't really about Samuel's sons. It was Israel wanting to look like every other nation, instead of being the one nation that answers to God directly.",
    ]),
    sam(8, 10, 22, [
      "God tells Samuel to warn them first, in detail, what a king will actually cost. Your sons will fight his wars. Your daughters will work his kitchens. Your fields, your servants, a tenth of everything you own.",
      "Then comes the line that should stop anyone. In that day ye shall cry out because of your king, and the Lord will not hear you. He isn't describing a risk. He is telling them exactly what is coming.",
      "They hear every word of it and ask anyway. Nay, but we will have a king over us, that we also may be like all the nations. The warning changes nothing.",
      "God's answer is not more argument. Hearken unto their voice, and make them a king. Sometimes what looks like love is handing someone exactly what they insisted on.",
    ]),
    sam(9, 1, 27, [
      "Saul is out looking for his father's lost donkeys, nothing more, when his servant suggests asking the local man of God for directions. That is the entire reason Saul walks into Samuel's town.",
      "God had already told Samuel the day before. A man from Benjamin is coming, and this is your king. Saul has no idea any of this is happening. He thinks he is here about donkeys.",
      "Samuel treats him like an honored guest before Saul understands why, seats him in the best place at the feast, and tells him the asses were found three days ago, so stop worrying about them.",
      "Then, alone on the rooftop, Samuel tells him the real reason he's here. Everything that follows starts with a man who wasn't looking for a throne at all.",
    ]),
    sam(10, 1, 27, [
      "Samuel anoints Saul privately with oil and hands him a string of specific signs to prove this is real. Men by Rachel's tomb, three men carrying bread and wine, a company of prophets coming down from the high place. Every one happens exactly as told.",
      "When the Spirit of the Lord comes on Saul, he prophesies right along with them, and people who've known him his whole life start asking, is Saul also among the prophets? God gave him, in Samuel's words, another heart.",
      "Then at Mizpeh, Samuel makes it public by lot in front of the whole nation. When Saul's name comes up, he is nowhere to be found. They find him hiding among the baggage.",
      "He's pulled out taller than everyone else in the crowd, and most of the nation shouts God save the king. Some despise him and bring him nothing. Israel got its king, and the story already has two very different reactions to him.",
    ]),
  ],
  closing: [
    ["So that is Day 70.", 700],
    ["Israel spends twenty years mourning before Samuel even tells them what to do about it.", 800],
    ["Put away the false gods, say the truth out loud, and God answers with thunder on the exact day the enemy attacks.", 800],
    ["Then Samuel gets old, his own sons turn corrupt, and Israel decides the fix is a king like everyone else has.", 850],
    ["God tells Samuel plainly. They didn't reject you. They rejected me.", 800],
    ["He warns them in detail what it will cost. They ask for it anyway, and get exactly what they asked for.", 850],
    ["And the man chosen for it wasn't looking for a throne. He was looking for lost donkeys, and ended up hiding in the baggage when his own name was called.", 900],
    ["Tomorrow, 1 Samuel 11 through 14. Saul's first real test as king, and his first real failure.", 900],
    ["For now, sit with Samuel's stone.", 800],
    ["Hitherto hath the Lord helped us.", 1200],
  ],
};
