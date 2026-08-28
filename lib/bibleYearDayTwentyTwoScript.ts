import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 22, written to the Day 1 standard.
 *
 * Exodus 1-4 opens the book: Israel's oppression under a Pharaoh who never
 * knew Joseph, Moses hidden and then raised in Pharaoh's own house, the
 * burning bush, and a reluctant man sent back to Egypt with his brother
 * as his mouth. Seven blocks across four chapters, weighted toward the
 * bush and the call since that is where the day turns.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 22,
  title: "God Hears Israel's Cry",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 22. We just left Genesis behind, with a coffin still sitting in Egypt.", 750],
    ["Now jump ahead. Four hundred years, give or take. A new king who never heard of Joseph.", 800],
    ["Slavery, a hidden baby, a burning bush, and a man who does not want the job God is giving him.", 850],
    ["This is where Israel goes from a family to a nation, and it starts in chains.", 850],
    ["We are in Exodus 1 through 4.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 22, [
      "A new king comes to power in Egypt, and Genesis says it plainly: one who knew not Joseph. Two hundred years of gratitude, gone in a single generation.",
      "The more the Israelites are afflicted, the more they multiply, until Egypt is afraid of its own slave population. So Pharaoh escalates from hard labor in mortar and brick to killing baby boys at birth.",
      "He tells it to two midwives, Shiphrah and Puah, by name. And they fear God more than they fear a king, and let the boys live.",
      "When Pharaoh asks why, they lie to his face, and God deals well with them for it. Two women with no army stop the first move of a genocide before it starts.",
    ]),
    g(2, 1, 10, [
      "A Levite couple hides their son three months, then does the only thing left. She weaves a basket of bulrushes, waterproofs it, and sets him on the very river Pharaoh ordered him drowned in.",
      "His sister stands watching from a distance. And of all the people who could find that basket, it is Pharaoh's own daughter.",
      "She has compassion, even knowing exactly what the child is. Miriam, right on cue, offers to fetch a nurse. His own mother, paid by Pharaoh's household to raise her own son.",
      "She names him Moses, because I drew him out of the water. The boy marked for death grows up in the house of the king who signed the order.",
    ]),
    g(2, 11, 25, [
      "Grown, Moses goes out to his own people and sees an Egyptian beating a Hebrew. He looks this way and that way, kills the man, and buries him in the sand.",
      "The next day he tries to break up a fight between two Hebrews, and one of them turns on him. Who made thee a prince and a judge over us? The rescue he tried to run gets thrown back in his face.",
      "Pharaoh hears and wants him dead, so Moses runs to Midian, sits down by a well, defends Jethro's daughters from shepherds, and ends up married to one of them, Zipporah.",
      "Years pass. The king of Egypt dies, and the Israelites are still groaning under the same bondage. And God hears their groaning, and remembers his covenant, and looks upon them.",
    ]),
    g(3, 1, 10, [
      "Moses is just tending sheep on the far side of the wilderness when he sees a bush burning that will not burn up. He turns aside to look, and that turning is enough.",
      "God calls his name twice from inside the fire. Moses, Moses. And the first instruction has nothing to do with Egypt. Take off your shoes. This ground is holy.",
      "I am the God of Abraham, the God of Isaac, and the God of Jacob. And Moses hides his face, afraid to look at God, the same God who has been quietly at work this whole time.",
      "I have surely seen the affliction of my people. I have heard their cry. I know their sorrows. Every verb is personal. Then comes the sending. I will send thee unto Pharaoh.",
    ]),
    g(3, 11, 22, [
      "Moses' first response is not courage. Who am I, that I should go? And God does not answer the question. He just says, certainly I will be with thee.",
      "Moses asks what to say when they ask God's name. And the answer is strange on purpose. I AM THAT I AM. Tell them, I AM hath sent me unto you.",
      "Not a name like the other gods have names. Just existence itself, speaking. The God who has always been there is the one sending him.",
      "God tells him exactly how this will go. The elders will listen, Pharaoh will refuse, and it will take a mighty hand to change his mind. Moses is told the ending before the story even starts.",
    ]),
    g(4, 1, 17, [
      "Moses' next objection is that nobody will believe him. So God gives him three signs. A staff that becomes a snake and then a staff again. A hand that turns leprous and then clean.",
      "Then Moses tries one more excuse. I am slow of speech, and of a slow tongue. And God's answer is sharp. Who hath made man's mouth? Have not I, the Lord?",
      "Moses still asks God to send someone else. And the Lord's anger is kindled, but He does not walk away. He gives Moses his brother instead.",
      "Aaron will be his mouth, and Moses will be as God to him. God does not remove the fear. He just puts a brother next to it.",
    ]),
    g(4, 18, 31, [
      "Moses heads back to Egypt with his wife and sons and the staff of God in his hand. And then Scripture drops in one of its strangest verses.",
      "On the way, the Lord meets him and seeks to kill him. Zipporah circumcises their son with a flint stone on the spot, touches Moses with it, and the danger passes. The sign of the covenant could not be skipped, not even for Moses.",
      "Aaron meets him at the mountain of God and kisses him, and Moses tells him everything. The words, the signs, all of it.",
      "They gather the elders of Israel, Aaron speaks the words and does the signs, and the people believe. When they hear the Lord has looked on their affliction, they bow their heads and worship.",
    ]),
  ],
  closing: [
    ["So that is Day 22.", 700],
    ["A new king who forgot Joseph. Two midwives who feared God more than Pharaoh. A baby saved by the very river meant to drown him.", 750],
    ["Then eighty years later, a burning bush, and a shepherd who spends the whole conversation trying to talk his way out of the job.", 800],
    ["Every excuse Moses gives, God answers, and never once by removing the fear. He just gives Moses what he needs to walk into it anyway.", 850],
    ["Notice what actually starts the rescue. Not Moses' courage. Israel's groaning, reaching God, and God remembering a promise made centuries earlier.", 850],
    ["Tomorrow, Exodus 5 through 8. Moses finally stands in front of Pharaoh, and Pharaoh says no.", 850],
    ["For now, hold on to the name God gave him.", 800],
    ["I AM THAT I AM.", 750],
    ["The God who was already there, sending the man who did not feel ready.", 1200],
  ],
};
