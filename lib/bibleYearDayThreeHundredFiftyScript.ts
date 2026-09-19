import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 350, written to the Day 1 standard.
 *
 * Hebrews 9-11: the tabernacle laid out room by room, then why a covenant
 * needs a death to take effect, then the one sacrifice that finally does
 * what the old system never could, then the roll call of everyone who
 * trusted a promise they never lived to see finished. Seven blocks across
 * three dense chapters.
 */

const hebrewsNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 9:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 10:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 11:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 350,
  title: "Once-for-All Sacrifice and Faith",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 350.", 700],
    ["Yesterday you got the new covenant, promised, written on the heart. Today the writer shows you exactly what it cost, and what it actually looks like to trust God without seeing the ending.", 850],
    ["First a tour of a tent with two rooms, and blood that finally does what animal blood never could.", 800],
    ["Then a straight warning about giving up. And then the longest list of ordinary people who trusted God before they ever saw the payoff.", 850],
    ["Hebrews 9 through 11.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hebrewsNine(1, 14, [
      "The old system had a tent with two rooms. Outer room: a lampstand, a table, the bread set out for God. Behind a curtain, the second room, with the gold-covered ark holding the manna, Aaron's staff, the stone tablets, and carved angels looking down over the top of it.",
      "Priests went into the first room constantly, doing their regular work. Only the high priest went past the curtain, and only once a year, and never without blood, offered for his own mistakes and the people's.",
      "The Holy Spirit was making a point with that setup. The way into God's actual presence was not open yet, not while that first tent was still standing. All those gifts and sacrifices could never really clean anyone's conscience. They only ever touched the outside.",
      "But Christ walked into the real tent, not one built by human hands, and he did not carry goat's blood or calf's blood in with him. He carried his own, once, and it worked. If animal blood could make a body clean on the outside, how much more does his blood clean an actual conscience, so you can serve a living God instead of just going through motions.",
    ]),
    hebrewsNine(15, 28, [
      "That is why he mediates a new covenant. A death had to happen to free people from what they owed under the first one, so that everyone called by God could actually receive the eternal inheritance promised.",
      "Think of a will. It only takes effect after the person who wrote it dies. It means nothing while they are still alive. That is why even the first covenant needed blood to start it. Moses sprinkled blood on the book, on the people, on the tent, on every piece of it.",
      "Under that law, almost everything gets purified with blood. Without blood poured out, there is no forgiveness at all.",
      "So Christ did not walk into a man-made copy of the real place. He walked into heaven itself, to stand in front of God on your behalf. He did not have to keep dying, over and over, the way the ritual repeated every year. He appeared once, at the end of the ages, to erase sin by sacrificing himself. Everyone dies once, then faces judgment. In the same way, Christ was offered once to carry the sins of many, and he will appear again, not to deal with sin this time, but to save the people watching for him.",
    ]),
    hebrewsTen(1, 18, [
      "The law was only ever a shadow of the good things coming, never the real image itself. That is why the same sacrifices, repeated year after year, could never actually finish the job. If they could, people would have stopped feeling guilty and stopped bothering to offer them.",
      "Instead those sacrifices just reminded everyone of their sin, every single year, because bull's blood and goat's blood were never able to take sin away in the first place.",
      "So Christ says it himself, quoting the Psalms: you did not want more sacrifices, you prepared a body for me instead. Here I am, to do your will. That will is what makes people holy, through one offering, never repeated, while every other priest just keeps standing there, day after day, offering the same sacrifices that never actually fix anything.",
      "Then the promise: God says he will put his laws in their hearts and write them on their minds, and he will not remember their sins anymore. Once sin is actually dealt with like that, there is nothing left to offer for it.",
    ]),
    hebrewsTen(19, 39, [
      "Because of that, you can walk straight into the holiest place, through Jesus' own body like a curtain torn open, with a true heart, full confidence, a conscience washed clean, a body washed in clean water.",
      "Hold onto the hope you claim without wavering, because God keeps his word. Push each other toward love and good deeds. Do not skip meeting together, the way some people already have. Do it more, not less, the closer the day gets.",
      "Then the hard part. Keep sinning on purpose after knowing the truth, and there is no more sacrifice left to cover it. Just a terrifying wait for judgment. Trample the Son of God, treat the blood that made you holy like garbage, insult the Spirit of grace, and that is serious. It is a terrifying thing to fall into the hands of the living God.",
      "But then the turn. Remember the early days, when you took real losses and stayed joyful anyway, because you knew you had something better waiting. Do not throw that confidence away now. The one who is coming is coming. He will not be late. My righteous one will live by faith, and if he shrinks back, I am not pleased with him. But that is not us. We do not shrink back and get lost. We keep believing, and we get saved.",
    ]),
    hebrewsEleven(1, 16, [
      "Faith is being sure of what you hope for. Convinced of what you cannot see. That is what the old believers were praised for.",
      "By faith you understand the universe was framed by God's word, everything visible made from what does not appear. By faith Abel offered a better sacrifice than Cain, and even though Abel is dead, that faith still speaks. By faith Enoch was taken up without ever dying, because he had been pleasing God. And without faith it is impossible to please him, because anyone who comes to God has to believe he exists, and that he rewards the ones who actually search for him.",
      "By faith Noah built a boat for a flood he could not see yet, moved by reverent fear, and that boat condemned the whole world and made him an heir of righteousness by faith. By faith Abraham left home for a place he had only been promised, not even knowing where he was going. By faith he lived there like a stranger in tents, right alongside Isaac and Jacob, heirs of that same promise, because he was watching for a city with real foundations, one God designed and built himself.",
      "By faith Sarah, barren and too old, got the strength to conceive, because she trusted the one who promised was faithful. So from one man, already as good as dead, came descendants like the stars, like sand on a shore, too many to count. Every one of them died still only holding the promise from a distance, still calling themselves strangers passing through, which means they were openly saying they were after a better country. A heavenly one. That is why God is not ashamed to be called their God. He already has a city ready for them.",
    ]),
    hebrewsEleven(17, 31, [
      "By faith Abraham, when he was tested, offered up Isaac, his one and only son, the son the promise ran through, believing God could raise him from the dead if it came to that. By faith Isaac blessed Jacob and Esau about what was still coming. By faith Jacob, dying, blessed both of Joseph's sons and worshiped, leaning on his staff.",
      "By faith Joseph, at the very end of his life, talked about Israel leaving Egypt someday and left instructions about his own bones. By faith Moses' parents hid him three months after he was born, because they saw he was a beautiful child, and they were not afraid of the king's order.",
      "By faith Moses, grown, refused to be called Pharaoh's grandson. He chose getting mistreated alongside God's people over enjoying sin for a season, because he counted the shame of following Christ worth more than Egypt's entire treasury. He was watching for the reward. By faith he walked out of Egypt, not scared of the king's anger, because he kept going like he could see the invisible one standing right in front of him.",
      "By faith he kept the Passover and splashed the blood, so the one who destroyed the firstborn would not touch Israel's. By faith they walked through the Red Sea like it was dry ground, and when the Egyptians tried the same thing, they drowned. By faith Jericho's walls came down after seven days of walking around them. By faith the prostitute Rahab was not killed with the people who refused to believe, because she had welcomed the spies in peace.",
    ]),
    hebrewsEleven(32, 40, [
      "And here the writer just runs out of room. What more can I say, he asks. There is not enough time to tell you about Gideon, Barak, Samson, Jephthah, David, Samuel, the prophets.",
      "Through faith they took down kingdoms, did what was right, watched promises actually come through, shut the mouths of lions, put out raging fires, escaped execution, turned weakness into strength, got fierce in battle, routed entire foreign armies. Women got their dead back alive.",
      "Then it flips hard. Others were tortured and would not take the easy way out, because they wanted something better than freedom, an actual resurrection. Others faced mockery, whips, chains, prison. They were stoned, sawed in half, killed with swords, wandered around in animal skins, poor, mistreated, abused, people the world was not even worthy of, wandering deserts, mountains, caves, holes in the ground.",
      "Every one of them commended for their faith, and not one of them got what was actually promised, because God had something better planned. Something that only works with us included, so that none of them would reach the finish line without us.",
    ]),
  ],
  closing: [
    ["So that's Day 350.", 700],
    ["A curtain, a will that only takes effect after a death, and a room nobody could walk into until Jesus did.", 850],
    ["Then the warning: don't trample what that blood cost. And right after it, the turn: don't throw away your confidence either.", 850],
    ["Then chapter 11. Name after name of people who trusted a promise they never lived to see finished.", 850],
    ["Abel. Enoch. Noah. Abraham. Sarah. Moses. Rahab. Gideon. And a whole crowd the writer doesn't even have room to name.", 850],
    ["None of them got the full promise in their lifetime. The writer says that was on purpose. God had something better planned, something that only works with you in it too.", 900],
    ["Tomorrow, Hebrews 12 and 13, and James 1. Running the race, and what faith looks like when it actually shows up in your hands.", 850],
    ["For now, carry the definition.", 750],
    ["Faith is being sure of what you hope for.", 800],
    ["Convinced of what you cannot see.", 1200],
  ],
};
