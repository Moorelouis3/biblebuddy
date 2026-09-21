import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the Gospel: the cross, the empty tomb, and a fire on the
 * beach where Jesus asks Peter the same question three times. Seven blocks,
 * matching Day 307.
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
    ["Day 308. Yesterday ended with Pilate asking what truth is.", 750],
    ["Today he hands Jesus over anyway, a cross gets carried, and a tomb gets sealed.", 800],
    ["Then the tomb doesn't hold. And a man who denied Jesus three times gets asked to say he loves him three times, on a beach, over a fire.", 900],
    ["We are in John 19, 20, and 21. The last chapters of this Gospel.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has Jesus scourged, and the soldiers press a crown of thorns onto his head and dress him in a purple robe as a joke. Then Pilate brings him out and says, Behold the man, still looking for a way to let him go.",
      "The chief priests answer, We have a law, and by our law he ought to die, because he made himself the Son of God. That's the actual charge. Not treason. Blasphemy, dressed up as a favor to Rome.",
      "Jesus tells Pilate, Thou couldest have no power at all against me, except it were given thee from above. He isn't a victim of Pilate's authority. He's standing inside a plan bigger than the room.",
      "The crowd shouts, We have no king but Caesar, and Pilate delivers him to be crucified. People who hated Rome just swore loyalty to it, to get rid of one man.",
    ]),
    g(19, 17, 30, [
      "Jesus carries his own cross out to Golgotha, the place of a skull, and they crucify him between two others, with a sign over his head reading Jesus of Nazareth, the King of the Jews. Pilate refuses to change the wording. What I have written I have written.",
      "The soldiers cast lots for his coat instead of tearing it, fulfilling a psalm they never read. Men gambling for cloth at the foot of the cross, with no idea they're inside Scripture.",
      "Jesus looks at his mother and the disciple he loved and says, Woman, behold thy son, then, Behold thy mother. Dying, and still making sure she has somewhere to go.",
      "He says, I thirst, then, It is finished, and gives up the ghost. Not I am finished. The work is. He said exactly that in his prayer the night before, and now it's true.",
    ]),
    g(19, 31, 42, [
      "Soldiers break the legs of the two men crucified beside Jesus, to speed up their deaths before the sabbath. When they get to Jesus, he's already dead, so they don't break his.",
      "Instead a soldier pierces his side with a spear, and blood and water come out. John stops the narrative to tell you he saw it himself. That ye might believe.",
      "Not one bone of him was broken, exactly like the old law said of the Passover lamb. They shall look on him whom they pierced, exactly like the old prophecy said too.",
      "Joseph of Arimathaea, a secret disciple, and Nicodemus, the man who once came to Jesus by night, are the ones who bury him. In the end, the quiet believers are the ones who show up.",
    ]),
    g(20, 1, 18, [
      "Mary Magdalene comes to the tomb while it's still dark and finds the stone rolled away. She runs and tells Peter and John, They have taken away the Lord, and we know not where they have laid him.",
      "The two men run. John outruns Peter but stops at the entrance. Peter goes straight in and sees the linen clothes lying there, and the napkin folded up by itself. Grave robbers don't fold anything.",
      "Mary stays outside weeping, sees two angels, then turns and sees Jesus himself, and mistakes him for the gardener. Jesus saith unto her, Mary. One word, her own name, and she knows him instantly.",
      "He tells her not to cling to him, but to go tell the others, I ascend unto my Father, and your Father, and to my God, and your God. The first person sent to preach the resurrection is a woman who came looking for a corpse.",
    ]),
    g(20, 19, 31, [
      "That evening the disciples are locked in a room for fear of the Jews, and Jesus simply stands in the midst of them and says, Peace be unto you. Locked doors are not an obstacle to him.",
      "He shows them his hands and his side, breathes on them, and says, Receive ye the Holy Ghost. The same breath that formed Adam is now filling ordinary, frightened men.",
      "Thomas wasn't there and refuses to believe secondhand. Except I shall see in his hands the print of the nails, I will not believe. A week later Jesus meets that demand exactly, nail prints and all.",
      "Thomas answers, My Lord and my God. Jesus tells him, blessed are they that have not seen, and yet have believed. That's not Thomas anymore. That's you, right now, reading this same page he wrote.",
    ]),
    g(21, 1, 14, [
      "Peter goes back to fishing, and six others go with him, and they catch nothing all night. Old habits, and an empty net, after everything they've just seen.",
      "At daybreak a stranger on the shore tells them to cast the net on the right side, and it fills so full they can't haul it in. John recognizes him first. It is the Lord. Peter doesn't wait for the boat. He jumps in the water.",
      "On the beach there's already a fire of coals with fish and bread on it, prepared before they ever landed. He didn't need their catch. He wanted their company.",
      "Jesus says, Come and dine, and none of them dares ask who he is, because by now they all know. The miracle isn't proving anything anymore. It's just breakfast with a friend who died and is somehow serving them fish.",
    ]),
    g(21, 15, 25, [
      "Jesus asks Peter, three separate times, Lovest thou me? Peter is grieved by the third one, because it lines up exactly with the three times he denied him by that other fire. This isn't cruelty. It's a repair, one denial undone at a time.",
      "Each answer gets the same job attached to it. Feed my lambs. Feed my sheep. Feed my sheep. Peter isn't handed a apology. He's handed work.",
      "Jesus tells him plainly how he'll die one day, stretching out his hands for someone else to lead him where he wouldn't choose to go, and then says only two words. Follow me.",
      "The last line of the book is almost a shrug. If everything Jesus did were written down, the world itself couldn't hold the books. This whole Gospel is one honest, incomplete attempt at telling you who he is.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A cross carried by the man it was built for, and a sign Pilate refused to take down even when they asked him to.", 750],
    ["It is finished, spoken before he died, not after. The work was already done in his mind.", 800],
    ["An empty tomb, folded grave clothes, and a woman who heard her own name and knew exactly who was calling it.", 800],
    ["Thomas got his proof. You got a blessing for believing without it.", 800],
    ["And Peter, three denials undone by three questions, handed work instead of shame.", 850],
    ["That's the whole Gospel of John. Tomorrow we leave it behind and start Acts 1 through 3. The Spirit falls, and the church that scattered on this night starts preaching in the street.", 900],
    ["For now, carry what he said to Peter.", 800],
    ["Follow me.", 1200],
  ],
};
