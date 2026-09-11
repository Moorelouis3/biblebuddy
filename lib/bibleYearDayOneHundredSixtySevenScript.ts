import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 167, written to the Day 1 standard.
 *
 * Psalms 115-117: a takedown of idols followed by a call to trust the living
 * God, one man's account of nearly dying and what he decided to give back,
 * and the shortest psalm and shortest chapter in the Bible, aimed at every
 * nation. Six blocks, splitting 115 and 116 in thirds and halves, 117 on its
 * own since it is only two verses.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 167,
  title: "The Lord Alone Is Worthy",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 167. Psalms 115 through 117.", 700],
    ["Yesterday ended on how low God stoops. Today opens by asking why anyone would trade that for something silver and gold that cannot even see.", 800],
    ["Then one man tells you exactly what it felt like to almost die, and what he decided to do about it.", 800],
    ["And the day closes with two verses. The shortest psalm in the whole Bible, and it is not even aimed at Israel.", 850],
    ["Idols that cannot speak, then a man who will not stop speaking, then every nation on earth invited to sing.", 800],
    ["We are in Psalms 115, 116, and 117.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(115, 1, 8, [
      "Not unto us, O LORD, not unto us, but unto thy name give glory. The psalm opens by refusing the credit twice in one line, before it even says why.",
      "Wherefore should the heathen say, Where is now their God? Other nations are taunting. That pressure is what sits behind everything that follows.",
      "Their idols are silver and gold, the work of men's hands. They have mouths, but they speak not: eyes have they, but they see not. Six things an idol cannot do, listed one right after another. Speak, see, hear, smell, handle, walk.",
      "They that make them are like unto them; so is every one that trusteth in them. The warning lands last. Worship something lifeless long enough, and you go numb the same way.",
    ]),
    g(115, 9, 13, [
      "O Israel, trust thou in the LORD... O house of Aaron... Ye that fear the LORD... The same instruction given to three different groups in a row. Everyone, priest and ordinary person, gets the identical line.",
      "He is their help and their shield. Repeated three times, once per group. Not a new promise each time. The same one, said until it sinks in.",
      "The LORD hath been mindful of us: he will bless us. Present tense turns to future. The trust asked for is a response to something already shown, not a gamble on something unproven.",
      "He will bless them that fear the LORD, both small and great. No tier system in this blessing. It does not scale with rank.",
    ]),
    g(115, 14, 18, [
      "The LORD shall increase you more and more, you and your children. A blessing that reaches past the people singing it, into a generation not yet born.",
      "The heaven, even the heavens, are the LORD'S: but the earth hath he given to the children of men. He kept the sky and handed the ground over to us. A strange kind of trust to extend.",
      "The dead praise not the LORD, neither any that go down into silence. A blunt line, with no softening.",
      "But we will bless the LORD from this time forth and for evermore. Praise the LORD. The psalm answers its own observation. While there is breath, there is praise, and that is the whole reason to use it now.",
    ]),
    g(116, 1, 9, [
      "I love the LORD, because he hath heard my voice and my supplications. The psalm opens with love explained by a reason, not just declared on its own.",
      "The sorrows of death compassed me, and the pains of hell gat hold upon me: I found trouble and sorrow. Whatever this was, it is described in the language of nearly dying, surrounded on every side.",
      "Then called I upon the name of the LORD; O LORD, I beseech thee, deliver my soul. Four words, and the whole prayer is there. No long speech needed at the bottom.",
      "Return unto thy rest, O my soul; for the LORD hath dealt bountifully with thee. He talks to his own soul directly, telling it to stop struggling now that the danger has passed.",
    ]),
    g(116, 10, 19, [
      "I said in my haste, All men are liars. Even a psalm of gratitude admits the low, half-honest thought that slipped out under pressure.",
      "What shall I render unto the LORD for all his benefits toward me? I will take the cup of salvation. The answer to what he can give back turns out to be receiving more from God, out loud, in front of everyone.",
      "Precious in the sight of the LORD is the death of his saints. After nine verses about being pulled back from dying, this line says God does not take even that death lightly when it finally comes.",
      "O LORD, truly I am thy servant... thou hast loosed my bonds. He names himself a servant twice, born to a servant, before naming the one specific thing God actually did.",
    ]),
    g(117, 1, 2, [
      "O praise the LORD, all ye nations: praise him, all ye people. Two verses. The shortest psalm, and the shortest chapter, in the entire Bible.",
      "And it is not aimed at Israel. It calls every nation and every people to praise the same God Israel has been singing about all day.",
      "For his merciful kindness is great toward us: and the truth of the LORD endureth for ever. One reason given for all of it. Mercy toward us, and a truth that outlasts everything else.",
      "The apostle Paul quotes this exact verse in Romans, using it to say the nations were always meant to praise God alongside Israel, not instead of them.",
    ]),
  ],
  closing: [
    ["So that is Day 167.", 700],
    ["Psalm 115 takes idols apart piece by piece, then tells Israel, the priests, and anyone who fears the LORD to trust the same living God. Psalm 116 is one man's account of nearly dying and what he decided to give back. Psalm 117 fits the shortest chapter in the whole Bible into two verses, and points it at every nation on earth.", 850],
    ["Three very different psalms, but they all end up in the same place. Worship the God who actually sees, hears, and acts. Not the one you made yourself.", 800],
    ["Psalm 116 is worth sitting with longer than two lines deserve. Precious in the sight of the LORD is the death of his saints. Even that gets noticed by him.", 850],
    ["Tomorrow, Psalms 118 through 120. Songs pilgrims sang on their way up to Jerusalem, and one line about a rejected stone that becomes one of the most quoted verses in the New Testament.", 850],
    ["For now, hold on to the shortest psalm you read today.", 800],
    ["O praise the LORD, all ye nations.", 750],
    ["Every one of them. Not just the one that was already singing.", 1200],
  ],
};
