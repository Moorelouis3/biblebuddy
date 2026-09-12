import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 181, written to the Day 1 standard.
 *
 * Proverbs 7-9: a real seduction scene, then wisdom's own long speech, then
 * two women building two houses and issuing the same invitation. Six blocks
 * covering all three chapters in order, ending on the deliberate mirror
 * between wisdom's feast and folly's.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 181,
  title: "Wisdom Calls, Folly Tempts",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 181.", 650],
    ["Yesterday it was keep thy heart with all diligence. Today you watch what happens when a young man does not.", 800],
    ["Two women are calling out in this reading. One from a window in the dark. One from the highest place in the city.", 800],
    ["They are after the same person, and by the end, they even sound alike.", 800],
    ["We are in Proverbs 7 through 9.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 9, [
      "My son, keep my words, and lay up my commandments with thee... bind them upon thy fingers, write them upon the table of thine heart. Not just heard once. Worn on the hand, carved into the inside.",
      "Say unto wisdom, Thou art my sister; and call understanding thy kinswoman. Wisdom gets framed as family here, close enough to protect you, not a stranger's advice.",
      "At the window of my house I looked through my casement, and beheld among the simple ones... a young man void of understanding. The teacher is not guessing. He is describing something he actually watched happen.",
      "Passing through the street near her corner... in the twilight, in the evening, in the black and dark night. Every detail says the same thing. He was near where he should not have been, and he waited until the dark made it easier.",
    ]),
    g(7, 10, 27, [
      "There met him a woman with the attire of an harlot, and subtil of heart... she is loud and stubborn; her feet abide not in her house. Not quiet and hidden. Loud, restless, out looking.",
      "I have peace offerings with me; this day have I payed my vows... come, let us take our fill of love until the morning: for the goodman is not at home. She wraps the invitation in religious language and has already checked that no one will interrupt them. This was planned.",
      "With her much fair speech she caused him to yield... he goeth after her straightway, as an ox goeth to the slaughter... till a dart strike through his liver. He is not pictured as a bold sinner. He is pictured as an animal walking to its own death without knowing it.",
      "For she hath cast down many wounded: yea, many strong men have been slain by her. Her house is the way to hell, going down to the chambers of death. The warning names the scale. Not just the weak fall here. And the address is given plainly.",
    ]),
    g(8, 1, 21, [
      "Doth not wisdom cry? and understanding put forth her voice?... she crieth at the gates, at the entry of the city. Wisdom is just as loud and just as public as the woman in chapter seven. Same volume, opposite message.",
      "My mouth shall speak truth; and wickedness is an abomination to my lips... there is nothing froward or perverse in them. Set directly against the smooth, flattering mouth from the last chapter.",
      "Receive my instruction, and not silver; and knowledge rather than choice gold. For wisdom is better than rubies. The claim is not modest. It says outright that it outranks the things people already chase hardest.",
      "By me kings reign, and princes decree justice... I love them that love me; and those that seek me early shall find me. Wisdom claims to stand behind real power in the world, and makes an actual promise to whoever looks for her.",
    ]),
    g(8, 22, 36, [
      "The Lord possessed me in the beginning of his way, before his works of old. I was set up from everlasting, from the beginning, or ever the earth was. This is not just good advice anymore. Wisdom claims to have existed before the world did.",
      "When he prepared the heavens, I was there: when he set a compass upon the face of the depth. Present, by this account, at the actual moment the world was shaped.",
      "Then I was by him, as one brought up with him: and I was daily his delight... and my delights were with the sons of men. Wisdom's joy runs in one line straight from being with God to being with people. No gap between the two.",
      "Whoso findeth me findeth life, and shall obtain favour of the Lord. But he that sinneth against me wrongeth his own soul: all they that hate me love death. Wisdom closes with the same stakes as the warning in chapter seven, only now spoken in her own voice.",
    ]),
    g(9, 1, 12, [
      "Wisdom hath builded her house, she hath hewn out her seven pillars... she hath killed her beasts; she hath mingled her wine; she hath also furnished her table. A real feast, already prepared, ready before a single guest arrives.",
      "She hath sent forth her maidens: she crieth upon the highest places of the city... whoso is simple, let him turn in hither. The invitation goes out to the exact same simple, unformed people the woman in chapter seven was hunting.",
      "Forsake the foolish, and live; and go in the way of understanding. The offer is stated as plainly as possible. Live, or don't.",
      "The fear of the Lord is the beginning of wisdom... if thou be wise, thou shalt be wise for thyself: but if thou scornest, thou alone shalt bear it. Whichever way it goes, the weight of it lands on the one person who chose.",
    ]),
    g(9, 13, 18, [
      "A foolish woman is clamorous: she is simple, and knoweth nothing... she sitteth at the door of her house, on a seat in the high places of the city. Folly takes the exact same posture wisdom just took. Same high place, same public seat. This is imitation on purpose.",
      "To call passengers who go right on their ways... whoso is simple, let him turn in hither. Even her words copy wisdom's invitation almost exactly. That is the whole danger. It sounds the same.",
      "Stolen waters are sweet, and bread eaten in secret is pleasant. That is the entire pitch, and it is short. It never claims to be true. It only claims to feel good.",
      "He knoweth not that the dead are there; and that her guests are in the depths of hell. Chapter nine ends exactly where chapter seven ended, just dressed differently the second time.",
    ]),
  ],
  closing: [
    ["So that is Day 181.", 700],
    ["Two women, two houses, two invitations shouted from the same high places in the city.", 800],
    ["One built her house first and set the table before calling anyone. The other copied the posture and the words, and offered a feeling instead of a feast.", 850],
    ["Both of them end their chapter the same way, naming exactly where the road goes.", 800],
    ["In between, a young man walks into the dark corner, and wisdom stands there claiming she was with God before the world existed.", 800],
    ["The whole reading keeps asking one question. Which voice are you going to walk toward.", 800],
    ["Tomorrow, Proverbs 10 through 12. The book shifts into short, standalone sayings about words, work, and doing right.", 850],
    ["For now, hold on to wisdom's own promise.", 800],
    ["Whoso findeth me findeth life.", 1200],
  ],
};
