import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 147, written to the Day 1 standard.
 *
 * Psalms 55-57: betrayal by a close friend, daily pressure from enemies who
 * will not let up, and a soul finding refuge in the shadow of God's wings.
 * Heavier reading than Day 146, so seven blocks to cover all three psalms
 * without gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 147,
  title: "Betrayal, Fear, and Mercy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 147. Psalms 55 through 57.", 700],
    ["A prayer from a man betrayed by his closest friend.", 750],
    ["A prayer written under daily pressure that will not let up.", 800],
    ["And a prayer that ends up somewhere steady, in the shadow of God's wings.", 850],
    ["Same voice in all three. Real fear, named out loud, and a decision to trust anyway.", 800],
    ["We are in Psalms 55, 56, and 57.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(55, 1, 8, [
      "Give ear to my prayer, O God; and hide not thyself from my supplication. This is not a calm prayer. This is someone afraid God might look away.",
      "My heart is sore pained within me: and the terrors of death are fallen upon me. He does not soften it. He names exactly how bad it feels.",
      "Oh that I had wings like a dove! for then would I fly away, and be at rest. Not a plan. Just the truest thing he can say. He wants out.",
      "I would hasten my escape from the windy storm and tempest. Whatever is coming at him does not feel survivable from where he is standing.",
    ]),
    g(55, 9, 15, [
      "Destroy, O Lord, and divide their tongues: for I have seen violence and strife in the city. He is not imagining this. He has watched it happen.",
      "For it was not an enemy that reproached me; then I could have borne it. An enemy's cruelty he could carry. This is something else.",
      "But it was thou, a man mine equal, my guide, and mine acquaintance. We took sweet counsel together, and walked unto the house of God in company. Someone who prayed beside him. That is who turned on him.",
      "Let death seize upon them, and let them go down quick into hell. The anger is not decoration. Betrayal by a friend cuts deeper than anything a stranger could do.",
    ]),
    g(55, 16, 23, [
      "As for me, I will call upon God; and the Lord shall save me. Evening, and morning, and at noon, will I pray, and cry aloud. Three times a day, on purpose, not just when he happens to remember.",
      "The words of his mouth were smoother than butter, but war was in his heart. He is still thinking about the friend. Soft words hiding a blade.",
      "Cast thy burden upon the Lord, and he shall sustain thee. Not carry it for a moment. Sustain, meaning hold it up for as long as it takes.",
      "But I will trust in thee. After twenty-three verses of fear and betrayal, that is the last sentence. Not because the danger is gone. Because he decided where to put it.",
    ]),
    g(56, 1, 7, [
      "Be merciful unto me, O God: for man would swallow me up; he fighting daily oppresseth me. Not a single bad day. Daily pressure, wearing him down.",
      "What time I am afraid, I will trust in thee. He does not say the fear leaves. He says what he does with it while it is still there.",
      "In God I will praise his word, in God I have put my trust; I will not fear what flesh can do unto me. Flesh can still hurt him. It just does not get to be the biggest thing in the room anymore.",
      "They gather themselves together, they hide themselves, they mark my steps, when they wait for my soul. He knows exactly how he is being watched. Naming it does not make it stop, but it keeps him from pretending.",
    ]),
    g(56, 8, 13, [
      "Thou tellest my wanderings: put thou my tears into thy bottle: are they not in thy book? He is asking God to keep count of exactly what this has cost him.",
      "When I cry unto thee, then shall mine enemies turn back: this I know; for God is for me. Not a hope. He says I know.",
      "Thy vows are upon me, O God: I will render praises unto thee. The vow got made in the fear. The praise gets paid once the fear starts lifting.",
      "For thou hast delivered my soul from death: wilt not thou deliver my feet from falling, that I may walk before God in the light of the living? One rescue makes him ask for the next one. Not greed. A man who has learned where help comes from.",
    ]),
    g(57, 1, 6, [
      "Be merciful unto me, O God, be merciful unto me: for my soul trusteth in thee: yea, in the shadow of thy wings will I make my refuge, until these calamities be overpast. He says it twice. Some prayers need repeating just to get the words out.",
      "My soul is among lions: and I lie even among them that are set on fire, even the sons of men, whose teeth are spears and arrows, and their tongue a sharp sword. Their words are the weapon. He describes them like animals because that is what the danger feels like.",
      "Be thou exalted, O God, above the heavens; let thy glory be above all the earth. Right in the middle of the danger, he stops to ask for something that has nothing to do with his own safety.",
      "They have digged a pit before me, into the midst whereof they are fallen themselves. The trap built for him catches the ones who built it. He does not have to lift a hand.",
    ]),
    g(57, 7, 11, [
      "My heart is fixed, O God, my heart is fixed: I will sing and give praise. Said twice again. Whatever was shaking earlier in the psalm has settled into something decided.",
      "Awake up, my glory; awake, psaltery and harp: I myself will awake early. He is not waiting for a better mood. He is choosing to start the song himself.",
      "I will praise thee, O Lord, among the people: I will sing unto thee among the nations. What happened in hiding does not stay hidden. He plans to say it out loud.",
      "Be thou exalted, O God, above the heavens: let thy glory be above all the earth. Same line the psalm opened toward. He ends exactly where he aimed.",
    ]),
  ],
  closing: [
    ["So that is Day 147.", 700],
    ["A friend who broke trust, an enemy that would not stop, and a soul finding refuge under wings.", 750],
    ["Psalm 55 says betrayal by someone close cuts deeper than any stranger's cruelty ever could.", 800],
    ["Psalm 56 says fear does not have to leave before trust moves in. They can sit in the same room.", 800],
    ["And Psalm 57 shows what happens to a heart that decides, twice, to stay fixed on God.", 850],
    ["Tomorrow, Psalms 58 through 60. Justice for the wicked, and restoration for everyone else.", 850],
    ["For now, hold on to the wings.", 800],
    ["Shadow enough to hide in.", 750],
    ["Until the storm is overpast.", 1200],
  ],
};
