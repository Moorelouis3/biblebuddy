import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Days 7-10, written to the Day 1 standard.
 *
 * Day 9 covers four chapters - the heaviest reading of the first ten days - so
 * its 25 lesson sections are consolidated into 11 audio blocks and the teaching
 * runs two lines each. Twenty-five spoken reference announcements alone would
 * have pushed it past the runtime ceiling.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 7,
  title: "The Covenant Promise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 7. And today is about what happens while you wait.", 700],
    ["God made a promise in Genesis 12. It is now more than ten years later.", 750],
    ["Nothing has happened.", 900],
    ["So the family does something reasonable.", 1000],
    ["And it costs them for generations.", 1150],
    ["We are walking through Genesis 16 and 17. A shortcut, a runaway, and two new names.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 6, [
      "Ten years have gone by since the promise. Ten years of counting stars and nothing happening.",
      "So Sarai does the reasonable thing. She has a plan, a servant, and a culture that says this is exactly how you solve it.",
      "And Abram listened to the voice of Sarai. Genesis uses almost the same words it used in chapter 3, when Adam listened to his wife and took the fruit.",
      "It works, and it goes wrong immediately. Hagar despises Sarai. Sarai blames Abram. Abram steps back and lets it happen.",
      "Nobody in this scene is a villain. They are just tired of waiting. And the shortcut costs all three of them.",
    ]),
    g(16, 7, 14, [
      "Hagar runs. A pregnant slave, alone in the desert, heading nowhere in particular.",
      "And the angel of the Lord finds her by a spring, calls her by name, and asks where she has come from and where she is going.",
      "She is the first person in the Bible to be given this kind of promise about her child. A runaway foreign slave woman.",
      "And she does something nobody else in Scripture does. She gives God a name. You are the God who sees me.",
      "God went after the person the story had discarded. That happens again and again in this book. Start watching for it.",
    ]),
    g(16, 15, 16, [
      "Ishmael is born, and Abram is eighty-six years old.",
      "Genesis gives you that number for a reason.",
      "Because the next thing that happens takes thirteen more years, and Scripture crosses them in a single line.",
      "Thirteen years of silence after a shortcut. And then God speaks again.",
    ]),
    g(17, 1, 8, [
      "God says, I am God Almighty. Walk before me, and be blameless.",
      "And Abram falls on his face. He is ninety-nine now. The promise is twenty-four years old and has still not arrived.",
      "Then God changes his name. Abram, exalted father, becomes Abraham, father of a multitude.",
      "Think about carrying that name around. Every introduction for the rest of his life announces a promise he cannot see yet.",
      "He will say father of many, and someone will ask how many children he has, and the answer is one, by the wrong plan.",
    ]),
    g(17, 9, 14, [
      "Then God gives a sign, and this time it is not a rainbow. It is cut into the body.",
      "Every male in the household, including the servants and the foreigners bought with money. The mark goes on everyone in the house, not only the bloodline.",
      "It is permanent, it is private, and it is carried in the part of the body through which the promised offspring will come.",
      "This covenant is not a feeling he has to maintain. It is written on them.",
    ]),
    g(17, 15, 22, [
      "Sarai becomes Sarah, princess. And God says, I will bless her, and she will be a mother of nations.",
      "And Abraham laughs. Face on the ground, laughing at God, doing the arithmetic. A hundred years old. Sarah is ninety.",
      "Then he offers God a compromise. Let Ishmael be the one. He is here. He is real. He already exists.",
      "God says no, and He says it kindly. Sarah your wife will bear you a son, and you shall call his name Isaac.",
      "Isaac means laughter. God takes the sound of Abraham's disbelief and makes it the boy's name.",
    ]),
    g(17, 23, 27, [
      "And in that very same day, Abraham does it. Every male in his household, and himself at ninety-nine.",
      "He laughed in the morning and obeyed in the afternoon.",
      "Both of those are allowed to be true about the same person on the same day.",
      "God had named the timing. Abraham marked his entire household before a single piece of evidence had arrived.",
    ]),
  ],
  closing: [
    ["So that is Day 7.", 700],
    ["A shortcut, a runaway, two new names, and a laugh.", 700],
    ["Here is what I want you to notice about this day. Nobody in it behaves well.", 750],
    ["Sarai schemes. Abram goes along with it and then steps aside. Hagar despises. Abraham laughs in God's face and tries to renegotiate.", 800],
    ["And God does not withdraw the promise from any of them. He renames them instead.", 850],
    ["The God who sees ran after a slave woman in a desert. The God who promises gave an old man a name he could not live up to yet.", 850],
    ["Tomorrow we step into Genesis 18, 19, and 20. Three visitors, a bargain, and a city that runs out of time.", 850],
    ["For now, sit with the name.", 800],
    ["Father of many.", 750],
    ["He had one son, and God said many.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 8,
  title: "Sodom and Gomorrah",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 8, and this is a heavy one. Fair warning.", 700],
    ["But do not skip it, because two things sit side by side in these chapters.", 750],
    ["A God who will spare a whole city for ten people.", 800],
    ["And a God who finally answers an outcry.", 1000],
    ["Both of those are the same God.", 1150],
    ["We are walking through Genesis 18, 19, and 20. A meal under a tree, a bargain, and fire.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(18, 1, 8, [
      "Abraham is sitting in his tent door in the heat of the day, and three men are suddenly standing there.",
      "He runs. A ninety-nine-year-old man runs to meet them, hurries Sarah, and runs to the herd.",
      "He offers a little bread and then serves a feast. That is how hospitality worked, and it is also just who he is.",
      "He does not know yet what this visit is.",
    ]),
    g(18, 9, 15, [
      "They ask where Sarah is, and then the promise finally gets a date on it. At this time next year.",
      "Sarah is listening at the tent door, and she laughs to herself. Not out loud. Inside.",
      "And the visitor answers the laugh she never said. Why did Sarah laugh? Is anything too hard for the Lord?",
      "She is frightened, and denies it. He does not argue. He just says, no, you did laugh. Being fully known is uncomfortable before it is comforting.",
    ]),
    g(18, 16, 21, [
      "Then God says something remarkable. Shall I hide from Abraham what I am about to do?",
      "God decides to tell him. Not because Abraham needs the information, but because of what God has chosen him for.",
      "He is being brought into the conversation, not handed the result.",
      "The outcry against Sodom is great, and God says He will go down and see.",
    ]),
    g(18, 22, 33, [
      "And then Abraham does something nobody has done in this book yet. He argues with God, and God lets him.",
      "Will you sweep away the righteous with the wicked? Fifty. Forty-five. Forty. Thirty. Twenty. Ten.",
      "Watch what he is actually doing. Every step, he is testing whether God's mercy has a floor. It never bottoms out.",
      "And notice who stops the conversation. Abraham does. Ten was never God's limit. It was just where Abraham stopped asking.",
    ]),
    g(19, 1, 11, [
      "Lot is sitting in the gate of Sodom now, which means he has a seat among its leaders. He did not just move near it. He moved in.",
      "The visitors arrive, and the whole city, young and old, surrounds the house.",
      "This is what the outcry was about. Genesis is not describing a city with bad opinions. It is describing a mob at a door.",
      "And Lot, trying to protect his guests, offers them his daughters instead. There is nobody clean in this scene.",
    ]),
    g(19, 12, 22, [
      "The angels tell Lot to get everyone out, and his sons-in-law think he is joking.",
      "Then morning comes, and Lot lingers. He hesitates. He is being pulled out of a city about to burn, and he slows down.",
      "So the men take him by the hand, and his wife, and his two daughters, because the Lord was merciful to him.",
      "Read that again. He did not walk out. He was led out by the hand, because God was merciful.",
    ]),
    g(19, 23, 29, [
      "Fire falls, and the cities and the whole plain go with it, and everything that grew on the ground.",
      "Lot's wife looks back and becomes a pillar of salt. One sentence, no explanation. She got out of the city. The city did not get out of her.",
      "Abraham goes back up to the place where he had stood before the Lord, and looks down at the smoke.",
      "And Genesis tells you why anyone survived at all. God remembered Abraham, and sent Lot out.",
    ]),
    g(19, 30, 38, [
      "What follows is ugly, and Genesis refuses to soften it. Lot's daughters get their father drunk and take turns with him.",
      "They came out of Sodom. Sodom did not come out of them.",
      "The sons born from it become Moab and Ammon, two nations that will fight Israel for centuries.",
      "This is the family that picked the well-watered plain because it looked good.",
    ]),
    g(20, 1, 18, [
      "And then, right after all of that, Abraham tells the exact same lie he told in Egypt. She is my sister.",
      "Same fear, same lie, twenty-five years later. After the name change. After the covenant. After arguing God down to ten.",
      "Growth is not a straight line. Old fears come back to people who should have outgrown them.",
      "And once again God protects Sarah, and a pagan king ends up correcting the prophet.",
    ]),
  ],
  closing: [
    ["So that is Day 8.", 700],
    ["A meal under a tree. A bargain over a city. Fire. And a man led out by the hand.", 700],
    ["Two pictures sit right next to each other in these chapters, and you are meant to see both.", 750],
    ["God is willing to spare an entire city for ten righteous people. And God is willing to end one that had none.", 850],
    ["Judgment here is not God losing His temper. It is God finally answering an outcry that had been going up for a long time.", 850],
    ["And in the middle of it, mercy takes a hesitating man by the hand and pulls.", 850],
    ["Tomorrow we step into Genesis 21 through 24. The promise finally arrives, and then God asks for it back.", 850],
    ["For now, remember how the bargaining ended.", 800],
    ["Abraham stopped asking.", 750],
    ["God never said no.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 9,
  title: "Abraham's Test and Legacy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 9. Four chapters today, and one of them is the hardest thing we have read so far.", 750],
    ["Twenty-five years of waiting end in a single sentence.", 800],
    ["And then God asks for the boy back.", 1000],
    ["Stay with me through it.", 1150],
    ["We are walking through Genesis 21, 22, 23, and 24. A birth, a mountain, a grave, and a well.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(21, 1, 7, [
      "The Lord visited Sarah as He had said, and did what He had spoken. Twenty-five years of waiting, closed in one sentence.",
      "And Sarah says, God has made me laugh. The laugh that was disbelief two chapters ago is joy now. Same sound, different meaning.",
    ]),
    g(21, 8, 21, [
      "The household breaks. Sarah wants Hagar and the boy gone, and it grieves Abraham deeply, because Ishmael is his son too.",
      "And out in the wilderness, when the water is gone and she cannot bear to watch him die, God hears the voice of the child. The God who saw her at the spring is hearing her again.",
    ]),
    g(21, 22, 34, [
      "Abimelech comes to make a treaty, and says the reason out loud. God is with you in everything you do. Then Abraham plants a tamarisk tree and calls on the name of the Everlasting God. A man who owns almost none of this land plants something slow.",
    ]),
    g(22, 1, 8, [
      "God says, take your son, your only son, whom you love. Every one of those words is a knife, and God says all of them.",
      "And then Isaac asks the question. Where is the lamb? Abraham answers, God will provide Himself the lamb. He says it before he has any idea it is true.",
    ]),
    g(22, 9, 14, [
      "He binds his son, and takes the knife, and the voice stops him. Now I know that you fear God.",
      "And behind him, a ram caught in a thicket. It was already there. It had been there the entire climb.",
    ]),
    g(22, 15, 19, [
      "The promise is repeated, and this time God swears by Himself, because there is nobody greater to swear by.",
      "In your offspring all the nations of the earth will be blessed. The blessing meant for everybody runs straight through this mountain.",
    ]),
    g(23, 1, 20, [
      "Sarah dies, and Abraham weeps for her. Then he buys a cave, refusing to be given it, paying full price in front of witnesses. The only ground he ever owns in the promised land is a grave.",
    ]),
    g(24, 1, 14, [
      "Abraham sends his servant to find a wife for Isaac, and makes him swear not to take Isaac back to the old country. The servant prays a very specific prayer at a well. Let the girl who offers to water the camels be the one. Ten camels is hours of hard work.",
    ]),
    g(24, 15, 33, [
      "Before he has even finished praying, Rebekah comes out, and she offers to water the camels. The servant watches in silence, then bows his head and worships right there at the well.",
    ]),
    g(24, 34, 49, [
      "Then the servant tells the whole story again to her family, at length. That is how Genesis underlines something. When the Bible repeats itself this carefully, it is telling you to pay attention.",
    ]),
    g(24, 50, 67, [
      "The family says, this thing has come from the Lord. Then they do something unusual for the time. They ask Rebekah herself. Will you go with this man? And she says, I will go.",
      "She leaves everything for a man she has never met, out of the same country Abram left. And Isaac, out walking in the field at evening, looks up, and there are the camels coming.",
    ]),
  ],
  closing: [
    ["So that is Day 9.", 700],
    ["A baby, a mountain, a grave, and a well.", 700],
    ["Genesis 22 is the hardest chapter we have read, and it is the one the rest of the Bible keeps coming back to.", 800],
    ["A father, an only son, wood carried up a hill, and a substitute provided at the last possible moment.", 850],
    ["Abraham named that place The Lord Will Provide. Not the Lord provided. Will provide. He knew something was still coming.", 850],
    ["Tomorrow we step into Genesis 25, 26, and 27. Two brothers, a bowl of stew, and a blessing taken in the dark.", 850],
    ["For now, hold on to the ram.", 800],
    ["It was already in the thicket.", 750],
    ["It was there the whole way up.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_TEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 10,
  title: "Covenant Through Isaac",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 10. Abraham's story ends today, and his grandsons' story starts.", 750],
    ["And you are going to notice something uncomfortable.", 800],
    ["The same problems keep showing up.", 900],
    ["Same fears. Same lies. Same grabbing.", 1000],
    ["Three generations in.", 1150],
    ["We are walking through Genesis 25, 26, and 27. A funeral, a bowl of stew, and a blessing taken in the dark.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 18, [
      "Abraham dies at a hundred and seventy-five, old and full of years, and Genesis says he was gathered to his people.",
      "And Isaac and Ishmael bury him together. Two sons of a broken household, standing at the same grave.",
      "Then Ishmael's line is listed and honored. God said He would bless him, and God did.",
      "This story keeps its promises even to the people it moves away from.",
    ]),
    g(25, 19, 34, [
      "Rebekah is barren too. This family keeps having to wait on God instead of managing it themselves.",
      "The children struggle inside her, and God tells her the older will serve the younger. That is not how anything worked back then.",
      "Esau comes in from the field exhausted and sells his birthright for a bowl of stew. Genesis lists the aftermath fast on purpose. He ate, drank, rose up, and went his way.",
      "Then the verdict, in five words. So Esau despised his birthright. He did not lose it. He traded it for something warm right now.",
    ]),
    g(26, 1, 11, [
      "There is a famine, and God tells Isaac not to go down to Egypt. Stay in this land, and I will be with you.",
      "And then Isaac does the family thing. He tells the men of the place that his wife is his sister.",
      "The same lie, in the third generation. Fear gets handed down like a family recipe.",
      "And once again a pagan king is the one asking, what is this you have done to us?",
    ]),
    g(26, 12, 25, [
      "Isaac sows in that land and reaps a hundredfold, and grows so great that the Philistines envy him.",
      "So they fill his wells in with dirt. And Isaac digs them out again, and names them after the fights that follow. Contention. Enmity.",
      "He keeps moving, keeps digging, keeps giving ground, until finally there is room. He calls that one Rehoboth, and says, now the Lord has made room for us.",
      "There is a whole way of living in that. He never once fought for a well. He just kept digging.",
    ]),
    g(27, 1, 29, [
      "Isaac is old and blind and decides to bless Esau, and Rebekah overhears, and the family splits into two teams.",
      "Goatskin on the arms. Esau's clothes. His brother's name in his mouth. Jacob says, I am Esau your firstborn, straight to his blind father's face.",
      "Isaac asks four times, four different ways, whether this is really Esau. Something is wrong and he can feel it. He blesses him anyway.",
      "And here is the ache of it. God had already said the older would serve the younger. Jacob stole what he had already been promised.",
    ]),
    g(27, 30, 46, [
      "Esau comes in with the meal he was asked to make, and Genesis gives you one of the most painful lines in the book. He cried with an exceedingly great and bitter cry.",
      "Bless me, even me also, my father. And there is no undoing it.",
      "Esau plans to kill him, so Rebekah sends Jacob away. She tells him it will only be a few days.",
      "She never sees her son again. That is what the shortcut cost. It worked, and it emptied her house.",
    ]),
  ],
  closing: [
    ["So that is Day 10.", 700],
    ["A funeral, a birthright sold for soup, a well dug over and over, and a blessing taken in the dark.", 700],
    ["You have now watched three generations of the same family, and the same two things keep surfacing.", 800],
    ["They lie when they are afraid, and they grab at what God had already promised to give them.", 800],
    ["And God does not walk away from any of it. The covenant keeps moving through people who keep mishandling it.", 850],
    ["That is not God approving of what they did. That is God refusing to be stopped by it.", 850],
    ["Tomorrow we step into Genesis 28 and 29. Jacob runs, sleeps on a stone, and sees a ladder into heaven.", 850],
    ["For now, think about Isaac and those wells.", 800],
    ["They filled them in.", 750],
    ["He kept digging.", 1200],
  ],
};
