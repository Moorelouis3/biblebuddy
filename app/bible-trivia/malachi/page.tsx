"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

async function fetchVerseText(reference: string): Promise<string> {
  try {
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "malachi1", question: "Who is the author of the book of Malachi?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Malachi" }, { label: "C", text: "Zechariah" }, { label: "D", text: "Haggai" }], correctAnswer: "B", verse: "Malachi 1:1", explanation: "The book is attributed to the prophet Malachi." },
  { id: "malachi2", question: "What does the name Malachi mean?", options: [{ label: "A", text: "My servant" }, { label: "B", text: "My messenger" }, { label: "C", text: "God is faithful" }, { label: "D", text: "Chosen one" }], correctAnswer: "B", verse: "Malachi 1:1", explanation: "Malachi means 'my messenger'." },
  { id: "malachi3", question: "What is the first message God declares?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Love for Israel" }, { label: "C", text: "Call to repentance" }, { label: "D", text: "Temple warning" }], correctAnswer: "B", verse: "Malachi 1:2", explanation: "God begins by affirming His love." },
  { id: "malachi4", question: "How does Israel respond to God's love?", options: [{ label: "A", text: "With worship" }, { label: "B", text: "With doubt" }, { label: "C", text: "With repentance" }, { label: "D", text: "With obedience" }], correctAnswer: "B", verse: "Malachi 1:2", explanation: "They question God's love." },
  { id: "malachi5", question: "Whom does God compare Israel to?", options: [{ label: "A", text: "Jacob" }, { label: "B", text: "Esau" }, { label: "C", text: "Abraham" }, { label: "D", text: "Isaac" }], correctAnswer: "A", verse: "Malachi 1:2-3", explanation: "God loved Jacob." },
  { id: "malachi6", question: "Who is said to be hated?", options: [{ label: "A", text: "Jacob" }, { label: "B", text: "Esau" }, { label: "C", text: "Edom" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Malachi 1:3", explanation: "Esau represents rejected lineage." },
  { id: "malachi7", question: "What nation is associated with Esau?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Edom" }, { label: "C", text: "Ammon" }, { label: "D", text: "Philistia" }], correctAnswer: "B", verse: "Malachi 1:4", explanation: "Edom descended from Esau." },
  { id: "malachi8", question: "What title does God use for Himself?", options: [{ label: "A", text: "King of Israel" }, { label: "B", text: "The Lord Almighty" }, { label: "C", text: "Father" }, { label: "D", text: "Creator" }], correctAnswer: "B", verse: "Malachi 1", explanation: "Authority emphasized." },
  { id: "malachi9", question: "Who is accused of despising God's name?", options: [{ label: "A", text: "The people" }, { label: "B", text: "The priests" }, { label: "C", text: "The kings" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Malachi 1:6", explanation: "Priestly corruption addressed." },
  { id: "malachi10", question: "What rhetorical question is asked?", options: [{ label: "A", text: "Where is your justice?" }, { label: "B", text: "How have we despised you?" }, { label: "C", text: "Why have you left us?" }, { label: "D", text: "When will you return?" }], correctAnswer: "B", verse: "Malachi 1:6", explanation: "The people challenge God's accusation." },
  { id: "malachi11", question: "What offering is criticized?", options: [{ label: "A", text: "Grain offerings" }, { label: "B", text: "Blemished animals" }, { label: "C", text: "Incense" }, { label: "D", text: "Drink offerings" }], correctAnswer: "B", verse: "Malachi 1:8", explanation: "Unacceptable sacrifices." },
  { id: "malachi12", question: "What condition do the animals have?", options: [{ label: "A", text: "Healthy" }, { label: "B", text: "Blind and lame" }, { label: "C", text: "Young" }, { label: "D", text: "Rare" }], correctAnswer: "B", verse: "Malachi 1:8", explanation: "Dishonoring God." },
  { id: "malachi13", question: "Who would not accept such gifts?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "A governor" }, { label: "C", text: "Prophets" }, { label: "D", text: "The people" }], correctAnswer: "B", verse: "Malachi 1:8", explanation: "Shows hypocrisy." },
  { id: "malachi14", question: "What does God wish someone would do?", options: [{ label: "A", text: "Offer better sacrifices" }, { label: "B", text: "Shut the temple doors" }, { label: "C", text: "Fast" }, { label: "D", text: "Pray" }], correctAnswer: "B", verse: "Malachi 1:10", explanation: "Empty worship rejected." },
  { id: "malachi15", question: "Where will God's name be great?", options: [{ label: "A", text: "In Israel only" }, { label: "B", text: "Among the nations" }, { label: "C", text: "In Jerusalem" }, { label: "D", text: "In the temple" }], correctAnswer: "B", verse: "Malachi 1:11", explanation: "Global worship." },
  { id: "malachi16", question: "What offering will be presented everywhere?", options: [{ label: "A", text: "Animals" }, { label: "B", text: "Pure offerings" }, { label: "C", text: "Grain only" }, { label: "D", text: "Incense only" }], correctAnswer: "B", verse: "Malachi 1:11", explanation: "Pure worship promised." },
  { id: "malachi17", question: "How do priests treat the Lord's table?", options: [{ label: "A", text: "With reverence" }, { label: "B", text: "With contempt" }, { label: "C", text: "With fear" }, { label: "D", text: "With joy" }], correctAnswer: "B", verse: "Malachi 1:12", explanation: "Disrespectful worship." },
  { id: "malachi18", question: "What do priests say about service?", options: [{ label: "A", text: "It is holy" }, { label: "B", text: "It is a burden" }, { label: "C", text: "It is joyful" }, { label: "D", text: "It is necessary" }], correctAnswer: "B", verse: "Malachi 1:13", explanation: "Weariness toward God." },
  { id: "malachi19", question: "What kind of offering is cursed?", options: [{ label: "A", text: "Voluntary" }, { label: "B", text: "Deceptive offering" }, { label: "C", text: "Tithe" }, { label: "D", text: "Incense" }], correctAnswer: "B", verse: "Malachi 1:14", explanation: "God demands honor." },
  { id: "malachi20", question: "What title closes chapter 1?", options: [{ label: "A", text: "Holy One" }, { label: "B", text: "Great King" }, { label: "C", text: "Father" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Malachi 1:14", explanation: "God's majesty affirmed." },
  { id: "malachi21", question: "Who receives a warning in chapter 2?", options: [{ label: "A", text: "People" }, { label: "B", text: "Priests" }, { label: "C", text: "Kings" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Malachi 2:1", explanation: "Priestly responsibility." },
  { id: "malachi22", question: "What will happen if priests do not listen?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Curse" }, { label: "C", text: "Silence" }, { label: "D", text: "Promotion" }], correctAnswer: "B", verse: "Malachi 2:2", explanation: "Disobedience has consequences." },
  { id: "malachi23", question: "What will be cursed?", options: [{ label: "A", text: "Their families" }, { label: "B", text: "Their blessings" }, { label: "C", text: "Their sacrifices" }, { label: "D", text: "Their land" }], correctAnswer: "B", verse: "Malachi 2:2", explanation: "Blessings reversed." },
  { id: "malachi24", question: "What covenant is referenced?", options: [{ label: "A", text: "Abrahamic" }, { label: "B", text: "Levitical" }, { label: "C", text: "Davidic" }, { label: "D", text: "Mosaic" }], correctAnswer: "B", verse: "Malachi 2:4", explanation: "Priestly covenant." },
  { id: "malachi25", question: "What characterized the true priest?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Reverence and truth" }, { label: "C", text: "Power" }, { label: "D", text: "Influence" }], correctAnswer: "B", verse: "Malachi 2:5-6", explanation: "Model priesthood." },
  { id: "malachi26", question: "What was in the priest's mouth?", options: [{ label: "A", text: "Law of truth" }, { label: "B", text: "Judgment" }, { label: "C", text: "Silence" }, { label: "D", text: "Commands" }], correctAnswer: "A", verse: "Malachi 2:6", explanation: "Faithful teaching." },
  { id: "malachi27", question: "What did the priests cause many to do?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Stumble" }, { label: "C", text: "Worship" }, { label: "D", text: "Obey" }], correctAnswer: "B", verse: "Malachi 2:8", explanation: "Corrupt leadership." },
  { id: "malachi28", question: "What did priests violate?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "The covenant" }, { label: "C", text: "The law" }, { label: "D", text: "The sacrifices" }], correctAnswer: "B", verse: "Malachi 2:8", explanation: "Broken covenant." },
  { id: "malachi29", question: "How does God make the priests before the people?", options: [{ label: "A", text: "Honored" }, { label: "B", text: "Despised" }, { label: "C", text: "Silent" }, { label: "D", text: "Powerful" }], correctAnswer: "B", verse: "Malachi 2:9", explanation: "Loss of respect." },
  { id: "malachi30", question: "What question opens the next section?", options: [{ label: "A", text: "Where is justice?" }, { label: "B", text: "Have we not all one Father?" }, { label: "C", text: "How have we robbed you?" }, { label: "D", text: "When will you return?" }], correctAnswer: "B", verse: "Malachi 2:10", explanation: "Covenant unity emphasized." },
  { id: "malachi31", question: "What sin is addressed next?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Faithlessness in marriage" }, { label: "C", text: "Greed" }, { label: "D", text: "Violence" }], correctAnswer: "B", verse: "Malachi 2:11", explanation: "Marriage covenant broken." },
  { id: "malachi32", question: "Whom had Judah married?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Daughter of a foreign god" }, { label: "C", text: "Priests" }, { label: "D", text: "Widows" }], correctAnswer: "B", verse: "Malachi 2:11", explanation: "Spiritual compromise." },
  { id: "malachi33", question: "What does God seek from marriage?", options: [{ label: "A", text: "Happiness" }, { label: "B", text: "Godly offspring" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Malachi 2:15", explanation: "Faithful families." },
  { id: "malachi34", question: "What does God hate?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Divorce" }, { label: "C", text: "Fasting" }, { label: "D", text: "Offerings" }], correctAnswer: "B", verse: "Malachi 2:16", explanation: "Covenant betrayal." },
  { id: "malachi35", question: "What covers a man's garment?", options: [{ label: "A", text: "Dust" }, { label: "B", text: "Violence" }, { label: "C", text: "Blood" }, { label: "D", text: "Shame" }], correctAnswer: "B", verse: "Malachi 2:16", explanation: "Symbol of harm." },
  { id: "malachi36", question: "How have the people wearied the Lord?", options: [{ label: "A", text: "By fasting" }, { label: "B", text: "By questioning justice" }, { label: "C", text: "By worshiping" }, { label: "D", text: "By praying" }], correctAnswer: "B", verse: "Malachi 2:17", explanation: "They doubt God's justice." },
  { id: "malachi37", question: "What question do they ask?", options: [{ label: "A", text: "Where is your love?" }, { label: "B", text: "Where is the God of justice?" }, { label: "C", text: "Why have you left us?" }, { label: "D", text: "When will you return?" }], correctAnswer: "B", verse: "Malachi 2:17", explanation: "Impatience with God." },
  { id: "malachi38", question: "Who does God promise to send?", options: [{ label: "A", text: "A king" }, { label: "B", text: "My messenger" }, { label: "C", text: "A priest" }, { label: "D", text: "An angel" }], correctAnswer: "B", verse: "Malachi 3:1", explanation: "Messenger prepares the way." },
  { id: "malachi39", question: "Who will suddenly come to the temple?", options: [{ label: "A", text: "The prophet" }, { label: "B", text: "The Lord" }, { label: "C", text: "The priest" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Malachi 3:1", explanation: "Divine visitation." },
  { id: "malachi40", question: "What will the Lord be like when He comes?", options: [{ label: "A", text: "Comforting" }, { label: "B", text: "Refiner and purifier" }, { label: "C", text: "Silent" }, { label: "D", text: "Distant" }], correctAnswer: "B", verse: "Malachi 3:2-3", explanation: "Cleansing judgment." },
  { id: "malachi41", question: "What metals are used as imagery?", options: [{ label: "A", text: "Gold and iron" }, { label: "B", text: "Silver and gold" }, { label: "C", text: "Bronze and iron" }, { label: "D", text: "Copper and silver" }], correctAnswer: "B", verse: "Malachi 3:3", explanation: "Purification process." },
  { id: "malachi42", question: "Who will be purified?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Levites" }, { label: "C", text: "Nations" }, { label: "D", text: "Merchants" }], correctAnswer: "B", verse: "Malachi 3:3", explanation: "Restored priesthood." },
  { id: "malachi43", question: "What offering will be acceptable again?", options: [{ label: "A", text: "Foreign offerings" }, { label: "B", text: "Offerings of Judah and Jerusalem" }, { label: "C", text: "Animal sacrifices only" }, { label: "D", text: "Grain offerings" }], correctAnswer: "B", verse: "Malachi 3:4", explanation: "Restored worship." },
  { id: "malachi44", question: "Against whom will God testify?", options: [{ label: "A", text: "The faithful" }, { label: "B", text: "Sorcerers and oppressors" }, { label: "C", text: "Priests only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Malachi 3:5", explanation: "Social injustice judged." },
  { id: "malachi45", question: "Why does Israel survive?", options: [{ label: "A", text: "Their obedience" }, { label: "B", text: "God does not change" }, { label: "C", text: "Their strength" }, { label: "D", text: "Their wealth" }], correctAnswer: "B", verse: "Malachi 3:6", explanation: "God's immutability." },
  { id: "malachi46", question: "What call does God make?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Return to Me" }, { label: "C", text: "Fear Me" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "Malachi 3:7", explanation: "Invitation to restoration." },
  { id: "malachi47", question: "How do the people respond?", options: [{ label: "A", text: "We will return" }, { label: "B", text: "How shall we return?" }, { label: "C", text: "We are sorry" }, { label: "D", text: "We obey" }], correctAnswer: "B", verse: "Malachi 3:7", explanation: "Defensive questioning." },
  { id: "malachi48", question: "What sin is accused next?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Robbing God" }, { label: "C", text: "Violence" }, { label: "D", text: "Adultery" }], correctAnswer: "B", verse: "Malachi 3:8", explanation: "Withholding offerings." },
  { id: "malachi49", question: "How had they robbed God?", options: [{ label: "A", text: "Sacrifices" }, { label: "B", text: "Tithes and offerings" }, { label: "C", text: "Worship" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Malachi 3:8", explanation: "Failure in giving." },
  { id: "malachi50", question: "What results from this robbery?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "A curse" }, { label: "C", text: "Peace" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Malachi 3:9", explanation: "Covenant consequence." },
  { id: "malachi51", question: "What does God invite them to test?", options: [{ label: "A", text: "His patience" }, { label: "B", text: "Him in giving" }, { label: "C", text: "The law" }, { label: "D", text: "The priests" }], correctAnswer: "B", verse: "Malachi 3:10", explanation: "Unique invitation." },
  { id: "malachi52", question: "What will God open?", options: [{ label: "A", text: "Temple doors" }, { label: "B", text: "Windows of heaven" }, { label: "C", text: "City gates" }, { label: "D", text: "Treasuries" }], correctAnswer: "B", verse: "Malachi 3:10", explanation: "Overflowing blessing." },
  { id: "malachi53", question: "What will be poured out?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Blessing" }, { label: "C", text: "Judgment" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Malachi 3:10", explanation: "Abundant provision." },
  { id: "malachi54", question: "What will God rebuke?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "The devourer" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Malachi 3:11", explanation: "Protection promised." },
  { id: "malachi55", question: "What will nations call Israel?", options: [{ label: "A", text: "Weak" }, { label: "B", text: "Blessed" }, { label: "C", text: "Cursed" }, { label: "D", text: "Proud" }], correctAnswer: "B", verse: "Malachi 3:12", explanation: "Public blessing." },
  { id: "malachi56", question: "What have the people spoken?", options: [{ label: "A", text: "Praise" }, { label: "B", text: "Harsh words against God" }, { label: "C", text: "Truth" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Malachi 3:13", explanation: "Complaints against God." },
  { id: "malachi57", question: "What do they say is useless?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Serving God" }, { label: "C", text: "Sacrifice" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "Malachi 3:14", explanation: "Cynicism." },
  { id: "malachi58", question: "Who do they call blessed?", options: [{ label: "A", text: "The righteous" }, { label: "B", text: "The arrogant" }, { label: "C", text: "The priests" }, { label: "D", text: "The poor" }], correctAnswer: "B", verse: "Malachi 3:15", explanation: "Inverted values." },
  { id: "malachi59", question: "Who gather to speak with one another?", options: [{ label: "A", text: "The priests" }, { label: "B", text: "Those who feared the Lord" }, { label: "C", text: "The nations" }, { label: "D", text: "The kings" }], correctAnswer: "B", verse: "Malachi 3:16", explanation: "Faithful remnant." },
  { id: "malachi60", question: "What is written before the Lord?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Book of remembrance" }, { label: "C", text: "Covenant" }, { label: "D", text: "Scroll of judgment" }], correctAnswer: "B", verse: "Malachi 3:16", explanation: "God remembers the faithful." },
  { id: "malachi61", question: "What are the faithful called?", options: [{ label: "A", text: "Servants" }, { label: "B", text: "My treasured possession" }, { label: "C", text: "Warriors" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Malachi 3:17", explanation: "God values His people." },
  { id: "malachi62", question: "What will God do for them?", options: [{ label: "A", text: "Judge them" }, { label: "B", text: "Spare them" }, { label: "C", text: "Test them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Malachi 3:17", explanation: "Mercy promised." },
  { id: "malachi63", question: "What distinction will be seen again?", options: [{ label: "A", text: "Rich and poor" }, { label: "B", text: "Righteous and wicked" }, { label: "C", text: "Priest and king" }, { label: "D", text: "Israel and nations" }], correctAnswer: "B", verse: "Malachi 3:18", explanation: "Divine justice." },
  { id: "malachi64", question: "What is coming according to chapter 4?", options: [{ label: "A", text: "A feast" }, { label: "B", text: "The day of the Lord" }, { label: "C", text: "Exile" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Malachi 4:1", explanation: "Final judgment." },
  { id: "malachi65", question: "How will the arrogant be like?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Stubble" }, { label: "C", text: "Iron" }, { label: "D", text: "Ash" }], correctAnswer: "B", verse: "Malachi 4:1", explanation: "Total destruction." },
  { id: "malachi66", question: "What will the day leave them?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Neither root nor branch" }, { label: "C", text: "Remnant" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Malachi 4:1", explanation: "Complete judgment." },
  { id: "malachi67", question: "What rises for those who fear the Lord?", options: [{ label: "A", text: "Moon of justice" }, { label: "B", text: "Sun of righteousness" }, { label: "C", text: "Star of hope" }, { label: "D", text: "Light of Israel" }], correctAnswer: "B", verse: "Malachi 4:2", explanation: "Healing and restoration." },
  { id: "malachi68", question: "What comes with the sun of righteousness?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Healing in its wings" }, { label: "C", text: "Fire" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Malachi 4:2", explanation: "Restorative hope." },
  { id: "malachi69", question: "What will the righteous do?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Leap like calves" }, { label: "C", text: "Fast" }, { label: "D", text: "Mourn" }], correctAnswer: "B", verse: "Malachi 4:2", explanation: "Joyful freedom." },
  { id: "malachi70", question: "What will the wicked become?", options: [{ label: "A", text: "Dust" }, { label: "B", text: "Ashes under feet" }, { label: "C", text: "Slaves" }, { label: "D", text: "Nothing" }], correctAnswer: "B", verse: "Malachi 4:3", explanation: "Complete defeat." },
  { id: "malachi71", question: "What are the people told to remember?", options: [{ label: "A", text: "The prophets" }, { label: "B", text: "The law of Moses" }, { label: "C", text: "The exile" }, { label: "D", text: "The covenant of Abraham" }], correctAnswer: "B", verse: "Malachi 4:4", explanation: "Faithful obedience." },
  { id: "malachi72", question: "Who will God send before the day?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Isaiah" }, { label: "C", text: "Jeremiah" }, { label: "D", text: "Moses" }], correctAnswer: "A", verse: "Malachi 4:5", explanation: "Forerunner prophet." },
  { id: "malachi73", question: "What will Elijah do?", options: [{ label: "A", text: "Build the temple" }, { label: "B", text: "Turn hearts" }, { label: "C", text: "Judge nations" }, { label: "D", text: "Write law" }], correctAnswer: "B", verse: "Malachi 4:6", explanation: "Restoration of relationships." },
  { id: "malachi74", question: "Whose hearts will be turned?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Fathers and children" }, { label: "C", text: "Priests" }, { label: "D", text: "Nations" }], correctAnswer: "B", verse: "Malachi 4:6", explanation: "Generational reconciliation." },
  { id: "malachi75", question: "Why will Elijah be sent?", options: [{ label: "A", text: "To teach law" }, { label: "B", text: "So the land is not struck with a curse" }, { label: "C", text: "To rebuild Jerusalem" }, { label: "D", text: "To crown a king" }], correctAnswer: "B", verse: "Malachi 4:6", explanation: "Prevent judgment." },
  { id: "malachi76", question: "What is the final warning?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Curse" }, { label: "C", text: "Exile" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Malachi 4:6", explanation: "Covenant seriousness." },
  { id: "malachi77", question: "What does Malachi emphasize about worship?", options: [{ label: "A", text: "Ritual only" }, { label: "B", text: "Honor and sincerity" }, { label: "C", text: "Quantity" }, { label: "D", text: "Location" }], correctAnswer: "B", verse: "Malachi 1-2", explanation: "Heart posture matters." },
  { id: "malachi78", question: "What does Malachi teach about giving?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "A test of faith" }, { label: "C", text: "Irrelevant" }, { label: "D", text: "Only for priests" }], correctAnswer: "B", verse: "Malachi 3", explanation: "Trust God in provision." },
  { id: "malachi79", question: "What does Malachi reveal about God?", options: [{ label: "A", text: "He changes" }, { label: "B", text: "He does not change" }, { label: "C", text: "He adapts" }, { label: "D", text: "He is distant" }], correctAnswer: "B", verse: "Malachi 3:6", explanation: "God's immutability." },
  { id: "malachi80", question: "What separates the righteous and wicked?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Fear of the Lord" }, { label: "C", text: "Power" }, { label: "D", text: "Knowledge" }], correctAnswer: "B", verse: "Malachi 3-4", explanation: "Reverence matters." },
  { id: "malachi81", question: "What theme repeats throughout Malachi?", options: [{ label: "A", text: "Questions and answers" }, { label: "B", text: "Lament" }, { label: "C", text: "Songs" }, { label: "D", text: "Visions" }], correctAnswer: "A", verse: "Malachi", explanation: "Dialogical style." },
  { id: "malachi82", question: "What does Malachi show about covenant faithfulness?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential" }, { label: "C", text: "Outdated" }, { label: "D", text: "Symbolic" }], correctAnswer: "B", verse: "Malachi", explanation: "Faithfulness required." },
  { id: "malachi83", question: "What does Malachi teach about justice?", options: [{ label: "A", text: "Delayed forever" }, { label: "B", text: "Certain" }, { label: "C", text: "Unimportant" }, { label: "D", text: "Subjective" }], correctAnswer: "B", verse: "Malachi", explanation: "God will act." },
  { id: "malachi84", question: "What does Malachi say about doubt?", options: [{ label: "A", text: "Healthy" }, { label: "B", text: "Confronted by God" }, { label: "C", text: "Encouraged" }, { label: "D", text: "Ignored" }], correctAnswer: "B", verse: "Malachi", explanation: "God answers challenges." },
  { id: "malachi85", question: "What does Malachi reveal about repentance?", options: [{ label: "A", text: "Impossible" }, { label: "B", text: "Always available" }, { label: "C", text: "Too late" }, { label: "D", text: "Optional" }], correctAnswer: "B", verse: "Malachi 3:7", explanation: "Return to Me." },
  { id: "malachi86", question: "What does Malachi emphasize about leadership?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Accountability" }, { label: "C", text: "Privilege" }, { label: "D", text: "Isolation" }], correctAnswer: "B", verse: "Malachi 1-2", explanation: "Leaders answer to God." },
  { id: "malachi87", question: "What does Malachi teach about obedience?", options: [{ label: "A", text: "Legalistic" }, { label: "B", text: "Relational" }, { label: "C", text: "Optional" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Malachi", explanation: "Heart-driven obedience." },
  { id: "malachi88", question: "What does Malachi show about God's patience?", options: [{ label: "A", text: "Short" }, { label: "B", text: "Long-suffering" }, { label: "C", text: "Absent" }, { label: "D", text: "Conditional" }], correctAnswer: "B", verse: "Malachi", explanation: "God delays judgment." },
  { id: "malachi89", question: "What does Malachi highlight about hope?", options: [{ label: "A", text: "Political" }, { label: "B", text: "Messianic" }, { label: "C", text: "Economic" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Malachi 3-4", explanation: "Future deliverance." },
  { id: "malachi90", question: "What does Malachi say about God's love?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "Covenant-based" }, { label: "C", text: "Unclear" }, { label: "D", text: "Earned" }], correctAnswer: "B", verse: "Malachi 1", explanation: "Faithful love." },
  { id: "malachi91", question: "What does Malachi call people back to?", options: [{ label: "A", text: "Prosperity" }, { label: "B", text: "Faithful worship" }, { label: "C", text: "Power" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Malachi", explanation: "True devotion." },
  { id: "malachi92", question: "What is the final hope?", options: [{ label: "A", text: "A king" }, { label: "B", text: "Restoration before judgment" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Malachi 4", explanation: "Mercy before judgment." },
  { id: "malachi93", question: "What bridges Malachi to the New Testament?", options: [{ label: "A", text: "The law" }, { label: "B", text: "Promise of Elijah" }, { label: "C", text: "Temple rebuilding" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Malachi 4:5", explanation: "John the Baptist foreshadowed." },
  { id: "malachi94", question: "What does Malachi emphasize about God's word?", options: [{ label: "A", text: "Temporary" }, { label: "B", text: "Final and authoritative" }, { label: "C", text: "Flexible" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Malachi", explanation: "God speaks decisively." },
  { id: "malachi95", question: "What does Malachi show about faithfulness over time?", options: [{ label: "A", text: "It fades" }, { label: "B", text: "It matters deeply" }, { label: "C", text: "It is optional" }, { label: "D", text: "It is automatic" }], correctAnswer: "B", verse: "Malachi", explanation: "Consistency counts." },
  { id: "malachi96", question: "What emotion closes Malachi?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Hope mixed with warning" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Malachi 4", explanation: "Warning and hope together." },
  { id: "malachi97", question: "What does Malachi teach about God's justice timing?", options: [{ label: "A", text: "Immediate" }, { label: "B", text: "Certain but patient" }, { label: "C", text: "Unpredictable" }, { label: "D", text: "Cancelled" }], correctAnswer: "B", verse: "Malachi", explanation: "God waits but acts." },
  { id: "malachi98", question: "What is Malachi's core call?", options: [{ label: "A", text: "Wait" }, { label: "B", text: "Return to the Lord" }, { label: "C", text: "Rebuild" }, { label: "D", text: "Fight" }], correctAnswer: "B", verse: "Malachi 3:7", explanation: "Return invitation." },
  { id: "malachi99", question: "What does Malachi warn against?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Empty religion" }, { label: "C", text: "Prayer" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Malachi", explanation: "God wants the heart." },
  { id: "malachi100", question: "Overall, Malachi moves from what to what?", options: [{ label: "A", text: "Silence to exile" }, { label: "B", text: "Challenge to hope" }, { label: "C", text: "Judgment to silence" }, { label: "D", text: "Law to kings" }], correctAnswer: "B", verse: "Malachi", explanation: "Final prophetic message." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MalachiTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "malachi");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;

    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }

        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect: correct,
          book: "malachi",
        });
        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect: correct,
            book: "malachi",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1,
            })
            .eq("user_id", userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = {
            ...updated[currentQuestionIndex],
            verseText,
          };
          return updated;
        });
      } catch (error) {
        console.error("Error fetching verse text:", error);
      } finally {
        setLoadingVerseText(false);
      }
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Malachi expert!";
    if (score >= 8) return "Excellent! You know Malachi well!";
    if (score >= 6) return "Good job! Keep studying Malachi!";
    if (score >= 4) return "Nice try! Malachi has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / 10
            </p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/malachi"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600 flex gap-8">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold">Score: {correctCount}</span>
          </div>
        </div>

        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={!!selectedAnswer}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold text-gray-700">
                      {option.label}. {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "Correct" : "Incorrect"}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 rounded-lg ${
                        option.label === currentQuestion.correctAnswer
                          ? "bg-green-100 border-2 border-green-400"
                          : option.label === selectedAnswer && !isCorrect
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-gray-700">
                        {option.label}. {option.text}
                        {option.label === currentQuestion.correctAnswer && (
                          <span className="ml-2 text-green-700">(correct)</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentQuestion.verse}
                  </p>
                  {loadingVerseText ? (
                    <p className="text-gray-500 text-sm italic mb-3">
                      Loading verse...
                    </p>
                  ) : currentQuestion.verseText ? (
                    <p className="text-gray-800 text-sm leading-relaxed mb-3 italic">
                      "{currentQuestion.verseText}"
                    </p>
                  ) : null}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

