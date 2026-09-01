import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 73, written to the Day 1 standard.
 *
 * 1 Samuel 19-22 is the chapter where David stops being a rising star and
 * becomes a fugitive: Jonathan and Michal both choose him over Saul, he lies
 * his way to bread and a sword at Nob, fakes madness in Gath, gathers the
 * desperate at Adullam, and Saul answers all of it by slaughtering the
 * priests of Nob. Seven blocks across four chapters, matching Day 72's
 * heavier shape.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 73,
  title: "David Flees From Saul",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 73. Yesterday ended with Saul throwing a javelin at David in his own house.", 750],
    ["Today David actually runs, and doesn't really stop for the rest of the book.", 800],
    ["A best friend's covenant, a priest's bread, a king who fakes madness to survive, and a massacre David will carry the rest of his life.", 850],
    ["We are in 1 Samuel 19 through 22.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(19, 1, 10, [
      "Saul says it plainly now. Kill David. Not a mood anymore, an order to his own son and all his servants.",
      "Jonathan does something almost nobody in this story dares. He tells his father the truth to his face, and Saul actually listens. As the Lord liveth, he shall not be slain. For one afternoon, David is safe.",
      "Then David goes back out to war and wins again. And that success is the one thing Saul can never forgive.",
      "So the evil spirit comes back, and Saul throws the same javelin at the same man playing music for him. Peace with Saul only ever lasts as long as David is losing.",
    ]),
    sam(19, 11, 24, [
      "Michal, Saul's own daughter, chooses her husband over her father. She lets David down through a window in the night and tells him plainly. If you don't run tonight, you're dead by morning.",
      "She buys him hours with a household idol dressed up in the bed, goat hair for hair. Small, strange detail. Also the last time this family pretends to be normal.",
      "David runs to Samuel at Ramah. Three separate squads of Saul's men come to arrest him, and every one of them starts prophesying instead, caught up by the Spirit of God before they can lay a hand on him.",
      "So Saul goes himself, furious, and the same thing happens to him. He strips off his clothes and prophesies on the ground a night and a day. God doesn't need David to fight for his life here. He just needs Saul unable to finish the sentence.",
    ]),
    sam(20, 1, 23, [
      "David asks Jonathan the plainest question in the chapter. What have I done? Even now, on the run, he still doesn't fully believe his best friend's father wants him dead.",
      "Jonathan doesn't believe it either, not yet. My father tells me everything. So they build a test. An ordinary feast, an empty seat, and Jonathan reading his father's face for both of them.",
      "David asks for something bigger than protection. Show me the kindness of the Lord, not just while I'm alive, but to my house forever, even after my enemies are gone. He's already planning for a future where he wins and Jonathan's family still matters to him.",
      "Jonathan swears it again, because he loved him as he loved his own soul. Two men, one about to lose everything his father built, making a promise neither of them can enforce except by love.",
    ]),
    sam(20, 24, 42, [
      "David's seat sits empty two days running before Saul finally asks the question out loud. Where's the son of Jesse?",
      "Jonathan gives the cover story they planned, and Saul stops holding back. He curses Jonathan's own mother to his face and says it plainly. As long as David lives, you will never have a kingdom.",
      "Then Saul throws the javelin at his own son. Not at David. At Jonathan, for defending him. That's the moment even Jonathan stops hoping this was just a mood.",
      "In the field, the arrows fall beyond the boy, and David knows. They fall on their faces, they weep until David can't hold it anymore, and Jonathan sends him off with a promise bigger than either of their lifetimes. The Lord be between me and thee, and between my seed and thy seed, forever.",
    ]),
    sam(21, 1, 9, [
      "David shows up at Nob alone, and the first thing he does is lie. He tells Ahimelech he's on secret business for the king. He isn't. He's a fugitive with nothing, and lying is the only weapon he's got left.",
      "He asks for bread and there's nothing but the shewbread, the loaves set apart for God. Ahimelech gives it to him anyway. Hungry and desperate wins out over the letter of the law that day.",
      "He asks for a weapon, and there's exactly one in the whole town. The sword of Goliath, wrapped behind the ephod. There is none like that, David says. Give it to me. The giant's own sword becomes his getaway weapon.",
      "And Scripture drops one name into the middle of this without comment. Doeg the Edomite, Saul's chief herdsman, was there that day, detained before the Lord. Nothing happens yet. Just remember his name.",
    ]),
    sam(21, 10, 22, [
      "David runs straight into the last place he should. Gath, Goliath's hometown. And the first people who recognize him are singing his own victory song back at him. He's not safe anywhere with his own name attached to him.",
      "So he does the only thing left. He acts insane. Claws at the doors, lets his spittle fall on his beard, and it works. Achish waves him off as a lunatic instead of a threat. The giant killer survives by looking like nothing at all.",
      "From there he hides in a cave at Adullam, and everyone with nowhere else to go finds him. Everyone in distress, everyone in debt, everyone discontented. About four hundred men. David didn't set out to lead an army. He became a captain because broken people kept showing up.",
      "He gets his parents to safety in Moab, and a prophet named Gad tells him to stop hiding in the stronghold and go back into Judah. Even on the run, God keeps sending him someone to tell him where to go next.",
    ]),
    sam(22, 6, 23, [
      "Saul sits under a tree with his spear still in his hand and turns his paranoia on his own tribe. Will the son of Jesse give you fields and vineyards? Not one of you is sorry for me. A king demanding loyalty by guilt because he can't demand it by love anymore.",
      "Doeg the Edomite finally speaks. He tells Saul exactly what he saw at Nob. The bread, the sword, Ahimelech asking God on David's behalf. The name Scripture dropped without comment two chapters ago finally lands.",
      "Saul summons Ahimelech, who tells the plain truth. He didn't know David was a fugitive. It doesn't matter. Saul orders his own guard to kill the priests of the Lord, and they refuse. So Doeg does it alone. Eighty-five priests in linen ephods, then the whole town, men, women, children, even the animals.",
      "One son of Ahimelech, Abiathar, gets out and runs to David. And David doesn't excuse himself. I knew Doeg was there that day. I have caused the death of your father's whole house. Stay with me. That's the weight David starts carrying today, and he never fully sets it down.",
    ]),
  ],
  closing: [
    ["So that is Day 73.", 700],
    ["Jonathan chooses David over his father's throne. Michal chooses David over her father's house. And Saul chooses his own fear over everyone.", 800],
    ["David lies to a priest to survive, and the lie helps cost eighty-five priests and an entire town their lives.", 850],
    ["He didn't hold the javelin. He didn't give the order. And he still says it out loud. I have occasioned the death of all thy father's house.", 850],
    ["That's not the David of the songs yet. That's a man learning what it costs other people when he runs.", 800],
    ["Doeg the Edomite went from a name dropped in passing to the reason a whole town is gone.", 800],
    ["Tomorrow, 1 Samuel 23 through 26. Saul hunts David in the wilderness, and twice David has a blade near Saul and doesn't use it.", 900],
    ["For now, sit with what David couldn't undo.", 800],
    ["I have occasioned the death of all thy father's house.", 900],
    ["Abide with me. Fear not.", 1200],
  ],
};
