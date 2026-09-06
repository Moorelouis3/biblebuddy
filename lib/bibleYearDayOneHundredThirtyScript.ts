import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 130, written to the Day 1 standard.
 *
 * Psalms 4-6 continue the Psalter with three of David's night and morning
 * prayers, ending in the rawest lament so far: bones vexed, a bed soaked in
 * tears, and a sentence he cannot even finish. Six blocks across three
 * short chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 130,
  title: "Prayer in Distress",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 130. Three more of David's prayers, and they get heavier as they go.", 750],
    ["Psalm four starts in distress and somehow ends in a full night's sleep.", 800],
    ["Psalm five is a king praying every single morning like clockwork.", 800],
    ["And Psalm six is the rawest one yet. Bones vexed, a bed soaked in tears, a sentence he cannot even finish.", 850],
    ["We are in Psalms 4 through 6.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 4, [
      "Hear me when I call, O God of my righteousness: thou hast enlarged me when I was in distress. Distress here pictures a tight space with no room to move. Enlarged pictures that same space thrown wide open again.",
      "O ye sons of men, how long will ye turn my glory into shame? how long will ye love vanity, and seek after leasing? Many think this prayer sits right alongside Psalm three, from the very same revolt led by David's own son.",
      "But know that the Lord hath set apart him that is godly for himself: the Lord will hear when I call unto him. He states that as settled fact. He already proved it surviving exactly what Psalm three describes.",
      "Stand in awe, and sin not: commune with your own heart upon your bed, and be still. Strong feeling is allowed here. Sin is where he draws the line. Feel it, then go quiet before God with it.",
    ]),
    g(4, 5, 8, [
      "Offer the sacrifices of righteousness, and put your trust in the Lord. Right ritual and real trust are meant to move together here, not stand apart.",
      "There be many that say, who will shew us any good? Lord, lift thou up the light of thy countenance upon us. That question is doubt talking. David answers doubt with a prayer for God's presence, not with proof.",
      "Thou hast put gladness in my heart, more than in the time that their corn and their wine increased. Corn and wine were the two biggest signs of a good harvest in his world. His joy outweighs that kind of abundance, even though the danger has not actually ended.",
      "I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety. Not walls. Not soldiers. Only the Lord. A cry for help ends in a full night's sleep.",
    ]),
    g(5, 1, 6, [
      "Give ear to my words, O Lord, consider my meditation. My king, and my God: for unto thee will I pray. David was Israel's own king, and he still calls someone else his King.",
      "My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up. Direct here echoes a priest arranging wood on an altar. This is a daily habit, not a one time cry.",
      "For thou art not a God that hath pleasure in wickedness, neither shall evil dwell with thee. A judge who enjoyed evil could never be trusted to oppose it. God's own nature is what makes the rest of this psalm possible.",
      "Thou shalt destroy them that speak leasing: the Lord will abhor the bloody and deceitful man. Leasing is an old word for lies. Violence and deceit get grouped together here as two faces of the same evil.",
    ]),
    g(5, 7, 12, [
      "But as for me, I will come into thy house in the multitude of thy mercy. That is a hard turn. David has just described people God opposes, and now separates himself from them, not by merit, but by mercy.",
      "Lead me, O Lord, in thy righteousness, because of mine enemies; make thy way straight before my face. He is not asking to become righteous by his own effort. He is asking to be led down a road that will not run him into their trap.",
      "For there is no faithfulness in their mouth; their inward part is very wickedness; their throat is an open sepulchre. An open tomb in that world gave off the smell of death. Every word out of their mouths works the same way.",
      "But let all those that put their trust in thee rejoice, let them ever shout for joy, because thou defendest them. The prayer that opened asking to be heard closes with a shield thrown completely around him.",
    ]),
    g(6, 1, 5, [
      "O Lord, rebuke me not in thine anger, neither chasten me in thy hot displeasure. David is not asking God to ignore his sin. He is asking to be corrected out of love instead of fury.",
      "Have mercy upon me, O Lord; for I am weak: O Lord, heal me; for my bones are vexed. Weak here pictures a plant wilting in the sun. This has reached into his body, not just his feelings.",
      "My soul is also sore vexed: but thou, O Lord, how long? He breaks the sentence off in the middle, on purpose. He never finishes explaining what he expects God to do. That is what real lament sounds like.",
      "Return, O Lord, deliver my soul: oh save me for thy mercies' sake. For in death there is no remembrance of thee: in the grave who shall give thee thanks? He is not teaching a doctrine of the afterlife. He is arguing that his life right now can still praise God, so save it.",
    ]),
    g(6, 6, 10, [
      "I am weary with my groaning; all the night make I my bed to swim; I water my couch with my tears. That is not literal. It is how hard grief gets said out loud in this kind of prayer.",
      "Mine eye is consumed because of grief; it waxeth old because of all mine enemies. Two things are pressing on him at once. Sorrow, and people actively working against him.",
      "Depart from me, all ye workers of iniquity; for the Lord hath heard the voice of my weeping. Seven verses of weeping and weakness, and then his tone changes mid-prayer. Nothing outside him has changed yet. He just knows he has been heard.",
      "The Lord hath heard my supplication; the Lord will receive my prayer. Let all mine enemies be ashamed and sore vexed. He says heard twice, and the same word used for his own suffering now gets turned toward the people who caused it. That is justice, not payback for its own sake.",
    ]),
  ],
  closing: [
    ["So that is Day 130.", 700],
    ["A tight space thrown open. A morning prayer repeated like clockwork. And a night so bad the tears would not stop.", 750],
    ["Notice what stays the same across all three psalms. David tells God exactly how bad it is, every single time.", 800],
    ["Distress. Enemies with slippery tongues. Bones that ache and a bed soaked through.", 800],
    ["And Psalm six turns faster than any prayer so far. Seven verses of weeping, then sudden confidence, with nothing outside him changed yet.", 850],
    ["That is not David talking himself into feeling better. That is a man who believes he was actually heard.", 850],
    ["Tomorrow, Psalms 7 through 9. A righteous judge, and real trouble from real enemies.", 850],
    ["For now, hold on to that turn in Psalm six.", 800],
    ["The weeping did not stop.", 750],
    ["But neither did the hearing.", 1200],
  ],
};
