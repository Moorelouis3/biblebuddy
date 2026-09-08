import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 155, written to the Day 1 standard.
 *
 * Psalms 79-81: a ruined city begging God to forget its own sins rather than
 * ask for revenge first, a vine God planted himself now torn open, and a
 * warning spoken in God's own voice that ends unanswered. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 155,
  title: "Judgment, Restoration, and Listening",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 155. Psalms 79 through 81.", 700],
    ["A city in ruins, bodies left in the street for the birds.", 750],
    ["A vine God planted with his own hand, now broken open for anyone passing by to strip.", 800],
    ["And a warning, spoken in God's own voice, that His own people simply did not want to hear.", 850],
    ["Three different kinds of asking today. Asking for mercy. Asking for rescue. And, at the end, God asking them.", 800],
    ["We are in Psalms 79, 80, and 81.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(79, 1, 8, [
      "O God, the heathen are come into thine inheritance; thy holy temple have they defiled; they have laid Jerusalem on heaps. The dead bodies of thy servants have they given to be meat unto the fowls of the heaven. The psalm opens with nothing softened. The temple is defiled, the dead are left unburied, and the birds are already circling.",
      "We are become a reproach to our neighbours, a scorn and derision to them that are round about us. How long, LORD? wilt thou be angry for ever? shall thy jealousy burn like fire? The complaint is raw and it is aimed straight at God, not just at the enemy.",
      "But watch where the prayer turns next. O remember not against us former iniquities: let thy tender mercies speedily prevent us. Before he asks God to punish anyone else, he asks God to forget what Israel itself deserves.",
      "For we are brought very low. No pretending strength here, no bargaining from a position of confidence. Just the plain admission that they cannot survive on their own case.",
    ]),
    g(79, 9, 13, [
      "Help us, O God of our salvation, for the glory of thy name: and deliver us, and purge away our sins, for thy name's sake. The reason given for rescue is not that Israel has earned it. It is God's own name on the line.",
      "Let the sighing of the prisoner come before thee; according to the greatness of thy power preserve thou those that are appointed to die. In the middle of a national disaster, the prayer stops to name the ones already condemned and dying, one by one.",
      "Then the prayer turns hard. And render unto our neighbours sevenfold into their bosom their reproach, wherewith they have reproached thee, O Lord. That request is not cleaned up for you. It is left exactly as prayed.",
      "So we thy people and sheep of thy pasture will give thee thanks for ever: we will shew forth thy praise to all generations. The psalm ends with a vow to praise, made before any of it has actually happened yet.",
    ]),
    g(80, 1, 7, [
      "Give ear, O Shepherd of Israel, thou that leadest Joseph like a flock; thou that dwellest between the cherubims, shine forth. The God being addressed here is pictured two ways at once. A shepherd walking with the flock, and a king enthroned above it.",
      "Before Ephraim and Benjamin and Manasseh stir up thy strength, and come and save us. Three tribes are named by name, as if the psalm is standing in a specific place asking for a specific rescue, not a general one.",
      "Turn us again, O God, and cause thy face to shine; and we shall be saved. That line will come back twice more before this psalm ends. It is the whole prayer, said three separate times, each time with a slightly bigger name for God attached to it.",
      "Thou feedest them with the bread of tears; and givest them tears to drink in great measure. Thou makest us a strife unto our neighbours: and our enemies laugh among themselves. Grief has become their daily food, and their suffering has become someone else's entertainment.",
    ]),
    g(80, 8, 19, [
      "Thou hast brought a vine out of Egypt: thou hast cast out the heathen, and planted it. The exodus gets retold here as a gardening story. God did not just rescue a people. He planted them somewhere on purpose.",
      "The hills were covered with the shadow of it, and the boughs thereof were like the goodly cedars. She sent out her boughs unto the sea, and her branches unto the river. This vine did not just survive. It filled the whole land God gave it.",
      "Why hast thou then broken down her hedges, so that all they which pass by the way do pluck her? The boar out of the wood doth waste it. It is burned with fire, it is cut down. The question is asked straight to God's face. You planted this. Why is it lying open now?",
      "Turn us again, O LORD God of hosts, cause thy face to shine; and we shall be saved. So will not we go back from thee: quicken us, and we will call upon thy name. The third time the refrain comes, it is no longer just a plea. It is a promise attached to it. Bring us back, and we will not leave again.",
    ]),
    g(81, 1, 10, [
      "Sing aloud unto God our strength: make a joyful noise unto the God of Jacob. Blow up the trumpet in the new moon, in the time appointed, on our solemn feast day. This psalm was written to be sung out loud, at a specific festival, on a specific day. It is not private reflection. It is a command to celebrate.",
      "I removed his shoulder from the burden: his hands were delivered from the pots. God speaks now in his own voice, and the memory he reaches for is physical. Freed shoulders. Hands out of the mixing pots of slave labor in Egypt.",
      "Thou calledst in trouble, and I delivered thee; I answered thee in the secret place of thunder: I proved thee at the waters of Meribah. He names the specific place where Israel had tested him back, and calls it what it was.",
      "I am the LORD thy God, which brought thee out of the land of Egypt: open thy mouth wide, and I will fill it. The image is a mouth open and waiting, like a young bird. The offer is abundance. The only condition is trust.",
    ]),
    g(81, 11, 16, [
      "But my people would not hearken to my voice; and Israel would none of me. So I gave them up unto their own hearts' lust: and they walked in their own counsels. God's response to being refused is not force. It is letting go, and letting the choice run its course.",
      "Oh that my people had hearkened unto me, and Israel had walked in my ways! The saddest word in the whole psalm is oh that. It is grief spoken as a wish, not a threat.",
      "I should soon have subdued their enemies, and turned my hand against their adversaries. The haters of the LORD should have submitted themselves unto him. What was missed was not just comfort. It was protection that was standing ready and never used.",
      "He should have fed them also with the finest of the wheat: and with honey out of the rock should I have satisfied thee. The psalm does not end on punishment. It ends on the meal that was already prepared and never eaten.",
    ]),
  ],
  closing: [
    ["So that is Day 155.", 700],
    ["A ruined city, a broken vine, and a people who would not listen.", 750],
    ["Psalm 79 does something worth noticing. It does not lead with what the enemy deserves. It leads with begging God to forget what Israel deserves.", 800],
    ["Psalm 80 turns the exodus into a garden story, and then asks the hardest question in it. You planted this yourself. Why did you break it open?", 850],
    ["And Psalm 81 ends on the saddest word in the whole set. Oh that. Oh that my people had listened.", 850],
    ["God did not walk away first, in any of these three. He kept calling until they stopped answering.", 800],
    ["Tomorrow, Psalms 82 through 84. Justice for the powerless, and a longing for God's own house that will not let go.", 850],
    ["For now, hold on to the refrain.", 750],
    ["Turn us again, and cause thy face to shine.", 800],
    ["That is still how it starts.", 1200],
  ],
};
