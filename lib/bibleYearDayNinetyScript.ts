import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 90, written to the Day 1 standard.
 *
 * 2 Kings 10-13 finishes Jehu's purge, then rescues a hidden prince from a
 * murderous queen, then watches two good kings each undo their own good
 * start. Seven blocks across four chapters, closing on Elisha's death and
 * the mercy that outlasts Israel's decline.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_SCRIPT: BibleYearDayScript = {
  dayNumber: 90,
  title: "Jehu's Reform and Israel's Decline",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 90. Yesterday ended with Jezebel thrown from a window.", 750],
    ["Today Jehu finishes what he started, and it gets uglier before it gets better.", 800],
    ["Then a queen tries to wipe out her own grandchildren, and one baby survives in a bedroom for six years.", 850],
    ["Two kings named Joash try to do right and both run out of road.", 800],
    ["We are in 2 Kings 10 through 13.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(10, 1, 17, [
      "Jehu writes to Samaria's elders and dares them to pick a fight for Ahab's seventy sons. They panic instead. Two kings stood not before him, they say, and how shall we stand. So they kill all seventy themselves and send the heads to Jezreel in baskets, piled in two heaps at the gate by morning.",
      "Jehu tells the crowd he only killed the king. Who slew all these, he asks, knowing the answer implicates them too. Everyone with royal blood near Ahab's house is now dead, and nobody's hands are clean, including his own.",
      "On the road he meets the brothers of Ahaziah, Judah's king he killed yesterday, forty-two of them, and slaughters them at a pit by the shearing house. They came to visit family and walked into the middle of a purge that had nothing to do with them.",
      "Then Jehonadab climbs into his chariot, and Jehu asks him one question. Is thine heart right, as my heart is with thy heart. See my zeal for the LORD, Jehu says. It's real zeal. It's also killed a great many people who never chose a side.",
    ]),
    kings2(10, 18, 36, [
      "Jehu lies to Baal's whole priesthood to finish the job. Ahab served Baal a little, but I shall serve him much, he announces, and calls a great sacrifice, filling the temple from wall to wall with every worshipper in the kingdom, none of them suspecting a trap.",
      "The doors are shut, eighty armed men wait outside with orders that their own lives are forfeit if anyone escapes, and Jehu's guard cuts down everyone inside. The images are dragged out and burned, and the temple itself is turned into a latrine, a deliberate insult that lasts to this day.",
      "So Jehu destroyed Baal out of Israel. That line is true and it is not the whole story. He never touches the golden calves at Bethel and Dan that started this whole mess two hundred years earlier, because tearing those down would have sent worshippers south to Jerusalem, and he needed a kingdom, not just a clean conscience.",
      "God still rewards the zeal He got with a promise: four generations of Jehu's sons will sit on Israel's throne, longer than almost any other line in the north. But the LORD began to cut Israel short in his days anyway, as Hazael starts eating away the land east of the Jordan piece by piece.",
    ]),
    kings2(11, 1, 12, [
      "Ahaziah is dead, and his own mother Athaliah does something no one else in this book attempts. She destroys all the seed royal, her own grandchildren, to take the throne of Judah for herself.",
      "One baby survives. Jehosheba, Ahaziah's sister, steals the infant Joash out from among the king's sons who were being slain and hides him and his nurse in a bedchamber. For six years the rightful king of David's line lives inside the temple grounds while a usurper reigns two hundred yards away.",
      "In the seventh year, the priest Jehoiada finally moves. He brings the guard captains in secret, makes them swear an oath, and only then shows them the king's son. They had been guarding a palace for a queen and didn't know a king was alive the whole time.",
      "He positions armed men in a ring around the boy, arms them with David's own spears and shields from the temple, sets the crown on his head, and hands him the testimony. They anoint him, and the room claps and shouts, God save the king. A secret kept for six years becomes a coronation in one afternoon.",
    ]),
    kings2(11, 13, 21, [
      "Athaliah hears the noise and comes to the temple to find a boy standing by the pillar wearing the crown, the whole assembly rejoicing around him. She tears her own clothes and screams treason, treason. Nobody answers her. Nobody has to.",
      "Jehoiada gives one order: take her outside the ranges, and kill whoever follows her, but not here, not in the LORD's house. She dies at the horse gate of the king's house, the same threshold Ahab's family used to enter and exit power.",
      "The people don't wait for instructions after that. They tear down Baal's temple themselves, smash the altars, and kill his priest right in front of them. A covenant is renewed between the LORD, the king, and the people, on the same day a queen dies for breaking the last one.",
      "And the city was in quiet. That's the whole line. After six years of a hidden child, a secret coup, and a queen's execution, Judah just goes quiet, with a seven-year-old boy on the throne and grown men actually running the kingdom underneath him.",
    ]),
    kings2(12, 1, 21, [
      "Jehoash reigns forty years and does right in the sight of the LORD all the days that Jehoiada instructs him, which tells you something about how much of this reign belonged to the priest and not the boy. The high places stay standing, a compromise nobody fully corrects.",
      "He orders the priests to fund temple repairs out of the money already flowing in, and for years nothing gets fixed. So instead of blaming anyone, he just changes the system: a chest with a hole bored in the lid, set beside the altar, where anyone can give directly, no priest handling the cash at all.",
      "When the chest fills, the king's scribe and the high priest count it together, hand it straight to the workmen, and Scripture says plainly they dealt faithfully, no accounting even required, because the men doing the work could be trusted with money nobody was watching.",
      "Then Hazael marches toward Jerusalem, and Jehoash strips the temple and his own palace of every hallowed and gold thing to buy him off. The repaired house gets stripped again to save the city. Later his own servants conspire and kill him in his bed, and his son Amaziah takes the throne he paid away half a temple to protect.",
    ]),
    kings2(13, 1, 13, [
      "Jehoahaz does evil like every king of Israel before him, and God hands the nation to Hazael and his son Benhadad for years. Then Jehoahaz besought the LORD, and the LORD hearkened unto him, because He saw exactly how badly Syria was oppressing them. Mercy, not because he'd earned it, because he was crushed.",
      "God sends a saviour, unnamed, and Israel dwells in their tents as before. But nothing really changes underneath. The grove stays standing in Samaria, and Israel's army is reduced to fifty horsemen and ten chariots, made like the dust by threshing. A rescue that never becomes repentance.",
      "Two kings named Joash rule at once, one in Judah instructed by a priest, one in Israel who departed not from all the sins of Jeroboam. Same name, same era, opposite trajectories underneath the surface.",
      "This Joash of Israel fights Amaziah of Judah later, but for now the text just says Jeroboam his son sat upon his throne, the dynasty rolling forward the way Jehu was promised, four generations deep, with or without anyone's obedience attached to it.",
    ]),
    kings2(13, 14, 25, [
      "Elisha falls sick with the sickness he'll die of, and Joash king of Israel comes down and weeps over him, calling him my father, my father, the chariot of Israel and the horsemen thereof. The same words Elisha once cried over Elijah. The whole nation's real defense was never its army.",
      "Elisha has the king shoot an arrow eastward and calls it the arrow of the LORD's deliverance from Syria, then tells him to strike the ground with the rest of the arrows. The king strikes three times and stops. Elisha is furious. Thou shouldest have smitten five or six times, then hadst thou smitten Syria till thou hadst consumed it. Now thou shalt smite Syria but thrice. A king's own hesitation writes the ceiling on his own victory.",
      "Elisha dies and is buried, and that should be the end of him. But a burial party, interrupted by raiders, throws a dead man into Elisha's tomb, and the moment the body touches Elisha's bones, he revives and stands on his feet. The prophet is dead. The power attached to him keeps working anyway.",
      "Hazael oppressed Israel all the days of Jehoahaz, but the LORD was gracious unto them, and had compassion on them, and had respect unto them, because of his covenant with Abraham, Isaac, and Jacob, and would not destroy them, neither cast he them from his presence as yet. Not because Israel changed. Because of a promise made centuries earlier to men who were already dead.",
    ]),
  ],
  closing: [
    ["So that is Day 90.", 700],
    ["Jehu finishes his purge, real zeal that never quite finishes the job it started.", 750],
    ["A baby survives a massacre in a temple bedroom for six years, and a nation goes quiet the day the truth finally comes out.", 800],
    ["Two kings named Joash both start well. One gets murdered in his bed. One never fully leaves his own nation's sin behind.", 850],
    ["Then Elisha dies weeping over a king's hesitation, and even his bones raise a dead man before the chapter ends.", 850],
    ["Notice what actually saves Israel through all of this. Not their kings. Not their army. A promise made to Abraham, generations before any of these men were born.", 850],
    ["Tomorrow, 2 Kings 14 through 17. Israel keeps sliding, and this time nothing stops it.", 800],
    ["For now, hold onto the mercy in chapter thirteen.", 750],
    ["Not because they deserved it.", 750],
    ["Because of a covenant they didn't make.", 1200],
  ],
};
