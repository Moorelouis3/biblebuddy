import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 213, written to the Day 1 standard.
 *
 * Isaiah 52-54: Zion told to wake up one more time, then the Suffering
 * Servant chapter itself - exalted and marred in back-to-back verses,
 * silent under abuse, buried with the wicked - and Zion answered with a
 * marriage restored. Six blocks across three chapters (44 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 213,
  title: "The Suffering Servant",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 213.", 700],
    ["This is the chapter. If you've heard one part of Isaiah read out loud before, it's probably this one.", 800],
    ["A servant beaten past the point of looking human, and a crowd standing there assuming he deserved it.", 850],
    ["Then Isaiah tells you what actually happened. It isn't what the crowd thought.", 800],
    ["We are in Isaiah 52, 53, and 54.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(52, 1, 12, [
      "Awake, awake; put on thy strength, O Zion... for henceforth there shall no more come into thee the uncircumcised and the unclean. The fourth time in two days somebody's been told to wake up, and this time it comes with the threat actually being over.",
      "Ye have sold yourselves for nought; and ye shall be redeemed without money. The same self-sale language from a few chapters back, paired now with a redemption that costs the people nothing.",
      "How beautiful upon the mountains are the feet of him that bringeth good tidings... that saith unto Zion, Thy God reigneth! One runner, coming over the hill with news, and Isaiah stops to admire his feet before he even says the news out loud.",
      "For ye shall not go out with haste, nor go by flight: for the LORD will go before you. Unlike the exodus out of Egypt, nobody has to run this time. God isn't just leading. He's already ahead of them.",
    ]),
    g(52, 13, 15, [
      "Behold, my servant shall deal prudently, he shall be exalted and extolled, and be very high. The chapter opens on the highest language Isaiah has used for him yet.",
      "His visage was so marred more than any man, and his form more than the sons of men. One verse later, beaten past the point of looking human. Isaiah sets both sentences side by side without softening either one.",
      "So shall he sprinkle many nations; the kings shall shut their mouths at him. Kings, whose entire job is having something to say, go silent in front of him instead.",
      "That which had not been told them shall they see; and that which they had not heard shall they consider. Something about him that nobody saw coming, not even people used to hearing everything first.",
    ]),
    g(53, 1, 6, [
      "He hath no form nor comeliness... he was despised and rejected of men; a man of sorrows, and acquainted with grief. Not disfigured glory. Just someone plain enough to walk past without noticing.",
      "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. The people watching assumed he was being punished for something he'd done.",
      "He was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed. Here's the turn. It was never his own guilt.",
      "All we like sheep have gone astray; we have turned every one to his own way; and the LORD hath laid on him the iniquity of us all. Everyone scattered in their own direction, and it landed on one person.",
    ]),
    g(53, 7, 12, [
      "He was oppressed, and he was afflicted, yet he opened not his mouth: he is brought as a lamb to the slaughter... so he openeth not his mouth. Silence under abuse, said twice in one verse so you don't miss it.",
      "He was cut off out of the land of the living... he made his grave with the wicked, and with the rich in his death; because he had done no violence, neither was any deceit in his mouth. Executed like a criminal, buried in a way that never matched who he actually was.",
      "Yet it pleased the LORD to bruise him... when thou shalt make his soul an offering for sin, he shall see his seed, he shall prolong his days. The hardest line in the chapter, and right next to it, life on the other side of the death.",
      "He was numbered with the transgressors; and he bare the sin of many, and made intercession for the transgressors. Counted among criminals, and still speaking up for them.",
    ]),
    g(54, 1, 8, [
      "Sing, O barren, thou that didst not bear... for more are the children of the desolate than the children of the married wife. The one who assumed she had nothing coming ends up with more.",
      "Fear not; for thou shalt not be ashamed... thou shalt forget the shame of thy youth, and shalt not remember the reproach of thy widowhood any more. A specific old shame, promised to actually be forgotten, not just excused.",
      "The LORD hath called thee as a woman forsaken and grieved in spirit... For a small moment have I forsaken thee; but with great mercies will I gather thee. He names the abandonment honestly, then sizes it small next to what's coming.",
      "In a little wrath I hid my face from thee for a moment; but with everlasting kindness will I have mercy on thee. The anger gets a timer. The kindness doesn't.",
    ]),
    g(54, 9, 17, [
      "As I have sworn that the waters of Noah should no more go over the earth; so have I sworn that I would not be wroth with thee... the mountains shall depart, and the hills be removed; but my kindness shall not depart from thee. Tied to the Noah covenant by name, then called steadier than the mountains themselves.",
      "All thy children shall be taught of the LORD; and great shall be the peace of thy children. The peace doesn't stop with the generation being spoken to.",
      "I have created the smith that bloweth the coals in the fire... and I have created the waster to destroy. No weapon that is formed against thee shall prosper. He claims ownership of the people who forge the weapons, before promising none of them land.",
      "Every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me. It closes naming it an inheritance, and naming exactly whose righteousness it actually is.",
    ]),
  ],
  closing: [
    ["So that is Day 213.", 700],
    ["He hath no form nor comeliness. Nothing about him would have made you look twice.", 800],
    ["All we like sheep have gone astray, we have turned every one to his own way. Everybody scattered in a different direction, and it landed on one person.", 800],
    ["With his stripes we are healed. Isaiah doesn't soften that line to make it easier to hear.", 800],
    ["He was numbered with the transgressors. Buried like a criminal, for the sin of people who'd walked right past him.", 850],
    ["And then a woman who thought she'd stay barren forever gets told to sing, because it isn't over.", 850],
    ["Tomorrow, Isaiah 55 through 57. An invitation, open to anyone who's thirsty.", 850],
    ["For now, sit with the line that gets read the most.", 800],
    ["He was wounded for our transgressions.", 750],
    ["For our transgressions. Not his own.", 1200],
  ],
};
