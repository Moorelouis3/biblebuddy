import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 126, written to the Day 1 standard.
 *
 * Job swears his final, exhaustive oath of innocence and falls silent, and
 * into that silence a younger man who has been waiting the whole book
 * finally speaks. Seven blocks across four chapters, matching Day 125.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 126,
  title: "Job's Integrity and Elihu Speaks",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 126.", 700],
    ["Job takes one last oath. If he has done any of the things his friends accused him of, he says, let it all come crashing down on him.", 800],
    ["Then he stops talking completely.", 900],
    ["And into that silence, a much younger man finally opens his mouth.", 800],
    ["We are in Job 31 through 34. Job's final defense, and Elihu's first three speeches.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 31, 1, 15, [
      "Job starts his last defense with the smallest sin first, and works outward. I made a covenant with mine eyes, he says. Why then should I think upon a maid? He is talking about a look before it ever becomes an act.",
      "He says God is watching every step. Doth not he see my ways, and count all my steps? If he has walked in vanity or deceit, let me be weighed in an even balance, that God may know mine integrity. He wants to be tested, not excused.",
      "He denies mistreating his own servants too. If I did despise the cause of my manservant or my maidservant, when they contended with me, what then shall I do when God riseth up?",
      "Then he gives the reason. Did not he that made me in the womb make him? And did not one fashion us in the womb? A servant and a master, formed by the same hands. That is Job's actual argument against cruelty.",
    ]),
    g("job", 31, 16, 34, [
      "Job keeps listing what he never did. If I have withheld the poor from their desire, or caused the eyes of the widow to fail. If I have seen any perish for want of clothing, or any poor without covering.",
      "He says the fatherless boy he raised called him father, and grew up warmed by the fleece of his own sheep. If I have lifted up my hand against the fatherless, when I saw my help in the gate, then let mine arm fall from my shoulder blade.",
      "He denies making gold his hope, denies secretly worshiping the sun and moon, denies gloating when an enemy fell. If I rejoiced at the destruction of him that hated me, or lifted up myself when evil found him.",
      "He even denies hiding his sin the way Adam did. If I covered my transgressions as Adam, by hiding mine iniquity in my bosom. Job names the very first cover-up in the Bible and says he never did that either.",
    ]),
    g("job", 31, 35, 40, [
      "Then Job says the thing he has wanted to say the whole book. Oh that one would hear me. He wants the Almighty to answer him, and he wants his accuser's case written down where he can see it.",
      "Surely I would take it upon my shoulder, and bind it as a crown to me. He is that confident he has done nothing to deserve this. As a prince would I go near unto him. Not crawling. Walking in.",
      "He even puts his own land under oath. If my land cry against me, or the furrows likewise thereof complain, let thistles grow instead of wheat. He will let the ground itself testify against him if he is lying.",
      "The words of Job are ended. Four words, and thirty-one chapters of arguing stop cold. He has said everything he has to say, and now he waits.",
    ]),
    g("job", 32, 1, 22, [
      "The three friends stop, because Job would not back down. And a new voice gets angry. Elihu, the son of Barachel the Buzite, has been sitting there the whole time, and now his wrath is kindled.",
      "He is angry at Job, because he justified himself rather than God. And he is angry at the three friends, because they had found no answer, and yet had condemned Job. Nobody in the circle comes off clean to Elihu.",
      "He explains why he waited. Days should speak, and multitude of years should teach wisdom. He respected his elders. But there is a spirit in man, and the inspiration of the Almighty giveth them understanding. Great men are not always wise.",
      "Then he says he cannot hold it in any longer. I am full of matter, the spirit within me constraineth me. My belly is as wine which hath no vent. And he promises one thing the other three never managed. I know not to give flattering titles. He is not here to be polite.",
    ]),
    g("job", 33, 1, 18, [
      "Elihu turns straight to Job. Hear my speeches, and hearken to all my words. My words shall be of the uprightness of my heart, and my lips shall utter knowledge clearly.",
      "He makes sure Job knows he is not God either. I also am formed out of the clay. My terror shall not make thee afraid. He wants an honest argument, not another accuser Job has to fear.",
      "Then he quotes Job back to him. Thou hast said, I am clean without transgression, I am innocent. And Elihu answers, in this thou art not just. God is greater than man. Why dost thou strive against him?",
      "Then he explains one way God actually speaks. In a dream, in a vision of the night, when deep sleep falleth upon men. He openeth the ears of men, to withdraw man from his purpose, and hide pride from man. Warning, before the fall.",
    ]),
    g("job", 33, 19, 33, [
      "Elihu names a second way God speaks. He is chastened also with pain upon his bed, and the multitude of his bones with strong pain. So that his life abhorreth bread, and his soul dainty meat. Sometimes the warning is the suffering itself.",
      "But even there, he says, mercy is waiting. If there be a messenger with him, an interpreter, one among a thousand, to shew unto man his uprightness. Then he is gracious unto him, and saith, deliver him from going down to the pit: I have found a ransom.",
      "His flesh shall be fresher than a child's. He shall pray unto God, and God will be favourable unto him, and he shall see his face with joy. Restoration, not just rescue.",
      "Elihu closes by asking Job to actually engage him. If thou hast any thing to say, answer me. If not, hearken unto me, and I shall teach thee wisdom. He wants a conversation. It is starting to sound like a lecture.",
    ]),
    g("job", 34, 1, 37, [
      "Elihu widens the circle and asks anyone listening to judge for themselves. Let us choose to us judgment, let us know among ourselves what is good. Then he quotes Job again. Job hath said, I am righteous, and God hath taken away my judgment.",
      "Elihu will not accept that God could ever be unjust. Far be it from God, that he should do wickedness, and from the Almighty, that he should commit iniquity. For the work of a man shall he render unto him, and cause every man to find according to his ways.",
      "He argues God does not need lobbying like a king, because God already sees everyone equally. Him that accepteth not the persons of princes, nor regardeth the rich more than the poor. For his eyes are upon the ways of man, and he seeth all his goings.",
      "Then Elihu turns hard on Job. Job hath spoken without knowledge, and his words were without wisdom. My desire is that Job may be tried unto the end. Elihu believes he is defending God. He does not seem to notice what that costs the man in front of him.",
    ]),
  ],
  closing: [
    ["So that is Day 126.", 700],
    ["Job swore he was innocent, one sin at a time, and then simply stopped talking. The words of Job are ended.", 750],
    ["That silence is its own kind of argument. He said everything he had, and then waited to be answered.", 800],
    ["Instead, Elihu answered. Young, angry, and sure he alone can see what the older men missed.", 800],
    ["He said one true thing. There is a spirit in man, and the inspiration of the Almighty giveth them understanding. Age is not the same thing as wisdom.", 850],
    ["He also said God sometimes speaks through a dream, and sometimes through pain on a bed, and always leaves a way back if a man will hear it.", 850],
    ["But notice what Elihu never once does. He never asks Job how he is doing.", 850],
    ["Tomorrow, Job 35 through 38. Elihu keeps talking, and then God answers out of a storm.", 850],
    ["For now, sit with Job's own silence.", 800],
    ["The words of Job are ended.", 1200],
  ],
};
