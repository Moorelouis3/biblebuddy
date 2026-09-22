import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the gospel: the cross, the empty tomb, and a fire on the
 * beach where Jesus restores Peter with the same number of questions Peter
 * used to deny him. Seven blocks, matching Day 303 through Day 307.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 308,
  title: "Finished Work and Restored Disciples",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 308. Yesterday ended with Pilate asking what truth even is.", 800],
    ["Today he gets his answer, in a body, on a cross.", 800],
    ["Jesus is scourged, mocked, crucified, and buried by two men who were too afraid to stand with him while he was alive.", 850],
    ["Then a woman comes to grieve at a grave, early, while it is still dark, and finds it open.", 850],
    ["By the end of today he is standing on a beach, cooking breakfast, asking Peter the same question three times.", 900],
    ["We are in John 19, 20, and 21. The cross, the empty tomb, and a fire on the shore.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has him scourged, and the soldiers press a crown of thorns onto his head, dress him in a purple robe, and mock him. Hail, King of the Jews. Then they hit him for it. Pilate brings him out and says, Behold the man, as if the beating itself were the verdict.",
      "The real charge finally comes out. We have a law, and by our law he ought to die, because he made himself the Son of God. This was never really about Rome. It was about who he claimed to be.",
      "Pilate asks where he is from, and gets no answer, then threatens him with the power to crucify or release him. Jesus tells him, Thou couldest have no power at all against me, except it were given thee from above: therefore he that delivered me unto thee hath the greater sin. Even Pilate's authority is on loan.",
      "The crowd finds Pilate's pressure point. If thou let this man go, thou art not Caesar's friend. And the chief priests, guardians of Israel's covenant, say the one sentence that gives it all away. We have no king but Caesar.",
    ]),
    g(19, 17, 27, [
      "Jesus carries his own cross out to Golgotha and is crucified between two others, one on either side, exactly where the guiltiest man in any execution is placed.",
      "Pilate writes a title and nails it above him in Hebrew, Greek, and Latin. Jesus of Nazareth, the King of the Jews. When the chief priests ask him to change it, he refuses. What I have written I have written. A man trying to wash his hands ends up leaving the truest headline of the day.",
      "The soldiers divide his garments, but his coat is seamless, woven from the top throughout, so they cast lots for it instead of tearing it, that the scripture might be fulfilled. The exact fabric was written down before it happened.",
      "His mother is standing at the cross with Mary Magdalene, and in the middle of dying, Jesus is still taking care of family. Woman, behold thy son. Behold thy mother. From that hour, John takes her into his own home.",
    ]),
    g(19, 28, 42, [
      "Knowing all things were now accomplished, Jesus says, I thirst, and is given vinegar on a sponge. Then, It is finished. Not a whisper of defeat. That was the word for a bill stamped paid in full.",
      "The soldiers break the legs of the two men crucified with him to hasten death, but Jesus is already dead, so they leave his legs untouched. A bone of him shall not be broken. Nobody planned that. It was written first.",
      "A soldier pierces his side instead, and blood and water come out, and the one who saw it wrote it down so that ye might believe. This is testimony, not legend. Someone stood there and watched it happen.",
      "Joseph of Arimathaea, a secret disciple, and Nicodemus, who once came to Jesus only at night, are the ones who bury him. A hundred pounds of spices, out in the open, in daylight, after there was nothing left to gain from it.",
    ]),
    g(20, 1, 18, [
      "Mary Magdalene comes to the tomb early, while it is still dark, expecting a body to grieve over, and finds the stone already taken away.",
      "Peter and John run. John outruns him but stops at the entrance; Peter goes straight in and sees the linen lying there, and the napkin that had been on his head not lying with the linen, but wrapped together in a place by itself. That is not what a grave robbery looks like. That is someone folding up after they were finished.",
      "Mary stays outside weeping, and looks right past two angels and then right past Jesus himself, supposing him to be the gardener. Everything turns on one word. Jesus says, Mary. And she knows.",
      "He tells her, Touch me not, for I am not yet ascended to my Father, and sends her to the disciples instead. The first witness of the resurrection, sent to the apostles themselves, is a woman he once delivered from seven demons.",
    ]),
    g(20, 19, 31, [
      "That evening, with the doors shut for fear of the Jews, Jesus stands among them anyway. Peace be unto you. No rebuke for the men who scattered on him days earlier. He shows them his hands and his side before he says anything else. The proof is not a story. It is scars.",
      "He breathes on them and says, Receive ye the Holy Ghost, and hands them authority to carry his forgiveness into the world he is sending them into, just as the Father sent him.",
      "Thomas was not there, and refuses to believe without touching the wounds himself. Eight days later Jesus comes back for him specifically, holds out his hands, and says, be not faithless, but believing. Thomas answers, My Lord and my God. The highest confession in the whole book comes from the one who doubted hardest.",
      "Blessed are they that have not seen, and yet have believed. That line was not written for the eleven men in that room. It was written for you.",
    ]),
    g(21, 1, 14, [
      "Peter goes back to what he knows. I go a fishing. The others go with him, and they work all night and catch nothing.",
      "At dawn a man on the shore, unrecognized, tells them to cast the net on the right side, and it fills so full they cannot haul it in. John says it first: It is the Lord. Peter cannot wait for the boat. He puts on his coat and jumps straight into the water.",
      "When they reach the shore there is already a fire of coals, with fish and bread on it, before they have even brought in their own catch. The provision does not wait on their effort.",
      "They land a hundred and fifty-three large fish, and the net does not tear. Someone counted, because it mattered to them that the number was exact.",
    ]),
    g(21, 15, 25, [
      "After breakfast, Jesus asks Peter three times, lovest thou me, matching the three times Peter denied him by that same fire's light a few nights earlier. This is not a public shaming. It is a private restoration, counted out exactly.",
      "Each answer gets the same job back. Feed my lambs. Feed my sheep. Feed my sheep. Peter is grieved by the third question, but what he is handed is not another test. It is other people to take care of.",
      "Jesus tells him plainly how he will die, and then says only two words. Follow me. Peter gets his future and his assignment in the same breath.",
      "Peter immediately points at John and asks, what shall this man do? Jesus shuts it down at once. What is that to thee? follow thou me. Whatever your calling costs you, it is not measured against anyone else's.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A cross, an empty tomb, and a fire on a beach.", 700],
    ["It is finished was never a man giving up. It was a debt called paid in full.", 800],
    ["Joseph and Nicodemus hid what they believed while Jesus was alive, and buried him in the open once he was dead.", 800],
    ["Mary Magdalene walked right past two angels and the risen Jesus, until he said one word. Her name.", 850],
    ["Thomas needed to touch the wounds, and Jesus let him. My Lord and my God came from the one who doubted hardest.", 850],
    ["And Peter got his old job back with the same number of questions he used to deny him, followed by two words. Follow me.", 850],
    ["Tomorrow, Acts 1 through 3. The Spirit falls, and a small group of frightened people stops hiding.", 850],
    ["For now, carry Peter's answer.", 800],
    ["Lord, thou knowest that I love thee.", 1200],
  ],
};
