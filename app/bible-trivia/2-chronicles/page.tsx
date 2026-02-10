"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
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
  { id: "2chronicles1", question: "Who was king of Israel at the beginning of 2 Chronicles?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon" }, { label: "C", text: "Rehoboam" }, { label: "D", text: "Saul" }], correctAnswer: "B", verse: "2 Chronicles 1:1", explanation: "2 Chronicles begins with Solomon firmly established as king." },
  { id: "2chronicles2", question: "What did Solomon seek from God at Gibeon?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Long life" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Victory" }], correctAnswer: "C", verse: "2 Chronicles 1:10", explanation: "Solomon asked for wisdom to govern God's people." },
  { id: "2chronicles3", question: "What additional blessings did God give Solomon?", options: [{ label: "A", text: "Only wisdom" }, { label: "B", text: "Wisdom and wealth" }, { label: "C", text: "Wisdom and prophecy" }, { label: "D", text: "Wisdom and land" }], correctAnswer: "B", verse: "2 Chronicles 1:11-12", explanation: "God rewarded Solomon with wealth and honor." },
  { id: "2chronicles4", question: "What major project dominates Solomon's reign?", options: [{ label: "A", text: "Military expansion" }, { label: "B", text: "Temple construction" }, { label: "C", text: "City walls" }, { label: "D", text: "Trade routes" }], correctAnswer: "B", verse: "2 Chronicles 2-7", explanation: "The temple was central to Solomon's reign." },
  { id: "2chronicles5", question: "Where was the temple built?", options: [{ label: "A", text: "Hebron" }, { label: "B", text: "Bethel" }, { label: "C", text: "Mount Moriah" }, { label: "D", text: "Shiloh" }], correctAnswer: "C", verse: "2 Chronicles 3:1", explanation: "The temple stood on Mount Moriah in Jerusalem." },
  { id: "2chronicles6", question: "Who assisted Solomon by supplying materials?", options: [{ label: "A", text: "Pharaoh" }, { label: "B", text: "Hiram king of Tyre" }, { label: "C", text: "Assyria" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "2 Chronicles 2:3", explanation: "Hiram provided cedar and skilled workers." },
  { id: "2chronicles7", question: "What filled the temple when it was dedicated?", options: [{ label: "A", text: "Fire only" }, { label: "B", text: "Cloud of God's glory" }, { label: "C", text: "Angels" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "2 Chronicles 5:13-14", explanation: "God's glory filled the temple." },
  { id: "2chronicles8", question: "What did Solomon pray during the dedication?", options: [{ label: "A", text: "For victory" }, { label: "B", text: "For forgiveness when Israel repents" }, { label: "C", text: "For wealth" }, { label: "D", text: "For expansion" }], correctAnswer: "B", verse: "2 Chronicles 6:36-39", explanation: "Solomon prayed for mercy and repentance." },
  { id: "2chronicles9", question: "What promise did God give Solomon?", options: [{ label: "A", text: "Permanent peace" }, { label: "B", text: "Blessing tied to obedience" }, { label: "C", text: "No future judgment" }, { label: "D", text: "Unlimited wealth" }], correctAnswer: "B", verse: "2 Chronicles 7:17-18", explanation: "Blessing depended on faithfulness." },
  { id: "2chronicles10", question: "Who visited Solomon to test his wisdom?", options: [{ label: "A", text: "Queen of Egypt" }, { label: "B", text: "Queen of Sheba" }, { label: "C", text: "Queen of Tyre" }, { label: "D", text: "Queen of Moab" }], correctAnswer: "B", verse: "2 Chronicles 9:1", explanation: "The Queen of Sheba recognized God's blessing." },
  { id: "2chronicles11", question: "Who became king after Solomon?", options: [{ label: "A", text: "Jeroboam" }, { label: "B", text: "Rehoboam" }, { label: "C", text: "Abijah" }, { label: "D", text: "Asa" }], correctAnswer: "B", verse: "2 Chronicles 9:31", explanation: "Rehoboam succeeded Solomon." },
  { id: "2chronicles12", question: "What caused the kingdom to divide?", options: [{ label: "A", text: "Foreign invasion" }, { label: "B", text: "Harsh leadership" }, { label: "C", text: "Economic collapse" }, { label: "D", text: "Idolatry alone" }], correctAnswer: "B", verse: "2 Chronicles 10:10-16", explanation: "Rehoboam rejected wise counsel." },
  { id: "2chronicles13", question: "Who led the northern kingdom?", options: [{ label: "A", text: "Rehoboam" }, { label: "B", text: "Jeroboam" }, { label: "C", text: "Asa" }, { label: "D", text: "Omri" }], correctAnswer: "B", verse: "2 Chronicles 10:17", explanation: "Jeroboam ruled Israel." },
  { id: "2chronicles14", question: "Which king of Judah sought the Lord?", options: [{ label: "A", text: "Rehoboam" }, { label: "B", text: "Abijah" }, { label: "C", text: "Asa" }, { label: "D", text: "Jehoshaphat" }], correctAnswer: "C", verse: "2 Chronicles 14:2", explanation: "Asa did what was right in God's eyes." },
  { id: "2chronicles15", question: "What reforms did Asa make?", options: [{ label: "A", text: "Military expansion" }, { label: "B", text: "Removed idols" }, { label: "C", text: "Built cities" }, { label: "D", text: "Alliances" }], correctAnswer: "B", verse: "2 Chronicles 14:3", explanation: "Asa removed foreign idols." },
  { id: "2chronicles16", question: "Who warned Asa later in his reign?", options: [{ label: "A", text: "Isaiah" }, { label: "B", text: "Hanani the seer" }, { label: "C", text: "Elijah" }, { label: "D", text: "Jeremiah" }], correctAnswer: "B", verse: "2 Chronicles 16:7", explanation: "Asa relied on alliances instead of God." },
  { id: "2chronicles17", question: "Who succeeded Asa?", options: [{ label: "A", text: "Jehoram" }, { label: "B", text: "Jehoshaphat" }, { label: "C", text: "Joash" }, { label: "D", text: "Amaziah" }], correctAnswer: "B", verse: "2 Chronicles 17:1", explanation: "Jehoshaphat followed Asa." },
  { id: "2chronicles18", question: "What did Jehoshaphat emphasize?", options: [{ label: "A", text: "War" }, { label: "B", text: "Teaching God's law" }, { label: "C", text: "Trade" }, { label: "D", text: "Fortresses" }], correctAnswer: "B", verse: "2 Chronicles 17:7-9", explanation: "God's law was taught throughout Judah." },
  { id: "2chronicles19", question: "Who did Jehoshaphat wrongly ally with?", options: [{ label: "A", text: "Hezekiah" }, { label: "B", text: "Ahab" }, { label: "C", text: "Josiah" }, { label: "D", text: "Jehu" }], correctAnswer: "B", verse: "2 Chronicles 18:1", explanation: "Alliance with Ahab brought trouble." },
  { id: "2chronicles20", question: "Who warned Jehoshaphat before battle?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Micaiah" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Jehu" }], correctAnswer: "B", verse: "2 Chronicles 18:14-16", explanation: "Micaiah spoke truth despite opposition." },
  { id: "2chronicles21", question: "Who succeeded Jehoshaphat?", options: [{ label: "A", text: "Ahaziah" }, { label: "B", text: "Jehoram" }, { label: "C", text: "Joash" }, { label: "D", text: "Amaziah" }], correctAnswer: "B", verse: "2 Chronicles 21:1", explanation: "Jehoram ruled after Jehoshaphat." },
  { id: "2chronicles22", question: "What characterized Jehoram's reign?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Idolatry and violence" }, { label: "C", text: "Peace" }, { label: "D", text: "Reform" }], correctAnswer: "B", verse: "2 Chronicles 21:6", explanation: "Jehoram led Judah astray." },
  { id: "2chronicles23", question: "Who briefly ruled Judah after Ahaziah?", options: [{ label: "A", text: "Jezebel" }, { label: "B", text: "Athaliah" }, { label: "C", text: "Huldah" }, { label: "D", text: "Abijah" }], correctAnswer: "B", verse: "2 Chronicles 22:10", explanation: "Athaliah seized power." },
  { id: "2chronicles24", question: "Who was hidden and preserved during Athaliah's reign?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Joash" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Amaziah" }], correctAnswer: "B", verse: "2 Chronicles 22:11", explanation: "God preserved David's line." },
  { id: "2chronicles25", question: "Who helped restore Joash as king?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Jehoiada the priest" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Micaiah" }], correctAnswer: "B", verse: "2 Chronicles 23:1", explanation: "Priestly leadership restored order." },
  { id: "2chronicles26", question: "What reform did Joash begin?", options: [{ label: "A", text: "Army reform" }, { label: "B", text: "Temple repairs" }, { label: "C", text: "Tax reform" }, { label: "D", text: "Idol building" }], correctAnswer: "B", verse: "2 Chronicles 24:4", explanation: "Joash repaired the temple." },
  { id: "2chronicles27", question: "Why did Joash later fail?", options: [{ label: "A", text: "Lack of wisdom" }, { label: "B", text: "Death of Jehoiada" }, { label: "C", text: "Foreign war" }, { label: "D", text: "Illness" }], correctAnswer: "B", verse: "2 Chronicles 24:17", explanation: "He turned away after Jehoiada died." },
  { id: "2chronicles28", question: "Who succeeded Joash?", options: [{ label: "A", text: "Uzziah" }, { label: "B", text: "Amaziah" }, { label: "C", text: "Ahaz" }, { label: "D", text: "Hezekiah" }], correctAnswer: "B", verse: "2 Chronicles 24:27", explanation: "Amaziah became king." },
  { id: "2chronicles29", question: "What mistake did Amaziah make?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Worshiping Edomite gods" }, { label: "C", text: "Ignoring law" }, { label: "D", text: "Temple neglect" }], correctAnswer: "B", verse: "2 Chronicles 25:14", explanation: "Amaziah turned to false gods." },
  { id: "2chronicles30", question: "What theme dominates early 2 Chronicles?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Temple and obedience" }, { label: "C", text: "Military power" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "2 Chronicles 1-7", explanation: "Temple worship and obedience are central." },
  { id: "2chronicles31", question: "Who became king after Amaziah?", options: [{ label: "A", text: "Ahaz" }, { label: "B", text: "Uzziah" }, { label: "C", text: "Jotham" }, { label: "D", text: "Hezekiah" }], correctAnswer: "B", verse: "2 Chronicles 26:1", explanation: "Uzziah ruled Judah." },
  { id: "2chronicles32", question: "What characterized Uzziah's early reign?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Seeking the Lord" }, { label: "C", text: "War" }, { label: "D", text: "Neglect" }], correctAnswer: "B", verse: "2 Chronicles 26:5", explanation: "Uzziah prospered while seeking God." },
  { id: "2chronicles33", question: "What caused Uzziah's downfall?", options: [{ label: "A", text: "War" }, { label: "B", text: "Pride" }, { label: "C", text: "Fear" }, { label: "D", text: "Idolatry" }], correctAnswer: "B", verse: "2 Chronicles 26:16", explanation: "Pride led to disobedience." },
  { id: "2chronicles34", question: "What punishment did Uzziah receive?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Leprosy" }, { label: "C", text: "Death" }, { label: "D", text: "Blindness" }], correctAnswer: "B", verse: "2 Chronicles 26:19", explanation: "Uzziah was struck with leprosy." },
  { id: "2chronicles35", question: "Who succeeded Uzziah?", options: [{ label: "A", text: "Ahaz" }, { label: "B", text: "Jotham" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Manasseh" }], correctAnswer: "B", verse: "2 Chronicles 27:1", explanation: "Jotham followed Uzziah." },
  { id: "2chronicles36", question: "How is Jotham described?", options: [{ label: "A", text: "Wicked" }, { label: "B", text: "Faithful" }, { label: "C", text: "Neutral" }, { label: "D", text: "Idolatrous" }], correctAnswer: "B", verse: "2 Chronicles 27:2", explanation: "Jotham did what was right." },
  { id: "2chronicles37", question: "Who followed Jotham?", options: [{ label: "A", text: "Hezekiah" }, { label: "B", text: "Ahaz" }, { label: "C", text: "Manasseh" }, { label: "D", text: "Amon" }], correctAnswer: "B", verse: "2 Chronicles 28:1", explanation: "Ahaz became king." },
  { id: "2chronicles38", question: "What defined Ahaz's reign?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Extreme idolatry" }, { label: "C", text: "Reform" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "2 Chronicles 28:2-4", explanation: "Ahaz led Judah into idolatry." },
  { id: "2chronicles39", question: "Who succeeded Ahaz?", options: [{ label: "A", text: "Manasseh" }, { label: "B", text: "Hezekiah" }, { label: "C", text: "Josiah" }, { label: "D", text: "Amon" }], correctAnswer: "B", verse: "2 Chronicles 29:1", explanation: "Hezekiah began reforms." },
  { id: "2chronicles40", question: "What did Hezekiah restore first?", options: [{ label: "A", text: "Army" }, { label: "B", text: "Temple worship" }, { label: "C", text: "Trade" }, { label: "D", text: "Taxes" }], correctAnswer: "B", verse: "2 Chronicles 29:3", explanation: "Hezekiah reopened the temple." },
  { id: "2chronicles41", question: "What feast did Hezekiah reinstate?", options: [{ label: "A", text: "Booths" }, { label: "B", text: "Pentecost" }, { label: "C", text: "Passover" }, { label: "D", text: "Trumpets" }], correctAnswer: "C", verse: "2 Chronicles 30:1", explanation: "Passover united Israel and Judah." },
  { id: "2chronicles42", question: "Who invaded Judah during Hezekiah's reign?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Assyria" }, { label: "C", text: "Egypt" }, { label: "D", text: "Aram" }], correctAnswer: "B", verse: "2 Chronicles 32:1", explanation: "Assyria threatened Jerusalem." },
  { id: "2chronicles43", question: "How did God deliver Jerusalem?", options: [{ label: "A", text: "Battle" }, { label: "B", text: "Angel struck the army" }, { label: "C", text: "Treaty" }, { label: "D", text: "Escape" }], correctAnswer: "B", verse: "2 Chronicles 32:21", explanation: "God miraculously saved Judah." },
  { id: "2chronicles44", question: "What illness did Hezekiah face?", options: [{ label: "A", text: "Leprosy" }, { label: "B", text: "Terminal sickness" }, { label: "C", text: "Blindness" }, { label: "D", text: "Paralysis" }], correctAnswer: "B", verse: "2 Chronicles 32:24", explanation: "Hezekiah prayed and was healed." },
  { id: "2chronicles45", question: "What mistake followed Hezekiah's healing?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Pride" }, { label: "C", text: "Disobedience" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "2 Chronicles 32:25", explanation: "Pride brought warning." },
  { id: "2chronicles46", question: "Who succeeded Hezekiah?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Manasseh" }, { label: "C", text: "Amon" }, { label: "D", text: "Jehoiakim" }], correctAnswer: "B", verse: "2 Chronicles 33:1", explanation: "Manasseh reversed reforms." },
  { id: "2chronicles47", question: "What characterized Manasseh's reign?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Severe idolatry" }, { label: "C", text: "Peace" }, { label: "D", text: "Reform" }], correctAnswer: "B", verse: "2 Chronicles 33:2-9", explanation: "Manasseh led Judah astray." },
  { id: "2chronicles48", question: "What happened to Manasseh later?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Captivity and repentance" }, { label: "C", text: "Exile forever" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "2 Chronicles 33:11-13", explanation: "Manasseh humbled himself." },
  { id: "2chronicles49", question: "Who followed Manasseh?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Amon" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Jehoahaz" }], correctAnswer: "B", verse: "2 Chronicles 33:21", explanation: "Amon ruled briefly." },
  { id: "2chronicles50", question: "Who succeeded Amon?", options: [{ label: "A", text: "Hezekiah" }, { label: "B", text: "Josiah" }, { label: "C", text: "Manasseh" }, { label: "D", text: "Zedekiah" }], correctAnswer: "B", verse: "2 Chronicles 34:1", explanation: "Josiah became king." },
  { id: "2chronicles51", question: "What was found during Josiah's reforms?", options: [{ label: "A", text: "Ark" }, { label: "B", text: "Book of the Law" }, { label: "C", text: "Treasures" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "2 Chronicles 34:14", explanation: "God's law was rediscovered." },
  { id: "2chronicles52", question: "How did Josiah respond to the Law?", options: [{ label: "A", text: "Ignored it" }, { label: "B", text: "Tore his clothes" }, { label: "C", text: "Celebrated" }, { label: "D", text: "Destroyed it" }], correctAnswer: "B", verse: "2 Chronicles 34:19", explanation: "Josiah repented deeply." },
  { id: "2chronicles53", question: "Which prophetess spoke to Josiah?", options: [{ label: "A", text: "Deborah" }, { label: "B", text: "Huldah" }, { label: "C", text: "Anna" }, { label: "D", text: "Miriam" }], correctAnswer: "B", verse: "2 Chronicles 34:22", explanation: "God confirmed coming judgment." },
  { id: "2chronicles54", question: "What covenant did Josiah renew?", options: [{ label: "A", text: "Davidic" }, { label: "B", text: "Mosaic" }, { label: "C", text: "Abrahamic" }, { label: "D", text: "Priestly" }], correctAnswer: "B", verse: "2 Chronicles 34:31", explanation: "Josiah renewed obedience to the Law." },
  { id: "2chronicles55", question: "What feast did Josiah celebrate?", options: [{ label: "A", text: "Booths" }, { label: "B", text: "Passover" }, { label: "C", text: "Weeks" }, { label: "D", text: "Trumpets" }], correctAnswer: "B", verse: "2 Chronicles 35:1", explanation: "Josiah restored Passover worship." },
  { id: "2chronicles56", question: "How did Josiah die?", options: [{ label: "A", text: "Illness" }, { label: "B", text: "Battle with Egypt" }, { label: "C", text: "Assassination" }, { label: "D", text: "Old age" }], correctAnswer: "B", verse: "2 Chronicles 35:23", explanation: "Josiah died in battle." },
  { id: "2chronicles57", question: "What followed Josiah's death?", options: [{ label: "A", text: "Revival" }, { label: "B", text: "Rapid decline" }, { label: "C", text: "Peace" }, { label: "D", text: "Prosperity" }], correctAnswer: "B", verse: "2 Chronicles 36", explanation: "Judah declined quickly." },
  { id: "2chronicles58", question: "Which empire conquered Judah?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "2 Chronicles 36:17", explanation: "Babylon destroyed Jerusalem." },
  { id: "2chronicles59", question: "What happened to the temple?", options: [{ label: "A", text: "Preserved" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Moved" }, { label: "D", text: "Expanded" }], correctAnswer: "B", verse: "2 Chronicles 36:19", explanation: "The temple was burned." },
  { id: "2chronicles60", question: "What ended Judah's monarchy?", options: [{ label: "A", text: "Assyrian attack" }, { label: "B", text: "Babylonian exile" }, { label: "C", text: "Civil war" }, { label: "D", text: "Economic collapse" }], correctAnswer: "B", verse: "2 Chronicles 36:20", explanation: "Judah went into exile." },
  { id: "2chronicles61", question: "How long did the exile last?", options: [{ label: "A", text: "40 years" }, { label: "B", text: "50 years" }, { label: "C", text: "70 years" }, { label: "D", text: "100 years" }], correctAnswer: "C", verse: "2 Chronicles 36:21", explanation: "The exile fulfilled Jeremiah's prophecy." },
  { id: "2chronicles62", question: "Which king allowed the Jews to return?", options: [{ label: "A", text: "Nebuchadnezzar" }, { label: "B", text: "Cyrus of Persia" }, { label: "C", text: "Darius" }, { label: "D", text: "Xerxes" }], correctAnswer: "B", verse: "2 Chronicles 36:22", explanation: "Cyrus allowed the return." },
  { id: "2chronicles63", question: "What did Cyrus encourage?", options: [{ label: "A", text: "War" }, { label: "B", text: "Temple rebuilding" }, { label: "C", text: "Trade" }, { label: "D", text: "Idolatry" }], correctAnswer: "B", verse: "2 Chronicles 36:23", explanation: "God stirred Cyrus's heart." },
  { id: "2chronicles64", question: "What central theme runs through 2 Chronicles?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "Faithfulness brings blessing" }, { label: "C", text: "Military power" }, { label: "D", text: "Kingship alone" }], correctAnswer: "B", verse: "2 Chronicles overall", explanation: "Blessing followed obedience." },
  { id: "2chronicles65", question: "Why does Chronicles focus on Judah?", options: [{ label: "A", text: "More powerful" }, { label: "B", text: "Davidic covenant" }, { label: "C", text: "Wealth" }, { label: "D", text: "Population" }], correctAnswer: "B", verse: "2 Chronicles context", explanation: "Judah carried the covenant line." },
  { id: "2chronicles66", question: "What role did prophets play?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Calling to repentance" }, { label: "C", text: "Political leaders" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "2 Chronicles 36:15-16", explanation: "God warned repeatedly." },
  { id: "2chronicles67", question: "What brought destruction on Judah?", options: [{ label: "A", text: "Weak army" }, { label: "B", text: "Persistent disobedience" }, { label: "C", text: "Foreign strength" }, { label: "D", text: "Economic failure" }], correctAnswer: "B", verse: "2 Chronicles 36:14-16", explanation: "Disobedience led to judgment." },
  { id: "2chronicles68", question: "What does Hezekiah model?", options: [{ label: "A", text: "Military power" }, { label: "B", text: "Trust in God" }, { label: "C", text: "Political strategy" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "2 Chronicles 32", explanation: "Trust brought deliverance." },
  { id: "2chronicles69", question: "What does Manasseh's repentance show?", options: [{ label: "A", text: "Too late" }, { label: "B", text: "God's mercy" }, { label: "C", text: "Weakness" }, { label: "D", text: "Politics" }], correctAnswer: "B", verse: "2 Chronicles 33:12-13", explanation: "God forgives the humble." },
  { id: "2chronicles70", question: "What lesson comes from Josiah's life?", options: [{ label: "A", text: "Reform always saves" }, { label: "B", text: "Obedience matters" }, { label: "C", text: "Youth leads to failure" }, { label: "D", text: "Law is optional" }], correctAnswer: "B", verse: "2 Chronicles 34-35", explanation: "Faithfulness matters deeply." },
  { id: "2chronicles71", question: "Why did judgment still come after Josiah?", options: [{ label: "A", text: "Lack of reform" }, { label: "B", text: "Previous sin" }, { label: "C", text: "Foreign invasion" }, { label: "D", text: "Weak leadership" }], correctAnswer: "B", verse: "2 Chronicles 36:16", explanation: "Sin accumulated over generations." },
  { id: "2chronicles72", question: "What hope closes 2 Chronicles?", options: [{ label: "A", text: "New king" }, { label: "B", text: "Return from exile" }, { label: "C", text: "Military victory" }, { label: "D", text: "Temple destroyed forever" }], correctAnswer: "B", verse: "2 Chronicles 36:22-23", explanation: "God opened a way back." },
  { id: "2chronicles73", question: "What does exile demonstrate?", options: [{ label: "A", text: "God's absence" }, { label: "B", text: "God's justice" }, { label: "C", text: "Human failure" }, { label: "D", text: "End of covenant" }], correctAnswer: "B", verse: "2 Chronicles 36", explanation: "God disciplines His people." },
  { id: "2chronicles74", question: "What preserved Israel's hope?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Prophets" }, { label: "C", text: "God's promises" }, { label: "D", text: "Temple" }], correctAnswer: "C", verse: "2 Chronicles overall", explanation: "God remained faithful." },
  { id: "2chronicles75", question: "Why is repentance emphasized?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Restoration" }, { label: "C", text: "Fear" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "2 Chronicles 7:14", explanation: "Repentance leads to healing." },
  { id: "2chronicles76", question: "What role did the temple play?", options: [{ label: "A", text: "Political center" }, { label: "B", text: "Place of God's presence" }, { label: "C", text: "Economic hub" }, { label: "D", text: "Military base" }], correctAnswer: "B", verse: "2 Chronicles 5", explanation: "God dwelt among His people." },
  { id: "2chronicles77", question: "What did obedience bring?", options: [{ label: "A", text: "Wealth only" }, { label: "B", text: "Blessing and peace" }, { label: "C", text: "Power only" }, { label: "D", text: "No conflict" }], correctAnswer: "B", verse: "2 Chronicles themes", explanation: "God blessed obedience." },
  { id: "2chronicles78", question: "What did rebellion bring?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Judgment" }, { label: "C", text: "Freedom" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "2 Chronicles 36", explanation: "Rebellion led to exile." },
  { id: "2chronicles79", question: "What does Cyrus's decree show?", options: [{ label: "A", text: "Human power" }, { label: "B", text: "God rules nations" }, { label: "C", text: "Chance" }, { label: "D", text: "Political kindness" }], correctAnswer: "B", verse: "2 Chronicles 36:22", explanation: "God directs kings." },
  { id: "2chronicles80", question: "Why was Chronicles written?", options: [{ label: "A", text: "History only" }, { label: "B", text: "Restore hope and identity" }, { label: "C", text: "Condemn Israel" }, { label: "D", text: "Teach warfare" }], correctAnswer: "B", verse: "2 Chronicles context", explanation: "It encouraged returning exiles." },
  { id: "2chronicles81", question: "What is emphasized more than political success?", options: [{ label: "A", text: "Economy" }, { label: "B", text: "Faithfulness to God" }, { label: "C", text: "Military strength" }, { label: "D", text: "Diplomacy" }], correctAnswer: "B", verse: "2 Chronicles overall", explanation: "Faithfulness mattered most." },
  { id: "2chronicles82", question: "What repeated cycle appears?", options: [{ label: "A", text: "War then peace" }, { label: "B", text: "Obedience then blessing" }, { label: "C", text: "Sin then judgment" }, { label: "D", text: "Both B and C" }], correctAnswer: "D", verse: "2 Chronicles overview", explanation: "Cycles of obedience and rebellion repeat." },
  { id: "2chronicles83", question: "What lesson do faithful kings teach?", options: [{ label: "A", text: "Strength wins" }, { label: "B", text: "Trust God" }, { label: "C", text: "Avoid worship" }, { label: "D", text: "Rule harshly" }], correctAnswer: "B", verse: "2 Chronicles 20, 32", explanation: "Trust led to deliverance." },
  { id: "2chronicles84", question: "What did unfaithful kings ignore?", options: [{ label: "A", text: "People" }, { label: "B", text: "God's warnings" }, { label: "C", text: "Enemies" }, { label: "D", text: "Temple" }], correctAnswer: "B", verse: "2 Chronicles 36:15-16", explanation: "They rejected God's word." },
  { id: "2chronicles85", question: "What does God desire from leaders?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Obedience" }, { label: "C", text: "Popularity" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "2 Chronicles themes", explanation: "God values obedience." },
  { id: "2chronicles86", question: "Why did exile not end the story?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "God's mercy" }, { label: "C", text: "Military rescue" }, { label: "D", text: "Human strength" }], correctAnswer: "B", verse: "2 Chronicles 36:22-23", explanation: "God provided restoration." },
  { id: "2chronicles87", question: "What hope did returning exiles have?", options: [{ label: "A", text: "New kings" }, { label: "B", text: "Temple rebuilding" }, { label: "C", text: "God's promises" }, { label: "D", text: "Peace" }], correctAnswer: "C", verse: "2 Chronicles overall", explanation: "God's covenant endured." },
  { id: "2chronicles88", question: "What does worship-centered leadership produce?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Unity" }, { label: "C", text: "Conflict" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "2 Chronicles 29-30", explanation: "Worship united the people." },
  { id: "2chronicles89", question: "What is God shown to control?", options: [{ label: "A", text: "Judah only" }, { label: "B", text: "Israel only" }, { label: "C", text: "All nations" }, { label: "D", text: "Kings only" }], correctAnswer: "C", verse: "2 Chronicles 36:22", explanation: "God rules nations." },
  { id: "2chronicles90", question: "What truth does Chronicles reinforce?", options: [{ label: "A", text: "Kings save nations" }, { label: "B", text: "God remains faithful" }, { label: "C", text: "Law is outdated" }, { label: "D", text: "Temple guarantees safety" }], correctAnswer: "B", verse: "2 Chronicles overall", explanation: "God keeps His promises." },
  { id: "2chronicles91", question: "What warning is repeated?", options: [{ label: "A", text: "Fear enemies" }, { label: "B", text: "Do not forsake God" }, { label: "C", text: "Build armies" }, { label: "D", text: "Seek alliances" }], correctAnswer: "B", verse: "2 Chronicles 15:2", explanation: "Forsaking God brings loss." },
  { id: "2chronicles92", question: "What encourages repentance?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "God's mercy" }, { label: "C", text: "Law" }, { label: "D", text: "Punishment" }], correctAnswer: "B", verse: "2 Chronicles 7:14", explanation: "God welcomes repentance." },
  { id: "2chronicles93", question: "What ultimate failure led to exile?", options: [{ label: "A", text: "Military defeat" }, { label: "B", text: "Persistent rebellion" }, { label: "C", text: "Weak kings" }, { label: "D", text: "Foreign strength" }], correctAnswer: "B", verse: "2 Chronicles 36", explanation: "Rebellion accumulated." },
  { id: "2chronicles94", question: "What hope remained after destruction?", options: [{ label: "A", text: "Army" }, { label: "B", text: "God's word" }, { label: "C", text: "Kings" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "2 Chronicles 36:22", explanation: "God's word stood firm." },
  { id: "2chronicles95", question: "Why is restoration possible?", options: [{ label: "A", text: "Human effort" }, { label: "B", text: "God's grace" }, { label: "C", text: "Political shifts" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "2 Chronicles 36:23", explanation: "God restores by grace." },
  { id: "2chronicles96", question: "What final note does the book strike?", options: [{ label: "A", text: "Defeat" }, { label: "B", text: "Hope" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "2 Chronicles 36:23", explanation: "Hope points forward." },
  { id: "2chronicles97", question: "What connects Kings and Chronicles?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "Covenant faithfulness" }, { label: "C", text: "Military records" }, { label: "D", text: "Geography" }], correctAnswer: "B", verse: "2 Chronicles overall", explanation: "God's covenant remains central." },
  { id: "2chronicles98", question: "What defines successful leadership?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Faithfulness to God" }, { label: "C", text: "Popularity" }, { label: "D", text: "Expansion" }], correctAnswer: "B", verse: "2 Chronicles themes", explanation: "Faithfulness defines success." },
  { id: "2chronicles99", question: "What message would returning exiles hear?", options: [{ label: "A", text: "You failed" }, { label: "B", text: "God has not abandoned you" }, { label: "C", text: "Start over alone" }, { label: "D", text: "Forget the past" }], correctAnswer: "B", verse: "2 Chronicles 36", explanation: "God remained with His people." },
  { id: "2chronicles100", question: "What is the ultimate message of 2 Chronicles?", options: [{ label: "A", text: "Kings rule history" }, { label: "B", text: "God is faithful despite failure" }, { label: "C", text: "Temple saves people" }, { label: "D", text: "Law guarantees safety" }], correctAnswer: "B", verse: "2 Chronicles 36:23", explanation: "God's faithfulness outlasts human failure." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondChroniclesTriviaPage() {
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
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "2chronicles");

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
          book: "2chronicles",
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
            book: "2chronicles",
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
    if (score === 10) return "Perfect! You're a 2 Chronicles expert!";
    if (score >= 8) return "Excellent! You know 2 Chronicles well!";
    if (score >= 6) return "Good job! Keep studying 2 Chronicles!";
    if (score >= 4) return "Nice try! 2 Chronicles has much to explore!";
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
              href="/bible-trivia/2-chronicles"
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






