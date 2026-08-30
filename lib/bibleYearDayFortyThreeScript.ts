import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 43, written to the Day 1 standard.
 *
 * Numbers 18-21: priestly and Levite duties spelled out after Korah, the red
 * heifer ordinance for cleansing from death, Miriam's death and Moses' sin
 * at the rock, Edom's refusal and Aaron's death on Mount Hor, the fiery
 * serpents and the bronze serpent, and victories over Sihon and Og that
 * finally open the road east of the Jordan. Six blocks across four chapters.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 43,
  title: "Provision, Judgment, and the Bronze Serpent",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 43. The ground just closed over Korah. The camp is still shaking.", 750],
    ["So today God does something unexpected. He hands out job descriptions.", 800],
    ["Then two of the people who have carried this whole story from the beginning die within a few chapters of each other.", 850],
    ["And in between, there is a bite that only heals if you look up at the thing that hurt you.", 850],
    ["We are in Numbers 18 through 21.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(18, 1, 32, [
      "Right after Korah, God tells Aaron and his sons they will bear the iniquity of the sanctuary. The priesthood is not a prize. It is a weight somebody has to carry so the rest of the camp does not die for coming too close.",
      "The Levites are given to help, but only the priests may touch the altar or go behind the veil, on pain of death. The line Korah tried to erase gets drawn again, in writing this time.",
      "Then God tells Aaron the strange part. You shall have no inheritance in their land. I am your part and your inheritance among the children of Israel.",
      "Every other tribe gets a plot of ground. Aaron gets God Himself, and the tithe of the people to live on. No land to defend, no field to worry over. Just the altar, and the God who owns it.",
    ]),
    num(19, 1, 22, [
      "God gives an ordinance for a red heifer, without spot or blemish, one that has never worn a yoke. It is slaughtered outside the camp and burned completely, and its ashes are kept for cleansing.",
      "Anyone who touches a dead body becomes unclean for seven days, and has to be sprinkled with water made from those ashes on the third day and the seventh, or be cut off from Israel.",
      "Even the priest who burns the heifer and the man who gathers its ashes become unclean until evening just for handling the process. Death contaminates everyone near it, including the people trying to clean it up.",
      "This is a wilderness full of graves now. God is giving His people a way to touch death, grieve it, bury it, and still come back into His presence instead of staying unclean forever.",
    ]),
    num(20, 1, 13, [
      "Miriam dies at Kadesh and is buried there. No eulogy, one verse, and the text moves straight on to the next crisis. There is no water for the congregation.",
      "The people gather against Moses and Aaron again, wishing they had died with Korah's group. God tells Moses to speak to the rock in front of everyone and it will give water.",
      "Moses gathers the people, says, hear now, you rebels, must we bring water out of this rock for you, and strikes it twice with his rod instead of speaking to it. Water gushes out anyway.",
      "And God says the cost out loud. Because you did not believe me, to treat me as holy before the eyes of the people, you will not bring this congregation into the land. Forty years of leading them, ended by one moment of taking the credit for himself.",
    ]),
    num(20, 14, 29, [
      "Moses sends word to the king of Edom, calling Israel his brother, and asks for safe passage through his land on the king's highway, promising not to touch a field or a well.",
      "Edom refuses and comes out against them with an army. Israel turns away rather than fight family. The shortest road to Canaan is closed by a relative who will not open his hand.",
      "Then Aaron climbs Mount Hor with Moses and Eleazar, and God tells Moses to strip Aaron of his priestly garments and put them on his son, because Aaron also will not enter the land, for the same rock, the same rebellion at Meribah.",
      "Aaron dies on the mountain. Israel sees Eleazar come down wearing his father's robes, and mourns him thirty days. The priesthood does not die with the man. It just changes shoulders.",
    ]),
    num(21, 1, 9, [
      "A Canaanite king attacks Israel and takes some captive. Israel vows to destroy his cities if God gives victory, and God does, and they name the place Hormah, which means destruction.",
      "Then, almost immediately, the people grow impatient on the road and speak against God and Moses again. Why have you brought us up out of Egypt to die in the wilderness. There is no bread, no water, and our soul loathes this worthless food.",
      "The Lord sends fiery serpents among the people, and many die. The people come to Moses and say, we have sinned, pray that the Lord take the serpents away from us.",
      "God does not remove the serpents. He tells Moses to make a bronze one and set it on a pole, so that everyone bitten who looks at it will live. The cure does not undo the bite. It asks a dying person to look, on purpose, at the shape of what is killing them.",
    ]),
    num(21, 10, 35, [
      "Israel keeps moving, camp by camp, and at one stop the leaders themselves dig a well while the people sing over it. Spring up, O well. Sing to it. A generation that grumbled about water now writes a song for it.",
      "Israel sends peaceful word to Sihon, king of the Amorites, asking only to pass through on the road. Sihon refuses and attacks at Jahaz instead, and Israel defeats him and takes his whole land, from the Arnon to the Jabbok.",
      "An old taunt song about Heshbon gets quoted right there in the text, mocking Moab for what Sihon had already done to them. Israel is not the first army to take that ground. God just gives it to the people He promised it to.",
      "Then Og, king of Bashan, comes out against them at Edrei, and God tells Moses, do not fear him, I have given him into your hand. Israel strikes him down, his sons, and all his people, until none are left, and takes his land too. The road east of the Jordan is finally open.",
    ]),
  ],
  closing: [
    ["So that is Day 43.", 700],
    ["Job descriptions, a red heifer, two deaths, a snake on a pole, and two kingdoms falling.", 750],
    ["Notice what God gave Aaron for an inheritance. Not land. Himself. That is either the smallest reward in the Bible or the largest one, depending on what you actually want.", 850],
    ["And notice how Moses lost the land he had spent his whole life walking toward. Not a rebellion. A moment of taking a miracle and making it about himself instead of God.", 850],
    ["Then the bronze serpent. God did not take the danger away. He gave a dying people something specific to look at instead of looking at their own wound.", 850],
    ["Centuries later, Jesus points straight back at this chapter and says that is what He is going to be. Lifted up, so that whoever looks may live.", 850],
    ["Tomorrow, Numbers 22 through 25. A prophet for hire, a donkey that sees more than he does, and a compromise that costs Israel more than any battle did.", 850],
    ["For now, picture that pole in the middle of the camp.", 800],
    ["Everyone bitten. Everyone dying.", 750],
    ["Everyone who looked, lived.", 1200],
  ],
};
