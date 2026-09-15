import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 223, written to the Day 1 standard.
 *
 * Jeremiah 16-18: Jeremiah's own unmarried, childless life becomes a sign,
 * the tree-by-the-water and shrub-in-the-desert contrast names where trust
 * actually lives, and the potter reworks ruined clay instead of scrapping
 * it - right before Judah flatly refuses to turn. Six blocks across three
 * chapters (71 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 223,
  title: "Signs, Sin, and the Potter",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 223. God tells Jeremiah not to marry, not to have children, not even to go to a funeral or a wedding. His whole life becomes the message.", 750],
    ["Then comes one of the most quoted lines in this book. Trust man, and you are a shrub in the desert. Trust God, and you are a tree by the water.", 800],
    ["And a potter takes a ruined piece of clay and simply starts over, right there on the wheel.", 800],
    ["Judah's answer to all of it is about as blunt as refusal gets. There is no hope. We will do what we want.", 850],
    ["We are in Jeremiah 16, 17, and 18.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 13, [
      "God tells Jeremiah something almost nobody gets told. Do not take a wife. Do not have sons or daughters in this place. His own unmarried, childless life becomes part of the message.",
      "He is told to skip houses of mourning too, because God has taken away his peace, his love, and his mercy from this people. No funerals, because the grief coming is too big for comfort. And no houses of feasting either, because the sound of joy is about to go quiet in these streets.",
      "When people ask why God has pronounced such a disaster, Jeremiah is told exactly what to say. Your fathers forsook me and served other gods. And you have done worse than your fathers, every one of you walking after your own stubborn, evil heart.",
      "So the sentence is exile. I will cast you out of this land into a land you never knew, where you will serve other gods, because I will show you no favor there.",
    ]),
    g(16, 14, 21, [
      "Right in the middle of the sentence, God interrupts himself with a future. The days are coming when people will no longer swear only by the God who brought Israel out of Egypt, but by the God who brings them back from the north. Judgment is not the end of the sentence.",
      "He also promises something less comfortable in the same breath. I will send for many fishers to catch them, and after that many hunters, to hunt them from every mountain, hill, and hole in the rock. Nobody hides from what is coming.",
      "Jeremiah answers with a confession instead of another complaint. O Lord, my strength and my fortress, my refuge in the day of trouble, the nations will come to you from the ends of the earth and say, our fathers inherited nothing but lies, useless things that do no good at all.",
      "Then Jeremiah asks the obvious question about idols himself. Shall a man make gods for himself, which are not gods at all? God answers by promising to make himself known this once, so plainly that even they will know his name is the Lord.",
    ]),
    g(17, 1, 13, [
      "Judah's sin is not vague to God. It is written with an iron pen, with a diamond point, engraved on the tablet of their heart and on the horns of their own altars. Sin they can see every time they go to worship.",
      "Then comes one of the most quoted lines in this book. Cursed is the man who trusts in man, who makes flesh his strength, whose heart turns from the Lord. He will be like a shrub in the desert, never seeing good come, living where no one lives, in a salt land.",
      "Blessed is the man who trusts in the Lord instead. He will be like a tree planted by water, sending its roots out toward the stream, not afraid when heat comes, leaves staying green, never anxious in a year of drought, never failing to bear fruit. Same conditions. Two completely different trees.",
      "The heart is deceitful above all things, and desperately sick. Who can know it? I the Lord search the heart, and test the mind, to give every man exactly what his ways deserve. Whoever forsakes the Lord, the fountain of living water, is forsaking the one source that never runs dry.",
    ]),
    g(17, 14, 27, [
      "Jeremiah prays for the thing he actually needs instead of pretending he is fine. Heal me, Lord, and I will be healed. Save me, and I will be saved. You are my praise.",
      "People keep taunting him. Where is this word of the Lord? Let it come now. He tells God plainly that he has not run from being his messenger, then asks to let his persecutors be the ones confounded instead of him.",
      "Then the message shifts to something concrete and doable. Stand in the gate and tell the kings and the people, carry no burden on the Sabbath, do no work, keep that one day set apart, the way your fathers were commanded.",
      "The stakes are named plainly both ways. Keep the Sabbath, and this city will stand forever with kings sitting on David's throne. Refuse, and I will kindle a fire in these gates that will not be put out. One small obedience, holding up something much bigger than itself.",
    ]),
    g(18, 1, 12, [
      "God sends Jeremiah down to the potter's house to watch, not to hear a lecture first. The vessel taking shape on the wheel gets ruined in the potter's hand, so he simply reworks it into another vessel, exactly as he sees fit.",
      "Then the meaning comes. House of Israel, can I not do with you just as this potter does? Like the clay in the potter's hand, so are you in mine. The picture is not about being crushed. It is about being reworked instead of thrown away.",
      "God explains how this actually moves. If I say I will uproot and destroy a nation, and that nation turns from its evil, I will relent of the harm I planned. If I say I will build and plant a nation, and it turns to evil instead, I will relent of the good I planned. The clay's own movement changes what the potter does next.",
      "So Jeremiah delivers it straight. Return, every one of you, from your evil way. And Judah's answer is about as blunt as refusal gets. There is no hope. We will walk after our own plans, and we will each follow the stubbornness of our own evil heart.",
    ]),
    g(18, 13, 23, [
      "God points out how strange this actually is. Ask among the nations, who has ever heard of such a thing. Does a man leave the snow of Lebanon, or forsake the cold flowing water from the rock? Yet my people have forgotten me, to burn incense to something worthless.",
      "So he says he will scatter them like dust before an east wind, and show them his back and not his face on the day their disaster comes. They turned their back on him first.",
      "Jeremiah's enemies decide what to do about him instead of about their own sin. Come, let us plot against Jeremiah, for instruction will not perish from the priest, counsel from the wise, or the word from the prophet. Let us strike him with our own words, and pay no attention to anything he says.",
      "Jeremiah's prayer back is not gentle. Shall good be repaid with evil, that they have dug a pit for my life? Remember how I stood before you to speak good for them, to turn your wrath away from them. Then he asks God not to forgive what they are doing, but to deal with them in the time of his anger. He does not pretend that request is comfortable. He just prays it.",
    ]),
  ],
  closing: [
    ["So that is Day 223.", 700],
    ["A prophet whose whole life became a sign. A tree by the water standing next to a shrub in the desert. A potter reworking ruined clay instead of throwing it out.", 800],
    ["Underneath all three pictures is the same question. Where is your trust actually planted.", 800],
    ["Judah's answer was, in our own plans, and we like it there. Even after watching the potter's wheel with their own eyes.", 800],
    ["But notice what the potter does not do. He does not scrap the clay. He reworks it into another vessel, right there on the same wheel.", 850],
    ["That is what judgment is doing through this whole book. Not throwing the nation away. Starting it over.", 850],
    ["Tomorrow, Jeremiah 19, 20, and 21. A jar smashed in public that cannot be put back together, and Jerusalem given one last warning.", 850],
    ["For now, hold on to the tree by the water.", 800],
    ["Roots out by the stream.", 750],
    ["Green leaves, even in the drought year.", 1200],
  ],
};
