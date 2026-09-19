import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 356, written to the Day 1 standard.
 *
 * John writes to people he loves, plainly, in short repeated words: light,
 * darkness, love, hate, life, death. No argument, just a line drawn and
 * drawn again. Six blocks across 1 John 1-3.
 */

const firstJohnOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 John 1:${startVerse}-${endVerse}`,
  book: "1 john",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const firstJohnTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 John 2:${startVerse}-${endVerse}`,
  book: "1 john",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const firstJohnThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 John 3:${startVerse}-${endVerse}`,
  book: "1 john",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 356,
  title: "Walking in Light and Love",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 356.", 700],
    ["John is an old man now, writing to people he calls his little children.", 800],
    ["And he keeps using the same few words over and over. Light. Darkness. Love. Hate. Life. Death.", 850],
    ["No arguments, no long chains of logic. Just a line, drawn clearly, and drawn again.", 800],
    ["If you say you have no sin, John says, you are lying to yourself. If you love your brother, you are in the light. It really is that simple, and that hard.", 850],
    ["1 John 1, 2, and 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstJohnOne(1, 10, [
      "John starts by saying he's not writing about an idea. He's writing about what he heard, what he saw with his own eyes, what his hands actually touched. The Word of life, standing in front of him.",
      "He's telling them so they can share what he shares, fellowship with the Father and with Jesus Christ, and so their joy can be complete. Not information. An invitation into something.",
      "Then the message itself. God is light, John says, and there's no darkness in him at all. So if you claim to walk with him while you're walking in darkness, you're lying, not just to other people, to yourself.",
      "But walk in the light, John says, and you get two things at once. Fellowship with each other, and the blood of Jesus cleansing you from every sin. Say you have no sin, and you deceive yourself. Confess it instead, and he's faithful and just to forgive it and clean you up.",
    ]),
    firstJohnTwo(1, 11, [
      "John writes so they won't sin, but adds this immediately. If you do sin, you have an advocate with the Father, Jesus Christ, who is righteous, and he's the payment for those sins, not just yours, the whole world's.",
      "You can know you know him, John says, by whether you keep his commands. Claim to know him and ignore what he said, and you're a liar. But keep his word, and God's love is genuinely finished its work in you.",
      "This isn't a new command, John says. It's the same one you've had from the beginning. And yet it's also new, because the darkness is passing and the true light is already shining.",
      "Here's the test, plain as it gets. Say you're in the light while you hate your brother, and you're still in the dark. Love your brother, and you're in the light, nothing in you to trip over. Hate him, and you're stumbling around blind, with no idea where you're even going.",
    ]),
    firstJohnTwo(12, 17, [
      "John addresses them by stage of life. Little children, your sins are forgiven for his name's sake. Fathers, you've known him who was from the beginning. Young men, you've overcome the evil one, strong, with God's word living in you.",
      "Then the warning that follows all that comfort. Don't love the world, John says, or anything in it. Love the world, and the Father's love has no room left in you.",
      "He names exactly what's in the world. The lust of the flesh, the lust of the eyes, the pride of life. None of it comes from the Father. All of it comes from the world itself.",
      "And the world is passing away, John says, along with everything it wants. But the one who does God's will remains standing forever. One side of that line disappears. The other doesn't.",
    ]),
    firstJohnTwo(18, 29, [
      "It's the last hour, John says, and just like they'd heard an antichrist was coming, many antichrists have already shown up. That's how they know what time it is.",
      "They went out from us, John says, but they were never really of us. If they had been, they'd have stayed. Their leaving proved something that was already true.",
      "But you have an anointing from the Holy One, John tells them, and you already know the truth. No lie comes from the truth. Whoever denies Jesus is the Christ is the antichrist, denying the Father and the Son both.",
      "Let what you heard from the beginning stay in you, John says, and you'll remain in the Son and the Father both, holding the promise he made, eternal life. His anointing teaches you, and it's true, no lie in it. So abide in him, so that when he appears, you won't shrink back from him in shame.",
    ]),
    firstJohnThree(1, 10, [
      "See what kind of love the Father has given us, John says, that we're actually called children of God. The world doesn't recognize you for the same reason it never recognized him.",
      "We're God's children now, John says, and what we'll become hasn't been fully shown yet. But we know that when he appears, we'll be like him, because we'll see him exactly as he is.",
      "Whoever has that hope purifies himself, John says, the way Christ is pure. Sin is lawlessness, plain and simple, and Jesus appeared specifically to take sin away. There's no sin in him at all.",
      "This is the line John keeps drawing. Whoever practices sin belongs to the devil, who's been sinning since the beginning. The Son of God appeared to destroy exactly that. Cain is the example. He killed his brother because his own works were evil and his brother's were righteous.",
    ]),
    firstJohnThree(11, 24, [
      "This is the message you've had since the beginning, John says. Love one another. Whoever doesn't love his brother is still living in death, whatever else he claims about himself.",
      "Hate your brother, John says, and you're a murderer, and no murderer carries eternal life. We know love because Christ laid his life down for us, and that means we're called to lay ours down for each other too.",
      "So if you have what you need and you watch your brother go without, and you close your heart to him anyway, how can God's love actually live in you? Don't love in word or in talk, John says. Love in action and in truth.",
      "That's how you'll know you belong to the truth, John says, and reassure your own heart in front of God, even when your heart accuses you, because God is greater than your heart and knows everything. Keep his commandments, believe in Jesus, love one another, and he lives in you, and you in him, by the Spirit he gave you.",
    ]),
  ],
  closing: [
    ["So that's Day 356.", 700],
    ["An advocate for when you fail, a warning about loving the world, and Cain standing as the picture of what hate finally does to a brother.", 850],
    ["John never once asks you to feel your way into loving people. He tells you to do it, in action and in truth, and let the feeling follow.", 850],
    ["And when your own heart accuses you, which it will, John doesn't tell you to trust your heart. He tells you God is greater than it, and knows everything.", 850],
    ["Confess what's true. Walk in the light. Love the brother in front of you. That's the whole letter, so far, in three moves.", 800],
    ["Tomorrow, 1 John 4 and 5, and 2 John 1. John keeps going, straight at the heart of what love actually is.", 850],
    ["For now, carry the test he gave you.", 750],
    ["He that loveth his brother abideth in the light.", 800],
    ["And there is none occasion of stumbling in him.", 1200],
  ],
};
