import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 50, written to the Day 1 standard.
 *
 * Deuteronomy 10-13: new tablets carried in an ark, Levi's inheritance
 * being God himself, the question that summarizes the whole book (what
 * does the Lord require of you), circumcising the heart, the blessing and
 * the curse set out on two named mountains, tearing down the old worship
 * sites in favor of one chosen place, and the warning against a real sign
 * attached to a false god, even from a prophet, a brother, or a whole
 * city. Seven blocks across one heavy four-chapter reading, matching the
 * shape Days 48 and 49 used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 50,
  title: "Covenant Loyalty From the Heart",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 50. Half of Deuteronomy's opening speeches are behind you now, and today the tone shifts.", 750],
    ["Moses stops recapping the past and starts asking for something harder. Not just your hands. Your heart.", 800],
    ["He hands you one line that could summarize this entire book. What does the Lord actually want from you?", 850],
    ["Then he says circumcise your heart. Strip away what makes you stubborn, not just what makes you unclean.", 850],
    ["And by the end, the warning gets personal. What do you do if the person pulling you toward another god is someone you love?", 900],
    ["We are in Deuteronomy 10 through 13.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(10, 1, 11, [
      "Moses tells them what happened after he shattered the first tablets. God told him to cut two new ones and build an ark of wood to carry them, and God wrote the exact same words on the new stone as the first, the ten commandments, unchanged.",
      "He also drops in a short travel log. Aaron died at Moserah and was buried there, and Eleazar his son took over the priesthood in his place. Life, and death, kept moving even in the middle of a covenant renewal.",
      "Then a detail easy to miss. At that time the Lord set apart the tribe of Levi to carry the ark, to stand before him and minister, and to bless in his name. Therefore Levi has no portion or inheritance with his brothers. The Lord is his inheritance.",
      "No land, no tribal territory, nothing to inherit but God himself. Moses names that as a gift, not a loss.",
    ]),
    deut(10, 12, 22, [
      "Moses asks the question that could summarize this whole book. And now, Israel, what does the Lord your God require of you, but to fear him, to walk in his ways, to love him, and to serve him with all your heart and all your soul.",
      "Then he tells them to circumcise the foreskin of their heart, and be stubborn no more. The same mark cut into their bodies back in Genesis, now aimed at the part of them that keeps resisting.",
      "He describes God as one who is not impressed by size or status. He shows no partiality, takes no bribe, and executes justice for the orphan and the widow. He loves the stranger, giving him food and clothing.",
      "Then Moses turns that description into a command. Love the stranger, because you were strangers in Egypt. Your history is supposed to produce your compassion, not just your gratitude.",
    ]),
    deut(11, 1, 17, [
      "Moses reminds them that he is not talking to their children right now. He is talking to people who saw it themselves. Your eyes have seen every great work the Lord did. Not your parents' eyes. Yours.",
      "He names one of them by name. What God did to Dathan and Abiram, when the ground opened its mouth and swallowed them in front of the whole camp. That memory is meant to still be raw.",
      "Then he contrasts the land they are entering with Egypt. Egypt you watered with your foot, like a garden you had to work by hand. This land drinks rain straight from heaven, cared for by the eyes of the Lord from the start of the year to the end of it.",
      "Which means their harvest depends on obedience in a way Egypt's never did. Serve other gods, and God shuts up the sky, and the ground stops giving anything back. The weather itself becomes a sermon.",
    ]),
    deut(11, 18, 32, [
      "Moses repeats the instruction from chapter 6 almost word for word. Lay up these words in your heart, bind them on your hand, teach them to your children, talk about them sitting at home and walking on the road.",
      "Then he widens the promise. Every place your foot treads will be yours, from the wilderness to Lebanon, from the Euphrates to the sea. No one will be able to stand against you.",
      "And then he draws the whole choice as plainly as it will ever be drawn. See, I set before you this day a blessing and a curse. Blessing if you obey. Curse if you turn aside after gods you have never known.",
      "He even tells them exactly where to stand and say it out loud once they cross the river. The blessing on Mount Gerizim, the curse on Mount Ebal. This is not an abstract idea. It is a place they will physically stand on and pick a side.",
    ]),
    deut(12, 1, 14, [
      "Moses gives the order for what happens to the land's old worship sites. Destroy them completely, every high place, every hill, every green tree the nations used. Tear down their altars, smash their pillars, burn their carved images, and wipe out even the names.",
      "Then the turn. Do not worship the Lord your God that way. Whatever they did to honor their gods is exactly what Israel is forbidden to copy in honoring the true one.",
      "Instead there will be one place God chooses to put his name, and that is where the offerings go, where the households eat together and rejoice in everything their hands have produced.",
      "Moses contrasts it with right now. Every man doing whatever is right in his own eyes. That freedom ends once they have rest in the land. Worship stops being scattered and improvised.",
    ]),
    deut(12, 15, 32, [
      "Moses makes a clear distinction most people miss. Everyday meat, killed and eaten at home, is fine wherever they live. That is not the same as a sacrifice, and it does not require the one central place.",
      "But there is one line he will not bend on. Do not eat the blood. Pour it out on the ground like water, because the blood is the life, and you must not eat the life with the meat.",
      "He warns them not to get curious about how the nations worshiped their gods, thinking they might imitate the ritual and redirect it to the Lord. Those rituals included burning their own sons and daughters in the fire. Curiosity about evil is not neutral.",
      "And he closes with a rule for the whole law they have just heard. Whatever I command you, observe to do it. Do not add to it, and do not take away from it. The instructions are not raw material for editing.",
    ]),
    deut(13, 1, 18, [
      "Moses raises a scenario nobody wants to think about. A prophet stands up, gives a sign, and the sign actually comes true, and then he says, let's go serve other gods. What do you do with a real miracle attached to a false message?",
      "His answer is blunt. Do not listen, even if the sign happens exactly as predicted. The Lord is testing whether you love him with everything you have. The sign was never the point. Loyalty was.",
      "Then it gets closer to home. If your brother, your son, your daughter, your own wife, or the friend who is as close as your own soul tries to pull you toward another god secretly, do not pity him, do not shield him, do not go along quietly.",
      "And if a whole city turns, the instruction is total destruction, city and spoil burned as a whole offering, never rebuilt. Moses is not describing an easy religion. He is describing one that will not let love for a person become a loophole for idolatry.",
    ]),
  ],
  closing: [
    ["So that is Day 50.", 700],
    ["New tablets carried in an ark. A tribe with no land because God himself was their inheritance. And one question that summarizes the whole book.", 800],
    ["What does the Lord your God require of you? To fear him, walk in his ways, love him, serve him with everything you have.", 800],
    ["Moses keeps circling back to the heart, not just the hands. Circumcise it. Lay these words on it. Bind them to it.", 800],
    ["Then he draws the whole choice on two mountains you can stand on and see with your own eyes. Blessing on one. Curse on the other.", 850],
    ["And by the end, he will not let love for a person excuse loyalty to another god. Not a prophet, not a brother, not a wife, not a whole city.", 850],
    ["Tomorrow, Deuteronomy 14 through 17. Clean and unclean food, tithes, and the first instructions for a king Israel does not have yet.", 850],
    ["For now, hold on to the mountains.", 800],
    ["A blessing on one side.", 750],
    ["A curse on the other.", 1200],
  ],
};
