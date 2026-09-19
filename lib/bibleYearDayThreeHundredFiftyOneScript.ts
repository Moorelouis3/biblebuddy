import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 351, written to the Day 1 standard.
 *
 * Hebrews closes with the race, the unshakeable kingdom, and the
 * benediction. Then James opens, blunt and practical: count trials as joy,
 * ask for wisdom, and do not just listen to the word, do it. Seven blocks
 * across Hebrews 12-13 and James 1.
 */

const hebrewsTwelve = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 12:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 12,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsThirteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 13:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 13,
  startVerse,
  endVerse,
  teaching,
});

const jamesOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `James 1:${startVerse}-${endVerse}`,
  book: "james",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 351,
  title: "Endurance and Living Faith",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 351.", 700],
    ["Hebrews finishes today. Then a brand new writer picks up, completely different in style, but somehow saying the same thing.", 850],
    ["First a race, with everyone who ever trusted God watching from the stands. Then a mountain you could not touch, replaced by one you actually can approach.", 850],
    ["And then James walks in and asks a question nobody really wants asked out loud. Does your faith actually do anything, or does it just talk.", 900],
    ["Hebrews 12 and 13, and James 1.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hebrewsTwelve(1, 11, [
      "So with all these witnesses stacked up around you like a crowd in the stands, the writer says, strip off whatever is weighing you down, and the sin that trips you up every time, and run the race in front of you, patiently.",
      "Keep your eyes on Jesus. He started this faith, and he is the one who finishes it. He endured a cross, ignored the shame of it, because of the joy waiting on the other side. Now he is sitting down at God's right hand.",
      "Think about what he put up with from people who hated him, so you do not get worn down and give up. None of you have bled yet in this fight against sin. And do not forget what God already told you, like a son. Do not brush off the Lord's discipline, do not fall apart when he corrects you, because the Lord disciplines the ones he loves, and puts every son he accepts through it.",
      "If you are never disciplined, the writer says bluntly, that just means you are not really his. Human fathers correct us for a few years, doing what seemed right to them at the time. God does it for our actual good, so we can share his holiness. No discipline feels good in the moment. It hurts. But it grows something afterward, real peace, real righteousness, in the people who let it train them.",
    ]),
    hebrewsTwelve(12, 17, [
      "So straighten up the hands hanging at your sides, the writer says, and the knees that have gone weak. Make the path straight under your own feet, so whatever is limping does not fall apart completely, and actually gets healed instead.",
      "Chase peace with everyone. Chase holiness. Without it, nobody sees the Lord. Watch that nobody misses out on God's grace, and that no root of bitterness grows up and poisons a whole group of people.",
      "Watch for anyone living like Esau. Sexually immoral, or just careless about what is sacred. He traded his birthright for a single meal.",
      "You know how it ended. Later, when he wanted that blessing back, he was turned away. He could not find a way to undo it, even though he went looking for it with tears.",
    ]),
    hebrewsTwelve(18, 29, [
      "You have not come to something you can touch, the writer says. A mountain on fire, total darkness, a storm, a trumpet blast, a voice so terrifying the people who heard it begged for it to stop. Even Moses said he was shaking with fear.",
      "No, you have come to Mount Zion instead. The city of the living God, the Jerusalem that exists in heaven. Thousands of angels celebrating. The whole assembly of God's firstborn children, already written down in heaven. God himself, judge of everyone. The spirits of good people made complete. Jesus, who set up the new covenant. And blood that speaks a better word than Abel's ever did.",
      "So do not turn away from the one speaking. If people did not get away with ignoring the warning given on earth, we are not getting away with it either if we turn from the one speaking from heaven. His voice shook the earth once. Now he has promised something bigger. He is going to shake heaven too, not just earth, and everything that can be shaken gets removed, so only what cannot be shaken is left standing.",
      "So since we are getting a kingdom nothing can shake, hold onto that, and worship God the way that actually pleases him. With reverence, with real fear, because our God is a consuming fire.",
    ]),
    hebrewsThirteen(1, 9, [
      "Keep loving each other like family, the writer says. Do not stop welcoming strangers into your home. Some people have entertained angels that way without even realizing it.",
      "Remember prisoners like you were locked up with them. Remember people being mistreated like it is happening to your own body. Marriage should be honored by everyone, the marriage bed kept pure. God is going to judge people who chase sex outside of it.",
      "Do not let your life be about chasing money. Be content with what you already have, because God himself said, I will never leave you, I will never abandon you. So you can say with confidence, the Lord is helping me, I am not afraid of anything people can do to me.",
      "Remember the leaders who first taught you God's word. Watch how their lives turned out, and copy their faith. Jesus Christ does not change. Yesterday, today, forever the same. So do not get pulled off course by strange new teachings. What actually strengthens your heart is grace, not a bunch of rules about food that never helped anyone who followed them.",
    ]),
    hebrewsThirteen(10, 25, [
      "We have an altar the old system's priests are not allowed to eat from, the writer says. Under the law, the bodies of animals whose blood the priest carried into the holy place to deal with sin were burned outside the camp. That is why Jesus suffered outside the city gate too, to make his people holy with his own blood.",
      "So go out to him, outside the camp, carrying whatever shame that costs you. This world was never home for good. We are watching for the one still coming. Keep offering God a sacrifice of praise through Jesus, which really just means thanking him out loud. And do not forget to do good and share what you have. That is the kind of sacrifice that pleases God too.",
      "Obey your leaders, work with them, because they are watching over your souls like people who will have to answer for it. Make it something they enjoy doing, not a burden, because a miserable leader does not help anyone. Pray for us, the writer adds. We are convinced our conscience is clear.",
      "Then the blessing. May the God of peace, who raised Jesus back from the dead, that great shepherd, through the blood of a covenant that never ends, make you complete in everything good, so you can actually do what he wants. Grace be with you all. That is how the whole letter signs off.",
    ]),
    jamesOne(1, 12, [
      "New writer, new voice. James, calling himself just a servant of God and of Jesus, writes to believers scattered everywhere. And he opens with a line that stops you. Count it all joy, he says, when you run into all kinds of trials.",
      "Not because trials feel good. Because testing your faith produces endurance, and if you let endurance finish its work, you come out whole, complete, not lacking anything.",
      "If any of you need wisdom, ask God for it. He gives generously to everyone, and never makes you feel stupid for asking. But ask in faith, not doubting, because a doubter is like a wave in the ocean, tossed wherever the wind pushes it. Do not expect to get anything from the Lord in that state. A double-minded man cannot settle on anything.",
      "Let the poor believer be proud of how high God has raised him. Let the rich one be proud of how low he has been brought, because he is going to fade like a wildflower in the heat. Blessed is the one who keeps standing under pressure, because once he is proven, he gets the crown of life God promised to everyone who loves him.",
    ]),
    jamesOne(13, 27, [
      "Nobody under pressure to sin should say God is tempting him. God cannot be tempted by evil, and he does not tempt anyone that way either. Every person gets pulled and hooked by his own desire. Then desire gets pregnant and gives birth to sin, and sin, once it is grown, gives birth to death.",
      "Do not be fooled, James says. Every good gift, every perfect gift, comes down from the Father who made the lights in the sky, and unlike them, he never shifts or changes like a shadow moving. He chose to give us life through the word of truth, so we would be a kind of firstfruits of everything he made.",
      "So know this. Everyone should be quick to listen, slow to speak, slow to get angry, because a man's anger does not produce the righteousness God wants. Get rid of whatever is dirty and whatever is left over of evil in you, and humbly accept the word planted in you, because it is able to save you.",
      "But do what it says. Do not just listen to it and lie to yourself. Anyone who hears it and does not act on it is like a man checking his face in a mirror, then walking away and immediately forgetting what he looks like. Anyone who actually looks into God's perfect law of freedom, and keeps looking, and does something about it, will be blessed in what he does. And if anyone thinks he is religious but cannot control his own tongue, he is fooling himself. His religion is worthless. Real religion, the kind God the Father accepts as pure, is this: take care of orphans and widows in their pain, and keep yourself from being stained by the world.",
    ]),
  ],
  closing: [
    ["So that's Day 351.", 700],
    ["A race run in front of a crowd of witnesses, a kingdom nothing can shake, and a letter that just introduced itself in one hard breath.", 850],
    ["Jesus Christ, the same yesterday, today, and forever. Hold onto that line. Everything Hebrews argued for thirteen chapters was building toward saying it plainly.", 850],
    ["Then James walks in blunt. Faith that never shows up in your hands is not faith you can trust.", 850],
    ["He is not saying earn your way in. He is saying real trust in God moves your feet.", 850],
    ["Count it all joy, he says, when hard things come. Not because they feel good. Because something real gets built in you through them.", 850],
    ["Tomorrow, James 2 through 4. What faith without works actually looks like, and where fights inside a church really come from.", 850],
    ["For now, carry the mirror line.", 800],
    ["Do not just look and walk away.", 800],
    ["Do something about what you saw.", 1200],
  ],
};
