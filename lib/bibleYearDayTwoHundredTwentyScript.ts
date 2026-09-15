import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 220, written to the Day 1 standard.
 *
 * Jeremiah 7-9: Jeremiah stands in the temple gate itself and tells the
 * crowd the building cannot save them, God tells him to stop praying for
 * the people, and by chapter 9 the prophet is no longer just delivering
 * judgment - he is asking for his own eyes to become a fountain of tears.
 * Seven blocks across three chapters (82 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 220,
  title: "Temple Trust and Tears",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 220. Jeremiah goes and stands in the gate of the temple itself.", 750],
    ["The one place everyone in Jerusalem thought was safe. He tells them it is not.", 800],
    ["The judgment that follows gets its own name. The valley of slaughter.", 800],
    ["And by the end, Jeremiah is not preaching anymore. He is asking for his eyes to become a fountain of tears.", 850],
    ["We are in Jeremiah 7, 8, and 9.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 15, [
      "God sends Jeremiah to stand in the gate of his own house and preach against it. Trust ye not in lying words, saying, The temple of the Lord, the temple of the Lord, the temple of the Lord, are these. They said it three times, like a chant, like the building itself was the promise.",
      "The offer underneath it is still real. Amend your ways and your doings, and I will cause you to dwell in this place. Stop oppressing the stranger, the fatherless, the widow. Stop shedding innocent blood. Then stay.",
      "But they had already turned the temple into a hideout. Is this house, which is called by my name, become a den of robbers in your eyes? You can sin all week and walk in here to feel safe. That is the exact charge.",
      "So God points them to Shiloh, the older worship site, now just gone, and says go look at what happened there. The building did not save Shiloh. It will not save this one either.",
    ]),
    g(7, 16, 34, [
      "God tells Jeremiah something almost impossible to hear. Pray not thou for this people. Not because Jeremiah's prayers are weak. Because the door is now shut.",
      "The whole family is in on it. Children gathering wood, fathers lighting the fire, women baking cakes for the queen of heaven. A family assembly line for idolatry, and nobody in it thinks they are doing anything wrong.",
      "God says he never even asked for the sacrifices they are so proud of. I spake not unto your fathers concerning burnt offerings. What he asked for was obey my voice, and I will be your God. Obedience, not ritual, was always the actual request.",
      "So the place where they burned their own sons and daughters gets a new name. Tophet becomes the valley of slaughter. Whatever a people is willing to sacrifice their children to is the thing that eventually consumes them.",
    ]),
    g(8, 1, 12, [
      "The judgment gets specific and ugly. The bones of kings, princes, priests, and prophets will be dug up and spread out under the sun and the stars they worshipped instead of God. The very things they served will watch them rot unburied.",
      "God asks a question that sounds almost gentle in the middle of all this. Shall they fall, and not arise? Shall he turn away, and not return? Recovery was always possible. Nobody in the story takes him up on it.",
      "Even the birds keep their calendar better than God's people keep theirs. The stork knows her appointed times. But my people know not the judgment of the Lord. Nature obeys instinct. Israel will not obey a voice.",
      "And the worst diagnosis in the chapter is a lie the leaders told for money. They have healed the hurt of the daughter of my people slightly, saying, Peace, peace, when there is no peace. Not one honest doctor in the whole building.",
    ]),
    g(8, 13, 22, [
      "God looks for fruit and finds none. There shall be no grapes on the vine, nor figs on the fig tree, and the leaf shall fade. Everything he planted them to produce is gone.",
      "The people's own words get quoted back to them. We looked for peace, but no good came; and for a time of health, and behold trouble. They expected the harvest to save them, and it did not.",
      "Then Jeremiah stops reporting and starts feeling it. For the hurt of the daughter of my people am I hurt; I am black; astonishment hath taken hold on me. The prophet is not standing outside this grief. He is inside it.",
      "And he asks the question the whole chapter has been building to. Is there no balm in Gilead? Is there no physician there? Why then is not the health of the daughter of my people recovered? Gilead had real medicine. The sickness here was never in the body.",
    ]),
    g(9, 1, 11, [
      "Jeremiah opens with a wish that is almost too honest to be comfortable. Oh that my head were waters, and mine eyes a fountain of tears, that I might weep day and night for the slain of my people. He is not performing sorrow. He wants to drown in it.",
      "He even says he would rather run to the desert and live alone than stay among people like this. For they be all adulterers, an assembly of treacherous men. Loneliness sounds better to him than this company.",
      "The sin he names first is not violence. It is speech. They bend their tongues like their bow for lies. Every neighbor walks with slanders. Every brother will utterly supplant. You cannot trust the person standing next to you.",
      "So God says he will melt them and try them, the way you refine metal. For how shall I do for the daughter of my people? Even the announcement of judgment comes out sounding like grief, not triumph.",
    ]),
    g(9, 12, 22, [
      "God answers the question nobody in the story could answer for themselves. Why does the land perish and burn like a wilderness nobody can pass through? Because they have forsaken my law which I set before them, and have not obeyed my voice.",
      "They did not drift into this by accident. They walked after the imagination of their own heart, and after Baalim, which their fathers taught them. Idolatry got inherited like a family trade.",
      "So God tells Jeremiah to hire the cunning women skilled in wailing, because the coming grief needs to be taught like a skill. Teach your daughters wailing, and every one her neighbour lamentation. This nation is about to need practice at grief.",
      "The image that lands hardest is the smallest one. Death is come up into our windows, and is entered into our palaces, to cut off the children from without, and the young men from the streets. Not a battlefield first. A window in your own house.",
    ]),
    g(9, 23, 26, [
      "In the middle of all this, God says what he actually wants from a person. Let not the wise man glory in his wisdom, neither the mighty man in his might, nor the rich man in his riches. None of the three things people usually build their identity on.",
      "Instead, let him that glorieth glory in this, that he understandeth and knoweth me, that I am the Lord which exercise lovingkindness, judgment, and righteousness in the earth. Knowing God, not achieving anything, is the one thing worth being proud of.",
      "Then the chapter widens past Judah alone. Egypt, Edom, Ammon, Moab, all the surrounding nations get named as uncircumcised too. And so is the house of Israel, uncircumcised in the heart.",
      "The physical sign they trusted in was never the point. A body can carry the mark and still house a heart that never actually turned. That is the same warning chapter 4 already gave, back for a second pass.",
    ]),
  ],
  closing: [
    ["So that is Day 220.", 700],
    ["Jeremiah stood in the temple gate and told the truth to the one crowd guaranteed to hate hearing it.", 750],
    ["The building was never the promise. Obedience was the promise, and they had stopped keeping it long before they stopped showing up to worship.", 800],
    ["And somewhere in the middle of preaching all of that, Jeremiah stopped being a messenger and became a mourner. Oh that my head were waters.", 800],
    ["Even the judgment God announces comes out sounding like grief. For how shall I do for the daughter of my people.", 800],
    ["One line stands over the whole day, though. Let him that glorieth glory in this, that he understandeth and knoweth me.", 850],
    ["Tomorrow, Jeremiah 10 through 12. Idols get mocked for being unable to walk on their own, and Jeremiah brings God a real complaint of his own.", 850],
    ["For now, hear the question Jeremiah asked out loud.", 750],
    ["Is there no balm in Gilead?", 750],
    ["There was. They just wouldn't take it.", 1200],
  ],
};
