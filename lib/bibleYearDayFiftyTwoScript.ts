import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 52, written to the Day 1 standard.
 *
 * Deuteronomy 18-21: the Levites' portion and the promise of a prophet
 * like Moses in place of divination, cities of refuge for accidental
 * killers, the limits on witnesses and the "eye for eye" ceiling on
 * punishment, the laws of war and their real exemptions, the unsolved-
 * murder ritual, the captive woman, the unloved wife's firstborn, the
 * rebellious son, and the body that cannot hang past sundown. Seven
 * blocks across one four-chapter reading, matching the shape Days 50
 * and 51 used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 52,
  title: "Prophets, Cities, and Justice",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 52. Yesterday Moses limited a king who does not exist yet. Today he keeps building the justice system underneath him.", 750],
    ["A prophet Israel can actually trust, cities built for someone who kills by accident, witnesses who cannot lie without paying for it themselves.", 800],
    ["Then war, with limits even a siege is not allowed to break, and a body that cannot be left hanging overnight.", 800],
    ["One line near the end will show up again centuries later, in a place you would not expect.", 850],
    ["We are in Deuteronomy 18 through 21.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(18, 1, 8, [
      "The Levites get no land in Israel. They eat what is offered, the shoulder, the two cheeks, the maw, the firstfruits of corn, wine, and oil, the first of the fleece. Moses already told them why. The Lord is their inheritance.",
      "That means the Levite's whole material life depends on the rest of Israel actually giving. No harvest of his own to fall back on if people stop bringing what is owed.",
      "And if a Levite from anywhere in the country comes to the central place wanting to serve, he is welcomed and given an equal portion, whatever he already has from selling his own property. Belonging here is not about where he has been. It is about showing up.",
      "A whole tribe built around trusting other people's obedience for its next meal. That is either a strange design or the entire point.",
    ]),
    deut(18, 9, 22, [
      "Moses lists what the nations do to find out the future. Pass a child through fire, use divination, read omens, consult the dead. Then he draws the line plainly. These things are why the Lord is driving those nations out.",
      "Instead of letting Israel guess at the future through magic, God promises something else entirely. A prophet like me, from among your own brothers. Listen to him.",
      "And Moses gives a real test, not a vague one. If what the prophet says does not come true, the Lord never spoke it. You do not owe that voice your fear.",
      "This promise of a prophet like Moses becomes one of the most quoted lines in the whole Old Testament later. For today, notice what it replaces. Not curiosity about tomorrow. A voice you can actually trust.",
    ]),
    deut(19, 1, 13, [
      "Once Israel is settled, three cities get set apart on purpose, roads prepared to them, so anyone who kills a person by accident has somewhere to run before anyone decides his guilt for him.",
      "Moses gives the exact picture. Two men cutting wood together, the axe head flies off the handle, and a man dies who was never hated by the one holding it. That man needs somewhere safe from the dead man's family before emotion settles anything.",
      "If the land ever grows large enough, three more cities get added. Justice was built to scale up with the nation, not stay fixed at the size it started.",
      "But the door only opens for accidents. Someone who plans and hates and kills does not get to hide behind a city built for someone else's tragedy. The elders are told to hand him over instead.",
    ]),
    deut(19, 14, 21, [
      "Do not move your neighbor's boundary stone, set by the people before you. A law against quietly stealing land one inch at a time.",
      "One witness is never enough to establish guilt. It takes two or three. A single accusation, however loud, does not get to end someone's life.",
      "And if a witness is caught lying, he receives exactly the punishment he tried to get someone else to suffer. The false accuser inherits the fate he was aiming at his neighbor.",
      "Then the famous line. Life for life, eye for eye, tooth for tooth. Read here, in context, it is not permission for cruelty. It is a ceiling on it. The punishment can never outgrow the crime.",
    ]),
    deut(20, 1, 20, [
      "Before a battle, the priest speaks first, not the general. Do not be afraid, even if the enemy has more horses and more chariots, because the Lord who brought you out of Egypt is the one going out with you.",
      "Then the officers send men home. Whoever built a house and has not lived in it yet. Whoever planted a vineyard and has not tasted it. Whoever is engaged and has not married yet. Even whoever is simply afraid. War here does not get to swallow every ordinary hope a man is still waiting on.",
      "Distant cities are offered peace first, and only fought if they refuse. The nations living inside the land itself get a harsher instruction, tied directly to what they will teach Israel to copy if they survive.",
      "And even in a siege, the fruit trees stay standing, because a tree is not the enemy. War here has limits even a siege's anger is not allowed to erase.",
    ]),
    deut(21, 1, 14, [
      "If a body is found in a field and nobody knows who killed him, the nearest town does not just move on. Their elders take a heifer that has never worked, break its neck in a valley that has never been farmed, and wash their hands over it, saying our hands did not shed this blood.",
      "Unclaimed guilt still gets addressed out loud, in public, by the people closest to it. Nobody gets to simply forget a body in a field.",
      "Then a hard law about a woman taken captive in war. Before anything else happens, she shaves her head, lets her nails grow, and mourns her parents a full month. A required pause before a man could treat her as anything other than a grieving person.",
      "And if he later has no delight in her, he cannot sell her or treat her as property. He humbled her, so he does not get to profit from her too. A hard passage from a hard chapter in Israel's history, not a comfortable ideal, but a real limit placed on power that had none before.",
    ]),
    deut(21, 15, 23, [
      "If a man has two wives, one loved and one not, and the unloved wife's son is the actual firstborn, the father cannot hand the inheritance to the favorite son instead. Preference does not get to override birth order.",
      "Then one of the hardest laws in the whole book. A son who will not listen to his father or mother, called out publicly as a glutton and a drunkard, can be brought before the elders and stoned. Whether Israel ever actually carried this out is a real question historians still ask. Moses is showing how seriously this culture treated open, ongoing defiance of both parents together, not just one bad night.",
      "And the chapter closes with a law about a hanged body. It cannot stay on the tree overnight. Bury him that same day, because the hanged man is cursed of God, and the land itself is not supposed to be defiled by leaving him there.",
      "Paul later quotes that exact line about the curse of hanging on a tree to describe what happened to Jesus on the cross. A detail from a law code about criminals becomes, centuries later, the language the New Testament reaches for to explain what the cross actually did.",
    ]),
  ],
  closing: [
    ["So that is Day 52.", 700],
    ["A prophet promised in place of magic and guesswork. Cities built on purpose for a man who kills by accident. Witnesses who inherit the fate they tried to hand someone else.", 800],
    ["War with real limits. Homes not yet lived in, engagements not yet finished, even the fruit trees left standing.", 800],
    ["And a body that cannot hang past sundown, because it carries a curse the land is not supposed to absorb.", 800],
    ["Paul reaches for that exact line hundreds of years later to explain the cross. A detail from a law code about criminals becomes the language for what Jesus did there.", 850],
    ["Tomorrow, Deuteronomy 22 through 25. Everyday faithfulness, the small, ordinary laws that hold a community together.", 850],
    ["For now, sit with the line Paul borrows later.", 800],
    ["Cursed is everyone who hangs on a tree.", 750],
    ["That is what the cross became.", 1200],
  ],
};
