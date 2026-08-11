import { BIBLE_YEAR_GENESIS_WEB_VERSES } from "./bibleYearGenesisVerses";
import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import {
  adam,
  god,
  narrator,
  type BibleYearAudioSegment,
  type BibleYearSceneTone,
} from "./bibleYearAudioCast";

/**
 * Day 1 is the reference episode for the whole year. See
 * docs/bible-year-day-1-audio-standard.md for what each part is doing and why.
 *
 * Ported from scripts/generate-bible-year-day-one-audio.ts, with the roles left
 * intact instead of flattened back to narrator.
 */

export function sceneForReference(reference: string): BibleYearSceneTone {
  if (reference === "Genesis 1:1-5") return "light";
  if (reference === "Genesis 1:6-13") return "water";
  if (reference === "Genesis 1:14-25") return "life";
  if (reference === "Genesis 1:26-31") return "humanity";
  if (reference === "Genesis 2:1-3") return "rest";
  if (reference === "Genesis 2:4-9") return "dust";
  if (reference === "Genesis 2:10-17") return "eden";
  return "relationship";
}

export function speakReference(chapter: number, startVerse: number, endVerse: number) {
  if (startVerse === endVerse) return `Genesis ${chapter} verse ${startVerse}.`;
  return `Genesis ${chapter} verses ${startVerse} through ${endVerse}.`;
}

/**
 * Where God or a person speaks, the verse is split so the quoted words land in
 * their own voice. This three-beat shape - "God said." / the words / "And there
 * was light." - is the most distinctive move in the Day 1 standard.
 */
function dayOneVerseSegments(
  chapter: number,
  verseNumber: number,
  scene: BibleYearSceneTone,
): BibleYearAudioSegment[] {
  const verse =
    BIBLE_YEAR_GENESIS_WEB_VERSES[chapter]?.find((item) => item.verse === verseNumber)?.text || "";

  if (chapter === 1) {
    switch (verseNumber) {
      case 3:
        return [narrator(scene, "God said."), god("light", "Let there be light."), narrator("light", "And there was light.")];
      case 6:
        return [narrator(scene, "God said."), god("water", "Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.")];
      case 9:
        return [narrator(scene, "God said."), god("water", "Let the waters under the sky be gathered together to one place, and let the dry land appear."), narrator("water", "And it was so.")];
      case 11:
        return [narrator(scene, "God said."), god("life", "Let the earth yield grass, herbs yielding seeds, and fruit trees bearing fruit after their kind, with their seeds in it, on the earth."), narrator("life", "And it was so.")];
      case 14:
        return [narrator(scene, "God said."), god("light", "Let there be lights in the expanse of the sky to divide the day from the night; and let them be for signs to mark seasons, days, and years.")];
      case 15:
        return [god("light", "And let them be for lights in the expanse of the sky to give light on the earth."), narrator("light", "And it was so.")];
      case 20:
        return [narrator(scene, "God said."), god("life", "Let the waters abound with living creatures, and let birds fly above the earth in the open expanse of the sky.")];
      case 22:
        return [narrator(scene, "God blessed them, saying."), god("life", "Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth.")];
      case 24:
        return [narrator(scene, "God said."), god("life", "Let the earth produce living creatures after their kind, livestock, creeping things, and animals of the earth after their kind."), narrator("life", "And it was so.")];
      case 26:
        return [narrator(scene, "God said."), god("humanity", "Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, over the birds of the sky, over the livestock, over all the earth, and over every creeping thing that creeps on the earth.")];
      case 28:
        return [narrator(scene, "God blessed them. God said to them."), god("humanity", "Be fruitful, multiply, fill the earth, and subdue it. Have dominion over the fish of the sea, over the birds of the sky, and over every living thing that moves on the earth.")];
      case 29:
        return [narrator(scene, "God said."), god("humanity", "Behold, I have given you every herb yielding seed, which is on the surface of all the earth, and every tree, which bears fruit yielding seed. It will be your food.")];
      case 30:
        return [god("humanity", "To every animal of the earth, and to every bird of the sky, and to everything that creeps on the earth, in which there is life, I have given every green herb for food."), narrator("humanity", "And it was so.")];
      default:
        return [narrator(scene, verse)];
    }
  }

  if (chapter === 2) {
    switch (verseNumber) {
      case 16:
        return [narrator(scene, "Yahweh God commanded the man, saying."), god("eden", "You may freely eat of every tree of the garden.")];
      case 17:
        return [god("eden", "But you shall not eat of the tree of the knowledge of good and evil; for in the day that you eat of it, you will surely die.")];
      case 18:
        return [narrator(scene, "Yahweh God said."), god("relationship", "It is not good for the man to be alone. I will make him a helper comparable to him.")];
      case 23:
        return [narrator(scene, "The man said."), adam("relationship", "This is now bone of my bones, and flesh of my flesh. She will be called woman, because she was taken out of Man.")];
      default:
        return [narrator(scene, verse)];
    }
  }

  return [narrator(scene, verse)];
}

const DAY_ONE_TEACHING_BY_REFERENCE: Record<string, string[]> = {
  "Genesis 1:1-5": [
    "Stay here for a second. Before anything exists, God is already there. He is not introduced like a character who walks onto the stage. He simply is.",
    "The earth is formless, empty, covered in darkness, and deep waters. But unfinished does not mean abandoned. God's Spirit is already hovering over the waters. Even before the world has shape, God's presence is near.",
    "Creation begins quietly, with a voice. God does not panic in darkness. He does not fight it. He speaks into it.",
    "Light enters the story before the sun and moon are ever named. Genesis is showing you that light does not ultimately come from created things. Light comes from God.",
    "Maybe you know what it feels like when life seems dark, unfinished, or hard to understand. Genesis starts here to remind you: darkness is not too much for God. Confusion is not stronger than His voice.",
  ],
  "Genesis 1:6-13": [
    "Now the world begins to take shape. Waters are separated. Sky opens. Seas gather. Dry ground appears.",
    "This is not random motion. This is God making room for life. Before He fills the world, He prepares the world.",
    "Then the earth starts to grow. Grass, plants, fruit trees, seeds. Life that can keep producing more life.",
    "Most things God grows start smaller than we expect. A seed is easy to overlook, but inside it is future provision, future fruit, future generations.",
  ],
  "Genesis 1:14-25": [
    "Now the sky fills with lights. Days can be counted. Seasons can be known. Years can be remembered.",
    "To the ancient world, the sun and moon were often treated like gods. Genesis quietly corrects that. They are not gods. They are lights in God's sky, serving the purpose He gives them.",
    "Then the waters move. The sky comes alive. Birds lift into the air. Sea creatures fill the deep. Animals begin moving across the land.",
    "The silence of the empty world is gone now. There is movement, sound, breath, rhythm, and life.",
  ],
  "Genesis 1:26-31": [
    "This is the moment the story has been building toward. Human beings are not accidents. You are not an accident.",
    "Before anyone measures your success, your beauty, your strength, your usefulness, or your past, Genesis says human worth starts with God.",
    "Male and female are both made in God's image. Both carry dignity. Both are blessed. Both are called into purpose.",
    "Dominion does not mean abuse. It means responsibility. Humanity is called to represent God's care inside God's creation.",
    "Before sin breaks anything, the world is blessed, ordered, alive, and full of purpose.",
  ],
  "Genesis 2:1-3": [
    "The story does not end with God rushing to the next thing. It ends with rest.",
    "God rests, not because He is tired, but because the work is complete. Creation has rhythm. Work and rest. Forming and filling. Speaking and delighting.",
    "The first thing called holy in the Bible is not a building. It is not an object. It is a day. Time with God is holy from the beginning.",
    "If your life feels like nonstop striving, Genesis gently pushes back. You were not created to hold everything together. Rest is trust. Rest is worship.",
  ],
  "Genesis 2:4-9": [
    "Now the camera moves closer. Genesis 1 gave us the wide view of creation. Genesis 2 brings us near enough to see dust, breath, garden, and relationship.",
    "God forms the man from the dust of the ground. That is humbling. We are not gods. We are creatures. We are connected to the earth.",
    "But then God breathes into him the breath of life. Humanity is dust touched by God. Fragile, but valuable. Humble, but alive with breath from the Creator.",
    "Then God plants a garden. Before there is a command, there is provision. Before there is a test, there is a home. Eden is beauty, safety, abundance, and peace.",
  ],
  "Genesis 2:10-17": [
    "The garden is full. Rivers flow. Precious materials are named. The world near God is supplied and alive.",
    "Then God gives the man work. Work exists before sin. Meaningful responsibility is part of the good world.",
    "God also gives freedom before restriction. You may freely eat from every tree, except one.",
    "The story is not showing a stingy God. It is showing a generous God with a real boundary. The question is trust.",
    "Will humanity receive life from God, or try to define good and evil apart from Him?",
  ],
  "Genesis 2:18-25": [
    "For the first time, God says something is not good. Not sin. Not rebellion. Aloneness.",
    "The man is surrounded by living creatures, but none of them correspond to him. None can meet him face to face as a true partner.",
    "So God causes a deep sleep to fall over the man, and He forms the woman. When the man sees her, the first human words recorded in Scripture are poetry.",
    "This is wonder. Recognition. Joy.",
    "And the chapter ends with a picture that almost feels hard to imagine now: naked and not ashamed. No hiding. No fear. No pretending. Fully known, fully safe, fully at peace.",
    "Before shame entered the story, there was peace.",
  ],
};

/** Cold open: personal, second person, no branding. */
const DAY_ONE_OPENING: BibleYearAudioSegment[] = [
  narrator("void", "Hey. I am really glad you are here.", 700),
  narrator("void", "Today is Day 1 of our journey through the Bible together.", 650),
  narrator("void", "Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, pain, and shame. The story starts here.", 800),
  narrator("void", "At the beginning.", 1000),
  narrator("void", "There was God.", 1150),
  narrator("light", "Today, we are stepping into the creation of the world. Not just to learn facts, but to walk through the opening scene of Scripture together.", 650),
  narrator("void", "So take a breath. Let the noise settle for a moment. We are going back to the first page of the Bible.", 900),
];

/** Close: the final three lines descend in length. Do not end on a long sentence. */
const DAY_ONE_CLOSING: BibleYearAudioSegment[] = [
  narrator("rest", "So this is where the Bible begins.", 700),
  narrator("rest", "Not with human achievement. Not with human failure. Not with a problem we have to solve.", 700),
  narrator("rest", "It begins with God creating, speaking, ordering, filling, blessing, resting, forming, breathing, planting, providing, and making room for relationship.", 800),
  narrator("rest", "This matters because the rest of the Bible is going to show us what happens when that good world is broken, and how far God will go to restore what was lost.", 700),
  narrator("rest", "But before we talk about the fall, before shame, hiding, violence, exile, covenant, sacrifice, kings, prophets, and redemption, you need to see the design.", 800),
  narrator("rest", "You were made by God. You were made in God's image. You were made for life with Him.", 850),
  narrator("light", "And if you carry nothing else from Day 1, carry this: God is not afraid of darkness, emptiness, or disorder. He knows how to speak light into places that feel impossible.", 900),
  narrator("rest", "Tomorrow, we step into Genesis 3 and 4. The peace of Eden will be tested. Trust will break. Shame will enter. But even there, God will not disappear.", 850),
  narrator("rest", "For now, rest in the beginning.", 800),
  narrator("rest", "The world was made good.", 750),
  narrator("rest", "And you were made on purpose.", 1200),
];

export function buildDayOneSegments(lesson: BibleYearDailyLesson): BibleYearAudioSegment[] {
  const segments: BibleYearAudioSegment[] = [...DAY_ONE_OPENING];

  for (const section of lesson.sections) {
    const block = section.verseBlock;
    const scene = sceneForReference(block.reference);

    segments.push(narrator(scene, speakReference(block.chapter, block.startVerse, block.endVerse), 700));

    for (let verse = block.startVerse; verse <= block.endVerse; verse += 1) {
      segments.push(...dayOneVerseSegments(block.chapter, verse, scene));
    }

    for (const line of DAY_ONE_TEACHING_BY_REFERENCE[block.reference] || section.teaching) {
      segments.push(narrator(scene, line, 560));
    }
  }

  segments.push(...DAY_ONE_CLOSING);
  return segments;
}
