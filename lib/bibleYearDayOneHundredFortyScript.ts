import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 140, written to the Day 1 standard.
 *
 * Psalms 34-36: relief spoken out loud one verse after another, a much
 * harder prayer over betrayal by people he actually mourned for, and a
 * psalm that holds both the small private start of sin and the enormous
 * scale of God's mercy in the same twelve verses. Psalm 34 splits at its
 * own turn from praise to instruction; Psalm 35 splits into its three
 * movements (plea, betrayal, vindication); Psalm 36 stays whole.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 140,
  title: "Taste and See God's Goodness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 140.", 750],
    ["Yesterday ended on David handing you his own words to pray.", 750],
    ["Today he tells you to taste it for yourself.", 750],
    ["Psalm thirty-four is relief spoken out loud, one verse after another.", 750],
    ["Psalm thirty-five is a much harder prayer. Betrayal by people he actually mourned for when they were down.", 850],
    ["And Psalm thirty-six holds both at once. How small sin starts, and how large God's mercy actually is.", 850],
    ["We are in Psalms 34 through 36.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(34, 1, 11, [
      "I will bless the LORD at all times: his praise shall continually be in my mouth... O magnify the LORD with me, and let us exalt his name together. At all times, not just when things go well. This is a decision, stated up front, before he explains why.",
      "I sought the LORD, and he heard me, and delivered me from all my fears... This poor man cried, and the LORD heard him, and saved him out of all his troubles. He calls himself this poor man, like he is retelling someone else's rescue instead of his own.",
      "O taste and see that the LORD is good: blessed is the man that trusteth in him. Taste, not just hear about. He is not asking you to believe a report secondhand. He is asking you to try it yourself.",
      "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing. Young lions are apex predators, built for the hunt, and they still go hungry. The contrast is deliberate.",
    ]),
    g(34, 12, 22, [
      "What man is he that desireth life, and loveth many days, that he may see good?... Keep thy tongue from evil... Depart from evil, and do good; seek peace, and pursue it. The psalm turns from praise straight into instruction, addressed to children listening in.",
      "The eyes of the LORD are upon the righteous, and his ears are open unto their cry. The face of the LORD is against them that do evil. Same attention, pointed two directions. Watching to help. Watching to oppose.",
      "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit. Nearness is tied specifically to being broken, not to having everything together.",
      "Many are the afflictions of the righteous: but the LORD delivereth him out of them all. He keepeth all his bones: not one of them is broken. Centuries later, that exact line about unbroken bones is quoted about Jesus's body, still whole, on the cross.",
    ]),
    g(35, 1, 10, [
      "Plead my cause, O LORD, with them that strive with me: fight against them that fight against me... say unto my soul, I am thy salvation. He asks God to physically fight for him, in weapon language. Shield, buckler, spear.",
      "Let them be confounded and put to shame that seek after my soul... let them be as chaff before the wind: and let the angel of the LORD chase them. Chaff is the worthless husk the wind carries off after the real grain is threshed out. That is the picture he wants for his enemies.",
      "For without cause have they hid for me their net in a pit... let his net that he hath hid catch himself: into that very destruction let him fall. He is not asking for anything new. He is asking their own trap catch them instead of him.",
      "And my soul shall be joyful in the LORD: it shall rejoice in his salvation. All my bones shall say, LORD, who is like unto thee, which deliverest the poor from him that is too strong for him. The fight language turns to gratitude before the rescue has even landed.",
    ]),
    g(35, 11, 18, [
      "False witnesses did rise up; they laid to my charge things that I knew not. They rewarded me evil for good to the spoiling of my soul. Accused of something he never did, then punished for kindness he actually gave.",
      "But as for me, when they were sick, my clothing was sackcloth: I humbled my soul with fasting... I bowed down heavily, as one that mourneth for his mother. This is how he treated them when they were down. Mourned for them like family. That is what makes the next verse land so hard.",
      "But in mine adversity they rejoiced, and gathered themselves together... With hypocritical mockers in feasts, they gnashed upon me with their teeth. No return on any of it. They mocked him at the exact moment he needed them.",
      "Lord, how long wilt thou look on? rescue my soul from their destructions, my darling from the lions. I will give thee thanks in the great congregation. He names the actual question, how long, and then promises public thanks before he has been answered at all.",
    ]),
    g(35, 19, 28, [
      "Let not them that are mine enemies wrongfully rejoice over me... they opened their mouth wide against me, and said, Aha, aha, our eye hath seen it. He quotes the exact taunt, not a paraphrase of it.",
      "This thou hast seen, O LORD: keep not silence... Judge me, O LORD my God, according to thy righteousness. He does not ask God to simply take his side. He asks to be judged by the same righteous standard he wants used against his accusers.",
      "Let them not say in their hearts, Ah, so would we have it... let them be clothed with shame and dishonour that magnify themselves against me. He seems to fear their gloating almost as much as the harm itself.",
      "Let them shout for joy, and be glad, that favour my righteous cause... my tongue shall speak of thy righteousness and of thy praise all the day long. The psalm ends by turning the attention entirely off himself, onto praise that will outlast the whole conflict.",
    ]),
    g(36, 1, 12, [
      "The transgression of the wicked saith within my heart, that there is no fear of God before his eyes. For he flattereth himself in his own eyes, until his iniquity be found to be hateful... He deviseth mischief upon his bed. Sin described as something spoken privately inside a person, a verdict reached before any action, that only stops flattering itself once it gets caught.",
      "Thy mercy, O LORD, is in the heavens; and thy faithfulness reacheth unto the clouds. Thy righteousness is like the great mountains; thy judgments are a great deep. Four enormous images back to back, sky, clouds, mountains, ocean depth, right after describing how small and private sin's beginning actually is.",
      "How excellent is thy lovingkindness, O God!... they shall be abundantly satisfied with the fatness of thy house, and thou shalt make them drink of the river of thy pleasures. For with thee is the fountain of life. The scale flips from distant and immense to close and personal. Shelter under wings. A house. A river. A fountain.",
      "O continue thy lovingkindness unto them that know thee... let not the hand of the wicked remove me. There are the workers of iniquity fallen: they are cast down, and shall not be able to rise. The psalm ends back where it started, the wicked, only now they are already fallen instead of still scheming.",
    ]),
  ],
  closing: [
    ["So that is Day 140.", 700],
    ["Relief spoken out loud, betrayal from people he mourned for, and mercy measured against the sky and the sea.", 850],
    ["Notice verse twenty in Psalm thirty-four.", 700],
    ["He keepeth all his bones: not one of them is broken.", 800],
    ["Centuries later, that exact line is quoted about Jesus's body, still whole, on the cross.", 850],
    ["Psalm thirty-four does not just tell you God is good. It tells you to taste it.", 800],
    ["Tomorrow, Psalms 37 through 39. Waiting, wisdom, and how short a life actually is.", 800],
    ["For now, do what David said.", 750],
    ["O taste and see that the LORD is good.", 800],
    ["Try it. See if it's true.", 1200],
  ],
};
