import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 71, written to the Day 1 standard.
 *
 * 1 Samuel 11-14 is Saul's whole reign in miniature: a real rescue that wins
 * him the throne, Samuel's farewell warning, one impatient sacrifice that
 * costs him everything, and a son whose faith wins a battle Saul's own rash
 * mouth nearly undoes. Six blocks across four chapters, matching Day 70.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 71,
  title: "Saul's Rise and Early Failure",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 71. Saul starts as a rescuer and ends this reading almost killing his own son.", 750],
    ["In between, he wins a real war, gets warned in detail what obedience actually costs, and then can't wait one more hour for Samuel to show up.", 850],
    ["One impatient sacrifice changes everything that follows.", 800],
    ["We are in 1 Samuel 11 through 14.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(11, 1, 15, [
      "Nahash the Ammonite lays siege to Jabesh-gilead and offers a covenant with one condition. He will gouge out everyone's right eye, and call it a reproach on all Israel.",
      "Saul is out with the herd when he hears the news, and something happens in him he didn't plan. The Spirit of God comes on him, and his anger burns.",
      "He cuts up a yoke of oxen and sends the pieces through the whole land with a warning attached. Follow Saul and Samuel, or your own oxen get the same treatment. The fear of the Lord falls on the people, and they come out as one.",
      "After the win, the crowd wants to execute the men who doubted Saul in the first place. His first words as king refuse it. There shall not a man be put to death this day, for today the Lord wrought salvation in Israel. Not Saul's win to punish people over.",
    ]),
    sam(12, 1, 25, [
      "Before Samuel lets go of leadership, he puts his own life on trial in public. Whose ox have I taken, whom have I defrauded, whom have I oppressed. Nobody can name a single thing.",
      "Then he walks them back through generations of rescue, from Egypt to the judges, before he ever mentions the king they just demanded.",
      "To prove the point without raising his voice, he calls down thunder and rain in the middle of the dry wheat harvest. All the people greatly feared the Lord and Samuel that day.",
      "Terrified, they finally say the true sentence out loud. We have added unto all our sins this evil, to ask us a king. And Samuel doesn't walk away from them. Fear not, he says. Serve the Lord with all your heart.",
    ]),
    sam(13, 1, 15, [
      "Saul waits at Gilgal for the seven days Samuel appointed, and watches his army evaporate around him while the Philistines gather like sand on the seashore.",
      "He doesn't wait one more hour. He offers the burnt offering himself. That was never his to do.",
      "The moment he finishes, Samuel arrives. Not late. Right on time, just after Saul stopped trusting the wait.",
      "Samuel doesn't soften it. Thou hast done foolishly. Now would the Lord have established thy kingdom forever. But now thy kingdom shall not continue. One impatient act on day seven costs him everything after.",
    ]),
    sam(13, 16, 23, [
      "There is no smith in all Israel, because the Philistines made sure of it. No one can forge a sword or a spear.",
      "Israelites have to walk down to Philistine blacksmiths just to sharpen a plowshare or an axe.",
      "On the day of battle, only Saul and Jonathan actually carry a sword in the whole camp.",
      "Picture the army Saul is supposed to lead against thirty thousand chariots. Farm tools, and two swords.",
    ]),
    sam(14, 1, 23, [
      "Jonathan doesn't ask his father. He and one armorbearer walk toward an entire Philistine garrison on a plan that is really just faith with a sign attached. If they say come up, we'll know the Lord has given them to us.",
      "His logic is the whole chapter in one line. There is no restraint to the Lord to save by many or by few. Two men are enough if God is the one fighting.",
      "They climb the rock on their hands and feet and kill twenty men in about half an acre. Then the ground itself starts shaking.",
      "While Saul is still back counting heads to find out who's missing, an entire enemy army is already falling apart because of two men he never sent.",
    ]),
    sam(14, 24, 52, [
      "In the middle of the very battle Jonathan just started, Saul puts a curse on anyone who eats before evening. Jonathan never hears it.",
      "He dips a stick in honey without knowing the vow exists, and his eyes are enlightened. His own father is ready to kill him for it once the lot falls on his name.",
      "God goes silent the moment Saul asks for guidance, and Saul is willing to execute his own son to find out why. Over honey Jonathan didn't even know was forbidden.",
      "It's the people, not Saul, who finally say no. Shall Jonathan die, who hath wrought this great salvation in Israel? Not one hair of his head falls. Saul's rash mouth almost cost him the son who just won the battle for him.",
    ]),
  ],
  closing: [
    ["So that is Day 71.", 700],
    ["Saul starts this reading as a farmer who hears bad news and can't sit still.", 750],
    ["He rescues a city, refuses to punish the men who doubted him, and for one chapter looks like exactly the king Israel wanted.", 800],
    ["Then Samuel warns him and everyone else in detail what faithfulness will actually require.", 800],
    ["And Saul can't wait one more hour for Samuel to arrive. Thy kingdom shall not continue.", 850],
    ["Meanwhile his son does the bravest thing in the whole reading with one armorbearer and no permission.", 850],
    ["And Saul's own rash oath nearly kills the son who won him the battle. The people have to step in and save Jonathan from his own father.", 900],
    ["Tomorrow, 1 Samuel 15 through 18. Saul disobeys one more time, gets rejected for good, and a shepherd boy named David walks onto the field.", 900],
    ["For now, sit with Jonathan's line.", 800],
    ["There is no restraint to the Lord to save by many or by few.", 1200],
  ],
};
