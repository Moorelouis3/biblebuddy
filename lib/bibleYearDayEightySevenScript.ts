import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 87, written to the Day 1 standard.
 *
 * 1 Kings 20-22 closes Ahab's story: a war he wins he has no business
 * winning, a vineyard he steals in broad daylight, and a battle he dies in
 * exactly the way a prophet said he would, wearing a disguise that doesn't
 * save him. 2 Kings 1 opens with his son making the same mistake his
 * parents made, and paying for it the same way. Seven blocks across four
 * chapters.
 */

const kings1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 87,
  title: "Ahab's Fall and Elijah's Final Warnings",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 87. Ahab wins a war he has no business winning, then steals a vineyard from a man he has no business fighting.", 750],
    ["Elijah meets him at the crime scene itself and tells him exactly how he dies.", 800],
    ["Years later, in a battle he tried to dodge wearing a disguise, it happens exactly that way.", 800],
    ["Then his son takes the throne, makes his parents' mistake all over again, and gets his own visit from Elijah.", 850],
    ["We are in 1 Kings 20 through 22, and 2 Kings 1.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings1(20, 1, 21, [
      "Ben-hadad of Syria doesn't just threaten Ahab, he insults him, demanding his silver, his wives, his children, then sending a second message just to rub it in. Ahab's own elders tell him not to give in to any of it.",
      "An unnamed prophet shows up and promises Ahab a victory he never asks for and doesn't deserve, using seven thousand ordinary men and two hundred thirty-two young officers against an army so large it filled the country.",
      "Ben-hadad is drinking himself drunk in his tent with thirty-two allied kings while Israel attacks at noon. Israel wins completely. Overconfidence loses more battles than any army does.",
      "God did this for a king who was, at this exact moment, still worshipping Baal in Samaria with his wife's blessing. Grace here isn't a reward. It's God working through an unworthy king to make a point to somebody.",
    ]),
    kings1(20, 22, 34, [
      "Syria's own officers hand God a theology lesson without meaning to. Their gods are gods of the hills, they say, let's fight Israel in the plain instead. They think Israel's God has a range limit.",
      "God lets the second battle happen just to correct that. Israel, camped like two little flocks of kids against an army that fills the whole country, kills a hundred thousand Syrian footmen in a single day.",
      "Twenty-seven thousand more die when a city wall falls on them as they flee. Ben-hadad himself survives only by hiding in an inner chamber, the same drunk arrogance from chapter twenty now reduced to a man begging through his own servants.",
      "And Ahab, the king who just watched God prove exactly who He is twice in two chapters, calls the defeated enemy his brother, puts him in his own chariot, and lets him go with a treaty. Winning the battle taught Ahab nothing about who actually won it.",
    ]),
    kings1(20, 35, 43, [
      "A prophet stages the strangest scene in the chapter to make his point land. He asks a fellow prophet to strike him, is refused, then predicts a lion will kill the man for disobeying God's word. It happens within the same verse.",
      "A second man agrees to strike him, and this time it works. The prophet disguises his wound with ashes and waits by the road for the king, playing the part of a soldier who let a prisoner escape.",
      "Ahab, without knowing it, passes his own sentence. So shall thy judgment be, thyself hast decided it. Then the prophet pulls off the disguise and Ahab realizes exactly what he just agreed to.",
      "Ben-hadad was a man devoted to destruction, cherem, God's word on him, and Ahab let him go for a treaty and some trade routes. Thy life shall go for his life, the prophet says. Ahab goes home heavy and displeased. Not repentant. Just caught.",
    ]),
    kings1(21, 1, 16, [
      "Naboth won't sell his vineyard, and he's right to refuse. It's family land, an inheritance from his fathers, and the law never meant for it to be traded away, not even to a king offering a fair price.",
      "Ahab's response to a lawful no is to go to bed, turn his face to the wall, and refuse to eat, like a child denied a toy. This is the same king who just led an army to victory over Syria.",
      "Jezebel doesn't ask what's wrong so much as she takes over. Arise, eat bread, let thine heart be merry, I will give thee the vineyard. She writes the letters herself, in Ahab's name, sealed with his own seal.",
      "Two false witnesses, a fake fast, and a public accusation of blasphemy later, Naboth is stoned to death by his own neighbors, on Jezebel's orders, in Ahab's name, for a piece of land his family had held for generations.",
    ]),
    kings1(21, 17, 29, [
      "Ahab doesn't even wait to hear that Naboth is dead before he starts walking. He goes straight down to the vineyard to take possession, the same day, as if the murder were simply a transaction that closed on schedule.",
      "Elijah is already there when he arrives. Hast thou killed, and also taken possession. Not a question. A summary. Then the sentence: in the place where dogs licked the blood of Naboth shall dogs lick thy blood, even thine.",
      "Ahab's whole house is marked for the same end as Jeroboam's and Baasha's, wiped out completely. And Jezebel gets her own specific verdict. The dogs shall eat Jezebel by the wall of Jezreel. Nothing vague about it.",
      "Then something nobody expects. Ahab tears his clothes, puts on sackcloth, and fasts. And God notices. Because he humbleth himself, I will not bring the evil in his days, but in his son's days. Real humility, even from Ahab, moves God. It just doesn't undo what's already been set in motion.",
    ]),
    kings1(22, 1, 40, [
      "Three years of peace end when Ahab decides to retake Ramoth-gilead, and Jehoshaphat of Judah, allied by marriage, agrees to fight alongside him but insists on asking God first. Four hundred prophets say go up and prosper. Every one of them.",
      "Jehoshaphat isn't satisfied. Is there not one more? There is. Micaiah, whom Ahab hates because he never prophesies good, only evil. Ahab already knows what kind of answer he doesn't want to hear.",
      "Micaiah's vision is the strangest scene in the whole book. God asks who will persuade Ahab to his death, and a spirit volunteers to be a lying spirit in the mouths of Ahab's own prophets. God permits the deception. He does not force Ahab to believe it.",
      "Zedekiah slaps Micaiah for saying so. Ahab locks him up on bread and water until I return in peace. Micaiah's last line before the cell door shuts: if thou return at all in peace, the Lord hath not spoken by me. Then Ahab disguises himself for battle anyway, and dies from a random arrow shot at no one in particular. The word outlasts the disguise.",
    ]),
    kings2(1, 1, 18, [
      "Ahaziah, Ahab's son, falls through a lattice in his own palace and gets hurt badly enough to send messengers asking Baal-zebub, the god of Ekron, whether he'll recover. Not one thought toward the God of Israel, even in a crisis.",
      "Elijah intercepts the messengers before they even reach Ekron with one question that answers itself. Is it not because there is not a God in Israel, that ye go to enquire of Baal-zebub? Then the verdict: Ahaziah will not leave that bed alive.",
      "Ahaziah sends fifty soldiers to arrest a prophet like he's dealing with a criminal, twice, and fire falls from heaven and consumes both companies before they lay a hand on him. This isn't Elijah's temper. It's the same fire that fell on Carmel, still answering the same way.",
      "The third captain does something the first two never tried. He falls on his knees and begs. Let my life be precious in thy sight. Elijah goes with him this time, delivers the same message face to face, and Ahaziah dies exactly as spoken. Two generations now, father and son, learn the same lesson the hard way.",
    ]),
  ],
  closing: [
    ["So that is Day 87.", 700],
    ["Ahab wins a war God handed him, then steals a vineyard from a man who only wanted to keep his inheritance.", 800],
    ["Elijah meets him at the scene and names exactly how it ends. Years later, in a disguise meant to dodge that word, it ends exactly that way.", 800],
    ["Even Ahab's small, real moment of humility mattered to God. It just moved the judgment one generation, not off the board entirely.", 850],
    ["And Micaiah sat in a cell for telling the truth while four hundred men got applauded for a comfortable lie.", 800],
    ["Ahaziah had his father's whole story in front of him and still sent to Ekron instead of home.", 800],
    ["Tomorrow, 2 Kings 2 through 5. Elijah's ministry ends, and Elisha's begins.", 800],
    ["For now, sit with Micaiah's line from the cell.", 750],
    ["If thou return at all in peace,", 700],
    ["the Lord hath not spoken by me.", 1200],
  ],
};
