import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 112, written to the Day 1 standard.
 *
 * Ezra 8-10 and Nehemiah 1 cross a decade in four chapters: a second wave
 * makes the dangerous trip home safely, immediately discovers the people who
 * stayed behind have intermarried with the surrounding nations, works through
 * a costly public repentance, and closes with Nehemiah, still in Persia,
 * grieving over a broken wall he has never seen. Seven blocks.
 */

const ezra = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezra ${chapter}:${startVerse}-${endVerse}`,
  book: "ezra",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const nehemiah = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nehemiah ${chapter}:${startVerse}-${endVerse}`,
  book: "nehemiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWELVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 112,
  title: "Return, Repentance, and Nehemiah's Burden",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 112. A second wave heads home today, and it almost falls apart the moment it arrives.", 750],
    ["Ezra makes it to Jerusalem safely, treasure intact, prayers answered on the road.", 800],
    ["Then he finds out what the people who stayed behind did while he was traveling.", 800],
    ["And a cupbearer in a foreign palace hears news that will not let him sleep.", 850],
    ["We are in Ezra 8 through 10, and Nehemiah 1.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ezra(8, 1, 14, [
      "This is a list of family heads who travel up with Ezra from Babylon in the reign of Artaxerxes, counted out the same careful way Ezra 2 counted the first wave home decades earlier.",
      "It reads like paperwork, but the paperwork is the point. Every name on it is someone who chose a dangerous trip home over a safe, settled life in Babylon.",
      "This second wave is smaller than the first, and Ezra still records every name in it. God does not need a nation's worth of people to keep working. He works with whoever actually gets up and goes.",
      "This trip happens a full generation after the first exiles came home, which is its own quiet point. Coming home was never a single event finished in one wave. It kept happening as long as someone was willing to make the trip.",
    ]),
    ezra(8, 15, 30, [
      "Ezra gathers everyone at the river and camps there three days, and when he reviews the people and the priests, he finds not one Levite in the whole company.",
      "So he sends for reinforcements before he sends anyone anywhere. He will not lead a company with no one assigned to actually serve once they reach the temple.",
      "Then, at the river, Ezra proclaims a fast, to humble themselves before God and seek from him a right way. He is ashamed to ask the king for soldiers, because he had already told the king God's hand is on everyone who seeks him.",
      "They fast and pray, and then Ezra weighs the silver, gold, and vessels for the journey into the hands of twelve priests, in front of witnesses. He puts his own words about God's protection to the test in the open, not just in private.",
    ]),
    ezra(8, 31, 36, [
      "They leave the river on the twelfth day of the first month, and the hand of their God was upon them, and delivered them from the hand of the enemy and such as lay in wait by the way. The fast Ezra called gets answered on the road.",
      "They rest three days in Jerusalem, and on the fourth day the silver, gold, and vessels are weighed out again, in the temple, before priests and Levites, and the count matches exactly what left Babylon. Nothing entrusted to human hands went missing.",
      "They offer burnt offerings for all Israel: twelve bullocks, ninety-six rams, seventy-seven lambs, and twelve goats for a sin offering, the same symbolic count for all twelve tribes used back at the temple's dedication.",
      "Then the king's commissions are delivered to his governors, and they support the people and the house of God. The empire that could have obstructed this trip ends up funding it instead.",
    ]),
    ezra(9, 1, 15, [
      "Before Ezra can even settle in, the leaders come to him with a report: the people, priests, and Levites have not separated themselves from the surrounding nations, and have taken their daughters as wives for themselves and their sons.",
      "Ezra's response is physical. He tears his garment and his mantle, plucks hair from his head and beard, and sits appalled until the evening sacrifice. This is a man who just watched God answer his prayers on the road, now watching his own people undo it at home.",
      "Then he falls on his knees and prays out loud, in public, where everyone can hear him name the sin honestly. Our iniquities are increased over our head, and our trespass is grown up unto the heavens.",
      "He does not ask God to spare them. He says God has already been more merciful than they deserved, letting even a remnant escape and giving them a nail in his holy place. The prayer is confession, not negotiation.",
    ]),
    ezra(10, 1, 17, [
      "While Ezra is praying and weeping, a very great congregation of men, women, and children gathers around him and weeps too. Shecaniah speaks up: we have trespassed, but there is hope in Israel concerning this thing.",
      "His plan is specific and costly. Let us make a covenant to put away all the wives, and let it be done according to the law. He does not ask Ezra to fix it. He commits the people to fix it themselves.",
      "A proclamation goes out for everyone to gather in Jerusalem within three days, or forfeit their property and be cut off from the congregation. This is not a suggestion. It is a required, public reckoning.",
      "Heavy rain falls the whole time, and the investigation runs from the tenth month to the first, three full months, because the matter required real care and could not be rushed through in a single afternoon.",
    ]),
    ezra(10, 18, 44, [
      "What follows is another list, this time of every man found guilty, priests first, starting with sons of the high priest's own family. Nobody's position exempts them from being named.",
      "Each man listed here gives his hand to put away his wife, and offers a ram for his guilt. This is not just public shame. It is treated the way any other sin needing atonement is treated, with an actual guilt offering.",
      "The list runs on for verse after verse, ordinary names most readers will never recognize again. Ezra records them anyway, because repentance that only happens in the abstract is not the kind this book is interested in.",
      "The chapter, and the book, ends right there, on that list, with no closing speech and no tidy resolution described for the families involved. Ezra lets the hard cost of the covenant stand as the last word.",
    ]),
    nehemiah(1, 1, 11, [
      "Word reaches Nehemiah, cupbearer to the king, in the capital of Shushan: the remnant back in the province are in great affliction and reproach, and the wall of Jerusalem is broken down, and its gates burned with fire.",
      "He sits down and weeps, and mourns certain days, and fasts and prays before the God of heaven, even though he was not there and did not cause any of it. Distance does not stop him from carrying the weight of it.",
      "His prayer opens by naming who God is, and confessing the sin honestly, we have dealt very corruptly against thee, before he asks for a single thing. Then he reminds God, respectfully, of God's own promise to gather scattered people back.",
      "The chapter ends mid-thought. Prosper thy servant this day, and grant him mercy in the sight of this man. For I was the king's cupbearer. Nehemiah is about to walk into a room and ask Artaxerxes for something enormous, and this whole prayer is what happens before he says a single word of it.",
    ]),
  ],
  closing: [
    ["So that is Day 112.", 700],
    ["A dangerous trip home, made safely, because Ezra fasted instead of asking the king for an armed escort.", 800],
    ["Then, almost immediately, the report that undoes it. Intermarriage with the very nations God had warned about for generations.", 800],
    ["Ezra does not lecture anyone. He tears his clothes, falls on his knees, and confesses a sin he did not personally commit.", 850],
    ["And the people respond by naming names and paying a real, costly price to make it right, not just saying they are sorry.", 800],
    ["Ezra ends the book on that list of names. No neat wrap-up. Just the hard cost of actually changing course.", 800],
    ["Then, far away in a Persian palace, Nehemiah hears the wall is down, and starts grieving over a city he has never even lived in.", 850],
    ["Tomorrow, Nehemiah 2 through 5. He finally asks the king for what he needs, and starts rebuilding.", 850],
    ["For now, hold on to Nehemiah's prayer.", 750],
    ["He wept, before he ever asked for anything.", 1200],
  ],
};
