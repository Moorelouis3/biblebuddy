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
  { id: "obadiah1", question: "Who is the author of the book of Obadiah?", options: [{ label: "A", text: "Jeremiah" }, { label: "B", text: "Obadiah" }, { label: "C", text: "Amos" }, { label: "D", text: "Joel" }], correctAnswer: "B", verse: "Obadiah 1", explanation: "The vision is given to the prophet Obadiah." },
  { id: "obadiah2", question: "What type of book is Obadiah?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Historical narrative" }, { label: "C", text: "Prophetic oracle" }, { label: "D", text: "Wisdom literature" }], correctAnswer: "C", verse: "Obadiah 1", explanation: "Obadiah is a prophetic oracle." },
  { id: "obadiah3", question: "Which nation is the focus of Obadiah's prophecy?", options: [{ label: "A", text: "Moab" }, { label: "B", text: "Edom" }, { label: "C", text: "Assyria" }, { label: "D", text: "Philistia" }], correctAnswer: "B", verse: "Obadiah 1", explanation: "The prophecy is against Edom." },
  { id: "obadiah4", question: "What relationship did Edom have with Israel?", options: [{ label: "A", text: "Enemies only" }, { label: "B", text: "Brother nation" }, { label: "C", text: "Foreign empire" }, { label: "D", text: "Vassal state" }], correctAnswer: "B", verse: "Genesis 25", explanation: "Edom descended from Esau, Jacob's brother." },
  { id: "obadiah5", question: "What sin is central in Obadiah?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Pride" }, { label: "C", text: "False prophecy" }, { label: "D", text: "Sabbath breaking" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "Edom's pride led to its downfall." },
  { id: "obadiah6", question: "What deceived Edom?", options: [{ label: "A", text: "Allies" }, { label: "B", text: "Pride of their heart" }, { label: "C", text: "False prophets" }, { label: "D", text: "Riches" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "Pride blinded Edom." },
  { id: "obadiah7", question: "Where did Edom live?", options: [{ label: "A", text: "Plains" }, { label: "B", text: "Mountains and cliffs" }, { label: "C", text: "River valleys" }, { label: "D", text: "Coastal cities" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "Edom lived in rocky strongholds." },
  { id: "obadiah8", question: "What did Edom believe about its safety?", options: [{ label: "A", text: "God protected them" }, { label: "B", text: "No one could bring them down" }, { label: "C", text: "Allies would save them" }, { label: "D", text: "They needed repentance" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "They trusted their position." },
  { id: "obadiah9", question: "How does God respond to Edom's pride?", options: [{ label: "A", text: "Ignores it" }, { label: "B", text: "Promises humiliation" }, { label: "C", text: "Blesses it" }, { label: "D", text: "Delays action forever" }], correctAnswer: "B", verse: "Obadiah 4", explanation: "God will bring them down." },
  { id: "obadiah10", question: "What imagery is used for Edom's height?", options: [{ label: "A", text: "Tower" }, { label: "B", text: "Eagle" }, { label: "C", text: "Mountain" }, { label: "D", text: "Wall" }], correctAnswer: "B", verse: "Obadiah 4", explanation: "Edom is likened to an eagle." },
  { id: "obadiah11", question: "What will happen even if Edom nests among the stars?", options: [{ label: "A", text: "They remain safe" }, { label: "B", text: "God will bring them down" }, { label: "C", text: "They will rule" }, { label: "D", text: "They will escape" }], correctAnswer: "B", verse: "Obadiah 4", explanation: "No place is beyond God's reach." },
  { id: "obadiah12", question: "What comparison is made with thieves?", options: [{ label: "A", text: "They steal nothing" }, { label: "B", text: "They leave something behind" }, { label: "C", text: "They destroy everything" }, { label: "D", text: "They hide" }], correctAnswer: "B", verse: "Obadiah 5", explanation: "Edom's destruction is complete." },
  { id: "obadiah13", question: "What will be searched out?", options: [{ label: "A", text: "Israel's sins" }, { label: "B", text: "Edom's hidden treasures" }, { label: "C", text: "Prophecies" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Obadiah 6", explanation: "Nothing will remain hidden." },
  { id: "obadiah14", question: "Who betrays Edom?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "Allies" }, { label: "C", text: "Prophets" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Obadiah 7", explanation: "Trusted allies turn against Edom." },
  { id: "obadiah15", question: "What do Edom's allies do?", options: [{ label: "A", text: "Protect them" }, { label: "B", text: "Deceive and overpower them" }, { label: "C", text: "Ignore them" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Obadiah 7", explanation: "Betrayal fulfills judgment." },
  { id: "obadiah16", question: "What will be destroyed from Edom?", options: [{ label: "A", text: "Wealth only" }, { label: "B", text: "Wise men" }, { label: "C", text: "Armies only" }, { label: "D", text: "Cities only" }], correctAnswer: "B", verse: "Obadiah 8", explanation: "Wisdom will fail." },
  { id: "obadiah17", question: "From which place will understanding perish?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Mount Esau" }, { label: "C", text: "Samaria" }, { label: "D", text: "Zion" }], correctAnswer: "B", verse: "Obadiah 8", explanation: "Edom's wisdom collapses." },
  { id: "obadiah18", question: "What happens to Edom's warriors?", options: [{ label: "A", text: "They conquer" }, { label: "B", text: "They are terrified" }, { label: "C", text: "They repent" }, { label: "D", text: "They escape" }], correctAnswer: "B", verse: "Obadiah 9", explanation: "Strength fails." },
  { id: "obadiah19", question: "Why will Edom be destroyed?", options: [{ label: "A", text: "Idolatry only" }, { label: "B", text: "Violence against brother Jacob" }, { label: "C", text: "False worship" }, { label: "D", text: "Ignoring prophets" }], correctAnswer: "B", verse: "Obadiah 10", explanation: "Brotherly betrayal condemned." },
  { id: "obadiah20", question: "What covers Edom?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Shame" }, { label: "C", text: "Darkness" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Obadiah 10", explanation: "Public disgrace follows sin." },
  { id: "obadiah21", question: "What did Edom do on the day of Judah's fall?", options: [{ label: "A", text: "Helped them" }, { label: "B", text: "Stood aloof" }, { label: "C", text: "Prayed" }, { label: "D", text: "Repented" }], correctAnswer: "B", verse: "Obadiah 11", explanation: "They refused to help." },
  { id: "obadiah22", question: "Who entered Jerusalem?", options: [{ label: "A", text: "Israelites" }, { label: "B", text: "Foreigners" }, { label: "C", text: "Priests" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Obadiah 11", explanation: "Enemies invaded the city." },
  { id: "obadiah23", question: "What did Edom do as Jerusalem fell?", options: [{ label: "A", text: "Wept" }, { label: "B", text: "Rejoiced" }, { label: "C", text: "Fled" }, { label: "D", text: "Repented" }], correctAnswer: "B", verse: "Obadiah 12", explanation: "They celebrated Judah's downfall." },
  { id: "obadiah24", question: "What should Edom not have done?", options: [{ label: "A", text: "Spoken proudly" }, { label: "B", text: "Entered the gate" }, { label: "C", text: "Stolen wealth" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Obadiah 12-13", explanation: "Multiple sins listed." },
  { id: "obadiah25", question: "What did Edom loot?", options: [{ label: "A", text: "Temples" }, { label: "B", text: "Judah's wealth" }, { label: "C", text: "Weapons" }, { label: "D", text: "Land deeds" }], correctAnswer: "B", verse: "Obadiah 13", explanation: "They exploited Judah." },
  { id: "obadiah26", question: "What did Edom do to refugees?", options: [{ label: "A", text: "Protected them" }, { label: "B", text: "Captured them" }, { label: "C", text: "Ignored them" }, { label: "D", text: "Fed them" }], correctAnswer: "B", verse: "Obadiah 14", explanation: "They betrayed survivors." },
  { id: "obadiah27", question: "What principle is stated in Obadiah?", options: [{ label: "A", text: "Forgive always" }, { label: "B", text: "As you have done, it will be done to you" }, { label: "C", text: "Mercy triumphs" }, { label: "D", text: "Silence is best" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "Divine justice is reciprocal." },
  { id: "obadiah28", question: "What day is near?", options: [{ label: "A", text: "Harvest day" }, { label: "B", text: "Day of the Lord" }, { label: "C", text: "Restoration day" }, { label: "D", text: "Exile day" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "Judgment is imminent." },
  { id: "obadiah29", question: "Who will the Day of the Lord affect?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "All nations" }, { label: "C", text: "Edom only" }, { label: "D", text: "Judah only" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "Universal judgment." },
  { id: "obadiah30", question: "What will happen to Edom?", options: [{ label: "A", text: "They will survive" }, { label: "B", text: "They will be cut off forever" }, { label: "C", text: "They will repent" }, { label: "D", text: "They will rule" }], correctAnswer: "B", verse: "Obadiah 10", explanation: "Permanent judgment pronounced." },
  { id: "obadiah31", question: "What imagery describes nations drinking judgment?", options: [{ label: "A", text: "Cup" }, { label: "B", text: "River" }, { label: "C", text: "Fire" }, { label: "D", text: "Sword" }], correctAnswer: "A", verse: "Obadiah 16", explanation: "The cup of judgment." },
  { id: "obadiah32", question: "What will the nations do after drinking?", options: [{ label: "A", text: "Rule" }, { label: "B", text: "Become as though they never were" }, { label: "C", text: "Repent" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Obadiah 16", explanation: "Total destruction imagery." },
  { id: "obadiah33", question: "Where will deliverance be found?", options: [{ label: "A", text: "Mount Esau" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "Jerusalem only" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Zion as place of salvation." },
  { id: "obadiah34", question: "What will Mount Zion be?", options: [{ label: "A", text: "Destroyed" }, { label: "B", text: "Holy" }, { label: "C", text: "Abandoned" }, { label: "D", text: "Conquered" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Sanctified and restored." },
  { id: "obadiah35", question: "What will the house of Jacob do?", options: [{ label: "A", text: "Flee" }, { label: "B", text: "Possess their inheritance" }, { label: "C", text: "Be scattered" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Restoration of land." },
  { id: "obadiah36", question: "What is the house of Jacob compared to?", options: [{ label: "A", text: "Water" }, { label: "B", text: "Fire" }, { label: "C", text: "Stone" }, { label: "D", text: "Wind" }], correctAnswer: "B", verse: "Obadiah 18", explanation: "Fire consumes enemies." },
  { id: "obadiah37", question: "What is the house of Esau compared to?", options: [{ label: "A", text: "Iron" }, { label: "B", text: "Stubble" }, { label: "C", text: "Rock" }, { label: "D", text: "Clay" }], correctAnswer: "B", verse: "Obadiah 18", explanation: "Easily consumed." },
  { id: "obadiah38", question: "What will remain of the house of Esau?", options: [{ label: "A", text: "Remnant" }, { label: "B", text: "Nothing" }, { label: "C", text: "King" }, { label: "D", text: "Land" }], correctAnswer: "B", verse: "Obadiah 18", explanation: "Total destruction." },
  { id: "obadiah39", question: "Who has spoken this judgment?", options: [{ label: "A", text: "Obadiah" }, { label: "B", text: "The Lord" }, { label: "C", text: "The prophets" }, { label: "D", text: "The nations" }], correctAnswer: "B", verse: "Obadiah 18", explanation: "God's authority." },
  { id: "obadiah40", question: "Who will possess the Negev?", options: [{ label: "A", text: "Edom" }, { label: "B", text: "People of the Negev" }, { label: "C", text: "Judah" }, { label: "D", text: "Philistines" }], correctAnswer: "B", verse: "Obadiah 19", explanation: "Territorial restoration." },
  { id: "obadiah41", question: "Who will possess the mountains of Esau?", options: [{ label: "A", text: "Edom" }, { label: "B", text: "House of Jacob" }, { label: "C", text: "Philistines" }, { label: "D", text: "Assyrians" }], correctAnswer: "B", verse: "Obadiah 19", explanation: "Reversal of fortunes." },
  { id: "obadiah42", question: "What land will Benjamin possess?", options: [{ label: "A", text: "Gilead" }, { label: "B", text: "Philistine territory" }, { label: "C", text: "Negev" }, { label: "D", text: "Moab" }], correctAnswer: "A", verse: "Obadiah 19", explanation: "Inheritance restored." },
  { id: "obadiah43", question: "What happens to the exiles of Israel?", options: [{ label: "A", text: "They perish" }, { label: "B", text: "They reclaim the land" }, { label: "C", text: "They scatter again" }, { label: "D", text: "They stay captive" }], correctAnswer: "B", verse: "Obadiah 20", explanation: "Restoration promised." },
  { id: "obadiah44", question: "Who will go up Mount Zion?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "Deliverers" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God appoints leaders." },
  { id: "obadiah45", question: "What will they govern?", options: [{ label: "A", text: "Israel only" }, { label: "B", text: "Mount Esau" }, { label: "C", text: "The nations" }, { label: "D", text: "Judah only" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "Edom judged." },
  { id: "obadiah46", question: "Who will the kingdom belong to?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "The Lord" }, { label: "C", text: "Kings" }, { label: "D", text: "Judah" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns supreme." },
  { id: "obadiah47", question: "What is Obadiah's main theme?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Pride and judgment" }, { label: "C", text: "Law" }, { label: "D", text: "Kingship" }], correctAnswer: "B", verse: "Obadiah", explanation: "Pride leads to downfall." },
  { id: "obadiah48", question: "What lesson does Edom teach?", options: [{ label: "A", text: "Strength saves" }, { label: "B", text: "Pride leads to destruction" }, { label: "C", text: "Allies are faithful" }, { label: "D", text: "Silence is wise" }], correctAnswer: "B", verse: "Obadiah", explanation: "Humility before God matters." },
  { id: "obadiah49", question: "What does Obadiah show about God?", options: [{ label: "A", text: "He ignores injustice" }, { label: "B", text: "He judges betrayal" }, { label: "C", text: "He favors nations" }, { label: "D", text: "He is distant" }], correctAnswer: "B", verse: "Obadiah", explanation: "God sees and responds." },
  { id: "obadiah50", question: "What happens to those who mock others' suffering?", options: [{ label: "A", text: "They prosper" }, { label: "B", text: "They face judgment" }, { label: "C", text: "They are ignored" }, { label: "D", text: "They rule" }], correctAnswer: "B", verse: "Obadiah", explanation: "Justice is assured." },
  { id: "obadiah51", question: "What does Obadiah emphasize about brotherhood?", options: [{ label: "A", text: "It is optional" }, { label: "B", text: "Violence against brothers is condemned" }, { label: "C", text: "It is irrelevant" }, { label: "D", text: "It brings power" }], correctAnswer: "B", verse: "Obadiah", explanation: "Brotherly betrayal is serious." },
  { id: "obadiah52", question: "What biblical brothers does Obadiah echo?", options: [{ label: "A", text: "Cain and Abel" }, { label: "B", text: "Jacob and Esau" }, { label: "C", text: "Joseph and brothers" }, { label: "D", text: "Moses and Aaron" }], correctAnswer: "B", verse: "Genesis 25", explanation: "Edom descends from Esau." },
  { id: "obadiah53", question: "What is the shortest book in the Old Testament?", options: [{ label: "A", text: "Nahum" }, { label: "B", text: "Obadiah" }, { label: "C", text: "Haggai" }, { label: "D", text: "Joel" }], correctAnswer: "B", verse: "Obadiah", explanation: "Only one chapter." },
  { id: "obadiah54", question: "How many chapters does Obadiah have?", options: [{ label: "A", text: "One" }, { label: "B", text: "Two" }, { label: "C", text: "Three" }, { label: "D", text: "Four" }], correctAnswer: "A", verse: "Obadiah", explanation: "Single chapter book." },
  { id: "obadiah55", question: "What does Obadiah show about God's justice?", options: [{ label: "A", text: "Delayed forever" }, { label: "B", text: "Certain and measured" }, { label: "C", text: "Unfair" }, { label: "D", text: "Random" }], correctAnswer: "B", verse: "Obadiah", explanation: "God repays deeds." },
  { id: "obadiah56", question: "What hope is offered to Israel?", options: [{ label: "A", text: "Escape only" }, { label: "B", text: "Deliverance and restoration" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Zion will be restored." },
  { id: "obadiah57", question: "What will ultimately be restored?", options: [{ label: "A", text: "Kingship" }, { label: "B", text: "God's rule" }, { label: "C", text: "Trade" }, { label: "D", text: "Cities" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "The kingdom belongs to the Lord." },
  { id: "obadiah58", question: "What is the final declaration of Obadiah?", options: [{ label: "A", text: "Peace forever" }, { label: "B", text: "The kingdom shall be the Lord's" }, { label: "C", text: "Exile remains" }, { label: "D", text: "Judgment ends" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns supreme." },
  { id: "obadiah59", question: "What moral warning does Obadiah give?", options: [{ label: "A", text: "Ignore injustice" }, { label: "B", text: "Do not rejoice over others' downfall" }, { label: "C", text: "Seek power" }, { label: "D", text: "Trust alliances" }], correctAnswer: "B", verse: "Obadiah 12", explanation: "Pride over others' pain is sin." },
  { id: "obadiah60", question: "What lasting truth does Obadiah teach?", options: [{ label: "A", text: "Strength saves" }, { label: "B", text: "God opposes the proud" }, { label: "C", text: "All nations are equal" }, { label: "D", text: "Silence is best" }], correctAnswer: "B", verse: "Obadiah", explanation: "Pride leads to downfall." },
  { id: "obadiah61", question: "What emotion fuels Edom's actions?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pride" }, { label: "C", text: "Love" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "Pride deceives Edom." },
  { id: "obadiah62", question: "What happens when nations exalt themselves?", options: [{ label: "A", text: "They prosper" }, { label: "B", text: "God brings them down" }, { label: "C", text: "They rule forever" }, { label: "D", text: "They are ignored" }], correctAnswer: "B", verse: "Obadiah 4", explanation: "God humbles the proud." },
  { id: "obadiah63", question: "What does Obadiah teach about alliances?", options: [{ label: "A", text: "They are secure" }, { label: "B", text: "They can betray" }, { label: "C", text: "They always save" }, { label: "D", text: "They are eternal" }], correctAnswer: "B", verse: "Obadiah 7", explanation: "Human alliances fail." },
  { id: "obadiah64", question: "What does God see that Edom ignored?", options: [{ label: "A", text: "Sacrifice" }, { label: "B", text: "Violence against Judah" }, { label: "C", text: "Prayer" }, { label: "D", text: "Law" }], correctAnswer: "B", verse: "Obadiah 10-14", explanation: "God sees injustice." },
  { id: "obadiah65", question: "What role does memory play in Obadiah?", options: [{ label: "A", text: "God forgets" }, { label: "B", text: "God remembers wrongdoing" }, { label: "C", text: "People forget" }, { label: "D", text: "History is erased" }], correctAnswer: "B", verse: "Obadiah", explanation: "God remembers deeds." },
  { id: "obadiah66", question: "What happens to Edom's name?", options: [{ label: "A", text: "Honored" }, { label: "B", text: "Cut off" }, { label: "C", text: "Restored" }, { label: "D", text: "Expanded" }], correctAnswer: "B", verse: "Obadiah 10", explanation: "Permanent judgment." },
  { id: "obadiah67", question: "What does Obadiah teach about betrayal?", options: [{ label: "A", text: "It goes unnoticed" }, { label: "B", text: "God judges it" }, { label: "C", text: "It brings blessing" }, { label: "D", text: "It is required" }], correctAnswer: "B", verse: "Obadiah", explanation: "God judges betrayal." },
  { id: "obadiah68", question: "What is Mount Zion associated with?", options: [{ label: "A", text: "Judgment only" }, { label: "B", text: "Deliverance" }, { label: "C", text: "Exile" }, { label: "D", text: "Destruction" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Zion symbolizes salvation." },
  { id: "obadiah69", question: "What happens to those who escape?", options: [{ label: "A", text: "They are punished" }, { label: "B", text: "They become holy" }, { label: "C", text: "They return" }, { label: "D", text: "They flee again" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Restoration includes holiness." },
  { id: "obadiah70", question: "What does Obadiah say about ownership of land?", options: [{ label: "A", text: "It belongs to nations" }, { label: "B", text: "God restores inheritance" }, { label: "C", text: "It is lost forever" }, { label: "D", text: "It is irrelevant" }], correctAnswer: "B", verse: "Obadiah 17-20", explanation: "Inheritance restored by God." },
  { id: "obadiah71", question: "Who ultimately rules?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "The Lord" }, { label: "C", text: "Judah" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God's sovereignty." },
  { id: "obadiah72", question: "What does Obadiah reveal about God's patience?", options: [{ label: "A", text: "It is endless" }, { label: "B", text: "It has limits" }, { label: "C", text: "It is absent" }, { label: "D", text: "It is random" }], correctAnswer: "B", verse: "Obadiah", explanation: "Judgment eventually comes." },
  { id: "obadiah73", question: "What biblical principle is reinforced?", options: [{ label: "A", text: "Survival of the strongest" }, { label: "B", text: "God opposes the proud" }, { label: "C", text: "All paths lead to peace" }, { label: "D", text: "Silence avoids judgment" }], correctAnswer: "B", verse: "Obadiah", explanation: "Pride invites judgment." },
  { id: "obadiah74", question: "What is Obadiah's warning to nations?", options: [{ label: "A", text: "Seek alliances" }, { label: "B", text: "Do not exalt yourselves" }, { label: "C", text: "Trust wealth" }, { label: "D", text: "Ignore Israel" }], correctAnswer: "B", verse: "Obadiah", explanation: "Humility before God." },
  { id: "obadiah75", question: "What hope does Obadiah give Israel?", options: [{ label: "A", text: "Escape only" }, { label: "B", text: "God's kingdom restored" }, { label: "C", text: "Military victory" }, { label: "D", text: "Temporary relief" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns again." },
  { id: "obadiah76", question: "What happens to injustice?", options: [{ label: "A", text: "Ignored" }, { label: "B", text: "Repaid" }, { label: "C", text: "Forgotten" }, { label: "D", text: "Excused" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "Justice is certain." },
  { id: "obadiah77", question: "What does Obadiah show about God's timing?", options: [{ label: "A", text: "Immediate always" }, { label: "B", text: "Sure even if delayed" }, { label: "C", text: "Random" }, { label: "D", text: "Absent" }], correctAnswer: "B", verse: "Obadiah", explanation: "God's timing is perfect." },
  { id: "obadiah78", question: "What sin often precedes downfall?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pride" }, { label: "C", text: "Doubt" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Obadiah 3", explanation: "Pride goes before destruction." },
  { id: "obadiah79", question: "What happens when people trust position?", options: [{ label: "A", text: "They endure" }, { label: "B", text: "They fall" }, { label: "C", text: "They prosper" }, { label: "D", text: "They are saved" }], correctAnswer: "B", verse: "Obadiah 4", explanation: "False security fails." },
  { id: "obadiah80", question: "What does Obadiah teach about revenge?", options: [{ label: "A", text: "Take it" }, { label: "B", text: "God handles it" }, { label: "C", text: "Ignore it" }, { label: "D", text: "Celebrate it" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "God repays." },
  { id: "obadiah81", question: "What does Obadiah reveal about God's rule?", options: [{ label: "A", text: "Temporary" }, { label: "B", text: "Ultimate and final" }, { label: "C", text: "Shared" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns forever." },
  { id: "obadiah82", question: "What warning is implicit for readers?", options: [{ label: "A", text: "Ignore injustice" }, { label: "B", text: "Do not rejoice at others' suffering" }, { label: "C", text: "Seek power" }, { label: "D", text: "Remain silent" }], correctAnswer: "B", verse: "Obadiah 12", explanation: "Compassion matters." },
  { id: "obadiah83", question: "What happens to arrogance?", options: [{ label: "A", text: "It is rewarded" }, { label: "B", text: "It is humbled" }, { label: "C", text: "It is ignored" }, { label: "D", text: "It is praised" }], correctAnswer: "B", verse: "Obadiah", explanation: "God humbles the proud." },
  { id: "obadiah84", question: "What does Obadiah show about God's memory?", options: [{ label: "A", text: "Selective" }, { label: "B", text: "Perfect" }, { label: "C", text: "Weak" }, { label: "D", text: "Fading" }], correctAnswer: "B", verse: "Obadiah", explanation: "God remembers deeds." },
  { id: "obadiah85", question: "What happens to Edom's confidence?", options: [{ label: "A", text: "Strengthened" }, { label: "B", text: "Shattered" }, { label: "C", text: "Transferred" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Obadiah", explanation: "False confidence fails." },
  { id: "obadiah86", question: "What message does Obadiah send to Israel?", options: [{ label: "A", text: "Fear nations" }, { label: "B", text: "God sees and will restore" }, { label: "C", text: "Hide" }, { label: "D", text: "Leave the land" }], correctAnswer: "B", verse: "Obadiah 17-21", explanation: "Hope for restoration." },
  { id: "obadiah87", question: "What does Obadiah affirm about justice?", options: [{ label: "A", text: "Optional" }, { label: "B", text: "Certain" }, { label: "C", text: "Harsh only" }, { label: "D", text: "Human-based" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "Justice is sure." },
  { id: "obadiah88", question: "What is restored after judgment?", options: [{ label: "A", text: "Wealth only" }, { label: "B", text: "God's rule and inheritance" }, { label: "C", text: "Cities only" }, { label: "D", text: "Kings only" }], correctAnswer: "B", verse: "Obadiah 17-21", explanation: "God restores fully." },
  { id: "obadiah89", question: "What does Obadiah teach about power?", options: [{ label: "A", text: "It guarantees safety" }, { label: "B", text: "It cannot oppose God" }, { label: "C", text: "It saves nations" }, { label: "D", text: "It replaces faith" }], correctAnswer: "B", verse: "Obadiah", explanation: "God's power is supreme." },
  { id: "obadiah90", question: "What does the book ultimately point to?", options: [{ label: "A", text: "National rivalry" }, { label: "B", text: "God's sovereignty" }, { label: "C", text: "Human justice" }, { label: "D", text: "Political strategy" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns." },
  { id: "obadiah91", question: "What is the fate of betrayal?", options: [{ label: "A", text: "Reward" }, { label: "B", text: "Judgment" }, { label: "C", text: "Forgetfulness" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Obadiah", explanation: "Betrayal is judged." },
  { id: "obadiah92", question: "What emotion drives mockery?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pride" }, { label: "C", text: "Sadness" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Obadiah 12", explanation: "Pride mocks suffering." },
  { id: "obadiah93", question: "What does Obadiah reveal about God's justice?", options: [{ label: "A", text: "Inconsistent" }, { label: "B", text: "Proportional" }, { label: "C", text: "Random" }, { label: "D", text: "Unfair" }], correctAnswer: "B", verse: "Obadiah 15", explanation: "As you have done, so it will be done." },
  { id: "obadiah94", question: "What outcome awaits Mount Esau?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Judgment" }, { label: "C", text: "Expansion" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Obadiah", explanation: "Judgment is final." },
  { id: "obadiah95", question: "What place symbolizes hope?", options: [{ label: "A", text: "Mount Esau" }, { label: "B", text: "Mount Zion" }, { label: "C", text: "Bethel" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Zion represents salvation." },
  { id: "obadiah96", question: "What does Obadiah say about escape?", options: [{ label: "A", text: "Impossible for all" }, { label: "B", text: "Possible for those in Zion" }, { label: "C", text: "Guaranteed for Edom" }, { label: "D", text: "Not mentioned" }], correctAnswer: "B", verse: "Obadiah 17", explanation: "Deliverance is found in Zion." },
  { id: "obadiah97", question: "What is the final state of God's people?", options: [{ label: "A", text: "Scattered" }, { label: "B", text: "Secure" }, { label: "C", text: "Exiled" }, { label: "D", text: "Silent" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "Security under God's rule." },
  { id: "obadiah98", question: "What is emphasized more than length?", options: [{ label: "A", text: "Style" }, { label: "B", text: "Message" }, { label: "C", text: "Poetry" }, { label: "D", text: "History" }], correctAnswer: "B", verse: "Obadiah", explanation: "Short book, strong message." },
  { id: "obadiah99", question: "What timeless warning does Obadiah give?", options: [{ label: "A", text: "Trust geography" }, { label: "B", text: "Do not exalt yourself" }, { label: "C", text: "Seek alliances" }, { label: "D", text: "Mock enemies" }], correctAnswer: "B", verse: "Obadiah 3-4", explanation: "Humility before God." },
  { id: "obadiah100", question: "What truth closes Obadiah?", options: [{ label: "A", text: "Judgment is final" }, { label: "B", text: "The kingdom belongs to the Lord" }, { label: "C", text: "Israel rules" }, { label: "D", text: "Peace is temporary" }], correctAnswer: "B", verse: "Obadiah 21", explanation: "God reigns forever." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ObadiahTriviaPage() {
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
          .eq("book", "obadiah");

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
          book: "obadiah",
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
            book: "obadiah",
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
    if (score === 10) return "Perfect! You're an Obadiah expert!";
    if (score >= 8) return "Excellent! You know Obadiah well!";
    if (score >= 6) return "Good job! Keep studying Obadiah!";
    if (score >= 4) return "Nice try! Obadiah has much to explore!";
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
              href="/bible-trivia/obadiah"
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

