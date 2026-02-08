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
  { id: "nahum1", question: "Who is the author of the book of Nahum?", options: [{ label: "A", text: "Habakkuk" }, { label: "B", text: "Nahum" }, { label: "C", text: "Micah" }, { label: "D", text: "Zephaniah" }], correctAnswer: "B", verse: "Nahum 1:1", explanation: "The book is attributed to the prophet Nahum." },
  { id: "nahum2", question: "How is the book of Nahum described in its opening?", options: [{ label: "A", text: "A song" }, { label: "B", text: "A vision" }, { label: "C", text: "A lament" }, { label: "D", text: "A prayer" }], correctAnswer: "B", verse: "Nahum 1:1", explanation: "It is described as a vision." },
  { id: "nahum3", question: "Which city is the focus of Nahum’s prophecy?", options: [{ label: "A", text: "Babylon" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Jerusalem" }, { label: "D", text: "Samaria" }], correctAnswer: "B", verse: "Nahum 1:1", explanation: "Nahum prophesies against Nineveh." },
  { id: "nahum4", question: "Nahum is identified as being from where?", options: [{ label: "A", text: "Tekoa" }, { label: "B", text: "Elkosh" }, { label: "C", text: "Moresheth" }, { label: "D", text: "Anathoth" }], correctAnswer: "B", verse: "Nahum 1:1", explanation: "Nahum is called the Elkoshite." },
  { id: "nahum5", question: "Which empire ruled Nineveh?", options: [{ label: "A", text: "Babylonian" }, { label: "B", text: "Assyrian" }, { label: "C", text: "Persian" }, { label: "D", text: "Egyptian" }], correctAnswer: "B", verse: "Nahum", explanation: "Nineveh was the capital of Assyria." },
  { id: "nahum6", question: "How is the Lord described in Nahum 1?", options: [{ label: "A", text: "Indifferent" }, { label: "B", text: "Jealous and avenging" }, { label: "C", text: "Silent" }, { label: "D", text: "Distant" }], correctAnswer: "B", verse: "Nahum 1:2", explanation: "God is jealous and avenges evil." },
  { id: "nahum7", question: "What emotion is attributed to the Lord?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Wrath" }, { label: "C", text: "Confusion" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "Nahum 1:2", explanation: "God’s wrath is directed at evil." },
  { id: "nahum8", question: "How is the Lord slow?", options: [{ label: "A", text: "To forgive" }, { label: "B", text: "To anger" }, { label: "C", text: "To act" }, { label: "D", text: "To judge" }], correctAnswer: "B", verse: "Nahum 1:3", explanation: "God is patient but just." },
  { id: "nahum9", question: "Will the Lord leave the guilty unpunished?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Sometimes" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Nahum 1:3", explanation: "Justice is certain." },
  { id: "nahum10", question: "What natural elements respond to the Lord?", options: [{ label: "A", text: "Fire only" }, { label: "B", text: "Wind, sea, mountains" }, { label: "C", text: "Animals" }, { label: "D", text: "Stars" }], correctAnswer: "B", verse: "Nahum 1:3–5", explanation: "Creation trembles before God." },
  { id: "nahum11", question: "What dries up at God’s rebuke?", options: [{ label: "A", text: "Rivers and seas" }, { label: "B", text: "Mountains" }, { label: "C", text: "Cities" }, { label: "D", text: "Forests" }], correctAnswer: "A", verse: "Nahum 1:4", explanation: "God controls nature." },
  { id: "nahum12", question: "What happens to the mountains?", options: [{ label: "A", text: "Grow" }, { label: "B", text: "Quake" }, { label: "C", text: "Freeze" }, { label: "D", text: "Bloom" }], correctAnswer: "B", verse: "Nahum 1:5", explanation: "God’s presence shakes creation." },
  { id: "nahum13", question: "Who can stand before the Lord’s wrath?", options: [{ label: "A", text: "Kings" }, { label: "B", text: "No one" }, { label: "C", text: "Prophets" }, { label: "D", text: "Priests" }], correctAnswer: "B", verse: "Nahum 1:6", explanation: "God’s power is unmatched." },
  { id: "nahum14", question: "How is the Lord good?", options: [{ label: "A", text: "He rewards power" }, { label: "B", text: "He is a refuge in trouble" }, { label: "C", text: "He ignores evil" }, { label: "D", text: "He delays justice" }], correctAnswer: "B", verse: "Nahum 1:7", explanation: "God protects those who trust Him." },
  { id: "nahum15", question: "Who does the Lord care for?", options: [{ label: "A", text: "The strong" }, { label: "B", text: "Those who trust Him" }, { label: "C", text: "The wealthy" }, { label: "D", text: "The rulers" }], correctAnswer: "B", verse: "Nahum 1:7", explanation: "God knows His people." },
  { id: "nahum16", question: "What will God make an end of?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Nineveh" }, { label: "C", text: "Judah" }, { label: "D", text: "Babylon" }], correctAnswer: "B", verse: "Nahum 1:8", explanation: "Nineveh’s destruction is decreed." },
  { id: "nahum17", question: "What will not rise again?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "Nineveh’s oppression" }, { label: "C", text: "The law" }, { label: "D", text: "The temple" }], correctAnswer: "B", verse: "Nahum 1:9", explanation: "Evil will not return." },
  { id: "nahum18", question: "What does Nineveh plot against the Lord?", options: [{ label: "A", text: "Worship" }, { label: "B", text: "Evil" }, { label: "C", text: "Peace" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Nahum 1:11", explanation: "Nineveh opposes God." },
  { id: "nahum19", question: "What message is given to Judah?", options: [{ label: "A", text: "Exile" }, { label: "B", text: "Good news of peace" }, { label: "C", text: "Silence" }, { label: "D", text: "Judgment" }], correctAnswer: "B", verse: "Nahum 1:15", explanation: "Judah is comforted." },
  { id: "nahum20", question: "What will no longer pass through Judah?", options: [{ label: "A", text: "Priests" }, { label: "B", text: "The wicked" }, { label: "C", text: "Kings" }, { label: "D", text: "Prophets" }], correctAnswer: "B", verse: "Nahum 1:15", explanation: "Oppression ends." },
  { id: "nahum21", question: "What happens in Nahum 2?", options: [{ label: "A", text: "Restoration" }, { label: "B", text: "Attack on Nineveh" }, { label: "C", text: "Prayer" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nahum 2", explanation: "Nineveh is besieged." },
  { id: "nahum22", question: "Who advances against Nineveh?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "An attacker sent by God" }, { label: "C", text: "Judah" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Nahum 2:1", explanation: "God sends destruction." },
  { id: "nahum23", question: "What imagery describes the attackers’ shields?", options: [{ label: "A", text: "Gold" }, { label: "B", text: "Red" }, { label: "C", text: "Silver" }, { label: "D", text: "Black" }], correctAnswer: "B", verse: "Nahum 2:3", explanation: "Vivid battle imagery." },
  { id: "nahum24", question: "What color are the warriors’ garments?", options: [{ label: "A", text: "White" }, { label: "B", text: "Scarlet" }, { label: "C", text: "Blue" }, { label: "D", text: "Brown" }], correctAnswer: "B", verse: "Nahum 2:3", explanation: "Symbol of bloodshed." },
  { id: "nahum25", question: "What do chariots do in the streets?", options: [{ label: "A", text: "Stop" }, { label: "B", text: "Race madly" }, { label: "C", text: "Hide" }, { label: "D", text: "Burn" }], correctAnswer: "B", verse: "Nahum 2:4", explanation: "Chaos of invasion." },
  { id: "nahum26", question: "What is Nineveh compared to?", options: [{ label: "A", text: "A fortress" }, { label: "B", text: "A pool whose water drains away" }, { label: "C", text: "A mountain" }, { label: "D", text: "A tree" }], correctAnswer: "B", verse: "Nahum 2:8", explanation: "People flee rapidly." },
  { id: "nahum27", question: "What command is shouted?", options: [{ label: "A", text: "Attack" }, { label: "B", text: "Stop" }, { label: "C", text: "Flee" }, { label: "D", text: "Hide" }], correctAnswer: "B", verse: "Nahum 2:8", explanation: "But no one turns back." },
  { id: "nahum28", question: "What is taken from Nineveh?", options: [{ label: "A", text: "People" }, { label: "B", text: "Silver and gold" }, { label: "C", text: "Land" }, { label: "D", text: "Animals" }], correctAnswer: "B", verse: "Nahum 2:9", explanation: "Nineveh is plundered." },
  { id: "nahum29", question: "How is Nineveh’s heart described?", options: [{ label: "A", text: "Proud" }, { label: "B", text: "Melting" }, { label: "C", text: "Strong" }, { label: "D", text: "Joyful" }], correctAnswer: "B", verse: "Nahum 2:10", explanation: "Fear overtakes the city." },
  { id: "nahum30", question: "What animal imagery is used for Assyria?", options: [{ label: "A", text: "Wolf" }, { label: "B", text: "Lion" }, { label: "C", text: "Bear" }, { label: "D", text: "Eagle" }], correctAnswer: "B", verse: "Nahum 2:11–12", explanation: "Assyria is likened to a lion." },
  { id: "nahum31", question: "Where is the lions’ den now?", options: [{ label: "A", text: "Safe" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Hidden" }, { label: "D", text: "Guarded" }], correctAnswer: "B", verse: "Nahum 2:11–13", explanation: "Assyria’s power is gone." },
  { id: "nahum32", question: "Who speaks directly against Nineveh?", options: [{ label: "A", text: "Micah" }, { label: "B", text: "The Lord" }, { label: "C", text: "Judah" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Nahum 2:13", explanation: "God declares judgment." },
  { id: "nahum33", question: "What will be burned?", options: [{ label: "A", text: "Temples" }, { label: "B", text: "Chariots" }, { label: "C", text: "Homes" }, { label: "D", text: "Fields" }], correctAnswer: "B", verse: "Nahum 2:13", explanation: "Military power destroyed." },
  { id: "nahum34", question: "What chapter focuses on Nineveh’s crimes?", options: [{ label: "A", text: "Nahum 1" }, { label: "B", text: "Nahum 3" }, { label: "C", text: "Nahum 2" }, { label: "D", text: "Nahum 4" }], correctAnswer: "B", verse: "Nahum 3", explanation: "List of Nineveh’s sins." },
  { id: "nahum35", question: "How is Nineveh described in Nahum 3?", options: [{ label: "A", text: "Faithful city" }, { label: "B", text: "City of bloodshed" }, { label: "C", text: "Holy city" }, { label: "D", text: "Peaceful city" }], correctAnswer: "B", verse: "Nahum 3:1", explanation: "Violence defines Nineveh." },
  { id: "nahum36", question: "What fills Nineveh?", options: [{ label: "A", text: "Truth" }, { label: "B", text: "Lies and plunder" }, { label: "C", text: "Worship" }, { label: "D", text: "Peace" }], correctAnswer: "B", verse: "Nahum 3:1", explanation: "Corruption everywhere." },
  { id: "nahum37", question: "What imagery describes battle?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Whips, wheels, galloping horses" }, { label: "C", text: "Rain" }, { label: "D", text: "Fire only" }], correctAnswer: "B", verse: "Nahum 3:2–3", explanation: "Violent chaos." },
  { id: "nahum38", question: "Why are there many slain?", options: [{ label: "A", text: "Famine" }, { label: "B", text: "War and violence" }, { label: "C", text: "Plague" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nahum 3:3", explanation: "Result of brutality." },
  { id: "nahum39", question: "What sin is compared to prostitution?", options: [{ label: "A", text: "Idolatry" }, { label: "B", text: "Political seduction" }, { label: "C", text: "Greed" }, { label: "D", text: "Pride" }], correctAnswer: "B", verse: "Nahum 3:4", explanation: "Manipulating nations." },
  { id: "nahum40", question: "Who is against Nineveh?", options: [{ label: "A", text: "Judah" }, { label: "B", text: "The Lord Almighty" }, { label: "C", text: "Babylon" }, { label: "D", text: "Egypt" }], correctAnswer: "B", verse: "Nahum 3:5", explanation: "God declares opposition." },
  { id: "nahum41", question: "What will God expose?", options: [{ label: "A", text: "Treasures" }, { label: "B", text: "Nineveh’s shame" }, { label: "C", text: "Allies" }, { label: "D", text: "Walls" }], correctAnswer: "B", verse: "Nahum 3:5", explanation: "Public humiliation." },
  { id: "nahum42", question: "How will nations react?", options: [{ label: "A", text: "Rejoice" }, { label: "B", text: "Flee" }, { label: "C", text: "Ignore" }, { label: "D", text: "Worship" }], correctAnswer: "B", verse: "Nahum 3:7", explanation: "Fear of judgment." },
  { id: "nahum43", question: "What city is Nineveh compared to?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Thebes" }, { label: "C", text: "Babylon" }, { label: "D", text: "Tyre" }], correctAnswer: "B", verse: "Nahum 3:8", explanation: "Another fallen city." },
  { id: "nahum44", question: "Did Thebes escape judgment?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Partially" }, { label: "D", text: "Unknown" }], correctAnswer: "B", verse: "Nahum 3:10", explanation: "Power did not save it." },
  { id: "nahum45", question: "What happened to Thebes’ children?", options: [{ label: "A", text: "Protected" }, { label: "B", text: "Taken captive" }, { label: "C", text: "Hidden" }, { label: "D", text: "Crowned" }], correctAnswer: "B", verse: "Nahum 3:10", explanation: "Tragic defeat." },
  { id: "nahum46", question: "What will happen to Nineveh?", options: [{ label: "A", text: "It will be strong" }, { label: "B", text: "It will become drunk and hide" }, { label: "C", text: "It will repent" }, { label: "D", text: "It will prosper" }], correctAnswer: "B", verse: "Nahum 3:11", explanation: "Helplessness before judgment." },
  { id: "nahum47", question: "What will Nineveh seek?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Refuge" }, { label: "C", text: "Allies" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "Nahum 3:11", explanation: "But none will help." },
  { id: "nahum48", question: "How strong are Nineveh’s fortresses?", options: [{ label: "A", text: "Unbreakable" }, { label: "B", text: "Like ripe figs" }, { label: "C", text: "Like iron" }, { label: "D", text: "Like mountains" }], correctAnswer: "B", verse: "Nahum 3:12", explanation: "They fall easily." },
  { id: "nahum49", question: "Who are Nineveh’s troops compared to?", options: [{ label: "A", text: "Lions" }, { label: "B", text: "Women" }, { label: "C", text: "Giants" }, { label: "D", text: "Eagles" }], correctAnswer: "B", verse: "Nahum 3:13", explanation: "Weakness emphasized." },
  { id: "nahum50", question: "What is opened to enemies?", options: [{ label: "A", text: "Gates" }, { label: "B", text: "Palaces" }, { label: "C", text: "Treasuries" }, { label: "D", text: "Temples" }], correctAnswer: "A", verse: "Nahum 3:13", explanation: "Defense collapses." },
  { id: "nahum51", question: "What preparations are mocked?", options: [{ label: "A", text: "Prayer" }, { label: "B", text: "Strengthening defenses" }, { label: "C", text: "Fasting" }, { label: "D", text: "Repentance" }], correctAnswer: "B", verse: "Nahum 3:14", explanation: "Efforts are futile." },
  { id: "nahum52", question: "What will consume Nineveh?", options: [{ label: "A", text: "Flood" }, { label: "B", text: "Fire" }, { label: "C", text: "Plague" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "Nahum 3:15", explanation: "Destruction imagery." },
  { id: "nahum53", question: "What insect imagery is used?", options: [{ label: "A", text: "Bees" }, { label: "B", text: "Locusts" }, { label: "C", text: "Ants" }, { label: "D", text: "Flies" }], correctAnswer: "B", verse: "Nahum 3:15–17", explanation: "Fleeting strength." },
  { id: "nahum54", question: "What happens to the locusts?", options: [{ label: "A", text: "Multiply" }, { label: "B", text: "Fly away" }, { label: "C", text: "Attack" }, { label: "D", text: "Sleep" }], correctAnswer: "B", verse: "Nahum 3:17", explanation: "They vanish quickly." },
  { id: "nahum55", question: "What happens to Nineveh’s shepherds?", options: [{ label: "A", text: "Gather" }, { label: "B", text: "Fall asleep" }, { label: "C", text: "Fight" }, { label: "D", text: "Repent" }], correctAnswer: "B", verse: "Nahum 3:18", explanation: "Leadership collapses." },
  { id: "nahum56", question: "What happens to Nineveh’s people?", options: [{ label: "A", text: "Protected" }, { label: "B", text: "Scattered" }, { label: "C", text: "Strengthened" }, { label: "D", text: "Rewarded" }], correctAnswer: "B", verse: "Nahum 3:18", explanation: "Total dispersion." },
  { id: "nahum57", question: "Is there healing for Nineveh?", options: [{ label: "A", text: "Yes" }, { label: "B", text: "No" }, { label: "C", text: "Delayed" }, { label: "D", text: "Partial" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Final judgment." },
  { id: "nahum58", question: "How is Nineveh’s wound described?", options: [{ label: "A", text: "Light" }, { label: "B", text: "Fatal" }, { label: "C", text: "Temporary" }, { label: "D", text: "Hidden" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Irreversible destruction." },
  { id: "nahum59", question: "Who claps at Nineveh’s fall?", options: [{ label: "A", text: "Judah only" }, { label: "B", text: "All who hear" }, { label: "C", text: "Prophets" }, { label: "D", text: "Kings" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Oppression is ended." },
  { id: "nahum60", question: "Why do they rejoice?", options: [{ label: "A", text: "Wealth gained" }, { label: "B", text: "Nineveh’s cruelty is over" }, { label: "C", text: "Power shift" }, { label: "D", text: "Peace treaty" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Justice is celebrated." },
  { id: "nahum61", question: "What is Nahum’s primary theme?", options: [{ label: "A", text: "Repentance" }, { label: "B", text: "Judgment on Nineveh" }, { label: "C", text: "Restoration of Israel" }, { label: "D", text: "Messianic hope" }], correctAnswer: "B", verse: "Nahum", explanation: "Nineveh’s fall dominates the book." },
  { id: "nahum62", question: "What does Nahum reveal about God?", options: [{ label: "A", text: "He ignores evil" }, { label: "B", text: "He is just and powerful" }, { label: "C", text: "He is unpredictable" }, { label: "D", text: "He is distant" }], correctAnswer: "B", verse: "Nahum 1", explanation: "God judges wickedness." },
  { id: "nahum63", question: "How does Nahum balance God’s character?", options: [{ label: "A", text: "Mercy only" }, { label: "B", text: "Goodness and wrath" }, { label: "C", text: "Silence and distance" }, { label: "D", text: "Law and ritual" }], correctAnswer: "B", verse: "Nahum 1:2–7", explanation: "Justice and refuge." },
  { id: "nahum64", question: "What comfort does Judah receive?", options: [{ label: "A", text: "Military aid" }, { label: "B", text: "End of oppression" }, { label: "C", text: "Wealth" }, { label: "D", text: "Exile" }], correctAnswer: "B", verse: "Nahum 1:15", explanation: "Assyria will fall." },
  { id: "nahum65", question: "What historical event fulfills Nahum?", options: [{ label: "A", text: "Fall of Babylon" }, { label: "B", text: "Fall of Nineveh in 612 BC" }, { label: "C", text: "Exile of Judah" }, { label: "D", text: "Return from exile" }], correctAnswer: "B", verse: "Nahum", explanation: "Nineveh’s destruction." },
  { id: "nahum66", question: "What does Nahum teach about power?", options: [{ label: "A", text: "It lasts forever" }, { label: "B", text: "It can be judged by God" }, { label: "C", text: "It guarantees peace" }, { label: "D", text: "It saves nations" }], correctAnswer: "B", verse: "Nahum", explanation: "God overrules empires." },
  { id: "nahum67", question: "What role does Nineveh’s past repentance play?", options: [{ label: "A", text: "It saves them permanently" }, { label: "B", text: "It does not prevent later judgment" }, { label: "C", text: "It is ignored" }, { label: "D", text: "It is rewarded" }], correctAnswer: "B", verse: "Nahum", explanation: "Repentance must endure." },
  { id: "nahum68", question: "What contrast exists with Jonah?", options: [{ label: "A", text: "Same message" }, { label: "B", text: "Mercy vs judgment" }, { label: "C", text: "Same outcome" }, { label: "D", text: "Same prophet" }], correctAnswer: "B", verse: "Jonah vs Nahum", explanation: "Different responses to Nineveh." },
  { id: "nahum69", question: "What happens when evil persists?", options: [{ label: "A", text: "It is ignored" }, { label: "B", text: "It is judged" }, { label: "C", text: "It is excused" }, { label: "D", text: "It is rewarded" }], correctAnswer: "B", verse: "Nahum", explanation: "God’s justice prevails." },
  { id: "nahum70", question: "What does Nahum show about God’s patience?", options: [{ label: "A", text: "It is unlimited" }, { label: "B", text: "It has an end" }, { label: "C", text: "It is weakness" }, { label: "D", text: "It is silence" }], correctAnswer: "B", verse: "Nahum 1", explanation: "Judgment eventually comes." },
  { id: "nahum71", question: "What literary style dominates Nahum?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Poetic judgment" }, { label: "C", text: "Narrative" }, { label: "D", text: "Proverb" }], correctAnswer: "B", verse: "Nahum", explanation: "Vivid poetic imagery." },
  { id: "nahum72", question: "What does Nahum not include?", options: [{ label: "A", text: "Warnings" }, { label: "B", text: "Call to repentance" }, { label: "C", text: "Judgment" }, { label: "D", text: "Imagery" }], correctAnswer: "B", verse: "Nahum", explanation: "Judgment is already decided." },
  { id: "nahum73", question: "Who benefits from Nineveh’s fall?", options: [{ label: "A", text: "Assyria" }, { label: "B", text: "Oppressed nations" }, { label: "C", text: "Nineveh’s kings" }, { label: "D", text: "Merchants" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "End of cruelty." },
  { id: "nahum74", question: "What does Nahum reveal about God’s sovereignty?", options: [{ label: "A", text: "Limited" }, { label: "B", text: "Absolute" }, { label: "C", text: "Shared" }, { label: "D", text: "Unclear" }], correctAnswer: "B", verse: "Nahum", explanation: "God rules history." },
  { id: "nahum75", question: "What emotion dominates Nahum’s tone?", options: [{ label: "A", text: "Grief" }, { label: "B", text: "Certainty of judgment" }, { label: "C", text: "Confusion" }, { label: "D", text: "Fear" }], correctAnswer: "B", verse: "Nahum", explanation: "Judgment is assured." },
  { id: "nahum76", question: "What does Nahum teach oppressed people?", options: [{ label: "A", text: "Take revenge" }, { label: "B", text: "Trust God’s justice" }, { label: "C", text: "Remain silent" }, { label: "D", text: "Flee" }], correctAnswer: "B", verse: "Nahum", explanation: "God defends the afflicted." },
  { id: "nahum77", question: "What does Nahum say about violence?", options: [{ label: "A", text: "It builds power" }, { label: "B", text: "It invites judgment" }, { label: "C", text: "It brings peace" }, { label: "D", text: "It is neutral" }], correctAnswer: "B", verse: "Nahum 3", explanation: "Violence leads to downfall." },
  { id: "nahum78", question: "What does Nahum imply about empires?", options: [{ label: "A", text: "They last forever" }, { label: "B", text: "They rise and fall under God" }, { label: "C", text: "They save humanity" }, { label: "D", text: "They replace God" }], correctAnswer: "B", verse: "Nahum", explanation: "God controls history." },
  { id: "nahum79", question: "What is Nineveh’s final state?", options: [{ label: "A", text: "Restored" }, { label: "B", text: "Completely destroyed" }, { label: "C", text: "Weakened" }, { label: "D", text: "Exiled" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Total destruction." },
  { id: "nahum80", question: "What reaction ends the book?", options: [{ label: "A", text: "Silence" }, { label: "B", text: "Clapping" }, { label: "C", text: "Mourning" }, { label: "D", text: "Prayer" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Joy at justice." },
  { id: "nahum81", question: "Why do people clap?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Cruelty has ended" }, { label: "C", text: "Wealth gained" }, { label: "D", text: "Power shift" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Oppression is over." },
  { id: "nahum82", question: "What does Nahum say about unchecked evil?", options: [{ label: "A", text: "It fades" }, { label: "B", text: "It is confronted by God" }, { label: "C", text: "It is tolerated" }, { label: "D", text: "It reforms itself" }], correctAnswer: "B", verse: "Nahum", explanation: "Justice comes." },
  { id: "nahum83", question: "What is Nahum’s message to the powerful?", options: [{ label: "A", text: "You are secure" }, { label: "B", text: "You are accountable to God" }, { label: "C", text: "You rule forever" }, { label: "D", text: "You are chosen" }], correctAnswer: "B", verse: "Nahum", explanation: "No power escapes judgment." },
  { id: "nahum84", question: "What does Nahum say about God’s timing?", options: [{ label: "A", text: "Random" }, { label: "B", text: "Certain" }, { label: "C", text: "Delayed forever" }, { label: "D", text: "Unfair" }], correctAnswer: "B", verse: "Nahum", explanation: "God acts decisively." },
  { id: "nahum85", question: "What does Nahum emphasize over mercy here?", options: [{ label: "A", text: "Forgiveness" }, { label: "B", text: "Justice" }, { label: "C", text: "Grace" }, { label: "D", text: "Restoration" }], correctAnswer: "B", verse: "Nahum", explanation: "Judgment is the focus." },
  { id: "nahum86", question: "What does Nahum remind Judah of?", options: [{ label: "A", text: "Their sin" }, { label: "B", text: "God’s protection" }, { label: "C", text: "Their exile" }, { label: "D", text: "Their weakness" }], correctAnswer: "B", verse: "Nahum 1", explanation: "God is a refuge." },
  { id: "nahum87", question: "What is unique about Nahum among prophets?", options: [{ label: "A", text: "No hope offered" }, { label: "B", text: "Entire focus on one foreign city" }, { label: "C", text: "Only poetry" }, { label: "D", text: "Only visions" }], correctAnswer: "B", verse: "Nahum", explanation: "Single-target prophecy." },
  { id: "nahum88", question: "What happens when arrogance persists?", options: [{ label: "A", text: "It succeeds" }, { label: "B", text: "It collapses" }, { label: "C", text: "It is admired" }, { label: "D", text: "It spreads" }], correctAnswer: "B", verse: "Nahum", explanation: "Pride leads to ruin." },
  { id: "nahum89", question: "What does Nahum show about God and history?", options: [{ label: "A", text: "God reacts late" }, { label: "B", text: "God directs outcomes" }, { label: "C", text: "God watches only" }, { label: "D", text: "God withdraws" }], correctAnswer: "B", verse: "Nahum", explanation: "God governs nations." },
  { id: "nahum90", question: "What is the fate of cruelty?", options: [{ label: "A", text: "Rewarded" }, { label: "B", text: "Ended by judgment" }, { label: "C", text: "Ignored" }, { label: "D", text: "Celebrated" }], correctAnswer: "B", verse: "Nahum", explanation: "Justice prevails." },
  { id: "nahum91", question: "What lasting lesson does Nahum teach?", options: [{ label: "A", text: "Fear empires" }, { label: "B", text: "Trust God’s justice" }, { label: "C", text: "Avoid nations" }, { label: "D", text: "Depend on strength" }], correctAnswer: "B", verse: "Nahum", explanation: "God judges evil." },
  { id: "nahum92", question: "What does Nahum not emphasize?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Repentance" }, { label: "C", text: "Justice" }, { label: "D", text: "Sovereignty" }], correctAnswer: "B", verse: "Nahum", explanation: "Judgment phase is final." },
  { id: "nahum93", question: "What does Nahum say about God’s enemies?", options: [{ label: "A", text: "They endure" }, { label: "B", text: "They are defeated" }, { label: "C", text: "They repent" }, { label: "D", text: "They escape" }], correctAnswer: "B", verse: "Nahum", explanation: "God triumphs." },
  { id: "nahum94", question: "What does Nahum reveal about hope?", options: [{ label: "A", text: "It lies in empires" }, { label: "B", text: "It lies in God’s justice" }, { label: "C", text: "It lies in alliances" }, { label: "D", text: "It lies in strength" }], correctAnswer: "B", verse: "Nahum", explanation: "Hope for the oppressed." },
  { id: "nahum95", question: "What does Nahum ultimately defend?", options: [{ label: "A", text: "Power" }, { label: "B", text: "God’s righteousness" }, { label: "C", text: "Judah’s kings" }, { label: "D", text: "War" }], correctAnswer: "B", verse: "Nahum", explanation: "God’s justice upheld." },
  { id: "nahum96", question: "What happens when nations exalt themselves?", options: [{ label: "A", text: "They prosper" }, { label: "B", text: "They fall" }, { label: "C", text: "They rule forever" }, { label: "D", text: "They are spared" }], correctAnswer: "B", verse: "Nahum", explanation: "Pride precedes destruction." },
  { id: "nahum97", question: "What does Nahum affirm about God’s word?", options: [{ label: "A", text: "It changes" }, { label: "B", text: "It is fulfilled" }, { label: "C", text: "It delays" }, { label: "D", text: "It fails" }], correctAnswer: "B", verse: "Nahum", explanation: "Prophecy comes true." },
  { id: "nahum98", question: "What final emotion does Nahum evoke?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Relief" }, { label: "C", text: "Confusion" }, { label: "D", text: "Sadness" }], correctAnswer: "B", verse: "Nahum 3:19", explanation: "Relief at justice." },
  { id: "nahum99", question: "What does Nahum show about God’s character?", options: [{ label: "A", text: "Only loving" }, { label: "B", text: "Just and powerful" }, { label: "C", text: "Uncaring" }, { label: "D", text: "Passive" }], correctAnswer: "B", verse: "Nahum 1", explanation: "Balanced justice." },
  { id: "nahum100", question: "How does Nahum fit within the Twelve Prophets?", options: [{ label: "A", text: "Message of mercy" }, { label: "B", text: "Message of judgment on oppressors" }, { label: "C", text: "Message of exile" }, { label: "D", text: "Message of law" }], correctAnswer: "B", verse: "Nahum", explanation: "Judgment against cruelty." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function NahumTriviaPage() {
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
          .eq("book", "nahum");

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
          book: "nahum",
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
            book: "nahum",
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
    if (score === 10) return "Perfect! You're a Nahum expert!";
    if (score >= 8) return "Excellent! You know Nahum well!";
    if (score >= 6) return "Good job! Keep studying Nahum!";
    if (score >= 4) return "Nice try! Nahum has much to explore!";
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
              href="/bible-trivia/nahum"
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
