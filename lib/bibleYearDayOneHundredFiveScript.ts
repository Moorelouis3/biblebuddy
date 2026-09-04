import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 105, written to the Day 1 standard.
 *
 * 2 Chronicles 16-19 closes Asa's story on a low note and opens
 * Jehoshaphat's on a high one, then complicates it fast. Asa trades trust
 * for a treaty and dies not seeking the Lord even in sickness. Jehoshaphat
 * starts strong, then ties himself to Ahab and rides into a battle a
 * prophet already told them both how it ends. Six blocks, following the
 * chapter breaks.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 105,
  title: "Asa, Jehoshaphat, and Trust",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 105. Yesterday Asa faced a million-man army with nothing but a prayer.", 750],
    ["Today he faces a much smaller problem, and reaches for gold instead of God.", 850],
    ["Then his son Jehoshaphat takes the throne, starts strong, and makes an alliance that nearly gets him killed.", 800],
    ["A prophet tells two kings exactly how a battle will end. They go anyway.", 800],
    ["We are in 2 Chronicles 16 through 19.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(16, 1, 6, [
      "Baasha king of Israel comes up and starts building Ramah, close enough to Judah's border to choke off anyone going in or out of Asa's kingdom.",
      "Asa's answer is not a prayer this time. He empties silver and gold out of the temple and the palace and sends it to Ben-hadad king of Syria, asking him to break his treaty with Baasha and attack Israel instead.",
      "It works. Ben-hadad's captains smite Israel's cities, Baasha abandons Ramah, and Asa takes the stones and timber for himself and builds Geba and Mizpah with them.",
      "From the outside this looks like a win. Judah is safer, the border problem is solved, and it cost Asa nothing but treasure that was not fully his to spend.",
    ]),
    chron2(16, 7, 10, [
      "Hanani the seer meets Asa and says the thing nobody wanted to hear. Because thou hast relied on the king of Syria, and not relied on the Lord thy God, therefore is the host of the king of Syria escaped out of thine hand.",
      "Then he points backward. Were not the Ethiopians and the Lubims a huge host, with very many chariots and horsemen? Yet because thou didst rely on the Lord, he delivered them into thine hand. That was Asa, a chapter ago, outnumbered and trusting God completely.",
      "The eyes of the Lord run to and fro throughout the whole earth, to shew himself strong in the behalf of them whose heart is perfect toward him. Herein thou hast done foolishly. Therefore from henceforth thou shalt have wars.",
      "Asa does not repent. He is wroth with the seer, puts him in a prison house, and oppresses some of the people at the same time. The man who once tore down every idol in the land cannot stand being told he got this one wrong.",
    ]),
    chron2(16, 11, 14, [
      "In his thirty-ninth year Asa is diseased in his feet, until his disease was exceeding great. And even here, the text does not soften the pattern. He sought not to the Lord, but to the physicians.",
      "This is the same king who once said, Lord, it is nothing with thee to help, whether with many, or with them that have no power. Somewhere between that prayer and this disease, he stopped bringing things to God at all.",
      "He dies in the forty-first year of his reign and is buried in his own sepulchre with a very great burning made for him. A grand funeral for a reign that started with reform and ended in silence toward God.",
      "Two rulers, one man. The Asa who trusted with nothing in his hand, and the Asa who bought a treaty and diagnosed his own feet. Both are true, and Chronicles lets you see exactly where the turn happened.",
    ]),
    chron2(17, 1, 9, [
      "Jehoshaphat takes the throne and strengthens himself against Israel, placing forces in Judah's fenced cities. And the Lord was with Jehoshaphat, because he walked in the first ways of his father David, and sought not unto Baalim.",
      "He sends princes, Levites, and priests out through every city of Judah, and they carry the book of the law of the Lord with them and teach the people. This is not a private faith. Jehoshaphat exports it on purpose.",
      "The fear of the Lord falls on the kingdoms around Judah, and they make no war against him. Philistines bring presents. Arabians bring flocks. Jehoshaphat waxes great exceedingly, and he never had to lift a sword for any of it.",
      "Compare this to Asa's silver sent to Syria. Jehoshaphat gets peace and riches by teaching the law. Asa bought a shortcut with temple gold. One king built trust. The other spent it.",
    ]),
    chron2(18, 1, 19, [
      "Jehoshaphat has riches and honour in abundance, and joins affinity with Ahab. That single word, affinity, is doing a lot of work. It means marriage, alliance, family ties with the most idolatrous king Israel has had.",
      "Ahab persuades him to attack Ramoth-gilead, and Jehoshaphat says, I am as thou art, and my people as thy people, we will be with thee in the war. Then, almost as an afterthought, he asks to enquire of the Lord first.",
      "Four hundred prophets say go up and prosper. Jehoshaphat is not satisfied, and asks if there is a prophet of the Lord besides. Ahab admits there is one, Micaiah, but I hate him, for he never prophesied good unto me, but always evil.",
      "Micaiah is fetched, mocks Ahab with the same script the other prophets used, then tells the truth when pressed. I did see all Israel scattered upon the mountains, as sheep that have no shepherd. Then he describes standing in the throne room of heaven itself, watching a lying spirit volunteer to deceive Ahab's prophets, sent because Ahab wanted to hear yes.",
    ]),
    chron2(18, 20, 34, [
      "Zedekiah, one of the four hundred, slaps Micaiah across the face and demands to know which way the Spirit of the Lord went when it left him to speak to Micaiah instead. Micaiah tells him he will find out the day he is hiding in an inner chamber.",
      "Ahab locks Micaiah up on bread and water until I return in peace. Micaiah's answer is the last thing anyone hears him say. If thou certainly return in peace, then hath not the Lord spoken by me.",
      "Ahab disguises himself for the battle and has Jehoshaphat wear the royal robes instead. Syria's captains, told to fight only the king of Israel, surround Jehoshaphat by mistake. He cries out, and the Lord moves them off him.",
      "A random arrow, shot at a venture with no target in mind, finds the one gap in Ahab's armor. He props himself up in his chariot until sundown so his own army will not lose heart, then dies exactly where Micaiah said he would.",
    ]),
    chron2(19, 1, 11, [
      "Jehoshaphat comes home in peace, and Jehu the seer meets him at the gate with a question that lands hard. Shouldest thou help the ungodly, and love them that hate the Lord? Therefore is wrath upon thee from before the Lord.",
      "But Jehu does not stop there. Nevertheless there are good things found in thee, in that thou hast taken away the groves out of the land, and hast prepared thine heart to seek God. Rebuke and credit, both true of the same man in the same breath.",
      "Jehoshaphat does not sulk the way Asa did with Hanani. He goes out again among the people, from Beersheba to the hill country of Ephraim, and brings them back to the Lord.",
      "Then he sets judges in every fenced city and tells them plainly, ye judge not for man, but for the Lord, who is with you in the judgment. There is no iniquity with the Lord our God, nor respect of persons, nor taking of gifts. Deal courageously, and the Lord shall be with the good.",
    ]),
  ],
  closing: [
    ["So that is Day 105.", 700],
    ["Asa buys a treaty with temple gold, gets rebuked for it, and dies without asking God about his own disease.", 750],
    ["Jehoshaphat starts by teaching the law in every city, then nearly dies wearing another king's armor because he could not say no to an alliance.", 800],
    ["Micaiah stood alone against four hundred voices telling two kings what they wanted to hear, and he told the truth anyway, knowing exactly what it would cost him.", 850],
    ["Notice what Jehu says to Jehoshaphat. Not only the rebuke. The good things found in thee, in the very same sentence. God does not need you sinless to keep using you.", 850],
    ["Tomorrow, 2 Chronicles 20 through 23. A massive army marches on Judah, and a boy king gets hidden in the temple to save his life.", 850],
    ["For now, hold on to what Hanani told Asa.", 800],
    ["The eyes of the Lord run to and fro throughout the whole earth.", 800],
    ["To show himself strong for the one whose heart is His.", 1200],
  ],
};
