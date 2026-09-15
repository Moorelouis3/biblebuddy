import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 219, written to the Day 1 standard.
 *
 * Jeremiah 4-6: the charge from yesterday becomes a sentence - an army from
 * the north, a city searched for one honest man, a furnace that never
 * produces good silver. Jeremiah feels every bit of it in his own body, and
 * twice, in the middle of the worst language so far, God says he will not
 * make a full end. Seven blocks across three chapters (92 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 219,
  title: "Coming Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 219. The charge is finished. Now comes the sentence.", 750],
    ["An army is coming from the north, and Jeremiah can see it before anyone else can.", 800],
    ["He does not deliver this news calmly. At one point he doubles over just describing it.", 800],
    ["And in the middle of all that judgment, God still says the same thing twice. I will not make a full end.", 850],
    ["We are in Jeremiah 4, 5, and 6.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 9, [
      "It opens as an offer. If thou wilt return, O Israel, return unto me. Put away your abominations, and you will not be removed. Real, conditional mercy, still on the table.",
      "But then the offer sharpens fast. Circumcise yourselves to the Lord, and take away the foreskins of your heart. Not the old sign in the flesh. The real cut has to happen somewhere nobody can see.",
      "Because the alternative is named plainly. Lest my fury come forth like fire, and burn that none can quench it. So the trumpet sounds. Gather into the fenced cities. Evil is coming from the north, and it is coming as a great destruction.",
      "And on that day, the leaders who were supposed to hold the nation together fall apart first. The heart of the king shall perish. The priests astonished. The prophets left with nothing to say.",
    ]),
    g(4, 10, 18, [
      "Jeremiah himself cries out, almost accusing God to his face. Ah, Lord God, surely thou hast greatly deceived this people, saying, Ye shall have peace. Somebody promised peace. It was a lie, and now the sword reaches the soul.",
      "A voice declares from Dan, publishes affliction from Ephraim. Watchers are coming from a far country, and they surround Jerusalem the way keepers surround a field, because she has been rebellious.",
      "And then the line that removes any excuse. Thy way and thy doings have procured these things unto thee. Not bad luck. Not an angry God picking a fight. Cause and effect.",
      "This is thy wickedness, because it is bitter, because it reacheth unto thine heart. Not a surface problem. All the way down.",
    ]),
    g(4, 19, 31, [
      "Jeremiah cannot deliver this next part calmly. My bowels, my bowels! I am pained at my very heart. He hears the trumpet of war in his own soul before it ever reaches the city.",
      "Then the vision turns cosmic. I beheld the earth, and lo, it was without form, and void. No light in the heavens. Mountains trembling. No man, no birds, the fruitful place a wilderness. It is Genesis 1 running backward.",
      "And even inside that, God draws a line. The whole land shall be desolate, yet will I not make a full end. Total judgment, but not total erasure.",
      "The chapter closes on the daughter of Zion, in labor, spreading her hands. Woe is me now, for my soul is wearied because of murderers. Pain that is also, somehow, the sound of something about to be born.",
    ]),
    g(5, 1, 19, [
      "God sends Jeremiah on a search through Jerusalem's streets. Find one man who executes judgment, who seeks the truth, and I will pardon the whole city. The same bargain Abraham once made for Sodom, except here God offers it first.",
      "He does not find one. Not among the poor, who know no better, and not among the great men, who knew the way of the Lord and broke the yoke anyway. So a lion, a wolf, and a leopard are named, watching every road out.",
      "The reason is not abstract. Fed horses in the morning, neighing after his neighbor's wife. A nation with a full stomach and an empty conscience.",
      "Still, mercy holds a boundary even here. Make not a full end. A foreign nation is coming whose language you do not even know, and God explains the exact justice in it. As ye have forsaken me and served strange gods in your own land, so shall ye serve strangers in a land that is not yours.",
    ]),
    g(5, 20, 31, [
      "God points to something smaller than an army. The sea. I have placed the sand for the bound of the sea, and it cannot pass it, no matter how hard it roars. The ocean keeps its boundary. His own people will not keep theirs.",
      "He does not even ask for fear of judgment first. Just fear of him, the one who sends rain in its season and keeps the weeks of harvest coming. Your iniquities have turned away these things.",
      "Meanwhile the wicked lay snares like men who trap birds, and it works. They grow fat, they grow rich, and they will not judge the cause of the fatherless or defend the needy.",
      "The last line is the worst one. The prophets prophesy falsely, and the priests bear rule by their means, and my people love to have it so. Nobody was fooled against their will. They chose the lie.",
    ]),
    g(6, 1, 15, [
      "The language turns military and specific. Blow the trumpet in Tekoa, set a fire signal at Beth-haccerem, evil appears out of the north. These are real coordinates for a real evacuation.",
      "Jerusalem is called a comely and delicate woman, then surrounded like a siege camp, armies debating whether to attack at noon or push through the night to destroy her palaces before morning.",
      "The reason God gives is almost physical. She is wholly oppression in the midst of her. As a fountain casteth out her waters, so she casteth out her wickedness. It is not occasional. It is what constantly flows out of her.",
      "And the false comfort gets named directly. They have healed the hurt of my people slightly, saying, Peace, peace, when there is no peace. Worse, they were not even ashamed. They could not blush anymore.",
    ]),
    g(6, 16, 30, [
      "God makes one last, gentle offer before the chapter turns hard. Stand ye in the ways, and see, and ask for the old paths, where is the good way, and walk therein, and ye shall find rest for your souls. And they answer him flatly. We will not walk therein.",
      "Watchmen are set, the trumpet sounds, and the second refusal lands just as plainly. We will not hearken. Not ignorance. Announced resistance, twice.",
      "So the religion itself gets rejected along with the people. Incense from Sheba, sweet cane from far away, burnt offerings, none of it acceptable, because ritual without obedience was never the actual ask.",
      "The closing picture is a furnace. The bellows are burned, the lead is consumed, the founder melts in vain, because the wicked are not plucked away. No good silver comes out. So they get a new name. Reprobate silver, because the Lord has rejected them.",
    ]),
  ],
  closing: [
    ["So that is Day 219.", 700],
    ["Three chapters of the same warning, from three different angles, and it never lets up.", 750],
    ["A trumpet blown for a war that has not started yet. A city searched for one honest person, and coming up empty. A furnace that burns and burns and produces no good silver.", 800],
    ["And Jeremiah is not a bystander reading a script. He feels it in his own body. My bowels, my bowels.", 800],
    ["But even here, twice, in the middle of the worst language in the book so far, God says the same line. I will not make a full end.", 850],
    ["Judgment and mercy, in the same breath, from the same mouth.", 800],
    ["Tomorrow, Jeremiah 7 through 9. The temple itself gets challenged, and Jeremiah starts to weep.", 850],
    ["For now, sit with the old paths.", 750],
    ["Stand in the ways, and ask where the good way is.", 750],
    ["And walk in it.", 1200],
  ],
};
