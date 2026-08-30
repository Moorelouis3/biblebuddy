import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 42, written to the Day 1 standard.
 *
 * Numbers 14-17: the whole nation refuses to go up after the spies' report,
 * God's sentence of forty years, laws given anyway as a sign the promise
 * still stands, Korah's rebellion against Moses and Aaron, and Aaron's rod
 * budding to settle the question of the priesthood for good. Six blocks
 * across four chapters, teaching four lines each like Day 41.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 42,
  title: "Rebellion and God's Chosen Priesthood",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 42. Yesterday ten spies came back afraid.", 750],
    ["Today the whole camp agrees with them.", 800],
    ["And a journey that should have taken months turns into forty years, in a single afternoon.", 850],
    ["Then, right in the middle of that judgment, another rebellion breaks out. This time against Moses and Aaron themselves.", 850],
    ["We are in Numbers 14 through 17.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(14, 1, 10, [
      "All the congregation lifts up their voice and weeps that whole night. Would that we had died in the land of Egypt, or in this wilderness.",
      "They talk about choosing a new leader and going back. Joshua and Caleb tear their clothes and beg them not to rebel. The land is exceedingly good. If the Lord delights in us, He will bring us in.",
      "The congregation talks about stoning them. Not arguing with them. Stoning them.",
      "And right then, the glory of the Lord appears at the tent of meeting, in front of everyone. This is not a quiet family disagreement anymore. It is open rebellion against God.",
    ]),
    num(14, 11, 25, [
      "God asks Moses how long this people will despise Him, after every sign He has done among them, and offers to wipe them out and start over through Moses alone.",
      "Moses does not defend the people's behavior. He appeals to God's own name and reputation among the nations, and to what God has already revealed about Himself. The Lord is longsuffering, and abundant in mercy, forgiving iniquity and transgression, and by no means clearing the guilty.",
      "God says, I have pardoned according to your word. The people are forgiven. But forgiveness and consequence are not the same thing, and what comes next proves it.",
      "Because they have tested Him now ten times and not listened to His voice, not one of that generation will see the land, except Caleb, because he had a different spirit and followed the Lord fully.",
    ]),
    num(14, 26, 45, [
      "God turns the number against them. Forty days you spied the land, one year for each day, you will bear your guilt forty years, and know what it means to have Me against you.",
      "Everyone twenty years old and up who complained will fall in this wilderness. Their children, the very ones they said would be taken as plunder, will be the ones who inherit the land.",
      "Then, hearing the sentence, the people mourn and decide to go up after all, without Moses, without the ark. Moses warns them the Lord is not with them. They go up anyway and are struck down by the Amalekites and Canaanites.",
      "Presumption dressed up as obedience is still disobedience. They would not go up when God said go. Now they insist on going up after God said stop.",
    ]),
    num(15, 1, 41, [
      "Right after that judgment, God starts talking about offerings to bring when you come into the land I am giving you. Not if. When. The promise is not canceled. It is only delayed for the ones who refused it.",
      "There are laws for sins committed unintentionally, with a way back through sacrifice. But the person who sins defiantly, with a high hand, is cut off. Numbers even gives a real case: a man gathering sticks on the Sabbath, and the whole camp has to decide what to do with him.",
      "Then God tells Israel to put tassels on the corners of their garments, with a blue cord, so that you look at it and remember all the commandments of the Lord and do them, instead of following after your own heart and your own eyes.",
      "A generation that just followed its own eyes into a graveyard of unbelief is handed a small daily reminder, sewn into their clothes, to stop that from happening again.",
    ]),
    num(16, 1, 50, [
      "Korah, along with Dathan, Abiram, and two hundred fifty leaders, rises up against Moses and Aaron. You have gone too far. All the congregation is holy, every one of them. Why then do you exalt yourselves?",
      "Moses falls on his face, then tells them to bring incense in the morning and let the Lord show who is holy. The ground opens under Korah's household and swallows them alive, and fire consumes the two hundred fifty men offering incense.",
      "The very next day, the people blame Moses and Aaron for the deaths. You have killed the people of the Lord. A plague breaks out immediately, and this time Aaron himself runs into the middle of it with incense.",
      "He stands between the dead and the living, and the plague stops. The very priesthood Korah tried to seize is the thing that saves the people who were still blaming him for it.",
    ]),
    num(17, 1, 13, [
      "God tells Moses to take a rod from the leader of each tribe, write each man's name on his own rod, and lay all twelve overnight before the ark. Aaron's name is on the rod for Levi.",
      "In the morning, Aaron's rod alone has budded, put forth blossoms, and produced ripe almonds. A cut, dead piece of wood, bearing fruit overnight.",
      "God tells Moses to put it back before the ark as a sign for the rebels, that their murmuring may cease, or else they will die.",
      "The people respond in fear, saying they are as good as dead, everyone who comes near the tabernacle will die. It takes a plague, a swallowed household, and a budding stick to finally settle who was chosen and who was not.",
    ]),
  ],
  closing: [
    ["So that is Day 42.", 700],
    ["A refusal, a sentence, and two more rebellions before the dust even settles.", 750],
    ["Look at what God does the moment He finishes sentencing this generation to forty years in the wilderness. He starts giving laws for offerings in the land. Not if you get there. When.", 850],
    ["The promise never stopped being true. It just stopped belonging to the people who would not trust it.", 850],
    ["And Korah's whole argument was that everyone is equally holy, so nobody needs a mediator. God answered that with a hole in the ground, a plague, and a priest running into the middle of it to stop the dying.", 850],
    ["A dead stick did not grow almonds by nature. Life came from where God chose to put it. That is what a priesthood is for.", 850],
    ["Tomorrow, Numbers 18 through 21. Priestly duties get spelled out, a red heifer cleanses death, and Moses himself will lose something he cannot get back.", 850],
    ["For now, hold on to the tassel.", 800],
    ["A small blue thread, sewn in on purpose.", 750],
    ["So the eyes stop leading the heart.", 1200],
  ],
};
