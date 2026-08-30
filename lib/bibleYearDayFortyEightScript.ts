import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 48, written to the Day 1 standard.
 *
 * Deuteronomy 2-5: the thirty-eight wilderness years reviewed, Edom and
 * Moab and Ammon left alone on purpose, Sihon and Og defeated, Moses's
 * plea to cross the Jordan refused, the warning against idolatry and the
 * promise of mercy even after exile, and the covenant at Horeb retold with
 * the Ten Commandments restated word for word. Seven blocks across one
 * heavy four-chapter reading, matching the shape Day 47 used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 48,
  title: "Remembering the Journey and the Covenant",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 48. Moses keeps looking back, and today the story gets bigger than just Israel.", 750],
    ["Two whole nations get left alone on purpose. A giant king with an iron bed frame gets wiped out. And Moses begs God for one thing he does not get.", 850],
    ["Then he stops recapping and starts teaching. By the end of today you will hear the Ten Commandments again, word for word, spoken to a generation that was not even alive the first time.", 850],
    ["We are in Deuteronomy 2 through 5.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(2, 1, 23, [
      "Moses recaps the wandering plainly. For thirty-eight years they circled Mount Seir, going nowhere, until the whole generation of fighting men died out, exactly the way God said it would happen.",
      "Then God gives an order that is easy to miss the weight of. Do not touch Edom. Do not touch Moab. Both are relatives, Esau's line and Lot's line, and God already gave them their land the same way He is about to give Israel this one.",
      "Buried right in the middle of the recap is a strange detail. Giants lived in this country before, and God cleared them out for other peoples long before Israel ever left Egypt. This has been His pattern the whole time, not something invented for you.",
      "It is easy to think the story you are living in is the only one that matters to God. Moses just told you it isn't. You are one chapter in something He was already doing.",
    ]),
    deut(2, 24, 37, [
      "Sihon, king of Heshbon, gets a different treatment. Moses sends him peaceable words first. Let me pass through your land. I will pay for the food and water. I will not turn aside.",
      "Sihon refuses, and Moses is honest about why. The Lord your God hardened his spirit, and made his heart obstinate, that he might deliver him into thy hand.",
      "Israel defeats him and takes every city, and this time nothing is left standing, not even the women and children. Moses does not soften that number.",
      "One nation gets spared without a fight. Another gets destroyed after refusing peace. The difference in this story is not how strong either side was. It is what God had already decided to do with each one.",
    ]),
    deut(3, 1, 11, [
      "Og, king of Bashan, comes out to fight at Edrei with his whole army, and loses everything. Sixty cities, every one of them fortified with high walls, gates, and bars.",
      "Moses adds one detail that has nothing to do with the battle. Og's bed, made of iron, was nine cubits long. He wants you to picture exactly how big this enemy was before he tells you Israel beat him without losing sleep over it.",
      "That bed frame gets stored, of all places, in Rabbah, a city that belongs to the Ammonites. A trophy sitting in the house of a nation Israel was never even allowed to fight.",
      "The giant king with a nine-cubit bed is not a legend at the edge of the story. He is one more name on Moses's list of enemies who did not survive meeting this God.",
    ]),
    deut(3, 12, 29, [
      "The land Israel just won, Gilead and Bashan, goes to Reuben, Gad, and half of Manasseh, on the condition Moses already made them keep. Their armed men cross the Jordan first and fight for everyone else before they go home to their own side.",
      "Moses tells Joshua directly what he is about to inherit. Your own eyes have seen what the Lord did to these two kings. He will do the same to every kingdom you cross into. Do not fear them. He fights for you.",
      "Then Moses tells the people something about himself. I pleaded with the Lord to let me cross over and see the good land, the mountain, the whole country beyond the river. And the Lord was angry with me for your sakes, and would not hear me.",
      "Get up to the top of Pisgah, God tells him. Look at it with your eyes, because you are not going over. Charge Joshua. Strengthen him. He is the one who crosses. Moses does not get to finish the journey he has led for forty years.",
    ]),
    deut(4, 1, 31, [
      "Moses gives the people a rule for how to handle everything he is about to say. Do not add to this word, and do not take away from it. Just keep what I am commanding you.",
      "He reminds them what happened to the people who followed Baal at Peor, a plague on this very trip, and sets it against everyone still standing here today, alive, because they held on to God instead.",
      "Then the warning gets specific. When you have children and grandchildren in this land, and you grow careless, and you carve an image and bow to it, you will be scattered among the nations, few in number, worshiping gods that cannot see or hear or eat.",
      "But he does not end there. If you seek the Lord from that scattered place, with all your heart and all your soul, you will find him. He will not forget the covenant with your fathers. Even the warning about losing everything ends with a door still open.",
    ]),
    deut(4, 32, 49, [
      "Moses asks a question meant to stop you cold. Did ever a people hear the voice of God speaking out of the middle of fire, the way you have heard it, and live? Has any god ever tried to take a nation for himself out of the middle of another nation, the way the Lord did for you out of Egypt?",
      "The point is not that Israel is impressive. The point is that nothing like this has happened to anyone else. You were not chosen because you were the strongest option. You were chosen, full stop, and now you owe your whole life to the God who did it.",
      "In the middle of that argument, Moses stops and sets apart three cities of refuge on this side of the Jordan. Bezer, Ramoth, and Golan. Even while making his biggest theological case of the book, he does not skip the practical mercy someone might need tomorrow.",
      "Then the chapter closes with where they are standing right now. On this side of Jordan, in the valley over against Beth-peor, in the land of Sihon, the very king they just defeated. The lesson and the location are the same ground.",
    ]),
    deut(5, 1, 33, [
      "Moses calls all Israel together and says something that should stop you. The Lord made this covenant not with our fathers, but with us, every one of us here alive today. He is talking to people who were children or not yet born at Horeb, and telling them the covenant is theirs anyway.",
      "Then he says the commandments again, almost word for word from Sinai. No other gods. No graven images. Do not take His name in vain. Keep the Sabbath. Honor your father and mother. No murder, no adultery, no theft, no false witness, no coveting.",
      "One thing changes. The reason for the Sabbath is not creation this time. Remember that you were a servant in Egypt, and the Lord brought you out with a mighty hand. That is why you rest, and let your servant rest too.",
      "The people had been terrified at the mountain and begged Moses to stand between them and God. Speak to us yourself, and we will hear and do it. And God says he wishes their hearts would always stay that willing. Not because he wants distance from them. Because obedience like that is what keeps them alive.",
    ]),
  ],
  closing: [
    ["So that is Day 48.", 700],
    ["Two nations spared, two kings destroyed, and one giant's iron bed hauled off as proof of what happened.", 800],
    ["Moses asked to cross the river and was told no. Get up the mountain, look at it, and hand the rest of the job to Joshua.", 800],
    ["He does not hide how much that cost him. He also does not stop leading because of it.", 800],
    ["Then he stood the whole nation back in front of Horeb, in words, and said the covenant belongs to every one of them, not just the parents who first heard it.", 850],
    ["The commandments came again, almost unchanged, except for one line about Egypt tucked into the reason for rest.", 800],
    ["Tomorrow, Deuteronomy 6 through 9. Moses tells them to love God with everything they have, and reminds them exactly why they owe Him that.", 850],
    ["For now, hold on to what he told Joshua.", 750],
    ["He fights for you.", 1200],
  ],
};
