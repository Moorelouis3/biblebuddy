import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 124, written to the Day 1 standard.
 *
 * Job goes looking for God and cannot find him anywhere he searches, then
 * turns outward and names the injustice everyone can see but nobody wants
 * to explain. Bildad gives up with the shortest speech in the book, and
 * Job answers him with sarcasm before describing a God too vast to be
 * summarized by a formula. Seven blocks across four chapters, matching
 * Day 123.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 124,
  title: "Job Searches for God",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 124.", 700],
    ["Job stops arguing with his friends for a moment and just goes looking for God.", 800],
    ["He cannot find him anywhere. Not forward, not backward, not left, not right.", 800],
    ["Then he looks around at the world and names the injustice nobody else in this book will say out loud.", 800],
    ["Bildad answers with six verses and nothing new, and Job's reply describes a God too big for anyone's tidy explanation.", 850],
    ["We are in Job 23 through 26. A search that comes up empty, and a universe that does not.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 23, 1, 9, [
      "Job says if he only knew where to find God, he would go straight to his seat. I would order my cause before him, he says, and fill my mouth with arguments.",
      "He is not afraid of the conversation. I would know the words which he would answer me, and understand what he would say unto me. He wants to be heard, not spared.",
      "But then the search comes up empty in every direction. Behold, I go forward, but he is not there, and backward, but I cannot perceive him.",
      "On the left hand, where he doth work, but I cannot behold him. He hideth himself on the right hand, that I cannot see him. Job is not doubting that God exists. He cannot locate him anywhere he looks.",
    ]),
    g("job", 23, 10, 17, [
      "Then Job says something remarkable in the middle of that emptiness. He knoweth the way that I take. When he hath tried me, I shall come forth as gold.",
      "He says his foot has held God's steps, he has kept God's way and not turned aside, and esteemed the words of his mouth more than his necessary food. Whatever this trial is, it is not because Job walked away from God.",
      "But he is still troubled, because God is unchangeable. He is in one mind, and who can turn him? What his soul desireth, even that he doeth. Job cannot argue a fixed mind into changing course.",
      "Therefore am I troubled at his presence, he says. God maketh my heart soft, and the Almighty troubleth me. Nearness to God does not always feel like comfort. Sometimes it feels like this.",
    ]),
    g("job", 24, 1, 12, [
      "Job turns from his own case to everyone else's. Why, seeing times are not hidden from the Almighty, do they that know him not see his days? He wants to know why God lets injustice run so long unanswered.",
      "Some remove the landmarks, he says, marking out property lines to steal a neighbor's land. They violently take away flocks, drive away the ass of the fatherless, and take the widow's ox for a pledge.",
      "They turn the needy out of the way, and the poor of the earth hide themselves together. The people with the least power spend their lives just trying to stay out of sight of the people with the most.",
      "They cause the naked to lodge without clothing, that they have no covering in the cold. They are wet with the showers of the mountains, and embrace the rock for want of a shelter. Job is not being poetic. He is describing exactly what poverty looks like.",
    ]),
    g("job", 24, 13, 25, [
      "Job describes people who work in darkness on purpose. The murderer rising with the light kills the poor and needy, and in the night is as a thief.",
      "The eye of the adulterer waits for twilight, saying no eye shall see me, and disguises his face. In the dark they dig through houses which they had marked for themselves in the daytime.",
      "They are exalted for a little while, he says, but are gone and brought low. They are taken out of the way as all other, and cut off as the tops of the ears of corn. Sometimes judgment does come. It just does not come on anyone's schedule.",
      "Job ends with a direct challenge. If it be not so now, who will make me a liar, and make my speech nothing worth? He is daring anyone in the room to prove that what he just described is not exactly how the world works.",
    ]),
    g("job", 25, 1, 6, [
      "Bildad speaks a third time, and this is the shortest speech any friend gives in the whole book. He has nothing left to argue, so he falls back on one idea and repeats it.",
      "Dominion and fear are with him, he says of God. He maketh peace in his high places. Is there any number of his armies? True, and beside the point.",
      "How then can man be justified with God, or how can he be clean that is born of a woman? Behold even to the moon, and it shineth not, yea, the stars are not pure in his sight.",
      "How much less man, that is a worm, and the son of man, which is a worm? Six verses, no new evidence, and the same old accusation dressed up as theology. Job's humanity gets used against him one more time.",
    ]),
    g("job", 26, 1, 4, [
      "Job answers, and the sarcasm is not subtle. How hast thou helped him that is without power, he says. How savest thou the arm that hath no strength?",
      "How hast thou counselled him that hath no wisdom, and how hast thou plentifully declared the thing as it is? Bildad said nothing Job did not already know, and Job tells him so directly.",
      "To whom hast thou uttered words, he asks, and whose spirit came from thee? He wants to know where Bildad thinks this great insight came from, because it clearly was not new revelation.",
      "It is a sharp moment, but notice what Job does not do. He does not walk away from the conversation. He answers, every time, even the friend who barely bothered to speak.",
    ]),
    g("job", 26, 5, 14, [
      "Then Job does something unexpected. Instead of continuing the argument, he describes God's power across all of creation, bigger and steadier than anything his friends have said.",
      "He stretcheth out the north over the empty place, and hangeth the earth upon nothing. He compasseth the waters with bounds, until the day and night come to an end.",
      "The pillars of heaven tremble, and are astonished at his reproof. He divideth the sea with his power, and by his understanding he smiteth through the proud. By his spirit he hath garnished the heavens.",
      "Then Job closes with the line that undercuts every confident speech in this whole argument. Lo, these are parts of his ways, but how little a portion is heard of him. The thunder of his power, who can understand? Even what Job just described is only the edge of it.",
    ]),
  ],
  closing: [
    ["So that is Day 124.", 700],
    ["Job went looking for God in every direction and found nothing. Forward, backward, left, right. Nobody home.", 750],
    ["And in that same emptiness he still said, he knoweth the way that I take. He held onto being known even while he could not find anyone to talk to.", 800],
    ["Then he said out loud what everyone in this story has been avoiding. The wicked do not always get caught. The poor freeze in the cold while somebody else eats well.", 850],
    ["Bildad answered with six verses and nothing new. Job answered him with sarcasm, and then with the sky itself. God hangs the earth on nothing. Nobody in the room can argue with that.", 850],
    ["And even after describing all of that power, Job said it is only a little portion of who God actually is.", 800],
    ["Tomorrow, Job 27 through 30. Job takes an oath on his own integrity, and then watches his life fall even further apart.", 850],
    ["For now, hold on to Job's honesty.", 800],
    ["He could not find God anywhere he looked.", 750],
    ["He kept looking anyway.", 1200],
  ],
};
