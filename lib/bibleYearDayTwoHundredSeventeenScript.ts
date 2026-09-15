import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 217, written to the Day 1 standard.
 *
 * Isaiah 64-66: the plea for God to rend the heavens finishes yesterday's
 * prayer, then God answers with a hard word for a rebellious people who
 * never called on him and a promised new heavens and new earth for the
 * ones who did, closing the entire book with true worship versus empty
 * ritual, a birth with no labor, and a warning that does not soften.
 * Isaiah's last day. Seven blocks across three chapters (61 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 217,
  title: "New Creation and Final Worship",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 217. Isaiah's last day.", 750],
    ["Yesterday ended with a question that got no answer. Why hast thou made us to err from thy ways?", 800],
    ["Today that prayer keeps going, God answers it, and by the end the whole book closes on a new heavens and a new earth.", 850],
    ["It does not close soft. The very last verse of Isaiah is a warning, sitting right next to the promise.", 850],
    ["We are in Isaiah 64, 65, and 66.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(64, 1, 7, [
      "Oh that thou wouldest rend the heavens, that thou wouldest come down, that the mountains might flow down at thy presence. The prayer from yesterday keeps going, and it opens by asking for the most dramatic entrance possible.",
      "Since the beginning of the world men have not heard, nor perceived by the ear, neither hath the eye seen, O God, beside thee, what he hath prepared for him that waiteth for him. Paul quotes this exact line centuries later about what God has prepared for those who love him.",
      "We are all as an unclean thing, and all our righteousnesses are as filthy rags. Not just their sins. Their best behavior, called filthy rags, in the same prayer that just asked God to come down.",
      "There is none that calleth upon thy name, that stirreth up himself to take hold of thee. The most honest line in the prayer. Nobody's even trying anymore.",
    ]),
    g(64, 8, 12, [
      "But now, O LORD, thou art our father; we are the clay, and thou our potter; and we all are the work of thy hand. After filthy rags, this is the turn. Not I deserve better. Just, you made me.",
      "Be not wroth very sore, O LORD, neither remember iniquity for ever: behold, see, we beseech thee, we are all thy people. A plea with no defense attached to it. Just, we're still yours.",
      "Our holy and our beautiful house, where our fathers praised thee, is burned up with fire: and all our pleasant things are laid waste. The temple itself, gone. This is a prayer prayed from real rubble.",
      "Wilt thou refrain thyself for these things, O LORD? wilt thou hold thy peace, and afflict us very sore? Chapter 64 ends on a raw question, unanswered, hanging in the air exactly where the prayer leaves it.",
    ]),
    g(65, 1, 7, [
      "I am sought of them that asked not for me; I am found of them that sought me not... unto a nation that was not called by my name. God's answer starts here, and Paul later applies this exact line to the Gentiles.",
      "I have spread out my hands all the day unto a rebellious people, which walketh in a way that was not good, after their own thoughts. All day, every day, hands open, toward people who never turned around.",
      "A people that provoketh me to anger continually to my face... these are a smoke in my nose, a fire that burneth all the day. Not distant disappointment. He calls it something that irritates him constantly, to his face.",
      "I will not keep silence, but will recompense... your iniquities, and the iniquities of your fathers together. The bill comes due, and it's not just for this generation. Fathers and children, added together.",
    ]),
    g(65, 8, 16, [
      "As the new wine is found in the cluster, and one saith, Destroy it not; for a blessing is in it: so will I do for my servants' sakes, that I may not destroy them all. Even in judgment, he's looking for the good grape in the cluster and saving it.",
      "Behold, my servants shall eat, but ye shall be hungry... my servants shall rejoice, but ye shall be ashamed. Four straight contrasts, back to back, between the ones who answered and the ones who didn't.",
      "Because when I called, ye did not answer; when I spake, ye did not hear; but did evil before mine eyes. Not a mystery why the two groups end up different. He called. One side answered.",
      "Ye shall leave your name for a curse unto my chosen... and call his servants by another name. Even their name gets replaced, the same way Zion's name got replaced in chapter 62. Same move, opposite direction.",
    ]),
    g(65, 17, 25, [
      "For, behold, I create new heavens and a new earth: and the former shall not be remembered, nor come into mind. The line John picks up word for word in Revelation, centuries later.",
      "There shall be no more thence an infant of days, nor an old man that hath not filled his days. Death itself gets pushed to the edges of the picture, almost an afterthought in a world built around long life.",
      "They shall build houses, and inhabit them; and they shall plant vineyards, and eat the fruit of them. They shall not build, and another inhabit. Exactly what exile stole from them, handed back and made permanent.",
      "The wolf and the lamb shall feed together, and the lion shall eat straw like the bullock... they shall not hurt nor destroy in all my holy mountain. The most peaceful image in the whole book, closing out the promise.",
    ]),
    g(66, 1, 6, [
      "Thus saith the LORD, The heaven is my throne, and the earth is my footstool: where is the house that ye build unto me? He puts the temple they were so proud of in scale, in one sentence.",
      "To this man will I look, even to him that is poor and of a contrite spirit, and trembleth at my word. Not the building. This is who gets his attention.",
      "He that killeth an ox is as if he slew a man... he that offereth an oblation, as if he offered swine's blood. He compares their own sacrifices, the ones done for show, to things Israel would call unthinkable.",
      "A voice of noise from the city, a voice from the temple, a voice of the LORD that rendereth recompence to his enemies. The temple they trusted becomes the place the reckoning starts from.",
    ]),
    g(66, 7, 24, [
      "Before she travailed, she brought forth; before her pain came, she was delivered of a man child. Who hath heard such a thing? A birth with the labor removed entirely. Zion's restoration, described as impossible and instant.",
      "As one whom his mother comforteth, so will I comfort you; and ye shall be comforted in Jerusalem. After chapters of courtroom language, the picture softens all the way down to a mother and a child.",
      "For, behold, the LORD will come with fire, and with his chariots like a whirlwind... the slain of the LORD shall be many. Then, without transition, back to judgment. Isaiah refuses to let comfort erase it.",
      "They shall go forth, and look upon the carcases of the men that have transgressed against me: for their worm shall not die, neither shall their fire be quenched. The very last verse of Isaiah, and it is this. No soft landing at the end of the book.",
    ]),
  ],
  closing: [
    ["So that is Day 217. And that is the end of Isaiah.", 700],
    ["Oh that thou wouldest rend the heavens, that thou wouldest come down. A prayer for God to show up dramatically, admitting our righteousnesses are as filthy rags in the same breath.", 800],
    ["But now, O LORD, thou art our father; we are the clay, and thou our potter. No defense offered. Just, you made me.", 800],
    ["I am sought of them that asked not for me. God's answer, reaching toward people who never went looking for him.", 800],
    ["Behold, I create new heavens and a new earth. The wolf and the lamb feeding together. The most peaceful line in sixty-six chapters.", 850],
    ["And then the book ends anyway on their worm shall not die, neither shall their fire be quenched. Comfort and warning, never separated, all the way to the last verse.", 850],
    ["Tomorrow we leave Isaiah behind and start Jeremiah. A very different prophet, called while he's still young, to a kingdom that's almost out of time.", 850],
    ["For now, sit with the line God gives for what he actually wants.", 800],
    ["To this man will I look, even to him that is poor and of a contrite spirit, and trembleth at my word.", 850],
    ["Not the building. Him.", 1200],
  ],
};
