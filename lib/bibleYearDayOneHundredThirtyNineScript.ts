import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 139, written to the Day 1 standard.
 *
 * Psalms 31-33: a prayer spoken from inside an actual crisis, a confession
 * that finally gets said out loud, and a psalm that only praises, because
 * the first two already did the asking. Psalm 31 splits into three even
 * blocks at its own turns (plea, collapse, resolve); Psalm 32 stays whole
 * since it is one continuous confession; Psalm 33 splits at its turn from
 * command to praise into the description of God watching everyone.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 139,
  title: "Trust, Confession, and Praise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 139.", 750],
    ["Psalm thirty-one is a man praying from the middle of an actual crisis, not looking back on it.", 800],
    ["Psalm thirty-two is the same king, later, finally saying out loud what he had been hiding.", 800],
    ["Psalm thirty-three does not ask for anything at all. It just praises, because the first two already earned it.", 800],
    ["We are in Psalms 31 through 33.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(31, 1, 8, [
      "In thee, O LORD, do I put my trust; let me never be ashamed... Bow down thine ear to me; deliver me speedily: be thou my strong rock, for an house of defence to save me. He opens already trusting. He does not spend the first verses working himself up to it.",
      "For thou art my rock and my fortress... Pull me out of the net that they have laid privily for me: for thou art my strength. He is not describing a vague danger. Somebody set an actual trap, in secret, and he knows it.",
      "Into thine hand I commit my spirit: thou hast redeemed me, O LORD God of truth. A thousand years later, dying on a cross, Jesus prays this exact line out loud. David hands God those words first, not knowing who would need them most.",
      "I will be glad and rejoice in thy mercy... thou hast set my feet in a large room. He is not still asking here. Something has already loosened. A large room, after being cornered.",
    ]),
    g(31, 9, 16, [
      "Have mercy upon me, O LORD, for I am in trouble... my strength faileth because of mine iniquity, and my bones are consumed. Grief is described here like a disease eating his body, not just a feeling passing through.",
      "I was a reproach among all mine enemies, but especially among my neighbours... I am forgotten as a dead man out of mind: I am like a broken vessel. The people closest to him ran first. A broken vessel is not repaired. It is thrown out and replaced.",
      "For I have heard the slander of many: fear was on every side... they devised to take away my life. The threat is not only physical. It is words, said about him in rooms he is not in.",
      "But I trusted in thee, O LORD: I said, Thou art my God... Make thy face to shine upon thy servant. Right after describing total collapse, he restates trust in the very next breath. He does not wait to feel better first.",
    ]),
    g(31, 17, 24, [
      "Let me not be ashamed, O LORD... Let the lying lips be put to silence; which speak grievous things proudly and contemptuously against the righteous. He asks the same protection for himself that he asks against the people who slandered him. Fair trade, not extra revenge.",
      "Oh how great is thy goodness, which thou hast laid up for them that fear thee... thou shalt keep them secretly in a pavilion from the strife of tongues. Goodness laid up, like something stored and waiting, not yet handed out.",
      "Blessed be the LORD: for he hath shewed me his marvellous kindness... I said in my haste, I am cut off from before thine eyes: nevertheless thou heardest the voice of my supplications. He admits he panicked and said something false about God. God answered him anyway.",
      "O love the LORD, all ye his saints... Be of good courage, and he shall strengthen your heart, all ye that hope in the LORD. The psalm turns outward at the very end. The courage he had to fight for the whole way through, he now hands to everyone listening.",
    ]),
    g(32, 1, 11, [
      "Blessed is he whose transgression is forgiven, whose sin is covered. Blessed is the man unto whom the LORD imputeth not iniquity, and in whose spirit there is no guile. Blessing defined here by what is not counted against you, and by having nothing left to hide.",
      "When I kept silence, my bones waxed old through my roaring all the day long. For day and night thy hand was heavy upon me: my moisture is turned into the drought of summer. This is what hiding it did to his body before he ever said one word about it. Roaring, not quiet suffering.",
      "I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin. The relief lands the moment he decides to say it. Nothing outside him has changed yet.",
      "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye. Be ye not as the horse, or as the mule, which have no understanding: whose mouth must be held in with bit and bridle. God offers to guide with a glance. Whether you need the bit and bridle instead is your choice, not His.",
    ]),
    g(33, 1, 11, [
      "Rejoice in the LORD, O ye righteous... Sing unto him a new song; play skilfully with a loud noise. Praise is commanded here to be skillful and loud, not quiet and halfhearted.",
      "For the word of the LORD is right; and all his works are done in truth. He loveth righteousness and judgment: the earth is full of the goodness of the LORD. What God says and what God does are tied together directly. No gap between the two.",
      "By the word of the LORD were the heavens made; and all the host of them by the breath of his mouth... he layeth up the depth in storehouses. Creation happens by speech alone, no other tool involved. Entire oceans stored away like grain.",
      "For he spake, and it was done; he commanded, and it stood fast... The counsel of the LORD standeth for ever, the thoughts of his heart to all generations. Human plans need constant revision. His first plan is still standing.",
    ]),
    g(33, 12, 22, [
      "Blessed is the nation whose God is the LORD... He fashioneth their hearts alike; he considereth all their works. The same maker made every single heart, so He reads all of them the same way. No favorites by nation.",
      "There is no king saved by the multitude of an host... An horse is a vain thing for safety: neither shall he deliver any by his great strength. Army size and cavalry were the two things that felt like guaranteed safety in that world. Both are called worthless for what actually matters.",
      "Behold, the eye of the LORD is upon them that fear him, upon them that hope in his mercy; To deliver their soul from death, and to keep them alive in famine. God watching is not passive here. It is described as active rescue.",
      "Our soul waiteth for the LORD: he is our help and our shield... Let thy mercy, O LORD, be upon us, according as we hope in thee. A psalm that opened commanding loud praise ends quietly waiting. It closes the same way Psalm 31 began. Trust, stated before anything visible has changed.",
    ]),
  ],
  closing: [
    ["So that is Day 139.", 700],
    ["A crisis prayed through while it was still happening, a confession finally spoken, and praise built on nothing but what God had already done.", 850],
    ["Notice the one line that outlives all three psalms.", 750],
    ["Into thine hand I commit my spirit.", 800],
    ["A thousand years after David wrote it, Jesus prays those exact words, dying, on a cross.", 850],
    ["David handed God those words first, not knowing who would need them most.", 800],
    ["And Psalm thirty-two says the relief comes the moment you finally say it, before anything outside you has changed at all.", 850],
    ["Tomorrow, Psalms 34 through 36. Taste and see that the LORD is good.", 800],
    ["For now, hold David's line.", 750],
    ["Into thine hand I commit my spirit. Say it as your own.", 1200],
  ],
};
