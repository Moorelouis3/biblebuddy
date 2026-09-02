import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 80, written to the Day 1 standard.
 *
 * 2 Samuel 16-19 carries David from the bottom of his exile — cursed,
 * abandoned, sitting in a gate waiting for news of the son trying to kill
 * him — back to Jerusalem as king, forgiving nearly everyone on the way in.
 * Seven blocks across four heavier chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 80,
  title: "Absalom's Rebellion and David's Grief",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 80. David is on the run, and it gets worse before it gets better.", 750],
    ["A servant lies to him. A man from Saul's family curses him and throws stones. His own son takes his throne, and his own counselor helps.", 800],
    ["Then the war turns, and the son David wanted spared is the one who ends up dead.", 850],
    ["We are in 2 Samuel 16 through 19.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 14, [
      "Ziba, Mephibosheth's servant, meets David on the road with donkeys, bread, fruit, and wine for the exhausted camp. When David asks where his master is, Ziba claims Mephibosheth stayed behind in Jerusalem hoping Israel would hand him Saul's kingdom. David believes it on the spot and gives Ziba everything that belonged to Mephibosheth — no investigation, no chance for the accused to answer.",
      "Further down the road, a man named Shimei, from Saul's own family, comes out cursing and throwing stones at David and his officers. Come out, come out, thou bloody man. The Lord hath returned upon thee all the blood of the house of Saul, and delivered the kingdom into the hand of Absalom thy son.",
      "Abishai wants to cross over and take his head off for it. David won't allow it. My son, which came forth of my bowels, seeketh my life — how much more now may this Benjamite do it? Let him alone, and let him curse, for the Lord hath bidden him.",
      "David even holds out hope in the middle of the humiliation. It may be that the Lord will look on mine affliction, and that the Lord will requite me good for his cursing this day. So Shimei walks the hillside above him the whole way, cursing and throwing stones and dust, and David just keeps walking.",
    ]),
    g(16, 15, 23, [
      "Absalom and all Israel arrive in Jerusalem with Ahithophel at his side. Then Hushai, David's friend, shows up and greets Absalom with, God save the king, God save the king — exactly as planned back on the Mount of Olives.",
      "Absalom is suspicious. Is this thy kindness to thy friend? Why wentest thou not with thy friend? Hushai's answer is technically true and completely misleading. Whom the Lord and this people choose, his will I be. As I served in thy father's presence, so will I be in thy presence. Absalom buys it.",
      "Absalom asks Ahithophel what to do next, and the counsel is calculated cruelty. Go in unto thy father's concubines, which he hath left to keep the house, and all Israel shall hear that thou art abhorred of thy father — then the hands of everyone with you will be strengthened.",
      "So they pitch a tent on the roof of the palace, and Absalom does exactly that, in the sight of all Israel — the specific evil Nathan told David would happen, four chapters ago, playing out in the open the way Nathan said it would. The text adds one more detail. Ahithophel's counsel, in those days, was trusted like a word straight from God.",
    ]),
    g(17, 1, 14, [
      "Ahithophel proposes something fast and lethal. Give him twelve thousand men tonight, catch David while he's weary and weak-handed, scatter everyone else, and kill the king only — one death ends the whole war before it starts. Absalom and the elders like the plan.",
      "But Absalom also calls for Hushai, wanting a second opinion. Hushai argues the opposite case. Your father is a mighty man of war, and his men are like a bear robbed of her cubs — they won't be caught sleeping. If the first strike fails even slightly, everyone will hear there's been a slaughter among Absalom's own men, and even brave hearts will melt.",
      "Instead, Hushai counsels patience. Gather all Israel from Dan to Beersheba, as many as sand on the seashore, and go to battle yourself, in person. Then we'll find David wherever he is and come down on him like dew on the ground — nothing left of him or his men.",
      "Absalom and all Israel say Hushai's counsel is better than Ahithophel's. Scripture explains why in one line that changes how you read the whole scene. The Lord had appointed to defeat the good counsel of Ahithophel, to bring evil upon Absalom. The smarter plan lost because God decided it would.",
    ]),
    g(17, 15, 29, [
      "Hushai immediately warns Zadok and Abiathar what was decided and tells them to get word to David fast — don't camp in the wilderness plains tonight, cross the Jordan now. A servant girl relays the message to Jonathan and Ahimaaz waiting outside the city.",
      "A boy spots them and tells Absalom, but the two men have already dropped into a well at a house in Bahurim. The woman of the house covers the well's mouth with a cloth and spreads grain over it, and when Absalom's men come asking, she simply says they crossed the brook already. The men search, find nothing, and go home.",
      "Ahimaaz and Jonathan climb out and reach David with the message. Arise, and pass quickly over the water, for thus hath Ahithophel counselled against you. David and everyone with him cross the Jordan, and by morning light not one of them is left on the other side.",
      "When Ahithophel sees his counsel wasn't followed, he saddles his donkey, rides home, sets his household in order, and hangs himself — buried in his father's tomb. Meanwhile David reaches Mahanaim, where men bring beds, bowls, wheat, honey, cheese, and sheep, because, they said, the people is hungry, and weary, and thirsty, in the wilderness.",
    ]),
    g(18, 1, 18, [
      "David organizes his army into three divisions under Joab, Abishai, and Ittai, and wants to march out with them himself. The people won't allow it. Thou art worth ten thousand of us — it is better that thou succour us out of the city.",
      "As every captain leads their men out, the whole camp hears David's one command. Deal gently for my sake with the young man, even with Absalom. He says it in front of everyone, still trying to protect the son leading an army against him.",
      "The battle in the wood of Ephraim kills twenty thousand men — the forest devours more people that day than the sword does. Absalom, riding his mule under a great oak, gets his head caught in the branches, and the mule keeps going without him, leaving him hanging between heaven and earth.",
      "A soldier reports it to Joab instead of killing him, quoting David's order back word for word. Joab has no patience for that loyalty. I may not tarry thus with thee. He takes three darts and thrusts them through Absalom's heart while he's still alive in the tree, and ten of Joab's armor-bearers finish it. They throw his body into a pit and cover it with stones — the man who once built himself a monument to be remembered by ends up under a heap of rocks in the woods.",
    ]),
    g(18, 19, 33, [
      "Ahimaaz wants to run the news to David. Joab won't let him carry it — the king's son is dead, and Joab knows exactly what that word will do to David — so he sends a Cushite instead. Ahimaaz begs to run too, and Joab finally lets him go. Ahimaaz outruns the Cushite by a shorter route.",
      "David is sitting between the two gates, and the watchman spots one runner, then two. He is a good man, and cometh with good tidings, David says of Ahimaaz. But when Ahimaaz arrives, he reports the victory and then dodges the real question. Is the young man Absalom safe? I saw a great tumult, but I knew not what it was.",
      "The Cushite arrives next with no way to soften it. The enemies of my lord the king be as that young man is. David doesn't need any more words than that.",
      "The king was much moved, and went up to the chamber over the gate, and wept — and as he went, this is what he said. O my son Absalom, my son, my son Absalom! Would God I had died for thee, O Absalom, my son, my son! A war David won turns, in a single sentence, into the worst day of his life.",
    ]),
    g(19, 1, 43, [
      "The victory turns to mourning through the whole camp because everyone hears the king is grieving. Joab walks into the house and says what nobody else will say to David's face. Thou hast shamed this day the faces of all thy servants which saved thy life — thou lovest thine enemies and hatest thy friends. If Absalom had lived and all of us had died, it had pleased thee well.",
      "Joab warns that if David doesn't get up and speak to his men, he'll lose every one of them by nightfall — worse than everything else that has happened to him. David gets up and sits in the gate, and Israel starts talking about bringing the king back.",
      "On the road home, David forgives at speed. Shimei, who cursed and threw stones at him, begs for his life and gets it — Thou shalt not die. Mephibosheth, who Ziba lied about back in chapter sixteen, hasn't washed his clothes or trimmed his beard since David left, and explains that Ziba deceived him. David, without fully sorting out who told the truth, just splits the land between them.",
      "Barzillai, the old man who fed David's whole camp at Mahanaim, declines the reward of moving to the palace — I am this day fourscore years old, can I taste what I eat or hear the voice of singing men and women anymore — and asks David to bless his servant Chimham instead. But underneath all this reconciliation, Judah and Israel start arguing over who has more claim to the king, and the words of Judah are fiercer than the words of Israel. The peace is real, and it is already cracking.",
    ]),
  ],
  closing: [
    ["So that is Day 80.", 700],
    ["David got cursed, robbed by a lie, and driven out of his own capital, and he kept saying let him alone, it may be the Lord will look on my affliction.", 800],
    ["He gave one order before the battle. Deal gently with the young man Absalom. Joab ignored it.", 800],
    ["A war David won became, in one sentence, the worst day of his life. O my son Absalom, my son, my son.", 850],
    ["Then he had to get up anyway, sit in the gate, and rule a kingdom that just tried to kill him.", 800],
    ["He forgave the man who cursed him, split land with a man who might have lied to him, and let an old friend go home in peace. Grace, fast and wide, right after the worst grief of his life.", 850],
    ["And underneath the celebration, Judah and Israel are already arguing about who owns the king. That crack doesn't close.", 800],
    ["Tomorrow, 2 Samuel 20 through 23. One more rebellion, and a long look back at David's mighty men.", 850],
    ["For now, sit with the words from the chamber over the gate.", 800],
    ["Would God I had died for thee.", 1200],
  ],
};
