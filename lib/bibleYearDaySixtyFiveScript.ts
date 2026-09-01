import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 65, written to the Day 1 standard.
 *
 * Judges 12-15 closes out Jephthah's story with a deadly password, passes
 * quickly over three minor judges, then opens Samson's: his birth to a
 * barren mother by way of an angel, and the wife, riddle, and revenge that
 * fill his first chapters. Six blocks, covering all four chapters in order.
 */

const judg = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
  book: "judges",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 65,
  title: "Samson Begins His Troubled Calling",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 65. Judges 12 through 15.", 750],
    ["Jephthah's war with Ammon is barely over before Ephraim shows up threatening to burn his house down.", 800],
    ["That fight ends over a word nobody could say right, and forty-two thousand men die because of it.", 800],
    ["Then three judges pass by almost without a story, and a whole new judge is born to a couple who couldn't have children.", 800],
    ["His name is Samson. He is set apart before he is even born, and he spends this whole reading testing exactly how far that will stretch.", 850],
    ["We are in Judges 12 through 15. A password, an angel, a riddle, and a jawbone.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    judg(12, 1, 7, [
      "Ephraim missed the fight against Ammon and shows up furious, threatening to burn Jephthah's house down with him in it.",
      "Jephthah tells them the truth. He called for help and got nothing, so he fought and won without them.",
      "The fight turns into a checkpoint at the Jordan. Say Shibboleth. Anyone who says Sibboleth instead dies right there, because his own mouth gives him away.",
      "Forty-two thousand men, killed by an accent. Then Jephthah dies after six years of judging, and Gilead just buries him and moves on.",
    ]),
    judg(12, 8, 15, [
      "After Jephthah come three judges the text barely bothers with. Ibzan, thirty sons and thirty daughters, all married outside the clan on purpose.",
      "Elon gets two verses. Abdon gets forty sons and thirty grandsons riding on seventy donkeys.",
      "No battles here. No speeches, no crises, nothing that would make a good scene.",
      "That is worth noticing. Most of the years God's people spent under a judge, nothing dramatic happened at all. These three still get remembered.",
    ]),
    judg(13, 1, 14, [
      "Israel does evil again, and God hands them to the Philistines for forty years. No cry for rescue this time. Just the sentence.",
      "Into that, an angel appears to a woman who has never been able to have children and tells her she is about to have a son, a Nazirite set apart to God from the womb.",
      "She runs and tells her husband Manoah, who was not there for any of it. He prays to see the messenger himself, and God actually grants it.",
      "But when Manoah gets him, all he asks is what to do with the boy. The angel just repeats what he already told the wife. She heard it first, and she heard it clearly.",
    ]),
    judg(13, 15, 25, [
      "Manoah wants to feed the visitor a meal, still not realizing who he is. Feed nothing to me, the angel says. Offer it to the Lord instead.",
      "Manoah asks his name, so he can honor him properly later. The answer comes back as a question. Why ask my name? It is too wonderful for you to grasp.",
      "They offer the sacrifice on a rock, and the angel goes up in the flame, right in front of them. Manoah and his wife hit the ground, certain they are about to die for seeing God.",
      "His wife is the calm one. If the Lord wanted us dead, would He have taken our offering and shown us all this? Then Samson is born, and the Spirit of the Lord starts to move him, even as a boy, between Zorah and Eshtaol.",
    ]),
    judg(14, 1, 20, [
      "Samson grows up and wants a Philistine woman from Timnah. His parents ask why not one of our own people. He says get her for me, she is right in my eyes, and Scripture quietly adds that this was of the Lord, though his parents had no idea.",
      "A lion attacks him on the road and he tears it apart with nothing in his hand, and does not tell his parents. Later he finds bees and honey inside the carcass, eats it, and feeds his parents without telling them where it came from either.",
      "At the wedding feast he bets thirty men his own riddle. Out of the eater came food, out of the strong came sweetness. They cannot solve it, so they threaten to burn his bride's family alive unless she gets the answer out of him.",
      "She cries on him for seven straight days until he breaks and tells her. She tells them. If you had not plowed with my heifer, Samson says, you would not have found my riddle. He kills thirty men to pay the bet, and his own wife is handed to his best man.",
    ]),
    judg(15, 1, 20, [
      "Samson comes back for his wife with a young goat, and finds out her father already gave her away. He offers the younger sister instead. Samson does not take the offer. He takes revenge.",
      "Three hundred foxes, tied tail to tail with torches between them, burn every field, vineyard, and olive grove the Philistines have. When they retaliate by burning his wife and her father alive, Samson strikes them down by the hundreds and hides in the rock at Etam.",
      "Three thousand of his own countrymen come to hand him over rather than fight the Philistines themselves. Samson lets them tie him up. Then the Spirit comes on him, the ropes burn off like scorched string, and he kills a thousand men with a donkey's jawbone.",
      "Right after that victory he is so thirsty he begs God not to let him die now, after all of this. God splits open the ground and water comes out. Even the strongest man in Israel needed rescuing five minutes after his own miracle.",
    ]),
  ],
  closing: [
    ["So that is Day 65.", 700],
    ["A password nobody could fake, three judges nobody remembers, and a strongman who cannot stop making promises he cannot keep.", 800],
    ["Samson was set apart before he had any say in it. Then he spent every chapter here doing exactly what he wanted.", 800],
    ["A woman he wanted. A riddle he lost on purpose to his own wife's tears. A revenge that grew bigger every time someone answered it.", 800],
    ["And still, in the middle of all of it, the Spirit of the Lord kept coming on him.", 800],
    ["God did not wait for Samson to get it together first.", 800],
    ["Tomorrow, Judges 16 through 19. Samson's strength finally meets its match, and Israel starts falling apart right behind him.", 850],
    ["For now, sit with the jawbone.", 700],
    ["A thousand men, one bone, and a man too thirsty afterward to celebrate.", 800],
    ["Strength was never Samson's problem.", 1200],
  ],
};
