import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 24, written to the Day 1 standard.
 *
 * Exodus 9-12: the last five plagues, the Passover instituted before Israel
 * is even free, the midnight death of the firstborn, and the hurried
 * departure from Egypt. The heaviest reading so far - seven blocks, one or
 * two per chapter, no cross-chapter spans, teaching kept tight so the
 * runtime does not run away.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 24,
  title: "Passover",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 24. This is the day Egypt breaks.", 750],
    ["Five more plagues fall, each one worse than the last, and then the final one arrives at midnight.", 800],
    ["In the middle of it, God gives Israel something to do with their hands. Not just wait. Cook a meal, and put blood on a door.", 850],
    ["That meal is still being eaten today, thousands of years later.", 900],
    ["We are in Exodus 9 through 12.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(9, 1, 12, [
      "Plague five: livestock. Every animal in Egypt's fields dies. Horses, donkeys, camels, cattle, sheep. Not one animal belonging to Israel dies. God names the difference out loud before it even happens.",
      "Pharaoh sends men to check. Confirmed: not a single Israelite animal is dead. He hardens his heart anyway.",
      "Plague six: boils. Moses throws soot from a furnace into the air, and it becomes sores breaking out on people and animals across Egypt.",
      "This time even the magicians cannot stand in front of Moses. The men who counterfeited two plagues are now covered in the third one.",
    ]),
    g(9, 13, 35, [
      "God tells Moses to warn Pharaoh first, and says why He is even bothering. That you may know there is none like me in all the earth.",
      "Hail comes, mixed with fire, worse than anything Egypt has seen since it became a nation. It flattens crops, trees, anyone caught outside.",
      "Some Egyptians believe the warning and get their people and animals under cover. Some do not, and lose them.",
      "Pharaoh finally says the sentence Egypt has been avoiding. I have sinned. The LORD is righteous, and I and my people are wicked. Then the hail stops, and he takes the words back.",
    ]),
    g(10, 1, 20, [
      "Before locusts even arrive, Pharaoh's own officials turn on him. How long will this man be a snare to us? Do you not yet know Egypt is ruined?",
      "Pharaoh calls Moses back and almost lets go, then asks who exactly is going. Moses says everyone. Sons, daughters, flocks, all of it, because it is a feast to the LORD.",
      "Pharaoh offers half a deal, the men only, and drives Moses and Aaron out. So the locusts come, cover the land, and eat every green thing the hail left standing.",
      "Pharaoh breaks fastest yet. I have sinned against the LORD your God and against you. Forgive my sin only this once. The locusts lift. His heart does not.",
    ]),
    g(10, 21, 29, [
      "Darkness falls next, and Exodus goes out of its way to describe it. Darkness which may be felt. Three days where no one can even see well enough to stand up.",
      "In Goshen, where Israel lives, there is light the entire time. The same sky, split down the middle.",
      "Pharaoh's offer keeps shrinking along with his patience. Go, but leave your flocks behind. Moses refuses. We do not yet know what we will need for worship until we get there.",
      "Pharaoh's last words in the scene are a threat. See my face no more. The day you see me, you die. Moses' answer is just as final. You will not see my face again.",
    ]),
    g(11, 1, 10, [
      "God tells Moses this is the last one. After this, Pharaoh will not just release Israel. He will drive them out.",
      "Israel is told to ask their Egyptian neighbors for silver and gold on the way out, and Egypt, strangely, gives it freely. God has made them favorable in Egyptian eyes.",
      "Moses announces it plainly. About midnight, every firstborn in Egypt will die, from Pharaoh's own son down to the lowest servant's, and every firstborn animal too.",
      "But not one dog will bark at Israel. That is the whole point of everything that has happened so far. The LORD is putting a difference between Egypt and His people.",
    ]),
    g(12, 1, 28, [
      "God gives Israel their first shared ritual as a nation, before they are even free. A lamb, without blemish, kept four days, killed at twilight.",
      "Blood goes on the door frame, not because it changes God's mind, but because it marks a house. When I see the blood, I will pass over you.",
      "The meal itself is eaten standing up, dressed, sandals on, staff in hand. Nobody sits down for this dinner. It is eaten like people about to move.",
      "And it is not a one-time thing. Keep this day as a lasting ordinance. Israel is told to still be doing this centuries later. They still are.",
    ]),
    g(12, 29, 51, [
      "Midnight comes, and it happens exactly as said. Every house in Egypt without exception has someone dead in it. A cry goes up that Egypt has never heard before and never hears again.",
      "Pharaoh sends for Moses in the middle of the night. Rise up, get out, go worship your God like you asked. And bless me too.",
      "Israel leaves so fast the bread has no time to rise. They carry the dough on their shoulders, still in the bowls. Six hundred thousand men on foot, plus women, children, and a mixed crowd of others who leave with them.",
      "Exodus counts the exact number of years, four hundred and thirty, down to the very day it ends. God kept a promise made centuries before anyone alive that night was born.",
    ]),
  ],
  closing: [
    ["So that is Day 24.", 700],
    ["Five plagues, a midnight death, and a nation walking out the door with bread that never got the chance to rise.", 750],
    ["Every plague in these chapters draws the same line. God's people over here, untouched. Egypt over there, breaking.", 800],
    ["And the last one is not stopped by anything Pharaoh does. It is stopped by blood on a door frame, put there by faith before anyone could see the reason for it.", 850],
    ["That is what the meal is for. Not a memory of an escape. A rehearsal of it, so nobody forgets what the blood was for.", 850],
    ["Tomorrow, Exodus 13 through 16. Israel gets free, and immediately has to learn how to trust God for food and water one day at a time.", 850],
    ["For now, hold on to the instruction God gave before anyone was safe.", 800],
    ["When I see the blood.", 750],
    ["I will pass over you.", 1200],
  ],
};
