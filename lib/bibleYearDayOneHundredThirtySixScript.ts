import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 136, written to the Day 1 standard.
 *
 * Psalms 22-24: the cry of forsakenness that ends up quoted from a cross,
 * the shepherd psalm's total quiet right after it, and a liturgical chant
 * at the temple gates asking who this King of glory even is. Psalm 22 is
 * the heaviest chapter today, so it gets three blocks; the shorter Psalm 23
 * stays whole and Psalm 24 splits where its own tone changes.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 136,
  title: "Suffering, Shepherd, and Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 136. Yesterday ended with a sky that preaches and a king who got everything he asked for.", 750],
    ["Today opens about as far from that as this book gets.", 800],
    ["Psalm twenty-two starts with a man convinced God has left him, and describes his own suffering in detail that lines up with a crucifixion, centuries before that method of execution existed.", 850],
    ["Psalm twenty-three is six verses of total quiet right after that.", 800],
    ["And Psalm twenty-four ends with gates being told to lift up their heads for a king.", 800],
    ["We are in Psalms 22 through 24.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 11, [
      "My God, my God, why hast thou forsaken me? why art thou so far from helping me, and from the words of my roaring? Centuries later, a dying man on a cross says this exact line out loud. David wrote it first, as his own honest cry.",
      "But thou art holy, O thou that inhabitest the praises of Israel. Our fathers trusted in thee... they trusted, and thou didst deliver them. Even inside the complaint, he reminds himself what has always been true about God, before anything about his own situation has changed.",
      "But I am a worm, and no man; a reproach of men, and despised of the people. All they that see me laugh me to scorn... He trusted on the LORD that he would deliver him: let him deliver him, seeing he delighted in him. Mockers throw his own faith back at him. Nearly the same taunt shows up again at the foot of a cross a thousand years later.",
      "But thou art he that took me out of the womb: thou didst make me hope when I was upon my mother's breasts... Be not far from me; for trouble is near; for there is none to help. The psalm reaches back to the earliest possible memory of trust, then lands on right now, when nobody is left to help.",
    ]),
    g(22, 12, 21, [
      "Many bulls have compassed me: strong bulls of Bashan have beset me round. They gaped upon me with their mouths, as a ravening and a roaring lion. Animals stand in for enemies closing in from every direction, strong and without mercy.",
      "I am poured out like water, and all my bones are out of joint: my heart is like wax... my strength is dried up like a potsherd; and my tongue cleaveth to my jaws; and thou hast brought me into the dust of death. A potsherd is a broken piece of dried clay. This is total physical collapse, described in exact bodily detail.",
      "For dogs have compassed me... they pierced my hands and my feet. They part my garments among them, and cast lots upon my vesture. These two details land, almost word for word, in the Gospel accounts of the crucifixion. David is describing his own worst pain, not predicting on purpose. It just turns out to fit exactly.",
      "But be not thou far from me, O LORD... Deliver my soul from the sword; my darling from the power of the dog. Save me from the lion's mouth. Even at the very bottom of it, the prayer keeps naming God directly and keeps asking.",
    ]),
    g(22, 22, 31, [
      "I will declare thy name unto my brethren: in the midst of the congregation will I praise thee. No transition sentence. Between one verse and the next, the psalm turns from the worst pain we have read so far straight into praise.",
      "For he hath not despised nor abhorred the affliction of the afflicted; neither hath he hid his face from him; but when he cried unto him, he heard. This directly answers verse one. He asked why God was far off. Now he says God never actually hid his face at all.",
      "All the ends of the world shall remember and turn unto the LORD: and all the kindreds of the nations shall worship before thee. One man's private suffering somehow becomes the reason whole nations turn toward God. That is a large claim to make from inside this much pain.",
      "A seed shall serve him; it shall be accounted to the Lord for a generation. They shall come, and shall declare his righteousness unto a people that shall be born, that he hath done this. The psalm ends looking at people who are not even alive yet. His worst day becomes something told to generations he will never meet.",
    ]),
    g(23, 1, 6, [
      "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. After all the noise of Psalm twenty-two, this one opens completely quiet. A shepherd decides where the sheep rests and drinks. The sheep does not.",
      "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me. The rod and staff were a shepherd's actual weapons, for fighting off predators and pulling a sheep back from a ledge. Comfort here does not mean soft. It means armed, and willing to use it.",
      "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over. The picture shifts from shepherd and sheep to host and guest. The enemies are still right there, watching, and the meal happens anyway.",
      "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever. Follow is usually a chasing word in these psalms, used for enemies pursuing David. Here, goodness and mercy are the ones doing the chasing.",
    ]),
    g(24, 1, 6, [
      "The earth is the LORD's, and the fulness thereof; the world, and they that dwell therein. For he hath founded it upon the seas, and established it upon the floods. Before the psalm asks who may approach God, it first says that everything, including the ground a person is standing on, already belongs to him.",
      "Who shall ascend into the hill of the LORD? or who shall stand in his holy place? He that hath clean hands, and a pure heart; who hath not lifted up his soul unto vanity, nor sworn deceitfully. Clean hands is about what a person does. A pure heart is about what a person actually wants. The psalm asks for both, not one instead of the other.",
      "He shall receive the blessing from the LORD, and righteousness from the God of his salvation. This is the generation of them that seek him, that seek thy face, O Jacob. Seeking God's face gets named as the mark of a whole generation, not just one exceptional person.",
    ]),
    g(24, 7, 10, [
      "Lift up your heads, O ye gates; and be ye lift up, ye everlasting doors; and the King of glory shall come in. Gates do not have heads. This is a command spoken to a city entrance as though it were a person bowing.",
      "Who is this King of glory? The LORD strong and mighty, the LORD mighty in battle. The question gets asked and answered in the same breath, likely sung back and forth between two groups standing at the temple gates.",
      "Lift up your heads, O ye gates... Who is this King of glory? The LORD of hosts, he is the King of glory. Selah. The entire exchange repeats itself, word for word. Nothing new gets added the second time. The point was never new information. It was the gates actually opening.",
    ]),
  ],
  closing: [
    ["So that is Day 136.", 700],
    ["A cry of being forsaken, six verses in green pasture, and a King of glory coming through a gate.", 800],
    ["Sit with how close those three sit together in a single day's reading.", 800],
    ["The same book that says my God, my God, why hast thou forsaken me, also says the LORD is my shepherd, I shall not want.", 850],
    ["Nobody edited the pain out to make room for the comfort. Both get to be fully true, back to back.", 850],
    ["And Psalm twenty-two does not stay on the details that sound like a cross. It ends looking at a generation not even born yet, being told what God did.", 850],
    ["Tomorrow, Psalms 25 through 27. An honest prayer for guidance, a plea to be forgiven for old sins, and a surprising amount of courage.", 850],
    ["For now, hold on to the shepherd's tools.", 800],
    ["A rod and a staff.", 750],
    ["Not soft. Just aimed the right way.", 1200],
  ],
};
