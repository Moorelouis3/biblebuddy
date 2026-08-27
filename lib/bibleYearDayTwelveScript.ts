import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 12, written to the Day 1 standard.
 *
 * Genesis 30-31 closes out Jacob's twenty years with Laban: two wives
 * competing through their servants and their sons, a wage scheme fought with
 * peeled rods, and finally a flight across the hill country with Laban in
 * pursuit. Six blocks, matching the shape of Days 10 and 11.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWELVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 12,
  title: "Jacob Leaves Laban",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 12. Two wives, two rivalries, and twenty years of scheming.", 750],
    ["Jacob tricked his way into a birthright. Now he is about to get out-tricked, over and over, by his own father-in-law.", 800],
    ["Sons get born out of jealousy and competition. Flocks get built out of a trick with sticks in the water troughs.", 800],
    ["And at the end of it, Jacob finally runs.", 900],
    ["Not from Esau this time. From Laban.", 1000],
    ["We are in Genesis 30 and 31. A baby-name war, a striped-flock scheme, and a chase across the hill country.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(30, 1, 8, [
      "Rachel is barren and Leah is not, and Rachel says the line that shows how bad it has gotten. Give me children, or I die.",
      "Jacob gets angry right back at her. Am I in God's place, who has kept you from having children? He cannot fix what only God can fix.",
      "So Rachel does what Sarah did a generation earlier. She hands Jacob her servant Bilhah, and names the sons that come from it Dan and Naphtali. Even the names are aimed at her sister.",
      "This family keeps solving spiritual problems with human strategy. It grows the headcount. It never touches the ache underneath it.",
    ]),
    g(30, 9, 24, [
      "Leah sees she has stopped having children too, so she hands over her servant Zilpah, and Gad and Asher are born into the same competition.",
      "Then Reuben finds mandrakes in the field, and Rachel trades a night with Jacob for them, like he is a wage to be negotiated between two sisters.",
      "Leah bears Issachar, Zebulun, and a daughter, Dinah. Ten sons now belong to two women who cannot stand each other.",
      "And then, finally, God remembered Rachel, and listened to her, and opened her womb. Not the mandrakes. Not the bargaining. God, in His own time, gives her Joseph.",
    ]),
    g(30, 25, 43, [
      "Jacob asks to go home, and Laban admits the quiet part out loud. I have learned by experience that the Lord has blessed me for your sake.",
      "So Jacob names his wages. Every speckled and spotted animal from here forward is his. Laban agrees, then quietly pulls every speckled animal out himself and puts three days of distance between them.",
      "Jacob answers the cheat with a strange trick of his own. Peeled rods of poplar, hazel, and chestnut, set in front of the flocks at the water troughs, so the strong ones breed streaked and spotted young.",
      "However that worked, Genesis is clear about who gets the credit later. The man increased exceedingly. Twenty years of being cheated end with him owning more than the man who cheated him.",
    ]),
    g(31, 1, 16, [
      "Jacob hears Laban's sons saying he has taken everything that was their father's, and he sees Laban's face has changed toward him. The wind shifts before anyone says a word.",
      "Then God speaks plainly. Return to the land of your fathers, and I will be with you. The same promise from Bethel, twenty years later, still standing.",
      "Jacob calls Rachel and Leah out to the field, away from the house, and lays it all out. Your father has cheated me and changed my wages ten times, but God has not allowed him to hurt me.",
      "For once his wives are fully on his side. He has treated us as strangers, they say, and sold us, and used up the money. Whatever God has told you, do it.",
    ]),
    g(31, 17, 35, [
      "Jacob loads his wives and children on camels and drives off every flock he owns while Laban is off shearing sheep, days away. He does not ask permission. He just leaves.",
      "And Rachel, on her way out the door, steals her father's household gods. Nobody tells Jacob. He has no idea what he is carrying into the promised land.",
      "Laban catches up seven days later, ready for a fight, and God gets to him first, in a dream, with one instruction. Say nothing to Jacob, good or bad.",
      "Laban still asks the accusing question, why did you steal my gods, and Jacob, not knowing his own wife did it, swears that whoever has them will not live. He is about to make a vow he cannot keep.",
    ]),
    g(31, 36, 55, [
      "Laban searches every tent and finds nothing, because Rachel is sitting on the idols and tells her father she cannot rise, it is that time of the month. She lies to his face and gets away with it.",
      "Then Jacob finally lets twenty years out at once. Your ewes and your goats have not miscarried. The heat wore me out by day, the frost by night, and you changed my wages ten times.",
      "Laban cannot argue with any of it, so he changes the subject to a treaty instead. They pile stones into a heap and Laban says the line everyone remembers. The Lord watch between me and thee, when we are absent one from another.",
      "It sounds like a blessing. It is really a boundary. Two men who never trusted each other, asking God to police the distance between them, because they could not do it themselves.",
    ]),
  ],
  closing: [
    ["So that is Day 12.", 700],
    ["Two rivals racing to have children, a flock built by a trick with sticks, and a father-in-law finally left behind.", 700],
    ["Notice how much of this day runs on human strategy. Servants handed over, mandrakes traded, peeled rods in the water troughs.", 800],
    ["And notice what actually worked. Not one of those plans. God remembered Rachel. God told Jacob to go. God warned Laban in a dream.", 800],
    ["The scheming fills the page. The change never comes from the scheming.", 850],
    ["Twenty years of being outsmarted end with Jacob walking away richer, freer, and finally headed home.", 850],
    ["Tomorrow, Genesis 32 and 33. Jacob has to face the brother he ran from, and God meets him first, in the dark, alone.", 850],
    ["For now, hold on to the stone heap.", 800],
    ["The Lord watch between me and thee.", 750],
    ["Said by two men who still did not trust each other.", 1200],
  ],
};
