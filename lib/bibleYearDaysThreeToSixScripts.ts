import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Days 3-6, written to the Day 1 standard. See
 * docs/bible-year-day-1-audio-standard.md.
 *
 * Block boundaries follow the app's section structure except where it would
 * hurt the audio: Genesis 7:11-17 / 7:17-24 overlap in the lesson data and
 * would read verse 17 twice, so this uses 7:11-16.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 3,
  title: "Noah Builds the Ark",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 3. And today the Bible does something that surprises people.", 650],
    ["It slows down and reads you a list of names.", 800],
    ["Ten generations. Fathers and sons. How long each one lived.", 700],
    ["And then, at the end of every single life but one, the same three words.", 900],
    ["And he died.", 1150],
    ["Today we are walking through Genesis 5, 6, and 7. A family tree, a world that goes wrong, and one man who builds a boat.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(5, 1, 5, [
      "Before Genesis starts counting deaths, it reminds you of something. God made human beings in His own likeness.",
      "That is the frame around everything you are about to hear. These are not statistics. Every name on this list carries the image of God.",
      "Then Adam lives, and has children, and dies. The first death in the chapter belongs to the first man.",
      "Yesterday you watched sin enter. Today you watch what it does over time.",
    ]),
    g(5, 6, 20, [
      "Now the rhythm sets in. He lived. He had sons and daughters. He died.",
      "It can feel like a list to skip past. Do not skip it. That repeating sentence is the whole point.",
      "God said, in the day you eat of it you will surely die. This chapter is that sentence playing out across centuries.",
      "The years are long. The ending never changes.",
    ]),
    g(5, 21, 24, [
      "And then the rhythm breaks.",
      "Enoch walked with God, and he was not, for God took him.",
      "No death. Just a man who walked with God so closely that one day he was simply with Him.",
      "In a chapter built out of funerals, God plants one sentence saying death is not actually how this ends.",
    ]),
    g(5, 25, 32, [
      "Lamech names his son Noah, and says this one will bring us comfort from the ground the Lord has cursed.",
      "A father looks at a tired world and hopes his son will be the relief.",
      "That hope is real, and it is also too small. Noah does not lift the curse. But he is the one God will use.",
      "The last name on the list is the first name of the next story.",
    ]),
    g(6, 1, 8, [
      "Now the wrongness spreads, until Genesis says something almost unbearable. Every intention of the human heart was only evil continually.",
      "And God is grieved. Not annoyed. Grieved. It says it hurt Him in His heart.",
      "Stop on that. This is not a distant God watching a broken planet from a safe height. This is a God who feels what we have done to it.",
      "And then, at the end of the darkest paragraph in the Bible so far, eight words. But Noah found favor in the eyes of the Lord.",
    ]),
    g(6, 9, 13, [
      "Noah walked with God. The same phrase used for Enoch.",
      "It does not say Noah was perfect. It says he walked with God in a generation where nobody else was.",
      "That is usually what faithfulness looks like. Not spectacular. Just continuing, when continuing has stopped making sense to everyone around you.",
      "Then God tells him what is coming.",
    ]),
    g(6, 14, 22, [
      "Then come the measurements. Length. Width. Height. Rooms. Pitch inside and out. One door. One window.",
      "Genesis hands you a building plan, because this is not a symbol. It is a boat, built by hand, over years, in front of neighbors.",
      "And listen to what is buried inside the instructions. I will establish my covenant with you. Judgment is coming, and so is a covenant.",
      "The chapter ends with the whole man in one line. Thus Noah did. According to all that God commanded him, so he did.",
    ]),
    g(7, 1, 10, [
      "God says come. Not go. Come into the ark.",
      "That is an invitation from inside. God is not sending Noah away from danger. He is calling him toward safety where He already is.",
      "The animals come. The family goes in. And then seven days of waiting, with the boat loaded and the sky still clear.",
      "Sometimes obedience is finished and nothing has happened yet. That week must have been very long.",
    ]),
    g(7, 11, 16, [
      "Then it starts. The fountains of the great deep burst open, and the windows of the sky are opened.",
      "Remember Genesis 1. God separated the waters to make room for a world. Here the waters come back together. This is creation being undone.",
      "And then one small sentence carrying enormous weight. The Lord shut him in.",
      "Noah built the boat. God closed the door. Noah never had to hold it shut.",
    ]),
    g(7, 17, 24, [
      "The water rises and keeps rising, until the mountains are covered and everything that breathed is gone.",
      "Genesis does not celebrate this. It reads like grief. This is what the world had become.",
      "And in the middle of all that water, one sentence stays afloat. Only Noah was left, and those who were with him in the ark.",
      "Judgment is real in this chapter. So is the boat God told him to build before the first drop ever fell.",
    ]),
  ],
  closing: [
    ["So that is Day 3.", 700],
    ["A list of deaths. A world that went wrong. And a man who spent years building something that must have looked ridiculous.", 700],
    ["But notice the shape of it. Before the flood ever came, God had already given the plan, already named the covenant, already opened the door.", 800],
    ["Rescue was prepared before judgment arrived. That is not an accident. That is how God works all the way through this book.", 750],
    ["And if today you feel like Enoch in a chapter full of endings, or like Noah building something nobody understands, Genesis saw both of those lives.", 800],
    ["God noticed the man who walked with Him when no one else did.", 850],
    ["Tomorrow we step into Genesis 8, 9, and 10. The water goes down, the door opens, and God puts a rainbow in the sky.", 850],
    ["For now, the rain is falling.", 800],
    ["The door is shut.", 750],
    ["And God shut it.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 4,
  title: "Life After the Flood",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Yesterday we left you in the worst place this book has gone so far. Water over everything, and one boat.", 700],
    ["Today the water goes down.", 900],
    ["But this is not a story about weather.", 700],
    ["It starts with three words.", 1000],
    ["God remembered Noah.", 1150],
    ["Today we are walking through Genesis 8, 9, and 10. A dove, an altar, a rainbow, and a long list of nations that matters more than it looks.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(8, 1, 5, [
      "God remembered Noah. That does not mean God had forgotten him.",
      "In the Bible, to remember is not about memory. It is about acting on a promise. When God remembers someone, something starts to move.",
      "And what moves is a wind over the waters. The same picture as Genesis 1, when the Spirit hovered over the deep. God is making a world again.",
      "The water goes down slowly. Months pass. Rescue is real, and it is not instant.",
    ]),
    g(8, 6, 14, [
      "Noah opens a window and sends out a raven, and then a dove. The dove finds nowhere to rest, and comes back to his hand.",
      "There is something tender in that. A tired bird returning to the one place left that will still hold it.",
      "Seven days later he sends her again, and she comes back with a fresh olive leaf. Something is growing out there.",
      "Then a third time, and she does not come back at all. That silence is the good news.",
    ]),
    g(8, 15, 19, [
      "Noah waits for God to tell him to leave, the same way he waited to be told to go in.",
      "The ground had been dry for weeks before that door opened. He could have gone. He waited.",
      "Then God says go out, and bring every living thing with you, so they may breed abundantly and multiply on the earth.",
      "Be fruitful and multiply. The words of Genesis 1, spoken again on the other side of the flood.",
    ]),
    g(8, 20, 22, [
      "The first thing Noah does on dry ground is build an altar.",
      "Not a house. Not a fence. An altar.",
      "And God says He will not curse the ground again because of humanity, even though the human heart is still what it is.",
      "Read that carefully. The reason for the mercy is not that people got better. God simply decides to hold the world steady.",
    ]),
    g(9, 1, 7, [
      "God blesses Noah and repeats the commission. Fill the earth.",
      "But the world is different now. There is fear between people and animals. There are rules about blood, and about life.",
      "And here is the line at the center of it. Whoever sheds man's blood, by man his blood shall be shed, for God made man in His own image.",
      "Human life is protected because of what a human being is. That has not changed since Genesis 1, and it does not change after this.",
    ]),
    g(9, 8, 17, [
      "Now God makes a covenant, and notice who it is with. Noah, his sons, every living creature, and the earth itself.",
      "Nobody is asked to do anything in return. This is a promise God makes and God keeps.",
      "And He hangs His bow in the clouds. A war bow, pointed away.",
      "Listen to the reason He gives. When the bow is in the clouds, I will look at it, and remember. The rainbow is not there to remind you. It is there so that God will look at it.",
    ]),
    g(9, 18, 29, [
      "And then the man who survived the flood plants a vineyard, drinks too much, and lies uncovered in his tent.",
      "The flood washed away the world. It did not wash away the human heart.",
      "That is the honest thing about Genesis. It refuses to clean up its heroes.",
      "Whatever the fresh start was going to be, it was never going to be a better man. It was always going to have to be a better rescue.",
    ]),
    g(10, 1, 14, [
      "Then a long list of names, and it is easy to hear this as filler. It is not.",
      "This is the world map of the ancient reader. Every nation they had ever heard of, traced back to one family in one boat.",
      "Genesis is quietly saying there is no such thing as a foreign people. Everyone on this list has the same great-grandfather.",
      "Nimrod turns up here too, a mighty hunter and a builder of cities. Power reappears fast.",
    ]),
    g(10, 15, 32, [
      "The names keep going, spreading out into lands and languages and coastlines.",
      "The command was fill the earth, and the earth is filling.",
      "Hold on to one thing as this list runs out. Every nation in it matters to the story God is telling.",
      "Because in two chapters, God is going to reach into one of them, pull out one man, and promise to bless all of them through him.",
    ]),
  ],
  closing: [
    ["So that is Day 4.", 700],
    ["The water goes down. The door opens. An altar goes up. And God makes a promise to a world that has not earned it.", 700],
    ["The rainbow is the thing to carry out of today. Not because it is pretty, but because of what God said it is for.", 800],
    ["I will look at it, and remember. The promise is held on God's side of the sky.", 750],
    ["And then, almost immediately, Noah fails. Genesis puts those two things next to each other on purpose.", 800],
    ["The world is steady because God is steady. Not because we are.", 850],
    ["Tomorrow we step into Genesis 11, 12, and 13. A tower, a scattering, and a man told to leave everything and go.", 850],
    ["For now, look up.", 800],
    ["The bow is in the clouds.", 750],
    ["And God is looking at it.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 5,
  title: "The Obedience of Abraham",
  opening: [
    ["Hey. Glad you came back.", 700],
    ["Day 5, and today the Bible narrows down.", 650],
    ["Up to now it has been the whole world. Creation. The flood. Every nation on the map.", 700],
    ["Today it stops being about everyone.", 900],
    ["And starts being about one man.", 1000],
    ["Who is told to leave.", 1150],
    ["We are walking through Genesis 11, 12, and 13. A tower that could not reach, and a promise that reaches everybody.", 650],
    ["Take a breath. This is where the whole rescue plan starts.", 900],
  ],
  blocks: [
    g(11, 1, 9, [
      "One language. One place. And a plan. Let us build a tower with its top in the sky, and make a name for ourselves.",
      "The problem is not the building. It is the reason. They were told to fill the earth. They decided to stay put and be famous instead.",
      "And then one of the quietly funny moments in Scripture. God comes down to see the tower that reaches the heavens.",
      "The tower that touched the sky was so small that God had to stoop to look at it.",
    ]),
    g(11, 10, 26, [
      "Another genealogy, and this one is going somewhere specific.",
      "Watch the numbers as they go by. The lifespans keep shrinking. The world is winding down.",
      "The list walks from Shem, one generation at a time, toward a man named Abram.",
      "God's answer to a scattered world is not a bigger tower. It is one family.",
    ]),
    g(11, 27, 32, [
      "Now the details get personal, and painful. Haran dies before his father. Sarai is barren, and Genesis says it plainly and early.",
      "This is the family God is about to build a nation out of. A dead son, an empty womb, and a father who stops halfway.",
      "Terah sets out for Canaan and settles in Haran instead. He gets partway, and stays.",
      "That is a real temptation, and an old one. To leave what you were in, and stop before you arrive.",
    ]),
    g(12, 1, 3, [
      "Then God speaks, and everything in this book turns.",
      "Go. Leave your country, your relatives, and your father's house, and go to the land that I will show you.",
      "Notice He does not say where. Abram has to leave before he is told the destination.",
      "And then the promise. In you all the families of the earth will be blessed. Remember that long list of nations yesterday? This is God's answer to it.",
    ]),
    g(12, 4, 9, [
      "So Abram went. Two words, carrying seventy-five years of life behind them.",
      "He arrives, and the land is already full of other people. God says, to your offspring I will give this land, to a man with no offspring, standing in someone else's country.",
      "And Abram builds an altar. Then he moves, and builds another one.",
      "He does not own any of it yet. He worships anyway.",
    ]),
    g(12, 10, 20, [
      "Then a famine comes, and the man of faith goes down to Egypt and tells his wife to lie.",
      "He is afraid they will kill him to get to her, so he calls her his sister, and she is taken into Pharaoh's house.",
      "This is the same man who left everything on the strength of a promise. Faith and fear can live in the same person in the same week.",
      "And notice who fixes it. Not Abram. God protects Sarai, and Pharaoh ends up being the one asking what Abram has done.",
    ]),
    g(13, 1, 4, [
      "Abram comes back up out of Egypt, and goes to the place where his tent had been at the beginning.",
      "Back to the altar he built before he ran.",
      "And there he calls on the name of the Lord.",
      "Sometimes returning is not dramatic. It is just going back to the last place you knew what you were doing.",
    ]),
    g(13, 5, 13, [
      "The land cannot hold both households, and the herdsmen start fighting.",
      "And Abram, who holds the promise and the seniority, gives away the choice. You take whichever way you want, and I will go the other.",
      "Lot looks at the well-watered plain and takes it. Then Genesis adds a quiet warning. The men of Sodom were exceedingly wicked.",
      "Lot chose by what looked good. That is exactly how the fruit was chosen in Genesis 3.",
    ]),
    g(13, 14, 18, [
      "The moment Lot walks away, God speaks again. Lift up your eyes, and look.",
      "Abram let go of the best-looking land, and God tells him to look in every direction, because all of it is coming to him.",
      "Then, walk through the length and the width of it. Not conquer it. Walk it.",
      "He is being told to live inside a promise he cannot hold yet.",
    ]),
  ],
  closing: [
    ["So that is Day 5.", 700],
    ["A tower that could not reach. A family that could not have children. And a man who left without a map.", 700],
    ["The entire rescue plan of the Bible turns on one sentence in Genesis 12. In you all the families of the earth will be blessed.", 800],
    ["Every nation in that long list yesterday. All of them. Through one man who was told to go, and did not know where.", 800],
    ["And he was not a hero about it. He lied in Egypt inside the same chapter.", 750],
    ["God kept the promise anyway. That is the pattern for the rest of this book.", 850],
    ["Tomorrow we step into Genesis 14 and 15. A war, a rescue, and a night sky full of stars.", 850],
    ["For now, hear the first word again.", 800],
    ["Go.", 750],
    ["And he went.", 1200],
  ],
};

export const BIBLE_YEAR_DAY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 6,
  title: "The Rescue of Lot",
  opening: [
    ["Hey. Good to see you back.", 700],
    ["Day 6. Yesterday Abram gave away the best land and let his nephew choose first.", 700],
    ["Today that choice costs Lot everything.", 800],
    ["And Abram goes and gets him.", 900],
    ["Then, that same night, God does something He does nowhere else in Scripture.", 1000],
    ["He signs a covenant alone.", 1150],
    ["We are walking through Genesis 14 and 15. Stay with me for the end of this one. It matters more than almost anything so far.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(14, 1, 11, [
      "Four kings against five. Names most of us have never heard, fighting over territory in a valley.",
      "It reads like a page torn out of an ancient history book, because that is what it is.",
      "They win, they strip Sodom and Gomorrah of everything, and they leave.",
      "And then one sentence turns a regional war into a family emergency.",
    ]),
    g(14, 12, 17, [
      "Lot chose Sodom because it looked good. Now Sodom's trouble is his trouble.",
      "And Abram, who handed Lot the first choice and took the leftovers, arms three hundred and eighteen men and goes after an army.",
      "He does not send a message. He does not wait to see how it turns out. He goes.",
      "Notice what Genesis calls him here. Abram the Hebrew. The one from the other side. He does not belong to this land, and he fights for it anyway.",
      "He brings back all of it. The goods, the people, and Lot.",
    ]),
    g(14, 18, 24, [
      "On the road home two kings come out to meet him, and they could not be more different.",
      "Melchizedek, king of Salem, priest of God Most High, brings out bread and wine and blesses him. Abram gives him a tenth of everything.",
      "Then the king of Sodom makes an offer. Keep the wealth, just give me back the people.",
      "And Abram will not take a thread or a sandal strap. He says it plainly. So that you will never be able to say, I made Abram rich.",
      "He has already decided where his life is going to come from, and it is not going to be Sodom.",
    ]),
    g(15, 1, 3, [
      "After all of that, God says, do not be afraid, Abram. I am your shield, and your exceedingly great reward.",
      "And Abram answers with the most honest thing he has said yet.",
      "Lord Yahweh, what will you give me, since I go childless?",
      "He does not say thank you. He says, You keep promising me descendants, and my house is still empty.",
      "God does not rebuke him for that. Remember that the next time you think your honesty is too much for God to hold.",
    ]),
    g(15, 4, 6, [
      "God takes him outside.",
      "Look up at the sky, and count the stars, if you are able to count them. So will your offspring be.",
      "The promise stops being a sentence and becomes something he is standing underneath.",
      "And then one of the most important verses in the entire Bible. He believed the Lord, and He credited it to him as righteousness.",
      "Not what he built. Not what he won in battle. He believed God, and God counted it.",
    ]),
    g(15, 7, 11, [
      "Then Abram asks how he can know, and God answers by making a covenant the old way.",
      "Animals are cut in half and laid facing each other, with a path left open between them.",
      "In the ancient world, both parties walked that path together. It meant, if I break this, let what happened to these animals happen to me.",
      "Abram drives the birds of prey away from the pieces, and waits.",
      "Then the sun starts going down.",
    ]),
    g(15, 12, 21, [
      "A deep sleep falls on him, and a horror of great darkness. God tells him the truth about the future, including four hundred years of slavery before any of this lands.",
      "And then, in the dark, a smoking furnace and a flaming torch pass between the pieces.",
      "Abram never walks the path. God walks it. Alone.",
      "God takes both sides of the agreement. If this covenant fails, let it fall on Me.",
      "Abram was asleep for the most important moment of his life. The covenant was never resting on him.",
    ]),
  ],
  closing: [
    ["So that is Day 6.", 700],
    ["A rescue, a refusal, a night sky, and a promise God signed by Himself.", 700],
    ["Two things to carry out of today.", 700],
    ["Abram believed God, and it was credited to him as righteousness. That sentence gets quoted for the rest of the Bible, because it is how anyone has ever been made right with God.", 850],
    ["And then God walked that covenant path alone while Abram slept, taking the cost of a broken promise onto Himself.", 850],
    ["If you have ever wondered whether your grip on God is strong enough, Genesis 15 is your answer. He was unconscious.", 850],
    ["Tomorrow we step into Genesis 16 and 17. Waiting gets long, people take shortcuts, and God hands out new names.", 850],
    ["For now, go outside if you can.", 800],
    ["Look up.", 750],
    ["He is still counting.", 1200],
  ],
};
