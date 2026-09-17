import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 261, written to the Day 1 standard.
 *
 * Hosea closes with its hardest verse and its clearest invitation in the
 * same chapter, and then the book hands off entirely - a new prophet, a
 * new disaster, no transition at all. Five blocks: two in Hosea 13, one
 * for the whole of Hosea 14, two in Joel 1.
 */

const hos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hosea ${chapter}:${startVerse}-${endVerse}`,
  book: "hosea",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const joel = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joel ${chapter}:${startVerse}-${endVerse}`,
  book: "joel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 261,
  title: "Return to the Lord",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 261. Hosea has one chapter left, and it holds both the worst verse in the book and the best one.", 800],
    ["Then, with no warning at all, the book just ends, and a completely different prophet starts talking.", 800],
    ["No introduction. No explanation. Just a locust swarm eating a whole country down to bare wood.", 800],
    ["We are in Hosea 13 and 14, and then the opening of Joel.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hos(13, 1, 8, [
      "When Ephraim spake trembling, he exalted himself in Israel; but when he offended in Baal, he died. There was a time this tribe's word carried real weight. The moment it turned to Baal, that weight was gone, whatever title it still held.",
      "They say of them, Let the men that sacrifice kiss the calves. Not a figure of speech. Worshippers actually pressed their lips to the metal statues. Hosea names the exact physical act because it is more honest than any accusation he could make up.",
      "They shall be as the morning cloud, and as the early dew that passeth away, as the chaff... and as the smoke out of the chimney. Back in chapter six, God used almost this same picture for Israel's own love, gone by morning. Now the picture is turned around. Israel herself is what is about to vanish.",
      "I will be unto them as a lion... as a leopard... I will meet them as a bear that is bereaved of her whelps. Three predators, each more dangerous than the last, and the worst is a mother bear robbed of her cubs. That is not random rage. It is grief with claws.",
    ]),
    hos(13, 9, 16, [
      "O Israel, thou hast destroyed thyself; but in me is thine help. The whole book in one line. Nobody else did this to Israel. And the only way out is still the God she has been running from.",
      "I gave thee a king in mine anger, and took him away in my wrath. Go back to 1 Samuel 8. Israel demanded a king to be like the other nations. God warned them what it would cost and gave them one anyway. Centuries later, he is still calling that concession, not a gift.",
      "The sorrows of a travailing woman shall come upon him: he is an unwise son; for he should not stay long in the place of the breaking forth of children. A birth that will not finish. The moment built for a baby to come out into life becomes the moment Israel gets stuck inside instead.",
      "I will ransom them from the power of the grave; I will redeem them from death: O death, I will be thy plagues; O grave, I will be thy destruction. In the middle of the hardest chapter in the book, a line so strong that Paul quotes it centuries later about the resurrection. It sits right next to the worst verse in Hosea, their infants shall be dashed in pieces, and their women with child shall be ripped up. This book does not clean up what war actually does. Sit with both verses. Do not let the second one talk you out of the first.",
    ]),
    hos(14, 1, 9, [
      "O Israel, return unto the LORD thy God; for thou hast fallen by thine iniquity. After twelve chapters of exposing every excuse, the book turns and simply asks. Not a threat. An invitation.",
      "Take with you words, and turn to the LORD... so will we render the calves of our lips. A deliberate echo of chapter thirteen, where the calves being kissed were made of metal. Now the only offering God wants is words, spoken honestly, from a mouth that means them.",
      "Asshur shall not save us; we will not ride upon horses; neither will we say any more to the work of our hands, Ye are our gods. Three confessions in one breath: no foreign power, no military strength, no idol, will do what only God can.",
      "I will heal their backsliding, I will love them freely: for mine anger is turned away from him. That word freely is the whole answer to chapter thirteen. Not because Israel earned it back. Because God chose to give it.",
      "I will be as the dew unto Israel: he shall grow as the lily... his beauty shall be as the olive tree. The book that opened with an unfaithful marriage closes with a garden. Ephraim shall say, What have I to do any more with idols? I am like a green fir tree. From me is thy fruit found. God, not the idol, is named as the source of the fruit all along.",
      "Who is wise, and he shall understand these things? for the ways of the LORD are right, and the just shall walk in them: but the transgressors shall fall therein. Hosea's very last line is not a summary. It is a question, left standing, for whoever is listening.",
    ]),
    joel(1, 1, 12, [
      "The word of the LORD that came to Joel the son of Pethuel. New book, new voice, and the story starts with no warm-up at all.",
      "That which the palmerworm hath left hath the locust eaten; and that which the locust hath left hath the cankerworm eaten; and that which the cankerworm hath left hath the caterpiller eaten. Four waves of insects, each one finishing off whatever the last one missed. Nothing gets a second chance to grow back.",
      "Lament like a virgin girded with sackcloth for the husband of her youth. Joel reaches for the rawest grief he can name, a young widow mourning a marriage that barely started, to describe a farming disaster. That tells you how bad it is.",
      "Be ye ashamed, O ye husbandmen; howl, O ye vinedressers... because joy is withered away from the sons of men. This is not only an economic loss. Joel says the joy itself dried up along with the crops.",
    ]),
    joel(1, 13, 20, [
      "Alas for the day! for the day of the LORD is at hand, and as a destruction from the Almighty shall it come. First appearance of a phrase that becomes this entire book's center. The locust plague is not just a bad harvest. Joel reads it as a warning of something far larger coming.",
      "The seed is rotten under their clods, the garners are laid desolate, the barns are broken down. Everything built to hold a harvest now stands empty, and there is nothing left even to put in it.",
      "How do the beasts groan! the herds of cattle are perplexed, because they have no pasture. A strange, specific detail. The animals themselves look confused, not just hungry, standing in fields that used to feed them and no longer do.",
      "O LORD, to thee will I cry: for the fire hath devoured the pastures of the wilderness... The beasts of the field cry also unto thee. Joel's own prayer, and he says the animals are crying out too. In a book about total loss, even the ground and its creatures turn toward God before the people do.",
    ]),
  ],
  closing: [
    ["So that is Day 261.", 700],
    ["Hosea ends the only way it could. Not a punishment. An invitation. Return unto the LORD thy God.", 750],
    ["I will heal their backsliding, I will love them freely. Not because Israel finally earned it. Because God said freely and meant it.", 800],
    ["And then, with no transition at all, a locust swarm strips a whole country bare, and a new prophet starts speaking.", 800],
    ["Four waves of insects. Nothing gets to grow back between them.", 750],
    ["Joel says even the cattle groan. Even the ground itself cries out to God before any person does.", 800],
    ["Tomorrow, Joel 2 and 3, and the start of Amos. The day of the Lord Joel just named keeps building.", 850],
    ["For now, hold Hosea's last question.", 750],
    ["The ways of the LORD are right, and the just shall walk in them.", 800],
    ["Who is wise enough to understand that.", 1200],
  ],
};
