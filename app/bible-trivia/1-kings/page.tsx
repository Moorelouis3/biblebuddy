"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { logActionToMasterActions } from "@/lib/actionRecorder";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

// Helper function to fetch verse text from Bible API
async function fetchVerseText(reference: string): Promise<string> {
  try {
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, "+");
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
  { id: "1kings1", question: "Who was king of Israel at the beginning of 1 Kings?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Saul" }, { label: "C", text: "David" }, { label: "D", text: "Rehoboam" }], correctAnswer: "C", verse: "1 Kings 1:1", explanation: "David was old and weak at the start of 1 Kings. The book begins with a transition of leadership." },
  { id: "1kings2", question: "Who tried to make himself king while David was still alive?", options: [{ label: "A", text: "Solomon" }, { label: "B", text: "Adonijah" }, { label: "C", text: "Joab" }, { label: "D", text: "Absalom" }], correctAnswer: "B", verse: "1 Kings 1:5", explanation: "Adonijah exalted himself. Pride often seeks power without God's approval." },
  { id: "1kings3", question: "Who supported Adonijah's attempt to become king?", options: [{ label: "A", text: "Nathan and Zadok" }, { label: "B", text: "Joab and Abiathar" }, { label: "C", text: "David and Bathsheba" }, { label: "D", text: "Solomon and Nathan" }], correctAnswer: "B", verse: "1 Kings 1:7", explanation: "Joab and Abiathar sided with Adonijah. Even strong leaders can choose wrongly." },
  { id: "1kings4", question: "Who opposed Adonijah and supported Solomon?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Nathan the prophet" }, { label: "D", text: "Abishai" }], correctAnswer: "C", verse: "1 Kings 1:8", explanation: "Nathan remained faithful to God's promise. God uses prophets to protect His plan." },
  { id: "1kings5", question: "Who reminded David of his promise about the next king?", options: [{ label: "A", text: "Bathsheba" }, { label: "B", text: "Nathan" }, { label: "C", text: "Zadok" }, { label: "D", text: "Joab" }], correctAnswer: "B", verse: "1 Kings 1:11", explanation: "Nathan acted wisely to preserve God's covenant." },
  { id: "1kings6", question: "Who was anointed king instead of Adonijah?", options: [{ label: "A", text: "David" }, { label: "B", text: "Rehoboam" }, { label: "C", text: "Solomon" }, { label: "D", text: "Absalom" }], correctAnswer: "C", verse: "1 Kings 1:39", explanation: "Solomon was chosen by God to succeed David." },
  { id: "1kings7", question: "What happened to Adonijah after Solomon was crowned?", options: [{ label: "A", text: "He fled" }, { label: "B", text: "He was killed immediately" }, { label: "C", text: "He sought mercy" }, { label: "D", text: "He became a priest" }], correctAnswer: "C", verse: "1 Kings 1:50", explanation: "Adonijah feared Solomon and sought mercy. Power shifts quickly." },
  { id: "1kings8", question: "What instruction did David give Solomon before dying?", options: [{ label: "A", text: "Build alliances" }, { label: "B", text: "Walk in God's ways" }, { label: "C", text: "Expand the army" }, { label: "D", text: "Avoid Jerusalem" }], correctAnswer: "B", verse: "1 Kings 2:3", explanation: "David emphasized obedience to God above all else." },
  { id: "1kings9", question: "Who was removed from the priesthood by Solomon?", options: [{ label: "A", text: "Zadok" }, { label: "B", text: "Abiathar" }, { label: "C", text: "Nathan" }, { label: "D", text: "Eleazar" }], correctAnswer: "B", verse: "1 Kings 2:27", explanation: "Abiathar was removed for supporting Adonijah. God's word against Eli's house was fulfilled." },
  { id: "1kings10", question: "Who became commander of Solomon's army?", options: [{ label: "A", text: "Joab" }, { label: "B", text: "Benaiah" }, { label: "C", text: "Abishai" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "1 Kings 2:35", explanation: "Benaiah replaced Joab. Leadership changed under Solomon." },
  { id: "1kings11", question: "What did Solomon ask God for in a dream?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Long life" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Military power" }], correctAnswer: "C", verse: "1 Kings 3:9", explanation: "Solomon asked for wisdom to govern God's people. God was pleased with this request." },
  { id: "1kings12", question: "Where did God appear to Solomon in a dream?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Hebron" }, { label: "C", text: "Gibeon" }, { label: "D", text: "Shiloh" }], correctAnswer: "C", verse: "1 Kings 3:5", explanation: "God appeared to Solomon at Gibeon. God often speaks in unexpected places." },
  { id: "1kings13", question: "What famous judgment displayed Solomon's wisdom?", options: [{ label: "A", text: "Land division" }, { label: "B", text: "Two women and one baby" }, { label: "C", text: "Temple design" }, { label: "D", text: "Military trial" }], correctAnswer: "B", verse: "1 Kings 3:25", explanation: "Solomon revealed the true mother through wisdom. God's wisdom exposes truth." },
  { id: "1kings14", question: "What did the people think of Solomon after his judgment?", options: [{ label: "A", text: "They feared him" }, { label: "B", text: "They mocked him" }, { label: "C", text: "They recognized God's wisdom in him" }, { label: "D", text: "They rejected him" }], correctAnswer: "C", verse: "1 Kings 3:28", explanation: "Israel saw that God's wisdom was in Solomon." },
  { id: "1kings15", question: "What major project did Solomon begin?", options: [{ label: "A", text: "A palace only" }, { label: "B", text: "The temple of the Lord" }, { label: "C", text: "City walls" }, { label: "D", text: "A military base" }], correctAnswer: "B", verse: "1 Kings 5:5", explanation: "Solomon began building the temple promised to David." },
  { id: "1kings16", question: "Who supplied cedar wood for the temple?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "Hiram king of Tyre" }, { label: "C", text: "The Philistines" }, { label: "D", text: "The Moabites" }], correctAnswer: "B", verse: "1 Kings 5:10", explanation: "Hiram partnered with Solomon. God used foreign nations to accomplish His work." },
  { id: "1kings17", question: "How long did it take to build the temple?", options: [{ label: "A", text: "3 years" }, { label: "B", text: "7 years" }, { label: "C", text: "10 years" }, { label: "D", text: "40 years" }], correctAnswer: "B", verse: "1 Kings 6:38", explanation: "The temple was built over seven years. God's work requires patience." },
  { id: "1kings18", question: "What filled the temple when it was dedicated?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Wind" }, { label: "C", text: "The glory of the Lord" }, { label: "D", text: "Angels" }], correctAnswer: "C", verse: "1 Kings 8:11", explanation: "God's glory filled the temple. His presence marked approval." },
  { id: "1kings19", question: "What did Solomon pray for the people?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Forgiveness when they repent" }, { label: "C", text: "Military victory" }, { label: "D", text: "Expansion" }], correctAnswer: "B", verse: "1 Kings 8:30", explanation: "Solomon prayed for mercy and forgiveness. God desires repentance." },
  { id: "1kings20", question: "What warning did God give Solomon after the temple?", options: [{ label: "A", text: "Fear enemies" }, { label: "B", text: "Remain obedient" }, { label: "C", text: "Build more cities" }, { label: "D", text: "Avoid foreigners" }], correctAnswer: "B", verse: "1 Kings 9:4-5", explanation: "God warned Solomon to remain faithful. Blessing was tied to obedience." },
  { id: "1kings21", question: "What characterized Solomon's reign?", options: [{ label: "A", text: "Constant war" }, { label: "B", text: "Peace and prosperity" }, { label: "C", text: "Exile" }, { label: "D", text: "Division" }], correctAnswer: "B", verse: "1 Kings 4:25", explanation: "Israel experienced peace under Solomon." },
  { id: "1kings22", question: "What was Solomon known for besides wisdom?", options: [{ label: "A", text: "Prophecy" }, { label: "B", text: "Proverbs and songs" }, { label: "C", text: "Military strength" }, { label: "D", text: "Fasting" }], correctAnswer: "B", verse: "1 Kings 4:32", explanation: "Solomon spoke thousands of proverbs and songs." },
  { id: "1kings23", question: "Who visited Solomon to test his wisdom?", options: [{ label: "A", text: "Queen of Egypt" }, { label: "B", text: "Queen of Sheba" }, { label: "C", text: "Queen of Tyre" }, { label: "D", text: "Queen of Moab" }], correctAnswer: "B", verse: "1 Kings 10:1", explanation: "The Queen of Sheba recognized God's blessing on Solomon." },
  { id: "1kings24", question: "What impressed the Queen of Sheba most?", options: [{ label: "A", text: "Solomon's army" }, { label: "B", text: "Solomon's wisdom and worship" }, { label: "C", text: "The palace size" }, { label: "D", text: "The gold" }], correctAnswer: "B", verse: "1 Kings 10:4-5", explanation: "God's wisdom and order reflected His glory." },
  { id: "1kings25", question: "What began to turn Solomon's heart away from God?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Foreign wives" }, { label: "C", text: "Power" }, { label: "D", text: "Age" }], correctAnswer: "B", verse: "1 Kings 11:3-4", explanation: "Solomon's wives led his heart toward other gods." },
  { id: "1kings26", question: "How many wives did Solomon have?", options: [{ label: "A", text: "100" }, { label: "B", text: "300" }, { label: "C", text: "700" }, { label: "D", text: "1000" }], correctAnswer: "C", verse: "1 Kings 11:3", explanation: "Solomon's many wives led him into disobedience." },
  { id: "1kings27", question: "What did Solomon build for false gods?", options: [{ label: "A", text: "Altars" }, { label: "B", text: "Temples" }, { label: "C", text: "High places" }, { label: "D", text: "Statues" }], correctAnswer: "C", verse: "1 Kings 11:7", explanation: "Solomon compromised worship. Disobedience brought decline." },
  { id: "1kings28", question: "What did God promise to take from Solomon?", options: [{ label: "A", text: "His life" }, { label: "B", text: "His wisdom" }, { label: "C", text: "Most of the kingdom" }, { label: "D", text: "Jerusalem" }], correctAnswer: "C", verse: "1 Kings 11:11-13", explanation: "God judged Solomon's disobedience but preserved David's line." },
  { id: "1kings29", question: "Who was chosen to rule part of Israel after Solomon?", options: [{ label: "A", text: "Rehoboam" }, { label: "B", text: "Jeroboam" }, { label: "C", text: "Abijah" }, { label: "D", text: "Ahab" }], correctAnswer: "B", verse: "1 Kings 11:31", explanation: "Jeroboam was promised ten tribes because of Solomon's sin." },
  { id: "1kings30", question: "How did Solomon's reign end?", options: [{ label: "A", text: "Assassination" }, { label: "B", text: "Exile" }, { label: "C", text: "Death" }, { label: "D", text: "Overthrow" }], correctAnswer: "C", verse: "1 Kings 11:43", explanation: "Solomon died and was buried in Jerusalem." },
  { id: "1kings31", question: "Who became king after Solomon died?", options: [{ label: "A", text: "Jeroboam" }, { label: "B", text: "Rehoboam" }, { label: "C", text: "Adonijah" }, { label: "D", text: "Ahab" }], correctAnswer: "B", verse: "1 Kings 11:43", explanation: "Rehoboam succeeded Solomon. Leadership transition tested Israel." },
  { id: "1kings32", question: "What did the people ask Rehoboam to do?", options: [{ label: "A", text: "Lower taxes and labor" }, { label: "B", text: "Build the temple" }, { label: "C", text: "Go to war" }, { label: "D", text: "Appoint new priests" }], correctAnswer: "A", verse: "1 Kings 12:4", explanation: "The people asked for relief from Solomon's heavy burden." },
  { id: "1kings33", question: "Whose advice did Rehoboam reject?", options: [{ label: "A", text: "The prophets" }, { label: "B", text: "The elders" }, { label: "C", text: "His friends" }, { label: "D", text: "Jeroboam" }], correctAnswer: "B", verse: "1 Kings 12:8", explanation: "Rehoboam ignored wise counsel. Pride led to division." },
  { id: "1kings34", question: "Whose advice did Rehoboam follow?", options: [{ label: "A", text: "The elders" }, { label: "B", text: "The priests" }, { label: "C", text: "The young men" }, { label: "D", text: "Nathan" }], correctAnswer: "C", verse: "1 Kings 12:10", explanation: "Rehoboam chose harsh advice. Immaturity damaged leadership." },
  { id: "1kings35", question: "What happened after Rehoboam's decision?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Civil war" }, { label: "C", text: "The kingdom divided" }, { label: "D", text: "Temple destruction" }], correctAnswer: "C", verse: "1 Kings 12:16", explanation: "Israel split into two kingdoms. Disobedience fractured the nation." },
  { id: "1kings36", question: "Who became king of the northern kingdom?", options: [{ label: "A", text: "Rehoboam" }, { label: "B", text: "Jeroboam" }, { label: "C", text: "Ahab" }, { label: "D", text: "Omri" }], correctAnswer: "B", verse: "1 Kings 12:20", explanation: "Jeroboam ruled Israel. Division fulfilled God's word." },
  { id: "1kings37", question: "What did Jeroboam fear?", options: [{ label: "A", text: "Egypt" }, { label: "B", text: "David's line" }, { label: "C", text: "People returning to Jerusalem" }, { label: "D", text: "Prophets" }], correctAnswer: "C", verse: "1 Kings 12:26-27", explanation: "Fear led Jeroboam to idolatry." },
  { id: "1kings38", question: "What did Jeroboam set up to replace worship in Jerusalem?", options: [{ label: "A", text: "Altars in Egypt" }, { label: "B", text: "Golden calves" }, { label: "C", text: "New festivals" }, { label: "D", text: "A temple" }], correctAnswer: "B", verse: "1 Kings 12:28", explanation: "Jeroboam introduced false worship. Compromise led to sin." },
  { id: "1kings39", question: "Where did Jeroboam place the golden calves?", options: [{ label: "A", text: "Jerusalem and Hebron" }, { label: "B", text: "Dan and Bethel" }, { label: "C", text: "Samaria and Shechem" }, { label: "D", text: "Gilgal and Shiloh" }], correctAnswer: "B", verse: "1 Kings 12:29", explanation: "Idolatry spread strategically." },
  { id: "1kings40", question: "Who prophesied against Jeroboam's altar?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "A man of God from Judah" }, { label: "C", text: "Ahijah" }, { label: "D", text: "Elisha" }], correctAnswer: "B", verse: "1 Kings 13:1", explanation: "God warned Jeroboam through prophecy." },
  { id: "1kings41", question: "What sign confirmed the prophecy?", options: [{ label: "A", text: "Fire fell" }, { label: "B", text: "The altar split" }, { label: "C", text: "Earthquake" }, { label: "D", text: "Calf melted" }], correctAnswer: "B", verse: "1 Kings 13:5", explanation: "God confirmed His word with power." },
  { id: "1kings42", question: "What happened to Jeroboam's hand?", options: [{ label: "A", text: "It healed immediately" }, { label: "B", text: "It withered" }, { label: "C", text: "It bled" }, { label: "D", text: "It burned" }], correctAnswer: "B", verse: "1 Kings 13:4", explanation: "God judged Jeroboam instantly." },
  { id: "1kings43", question: "What did Jeroboam ask the man of God to do?", options: [{ label: "A", text: "Bless him" }, { label: "B", text: "Pray for healing" }, { label: "C", text: "Stay for a meal" }, { label: "D", text: "Serve him" }], correctAnswer: "B", verse: "1 Kings 13:6", explanation: "Jeroboam sought relief without repentance." },
  { id: "1kings44", question: "Why did the man of God die later?", options: [{ label: "A", text: "Attack" }, { label: "B", text: "Old age" }, { label: "C", text: "Disobedience to God" }, { label: "D", text: "Illness" }], correctAnswer: "C", verse: "1 Kings 13:21-24", explanation: "Partial obedience is still disobedience." },
  { id: "1kings45", question: "Who became king of Judah after Rehoboam?", options: [{ label: "A", text: "Abijah" }, { label: "B", text: "Asa" }, { label: "C", text: "Jehoshaphat" }, { label: "D", text: "Solomon" }], correctAnswer: "A", verse: "1 Kings 14:31", explanation: "Abijah followed Rehoboam." },
  { id: "1kings46", question: "Which king did what was right in God's eyes?", options: [{ label: "A", text: "Jeroboam" }, { label: "B", text: "Rehoboam" }, { label: "C", text: "Asa" }, { label: "D", text: "Omri" }], correctAnswer: "C", verse: "1 Kings 15:11", explanation: "Asa sought the Lord faithfully." },
  { id: "1kings47", question: "What did Asa remove from the land?", options: [{ label: "A", text: "High places" }, { label: "B", text: "Idols" }, { label: "C", text: "Foreign wives" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "1 Kings 15:12", explanation: "Asa cleansed Judah of idolatry." },
  { id: "1kings48", question: "Who ruled Israel after Jeroboam's line ended?", options: [{ label: "A", text: "Baasha" }, { label: "B", text: "Omri" }, { label: "C", text: "Ahab" }, { label: "D", text: "Zimri" }], correctAnswer: "A", verse: "1 Kings 15:27-28", explanation: "Baasha seized the throne through violence." },
  { id: "1kings49", question: "How long did Zimri reign?", options: [{ label: "A", text: "7 days" }, { label: "B", text: "40 days" }, { label: "C", text: "7 years" }, { label: "D", text: "12 years" }], correctAnswer: "A", verse: "1 Kings 16:15", explanation: "Zimri's reign was brief and destructive." },
  { id: "1kings50", question: "Who became king after Zimri?", options: [{ label: "A", text: "Tibni" }, { label: "B", text: "Omri" }, { label: "C", text: "Ahab" }, { label: "D", text: "Elijah" }], correctAnswer: "B", verse: "1 Kings 16:16", explanation: "Omri established a strong dynasty." },
  { id: "1kings51", question: "What city did Omri build?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Bethel" }, { label: "C", text: "Samaria" }, { label: "D", text: "Dan" }], correctAnswer: "C", verse: "1 Kings 16:24", explanation: "Samaria became Israel's capital." },
  { id: "1kings52", question: "Who succeeded Omri as king?", options: [{ label: "A", text: "Ahaziah" }, { label: "B", text: "Ahab" }, { label: "C", text: "Jehu" }, { label: "D", text: "Elijah" }], correctAnswer: "B", verse: "1 Kings 16:29", explanation: "Ahab ruled Israel with great wickedness." },
  { id: "1kings53", question: "Who was Ahab's wife?", options: [{ label: "A", text: "Athaliah" }, { label: "B", text: "Jezebel" }, { label: "C", text: "Abigail" }, { label: "D", text: "Michal" }], correctAnswer: "B", verse: "1 Kings 16:31", explanation: "Jezebel promoted Baal worship." },
  { id: "1kings54", question: "What false god did Ahab worship?", options: [{ label: "A", text: "Asherah" }, { label: "B", text: "Molech" }, { label: "C", text: "Baal" }, { label: "D", text: "Dagon" }], correctAnswer: "C", verse: "1 Kings 16:32", explanation: "Ahab led Israel deeper into idolatry." },
  { id: "1kings55", question: "Which prophet confronted Ahab?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Elijah" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Jeremiah" }], correctAnswer: "B", verse: "1 Kings 17:1", explanation: "Elijah boldly spoke God's word." },
  { id: "1kings56", question: "What judgment did Elijah announce?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "Plague" }, { label: "C", text: "Exile" }, { label: "D", text: "War" }], correctAnswer: "A", verse: "1 Kings 17:1", explanation: "Drought showed God's power over false gods." },
  { id: "1kings57", question: "Where did God send Elijah during the drought?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Brook Cherith" }, { label: "C", text: "Samaria" }, { label: "D", text: "Mount Carmel" }], correctAnswer: "B", verse: "1 Kings 17:3", explanation: "God provided for Elijah in isolation." },
  { id: "1kings58", question: "Who fed Elijah during the drought?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Ravens" }, { label: "C", text: "Priests" }, { label: "D", text: "Widows" }], correctAnswer: "B", verse: "1 Kings 17:6", explanation: "God used unlikely means to sustain His prophet." },
  { id: "1kings59", question: "Where did Elijah later stay?", options: [{ label: "A", text: "Jericho" }, { label: "B", text: "Zarephath" }, { label: "C", text: "Bethlehem" }, { label: "D", text: "Dan" }], correctAnswer: "B", verse: "1 Kings 17:9", explanation: "God sent Elijah to a widow outside Israel." },
  { id: "1kings60", question: "What miracle did God perform for the widow?", options: [{ label: "A", text: "Healing" }, { label: "B", text: "Oil and flour never ran out" }, { label: "C", text: "Rain" }, { label: "D", text: "Protection" }], correctAnswer: "B", verse: "1 Kings 17:16", explanation: "God sustained the household through faith." },
  { id: "1kings61", question: "What happened to the widow's son?", options: [{ label: "A", text: "He was healed" }, { label: "B", text: "He became sick" }, { label: "C", text: "He died" }, { label: "D", text: "He fled" }], correctAnswer: "C", verse: "1 Kings 17:17", explanation: "The widow's faith was tested deeply." },
  { id: "1kings62", question: "What did Elijah do for the widow's son?", options: [{ label: "A", text: "Prayed and stretched over him" }, { label: "B", text: "Called priests" }, { label: "C", text: "Used oil" }, { label: "D", text: "Spoke judgment" }], correctAnswer: "A", verse: "1 Kings 17:21", explanation: "God restored life through prayer." },
  { id: "1kings63", question: "Where did Elijah confront the prophets of Baal?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "Mount Horeb" }, { label: "C", text: "Mount Carmel" }, { label: "D", text: "Mount Zion" }], correctAnswer: "C", verse: "1 Kings 18:19", explanation: "God displayed His power publicly." },
  { id: "1kings64", question: "How many prophets of Baal were present?", options: [{ label: "A", text: "400" }, { label: "B", text: "450" }, { label: "C", text: "500" }, { label: "D", text: "850" }], correctAnswer: "B", verse: "1 Kings 18:22", explanation: "False worship was widespread." },
  { id: "1kings65", question: "What proved the Lord was God?", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Fire from heaven" }, { label: "C", text: "Rain" }, { label: "D", text: "Earthquake" }], correctAnswer: "B", verse: "1 Kings 18:38", explanation: "God answered with fire." },
  { id: "1kings66", question: "What happened to the prophets of Baal?", options: [{ label: "A", text: "They fled" }, { label: "B", text: "They repented" }, { label: "C", text: "They were killed" }, { label: "D", text: "They were imprisoned" }], correctAnswer: "C", verse: "1 Kings 18:40", explanation: "Judgment followed truth." },
  { id: "1kings67", question: "What followed Elijah's prayer after Mount Carmel?", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Rain" }, { label: "C", text: "Fire" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "1 Kings 18:45", explanation: "God ended the drought." },
  { id: "1kings68", question: "Who threatened Elijah after this victory?", options: [{ label: "A", text: "Ahab" }, { label: "B", text: "Jezebel" }, { label: "C", text: "Prophets" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "1 Kings 19:2", explanation: "Victory did not end opposition." },
  { id: "1kings69", question: "Where did Elijah flee?", options: [{ label: "A", text: "Samaria" }, { label: "B", text: "Beersheba" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Dan" }], correctAnswer: "B", verse: "1 Kings 19:3", explanation: "Fear followed triumph." },
  { id: "1kings70", question: "What did God provide Elijah in the wilderness?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Food and rest" }, { label: "C", text: "A sword" }, { label: "D", text: "Shelter" }], correctAnswer: "B", verse: "1 Kings 19:5-6", explanation: "God met Elijah's physical needs." },
  { id: "1kings71", question: "Where did Elijah encounter God?", options: [{ label: "A", text: "Mount Carmel" }, { label: "B", text: "Mount Horeb" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Dan" }], correctAnswer: "B", verse: "1 Kings 19:8", explanation: "God met Elijah in quietness." },
  { id: "1kings72", question: "How did God speak to Elijah?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Earthquake" }, { label: "C", text: "Gentle whisper" }, { label: "D", text: "Thunder" }], correctAnswer: "C", verse: "1 Kings 19:12", explanation: "God often speaks softly." },
  { id: "1kings73", question: "Who was chosen to succeed Elijah?", options: [{ label: "A", text: "Samuel" }, { label: "B", text: "Elisha" }, { label: "C", text: "Jehu" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "1 Kings 19:16", explanation: "Elisha was called into ministry." },
  { id: "1kings74", question: "What did Elisha do when called?", options: [{ label: "A", text: "Ran away" }, { label: "B", text: "Burned his plow" }, { label: "C", text: "Asked for riches" }, { label: "D", text: "Delayed obedience" }], correctAnswer: "B", verse: "1 Kings 19:21", explanation: "Elisha fully committed to God's call." },
  { id: "1kings75", question: "Who did Ahab desire land from?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Naboth" }, { label: "C", text: "Omri" }, { label: "D", text: "Jeroboam" }], correctAnswer: "B", verse: "1 Kings 21:1", explanation: "Ahab coveted Naboth's vineyard." },
  { id: "1kings76", question: "Why did Naboth refuse Ahab?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "God's law" }, { label: "C", text: "Hatred" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "1 Kings 21:3", explanation: "God's law protected inheritance." },
  { id: "1kings77", question: "Who arranged Naboth's death?", options: [{ label: "A", text: "Ahab" }, { label: "B", text: "Jezebel" }, { label: "C", text: "Prophets" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "1 Kings 21:8-10", explanation: "Jezebel abused power." },
  { id: "1kings78", question: "Who confronted Ahab after Naboth's death?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Elijah" }, { label: "C", text: "Nathan" }, { label: "D", text: "Samuel" }], correctAnswer: "B", verse: "1 Kings 21:17", explanation: "God's word exposed injustice." },
  { id: "1kings79", question: "What judgment was pronounced on Ahab?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Death in battle" }, { label: "C", text: "Total destruction of his house" }, { label: "D", text: "Famine" }], correctAnswer: "C", verse: "1 Kings 21:21-22", explanation: "Sin carried severe consequences." },
  { id: "1kings80", question: "How did Ahab respond to Elijah's rebuke?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Repentance" }, { label: "C", text: "Mockery" }, { label: "D", text: "Violence" }], correctAnswer: "B", verse: "1 Kings 21:27", explanation: "God delayed judgment due to humility." },
  { id: "1kings81", question: "Which king allied with Ahab?", options: [{ label: "A", text: "Hezekiah" }, { label: "B", text: "Jehoshaphat" }, { label: "C", text: "Jeroboam" }, { label: "D", text: "Asa" }], correctAnswer: "B", verse: "1 Kings 22:2", explanation: "Alliance brought compromise." },
  { id: "1kings82", question: "Who warned Ahab not to go to battle?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Micaiah" }, { label: "C", text: "Elisha" }, { label: "D", text: "Nathan" }], correctAnswer: "B", verse: "1 Kings 22:17", explanation: "True prophets speak unpopular truth." },
  { id: "1kings83", question: "How did Ahab disguise himself in battle?", options: [{ label: "A", text: "As a soldier" }, { label: "B", text: "As a servant" }, { label: "C", text: "As a common man" }, { label: "D", text: "He did not disguise himself" }], correctAnswer: "C", verse: "1 Kings 22:30", explanation: "Disguise could not avoid God's judgment." },
  { id: "1kings84", question: "How was Ahab killed?", options: [{ label: "A", text: "Sword" }, { label: "B", text: "Poison" }, { label: "C", text: "Random arrow" }, { label: "D", text: "Assassination" }], correctAnswer: "C", verse: "1 Kings 22:34", explanation: "God's word was fulfilled precisely." },
  { id: "1kings85", question: "Where was Ahab's blood licked up?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Samaria" }, { label: "C", text: "Jezreel" }, { label: "D", text: "Megiddo" }], correctAnswer: "B", verse: "1 Kings 22:38", explanation: "Prophecy came true exactly." },
  { id: "1kings86", question: "Who succeeded Ahab?", options: [{ label: "A", text: "Joram" }, { label: "B", text: "Ahaziah" }, { label: "C", text: "Jehu" }, { label: "D", text: "Omri" }], correctAnswer: "B", verse: "1 Kings 22:40", explanation: "Ahaziah followed Ahab." },
  { id: "1kings87", question: "What characterized Ahaziah's reign?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Reform" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "1 Kings 22:52", explanation: "He continued evil practices." },
  { id: "1kings88", question: "What god did Ahaziah consult?", options: [{ label: "A", text: "Baal-zebub" }, { label: "B", text: "Asherah" }, { label: "C", text: "Molech" }, { label: "D", text: "Dagon" }], correctAnswer: "A", verse: "1 Kings 22:53", explanation: "He rejected the Lord." },
  { id: "1kings89", question: "What message did Elijah give Ahaziah?", options: [{ label: "A", text: "You will recover" }, { label: "B", text: "You will die" }, { label: "C", text: "Repent" }, { label: "D", text: "Go to Jerusalem" }], correctAnswer: "B", verse: "1 Kings 22:20", explanation: "God judged Ahaziah's unbelief." },
  { id: "1kings90", question: "What ended Ahaziah's reign?", options: [{ label: "A", text: "Overthrow" }, { label: "B", text: "Assassination" }, { label: "C", text: "Death" }, { label: "D", text: "Exile" }], correctAnswer: "C", verse: "1 Kings 22:51", explanation: "Ahaziah died without repentance." },
  { id: "1kings91", question: "What major theme dominates 1 Kings?", options: [{ label: "A", text: "Temple worship" }, { label: "B", text: "Leadership and obedience" }, { label: "C", text: "Exile" }, { label: "D", text: "Restoration" }], correctAnswer: "B", verse: "1 Kings 9-11", explanation: "Obedience determined blessing or judgment." },
  { id: "1kings92", question: "What caused Israel's division?", options: [{ label: "A", text: "Foreign invasion" }, { label: "B", text: "Harsh leadership" }, { label: "C", text: "Idolatry and pride" }, { label: "D", text: "Economic collapse" }], correctAnswer: "C", verse: "1 Kings 11-12", explanation: "Sin fractured the kingdom." },
  { id: "1kings93", question: "Who stands out as God's chief prophet?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Elijah" }, { label: "C", text: "Nathan" }, { label: "D", text: "Samuel" }], correctAnswer: "B", verse: "1 Kings 17-19", explanation: "Elijah boldly defended true worship." },
  { id: "1kings94", question: "What does Solomon's fall warn against?", options: [{ label: "A", text: "Youth" }, { label: "B", text: "Foreign influence" }, { label: "C", text: "Compromise" }, { label: "D", text: "Ignorance" }], correctAnswer: "C", verse: "1 Kings 11", explanation: "Wisdom without obedience fails." },
  { id: "1kings95", question: "What did God preserve despite judgment?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "David's line" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "The priesthood" }], correctAnswer: "B", verse: "1 Kings 11:13", explanation: "God remained faithful to His covenant." },
  { id: "1kings96", question: "What pattern repeats among Israel's kings?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Humility" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "1 Kings 12-22", explanation: "Idolatry dominated Israel's leadership." },
  { id: "1kings97", question: "What did Elijah's ministry emphasize?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "True worship of the Lord" }, { label: "C", text: "Temple rituals" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "1 Kings 18", explanation: "Elijah called Israel back to God." },
  { id: "1kings98", question: "What truth does Mount Carmel display?", options: [{ label: "A", text: "Baal is powerful" }, { label: "B", text: "The Lord alone is God" }, { label: "C", text: "Prophets compete" }, { label: "D", text: "Sacrifice is enough" }], correctAnswer: "B", verse: "1 Kings 18:39", explanation: "God revealed Himself unmistakably." },
  { id: "1kings99", question: "What leadership lesson closes 1 Kings?", options: [{ label: "A", text: "Power saves" }, { label: "B", text: "Compromise destroys" }, { label: "C", text: "Wealth protects" }, { label: "D", text: "Silence wins" }], correctAnswer: "B", verse: "1 Kings 11-22", explanation: "Disobedience led to decline." },
  { id: "1kings100", question: "What overarching message does 1 Kings teach?", options: [{ label: "A", text: "God needs kings" }, { label: "B", text: "God honors obedience" }, { label: "C", text: "God favors power" }, { label: "D", text: "God ignores leaders" }], correctAnswer: "B", verse: "1 Kings 9:4-5", explanation: "Faithfulness determines blessing." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FirstKingsTriviaPage() {
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
          .eq("book", "1kings");

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
          book: "1kings",
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
            book: "1kings",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Failed to record trivia answer:",
            response.status,
            errorText
          );
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
              trivia_questions_answered:
                (currentStats.trivia_questions_answered || 0) + 1,
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
    if (score === 10) return "Perfect! You're a 1 Kings expert!";
    if (score >= 8) return "Excellent! You know 1 Kings well!";
    if (score >= 6) return "Good job! Keep studying 1 Kings!";
    if (score >= 4) return "Nice try! 1 Kings has much to explore!";
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
              href="/bible-trivia/1-kings"
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
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
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
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
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
                          <span className="ml-2 text-green-700">✓</span>
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
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
