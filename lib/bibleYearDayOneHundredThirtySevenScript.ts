import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 137, written to the Day 1 standard.
 *
 * Psalms 25-27: an acrostic prayer for guidance that turns into a plea to be
 * forgiven for old sins, a short claim of clean hands, and a psalm that
 * swings from total confidence to raw pleading and back to waiting. Psalm 25
 * is the longest reading today, so it gets two blocks; Psalm 26 stays whole;
 * Psalm 27 splits where its tone flips from confident to desperate.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 137,
  title: "Guidance, Forgiveness, and Courage",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 137. Yesterday ended at the temple gates, asking who this King of glory even is.", 750],
    ["Today is quieter, and more personal.", 750],
    ["Psalm twenty-five is a man asking to be taught, then asking to be forgiven for things he did a long time ago.", 800],
    ["Psalm twenty-six is a short, almost uncomfortable claim to have kept his hands clean.", 800],
    ["And Psalm twenty-seven starts fearless, then admits he is afraid his own parents could leave him.", 850],
    ["We are in Psalms 25 through 27.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 10, [
      "Unto thee, O LORD, do I lift up my soul. O my God, I trust in thee: let me not be ashamed, let not mine enemies triumph over me. The psalm opens with his soul physically lifted toward God, before he has asked for anything specific yet.",
      "Shew me thy ways, O LORD; teach me thy paths. Lead me in thy truth, and teach me: for thou art the God of my salvation; on thee do I wait all the day. He does not ask God to fix his circumstances first. He asks to be shown the way, and says he will wait all day for the answer.",
      "Remember, O LORD, thy tender mercies and thy lovingkindnesses; for they have been ever of old. Remember not the sins of my youth, nor my transgressions: according to thy mercy remember thou me for thy goodness' sake, O LORD. He asks God to remember one thing and forget another. Old mercy, not old failure.",
      "Good and upright is the LORD: therefore will he teach sinners in the way. The meek will he guide in judgment: and the meek will he teach his way. Being taught by God here is not for the people who already have it together. It is specifically for sinners and for the meek.",
    ]),
    g(25, 11, 22, [
      "For thy name's sake, O LORD, pardon mine iniquity; for it is great. He does not minimize what he did to make the request easier. He calls it great, and asks anyway.",
      "The secret of the LORD is with them that fear him; and he will shew them his covenant. Mine eyes are ever toward the LORD; for he shall pluck my feet out of the net. There is a hidden trap somewhere ahead of him. He is not watching his own feet for it. He is watching God.",
      "Turn thee unto me, and have mercy upon me; for I am desolate and afflicted. The troubles of my heart are enlarged: O bring thou me out of my distresses. Look upon mine affliction and my pain; and forgive all my sins. In three verses he names being alone, a heart under pressure, and pain, then asks for forgiveness in the middle of naming his suffering, not after it eases.",
      "Consider mine enemies; for they are many; and they hate me with cruel hatred... Let integrity and uprightness preserve me; for I wait on thee. Redeem Israel, O God, out of all his troubles. His very last line widens out from his own trouble to the whole nation's. His private prayer ends by praying for everyone else too.",
    ]),
    g(26, 1, 12, [
      "Judge me, O LORD; for I have walked in mine integrity: I have trusted also in the LORD; therefore I shall not slide. This psalm opens with a request almost nobody would risk. He asks God to examine his life closely.",
      "Examine me, O LORD, and prove me; try my reins and my heart. I have not sat with vain persons, neither will I go in with dissemblers. Reins meant the inward parts, where motive lives, not just actions. He is not only claiming clean behavior. He is asking God to check underneath it.",
      "I have hated the congregation of evil doers; and will not sit with the wicked. I will wash mine hands in innocency: so will I compass thine altar, O LORD. Washing hands before approaching an altar was a real, physical act of preparation. He is describing something he actually does, not just a feeling.",
      "Gather not my soul with sinners, nor my life with bloody men... But as for me, I will walk in mine integrity: redeem me, and be merciful unto me. My foot standeth in an even place: in the congregations will I bless the LORD. Even after asking to be judged and examined, the last thing he asks for is still mercy, not just a verdict in his favor.",
    ]),
    g(27, 1, 6, [
      "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid? The psalm opens with two questions that expect no real answer. He is not asking who to fear. He is saying there is no one.",
      "When the wicked, even mine enemies and my foes, came upon me to eat up my flesh, they stumbled and fell. Though an host should encamp against me, my heart shall not fear. An entire army camped around him, and he says his heart still would not fear. That is not the absence of danger. That is confidence inside real danger.",
      "One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD. Out of everything a king could want, he narrows it down to one thing, and it is simply to stay close to God.",
      "For in the time of trouble he shall hide me in his pavilion... he shall set me up upon a rock. And now shall mine head be lifted up above mine enemies round about me. The chapter has moved from fearless in the moment to physically lifted above the threat entirely.",
    ]),
    g(27, 7, 14, [
      "Hear, O LORD, when I cry with my voice: have mercy also upon me, and answer me. The tone changes hard, right here. The same man who just said he feared nothing is now crying out and asking to simply be answered.",
      "When thou saidst, Seek ye my face; my heart said unto thee, Thy face, LORD, will I seek. Hide not thy face far from me. God's own invitation to seek him becomes the thing David repeats back, almost like holding God to his own word.",
      "When my father and my mother forsake me, then the LORD will take me up. This is the most exposed line in the whole psalm. He names the two people least likely to ever abandon someone, and says even if they did, God would still be there.",
      "I had fainted, unless I had believed to see the goodness of the LORD in the land of the living. Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait on the LORD. The psalm does not end with the fear resolved. It ends with an instruction to keep waiting anyway, spoken twice.",
    ]),
  ],
  closing: [
    ["So that is Day 137.", 700],
    ["A prayer to be taught, a claim to be clean, and a psalm that goes from fearless to desperate and back to waiting.", 800],
    ["Notice that none of these three psalms end with the problem solved.", 800],
    ["Psalm twenty-five ends still asking to be redeemed. Psalm twenty-six ends asking for mercy, not a verdict. Psalm twenty-seven ends with an instruction, not an answer.", 850],
    ["Wait on the LORD: be of good courage, and he shall strengthen thine heart.", 800],
    ["That gets said twice in one verse, because it is not natural. It has to be said again to actually land.", 850],
    ["Tomorrow, Psalms 28 through 30. A cry for help, a claim to real strength, and a psalm that ends in joy.", 850],
    ["For now, hold on to the waiting.", 750],
    ["Not the answer. Just the waiting.", 800],
    ["Be of good courage.", 1200],
  ],
};
