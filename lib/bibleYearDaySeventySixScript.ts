import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 76, written to the Day 1 standard.
 *
 * 1 Samuel 31 closes Saul's story on Mount Gilboa; 2 Samuel 1-3 opens
 * David's with grief instead of celebration, a fractured nation under two
 * kings, and a blood debt between Joab and Abner that neither king actually
 * controls. Seven blocks across four chapters, the last one long and
 * eventful (2 Samuel 3).
 */

const sam1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const sam2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 76,
  title: "Saul Falls and David's Kingdom Begins",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 76. Saul dies on a mountain, and everything about who rules Israel is suddenly up for grabs.", 750],
    ["David doesn't celebrate. He grieves, then starts building a kingdom one careful step at a time.", 800],
    ["But he's not the only one building one. Saul's own general crowns a different son of Saul the very same week.", 800],
    ["Two kings, one nation, and a debt of blood that's about to get collected at a well.", 850],
    ["We are in 1 Samuel 31 and 2 Samuel 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam1(31, 1, 13, [
      "Jonathan dies first, before Saul even gets his own scene. The best man in this whole story ends up as one clause in a casualty list.",
      "Saul asks his armorbearer to finish him rather than let the Philistines take him alive. The man refuses. Even at the very end, nobody wants to be the one to kill Saul.",
      "So Saul falls on his own sword. His body ends up nailed to a wall in a Philistine town, publicly. His head goes to their idol's temple as a trophy.",
      "The men of Jabesh-gilead risk their lives that same night to steal the bodies down and bury them. Saul once rescued this town in his first act as king. Twenty years later, they're the only ones who show up for him.",
    ]),
    sam2(1, 1, 16, [
      "A young Amalekite shows up with Saul's crown and tells David a story. Saul was still alive, asked me to finish him, so I did. He clearly thinks this earns him a reward from the man who's been running from Saul for years.",
      "He's almost certainly lying. 1 Samuel already told us Saul fell on his own sword. This man picked up a crown off a corpse and built a story around it that he thought David would want to hear.",
      "David doesn't celebrate for even one line. He tears his clothes and mourns Saul and Jonathan and the whole army, on the same day someone hands him proof his enemy is finally dead.",
      "Then he has the man executed, for claiming he killed the Lord's anointed, even if the claim was a lie. David spared Saul's life twice with his own hands. He will not reward someone else for taking it, real or invented.",
    ]),
    sam2(1, 17, 27, [
      "David writes a funeral song for the man who spent years trying to kill him, and orders it taught to the whole tribe of Judah. This isn't a private feeling. He wants an entire nation grieving Saul correctly.",
      "He praises Saul first, calls him swift and strong, and never once mentions the chase, the spear thrown at his own head, any of it. Grief gets the final word over grievance.",
      "Then he turns to Jonathan, and the tone changes completely. Very pleasant hast thou been unto me. Thy love to me was wonderful, passing the love of women. He is not shy about naming the deepest friendship of his life.",
      "How are the mighty fallen, he says three times through the poem. Repetition as mourning. Some grief doesn't need new words, just the same true one, said again.",
    ]),
    sam2(2, 1, 11, [
      "Even now, with Saul dead and the throne finally open, David still asks first. Shall I go up? Where? He got the promise years ago at Bethlehem. He still won't move on it without being told to.",
      "Judah anoints him king. That's it. Not all Israel. Just his own tribe, in one town, Hebron. The promise is starting to come true in the smallest possible way.",
      "David's first act as king is to thank the men of Jabesh-gilead for burying Saul. He is building loyalty with kindness while another man tries to build a kingdom on Saul's leftover crown.",
      "Because Abner, Saul's own general, has already made Ish-bosheth king over everyone else. Two kings now stand over one nation. Nobody voted for peace. Somebody has to lose.",
    ]),
    sam2(2, 12, 32, [
      "Abner suggests the young men play before us, and twenty-four of them stab each other to death in pairs. What starts as sport becomes a mass grave with its own name, Helkath-hazzurim, the field of sharp edges.",
      "Asahel is fast and proud of it, and won't stop chasing Abner even when Abner begs him twice to turn aside and take an easier target. Abner does not want to kill this boy.",
      "He kills him anyway, one thrust backward with the butt of his own spear, because Asahel would not listen. Sometimes the warning really is the last mercy offered before the worst thing happens.",
      "By nightfall Joab lets the pursuit go, but the debt is not forgotten. Asahel's blood is now owed, and Joab is exactly the kind of man who collects.",
    ]),
    sam2(3, 1, 21, [
      "The house of David keeps getting stronger. The house of Saul keeps getting weaker. Some declines are just the natural shape of things ending.",
      "Ish-bosheth accuses Abner of sleeping with his father's concubine, which in that world was a claim to the throne itself. Abner explodes back at him, and you can hear a man who has spent years propping up a king he never respected.",
      "So Abner switches sides, and offers David all of Israel. But first he demands Michal back, Saul's daughter, David's first wife. Political power, sealed the same way it always is in this book, through a marriage.",
      "Nobody asks Michal what she wants. Her husband Phaltiel walks behind her weeping the whole way to Bahurim, and Abner just tells him to go home. She is currency in a peace deal between three men.",
    ]),
    sam2(3, 22, 39, [
      "Joab comes home from a raid, hears Abner just left in peace, and storms in to David furious. Then he does something David never ordered. He calls Abner back and kills him at the gate, for his brother's blood, and maybe for his own fear of losing his place to a defector.",
      "David makes sure everyone knows he didn't order it. He curses Joab's whole house out loud and walks behind Abner's coffin himself, weeping at the grave of a man who had spent years trying to destroy him too.",
      "Then he refuses to eat until sundown, and the people notice, and it works. Whatever the king did pleased all the people. Public grief, honestly carried, is also how a fragile new king proves he isn't the killer everyone might assume he is.",
      "David says it plainly at the end. I am weak, though anointed king, and these sons of Zeruiah are too hard for me. He has the throne now. He does not yet have control of his own army.",
    ]),
  ],
  closing: [
    ["So that is Day 76.", 700],
    ["Saul died by his own hand rather than be mocked by the men who hated him.", 750],
    ["David wept for him anyway, and had the man who lied about killing him executed for it.", 800],
    ["For years now, David will reign over just one tribe while a rival king sits over the rest of Israel.", 800],
    ["And underneath all of it, a feud between two generals is quietly deciding what neither king can actually control.", 850],
    ["Tomorrow, 2 Samuel 4 through 7. Ish-bosheth's kingdom collapses, and God makes David a promise that changes everything.", 850],
    ["For now, hold onto David's own words about himself.", 750],
    ["I am weak, though anointed king.", 800],
    ["Some victories don't feel like victories at all.", 1200],
  ],
};
