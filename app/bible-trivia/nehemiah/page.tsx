"use client";

import { useEffect, useState } from "react";
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
  { id: "nehemiah1", question: "Who is the main figure in the book of Nehemiah?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "Nehemiah" }, { label: "D", text: "Joshua" }], correctAnswer: "C", verse: "Nehemiah 1:1", explanation: "Nehemiah is the central leader in rebuilding Jerusalem's walls." },
  { id: "nehemiah2", question: "What position did Nehemiah hold in Persia?", options: [{ label: "A", text: "Governor" }, { label: "B", text: "General" }, { label: "C", text: "Cupbearer to the king" }, { label: "D", text: "Priest" }], correctAnswer: "C", verse: "Nehemiah 1:11", explanation: "Nehemiah served as cupbearer to King Artaxerxes." },
  { id: "nehemiah3", question: "What news distressed Nehemiah?", options: [{ label: "A", text: "Temple destruction" }, { label: "B", text: "People still in exile" }, { label: "C", text: "Jerusalem's broken walls" }, { label: "D", text: "Persian invasion" }], correctAnswer: "C", verse: "Nehemiah 1:3", explanation: "The walls of Jerusalem were still in ruins." },
  { id: "nehemiah4", question: "How did Nehemiah initially respond to the news?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Prayer and fasting" }, { label: "C", text: "Immediate travel" }, { label: "D", text: "Complaint" }], correctAnswer: "B", verse: "Nehemiah 1:4", explanation: "Nehemiah sought God before acting." },
  { id: "nehemiah5", question: "Which king allowed Nehemiah to return to Jerusalem?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Artaxerxes" }, { label: "D", text: "Xerxes" }], correctAnswer: "C", verse: "Nehemiah 2:1", explanation: "Artaxerxes granted Nehemiah permission." },
  { id: "nehemiah6", question: "What did Nehemiah request from the king?", options: [{ label: "A", text: "Money only" }, { label: "B", text: "Letters and timber" }, { label: "C", text: "An army" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Nehemiah 2:7-8", explanation: "The king supplied resources for rebuilding." },
  { id: "nehemiah7", question: "How did Nehemiah inspect the walls?", options: [{ label: "A", text: "With soldiers" }, { label: "B", text: "By day publicly" }, { label: "C", text: "At night secretly" }, { label: "D", text: "Through reports" }], correctAnswer: "C", verse: "Nehemiah 2:12-15", explanation: "Nehemiah assessed the damage quietly." },
  { id: "nehemiah8", question: "Who opposed Nehemiah early?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Sanballat and Tobiah" }, { label: "C", text: "Zerubbabel" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Nehemiah 2:19", explanation: "Opposition arose immediately." },
  { id: "nehemiah9", question: "What did Nehemiah say motivated the people?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "The king's command" }, { label: "C", text: "The hand of God" }, { label: "D", text: "Profit" }], correctAnswer: "C", verse: "Nehemiah 2:18", explanation: "God's favor inspired the work." },
  { id: "nehemiah10", question: "Who rebuilt sections of the wall?", options: [{ label: "A", text: "Only soldiers" }, { label: "B", text: "Only priests" }, { label: "C", text: "Families and groups" }, { label: "D", text: "Foreign workers" }], correctAnswer: "C", verse: "Nehemiah 3", explanation: "The work was shared by the community." },
  { id: "nehemiah11", question: "What tactic did enemies use to discourage builders?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Mockery" }, { label: "C", text: "Trade sanctions" }, { label: "D", text: "Bribery" }], correctAnswer: "B", verse: "Nehemiah 4:1-3", explanation: "Ridicule aimed to weaken morale." },
  { id: "nehemiah12", question: "How did Nehemiah respond to mockery?", options: [{ label: "A", text: "Retaliation" }, { label: "B", text: "Prayer" }, { label: "C", text: "Negotiation" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "Nehemiah 4:4-5", explanation: "Nehemiah brought opposition to God." },
  { id: "nehemiah13", question: "What threat followed mockery?", options: [{ label: "A", text: "Legal action" }, { label: "B", text: "Military attack" }, { label: "C", text: "Economic pressure" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nehemiah 4:7-8", explanation: "Enemies planned violence." },
  { id: "nehemiah14", question: "How did workers protect themselves?", options: [{ label: "A", text: "Hid" }, { label: "B", text: "Worked with weapons" }, { label: "C", text: "Stopped building" }, { label: "D", text: "Relied on guards only" }], correctAnswer: "B", verse: "Nehemiah 4:17-18", explanation: "They worked and stayed alert." },
  { id: "nehemiah15", question: "What phrase describes the people's attitude?", options: [{ label: "A", text: "Fearful hearts" }, { label: "B", text: "Mind to work" }, { label: "C", text: "Broken spirits" }, { label: "D", text: "Divided focus" }], correctAnswer: "B", verse: "Nehemiah 4:6", explanation: "The people were committed." },
  { id: "nehemiah16", question: "What internal problem arose among the Jews?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Economic exploitation" }, { label: "C", text: "False prophecy" }, { label: "D", text: "Intermarriage" }], correctAnswer: "B", verse: "Nehemiah 5:1-5", explanation: "The poor were oppressed." },
  { id: "nehemiah17", question: "How did Nehemiah respond to injustice?", options: [{ label: "A", text: "Ignored it" }, { label: "B", text: "Confronted leaders" }, { label: "C", text: "Resigned" }, { label: "D", text: "Asked the king" }], correctAnswer: "B", verse: "Nehemiah 5:6-7", explanation: "Nehemiah demanded reform." },
  { id: "nehemiah18", question: "What did Nehemiah refuse as governor?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Food allowance" }, { label: "C", text: "Protection" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Nehemiah 5:14-18", explanation: "He led sacrificially." },
  { id: "nehemiah19", question: "What tactic did enemies try next?", options: [{ label: "A", text: "Bribery" }, { label: "B", text: "Deception and distraction" }, { label: "C", text: "War" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Nehemiah 6:1-4", explanation: "They tried to lure Nehemiah away." },
  { id: "nehemiah20", question: "How did Nehemiah respond to distraction?", options: [{ label: "A", text: "Negotiated" }, { label: "B", text: "Ignored them" }, { label: "C", text: "Stopped work" }, { label: "D", text: "Left the city" }], correctAnswer: "B", verse: "Nehemiah 6:3", explanation: "He stayed focused on God's work." },
  { id: "nehemiah21", question: "What false accusation was made?", options: [{ label: "A", text: "Greed" }, { label: "B", text: "Rebellion against the king" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Blasphemy" }], correctAnswer: "B", verse: "Nehemiah 6:6-7", explanation: "Enemies tried to intimidate Nehemiah." },
  { id: "nehemiah22", question: "Who tried to frighten Nehemiah with prophecy?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Shemaiah" }, { label: "C", text: "Tobiah" }, { label: "D", text: "Sanballat" }], correctAnswer: "B", verse: "Nehemiah 6:10-12", explanation: "False prophecy aimed to stop the work." },
  { id: "nehemiah23", question: "How long did the wall take to complete?", options: [{ label: "A", text: "40 days" }, { label: "B", text: "52 days" }, { label: "C", text: "70 days" }, { label: "D", text: "One year" }], correctAnswer: "B", verse: "Nehemiah 6:15", explanation: "The wall was finished quickly." },
  { id: "nehemiah24", question: "What did enemies realize after completion?", options: [{ label: "A", text: "They were stronger" }, { label: "B", text: "God helped the work" }, { label: "C", text: "The wall was weak" }, { label: "D", text: "They could still attack" }], correctAnswer: "B", verse: "Nehemiah 6:16", explanation: "God's power was evident." },
  { id: "nehemiah25", question: "What book follows the wall's completion?", options: [{ label: "A", text: "Law reading" }, { label: "B", text: "Census" }, { label: "C", text: "War" }, { label: "D", text: "Celebration only" }], correctAnswer: "A", verse: "Nehemiah 8", explanation: "Spiritual renewal followed physical rebuilding." },
  { id: "nehemiah26", question: "Who read the Law publicly?", options: [{ label: "A", text: "Nehemiah" }, { label: "B", text: "Ezra" }, { label: "C", text: "Priests" }, { label: "D", text: "Levites only" }], correctAnswer: "B", verse: "Nehemiah 8:1-3", explanation: "Ezra proclaimed the Law." },
  { id: "nehemiah27", question: "How did the people react to the Law?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Weeping" }, { label: "C", text: "Indifference" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Nehemiah 8:9", explanation: "The Word convicted them." },
  { id: "nehemiah28", question: "What instruction was given instead of mourning?", options: [{ label: "A", text: "Fast" }, { label: "B", text: "Celebrate and rejoice" }, { label: "C", text: "Build more" }, { label: "D", text: "Pray silently" }], correctAnswer: "B", verse: "Nehemiah 8:10", explanation: "Joy in the Lord was emphasized." },
  { id: "nehemiah29", question: "What feast was celebrated?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "Booths" }, { label: "C", text: "Weeks" }, { label: "D", text: "Trumpets" }], correctAnswer: "B", verse: "Nehemiah 8:14-15", explanation: "They obeyed Scripture." },
  { id: "nehemiah30", question: "What theme dominates Nehemiah?", options: [{ label: "A", text: "Military power" }, { label: "B", text: "Restoration through obedience" }, { label: "C", text: "Kingship" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "God restores through faithful leadership." },
  { id: "nehemiah31", question: "What followed the reading of the Law?", options: [{ label: "A", text: "Celebration only" }, { label: "B", text: "Corporate confession" }, { label: "C", text: "War" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nehemiah 9:1-2", explanation: "The people confessed their sins." },
  { id: "nehemiah32", question: "What did the long prayer recount?", options: [{ label: "A", text: "Future prophecy" }, { label: "B", text: "Israel's history" }, { label: "C", text: "Temple design" }, { label: "D", text: "Wall strategy" }], correctAnswer: "B", verse: "Nehemiah 9", explanation: "God's faithfulness was remembered." },
  { id: "nehemiah33", question: "What covenant was renewed?", options: [{ label: "A", text: "Davidic" }, { label: "B", text: "Mosaic" }, { label: "C", text: "Abrahamic" }, { label: "D", text: "Priestly" }], correctAnswer: "B", verse: "Nehemiah 9:38", explanation: "The people pledged obedience." },
  { id: "nehemiah34", question: "What commitment did leaders sign?", options: [{ label: "A", text: "Military service" }, { label: "B", text: "Obedience to the Law" }, { label: "C", text: "Tax agreement" }, { label: "D", text: "Political loyalty" }], correctAnswer: "B", verse: "Nehemiah 10:29", explanation: "They vowed to follow God's Law." },
  { id: "nehemiah35", question: "What practice was renewed?", options: [{ label: "A", text: "Intermarriage" }, { label: "B", text: "Sabbath observance" }, { label: "C", text: "Trade" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Nehemiah 10:31", explanation: "They honored God's commands." },
  { id: "nehemiah36", question: "Why were people relocated to Jerusalem?", options: [{ label: "A", text: "Defense" }, { label: "B", text: "Population growth" }, { label: "C", text: "Economic reasons" }, { label: "D", text: "Taxation" }], correctAnswer: "B", verse: "Nehemiah 11:1-2", explanation: "Jerusalem needed residents." },
  { id: "nehemiah37", question: "What event marked the wall's dedication?", options: [{ label: "A", text: "Fasting" }, { label: "B", text: "Processions and singing" }, { label: "C", text: "Sacrifice only" }, { label: "D", text: "Military parade" }], correctAnswer: "B", verse: "Nehemiah 12:27-31", explanation: "Joyful worship marked dedication." },
  { id: "nehemiah38", question: "What could be heard far away?", options: [{ label: "A", text: "Trumpets" }, { label: "B", text: "Joyful praise" }, { label: "C", text: "Drums" }, { label: "D", text: "Shouting enemies" }], correctAnswer: "B", verse: "Nehemiah 12:43", explanation: "Joy overflowed from the city." },
  { id: "nehemiah39", question: "What did Nehemiah establish for the temple?", options: [{ label: "A", text: "Taxes" }, { label: "B", text: "Storehouses" }, { label: "C", text: "Guards" }, { label: "D", text: "New priests" }], correctAnswer: "B", verse: "Nehemiah 12:44", explanation: "Provision supported worship." },
  { id: "nehemiah40", question: "What book was read again later?", options: [{ label: "A", text: "Prophets" }, { label: "B", text: "Law of Moses" }, { label: "C", text: "Psalms" }, { label: "D", text: "Chronicles" }], correctAnswer: "B", verse: "Nehemiah 13:1", explanation: "Scripture continued guiding reform." },
  { id: "nehemiah41", question: "What problem returned after Nehemiah left?", options: [{ label: "A", text: "Wall damage" }, { label: "B", text: "Compromise and neglect" }, { label: "C", text: "War" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Reforms weakened without leadership." },
  { id: "nehemiah42", question: "Who misused temple space?", options: [{ label: "A", text: "Sanballat" }, { label: "B", text: "Tobiah" }, { label: "C", text: "Ezra" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Nehemiah 13:4-5", explanation: "Tobiah was given a room improperly." },
  { id: "nehemiah43", question: "How did Nehemiah respond?", options: [{ label: "A", text: "Ignored it" }, { label: "B", text: "Threw out Tobiah's belongings" }, { label: "C", text: "Prayed only" }, { label: "D", text: "Left Jerusalem" }], correctAnswer: "B", verse: "Nehemiah 13:8", explanation: "Nehemiah acted decisively." },
  { id: "nehemiah44", question: "What command was enforced again?", options: [{ label: "A", text: "Sacrifices" }, { label: "B", text: "Sabbath rest" }, { label: "C", text: "Fasting" }, { label: "D", text: "Pilgrimage" }], correctAnswer: "B", verse: "Nehemiah 13:15-18", explanation: "Sabbath observance was restored." },
  { id: "nehemiah45", question: "What recurring issue returned?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Intermarriage" }, { label: "C", text: "Poverty" }, { label: "D", text: "Wall breaches" }], correctAnswer: "B", verse: "Nehemiah 13:23", explanation: "Intermarriage resurfaced." },
  { id: "nehemiah46", question: "What was Nehemiah's reaction?", options: [{ label: "A", text: "Compromise" }, { label: "B", text: "Strong correction" }, { label: "C", text: "Delay" }, { label: "D", text: "Prayer only" }], correctAnswer: "B", verse: "Nehemiah 13:25", explanation: "Nehemiah enforced obedience." },
  { id: "nehemiah47", question: "What example did Nehemiah cite?", options: [{ label: "A", text: "David" }, { label: "B", text: "Solomon's failure" }, { label: "C", text: "Moses" }, { label: "D", text: "Ezra" }], correctAnswer: "B", verse: "Nehemiah 13:26", explanation: "Even Solomon fell through compromise." },
  { id: "nehemiah48", question: "What did Nehemiah cleanse?", options: [{ label: "A", text: "City" }, { label: "B", text: "Priesthood" }, { label: "C", text: "Treasury" }, { label: "D", text: "Army" }], correctAnswer: "B", verse: "Nehemiah 13:30", explanation: "Purity was restored." },
  { id: "nehemiah49", question: "What phrase closes Nehemiah?", options: [{ label: "A", text: "Praise God" }, { label: "B", text: "Remember me, O my God" }, { label: "C", text: "Fear the Lord" }, { label: "D", text: "Obey the Law" }], correctAnswer: "B", verse: "Nehemiah 13:31", explanation: "Nehemiah appeals to God's mercy." },
  { id: "nehemiah50", question: "What leadership trait defines Nehemiah?", options: [{ label: "A", text: "Diplomacy" }, { label: "B", text: "Prayerful action" }, { label: "C", text: "Silence" }, { label: "D", text: "Force" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "Nehemiah prayed and acted." },
  { id: "nehemiah51", question: "What happened immediately after the wall was finished?", options: [{ label: "A", text: "War broke out" }, { label: "B", text: "Enemies attacked" }, { label: "C", text: "Spiritual renewal began" }, { label: "D", text: "People returned to Persia" }], correctAnswer: "C", verse: "Nehemiah 8:1", explanation: "Physical restoration led to spiritual renewal." },
  { id: "nehemiah52", question: "What did the people ask Ezra to do?", options: [{ label: "A", text: "Offer sacrifices" }, { label: "B", text: "Explain the Law" }, { label: "C", text: "Lead the army" }, { label: "D", text: "Rebuild the temple" }], correctAnswer: "B", verse: "Nehemiah 8:1-2", explanation: "The people desired to hear God's Word." },
  { id: "nehemiah53", question: "How was the Law delivered to the people?", options: [{ label: "A", text: "Privately" }, { label: "B", text: "Read clearly and explained" }, { label: "C", text: "Only summarized" }, { label: "D", text: "Written only" }], correctAnswer: "B", verse: "Nehemiah 8:8", explanation: "Understanding the Word was essential." },
  { id: "nehemiah54", question: "Why did the leaders tell the people not to mourn?", options: [{ label: "A", text: "The work was done" }, { label: "B", text: "It was a holy day" }, { label: "C", text: "Enemies were near" }, { label: "D", text: "Food was scarce" }], correctAnswer: "B", verse: "Nehemiah 8:9-10", explanation: "The day was set apart for the Lord." },
  { id: "nehemiah55", question: "What phrase describes their strength?", options: [{ label: "A", text: "The wall of the Lord" }, { label: "B", text: "The joy of the Lord" }, { label: "C", text: "The fear of the Lord" }, { label: "D", text: "The power of unity" }], correctAnswer: "B", verse: "Nehemiah 8:10", explanation: "Joy rooted in God brought strength." },
  { id: "nehemiah56", question: "What action followed the celebration?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Confession and fasting" }, { label: "C", text: "More building" }, { label: "D", text: "Military patrols" }], correctAnswer: "B", verse: "Nehemiah 9:1", explanation: "Joy led into repentance." },
  { id: "nehemiah57", question: "What did the people separate themselves from?", options: [{ label: "A", text: "Foreign nations" }, { label: "B", text: "Foreign influences" }, { label: "C", text: "Trade routes" }, { label: "D", text: "Military alliances" }], correctAnswer: "B", verse: "Nehemiah 9:2", explanation: "They sought spiritual purity." },
  { id: "nehemiah58", question: "What dominated the long prayer in Nehemiah 9?", options: [{ label: "A", text: "Future plans" }, { label: "B", text: "Israel's repeated rebellion" }, { label: "C", text: "Military victories" }, { label: "D", text: "Wall construction" }], correctAnswer: "B", verse: "Nehemiah 9", explanation: "The prayer recounts God's faithfulness despite Israel's failures." },
  { id: "nehemiah59", question: "What attribute of God is emphasized in the prayer?", options: [{ label: "A", text: "Wrath" }, { label: "B", text: "Patience and mercy" }, { label: "C", text: "Silence" }, { label: "D", text: "Distance" }], correctAnswer: "B", verse: "Nehemiah 9:17", explanation: "God remained merciful through rebellion." },
  { id: "nehemiah60", question: "What decision concluded the confession?", options: [{ label: "A", text: "A military oath" }, { label: "B", text: "A written covenant" }, { label: "C", text: "A public fast" }, { label: "D", text: "A festival" }], correctAnswer: "B", verse: "Nehemiah 9:38", explanation: "The people formally committed to obedience." },
  { id: "nehemiah61", question: "What does rebuilding walls symbolize?", options: [{ label: "A", text: "Military strength" }, { label: "B", text: "Restored identity" }, { label: "C", text: "Economic growth" }, { label: "D", text: "Political power" }], correctAnswer: "B", verse: "Nehemiah 2-6", explanation: "The walls restored dignity and security." },
  { id: "nehemiah62", question: "What sustained the workers?", options: [{ label: "A", text: "Pay" }, { label: "B", text: "God's protection" }, { label: "C", text: "Weapons" }, { label: "D", text: "Leadership only" }], correctAnswer: "B", verse: "Nehemiah 4", explanation: "God sustained the effort." },
  { id: "nehemiah63", question: "What did opposition reveal?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Importance of the work" }, { label: "C", text: "Failure" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Nehemiah 4-6", explanation: "Opposition confirmed significance." },
  { id: "nehemiah64", question: "What protected unity?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Justice and fairness" }, { label: "C", text: "Weapons" }, { label: "D", text: "Rules" }], correctAnswer: "B", verse: "Nehemiah 5", explanation: "Justice preserved unity." },
  { id: "nehemiah65", question: "What role did prayer play?", options: [{ label: "A", text: "Occasional" }, { label: "B", text: "Continuous" }, { label: "C", text: "Minimal" }, { label: "D", text: "Ceremonial" }], correctAnswer: "B", verse: "Nehemiah 1-13", explanation: "Prayer undergirded every action." },
  { id: "nehemiah66", question: "Why was leadership crucial?", options: [{ label: "A", text: "Control people" }, { label: "B", text: "Guide obedience" }, { label: "C", text: "Enforce law" }, { label: "D", text: "Defeat enemies" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "Leadership directed reform." },
  { id: "nehemiah67", question: "What did Scripture bring?", options: [{ label: "A", text: "Division" }, { label: "B", text: "Conviction and joy" }, { label: "C", text: "Fear" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Nehemiah 8", explanation: "God's Word transformed hearts." },
  { id: "nehemiah68", question: "What followed conviction?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Repentance" }, { label: "C", text: "Celebration only" }, { label: "D", text: "Departure" }], correctAnswer: "B", verse: "Nehemiah 9", explanation: "Repentance followed understanding." },
  { id: "nehemiah69", question: "What sustained joy?", options: [{ label: "A", text: "Success" }, { label: "B", text: "The joy of the Lord" }, { label: "C", text: "Victory" }, { label: "D", text: "Rest" }], correctAnswer: "B", verse: "Nehemiah 8:10", explanation: "Joy came from God." },
  { id: "nehemiah70", question: "Why was covenant renewal necessary?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Prevent future compromise" }, { label: "C", text: "Political unity" }, { label: "D", text: "Economic reasons" }], correctAnswer: "B", verse: "Nehemiah 9-10", explanation: "Commitment guarded obedience." },
  { id: "nehemiah71", question: "What weakened reform?", options: [{ label: "A", text: "Opposition" }, { label: "B", text: "Leader absence" }, { label: "C", text: "Poverty" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Reform required ongoing leadership." },
  { id: "nehemiah72", question: "What danger always returns?", options: [{ label: "A", text: "Attack" }, { label: "B", text: "Compromise" }, { label: "C", text: "Fear" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Compromise creeps back in." },
  { id: "nehemiah73", question: "What does Nehemiah show about reform?", options: [{ label: "A", text: "It is temporary" }, { label: "B", text: "It requires vigilance" }, { label: "C", text: "It is automatic" }, { label: "D", text: "It avoids conflict" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Faithfulness must be guarded." },
  { id: "nehemiah74", question: "What defines success in Nehemiah?", options: [{ label: "A", text: "Wall height" }, { label: "B", text: "Obedience to God" }, { label: "C", text: "Enemy defeat" }, { label: "D", text: "Population growth" }], correctAnswer: "B", verse: "Nehemiah themes", explanation: "Obedience defines success." },
  { id: "nehemiah75", question: "What leadership balance is shown?", options: [{ label: "A", text: "Prayer and action" }, { label: "B", text: "Force and fear" }, { label: "C", text: "Silence and waiting" }, { label: "D", text: "Power and wealth" }], correctAnswer: "A", verse: "Nehemiah overview", explanation: "Prayer fueled decisive action." },
  { id: "nehemiah76", question: "What did Nehemiah value over comfort?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Security" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Nehemiah 5", explanation: "Nehemiah sacrificed comfort." },
  { id: "nehemiah77", question: "Why did enemies fear the wall?", options: [{ label: "A", text: "Height" }, { label: "B", text: "God's involvement" }, { label: "C", text: "Weapons" }, { label: "D", text: "Speed" }], correctAnswer: "B", verse: "Nehemiah 6:16", explanation: "God's hand was obvious." },
  { id: "nehemiah78", question: "What preserved Jerusalem long-term?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "God's Word" }, { label: "C", text: "Army" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Nehemiah 8-10", explanation: "Scripture anchored the people." },
  { id: "nehemiah79", question: "What is the cost of leadership?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Sacrifice" }, { label: "C", text: "Wealth" }, { label: "D", text: "Ease" }], correctAnswer: "B", verse: "Nehemiah 5", explanation: "Leadership required sacrifice." },
  { id: "nehemiah80", question: "Why is Nehemiah relevant today?", options: [{ label: "A", text: "Military lessons" }, { label: "B", text: "Leadership and reform" }, { label: "C", text: "Architecture" }, { label: "D", text: "Politics" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "The book models godly leadership." },
  { id: "nehemiah81", question: "What danger follows success?", options: [{ label: "A", text: "Attack" }, { label: "B", text: "Pride" }, { label: "C", text: "Complacency" }, { label: "D", text: "Fear" }], correctAnswer: "C", verse: "Nehemiah 13", explanation: "Success can breed neglect." },
  { id: "nehemiah82", question: "What does Nehemiah pray repeatedly?", options: [{ label: "A", text: "For victory" }, { label: "B", text: "Remember me, O God" }, { label: "C", text: "For wealth" }, { label: "D", text: "For peace" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Nehemiah appeals to God's faithfulness." },
  { id: "nehemiah83", question: "What sustained Nehemiah personally?", options: [{ label: "A", text: "Supporters" }, { label: "B", text: "Prayer" }, { label: "C", text: "Authority" }, { label: "D", text: "Success" }], correctAnswer: "B", verse: "Nehemiah 1", explanation: "Prayer grounded his leadership." },
  { id: "nehemiah84", question: "What does rebuilding without reform lead to?", options: [{ label: "A", text: "Strength" }, { label: "B", text: "Failure" }, { label: "C", text: "Peace" }, { label: "D", text: "Unity" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Walls alone are not enough." },
  { id: "nehemiah85", question: "What connects Ezra and Nehemiah?", options: [{ label: "A", text: "Military rebuilding" }, { label: "B", text: "Word-centered restoration" }, { label: "C", text: "Kingship" }, { label: "D", text: "Prophecy" }], correctAnswer: "B", verse: "Ezra-Nehemiah", explanation: "Both emphasize God's Word." },
  { id: "nehemiah86", question: "What lesson does opposition teach leaders?", options: [{ label: "A", text: "Quit" }, { label: "B", text: "Stay focused" }, { label: "C", text: "Compromise" }, { label: "D", text: "Fight physically" }], correctAnswer: "B", verse: "Nehemiah 6:3", explanation: "Focus preserves the mission." },
  { id: "nehemiah87", question: "What defines true revival?", options: [{ label: "A", text: "Emotion" }, { label: "B", text: "Obedience" }, { label: "C", text: "Crowds" }, { label: "D", text: "Buildings" }], correctAnswer: "B", verse: "Nehemiah 8-10", explanation: "Revival produces obedience." },
  { id: "nehemiah88", question: "Why did Nehemiah confront sin strongly?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Love for God's holiness" }, { label: "C", text: "Authority" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Holiness mattered deeply." },
  { id: "nehemiah89", question: "What protects a restored community?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Army" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Nehemiah themes", explanation: "Faithfulness preserves restoration." },
  { id: "nehemiah90", question: "What is Nehemiah's ultimate concern?", options: [{ label: "A", text: "Jerusalem's fame" }, { label: "B", text: "God's honor" }, { label: "C", text: "Political stability" }, { label: "D", text: "Personal legacy" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "God's honor motivated everything." },
  { id: "nehemiah91", question: "Why was Scripture explained clearly?", options: [{ label: "A", text: "Entertainment" }, { label: "B", text: "Understanding leads to obedience" }, { label: "C", text: "Tradition" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Nehemiah 8:8", explanation: "Understanding enables obedience." },
  { id: "nehemiah92", question: "What happens when leaders leave?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Compromise returns" }, { label: "C", text: "Peace" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Leadership absence revealed weakness." },
  { id: "nehemiah93", question: "What shows God's mercy?", options: [{ label: "A", text: "No opposition" }, { label: "B", text: "Repeated chances to reform" }, { label: "C", text: "Strong walls" }, { label: "D", text: "Foreign support" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "God patiently restores." },
  { id: "nehemiah94", question: "What must be rebuilt alongside walls?", options: [{ label: "A", text: "Economy" }, { label: "B", text: "Hearts" }, { label: "C", text: "Army" }, { label: "D", text: "Trade" }], correctAnswer: "B", verse: "Nehemiah 8-10", explanation: "Heart renewal matters most." },
  { id: "nehemiah95", question: "What does Nehemiah teach about perseverance?", options: [{ label: "A", text: "Avoid resistance" }, { label: "B", text: "Finish God's work" }, { label: "C", text: "Compromise" }, { label: "D", text: "Wait passively" }], correctAnswer: "B", verse: "Nehemiah 6", explanation: "Perseverance completes the mission." },
  { id: "nehemiah96", question: "Why is Nehemiah a model leader?", options: [{ label: "A", text: "Powerful" }, { label: "B", text: "Prayerful and courageous" }, { label: "C", text: "Wealthy" }, { label: "D", text: "Strategic only" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "Prayer fueled courage." },
  { id: "nehemiah97", question: "What does Nehemiah reveal about God?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Faithful and involved" }, { label: "C", text: "Unpredictable" }, { label: "D", text: "Harsh" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "God actively restores." },
  { id: "nehemiah98", question: "What does lasting restoration require?", options: [{ label: "A", text: "Structures" }, { label: "B", text: "Continual obedience" }, { label: "C", text: "Strong leaders only" }, { label: "D", text: "No opposition" }], correctAnswer: "B", verse: "Nehemiah themes", explanation: "Obedience must continue." },
  { id: "nehemiah99", question: "What warning does Nehemiah leave?", options: [{ label: "A", text: "Enemies remain" }, { label: "B", text: "Compromise returns easily" }, { label: "C", text: "Walls fail" }, { label: "D", text: "Leadership ends" }], correctAnswer: "B", verse: "Nehemiah 13", explanation: "Vigilance is required." },
  { id: "nehemiah100", question: "What is the ultimate message of Nehemiah?", options: [{ label: "A", text: "Rebuild cities" }, { label: "B", text: "God restores through obedient leadership" }, { label: "C", text: "Defeat enemies" }, { label: "D", text: "Trust structures" }], correctAnswer: "B", verse: "Nehemiah overview", explanation: "God restores His people through faithful leaders." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function NehemiahTriviaPage() {
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
          .eq("book", "nehemiah");

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
          book: "nehemiah",
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
            book: "nehemiah",
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
    if (score === 10) return "Perfect! You're a Nehemiah expert!";
    if (score >= 8) return "Excellent! You know Nehemiah well!";
    if (score >= 6) return "Good job! Keep studying Nehemiah!";
    if (score >= 4) return "Nice try! Nehemiah has much to explore!";
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
              href="/bible-trivia/nehemiah"
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






