import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 62, written to the Day 1 standard.
 *
 * Joshua 24 closes the book with covenant renewal at Shechem and Joshua's
 * death; Judges 1-3 opens the next book with the incomplete-conquest list,
 * the angel at Bochim naming the pattern out loud, and the first three
 * judges. Six blocks, splitting each book in half so the covenant renewal
 * and the "did not drive them out" catalogue each get their own room.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 62,
  title: "Covenant Choice and Israel's Drift",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 62. Joshua is about to die, and everything after him unravels fast.", 750],
    ["First he makes the whole nation choose out loud who they will serve. They choose right.", 800],
    ["Then a new generation grows up that never saw any of it happen.", 800],
    ["And Judges opens with a list of everything Israel was supposed to finish and didn't.", 800],
    ["We are in Joshua 24 and Judges 1 through 3. A covenant, a drift, and the first three judges.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(24, 1, 15, [
      "Joshua calls the whole nation to Shechem and does something unexpected. Before asking anything of them, he retells their entire history, starting with Abraham's father worshipping other gods on the far side of the river.",
      "He walks through every rescue speaking as God in the first person. I took your father. I plagued Egypt. I delivered them into your hand. Over and over, I.",
      "Then the turn. Now therefore fear the LORD, and put away the gods your fathers served. He is not asking them to try harder. He is asking them to actually decide.",
      "Choose you this day whom you will serve. And Joshua answers his own question before anyone else can. As for me and my house, we will serve the LORD.",
    ]),
    josh(24, 16, 33, [
      "The people answer fast. God forbid that we should forsake the LORD. And Joshua does something strange back. He tells them they cannot do what they just promised.",
      "Ye cannot serve the LORD, he says, for he is a holy God, a jealous God. He is not talking them out of it. He is making sure they know what the promise costs before they sign it.",
      "They say it again anyway. The LORD our God will we serve. So Joshua writes it into the book of the law and sets up a stone as a witness against them if they ever deny it.",
      "Then, without much ceremony, Joshua dies at a hundred and ten. Israel serves the LORD all his days, and all the days of the elders who had seen what God did. That phrase is doing a lot of work. It will not last past them.",
    ]),
    judg(1, 1, 20, [
      "Judges opens right after Joshua dies, and the question the people ask is the right one. Who goes up first against the Canaanites? Judah, God answers.",
      "Judah and Simeon catch a king named Adoni-bezek and cut off his thumbs and big toes. He says it himself before he dies. Seventy kings I did this to, and now God has paid me back the same way.",
      "Caleb offers his daughter Achsah to whoever takes Kirjath-sepher. Othniel does it, marries her, and she asks her father for springs of water on top of the land she already has. He gives her both the upper and the lower springs.",
      "This section starts strong. City after city falls to Judah. Then one line breaks the pattern. They drove out the people of the mountain, but could not drive out the people of the valley, because they had chariots of iron. Could not, or would not, is about to become the whole book.",
    ]),
    judg(1, 21, 36, [
      "From here the chapter turns into a list, and the list is the point. Benjamin did not drive out the Jebusites in Jerusalem. Manasseh did not drive out six cities' worth of Canaanites.",
      "Ephraim did not drive out Gezer. Zebulun, Asher, and Naphtali all let Canaanites stay and just made them pay tribute instead.",
      "Dan does not even get that much. The Amorites force them into the hills and will not let them come down into the valley at all.",
      "Tribe after tribe, the same sentence with a different name in it. Did not drive them out. This is not one bad decision. It is the whole nation quietly agreeing to live with what God told them to remove.",
    ]),
    judg(2, 1, 23, [
      "An angel of the LORD comes up from Gilgal and says the thing nobody wants to hear out loud. I brought you into this land, and you have not obeyed my voice. Why have you done this?",
      "Because of it, God says he will not drive out the nations that are left. They will be thorns in your side, and their gods a snare to you. The people weep, and name the place Bochim. Weeping.",
      "Then the chapter explains the shape of the whole book in advance. A generation arose that did not know the LORD, or what he had done for Israel. Not rebellion first. Forgetting first.",
      "So the pattern locks in. Israel sins, God hands them to an enemy, they cry out, God raises up a judge, there is peace until the judge dies, and they go back to what they were doing before, worse than the last time.",
    ]),
    judg(3, 1, 31, [
      "The first judge is Othniel, the same man who married Achsah back in chapter one. The Spirit of the LORD comes on him, he defeats a king with an unpronounceable name, and the land rests forty years.",
      "The second judge is Ehud, and he is left-handed, which is exactly how he gets a hidden dagger past Eglon's guards. He tells the king he has a message from God and delivers it with the blade instead of the words.",
      "Eglon is so fat the whole handle disappears into him, and his servants wait outside so long, assuming he is using the bathroom, that Ehud is long gone before anyone checks.",
      "Then Shamgar gets one verse. Six hundred Philistines, one ox goad, one line: he also delivered Israel. The book does not need a résumé to count someone as a deliverer.",
    ]),
  ],
  closing: [
    ["So that is Day 62.", 700],
    ["Joshua made them say it out loud. As for me and my house, we will serve the LORD. And for one more generation, they meant it.", 800],
    ["Then came a generation that did not know the LORD, or what he had done. Not defiance first. Just forgetting.", 800],
    ["And once they forgot, the list in Judges 1 tells you exactly what that looked like on the ground. Tribe after tribe just stopped finishing the job.", 850],
    ["God still raised up deliverers anyway. Othniel, obscure and faithful. Ehud, clever and violent. Even Shamgar, one verse and an ox goad.", 850],
    ["The pattern is set now. Sin, oppression, crying out, rescue, rest, and then right back to it.", 850],
    ["Tomorrow, Judges 4 through 7. Deborah leads, Gideon doubts, and God keeps rescuing people who keep forgetting him.", 850],
    ["For now, hold on to Joshua's stone.", 750],
    ["It heard every word.", 750],
    ["So it can't be denied.", 1200],
  ],
};
