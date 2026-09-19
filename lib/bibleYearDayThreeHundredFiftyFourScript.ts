import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 354, written to the Day 1 standard.
 *
 * Peter turns practical: marriage, suffering for doing right, and a church
 * led by shepherds instead of lords. The same command keeps returning from
 * every angle: humble yourself, and he will lift you up. Six blocks across
 * 1 Peter 3-5.
 */

const firstPeterThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Peter 3:${startVerse}-${endVerse}`,
  book: "1 peter",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const firstPeterFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Peter 4:${startVerse}-${endVerse}`,
  book: "1 peter",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const firstPeterFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Peter 5:${startVerse}-${endVerse}`,
  book: "1 peter",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 354,
  title: "Suffering, Shepherding, and Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 354.", 700],
    ["Peter turns practical today. Marriage, suffering for doing right, and how a church should actually be led.", 800],
    ["He tells husbands to honor their wives as the weaker vessel, so their own prayers don't get hindered. He tells elders to shepherd, not lord it over anyone.", 850],
    ["And right in the middle of it, the same line keeps coming back. Humble yourself under God's mighty hand, and he will lift you up in due time.", 850],
    ["1 Peter 3, 4, and 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstPeterThree(1, 7, [
      "Peter speaks to wives first, married to men who don't believe. Win them without a word, he says, by how you actually live, not by what you say to them.",
      "Don't chase the outward stuff, braided hair, gold jewelry, fine clothes. Chase the hidden person of the heart instead, a gentle and quiet spirit. That, Peter says, is what's precious in God's sight, not what shows up in a mirror.",
      "He points back to Sarah, who called Abraham lord and obeyed him, and says that's the kind of daughter you are now, as long as you do what's right and let nothing terrify you.",
      "Then husbands. Live with your wives with understanding, Peter says, giving honor to the weaker vessel, since you're heirs together of the grace of life. Do it wrong, he warns, and your prayers get hindered. Marriage and worship, tangled together, whether you notice it or not.",
    ]),
    firstPeterThree(8, 22, [
      "Be of one mind, Peter says. Sympathetic, loving as family, tender, humble. Don't repay evil for evil or insult for insult. Repay it with blessing instead, because that's what you were called to, and it's how you inherit a blessing yourself.",
      "Whoever wants to love life and see good days, keep your tongue from evil, and your lips from lies. Turn from evil, do good, seek peace and go after it. The Lord's eyes are on the righteous, and his ears are open to their prayer.",
      "If you suffer for doing right, Peter says, you're blessed, so don't fear what they fear. Just set Christ apart as Lord in your heart, and be ready to explain the hope you carry, but do it with gentleness and respect, not with an argument.",
      "Christ suffered once for sins, the just for the unjust, to bring you to God. Peter reaches back to Noah, eight souls saved through water, and calls baptism the same kind of picture now, not washing dirt off your body, but a clean conscience turning to God, because Jesus rose and is seated at God's right hand, angels and authorities under his feet.",
    ]),
    firstPeterFour(1, 11, [
      "Since Christ suffered in the flesh, arm yourself with the same mindset, Peter says, because whoever has suffered in the flesh is done with sin. You've already spent enough time doing what the world wants, drunkenness, lust, wild parties, forbidden idol worship.",
      "They think it's strange you don't run into that flood of wildness with them anymore, and they say ugly things about you for it. They'll answer to the one who's ready to judge the living and the dead.",
      "The end of everything is near, Peter says, so stay clear-headed, stay alert enough to pray. And above everything, keep loving each other fervently, because love covers over a multitude of sins.",
      "Whatever gift you've received, use it to serve each other, as good stewards of God's varied grace. If you speak, speak like it's God's own words. If you serve, serve with the strength God provides, so God gets the glory in everything, through Jesus Christ, to whom belongs glory and power forever.",
    ]),
    firstPeterFour(12, 19, [
      "Don't be shocked by the fiery trial that's testing you, Peter says, like something strange is happening to you. Rejoice instead, because you're sharing in what Christ went through, so when his glory shows up, you'll be overjoyed too.",
      "If you're insulted for the name of Christ, you're blessed, because the Spirit of glory, the Spirit of God, rests on you. Just make sure none of you suffers as a murderer, a thief, a criminal, or a meddler in other people's business.",
      "But if you suffer for being a Christian, don't be ashamed. Glorify God that you carry that name. Judgment starts at God's own house first, Peter says, and if it starts with us, what happens to people who never obeyed the gospel at all?",
      "If the righteous are barely saved, where does that leave the ungodly and the sinner? So if you're suffering the way God wants, entrust your soul to a faithful Creator, and keep doing good while you wait.",
    ]),
    firstPeterFive(1, 7, [
      "Peter turns to the elders now, and calls himself one of them, a witness of Christ's sufferings. Shepherd the flock God put in your care, he says. Not because you're forced to. Willingly. Not for the money in it. Eagerly.",
      "Don't lord it over the people God gave you. Be examples to the flock instead. And when the Chief Shepherd appears, you'll get a crown of glory that never fades, not a temporary one anyone can take from you.",
      "Then to everyone younger, submit to your elders. And all of you, Peter says, clothe yourselves with humility toward each other, because God opposes the proud, but gives grace to the humble.",
      "Humble yourselves under God's mighty hand, so he can lift you up at the right time. Cast every worry you carry onto him, Peter says, because he cares about you. Not tolerates you. Cares.",
    ]),
    firstPeterFive(8, 14, [
      "Stay sober, stay alert, Peter warns. Your enemy the devil is walking around like a roaring lion, looking for someone to devour. Resist him, stay firm in the faith, and remember believers everywhere are going through the same kind of suffering you are.",
      "After you've suffered a little while, the God of all grace, who called you to his eternal glory in Christ, will himself restore you, make you strong, firm, and steadfast. To him belongs the power, forever.",
      "Peter closes naming names. Silvanus carried this letter. The church in Babylon, and Peter's own son Mark, send their greetings. Greet each other with a kiss of love, he says.",
      "Peace to all of you who are in Christ Jesus. That's how Peter ends it, after five chapters of suffering, submission, and shepherding. Peace, not a summary. Just peace, handed straight to you.",
    ]),
  ],
  closing: [
    ["So that's Day 354.", 700],
    ["A wife's quiet spirit, a husband told to honor what looks weaker, a devil compared to a roaring lion, and elders told to shepherd instead of rule.", 850],
    ["Peter keeps circling back to the same command from every angle. Humble yourselves. Under God's hand, under human authority, under each other.", 850],
    ["And every single time, the promise attached to it is the same. He will lift you up. In due time, not immediately, but certainly.", 850],
    ["Cast your care on him, because he cares for you. Not one line in this whole letter asks you to carry something alone.", 850],
    ["Tomorrow, 2 Peter 1 through 3. A different kind of warning, about false teachers, and a reminder to remember truth while you wait for the day of the Lord.", 850],
    ["For now, carry the lion line.", 750],
    ["Your adversary the devil walks around like a roaring lion, seeking someone to devour.", 850],
    ["Stay sober. Stay alert. Resist him.", 1200],
  ],
};
