import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 69, written to the Day 1 standard.
 *
 * 1 Samuel 3-6 turns on one hinge: God speaks to a boy in the dark, and by
 * the end of the reading Eli's house is judged, the ark is a captive in
 * Philistine territory, and God defends His own name without any help from
 * Israel's army. Six blocks, splitting each chapter at its natural turn.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 69,
  title: "Samuel Hears God and the Ark Is Taken",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 69. Samuel is still a boy, sleeping a few feet from the ark.", 750],
    ["Tonight he hears his name called in the dark, and assumes it's Eli.", 800],
    ["By the end of today, Eli is dead, Samuel is a prophet, and the ark of God is a prisoner in Philistine territory.", 850],
    ["The ark being present did not save the men who carried it into battle. It rode into disaster instead.", 850],
    ["We are in 1 Samuel 3 through 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(3, 1, 10, [
      "The word of the Lord was rare in those days, no fresh vision breaking through in a long time. Then in the middle of the night, a voice says Samuel's name.",
      "He runs to Eli three times, sure the old man called him. Twice Eli sends him back to bed. On the third time, Eli understands. This is the Lord speaking to the boy.",
      "So Eli tells him what to say. Speak, Lord, for thy servant heareth. Not I already know what You're going to say. Just, I'm listening.",
      "The Lord comes and stands there, not just speaks from a distance. Samuel's first experience of God is God waiting, right there, for one honest sentence.",
    ]),
    sam(3, 11, 21, [
      "What God actually says is hard. He is about to judge Eli's whole house for good, because Eli knew what his sons were doing and never restrained them. Knowing and not stopping it gets treated the same as doing it.",
      "Samuel lies there until morning, afraid to tell Eli any of it. A brand new prophet, and his first assignment is delivering ruin to the man who raised him in the temple.",
      "Eli makes him say it anyway. God do so to thee if you hide anything from me, he says. So Samuel tells him everything and hides nothing.",
      "Eli's answer is a broken man's answer, not a fighting one. It is the Lord, let him do what seemeth him good. Not repentance. Just resignation.",
    ]),
    sam(4, 1, 11, [
      "Israel loses the first battle against the Philistines, and their answer isn't to ask why. It's to go get the ark and carry it to the front line, like a weapon they can point at the enemy.",
      "It works on the Philistines for a moment. They hear Israel's shout when the ark arrives and panic, remembering what this God once did to Egypt. For one scene, the plan looks like it's working.",
      "Then Israel loses anyway. Thirty thousand foot soldiers dead, the ark captured, and Hophni and Phinehas, the corrupt priests from Eli's house, killed exactly where they had no business being.",
      "The ark was never a device you carry into a fight to guarantee a win. It goes where God goes. Israel treated His presence like a spell, and found out it isn't one.",
    ]),
    sam(4, 12, 22, [
      "A messenger runs all the way from the battlefield to Shiloh with his clothes torn. Eli, ninety-eight and blind, is sitting by the road because his heart already trembles for the ark.",
      "He can take the news that the army lost. He can take the news that both his sons are dead. The ark of God is taken is the sentence that kills him. He falls backward off his seat and breaks his neck.",
      "His daughter-in-law goes into labor that same hour, hears the news, and names her son before she dies. Ichabod. The glory has departed.",
      "That name is the whole scene in one word. Not the Philistines have won. The glory is gone. She understood exactly what had actually been lost.",
    ]),
    sam(5, 1, 12, [
      "The Philistines set the captured ark in Dagon's temple, right beside their god, like a trophy. In the morning Dagon is face down on the ground in front of it.",
      "They stand him back up. The next morning he's down again, this time in pieces, head and hands broken off on the threshold. Nobody touched him. Dagon cannot stay upright next to the real God.",
      "Then the people of Ashdod start breaking out in tumors, and they realize this is not a trophy. It's a threat. They ship the ark to Gath. The same thing happens there. Then to Ekron, and the city panics before it even arrives.",
      "God did not need Israel's army to win this fight. He humiliated an enemy's god from inside that god's own temple, while His own people were losing everywhere else.",
    ]),
    sam(6, 1, 21, [
      "After seven months, the Philistines' own priests tell them to send the ark home with a trespass offering, gold models of the tumors and the mice ruining their land. Even pagan priests know you don't send this God back empty-handed.",
      "Then they run a test. Hitch two nursing cows to a cart, set the ark on it, and see which way the cows go on their own. Every instinct in those animals says stay with your calves. They walk straight to Israel instead, lowing the whole way.",
      "The men of Beth-shemesh see the ark coming and celebrate. Then some of them look inside it, and God strikes them down, fifty thousand and seventy men, for treating something holy like something ordinary.",
      "The town's own reaction says it best. Who is able to stand before this holy Lord God? They don't want the ark either. They send it away to Kirjath-jearim. Holiness turns out to be dangerous when nobody prepares for it.",
    ]),
  ],
  closing: [
    ["So that is Day 69.", 700],
    ["A boy learns to say speak, Lord, I'm listening, on the same night an old man's family gets sentenced.", 800],
    ["Israel treated the ark like a weapon and lost the battle and the ark both.", 800],
    ["Eli survived the news of a lost war and two dead sons. The words the ark is taken were what killed him.", 850],
    ["Then the ark went on its own tour of Philistine cities, taking down their god and breaking their people out in plagues, with no Israelite soldier anywhere near it.", 850],
    ["God did not need Israel's army to prove He was still God.", 800],
    ["Tomorrow, 1 Samuel 7 through 10. Israel finally turns back to Him, then asks for exactly the thing that will hurt them. A king.", 900],
    ["For now, hold onto Samuel's line from the dark.", 800],
    ["Speak, Lord.", 750],
    ["For thy servant heareth.", 1200],
  ],
};
