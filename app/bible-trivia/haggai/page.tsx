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
  { id: "haggai1", question: "Who is the author of the book of Haggai?", options: [{ label: "A", text: "Zechariah" }, { label: "B", text: "Haggai" }, { label: "C", text: "Malachi" }, { label: "D", text: "Ezra" }], correctAnswer: "B", verse: "Haggai 1:1", explanation: "The book is attributed to the prophet Haggai." },
  { id: "haggai2", question: "During whose reign did Haggai prophesy?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Artaxerxes" }, { label: "D", text: "Nebuchadnezzar" }], correctAnswer: "B", verse: "Haggai 1:1", explanation: "Haggai prophesied during the reign of King Darius." },
  { id: "haggai3", question: "Who was governor of Judah at the time?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "Nehemiah" }, { label: "D", text: "Joshua" }], correctAnswer: "B", verse: "Haggai 1:1", explanation: "Zerubbabel served as governor." },
  { id: "haggai4", question: "Who was the high priest?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Joshua son of Jehozadak" }, { label: "C", text: "Eliashib" }, { label: "D", text: "Aaron" }], correctAnswer: "B", verse: "Haggai 1:1", explanation: "Joshua served as high priest." },
  { id: "haggai5", question: "What main issue does Haggai address?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Neglect of the temple" }, { label: "C", text: "Foreign alliances" }, { label: "D", text: "False prophecy" }], correctAnswer: "B", verse: "Haggai 1", explanation: "The temple rebuilding had stopped." },
  { id: "haggai6", question: "What excuse did the people give?", options: [{ label: "A", text: "Lack of money" }, { label: "B", text: "The time has not yet come" }, { label: "C", text: "Opposition" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Haggai 1:2", explanation: "They delayed rebuilding." },
  { id: "haggai7", question: "Where were the people living?", options: [{ label: "A", text: "Tents" }, { label: "B", text: "Paneled houses" }, { label: "C", text: "Palaces" }, { label: "D", text: "Caves" }], correctAnswer: "B", verse: "Haggai 1:4", explanation: "Comfort for themselves, neglect for God." },
  { id: "haggai8", question: "What condition was the temple in?", options: [{ label: "A", text: "Finished" }, { label: "B", text: "In ruins" }, { label: "C", text: "Under guard" }, { label: "D", text: "Under attack" }], correctAnswer: "B", verse: "Haggai 1:4", explanation: "The temple lay neglected." },
  { id: "haggai9", question: "What phrase is repeated to prompt reflection?", options: [{ label: "A", text: "Fear the Lord" }, { label: "B", text: "Give careful thought" }, { label: "C", text: "Repent now" }, { label: "D", text: "Hear the word" }], correctAnswer: "B", verse: "Haggai 1:5", explanation: "A call to self-examination." },
  { id: "haggai10", question: "What happens to their harvest?", options: [{ label: "A", text: "Abundant" }, { label: "B", text: "Little yield" }, { label: "C", text: "Stolen" }, { label: "D", text: "Burned" }], correctAnswer: "B", verse: "Haggai 1:6", explanation: "Blessing withheld." },
  { id: "haggai11", question: "What happens when they earn wages?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Put in bags with holes" }, { label: "C", text: "Invested" }, { label: "D", text: "Given away" }], correctAnswer: "B", verse: "Haggai 1:6", explanation: "Futility without obedience." },
  { id: "haggai12", question: "What does God tell them to do?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Go up to the mountains" }, { label: "C", text: "Fast" }, { label: "D", text: "Wait" }], correctAnswer: "B", verse: "Haggai 1:8", explanation: "Gather materials to rebuild." },
  { id: "haggai13", question: "Why should they rebuild?", options: [{ label: "A", text: "For wealth" }, { label: "B", text: "So God may take pleasure" }, { label: "C", text: "For protection" }, { label: "D", text: "For prestige" }], correctAnswer: "B", verse: "Haggai 1:8", explanation: "God's glory matters." },
  { id: "haggai14", question: "Why was there drought?", options: [{ label: "A", text: "Natural causes" }, { label: "B", text: "Because God withheld rain" }, { label: "C", text: "Enemy sabotage" }, { label: "D", text: "Poor farming" }], correctAnswer: "B", verse: "Haggai 1:10-11", explanation: "Disobedience affected the land." },
  { id: "haggai15", question: "Who obeyed the Lord?", options: [{ label: "A", text: "Only priests" }, { label: "B", text: "Zerubbabel, Joshua, and the people" }, { label: "C", text: "Prophets only" }, { label: "D", text: "Foreigners" }], correctAnswer: "B", verse: "Haggai 1:12", explanation: "Unified obedience." },
  { id: "haggai16", question: "What did the people feel?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fear of the Lord" }, { label: "C", text: "Anger" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Haggai 1:12", explanation: "Reverence led to action." },
  { id: "haggai17", question: "What message did Haggai deliver next?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "I am with you" }, { label: "C", text: "Wait longer" }, { label: "D", text: "Leave the land" }], correctAnswer: "B", verse: "Haggai 1:13", explanation: "God's presence encouraged them." },
  { id: "haggai18", question: "What did the Lord stir?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "The spirit of the leaders and people" }, { label: "C", text: "Conflict" }, { label: "D", text: "Rain" }], correctAnswer: "B", verse: "Haggai 1:14", explanation: "God motivated obedience." },
  { id: "haggai19", question: "What did they begin to do?", options: [{ label: "A", text: "Pray" }, { label: "B", text: "Work on the temple" }, { label: "C", text: "Fast" }, { label: "D", text: "Celebrate" }], correctAnswer: "B", verse: "Haggai 1:14", explanation: "Action followed repentance." },
  { id: "haggai20", question: "How long after the message did work begin?", options: [{ label: "A", text: "Same day" }, { label: "B", text: "About three weeks" }, { label: "C", text: "One year" }, { label: "D", text: "Immediately" }], correctAnswer: "B", verse: "Haggai 1:15", explanation: "Prompt obedience." },
  { id: "haggai21", question: "What question opens chapter 2?", options: [{ label: "A", text: "Who sinned?" }, { label: "B", text: "Who saw the former glory?" }, { label: "C", text: "Why fear?" }, { label: "D", text: "Who is faithful?" }], correctAnswer: "B", verse: "Haggai 2:3", explanation: "Comparison with Solomon's temple." },
  { id: "haggai22", question: "How did the new temple seem?", options: [{ label: "A", text: "Greater" }, { label: "B", text: "Like nothing" }, { label: "C", text: "Perfect" }, { label: "D", text: "Magnificent" }], correctAnswer: "B", verse: "Haggai 2:3", explanation: "Discouragement among elders." },
  { id: "haggai23", question: "What does God command three times?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Be strong" }, { label: "C", text: "Be silent" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Haggai 2:4", explanation: "Encouragement to continue." },
  { id: "haggai24", question: "Why should they be strong?", options: [{ label: "A", text: "They are skilled" }, { label: "B", text: "God is with them" }, { label: "C", text: "They have allies" }, { label: "D", text: "They are wealthy" }], correctAnswer: "B", verse: "Haggai 2:4", explanation: "God's presence empowers." },
  { id: "haggai25", question: "What promise from the Exodus is recalled?", options: [{ label: "A", text: "The law" }, { label: "B", text: "God's Spirit remaining" }, { label: "C", text: "The plagues" }, { label: "D", text: "The covenant sign" }], correctAnswer: "B", verse: "Haggai 2:5", explanation: "Continuity of God's presence." },
  { id: "haggai26", question: "What should they not do?", options: [{ label: "A", text: "Work" }, { label: "B", text: "Fear" }, { label: "C", text: "Build" }, { label: "D", text: "Speak" }], correctAnswer: "B", verse: "Haggai 2:5", explanation: "Fear undermines faith." },
  { id: "haggai27", question: "What will God shake?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "The heavens and the earth" }, { label: "C", text: "The temple only" }, { label: "D", text: "The people" }], correctAnswer: "B", verse: "Haggai 2:6", explanation: "Cosmic upheaval." },
  { id: "haggai28", question: "What will be shaken besides nature?", options: [{ label: "A", text: "Hearts" }, { label: "B", text: "Nations" }, { label: "C", text: "Priests" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Haggai 2:7", explanation: "Political and spiritual impact." },
  { id: "haggai29", question: "What will fill the temple?", options: [{ label: "A", text: "People" }, { label: "B", text: "Glory" }, { label: "C", text: "Gold" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Haggai 2:7", explanation: "God's glory returns." },
  { id: "haggai30", question: "Who owns the silver and gold?", options: [{ label: "A", text: "Persia" }, { label: "B", text: "The Lord" }, { label: "C", text: "Judah" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Haggai 2:8", explanation: "God supplies what is needed." },
  { id: "haggai31", question: "How will the latter glory compare?", options: [{ label: "A", text: "Less" }, { label: "B", text: "Greater" }, { label: "C", text: "Equal" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Haggai 2:9", explanation: "Future glory promised." },
  { id: "haggai32", question: "What will God grant in that place?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Peace" }, { label: "C", text: "Wealth" }, { label: "D", text: "Protection" }], correctAnswer: "B", verse: "Haggai 2:9", explanation: "Shalom restored." },
  { id: "haggai33", question: "Who does Haggai question next?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Priests" }, { label: "C", text: "People" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Haggai 2:11", explanation: "Teaching through law." },
  { id: "haggai34", question: "What does holy meat not do?", options: [{ label: "A", text: "Bless" }, { label: "B", text: "Make other things holy" }, { label: "C", text: "Heal" }, { label: "D", text: "Sanctify land" }], correctAnswer: "B", verse: "Haggai 2:12", explanation: "Holiness is not contagious." },
  { id: "haggai35", question: "What does touching a dead body cause?", options: [{ label: "A", text: "Blessing" }, { label: "B", text: "Defilement" }, { label: "C", text: "Healing" }, { label: "D", text: "Nothing" }], correctAnswer: "B", verse: "Haggai 2:13", explanation: "Impurity spreads easily." },
  { id: "haggai36", question: "What point does Haggai make?", options: [{ label: "A", text: "Holiness spreads easily" }, { label: "B", text: "Defilement affects everything" }, { label: "C", text: "Law is irrelevant" }, { label: "D", text: "Priests are wrong" }], correctAnswer: "B", verse: "Haggai 2:14", explanation: "Sin corrupts work." },
  { id: "haggai37", question: "How does God view their offerings?", options: [{ label: "A", text: "Accepted" }, { label: "B", text: "Unclean" }, { label: "C", text: "Perfect" }, { label: "D", text: "Optional" }], correctAnswer: "B", verse: "Haggai 2:14", explanation: "Obedience matters." },
  { id: "haggai38", question: "What phrase is repeated again?", options: [{ label: "A", text: "Be strong" }, { label: "B", text: "Give careful thought" }, { label: "C", text: "Fear the Lord" }, { label: "D", text: "Return to Me" }], correctAnswer: "B", verse: "Haggai 2:15", explanation: "Reflect on past and present." },
  { id: "haggai39", question: "Before the temple foundation, what happened?", options: [{ label: "A", text: "Abundance" }, { label: "B", text: "Shortage" }, { label: "C", text: "Peace" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Haggai 2:16", explanation: "God disciplined them." },
  { id: "haggai40", question: "What crops were struck?", options: [{ label: "A", text: "Only wheat" }, { label: "B", text: "Grain, wine, oil" }, { label: "C", text: "Figs only" }, { label: "D", text: "Olives only" }], correctAnswer: "B", verse: "Haggai 2:17", explanation: "Economic hardship." },
  { id: "haggai41", question: "What natural disasters occurred?", options: [{ label: "A", text: "Earthquake" }, { label: "B", text: "Blight, mildew, hail" }, { label: "C", text: "Flood" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Haggai 2:17", explanation: "God's corrective discipline." },
  { id: "haggai42", question: "Did the people return to God then?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }], correctAnswer: "B", verse: "Haggai 2:17", explanation: "Hard hearts delayed blessing." },
  { id: "haggai43", question: "From what day will blessing begin?", options: [{ label: "A", text: "Harvest day" }, { label: "B", text: "Foundation of the temple" }, { label: "C", text: "Passover" }, { label: "D", text: "Sabbath" }], correctAnswer: "B", verse: "Haggai 2:18", explanation: "Obedience brings blessing." },
  { id: "haggai44", question: "Is there seed in the barn?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }], correctAnswer: "B", verse: "Haggai 2:19", explanation: "Faith before provision." },
  { id: "haggai45", question: "What promise does God give?", options: [{ label: "A", text: "I will punish you" }, { label: "B", text: "I will bless you" }, { label: "C", text: "I will wait" }, { label: "D", text: "I will test you" }], correctAnswer: "B", verse: "Haggai 2:19", explanation: "Blessing follows obedience." },
  { id: "haggai46", question: "How many messages are dated in Haggai?", options: [{ label: "A", text: "Two" }, { label: "B", text: "Four" }, { label: "C", text: "Seven" }, { label: "D", text: "Ten" }], correctAnswer: "B", verse: "Haggai", explanation: "Four dated prophecies." },
  { id: "haggai47", question: "Who receives a personal prophecy at the end?", options: [{ label: "A", text: "Joshua" }, { label: "B", text: "Zerubbabel" }, { label: "C", text: "Ezra" }, { label: "D", text: "Nehemiah" }], correctAnswer: "B", verse: "Haggai 2:20", explanation: "Message of future hope." },
  { id: "haggai48", question: "What will God shake again?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Heavens and earth" }, { label: "C", text: "Temple only" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Haggai 2:21", explanation: "Future upheaval." },
  { id: "haggai49", question: "What will be overthrown?", options: [{ label: "A", text: "Cities" }, { label: "B", text: "Thrones of kingdoms" }, { label: "C", text: "Temples" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Haggai 2:22", explanation: "Political reversal." },
  { id: "haggai50", question: "What military power is destroyed?", options: [{ label: "A", text: "Infantry" }, { label: "B", text: "Chariots and riders" }, { label: "C", text: "Archers" }, { label: "D", text: "Navies" }], correctAnswer: "B", verse: "Haggai 2:22", explanation: "Total defeat." },
  { id: "haggai51", question: "What happens to warriors?", options: [{ label: "A", text: "Stand firm" }, { label: "B", text: "Fall by each other's sword" }, { label: "C", text: "Escape" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Haggai 2:22", explanation: "Chaos among enemies." },
  { id: "haggai52", question: "How does God address Zerubbabel?", options: [{ label: "A", text: "Servant" }, { label: "B", text: "My servant" }, { label: "C", text: "King" }, { label: "D", text: "Prophet" }], correctAnswer: "B", verse: "Haggai 2:23", explanation: "Special designation." },
  { id: "haggai53", question: "What will Zerubbabel become?", options: [{ label: "A", text: "King" }, { label: "B", text: "Like a signet ring" }, { label: "C", text: "Priest" }, { label: "D", text: "Warrior" }], correctAnswer: "B", verse: "Haggai 2:23", explanation: "Symbol of authority." },
  { id: "haggai54", question: "Why is Zerubbabel chosen?", options: [{ label: "A", text: "His strength" }, { label: "B", text: "God's sovereign choice" }, { label: "C", text: "His lineage only" }, { label: "D", text: "His wealth" }], correctAnswer: "B", verse: "Haggai 2:23", explanation: "Divine election." },
  { id: "haggai55", question: "What title does God use for Himself?", options: [{ label: "A", text: "King of Israel" }, { label: "B", text: "Lord Almighty" }, { label: "C", text: "Creator" }, { label: "D", text: "Father" }], correctAnswer: "B", verse: "Haggai", explanation: "Authority emphasized." },
  { id: "haggai56", question: "What does the signet ring represent?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Authority and approval" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Haggai 2:23", explanation: "Royal symbolism." },
  { id: "haggai57", question: "What hope is tied to Zerubbabel?", options: [{ label: "A", text: "Immediate kingship" }, { label: "B", text: "Messianic lineage" }, { label: "C", text: "Military victory" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Haggai 2:23", explanation: "Davidic promise continued." },
  { id: "haggai58", question: "What does Haggai emphasize about priorities?", options: [{ label: "A", text: "Self first" }, { label: "B", text: "God's house first" }, { label: "C", text: "Wealth first" }, { label: "D", text: "Safety first" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Seek God's kingdom." },
  { id: "haggai59", question: "What does obedience unlock?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Blessing" }, { label: "C", text: "Control" }, { label: "D", text: "Status" }], correctAnswer: "B", verse: "Haggai", explanation: "Blessing follows obedience." },
  { id: "haggai60", question: "What does Haggai show about delays?", options: [{ label: "A", text: "They are harmless" }, { label: "B", text: "They hinder blessing" }, { label: "C", text: "They help faith" }, { label: "D", text: "They are required" }], correctAnswer: "B", verse: "Haggai", explanation: "Delayed obedience costs." },
  { id: "haggai61", question: "What does Haggai reveal about God's presence?", options: [{ label: "A", text: "Conditional" }, { label: "B", text: "With obedient people" }, { label: "C", text: "Withdrawn" }, { label: "D", text: "Limited" }], correctAnswer: "B", verse: "Haggai 1:13", explanation: "God is with those who obey." },
  { id: "haggai62", question: "What does Haggai teach about worship?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Central to life" }, { label: "C", text: "Private only" }, { label: "D", text: "Symbolic" }], correctAnswer: "B", verse: "Haggai", explanation: "God-centered living." },
  { id: "haggai63", question: "What role does leadership play?", options: [{ label: "A", text: "Minimal" }, { label: "B", text: "Influential" }, { label: "C", text: "Oppressive" }, { label: "D", text: "Irrelevant" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Leaders model obedience." },
  { id: "haggai64", question: "What does God desire more than comfort?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Faithful obedience" }, { label: "C", text: "Success" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Haggai", explanation: "Obedience matters." },
  { id: "haggai65", question: "What does Haggai say about fear?", options: [{ label: "A", text: "It protects" }, { label: "B", text: "It hinders work" }, { label: "C", text: "It is wisdom" }, { label: "D", text: "It is required" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Fear blocks progress." },
  { id: "haggai66", question: "What does God promise amid shaking?", options: [{ label: "A", text: "Destruction only" }, { label: "B", text: "Future glory" }, { label: "C", text: "Silence" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Hope beyond upheaval." },
  { id: "haggai67", question: "What does Haggai emphasize about holiness?", options: [{ label: "A", text: "It spreads easily" }, { label: "B", text: "It requires obedience" }, { label: "C", text: "It is automatic" }, { label: "D", text: "It is symbolic" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Intentional faithfulness." },
  { id: "haggai68", question: "What does impurity do?", options: [{ label: "A", text: "Nothing" }, { label: "B", text: "Spreads quickly" }, { label: "C", text: "Blesses" }, { label: "D", text: "Disappears" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Sin contaminates." },
  { id: "haggai69", question: "What does Haggai reveal about effort without God?", options: [{ label: "A", text: "Success" }, { label: "B", text: "Futility" }, { label: "C", text: "Peace" }, { label: "D", text: "Growth" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Blessing depends on God." },
  { id: "haggai70", question: "What does Haggai encourage?", options: [{ label: "A", text: "Delay" }, { label: "B", text: "Immediate obedience" }, { label: "C", text: "Compromise" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "Haggai", explanation: "Act now." },
  { id: "haggai71", question: "What does Haggai show about God's promises?", options: [{ label: "A", text: "They fail" }, { label: "B", text: "They are trustworthy" }, { label: "C", text: "They are symbolic" }, { label: "D", text: "They are distant" }], correctAnswer: "B", verse: "Haggai", explanation: "God keeps His word." },
  { id: "haggai72", question: "What historical period is Haggai set in?", options: [{ label: "A", text: "United monarchy" }, { label: "B", text: "Post-exilic period" }, { label: "C", text: "Exodus" }, { label: "D", text: "Judges" }], correctAnswer: "B", verse: "Haggai", explanation: "After return from exile." },
  { id: "haggai73", question: "What does rebuilding the temple symbolize?", options: [{ label: "A", text: "Economic growth" }, { label: "B", text: "Renewed covenant focus" }, { label: "C", text: "Political power" }, { label: "D", text: "Military strength" }], correctAnswer: "B", verse: "Haggai", explanation: "God at the center again." },
  { id: "haggai74", question: "What does God value most?", options: [{ label: "A", text: "Speed" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Skill" }, { label: "D", text: "Numbers" }], correctAnswer: "B", verse: "Haggai", explanation: "Faithful obedience." },
  { id: "haggai75", question: "What does Haggai reveal about discouragement?", options: [{ label: "A", text: "It ends work" }, { label: "B", text: "It must be overcome by trust" }, { label: "C", text: "It is permanent" }, { label: "D", text: "It is justified" }], correctAnswer: "B", verse: "Haggai 2", explanation: "God encourages perseverance." },
  { id: "haggai76", question: "What does God promise to fill the temple with?", options: [{ label: "A", text: "People" }, { label: "B", text: "Glory" }, { label: "C", text: "Gold" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Haggai 2:7", explanation: "Divine presence." },
  { id: "haggai77", question: "What is Haggai's overall message?", options: [{ label: "A", text: "Wait patiently" }, { label: "B", text: "Put God first" }, { label: "C", text: "Fear nations" }, { label: "D", text: "Seek wealth" }], correctAnswer: "B", verse: "Haggai", explanation: "Right priorities matter." },
  { id: "haggai78", question: "What does God do when priorities align?", options: [{ label: "A", text: "Withdraw" }, { label: "B", text: "Bless and empower" }, { label: "C", text: "Delay" }, { label: "D", text: "Test" }], correctAnswer: "B", verse: "Haggai", explanation: "Blessing flows." },
  { id: "haggai79", question: "What does Haggai show about small beginnings?", options: [{ label: "A", text: "They are meaningless" }, { label: "B", text: "They can lead to great glory" }, { label: "C", text: "They fail" }, { label: "D", text: "They should be avoided" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Future glory promised." },
  { id: "haggai80", question: "What final tone does Haggai end with?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Hope" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Hopeful future." },
  { id: "haggai81", question: "What does Haggai teach about leadership obedience?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential" }, { label: "C", text: "Symbolic" }, { label: "D", text: "Irrelevant" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Leaders lead the way." },
  { id: "haggai82", question: "What does Haggai emphasize about God's timing?", options: [{ label: "A", text: "Unimportant" }, { label: "B", text: "Now is the time" }, { label: "C", text: "Far off" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Haggai 1:2", explanation: "Stop delaying." },
  { id: "haggai83", question: "What happens when God's Spirit stirs?", options: [{ label: "A", text: "Fear increases" }, { label: "B", text: "Work begins" }, { label: "C", text: "People flee" }, { label: "D", text: "Judgment falls" }], correctAnswer: "B", verse: "Haggai 1:14", explanation: "Action follows stirring." },
  { id: "haggai84", question: "What does Haggai reveal about God's faithfulness?", options: [{ label: "A", text: "Conditional only" }, { label: "B", text: "Consistent through generations" }, { label: "C", text: "Temporary" }, { label: "D", text: "Unreliable" }], correctAnswer: "B", verse: "Haggai 2:5", explanation: "God remains faithful." },
  { id: "haggai85", question: "What does Haggai show about rebuilding?", options: [{ label: "A", text: "It is easy" }, { label: "B", text: "It requires faith and effort" }, { label: "C", text: "It is symbolic only" }, { label: "D", text: "It is unnecessary" }], correctAnswer: "B", verse: "Haggai", explanation: "Faithful labor." },
  { id: "haggai86", question: "What does Haggai encourage when discouraged?", options: [{ label: "A", text: "Quit" }, { label: "B", text: "Remember God's promises" }, { label: "C", text: "Compare yourself" }, { label: "D", text: "Wait passively" }], correctAnswer: "B", verse: "Haggai 2", explanation: "Promises fuel perseverance." },
  { id: "haggai87", question: "What does Haggai show about God's sovereignty?", options: [{ label: "A", text: "Limited" }, { label: "B", text: "Over nations and history" }, { label: "C", text: "Withdrawn" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Haggai 2", explanation: "God rules history." },
  { id: "haggai88", question: "What does Haggai say about misplaced priorities?", options: [{ label: "A", text: "They bless" }, { label: "B", text: "They lead to loss" }, { label: "C", text: "They are neutral" }, { label: "D", text: "They are wise" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Misplaced focus costs blessing." },
  { id: "haggai89", question: "What does Haggai ultimately point toward?", options: [{ label: "A", text: "Political power" }, { label: "B", text: "God-centered worship" }, { label: "C", text: "Economic reform" }, { label: "D", text: "Military strength" }], correctAnswer: "B", verse: "Haggai", explanation: "God at the center." },
  { id: "haggai90", question: "What does Haggai teach about faith and work?", options: [{ label: "A", text: "Separate" }, { label: "B", text: "They belong together" }, { label: "C", text: "Faith replaces work" }, { label: "D", text: "Work replaces faith" }], correctAnswer: "B", verse: "Haggai", explanation: "Faith motivates action." },
  { id: "haggai91", question: "What does God promise after obedience?", options: [{ label: "A", text: "Testing" }, { label: "B", text: "Blessing" }, { label: "C", text: "Silence" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Haggai 2:19", explanation: "Blessing restored." },
  { id: "haggai92", question: "What does Haggai show about repentance?", options: [{ label: "A", text: "Delayed" }, { label: "B", text: "Immediate action follows" }, { label: "C", text: "Unnecessary" }, { label: "D", text: "Private only" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Repentance leads to change." },
  { id: "haggai93", question: "What does Haggai emphasize about God's house?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Central" }, { label: "C", text: "Secondary" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Haggai", explanation: "God's dwelling matters." },
  { id: "haggai94", question: "What does Haggai reveal about God's encouragement?", options: [{ label: "A", text: "Rare" }, { label: "B", text: "Timely" }, { label: "C", text: "Conditional" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Haggai 1-2", explanation: "God encourages obedience." },
  { id: "haggai95", question: "What does Haggai show about small faithfulness?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Honored by God" }, { label: "C", text: "Insufficient" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Haggai", explanation: "Faithfulness matters." },
  { id: "haggai96", question: "What does Haggai teach about God's authority?", options: [{ label: "A", text: "Local" }, { label: "B", text: "Universal" }, { label: "C", text: "Limited" }, { label: "D", text: "Shared" }], correctAnswer: "B", verse: "Haggai", explanation: "God rules all." },
  { id: "haggai97", question: "What does Haggai show about obedience timing?", options: [{ label: "A", text: "Later" }, { label: "B", text: "Now" }, { label: "C", text: "Eventually" }, { label: "D", text: "Optional" }], correctAnswer: "B", verse: "Haggai 1", explanation: "Act promptly." },
  { id: "haggai98", question: "What does Haggai ultimately call the people to?", options: [{ label: "A", text: "Prosperity" }, { label: "B", text: "Faithful obedience" }, { label: "C", text: "Isolation" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Haggai", explanation: "Faith in action." },
  { id: "haggai99", question: "What is Haggai's lasting message?", options: [{ label: "A", text: "Wait patiently" }, { label: "B", text: "Put God first" }, { label: "C", text: "Fear nations" }, { label: "D", text: "Seek wealth" }], correctAnswer: "B", verse: "Haggai", explanation: "Right priorities." },
  { id: "haggai100", question: "Overall, Haggai moves from what to what?", options: [{ label: "A", text: "Judgment to silence" }, { label: "B", text: "Neglect to renewal" }, { label: "C", text: "Fear to exile" }, { label: "D", text: "Power to weakness" }], correctAnswer: "B", verse: "Haggai", explanation: "Renewal through obedience." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HaggaiTriviaPage() {
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
          .eq("book", "haggai");

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
          book: "haggai",
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
            book: "haggai",
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
    if (score === 10) return "Perfect! You're a Haggai expert!";
    if (score >= 8) return "Excellent! You know Haggai well!";
    if (score >= 6) return "Good job! Keep studying Haggai!";
    if (score >= 4) return "Nice try! Haggai has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">Books</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">Congrats!</div>
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
              href="/bible-trivia/haggai"
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
            {"<- Back"}
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
