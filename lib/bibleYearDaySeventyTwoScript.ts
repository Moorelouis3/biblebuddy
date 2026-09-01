import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 72, written to the Day 1 standard.
 *
 * 1 Samuel 15-18 is the hinge of the whole book: Saul's last chance and his
 * final rejection, David anointed in secret and brought quietly into Saul's
 * own court, Goliath, and the first cracks of Saul's jealousy the moment
 * Jonathan's soul is knit to David's. Seven blocks across four chapters -
 * heavier than most days, so this one uses the full range the standard
 * allows.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 72,
  title: "Saul Is Rejected and David Appears",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 72. Saul gets one more command, and this is the one that ends his kingdom for good.", 750],
    ["While he's still trying to explain himself to Samuel, God has already sent Samuel to anoint a shepherd boy in Bethlehem.", 850],
    ["By the end of today's reading, that boy has killed a giant, the king's own son loves him like a brother, and Saul is already afraid of him.", 850],
    ["We are in 1 Samuel 15 through 18.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(15, 1, 23, [
      "God's command through Samuel is total. Destroy the Amalekites completely, man and woman, ox and camel, and spare nothing. Saul warns the Kenites to get clear first, then wipes out the rest, but keeps Agag their king alive, and the best of the flocks.",
      "He greets Samuel like a man who just did exactly what he was told. I have performed the commandment of the Lord. Samuel only asks him one question. What is this bleating of sheep I'm hearing.",
      "Saul blames the people. They kept the animals to sacrifice to God. It sounds religious. It isn't the point.",
      "Samuel's answer outlives the whole chapter. To obey is better than sacrifice. Because Saul rejected the word of the Lord, the Lord has rejected him from being king. Keeping the best of the plunder and calling it worship never changes what it actually was.",
    ]),
    sam(15, 24, 35, [
      "Saul finally says I have sinned, not once but twice, and both times he's still asking Samuel to honor him in front of the elders anyway.",
      "When Samuel turns to leave, Saul grabs his robe and it tears in his hand. Samuel doesn't waste the moment. The Lord has torn the kingdom from you today, and given it to a neighbor better than you.",
      "Samuel still goes back so Saul can worship, then calls for Agag, the king Saul spared, and kills him himself, in front of everyone, at Gilgal.",
      "Samuel never comes to see Saul again as long as he lives. Two men who built this kingdom together, and it ends without another conversation. Samuel mourns. God does not change His mind.",
    ]),
    sam(16, 1, 13, [
      "God tells Samuel to stop mourning and go anoint a king from Jesse's sons in Bethlehem. Samuel is afraid even to go, so God hands him a cover story built around a sacrifice.",
      "Jesse parades seven sons past Samuel. Eliab looks like a king. God stops Samuel before he even reaches for the oil. Man looks on the outward appearance, but the Lord looks on the heart.",
      "All seven pass by, and God says no to every one. Then Samuel asks the question nobody thought to answer honestly. Are here all your children? There's still the youngest. He's out with the sheep.",
      "They send for him, and the moment David walks in, God says stop waiting, this is the one. Samuel anoints him in front of his brothers, and the Spirit of the Lord comes on David from that day forward.",
    ]),
    sam(16, 14, 23, [
      "The same day the Spirit comes on David, the Spirit leaves Saul, and an evil spirit from the Lord starts to trouble him.",
      "Saul's own servants suggest the cure. Find someone who can play the harp. Nobody in the room knows they're describing the boy who was just anointed to replace him.",
      "So David walks into Saul's court, not as a rival yet, just a musician. And Saul loves him, and makes him his armorbearer.",
      "Every time the evil spirit comes on Saul, David plays, and Saul is refreshed and well. The next king, quietly holding the last one together.",
    ]),
    sam(17, 1, 30, [
      "Goliath stands over nine feet tall in full bronze armor, and for forty straight days he walks out morning and evening daring Israel to send one man against him. Nobody moves.",
      "David isn't even at the battle. He's back home with the sheep, sent to camp only to carry bread and cheese to his brothers.",
      "He hears the challenge and asks the one plain question nobody else is asking. Who is this uncircumcised Philistine, that he should defy the armies of the living God?",
      "His own brother turns on him for asking it. Eliab's anger burns. Why did you even come down here? I know your pride. David doesn't fight him back. What have I now done? Is there not a cause?",
    ]),
    sam(17, 31, 58, [
      "Saul tells David he's just a boy going up against a man of war. David's answer isn't confidence in himself. It's a record of what God already did. The Lord that delivered me from the lion and the bear will deliver me from him.",
      "Saul dresses him in his own armor. David tries to walk in it and can't. He takes it off and picks up the only weapons he actually trusts, a sling and five smooth stones from a stream.",
      "Goliath looks at him and is insulted. David's answer isn't a boast, it's aimed at the whole valley. I come to thee in the name of the Lord of hosts, that all the earth may know there is a God in Israel.",
      "One stone sinks into Goliath's forehead before he finishes threatening David, and David finishes it with the giant's own sword. The whole Philistine army runs.",
    ]),
    sam(18, 1, 30, [
      "Before David even sets the sword down, Jonathan's soul is knit to his. The king's son strips off his own robe, armor, and sword and gives them to a shepherd who just killed a giant. That isn't politics. That's love.",
      "Then the women sing Saul's own soldiers a song he can't unhear. Saul has slain his thousands, and David his ten thousands. From that day, Saul eyes David.",
      "The next day, with a javelin in his hand while David is playing music for him, Saul throws it at him. Twice. David just keeps dodging.",
      "Saul tries using his own daughters as bait, hoping the Philistines finish what he can't. It backfires every time. The more Saul schemes, the more Israel loves David, and the Lord stays with him.",
    ]),
  ],
  closing: [
    ["So that is Day 72.", 700],
    ["Saul gets one clear command about Amalek, keeps what he wanted, and calls it worship.", 800],
    ["To obey is better than sacrifice. Because he rejected that word, God rejects him from being king, and Samuel never comes to see him again.", 850],
    ["While Saul is still arguing his case, Samuel is already in Bethlehem, looking past six sons at a boy nobody else considered.", 800],
    ["The Lord looks on the heart. That's the whole reason David is even in the room.", 800],
    ["He plays music that calms the very king who will one day fear him, then kills a nine-foot giant with a sling and a stone in the name of the Lord.", 850],
    ["And the moment the fighting stops, two very different responses start. Jonathan's soul is knit to David's. Saul starts throwing javelins.", 900],
    ["Tomorrow, 1 Samuel 19 through 22. David runs, and doesn't stop running for a long time.", 900],
    ["For now, sit with Samuel's line to Saul.", 800],
    ["To obey is better than sacrifice.", 1200],
  ],
};
