"use client";

import { useEffect, useState } from "react";
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
  { id: "ezra1", question: "Who issued the decree allowing Jews to return to Jerusalem?", options: [{ label: "A", text: "Nebuchadnezzar" }, { label: "B", text: "Darius" }, { label: "C", text: "Cyrus king of Persia" }, { label: "D", text: "Xerxes" }], correctAnswer: "C", verse: "Ezra 1:1", explanation: "God stirred the heart of Cyrus to fulfill prophecy." },
  { id: "ezra2", question: "What was the main purpose of the return from exile?", options: [{ label: "A", text: "Rebuild homes" }, { label: "B", text: "Rebuild the temple" }, { label: "C", text: "Form an army" }, { label: "D", text: "Establish trade" }], correctAnswer: "B", verse: "Ezra 1:3", explanation: "The focus was restoring worship through the temple." },
  { id: "ezra3", question: "Who led the first group of exiles back?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Nehemiah" }, { label: "C", text: "Zerubbabel" }, { label: "D", text: "Joshua" }], correctAnswer: "C", verse: "Ezra 2:2", explanation: "Zerubbabel led the first return." },
  { id: "ezra4", question: "What priest led alongside Zerubbabel?", options: [{ label: "A", text: "Eliashib" }, { label: "B", text: "Joshua" }, { label: "C", text: "Ezra" }, { label: "D", text: "Zadok" }], correctAnswer: "B", verse: "Ezra 3:2", explanation: "Joshua the high priest restored worship." },
  { id: "ezra5", question: "What was rebuilt first?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "Homes" }, { label: "C", text: "Altar" }, { label: "D", text: "Temple structure" }], correctAnswer: "C", verse: "Ezra 3:2-3", explanation: "Worship was restored before buildings." },
  { id: "ezra6", question: "What reaction followed the temple foundation?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Only joy" }, { label: "C", text: "Joy and weeping" }, { label: "D", text: "Fear" }], correctAnswer: "C", verse: "Ezra 3:12-13", explanation: "Older leaders remembered the former temple." },
  { id: "ezra7", question: "Who opposed the rebuilding?", options: [{ label: "A", text: "Babylonians" }, { label: "B", text: "Samaritans" }, { label: "C", text: "Persians" }, { label: "D", text: "Egyptians" }], correctAnswer: "B", verse: "Ezra 4:1-2", explanation: "Opposition arose from nearby peoples." },
  { id: "ezra8", question: "How did opponents attempt to stop the work?", options: [{ label: "A", text: "Military attack" }, { label: "B", text: "Letters to the king" }, { label: "C", text: "Economic pressure" }, { label: "D", text: "Religious arguments" }], correctAnswer: "B", verse: "Ezra 4:5", explanation: "They used political pressure." },
  { id: "ezra9", question: "Which king halted the work temporarily?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Artaxerxes" }, { label: "D", text: "Xerxes" }], correctAnswer: "C", verse: "Ezra 4:23-24", explanation: "The work stopped due to opposition." },
  { id: "ezra10", question: "Which prophets encouraged rebuilding?", options: [{ label: "A", text: "Isaiah and Jeremiah" }, { label: "B", text: "Haggai and Zechariah" }, { label: "C", text: "Ezekiel and Daniel" }, { label: "D", text: "Malachi and Joel" }], correctAnswer: "B", verse: "Ezra 5:1", explanation: "God used prophets to renew courage." },
  { id: "ezra11", question: "Who confirmed Cyrus's original decree?", options: [{ label: "A", text: "Artaxerxes" }, { label: "B", text: "Xerxes" }, { label: "C", text: "Darius" }, { label: "D", text: "Nebuchadnezzar" }], correctAnswer: "C", verse: "Ezra 6:1-3", explanation: "Darius supported the rebuilding." },
  { id: "ezra12", question: "Who paid for the temple expenses?", options: [{ label: "A", text: "The people only" }, { label: "B", text: "Persian treasury" }, { label: "C", text: "Priests" }, { label: "D", text: "Foreign allies" }], correctAnswer: "B", verse: "Ezra 6:8", explanation: "God provided through a pagan king." },
  { id: "ezra13", question: "When was the temple completed?", options: [{ label: "A", text: "Year 1 of Cyrus" }, { label: "B", text: "Year 6 of Darius" }, { label: "C", text: "Year 20 of Artaxerxes" }, { label: "D", text: "Year 10 of Xerxes" }], correctAnswer: "B", verse: "Ezra 6:15", explanation: "The work was finished after delays." },
  { id: "ezra14", question: "What feast was celebrated after completion?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "Booths" }, { label: "C", text: "Weeks" }, { label: "D", text: "Trumpets" }], correctAnswer: "A", verse: "Ezra 6:19", explanation: "Passover marked renewed identity." },
  { id: "ezra15", question: "Who is introduced in Ezra 7?", options: [{ label: "A", text: "Nehemiah" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "Ezra" }, { label: "D", text: "Joshua" }], correctAnswer: "C", verse: "Ezra 7:1", explanation: "Ezra enters later in the story." },
  { id: "ezra16", question: "What was Ezra's role?", options: [{ label: "A", text: "King" }, { label: "B", text: "Scribe and priest" }, { label: "C", text: "Builder" }, { label: "D", text: "General" }], correctAnswer: "B", verse: "Ezra 7:6", explanation: "Ezra was skilled in the Law." },
  { id: "ezra17", question: "What was Ezra devoted to?", options: [{ label: "A", text: "Politics" }, { label: "B", text: "Studying and teaching the Law" }, { label: "C", text: "Architecture" }, { label: "D", text: "Trade" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "Ezra modeled spiritual leadership." },
  { id: "ezra18", question: "Which king supported Ezra?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Artaxerxes" }, { label: "D", text: "Xerxes" }], correctAnswer: "C", verse: "Ezra 7:11", explanation: "Artaxerxes empowered Ezra." },
  { id: "ezra19", question: "What authority was given to Ezra?", options: [{ label: "A", text: "Military command" }, { label: "B", text: "Teaching and enforcing the Law" }, { label: "C", text: "Tax collection" }, { label: "D", text: "Temple construction" }], correctAnswer: "B", verse: "Ezra 7:25-26", explanation: "Ezra led spiritually." },
  { id: "ezra20", question: "Why did Ezra proclaim a fast?", options: [{ label: "A", text: "Mourning" }, { label: "B", text: "Protection for journey" }, { label: "C", text: "Festival" }, { label: "D", text: "Punishment" }], correctAnswer: "B", verse: "Ezra 8:21", explanation: "Ezra trusted God for safety." },
  { id: "ezra21", question: "What did Ezra refuse to request?", options: [{ label: "A", text: "Food" }, { label: "B", text: "Soldiers" }, { label: "C", text: "Money" }, { label: "D", text: "Animals" }], correctAnswer: "B", verse: "Ezra 8:22", explanation: "He relied on God's protection." },
  { id: "ezra22", question: "What problem did Ezra discover in Jerusalem?", options: [{ label: "A", text: "Poverty" }, { label: "B", text: "Intermarriage with foreign peoples" }, { label: "C", text: "Temple damage" }, { label: "D", text: "Military weakness" }], correctAnswer: "B", verse: "Ezra 9:1-2", explanation: "The people compromised spiritually." },
  { id: "ezra23", question: "How did Ezra respond to this sin?", options: [{ label: "A", text: "Ignored it" }, { label: "B", text: "Prayed and confessed" }, { label: "C", text: "Punished immediately" }, { label: "D", text: "Left Jerusalem" }], correctAnswer: "B", verse: "Ezra 9:5-6", explanation: "Ezra identified with the people." },
  { id: "ezra24", question: "What did Ezra tear in grief?", options: [{ label: "A", text: "Scrolls" }, { label: "B", text: "Robe and cloak" }, { label: "C", text: "Tent" }, { label: "D", text: "Altar cloth" }], correctAnswer: "B", verse: "Ezra 9:3", explanation: "Public sorrow showed repentance." },
  { id: "ezra25", question: "Who led the people in repentance?", options: [{ label: "A", text: "Nehemiah" }, { label: "B", text: "Shecaniah" }, { label: "C", text: "Zerubbabel" }, { label: "D", text: "Joshua" }], correctAnswer: "B", verse: "Ezra 10:2", explanation: "Shecaniah called for action." },
  { id: "ezra26", question: "What decision was made?", options: [{ label: "A", text: "Ignore the issue" }, { label: "B", text: "Separate from foreign wives" }, { label: "C", text: "Leave Jerusalem" }, { label: "D", text: "Rebuild walls" }], correctAnswer: "B", verse: "Ezra 10:3", explanation: "The people chose obedience." },
  { id: "ezra27", question: "How long did the reform process take?", options: [{ label: "A", text: "One day" }, { label: "B", text: "Three days" }, { label: "C", text: "Several months" }, { label: "D", text: "Years" }], correctAnswer: "C", verse: "Ezra 10:16-17", explanation: "The process was thorough." },
  { id: "ezra28", question: "What does Ezra emphasize over rebuilding walls?", options: [{ label: "A", text: "Defense" }, { label: "B", text: "Spiritual purity" }, { label: "C", text: "Politics" }, { label: "D", text: "Economy" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Spiritual reform came first." },
  { id: "ezra29", question: "What theme dominates Ezra?", options: [{ label: "A", text: "Military victory" }, { label: "B", text: "Restoration and obedience" }, { label: "C", text: "Kingship" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "Ezra overview", explanation: "God restores obedient people." },
  { id: "ezra30", question: "What shows God's sovereignty in Ezra?", options: [{ label: "A", text: "Israel's strength" }, { label: "B", text: "Foreign kings supporting God's plan" }, { label: "C", text: "Military success" }, { label: "D", text: "Temple size" }], correctAnswer: "B", verse: "Ezra 1, 6, 7", explanation: "God moves nations to fulfill His will." },
  { id: "ezra31", question: "Why are genealogies important in Ezra?", options: [{ label: "A", text: "Land ownership" }, { label: "B", text: "Proving priestly lineage" }, { label: "C", text: "Military rank" }, { label: "D", text: "Tax records" }], correctAnswer: "B", verse: "Ezra 2:62", explanation: "Priestly purity mattered." },
  { id: "ezra32", question: "What happened to priests without records?", options: [{ label: "A", text: "Exiled again" }, { label: "B", text: "Barred from priesthood" }, { label: "C", text: "Promoted" }, { label: "D", text: "Ignored" }], correctAnswer: "B", verse: "Ezra 2:62", explanation: "Holiness required proof." },
  { id: "ezra33", question: "What did the people give willingly?", options: [{ label: "A", text: "Land" }, { label: "B", text: "Offerings for the temple" }, { label: "C", text: "Weapons" }, { label: "D", text: "Labor only" }], correctAnswer: "B", verse: "Ezra 2:68-69", explanation: "Giving supported worship." },
  { id: "ezra34", question: "What caused discouragement?", options: [{ label: "A", text: "Lack of funds" }, { label: "B", text: "Opposition and comparison" }, { label: "C", text: "Famine" }, { label: "D", text: "Leadership disputes" }], correctAnswer: "B", verse: "Ezra 4", explanation: "Opposition slowed progress." },
  { id: "ezra35", question: "How did prophets help the people?", options: [{ label: "A", text: "Military advice" }, { label: "B", text: "Encouragement to obey" }, { label: "C", text: "Political strategy" }, { label: "D", text: "Financial aid" }], correctAnswer: "B", verse: "Ezra 5:1-2", explanation: "God's word restored courage." },
  { id: "ezra36", question: "What shows God's patience?", options: [{ label: "A", text: "Immediate success" }, { label: "B", text: "Delayed rebuilding" }, { label: "C", text: "Judgment" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezra 4-6", explanation: "God allowed time for repentance." },
  { id: "ezra37", question: "What confirmed God's promise?", options: [{ label: "A", text: "Temple size" }, { label: "B", text: "Cyrus's decree" }, { label: "C", text: "Military strength" }, { label: "D", text: "Population growth" }], correctAnswer: "B", verse: "Ezra 1:1", explanation: "Prophecy was fulfilled." },
  { id: "ezra38", question: "Why was Passover significant?", options: [{ label: "A", text: "Political unity" }, { label: "B", text: "Renewed covenant identity" }, { label: "C", text: "Economic growth" }, { label: "D", text: "Military victory" }], correctAnswer: "B", verse: "Ezra 6:21-22", explanation: "It marked spiritual renewal." },
  { id: "ezra39", question: "What phrase describes God's help?", options: [{ label: "A", text: "God's wrath" }, { label: "B", text: "The hand of the Lord" }, { label: "C", text: "Human effort" }, { label: "D", text: "Royal favor" }], correctAnswer: "B", verse: "Ezra 7:6", explanation: "God actively guided events." },
  { id: "ezra40", question: "What did Ezra teach?", options: [{ label: "A", text: "Traditions" }, { label: "B", text: "Law of Moses" }, { label: "C", text: "Politics" }, { label: "D", text: "Architecture" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "The Law shaped the community." },
  { id: "ezra41", question: "Why was fasting important?", options: [{ label: "A", text: "Punishment" }, { label: "B", text: "Humbling before God" }, { label: "C", text: "Tradition" }, { label: "D", text: "Celebration" }], correctAnswer: "B", verse: "Ezra 8:21", explanation: "Fasting expressed dependence." },
  { id: "ezra42", question: "What protected the travelers?", options: [{ label: "A", text: "Army" }, { label: "B", text: "God's hand" }, { label: "C", text: "Walls" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Ezra 8:31", explanation: "God guarded their journey." },
  { id: "ezra43", question: "What shocked Ezra most?", options: [{ label: "A", text: "Poverty" }, { label: "B", text: "Intermarriage" }, { label: "C", text: "Temple damage" }, { label: "D", text: "Opposition" }], correctAnswer: "B", verse: "Ezra 9:1", explanation: "Compromise threatened identity." },
  { id: "ezra44", question: "What did Ezra's prayer include?", options: [{ label: "A", text: "Blame" }, { label: "B", text: "Confession and humility" }, { label: "C", text: "Excuses" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Ezra 9:6-7", explanation: "He owned the nation's sin." },
  { id: "ezra45", question: "Why was separation required?", options: [{ label: "A", text: "Cultural purity" }, { label: "B", text: "Spiritual faithfulness" }, { label: "C", text: "Political safety" }, { label: "D", text: "Economic reasons" }], correctAnswer: "B", verse: "Ezra 10:11", explanation: "God called for holiness." },
  { id: "ezra46", question: "What leadership trait does Ezra model?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Humility and obedience" }, { label: "C", text: "Aggression" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Ezra led by example." },
  { id: "ezra47", question: "What does Ezra prioritize over speed?", options: [{ label: "A", text: "Efficiency" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Results" }, { label: "D", text: "Growth" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Obedience mattered more than quick fixes." },
  { id: "ezra48", question: "What shows community responsibility?", options: [{ label: "A", text: "Individual confession" }, { label: "B", text: "Corporate repentance" }, { label: "C", text: "Silence" }, { label: "D", text: "Leadership only" }], correctAnswer: "B", verse: "Ezra 10:1", explanation: "The people acted together." },
  { id: "ezra49", question: "Why is the Law central?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Guidance for restored life" }, { label: "C", text: "Control" }, { label: "D", text: "Punishment" }], correctAnswer: "B", verse: "Ezra 7-10", explanation: "The Law shaped obedience." },
  { id: "ezra50", question: "What connects Ezra and Nehemiah?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "Post-exile restoration" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Military campaigns" }], correctAnswer: "B", verse: "Ezra-Nehemiah context", explanation: "Both rebuild God's people." },
  { id: "ezra51", question: "What threat followed compromise?", options: [{ label: "A", text: "Exile again" }, { label: "B", text: "Loss of identity" }, { label: "C", text: "Economic failure" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Ezra 9", explanation: "Identity was at risk." },
  { id: "ezra52", question: "What does God value in leaders?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Faithfulness to His Word" }, { label: "C", text: "Popularity" }, { label: "D", text: "Skill" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "God honors obedience." },
  { id: "ezra53", question: "Why was reform painful?", options: [{ label: "A", text: "Political backlash" }, { label: "B", text: "Personal cost" }, { label: "C", text: "Economic loss" }, { label: "D", text: "Time pressure" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Obedience required sacrifice." },
  { id: "ezra54", question: "What sustained the people?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "God's promises" }, { label: "C", text: "Wealth" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Ezra overall", explanation: "God remained faithful." },
  { id: "ezra55", question: "What does Ezra teach about revival?", options: [{ label: "A", text: "Emotion first" }, { label: "B", text: "God's Word first" }, { label: "C", text: "Music first" }, { label: "D", text: "Buildings first" }], correctAnswer: "B", verse: "Ezra 7-10", explanation: "Revival begins with Scripture." },
  { id: "ezra56", question: "What role did repentance play?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Central" }, { label: "C", text: "Symbolic" }, { label: "D", text: "Political" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Repentance restored relationship." },
  { id: "ezra57", question: "What does Ezra show about God?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Faithful and involved" }, { label: "C", text: "Harsh" }, { label: "D", text: "Unchanging only" }], correctAnswer: "B", verse: "Ezra overview", explanation: "God guides restoration." },
  { id: "ezra58", question: "What lasting impact did Ezra have?", options: [{ label: "A", text: "Military strength" }, { label: "B", text: "Scriptural foundation" }, { label: "C", text: "Political unity" }, { label: "D", text: "Economic growth" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "The Law shaped future generations." },
  { id: "ezra59", question: "What defines success in Ezra?", options: [{ label: "A", text: "Speed" }, { label: "B", text: "Obedience" }, { label: "C", text: "Growth" }, { label: "D", text: "Security" }], correctAnswer: "B", verse: "Ezra themes", explanation: "Faithfulness mattered most." },
  { id: "ezra60", question: "What message does Ezra leave?", options: [{ label: "A", text: "Rebuild quickly" }, { label: "B", text: "Remain holy" }, { label: "C", text: "Avoid nations" }, { label: "D", text: "Seek power" }], correctAnswer: "B", verse: "Ezra overall", explanation: "Holiness preserves identity." },
  { id: "ezra61", question: "What does God use foreign kings for?", options: [{ label: "A", text: "Oppression only" }, { label: "B", text: "Fulfilling His purposes" }, { label: "C", text: "Punishment only" }, { label: "D", text: "Random events" }], correctAnswer: "B", verse: "Ezra 1:1", explanation: "God rules over nations." },
  { id: "ezra62", question: "What restored worship required?", options: [{ label: "A", text: "Buildings only" }, { label: "B", text: "Right hearts" }, { label: "C", text: "Money" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Ezra 3", explanation: "Worship begins with devotion." },
  { id: "ezra63", question: "Why was delay not failure?", options: [{ label: "A", text: "God abandoned them" }, { label: "B", text: "God worked through waiting" }, { label: "C", text: "People gave up" }, { label: "D", text: "Opposition won" }], correctAnswer: "B", verse: "Ezra 4-6", explanation: "God's timing prevailed." },
  { id: "ezra64", question: "What unified the returnees?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Shared faith" }, { label: "C", text: "Politics" }, { label: "D", text: "Economy" }], correctAnswer: "B", verse: "Ezra 3", explanation: "Faith bound the community." },
  { id: "ezra65", question: "What danger followed success?", options: [{ label: "A", text: "Attack" }, { label: "B", text: "Compromise" }, { label: "C", text: "Pride" }, { label: "D", text: "Exhaustion" }], correctAnswer: "B", verse: "Ezra 9", explanation: "Compromise threatened holiness." },
  { id: "ezra66", question: "What corrects compromise?", options: [{ label: "A", text: "Punishment" }, { label: "B", text: "God's Word" }, { label: "C", text: "Isolation" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "Ezra 7-10", explanation: "Scripture realigns hearts." },
  { id: "ezra67", question: "What leadership style does Ezra show?", options: [{ label: "A", text: "Forceful" }, { label: "B", text: "Word-centered" }, { label: "C", text: "Political" }, { label: "D", text: "Passive" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "Leadership flowed from Scripture." },
  { id: "ezra68", question: "What does true repentance include?", options: [{ label: "A", text: "Words only" }, { label: "B", text: "Action" }, { label: "C", text: "Emotion only" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Repentance changes behavior." },
  { id: "ezra69", question: "Why was holiness urgent?", options: [{ label: "A", text: "Temple rebuilt" }, { label: "B", text: "Identity at stake" }, { label: "C", text: "Political pressure" }, { label: "D", text: "Fear of exile" }], correctAnswer: "B", verse: "Ezra 9", explanation: "Compromise threatened survival." },
  { id: "ezra70", question: "What sustained reform?", options: [{ label: "A", text: "Rules" }, { label: "B", text: "Commitment to God" }, { label: "C", text: "Fear" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Obedience required resolve." },
  { id: "ezra71", question: "What shows God's mercy?", options: [{ label: "A", text: "Judgment delayed" }, { label: "B", text: "Opportunity to repent" }, { label: "C", text: "Wealth" }, { label: "D", text: "Protection" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "God allowed restoration." },
  { id: "ezra72", question: "Why was teaching essential?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Long-term faithfulness" }, { label: "C", text: "Uniformity" }, { label: "D", text: "Speed" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "Teaching sustained obedience." },
  { id: "ezra73", question: "What does Ezra show about revival?", options: [{ label: "A", text: "It is instant" }, { label: "B", text: "It is costly" }, { label: "C", text: "It avoids pain" }, { label: "D", text: "It is emotional only" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Revival requires sacrifice." },
  { id: "ezra74", question: "What role did confession play?", options: [{ label: "A", text: "Minor" }, { label: "B", text: "Foundational" }, { label: "C", text: "Optional" }, { label: "D", text: "Symbolic" }], correctAnswer: "B", verse: "Ezra 9", explanation: "Confession preceded change." },
  { id: "ezra75", question: "What preserved Israel after exile?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "God's Word" }, { label: "C", text: "Kings" }, { label: "D", text: "Army" }], correctAnswer: "B", verse: "Ezra overall", explanation: "Scripture anchored the people." },
  { id: "ezra76", question: "What does obedience bring?", options: [{ label: "A", text: "Ease" }, { label: "B", text: "Restoration" }, { label: "C", text: "Wealth" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Ezra themes", explanation: "God restores the obedient." },
  { id: "ezra77", question: "Why is Ezra important historically?", options: [{ label: "A", text: "Military leader" }, { label: "B", text: "Shaped post-exile faith" }, { label: "C", text: "King" }, { label: "D", text: "Prophet only" }], correctAnswer: "B", verse: "Ezra context", explanation: "Ezra shaped Jewish identity." },
  { id: "ezra78", question: "What connects Ezra to later Judaism?", options: [{ label: "A", text: "Temple size" }, { label: "B", text: "Centrality of Scripture" }, { label: "C", text: "Political rule" }, { label: "D", text: "Military focus" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "Scripture became central." },
  { id: "ezra79", question: "What lesson does opposition teach?", options: [{ label: "A", text: "Quit" }, { label: "B", text: "Persevere in obedience" }, { label: "C", text: "Compromise" }, { label: "D", text: "Fight back" }], correctAnswer: "B", verse: "Ezra 4-6", explanation: "God honors perseverance." },
  { id: "ezra80", question: "What shows God's faithfulness?", options: [{ label: "A", text: "No opposition" }, { label: "B", text: "Completion despite delays" }, { label: "C", text: "Perfect people" }, { label: "D", text: "Strong army" }], correctAnswer: "B", verse: "Ezra 6", explanation: "God completed His work." },
  { id: "ezra81", question: "Why did God allow exile earlier?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Disobedience" }, { label: "C", text: "Politics" }, { label: "D", text: "Randomness" }], correctAnswer: "B", verse: "Ezra context", explanation: "Exile followed rebellion." },
  { id: "ezra82", question: "What makes restoration possible?", options: [{ label: "A", text: "Effort" }, { label: "B", text: "God's grace" }, { label: "C", text: "Kings" }, { label: "D", text: "Law alone" }], correctAnswer: "B", verse: "Ezra overall", explanation: "Grace opens the way back." },
  { id: "ezra83", question: "What must follow rebuilding?", options: [{ label: "A", text: "Celebration only" }, { label: "B", text: "Reform of life" }, { label: "C", text: "Expansion" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Life must match worship." },
  { id: "ezra84", question: "What kind of revival does Ezra show?", options: [{ label: "A", text: "Emotional" }, { label: "B", text: "Word-centered" }, { label: "C", text: "Political" }, { label: "D", text: "Military" }], correctAnswer: "B", verse: "Ezra 7-10", explanation: "God's Word leads revival." },
  { id: "ezra85", question: "What defines true leadership?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Faithfulness to God" }, { label: "C", text: "Influence" }, { label: "D", text: "Results" }], correctAnswer: "B", verse: "Ezra themes", explanation: "Faithfulness matters most." },
  { id: "ezra86", question: "What danger always follows restoration?", options: [{ label: "A", text: "War" }, { label: "B", text: "Complacency" }, { label: "C", text: "Growth" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "Ezra 9", explanation: "Complacency leads to compromise." },
  { id: "ezra87", question: "What does Ezra teach about identity?", options: [{ label: "A", text: "Cultural" }, { label: "B", text: "Spiritual" }, { label: "C", text: "Political" }, { label: "D", text: "Ethnic only" }], correctAnswer: "B", verse: "Ezra overall", explanation: "Identity flows from covenant." },
  { id: "ezra88", question: "Why was obedience urgent?", options: [{ label: "A", text: "Time limit" }, { label: "B", text: "Future generations" }, { label: "C", text: "Political pressure" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Future faith depended on obedience." },
  { id: "ezra89", question: "What lasting foundation was laid?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "Scriptural obedience" }, { label: "C", text: "Kingship" }, { label: "D", text: "Military power" }], correctAnswer: "B", verse: "Ezra 7-10", explanation: "Scripture shaped the community." },
  { id: "ezra90", question: "What does Ezra emphasize more than comfort?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Holiness" }, { label: "C", text: "Security" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Ezra themes", explanation: "Holiness preserves God's people." },
  { id: "ezra91", question: "What message would Ezra give today?", options: [{ label: "A", text: "Rebuild fast" }, { label: "B", text: "Return to God's Word" }, { label: "C", text: "Avoid culture" }, { label: "D", text: "Seek power" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "God's Word leads renewal." },
  { id: "ezra92", question: "What does Ezra show about grace?", options: [{ label: "A", text: "It ignores sin" }, { label: "B", text: "It restores the repentant" }, { label: "C", text: "It ends obedience" }, { label: "D", text: "It avoids discipline" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Grace invites repentance." },
  { id: "ezra93", question: "What did rebuilding the temple symbolize?", options: [{ label: "A", text: "Power" }, { label: "B", text: "God dwelling among His people" }, { label: "C", text: "Economic recovery" }, { label: "D", text: "Political freedom" }], correctAnswer: "B", verse: "Ezra 3", explanation: "God restored His presence." },
  { id: "ezra94", question: "Why was obedience non-negotiable?", options: [{ label: "A", text: "Law demanded it" }, { label: "B", text: "Covenant required it" }, { label: "C", text: "Kings enforced it" }, { label: "D", text: "Culture expected it" }], correctAnswer: "B", verse: "Ezra themes", explanation: "Covenant faithfulness mattered." },
  { id: "ezra95", question: "What does Ezra reveal about God's character?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Faithful and patient" }, { label: "C", text: "Harsh" }, { label: "D", text: "Uninvolved" }], correctAnswer: "B", verse: "Ezra overall", explanation: "God patiently restores." },
  { id: "ezra96", question: "Why does restoration require effort?", options: [{ label: "A", text: "God is absent" }, { label: "B", text: "Obedience costs something" }, { label: "C", text: "People resist change" }, { label: "D", text: "Opposition exists" }], correctAnswer: "B", verse: "Ezra 10", explanation: "Faithfulness requires sacrifice." },
  { id: "ezra97", question: "What did Ezra prioritize over unity?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Truth" }, { label: "C", text: "Comfort" }, { label: "D", text: "Speed" }], correctAnswer: "B", verse: "Ezra 9-10", explanation: "Truth guided reform." },
  { id: "ezra98", question: "What legacy did Ezra leave?", options: [{ label: "A", text: "Political reform" }, { label: "B", text: "Scripture-centered faith" }, { label: "C", text: "Strong walls" }, { label: "D", text: "Military defense" }], correctAnswer: "B", verse: "Ezra 7:10", explanation: "Faith was grounded in God's Word." },
  { id: "ezra99", question: "What does Ezra teach about revival timing?", options: [{ label: "A", text: "Immediate" }, { label: "B", text: "Process-oriented" }, { label: "C", text: "Random" }, { label: "D", text: "Short-lived" }], correctAnswer: "B", verse: "Ezra 1-10", explanation: "Revival unfolds over time." },
  { id: "ezra100", question: "What is the ultimate message of Ezra?", options: [{ label: "A", text: "Rebuild structures" }, { label: "B", text: "Return to God with obedience" }, { label: "C", text: "Avoid the world" }, { label: "D", text: "Trust kings" }], correctAnswer: "B", verse: "Ezra overall", explanation: "God restores those who return to Him." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EzraTriviaPage() {
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
          .eq("book", "ezra");

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
          book: "ezra",
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
            book: "ezra",
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
    if (score === 10) return "Perfect! You're an Ezra expert!";
    if (score >= 8) return "Excellent! You know Ezra well!";
    if (score >= 6) return "Good job! Keep studying Ezra!";
    if (score >= 4) return "Nice try! Ezra has much to explore!";
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
              href="/bible-trivia/ezra"
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

