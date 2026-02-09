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
  { id: "zephaniah1", question: "Who is the author of the book of Zephaniah?", options: [{ label: "A", text: "Habakkuk" }, { label: "B", text: "Zephaniah" }, { label: "C", text: "Nahum" }, { label: "D", text: "Haggai" }], correctAnswer: "B", verse: "Zephaniah 1:1", explanation: "The book is attributed to the prophet Zephaniah." },
  { id: "zephaniah2", question: "During whose reign did Zephaniah prophesy?", options: [{ label: "A", text: "Manasseh" }, { label: "B", text: "Josiah" }, { label: "C", text: "Hezekiah" }, { label: "D", text: "Jehoiakim" }], correctAnswer: "B", verse: "Zephaniah 1:1", explanation: "Zephaniah prophesied during King Josiah's reign." },
  { id: "zephaniah3", question: "Zephaniah traces his lineage back to whom?", options: [{ label: "A", text: "David" }, { label: "B", text: "Hezekiah" }, { label: "C", text: "Solomon" }, { label: "D", text: "Isaiah" }], correctAnswer: "B", verse: "Zephaniah 1:1", explanation: "He is linked to King Hezekiah." },
  { id: "zephaniah4", question: "What is the main theme of Zephaniah?", options: [{ label: "A", text: "Restoration only" }, { label: "B", text: "The Day of the Lord" }, { label: "C", text: "Wisdom" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Zephaniah", explanation: "The Day of the Lord dominates the book." },
  { id: "zephaniah5", question: "What does God say He will sweep away?", options: [{ label: "A", text: "Only nations" }, { label: "B", text: "Everything from the face of the earth" }, { label: "C", text: "Jerusalem only" }, { label: "D", text: "Idols only" }], correctAnswer: "B", verse: "Zephaniah 1:2", explanation: "Total judgment language." },
  { id: "zephaniah6", question: "What will be swept away with humanity?", options: [{ label: "A", text: "Cities" }, { label: "B", text: "Animals and birds" }, { label: "C", text: "Mountains" }, { label: "D", text: "Stars" }], correctAnswer: "B", verse: "Zephaniah 1:3", explanation: "Creation-wide judgment." },
  { id: "zephaniah7", question: "Against which city is judgment first declared?", options: [{ label: "A", text: "Samaria" }, { label: "B", text: "Jerusalem" }, { label: "C", text: "Nineveh" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Zephaniah 1:4", explanation: "Judgment begins with Judah." },
  { id: "zephaniah8", question: "Which false worship is condemned?", options: [{ label: "A", text: "Baal worship" }, { label: "B", text: "Golden calf worship" }, { label: "C", text: "Asherah poles only" }, { label: "D", text: "Molech alone" }], correctAnswer: "A", verse: "Zephaniah 1:4", explanation: "Baal worship persisted in Judah." },
  { id: "zephaniah9", question: "Who worships on rooftops?", options: [{ label: "A", text: "The priests" }, { label: "B", text: "Star worshipers" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zephaniah 1:5", explanation: "Astral worship is condemned." },
  { id: "zephaniah10", question: "What divided loyalty is condemned?", options: [{ label: "A", text: "God and Baal" }, { label: "B", text: "God and Molech" }, { label: "C", text: "God and business" }, { label: "D", text: "God and kings" }], correctAnswer: "B", verse: "Zephaniah 1:5", explanation: "Syncretism is rejected." },
  { id: "zephaniah11", question: "Who have turned back from following the Lord?", options: [{ label: "A", text: "Foreigners" }, { label: "B", text: "God's own people" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Zephaniah 1:6", explanation: "Apostasy among Judah." },
  { id: "zephaniah12", question: "What does the Lord prepare?", options: [{ label: "A", text: "A feast" }, { label: "B", text: "A sacrifice" }, { label: "C", text: "A covenant" }, { label: "D", text: "A temple" }], correctAnswer: "B", verse: "Zephaniah 1:7", explanation: "Judgment is portrayed as a sacrifice." },
  { id: "zephaniah13", question: "Who are consecrated for the sacrifice?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Invited guests" }, { label: "C", text: "Prophets" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Zephaniah 1:7", explanation: "Nations are summoned." },
  { id: "zephaniah14", question: "Which group is punished for foreign clothing?", options: [{ label: "A", text: "Merchants" }, { label: "B", text: "Officials and royal sons" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zephaniah 1:8", explanation: "Symbol of compromise." },
  { id: "zephaniah15", question: "What practice is condemned at thresholds?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Pagan superstition" }, { label: "C", text: "Prayer" }, { label: "D", text: "Trade" }], correctAnswer: "B", verse: "Zephaniah 1:9", explanation: "Philistine custom rejected." },
  { id: "zephaniah16", question: "What will be heard in Jerusalem?", options: [{ label: "A", text: "Songs" }, { label: "B", text: "Cries and wailing" }, { label: "C", text: "Trumpets of victory" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Zephaniah 1:10", explanation: "Judgment brings mourning." },
  { id: "zephaniah17", question: "Which district is mentioned?", options: [{ label: "A", text: "Fish Gate" }, { label: "B", text: "Sheep Gate" }, { label: "C", text: "Temple Gate" }, { label: "D", text: "East Gate" }], correctAnswer: "A", verse: "Zephaniah 1:10", explanation: "Specific locations named." },
  { id: "zephaniah18", question: "Who are silenced?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "Merchants" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Zephaniah 1:11", explanation: "Economic judgment." },
  { id: "zephaniah19", question: "What will happen to silver and gold?", options: [{ label: "A", text: "Saved" }, { label: "B", text: "Unable to deliver" }, { label: "C", text: "Blessed" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Zephaniah 1:18", explanation: "Wealth offers no rescue." },
  { id: "zephaniah20", question: "What day is near?", options: [{ label: "A", text: "Day of restoration" }, { label: "B", text: "The Day of the Lord" }, { label: "C", text: "Sabbath day" }, { label: "D", text: "Feast day" }], correctAnswer: "B", verse: "Zephaniah 1:14", explanation: "Imminent judgment." },
  { id: "zephaniah21", question: "How is the Day of the Lord described?", options: [{ label: "A", text: "Joyful" }, { label: "B", text: "Dark and bitter" }, { label: "C", text: "Peaceful" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Zephaniah 1:15", explanation: "A terrifying day." },
  { id: "zephaniah22", question: "What will warriors cry?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Bitter cries" }, { label: "C", text: "Praise" }, { label: "D", text: "Mercy" }], correctAnswer: "B", verse: "Zephaniah 1:14", explanation: "Even the strong despair." },
  { id: "zephaniah23", question: "What emotions define the Day?", options: [{ label: "A", text: "Joy and peace" }, { label: "B", text: "Distress and anguish" }, { label: "C", text: "Hope and comfort" }, { label: "D", text: "Rest and silence" }], correctAnswer: "B", verse: "Zephaniah 1:15", explanation: "Overwhelming judgment." },
  { id: "zephaniah24", question: "What natural imagery is used?", options: [{ label: "A", text: "Rain" }, { label: "B", text: "Darkness and clouds" }, { label: "C", text: "Fire only" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "Zephaniah 1:15", explanation: "Cosmic upheaval." },
  { id: "zephaniah25", question: "What sounds accompany the day?", options: [{ label: "A", text: "Harps" }, { label: "B", text: "Trumpets and battle cries" }, { label: "C", text: "Silence" }, { label: "D", text: "Laughter" }], correctAnswer: "B", verse: "Zephaniah 1:16", explanation: "War imagery." },
  { id: "zephaniah26", question: "Who is brought into distress?", options: [{ label: "A", text: "Foreigners" }, { label: "B", text: "All humanity" }, { label: "C", text: "Priests only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Zephaniah 1:17", explanation: "Universal impact." },
  { id: "zephaniah27", question: "Why are people punished?", options: [{ label: "A", text: "Ignorance" }, { label: "B", text: "Sin against the Lord" }, { label: "C", text: "Weakness" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Zephaniah 1:17", explanation: "Moral accountability." },
  { id: "zephaniah28", question: "What is poured out like dust?", options: [{ label: "A", text: "Tears" }, { label: "B", text: "Blood" }, { label: "C", text: "Ashes" }, { label: "D", text: "Gold" }], correctAnswer: "B", verse: "Zephaniah 1:17", explanation: "Graphic judgment imagery." },
  { id: "zephaniah29", question: "What is compared to dung?", options: [{ label: "A", text: "Idols" }, { label: "B", text: "Flesh" }, { label: "C", text: "Wealth" }, { label: "D", text: "Cities" }], correctAnswer: "B", verse: "Zephaniah 1:17", explanation: "Total humiliation." },
  { id: "zephaniah30", question: "What cannot save on that day?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Silver and gold" }, { label: "C", text: "Repentance" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Zephaniah 1:18", explanation: "Material wealth fails." },
  { id: "zephaniah31", question: "What call opens Zephaniah 2?", options: [{ label: "A", text: "Rejoice" }, { label: "B", text: "Gather and repent" }, { label: "C", text: "Mourn" }, { label: "D", text: "Fast" }], correctAnswer: "B", verse: "Zephaniah 2:1", explanation: "A call to humility." },
  { id: "zephaniah32", question: "Who is urged to seek the Lord?", options: [{ label: "A", text: "The proud" }, { label: "B", text: "The humble of the land" }, { label: "C", text: "Kings" }, { label: "D", text: "Foreigners" }], correctAnswer: "B", verse: "Zephaniah 2:3", explanation: "Humility offers hope." },
  { id: "zephaniah33", question: "What might the humble be spared from?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "The Lord's anger" }, { label: "C", text: "Poverty" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Zephaniah 2:3", explanation: "Possible refuge." },
  { id: "zephaniah34", question: "Which region is judged first in chapter 2?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Philistia" }, { label: "C", text: "Assyria" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Zephaniah 2:4", explanation: "Coastal cities condemned." },
  { id: "zephaniah35", question: "Which city will be deserted?", options: [{ label: "A", text: "Gaza" }, { label: "B", text: "Ashkelon" }, { label: "C", text: "Ashdod" }, { label: "D", text: "All listed" }], correctAnswer: "D", verse: "Zephaniah 2:4", explanation: "Complete desolation." },
  { id: "zephaniah36", question: "Who will possess the land?", options: [{ label: "A", text: "Philistines" }, { label: "B", text: "The remnant of Judah" }, { label: "C", text: "Assyria" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Zephaniah 2:7", explanation: "Restoration promise." },
  { id: "zephaniah37", question: "Which nations mock God's people?", options: [{ label: "A", text: "Moab and Ammon" }, { label: "B", text: "Egypt and Cush" }, { label: "C", text: "Assyria and Babylon" }, { label: "D", text: "Philistia only" }], correctAnswer: "A", verse: "Zephaniah 2:8", explanation: "Arrogant neighbors." },
  { id: "zephaniah38", question: "How will Moab become?", options: [{ label: "A", text: "Prosperous" }, { label: "B", text: "Like Sodom" }, { label: "C", text: "Like Jerusalem" }, { label: "D", text: "Like Egypt" }], correctAnswer: "B", verse: "Zephaniah 2:9", explanation: "Utter destruction." },
  { id: "zephaniah39", question: "What sin leads to their downfall?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pride" }, { label: "C", text: "Ignorance" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Zephaniah 2:10", explanation: "Arrogance before God." },
  { id: "zephaniah40", question: "Who else is judged?", options: [{ label: "A", text: "Cushites" }, { label: "B", text: "Persians" }, { label: "C", text: "Greeks" }, { label: "D", text: "Romans" }], correctAnswer: "A", verse: "Zephaniah 2:12", explanation: "Southern nations included." },
  { id: "zephaniah41", question: "Which empire is directly condemned?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Assyria" }, { label: "C", text: "Persia" }, { label: "D", text: "Rome" }], correctAnswer: "B", verse: "Zephaniah 2:13", explanation: "Assyria's fall foretold." },
  { id: "zephaniah42", question: "What will happen to Nineveh?", options: [{ label: "A", text: "It will repent" }, { label: "B", text: "It will become desolate" }, { label: "C", text: "It will prosper" }, { label: "D", text: "It will rule longer" }], correctAnswer: "B", verse: "Zephaniah 2:13", explanation: "Echoes Nahum." },
  { id: "zephaniah43", question: "What will lie down in Nineveh?", options: [{ label: "A", text: "Armies" }, { label: "B", text: "Animals" }, { label: "C", text: "Kings" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Zephaniah 2:14", explanation: "City becomes wilderness." },
  { id: "zephaniah44", question: "How will passersby react?", options: [{ label: "A", text: "Celebrate" }, { label: "B", text: "Sneer and hiss" }, { label: "C", text: "Pray" }, { label: "D", text: "Ignore" }], correctAnswer: "B", verse: "Zephaniah 2:15", explanation: "Mockery of fallen pride." },
  { id: "zephaniah45", question: "What city says, 'I am the one'?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Babylon" }, { label: "D", text: "Moab" }], correctAnswer: "B", verse: "Zephaniah 2:15", explanation: "Self-exalting arrogance." },
  { id: "zephaniah46", question: "What chapter turns back to Jerusalem?", options: [{ label: "A", text: "1" }, { label: "B", text: "3" }, { label: "C", text: "2" }, { label: "D", text: "4" }], correctAnswer: "B", verse: "Zephaniah 3", explanation: "Judgment and restoration." },
  { id: "zephaniah47", question: "How is Jerusalem described?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Rebellious and defiled" }, { label: "C", text: "Humble" }, { label: "D", text: "Holy" }], correctAnswer: "B", verse: "Zephaniah 3:1", explanation: "Corruption within." },
  { id: "zephaniah48", question: "Who are accused of roaring?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Officials" }, { label: "C", text: "Prophets" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "Zephaniah 3:3", explanation: "Leadership corruption." },
  { id: "zephaniah49", question: "Who are compared to evening wolves?", options: [{ label: "A", text: "Judges" }, { label: "B", text: "Merchants" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests" }], correctAnswer: "A", verse: "Zephaniah 3:3", explanation: "Greedy justice." },
  { id: "zephaniah50", question: "How are prophets described?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Unstable and treacherous" }, { label: "C", text: "Silent" }, { label: "D", text: "Strong" }], correctAnswer: "B", verse: "Zephaniah 3:4", explanation: "False leadership." },
  { id: "zephaniah51", question: "What do priests do wrong?", options: [{ label: "A", text: "Ignore the law" }, { label: "B", text: "Profane the sanctuary" }, { label: "C", text: "Leave the temple" }, { label: "D", text: "Serve idols only" }], correctAnswer: "B", verse: "Zephaniah 3:4", explanation: "Sacred corruption." },
  { id: "zephaniah52", question: "What does the Lord never fail to do?", options: [{ label: "A", text: "Forgive" }, { label: "B", text: "Do justice" }, { label: "C", text: "Speak" }, { label: "D", text: "Judge" }], correctAnswer: "B", verse: "Zephaniah 3:5", explanation: "God's righteousness." },
  { id: "zephaniah53", question: "Do the unjust feel shame?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }], correctAnswer: "B", verse: "Zephaniah 3:5", explanation: "Hardened hearts." },
  { id: "zephaniah54", question: "What did God hope would result?", options: [{ label: "A", text: "Fear and correction" }, { label: "B", text: "Exile" }, { label: "C", text: "Silence" }, { label: "D", text: "Destruction" }], correctAnswer: "A", verse: "Zephaniah 3:7", explanation: "Opportunity to repent." },
  { id: "zephaniah55", question: "Did Jerusalem accept correction?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }], correctAnswer: "B", verse: "Zephaniah 3:7", explanation: "Persistent rebellion." },
  { id: "zephaniah56", question: "What does God decide to do next?", options: [{ label: "A", text: "Withdraw" }, { label: "B", text: "Pour out wrath on nations" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Ignore sin" }], correctAnswer: "B", verse: "Zephaniah 3:8", explanation: "Global judgment." },
  { id: "zephaniah57", question: "What will God purify?", options: [{ label: "A", text: "Cities" }, { label: "B", text: "The lips of the peoples" }, { label: "C", text: "The land only" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Zephaniah 3:9", explanation: "Restoration begins." },
  { id: "zephaniah58", question: "What will people call on?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The name of the Lord" }, { label: "C", text: "Idols" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Zephaniah 3:9", explanation: "Unified worship." },
  { id: "zephaniah59", question: "Who will remain in Jerusalem?", options: [{ label: "A", text: "The proud" }, { label: "B", text: "A humble and lowly people" }, { label: "C", text: "Kings" }, { label: "D", text: "Priests only" }], correctAnswer: "B", verse: "Zephaniah 3:12", explanation: "Purified remnant." },
  { id: "zephaniah60", question: "What will the remnant do?", options: [{ label: "A", text: "Practice deceit" }, { label: "B", text: "Speak no lies" }, { label: "C", text: "Rule nations" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Zephaniah 3:13", explanation: "Transformed character." },
  { id: "zephaniah61", question: "What emotion replaces fear?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Joy" }, { label: "C", text: "Silence" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Zephaniah 3:14", explanation: "Restoration leads to joy." },
  { id: "zephaniah62", question: "What is daughter Zion told to do?", options: [{ label: "A", text: "Mourn" }, { label: "B", text: "Sing and rejoice" }, { label: "C", text: "Fast" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Zephaniah 3:14", explanation: "Celebration of salvation." },
  { id: "zephaniah63", question: "What has the Lord taken away?", options: [{ label: "A", text: "Enemies" }, { label: "B", text: "Judgments against you" }, { label: "C", text: "Wealth" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Zephaniah 3:15", explanation: "Reversal of judgment." },
  { id: "zephaniah64", question: "Who is in the midst of Jerusalem?", options: [{ label: "A", text: "The king" }, { label: "B", text: "The Lord" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Zephaniah 3:15", explanation: "God's presence restored." },
  { id: "zephaniah65", question: "What will God do for His people?", options: [{ label: "A", text: "Condemn them" }, { label: "B", text: "Rejoice over them with singing" }, { label: "C", text: "Test them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "Deep divine joy." },
  { id: "zephaniah66", question: "How is God described in Zephaniah 3:17?", options: [{ label: "A", text: "Silent" }, { label: "B", text: "Mighty to save" }, { label: "C", text: "Distant" }, { label: "D", text: "Angry" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "Salvific power." },
  { id: "zephaniah67", question: "What does God quiet with His love?", options: [{ label: "A", text: "Nations" }, { label: "B", text: "Fears" }, { label: "C", text: "Accusations" }, { label: "D", text: "All anxiety" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "Peace from God." },
  { id: "zephaniah68", question: "What happens to the lame?", options: [{ label: "A", text: "Cast out" }, { label: "B", text: "Rescued" }, { label: "C", text: "Ignored" }, { label: "D", text: "Punished" }], correctAnswer: "B", verse: "Zephaniah 3:19", explanation: "Compassion restored." },
  { id: "zephaniah69", question: "What happens to the outcast?", options: [{ label: "A", text: "Destroyed" }, { label: "B", text: "Gathered" }, { label: "C", text: "Forgotten" }, { label: "D", text: "Scattered" }], correctAnswer: "B", verse: "Zephaniah 3:19", explanation: "Restoration promise." },
  { id: "zephaniah70", question: "What replaces shame?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Praise and honor" }, { label: "C", text: "Fear" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Zephaniah 3:19", explanation: "Honor restored." },
  { id: "zephaniah71", question: "What will God bring back?", options: [{ label: "A", text: "Exiles" }, { label: "B", text: "Kings" }, { label: "C", text: "Armies" }, { label: "D", text: "Wealth" }], correctAnswer: "A", verse: "Zephaniah 3:20", explanation: "Return from captivity." },
  { id: "zephaniah72", question: "What will God give His people?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Fame and praise" }, { label: "C", text: "Weapons" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Zephaniah 3:20", explanation: "Public restoration." },
  { id: "zephaniah73", question: "When will restoration occur?", options: [{ label: "A", text: "Someday" }, { label: "B", text: "Before your eyes" }, { label: "C", text: "In secret" }, { label: "D", text: "After exile only" }], correctAnswer: "B", verse: "Zephaniah 3:20", explanation: "Visible fulfillment." },
  { id: "zephaniah74", question: "What major shift occurs in the book?", options: [{ label: "A", text: "Judgment to restoration" }, { label: "B", text: "Restoration to judgment" }, { label: "C", text: "Law to wisdom" }, { label: "D", text: "Exile to exile" }], correctAnswer: "A", verse: "Zephaniah 3", explanation: "Hope follows judgment." },
  { id: "zephaniah75", question: "What does Zephaniah teach about God?", options: [{ label: "A", text: "He ignores sin" }, { label: "B", text: "He judges and restores" }, { label: "C", text: "He changes" }, { label: "D", text: "He is distant" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Balanced justice and mercy." },
  { id: "zephaniah76", question: "What defines the faithful remnant?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Humility and trust" }, { label: "C", text: "Wealth" }, { label: "D", text: "Strength" }], correctAnswer: "B", verse: "Zephaniah 3:12", explanation: "Character over status." },
  { id: "zephaniah77", question: "What does Zephaniah say about pride?", options: [{ label: "A", text: "It saves" }, { label: "B", text: "It is removed" }, { label: "C", text: "It is rewarded" }, { label: "D", text: "It is ignored" }], correctAnswer: "B", verse: "Zephaniah 3:11", explanation: "Pride is purged." },
  { id: "zephaniah78", question: "What does God rejoice over?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "His people" }, { label: "C", text: "Judgment" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "God delights in His people." },
  { id: "zephaniah79", question: "What does Zephaniah emphasize about the Day of the Lord?", options: [{ label: "A", text: "It is only future" }, { label: "B", text: "It includes judgment and salvation" }, { label: "C", text: "It is symbolic only" }, { label: "D", text: "It excludes Israel" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Both warning and hope." },
  { id: "zephaniah80", question: "What final emotion closes the book?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Joy and hope" }, { label: "C", text: "Anger" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Zephaniah 3:17-20", explanation: "Restoration completed." },
  { id: "zephaniah81", question: "What does Zephaniah reveal about repentance?", options: [{ label: "A", text: "It is useless" }, { label: "B", text: "It offers refuge" }, { label: "C", text: "It is forced" }, { label: "D", text: "It is ignored" }], correctAnswer: "B", verse: "Zephaniah 2:3", explanation: "Seek humility." },
  { id: "zephaniah82", question: "What does Zephaniah say about nations?", options: [{ label: "A", text: "They rule forever" }, { label: "B", text: "They are accountable to God" }, { label: "C", text: "They are innocent" }, { label: "D", text: "They are ignored" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Universal accountability." },
  { id: "zephaniah83", question: "What role does humility play?", options: [{ label: "A", text: "Weakness" }, { label: "B", text: "Protection" }, { label: "C", text: "Irrelevance" }, { label: "D", text: "Delay" }], correctAnswer: "B", verse: "Zephaniah 2:3", explanation: "Humility invites mercy." },
  { id: "zephaniah84", question: "What does Zephaniah show about God's nearness?", options: [{ label: "A", text: "God withdraws" }, { label: "B", text: "God dwells among His people" }, { label: "C", text: "God observes only" }, { label: "D", text: "God is silent" }], correctAnswer: "B", verse: "Zephaniah 3:15-17", explanation: "Immanuel theme." },
  { id: "zephaniah85", question: "What replaces judgment at the end?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Praise" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Zephaniah 3", explanation: "Transformation complete." },
  { id: "zephaniah86", question: "What does Zephaniah teach about hope?", options: [{ label: "A", text: "It depends on power" }, { label: "B", text: "It is rooted in God" }, { label: "C", text: "It fades quickly" }, { label: "D", text: "It is uncertain" }], correctAnswer: "B", verse: "Zephaniah", explanation: "God-centered hope." },
  { id: "zephaniah87", question: "What does Zephaniah say about fear?", options: [{ label: "A", text: "It dominates forever" }, { label: "B", text: "It will be removed" }, { label: "C", text: "It grows stronger" }, { label: "D", text: "It is required" }], correctAnswer: "B", verse: "Zephaniah 3:15", explanation: "Fear gives way to peace." },
  { id: "zephaniah88", question: "What is God's final action?", options: [{ label: "A", text: "Destroy all nations" }, { label: "B", text: "Restore His people" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Delay judgment" }], correctAnswer: "B", verse: "Zephaniah 3:20", explanation: "Restoration triumphs." },
  { id: "zephaniah89", question: "What lasting image does Zephaniah give of God?", options: [{ label: "A", text: "Warrior" }, { label: "B", text: "Singing Savior" }, { label: "C", text: "Judge only" }, { label: "D", text: "Silent king" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "God rejoices over His people." },
  { id: "zephaniah90", question: "What does Zephaniah emphasize about obedience?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Essential" }, { label: "C", text: "Cultural" }, { label: "D", text: "Temporary" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Covenant faithfulness." },
  { id: "zephaniah91", question: "What does Zephaniah show about God's justice?", options: [{ label: "A", text: "Selective" }, { label: "B", text: "Universal" }, { label: "C", text: "Delayed forever" }, { label: "D", text: "Symbolic only" }], correctAnswer: "B", verse: "Zephaniah", explanation: "All are accountable." },
  { id: "zephaniah92", question: "What defines the end of Zephaniah?", options: [{ label: "A", text: "Wrath" }, { label: "B", text: "Redemption" }, { label: "C", text: "Silence" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Zephaniah 3", explanation: "Hope restored." },
  { id: "zephaniah93", question: "What does Zephaniah teach about God's plans?", options: [{ label: "A", text: "They fail" }, { label: "B", text: "They accomplish judgment and mercy" }, { label: "C", text: "They change constantly" }, { label: "D", text: "They are hidden forever" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Purposeful sovereignty." },
  { id: "zephaniah94", question: "What posture is encouraged?", options: [{ label: "A", text: "Pride" }, { label: "B", text: "Humility" }, { label: "C", text: "Aggression" }, { label: "D", text: "Independence" }], correctAnswer: "B", verse: "Zephaniah 2:3", explanation: "Seek the Lord." },
  { id: "zephaniah95", question: "What does Zephaniah warn against?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Complacency" }, { label: "C", text: "Prayer" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Zephaniah 1", explanation: "Indifference invites judgment." },
  { id: "zephaniah96", question: "What does Zephaniah say about God's presence?", options: [{ label: "A", text: "Temporary" }, { label: "B", text: "Restored among His people" }, { label: "C", text: "Withdrawn" }, { label: "D", text: "Limited" }], correctAnswer: "B", verse: "Zephaniah 3", explanation: "God dwells with His people." },
  { id: "zephaniah97", question: "What is removed from Jerusalem?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "Fear and shame" }, { label: "C", text: "Kings" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Zephaniah 3:15-19", explanation: "Healing restoration." },
  { id: "zephaniah98", question: "What does Zephaniah teach about God's love?", options: [{ label: "A", text: "Conditional only" }, { label: "B", text: "Active and rejoicing" }, { label: "C", text: "Distant" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Zephaniah 3:17", explanation: "God delights in His people." },
  { id: "zephaniah99", question: "What final promise is given?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Gathering and honor" }, { label: "C", text: "Silence" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Zephaniah 3:20", explanation: "Complete restoration." },
  { id: "zephaniah100", question: "Overall, Zephaniah moves from what to what?", options: [{ label: "A", text: "Hope to despair" }, { label: "B", text: "Judgment to joy" }, { label: "C", text: "Law to exile" }, { label: "D", text: "Silence to anger" }], correctAnswer: "B", verse: "Zephaniah", explanation: "Judgment gives way to restoration." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ZephaniahTriviaPage() {
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
          .eq("book", "zephaniah");

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
          book: "zephaniah",
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
            book: "zephaniah",
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
    if (score === 10) return "Perfect! You're a Zephaniah expert!";
    if (score >= 8) return "Excellent! You know Zephaniah well!";
    if (score >= 6) return "Good job! Keep studying Zephaniah!";
    if (score >= 4) return "Nice try! Zephaniah has much to explore!";
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
              href="/bible-trivia/zephaniah"
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

