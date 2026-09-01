import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 63, written to the Day 1 standard.
 *
 * Judges 4-7 pairs two unlikely deliverers: Deborah, already judging Israel
 * before anyone asks her to lead a battle, and Gideon, who needs fire from a
 * rock and a fleece wet and dry before he believes God is talking to him.
 * Seven blocks, since four chapters and a full war song need the room.
 */

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 63,
  title: "Deborah, Gideon, and Deliverance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 63. Judges 4 through 7.", 750],
    ["Israel is under Jabin's boot. Nine hundred iron chariots, twenty years of it.", 800],
    ["God's rescue this time comes through a woman nobody expected and a man who does not believe he is one.", 800],
    ["Deborah leads. Gideon doubts, right up until he doesn't.", 800],
    ["We are in Judges 4 through 7. A prophetess, a song, a fleece, and three hundred men with jars and torches.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    judg(4, 1, 16, [
      "Ehud is dead and Israel falls right back into it. God sells them to Jabin, and Sisera's nine hundred iron chariots keep them pinned down for twenty years.",
      "Deborah is already judging Israel before this story starts. A prophetess sitting under a palm tree, and people are climbing the hill to bring her their disputes.",
      "She sends for Barak with a battle plan straight from God. Ten thousand men, Mount Tabor, and a promise that Sisera will be delivered into his hand. Barak's answer is not confidence. If you go with me, I will go. If not, I will not.",
      "Deborah goes. And she tells him exactly what that decision costs him: the honor of this fight will belong to a woman. Then the LORD routs the chariots, and Sisera runs from his own army on foot.",
    ]),
    judg(4, 17, 24, [
      "Sisera runs to the one tent he thinks is safe. Jabin and Heber the Kenite have peace between them, so he ducks into Jael's tent, assuming a woman's home is the last place anyone would look for a warlord.",
      "Jael meets him at the door and tells him not to be afraid. She covers him, gives him milk when he asks for water, and tells him to lie still while she stands guard.",
      "Then, while he sleeps from exhaustion, she takes a tent peg and a hammer and drives it through his temple into the ground. Deborah's word comes true exactly as spoken. The honor goes to a woman.",
      "Barak arrives chasing a man who is already dead. Jael just has to open the tent flap and show him. Jabin's power breaks that same day, and it never recovers.",
    ]),
    judg(5, 1, 18, [
      "Chapter 5 is the same story again, sung instead of told. Deborah and Barak sing it together, and a song is its own kind of remembering. You don't forget a battle the way you forget a report.",
      "It opens with God himself marching out from Seir, the ground shaking and the sky pouring rain before the battle even starts. This was never really Barak's fight.",
      "It also says the quiet part. Before Deborah rose up, the highways were empty and travelers used back roads to stay safe. No leadership, no safety, no fight left in anyone.",
      "Then it calls the roll. Ephraim, Benjamin, Machir, Zebulun, Issachar. Tribes who showed up. Naming who came is about to turn into naming who didn't.",
    ]),
    judg(5, 19, 31, [
      "Reuben gets mocked twice in one song for staying home with, quote, great searchings of heart. All the internal debate, none of the actual going. Gilead, Dan, and Asher stayed put too, each with an excuse.",
      "But Zebulun and Naphtali jeoparded their lives unto the death. The song remembers exactly who risked something and who didn't, tribe by tribe.",
      "Jael gets called blessed above women. The poem lingers on her hammer and the tent peg the way a war song usually lingers on a sword. Israel is celebrating a tent-dwelling woman over every soldier who was actually armed.",
      "Then the song does something merciless. It shows Sisera's mother at the window, telling herself he's just delayed dividing the plunder, a girl or two for every man. She is still waiting for a son who has been dead for verses now.",
    ]),
    judg(6, 1, 24, [
      "Forty years of rest ends the way it always does in Judges. Israel does evil again, and this time it's Midian, so thorough that Israel hides in caves and dens in their own land.",
      "God sends a prophet first, before any rescuer, just to say it plainly. I brought you up from Egypt, and you have not obeyed my voice. The truth comes before the rescue, every time.",
      "Then an angel finds Gideon threshing wheat inside a winepress, hiding grain from raiders, and calls him a mighty man of valour. Gideon's answer is basically, if the LORD is with us, why has all this happened to us?",
      "God doesn't argue the theology. He just says go, in this thy might, have not I sent thee. Gideon asks for a sign, gets fire out of a rock, and names the place The LORD Is Peace. He needed the sign before he could believe the sending.",
    ]),
    judg(6, 25, 40, [
      "That same night, God gives Gideon a harder assignment than fighting Midian. Tear down your own father's altar to Baal, at home, first. He does it at night because he is more afraid of his neighbors than he let on.",
      "In the morning the town wants him dead for it. His father Joash talks them down with the best line in the chapter. If Baal is a god, let him plead his own case. They nickname Gideon Jerubbaal. Let Baal contend.",
      "Midian gathers in the valley and the Spirit of the LORD comes on Gideon. He still asks for a sign anyway. Wet fleece, dry ground. Then, because he needs to be sure he isn't just reading tricks into nature, he asks for the opposite the next night.",
      "God gives him both, without a hint of impatience. This is not a man of iron faith. This is a man who gets to save Israel anyway.",
    ]),
    judg(7, 1, 25, [
      "God tells Gideon his army is too big. Not too small, too big, so that when the win comes nobody can say their own hand saved them. Twenty-two thousand men go home just for being afraid.",
      "Then a second cut, stranger than the first. Watch how they drink water. Three hundred men lap it from cupped hands, staying alert. That's the whole army now. Three hundred against a horde like grasshoppers for multitude.",
      "God sends Gideon to listen at the enemy camp first, and he overhears a soldier's dream. A loaf of barley bread tumbling in and flattening a tent. His friend reads it instantly. That's Gideon's sword. Gideon worships right there before the battle starts.",
      "Three hundred men, trumpets, empty jars, and torches hidden inside them. They smash the jars, blow the horns, shout, and the LORD sets Midian's own swords against each other in the dark. Not one blow from an Israelite sword even gets mentioned.",
    ]),
  ],
  closing: [
    ["So that is Day 63.", 700],
    ["Two rescues. Two people who did not look like rescuers.", 750],
    ["Deborah was already leading before anyone asked her to. Jael finished what a whole army chased and never caught.", 800],
    ["Gideon needed fire from a rock, and a fleece wet, and the same fleece dry, before he'd believe God was actually talking to him.", 800],
    ["God let him ask twice. Then trimmed his army down to three hundred so the win couldn't be misread later.", 800],
    ["The chariots, the tent peg, the fleece, the jars. None of it looks like victory until it's over.", 850],
    ["Tomorrow, Judges 8 through 11. Gideon's story turns hard, and a man named Jephthah makes a vow he should never have made.", 850],
    ["For now, hold on to Gideon's question.", 750],
    ["If the LORD is with us, why has this happened to us?", 800],
    ["He asked it hiding in a winepress. Then he went and won.", 1200],
  ],
};
