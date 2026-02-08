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
  { id: "habakkuk1", question: "Who is the author of the book of Habakkuk?", options: [{ label: "A", text: "Zephaniah" }, { label: "B", text: "Habakkuk" }, { label: "C", text: "Nahum" }, { label: "D", text: "Micah" }], correctAnswer: "B", verse: "Habakkuk 1:1", explanation: "The prophecy is attributed to Habakkuk." },
  { id: "habakkuk2", question: "How is the book of Habakkuk described in its opening?", options: [{ label: "A", text: "A vision" }, { label: "B", text: "A burden" }, { label: "C", text: "A song" }, { label: "D", text: "A letter" }], correctAnswer: "B", verse: "Habakkuk 1:1", explanation: "It is described as a burden." },
  { id: "habakkuk3", question: "What form does much of Habakkuk take?", options: [{ label: "A", text: "Narrative" }, { label: "B", text: "Dialogue with God" }, { label: "C", text: "Genealogy" }, { label: "D", text: "Law code" }], correctAnswer: "B", verse: "Habakkuk 1-2", explanation: "Habakkuk questions God directly." },
  { id: "habakkuk4", question: "What problem does Habakkuk first complain about?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Violence and injustice" }, { label: "C", text: "Exile" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Habakkuk 1:2-4", explanation: "He cries out against injustice." },
  { id: "habakkuk5", question: "How long does Habakkuk say he has cried out?", options: [{ label: "A", text: "One year" }, { label: "B", text: "For a long time" }, { label: "C", text: "Forty days" }, { label: "D", text: "Seven years" }], correctAnswer: "B", verse: "Habakkuk 1:2", explanation: "He expresses prolonged frustration." },
  { id: "habakkuk6", question: "What does Habakkuk accuse God of tolerating?", options: [{ label: "A", text: "Poverty" }, { label: "B", text: "Wrongdoing" }, { label: "C", text: "Ignorance" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Habakkuk 1:3", explanation: "He questions God's silence toward evil." },
  { id: "habakkuk7", question: "What seems paralyzed according to Habakkuk?", options: [{ label: "A", text: "The army" }, { label: "B", text: "The law" }, { label: "C", text: "The prophets" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Habakkuk 1:4", explanation: "Justice is distorted." },
  { id: "habakkuk8", question: "Who surrounds the righteous?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "The wicked" }, { label: "C", text: "Angels" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Habakkuk 1:4", explanation: "The wicked oppress the righteous." },
  { id: "habakkuk9", question: "What does God tell Habakkuk to look at?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "The nations" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Habakkuk 1:5", explanation: "God points to global events." },
  { id: "habakkuk10", question: "What reaction does God say people will have?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Amazement" }, { label: "C", text: "Faith" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Habakkuk 1:5", explanation: "God's work is shocking." },
  { id: "habakkuk11", question: "Which nation does God raise up?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Babylon" }, { label: "C", text: "Egypt" }, { label: "D", text: "Persia" }], correctAnswer: "B", verse: "Habakkuk 1:6", explanation: "The Babylonians are God's instrument." },
  { id: "habakkuk12", question: "How are the Babylonians described?", options: [{ label: "A", text: "Gentle" }, { label: "B", text: "Ruthless and fierce" }, { label: "C", text: "Faithful" }, { label: "D", text: "Patient" }], correctAnswer: "B", verse: "Habakkuk 1:6-7", explanation: "They are feared conquerors." },
  { id: "habakkuk13", question: "What do the Babylonians do to nations?", options: [{ label: "A", text: "Convert them" }, { label: "B", text: "Conquer them" }, { label: "C", text: "Trade with them" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Habakkuk 1:7-10", explanation: "They sweep across the earth." },
  { id: "habakkuk14", question: "What imagery is used for their speed?", options: [{ label: "A", text: "Doves" }, { label: "B", text: "Leopards" }, { label: "C", text: "Oxen" }, { label: "D", text: "Snakes" }], correctAnswer: "B", verse: "Habakkuk 1:8", explanation: "Leopards symbolize speed." },
  { id: "habakkuk15", question: "What do they mock?", options: [{ label: "A", text: "Kings and fortresses" }, { label: "B", text: "Prophets" }, { label: "C", text: "God" }, { label: "D", text: "The poor" }], correctAnswer: "A", verse: "Habakkuk 1:10", explanation: "They fear no defenses." },
  { id: "habakkuk16", question: "What do they attribute their power to?", options: [{ label: "A", text: "God" }, { label: "B", text: "Their own strength" }, { label: "C", text: "Allies" }, { label: "D", text: "Wisdom" }], correctAnswer: "B", verse: "Habakkuk 1:11", explanation: "They become guilty of pride." },
  { id: "habakkuk17", question: "How does Habakkuk respond to God's answer?", options: [{ label: "A", text: "With praise" }, { label: "B", text: "With another question" }, { label: "C", text: "With silence" }, { label: "D", text: "With obedience" }], correctAnswer: "B", verse: "Habakkuk 1:12-17", explanation: "He struggles with God's method." },
  { id: "habakkuk18", question: "What troubles Habakkuk about Babylon?", options: [{ label: "A", text: "Their weakness" }, { label: "B", text: "Their greater wickedness" }, { label: "C", text: "Their faith" }, { label: "D", text: "Their poverty" }], correctAnswer: "B", verse: "Habakkuk 1:13", explanation: "Why use a more wicked nation?" },
  { id: "habakkuk19", question: "How does Habakkuk describe humanity?", options: [{ label: "A", text: "Like sheep" }, { label: "B", text: "Like fish" }, { label: "C", text: "Like lions" }, { label: "D", text: "Like trees" }], correctAnswer: "B", verse: "Habakkuk 1:14", explanation: "People are treated as prey." },
  { id: "habakkuk20", question: "What tool imagery is used for Babylon?", options: [{ label: "A", text: "Sword" }, { label: "B", text: "Net" }, { label: "C", text: "Plow" }, { label: "D", text: "Bow" }], correctAnswer: "B", verse: "Habakkuk 1:15", explanation: "They gather nations like fish." },
  { id: "habakkuk21", question: "What does Babylon do after conquering?", options: [{ label: "A", text: "Repent" }, { label: "B", text: "Rejoice and worship their net" }, { label: "C", text: "Rest" }, { label: "D", text: "Withdraw" }], correctAnswer: "B", verse: "Habakkuk 1:16", explanation: "They worship their own power." },
  { id: "habakkuk22", question: "What question closes chapter 1?", options: [{ label: "A", text: "Will God forgive?" }, { label: "B", text: "Will Babylon keep destroying?" }, { label: "C", text: "Will Judah repent?" }, { label: "D", text: "Will the law return?" }], correctAnswer: "B", verse: "Habakkuk 1:17", explanation: "Habakkuk presses for justice." },
  { id: "habakkuk23", question: "Where does Habakkuk position himself in chapter 2?", options: [{ label: "A", text: "The temple" }, { label: "B", text: "The watchtower" }, { label: "C", text: "The city gate" }, { label: "D", text: "The palace" }], correctAnswer: "B", verse: "Habakkuk 2:1", explanation: "He waits for God's answer." },
  { id: "habakkuk24", question: "What is Habakkuk waiting to see?", options: [{ label: "A", text: "A sign" }, { label: "B", text: "God's reply" }, { label: "C", text: "An army" }, { label: "D", text: "A vision" }], correctAnswer: "B", verse: "Habakkuk 2:1", explanation: "He expects correction." },
  { id: "habakkuk25", question: "What does God tell Habakkuk to do with the vision?", options: [{ label: "A", text: "Hide it" }, { label: "B", text: "Write it plainly" }, { label: "C", text: "Sing it" }, { label: "D", text: "Seal it" }], correctAnswer: "B", verse: "Habakkuk 2:2", explanation: "The message must be clear." },
  { id: "habakkuk26", question: "Why must the vision be written plainly?", options: [{ label: "A", text: "So priests can read it" }, { label: "B", text: "So a runner may read it" }, { label: "C", text: "So kings can read it" }, { label: "D", text: "So children can read it" }], correctAnswer: "B", verse: "Habakkuk 2:2", explanation: "Urgency and clarity." },
  { id: "habakkuk27", question: "What does God say about the vision's timing?", options: [{ label: "A", text: "Immediate" }, { label: "B", text: "It awaits its appointed time" }, { label: "C", text: "Never" }, { label: "D", text: "Uncertain" }], correctAnswer: "B", verse: "Habakkuk 2:3", explanation: "God's timing is fixed." },
  { id: "habakkuk28", question: "What should people do if the vision seems slow?", options: [{ label: "A", text: "Ignore it" }, { label: "B", text: "Wait for it" }, { label: "C", text: "Change it" }, { label: "D", text: "Doubt it" }], correctAnswer: "B", verse: "Habakkuk 2:3", explanation: "Faith requires patience." },
  { id: "habakkuk29", question: "Who is described as puffed up?", options: [{ label: "A", text: "The righteous" }, { label: "B", text: "The proud" }, { label: "C", text: "The poor" }, { label: "D", text: "The faithful" }], correctAnswer: "B", verse: "Habakkuk 2:4", explanation: "Pride contrasts faith." },
  { id: "habakkuk30", question: "How will the righteous live?", options: [{ label: "A", text: "By strength" }, { label: "B", text: "By faith" }, { label: "C", text: "By law" }, { label: "D", text: "By wisdom" }], correctAnswer: "B", verse: "Habakkuk 2:4", explanation: "A central biblical truth." },
  { id: "habakkuk31", question: "What sin is addressed in the first woe?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Greed and plunder" }, { label: "C", text: "Pride in worship" }, { label: "D", text: "False prophecy" }], correctAnswer: "B", verse: "Habakkuk 2:6", explanation: "Plundering nations." },
  { id: "habakkuk32", question: "What will the plundered do?", options: [{ label: "A", text: "Submit" }, { label: "B", text: "Rise against Babylon" }, { label: "C", text: "Forget" }, { label: "D", text: "Celebrate" }], correctAnswer: "B", verse: "Habakkuk 2:7", explanation: "Reversal of power." },
  { id: "habakkuk33", question: "What does Babylon heap up?", options: [{ label: "A", text: "Silver and gold" }, { label: "B", text: "Debt and stolen goods" }, { label: "C", text: "Allies" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "Habakkuk 2:6", explanation: "Ill-gotten gain." },
  { id: "habakkuk34", question: "What is the second woe against?", options: [{ label: "A", text: "Violence" }, { label: "B", text: "Building unjust gain" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Drunkenness" }], correctAnswer: "B", verse: "Habakkuk 2:9", explanation: "Selfish security." },
  { id: "habakkuk35", question: "What do builders seek to avoid?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Shame" }, { label: "C", text: "Enemies" }, { label: "D", text: "Poverty" }], correctAnswer: "B", verse: "Habakkuk 2:9", explanation: "False security." },
  { id: "habakkuk36", question: "What cries out from the wall?", options: [{ label: "A", text: "Blood" }, { label: "B", text: "Stones" }, { label: "C", text: "Voices" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Habakkuk 2:11", explanation: "Injustice testifies." },
  { id: "habakkuk37", question: "What answers from the woodwork?", options: [{ label: "A", text: "Beams" }, { label: "B", text: "Timbers" }, { label: "C", text: "Doors" }, { label: "D", text: "Altars" }], correctAnswer: "B", verse: "Habakkuk 2:11", explanation: "Structures condemn builders." },
  { id: "habakkuk38", question: "What is the third woe against?", options: [{ label: "A", text: "Bloodshed and violence" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Greed" }, { label: "D", text: "False worship" }], correctAnswer: "A", verse: "Habakkuk 2:12", explanation: "Cities built on blood." },
  { id: "habakkuk39", question: "What will nations labor for in vain?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Fire" }, { label: "C", text: "The Lord's glory" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Habakkuk 2:13", explanation: "Futility of evil work." },
  { id: "habakkuk40", question: "What will fill the earth?", options: [{ label: "A", text: "Violence" }, { label: "B", text: "Knowledge of the Lord's glory" }, { label: "C", text: "Empires" }, { label: "D", text: "Darkness" }], correctAnswer: "B", verse: "Habakkuk 2:14", explanation: "Hope beyond judgment." },
  { id: "habakkuk41", question: "What is the fourth woe against?", options: [{ label: "A", text: "Drunkenness and shame" }, { label: "B", text: "Greed" }, { label: "C", text: "Idolatry" }, { label: "D", text: "Pride" }], correctAnswer: "A", verse: "Habakkuk 2:15", explanation: "Humiliating others." },
  { id: "habakkuk42", question: "What does Babylon pour out?", options: [{ label: "A", text: "Wrath" }, { label: "B", text: "Wine" }, { label: "C", text: "Blood" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Habakkuk 2:15", explanation: "Drunken exposure." },
  { id: "habakkuk43", question: "What will Babylon be filled with instead of glory?", options: [{ label: "A", text: "Honor" }, { label: "B", text: "Shame" }, { label: "C", text: "Fear" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Habakkuk 2:16", explanation: "Reversal of pride." },
  { id: "habakkuk44", question: "What violence is remembered?", options: [{ label: "A", text: "Against cities" }, { label: "B", text: "Against Lebanon" }, { label: "C", text: "Against Egypt" }, { label: "D", text: "Against Judah" }], correctAnswer: "B", verse: "Habakkuk 2:17", explanation: "Environmental destruction." },
  { id: "habakkuk45", question: "What is the fifth woe against?", options: [{ label: "A", text: "False prophecy" }, { label: "B", text: "Idolatry" }, { label: "C", text: "Violence" }, { label: "D", text: "Greed" }], correctAnswer: "B", verse: "Habakkuk 2:18", explanation: "Worshiping man-made gods." },
  { id: "habakkuk46", question: "What cannot idols do?", options: [{ label: "A", text: "Move" }, { label: "B", text: "Speak" }, { label: "C", text: "Shine" }, { label: "D", text: "Stand" }], correctAnswer: "B", verse: "Habakkuk 2:18-19", explanation: "They are lifeless." },
  { id: "habakkuk47", question: "What is there no breath in?", options: [{ label: "A", text: "People" }, { label: "B", text: "Idols" }, { label: "C", text: "Animals" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Habakkuk 2:19", explanation: "Idols are dead." },
  { id: "habakkuk48", question: "Where is the Lord?", options: [{ label: "A", text: "In idols" }, { label: "B", text: "In His holy temple" }, { label: "C", text: "In Babylon" }, { label: "D", text: "In nature only" }], correctAnswer: "B", verse: "Habakkuk 2:20", explanation: "God reigns." },
  { id: "habakkuk49", question: "What should all the earth do?", options: [{ label: "A", text: "Celebrate" }, { label: "B", text: "Be silent before Him" }, { label: "C", text: "Question Him" }, { label: "D", text: "Fear Babylon" }], correctAnswer: "B", verse: "Habakkuk 2:20", explanation: "Reverent silence." },
  { id: "habakkuk50", question: "What literary form is Habakkuk 3?", options: [{ label: "A", text: "Complaint" }, { label: "B", text: "Prayer and hymn" }, { label: "C", text: "Law" }, { label: "D", text: "Narrative" }], correctAnswer: "B", verse: "Habakkuk 3:1", explanation: "A poetic prayer." },
  { id: "habakkuk51", question: "What does Habakkuk ask God to revive?", options: [{ label: "A", text: "The law" }, { label: "B", text: "His work" }, { label: "C", text: "The temple" }, { label: "D", text: "The king" }], correctAnswer: "B", verse: "Habakkuk 3:2", explanation: "Renew God's deeds." },
  { id: "habakkuk52", question: "What does Habakkuk ask God to remember?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Mercy" }, { label: "C", text: "Covenant" }, { label: "D", text: "Sacrifice" }], correctAnswer: "B", verse: "Habakkuk 3:2", explanation: "Mercy amid wrath." },
  { id: "habakkuk53", question: "From where does God come poetically?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Teman" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Assyria" }], correctAnswer: "B", verse: "Habakkuk 3:3", explanation: "Theophany imagery." },
  { id: "habakkuk54", question: "What covers the heavens?", options: [{ label: "A", text: "Darkness" }, { label: "B", text: "God's glory" }, { label: "C", text: "Clouds" }, { label: "D", text: "Fire" }], correctAnswer: "B", verse: "Habakkuk 3:3", explanation: "Majestic presence." },
  { id: "habakkuk55", question: "What fills the earth?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Praise" }, { label: "C", text: "Violence" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Habakkuk 3:3", explanation: "God's glory praised." },
  { id: "habakkuk56", question: "What goes before God?", options: [{ label: "A", text: "Angels" }, { label: "B", text: "Plague" }, { label: "C", text: "Kings" }, { label: "D", text: "Clouds" }], correctAnswer: "B", verse: "Habakkuk 3:5", explanation: "Judgment imagery." },
  { id: "habakkuk57", question: "What follows at His feet?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Pestilence" }, { label: "C", text: "Light" }, { label: "D", text: "Water" }], correctAnswer: "B", verse: "Habakkuk 3:5", explanation: "Power and judgment." },
  { id: "habakkuk58", question: "What does God do to the earth?", options: [{ label: "A", text: "Blesses it" }, { label: "B", text: "Shakes it" }, { label: "C", text: "Destroys it" }, { label: "D", text: "Leaves it" }], correctAnswer: "B", verse: "Habakkuk 3:6", explanation: "Cosmic response." },
  { id: "habakkuk59", question: "What happens to mountains?", options: [{ label: "A", text: "Grow" }, { label: "B", text: "Crumbled" }, { label: "C", text: "Freeze" }, { label: "D", text: "Disappear" }], correctAnswer: "B", verse: "Habakkuk 3:6", explanation: "God's power displayed." },
  { id: "habakkuk60", question: "Whose ways are eternal?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord's" }, { label: "C", text: "Nations" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Habakkuk 3:6", explanation: "God's sovereignty." },
  { id: "habakkuk61", question: "What tents tremble?", options: [{ label: "A", text: "Israel's" }, { label: "B", text: "Cushan's" }, { label: "C", text: "Babylon's" }, { label: "D", text: "Judah's" }], correctAnswer: "B", verse: "Habakkuk 3:7", explanation: "Nations fear God." },
  { id: "habakkuk62", question: "What curtains shake?", options: [{ label: "A", text: "Midian's" }, { label: "B", text: "Egypt's" }, { label: "C", text: "Assyria's" }, { label: "D", text: "Moab's" }], correctAnswer: "A", verse: "Habakkuk 3:7", explanation: "God's presence terrifies." },
  { id: "habakkuk63", question: "Is God angry with rivers?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No, it's symbolic" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Habakkuk 3:8", explanation: "Symbolic of power." },
  { id: "habakkuk64", question: "What does God ride on?", options: [{ label: "A", text: "Horses" }, { label: "B", text: "Chariots of salvation" }, { label: "C", text: "Clouds" }, { label: "D", text: "Winds" }], correctAnswer: "B", verse: "Habakkuk 3:8", explanation: "Salvation imagery." },
  { id: "habakkuk65", question: "What is uncovered?", options: [{ label: "A", text: "The earth" }, { label: "B", text: "God's bow" }, { label: "C", text: "The temple" }, { label: "D", text: "The law" }], correctAnswer: "B", verse: "Habakkuk 3:9", explanation: "Judgment readiness." },
  { id: "habakkuk66", question: "What splits the earth?", options: [{ label: "A", text: "Fire" }, { label: "B", text: "Rivers" }, { label: "C", text: "Wind" }, { label: "D", text: "Earthquake" }], correctAnswer: "B", verse: "Habakkuk 3:9", explanation: "Creation responds." },
  { id: "habakkuk67", question: "What stands still?", options: [{ label: "A", text: "Mountains" }, { label: "B", text: "Sun and moon" }, { label: "C", text: "Nations" }, { label: "D", text: "Stars" }], correctAnswer: "B", verse: "Habakkuk 3:11", explanation: "Cosmic imagery." },
  { id: "habakkuk68", question: "What marches through the land?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "The Lord in indignation" }, { label: "C", text: "Armies" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Habakkuk 3:12", explanation: "Divine judgment." },
  { id: "habakkuk69", question: "What does God thresh?", options: [{ label: "A", text: "Israel" }, { label: "B", text: "The nations" }, { label: "C", text: "The land" }, { label: "D", text: "The sea" }], correctAnswer: "B", verse: "Habakkuk 3:12", explanation: "Judgment on oppressors." },
  { id: "habakkuk70", question: "Why does God go forth?", options: [{ label: "A", text: "To destroy creation" }, { label: "B", text: "To save His people" }, { label: "C", text: "To test faith" }, { label: "D", text: "To punish prophets" }], correctAnswer: "B", verse: "Habakkuk 3:13", explanation: "Salvation motive." },
  { id: "habakkuk71", question: "Whose head is crushed?", options: [{ label: "A", text: "The poor" }, { label: "B", text: "The house of the wicked" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Habakkuk 3:13", explanation: "Defeat of evil." },
  { id: "habakkuk72", question: "What emotion does Habakkuk feel?", options: [{ label: "A", text: "Joy" }, { label: "B", text: "Fear and trembling" }, { label: "C", text: "Anger" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Habakkuk 3:16", explanation: "Awe before God." },
  { id: "habakkuk73", question: "What happens to Habakkuk's lips?", options: [{ label: "A", text: "Sing" }, { label: "B", text: "Quiver" }, { label: "C", text: "Speak boldly" }, { label: "D", text: "Fall silent" }], correctAnswer: "B", verse: "Habakkuk 3:16", explanation: "Physical reaction." },
  { id: "habakkuk74", question: "What does Habakkuk resolve to do?", options: [{ label: "A", text: "Fight" }, { label: "B", text: "Wait quietly" }, { label: "C", text: "Flee" }, { label: "D", text: "Question God" }], correctAnswer: "B", verse: "Habakkuk 3:16", explanation: "Trustful patience." },
  { id: "habakkuk75", question: "What if the fig tree does not blossom?", options: [{ label: "A", text: "Despair" }, { label: "B", text: "Still rejoice in the Lord" }, { label: "C", text: "Complain" }, { label: "D", text: "Abandon faith" }], correctAnswer: "B", verse: "Habakkuk 3:17-18", explanation: "Faith beyond circumstances." },
  { id: "habakkuk76", question: "What agricultural failures are listed?", options: [{ label: "A", text: "Fig, vine, olive" }, { label: "B", text: "Wheat only" }, { label: "C", text: "Grapes only" }, { label: "D", text: "Barley only" }], correctAnswer: "A", verse: "Habakkuk 3:17", explanation: "Total loss scenario." },
  { id: "habakkuk77", question: "What animal losses are mentioned?", options: [{ label: "A", text: "Horses" }, { label: "B", text: "Sheep and cattle" }, { label: "C", text: "Camels" }, { label: "D", text: "Donkeys" }], correctAnswer: "B", verse: "Habakkuk 3:17", explanation: "Complete economic collapse." },
  { id: "habakkuk78", question: "In whom does Habakkuk rejoice?", options: [{ label: "A", text: "The nation" }, { label: "B", text: "The Lord" }, { label: "C", text: "The law" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Habakkuk 3:18", explanation: "Joy rooted in God." },
  { id: "habakkuk79", question: "Who is Habakkuk's strength?", options: [{ label: "A", text: "Himself" }, { label: "B", text: "The Sovereign Lord" }, { label: "C", text: "The army" }, { label: "D", text: "Allies" }], correctAnswer: "B", verse: "Habakkuk 3:19", explanation: "Dependence on God." },
  { id: "habakkuk80", question: "What does God make his feet like?", options: [{ label: "A", text: "Lions" }, { label: "B", text: "Deer" }, { label: "C", text: "Oxen" }, { label: "D", text: "Eagles" }], correctAnswer: "B", verse: "Habakkuk 3:19", explanation: "Sure-footed faith." },
  { id: "habakkuk81", question: "Where does God enable him to walk?", options: [{ label: "A", text: "Valleys" }, { label: "B", text: "High places" }, { label: "C", text: "Cities" }, { label: "D", text: "Deserts" }], correctAnswer: "B", verse: "Habakkuk 3:19", explanation: "Victory and confidence." },
  { id: "habakkuk82", question: "What musical note ends the book?", options: [{ label: "A", text: "Selah" }, { label: "B", text: "For the director of music" }, { label: "C", text: "Amen" }, { label: "D", text: "Hallelujah" }], correctAnswer: "B", verse: "Habakkuk 3:19", explanation: "Liturgical ending." },
  { id: "habakkuk83", question: "What theme dominates Habakkuk?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Faith amid confusion" }, { label: "C", text: "Kingship" }, { label: "D", text: "Genealogy" }], correctAnswer: "B", verse: "Habakkuk", explanation: "Trusting God's ways." },
  { id: "habakkuk84", question: "What key verse is quoted in the New Testament?", options: [{ label: "A", text: "Habakkuk 1:5" }, { label: "B", text: "Habakkuk 2:4" }, { label: "C", text: "Habakkuk 3:2" }, { label: "D", text: "Habakkuk 3:19" }], correctAnswer: "B", verse: "Habakkuk 2:4", explanation: "Foundational faith verse." },
  { id: "habakkuk85", question: "What contrast drives the book?", options: [{ label: "A", text: "Rich and poor" }, { label: "B", text: "Pride and faith" }, { label: "C", text: "Israel and nations" }, { label: "D", text: "Law and mercy" }], correctAnswer: "B", verse: "Habakkuk 2:4", explanation: "Faith vs pride." },
  { id: "habakkuk86", question: "What does Habakkuk teach about God?", options: [{ label: "A", text: "He is indifferent" }, { label: "B", text: "He is sovereign" }, { label: "C", text: "He is unpredictable" }, { label: "D", text: "He is distant" }], correctAnswer: "B", verse: "Habakkuk", explanation: "God rules history." },
  { id: "habakkuk87", question: "What does Habakkuk model for believers?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Honest questioning with faith" }, { label: "C", text: "Rebellion" }, { label: "D", text: "Withdrawal" }], correctAnswer: "B", verse: "Habakkuk", explanation: "Faithful dialogue." },
  { id: "habakkuk88", question: "What happens before rejoicing?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Fear and waiting" }, { label: "C", text: "Exile" }, { label: "D", text: "Silence" }], correctAnswer: "B", verse: "Habakkuk 3", explanation: "Faith grows through tension." },
  { id: "habakkuk89", question: "What does Habakkuk ultimately choose?", options: [{ label: "A", text: "Understanding" }, { label: "B", text: "Trust" }, { label: "C", text: "Escape" }, { label: "D", text: "Control" }], correctAnswer: "B", verse: "Habakkuk 3:18-19", explanation: "Trust over clarity." },
  { id: "habakkuk90", question: "What phrase summarizes Habakkuk's message?", options: [{ label: "A", text: "God is silent" }, { label: "B", text: "The righteous live by faith" }, { label: "C", text: "Judgment is final" }, { label: "D", text: "Nations rule" }], correctAnswer: "B", verse: "Habakkuk 2:4", explanation: "Central theme." },
  { id: "habakkuk91", question: "What is Habakkuk's final tone?", options: [{ label: "A", text: "Anger" }, { label: "B", text: "Confidence" }, { label: "C", text: "Despair" }, { label: "D", text: "Confusion" }], correctAnswer: "B", verse: "Habakkuk 3:18-19", explanation: "Confident faith." },
  { id: "habakkuk92", question: "What does Habakkuk show about suffering?", options: [{ label: "A", text: "It ends faith" }, { label: "B", text: "It can deepen faith" }, { label: "C", text: "It is meaningless" }, { label: "D", text: "It should be ignored" }], correctAnswer: "B", verse: "Habakkuk", explanation: "Growth through hardship." },
  { id: "habakkuk93", question: "What does Habakkuk not receive?", options: [{ label: "A", text: "Answers to everything" }, { label: "B", text: "God's presence" }, { label: "C", text: "Strength" }, { label: "D", text: "Joy" }], correctAnswer: "A", verse: "Habakkuk", explanation: "Faith without full clarity." },
  { id: "habakkuk94", question: "What does Habakkuk gain?", options: [{ label: "A", text: "Control" }, { label: "B", text: "Trust in God" }, { label: "C", text: "Power" }, { label: "D", text: "Wealth" }], correctAnswer: "B", verse: "Habakkuk 3", explanation: "Deepened faith." },
  { id: "habakkuk95", question: "What does Habakkuk teach about waiting?", options: [{ label: "A", text: "It is passive" }, { label: "B", text: "It is active faith" }, { label: "C", text: "It is pointless" }, { label: "D", text: "It is fearful" }], correctAnswer: "B", verse: "Habakkuk 2:3", explanation: "Waiting with trust." },
  { id: "habakkuk96", question: "What does Habakkuk affirm about God's plans?", options: [{ label: "A", text: "They fail" }, { label: "B", text: "They will surely come" }, { label: "C", text: "They change" }, { label: "D", text: "They are unclear" }], correctAnswer: "B", verse: "Habakkuk 2:3", explanation: "Certainty of fulfillment." },
  { id: "habakkuk97", question: "What does Habakkuk reveal about prayer?", options: [{ label: "A", text: "It avoids questions" }, { label: "B", text: "It can include complaints" }, { label: "C", text: "It is always praise" }, { label: "D", text: "It replaces faith" }], correctAnswer: "B", verse: "Habakkuk 1-3", explanation: "Honest prayer." },
  { id: "habakkuk98", question: "What does Habakkuk emphasize over outcomes?", options: [{ label: "A", text: "Understanding" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Strength" }, { label: "D", text: "Victory" }], correctAnswer: "B", verse: "Habakkuk", explanation: "Faithfulness matters most." },
  { id: "habakkuk99", question: "What lasting message does Habakkuk leave?", options: [{ label: "A", text: "God explains everything" }, { label: "B", text: "Trust God even when confused" }, { label: "C", text: "Avoid questions" }, { label: "D", text: "Judgment always comes first" }], correctAnswer: "B", verse: "Habakkuk", explanation: "Trust amid uncertainty." },
  { id: "habakkuk100", question: "How does Habakkuk move through the book?", options: [{ label: "A", text: "From praise to doubt" }, { label: "B", text: "From doubt to faith" }, { label: "C", text: "From silence to anger" }, { label: "D", text: "From judgment to despair" }], correctAnswer: "B", verse: "Habakkuk 1-3", explanation: "Faith's journey." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HabakkukTriviaPage() {
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
          .eq("book", "habakkuk");

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
          book: "habakkuk",
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
            book: "habakkuk",
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
    if (score === 10) return "Perfect! You're a Habakkuk expert!";
    if (score >= 8) return "Excellent! You know Habakkuk well!";
    if (score >= 6) return "Good job! Keep studying Habakkuk!";
    if (score >= 4) return "Nice try! Habakkuk has much to explore!";
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
              href="/bible-trivia/habakkuk"
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
