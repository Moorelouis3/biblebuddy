import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 165, written to the Day 1 standard.
 *
 * Psalms 109-111: an imprecatory psalm asking God to judge a betrayer (the
 * one Peter later quotes about Judas), the most quoted messianic psalm in
 * the New Testament, and an alphabet psalm closing on the fear of the LORD.
 * Six blocks, splitting the two longer psalms and giving 111 its own.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 165,
  title: "Justice, Messiah, and Wisdom",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 165. Psalms 109 through 111.", 700],
    ["Today opens with David asking God to judge a man who repaid his love with hatred. It does not hold back.", 800],
    ["Then comes a psalm you have already heard quoted, even if you did not know where it came from. Jesus quoted it himself.", 850],
    ["And the day closes with a short alphabet psalm, each line starting the next Hebrew letter, ending on one famous line about wisdom.", 850],
    ["Justice, then a King who is also a priest, then wisdom. Three very different psalms.", 800],
    ["We are in Psalms 109, 110, and 111.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(109, 1, 15, [
      "Hold not thy peace, O God of my praise. For the mouth of the wicked and the mouth of the deceitful are opened against me. David opens by naming exactly what happened. Lies, aimed at him.",
      "For my love they are my adversaries: but I give myself unto prayer. And they have rewarded me evil for good, and hatred for my love. He loved this man. That is what makes the betrayal cut.",
      "Then the prayer turns hard. Let his days be few; and let another take his office. Let his children be fatherless, and his wife a widow. This is not a passing complaint. It is a formal request for judgment.",
      "Later, the apostle Peter quotes this exact line in the book of Acts, about the man who betrayed Jesus. Let his days be few, and let another take his office. Applied to choosing a replacement for Judas.",
    ]),
    g(109, 16, 31, [
      "Because that he remembered not to shew mercy, but persecuted the poor and needy man. David states the reason for the whole prayer. Not personal spite. Cruelty toward someone who had nothing.",
      "As he loved cursing, so let it come unto him: as he delighted not in blessing, so let it be far from him. As he clothed himself with cursing like as with his garment, so let it come into his bowels like water. Whatever this man handed out, David asks that he receive back, measure for measure.",
      "But do thou for me, O GOD the Lord, for thy name's sake: because thy mercy is good, deliver thou me. I am poor and needy, and my heart is wounded within me. Suddenly the tone shifts completely. From cursing his enemy to naming his own weakness.",
      "For he shall stand at the right hand of the poor, to save him from those that condemn his soul. The psalm that opened in anger ends in confidence that God stands exactly where the poor and wronged stand.",
    ]),
    g(110, 1, 3, [
      "The LORD said unto my Lord, Sit thou at my right hand, until I make thine enemies thy footstool. Three verses in, and Jesus himself quotes this exact line, asking the Pharisees how David's own son could also be David's Lord.",
      "One verse, and it becomes one of the most argued-over lines in the whole Old Testament, because David is talking about someone greater than himself.",
      "The LORD shall send the rod of thy strength out of Zion: rule thou in the midst of thine enemies. Strength sent out from the center of worship, not from a throne room.",
      "Thy people shall be willing in the day of thy power. Not forced. Willing. A different kind of kingdom than David ever ruled.",
    ]),
    g(110, 4, 7, [
      "The LORD hath sworn, and will not repent, Thou art a priest for ever after the order of Melchizedek. A king who is also a priest. Israel never allowed that combination. Melchizedek, from Genesis 14, is the only precedent.",
      "The book of Hebrews spends three whole chapters unpacking this single verse, arguing that it points past every priest Israel ever had.",
      "The Lord at thy right hand shall strike through kings in the day of his wrath. He shall judge among the heathen, he shall fill the places with the dead bodies. Blunt, unflinching language about a final reckoning.",
      "He shall drink of the brook in the way: therefore shall he lift up the head. A small, human detail, stopping to drink from a stream, right before the last line about being lifted up.",
    ]),
    g(111, 1, 6, [
      "Praise ye the LORD. I will praise the LORD with my whole heart, in the assembly of the upright, and in the congregation. This whole psalm is an acrostic in Hebrew, each line starting the next letter of the alphabet, in order.",
      "The works of the LORD are great, sought out of all them that have pleasure therein. His work is honourable and glorious: and his righteousness endureth for ever. Structured praise, one letter at a time, like something built to be memorized.",
      "He hath made his wonderful works to be remembered: the LORD is gracious and full of compassion. He hath given meat unto them that fear him: he will ever be mindful of his covenant. Provision and memory, held together in the same breath.",
      "He hath shewed his people the power of his works, that he may give them the heritage of the heathen. A promise stated as something already accomplished, not just hoped for.",
    ]),
    g(111, 7, 10, [
      "The works of his hands are verity and judgment; all his commandments are sure. Everything God does and everything God says line up. No gap between the two.",
      "They stand fast for ever and ever, and are done in truth and uprightness. He sent redemption unto his people: he hath commanded his covenant for ever: holy and reverend is his name. Redemption named directly, in the middle of an alphabet praise psalm.",
      "The fear of the LORD is the beginning of wisdom: a good understanding have all they that do his commandments. One of the most quoted lines in the whole Old Testament, and it lands here, at the very end of the alphabet.",
      "His praise endureth for ever. The last line of the last letter. The whole alphabet, start to finish, spent on one subject.",
    ]),
  ],
  closing: [
    ["So that is Day 165.", 700],
    ["Psalm 109 asks God to judge a betrayer, then ends trusting God stands with the poor. Psalm 110 names a King who is also a priest forever, after the order of Melchizedek. Psalm 111 spells out praise one Hebrew letter at a time.", 850],
    ["Jesus quoted Psalm 110 himself. Peter quoted Psalm 109 about Judas. These are not background psalms. The New Testament keeps reaching back for them.", 850],
    ["And underneath all three is the same claim. God sees the wronged, seats a King who is also a priest, and hands out wisdom to whoever will fear him.", 800],
    ["Tomorrow, Psalms 112 through 114. More acrostic praise, and then the Exodus gets sung about all over again.", 850],
    ["For now, hold on to the line from Psalm 111.", 800],
    ["The fear of the LORD is the beginning of wisdom.", 800],
    ["Beginning. Not the end of it.", 1200],
  ],
};
