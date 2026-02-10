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
  { id: "2kings1", question: "Who was king of Israel at the beginning of 2 Kings?", options: [{ label: "A", text: "Ahab" }, { label: "B", text: "Ahaziah" }, { label: "C", text: "Joram" }, { label: "D", text: "Jehu" }], correctAnswer: "B", verse: "2 Kings 1:1", explanation: "Ahaziah ruled Israel after Ahab. His reign continued Israel's idolatry." },
  { id: "2kings2", question: "What accident happened to Ahaziah?", options: [{ label: "A", text: "He fell from a horse" }, { label: "B", text: "He fell through a lattice" }, { label: "C", text: "He was wounded in battle" }, { label: "D", text: "He was poisoned" }], correctAnswer: "B", verse: "2 Kings 1:2", explanation: "Ahaziah was injured and sought guidance from a false god." },
  { id: "2kings3", question: "Which false god did Ahaziah consult?", options: [{ label: "A", text: "Baal" }, { label: "B", text: "Asherah" }, { label: "C", text: "Baal-zebub" }, { label: "D", text: "Molech" }], correctAnswer: "C", verse: "2 Kings 1:2", explanation: "Ahaziah rejected the Lord by consulting Baal-zebub." },
  { id: "2kings4", question: "Who confronted Ahaziah's messengers?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Elijah" }, { label: "C", text: "Jehu" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "2 Kings 1:3", explanation: "Elijah declared God's judgment." },
  { id: "2kings5", question: "What happened to the soldiers sent to capture Elijah?", options: [{ label: "A", text: "They fled" }, { label: "B", text: "They repented" }, { label: "C", text: "Fire fell from heaven" }, { label: "D", text: "They imprisoned him" }], correctAnswer: "C", verse: "2 Kings 1:10", explanation: "God defended His prophet with fire." },
  { id: "2kings6", question: "Who succeeded Ahaziah as king of Israel?", options: [{ label: "A", text: "Jehu" }, { label: "B", text: "Joram" }, { label: "C", text: "Elisha" }, { label: "D", text: "Amaziah" }], correctAnswer: "B", verse: "2 Kings 1:17", explanation: "Joram became king after Ahaziah's death." },
  { id: "2kings7", question: "What event marked Elijah's departure?", options: [{ label: "A", text: "Death" }, { label: "B", text: "Fire from heaven" }, { label: "C", text: "Taken up in a whirlwind" }, { label: "D", text: "Battle" }], correctAnswer: "C", verse: "2 Kings 2:11", explanation: "Elijah was taken to heaven without dying." },
  { id: "2kings8", question: "Who witnessed Elijah being taken up?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Elisha" }, { label: "C", text: "Kings" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "2 Kings 2:12", explanation: "Elisha witnessed the transfer of prophetic authority." },
  { id: "2kings9", question: "What did Elisha request from Elijah?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "Power" }, { label: "C", text: "A double portion of his spirit" }, { label: "D", text: "Protection" }], correctAnswer: "C", verse: "2 Kings 2:9", explanation: "Elisha desired spiritual inheritance." },
  { id: "2kings10", question: "What miracle confirmed Elisha's authority?", options: [{ label: "A", text: "Healing leprosy" }, { label: "B", text: "Calling fire" }, { label: "C", text: "Parting the Jordan River" }, { label: "D", text: "Raising the dead" }], correctAnswer: "C", verse: "2 Kings 2:14", explanation: "God confirmed Elisha as Elijah's successor." },
  { id: "2kings11", question: "What happened to the mocking youths?", options: [{ label: "A", text: "They repented" }, { label: "B", text: "They fled" }, { label: "C", text: "They were mauled by bears" }, { label: "D", text: "They were healed" }], correctAnswer: "C", verse: "2 Kings 2:24", explanation: "God judged disrespect for His prophet." },
  { id: "2kings12", question: "Who was king of Moab that rebelled against Israel?", options: [{ label: "A", text: "Balak" }, { label: "B", text: "Mesha" }, { label: "C", text: "Omri" }, { label: "D", text: "Hazael" }], correctAnswer: "B", verse: "2 Kings 3:4-5", explanation: "Moab rebelled after Ahab's death." },
  { id: "2kings13", question: "Who prophesied victory against Moab?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Elisha" }, { label: "C", text: "Isaiah" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "2 Kings 3:16", explanation: "Elisha spoke God's word." },
  { id: "2kings14", question: "What miracle provided water for the armies?", options: [{ label: "A", text: "Rainstorm" }, { label: "B", text: "Flood" }, { label: "C", text: "Water filled the valley without rain" }, { label: "D", text: "Spring appeared" }], correctAnswer: "C", verse: "2 Kings 3:17", explanation: "God provided miraculously." },
  { id: "2kings15", question: "What widow did Elisha help?", options: [{ label: "A", text: "Zarephath widow" }, { label: "B", text: "Widow of a prophet" }, { label: "C", text: "Queen of Sheba" }, { label: "D", text: "Ruth" }], correctAnswer: "B", verse: "2 Kings 4:1", explanation: "Elisha cared for the needy." },
  { id: "2kings16", question: "What miracle helped the widow?", options: [{ label: "A", text: "Raising her son" }, { label: "B", text: "Multiplying oil" }, { label: "C", text: "Healing" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "2 Kings 4:2-7", explanation: "God provided through obedience." },
  { id: "2kings17", question: "Who was promised a son by Elisha?", options: [{ label: "A", text: "Widow" }, { label: "B", text: "Shunammite woman" }, { label: "C", text: "Queen" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "2 Kings 4:16", explanation: "God rewarded hospitality." },
  { id: "2kings18", question: "What happened to the Shunammite's son?", options: [{ label: "A", text: "He fled" }, { label: "B", text: "He became sick and died" }, { label: "C", text: "He was healed instantly" }, { label: "D", text: "He was taken captive" }], correctAnswer: "B", verse: "2 Kings 4:20", explanation: "Faith was tested." },
  { id: "2kings19", question: "What did Elisha do for the child?", options: [{ label: "A", text: "Prayed and stretched himself on him" }, { label: "B", text: "Called fire" }, { label: "C", text: "Used oil" }, { label: "D", text: "Spoke a word only" }], correctAnswer: "A", verse: "2 Kings 4:34", explanation: "God restored life." },
  { id: "2kings20", question: "Who was healed of leprosy?", options: [{ label: "A", text: "Gehazi" }, { label: "B", text: "Naaman" }, { label: "C", text: "King Joram" }, { label: "D", text: "Elisha" }], correctAnswer: "B", verse: "2 Kings 5:1", explanation: "God healed a foreign commander." },
  { id: "2kings21", question: "What did Naaman do to be healed?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Sacrifice" }, { label: "C", text: "Wash in the Jordan seven times" }, { label: "D", text: "Fast" }], correctAnswer: "C", verse: "2 Kings 5:10", explanation: "Healing required humility." },
  { id: "2kings22", question: "Who became leprous because of greed?", options: [{ label: "A", text: "Naaman" }, { label: "B", text: "Gehazi" }, { label: "C", text: "Joram" }, { label: "D", text: "Ahab" }], correctAnswer: "B", verse: "2 Kings 5:27", explanation: "Greed brought judgment." },
  { id: "2kings23", question: "What miracle helped the prophets with an axe head?", options: [{ label: "A", text: "It reappeared" }, { label: "B", text: "It floated" }, { label: "C", text: "It was replaced" }, { label: "D", text: "It turned gold" }], correctAnswer: "B", verse: "2 Kings 6:6", explanation: "God cared about small needs." },
  { id: "2kings24", question: "What did Elisha reveal to Israel's king?", options: [{ label: "A", text: "Enemy plans" }, { label: "B", text: "Weather" }, { label: "C", text: "Dreams" }, { label: "D", text: "Future kings" }], correctAnswer: "A", verse: "2 Kings 6:12", explanation: "God protected Israel through revelation." },
  { id: "2kings25", question: "What surrounded Elisha at Dothan?", options: [{ label: "A", text: "Angels and chariots of fire" }, { label: "B", text: "Soldiers" }, { label: "C", text: "Crowds" }, { label: "D", text: "Walls" }], correctAnswer: "A", verse: "2 Kings 6:17", explanation: "God's army was unseen but present." },
  { id: "2kings26", question: "What struck the Aramean army?", options: [{ label: "A", text: "Plague" }, { label: "B", text: "Blindness" }, { label: "C", text: "Fire" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "2 Kings 6:18", explanation: "God delivered Israel peacefully." },
  { id: "2kings27", question: "What happened during the siege of Samaria?", options: [{ label: "A", text: "Plenty" }, { label: "B", text: "Famine" }, { label: "C", text: "Peace" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "2 Kings 6:25", explanation: "Disobedience brought hardship." },
  { id: "2kings28", question: "Who announced the end of the famine?", options: [{ label: "A", text: "King" }, { label: "B", text: "Elijah" }, { label: "C", text: "Elisha" }, { label: "D", text: "Priests" }], correctAnswer: "C", verse: "2 Kings 7:1", explanation: "God promised sudden deliverance." },
  { id: "2kings29", question: "Who discovered the enemy had fled?", options: [{ label: "A", text: "Soldiers" }, { label: "B", text: "Kings" }, { label: "C", text: "Four lepers" }, { label: "D", text: "Prophets" }], correctAnswer: "C", verse: "2 Kings 7:3-5", explanation: "God used the unlikely." },
  { id: "2kings30", question: "What caused the enemy army to flee?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Noise of armies" }, { label: "C", text: "Fire" }, { label: "D", text: "Plague" }], correctAnswer: "B", verse: "2 Kings 7:6", explanation: "God caused fear through sound." },
  { id: "2kings31", question: "Who became king of Israel after Joram?", options: [{ label: "A", text: "Ahaziah" }, { label: "B", text: "Jehu" }, { label: "C", text: "Hazael" }, { label: "D", text: "Elisha" }], correctAnswer: "B", verse: "2 Kings 9:6", explanation: "Jehu was anointed king by God's command." },
  { id: "2kings32", question: "Who anointed Jehu?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Elisha's servant" }, { label: "C", text: "Nathan" }, { label: "D", text: "Priest" }], correctAnswer: "B", verse: "2 Kings 9:1-3", explanation: "Elisha sent a prophet to anoint Jehu." },
  { id: "2kings33", question: "How did Jehu kill Joram?", options: [{ label: "A", text: "Sword" }, { label: "B", text: "Poison" }, { label: "C", text: "Arrow" }, { label: "D", text: "Fire" }], correctAnswer: "C", verse: "2 Kings 9:24", explanation: "God's judgment was fulfilled." },
  { id: "2kings34", question: "How did Jezebel die?", options: [{ label: "A", text: "Burned" }, { label: "B", text: "Stoned" }, { label: "C", text: "Thrown from a window" }, { label: "D", text: "Poisoned" }], correctAnswer: "C", verse: "2 Kings 9:33", explanation: "Prophecy against Jezebel was fulfilled." },
  { id: "2kings35", question: "What happened to Ahab's descendants?", options: [{ label: "A", text: "They repented" }, { label: "B", text: "They were killed" }, { label: "C", text: "They ruled" }, { label: "D", text: "They fled" }], correctAnswer: "B", verse: "2 Kings 10:7", explanation: "Jehu destroyed Ahab's house." },
  { id: "2kings36", question: "What false worship did Jehu eliminate?", options: [{ label: "A", text: "Asherah" }, { label: "B", text: "Baal" }, { label: "C", text: "Golden calves" }, { label: "D", text: "Molech" }], correctAnswer: "B", verse: "2 Kings 10:28", explanation: "Jehu removed Baal worship." },
  { id: "2kings37", question: "What sin did Jehu continue?", options: [{ label: "A", text: "Idolatry of calves" }, { label: "B", text: "Baal worship" }, { label: "C", text: "Temple worship" }, { label: "D", text: "Foreign alliances" }], correctAnswer: "A", verse: "2 Kings 10:29", explanation: "Partial obedience remained." },
  { id: "2kings38", question: "Who ruled Judah during this time?", options: [{ label: "A", text: "Athaliah" }, { label: "B", text: "Joash" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Manasseh" }], correctAnswer: "A", verse: "2 Kings 11:1", explanation: "Athaliah seized power." },
  { id: "2kings39", question: "What did Athaliah try to do?", options: [{ label: "A", text: "Destroy idols" }, { label: "B", text: "Kill royal heirs" }, { label: "C", text: "Build the temple" }, { label: "D", text: "Restore worship" }], correctAnswer: "B", verse: "2 Kings 11:1", explanation: "Athaliah attempted to end David's line." },
  { id: "2kings40", question: "Who was hidden from Athaliah?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Joash" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Amaziah" }], correctAnswer: "B", verse: "2 Kings 11:2", explanation: "God preserved David's lineage." },
  { id: "2kings41", question: "Who crowned Joash king?", options: [{ label: "A", text: "Elisha" }, { label: "B", text: "Priests" }, { label: "C", text: "Jehoiada the priest" }, { label: "D", text: "Prophet" }], correctAnswer: "C", verse: "2 Kings 11:12", explanation: "Priestly leadership restored order." },
  { id: "2kings42", question: "What happened to Athaliah?", options: [{ label: "A", text: "She fled" }, { label: "B", text: "She was killed" }, { label: "C", text: "She repented" }, { label: "D", text: "She ruled longer" }], correctAnswer: "B", verse: "2 Kings 11:16", explanation: "God removed evil leadership." },
  { id: "2kings43", question: "What reform did Joash begin?", options: [{ label: "A", text: "Temple repairs" }, { label: "B", text: "Army expansion" }, { label: "C", text: "Tax reduction" }, { label: "D", text: "Idol building" }], correctAnswer: "A", verse: "2 Kings 12:4-5", explanation: "Joash restored worship." },
  { id: "2kings44", question: "What weakened Joash's faith later?", options: [{ label: "A", text: "Foreign war" }, { label: "B", text: "Death of Jehoiada" }, { label: "C", text: "Wealth" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "2 Kings 12:17", explanation: "Guidance mattered." },
  { id: "2kings45", question: "Who assassinated Joash?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Servants" }, { label: "C", text: "Prophets" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "2 Kings 12:20", explanation: "Corruption ended his reign." },
  { id: "2kings46", question: "Who followed Joash as king of Judah?", options: [{ label: "A", text: "Amaziah" }, { label: "B", text: "Uzziah" }, { label: "C", text: "Ahaz" }, { label: "D", text: "Hezekiah" }], correctAnswer: "A", verse: "2 Kings 14:1", explanation: "Amaziah became king." },
  { id: "2kings47", question: "What mistake did Amaziah make?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "War with Israel" }, { label: "C", text: "Temple neglect" }, { label: "D", text: "Foreign marriage" }], correctAnswer: "B", verse: "2 Kings 14:8", explanation: "Pride led to defeat." },
  { id: "2kings48", question: "Who became king of Israel after Jehu?", options: [{ label: "A", text: "Jehoahaz" }, { label: "B", text: "Joash" }, { label: "C", text: "Jeroboam II" }, { label: "D", text: "Hoshea" }], correctAnswer: "A", verse: "2 Kings 13:1", explanation: "Jehoahaz followed Jehu." },
  { id: "2kings49", question: "What enemy oppressed Israel?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Aram" }, { label: "C", text: "Babylon" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "2 Kings 13:3", explanation: "Israel suffered under Aram." },
  { id: "2kings50", question: "Who cried out to the Lord and received deliverance?", options: [{ label: "A", text: "Jehoahaz" }, { label: "B", text: "Jehu" }, { label: "C", text: "Amaziah" }, { label: "D", text: "Joash" }], correctAnswer: "A", verse: "2 Kings 13:4", explanation: "God responded to repentance." },
  { id: "2kings51", question: "Who visited Elisha on his deathbed?", options: [{ label: "A", text: "Jehu" }, { label: "B", text: "Joash king of Israel" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Josiah" }], correctAnswer: "B", verse: "2 Kings 13:14", explanation: "Elisha's final prophecy brought hope." },
  { id: "2kings52", question: "What object did Elisha instruct Joash to strike?", options: [{ label: "A", text: "Shield" }, { label: "B", text: "Ground with arrows" }, { label: "C", text: "Sword" }, { label: "D", text: "Altar" }], correctAnswer: "B", verse: "2 Kings 13:18", explanation: "Limited faith limited victory." },
  { id: "2kings53", question: "What happened after Elisha died?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Revival" }, { label: "C", text: "A dead man revived" }, { label: "D", text: "War" }], correctAnswer: "C", verse: "2 Kings 13:21", explanation: "God's power remained." },
  { id: "2kings54", question: "Who ruled Israel during prosperity?", options: [{ label: "A", text: "Jeroboam II" }, { label: "B", text: "Jehu" }, { label: "C", text: "Hoshea" }, { label: "D", text: "Omri" }], correctAnswer: "A", verse: "2 Kings 14:23", explanation: "Prosperity did not equal faithfulness." },
  { id: "2kings55", question: "Who ruled Judah faithfully during crisis?", options: [{ label: "A", text: "Ahaz" }, { label: "B", text: "Hezekiah" }, { label: "C", text: "Manasseh" }, { label: "D", text: "Amon" }], correctAnswer: "B", verse: "2 Kings 18:3", explanation: "Hezekiah trusted the Lord." },
  { id: "2kings56", question: "What reform did Hezekiah make?", options: [{ label: "A", text: "Destroyed high places" }, { label: "B", text: "Built idols" }, { label: "C", text: "Foreign alliances" }, { label: "D", text: "New gods" }], correctAnswer: "A", verse: "2 Kings 18:4", explanation: "Hezekiah restored true worship." },
  { id: "2kings57", question: "Who invaded Judah during Hezekiah's reign?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Assyria" }, { label: "C", text: "Egypt" }, { label: "D", text: "Aram" }], correctAnswer: "B", verse: "2 Kings 18:13", explanation: "Assyria threatened Jerusalem." },
  { id: "2kings58", question: "Who mocked God during the siege?", options: [{ label: "A", text: "Sennacherib" }, { label: "B", text: "Rabshakeh" }, { label: "C", text: "Hazael" }, { label: "D", text: "Nebuchadnezzar" }], correctAnswer: "B", verse: "2 Kings 18:28", explanation: "Mockery challenged faith." },
  { id: "2kings59", question: "Who encouraged Hezekiah?", options: [{ label: "A", text: "Elijah" }, { label: "B", text: "Isaiah" }, { label: "C", text: "Elisha" }, { label: "D", text: "Jeremiah" }], correctAnswer: "B", verse: "2 Kings 19:2", explanation: "Prophets strengthened kings." },
  { id: "2kings60", question: "How did God deliver Jerusalem?", options: [{ label: "A", text: "Battle" }, { label: "B", text: "Angel struck Assyrian army" }, { label: "C", text: "Treaty" }, { label: "D", text: "Escape" }], correctAnswer: "B", verse: "2 Kings 19:35", explanation: "God saved Jerusalem miraculously." },
  { id: "2kings61", question: "What illness did Hezekiah face?", options: [{ label: "A", text: "Blindness" }, { label: "B", text: "Terminal sickness" }, { label: "C", text: "Leprosy" }, { label: "D", text: "Paralysis" }], correctAnswer: "B", verse: "2 Kings 20:1", explanation: "Hezekiah faced death." },
  { id: "2kings62", question: "What did Hezekiah do?", options: [{ label: "A", text: "Fled" }, { label: "B", text: "Prayed" }, { label: "C", text: "Fasted" }, { label: "D", text: "Surrendered" }], correctAnswer: "B", verse: "2 Kings 20:2", explanation: "Prayer moved God." },
  { id: "2kings63", question: "How many years were added to Hezekiah's life?", options: [{ label: "A", text: "5" }, { label: "B", text: "10" }, { label: "C", text: "15" }, { label: "D", text: "20" }], correctAnswer: "C", verse: "2 Kings 20:6", explanation: "God extended Hezekiah's life." },
  { id: "2kings64", question: "What sign confirmed healing?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Shadow moved backward" }, { label: "C", text: "Rain" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "2 Kings 20:11", explanation: "God confirmed His promise." },
  { id: "2kings65", question: "What mistake did Hezekiah make?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Pride showing Babylon treasures" }, { label: "C", text: "Foreign worship" }, { label: "D", text: "Disobedience" }], correctAnswer: "B", verse: "2 Kings 20:13", explanation: "Pride led to judgment." },
  { id: "2kings66", question: "What was prophesied because of Hezekiah's mistake?", options: [{ label: "A", text: "Assyrian invasion" }, { label: "B", text: "Babylonian exile" }, { label: "C", text: "Famine" }, { label: "D", text: "Plague" }], correctAnswer: "B", verse: "2 Kings 20:17", explanation: "Judgment was delayed but sure." },
  { id: "2kings67", question: "Who succeeded Hezekiah?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Manasseh" }, { label: "C", text: "Amon" }, { label: "D", text: "Jehoiakim" }], correctAnswer: "B", verse: "2 Kings 21:1", explanation: "Manasseh reversed reforms." },
  { id: "2kings68", question: "What characterized Manasseh's reign?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Extreme wickedness" }, { label: "C", text: "Revival" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "2 Kings 21:2", explanation: "Manasseh led Judah astray." },
  { id: "2kings69", question: "Who followed Manasseh?", options: [{ label: "A", text: "Josiah" }, { label: "B", text: "Amon" }, { label: "C", text: "Jehoahaz" }, { label: "D", text: "Jehoiakim" }], correctAnswer: "B", verse: "2 Kings 21:19", explanation: "Amon continued evil briefly." },
  { id: "2kings70", question: "Who became king after Amon?", options: [{ label: "A", text: "Hezekiah" }, { label: "B", text: "Josiah" }, { label: "C", text: "Jehoahaz" }, { label: "D", text: "Manasseh" }], correctAnswer: "B", verse: "2 Kings 22:1", explanation: "Josiah brought reform." },
  { id: "2kings71", question: "What was found during temple repairs?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Book of the Law" }, { label: "C", text: "Ark" }, { label: "D", text: "Scrolls" }], correctAnswer: "B", verse: "2 Kings 22:8", explanation: "God's word was rediscovered." },
  { id: "2kings72", question: "How did Josiah respond?", options: [{ label: "A", text: "Ignored it" }, { label: "B", text: "Tore his clothes" }, { label: "C", text: "Celebrated" }, { label: "D", text: "Destroyed it" }], correctAnswer: "B", verse: "2 Kings 22:11", explanation: "True repentance followed God's word." },
  { id: "2kings73", question: "Which prophetess spoke to Josiah?", options: [{ label: "A", text: "Deborah" }, { label: "B", text: "Huldah" }, { label: "C", text: "Miriam" }, { label: "D", text: "Anna" }], correctAnswer: "B", verse: "2 Kings 22:14", explanation: "God spoke through Huldah." },
  { id: "2kings74", question: "What reforms did Josiah make?", options: [{ label: "A", text: "Destroyed idols" }, { label: "B", text: "Renewed covenant" }, { label: "C", text: "Restored Passover" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "2 Kings 23", explanation: "Josiah led nationwide reform." },
  { id: "2kings75", question: "What happened despite Josiah's reform?", options: [{ label: "A", text: "Peace forever" }, { label: "B", text: "Judgment delayed but not canceled" }, { label: "C", text: "Exile ended" }, { label: "D", text: "Prosperity increased" }], correctAnswer: "B", verse: "2 Kings 23:26", explanation: "Sin had lasting consequences." },
  { id: "2kings76", question: "How did Josiah die?", options: [{ label: "A", text: "Old age" }, { label: "B", text: "Battle" }, { label: "C", text: "Assassination" }, { label: "D", text: "Illness" }], correctAnswer: "B", verse: "2 Kings 23:29", explanation: "Josiah died fighting Egypt." },
  { id: "2kings77", question: "Who ruled Judah after Josiah?", options: [{ label: "A", text: "Jehoahaz" }, { label: "B", text: "Jehoiakim" }, { label: "C", text: "Zedekiah" }, { label: "D", text: "All of them" }], correctAnswer: "D", verse: "2 Kings 23-24", explanation: "Rapid decline followed." },
  { id: "2kings78", question: "Which empire conquered Judah?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "2 Kings 24:1", explanation: "Babylon rose to power." },
  { id: "2kings79", question: "Who was Judah's final king?", options: [{ label: "A", text: "Jehoiakim" }, { label: "B", text: "Jehoiachin" }, { label: "C", text: "Zedekiah" }, { label: "D", text: "Josiah" }], correctAnswer: "C", verse: "2 Kings 24:18", explanation: "Zedekiah reigned last." },
  { id: "2kings80", question: "What did Babylon do to Jerusalem?", options: [{ label: "A", text: "Spared it" }, { label: "B", text: "Destroyed the city and temple" }, { label: "C", text: "Occupied only" }, { label: "D", text: "Converted it" }], correctAnswer: "B", verse: "2 Kings 25:9", explanation: "Judgment fell completely." },
  { id: "2kings81", question: "What happened to Zedekiah's sons?", options: [{ label: "A", text: "Exiled" }, { label: "B", text: "Killed" }, { label: "C", text: "Escaped" }, { label: "D", text: "Crowned" }], correctAnswer: "B", verse: "2 Kings 25:7", explanation: "Babylon punished rebellion." },
  { id: "2kings82", question: "What happened to Zedekiah?", options: [{ label: "A", text: "Exile only" }, { label: "B", text: "Blinded and imprisoned" }, { label: "C", text: "Killed" }, { label: "D", text: "Escaped" }], correctAnswer: "B", verse: "2 Kings 25:7", explanation: "Judgment was severe." },
  { id: "2kings83", question: "Who was left in the land?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Poor people" }, { label: "C", text: "Priests" }, { label: "D", text: "Soldiers" }], correctAnswer: "B", verse: "2 Kings 25:12", explanation: "The land was humbled." },
  { id: "2kings84", question: "Who governed Judah under Babylon?", options: [{ label: "A", text: "Daniel" }, { label: "B", text: "Gedaliah" }, { label: "C", text: "Zerubbabel" }, { label: "D", text: "Nehemiah" }], correctAnswer: "B", verse: "2 Kings 25:22", explanation: "Gedaliah led briefly." },
  { id: "2kings85", question: "What happened to Gedaliah?", options: [{ label: "A", text: "He ruled well" }, { label: "B", text: "He was assassinated" }, { label: "C", text: "He repented" }, { label: "D", text: "He fled" }], correctAnswer: "B", verse: "2 Kings 25:25", explanation: "Violence continued." },
  { id: "2kings86", question: "Where did survivors flee?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "C", verse: "2 Kings 25:26", explanation: "Fear led them to Egypt." },
  { id: "2kings87", question: "Who was released from prison in Babylon?", options: [{ label: "A", text: "Zedekiah" }, { label: "B", text: "Jehoiachin" }, { label: "C", text: "Daniel" }, { label: "D", text: "Gedaliah" }], correctAnswer: "B", verse: "2 Kings 25:27", explanation: "Hope remained." },
  { id: "2kings88", question: "What honor was given to Jehoiachin?", options: [{ label: "A", text: "Return home" }, { label: "B", text: "Royal table" }, { label: "C", text: "Kingship" }, { label: "D", text: "Temple access" }], correctAnswer: "B", verse: "2 Kings 25:29", explanation: "God preserved David's line." },
  { id: "2kings89", question: "What theme dominates 2 Kings?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Decline due to disobedience" }, { label: "C", text: "Prosperity" }, { label: "D", text: "Expansion" }], correctAnswer: "B", verse: "2 Kings 17", explanation: "Disobedience led to exile." },
  { id: "2kings90", question: "Why did Israel fall?", options: [{ label: "A", text: "Military weakness" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Foreign invasion only" }, { label: "D", text: "Leadership failure only" }], correctAnswer: "B", verse: "2 Kings 17:7-23", explanation: "Persistent idolatry brought judgment." },
  { id: "2kings91", question: "What preserved hope?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Prophets" }, { label: "C", text: "God's covenant" }, { label: "D", text: "Temple" }], correctAnswer: "C", verse: "2 Kings 25:27-30", explanation: "God remained faithful." },
  { id: "2kings92", question: "Who exemplified faith during crisis?", options: [{ label: "A", text: "Manasseh" }, { label: "B", text: "Hezekiah" }, { label: "C", text: "Ahab" }, { label: "D", text: "Zedekiah" }], correctAnswer: "B", verse: "2 Kings 19", explanation: "Faith brought deliverance." },
  { id: "2kings93", question: "What role did prophets play?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Entertainment" }, { label: "C", text: "Calling to repentance" }, { label: "D", text: "Politics" }], correctAnswer: "C", verse: "2 Kings 17", explanation: "God warned continually." },
  { id: "2kings94", question: "What lesson does exile teach?", options: [{ label: "A", text: "God abandons His people" }, { label: "B", text: "Obedience matters" }, { label: "C", text: "Kings fail" }, { label: "D", text: "Worship is optional" }], correctAnswer: "B", verse: "2 Kings 17", explanation: "Obedience brings life." },
  { id: "2kings95", question: "What hope closes the book?", options: [{ label: "A", text: "Return" }, { label: "B", text: "Davidic line continues" }, { label: "C", text: "Temple rebuilt" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "2 Kings 25:27-30", explanation: "God's promise endured." },
  { id: "2kings96", question: "What repeated sin led to judgment?", options: [{ label: "A", text: "War" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Pride" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "2 Kings 17", explanation: "Idolatry destroyed Israel." },
  { id: "2kings97", question: "What did faithful kings do differently?", options: [{ label: "A", text: "Built armies" }, { label: "B", text: "Trusted God" }, { label: "C", text: "Made treaties" }, { label: "D", text: "Collected wealth" }], correctAnswer: "B", verse: "2 Kings 18", explanation: "Trust defined success." },
  { id: "2kings98", question: "What central truth remains?", options: [{ label: "A", text: "Kings save nations" }, { label: "B", text: "God is sovereign" }, { label: "C", text: "People rule destiny" }, { label: "D", text: "Power wins" }], correctAnswer: "B", verse: "2 Kings 25", explanation: "God rules history." },
  { id: "2kings99", question: "What message did prophets repeat?", options: [{ label: "A", text: "Prosper" }, { label: "B", text: "Repent and return" }, { label: "C", text: "Fight harder" }, { label: "D", text: "Build temples" }], correctAnswer: "B", verse: "2 Kings 17", explanation: "God always called for repentance." },
  { id: "2kings100", question: "What does 2 Kings ultimately show?", options: [{ label: "A", text: "Failure of God" }, { label: "B", text: "Failure of leaders" }, { label: "C", text: "Faithfulness of God despite failure" }, { label: "D", text: "End of hope" }], correctAnswer: "C", verse: "2 Kings 25:27-30", explanation: "God remained faithful even in exile." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondKingsTriviaPage() {
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
          .eq("book", "2kings");

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
          book: "2kings",
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
            book: "2kings",
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
    if (score === 10) return "Perfect! You're a 2 Kings expert!";
    if (score >= 8) return "Excellent! You know 2 Kings well!";
    if (score >= 6) return "Good job! Keep studying 2 Kings!";
    if (score >= 4) return "Nice try! 2 Kings has much to explore!";
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
              href="/bible-trivia/2-kings"
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






