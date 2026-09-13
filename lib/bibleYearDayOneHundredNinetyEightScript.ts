import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 198, written to the Day 1 standard.
 *
 * Isaiah 7-9 is the heart of the "Book of Immanuel": a terrified king refuses
 * a sign and gets one anyway, Assyria rises as both weapon and threat, and
 * in the middle of two chapters of darkness a child is promised whose name
 * undoes it all. Seven blocks, since the reading runs heavier than usual.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 198,
  title: "Immanuel and the Coming King",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 198.", 650],
    ["Two armies are marching on Jerusalem, and the king is shaking like a tree in the wind.", 800],
    ["God offers him a sign. He refuses to ask.", 800],
    ["So God gives one anyway. A child named God With Us.", 850],
    ["By the end of today's reading, that child has a name list that shouldn't fit inside one baby: Wonderful, Counsellor, The mighty God.", 850],
    ["We are in Isaiah 7, 8, and 9.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(7, 1, 9, [
      "Two kings, Syria and Israel's own King Pekah, march on Jerusalem to force King Ahaz into an alliance against Assyria. Genesis says his heart was moved, and the heart of his people, as the trees of the wood are moved with the wind. That's not a metaphor for mild concern. That's a king who can't stop shaking.",
      "God sends Isaiah to meet him with a message: take heed, and be quiet; fear not. Two enemy kings who terrify Ahaz are, in God's words, just two tails of smoking firebrands. Nearly burned out, not the roaring fire Ahaz thinks they are.",
      "God even gives a timestamp on Ephraim's collapse — within threescore and five years shall Ephraim be broken, that it be not a people. History moves on God's calendar, not the invading army's.",
      "Then the line that explains this whole chapter: if ye will not believe, surely ye shall not be established. Ahaz's real problem was never Syria and Israel. It was that he wouldn't stand still long enough to trust God.",
    ]),
    isa(7, 10, 16, [
      "God tells Ahaz to ask for a sign, anywhere he wants — in the depth, or in the height above. No limits. Any proof he needs is on the table.",
      "Ahaz refuses, wrapping his unbelief in false piety: I will not ask, neither will I tempt the LORD. It sounds humble. It's actually a king who's already decided not to trust God and is hiding behind a Bible-sounding excuse.",
      "Isaiah calls it what it is — is it a small thing for you to weary men, but will ye weary my God also? Ahaz thought he was declining a gift. He was insulting the giver.",
      "So God gives the sign anyway, unasked: a virgin shall conceive, and bear a son, and shall call his name Immanuel. God With Us. Before that child is old enough to know good from evil, both threatening kings will be gone. The sign is bigger than Ahaz's crisis, but it answers his crisis too.",
    ]),
    isa(7, 17, 25, [
      "But the sign of rescue is not the whole message. The LORD shall bring upon thee... the king of Assyria. The empire Ahaz wants to lean on for safety is the very weapon God is about to send against him.",
      "God pictures it as a whistle — he shall hiss for the fly... and for the bee. One quiet sound, and two empires swarm the land like insects, settling in every valley and thornbush.",
      "The Lord shall shave with a razor that is hired — a brutal image of national humiliation, using the very king of Assyria Ahaz hoped would save him.",
      "The chapter ends on overgrown vineyards and briers where farms used to be, land so wrecked that men need arrows and bows just to walk through it. Trusting the wrong king for safety turns your own country into a wilderness.",
    ]),
    isa(8, 1, 10, [
      "Isaiah has a son and, at God's command, names him Maher-shalal-hash-baz — hurrying to the spoil, hastening to the prey. A human timer: before the boy can say Mommy or Daddy, Damascus and Samaria will already be looted by Assyria.",
      "The reason God gives for judgment isn't outright idol worship here — it's that this people refuseth the waters of Shiloah that go softly, and rejoice in Rezin and Remaliah's son. They traded a gentle stream, God's quiet provision, for confidence in two doomed foreign kings.",
      "So the flood comes — the river, strong and many, even the king of Assyria... he shall reach even to the neck. Assyria doesn't just threaten from outside; it rises like water until it's up to the throat.",
      "And then, in the middle of the flood image, Isaiah interrupts himself: associate yourselves, O ye people, and ye shall be broken in pieces... for God is with us. Every alliance the nations can form breaks apart against that one phrase. It's the same word as the child's name. Immanuel isn't just a birth announcement. It's the reason every plot against God's people eventually fails.",
    ]),
    isa(8, 11, 22, [
      "God tells Isaiah directly not to walk in the way of this people — don't call what everyone else calls a threat. Say ye not, a confederacy, to all them to whom this people shall say, a confederacy; neither fear ye their fear, nor be afraid.",
      "Instead: sanctify the LORD of hosts himself; and let him be your fear, and let him be your dread. Fear isn't removed from Isaiah's life. It's just relocated to the only place it belongs.",
      "That same God becomes two different things depending on how you approach him — for a sanctuary, but for a stone of stumbling and for a rock of offence to both the houses of Israel. The identical God, protecting some and tripping up others, based on nothing but their posture toward him.",
      "The chapter closes on people who reject that word and go looking elsewhere — should not a people seek unto their God? for the living to the dead? — to the law and to the testimony: if they speak not according to this word, it is because there is no light in them. Cut off from that word, all that's left is trouble and darkness, dimness of anguish.",
    ]),
    isa(9, 1, 7, [
      "The darkness that closed chapter 8 breaks without warning. The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined. No transition, no explanation. Just light where there was none.",
      "The relief is pictured as harvest joy and as soldiers dividing plunder after a war is already won — for thou hast broken the yoke of his burden... as in the day of Midian. This is celebration for a victory that, in Isaiah's own time, hasn't happened yet.",
      "Then the reason for all of it: for unto us a child is born, unto us a son is given: and the government shall be upon his shoulder. The Immanuel of chapter 7 comes back, but now with a title stack too large for any human ruler: Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
      "His kingdom is described as one thing ordinary kingdoms never are — of the increase of his government and peace there shall be no end... from henceforth even for ever. Every empire in this story, Syria, Israel, Assyria, eventually ends. His doesn't.",
    ]),
    isa(9, 8, 21, [
      "The scene drops straight back into judgment. Israel says in pride and stoutness of heart, the bricks are fallen down, but we will build with hewn stones — disaster hits, and their instinct is to rebuild bigger rather than turn back to God.",
      "Then the refrain that anchors the whole section, repeated three times across these verses: for all this his anger is not turned away, but his hand is stretched out still. Each wave of judgment isn't the end of the story. There's always another one coming, because the people never actually change.",
      "It gets uglier with every repetition. First it's enemy nations attacking. Then it's Israel's own leaders, described as the tail, teaching lies while the honourable become useless. By the end, no one is even spared for weakness — no joy in their young men, no mercy on the fatherless and widows, because every one is an hypocrite and an evildoer.",
      "The lowest point closes the chapter: Manasseh, Ephraim; and Ephraim, Manasseh: and they together shall be against Judah. Two half-tribes descended from one brother, Joseph, now devouring each other and their own kinsmen. Assyria never has to finish this nation off. It's already tearing itself apart.",
    ]),
  ],
  closing: [
    ["So that is Day 198.", 700],
    ["A king too afraid to ask for a sign, and God gave him one anyway.", 750],
    ["A virgin's son named God With Us, and a flood of an empire that rises up to the neck and still cannot drown that name.", 850],
    ["Fear told to relocate. Not gone, just aimed at the only one who deserves it.", 800],
    ["And then, right in the middle of the darkest chapters in this reading, a child with a name too big for any throne. Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.", 850],
    ["But Isaiah doesn't let that stand alone either. The chapter after it shows a nation still tearing at itself, brother against brother, judgment stacked on judgment.", 850],
    ["Both things are true on the same page. The child has already been promised. The people have not yet turned.", 850],
    ["Tomorrow, Isaiah 10 through 12. Assyria's pride gets its own reckoning, and a remnant learns to sing again.", 850],
    ["For now, carry the name Isaiah gave that child.", 750],
    ["Immanuel. God with us.", 1200],
  ],
};
