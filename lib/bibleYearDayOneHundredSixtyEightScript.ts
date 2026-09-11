import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 168, written to the Day 1 standard.
 *
 * Psalms 118-120: the thanksgiving psalm that ends up quoted at the cross and
 * on Palm Sunday, then Psalm 119 in full - the longest chapter in the Bible,
 * a hundred and seventy-six verses about loving God's word - then Psalm 120,
 * the first of the fifteen Songs of Ascents pilgrims sang walking up to
 * Jerusalem. Five blocks: Psalm 118 whole, Psalm 119 split into three large
 * stanza groups (aleph-zain, cheth-nun, samech-tau), then Psalm 120 whole.
 * Teaching stays at four lines per block even across the huge 119 sections,
 * per the standard - scripture is not abridged, teaching absorbs the load.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 168,
  title: "Steadfast Love and Pilgrim Songs",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 168. And this one is bigger than most.", 700],
    [
      "Psalm 119 sits inside today's reading. It is the longest chapter in the whole Bible. A hundred and seventy-six verses, all built around one thing: God's word.",
      800,
    ],
    [
      "Before that, Psalm 118 closes out the songs of praise you have been reading with a rejected stone and a shout you will recognize from Palm Sunday.",
      800,
    ],
    ["After it, Psalm 120 is the first of fifteen songs pilgrims sang walking up to Jerusalem.", 800],
    ["So today moves from thanksgiving, into a hundred and seventy-six verses about loving one book, into the road.", 850],
    ["We are in Psalms 118, 119, and 120.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(118, 1, 29, [
      "O give thanks unto the LORD, for he is good. The psalm opens with it and closes on the same line, thirty verses later. Whatever happens in between, it starts and ends on the same note.",
      "In my distress I called upon the LORD... and he answered me, and set me in a large place. That is the whole shape of this psalm. Trouble, then room to breathe.",
      "The stone which the builders refused is become the head stone of the corner. A rejected stone ends up as the one everything else lines up against. Jesus quotes this exact verse about himself.",
      "This is the day which the LORD hath made; we will rejoice and be glad in it. A few lines later: Save now, I beseech thee, O LORD. That word in Hebrew is Hosanna. The crowd shouts this exact psalm at Jesus riding into Jerusalem.",
    ]),
    g(119, 1, 56, [
      "Blessed are the undefiled in the way, who walk in the law of the LORD. Psalm 119 opens by calling a certain kind of life blessed, then spends a hundred and seventy-six verses describing what that life looks like.",
      "Wherewithal shall a young man cleanse his way? By taking heed thereto according to thy word. And a little further on, the line most people already know without knowing where it is from: Thy word have I hid in mine heart, that I might not sin against thee.",
      "This whole psalm is built in eight-verse sections, one for each letter of the Hebrew alphabet, aleph to tau. It is not random. Somebody built this as carefully as anything in the Bible.",
      "I am a stranger in the earth: hide not thy commandments from me. Even inside all that structure, there is a real person here, admitting he does not have it figured out and asking for help.",
    ]),
    g(119, 57, 112, [
      "Thou art my portion, O LORD: I have said that I would keep thy words. He is not describing an obligation. He is describing what he has decided actually belongs to him.",
      "It is good for me that I have been afflicted; that I might learn thy statutes. That is not a comfortable sentence, and the psalm does not try to make it one.",
      "How sweet are thy words unto my taste! yea, sweeter than honey to my mouth! From affliction to honey in the same stretch of verses. Both are true for him at once.",
      "Thy word is a lamp unto my feet, and a light unto my path. Not a floodlight for the whole road. Just enough to see the next step.",
    ]),
    g(119, 113, 176, [
      "Thou art my hiding place and my shield: I hope in thy word. A little further on: It is time for thee, LORD, to work: for they have made void thy law. He is not admiring the law from a safe distance. He is watching people trample it and asking God to act.",
      "Rivers of waters run down mine eyes, because they keep not thy law. Grief over what other people ignore, not just gratitude for what he has.",
      "Great peace have they which love thy law: and nothing shall offend them. After a hundred and sixty verses of pressure and affliction, that is where the psalm lands. Peace, not exemption from trouble.",
      "The very last verse: I have gone astray like a lost sheep; seek thy servant; for I do not forget thy commandments. The longest chapter in the Bible about loving God's word ends with the man who wrote it admitting he is still lost, and still asking to be found.",
    ]),
    g(120, 1, 7, [
      "In my distress I cried unto the LORD, and he heard me. Same opening move as Psalm 118, on a much smaller scale. Trouble, then a cry, then an answer.",
      "This is the first of fifteen psalms called Songs of Ascents. Pilgrims sang these walking up the hills to Jerusalem for the feasts. This is where that whole set of songs begins.",
      "Deliver my soul, O LORD, from lying lips, and from a deceitful tongue. The danger here is not an army. It is somebody's mouth.",
      "Woe is me, that I sojourn in Mesech... I am for peace: but when I speak, they are for war. He is living among people who want a fight no matter what he says. That is exactly the road he is about to walk toward Jerusalem on.",
    ]),
  ],
  closing: [
    ["So that is Day 168.", 700],
    ["Thanksgiving that ends on a rejected stone, a hundred and seventy-six verses about loving one book, and the first step of a long walk uphill.", 750],
    ["You just read the longest chapter in the entire Bible, and almost every section of it says some version of the same thing. I love your word. Help me keep it.", 800],
    ["That is worth noticing. The longest chapter in Scripture is not a law code or a history. It is somebody in love with what God said.", 800],
    ["And the psalm that opened today's reading gets quoted at the cross and shouted at the gates of Jerusalem on Palm Sunday. The rejected stone becomes the cornerstone.", 850],
    ["Tomorrow, Psalms 121 through 123. Songs for the road, starting with the most familiar line in the whole set. I will lift up mine eyes unto the hills.", 850],
    ["For now, sit with the last verse you read.", 800],
    ["I have gone astray like a lost sheep.", 750],
    ["Seek thy servant. He never stopped asking.", 1200],
  ],
};
