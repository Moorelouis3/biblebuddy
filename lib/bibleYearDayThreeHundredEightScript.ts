import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the gospel: the cross, the empty tomb, a locked room
 * where Thomas finally believes, and a breakfast on the beach where Jesus
 * asks Peter the same question three times to undo the three denials. Seven
 * blocks, matching Day 307.
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
    ["Day 308. Yesterday ended with a governor asking what truth is.", 750],
    ["Today he finds out. Whipped, mocked, and handed over by a crowd that would rather free a robber than a king.", 850],
    ["Then a cross, a tomb, and a door locked out of fear that opens anyway.", 800],
    ["And by a charcoal fire on a beach, Jesus asks the man who denied him three times the same question, three times.", 900],
    ["We are in John 19, 20, and 21. Death, an empty grave, and a friendship put back together.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has Jesus scourged, and the soldiers press a crown of thorns onto his head and dress him in a purple robe to mock him as a king. Then Pilate brings him out and says, Behold the man. It is meant as pity. It reads as prophecy.",
      "The chief priests shout for a cross. Pilate says he finds no fault in him, three separate times, and hands him over anyway. Innocence established and ignored in the same breath.",
      "Jesus stands silent under questioning until Pilate asks about power. Thou couldest have no power at all against me, except it were given thee from above. Even Pilate's authority is on loan.",
      "Pilate offers one more way out. Shall I crucify your King? The chief priests answer, We have no king but Caesar. The people who have waited generations for a king just traded him for Rome.",
    ]),
    g(19, 17, 30, [
      "Jesus carries his own cross to Golgotha, the place of a skull, and they crucify him between two others. Pilate writes a sign over his head in three languages: Jesus of Nazareth, the King of the Jews. Even the death warrant tells the truth.",
      "Soldiers gamble for his coat instead of tearing it, fulfilling a psalm they've never read. Death is business as usual for the men doing the killing.",
      "From the cross Jesus looks at his mother and the disciple he loved and gives them to each other. Woman, behold thy son. Behold thy mother. He is dying, and he is still taking care of people.",
      "Then he says, I thirst, tastes the vinegar, and says, It is finished. Not I am finished. The work is. And he bows his head and gives up the ghost on his own terms, not the soldiers'.",
    ]),
    g(19, 31, 42, [
      "To make sure he is dead, a soldier pierces his side with a spear, and blood and water come out. John insists he saw this himself, because it matters that this really happened.",
      "It happens exactly as two old scriptures said it would. A bone of him shall not be broken. They shall look on him whom they pierced. Nothing here is improvised.",
      "Joseph of Arimathaea, who had followed Jesus secretly out of fear, finally acts in the open and asks Pilate for the body. Courage shows up late, but it shows up.",
      "Nicodemus comes too, the man who once visited Jesus only by night, now carrying a hundred pounds of spices in broad daylight. They lay him in a new tomb, in a garden, because there is no time left before the sabbath.",
    ]),
    g(20, 1, 18, [
      "Mary Magdalene comes to the tomb while it is still dark and finds the stone rolled away. She runs and tells Peter and John, They have taken away the Lord, and we know not where they have laid him. Her first thought is theft, not resurrection.",
      "Peter and John race there. John looks in and believes. Peter goes all the way in and sees the linen cloths lying there, the graveclothes left behind like something had simply stepped out of them.",
      "The men go home. Mary stays, weeping, and turns to find a man she assumes is the gardener. Then he says one word. Mary. And she knows him by name before she knows anything else.",
      "Jesus tells her not to cling to him, but to go tell the brethren he is ascending to his Father and their Father, his God and their God. The first sermon of the resurrection is preached by a woman, to men who won't believe her yet.",
    ]),
    g(20, 19, 31, [
      "That evening the disciples are behind locked doors, afraid of the same people who killed Jesus. He comes and stands in the middle of the room anyway. Peace be unto you. Locked doors are not a problem for him.",
      "He shows them his hands and his side, breathes on them, and says, Receive ye the Holy Ghost. The same breath that formed Adam is now filling frightened men with courage.",
      "Thomas was not there, and refuses to believe secondhand. Except I shall see in his hands the print of the nails, I will not believe. A week later Jesus comes back just for him and says, Reach hither thy finger.",
      "Thomas doesn't need to touch anything. He just says, My Lord and my God. And Jesus tells him the blessing is for everyone who never gets that chance. Blessed are they that have not seen, and yet have believed.",
    ]),
    g(21, 1, 14, [
      "Some of the disciples go back to fishing, and catch nothing all night. It's the same story as the first time Jesus called them, and it's not an accident.",
      "At dawn a man on the shore tells them to cast the net on the other side, and it fills so full they can't haul it in. John recognizes him first. It is the Lord. Peter doesn't wait for the boat. He jumps in the water.",
      "On the beach there is already a fire burning, with fish and bread laid on it, before they bring in a single one of theirs. Jesus has been providing before they even show up.",
      "He says, Come and dine, and no one dares ask who he is. They already know. This is the third time he has shown himself since he rose, and it looks like breakfast with friends.",
    ]),
    g(21, 15, 25, [
      "When they finish eating, Jesus asks Peter, Simon, son of Jonas, lovest thou me more than these? Peter says yes, and Jesus says, Feed my lambs. He asks again. Peter says yes again. Feed my sheep.",
      "The third time, Peter is grieved, because it's the third question and he remembers there were three denials by that same fire's kind of light. Lord, thou knowest all things; thou knowest that I love thee. Feed my sheep.",
      "Jesus doesn't mention the denials once. He just rebuilds Peter's calling, one failure undone by one question at a time, then tells him plainly what following will eventually cost him. Follow me.",
      "John closes his gospel by saying there is more than could ever be written down, that the whole world could not contain the books. The story doesn't end because it ran out of material. It ends because someone had to stop writing.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A cross where the death warrant reads Jesus of Nazareth, the King of the Jews, and turns out to be true.", 800],
    ["A tomb that couldn't hold him, and a woman who knew him the moment he said her name.", 800],
    ["A locked room he walked into anyway, and a doubter who only needed to be asked to look.", 850],
    ["And a fire on a beach where three questions undid three denials, one at a time.", 850],
    ["Tomorrow, Acts 1 through 3. The Spirit falls, the church begins, and a lame man walks for the first time in his life.", 850],
    ["For now, carry what he told Peter.", 750],
    ["Feed my sheep.", 1200],
  ],
};
