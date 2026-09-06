import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 127, written to the Day 1 standard.
 *
 * Elihu finishes his four speeches by pointing up at the sky, and then the
 * sky itself answers. Seven blocks across four chapters, matching Day 126.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 127,
  title: "God Answers From the Storm",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 127.", 700],
    ["Elihu keeps going. Weather, thunder, snow, stars. Everything he can point at.", 800],
    ["And then, without any warning, the pointing stops.", 900],
    ["Because the voice he has been describing actually speaks.", 850],
    ["We are in Job 35 through 38. Elihu's last two speeches, and God's first words in the whole book.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 35, 1, 16, [
      "Elihu asks Job a sharp question. Thinkest thou this to be right, that thou saidst, My righteousness is more than God's? He thinks Job has made this personal, God against Job, instead of Job simply being wrong.",
      "Then he says something worth sitting with. If thou sinnest, what doest thou against him? Or if thou be righteous, what givest thou him? God does not go up or down because of what you do. Your goodness helps other people, not God.",
      "He explains why some cries go unanswered. Men cry out under oppression, but none saith, Where is God my maker, who giveth songs in the night. They want relief. They do not actually want God.",
      "Surely God will not hear vanity, Elihu says, neither will the Almighty regard it. His verdict on Job is blunt. Job openeth his mouth in vain, he multiplieth words without knowledge.",
    ]),
    g("job", 36, 1, 15, [
      "Elihu asks for a little more patience. Suffer me a little, he says, and I will shew thee that I have yet to speak on God's behalf. He believes he is God's defense attorney.",
      "He describes God as strong but not cruel. He is mighty in strength and wisdom. He withdraweth not his eyes from the righteous. Power, in Elihu's picture, does not mean God stops paying attention to the small and the suffering.",
      "Then he explains suffering as a teacher. If they be bound in fetters, and be holden in cords of affliction, then he sheweth them their work, and their transgressions. He openeth also their ear to discipline. Pain, in this view, is God trying to get someone's attention, not punishing for its own sake.",
      "He gives both endings. If they obey and serve him, they shall spend their days in prosperity. But if they obey not, they shall perish by the sword, and die without knowledge. Elihu leaves the choice entirely in the sufferer's hands.",
    ]),
    g("job", 36, 16, 33, [
      "Elihu turns and speaks directly to Job. He would have removed thee out of the strait into a broad place, he says, where there is no straitness. He believes relief was available and Job argued his way out of it.",
      "Beware, he warns, lest he take thee away with his stroke: then a great ransom cannot deliver thee. It is the closest thing to a threat anyone has spoken to Job in this whole book.",
      "Then, mid-sentence, Elihu changes direction completely. Behold, God is great, and we know him not, neither can the number of his years be searched out. He stops arguing and starts looking up.",
      "He maketh small the drops of water, they pour down rain according to the vapour thereof, which the clouds do drop and distil upon man abundantly. Can any understand the spreadings of the clouds, or the noise of his tabernacle? For the first time, Elihu sounds like he does not have all the answers either.",
    ]),
    g("job", 37, 1, 13, [
      "At this also my heart trembleth, Elihu says, and is moved out of his place. He is talking about thunder, and he is genuinely shaken by it.",
      "Hear attentively the noise of his voice, he says, and the sound that goeth out of his mouth. He directeth it under the whole heaven, and his lightning unto the ends of the earth. After it a voice roareth. God thundereth marvellously with his voice, great things doeth he, which we cannot comprehend.",
      "He saith to the snow, Be thou on the earth, likewise to the small rain, and to the great rain of his strength. He sealeth up the hand of every man, that all men may know his work. Every storm that stops people in their tracks, Elihu says, is a signature.",
      "Out of the south cometh the whirlwind, and cold out of the north. By the breath of God frost is given. Notice that word whirlwind. Elihu does not know it yet, but he is describing exactly what is about to happen.",
    ]),
    g("job", 37, 14, 24, [
      "Hearken unto this, O Job, Elihu says. Stand still, and consider the wondrous works of God. It is decent advice, buried in a lot of speeches that were not.",
      "Dost thou know when God disposed them, he asks, and caused the light of his cloud to shine? Dost thou know the balancings of the clouds, the wondrous works of him which is perfect in knowledge? He is asking Job the same kind of question God is about to ask, only smaller.",
      "Teach us what we shall say unto him, Elihu admits, for we cannot order our speech by reason of darkness. Even he runs out of words in front of the sky.",
      "He finishes with real reverence. Touching the Almighty, we cannot find him out. He is excellent in power, and in judgment, and in plenty of justice. He will not afflict. Then his last line about Job. He respecteth not any that are wise of heart. Elihu means it as a warning. It is about to become an introduction.",
    ]),
    g("job", 38, 1, 21, [
      "Then the LORD answered Job out of the whirlwind, and said. After thirty-seven chapters of everyone else talking, this is the first line God speaks in the whole book.",
      "Who is this that darkeneth counsel by words without knowledge? Gird up now thy loins like a man, for I will demand of thee, and answer thou me. God does not open with comfort. He opens with questions.",
      "Where wast thou when I laid the foundations of the earth? Declare, if thou hast understanding. Who hath laid the measures thereof, if thou knowest? Or who hath stretched the line upon it? When the morning stars sang together, and all the sons of God shouted for joy?",
      "Who shut up the sea with doors, when it brake forth as if it had issued out of the womb? And said, Hitherto shalt thou come, but no further, and here shall thy proud waves be stayed? Have the gates of death been opened unto thee? Hast thou seen the doors of the shadow of death? Job wanted an answer. He is getting a tour of everything he was not there for.",
    ]),
    g("job", 38, 22, 41, [
      "Hast thou entered into the treasures of the snow, God asks, or hast thou seen the treasures of the hail, which I have reserved against the time of trouble? He keeps a storehouse Job has never seen the door of.",
      "Canst thou bind the sweet influences of Pleiades, or loose the bands of Orion? Canst thou bring forth Mazzaroth in his season? Knowest thou the ordinances of heaven? God names the actual stars overhead and asks if Job runs them.",
      "Who hath put wisdom in the inward parts? Or who hath given understanding to the heart? Even the workings of a man's own mind, God says, were not Job's invention.",
      "Then, almost gently after all that, God asks about ravens. Who provideth for the raven his food, when his young ones cry unto God, they wander for lack of meat? The one making galaxies is also the one who feeds baby birds nobody is watching.",
    ]),
  ],
  closing: [
    ["So that is Day 127.", 700],
    ["Elihu talked for four chapters trying to explain God to Job, and then the sky did the talking instead.", 750],
    ["Notice God never answers the actual question. He never says why Job is suffering.", 800],
    ["Instead He asks where Job was when the earth was built, and who ordered the stars, and who feeds a raven's chicks.", 800],
    ["That is not a dodge. It is a different kind of answer. Trust does not require an explanation. It requires knowing who you are talking to.", 850],
    ["And Job asked for exactly this. Oh that one would hear me, he said back in chapter 31. He wanted God to show up. Now He has.", 850],
    ["Tomorrow, Job 39 through 42. God keeps questioning Job, and then Job finally answers.", 850],
    ["For now, sit with the questions God asked instead of the ones Job wanted.", 800],
    ["Where wast thou.", 750],
    ["When I laid the foundations of the earth.", 1200],
  ],
};
