import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 240, written to the Day 1 standard.
 *
 * The glory that stood at the temple gate at the end of Day 239 now leaves
 * for good - threshold, cherubim, east gate, then the hill outside the city
 * - while twenty-five men at that same gate talk themselves into a false
 * sense of safety. Six blocks across three chapters (75 verses), no gaps.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 240,
  title: "Glory Departs and Exile Is Confirmed",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 240. The vision from yesterday keeps going, straight into the room where the wheels and the fire are.", 750],
    ["Ezekiel watches something leave. Piece by piece, not all at once.", 800],
    ["Then the vision cuts to a plotting session at the temple gate. Twenty-five men making themselves feel safe with a bad metaphor.", 800],
    ["And God gives Ezekiel one more sign to act out with his own body, in front of everyone.", 800],
    ["We are in Ezekiel 10 through 12.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(10, 1, 8, [
      "Then I looked, and behold, in the firmament above the cherubims there appeared a sapphire stone, as the likeness of a throne. The same throne-fire from chapter one is still right there, just above the room.",
      "The man clothed with linen is told to go in between the wheels and fill his hand with coals of fire from between the cherubims, and scatter them over the city. Judgment does not come from somewhere else. It is handed out of God's own throne room.",
      "The cloud filled the inner court, and the court was full of the brightness of the Lord's glory. Before anything burns, the glory itself fills the space, visible and undeniable, still there for anyone who looked up.",
      "One cherub reaches out, takes the fire, and puts it into the hands of the man clothed in linen, who takes it and goes out. No angel throws it. A messenger simply carries what he was handed.",
    ]),
    ez(10, 9, 22, [
      "Four wheels, one by each cherub, coloured like a beryl stone, a wheel within a wheel, so they could move in any direction without ever turning. Nothing here has a blind side.",
      "Every one had four faces: the first the face of a cherub, the second of a man, the third of a lion, the fourth of an eagle. Chapter one called that first face an ox. Up close, it turns out to have been a cherub's face all along.",
      "Then the glory of the Lord departed from off the threshold of the house, and stood over the cherubims. Not gone yet. Just one step back from the doorway, still watching.",
      "The cherubims lifted up their wings, and mounted up from the earth in my sight... and every one stood at the door of the east gate of the Lord's house. The glory leaves in stages, like someone who keeps stopping in the doorway before they actually walk out.",
    ]),
    ez(11, 1, 13, [
      "Twenty-five men at the east gate, devising mischief and giving wicked counsel: It is not near; let us build houses: this city is the caldron, and we be the flesh. Nothing bad is coming, so build like you're staying. We're the good meat, safe inside the pot.",
      "God hands their own picture back to them. Your slain are the flesh, and this city is the caldron: but I will bring you forth out of the midst of it. The pot they thought was protecting them is about to be emptied, and they are what gets thrown out, not what gets kept.",
      "While Ezekiel is still speaking, Pelatiah the son of Benaiah dies. One of the twenty-five men, dropping dead in real time, in the middle of the very prophecy against him.",
      "Then fell I down upon my face, and cried with a loud voice, and said, Ah Lord God! wilt thou make a full end of the remnant of Israel? Ezekiel does not celebrate being proven right. He is terrified by it.",
    ]),
    ez(11, 14, 25, [
      "The people left in Jerusalem have been telling the exiles, Get you far from the Lord: unto us is this land given. The ones who stayed assume they're the favored ones and the deported are the rejects.",
      "God's answer to the exiles: I will be to them as a little sanctuary in the countries where they shall come. No temple, no building, no land, and He is still with them exactly there.",
      "I will give them one heart, and I will put a new spirit within you; and I will take the stony heart out of their flesh, and will give them an heart of flesh. Not better behavior demanded. A different heart to behave from.",
      "Then the glory of the Lord went up from the midst of the city, and stood upon the mountain which is on the east side of the city. Full departure now. Off the threshold, off the cherubim, out the gate, all the way to the hill outside town.",
    ]),
    ez(12, 1, 16, [
      "Son of man, thou dwellest in the midst of a rebellious house, which have eyes to see, and see not. Not blind. Just refusing to use what they already have.",
      "Prepare thee stuff for removing, and remove by day in their sight... dig thou through the wall in their sight, and carry out thereby. Ezekiel packs like a refugee, then tunnels through his own wall in front of the whole street, because words alone have stopped landing.",
      "Cover thy face, that thou see not the ground: for I have set thee for a sign. He is told this concerns the prince in Jerusalem: he shall bear upon his shoulder in the twilight, and shall go forth... he shall cover his face, that he see not the ground with his eyes.",
      "My net also will I spread upon him, and he shall be taken in my snare... yet shall he not see it, though he shall die there. Zedekiah will flee the same way Ezekiel just acted out, be captured, and be blinded before he ever lays eyes on Babylon, dying in the land he was told he would never see.",
    ]),
    ez(12, 17, 28, [
      "Son of man, eat thy bread with quaking, and drink thy water with trembling and with carefulness. Before the city falls, Ezekiel is told to eat like a starving, terrified man, so his own body preaches what words have not gotten across.",
      "That her land may be desolate from all that is therein, because of the violence of all them that dwell therein. It is not vague fate landing on them. It is the specific violence of the people, coming due.",
      "What is that proverb that ye have in the land of Israel, saying, The days are prolonged, and every vision faileth? People had turned every unfulfilled warning into proof that warnings never come true.",
      "I will make this proverb to cease... The days are at hand, and the effect of every vision... There shall none of my words be prolonged any more, but the word which I have spoken shall be done. God ends the excuse, not just the delay.",
    ]),
  ],
  closing: [
    ["So that is Day 240.", 700],
    ["The glory of the Lord did not leave Jerusalem all at once. Off the threshold. Over the cherubim. Out the east gate. Up onto the hill outside the city. Every stop was a chance to notice.", 850],
    ["Twenty-five men called the city their safe pot of meat. God said they were the meat about to be thrown out, and one of them died mid-sentence to prove it.", 850],
    ["But the word to the exiles, the ones everyone in Jerusalem had written off, was mercy. A new heart, a new spirit, God Himself as their sanctuary with no building required.", 850],
    ["Then Ezekiel packed a bag, dug through his own wall, and covered his face, acting out exactly what the king of Jerusalem would do within the year.", 800],
    ["Zedekiah would flee like that, get caught, and be blinded before he ever saw Babylon, dying there without ever seeing the land he was carried into.", 850],
    ["Tomorrow, Ezekiel 13 through 15. False prophets who promised peace, and a vine that is only good for burning.", 850],
    ["For now, sit with the proverb God ended.", 750],
    ["The days are prolonged, and every vision faileth.", 750],
    ["Not anymore.", 1200],
  ],
};
