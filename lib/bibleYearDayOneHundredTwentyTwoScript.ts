import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 122, written to the Day 1 standard.
 *
 * The second round of speeches turns sharper, not gentler. Eliphaz accuses
 * Job of undoing religion itself, Job calls his friends miserable comforters
 * while still reaching for a witness in heaven, and Bildad answers with a
 * long, merciless poem about how the wicked man's whole life gets erased.
 * Seven blocks across four chapters, matching Day 121.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 122,
  title: "Friends Accuse, Job Suffers",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 122.", 700],
    ["Round two starts, and it is worse than round one.", 750],
    ["Eliphaz comes back and accuses Job of tearing down faith itself.", 800],
    ["Job calls his friends miserable comforters, and then says something that reaches straight past them.", 800],
    ["And Bildad closes the day with the harshest speech yet, a whole poem about a man being erased from memory.", 850],
    ["We are in Job 15 through 18. Accusation, grief, and a picture of judgment with no mercy left in it.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 15, 1, 16, [
      "Eliphaz speaks again, and this time he is not gentle at all. Should a wise man fill his belly with the east wind, he asks. He is calling Job's whole defense empty air.",
      "Then he says Job's own words condemn him. Thine own mouth condemneth thee, and not I. He has stopped listening for anything except proof of guilt.",
      "He asks, art thou the first man that was born, or made before the hills. In other words, who are you to argue with wisdom this old.",
      "Eliphaz says man cannot be clean before God, born of a woman, and drinking iniquity like water. He is right that no one is perfect. He is still using that truth as a weapon against one specific man.",
    ]),
    g("job", 15, 17, 35, [
      "Eliphaz spends the rest of the chapter painting the wicked man's whole life in ruin. Trouble and anguish make him afraid, and he never believes he will come back out of darkness.",
      "He wanders for bread, dwells in desolate cities, and his branch will not be green. Fire consumes the tabernacles of bribery.",
      "It is vivid, and it is not aimed at anyone in the room but Job. Every listener would know exactly who this poem was written about.",
      "Eliphaz is describing something real that does happen to wicked people. His error is assuming it explains everything that happens to Job.",
    ]),
    g("job", 16, 1, 14, [
      "Job answers with a phrase that has outlived every one of these speeches. Miserable comforters are ye all. Three friends, and not one has actually comforted him.",
      "He says if their souls were in his stead, he could pile up words against them too, but he would try to strengthen them instead of tearing them down.",
      "Then he describes what he feels God has done to him. He hath torn me in his wrath, he gnasheth upon me with his teeth, mine enemy sharpeneth his eyes upon me. He is not blaming his friends for this part. He is blaming God directly.",
      "He hath broken me asunder, taken me by the neck, and shaken me to pieces, and set me up for his mark. Job feels like a target, not just a sufferer.",
    ]),
    g("job", 16, 15, 22, [
      "Job describes sewing sackcloth onto his own skin and grinding his face into the dust. His face is foul with weeping, his eyelids are the shadow of death.",
      "Then he says something startling for a man who feels this abandoned. Also now, behold, my witness is in heaven, and my record is on high.",
      "Even accusing God with one breath, he trusts God as his witness with the next. My friends scorn me, but mine eye poureth out tears unto God. He keeps aiming his grief upward, not away.",
      "He ends the chapter longing for exactly what chapter nine already named as missing. Oh that one might plead for a man with God, as a man pleadeth for his neighbour.",
    ]),
    g("job", 17, 1, 9, [
      "Job says plainly, my breath is corrupt, my days are extinct, the graves are ready for me. This is not exaggeration. He believes he is close to death.",
      "He is surrounded by mockers, and calls himself a byword of the people, when once he was respected like a well-tuned instrument. His reputation has collapsed along with his health.",
      "He asks God to be his own surety, his own guarantee, since no human will strike hands with him on his behalf. He is reaching for the mediator idea again, from a different angle.",
      "Then, in the middle of despair, he says something almost defiant. The righteous also shall hold on his way, and he that hath clean hands shall be stronger and stronger. He still believes integrity is worth keeping, even now.",
    ]),
    g("job", 17, 10, 16, [
      "Job tells his friends plainly he cannot find one wise man among them. Whatever comfort they came to offer, it has not landed once.",
      "My days are past, my purposes are broken off, even the thoughts of my heart. He describes night and day blurring together, all of it dark to him now.",
      "If I wait, he says, the grave is mine house. I have made my bed in the darkness. He calls corruption his father and the worm his mother and sister. That is how completely death has become his expected next address.",
      "And where is now my hope, he asks, as for my hope, who shall see it. The chapter ends with hope going down into the pit alongside him.",
    ]),
    g("job", 18, 1, 21, [
      "Bildad answers, and his patience is gone too. How long will it be ere ye make an end of words, he snaps, before launching into the harshest poem yet in the book.",
      "He describes the wicked man's light going out, his own feet walking him into a net, terrors driving him on every side, and the firstborn of death devouring his strength.",
      "His confidence is rooted out of his tent, brimstone is scattered on his home, and his roots dry up beneath him while his branch is cut off above.",
      "Bildad closes with the cruelest line of all. His remembrance shall perish from the earth, and he shall have no name in the street. He is not just describing judgment. He is describing being erased, and aiming every word of it at a grieving father who just lost ten children.",
    ]),
  ],
  closing: [
    ["So that is Day 122.", 700],
    ["The second round of speeches did not soften anything. It sharpened it.", 750],
    ["Eliphaz called Job's grief empty wind. Bildad ended the day picturing a man erased so completely that no one remembers his name.", 800],
    ["And in between both of them, Job said the phrase that outlasted every one of their speeches. Miserable comforters are ye all.", 800],
    ["But watch what he did in the middle of that pain. He kept turning his tears toward God instead of away from Him. My witness is in heaven, he said. My record is on high.", 850],
    ["He does not feel comforted. He has not stopped believing someone is actually listening.", 800],
    ["Tomorrow, Job 19 through 22. In the middle of his worst treatment yet, Job says the words that Handel would set to music thousands of years later. I know that my redeemer liveth.", 850],
    ["For now, hold on to where Job kept aiming his grief.", 800],
    ["Not away from God.", 750],
    ["Straight at Him.", 1200],
  ],
};
