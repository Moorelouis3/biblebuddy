import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 77, written to the Day 1 standard.
 *
 * 2 Samuel 4-7 finishes what Day 76 started: Ish-bosheth's murder ends the
 * rival kingdom, David is finally anointed over all Israel and takes
 * Jerusalem, the ark comes home on the second try, and God answers David's
 * wish to build Him a house with a promise to build David one instead.
 * Seven blocks across four chapters, the last two splitting chapter 7.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 77,
  title: "David's Throne and God's Promise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 77. The rival kingdom David never wanted finally collapses on its own.", 750],
    ["He becomes king over all of Israel, takes a city nobody thought he could take, and brings the ark home.", 800],
    ["Then he offers God something, and God turns it around and gives him something bigger instead.", 850],
    ["We are in 2 Samuel 4 through 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 12, [
      "Two of Ish-bosheth's own captains sneak into his house at noon, while he's resting, and kill him in his bed. Then they cut off his head and run it to David like a gift.",
      "They expect a reward. David just watched an Amalekite try this exact move with Saul's crown, and executed him for it.",
      "So he does it again, only worse this time, because these two murdered a defenseless man in his own house rather than claim they'd finished someone already dying in battle.",
      "David has their hands and feet cut off and hangs their bodies up publicly. He will take the throne. He will not let anyone hand it to him in blood.",
    ]),
    g(5, 1, 16, [
      "All the tribes of Israel finally come to David at Hebron and say what's been true for years. Even when Saul was king, you were the one who led us out and brought us in.",
      "So they anoint him a third time. Privately by Judah, then as their king, now by the whole nation. The promise made to a shepherd boy is finally, fully here.",
      "Then he marches on Jerusalem, still held by the Jebusites, who are so confident in their walls they taunt him that even the blind and the lame could stop him. David takes it anyway and makes it his own city.",
      "Hiram of Tyre sends cedar and craftsmen to build him a palace. David realizes it himself. The Lord had established him king, and exalted his kingdom, for His people Israel's sake. Not for David's.",
    ]),
    g(5, 17, 25, [
      "The Philistines hear David is king over everyone now, and come looking for him immediately. A united Israel is a threat they didn't have to worry about before.",
      "David does not just assume he'll win because he's God's anointed. He asks first. Shall I go up? Wilt thou deliver them into mine hand? He gets a yes, and he wins.",
      "They come back a second time, same valley, and David asks again rather than repeating what worked last time. This time God tells him to circle around and wait for the sound of marching in the treetops.",
      "Two attacks, two different answers, two obediences instead of one formula. David keeps asking because he'd rather be told than guess.",
    ]),
    g(6, 1, 11, [
      "David goes to bring the ark of God to Jerusalem, and puts it on a new cart pulled by oxen. It looks careful. It is not what God commanded. The ark was always meant to be carried on poles, by Levites, on human shoulders.",
      "The oxen stumble, the cart shakes, and Uzzah reaches out to steady the ark with his hand. He is struck dead on the spot.",
      "David is angry, and then afraid. He asks a question that sounds almost bitter. How shall the ark of the Lord come to me?",
      "So he leaves it at the house of Obed-edom instead of bringing it the rest of the way. Even a good desire, done the wrong way, still costs something real.",
    ]),
    g(6, 12, 23, [
      "Three months later David hears the Lord has blessed Obed-edom's whole house because the ark stayed there, and he tries again. This time it's carried properly, with a sacrifice every six steps.",
      "David dances before the Lord with all his might, wearing a linen ephod like a priest, in front of the whole city. This is not a king protecting his dignity. This is a man who got it right the second time and can't hold still about it.",
      "Michal watches from a window and despises him in her heart. When he comes home to bless his household, she meets him with contempt instead. How glorious was the king of Israel today, uncovering himself like a common fellow.",
      "David tells her exactly why he doesn't care. It was before the Lord. And of the maidservants I will be had in honor. Saul's daughter has no children for the rest of her life. The house that judged David's worship does not get to share in what came after.",
    ]),
    g(7, 1, 17, [
      "David is settled in his cedar palace, at peace from his enemies, and it bothers him that the ark still sits inside a tent. I dwell in a house of cedar, but the ark of God dwelleth within curtains.",
      "Nathan tells him to go ahead, do all that is in thine heart. That very night, God tells Nathan something different.",
      "God has never asked for a house. He's been moving in a tent since Egypt, and never once complained to any judge He raised up. Then He turns David's offer completely around.",
      "I will make thee a house. Your son will build mine. Your throne will be established forever. Not because David earned it. Because God decided it, out loud, to a man who was only trying to give Him something back.",
    ]),
    g(7, 18, 29, [
      "David goes in and sits before the Lord, and what comes out is not celebration. It's disbelief. Who am I, O Lord God, and what is my house, that thou hast brought me hitherto?",
      "He doesn't ask for more once he hears the promise. He just keeps repeating it back to God like he can't quite believe it's real. Is this the manner of man, O Lord God?",
      "Then he asks God to do exactly what He already said He would do. Now therefore let it please thee to bless the house of thy servant, that it may continue forever before thee.",
      "The man who wanted to build God a house ends the day simply asking God to keep His word. Sometimes the most faithful prayer is just handing a promise back to the one who made it.",
    ]),
  ],
  closing: [
    ["So that is Day 77.", 700],
    ["Two more men tried to buy their way into David's favor with a murder, and got the same answer the first one did.", 750],
    ["Then the throne David had been promised for years finally became his, all at once, without a single battle to take it.", 800],
    ["He got the ark home too, but only after learning the hard way that good intentions don't excuse ignoring what God actually said.", 800],
    ["And when he tried to give God a house, God gave him back something no cedar building ever could. A family. A throne. Forever.", 850],
    ["Tomorrow, 2 Samuel 8 through 11. David wins on every front he can see, and loses badly on the one he stops watching.", 850],
    ["For now, hold onto David's own question.", 750],
    ["Who am I, O Lord God.", 800],
    ["That thou hast brought me hitherto.", 1200],
  ],
};
