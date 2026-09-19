import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 327, written to the Day 1 standard.
 *
 * First Corinthians 11 through 13: worship gone wrong at the Lord's table,
 * one Spirit handing out different gifts to one body, and then Paul setting
 * everything else down to describe the one thing that outlasts all of it.
 * Five blocks across three chapters.
 */

const firstCorinthiansEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 11:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 12:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 13:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 327,
  title: "Worship, Gifts, and Love",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 327.", 700],
    ["The Corinthians could not stop competing with each other. Not even at church.", 800],
    ["Today Paul watches them turn the Lord's table into a place where the rich eat and the poor go hungry, and their spiritual gifts into a ranking system.", 850],
    ["And then, right in the middle of correcting both, he stops and writes the most famous paragraph he ever wrote.", 850],
    ["We are in First Corinthians 11, 12, and 13.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstCorinthiansEleven(2, 16, [
      "Paul addresses head coverings in worship, a custom tied to how a woman's honor and a man's honor were read in that culture at that moment. However you land on the custom itself, notice what he refuses to let it become a weapon.",
      "For as the woman is of the man, even so is the man also by the woman, but all things of God. Right after laying out the order, he pulls it back to mutual dependence. Neither sex gets to claim the other is unnecessary.",
      "Doth not even nature itself teach you, he asks, pointing to something as ordinary as hair length and how a culture reads it. He's not building a universal law out of a hairstyle. He's asking them to care about how their worship looks to the people watching it.",
      "But if any man seem to be contentious, we have no such custom, neither the churches of God. When the argument threatens to become bigger than the worship itself, Paul just closes it. Some things are not worth splitting a church over.",
    ]),
    firstCorinthiansEleven(17, 34, [
      "Now in this that I declare unto you I praise you not, that ye come together not for the better, but for the worse. The Lord's Supper in Corinth had become a potluck where the wealthy ate their fill before the poor arrived, and one is hungry, and another is drunken.",
      "Have ye not houses to eat and to drink in? Or despise ye the church of God, and shame them that have not? Paul is not gentle here. The meal meant to remember a body broken for everyone had become a place where some bodies mattered less.",
      "He retells what he'd already delivered to them: the Lord Jesus, the same night he was betrayed, took bread, gave thanks, broke it, and said, this is my body, which is broken for you. This do in remembrance of me. The same words the church still says today.",
      "Wherefore whosoever shall eat this bread, and drink this cup of the Lord, unworthily, shall be guilty of the body and blood of the Lord. Let a man examine himself. Not a warning to keep people away from the table — a warning to come to it honestly.",
    ]),
    firstCorinthiansTwelve(1, 11, [
      "Now concerning spiritual gifts, brethren, I would not have you ignorant. There are diversities of gifts, but the same Spirit. Differences of administrations, but the same Lord. Diversities of operations, but the same God which worketh all in all. Three times, one source behind every difference.",
      "To one is given the word of wisdom, to another the word of knowledge, to another faith, to another gifts of healing, to another miracles, prophecy, discerning of spirits, tongues, interpretation of tongues. A long list, and not one name on it competing with another.",
      "But all these worketh that one and the selfsame Spirit, dividing to every man severally as he will. Nobody picks their gift off a shelf. It's handed out by a will other than their own, which means nobody earned bragging rights over what they got.",
      "The gifts had become status symbols in Corinth — proof of who was more spiritual. Paul starts by pointing every single one of them straight back to the Giver before he says another word about how they should be used.",
    ]),
    firstCorinthiansTwelve(12, 31, [
      "For as the body is one, and hath many members, and all the members of that one body, being many, are one body, so also is Christ. If the foot shall say, because I am not the hand, I am not of the body — is it therefore not of the body? The lesser gift doesn't get to disqualify itself.",
      "Those members of the body which we think to be less honourable, upon these we bestow more abundant honour. God built the body so the parts everyone overlooks get more care, not less, so that there should be no schism in the body.",
      "Whether one member suffer, all the members suffer with it, or one member be honoured, all the members rejoice with it. Ye are the body of Christ, and members in particular. Not a metaphor for unity in general. A description of what actually happens to you when it happens to someone else.",
      "Are all apostles? Are all prophets? Are all workers of miracles? No, and that's the point. But covet earnestly the best gifts, he says, and then, and yet shew I unto you a more excellent way. He's about to tell them what that way is.",
    ]),
    firstCorinthiansThirteen(1, 13, [
      "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal. Every gift they'd been ranking each other by — tongues, prophecy, knowledge, even giving everything away — Paul says is nothing without love running underneath it.",
      "Charity suffereth long, and is kind. Charity envieth not, vaunteth not itself, is not puffed up, seeketh not her own, is not easily provoked, thinketh no evil. Read that list against the church he's been correcting for thirteen chapters. Every failure they'd committed, love is the opposite of.",
      "Charity never faileth. But whether there be prophecies, they shall fail. Whether there be tongues, they shall cease. Whether there be knowledge, it shall vanish away. Everything they'd been competing over has an expiration date. Love does not.",
      "When I was a child, I spake as a child. But when I became a man, I put away childish things. For now we see through a glass, darkly, but then face to face. And now abideth faith, hope, charity, these three, but the greatest of these is charity.",
    ]),
  ],
  closing: [
    ["So that is Day 327.", 700],
    ["A table where the poor went hungry. Gifts turned into a ranking system.", 750],
    ["And Paul answers both the same way. Not with better rules. With love.", 800],
    ["Charity suffereth long, and is kind. Read your own name into that sentence and see how it holds up.", 850],
    ["Everything else on that list — tongues, prophecy, knowledge — has an expiration date. Love does not.", 850],
    ["Tomorrow, First Corinthians 14 through 16. Order in worship, and the resurrection Paul says the whole faith stands or falls on.", 850],
    ["For now, sit with the greatest of these.", 800],
    ["Faith. Hope. Charity.", 750],
    ["And the greatest of these is charity.", 1200],
  ],
};
