import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 150, written to the Day 1 standard.
 *
 * Psalms 64-66: a man hiding from enemies who sharpen their words like
 * arrows in secret, praise that sounds like it has been waiting its turn,
 * and a nation looking back at being tried like silver and thanking God
 * for it anyway. Seven blocks across the three psalms.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 150,
  title: "Protection and Praise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 150. Psalms 64 through 66.", 700],
    ["A man hiding from enemies who plan their attacks in secret.", 750],
    ["A psalm where praise itself sounds like it has been waiting its turn.", 800],
    ["And a whole nation looking back at being tried like silver, and thanking God for it anyway.", 850],
    ["Protection first. Then praise loud enough for the whole earth.", 700],
    ["We are in Psalms 64, 65, and 66.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(64, 1, 5, [
      "Hear my voice, O God, in my prayer: preserve my life from fear of the enemy. He asks to be preserved not just from the enemy, but from the fear of the enemy. The two are not the same request.",
      "Hide me from the secret counsel of the wicked; from the insurrection of the workers of iniquity. The threat here is not open war. It is planning done where he cannot see it.",
      "Who whet their tongue like a sword, and bend their bows to shoot their arrows, even bitter words. Their weapons are words, sharpened on purpose, aimed the same way an archer aims a bow.",
      "That they may shoot in secret at the perfect: suddenly do they shoot at him, and fear not. They encourage themselves in an evil matter: they commune of laying snares privily; they say, Who shall see them? Confidence built on the belief that no one is watching. That is the whole plan, and it is also the whole mistake.",
    ]),
    g(64, 6, 10, [
      "They search out iniquities; they accomplish a diligent search: both the inward thought of every one of them, and the heart, is deep. He gives them credit for how thorough they are. Careful planning aimed at someone else's ruin is still just careful planning.",
      "But God shall shoot at them with an arrow; suddenly shall they be wounded. So they shall make their own tongue to fall upon themselves: all that see them shall flee away. Their own weapon, sharpened tongues, turned back on them. The ambush they set becomes the one they walk into.",
      "And all men shall fear, and shall declare the work of God; for they shall wisely consider of his doing. What was secret does not stay secret. It becomes something a whole crowd ends up talking about.",
      "The righteous shall be glad in the LORD, and shall trust in him; and all the upright in heart shall glory. The psalm started with one man afraid in private. It ends with a crowd glad in public.",
    ]),
    g(65, 1, 8, [
      "Praise waiteth for thee, O God, in Sion: and unto thee shall the vow be performed. O thou that hearest prayer, unto thee shall all flesh come. The tone changes completely from Psalm 64. Fear gives way to praise that has been waiting for its moment.",
      "Iniquities prevail against me: as for our transgressions, thou shalt purge them away. He does not skip past his own guilt to get to the praise. He names it first, then says God is the one who deals with it.",
      "Blessed is the man whom thou choosest, and causest to approach unto thee, that he may dwell in thy courts: we shall be satisfied with the goodness of thy house, even of thy holy temple. Nearness to God is the actual blessing here, not anything he gets on top of it.",
      "By terrible things in righteousness wilt thou answer us, O God of our salvation. Which by his strength setteth fast the mountains, being girded with power. Which stilleth the noise of the seas, the noise of their waves, and the tumult of the people. The same God who quiets an ocean is the one being asked to quiet the noise in a person's life. Neither one is too loud for him.",
    ]),
    g(65, 9, 13, [
      "Thou visitest the earth, and waterest it: thou greatly enrichest it with the river of God, which is full of water: thou preparest them corn, when thou hast so provided for it. From storms and nations to rain and grain. The same power shows up in a much quieter place.",
      "Thou waterest the ridges thereof abundantly: thou settlest the furrows thereof: thou makest it soft with showers: thou blessest the springing thereof. Verse after verse of ordinary farm work, credited entirely to God. Nothing here is too small for him to be named as the one doing it.",
      "Thou crownest the year with thy goodness; and thy paths drop fatness. They drop upon the pastures of the wilderness: and the little hills rejoice on every side. Even the wilderness, the place nothing is supposed to grow, gets its share.",
      "The pastures are clothed with flocks; the valleys also are covered over with corn; they shout for joy, they also sing. The psalm ends with the land itself singing. Praise was never only a human thing in this psalm.",
    ]),
    g(66, 1, 9, [
      "Make a joyful noise unto God, all ye lands. Sing forth the honour of his name: make his praise glorious. Say unto God, How terrible art thou in thy works! No quiet whisper here. This is loud, and it is meant for everyone, not just Israel.",
      "He turned the sea into dry land: they went through the flood on foot: there did we rejoice in him. The Red Sea, still remembered generations later as the moment the rejoicing began. Some rescues never stop getting talked about.",
      "He ruleth by his power for ever; his eyes behold the nations: let not the rebellious exalt themselves. O bless our God, ye people, and make the voice of his praise to be heard. A warning tucked inside the praise. The same power that saved Israel is watching everyone else too.",
      "Which holdeth our soul in life, and suffereth not our feet to be moved. Staying alive and staying steady are both credited to the same hand, not treated as two separate things a person manages on their own.",
    ]),
    g(66, 10, 15, [
      "For thou, O God, hast proved us: thou hast tried us, as silver is tried. He does not call the hard season a mistake or an accident. He calls it a test, and names God as the one who ran it.",
      "Thou broughtest us into the net; thou laidst affliction upon our loins. No softening language. He says plainly that God is the one who let them be trapped and burdened.",
      "Thou hast caused men to ride over our heads; we went through fire and through water: but thou broughtest us out into a wealthy place. Fire, water, and then out. The hardship gets named in full, but so does the ending.",
      "I will go into thy house with burnt offerings: I will pay thee my vows, which my lips have uttered, and my mouth hath spoken, when I was in trouble. I will offer unto thee burnt sacrifices of fatlings, with the incense of rams; I will offer bullocks with goats. Selah. The vows made in trouble get paid in full once trouble is over. He does not let himself forget what he promised.",
    ]),
    g(66, 16, 20, [
      "Come and hear, all ye that fear God, and I will declare what he hath done for my soul. I cried unto him with my mouth, and he was extolled with my tongue. He turns from talking about the nation to his own private story. The same rescue happened at both sizes.",
      "If I regard iniquity in my heart, the Lord will not hear me. He is honest about the one condition that would have shut the whole prayer down. Answered prayer was never guaranteed no matter what.",
      "But verily God hath heard me; he hath attended to the voice of my prayer. The turn happens in one word. Verily. Whatever he feared might be true was not what actually happened.",
      "Blessed be God, which hath not turned away my prayer, nor his mercy from me. The last line is the simplest one in the whole psalm. Mercy stayed. That is the entire report.",
    ]),
  ],
  closing: [
    ["So that is Day 150.", 700],
    ["Secret arrows, a land singing under God's hand, and a nation thanking him for the fire and the water both.", 800],
    ["Psalm 64 says the ambush someone builds in private can still become the story everyone ends up telling.", 800],
    ["Psalm 65 says praise can wait a long time and still be exactly on time when it finally comes.", 800],
    ["And Psalm 66 says being tried like silver is not proof God left. It can be proof of exactly how close he stayed.", 850],
    ["Tomorrow, Psalms 67 through 69. More praise, and then a prayer from someone sinking in deep water.", 850],
    ["For now, hold on to the silver.", 800],
    ["Tried in the fire, not thrown away.", 750],
    ["Brought out into a wealthy place.", 1200],
  ],
};
