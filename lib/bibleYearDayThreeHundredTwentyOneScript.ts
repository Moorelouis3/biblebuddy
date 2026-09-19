import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 321, written to the Day 1 standard.
 *
 * Paul's grief for Israel, God's mercy on his own terms, the stumbling stone,
 * and then the olive tree: Israel's fall opening the door to the Gentiles
 * without shutting the door on Israel. Six blocks across Romans 9, 10, 11.
 */

const romansNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 9:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const romansTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 10:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

const romansEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 11:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 321,
  title: "Israel, Mercy, and God's Plan",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 321.", 700],
    ["Yesterday ended with a question. What about the people this was promised to first, and didn't believe it?", 800],
    ["Paul spends three chapters on that question, and he doesn't dodge any part of it.", 800],
    ["Grief for his own people. Hard words about mercy and choice. Then a door that swings open to you because of their stumble.", 850],
    ["It ends somewhere you won't expect. Praise, not an answer wrapped in a bow.", 850],
    ["We are in Romans 9, 10, and 11.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    romansNine(1, 13, [
      "Paul opens with something rare for him. Not an argument. Grief. He says he could wish himself cursed, cut off from Christ, if it would save his own people.",
      "And he lists everything Israel was given first. The adoption, the glory, the covenants, the law, the promises, even the Messiah by natural descent. And still most of them missed him.",
      "So he draws a line inside Israel itself. Not everyone born from Abraham is automatically a child of the promise. Isaac was the promised son. Ishmael wasn't, even though he was Abraham's too.",
      "Then Jacob and Esau, before either one had done anything good or bad. The elder shall serve the younger. Paul's point isn't really about those two men. It's that the promise never ran on human effort or birth order to begin with.",
    ]),
    romansNine(14, 33, [
      "Paul asks the question you're already forming. Is that unfair of God? God forbid, he says, and points back to Moses. I will have mercy on whom I will have mercy.",
      "Then Pharaoh, raised up and hardened, used to display God's power to the whole earth. Paul doesn't soften it. He asks who you are, a piece of clay, to talk back to the one who shaped you.",
      "But he turns the potter and the clay toward mercy, not only judgment. Vessels prepared for glory, made up of Jews and Gentiles both, exactly what the prophets already said would happen. I will call them my people, which were not my people.",
      "And he ends on a stumbling stone. Israel chased righteousness by working for it and missed it. The Gentiles who weren't even chasing it got there by simple faith. Whosoever believeth on him shall not be ashamed.",
    ]),
    romansTen(1, 13, [
      "Paul says plainly what's driving all of this. His heart's desire and his prayer to God for Israel is just that they might be saved. He isn't distant from them. He's grieving out loud.",
      "They have real zeal for God, he says, but not according to knowledge. They kept trying to establish their own righteousness instead of receiving the righteousness God was already offering.",
      "Christ is the end of the law for righteousness, to everyone that believeth. You don't have to climb to heaven or go down to the grave to bring him near. The word is already near you, in your mouth and in your heart.",
      "Confess with your mouth the Lord Jesus, believe in your heart that God raised him from the dead, and you shall be saved. And Paul makes sure you hear the next line. No difference between Jew and Greek. Whosoever shall call upon the name of the Lord shall be saved.",
    ]),
    romansTen(14, 21, [
      "Paul walks the chain backward. How shall they call on him in whom they haven't believed? How shall they believe without hearing? How shall they hear without a preacher? How shall anyone preach unless they're sent?",
      "So faith cometh by hearing, and hearing by the word of God. That's not abstract for Paul. It's the reason he keeps going out, again and again, at real cost to himself.",
      "Then he answers the obvious objection. Did Israel not hear? They heard. Their sound went out into all the earth. This was never a failure of information reaching them.",
      "Isaiah already said it would go this way, and Paul quotes it straight. All day long I have stretched forth my hands unto a disobedient and gainsaying people. God kept reaching. Not everyone reached back.",
    ]),
    romansEleven(1, 24, [
      "Paul asks the question hanging over this whole section. Hath God cast away his people? God forbid. He points to himself. He's an Israelite too, and he hasn't been cast off.",
      "He remembers Elijah, who thought he was the last faithful man left, and God corrected him. I have reserved to myself seven thousand men who never bowed the knee to Baal. There's always a remnant, kept by grace, not by their own effort.",
      "Then the picture he builds for the rest of the chapter. Israel is an olive tree. Some branches were broken off through unbelief, and a wild branch, meaning you, if you're not Jewish, got grafted in where they had been.",
      "So don't get proud about it, he warns. Thou bearest not the root, but the root thee. And if God did not spare the natural branches when they turned away, don't assume you're safe just for being new to the tree.",
    ]),
    romansEleven(25, 36, [
      "Paul calls this a mystery, so nobody gets wise in their own opinion about it. Blindness in part has happened to Israel, only until the fulness of the Gentiles has come in.",
      "And then, he says, all Israel shall be saved. Their fall opened the door to you. Their restoration is still coming, because the gifts and calling of God are without repentance. He doesn't take back what he's given.",
      "He circles the whole argument once more. You obtained mercy through their unbelief, and one day they'll obtain mercy the same way, through the mercy shown to you. Everybody ends up standing on mercy, not merit.",
      "And it's too much for him to keep explaining, so he just breaks into praise. O the depth of the riches both of the wisdom and knowledge of God. Of him, and through him, and to him, are all things. To whom be glory for ever.",
    ]),
  ],
  closing: [
    ["So that is Day 321.", 700],
    ["Paul started this section in tears over his own people, and ends it on his knees in praise.", 800],
    ["In between, he doesn't hand you a tidy formula. He says God shows mercy on his own terms, and that Israel's stumble is the very thing that opened the door for you.", 850],
    ["The olive tree is the picture to keep. You're not the root. You were grafted in. Stay humble about that, not proud.", 850],
    ["And the door back for Israel was never shut for good. Their gifts and their calling don't get taken back.", 850],
    ["Tomorrow, Romans 12 through 14. After eleven chapters of doctrine, Paul finally says, now here's what to do with it.", 850],
    ["For now, sit with the line that ends this section.", 750],
    ["Of him, and through him, and to him, are all things.", 800],
    ["To him be the glory forever.", 1200],
  ],
};
