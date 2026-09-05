import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 120, written to the Day 1 standard.
 *
 * Job compares his life to a hired servant with no quitting time, then
 * Bildad answers with a string of nature illustrations built on the belief
 * that suffering always proves guilt. Job's reply goes further than
 * anything he has said yet - God destroys the blameless and the wicked
 * alike - and in the middle of that despair names exactly what is
 * missing: no daysman, no mediator, standing between him and God. Seven
 * blocks across four chapters.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 120,
  title: "Job Pleads With God",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 120.", 700],
    ["Job keeps talking. And it gets rawer, not calmer.", 750],
    ["He compares his life to a hired hand watching for quitting time, and to a soldier stuck in a war he never chose.", 800],
    ["Then his second friend, Bildad, answers him with nature illustrations and a hard line about Job's own dead children.", 800],
    ["And right in the middle of Job's reply, he says something the rest of the Bible has been waiting for.", 850],
    ["We are in Job 7 through 10. A weary servant, a spider's web, a missing mediator, and a potter's hands.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 7, 1, 21, [
      "Job compares his life to a hired servant watching the shadows for quitting time, except his shift never ends. His body is part of the suffering too. His skin keeps breaking open and scabbing, and he says plainly he has become repulsive even to himself.",
      "He does not expect to get better. He expects to die soon, and says so directly. The eyes watching him now, including God's, will soon be looking at nothing at all.",
      "Then he decides he will not stay quiet. I will speak in the anguish of my spirit, he says, and he asks bluntly why God needs to guard him this closely, and why even his dreams have turned into terror instead of rest.",
      "He ends almost begging. If I have sinned, why not just forgive me and be done with it? Soon I will be asleep in the dust, and you will come looking for me, and I will not be there.",
    ]),
    g("job", 8, 1, 10, [
      "Bildad, the second friend, speaks next, and he opens by comparing Job's own words to wind. Noise, no substance. Then he says something that should stop you cold. If your children sinned, that is why they died.",
      "Job's ten children died together under a collapsed house back in chapter one. Bildad turns their deaths into an accusation, with nothing to back it up.",
      "He tells Job to seek God quickly, and promises that if Job is truly upright, his home will thrive again, better than before.",
      "Then he appeals to the wisdom of the ancestors. Enquire of the former age, he says, we are only of yesterday and know nothing. He is asking Job to trust an old formula over his own real experience.",
    ]),
    g("job", 8, 11, 22, [
      "Bildad builds a string of nature pictures. A marsh reed dies fast the moment its water is gone. A godless man's hope is a spider's web, holding nothing heavier than a fly.",
      "He pictures a man leaning his full weight on a house that gives way, and a plant that looks green and thriving until you notice its roots are only wrapped around a pile of loose stones.",
      "Every image says the same thing. What looks solid can be hollow underneath. It is not wrong as an observation. It is wrong as an explanation for Job.",
      "Bildad closes with a real promise. God will not cast away a blameless man. True enough. He just cannot imagine that Job might already be one.",
    ]),
    g("job", 9, 1, 20, [
      "Job answers, and he starts by agreeing with Bildad's basic point. God does deal justly. That was never his real question. His question is harder. How could any human actually win a case against God?",
      "He lists what God can do without lifting a hand twice. Move mountains. Shake the earth off its foundations. Tell the sun not to rise, and it does not. Make Arcturus, Orion, and the Pleiades, and name them one by one.",
      "Then it turns personal. God moves right past him, Job says, and he cannot even see it happening. God takes away, and no one can stop His hand.",
      "Job says something remarkable here. Even if I were righteous, I would not answer him. Being innocent and being able to argue your case are not the same thing, not against this much power.",
    ]),
    g("job", 9, 21, 35, [
      "Job says the hardest sentence he has spoken yet. God destroys the blameless and the wicked alike. That is not despair talking. That is a man looking at the evidence and refusing to force it into Bildad's tidy formula.",
      "His days are running out faster than a courier, faster than a ship under full sail, faster than an eagle diving on its prey. And even trying to wash himself clean, he says God would still throw him in the mud.",
      "Then, right in the middle of all that despair, one line changes everything. There is no daysman between us, no one to lay his hand on us both.",
      "A daysman was a mediator, someone who could stand between two unequal sides. Job says none exists. He is naming exactly what is missing. Centuries later, that is exactly the gap Jesus stands in.",
    ]),
    g("job", 10, 1, 12, [
      "Job asks God directly for one thing. Show me why you are doing this. Not a pardon. An actual reason. Then he reminds God, almost tenderly, your own hands made me.",
      "He describes it like a potter shaping clay, like milk poured out and set into cheese, bones and sinews built up like a frame, skin stretched over the top. That was care, not accident.",
      "And then the ache underneath the whole chapter. You made me this carefully, and now you are the one tearing me down.",
      "He is not accusing God of being distant. That would almost be easier. He is accusing God of being close enough to have built him, and close enough to be the one undoing him.",
    ]),
    g("job", 10, 13, 22, [
      "Job believes God has been holding a hidden reason for all of this since the very beginning, a plan kept private and never explained to him.",
      "Whichever way he turns, he feels trapped. Guilty, and he expects only judgment. Innocent, and he still cannot lift his head. Either way, the shame does not lift.",
      "He compares himself to prey hunted by a lion, worn down by wave after wave of trouble with no pause between them.",
      "He closes by asking why he was ever born at all, and then for one small mercy. Not rescue. Just a pause, a little room to breathe, before the end comes.",
    ]),
  ],
  closing: [
    ["So that is Day 120.", 700],
    ["Job compared his life to a servant with no quitting time, and Bildad answered him with pictures of reeds and spider webs and empty rooms.", 800],
    ["Job's own reply went further than anything he has said so far. God destroys the blameless and the wicked alike, he said. That is not a man losing his faith. That is a man refusing to lie about what he sees.", 850],
    ["And then, in the middle of his worst chapter yet, he said the thing this whole book has been building toward. There is no daysman between us. No one to put a hand on us both.", 850],
    ["Job did not know it, but he had just described exactly what he needed. Someone standing on both sides at once.", 850],
    ["The chapter ends with him asking God for one specific thing, and it is not even to be spared. Just to be told why.", 800],
    ["Tomorrow, Job 11 through 14. A third friend speaks, and Job answers with something closer to hope than anything he has said yet.", 850],
    ["For now, hold on to the missing mediator.", 800],
    ["Job named the exact shape of what he needed.", 750],
    ["He just did not know yet that it was coming.", 1200],
  ],
};
