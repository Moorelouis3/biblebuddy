import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 82, written to the Day 1 standard.
 *
 * 2 Samuel 24 closes out David's reign with a census, a plague, and an altar
 * he refuses to take for free. 1 Kings 1-3 opens Solomon's - a coup grabbed
 * and lost, a father's last words settling old debts, and a new king asking
 * God for exactly one thing. Seven blocks across two books and four chapters,
 * matching the shape Day 47 used for the Numbers-to-Deuteronomy turn.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const kings = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 82,
  title: "David's Census and Solomon's Wisdom",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 82. David's own story closes today, and it doesn't close quietly.", 750],
    ["He orders a census nobody asked for, and seventy thousand people die for it. Then his sons start fighting over the throne before he's even in the ground.", 800],
    ["One son grabs an altar to save his life. Another gets a father's last words — and a list of old debts to settle.", 800],
    ["Then, for the first time, a brand new king asks God for exactly one thing.", 850],
    ["We are in 2 Samuel 24, and 1 Kings 1 through 3.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(24, 1, 14, [
      "The chapter opens strange. Again the anger of the Lord was kindled against Israel, and he moved David to say, Go, number Israel and Judah. A census, ordered from the very top.",
      "Even Joab, of all people, tries to talk him out of it. The Lord thy God add unto the people how many soever they be a hundredfold — but why doth my lord the king delight in this thing? The man who murdered two commanders in cold blood is the one drawing a moral line here. David overrules him anyway.",
      "It takes nine months and twenty days to count the whole nation. Eight hundred thousand fighting men in Israel, five hundred thousand in Judah. And as soon as the number comes back, David's own heart smites him. I have sinned greatly in that I have done. I have done very foolishly.",
      "Gad the prophet brings him three choices, none of them soft. Seven years of famine. Three months fleeing before your enemies. Or three days of pestilence in the land. David picks the third one — I am in a great strait, let us fall now into the hand of the Lord, for his mercies are great, and let me not fall into the hand of man.",
    ]),
    sam(24, 15, 25, [
      "The pestilence kills seventy thousand men, from Dan all the way to Beersheba. Then the angel of the Lord stretches out his hand toward Jerusalem to destroy it too, and the Lord repents him of the evil and says, It is enough. Stay now thine hand.",
      "David sees the angel standing at the threshing floor of Araunah the Jebusite and says the thing you'd want a king to say. Lo, I have sinned, and I have done wickedly. But these sheep, what have they done? Let thine hand, I pray thee, be against me, and against my father's house.",
      "Gad tells him to build an altar right there, at that threshing floor. Araunah offers to hand it over for free, oxen and threshing wood included. David won't take it. Neither will I offer burnt offerings unto the Lord my God of that which doth cost me nothing. He pays full price — fifty shekels of silver.",
      "He builds the altar, offers the sacrifice, and the Lord is entreated for the land, and the plague is stayed from Israel. The very ground where David refused a free gift is the same ground Solomon will build the temple on.",
    ]),
    kings(1, 1, 27, [
      "David is old now, so old that no amount of clothing keeps him warm. His servants bring a young woman, Abishag, to lie in his arms and care for him — and the text says plainly, the king knew her not. The strength that once faced Goliath is simply gone.",
      "Into that gap steps Adonijah, David's next son in line after Absalom, and he says it out loud. I will be king. He gets himself chariots and horsemen and fifty men to run ahead of him — exactly the move Absalom made, and the text adds a hard line. His father had not displeased him at any time in saying, Why hast thou done so?",
      "Adonijah lines up Joab and the priest Abiathar behind him, and throws a feast at En-rogel with sheep and oxen for every brother except one. He never invites Nathan the prophet, Benaiah, or Solomon.",
      "Nathan moves fast. He sends Bathsheba in to remind David of an oath he swore — that Solomon would be king after him — and warns her that if she does nothing, both her life and Solomon's are forfeit the moment Adonijah's coronation is final.",
    ]),
    kings(1, 28, 53, [
      "David swears the oath again, in the room, on the record. As I sware unto thee by the Lord God of Israel, saying, Assuredly Solomon thy son shall reign after me — even so will I certainly do this day.",
      "He doesn't wait. Solomon rides David's own mule down to Gihon, gets anointed by Zadok the priest right there, and the trumpet blows while the whole city shouts, God save king Solomon, until the ground shakes with the noise.",
      "Adonijah's party hears it mid-feast. Joab, who knows exactly what that sound means, asks why the city is in an uproar — and then the answer arrives and every guest at that table gets up and scatters.",
      "Adonijah runs and grabs the horns of the altar, too afraid to let go. Solomon's answer is conditional, not vengeful. If he will shew himself a worthy man, there shall not an hair of him fall to the earth — but if wickedness shall be found in him, he shall die. For now, Solomon sends him home.",
    ]),
    kings(2, 1, 12, [
      "David's last words to his son aren't about revenge first. Be thou strong therefore, and shew thyself a man, and keep the charge of the Lord thy God, to walk in his ways — that thou mayest prosper in all that thou doest, whithersoever thou turnest thyself.",
      "Then the list turns personal and specific. Joab, who murdered Abner and Amasa in peacetime and put the blood of war on a belt worn in peace — David says let not his hoar head go down to the grave in peace. He's carried that unfinished business for years.",
      "Barzillai's sons get the opposite instruction — show them kindness, let them eat at your table, because their father fed David's whole camp when he was starving in exile.",
      "And Shimei, the man who cursed David and threw stones at him on the road out of Jerusalem — David swore by the Lord he wouldn't kill him himself, and he keeps that oath to the letter. But he tells Solomon, thou art a wise man, and knowest what thou oughtest to do unto him. Then David dies, after forty years on the throne.",
    ]),
    kings(2, 13, 46, [
      "Adonijah isn't finished. He asks Bathsheba to get him Abishag, the woman who cared for David in his old age, as a wife. It sounds small. In this world it isn't — asking for the king's own woman was read as reaching for the throne itself, and Solomon hears it exactly that way.",
      "Solomon has him killed that same day. Abiathar the priest, who backed Adonijah, is stripped of the priesthood and sent home to Anathoth — spared execution only because he carried the ark before David through everything.",
      "Joab hears the news and runs to the tabernacle, grabbing the same altar horns Adonijah once grabbed. It doesn't save him. Solomon has him struck down there, for the blood of Abner and Amasa, the two men Joab murdered with a friendly hand and a hidden sword.",
      "Shimei gets one more chance — confined to Jerusalem, told plainly he'll die the day he crosses the brook Kidron. Three years later he chases runaway servants to Gath, breaks the boundary, and is killed for it. And so the kingdom was established in the hand of Solomon.",
    ]),
    kings(3, 1, 28, [
      "Solomon goes to Gibeon to sacrifice, and the Lord appears to him in a dream at night with an open offer. Ask what I shall give thee.",
      "Solomon doesn't ask for a long life, or riches, or his enemies' heads. He calls himself a little child who doesn't know how to go out or come in, surrounded by a people too many to number, and asks for one thing. Give therefore thy servant an understanding heart to judge thy people, that I may discern between good and bad.",
      "It pleases God precisely because of what he didn't ask for. He gets the wise and understanding heart — and riches and honor thrown in besides, so that there shall not be any among the kings like unto thee all thy days.",
      "Then the wisdom gets tested immediately. Two women, one dead baby, one living baby, and both claiming the living one. Solomon calls for a sword to divide the child in two, and the real mother gives up her claim rather than let it die. That's how he finds her — and all Israel feared the king, for they saw that the wisdom of God was in him.",
    ]),
  ],
  closing: [
    ["So that is Day 82.", 700],
    ["David's last chapter as king is a census that cost seventy thousand lives, and an altar he refused to take for free.", 800],
    ["Then he watched a son crown himself before he'd even died, and had to move fast to make sure the right one actually sat on the throne.", 800],
    ["His last words to Solomon weren't soft. Be strong. Walk in God's ways. And close out Joab's debt and Shimei's debt, because I never did.", 850],
    ["Solomon opens his reign settling every one of them — Adonijah, Joab, Abiathar, Shimei — before he does anything else.", 800],
    ["Then God asks him the one question every king in this story has faced in some form. What do you want? And Solomon asks for a heart that can tell right from wrong.", 850],
    ["Tomorrow, 1 Kings 4 through 7. Solomon's wisdom on display, and the temple starts going up.", 800],
    ["For now, hold on to the request he actually made.", 750],
    ["Not riches. Not revenge.", 750],
    ["An understanding heart.", 1200],
  ],
};
