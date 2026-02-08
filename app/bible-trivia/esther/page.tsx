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
  { id: "esther1", question: "Who was king of Persia in the book of Esther?", options: [{ label: "A", text: "Cyrus" }, { label: "B", text: "Darius" }, { label: "C", text: "Xerxes" }, { label: "D", text: "Artaxerxes" }], correctAnswer: "C", verse: "Esther 1:1", explanation: "Xerxes ruled over the Persian Empire." },
  { id: "esther2", question: "How long did Xerxes rule?", options: [{ label: "A", text: "7 years" }, { label: "B", text: "12 years" }, { label: "C", text: "20 years" }, { label: "D", text: "30 years" }], correctAnswer: "C", verse: "Esther 1:1", explanation: "Xerxes reigned for twenty years." },
  { id: "esther3", question: "Why did Queen Vashti lose her position?", options: [{ label: "A", text: "She betrayed the king" }, { label: "B", text: "She disobeyed the king" }, { label: "C", text: "She insulted officials" }, { label: "D", text: "She plotted rebellion" }], correctAnswer: "B", verse: "Esther 1:12", explanation: "Vashti refused the king's command." },
  { id: "esther4", question: "What event led to Vashti's removal?", options: [{ label: "A", text: "A war" }, { label: "B", text: "A royal feast" }, { label: "C", text: "A decree" }, { label: "D", text: "A prophecy" }], correctAnswer: "B", verse: "Esther 1:10-12", explanation: "The incident occurred during a banquet." },
  { id: "esther5", question: "What was sought after Vashti's removal?", options: [{ label: "A", text: "A new advisor" }, { label: "B", text: "A new queen" }, { label: "C", text: "A treaty" }, { label: "D", text: "A military leader" }], correctAnswer: "B", verse: "Esther 2:2", explanation: "A search began for a new queen." },
  { id: "esther6", question: "What was Esther's Hebrew name?", options: [{ label: "A", text: "Hannah" }, { label: "B", text: "Miriam" }, { label: "C", text: "Hadassah" }, { label: "D", text: "Ruth" }], correctAnswer: "C", verse: "Esther 2:7", explanation: "Esther was also called Hadassah." },
  { id: "esther7", question: "Who raised Esther?", options: [{ label: "A", text: "Ezra" }, { label: "B", text: "Nehemiah" }, { label: "C", text: "Mordecai" }, { label: "D", text: "Haman" }], correctAnswer: "C", verse: "Esther 2:7", explanation: "Mordecai was her cousin and guardian." },
  { id: "esther8", question: "What tribe was Mordecai from?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Benjamin" }, { label: "C", text: "Levi" }, { label: "D", text: "Ephraim" }], correctAnswer: "B", verse: "Esther 2:5", explanation: "Mordecai was a Benjamite." },
  { id: "esther9", question: "Why did Esther hide her Jewish identity?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "King's command" }, { label: "C", text: "Mordecai's instruction" }, { label: "D", text: "Persian law" }], correctAnswer: "C", verse: "Esther 2:10", explanation: "Mordecai instructed her to remain silent." },
  { id: "esther10", question: "What position did Mordecai hold initially?", options: [{ label: "A", text: "Governor" }, { label: "B", text: "Priest" }, { label: "C", text: "Gate official" }, { label: "D", text: "General" }], correctAnswer: "C", verse: "Esther 2:19", explanation: "Mordecai sat at the king's gate." },
  { id: "esther11", question: "What plot did Mordecai uncover?", options: [{ label: "A", text: "A tax revolt" }, { label: "B", text: "An assassination attempt" }, { label: "C", text: "A coup" }, { label: "D", text: "A false prophecy" }], correctAnswer: "B", verse: "Esther 2:21-23", explanation: "Two officials planned to kill the king." },
  { id: "esther12", question: "Where was Mordecai's act recorded?", options: [{ label: "A", text: "Temple scrolls" }, { label: "B", text: "Royal chronicles" }, { label: "C", text: "Law of Moses" }, { label: "D", text: "City records" }], correctAnswer: "B", verse: "Esther 2:23", explanation: "The deed was written in the royal records." },
  { id: "esther13", question: "Who was promoted above all officials?", options: [{ label: "A", text: "Mordecai" }, { label: "B", text: "Haman" }, { label: "C", text: "Esther" }, { label: "D", text: "Zeresh" }], correctAnswer: "B", verse: "Esther 3:1", explanation: "Haman was elevated by the king." },
  { id: "esther14", question: "Why did Haman hate Mordecai?", options: [{ label: "A", text: "Political rivalry" }, { label: "B", text: "Mordecai would not bow" }, { label: "C", text: "Family feud" }, { label: "D", text: "Religious debate" }], correctAnswer: "B", verse: "Esther 3:2", explanation: "Mordecai refused to bow to Haman." },
  { id: "esther15", question: "Who did Haman seek to destroy?", options: [{ label: "A", text: "Mordecai only" }, { label: "B", text: "All Jews" }, { label: "C", text: "Priests" }, { label: "D", text: "Foreigners" }], correctAnswer: "B", verse: "Esther 3:6", explanation: "Haman plotted against all Jews." },
  { id: "esther16", question: "How did Haman choose the date of destruction?", options: [{ label: "A", text: "Astrology" }, { label: "B", text: "Casting lots" }, { label: "C", text: "King's advice" }, { label: "D", text: "Dreams" }], correctAnswer: "B", verse: "Esther 3:7", explanation: "Lots were cast, called Pur." },
  { id: "esther17", question: "What month was chosen?", options: [{ label: "A", text: "Nisan" }, { label: "B", text: "Adar" }, { label: "C", text: "Tishri" }, { label: "D", text: "Sivan" }], correctAnswer: "B", verse: "Esther 3:7", explanation: "The twelfth month, Adar." },
  { id: "esther18", question: "What did Haman offer the king?", options: [{ label: "A", text: "Land" }, { label: "B", text: "Silver" }, { label: "C", text: "Troops" }, { label: "D", text: "Tribute" }], correctAnswer: "B", verse: "Esther 3:9", explanation: "Haman promised silver to the treasury." },
  { id: "esther19", question: "What sealed the decree?", options: [{ label: "A", text: "Temple approval" }, { label: "B", text: "King's signet ring" }, { label: "C", text: "Priestly oath" }, { label: "D", text: "Public vote" }], correctAnswer: "B", verse: "Esther 3:10", explanation: "The king's ring made it law." },
  { id: "esther20", question: "How did the city of Susa react?", options: [{ label: "A", text: "Celebration" }, { label: "B", text: "Confusion" }, { label: "C", text: "Indifference" }, { label: "D", text: "Rebellion" }], correctAnswer: "B", verse: "Esther 3:15", explanation: "The decree shocked the city." },
  { id: "esther21", question: "What did Mordecai wear in mourning?", options: [{ label: "A", text: "Ashes only" }, { label: "B", text: "Sackcloth and ashes" }, { label: "C", text: "Torn robes" }, { label: "D", text: "Black garments" }], correctAnswer: "B", verse: "Esther 4:1", explanation: "Mourning was public and intense." },
  { id: "esther22", question: "How did Esther first respond to Mordecai's message?", options: [{ label: "A", text: "Immediate action" }, { label: "B", text: "Fear" }, { label: "C", text: "Prayer" }, { label: "D", text: "Anger" }], correctAnswer: "B", verse: "Esther 4:11", explanation: "Approaching the king was dangerous." },
  { id: "esther23", question: "What famous question did Mordecai ask Esther?", options: [{ label: "A", text: "Will you obey?" }, { label: "B", text: "Who knows why you are queen?" }, { label: "C", text: "Do you fear the king?" }, { label: "D", text: "Will God save us?" }], correctAnswer: "B", verse: "Esther 4:14", explanation: "Esther may have been placed for this moment." },
  { id: "esther24", question: "What did Esther request before acting?", options: [{ label: "A", text: "Guards" }, { label: "B", text: "Fasting" }, { label: "C", text: "Money" }, { label: "D", text: "Time" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "Fasting preceded courage." },
  { id: "esther25", question: "How long did the fast last?", options: [{ label: "A", text: "One day" }, { label: "B", text: "Two days" }, { label: "C", text: "Three days" }, { label: "D", text: "Seven days" }], correctAnswer: "C", verse: "Esther 4:16", explanation: "The fast lasted three days." },
  { id: "esther26", question: "What phrase shows Esther's resolve?", options: [{ label: "A", text: "God will save us" }, { label: "B", text: "I will go" }, { label: "C", text: "Let us wait" }, { label: "D", text: "I fear the king" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "Esther chose courage." },
  { id: "esther27", question: "What risk did Esther take?", options: [{ label: "A", text: "Public exposure" }, { label: "B", text: "Loss of wealth" }, { label: "C", text: "Approaching the king uninvited" }, { label: "D", text: "Breaking the law" }], correctAnswer: "C", verse: "Esther 5:1", explanation: "The law allowed death for this." },
  { id: "esther28", question: "What did the king extend to Esther?", options: [{ label: "A", text: "Crown" }, { label: "B", text: "Sword" }, { label: "C", text: "Golden scepter" }, { label: "D", text: "Scroll" }], correctAnswer: "C", verse: "Esther 5:2", explanation: "The scepter signaled acceptance." },
  { id: "esther29", question: "What did Esther invite the king to?", options: [{ label: "A", text: "A council" }, { label: "B", text: "A feast" }, { label: "C", text: "The temple" }, { label: "D", text: "A prayer meeting" }], correctAnswer: "B", verse: "Esther 5:4", explanation: "Esther planned carefully." },
  { id: "esther30", question: "Who was also invited to the feast?", options: [{ label: "A", text: "Mordecai" }, { label: "B", text: "Ezra" }, { label: "C", text: "Haman" }, { label: "D", text: "Guards" }], correctAnswer: "C", verse: "Esther 5:4", explanation: "Haman was included in the plan." },
  { id: "esther31", question: "What made Haman furious after the feast?", options: [{ label: "A", text: "The king's silence" }, { label: "B", text: "Mordecai still would not bow" }, { label: "C", text: "Esther's delay" }, { label: "D", text: "Loss of favor" }], correctAnswer: "B", verse: "Esther 5:9", explanation: "Mordecai remained unmoved." },
  { id: "esther32", question: "Who advised Haman to build gallows?", options: [{ label: "A", text: "The king" }, { label: "B", text: "His wife Zeresh" }, { label: "C", text: "Officials" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Esther 5:14", explanation: "Zeresh encouraged the plan." },
  { id: "esther33", question: "How tall were the gallows?", options: [{ label: "A", text: "25 cubits" }, { label: "B", text: "40 cubits" }, { label: "C", text: "50 cubits" }, { label: "D", text: "60 cubits" }], correctAnswer: "C", verse: "Esther 5:14", explanation: "They were unusually high." },
  { id: "esther34", question: "What disturbed the king that night?", options: [{ label: "A", text: "Dreams" }, { label: "B", text: "Insomnia" }, { label: "C", text: "Fear" }, { label: "D", text: "Illness" }], correctAnswer: "B", verse: "Esther 6:1", explanation: "The king could not sleep." },
  { id: "esther35", question: "What was read to the king?", options: [{ label: "A", text: "Law of Moses" }, { label: "B", text: "Royal chronicles" }, { label: "C", text: "Prophecies" }, { label: "D", text: "Military records" }], correctAnswer: "B", verse: "Esther 6:1", explanation: "Past records were reviewed." },
  { id: "esther36", question: "Whose deed was remembered?", options: [{ label: "A", text: "Esther" }, { label: "B", text: "Haman" }, { label: "C", text: "Mordecai" }, { label: "D", text: "Zeresh" }], correctAnswer: "C", verse: "Esther 6:2", explanation: "Mordecai saved the king." },
  { id: "esther37", question: "What honor had Mordecai received earlier?", options: [{ label: "A", text: "Promotion" }, { label: "B", text: "Reward" }, { label: "C", text: "Nothing" }, { label: "D", text: "Land" }], correctAnswer: "C", verse: "Esther 6:3", explanation: "His act went unrewarded." },
  { id: "esther38", question: "Who did the king ask for advice?", options: [{ label: "A", text: "Esther" }, { label: "B", text: "Haman" }, { label: "C", text: "Mordecai" }, { label: "D", text: "Officials" }], correctAnswer: "B", verse: "Esther 6:4", explanation: "Haman entered at the wrong moment." },
  { id: "esther39", question: "Who did Haman think was to be honored?", options: [{ label: "A", text: "Mordecai" }, { label: "B", text: "The king" }, { label: "C", text: "Himself" }, { label: "D", text: "Esther" }], correctAnswer: "C", verse: "Esther 6:6", explanation: "Haman assumed it was him." },
  { id: "esther40", question: "What honor did Haman suggest?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Royal robe and horse" }, { label: "C", text: "A palace" }, { label: "D", text: "A feast" }], correctAnswer: "B", verse: "Esther 6:8-9", explanation: "Public honor was proposed." },
  { id: "esther41", question: "Who actually received the honor?", options: [{ label: "A", text: "Esther" }, { label: "B", text: "Haman" }, { label: "C", text: "Mordecai" }, { label: "D", text: "The king" }], correctAnswer: "C", verse: "Esther 6:10-11", explanation: "Mordecai was exalted." },
  { id: "esther42", question: "Who led Mordecai through the city?", options: [{ label: "A", text: "Guards" }, { label: "B", text: "Haman" }, { label: "C", text: "Officials" }, { label: "D", text: "Princes" }], correctAnswer: "B", verse: "Esther 6:11", explanation: "Haman was humiliated." },
  { id: "esther43", question: "How did Haman react afterward?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Joy" }, { label: "C", text: "Humiliation" }, { label: "D", text: "Confusion" }], correctAnswer: "C", verse: "Esther 6:12", explanation: "He covered his head in grief." },
  { id: "esther44", question: "What warning did Zeresh give?", options: [{ label: "A", text: "Run away" }, { label: "B", text: "You will fall" }, { label: "C", text: "Apologize" }, { label: "D", text: "Attack now" }], correctAnswer: "B", verse: "Esther 6:13", explanation: "She foresaw his downfall." },
  { id: "esther45", question: "What happened at the second banquet?", options: [{ label: "A", text: "A reward" }, { label: "B", text: "Esther revealed her identity" }, { label: "C", text: "A decree was signed" }, { label: "D", text: "A celebration" }], correctAnswer: "B", verse: "Esther 7:3-4", explanation: "Esther exposed the plot." },
  { id: "esther46", question: "Who was exposed as the enemy?", options: [{ label: "A", text: "Mordecai" }, { label: "B", text: "Haman" }, { label: "C", text: "Officials" }, { label: "D", text: "Zeresh" }], correctAnswer: "B", verse: "Esther 7:6", explanation: "Haman was revealed." },
  { id: "esther47", question: "Where did Haman fall before Esther?", options: [{ label: "A", text: "At the gate" }, { label: "B", text: "On the couch" }, { label: "C", text: "In the court" }, { label: "D", text: "In the garden" }], correctAnswer: "B", verse: "Esther 7:8", explanation: "This sealed his fate." },
  { id: "esther48", question: "What happened to Haman?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Imprisonment" }, { label: "C", text: "Executed on the gallows" }, { label: "D", text: "Loss of title" }], correctAnswer: "C", verse: "Esther 7:10", explanation: "He died by his own plan." },
  { id: "esther49", question: "Who received Haman's estate?", options: [{ label: "A", text: "The king" }, { label: "B", text: "Mordecai" }, { label: "C", text: "Esther" }, { label: "D", text: "Zeresh" }], correctAnswer: "C", verse: "Esther 8:1", explanation: "Esther inherited his house." },
  { id: "esther50", question: "What position did Mordecai receive?", options: [{ label: "A", text: "Governor" }, { label: "B", text: "Second in command" }, { label: "C", text: "Priest" }, { label: "D", text: "General" }], correctAnswer: "B", verse: "Esther 8:2", explanation: "Mordecai was elevated." },
  { id: "esther51", question: "Why couldn't the first decree be revoked?", options: [{ label: "A", text: "King refused" }, { label: "B", text: "Persian law" }, { label: "C", text: "Time passed" }, { label: "D", text: "Priests objected" }], correctAnswer: "B", verse: "Esther 8:8", explanation: "Persian laws were irreversible." },
  { id: "esther52", question: "What solution was given instead?", options: [{ label: "A", text: "Delay" }, { label: "B", text: "A counter-decree" }, { label: "C", text: "Negotiation" }, { label: "D", text: "Amnesty" }], correctAnswer: "B", verse: "Esther 8:11", explanation: "Jews were allowed to defend themselves." },
  { id: "esther53", question: "Who wrote the new decree?", options: [{ label: "A", text: "Esther" }, { label: "B", text: "Mordecai" }, { label: "C", text: "The king" }, { label: "D", text: "Scribes" }], correctAnswer: "B", verse: "Esther 8:9", explanation: "Mordecai authored it." },
  { id: "esther54", question: "What clothing did Mordecai wear?", options: [{ label: "A", text: "Sackcloth" }, { label: "B", text: "Royal garments" }, { label: "C", text: "Priestly robes" }, { label: "D", text: "Armor" }], correctAnswer: "B", verse: "Esther 8:15", explanation: "He was publicly honored." },
  { id: "esther55", question: "How did the Jews react?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Joy and gladness" }, { label: "C", text: "Silence" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Esther 8:16-17", explanation: "Joy replaced mourning." },
  { id: "esther56", question: "What happened on the day of attack?", options: [{ label: "A", text: "Jews were destroyed" }, { label: "B", text: "Jews defended themselves" }, { label: "C", text: "War was canceled" }, { label: "D", text: "The king intervened" }], correctAnswer: "B", verse: "Esther 9:1-2", explanation: "The tables were turned." },
  { id: "esther57", question: "How many of Haman's sons were killed?", options: [{ label: "A", text: "5" }, { label: "B", text: "7" }, { label: "C", text: "10" }, { label: "D", text: "12" }], correctAnswer: "C", verse: "Esther 9:7-10", explanation: "All ten sons died." },
  { id: "esther58", question: "What did Esther request after the victory?", options: [{ label: "A", text: "A celebration" }, { label: "B", text: "Another day of defense" }, { label: "C", text: "Rewards" }, { label: "D", text: "Peace treaty" }], correctAnswer: "B", verse: "Esther 9:13", explanation: "She asked for another day." },
  { id: "esther59", question: "What festival was established?", options: [{ label: "A", text: "Passover" }, { label: "B", text: "Purim" }, { label: "C", text: "Booths" }, { label: "D", text: "Weeks" }], correctAnswer: "B", verse: "Esther 9:26", explanation: "Purim commemorates deliverance." },
  { id: "esther60", question: "What does Purim celebrate?", options: [{ label: "A", text: "Temple rebuilding" }, { label: "B", text: "Deliverance from destruction" }, { label: "C", text: "Kingship" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Esther 9:27-28", explanation: "God saved His people." },
  { id: "esther61", question: "What role did Mordecai become known for?", options: [{ label: "A", text: "Military leader" }, { label: "B", text: "Second to the king" }, { label: "C", text: "Temple priest" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Esther 10:3", explanation: "Mordecai rose to power." },
  { id: "esther62", question: "What quality defined Mordecai's leadership?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Seeking the good of his people" }, { label: "C", text: "Ambition" }, { label: "D", text: "Force" }], correctAnswer: "B", verse: "Esther 10:3", explanation: "He sought peace and welfare." },
  { id: "esther63", question: "What is unique about God in Esther?", options: [{ label: "A", text: "God speaks directly" }, { label: "B", text: "God is never mentioned by name" }, { label: "C", text: "God appears visibly" }, { label: "D", text: "God sends prophets" }], correctAnswer: "B", verse: "Esther overview", explanation: "God's name is absent yet His work is clear." },
  { id: "esther64", question: "What theme dominates Esther?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "Providence" }, { label: "C", text: "Prophecy" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Esther overview", explanation: "God works behind the scenes." },
  { id: "esther65", question: "What does Esther show about courage?", options: [{ label: "A", text: "It avoids danger" }, { label: "B", text: "It risks life for others" }, { label: "C", text: "It seeks reward" }, { label: "D", text: "It waits for certainty" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "True courage risks everything." },
  { id: "esther66", question: "What turned the story's direction?", options: [{ label: "A", text: "A battle" }, { label: "B", text: "The king's sleepless night" }, { label: "C", text: "A feast" }, { label: "D", text: "A decree" }], correctAnswer: "B", verse: "Esther 6:1", explanation: "God used a sleepless night." },
  { id: "esther67", question: "What lesson does Haman's fall teach?", options: [{ label: "A", text: "Power lasts" }, { label: "B", text: "Pride leads to destruction" }, { label: "C", text: "Strength wins" }, { label: "D", text: "Planning ensures success" }], correctAnswer: "B", verse: "Esther 7", explanation: "Pride preceded his fall." },
  { id: "esther68", question: "What does Esther show about timing?", options: [{ label: "A", text: "Speed matters most" }, { label: "B", text: "Patience and timing matter" }, { label: "C", text: "Delay is failure" }, { label: "D", text: "Act immediately" }], correctAnswer: "B", verse: "Esther 5-7", explanation: "Esther waited wisely." },
  { id: "esther69", question: "What united the Jews?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Fasting and solidarity" }, { label: "C", text: "Weapons" }, { label: "D", text: "Royal favor" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "They fasted together." },
  { id: "esther70", question: "What preserved the Jews' future?", options: [{ label: "A", text: "Military strength" }, { label: "B", text: "God's unseen hand" }, { label: "C", text: "Political alliances" }, { label: "D", text: "Temple worship" }], correctAnswer: "B", verse: "Esther overview", explanation: "God acted behind the scenes." },
  { id: "esther71", question: "Why is Purim celebrated annually?", options: [{ label: "A", text: "Law required it" }, { label: "B", text: "To remember deliverance" }, { label: "C", text: "Royal command" }, { label: "D", text: "Tradition only" }], correctAnswer: "B", verse: "Esther 9:28", explanation: "It commemorates salvation." },
  { id: "esther72", question: "What does Esther teach about influence?", options: [{ label: "A", text: "Avoid power" }, { label: "B", text: "Use position for others" }, { label: "C", text: "Protect status" }, { label: "D", text: "Stay silent" }], correctAnswer: "B", verse: "Esther 4:14", explanation: "Influence carries responsibility." },
  { id: "esther73", question: "What role did fasting play?", options: [{ label: "A", text: "Tradition" }, { label: "B", text: "Spiritual preparation" }, { label: "C", text: "Public display" }, { label: "D", text: "Political act" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "Fasting preceded action." },
  { id: "esther74", question: "What does Esther reveal about God?", options: [{ label: "A", text: "Distant" }, { label: "B", text: "Sovereign and active" }, { label: "C", text: "Silent forever" }, { label: "D", text: "Unconcerned" }], correctAnswer: "B", verse: "Esther overview", explanation: "God orchestrates events." },
  { id: "esther75", question: "What danger did the Jews face?", options: [{ label: "A", text: "Assimilation" }, { label: "B", text: "Genocide" }, { label: "C", text: "Exile" }, { label: "D", text: "Poverty" }], correctAnswer: "B", verse: "Esther 3", explanation: "They faced total destruction." },
  { id: "esther76", question: "What turned mourning into joy?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Deliverance" }, { label: "C", text: "Power" }, { label: "D", text: "Revenge" }], correctAnswer: "B", verse: "Esther 9:22", explanation: "God reversed their fate." },
  { id: "esther77", question: "What does Esther teach about silence?", options: [{ label: "A", text: "Always safe" }, { label: "B", text: "Can be costly" }, { label: "C", text: "Preferred" }, { label: "D", text: "Neutral" }], correctAnswer: "B", verse: "Esther 4:14", explanation: "Silence would not save Esther." },
  { id: "esther78", question: "What defines true deliverance?", options: [{ label: "A", text: "Power shift" }, { label: "B", text: "Reversal of fate" }, { label: "C", text: "Military victory" }, { label: "D", text: "Escape" }], correctAnswer: "B", verse: "Esther 9:1", explanation: "The tables were turned." },
  { id: "esther79", question: "What role did courage play?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential" }, { label: "C", text: "Minor" }, { label: "D", text: "Delayed" }], correctAnswer: "B", verse: "Esther 4-5", explanation: "Courage was necessary." },
  { id: "esther80", question: "What preserved Jewish identity?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Unity and remembrance" }, { label: "C", text: "Kings" }, { label: "D", text: "Walls" }], correctAnswer: "B", verse: "Esther 9", explanation: "Purim kept the memory alive." },
  { id: "esther81", question: "What does Esther show about coincidence?", options: [{ label: "A", text: "Random events" }, { label: "B", text: "Divine orchestration" }, { label: "C", text: "Human control" }, { label: "D", text: "Chance only" }], correctAnswer: "B", verse: "Esther overview", explanation: "Nothing was accidental." },
  { id: "esther82", question: "Why is Esther still read today?", options: [{ label: "A", text: "History only" }, { label: "B", text: "Hope under threat" }, { label: "C", text: "Royal drama" }, { label: "D", text: "Legal teaching" }], correctAnswer: "B", verse: "Esther overview", explanation: "It teaches hope and deliverance." },
  { id: "esther83", question: "What lesson does Mordecai model?", options: [{ label: "A", text: "Compromise" }, { label: "B", text: "Faithfulness without recognition" }, { label: "C", text: "Ambition" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Esther 2-6", explanation: "Faithfulness was eventually rewarded." },
  { id: "esther84", question: "What does Esther teach about leadership?", options: [{ label: "A", text: "Avoid risk" }, { label: "B", text: "Serve others sacrificially" }, { label: "C", text: "Seek power" }, { label: "D", text: "Maintain image" }], correctAnswer: "B", verse: "Esther 4-7", explanation: "Leadership required sacrifice." },
  { id: "esther85", question: "What brought downfall to Haman?", options: [{ label: "A", text: "Bad timing" }, { label: "B", text: "Pride and hatred" }, { label: "C", text: "Weak planning" }, { label: "D", text: "Enemies" }], correctAnswer: "B", verse: "Esther 3-7", explanation: "Pride led to destruction." },
  { id: "esther86", question: "What ensured justice for the Jews?", options: [{ label: "A", text: "Revenge" }, { label: "B", text: "Legal protection" }, { label: "C", text: "Power grab" }, { label: "D", text: "Negotiation" }], correctAnswer: "B", verse: "Esther 8", explanation: "The counter-decree allowed defense." },
  { id: "esther87", question: "What did joy replace?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Mourning" }, { label: "C", text: "Confusion" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Esther 9:22", explanation: "God reversed their sorrow." },
  { id: "esther88", question: "What does Esther reveal about deliverance?", options: [{ label: "A", text: "Always obvious" }, { label: "B", text: "Often hidden" }, { label: "C", text: "Instant" }, { label: "D", text: "Guaranteed" }], correctAnswer: "B", verse: "Esther overview", explanation: "God worked unseen." },
  { id: "esther89", question: "What message does Purim reinforce?", options: [{ label: "A", text: "Victory through strength" }, { label: "B", text: "Remember God's faithfulness" }, { label: "C", text: "Fear enemies" }, { label: "D", text: "Honor kings" }], correctAnswer: "B", verse: "Esther 9:28", explanation: "God's faithfulness is remembered." },
  { id: "esther90", question: "What does Esther show about timing and obedience?", options: [{ label: "A", text: "Delay is failure" }, { label: "B", text: "Obedience requires wisdom" }, { label: "C", text: "Act immediately" }, { label: "D", text: "Wait forever" }], correctAnswer: "B", verse: "Esther 5-7", explanation: "Wisdom guided obedience." },
  { id: "esther91", question: "What safeguarded the Jewish people?", options: [{ label: "A", text: "Walls" }, { label: "B", text: "God's providence" }, { label: "C", text: "Weapons" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Esther overview", explanation: "God preserved His people." },
  { id: "esther92", question: "What does Esther teach about fear?", options: [{ label: "A", text: "Avoid it" }, { label: "B", text: "Act despite it" }, { label: "C", text: "Let it rule" }, { label: "D", text: "Ignore danger" }], correctAnswer: "B", verse: "Esther 4:16", explanation: "Esther acted despite fear." },
  { id: "esther93", question: "What defined Mordecai's loyalty?", options: [{ label: "A", text: "The king" }, { label: "B", text: "God and his people" }, { label: "C", text: "Power" }, { label: "D", text: "Safety" }], correctAnswer: "B", verse: "Esther 3-4", explanation: "He remained faithful." },
  { id: "esther94", question: "What does Esther show about remembrance?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential for identity" }, { label: "C", text: "Temporary" }, { label: "D", text: "Cultural only" }], correctAnswer: "B", verse: "Esther 9", explanation: "Remembering preserves faith." },
  { id: "esther95", question: "Why is Esther placed among historical books?", options: [{ label: "A", text: "Prophecy" }, { label: "B", text: "God's work in history" }, { label: "C", text: "Law teaching" }, { label: "D", text: "Poetry" }], correctAnswer: "B", verse: "Esther overview", explanation: "It records God's acts in history." },
  { id: "esther96", question: "What theme ties Esther to exile books?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "Preservation of God's people" }, { label: "C", text: "Temple worship" }, { label: "D", text: "Military success" }], correctAnswer: "B", verse: "Exile context", explanation: "God preserved Israel in exile." },
  { id: "esther97", question: "What does Esther teach about unseen faith?", options: [{ label: "A", text: "It is weak" }, { label: "B", text: "It is powerful" }, { label: "C", text: "It is risky" }, { label: "D", text: "It is temporary" }], correctAnswer: "B", verse: "Esther overview", explanation: "God works even when unseen." },
  { id: "esther98", question: "What is Esther's lasting message?", options: [{ label: "A", text: "Fear kings" }, { label: "B", text: "God protects His people" }, { label: "C", text: "Seek power" }, { label: "D", text: "Avoid danger" }], correctAnswer: "B", verse: "Esther overview", explanation: "God remains faithful." },
  { id: "esther99", question: "What does Esther show about destiny?", options: [{ label: "A", text: "Fixed" }, { label: "B", text: "Guided by God" }, { label: "C", text: "Random" }, { label: "D", text: "Earned" }], correctAnswer: "B", verse: "Esther 4:14", explanation: "God places people purposefully." },
  { id: "esther100", question: "What is the ultimate theme of Esther?", options: [{ label: "A", text: "Royal power" }, { label: "B", text: "God's providence and deliverance" }, { label: "C", text: "Law obedience" }, { label: "D", text: "Political survival" }], correctAnswer: "B", verse: "Esther overview", explanation: "God delivers His people." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EstherTriviaPage() {
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
          .eq("book", "esther");

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
          book: "esther",
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
            book: "esther",
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
    if (score === 10) return "Perfect! You're an Esther expert!";
    if (score >= 8) return "Excellent! You know Esther well!";
    if (score >= 6) return "Good job! Keep studying Esther!";
    if (score >= 4) return "Nice try! Esther has much to explore!";
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
              href="/bible-trivia/esther"
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
